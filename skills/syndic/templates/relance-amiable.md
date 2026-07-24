# Relance Amiable

---

**{{copro.name}}**
{{copro.address}}

---

{{ville}}, le {{date}}

**À l'attention de :**
{{nom_coproprietaire}}
{{adresse_coproprietaire}}

**Objet : Rappel de paiement des charges de copropriété**
**Lot(s) : {{lots}}**

---

Madame, Monsieur,

Nous nous permettons de vous informer que votre compte copropriétaire présente un solde impayé de **{{montant_total}} EUR** à ce jour.

| Période | Nature | Montant |
|---------|--------|--------:|
{{#pour chaque impayé}}
| {{periode}} | {{nature}} | {{montant}} EUR |
{{/pour}}
| | **Total** | **{{montant_total}} EUR** |

Nous vous saurions gré de bien vouloir régulariser cette situation dans les meilleurs délais.

**Virement bancaire** :
- IBAN : {{iban}}
- Référence : {{lot}}-REL-{{date}}

Si vous rencontrez des difficultés, n'hésitez pas à nous contacter afin de convenir d'un échéancier.

Nous vous prions d'agréer, Madame, Monsieur, nos salutations distinguées.

Le syndic,
{{syndic_nom}}

---

*Ce courrier est un simple rappel. En l'absence de régularisation, une mise en demeure formelle sera adressée par lettre recommandée.*
