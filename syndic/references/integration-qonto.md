# Intégration Qonto

Le connecteur Qonto du skill comptable (`comptable/integrations/qonto/fetch.js`, ou `integrations/qonto/fetch.js` à la racine du repo Paperasse) récupère les transactions de tous les comptes d'une organisation Qonto, en lecture seule. Il ne fait ni catégorisation ni écriture : la table ci-dessous sert à l'agent pour proposer les imputations, à valider par le syndic.

## Configuration

Le compte bancaire est ouvert au nom du syndicat (art. 18 II de la loi de 1965) : l'organisation Qonto interrogée est donc celle du syndicat, avec ses propres clés API (Dashboard Qonto, Settings, Integrations, API). Le connecteur lit deux variables d'environnement :

```bash
export QONTO_ID="slug-de-l-organisation"
export QONTO_API_SECRET="cle-secrete"
```

Le bloc `qonto` de `copros/{slug}.json` (voir `copros.example.json`) sert de mémo : `env_id` et `env_secret` indiquent quelles variables exporter pour cette copropriété. Le script ne lit pas ce fichier : pour plusieurs copropriétés, le lancer une fois par copropriété, avec les clés de son organisation.

## Usage

```bash
# Toutes les transactions des comptes de l'organisation
node comptable/integrations/qonto/fetch.js

# Exercice comptable de la copropriété
node comptable/integrations/qonto/fetch.js --start 2025-07-01 --end 2026-06-30
```

Les transactions sont enregistrées dans `data/transactions/qonto-{compte}.json`, un fichier par compte bancaire de l'organisation. Le dossier `data/` est celui qui contient `integrations/` : `comptable/data/transactions/` pour la copie du skill comptable. Le script signale les ruptures de solde, signe de transactions manquantes.

## Catégorisation

Les transactions sont catégorisées selon le plan comptable des copropriétés (arrêté du 14 mars 2005, art. 7 ; liste complète dans `data/plan-comptable-copro.json`) :

| Fournisseur type | Compte copro |
|------------------|--------------|
| Nettoyage (prestataire de nettoyage) | 611 Nettoyage des locaux |
| Espaces verts | 614 Contrats de maintenance si contrat annuel, sinon 615 Entretien et petites réparations |
| Assurance immeuble | 616 Primes d'assurances |
| Chauffage : combustible, énergie, réseau de chaleur | 603 Chauffage, énergie et combustibles |
| Contrat d'entretien (chaudière, ascenseur, etc.) | 614 Contrats de maintenance |
| Eau | 601 Eau |
| Électricité des parties communes | 602 Electricité |
| Honoraires du syndic (forfait de gestion) | 6211 Rémunération du syndic |
| Honoraires du syndic sur travaux | 6221 Honoraires travaux |
| Prestations particulières du syndic | 6222 Prestations particulières |
| Frais postaux | 6213 Frais postaux |
| Frais bancaires | 662 Autres charges financières et agios |

Les comptes 617, 618, 619 et 625 n'existent pas dans ce plan : ils viennent du plan comptable général.

## Rapprochement bancaire

Croiser les transactions Qonto avec :
1. Les appels de fonds émis (comptes 450-1, 450-2, 450-5)
2. Les paiements fournisseurs (compte 401)
3. Le solde comptable de la banque (compte 512)

Vérification : solde Qonto au jour J = solde du compte 512. Le 501 est un compte à terme (fonds placés), jamais le compte courant.

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
