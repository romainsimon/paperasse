# Barème des pénalités fiscales

## Intérêts de retard (art. 1727 CGI)

| Paramètre | Valeur |
|-----------|--------|
| Taux mensuel | 0,20% |
| Taux annuel | 2,40% |
| Point de départ | 1er jour du mois suivant l'exigibilité |
| Point d'arrêt | Dernier jour du mois du paiement |

### Exemple de calcul

```
Base redressée : 1 000 de charges rejetées
IS supplémentaire : 1 000 x 15% = 150
Intérêts (12 mois) : 150 x 0,20% x 12 = 3,60
Total : 153,60
```

## Majorations (art. 1728 et 1729 CGI)

| Situation | Taux | Condition |
|-----------|------|-----------|
| Insuffisance de bonne foi (déclaration déposée) | 0% | Intérêt de retard seul : le 10% de l'art. 1758 A ne vise que l'impôt sur le revenu, pas l'IS |
| Dépôt tardif ou défaut de déclaration | 10% | Art. 1728, 1-a : 40% à défaut de dépôt dans les 30 jours d'une mise en demeure, 80% en cas d'activité occulte |
| Manquement délibéré | 40% | Intention prouvée de frauder |
| Manoeuvres frauduleuses | 80% | Stratagèmes, faux documents |
| Abus de droit | 80% | Montage artificiel |

### Formule de calcul : bonne foi

```
Base redressée : X
IS rappelé : X x 15%
+ Intérêts de retard : IS x 0,20% x nb mois
= Total rappel (aucune majoration à l'IS pour une insuffisance de bonne foi)
```

### Formule de calcul : manquement délibéré

```
Base redressée : X
IS rappelé : X x 15%
+ Intérêts de retard : IS x 0,20% x nb mois
+ Majoration 40% : IS x 40%
= Total rappel
```

## Grille d'évaluation du risque

### Facteurs aggravants

| Facteur | Impact |
|---------|--------|
| SASU/EURL sans CAC | Contrôle renforcé sur les charges perso |
| Premier exercice | Peu d'historique, erreurs fréquentes |
| CA en devises | Risque sur les taux de conversion |
| Compte courant 455 élevé | Suspicion de confusion patrimoine |
| Activité internet/SaaS | Difficultés de rattachement territorial |

### Facteurs atténuants

| Facteur | Impact |
|---------|--------|
| Petite taille (CA < 50k) | Vérification allégée |
| Comptabilité régulière | FEC conforme, écritures équilibrées |
| Premier exercice de bonne foi | Tolérance sur les erreurs formelles |
| Pas de salariés | Pas de risques sociaux |
| Franchise TVA | Pas de risque TVA collectée |

## Cas pratiques de redressement courants

### Cas 1 : Charges personnelles en compte 455

**Fait** : L'associé fait payer par la société des abonnements à usage mixte (perso + pro) sans prorata.

**Redressement** :
- Réintégration de la quote-part personnelle
- Qualification possible en « rémunération déguisée » -> charges sociales
- Si montants élevés : acte anormal de gestion

### Cas 2 : Bureau à domicile surévalué

**Fait** : Quote-part déclarée supérieure à la surface réelle.

**Redressement** :
- Réintégration de l'excédent (% déclaré - % réel) x charges
- Base : copropriété + électricité + internet + taxe foncière + assurance
- Majoration : aucune si bonne foi (intérêt de retard seul) ; 40% si manquement délibéré (art. 1729, a)

### Cas 3 : Charges pré-constitution hors délai

**Fait** : Charges reprises mais l'état des actes n'est pas annexé aux statuts ou PV.

**Redressement** :
- Réintégration de l'intégralité des charges pré-constitution
- IS supplémentaire : montant x taux IS
- Si état d'actes absent : risque de rejet total

### Cas 4 : CA omis (solde créditeur 411)

**Fait** : Solde créditeur 411 non expliqué (fréquent avec les payouts Stripe incluant du CA hors exercice).

**Redressement possible** :
- Si le vérificateur considère = CA non déclaré : ajout au résultat fiscal
- IS sur le montant
- Majoration 40% si intentionnel

### Cas 5 : Taux de conversion incorrect

**Fait** : Taux unique appliqué vs taux réel moyen BCE différent.

**Redressement** :
- Recalcul de toutes les charges en devises au taux correct
- Différence = charges sous/sur-évaluées
- IS sur l'écart

## Tableau de synthèse — Risques typiques PME/TPE

| Risque | Probabilité | Impact max | Recommandation |
|--------|-------------|-----------|----------------|
| Charges perso en 455 | Élevée | Réintégration totale + 40% | Documenter chaque ligne |
| Bureau domicile | Moyenne | Réintégration excédent + intérêts de retard | Avoir un plan coté |
| Charges pré-constitution | Moyenne | Réintégration totale + intérêts de retard | Vérifier état des actes |
| CA omis (411 créditeur) | Faible | + CA au résultat + 40% | Documenter l'origine |
| Taux conversion | Faible | Écart de quelques % | Utiliser taux BCE mensuel |
| Amortissements | Faible | Réintégration excédent | Vérifier calcul exact |
| TVA franchise | Très faible | Rappel TVA si seuil dépassé | Monitorer CA annualisé |
