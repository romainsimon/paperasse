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

**Plafond = 10 % des revenus d'activité professionnelle nets** de l'année N-1 (art. 163 quatervicies, I-2 CGI ; brochure IR 2026, charges déductibles), retenus dans la limite de 8 fois le PASS de N-1 :
- salaires nets de frais (après abattement de 10 % ou frais réels), y compris allocations de chômage, gains de levée d'options, gains d'acquisition d'actions gratuites et revenus exceptionnels imposés comme salaires ;
- BIC, BNC, BA professionnels, rémunérations de l'art. 62 ;
- pas les revenus du capital ni les revenus fonciers.

Ce montant est **diminué des versements déjà déduits en N-1** : cotisations aux régimes « article 83 » et PERO (part patronale et part salariale), cotisations Madelin, abondement de l'employeur au PERCO / PERECO dans la limite exonérée, jours de CET ou de congé monétisés versés sur un PERCO.

### Bornes : le PASS de référence est celui de l'année qui précède le versement

| Versements de l'année | Plancher (10 % du PASS N-1) | Plafond (80 % du PASS N-1) | PASS N-1 |
|---|---|---|---|
| 2025 (déclaration 2026) | **4 637 €** | **37 094 €** | 46 368 € (2024) |
| 2026 (déclaration 2027) | 4 710 € | 37 680 € | 47 100 € (2025) |
| 2027 (déclaration 2028) | 4 806 € | 38 448 € | 48 060 € (2026) |

**Plancher garanti** même sans revenus professionnels : au moins 4 637 € déductibles pour les versements 2025. Le plafond officiel figure sur l'avis d'imposition N-1 (rubrique « Plafond pour l'épargne retraite ») ; s'il est erroné, le corriger en case 6PS / 6PT.

### Report des plafonds non utilisés

- **Versements 2025** : les reliquats des **3 années précédentes** (2022, 2023, 2024) sont mobilisables.
- **À compter de l'imposition des revenus 2026** : la LFI 2026 (loi n° 2026-103, art. 9 et 10) porte ce délai à **5 ans** (art. 163 quatervicies, I-2-b CGI ; BOI-IR-BASE-20-50-30 § 40). Un reliquat de 2023 non utilisé fin 2026 est donc perdu ; les reliquats nés en 2026 et après valent cinq ans.
- Ordre d'imputation (§ 50) : plafond de l'année en cours d'abord, puis les reliquats du plus ancien au plus récent.

**Exemple** :
- Plafond N : 5 000 €, utilisé 3 000 € : reste 2 000 € reportables sur les années suivantes (3 ans pour un reliquat antérieur à 2026, 5 ans ensuite)
- Au-delà, le reliquat est **perdu**

### Mutualisation couple

Les époux/pacsés soumis à imposition commune peuvent **mutualiser leurs plafonds** (case 6QR de la 2042). Un conjoint sans revenu pro peut bénéficier du plafond inemployé de l'autre. La mutualisation devient sans objet l'année qui suit celle où l'un des conjoints atteint 70 ans.

### Titulaires de 70 ans et plus

Depuis le 1er janvier 2026, les versements volontaires sur un PER dont le titulaire a 70 ans ou plus à la date du versement **ne sont plus déductibles** (LFI 2026, art. 9 ; BOI-IR-BASE-20-50-30).

### Effet sur le RFR : aucun

Le versement déduit réduit le RNI, pas le revenu fiscal de référence : les cotisations d'épargne retraite déduites du revenu global sont réintégrées dans le RFR (art. 1417, IV CGI ; brochure IR 2026, « Revenu fiscal de référence »). Le PER ne diminue donc ni la CEHR, ni la CDHR, ni les seuils de CSG sur l'ARE et les pensions, ni les aides conditionnées au RFR.

## Arbitrage : le PER est-il vraiment utile ?

**Le PER est un REPORT d'imposition, pas une exonération.**

À la sortie, les versements sont imposés comme revenu (barème). Les gains sont imposés au PFU.

### Gagnant / perdant

| Situation | Résultat |
|-----------|----------|
| TMI entrée > TMI sortie | **Gain net** — économie à l'entrée > imposition sortie |
| TMI entrée = TMI sortie | **Neutre fiscalement** — seul l'effet capitalisation sur l'économie initiale joue |
| TMI entrée < TMI sortie | **Perte nette** — rare mais possible (carrière ascendante, sortie capital massif) |

### Cas typiques favorables

- **Actif TMI 30-41% avec retraite estimée TMI 11-30%** : gain net substantiel
- **Année de revenus exceptionnels** : versement pour écraser l'IR de l'année, sortie étalée plus tard
- **Quotient pour revenus exceptionnels + PER** : combinaison puissante pour un vesting RSU important

### Cas défavorables ou neutres

- **TMI 11% stable** : intérêt marginal — seul l'effet capitalisation compte
- **TMI 45% stable (hauts revenus à la retraite)** : pas d'avantage, imposition identique entrée/sortie
- **Horizon court (< 10 ans avant retraite)** : peu d'effet de capitalisation

## Sortie du PER

### Sortie à la retraite

**Deux options au choix** :

1. **Sortie en rente viagère** (versements volontaires déduits ; BOI-ANNX-000513)
   - Imposition comme pension : rente viagère à titre gratuit, barème après abattement de 10 % plafonné (art. 79 et 158, 5-a CGI)
   - Prélèvements sociaux au taux des produits de placement (17,2 % jusqu'au 31/12/2025, 18,6 % ensuite), mais sur la seule fraction imposable d'une rente viagère à titre onéreux selon l'âge d'entrée en jouissance (art. L. 136-7, I-4° CSS). Le taux de 9,1 % (CSG des pensions + CRDS + CASA) ne vaut que pour les rentes issues de versements obligatoires d'un PER d'entreprise.
   - Protection en cas de longévité

2. **Sortie en capital**
   - **Versements déduits à l'entrée** : imposés au barème progressif **sans l'abattement de 10 %** (art. 158, 5-b quinquies-1° CGI), case 1AI
   - **Gains** : imposés séparément au PFU (12,8 % IR + PS) ou au barème sur option globale, case 2TZ ; les gains PER sont des « produits de placement » (L. 136-7 CSS) :
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

Cas de déblocage avant la retraite (art. L. 224-4 CMF) :
- Achat de la résidence principale : le capital issu de versements déduits est imposé au barème (sans abattement de 10 %) et les gains au PFU, comme une sortie à la retraite
- « Accidents de la vie » (L. 224-4, I-1° à 5°) : décès du conjoint ou partenaire de PACS, invalidité (titulaire, conjoint, enfant), surendettement, **expiration des droits à l'assurance chômage** (ou, pour un dirigeant sans contrat de travail, absence de mandat social et de contrat de travail depuis deux ans), cessation d'activité non salariée après jugement de liquidation judiciaire : versements et gains **exonérés d'IR**, prélèvements sociaux sur les seuls gains (BOI-ANNX-000513)

Hors ces cas : déblocage impossible (capital bloqué jusqu'à la retraite).

## Priorité absolue : abondement employeur avant PER individuel

**Avant tout versement PER individuel, vérifier que l'abondement PEE / PERCO de l'employeur est saturé.**

L'abondement est un complément versé par l'entreprise pour chaque euro versé par le salarié sur son PEE ou son PERCO — typiquement 50 à 300 % du versement salarié, dans une limite annuelle (8 % du PASS pour le PEE, 16 % du PASS pour le PERCO).

| Dispositif | Avantage |
|------------|----------|
| **PEE + abondement** | Prime de l'employeur exonérée d'IR (soumise à CSG/CRDS 9,7 %) + sortie exonérée d'IR, seuls PS sur les gains (17,2 % jusqu'en 2025, 18,6 % dès 2026) |
| **PERCO / PERECO + abondement** | Idem (capital issu de l'épargne salariale exonéré d'IR à la sortie) + blocage jusqu'à la retraite |
| **PER individuel** | Uniquement économie d'impôt immédiate × TMI, pas de match employeur |

Un abondement de 100 % double le versement dès l'entrée (environ 90 % net de CSG/CRDS), ce qu'aucune déduction PER ne procure. Il reste à comparer la durée de blocage, les frais et les supports.

## Mécanique pratique

### Déclaration

- Versements : case 6NS (déclarant 1) / 6NT (déclarant 2) sur la 2042
- Plafond calculé automatiquement par la DGFIP (figure sur l'avis d'imposition N-1, rubrique "Plafond pour l'épargne retraite")

## Différence PER individuel vs PERCO / PERO

- **PER individuel** (présent doc) : versements volontaires, déductibles dans la limite du plafond, sortie imposée au barème.
- **PERCO / PEE** (plans d'épargne entreprise) : alimenté par intéressement, participation, abondement employeur. Voir la section Equity salarial listée depuis SKILL.md pour le détail.

**Règle d'or** : toujours saturer l'abondement employeur (PEE + PERCO) AVANT d'abonder un PER individuel. L'abondement est de l'argent gratuit — aucun rendement PER individuel n'égale un match à 50-300%.

## Pièges fréquents

1. **Oublier le plafond** : versement > plafond → l'excédent n'est **ni déductible ni reportable** (brochure IR 2026, charges déductibles, exemple) ; à la sortie en capital, la part du capital correspondant à ces versements excédentaires est imposée comme celle des versements déduits (pensions, sans abattement de 10 %, BOI-RSA-PENS-30-10-20 § 90 à 110), sauf option pour la non-déduction exercée auprès du gestionnaire au plus tard lors du versement (CMF art. L. 224-20 ; exonération, § 120)
2. **Sortie en capital sur un TMI 45%** : imposition quasi équivalente à un revenu normal, sans abattement de 10 % : intérêt limité
3. **Mutualisation couple oubliée** : conjoint sans revenu laisse 4 637 € (versements 2025) ou 4 710 € (versements 2026) de plafond inemployé
3 bis. **Confondre le PASS de l'année et celui de N-1** : les bornes des versements 2025 se calculent sur le PASS 2024 (4 637 / 37 094 €), pas sur le PASS 2025
4. **Assurer le plafond N-1 sur l'avis** : ne pas se fier aux calculs manuels, utiliser le plafond officiel DGFIP
5. **PER individuel avant PEE/PERCO** : manque l'abondement employeur

## Références CGI / BOFiP

- PER individuel : art. 163 quatervicies CGI
- Plafond de déduction : art. 163 quatervicies-I-2 CGI
- Sortie en capital : art. 158, 5-b quinquies CGI
- Mutualisation couple : art. 163 quatervicies-I-2° CGI
- Réintégration dans le RFR : art. 1417, IV CGI
- Report à 5 ans et règle des 70 ans : LFI 2026 (loi n° 2026-103), art. 9 et 10
- BOFiP : BOI-IR-BASE-20-50-20, BOI-IR-BASE-20-50-30 (version du 10/08/2026), BOI-ANNX-000513 (synthèse des régimes de sortie)
