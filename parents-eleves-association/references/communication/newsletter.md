# Newsletter associative — mentions et conformité

## Définition

Communication électronique périodique adressée aux familles ou aux adhérents pour
informer des activités de l'APE.

## Cadre légal applicable

| Source | Apport |
|--------|--------|
| RGPD art. 6.1.a + art. 7 | Base légale = consentement |
| Loi 1978 art. 7-1 | Seuil 15 ans pour les mineurs en services en ligne |
| LCEN 2004-575 art. 6 III | Mentions éditoriales pour tout service de communication au public en ligne |
| Code de la consommation (et art. L. 34-5 Code postes et com. élec.) | Opt-in obligatoire pour la prospection par courrier électronique vers une personne physique |

## Mentions obligatoires de chaque envoi

1. **Identité du responsable** : « APE [Nom] » + adresse postale du siège.
2. **Adresse de contact** réelle et opérationnelle (mail).
3. **Lien de désinscription** fonctionnel en un clic, sans authentification
   supplémentaire (EDPB 05/2020, § 117).
4. **Lien vers la politique de confidentialité**.
5. **Origine du consentement** : « Vous recevez ce message parce que vous avez accepté
   notre newsletter le [date] / lors de votre adhésion. »
6. **Mention éditoriale LCEN** (si la newsletter a un caractère éditorial) :
   directeur·rice de la publication (souvent le ou la président·e), hébergeur du
   service mailing.

## Recueil du consentement

- Case **non pré-cochée**.
- Libellé clair : objet, fréquence approximative, droits.
- Trace horodatée (preuve du consentement art. 7.1).
- Si recueilli au moment de l'adhésion : opt-in distinct de la case « j'accepte les
  statuts ».

Exemple de libellé :

> [ ] J'accepte de recevoir la lettre d'information de l'APE [Nom] (environ
> 1 envoi par mois, parfois 2 lors d'événements). Je peux me désinscrire à tout
> moment via le lien en bas de chaque message. Mes données seront conservées
> tant que je serai inscrit·e, et au maximum 24 mois sans interaction.

## Modèle de pied de mail

```
---
Lettre d'information de l'APE [Nom]
[Adresse du siège]
contact : [mail opérationnel]

Vous recevez ce message parce que vous vous êtes inscrit·e à notre lettre d'information
le [date d'opt-in]. Pour ne plus la recevoir : [LIEN DE DÉSINSCRIPTION].

Politique de confidentialité : [URL]
Directeur·rice de la publication : [Nom Prénom]
Hébergeur du service mailing : [nom de la plateforme + adresse]
```

## Pratiques recommandées

- **Fréquence stable** : la valeur annoncée à l'opt-in est un engagement.
- **Cleaning** : retirer les adresses inactives depuis 24 mois et les soft-bounces
  répétés.
- **Segmenter** : envoyer ce qui concerne, à qui ça concerne (CM2 vs maternelle).
- **A/B test du désabonnement** : vérifier que le lien fonctionne avant l'envoi.
- **Préview texte / objet** : pas de clickbait. Le ton doit refléter une asso de
  parents bénévoles.

## Erreurs fréquentes

- BCC > 50 destinataires depuis un mail perso → BCC fuite, pas de désinscription,
  pas de trace. Toujours utiliser une plateforme.
- « Vous êtes adhérent donc vous recevez » → adhésion ≠ opt-in newsletter.
- Reprendre la liste de l'école → détournement de finalité (art. 5.1.b).
- Pas de lien de désinscription / désinscription qui ne fonctionne pas → motif
  classique de plainte CNIL.

## Suivi en interne

Tenir un fichier de suivi à part du registre :

| Date envoi | Objet | Cible | Plateforme | Nb destinataires | Nb désabonnements | Validé par |
|------------|-------|-------|------------|------------------|-------------------|------------|

Joindre périodiquement au CA.
