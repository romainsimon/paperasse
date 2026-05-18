# Barème des accroissements d'impôt et amendes fiscales

last_updated: 2026-05-15

## Intérêts de retard (art. 414 CIR 92)

| Paramètre | Valeur |
|-----------|--------|
| Taux annuel | **4 % pour 2025** (taux révisable annuellement, plancher légal 4 % – plafond 10 %, art. 414 §2 CIR 92) |
| Point de départ | Jour suivant l'expiration du délai de paiement |
| Point d'arrêt | Jour du paiement effectif |
| Base légale | Art. 414 §1 CIR 92 — retard de paiement |
| Intérêts moratoires (remboursements) | Art. 418 CIR 92 |

### Exemple de calcul

```
Base redressée : 1 000 de charges rejetées
ISOC supplémentaire : 1 000 x 25% = 250
Intérêts (12 mois) : 250 x 4% = 10,00
Total : 260,00
```

## Accroissements d'impôt (art. 444 CIR 92)

| Situation | Taux | Condition |
|-----------|------|-----------|
| Première infraction, bonne foi | 0% | Tolérance administrative |
| 1re infraction sans bonne foi | 10% | Négligence ou erreur intentionnelle |
| 2e infraction | 20% | Récidive |
| 3e infraction | 30% | Récidive répétée |
| Fraude (3e infraction ou plus) | 50% | Intention frauduleuse établie |
| Fraude grave | 50% | Dès la première infraction frauduleuse grave |
| Fraude organisée / récidive grave | 100% à 200% | Cas les plus graves |
| Abus de droit fiscal (art. 344 §1 CIR 92) | 50% | Montage artificiel sans substance économique |

### Formule de calcul : bonne foi (1re infraction)

```
Base redressée : X
ISOC rappelé : X x 25% (ou 20% taux réduit PME si applicable)
+ Intérêts de retard : ISOC x 4% x (nb jours / 365)   [taux 2025 ; révisable annuellement, bornes 4%–10%]
+ Accroissement 0% (bonne foi) : 0
= Total rappel
```

### Formule de calcul : 1re infraction sans bonne foi

```
Base redressée : X
ISOC rappelé : X x 25%
+ Intérêts de retard : ISOC x 4% x (nb jours / 365)   [taux 2025 ; révisable annuellement, bornes 4%–10%]
+ Accroissement 10% : ISOC x 10%
= Total rappel
```

### Formule de calcul : fraude grave

```
Base redressée : X
ISOC rappelé : X x 25%
+ Intérêts de retard : ISOC x 4% x (nb jours / 365)   [taux 2025 ; révisable annuellement, bornes 4%–10%]
+ Accroissement 50% : ISOC x 50%
= Total rappel
```

## Amendes fiscales TVA (CTVA)

| Situation | Amende | Base légale |
|-----------|--------|-------------|
| Non-dépôt déclaration TVA | Amende proportionnelle au solde dû | Art. 70 CTVA |
| Erreur sur déclaration TVA | Amende fixe ou proportionnelle | Art. 70 §1 CTVA |
| Absence de facturation | 10% à 100% de la TVA éludée | Art. 70 §2 CTVA |
| Dépassement seuil franchise art. 56bis CTVA | Rappel TVA + intérêts + amendes | Art. 56bis CTVA |

## Délais de prescription (art. 354 CIR 92)

| Situation | Délai |
|-----------|-------|
| Délai ordinaire | 3 ans à compter du 1er janvier de l'année d'imposition |
| Indice de fraude | 5 ans (art. 354 al. 2 CIR 92) |
| Fraude grave avec intention | 7 ans (art. 354 al. 3 CIR 92) |

## Procédures spécifiques belges

### Demande de renseignements (art. 316 CIR 92)

L'administration peut adresser au contribuable une **demande de renseignements** écrite. Le contribuable dispose d'**un mois** pour répondre (prolongeable sur demande motivée). En cas de refus ou de réponse insuffisante, l'administration peut procéder à une taxation d'office.

### Taxation d'office (art. 351 CIR 92)

En cas de non-dépôt de déclaration ou de refus de communication, l'administration peut établir la base imposable d'office. Le contribuable supporte alors la charge de la preuve de l'exagération de la cotisation.

### Abus de droit fiscal (art. 344 §1 CIR 92)

L'administration peut ignorer les actes juridiques ou l'ensemble d'actes réalisant une même opération lorsque l'administration démontre que l'opération est abusive. Accroissement applicable : **50%**.

### Commission de conciliation fiscale

En cas de désaccord persistant avec l'AGFisc (Administration Générale de la Fiscalité), le contribuable peut saisir la **Commission de conciliation fiscale** (pas de Commission Départementale — concept français non applicable en Belgique).

### Service de Décisions Anticipées (SDA)

Le **SDA** (ruling fiscal belge) permet d'obtenir une décision anticipée sur l'application de la loi fiscale à une situation concrète non encore réalisée. Différent du rescrit français (CGI) : le SDA belge a force contraignante pour l'administration pendant 5 ans.

## Grille d'évaluation du risque

### Facteurs aggravants

| Facteur | Impact |
|---------|--------|
| SRL/SA sans réviseur | Contrôle renforcé sur les charges perso |
| Premier exercice | Peu d'historique, erreurs fréquentes |
| CA en devises | Risque sur les taux de conversion |
| Compte courant élevé (associé) | Suspicion de confusion patrimoine |
| Activité internet/SaaS | Difficultés de rattachement territorial |
| Absence de livre-journal probant | Risque de rejet de la comptabilité (art. 315 CIR 92) |

### Facteurs atténuants

| Facteur | Impact |
|---------|--------|
| Petite taille (CA < 50k) | Contrôle allégé |
| Comptabilité régulière | Livre-journal conforme, écritures équilibrées |
| Première infraction de bonne foi | Accroissement 0% tolérance administrative |
| Pas de salariés | Pas de risques ONSS |
| Franchise TVA (art. 56bis CTVA) | Pas de risque TVA collectée si sous le seuil |

## Cas pratiques de redressement courants

### Cas 1 : Charges personnelles portées en compte courant

**Fait** : L'associé fait payer par la société des abonnements à usage mixte (perso + pro) sans prorata.

**Redressement** :
- Réintégration de la quote-part personnelle dans la base imposable ISOC
- Qualification possible en « avantage de toute nature » → cotisations ONSS + impôt personnes physiques
- Si montants élevés : acte anormal de gestion (jurisprudence Cour de cassation belge)

### Cas 2 : Bureau à domicile surévalué

**Fait** : Quote-part déclarée supérieure à la surface réelle.

**Redressement** :
- Réintégration de l'excédent (% déclaré - % réel) x charges (art. 49 CIR 92)
- Base : charges de copropriété + électricité + internet + précompte immobilier + assurance
- Accroissement 0% (1re infraction bonne foi) ou 10%+ si récurrent

### Cas 3 : Charges pré-constitution hors conditions

**Fait** : Charges reprises mais l'état des actes n'est pas annexé aux statuts ou PV.

**Redressement** :
- Réintégration de l'intégralité des charges pré-constitution
- ISOC supplémentaire : montant x taux ISOC applicable
- Référence CSA : art. 6:4 (SRL) / 7:11 (SA) pour la reprise des actes préconstitutifs

### Cas 4 : CA omis (solde créditeur compte clients)

**Fait** : Solde créditeur du compte clients non expliqué (fréquent avec les payouts Stripe incluant du CA hors exercice).

**Redressement possible** :
- Si le contrôleur considère = CA non déclaré : ajout au résultat fiscal
- ISOC sur le montant
- Accroissement 10% à 50% selon degré d'intentionnalité

### Cas 5 : Taux de conversion incorrect

**Fait** : Taux unique appliqué vs taux réel moyen BCE différent.

**Redressement** :
- Recalcul de toutes les charges en devises au taux correct (taux BCE)
- Différence = charges sous/sur-évaluées
- ISOC sur l'écart

## Tableau de synthèse — Risques typiques PME/TPE belges

| Risque | Probabilité | Impact max | Recommandation |
|--------|-------------|-----------|----------------|
| Charges perso en compte courant | Élevée | Réintégration totale + accroissement 10-50% | Documenter chaque ligne |
| Bureau domicile | Moyenne | Réintégration excédent + accroissement 0-10% | Avoir un plan coté |
| Charges pré-constitution | Moyenne | Réintégration totale + accroissement 0-10% | Vérifier état des actes (CSA) |
| CA omis (compte clients créditeur) | Faible | + CA au résultat + accroissement 10-50% | Documenter l'origine |
| Taux conversion | Faible | Écart de quelques % | Utiliser taux BCE mensuel |
| Amortissements (art. 61 CIR 92) | Faible | Réintégration excédent | Vérifier calcul exact |
| TVA franchise (art. 56bis CTVA) | Très faible | Rappel TVA si seuil 25 000€ dépassé | Monitorer CA annualisé |
