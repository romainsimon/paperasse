# Workflow Facturation — Détails opérationnels (Belgique)

`last_updated: 2026-05-15`

Chargé à la demande depuis `comptable/SKILL.md` section **Facturation**.

## Contents
- Checklists (mise en conformité Peppol, génération, validation)
- Format JSON d'une facture belge
- Articulation facture ↔ écriture comptable PCMN
- Pipeline Stripe → Facture → Qonto
- Numérotation par année
- Avoirs (notes de crédit) belges
- Réception des e-factures Peppol (depuis 01/01/2026)

---

## Checklists

### Mise en conformité facturation électronique Peppol (01/01/2026)

```
Conformité e-facturation Peppol — {{company.name}} — BCE {{company.bce}}
- [ ] Vérifier statut : assujettie TVA (même en franchise)
- [ ] S'inscrire auprès d'un prestataire Peppol (Qonto, Clearfacts, Unifiedpost, Isabel, Billit...)
- [ ] Obtenir l'identifiant Peppol : 0208:[BCE sans points]
- [ ] Enregistrer l'identifiant dans l'annuaire Peppol via le prestataire
- [ ] Configurer la réception des factures sur le prestataire
- [ ] Tester la réception d'une facture de test (via mercurius.belgium.be)
- [ ] Informer les fournisseurs de votre identifiant Peppol
- [ ] Mettre à jour les mentions sur les factures émises (numéro BCE, numéro TVA BE0...)
- [ ] Configurer l'émission Peppol pour les clients B2B belges
- [ ] Ajouter les numéros BCE des clients belges dans company.json / CRM
```

### Génération d'une facture conforme (Belgique)

```
Facture — {{company.name}} → {{client}}
- [ ] Numéro de facture (séquence chronologique continue)
- [ ] Date d'émission
- [ ] Identité émetteur complète (dénomination, forme juridique, adresse, BCE, numéro TVA BE0...)
- [ ] IBAN belge (BE + 14 chiffres) et BIC
- [ ] Identité client complète (dénomination, adresse)
- [ ] Numéro TVA belge du client (si assujetti) — format BE0xxx.xxx.xxx
- [ ] Description détaillée des prestations / biens
- [ ] Quantité, prix unitaire HTVA, montant total HTVA
- [ ] Taux et montant TVA (21% / 12% / 6%) ou mention d'exonération/franchise
- [ ] Montant total TVAC
- [ ] Date d'échéance de paiement
- [ ] Conditions de paiement (délai)
- [ ] Pénalités de retard (taux légal BCE + 8 pts) + indemnité forfaitaire 40 EUR (B2B)
- [ ] Mention spéciale si applicable (franchise art. 56bis, autoliquidation art. 51 §2, exonération art. 39/39bis...)
- [ ] [B2B belge 2026+] Format Peppol BIS 3.0 (UBL) obligatoire
```

### Validation d'une facture existante

```
Validation — Facture {{numéro}}
- [ ] Numéro présent et conforme à la séquence
- [ ] Date d'émission présente
- [ ] Émetteur : dénomination, BCE, numéro TVA BE0..., adresse, forme juridique
- [ ] Client : dénomination, adresse
- [ ] Client assujetti belge : numéro TVA BE0... (vérifiable sur https://kbopub.economie.fgov.be)
- [ ] Désignation précise des biens/services
- [ ] Quantité présente pour chaque ligne
- [ ] Prix unitaire HTVA présent pour chaque ligne
- [ ] Montant HTVA par ligne
- [ ] TVA : taux (21%/12%/6%), montant, ou mention d'exonération valide
- [ ] Montant TVAC total
- [ ] Date d'échéance, conditions de paiement
- [ ] Pénalités de retard + indemnité forfaitaire 40 EUR (si B2B)
- [ ] IBAN belge mentionné (format BE + 14 chiffres)
- [ ] Mention franchise TVA si applicable (art. 56bis CTVA)
- [ ] [B2B belge] Format Peppol BIS 3.0 si émission électronique
```

---

## Format JSON d'une facture belge

Utilisé par `scripts/generate-peppol.js`, `scripts/validate-facture.js` et produit par `scripts/import-stripe-invoices.js`.

```json
{
  "number": "F-2026-001",
  "date": "2026-09-15",
  "due_date": "2026-10-15",
  "type": "invoice",
  "b2b_be": true,
  "client": {
    "name": "Client SA",
    "address": "Avenue Louise 50, 1050 Bruxelles",
    "bce": "0987654321",
    "vat_number": "BE0987654321",
    "peppol_id": "0208:0987654321"
  },
  "lines": [
    {
      "description": "Développement application web",
      "quantity": 10,
      "unit": "heures",
      "unit_price": 100.00,
      "vat_rate": 21
    }
  ],
  "payment": {
    "terms": "30 jours date de facture",
    "method": "virement",
    "iban": "BE68 5390 0754 7034",
    "bic": "BNAGBEBB"
  }
}
```

**Champs clés belges :**
- `b2b_be` : `true` si client assujetti belge → génération Peppol obligatoire
- `client.bce` : numéro BCE du client (sans points)
- `client.vat_number` : `BE0xxx.xxx.xxx`
- `client.peppol_id` : `0208:[BCE]`

---

## Articulation facture ↔ écriture comptable (PCMN)

### Facture émise (vente de services B2B, TVA 21%)

```
1. Générer la facture conforme (mentions CTVA, format Peppol si B2B belge)
2. Écriture PCMN :
   Débit 400 Clients               1 210,00    (montant TVAC)
   Crédit 701 Prestations services 1 000,00    (HTVA)
   Crédit 451 TVA à payer            210,00    (TVA 21%)
3. Transmettre via le prestataire Peppol (si B2B belge)
```

### Facture émise (franchise art. 56bis CTVA, sans TVA)

```
Débit 400 Clients               1 000,00    (pas de TVA)
Crédit 701 Prestations services 1 000,00
```

### Facture émise (client UE B2B, autoliquidation)

```
Débit 400 Clients               1 000,00    (pas de TVA belge)
Crédit 701 Prestations services 1 000,00
```
Mention facture : *"Autoliquidation — TVA due par le preneur, art. 51 §2 CTVA"*

---

## Pipeline Stripe → Facture → Qonto

Utilisé quand les encaissements arrivent par Stripe et que le compte bancaire est Qonto (IBAN BE) :

1. **Import** : `node scripts/import-stripe-invoices.js --start YYYY-MM-DD --end YYYY-MM-DD`
   - Récupère les `invoices` Stripe au statut `paid` de la période
   - Génère un JSON par facture dans `data/invoices/F-YYYY-NNN.json`
   - Numérote via `invoicing.next_numbers[year]` (remise à zéro au 1er janvier)
   - Convertit les montants en EUR via `balance_transaction.exchange_rate`
   - Détermine si B2B belge (numéro TVA belge présent dans Stripe)
   - Maintient `data/invoices/index.json` (map `stripe_id → invoice_number`) pour l'idempotence

2. **Génération Peppol ou PDF** :
   - B2B belge : `node scripts/generate-peppol.js --invoice data/invoices/F-YYYY-NNN.json` → UBL XML + PDF
   - B2C ou B2B étranger : `node scripts/generate-pdf.js --invoice data/invoices/F-YYYY-NNN.json` → PDF

3. **Transmission Peppol (B2B belge)** : `node scripts/send-peppol.js --invoice data/invoices/F-YYYY-NNN.json`

4. **Justificatif Qonto** : `node scripts/upload-qonto-attachments.js --upload`
   - Matche chaque crédit Stripe sur Qonto avec les factures émises dans la fenêtre temporelle
   - Génère un PDF récapitulatif listant les factures du payout
   - Uploade via `POST /v2/transactions/{uuid}/attachments` (max 5 pièces, 30 MB/pièce)

**Routine recommandée** : hebdomadaire (ex. lundi matin), paramétrable via cron. Les scripts sont idempotents.

Détails complets : voir [stripe-sync.md](stripe-sync.md).

---

## Numérotation par année

Convention : **séquence chronologique continue réinitialisée au 1er janvier**.

- `invoicing.next_numbers` est une map `{ "YYYY": N }` — pas un entier unique
- `import-stripe-invoices.js` utilise `next_numbers[year]` où `year` = année du `--start`
- Format : `{prefix}-YYYY-NNN` (ex. `F-2026-001`)
- L'avoir reprend le format avec `avoir_prefix` (ex. `AV-2026-001`)
- Aucun trou dans la séquence : un numéro émis ne peut pas être supprimé

---

## Avoirs (notes de crédit) belges

Un refund Stripe → **avoir / note de crédit** (note de crédit) côté facturation belge :

1. Récupérer le refund Stripe et la facture d'origine (via `charge.invoice`)
2. Créer un avoir : `number` = `AV-YYYY-NNN` (séquence séparée), `type: "credit_note"`, référencer la facture d'origine
3. Mentions obligatoires : référence à la facture originale, motif, montants en négatif
4. Si B2B belge : générer le XML Peppol avec `InvoiceTypeCode 381` (note de crédit)
5. Écriture comptable PCMN :
   ```
   Débit 701 Prestations services    XXX,XX
   Débit 451 TVA à payer              XX,XX
   Crédit 400 Clients                XXX,XX
   ```

---

## Réception des e-factures Peppol (obligation 01/01/2026)

**Toute entreprise assujettie TVA** doit pouvoir recevoir des factures électroniques Peppol depuis le 01/01/2026.

Checklist réception :

- [ ] `einvoicing.peppol_id` défini dans `company.json` (ex : `0208:0123456789`)
- [ ] Compte actif sur le prestataire Peppol choisi
- [ ] Identifiant Peppol enregistré dans l'annuaire via le prestataire
- [ ] `einvoicing.reception_ready: true` dans `company.json`
- [ ] Fournisseurs informés de l'identifiant Peppol
- [ ] Workflow de rapprochement des factures entrantes défini (prestataire → comptabilité → règlement)
- [ ] Format de lecture : XML UBL 2.1 Peppol BIS 3.0

Voir [setup-facturation.md](setup-facturation.md) pour la configuration et [plateformes-agreees.md](plateformes-agreees.md) pour le choix d'un prestataire.
