# Mentions Obligatoires sur les Factures (Belgique)

`last_updated: 2026-05-15`

Base légale : **Code de la TVA (CTVA)** — art. 53, 53decies; **loi du 2 août 2002** sur les retards de paiement (B2B); **CSA** pour les mentions légales de la société.

---

## Mentions générales (toute facture belge)

### Identité de l'émetteur

| Mention | Base légale | Exemple |
|---------|-------------|---------|
| Dénomination sociale | Art. 53 CTVA + CSA | "DevStudio SRL" |
| Forme juridique | CSA | "SRL" |
| Adresse du siège social | Art. 53 CTVA | "Rue de la Loi 1, 1000 Bruxelles" |
| Numéro BCE | Art. 53 CTVA + CSA | "BCE 0xxx.xxx.xxx" |
| Numéro de TVA belge | Art. 53 CTVA | "TVA BE0xxx.xxx.xxx" |
| IBAN et BIC | Recommandé | "IBAN BE68 5390 0754 7034 / BIC BNAGBEBB" |

### Identité du client

| Mention | Base légale | Exemple |
|---------|-------------|---------|
| Dénomination sociale ou nom | Art. 53 CTVA | "Client SA" |
| Adresse | Art. 53 CTVA | "Avenue Louise 50, 1050 Bruxelles" |
| Numéro de TVA belge (si assujetti) | Art. 53 CTVA | "TVA BE0987.654.321" |
| Numéro BCE (si société belge) | Recommandé | "BCE 0987.654.321" |

### Informations sur la facture

| Mention | Base légale | Détail |
|---------|-------------|--------|
| Numéro de facture | Art. 53 CTVA | Séquence chronologique continue, unique |
| Date d'émission | Art. 53 CTVA | Date du jour de facturation |
| Date de livraison ou d'exécution | Art. 53 CTVA | Si différente de la date de facture |

### Description des biens/services

| Mention | Base légale | Détail |
|---------|-------------|--------|
| Désignation précise | Art. 53 CTVA | Nature de la prestation ou du bien |
| Quantité | Art. 53 CTVA | Nombre d'unités |
| Prix unitaire HTVA | Art. 53 CTVA | Par unité |

### Montants

| Mention | Base légale | Détail |
|---------|-------------|--------|
| Montant total HTVA | Art. 53 CTVA | Somme des lignes |
| Taux de TVA applicable | Art. 53 CTVA | Par taux distinct (21%, 12%, 6%) |
| Montant de TVA | Art. 53 CTVA | Par taux distinct |
| Montant total TVAC | Art. 53 CTVA | HTVA + TVA |
| Remises, rabais, ristournes | Art. 53 CTVA | Si applicable |

### Conditions de paiement (B2B)

| Mention | Base légale | Détail |
|---------|-------------|--------|
| Date d'échéance | Loi 2 août 2002 | Délai de paiement convenu (max 30 jours légal, 60 jours max avec accord) |
| Taux de pénalités de retard | Loi 2 août 2002 | Minimum : taux BCE + 8 points (taux de référence semestriel) |
| Indemnité forfaitaire de recouvrement | Loi 2 août 2002 | **40 EUR** (obligatoire pour B2B) |
| IBAN de paiement | Recommandé | Format belge BE + 14 chiffres |

---

## Mentions spéciales selon le régime TVA

### Franchise de la taxe (art. 56bis CTVA)

```
Régime particulier de franchise — TVA non applicable
```

La facture ne doit comporter **aucun montant de TVA**. Montant HTVA = montant TVAC.

### Autoliquidation — services intra-UE (B2B)

Pour les prestations de services à des clients professionnels dans l'UE :

```
Autoliquidation — TVA due par le preneur, art. 51 §2 CTVA
```

### Autoliquidation — régime cocontractant (construction)

Pour les travaux de construction et assimilés entre assujettis belges (régime cocontractant) :

```
Autoliquidation — régime cocontractant, art. 20 AR n°1
```

### Exonération — exportation (hors UE)

```
Exonération de TVA — exportation, art. 39 CTVA
```

### Exonération — livraison intracommunautaire (B2B intra-UE)

```
Exonération de TVA — livraison intracommunautaire, art. 39bis CTVA
```

### TVA à 0% — autres opérations exonérées

```
Exonération de TVA — [motif], art. [X] CTVA
```

---

## Facture électronique Peppol (B2B belge depuis 01/01/2026)

Pour les factures B2B entre assujettis belges, les mentions ci-dessus doivent être encodées dans le format XML Peppol BIS 3.0.

**Identifiant Peppol de l'émetteur :** `0208:[numéro BCE sans points]`
**Numéro TVA dans le XML :** `BE0xxx.xxx.xxx` (champ `PartyTaxScheme/CompanyID`)

---

## Avoirs (notes de crédit)

Un avoir doit comporter :
- Toutes les mentions d'une facture
- La mention "Note de crédit" ou "Avoir"
- La **référence à la facture d'origine** (numéro et date)
- Le motif de l'avoir (retour, erreur, geste commercial)
- Les montants en négatif ou avec mention explicite

L'avoir suit sa propre séquence de numérotation (ex : AV-2026-001) ou la même séquence que les factures.

---

## Factures d'acompte

Mentions identiques à une facture classique, plus :
- La mention "Facture d'acompte"
- Le montant de l'acompte HTVA et TVAC
- La référence au devis ou contrat

La facture finale déduit les acomptes déjà facturés.

---

## Facture simplifiée (ticket de caisse)

Pour les ventes au détail B2C avec montant TVAC ≤ 400 EUR (ou sur autorisation SPF Finances) :

Mentions minimales :
- Date d'émission
- Identité du vendeur (dénomination + numéro BCE + adresse)
- Désignation des biens/services
- Taux de TVA et montant TVAC

---

## Cas particuliers

### Facture en devise étrangère

Le montant de TVA doit être converti en EUR au taux de change du jour de l'opération (taux BCE). Indiquer le taux utilisé.

### Autofacturation

Quand le client émet la facture pour le compte du fournisseur (autofacturation, art. 53 §5 CTVA). Mention obligatoire : *"Autofacturation"* et accord préalable du fournisseur.

### Facture adressée à un client étranger hors UE

Mêmes mentions obligatoires, mais le numéro TVA du client peut être son identifiant fiscal étranger. Mention exonération export.

---

## Tableau récapitulatif — Mentions par situation

| Situation | Mentions spécifiques |
|-----------|---------------------|
| B2B belge normal | TVA 21%/12%/6%, numéros BCE/TVA des deux parties |
| Franchise (art. 56bis) | "Franchise — TVA non applicable" |
| Export hors UE | "Exonération art. 39 CTVA" |
| Livraison IC B2B | "Exonération art. 39bis CTVA" + numéro TVA client vérifié VIES |
| Services IC B2B | "Autoliquidation art. 51 §2 CTVA" |
| Construction (cocontractant) | "Autoliquidation art. 20 AR n°1" |
| B2B Peppol électronique | XML UBL Peppol BIS 3.0 via Mercurius |
