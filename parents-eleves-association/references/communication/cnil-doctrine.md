# Doctrine CNIL applicable à une APE

Synthèse des positions CNIL utiles pour une association de parents d'élèves. Doctrine
opposable mais non législative — toujours vérifier la version en vigueur sur
[cnil.fr](https://www.cnil.fr).

## Guide associations

La CNIL a publié un guide spécifique pour les associations (mise à jour régulière) :
https://www.cnil.fr/fr/la-cnil-publie-un-guide-pratique-pour-les-associations

Points clés repris dans ce skill :

1. Une association est responsable de traitement comme une entreprise.
2. Un registre est obligatoire dès le premier traitement.
3. Le consentement est rarement présumé : il faut une trace.
4. Les coordonnées des membres ne peuvent pas être communiquées à un tiers sans accord.
5. Une association peut désigner un DPO mutualisé.

## Droit à l'image (doctrine CNIL)

Fiche : https://www.cnil.fr/fr/la-diffusion-de-photographies

Synthèse :

- Une photo est une donnée à caractère personnel dès qu'elle permet d'identifier la
  personne.
- Sa diffusion (papier ou numérique) est un traitement.
- Base légale recommandée : **consentement** (art. 6.1.a + art. 7 RGPD), distinct par cercle
  de diffusion.
- Pour les mineurs : autorisation parentale conjointe.
- L'information art. 13 RGPD doit accompagner la collecte du consentement (qui, pourquoi,
  combien de temps, vos droits).

## Mineurs et données

Fiche : https://www.cnil.fr/fr/les-droits-des-mineurs-sur-leurs-donnees-personnelles

- Seuil de consentement numérique en France : **15 ans** (loi 78-17 art. 7-1).
- En dessous : double accord mineur + titulaires de l'autorité parentale.
- L'enfant doit recevoir une information adaptée à son âge.
- Droit à l'oubli renforcé : un mineur qui devient majeur peut demander la suppression
  rapide.

## Cookies et traceurs (sites web associatifs)

Recommandation CNIL 2020 (mise à jour) : https://www.cnil.fr/fr/cookies-et-autres-traceurs

- Consentement préalable obligatoire pour tout traceur non strictement nécessaire.
- Bouton « refuser tout » aussi visible que « accepter tout ».
- Consentement révocable à tout moment.
- Exemptions : mesure d'audience exemptée (Matomo, AT Internet en mode exempté), panier,
  authentification.

Pour une APE, un site « vitrine » sans pub ni RS embed peut souvent se passer de bannière
cookies — vérifier la configuration de l'analytics.

## Prospection par email / SMS

Fiche : https://www.cnil.fr/fr/la-prospection-commerciale-par-courrier-electronique

- Opt-in obligatoire pour la prospection (le mailing newsletter d'une APE rentre dans cette
  catégorie).
- Lien de désinscription **dans chaque message**.
- Mention de l'identité du responsable, de l'origine de la collecte, des droits.

L'argument « ils sont adhérents, ils ont accepté » n'est pas suffisant. L'adhésion ne vaut
pas opt-in à un mailing ; à la signature de l'adhésion, prévoir une case dédiée.

## Registre des traitements simplifié

La CNIL met à disposition un modèle de registre simplifié au format ODS :
https://www.cnil.fr/sites/cnil/files/atoms/files/registre-rgpd-basique.ods

À adapter pour une APE — voir [registre-traitements.md](registre-traitements.md).

## Notification de violation

Procédure CNIL : https://www.cnil.fr/fr/notifier-une-violation-de-donnees-personnelles

- Délai : 72 h après prise de connaissance.
- Notification en ligne via le téléservice CNIL.
- Information des personnes si risque élevé.

## AIPD

Liste CNIL des traitements pour lesquels l'AIPD est **obligatoire** :
https://www.cnil.fr/fr/ce-quil-faut-savoir-sur-lanalyse-dimpact-relative-la-protection-des-donnees-aipd

Cas potentiellement pertinents pour une APE :

- Traitement à grande échelle de données de santé d'enfants.
- Vidéosurveillance.
- Application mobile de suivi des élèves avec géolocalisation.

Cas typiques APE **non** soumis à AIPD : mailing parents, photo de classe, billetterie
événement, registre adhérents.

## Sanctions prononcées contre des associations

Les sanctions CNIL contre des associations sont rares mais existent : non-respect de
l'opt-in mailing, défaut de registre, défaut de désignation d'un DPO quand obligatoire,
violation non notifiée. Voir https://www.cnil.fr/fr/les-sanctions-prononcees-par-la-cnil.

**Réalité APE** : le risque le plus probable est une plainte d'un parent + référé civil
(art. 9 C.civ) pour diffusion non autorisée d'image d'enfant. La CNIL traite les plaintes
sérielles ; l'incident isolé d'une APE est généralement traité en mise en demeure.

## Bonnes pratiques recommandées par la CNIL

- Limiter les outils et plateformes utilisés (chaque outil ajoute un sous-traitant et un
  risque).
- Privilégier les hébergements UE et les solutions certifiées (HDS pour données de santé,
  SecNumCloud pour les administrations).
- Documenter chaque décision (registre, traces, comptes-rendus de CA).
- Former une fois par an le bureau aux bases du RGPD.
- Désigner un référent RGPD au sein du bureau (même sans DPO formel).
