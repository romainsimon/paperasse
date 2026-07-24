# Appel de Fonds

**{{copro.name}}**
{{copro.address}}

---

{{ville}}, le {{date}}

**Objet : Appel de fonds — {{trimestre}} {{année}}**

Madame, Monsieur {{nom_coproprietaire}},

Conformément au budget prévisionnel voté lors de l'Assemblée Générale du {{date_ag}}, nous vous prions de bien vouloir trouver ci-dessous le détail de votre appel de fonds pour le {{trimestre}} trimestre {{année}}.

## Détail de l'appel

**Lot(s)** : {{liste_lots}}
**Tantièmes** : {{tantièmes}} / {{total_tantièmes}} (clé {{nom_cle}})

| Poste | Montant |
|-------|--------:|
| Provisions sur charges courantes | {{montant_provisions}} EUR |
| Cotisation fonds de travaux (art. 14-2) | {{montant_fonds_travaux}} EUR |
{{#si travaux_votes}}
| Appel travaux : {{description_travaux}} | {{montant_travaux}} EUR |
{{/si}}
| **TOTAL À RÉGLER** | **{{total}} EUR** |

## Modalités de règlement

**Date d'exigibilité** : {{date_exigibilite}}

**Virement bancaire** (mode privilégié) :
- IBAN : {{iban}}
- BIC : {{bic}}
- Référence : {{lot}}-T{{trimestre}}-{{année}}

**Chèque** à l'ordre de : Syndicat des copropriétaires {{copro.name}}

## Situation de votre compte

| | Montant |
|--|--------:|
| Solde précédent | {{solde_precedent}} EUR |
| Appel en cours | {{total}} EUR |
| Versements reçus | {{versements}} EUR |
| **Solde à ce jour** | **{{solde_actuel}} EUR** |

{{#si solde_debiteur}}
⚠️ Votre compte présente un solde débiteur. Nous vous invitons à régulariser votre situation dans les meilleurs délais.
{{/si}}

---

Le syndic,
{{syndic_nom}}

---

*En cas de question, contacter : {{contact_email}} / {{contact_telephone}}*
