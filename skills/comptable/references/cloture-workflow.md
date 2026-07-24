# Workflow de Clôture Annuelle

Guide d'exécution complet pour la clôture des comptes annuels d'une entreprise française soumise à l'IS.

Ce workflow couvre les 12 étapes de la clôture, de la collecte des données au dépôt au greffe, en s'appuyant sur les scripts du repo pour automatiser les sorties (FEC, états financiers, PDFs, formulaires fiscaux).

---

## Vue d'ensemble

```
Phase 1 : Préparation des données
  1. Collecte des transactions (banques, plateformes de paiement)
  2. Catégorisation des dépenses (mappage vendor → PCG)
  3. Rapprochement bancaire

Phase 2 : Écritures d'inventaire
  4. Immobilisations et amortissements
  5. Cut-off (CCA, PCA, CAP, PAR)
  6. Provisions et dépréciations
  7. IS (Impôt sur les sociétés)

Phase 3 : Génération des états
  8. Journal des écritures (journal-entries.json)
  9. États financiers (Bilan, Compte de résultat, Balance, Grand livre)
  10. FEC (Fichier des Écritures Comptables)

Phase 4 : Déclarations et dépôt
  11. Liasse fiscale (2065-SD + 2033-A à 2033-D)
  12. Documents de dépôt (PV, Déclaration confidentialité, Dépôt greffe)
  13. Génération des PDFs
```

---

## Phase 1 : Préparation des données

### Étape 1 : Collecte des transactions

**Objectif** : Rassembler TOUTES les transactions de l'exercice.

**Sources à collecter** :

| Source | Méthode | Format |
|--------|---------|--------|
| Qonto | `npm run fetch:qonto` (connecteur intégré) | JSON dans `data/transactions/qonto-*.json` |
| Autre banque | Export CSV/OFX depuis l'espace en ligne | Transactions avec date, montant, libellé |
| Stripe | `npm run fetch:stripe` (connecteur intégré) | JSON dans `data/transactions/stripe-*.json` |
| PayPal / Mollie / autre | Export depuis la plateforme | Charges, payouts, fees, refunds |
| Factures fournisseurs | Google Drive / email | PDF avec montant, TVA, date |
| Factures clients | Logiciel facturation | Numéro, montant, date, client |

**Connecteurs intégrés** :

Si vous utilisez Qonto et/ou Stripe, les connecteurs dans `integrations/` permettent de récupérer les transactions automatiquement. Voir la configuration dans `company.json` et le README dans `integrations/`.

```bash
# Récupérer toutes les transactions de l'exercice
npm run fetch
# ou séparément avec filtrage par date :
node integrations/qonto/fetch.js --start 2025-01-01 --end 2025-12-31
node integrations/stripe/fetch.js --start 2025-01-01 --end 2025-12-31
```

**Format de sortie** : Un fichier JSON par source dans `data/transactions/`.

**Contrôle** : Vérifier que la somme des transactions bancaires correspond au solde bancaire de clôture.

### Étape 2 : Catégorisation des dépenses

**Objectif** : Associer chaque transaction à un compte PCG.

**Règles de catégorisation** :

| Type de dépense | Compte PCG | Exemples |
|----------------|------------|----------|
| API / services cloud | 604 | Anthropic, OpenAI, fal.ai |
| Hébergement / SaaS | 6135 | Hetzner, Vercel, MongoDB, GitHub |
| Bureau domicile | 6132 | Quote-part charges locatives |
| Documentation | 6181 | Livres, formations |
| Intermédiaires | 622 | Comptable, freelances |
| Publicité | 6231 | Annonces, directories |
| Frais bancaires | 627 | Frais bancaires, commissions |
| Commissions paiement | 6278 | Frais Stripe par transaction |
| Domaines | 651 | Noms de domaine |
| Chargebacks | 654 | Litiges Stripe perdus |
| Immobilisations (>500 EUR) | 2183 | Matériel informatique |
| SaaS revenue | 706 | Abonnements clients |
| Ventes ponctuelles | 707 | Ventes de marchandises |
| Cession d'actif | 775 | Vente de domaine |

**Cas spéciaux** :

- **Amazon** : distinguer fournitures (<500 EUR → 606) des immobilisations (>500 EUR → 2183)
- **Stripe fees** : enregistrer le CA brut en 706 et les frais en 6278 (pas le net)
- **Transferts internes** : Neutraliser (débit banque A, crédit banque B)
- **Devises** : Convertir en EUR au taux du jour ou au taux de change de la plateforme de paiement

### Étape 3 : Rapprochement bancaire

**Objectif** : Vérifier que le solde comptable = solde bancaire réel.

```
Solde bancaire (relevé au 31/12)
+ Opérations comptabilisées non débitées
- Opérations débitées non comptabilisées
= Solde comptable (compte 512)
```

**Avec les connecteurs Qonto + Stripe** :

Le rapprochement peut être largement automatisé en croisant les données des deux sources :

1. **Payouts Stripe vers Qonto** : Chaque payout Stripe (virement vers la banque) apparait comme un crédit sur le compte Qonto. Vérifier que chaque `payout` dans `stripe-*.json` a un crédit correspondant dans `qonto-*.json` (montant identique, date +2 à +7 jours).

2. **Transactions Qonto sans Stripe** : Ce sont les dépenses directes (fournisseurs, charges, virements) qui constituent les charges et immobilisations de l'exercice.

3. **Stripe fees** : Les frais Stripe ne transitent pas par Qonto (ils sont retenus sur les charges). Ils apparaissent dans les balance transactions Stripe avec `type: "stripe_fee"` et doivent être comptabilisés en charges (627/6278).

4. **Solde final** : Le solde Qonto au 31/12 doit correspondre au solde du compte 512 dans le journal des écritures.

**Contrôle** : L'écart doit être nul. Si écart, identifier et régulariser.

---

## Phase 2 : Écritures d'inventaire

### Étape 4 : Immobilisations et amortissements

**Seuil d'immobilisation** : 500 EUR HT (ou TTC si franchise TVA).

**Méthode standard** : Linéaire. Durées usuelles :
- Matériel informatique : 3 ans
- Logiciels : 1-3 ans
- Mobilier : 5-10 ans

**Prorata temporis** : Première année au prorata du nombre de jours d'utilisation.

```
Dotation = (Valeur brute / Durée en années) x (Jours d'utilisation / 365)
```

**Écriture** :
```
  Débit  6811  Dotations aux amortissements     XXX,XX
  Crédit 28XX  Amortissements immobilisations    XXX,XX
```

### Étape 5 : Cut-off (Séparation des exercices)

#### Produits Constatés d'Avance (PCA) — CRITIQUE pour SaaS

Les PCA représentent la part des revenus encaissés sur l'exercice N mais qui couvrent une période en N+1. C'est le point de cut-off le plus important pour une entreprise SaaS avec des abonnements annuels.

**Exemple** : Abonnement annuel de 120 EUR payé le 01/10/2025, couvre 01/10/2025 au 30/09/2026.
- Part N : 92 jours (oct-déc) = 120 x 92/365 = 30,25 EUR (revenue)
- Part N+1 : 273 jours (jan-sep) = 120 x 273/365 = 89,75 EUR (PCA)

**Calcul** :
```
PCA = Montant total x (Jours couvrant N+1 / Durée totale de la période)
```

**Pour les abonnements en devise étrangère (USD)** :
Utiliser le montant EUR réel reçu (taux de change appliqué à la transaction par la plateforme de paiement), pas une conversion théorique.

**Écriture** :
```
  Débit  706   Prestations de services      XXX,XX
  Crédit 487   Produits constatés d'avance   XXX,XX
```

**Extourne au 01/01/N+1** (écriture d'ouverture) :
```
  Débit  487   Produits constatés d'avance   XXX,XX
  Crédit 706   Prestations de services      XXX,XX
```

#### Charges Constatées d'Avance (CCA)

Charges payées en N mais concernant N+1 (assurance annuelle, abonnement annuel payé d'avance).

```
  Débit  486   Charges constatées d'avance   XXX,XX
  Crédit 6XX   Compte de charge              XXX,XX
```

#### Charges à Payer (CAP)

Charges de N non encore facturées (factures fournisseurs non parvenues).

```
  Débit  6XX   Charge                        XXX,XX
  Crédit 408   Fournisseurs — FNP            XXX,XX
```

#### Produits à Recevoir (PAR)

Revenus de N non encore facturés (factures à établir).

```
  Débit  418   Clients — FAE                 XXX,XX
  Crédit 7XX   Produit                       XXX,XX
```

### Étape 6 : Provisions et dépréciations

- Provisions pour risques : litiges en cours, garanties
- Dépréciation des créances : clients douteux
- Dépréciation des stocks : stocks obsolètes

### Étape 7 : Impôt sur les sociétés

**Calcul du résultat fiscal** :
```
Résultat comptable (avant IS)
+ Réintégrations extra-comptables (charges non déductibles)
- Déductions extra-comptables
- Déficits antérieurs reportés
= Résultat fiscal
```

**Taux IS (2025)** :

| Tranche | Taux | Conditions |
|---------|------|------------|
| 0 à 42 500 EUR | 15% | PME : CA < 10M, capital libéré, 75%+ personnes physiques |
| Au-delà | 25% | Taux normal |

**Prorata pour exercice court** :
```
Seuil taux réduit = 42 500 x (Jours exercice / 365)
```

**Écriture** :
```
  Débit  695   Impôt sur les bénéfices       X XXX,XX
  Crédit 444   État — IS                     X XXX,XX
```

---

## Phase 3 : Génération des états

### Étape 8 : Journal des écritures

Consolider toutes les écritures dans `data/journal-entries.json`.

**Format standard** :
```json
[
  {
    "num": 1,
    "date": "2025-03-06",
    "journal": "BQ",
    "ref": "REF-001",
    "label": "Achat fournitures",
    "lines": [
      { "account": "606", "debit": 45.99, "credit": 0 },
      { "account": "5121", "debit": 0, "credit": 45.99 }
    ]
  }
]
```

**Codes journaux** :
| Code | Journal |
|------|---------|
| BQ | Banque principale |
| BN | Banque secondaire |
| VE | Ventes |
| AC | Achats |
| OD | Opérations diverses |
| AN | À nouveaux |

### Étape 9 : États financiers

```bash
node scripts/generate-statements.js
```

Génère dans `output/` :
- `bilan.md` — Bilan (Actif / Passif)
- `compte-de-resultat.md` — Compte de résultat (Produits / Charges / Résultat)
- `balance.md` — Balance générale (tous les comptes avec soldes)

**Contrôles automatiques** :
- Balance équilibrée (total débits = total crédits)
- Bilan équilibré (actif = passif)
- Résultat P&L = résultat au bilan

### Étape 10 : FEC

```bash
node scripts/generate-fec.js
```

Génère `output/[SIREN]FEC[YYYYMMDD].txt`.

**Contrôles automatiques** :
- 18 colonnes format pipe
- Équilibre global
- Équilibre par écriture
- Numérotation séquentielle

---

## Phase 4 : Déclarations et dépôt

### Étape 11 : Liasse fiscale

Utiliser le template `templates/liasse-fiscale-2033.md` pour préparer :
- **2065-SD** : Déclaration de résultat (utiliser `templates/2065-sd.html`)
- **2033-A** : Bilan simplifié
- **2033-B** : Compte de résultat simplifié
- **2033-C** : Immobilisations et amortissements
- **2033-D** : Provisions et déficits

**Vérification croisée** :
- 2033-A actif = 2033-A passif
- 2033-B résultat = 2033-A résultat (case DI)
- 2033-C valeurs fin = 2033-A immobilisations brutes
- 2065 résultat fiscal cohérent avec 2033-B + réintégrations

### Étape 12 : Documents de dépôt

**Templates disponibles dans `templates/`** :

| Document | Template | Obligatoire |
|----------|----------|-------------|
| Comptes annuels (Bilan + CR + Annexe) | Générés par le script | Oui |
| Décision d'approbation des comptes | `approbation-comptes.md` | Oui |
| Déclaration de confidentialité | `declaration-confidentialite.html` | Optionnel (petite entreprise) |
| Liasse fiscale 2065+2033 | `liasse-fiscale-2033.md` + `2065-sd.html` | Oui (au SIE) |
| Checklist dépôt greffe | `depot-greffe-checklist.md` | Aide interne |
| FEC | Généré par le script | À conserver (10 ans) |

### Étape 13 : PDFs

```bash
node scripts/generate-pdfs.js
```

Convertit tous les .md du dossier `output/` en PDFs professionnels avec en-tête société, pagination, et mise en forme A4.

---

## Échéances

| Date | Déclaration | Formulaire |
|------|-------------|------------|
| J+90 (3 mois après clôture) | Liasse fiscale | 2065 + 2033 A/B/C/D via EDI-TDFC |
| 15 mai (exercice cal.) | Paiement IS solde | 2572-SD (télépaiement) |
| J+180 (6 mois après clôture) | Approbation comptes | Décision associé unique ou PV d'AG |
| J+180 + 30j | Dépôt greffe | Comptes annuels + PV + décl. confidentialité |

Pour un exercice clos le 31/12 :
- Liasse fiscale : **2e jour ouvré après le 1er mai** (~3-4 mai)
- Paiement IS : **15 mai**
- Approbation : **30 juin** au plus tard
- Dépôt greffe : **30 juillet** au plus tard

---

## Cas spéciaux

### Premier exercice

- L'exercice peut être différent de 12 mois (ex: 25/02 au 31/12 = 309 jours)
- Prorata pour les amortissements ET pour le seuil IS à taux réduit
- Les dépenses payées avant la création (max 6 mois) peuvent être reprises via le compte courant d'associé (455)

### Franchise TVA

- Pas de TVA collectée ni déductible
- Seuil : 36 800 EUR pour les services (2025), 37 500 EUR (2026)
- Surveiller le CA cumulé mois par mois
- Si dépassement : obligation de collecte à partir de la date de dépassement

### Compte courant d'associé (455)

Le compte courant enregistre les avances et remboursements entre l'associé et la société :
- Charges pré-constitution (délai : 6 mois après création)
- Bureau domicile (quote-part justifiée par surface et charges)
- Dépenses professionnelles payées sur compte personnel

**Documentation** : chaque mouvement doit être justifié par une facture ou un calcul détaillé.

### SaaS multi-devises

Pour les revenus en devise étrangère (USD, GBP, etc.) :
- Utiliser le taux de change EUR réel de la plateforme de paiement (balance_transaction)
- Ne pas utiliser un taux moyen ou le taux BCE
- Le taux de la plateforme inclut déjà la conversion et est celui du jour effectif

---

## Automatisation avec les scripts

| Script | Input | Output |
|--------|-------|--------|
| `generate-statements.js` | `data/journal-entries.json` + `company.json` | `output/bilan.md`, `compte-de-resultat.md`, `balance.md` |
| `generate-fec.js` | `data/journal-entries.json` + `company.json` | `output/[SIREN]FEC[YYYYMMDD].txt` |
| `generate-pdfs.js` | `output/*.md` + `company.json` + `templates/` | `output/pdf/*.pdf` |

**Ce qui est automatisé** :
- Génération du FEC à partir du journal
- Génération du bilan, compte de résultat, balance
- Conversion en PDFs professionnels
- Pré-remplissage des templates (2065, déclaration confidentialité, PV)

**Ce qui reste manuel** :
- La collecte initiale des transactions (selon vos sources)
- La catégorisation des dépenses (règles spécifiques à votre activité)
- Le calcul des PCA (nécessite l'analyse des périodes de couverture)
- La validation des montants de la liasse fiscale
- La signature et le dépôt effectif (Infogreffe, impots.gouv.fr)
- Le télépaiement de l'IS
