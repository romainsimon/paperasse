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
- Achat de la résidence principale (sauf droits issus de versements obligatoires) : le capital issu de versements déduits est imposé au barème (sans abattement de 10 %) et les gains au PFU, comme une sortie à la retraite
- « Accidents de la vie » (L. 224-4, I-1° à 5°) : décès du conjoint ou partenaire de PACS, invalidité (titulaire, conjoint, enfant), surendettement, **expiration des droits à l'assurance chômage** (ou, pour un dirigeant sans contrat de travail, absence de mandat social et de contrat de travail depuis deux ans), cessation d'activité non salariée après jugement de liquidation judiciaire, et depuis le 14/06/2026 le cas du 2° bis ci-dessous : versements et gains **exonérés d'IR**, prélèvements sociaux sur les seuls gains (BOI-ANNX-000513)
- Affection grave, handicap ou survenue d'un accident d'une particulière gravité chez **l'enfant à la charge du titulaire** (L. 224-4, I-2° bis, inséré par l'art. 4 de la loi n° 2026-492 du 12/06/2026, JO du 13/06/2026, applicable depuis le 14/06/2026). Contrairement au cas d'invalidité du 2°, aucune reconnaissance d'invalidité de 2e ou 3e catégorie n'est exigée. Fiscalité : la loi ne modifie ni l'art. 81 CGI ni le régime des prélèvements sociaux du PER. Le même cas de déblocage est inséré en parallèle à l'art. L. 132-23 du code des assurances (art. 3 de la loi), lui aussi visé par le 4° bis-a. La loi ne définit pas l'« affection grave » et ne renvoie à aucun décret : les justificatifs demandés relèvent du gestionnaire. L'exonération d'IR de l'art. 81, 4° bis-a CGI vise les cas des 1° à 5° du I de L. 224-4, plage dans laquelle s'insère le 2° bis : même régime que les autres accidents de la vie (versements et gains exonérés d'IR, prélèvements sociaux sur les seuls gains). Service-public.fr (fiche F34982, vérifiée le 12/10/2026) le range parmi les accidents de la vie, sans le citer dans son paragraphe fiscal. Le BOI-RSA-PENS-30-10-20 du 10/08/2026 (§ 200), qui renvoie à la version de L. 224-4 en vigueur depuis le 14/06/2026, maintient l'exonération des « 1° à 5° du I » sans exclure le 2° bis. L'art. 81 CGI dans sa version en vigueur (modifiée par la loi n° 2026-1008 du 29/10/2026, art. 5) vise toujours, au a du 4° bis, les « 1° à 5° du I de l'article L. 224-4 ». ⚠️ Au 05/11/2026, aucun paragraphe du BOFiP ne vise expressément le 2° bis : le présenter comme la lecture des textes, non comme une doctrine commentée
- Titulaire de moins de 18 ans à la date de la demande (L. 224-4, I-7°, depuis le 01/01/2024 ; BOI-IR-BASE-20-50-10 § 60) : imposé comme une sortie en capital

**Limite de l'exonération** : un capital versé à compter de la liquidation de la pension du titulaire dans un régime obligatoire, ou de l'âge légal de départ (CSS, art. L. 161-17-2), n'ouvre plus droit à l'exonération de l'art. 81, 4° bis-a, même si un accident de la vie survient. Il suit la fiscalité d'une sortie en capital à l'échéance (BOI-RSA-PENS-30-10-20 du 10/08/2026, § 200, remarque).

Hors ces cas : déblocage impossible (capital bloqué jusqu'à la retraite).

### Transfert d'un ancien contrat (Madelin, PERP, PREFON, COREM, CRH, « article 83 », PERCO) vers un PER

Sources : BOI-RSA-PENS-30-10-20 du 10/08/2026 pour la fiscalité, CMF art. L. 224-40 et D. 224-18 pour les règles civiles et les frais.

- **Pas d'imposition au transfert** : le transfert des droits en cours de constitution vers un PER (CMF, art. L. 224-40, I) n'est pas, fiscalement, un dénouement. Les sommes transférées ne sont pas imposées l'année du transfert (§ 30). Un transfert de PER à PER (L. 224-6) suit le même régime que sans transfert (§ 40).
- **Régime à la sortie** : les droits transférés d'un Madelin, PERP, PREFON, CRH, COREM ou « article 83 » (1°, 2°, 3°, 4°, 5° et 7° du I de L. 224-40) sont assimilés à des **droits issus de versements volontaires n'ayant pas fait l'objet de l'option pour la non-déduction** (§ 90, remarque), Le § 110 prévoit que des versements volontaires sur un PER ayant dépassé le plafond de déduction suivent quand même ce régime ; l'appliquer à d'anciennes cotisations Madelin ou PERP excédentaires est une lecture par l'assimilation du § 90, non un texte exprès. Le PERCO (6°) n'est pas dans cette liste : les droits qui en proviennent suivent le régime des versements « épargne salariale » (§ 180, remarque). À l'échéance, la part du capital correspondant aux versements est imposée au barème sans abattement de 10 % (revenu exceptionnel éligible au quotient quel que soit son montant, § 100). Les produits sont imposés au PFU de 12,8 % ou, sur option globale, au barème (§ 130). Sur le plan civil, l'affectation est fixée par le CMF (art. L. 224-40, II, en vigueur depuis le 24/10/2024) : les droits des 1° à 5° (Madelin, PERP, PREFON, CRH, COREM) sont assimilés à des versements volontaires (L. 224-2, 1°), ceux du PERCO (6°) à de l'épargne salariale (L. 224-2, 2°). Pour un « article 83 » (7°), les versements volontaires du salarié vont en versements volontaires et les versements obligatoires en versements obligatoires (L. 224-2, 3°, sortie en rente). Si l'assureur ne peut pas les distinguer, tout est assimilé à des versements obligatoires, sauf justification par le titulaire du montant de ses versements volontaires. Conséquence pratique : un ancien Madelin, qui ne sortait qu'en rente, peut sortir en capital une fois transféré, sauf option irrévocable pour la rente (service-public.fr, fiche F34982).
- **Fin de l'imposition forfaitaire de 7,5 %** : l'imposition forfaitaire de l'art. 163 bis, II CGI (sorties en capital d'un PERP, PREFON, CRH ou « article 83 », § 240) ne s'applique pas à la part du capital d'un PER issue de droits transférés au titre de L. 224-40, I (§ 250, remarque). Pour un PERP ou une PREFON, le § 380 cite comme exemples d'application de ce taux la sortie en capital limitée à 20 % de la valeur de rachat et l'acquisition d'une première résidence principale, ce qui relativise la perte.
- **Produits antérieurs au transfert** : si l'ancien gestionnaire ne les a pas isolés, le gestionnaire du PER doit les rechercher, puis à défaut les fixer forfaitairement selon la grille du BOI-ANNX-000512 (§ 90, remarque). La grille ne s'applique pas aux droits issus d'anciens contrats eux-mêmes issus d'un transfert entre contrats d'un même gestionnaire, ni à ceux d'anciens contrats qui n'ont fait l'objet d'aucun transfert avant leur versement sur le PER.
- **Frais de transfert** : pour un ancien contrat transféré vers un PER (L. 224-40, I bis), les frais ne peuvent excéder **1 % des droits acquis** et sont **nuls après 10 ans** à compter du premier versement (CMF, art. D. 224-18, I, créé par le décret n° 2024-682 du 04/07/2024, en vigueur le 24/10/2024). La fiche service-public F34982 (vérifiée le 12/10/2026) mentionne encore un plafond de 5 % pour une détention de moins de 10 ans, antérieur à ce décret. Pour un transfert de PER à PER, les frais ne peuvent excéder 1 % des droits acquis et sont nuls à l'issue d'une période de 5 ans à compter du premier versement dans le plan, ou lorsque le transfert intervient à compter de l'échéance (CMF, art. L. 224-6, al. 2). Service-public.fr (fiche F34982) indique 2 mois au gestionnaire pour transmettre les informations. En cas de retard : médiateur de l'AMF.

### Décès du titulaire

PER d'assurance : c'est l'âge du titulaire **au décès** qui commande, et non l'âge au versement des primes. L'art. 990 I CGI s'applique avant 70 ans, l'art. 757 B après, avec une assiette qui porte alors sur l'intégralité des sommes dues, produits compris. PER compte-titres : sommes intégrées à l'actif successoral. Détail et sources dans [pea-assurance-vie.md](pea-assurance-vie.md) et, pour la succession, dans le skill notaire (`notaire/references/succession.md`).

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
