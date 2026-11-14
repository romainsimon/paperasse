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

Le versement déduit réduit le RNI, pas le revenu fiscal de référence : les cotisations d'épargne retraite déduites du revenu global sont réintégrées dans le RFR (art. 1417, IV CGI ; brochure IR 2026, « Revenu fiscal de référence »). Le PER ne réduit donc pas la CEHR et ne modifie pas les seuils de CSG sur l'ARE et les pensions ni les aides conditionnées au RFR.

**CDHR : une base inchangée ne signifie pas une contribution inchangée.** Le versement ne diminue pas le revenu de référence CDHR. Si l'IR retenu dans son calcul baisse, la CDHR peut augmenter et absorber tout ou partie de l'économie d'IR attendue. Comparer le total IR + CEHR + CDHR avant et après versement, pas seulement le TMI (voir [cas-speciaux.md](cas-speciaux.md)). Cette conséquence découle de la formule de l'[art. 224, III et IV CGI](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000053561826/2026-11-11).

Exemple fictif, toutes les autres données inchangées : couple sans personne à charge, revenu de référence CDHR de 800 000 EUR, sans revenu exceptionnel, sans prélèvement libératoire ni décote. Le total IR retraité + CEHR, déjà ajusté pour la CDHR, passe de 130 000 à 125 000 EUR après versement. La contribution passe de `160 000 - (130 000 + 12 500) = 17 500 EUR` à `160 000 - (125 000 + 12 500) = 22 500 EUR`. La hausse de 5 000 EUR absorbe ici toute la baisse d'IR. Selon la situation du foyer, la compensation peut être partielle ou absente.

## Arbitrage : le PER est-il vraiment utile ?

**Le PER est un report d'imposition, pas une exonération.** À la sortie, les versements sont imposés au barème et les gains au PFU. On ne sait pas aujourd'hui à quelle TMI on sortira, ni quelles seront les règles fiscales dans 10, 20 ou 30 ans.

### Deux sources de gain : différentiel de TMI et capitalisation de l'impôt différé

Le gain d'un PER vient de deux effets distincts :
1. **Différentiel de TMI** : on déduit à la TMI d'aujourd'hui et on est imposé à la TMI de la retraite.
2. **Capitalisation de l'impôt différé** : l'impôt non payé à l'entrée reste investi jusqu'à la sortie.

```
Illustration — hypothèses : versement 10 000 €, TMI 41 % à l'entrée, 30 % à la sortie,
rendement 5 %/an net de frais pendant 20 ans (non garanti), gains imposés à la sortie dans les deux cas

Avec PER    : 10 000 € investis → 26 533 € ; moins l'IR sur le capital versé à la sortie (3 000 € à 30 %) → 23 533 €
Sans PER    : 5 900 € investis après IR → 15 654 €
Écart : 7 879 € avant fiscalité des gains (plus élevée avec le PER, dont les gains sont plus importants)
```

Plus l'horizon est long, plus le second effet pèse. Ces chiffres ne valent que pour les hypothèses retenues : rendement, frais du contrat, TMI de sortie et règles fiscales futures sont incertains.

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

**Contraste avec le PEE** : l'abondement est acquis au versement et exonéré d'IR, et la sortie après 5 ans est exonérée d'IR selon les règles actuelles. Le rendement des supports et les frais restent, eux, incertains.

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
- Affection grave, handicap ou survenue d'un accident d'une particulière gravité chez **l'enfant à la charge du titulaire** (L. 224-4, I-2° bis, inséré par l'art. 4 de la loi n° 2026-492 du 12/06/2026, JO du 13/06/2026, applicable depuis le 14/06/2026). Contrairement au cas d'invalidité du 2°, aucune reconnaissance d'invalidité de 2e ou 3e catégorie n'est exigée. Fiscalité : la loi ne modifie ni l'art. 81 CGI ni le régime des prélèvements sociaux du PER. Le même cas de déblocage est inséré en parallèle à l'art. L. 132-23 du code des assurances (art. 3 de la loi), lui aussi visé par le 4° bis-a. La loi ne définit pas l'« affection grave » et ne renvoie à aucun décret : les justificatifs demandés relèvent du gestionnaire. L'exonération d'IR de l'art. 81, 4° bis-a CGI vise les cas des 1° à 5° du I de L. 224-4, plage dans laquelle s'insère le 2° bis : même régime que les autres accidents de la vie (versements et gains exonérés d'IR, prélèvements sociaux sur les seuls gains). Service-public.fr (fiche F34982, vérifiée le 12/10/2026) le range parmi les accidents de la vie, sans le citer dans son paragraphe fiscal. Le BOI-RSA-PENS-30-10-20 du 10/08/2026 (§ 200), qui renvoie à la version de L. 224-4 en vigueur depuis le 14/06/2026, maintient l'exonération des « 1° à 5° du I » sans exclure le 2° bis. L'art. 81 CGI dans sa version en vigueur (modifiée par la loi n° 2026-1008 du 29/10/2026, art. 5) vise toujours, au a du 4° bis, les « 1° à 5° du I de l'article L. 224-4 ». ⚠️ Au 05/11/2026, aucun paragraphe du BOFiP ne vise expressément le 2° bis : le présenter comme la lecture des textes, non comme une doctrine commentée. ⚠️ Effet de bord hors PER : à L. 132-23 du code des assurances, le nouveau cas est inséré au 6e alinéa et fait glisser le surendettement au 8e, alors que le a du 4° bis de l'art. 81 CGI vise toujours les « troisième à septième alinéas » de cet article. À la lettre, le rachat pour surendettement d'un contrat relevant de L. 132-23 sort donc du champ de l'exonération, faute de coordination par la loi ; aucun commentaire BOFiP au 10/11/2026. Le PER n'est pas touché : le 2° bis s'insère au I de L. 224-4 sans renuméroter les autres cas
- Titulaire de moins de 18 ans à la date de la demande (L. 224-4, I-7°, depuis le 01/01/2024 ; BOI-IR-BASE-20-50-10 § 60) : imposé comme une sortie en capital

**Limite de l'exonération** : un capital versé à compter de la liquidation de la pension du titulaire dans un régime obligatoire, ou de l'âge légal de départ (CSS, art. L. 161-17-2), n'ouvre plus droit à l'exonération de l'art. 81, 4° bis-a, même si un accident de la vie survient. Il suit la fiscalité d'une sortie en capital à l'échéance (BOI-RSA-PENS-30-10-20 du 10/08/2026, § 200, remarque).

Hors ces cas : déblocage impossible (capital bloqué jusqu'à la retraite).

### Transfert d'un ancien contrat (Madelin, PERP, PREFON, COREM, CRH, « article 83 », PERCO) vers un PER

Sources : BOI-RSA-PENS-30-10-20 du 10/08/2026 pour la fiscalité, CMF art. L. 224-40 et D. 224-18 pour les règles civiles et les frais.

- **Pas d'imposition au transfert** : le transfert des droits en cours de constitution vers un PER (CMF, art. L. 224-40, I) n'est pas, fiscalement, un dénouement. Les sommes transférées ne sont pas imposées l'année du transfert (§ 30). Un transfert de PER à PER (L. 224-6) suit le même régime que sans transfert (§ 40).
- **Régime à la sortie** : les droits transférés d'un Madelin, PERP, PREFON, CRH, COREM ou « article 83 » (1°, 2°, 3°, 4°, 5° et 7° du I de L. 224-40) sont assimilés à des **droits issus de versements volontaires n'ayant pas fait l'objet de l'option pour la non-déduction** (§ 90, remarque). Le § 110 prévoit que des versements volontaires sur un PER ayant dépassé le plafond de déduction suivent quand même ce régime ; l'appliquer à d'anciennes cotisations Madelin ou PERP excédentaires est une lecture par l'assimilation du § 90, non un texte exprès. Le PERCO (6°) n'est pas dans cette liste : les droits qui en proviennent suivent le régime des versements « épargne salariale » (§ 180, remarque). À l'échéance, la part du capital correspondant aux versements est imposée au barème sans abattement de 10 % (revenu exceptionnel éligible au quotient quel que soit son montant, § 100). Les produits sont imposés au PFU de 12,8 % ou, sur option globale, au barème (§ 130). Sur le plan civil, l'affectation est fixée par le CMF (art. L. 224-40, II, en vigueur depuis le 24/10/2024) : les droits des 1° à 5° (Madelin, PERP, PREFON, CRH, COREM) sont assimilés à des versements volontaires (L. 224-2, 1°), ceux du PERCO (6°) à de l'épargne salariale (L. 224-2, 2°). Pour un « article 83 » (7°), les versements volontaires du salarié vont en versements volontaires et les versements obligatoires en versements obligatoires (L. 224-2, 3°, sortie en rente). Si l'assureur ne peut pas les distinguer, tout est assimilé à des versements obligatoires, sauf justification par le titulaire du montant de ses versements volontaires. Conséquence pratique : un ancien Madelin, qui ne sortait qu'en rente, peut sortir en capital une fois transféré, sauf option irrévocable pour la rente (service-public.fr, fiche F34982).
- **Fin de l'imposition forfaitaire de 7,5 %** : l'imposition forfaitaire de l'art. 163 bis, II CGI (sorties en capital d'un PERP, PREFON, CRH ou « article 83 », § 240) ne s'applique pas à la part du capital d'un PER issue de droits transférés au titre de L. 224-40, I (§ 250, remarque). Pour un PERP ou une PREFON, le § 380 cite comme exemples d'application de ce taux la sortie en capital limitée à 20 % de la valeur de rachat (PERP ou PREFON) et, pour le seul PERP, l'acquisition en première propriété de la résidence principale, ce qui relativise la perte.
- **Produits antérieurs au transfert** : si l'ancien gestionnaire ne les a pas isolés, le gestionnaire du PER doit les rechercher, puis à défaut les fixer forfaitairement selon la grille du BOI-ANNX-000512 (§ 90, remarque). La grille ne s'applique pas aux droits issus d'anciens contrats eux-mêmes issus d'un transfert entre contrats d'un même gestionnaire, ni à ceux d'anciens contrats qui n'ont fait l'objet d'aucun transfert avant leur versement sur le PER.
- **Frais de transfert** : pour un ancien contrat transféré vers un PER (L. 224-40, I bis), les frais ne peuvent excéder **1 % des droits acquis** et sont **nuls après 10 ans** à compter du premier versement (CMF, art. D. 224-18, I, créé par le décret n° 2024-682 du 04/07/2024, en vigueur le 24/10/2024). La fiche service-public F34982 (vérifiée le 12/10/2026) mentionne encore un plafond de 5 % pour une détention de moins de 10 ans, antérieur à ce décret. Pour un transfert de PER à PER, les frais ne peuvent excéder 1 % des droits acquis et sont nuls à l'issue d'une période de 5 ans à compter du premier versement dans le plan, ou lorsque le transfert intervient à compter de l'échéance (CMF, art. L. 224-6, al. 2). Service-public.fr (fiche F34982) indique 2 mois au gestionnaire pour transmettre les informations. En cas de retard : médiateur de l'AMF.

### Décès du titulaire : transmission du PER

Voir aussi [pea-assurance-vie.md](pea-assurance-vie.md) pour le régime de l'assurance-vie et, pour la succession, le skill notaire (`notaire/references/succession.md`).

Le PER individuel est le plus souvent souscrit sous forme assurance. En cas de décès, il fonctionne **hors succession** via la clause bénéficiaire, mais **son régime fiscal n'est pas celui de l'assurance-vie** : le basculement entre les deux régimes de taxation dépend de l'âge du titulaire **au décès**, et non de son âge au versement des primes.

| Âge du titulaire au décès | Régime | Assiette taxable | Abattement et taux |
|---|---|---|---|
| Avant 70 ans | Prélèvement de l'art. 990 I CGI | Sommes dues si le plan est réputé rachetable au décès (âge de liquidation atteint ou cas de déblocage anticipé ouvert), sinon règles des contrats non rachetables ; jamais plus que le capital versé au bénéficiaire (BOI-TCAS-AUT-60 § 180, remarque 2, et § 190) | 152 500 € par bénéficiaire, puis 20 % jusqu'à 700 000 € de part taxable et 31,25 % au-delà |
| À partir de 70 ans révolus | Droits de mutation par décès, art. 757 B CGI | **Intégralité des sommes dues par l'assureur, produits compris** | 30 500 € global, tous bénéficiaires et tous contrats du même assuré confondus, puis droits de succession selon le lien de parenté |

- L'art. 757 B CGI vise expressément le plan d'épargne retraite de l'art. L. 224-1 CoMoFi et le sous-compte français du PEPP (art. L. 225-1 CoMoFi), pour le « décès après l'âge de soixante-dix ans du titulaire ».
- **BOI-ENR-DMTG-10-10-20-20 § 155** : le PER entre dans le champ des droits de mutation dès lors que le décès du titulaire survient après 70 ans révolus ; l'âge auquel les primes ont été versées **n'est pas pris en compte**.
- **BOI-ENR-DMTG-10-10-20-20 § 197** : contrairement aux autres contrats, la totalité des sommes dues par l'assureur est comprise dans l'assiette — les primes **comme** les produits.
- **BOI-TCAS-AUT-60 § 55** : les sommes versées au titre d'un PER relèvent du prélèvement de l'art. 990 I lorsque l'art. 757 B ne s'applique pas, soit lorsque le titulaire décède avant 70 ans. Tous les PER sont concernés (individuel, collectif, obligatoire), les PER étant exclus de l'exonération des contrats de groupe.

#### Ne pas transposer le régime de l'assurance-vie

C'est la confusion la plus coûteuse du sujet : les deux régimes portent les mêmes numéros d'articles, mais ni le critère d'âge ni l'assiette ne coïncident.

| Critère | Assurance-vie | PER assurance |
|---|---|---|
| Âge qui déclenche le basculement 990 I → 757 B | Âge de l'**assuré** **au versement** de chaque prime — et non du souscripteur, qui peut être une autre personne (§ 140) | Âge du titulaire **au décès** |
| Nombre de régimes applicables à un même contrat | Deux possibles : primes versées avant 70 ans sous 990 I, primes versées après sous 757 B | Un seul, pour tout le plan |
| Assiette sous l'art. 757 B | **Seules les primes** versées après 70 ans ; les produits sont exonérés | **Intégralité des sommes dues**, produits compris |
| Versements effectués après 70 ans | Ces primes relèvent de l'art. 757 B (contrat souscrit à compter du 20/11/1991 ; l'art. 757 B ne s'applique jamais à un contrat antérieur) | Non déductibles depuis le 01/01/2026 (LFI 2026, art. 9 ; BOI-IR-BASE-20-50-30) ; sans effet propre sur la transmission, fixée par l'âge du titulaire au décès |

Sources : art. 757 B CGI ; BOI-ENR-DMTG-10-10-20-20 § 155 et § 197 pour le PER, § 140 pour l'âge de l'assuré en assurance-vie, § 160 à 170 pour l'assiette de droit commun (primes seules, produits exclus).

**Conséquence pratique** : sur un PER, un décès survenu à 70 ans révolus fait basculer l'intégralité du plan — versements *et* gains accumulés depuis l'ouverture — sous le seul abattement global de 30 500 €, là où une assurance-vie alimentée avant 70 ans conserve l'abattement de 152 500 € par bénéficiaire quelle que soit la date du décès. Sur un plan ancien et chargé en gains, l'écart d'assiette est le facteur dominant, bien avant le taux.

#### Rentes viagères exclues du prélèvement de l'art. 990 I

Le deuxième alinéa du I de l'art. 990 I CGI écarte le prélèvement pour les rentes viagères constituées dans le cadre d'une activité professionnelle, d'un PERP (art. L. 144-2 C. ass.), d'un PER (art. L. 224-28 CoMoFi) ou d'un sous-compte français du PEPP (art. L. 225-1 CoMoFi), à **deux conditions cumulatives** :

1. des primes versées **régulièrement, dans leur montant et leur périodicité, pendant au moins quinze ans** ;
2. une entrée en jouissance **au plus tôt** à la date de liquidation de la pension du redevable dans un régime obligatoire d'assurance vieillesse, ou à l'âge fixé en application de l'art. L. 351-1 CSS.

Les deux conditions sont rarement réunies sur un PER individuel alimenté par versements libres : vérifier l'historique des versements avant d'annoncer une exonération. Le BOI-TCAS-AUT-60 § 55 réserve cette exception aux PER individuels dénoués sous forme de rente qui remplissent ces conditions.

**Piège de la rente en cas de décès :** si le titulaire a opté pour la rente viagère, les fonds sont aliénés — les héritiers ne récupèrent rien au décès, sauf :
- clause de **réversion** (la rente continue au conjoint, à taux réduit) ;
- **annuités garanties** (la rente est versée jusqu'à un terme fixe même en cas de décès).

Ces options réduisent le montant de la rente. À arbitrer à la souscription si la transmission est un objectif.

**PER compte-titres (PER bancaire, rare) :** les sommes sont intégrées à l'actif successoral et relèvent des droits de succession de droit commun ; le régime des art. 990 I et 757 B CGI ne vaut que pour le PER assurance (service-public F34982). Vérifier la forme du contrat avant toute conclusion.

## Abondement employeur et PER individuel

**Avant un versement sur un PER individuel, vérifier si l'employeur propose un abondement PEE / PERECO non utilisé.**

L'abondement est un complément versé par l'entreprise pour chaque euro versé par le salarié sur son PEE ou son PERECO — typiquement 50 à 300 % du versement salarié, dans une limite annuelle (8 % du PASS pour le PEE, 16 % du PASS pour le PERECO).

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

## PER TNS (ex-Madelin) : spécificités du travailleur non salarié

Le PER individuel (art. 163 quatervicies CGI) est accessible à tous, mais les TNS (gérant majoritaire SARL, gérant EURL, EI) disposent en plus du **PER TNS issu du contrat Madelin** (art. 154 bis CGI), avec un plafond de déduction spécifique.

### Plafond de déduction PER TNS (art. 154 bis CGI)

Plafond = **10% du bénéfice imposable** (dans la limite de 8 PASS) **+ 15% de la fraction du bénéfice comprise entre 1 PASS et 8 PASS**.

| Composante | Calcul | Plafond 2025 |
|------------|--------|--------------|
| Fraction 10% | 10% × bénéfice (max 8 PASS) | Max 37 680 € |
| Fraction 15% | 15% × (bénéfice − 47 100 €) si bénéfice > PASS | Variable |
| Plancher | 10% × PASS de l'année | 4 710 € |

Contrairement au plafond 163 quatervicies (PASS N-1, revenus N-1), le plafond 154 bis se calcule sur le **bénéfice et le PASS de l'année de versement**. Il est donc potentiellement **supérieur** pour les bénéfices élevés. Le plafond 154 bis ne figure pas sur l'avis d'imposition : il se calcule à partir du bénéfice de l'année.

### Effet sur l'IR seulement

Les cotisations versées au titre de l'art. 154 bis sont déductibles du revenu professionnel **pour l'IR**. Elles sont en revanche **réintégrées dans l'assiette des cotisations sociales TNS** (assiette de l'art. L. 136-3 CSS, à laquelle renvoie l'art. L. 131-6 depuis la réforme de l'assiette des indépendants, LFSS 2024, art. 18 ; rédaction consolidée à vérifier sur Légifrance) : elles ne réduisent pas les cotisations URSSAF. L'économie se limite donc à la TMI, comme pour le PER individuel ; l'intérêt du 154 bis tient à son plafond plus élevé.

### Arbitrage PER TNS vs PEE/PERECO pour le dirigeant TNS

Le PEE/PERECO n'est ouvert au dirigeant que si l'entreprise emploie **au moins un salarié en plus de lui** (art. L. 3332-2 C. trav. — voir `equity-salarial.md` → section dédiée TNS). **Dirigeant seul : PER TNS (154 bis) et PER individuel uniquement.**

**Ordre d'examen si l'entreprise a au moins un salarié :**
1. Abondement PEE + PERECO (11 304 € maximum en 2025, 11 534,40 € en 2026), en tenant compte du même abondement dû aux salariés
2. PER TNS (art. 154 bis) pour les montants supplémentaires — plafond plus élevé, déduction à l'IR seulement
3. PER individuel (art. 163 quatervicies) en complément

**Atouts du PEE/PERECO dans ce cas :**
- L'abondement est exonéré de cotisations (côté dirigeant comme côté société) et d'IR ; la CSG/CRDS reste due
- À la sortie du PEE, seuls les PS frappent les gains (pas d'IR)
- Liquidité : PEE disponible après 5 ans (nombreux cas de déblocage anticipé)

## Différence PER individuel vs PERECO / PERO

- **PER individuel** (présent doc) : versements volontaires, déductibles dans la limite du plafond, sortie imposée au barème.
- **PERECO / PEE** (plans d'épargne entreprise) : alimenté par intéressement, participation, abondement employeur. Voir la section Equity salarial listée depuis SKILL.md pour le détail.

**À retenir** : quand un abondement employeur existe (PEE + PERECO), il est généralement plus intéressant de le capter avant d'alimenter un PER individuel, sous réserve du blocage et des frais.

### Plafond partagé : ce qui consomme le plafond 163 quatervicies

Le plafond de déduction (art. 163 quatervicies) est commun à toutes les enveloppes retraite déductibles. Plusieurs flux le consomment ou le réduisent :

| Flux | Case déclaration | Consomme le plafond ? |
|------|-----------------|----------------------|
| Versements volontaires PER individuel | 6NS / 6NT | **Oui** |
| Versements volontaires PERECO (compartiment 1) | 6NS / 6NT | **Oui** |
| Abondement employeur PERECO / PERCO | **6QS** | **Oui** — diminue le plafond de l'année suivante (plafond calculé sur les revenus de l'année, sous déduction des sommes déclarées en 6QS) |
| Intéressement / participation placés en PERECO | — (non déclarés) | **Non** — exonération séparée, hors plafond |
| Cotisations obligatoires PERO (compartiment 3) | 6QS | Oui (dans la limite exonérée) |

**Conséquence pratique** : si l'employeur abonde 7 536 € sur le PERECO (plafond 2025, 16 % du PASS 2025), ce montant est déclaré en 6QS sur la déclaration des revenus 2025 et réduit d'autant le plafond utilisable pour les versements PER individuel de 2026 (art. 163 quatervicies, I-2-a CGI : plafond diminué des sommes exonérées versées au PERCO / PERECO l'année précédente). Un salarié qui reçoit le plafond maximum d'abondement PERECO peut se retrouver avec un plafond résiduel nul pour son PER individuel si son plafond global est modeste.

**Pour les TNS** : l'abondement que la société verse sur le PERECO du dirigeant réduit de la même façon le plafond disponible pour un PER individuel — à intégrer dans l'arbitrage (voir `equity-salarial.md` → section TNS).

## Pièges fréquents

1. **Oublier le plafond** : versement > plafond → l'excédent n'est **ni déductible ni reportable** (brochure IR 2026, charges déductibles, exemple) ; à la sortie en capital, la part du capital correspondant à ces versements excédentaires est imposée comme celle des versements déduits (pensions, sans abattement de 10 %, BOI-RSA-PENS-30-10-20 § 90 à 110), sauf option pour la non-déduction exercée auprès du gestionnaire au plus tard lors du versement (CMF art. L. 224-20 ; exonération, § 120)
2. **Sortie en capital sur un TMI 45%** : imposition quasi équivalente à un revenu normal, sans abattement de 10 % : intérêt limité
3. **Mutualisation couple oubliée** : conjoint sans revenu laisse 4 637 € (versements 2025) ou 4 710 € (versements 2026) de plafond inemployé
3 bis. **Confondre le PASS de l'année et celui de N-1** : les bornes des versements 2025 se calculent sur le PASS 2024 (4 637 / 37 094 €), pas sur le PASS 2025
4. **Assurer le plafond N-1 sur l'avis** : ne pas se fier aux calculs manuels, utiliser le plafond officiel DGFIP
5. **PER individuel avant PEE/PERECO** : manque l'abondement employeur
6. **Transposer la fiscalité de l'assurance-vie au décès** : sur un PER, c'est l'âge **au décès** qui détermine le régime (990 I ou 757 B), pas l'âge au versement des primes, et l'assiette sous l'art. 757 B porte sur l'intégralité des sommes dues, produits compris — voir la section sur le décès du titulaire

## Références CGI / BOFiP

- PER individuel : art. 163 quatervicies CGI
- Plafond de déduction : art. 163 quatervicies-I-2 CGI
- Sortie en capital : art. 158, 5-b quinquies CGI
- Mutualisation couple : art. 163 quatervicies-I-2° CGI
- Réintégration dans le RFR : art. 1417, IV CGI
- Report à 5 ans et règle des 70 ans : LFI 2026 (loi n° 2026-103), art. 9 et 10
- BOFiP : BOI-IR-BASE-20-50-20, BOI-IR-BASE-20-50-30 (version du 10/08/2026), BOI-ANNX-000513 (synthèse des régimes de sortie)

### Transmission au décès du titulaire

- Décès à partir de 70 ans révolus — droits de mutation, assiette intégrale : art. 757 B CGI (qui vise le PER de l'art. L. 224-1 CoMoFi et le sous-compte français du PEPP de l'art. L. 225-1 CoMoFi)
- Décès avant 70 ans — prélèvement : art. 990 I CGI
- Rentes viagères exclues du prélèvement : art. 990 I, I, 2e alinéa CGI (renvoyant aux art. L. 144-2 C. ass. et L. 224-28 CoMoFi)
- BOFiP, champ d'application du prélèvement pour les PER : BOI-TCAS-AUT-60 § 55 ; assiette (sommes dues si le plan est réputé rachetable, plafond du capital versé) : § 180, remarque 2, et § 190
- BOFiP, âge retenu et assiette du PER sous l'art. 757 B : BOI-ENR-DMTG-10-10-20-20 § 155 et § 197
