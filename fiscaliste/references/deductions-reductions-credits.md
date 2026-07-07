# Déductions, réductions et crédits d'impôt

## Distinction fondamentale

Voir `data/niches-fiscales.json` → `distinction_mecanismes`.

| Mécanisme | S'applique sur | Remboursable si excédent ? | Ordre dans le calcul |
|-----------|---------------|---------------------------|----------------------|
| **Déduction** | Revenu imposable (avant calcul) | Non applicable | Étape 3 (RNI) |
| **Réduction** | Impôt calculé | Non — plancher 0 | Étape 9 (après décote) |
| **Crédit** | Impôt calculé | Oui — remboursé si > impôt dû | Étape 10 (après réductions) |

**Conséquence pratique** : une déduction de 1 000 € à TMI 30% économise 300 €. Une réduction/crédit de 1 000 € économise 1 000 €. Les dispositifs ne sont donc pas équivalents à montant nominal identique.

## Déductions (agissent sur le RNI)

### PER (Plan d'Épargne Retraite)

- Déduction dans la limite du plafond (10% revenus pro, plancher 4 710 €, plafond 37 680 €)
- Économie immédiate = versement × TMI
- Mutualisation couple, report plafonds non utilisés sur 3 ans → détails listés dans SKILL.md sous "Rappels PER"

### Pension alimentaire

- Versée à un enfant majeur (case 6EL / 6EM, post-2006) : plafond annuel à vérifier — cases 6GI / 6GJ réservées au cas résiduel d'une décision de justice antérieure à 2006 (formulaire 2042 C, majoration de 25%)
- Versée à un ascendant dans le besoin : plafond distinct
- **Condition clé** : preuve du besoin du bénéficiaire et du versement effectif
- Déduction plafonnée

### CSG déductible

- 6,8% de la CSG prélevée sur les revenus du capital
- **Uniquement si option barème progressif** sur les revenus du capital N-1
- Imputée sur le RNI de N+1
- **Zéro sous PFU**

### Autres déductions notables

- Frais réels professionnels (option vs abattement 10% salaires)
- Charges foncières (régime réel) → section Revenus fonciers dans SKILL.md

## Réductions d'impôt (agissent sur l'impôt, plancher 0)

### Dispositifs dans le plafond global 10 000 €

Voir `data/niches-fiscales.json` → `dispositifs_dans_plafond`.

| Dispositif | Taux / mécanisme | Particularité |
|-----------|------------------|---------------|
| **Pinel** | Réduction étalée sur 6/9/12 ans | En extinction — dernier millésime 2024 |
| **Denormandie** | Similaire Pinel, ancien avec travaux | Ciblé centres-villes dégradés |
| **Loc'Avantages** | Selon conventionnement et loyer | Alternative au Pinel |
| **FCPI / FIP** | 18% à 25% des versements | Plafond versements distinct |
| **Malraux** | 22% ou 30% des travaux | Hors plafond dans certains cas |
| **Monuments historiques** | Déduction travaux sans plafond | Conditions strictes (ouverture public) |
| **Investissement forestier** | 18% des versements | Engagement 8 ans minimum |
| **Corse / outre-mer** (certaines formes) | Variable | Vérifier plafonds spécifiques |

### Dispositifs hors plafond global

Voir `data/niches-fiscales.json` → `dispositifs_hors_plafond`.

| Dispositif | Taux / mécanisme |
|-----------|------------------|
| **Dons associations** | 66% ou 75% (aide aux personnes en difficulté) |
| **Cotisations syndicales** | 66% |
| **Girardin industriel outre-mer** | Variable, sous conditions |
| **Investissement outre-mer** (catégories spécifiques) | Variable |

### Frais de scolarité des enfants (cases 7EA/7EC/7EF)

Voir `data/niches-fiscales.json` → `frais_scolarite`.

Réduction forfaitaire par enfant à charge (ou rattaché) **scolarisé au 31 décembre** de l'année d'imposition.

| Niveau | Enfant à charge | Garde alternée | Réduction |
|--------|----------------|----------------|-----------|
| Collège | 7EA | 7EB | 61 € |
| Lycée | 7EC | 7ED | 153 € |
| Enseignement supérieur | 7EF | 7EG | 183 € |

Montants stables (non indexés annuellement). Réduction non remboursable — excédent perdu si impôt < réduction.

**Garde alternée** : réduction divisée par deux entre les deux foyers (cases 7EB / 7ED / 7EG).

**Exclusions** : apprentissage, congé formation, contrat d'études avec l'employeur. La condition BOFiP ("contrat de travail avec l'employeur") vise les formations dont la structure implique un lien contractuel avec un employeur — pas un job étudiant exercé en parallèle d'une formation initiale.

**Cas limites à ne pas confondre** :
- Job étudiant à côté des études → **éligible** (contrat sans lien avec la formation)
- Stage indemnisé obligatoire intégré au cursus → **éligible** (prévu explicitement par BOFiP BOI-IR-RICI-30)
- Apprentissage / alternance → **exclu**
- Études terminées en cours d'année, enfant non inscrit nulle part au 31/12 → **pas de réduction**
- Pension alimentaire déduite (6EL/6EM pour un enfant majeur, post-2006 ; 6GI/6GJ résiduel si décision de justice antérieure à 2006) pour cet enfant → **pas de réduction** (l'enfant n'est plus compté à charge)

Source : BOFiP BOI-IR-RICI-30 · art. 199 quater F CGI

### Dons aux associations

**Taux standard : 66%** de réduction, dans la limite de 20% du revenu imposable.

**Taux majoré : 75%** pour les dons à des associations d'aide aux personnes en difficulté (Restos du Cœur, Secours Populaire, etc.), dans la limite de **1 000 €** par an. Au-delà : taux 66%.

**Report** : les dons dépassant le plafond de 20% sont reportables sur les 5 années suivantes.

### Abrogé : frais de comptabilité et d'adhésion AGA/OGA (art. 199 quater B)

La réduction d'impôt pour frais de tenue de comptabilité et d'adhésion à un
organisme de gestion agréé (2/3 des dépenses, plafond 915 €) est **abrogée par
la LF 2025** (loi 2025-127 du 14 février 2025, art. 11). Dernière application :
imposition des revenus **2024**. Ne plus la proposer pour les revenus 2025 et
suivants. Rappel lié : la majoration de 25 % pour non-adhésion AGA/OGA avait
déjà disparu depuis les revenus 2023 (LF 2021), l'adhésion n'apporte donc plus
d'avantage fiscal direct.

## Crédits d'impôt (remboursables)

### Emploi à domicile

- **Taux : 50%** des dépenses éligibles
- **Plafond général : 12 000 €** par an (donc crédit max 6 000 €)
- **Majoration** : +1 500 € par enfant à charge ou personne de + 65 ans dans le foyer (plafond max 15 000 €)
- **Éligible** : ménage, garde d'enfant à domicile, soutien scolaire, petit bricolage, jardinage, etc.
- **Entreprise agréée ou emploi direct** avec déclaration URSSAF

**Avance immédiate (depuis 2022)** : possible via CESU+ — l'URSSAF avance le crédit directement, pas d'attente de remboursement.

### Garde d'enfant hors domicile

- **Taux : 50%** des dépenses
- **Plafond : 3 500 € par enfant** (donc crédit max 1 750 € par enfant)
- **Âge limite** : enfant de moins de 6 ans au 1er janvier
- **Éligibles** : crèche, assistante maternelle agréée, garde partagée

### Cotisations syndicales

- **Taux : 66%**
- **Plafond** : 1% du salaire brut
- Pour salariés déclarant à l'IR (pas pour les non-imposables)

## Plafonnement global des niches fiscales

Voir `data/niches-fiscales.json` → `plafonnement_global`.

**Plafond : 10 000 €** par an (18 000 € pour investissements outre-mer spécifiques).

**Mécanique** :
1. Calculer toutes les réductions et crédits éligibles
2. Distinguer ceux **dans le plafond** vs **hors plafond**
3. Sommer les "dans le plafond"
4. Si total > 10 000 € → l'excédent est **perdu** (pas reportable)

**Pièges fréquents** :
- Cumuler Pinel + FCPI + Girardin sans vérifier le plafond → partie perdue
- Confondre "dans plafond" et "hors plafond" (les dons et l'emploi à domicile sont hors plafond)

## Ordre d'application (après impôt brut)

```
Impôt brut après QF et décote
  ↓ − réductions d'impôt (plancher 0)
Impôt après réductions
  ↓ − crédits d'impôt (peut être négatif = remboursement)
Impôt net final
```

**Pourquoi distinguer l'ordre** : si l'impôt est déjà faible, une réduction est "perdue" (plancher 0) alors qu'un crédit reste remboursable.

## Stratégies d'optimisation

### 1. Vérifier le plafond global avant de cumuler

Tableau rapide :
- Pinel + FCPI : à additionner → vérifier ≤ 10 000 €
- Malraux : peut dépasser le plafond selon les cas

### 2. Privilégier les crédits si non imposable

Un crédit d'impôt (emploi à domicile, garde d'enfant) est **remboursé** même si l'impôt est à 0. Une réduction est perdue dans ce cas.

### 3. Étaler les dons

Dons importants : étaler sur plusieurs années pour rester dans le plafond 20% du revenu imposable et éviter la perte.

### 4. Combiner déduction + crédit

Un même foyer peut :
- Déduire du PER (réduction RNI)
- Puis bénéficier de crédits d'impôt sur les dépenses restantes

Les deux jouent sur des couches différentes du calcul.

## Pièges fréquents

1. **Confondre réduction et crédit** → surévaluer l'économie si foyer non imposable
2. **Oublier le plafond 20% sur les dons** → excédent reporté mais souvent oublié en N+1
3. **Plafond global mal évalué** → perte silencieuse
4. **Déduction PER vs réduction FCPI** : ne pas confondre les mécanismes
5. **Emploi à domicile non déclaré CESU** → pas d'éligibilité au crédit

## Références CGI / BOFiP

- Plafonnement global : art. 200-0 A CGI
- Dons : art. 200 CGI
- Emploi à domicile : art. 199 sexdecies CGI
- Garde d'enfant : art. 200 quater B CGI
- Pinel : art. 199 novovicies CGI
- FCPI : art. 199 terdecies-0 A CGI
- Frais de scolarité enfants : art. 199 quater F CGI
- BOFiP : BOI-IR-RICI
