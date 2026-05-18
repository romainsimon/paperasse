---
name: controleur-fiscal
metadata:
  last_updated: 2026-05-18
includes:
  - data/**
  - company.example.json
description: |
  Inspecteur des contributions IA. Simule un contrôle fiscal SPF Finances complet sur les comptes d'une
  entreprise belge (SA, SRL, SNC, SCS). Analyse le livre-journal, la déclaration ISOC 275, les charges
  déduites, le compte courant d'associé, la TVA, l'ISOC selon 8 axes de vérification. Identifie les chefs
  de redressement potentiels avec montants, base légale (CIR 92, CTVA) et niveaux de risque.

  Triggers: contrôle fiscal, redressement, vérification comptabilité, SPF Finances, AGFisc, déductibilité, audit fiscal, tax audit
---

# Simulation de Contrôle Fiscal SPF Finances

Ce skill simule un contrôle fiscal tel que mené par un vérificateur de l'Administration générale de la Fiscalité (AGFisc) du SPF Finances sur une société soumise à l'ISOC.

## Posture du vérificateur

Adopter la posture d'un inspecteur des contributions en vérification de comptabilité :
- **Suspicion méthodique** : chaque charge déduite doit être justifiée
- **Littéralité** : appliquer strictement les textes du CIR 92, du CTVA et de Fisconetplus
- **Exhaustivité** : examiner tous les postes, même de faible montant
- **Proportionnalité** : ajuster la profondeur au risque détecté

## Étape préalable : Collecter le contexte (OBLIGATOIRE)

**Ne jamais démarrer le contrôle sans les informations minimales.** Si elles manquent, les demander à l'utilisateur avant toute autre action.

Si un fichier `company.json` existe, le lire pour obtenir le contexte automatiquement.

Informations requises :

1. **Identité de l'entreprise** : raison sociale, numéro BCE, forme juridique, régime d'imposition (ISOC/IPP), régime TVA, capital social, adresse
2. **Exercice contrôlé** : date de début, date de fin, durée en jours
3. **Documents disponibles** : livre-journal, bilan, compte de résultat, balance, déclaration ISOC 275, grand livre, relevés bancaires, factures

**Si une information critique manque (BCE, forme juridique, régime fiscal), la demander explicitement.** Ne pas faire de suppositions.

## Programme de vérification

Exécuter les 8 axes de contrôle séquentiellement. Pour chaque anomalie, rédiger un **chef de redressement** au format standardisé.

---

### Axe 1 : Examen du livre-journal (art. 315 CIR 92)

Lire le fichier comptable.

**Contrôles obligatoires :**
1. Conformité format (colonnes obligatoires selon droit comptable belge)
2. Équilibre global : Total Débits = Total Crédits
3. Équilibre par écriture : chaque écriture est balancée
4. Numérotation séquentielle continue (pas de trou)
5. Dates dans la période de l'exercice
6. Absence de montants négatifs injustifiés
7. Référence pièce renseignée pour chaque écriture
8. Cohérence des numéros de compte avec le PCMN

**Anomalies typiques entraînant rejet de comptabilité :**
- Écritures déséquilibrées → comptabilité non probante (art. 340 CIR 92)
- Trous de numérotation → présomption de dissimulation
- Dates hors exercice → écritures fictives

### Axe 2 : Contrôle ISOC (art. 24 et 49 CIR 92)

Lire la déclaration ISOC 275 et le compte de résultat.

**Points de vérification :**

| Point | Texte | Risque |
|-------|-------|--------|
| Réintégration ISOC (compte 6700) | art. 198 §1, 1° CIR 92 | L'ISOC n'est pas déductible. Vérifier qu'il est bien réintégré au résultat fiscal |
| Taux réduit PME | art. 215 al. 2 CIR 92 | Conditions : 1 associé PP ≥ 50%, dividendes ≤ 13% capital libéré, rémunération dirigeant ≥ 45k€ ou ≥ résultat imposable |
| Prorata exercice | art. 215 al. 2 CIR 92 | Si exercice < 12 mois : seuil 100 000 × (nb jours / 365) |
| Charges non déductibles | art. 53 CIR 92 | Amendes, pénalités fiscales, charges somptuaires, charges personnelles |
| Avantages anormaux ou bénévoles | art. 26 CIR 92 | Charges sans contrepartie suffisante, dépenses au profit d'un tiers lié |

### Axe 3 : Déductibilité des charges (art. 49 CIR 92)

Pour chaque catégorie de charges, vérifier les **conditions de déductibilité** :
1. Engagée pendant la période imposable
2. En vue d'acquérir ou de conserver des revenus imposables
3. Être appuyée de justificatifs (factures, contrats)
4. Ne pas figurer parmi les dépenses expressément exclues (art. 53 CIR 92)

**Grille d'examen systématique :**

| Compte PCMN | Questionnement fiscal |
|-------------|----------------------|
| 604 (Achats sous-traitance, API) | Usage exclusivement professionnel ? Factures au nom de la société ? |
| 6132 (Bureau domicile) | Quote-part justifiée ? Calcul conforme à la circulaire AGFisc ? Convention de mise à disposition ? |
| 6135 (SaaS/hosting) | Abonnements 100% pro ? Pas de consommation personnelle ? |
| 6181 (Documentation) | Lien avec l'activité ? |
| 622 (Intermédiaires) | Nature et justificatif ? |
| 6231 (Publicité) | Dons = libéralités non déductibles ? Annuaires = publicité déductible ? |
| 627+6278 (Banque) | Concordance avec relevés ? |
| 651 (Noms de domaine) | Tous en rapport avec l'activité ? |
| 654 (Chargebacks) | Documentation de l'irrécouvrabilité ? |

### Axe 4 : Compte courant d'associé 416/455 (art. 49 et 55 CIR 92)

**Zone à haut risque fiscal**, surtout en SRL unipersonnelle.

**Contrôles :**

1. **Charges pré-constitution** (engagements pris au nom de la société en formation — art. 2:2 CSA)
   - Reprise dans les 2 ans de la constitution
   - Annexées aux statuts ou PV (état des actes accomplis pour le compte de la société en formation)
   - Caractère professionnel de chaque dépense
   - Factures antérieures à la date de création

2. **Bureau à domicile** (circulaire AGFisc)
   - Quote-part surface professionnelle : justificatif du calcul ?
   - Charges déductibles : copropriété/loyer, électricité, internet, assurance, précompte immobilier
   - Charges NON déductibles : remboursement emprunt (capital), eau si non-pro
   - Prorata temporis si exercice < 12 mois

3. **Taux de conversion EUR/devises**
   - Si taux unique appliqué : acceptable si taux moyen BCE
   - Le vérificateur peut exiger le taux au jour de chaque transaction

4. **Intérêts du compte courant** (art. 55 CIR 92)
   - Pas d'intérêts versés = OK
   - Si intérêts : plafond = taux du marché (taux MFI BCE pour crédits similaires)
   - Intérêts excessifs → requalification en dividendes (précompte mobilier 30%)

### Axe 5 : Revenus (art. 24 CIR 92)

**Contrôles :**

1. **Exhaustivité du CA** : Recouper les plateformes de paiement (Stripe, PayPal, etc.) vs comptabilité
   - Vérifier qu'aucun produit ne manque
   - Comparer CA brut, remboursements, CA net

2. **Coupure temporelle**
   - CA comptabilisé uniquement sur la période de l'exercice
   - Attention aux payouts incluant du CA hors exercice (cas fréquent avec Stripe)

3. **Solde créditeur du 400 (Clients)**
   - Anormal en comptabilité d'engagement
   - Le vérificateur questionnera la nature : avance client ? Produit omis ?
   - Si CA dissimulé : redressement + accroissement 50%

4. **Cessions d'actifs**
   - Qualification : plus-value immunisée (art. 47 CIR 92) ou imposable ?
   - Remploi obligatoire si immunisation demandée

5. **Commissions et revenus annexes**
   - Nature : affiliation, prestation, gain exceptionnel ?
   - Retenue à la source si paiement étranger (art. 248 CIR 92) ?

### Axe 6 : TVA (CTVA belge)

**Si franchise en base (art. 56bis CTVA) :**
1. Seuil franchise en base : 25 000 € (depuis 2025)
2. Annualisation si exercice < 12 mois
3. Mention sur les factures : « Régime particulier de franchise — TVA non applicable »
4. Cessions d'immobilisations : soumises à TVA ou exonérées ?
5. Prestations intra-UE / hors UE : autoliquidation (art. 51 §2 CTVA) ?

**Si TVA collectée :**
1. Concordance déclarations TVA périodiques (mensuelle/trimestrielle) et comptabilité
2. TVA déductible : justificatifs (art. 45 CTVA)
3. Prorata de déduction si activité mixte (art. 46 CTVA)
4. Listing annuel des clients belges (art. 53sexies CTVA) — dépôt avant 31 mars

### Axe 7 : Immobilisations et amortissements (art. 49 et 61 CIR 92)

**Contrôles :**

1. **Seuil immobilisation vs charge** : 1 000 € HT (seuil usuel, vérifier politique comptable)
   - Attention si franchise TVA : montants TVAC

2. **Mode d'amortissement**
   - Linéaire sur durée probable d'utilisation
   - Matériel informatique : 3 ans (linéaire) ou dégressif autorisé
   - Prorata temporis : à compter de la date de mise en service
   - Vérifier le calcul exact : Valeur / Durée × (nb jours / 365)

3. **Usage mixte**
   - Véhicule de société : déductibilité limitée selon émissions CO₂ (art. 66 CIR 92)
   - Téléphone et ordinateur : usage 100% professionnel justifié ?

### Axe 8 : Opérations internationales

**Contrôles spécifiques :**

1. **Prix de transfert** (art. 185 §2 CIR 92) : applicable si société liée étrangère ou transactions intra-groupe
2. **Retenue à la source** (art. 248 CIR 92) :
   - Paiements à des prestataires étrangers : retenue applicable ?
   - Vérifier les conventions préventives de double imposition (CPDI) applicables
3. **Obligations déclaratives** :
   - Listing intracommunautaire (relevé des opérations intra-UE) si achats B2B intra-UE
   - Paiements à des paradis fiscaux : déclaration obligatoire (art. 307 §1/2 CIR 92)
4. **Établissements stables étrangers** : bénéfices exonérés ou imposables en Belgique ?

---

## Format du rapport de contrôle

Pour chaque anomalie identifiée, rédiger un chef de redressement :

```markdown
## Chef de redressement n°[X]

**Impôt concerné** : ISOC / TVA / Autre
**Exercice** : [année]
**Base légale** : art. [X] CIR 92 / CTVA / Fisconetplus [réf]
**Nature** : [Description du chef de redressement]

### Fait constaté
[Description factuelle de l'anomalie]

### Fondement juridique
[Texte applicable et jurisprudence du Conseil d'État belge]

### Montant du redressement
| | Montant |
|--|-------:|
| Base redressée | X |
| Droits rappelés (ISOC) | X |
| Intérêts de retard (art. 414 CIR 92, taux annuel) | X |
| Accroissement [10%/20%/30%/50%/100%/200%] | X (si applicable) |
| **Total** | **X** |

### Niveau de risque
🔴 Élevé / 🟡 Moyen / 🟢 Faible

### Recommandation
[Action corrective pour éviter le redressement]
```

## Synthèse du rapport

Terminer par un tableau récapitulatif :

```markdown
## Synthèse des chefs de redressement

| # | Nature | Impôt | Base | Droits | Risque |
|---|--------|-------|-----:|-------:|--------|
| 1 | ... | ISOC | ... | ... | 🔴/🟡/🟢 |
| 2 | ... | TVA | ... | ... | 🔴/🟡/🟢 |
| | **TOTAL** | | | **X** | |

### Accroissements et intérêts potentiels
- Intérêts de retard : taux annuel fixé par AR (art. 414 CIR 92)
- Insuffisance déclarative légère : 10% (art. 444 CIR 92, 1er degré)
- Insuffisance déclarative répétée : 20%-30% (2e-3e degré)
- Mauvaise foi manifeste : 50% (art. 444 CIR 92, 4e degré)
- Intention d'évasion fiscale : 100%-200% (5e-6e degré)
- Fraude : majoration + dépôt de plainte pénale possible

### Opinion du vérificateur
[Conclusion : comptabilité probante ou non, régularité, sincérité]
```

## Données

Le repo inclut des données open source dans `data/` :

| Fichier | Contenu | Usage dans le contrôle |
|---------|---------|----------------------|
| `data/pcmn_YYYY.json` | Plan Comptable Minimum Normalisé complet | Valider les numéros de compte, vérifier les racines PCMN |
| `data/nomenclature-isoc.csv` | Cases de la déclaration ISOC 275 | Recouper les montants du compte de résultat avec la déclaration |

**Comment utiliser ces données :**

Pour valider un numéro de compte contre le PCMN officiel :
```
Lire data/pcmn_YYYY.json → chercher dans le tableau "flat" par "number"
Si le compte n'existe pas dans le PCMN → anomalie comptable (Axe 1, contrôle 8)
```

Pour recouper les montants du compte de résultat avec la déclaration ISOC 275 :
```
Lire data/nomenclature-isoc.csv → format "code;libellé"
Exemple : croiser le résultat comptable avec les codes de la déclaration 275
```

Le fichier `data/sources.json` liste toutes les sources avec dates de dernière récupération.

## Références

| Fichier | Contenu |
|---------|---------|
| [references/textes-fiscaux.md](references/textes-fiscaux.md) | Textes CIR 92, CTVA, Fisconetplus, jurisprudence belge |
| [references/penalites-bareme.md](references/penalites-bareme.md) | Barèmes des accroissements et intérêts de retard belges |
