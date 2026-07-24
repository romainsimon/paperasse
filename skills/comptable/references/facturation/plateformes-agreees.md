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

## Devenir PA

**Non recommandé pour les TPE/PME.** Conditions : ISO 27001, SecNumCloud (si hébergement tiers), audit de conformité, tests d'interopérabilité PPF, système d'information dans l'UE. Coût et complexité réservés aux éditeurs de logiciels et plateformes financières.

## Vérifier qu'une PA est bien immatriculée

Avant de choisir, toujours vérifier sur la liste officielle :
https://www.impots.gouv.fr/je-consulte-la-liste-des-plateformes-agreees

La liste distingue :
1. **Immatriculées définitivement** : tests d'interopérabilité réussis
2. **En attente** : dossier complet, tests en cours
