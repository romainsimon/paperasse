# Contrat de Syndic

*Régi par les articles 3.69 à 3.94 du Code civil belge (livre 3, titre 3)*
*Il n'existe pas de contrat de syndic type réglementaire en Belgique — le présent contrat est librement négocié dans le cadre du Code civil belge et du Code des sociétés et des associations (CSA)*

---

## Entre les parties

**L'Association des Copropriétaires (ACP)** de l'immeuble {{copro.name}}, sis {{copro.address}}, représentée par l'Assemblée Générale des copropriétaires,

ci-après désignée « l'ACP »,

**Et**

{{#si syndic_benevole}}
**{{nom_syndic}}**, copropriétaire du lot n°{{lot_syndic}}, demeurant {{adresse_syndic}},
ci-après désigné « le syndic bénévole »,
{{/si}}

{{#si syndic_professionnel}}
**{{syndic.nom}}**, agréé IPI n° {{syndic.ipi}}, dont le siège social est établi à {{syndic.adresse}}, numéro BCE {{syndic.bce}},
ci-après désigné « le syndic »,
{{/si}}

{{#si syndic_cooperatif}}
**Le conseil syndical** de la copropriété, composé de :
- {{membre_1}}, Président
- {{membre_2}}, Membre
- {{membre_3}}, Membre

Le président du conseil syndical assurant les fonctions de syndic conformément aux statuts de la copropriété,
ci-après désigné « le syndic coopératif »,
{{/si}}

---

## Article 1 : Objet

Le syndic est chargé d'assurer l'exécution des dispositions des statuts de la copropriété (acte de base, règlement de copropriété et règlement d'ordre intérieur) et des délibérations de l'Assemblée Générale, conformément aux articles 3.69 à 3.94 du Code civil belge.

## Article 2 : Durée du mandat

Le présent contrat prend effet le {{date_debut}}.

Il est conclu pour une durée maximale de 3 ans (art. 3.84 §4 al. 3 Cc belge), soit jusqu'au {{date_fin}}.

Il prendra fin de plein droit si l'Assemblée Générale désigne un autre syndic à l'expiration du mandat. Le renouvellement du mandat doit être décidé par l'AG.

## Article 3 : Missions légales du syndic (art. 3.84 §4 Cc belge)

Conformément à l'article 3.84 §4 du Code civil belge, le syndic assure les missions suivantes :

### 3.1 Administration

- Exécution des décisions de l'AG et des dispositions des statuts de la copropriété
- Représentation de l'ACP dans les actes civils et en justice
- Conservation des archives de l'ACP
- Gestion du personnel de l'immeuble (le cas échéant)
- Souscription et suivi des contrats d'assurance de l'immeuble
- Mise à disposition d'un espace en ligne sécurisé (si disponible)

### 3.2 Comptabilité et finances

- Tenue de la comptabilité de l'ACP conformément au plan comptable ACP belge (CNC-CBN)
- Établissement du budget prévisionnel (budget ordinaire + fonds de réserve)
- Appels de fonds selon la périodicité décidée en AG
- Gestion des deux comptes bancaires séparés au nom de l'ACP (voir article 6)
- Paiement des fournisseurs
- Suivi des impayés et relances
- Préparation des comptes annuels

### 3.3 Assemblées Générales

- Convocation de l'AG annuelle (LRAR, au moins 15 jours avant la réunion — art. 3.85 §3 Cc belge)
- Préparation de l'ordre du jour et des documents joints
- Organisation matérielle de l'AG
- Rédaction du procès-verbal
- Communication du PV à tous les copropriétaires dans les 30 jours (art. 3.85 Cc belge)

### 3.4 Entretien et travaux

- Gestion des contrats d'entretien et de maintenance
- Mise en concurrence des prestataires
- Suivi des travaux courants
- Gestion des sinistres et déclarations d'assurance (Convention ASSURALIA pour dégâts des eaux)
- Interventions d'urgence pour la conservation de l'immeuble

## Article 4 : Prestations complémentaires

Les prestations suivantes ne sont pas incluses dans la gestion courante et font l'objet d'une facturation séparée, le cas échéant :

- Suivi de travaux importants (au-delà de {{seuil}} EUR)
- Gestion de sinistres complexes
- Représentation en justice (au-delà de la simple mise en demeure)
- Assemblées Générales extraordinaires (au-delà de 1 AG/an)

## Article 5 : Rémunération

{{#si syndic_professionnel}}
**Honoraires forfaitaires mensuels** : {{montant_forfait}} EUR TVAC/mois, soit {{montant_annuel}} EUR TVAC/an.

Les honoraires exceptionnels pour les prestations hors forfait (art. 4) sont facturés selon le tarif joint en annexe.
{{/si}}

{{#si syndic_benevole}}
Le syndic bénévole exerce ses fonctions à titre **gratuit**.

Les frais engagés dans l'exercice de ses fonctions (affranchissement, déplacements, téléphone) sont remboursés sur justificatifs, dans la limite de {{plafond}} EUR par an.
{{/si}}

{{#si syndic_cooperatif}}
Les membres du conseil syndical exercent les fonctions de syndic à titre **gratuit**.

Les frais engagés dans l'exercice de leurs fonctions sont remboursés sur justificatifs, dans la limite de {{plafond}} EUR par an.
{{/si}}

## Article 6 : Comptes bancaires séparés

Conformément à l'article 3.89 §2 du Code civil belge, les fonds de l'ACP sont déposés sur deux comptes bancaires séparés, ouverts au nom de l'ACP :

**Compte courant (charges ordinaires)**
- Banque : {{banque_courant}}
- IBAN : {{iban_courant}} (format BE xx xxxx xxxx xxxx)

**Compte fonds de réserve**
- Banque : {{banque_reserve}}
- IBAN : {{iban_reserve}} (format BE xx xxxx xxxx xxxx)

Ces comptes sont intégralement au nom de l'ACP. Le syndic ne peut en aucun cas confondre ces fonds avec les siens propres.

## Article 7 : Assurance

{{#si syndic_benevole}}
Le syndic bénévole souscrit une assurance responsabilité civile couvrant les conséquences de sa gestion. La prime est prise en charge par l'ACP.
{{/si}}

{{#si syndic_professionnel}}
Le syndic professionnel justifie d'une assurance responsabilité civile professionnelle conformément aux exigences de l'IPI.
{{/si}}

## Article 8 : Fin du mandat

Le présent contrat prend fin :
- À l'expiration de sa durée
- Par décision de l'AG (révocation à la majorité simple)
- Par démission du syndic (avec préavis de {{preavis}} mois)

En cas de cessation des fonctions, le syndic est tenu de remettre au nouveau syndic l'ensemble des documents, archives et fonds de l'ACP dans un délai de **30 jours** à compter de la désignation du nouveau syndic (art. 3.84 §5 Cc belge).

## Article 9 : Droit applicable et juridiction compétente

Le présent contrat est régi par le droit belge, et notamment par les articles 3.69 à 3.94 du Code civil belge.

Tout litige relatif au présent contrat sera soumis au **Juge de Paix du canton de {{copro.canton}}**, conformément aux règles de compétence applicables aux litiges en matière de copropriété.

---

Fait à {{ville}}, le {{date}}

En deux exemplaires originaux.

**Pour l'Association des Copropriétaires** :
Le président de séance de l'AG du {{date_ag}}

Signature : _________________________

**Le syndic** :

Signature : _________________________
