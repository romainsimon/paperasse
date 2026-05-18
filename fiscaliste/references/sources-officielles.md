# Sources officielles (droit fiscal belge)

<!-- last_updated: 2026-05-15 -->

Registre des URL, articles CIR 92 et doctrine administrative à citer dans les réponses. L'objectif : qu'un utilisateur puisse vérifier **chaque règle** invoquée par le skill.

## Règle de traçabilité

Pour chaque règle appliquée dans une réponse, citer :
1. **L'article du CIR 92** (source de droit positif)
2. **La doctrine administrative** applicable (circulaires SPF Finances, disponibles sur Fisconetplus.be)
3. **La page finances.belgium.be** correspondante si elle existe (vulgarisation officielle)

Si une règle ne peut pas être sourcée, **le dire explicitement** et inviter à vérifier sur finances.belgium.be ou Fisconetplus.be.

---

## Sites officiels

| Site | URL | Contenu |
|------|-----|---------|
| **SPF Finances** | https://finances.belgium.be | Portail central : déclaration, paiement, information fiscale |
| **Tax-on-web** | https://www.taxonweb.be | Déclaration IPP en ligne (particuliers et mandataires) |
| **MyMinfin** | https://www.myminfin.be | Espace personnel : fiches fiscales, simulation, historique AER |
| **Fisconetplus.be** | https://www.fisconetplus.be | Texte officiel du CIR 92, AR/CIR 92, circulaires administratives |
| **Moniteur belge** | https://www.ejustice.just.fgov.be | Textes légaux officiels (lois, AR) |
| **Service des Décisions Anticipées (SDA)** | https://www.ruling.be | Rulings fiscaux préventifs |
| **BNB (Banque Nationale de Belgique)** | https://www.nbb.be | Déclaration des comptes étrangers (art. 307 §1, al. 4 CIR 92) |
| **FSMA** | https://www.fsma.be | Régulation des produits d'épargne et d'investissement |
| **CNC/CBN** | https://www.cnc-cbn.be | Commission des Normes Comptables (normes comptables belges) |

---

## Simulateurs officiels

| Simulateur | URL | Usage |
|-----------|-----|-------|
| **Simulateur IPP MyMinfin** | https://www.myminfin.be | Simulation revenus 2025 (exercice 2026) |
| **Simulateur Tax-on-web** | https://www.taxonweb.be | Simulation intégrée dans la déclaration |
| **Calcul revenu cadastral** | https://finances.belgium.be/fr/particuliers/habitation/revenu-cadastral | RC et coefficient d'indexation |

**Note** : le simulateur IPP MyMinfin est l'outil de référence pour les calculs IPP. Pour les évaluations automatisées du skill, il peut servir d'**oracle manuel** (lancer la simulation, comparer avec les calculs du skill).

---

## Articles CIR 92 essentiels

### IPP — mécanisme général

| Règle | Article CIR 92 |
|-------|---------------|
| Résidence fiscale belge | art. 2 §1, 1° |
| Mondialité de l'imposition | art. 5 |
| Barème progressif IPP | art. 130 |
| Quotité exemptée de base | art. 131 |
| Suppléments enfants à charge | art. 132 |
| Garde alternée — répartition quotités | art. 132bis |
| Crédit d'impôt quotités excédentaires | art. 134 §2 |
| Quotient conjugal | art. 87 |
| Imposition commune (époux/cohabitants légaux) | art. 126 |
| Revenus exceptionnels — quotient | art. 171 |
| Frais professionnels forfaitaires | art. 51 |

### Précompte professionnel et acomptes

| Règle | Article CIR 92 |
|-------|---------------|
| Obligation de retenue PP | art. 270 |
| Revenus soumis au PP | art. 270 à 272 |
| Barèmes PP (renvoi AR/CIR) | art. 87 AR/CIR 92 |
| Bonus à l'emploi fiscal | art. 289ter |
| Dispense PP heures supplémentaires | art. 275¹ |
| Dispense PP R&D / jeunes entreprises | art. 275³ et 275⁴ |
| Acomptes provisionnels | art. 157 à 168 |

### Revenus immobiliers

| Règle | Article CIR 92 |
|-------|---------------|
| Définition revenus immobiliers | art. 7 à 11 |
| Exonération habitation propre (fédéral) | art. 12 §3 |
| Base RC indexé × 1,40 | art. 7 §1, 2°, a) |
| Location usage professionnel — loyers réels | art. 7 §1, 2°, b) |
| Forfait charges 40 % (locatif professionnel) | art. 13 |
| Précompte immobilier déductible | art. 14 |
| Plus-values immobilières bâtis (16,5 %) | art. 90, 10° |
| Plus-values terrains (33 %) | art. 90, 8° |
| Plus-values spéculatives (33 %) | art. 90, 1° |

### Revenus mobiliers et précompte mobilier

| Règle | Article CIR 92 |
|-------|---------------|
| Revenus mobiliers — définition | art. 17 à 22 |
| Exonération intérêts livret épargne | art. 21, 5° |
| Exonération branche 21 (≥ 8 ans) | art. 21, 9° |
| PM libératoire | art. 313 |
| Taux PM général (30 %) | art. 269 §1, 1° |
| VVPR bis — taux réduits dividendes PME | art. 269 §2 |
| VVPRter — boni de liquidation | art. 269 §1, 2° |
| Réserve de liquidation | art. 184quater |
| Cotisation réserve de liquidation | art. 219quater |
| Plus-values spéculatives mobilières | art. 90, 1° |
| Plus-values participations importantes (> 25 %) | art. 90, 9° bis |

### Revenus divers

| Règle | Article CIR 92 |
|-------|---------------|
| Revenus divers spéculatifs (33 %) | art. 90, 1° |
| Taux 33 % sur revenus divers | art. 171, 1°, b) |
| Plus-values de cession d'actifs | art. 90, 9° |

### Equity salarial et ATN

| Règle | Source |
|-------|--------|
| Stock-options — régime fiscal | Loi du 26 mars 1999, art. 42-43 |
| ATN — définition et imposition | art. 36 CIR 92 |
| ATN véhicule de société | art. 36 §2 CIR 92 |
| Revenus exceptionnels — quotient | art. 171 CIR 92 |
| Plus-values spéculatives (actions) | art. 90, 1° CIR 92 |

### Épargne et réductions d'impôt

| Règle | Article CIR 92 |
|-------|---------------|
| Pensions alimentaires — déduction 80 % | art. 104 |
| Épargne-pension — réduction 30/25 % | art. 145¹ |
| ELT — réduction 30 % | art. 145¹⁰ |
| Dons — réduction 45 % | art. 145³³ |
| Frais garde enfant — réduction 45 % | art. 145³⁴ |
| Sécurité habitation — réduction 50 % | art. 145³¹ bis |
| Bonus à l'emploi fiscal (crédit remboursable) | art. 289ter |
| EIP (Engagement Individuel de Pension) | art. 52, 3° bis |
| PLCI (Pension Libre Complémentaire Indépendant) | art. 52, 7° |

### Déclaration et procédure

| Règle | Article CIR 92 |
|-------|---------------|
| Obligation déclarative | art. 305 à 310 |
| Déclaration comptes étrangers (BNB) | art. 307 §1, al. 4 |
| Constructions juridiques (cadre XIII) | art. 307 §1/1 |
| Délai de reprise ordinaire | art. 354 |
| Délai de reprise (fraude) | art. 358 |
| Délai de réclamation | art. 371 |
| Intérêts de retard | art. 412 |

### Impôt des Non-Résidents

| Règle | Article CIR 92 |
|-------|---------------|
| Champ d'application INR | art. 227 à 248 |
| Revenus de source belge (INR) | art. 228 |

---

## Crypto-actifs — sources spécifiques

| Source | URL |
|--------|-----|
| SPF Finances — crypto | https://finances.belgium.be/fr/particuliers/revenus/crypto-monnaies |
| Service des Décisions Anticipées (SDA) | https://www.ruling.be |
| Fisconetplus — art. 90, 1° CIR 92 | https://www.fisconetplus.be |

---

## Publications et doctrine administrative

- **Circulaires SPF Finances** : disponibles sur Fisconetplus.be (rubriques par matière)
- **Commentaires administratifs du CIR 92** : Fisconetplus.be — section "Commentaires"
- **Rapport annuel SPF Finances** : https://finances.belgium.be/fr/publications
- **Rapport CNC/CBN** : https://www.cnc-cbn.be/fr/avis (avis comptables pour les entreprises)

**Ne JAMAIS citer comme source primaire** : publications de cabinets d'avocats, éditeurs (Kluwer, Larcier, Fiscologue) ou fédérations sectorielles. Ces sources sont utiles comme pédagogie ou piste d'investigation — jamais comme justification d'une règle.

**Source opposable** = CIR 92 + AR/CIR 92 + doctrine administrative SPF Finances (circulaires, commentaires) + jurisprudence publiée (Cour de cassation, Cours d'appel, Tribunal de première instance).

---

## Lois de finances à vérifier chaque année

- **Loi-programme / loi de finances** : modifie le CIR 92 chaque année (barèmes, plafonds indexés)
- **Indexation annuelle** des montants : quotités exemptées, plafonds épargne-pension, ELT, exonération livret d'épargne
- **Coefficient d'indexation revenus cadastraux** : publié annuellement par le SPF Finances (AGDP)

**Attention aux dates d'application** : les modifications votées en loi-programme s'appliquent en général à partir du 1er janvier de l'année suivante. Vérifier sur Fisconetplus.be la date d'entrée en vigueur de chaque modification.

---

## Contact SPF Finances

| Service | Contact |
|---------|---------|
| **Contact Center SPF Finances** | https://finances.belgium.be/fr/contact — 0257 257 57 |
| **Bureau de contrôle IPP local** | Selon code postal sur finances.belgium.be |
| **Service des Décisions Anticipées (rulings)** | https://www.ruling.be |
| **MyMinfin — messagerie sécurisée** | https://www.myminfin.be (espace personnel) |
