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
- **Recettes brutes** : loyers et recettes accessoires, **hors charges locatives récupérables** (sommes versées par le locataire au titre des charges lui incombant), mais augmentées des dépenses du bailleur mises par convention à la charge du locataire. Source : BOI-RFPI-DECLA-10 § 100. Seuil de 15 000 € apprécié sur l'ensemble du foyer, sans prorata temporis.
- **Exclusions** (CGI art. 32, 2 ; BOI-RFPI-DECLA-10 § 60 à 80) : monuments historiques, Périssol, Besson neuf et ancien, Robien, Robien ZRR, Borloo neuf et ancien, conventions ANAH, Cosse, déductions spécifiques Scellier intermédiaire et Scellier ZRR (la réduction d'impôt Scellier elle-même n'exclut pas le micro, voir « Compatibles »), résidences de tourisme (art. 199 decies EA) et travaux dans les logements touristiques (art. 199 decies F), Loc'Avantages (art. 199 tricies), immeubles possédés en nue-propriété (brochure IR 2026, revenus fonciers, p. 158), parts de sociétés qui louent l'un de ces immeubles, parts de sociétés pratiquant l'amortissement de l'art. 31 bis (Robien SCPI et Borloo SCPI), amortissement « bailleur privé » (art. 31, I, 1°, i et j, ajouté au c du 2 de l'art. 32 par la LFI 2026, art. 47, I, 2°). Voir `micro_foncier.exclusions`. L'exclusion ne vaut que pendant la période où le dispositif est demandé.
- **Parts de sociétés et de FPI** (CGI art. 32, 2-d et 2-g ; BOI-RFPI-DECLA-10 § 50 et 70) : pas d'exclusion de principe des SCI. Le micro est exclu seulement si **les seuls revenus fonciers du foyer** viennent de parts de sociétés non soumises à l'IS ou de FPI (quote-part portée directement en 4BA). Un associé qui possède aussi au moins un immeuble loué nu en direct reste éligible ; ses quotes-parts entrent dans le seuil de 15 000 €. Voir `micro_foncier.exclusions_sans_immeuble_en_direct`.
- **Compatibles** : les réductions d'impôt Scellier, Duflot, Pinel, Denormandie et Malraux **n'excluent pas** le micro-foncier (BOI-RFPI-DECLA-10, remarque sous le § 60).
- **Avantage** : simplicité. Pas de comptabilité.
- **Inconvénient** : aucun déficit possible. Si vos charges réelles > 30%, vous payez trop d'impôt.
- **Déficits antérieurs (réel)** : ceux encore reportables au 1er janvier de la 1re année micro restent imputables sur le revenu net micro-foncier (droit commun, 10 ans). Case **4BD**. Source : BOI-RFPI-DECLA-10 § 170 ; brochure IR 2026 p. 158.

### Régime réel

Obligatoire au-delà de 15 000 € bruts ou sur option irrévocable pour 3 ans.

**Charges déductibles** :
- Intérêts d'emprunt (compensés en priorité par les loyers ; seul leur excédent sur les loyers est cantonné aux revenus fonciers)
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
- **Ordre d'imputation** : les loyers bruts compensent **d'abord les intérêts d'emprunt**, puis les autres charges (BOI-RFPI-BASE-30-20 § 110). Seul l'excédent d'intérêts sur les loyers est cantonné aux revenus fonciers ; tant que les loyers couvrent les intérêts, tout le déficit provient des autres charges.
- **Imputable sur le revenu global dans la limite de 10 700 €** par an (art. 156, I, 3° CGI). Sur option (déclaration 2044), cette limite est **rehaussée du montant des dépenses** de rénovation énergétique qui font passer un logement d'une classe E, F ou G à une classe A, B, C ou D, **sans pouvoir excéder 21 400 €** (BOI-RFPI-BASE-30-20 du 16/09/2025 § 35 ; détail § 210 à 310) : ce n'est ni un plafond forfaitaire ni un « doublement ». Devis accepté à compter du 05/11/2022 et dépenses payées à compter du 01/01/2023 (§ 260, qui borne les paiements au 31/12/2025), prorogé pour les dépenses payées jusqu'au 31/12/2027 (LF 2026, loi 2026-103 art. 47) ; deux DPE à fournir (avant et après travaux)
- **Condition de maintien** : le bien doit rester loué nu jusqu'au **31 décembre de la troisième année qui suit l'imputation** ; à défaut (vente, reprise pour soi, passage en meublé), le déficit imputé sur le revenu global est réintégré (BOI-RFPI-BASE-30-20 § 20 et § 340 à 370)
- Au-delà de la limite : reportable sur les revenus fonciers des **10 années suivantes**
- Si le revenu global ne suffit pas à absorber la part imputable : l'excédent forme un **déficit global reportable 6 ans** sur le revenu global (art. 156-I, 1er alinéa CGI ; BOI-RFPI-BASE-30-20 § 160)
- **Exception critique** : la part du déficit qui provient de l'excédent des intérêts d'emprunt sur les loyers **n'est pas imputable sur le revenu global**, uniquement sur les revenus fonciers (sauf monuments historiques, BOI-RFPI-SPEC-30-20-10 § 80)
- Cases 2042 : 4BA (bénéfice), 4BB (déficit imputable sur les revenus fonciers), 4BC (déficit imputable sur le revenu global), 4BD (déficits antérieurs), annexe 2044.

**Exemple** : loyers 15 000 €, charges 4 000 €, travaux 18 000 €, intérêts 6 000 € → déficit 13 000 €. Les loyers (15 000 €) couvrent les intérêts (6 000 €) : tout le déficit vient des autres charges. 10 700 € s'imputent sur le revenu global, 2 300 € se reportent sur les revenus fonciers des 10 années suivantes.

**Stratégie d'optimisation** :
- Concentrer les travaux importants sur une année → déficit imputable sur revenu global
- Attention à ne pas vendre ni cesser de louer nu le bien avant le 31 décembre de la 3e année qui suit l'imputation (sinon réintégration du déficit)

### Amortissement « bailleur privé » (acquisitions du 21/02/2026 au 31/12/2028)

Nouveau dispositif de la LFI 2026 (art. 47 ; art. 31, I, 1°, i et j CGI) : pour un logement dans un bâtiment d'habitation collectif acquis en vue d'une location nue, neuf (i) ou ancien (j : travaux concourant à la production d'un immeuble neuf au sens de la TVA, ou travaux d'amélioration d'au moins 30 % du prix d'acquisition satisfaisant les critères d'une réhabilitation lourde), déduction des revenus fonciers d'un amortissement de 3,5 % (neuf) ou 3 % (ancien), majoré pour les loyers sociaux ou très sociaux, sur le prix d'acquisition net de frais (majoré des travaux pour l'ancien) diminué d'un foncier forfaitaire de 20 %, dans la limite de 8 000 € par an et par foyer (majorée de 2 000 ou 4 000 € selon la part des loyers sociaux). Engagement de location nue en résidence principale pendant neuf ans, hors famille proche, sous plafonds de loyers et de ressources. Ouvert aussi aux sociétés non soumises à l'IS ; exclu pour les biens démembrés, sauf reprise par le conjoint survivant après le décès de l'un des époux. Le dispositif exclut le micro-foncier (art. 32, 2, c). À la revente, les amortissements admis en déduction sont retranchés du prix d'acquisition (art. 150 VB, III ; voir « Cession d'un bien LMNP »). Plafonds de loyers et de ressources, interaction avec le déficit foncier : à vérifier au BOFiP avant tout calcul.

## LMNP (Location Meublée Non Professionnelle)

### Régime micro-BIC

Voir `data/regimes-fonciers-lmnp.json` → `micro_bic_lmnp`.

**Réforme loi Le Meur (nov. 2024), applicable revenus 2025** — la distinction clé est désormais **classé / non classé**, plus résidence principale.

| Type de location | Seuil revenus 2025 | Seuil revenus 2026 à 2028 | Abattement | Case 2042 C PRO (2026) |
|------------------|-------|-------|-----------|-----------|
| Autres locations meublées (longue durée, bail mobilité) | 77 700 € | 83 600 € | 50% | 5NI / 5OI / 5PI |
| Meublé de tourisme classé, chambres d'hôtes | 77 700 € | 83 600 € | 50% | 5NG / 5OG / 5PG |
| **Meublé de tourisme non classé** | **15 000 €** | **15 000 €** | **30%** | 5NH / 5OH / 5PH |

Seuils 2026-2028 : BOI-BAREME-000044 (version du 19/08/2026). Le micro reste applicable si le seuil n'est pas dépassé en N-1 ou en N-2 ; régime réel obligatoire après deux années consécutives de dépassement (brochure IR 2026, revenus non salariés). La case 5ND n'existe plus.

**Déficits LMNP antérieurs (constatés au réel)** : le micro-BIC ne crée jamais de déficit, mais les déficits LMNP des 10 années précédentes non encore imputés (cases **5GA à 5GJ**) s'imputent sur le résultat micro-BIC net (recettes − abattement), comme en micro-foncier. Imputation limitée au revenu LMNP net de l'année (pas de déficit créé, rien sur le revenu global), les plus anciens d'abord.
- Fondement : art. 156-I-1° ter CGI (imputation sur « les revenus provenant d'une telle activité », sans distinction de régime) ; BOI-BIC-CHAMP-40-20 § 250. La calculette officielle DGFiP (`ir-calcul`, chap-85 : `DNPLOCIMPU = min(déficits 5GA-5GJ, BIC LMNP réel + micro net)`) applique bien ces déficits au résultat micro.
- Nuance : aucun § BOFiP ne nomme expressément le micro-BIC (contrairement au micro-foncier, BOI-RFPI-DECLA-10 § 170).

### Régime réel LMNP

**Principe** : résultat BIC = recettes − charges − **amortissements**.

**Amortissements** :
- Bien immobilier : 2-3%/an sur 25-40 ans (hors terrain, terrain non amortissable)
- Mobilier : 10-20%/an sur 5-10 ans
- Gros travaux : amortissables sur leur durée d'usage

**Limite des amortissements** : déductibles dans la limite du loyer acquis diminué des autres charges → ils **ne peuvent ni créer ni accroître un déficit** (art. 39 C CGI ; BOI-BIC-CHAMP-40-20 § 57). La part non déduite est reportée sans limite de durée (art. 39 C, II).

**Résultat fiscal** : souvent nul grâce aux amortissements → pas d'IR sur les loyers pendant des années. Un déficit ne peut provenir que des charges hors amortissements. Cette économie est en partie reprise à la revente (voir « Cession d'un bien LMNP »).

**Déficit LMNP** : NON imputable sur le revenu global (contrairement au LMP). Reportable sur les seuls revenus de location meublée non professionnelle (réel **ou micro-BIC**) des **10 années suivantes**, tant que l'activité reste non professionnelle (art. 156, I, 1° ter CGI ; BOI-BIC-CHAMP-40-20 § 240-250), pas sur d'autres BIC. Report : cases 5GA à 5GJ de la 2042 C-PRO.

**Formalités** : déclaration de début d'activité au guichet unique dans les 15 jours (numéro SIRET) ; au réel, liasse 2031 et annexes 2033 ; CFE possible (service-public F32744).

### Cession d'un bien LMNP

Voir `data/plus-values-immo-abattements.json` → `reintegration_amortissements`.

Pour les **cessions réalisées depuis le 15/02/2025**, le prix d'acquisition retenu pour la plus-value des particuliers est **minoré des amortissements admis en déduction** au titre de la location meublée (art. 39 C CGI). Base légale : art. 150 VB, III CGI, modifié par l'art. 84 de la LF 2025 (loi n° 2025-127).

- La règle s'applique **quelle que soit la date de mise en location** : les amortissements déduits avant 2025 sont aussi réintégrés (réponse ministérielle QE n° 10097, JOAN 24/03/2026).
- **Seuls les amortissements admis en déduction** (effectivement déduits) sont retranchés : rien pour les années au micro-BIC, ni pour les amortissements excédentaires reportés (art. 39 C, II) non encore imputés. Les amortissements des travaux de construction, reconstruction, agrandissement ou amélioration ne sont pas retranchés (art. 150 VB, III, 1er alinéa) : ces travaux, déjà pris en compte pour l'IR, ne majorent pas non plus le prix d'acquisition (art. 150 VB, II, 4°).
- Depuis le 21/02/2026, la même minoration vise les amortissements du **statut du bailleur privé** en location nue (art. 31, I, 1°, i et j CGI, créé par l'art. 47 de la LFI 2026, loi n° 2026-103) : la règle n'est donc pas propre au LMNP.
- Exceptions (par renvoi du III de l'art. 150 VB) : résidences pour étudiants et personnes âgées (CCH art. L. 631-12 et L. 631-13), établissements médico-sociaux (CASF art. L. 312-1, I, 6° et 7°), résidences services agréées (C. trav. art. L. 7232-1), accueil familial salarié, unités de soins de longue durée.
- La plus-value reste celle des particuliers (19 % + PS, abattements pour durée de détention) : seule l'assiette augmente.

**Rappel au contribuable** : comparer micro-BIC et réel en intégrant le coût de cette réintégration si une revente est envisagée.

### Bascule LMP vs LMNP

Voir `data/regimes-fonciers-lmnp.json` → `lmp_vs_lmnp`. Source : art. 155, IV, 2 CGI ; BOI-BIC-CHAMP-40-10 ; brochure IR 2026, revenus non salariés.

**Conditions LMP (cumulatives)** :
1. Recettes meublées du foyer > 23 000 €
2. ET recettes meublées > **total** des autres revenus d'activité du foyer (traitements et salaires au sens de l'art. 79, **pensions et rentes viagères comprises**, BIC hors location meublée, BA, BNC, rémunérations de l'art. 62), retenus pour leur montant net (art. 155, IV, 2 CGI ; BOI-BIC-CHAMP-40-10 § 110 à 160). Ce n'est pas « 50 % » : avec 24 000 € de recettes et 40 000 € de salaires, on reste LMNP.

**Conséquences LMP** :
- Déficits imputables sur le revenu global sans limitation de montant
- Plus-values professionnelles : bien détenu depuis au moins deux ans, court terme à hauteur des amortissements déduits et long terme au-delà ; moins de deux ans, entièrement à court terme (art. 39 duodecies CGI) ; exonération art. 151 septies après 5 ans d'activité, totale si recettes < 90 000 €, partielle si < 126 000 €
- Cotisations sociales TNS sur le bénéfice (SSI), charge significative
- IFI : exonération des locaux loués meublés sous des critères **propres** (art. 975, V, 1° CGI ; BOI-PAT-IFI-30-10-10-10 § 60) : recettes > 23 000 € ET bénéfice commercial net (après amortissements) > 50 % des revenus nets d'activité du foyer, ce bénéfice compris, et profession principale (exclu en général pour un salarié à plein temps, BOI-PAT-IFI-30-10-10-30 § 20). Le statut LMP à l'IR ne suffit pas.

**Location meublée de courte durée** : indépendamment du statut LMP, des recettes > 23 000 €/an rendent les revenus passibles des cotisations sociales (art. L. 611-1, 6° CSS).

**Attention bascule involontaire** : une baisse des autres revenus d'activité (cessation, temps partiel) peut faire basculer en LMP malgré des loyers inchangés. Dans tous les cas, la bascule suppose des recettes meublées supérieures à 23 000 € et strictement supérieures au total des autres revenus nets d'activité du foyer, pensions comprises (BOI-BIC-CHAMP-40-10 § 110, 150 et 160). Les pensions de retraite restent comptées, mais elles sont souvent inférieures à l'ancien salaire : au départ en retraite, la bascule se produit dès que les recettes meublées, au-delà de 23 000 €, dépassent la pension et les autres revenus d'activité du foyer. Une année sans salaire, ARE ni pension (retraite anticipée financée par l'épargne), il suffit que les recettes dépassent 23 000 € et le total des éventuels autres revenus d'activité (BIC hors location meublée, BNC, BA, rémunérations de l'art. 62). À surveiller chaque année.

## SCI à l'IR

Voir `data/regimes-fonciers-lmnp.json` → `sci_ir`.

**Régime par défaut** : transparence fiscale.

- Les revenus et charges remontent directement dans la déclaration de chaque associé au prorata des parts
- Nature fiscale : revenus fonciers classiques (micro ou réel selon le total fonciers du foyer)
- Cession des parts ou du bien : régime des plus-values immobilières des particuliers
- L'amortissement **n'est PAS possible** (contrairement à la SCI à l'IS), sauf statut du bailleur privé (art. 31, I, 1°, i et j CGI), ouvert aux sociétés non soumises à l'IS : voir plus haut

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
| Régime réel foncier | 2044 (ou 2044 spéciale), report sur la 2042 : 4BA bénéfice, 4BB déficit imputable sur les revenus fonciers, 4BC déficit imputable sur le revenu global, 4BD déficits antérieurs non encore imputés |
| Micro-BIC LMNP | 2042 C-PRO : 5NI (longue durée), 5NH (tourisme non classé), 5NG (tourisme classé, chambres d'hôtes) ; 5OI/5OH/5OG pour le déclarant 2, 5PI/5PH/5PG pour une personne à charge |
| Réel LMNP / LMP | 2031 + 2033 (liasse BIC) + 2042 C-PRO |
| Réel LMNP — cases 2042 C-PRO | Bénéfice 5NA / 5OA / 5PA ; déficit de l'année 5NY / 5OY / 5PY ; déficits antérieurs non encore déduits 5GA à 5GJ (années 2015 à 2024, 10 ans de report) |
| SCI IR | Déclaration 2072 (SCI) + report sur 2044 (associés) |

## Références CGI / BOFiP

- Revenus fonciers : art. 14 à 33 quater CGI
- Déficit foncier : art. 156-I-3° CGI ; déficits antérieurs en micro-foncier : BOI-RFPI-DECLA-10 § 170
- Déficit LMNP : art. 156-I-1° ter CGI ; BOI-BIC-CHAMP-40-20 § 240-250
- LMNP : art. 35-I-5° bis CGI
- LMP : art. 155-IV CGI ; exonération des plus-values : art. 151 septies CGI
- Limite des amortissements : art. 39 C CGI
- SCI : art. 8 CGI (transparence)
- BOFiP : BOI-RFPI (fonciers) et BOI-BIC-CHAMP-40 (meublés)
