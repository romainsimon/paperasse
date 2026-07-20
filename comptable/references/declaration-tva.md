# Déclaration de TVA CA3 — reconstitution semi-automatique depuis la banque

Workflow opérationnel pour préparer une **déclaration de TVA CA3 (formulaire 3310-CA3, régime réel
normal)** à partir du compte bancaire (Qonto), via le script `scripts/declaration-tva.js`.

> **Lecture seule.** Le script ne télédéclare rien et n'écrit rien chez un tiers. La sortie est un
> **brouillon à valider par un humain** (ou son expert-comptable) avant dépôt sur impots.gouv.fr.
> Déposer la CA3 et payer la TVA restent des actes à la main de l'utilisateur.

## Quand l'utiliser

« prépare / calcule / reprends la TVA de mai (et juin) », « fais la déclaration de TVA », « la CA3
du mois dernier », « combien de TVA doit-on payer ce mois-ci ? », reconstituer la TVA d'une période
passée depuis la banque.

## Méthode

1. **Extraction Qonto** (via `integrations/qonto/fetch.js`) : transactions `completed` de la
   période, factures clients, factures fournisseurs.
2. **TVA collectée** sur la base retenue :
   - **encaissements** (défaut pour les prestations de services, art. 269-2 CGI) → TVA des factures
     clients **payées** dans le mois (`paid_at`) ;
   - **débits** (uniquement si l'option a été exercée, mention « TVA d'après les débits » sur les
     factures) → TVA des factures **émises** (`finalized_at`).
3. **TVA déductible**, **ancrée sur les décaissements** (une TVA par transaction, pas de double
   compte) : chaque dépense est rapprochée de la **facture fournisseur analysée par Qonto**
   (`total_tax_amount`), par id de transaction puis par montant+date ; les postes hors factures
   (carburant, frais bancaires) sont ajoutés depuis la transaction ; les dépenses sans justificatif
   sont marquées **« à justifier »**.
4. **Exclusions à 0** (hors champ TVA) : salaires, charges sociales (URSSAF), impôts/taxes (DGFiP),
   sous-traitants en franchise (art. 293 B), assurances/mutuelles, flux intra-groupe / compte
   courant d'associé.
5. **Autoliquidation des services intra-UE reçus** (art. 259-1° et 283-2 CGI) : base HT en
   **ligne A3**, TVA autoliquidée ajoutée en **collectée (08)** ET **déductible (20)** → **net 0**.
   ⚠️ **Pas de DES** dans ce sens : la Déclaration Européenne de Services incombe au *prestataire*
   qui **rend** le service, pas au preneur qui le reçoit.

## Utilisation

```bash
# 1) activer Qonto dans company.json et définir QONTO_ID / QONTO_API_SECRET (voir integrations/)
# 2) calculer la CA3 d'une ou plusieurs périodes
node scripts/declaration-tva.js --from 2026-05 --to 2026-06
npm run declaration:tva -- --from 2026-05 --to 2026-06 --json

# variante hors-ligne : rejouer sur des dumps déjà extraits
node scripts/declaration-tva.js --from 2026-05 --to 2026-06 --offline data/transactions
```

Sortie : un brouillon lisible (cases CA3 + net à payer par mois) + un JSON dans
`data/declarations-tva/`.

## Configuration (`company.json`, bloc `vat`)

```json
"tax": { "regime_tva": "reel_normal", "tva_rate": 0.20 },
"vat": {
  "base_exigibilite": "encaissements",
  "classification": {
    "exclude":            [{ "pattern": "NOM_SALARIE", "reason": "salaire net" }],
    "intragroup":         [{ "pattern": "NOM_HOLDING", "reason": "compte courant" }],
    "intracom_services":  [{ "pattern": "INDEED|GOOGLE IRELAND", "reason": "service intra-UE" }],
    "fuel_categories":    ["gas_station"],
    "fuel_patterns":      ["TOTAL|ESSO|BP"],
    "fuel_deductible_pct": 1.0,
    "fee_operation_types": ["qonto_fee"],
    "estimate_categories": ["hardware_and_equipment", "other_service", "other_expense"]
  }
}
```

Les `pattern` sont des regex appliquées au libellé des transactions ; à adapter à chaque société
(noms des salariés, du sous-traitant en franchise, de la holding…). `fuel_deductible_pct` = 1.0 pour
un véhicule utilitaire au gazole, 0.8 pour l'essence ou un véhicule de tourisme.

## Mapping des cases CA3 (3310-CA3)

Vérifié contre le formulaire et la notice officiels `3310-CA3-SD` (impots.gouv.fr) **et** la
localisation française d'Odoo (`l10n_fr_account/data/tax_report_data.xml`), mapping de référence
maintenu.

| Case | Libellé (CA3) | Contenu |
|------|---------------|---------|
| **A1 / 01** | Ventes, prestations de services | Base HT taxable (CA du mois sur la base retenue) |
| **A3** | Achats de prestations de services intracommunautaires | Base HT des services intra-UE reçus (autoliquidation) |
| **08** | Taux normal 20 % (base / taxe) | base = A1 + A3 ; taxe = 20 % |
| **09 / 9B** | Taux réduits 5,5 % / 10 % | si opérations à ces taux |
| **16** | Total de la TVA brute due | somme des taxes dues |
| **19** | TVA déductible sur immobilisations | achats d'immobilisations |
| **20** | TVA déductible sur autres biens et services (ABS) | achats courants, sous-traitance, énergie, carburant, honoraires, frais bancaires, **+ TVA autoliquidée** ; **agrège tous les taux** (20/10/5,5 %) |
| **22** | Report du crédit de la déclaration précédente | = case 27 de la CA3 précédente |
| **23** | Total TVA déductible | 19 + 20 + 21 + 22 |
| **28** | TVA nette due | 16 − 23 (si positif) |
| **32 (AB)** | Total à payer | 28 + taxes assimilées |

> **Attention** : les services intra-UE « généraux » (Indeed, Google Ireland, Meta…) vont en **A3**,
> **pas** en B2 (qui est réservée aux acquisitions intracommunautaires de **biens**). Odoo confirme :
> `A3 - Achats de prestations de services intracommunautaires`, `B2 - Acquisitions
> intracommunautaires`.

## Règles de calcul

- **Arrondi fiscal** : bases et taxes à l'euro le plus proche.
- **Carburant** : gazole en véhicule utilitaire = 100 % déductible ; gazole en véhicule de tourisme
  et essence = 80 %.
- **Frais bancaires** (abonnement + commissions Qonto) : TVA 20 % déductible, rarement présents dans
  les factures fournisseurs → réintégrés depuis la transaction.
- **Autoliquidation intra-UE (services reçus)** : nette de 0 si droit à déduction total. La **DES**
  n'est due que si l'entreprise **rend** des services intra-UE, jamais pour ceux qu'elle reçoit.

## Ce que le script NE gère PAS (déférer à un humain / au reste du skill `comptable`)

- crédit de TVA remboursable (formulaire 3519), report case 27 → 22 entre déclarations ;
- acquisitions intracommunautaires de **biens** (B2), importations, DEB ;
- régularisations sur immobilisations, prorata / coefficient de déduction < 100 % ;
- taux réduits multiples côté **collecté** (le script suppose le taux normal pour les ventes).

Pour le cadre TVA général (régimes, taux, exigibilité, intra-UE), voir
[references/tva.md](tva.md).
