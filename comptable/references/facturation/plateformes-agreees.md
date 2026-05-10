# Plateformes Agréées (PA) et Solutions Compatibles (SC)

## Deux voies de conformité

Depuis l'abandon du PPF comme plateforme d'émission/réception (octobre 2024), il existe **deux chemins** pour se mettre en conformité avec la facturation électronique. Une entreprise assujettie à la TVA doit pouvoir émettre/recevoir via une PA, **soit directement, soit via une SC adossée à une PA partenaire**.

| Voie | Définition | Rôle | Exemples |
|------|-----------|------|----------|
| **Plateforme Agréée (PA)** | Opérateur immatriculé par la DGFiP | Émet, reçoit *et* transmet les factures (formats Factur-X / UBL / CII) ; gère l'e-reporting ; archive | Qonto, Indy, Pennylane, Dext (170+ PA immatriculées) |
| **Solution Compatible (SC)** | Logiciel de facturation traditionnel labellisé compatible | Produit la facture au bon format ; **s'appuie sur une PA partenaire pour la transmission** | Superindep (micro-entrepreneurs), Dolibarr ou Odoo (opensource), nombreux logiciels de comptabilité/facturation classiques |

**Important** : une SC seule ne suffit pas. Elle doit être adossée à une PA pour que la facture soit effectivement transmise au destinataire et à la DGFiP. Beaucoup de SC ont une PA partenaire intégrée par défaut — toujours vérifier ce point avant de s'engager. Il n'y a pas de liste officielle de SC.

Si un logiciel de facturation est déjà utilisé, il vaut mieux vérifier si il est SC pour bénéficier de l'intégration, souvent gratuite.

Source officielle (logos et définitions des labels DGFiP) :
https://www.impots.gouv.fr/sites/default/files/media/1_metier/2_professionnel/EV/2_gestion/290_facturation_electronique/fe_presentation-des-labels.pdf

Liste officielle des PA :
https://www.impots.gouv.fr/je-consulte-la-liste-des-plateformes-agreees

## Plateformes Agréées (PA) : offres gratuites pour TPE/PME

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

## Solutions Compatibles (SC) : conserver son logiciel de facturation existant

Si l'entreprise utilise déjà un logiciel de facturation/comptabilité qu'elle souhaite conserver, vérifier s'il est labellisé **Solution Compatible**. Une SC produit les factures au format conforme (Factur-X / UBL / CII) et les transmet via une **PA partenaire** (souvent intégrée par défaut, parfois à choisir).

### Superindep

- **PA partenaire** : SuperPDP
- **PEPPOL** : oui
- **Gratuit** : oui (sans CB, sans engagement)
- **Émission/réception** : oui
- **Formats** : Factur-X
- **E-reporting** : oui
- **Intérêt** : gratuit + reste un logiciel de facturation (UX simple, ciblée micro-entrepreneurs et artistes-auteurs)
- **Limite** : upsell vers compta payante

### Dolibarr

- **PA partenaire** : Esalink / SuperPDP via PDP Libre
- **PEPPOL** : oui
- **Gratuit** : oui si selfhost
- **Émission/réception** : oui
- **Formats** : Factur-X
- **E-reporting** : oui
- **Intérêt** : opensource, contrôle de ses données
- **Limite** : nécessite selfhost ou infogérance

### Autres SC

De nombreux logiciels de facturation et de comptabilité historiques (Sage, Cegid, EBP, etc.) proposent ou proposeront un mode compatible avec une PA partenaire. **Toujours vérifier** :
- Le logiciel produit-il un format conforme (Factur-X / UBL / CII) ?
- Quelle PA partenaire transmet les factures ?
- Cette PA est-elle bien immatriculée par la DGFiP ?

## Arbre de décision : PA, SC ou nouveau choix ?

```
Avez-vous déjà un logiciel de facturation/comptabilité que vous voulez conserver ?
  ├── OUI → Vérifier le statut du logiciel
  │         ├── Le logiciel est lui-même PA → rien à changer (ex: Pennylane si déjà utilisé)
  │         ├── Le logiciel est SC → identifier la PA partenaire et la valider
  │         │   (ex: Superindep + sa PA partenaire)
  │         └── Le logiciel n'est ni PA ni SC → migrer vers une PA OU attendre une mise à jour
  └── NON → Choisir une PA gratuite
            ├── Déjà client Qonto ?
            │    └── OUI → Qonto (zéro friction, déjà intégré)
            ├── Besoin PEPPOL (clients UE) ?
            │    └── OUI → Indy ou Dext
            ├── Besoin compta intégrée ?
            │    └── OUI → Pennylane ou Indy
            ├── Besoin API ?
            │    └── OUI → Pennylane (API publique documentée)
            └── Auto-entrepreneur ?
                 └── Indy (spécialisé indépendants, gratuit) — ou Superindep (SC)
```

## Questions à poser à l'utilisateur

Pour recommander une solution adaptée, demander :

1. **Utilisez-vous déjà un logiciel de facturation/comptabilité que vous voulez conserver ?**
   - Oui → vérifier s'il est PA, SC, ou ni l'un ni l'autre (et si SC, quelle PA partenaire)
   - Non → recommander une PA gratuite après avoir vérifié sa banque
2. **Quelle banque professionnelle utilisez-vous ?** (si Qonto → recommander Qonto comme PA)
3. **Avez-vous des clients dans l'UE ?** (si oui → recommander une PA avec PEPPOL)
4. **Quel volume de factures par mois ?** (les offres gratuites couvrent les volumes TPE/PME)
5. **Avez-vous besoin d'une API ?** (si oui → Pennylane)

## Ce que fait une PA (vs ce que fait une SC)

| Fonction | PA | SC |
|----------|----|----|
| Génération du format conforme (Factur-X / UBL / CII) | Oui | **Oui** |
| Transmission via le réseau interopérable | Oui | Via PA partenaire |
| Routage via l'annuaire PPF | Oui | Via PA partenaire |
| Vérification des mentions obligatoires | Oui | Souvent oui |
| Gestion des statuts du cycle de vie | Oui | Via PA partenaire |
| E-reporting (B2C, international, encaissements) | Oui | Via PA partenaire |
| Conservation 6 ans | Souvent oui | Souvent oui |

## Devenir PA

**Non recommandé pour les TPE/PME.** Conditions : ISO 27001, SecNumCloud (si hébergement tiers), audit de conformité, tests d'interopérabilité PPF, système d'information dans l'UE. Coût et complexité réservés aux éditeurs de logiciels et plateformes financières.

## Vérifier qu'une PA est bien immatriculée

Avant de choisir, toujours vérifier sur la liste officielle :
https://www.impots.gouv.fr/je-consulte-la-liste-des-plateformes-agreees

La liste distingue :
1. **Immatriculées définitivement** : tests d'interopérabilité réussis
2. **En attente** : dossier complet, tests en cours

Pour une SC : vérifier également le label/compatibilité revendiquée par l'éditeur, et confirmer la PA partenaire qui assurera la transmission (cette PA doit être immatriculée).

## Pour aller plus loin

- **PDF DGFiP — Présentation des labels** (PA, SC, OD…) : https://www.impots.gouv.fr/sites/default/files/media/1_metier/2_professionnel/EV/2_gestion/290_facturation_electronique/fe_presentation-des-labels.pdf
- **Association PDP Libre** — ressource communautaire (à but non lucratif) avec un *awesome list* de pointeurs sur la facturation électronique : https://github.com/PDP-Libre/awesome-facturation-electronique. Utile pour comparer les acteurs, suivre l'écosystème et obtenir de l'aide.
