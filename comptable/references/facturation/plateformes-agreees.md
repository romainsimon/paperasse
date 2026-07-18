# Plateformes Agréées (PA)

## Contexte

Depuis l'abandon du PPF comme plateforme d'émission/réception (octobre 2024), toute entreprise assujettie à la TVA **doit choisir une PA** pour émettre et recevoir des factures électroniques.

170+ PA sont immatriculées par la DGFiP. Liste officielle :
https://www.impots.gouv.fr/je-consulte-la-liste-des-plateformes-agreees

## PA avec offre gratuite pour TPE/PME

Plusieurs PA proposent des offres gratuites (modèle freemium : facturation gratuite, upsell sur la comptabilité).

### Qonto

- **PA agréée** : oui (immatriculation #23)
- **PEPPOL** : non
- **Gratuit** : oui, inclus dans tous les plans. Aussi disponible **sans compte pro**
- **Émission/réception** : illimitées
- **Formats** : Factur-X
- **E-reporting** : inclus
- **Intérêt** : si déjà client Qonto, zéro friction. Banque + facturation au même endroit
- **Limite** : pas sur PEPPOL (pas bloquant pour les échanges domestiques)

### Indy

- **PA agréée** : oui
- **PEPPOL** : oui
- **Gratuit** : oui (plan Essentiel, sans CB)
- **Émission/réception** : illimitées
- **Formats** : Factur-X
- **E-reporting** : inclus
- **Intérêt** : gratuit + PEPPOL + outil de comptabilité intégré
- **Limite** : upsell vers compta payante (12 EUR/mois)

### Pennylane

- **PA agréée** : oui
- **PEPPOL** : non
- **Gratuit** : oui (plan gratuit, sans CB, sans limite de temps)
- **Émission/réception** : illimitées
- **Formats** : Factur-X, UBL, CII
- **E-reporting** : inclus
- **Intérêt** : supporte les 3 formats, interface moderne, API publique
- **Limite** : pas PEPPOL, upsell compta (14 EUR/mois)

### Dext

- **PA agréée** : oui
- **PEPPOL** : oui
- **Gratuit** : oui (Dext Facturation, sans CB, sans engagement)
- **Émission/réception** : oui
- **Formats** : Factur-X
- **E-reporting** : à confirmer
- **Intérêt** : gratuit + PEPPOL + forte extraction documentaire (OCR/IA)
- **Limite** : stockage 500 MB, upsell extraction/compta

## Arbre de décision : quelle PA choisir ?

```
Déjà client Qonto ?
  ├── OUI → Qonto (zéro friction, déjà intégré)
  └── NON
       ├── Besoin PEPPOL (clients UE) ?
       │    ├── OUI → Indy ou Dext
       │    └── NON
       │         ├── Besoin compta intégrée ?
       │         │    ├── OUI → Pennylane ou Indy
       │         │    └── NON → Indy (le plus simple, gratuit)
       │         └── Besoin API ?
       │              └── OUI → Pennylane (API publique documentée)
       └── Auto-entrepreneur ?
            └── Indy (spécialisé indépendants, gratuit)
```

## Questions à poser à l'utilisateur

Pour recommander une PA, demander :

1. **Quelle banque professionnelle utilisez-vous ?** (si Qonto → recommander Qonto)
2. **Avez-vous des clients dans l'UE ?** (si oui → recommander PA avec PEPPOL)
3. **Utilisez-vous déjà un logiciel de comptabilité ?** (si oui → vérifier s'il est PA)
4. **Quel volume de factures par mois ?** (les offres gratuites couvrent les volumes TPE/PME)
5. **Avez-vous besoin d'une API ?** (si oui → Pennylane)

## Ce que fait une PA

| Fonction | Détail |
|----------|--------|
| Émission | Génère ou reçoit la facture, la transmet à la PA du client |
| Réception | Reçoit les factures des fournisseurs, les met à disposition |
| Routage | Utilise l'annuaire PPF pour identifier la PA du destinataire |
| Conformité | Vérifie le format (Factur-X, UBL, CII) et les mentions obligatoires |
| Statuts | Gère le cycle de vie (émise, reçue, acceptée, rejetée, payée) |
| E-reporting | Transmet les données de facturation, transaction et paiement au PPF |
| Conservation | Archive les factures 6 ans minimum |

## Formats selon le réseau d'échange

Trois formats sont définis par la norme européenne EN 16931. Toute PA doit pouvoir émettre au moins l'un d'entre eux, mais doit être capable de recevoir les trois (socle complet Factur-X + CII + UBL).

| Format | Standard | Cas d'usage |
|--------|----------|-------------|
| **Factur-X** | PDF/A-3 + XML CII embarqué (EN 16931) | Format hybride : lisible par l'humain (PDF) et par la machine (XML CII embarqué). Recommandé pour les échanges entre PA françaises et pour les envois aux clients qui n'ont pas encore de PA. |
| **CII pur** | Cross-Industry Invoice — UN/CEFACT (EN 16931) | Fichier XML seul, sans PDF. Même structure que le XML embarqué dans Factur-X. Utilisé pour les échanges machine-to-machine entre PA. |
| **UBL** | Universal Business Language — OASIS (EN 16931) | Format natif du réseau Peppol. Requis pour les échanges avec des partenaires dont la PA est connectée au réseau Peppol (notamment les entreprises européennes hors France). |

**Annuaire PPF** : registre central tenu par l'État qui associe chaque SIREN/SIRET à sa PA. Toutes les PA doivent l'interroger pour savoir où router une facture. L'annuaire ne dicte pas le format : c'est la PA destinataire qui déclare les formats qu'elle accepte.

**Réseau Peppol** : réseau d'échange européen (transport AS4 + annuaire SML) utilisé par certaines PA pour acheminer les factures — y compris parfois entre PA françaises — et obligatoirement pour les échanges intra-UE avec des partenaires Peppol.

**Conséquence sur le choix de PA** : si vous avez des clients dans l'UE déjà sur Peppol, choisissez une PA connectée au réseau Peppol (Indy, Dext, ou toute PA immatriculée avec cette capacité). Vérifiez dans le contrat de votre PA si elle prend en charge la conversion CII/Factur-X → UBL en sortie : cette conversion n'est pas imposée par la réglementation, elle est propre à chaque PA.

Sources : [Spécification Factur-X (FNFE-MPE)](https://fnfe-mpe.org/factur-x/) · [Peppol BIS Billing 3.0](https://docs.peppol.eu/poacc/billing/3.0/) · [DGFiP — Facturation électronique](https://www.impots.gouv.fr/professionnel/je-passe-la-facturation-electronique)

## PA pour éditeurs de logiciels et opérateurs

Certaines Plateformes Agréées (PA) ciblent non pas les entreprises directement, mais les **éditeurs de logiciels** et les **Opérateurs de Dématérialisation (OD)** qui souhaitent intégrer la facturation électronique dans leurs propres produits via API.

### Iopole

- **Statut DGFiP** : immatriculée définitivement (n° 0018) depuis le 11 décembre 2025 (source : [liste officielle DGFiP](https://www.impots.gouv.fr/je-consulte-la-liste-des-plateformes-agreees))
- **Peppol** : oui
- **Formats** : Factur-X, CII, UBL
- **Cible** : éditeurs de logiciels et opérateurs (accès via API)
- **Site** : https://www.iopole.com
- **Intérêt** : PA française avec réseau Peppol, adaptée aux intégrateurs qui veulent embarquer la facturation électronique dans leur produit

## Devenir PA

**Non recommandé pour les TPE/PME.** Conditions : ISO 27001, SecNumCloud (si hébergement tiers), audit de conformité, tests d'interopérabilité PPF, système d'information dans l'UE. Coût et complexité réservés aux éditeurs de logiciels et plateformes financières.

## Vérifier qu'une PA est bien immatriculée

Avant de choisir, toujours vérifier sur la liste officielle :
https://www.impots.gouv.fr/je-consulte-la-liste-des-plateformes-agreees

La liste distingue :
1. **Immatriculées définitivement** : tests d'interopérabilité réussis
2. **En attente** : dossier complet, tests en cours
