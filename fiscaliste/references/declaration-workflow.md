# Workflow de Déclaration des Revenus (2042)

Guide d'exécution complet pour la déclaration annuelle des revenus d'un particulier français (revenus 2025, déclaration 2026).

Ce workflow couvre les 10 étapes de la déclaration, de la collecte des documents à la vérification de l'avis d'imposition, en passant par le choix des options fiscales et la sélection des annexes pertinentes.

---

## Vue d'ensemble

```
Phase 1 : Préparation
  1. Collecte des justificatifs
  2. Consolidation du contexte foyer (foyer.json)
  3. Identification des catégories de revenus

Phase 2 : Choix stratégiques
  4. PFU vs barème sur revenus du capital
  5. Régime foncier (micro vs réel) / LMNP (micro-BIC vs réel)
  6. Mobilisation du PER / reports d'épargne retraite

Phase 3 : Saisie et annexes
  7. Déclaration principale 2042
  8. Annexes (2044, 2074, 2086, 2047, 2042-IFI, 2042-RICI)

Phase 4 : Vérification et suivi
  9. Simulation avant dépôt
  10. Vérification de l'avis d'imposition et solde PAS
```

---

## Phase 1 : Préparation

### Étape 1 : Collecte des justificatifs

**Objectif** : rassembler TOUS les documents permettant de remplir la déclaration.

**Documents par source** :

| Source | Document | Usage |
|--------|----------|-------|
| Employeur | Bulletin de décembre + attestation fiscale | Salaires imposables (1AJ), gain RSU (1TT) |
| France Travail (ex-Pôle emploi) | Attestation fiscale annuelle | ARE (1AP, pas 1AJ — abattement 10 % applicable malgré tout) |
| Banque / courtier | IFU (Imprimé Fiscal Unique) | Intérêts, dividendes, PV mobilières |
| Assurance-vie | Relevé annuel | Rachats, produits imposables |
| Notaire | Acte de vente + formulaire 2048-IMM | PV immobilière |
| Gestionnaire locatif | Récapitulatif loyers + charges | Revenus fonciers / LMNP |
| Exchange crypto | Historique transactions | PV crypto (méthode PAMC) |
| Organisme PER | Attestation de versement | Déduction PER |
| Association / syndicat | Reçu fiscal | Réduction 66 % ou 75 % |
| Employeur CESU / crèche | Attestation URSSAF / relevé | Crédit d'impôt 50 % |

**Contrôle** : vérifier que tous les revenus pré-remplis sur impots.gouv.fr correspondent aux justificatifs reçus. Les oublis viennent souvent de comptes étrangers, de revenus exceptionnels (RSU, primes) ou de ventes ponctuelles.

### Étape 2 : Consolidation du contexte foyer

**Objectif** : construire ou mettre à jour `foyer.json` à la racine du projet.

Voir [foyer.example.json](../foyer.example.json) pour la structure. Champs critiques :

- **situation** : célibataire / marié / pacsé / divorcé / veuf
- **nb_enfants_charge** : enfants à charge exclusive
- **nb_enfants_alternee** : enfants en garde alternée (comptent pour 0,25 part chacun)
- **nb_enfants_invalides** : demi-part supplémentaire
- **annee_naissance_declarants** : pour le calcul de la demi-part personnes âgées (> 65 ans au 1er janvier)

**Points d'attention** :

- Année du mariage / PACS → imposition commune ou séparée (option)
- Année de séparation → imposition séparée pour l'année entière depuis 2011
- Parent isolé (case T) → demi-part supplémentaire si assume seul les enfants

### Étape 3 : Identification des catégories de revenus

**Objectif** : catégoriser chaque revenu pour savoir dans quelle case le déclarer.

| Catégorie | Case 2042 | Annexe éventuelle |
|-----------|-----------|-------------------|
| Salaires | 1AJ / 1BJ | — |
| Gain acquisition RSU | 1TT / 1UT | — |
| Pensions | 1AS / 1BS | — |
| Allocations chômage | 1AP / 1BP | — |
| Indemnités maladie | 1AM / 1BM | — |
| BNC régime normal | 5QC / 5RC | 2035 |
| Micro-BNC | 5HQ / 5IQ | — |
| Revenus fonciers réels | 4BA | **2044** |
| Micro-foncier (nu) | 4BE | — |
| LMNP micro-BIC longue durée | 5ND / 5OD | — |
| LMNP réel | 5NA / 5OA | **2031 + 2033-A à D** |
| Dividendes (PFU ou barème) | 2DC | — |
| Intérêts / produits de placement | 2TR | — |
| Plus-values mobilières | 3VG | **2074** (si détail) |
| Plus-values crypto | 3AN / 3BN | **2086** |
| Plus-value immobilière | 3VZ | **2048-IMM** (notaire) |
| Revenus étrangers | — | **2047** |
| Patrimoine immobilier net > 1,3 M€ | — | **2042-IFI** |
| Dons, emploi à domicile, garde d'enfant | — | **2042-RICI** |

**Précision** : l'ARE se déclare en 1AP/1BP (revenu de remplacement), pas en 1AJ. Elle bénéficie **quand même** de l'abattement de 10 % comme les salaires (BOI-RSA-BASE-30-50-20) — la case ne change pas l'abattement. L'enjeu de la bonne case : l'ARE n'est pas un revenu d'activité (compte pour le plafond PER, prestations sociales, etc.).

**Précision BNC 5QC/5RC** : plus aucune distinction adhérent / non-adhérent AGA-OGA. La majoration de 25 % pour non-adhésion est supprimée depuis l'imposition des revenus 2023 (LF 2021, art. 34 ; art. 158-7 CGI) : même case, même montant pour tous. Détail dans `ir-mecanisme.md`.

---

## Phase 2 : Choix stratégiques

### Étape 4 : PFU vs barème sur revenus du capital

**Objectif** : décider du régime d'imposition des revenus du capital (option **globale** et **irrévocable** pour l'année).

**Méthode** :

1. Lister tous les revenus du capital de l'année (intérêts, dividendes, PV mobilières, rachats AV < 8 ans, gains PEA avant 5 ans).
2. Calculer les deux scénarios :
   - **PFU 30 %** (12,8 % IR + 17,2 % PS) sur l'ensemble, sans abattement.
   - **Barème** : abattement 40 % sur dividendes, PS 17,2 %, barème progressif au TMI du foyer, puis CSG déductible 6,8 % imputable sur le RNI de N+1.
3. Retenir l'option la plus favorable.

**Règle d'orientation rapide** :

| TMI du foyer | Option probable |
|--------------|-----------------|
| 0 % ou 11 % | Barème quasi-toujours meilleur (tranche basse + abattement dividendes + CSG déductible) |
| 30 % | À chiffrer — proche parité |
| 41 % ou 45 % | PFU quasi-toujours meilleur |

**Case à cocher** : 2OP (option pour le barème).

### Étape 5 : Régime foncier et LMNP

**Objectif** : choisir le régime le plus favorable sur les revenus immobiliers.

**Location nue** :

| Recettes | Options disponibles |
|----------|---------------------|
| ≤ 15 000 € | Micro-foncier (abattement 30 %) OU réel sur option |
| > 15 000 € | Régime réel obligatoire — annexe 2044 |

Le réel est avantageux dès que charges réelles > 30 % des loyers (crédit immobilier, travaux, assurance PNO, taxe foncière).

**Déficit foncier** : imputable sur le revenu global dans la limite de 10 700 € / an, reportable 10 ans sur revenus fonciers uniquement.

**Location meublée (LMNP)** :

| Recettes annuelles | Régime | Abattement |
|--------------------|--------|------------|
| ≤ 77 700 € (longue durée ou meublé classé) | Micro-BIC | 50 % |
| ≤ 15 000 € (meublé tourisme non classé) | Micro-BIC | 30 % |
| > seuils OU sur option | Réel — annexe 2031 | Amortissements + charges réelles |

Au **réel**, l'amortissement du bien (hors terrain, sur ~25-30 ans) rend souvent le résultat nul ou déficitaire. Le déficit LMNP est **non imputable sur le revenu global** (reportable 10 ans sur BIC non pro uniquement).

**Bascule LMP** : si recettes > 23 000 € ET > 50 % des autres revenus pro du foyer → statut LMP (régime différent, exonération IFI possible, cotisations sociales SSI).

### Étape 6 : Mobilisation du PER

**Objectif** : décider d'un éventuel versement PER avant le 31 décembre pour réduire l'IR de l'année.

**Ordre de priorité** :

1. **Saturer l'abondement employeur PEE / PERCO** en priorité absolue (l'abondement est un match gratuit, rendement immédiat 50 % à 300 %).
2. **Ensuite** envisager un versement PER individuel si :
   - TMI actuel ≥ 30 % (économie immédiate significative)
   - TMI estimé à la retraite < TMI actuel (gain net en report d'imposition)
   - Plafond disponible non saturé (vérifier sur l'avis d'imposition N-1, rubrique "Plafond pour l'épargne retraite")

**Calcul du plafond mobilisable** :

- Plafond N = 10 % des revenus pro N-1 (salaires après abattement 10 %), dans les bornes 4 710 € et 37 680 € (revenus 2025).
- + plafonds non utilisés N-3, N-2, N-1 (report 3 ans, ordre FIFO).
- + plafond du conjoint si mutualisation cochée (imposition commune).

**Saisie** : cases 6NS (déclarant 1) / 6NT (déclarant 2).

---

## Phase 3 : Saisie et annexes

### Étape 7 : Déclaration principale 2042

**Objectif** : saisir toutes les catégories de revenus et les options.

**Pages principales** :

- Page 1 : état civil, situation famille, enfants à charge
- Page 2 : traitements, salaires, pensions, chômage (cadres 1)
- Page 3 : revenus des capitaux mobiliers (cadres 2), plus-values (cadres 3)
- Page 4 : revenus fonciers (cadres 4), BIC / BNC / BA (cadres 5)
- Page 5 : charges déductibles (PER, pensions alimentaires, CSG déductible)
- Page 6 : réductions et crédits d'impôt

**Points d'attention systématiques** :

- Cocher la case 2OP si option barème sur revenus du capital
- Cocher la case "parent isolé" (T) si applicable
- Vérifier les enfants en garde alternée (case H)
- Reporter les PV mobilières depuis l'IFU (attention à la cohérence avec les 2074)

### Étape 8 : Annexes à joindre

**Tableau de décision** :

| Situation | Annexe |
|-----------|--------|
| Location nue au réel | **2044** |
| LMNP au réel | **2031 + 2033-A à 2033-D** |
| Plus-values mobilières détaillées (plusieurs lignes, reports moins-values) | **2074** |
| Cessions crypto > 305 € | **2086** (obligatoire même si PV nulle) |
| Revenus étrangers | **2047** |
| Patrimoine immobilier net > 1,3 M€ au 1er janvier | **2042-IFI + 2042-IFI-K** |
| Réductions / crédits (dons, emploi à domicile, garde enfant, Pinel, FCPI…) | **2042-RICI** |
| Plus-value immobilière (hors RP) | **2048-IMM** (en principe pris en charge par le notaire au moment de la vente) |
| Frais réels salariés (option vs abattement 10 %) | Détail à joindre (tableau) |

**Règle de prudence** : en cas de doute sur une annexe, en parler avec un expert-comptable ou un avocat fiscaliste. Oublier une annexe obligatoire peut déclencher un contrôle.

---

## Phase 4 : Vérification et suivi

### Étape 9 : Simulation avant dépôt

**Objectif** : vérifier l'impôt calculé avant validation définitive.

**Outils** :

- Simulateur officiel : impots.gouv.fr (onglet "Simulateur")
- Avis d'imposition N-1 à titre de comparaison
- Checklist des points à vérifier (voir ci-dessous)

**Checklist pré-validation** :

- [ ] Nombre de parts de QF cohérent avec la composition du foyer
- [ ] Plafonnement QF appliqué (si enfants) — gain réel ≤ N × 1 807 €
- [ ] Décote testée (si impôt brut faible)
- [ ] Abattement 10 % salaires appliqué (vérifier plancher 509 € / plafond 14 555 €)
- [ ] ARE bien en 1AP (pas 1AJ) — l'abattement 10 % s'applique dans les deux cas ; la case sert à distinguer revenu d'activité / remplacement
- [ ] Option PFU / barème choisie explicitement (case 2OP)
- [ ] PER déduit dans la limite du plafond disponible
- [ ] Réductions d'impôt ≤ plafond global 10 000 €
- [ ] CEHR calculée si RFR > seuils (250 / 500 k€ célib, 500 / 1 000 k€ couple)
- [ ] Toutes les annexes pertinentes sont sélectionnées

### Étape 10 : Vérification de l'avis d'imposition et solde PAS

**Objectif** : contrôler que l'avis reçu (juillet-août) correspond à la simulation et calculer le solde PAS.

**Points à contrôler** :

- Impôt net cohérent avec la simulation pré-dépôt
- Plafond PER pour l'année suivante (rubrique "Épargne retraite")
- Revenu fiscal de référence (RFR) — base de nombreux dispositifs sociaux
- Taux de PAS mis à jour automatiquement
- Solde PAS à payer ou à rembourser (différence IR dû − PAS prélevé N)

**Actions post-avis** :

- Si solde à payer > 300 € : étalement automatique sur 4 mois (septembre-décembre)
- Si solde à payer > 50 % de l'IR N-1 : acomptes recalculés sur N+1
- En cas de désaccord : réclamation sur impots.gouv.fr dans les 3 ans (délai de reprise DGFIP identique)

---

## Calendrier type (revenus 2025 → déclaration 2026)

| Date | Action |
|------|--------|
| Décembre 2025 | Dernier versement PER de l'année (effet sur IR 2025) |
| Janvier-février 2026 | Collecte des IFU, attestations, relevés |
| Avril 2026 | Ouverture de la déclaration en ligne |
| Mai-juin 2026 | Date limite selon département |
| Juillet-août 2026 | Réception de l'avis d'imposition |
| Septembre 2026 | Solde PAS prélevé si dû |
| Décembre 2026 | Dernier versement PER pour IR 2026 |

## Pièges fréquents

1. **Oublier un compte étranger** — obligation de déclarer l'ouverture (formulaire 3916) sous peine d'amende 1 500 € par compte.
2. **Ne pas cocher 2OP** alors que le barème serait favorable au TMI 11 %.
3. **ARE en 1AJ au lieu de 1AP** — l'abattement 10 % s'applique dans les deux cas, mais la mauvaise case fausse la distinction revenu d'activité / remplacement (plafond PER, prestations).
4. **Oublier le quotient** pour un vesting RSU massif.
5. **Sous-déclarer les cessions crypto** > 305 € — imposition totale sur TOUT.
6. **Déduire un PER > plafond** — fraction non déductible.
7. **Annexe 2086 oubliée** dès 1 € de cession crypto > 305 €.
8. **Plafonnement global des niches (10 000 €)** — excédent perdu.

## Références CGI / BOFiP

- Obligation déclarative : art. 170 CGI
- Option PFU / barème : art. 200 A CGI
- Déclaration comptes étrangers : art. 1649 A CGI
- Revenus fonciers : art. 14 à 33 quinquies CGI
- BIC LMNP : art. 35 CGI
- Plus-values mobilières : art. 150-0 A CGI
- Crypto : art. 150 VH bis CGI
- BOFiP général : BOI-IR
