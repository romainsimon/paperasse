# E-reporting

## Définition

L'e-reporting est la transmission de données de transaction et de paiement à l'administration fiscale (DGFiP), via la PA choisie, pour les opérations **non couvertes** par la facturation électronique B2B domestique.

L'e-reporting ne concerne pas les factures B2B entre assujettis en France (celles-ci sont déjà transmises via la facturation électronique). Il couvre les "angles morts" : B2C, international, encaissements.

## Calendrier

| Qui | Obligation e-reporting |
|-----|----------------------|
| Grandes entreprises et ETI | 1er septembre 2026 |
| PME et micro-entreprises | 1er septembre 2027 |

## Les deux composantes

### 1. E-reporting de transactions

Concerne les opérations avec :
- Des **non-assujettis** (particuliers, associations exonérées) : ventes B2C
- Des **entreprises étrangères** (hors France) : ventes export, prestations intra-UE

**Données à transmettre :**

Pour les transactions avec des non-assujettis (B2C) :
- Période (date ou plage de dates)
- Bases HT par taux de TVA
- Montants de TVA cumulés par taux

Pour les transactions avec des entreprises étrangères :
- Mêmes données qu'une facture B2B (identité des parties, montants, TVA)
- Numéro TVA intracommunautaire au lieu du SIREN

### 2. E-reporting de paiement

Concerne les **encaissements** liés aux prestations de services, pour lesquelles la TVA est exigible à l'encaissement (régime par défaut pour les services).

**Données à transmettre :**
- Date de l'encaissement
- Montant encaissé
- Ventilation par taux de TVA

**Qui est concerné :** les entreprises dont la TVA est exigible à l'encaissement (prestations de services, sauf option pour les débits).

**Qui n'est pas concerné :** les entreprises en franchise en base de TVA (pas de TVA à déclarer) et les entreprises dont la TVA est exigible à la facturation (livraisons de biens, option pour les débits).

## Fréquence de transmission

La fréquence dépend du régime TVA de l'entreprise :

| Régime TVA | Fréquence e-reporting |
|-----------|----------------------|
| Réel normal (CA3 mensuelle) | Mensuelle |
| Réel normal (CA3 trimestrielle) | Trimestrielle |
| Réel simplifié (CA12 annuelle) | Semestrielle |
| Franchise en base | Semestrielle |

**Délai** : les données doivent être transmises au plus tard le **10ème jour** suivant la fin de la période (mois, trimestre ou semestre).

## Cas pratiques

### SaaS B2C (Stripe)

Entreprise SaaS qui vend à des particuliers via Stripe :
- **E-reporting de transactions** : transmettre les totaux B2C (bases HT + TVA par taux)
- **E-reporting de paiement** : transmettre les encaissements (dates + montants par taux TVA)
- La PA gère la transmission si les données sont saisies/importées

### Prestations intra-UE

Entreprise qui facture des clients B2B dans l'UE :
- **E-reporting de transactions** : transmettre les données de chaque facture (pas de SIREN, utiliser numéro TVA intracom)
- L'autoliquidation s'applique (TVA due par le preneur)

### Franchise en base avec ventes B2C

Auto-entrepreneur en franchise qui vend à des particuliers :
- **E-reporting de transactions** : transmettre les totaux semestriels (pas de TVA car franchise)
- **Pas d'e-reporting de paiement** : pas de TVA exigible

### Ventes export (hors UE)

- **E-reporting de transactions** : transmettre les données des factures export
- TVA exonérée (art. 262 I du CGI)

## En pratique

La PA choisie gère la transmission des données d'e-reporting. L'entreprise doit :

1. **Saisir ou importer** les données de ventes B2C et internationales dans sa PA
2. **Confirmer** les données avant chaque transmission
3. **Vérifier** que la PA transmet dans les délais

Pour les utilisateurs de Stripe : certaines PA proposent des connecteurs Stripe qui importent automatiquement les données de transaction. Vérifier lors du choix de PA.

## Sanctions

Amende de **250 EUR par transmission manquante** en e-reporting, plafonnée à 15 000 EUR par année civile.
