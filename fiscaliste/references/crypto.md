# Fiscalité des crypto-actifs (particuliers)

Voir `data/plus-values-mobilieres-crypto.json` → `crypto_actifs`.

## Régime des particuliers (occasionnel)

Le régime des particuliers s'applique aux cessions **occasionnelles** d'actifs numériques. Si l'activité est habituelle/professionnelle, requalification en **BIC** (cotisations sociales TNS, régime plus lourd).

**Indices d'activité habituelle** :
- Volume de transactions élevé
- Fréquence quasi quotidienne
- Usage d'outils professionnels (bots, API, arbitrage automatisé)
- Revenus crypto principaux du foyer

## Fait générateur

| Opération | Imposable ? |
|-----------|-------------|
| Achat crypto contre € / USD | Non |
| Cession crypto contre € / USD | **Oui** |
| Cession crypto contre stablecoin (USDC, USDT…) | **Non** (stablecoins traités comme crypto-actifs) |
| Cession stablecoin contre € / USD | **Oui** (passage en fiat = fait générateur) |
| Paiement en crypto (biens/services) | **Oui** (cession déguisée) |
| Échange crypto-to-crypto (BTC → ETH) | **Non** (sursis, art. 150 VH bis) |
| Staking / mining / airdrop | Voir section dédiée ci-dessous |

**Règle du sursis crypto-to-crypto** : les échanges entre crypto-actifs (y compris vers des stablecoins) ne déclenchent pas l'imposition. Seul le passage en monnaie fiat (€, USD…) ou en biens/services est taxable.

## Méthode PAMC (Prix d'Acquisition Moyen Pondéré en Continu)

**Formule officielle** :

```
plus_value_cession = prix_cession − (prix_total_acquisition_portefeuille × prix_cession / valeur_portefeuille_avant_cession)
```

**Conséquences pratiques** :
- Chaque cession puise dans le portefeuille global (pas en FIFO, pas en LIFO)
- Nécessite de tracer l'historique complet depuis le premier achat
- Si prix d'achat non documentés → risque de requalification en cession au prix 0 (PV max)

**Outils recommandés** : Koinly, CoinTracking, Waltio, Cryptio. À vérifier que le logiciel applique bien la PAMC française.

## Taux d'imposition

### Régime par défaut : PFU 31,4%

- 12,8% IR + 18,6% PS
- 18,6% applicable aux revenus du patrimoine réalisés dès 2025 (déclarés en 2026) — LFSS 2026 adoptée le 16/12/2025
- 17,2% maintenu pour certains revenus limitativement énumérés (art. L136-8 IV CSS)
- Application sur la plus-value nette annuelle (après compensation des moins-values de l'année)

### Option barème (depuis revenus 2023)

Possible depuis la LFI 2022 (applicable revenus 2023). **Avantageuse si TMI ≤ 11%.**

**Rappel** : l'option barème est **globale** — s'applique à tous les revenus du capital de l'année (y compris dividendes, intérêts, PV mobilières). Arbitrage à faire au niveau global.

## Exonération du petit portefeuille

**Seuil annuel : 305 €** de cessions cumulées.

- Cessions ≤ 305 € par an → **exonération totale**
- Cessions > 305 € par an → **imposition intégrale** (pas seulement la fraction au-delà)

**Piège** : le seuil s'applique sur le **montant brut des cessions** de l'année, pas sur la plus-value. Vendre 500 € de crypto avec une PV de 10 € déclenche l'imposition sur les 10 € de PV.

## Compensation des moins-values

Les moins-values de l'année sont **compensables** avec les plus-values de l'année (crypto uniquement, pas compensables avec PV mobilières classiques).

**Pas de report** des moins-values crypto sur les années suivantes (règle spécifique).

## Formulaire 2086

Déclaration obligatoire détaillant **chaque cession** :
- Date de la cession
- Valeur du portefeuille avant cession
- Prix total d'acquisition du portefeuille
- Prix de la cession
- Plus-value ou moins-value calculée

**Report sur 2042 C** :
- Case 3AN : plus-value nette annuelle (gain)
- Case 3BN : moins-value nette annuelle (perte)

## Staking, mining, airdrops

**Régime distinct des PV** — imposition selon la nature :

| Activité | Régime probable |
|----------|----------------|
| Staking occasionnel | BNC non professionnel (deux méthodes, voir ci-dessous) |
| Mining | BIC |
| Staking/lending professionnel | BIC |
| Airdrop reçu passivement | Non imposable à la réception, PV au moment de la cession |
| Rewards actifs (tâches à accomplir) | BNC ou salaire |

### Staking occasionnel — deux méthodes de déclaration

**Méthode 1 : BNC à la réception** (position DGFIP, recommandée par Waltio)

Les rewards sont imposés chaque année à la valeur fiat au jour de réception.

- Formulaire **2042 C PRO**, case **5HQ** (micro-BNC) ou **5HG** (réel)
- Micro-BNC : abattement forfaitaire **34%** → base imposable = rewards bruts × 66%
- Exonération totale si rewards annuels ≤ **305 €**
- Soumis au barème progressif IR + **17,2% PS** (revenus 2025)
- Le prix de revient des crypto reçus = valeur déclarée en BNC (évite la double imposition lors de la vente)

**Méthode 2 : imposition à la vente en fiat** (pratique alternative, flou juridique)

Les rewards ne sont pas déclarés à la réception. Lors de la vente en fiat, prix de revient = 0 → l'intégralité du produit de cession est imposée via le **formulaire 2086**, PFU 30%.

- Avantageuse si TMI > 30% (flat tax < barème + PS)
- Avantageuse si la vente est lointaine (report de l'imposition)
- Risque : position non confirmée par BOFiP, potentiel redressement

→ TMI 11% : **BNC avantageux**. TMI 30% et au-delà : **PFU avantageux**.

**Zone grise** : la doctrine DGFIP évolue. Vérifier les dernières positions BOFiP avant de choisir la méthode 2.

## Documentation à conserver

Pour 6 ans minimum (délai de reprise) :
- Historique complet des transactions (exports exchanges)
- Preuves des dates et prix d'acquisition
- Détail des échanges crypto-to-crypto (même non imposables)
- Transferts entre wallets (pour prouver la continuité du portefeuille)
- Pour le staking : export des rewards avec valorisation fiat à chaque date de réception

## Références CGI / BOFiP

- Régime particulier crypto : art. 150 VH bis CGI
- Activité habituelle (BIC) : art. 34 CGI
- Méthode PAMC : art. 150 VH bis-II CGI
- Sursis échange crypto-crypto : art. 150 VH bis-I-2 CGI
- Staking / BNC : BOI-RPPM-PVBMC-20-10-20-40
- BOFiP PV crypto : BOI-RPPM-PVBMC-30
