# Clôture des Comptes - Guide Complet

## Processus de Clôture

### Chronologie

```
J-60    Inventaire physique des stocks
J-30    Collecte des pièces manquantes
J-15    Rapprochements bancaires
J-7     Écritures d'inventaire
J-3     Révision des comptes
J       Clôture définitive
J+90    Liasse fiscale (3 mois après clôture)
J+180   Approbation des comptes (6 mois après clôture)
```

---

## Travaux Préparatoires

### 1. Rapprochement Bancaire

**Objectif:** S'assurer que le solde comptable = solde bancaire.

**Méthode:**
```
Solde bancaire (relevé)
+ Chèques émis non encaissés
- Chèques reçus non remis
+ Virements reçus non comptabilisés
- Virements émis non débités
± Frais/agios non comptabilisés
= Solde comptable (compte 512)
```

**État de rapprochement:**
| Élément | Banque | Comptabilité |
|---------|--------|--------------|
| Solde de départ | X XXX | X XXX |
| Régularisations | ± XXX | ± XXX |
| Solde rapproché | X XXX | X XXX |

### 2. Lettrage des Comptes de Tiers

**Comptes à lettrer:**
- 401 Fournisseurs
- 411 Clients
- 421 Personnel
- 43X Organismes sociaux
- 44X État

**Principe:** Rapprocher débits et crédits correspondant à une même opération.

**Analyse des non-lettrés:**
- Factures non réglées → Solde justifié
- Règlements non affectés → Recherche de facture
- Écarts anciens → Régularisation ou provision

### 3. Justification des Soldes

Chaque compte doit être justifié par:
- Documents (factures, relevés, contrats)
- Calculs (paie, amortissements, provisions)
- Confirmations (soldes clients/fournisseurs)

---

## Écritures d'Inventaire

### Cut-Off (Séparation des Exercices)

#### Charges Constatées d'Avance (CCA)

Charges payées en N mais concernant N+1.

**Exemples:** Loyer janvier payé en décembre, assurance annuelle.

```
  Débit 486 Charges constatées d'avance    X XXX,XX
  Crédit 6XX Compte de charge              X XXX,XX
```

**Calcul pro rata:**
```
CCA = Montant total × (Jours N+1 / Jours totaux)
```

#### Charges à Payer (CAP)

Charges de N non encore facturées/payées.

**Exemples:** Factures fournisseurs non parvenues, intérêts courus.

```
Facture non parvenue:
  Débit 6XX Charge                         X XXX,XX
  Débit 44586 TVA sur FNP                    XXX,XX
  Crédit 408 Fournisseurs - FNP            X XXX,XX

Intérêts courus non échus:
  Débit 6611 Intérêts des emprunts           XXX,XX
  Crédit 1688 Intérêts courus                XXX,XX
```

#### Produits Constatés d'Avance (PCA)

Produits encaissés en N mais concernant N+1.

**Exemples:** Abonnements, locations perçues d'avance.

```
  Débit 7XX Compte de produit              X XXX,XX
  Crédit 487 Produits constatés d'avance   X XXX,XX
```

#### Produits à Recevoir (PAR)

Produits de N non encore facturés/encaissés.

**Exemples:** Factures à établir, intérêts à recevoir.

```
Facture à établir:
  Débit 418 Clients - FAE                  X XXX,XX
  Crédit 7XX Produit                       X XXX,XX
  Crédit 44587 TVA sur FAE                   XXX,XX
```

---

## Amortissements

### Règles Générales

**Durées d'amortissement usuelles:**

| Immobilisation | Durée fiscale |
|----------------|---------------|
| Logiciels | 1-3 ans |
| Matériel informatique | 3 ans |
| Mobilier | 5-10 ans |
| Véhicules | 4-5 ans |
| Agencements | 10 ans |
| Constructions | 20-50 ans |

### Méthodes d'Amortissement

#### Linéaire (Défaut)

```
Annuité = Valeur brute / Durée
```

**Prorata temporis:** Première et dernière année au prorata.
Base civile retenue ici : 365 jours, conforme à la pratique fiscale usuelle pour l'amortissement des immobilisations.

```
Annuité N = (Valeur / Durée) × (Jours utilisés / 365)
```

#### Dégressif (Option)

**Biens éligibles:** Matériel industriel, informatique (durée ≥ 3 ans).

**Coefficients:**
| Durée | Coefficient |
|-------|-------------|
| 3-4 ans | 1,25 |
| 5-6 ans | 1,75 |
| > 6 ans | 2,25 |

```
Taux dégressif = Taux linéaire × Coefficient
Annuité = VNC début période × Taux dégressif
```

Passage au linéaire quand linéaire > dégressif sur durée restante.

### Écriture d'Amortissement

```
  Débit 6811 Dotations amortissements      X XXX,XX
  Crédit 28XX Amortissement immo.          X XXX,XX
```

### Amortissement Dérogatoire

Différence entre amortissement fiscal et comptable.

```
Dotation dérogatoire (fiscal > comptable):
  Débit 68725 Dotations amort. dérogatoires    XXX,XX
  Crédit 145 Amortissements dérogatoires       XXX,XX

Reprise dérogatoire (comptable > fiscal):
  Débit 145 Amortissements dérogatoires        XXX,XX
  Crédit 78725 Reprises amort. dérogatoires    XXX,XX
```

---

## Provisions et Dépréciations

### Provisions pour Risques et Charges

**Conditions:**
1. Obligation envers un tiers
2. Sortie probable de ressources
3. Estimation fiable du montant

| Type | Compte |
|------|--------|
| Litiges | 1511 |
| Amendes | 1514 |
| Pertes de change | 1515 |
| Garanties | 1512 |
| Retraites | 153 |

**Écriture:**
```
Dotation:
  Débit 6815 Dotations provisions exploitation    X XXX,XX
  Crédit 15XX Provision                           X XXX,XX

Reprise (risque éteint ou réalisé):
  Débit 15XX Provision                            X XXX,XX
  Crédit 7815 Reprises provisions exploitation    X XXX,XX
```

### Dépréciations d'Actifs

#### Créances Douteuses

**Processus:**
1. Identifier les créances à risque
2. Transférer en compte 416
3. Calculer la perte probable (HT)
4. Doter la dépréciation

```
Transfert en douteux:
  Débit 416 Clients douteux               X XXX,XX
  Crédit 411 Clients                      X XXX,XX

Dépréciation (base HT):
  Débit 6817 Dotations dépréciations        XXX,XX
  Crédit 491 Dépréciation clients           XXX,XX
```

**Créance irrécouvrable:**
```
  Débit 654 Pertes sur créances            X XXX,XX
  Débit 44571 TVA collectée (régularisation) XXX,XX
  Crédit 416 Clients douteux               X XXX,XX

Reprise dépréciation:
  Débit 491 Dépréciation clients             XXX,XX
  Crédit 7817 Reprises dépréciations         XXX,XX
```

#### Dépréciation des Stocks

```
  Débit 6817 Dotations dépréciations        XXX,XX
  Crédit 39X Dépréciation stocks            XXX,XX
```

### Provisions Réglementées

**Amortissements dérogatoires:** Compte 145

**Autres:** Provisions pour hausse des prix, fluctuation des cours...

---

## Stocks

### Inventaire Physique

**Méthode:**
1. Comptage physique à la clôture
2. Valorisation au coût d'acquisition/production
3. Comparaison valeur actuelle (si < coût → dépréciation)

### Variation de Stock

**Marchandises et matières (achats):**
```
Stock initial → Stock final

Annulation SI:
  Débit 6037 Variation stock marchandises   X XXX,XX
  Crédit 37 Stock de marchandises           X XXX,XX

Constatation SF:
  Débit 37 Stock de marchandises            X XXX,XX
  Crédit 6037 Variation stock marchandises  X XXX,XX
```

**Produits finis (production):**
```
  Débit 355 Stock produits finis            X XXX,XX
  Crédit 7135 Variation stocks produits     X XXX,XX
```

### Méthodes de Valorisation

| Méthode | Principe |
|---------|----------|
| CUMP | Coût unitaire moyen pondéré |
| FIFO | Premier entré, premier sorti |
| Coût réel | Identification spécifique |

---

## Écritures de Régularisation TVA

### TVA Collectée vs Déductible

```
Centralisation mensuelle:
  Débit 44571 TVA collectée               XX XXX,XX
  Crédit 44566 TVA déductible ABS         XX XXX,XX
  Crédit 44562 TVA déductible immo.           XXX,XX
  Crédit 44551 TVA à décaisser             X XXX,XX
```

### Crédit de TVA

```
Si TVA déductible > collectée:
  Débit 44567 Crédit de TVA                X XXX,XX
  Crédit 44566/44562                       X XXX,XX
```

---

## Impôt sur les Sociétés

### Calcul

```
Résultat comptable
+ Réintégrations fiscales
- Déductions fiscales
- Déficits antérieurs reportés
= Résultat fiscal

IS = Résultat fiscal × Taux
```

### Écriture

```
Charge d'IS:
  Débit 695 Impôt sur les bénéfices       X XXX,XX
  Crédit 444 État - IS                    X XXX,XX

Acomptes déjà versés:
  Le compte 444 est débité lors des versements
  → Solde = IS à payer ou crédit d'impôt
```

---

## Affectation du Résultat

### Bénéfice

```
  Débit 120 Résultat (bénéfice)          XX XXX,XX
  Crédit 1061 Réserve légale              X XXX,XX
  Crédit 106X Autres réserves             X XXX,XX
  Crédit 457 Dividendes à payer           X XXX,XX
  Crédit 110 Report à nouveau             X XXX,XX
```

### Perte

```
  Débit 119 Report à nouveau débiteur    XX XXX,XX
  Crédit 129 Résultat (perte)            XX XXX,XX
```

---

## Checklist de Clôture

### Avant Clôture

- [ ] Rapprochements bancaires complets
- [ ] Lettrage clients/fournisseurs
- [ ] Inventaire physique des stocks
- [ ] Collecte des factures manquantes
- [ ] Confirmation des soldes intercompagnies

### Écritures d'Inventaire

- [ ] Cut-off charges (CCA, CAP)
- [ ] Cut-off produits (PCA, PAR)
- [ ] Amortissements
- [ ] Provisions pour risques
- [ ] Dépréciations créances
- [ ] Dépréciations stocks
- [ ] Variation des stocks
- [ ] Régularisation TVA

### Contrôles Finaux

- [ ] Balance équilibrée
- [ ] Cohérence bilan/résultat
- [ ] Contrôle des comptes d'attente (soldés)
- [ ] Vérification IS
- [ ] Cohérence exercice précédent

### Post-Clôture

- [ ] Extournes automatiques (CCA, PCA, CAP, PAR)
- [ ] Liasse fiscale
- [ ] Rapport de gestion
- [ ] Approbation AG
- [ ] Dépôt greffe

---

## Contrôles de Cohérence

### Ratios à Vérifier

| Ratio | Formule | Attendu |
|-------|---------|---------|
| BFR | AC - PC (hors tréso) | Cohérent avec activité |
| Trésorerie | Dispo - CBC | ≈ Relevés bancaires |
| Marge brute | (Ventes - Achats) / Ventes | Stable vs N-1 |
| Charge personnel / CA | Masse salariale / CA | Stable vs N-1 |

### Variations Anormales

Investiguer toute variation > 10% par rapport à N-1 sans explication évidente.

### Contrôle Croisé

| Compte | Vérification |
|--------|--------------|
| 512 Banque | = Relevé après rapprochement |
| 401 Fournisseurs | = Balance âgée |
| 411 Clients | = Balance âgée |
| 421 Personnel | = Dernière paie |
| 431 URSSAF | = Dernière DSN |
| 444 État IS | = Calcul IS - acomptes |
| 445 TVA | = Dernière CA3/CA12 |
