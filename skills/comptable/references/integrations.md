# Intégrations (collecte automatique des transactions)

Des connecteurs sont disponibles dans `integrations/` pour récupérer automatiquement les transactions bancaires et les opérations de paiement.

## Qonto (banque en ligne)

Si `qonto.enabled` est `true` dans `company.json` :

```bash
npm run fetch:qonto
# ou avec filtrage par date :
node integrations/qonto/fetch.js --start 2025-01-01 --end 2025-12-31
```

Récupère toutes les transactions de tous les comptes bancaires Qonto → `data/transactions/qonto-*.json`.

**Variables d'environnement requises** : `QONTO_ID`, `QONTO_API_SECRET` (dashboard Qonto > Settings > Integrations > API).

## Stripe (paiements en ligne)

Si des comptes sont configurés dans `stripe_accounts` de `company.json` :

```bash
npm run fetch:stripe
# ou avec filtrage :
node integrations/stripe/fetch.js --start 2025-01-01 --end 2025-12-31 --account main
```

Récupère les balance transactions (charges, fees, payouts, refunds) et les payouts → `data/transactions/stripe-*.json`.

**Configuration dans `company.json`** :
```json
"stripe_accounts": [
  { "id": "main", "name": "Mon SaaS", "env_key": "STRIPE_SECRET" }
]
```

**Variable d'environnement** : la valeur de `env_key` doit contenir la clé secrète Stripe (`sk_live_...` ou `sk_test_...`).

## Récupérer toutes les sources

```bash
npm run fetch          # Qonto + Stripe
```

Les transactions récupérées sont au format standard Paperasse dans `data/transactions/`. Le champ `our_category` est à `null` et sera rempli lors de la catégorisation (mappage vers compte PCG).

## Rapprochement bancaire automatisé

Avec les connecteurs Qonto + Stripe, le rapprochement bancaire peut être largement automatisé :

1. **Récupérer les transactions** : `npm run fetch`
2. **Croiser les payouts Stripe avec les crédits Qonto** : chaque payout Stripe doit correspondre à un crédit Qonto, même montant et date proche (J+2 à J+7)
3. **Identifier les écarts** : transactions Qonto sans correspondance Stripe = dépenses directes. Payouts Stripe sans crédit Qonto = payout en transit ou erreur.
4. **Valider le solde** : solde Qonto au 31/12 = solde du compte 512 dans le journal
