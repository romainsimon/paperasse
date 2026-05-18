# Setup guidé (première utilisation) — Belgique

Ce setup se lance uniquement si `company.json` n'existe pas à la racine du projet. Il crée le fichier étape par étape.

**Principe : inférer un maximum, demander un minimum.** La BCE donne presque tout. Ne poser que les questions dont la réponse n'est pas déductible.

`last_updated: 2026-05-15`

## Étape 1 : Identifier la société

Demander :

> Quel est le **nom de votre société** ou votre **numéro BCE** ?

Lancer la recherche via l'API publique BCE :

```bash
# Recherche par dénomination
curl "https://kbopub.economie.fgov.be/kbopub/zoeknaamfonetischform.html?searchWord=<nom>&start=0&length=10"

# Recherche par numéro BCE
python scripts/fetch_company.py "<numéro BCE ou dénomination>" --json
```

**Si plusieurs résultats** : afficher la liste (dénomination, numéro BCE, siège, date de constitution) et demander laquelle est la bonne.

**Si un seul résultat** : afficher les informations et demander confirmation.

**Si aucun résultat** : demander manuellement (raison sociale, numéro BCE, forme juridique, adresse, objet social).

### Données pré-remplies automatiquement depuis la BCE

Après confirmation, les champs suivants sont remplis sans rien demander :

- **Dénomination sociale, numéro BCE, adresse, forme juridique** : directement depuis la BCE
- **Dirigeant** : la BCE renvoie les mandataires déposés ; utiliser le premier actif. Titre déduit de la forme juridique (Gérant pour SRL, Administrateur pour SA)
- **Régime d'imposition** : ISOC par défaut pour SRL, SA, SC, SNC, SCS. Mentionner le défaut choisi, l'utilisateur corrigera si besoin.
- **Premier exercice** : si `date_constitution` < 2 ans, c'est probablement le premier exercice. Le mentionner.
- **Dates d'exercice** : premier exercice = date de constitution → 31/12 de l'année suivante (ou de l'année en cours si constitué en janvier). Exercices suivants = 01/01 → 31/12. Proposer ces dates par défaut, l'utilisateur ajuste si besoin.

**Numéro d'entreprise (BCE) :** Format `0xxx.xxx.xxx`. Stocker sans espaces ni points dans `company.json` (`"bce": "0123456789"`), afficher avec la notation `0xxx.xxx.xxx`.

**Numéro TVA belge :** Dérivé du numéro BCE : `BE` + numéro BCE sans points (ex : `BE0123456789`).

**Extrait BCE :** Téléchargeable gratuitement sur https://kbopub.economie.fgov.be (équivalent du Kbis français).

## Étape 2 : Régime TVA

Demander :

> Quel est votre **régime TVA** ?

Proposer les options :
- **Franchise (art. 56bis CTVA)** : CA ≤ 25 000 €/an — pas de TVA facturée
- **Régime trimestriel** : CA ≤ 2 500 000 € — déclaration tous les 3 mois via Intervat
- **Régime mensuel** : CA > 2 500 000 € ou sur option — déclaration mensuelle via Intervat

Si la société vient d'être constituée : vérifier si elle s'est déjà immatriculée à la TVA (formulaire 604A). Si non, expliquer la démarche.

**Activation TVA :**
> Pour vous immatriculer à la TVA, vous devez déposer le formulaire **604A** (formulaire d'identification à la TVA) auprès du Centre de Contrôle TVA compétent, ou via un guichet d'entreprises agréé. Le numéro TVA vous sera attribué sous quelques jours ouvrables.

## Étape 3 : Comptes bancaires

> Quels sont vos **comptes bancaires professionnels** ? (nom de la banque pour chacun)
> Utilisez-vous **Qonto** ?

L'utilisateur peut avoir un ou plusieurs comptes (Qonto, BNP Paribas Fortis, ING, Belfius, KBC, etc.). Pour chaque compte, collecter :

- **Nom** (ex: "Qonto", "BNP Fortis", "ING Pro")
- **Identifiant** : généré automatiquement en slug du nom (ex: `qonto`, `bnp`, `ing`)
- **Numéro de compte PCMN** : `550` pour le premier, `551` pour le deuxième, etc.
- **IBAN** (format belge : `BE` + 14 chiffres)

### Qonto (connecteur automatique)

Si l'utilisateur a Qonto, demander les identifiants API :

> Pour connecter Qonto, j'ai besoin de vos identifiants API.
> Vous les trouverez dans le dashboard Qonto > **Settings > Integrations > API**.
>
> Quel est votre **Organization slug** (QONTO_ID) ?
> Et votre **Secret key** (QONTO_API_SECRET) ?

- Écrire les valeurs dans `.env` à la racine du projet (le créer s'il n'existe pas).
- Mettre `qonto.enabled` à `true` dans `company.json`.
- Tester la connexion : `node integrations/qonto/fetch.js --start $(date +%Y-%m-%d) --end $(date +%Y-%m-%d)`. Confirmer ou demander de vérifier si erreur.

### Autres banques belges (import manuel)

Pour chaque banque sans connecteur, expliquer :

> Pour **[nom banque]**, vous devrez exporter vos relevés depuis votre espace en ligne (format CSV, OFX ou CODA).
> Déposez les fichiers dans `data/imports/[slug-banque]/` en les nommant par période :
> `releve-2025-01.csv`, `releve-2025-02.csv`, etc.

> **Note** : De nombreuses banques belges proposent le format **CODA** (COded DAta) pour les relevés bancaires structurés. Ce format est lisible par la plupart des logiciels comptables belges.

Créer le dossier `data/imports/[slug-banque]/` pour chaque banque manuelle.

Résultat dans `company.json` :

```json
"banks": [
  { "id": "qonto", "name": "Qonto", "account": "550", "type": "api" },
  { "id": "bnp", "name": "BNP Paribas Fortis", "account": "551", "type": "import", "import_dir": "data/imports/bnp/" }
]
```

## Étape 4 : Paiements en ligne

> Utilisez-vous **Stripe** pour encaisser des paiements ?

**Si oui** :

> Combien de **comptes Stripe** avez-vous ? (un seul / plusieurs comptes séparés / Stripe Connect)
> Pour chaque compte, quel **nom** voulez-vous lui donner ? (ex: "Mon SaaS", "Ma Boutique")

Configurer une entrée par compte dans `stripe_accounts` avec `id`, `name`, `env_key`.

Pour chaque compte, demander la clé API :

> Pour connecter **[nom du compte]**, j'ai besoin de votre clé secrète Stripe.
> Vous la trouverez dans le dashboard Stripe > **Developers > API keys**.
>
> Quelle est votre **Secret key** pour [nom du compte] ?

- Écrire les clés dans `.env` (une variable par compte).
- Tester la connexion pour chaque compte.

**Si non** : laisser `stripe_accounts` vide (`[]`).

Autres plateformes belges courantes : **Mollie**, **Multisafepay**, **Payconiq** — prévoir un export manuel si pas de connecteur disponible.

### Fichier .env

Les clés API sont stockées dans `.env` à la racine du projet (jamais dans `company.json`, jamais commitées). Vérifier que `.env` est dans `.gitignore`. Format :

```
QONTO_ID=votre-slug-organisation
QONTO_API_SECRET=votre-cle-secrete
STRIPE_SECRET_PRODUCT1=sk_live_...
```

## Étape 5 : Facturation électronique (Peppol)

Depuis le 1er janvier 2026, la facturation électronique B2B est obligatoire en Belgique.

> Avez-vous déjà configuré la **facturation électronique Peppol** ?

Si non :

> Pour émettre et recevoir des factures électroniques en Belgique, vous avez besoin d'un prestataire Peppol agréé.
>
> Votre identifiant Peppol est : `0208:[numéro BCE sans points]` (ex : `0208:0123456789`)
>
> **Prestataires recommandés** : Clearfacts, Unifiedpost, Isabel, Paiements.online, ou via votre logiciel comptable.
>
> Si vous utilisez déjà Qonto : Qonto est connecté au réseau Peppol en Belgique.

Configurer dans `company.json` :
```json
"einvoicing": {
  "peppol_id": "0208:0123456789",
  "provider": "qonto",
  "provider_name": "Qonto",
  "reception_ready": false,
  "emission_ready": false
}
```

## Étape 6 : Récapitulatif et génération

Afficher un récapitulatif complet. Marquer clairement ce qui a été déduit :

```
Société configurée :
  Dénomination sociale : [nom]
  Forme juridique : [SRL / SA / SNC / SCS / SC]
  Numéro BCE : [0xxx.xxx.xxx]
  Numéro TVA : [BE0xxx.xxx.xxx]
  Dirigeant : [nom] ([titre déduit])
  Régime TVA : [franchise / trimestriel / mensuel]
  Régime imposition : [ISOC] (déduit de la forme juridique)
  Exercice : [debut] > [fin] (déduit de la date de constitution)
  Premier exercice : [oui/non]
  Comptes bancaires :
    - [nom] (550) [API / import manuel] — IBAN : BE[...]
    - [nom] (551) [API / import manuel] — IBAN : BE[...]
  Stripe : [X compte(s) configuré(s) / non]
  Peppol : [ID 0208:xxx / à configurer]
```

> **Quelque chose à corriger ?** Sinon je génère le fichier `company.json`.

Générer `company.json`, puis passer au workflow normal (vérification des échéances belges).

---

## Ressources pour la création d'entreprise en Belgique

- **BCE (recherche entreprises)** : https://kbopub.economie.fgov.be
- **Guichets d'entreprises agréés** (enregistrement BCE, activation TVA) : liste sur https://economie.fgov.be
- **SPF Finances (formulaire 604A — activation TVA)** : https://finances.belgium.be
- **INASTI (indépendants — affiliation)** : https://www.inasti.be
- **ONSS (salariés)** : https://www.socialsecurity.be
- **BNB Centrale des Bilans (dépôt comptes annuels)** : https://cri.nbb.be
