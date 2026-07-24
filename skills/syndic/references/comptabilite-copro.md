# Comptabilité de la Copropriété

## Cadre Réglementaire

**Décret n2005-240 du 14 mars 2005** : toute copropriété doit tenir une comptabilité en partie double, selon un plan comptable spécifique.

## Plan Comptable des Copropriétés

### Classe 1 : Provisions, avances, subventions

| Compte | Libellé |
|--------|---------|
| 102 | Provisions pour travaux décidés (art. 14-2 loi 1965) |
| 103 | Avances |
| 105 | Fonds de travaux (cotisations art. 14-2) |
| 110 | Solde en attente sur travaux et opérations exceptionnelles |
| 112 | Solde en attente sur budget prévisionnel |
| 12 | Solde des comptes de gestion |
| 13 | Subventions |

### Classe 4 : Copropriétaires et tiers

| Compte | Libellé |
|--------|---------|
| 401 | Fournisseurs |
| 411 | Copropriétaires : provisions sur opérations courantes |
| 412 | Copropriétaires : provisions sur travaux |
| 413 | Copropriétaires : avances |
| 414 | Copropriétaires : fonds de travaux |
| 420 | Personnel |
| 421 | Charges sociales |
| 431 | État (TVA, impôts) |
| 450 | Compte d'attente |
| 459 | Copropriétaires : créditeurs |
| 46 | Débiteurs et créditeurs divers |
| 47 | Comptes transitoires |

### Classe 5 : Trésorerie

| Compte | Libellé |
|--------|---------|
| 501 | Compte courant (banque) |
| 502 | Livret A syndic |
| 503 | Fonds de placement |
| 51 | Caisse |

### Classe 6 : Charges

| Compte | Libellé | Exemples |
|--------|---------|----------|
| 60 | Achats | Fournitures, produits d'entretien |
| 61 | Services extérieurs | Assurance, nettoyage, espaces verts |
| 62 | Autres services extérieurs | Honoraires syndic, avocat, géomètre |
| 63 | Impôts et taxes | Taxe foncière (si applicable), ordures ménagères |
| 64 | Frais de personnel | Gardien, employé d'immeuble |
| 65 | Autres charges de gestion | Frais postaux, fournitures bureau |
| 66 | Charges financières | Intérêts d'emprunt, frais bancaires |
| 67 | Charges exceptionnelles | Sinistres, contentieux |
| 68 | Dotations amortissements et provisions | Provisions pour impayés |

### Classe 7 : Produits

| Compte | Libellé | Exemples |
|--------|---------|----------|
| 70 | Appels de fonds | Provisions sur charges courantes |
| 71 | Produits liés aux travaux | Appels pour travaux votés |
| 72 | Produits financiers | Intérêts livret, placements |
| 73 | Produits divers | Indemnités d'assurance, locations |
| 74 | Subventions | Aides ANAH, MaPrimeRénov' collectif |
| 78 | Reprises de provisions | |

## Écritures Types

### Appel de fonds trimestriel

```
Débit  411 - Copropriétaires (provisions courantes)    X
Crédit 701 - Provisions sur charges courantes              X
```

Ventilation par copropriétaire selon les tantièmes de la clé de répartition concernée.

### Paiement d'un copropriétaire

```
Débit  501 - Banque                                     X
Crédit 411 - Copropriétaires                                X
```

### Facture fournisseur

```
Débit  6xx - Charge correspondante                      X
Crédit 401 - Fournisseurs                                   X
```

### Règlement fournisseur

```
Débit  401 - Fournisseurs                               X
Crédit 501 - Banque                                         X
```

### Appel pour travaux votés

```
Débit  412 - Copropriétaires (provisions sur travaux)   X
Crédit 702 - Provisions sur travaux et opérations except.    X
```

Ventilation par copropriétaire selon les tantièmes et l'échéancier voté en AG.

### Cotisation fonds de travaux

```
Débit  414 - Copropriétaires (fonds de travaux)         X
Crédit 105 - Fonds de travaux                               X
```

### Régularisation annuelle (trop-perçu)

```
Débit  701 - Provisions sur charges courantes           X
Crédit 459 - Copropriétaires créditeurs                     X
```

### Régularisation annuelle (insuffisance)

```
Débit  411 - Copropriétaires (solde débiteur)           X
Crédit 701 - Provisions sur charges courantes               X
```

## Clôture Annuelle

### Workflow de clôture

1. Vérifier l'exhaustivité des écritures (toutes les factures enregistrées)
2. Rapprochement bancaire (solde comptable vs relevé bancaire)
3. Contrôler les comptes copropriétaires (411, 412, 413, 414)
4. Provisions pour charges à payer (factures reçues après clôture)
5. Calcul de la régularisation (réel vs budget prévisionnel)
6. Affectation du résultat (report, remboursement, ou appel complémentaire)
7. Préparer les 5 annexes comptables obligatoires
8. Soumettre les comptes au conseil syndical puis à l'AG

### Les 5 Annexes Comptables Obligatoires (art. 35-2 décret 1967)

#### Annexe 1 : État financier

Situation de trésorerie au jour de la clôture :
- Soldes bancaires (compte courant, livret, placements)
- Fonds de travaux
- Total trésorerie disponible

#### Annexe 2 : Compte de gestion général

Toutes les charges et tous les produits de l'exercice, hors budget :
- Charges de l'exercice par nature (classes 6)
- Produits de l'exercice par nature (classes 7)
- Résultat de l'exercice

#### Annexe 3 : Compte de gestion pour opérations courantes

Comparaison budget voté vs charges réelles :
- Budget voté par poste
- Charges réelles par poste
- Écart (montant et %)
- Explication des écarts significatifs

#### Annexe 4 : Compte de gestion pour travaux et opérations exceptionnelles

Pour chaque opération de travaux votée :
- Montant voté
- Montant engagé
- Montant réglé
- Solde restant

#### Annexe 5 : État des travaux et opérations exceptionnelles votés non clôturés

Suivi des travaux en cours ou non encore soldés :
- Description de l'opération
- Date du vote et AG de référence
- Budget voté
- État d'avancement
- Montants appelés et versés
