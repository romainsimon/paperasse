# Impôts et Taxes des Entreprises en France

## Impôt sur les Sociétés (IS)

### Taux d'IS (2026)

| Tranche de bénéfice | Taux |
|---------------------|------|
| 0 - 42 500 € | 15% (PME) |
| Au-delà de 42 500 € | 25% |

> Note: Le PLF 2026 envisage de relever le plafond du taux réduit à 100 000 €. Vérifier l'état de la loi de finances.

**Conditions pour le taux réduit PME (15%):**
- CA HT < 10 M€
- Capital entièrement libéré
- Capital détenu à 75%+ par des personnes physiques

### Calcul du Résultat Fiscal

```
Résultat comptable
+ Réintégrations (charges non déductibles)
- Déductions (produits non imposables)
- Déficits reportables
= Résultat fiscal
```

### Charges Non Déductibles (principales)

| Charge | Règle |
|--------|-------|
| Amendes et pénalités | Non déductibles |
| Impôt sur les sociétés | Non déductible |
| Taxe sur véhicules de société | Non déductible |
| Dépenses somptuaires | Non déductibles (chasse, pêche, yachts) |
| Rémunération excessive | Partie excessive non déductible |
| Intérêts compte courant | Plafonnés (taux BCE + 2 points) |

### Acomptes IS

**4 acomptes trimestriels:**

| Acompte | Échéance | Base |
|---------|----------|------|
| 1er | 15 mars | 25% de l'IS N-1 |
| 2ème | 15 juin | 25% de l'IS N-1 |
| 3ème | 15 septembre | 25% de l'IS N-1 |
| 4ème | 15 décembre | 25% de l'IS N-1 |

**Solde:** 15 du 4ème mois suivant la clôture (15 mai pour clôture 31/12)

**Dispense d'acomptes:** IS N-1 < 3 000 €

### Comptabilisation IS

**Acompte:**
```
  Débit 444 État - IS              X XXX,XX
  Crédit 512 Banque                X XXX,XX
```

**Charge IS en fin d'exercice:**
```
  Débit 695 Impôt sur les bénéfices    X XXX,XX
  Crédit 444 État - IS                 X XXX,XX
```

### Report des Déficits

**En avant (illimité):**
- Report sur bénéfices futurs
- Limité à 1 M€ + 50% du bénéfice excédant 1 M€

**En arrière (carry-back):**
- Report sur bénéfice N-1 uniquement
- Limité à 1 M€
- Génère une créance sur l'État

---

## Impôt sur le Revenu (IR) - Entreprises Individuelles

### BIC (Bénéfices Industriels et Commerciaux)

**Micro-BIC:**
- Seuil 2026 : 203 100 € (ventes) ou 83 600 € (services)
- Abattement: 71% (ventes) ou 50% (services)

**Réel simplifié:**
- Obligations comptables allégées
- Bilan et compte de résultat simplifiés

**Réel normal:**
- Comptabilité complète
- Liasse fiscale complète

### BNC (Bénéfices Non Commerciaux)

**Micro-BNC:**
- Seuil 2026 : 83 600 €
- Abattement: 34%

**Déclaration contrôlée:**
- Comptabilité recettes-dépenses
- Déclaration 2035

### Barème IR 2026 (revenus 2025)

| Tranche | Taux |
|---------|------|
| 0 - 11 600 € | 0% |
| 11 601 - 29 579 € | 11% |
| 29 580 - 84 577 € | 30% |
| 84 578 - 181 917 € | 41% |
| > 181 917 € | 45% |

Revalorisation de +0,9% par rapport à 2025.

---

## Contribution Économique Territoriale (CET)

### CFE (Cotisation Foncière des Entreprises)

**Base:** Valeur locative des biens passibles de taxe foncière.

**Cotisation minimum:** Fixée par la commune (entre 237 € et 7 349 € selon CA).

**Exonérations:**
- Première année de création
- Artisans (sous conditions)
- Certaines zones (ZRR, ZFU, QPV)

**Échéance:** 15 décembre

**Comptabilisation:**
```
  Débit 63511 CFE                  X XXX,XX
  Crédit 512 Banque                X XXX,XX
```

### CVAE (Cotisation sur la Valeur Ajoutée des Entreprises)

**Seuil d'assujettissement:** CA > 500 000 €

**Seuil de paiement:** CA > 500 000 € et VA > 0

**Taux 2026:** 0,28% max (suppression reportée à 2030)

> Note: La baisse prévue dans le PLF 2026 a été abandonnée. Taux maintenu à 0,28%.

**Calcul de la valeur ajoutée:**
```
+ Ventes de marchandises
+ Production vendue
+ Production stockée
+ Production immobilisée
+ Subventions d'exploitation
+ Autres produits de gestion courante
+ Transferts de charges d'exploitation
- Achats de marchandises (variation de stock déduite)
- Achats de matières premières (variation de stock déduite)
- Autres achats et charges externes (sauf loyers, redevances crédit-bail)
= Valeur Ajoutée
```

**Échéances:**
- Acompte 1: 15 juin (50%)
- Acompte 2: 15 septembre (50%)
- Solde: Mai N+1 avec déclaration 1330-CVAE

---

## Autres Impôts et Taxes

### Taxe sur les Véhicules de Société (TVS)

**Deux composantes:**
1. **Composante CO2:** selon émissions ou puissance fiscale
2. **Composante polluants atmosphériques:** selon type de carburant et année

**Exonérations:**
- Véhicules électriques
- Véhicules hybrides (sous conditions)

**Période:** Janvier à décembre
**Échéance:** Janvier N+1 (annexe 2855 à la déclaration CA3)

**Comptabilisation (non déductible IS):**
```
  Débit 63514 TVS                  X XXX,XX
  Crédit 512 Banque                X XXX,XX
```

### Taxe sur les Salaires

**Assujettissement:** Employeurs non soumis à TVA ou soumis partiellement.

**Taux 2026:**
| Tranche salaire annuel | Taux |
|------------------------|------|
| 0 - 9 071 € | 4,25% |
| 9 071 - 18 111 € | 8,50% |
| > 18 111 € | 13,60% |

> Tranches revalorisées selon l'inflation.

**Déclaration:** 2502 annuelle

### Contribution Sociale de Solidarité des Sociétés (C3S)

**Seuil:** CA HT > 19 M€

**Taux:** 0,16%

**Échéance:** 15 mai

### Taxe d'Apprentissage

**Taux:** 0,68% de la masse salariale (0,44% en Alsace-Moselle)

**Composantes:**
- Part principale: 87% (financement formations)
- Solde: 13% (versements aux établissements)

### Formation Professionnelle Continue

**Taux:**
- < 11 salariés: 0,55%
- ≥ 11 salariés: 1%

Versée à l'OPCO.

---

## Crédits et Réductions d'Impôt

### Crédit d'Impôt Recherche (CIR)

**Taux:** 30% des dépenses de R&D (5% au-delà de 100 M€)

**Dépenses éligibles:**
- Salaires chercheurs et techniciens
- Amortissement matériel de recherche
- Brevets
- Sous-traitance R&D

**Plafond:** Pas de plafond

### Crédit d'Impôt Innovation (CII) - PME

**Taux:** 20% des dépenses d'innovation

**Plafond:** 400 000 € de dépenses éligibles

### Crédit d'Impôt Formation Dirigeants

**Montant:** Heures de formation × SMIC horaire
**Plafond:** 40 heures/an

**Doublé pour micro-entreprises.**

---

## Calendrier Fiscal Annuel

### Janvier
- TVS (déclaration et paiement)
- CFE solde si > 3 000 €

### Février
- DSN janvier (cotisations sociales)

### Mars
- Acompte IS 1 (15 mars)
- Liasse fiscale exercices clos 30/11

### Avril
- Liasse fiscale exercices clos 31/12 (2ème jour ouvré suivant 1er mai)

### Mai
- Solde IS exercices clos 31/12 (15 mai)
- CA12 régime simplifié TVA
- CVAE solde et déclaration

### Juin
- Acompte IS 2 (15 juin)
- CVAE acompte 1 (15 juin)

### Juillet
- Acompte TVA régime simplifié

### Septembre
- Acompte IS 3 (15 septembre)
- CVAE acompte 2 (15 septembre)

### Décembre
- Acompte IS 4 (15 décembre)
- CFE (15 décembre)
- Acompte TVA régime simplifié

---

## Obligations Déclaratives

### Liasse Fiscale (formulaires principaux)

**IS:**
- 2065: Déclaration de résultat
- 2050 à 2059: Tableaux comptables et fiscaux

**IR (BIC réel):**
- 2031: Déclaration de résultat
- 2050 à 2059: Tableaux

**IR (BNC):**
- 2035: Déclaration de résultat

### Délais

| Clôture | Échéance liasse |
|---------|-----------------|
| 31/12 | 2ème jour ouvré après 1er mai |
| Autre date | 3 mois après clôture |
