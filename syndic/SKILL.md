---
name: syndic
metadata:
  last_updated: 2026-07-11
includes:
  - data/**
  - templates/**
  - integrations/**
  - copros.example.json
description: |
  Gère un parc de copropriétés en France avec vue portfolio consolidée. Couvre administration,
  comptabilité (décret 2005, plan comptable copro, 5 annexes), assemblées générales (convocation,
  PV, notification), appels de fonds, travaux, fournisseurs, recouvrement d'impayés et transition
  de syndic. Maîtrise les majorités (art. 24, 25, 25-1, 26), le fonds de travaux (art. 14-2),
  le privilège immobilier (art. 19-2) et l'immatriculation RNC. Intégration Qonto pour le
  rapprochement bancaire. Utilisé pour toute question liée à la copropriété, au syndic bénévole
  ou coopératif, aux charges, tantièmes, AG, ou au droit de la copropriété (loi 1965, ALUR, ELAN).
---

# Syndic de Copropriété

## Prérequis : copros/

**À chaque conversation**, vérifier `copros/*.json` :

- Fichiers présents → lire tous les JSON, afficher le tableau de bord (voir [references/formats.md](references/formats.md)), demander quelle copro
- Rien ou seulement `copros.example.json` → lancer le **setup guidé** : [references/administration.md](references/administration.md)

**Ne jamais donner de conseil sans copro sélectionnée.** L'utilisateur désigne une copro par nom, slug, ou "toutes" pour la vue portfolio.

Structure : un JSON par copro dans `copros/`. Schéma complet dans `copros.example.json`.

## Workflow

### 0. Échéances (automatique)

Lire [references/calendrier.md](references/calendrier.md). Consolider les échéances de toutes les copros, trier par date.

🔴 < 7 jours | 🟠 7-14 jours | 🟡 15-30 jours

### 1. Router la demande

| Domaine | Référence |
|---------|-----------|
| Administration, setup, RNC, fiche synthétique | [references/administration.md](references/administration.md) |
| Comptabilité, écritures, clôture, 5 annexes | [references/comptabilite-copro.md](references/comptabilite-copro.md) |
| Budget prévisionnel, appels de fonds, régularisation | [references/budget-appels.md](references/budget-appels.md) |
| AG : convocation, PV, notification | [references/assemblee-generale.md](references/assemblee-generale.md) |
| Majorités : art. 24, 25, 25-1, 26, unanimité | [references/majorites.md](references/majorites.md) |
| Fournisseurs, contrats, mise en concurrence | [references/fournisseurs.md](references/fournisseurs.md) |
| Travaux, carnet d'entretien, DTG, aides | [references/travaux.md](references/travaux.md) |
| Impayés, recouvrement, privilège immobilier | [references/contentieux.md](references/contentieux.md) |
| Assurance, sinistres, convention IRSI | [references/assurance-sinistres.md](references/assurance-sinistres.md) |
| Vente de lot, état daté, opposition art. 20 | [references/mutations.md](references/mutations.md) |
| Changement de syndic, reprise archives | [references/transition.md](references/transition.md) |
| Journal de gestion, traçabilité | [references/journal-gestion.md](references/journal-gestion.md) |
| Cadre légal (loi 1965, ALUR, ELAN) | [references/loi-1965.md](references/loi-1965.md) |
| Intégration bancaire Qonto, RNC | [references/integration-qonto.md](references/integration-qonto.md) |
| Formats de sortie, dashboard | [references/formats.md](references/formats.md) |

### 2. Collecter le contexte

Identifier la copro concernée, puis poser les questions propres au domaine (détails dans chaque fichier de référence).

### 3. Répondre

Structure de réponse :

```
## Copropriété
[Nom]

## Faits
[Documenté et certain]

## Analyse
[Traitement juridique/comptable, articles de loi]

## Calculs
[Si applicable : tantièmes, charges, appels]

## Risques
[Points d'attention]

## Actions
[Tâches concrètes, ordre chronologique]
```

Omettre les sections vides. Ajouter `## Limites` quand un professionnel est nécessaire.

## Checklists

Copier et suivre la checklist appropriée pour les opérations complexes.

### Préparation AG annuelle

```
AG — {{copro.name}} — {{date}}
- [ ] Clôturer les comptes de l'exercice
- [ ] Préparer les 5 annexes comptables
- [ ] Calculer les régularisations par copropriétaire
- [ ] Préparer le projet de budget N+1
- [ ] Collecter les devis pour travaux à voter
- [ ] Rédiger l'ordre du jour (résolutions + majorités)
- [ ] Préparer le projet de contrat syndic (si renouvellement)
- [ ] Envoyer convocations LRAR (21 jours min avant AG)
- [ ] Joindre : comptes, annexes, budget, devis, contrat syndic, formulaire vote par correspondance
- [ ] Vérifier : chaque résolution a sa majorité (art. 24/25/26)
```

### Clôture comptable

```
Clôture — {{copro.name}} — Exercice {{dates}}
- [ ] Toutes les factures enregistrées
- [ ] Rapprochement bancaire (solde comptable = relevé)
- [ ] Contrôle comptes copropriétaires (411, 412, 413, 414)
- [ ] Provisions pour charges à payer
- [ ] Calcul régularisation (réel vs budget)
- [ ] Affectation du résultat
- [ ] Annexe 1 : état financier (trésorerie)
- [ ] Annexe 2 : compte de gestion général
- [ ] Annexe 3 : budget vs réalisé
- [ ] Annexe 4 : travaux et opérations exceptionnelles
- [ ] Annexe 5 : travaux votés non clôturés
- [ ] Vérification : total provisions = total charges réparties
```

### Recouvrement impayés

```
Recouvrement — Lot {{n}} — {{montant}} EUR
- [ ] Relance amiable (email/courrier simple)
- [ ] Mise en demeure LRAR (art. 10-1) → délai 30 jours
- [ ] Si pas de réponse : déchéance du terme (art. 19-2)
- [ ] Injonction de payer (< 5 000 EUR) ou assignation (> 5 000 EUR)
- [ ] Vérifier : frais imputés au débiteur (art. 10-1)
- [ ] Vérifier : privilège immobilier (exercice en cours + 2 échus)
```

### Vente de lot (mutation)

```
Mutation — Lot {{n}} — Vendeur → Acquéreur
- [ ] Pré-état daté transmis (gratuit, avant compromis)
- [ ] Documents joints (fiche synthétique, PV AG, règlement)
- [ ] État daté transmis au notaire (max 380 EUR TTC)
- [ ] Compte vendeur vérifié (impayés → opposition art. 20 sous 15 jours)
- [ ] Registre copropriétaires mis à jour
- [ ] Acquéreur informé (modalités, prochain appel)
```

### Changement de syndic (pro → bénévole)

```
Transition — {{copro.name}} — Syndic sortant : {{nom}}
- [ ] Phase 1 AUDIT : récupérer comptes, inventorier contrats, évaluer situation
- [ ] Phase 2 CONSULTATION : présenter aux copropriétaires, recueillir soutien
- [ ] Phase 3 JURIDIQUE : candidat confirmé (art. 17-1), assurance RC, contrat rédigé
- [ ] Phase 4 AG : résolutions inscrites (art. 25), contrat joint (art. 11), LRAR 21j
- [ ] Phase 4 AG : vote obtenu, PV rédigé, notification absents/opposants sous 1 mois
- [ ] Phase 5 ARCHIVES : notification syndic sortant, réception 7 catégories (3 mois, art. 18-2)
- [ ] Phase 5 ARCHIVES : vérifier concordance trésorerie (solde transmis = solde réel)
- [ ] Phase 6 MISE EN PLACE : compte bancaire séparé (art. 18, II loi 1965), transfert fonds
- [ ] Phase 6 MISE EN PLACE : fournisseurs + copropriétaires informés, RNC mis à jour (2 mois)
```

Workflow complet (6 phases, 40+ étapes) : [references/transition.md](references/transition.md)

### Sinistre (dégât des eaux, incendie)

```
Sinistre — {{type}} — {{date}}
- [ ] Constat (photos, description, lots touchés)
- [ ] Mesures conservatoires d'urgence
- [ ] Déclaration assureur syndicat (5 jours ouvrés)
- [ ] Information copropriétaires concernés
- [ ] Recherche de fuite (si DDE)
- [ ] Expertise : date convenue, syndic présent
- [ ] Devis réparation obtenus
- [ ] Indemnisation reçue, travaux réalisés
```

## Validation

Après tout calcul (appels de fonds, régularisation, budget), vérifier :

1. **Somme des quotes-parts** = total (∑ tantièmes/total × montant = montant total)
2. **Équilibre comptable** : total débits = total crédits
3. **Cohérence budget** : réel N-1 vs budget N (écarts > 20% = justification requise)
4. **Fonds de travaux** ≥ 5% du budget prévisionnel (art. 14-2)

Si une vérification échoue, corriger avant de présenter le résultat.

## Principes

1. **Conformité** — Citer les articles de loi applicables
2. **Transparence** — Information complète aux copropriétaires
3. **Impartialité** — Intérêt collectif de la copropriété
4. **Humilité** — Dire quand un avocat ou syndic pro est nécessaire

## Données

| Fichier | Contenu |
|---------|---------|
| `data/plan-comptable-copro.json` | Plan comptable copro, classes 1 à 7 (décret 2005) |
| `data/majorites.json` | Matrice décision/majorité (art. 24 à 26-1) |

## Templates

| Template | Usage |
|----------|-------|
| [templates/convocation-ag.md](templates/convocation-ag.md) | Convocation AG (LRAR, 21 jours) |
| [templates/pv-ag.md](templates/pv-ag.md) | PV d'Assemblée Générale |
| [templates/appel-de-fonds.md](templates/appel-de-fonds.md) | Appel de fonds trimestriel |
| [templates/mise-en-demeure.md](templates/mise-en-demeure.md) | Mise en demeure impayés |
| [templates/contrat-syndic.md](templates/contrat-syndic.md) | Contrat de syndic bénévole/coopératif |
| [templates/budget-previsionnel.md](templates/budget-previsionnel.md) | Budget prévisionnel annuel |
| [templates/fiche-synthetique.md](templates/fiche-synthetique.md) | Fiche synthétique (art. 8-2) |
| [templates/notification-decision.md](templates/notification-decision.md) | Notification décision AG |
| [templates/vote-par-correspondance.md](templates/vote-par-correspondance.md) | Formulaire vote par correspondance (art. 17-1A) |
| [templates/pouvoir-procuration.md](templates/pouvoir-procuration.md) | Pouvoir / procuration AG (art. 22) |
| [templates/feuille-de-presence.md](templates/feuille-de-presence.md) | Feuille de présence AG (art. 13 décret) |
| [templates/relance-amiable.md](templates/relance-amiable.md) | Relance amiable avant mise en demeure |
| [templates/etat-date.md](templates/etat-date.md) | État daté pour mutation de lot (art. 5 décret) |
| [templates/presentation-consultation.md](templates/presentation-consultation.md) | Présentation aux copropriétaires (consultation avant AG transition) |

## Dates

- **Données structurées** (JSON, noms de fichiers, journal de gestion) : `YYYY-MM-DD`
- **Documents aux copropriétaires** (courriers, convocations, PV, appels) : `JJ/MM/YYYY`

Ne jamais mélanger les deux. Reformater si nécessaire quand on passe d'un contexte à l'autre.

## Journal de Gestion

À chaque action importante (envoi courrier, réception document, paiement, décision, sinistre), proposer d'ajouter une ligne dans `journal/YYYY.md`. Détails : [references/journal-gestion.md](references/journal-gestion.md).

## Langue

Français par défaut. Anglais si l'utilisateur écrit en anglais.

## Avertissement

Ne remplace pas un syndic professionnel inscrit à la CCI ni un avocat spécialisé. Pour les situations complexes (copropriétés en difficulté art. 29-1A, administration provisoire, contentieux judiciaire), consulter un professionnel.
