---
name: reviseur-entreprises
metadata:
  last_updated: 2026-05-18
includes:
  - data/**
  - company.example.json
description: |
  Réviseur d'entreprises IA pour l'audit des comptes annuels d'entreprises belges. Applique la démarche
  ISA/ISRS (IRE) en 7 phases : prise de connaissance, contrôle du livre-journal, vérification du bilan,
  du compte de résultat, de la balance, de la déclaration ISOC 275, et contrôles transversaux. Émet une
  opinion motivée sur la fiabilité des comptes avec rapport structuré.

  Triggers: audit, réviseur entreprises, IRE, certification, comptes annuels, validation comptes, révision comptable, statutory audit
---

# Audit — Révision des Comptes Annuels (IRE)

Ce skill reproduit le travail d'un réviseur d'entreprises (RE) pour la validation des comptes annuels d'une société soumise à l'ISOC.

## Contexte réglementaire

- **Normes applicables** : ISA (International Standards on Auditing) + ISRS adoptés par l'IRE (Institut des Réviseurs d'Entreprises)
- **Référentiel comptable** : Plan Comptable Minimum Normalisé (PCMN), avis CNC-CBN
- **Seuils d'obligation RE** (art. 3:72 CSA) : 2 des 3 critères parmi bilan ≥ 4,5M€, CA ≥ 9M€, effectif ≥ 50
- **Schémas de dépôt BNB** : complet (≥ 2 critères grands), abrégé (petites), micro (CA<700k, bilan<350k, effectif<10)

Même sans obligation légale, cet audit apporte une assurance raisonnable sur la fiabilité des comptes.

## Étape préalable : Collecter le contexte (OBLIGATOIRE)

**Ne jamais démarrer l'audit sans les informations minimales.** Si elles manquent, les demander à l'utilisateur avant toute autre action.

Si un fichier `company.json` existe, le lire pour obtenir le contexte automatiquement.

Informations requises :

1. **Identité de l'entreprise** : raison sociale, numéro BCE, forme juridique, régime d'imposition (ISOC/IPP), régime TVA, capital social, adresse
2. **Exercice audité** : date de début, date de fin, durée en jours, premier exercice ou non
3. **Documents disponibles** : livre-journal, bilan, compte de résultat, balance, grand livre, déclaration ISOC 275, relevés bancaires, factures, PV d'assemblée générale, statuts

**Si une information critique manque (BCE, forme juridique, régime fiscal), la demander explicitement.** Ne pas faire de suppositions.

## Programme d'audit

L'audit suit 7 phases séquentielles. Chaque phase produit un livrable et une conclusion.

### Phase 1 : Prise de connaissance et planification (ISA 315)

**Objectif** : Comprendre l'entité et son environnement.

1. Lire les statuts, l'extrait BCE, les PV d'assemblée générale
2. Identifier les opérations significatives de l'exercice
3. Évaluer les risques d'anomalies significatives
4. Définir le seuil de signification (matérialité — ISA 320)

**Seuil de signification recommandé** :
- 5% du résultat courant avant impôts, ou
- 1-2% du chiffre d'affaires pour les petites entités
- Minimum absolu : 500 € pour une micro-entité

**Livrables** : Note de planification, cartographie des risques

### Phase 2 : Contrôle du livre-journal (art. 315 CIR 92)

**Objectif** : Vérifier la conformité et l'intégrité des écritures comptables.

Lire le fichier comptable et vérifier :

1. **Format** : colonnes obligatoires selon le droit comptable belge (CSA, Livre 3)
2. **Équilibre** : Total Débit = Total Crédit (à 0,01 € près)
3. **Numérotation** : séquence continue
4. **Dates** : cohérence dans la période de l'exercice
5. **Comptes** : conformité PCMN (longueurs, racines)
6. **Écritures équilibrées** : chaque écriture a Total Débit = Total Crédit
7. **Pas d'écritures à montant nul** sauf mouvements de lettrage

**Script de contrôle** :
```
Pour chaque écriture :
  - Vérifier total débit = total crédit
  - Vérifier format date AAAAMMJJ
  - Vérifier numéro de compte PCMN valide (classes 1-7)
  - Vérifier pas de montant négatif injustifié
```

### Phase 3 : Contrôle du Bilan

Lire le bilan et vérifier :

**Actif :**
- [ ] Immobilisations = Valeur brute - Amortissements cumulés
- [ ] Amortissements cohérents (linéaire ou dégressif, durée, prorata temporis)
- [ ] Trésorerie = Solde confirmé par relevé bancaire
- [ ] Rapprochement bancaire pour chaque compte

**Passif :**
- [ ] Capital = Statuts (vérifier extrait BCE)
- [ ] Résultat = Résultat net du compte de résultat
- [ ] Compte courant 416/455 : justificatifs de chaque mouvement
- [ ] ISOC à payer = Calcul ISOC vérifié
- [ ] PCA : justification de la quote-part reportée

**Équilibre** :
- [ ] Total Actif = Total Passif (à l'euro près)

### Phase 4 : Contrôle du Compte de Résultat

Lire le compte de résultat et vérifier :

**Produits :**
- [ ] CA = Somme des ventes sur l'exercice (recouper avec les plateformes de paiement)
- [ ] Coupure : CA uniquement sur la période de l'exercice
- [ ] PCA correctement calculés (abonnements annuels chevauchant l'exercice suivant)
- [ ] Produits exceptionnels documentés (cessions, commissions)

**Charges :**
- [ ] Chaque catégorie de charges correspond aux factures et relevés
- [ ] Frais de constitution / engagements société en formation (art. 2:2 CSA) : repris dans les 2 ans et liés à l'activité
- [ ] Amortissements : calcul correct (base, durée, prorata)
- [ ] Charges bureau domicile : quote-part raisonnable et documentée
- [ ] Déductibilité véhicules : limite CO₂ (art. 66 CIR 92)
- [ ] Frais de plateforme : réconciliation avec les relevés

**Résultat :**
- [ ] Résultat d'exploitation = Produits - Charges
- [ ] ISOC = taux × résultat fiscal (vérifier conditions taux réduit PME 20% — art. 215 al. 2 CIR 92)
- [ ] Résultat net = Résultat avant ISOC - ISOC

### Phase 5 : Contrôle de la Balance et du Grand Livre

Lire la balance et le grand livre.

- [ ] Balance équilibrée (total soldes débiteurs = total soldes créditeurs)
- [ ] Concordance balance ↔ bilan (chaque ligne)
- [ ] Concordance balance ↔ compte de résultat
- [ ] Grand livre : sondage sur les écritures significatives
- [ ] Lettrage du compte 400 (Clients)
- [ ] Justification du solde créditeur 400 si anormal

### Phase 6 : Contrôle de la Déclaration ISOC 275

**Schéma complet ou abrégé selon taille :**

**Bilan déposé à la BNB :**
- [ ] Cases renseignées = Bilan comptable (arrondis à l'euro)
- [ ] Actif net = Passif
- [ ] Tableau des immobilisations concordant
- [ ] Tableau des amortissements concordant

**Compte de résultat déposé à la BNB :**
- [ ] Ventilation correcte entre postes
- [ ] Total produits = Total produits comptables
- [ ] Total charges = Total charges comptables

**Déclaration ISOC 275 :**
- [ ] Résultat fiscal = Résultat comptable + réintégrations − déductions
- [ ] ISOC réintégré (art. 198 §1, 1° CIR 92)
- [ ] Dépenses non admises (DNA) correctement identifiées
- [ ] Versements anticipés (VA1-VA4) déduits
- [ ] Taux correct : 25% standard ou 20% PME (art. 215 al. 2 CIR 92)

### Phase 7 : Contrôles transversaux et opinion

**Réconciliation bancaire** :
- [ ] Payouts plateforme = Crédits bancaires identifiés
- [ ] Transferts internes neutralisés

**Contrôle de coupure (cut-off)** :
- [ ] Pas de produits de l'exercice précédent comptabilisés
- [ ] PCA correctement identifiés et calculés
- [ ] Charges payées d'avance : néant ou justifiées

**Conflits d'intérêts (CSA art. 7:96 pour la SA / art. 5:76 pour la SRL)** :
- [ ] Compte courant 416/455 : convention approuvée en AG ou par l'associé unique
- [ ] Taux d'intérêt du compte courant conforme au marché (art. 55 CIR 92)

**Événements postérieurs (ISA 560)** :
- [ ] Revue des opérations entre la clôture et la date d'audit
- [ ] Pas d'événement nécessitant un ajustement des comptes

## Points d'attention récurrents

Pour les petites et moyennes entreprises, notamment les sociétés SaaS :

1. **Solde créditeur du 400 (Clients)** : situation anormale souvent due aux payouts de plateformes de paiement incluant du CA hors exercice. Documenter et justifier.

2. **Cessions d'actifs** : vérifier le traitement (plus-value immunisée art. 47 CIR 92 ou imposable) et le remploi si immunisation demandée.

3. **Commissions d'affiliation** : vérifier la nature (prestation vs affiliation) et le traitement TVA (autoliquidation si prestataire étranger — art. 51 §2 CTVA).

4. **Frais de constitution / engagements société en formation** : vérifier le lien avec l'activité sociale et la reprise dans les 2 ans (art. 2:2 CSA).

5. **Bureau à domicile** : vérifier la surface pro/totale et les justificatifs selon la circulaire AGFisc.

6. **Conversion EUR/devises** : vérifier la cohérence avec les cours BCE de l'exercice.

7. **Déductibilité véhicules** : vérifier la limitation selon les émissions CO₂ (art. 66 CIR 92, tableau progressif depuis 2021).

## Format du rapport d'audit

```markdown
# Rapport de Révision — [Société] — Exercice [dates]

## 1. Opinion
[ ] Sans réserve
[ ] Avec réserve(s) — détailler
[ ] Refus de certifier — motif
[ ] Impossibilité de certifier — motif

## 2. Fondement de l'opinion
[Résumé des travaux effectués et bases de l'opinion — ISA 700]

## 3. Observations
[Points significatifs sans impact sur l'opinion]

## 4. Synthèse des contrôles

| Phase | Conclusion | Anomalies |
|-------|-----------|-----------|
| Livre-journal | ok/attention/ko | ... |
| Bilan | ok/attention/ko | ... |
| Compte de résultat | ok/attention/ko | ... |
| Balance / Grand livre | ok/attention/ko | ... |
| Déclaration ISOC 275 | ok/attention/ko | ... |
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
| `data/pcmn_YYYY.json` | Plan Comptable Minimum Normalisé complet | Vérifier la conformité PCMN des comptes (Phase 2), valider les racines |
| `data/nomenclature-isoc.csv` | Cases de la déclaration ISOC 275 | Contrôler la déclaration (Phase 6), vérifier la ventilation des postes |

**Comment utiliser ces données :**

Pour vérifier la conformité PCMN d'un compte (Phase 2) :
```
Lire data/pcmn_YYYY.json → chercher dans le tableau "flat" par "number"
Vérifier que le numéro de compte existe et que le libellé correspond à l'usage
```

Pour contrôler la déclaration ISOC 275 (Phase 6) :
```
Lire data/nomenclature-isoc.csv → format "code;libellé"
Vérifier que chaque case correspond au bon poste comptable PCMN
```

Le fichier `data/sources.json` liste toutes les sources avec dates de dernière récupération.

## Références

| Fichier | Contenu |
|---------|---------|
| [references/normes-isa-ire.md](references/normes-isa-ire.md) | Normes ISA/ISRS applicables (IRE), seuils de signification, obligations légales |
| [references/procedures-detaillees.md](references/procedures-detaillees.md) | Procédures détaillées par phase d'audit |
