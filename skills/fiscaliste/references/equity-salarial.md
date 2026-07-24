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

## Épargne salariale (PEE / PERCO / PERO)

### PEE (Plan d'Épargne Entreprise)

Enveloppe collective distincte du PER individuel.

- **Abondement employeur** : exonéré IR et PS dans les plafonds — **AVANTAGE MAJEUR**
- **Plafond abondement** : ~3 709 € par bénéficiaire (8% PASS — vérifier annuellement)
- **Blocage** : 5 ans sauf cas de déblocage anticipé (mariage, naissance 3e enfant, achat RP, divorce avec enfant, fin contrat travail, surendettement, invalidité, décès, violences conjugales)
- **Sortie après 5 ans** : exonération IR, seuls PS 17,2% sur les gains
- **Dividendes réinvestis** : exonérés IR tant qu'ils restent dans l'enveloppe

### PERCO / PERO (PER d'entreprise)

- **Sortie à la retraite** : rente ou capital
- **Fiscalité sortie** : même que PER individuel (versements à barème, gains au PFU)
- **Abondement employeur** : exonéré dans plafonds (~7 418 €, distinct du plafond PEE)

### Arbitrage PEE/PERCO vs PER individuel

| Enveloppe | Avantage unique | Quand privilégier |
|-----------|----------------|-------------------|
| PEE | Abondement employeur (levier +30% à +300%) | D'abord, toujours — tant qu'il y a abondement |
| PERCO / PERO | Abondement employeur sur épargne retraite | En second après PEE max |
| PER individuel | Déduction RNI (pas de plafond d'abondement) | En complément, après saturation PEE/PERCO |

**Règle d'or** : ne jamais abonder un PER individuel avant d'avoir saturé l'abondement employeur PEE + PERCO. L'abondement est de l'argent gratuit.

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
