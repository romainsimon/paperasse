# Pipeline Stripe → Facture → Qonto

Workflow end-to-end quand les encaissements arrivent par Stripe et que le compte bancaire est Qonto.

## Vue d'ensemble

```
Stripe (invoice paid)
   │
   │   scripts/import-stripe-invoices.js
   ▼
data/invoices/F-YYYY-NNN.json    +    data/invoices/index.json (stripe_id → numéro)
   │
   │   scripts/generate-facturx.js
   ▼
output/F-YYYY-NNN.pdf + .xml (Factur-X)
   │
   │   scripts/upload-qonto-attachments.js
   ▼
Qonto transaction ← PDF récapitulatif du payout (multi-factures)
```

Tous les scripts sont idempotents : lancer plusieurs fois ne duplique rien.

## Prérequis

**`company.json`** doit contenir :

- `stripe_accounts[]` avec `id`, `name`, `env_key` (variable d'env contenant la clé Stripe)
- `invoicing.prefix` (ex. `"F"`), `invoicing.separator` (ex. `"-"`), `invoicing.next_numbers` (map année → prochain numéro)
- `qonto.enabled: true` pour la partie Qonto

**Variables d'environnement** :

- `STRIPE_SECRET` ou clés spécifiques par compte (via `env_key`)
- `QONTO_ID` et `QONTO_API_SECRET` (https://app.qonto.com/settings/integrations)

**Dépendances npm** : `stripe`, `puppeteer` (pour la génération PDF).

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
   - Écrit `data/invoices/F-YYYY-NNN.json`
   - Ajoute l'entrée dans `index.json` (`stripe_map[stripe_id] = numéro`)
4. Met à jour `company.json` avec le nouveau `next_numbers[year]`

**Multi-devise** : si la charge est en USD par exemple, `balance_transaction.amount` donne le montant en EUR (devise du compte Stripe). On stocke les deux : `stripe_original_amount`, `stripe_original_currency`, `eur_amount`, `exchange_rate`.

**Idempotence** : un `stripe_id` déjà présent dans `index.stripe_map` est skippé. Pas de double numérotation.

**Options** :

- `--account <id>` : filtre sur un seul compte Stripe (quand il y en a plusieurs)
- `--output <dir>` : dossier de sortie custom (défaut `data/invoices/`)
- `--dry-run` : simule, n'écrit rien, ne modifie pas `company.json`

## Étape 2 — Génération Factur-X

Pour chaque fichier JSON :

```bash
node scripts/generate-facturx.js --invoice data/invoices/F-2026-001.json
```

Produit un PDF/A-3 avec XML CII embarqué (format Factur-X profil BASIC par défaut).

Pour valider sans générer : `--validate`. Pour XML seul : `--xml-only`.

## Étape 3 — Upload des justificatifs Qonto

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

**Fenêtre temporelle** : les payouts Stripe regroupent les charges d'une période. Le matching se fait par date plutôt que par montant exact (les frais Stripe rendent le montant net ≠ somme des factures).

**Options** :

- `--since YYYY-MM-DD`, `--until YYYY-MM-DD` : restreindre la période Qonto
- `--limit N` : uploader seulement les N premiers matches (utile pour tester)

## API Qonto — Attachments

Endpoint : `POST https://thirdparty.qonto.com/v2/transactions/{transaction_uuid}/attachments`

- Authentification : header `Authorization: {QONTO_ID}:{QONTO_API_SECRET}` (login:password)
- Body : `multipart/form-data` avec champ `file` (blob)
- Types acceptés : PDF, PNG, JPEG
- Limites : **5 pièces max par transaction**, **30 MB par pièce**
- Réponse : 201 OK, 4xx si dépassement ou format invalide

Documentation officielle : https://api-doc.qonto.com/docs/business-api/

## Conservation

Les fichiers JSON générés dans `data/invoices/` sont la source de vérité. Les PDFs générés peuvent être regénérés à la demande depuis le JSON.

**Obligation légale** : conservation 10 ans (art. L. 123-22 C. com.). Factur-X compte pour l'horodatage et la signature intégrée.

## Cas limites

- **Payouts manuels Stripe** (`automatic: false`) : le matching par date window fonctionne toujours, mais vérifier les dates de règlement
- **Refunds partiels** : créer un avoir référençant la facture d'origine (voir `mentions-obligatoires.md` section avoir)
- **Multi-produits dans un payout** : le PDF récap les regroupe dans le même récapitulatif (label = `"ProduitA, ProduitB"`)
- **Facture sans `customer` Stripe** : fallback sur `customer_email` et `customer_address` directs

## Routine recommandée

Automatisation hebdomadaire via cron ou trigger externe (lundi 7h UTC par exemple) :

```bash
# Import des invoices de la semaine écoulée
node scripts/import-stripe-invoices.js \
  --start $(date -v-7d +%Y-%m-%d) --end $(date +%Y-%m-%d)

# Upload des justificatifs manquants
node scripts/upload-qonto-attachments.js --upload
```

Les deux étant idempotentes, une exécution planifiée ne dupliquera jamais les factures ni les pièces jointes.
