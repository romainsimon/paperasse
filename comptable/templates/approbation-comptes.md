# Décision d'Approbation des Comptes Annuels

**{{company.name}}**
{{company.legal_form}} au capital de {{company.capital}} EUR
Siège social : {{company.address}}
SIREN {{company.siren}} — {{company.rcs}}

---

<!-- Ce template s'adapte à la forme juridique :
     - SASU / EURL : décision de l'associé unique
     - SAS / SARL / SA : PV d'Assemblée Générale Ordinaire
     Adapter le titre et les formulations selon company.legal_form -->

## {{company.legal_form == "SASU" ou "EURL" ? "Décision de l'associé unique" : "Procès-verbal de l'Assemblée Générale Ordinaire"}} en date du ../../....

{{company.president.civility}} {{company.president.first_name}} {{company.president.last_name}}, {{company.president.title}} de la société {{company.name}}, a pris les décisions suivantes :

---

### Première décision : Approbation des comptes de l'exercice clos le {{company.fiscal_year.end_formatted}}

Après avoir pris connaissance du rapport de gestion sur l'activité de la société au cours de l'exercice clos le {{company.fiscal_year.end_formatted}}, les comptes annuels de cet exercice sont approuvés tels qu'ils ont été présentés, à savoir :

- **Total du bilan** : .......... EUR
- **Résultat net de l'exercice** : .......... EUR (bénéfice / perte)

Quitus est donné au {{company.president.title}} de sa gestion pour ledit exercice.

---

### Deuxième décision : Affectation du résultat

Le résultat de l'exercice est affecté de la manière suivante :

| Affectation | Montant |
|---|---:|
| Réserve légale (5% du bénéfice, max 10% du capital) | .......... EUR |
| Report à nouveau | .......... EUR |
| **Total** | **.......... EUR** |

> **Note** : La dotation à la réserve légale est obligatoire tant que celle-ci n'a pas atteint 10% du capital social (art. L. 232-10 C. com.).

---

### Troisième décision : Conventions réglementées

Il est pris acte des conventions visées à l'article L. 227-10 (SAS/SASU) ou L. 223-19 (SARL/EURL) du code de commerce conclues au cours de l'exercice écoulé :

<!-- Lister ici les conventions (compte courant 455, bail, etc.) -->
- Convention de compte courant d'associé : .......... EUR au 31/12

---

### Quatrième décision : Déclaration de confidentialité

Le {{company.president.title}} est autorisé à souscrire la déclaration de confidentialité prévue à l'article L. 232-25 du code de commerce, afin que le compte de résultat de l'exercice ne soit pas rendu public lors du dépôt au greffe.

> **Conditions** (art. L. 123-16 C. com.) : la société ne dépasse pas deux des trois seuils suivants : total bilan 7,5 M EUR, CA net 15 M EUR, 50 salariés.

---

### Cinquième décision : Pouvoirs

Tous pouvoirs sont conférés au porteur d'un original ou d'une copie des présentes pour accomplir toutes les formalités légales de publicité.

---

Fait à {{company.city}}, le ../../....

**{{company.president.civility}} {{company.president.first_name}} {{company.president.last_name}}**
{{company.president.title}}

*Signature :*
