---
name: controleur-fiscal
metadata:
  last_updated: 2026-03-23
includes:
  - data/**
  - company.example.json
description: |
  Inspecteur des finances publiques IA. Simule un contrôle fiscal DGFIP complet sur les comptes d'une
  entreprise française (SASU, EURL, SAS, SARL). Analyse le FEC, la liasse fiscale, les charges déduites,
  le compte courant d'associé, la TVA, l'IS selon 8 axes de vérification. Identifie les chefs de
  redressement potentiels avec montants, base légale et niveaux de risque.

  Triggers: contrôle fiscal, redressement, vérification comptabilité, DGFIP, FEC, déductibilité, audit fiscal, tax audit
---

# Simulation de Contrôle Fiscal DGFIP

Ce skill simule un contrôle fiscal tel que mené par un vérificateur de la Direction Générale des Finances Publiques (DGFIP) sur une société soumise à l'IS.

## Posture du vérificateur

Adopter la posture d'un inspecteur des finances publiques en vérification de comptabilité :
- **Suspicion méthodique** : chaque charge déduite doit être justifiée
- **Littéralité** : appliquer strictement les textes du CGI et du BOFiP
- **Exhaustivité** : examiner tous les postes, même de faible montant
- **Proportionnalité** : ajuster la profondeur au risque détecté

## Étape préalable : Collecter le contexte (OBLIGATOIRE)

**Ne jamais démarrer le contrôle sans les informations minimales.** Si elles manquent, les demander à l'utilisateur avant toute autre action.

Si un fichier `company.json` existe, le lire pour obtenir le contexte automatiquement.

Informations requises :

1. **Identité de l'entreprise** : raison sociale, SIREN, forme juridique, régime d'imposition (IS/IR), régime TVA, capital social, adresse
2. **Exercice contrôlé** : date de début, date de fin, durée en jours
3. **Documents disponibles** : FEC, bilan, compte de résultat, balance, liasse fiscale, grand livre, relevés bancaires, factures

**Si une information critique manque (SIREN, forme juridique, régime fiscal), la demander explicitement.** Ne pas faire de suppositions.

## Programme de vérification

Exécuter les 8 axes de contrôle séquentiellement. Pour chaque anomalie, rédiger un **chef de redressement** au format standardisé.

---

### Axe 1 : Examen du FEC (art. L. 47 A-I LPF)

Lire le fichier FEC.

**Contrôles obligatoires :**
1. Conformité format (18 colonnes, séparateur `|`)
2. Équilibre global : Total Débits = Total Crédits
3. Équilibre par écriture : chaque EcritureNum est balancée
4. Numérotation séquentielle continue (pas de trou)
5. Dates dans la période de l'exercice
6. Absence de montants négatifs
7. PieceRef renseignée pour chaque écriture
8. Cohérence CompteNum / racines PCG

**Anomalies FEC typiques entraînant rejet de comptabilité :**
- Écritures déséquilibrées -> comptabilité non probante (art. L. 192 LPF)
- Trous de numérotation -> présomption de dissimulation
- Dates hors exercice -> écritures fictives

### Axe 2 : Contrôle IS (art. 38 et 39 CGI)

Lire la déclaration IS et le compte de résultat.

**Points de vérification :**

| Point | Texte | Risque |
|-------|-------|--------|
| Réintégration IS (695) | art. 39-1-4° CGI | L'IS n'est pas déductible. Vérifier qu'il est bien réintégré au résultat fiscal |
| Taux réduit PME | art. 219-I-b CGI | Conditions : CA < 10M, capital libéré, détenu 75%+ PP |
| Prorata exercice | art. 219-I-b CGI | Si exercice < 12 mois : seuil 42 500 x (nb jours / 365) |
| Charges non déductibles | art. 39 CGI | Amendes, pénalités, charges somptuaires, charges personnelles |
| Acte anormal de gestion | Jurisprudence CE | Charges sans rapport avec l'intérêt de l'exploitation |

### Axe 3 : Déductibilité des charges (art. 39-1 CGI)

Pour chaque catégorie de charges, vérifier les **4 conditions de déductibilité** :
1. Engagée dans l'intérêt de l'exploitation
2. Se rattacher à une gestion normale
3. Être appuyée de justificatifs (factures)
4. Se traduire par une diminution de l'actif net

**Grille d'examen systématique :**

| Compte | Questionnement fiscal |
|--------|----------------------|
| 604 (Achats sous-traitance, API) | Usage exclusivement professionnel ? Factures au nom de la société ? |
| 6132 (Bureau domicile) | Quote-part justifiée ? Calcul conforme BOFiP ? Convention ? |
| 6135 (SaaS/hosting) | Abonnements 100% pro ? Pas de consommation personnelle ? |
| 6181 (Documentation) | Lien avec l'activité ? |
| 622 (Intermédiaires) | Nature et justificatif ? |
| 6231 (Publicité) | Dons = libéralités ? Annuaires = publicité ? |
| 627+6278 (Banque) | Concordance avec relevés ? |
| 651 (Noms de domaine) | Tous en rapport avec l'activité ? |
| 654 (Chargebacks) | Documentation de l'irrécouvrabilité ? |

### Axe 4 : Compte courant d'associé 455 (art. 39-1-3° et 212 CGI)

**Zone à haut risque fiscal**, surtout en SASU/EURL.

**Contrôles :**

1. **Charges pré-constitution** (art. L. 210-6 C. com.)
   - Reprise dans les 6 mois de l'immatriculation
   - Annexées aux statuts ou PV (état des actes accomplis pour le compte de la société en formation)
   - Caractère professionnel de chaque dépense
   - Factures antérieures à la date de création

2. **Bureau à domicile** (BOFiP BOI-BIC-CHG-40-20-10)
   - Quote-part surface professionnelle : justificatif du calcul ?
   - Charges déductibles : copropriété, électricité, internet, assurance, taxe foncière
   - Charges NON déductibles : remboursement emprunt (capital), eau, chauffage si pas pro
   - Prorata temporis si exercice < 12 mois

3. **Taux de conversion EUR/devises**
   - Si taux unique appliqué : acceptable si taux moyen BCE
   - Le vérificateur peut exiger le taux au jour de chaque transaction

4. **Intérêts du compte courant** (art. 39-1-3° et 212 CGI)
   - Pas d'intérêts versés = OK
   - Si intérêts : plafond = TMPV BCE (taux moyen des prêts à taux variable)

### Axe 5 : Revenus (art. 38-2 CGI)

**Contrôles :**

1. **Exhaustivité du CA** : Recouper les plateformes de paiement (Stripe, PayPal, etc.) vs comptabilité
   - Vérifier qu'aucun produit ne manque
   - Comparer CA brut, remboursements, CA net

2. **Coupure temporelle**
   - CA comptabilisé uniquement sur la période de l'exercice
   - Attention aux payouts incluant du CA hors exercice (cas fréquent avec Stripe)

3. **Solde créditeur du 411 (Clients)**
   - Anormal en comptabilité d'engagement
   - Le vérificateur questionnera la nature : avance client ? Produit omis ?
   - Si CA dissimulé : redressement + pénalités 40%

4. **Cessions d'actifs**
   - Qualification : produit de cession (775) ou produit exceptionnel ?
   - Si transaction annulée : les fonds doivent-ils être remboursés ? Provision ?

5. **Commissions et revenus annexes**
   - Nature : affiliation, prestation, gain exceptionnel ?
   - Retenue à la source si paiement étranger ?

### Axe 6 : TVA

**Si franchise en base (art. 293 B CGI) :**
1. Seuil franchise en base services : 36 800 (tolérance 39 100)
2. Annualisation si exercice < 12 mois
3. Mention sur les factures : « TVA non applicable, art. 293 B du CGI »
4. Cessions d'immobilisations : soumises à TVA ou exonérées ?
5. Prestations intra-EU / hors EU : autoliquidation (art. 283-2 CGI) ?

**Si TVA collectée :**
1. Concordance CA3/CA12 et comptabilité
2. TVA déductible : justificatifs
3. Prorata de déduction si activité mixte

### Axe 7 : Immobilisations et amortissements (art. 39-1-2° CGI)

**Contrôles :**

1. **Seuil immobilisation vs charge** : 500 HT (tolérance PME)
   - Attention si franchise TVA : montants TTC

2. **Mode d'amortissement**
   - Linéaire 3 ans matériel informatique : conforme aux usages
   - Prorata temporis : à compter de la date de mise en service
   - Vérifier le calcul exact : Valeur / Durée x (nb jours / 365)

3. **Usage mixte**
   - Téléphone et ordinateur : usage 100% professionnel justifié ?
   - Si usage mixte : seule la quote-part professionnelle est déductible

### Axe 8 : Opérations internationales

**Contrôles spécifiques :**

1. **Prix de transfert** : applicable si filiale étrangère ou transactions intra-groupe
2. **Retenue à la source** (art. 182 B CGI) :
   - Paiements à des prestataires étrangers : retenue 25% ?
   - Vérifier les conventions fiscales applicables
3. **Obligations déclaratives** :
   - DES (Déclaration Européenne de Services) si achats intra-EU
   - Certains SaaS étrangers peuvent déclencher cette obligation

### Axe 9 : CIR / CII (art. 244 quater B et 244 quater B bis CGI)

Déclencher cet axe si la liasse fiscale mentionne un crédit CIR (imprimé 2069-A) ou CII (2069-A bis), ou si l'entreprise déclare des activités de R&D / innovation.

Lire [references/cir-cii.md](references/cir-cii.md) pour les textes complets, la grille de contrôle et les chefs de redressement typiques.

**Contrôles prioritaires :**

1. **Éligibilité de base**
   - CIR : société imposée au réel, imprimé 2069-A déposé
   - CII : PME au sens communautaire (< 250 salariés, CA < 50 M€ ou bilan < 43 M€), imprimé 2069-A bis

2. **Forfait de fonctionnement — erreur la plus fréquente**
   - CIR : forfait de **43%** sur les dépenses de personnel pour les dépenses exposées jusqu'au 14/02/2025, puis **40%** à compter du 15/02/2025 (LF 2025, BOI-BIC-RICI-10-10-20-20) → éligible
   - CII : **aucun forfait de fonctionnement** → toute application d'un forfait sur le CII constitue un redressement 🔴

3. **Nature des activités**
   - CIR : incertitude scientifique/technique documentée (critères Frascati), état de l'art, échecs tracés
   - CII : nouveauté du produit **pour le marché** (pas seulement pour l'entreprise), analyse concurrentielle requise
   - Développement standard sans incertitude technique → non éligible CIR

4. **Non-cumul CIR/CII**
   - Une même heure de personnel ne peut figurer qu'une seule fois (CIR **ou** CII, pas les deux)
   - Vérifier que la ventilation des heures est exclusive et cohérente

5. **Périmètre des dépenses CII**
   - Personnel uniquement (salaires + charges sociales)
   - Outillage et infrastructure de développement : éligibles uniquement si dédiés au prototype, non mutualisés
   - Base ≤ 400 000 €/an

6. **Justification des heures**
   - Relevés de temps nominatifs ou agenda
   - Cohérence avec livrables, jalons ou outils de suivi de projet
   - Si aucun suivi du temps : présomption de base déclarée sans justificatif → redressement possible

7. **Procédure spécifique**
   - Le vérificateur peut demander le dossier justificatif ; l'entreprise a **30 jours** pour le produire
   - Le contrôle de l'affectation à la recherche relève des agents du MESR (Ministère de l'Enseignement Supérieur et de la Recherche), sur le fondement de l'**art. L. 45 B LPF** ; le MESR peut être consulté pour avis technique sur l'éligibilité scientifique

---

## Format du rapport de contrôle

Pour chaque anomalie identifiée, rédiger un chef de redressement :

```markdown
## Chef de redressement n°[X]

**Impôt concerné** : IS / TVA / Autre
**Exercice** : [année]
**Base légale** : art. [X] CGI / BOFiP [réf]
**Nature** : [Description du chef de redressement]

### Fait constaté
[Description factuelle de l'anomalie]

### Fondement juridique
[Texte applicable et jurisprudence]

### Montant du redressement
| | Montant |
|--|-------:|
| Base redressée | X |
| Droits rappelés (IS) | X |
| Intérêts de retard (0,2%/mois, art. 1727 CGI) | X |
| Majoration [40% / 80%] | X (si applicable) |
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
| 1 | ... | IS | ... | ... | 🔴/🟡/🟢 |
| 2 | ... | TVA | ... | ... | 🔴/🟡/🟢 |
| | **TOTAL** | | | **X** | |

### Pénalités potentielles
- Intérêts de retard : 0,2%/mois (art. 1727 CGI)
- Insuffisance déclarative : 10% (art. 1758 A CGI)
- Manquement délibéré : 40% (art. 1729 a CGI)
- Manoeuvres frauduleuses : 80% (art. 1729 b CGI)
- Abus de droit : 80% (art. 1729 b CGI)

### Opinion du vérificateur
[Conclusion : comptabilité probante ou non, régularité, sincérité]
```

## Données

Le repo inclut des données open source dans `data/` :

| Fichier | Contenu | Usage dans le contrôle |
|---------|---------|----------------------|
| `data/pcg_YYYY.json` | Plan Comptable Général complet | Valider les CompteNum du FEC, vérifier les racines PCG |
| `data/nomenclature-liasse-fiscale.csv` | Cases de la liasse fiscale | Recouper les montants du compte de résultat avec la liasse |

**Comment utiliser ces données :**

Pour valider un CompteNum du FEC contre le PCG officiel :
```
Lire data/pcg_YYYY.json → chercher dans le tableau "flat" par "number"
Si le compte n'existe pas dans le PCG → anomalie FEC (Axe 1, contrôle 8)
```

Pour recouper les montants du compte de résultat avec la liasse 2033-B :
```
Lire data/nomenclature-liasse-fiscale.csv → format "id;lib"
Exemple : GG;RÉSULTAT D'EXPLOITATION → recouper avec le résultat d'exploitation comptable
```

Le fichier `data/sources.json` liste toutes les sources avec dates de dernière récupération.

## Références

| Fichier | Contenu |
|---------|---------|
| [references/textes-fiscaux.md](references/textes-fiscaux.md) | Textes CGI, BOFiP, jurisprudence applicable |
| [references/penalites-bareme.md](references/penalites-bareme.md) | Barèmes des pénalités et intérêts de retard |
| [references/cir-cii.md](references/cir-cii.md) | CIR/CII — textes légaux, grille de contrôle, chefs de redressement typiques |
