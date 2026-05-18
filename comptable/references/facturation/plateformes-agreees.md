# Prestataires Peppol Belges (Facturation Électronique)

`last_updated: 2026-05-15`

## Contexte

Depuis le 1er janvier 2026, toute facture B2B entre assujettis belges doit être émise au format électronique structuré (Peppol BIS 3.0) via le réseau **Peppol**. Le hub belge est **Mercurius** (https://mercurius.belgium.be).

Contrairement à la France (système des Plateformes Agréées immatriculées par la DGFiP), en Belgique tout prestataire connecté au réseau Peppol peut émettre et recevoir des factures.

**Identifiant Peppol belge :** `0208:[numéro BCE sans points]`

---

## Prestataires recommandés (TPE/PME belges)

### Qonto

- **Peppol** : oui (connecté au réseau Peppol belge)
- **Gratuit** : inclus dans tous les plans Qonto
- **Émission/réception** : via interface Qonto ou API
- **Formats** : UBL Peppol BIS 3.0
- **IBAN belge** : oui (BE)
- **Intérêt** : si déjà client Qonto, banque + facturation Peppol au même endroit
- **Limite** : banque en ligne (pas de comptabilité intégrée)

### Clearfacts

- **Peppol** : oui
- **Gratuit** : offre d'entrée disponible
- **Émission/réception** : oui
- **Formats** : UBL Peppol BIS 3.0, PDF
- **Intérêt** : spécialisé Belgique, intégration comptable, reconnaissance automatique des factures entrantes
- **Site** : https://clearfacts.be

### Unifiedpost

- **Peppol** : oui (Access Point Peppol certifié)
- **Émission/réception** : oui
- **Intérêt** : plateforme documentaire complète, gestion des factures entrantes et sortantes
- **Site** : https://unifiedpost.com

### Isabel

- **Peppol** : oui
- **Émission/réception** : oui
- **Intérêt** : acteur historique belge des paiements et échanges financiers, intégration bancaire forte
- **Site** : https://isabel.eu

### Odoo (ERP)

- **Peppol** : oui (module e-invoicing belge)
- **Intérêt** : ERP complet avec gestion des factures, comptabilité, CRM
- **Limite** : solution plus lourde, adaptée si besoin d'un ERP complet
- **Site** : https://www.odoo.com

### Billit

- **Peppol** : oui
- **Intérêt** : solution belge de facturation pour PME, interface intuitive
- **Site** : https://www.billit.be

### Exactonline

- **Peppol** : oui
- **Intérêt** : solution comptable + facturation, populaire chez les PME belges
- **Site** : https://www.exactonline.be

---

## Arbre de décision : quel prestataire choisir ?

```
Déjà client Qonto ?
  ├── OUI → Qonto (zéro friction, IBAN BE + Peppol intégré)
  └── NON
       ├── Besoin d'un ERP complet ?
       │    ├── OUI → Odoo ou Exactonline
       │    └── NON
       │         ├── Volume élevé + gestion documentaire ?
       │         │    └── OUI → Clearfacts ou Unifiedpost
       │         └── PME simple
       │              └── Billit ou Clearfacts (offre d'entrée)
       └── Indépendant / très petite structure ?
            └── Qonto ou Billit (interface simple)
```

---

## Questions à poser

Pour recommander un prestataire, demander :

1. **Quelle banque professionnelle utilisez-vous ?** (si Qonto → recommander Qonto)
2. **Utilisez-vous déjà un logiciel de comptabilité ?** (vérifier s'il supporte Peppol)
3. **Quel volume de factures par mois ?** (les offres de base couvrent les volumes TPE/PME)
4. **Avez-vous des clients dans l'UE ?** (le réseau Peppol est européen — pas de problème)
5. **Avez-vous besoin d'une API ?** (Qonto, Clearfacts, Unifiedpost proposent des API)

---

## Ce que fait un prestataire Peppol

| Fonction | Détail |
|----------|--------|
| Émission | Génère ou reçoit la facture XML, la route via Mercurius |
| Réception | Reçoit les factures XML des fournisseurs, les met à disposition |
| Routage | Utilise l'annuaire Peppol pour identifier l'identifiant du destinataire |
| Conformité | Vérifie le format (UBL Peppol BIS 3.0) et les mentions obligatoires |
| Archivage | Archive les factures (durée légale : 10 ans) |

---

## Mercurius — Hub Peppol belge

**Mercurius** est la plateforme de routage Peppol belge, gérée par le SPF Finances et connectée au réseau Peppol européen.

**URL :** https://mercurius.belgium.be

**Rôle :**
- Hub de routage des factures électroniques B2B belges
- Connexion au réseau Peppol international (interopérabilité avec les PA françaises, les autres pays UE)
- Déjà obligatoire pour B2G (marchés publics) depuis 2014

**B2G (marchés publics) :** Les factures aux administrations belges transitent via Mercurius depuis 2014 — le B2B n'est que l'extension de ce dispositif existant.

---

## Inscription au réseau Peppol

Pour recevoir des factures Peppol, votre entreprise doit être enregistrée dans l'annuaire Peppol via un prestataire :

1. Choisir un prestataire Peppol (voir liste ci-dessus)
2. Créer un compte et fournir votre numéro BCE
3. Le prestataire enregistre votre identifiant `0208:[BCE]` dans l'annuaire Peppol
4. Communiquer votre identifiant Peppol à vos fournisseurs et clients

**Configurer dans `company.json` :**
```json
"einvoicing": {
  "peppol_id": "0208:0123456789",
  "provider": "qonto",
  "provider_name": "Qonto",
  "reception_ready": true,
  "emission_ready": true
}
```
