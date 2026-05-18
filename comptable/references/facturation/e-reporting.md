# Obligations de Reporting TVA (Belgique)

`last_updated: 2026-05-15`

## Contexte belge

En Belgique, il n'existe pas de système d'e-reporting au sens français (transmission systématique de données de transaction à l'administration). Les obligations de reporting TVA belges sont les suivantes :

1. **Déclaration TVA périodique** (mensuelle ou trimestrielle) via Intervat
2. **Listing TVA annuel** (clients assujettis belges)
3. **État récapitulatif intracommunautaire** (état client IC)
4. **Facturation électronique B2B** via Peppol/Mercurius (depuis le 01/01/2026)

---

## 1. Déclaration TVA Périodique (Intervat)

Base légale : art. 53 CTVA.

Portail : **Intervat** (https://intervat.minfin.fgov.be)

### Régime mensuel (CA > 2 500 000 € TVAC)

| Période | Dépôt et paiement |
|---------|-------------------|
| Mois M  | 20 du mois M+1    |

### Régime trimestriel (CA ≤ 2 500 000 € TVAC)

| Trimestre | Dépôt et paiement |
|-----------|-------------------|
| T1 (janv-mars) | 20 avril |
| T2 (avr-juin) | 20 juillet |
| T3 (juil-sept) | 20 octobre |
| T4 (oct-déc) | 20 janvier N+1 |

**Contenu de la déclaration :** Grilles TVA (bases imposables par taux, TVA collectée, TVA déductible, solde à payer ou crédit). La déclaration couvre toutes les opérations imposables en Belgique.

---

## 2. Listing TVA Annuel — Obligation spécifique belge

Base légale : art. 53quinquies CTVA.

**Tout assujetti belge** doit transmettre annuellement la liste de ses clients assujettis à la TVA belge.

### Conditions de déclaration

| Critère | Seuil |
|---------|-------|
| CA annuel par client assujetti belge | > **250 EUR** (HTVA) |

### Délai

**31 mars** de l'année suivante (via Intervat — section "Listing clients annuel").

### Données à déclarer par client

- Numéro de TVA belge du client (format BE0xxx.xxx.xxx)
- Montant total des opérations (HTVA) de l'année
- Montant total de TVA facturée

### Cas particuliers

| Situation | Règle |
|-----------|-------|
| Franchise (art. 56bis CTVA) | Listing obligatoire si CA > 0 (même sans TVA facturée) |
| Seules opérations B2C | Pas de listing (listing ne concerne que les clients assujettis) |
| Clients intra-UE | Non inclus dans le listing belge (couverts par l'état IC) |

### Sanctions

Amende administrative en cas de non-dépôt ou dépôt tardif. Le listing doit être déposé même si aucun client ne dépasse le seuil (dépôt négatif).

---

## 3. État Récapitulatif Intracommunautaire (État client IC)

Base légale : art. 53sexies CTVA.

Déclaration des livraisons intracommunautaires de biens et des prestations de services intra-UE B2B (autoliquidation par le preneur étranger).

### Fréquence

| Régime TVA | Fréquence état IC |
|-----------|-------------------|
| Mensuel   | Mensuel (20 du mois M+1) |
| Trimestriel | Trimestriel (20 du mois suivant le trimestre) |

### Données par client UE

- Numéro TVA intracommunautaire du client
- Code pays
- Montant total des opérations (HTVA)
- Type d'opération (livraison biens = L, services = S, transferts = T)

**Dépôt :** Via Intervat (section "État récapitulatif").

**Vérification des numéros TVA intracom :** VIES (https://ec.europa.eu/taxation_customs/vies/)

---

## 4. Facturation Électronique B2B (Peppol/Mercurius)

Base légale : AR du 29 octobre 2024 modifiant l'AR n°1 relatif aux mesures TVA.

Depuis le **1er janvier 2026**, toute facture entre assujettis belges doit être émise au format électronique structuré via le réseau **Peppol**.

### Champ d'application

**Opérations concernées :**
- Livraisons de biens entre assujettis en Belgique
- Prestations de services entre assujettis en Belgique
- Acomptes liés à ces opérations

**Non concernées :**
- Opérations B2C (particuliers)
- Opérations avec des assujettis étrangers (autres règles)
- Franchise en base (art. 56bis CTVA) — pas de TVA, mais obligation e-facturation applicable si les deux parties sont assujetties

### Réseau et format

| Élément | Détail |
|---------|--------|
| Réseau | **Peppol** (réseau européen d'échange) |
| Hub belge | **Mercurius** (https://mercurius.belgium.be) |
| Format | **Peppol BIS 3.0** (UBL 2.1 conforme EN 16931) |
| Identifiant | `0208:[numéro BCE sans points]` |

### Cas pratiques

#### SaaS B2C (Stripe)

Ventes à des particuliers belges via Stripe :
- **Pas d'e-facturation Peppol obligatoire** (B2C)
- Déclaration TVA normale (grilles 47 collectée, 59 déductible)
- Si opérations B2C intra-UE > 10 000 € : OSS (guichet unique) via MyMinfin

#### Prestations B2B intra-UE

Facturation de clients professionnels dans l'UE :
- **Pas d'e-facturation Peppol belge obligatoire** pour les clients étrangers
- Exonération TVA (art. 44 Directive TVA + art. 21bis CTVA), autoliquidation par le preneur
- **État IC obligatoire** : déclarer chaque client UE dans l'état récapitulatif

#### B2B belge (assujettis → assujettis)

- **E-facturation Peppol obligatoire depuis 01/01/2026**
- Transmettre via prestataire Peppol agréé (Clearfacts, Unifiedpost, Isabel, Qonto...)
- Le client reçoit la facture dans son système via son identifiant Peppol

---

## Sanctions

| Infraction | Sanction |
|------------|----------|
| Listing TVA non déposé | Amende administrative (montant variable) |
| État IC non déposé ou erroné | Amende + rectification d'office |
| TVA non déclarée | Intérêts de retard (0,8%/mois) + amendes |
| E-facture non émise au format Peppol | Amende (à confirmer par AR d'application) |
| Déclaration TVA tardive | Amendes + intérêts 0,8%/mois |
