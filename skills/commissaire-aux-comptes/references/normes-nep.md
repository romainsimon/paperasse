# Normes NEP applicables à l'audit

## Normes d'Exercice Professionnel (CNCC)

### NEP applicables

| NEP | Titre | Application |
|-----|-------|-------------|
| NEP 200 | Principes applicables à l'audit | Cadre général de la mission |
| NEP 300 | Planification de l'audit | Phase 1 : planification |
| NEP 315 | Connaissance de l'entité et évaluation des risques | Phase 1 : risques |
| NEP 320 | Anomalies significatives et seuil de signification | Matérialité |
| NEP 330 | Procédures d'audit mises en oeuvre | Phases 2-6 |
| NEP 500 | Caractère probant des éléments collectés | Qualité des preuves |
| NEP 505 | Confirmations directes | Confirmation bancaire |
| NEP 520 | Procédures analytiques | Ratios et tendances |
| NEP 530 | Sélection des éléments à contrôler | Échantillonnage |
| NEP 540 | Appréciation des estimations comptables | Amortissements, PCA |
| NEP 560 | Événements postérieurs à la clôture | Phase 7 |
| NEP 570 | Continuité d'exploitation | Évaluation going concern |
| NEP 580 | Déclarations de la direction | Lettre d'affirmation |
| NEP 700 | Rapport du CAC sur les comptes annuels | Format du rapport |
| NEP 9505 | Obligations du CAC en matière de FEC | Contrôle FEC |

## Seuils de signification

### Bases de calcul

| Base | Pourcentage | Justification |
|------|-------------|---------------|
| Résultat courant avant impôts | 5-10% | Base principale |
| Chiffre d'affaires | 0,5-2% | Entité en croissance |
| Total actif | 1-2% | Entité capitalistique |
| Capitaux propres | 2-5% | Entité sous-capitalisée |

### Exemple de calcul

```
Résultat courant : 50 000
-> Seuil à 5% : 2 500
-> Seuil à 10% : 5 000

Chiffre d'affaires : 200 000
-> Seuil à 1% : 2 000
-> Seuil à 2% : 4 000

Recommandation : choisir le seuil le plus pertinent selon le profil de l'entité.
Pour les TPE, un minimum de 500 est raisonnable.

Seuil de remontée (performance materiality) = ~60% du seuil de signification
Seuil de présentation (clairement insignifiant) = ~5% du seuil de signification
```

## Spécificités premier exercice

### Points de vigilance

1. **Pas de comparatif N-1** : impossible de faire des analyses de variation
2. **Durée exercice != 12 mois** : tous les ratios annualisés doivent tenir compte de la durée réelle
3. **Charges pré-constitution** : vérifier la conformité à l'art. L. 210-6 C. com.
4. **Capital social** : vérifier le certificat de dépôt et la libération
5. **Immatriculation** : vérifier la date de RCS vs la date de début d'activité

### Risques spécifiques

| Risque | Impact | Contrôle |
|--------|--------|----------|
| Mélange patrimoine perso/pro | Élevé | Contrôle exhaustif 455 |
| Coupure CA pré/post création | Élevé | Vérification dates plateforme |
| Conversion devises | Moyen | Vérification taux EUR/devises |
| Classification des charges | Moyen | Sondage catégorisation PCG |
| Sous-évaluation PCA | Faible | Revue abonnements annuels |

## Format FEC — Spécifications techniques

### 18 colonnes obligatoires (art. A. 47 A-1 du LPF)

| # | Nom | Type | Obligatoire | Description |
|---|-----|------|-------------|-------------|
| 1 | JournalCode | AN | Oui | Code journal |
| 2 | JournalLib | AN | Oui | Libellé journal |
| 3 | EcritureNum | AN | Oui | N° écriture (séquentiel) |
| 4 | EcritureDate | Date | Oui | AAAAMMJJ |
| 5 | CompteNum | AN | Oui | N° de compte PCG |
| 6 | CompteLib | AN | Oui | Libellé du compte |
| 7 | CompteAuxNum | AN | Non | N° auxiliaire |
| 8 | CompteAuxLib | AN | Non | Libellé auxiliaire |
| 9 | PieceRef | AN | Oui | Référence pièce justificative |
| 10 | PieceDate | Date | Oui | Date pièce justificative |
| 11 | EcritureLib | AN | Oui | Libellé écriture |
| 12 | Debit | Num | Oui | Montant débit (virgule décimale) |
| 13 | Credit | Num | Oui | Montant crédit (virgule décimale) |
| 14 | EcritureLet | AN | Non | Lettrage |
| 15 | DateLet | Date | Non | Date lettrage |
| 16 | ValidDate | Date | Oui | Date validation |
| 17 | Montantdevise | Num | Non | Montant en devise |
| 18 | Idevise | AN | Non | Code devise ISO |

### Contrôles automatisés

```
Vérification 1 : Nombre de colonnes par ligne = 18
Vérification 2 : total col.12 (Debit) = total col.13 (Credit)
Vérification 3 : Pour chaque EcritureNum unique, total Debit = total Credit
Vérification 4 : col.4 (EcritureDate) dans la période de l'exercice
Vérification 5 : col.12 >= 0 ET col.13 >= 0 (pas de montants négatifs)
Vérification 6 : col.5 commence par [1-7]
Vérification 7 : col.9 (PieceRef) non vide
```

## Obligations post-audit

### Documents à produire

1. **Rapport d'audit** : opinion + fondement + observations
2. **Lettre de recommandations** : points d'amélioration
3. **Feuilles de travail** : documentation des contrôles effectués

### Archivage

- Durée de conservation du dossier de travail : 10 ans (art. R. 823-10 C. com.)
- Le FEC doit être conservé 6 exercices + année en cours
