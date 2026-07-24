# Feuille de Présence

*Établie en application de l'article 13 du décret n67-223 du 17 mars 1967*

---

**SYNDICAT DES COPROPRIÉTAIRES**
**{{copro.name}}**
{{copro.address}}

**Assemblée Générale {{type}} du {{date_ag}}**
**Lieu** : {{lieu}}

---

## Copropriétaires

| N | Nom | Lot(s) | Tantièmes | Présent | Représenté par | Correspondance | Signature |
|---|-----|--------|----------:|:-------:|---------------|:--------------:|-----------|
{{#pour chaque copropriétaire}}
| {{n}} | {{nom}} | {{lots}} | {{tantiemes}} | ☐ | {{mandataire}} | ☐ | |
{{/pour}}

---

## Récapitulatif

| Statut | Copropriétaires | Tantièmes | % |
|--------|----------------:|----------:|--:|
| Présents | {{nb_presents}} | {{tant_presents}} | {{pct_presents}}% |
| Représentés (pouvoir) | {{nb_representes}} | {{tant_representes}} | {{pct_representes}}% |
| Vote par correspondance | {{nb_correspondance}} | {{tant_correspondance}} | {{pct_correspondance}}% |
| **Total participants** | **{{total_participants}}** | **{{total_tantiemes_participants}}** | **{{pct_total}}%** |
| Absents non représentés | {{nb_absents}} | {{tant_absents}} | {{pct_absents}}% |
| **Total copropriétaires** | **{{total_copro}}** | **{{tantiemes_total}}** | **100%** |

---

## Vérifications

- [ ] Nombre total de tantièmes = {{tantiemes_total}} (conforme au règlement de copropriété)
- [ ] Aucun mandataire ne détient plus de 3 mandats (sauf si total voix ≤ 10%)
- [ ] Les pouvoirs écrits sont annexés à la présente feuille

---

**Certifiée exacte par le président de séance :**

Nom : _________________________

Signature : _________________________

Date : {{date_ag}}
