# Revenus fonciers, LMNP et SCI à l'IR

## Distinction fondamentale

| Type de location | Régime fiscal | Catégorie |
|------------------|---------------|-----------|
| Non meublée (location nue) | Revenus fonciers | Revenus fonciers (micro ou réel) |
| Meublée non professionnelle | **BIC** | LMNP (micro-BIC ou réel) |
| Meublée professionnelle | **BIC** | LMP (réel obligatoire) |
| SCI à l'IR | Revenus fonciers | Transparence fiscale |
| SCI à l'IS | IS | **Hors scope fiscaliste** — voir skill `comptable` |

**Erreur classique** : déclarer une location meublée en revenus fonciers. Non — le meublé relève des BIC. Conséquences fiscales très différentes (amortissements possibles en réel).

## Revenus fonciers (location nue)

### Micro-foncier (régime simplifié)

Voir `data/regimes-fonciers-lmnp.json` → `micro_foncier`.

- **Condition** : revenus fonciers bruts ≤ 15 000 €
- **Abattement** : 30% automatique
- **Exclusions** : SCI, monuments historiques, Pinel, Borloo, Malraux, etc.
- **Avantage** : simplicité. Pas de comptabilité.
- **Inconvénient** : aucun déficit possible. Si vos charges réelles > 30%, vous payez trop d'impôt.

### Régime réel

Obligatoire au-delà de 15 000 € bruts ou sur option irrévocable pour 3 ans.

**Charges déductibles** :
- Intérêts d'emprunt (imputables uniquement sur les revenus fonciers)
- Travaux d'entretien, réparation, amélioration (pas construction, pas agrandissement)
- Taxe foncière (hors TEOM récupérable)
- Primes d'assurance (PNO, GLI)
- Frais de gestion (agence, syndic fraction non récupérable)
- Provisions pour charges de copropriété

**Piège travaux** : les travaux de construction, reconstruction, agrandissement **NE SONT PAS** déductibles des revenus fonciers — ils majorent seulement le prix d'acquisition pour la future plus-value.

### Déficit foncier

Voir `data/regimes-fonciers-lmnp.json` → `regime_reel_foncier.deficit_foncier`.

**Mécanisme** :
- Charges > recettes → déficit
- **Imputable sur le revenu global dans la limite de 10 700 €** par an (ou 21 400 € pour travaux de rénovation énergétique globale — dispositif temporaire)
- Au-delà : reportable sur les revenus fonciers des **10 années suivantes**
- **Exception critique** : les intérêts d'emprunt **ne sont JAMAIS imputables sur le revenu global**, uniquement sur les revenus fonciers

**Stratégie d'optimisation** :
- Concentrer les travaux importants sur une année → déficit imputable sur revenu global
- Attention à ne pas vendre le bien avant 3 ans après imputation (sinon reprise du déficit)

## LMNP (Location Meublée Non Professionnelle)

### Régime micro-BIC

Voir `data/regimes-fonciers-lmnp.json` → `micro_bic_lmnp`.

**Réforme loi Le Meur (nov. 2024), applicable revenus 2025** — la distinction clé est désormais **classé / non classé**, plus résidence principale.

| Type de location | Seuil | Abattement |
|------------------|-------|-----------|
| LMNP longue durée | 77 700 € | 50% |
| Meublé de tourisme classé | 77 700 € | 50% |
| **Meublé de tourisme non classé** | **15 000 €** | **30%** |

Au-delà des plafonds : régime réel obligatoire.

### Régime réel LMNP

**Principe** : résultat BIC = recettes − charges − **amortissements**.

**Amortissements** :
- Bien immobilier : 2-3%/an sur 25-40 ans (hors terrain, terrain non amortissable)
- Mobilier : 10-20%/an sur 5-10 ans
- Gros travaux : amortissables sur leur durée d'usage

**Résultat fiscal** : souvent nul ou déficitaire grâce aux amortissements → pas d'IR sur les loyers pendant des années.

**Déficit LMNP** : NON imputable sur le revenu global (contrairement au LMP). Reportable sur les BIC meublés des **10 années suivantes**.

### Bascule LMP vs LMNP

Voir `data/regimes-fonciers-lmnp.json` → `lmp_vs_lmnp`.

**Conditions LMP (cumulatives)** :
1. Recettes meublées > 23 000 €
2. ET recettes meublées > 50% des autres revenus professionnels du foyer (salaires + BNC + BIC + rémunérations dirigeant)

**Conséquences LMP** :
- Déficits imputables sur le revenu global
- Plus-values professionnelles (exonération possible après 5 ans sous conditions de recettes)
- Cotisations sociales TNS sur le bénéfice (SSI) — charge significative
- Biens exonérés d'IFI comme biens professionnels (sous conditions)

**Attention bascule involontaire** : une baisse des revenus professionnels (chômage, retraite) peut faire basculer en LMP malgré des loyers inchangés. À surveiller.

## SCI à l'IR

Voir `data/regimes-fonciers-lmnp.json` → `sci_ir`.

**Régime par défaut** : transparence fiscale.

- Les revenus et charges remontent directement dans la déclaration de chaque associé au prorata des parts
- Nature fiscale : revenus fonciers classiques (micro ou réel selon le total fonciers du foyer)
- Cession des parts ou du bien : régime des plus-values immobilières des particuliers
- L'amortissement **n'est PAS possible** (contrairement à la SCI à l'IS)

**Quand choisir SCI IR** :
- Transmission patrimoniale (démembrement, donation de parts)
- Location nue (meublé en SCI = risque de requalification IS)
- Détention longue (exonération PV immo à 22 ans IR / 30 ans PS)

**Quand choisir SCI IS (hors scope)** :
- Fort rendement locatif et réinvestissement
- Possibilité d'amortir le bien
- Piège : à la cession, PV calculée sur valeur nette comptable (après amortissements) → imposition forte

→ Pour SCI à l'IS, voir skill `comptable`.

## Formulaires

| Régime | Formulaire |
|--------|-----------|
| Micro-foncier | 2042 case 4BE |
| Régime réel foncier | 2044 (ou 2044 spéciale) |
| Micro-BIC LMNP | 2042 C-PRO (cases 5ND, 5NG, etc.) |
| Réel LMNP / LMP | 2031 + 2033 (liasse BIC) + 2042 C-PRO |
| SCI IR | Déclaration 2072 (SCI) + report sur 2044 (associés) |

## Références CGI / BOFiP

- Revenus fonciers : art. 14 à 33 quater CGI
- Déficit foncier : art. 156-I-3° CGI
- LMNP : art. 35-I-5° bis CGI
- LMP : art. 155-IV CGI
- SCI : art. 8 CGI (transparence)
- BOFiP : BOI-RFPI (fonciers) et BOI-BIC-CHAMP-40 (meublés)
