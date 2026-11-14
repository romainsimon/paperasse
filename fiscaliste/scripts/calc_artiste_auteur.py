#!/usr/bin/env python3
"""
calc_artiste_auteur.py — calcul déterministe des cotisations sociales (URSSAF artistes-auteurs),
de la retraite complémentaire RAAP (IRCEC) et d'une estimation d'impôt sur le revenu
pour des revenus d'auteur déclarés en BNC (sans précompte).

Lit les paramètres dans data/artistes-auteurs-2026.json (aucune valeur en dur).

Usage :
  python scripts/calc_artiste_auteur.py --recettes 19000
  python scripts/calc_artiste_auteur.py --recettes 19000 --tmi 0.30
  python scripts/calc_artiste_auteur.py --recettes 19000 --regime reel --frais 3000
  python scripts/calc_artiste_auteur.py --recettes 14000 --annee 2025 --raap-option
  python scripts/calc_artiste_auteur.py --recettes 19000 --json

Limites : ne calcule pas le barème progressif complet (voir skill `fiscaliste`) — l'IR est estimé
au taux marginal (--tmi) sur le bénéfice imposable ; ne traite pas le régime traitements et salaires
(droits précomptés), ni les revenus accessoires, ni la surcotisation forfaitaire.
"""
import argparse, json, sys
from pathlib import Path

DATA = Path(__file__).resolve().parent.parent / "data"


def load(section):
    with open(DATA / "artistes-auteurs-2026.json", encoding="utf-8") as f:
        return json.load(f)[section]


def calc(recettes, regime="micro", frais=0.0, tmi=0.11, annee=2026, raap_option=False):
    c = load("cotisations")
    ir = load("impot_revenu")
    taux = c["taux_2026"]
    p = c["parametres_2026"]

    # 1. bénéfice et assiette sociale (bénéfice + 15 %)
    if regime == "micro":
        abatt = ir["micro_bnc"]["abattement_forfaitaire"]
        abattement = max(recettes * abatt, ir["micro_bnc"]["abattement_minimum"])   # 34 %, minimum 305 €
        benefice = max(0.0, recettes - abattement)
    else:
        benefice = max(0.0, recettes - frais)
    assiette = benefice * 1.15

    # 2. cotisations URSSAF
    vp_base = min(assiette, taux["vieillesse_plafonnee"]["plafond_assiette"])
    lignes = {
        "vieillesse_deplafonnee": assiette * taux["vieillesse_deplafonnee"]["taux_du"],
        "vieillesse_plafonnee": vp_base * taux["vieillesse_plafonnee"]["taux_du"],
        "csg": assiette * taux["csg"]["taux"],
        "crds": assiette * taux["crds"]["taux"],
        "formation_professionnelle": assiette * taux["contribution_formation_professionnelle"]["taux"],
    }
    total_urssaf = sum(lignes.values())
    csg_deductible = assiette * taux["csg"]["deductible"]

    # 3. RAAP (IRCEC)
    raap = c["retraite_complementaire_raap"]
    seuil = raap["seuil_assujettissement_assiette"]["valeur_revenus_2025"] if annee <= 2025 \
        else raap["seuil_assujettissement_assiette"]["valeur_revenus_2026_attendue"]
    raap_du = 0.0
    raap_taux = 0.0
    if assiette >= seuil:
        raap_taux = raap["taux_reduit_sur_option"]["taux"] if (raap_option and assiette <= raap["taux_reduit_sur_option"]["condition_assiette_max"]) else raap["taux"]
        raap_du = min(assiette, raap["plafond_assiette"]) * raap_taux

    # 4. IR estimé (au taux marginal, hors quotient/décote — voir skill fiscaliste pour le barème complet)
    ir_estime = benefice * tmi

    # 5. droits
    smic = p["smic_horaire_1er_janvier"]
    droits = {
        "un_trimestre_retraite": assiette >= 150 * smic,
        "quatre_trimestres_et_ij": assiette >= 600 * smic,
        "raap_obligatoire": assiette >= seuil,
    }

    return {
        "entree": {"recettes": recettes, "regime": regime, "frais": frais, "tmi": tmi, "annee": annee, "raap_option": raap_option},
        "benefice_bnc": round(benefice, 2),
        "assiette_sociale": round(assiette, 2),
        "cotisations_urssaf": {k: round(v, 2) for k, v in lignes.items()},
        "total_urssaf": round(total_urssaf, 2),
        "total_urssaf_pct_recettes": round(total_urssaf / recettes, 4) if recettes else 0,
        "csg_deductible_annee_suivante": round(csg_deductible, 2),
        "raap_ircec": {"seuil_assiette": seuil, "taux": raap_taux, "cotisation": round(raap_du, 2)},
        "ir_estime_au_tmi": round(ir_estime, 2),
        "total_social_et_fiscal": round(total_urssaf + raap_du + ir_estime, 2),
        "net_apres_charges": round(recettes - total_urssaf - raap_du - ir_estime, 2),
        "droits": droits,
        "avertissements": [
            "Cotisations : taux 2026 (inchangés depuis 2025), assiette = bénéfice + 15 % (CSS L. 382-3).",
            "IR : estimation au taux marginal sur le bénéfice (abattement 34 % en micro) — pour le calcul exact (quotient, décote, autres revenus) utiliser le skill fiscaliste.",
            "RAAP : seuil 900 SMIC h, appelé en N+1 par l'IRCEC ; option 4 % à exercer avant le 30 novembre.",
            "Ne couvre pas : droits précomptés (TS), revenus accessoires, surcotisation forfaitaire, TVA.",
        ],
    }


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--recettes", type=float, required=True, help="recettes brutes HT de l'année (encaissements)")
    ap.add_argument("--regime", choices=["micro", "reel"], default="micro")
    ap.add_argument("--frais", type=float, default=0.0, help="frais réels (régime réel)")
    ap.add_argument("--tmi", type=float, default=0.11, help="taux marginal d'imposition (0.11, 0.30…)")
    ap.add_argument("--annee", type=int, default=2026, help="année des revenus (seuil RAAP)")
    ap.add_argument("--raap-option", action="store_true", help="option RAAP à 4 %%")
    ap.add_argument("--json", action="store_true")
    a = ap.parse_args()
    r = calc(a.recettes, a.regime, a.frais, a.tmi, a.annee, a.raap_option)
    if a.json:
        print(json.dumps(r, ensure_ascii=False, indent=2)); return
    print(f"Recettes brutes : {r['entree']['recettes']:,.2f} €  ({a.regime}{', frais ' + format(a.frais, ',.0f') + ' €' if a.regime == 'reel' else ''})")
    print(f"Bénéfice BNC    : {r['benefice_bnc']:,.2f} €")
    print(f"Assiette sociale (+15 %) : {r['assiette_sociale']:,.2f} €")
    print("Cotisations URSSAF artistes-auteurs :")
    for k, v in r["cotisations_urssaf"].items():
        print(f"  {k:<26} {v:>10,.2f} €")
    print(f"  {'TOTAL URSSAF':<26} {r['total_urssaf']:>10,.2f} €  ({r['total_urssaf_pct_recettes']*100:.1f} % des recettes)")
    rp = r["raap_ircec"]
    print(f"RAAP (IRCEC, N+1) : {rp['cotisation']:,.2f} €  (seuil assiette {rp['seuil_assiette']:,} €, taux {rp['taux']*100:.0f} %)")
    print(f"IR estimé au TMI {a.tmi*100:.0f} % : {r['ir_estime_au_tmi']:,.2f} €")
    print(f"TOTAL social + fiscal : {r['total_social_et_fiscal']:,.2f} €  →  net ≈ {r['net_apres_charges']:,.2f} €")
    d = r["droits"]
    print(f"Droits : 1 trimestre {'oui' if d['un_trimestre_retraite'] else 'non'} · 4 trimestres + IJ {'oui' if d['quatre_trimestres_et_ij'] else 'non'} · RAAP {'obligatoire' if d['raap_obligatoire'] else 'non due'}")
    for w in r["avertissements"]:
        print("⚠", w)


if __name__ == "__main__":
    main()
