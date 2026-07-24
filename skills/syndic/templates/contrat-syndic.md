# Contrat de Syndic

*Conforme au contrat type prévu par le décret n2015-342 du 26 mars 2015*

---

## Entre les parties

**Le syndicat des copropriétaires** de la copropriété {{copro.name}}, sise {{copro.address}}, immatriculée au registre national des copropriétés sous le numéro {{immatriculation}}, représenté par l'Assemblée Générale des copropriétaires,

ci-après désigné « le syndicat »,

**Et**

{{#si syndic_benevole}}
**{{nom_syndic}}**, copropriétaire du lot n{{lot_syndic}}, demeurant {{adresse_syndic}},
ci-après désigné « le syndic bénévole »,
{{/si}}

{{#si syndic_cooperatif}}
**Le conseil syndical** de la copropriété, composé de :
- {{membre_1}}, Président
- {{membre_2}}, Membre
- {{membre_3}}, Membre

Le président du conseil syndical assurant les fonctions de syndic conformément à l'article 17-1-1 de la loi du 10 juillet 1965,
ci-après désigné « le syndic coopératif »,
{{/si}}

---

## Article 1 : Objet

Le syndic est chargé d'assurer l'exécution des dispositions du règlement de copropriété et des délibérations de l'Assemblée Générale, conformément aux articles 18 et suivants de la loi n65-557 du 10 juillet 1965.

## Article 2 : Durée du mandat

Le présent contrat prend effet le {{date_debut}}.

Il est conclu pour une durée de {{duree}} {{mois/année(s)}}, soit jusqu'au {{date_fin}}.

Il prendra fin de plein droit si l'Assemblée Générale désigne un autre syndic à l'expiration du mandat.

## Article 3 : Missions de gestion courante

Le syndic assure, dans le cadre de sa mission de gestion courante :

### 3.1 Administration

- Exécution des décisions de l'AG
- Gestion du personnel de l'immeuble (le cas échéant)
- Représentation du syndicat dans les actes civils et en justice
- Conservation des archives
- Tenue et mise à jour du carnet d'entretien
- Établissement et mise à jour de la fiche synthétique
- Mise à disposition d'un espace en ligne sécurisé (extranet)
- Immatriculation et mise à jour au registre national des copropriétés

### 3.2 Comptabilité et finances

- Tenue de la comptabilité du syndicat (partie double, décret 2005)
- Établissement du budget prévisionnel
- Appels de fonds trimestriels
- Gestion du compte bancaire séparé
- Paiement des fournisseurs
- Suivi des impayés et relances
- Préparation des comptes annuels et des 5 annexes
- Gestion du fonds de travaux (art. 14-2)

### 3.3 Assemblées Générales

- Convocation de l'AG annuelle (LRAR, 21 jours)
- Préparation de l'ordre du jour et des documents joints
- Organisation matérielle de l'AG
- Rédaction du procès-verbal
- Notification du PV aux absents, opposants et abstentionnistes

### 3.4 Entretien et travaux

- Gestion des contrats d'entretien et de maintenance
- Mise en concurrence des prestataires
- Suivi des travaux courants
- Gestion des sinistres et déclarations d'assurance
- Interventions d'urgence pour la conservation de l'immeuble

## Article 4 : Prestations complémentaires

Les prestations suivantes ne sont pas incluses dans la gestion courante et font l'objet d'une facturation séparée, le cas échéant :

- Suivi de travaux importants (au-delà de {{seuil}} EUR)
- Gestion de sinistres complexes
- Représentation en justice (au-delà de la simple mise en demeure)
- Assemblées Générales extraordinaires (au-delà de 1 AG/an)

## Article 5 : Rémunération

{{#si syndic_benevole}}
Le syndic bénévole exerce ses fonctions à titre **gratuit**.

Les frais engagés dans l'exercice de ses fonctions (affranchissement, déplacements, téléphone) sont remboursés sur justificatifs, dans la limite de {{plafond}} EUR par an.
{{/si}}

{{#si syndic_cooperatif}}
Les membres du conseil syndical exercent les fonctions de syndic à titre **gratuit**.

Les frais engagés dans l'exercice de leurs fonctions sont remboursés sur justificatifs, dans la limite de {{plafond}} EUR par an.
{{/si}}

## Article 6 : Compte bancaire séparé

Conformément à l'article 18, II de la loi du 10 juillet 1965, les fonds du syndicat sont déposés sur un compte bancaire séparé, ouvert au nom du syndicat des copropriétaires.

**Banque** : {{banque}}
**IBAN** : {{iban}}

## Article 7 : Assurance

{{#si syndic_benevole}}
Le syndic bénévole souscrit une assurance responsabilité civile couvrant les conséquences de sa gestion. La prime est prise en charge par le syndicat des copropriétaires.
{{/si}}

## Article 8 : Fin du mandat

Le présent contrat prend fin :
- À l'expiration de sa durée
- Par décision de l'AG (révocation à la majorité de l'art. 25)
- Par démission du syndic (avec préavis de {{preavis}} mois)

En cas de cessation des fonctions, le syndic est tenu de remettre au nouveau syndic l'ensemble des documents et archives dans un délai de 3 mois (art. 18-2 loi 1965).

---

Fait à {{ville}}, le {{date}}

En deux exemplaires originaux.

**Pour le syndicat des copropriétaires** :
Le président de séance de l'AG du {{date_ag}}

Signature : _________________________

**Le syndic** :

Signature : _________________________
