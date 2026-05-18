# Intégration Qonto

`last_updated: 2026-05-15`

Le connecteur Qonto existant (`integrations/qonto/fetch.js`) récupère automatiquement les transactions du compte bancaire d'une ACP.

**Qonto est disponible en Belgique.** Les comptes Qonto belges utilisent un IBAN belge au format `BE XX XXXX XXXX XXXX`. Les transactions sont en euros (EUR).

## Configuration

Ajouter un bloc `qonto` dans le fichier JSON de l'ACP (`copros/{slug}.json`) :

```json
{
  "qonto": {
    "enabled": true,
    "env_id": "QONTO_OLIVIERS_ID",
    "env_secret": "QONTO_OLIVIERS_SECRET"
  }
}
```

Chaque ACP peut avoir son propre compte Qonto (variables d'environnement distinctes). Pour un syndic gérant plusieurs ACP avec un seul compte Qonto multi-IBAN, partager les mêmes variables.

Clés API Qonto : Dashboard Qonto → Settings → Integrations → API.

## Usage

```bash
# Transactions d'une ACP
node integrations/qonto/fetch.js --copro les-oliviers

# Toutes les ACP
node integrations/qonto/fetch.js --all-copros

# Filtrer par date (exercice comptable)
node integrations/qonto/fetch.js --copro les-oliviers --start 2025-07-01 --end 2026-06-30
```

Transactions enregistrées dans `data/transactions/qonto-{slug}.json`.

## Catégorisation

Les transactions sont catégorisées selon le plan comptable ACP belge (CNC/CBN) :

| Fournisseur type | Compte |
|------------------|--------|
| Nettoyage (Mellano, Sodexo, etc.) | 612 |
| Espaces verts | 613 |
| Assurance incendie immeuble (AXA, AG Insurance, etc.) | 611 |
| Chauffage (Engie, Luminus, TotalEnergies, etc.) | 616/617 |
| Eau (SWDE, Vivaqua, De Watergroep, etc.) | 618 |
| Électricité (Fluvius, Sibelga, ORES, etc.) | 619 |
| Honoraires syndic | 621 |
| Frais postaux (bpost) | 625 |
| Frais bancaires | 662 |
| TVA (TVA belge 21% ou 6%) | 431 |

## TVA Belge en Copropriété

**Taux applicables :**
- **21% TVA** : taux normal applicable aux prestations de services courantes (honoraires syndic, entretien, nettoyage)
- **6% TVA** : taux réduit applicable aux travaux de rénovation d'immeubles d'habitation de plus de 10 ans, sous conditions (circulaire SPF Finances)
- **0% TVA** : pour certaines locations et opérations exemptes

**Dans les relevés Qonto** : les factures fournisseurs mentionnent le numéro de TVA belge du prestataire (format `BE 0xxx.xxx.xxx`). Vérifier la TVA facturée correspond au taux attendu.

**ATTENTION** : l'ACP n'est en principe pas assujettie à la TVA pour ses activités de gestion d'un immeuble résidentiel. Elle paie la TVA sur ses achats mais ne la récupère pas. Bien distinguer les montants HTVA et TVAC dans la comptabilité.

## Rapprochement Bancaire

Croiser les transactions Qonto avec :
1. Les appels de fonds émis (comptes 411, 412, 414)
2. Les paiements fournisseurs (compte 401)
3. Le solde comptable (compte 501)

Vérification : solde Qonto au jour J = solde du compte 501.

Pour le fonds de réserve : vérifier séparément le compte épargne (compte 502 dans la comptabilité) — ce compte doit être distinct du compte courant de fonctionnement (obligation légale, art. 3.89 §2 Cc belge).

## Identifiant BCE Fournisseur

En Belgique, le numéro SIRET français est remplacé par le **numéro BCE** au format `0xxx.xxx.xxx`. Les factures des fournisseurs belges doivent mentionner :
- Leur numéro BCE
- Leur numéro de TVA (format `BE 0xxx.xxx.xxx`)
- Un IBAN belge pour le virement

Le connecteur peut être configuré pour extraire et valider le numéro BCE à partir des descriptions de transactions Qonto.

## IBAN Belge

Le compte bancaire de l'ACP en Belgique utilise un IBAN au format :

```
BE XX XXXX XXXX XXXX
```

Exemple : `BE68 5390 0754 7034`

Les virements SEPA (Single Euro Payments Area) s'appliquent en Belgique. Utiliser la référence structurée (`+++XXX/XXXX/XXXXX+++`) ou la référence libre pour le rapprochement des paiements reçus.

## Référence de Virement Structurée

Pour faciliter le rapprochement automatique des paiements de charges, recommander aux copropriétaires d'utiliser une référence de virement standardisée :

```
Format : {{lot}}-{{trimestre}}-{{année}}
Exemple : 007-T2-2026
```

Qonto permet de filtrer les transactions par référence, ce qui simplifie le rapprochement.

## Facturation Électronique (e-Invoicing) et Peppol

**Peppol en Belgique** : la Belgique a adopté la facturation électronique via le réseau **Peppol** (Pan-European Public Procurement On-Line). Depuis 2024, la facturation électronique B2B est progressivement obligatoire pour les entreprises belges inscrites à la BCE.

**Impact pour l'ACP :**
- Si l'ACP est inscrite à la BCE et dispose d'un numéro d'entreprise, ses **fournisseurs** peuvent lui envoyer des factures électroniques via Peppol (format UBL ou CII).
- L'ACP n'est pas nécessairement tenue d'émettre des factures électroniques (ses « appels de fonds » ne sont pas des factures au sens TVA, sauf si l'ACP est assujettie à la TVA).
- **Vérifier avec chaque fournisseur** s'il envoie ses factures via Peppol ou en PDF traditionnel.

**Identifiant Peppol** : si l'ACP est inscrite à la BCE, son identifiant Peppol est généralement au format `0088:BE0xxx.xxx.xxx` (numéro BCE préfixé du code pays).

**Dans Qonto** : Qonto Belgique supporte la réception de factures électroniques. Configurer la boîte de réception e-invoicing dans le dashboard Qonto si l'ACP souhaite recevoir les factures fournisseurs directement dans l'outil (évite la ressaisie manuelle).
