# Setup guidé — `association.json`

À exécuter une seule fois, à la première utilisation du skill pour une association donnée.

## 1. Copier le modèle

```
cp association.example.json association.json
```

## 2. Remplir le bloc identité

| Champ | Source | Obligatoire si |
|-------|--------|----------------|
| `name` | Statuts | Toujours |
| `legal_form` | `association_loi_1901` ou `association_droit_local_alsace_moselle` | Toujours |
| `object` | Statuts (article 2 typiquement) | Toujours |
| `address` | Statuts (siège social) | Toujours |
| `rna` | Récépissé de déclaration ou Le Compte Asso, format `W123456789` | Toujours |
| `siren` / `siret` | INSEE (gratuit via Le Compte Asso) | Si l'association emploie des salariés, reçoit des subventions publiques, ou facture des prestations |
| `naf` | INSEE (souvent 9499Z « autres organisations fonctionnant par adhésion ») | Si SIRET attribué |
| `joafe.declaration_date`, `joafe.annonce_url` | https://www.journal-officiel.gouv.fr/pages/associations | Toujours |

## 3. Renseigner le bureau

`bureau.presidente`, `bureau.tresorier`, `bureau.secretaire` : civilité, prénom, nom, date d'élection. Source = PV d'AG.

## 4. Définir l'exercice et l'AG

- `fiscal_year.start` / `end` : statuts (souvent 01/09 → 31/08 pour une APE, 01/01 → 31/12 sinon).
- `ag.approbation_comptes_deadline` : usage = 6 mois après clôture, sauf statuts contraires.

## 5. Régime comptable et fiscal

- `comptabilite.referentiel` : `ANC_2018-06` par défaut. Mettre `simplifiee` si l'association est en comptabilité de trésorerie et n'a pas d'obligation légale d'appliquer l'ANC (cf. [anc-2018-06.md](anc-2018-06.md)).
- `comptabilite.type` : `engagement` ou `tresorerie`.
- `regime_fiscal.gestion_desinteressee` : `true` si dirigeants bénévoles (cf. [fiscalite.md](fiscalite.md)).
- `regime_fiscal.activites_lucratives_accessoires` : `true` si activités économiques (cours, billetterie, vente régulière).
- `regime_fiscal.franchise_impots_commerciaux` : `true` si recettes lucratives ≤ seuil annuel (81 051 EUR pour 2026).
- `regime_fiscal.assujettie_tva` : généralement `false` si franchise applicable.
- `regime_fiscal.is_taux_reduit_revenus_patrimoniaux` : `true` si revenus fonciers, mobiliers, dividendes (art. 206-5 CGI).

## 6. Eligibilité reçus fiscaux

- `recu_fiscal.eligible_art_200` : ne mettre à `true` que si l'association est d'intérêt général **et** ne sert pas un cercle restreint **et** remplit les conditions de l'art. 200-1-b CGI.
- `recu_fiscal.rescrit_obtenu` : `true` si rescrit fiscal mécénat positif (ou silence administratif > 6 mois).
- `recu_fiscal.recu_template` : `CERFA_11580_05` (modèle officiel à jour).

## 7. Subventions et seuil 153 000 EUR

- `subventions_publiques.total_exercice_courant` : cumul subventions publiques + dons défiscalisés.
- `subventions_publiques.depasse_seuil_153000` : `true` si > 153 000 EUR → déclenche obligation CAC + dépôt DILA.

## 8. Banques

`banks` : un objet par compte, avec `id`, `name`, `account` (numéro PCG 512x), `fec_account` (subdivision interne si plusieurs comptes).

## 9. Vérification finale

```
jq '.' association.json
```

Doit renvoyer le JSON parsé sans erreur.

À chaque changement de bureau, de régime, ou de seuil franchi, **mettre à jour `association.json`**.
