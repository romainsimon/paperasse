# Intégrations (collecte automatique des transactions)

Des connecteurs sont disponibles dans `integrations/` pour récupérer automatiquement les transactions bancaires et les opérations de paiement.

`last_updated: 2026-05-15`

## Qonto (banque en ligne)

Si `qonto.enabled` est `true` dans `company.json` :

```bash
npm run fetch:qonto
# ou avec filtrage par date :
node integrations/qonto/fetch.js --start 2025-01-01 --end 2025-12-31
```

Récupère toutes les transactions de tous les comptes bancaires Qonto → `data/transactions/qonto-*.json`.

**Variables d'environnement requises** : `QONTO_ID`, `QONTO_API_SECRET` (dashboard Qonto > Settings > Integrations > API).

**Note belge** : Qonto est disponible en Belgique et délivre un IBAN belge (BE). Il est également plateforme agréée pour la facturation électronique Peppol en Belgique.

## Stripe (paiements en ligne)

Si des comptes sont configurés dans `stripe_accounts` de `company.json` :

```bash
npm run fetch:stripe
# ou avec filtrage :
node integrations/stripe/fetch.js --start 2025-01-01 --end 2025-12-31 --account main
```

Récupère les balance transactions (charges, fees, payouts, refunds) et les payouts → `data/transactions/stripe-*.json`.

**Configuration dans `company.json`** :
```json
"stripe_accounts": [
  { "id": "main", "name": "Mon SaaS", "env_key": "STRIPE_SECRET" }
]
```

**Variable d'environnement** : la valeur de `env_key` doit contenir la clé secrète Stripe (`sk_live_...` ou `sk_test_...`).

## Récupérer toutes les sources

```bash
npm run fetch          # Qonto + Stripe
```

Les transactions récupérées sont au format standard Paperasse dans `data/transactions/`. Le champ `our_category` est à `null` et sera rempli lors de la catégorisation (mappage vers compte PCMN).

## Rapprochement bancaire automatisé

Avec les connecteurs Qonto + Stripe, le rapprochement bancaire peut être largement automatisé :

1. **Récupérer les transactions** : `npm run fetch`
2. **Croiser les payouts Stripe avec les crédits Qonto** : chaque payout Stripe doit correspondre à un crédit Qonto, même montant et date proche (J+2 à J+7)
3. **Identifier les écarts** : transactions Qonto sans correspondance Stripe = dépenses directes. Payouts Stripe sans crédit Qonto = payout en transit ou erreur.
4. **Valider le solde** : solde Qonto au 31/12 = solde du compte 550 dans le journal

---

## Intégrations Belges Spécifiques

### BCE API — Banque-Carrefour des Entreprises

La BCE expose une API publique permettant de rechercher des entreprises par numéro BCE, dénomination ou adresse.

**API publique (Open Data) :** https://kbopub.economie.fgov.be/kbopub/

**Usage :** Récupération automatique des informations d'une société belge à partir de son numéro BCE (équivalent SIRENE français) lors du setup de `company.json`.

```bash
# Exemple de recherche BCE (via API REST)
curl "https://kbopub.economie.fgov.be/kbopub/zoeknaamfonetischform.html?searchWord=nom&orderField=naam&start=0&length=10"
```

**Données disponibles :** Dénomination, forme juridique, siège social, date de création, objet social, dirigeants (personnes morales), statut d'activité.

**Substitut à l'API SIRENE française :** Pour le setup de `company.json`, utiliser la BCE plutôt que l'API INSEE/SIRENE.

### BNB — Centrale des Bilans

La Banque Nationale de Belgique (BNB) met à disposition les comptes annuels déposés par les entreprises belges.

**Portail dépôt :** https://cri.nbb.be (CBB — Comptes Annuels Belges)

**Consultation publique :** Via https://www.nbb.be/fr/centrale-des-bilans (données financières des entreprises)

**Usage :** Dépôt obligatoire des comptes annuels dans les 7 mois après clôture. Accès aux comptes des tiers (due diligence, analyse clients/fournisseurs).

### Intervat — SPF Finances (TVA)

Portail officiel pour les déclarations TVA belges.

**URL :** https://intervat.minfin.fgov.be

**Fonctions :**
- Dépôt déclarations TVA (mensuelle ou trimestrielle)
- Dépôt listing TVA annuel (clients assujettis)
- Dépôt état récapitulatif intracommunautaire (état client IC)
- Demande de remboursement de crédit TVA

**Accès :** Via MyMinfin (carte eID ou itsme) ou via mandataire fiscal.

### Tax-on-web / Biztax — SPF Finances (ISOC)

**URL :** https://www.taxonweb.be

Portail pour la déclaration ISOC 275 et l'IPP des dirigeants.

**Biztax :** Interface professionnelle pour mandataires fiscaux (experts-comptables, réviseurs).

### Mercurius — Peppol Belge (Facturation électronique)

Le réseau Mercurius est le hub Peppol belge pour la facturation électronique B2B.

**URL :** https://mercurius.belgium.be

**Usage :** Routage des factures électroniques entre entreprises belges (format Peppol BIS 3.0 / UBL 2.1). Obligatoire pour les factures B2B depuis le 01/01/2026.

**Identifiant Peppol :** `0208:[numéro BCE sans points]`

**Prestataires Peppol belges agréés :** Paiements.online, Unifiedpost, Isabel, Clearfacts, etc.

### DMFA — ONSS (Cotisations sociales salariés)

**URL :** https://www.socialsecurity.be (portail sécurité sociale)

Déclaration multifonctionnelle des salaires et cotisations ONSS des travailleurs.

**Fréquence :** Mensuelle (DMFA mensuelle) ou trimestrielle selon effectif.

### Belcotax-on-web — SPF Finances (Fiches fiscales)

**URL :** https://www.belcotax.be

Portail pour le dépôt des fiches fiscales annuelles (281.10 travailleurs, 281.20 dirigeants, 281.50 commissions).

**Délai :** 1er mars de l'année suivante.

---

## Intégrations à supprimer (spécifiques France)

Les intégrations suivantes du projet source français ne sont pas applicables en Belgique :

| Intégration française | Raison | Équivalent belge |
|----------------------|--------|-----------------|
| API SIRENE (INSEE) | Registre français | BCE API (kbopub.economie.fgov.be) |
| INPI | Registre français | BCE + greffe TRE |
| Légifrance | Droit français | Fisconetplus.be (droit fiscal belge) |
| impots.gouv.fr | Portail français | MyMinfin / Tax-on-web / Intervat |
| Infogreffe | Greffe français | Centrale des Bilans BNB (cri.nbb.be) |
| EDI-TDFC (liasse fiscale) | Format français | Tax-on-web / Biztax (ISOC 275) |
