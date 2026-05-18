# Budget Ordinaire et Appels de Fonds

`last_updated: 2026-05-15`

## Budget Ordinaire

### Définition

Le budget ordinaire est le document financier prévoyant les charges courantes de l'ACP pour l'exercice à venir. Il est voté chaque année en AG à la majorité ordinaire (art. 3.84 Cc belge).

En droit belge, on parle de **budget ordinaire** (pour les charges courantes) par opposition au **budget extraordinaire** (pour les travaux importants votés en AG).

### Contenu

Le budget est ventilé par postes de charges :

| Poste | Exemples |
|-------|----------|
| Nettoyage parties communes | Contrat ménage, produits |
| Espaces verts | Entretien jardin, taille |
| Chauffage collectif | Gaz/mazout, entretien chaudière |
| Eau froide | Consommation commune, compteurs |
| Électricité parties communes | Éclairage, minuteries, VMC |
| Ascenseur | Contrat maintenance, réparations |
| Assurance immeuble | Incendie + RC ACP, assistance |
| Honoraires syndic | Gestion courante (forfait annuel) |
| Frais postaux et administratifs | Recommandés, copies, communications |
| Frais bancaires | Tenue de compte courant et épargne |
| Petites réparations | Plomberie, serrurerie, électricité |
| Désinsectisation / dératisation | Contrat annuel |
| Contrats d'entretien divers | Portail, interphone, extincteurs |
| Honoraires divers | Réviseur aux comptes, géomètre |
| Imprévus / Divers | Marge de sécurité (2–5%) |

### Préparation

1. Reprendre le réalisé N-1 (charges réelles de l'exercice clos)
2. Identifier les variations prévisibles (indexation contrats, travaux, sinistres)
3. Ajouter une marge d'imprévus (2–5%)
4. Comparer avec le budget N-1 et expliquer les écarts
5. Présenter au conseil de gérance avant l'AG
6. Soumettre au vote en AG

Voir template : [templates/budget-previsionnel.md](../templates/budget-previsionnel.md)

## Appels de Fonds

### Quote-part sur charges ordinaires

Le budget ordinaire est divisé en appels de fonds périodiques (trimestriels ou mensuels selon les habitudes de l'ACP).

**Calcul par copropriétaire :**
```
Appel de fonds = (Budget ordinaire × Quote-part du lot / Millièmes totaux) / 4
(si appels trimestriels)
```

**Calendrier type (appels trimestriels) :**
| Trimestre | Exigibilité | Couverture |
|-----------|-------------|-----------|
| T1 | 1er janvier | Janvier, Février, Mars |
| T2 | 1er avril | Avril, Mai, Juin |
| T3 | 1er juillet | Juillet, Août, Septembre |
| T4 | 1er octobre | Octobre, Novembre, Décembre |

Certaines ACP pratiquent des appels mensuels, ce qui lisse mieux la trésorerie.

**Clés de répartition :**
- Charges générales → quotes-parts de parties communes générales (millièmes généraux)
- Charges spéciales (ascenseur, chauffage, escalier) → clés spéciales si prévues dans l'acte de base

### Appels de fonds pour travaux votés

Appels de fonds spécifiques, distincts des charges ordinaires. Le montant et l'échéancier sont fixés par l'AG lors du vote des travaux.

**Calcul :**
```
Appel travaux = Montant voté × Quote-part du lot / Millièmes totaux
```

L'AG peut décider d'un paiement en une ou plusieurs fois, en fonction de l'avancement des travaux.

### Fonds de Réserve (art. 3.89 §1er Cc belge)

**Obligatoire** pour toutes les ACP, sans seuil minimal de lots.

**Montant minimum** : 5% du budget ordinaire approuvé.

**Caractéristiques :**
- La quote-part du fonds de réserve est attachée au lot (pas au copropriétaire). En cas de vente, les cotisations restent acquises à l'ACP — elles ne sont ni remboursées au vendeur ni reprises par l'acquéreur
- Les sommes sont déposées sur un **compte bancaire séparé** au nom de l'ACP (compte d'épargne ou à terme)
- L'AG peut voter un taux supérieur à 5%
- L'AG peut décider de suspendre temporairement les cotisations si le fonds est jugé suffisant

## Décompte Annuel

À la clôture de l'exercice, le syndic compare les charges réelles aux appels de fonds versés.

### Avoir (appels de fonds > charges réelles)

Le solde est porté au crédit du copropriétaire. Il peut être :
- Déduit du prochain appel de fonds
- Remboursé sur demande expresse du copropriétaire

### Complément dû (charges réelles > appels de fonds)

Le solde est porté au débit du copropriétaire. Un appel de fonds complémentaire est émis après l'approbation des comptes en AG.

### Calcul du décompte

```
Décompte = Charges réelles × (Quote-part / Millièmes totaux) - Appels versés
```

Si positif → le copropriétaire doit un complément.
Si négatif → le copropriétaire a un avoir.

## Exigibilité

- **Appels de fonds ordinaires** : exigibles le premier jour de chaque trimestre (ou mois, selon le rythme décidé)
- **Travaux votés** : exigibles selon l'échéancier voté en AG
- **Décompte annuel** : exigible après l'approbation des comptes en AG
- **Fonds de réserve** : même rythme que les appels de fonds ordinaires

En cas de non-paiement à l'échéance, des intérêts de retard peuvent être réclamés (taux légal belge ou taux prévu dans les statuts).

## Répartition des Charges (art. 3.79 Cc belge)

**Deux catégories :**

1. **Charges générales** (conservation, entretien et administration des parties communes) → réparties selon les quotes-parts de chaque lot telles que définies dans l'acte de base
2. **Charges spéciales** (services collectifs et équipements communs) → réparties selon l'utilité objective pour chaque lot (ex : ascenseur, chauffage central)

La clé de répartition est fixée dans l'acte de base. Toute modification de la clé de répartition nécessite en principe l'unanimité ou la décision judiciaire.

## Référence Virement

Pour faciliter le rapprochement bancaire, utiliser une référence de virement structurée :

```
Format : {{lot}}-{{trimestre}}-{{année}}
Exemple : 007-T2-2026
```

Communiquer cette référence à chaque copropriétaire dans l'avis d'appel de fonds.
