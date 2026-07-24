# Intégration Qonto

Le connecteur Qonto existant (`integrations/qonto/fetch.js`) récupère automatiquement les transactions du compte bancaire d'une copropriété.

## Configuration

Ajouter un bloc `qonto` dans le fichier JSON de la copro (`copros/{slug}.json`) :

```json
{
  "qonto": {
    "enabled": true,
    "env_id": "QONTO_OLIVIERS_ID",
    "env_secret": "QONTO_OLIVIERS_SECRET"
  }
}
```

Chaque copro peut avoir son propre compte Qonto (variables d'environnement distinctes). Pour un syndic gérant plusieurs copros avec un seul compte Qonto multi-IBAN, partager les mêmes variables.

Clés API Qonto : Dashboard Qonto → Settings → Integrations → API.

## Usage

```bash
# Transactions d'une copro
node integrations/qonto/fetch.js --copro les-oliviers

# Toutes les copros
node integrations/qonto/fetch.js --all-copros

# Filtrer par date (exercice comptable)
node integrations/qonto/fetch.js --copro les-oliviers --start 2025-07-01 --end 2026-06-30
```

Transactions enregistrées dans `data/transactions/qonto-{slug}.json`.

## Catégorisation

Les transactions sont catégorisées selon le plan comptable des copropriétés (classe 6) :

| Fournisseur type | Compte PCG copro |
|------------------|-----------------|
| Nettoyage (Mellano, etc.) | 612 |
| Espaces verts | 613 |
| Assurance immeuble | 611 |
| Chauffage (Engie, etc.) | 616/617 |
| Eau (Veolia, etc.) | 618 |
| Électricité (EDF, etc.) | 619 |
| Honoraires syndic | 621 |
| Frais postaux | 625 |
| Frais bancaires | 662 |

## Rapprochement bancaire

Croiser les transactions Qonto avec :
1. Les appels de fonds émis (comptes 411, 412, 414)
2. Les paiements fournisseurs (compte 401)
3. Le solde comptable (compte 501)

Vérification : solde Qonto au jour J = solde du compte 501.

## Données ouvertes (RNC)

Le Registre National d'Immatriculation des Copropriétés :

**API publique (détail uniquement)** :
```
GET https://www.registre-coproprietes.gouv.fr/api/public/annuaire/coproannuairedetail/{id}
```
- Sans authentification
- Retourne : identification, adresse, parcelle, syndic, mandat, DPE, lots, procédures, données financières
- Pas d'endpoint de recherche (SPA Angular)
- Nécessite l'ID numérique interne

**Bulk CSV (data.gouv.fr)** :
- URL : https://www.data.gouv.fr/datasets/registre-national-dimmatriculation-des-coproprietes
- ~437 Mo, ~620 000 copropriétés, trimestriel (ANAH)
- Licence Etalab

**Déclaration/mise à jour** : https://www.registre-coproprietes.gouv.fr (authentification requise, dans les 2 mois suivant l'AG).
