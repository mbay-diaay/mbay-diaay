import random, math, json, itertools, sys
from collections import Counter, defaultdict
from shapely.geometry import Polygon
from shapely.validation import make_valid
from rapidfuzz import fuzz
R=random.Random(20261023)
OUT=sys.argv[1]
SC=[("And Sam Luniou Bokk (ASLB)","ASLB","S",96,14.847,-17.220,9,6),("Bamtare Thiepp-Lompoul","BTL","N",106,15.452,-16.723,16,14),
("COOPADIN","CPD","C",103,15.011,-16.833,10,7),("COOPHAZONI","CPH","C",66,15.001,-16.885,32,4),("COPROFEL","CPF","S",218,14.947,-17.072,7,15),
("KABADIE (Kayar Bayakh Diender)","KBD","S",79,14.903,-17.085,6,9),("SCAPTC","SCT","S",127,14.834,-17.061,16,13),
("SCOOP Agro-sylvo-pastorale (CASP)","CSP","N",117,15.906,-16.407,14,15),("SCOOP Développement de Gandiol","SDG","N",128,15.851,-16.485,11,13),
("SOCOOPAN Niayam Potou","SPN","N",177,15.674,-16.569,9,9),("SOCOOT Thialy","SCO","C",100,15.125,-16.923,17,9)]
FM="Awa Fatou Khady Aminata Mariama Ndeye Rokhaya Coumba Astou Sokhna Dior Bineta Yacine Adama Maty Selbé Mame Nogaye Fama Thioro".split()
MM="Mamadou Ibrahima Moussa Abdoulaye Cheikh Ousmane Modou Pape Samba Babacar Alioune Ndiaga Serigne Mor Lamine Omar Demba Massamba Assane Idrissa Malick Birame Saliou Daouda Souleymane Mbaye Boubacar Amadou Aliou".split()
LN="Ndiaye Diop Fall Sow Ba Sarr Gueye Faye Diallo Mbaye Thiam Cissé Seck Ndao Diouf Kane Sy Niang Samb Mbodj Dieng Ly Wade Tine Sène Badiane Lô Gaye Thioune Dione Toure Kébé Camara".split()
V1="Keur Ndiaga Ndiawar Sagg Mbar Thiès Gade Ndoye Mboro Taïba Pire Léona Mbao Bayakh Diender Kounoune Santhiaba Rao Gandon Ndombo Fass Tivaouane Darou Kheul Bambilor Ngaye Notto Diogo Ndande Kab Lompoul Gorom Mbalkhatt".split()
V2="Ndao Sarr Mbir Mbaye Peulh Thioye Niakhène Diack Salane Gadiaga Fall Seck Barry Wolof Santhie Ndiaye Samb Diouf Nord Sud Bou Khoudia".split()
pool=[f"{a} {b}" for a in ["Keur","Sagg","Darou","Ndiaye","Mboro","Fass","Gade"] for b in V2]+[f"{a} {b}" for a in V1 for b in ["Ouest","Peulh","Sarr","Gueye","Lô"]]
R.shuffle(pool); pi=iter(pool)
CROPS=[("Oignon",512),("Chou",269),("Tomate",173),("Aubergine",149),("Pomme de terre",111),("Carotte",92),("Piment",73),("Manioc",66),("Mangue",60),("Gombo",57),("Maïs",51),("Arachide",46),("Menthe (nana)",42),("Diakhatou (aubergine amère)",40),("Agrumes",37),("Niébé",31),("Navet",31),("Poivron",26),("Persil",25),("Papaye",15),("Bissap / oseille",8),("Concombre",4),("Mil",3),("Basanté",3),("Oignon vert",2),("Anacarde (cajou)",2),("Patate douce",2),("Fraise",2),("Salade / laitue",2),("Céleri",2),("Arbres fruitiers divers",1),("Khousbou",1),("Banane",1),("Haricot vert",1),("Autre",1)]
FAM={"Oignon":"Bulbes","Oignon vert":"Bulbes","Chou":"Feuilles","Persil":"Feuilles","Menthe (nana)":"Feuilles","Salade / laitue":"Feuilles","Céleri":"Feuilles","Bissap / oseille":"Feuilles",
"Tomate":"Fruits-légumes","Aubergine":"Fruits-légumes","Piment":"Fruits-légumes","Gombo":"Fruits-légumes","Poivron":"Fruits-légumes","Diakhatou (aubergine amère)":"Fruits-légumes","Concombre":"Fruits-légumes","Haricot vert":"Fruits-légumes",
"Pomme de terre":"Racines","Carotte":"Racines","Manioc":"Racines","Navet":"Racines","Patate douce":"Racines","Mangue":"Arbres fruitiers","Agrumes":"Arbres fruitiers","Papaye":"Arbres fruitiers","Anacarde (cajou)":"Arbres fruitiers","Arbres fruitiers divers":"Arbres fruitiers","Banane":"Arbres fruitiers","Fraise":"Arbres fruitiers",
"Maïs":"Céréales et légumineuses","Mil":"Céréales et légumineuses","Arachide":"Céréales et légumineuses","Niébé":"Céréales et légumineuses"}
cw=[c for c,_ in CROPS]; cwt=[w for _,w in CROPS]
ORGT=["gie"]*489+["a_qualifier"]*253+["association"]*225+["section"]*205+["individuel"]*124+["membre_direct"]*21
AGE=[("18–24 ans",47,(18,24)),("25–34 ans",255,(25,34)),("35–49 ans",534,(35,49)),("50–64 ans",363,(50,64)),("65 ans et +",92,(65,82))]
def lat2m(): return 111320.0
# ---- organizations
orgs=[]; prods=[]; scoops=[]
for si,(nm,code,zn,n,lat,lon,nv,nop) in enumerate(SC):
    scoops.append(dict(id=f"ORG-{code}",nom=nm,code=code,zone={"N":"Nord","C":"Centre","S":"Sud"}[zn],type="scoop",parent="USCN",effectif=n))
    vil=[next(pi) for _ in range(nv)]
    ops=[]
    for k in range(nop):
        t=R.choice(ORGT); oid=f"ORG-{code}-{k+1:02d}"
        o=dict(id=oid,nom=({"gie":"GIE","a_qualifier":"Organisation","association":R.choice(["Association","Union"]),"section":"Section","membre_direct":"Membres directs"}.get(t,"Producteurs individuels")+" "+R.choice(vil)+f" {k+1}"),type=t,parent=f"ORG-{code}",scoop=nm)
        orgs.append(o); ops.append(o)
    w=[R.random()**2+0.1 for _ in ops]
    for j in range(n):
        o=R.choices(ops,w)[0]
        sex="Femme" if R.random()<192/1317 else "Homme"
        first=R.choice(FM if sex=="Femme" else MM); last=R.choice(LN)
        prods.append(dict(id=f"NIA-{zn}-{code}-{j+1:04d}",nom=f"{first} {last}",sexe=sex,scoop=nm,scoop_id=f"ORG-{code}",zone=scoops[-1]["zone"],organisation_id=o["id"],organisation=o["nom"],type_organisation=o["type"],village=R.choice(vil),_lat=lat,_lon=lon))
R.shuffle(prods)
# stable ids order again
prods.sort(key=lambda p:p["id"])
# ages / quality
agebands=[]
for lab,c,_ in AGE: agebands+= [lab]*c
agebands+=[None]*26; R.shuffle(agebands)
qual=["À vérifier"]*74+["Validée"]*(1317-74); R.shuffle(qual)
hand=["Oui"]*63+["Non"]*1221+[None]*33; R.shuffle(hand)
for i,p in enumerate(prods):
    lab=agebands[i]; p["tranche_age"]=lab
    p["age"]=None if lab is None else R.randint(*[r for l,_,r in AGE if l==lab][0])
    p["jeune_moins_35"]=None if p["age"] is None else p["age"]<35
    p["statut_qualite"]=qual[i]; p["situation_handicap"]=hand[i]
    p["telephone_masque"]=f"+221 7• ••• ••{R.randint(10,99)}"; p["_tel"]=f"+22170{R.randint(1000000,9999999)}"
    p["cni_masquee"]="••••••••••"+f"{R.randint(0,999):03d}" if R.random()<898/1317 else None
    p["statut_adhesion"]="recensé"; p["campagne_enquete"]="CHN 2025-2026"
    p["date_enquete"]=f"2026-0{R.randint(6,9)}-{R.randint(10,28)}"
    p["enqueteur"]=f"Agent {R.randint(1,22):02d}"; p["nb_alertes"]=0
prods[0 if False else R.randrange(1317)]["nom"]=None  # 1 fiche sans nom
# ---- plots
extra=Counter(); n_extra=1534-1317
for _ in range(n_extra):
    while True:
        p=R.choice(prods)
        if extra[p["id"]]<3: extra[p["id"]]+=1; break
plots=[]
for p in prods:
    for k in range(1+extra[p["id"]]):
        plots.append(dict(id=f"{p['id']}-P{k+1}",producteur_id=p["id"],scoop=p["scoop"],scoop_id=p["scoop_id"],village=p["village"],_lat=p["_lat"],_lon=p["_lon"]))
assert len(plots)==1534
ids=list(range(len(plots))); R.shuffle(ids)
area=[max(120,min(40000,int(math.exp(R.gauss(math.log(4800),1.0))))) for _ in plots]
micro=[78,3,9,8,94,43]; big=[142000,102000]
for k,v in enumerate(micro): area[ids[k]]=v
for k,v in enumerate(big): area[ids[10+k]]=v
nocult=set(ids[:6])|{ids[20],ids[21]}  # 4 micro? first 6 micro; 4 of them without culture + 2 other
nocult=set(ids[i] for i in (0,1,2,3))|{ids[20],ids[21]}
# placement per scoop on a grid
by=defaultdict(list)
for i,pl in enumerate(plots): by[pl["scoop"]].append(i)
SP=520.0
geom={}
def rect(cx,cy,w,h): return [(cx-w/2,cy-h/2),(cx+w/2,cy-h/2),(cx+w/2,cy+h/2),(cx-w/2,cy+h/2)]
cells={}
for s,lst in by.items():
    R.shuffle(lst); side=math.ceil(math.sqrt(len(lst)*1.15)); cells[s]=[]
    for gi in range(side*side):
        cells[s].append(((gi%side)*SP,(gi//side)*SP))
    R.shuffle(cells[s])
cx0={}
for s,lst in by.items():
    for i in lst:
        cx,cy=cells[s].pop()
        a=area[i]; ar=R.uniform(0.6,1.7); w=math.sqrt(a*ar); h=a/w
        if i in (ids[10],ids[11]): w=h=math.sqrt(a)
        if w>480 and i not in (ids[10],ids[11]): w=h=math.sqrt(a)
        geom[i]=[cx+R.uniform(-30,30),cy+R.uniform(-30,30),w,h]
# overlap pairs: 28 = 12 (20-50) + 9 (50-90) + 7 (>90)
fr=[R.uniform(.22,.48) for _ in range(12)]+[R.uniform(.55,.88) for _ in range(9)]+[R.uniform(.92,.985) for _ in range(7)]
cand=[i for i in range(len(plots)) if i not in ids[:22] and 800<area[i]<20000]
R.shuffle(cand); pairs=[]
used=set()
for f in fr:
    for a in cand:
        if a in used: continue
        same=[b for b in by[plots[a]["scoop"]] if b!=a and b not in used and plots[b]["producteur_id"]!=plots[a]["producteur_id"] and b in cand]
        if not same: continue
        b=R.choice(same); used|={a,b}; pairs.append((a,b,f)); break
for a,b,f in pairs:
    cx,cy,w,h=geom[a]; area[b]=area[a]
    geom[b]=[cx+(1-f)*w,cy,w,h]
M=111320.0
def poly_ll(i,jitter=True,bow=False):
    cx,cy,w,h=geom[i]; s=plots[i]
    n=R.randint(6,26) if jitter else 4
    pts=[]
    corners=rect(cx,cy,w,h); 
    for k in range(4):
        x0,y0=corners[k]; x1,y1=corners[(k+1)%4]
        m=max(1,n//4) if jitter else 1
        for t in range(m): pts.append((x0+(x1-x0)*t/m,y0+(y1-y0)*t/m))
    out=[]
    for k,(x,y) in enumerate(pts):
        if k%4 and jitter and not bow: x+=R.uniform(-0.8,0.8); y+=R.uniform(-0.8,0.8)
        out.append((x,y))
    if bow and len(out)>=4: out[1],out[2]=out[2],out[1]
    lat0=s["_lat"]; lon0=s["_lon"]
    conv=lambda x,y:[round(lon0+x/(M*math.cos(math.radians(lat0))),6),round(lat0+y/M,6)]
    ring=[conv(x,y) for x,y in out]; ring.append(ring[0]); return ring
rep=set(R.sample(range(len(plots)),433))
pairset={}
for a,b,f in pairs: pairset[a]=b; pairset[b]=a
# ---- crops
share=[(1,1187),(2,283),(3,46),(4,10),(5,2)]
ncl=[k for k,c in share for _ in range(c)]
R.shuffle(ncl)
pc=0
for i,pl in enumerate(plots):
    pl["superficie_ha"]=round(area[i]/10000,4)
    pl["superficie_m2"]=area[i]
    pl["contour"]=poly_ll(i,True)
    pl["contour_valide"]= i not in rep
    if i in rep:
        pl["contour_brut"]=poly_ll(i,True,bow=True)
    pl["nb_points_contour"]=len(pl["contour"])-1
    pl["precision_gps_m"]=round(R.uniform(2,12) if R.random()>0.05 else R.uniform(20,40),1)
    pl["statut_foncier"]=R.choices(["Droit d'usage coutumier","Délibération municipale","Autre","Propriété avec titre foncier","Location informelle / prêt","Bail rural"],[959,191,190,97,65,32])[0]
    if i in nocult: k=0
    else: k=ncl[pc]; pc+=1
    cs=[]
    if k:
        picks=[]
        while len(picks)<k:
            c=R.choices(cw,cwt)[0]
            if c not in picks: picks.append(c)
        parts=[R.random()+0.3 for _ in picks]; tot=sum(parts); 
        for c,pt in zip(picks,parts): cs.append(dict(culture=c,part_pct=round(100*pt/tot)))
    pl["cultures"]=cs
    pl["statut_qualite"]="À vérifier" if (R.random()<88/1534) else "Validée"

# ---- overlap verification from geometry (exact)
def polyxy(pl):
    lat0=pl["contour"][0][1]
    return Polygon([((x-0)*M*math.cos(math.radians(lat0)),y*M) for x,y in pl["contour"]])
G={}
for i,pl in enumerate(plots):
    g=polyxy(pl); G[i]=g if g.is_valid else make_valid(g)
from shapely.strtree import STRtree
idx=list(G); tree=STRtree([G[i] for i in idx]); ov=[]
for a in idx:
    for j in tree.query(G[a]):
        b=idx[j]
        if b<=a or plots[a]["producteur_id"]==plots[b]["producteur_id"]: continue
        # compare only plots of the same scoop (same local frame)
        if plots[a]["scoop"]!=plots[b]["scoop"]: continue
        it=G[a].intersection(G[b]).area
        if it<=0: continue
        m=max(it/G[a].area,it/G[b].area)
        if m>0.2: ov.append((a,b,m))
bk=Counter(">90" if m>.9 else ">50" if m>.5 else "20-50" for _,_,m in ov)
print("overlaps",len(ov),dict(bk))
ovset=set()
for a,b,m in ov: ovset|={a,b}
for i,pl in enumerate(plots):
    st="validee"
    if pl["statut_qualite"]=="À vérifier": st="relevee"
    if area[i]<100: st="a_reprendre"
    if i in ovset: st="chevauchement"
    pl["statut_carte"]=st
    del pl["_lat"],pl["_lon"]
pid={p["id"]:p for p in prods}
for p in prods: del p["_lat"],p["_lon"]
chev=[dict(parcelle_a=plots[a]["id"],parcelle_b=plots[b]["id"],producteur_a=plots[a]["producteur_id"],producteur_b=plots[b]["producteur_id"],recouvrement_pct=round(m*100),tranche=">90 %" if m>.9 else ">50 %" if m>.5 else "20–50 %") for a,b,m in sorted(ov,key=lambda t:-t[2])]
# ---- phone groups: 25 pairs + 1 triple = 53 fiches
phone_groups=[]; pool_p=[p for p in prods]; R.shuffle(pool_p); taken=set()
def pick(n):
    base=R.choice([p for p in pool_p if p["id"] not in taken]); grp=[base]
    same=[p for p in pool_p if p["id"] not in taken and p is not base and p["scoop"]==base["scoop"]]
    R.shuffle(same)
    sv=[p for p in same if p["village"]==base["village"]]
    for p in (sv+same)[:n-1]: grp.append(p)
    for p in grp: taken.add(p["id"])
    return grp
for k in range(26):
    g=pick(3 if k==0 else 2)
    tel=f"+22170{R.randint(1000000,9999999)}"
    for p in g: p["_tel"]=tel; p["telephone_masque"]=f"+221 7• ••• ••{tel[-2:]}"
    phone_groups.append(dict(groupe=f"TEL-{k+1:02d}",fiches=[p["id"] for p in g],meme_village=len({p['village'] for p in g})==1))
# ---- CNI duplicate candidates (5 pairs)
dups=[]; spec=[("à_examiner","À vérifier",266,False),("à_examiner","À vérifier",108,False),("à_examiner","À vérifier",123,False),("à_examiner","Doublon probable",6,True),("à_examiner","À vérifier",93,False)]
usedp=set(taken)
for k,(st,cl,dist,tel) in enumerate(spec):
    base=R.choice([p for p in prods if p["id"] not in usedp and p["nom"]])
    mate=R.choice([p for p in prods if p["id"] not in usedp and p["scoop"]==base["scoop"] and p["village"]==base["village"] and p is not base and p["nom"]] or [p for p in prods if p["id"] not in usedp and p["scoop"]==base["scoop"] and p is not base and p["nom"]])
    usedp|={base["id"],mate["id"]}
    c=f"••••••••••{R.randint(0,999):03d}"
    base["cni_masquee"]=mate["cni_masquee"]=c
    if tel: mate["_tel"]=base["_tel"]; mate["telephone_masque"]=base["telephone_masque"]
    dups.append(dict(id=f"DUP-{k+1:02d}",signal="CNI identique",fiche_a=base["id"],fiche_b=mate["id"],cni_masquee=c,sim_nom=round(fuzz.token_sort_ratio(base["nom"].lower(),mate["nom"].lower())),
      meme_village=base["village"]==mate["village"],meme_telephone=tel,distance_min_parcelles_m=dist,statut="à_examiner",classement_propose=cl,decision_humaine=None,commentaire=None))
# ---- merge history 19
merges=[]
for k in range(19):
    a,b=R.sample([p for p in prods if p["nom"] and p["id"] not in usedp],2)
    merges.append(dict(id=f"MRG-{k+1:02d}",fiche_conservee=a["id"],fiche_supprimee_source=f"{a['id'][:-4]}{R.randint(1,9999):04d}*",scoop=a["scoop"],nom_conserve=a["nom"],date="2026-09-%02d"%R.randint(10,30),reversible=True,parcelles_rattachees=R.randint(1,3)))
# ---- alerts 609
types=[("Oignon — Rendement CHN aberrant (quantité à vérifier)",78,"Cultures"),("Précision GPS moyenne du contour > 20 m",47,"Parcelles"),("Oignon — Rendement CS aberrant (quantité à vérifier)",37,"Cultures"),("Durée d'entretien < 10 min",36,"Producteurs"),("Âge manquant",26,"Producteurs"),("Maïs — Rendement CS aberrant (quantité à vérifier)",26,"Cultures"),("Chou — Rendement CHN aberrant (quantité à vérifier)",25,"Cultures"),("Contour auto-intersecté : écart > 10 % avec la superficie Kobo",24,"Parcelles"),("Chou — Rendement CS aberrant (quantité à vérifier)",23,"Cultures"),("Carotte — Rendement CHN aberrant (quantité à vérifier)",21,"Cultures"),("Menthe (nana) — Rendement CHN aberrant (quantité à vérifier)",21,"Cultures"),("Gombo — Rendement CHN aberrant (quantité à vérifier)",17,"Cultures"),
("Tomate — Rendement CHN aberrant (quantité à vérifier)",40,"Cultures"),("Tomate — Rendement CS aberrant (quantité à vérifier)",22,"Cultures"),("Aubergine — Rendement CHN aberrant (quantité à vérifier)",34,"Cultures"),("Aubergine — Rendement CS aberrant (quantité à vérifier)",18,"Cultures"),("Pomme de terre — Rendement CHN aberrant (quantité à vérifier)",25,"Cultures"),("Pomme de terre — Rendement CS aberrant (quantité à vérifier)",12,"Cultures"),("Piment — Rendement CHN aberrant (quantité à vérifier)",20,"Cultures"),("Manioc — Rendement CHN aberrant (quantité à vérifier)",15,"Cultures"),
("Superficie hors bornes (micro-parcelle ou > 10 ha)",8,"Parcelles"),("Parcelle sans culture",6,"Parcelles"),("Superficie cultivée supérieure à la superficie de la parcelle",13,"Parcelles"),("Téléphone invalide",4,"Producteurs"),("Format de CNI invalide",11,"Producteurs")]
assert sum(t[1] for t in types)==609, sum(t[1] for t in types)
alerts=[]
for t,c,tab in types:
    for _ in range(c):
        ent=R.choice(prods)["id"] if tab=="Producteurs" else (R.choice(plots)["id"] if tab=="Parcelles" else R.choice(plots)["id"]+"-C1")
        alerts.append(dict(id=f"AL-{len(alerts)+1:04d}",entite_type=tab,entite_id=ent,alerte=t,severite="moyenne" if "aberrant" in t else "faible" if "Âge" in t or "Durée" in t else "moyenne",statut="ouvert",commentaire=None))
R.shuffle(alerts)
for i,a in enumerate(alerts): a["id"]=f"AL-{i+1:04d}"
# recompute nb_alertes for producers only (demo)
for a in alerts:
    if a["entite_type"]=="Producteurs": pid[a["entite_id"]]["nb_alertes"]+=1
for p in prods: p.pop("_tel",None)
for p in prods: p["nom_affiche"]=p["nom"] or "(nom manquant)"
# ---- misc
users=[dict(id="U-01",nom="Administrateur démo",role="Administrateur CRADESC",perimetre="Tous"),dict(id="U-02",nom="Gestionnaire démo",role="Gestionnaire de SCOOP",perimetre="COPROFEL"),dict(id="U-03",nom="Lecture faîtière démo",role="Faîtière (USCN)",perimetre="Tous (lecture)"),dict(id="U-04",nom="Technicien démo",role="Technicien",perimetre="Nord")]
roles=[dict(role=r,permissions=p) for r,p in [("Administrateur CRADESC",["producers.read","producers.write","identity.read_full","duplicates.merge","plots.validate","users.manage","imports.run","audit.read","exports.nominative"]),("Gestionnaire de SCOOP",["producers.read","producers.write","plots.validate","duplicates.review","reports.read"]),("Faîtière (USCN)",["producers.read","reports.read"]),("Technicien",["producers.read","plots.validate","duplicates.review"])]]
imp=dict(fichier="base_demo.xlsx",statut="termine",criteres={"volumes":"1 317 / 1 534 / 1 941","liens_orphelins":0,"geometries":"1 534 brutes + 433 réparées = 1 967","journal":"2 673 / 2 673","fusions_historiques":"19 / 19","cni_en_clair":0,"seconde_passe":"aucune création"},
  constats=dict(chevauchements=28,micro_parcelles=6,fiche_sans_nom=1,cni_identiques=5,groupes_telephone=26,organisations_a_qualifier_fiches=253))
audit=[dict(horodatage=f"2026-10-{d:02d} {R.randint(7,18):02d}:{R.randint(0,59):02d}",utilisateur=R.choice(users)["nom"],action=a,entite=e) for d,a,e in [(20,"Révélation CNI (tracée)",prods[10]["id"]),(20,"Validation de parcelle",plots[40]["id"]),(21,"Classement doublon : à examiner",dups[0]["id"]),(21,"Qualification d'organisation en lot",orgs[3]["id"]),(22,"Import à blanc terminé","LOT-001"),(22,"Export nominatif",prods[50]["scoop_id"]),(22,"Fusion annulée",merges[2]["id"])]]
tot_ha=sum(area)/10000
crops=[dict(nom=c,famille=FAM.get(c,"Autres"),nb_cultures=w) for c,w in CROPS]
doc=dict(_avertissement="JEU DE DONNÉES FICTIF. Noms, téléphones, CNI et villages sont inventés ; aucune personne réelle. Volumes et répartitions alignés sur la base CRADESC du 05/10/2026.",
 resume=dict(producteurs=len(prods),parcelles=len(plots),cultures=sum(len(p["cultures"]) for p in plots),scoop=len(scoops),organisations_base=len(orgs),alertes=len(alerts),doublons_cni=len(dups),fusions_historiques=len(merges),groupes_telephone=len(phone_groups),chevauchements=len(chev),superficie_totale_ha=round(tot_ha,1)),
 scoops=scoops,organisations=orgs,producteurs=prods,parcelles=plots,chevauchements=chev,doublons_candidats=dups,groupes_telephone=phone_groups,fusions_historiques=merges,alertes=alerts,cultures_referentiel=crops,utilisateurs=users,roles=roles,import_a_blanc=imp,journal_audit=audit)
json.dump(doc,open(OUT,"w"),ensure_ascii=False,separators=(",",":"))
print(doc["resume"]); print(Counter(p["type_organisation"] for p in prods)); print(Counter(p["statut_carte"] for p in plots))
print(Counter(len(p["cultures"]) for p in plots))
