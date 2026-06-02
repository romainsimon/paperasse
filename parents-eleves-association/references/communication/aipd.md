# AIPD — Analyse d'Impact relative à la Protection des Données

Référence : RGPD art. 35 + lignes directrices EDPB WP248.

## Principe

Une AIPD est obligatoire lorsque le traitement est susceptible d'engendrer un **risque
élevé** pour les droits et libertés des personnes.

## Pour une APE — cas typiques

| Traitement | AIPD obligatoire ? | Justification |
|------------|-------------------|---------------|
| Mailing newsletter | Non | Risque limité, base consentement, droits effectifs |
| Photos d'événements (cercle interne et public) | Non en règle générale | Traitement limité, consentement, droit de retrait |
| Liste WhatsApp parents | Non | Petite échelle, consentement |
| Billetterie événement | Non | Traitement courant, sous-traitant conforme |
| Fiches sanitaires sortie | Non si conservation strictement limitée à la sortie | Sinon, à évaluer |
| Application mobile avec géoloc enfants | **Oui** | Suivi systématique de mineurs |
| Vidéosurveillance d'un événement | **Oui** | Surveillance à grande échelle, dont mineurs |
| Stockage durable de données de santé | **Oui** | Données sensibles à grande échelle |
| Reconnaissance faciale (entrée événement) | **Oui** | Biométrie + mineurs |

## Critères CNIL (9 critères, AIPD requise si 2+ remplis)

1. Évaluation / scoring.
2. Décision automatisée avec effet juridique.
3. Surveillance systématique.
4. Données sensibles ou à caractère hautement personnel.
5. Traitement à grande échelle.
6. Croisement / combinaison de jeux de données.
7. Personnes vulnérables (dont **mineurs**).
8. Usage innovant ou nouvelles solutions technologiques.
9. Exclusion du bénéfice d'un droit / contrat / service.

Pour une APE, le critère 7 (mineurs) est presque toujours présent — il en faut un autre
pour basculer en AIPD obligatoire.

## Quand faire une AIPD volontaire

- Premier déploiement d'un outil sensible (visiocoordination, application dédiée enfants).
- Avant signature d'un contrat avec un nouveau sous-traitant qui traitera des données
  d'enfants à grande échelle.
- Avant tout livestream d'un événement.

## Structure type d'une AIPD

1. Description du traitement (finalités, données, flux).
2. Évaluation de la nécessité et de la proportionnalité.
3. Identification des risques (atteinte vie privée, dignité, surveillance).
4. Mesures envisagées pour traiter les risques.
5. Validation par le ou la président·e (et DPO si désigné).
6. Le cas échéant, consultation préalable de la CNIL (art. 36).

Modèle PIA Open-source de la CNIL : https://www.cnil.fr/fr/outil-pia-telechargez-et-installez-le-logiciel-de-la-cnil

## Liste CNIL — traitements pour lesquels l'AIPD est obligatoire

Délibération CNIL n° 2018-327 du 11 octobre 2018 :
https://www.cnil.fr/sites/cnil/files/atoms/files/liste-traitements-aipd-requise-v2.pdf

Liste CNIL — traitements pour lesquels l'AIPD **n'est pas** requise :
https://www.cnil.fr/sites/cnil/files/atoms/files/liste-traitements-aipd-non-requise.pdf

## Pratique APE

Pour la majorité des activités d'une APE classique, l'AIPD n'est pas requise. Si on se
pose la question : c'est probablement qu'il faut **renoncer au projet** plutôt que
basculer dans une AIPD coûteuse.
