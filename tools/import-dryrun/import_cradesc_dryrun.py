#!/usr/bin/env python3
"""
Mbay Diaay — import À BLANC de la base CRADESC (banc de validation).

Objectif : vérifier, sur les vraies données, la correspondance feuilles -> tables décrite dans
le PRD Backend §6 et ses critères d'acceptation (§6.4). Ce n'est PAS le schéma de production
(PostgreSQL/PostGIS) : le banc utilise SQLite avec clés étrangères actives pour valider les
liens, l'idempotence et la réconciliation.

Principes appliqués (PRD Backend) :
  - le fichier Excel reste la source figée ; chargement brut en mémoire (staging), jamais écrit ;
  - idempotence par legacy_id : rejouer ne crée rien de nouveau (BE-22, §6.1) ;
  - CNI chiffrée (AES-256-GCM) + empreinte HMAC-SHA256 ; jamais en clair en base (BE-70) ;
  - aucune fusion ni suppression de fiche (BE-62) ;
  - contour brut conservé, contour réparé ajouté (BE-31) ;
  - sorties (rapport, journal) sans donnée personnelle.

Usage : python3 import_cradesc_dryrun.py <fichier.xlsx> <dossier_sortie> [--passes 2]
Les clés de chiffrement sont éphémères (mémoire) : rien n'est écrit sur disque.
"""
import argparse, hashlib, hmac, json, os, re, sqlite3, sys, uuid, warnings
from datetime import datetime, timezone

import pandas as pd
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
from pyproj import Transformer
from shapely import wkt
from shapely.geometry import GeometryCollection, MultiPolygon, Polygon
from shapely.ops import transform, unary_union
from shapely.strtree import STRtree
from shapely.validation import make_valid

warnings.filterwarnings("ignore")
SCRIPT_VERSION = "0.1.0"
NS = uuid.UUID("6f1d8c1e-5a5e-4c52-9d3b-2f6a9d0c1a11")  # banc d'essai : UUID déterministes
TO_UTM = Transformer.from_crs(4326, 32628, always_xy=True).transform
SENSITIVE_JOURNAL_VARS = {"CNI"}
LOG = []


def log(msg):
    LOG.append(msg)
    print(msg)


def uid(kind, key):
    return str(uuid.uuid5(NS, f"{kind}:{key}"))


def nn(v):
    """pandas NaN -> None ; numpy -> python."""
    if v is None:
        return None
    try:
        if pd.isna(v):
            return None
    except (TypeError, ValueError):
        pass
    if hasattr(v, "item"):
        return v.item()
    if isinstance(v, pd.Timestamp):
        return v.date().isoformat()
    return v


SCHEMA = """
PRAGMA foreign_keys = ON;
CREATE TABLE IF NOT EXISTS import_batch (id TEXT PRIMARY KEY, file_sha256 TEXT, started_at TEXT, script_version TEXT, counts_json TEXT);
CREATE TABLE IF NOT EXISTS organization (id TEXT PRIMARY KEY, legacy_key TEXT UNIQUE NOT NULL, name TEXT NOT NULL, level TEXT NOT NULL,
  provisional_type TEXT, parent_id TEXT REFERENCES organization(id), zone TEXT);
CREATE TABLE IF NOT EXISTS locality (id TEXT PRIMARY KEY, zone TEXT NOT NULL, name TEXT NOT NULL, UNIQUE(zone, name));
CREATE TABLE IF NOT EXISTS crop (id TEXT PRIMARY KEY, name TEXT UNIQUE NOT NULL);
CREATE TABLE IF NOT EXISTS crop_alias (id TEXT PRIMARY KEY, raw_label TEXT NOT NULL, crop_id TEXT NOT NULL REFERENCES crop(id), UNIQUE(raw_label, crop_id));
CREATE TABLE IF NOT EXISTS field_agent (id TEXT PRIMARY KEY, kobo_account TEXT UNIQUE NOT NULL, display_name TEXT, supervisor TEXT);
CREATE TABLE IF NOT EXISTS producer (id TEXT PRIMARY KEY, legacy_id TEXT UNIQUE NOT NULL, source_kobo_id INTEGER, source_kobo_uuid TEXT,
  full_name TEXT, sex TEXT, age INTEGER, locality_id TEXT REFERENCES locality(id), scoop_id TEXT NOT NULL REFERENCES organization(id),
  quality_status TEXT);
CREATE TABLE IF NOT EXISTS membership (id TEXT PRIMARY KEY, producer_id TEXT UNIQUE NOT NULL REFERENCES producer(id), org_id TEXT NOT NULL REFERENCES organization(id),
  role_in_org TEXT, adhesion_status TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS contact (id TEXT PRIMARY KEY, producer_id TEXT NOT NULL REFERENCES producer(id), kind TEXT NOT NULL, e164 TEXT NOT NULL,
  valid INTEGER, UNIQUE(producer_id, kind, e164));
CREATE TABLE IF NOT EXISTS identity_doc (id TEXT PRIMARY KEY, producer_id TEXT UNIQUE NOT NULL REFERENCES producer(id), kind TEXT NOT NULL,
  cipher BLOB NOT NULL, nonce BLOB NOT NULL, hmac_hex TEXT NOT NULL, masked TEXT, format_ok INTEGER, status TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS survey_response (id TEXT PRIMARY KEY, producer_id TEXT UNIQUE NOT NULL REFERENCES producer(id), collected_on TEXT, phase TEXT,
  field_agent_id TEXT REFERENCES field_agent(id), duration_min REAL, data_json TEXT);
CREATE TABLE IF NOT EXISTS plot (id TEXT PRIMARY KEY, legacy_id TEXT UNIQUE NOT NULL, producer_id TEXT NOT NULL REFERENCES producer(id), seq INTEGER,
  landmark TEXT, centroid_lat REAL, centroid_lon REAL, centroid_precision_m REAL, area_measured_m2 INTEGER, area_kobo_m2 INTEGER,
  perimeter_m REAL, n_points INTEGER, gps_precision_m REAL, contour_status TEXT, tenure TEXT, tenure_doc TEXT, water_source TEXT,
  state TEXT, infra_json TEXT, photo_url TEXT, photo_doc_url TEXT, quality_status TEXT);
CREATE TABLE IF NOT EXISTS plot_geometry (id TEXT PRIMARY KEY, plot_id TEXT NOT NULL REFERENCES plot(id), kind TEXT NOT NULL, version INTEGER NOT NULL,
  wkt TEXT NOT NULL, is_valid INTEGER, area_m2 REAL, UNIQUE(plot_id, kind, version));
CREATE TABLE IF NOT EXISTS plot_crop (id TEXT PRIMARY KEY, legacy_id TEXT UNIQUE NOT NULL, plot_id TEXT NOT NULL REFERENCES plot(id), crop_id TEXT NOT NULL REFERENCES crop(id),
  raw_label TEXT, share_pct REAL, area_m2 INTEGER, variety TEXT, potential_yield_kg_ha REAL, practices_json TEXT, quality_status TEXT);
CREATE TABLE IF NOT EXISTS plot_crop_campaign (id TEXT PRIMARY KEY, plot_crop_id TEXT NOT NULL REFERENCES plot_crop(id), campaign_type TEXT NOT NULL,
  qty_kg REAL, yield_kg_ha REAL, price_fcfa_kg REAL, value_fcfa REAL, destinations_json TEXT, UNIQUE(plot_crop_id, campaign_type));
CREATE TABLE IF NOT EXISTS merge_log (id TEXT PRIMARY KEY, source_row INTEGER UNIQUE NOT NULL, kept_producer_id TEXT REFERENCES producer(id), removed_kobo_id INTEGER,
  kept_kobo_id INTEGER, plots_moved INTEGER, plots_removed INTEGER);
CREATE TABLE IF NOT EXISTS import_correction_log (id TEXT PRIMARY KEY, source_row INTEGER UNIQUE NOT NULL, table_name TEXT, producer_legacy_id TEXT,
  kobo_id INTEGER, variable TEXT, value_before TEXT, value_after TEXT, value_sensitive INTEGER, rule TEXT);
CREATE TABLE IF NOT EXISTS data_quality_flag (id TEXT PRIMARY KEY, dedup_key TEXT UNIQUE NOT NULL, entity_type TEXT NOT NULL, entity_legacy_id TEXT NOT NULL,
  flag_type TEXT NOT NULL, action TEXT, status TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS duplicate_candidate (id TEXT PRIMARY KEY, a_id TEXT NOT NULL REFERENCES producer(id), b_id TEXT NOT NULL REFERENCES producer(id),
  signals_json TEXT, status TEXT NOT NULL, UNIQUE(a_id, b_id));
"""
DATA_TABLES = ["organization", "locality", "crop", "crop_alias", "field_agent", "producer", "membership", "contact", "identity_doc",
               "survey_response", "plot", "plot_geometry", "plot_crop", "plot_crop_campaign", "merge_log", "import_correction_log",
               "data_quality_flag", "duplicate_candidate"]


def op_type(label):
    t = str(label).strip().lower()
    if t.startswith("individuel"):
        return "individuel"
    if "membre direct" in t:
        return "membre_direct"
    if t.startswith("gie"):
        return "gie"
    if t.startswith("section"):
        return "section"
    if re.match(r"(association|union|groupement|regroupement|f[ée]d[ée]ration)", t):
        return "association"
    return "a_qualifier"


def polygon_parts(g):
    if g.is_empty:
        return None
    if isinstance(g, Polygon):
        return g
    if isinstance(g, MultiPolygon):
        return g
    if isinstance(g, GeometryCollection):
        parts = [p for p in g.geoms if isinstance(p, (Polygon, MultiPolygon)) and not p.is_empty]
        return unary_union(parts) if parts else None
    return None


def repair(g):
    """Réparation retenue pour le banc : make_valid (conserve les deux lobes d'un contour croisé)."""
    return polygon_parts(make_valid(g))


def area_utm_m2(g):
    return transform(TO_UTM, g).area


def load_staging(path):
    x = pd.read_excel(path, sheet_name=None)
    needed = ["Producteurs", "Parcelles", "Cultures", "Doublons traités", "Journal corrections", "Alertes à vérifier"]
    missing = [s for s in needed if s not in x]
    if missing:
        sys.exit(f"Feuilles manquantes : {missing}")
    return x


def run_pass(conn, st, keys, pass_no):
    aes, hkey = keys
    P, Pa, C = st["Producteurs"], st["Parcelles"], st["Cultures"]
    D, J, A = st["Doublons traités"], st["Journal corrections"], st["Alertes à vérifier"]
    cur = conn.cursor()
    findings = {}

    def ins(sql, rows):
        # ON CONFLICT DO NOTHING n'ignore QUE les doublons de clé unique (idempotence).
        # Toute autre violation (NOT NULL, clé étrangère) lève une erreur : rien n'est perdu en silence.
        sql = sql.replace("INSERT OR IGNORE INTO", "INSERT INTO") + " ON CONFLICT DO NOTHING"
        before = conn.total_changes
        cur.executemany(sql, rows)
        return conn.total_changes - before

    # --- Organisations : SCOOP + organisations de base (type provisoire)
    scoops = P.drop_duplicates("Code_SCOOP")[["Code_SCOOP", "SCOOP", "Zone"]]
    ins("INSERT OR IGNORE INTO organization VALUES (?,?,?,?,?,?,?)",
        [(uid("scoop", r.Code_SCOOP), f"SCOOP:{r.Code_SCOOP}", r.SCOOP, "scoop", None, None, r.Zone) for r in scoops.itertuples()])
    scoop_id = {r.Code_SCOOP: uid("scoop", r.Code_SCOOP) for r in scoops.itertuples()}
    base = P.drop_duplicates(["Code_SCOOP", "OP"])[["Code_SCOOP", "OP", "Zone"]]
    ins("INSERT OR IGNORE INTO organization VALUES (?,?,?,?,?,?,?)",
        [(uid("baseorg", f"{r.Code_SCOOP}|{r.OP}"), f"OP:{r.Code_SCOOP}|{r.OP}", r.OP, "base", op_type(r.OP), scoop_id[r.Code_SCOOP], r.Zone) for r in base.itertuples()])
    base_id = {(r.Code_SCOOP, r.OP): uid("baseorg", f"{r.Code_SCOOP}|{r.OP}") for r in base.itertuples()}
    findings["op_types"] = {k: int(v) for k, v in P.OP.map(op_type).value_counts().items()}

    # --- Localités
    loc = P.drop_duplicates(["Zone", "Village"])[["Zone", "Village"]]
    ins("INSERT OR IGNORE INTO locality VALUES (?,?,?)", [(uid("loc", f"{r.Zone}|{r.Village}"), r.Zone, r.Village) for r in loc.itertuples()])
    loc_id = {(r.Zone, r.Village): uid("loc", f"{r.Zone}|{r.Village}") for r in loc.itertuples()}

    # --- Cultures de référence + alias
    crops = sorted(C.Culture.dropna().unique())
    ins("INSERT OR IGNORE INTO crop VALUES (?,?)", [(uid("crop", c), c) for c in crops])
    pairs = C.dropna(subset=["Culture", "Culture_saisie_brute"]).drop_duplicates(["Culture", "Culture_saisie_brute"])
    ins("INSERT OR IGNORE INTO crop_alias VALUES (?,?,?)", [(uid("alias", f"{r.Culture_saisie_brute}|{r.Culture}"), r.Culture_saisie_brute, uid("crop", r.Culture)) for r in pairs.itertuples()])
    raw_multi = pairs.groupby("Culture_saisie_brute").Culture.nunique()
    findings["alias_raw_to_many_crops"] = int((raw_multi > 1).sum())

    # --- Agents de collecte (comptes Kobo)
    ag = P.drop_duplicates("Compte_Kobo")[["Compte_Kobo", "Enqueteur", "Superviseur_terrain"]]
    ins("INSERT OR IGNORE INTO field_agent VALUES (?,?,?,?)", [(uid("agent", r.Compte_Kobo), r.Compte_Kobo, r.Enqueteur, r.Superviseur_terrain) for r in ag.itertuples()])

    # --- Producteurs
    ident_cols = {"Telephone", "CNI", "Nom_producteur"}
    survey_cols = [c for c in P.columns if c not in ident_cols]
    prod_rows, memb_rows, contact_rows, ident_rows, survey_rows = [], [], [], [], []
    phone_valid_mismatch = 0
    cni_norm = {}
    for r in P.to_dict("records"):
        pid = uid("producer", r["ID_Producteur"])
        prod_rows.append((pid, r["ID_Producteur"], nn(r["Kobo_ID"]), nn(r["Kobo_UUID"]), r["Nom_producteur"], nn(r["Sexe"]),
                          None if pd.isna(r["Age"]) else int(r["Age"]), loc_id[(r["Zone"], r["Village"])], scoop_id[r["Code_SCOOP"]], r["Statut_qualite"]))
        memb_rows.append((uid("memb", r["ID_Producteur"]), pid, base_id[(r["Code_SCOOP"], r["OP"])], r["Statut_OP"], "recense"))
        ph = str(int(r["Telephone"]))
        ok = bool(re.fullmatch(r"7\d{8}", ph))
        if ok != (r["Tel_valide"] == "Oui"):
            phone_valid_mismatch += 1
        contact_rows.append((uid("contact", f"{r['ID_Producteur']}|{ph}"), pid, "phone", "+221" + ph, int(ok)))
        if pd.notna(r["CNI"]):
            digits = re.sub(r"\D", "", str(r["CNI"]))
            nonce = os.urandom(12)
            cipher = aes.encrypt(nonce, digits.encode(), r["ID_Producteur"].encode())
            h = hmac.new(hkey, digits.encode(), hashlib.sha256).hexdigest()
            cni_norm[pid] = h
            ident_rows.append((uid("ident", r["ID_Producteur"]), pid, "CNI", cipher, nonce, h, "•" * 10 + digits[-3:], int(len(digits) == 13), "declaree"))
        data = {c: nn(r[c]) for c in survey_cols}
        survey_rows.append((uid("survey", r["ID_Producteur"]), pid, nn(r["Date_enquete"]), r["Phase_collecte"], uid("agent", r["Compte_Kobo"]), nn(r["Duree_min"]),
                            json.dumps(data, ensure_ascii=False, default=str)))
    ins("INSERT OR IGNORE INTO producer VALUES (?,?,?,?,?,?,?,?,?,?)", prod_rows)
    ins("INSERT OR IGNORE INTO membership VALUES (?,?,?,?,?)", memb_rows)
    ins("INSERT OR IGNORE INTO contact VALUES (?,?,?,?,?)", contact_rows)
    ins("INSERT OR IGNORE INTO identity_doc VALUES (?,?,?,?,?,?,?,?,?)", ident_rows)
    ins("INSERT OR IGNORE INTO survey_response VALUES (?,?,?,?,?,?,?)", survey_rows)
    findings["phone_valid_mismatch_vs_Tel_valide"] = phone_valid_mismatch
    # Fiche sans nom : conservée (aucune suppression, BE-62) et signalée.
    no_name = [r["ID_Producteur"] for r in P.to_dict("records") if pd.isna(r["Nom_producteur"])]
    ins("INSERT OR IGNORE INTO data_quality_flag VALUES (?,?,?,?,?,?,?)",
        [(uid("flag", f"nom_manquant|{i}"), f"nom_manquant:{i}", "Producteurs", i, "Nom du producteur manquant", "Retrouver le nom auprès de l'enquêteur", "ouvert") for i in no_name])
    findings["producers_without_name"] = len(no_name)

    # --- Parcelles + géométries
    infra_cols = [c for c in Pa.columns if c.startswith("Infra_") and c != "Infra_aucune"]
    plot_rows, geom_rows = [], []
    areas = {"make_valid": [], "buffer0": []}
    invalid_raw = 0
    lossy = 0
    repaired_geoms = {}
    for r in Pa.to_dict("records"):
        plid = uid("plot", r["ID_Parcelle"])
        a_m2 = r["Superficie_ha"] * 10000
        if abs(a_m2 - round(a_m2)) > 1e-6:
            lossy += 1
        infra = [c[6:] for c in infra_cols if r[c] == "Oui"]
        plot_rows.append((plid, r["ID_Parcelle"], uid("producer", r["ID_Producteur"]), int(r["N_parcelle"]), nn(r["Nom_repere_parcelle"]), nn(r["Centroide_lat"]),
                          nn(r["Centroide_lon"]), nn(r["Centroide_precision_m"]), int(round(a_m2)), int(round(r["Superficie_kobo_ha"] * 10000)), nn(r["Perimetre_m"]),
                          nn(r["Nb_points_contour"]), nn(r["Precision_moy_contour_m"]), r["Contour_valide"], nn(r["Statut_foncier"]), nn(r["Document_foncier"]),
                          nn(r["Source_eau_irrigation"]), nn(r["Etat_exploitation"]), json.dumps(infra), nn(r["Photo_parcelle_URL"]),
                          nn(r["Photo_document_foncier_URL"]), r["Statut_qualite"]))
        g = wkt.loads(r["Contour_WKT"])
        valid = g.is_valid
        geom_rows.append((uid("geom", f"{r['ID_Parcelle']}|brute|1"), plid, "brute", 1, r["Contour_WKT"], int(valid), area_utm_m2(g)))
        if valid:
            repaired_geoms[r["ID_Parcelle"]] = g
        else:
            invalid_raw += 1
            gr = repair(g)
            repaired_geoms[r["ID_Parcelle"]] = gr
            geom_rows.append((uid("geom", f"{r['ID_Parcelle']}|reparee|1"), plid, "reparee", 1, gr.wkt, int(gr.is_valid), area_utm_m2(gr)))
            ref = a_m2
            areas["make_valid"].append((area_utm_m2(gr) - ref) / ref * 100)
            gb = polygon_parts(g.buffer(0))
            areas["buffer0"].append((area_utm_m2(gb) - ref) / ref * 100 if gb is not None else float("nan"))
    ins("INSERT OR IGNORE INTO plot VALUES (" + ",".join("?" * 22) + ")", plot_rows)
    ins("INSERT OR IGNORE INTO plot_geometry VALUES (?,?,?,?,?,?,?)", geom_rows)
    findings["plots_invalid_raw_contours"] = invalid_raw
    findings["plots_area_not_integer_m2"] = lossy
    import numpy as np
    for k, v in areas.items():
        a = np.abs(np.array(v, dtype=float))
        findings[f"repair_{k}_within_1pct_of_reference"] = int((a <= 1).sum())
        findings[f"repair_{k}_over_5pct_of_reference"] = int((a > 5).sum())
    findings["repair_candidates"] = len(areas["make_valid"])

    # --- Cultures + résultats par campagne (format long)
    pr_rows, camp_rows = [], []
    ae_cols = [c for c in C.columns if c.startswith("AE_")]
    anomalies = {"CHN_data_without_production": 0, "CS_data_without_production": 0}
    for r in C.to_dict("records"):
        pcid = uid("plotcrop", r["ID_Culture"])
        practices = [c[3:] for c in ae_cols if r[c] == "Oui"]
        pr_rows.append((pcid, r["ID_Culture"], uid("plot", r["ID_Parcelle"]), uid("crop", r["Culture"]), nn(r["Culture_saisie_brute"]), nn(r["Part_superficie_pct"]),
                        None if pd.isna(r["Superficie_culture_ha"]) else int(round(r["Superficie_culture_ha"] * 10000)), nn(r["Variete_semence"]),
                        nn(r["Rdt_potentiel_declare_kg_ha"]), json.dumps(practices), r["Statut_qualite"]))
        for code in ("CHN", "CS"):
            has_data = any(pd.notna(r[f"{k}_{code}{s}"]) for k, s in (("Qte", "_kg"), ("Prix", "_FCFA_kg")))
            if r[f"Produit_{code}"] == "Oui":
                dest = [d for d in ("Autoconso", "Vente_indiv", "Vente_SCOOP", "Transfo", "Perte") if r[f"Dest_{code}_{d}"] == "Oui"]
                camp_rows.append((uid("camp", f"{r['ID_Culture']}|{code}"), pcid, code, nn(r[f"Qte_{code}_kg"]), nn(r[f"Rdt_reel_{code}_kg_ha"]),
                                  nn(r[f"Prix_{code}_FCFA_kg"]), nn(r[f"Valeur_{code}_FCFA"]), json.dumps(dest)))
            elif has_data:
                anomalies[f"{code}_data_without_production"] += 1
    ins("INSERT OR IGNORE INTO plot_crop VALUES (?,?,?,?,?,?,?,?,?,?,?)", pr_rows)
    ins("INSERT OR IGNORE INTO plot_crop_campaign VALUES (?,?,?,?,?,?,?,?)", camp_rows)
    findings["campaign_rows_expected"] = len(camp_rows)
    findings.update({f"anomaly_{k}": v for k, v in anomalies.items()})
    findings["fcfa_non_integer_values"] = int(((C[["Prix_CHN_FCFA_kg", "Prix_CS_FCFA_kg", "Valeur_CHN_FCFA", "Valeur_CS_FCFA"]].dropna(how="all").apply(lambda s: (s.dropna() % 1 != 0).sum())).sum()))

    # --- Fusions historiques (traçabilité uniquement)
    ins("INSERT OR IGNORE INTO merge_log VALUES (?,?,?,?,?,?,?)",
        [(uid("merge", i), i, uid("producer", r["ID_Producteur_conserve"]) if r["ID_Producteur_conserve"] in set(P.ID_Producteur) else None,
          int(r["Kobo_ID_supprime"]), int(r["Kobo_ID_conserve"]), nn(r["Parcelles_rattachees"]), nn(r["Parcelles_supprimees"]))
         for i, r in enumerate(D.to_dict("records"))])

    # --- Journal des corrections (valeurs sensibles chiffrées, jamais en clair)
    jrows = []
    n_sensitive = 0
    for i, r in enumerate(J.to_dict("records")):
        sens = r["Variable"] in SENSITIVE_JOURNAL_VARS
        before, after = nn(r["Valeur initiale"]), nn(r["Valeur corrigée"])
        if sens:
            n_sensitive += 1
            before = "[chiffré]" if before is not None else None
            after = "[chiffré]" if after is not None else None
        jrows.append((uid("jlog", i), i, r["Table"], nn(r["ID_Producteur"]), None if pd.isna(r["Kobo_ID"]) else int(r["Kobo_ID"]), r["Variable"],
                      None if before is None else str(before), None if after is None else str(after), int(sens), nn(r["Règle appliquée"])))
    ins("INSERT OR IGNORE INTO import_correction_log VALUES (?,?,?,?,?,?,?,?,?,?)", jrows)
    findings["journal_rows_sensitive_masked"] = n_sensitive

    # --- Alertes -> data_quality_flag (statut ouvert) ; résolution des identifiants
    ids = {"Producteurs": set(P.ID_Producteur), "Parcelles": set(Pa.ID_Parcelle), "Cultures": set(C.ID_Culture)}
    unresolved = 0
    flag_rows = []
    for i, r in enumerate(A.to_dict("records")):
        if r["ID"] not in ids.get(r["Table"], set()):
            unresolved += 1
        flag_rows.append((uid("flag", i), f"alerte:{i}", r["Table"], r["ID"], r["Alerte"], nn(r["Action recommandée"]), "ouvert"))
    ins("INSERT OR IGNORE INTO data_quality_flag VALUES (?,?,?,?,?,?,?)", flag_rows)
    findings["alert_ids_unresolved"] = unresolved
    findings["alerts_with_verification_status"] = int(A["Statut vérification"].notna().sum())

    # --- Candidats doublons : CNI identique (signal, jamais de fusion)
    from collections import defaultdict
    groups = defaultdict(list)
    for pid, h in cni_norm.items():
        groups[h].append(pid)
    dup_groups = {h: v for h, v in groups.items() if len(v) > 1}
    cand = []
    for v in dup_groups.values():
        v = sorted(v)
        for a in range(len(v)):
            for b in range(a + 1, len(v)):
                cand.append((uid("dup", f"{v[a]}|{v[b]}"), v[a], v[b], json.dumps(["cni_identique"]), "a_examiner"))
    ins("INSERT OR IGNORE INTO duplicate_candidate VALUES (?,?,?,?,?)", cand)
    findings["cni_duplicate_groups"] = len(dup_groups)
    findings["cni_duplicate_fiches"] = sum(len(v) for v in dup_groups.values())
    raw_cni = P.CNI.dropna().astype(str)
    findings["cni_duplicate_groups_on_raw_strings"] = int(raw_cni[raw_cni.duplicated(keep=False)].nunique())

    # --- Chevauchements (parcelles de producteurs différents), contours réparés, projection UTM
    ordered = list(Pa.ID_Parcelle)
    owner = dict(zip(Pa.ID_Parcelle, Pa.ID_Producteur))
    geoms = [transform(TO_UTM, repaired_geoms[i]) for i in ordered]
    tree = STRtree(geoms)
    buckets = {"gt20": 0, "gt50": 0, "gt90": 0}
    overlap_rows = []
    for i, g in enumerate(geoms):
        for j in tree.query(g):
            if j <= i or owner[ordered[i]] == owner[ordered[j]]:
                continue
            inter = g.intersection(geoms[j]).area
            ratio = inter / min(g.area, geoms[j].area) if min(g.area, geoms[j].area) > 0 else 0
            if ratio > 0.2:
                buckets["gt20"] += 1
                buckets["gt50"] += ratio > 0.5
                buckets["gt90"] += ratio > 0.9
                overlap_rows.append((uid("flag", f"overlap|{ordered[i]}|{ordered[j]}"), f"overlap:{ordered[i]}|{ordered[j]}", "Parcelles", ordered[i],
                                     f"Chevauchement {ratio:.0%} avec une parcelle d'un autre producteur", "Examiner sur la carte", "ouvert"))
    ins("INSERT OR IGNORE INTO data_quality_flag VALUES (?,?,?,?,?,?,?)", overlap_rows)
    findings["overlap_pairs"] = {k: int(v) for k, v in buckets.items()}

    # --- Doublons de téléphone (information seulement, pas de candidat)
    ph = P.Telephone.astype(str)
    findings["phone_groups_shared"] = int(ph[ph.duplicated(keep=False)].nunique())
    findings["phone_fiches_shared"] = int(ph.duplicated(keep=False).sum())
    conn.commit()
    return findings


def table_counts(conn):
    return {t: conn.execute(f"SELECT COUNT(*) FROM {t}").fetchone()[0] for t in DATA_TABLES}


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("xlsx")
    ap.add_argument("outdir")
    ap.add_argument("--passes", type=int, default=2)
    a = ap.parse_args()
    os.makedirs(a.outdir, exist_ok=True)
    sha = hashlib.sha256(open(a.xlsx, "rb").read()).hexdigest()
    st = load_staging(a.xlsx)
    log(f"Fichier : sha256={sha[:16]}… | script v{SCRIPT_VERSION}")
    log("Staging chargé en mémoire : " + ", ".join(f"{k}={len(v)}" for k, v in st.items() if k in ("Producteurs", "Parcelles", "Cultures", "Journal corrections", "Alertes à vérifier", "Doublons traités")))
    keys = (AESGCM(AESGCM.generate_key(bit_length=256)), os.urandom(32))
    conn = sqlite3.connect(":memory:")
    conn.executescript(SCHEMA)
    results = {}
    for n in range(1, a.passes + 1):
        f = run_pass(conn, st, keys, n)
        counts = table_counts(conn)
        results[n] = {"counts": counts, "findings": f}
        conn.execute("INSERT INTO import_batch VALUES (?,?,?,?,?)", (str(uuid.uuid4()), sha, datetime.now(timezone.utc).isoformat(), SCRIPT_VERSION, json.dumps(counts)))
        log(f"Passe {n} terminée : " + ", ".join(f"{k}={v}" for k, v in counts.items() if k in ('producer', 'plot', 'plot_crop', 'plot_geometry')))

    # ---- Contrôles d'acceptation (PRD Backend §6.4)
    P, Pa, C, J, D, A = (st[k] for k in ("Producteurs", "Parcelles", "Cultures", "Journal corrections", "Doublons traités", "Alertes à vérifier"))
    c1 = results[1]["counts"]
    c2 = results[a.passes]["counts"]
    fk = conn.execute("PRAGMA foreign_key_check").fetchall()
    dump = "\n".join(conn.iterdump())
    cni_clear = sum(1 for v in P.CNI.dropna().astype(str).unique() if re.sub(r"\D", "", v) and re.sub(r"\D", "", v) in dump)
    log_leak = bool(re.search(r"\d{9,}", "\n".join(LOG)))
    checks = [
        ("1. Réconciliation des volumes", c1["producer"] == len(P) and c1["plot"] == len(Pa) and c1["plot_crop"] == len(C),
         f"producteurs {c1['producer']}/{len(P)} · parcelles {c1['plot']}/{len(Pa)} · cultures {c1['plot_crop']}/{len(C)}"),
        ("1b. Aucun lien orphelin (contrôle des clés étrangères)", len(fk) == 0, f"{len(fk)} violation(s)"),
        ("2. Contours chargés ; invalides conservés bruts et réparés à part", c1["plot_geometry"] == len(Pa) + results[1]["findings"]["plots_invalid_raw_contours"],
         f"{len(Pa)} contours bruts + {results[1]['findings']['plots_invalid_raw_contours']} réparés = {c1['plot_geometry']} lignes"),
        ("3. Traçabilité : journal et fusions historiques importés", c1["import_correction_log"] == len(J) and c1["merge_log"] == len(D),
         f"journal {c1['import_correction_log']}/{len(J)} · fusions historiques {c1['merge_log']}/{len(D)}"),
        ("4. Aucune fiche fusionnée ni supprimée par l'import", c1["producer"] == len(P), f"{c1['producer']} fiches pour {len(P)} en source"),
        ("5. Sécurité : aucune CNI en clair en base ni dans le journal d'exécution", cni_clear == 0 and not log_leak,
         f"CNI retrouvées en clair dans la base : {cni_clear} · séquences de 9+ chiffres dans le journal d'exécution : {'oui' if log_leak else 'non'}"),
        ("6. Rejouabilité : une passe supplémentaire ne crée aucune donnée", c1 == c2 if a.passes > 1 else None,
         "tables identiques après la 2e passe" if a.passes > 1 and c1 == c2 else f"différences : { {t:(c1[t],c2[t]) for t in c1 if c1[t]!=c2[t]} }"),
        ("7. Rapport d'import", True, "ce document"),
    ]
    out = {"file_sha256": sha, "script_version": SCRIPT_VERSION, "passes": a.passes, "checks": [{"name": n, "ok": ok, "detail": d} for n, ok, d in checks],
           "counts": c2, "findings": results[a.passes]["findings"]}
    json.dump(out, open(os.path.join(a.outdir, "rapport_import_a_blanc.json"), "w"), ensure_ascii=False, indent=2)
    log("\nCONTRÔLES D'ACCEPTATION")
    for n, ok, d in checks:
        log(f"  [{'OK' if ok else 'ÉCHEC'}] {n} — {d}")
    open(os.path.join(a.outdir, "journal_execution.log"), "w").write("\n".join(LOG))
    sys.exit(0 if all(ok is not False for _, ok, _ in checks) else 1)


if __name__ == "__main__":
    main()
