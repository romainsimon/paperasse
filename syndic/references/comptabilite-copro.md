# Comptabilité de la Copropriété

## Cadre Réglementaire

**Décret n° 2005-240 du 14 mars 2005** : toute copropriété tient une comptabilité en partie double, selon un plan comptable qui lui est propre.

**Arrêté du 14 mars 2005, article 7** : fixe la nomenclature des comptes (texte en vigueur depuis le 31/12/2020) :
https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000042413155

**Article 8** : la nomenclature est **fermée**. Les classes de comptes et comptes de l'article 7 sont les seuls utilisables par le syndic, et le plan comptable général ne peut pas servir à les détailler. Si ces comptes ne suffisent pas au syndicat pour enregistrer distinctement toutes ses opérations, il peut ouvrir **toute subdivision nécessaire** : un sous-compte n'est donc pas, à lui seul, hors nomenclature. Les sous-comptes 450-1 à 450-5 s'ouvrent sur décision d'assemblée générale.
https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000006501225

**Article 10** : fonctionnement des comptes (102, 105, 12, 49, etc.) :
https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000033850574

Ce n'est pas le plan comptable général. Les numéros ne se recoupent pas : en copropriété le copropriétaire est au 450 et non au 411, et le 671 est le compte des travaux votés, non celui des créances irrécouvrables.

## Plan Comptable des Copropriétés

Libellés adaptés de l'article 7 : l'intitulé du groupe est ajouté quand le libellé seul est ambigu (« Fournisseurs : factures parvenues »). Le texte exact de chaque libellé, et l'intitulé de chaque groupe, sont dans `data/plan-comptable-copro.json`.

### Classe 1 : Provisions, avances, subventions et emprunts

| Compte | Libellé |
|--------|---------|
| 102 | Provisions pour travaux décidés |
| 103 | Avances |
| 1031 | Avances de trésorerie |
| 1033 | Autres avances |
| 105 | Fonds de travaux (art. 14-2-1 de la loi) |
| 106 | Provisions pour travaux au titre de la délégation de pouvoirs accordée au conseil syndical (art. 21-1 de la loi) |
| 12 | Solde en attente sur travaux et opérations exceptionnelles |
| 12-1 | Solde en attente : travaux décidés par l'assemblée générale |
| 12-2 | Solde en attente : travaux délégués au conseil syndical (art. 21-1 de la loi) |
| 131 | Subventions accordées en instance de versement |

Le 1032 figure à l'article 7 avec la seule mention « (Supprimé) » : il n'est plus utilisable.

### Classe 4 : Copropriétaires et tiers

| Compte | Libellé |
|--------|---------|
| 401 | Fournisseurs : factures parvenues |
| 408 | Fournisseurs : factures non parvenues |
| 409 | Fournisseurs débiteurs |
| 421 | Personnel : rémunérations dues |
| 431 | Sécurité sociale |
| 432 | Autres organismes sociaux |
| 441 | Etat et autres organismes : subventions à recevoir |
| 442 | Etat : impôts et versements assimilés |
| 443 | Collectivités territoriales : aides |
| **450** | **Copropriétaire individualisé** |
| 450-1 | Copropriétaire : budget prévisionnel |
| 450-2 | Copropriétaire : travaux de l'article 14-2 de la loi et opérations exceptionnelles |
| 450-3 | Copropriétaire : avances |
| 450-4 | Copropriétaire : emprunts |
| 450-5 | Copropriétaire : fonds de travaux |
| 459 | Copropriétaire : créances douteuses |
| 461 | Débiteurs divers |
| 462 | Créditeurs divers |
| 471 | Compte en attente d'imputation débiteur |
| 472 | Compte en attente d'imputation créditeur |
| 486 | Charges payées d'avance |
| 487 | Produits encaissés d'avance |
| 491 | Dépréciation des comptes de tiers : copropriétaires |
| 492 | Dépréciation des comptes de tiers : personnes autres que les copropriétaires |

Quatre pièges. Le compte du copropriétaire est le **450**, pas le 411 : les comptes 411 à 414 appartiennent au plan comptable général et n'existent pas ici. Les **comptes d'attente sont les 471 et 472**, le 450 n'en est pas un. Les subdivisions 450-1 à 450-5 ne s'ouvrent que **sur décision d'assemblée générale**. La classe 48 s'arrête au 487 : il n'existe ni 488 ni 489.

### Classe 5 : Comptes financiers

| Compte | Libellé |
|--------|---------|
| 501 | Fonds placés : compte à terme |
| 502 | Fonds placés : autre compte |
| 512 | Banques |
| 514 | Chèques postaux |
| 53 | Caisse |

Le compte bancaire courant du syndicat est au **512**, pas au 501 : le 501 est un compte à terme, et les 501 et 502 sont les fonds placés. Les cotisations au fonds de travaux sont versées sans délai sur un compte séparé rémunéré au nom du syndicat (art. 18 II et 14-2-1 de la loi).

### Classe 6 : Comptes de charges

Les comptes 60 à 66 portent les **charges courantes** couvertes par le budget prévisionnel (art. 14-1, I de la loi), à une exception près : l'annuité d'emprunt est appelée à part, au débit du 450 (ou du 450-4 s'il a été créé) par le crédit du 704, puis payée au débit du 661 (art. 10). Les comptes 67 portent les opérations **hors budget prévisionnel** (art. 14-1, II) : travaux décidés par l'assemblée générale (671), travaux urgents que le syndic peut faire exécuter de sa propre initiative pour la sauvegarde de l'immeuble (672, art. 18 I), études techniques (673), travaux délégués au conseil syndical (674), puis pertes sur créances irrécouvrables et charges exceptionnelles (677, 678). Les libellés officiels du 450-2 et du 702 citent encore l'ancien article 14-2 : on les garde tels quels, mais la base légale à citer est l'article 14-1, II. La distinction commande la base légale, l'appel de fonds, la clé de répartition et l'annexe : ne jamais loger l'un dans l'autre.

| Compte | Libellé |
|--------|---------|
| 601 | Eau |
| 602 | Electricité |
| 603 | Chauffage, énergie et combustibles |
| 604 | Achats produits d'entretien et petits équipements |
| 605 | Matériel |
| 606 | Fournitures |
| 611 | Nettoyage des locaux |
| 612 | Locations immobilières |
| 613 | Locations mobilières |
| 614 | Contrats de maintenance |
| 615 | Entretien et petites réparations |
| 616 | Primes d'assurances |
| 621 | Rémunérations du syndic sur gestion copropriété |
| 6211 | Rémunération du syndic |
| 6212 | Débours |
| 6213 | Frais postaux |
| 622 | Autres honoraires du syndic |
| 6221 | Honoraires travaux |
| 6222 | Prestations particulières |
| 6223 | Autres honoraires |
| 623 | Rémunérations de tiers intervenants |
| 624 | Frais du conseil syndical |
| 632 | Taxe de balayage |
| 633 | Taxe foncière |
| 634 | Autres impôts et taxes |
| 641 | Salaires |
| 642 | Charges sociales et organismes sociaux |
| 643 | Taxe sur les salaires |
| 644 | Autres (médecine du travail, mutuelles, etc.) |
| 65 | Montant spécifique alloué au conseil syndical, au sein du budget prévisionnel, pour sa délégation de pouvoirs (art. 21-1 de la loi) |
| 661 | Remboursement d'annuités d'emprunt |
| 662 | Autres charges financières et agios |
| **671** | **Travaux décidés par l'assemblée générale** |
| 672 | Travaux urgents |
| 673 | Etudes techniques, diagnostic, consultation |
| 674 | Travaux délégués au conseil syndical (art. 21-1 de la loi) |
| 677 | Pertes sur créances irrécouvrables |
| 678 | Charges exceptionnelles |
| 68 | Dotations aux dépréciations sur créances douteuses |

Des travaux non clôturés en fin d'exercice ne sont pas une anomalie, mais leur solde ne reste pas simplement dans les comptes 67 et 70. L'article 10 le fait passer par le **compte 12** : en fin d'exercice, le 12 est débité par le crédit des comptes de charges pour travaux et crédité par le débit des comptes de produits sur travaux ; les deux écritures sont contrepassées à l'ouverture de l'exercice suivant. Le détail du 12 figure à l'annexe 5, son solde est repris à l'annexe 1 (état financier).

### Classe 7 : Comptes de produits

| Compte | Libellé |
|--------|---------|
| 701 | Provisions sur opérations courantes |
| 702 | Provisions sur travaux du I de l'article 14-2 et opérations exceptionnelles |
| 703 | Avances |
| 704 | Remboursements d'annuités d'emprunts |
| 705 | Affectation du fonds de travaux |
| 706 | Provisions au titre de la délégation de pouvoirs accordée au conseil syndical (art. 21-1 de la loi) |
| 706-1 | Provisions sur opérations courantes |
| 706-2 | Provisions sur travaux et opérations exceptionnelles |
| 711 | Subventions |
| 712 | Emprunts |
| 713 | Indemnités d'assurances |
| 714 | Produits divers (dont intérêts légaux dus par les copropriétaires) |
| 716 | Produits financiers |
| 718 | Produits exceptionnels |
| 78 | Reprises de dépréciations sur créances douteuses |

Le **701 reçoit l'appel de charges courantes**. Pour les travaux, l'appel ne passe pas directement en produit : il crédite le **102** « Provisions pour travaux décidés », puis le 102 est soldé vers le **702** au fur et à mesure de la réalisation des travaux (art. 10). Le 702 constate donc le produit au rythme des travaux, en face des charges du 67.

## Écritures Types

Le copropriétaire est au **450**. Si l'assemblée générale a créé les sous-comptes, on utilise celui qui correspond à l'appel (450-1 budget, 450-2 travaux, 450-4 emprunts, 450-5 fonds de travaux) : l'article 10 vise « le compte 450 [...] ou, s'il a été créé, le sous-compte ». Les écritures ci-dessous montrent les sous-comptes ; sans eux, remplacer 450-x par 450.

### Appel de fonds trimestriel (charges courantes, art. 14-1, I)

```
Débit  450-1 - Copropriétaire, budget prévisionnel       X
Crédit 701   - Provisions sur opérations courantes           X
```

Ventilation par copropriétaire selon les tantièmes de la clé de répartition concernée.

### Paiement d'un copropriétaire

```
Débit  512   - Banques                                   X
Crédit 450-1 - Copropriétaire, budget prévisionnel           X
```

### Facture fournisseur

```
Débit  6xx - Charge correspondante                       X
Crédit 401 - Fournisseurs, factures parvenues                X
```

La facture est enregistrée au débit du compte de charge par le crédit du 401, puis la charge est répartie entre les copropriétaires selon la clé applicable. Un crédit ultérieur sur un compte 6xx (avoir, refacturation, imputation à un copropriétaire) n'est pas forcément une annulation : lire la contrepartie avant de le qualifier.

### Appel pour travaux votés (art. 14-1, II)

```
Débit  450-2 - Copropriétaire, travaux et op. except.    X
Crédit 102   - Provisions pour travaux décidés               X
```

Ventilation selon les tantièmes et l'échéancier voté en AG. L'article 10 prévoit que le 102 est crédité des provisions appelées par le débit du 450, ou du 450-2 s'il a été ouvert.

### Réalisation des travaux votés

```
Débit  671 - Travaux décidés par l'assemblée générale    X
Crédit 401 - Fournisseurs, factures parvenues                X

Débit  102 - Provisions pour travaux décidés             X
Crédit 702 - Provisions sur travaux et op. except.           X
```

La seconde écriture suit l'avancement des travaux : le 102 est débité par le crédit du 702 au fur et à mesure de leur réalisation (art. 10).

### Cotisation au fonds de travaux (art. 14-2-1)

```
Débit  450-5 - Copropriétaire, fonds de travaux          X
Crédit 105   - Fonds de travaux                              X
```

Le fonds est attaché au lot et non à la personne : en cas de vente, les cotisations restent acquises au syndicat. Quand l'assemblée générale affecte le fonds à des travaux, le 105 est débité par le crédit du **705** « Affectation du fonds de travaux » (art. 10).

### Régularisation annuelle (trop-perçu)

```
Débit  701   - Provisions sur opérations courantes       X
Crédit 450-1 - Copropriétaire, budget prévisionnel           X
```

Les excédents ou insuffisances sur opérations courantes sont répartis entre les copropriétaires à l'arrêté des comptes, selon les quotes-parts de chaque lot (décret n° 2005-240, art. 8).

### Régularisation annuelle (insuffisance)

```
Débit  450-1 - Copropriétaire, budget prévisionnel       X
Crédit 701   - Provisions sur opérations courantes           X
```

### Créance douteuse, puis irrécouvrable

```
Débit  459 - Copropriétaire, créances douteuses          X
Crédit 450 - Copropriétaire individualisé                    X

Débit  68  - Dotations aux dépréciations sur créances douteuses   X
Crédit 491 - Copropriétaires (dépréciation des comptes de tiers)      X
```

Pour le 491, le montant à déprécier résulte de la décision de l'assemblée générale de procéder à la saisie immobilière (art. 10). Quand la dépréciation n'a plus d'objet, le 49 est débité par le crédit du **78** (art. 10).

Si la créance est définitivement perdue, la perte va au **677** « Pertes sur créances irrécouvrables », pas au 671 :

```
Débit  677 - Pertes sur créances irrécouvrables          X
Crédit 459 - Copropriétaire, créances douteuses              X

Débit  491 - Copropriétaires (dépréciation des comptes de tiers)   X
Crédit 78  - Reprises de dépréciations sur créances douteuses          X
```

La seconde écriture reprend la dépréciation devenue sans objet.

## Clôture Annuelle

### Workflow de clôture

1. Vérifier l'exhaustivité des écritures (toutes les factures enregistrées)
2. Rapprochement bancaire (solde comptable vs relevé bancaire)
3. Contrôler les comptes copropriétaires (450 et, s'ils ont été créés, ses sous-comptes 450-1 à 450-5)
4. Factures non parvenues : charges de l'exercice dont la facture arrive après la clôture, au 408
5. Calcul de la régularisation (réel vs budget prévisionnel)
6. Répartition des excédents ou insuffisances sur opérations courantes entre les copropriétaires, à l'arrêté des comptes (décret n° 2005-240, art. 8)
7. Préparer les 5 annexes comptables obligatoires
8. Soumettre les comptes au conseil syndical puis à l'AG

### Les 5 Annexes Comptables Obligatoires (décret n° 2005-240, art. 8 et annexes n° 1 à 5)

Les comptes sont présentés selon les modèles obligatoires des annexes n° 1 à 5 du décret : https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000006239516. L'art. 35-2 du décret de 1967 porte sur les avis d'appel de fonds, pas sur les annexes.

#### Annexe 1 : État financier

Présente l'état des créances et des dettes du syndicat et la situation de trésorerie à la clôture, avec le montant des emprunts restant dus (décret n° 2005-240, art. 8). Le solde du compte 12 y est repris (arrêté, art. 10).

#### Annexe 2 : Compte de gestion général

Présente les charges et les produits de l'exercice : il comprend le compte de gestion pour opérations courantes et le compte de gestion pour travaux et opérations exceptionnelles (décret n° 2005-240, art. 8).

#### Annexe 3 : Compte de gestion pour opérations courantes

Charges et produits des opérations courantes de l'exercice, présentés face au budget prévisionnel voté, selon le modèle de l'annexe n° 3. Les écarts significatifs se commentent pour l'assemblée.

#### Annexe 4 : Compte de gestion pour travaux et opérations exceptionnelles

Charges et produits des travaux et opérations exceptionnelles de l'exercice, opération par opération, selon le modèle de l'annexe n° 4.

#### Annexe 5 : État des travaux et opérations exceptionnelles votés non clôturés

Fait apparaître en fin d'exercice le réalisé et le prévisionnel de chaque opération non clôturée (décret n° 2005-240, art. 8), avec le détail du compte 12 (arrêté, art. 10).

Les modèles des annexes ne sont pas reproduits sur Légifrance : se reporter aux annexes du décret n° 2005-240 au Journal officiel, dans leur version modifiée (l'annexe n° 1 l'a été par le décret n° 2020-1229 du 7 octobre 2020, en vigueur le 31/12/2020, pour le compte 106 : https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000042412731).
