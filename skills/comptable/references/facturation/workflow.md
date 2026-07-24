# Workflow Facturation — Détails opérationnels

Chargé à la demande depuis `comptable/SKILL.md` section **Facturation**.

## Contents
- Checklists (mise en conformité, génération, validation)
- Format JSON d'une facture
- Articulation facture ↔ écriture comptable
- Pipeline Stripe → Facture → Qonto
- Numérotation par année
- Refunds et avoirs Stripe
- Réception des e-factures (1er septembre 2026)

## Checklists

### Mise en conformité facturation électronique 2026

```
Conformité e-facturation — {{company.name}}
- [ ] Vérifier statut : assujettie TVA (même en franchise)
- [ ] Déterminer taille entreprise (GE / ETI / PME / micro)
- [ ] Identifier échéances (réception : sept. 2026 / émission : sept. 2026 ou 2027)
- [ ] Choisir une plateforme agréée (PA)
- [ ] Créer un compte sur la PA choisie
- [ ] Configurer la réception des factures sur la PA
- [ ] Tester la réception d'une facture de test
- [ ] Informer les fournisseurs de votre PA de réception
- [ ] Mettre à jour les mentions sur les factures émises (SIREN client, catégorie)
- [ ] Configurer l'émission sur la PA (quand l'obligation s'applique)
- [ ] Configurer l'e-reporting si opérations B2C ou international
```

### Génération d'une facture conforme

```
Facture — {{company.name}} → {{client}}
- [ ] Numéro de facture (séquence chronologique continue)
- [ ] Date d'émission
- [ ] Identité émetteur complète (nom, SIREN, SIRET, adresse, forme juridique)
- [ ] Identité client complète (nom, adresse, SIREN si professionnel)
- [ ] Numéro TVA intracommunautaire (si régime réel)
- [ ] Description détaillée des prestations / biens
- [ ] Quantité, prix unitaire HT, montant total HT
- [ ] Taux et montant TVA (ou mention d'exonération)
- [ ] Montant total TTC
- [ ] Date d'échéance de paiement
- [ ] Conditions de paiement
- [ ] Pénalités de retard et indemnité forfaitaire
- [ ] [2026+] **Catégorie d'opération** (biens / services / mixte) — obligation distincte de la description, toujours flagger si absente (biens / services / mixte)
- [ ] [2026+] SIREN du client (si B2B domestique)
- [ ] [2026+] Adresse de livraison (si différente de facturation)
- [ ] Mention spéciale si applicable (franchise TVA, autoliquidation, etc.)
```

### Validation d'une facture existante

```
Validation — Facture {{numéro}}
- [ ] Numéro présent et conforme à la séquence
- [ ] Date d'émission présente
- [ ] Émetteur : nom, SIREN, SIRET, adresse, forme juridique
- [ ] Client : nom, adresse
- [ ] Client : SIREN (obligatoire 2026+ pour B2B)
- [ ] Désignation précise des biens/services (distincte de quantité/prix)
- [ ] **Quantité** présente pour chaque ligne (mention distincte)
- [ ] **Prix unitaire HT** présent pour chaque ligne (mention distincte)
- [ ] Montant HT par ligne
- [ ] TVA : taux, montant, ou mention d'exonération valide
- [ ] Montant TTC
- [ ] Date d'échéance, conditions de paiement
- [ ] Pénalités de retard (taux, indemnité forfaitaire 40 EUR)
- [ ] [2026+] **Catégorie d'opération** (biens / services / mixte) — obligation distincte de la description, toujours flagger si absente
- [ ] [2026+] Adresse de livraison si différente
- [ ] Mention franchise TVA si applicable (art. 293 B du CGI)
- [ ] Format Factur-X si émission électronique
```

## Format JSON d'une facture

Utilisé par `scripts/generate-facturx.js`, `scripts/validate-facture.js` et produit par `scripts/import-stripe-invoices.js`. Schéma complet dans `data/invoices/_template.json`.

```json
{
  "number": "F-2026-001",
  "date": "2026-09-15",
  "due_date": "2026-10-15",
  "type": "invoice",
  "category": "services",
  "client": {
    "name": "Client SAS",
    "address": "10 avenue de la République, 75011 Paris",
    "siren": "987654321"
  },
  "lines": [
    {
      "description": "Développement application web",
      "quantity": 10,
      "unit": "jours",
      "unit_price": 500.00
    }
  ],
  "payment": {
    "terms": "30 jours date de facture",
    "method": "virement"
  }
}
```

## Articulation facture ↔ écriture comptable

1. Générer la facture conforme (mentions, format, numérotation)
2. Enregistrer l'écriture : 706/707 (produits), 411 (créance client), 44571 (TVA collectée si régime réel)
3. Transmettre via la PA (quand l'obligation s'applique)

## Pipeline Stripe → Facture → Qonto

Utilisé quand les encaissements arrivent par Stripe et que le compte bancaire est Qonto :

1. **Import** : `node scripts/import-stripe-invoices.js --start YYYY-MM-DD --end YYYY-MM-DD`
   - Récupère les `invoices` Stripe au statut `paid` de la période
   - Génère un JSON par facture dans `data/invoices/F-YYYY-NNN.json`
   - Numérote via `invoicing.next_numbers[year]` (reset au 1er janvier)
   - Convertit les montants en EUR via `balance_transaction.exchange_rate`
   - Maintient `data/invoices/index.json` (map `stripe_id → invoice_number`) pour l'idempotence
2. **Génération PDF + XML Factur-X** : `node scripts/generate-facturx.js --invoice data/invoices/F-YYYY-NNN.json`
3. **Justificatif Qonto** : `node scripts/upload-qonto-attachments.js --upload`
   - Matche chaque crédit Stripe sur Qonto avec les factures émises dans la fenêtre temporelle
   - Génère un PDF récapitulatif listant les factures du payout
   - Uploade via `POST /v2/transactions/{uuid}/attachments` (max 5 pièces, 30 MB/pièce)

**Routine recommandée** : hebdomadaire (ex. lundi matin), paramétrable via cron. Les deux scripts sont idempotents.

Détails complets : voir [stripe-sync.md](stripe-sync.md).

## Numérotation par année

Convention : **séquence chronologique continue réinitialisée au 1er janvier**.

- `invoicing.next_numbers` est une map `{ "YYYY": N }` — pas un entier unique
- `import-stripe-invoices.js` utilise `next_numbers[year]` où `year` = année du `--start`
- Format : `{prefix}-YYYY-NNN` (ex. `F-2026-001`)
- L'avoir reprend le format avec `avoir_prefix` (ex. `AV-2026-001`)
- Aucun trou dans la séquence : un numéro émis ne peut pas être supprimé

## Refunds et avoirs Stripe

Un `refund` Stripe → **avoir** (note de crédit) côté facturation française :

1. Récupérer le refund Stripe et la facture d'origine (via `charge.invoice`)
2. Créer un avoir : `number` = `AV-YYYY-NNN` (nouvelle séquence ou séquence facture selon pratique), `type: "credit_note"`, référencer la facture d'origine
3. Mentions obligatoires avoir : voir `data/facturation/mentions-obligatoires.json` (clé `avoir`)
4. Écriture comptable : extourner 706/707 et 411, ajuster 44571 si TVA

## Réception des e-factures (obligation 1er septembre 2026)

**Toute entreprise assujettie TVA (y compris en franchise)** doit pouvoir recevoir des factures électroniques via une PA au 1er septembre 2026.

Checklist réception :

- [ ] `einvoicing.pa` défini dans `company.json`
- [ ] Compte actif sur la PA choisie
- [ ] `einvoicing.reception_ready: true` dans `company.json`
- [ ] Fournisseurs informés de l'identifiant PEPPOL (`einvoicing.peppol_id`)
- [ ] Workflow de rapprochement des factures entrantes défini (PA → comptabilité → règlement)
- [ ] Format de lecture : Factur-X (PDF/A-3 + XML), UBL ou CII

Voir [setup-facturation.md](setup-facturation.md) pour la configuration et [plateformes-agreees.md](plateformes-agreees.md) pour le choix d'une PA.
