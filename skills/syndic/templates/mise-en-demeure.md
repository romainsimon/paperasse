# Mise en Demeure

**LETTRE RECOMMANDÉE AVEC ACCUSÉ DE RÉCEPTION**

---

**{{copro.name}}**
{{copro.address}}
Représentée par son syndic {{syndic_nom}}

---

{{ville}}, le {{date}}

**À l'attention de :**
{{nom_coproprietaire}}
{{adresse_coproprietaire}}

**Objet : Mise en demeure de payer les charges de copropriété**
**Lot(s) : {{lots}}**
**Montant dû : {{montant_total}} EUR**

---

Madame, Monsieur,

Malgré nos précédentes relances {{en date(s) du {{dates_relances}}}}, nous constatons que votre compte copropriétaire présente à ce jour un solde débiteur de **{{montant_total}} EUR**, détaillé comme suit :

| Période | Nature | Montant |
|---------|--------|--------:|
{{#pour chaque impayé}}
| {{periode}} | {{nature}} | {{montant}} EUR |
{{/pour}}
| | **TOTAL** | **{{montant_total}} EUR** |

Conformément aux dispositions de l'article 10 de la loi n65-557 du 10 juillet 1965, les charges de copropriété sont des obligations légales auxquelles chaque copropriétaire est tenu à proportion de ses tantièmes.

Par la présente, **nous vous mettons en demeure de régler la somme de {{montant_total}} EUR dans un délai de 30 jours** à compter de la réception de ce courrier.

## Conséquences en cas de non-paiement

À défaut de règlement dans le délai imparti, nous serons contraints de :

1. **Rendre exigibles** l'ensemble des provisions non encore échues de l'exercice en cours, conformément à l'article 19-2 de la loi du 10 juillet 1965 (déchéance du terme)
2. **Engager une procédure judiciaire** de recouvrement (injonction de payer ou assignation devant le tribunal judiciaire)
3. **Les frais de recouvrement** (frais d'huissier, frais de procédure, honoraires d'avocat) seront à votre charge exclusive, conformément à l'article 10-1 de la loi du 10 juillet 1965

Nous vous rappelons que le syndicat des copropriétaires bénéficie d'un **privilège immobilier spécial** sur votre lot, garantissant le recouvrement des charges (article 19-2 de la loi du 10 juillet 1965).

## Modalités de règlement

**Virement bancaire** :
- IBAN : {{iban}}
- BIC : {{bic}}
- Référence : {{lot}}-MED-{{date}}

**Chèque** à l'ordre de : Syndicat des copropriétaires {{copro.name}}

Si vous traversez des difficultés financières, nous vous invitons à prendre contact avec nous dans les meilleurs délais afin de convenir d'un échéancier de paiement.

Veuillez agréer, Madame, Monsieur, l'expression de nos salutations distinguées.

---

Le syndic,
{{syndic_nom}}

---

*Copie : Conseil syndical*
