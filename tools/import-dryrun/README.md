# import-dryrun — banc de validation de l'import CRADESC

Valide, sur les vraies données, les règles d'import du PRD Backend §6. **Ce n'est pas le schéma de production.**

## Contenu

| Fichier | Rôle |
|---|---|
| `import_cradesc_dryrun.py` | Script d'import à blanc (staging en mémoire → tables cibles SQLite avec clés étrangères) |
| `Rapport_import_a_blanc.md` | Résultat des 7 critères d'acceptation et constats |
| `rapport_import_a_blanc.json` | Mêmes résultats, lisibles par une machine |

## Lancer

```bash
pip install pandas openpyxl shapely pyproj cryptography
python3 import_cradesc_dryrun.py <base_cradesc.xlsx> <dossier_sortie> --passes 2
```

Code de sortie `0` si les critères sont atteints, `1` sinon.

## Confidentialité

- Le fichier source contient des **données personnelles** (noms, téléphones, CNI, photos) : ne pas le versionner ni le partager.
- Les sorties de ce dossier (rapport, journal d'exécution) ne contiennent **aucune donnée personnelle**.
- La base SQLite est en mémoire et n'est jamais écrite. Les clés de chiffrement sont éphémères.

## Garanties du script

- `ON CONFLICT DO NOTHING` ne masque que les doublons de clé unique : toute autre violation (champ obligatoire, clé étrangère) lève une erreur.
- Aucune fiche n'est fusionnée ni supprimée ; les cas douteux deviennent des signaux (`data_quality_flag`, `duplicate_candidate`).
