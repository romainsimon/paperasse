# Donation Simple (Donation entre Vifs)

[PROJET — À SOUMETTRE AU NOTAIRE INSTRUMENTAIRE]

---

**Base légale** : articles 893 à 966 du Code civil

---

## L'AN {{annee}}, LE {{date}}

Devant Maître {{notaire.nom}}, notaire à {{notaire.ville}} ({{notaire.departement}}), soussigné,

## ONT COMPARU

### LE DONATEUR

**{{donateur.civilite}} {{donateur.nom}} {{donateur.prenom}}**, né(e) le {{donateur.date_naissance}} à {{donateur.lieu_naissance}} ({{donateur.departement_naissance}}),
de nationalité {{donateur.nationalite}},
demeurant {{donateur.adresse}},
{{donateur.situation_matrimoniale}},

Ci-après dénommé(e) « le Donateur ».

### LE DONATAIRE

**{{donataire.civilite}} {{donataire.nom}} {{donataire.prenom}}**, né(e) le {{donataire.date_naissance}} à {{donataire.lieu_naissance}} ({{donataire.departement_naissance}}),
de nationalité {{donataire.nationalite}},
demeurant {{donataire.adresse}},

Ci-après dénommé(e) « le Donataire ».

*(Si le donataire est mineur, représenté par ses représentants légaux : {{mineur.representants}})*

---

## LIEN DE PARENTÉ

Le Donateur est le/la **{{lien_parente}}** du Donataire.

*(Exemples : père, mère, grand-père, grand-mère, oncle, tante, frère, soeur, étranger)*

---

## EXPOSÉ

Le Donateur déclare vouloir gratifier le Donataire d'une donation irrévocable dans les conditions ci-après, et le Donataire déclare accepter cette donation.

Le Donateur déclare :
- Avoir la capacité de disposer à titre gratuit (art. 902 C. civ.)
- Ne pas faire l'objet d'une mesure de protection juridique
- Agir librement, sans contrainte ni pression

---

## DONATION

### Objet de la donation

Par les présentes, le Donateur fait donation entre vifs, pure et simple, irrévocable, au Donataire, qui accepte :

#### Option A — Donation d'une somme d'argent

La somme de **{{donation.montant}} EUR** ({{donation.montant_lettres}} euros), que le Donateur s'engage à verser au Donataire par virement bancaire dans un délai de {{donation.delai_paiement}} à compter de ce jour.

#### Option B — Donation d'un bien immobilier

Le bien immobilier ci-après désigné :

**Nature** : {{bien.nature}}
**Adresse** : {{bien.adresse}}
**Commune** : {{bien.commune}} ({{bien.code_postal}})
**Références cadastrales** : Section {{bien.section}}, parcelle n°{{bien.parcelle}}
**Contenance** : {{bien.contenance}} m²
**Surface habitable** : {{bien.surface}} m²

**Origine de propriété** : Le Donateur est propriétaire de ce bien pour l'avoir acquis de {{bien.origine}} aux termes d'un acte reçu par Maître {{bien.notaire}} le {{bien.date_acquisition}}.

**Valeur déclarée** : **{{bien.valeur}} EUR**

#### Option C — Donation en démembrement (nue-propriété)

Le Donateur fait donation de la **nue-propriété** du bien ci-dessus désigné, s'en réservant l'**usufruit** sa vie durant.

**Valeur de l'usufruit** (art. 669 CGI) : {{demembrement.usufruit_pct}}% soit {{demembrement.usufruit_valeur}} EUR
**Valeur de la nue-propriété** : {{demembrement.np_pct}}% soit {{demembrement.np_valeur}} EUR

*(Le barème de l'art. 669 CGI est déterminé par l'âge du donateur au jour de la donation)*

#### Option D — Donation de valeurs mobilières

Les valeurs mobilières suivantes :

| # | Nature | Quantité | Dépositaire | Valeur au jour de la donation |
|---|--------|----------|-------------|:-----------------------------:|
| 1 | {{titre_1.nature}} | {{titre_1.quantite}} | {{titre_1.depositaire}} | {{titre_1.valeur}} EUR |
| 2 | | | | EUR |

**Valeur totale** : **{{donation.valeur_totale}} EUR**

---

## CONDITIONS

### Charges

La présente donation est consentie aux charges et conditions suivantes :

1. **Payer les droits** : Les droits de donation sont à la charge du ☐ Donateur ☐ Donataire
2. **Clause de retour conventionnel** (art. 951 C. civ.) : ☐ Oui ☐ Non
   *(Si oui : les biens donnés reviendront au Donateur si le Donataire décède avant lui sans postérité)*
3. **Interdiction d'aliéner** : ☐ Oui (durée : {{interdiction.duree}}) ☐ Non
   *(Doit être justifiée par un intérêt sérieux et légitime, et limitée dans le temps)*
4. **Clause d'inaliénabilité** : ☐ Oui ☐ Non
5. **Obligation d'emploi** : ☐ Oui ({{emploi.description}}) ☐ Non

### Rapport à succession

☐ La présente donation est faite en **avancement de part** (rapportable à la succession du Donateur)

☐ La présente donation est faite **hors part** (préciputaire, imputée sur la quotité disponible)

*(Par défaut, toute donation à un héritier présomptif est rapportable, sauf stipulation contraire — art. 843 C. civ.)*

---

## DONATIONS ANTÉRIEURES

Le Donateur déclare :

☐ N'avoir consenti aucune donation antérieure au profit du Donataire

☐ Avoir consenti les donations antérieures suivantes au profit du Donataire :

| Date | Nature | Montant | Abattement utilisé |
|------|--------|:-------:|:-------------------:|
| {{donation_ant_1.date}} | {{donation_ant_1.nature}} | {{donation_ant_1.montant}} EUR | {{donation_ant_1.abattement}} EUR |

*(Les donations de moins de 15 ans sont rappelées fiscalement — art. 784 CGI)*

---

## FISCALITÉ

### Calcul des droits de donation

```
Valeur des biens donnés               {{donation.valeur}} EUR
Abattement ({{lien_parente}})         -{{abattement.montant}} EUR
─────────────────────────────────────────────────────
Net taxable                            {{taxable.montant}} EUR

Droits de donation                     {{droits.montant}} EUR
```

*(Le barème applicable dépend du lien de parenté entre donateur et donataire — voir references/donation.md)*

---

## ACCEPTATION

Le Donataire déclare accepter la présente donation avec reconnaissance et gratitude, aux charges et conditions ci-dessus stipulées.

*(L'acceptation doit être expresse et peut être faite dans le même acte ou par acte séparé — art. 932 C. civ.)*

---

## PUBLICITÉ FONCIÈRE

*(Si donation immobilière)*

La présente donation sera publiée au **Service de Publicité Foncière** compétent.

---

## FRAIS

Les frais des présentes sont à la charge du {{frais.charge}}.

---

Dont acte sur {{nb_pages}} pages.

Fait et passé à {{notaire.ville}}, en l'étude du notaire soussigné.

Et après lecture, les parties ont signé avec le notaire.

**Le Donateur** : _________________________

**Le Donataire** : _________________________

**Le Notaire** : _________________________

---

## RAPPELS IMPORTANTS

- La donation entre vifs est **irrévocable** (art. 894 C. civ.), sauf les trois cas d'exception (inexécution des charges, ingratitude, survenance d'enfants si stipulé)
- La donation doit être faite par **acte notarié** (art. 931 C. civ.), sauf le don manuel
- La donation ne peut pas excéder la **quotité disponible** si le donateur a des héritiers réservataires
- Le don manuel (argent, meubles, valeurs mobilières remis de la main à la main) ne nécessite pas d'acte notarié mais doit être déclaré fiscalement (formulaire 2735)

---

⚠️ **CE DOCUMENT EST UN PROJET DE TRAVAIL.**
Il ne constitue pas un acte authentique. Seul un notaire en exercice peut recevoir une donation entre vifs portant sur un bien immobilier.
