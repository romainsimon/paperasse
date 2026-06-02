# Workflow — publication d'une image / vidéo

Suite d'étapes à exécuter à chaque demande de diffusion d'image (photo, vidéo, capture).

## Étape 1 — Qualifier la demande

| Question | Pourquoi |
|----------|----------|
| Quel canal cible ? (interne / public / RS — préciser la plateforme) | Détermine quelle autorisation s'applique |
| Une seule image ou un album ? | Volume de vérifications |
| Personnes identifiables ? Combien d'enfants ? | Si oui, vérifier autorisations parents |
| Présence d'un tiers (enseignant, prestataire, parent non-adhérent) ? | Autorisation tiers à recueillir séparément |
| Date envisagée de publication ? | Marge pour recueillir les autorisations manquantes |
| Données accessoires visibles (badge, fiche, tableau) ? | Risque de divulgation indirecte |

## Étape 2 — Vérifier les autorisations

Pour chaque personne identifiable :

1. Chercher dans le registre des autorisations le formulaire signé en cours de validité.
2. Vérifier que le **cercle ciblé est coché**.
3. Vérifier que la **date** est encore dans la durée d'autorisation.
4. Pour un mineur : vérifier la présence des **deux** signatures parentales (sauf cas
   d'exception documenté).

Si une autorisation manque : trois options.

- Demander une autorisation ad hoc (formulaire ponctuel — modèle `modele-autorisation-image.md`).
- Flouter la personne (visage + signes distinctifs : silhouette, vêtement, contexte).
- Ne pas publier.

## Étape 3 — Réaliser les vérifications de fond

Checklist :

- [ ] Pas de données de santé visibles (ordonnance, badge médical, fauteuil identifié, etc.).
- [ ] Pas de prénom + nom + classe ensemble pour un mineur.
- [ ] Pas de mention d'âge précis.
- [ ] Pas de référence à un fait sensible (santé, conflit, famille).
- [ ] Pas de tiers identifiable non autorisé.
- [ ] Pas de logo / marque commerciale autre que partenaires explicites.

## Étape 4 — Préparer la mise en ligne

- Renommer le fichier sans information identifiante (`kermesse-2026.jpg`,
  pas `Lucie_CE2_classe.jpg`).
- Supprimer les **métadonnées EXIF** (GPS, appareil, horodatage précis si non
  souhaité). `exiftool -all= fichier.jpg` ou outil intégré.
- Réduire la résolution si la qualité « impression » n'est pas requise.

## Étape 5 — Publier

Selon le canal :

- **Bulletin PDF** : intégrer, joindre la mention RGPD au pied (« Reproduction interdite
  sans autorisation »).
- **Site web** : publier dans une page accessible, avec mention de l'événement et de la
  date. Pas de lien direct vers le fichier brut.
- **RS** : publier depuis le compte officiel, jamais depuis un compte perso. Désactiver
  le tagging libre si possible. Pas de géoloc.

## Étape 6 — Journaliser

Dans le suivi des publications, consigner :

| Date | Canal | URL / référence | Personnes identifiables | Validation autorisations | Date prévue retrait |
|------|-------|-----------------|-------------------------|--------------------------|---------------------|

Ce journal est annexé au registre des traitements.

## Étape 7 — Surveiller / retirer

- Surveiller les commentaires.
- Sur demande de retrait : retirer **sous 1 mois maximum** (art. 12.3 RGPD).
- Conserver la trace du retrait.

## Cas particulier — Photo d'archive

Pour une photo prise il y a > 3 ans :

- Vérifier que la durée d'autorisation initiale est encore en cours.
- Si la durée est expirée : refaire signer une autorisation **avant** republication, ou ne
  pas republier.

## Cas particulier — Live / streaming

- Recueillir une autorisation **dédiée livestream** (la cocher au formulaire annuel ne
  suffit pas si elle n'est pas mentionnée).
- Plan de tournage : éviter les gros plans d'enfants identifiables.
- Mention vocale et écrite au début du livestream : « événement diffusé en direct, si
  vous ne souhaitez pas figurer à l'image, contactez X. »
- Modération live des commentaires.

## Cas particulier — Presse locale

- L'APE recueille l'autorisation parentale et la transmet au journal.
- Le journal peut avoir ses propres formulaires — l'APE n'en est pas dispensée.
- Ne pas fournir au journal la liste nominative des enfants identifiés sur les photos
  sans autorisation distincte « presse ».
