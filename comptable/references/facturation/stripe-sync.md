# Pipeline Stripe → Facture → Qonto (Belgique)

`last_updated: 2026-05-15`

Workflow end-to-end quand les encaissements arrivent par Stripe et que le compte bancaire est Qonto (IBAN belge BE).

## Vue d'ensemble

```
Stripe (invoice paid)
   │
   │   scripts/import-stripe-invoices.js
   ▼
data/invoices/F-YYYY-NNN.json    +    data/invoices/index.json (stripe_id → numéro)
   │
   │   scripts/generate-peppol.js  (ou generate-pdf.js pour B2C)
   ▼
output/F-YYYY-NNN.xml (Peppol BIS 3.0 UBL)  +  output/F-YYYY-NNN.pdf
   │
   │   [si B2B belge] → transmission via prestataire Peppol (Qonto/Clearfacts/...)
   │   scripts/upload-qonto-attachments.js
   ▼
Qonto transaction ← PDF récapitulatif du payout (multi-factures)
```

Tous les scripts sont idempotents : lancer plusieurs fois ne duplique rien.

## Prérequis

**`company.json`** doit contenir :

- `bce` : numéro BCE sans points (ex : `"0123456789"`)
- `vat_number` : numéro TVA belge (ex : `"BE0123456789"`)
- `stripe_accounts[]` avec `id`, `name`, `env_key`
- `invoicing.prefix` (ex. `"F"`), `invoicing.separator` (ex. `"-"`), `invoicing.next_numbers` (map année → prochain numéro)
- `einvoicing.peppol_id` (ex. `"0208:0123456789"`)
- `qonto.enabled: true` pour la partie Qonto

**Variables d'environnement** :

- `STRIPE_SECRET` ou clés spécifiques par compte (via `env_key`)
- `QONTO_ID` et `QONTO_API_SECRET` (https://app.qonto.com/settings/integrations)

**Dépendances npm** : `stripe`, `puppeteer` (pour la génération PDF), `xmlbuilder2` (pour le XML Peppol UBL).

## Étape 1 — Import des invoices Stripe

```bash
node scripts/import-stripe-invoices.js --start 2026-01-01 --end 2026-03-31
```

Ce que fait le script :

1. Pour chaque `stripe_account` configuré, liste les invoices avec `status=paid` sur la période
2. Expand `data.customer` et `data.charge.balance_transaction` (pour la conversion EUR)
3. Pour chaque invoice non encore importée (vérifiée dans `index.json`) :
   - Assigne le prochain numéro depuis `invoicing.next_numbers[year]`
   - Convertit le montant en EUR via `balance_transaction.exchange_rate`
   - Détermine si la facture est B2B belge (numéro TVA belge client présent dans Stripe) ou B2C
   - Écrit `data/invoices/F-YYYY-NNN.json`
   - Ajoute l'entrée dans `index.json` (`stripe_map[stripe_id] = numéro`)
4. Met à jour `company.json` avec le nouveau `next_numbers[year]`

**Multi-devise** : si la charge est en USD, `balance_transaction.amount` donne le montant en EUR (devise du compte Stripe). Stocker les deux : `stripe_original_amount`, `stripe_original_currency`, `eur_amount`, `exchange_rate`.

**Idempotence** : un `stripe_id` déjà présent dans `index.stripe_map` est skippé. Pas de double numérotation.

**Options** :

- `--account <id>` : filtre sur un seul compte Stripe
- `--output <dir>` : dossier de sortie custom (défaut `data/invoices/`)
- `--dry-run` : simule, n'écrit rien, ne modifie pas `company.json`

## Étape 2 — Génération de la facture

### B2B belge (client avec numéro TVA belge)

Génère un fichier **Peppol BIS 3.0 (UBL)** conforme pour transmission via le réseau Peppol belge :

```bash
node scripts/generate-peppol.js --invoice data/invoices/F-2026-001.json
```

Produit `output/F-2026-001.xml` (XML UBL 2.1 Peppol BIS 3.0) et `output/F-2026-001.pdf` (lisible).

Pour valider le XML sans générer : `--validate`. Pour PDF seul : `--pdf-only`.

**Identifiant Peppol** : dérivé automatiquement du `bce` de `company.json` → `0208:[bce]`.

### B2C (particuliers) ou B2B étranger

Génère un **PDF** simple (pas de Peppol requis) :

```bash
node scripts/generate-pdf.js --invoice data/invoices/F-2026-001.json
```

## Étape 3 — Transmission Peppol (B2B belge)

Pour les factures B2B belges générées en étape 2 :

```bash
node scripts/send-peppol.js --invoice data/invoices/F-2026-001.json
```

Le script utilise l'API du prestataire Peppol configuré dans `company.json` (`einvoicing.provider`) pour transmettre le fichier XML via Mercurius vers l'identifiant Peppol du client.

**Prestataires supportés :** Qonto (via API attachments), Clearfacts (via API), Unifiedpost (via API).

## Étape 4 — Upload des justificatifs Qonto

```bash
node scripts/upload-qonto-attachments.js                  # dry-run : affiche ce qui serait uploadé
node scripts/upload-qonto-attachments.js --upload         # upload réel
```

Ce que fait le script :

1. Récupère toutes les transactions Qonto `completed` sur la période
2. Filtre les crédits Stripe sans pièce jointe (`attachment_ids.length === 0`)
3. Pour chaque crédit Stripe, trouve les factures émises dans la fenêtre `[crédit précédent, crédit courant]` via `index.json`
4. Génère un PDF récapitulatif (tableau factures + total brut + frais Stripe + net versé)
5. Uploade via `POST /v2/transactions/{uuid}/attachments`

**API Qonto — Attachments**

Endpoint : `POST https://thirdparty.qonto.com/v2/transactions/{transaction_uuid}/attachments`

- Authentification : header `Authorization: {QONTO_ID}:{QONTO_API_SECRET}`
- Body : `multipart/form-data` avec champ `file` (blob)
- Types acceptés : PDF, PNG, JPEG
- Limites : **5 pièces max par transaction**, **30 MB par pièce**

Documentation officielle : https://api-doc.qonto.com/docs/business-api/

**Options** :

- `--since YYYY-MM-DD`, `--until YYYY-MM-DD` : restreindre la période Qonto
- `--limit N` : uploader seulement les N premiers matches

## Conservation (obligation belge)

Les fichiers JSON générés dans `data/invoices/` sont la source de vérité. Les PDFs et XML peuvent être regénérés à la demande depuis le JSON.

**Obligation légale belge :** Conservation 10 ans (art. 7 de la loi du 17 juillet 1975 relative à la comptabilité des entreprises).

Pour les factures Peppol (B2B belges), conserver le fichier XML UBL original (pas seulement le PDF).

## Écriture comptable (PCMN)

```
Facture client B2B (1 000 € HTVA, TVA 21%) :
  Débit 400 Clients               1 210,00
  Crédit 701 Prestations services 1 000,00
  Crédit 451 TVA à payer            210,00
```

## Cas limites

- **Payouts manuels Stripe** (`automatic: false`) : le matching par date window fonctionne toujours
- **Refunds partiels** : créer un avoir (note de crédit) référençant la facture d'origine
- **Multi-produits dans un payout** : le PDF récap les regroupe dans le même récapitulatif
- **Facture sans `customer` Stripe** : fallback sur `customer_email` et `customer_address` directs
- **Client belge sans numéro TVA Stripe** : traiter comme B2C (pas de Peppol) sauf si le numéro BCE est disponible

## Routine recommandée

Automatisation hebdomadaire (lundi matin) :

```bash
# Import des invoices de la semaine écoulée
node scripts/import-stripe-invoices.js \
  --start $(date -v-7d +%Y-%m-%d) --end $(date +%Y-%m-%d)

# Génération et transmission Peppol (B2B belges)
node scripts/generate-peppol.js --all-pending
node scripts/send-peppol.js --all-pending

# Upload des justificatifs manquants sur Qonto
node scripts/upload-qonto-attachments.js --upload
```

Les scripts étant idempotents, une exécution planifiée ne dupliquera jamais les factures ni les pièces jointes.
