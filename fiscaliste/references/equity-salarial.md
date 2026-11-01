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

- **Abondement employeur** : exonéré d'IR et de cotisations sociales dans les plafonds, mais soumis à la CSG/CRDS (9,7 %) à l'entrée ; forfait social 0 % sous 50 salariés, 20 % au-delà (taux réduits possibles sur le PERECO)
- **Plafond abondement** : 8% × PASS de l'année de versement — voir `data/per-plafonds.json` → `epargne_salariale_abondement.pee`
- **Blocage** : 5 ans, sauf cas de déblocage anticipé (art. R. 3332-28 Code du travail, qui renvoie aux cas de l'art. R. 3324-22)
- **Sortie après 5 ans** : exonération IR, seuls les PS sur les gains (taux en vigueur au moment de la sortie — cf. SKILL.md § PFU et prélèvements sociaux ; 17,2% jusqu'au 31/12/2025, 18,6% à compter du 01/01/2026 suite à la LFSS 2026)
- **Dividendes réinvestis** : exonérés IR tant qu'ils restent dans l'enveloppe

#### Cas de déblocage anticipé PEE

Cas limitativement énumérés à l'art. R. 3324-22 C. trav. La demande doit être présentée dans les **6 mois** suivant le fait générateur, sauf pour la rupture du contrat de travail, le décès, l'invalidité, les violences conjugales, le surendettement et l'activité de proche aidant : demande possible **à tout moment** (art. R. 3324-23).

| Cas | Précisions |
|-----|-----------|
| Mariage ou PACS du bénéficiaire | — |
| Naissance ou arrivée d'un enfant adopté | Le foyer compte déjà au moins 2 enfants à charge |
| Divorce, séparation, dissolution du PACS | Résidence habituelle d'au moins un enfant au domicile du bénéficiaire |
| Violences conjugales | Ordonnance de protection, ou faits ayant donné lieu à une poursuite pénale ou à une condamnation |
| Invalidité | Bénéficiaire, enfant, conjoint ou partenaire de PACS ; taux d'incapacité d'au moins 80 % et absence d'activité professionnelle |
| Décès | Bénéficiaire, conjoint ou partenaire de PACS |
| Fin du contrat de travail ou de l'activité | Rupture du contrat de travail, cessation d'activité de l'entrepreneur individuel, fin du mandat social, perte du statut de conjoint collaborateur ou associé |
| Création ou reprise d'entreprise | Bénéficiaire, enfant, conjoint ou partenaire de PACS |
| Résidence principale | Acquisition, agrandissement créant de la surface habitable nouvelle, remise en état après catastrophe naturelle |
| Rénovation énergétique de la résidence principale | Au sens du code de la construction |
| Surendettement | Sur demande de la commission de surendettement ou du juge |
| Activité de proche aidant | Pour un proche au sens du code du travail |
| Achat d'un véhicule propre | Voiture ou utilitaire léger électrique, hydrogène ou hybride rechargeable, deux-roues ou trois-roues électrique, vélo à assistance électrique neuf |

La rénovation énergétique, l'activité de proche aidant et l'achat d'un véhicule propre ont été ajoutés par le décret du 5 juillet 2024 (applicables aux faits générateurs, ou aux demandes pour le proche aidant, postérieurs à son entrée en vigueur).

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
| **Rente** | Régime des pensions (barème + abattement 10%) | PS au taux en vigueur sur la seule fraction imposable de la rente viagère à titre onéreux (70/50/40/30 % selon l'âge au premier versement — BOI-ANNX-000513) |

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

**Achat de la résidence principale :** le déblocage anticipé du PERECO couvre les versements volontaires (compartiment 1) **et** l'épargne salariale (compartiment 2 : intéressement, participation, abondement). Seuls les droits issus de versements obligatoires (compartiment 3, PERO) restent bloqués (art. L. 224-4 CMF ; service-public F34982).

#### Cas de déblocage anticipé PERECO

Les cas de sortie anticipée sont beaucoup plus restreints que le PEE (art. L. 224-4 CMF) :

- Décès (conjoint/PACS)
- Invalidité (bénéficiaire, enfants, conjoint/PACS)
- Surendettement
- Expiration des droits à l'assurance chômage
- Cessation d'activité non salariée suite à liquidation judiciaire
- Acquisition de la résidence principale (compartiments 1 et 2 — pas les versements obligatoires)

Mariage, naissance, divorce, rupture de contrat, création d'entreprise, violences conjugales : **non déblocables** sur PERCO/PERECO.

### Arbitrage PEE/PERCO vs PER individuel

| Enveloppe | Avantage unique | Quand privilégier |
|-----------|----------------|-------------------|
| PEE | Abondement employeur (levier +30% à +300%) | D'abord, toujours — tant qu'il y a abondement |
| PERECO | Abondement employeur sur épargne retraite | En second après PEE max |
| PER individuel | Déduction RNI (pas de plafond d'abondement) | En complément, après saturation PEE/PERCO |

**À examiner en premier** : lorsqu'un abondement employeur existe, le capter sur le PEE ou le PERECO avant un versement sur un PER individuel est généralement plus intéressant, sous réserve de la durée de blocage, des frais et des supports proposés.

## Épargne salariale pour TNS : PEE/PERECO dans sa propre société

Section dédiée au dirigeant TNS (gérant majoritaire de SARL, gérant d'EURL, entrepreneur individuel) qui met en place un PEE/PERECO dans sa propre entreprise — situation distincte du salarié classique.

Voir `data/equity-salarial.json` → `pee_perco_tns` pour les paramètres chiffrés.

### Condition préalable : au moins un salarié en plus du dirigeant

**Un dirigeant seul, sans aucun salarié, ne peut pas bénéficier d'un PEE ni d'un PERECO.**

L'art. L. 3332-2 du Code du travail ouvre le plan au chef d'entreprise (et, pour une personne morale, au président, directeur général, gérant ou membre du directoire) **uniquement dans les entreprises employant habituellement au moins un salarié et moins de 250 salariés**. La fiche officielle le formule ainsi : au moins un salarié **en plus du dirigeant lui-même** (service-public F2142). Les mêmes bénéficiaires sont visés pour le PERECO.

Pour l'intéressement, l'art. L. 3312-3 est encore plus explicite : aucun accord ne peut être conclu si le seul salarié de l'entreprise est aussi son président, directeur général, gérant ou membre du directoire.

Conséquences pratiques :
- **Gérant seul de son EURL, président seul de sa SASU, EI sans salarié** : pas de PEE/PERECO, pas d'intéressement. Les enveloppes disponibles sont le PER individuel (art. 163 quatervicies CGI) et, pour un TNS, la déduction des cotisations PER au titre de l'art. 154 bis CGI.
- **Dès qu'un salarié est embauché** (le conjoint salarié compte) : le dirigeant peut adhérer au plan mis en place pour ses salariés, aux mêmes conditions qu'eux.
- **Conjoint collaborateur ou associé** du chef d'entreprise : bénéficiaire possible au même titre que le dirigeant.

Le plan doit être ouvert à tous les salariés (ancienneté exigible de 3 mois au plus) : il n'est pas possible de le réserver au dirigeant. L'abondement suit les mêmes règles pour tous les bénéficiaires.

### Éligibilité selon la forme juridique (entreprise d'au moins un salarié)

| Forme juridique | Régime social dirigeant | Éligibilité PEE/PERECO | Notes |
|----------------|------------------------|------------------------|-------|
| SARL (gérant majoritaire > 50%) | TNS | Oui, si au moins 1 salarié | — |
| EURL à l'IS (gérant associé unique) | TNS | Oui, si au moins 1 salarié | — |
| EURL à l'IR | TNS | Oui, si au moins 1 salarié | Déductibilité indirecte — voir piège n°4 |
| SAS / SASU (président) | Assimilé salarié | Oui, si au moins 1 salarié en plus du président | Pas de cotisations TNS sur dividendes |
| EI | TNS | Oui, si au moins 1 salarié | L'entrepreneur individuel est un « chef d'entreprise » au sens de L. 3332-2 ; la personnalité morale n'est pas requise |

Sans salarié, la réponse est **non** pour toutes les formes.

### Mécanique de l'abondement TNS

**Circuit :**
1. Le dirigeant TNS effectue un versement volontaire sur le PEE/PERECO (depuis sa rémunération nette déjà taxée)
2. La société verse l'abondement (charge déductible du résultat IS)
3. L'abondement est exonéré de cotisations sociales et d'IR dans les plafonds ; la CSG/CRDS (9,7 %) reste due

**Plafonds** (recalculés chaque année sur le PASS — voir `data/per-plafonds.json` → `epargne_salariale_abondement`) :

| Plan | Formule | Exemple 2025 (PASS = 47 100 €) |
|------|---------|-------------------------------|
| PEE | 8% × PASS | 3 768 € |
| PERECO | 16% × PASS | 7 536 € |
| **Total cumulable** | **24% × PASS** | **11 304 €** — plafonds distincts non fongibles |

L'abondement de la société ne peut dépasser 3× le versement du dirigeant (règle générale des plans).

**Plafond de versement du bénéficiaire sur le PEE :** les versements volontaires sont plafonnés au **quart de la rémunération annuelle ou du revenu professionnel imposé à l'IR au titre de l'année précédente** (art. L. 3332-10 C. trav.). Pour le conjoint collaborateur non rémunéré : un quart du PASS. Ce plafond de versement est distinct du plafond d'abondement.

**Versements volontaires PERECO (compartiment 1) :** le dirigeant peut aussi alimenter volontairement le PERECO. Le déblocage anticipé pour **achat de la résidence principale** porte sur ces versements comme sur l'abondement (compartiment 2).

**Déductibilité IS :**
L'abondement est une charge déductible du résultat (compte 6474 — charges de personnel liées à la participation et à l'intéressement, ou assimilé). Économie IS = abondement × taux IS (25%, ou 15% sur les 42 500 premiers € pour les PME éligibles).

**Exonération cotisations sociales dans les plafonds :**
- Côté société : pas de cotisations patronales sur l'abondement ; forfait social 0 % sous 50 salariés
- Côté dirigeant TNS : l'abondement est exonéré d'IR et donc absent du revenu professionnel qui sert d'assiette aux cotisations TNS ; la CSG/CRDS (9,7 %) est prélevée. L'art. L. 3332-27 C. trav. ne vise expressément que l'assiette des salariés (L. 242-1 CSS) : faire confirmer le traitement par l'URSSAF ou l'expert-comptable, notamment depuis la réforme de l'assiette sociale des indépendants de 2026
- Côté IR : abondement exclu du revenu imposable (art. 81-18° CGI)

**Exemple chiffré — gérant SARL IS avec un salarié, IS 25 %, cotisations TNS ≈ 42 % (hypothèses à adapter) :**

Pour un abondement PEE au plafond (ex. 3 768 € en 2025, supposant un versement personnel d'au moins 1 256 €) :
- Coût net société après IS : 3 768 × (1 − 25 %) = **2 826 €**
- Cotisations TNS évitées par rapport à une rémunération équivalente : ≈ 3 768 × 42 % ≈ **1 583 €**
- CSG/CRDS sur l'abondement : 3 768 × 9,7 % ≈ **365 €**
- Le même abondement doit être offert au salarié qui fait le même versement : en tenir compte dans le coût total
- Sommes bloquées 5 ans, sortie exonérée d'IR (PS sur les gains, taux en vigueur — cf. SKILL.md) ; le rendement dépend des supports choisis et des frais du teneur de compte

### Arbitrage PEE/PERECO vs PER TNS (ex-Madelin)

Deux enveloppes concurrentes pour l'optimisation fiscale du dirigeant TNS :

| Critère | PEE / PERECO (abondement) | PER TNS (ex-Madelin, art. 154 bis CGI) |
|---------|--------------------------|----------------------------------------|
| Déduction du résultat société | Oui (charge IS) | Indirecte : déduites du revenu imposable du gérant (art. 62 CGI pour une SARL à l'IS) |
| Économie cotisations TNS | Oui, dans plafonds | Non : les cotisations PER 154 bis sont réintégrées dans l'assiette des cotisations sociales (art. L. 131-6 CSS) |
| Exonération IR entrée | Oui (abondement exclu du revenu) | Oui (déduction revenu professionnel) |
| Plafond annuel | 24% × PASS (PEE + PERECO — voir per-plafonds.json) | 10% bénéfice + 15% fraction > PASS (plafond souvent plus élevé pour fort bénéfice) |
| Liquidité | PEE : déblocage après 5 ans (cas anticipés nombreux) | Bloqué jusqu'à la retraite |
| Sortie | PEE : exo IR, PS gains (taux en vigueur — cf. SKILL.md) / PERECO : abondement exonéré d'IR en capital, versements déduits au barème + PFU sur les gains | Barème IR (anciens Madelin : rente obligatoire) |
| Condition | Au moins un salarié en plus du dirigeant ; plan ouvert à tous les salariés | Aucune condition d'effectif |
| Complexité mise en place | Règlement par accord ou décision unilatérale + dépôt sur TéléAccords | Souscription contrat individuel |

**Ordre d'examen (TMI 30-41 %), si l'entreprise a au moins un salarié :**
1. PEE + PERECO (24 % × PASS — voir per-plafonds.json) : exonération de cotisations et d'IR sur l'abondement, liquidité du PEE à 5 ans ; à comparer avec le coût de l'abondement versé aussi aux salariés
2. PER TNS (art. 154 bis) pour les montants supplémentaires si le bénéfice le justifie
3. PER individuel (163 quatervicies) en complément, plafond partiellement commun

Sans salarié, seuls les points 2 et 3 sont ouverts.

**TMI 45 % :**
- L'intérêt du PER diminue si le TMI à la retraite reste élevé (report d'imposition, pas exonération)
- Le PEE reste intéressant : à la sortie, seuls les PS frappent les gains (pas d'IR), horizon 5 ans

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

Quand le gérant embauche son conjoint, l'entreprise compte un salarié : le PEE/PERECO et l'intéressement deviennent possibles, pour le salarié comme pour le dirigeant. Le contrat de travail doit être réel (emploi effectif, rémunération normale) : un emploi fictif fait tomber les exonérations.

#### Prime de Partage de la Valeur (PPV)

Dispositif issu de la loi n° 2022-1158 du 16 août 2022, pérennisé par la loi n° 2023-1107 du 29 novembre 2023 (transposition ANI).

- **Bénéficiaires** : tous les salariés (dont le conjoint salarié). Le dirigeant TNS ne peut pas en bénéficier lui-même.
- **Plafond exonération** : 3 000 € par bénéficiaire (ou 6 000 € si accord d'intéressement en vigueur)
- **Exonérations dans le plafond** : cotisations sociales patronales et salariales
- **Exonération IR** : réservée aux entreprises de **moins de 50 salariés**, pour les salariés dont la rémunération est < 3 SMIC (≈ 5 405 €/mois brut en 2025) — jusqu'au 31/12/2026
- **Entreprises ≥ 50 salariés** : la PPV reste exonérée de cotisations sociales dans le plafond, mais est imposable à l'IR (et soumise à CSG/CRDS) dès le premier euro, quelle que soit la rémunération
- **Au-delà du plafond, ou > 3 SMIC dans une entreprise < 50 salariés** : imposable à l'IR et soumis aux cotisations sociales comme une prime ordinaire
- **Pas de condition d'accord** : versable par décision unilatérale de l'employeur

**Piège — réduction générale des cotisations patronales :**
Depuis le 1er janvier 2025, la PPV est intégrée dans la rémunération retenue pour calculer la réduction générale (ex-réduction Fillon). Depuis le 1er janvier 2026, celle-ci est remplacée par la **réduction générale dégressive unique (RGDU)**, qui s'applique jusqu'à **3 SMIC** (au lieu de 1,6 SMIC). Une PPV augmente la rémunération annuelle retenue, donc diminue le coefficient de réduction : l'employeur perd une partie de ses allègements.

**Avant de verser une PPV à un salarié rémunéré sous 3 SMIC, simuler la perte de RGDU** (paramètres à jour sur le BOSS, rubrique « Allègements généraux »). L'intéressement n'entre pas dans l'assiette de la réduction générale et peut s'avérer moins coûteux dans cette zone.

#### Intéressement et participation

Un accord d'intéressement est possible dès qu'il y a un salarié (le conjoint) qui n'est pas lui-même mandataire social (art. L. 3312-3). Il bénéficie à tous les salariés et, dans les entreprises de moins de 250 salariés, au dirigeant et au conjoint collaborateur ou associé.

| Dispositif | Exonération cotisations | Exonération IR | Plafond par bénéficiaire |
|------------|------------------------|----------------|--------------------------|
| Intéressement (placé PEE) | Oui | Oui | 75% PASS ≈ 35 325 € (2025) |
| Participation (placée PEE) | Oui | Oui | 75% PASS ≈ 35 325 € (2025) |
| Intéressement (non placé) | Oui | Non (IR) | Idem |

Dans tous les cas, la CSG/CRDS (9,7 %) est due. L'intéressement placé sur le PEE peut lui-même être abondé, dans la limite commune de 3× le versement et 8 % du PASS. Avec un accord d'intéressement, le plafond d'exonération de la PPV passe à 6 000 € (au lieu de 3 000 €).

#### Mutuelle santé famille

L'employeur est tenu de proposer une complémentaire santé collective obligatoire (art. L. 911-7 CSS) avec prise en charge patronale ≥ 50% de la cotisation.

**Option mutuelle famille :**
- La société peut souscrire une mutuelle "famille" couvrant le salarié (conjoint) + enfants + le conjoint du salarié (i.e. le gérant)
- La cotisation patronale est une charge déductible du résultat
- **Cotisations sociales** : exonération dans la limite de 6 % du PASS + 1,5 % de la rémunération annuelle brute soumise à cotisations, le total étant plafonné à 12 % du PASS (art. D. 242-1 CSS) ; CSG/CRDS dues ; forfait social à partir de 11 salariés
- **IR du salarié** : la part patronale finançant la complémentaire **santé** est ajoutée au revenu imposable du salarié ; la limite de l'art. 83-1° quater CGI (5 % du PASS + 2 % de la rémunération, total plafonné à 2 % de 8 PASS) concerne la déduction des cotisations de prévoyance — ne pas la confondre avec la limite sociale ci-dessus
- Le gérant TNS est couvert en tant que "conjoint" du salarié — sans être lui-même salarié

**Dispense d'adhésion du conjoint salarié ailleurs :**
Si le conjoint est par ailleurs salarié d'une autre entreprise et bénéficie à ce titre d'une mutuelle collective obligatoire, il peut demander une dispense d'adhésion à la mutuelle de la SARL (art. R. 242-1-6 CSS). Conditions à réunir :
- La couverture existante est **obligatoire** chez l'autre employeur (pas une couverture optionnelle)
- La dispense doit être demandée par écrit et conservée au dossier RH

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

**5. Entreprise sans salarié**
Aucun PEE, PERECO ni accord d'intéressement n'est possible pour un dirigeant seul (art. L. 3332-2 et L. 3312-3 C. trav.). Un plan mis en place malgré tout expose l'abondement à une requalification en rémunération (cotisations + IR). Embaucher uniquement pour ouvrir le plan n'a de sens que si l'emploi est réel et que le coût global (salaire, abondement versé au salarié) reste justifié.

**6. Formalisme obligatoire**
- Règlement du plan mis en place par accord ou, à défaut, par décision unilatérale de l'employeur, et ouvert à tous les salariés
- Dépôt sur la plateforme TéléAccords
- En l'absence de dépôt conforme, les exonérations peuvent être remises en cause

**7. SAS/SASU : régime différent**
Le président de SAS/SASU est assimilé salarié. Pas de cotisations TNS sur les dividendes (quel que soit le montant). L'arbitrage PEE vs PER vs dividendes est distinct — ne pas appliquer les règles TNS à une SASU.

### Références légales

- **Code du travail** : art. L. 3332-1 et s. (PEE), L. 3332-2 (bénéficiaires : chef d'entreprise et mandataires sociaux si au moins un salarié et moins de 250), L. 3332-10 (plafond des versements), L. 3312-3 (intéressement : dirigeant seul salarié exclu), L. 3314-1 et s. (intéressement), L. 3323-1 et s. (participation)
- **CMF** : art. L. 224-13 et s. (PERECO), L. 224-4 (cas de déblocage anticipé du PER)
- **Fiches officielles** : service-public F2142 (PEE, condition d'au moins un salarié en plus du dirigeant), F34982 (PER)
- **PPV** : loi n° 2022-1158 du 16 août 2022 ; loi n° 2023-1107 du 29 novembre 2023
- **CGI** : art. 81-18° (exonération IR abondement), art. 83-1° quater (prévoyance collective), art. 154 bis (PER TNS / Madelin)
- **CSS** : art. L. 131-6 (assiette cotisations TNS, dont dividendes SARL > 10%), D. 242-1 (limite d'exonération prévoyance et santé), L. 911-7 (mutuelle obligatoire), R. 242-1-6 (dispense d'adhésion)
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
