# Frais professionnels : notes de frais, IK, allocations forfaitaires

Remboursements de frais engagés par un salarié ou un dirigeant pour le compte de l'entreprise. Trois questions à se poser à chaque fois :

1. **Qui** a engagé la dépense ? (salarié, président de SAS, gérant TNS) → détermine le mode de remboursement possible
2. **Quoi** ? (repas, hôtel, train, km avec véhicule perso) → détermine le compte, la TVA récupérable, le plafond
3. **Quelle pièce** ? (facture au nom de l'entreprise, ticket, état de km) → conditionne la déduction IS, la TVA et l'exonération sociale

> Montants 2026 vérifiés le 2026-10-04. Revalorisés chaque année : **vérifier en ligne avant de citer** (urssaf.fr, boss.gouv.fr, bofip.impots.gouv.fr).

---

## Mode de remboursement selon le statut

| Statut | Frais réels (sur justificatifs) | Allocations forfaitaires URSSAF (repas, grand déplacement) | IK au barème |
|--------|------|------|------|
| Salarié | Oui | Oui, dans les limites ci-dessous | Oui |
| Président / DG de SAS-SASU, gérant minoritaire ou égalitaire de SARL (assimilés salariés) | Oui | **Non** | Oui (« à titre de simplification ») |
| Mandataire avec contrat de travail distinct (rémunération distincte, relevant de l'assurance chômage) | Oui | Oui, sur la part salariale | Oui |
| Gérant majoritaire de SARL/EURL (TNS) | Oui | **Non** | Pas de règle URSSAF détaillée trouvée : traiter au réel et vérifier |

Sources : BOSS Frais professionnels § 50, 90, 130, 140 ; arrêté du 4 septembre 2025 art. 1er al. 2 ; [urssaf.fr](https://www.urssaf.fr/accueil/employeur/beneficier-exonerations/frais-professionnels.html).

**Piège fréquent** : appliquer au président de SASU l'indemnité forfaitaire de repas (21,40 €) sans facture. Pour lui, seul le réel est exonéré : sans justificatif, le remboursement est une rémunération soumise à cotisations.

> L'arrêté de référence est désormais l'**arrêté du 4 septembre 2025** (JORF 06/09/2025), qui abroge l'arrêté du 20 décembre 2002 encore cité dans de nombreux contenus.

---

## Notes de frais (frais réels)

### Conditions de déduction

- Dépense engagée dans l'intérêt direct de l'entreprise, effective et justifiée, rattachée à l'exercice (art. 39-1 CGI, BOI-BIC-CHG-10)
- Justificatif : facture ou ticket, avec date, objet, participants pour un repas ou une réception
- Remboursement au centime de la dépense réelle (pas d'arrondi forfaitaire)

### Comptes

| Dépense | Compte |
|---------|--------|
| Train, avion, taxi, hôtel, péages, parking, IK | 6251 Voyages et déplacements |
| Frais de mission (repas en déplacement) | 6256 Missions |
| Repas d'affaires, réceptions de clients | 6257 Réceptions |
| Cadeaux à la clientèle | 6234 Cadeaux à la clientèle |

Contrepartie : **421** (salarié, remboursé avec ou hors paie) ou **455** (dirigeant associé, cohérent avec le compte courant). Garder la même convention sur tout l'exercice.

### Écriture type

```
Note de frais du président (repas client 55,00 TTC dont TVA 10 % 5,00) :
  Débit 6257 Réceptions                  50,00
  Débit 44566 TVA déductible sur ABS      5,00
  Crédit 455 Compte courant associé      55,00

Remboursement :
  Débit 455 Compte courant associé       55,00
  Crédit 512 Banque                      55,00
```

---

## TVA récupérable sur les frais

| Dépense | TVA déductible ? | Référence |
|---------|------------------|-----------|
| Hôtel, logement des dirigeants et salariés | **Non** (sauf fraction au profit de tiers, identifiés sur la facture) | Art. 206 IV-2-2° annexe II CGI ; BOI-TVA-DED-30-30-10 |
| Transport de personnes (train, avion, taxi, VTC) | **Non** | Art. 206 IV-2-5° annexe II CGI ; BOI-TVA-DED-30-30-30 |
| Restaurant | Oui, si conditions générales réunies (intérêt de l'exploitation, facture au nom de l'entreprise) | Art. 271 CGI ; BOI-TVA-DECLA-30-20-20-20 § 130-150 |
| Péages, parkings | Oui, le reçu vaut facture si l'usager complète son identité (et, pour le péage, immatriculation et objet du déplacement) ; facture complète pour un abonnement / badge | BOI-TVA-DECLA-30-20-20-20 § 80-120 |
| Cadeaux | Non, sauf ≤ 73 € TTC par bénéficiaire et par an | Art. 206 IV-2-3° annexe II ; art. 28-00 A annexe IV |
| IK | **Non** : pas de facture, pas de TVA | |

**Facture de restaurant ≤ 150 € HT** : facture simplifiée possible (art. 242 nonies A II annexe II CGI), et il est admis que le client inscrive lui-même nom et adresse sur la note (BOI-TVA-DECLA-30-20-20-20 § 130-150). Au-delà de 150 € HT, facture complète obligatoire. Un ticket de carte bancaire n'est pas une facture.

### Carburant (art. 298, 4-1° a et c CGI, version en vigueur depuis le 01/01/2022 ; abrogé au 01/01/2027 par l'ord. n° 2025-1247, repris à droit constant dans le CIBS)

Déduction uniquement pour les déplacements professionnels. Le BOI-TVA-DED-30-30-40 (version du 24/02/2021) est antérieur à l'ordonnance n° 2021-1843 : son passage sur le GPL et le GNV (droit commun) n'est plus à jour.

| Carburant | Véhicule de tourisme (exclu) | Véhicule utilitaire (non exclu) |
|-----------|---------------------|---------------------|
| Gazole, essence, superéthanol E85 | 80 % | 100 % |
| GPL, GNV | 50 % | 100 % |
| Électricité (véhicule 100 % électrique) | 100 % (art. 273 septies B CGI) | 100 % |

« Véhicule de tourisme » = véhicule exclu du droit à déduction (conçu pour transporter des personnes ou à usage mixte, y compris pick-up N1 double cabine), y compris pris en location quand la TVA sur le loyer n'est pas déductible. « Utilitaire » = véhicule non exclu (utilitaires, taxis de transport public, auto-écoles, loueurs).

---

## Indemnités kilométriques (IK)

Véhicule **personnel** du salarié ou du dirigeant (propriétaire, conjoint, foyer fiscal, ou location à son nom) utilisé pour un déplacement professionnel. Un véhicule de l'entreprise ne donne jamais lieu à IK.

### Le barème s'applique au kilométrage annuel

Le barème fiscal (CGI annexe IV art. 6 B, BOI-BAREME-000001) donne **une formule par tranche de kilométrage annuel, appliquée au total des km de l'année** (pas par tranches marginales comme l'IR). L'URSSAF l'applique au total des km professionnels de l'année (exemple officiel : 5 800 km en 5 CV → 5 800 × 0,357 + 1 395 = 3 465,60 €).

Conséquence pratique : payer chaque trajet au taux de la première tranche (0,636 €/km en 5 CV) surpaie dès que l'année dépasse 5 000 km. Sur 5 800 km, cela fait 3 688,80 € versés pour un plafond de 3 465,60 € : les **223,20 € d'excédent** sont soumis à cotisations, sauf justification de l'utilisation effective (BOSS § 400), et doivent être régularisés.

**Toujours calculer avec le script, sur le cumul annuel :**

```bash
node scripts/calc.js ik --km 5800 --cv 5                         # IK annuelle
node scripts/calc.js ik --km 5800 --cv 5 --deja-verse 3688.80    # régularisation
node scripts/calc.js ik --km 3000 --cv 4 --electrique            # majoration +20 %
node scripts/calc.js ik --km 2000 --vehicule moto --cv 3         # deux-roues
```

Barème versionné dans `data/bareme-kilometrique.json` (tranches, source, date de vérification).

### Barème (revenus 2025, en vigueur au 2026-10-04)

**Automobiles** (d = km professionnels annuels)

| Puissance | ≤ 5 000 km | 5 001 à 20 000 km | > 20 000 km |
|-----------|-----------|-------------------|-------------|
| 3 CV et moins | d × 0,529 | d × 0,316 + 1 065 | d × 0,370 |
| 4 CV | d × 0,606 | d × 0,340 + 1 330 | d × 0,407 |
| 5 CV | d × 0,636 | d × 0,357 + 1 395 | d × 0,427 |
| 6 CV | d × 0,665 | d × 0,374 + 1 457 | d × 0,447 |
| 7 CV et plus | d × 0,697 | d × 0,394 + 1 515 | d × 0,470 |

Deux-roues et cyclomoteurs : voir `data/bareme-kilometrique.json`. **Véhicule 100 % électrique : +20 %.**

### Ce que couvre l'IK

- **Inclus** : dépréciation, entretien, réparations, pneus, carburant (ou recharge), assurance, loyer d'un véhicule loué
- **En plus, sur justificatif** : stationnement (BOSS § 410) et péages (hors barème : BOI-BAREME-000001 § 7)

### Justificatifs exigés (URSSAF, BOSS § 390)

État des déplacements (date, trajet, km, motif), carte grise au nom du bénéficiaire ou de son foyer, puissance fiscale. Sans ces pièces, les IK sont réintégrées dans l'assiette des cotisations.

### Écriture

```
IK du mois (président, 420 km, régularisation annuelle à prévoir) :
  Débit 6251 Voyages et déplacements    XXX,XX
  Crédit 455 Compte courant associé     XXX,XX
```

Pas de TVA déductible. Au-delà du barème, l'excédent est de la rémunération soumise à cotisations, sauf justification de l'utilisation effective (BOSS § 400). Pour la voiture d'un dirigeant ou d'un salarié, la part de l'indemnité qui couvre l'amortissement au-delà du plafond de l'art. 39-4 n'est pas déductible de l'IS (BOI-BIC-AMT-20-40-50 § 190).

---

## Allocations forfaitaires URSSAF 2026 (salariés uniquement)

Limites d'exonération au 1er janvier 2026 (arrêté du 4 septembre 2025 ; [urssaf.fr](https://www.urssaf.fr/accueil/outils-documentation/taux-baremes/frais-professionnels.html)). Au-delà, l'excédent est soumis à cotisations.

| Situation | Limite 2026 |
|-----------|-------------|
| Repas sur le lieu de travail (travail posté, de nuit, en équipe...) | 7,50 € |
| Repas hors des locaux, sans être contraint d'aller au restaurant | 10,40 € |
| Repas au restaurant, déplacement contraint | 21,40 € |

**Grand déplacement (métropole)**

| Période | Repas | Logement + petit-déjeuner Paris, 92, 93, 94 | Logement + petit-déjeuner autres départements |
|---------|-------|------|------|
| 3 premiers mois | 21,40 € | 76,60 € | 56,80 € |
| 4e au 24e mois | 18,20 € | 65,10 € | 48,30 € |
| 25e au 60e mois (*) | 15,00 € | 53,60 € | 39,80 € |

(*) L'arrêté du 4 septembre 2025 (art. 5 II) arrête la déduction au 60e mois ; le BOSS (§ 1300) et la page URSSAF indiquent encore 72 mois. Vérifier avant de l'appliquer au-delà de 60 mois.

---

## Côté IS et contrôle fiscal

- **Dépenses somptuaires** (art. 39-4 CGI) : chasse, pêche, résidences de plaisance, yachts ; amortissement des véhicules de tourisme au-delà des plafonds (BOI-BIC-AMT-20-40-50). Non déductibles quelle que soit la forme de prise en charge (directe, forfait, note de frais).
- **Relevé des frais généraux 2067-SD** (art. 54 quater CGI, art. 4 J annexe IV), à joindre à la déclaration de résultat si l'un des seuils est dépassé :

| Catégorie | Seuil |
|-----------|-------|
| Rémunérations des 10 personnes les mieux payées (effectif > 200) / des 5 (effectif ≤ 200) | 540 000 € / 270 000 € |
| Rémunération d'une de ces personnes prise individuellement | 50 000 € |
| Frais de voyage et de déplacement de ces personnes | 15 000 € |
| Véhicules et biens hors locaux, immeubles non affectés | 30 000 € |
| Cadeaux de toute nature (hors objets conçus spécialement pour la publicité ≤ 73 € TTC) | 3 000 € |
| Frais de réception (restaurants, spectacles) | 6 100 € |

## Erreurs courantes à signaler

| Erreur | Conséquence |
|--------|-------------|
| Forfait repas versé au président de SAS | Rémunération déguisée : cotisations + réintégration |
| IK sur un véhicule appartenant à la société | Double déduction : réintégration |
| IK calculées trajet par trajet sans régularisation annuelle | Excédent soumis à cotisations |
| TVA récupérée sur hôtel, train ou avion | TVA à reverser + pénalités |
| TVA récupérée sur un ticket CB ou une note sans nom | TVA non déductible (pas de facture) |
| Pas d'état de km ni de carte grise | IK réintégrées dans l'assiette sociale |

## Sources

- BOSS, Frais professionnels : https://boss.gouv.fr/portail/accueil/avantages-en-nature-et-frais-pro/frais-professionnels.html
- URSSAF, frais professionnels : https://www.urssaf.fr/accueil/employeur/beneficier-exonerations/frais-professionnels.html
- URSSAF, limites 2026 : https://www.urssaf.fr/accueil/outils-documentation/taux-baremes/frais-professionnels.html
- BOI-BAREME-000001 (barème kilométrique) : https://bofip.impots.gouv.fr/bofip/2185-PGP.html
- impots.gouv.fr, aide frais réels revenus 2025 : https://simulateur-ir-ifi.impots.gouv.fr/calcul_impot/2026/aides/frais.htm
- BOI-BIC-CHG-40-60-10 (relevé 2067) : https://bofip.impots.gouv.fr/bofip/992-PGP.html
- Art. 298 CGI (carburants) : https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000037993389
- Arrêté du 4 septembre 2025 (JORF 06/09/2025, NOR TSSS2523915A)
