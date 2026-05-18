# Appel de Fonds

**{{copro.name}}**
{{copro.address}}

---

{{ville}}, le {{date}}

**Objet : Appel de fonds — {{trimestre}} {{année}}**

Madame, Monsieur {{nom_coproprietaire}},

Conformément au budget prévisionnel voté lors de l'Assemblée Générale du {{date_ag}}, l'**Association des Copropriétaires (ACP)** vous adresse ci-dessous le détail de votre appel de fonds pour le {{trimestre}} trimestre {{année}}, conformément à l'article 3.79 du Code civil belge.

## Détail de l'appel

**Lot(s)** : {{liste_lots}}
**Tantièmes** : {{tantièmes}} / {{total_tantièmes}} (clé {{nom_cle}})

| Poste | Montant |
|-------|--------:|
| Quote-part charges ordinaires (budget courant) | {{montant_provisions}} EUR |
| Cotisation fonds de réserve (art. 3.89 §1 Cc belge) | {{montant_fonds_reserve}} EUR |
{{#si travaux_votes}}
| Appel travaux : {{description_travaux}} | {{montant_travaux}} EUR |
{{/si}}
| **TOTAL À RÉGLER** | **{{total}} EUR** |

## Modalités de règlement

**Date d'exigibilité** : {{date_exigibilite}}

**Virement bancaire — Compte courant ACP** (charges ordinaires) :
- IBAN : {{iban_courant}}
- BIC : {{bic_courant}}
- Référence : {{lot}}-T{{trimestre}}-{{année}}

**Virement bancaire — Compte fonds de réserve ACP** (si appel fonds de réserve séparé) :
- IBAN : {{iban_reserve}}
- BIC : {{bic_reserve}}
- Référence : {{lot}}-FR-T{{trimestre}}-{{année}}

*En cas de retard de paiement, des intérêts au taux légal belge seront dus de plein droit à compter de l'échéance (loi du 2 août 2002 sur les retards de paiement).*

## Situation de votre compte

| | Montant |
|--|--------:|
| Solde précédent | {{solde_precedent}} EUR |
| Appel en cours | {{total}} EUR |
| Versements reçus | {{versements}} EUR |
| **Solde à ce jour** | **{{solde_actuel}} EUR** |

{{#si solde_debiteur}}
Votre compte présente un solde débiteur. Nous vous invitons à régulariser votre situation dans les meilleurs délais afin d'éviter une procédure de recouvrement.
{{/si}}

---

Le syndic,
{{syndic_nom}}

---

*En cas de question, contacter : {{contact_email}} / {{contact_telephone}}*
