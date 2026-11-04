# Equity salarial (RSU, BSPCE, stock-options, PEE/PERCO)

Voir `data/equity-salarial.json` pour les taux et seuils.

## RSU / AGA (Restricted Stock Units / Actions Gratuites)

**Terminologie** : "RSU" est le terme anglo-saxon ; "AGA" (Actions Gratuites d'Actions) est le terme juridique français (art. L. 225-197-1 C. com., art. 80 quaterdecies CGI). Les deux désignent le même dispositif : attribution d'actions gratuites aux salariés, avec période d'acquisition (vesting) puis détention éventuelle.

### Deux événements fiscaux distincts, imposés la même année (celle de la cession)

Source : [BOI-RSA-ES-20-20-20](https://bofip.impots.gouv.fr/bofip/5654-PGP.html/identifiant=BOI-RSA-ES-20-20-20-20260521) (régime fiscal au regard des bénéficiaires, version du 21/05/2026) et [BOI-RSA-ES-20-30](https://bofip.impots.gouv.fr/bofip/2389-PGP.html/identifiant=BOI-RSA-ES-20-30-20260521) (contribution salariale). Le régime dépend de la **date de la décision d'AGE** qui a autorisé l'attribution et du caractère **qualifiant** du plan (C. com. art. L. 225-197-1 et s. ; plans de sociétés étrangères : [BOI-RSA-ES-20-20-10-20](https://bofip.impots.gouv.fr/bofip/9665-PGP.html/identifiant=BOI-RSA-ES-20-20-10-20-20260521), version du 21/05/2026). Pour une société étrangère, la « date de l'AGE » est celle de la décision d'autorisation de l'attribution par l'organe habilité de la société (l'assemblée qui approuve le plan), pas celle de l'adoption du sous-plan français : un sous-plan adopté après le 31/12/2017 pour une autorisation antérieure ne relève pas du régime de la LF 2018 (§ 460, remarques 1 à 3). NYSE et NASDAQ sont assimilés à des marchés réglementés (§ 400).

**1. Gain d'acquisition** = valeur des actions à la date d'acquisition définitive (vesting) × nombre d'actions
- Valeur retenue : **premier cours coté du jour de l'attribution définitive** ; cotation en devise convertie au taux de change de ce jour (§ 120 et 130)
- **Fait générateur : la cession** (ou disposition, conversion au porteur, mise en location), à titre onéreux ou gratuit, pas le vesting (art. 80 quaterdecies CGI ; § 150). Un gain acquis en N et cédé en N+3 se déclare en N+3. Une **donation** est un fait générateur : gain d'acquisition imposé au nom du donateur l'année de la donation, plus-value latente non imposée, le donataire repartant de la valeur retenue pour les droits de donation (§ 185).
- **Période de conservation** : le plan fixe une période d'acquisition d'au moins un an et une durée cumulée acquisition + conservation d'au moins deux ans (C. com. art. L. 225-197-1, I). Une cession, une donation ou une mise en location **pendant la période de conservation prévue par le plan, même plus longue que le minimum légal, fait imposer le gain d'acquisition selon les règles de droit commun des traitements et salaires** (§ 10 ; interdictions au BOI-RSA-ES-20-20-10-20 § 90). Vérifier la date de fin de conservation de chaque lot avant toute vente : avec un vesting trimestriel, les lots récents sont souvent encore bloqués.
- Une **moins-value de cession** (vente sous la valeur d'acquisition) s'impute sur le gain d'acquisition correspondant, dans la limite de ce montant, avant tout abattement (art. 80 quaterdecies V ; § 190). Les moins-values sur d'autres titres ne s'imputent jamais sur le gain d'acquisition.
- **Identification des lots cédés** : quand le portefeuille mêle des titres de la même société de plusieurs origines (lots d'actions gratuites de dates différentes, plan d'achat d'actions, achats), le calcul se fait lot par lot si les titres cédés sont individualisables (sous-comptes ou comptes distincts chez le courtier, registre nominatif) ; à défaut, l'administration admet une répartition proportionnelle des titres cédés entre catégories (BOI-RSA-ES-20-10-20-20 § 90 à 120, rédigé pour les options et transposé par analogie). C'est ce qui détermine le gain d'acquisition réalisé dans l'année, donc le respect du seuil de 300 000 €. Conserver les relevés de lots du courtier.

**2. Plus-value de cession** = prix de cession (converti au taux de change du jour de la cession, BOI-RPPM-PVBMI-20-10-10-10 § 20) − valeur à la date d'acquisition définitive (convertie au taux du jour du vesting) : l'effet de change fait partie de la plus-value ou de la moins-value
- **PV mobilière** : PFU à **31,4 % pour les cessions réalisées dès 2025** (12,8 % IR + 18,6 % PS, LFSS 2026), ou barème sur option globale (case 2OP, CSG déductible de 6,8 points ; pas d'abattement pour durée de détention pour des titres acquis depuis le 01/01/2018, § 170) : à comparer les années à faible revenu
- Les PV mobilières sont des "revenus du patrimoine" (art. L. 136-6 CSS), donc soumises au taux PS 18,6 % dès les revenus 2025
- **RFR, CEHR, CDHR** : le gain d'acquisition entre dans le RFR pour son montant avant abattement de 50 % (art. 1417, IV, 1°, a bis CGI), donc en totalité pour la CEHR ; pour la CDHR, l'abattement est retranché du revenu de référence (BOI-IR-CDHR-10 § 150 et § 160)

### Régime du gain d'acquisition selon la date de l'AGE (plans qualifiants)

| Décision d'AGE | Fraction annuelle ≤ 300 000 € | Fraction > 300 000 € |
|---|---|---|
| **Après le 31/12/2017** (LF 2018 art. 28, régime courant) | Barème **après abattement de 50 %** (art. 200 A, 3 CGI), le cas échéant abattement fixe 150-0 D ter ; **PS revenus du patrimoine** 18,6 % sans abattement (L. 136-6 I e CSS, § 50) ; **pas de contribution salariale** ; **CSG déductible** l'année de son paiement à hauteur de 6,8 points au prorata du gain imposé à l'IR, soit 3,4 % du gain avec l'abattement de 50 % (art. 154 quinquies, II CGI ; brochure IR 2026, charges déductibles) | Traitements et salaires de droit commun : barème sans abattement, CSG/CRDS d'activité 9,7 %, **contribution salariale 10 %** (L. 137-14 CSS), due l'année de la cession et non déductible de l'IR (BOI-RSA-ES-20-30 § 90 et § 190) |
| Du 31/12/2016 au 31/12/2017 | Barème après abattements pour durée de détention (ancien 150-0 D) ou abattement fixe, non cumulables ; PS patrimoine | Idem ci-dessus (salaire + contribution 10 %) |
| Du 08/08/2015 au 30/12/2016 (loi Macron) | Intégralité du gain : barème après abattements pour durée de détention, PS patrimoine, pas de contribution salariale | sans objet |
| Attribution à compter du 28/09/2012 sur AGE antérieure au 08/08/2015 | Salaire (barème, 1TT / 1UT), CSG/CRDS d'activité, contribution salariale 10 % | sans objet |
| Attribution du 01/01/2005 au 27/09/2012 | Taux forfaitaire de 30 % (3VI) sauf option salaires (3VJ / 3VK), PS patrimoine sans CSG déductible, contribution de 10 % si attribution depuis le 16/10/2007 (3VN) (§ 35 et § 46) | sans objet |

La limite de 300 000 € s'apprécie **par attributaire** (art. 80 quaterdecies, I : « entre les mains de l'attributaire ») et par année de cession, sur l'ensemble de ses gains d'acquisition de plans postérieurs au 30/12/2016, **après** imputation d'une éventuelle moins-value de cession ; elle n'est pas reportable (§ 44). Le BOFiP ne tranche pas expressément le cas de deux conjoints attributaires.

**Plans non qualifiants** (hors conditions du C. com.) : le gain d'acquisition est un salaire ordinaire, imposé l'année de l'acquisition définitive, intégré à la paie avec les cotisations de droit commun (en principe pré-rempli en 1AJ), **sans contribution salariale de 10 %** (§ 10 ; BOI-RSA-ES-20-30 § 20). Pas de case 1TT pour ces plans.

### Pièges classiques

Deux erreurs symétriques :
1. **Traiter le gain d'acquisition d'un plan qualifiant comme un salaire** (cotisations, contribution 10 %, cases salaires) : faux sous 300 000 € depuis la loi Macron, c'est le régime des plans non qualifiants ou de la fraction excédentaire.
2. **Le traiter comme une simple PV mobilière** au PFU : faux, il est au barème après abattement de 50 %, avec PS patrimoine, l'année de la cession.

Seule la plus-value ultérieure (valeur au vesting → cession) est une PV mobilière. Cases de la 2042 C millésime 2026 : 1TZ (gain imposable après abattement) et 1WZ (abattement 50 %) pour la fraction ≤ 300 000 €, 1TT / 1UT pour la fraction excédentaire ; à revérifier chaque millésime.

**Piège de la brochure** : la notice 2041-NOT 2026 imprime encore « prélèvements sociaux de 17,2 % » sur le gain d'acquisition et un PFU « au total 30 % ». La loi (LFSS 2026 art. 12, II) applique le taux de 18,6 % aux revenus du patrimoine « à compter de l'imposition des revenus de l'année 2025 » ; citer la loi, pas la brochure.

### Stratégie : quotient pour revenus exceptionnels

Une cession massive d'actions gratuites (ex: 150 000 € de gain d'acquisition imposable la même année) fait franchir plusieurs tranches. Le **quotient pour revenus exceptionnels** (art. 163-0 A CGI, coefficient toujours égal à 4, ligne 0XX de la 2042 C) peut lisser l'imposition, à deux conditions : le revenu doit être exceptionnel **par sa nature et par son montant** (supérieur à la moyenne des revenus nets imposables des trois années précédentes), et imposé au barème.

**Réserve** : le BOFiP refuse la qualification aux revenus « réalisés dans le cadre normal de l'activité professionnelle », même si leur montant varie fortement d'une année sur l'autre (BOI-IR-LIQ-20-30-20 § 40 et § 50), et aucune doctrine ne vise expressément les actions gratuites. Pour des attributions récurrentes qui font partie de la rémunération normale, la nature exceptionnelle est douteuse ; une cession unique de plusieurs années de vesting se défend mieux. Chiffrer avec et sans quotient, et présenter le quotient comme une demande à motiver, non comme un réflexe. Il n'existe aucun seuil du type « 1,5 fois le salaire ».

Mécanisme : impôt = [IR(RNI_hors_RSU + gain/4) − IR(RNI_hors_RSU)] × 4. Utile si le gain seul fait franchir une tranche. **Nuance** : inutile si le foyer est déjà au TMI 45% (le taux marginal ne change pas avec la division) et sans effet sur la CEHR, calculée sur le RFR sans quotient (seul le lissage propre à la CEHR, art. 223 sexies, II, peut jouer) ; pour la CDHR, les revenus exceptionnels sont retenus pour le quart de leur montant (art. 224 CGI). Détail et exemples chiffrés dans la section cas-speciaux listée depuis SKILL.md.

## Stock-options

### Rabais excédentaire

Fraction du rabais qui excède 5 % de la valeur de référence de l'action à la date d'attribution (moyenne des cours ou cours moyen d'achat, art. 80 bis, II CGI).
→ **Imposition comme salaire l'année de la levée**, 2042 C cases 1TP / 1UP (brochure IR 2026, traitements et salaires).

### Gain de levée

Selon date d'attribution :

| Options attribuées | Régime |
|------|--------|
| Avant le 28/09/2012 | Taux forfaitaires de faveur selon la durée de portage (cases 3VD / 3VI / 3VF), ou option salaire ; contribution salariale 10 % si attribuées depuis le 16/10/2007 (case 3VN) |
| À compter du 28/09/2012 (plans qualifiés) | Imposé **l'année de la cession**, de la conversion au porteur ou de la mise en location des titres (art. 80 bis, II bis CGI) : salaire au barème (case 1TT / 1UT), CSG/CRDS d'activité 9,7 %, contribution salariale 10 % (L. 137-14 CSS ; [BOI-RSA-ES-20-30](https://bofip.impots.gouv.fr/bofip/2389-PGP.html/identifiant=BOI-RSA-ES-20-30-20260521) § 30 et § 150). Une moins-value de cession sous la valeur à la levée s'impute sur le gain de levée (brochure IR 2026). La plus-value au-delà de la valeur à la levée est une PV mobilière (3VG / 3VH) |
| Plan non qualifié (options étrangères sans sous-plan conforme au code de commerce) | Salaire de droit commun, en principe l'année de la levée, par la paie (BOI-RSA-ES-20-10-20-50 § 1) |

La contribution salariale frappe la totalité du gain de levée des plans qualifiés : le seuil de 300 000 € n'existe que pour les actions gratuites. Toujours consulter le plan pour déterminer le régime applicable.

## Plan d'achat d'actions avec décote (ESPP non qualifié, société étrangère, hors PEE)

1. **La décote** (valeur réelle des titres au jour de l'achat moins le prix payé, y compris l'effet d'une clause de « lookback ») est un **avantage salarial** : imposable au barème dans la catégorie des traitements et salaires au titre de l'année de l'achat (BOI-RSA-ES-20-10-20-50 § 10 et § 20 : titres acquis « dans des conditions préférentielles » en raison du contrat de travail ; CE 13/07/2021 n° 435452, cité au BOI-RSA-ES-20-60 § 180). Elle ne relève ni de l'art. 80 bis ni de l'art. 80 quaterdecies : **ni abattement de 50 %, ni seuil de 300 000 €, ni contribution salariale de 10 %** (BOI-RSA-ES-20-30 § 20). En pratique l'employeur français l'intègre à la paie du mois de l'achat (salaire pré-rempli en 1AJ, prélèvement à la source, cotisations) ; vérifier le bulletin du mois de l'achat.
2. **À la revente**, la plus-value suit le régime des plus-values mobilières (art. 150-0 A CGI ; PFU 31,4 % ou barème sur option). Le prix de revient à retenir est la **valeur réelle au jour de l'achat** (prix payé majoré de la décote déjà imposée), faute de quoi la décote serait imposée deux fois ; prix de cession converti au taux du jour de la cession, valeur d'achat au taux du jour de l'achat (BOI-RPPM-PVBMI-20-10-10-10 § 20). Réserve : ce prix de revient est déduit du principe d'imposition de l'avantage et de l'analogie avec les options (BOI-RSA-ES-20-10-20-20 § 10 et § 30) ; aucun paragraphe BOFiP propre aux ESPP n'a été trouvé.
3. La décote seule ne fait pas relever la plus-value du régime des « management packages » (art. 163 bis H CGI ; BOI-RSA-ES-20-60 § 170 à § 190).
4. Les titres ESPP détenus chez un courtier étranger se mêlent aux lots d'actions gratuites : voir l'identification des lots cédés ci-dessus ; ils ne consomment pas le seuil de 300 000 € et n'ont pas de période de conservation.

## BSPCE (Bons de Souscription de Parts de Créateur d'Entreprise)

**Différence clé vs RSU** : pas de gain d'acquisition imposable comme salaire. Le gain n'est réalisé et imposé **qu'à la cession des actions**.

### Imposition du gain de cession

Voir `data/equity-salarial.json` → `bspce.gain_cession`.

| Ancienneté dans la société à la date de cession | Taux global pour cessions 2025 |
|--------------------------------------------------|-------------|
| **≥ 3 ans** | **31,4 %** (12,8 % IR, ou barème sur option globale, + 18,6 % PS) ; 19 % d'IR pour les bons attribués avant le 01/01/2018 (case 3SJ) |
| **< 3 ans** | **48,6 %** (30 % IR sans option pour le barème + 18,6 % PS) |

Source : [BOI-RSA-ES-20-40-30](https://bofip.impots.gouv.fr/bofip/13157-PGP.html/identifiant=BOI-RSA-ES-20-40-30-20250812) (titres souscrits jusqu'au 31/12/2024) (§ 30 à 70 pour les taux d'IR, § 120 pour les prélèvements sociaux). Dans les deux cas, les prélèvements sociaux sont ceux des revenus du patrimoine (L. 136-6 CSS), dus dès le premier euro, soit 18,6 % dès les revenus 2025 ; il n'existe aucun prélèvement spécifique à 20 %. Pour les titres souscrits en exercice de bons à compter du 01/01/2025 (loi 2025-127 art. 92), la 2042 C 2026 sépare l'avantage salarial issu de l'exercice (12,8 % ou 30 % selon l'ancienneté) du gain de cession (PV mobilière, case 3TL).

La pénalité pour départ précoce (< 3 ans) est forte. À intégrer dans les décisions de départ.

### Conditions d'éligibilité de la société

À vérifier avant attribution :
- SA ou SAS française
- Immatriculée depuis moins de 15 ans
- Non cotée OU cotée sur compartiment dédié aux PME
- Soumise à l'IS
- Capital détenu à 25% minimum par des personnes physiques
- Non issue d'une restructuration (fusion, scission, reprise d'activité)

**Si conditions non remplies** : requalification en salaires → barème IR + cotisations sociales → traitement beaucoup plus défavorable.

### Vérification préalable recommandée

Demander à la société :
- Date d'immatriculation au RCS
- Capital social et répartition (tableau des associés)
- Régime fiscal (IS obligatoire)
- Historique des restructurations éventuelles

## Épargne salariale (PEE / PERCO / PERO)

### PEE (Plan d'Épargne Entreprise)

Enveloppe collective distincte du PER individuel.

- **Abondement employeur** : exonéré IR et PS dans les plafonds — **AVANTAGE MAJEUR**
- **Plafond abondement** : ~3 709 € par bénéficiaire (8% PASS — vérifier annuellement)
- **Blocage** : 5 ans sauf cas de déblocage anticipé (mariage, naissance 3e enfant, achat RP, divorce avec enfant, fin contrat travail, surendettement, invalidité, décès, violences conjugales)
- **Sortie après 5 ans** : exonération IR, seuls PS 17,2% sur les gains
- **Dividendes réinvestis** : exonérés IR tant qu'ils restent dans l'enveloppe

### PERCO / PERO (PER d'entreprise)

- **Sortie à la retraite** : rente ou capital
- **Fiscalité sortie** : même que PER individuel (versements à barème, gains au PFU)
- **Abondement employeur** : exonéré dans plafonds (~7 418 €, distinct du plafond PEE)

### Arbitrage PEE/PERCO vs PER individuel

| Enveloppe | Avantage unique | Quand privilégier |
|-----------|----------------|-------------------|
| PEE | Abondement employeur (levier +30% à +300%) | D'abord, toujours — tant qu'il y a abondement |
| PERCO / PERO | Abondement employeur sur épargne retraite | En second après PEE max |
| PER individuel | Déduction RNI (pas de plafond d'abondement) | En complément, après saturation PEE/PERCO |

**Règle d'or** : ne jamais abonder un PER individuel avant d'avoir saturé l'abondement employeur PEE + PERCO. L'abondement est de l'argent gratuit.

## Quotient pour revenus exceptionnels

Vesting massif, cession d'entreprise, indemnité de départ → à activer.

**Mécanisme** :
1. Revenu exceptionnel ÷ coefficient (généralement 4)
2. Ajouter au revenu ordinaire
3. Calculer l'impôt supplémentaire
4. × coefficient

**À mentionner systématiquement** pour :
- Gain d'acquisition d'actions gratuites exceptionnellement élevé par rapport aux revenus habituels (aucun seuil légal du type « 1,5 fois le salaire », voir la réserve plus haut)
- Cession de parts de société
- Indemnité de départ importante
- Prime exceptionnelle massive

**Inutile si** : foyer déjà à TMI 45% (taux marginal identique quelle que soit la division).

## Formulaires

| Revenu | Formulaire / case |
|--------|-------------------|
| Gain acquisition RSU, plan qualifiant, fraction ≤ 300 000 € | 2042 C case 1TZ (gain après abattement) + 1WZ (abattement 50 %) ou 1UZ (durée de détention, AGE 2015-2017) ou 1VZ (abattement fixe) |
| Gain acquisition RSU, fraction > 300 000 € ou AGA attribuées depuis le 28/09/2012 sur AGE antérieure au 08/08/2015 | 2042 C case 1TT / 1UT (salaires) |
| Gain acquisition RSU, plan non qualifiant | Salaire ordinaire de l'année du vesting, via la paie (1AJ / 1BJ) |
| Plus-value cession RSU | 2042 C case 3VG (plus-value, PFU ou barème selon la case 2OP) ou 3VH (moins-value), 2074 si détail |
| Gain cession BSPCE, titres souscrits jusqu'au 31/12/2024 | 2042 C : 3SJ (bons attribués avant 2018, au moins 3 ans), 3TJ (bons attribués du 01/01/2018 au 31/12/2024 ; 3TK ne reçoit que l'abattement fixe du dirigeant partant à la retraite), 3SK (moins de 3 ans, 30 %) |
| BSPCE, titres souscrits depuis le 01/01/2025 | 2042 C : gain d'exercice 3PC (12,8 %) ou 3PE (30 %), ou 1AY / 1BY sur option salaires ; gain de cession 3TL (3TM : abattement fixe du dirigeant partant à la retraite) |
| Décote ESPP | Salaire du mois de l'achat, via la paie (1AJ / 1BJ) |
| Abondement PEE (information) | Déclaration employeur, exonéré d'IR |
| Stock-options | 1TP / 1UP (rabais excédentaire), 1TT / 1UT (options attribuées depuis le 28/09/2012), 3VD / 3VI / 3VF / 3VJ / 3VK / 3VN (options antérieures), 3VG / 3VH (plus ou moins-value de cession) |

## Références CGI / BOFiP

- RSU : art. 80 quaterdecies CGI
- Stock-options : art. 80 bis CGI
- BSPCE : art. 163 bis G CGI
- PEE : art. L. 3332-1 et s. Code du travail
- PER : art. 163 quatervicies CGI
- BOFiP : BOI-RSA-ES (actionnariat salarié)
