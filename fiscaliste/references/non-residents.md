# Départ de France et non-résidents fiscaux

Ce fichier couvre le passage de résident à non-résident : l'année du départ, puis l'imposition en France des revenus de source française (principalement immobiliers). Il ne décrit **aucune convention fiscale particulière** ni aucun régime fiscal étranger. Pour une situation réelle, la convention conclue entre la France et l'État de résidence doit être lue en premier : elle prime sur le droit interne décrit ici.

Revenus de référence : revenus 2025 (déclaration 2026), sauf mention contraire.

## 1. Domicile fiscal et primauté des conventions

Un contribuable est domicilié fiscalement en France s'il remplit **un seul** des critères de l'article 4 B CGI :
- foyer ou lieu de séjour principal en France ;
- activité professionnelle principale exercée en France (sauf activité accessoire) ;
- centre de ses intérêts économiques en France.

La nationalité n'est pas un critère. Les personnes domiciliées en France sont imposables sur l'ensemble de leurs revenus ; les autres le sont sur leurs seuls revenus de source française (art. 4 A CGI).

**Conventions** : les règles de droit interne applicables aux non-résidents ne s'appliquent que sous réserve des conventions fiscales internationales (brochure pratique IR 2026, p. 64). Une personne qui serait résidente des deux États au sens de leur droit interne est départagée par les critères de la convention (foyer permanent, centre des intérêts vitaux, etc.). Pour les revenus immobiliers, le principe du modèle de convention de l'OCDE (art. 6) attribue le droit d'imposer à l'État où l'immeuble est situé ; chaque convention peut s'en écarter et doit être vérifiée.

## 2. L'année du départ

### Une imposition, deux déclarations

L'année du départ donne lieu à **une seule imposition** dont la base additionne deux périodes (BOI-IR-DOMIC-20, § 100 à 130 ; art. 167 CGI) :
- **du 1er janvier à la date du départ** : l'ensemble des revenus, de source française et étrangère, comme pour un résident (y compris les revenus acquis avant le départ dont le contribuable n'a pas encore eu la disposition, § 90) ;
- **de la date du départ au 31 décembre** : les seuls revenus de source française imposables en France.

L'année suivant le départ, le contribuable dépose (brochure pratique IR 2026, p. 66 ; BOI-IR-DOMIC-20, § 170 ; notice du formulaire 2042-NR) :
- une déclaration **2042** (et annexes 2042-C, 2042-C-PRO, 2047 le cas échéant) pour les revenus perçus **avant** le départ ;
- une déclaration **2042-NR** (« Départ à l'étranger ou retour en France ») pour les revenus de source française perçus **après** le départ. La date de départ est indiquée en tête de la 2042-NR.

Pas de déclaration provisoire au moment du départ (brochure p. 66). Ces deux déclarations sont déposées auprès du **dernier service des impôts des particuliers** du contribuable, qui reste gestionnaire du dossier jusqu'au traitement de la déclaration de l'année du départ. Ensuite, si des revenus de source française imposables en France subsistent, le **service des impôts des particuliers non-résidents (SIPNR)** devient le service gestionnaire (impots.gouv.fr, fiche « Comment déclarer les revenus relatifs à l'année de mon départ à l'étranger ? »).

Démarches signalées par impots.gouv.fr au moment du départ : déclarer la nouvelle adresse au dernier centre des finances publiques depuis l'espace particulier, informer l'employeur et les caisses de retraite. Les taxes foncières restent gérées par le service du lieu de situation de l'immeuble ; l'IFI éventuel relève du SIPNR.

**SIPNR** : 10, rue du Centre – TSA 10010 – 93465 Noisy-le-Grand Cedex ; contact par la messagerie sécurisée de l'espace particulier (brochure p. 66).

### Revenus fonciers de l'année du départ

Au régime réel, une seule déclaration **2044** est établie pour l'année entière ; son résultat est ventilé **au prorata** entre la période antérieure (report sur la 2042) et la période postérieure au départ (report lignes 4BA, 4BB, 4BC, 4BD de la 2042-NR). Au micro-foncier, les recettes de la période postérieure sont portées case 4BE de la 2042-NR (formulaire 2042-NR, revenus 2025, rubrique 4).

### Logement conservé en France

Pour la période postérieure au départ, un contribuable qui conserve une habitation en France peut relever de l'article 164 C CGI (base forfaitaire égale à trois fois la valeur locative, retenue si elle excède les revenus de source française). Ce forfait n'est pas applicable aux résidents d'un État ayant conclu une convention fiscale avec la France (BOI-IR-DOMIC-20, II-B).

### Prélèvement à la source

- Les salaires et pensions de source française versés à un non-résident relèvent de la **retenue à la source spécifique** de l'article 182 A CGI, hors du champ du PAS (brochure p. 65).
- Les revenus fonciers et les revenus des indépendants de source française restent soumis aux **acomptes contemporains** du PAS, selon les mêmes modalités que pour les résidents (fiche DINR « Les particularités de la fiscalité des non-résidents », 03/2026 ; brochure p. 65, renvoi au 2° de l'art. 204 A CGI).
- Le taux de prélèvement est calculé à partir de l'impôt établi, le cas échéant, selon l'article 197 A (art. 204 H, I-1 CGI) : le taux minimum des non-résidents (§ 3) se répercute donc sur le taux du PAS une fois la situation de non-résident prise en compte.

## 3. Calcul de l'impôt d'un non-résident

### Revenus imposables en France

Revenus d'immeubles situés en France, revenus d'activités exercées en France, plus-values immobilières sur des biens situés en France, pensions versées par un débiteur établi en France, etc. (art. 164 B CGI ; liste dans la brochure p. 64), toujours sous réserve de la convention applicable.

### Taux minimum (art. 197 A CGI)

L'impôt est calculé selon le barème progressif et le quotient familial (art. 197 A renvoie aux 1 et 2 du I de l'art. 197), mais il ne peut être inférieur à :
- **20 %** de la fraction du revenu net imposable jusqu'à la limite supérieure de la 2e tranche du barème, soit **29 579 €** pour les revenus 2025 (fiche DINR 03/2026 ; limite de tranche identique dans `data/bareme-ir-2025.json`) ;
- **30 %** au-delà.
- Taux ramenés à 14,4 % et 20 % pour les revenus de source DOM.

Réserve : la brochure pratique IR 2026 (p. 65) imprime 29 574 € ; le texte de l'article renvoie à la limite de la 2e tranche du barème, fixée à 29 579 € pour les revenus 2025.

L'article 197 A ne renvoie pas au 4 du I de l'article 197 (décote). Les impositions résultant du taux minimum ne sont pas mises en recouvrement si leur montant est inférieur à 305 € (brochure p. 65).

### Option pour le taux moyen

Si le contribuable justifie que le taux moyen résultant de l'application du barème à son **revenu mondial** (revenus de sources française et étrangère de tout le foyer) est inférieur au taux minimum, ce taux moyen s'applique à ses seuls revenus de source française (art. 197 A CGI ; brochure p. 65).
- Revenu mondial porté **case 8TM** de la 2042, avec le formulaire **2041-TM** et les justificatifs (avis d'imposition et déclaration de l'État de résidence). Pour un résident de l'UE ou d'un État lié par une convention d'assistance, une déclaration sur l'honneur suffit dans l'attente des pièces ; la 2041-TM en tient lieu.
- En ligne : case « Bénéficier du taux moyen d'imposition (s'il est plus favorable) » à l'étape 3, puis saisie du revenu mondial en fin de parcours (fiche DINR 03/2026). Le taux moyen n'est retenu que s'il est plus favorable.

### Charges, réductions et crédits d'impôt

**Principe** : aucune charge déductible du revenu global ne peut être déduite des revenus d'un non-résident (art. 164 A CGI), et les non-résidents ne peuvent pas prétendre aux réductions et crédits d'impôt (brochure p. 65).

Exceptions listées par la brochure (p. 65) :
- crédit d'impôt pour travaux de prévention des risques technologiques dans les logements donnés en location ;
- réductions et crédits d'impôt en faveur des entreprises (hors crédit pour remplacement pour congé des agriculteurs et réduction mécénat) ;
- réduction **Loc'Avantages** ;
- réduction **Pinel** ou **Denormandie** pour les investissements réalisés **à compter du 1er janvier 2019**, si le contribuable était domicilié en France à la date de l'investissement (voir § 4).

Conséquences directes du principe :
- **Versements PER** (art. 163 quatervicies) : déduction du revenu global, donc non admise pour les versements effectués pendant la période de non-résidence. La rubrique 6 de la 2042-NR ne comporte que la CSG déductible (6DE), pas de case de versements d'épargne retraite.
- **Emploi à domicile, frais de garde, dons** : non admis pendant la période de non-résidence.

Réserve : pour les charges payées et dépenses engagées **avant** le départ, l'année du départ, la doctrine consultée (BOI-IR-DOMIC-20) ne contient pas de règle explicite ; la 2042 de la période de résidence comporte les rubriques habituelles. Vérifier au cas par cas.

### Non-résidents « Schumacker »

Un non-résident qui tire de France l'essentiel de ses revenus imposables est assimilé à un résident pour le calcul de l'impôt (BOI-IR-DOMIC-40) :
- conditions (§ 30) : être domicilié dans un autre État de l'Union européenne, ou dans un État de l'EEE lié à la France par une convention comportant une clause d'assistance administrative ; revenus de source française **≥ 75 %** du revenu mondial imposable ; ne pas bénéficier, dans l'État de résidence, de mécanismes suffisants de minoration de l'impôt. À défaut des 75 %, ≥ 50 % s'il prouve ne bénéficier d'aucun mécanisme de minoration de son imposition dans son État de résidence (§ 70) ;
- effets : charges déductibles, réductions et crédits d'impôt admis comme pour un résident (§ 90) ; taux minimum de l'article 197 A non applicable (§ 110).

## 4. Investissement Pinel / Duflot / Denormandie et départ

Le transfert du domicile fiscal hors de France **n'entraîne pas la remise en cause** de la réduction d'impôt (BOI-IR-RICI-360-40, version du 10/05/2019) :

| Investissement réalisé | Pendant la non-résidence | Source |
|---|---|---|
| Jusqu'au 31/12/2018 | Avantage obtenu jusqu'au transfert conservé ; la réduction **ne peut pas être imputée** au titre des années de non-résidence et les fractions correspondantes sont perdues (pas de report, pas d'allongement de la période). Retour en France pendant l'engagement : imputation reprise sur les années restant à courir. Prorogation Pinel subordonnée à la domiciliation en France l'année de la prorogation. | § 60, § 65 |
| À compter du 01/01/2019 (contribuable domicilié en France lors de l'investissement) | Imputation **maintenue** sur les années restant à courir, sur l'impôt calculé selon l'art. 197 A ; **aucun remboursement** de l'excédent. Prorogation Pinel possible malgré le transfert. | § 90 ; BOI-IR-RICI-360-60 (version du 22/08/2024), remarque sous le § 270 |

## 5. Revenus fonciers d'un non-résident

- **Détermination** : mêmes règles que pour un résident (art. 164 A CGI) : micro-foncier si recettes brutes ≤ 15 000 €, sinon réel avec déclaration 2044 (fiche impots.gouv « Je suis non-résident. Je loue un bien non meublé… »).
- **Déficit foncier** : la 2042-NR comporte les lignes 4BB (déficit imputable sur les revenus fonciers), 4BC (déficit imputable sur le revenu global) et 4BD (déficits antérieurs). Le revenu global d'un non-résident ne comprend que ses revenus imposables en France : l'imputation porte sur ces seuls revenus. Réserve : aucune doctrine spécifique aux non-résidents n'a été trouvée sur ce point au-delà du formulaire.
- **Impôt** : barème avec taux minimum 20 % / 30 % ou taux moyen sur option (§ 3).

### Prélèvements sociaux

| Situation | Prélèvements sur revenus fonciers (location nue) | Source |
|---|---|---|
| Résident, ou non-résident à la charge d'un régime obligatoire français | **17,2 %** (CSG 9,2 % + CRDS 0,5 % + prélèvement de solidarité 7,5 %) | impots.gouv.fr, fiche « Je donne un bien en location… » (modifiée le 17/07/2026) |
| Non-résident affilié à un régime obligatoire de sécurité sociale d'un État de l'EEE, de la Suisse ou du Royaume-Uni, et non à la charge d'un régime français | **7,5 %** (prélèvement de solidarité seul ; exonération de CSG et CRDS) | art. L. 136-6, I bis et I ter CSS ; art. 235 ter CGI ; fiche impots.gouv « Je suis non-résident, suis-je redevable des prélèvements sociaux » |
| Non-résident affilié à un régime d'un autre État | 17,2 % | art. L. 136-6, I bis CSS |

- Les non-résidents sont redevables de la CSG sur les revenus d'immeubles situés en France (art. L. 136-6, I bis CSS, par renvoi au a du I de l'art. 164 B CGI). L'exonération du I ter vise les personnes relevant, au sens du règlement (CE) n° 883/2004, d'une législation de sécurité sociale coordonnée et non à la charge d'un régime français. Le prélèvement de solidarité de 7,5 % est dû sans application du I ter (art. 235 ter, II CGI).
- **L'exonération n'est pas automatique** : cocher **8SH** (déclarant 1) et/ou **8SI** (déclarant 2) sur la 2042-C ; l'affiliation doit être effective au 31 décembre de l'année. Sinon, réclamation avec justificatifs d'affiliation.
- Location meublée : 18,6 % (CSG 10,6 %) pour un redevable de droit commun ; un non-résident affilié dans l'UE ou en Suisse reste redevable des 7,5 % (FAQ DINR « Régime des locations meublées », 03/2026).

## 6. Vente de l'ancienne résidence principale après le départ

Après le départ, la cession relève du régime des plus-values immobilières des non-résidents (art. 244 bis A CGI) : prélèvement au taux de **19 %** pour les personnes physiques (BOI-RFPI-PVINR-20-20, § 50), plus prélèvements sociaux (art. L. 136-7, I bis CSS ; **7,5 %** seulement pour une personne relevant d'une législation de sécurité sociale coordonnée de l'UE/EEE/Suisse ou du Royaume-Uni et non à la charge d'un régime français, BOI-RFPI-PVINR-20-20, § 80).

Deux exonérations possibles, **non cumulables** (BOI-RFPI-PVINR-10-20, version du 19/04/2019, § 297 et § 470) :

**a) Ancienne résidence principale (art. 244 bis A, I-1 CGI ; cessions depuis le 01/01/2019)** — exonération totale si (§ 440 à 530) :
- le logement était la **résidence principale du cédant au jour du transfert** du domicile hors de France (un bien loué, occupé gratuitement ou vacant à cette date est exclu, § 500-510) ;
- le cédant a transféré son domicile dans un **État de l'UE** ou dans un État ayant conclu avec la France une convention d'assistance administrative et une convention d'assistance au recouvrement, non qualifié d'État ou territoire non coopératif (§ 460) ;
- la cession intervient **au plus tard le 31 décembre de l'année suivant celle du transfert** (§ 530) ;
- le logement n'a **pas été mis à la disposition de tiers**, à titre gratuit ou onéreux, entre le transfert et la cession (§ 520) ;
- le cédant n'a jamais bénéficié de l'exonération du 2° du II de l'article 150 U (§ 470).

**b) Exonération de 150 000 € (art. 150 U, II, 2° CGI)** — à défaut :
- cédant ressortissant d'un État de l'UE ou de l'EEE (ayant conclu une convention d'assistance administrative), domicilié fiscalement en France de manière continue pendant au moins deux ans à un moment quelconque avant la cession (§ 260, § 290) ;
- cession au plus tard le 31 décembre de la dixième année suivant le transfert (pas de condition de libre disposition) ; au-delà, libre disposition du bien depuis le 1er janvier de l'année précédant la cession (§ 350 à 370) ;
- exonération limitée à **150 000 €** de plus-value nette imposable par cédant, une seule résidence (§ 380 à 430).

Exemple : départ en juillet N, vente en septembre N+1 (14 mois après) sans location ni prêt du logement → condition de délai du a) remplie (31/12/N+1). Vente en mars N+2 → a) exclu ; seul le b) peut s'appliquer.

## 7. Exit tax (art. 167 bis CGI)

Version en vigueur depuis le 01/01/2024 (modifiée par la loi n° 2023-1322 du 29/12/2023) ; régime issu de la LF 2019 pour les transferts depuis le 01/01/2019.

- **Personnes visées** : contribuables fiscalement domiciliés en France pendant au moins **6 des 10 années** précédant le transfert (art. 167 bis, I-1).
- **Seuils** : plus-values latentes sur titres et droits détenus directement ou indirectement par le foyer fiscal lorsque ces participations représentent au moins **50 % des bénéfices sociaux** d'une société, **ou** que leur valeur globale excède **800 000 €** à la date du transfert ; s'y ajoutent les créances de complément de prix et les plus-values en report (I et II).
- **Date du transfert** : le jour précédant celui à compter duquel le contribuable cesse d'être soumis en France à une obligation fiscale sur l'ensemble de ses revenus (III).
- **Sursis de paiement** : **automatique** en cas de transfert dans un État de l'UE ou un État ayant conclu avec la France une convention d'assistance administrative et une convention d'assistance au recouvrement, non ETNC (IV) ; **sur option** pour les autres États, avec désignation d'un représentant fiscal et constitution de garanties (V).
- **Dégrèvement** : l'impôt en sursis est dégrevé si les titres sont toujours détenus à l'expiration d'un délai de **2 ans** après le transfert, ou **5 ans** si la valeur globale des titres excède **2 570 000 €** (art. 167 bis ; fiche impots.gouv « Je quitte la France, suis-je concerné par l'Exit Tax ? », modifiée le 10/03/2026). Retour en France, donation ou décès : dégrèvement également possible selon les conditions de l'article.
- **Formulaires** : **2074-ETD** au titre de l'année du transfert, déposée l'année suivante avec la déclaration de revenus ; **2074-ETS3** les années suivantes en cas de sursis (transferts depuis le 01/01/2014), ou version allégée **2074-ETSL** si sursis total et aucun événement dans l'année (pour les transferts depuis 2019, vérifier la dispense prévue par la notice de l'année).

Réserve : la doctrine BOFiP (BOI-RPPM-PVBMI-50-10) n'a pas été refondue depuis 2012-2013 et mentionne encore les anciens seuils et délais ; se fier au texte légal et aux formulaires de l'année.

## 8. Ce que le skill ne fait pas

- Pas d'analyse d'une convention fiscale bilatérale particulière ni du droit fiscal de l'État d'accueil.
- Pas de calcul de l'impôt de l'année du départ ni de l'impôt au taux minimum avec `scripts/calc_ir.py` (il ne traite pas les non-résidents) : décrire la mécanique et renvoyer au calcul de l'administration.
- Dirigeants, titulaires de stock-options ou d'actions gratuites, détenteurs de participations proches des seuils de l'exit tax, situations de double résidence : orienter vers un avocat fiscaliste spécialisé en fiscalité internationale.

## Sources

- CGI : art. 4 A, 4 B, 164 A, 164 B, 164 C, 167, 167 bis, 182 A, 197 A, 204 H, 235 ter, 244 bis A, 150 U (Légifrance)
- CSS : art. L. 136-6 (I bis, I ter), L. 136-7 (I bis)
- BOFiP : BOI-IR-DOMIC-20 (20140625), BOI-IR-DOMIC-40 (20170406), BOI-IR-RICI-360-40 (20190510), BOI-IR-RICI-360-60 (20240822), BOI-RFPI-PVINR-10-20 (20190419), BOI-RFPI-PVINR-20-20 (20220629), BOI-RPPM-PVBMI-50-10
- Brochure pratique IR 2026 (revenus 2025), p. 64 à 66
- Formulaire 2042-NR n° 11942*24 (revenus 2025)
- DINR, fiche « Les particularités de la fiscalité des non-résidents » (03/2026)
- impots.gouv.fr, rubrique International > Particulier
