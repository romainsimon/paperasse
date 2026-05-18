# Clôture des Comptes — Guide Complet (Belgique)

`last_updated: 2026-05-15`

## Processus de Clôture

### Chronologie

```
J-60    Inventaire physique des stocks
J-30    Collecte des pièces manquantes
J-15    Rapprochements bancaires
J-7     Écritures d'inventaire
J-3     Révision des comptes
J       Clôture définitive
J+90    Déclaration ISOC 275 (avant 7 mois après clôture)
J+180   Approbation des comptes (6 mois après clôture)
J+210   Dépôt comptes annuels BNB (7 mois après clôture)
```

---

## Travaux Préparatoires

### 1. Rapprochement Bancaire

**Objectif :** S'assurer que le solde comptable = solde bancaire.

**Méthode :**
```
Solde bancaire (relevé)
+ Chèques émis non encaissés
- Chèques reçus non remis
+ Virements reçus non comptabilisés
- Virements émis non débités
± Frais/agios non comptabilisés
= Solde comptable (compte 550)
```

**État de rapprochement :**
| Élément | Banque | Comptabilité |
|---------|--------|--------------|
| Solde de départ | X XXX | X XXX |
| Régularisations | ± XXX | ± XXX |
| Solde rapproché | X XXX | X XXX |

### 2. Lettrage des Comptes de Tiers

**Comptes à lettrer (PCMN belge) :**
- 400 Clients
- 440 Fournisseurs
- 454 Rémunérations à payer
- 455 ONSS à payer
- 450 ISOC à payer
- 451 TVA à payer / 410 TVA à récupérer

**Principe :** Rapprocher débits et crédits correspondant à une même opération.

**Analyse des non-lettrés :**
- Factures non réglées → Solde justifié
- Règlements non affectés → Recherche de facture
- Écarts anciens → Régularisation ou provision

### 3. Justification des Soldes

Chaque compte doit être justifié par :
- Documents (factures, relevés, contrats)
- Calculs (paie, amortissements, provisions)
- Confirmations (soldes clients/fournisseurs)

---

## Écritures d'Inventaire

### Cut-Off (Séparation des Exercices)

#### Charges à Reporter (compte 470 — régularisation actif)

Charges payées en N mais concernant N+1.

**Exemples :** Loyer janvier payé en décembre, assurance annuelle.

```
  Débit 470 Charges à reporter         X XXX,XX
  Crédit 6XX Compte de charge          X XXX,XX
```

**Calcul pro rata :**
```
Régularisation = Montant total × (Jours N+1 / Jours totaux)
```

#### Charges à Imputer (compte 492 — régularisation passif)

Charges de N non encore facturées/payées.

**Exemples :** Factures fournisseurs non parvenues, intérêts courus.

```
Facture non parvenue :
  Débit 6XX Charge                      X XXX,XX
  Crédit 440 Fournisseurs — FNP         X XXX,XX

Intérêts courus non échus :
  Débit 650 Charges d'intérêts            XXX,XX
  Crédit 17X Dettes long terme — intérêts XXX,XX
```

#### Produits à Reporter (compte 493 — régularisation passif)

Produits encaissés en N mais concernant N+1.

**Exemples :** Abonnements, locations perçues d'avance.

```
  Débit 70X Compte de produit          X XXX,XX
  Crédit 493 Produits à reporter       X XXX,XX
```

#### Produits Acquis (compte 472 — régularisation actif)

Produits de N non encore facturés/encaissés.

**Exemples :** Factures à établir, intérêts à recevoir.

```
Facture à établir :
  Débit 400 Clients — FAE               X XXX,XX
  Crédit 70X Produit                    X XXX,XX
  Crédit 451 TVA à payer                  XXX,XX
```

---

## Amortissements

### Règles Générales

**Durées d'amortissement usuelles (Belgique) :**

| Immobilisation | Durée usuelle |
|----------------|---------------|
| Frais d'établissement | 5 ans max (art. 3:43 AR CSA) |
| Logiciels | 3-5 ans |
| Matériel informatique | 3-5 ans |
| Mobilier de bureau | 5-10 ans |
| Véhicules | 4-5 ans |
| Agencements/installations | 10 ans |
| Constructions | 20-33 ans |

### Méthodes d'Amortissement

#### Linéaire (Défaut)

```
Annuité = Valeur brute / Durée
```

**Prorata temporis :** Première et dernière année au prorata.

```
Annuité N = (Valeur / Durée) × (Jours utilisés / 365)
```

#### Dégressif (Option)

Possible sur option, sous réserve de constance (art. 3:43 AR CSA) — à justifier dans l'annexe.

### Écriture d'Amortissement

```
  Débit 630 Dotations aux amortissements    X XXX,XX
  Crédit 28X Amortissements immo.           X XXX,XX
```

---

## Réductions de Valeur et Provisions

### Provisions pour Risques et Charges (compte 19)

**Conditions :**
1. Obligation envers un tiers à la date de clôture
2. Sortie probable de ressources
3. Estimation fiable du montant

| Type | Compte |
|------|--------|
| Pensions et obligations similaires | 190 |
| Grosses réparations | 194 |
| Litiges | 195 |
| Autres provisions | 199 |

**Écriture :**
```
Dotation :
  Débit 634 Provisions risques/charges       X XXX,XX
  Crédit 19X Provision                       X XXX,XX

Reprise (risque éteint ou réalisé) :
  Débit 19X Provision                        X XXX,XX
  Crédit 745 Reprises provisions exploitation X XXX,XX
```

### Réductions de Valeur sur Créances (compte 409)

#### Créances Douteuses

**Processus :**
1. Identifier les créances à risque
2. Transférer en compte 404 (créances commerciales douteuses)
3. Calculer la perte probable
4. Constater la réduction de valeur

```
Transfert en douteux :
  Débit 404 Créances commerciales douteuses  X XXX,XX
  Crédit 400 Clients                         X XXX,XX

Réduction de valeur :
  Débit 631/634 Réduction de valeur           XXX,XX
  Crédit 409 Réductions de valeur créances    XXX,XX
```

**Créance irrécouvrable :**
```
  Débit 649 Charges d'exploitation diverses  X XXX,XX
  Débit 451 TVA à payer (récupération TVA)     XXX,XX
  Crédit 404 Créances douteuses              X XXX,XX

Reprise réduction de valeur :
  Débit 409 Réductions de valeur              XXX,XX
  Crédit 744 Produits débiteurs douteux recouvrés XXX,XX
```

#### Réductions de Valeur sur Stocks

```
  Débit 631 Réductions de valeur stocks       XXX,XX
  Crédit 390 Réductions de valeur stocks (-)  XXX,XX
```

---

## Stocks

### Inventaire Physique

**Méthode :**
1. Comptage physique à la clôture
2. Valorisation au coût d'acquisition/production (CUMP ou FIFO)
3. Comparaison valeur actuelle (si < coût → réduction de valeur)

### Variation de Stock

**Méthode comptable belge :** Ajustement via compte 71 (variation des stocks) en classe 7.

```
Stock initial → Stock final

Si SF > SI :
  Débit 33X Stocks                       X XXX,XX
  Crédit 71 Variation des stocks         X XXX,XX

Si SI > SF :
  Débit 71 Variation des stocks          X XXX,XX
  Crédit 33X Stocks                      X XXX,XX
```

### Méthodes de Valorisation (AR CSA)

| Méthode | Principe |
|---------|----------|
| CUMP | Coût unitaire moyen pondéré |
| FIFO | Premier entré, premier sorti |
| LIFO | Interdit en Belgique depuis 2016 |

---

## Régularisation TVA

### TVA à Récupérer vs TVA à Payer

```
Centralisation périodique :
  Débit 451 TVA à payer               XX XXX,XX
  Crédit 410 TVA à récupérer          XX XXX,XX
  Crédit 550 Banque (si solde à payer) X XXX,XX
```

### Crédit de TVA

```
Si TVA à récupérer > TVA à payer :
  Solde débiteur du compte 410 → demande de remboursement ou report
```

---

## Impôt des Sociétés (ISOC)

### Calcul

```
Résultat comptable (avant ISOC)
+ Réintégrations (DNA — Dépenses Non Admises, art. 74 CIR 92)
- Déductions (RDT, art. 202 CIR 92)
- Pertes fiscales antérieures reportées
= Résultat fiscal

ISOC = Résultat fiscal × Taux
     (25% normal, 20% PME sur ≤ 100 000 €)
```

### Écriture

```
Charge ISOC :
  Débit 670 ISOC dû — exercice courant  X XXX,XX
  Crédit 450 ISOC à payer               X XXX,XX

Versements anticipés déjà versés :
  Le compte 450 est débité lors des VA
  → Solde créditeur = ISOC à payer
  → Solde débiteur = crédit d'ISOC
```

---

## Affectation du Résultat

### Bénéfice

```
  Débit 14 Bénéfice reporté            XX XXX,XX
  Crédit 130 Réserve légale             X XXX,XX
  Crédit 133 Réserves disponibles       X XXX,XX
  Crédit 489 Dividendes à payer         X XXX,XX
  Crédit 14 Report à nouveau            X XXX,XX
```

### Perte

```
  Débit 14 Report à nouveau (perte)    XX XXX,XX
  Crédit 14 Résultat (perte)           XX XXX,XX
```

---

## Checklist de Clôture

### Avant Clôture

- [ ] Rapprochements bancaires complets (compte 550)
- [ ] Lettrage clients (400) / fournisseurs (440)
- [ ] Inventaire physique des stocks
- [ ] Collecte des factures manquantes
- [ ] Confirmation des soldes intercompagnies
- [ ] Vérification du listing TVA annuel

### Écritures d'Inventaire

- [ ] Cut-off charges (470 charges à reporter, 492 charges à imputer)
- [ ] Cut-off produits (493 produits à reporter, 472 produits acquis)
- [ ] Amortissements (630 / 28X)
- [ ] Provisions pour risques (634 / 19X)
- [ ] Réductions de valeur créances (631 / 409)
- [ ] Réductions de valeur stocks (631 / 390)
- [ ] Variation des stocks (71)
- [ ] Régularisation TVA (451 / 410)

### Contrôles Finaux

- [ ] Balance équilibrée (total débits = total crédits)
- [ ] Cohérence bilan/résultat
- [ ] Contrôle des comptes d'attente (soldés)
- [ ] Calcul et vérification ISOC (670 / 450)
- [ ] Cohérence exercice précédent (à-nouveaux)
- [ ] Test double bilan (si distribution envisagée)

### Post-Clôture

- [ ] Extournes automatiques (470, 493, 492, 472)
- [ ] Déclaration ISOC 275 (Tax-on-web, dans les 7 mois)
- [ ] Dépôt comptes annuels BNB (Centrale des Bilans, dans les 7 mois)
- [ ] Rapport de gestion (si grande société)
- [ ] Approbation AG (dans les 6 mois)
- [ ] Listing TVA annuel (31 mars)
- [ ] Fiches fiscales 281.xx (1er mars)

---

## Contrôles de Cohérence

### Ratios à Vérifier

| Ratio | Formule | Attendu |
|-------|---------|---------|
| BFR | AC - PC (hors tréso) | Cohérent avec activité |
| Trésorerie | Disponible - Dettes CT bancaires | ≈ Relevés bancaires |
| Marge brute | (CA - Achats) / CA | Stable vs N-1 |
| Charge personnel / CA | Masse salariale / CA | Stable vs N-1 |

### Variations Anormales

Investiguer toute variation > 10% par rapport à N-1 sans explication évidente.

### Contrôle Croisé (PCMN)

| Compte | Vérification |
|--------|--------------|
| 550 Banque | = Relevé après rapprochement |
| 440 Fournisseurs | = Balance âgée fournisseurs |
| 400 Clients | = Balance âgée clients |
| 454 Rémunérations à payer | = Dernière fiche de paie |
| 455 ONSS à payer | = Dernière DMFA |
| 450 ISOC à payer | = Calcul ISOC - versements anticipés |
| 451 TVA à payer / 410 TVA à récupérer | = Dernière déclaration Intervat |
