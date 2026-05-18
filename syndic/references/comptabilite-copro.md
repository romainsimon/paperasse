# Comptabilité de l'ACP en Belgique

`last_updated: 2026-05-15`

## Cadre Réglementaire

**Article 3.89 du Code civil belge** : toute ACP doit tenir une comptabilité conforme au plan comptable minimum normalisé (PCMN) adapté aux associations de copropriétaires, selon les recommandations de la **Commission des Normes Comptables (CNC/CBN)**.

**Seuils :**
- **ACP de 20 lots ou moins** (hors caves, garages et parkings) : comptabilité **simplifiée** (recettes-dépenses)
- **ACP de plus de 20 lots** : comptabilité **complète** en partie double

Le plan comptable applicable à l'ACP est défini dans le fichier `data/plan-comptable-copro.json`.

## Plan Comptable ACP Belge (CNC/CBN)

### Classe 1 : Fonds propres, provisions et dettes à long terme

| Compte | Libellé |
|--------|---------|
| 100 | Fonds de réserve (art. 3.89 Cc belge) |
| 101 | Fonds de roulement |
| 102 | Provisions pour travaux décidés par l'AG |
| 103 | Avances des copropriétaires |
| 110 | Solde en attente sur travaux et opérations exceptionnelles |
| 112 | Solde en attente sur budget ordinaire |
| 13 | Subventions et subsides reçus |

### Classe 4 : Copropriétaires et tiers

| Compte | Libellé |
|--------|---------|
| 401 | Fournisseurs |
| 411 | Copropriétaires — appels de fonds ordinaires |
| 412 | Copropriétaires — appels de fonds travaux |
| 413 | Copropriétaires — avances |
| 414 | Copropriétaires — fonds de réserve |
| 420 | Personnel |
| 421 | Charges sociales (ONSS) |
| 431 | État (TVA, impôts) |
| 450 | Compte d'attente |
| 459 | Copropriétaires créditeurs |
| 46 | Débiteurs et créditeurs divers |
| 47 | Comptes transitoires |

### Classe 5 : Trésorerie

| Compte | Libellé |
|--------|---------|
| 501 | Compte courant bancaire (fonds ordinaires) |
| 502 | Compte épargne ou compte à terme (fonds de réserve) |
| 503 | Fonds de placement |
| 51 | Caisse |

Le compte séparé du fonds de réserve (compte 502) est **obligatoirement distinct** du compte courant de fonctionnement (art. 3.89 §2 Cc belge).

### Classe 6 : Charges

| Compte | Libellé | Exemples |
|--------|---------|----------|
| 60 | Achats | Fournitures, produits d'entretien |
| 61 | Services et biens divers | Assurance, nettoyage, espaces verts |
| 62 | Rémunérations et services externes | Honoraires syndic, avocat, géomètre |
| 63 | Impôts et taxes | Précompte immobilier (si applicable), taxes communales |
| 64 | Frais de personnel | Concierge, employé d'immeuble (+ cotisations ONSS) |
| 65 | Autres charges de gestion | Frais postaux, fournitures de bureau |
| 66 | Charges financières | Intérêts d'emprunt, frais bancaires |
| 67 | Charges exceptionnelles | Sinistres, contentieux |
| 68 | Dotations aux provisions | Provisions pour travaux futurs |

### Classe 7 : Produits

| Compte | Libellé | Exemples |
|--------|---------|----------|
| 70 | Appels de fonds ordinaires | Quote-part charges courantes |
| 71 | Appels de fonds travaux | Appels pour travaux votés en AG |
| 72 | Produits financiers | Intérêts sur compte épargne |
| 73 | Produits divers | Indemnités assurance, locations parties communes |
| 74 | Subsides et primes | Primes REG (Flandre), Primes Rénov (Bruxelles), primes wallonnes |
| 78 | Reprises de provisions | |

## Écritures Types

### Appel de fonds trimestriel

```
Débit  411 - Copropriétaires (appels fonds ordinaires)    X
Crédit 701 - Appels de fonds ordinaires                       X
```

Ventilation par copropriétaire selon la quote-part (millièmes) et la clé de répartition concernée.

### Paiement d'un copropriétaire

```
Débit  501 - Compte courant bancaire                      X
Crédit 411 - Copropriétaires                                  X
```

### Facture fournisseur

```
Débit  6xx - Charge correspondante                        X
Crédit 401 - Fournisseurs                                     X
```

### Règlement fournisseur

```
Débit  401 - Fournisseurs                                 X
Crédit 501 - Compte courant bancaire                          X
```

### Appel pour travaux votés

```
Débit  412 - Copropriétaires (appels fonds travaux)       X
Crédit 712 - Appels de fonds travaux                          X
```

Ventilation par copropriétaire selon les quotes-parts et l'échéancier voté en AG.

### Cotisation fonds de réserve

```
Débit  414 - Copropriétaires (fonds de réserve)           X
Crédit 100 - Fonds de réserve                                 X
```

Simultanément, virement du montant sur le compte bancaire séparé du fonds de réserve :
```
Débit  502 - Compte épargne (fonds de réserve)            X
Crédit 501 - Compte courant bancaire                          X
```

### Décompte annuel — trop-perçu (avoir)

```
Débit  701 - Appels de fonds ordinaires                   X
Crédit 459 - Copropriétaires créditeurs                       X
```

### Décompte annuel — insuffisance (complément dû)

```
Débit  411 - Copropriétaires (solde débiteur)             X
Crédit 701 - Appels de fonds ordinaires                       X
```

## Clôture Annuelle

### Workflow de clôture

1. Vérifier l'exhaustivité des écritures (toutes les factures enregistrées)
2. Rapprochement bancaire (solde comptable vs relevé bancaire Belfius/ING/BNP/Qonto)
3. Contrôler les comptes copropriétaires (411, 412, 413, 414)
4. Provisions pour charges à payer (factures reçues après clôture)
5. Calcul du décompte (réel vs budget ordinaire voté)
6. Affectation du résultat (report, remboursement, ou appel complémentaire)
7. Préparer les annexes comptables
8. Soumettre les comptes au conseil de gérance (si existant) puis à l'AG

### Annexes Comptables Belges

#### Annexe 1 : État de la trésorerie

Situation des comptes bancaires à la date de clôture :
- Solde compte courant (fonctionnement ordinaire)
- Solde compte épargne (fonds de réserve)
- Total trésorerie disponible

#### Annexe 2 : Compte de résultat global

Toutes les charges et tous les produits de l'exercice :
- Charges de l'exercice par nature (classes 6)
- Produits de l'exercice par nature (classes 7)
- Résultat de l'exercice

#### Annexe 3 : Budget vs réalisé (charges ordinaires)

Comparaison budget voté vs charges réelles :
- Budget voté par poste
- Charges réelles par poste
- Écart (montant et %)
- Explication des écarts significatifs

#### Annexe 4 : Compte travaux et opérations exceptionnelles

Pour chaque opération de travaux votée :
- Montant voté
- Montant engagé
- Montant réglé
- Solde restant

#### Annexe 5 : État des travaux votés non clôturés

Suivi des travaux en cours ou non encore soldés :
- Description de l'opération
- Date du vote et AG de référence
- Budget voté
- État d'avancement
- Montants appelés et versés

## Fonds de Réserve Obligatoire (art. 3.89 Cc belge)

**Montant minimum** : 5% du budget ordinaire voté en AG.

**Compte séparé obligatoire** au nom de l'ACP (distinct du compte de fonctionnement courant).

**Caractéristiques :**
- Le fonds est attaché aux lots (pas au copropriétaire). En cas de vente, la quote-part du fonds de réserve reste acquise à l'ACP.
- L'AG peut voter un taux supérieur à 5%
- L'AG peut décider de suspendre les cotisations si le fonds atteint un niveau jugé suffisant, en motivant cette décision
- Les sommes sont déposées sur un compte bancaire portant intérêt (compte d'épargne ou compte à terme)

## Comptabilité Simplifiée (ACP ≤ 20 lots)

Pour les ACP de 20 lots ou moins, une comptabilité simplifiée est admise. Elle comprend au minimum :
- Un livre de recettes et de dépenses chronologique
- Un état de trésorerie en fin d'exercice
- Un état des dettes et créances (fournisseurs impayés, copropriétaires débiteurs)
- Un état du fonds de réserve (solde initial, cotisations, dépenses, solde final)

Même en comptabilité simplifiée, le fonds de réserve doit être maintenu sur un compte distinct.

## TVA en Copropriété Belge

L'ACP n'est en principe pas assujettie à la TVA pour ses activités courantes (gestion d'un immeuble résidentiel). Cependant :
- Les prestations du syndic professionnel sont soumises à la TVA au taux normal de **21%**
- Les travaux de rénovation sur immeubles de plus de 10 ans peuvent bénéficier du taux réduit de **6% TVA** sous conditions (logements privés, règles SPF Finances)
- Conserver les factures avec TVA correctement ventilée pour le décompte annuel
