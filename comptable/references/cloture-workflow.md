# Workflow de Clôture Annuelle (Belgique)

Guide d'exécution complet pour la clôture des comptes annuels d'une société belge soumise à l'ISOC.

Ce workflow couvre les 12 étapes de la clôture, de la collecte des données au dépôt à la Centrale des Bilans BNB, en s'appuyant sur les scripts du repo pour automatiser les sorties (états financiers, livre-journal, PDFs, déclaration ISOC).

`last_updated: 2026-05-15`

---

## Vue d'ensemble

```
Phase 1 : Préparation des données
  1. Collecte des transactions (banques, plateformes de paiement)
  2. Catégorisation des dépenses (mappage vendor → PCMN)
  3. Rapprochement bancaire

Phase 2 : Écritures d'inventaire
  4. Immobilisations et amortissements
  5. Cut-off (470 charges à reporter, 493 produits à reporter, 492 charges à imputer, 472 produits acquis)
  6. Réductions de valeur et provisions
  7. ISOC (Impôt des Sociétés)

Phase 3 : Génération des états
  8. Journal des écritures (journal-entries.json — comptes PCMN)
  9. États financiers (Bilan, Compte de résultat, Balance, Grand livre)
  10. Livre-journal normalisé belge (export archivage)

Phase 4 : Déclarations et dépôt
  11. Déclaration ISOC 275 (Tax-on-web / Biztax)
  12. Documents de dépôt (PV AG, comptes annuels BNB, Centrale des Bilans)
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
| Factures fournisseurs | Boîte mail / Mercurius Peppol | PDF ou XML Peppol BIS 3.0 avec montant, TVA, date |
| Factures clients | Logiciel facturation / Mercurius | Numéro, montant, date, client, numéro BCE |

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

**Objectif** : Associer chaque transaction à un compte PCMN.

**Règles de catégorisation (PCMN belge) :**

| Type de dépense | Compte PCMN | Exemples |
|----------------|-------------|----------|
| API / services cloud (sous-traitance) | 604 | Anthropic, OpenAI, fal.ai |
| Hébergement / SaaS | 618 | Hetzner, Vercel, MongoDB, GitHub |
| Bureau domicile (quote-part) | 610 | Quote-part charges locatives |
| Documentation | 615 | Livres, formations |
| Honoraires expert-comptable | 619 | Honoraires comptable |
| Publicité | 619 | Annonces, directories |
| Frais bancaires | 619 | Frais bancaires, commissions |
| Commissions paiement | 619 | Frais Stripe par transaction |
| Assurances | 613 | RC professionnelle |
| Téléphone et internet | 617 | Abonnement mobile, internet |
| Immobilisations (> seuil) | 241 | Matériel informatique |
| CA — Prestations de services | 701 | Abonnements SaaS clients |
| CA — Ventes de marchandises | 700 | Ventes de produits |
| Subsides d'exploitation | 740 | Aides VLAIO, SOGEPA, hub.brussels |

**Cas spéciaux** :

- **Amazon** : distinguer fournitures (< seuil → 615) des immobilisations (> seuil → 241)
- **Stripe fees** : enregistrer le CA brut en 701 et les frais en 619 (pas le net)
- **Transferts internes** : Neutraliser (débit banque A, crédit banque B via compte 58)
- **Devises** : Convertir en EUR au taux du jour ou au taux de change de la plateforme

### Étape 3 : Rapprochement bancaire

**Objectif** : Vérifier que le solde comptable = solde bancaire réel.

```
Solde bancaire (relevé au 31/12)
+ Opérations comptabilisées non débitées
- Opérations débitées non comptabilisées
= Solde comptable (compte 550)
```

**Avec les connecteurs Qonto + Stripe** :

Le rapprochement peut être largement automatisé en croisant les données des deux sources :

1. **Payouts Stripe vers Qonto** : Chaque payout Stripe (virement vers la banque) apparait comme un crédit sur le compte Qonto. Vérifier que chaque `payout` dans `stripe-*.json` a un crédit correspondant dans `qonto-*.json` (montant identique, date +2 à +7 jours).

2. **Transactions Qonto sans Stripe** : Ce sont les dépenses directes (fournisseurs, charges, virements) qui constituent les charges et immobilisations de l'exercice.

3. **Stripe fees** : Les frais Stripe ne transitent pas par Qonto. Ils apparaissent dans les balance transactions Stripe avec `type: "stripe_fee"` et sont comptabilisés en charges (619).

4. **Solde final** : Le solde Qonto au 31/12 doit correspondre au solde du compte 550 dans le journal des écritures.

**Contrôle** : L'écart doit être nul. Si écart, identifier et régulariser.

---

## Phase 2 : Écritures d'inventaire

### Étape 4 : Immobilisations et amortissements

**Seuil d'immobilisation** : Défini dans la politique comptable (généralement 250 EUR ou 500 EUR HTVA). Les biens en dessous du seuil sont comptabilisés en charge.

**Méthode standard** : Linéaire. Durées usuelles :
- Matériel informatique : 3-5 ans (compte 241)
- Logiciels : 3-5 ans (compte 211)
- Mobilier de bureau : 5-10 ans (compte 240)

**Prorata temporis** : Première année au prorata du nombre de jours d'utilisation.

```
Dotation = (Valeur brute / Durée en années) × (Jours d'utilisation / 365)
```

**Écriture** :
```
  Débit  630  Dotations aux amortissements    XXX,XX
  Crédit 28X  Amortissements immobilisations   XXX,XX
```

### Étape 5 : Cut-off (Séparation des exercices)

#### Produits à Reporter (493) — CRITIQUE pour SaaS

Les produits à reporter représentent la part des revenus encaissés sur l'exercice N mais qui couvrent une période en N+1. C'est le point de cut-off le plus important pour une entreprise SaaS avec des abonnements annuels.

**Exemple** : Abonnement annuel de 120 EUR payé le 01/10/2025, couvre 01/10/2025 au 30/09/2026.
- Part N : 92 jours (oct-déc) = 120 × 92/365 = 30,25 EUR (chiffre d'affaires)
- Part N+1 : 273 jours (jan-sep) = 120 × 273/365 = 89,75 EUR (produit à reporter)

**Calcul** :
```
Produit à reporter = Montant total × (Jours couvrant N+1 / Durée totale de la période)
```

**Écriture** :
```
  Débit  701   Prestations de services        XXX,XX
  Crédit 493   Produits à reporter             XXX,XX
```

**Extourne au 01/01/N+1** :
```
  Débit  493   Produits à reporter             XXX,XX
  Crédit 701   Prestations de services        XXX,XX
```

#### Charges à Reporter (470)

Charges payées en N mais concernant N+1.

```
  Débit  470   Charges à reporter             XXX,XX
  Crédit 6XX   Compte de charge               XXX,XX
```

#### Charges à Imputer (492)

Charges de N non encore facturées (factures fournisseurs non parvenues).

```
  Débit  6XX   Charge                         XXX,XX
  Crédit 492   Charges à imputer              XXX,XX
```

#### Produits Acquis (472)

Revenus de N non encore facturés.

```
  Débit  400   Clients — FAE                  XXX,XX
  Crédit 7XX   Produit                        XXX,XX
```

### Étape 6 : Réductions de valeur et provisions

- Provisions pour litiges (195) et autres risques (199)
- Réductions de valeur sur créances douteuses (409)
- Réductions de valeur sur stocks (390)

### Étape 7 : Impôt des Sociétés (ISOC)

**Calcul du résultat fiscal** :
```
Résultat comptable (avant ISOC)
+ Réintégrations extra-comptables (DNA — art. 74 CIR 92)
- Déductions extra-comptables (RDT — art. 202 CIR 92, DPI)
- Pertes fiscales antérieures reportées
= Résultat fiscal
```

**Taux ISOC (2026)** :

| Tranche | Taux | Conditions |
|---------|------|------------|
| 0 à 100 000 EUR | 20% | Taux réduit PME (art. 215 al. 2 CIR 92) |
| Au-delà | 25% | Taux normal (art. 215 al. 1 CIR 92) |

**Prorata pour exercice court** :
```
Seuil taux réduit = 100 000 × (Jours exercice / 365)
```

**Écriture** :
```
  Débit  670   ISOC dû — exercice courant     X XXX,XX
  Crédit 450   ISOC à payer                   X XXX,XX
```

---

## Phase 3 : Génération des états

### Étape 8 : Journal des écritures

Consolider toutes les écritures dans `data/journal-entries.json`.

**Format standard (comptes PCMN)** :
```json
[
  {
    "num": 1,
    "date": "2025-03-06",
    "journal": "BQ",
    "ref": "REF-001",
    "label": "Achat fournitures",
    "lines": [
      { "account": "615", "debit": 45.99, "credit": 0 },
      { "account": "550", "debit": 0, "credit": 45.99 }
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
- `bilan.md` — Bilan (Actif / Passif) selon schéma PCMN
- `compte-de-resultat.md` — Compte de résultat
- `balance.md` — Balance générale (tous les comptes avec soldes)

**Contrôles automatiques** :
- Balance équilibrée (total débits = total crédits)
- Bilan équilibré (actif = passif)
- Résultat P&L = résultat au bilan

### Étape 10 : Livre-journal normalisé belge

```bash
node scripts/generate-livre-journal.js
```

Génère `output/livre-journal-YYYY.txt`.

Il n'existe pas en Belgique de format FEC standardisé comme en France. Le livre-journal belge est un export chronologique du journal, conforme à l'obligation de l'art. 3 de la loi du 17 juillet 1975 (tenue d'un livre-journal).

**Contrôles automatiques** :
- Équilibre global
- Équilibre par écriture
- Numérotation séquentielle

---

## Phase 4 : Déclarations et dépôt

### Étape 11 : Déclaration ISOC 275

Déposer via **Tax-on-web entreprises** (https://www.taxonweb.be) ou via **Biztax** (logiciels comptables agréés) :

**Documents à préparer :**
- Bilan (schéma complet, abrégé ou micro selon taille)
- Compte de résultat
- Annexes (mouvements des immobilisations, des provisions, des capitaux propres)
- Calcul du résultat fiscal (DNA, RDT, déductions)
- Formulaire 275 (déclaration ISOC proprement dite)

**Vérification croisée** :
- Bilan actif = Bilan passif
- Résultat compte de résultat = résultat repris dans capitaux propres
- Résultat fiscal cohérent avec résultat comptable + ajustements

**Délai :** 7 mois après la clôture (31 juillet pour clôture 31/12).

### Étape 12 : Documents de dépôt BNB

**Documents à déposer à la Centrale des Bilans BNB** (https://cri.nbb.be) :

| Document | Obligatoire |
|----------|-------------|
| Comptes annuels (Bilan + CR + Annexes) selon schéma | Oui |
| Décision d'approbation des comptes (PV AG ou décision associé unique) | Oui |
| Rapport de gestion | Si grande société |
| Rapport du commissaire aux comptes | Si société avec commissaire |

**Délai :** 7 mois après la clôture (31 juillet pour clôture 31/12).

**Dépôt :** Obligatoirement électronique via le portail BNB. Possible via mandataire (expert-comptable, réviseur d'entreprises).

### Étape 13 : PDFs

```bash
node scripts/generate-pdfs.js
```

Convertit tous les .md du dossier `output/` en PDFs professionnels avec en-tête société, pagination, et mise en forme A4.

---

## Échéances (exercice clos 31/12)

| Date | Obligation | Portail |
|------|------------|---------|
| 30 juin N+1 | Approbation comptes (AG) | — |
| 31 juillet N+1 | Déclaration ISOC 275 | Tax-on-web / Biztax |
| 31 juillet N+1 | Dépôt comptes annuels BNB | cri.nbb.be |
| 20 avril (VA1) | Versement anticipé ISOC 1 | MyMinfin |
| 10 juillet (VA2) | Versement anticipé ISOC 2 | MyMinfin |
| 10 octobre (VA3) | Versement anticipé ISOC 3 | MyMinfin |
| 20 décembre (VA4) | Versement anticipé ISOC 4 | MyMinfin |
| 31 mars N+1 | Listing TVA annuel clients | Intervat |
| 1er mars N+1 | Fiches fiscales 281.xx | Belcotax-on-web |

---

## Cas spéciaux

### Premier exercice

- L'exercice peut être différent de 12 mois (ex: 25/02 au 31/12 = 309 jours)
- Prorata pour les amortissements ET pour le seuil ISOC à taux réduit
- Dispense d'accroissement ISOC pour les 3 premiers exercices (art. 218 CIR 92)
- Les dépenses payées avant la constitution (frais d'établissement) peuvent être activées (compte 200)

### Franchise TVA

- Pas de TVA collectée ni déductible
- Seuil : 25 000 EUR de CA annuel (art. 56bis CTVA)
- Surveiller le CA cumulé mois par mois
- Si dépassement : immatriculation TVA via formulaire 604A

### Compte courant associé (456)

Le compte courant enregistre les avances et remboursements entre l'associé et la société :
- Avances de fonds à la société
- Rémunérations non prélevées
- Dépenses professionnelles payées sur compte personnel

**Documentation** : chaque mouvement doit être justifié par une facture ou un calcul détaillé.

### SaaS multi-devises

Pour les revenus en devise étrangère (USD, GBP, etc.) :
- Utiliser le taux de change EUR réel de la plateforme de paiement (balance_transaction)
- Comptabiliser les écarts de change en 654 (pertes) ou 754 (gains)
- Ne pas utiliser un taux moyen ou le taux BCE de façon rétroactive

---

## Automatisation avec les scripts

| Script | Input | Output |
|--------|-------|--------|
| `generate-statements.js` | `data/journal-entries.json` + `company.json` | `output/bilan.md`, `compte-de-resultat.md`, `balance.md` |
| `generate-livre-journal.js` | `data/journal-entries.json` + `company.json` | `output/livre-journal-YYYY.txt` |
| `generate-pdfs.js` | `output/*.md` + `company.json` + `templates/` | `output/pdf/*.pdf` |

**Ce qui est automatisé** :
- Génération du livre-journal à partir du journal
- Génération du bilan, compte de résultat, balance (format PCMN)
- Conversion en PDFs professionnels
- Pré-remplissage des templates (comptes annuels BNB, décision AG)

**Ce qui reste manuel** :
- La collecte initiale des transactions (selon vos sources)
- La catégorisation des dépenses (règles spécifiques à votre activité)
- Le calcul des produits à reporter / PCA (nécessite l'analyse des périodes de couverture)
- La validation des montants de la déclaration ISOC 275
- La signature et le dépôt effectif (Tax-on-web, BNB Centrale des Bilans)
- Le paiement de l'ISOC (solde après versements anticipés)

---

## Ressources

- **Tax-on-web** : https://www.taxonweb.be
- **Centrale des Bilans BNB** : https://cri.nbb.be
- **Fisconetplus (CIR 92 et législation fiscale)** : https://www.fisconetplus.be
- **SPF Finances** : https://finances.belgium.be
- **BCE (Banque-Carrefour des Entreprises)** : https://kbopub.economie.fgov.be
- **CNC-CBN (normes comptables belges)** : https://www.cnc-cbn.be
