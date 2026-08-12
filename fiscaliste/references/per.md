# PER (Plan d'Épargne Retraite) individuel

Voir `data/per-plafonds.json` pour les plafonds et paramètres.

## Mécanisme de déduction

Le versement PER **réduit le RNI** de l'année de versement.

```
RNI avant PER
  − versement PER (dans la limite du plafond)
= RNI après PER
  ÷ nombre de parts
= Quotient → barème → impôt brut réduit
```

**Économie d'impôt immédiate** = versement × TMI.

Exemple : versement 5 000 €, TMI 30% → économie IR = 1 500 €.

## Plafond de déduction

### Formule

**Plafond = max(plancher, 10% × revenus professionnels nets N-1)**, dans la limite du plafond absolu.

```
Plafond = max(4 710 €,  10% × revenus pro N-1)
                  ↑                    ↑
          garanti même          salaires après abattement 10%,
          sans revenus          BNC, BIC — pas les revenus du capital
```

### Bornes

Voir `data/per-plafonds.json` → `per_individuel` pour les montants à jour (plancher et plafond absolu recalculés chaque année sur le PASS).

| | Formule | Exemple 2025 (PASS = 47 100 €) |
|--|---------|-------------------------------|
| Plancher (minimum garanti) | 10% × PASS | 4 710 € |
| Plafond absolu | 10% × 8 × PASS | 37 680 € |

Le plancher s'applique même sans aucun revenu professionnel — un foyer sans activité peut toujours déduire au moins le plancher.

### Report des plafonds non utilisés

Les plafonds non utilisés des années précédentes sont mobilisables. Ordre d'imputation : plafond de l'année en cours d'abord, puis plafonds reportés **en commençant par le plus ancien** (N-3, N-2, N-1).

**Durée du report :**
- Plafonds générés jusqu'en 2025 : report sur les **3 années suivantes**
- Plafonds générés à partir de 2026 : report sur les **5 années suivantes** (loi de finances 2026 — non rétroactif)

**Expiration des plafonds antérieurs :**

| Plafond généré en | Expire fin | Règle |
|------------------|-----------|-------|
| 2023 | 2026 | 3 ans |
| 2024 | 2027 | 3 ans |
| 2025 | 2028 | 3 ans |
| 2026 | 2031 | 5 ans (nouveau) |

**Exemple (revenus 2025, déclaration 2026) :**
- Plafond N (2025) : 5 000 €, utilisé 3 000 € → reliquat 2 000 € disponible jusqu'à fin 2028 (3 ans, règle ancienne)
- Plafond N (2026) : même scénario → reliquat disponible jusqu'à fin 2031 (5 ans)

**Ordre FIFO obligatoire :** on consomme N-3 avant N-2 avant N-1 pour que les droits les plus anciens ne périment pas.

### Mutualisation couple

Les époux/pacsés soumis à imposition commune peuvent **mutualiser leurs plafonds** (case à cocher sur 2042). Un conjoint sans revenu pro peut bénéficier du plafond inemployé de l'autre.

## Arbitrage : le PER est-il vraiment utile ?

**Le PER est un report d'imposition, pas une exonération.** À la sortie, les versements sont imposés au barème et les gains au PFU. On ne sait pas aujourd'hui à quelle TMI on sortira, ni quelles seront les règles fiscales dans 10, 20 ou 30 ans.

### Le seul vrai avantage : les intérêts composés sur l'économie d'impôt

Le mécanisme réel du PER n'est pas une économie d'impôt — c'est un **prêt sans intérêt de l'État** que vous investissez pendant plusieurs années.

```
Versement 10 000 €, TMI 41%
→ Économie IR immédiate : 4 100 € (l'État vous "prête" cette somme)
→ Vous investissez 10 000 € au lieu de 5 900 € (si vous aviez payé l'IR)
→ Sur 20 ans à 5%/an : 10 000 € → 26 533 € vs 5 900 € → 15 654 €
→ Écart brut avant impôt sortie : +10 879 €
→ À la sortie TMI 30% : impôt sur les 10 000 € = 3 000 € (vs 4 100 € payés à l'entrée)
→ Gain net = différentiel TMI (1 100 €) + rendement sur l'économie d'impôt investie
```

Plus l'horizon est long, plus l'effet de capitalisation sur les 4 100 € "prêtés" est puissant — indépendamment du différentiel de TMI.

### Gagnant / perdant

| Situation | Résultat |
|-----------|----------|
| TMI entrée > TMI sortie + horizon long | **Gain double** — différentiel TMI ET capitalisation |
| TMI entrée = TMI sortie + horizon long | **Gain modeste** — capitalisation seule sur l'économie d'impôt |
| TMI entrée < TMI sortie | **Perte nette** — rare (carrière très ascendante, sortie en capital massif une seule année) |
| Horizon court (< 10 ans) | **Intérêt faible** — peu de temps pour la capitalisation |

### Incertitude fiscale : le risque réel du PER

En versant aujourd'hui dans un PER, on accepte de **ne pas connaître les conditions de sortie** :
- Le barème IR dans 20 ans est inconnu
- Le TMI à la retraite dépend de la pension, des revenus du patrimoine, de la composition du foyer
- Les règles fiscales sur les PER peuvent évoluer (c'est arrivé avec les PERP, les Madelin)

> **⚠ Changement de résidence fiscale** : si vous quittez la France avant la retraite, la situation se complique. La France conserve un droit d'imposition sur les sommes déduites (retenue à la source sur les distributions à des non-résidents). Le régime exact dépend de la convention fiscale avec le pays de destination — certaines conventions attribuent le droit d'imposer à la France (pays source), d'autres au pays de résidence, certaines prévoient une imposition partagée. Le déblocage anticipé n'est pas autorisé pour ce motif. **Consulter un fiscaliste spécialisé en mobilité internationale avant tout versement significatif si un départ à l'étranger est envisagé.**

**Contraste avec le PEE** : l'abondement est acquis immédiatement, exonéré d'IR de façon certaine, et la sortie après 5 ans est exonérée d'IR selon des règles stables. Pas de pari sur le futur.

### Cas favorables

- **TMI 41-45% aujourd'hui → TMI estimée 30% à la retraite** : gain double (différentiel + capitalisation) — cas le plus favorable
- **Horizon > 15 ans** : la capitalisation sur l'économie d'impôt devient significative même sans différentiel TMI
- **Année de revenus exceptionnels** : versement ponctuel pour écraser une tranche marginale élevée, sortie étalée
- **Quotient revenus exceptionnels + PER** : combinaison puissante pour un vesting RSU important

### Cas peu intéressants

- **TMI 11% stable** : économie d'impôt faible (1 100 € pour 10 000 € versés), capitalisation sur une base réduite
- **TMI 45% stable à la retraite** : report sans gain fiscal, pari sur la capitalisation uniquement
- **Horizon court (< 10 ans)** : capitalisation insuffisante, blocage contraignant pour peu de gain

## Sortie du PER

### Sortie à la retraite

**Deux options au choix** :

1. **Sortie en rente viagère**
   - Imposition comme pension (barème + abattement 10% plafonné)
   - Prélèvements sociaux 9,1%
   - Protection en cas de longévité

2. **Sortie en capital**
   - **Versements déduits à l'entrée** : imposés au barème progressif (part capital)
   - **Gains** : imposés séparément au PFU (12,8 % IR + PS), les gains PER étant qualifiés de "produits de placement" (L. 136-7 CSS) :
     - **Sortie avant le 01/01/2026** : PFU 30 % (PS 17,2 %)
     - **Sortie à partir du 01/01/2026** : PFU 31,4 % (PS 18,6 %, LFSS 2026)
   - Possibilité de fractionner la sortie sur plusieurs années (à demander à l'assureur)

**Piège sortie capital** : ne pas confondre le régime du capital (barème, écrase la tranche) et celui des gains (PFU fixe). Bien distinguer.

### Versements non déduits (cas rare)

Si l'on a choisi de ne pas déduire les versements (case à cocher à la souscription) :
- Sortie partiellement exonérée
- Seuls les gains sont imposés au PFU (30 % avant 01/01/2026, 31,4 % à partir du 01/01/2026 — voir taux PS PER ci-dessus)
- Utile si on anticipe un TMI sortie > TMI entrée — rare

### Sortie anticipée autorisée

Cas de déblocage avant la retraite (sans pénalité fiscale sur le capital) :
- Achat de la résidence principale
- Décès du conjoint / partenaire PACS
- Invalidité
- Surendettement
- Fin des droits au chômage
- Cessation d'activité non salariée après jugement de liquidation

Hors ces cas : déblocage impossible (capital bloqué jusqu'à la retraite).

### Décès avant la retraite : transmission du PER

Le PER individuel est quasi-systématiquement souscrit sous forme assurance (contrat d'assurance-vie dédié). En cas de décès, il fonctionne **hors succession** via la clause bénéficiaire — comme une assurance-vie classique.

**Avantage clé : l'IR différé est effacé au décès.** Les bénéficiaires ne paient pas l'impôt sur le revenu qui aurait été dû à la sortie — seule la fiscalité assurance s'applique.

| Âge au décès | Régime fiscal pour les bénéficiaires |
|---|---|
| < 70 ans | 152 500 € par bénéficiaire exonéré, puis 20% jusqu'à 852 500 €, 31,25% au-delà (art. 990 I CGI) |
| ≥ 70 ans | 30 500 € global exonéré tous bénéficiaires confondus, excédent soumis aux droits de succession (art. 757 B CGI) |

**Mourir avant 70 ans avec un PER bien alimenté = transmission très efficace.** Le capital transmis bénéficie du même abattement que l'assurance-vie, et l'IR différé disparaît.

**Piège de la rente en cas de décès :** si le titulaire a opté pour la rente viagère, les fonds sont aliénés — les héritiers ne récupèrent rien à la mort, sauf :
- Clause de **réversion** (la rente continue au conjoint, à taux réduit)
- **Annuités garanties** (la rente est versée jusqu'à un terme fixe même en cas de décès)

Ces options réduisent le montant de la rente. À négocier à la souscription si la transmission est un objectif.

**PER compte-titres (rare) :** tombe dans la succession classique — IR et droits de succession s'appliquent. Vérifier la forme du contrat.

## Priorité absolue : abondement employeur avant PER individuel

**Avant tout versement PER individuel, vérifier que l'abondement PEE / PERECO de l'employeur est saturé.**

L'abondement est un complément versé par l'entreprise pour chaque euro versé par le salarié sur son PEE ou son PERECO — typiquement 50 à 300 % du versement salarié, dans une limite annuelle (8 % du PASS pour le PEE, 16 % du PASS pour le PERECO).

| Dispositif | Avantage |
|------------|----------|
| **PEE + abondement** | La société abonde chaque versement + exonération IR sur l'abondement + seuls les PS à la sortie (taux en vigueur — cf. SKILL.md, pas le PFU à 30 %) |
| **PERECO + abondement** | Idem + blocage jusqu'à la retraite |
| **PER individuel** | Uniquement économie d'impôt immédiate × TMI, pas de match employeur |

**Règle** : un abondement employeur de 100 % représente un rendement immédiat de 100 %. Aucune défiscalisation PER n'égale ce rendement. Toujours saturer PEE/PERECO en premier si l'option existe.

## Mécanique pratique

### Déclaration

- Versements : case 6NS (déclarant 1) / 6NT (déclarant 2) sur la 2042
- Plafond calculé automatiquement par la DGFIP (figure sur l'avis d'imposition N-1, rubrique "Plafond pour l'épargne retraite")

## PER TNS (ex-Madelin) : spécificités du travailleur non salarié

Le PER individuel (art. 163 quatervicies CGI) est accessible à tous, mais les TNS (gérant majoritaire SARL, gérant EURL, EI) disposent en plus du **PER TNS issu du contrat Madelin** (art. 154 bis CGI), avec un plafond de déduction spécifique.

### Plafond de déduction PER TNS (art. 154 bis CGI)

Plafond = **10% du bénéfice imposable** (dans la limite de 8 PASS) **+ 15% de la fraction du bénéfice comprise entre 1 PASS et 8 PASS**.

| Composante | Calcul | Plafond 2025 |
|------------|--------|--------------|
| Fraction 10% | 10% × bénéfice (max 8 PASS) | Max 37 680 € |
| Fraction 15% | 15% × (bénéfice − 47 100 €) si bénéfice > PASS | Variable |
| Plancher | Même plancher que PER individuel | 4 710 € |

Le plafond TNS est donc potentiellement **supérieur** au plafond du PER individuel (37 680 €) pour les bénéfices élevés. Consulter l'avis d'imposition pour le plafond exact calculé par la DGFIP.

### Double avantage TNS

Les cotisations versées sur un PER TNS sont :
1. Déductibles du revenu professionnel (réduction IR)
2. Déductibles de l'assiette des cotisations sociales TNS (réduction cotisations URSSAF)

Ce double avantage est plus puissant que le PER individuel (qui ne joue que sur l'IR). Le taux effectif d'économie peut atteindre TMI + taux marginal de cotisations TNS.

### Arbitrage PER TNS vs PEE/PERECO pour le dirigeant TNS

Pour un dirigeant TNS qui peut mettre en place un PEE/PERECO dans sa société (voir `equity-salarial.md` → section dédiée TNS) :

**Ordre de priorité recommandé :**
1. Saturer l'abondement PEE + PERECO (11 304 € pour 2025) — double exonération IS + cotisations, liquidité PEE après 5 ans
2. PER TNS (art. 154 bis) pour les montants supplémentaires — plafond plus élevé, double avantage IR + cotisations
3. PER individuel (art. 163 quatervicies) en complément si plafond Madelin atteint

**Pourquoi PEE/PERECO d'abord ?**
- L'abondement société est exonéré de cotisations TNS côté dirigeant ET de charges patronales côté société
- La sortie PEE est en PFU sur les gains (pas au barème) — avantage si TMI retraite = TMI actuel
- Liquidité supérieure : PEE débloquable après 5 ans (nombreux cas anticipés)

## Différence PER individuel vs PERECO / PERO

- **PER individuel** (présent doc) : versements volontaires, déductibles dans la limite du plafond, sortie imposée au barème.
- **PERECO / PEE** (plans d'épargne entreprise) : alimenté par intéressement, participation, abondement employeur. Voir la section Equity salarial listée depuis SKILL.md pour le détail.

**Règle d'or** : toujours saturer l'abondement employeur (PEE + PERECO) AVANT d'abonder un PER individuel. La société abonde pour chaque euro versé — aucun rendement PER individuel n'égale un match à 50-300%.

### Plafond partagé : ce qui consomme le plafond 163 quatervicies

Le plafond de déduction (art. 163 quatervicies) est commun à toutes les enveloppes retraite déductibles. Plusieurs flux le consomment ou le réduisent :

| Flux | Case déclaration | Consomme le plafond ? |
|------|-----------------|----------------------|
| Versements volontaires PER individuel | 6NS / 6NT | **Oui** |
| Versements volontaires PERECO (compartiment 1) | 6NS / 6NT | **Oui** |
| Abondement employeur PERECO / PERCO | **6QS** | **Oui** — réduit le plafond disponible pour les versements volontaires |
| Intéressement / participation placés en PERECO | — (non déclarés) | **Non** — exonération séparée, hors plafond |
| Cotisations obligatoires PERO (compartiment 3) | 6QS | Oui (dans la limite exonérée) |

**Conséquence pratique** : si l'employeur abonde 7 418 € sur le PERECO, ce montant est déclaré en 6QS et réduit d'autant le plafond restant pour les versements volontaires PER individuel. Un salarié qui reçoit le plafond maximum d'abondement PERECO peut se retrouver avec un plafond résiduel nul pour son PER individuel si son plafond global est modeste.

**Pour les TNS** : l'abondement que la société verse sur le PERECO du dirigeant réduit de la même façon le plafond disponible pour un PER individuel — à intégrer dans l'arbitrage (voir `equity-salarial.md` → section TNS).

## Pièges fréquents

1. **Oublier le plafond** : versement > plafond → fraction non déductible (mais remboursable sans frais ou reportable selon le contrat)
2. **Sortie en capital sur un TMI 45%** : imposition quasi équivalente à un revenu normal — intérêt limité
3. **Mutualisation couple oubliée** : conjoint sans revenu laisse 4 710 € de plafond inemployé
4. **Assurer le plafond N-1 sur l'avis** : ne pas se fier aux calculs manuels, utiliser le plafond officiel DGFIP
5. **PER individuel avant PEE/PERECO** : manque l'abondement employeur

## Références CGI / BOFiP

- PER individuel : art. 163 quatervicies CGI
- Plafond de déduction : art. 163 quatervicies-I-2 CGI
- Sortie en capital : art. 158-5-b bis CGI
- Mutualisation couple : art. 163 quatervicies-I-2° CGI
- BOFiP : BOI-IR-BASE-20-50-20
