# Registre des traitements — modèle APE

Obligatoire au titre de l'art. 30 RGPD, dès le premier traitement. Modèle inspiré du
registre simplifié CNIL :
https://www.cnil.fr/sites/cnil/files/atoms/files/registre-rgpd-basique.ods

Format conseillé : tableur ODS / XLSX, une fiche par traitement. Conserver une copie
papier signée par le ou la président·e et révisée annuellement.

## En-tête commun

```
Association : [Nom]
RNA : W[XXXXXXXXX]
Responsable de traitement : [Président·e en exercice]
DPO : [si désigné]
Date de création du registre : [JJ/MM/AAAA]
Date de dernière révision : [JJ/MM/AAAA]
```

## Fiche-type par traitement

| Champ | Détail |
|-------|--------|
| **Nom du traitement** | Ex. : « Gestion des adhésions » |
| **Finalité** | Pourquoi ce traitement existe |
| **Base légale (art. 6)** | Consentement / contrat / obligation légale / intérêts vitaux / mission d'intérêt public / intérêt légitime |
| **Catégories de personnes** | Parents adhérents, enfants, bénévoles, prestataires |
| **Catégories de données** | Identité, coordonnées, image, santé (si applicable), bancaires |
| **Catégorie particulière ?** | Oui / non, et laquelle (santé, etc.) — si oui, base art. 9 |
| **Origine des données** | Collecte directe (formulaire) ou indirecte (école, transmis par mairie…) |
| **Destinataires internes** | Bureau, encadrants désignés, trésorerie |
| **Destinataires externes / sous-traitants** | Nom + pays + objet du contrat art. 28 |
| **Transferts hors UE** | Oui / non — si oui, mécanisme (CCT, adéquation) |
| **Durée de conservation** | Précise (mois / années) + justification |
| **Mesures de sécurité** | Comptes nominatifs, MDP, sauvegardes, chiffrement, accès physique |
| **Date de création** | JJ/MM/AAAA |
| **Date de dernière revue** | JJ/MM/AAAA |

## Fiches préremplies — APE type

### 1. Gestion des adhésions

| | |
|---|---|
| Finalité | Tenir le registre des membres, émettre les reçus, convoquer aux AG |
| Base | Exécution du contrat d'adhésion (art. 6.1.b) + obligation légale (art. 6.1.c, art. 9 loi 1901) |
| Personnes | Parents adhérents, leurs enfants pour rattachement |
| Données | Civilité, nom, prénom, mail, téléphone, adresse, enfant(s) + classe, cotisation, mode et date de paiement |
| Catégorie particulière | Non |
| Destinataires | Trésorerie, secrétariat de l'asso |
| Sous-traitants | [Plateforme adhésion type HelloAsso — FR] |
| Hors UE | Non |
| Durée | 3 ans après fin de la dernière adhésion ; pour les pièces comptables (reçus, talons) : 10 ans (Code de commerce) |
| Sécurité | Accès limité au bureau, MDP, sauvegarde locale chiffrée |

### 2. Mailing d'information aux familles

| | |
|---|---|
| Finalité | Informer les familles inscrites des actualités de l'association |
| Base | Consentement (art. 6.1.a) |
| Personnes | Parents ayant opté-in |
| Données | Nom, prénom, mail, opt-in horodaté |
| Catégorie particulière | Non |
| Destinataires | Référent communication |
| Sous-traitants | [Plateforme mailing : Brevo / Mailjet — FR / UE] |
| Hors UE | Non |
| Durée | Jusqu'au retrait du consentement ou inactivité prolongée (ex. : 24 mois sans ouverture) |
| Sécurité | Compte plateforme nominatif, 2FA, double validation avant envoi |

### 3. Groupe de discussion fermé (WhatsApp / Signal / autre)

| | |
|---|---|
| Finalité | Coordination opérationnelle des bénévoles ou des parents par classe |
| Base | Consentement (art. 6.1.a) |
| Personnes | Membres opt-in du groupe |
| Données | Identité, numéro de portable, contenu des messages |
| Catégorie particulière | Possible (ex. : message évoquant la santé d'un enfant) → en pratique, déconseiller dans la charte du groupe |
| Destinataires | Membres du groupe |
| Sous-traitants | [WhatsApp Inc. — US (CCT) / Signal Foundation — US (CCT)] |
| Hors UE | Oui |
| Durée | Tant que la personne est membre du groupe |
| Sécurité | Chiffrement de bout en bout, charte du groupe (pas de données sensibles, pas de capture-partage hors groupe) |

### 4. Photos et vidéos d'événements

| | |
|---|---|
| Finalité | Communication associative, archive des événements |
| Base | Consentement (art. 6.1.a + art. 9 C.civ) |
| Personnes | Enfants (titulaires de l'autorité parentale signent), bénévoles, intervenants |
| Données | Image, parfois prénom |
| Catégorie particulière | Non |
| Destinataires | Référent communication, lecteurs des supports (interne / public / RS selon cercle autorisé) |
| Sous-traitants | [Hébergeur site, plateformes RS — variable] |
| Hors UE | Oui pour les RS US (CCT) |
| Durée | Durée fixée dans l'autorisation, max 3 ans, ou retrait anticipé |
| Sécurité | Stockage chiffré, accès limité au référent, validation avant publication |

### 5. Billetterie événement

| | |
|---|---|
| Finalité | Inscription et paiement |
| Base | Exécution du contrat (art. 6.1.b) |
| Personnes | Participants |
| Données | Nom, mail, prix, mode de paiement |
| Catégorie particulière | Non |
| Destinataires | Référent événement, trésorerie |
| Sous-traitants | [HelloAsso — FR / Helloasso utilise Lemonway pour la monétique — FR] |
| Hors UE | Non |
| Durée | 3 ans (litige consommation) — pièces comptables 10 ans |
| Sécurité | Compte plateforme nominatif, 2FA, accès trésorerie limité |

### 6. Fiches sanitaires (sortie / activité)

| | |
|---|---|
| Finalité | Sécuriser la sortie ou l'activité (allergie, traitement, PAI) |
| Base | Consentement explicite (art. 9.2.a) + intérêts vitaux (art. 9.2.c) |
| Personnes | Enfant et titulaires de l'autorité parentale (déclarants) |
| Données | Allergies, traitements, contacts d'urgence — **données de santé** |
| Catégorie particulière | Oui (art. 9) |
| Destinataires | Encadrants désignés de la sortie uniquement |
| Sous-traitants | Aucun |
| Hors UE | Non |
| Durée | Durée de la sortie, **suppression / destruction immédiate ensuite** |
| Sécurité | Pochette fermée, numérotée, restituée à la fin de la sortie ; pas de tableur partagé |

## Calendrier de tenue

- À la création de l'asso : ouvrir le registre.
- À chaque nouveau traitement (ouverture d'un groupe WhatsApp, changement de prestataire,
  nouvel événement avec captation vidéo, etc.) : ajouter une fiche **avant** le démarrage.
- Une fois par an : revue complète, mise à jour des durées et des sous-traitants, signature
  du ou de la président·e.
- À chaque révision des CGU d'un sous-traitant : vérifier la rubrique « transferts ».

## Conservation du registre

Le registre doit être présenté à la CNIL en cas de contrôle. Conserver pendant toute la
durée de vie de l'association et **5 ans après dissolution** (préconisation CNIL).
