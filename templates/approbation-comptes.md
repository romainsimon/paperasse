# Décision d'Approbation des Comptes Annuels

**{{company.name}}**
{{company.legal_form}} — Siège social : {{company.address}}
BCE {{company.bce}}

---

<!-- Ce template s'adapte à la forme juridique :
     - SRL à associé unique / SA unipersonnelle : décision de l'associé unique
     - SRL / SA / SNC / SCS : PV d'Assemblée Générale Ordinaire
     Adapter le titre et les formulations selon company.legal_form -->

## {{company.legal_form == "SRL associé unique" ou "SA unipersonnelle" ? "Décision de l'associé unique" : "Procès-verbal de l'Assemblée Générale Ordinaire"}} en date du ../../....

{{company.president.civility}} {{company.president.first_name}} {{company.president.last_name}}, {{company.president.title}} de la société {{company.name}}, a pris les décisions suivantes conformément au Code des Sociétés et des Associations (CSA) :

---

### Première décision : Approbation des comptes annuels de l'exercice clos le {{company.fiscal_year.end_formatted}}

Conformément aux articles 3:1 et 3:10 du CSA, et après avoir pris connaissance du rapport du conseil d'administration (rapport de gestion) sur l'activité de la société au cours de l'exercice clos le {{company.fiscal_year.end_formatted}}, les comptes annuels de cet exercice sont approuvés tels qu'ils ont été présentés, à savoir :

- **Total du bilan** : .......... EUR
- **Résultat net de l'exercice** : .......... EUR (bénéfice / perte)

Les comptes annuels ont été établis conformément au Plan Comptable Minimum Normalisé (PCMN) et aux dispositions du CSA.

Quitus est donné au {{company.president.title}} de sa gestion pour ledit exercice.

> **Délai légal** : l'AG ordinaire doit se tenir dans les 6 mois suivant la date de clôture de l'exercice (art. 5:141 CSA pour la SRL ; art. 7:183 CSA pour la SA).

---

### Deuxième décision : Affectation du résultat

Le résultat de l'exercice est affecté de la manière suivante :

| Affectation | Montant |
|---|---:|
| Réserve légale (5% du bénéfice net) | .......... EUR |
| Réserve de liquidation (VVPRter — art. 184quater CIR 92) | .......... EUR |
| Report à nouveau | .......... EUR |
| Distribution de dividendes | .......... EUR |
| **Total** | **.......... EUR** |

> **Note** : Pour les SA, la dotation à la réserve légale est obligatoire jusqu'à ce que celle-ci atteigne 10% du capital souscrit. Pour les SRL, les statuts peuvent prévoir une réserve statutaire. La constitution d'une réserve de liquidation est soumise à une cotisation distincte de 10% (VVPRter).

> **Test de liquidité et de solvabilité** (art. 5:142–5:143 CSA pour la SRL) : avant toute distribution, le conseil d'administration doit s'assurer que la société pourra faire face à ses dettes pendant au moins 12 mois suivant la distribution.

---

### Troisième décision : Conventions entre parties liées

Il est pris acte des conventions conclues entre la société et ses administrateurs, gérants ou actionnaires, visées aux articles 5:76 (SRL) ou 7:96 (SA) du CSA, conclues au cours de l'exercice écoulé :

<!-- Lister ici les conventions (compte courant 489/55, bail, etc.) -->
- Convention de compte courant d'associé : .......... EUR au {{company.fiscal_year.end_formatted}}

---

### Quatrième décision : Dépôt à la Banque Nationale de Belgique

Le {{company.president.title}} est autorisé à procéder au dépôt des comptes annuels approuvés auprès de la Banque Nationale de Belgique (Centrale des Bilans) via https://cri.nbb.be, dans les 30 jours suivant la présente approbation et au plus tard 7 mois après la clôture de l'exercice (art. 3:10 CSA).

> **Note** : En Belgique, le dépôt des comptes annuels s'effectue exclusivement à la BNB. Il n'existe pas de dépôt au greffe du Tribunal de l'Entreprise (TRE) pour les comptes annuels — le TRE n'intervient que pour les actes constitutifs et les modifications statutaires.

---

### Cinquième décision : Pouvoirs

Tous pouvoirs sont conférés au porteur d'un original ou d'une copie des présentes pour accomplir toutes les formalités légales de publicité, notamment le dépôt à la BNB et la transmission de la déclaration ISOC 275 via Tax-on-web.

---

Fait à {{company.city}}, le ../../....

**{{company.president.civility}} {{company.president.first_name}} {{company.president.last_name}}**
{{company.president.title}}

*Signature :*
