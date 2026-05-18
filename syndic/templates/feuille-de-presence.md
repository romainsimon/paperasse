# Feuille de Présence

*Établie conformément à l'article 3.85 du Code civil belge*

---

**ASSOCIATION DES COPROPRIÉTAIRES (ACP)**
**{{copro.name}}**
{{copro.address}}

**Assemblée Générale {{type}} du {{date_ag}}**
**Lieu** : {{lieu}}

---

## Quorum requis (1re Assemblée Générale)

L'assemblée délibère valablement si **plus de la moitié des copropriétaires** sont présents ou représentés **ET** représentent **plus de la moitié des quotes-parts** de l'immeuble (art. 3.85 §2 Cc belge).

Si ce quorum n'est pas atteint, une seconde assemblée sera convoquée et délibérera sans condition de quorum.

---

## Copropriétaires

| N° | Nom | Lot(s) | Tantièmes | Présent | Représenté par | Signature |
|----|-----|--------|----------:|:-------:|----------------|-----------|
{{#pour chaque copropriétaire}}
| {{n}} | {{nom}} | {{lots}} | {{tantiemes}} | ☐ | {{mandataire}} | |
{{/pour}}

---

## Récapitulatif

| Statut | Copropriétaires | Tantièmes | % |
|--------|----------------:|----------:|--:|
| Présents | {{nb_presents}} | {{tant_presents}} | {{pct_presents}}% |
| Représentés (procuration) | {{nb_representes}} | {{tant_representes}} | {{pct_representes}}% |
| **Total participants** | **{{total_participants}}** | **{{total_tantiemes_participants}}** | **{{pct_total}}%** |
| Absents non représentés | {{nb_absents}} | {{tant_absents}} | {{pct_absents}}% |
| **Total copropriétaires** | **{{total_copro}}** | **{{tantiemes_total}}** | **100%** |

---

## Vérifications

- [ ] Nombre total de tantièmes = {{tantiemes_total}} (conforme aux statuts de la copropriété)
- [ ] Le quorum est atteint : plus de la moitié des copropriétaires ET plus de la moitié des quotes-parts (art. 3.85 §2 Cc belge)
- [ ] Les procurations écrites sont annexées à la présente feuille (art. 3.85 §5 Cc belge)
- [ ] Aucune limite au nombre de mandats par mandataire en droit belge, sauf disposition contraire du ROI

---

**Certifiée exacte par le président de séance :**

Nom : _________________________

Signature : _________________________

Date : {{date_ag}}
