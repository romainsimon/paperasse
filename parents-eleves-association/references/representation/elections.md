# Élections des représentants de parents d'élèves

Base réglementaire : Code de l'éducation, articles D111-10 à D111-15 (cadre général) et D411-1 (conseil d'école) / R421-26 à R421-30 (conseil d'administration EPLE). Modalités annuelles : **note de service du ministère** publiée chaque été (vérifier la version en vigueur).

> Référence dernière année connue : note de service **MENE2517394N** du 24 juillet 2025, élections fixées aux **vendredi 10 et samedi 11 octobre 2025** (3-4 octobre à La Réunion et Mayotte). Toujours rechercher la note de service en vigueur sur https://www.education.gouv.fr/bo avant de citer un calendrier.

## Calendrier type

| Étape | Délai indicatif |
|---|---|
| Publication de la note de service annuelle | Fin juin – début juillet |
| Réception des consignes par l'établissement | Fin août – début septembre |
| Dépôt des candidatures (listes) | **Au moins 10 jours francs** avant le scrutin |
| Affichage public des listes | Dès dépôt accepté, en lieu accessible aux parents (art. D111-7) |
| Distribution des professions de foi et bulletins | 6 jours francs avant le scrutin |
| Période protégée pour candidats individuels | 4 semaines avant le scrutin (art. D111-10) |
| Scrutin | Vendredi ou samedi de la « semaine de la démocratie scolaire » (1re quinzaine d'octobre) |
| Proclamation des résultats | Dans la foulée du dépouillement |
| 1re réunion du conseil d'école / CA | Dans le **mois** suivant la proclamation (art. D411-1 / R421-25) |

Le calendrier précis (jours retenus, horaires d'ouverture des bureaux) est arrêté localement par le directeur ou le chef d'établissement, dans le respect du cadre national.

## Qui est électeur ?

- Tout **parent ou personne exerçant l'autorité parentale** sur un ou plusieurs élèves inscrits dans l'établissement.
- **Une voix par parent, quel que soit le nombre d'enfants scolarisés** dans l'établissement.
- **Indépendamment de la nationalité.**
- En cas d'exercice conjoint de l'autorité parentale, **les deux parents votent**, même séparés.
- Les personnes ayant la responsabilité légale d'un élève (tuteur, délégataire de l'autorité parentale) sont assimilées (art. D111-6).

## Qui est éligible ?

Tout électeur, sauf les personnels de l'école ou de l'établissement membres de droit du conseil concerné (un enseignant exerçant dans l'école ne peut pas se présenter comme parent d'élève au conseil de cette école).

## Composition d'une liste

- **Au minimum 2 candidats**, au maximum **le double du nombre de sièges à pourvoir**.
- Une liste peut être présentée par :
  - une **association de parents d'élèves** affiliée à une fédération (FCPE, PEEP, APEL — selon le régime de l'école) ;
  - une **association locale indépendante** déclarée en préfecture ;
  - un groupe de **parents non constitués en association** (liste « non affiliée » ou « liste de parents indépendants »).
- L'intitulé de la liste figure sur les bulletins et la profession de foi.
- Le **dépôt** se fait auprès du directeur d'école ou du président du bureau des élections, accompagné des bulletins, professions de foi et de la liste signée des candidats.

Voir [modeles/profession-de-foi.md](modeles/profession-de-foi.md).

## Modalités de vote

Trois canaux possibles, cumulables :

1. **Vote à l'urne** dans le ou les bureaux de vote ouverts dans l'établissement, sur une plage horaire d'**au moins 4 heures consécutives** incluant des horaires d'entrée et de sortie des élèves.
2. **Vote par correspondance** :
   - Bulletin glissé dans une enveloppe sans signe distinctif (« enveloppe n° 1 »).
   - Cette enveloppe placée dans une seconde enveloppe portant **nom, prénom, classe de l'enfant et signature** du votant (« enveloppe n° 2 »).
   - Retour par voie postale ou remis cacheté par l'élève au directeur ou enseignant.
3. **Vote par voie électronique** (si décidé par le chef d'établissement / DASEN) — modalités fixées par arrêté pris après avis CNIL ; aucun panachage entre canaux électronique et papier.

Le bureau de vote est constitué du président (directeur ou chef d'établissement), d'au moins deux assesseurs, et d'un représentant par liste candidate.

## Scrutin et répartition des sièges

**Scrutin de liste à la représentation proportionnelle au plus fort reste** *non* — il s'agit d'un scrutin **proportionnel à la plus forte moyenne** (art. R421-29 pour les EPLE ; idem pour le conseil d'école).

### Étapes du dépouillement

1. **Validation des votes par correspondance** : on ouvre les enveloppes n° 2, on vérifie identité et signature sur une liste d'émargement, on extrait l'enveloppe n° 1 et on la place dans l'urne.
2. **Dépouillement** : on compte les bulletins valides.
3. **Quotient électoral** :

   ```
   quotient = nombre de suffrages exprimés / nombre de sièges à pourvoir
   ```

4. **Attribution des sièges au quotient** : chaque liste obtient autant de sièges que le nombre de fois où ses suffrages contiennent le quotient.
5. **Attribution des sièges restants à la plus forte moyenne** :

   ```
   moyenne(liste) = suffrages(liste) / (sièges déjà obtenus + 1)
   ```

   Le siège va à la liste avec la plus forte moyenne. Recommencer jusqu'à épuisement.

### Exemple (worked)

- 200 suffrages exprimés.
- 8 sièges à pourvoir.
- Quotient = 200 / 8 = **25**.

| Liste | Voix | Sièges au quotient | Voix résiduelles |
|---|---|---|---|
| FCPE | 90 | 90 ÷ 25 = 3 (reste 15) | 90 |
| Indépendants | 70 | 70 ÷ 25 = 2 (reste 20) | 70 |
| PEEP | 40 | 40 ÷ 25 = 1 (reste 15) | 40 |
| Total au quotient | | **6** | |

Il reste **2 sièges**. On calcule la plus forte moyenne :

| Liste | Sièges actuels | Moyenne = voix / (sièges + 1) |
|---|---|---|
| FCPE | 3 | 90 / 4 = **22,5** ← 1er siège restant |
| Indépendants | 2 | 70 / 3 ≈ 23,3 ← 1er siège restant (en réalité **plus haut** que FCPE) |
| PEEP | 1 | 40 / 2 = 20,0 |

Correction : le 1er siège restant va à **Indépendants** (23,3). Recalcul après attribution :

| Liste | Sièges actuels | Moyenne |
|---|---|---|
| FCPE | 3 | 90 / 4 = **22,5** ← 2e siège restant |
| Indépendants | 3 | 70 / 4 = 17,5 |
| PEEP | 1 | 40 / 2 = 20,0 |

Résultat final : **FCPE 4, Indépendants 3, PEEP 1**.

> Toujours recalculer à la calculette avant d'annoncer un résultat. La plus forte moyenne se rejoue à chaque attribution de siège.

## Désignation des suppléants

Les candidats non élus de chaque liste sont **suppléants dans l'ordre de la liste**. Ils remplacent un titulaire empêché, démissionnaire ou ayant perdu sa qualité de parent d'élève. Pas d'élection partielle en cours d'année.

## Durée du mandat

**Un an scolaire**, jusqu'à la proclamation des résultats des élections suivantes. Pas de mandat impératif. Pas de cumul interdit avec une fonction associative.

## Contentieux électoral

- **Réclamation préalable** auprès du directeur ou du chef d'établissement, dans les **5 jours** suivant la proclamation.
- En cas de désaccord persistant : recours auprès du **directeur académique des services de l'éducation nationale (DASEN)**.
- Au-delà : recours pour excès de pouvoir devant le **tribunal administratif** dans les 2 mois.

## À éviter

- Profession de foi à contenu **partisan, syndical, religieux** ou **commercial** — risque de retrait par le directeur (avis du conseil d'école) au nom de la neutralité.
- Tract distribué sans passer par le canal officiel (cartable des élèves) — peut être contesté par le chef d'établissement.
- Démarchage actif des autres parents le jour du scrutin dans l'enceinte de l'école.
- Diffusion publique du dépouillement nominatif (les listes d'émargement ne sont pas un document public).
