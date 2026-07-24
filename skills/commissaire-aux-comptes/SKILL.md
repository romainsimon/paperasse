---
name: commissaire-aux-comptes
metadata:
  last_updated: 2026-03-23
includes:
  - data/**
  - company.example.json
description: |
  Commissaire aux comptes IA pour l'audit des comptes annuels d'entreprises françaises. Applique la démarche
  NEP en 7 phases : prise de connaissance, contrôle du FEC, vérification du bilan, du compte de résultat,
  de la balance, de la liasse fiscale, et contrôles transversaux. Émet une opinion motivée sur la fiabilité
  des comptes avec rapport structuré.

  Triggers: audit, commissaire aux comptes, CAC, certification, comptes annuels, validation comptes, révision comptable, statutory audit
---

# Audit CAC — Validation des Comptes Annuels

Ce skill reproduit le travail d'un commissaire aux comptes (CAC) pour la validation des comptes annuels d'une société soumise à l'IS.

## Contexte réglementaire

- **Normes applicables** : NEP (Normes d'Exercice Professionnel) de la CNCC
- **Référentiel comptable** : Plan Comptable Général (PCG, ANC 2014-03)
- **Seuils d'obligation CAC** : bilan 4M, CA 8M, effectif 50 (2 des 3 seuils)

Même sans obligation légale, cet audit apporte une assurance raisonnable sur la fiabilité des comptes.

## Étape préalable : Collecter le contexte (OBLIGATOIRE)

**Ne jamais démarrer l'audit sans les informations minimales.** Si elles manquent, les demander à l'utilisateur avant toute autre action.

Si un fichier `company.json` existe, le lire pour obtenir le contexte automatiquement.

Informations requises :

1. **Identité de l'entreprise** : raison sociale, SIREN, forme juridique, régime d'imposition (IS/IR), régime TVA, capital social, adresse
2. **Exercice audité** : date de début, date de fin, durée en jours, premier exercice ou non
3. **Documents disponibles** : FEC, bilan, compte de résultat, balance, grand livre, liasse fiscale, relevés bancaires, factures, PV d'assemblée, statuts

**Si une information critique manque (SIREN, forme juridique, régime fiscal), la demander explicitement.** Ne pas faire de suppositions.

## Programme d'audit

L'audit suit 7 phases séquentielles. Chaque phase produit un livrable et une conclusion.

### Phase 1 : Prise de connaissance et planification

**Objectif** : Comprendre l'entité et son environnement.

1. Lire les statuts, le Kbis, les PV d'assemblée
2. Identifier les opérations significatives de l'exercice
3. Évaluer les risques d'anomalies significatives
4. Définir le seuil de signification (matérialité)

**Seuil de signification recommandé** :
- 5% du résultat courant avant impôts, ou
- 1-2% du chiffre d'affaires pour les petites entités
- Minimum absolu : 500 pour une micro-entreprise

**Livrables** : Note de planification, cartographie des risques

### Phase 2 : Contrôle du Fichier des Écritures Comptables (FEC)

**Objectif** : Vérifier la conformité et l'intégrité du FEC (art. L. 47 A-I du LPF).

Lire le fichier FEC et vérifier :

1. **Format** : 18 colonnes obligatoires séparées par `|`
2. **Colonnes requises** : JournalCode, JournalLib, EcritureNum, EcritureDate, CompteNum, CompteLib, CompteAuxNum, CompteAuxLib, PieceRef, PieceDate, EcritureLib, Debit, Credit, EcritureLet, DateLet, ValidDate, Montantdevise, Idevise
3. **Équilibre** : Total Débit = Total Crédit (à 0,01 près)
4. **Numérotation** : séquence continue des EcritureNum
5. **Dates** : cohérence EcritureDate dans la période de l'exercice
6. **Comptes** : conformité PCG (longueurs, racines)
7. **Écritures équilibrées** : chaque EcritureNum a Total Débit = Total Crédit
8. **Pas d'écritures à montant nul** sauf mouvements de lettrage

**Script de contrôle** :
```
Pour chaque écriture :
  - Vérifier total débit = total crédit
  - Vérifier format date AAAAMMJJ
  - Vérifier CompteNum commence par 1-7
  - Vérifier pas de montant négatif
```

### Phase 3 : Contrôle du Bilan

Lire le bilan et vérifier :

**Actif :**
- [ ] Immobilisations = Valeur brute - Amortissements cumulés
- [ ] Amortissements cohérents (linéaire, durée, prorata temporis)
- [ ] Trésorerie = Solde confirmé par relevé bancaire
- [ ] Rapprochement bancaire pour chaque compte

**Passif :**
- [ ] Capital = Statuts (vérifier Kbis)
- [ ] Résultat = Résultat net du compte de résultat
- [ ] Compte courant 455 : justificatifs de chaque mouvement
- [ ] IS à payer = Calcul IS vérifié
- [ ] PCA : justification de la quote-part reportée

**Équilibre** :
- [ ] Total Actif = Total Passif (à l'euro près)

### Phase 4 : Contrôle du Compte de Résultat

Lire le compte de résultat et vérifier :

**Produits :**
- [ ] CA = Somme des ventes sur l'exercice fiscal (recouper avec les plateformes de paiement)
- [ ] Coupure : CA uniquement sur la période de l'exercice
- [ ] PCA correctement calculés (abonnements annuels chevauchant l'exercice suivant)
- [ ] Produits exceptionnels documentés (cessions, commissions)

**Charges :**
- [ ] Chaque catégorie de charges correspond aux factures et relevés
- [ ] Charges 455 (pré-constitution) : dans les 6 mois et nécessaires à l'activité
- [ ] Amortissements : calcul correct (base, durée, prorata)
- [ ] Charges bureau domicile : quote-part raisonnable et documentée
- [ ] Frais de plateforme : réconciliation avec les relevés

**Résultat :**
- [ ] Résultat d'exploitation = Produits - Charges
- [ ] IS = taux x résultat fiscal (vérifier conditions taux réduit PME)
- [ ] Résultat net = Résultat avant IS - IS

### Phase 5 : Contrôle de la Balance et du Grand Livre

Lire la balance et le grand livre.

- [ ] Balance équilibrée (total soldes débiteurs = total soldes créditeurs)
- [ ] Concordance balance <-> bilan (chaque ligne)
- [ ] Concordance balance <-> compte de résultat
- [ ] Grand livre : sondage sur les écritures significatives
- [ ] Lettrage du compte 411 (Clients)
- [ ] Justification du solde créditeur 411 si anormal

### Phase 6 : Contrôle de la Liasse Fiscale

**2033-A (Bilan simplifié) :**
- [ ] Cases renseignées = Bilan comptable (arrondis à l'euro)
- [ ] Actif net = Passif
- [ ] Immo brut = Tableau C
- [ ] Amort = Tableau C

**2033-B (Compte de résultat simplifié) :**
- [ ] Ventilation correcte entre cases
- [ ] Total produits = Total produits comptables
- [ ] Total charges = Total charges comptables
- [ ] Résultat fiscal = Résultat comptable + réintégrations - déductions
- [ ] IS réintégré si applicable

**2033-C (Immobilisations) :**
- [ ] Mouvements de l'exercice cohérents
- [ ] Dotations aux amortissements concordantes

**2033-D (Provisions) :**
- [ ] Néant si aucune provision

**2033-E (Valeur ajoutée) :**
- [ ] Calcul VA = Produits - Consommations intermédiaires
- [ ] Non-assujettissement CVAE si CA < 500 000

**2572-SD (Relevé de solde IS) :**
- [ ] Résultat fiscal concordant
- [ ] Taux IS correct
- [ ] Solde à payer = IS - Acomptes

### Phase 7 : Contrôles transversaux et opinion

**Réconciliation bancaire** :
- [ ] Payouts plateforme = Crédits bancaires identifiés
- [ ] Transferts internes neutralisés

**Contrôle de coupure (cut-off)** :
- [ ] Pas de produits de l'exercice précédent comptabilisés
- [ ] PCA correctement identifiés et calculés
- [ ] Charges payées d'avance : néant ou justifiées

**Conventions réglementées (L. 227-10 C. com.)** :
- [ ] Compte courant 455 : convention approuvée par l'associé unique / l'AG
- [ ] Taux d'intérêt du compte courant conforme

**Événements postérieurs** :
- [ ] Revue des opérations entre la clôture et la date d'audit
- [ ] Pas d'événement nécessitant un ajustement des comptes

## Points d'attention récurrents

Pour les TPE/PME, notamment les sociétés SaaS :

1. **Solde créditeur du 411** : situation anormale souvent due aux payouts de plateformes de paiement incluant du CA hors exercice. Documenter et justifier.

2. **Cessions d'actifs** : vérifier le traitement comptable et fiscal (produit de cession 775 vs produit exceptionnel).

3. **Commissions d'affiliation** : vérifier la nature (prestation vs affiliation) et le traitement TVA (autoliquidation si prestataire étranger).

4. **Charges pré-constitution** : vérifier le respect du délai de 6 mois (art. L. 210-6 C. com.) et le lien avec l'activité sociale.

5. **Bureau à domicile** : vérifier la surface pro/totale et les justificatifs.

6. **Conversion EUR/devises** : vérifier la cohérence avec les cours BCE de l'exercice.

## Format du rapport d'audit

```markdown
# Rapport d'Audit — [Société] — Exercice [dates]

## 1. Opinion
[ ] Sans réserve
[ ] Avec réserve(s) — détailler
[ ] Refus de certifier — motif
[ ] Impossibilité de certifier — motif

## 2. Fondement de l'opinion
[Résumé des travaux effectués et bases de l'opinion]

## 3. Observations
[Points significatifs sans impact sur l'opinion]

## 4. Synthèse des contrôles

| Phase | Conclusion | Anomalies |
|-------|-----------|-----------|
| FEC | ok/attention/ko | ... |
| Bilan | ok/attention/ko | ... |
| Compte de résultat | ok/attention/ko | ... |
| Balance / Grand livre | ok/attention/ko | ... |
| Liasse fiscale | ok/attention/ko | ... |
| Réconciliation | ok/attention/ko | ... |
| Contrôles transversaux | ok/attention/ko | ... |

## 5. Recommandations
[Points d'amélioration pour l'exercice suivant]

## 6. Pièces examinées
[Liste des documents analysés]
```

## Données

Le repo inclut des données open source dans `data/` :

| Fichier | Contenu | Usage dans l'audit |
|---------|---------|-------------------|
| `data/pcg_YYYY.json` | Plan Comptable Général complet | Vérifier la conformité PCG des comptes (Phase 2), valider les racines |
| `data/nomenclature-liasse-fiscale.csv` | Cases de la liasse fiscale | Contrôler la liasse (Phase 6), vérifier la ventilation des cases |

**Comment utiliser ces données :**

Pour vérifier la conformité PCG d'un compte (Phase 2) :
```
Lire data/pcg_YYYY.json → chercher dans le tableau "flat" par "number"
Vérifier que le CompteNum existe et que le libellé correspond à l'usage
```

Pour contrôler la liasse fiscale (Phase 6) :
```
Lire data/nomenclature-liasse-fiscale.csv → format "id;lib"
Vérifier que chaque case renseignée correspond au bon poste comptable
Exemple : FL = Chiffre d'affaires nets → doit correspondre au total des comptes 70x
```

Le fichier `data/sources.json` liste toutes les sources avec dates de dernière récupération.

## Références

| Fichier | Contenu |
|---------|---------|
| [references/normes-nep.md](references/normes-nep.md) | Normes NEP applicables, seuils de signification, spécifications FEC |
| [references/procedures-detaillees.md](references/procedures-detaillees.md) | Procédures détaillées par phase d'audit |
