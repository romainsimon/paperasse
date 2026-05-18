# Fiscalité des crypto-actifs (particuliers — régime belge)

<!-- last_updated: 2026-05-15 -->

Base légale : art. 90, 1° CIR 92 (revenus divers spéculatifs) ; art. 23 et s. CIR 92 (bénéfices professionnels).
Voir `data/crypto-be.json` pour les paramètres.
Ruling SDA : Service des Décisions Anticipées en matière fiscale — https://www.ruling.be

## Principe : trois régimes selon la qualification

En Belgique, il n'existe **pas de régime spécifique** aux crypto-actifs (pas d'équivalent à l'art. 150 VH bis CGI français). La taxation dépend entièrement de la **qualification des opérations** :

| Qualification | Régime | Taux |
|--------------|--------|------|
| **Bonne gestion du patrimoine privé** | Non imposable | 0 % |
| **Spéculatif / hors gestion normale** | Revenus divers (art. 90, 1° CIR 92) | 33 % |
| **Professionnel / habituel** | Bénéfices d'une activité professionnelle | Barème progressif IPP (25 %–50 %) + cotisations sociales |

**Il n'existe pas de flat tax automatique sur les crypto** en Belgique. La qualification est une question de fait, appréciée par l'administration et les tribunaux au cas par cas.

---

## 1. Bonne gestion du patrimoine privé — non imposable

### Définition

Un particulier agissant en **bon père de famille** dans la gestion de son patrimoine privé peut acheter et vendre des crypto-actifs sans imposition sur les plus-values réalisées.

**Critères de bonne gestion** :
- Investissement à partir de l'épargne propre (pas de levier ou d'emprunt excessif)
- Horizon d'investissement à long terme (pas de stratégie de trading rapide)
- Diversification raisonnable du patrimoine
- Volume de transactions modéré et non systématique
- Absence de recours à des outils professionnels (bots, API trading, algorithmes)

**Conséquence** : les plus-values de cession de Bitcoin, Ether ou autres crypto-actifs ne sont pas déclarées ni imposées.

### Incertitude juridique

La frontière entre bonne gestion et spéculation n'est **pas définie par la loi** — elle résulte de la jurisprudence et de l'appréciation administrative. L'administration fiscale belge (AGFisc) a tendance à analyser la fréquence, le volume et la sophistication des opérations.

**En cas de doute** : solliciter un ruling préalable auprès du SDA (Service des Décisions Anticipées).

---

## 2. Revenus divers spéculatifs — 33 %

### Conditions

Sont taxés à 33 % les gains réalisés par des particuliers dont les opérations sont qualifiées de **spéculatives ou hors gestion normale du patrimoine**, sans pour autant atteindre le seuil d'une activité professionnelle.

**Indices de spéculation** :
- Fréquence élevée de transactions (trading actif)
- Horizon court (achat-revente en jours ou semaines)
- Usage d'outils spécialisés (bots, API, plateformes de trading professionnel)
- Revenus crypto représentant une part significative des revenus du foyer
- Endettement pour investir dans les crypto

**Base légale** : art. 90, 1° CIR 92 — "bénéfices et profits résultant de spéculations".

### Calcul de la plus-value imposable

```
Plus-value imposable = prix de cession − coût d'acquisition (FIFO ou prix moyen pondéré documenté)
```

**Important** : contrairement à la France (méthode PAMC obligatoire), la Belgique n'impose pas de méthode de calcul unique. La méthode FIFO (premier entré, premier sorti) ou le prix moyen pondéré sont les plus couramment acceptés. La méthode choisie doit être appliquée **de manière cohérente**.

### Compensation des moins-values

Les moins-values sur crypto-actifs peuvent être **compensées avec les plus-values** de la même catégorie (revenus divers — art. 90, 1° CIR 92) pour l'année concernée. **Pas de report** des moins-values sur les années suivantes en revenus divers.

### Taux : 33 %

Taux fixe sur la plus-value nette annuelle (gains − pertes). Pas de cotisations sociales (ONSS) sur les revenus divers.

**Base légale** : art. 171, 1°, b) CIR 92.

---

## 3. Activité professionnelle — barème progressif

### Conditions

Si les opérations crypto constituent une **activité professionnelle** (habituelle, organisée, avec moyens importants), les gains sont imposés comme des bénéfices ou profits professionnels :

- Barème progressif IPP : 25 % → 40 % → 45 % → 50 %
- Cotisations sociales indépendant (INASTI) : ~20 % sur le bénéfice net
- Déduction des charges réelles liées à l'activité (matériel, abonnements, frais)

**Indices d'activité professionnelle** :
- Activité à temps plein ou quasi-plein
- Infrastructure importante (serveurs, logiciels pro, trading desk)
- Revenus crypto constituant la source principale de revenus du foyer
- Publicité ou offre de services à des tiers en matière crypto

---

## Faits générateurs imposables

| Opération | Imposable ? |
|-----------|-------------|
| Achat crypto contre EUR | Non |
| Vente crypto contre EUR | Oui (si spéculatif ou professionnel) |
| Échange crypto-to-crypto (BTC → ETH) | En principe oui (réalisation d'un gain si valeur supérieure — sauf bonne gestion) |
| Paiement en crypto (biens/services) | Oui (si taxable) — traité comme une cession |
| Staking — récompenses reçues | Probablement imposable à la réception (valeur EUR à la date de réception) — qualification incertaine |
| Mining | Revenus professionnels si activité organisée ; sinon revenus divers |
| Airdrop | Non imposable à la réception (valeur nulle à l'entrée) ; imposable à la cession |
| NFT (vente) | Selon qualification — bonne gestion, spéculatif ou professionnel |

**Note** : contrairement au droit français (sursis d'imposition crypto-to-crypto), en Belgique l'échange entre crypto-actifs **peut constituer une réalisation imposable** si l'opération est qualifiée de spéculative. L'absence de sursis légal explicite crée une incertitude.

---

## Ruling SDA — recommandation systématique

Le **Service des Décisions Anticipées (SDA)** peut rendre des décisions anticipées (rulings) sur la qualification fiscale d'opérations crypto avant leur réalisation.

**Avantages du ruling** :
- Sécurité juridique : la décision lie l'administration pour la durée fixée (généralement 5 ans)
- Permet de confirmer le régime "bonne gestion" pour des volumes importants
- Protège contre une requalification ultérieure si les conditions du ruling sont respectées

**Quand solliciter un ruling** :
- Volume de transactions > 100 000 € sur l'année
- Revenus crypto significatifs par rapport au revenu total
- Stratégies complexes (staking, DeFi, yield farming)
- Doute sérieux sur la qualification applicable

**Contact** : Service des Décisions Anticipées — https://www.ruling.be (dépôt en ligne possible).

---

## Obligations déclaratives

### Cadre XIII — comptes à l'étranger

Tout compte sur un **exchange étranger** (Binance, Coinbase, Kraken, etc.) doit être déclaré à la **Banque Nationale de Belgique** (BNB) via le formulaire en ligne sur MyMinfin (art. 307 §1, al. 4 CIR 92).

**Amende** : 1 250 € à 6 250 € par compte non déclaré, plus impôt et intérêts sur les revenus non déclarés.

### Cadre XV — constructions juridiques

Si des crypto-actifs sont détenus via une structure étrangère (DAO, fondation, trust), la déclaration en cadre XV peut être requise.

### Déclaration des revenus imposables

**Si revenus spéculatifs (33 %)** : déclaration en cadre XV de la déclaration IPP — case "revenus divers (spéculatifs)".

**Si revenus professionnels** : déclaration en cadre IV (bénéfices) ou cadre XVIII (profits) selon la nature de l'activité.

**Si bonne gestion (exonéré)** : aucune déclaration des plus-values, mais déclaration des comptes étrangers reste obligatoire.

---

## Documentation à conserver

Pour une défense en cas de contrôle (délai de prescription : 3 ans, 5 ans en cas de fraude, 10 ans en cas de fraude grave) :

- Historique complet des transactions (export CSV de chaque exchange et wallet)
- Preuves des dates et prix d'acquisition (captures d'écran, rapports exchanges)
- Preuve des transferts entre wallets propres (pour éviter l'assimilation à des cessions)
- Valorisation EUR à chaque date de réception de staking/airdrop
- Documentation justifiant la qualification "bonne gestion" (horizon d'investissement, source des fonds, diversification)

**Outils** : Koinly, CoinTracking, Waltio, Cryptio — vérifier que le logiciel peut générer des rapports conformes aux méthodes belges (FIFO ou prix moyen).

---

## Comparaison France vs Belgique

| Critère | France | Belgique |
|---------|--------|----------|
| Régime par défaut | PFU 31,4 % (art. 150 VH bis CGI) | Qualification au cas par cas |
| Échange crypto-to-crypto | Sursis (non imposable) | Potentiellement imposable |
| Méthode de calcul | PAMC obligatoire | FIFO ou prix moyen (cohérence requise) |
| Seuil exonération | 305 € de cessions | Pas de seuil — c'est la qualification qui prime |
| Ruling disponible | Non applicable (régime fixe) | Oui — SDA recommandé en cas de doute |
| Staking | BNC | Incertain — jurisprudence en développement |

---

## Pièges fréquents

1. **Croire que "je ne vends pas contre des euros, donc je ne suis pas imposé"** : en Belgique, l'échange crypto-to-crypto peut être imposable si l'opération est spéculative.
2. **Ne pas déclarer les comptes d'exchange à l'étranger** : amende + impôt sur les revenus non déclarés.
3. **Absence de documentation** : sans trace écrite, l'administration peut refuser la qualification "bonne gestion" et taxer à 33 %.
4. **Confondre les trois régimes** : la qualification n'est pas un choix du contribuable — c'est une appréciation des faits.
5. **Oublier le ruling SDA** pour les portefeuilles importants : la sécurité juridique vaut le coût de la procédure.
6. **Staking non déclaré** : même si la qualification finale est incertaine, l'administration peut taxer les revenus de staking comme revenus divers dès la réception.

## Références CIR 92 / Fisconetplus

| Règle | Article CIR 92 |
|-------|---------------|
| Revenus divers spéculatifs | art. 90, 1° |
| Taux 33 % sur revenus divers | art. 171, 1°, b) |
| Bénéfices professionnels | art. 23 et s. |
| Déclaration comptes étrangers | art. 307 §1, al. 4 |
| Constructions juridiques (cadre XV) | art. 307 §1/1 |

Source : Fisconetplus.be — https://www.fisconetplus.be
Ruling SDA : https://www.ruling.be
SPF Finances crypto : https://finances.belgium.be/fr/particuliers/revenus/crypto-monnaies
