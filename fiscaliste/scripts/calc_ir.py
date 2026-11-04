#!/usr/bin/env python3
"""
Calculateur IR déterministe pour revenus 2025 (déclaration 2026).

Usage:
    # Calcul direct
    python fiscaliste/scripts/calc_ir.py --parts 1 --rni 45000

    # Via fichier foyer.json
    python fiscaliste/scripts/calc_ir.py --foyer foyer.example.json

    # Sortie JSON
    python fiscaliste/scripts/calc_ir.py --parts 2 --rni 90000 --json

Couvre :
    - Abattement 10 % salaires et pensions (salaires : plancher et plafond par
      déclarant, CGI art. 83, 3° ; pensions : plancher par pensionné, plafond
      par foyer, CGI art. 158, 5-a ; plancher limité au revenu)
    - Barème progressif tranche par tranche
    - Quotient familial (avec plafonnement ; enfants en résidence alternée
      décomptés après les enfants à charge exclusive)
    - Décote célibataire / couple
    - PS différenciés LFSS 2026 : 18,6 % revenus du patrimoine (PV mobilières,
      crypto) / 17,2 % produits de placement 2025 (dividendes, intérêts).
      Les PS sur le résultat LMNP ne sont PAS calculés (le champ
      lmnp_reel_resultat du foyer.json n'alimente pas la base PS)
    - IR forfaitaire du PFU : 12,8 % des revenus du capital (CGI art. 200 A),
      sauf option globale pour le barème (non calculée par ce script)
    - CEHR (RFR incluant les versements PER déduits, CGI art. 1417, IV)

Ne couvre PAS :
    - Réductions / crédits d'impôt (à retrancher manuellement après)
    - Régimes spéciaux (revenus exceptionnels, non-résidents, DOM-TOM)
    - IFI (script distinct à créer si besoin)

Les valeurs viennent de data/bareme-ir-2025.json. Pour une autre année,
exposer --bareme data/bareme-ir-XXXX.json.
"""

import argparse
import json
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).parent.parent
DATA_DIR = REPO_ROOT / "data"
DEFAULT_BAREME = DATA_DIR / "bareme-ir-2025.json"
DEFAULT_PFU = DATA_DIR / "pfu-prelevements-sociaux.json"


def load_json(path):
    with open(path) as f:
        return json.load(f)


# ─────────────────────────────────────────────────────
# Abattement salaires / pensions
# ─────────────────────────────────────────────────────

def abattement_salaires(brut_1aj, bareme):
    cfg = bareme["abattement_salaires_10pct"]
    abatt = max(cfg["minimum"], min(cfg["maximum"], brut_1aj * cfg["taux"]))
    # Le plancher ne peut excéder le revenu : net jamais négatif
    abatt = min(abatt, brut_1aj)
    return round(brut_1aj - abatt)


def abattement_pensions(pensions_par_declarant, bareme):
    """Pensions nettes du foyer (CGI art. 158, 5-a).

    Le minimum s'apprécie par pensionné, limité au montant de sa pension ;
    le maximum s'applique au total du foyer.
    """
    cfg = bareme["abattement_pensions_10pct"]
    abatt_par_declarant = [
        min(brut, max(cfg["minimum"], brut * cfg["taux"]))
        for brut in pensions_par_declarant if brut
    ]
    abatt = min(cfg["maximum"], sum(abatt_par_declarant))
    return round(sum(pensions_par_declarant) - abatt)


# ─────────────────────────────────────────────────────
# Barème progressif (tranche par tranche, sur 1 part)
# ─────────────────────────────────────────────────────

def impot_par_part(quotient, tranches):
    """Calcule l'impôt sur un quotient (1 part) en appliquant les tranches."""
    impot = 0.0
    for t in tranches:
        taux = t["taux"]
        # cas "jusqu_a" (première tranche à 0%)
        if "jusqu_a" in t and "de" not in t:
            borne_basse = 0
            borne_haute = t["jusqu_a"]
        elif "au_dela" in t:
            borne_basse = t["au_dela"]
            borne_haute = float("inf")
        else:
            borne_basse = t["de"]
            borne_haute = t["a"]

        if quotient <= borne_basse:
            break
        base = min(quotient, borne_haute) - borne_basse
        impot += base * taux

    return impot


# ─────────────────────────────────────────────────────
# Décote
# ─────────────────────────────────────────────────────

def decote(impot_brut, parts, bareme):
    """Applique la décote si éligible. Retourne le montant de décote."""
    cfg = bareme["decote"]
    if parts <= 1:
        seuil = cfg["seuil_celibataire"]
        plafond = cfg["plafond_celibataire"]
    else:
        seuil = cfg["seuil_couple"]
        plafond = cfg["plafond_couple"]

    if impot_brut >= seuil:
        return 0.0
    return max(0.0, plafond - 0.4525 * impot_brut)


# ─────────────────────────────────────────────────────
# Quotient familial avec plafonnement
# ─────────────────────────────────────────────────────

def impot_avec_qf(rni, parts_total, parts_base, bareme):
    """
    Applique le QF avec plafonnement.
    - parts_total : parts foyer (ex: couple + 2 enfants = 3)
    - parts_base : parts foyer sans enfants (ex: couple = 2, célib = 1)
    """
    tranches = bareme["bareme_ir"]["tranches"]
    plafond_demi = bareme["quotient_familial"]["plafond_gain_par_demi_part"]

    # Impôt avec toutes les parts
    impot_total = impot_par_part(rni / parts_total, tranches) * parts_total
    # Impôt sans les enfants (référence)
    impot_sans = impot_par_part(rni / parts_base, tranches) * parts_base

    gain_reel = impot_sans - impot_total
    nb_demi_parts = (parts_total - parts_base) * 2
    gain_max = nb_demi_parts * plafond_demi

    if gain_reel > gain_max:
        # Plafonné : impôt = impôt_sans_enfants − gain_max
        impot_brut = impot_sans - gain_max
        qf_plafonne = True
    else:
        impot_brut = impot_total
        qf_plafonne = False

    return {
        "impot_brut": round(impot_brut),
        "impot_total_parts": round(impot_total),
        "impot_base_parts": round(impot_sans),
        "gain_qf_reel": round(gain_reel),
        "gain_qf_max": round(gain_max),
        "qf_plafonne": qf_plafonne,
    }


# ─────────────────────────────────────────────────────
# CEHR
# ─────────────────────────────────────────────────────

def cehr(rfr, parts_base, bareme):
    cfg = bareme["cehr"]
    seuils = cfg["seuils_couple"] if parts_base >= 2 else cfg["seuils_celibataire"]
    total = 0.0
    for t in seuils:
        taux = t["taux"]
        if "au_dela" in t:
            if rfr > t["au_dela"]:
                total += (rfr - t["au_dela"]) * taux
        else:
            if rfr > t["de"]:
                base = min(rfr, t["a"]) - t["de"]
                total += base * taux
    return round(total)


# ─────────────────────────────────────────────────────
# PS sur revenus du capital
# ─────────────────────────────────────────────────────

def ps_capital(base_patrimoine, base_placement, pfu_data):
    """PS différenciés LFSS 2026 (revenus 2025).

    - Revenus du patrimoine (PV mobilières CTO, crypto, LMNP) : 18,6 % dès 2025.
    - Produits de placement (dividendes, intérêts, RCM) : 17,2 % pour les
      encaissements 2025 (18,6 % à partir du 01/01/2026).
    """
    ps = pfu_data["prelevements_sociaux"]
    taux_patrimoine = ps["taux_revenus_du_patrimoine_2025"]["valeur"]
    taux_placement = ps["taux_produits_de_placement_2025"]["valeur"]
    return {
        "patrimoine": {"base": base_patrimoine, "taux": taux_patrimoine,
                       "montant": round(base_patrimoine * taux_patrimoine)},
        "placement": {"base": base_placement, "taux": taux_placement,
                      "montant": round(base_placement * taux_placement)},
        "total": round(base_patrimoine * taux_patrimoine) + round(base_placement * taux_placement),
    }


# ─────────────────────────────────────────────────────
# Orchestration
# ─────────────────────────────────────────────────────

def calc(rni, parts, parts_base, bareme, rfr=None, base_ps_patrimoine=0,
         base_ps_placement=0, pfu_data=None, base_pfu_ir=0):
    qf = impot_avec_qf(rni, parts, parts_base, bareme)
    dec = decote(qf["impot_brut"], parts_base, bareme)
    impot_apres_decote = max(0, qf["impot_brut"] - dec)

    if (base_ps_patrimoine or base_ps_placement) and pfu_data:
        ps_detail = ps_capital(base_ps_patrimoine, base_ps_placement, pfu_data)
    else:
        ps_detail = None
    ps = ps_detail["total"] if ps_detail else 0
    cehr_montant = cehr(rfr, parts_base, bareme) if rfr else 0
    ir_pfu = round(base_pfu_ir * pfu_data["pfu"]["taux_ir"]) if base_pfu_ir and pfu_data else 0

    return {
        "rni": rni,
        "parts": parts,
        "parts_base": parts_base,
        "quotient_par_part": round(rni / parts),
        "impot_brut_apres_qf": qf["impot_brut"],
        "qf_details": {
            "gain_qf_reel": qf["gain_qf_reel"],
            "gain_qf_max": qf["gain_qf_max"],
            "plafonne": qf["qf_plafonne"],
        },
        "decote": round(dec),
        "impot_apres_decote": impot_apres_decote,
        "ir_pfu": {"base": base_pfu_ir, "montant": ir_pfu},
        "prelevements_sociaux": ps,
        "ps_details": ps_detail,
        "cehr": cehr_montant,
        "total_a_payer": impot_apres_decote + ir_pfu + ps + cehr_montant,
        "_note": "Avant réductions et crédits d'impôt. Les additionner manuellement.",
    }


def from_foyer(foyer, bareme, pfu_data):
    """Déduit les paramètres à partir d'un foyer.json."""
    f = foyer["foyer"]
    r = foyer["revenus"]
    d = foyer.get("deductions", {})

    # Parts
    situation = f.get("situation", "celibataire")
    parts_base = 2 if situation in ("marie", "pacse") else 1
    enfants = f.get("nb_enfants_charge", 0)
    enfants_alternee = f.get("nb_enfants_alternee", 0)
    # Les 2 premiers enfants = 0,5 part chacun ; à partir du 3e = 1 part
    demi_parts_enfants = 0.5 * min(enfants, 2) + 1.0 * max(0, enfants - 2)
    # Résidence alternée : décomptés après les enfants à charge exclusive ;
    # 0,25 part pour le 1er ou le 2e enfant à charge, 0,5 à partir du 3e
    rangs_alt = range(enfants + 1, enfants + enfants_alternee + 1)
    demi_parts_alt = sum(0.25 if rang <= 2 else 0.5 for rang in rangs_alt)
    parts = parts_base + demi_parts_enfants + demi_parts_alt

    # Revenu net catégoriel salaires + ARE (abattement 10 %).
    # L'ARE est un revenu de remplacement imposé selon les règles des T&S
    # (BOI-RSA-BASE-30-50-20) : même abattement 10 % que les salaires.
    # Plancher et plafond s'appliquent à chaque membre du foyer (CGI art. 83, 3°) :
    # l'abattement se calcule déclarant par déclarant, ARE comprise.
    # revenus_chomage = ARE du déclarant 1 (champ historique).
    traitements_par_declarant = [
        r.get("salaires_declarant1", 0) + r.get("revenus_chomage_declarant1", r.get("revenus_chomage", 0)),
        r.get("salaires_declarant2", 0) + r.get("revenus_chomage_declarant2", 0),
    ]
    net_salaires = sum(abattement_salaires(t, bareme) for t in traitements_par_declarant if t)

    pensions_par_declarant = [r.get("pensions_declarant1", 0), r.get("pensions_declarant2", 0)]
    net_pensions = abattement_pensions(pensions_par_declarant, bareme) if any(pensions_par_declarant) else 0

    # Revenus fonciers : déjà au net (micro post-abattement / réel post-charges).
    fonciers = r.get("revenus_fonciers_reels", 0) + r.get("revenus_fonciers_micro", 0)

    # Revenus imposables au barème (hors revenus du capital si PFU)
    revenu_global = net_salaires + net_pensions + fonciers

    # Déductions (PER + pension alimentaire + CSG déductible)
    per = d.get("per_declarant1", 0) + d.get("per_declarant2", 0)
    pension_alim = d.get("pension_alimentaire_enfant_majeur", 0)
    csg_ded = d.get("csg_deductible_n1", 0)
    rni = max(0, revenu_global - per - pension_alim - csg_ded)

    # Base PS sur revenus du capital, séparée par nature (LFSS 2026) :
    # - produits de placement (dividendes, intérêts) : 17,2 % sur les encaissements 2025
    # - revenus du patrimoine (PV mobilières, crypto) : 18,6 % dès les revenus 2025
    base_ps_placement = r.get("dividendes_bruts", 0) + r.get("interets_rcm", 0)
    base_ps_patrimoine = r.get("plus_values_mobilieres", 0) + r.get("crypto_plus_values", 0)

    # IR forfaitaire du PFU (12,8 %, CGI art. 200 A ; art. 150 VH bis pour les
    # crypto-actifs). Sous option barème, ces revenus relèvent du barème : le
    # script ne gère pas cette option et ne compte alors pas d'IR forfaitaire.
    option_capital = foyer.get("options_fiscales", {}).get("revenus_capital", "pfu")
    base_pfu_ir = base_ps_placement + base_ps_patrimoine if option_capital == "pfu" else 0

    # RFR approximatif : RNI + revenus du capital taxés au PFU + versements PER
    # déduits, réintégrés au RFR (CGI art. 1417, IV-1°-a). Simplification :
    # RNI + bases PS + PER
    rfr_approx = rni + base_ps_placement + base_ps_patrimoine + per

    return calc(
        rni=rni,
        parts=parts,
        parts_base=parts_base,
        bareme=bareme,
        rfr=rfr_approx,
        base_ps_patrimoine=base_ps_patrimoine,
        base_ps_placement=base_ps_placement,
        pfu_data=pfu_data,
        base_pfu_ir=base_pfu_ir,
    )


def main():
    p = argparse.ArgumentParser(description="Calculateur IR déterministe — revenus 2025")
    p.add_argument("--rni", type=float, help="Revenu net imposable (après abattements et déductions)")
    p.add_argument("--parts", type=float, help="Nombre de parts fiscales")
    p.add_argument("--parts-base", type=float, help="Parts hors enfants (1 célib, 2 couple)")
    p.add_argument("--rfr", type=float, help="RFR pour CEHR (optionnel)")
    p.add_argument("--base-ps-patrimoine", type=float, default=0,
                   help="Base PS revenus du patrimoine (PV mobilières, crypto) : 18,6 %% dès 2025")
    p.add_argument("--base-ps-placement", type=float, default=0,
                   help="Base PS produits de placement (dividendes, intérêts) : 17,2 %% en 2025")
    p.add_argument("--base-ps", type=float, default=0,
                   help="(déprécié) alias de --base-ps-placement, comportement 17,2 %% historique")
    p.add_argument("--base-pfu", type=float, default=0,
                   help="Revenus du capital soumis à l'IR forfaitaire du PFU (12,8 %%)")
    p.add_argument("--foyer", type=str, help="Chemin vers un foyer.json")
    p.add_argument("--bareme", type=str, default=str(DEFAULT_BAREME))
    p.add_argument("--pfu", type=str, default=str(DEFAULT_PFU))
    p.add_argument("--json", action="store_true", help="Sortie JSON")
    args = p.parse_args()

    bareme = load_json(args.bareme)
    pfu_data = load_json(args.pfu) if Path(args.pfu).exists() else None

    if args.foyer:
        foyer = load_json(args.foyer)
        result = from_foyer(foyer, bareme, pfu_data)
    else:
        if args.rni is None or args.parts is None:
            p.error("--rni et --parts requis sauf si --foyer est utilisé")
        parts_base = args.parts_base if args.parts_base else (2.0 if args.parts >= 2 else 1.0)
        result = calc(
            rni=args.rni,
            parts=args.parts,
            parts_base=parts_base,
            bareme=bareme,
            rfr=args.rfr,
            base_ps_patrimoine=args.base_ps_patrimoine,
            base_ps_placement=args.base_ps_placement + args.base_ps,
            pfu_data=pfu_data,
            base_pfu_ir=args.base_pfu,
        )

    if args.json:
        print(json.dumps(result, indent=2, ensure_ascii=False))
    else:
        print()
        print(f"  RNI ............................. {result['rni']:>10} €")
        print(f"  Parts ........................... {result['parts']:>10}")
        print(f"  Quotient par part ............... {result['quotient_par_part']:>10} €")
        print(f"  Impôt brut (après QF) ........... {result['impot_brut_apres_qf']:>10} €")
        qf = result["qf_details"]
        if qf["gain_qf_reel"]:
            status = "PLAFONNE" if qf["plafonne"] else "non plafonné"
            print(f"    └ gain QF réel / max .......... {qf['gain_qf_reel']:>6} / {qf['gain_qf_max']} € ({status})")
        print(f"  Décote .......................... {-result['decote']:>10} €")
        print(f"  Impôt après décote .............. {result['impot_apres_decote']:>10} €")
        if result["ir_pfu"]["montant"]:
            print(f"  IR forfaitaire PFU 12,8% ........ {result['ir_pfu']['montant']:>10} €")
        if result["prelevements_sociaux"]:
            det = result.get("ps_details") or {}
            pat = det.get("patrimoine", {})
            pla = det.get("placement", {})
            if pat.get("base"):
                print(f"  PS {pat['taux']*100:.1f}% revenus patrimoine ...... {pat['montant']:>10} €")
            if pla.get("base"):
                print(f"  PS {pla['taux']*100:.1f}% produits placement ...... {pla['montant']:>10} €")
            print(f"  PS total revenus capital ........ {result['prelevements_sociaux']:>10} €")
        if result["cehr"]:
            print(f"  CEHR ............................ {result['cehr']:>10} €")
        print(f"  ─────────────────────────────────────────────────")
        print(f"  TOTAL (avant réductions/crédits)  {result['total_a_payer']:>10} €")
        print()


if __name__ == "__main__":
    main()
