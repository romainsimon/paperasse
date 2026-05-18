# Notification de Décision d'Assemblée Générale

**LETTRE RECOMMANDÉE AVEC ACCUSÉ DE RÉCEPTION**

---

**{{copro.name}}**
{{copro.address}}

---

{{ville}}, le {{date}}

**À l'attention de :**
{{nom_coproprietaire}}
{{adresse_coproprietaire}}

**Objet : Communication des décisions de l'Assemblée Générale {{type}} du {{date_ag}}**

---

Madame, Monsieur,

Conformément à l'article 3.85 du Code civil belge, l'**Association des Copropriétaires (ACP)** de l'immeuble {{copro.name}} a l'honneur de vous communiquer les décisions prises lors de l'Assemblée Générale {{type: ordinaire/extraordinaire}} qui s'est tenue le {{date_ag}}.

Cette communication intervient dans le délai de 30 jours suivant la tenue de l'assemblée, tel que prévu par l'article 3.85 du Code civil belge.

{{#si absent}}
Vous étiez absent(e) et non représenté(e) lors de cette assemblée.
{{/si}}

{{#si opposant}}
Vous avez voté contre {{la/les}} résolution(s) mentionnée(s) ci-dessous.
{{/si}}

{{#si abstentionniste}}
Vous vous êtes abstenu(e) lors du vote {{de la/des}} résolution(s) mentionnée(s) ci-dessous.
{{/si}}

## Résolutions adoptées

{{Pour chaque résolution :}}

### Résolution n°{{n}} — {{objet}}

**Majorité appliquée** : {{majorité simple / 4/5 / unanimité}} (art. 3.84 Cc belge)
**Résultat** : {{ADOPTÉE / REJETÉE}} ({{tant_oui}} tantièmes pour, {{tant_non}} contre, {{tant_abstention}} abstentions)

{{Description succincte de la décision}}

---

## Voies de recours

Conformément à l'article 3.84 §7 du Code civil belge, toute action en contestation d'une décision de l'Assemblée Générale doit être introduite devant le **Juge de Paix** compétent dans un **délai de 4 mois** à compter de la communication du procès-verbal.

Ce délai court à compter de la réception de la présente lettre recommandée.

## Document joint

- Procès-verbal de l'Assemblée Générale du {{date_ag}}

---

Veuillez agréer, Madame, Monsieur, l'expression de nos salutations distinguées.

Le syndic,
{{syndic_nom}}
