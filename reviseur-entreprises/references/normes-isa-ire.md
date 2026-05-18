# Normes ISA applicables à l'audit — Réviseur d'entreprises (IRE)

last_updated: 2026-05-15

## Cadre réglementaire belge

En Belgique, l'audit légal est exercé par les **réviseurs d'entreprises**, membres de l'**IRE** (Institut des Réviseurs d'Entreprises — ibr-ire.be). Les réviseurs appliquent les **ISA** (International Standards on Auditing) telles qu'adoptées par l'IRE, et non les NEP françaises (CNCC).

La profession est régie par la **loi du 7 décembre 2016 relative à l'organisation de la profession et à la supervision publique des réviseurs d'entreprises**.

## Normes ISA applicables

| ISA | Titre | Application |
|-----|-------|-------------|
| ISA 200 | Objectifs généraux de l'auditeur indépendant | Cadre général de la mission |
| ISA 300 | Planification d'un audit d'états financiers | Phase 1 : planification |
| ISA 315 | Identification et évaluation des risques d'anomalies significatives | Phase 1 : risques |
| ISA 320 | Caractère significatif dans la planification et la réalisation d'un audit | Matérialité |
| ISA 330 | Réponses de l'auditeur aux risques évalués | Phases 2-6 |
| ISA 500 | Éléments probants | Qualité des preuves |
| ISA 505 | Confirmations externes | Confirmation bancaire |
| ISA 520 | Procédures analytiques | Ratios et tendances |
| ISA 530 | Sondages en audit | Échantillonnage |
| ISA 540 | Audit des estimations comptables | Amortissements, PCA |
| ISA 560 | Événements postérieurs à la date de clôture | Phase 7 |
| ISA 570 | Continuité d'exploitation | Évaluation going concern |
| ISA 580 | Déclarations écrites | Lettre d'affirmation |
| ISA 700 | Formation d'une opinion et rapport sur des états financiers | Format du rapport |
| ISRS 4400 | Missions de procédures convenues | Procédures spécifiques convenues |

> **Note** : Il n'existe pas d'équivalent belge de la NEP 9505 (FEC). La vérification de la tenue comptable s'effectue en vertu de l'art. 315 CIR 92 (droit d'investigation) et de la loi comptable du 17 juillet 1975. L'ISRS 4400 peut être utilisé pour des missions de procédures convenues sur la comptabilité.

## Seuils de nomination du réviseur d'entreprises (art. 3:72 CSA)

Une société est tenue de nommer un réviseur d'entreprises si elle dépasse **2 des 3 critères** suivants :

| Critère | Seuil |
|---------|-------|
| Chiffre d'affaires annuel (HTVA) | ≥ 9 000 000 € |
| Total du bilan | ≥ 4 500 000 € |
| Effectif moyen annuel | ≥ 50 personnes |

Les petites sociétés en dessous de ces seuils ne sont pas tenues de nommer un réviseur (sauf disposition statutaire ou demande d'actionnaires représentant 1% du capital ou 25% des votes).

## Schémas de dépôt des comptes annuels (BNB)

| Schéma | Conditions | Dépôt |
|--------|------------|-------|
| Complet | Dépasse les seuils art. 3:72 CSA | Banque Nationale de Belgique (BNB) |
| Abrégé | En dessous des seuils art. 3:72 CSA | BNB — schéma abrégé |
| Micro | CA < 700 000 €, bilan < 350 000 €, effectif < 10 | BNB — schéma micro |

La déclaration ISOC se dépose via le formulaire **275** (déclaration à l'impôt des sociétés), accompagné des comptes annuels déposés à la BNB.

## Seuils de signification

### Bases de calcul

| Base | Pourcentage | Justification |
|------|-------------|---------------|
| Résultat courant avant impôts | 5-10% | Base principale |
| Chiffre d'affaires | 0,5-2% | Entité en croissance |
| Total actif | 1-2% | Entité capitalistique |
| Capitaux propres | 2-5% | Entité sous-capitalisée |

### Exemple de calcul

```
Résultat courant : 50 000
-> Seuil à 5% : 2 500
-> Seuil à 10% : 5 000

Chiffre d'affaires : 200 000
-> Seuil à 1% : 2 000
-> Seuil à 2% : 4 000

Recommandation : choisir le seuil le plus pertinent selon le profil de l'entité.
Pour les TPE, un minimum de 500 est raisonnable.

Seuil de remontée (performance materiality) = ~60% du seuil de signification
Seuil de présentation (clairement insignifiant) = ~5% du seuil de signification
```

## Spécificités premier exercice

### Points de vigilance

1. **Pas de comparatif N-1** : impossible de faire des analyses de variation
2. **Durée exercice != 12 mois** : tous les ratios annualisés doivent tenir compte de la durée réelle
3. **Charges pré-constitution / engagements société en formation** : vérifier la conformité à l'art. 2:2 CSA (reprise dans les 2 ans + 2 mois)
4. **Capital social** : vérifier le certificat de dépôt et la libération (plan financier obligatoire — art. 6:5 CSA SRL / art. 7:3 CSA SA)
5. **Immatriculation** : vérifier la date d'inscription à la BCE vs la date de début d'activité

### Risques spécifiques

| Risque | Impact | Contrôle |
|--------|--------|----------|
| Mélange patrimoine perso/pro | Élevé | Contrôle exhaustif compte courant associé |
| Coupure CA pré/post création | Élevé | Vérification dates plateforme |
| Conversion devises | Moyen | Vérification taux EUR/devises (taux BCE) |
| Classification des charges | Moyen | Sondage catégorisation PCMN |
| Sous-évaluation PCA | Faible | Revue abonnements annuels |

## Obligations comptables belges — Livre-journal normalisé

Il n'existe pas de format FEC réglementaire en Belgique. Les obligations comptables sont régies par :

- **Loi comptable du 17 juillet 1975** (art. 3) : obligation de tenir un livre-journal chronologique
- **AR du 12 septembre 1983** : modalités d'application
- **PCMN** (Plan Comptable Minimum Normalisé) : référentiel de comptes

Le réviseur vérifie :
- La régularité et la sincérité des enregistrements comptables
- La conformité au PCMN
- L'existence et la conservation des pièces justificatives
- La cohérence de la balance des comptes avec les états financiers déposés à la BNB

En cas de contrôle fiscal, c'est l'art. 315 CIR 92 qui fonde le droit d'investigation de l'administration sur les livres comptables.

## Obligations post-audit

### Documents à produire

1. **Rapport du réviseur d'entreprises** (ISA 700) : opinion + fondement + observations
2. **Lettre de recommandations** : points d'amélioration de contrôle interne
3. **Dossier de travail** : documentation des contrôles effectués

### Archivage

- Durée de conservation du dossier de travail : **7 ans** (art. 34 de la loi du 7 décembre 2016 relative à l'organisation de la profession de réviseur d'entreprises)
- Les livres comptables et pièces justificatives doivent être conservés **7 ans** (art. 315bis CIR 92)
