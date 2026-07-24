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
| Paiement en crypto (biens/services) | **Oui** (cession déguisée) |
| Échange crypto-to-crypto (BTC → ETH) | **Non** (sursis, art. 150 VH bis) |
| Crypto → stablecoin (USDC, USDT…) | **Non** (stablecoins traités comme crypto-actifs) |
| Stablecoin → € / USD | **Oui** (fait générateur) |
| Staking / mining / airdrop | Selon contexte — souvent BNC ou BIC, pas PV mobilière |

**Règle du sursis crypto-to-crypto** : les échanges entre crypto-actifs ne déclenchent pas l'imposition. Seul le passage en monnaie fiat (ou en biens/services) est taxable.

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

- 12,8% IR + 18,6% PS (LFSS 2026, applicable aux revenus du patrimoine réalisés dès 2025)
- Application sur la plus-value nette annuelle (après compensation des moins-values de l'année)

> **Note** : certains revenus limitativement énumérés restent soumis au taux PS de 17,2% (art. L136-8 IV CSS). Les PV crypto relèvent du taux 18,6%.

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
| Staking occasionnel | BNC non professionnel |
| Mining | BIC |
| Staking/lending professionnel | BIC |
| Airdrop reçu passivement | Non imposable à la réception, PV au moment de la cession |
| Rewards actifs (tâches à accomplir) | BNC ou salaire |

**Staking occasionnel — déclaration BNC à la réception** : valorisation en EUR à chaque date de réception, déclaration formulaire 2042 C PRO case 5HQ (micro-BNC, abattement 34%) ou 5HG (réel). Exonération micro-BNC si recettes ≤ 305 €.

**Zone grise** : la doctrine DGFIP évolue. Vérifier les dernières positions BOFiP.

## Documentation à conserver

Pour 6 ans minimum (délai de reprise) :
- Historique complet des transactions (exports exchanges)
- Preuves des dates et prix d'acquisition
- Détail des échanges crypto-to-crypto (même non imposables)
- Transferts entre wallets (pour prouver la continuité du portefeuille)
- Export des rewards de staking avec valorisation fiat à chaque date de réception

## Transmission au décès : purge des plus-values latentes

**Principe** : le décès n'est pas une "cession à titre onéreux" au sens de l'art. 150 VH bis CGI. Les plus-values latentes accumulées par le défunt sont définitivement exonérées d'IR et de prélèvements sociaux — on parle de **purge des PV latentes**.

### Mécanisme

Les héritiers recueillent le portefeuille à sa **valeur vénale au jour du décès** (valeur retenue pour l'assiette des droits de succession). Cette valeur devient leur nouveau **prix total d'acquisition du portefeuille** dans la formule PAMC.

Ils paient des **droits de succession** sur cette valeur (après abattements légaux), mais aucun IR ni PS sur les gains réalisés du vivant du défunt.

### Exemple chiffré

| | Vente de son vivant | Transmission par décès |
|---|---|---|
| Portefeuille au jour J | 500 000 € | 500 000 € |
| Prix d'acquisition initial | 100 000 € | — |
| PV latente | 400 000 € | — |
| PFU 31,4 % sur la PV | **125 600 €** | **0 €** |
| Droits de succession (enfant, ~barème) | — | ~75 000 € (sur 400 k€ nets d'abattement) |

L'avantage dépend du lien familial et des abattements applicables (100 000 € par enfant, exonération conjoint…).

### Conséquences pratiques

- **Intérêt patrimonial fort** pour les détenteurs de crypto avec de grandes PV latentes : conserver jusqu'au décès peut être fiscalement plus efficace que de vendre puis retransmettre du cash.
- **Valorisation au décès** : la valeur doit être documentée (cours de clôture en EUR à la date du décès). Pour les exchanges centralisés, un relevé de compte suffit. Pour les wallets non-custodiaux, la valorisation repose sur des explorateurs de blockchain.
- **Problème d'accès aux actifs** : les héritiers doivent pouvoir accéder aux wallets/exchanges. Sans accès aux clés privées ou aux comptes, les actifs sont définitivement perdus. Il est indispensable d'organiser la transmission des accès (via un notaire, testament, ou dispositif dédié) sans jamais exposer la clé privée dans un document non sécurisé.
- **Déclaration de succession** : les crypto-actifs doivent être déclarés à l'actif successoral à leur valeur vénale au jour du décès (art. 750 ter CGI).

### Avertissement

Ce mécanisme est fondé sur l'absence du décès dans les faits générateurs de l'art. 150 VH bis CGI (position constante, confirmée par la doctrine BOFiP). Pour des portefeuilles significatifs, faire valider la stratégie par un notaire ou un avocat fiscaliste.

## Références CGI / BOFiP

- Régime particulier crypto : art. 150 VH bis CGI
- Activité habituelle (BIC) : art. 34 CGI
- Méthode PAMC : art. 150 VH bis-II CGI
- Sursis échange crypto-crypto : art. 150 VH bis-I-2 CGI
- Déclaration de succession (actifs numériques) : art. 750 ter CGI
- BOFiP PV crypto : BOI-RPPM-PVBMC-30
- BOFiP BNC staking/mining : BOI-BNC-CHAMP-10-10-20-40
