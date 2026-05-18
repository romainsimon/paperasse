# Facturation Électronique B2B Obligatoire — Belgique 2026

`last_updated: 2026-05-15`

## Textes de référence

- **AR du 29 octobre 2024** modifiant l'AR n°1 d'exécution du Code de la TVA (obligation e-facture B2B)
- **Loi du 2 février 2021** portant diverses dispositions en matière de numérisation (base législative)
- **Directive européenne 2014/55/UE** (facturation électronique dans les marchés publics)
- **Norme EN 16931** (format sémantique européen de la facture électronique)
- **Standard Peppol BIS Billing 3.0** (format technique UBL 2.1)
- **Source** : https://mercurius.belgium.be et https://finances.belgium.be

---

## Calendrier

### Depuis le 1er janvier 2026

| Obligation | Qui |
|-----------|-----|
| **Émission** de factures électroniques Peppol | Toutes les entreprises assujetties à la TVA (B2B belge) |
| **Réception** de factures électroniques Peppol | Toutes les entreprises assujetties à la TVA |

> Contrairement à la France (calendrier phasé PME/GE), la Belgique a opté pour une obligation simultanée pour toutes les tailles d'entreprises dès le 01/01/2026.

### Historique B2G (marchés publics)

La facturation électronique via Mercurius est obligatoire pour les marchés publics belges depuis **2014** (directive européenne). L'obligation 2026 est une extension au secteur privé B2B.

---

## Qui est concerné

**Toutes les entreprises assujetties à la TVA belge**, y compris :
- Les entreprises en **franchise de la taxe** (art. 56bis CTVA) — assujetties mais ne collectent pas la TVA
- Les SRL, SA, SNC, SCS, SC
- Les indépendants assujettis
- Les ASBL si elles exercent des activités économiques soumises à TVA

### Opérations concernées

- Livraisons de biens B2B entre assujettis belges
- Prestations de services B2B entre assujettis belges
- Acomptes liés à ces opérations

### Opérations non concernées par l'e-facture Peppol

| Opération | Règle |
|-----------|-------|
| B2C (particuliers) | Facture PDF ou papier autorisée |
| Export hors UE | Facture PDF autorisée (exonération TVA) |
| Livraisons/services intra-UE vers clients étrangers | Règles Peppol du pays du client (pas Peppol BE obligatoire) |
| Opérations exonérées sans lien TVA | Selon nature de l'opération |

---

## Architecture du système belge

### Les acteurs

```
Entreprise A ──→ Prestataire Peppol A ──→ Mercurius (hub belge) ──→ Prestataire Peppol B ──→ Entreprise B
                        │                        │
                        └────────────────────────┘
                              Réseau Peppol
                              (interopérabilité UE)
                                     │
                                     ▼
                              SPF Finances
                              (contrôle fiscal)
```

### Mercurius

**Mercurius** est le hub Peppol belge (https://mercurius.belgium.be), géré par le gouvernement belge. Il :

1. Sert de point d'accès central au réseau Peppol belge
2. Gère l'annuaire des identifiants Peppol belges (`0208:[BCE]`)
3. Route les factures entre les prestataires Peppol des émetteurs et récepteurs
4. Est connecté au réseau Peppol européen (interopérabilité avec la France, Allemagne, etc.)

### Prestataires Peppol (Access Points)

Les prestataires Peppol sont des opérateurs privés connectés au réseau Peppol. Toute entreprise doit choisir un prestataire pour émettre et recevoir des factures électroniques.

Voir [plateformes-agreees.md](plateformes-agreees.md) pour le comparatif.

---

## Format technique

**Format obligatoire :** Peppol BIS Billing 3.0 (UBL 2.1 conforme EN 16931)

| Élément | Valeur |
|---------|--------|
| Format XML | UBL 2.1 |
| Profil | Peppol BIS Billing 3.0 |
| Norme sémantique | EN 16931 |
| Identifiant émetteur | `0208:[BCE sans points]` |
| Identifiant récepteur | `0208:[BCE sans points]` |

Voir [formats-facturx.md](formats-facturx.md) pour la structure XML complète.

---

## Mentions obligatoires (depuis 01/01/2026)

En plus des mentions TVA habituelles (art. 53 CTVA), les factures électroniques doivent inclure dans le XML :

| Champ XML | Contenu |
|-----------|---------|
| `EndpointID schemeID="0208"` | Numéro BCE sans points (émetteur ET récepteur) |
| `CompanyID schemeID="0208"` | Numéro BCE dans PartyLegalEntity |
| `PartyTaxScheme/CompanyID` | Numéro TVA belge (BE0xxx.xxx.xxx) |
| `InvoiceTypeCode` | 380 (facture) / 381 (avoir) / 386 (acompte) |
| `TaxCategory/ID` | S (standard) / Z (zéro) / E (exonéré) / AE (autoliquidation) |

Voir [mentions-obligatoires.md](mentions-obligatoires.md) pour la liste complète.

---

## Conservation

Les factures électroniques Peppol doivent être conservées **10 ans** en format informatique (XML UBL original).

Voir [numerotation-conservation.md](numerotation-conservation.md) pour les règles de conservation.

---

## Sanctions

| Infraction | Sanction |
|------------|----------|
| Facture B2B non émise au format Peppol | Amende administrative (montant fixé par AR d'application) |
| Absence d'enregistrement dans l'annuaire Peppol | Impossibilité de recevoir des factures électroniques |
| Non-conservation 10 ans | Sanctions comptables (loi du 17 juillet 1975) |

> Les montants précis des amendes pour non-respect de l'e-facturation B2B sont à confirmer auprès du SPF Finances (https://finances.belgium.be) — le décret d'application précise les sanctions.

---

## Comparaison Belgique vs France

| Aspect | Belgique | France |
|--------|----------|--------|
| Obligation B2B depuis | 01/01/2026 (toutes entreprises) | 01/09/2026 (réception) / 2027 (émission PME) |
| Format | Peppol BIS 3.0 (UBL) | Factur-X (PDF/A-3 + XML CII) ou UBL ou CII |
| Hub | Mercurius (gouvernemental) | PPF (annuaire) + Plateformes Agréées (privées) |
| Identifiant | `0208:[BCE]` | `0002:[SIRET]` |
| Phasage | Pas de phasage — obligation unique | Phasage GE/ETI puis PME |
| B2G | Obligatoire depuis 2014 | Obligatoire depuis 2020 (Chorus Pro) |
