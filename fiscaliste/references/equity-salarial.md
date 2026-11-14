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

Mécanisme : impôt = [IR(RNI_hors_RSU + gain/4) − IR(RNI_hors_RSU)] × 4. Utile si le gain seul fait franchir une tranche. **Nuance** : inutile si le foyer est déjà au TMI 45% (le taux marginal ne change pas avec la division) et sans effet sur la CEHR, calculée sur le RFR sans quotient (seul le lissage propre à la CEHR, art. 223 sexies, II, peut jouer) ; pour la CDHR, le traitement au quart relève des conditions propres de l'art. 224 CGI, qui exigent un revenu exceptionnel par nature et par montant, indépendamment de l'application du quotient IR (voir la section CDHR de [cas-speciaux.md](cas-speciaux.md)). Détail et exemples chiffrés dans la section cas-speciaux listée depuis SKILL.md.

## Stock-options

### Rabais excédentaire

Fraction du rabais qui excède 5 % de la valeur de référence de l'action à la date d'attribution (moyenne des cours ou cours moyen d'achat, art. 80 bis, II CGI).
→ **Imposition comme salaire l'année de la levée**, 2042 C cases 1TP / 1UP (brochure IR 2026, traitements et salaires).

### Gain de levée

Selon date d'attribution, hors levée financée par le PEE décrite ci-dessous :

| Options attribuées | Régime |
|------|--------|
| Avant le 28/09/2012 | Titres indisponibles 4 ans (5 ans si attribution avant le 27/04/2000). Attribution du 27/04/2000 au 27/09/2012 : 30 % jusqu'à 152 500 € de gain annuel et 41 % au-delà, 18 % et 30 % si les titres sont conservés deux ans de plus (cases 3VD / 3VI / 3VF) ; attribution du 20/09/1995 au 26/04/2000 : 30 %. Ou option salaire ; contribution salariale 10 % si attribuées depuis le 16/10/2007 (case 3VN) |
| À compter du 28/09/2012 (plans qualifiés) | Imposé **l'année de la cession**, de la conversion au porteur ou de la mise en location des titres (art. 80 bis, II bis CGI) : salaire au barème (case 1TT / 1UT), CSG/CRDS d'activité 9,7 %, contribution salariale 10 % (L. 137-14 CSS ; [BOI-RSA-ES-20-30](https://bofip.impots.gouv.fr/bofip/2389-PGP.html/identifiant=BOI-RSA-ES-20-30-20260521) § 30 et § 150). Une moins-value de cession sous la valeur à la levée s'impute sur le gain de levée (brochure IR 2026). La plus-value au-delà de la valeur à la levée est une PV mobilière (3VG / 3VH) |
| Plan non qualifié (options étrangères sans sous-plan conforme au code de commerce) | Salaire de droit commun, en principe l'année de la levée, par la paie (BOI-RSA-ES-20-10-20-50 § 1) |

La contribution salariale frappe la totalité du gain de levée des plans qualifiés : le seuil de 300 000 € n'existe que pour les actions gratuites. Toujours consulter le plan pour déterminer le régime applicable.

### Cas particulier : levée financée par le PEE

Des avoirs du PEE, même indisponibles, peuvent financer la levée d'options qualifiées ; les actions obtenues entrent alors dans le plan. Ce dispositif ne vise pas un simple apport d'actions déjà détenues.

- **Nouveau blocage de cinq ans** à compter de l'entrée des actions dans le PEE, sans déblocage anticipé ordinaire : une rupture du contrat de travail ne le lève pas. En cas de décès, les héritiers peuvent disposer des titres après dépôt de la déclaration de succession.
- Sous les conditions du dispositif, **gain net exonéré d'IR, gain de levée compris**. Le rabais excédentaire reste imposé séparément comme salaire à la levée.
- Pour les options attribuées depuis le **16/10/2007**, la **contribution salariale de 10 %** sur le gain de levée reste due lors de la cession des actions dans le PEE, même sans retrait du plan.
- Les **PS à la délivrance des avoirs** sont distincts de cette contribution. La liquidation des anciens avoirs pour financer la levée déclenche elle-même les PS sur leurs gains.
- L'apport des actions à un FCP ou une société dont l'actif est exclusivement composé de titres de l'employeur ou de son groupe conserve la durée de blocage restant à courir. Pour dater une éventuelle cession des actions sous-jacentes, vérifier les opérations et relevés ; le seul changement de support ne suffit pas.

Sources : [C. trav. L. 3332-25](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000042340834/2026-11-11), [BOI-RSA-ES-10-30-10 § 120 à 180](https://bofip.impots.gouv.fr/bofip/5639-PGP.html/identifiant=BOI-RSA-ES-10-30-10-20200728) et [BOI-RSA-ES-20-30 § 120 et 150](https://bofip.impots.gouv.fr/bofip/2389-PGP.html/identifiant=BOI-RSA-ES-20-30-20260521).

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

## Épargne salariale (PEE / PERCO / PERECO)

### PEE (Plan d'Épargne Entreprise)

Enveloppe collective distincte du PER individuel.

**Exception au blocage et aux sorties ci-dessous** : les actions issues d'options levées avec les avoirs du PEE relèvent du cas particulier ci-dessus, sans déblocage anticipé ordinaire.

- **Abondement employeur** : exonéré d'IR et de cotisations sociales dans le plafond, mais **soumis à la CSG et à la CRDS** (9,7 %, revenus d'activité ; service-public F2142) et, côté employeur, au forfait social le cas échéant. **Avantage majeur** malgré tout : un abondement de 100 % reste un rendement immédiat de ~90 % net de CSG/CRDS.
- **Plafond d'abondement** : 8 % du PASS **de l'année** par bénéficiaire, sans dépasser 3 fois le versement du salarié : 3 709 € en 2024, **3 768 € en 2025**, **3 844,80 € en 2026** (PASS 48 060 €) ; 14,4 % du PASS si l'abondement est investi en titres de l'entreprise.
- **Blocage** : 5 ans, sauf déblocage anticipé (art. R. 3324-22 C. trav., tableau ci-dessous)
- **Sortie** (après 5 ans ou déblocage anticipé) : versements et gains **exonérés d'IR** ; prélèvements sociaux sur les seuls gains, au taux des produits de placement (art. L. 136-7, II-7° CSS) : **17,2 % jusqu'au 31/12/2025, 18,6 % à compter du 01/01/2026** (LFSS 2026), sous réserve des taux historiques pour les gains issus de versements antérieurs à 2018. La LFSS 2026 (art. 12, II, 2°) exclut aussi de la hausse les produits « acquis ou constatés avant le 1er janvier 2026 » mentionnés au V de l'art. 8 de la LFSS 2018 ; portée non encore commentée au BOFiP : se fier au décompte de l'établissement. Ce n'est pas un « PFU » : aucun IR à la sortie.
- **Dividendes réinvestis** : exonérés IR tant qu'ils restent dans l'enveloppe
- **Participation et intéressement** : exonérés d'IR s'ils sont affectés au PEE ou au PERCO (CSG/CRDS 9,7 % prélevées), imposés comme salaire s'ils sont perçus. Plafond d'exonération de chacun : 75 % du PASS (36 045 € pour 2026, service-public.fr fiche F2142 ; 35 325 € pour 2025, PASS 47 100 €).

#### Cas de déblocage anticipé PEE

Cas limitativement énumérés à l'art. R. 3324-22 C. trav. La demande doit être présentée dans les **6 mois** suivant le fait générateur, sauf pour la rupture du contrat de travail, le décès, l'invalidité, les violences conjugales, le surendettement et l'activité de proche aidant : demande possible **à tout moment** (art. R. 3324-23).

| Cas | Précisions |
|-----|-----------|
| Mariage ou PACS du bénéficiaire | — |
| Naissance ou arrivée d'un enfant adopté | Le foyer compte déjà au moins 2 enfants à charge |
| Divorce, séparation, dissolution du PACS | Résidence habituelle d'au moins un enfant au domicile du bénéficiaire |
| Violences conjugales | Ordonnance de protection, ou faits ayant donné lieu à une poursuite pénale ou à une condamnation |
| Invalidité | Bénéficiaire, enfant, conjoint ou partenaire de PACS ; taux d'incapacité d'au moins 80 % et absence d'activité professionnelle |
| Décès | Bénéficiaire, conjoint ou partenaire de PACS |
| Fin du contrat de travail ou de l'activité | Rupture du contrat de travail, cessation d'activité de l'entrepreneur individuel, fin du mandat social, perte du statut de conjoint collaborateur ou associé |
| Création ou reprise d'entreprise | Bénéficiaire, enfant, conjoint ou partenaire de PACS |
| Résidence principale | Acquisition, agrandissement créant de la surface habitable nouvelle, remise en état après catastrophe naturelle |
| Rénovation énergétique de la résidence principale | Au sens du code de la construction |
| Surendettement | Sur demande de la commission de surendettement ou du juge |
| Activité de proche aidant | Pour un proche au sens du code du travail |
| Achat d'un véhicule propre | Voiture ou camionnette utilisant l'électricité ou l'hydrogène **comme source exclusive d'énergie** (art. R. 3324-22, 11° C. trav. ; les hybrides, rechargeables compris, sont exclus — service-public F2142), deux-roues ou trois-roues électrique, vélo à assistance électrique neuf |

La rénovation énergétique, l'activité de proche aidant et l'achat d'un véhicule propre ont été ajoutés par le décret du 5 juillet 2024 (applicables aux faits générateurs, ou aux demandes pour le proche aidant, postérieurs à son entrée en vigueur).

### PERCO / PERECO (PER d'entreprise collectif)

- **Sortie à la retraite** : rente ou capital
- **Fiscalité de sortie** (BOI-ANNX-000513) : les sommes issues de l'intéressement, de la participation et de l'abondement sortent en capital **exonérées d'IR** (versements et gains, art. 81, 18° et 4° bis-b CGI), avec PS sur les seuls gains (art. L. 136-7, II-7° bis CSS). Seuls les **versements volontaires déduits** suivent le régime du PER individuel (capital au barème sans abattement de 10 %, gains au PFU). Ne pas écrire « même fiscalité que le PER individuel » pour l'épargne salariale.
- **Abondement employeur** : exonéré d'IR et de cotisations sociales dans le plafond, soumis à CSG/CRDS ; plafond distinct du PEE : 16 % du PASS de l'année (7 418,88 € en 2024, **7 536 € en 2025**, **7 689,60 € en 2026**)

#### PERCO / PERECO / PERO : clarification terminologique

Trois générations de plans, souvent confondus :

| Sigle | Nom complet | Statut | Remplace |
|-------|------------|--------|---------|
| **PERCO** | Plan d'Épargne pour la Retraite Collectif | Fermé (plus créable depuis oct. 2020) | — |
| **PERECO** (ou PERCOL) | PER d'Entreprise Collectif | Actif — successeur du PERCO | PERCO |
| **PERO** | PER d'Entreprise Obligatoire | Actif — différent du PERECO | Article 83 |

**PERECO et PERO sont deux produits distincts** et peuvent coexister dans la même entreprise : le PERECO est volontaire (alimenté par intéressement, participation, abondement, versements volontaires) ; le PERO est obligatoire pour une catégorie de salariés définie, avec des cotisations patronales imposées. Dans les petites structures (SARL, EURL), le PERO est rare — c'est le PERECO qui est pertinent.

### Sortie PERCO / PERECO : rente ou capital

La fiscalité de sortie dépend de **l'origine des fonds**, pas du plan lui-même.

#### Fonds issus de l'épargne salariale (intéressement, participation, abondement — compartiment 2)

Ces sommes ont été **exonérées d'IR à l'entrée** (pas déduites). La sortie est donc avantageuse :

| Mode de sortie | IR | Prélèvements sociaux |
|---------------|----|--------------------|
| **Capital** | **Exonéré** (sommes déjà exonérées à l'entrée) | PS sur les gains uniquement (taux en vigueur — cf. SKILL.md, 18,6% depuis la LFSS 2026) |
| **Rente** | Régime des rentes viagères à titre onéreux — fraction taxable selon l'âge | PS sur la fraction taxable |

**Fractions taxables de la rente (rente viagère à titre onéreux)** selon l'âge au premier versement :

| Âge au premier versement de rente | Fraction imposable à l'IR |
|----------------------------------|--------------------------|
| Moins de 50 ans | 70% |
| 50 à 59 ans | 50% |
| 60 à 69 ans | 40% |
| 70 ans et plus | 30% |

La rente viagère à titre onéreux est plus favorable que la rente pension (PER individuel avec déduction) car seule une fraction est imposée — sans abattement 10% mais sur une base réduite.

#### Fonds issus de versements volontaires déduits (compartiment 1, PERECO uniquement)

| Mode de sortie | IR | Prélèvements sociaux |
|---------------|----|--------------------|
| **Capital** | Versements au barème **sans abattement de 10 %** (art. 158, 5-b quinquies-1° CGI ; case 1AI) | Gains au PFU, PS au taux en vigueur (cf. SKILL.md, 18,6 % depuis la LFSS 2026) |
| **Rente** | Régime des pensions (barème + abattement 10%) | PS au taux en vigueur sur la seule fraction imposable de la rente viagère à titre onéreux (70/50/40/30 % selon l'âge au premier versement — BOI-ANNX-000513) |

#### Rente ou capital : quand choisir quoi ?

| Critère | Capital | Rente |
|---------|---------|-------|
| Encours modeste (< 30 k€) | Préférable | Rente dérisoire |
| Encours important + longévité | — | Protège contre le risque de longévité |
| TMI retraite élevé | Étaler la sortie en capital sur plusieurs années | Rente imposée chaque année |
| Besoin de liquidité | Oui | Non |

**Conseil pratique** : la sortie en capital peut être fractionnée sur plusieurs années (à demander à l'assureur) pour lisser l'imposition.

### PERCO ancien : qu'est-il devenu ?

Depuis le **1er octobre 2020**, aucun nouveau PERCO ne peut être créé. Les plans existants ont trois destins :

1. **Ils continuent de fonctionner** avec leurs règles d'origine — certains ne permettaient que la sortie en rente
2. **L'entreprise les transfère vers un PERECO** — transfert à l'initiative de l'employeur, neutre fiscalement
3. **Ils s'éteignent** naturellement quand tous les bénéficiaires ont liquidé leurs droits

### Migration PERCO → PERECO : faut-il le faire ?

**Avantages :**
- Accès à la **sortie en capital** si le PERCO ancien ne la permettait pas (rente uniquement)
- Meilleure **portabilité** lors d'un changement d'employeur
- Gestion d'actifs souvent plus moderne (gamme de fonds élargie)

**Contraintes :**
- Décision de **l'entreprise**, pas du salarié seul
- Frais et délai : fixés par le règlement du plan et le teneur de comptes, à lui demander. Le plafond de 1 % de l'encours (gratuit après 5 ans) indiqué par service-public F34982 vise le **transfert individuel** d'un PER à l'initiative du titulaire (art. L. 224-6 CMF), non la migration collective décidée par l'entreprise
- Les avoirs PERCO migrent dans le **compartiment 2** du PERECO (épargne salariale)

**Achat de la résidence principale :** le déblocage anticipé du PERECO couvre les versements volontaires (compartiment 1) **et** l'épargne salariale (compartiment 2 : intéressement, participation, abondement). Seuls les droits issus de versements obligatoires (compartiment 3, PERO) restent bloqués (art. L. 224-4 CMF ; service-public F34982).

#### Cas de déblocage anticipé PERECO

Les cas de sortie anticipée sont ceux du PER individuel (art. L. 224-4 CMF, détail dans `references/per.md`), beaucoup plus restreints que le PEE :

- Décès du conjoint ou partenaire de PACS
- Invalidité (titulaire, enfants, conjoint ou partenaire de PACS)
- Affection grave, handicap ou accident d'une particulière gravité d'un enfant à charge (I-2° bis, depuis le 14/06/2026)
- Surendettement
- Expiration des droits à l'assurance chômage
- Cessation d'activité non salariée après liquidation judiciaire
- Acquisition de la résidence principale (compartiments 1 et 2 — pas les versements obligatoires)

Mariage, naissance, divorce, rupture de contrat, création d'entreprise, violences conjugales : **non déblocables** sur PERCO/PERECO.

### Arbitrage PEE/PERCO vs PER individuel

| Enveloppe | Avantage unique | Quand privilégier |
|-----------|----------------|-------------------|
| PEE | Abondement employeur (levier +30% à +300%) | D'abord, toujours — tant qu'il y a abondement |
| PERECO | Abondement employeur sur épargne retraite | En second après PEE max |
| PER individuel | Déduction RNI (pas de plafond d'abondement) | En complément, après saturation PEE/PERCO |

**À examiner en premier** : lorsqu'un abondement employeur existe, le capter sur le PEE ou le PERECO avant un versement sur un PER individuel est généralement plus intéressant, sous réserve de la durée de blocage, des frais et des supports proposés.

## Épargne salariale pour TNS : PEE/PERECO dans sa propre société

Section dédiée au dirigeant TNS (gérant majoritaire de SARL, gérant d'EURL, entrepreneur individuel) qui met en place un PEE/PERECO dans sa propre entreprise — situation distincte du salarié classique.

Voir `data/equity-salarial.json` → `pee_perco_tns` pour les paramètres chiffrés.

### Condition préalable : au moins un salarié en plus du dirigeant

**Un dirigeant seul, sans aucun salarié, ne peut pas bénéficier d'un PEE ni d'un PERECO.**

L'art. L. 3332-2 du Code du travail ouvre le plan au chef d'entreprise (et, pour une personne morale, au président, directeur général, gérant ou membre du directoire) **uniquement dans les entreprises employant habituellement au moins un salarié et moins de 250 salariés**. La fiche officielle le formule ainsi : au moins un salarié **en plus du dirigeant lui-même** (service-public F2142). Les mêmes bénéficiaires sont visés pour le PERECO.

Pour l'intéressement, l'art. L. 3312-3 est encore plus explicite : aucun accord ne peut être conclu si le seul salarié de l'entreprise est aussi son président, directeur général, gérant ou membre du directoire.

Conséquences pratiques :
- **Gérant seul de son EURL, président seul de sa SASU, EI sans salarié** : pas de PEE/PERECO, pas d'intéressement. Les enveloppes disponibles sont le PER individuel (art. 163 quatervicies CGI) et, pour un TNS, la déduction des cotisations PER au titre de l'art. 154 bis CGI.
- **Dès qu'un salarié est embauché** (le conjoint salarié compte) : le dirigeant peut adhérer au plan mis en place pour ses salariés, aux mêmes conditions qu'eux.
- **Conjoint collaborateur ou associé** du chef d'entreprise : bénéficiaire possible au même titre que le dirigeant.

Le plan doit être ouvert à tous les salariés (ancienneté exigible de 3 mois au plus) : il n'est pas possible de le réserver au dirigeant. L'abondement suit les mêmes règles pour tous les bénéficiaires.

### Éligibilité selon la forme juridique (entreprise d'au moins un salarié)

| Forme juridique | Régime social dirigeant | Éligibilité PEE/PERECO | Notes |
|----------------|------------------------|------------------------|-------|
| SARL (gérant majoritaire > 50%) | TNS | Oui, si au moins 1 salarié | — |
| EURL à l'IS (gérant associé unique) | TNS | Oui, si au moins 1 salarié | — |
| EURL à l'IR | TNS | Oui, si au moins 1 salarié | Déductibilité indirecte — voir piège n°4 |
| SAS / SASU (président) | Assimilé salarié | Oui, si au moins 1 salarié en plus du président | Pas de cotisations TNS sur dividendes |
| EI | TNS | Oui, si au moins 1 salarié | L'entrepreneur individuel est un « chef d'entreprise » au sens de L. 3332-2 ; la personnalité morale n'est pas requise |

Sans salarié, la réponse est **non** pour toutes les formes.

### Mécanique de l'abondement TNS

**Circuit :**
1. Le dirigeant TNS effectue un versement volontaire sur le PEE/PERECO (depuis sa rémunération nette déjà taxée)
2. La société verse l'abondement (charge déductible du résultat IS)
3. L'abondement est exonéré de cotisations sociales et d'IR dans les plafonds ; la CSG/CRDS (9,7 %) reste due

**Plafonds** (PASS de l'année de versement ; source unique : `data/equity-salarial.json` → `pee_perco.pee.plafond_abondement_pee` et `pee_perco.perco_pereco.plafond_abondement_perco`) :

| Plan | Formule | 2025 (PASS = 47 100 €) | 2026 (PASS = 48 060 €) |
|------|---------|------------------------|------------------------|
| PEE | 8% × PASS | 3 768 € | 3 844,80 € |
| PERECO | 16% × PASS | 7 536 € | 7 689,60 € |
| **Total cumulable** | **24% × PASS** | **11 304 €** | **11 534,40 €** |

Plafonds distincts et non fongibles. Pour le PEE, 14,4 % du PASS si l'abondement est investi en titres de l'entreprise.

L'abondement de la société ne peut dépasser 3× le versement du dirigeant (règle générale des plans).

**Plafond de versement du bénéficiaire sur le PEE :** les versements volontaires sont plafonnés au **quart de la rémunération annuelle ou du revenu professionnel imposé à l'IR au titre de l'année précédente** (art. L. 3332-10 C. trav.). Pour le conjoint collaborateur non rémunéré : un quart du PASS. Ce plafond de versement est distinct du plafond d'abondement.

**Versements volontaires PERECO (compartiment 1) :** le dirigeant peut aussi alimenter volontairement le PERECO. Le déblocage anticipé pour **achat de la résidence principale** porte sur ces versements comme sur l'abondement (compartiment 2).

**Déductibilité IS :**
L'abondement est une charge déductible du résultat (compte 6474 — charges de personnel liées à la participation et à l'intéressement, ou assimilé). Économie IS = abondement × taux IS (25%, ou 15% sur les 42 500 premiers € pour les PME éligibles).

**Exonération cotisations sociales dans les plafonds :**
- Côté société : pas de cotisations patronales sur l'abondement ; forfait social 0 % sous 50 salariés
- Côté dirigeant TNS : l'abondement est exonéré d'IR et donc absent du revenu professionnel qui sert d'assiette aux cotisations TNS ; la CSG/CRDS (9,7 %) est prélevée. L'art. L. 3332-27 C. trav. ne vise expressément que l'assiette des salariés (L. 242-1 CSS) : faire confirmer le traitement par l'URSSAF ou l'expert-comptable, notamment depuis la réforme de l'assiette sociale des indépendants (LFSS 2024, art. 18, appliquée aux revenus 2025)
- Côté IR : abondement exclu du revenu imposable (art. 81-18° CGI)

**Exemple chiffré — gérant SARL IS avec un salarié, IS 25 %, cotisations TNS ≈ 42 % (hypothèses à adapter) :**

Pour un abondement PEE au plafond (ex. 3 768 € en 2025, supposant un versement personnel d'au moins 1 256 €) :
- Coût net société après IS : 3 768 × (1 − 25 %) = **2 826 €**
- Cotisations TNS évitées par rapport à une rémunération équivalente : ≈ 3 768 × 42 % ≈ **1 583 €**
- CSG/CRDS sur l'abondement : 3 768 × 9,7 % ≈ **365 €**
- Le même abondement doit être offert au salarié qui fait le même versement : en tenir compte dans le coût total
- Sommes bloquées 5 ans, sortie exonérée d'IR (PS sur les gains, taux en vigueur — cf. SKILL.md) ; le rendement dépend des supports choisis et des frais du teneur de compte

### Arbitrage PEE/PERECO vs PER TNS (ex-Madelin)

Deux enveloppes concurrentes pour l'optimisation fiscale du dirigeant TNS :

| Critère | PEE / PERECO (abondement) | PER TNS (ex-Madelin, art. 154 bis CGI) |
|---------|--------------------------|----------------------------------------|
| Déduction du résultat société | Oui (charge IS) | Indirecte : déduites du revenu imposable du gérant (art. 62 CGI pour une SARL à l'IS) |
| Économie cotisations TNS | Oui, dans plafonds | Non : les cotisations PER 154 bis sont réintégrées dans l'assiette des cotisations sociales (assiette de l'art. L. 136-3 CSS, à laquelle renvoie l'art. L. 131-6 depuis la réforme de l'assiette des indépendants) |
| Exonération IR entrée | Oui (abondement exclu du revenu) | Oui (déduction revenu professionnel) |
| Plafond annuel | 24% × PASS (PEE + PERECO — voir equity-salarial.json) | 10% bénéfice + 15% fraction > PASS (plafond souvent plus élevé pour fort bénéfice) |
| Liquidité | PEE : déblocage après 5 ans (cas anticipés nombreux) | Bloqué jusqu'à la retraite |
| Sortie | PEE : exo IR, PS gains (taux en vigueur — cf. SKILL.md) / PERECO : abondement exonéré d'IR en capital, versements déduits au barème sans abattement de 10 % (art. 158, 5-b quinquies-1° CGI) + PFU sur les gains | Barème IR (anciens Madelin : rente obligatoire) |
| Condition | Au moins un salarié en plus du dirigeant ; plan ouvert à tous les salariés | Aucune condition d'effectif |
| Complexité mise en place | Règlement par accord ou décision unilatérale + dépôt sur TéléAccords | Souscription contrat individuel |

**Ordre d'examen (TMI 30-41 %), si l'entreprise a au moins un salarié :**
1. PEE + PERECO (24 % × PASS, 11 534,40 € en 2026 — voir equity-salarial.json) : exonération de cotisations et d'IR sur l'abondement, liquidité du PEE à 5 ans ; à comparer avec le coût de l'abondement versé aussi aux salariés
2. PER TNS (art. 154 bis) pour les montants supplémentaires si le bénéfice le justifie
3. PER individuel (163 quatervicies) en complément, plafond partiellement commun

Sans salarié, seuls les points 2 et 3 sont ouverts.

**TMI 45 % :**
- L'intérêt du PER diminue si le TMI à la retraite reste élevé (report d'imposition, pas exonération)
- Le PEE reste intéressant : à la sortie, seuls les PS frappent les gains (pas d'IR), horizon 5 ans

**Point crucial — plafond partagé (163 quatervicies) :**
L'abondement PERECO versé par la société est déclaré en **case 6QS** et diminue le plafond de déduction de l'année suivante pour les versements volontaires sur un PER individuel (le plafond des versements N est calculé sur les revenus N-1, sous déduction des sommes 6QS de N-1). PER individuel et PERECO pompent sur la même enveloppe fiscale.

| Flux | Consomme le plafond 163 quatervicies ? |
|------|----------------------------------------|
| Versements volontaires PER individuel (6NS) | **Oui** |
| Versements volontaires PERECO compartiment 1 (6NS) | **Oui** |
| Abondement employeur PERECO (6QS) | **Oui** — réduit le plafond de l'année suivante |
| Intéressement / participation placés en PERECO | **Non** — exonération séparée |

Un abondement PERECO au plafond (16% × PASS) peut donc épuiser une grande partie du plafond annuel, laissant peu de marge pour un PER individuel complémentaire. À simuler avant de souscrire un PER individuel en parallèle.

### Conjoint salarié : leviers additionnels

Quand le gérant embauche son conjoint, l'entreprise compte un salarié : le PEE/PERECO et l'intéressement deviennent possibles, pour le salarié comme pour le dirigeant. Le contrat de travail doit être réel (emploi effectif, rémunération normale) : un emploi fictif fait tomber les exonérations.

#### Prime de Partage de la Valeur (PPV)

Dispositif issu de la loi n° 2022-1158 du 16 août 2022, pérennisé par la loi n° 2023-1107 du 29 novembre 2023 (transposition ANI).

- **Bénéficiaires** : tous les salariés (dont le conjoint salarié). Le dirigeant TNS ne peut pas en bénéficier lui-même.
- **Plafond d'exonération** : 3 000 € par bénéficiaire et par année civile (6 000 € si un accord d'intéressement ou de participation est en vigueur)
- **Dans le plafond, quel que soit le salaire et l'effectif** : exonérée de cotisations sociales patronales et salariales
- **Salarié rémunéré moins de 3 SMIC dans une entreprise de moins de 50 salariés** (régime temporaire, versements jusqu'au 31/12/2026) : exonérée en outre d'IR et de CSG/CRDS
- **Salarié rémunéré au moins 3 SMIC, ou entreprise de 50 salariés et plus** : seuls l'IR et la CSG/CRDS sont dus, les cotisations restant exonérées dans le plafond
- **Au-delà du plafond** : la fraction excédentaire est traitée comme une prime ordinaire (cotisations, CSG/CRDS et IR) — service-public F35235
- **Pas de condition d'accord** : versable par décision unilatérale de l'employeur

**Piège — réduction générale des cotisations patronales :**
Depuis le 1er janvier 2025, la PPV est intégrée dans la rémunération retenue pour calculer la réduction générale (ex-réduction Fillon). Depuis le 1er janvier 2026, celle-ci est remplacée par la **réduction générale dégressive unique (RGDU)**, qui s'applique jusqu'à **3 SMIC** (au lieu de 1,6 SMIC). Une PPV augmente la rémunération annuelle retenue, donc diminue le coefficient de réduction : l'employeur perd une partie de ses allègements.

**Avant de verser une PPV à un salarié rémunéré sous 3 SMIC, simuler la perte de RGDU** (paramètres à jour sur le BOSS, rubrique « Allègements généraux »). L'intéressement n'entre pas dans l'assiette de la réduction générale et peut s'avérer moins coûteux dans cette zone.

#### Intéressement et participation

Un accord d'intéressement est possible dès qu'il y a un salarié (le conjoint) qui n'est pas lui-même mandataire social (art. L. 3312-3). Il bénéficie à tous les salariés et, dans les entreprises de moins de 250 salariés, au dirigeant et au conjoint collaborateur ou associé.

| Dispositif | Exonération cotisations | Exonération IR | Plafond par bénéficiaire |
|------------|------------------------|----------------|--------------------------|
| Intéressement (placé PEE) | Oui | Oui | 75% PASS : 35 325 € (2025), 36 045 € (2026) |
| Participation (placée PEE) | Oui | Oui | 75% PASS : 35 325 € (2025), 36 045 € (2026) |
| Intéressement (non placé) | Oui | Non (IR) | Idem |

Dans tous les cas, la CSG/CRDS (9,7 %) est due. L'intéressement placé sur le PEE peut lui-même être abondé, dans la limite commune de 3× le versement et 8 % du PASS. Avec un accord d'intéressement, le plafond d'exonération de la PPV passe à 6 000 € (au lieu de 3 000 €).

#### Mutuelle santé famille

L'employeur est tenu de proposer une complémentaire santé collective obligatoire (art. L. 911-7 CSS) avec prise en charge patronale ≥ 50% de la cotisation.

**Option mutuelle famille :**
- La société peut souscrire une mutuelle "famille" couvrant le salarié (conjoint) + enfants + le conjoint du salarié (i.e. le gérant)
- La cotisation patronale est une charge déductible du résultat
- **Cotisations sociales** : exonération dans la limite de 6 % du PASS + 1,5 % de la rémunération annuelle brute soumise à cotisations, le total étant plafonné à 12 % du PASS (art. D. 242-1 CSS) ; CSG/CRDS dues ; forfait social à partir de 11 salariés
- **IR du salarié** : la part patronale finançant la complémentaire **santé** est ajoutée au revenu imposable du salarié ; la limite de l'art. 83-1° quater CGI (5 % du PASS + 2 % de la rémunération, total plafonné à 2 % de 8 PASS) concerne la déduction des cotisations de prévoyance — ne pas la confondre avec la limite sociale ci-dessus
- Le gérant TNS est couvert en tant que "conjoint" du salarié — sans être lui-même salarié

**Dispense d'adhésion du conjoint salarié ailleurs :**
Si le conjoint est par ailleurs salarié d'une autre entreprise et bénéficie à ce titre d'une mutuelle collective obligatoire, il peut demander une dispense d'adhésion à la mutuelle de la SARL (art. R. 242-1-6 CSS). Conditions à réunir :
- La couverture existante est **obligatoire** chez l'autre employeur (pas une couverture optionnelle)
- La dispense doit être demandée par écrit et conservée au dossier RH

**Point de vigilance** : une couverture obligatoire minimale chez l'autre employeur peut être moins avantageuse qu'une mutuelle famille bien choisie. Comparer avant de décider.

### Pièges spécifiques TNS

**1. Dépassement des plafonds d'abondement**
La fraction d'abondement excédant 8% PASS (PEE) ou 16% PASS (PERECO) est réintégrée dans l'assiette des cotisations sociales TNS et dans l'IR. Surveiller en fin d'année.

**2. Versement volontaire ≠ abondement**
Le versement volontaire du dirigeant sur le PEE provient de sa rémunération nette déjà taxée — il n'est pas lui-même exonéré. Seul l'abondement versé par la société bénéficie de l'exonération. Ne pas confondre les deux flux.

**3. Dividendes SARL et seuil 10% du capital**
Pour un gérant majoritaire de SARL, les dividendes excédant 10% du (capital + comptes courants + primes d'émission) sont soumis aux cotisations sociales TNS (art. L. 136-3 CSS, auquel renvoie l'art. L. 131-6 pour l'assiette des cotisations depuis la réforme de la LFSS 2024 ; vérifier la rédaction consolidée sur Légifrance). Mécanisme indépendant du PEE/PERECO, mais à intégrer dans l'optimisation globale — des dividendes élevés déjà soumis aux cotisations réduisent l'intérêt de certaines stratégies.

**4. EURL à l'IR : déductibilité indirecte**
Si l'EURL est soumise à l'IR (transparence fiscale), l'abondement réduit le bénéfice de la société qui remonte directement dans le revenu de l'associé unique. L'effet est réel mais mécanique moins lisible. Vérifier le régime IS/IR de l'EURL avant la mise en place.

**5. Entreprise sans salarié**
Aucun PEE, PERECO ni accord d'intéressement n'est possible pour un dirigeant seul (art. L. 3332-2 et L. 3312-3 C. trav.). Un plan mis en place malgré tout expose l'abondement à une requalification en rémunération (cotisations + IR). Embaucher uniquement pour ouvrir le plan n'a de sens que si l'emploi est réel et que le coût global (salaire, abondement versé au salarié) reste justifié.

**6. Formalisme obligatoire**
- Règlement du plan mis en place par accord ou, à défaut, par décision unilatérale de l'employeur, et ouvert à tous les salariés
- Dépôt sur la plateforme TéléAccords
- En l'absence de dépôt conforme, les exonérations peuvent être remises en cause

**7. SAS/SASU : régime différent**
Le président de SAS/SASU est assimilé salarié. Pas de cotisations TNS sur les dividendes (quel que soit le montant). L'arbitrage PEE vs PER vs dividendes est distinct — ne pas appliquer les règles TNS à une SASU.

### Références légales

- **Code du travail** : art. L. 3332-1 et s. (PEE), L. 3332-2 (bénéficiaires : chef d'entreprise et mandataires sociaux si au moins un salarié et moins de 250), L. 3332-10 (plafond des versements), L. 3312-3 (intéressement : dirigeant seul salarié exclu), L. 3314-1 et s. (intéressement), L. 3323-1 et s. (participation)
- **CMF** : art. L. 224-13 et s. (PERECO), L. 224-4 (cas de déblocage anticipé du PER)
- **Fiches officielles** : service-public F2142 (PEE, condition d'au moins un salarié en plus du dirigeant), F34982 (PER)
- **PPV** : loi n° 2022-1158 du 16 août 2022 ; loi n° 2023-1107 du 29 novembre 2023 ; service-public F35235
- **CGI** : art. 81-18° (exonération IR abondement), art. 83-1° quater (prévoyance collective), art. 154 bis (PER TNS / Madelin)
- **CSS** : art. L. 131-6 (cotisations des indépendants, renvoi à l'assiette de L. 136-3) et L. 136-3 (assiette : réintégration des cotisations facultatives 154 bis, dividendes SARL > 10%), D. 242-1 (limite d'exonération prévoyance et santé), L. 911-7 (mutuelle obligatoire), R. 242-1-6 (dispense d'adhésion)
- **BOFiP** : BOI-RSA-ES-10-10-20 (épargne salariale, abondement)

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
