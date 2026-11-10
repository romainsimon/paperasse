# Régime social des artistes-auteurs — affiliation, déclaration, cotisations, RAAP, droits

*Volet social et comptable du conseil à un artiste-auteur. Volet IR / BNC / régularisation fiscale : skill `fiscaliste` (`references/artistes-auteurs.md`). Autres fichiers : [champ](artistes-auteurs-champ.md) · [TVA](artistes-auteurs-tva.md) · [plateformes](artistes-auteurs-plateformes.md).*

*Valeurs 2026 (taux inchangés par rapport à 2025). Sources consultées le 03/10/2026, revérifiées le 06/11/2026 : CSS art. L. 382-1 s. et R. 382-1 s. (dont décret n° 2026-897 du 24/09/2026), urssaf.fr (espace artistes-auteurs), secu-artistes-auteurs.fr, IRCEC, Afdas, Ameli, service-public F23749. Données machine : [`data/artistes-auteurs-2026.json`](../data/artistes-auteurs-2026.json) (section `cotisations`). Pour le champ (qui relève du régime) : [artistes-auteurs-champ.md](artistes-auteurs-champ.md).*

## 1. Affiliation

- **Obligatoire dès le premier euro** de revenu artistique (CSS L. 382-1) — il n'y a pas de seuil d'affiliation ; les « 900 SMIC h » sont le seuil de la retraite complémentaire RAAP, pas de l'affiliation.
- **Interlocuteur** : l'URSSAF (service artistes-auteurs, Limousin) depuis le 1er avril 2026 pour l'affiliation (action sociale depuis le 1er juin 2026).
- **Revenus sans précompte** (plateformes, autoédition, diffuseur étranger) : déclaration de début d'activité sur le **guichet unique (INPI)** → SIRET + code APE (**90.03B « Autre création artistique »** couvre les écrivains indépendants) → l'URSSAF vérifie l'éligibilité et notifie l'affiliation. Cocher « Activités créatives, artistiques et de spectacle » + « Artiste/Auteur = Oui ».
- **Date de début antérieure** : possible ; « vous recevrez des appels de cotisations démarrant à la date que vous aurez indiquée » (tutoriel URSSAF). C'est la voie de régularisation pour des années non déclarées.
- **Diffuseur français qui précompte** : affiliation automatique à la première rémunération (régime TS) — sans objet pour une plateforme étrangère.

## 2. Précompte ou pas

| | Précompte | Sans précompte |
|---|---|---|
| Qui | éditeurs, OGC (SACEM, SACD…), producteurs **français** | plateformes (Patreon, Substack, Ko-fi, Tipeee), autoédition, marketplaces, diffuseur étranger, particuliers |
| Cotisations | retenues à la source par le diffuseur | **à déclarer et payer soi-même** |
| Régime IR | traitements et salaires (ou option BNC) | **BNC** |
| Pièce | certificat de précompte | dispense de précompte envoyée chaque décembre au titulaire d'un SIRET en BNC (la notification d'immatriculation en tient lieu la 1re année) |

**Une plateforme de paiement ne précompte rien et ne déclare rien à votre place.** Erreur fréquente : croire qu'elle « s'occupe des déclarations comme un éditeur ».

## 3. Déclarer et payer

- **Déclaration annuelle** sur artistes-auteurs.urssaf.fr (dématérialisation obligatoire depuis le 01/01/2026). Campagne 2026 (revenus 2025) : **27 avril → 19 juin 2026** ; échéanciers (définitif N-1 / provisionnel N) envoyés à partir du 22 juin. On saisit la rémunération **brute HT par nature de revenu**. Modifiable pendant l'année en cours et les trois suivantes.
- **Natures de revenu** pertinentes pour une plateforme : « Auto-édition, auto-diffusion » (vente de ses œuvres via plateformes/marketplaces) ou « Droits d'auteur hors OGC » (diffuseur étranger, particulier). Le financement participatif se déclare **net de la commission** de la plateforme ; pour l'autoédition, brut vs net n'est pas tranché par les sources — à demander à l'URSSAF ou au comptable.
- **Paiement** : cotisations **provisionnelles trimestrielles** (15 janvier, 15 avril, 15 juillet, 15 octobre) calculées sur l'assiette de N-2, régularisées en juin N+1. **Début d'activité** : forfait 600 SMIC h (7 212 € d'assiette) en attendant la 1re déclaration — ramené à **150 SMIC h pour les périodes postérieures au 01/01/2027** (R. 382-24, décret 2026-897). **Modulation** sur revenu estimé, 15 jours avant une échéance, au plus tard le 30 septembre.
- **Régime fiscal de l'assiette** : micro-BNC (recettes ≤ 83 600 € pour 2026-2028 ; 77 700 € pour 2023-2025 ; abattement 34 %) ou déclaration contrôlée (2035, frais réels). Dans les deux cas l'URSSAF majore le bénéfice de 15 % (L. 382-3).

## 4. Cotisations 2026

PASS 2026 : **48 060 €**. SMIC horaire au 1er janvier 2026 : **12,02 €** (12,31 € au 1er juin ; les seuils du régime se calculent sur celui du 1er janvier).

| Cotisation | Assiette | Taux | Pris en charge par l'État | **Taux dû** |
|---|---|---|---|---|
| Vieillesse déplafonnée | bénéfice + 15 % | 0,40 % | 0,40 pt | **0 %** |
| Vieillesse plafonnée (≤ PASS) | bénéfice + 15 % | 6,90 % | 0,75 pt | **6,15 %** (max 2 955,69 €) |
| CSG | bénéfice + 15 % | 9,20 % (6,80 déductible) | — | 9,20 % |
| CRDS | bénéfice + 15 % | 0,50 % | — | 0,50 % |
| Formation professionnelle (CFP) | bénéfice + 15 % | 0,35 % | — | 0,35 % |
| **Total dû** | | | | **16,20 % de l'assiette** |
| Contribution diffuseur (1 % + 0,10 %) | rémunération brute HT | 1,1 % | — | due par le diffuseur ; **non due** pour autoédition, financement participatif, accessoires, sociétés à l'étranger |

**Assiette en micro-BNC** = recettes × 0,66 × 1,15 = **recettes × 0,759** → cotisations ≈ **12,3 % des recettes brutes**.

**Exemples (micro-BNC, 2026)**

Ordres de grandeur arrondis (le détail ligne à ligne se calcule avec `scripts/calc_artiste_auteur.py`) :

| | 14 000 € de recettes | 19 000 € de recettes |
|---|---|---|
| Bénéfice (−34 %) | ≈ 9 200 € | ≈ 12 500 € |
| Assiette (+15 %) | ≈ 10 600 € | ≈ 14 400 € |
| Vieillesse plafonnée 6,15 % | ≈ 650 € | ≈ 900 € |
| CSG 9,20 % | ≈ 1 000 € | ≈ 1 300 € |
| CRDS + CFP (0,85 %) | ≈ 90 € | ≈ 120 € |
| **Total URSSAF** | **≈ 1 700 €** | **≈ 2 300 €** |
| RAAP (IRCEC, N+1) | assiette < seuil (10 692 € pour les revenus 2025) → 0 € | 8 % ≈ 1 150 € (ou 4 % sur option ≈ 575 €) |
| Droits ouverts | 4 trimestres + IJ (≥ 7 212 €) | 4 trimestres + IJ |

En déclaration contrôlée, le réel coûte plus cher socialement dès que les frais réels sont inférieurs à 34 % des recettes.

## 5. Retraite complémentaire RAAP (IRCEC)

Obligatoire si l'assiette ≥ **900 SMIC h** (10 692 € pour les revenus 2025 ; ≈ 10 818 € attendus pour 2026). Taux **8 %**, **option 4 %** possible avant le 30 novembre si l'assiette ≤ 32 076 € (IRCEC, « mon mémo » 2026 : « opter avant le 30 novembre pour un taux réduit à 4 % si votre assiette sociale ne dépasse pas 32 076 euros » — https://www.ircec.fr/wp-content/uploads/2026/02/mon-memo-ircec.pdf) ; plafond 3 PASS (144 180 €). L'assiette se déclare dans l'espace adhérent IRCEC au 2e trimestre de N+1, puis la cotisation est appelée (mémo IRCEC 2026). Cotisation volontaire possible sous le seuil. **Ne pas l'oublier dans un chiffrage** : c'est souvent la deuxième ligne la plus lourde.

## 6. Droits ouverts

| Droit | Condition 2026 |
|---|---|
| Soins, prestations familiales | dès le 1er euro |
| 1 trimestre de retraite de base | assiette ≥ 150 SMIC h = 1 803 € |
| 4 trimestres + IJ maladie/maternité/paternité, invalidité, capital décès | assiette ≥ 600 SMIC h = **7 212 €** (service-public affiche 7 386 €) |
| IJ maladie | 50 % du gain journalier (revenu annuel / 365, plafonné 1,4 SMIC), carence 3 jours, 6 mois d'affiliation ; maternité : gain intégral, sans carence |
| Surcotisation forfaitaire | si assiette < 600 SMIC h : option pour cotiser vieillesse sur 600 SMIC h (ouvre IJ + 4 trimestres) |
| Formation (Afdas) | recettes des 3 dernières années ≥ 600 SMIC h ; plafond 4 200 € HT/an ; 60 €/h métier, 40 €/h transversale |
| Non couvert | AT/MP (assurance volontaire possible), chômage |

## 7. Retard, omission, régularisation

- **Pas de déclaration dans le délai** → **évaluation d'office** (R. 382-28, version en vigueur depuis le 27/09/2026) : cotisations calculées à titre provisoire et forfaitaire sur la moyenne des revenus artistiques des deux années précédentes, assiette **majorée de 25 %** dès la première année et pour chaque année consécutive non déclarée (https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000037854516). On régularise en déclarant les revenus réels dans l'espace en ligne. *(Une « radiation après trois taxations d'office » circulait dans une première version de cette fiche : le R. 382-28 n'en contient pas et aucune source primaire n'a été trouvée — retirée.)*
- **Années jamais déclarées faute d'affiliation** → affiliation au guichet unique avec la **date réelle de début** ; les cotisations sont appelées depuis cette date. Le dépôt des déclarations des années passées se traite par la messagerie du compte (procédure non décrite publiquement).
- **Majorations de retard** (R. 243-16 s.) : **5 %** + **0,20 % par mois** ; « droit à l'erreur » si obligations déclaratives respectées, aucun retard dans les 24 mois, montant < PASS mensuel, paiement sous 30 jours ou délai accordé.
- **Remise gracieuse** des majorations : après paiement intégral ou plan d'apurement, demande motivée depuis la messagerie.
- **Échéancier** : demande motivée depuis l'espace en ligne. L'URSSAF indique en règle générale un échéancier de **12 mois maximum** (page « Demander un délai de paiement », https://www.urssaf.fr/accueil/aide-cas-difficultes/demander-un-delai-de-paiement.html) — page générique, non spécifique aux artistes-auteurs, et d'autres durées existent pour les indépendants : **à confirmer auprès de l'URSSAF** pour un artiste-auteur.
- **Prescription** (L. 244-3) : **3 ans** à compter de la fin de l'année civile au titre de laquelle les cotisations sont dues.

## 8. Incertitudes à signaler

0. Texte applicable : décret n° 2026-897 du 24/09/2026 (R. 382-1-2, R. 382-24, R. 382-28) ; recodification de la TVA reportée au 01/01/2027 (ordonnance n° 2026-671 du 27/07/2026).
1. Case de déclaration pour une plateforme d'abonnement (« auto-édition » vs « droits hors OGC ») et brut/net de commission.
2. Contenus « communauté » (accès à un canal, Q&R) : ni œuvre, ni accessoire listé — zone grise.
3. Deux valeurs de SMIC pour les seuils (12,02 vs 12,31 €) selon les sites.
4. Décret n° 2026-897 : pages URSSAF/secu-aa pas encore alignées (forfait 150 SMIC h en 2027).
5. « Tolérance fiscale » TS pour des revenus perçus de l'étranger, mentionnée par l'URSSAF (détails dans l'espace personnel) — plutôt défavorable en cotisations (assiette 100 % au lieu de 75,9 %).

## 9. Régulariser des revenus jamais déclarés — volet social et ordre des opérations

Cas typique : plateforme d'abonnement ou autoédition encaissée sans affiliation ni déclaration, par croyance que la plateforme « s'occupe de tout comme un éditeur ». Posture : régularisation **spontanée**, avant tout contrôle, jamais de dissimulation.

1. Reconstituer les encaissements **par année civile** (plateforme + banque) → tableau (voir [artistes-auteurs-plateformes.md](artistes-auteurs-plateformes.md) §5).
2. Faire trancher par un expert-comptable : qualification artiste-auteur, case de déclaration, brut/net, TVA ([artistes-auteurs-tva.md](artistes-auteurs-tva.md)).
3. **Affiliation** au guichet unique avec la **date réelle** de début (§1), puis **déclaration URSSAF** des années passées (§3, §7).
4. Volet fiscal (IR rectificatif, 1758 A, 1727 V, délai de paiement) : skill `fiscaliste`, `references/artistes-auteurs.md` §7.
5. Demandes d'échéancier (URSSAF §7, fisc) si besoin ; remise gracieuse des majorations après paiement.
6. Provisionner une fraction des encaissements courants (ordre de grandeur 25 à 30 % : cotisations ≈ 12 % des recettes, RAAP éventuel, IR).

Ne pas conseiller d'emprunter pour payer : les échéanciers existent.
