# Règles de Majorité en Copropriété Belge

`last_updated: 2026-05-15`

## Vue d'Ensemble

En droit belge, les majorités applicables aux décisions de l'Assemblée Générale de l'ACP sont définies par l'**article 3.84 du Code civil belge**. Contrairement au droit français, il n'existe pas de numérotation distincte d'articles par majorité (pas d'équivalent des art. 24/25/26 de la loi française du 10 juillet 1965) : les majorités sont définies directement dans les paragraphes de l'art. 3.84 et, le cas échéant, précisées dans les statuts de la copropriété.

Le fichier `data/majorites.json` contient les données de référence pour le calcul automatique des majorités.

| Majorité | Base de calcul | Seuil |
|----------|---------------|-------|
| **Majorité ordinaire** (§2) | Voix des copropriétaires présents ou représentés | > 1/2 des voix ET > 1/2 des quotes-parts représentées |
| **3/4 des voix** (§3) | Voix des copropriétaires présents ou représentés | ≥ 3/4 des quotes-parts représentées |
| **4/5 de toutes les voix** (§4) | Voix de **tous** les copropriétaires (présents ou non) | ≥ 4/5 des quotes-parts totales de l'ACP |
| **Unanimité** | Tous les copropriétaires | 100% des quotes-parts |

---

## Majorité Ordinaire (art. 3.84 §2 Cc belge)

**Calcul** : plus de la moitié des voix des copropriétaires présents ou représentés **ET** représentant plus de la moitié des quotes-parts des parties communes des présents/représentés.

La double condition (nombre de voix + quotes-parts) s'applique simultanément. Si une seule des deux conditions est remplie, la décision n'est pas valablement adoptée.

> **Équivalent français** : art. 24 de la loi du 10 juillet 1965 (majorité simple) → art. 3.84 §2 Cc belge.

**Décisions relevant de la majorité ordinaire :**

- Approbation des comptes annuels de l'ACP
- Vote du budget ordinaire
- Travaux d'entretien courant et de conservation
- Nomination et révocation du syndic (mandat max. 3 ans renouvelable)
- Nomination et révocation des membres du conseil de gérance
- Autorisation donnée au syndic d'agir en justice (sauf si les statuts prévoient une majorité supérieure)
- Cotisation au fonds de réserve (montant ≥ 5% du budget ordinaire, art. 3.89 Cc belge)
- Décisions relatives à la gestion courante de l'immeuble
- Changement de syndic

**Exemple pratique — Majorité ordinaire :**

ACP de 15 lots, 1 000 millièmes totaux. AG avec 10 copropriétaires représentant 620 millièmes.

- Double condition : > 310 millièmes (moitié de 620) ET majorité du nombre de voix (> 5 copropriétaires)
- Résultat du vote : 7 copropriétaires pour, représentant 400 millièmes → **ADOPTÉE** (7 > 5 ; 400 > 310)
- Résultat du vote : 6 copropriétaires pour, représentant 290 millièmes → **REJETÉE** (290 < 310)

---

## Majorité des 3/4 (art. 3.84 §3 Cc belge)

**Calcul** : trois quarts des voix des copropriétaires présents ou représentés à l'AG, exprimées en quotes-parts.

> **Équivalent français** : art. 25 de la loi du 10 juillet 1965 (majorité 2/3 ou double majorité) → art. 3.84 §3 Cc belge. Attention : la majorité des 3/4 belge est calculée sur les seuls présents/représentés (pas sur l'ensemble des copropriétaires).

**Décisions relevant de la majorité des 3/4 :**

- Travaux importants aux parties communes non couverts par le budget ordinaire
- Modification du règlement d'ordre intérieur (ROI)
- Installation d'équipements collectifs nouveaux (compteurs individuels, interphone, digicode, panneaux solaires)
- Changement du mode de chauffage collectif
- Autorisation de réalisation de travaux privatifs ayant un impact sur les parties communes
- Travaux d'économies d'énergie affectant les parties communes
- Acquisition ou aliénation de biens communs de faible valeur
- Mise aux normes d'accessibilité

**Exemple pratique — Majorité des 3/4 :**

ACP de 20 lots, 1 000 millièmes totaux. AG avec 14 copropriétaires représentant 680 millièmes.

- Seuil requis : 3/4 × 680 = 510 millièmes
- Résultat du vote : 520 millièmes pour → **ADOPTÉE** (520 ≥ 510)
- Résultat du vote : 490 millièmes pour → **REJETÉE** (490 < 510)

---

## Majorité des 4/5 (art. 3.84 §4 Cc belge)

**Calcul** : quatre cinquièmes de **toutes** les voix de l'ACP, c'est-à-dire 80% des quotes-parts totales de tous les copropriétaires, qu'ils soient présents, représentés ou absents.

Cette exigence est particulièrement contraignante : si 20% des copropriétaires ne sont pas représentés et ne votent pas pour, la décision ne peut pas être adoptée.

> **Équivalent français** : art. 26 de la loi du 10 juillet 1965 (double majorité) → art. 3.84 §4 Cc belge. Différence notable : la majorité des 4/5 belge est calculée sur l'ensemble du capital, sans possibilité de « passerelle » vers une 2e AG.

**Décisions relevant de la majorité des 4/5 :**

- Modification de l'acte de base et du règlement de copropriété (statuts de la copropriété)
- Modification de la répartition des quotes-parts si elle résulte d'une transformation de l'immeuble
- Travaux de transformation ou d'extension affectant les parties communes
- Création de nouvelles parties communes
- Décisions impliquant la modification partielle de la destination de l'immeuble

**Exemple pratique — Majorité des 4/5 :**

ACP de 20 lots, 1 000 millièmes totaux.

- Seuil requis : 4/5 × 1 000 = **800 millièmes de tous les copropriétaires**
- AG avec 14 copropriétaires représentant 650 millièmes → **IMPOSSIBLE** d'adopter même si tous les présents votent pour (650 < 800)
- Il faut contacter les absents pour recueillir leur accord ou organiser une nouvelle AG après les avoir informés

**Stratégie pratique** : pour les décisions à la majorité des 4/5, anticiper en recueillant les accords écrits des copropriétaires absents avant l'AG, ou en mandatant des procurations pour les absents favorables.

---

## Unanimité

**Toutes les voix de tous les copropriétaires sont requises.** Un seul copropriétaire opposant ou abstentionniste suffit à bloquer la décision.

**Décisions relevant de l'unanimité :**

- Modification de la clé de répartition des charges (sauf si elle résulte de travaux votés à la majorité des 4/5)
- Changement total de destination de l'immeuble
- Aliénation de parties communes dont la conservation est nécessaire à la destination de l'immeuble (ex : cession du jardin commun)
- Dissolution volontaire de l'ACP

**Pratique** : l'unanimité peut être recueillie hors AG si tous les copropriétaires donnent leur accord écrit. En pratique, obtenir l'unanimité d'une grande ACP est très difficile ; les cas relevant de l'unanimité sont donc rares et doivent être anticipés avec soin.

---

## Mécanisme de la 2e AG (art. 3.85 Cc belge)

### Principe

En l'absence de **quorum** à une première AG (moins de la moitié des quotes-parts représentées), une **deuxième AG** peut être convoquée. Lors de cette 2e AG, les décisions relevant de la majorité ordinaire ou des 3/4 peuvent être prises **quel que soit le nombre de quotes-parts représentées** — il n'y a plus d'exigence de quorum minimal.

> **Équivalent français** : mécanisme de la « passerelle » de l'art. 25-1 de la loi du 10 juillet 1965 → art. 3.85 Cc belge (2e AG). Différence : en Belgique, la 2e AG s'applique au défaut de quorum (pas au défaut de majorité des 2/3 comme en France).

### Procédure détaillée

1. **1re AG** : quorum insuffisant (moins de 50% des quotes-parts représentées)
2. Le président de séance constate l'absence de quorum et le mentionne dans le PV
3. **Convocation d'une 2e AG** dans les formes habituelles — délai minimum de **15 jours**
4. **Lors de la 2e AG** : délibération valable quel que soit le nombre de copropriétaires présents ou représentés
5. Les majorités requises (ordinaire ou 3/4) s'appliquent toujours, mais calculées sur les seules voix des présents/représentés

### Limites du mécanisme

La 2e AG **ne s'applique pas** aux décisions nécessitant :
- La majorité des **4/5 de toutes les voix** (art. 3.84 §4) : le seuil de 80% du total doit toujours être atteint
- L'**unanimité** : accord de tous les copropriétaires requis sans dérogation possible

Pour ces décisions, il faut parvenir à une majorité suffisante lors d'une AG où les copropriétaires sont suffisamment mobilisés.

### Exemple de 2e AG

- **1re AG** : 8 copropriétaires présents sur 20, représentant 380 millièmes sur 1 000 → quorum insuffisant (< 500), pas de délibération valable pour les décisions soumises au quorum
- **2e AG** convoquée 20 jours plus tard : 9 copropriétaires présents représentant 420 millièmes
- Décision à la majorité ordinaire : il faut > 210 millièmes (moitié de 420) ET > 4 voix (moitié de 9) → si 5 copropriétaires pour avec 230 millièmes → **ADOPTÉE**
- Décision à la majorité des 3/4 : il faut ≥ 315 millièmes (3/4 de 420) → si 320 millièmes pour → **ADOPTÉE**

---

## Calcul des Voix

En Belgique, les voix sont exprimées en **quotes-parts** (millièmes ou tantièmes) telles que définies dans l'acte de base. Chaque copropriétaire dispose d'un nombre de voix proportionnel à ses quotes-parts.

**Règle de plafonnement** : si un copropriétaire possède plus de la moitié de toutes les quotes-parts, son droit de vote est **réduit** à la somme des votes des autres copropriétaires présents ou représentés. Cette règle évite qu'un copropriétaire majoritaire puisse seul imposer ses décisions (art. 3.84 §1er Cc belge).

**Exemple de plafonnement** : un copropriétaire possède 600 millièmes sur 1 000. Lors d'une AG, les autres copropriétaires représentent 300 millièmes. Le copropriétaire majoritaire dispose donc de 300 voix (et non 600), portant le total à 600 millièmes représentés.

---

## Tableau Récapitulatif Décisions / Majorités

| Décision | Majorité | Base de calcul |
|----------|----------|---------------|
| Approbation des comptes ACP | Majorité ordinaire | Présents/représentés |
| Vote du budget ordinaire | Majorité ordinaire | Présents/représentés |
| Travaux d'entretien courant | Majorité ordinaire | Présents/représentés |
| Fonds de réserve (cotisation) | Majorité ordinaire | Présents/représentés |
| Nomination/révocation syndic | Majorité ordinaire | Présents/représentés |
| Nomination conseil de gérance | Majorité ordinaire | Présents/représentés |
| Autorisation d'agir en justice | Majorité ordinaire | Présents/représentés |
| Travaux importants parties communes | 3/4 des voix | Présents/représentés |
| Modification du ROI | 3/4 des voix | Présents/représentés |
| Installation équipements collectifs nouveaux | 3/4 des voix | Présents/représentés |
| Travaux d'amélioration énergétique parties communes | 3/4 des voix | Présents/représentés |
| Modification acte de base / règlement copropriété | 4/5 de toutes les voix | **Tous** les copropriétaires |
| Travaux de transformation (structure, statuts) | 4/5 de toutes les voix | **Tous** les copropriétaires |
| Modification clé de répartition des charges | Unanimité | **Tous** les copropriétaires |
| Changement de destination de l'immeuble | Unanimité | **Tous** les copropriétaires |
| Aliénation parties communes essentielles | Unanimité | **Tous** les copropriétaires |
| Dissolution volontaire de l'ACP | Unanimité | **Tous** les copropriétaires |

---

## Calcul Pratique

### Exemple complet — ACP de 20 lots, 1 000 millièmes

Présents/représentés à l'AG : 14 copropriétaires représentant 650 millièmes.

- **Majorité ordinaire** : il faut > 325 millièmes (moitié de 650) ET > 7 copropriétaires (moitié de 14)
  - 8 copropriétaires pour + 340 millièmes pour = **ADOPTÉE**
  - 7 copropriétaires pour + 340 millièmes pour = **REJETÉE** (7 n'est pas > 7)
- **3/4 des voix** : il faut ≥ 488 millièmes (3/4 de 650)
  - 490 millièmes pour → **ADOPTÉE**
  - 480 millièmes pour → **REJETÉE**
- **4/5 de toutes les voix** : il faut ≥ 800 millièmes sur 1 000 totaux (présents ou non)
  - Seulement 650 représentés → **IMPOSSIBLE** même si tous votent pour (max 650 < 800)
  - Décision ne peut pas être adoptée à cette AG — mobiliser les absents
- **Unanimité** : 1 000 millièmes — 20 copropriétaires d'accord (accord écrit de tous les absents requis)

### Tableau de résumé rapide

| Majorité | Formule | Sur 1 000 millièmes, 650 représentés |
|----------|---------|--------------------------------------|
| Ordinaire | > 1/2 des représentés | > 325 millièmes |
| 3/4 | ≥ 3/4 des représentés | ≥ 488 millièmes |
| 4/5 | ≥ 4/5 du total | ≥ 800 millièmes (impossible si seuls 650 représentés) |
| Unanimité | 100% du total | 1 000 millièmes |
