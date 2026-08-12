# Equity salarial (RSU, BSPCE, stock-options, PEE/PERCO)

Voir `data/equity-salarial.json` pour les taux et seuils.

## RSU / AGA (Restricted Stock Units / Actions Gratuites)

**Terminologie** : "RSU" est le terme anglo-saxon ; "AGA" (Actions Gratuites d'Actions) est le terme juridique français (art. L. 225-197-1 C. com., art. 80 quaterdecies CGI). Les deux désignent le même dispositif : attribution d'actions gratuites aux salariés, avec période d'acquisition (vesting) puis détention éventuelle.

### Deux événements fiscaux distincts

**1. Gain d'acquisition (au vesting)**
- Valeur de l'action à la date d'acquisition
- **Imposition : traitements et salaires** (case 1TT ou 1UT)
- Au barème progressif de l'IR
- Cotisations sociales : CSG/CRDS 9,7% + contribution salariale 10% (sur plans qualifiants, dans certains plafonds)

**2. Plus-value de cession**
- Valeur de cession − valeur au vesting
- **Imposition : PV mobilière** : PFU à **31,4 % pour les cessions réalisées dès 2025** (12,8 % IR + 18,6 % PS, LFSS 2026), ou barème sur option
- Les PV mobilières sont des "revenus du patrimoine" (art. L. 136-6 CSS), donc soumises au taux PS 18,6 % dès les revenus 2025
- Uniquement si cession après vesting

### Plans qualifiants (loi Macron)

Régime de faveur pour la fraction ≤ plafonds (variables selon les plans) :
- Imposition comme PV mobilière au PFU (pas comme salaire)
- Abattement 50% possible sur une fraction

Au-delà des plafonds : régime de droit commun (salaire).

### Piège classique

**Traiter le gain RSU comme une PV mobilière classique** → erreur majeure. Le gain au vesting est d'abord :
1. Salaire (barème)
2. Soumis à CSG 9,7%
3. Soumis à contribution salariale 10% (plans qualifiants)

Seule la plus-value ultérieure (valeur vesting → cession) est PV mobilière.

### Stratégie : quotient pour revenus exceptionnels

Un vesting massif (ex: 150 000 € en une seule année) fait franchir plusieurs tranches. Le **quotient pour revenus exceptionnels** (coefficient 4) peut lisser l'imposition.

Mécanisme : impôt = [IR(RNI_hors_RSU + vesting/4) − IR(RNI_hors_RSU)] × 4. Utile si le vesting seul fait franchir une tranche. **Nuance** : inutile si le foyer est déjà au TMI 45% — le taux marginal ne change pas avec la division. Détail et exemples chiffrés dans la section cas-speciaux listée depuis SKILL.md.

## Stock-options

### Rabais excédentaire

Différence entre prix du marché à l'attribution et prix d'exercice, au-delà de 5%.
→ **Imposition comme salaire à l'acquisition**.

### Gain de levée

Selon date d'attribution :

| Plan | Régime |
|------|--------|
| Avant 2012 | Barème de faveur (selon durée détention) |
| 2012-2016 | Salaire (barème IR + cotisations sociales spécifiques) |
| Après 2017 | Salaire (barème) + contribution salariale 10% sur plans qualifiants |

Toujours consulter le plan pour déterminer le régime applicable.

## BSPCE (Bons de Souscription de Parts de Créateur d'Entreprise)

**Différence clé vs RSU** : pas de gain d'acquisition imposable comme salaire. Le gain n'est réalisé et imposé **qu'à la cession des actions**.

### Imposition du gain de cession

Voir `data/equity-salarial.json` → `bspce.gain_cession`.

| Ancienneté dans la société à la date de cession | Taux global pour cessions 2025 |
|--------------------------------------------------|-------------|
| **≥ 3 ans** | **31,4 %** (12,8 % IR + 18,6 % PS) — PV mobilière |
| **< 3 ans** | 50 % (30 % IR + 20 % PS — contribution salariale spécifique) |

Note : pour les cessions ≥ 3 ans, le PS suit le taux applicable aux PV mobilières (revenus du patrimoine, L. 136-6 CSS), soit 18,6 % dès 2025. Pour les cessions < 3 ans, la part PS reste à 20 % (contribution salariale spécifique, distincte du PS de droit commun).

La pénalité pour départ précoce (< 3 ans) est forte. À intégrer dans les décisions de départ.

### Conditions d'éligibilité de la société

À vérifier avant attribution :
- SA ou SAS française
- Immatriculée depuis moins de 15 ans
- Non cotée OU cotée sur compartiment dédié aux PME
- Soumise à l'IS
- Capital détenu à 25% minimum par des personnes physiques
- Non issue d'une restructuration (fusion, scission, reprise d'activité)

**Si conditions non remplies** : requalification en salaires → barème IR + cotisations sociales → traitement beaucoup plus défavorable.

### Vérification préalable recommandée

Demander à la société :
- Date d'immatriculation au RCS
- Capital social et répartition (tableau des associés)
- Régime fiscal (IS obligatoire)
- Historique des restructurations éventuelles

## Épargne salariale (PEE / PERCO / PERECO)

### PEE (Plan d'Épargne Entreprise)

Enveloppe collective distincte du PER individuel.

- **Abondement employeur** : exonéré IR et PS dans les plafonds — **AVANTAGE MAJEUR**
- **Plafond abondement** : 8% × PASS de l'année de versement — voir `data/per-plafonds.json` → `epargne_salariale_abondement.pee`
- **Blocage** : 5 ans, sauf cas de déblocage anticipé (art. R. 3332-28 Code du travail)
- **Sortie après 5 ans** : exonération IR, seuls les PS sur les gains (taux en vigueur au moment de la sortie — cf. SKILL.md § PFU et prélèvements sociaux ; 17,2% jusqu'au 31/12/2025, 18,6% à compter du 01/01/2026 suite à la LFSS 2026)
- **Dividendes réinvestis** : exonérés IR tant qu'ils restent dans l'enveloppe

#### Cas de déblocage anticipé PEE

Chaque cas ouvre un délai de 6 mois pour effectuer le retrait (sauf décès et surendettement : retrait immédiat possible).

| Cas | Précisions |
|-----|-----------|
| Mariage ou PACS du bénéficiaire | — |
| Naissance ou adoption (3e enfant et suivants) | Famille portée à 3 enfants minimum |
| Divorce / séparation / dissolution PACS | Avec garde d'au moins 1 enfant |
| Invalidité | Bénéficiaire, conjoint/PACS, ou enfant (toute catégorie) |
| Décès | Bénéficiaire ou conjoint/PACS |
| Rupture du contrat de travail | Démission, licenciement, retraite, rupture conventionnelle |
| Création ou reprise d'entreprise | Bénéficiaire, conjoint ou enfant |
| Acquisition ou agrandissement de la résidence principale | Y compris construction, remise en état après catastrophe naturelle |
| Surendettement | Sur demande de la commission de surendettement |
| Violences conjugales | Loi n° 2021-1774 du 24 décembre 2021 |

### PERCO / PERECO / PERO : clarification terminologique

Trois générations de plans, souvent confondus :

| Sigle | Nom complet | Statut | Remplace |
|-------|------------|--------|---------|
| **PERCO** | Plan d'Épargne pour la Retraite Collectif | Fermé (plus créable depuis oct. 2020) | — |
| **PERECO** (ou PERCOL) | PER d'Entreprise Collectif | Actif — successeur du PERCO | PERCO |
| **PERO** | PER d'Entreprise Obligatoire | Actif — différent du PERECO | Article 83 |

**PERECO et PERO sont deux produits distincts** et peuvent coexister dans la même entreprise : le PERECO est volontaire (alimenté par intéressement, participation, abondement, versements volontaires) ; le PERO est obligatoire pour une catégorie de salariés définie, avec des cotisations patronales imposées. Dans les petites structures (SARL, EURL), le PERO est rare — c'est le PERECO qui est pertinent.

### Sortie PERCO / PERECO : rente ou capital

La fiscalité de sortie dépend de **l'origine des fonds**, pas du plan lui-même.

#### Fonds issus de l'épargne salariale (intéressement, participation, abondement — compartiment 2)

Ces sommes ont été **exonérées d'IR à l'entrée** (pas déduites). La sortie est donc avantageuse :

| Mode de sortie | IR | Prélèvements sociaux |
|---------------|----|--------------------|
| **Capital** | **Exonéré** (sommes déjà exonérées à l'entrée) | PS sur les gains uniquement (taux en vigueur — cf. SKILL.md, 18,6% depuis la LFSS 2026) |
| **Rente** | Régime des rentes viagères à titre onéreux — fraction taxable selon l'âge | PS sur la fraction taxable |

**Fractions taxables de la rente (rente viagère à titre onéreux)** selon l'âge au premier versement :

| Âge au premier versement de rente | Fraction imposable à l'IR |
|----------------------------------|--------------------------|
| Moins de 50 ans | 70% |
| 50 à 59 ans | 50% |
| 60 à 69 ans | 40% |
| 70 ans et plus | 30% |

La rente viagère à titre onéreux est plus favorable que la rente pension (PER individuel avec déduction) car seule une fraction est imposée — sans abattement 10% mais sur une base réduite.

#### Fonds issus de versements volontaires déduits (compartiment 1, PERECO uniquement)

| Mode de sortie | IR | Prélèvements sociaux |
|---------------|----|--------------------|
| **Capital** | Versements au barème IR (comme revenu ordinaire) | PFU sur les gains (taux PS en vigueur — cf. SKILL.md, 18,6% depuis la LFSS 2026) |
| **Rente** | Régime des pensions (barème + abattement 10%) | PS 9,1% |

#### Rente ou capital : quand choisir quoi ?

| Critère | Capital | Rente |
|---------|---------|-------|
| Encours modeste (< 30 k€) | Préférable | Rente dérisoire |
| Encours important + longévité | — | Protège contre le risque de longévité |
| TMI retraite élevé | Étaler la sortie en capital sur plusieurs années | Rente imposée chaque année |
| Besoin de liquidité | Oui | Non |

**Conseil pratique** : la sortie en capital peut être fractionnée sur plusieurs années (à demander à l'assureur) pour lisser l'imposition.

### PERCO ancien : qu'est-il devenu ?

Depuis le **1er octobre 2020**, aucun nouveau PERCO ne peut être créé. Les plans existants ont trois destins :

1. **Ils continuent de fonctionner** avec leurs règles d'origine — certains ne permettaient que la sortie en rente
2. **L'entreprise les transfère vers un PERECO** — transfert à l'initiative de l'employeur, neutre fiscalement
3. **Ils s'éteignent** naturellement quand tous les bénéficiaires ont liquidé leurs droits

### Migration PERCO → PERECO : faut-il le faire ?

**Avantages :**
- Accès à la **sortie en capital** si le PERCO ancien ne la permettait pas (rente uniquement)
- Meilleure **portabilité** lors d'un changement d'employeur
- Gestion d'actifs souvent plus moderne (gamme de fonds élargie)

**Contraintes :**
- Décision de **l'entreprise**, pas du salarié seul
- Frais plafonnés à **1% de l'encours** si transfert avant 5 ans de détention ; **gratuit** au-delà
- Délai administratif : **2 à 3 mois**
- Les avoirs PERCO migrent dans le **compartiment 2** du PERECO (épargne salariale)

**Ce que la migration ne permet PAS :**

Le déblocage anticipé pour **achat de la résidence principale** n'est possible que sur le **compartiment 1** (versements volontaires) du PERECO. Les avoirs issus d'un ancien PERCO migrent en compartiment 2 — ils ne donnent pas droit à ce déblocage.

**Migrer son PERCO juste avant un achat RP ne sert donc à rien** : les fonds restent bloqués jusqu'à la retraite (ou autre cas de déblocage restreint). Pour profiter du déblocage RP, il faut avoir alimenté volontairement le compartiment 1 du PERECO séparément, en amont.

#### Cas de déblocage anticipé PERCO / PERECO

Les cas de sortie anticipée sont beaucoup plus restreints que le PEE (art. L. 3334-14 C. trav., art. L. 224-4 CMF) :

- Décès (bénéficiaire ou conjoint/PACS)
- Invalidité 2e ou 3e catégorie SS (bénéficiaire, conjoint ou enfants)
- Surendettement
- Expiration des droits à l'assurance chômage
- Cessation d'activité non salariée suite à liquidation judiciaire
- Acquisition de la résidence principale (**compartiment 1 PERECO uniquement** — pas sur les avoirs issus de PERCO migré)

Mariage, naissance, divorce, rupture de contrat, création d'entreprise, violences conjugales : **non déblocables** sur PERCO/PERECO.

### Arbitrage PEE/PERCO vs PER individuel

| Enveloppe | Avantage unique | Quand privilégier |
|-----------|----------------|-------------------|
| PEE | Abondement employeur (levier +30% à +300%) | D'abord, toujours — tant qu'il y a abondement |
| PERECO | Abondement employeur sur épargne retraite | En second après PEE max |
| PER individuel | Déduction RNI (pas de plafond d'abondement) | En complément, après saturation PEE/PERCO |

**Règle d'or** : ne jamais abonder un PER individuel avant d'avoir saturé l'abondement employeur PEE + PERECO. La société abonde pour chaque euro versé par le bénéficiaire.

## Épargne salariale pour TNS : PEE/PERECO dans sa propre société

Section dédiée au gérant TNS (gérant majoritaire SARL, gérant EURL à l'IS) qui met en place un PEE/PERECO dans sa propre société — situation distincte du salarié classique.

Voir `data/equity-salarial.json` → `pee_perco_tns` pour les paramètres chiffrés.

### Éligibilité selon la forme juridique

| Forme juridique | Régime social dirigeant | Éligibilité PEE/PERECO | Notes |
|----------------|------------------------|------------------------|-------|
| SARL (gérant majoritaire > 50%) | TNS | **Oui** | Inclus explicitement depuis loi Pacte |
| EURL à l'IS (gérant associé unique) | TNS | **Oui** | Idem |
| EURL à l'IR | TNS | Oui (avec précautions) | Déductibilité indirecte — voir piège n°4 |
| SAS / SASU (président) | Assimilé salarié | Oui (droit commun salarié) | Pas de cotisations TNS sur dividendes |
| EI | TNS | **Non** | Pas de personnalité morale distincte |

**Loi Pacte (art. 150, loi n° 2019-486 du 22 mai 2019)** : les entreprises sans salarié (hors dirigeant) peuvent mettre en place un PEE/PERECO. Les mandataires sociaux — gérant de SARL, gérant d'EURL — sont explicitement inclus parmi les bénéficiaires potentiels, même en l'absence de tout autre salarié.

**Décret n° 2021-1131 du 30 août 2021** : pour les entreprises sans salarié, le plan peut être mis en place par décision unilatérale de l'employeur (DUE) — sans accord collectif. Dépôt obligatoire auprès de la DREETS ; à défaut, l'exonération ne s'applique pas.

**Condition de présence de salariés** : supprimée depuis loi Pacte. Avant 2019, un salarié (hors dirigeant) était requis pour mettre en place un accord d'intéressement.

### Mécanique de l'abondement TNS

**Circuit :**
1. Le dirigeant TNS effectue un versement volontaire sur le PEE/PERECO (depuis sa rémunération nette déjà taxée)
2. La société verse l'abondement (charge déductible du résultat IS)
3. L'abondement est exonéré de cotisations sociales TNS et d'IR dans les plafonds

**Plafonds** (recalculés chaque année sur le PASS — voir `data/per-plafonds.json` → `epargne_salariale_abondement`) :

| Plan | Formule | Exemple 2025 (PASS = 47 100 €) |
|------|---------|-------------------------------|
| PEE | 8% × PASS | 3 768 € |
| PERECO | 16% × PASS | 7 536 € |
| **Total cumulable** | **24% × PASS** | **11 304 €** — plafonds distincts non fongibles |

L'abondement de la société ne peut dépasser 3× le versement du dirigeant (règle générale des plans).

**Plafond de versement du bénéficiaire sur le PEE :** les versements volontaires personnels sur un PEE sont plafonnés à **25% de la rémunération annuelle brute**. Pour le dirigeant TNS : 25% de la rémunération annuelle déclarée (ou 25% du bénéfice imposable si EI). Ce plafond de versement salarié est distinct du plafond d'abondement employeur.

**Versements volontaires PERECO (compartiment 1) :** le dirigeant peut également alimenter volontairement le compartiment 1 du PERECO, ce qui ouvre le droit au déblocage anticipé pour **achat de la résidence principale**. Les avoirs issus d'abondement/intéressement (compartiment 2) ne donnent pas ce droit.

**Déductibilité IS :**
L'abondement est une charge déductible du résultat (compte 6474 — charges de personnel liées à la participation et à l'intéressement, ou assimilé). Économie IS = abondement × taux IS (25%, ou 15% sur les 42 500 premiers € pour les PME éligibles).

**Exonération cotisations sociales dans les plafonds :**
- Côté société : pas de cotisations patronales sur l'abondement
- Côté dirigeant TNS : l'abondement n'est pas intégré dans l'assiette des cotisations sociales TNS
- Côté IR : abondement exclu du revenu imposable (art. 81-18° CGI)

**Exemple chiffré — gérant SARL IS, IS 25%, cotisations TNS ≈ 42% :**

Pour un abondement PEE au plafond (ex. 3 768 € en 2025) :
- Coût net société après IS : 3 768 × (1 − 25%) = **2 826 €**
- Économie cotisations TNS évitées : 3 768 × 42% ≈ **1 583 €** (vs versement en rémunération)
- Abondement reçu dans le PEE : **3 768 €**, bloqué 5 ans, sorti exonéré IR (PS sur les gains seulement, taux en vigueur — cf. SKILL.md, 18,6% depuis la LFSS 2026)

### Arbitrage PEE/PERECO vs PER TNS (ex-Madelin)

Deux enveloppes concurrentes pour l'optimisation fiscale du dirigeant TNS :

| Critère | PEE / PERECO (abondement) | PER TNS (ex-Madelin, art. 154 bis CGI) |
|---------|--------------------------|----------------------------------------|
| Déduction du résultat société | Oui (charge IS) | Oui (cotisations déductibles) |
| Économie cotisations TNS | Oui, dans plafonds | Oui (assiette cotisations réduite) |
| Exonération IR entrée | Oui (abondement exclu du revenu) | Oui (déduction revenu professionnel) |
| Plafond annuel | 24% × PASS (PEE + PERECO — voir per-plafonds.json) | 10% bénéfice + 15% fraction > PASS (plafond souvent plus élevé pour fort bénéfice) |
| Liquidité | PEE : déblocage après 5 ans (cas anticipés nombreux) | Bloqué jusqu'à la retraite |
| Sortie | PEE : exo IR, PS gains (taux en vigueur — cf. SKILL.md) / PERECO : barème + PFU gains | Barème IR (anciens Madelin : rente obligatoire) |
| Complexité mise en place | DUE ou accord + dépôt DREETS | Souscription contrat individuel |

**Recommandation pour TMI 30-41% :**
1. Saturer d'abord PEE + PERECO (24% × PASS — voir per-plafonds.json) — double exonération IS + cotisations, liquidité supérieure
2. Puis PER TNS (ex-Madelin) pour les montants supplémentaires si le bénéfice le justifie
3. Enfin PER individuel (163 quatervicies) en complément, plafond partiellement commun

**Recommandation pour TMI 45% :**
- L'avantage du PER diminue si le TMI à la retraite reste élevé (report d'imposition, pas exonération)
- PEE reste attractif : sortie en PFU sur gains (pas au barème), horizon 5 ans seulement

**Point crucial — plafond partagé (163 quatervicies) :**
L'abondement PERECO versé par la société est déclaré en **case 6QS** et réduit le plafond disponible pour les versements volontaires sur un PER individuel. PER individuel et PERECO pompent sur la même enveloppe fiscale.

| Flux | Consomme le plafond 163 quatervicies ? |
|------|----------------------------------------|
| Versements volontaires PER individuel (6NS) | **Oui** |
| Versements volontaires PERECO compartiment 1 (6NS) | **Oui** |
| Abondement employeur PERECO (6QS) | **Oui** — réduit le plafond résiduel |
| Intéressement / participation placés en PERECO | **Non** — exonération séparée |

Un abondement PERECO au plafond (16% × PASS) peut donc épuiser une grande partie du plafond annuel, laissant peu de marge pour un PER individuel complémentaire. À simuler avant de souscrire un PER individuel en parallèle.

### Conjoint salarié : leviers additionnels

Quand le gérant embauche son conjoint, de nouveaux outils de rémunération optimisée deviennent accessibles.

#### Prime de Partage de la Valeur (PPV)

Dispositif issu de la loi n° 2022-1158 du 16 août 2022, pérennisé par la loi n° 2023-1107 du 29 novembre 2023 (transposition ANI).

- **Bénéficiaires** : tous les salariés (dont le conjoint salarié). Le dirigeant TNS ne peut pas en bénéficier lui-même.
- **Plafond exonération** : 3 000 € par bénéficiaire (ou 6 000 € si accord d'intéressement en vigueur)
- **Exonérations dans le plafond** : cotisations sociales patronales et salariales
- **Exonération IR** : réservée aux entreprises de **moins de 50 salariés**, pour les salariés dont la rémunération est < 3 SMIC (≈ 5 430 €/mois brut 2025) — jusqu'au 31/12/2026
- **Entreprises ≥ 50 salariés** : la PPV reste exonérée de cotisations sociales dans le plafond, mais est imposable à l'IR (et soumise à CSG/CRDS) dès le premier euro, quelle que soit la rémunération
- **Au-delà du plafond, ou > 3 SMIC dans une entreprise < 50 salariés** : imposable à l'IR et soumis aux cotisations sociales comme une prime ordinaire
- **Pas de condition d'accord** : versable par décision unilatérale de l'employeur

**Piège depuis le 1er janvier 2025 — effet Fillon :**
Depuis 2025, la PPV est intégrée dans la rémunération brute servant à calculer la **réduction générale de cotisations patronales** (réduction Fillon). Pour un conjoint salarié proche du SMIC, chaque euro de PPV augmente mécaniquement la base de calcul → le coefficient Fillon diminue → l'employeur perd une partie de ses allègements de charges.

Exemple : une PPV de 1 500 € pour un salarié au SMIC peut coûter en réalité ~2 300 € à l'employeur une fois la perte de réduction Fillon comptabilisée. **Avant de verser une PPV à un salarié proche du SMIC, simuler l'impact sur la réduction Fillon.**

Dans cette configuration, **l'intéressement peut être plus avantageux que la PPV** : il n'est pas intégré dans l'assiette de la réduction Fillon de la même façon et peut s'avérer moins coûteux pour l'employeur.

Intérêt pour la SARL unipersonnelle avec conjoint salarié : la PPV reste pertinente si le conjoint est bien au-dessus du SMIC (rémunération éloignée de la zone d'effet Fillon) ou si la SARL ne bénéficie pas de la réduction Fillon (salaire > 1,6 SMIC).

#### Intéressement et participation

Dès qu'un salarié (le conjoint) est embauché, l'accord d'intéressement s'applique à tous les salariés.

| Dispositif | Exonération cotisations | Exonération IR | Plafond par bénéficiaire |
|------------|------------------------|----------------|--------------------------|
| Intéressement (placé PEE) | Oui | Oui | 75% PASS ≈ 35 325 € (2025) |
| Participation (placée PEE) | Oui | Oui | 75% PASS ≈ 35 325 € (2025) |
| Intéressement (non placé) | Oui | Non (IR) | Idem |

L'intéressement ouvre également droit à un abondement employeur majoré (plafond PEE passe de 3× à toujours 3× le versement salarié, mais le plafond absolu reste 8% PASS). La PPV versée avec un accord d'intéressement est plafonnée à 6 000 € (au lieu de 3 000 €).

#### Mutuelle santé famille

L'employeur est tenu de proposer une complémentaire santé collective obligatoire (art. L. 911-7 CSS) avec prise en charge patronale ≥ 50% de la cotisation.

**Option mutuelle famille :**
- La société peut souscrire une mutuelle "famille" couvrant le salarié (conjoint) + enfants + le conjoint du salarié (i.e. le gérant)
- La cotisation patronale est déductible IS et exonérée de cotisations sociales dans la limite de 6% du PASS + 1,5% de la rémunération annuelle brute soumise à cotisations, le total étant plafonné à 12% du PASS (art. 83-1° quater CGI et art. D. 242-1 CSS)
- Le gérant TNS est couvert en tant que "conjoint" du salarié — sans être lui-même salarié

**Dispense d'adhésion du conjoint salarié ailleurs :**
Si le conjoint est par ailleurs salarié d'une autre entreprise et bénéficie à ce titre d'une mutuelle collective obligatoire, il peut demander une dispense d'adhésion à la mutuelle de la SARL (art. R. 242-1-6 CSS). Conditions à réunir :
- La couverture existante est **obligatoire** chez l'autre employeur (pas une couverture optionnelle)
- La dispense doit être demandée par écrit et conservée au dossier RH
- Le nombre d'heures du contrat ne doit pas être déconnant (temps partiel très faible → couverture parfois insuffisante)

**Point de vigilance** : une couverture obligatoire minimale chez l'autre employeur peut être moins avantageuse qu'une mutuelle famille bien choisie. Comparer avant de décider.

### Pièges spécifiques TNS

**1. Dépassement des plafonds d'abondement**
La fraction d'abondement excédant 8% PASS (PEE) ou 16% PASS (PERECO) est réintégrée dans l'assiette des cotisations sociales TNS et dans l'IR. Surveiller en fin d'année.

**2. Versement volontaire ≠ abondement**
Le versement volontaire du dirigeant sur le PEE provient de sa rémunération nette déjà taxée — il n'est pas lui-même exonéré. Seul l'abondement versé par la société bénéficie de l'exonération. Ne pas confondre les deux flux.

**3. Dividendes SARL et seuil 10% du capital**
Pour un gérant majoritaire de SARL, les dividendes excédant 10% du (capital + comptes courants + primes d'émission) sont soumis aux cotisations sociales TNS (art. L. 131-6 CSS). Mécanisme indépendant du PEE/PERECO, mais à intégrer dans l'optimisation globale — des dividendes élevés déjà soumis aux cotisations réduisent l'intérêt de certaines stratégies.

**4. EURL à l'IR : déductibilité indirecte**
Si l'EURL est soumise à l'IR (transparence fiscale), l'abondement réduit le bénéfice de la société qui remonte directement dans le revenu de l'associé unique. L'effet est réel mais mécanique moins lisible. Vérifier le régime IS/IR de l'EURL avant la mise en place.

**5. Formalisme obligatoire**
- Mise en place par accord collectif ou DUE (post loi Pacte pour entreprises sans salarié)
- Dépôt auprès de la DREETS dans les délais légaux
- En l'absence de dépôt conforme : l'abondement est requalifié en complément de rémunération → cotisations + IR

**6. SAS/SASU : régime différent**
Le président de SAS/SASU est assimilé salarié. Pas de cotisations TNS sur les dividendes (quel que soit le montant). L'arbitrage PEE vs PER vs dividendes est distinct — ne pas appliquer les règles TNS à une SASU.

### Références légales

- **Code du travail** : art. L. 3332-1 et s. (PEE), L. 3332-2 (bénéficiaires, mandataires sociaux), L. 3334-1 et s. (PERECO), L. 3314-1 et s. (intéressement), L. 3323-1 et s. (participation)
- **Loi Pacte** : loi n° 2019-486 du 22 mai 2019, art. 150 (ouverture aux entreprises sans salarié)
- **Décret** : n° 2021-1131 du 30 août 2021 (modalités entreprises sans salarié)
- **PPV** : loi n° 2022-1158 du 16 août 2022 ; loi n° 2023-1107 du 29 novembre 2023
- **CGI** : art. 81-18° (exonération IR abondement), art. 83-1° quater (mutuelle collective), art. 154 bis (PER TNS / Madelin)
- **CSS** : art. L. 131-6 (assiette cotisations TNS, dont dividendes SARL > 10%), L. 242-1 (exonération cotisations sur abondement), L. 911-7 (mutuelle obligatoire), R. 242-1-6 (dispense d'adhésion)
- **BOFiP** : BOI-RSA-ES-10-10-20 (épargne salariale, abondement)

## Quotient pour revenus exceptionnels

Vesting massif, cession d'entreprise, indemnité de départ → à activer.

**Mécanisme** :
1. Revenu exceptionnel ÷ coefficient (généralement 4)
2. Ajouter au revenu ordinaire
3. Calculer l'impôt supplémentaire
4. × coefficient

**À mentionner systématiquement** pour :
- Vesting RSU > 1,5 × salaire annuel
- Cession de parts de société
- Indemnité de départ importante
- Prime exceptionnelle massive

**Inutile si** : foyer déjà à TMI 45% (taux marginal identique quelle que soit la division).

## Formulaires

| Revenu | Formulaire / case |
|--------|-------------------|
| Gain acquisition RSU (salaire) | 2042 case 1TT / 1UT |
| Plus-value cession RSU | 2042 C case 3VG (PFU) ou 2074 (détail) |
| Gain cession BSPCE | 2042 C case 3VG ou 3WB selon ancienneté |
| Abondement PEE (information) | Déclaration employeur — exonéré |
| Stock-options | Variable selon plan — consulter le plan |

## Références CGI / BOFiP

- RSU : art. 80 quaterdecies CGI
- Stock-options : art. 80 bis CGI
- BSPCE : art. 163 bis G CGI
- PEE : art. L. 3332-1 et s. Code du travail
- PER : art. 163 quatervicies CGI
- BOFiP : BOI-RSA-ES (actionnariat salarié)
