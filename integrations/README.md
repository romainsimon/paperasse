# Intégrations

Connecteurs pour récupérer automatiquement les transactions bancaires et les opérations de paiement.

## Connecteurs disponibles

| Connecteur | Description | Env vars requises |
|------------|-------------|-------------------|
| [Qonto](qonto/) | Transactions bancaires via l'API Qonto | `QONTO_ID`, `QONTO_API_SECRET` |
| [Stripe](stripe/) | Charges, payouts, fees via l'API Stripe | Variable par compte (configurable) |
| [Pennylane](pennylane/) | Transactions bancaires via l'API Company v2 | `PENNYLANE_API_TOKEN` |

## Configuration

### Qonto

1. Dans votre dashboard Qonto : **Settings > Integrations > API**
2. Notez votre Organization slug et votre Secret key
3. Définissez les variables d'environnement :
   ```bash
   export QONTO_ID="votre-organisation"
   export QONTO_API_SECRET="votre-secret"
   ```
4. Activez Qonto dans `company.json` :
   ```json
   "qonto": {
     "enabled": true
   }
   ```

### Stripe

#### Compte unique ou comptes séparés

Le cas le plus courant. Chaque compte Stripe a sa propre clé API.

1. Dans votre dashboard Stripe : **Developers > API keys**
2. Copiez votre Secret key (commence par `sk_live_` ou `sk_test_`)
3. Configurez vos comptes dans `company.json` :
   ```json
   "stripe_accounts": [
     { "id": "main", "name": "Mon Produit", "env_key": "STRIPE_SECRET" }
   ]
   ```
4. Définissez la variable d'environnement :
   ```bash
   export STRIPE_SECRET="sk_live_..."
   ```

Si vous avez plusieurs produits Stripe (comptes séparés), ajoutez une entrée par compte avec un `env_key` différent.

#### Stripe Connect (organisation avec sous-comptes)

Si vous utilisez Stripe Connect (un compte plateforme avec des comptes connectés), ajoutez le `stripe_account_id` (le `acct_xxx` du sous-compte) :

```json
"stripe_accounts": [
  { "id": "client-a", "name": "Client A", "env_key": "STRIPE_PLATFORM_SECRET", "stripe_account_id": "acct_xxx" },
  { "id": "client-b", "name": "Client B", "env_key": "STRIPE_PLATFORM_SECRET", "stripe_account_id": "acct_yyy" }
]
```

Tous les sous-comptes peuvent partager la même clé plateforme (`env_key`). Le connecteur envoie automatiquement le header `Stripe-Account` pour agir au nom de chaque sous-compte.

Vous pouvez mixer les deux modes (comptes séparés + Connect) dans le même tableau.

### Pennylane

Le connecteur couvre volontairement un périmètre réduit : la lecture des transactions
bancaires déjà agrégées dans Pennylane. Il ne crée ni ne modifie aucune donnée distante.

1. Dans Pennylane, créez un **token API Company**.
2. Accordez-lui uniquement le scope `transactions:readonly`.
3. Définissez le token dans votre environnement :
   ```bash
   export PENNYLANE_API_TOKEN="votre-token-company"
   ```
4. Activez Pennylane dans `company.json` :
   ```json
   "pennylane": {
     "enabled": true
   }
   ```

Documentation officielle : [création d'un token Company](https://pennylane.readme.io/docs/generating-my-api-token)
et [endpoint transactions v2](https://pennylane.readme.io/reference/gettransactions).

## Usage

```bash
# Qonto : récupérer toutes les transactions
npm run fetch:qonto

# Qonto : filtrer par date
node integrations/qonto/fetch.js --start 2025-01-01 --end 2025-12-31

# Stripe : récupérer tous les comptes
npm run fetch:stripe

# Stripe : filtrer par date et compte
node integrations/stripe/fetch.js --start 2025-01-01 --end 2025-12-31 --account main

# Pennylane : récupérer et normaliser les transactions bancaires
npm run fetch:pennylane

# Pennylane : filtrer par date comptable
node integrations/pennylane/fetch.js --start 2025-01-01 --end 2025-12-31

# Tout récupérer
npm run fetch
```

`npm run fetch` conserve son comportement historique Qonto + Stripe. Pennylane
n'est appelé que par `fetch:pennylane`, afin qu'aucun accès à ses données ne soit
déclenché sans demande explicite.

## Format de sortie

Les transactions sont enregistrées dans `data/transactions/` au format JSON.

Chaque transaction suit le format standard Paperasse :

```json
{
  "id": "txn_xxx",
  "source": "qonto",
  "date": "2025-03-15T10:30:00Z",
  "amount": -45.99,
  "currency": "EUR",
  "label": "Amazon Web Services",
  "our_category": null,
  "raw": { ... }
}
```

Le champ `our_category` est rempli par le skill `comptable` lors de la catégorisation (mappage vendor vers compte PCG).

Pennylane écrit `data/transactions/pennylane.json`. Pour une opération en devise,
`amount` et `fee` conservent les montants dans `currency`, tandis que `amount_eur`
et `fee_eur` contiennent leurs contre-valeurs en euros fournies par Pennylane. La
pagination par curseur est suivie automatiquement.

## Sécurité

Les clés API ne sont jamais stockées dans le repo. Elles sont lues depuis les variables d'environnement au moment de l'exécution. Ne commitez jamais de fichier `.env` contenant des secrets.

Les fixtures de test Pennylane sont entièrement fictives. Les sorties réelles sous
`data/transactions/` peuvent contenir des libellés et contreparties sensibles : ne les
commitez pas.
