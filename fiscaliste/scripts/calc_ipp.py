#!/usr/bin/env python3
"""
Calculateur IPP déterministe pour revenus 2025 (déclaration 2026 via Tax-on-web). Art. 130-134 CIR 92.

Usage:
    # Calcul simple
    python fiscaliste/scripts/calc_ipp.py --revenus-nets 45000 --enfants 0

    # Avec enfants et additionnels communaux
    python fiscaliste/scripts/calc_ipp.py --revenus-nets 60000 --enfants 2 --additionnels 0.07

    # Via fichier foyer JSON
    python fiscaliste/scripts/calc_ipp.py --foyer foyer.example.json

    # Sortie JSON
    python fiscaliste/scripts/calc_ipp.py --revenus-nets 45000 --json

Couvre :
    - Frais professionnels forfaitaires (art. 51 CIR 92)
    - Quotités exemptées d'impôt (art. 131-134 CIR 92)
    - Barème progressif tranche par tranche (art. 130 CIR 92)
    - Quotient conjugal (art. 87 CIR 92)
    - Additionnels communaux

Ne couvre PAS :
    - Réductions et crédits d'impôt (chèque-habitat, épargne-pension, dons…)
    - Régimes spéciaux (non-résidents, revenus d'origine étrangère)
    - Précompte mobilier sur revenus du capital
    - Cotisations sociales (ONSS)

Les valeurs viennent de data/bareme-ipp-2025.json.
"""

import argparse
import json
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).parent.parent
DATA_DIR = REPO_ROOT / "data"
DEFAULT_BAREME = DATA_DIR / "bareme-ipp-2025.json"

# Taux d'additionnels communaux par défaut (Bruxelles)
TAUX_ADDITIONNELS_DEFAUT = 0.07


def load_json(path):
    with open(path) as f:
        return json.load(f)


# ─────────────────────────────────────────────────────
# Frais professionnels forfaitaires (art. 51 CIR 92)
# ─────────────────────────────────────────────────────

def frais_professionnels(revenus_bruts, type_contribuable, bareme):
    """
    Calcule la déduction forfaitaire pour frais professionnels.

    type_contribuable : 'salarie' ou 'dirigeant'
    Retourne le montant net après déduction.
    """
    abattements = bareme["abattements"]
    if type_contribuable == "dirigeant":
        cfg = abattements["frais_professionnels_dirigeants"]
    else:
        cfg = abattements["frais_professionnels_forfaitaires"]

    deduction = max(cfg["minimum"], min(cfg["maximum"], revenus_bruts * cfg["taux"]))
    return round(revenus_bruts - deduction), round(deduction)


# ─────────────────────────────────────────────────────
# Quotités exemptées (art. 131-134 CIR 92)
# ─────────────────────────────────────────────────────

def calc_quotites_exemptees(nb_enfants, nb_enfants_moins_3ans, bareme, parent_isole=False):
    """
    Calcule les quotités exemptées d'impôt par contribuable.

    Retourne un dict avec le détail et le total.
    """
    cfg = bareme["quotites_exemptees"]
    base = cfg["base"]
    supplement_enfants = 0
    detail_enfants = None

    if nb_enfants > 0:
        # Chercher le supplement pour le nombre exact d'enfants (table jusqu'à 4)
        table = {e["nombre"]: e["supplement"] for e in cfg["enfants_a_charge"] if "nombre" in e}
        supplement_par_supp = next(
            e["supplement_par_enfant"]
            for e in cfg["enfants_a_charge"]
            if "nombre_supplementaire" in e
        )

        if nb_enfants <= 4:
            supplement_enfants = table[nb_enfants]
        else:
            supplement_enfants = table[4] + (nb_enfants - 4) * supplement_par_supp

        detail_enfants = {
            "nb_enfants": nb_enfants,
            "supplement": supplement_enfants,
        }

    # Supplément enfant(s) de moins de 3 ans
    supplement_moins_3ans = 0
    if nb_enfants_moins_3ans > 0:
        supplement_moins_3ans = nb_enfants_moins_3ans * cfg["enfant_moins_3ans"]["supplement"]

    # Supplément parent isolé (première part — 1er enfant à charge)
    supplement_parent_isole = 0
    if parent_isole and nb_enfants > 0:
        supplement_parent_isole = cfg["parent_isole"]["supplement_1ere_part"]

    total = base + supplement_enfants + supplement_moins_3ans + supplement_parent_isole

    return {
        "base": base,
        "supplement_enfants": supplement_enfants,
        "detail_enfants": detail_enfants,
        "supplement_moins_3ans": supplement_moins_3ans,
        "supplement_parent_isole": supplement_parent_isole,
        "total": total,
    }


# ─────────────────────────────────────────────────────
# Quotient conjugal (art. 87 CIR 92)
# ─────────────────────────────────────────────────────

def quotient_conjugal(rev_declarant1, rev_declarant2, bareme):
    """
    Applique le quotient conjugal si l'un des conjoints a des revenus < 30 % du total.

    Retourne (rev1_apres_qc, rev2_apres_qc, transfert).
    """
    cfg = bareme["quotient_conjugal"]
    total = rev_declarant1 + rev_declarant2

    if total == 0:
        return rev_declarant1, rev_declarant2, 0

    rev_principal = max(rev_declarant1, rev_declarant2)
    rev_secondaire = min(rev_declarant1, rev_declarant2)

    # QC applicable si conjoint le moins rémunéré < 30 % du total
    if rev_secondaire >= total * cfg["taux_max"]:
        return rev_declarant1, rev_declarant2, 0

    # Transfert = max(0, 30 % du principal − revenus propres du secondaire)
    transfert_theorique = rev_principal * cfg["taux_max"] - rev_secondaire
    transfert = min(transfert_theorique, cfg["plafond_eur"])

    if rev_declarant1 >= rev_declarant2:
        return rev_declarant1 - transfert, rev_declarant2 + transfert, round(transfert)
    else:
        return rev_declarant1 + transfert, rev_declarant2 - transfert, round(transfert)


# ─────────────────────────────────────────────────────
# Barème progressif (art. 130 CIR 92)
# ─────────────────────────────────────────────────────

def impot_sur_base(base_imposable, tranches):
    """
    Applique les tranches progressives sur la base imposable.

    Retourne l'impôt total et le détail par tranche.
    """
    impot = 0.0
    detail = []

    for t in tranches:
        taux = t["taux"]

        if "jusqu_a" in t and "de" not in t:
            borne_basse = 0
            borne_haute = t["jusqu_a"]
            label = f"0 – {t['jusqu_a']:,} €"
        elif "au_dela" in t:
            borne_basse = t["au_dela"]
            borne_haute = float("inf")
            label = f"> {t['au_dela']:,} €"
        else:
            borne_basse = t["de"]
            borne_haute = t["a"]
            label = f"{t['de']:,} – {t['a']:,} €"

        if base_imposable <= borne_basse:
            break

        base_tranche = min(base_imposable, borne_haute) - borne_basse
        montant = base_tranche * taux
        impot += montant

        detail.append({
            "tranche": label,
            "taux": taux,
            "base": round(base_tranche),
            "montant": round(montant),
        })

    return round(impot), detail


# ─────────────────────────────────────────────────────
# Orchestration — calcul par contribuable
# ─────────────────────────────────────────────────────

def calc_contribuable(
    revenus_bruts,
    nb_enfants,
    nb_enfants_moins_3ans,
    bareme,
    type_contribuable="salarie",
    parent_isole=False,
    taux_additionnels=TAUX_ADDITIONNELS_DEFAUT,
):
    """
    Calcule l'IPP pour un seul contribuable (célibataire ou un des conjoints
    après quotient conjugal).
    """
    # 1. Frais professionnels
    revenus_nets_imposables, frais_deduites = frais_professionnels(
        revenus_bruts, type_contribuable, bareme
    )

    # 2. Quotités exemptées
    quotites = calc_quotites_exemptees(
        nb_enfants, nb_enfants_moins_3ans, bareme, parent_isole
    )

    # 3. Base imposable = revenus nets − quotités exemptées
    base_imposable = max(0, revenus_nets_imposables - quotites["total"])

    # 4. Impôt sur la base imposable
    ipp_brut, detail_tranches = impot_sur_base(
        base_imposable, bareme["bareme_ipp"]["tranches"]
    )

    # 5. Réductions d'impôt (placeholder — à détailler dans une version future)
    reductions = 0

    # 6. IPP fédéral net
    ipp_federal_net = max(0, ipp_brut - reductions)

    # 7. Additionnels communaux
    additionnels = round(ipp_federal_net * taux_additionnels)

    # 8. IPP total
    ipp_total = ipp_federal_net + additionnels

    # 9. Taux moyen effectif (sur revenus bruts)
    taux_moyen = (ipp_total / revenus_bruts) if revenus_bruts > 0 else 0.0

    return {
        "revenus_bruts": round(revenus_bruts),
        "frais_professionnels_deduites": frais_deduites,
        "revenus_nets_imposables": revenus_nets_imposables,
        "quotites_exemptees": quotites,
        "base_imposable": round(base_imposable),
        "calcul_par_tranche": detail_tranches,
        "ipp_federal_brut": ipp_brut,
        "reductions_impot": reductions,
        "ipp_federal_net": ipp_federal_net,
        "additionnels_communaux": {
            "taux": taux_additionnels,
            "montant": additionnels,
        },
        "ipp_total": ipp_total,
        "taux_moyen_effectif": round(taux_moyen * 100, 2),
        "_note": "Avant réductions/crédits d'impôt (chèque-habitat, épargne-pension, etc.).",
    }


# ─────────────────────────────────────────────────────
# Orchestration — foyer (couple avec quotient conjugal)
# ─────────────────────────────────────────────────────

def calc_foyer(foyer_json, bareme, taux_additionnels=TAUX_ADDITIONNELS_DEFAUT):
    """
    Calcule l'IPP pour un foyer entier à partir d'un foyer.json belge.

    Gère le quotient conjugal si applicable.
    """
    f = foyer_json.get("foyer", {})
    r = foyer_json.get("revenus", {})

    situation = f.get("situation", "celibataire")
    nb_enfants = f.get("nb_enfants_charge", 0)
    nb_enfants_moins_3ans = f.get("nb_enfants_moins_3ans", 0)
    parent_isole = situation in ("divorce", "veuf", "celibataire") and nb_enfants > 0

    type_d1 = f.get("type_revenus_declarant1", "salarie")
    type_d2 = f.get("type_revenus_declarant2", "salarie")

    rev_d1_bruts = (
        r.get("salaires_declarant1", 0)
        + r.get("revenus_dirigeant_declarant1", 0)
    )
    rev_d2_bruts = (
        r.get("salaires_declarant2", 0)
        + r.get("revenus_dirigeant_declarant2", 0)
    )

    if situation in ("marie", "cohabitant_legal"):
        # Frais professionnels d'abord, puis quotient conjugal sur nets
        nets_d1, _ = frais_professionnels(rev_d1_bruts, type_d1, bareme)
        nets_d2, _ = frais_professionnels(rev_d2_bruts, type_d2, bareme)
        nets_d1_qc, nets_d2_qc, transfert = quotient_conjugal(nets_d1, nets_d2, bareme)

        # Calcul par contribuable (sans re-déduire les frais pro déjà appliqués)
        # On passe les nets comme "bruts" avec taux 0 % pour éviter la double déduction
        def _calc_sur_nets(nets, nb_enf, nb_enf_m3, parent_iso, taux_add):
            quotites = calc_quotites_exemptees(nb_enf, nb_enf_m3, bareme, parent_iso)
            base = max(0, nets - quotites["total"])
            ipp_brut, detail = impot_sur_base(base, bareme["bareme_ipp"]["tranches"])
            reductions = 0
            ipp_net = max(0, ipp_brut - reductions)
            additionnels = round(ipp_net * taux_add)
            ipp_total = ipp_net + additionnels
            taux_moyen = (ipp_total / nets) if nets > 0 else 0.0
            return {
                "revenus_nets_imposables": round(nets),
                "quotites_exemptees": quotites,
                "base_imposable": round(base),
                "calcul_par_tranche": detail,
                "ipp_federal_brut": ipp_brut,
                "reductions_impot": reductions,
                "ipp_federal_net": ipp_net,
                "additionnels_communaux": {"taux": taux_add, "montant": additionnels},
                "ipp_total": ipp_total,
                "taux_moyen_effectif": round(taux_moyen * 100, 2),
            }

        # Les enfants sont rattachés au déclarant 1 (convention simplifiée)
        res_d1 = _calc_sur_nets(nets_d1_qc, nb_enfants, nb_enfants_moins_3ans, parent_isole, taux_additionnels)
        res_d2 = _calc_sur_nets(nets_d2_qc, 0, 0, False, taux_additionnels)

        ipp_foyer_total = res_d1["ipp_total"] + res_d2["ipp_total"]
        revenus_bruts_total = rev_d1_bruts + rev_d2_bruts
        taux_moyen_foyer = (ipp_foyer_total / revenus_bruts_total) if revenus_bruts_total > 0 else 0.0

        return {
            "situation": situation,
            "quotient_conjugal": {
                "applique": transfert > 0,
                "transfert": transfert,
            },
            "declarant1": {
                "revenus_bruts": round(rev_d1_bruts),
                "frais_professionnels_deduites": round(nets_d1 - (nets_d1_qc + transfert if transfert > 0 and rev_d1_bruts >= rev_d2_bruts else 0)),
                **res_d1,
            },
            "declarant2": {
                "revenus_bruts": round(rev_d2_bruts),
                **res_d2,
            },
            "foyer_total": {
                "revenus_bruts_total": round(revenus_bruts_total),
                "ipp_federal_net_total": res_d1["ipp_federal_net"] + res_d2["ipp_federal_net"],
                "additionnels_communaux_total": (
                    res_d1["additionnels_communaux"]["montant"]
                    + res_d2["additionnels_communaux"]["montant"]
                ),
                "ipp_total": ipp_foyer_total,
                "taux_moyen_effectif": round(taux_moyen_foyer * 100, 2),
            },
            "_note": "Avant réductions/crédits d'impôt (chèque-habitat, épargne-pension, etc.).",
        }
    else:
        # Célibataire / isolé : calcul simple sur le déclarant 1
        return calc_contribuable(
            revenus_bruts=rev_d1_bruts,
            nb_enfants=nb_enfants,
            nb_enfants_moins_3ans=nb_enfants_moins_3ans,
            bareme=bareme,
            type_contribuable=type_d1,
            parent_isole=parent_isole,
            taux_additionnels=taux_additionnels,
        )


# ─────────────────────────────────────────────────────
# Affichage texte
# ─────────────────────────────────────────────────────

def print_result(result):
    """Affiche le résultat de manière lisible."""
    print()
    # Foyer (couple)
    if "foyer_total" in result:
        print(f"  Situation ...................... {result['situation']}")
        qc = result["quotient_conjugal"]
        if qc["applique"]:
            print(f"  Quotient conjugal .............. transfert {qc['transfert']:,} €")

        for label, key in [("Déclarant 1", "declarant1"), ("Déclarant 2", "declarant2")]:
            d = result[key]
            print(f"\n  ── {label} ──")
            print(f"  Revenus bruts .................. {d['revenus_bruts']:>10,} €")
            print(f"  Revenus nets imposables ......... {d['revenus_nets_imposables']:>10,} €")
            q = d["quotites_exemptees"]
            print(f"  Quotités exemptées ............. {q['total']:>10,} €")
            print(f"  Base imposable ................. {d['base_imposable']:>10,} €")
            print(f"  IPP fédéral brut ............... {d['ipp_federal_brut']:>10,} €")
            print(f"  IPP fédéral net ................ {d['ipp_federal_net']:>10,} €")
            ac = d["additionnels_communaux"]
            print(f"  Additionnels communaux ({ac['taux']*100:.1f}%) .. {ac['montant']:>10,} €")
            print(f"  IPP total ....................... {d['ipp_total']:>10,} €")
            print(f"  Taux moyen effectif ............ {d['taux_moyen_effectif']:>9.1f} %")

        ft = result["foyer_total"]
        print(f"\n  ── Foyer total ──")
        print(f"  Revenus bruts totaux ........... {ft['revenus_bruts_total']:>10,} €")
        print(f"  IPP fédéral net total .......... {ft['ipp_federal_net_total']:>10,} €")
        print(f"  Additionnels communaux total ... {ft['additionnels_communaux_total']:>10,} €")
        print(f"  ─────────────────────────────────────────────────")
        print(f"  IPP TOTAL FOYER ................. {ft['ipp_total']:>10,} €")
        print(f"  Taux moyen effectif foyer ...... {ft['taux_moyen_effectif']:>9.1f} %")
    else:
        # Contribuable seul
        q = result["quotites_exemptees"]
        print(f"  Revenus bruts .................. {result['revenus_bruts']:>10,} €")
        print(f"  Frais professionnels déduits ... {-result['frais_professionnels_deduites']:>10,} €")
        print(f"  Revenus nets imposables ........ {result['revenus_nets_imposables']:>10,} €")
        print(f"  Quotités exemptées (base) ...... {q['base']:>10,} €")
        if q["supplement_enfants"]:
            print(f"    └ supplément {q['detail_enfants']['nb_enfants']} enfant(s) ........ {q['supplement_enfants']:>10,} €")
        if q["supplement_moins_3ans"]:
            print(f"    └ enfant < 3 ans .............. {q['supplement_moins_3ans']:>10,} €")
        print(f"  Quotités totales ............... {q['total']:>10,} €")
        print(f"  Base imposable ................. {result['base_imposable']:>10,} €")
        print()
        for t in result["calcul_par_tranche"]:
            print(f"    {t['tranche']:<22} @{t['taux']*100:.0f}%  →  {t['montant']:>8,} €")
        print()
        print(f"  IPP fédéral brut ............... {result['ipp_federal_brut']:>10,} €")
        if result["reductions_impot"]:
            print(f"  Réductions d'impôt ............. {-result['reductions_impot']:>10,} €")
        print(f"  IPP fédéral net ................ {result['ipp_federal_net']:>10,} €")
        ac = result["additionnels_communaux"]
        print(f"  Additionnels communaux ({ac['taux']*100:.1f}%) .. {ac['montant']:>10,} €")
        print(f"  ─────────────────────────────────────────────────")
        print(f"  IPP TOTAL ...................... {result['ipp_total']:>10,} €")
        print(f"  Taux moyen effectif ............ {result['taux_moyen_effectif']:>9.1f} %")
    print()
    print(f"  Simulateur officiel : https://eservices.minfin.fgov.be/myminfin-web/pages/public/simulation")
    print()


# ─────────────────────────────────────────────────────
# CLI
# ─────────────────────────────────────────────────────

def main():
    p = argparse.ArgumentParser(
        description="Calculateur IPP belge déterministe — revenus 2025 (déclaration 2026)"
    )
    p.add_argument("--revenus-nets", type=float, help="Revenus bruts professionnels (avant frais forfaitaires)")
    p.add_argument("--enfants", type=int, default=0, help="Nombre d'enfants à charge")
    p.add_argument("--enfants-moins-3ans", type=int, default=0, help="Dont enfants de moins de 3 ans")
    p.add_argument("--type", choices=["salarie", "dirigeant"], default="salarie",
                   help="Type de contribuable pour les frais professionnels")
    taux_defaut_str = f"{TAUX_ADDITIONNELS_DEFAUT*100:.0f}%%"
    p.add_argument("--additionnels", type=float, default=TAUX_ADDITIONNELS_DEFAUT,
                   help=f"Taux d'additionnels communaux (défaut {taux_defaut_str})")
    p.add_argument("--foyer", type=str, help="Chemin vers un foyer.json")
    p.add_argument("--bareme", type=str, default=str(DEFAULT_BAREME),
                   help="Chemin vers le barème IPP JSON")
    p.add_argument("--json", action="store_true", help="Sortie JSON structurée")
    args = p.parse_args()

    bareme = load_json(args.bareme)

    if args.foyer:
        foyer_json = load_json(args.foyer)
        result = calc_foyer(foyer_json, bareme, args.additionnels)
    elif args.revenus_nets is not None:
        result = calc_contribuable(
            revenus_bruts=args.revenus_nets,
            nb_enfants=args.enfants,
            nb_enfants_moins_3ans=args.enfants_moins_3ans,
            bareme=bareme,
            type_contribuable=args.type,
            taux_additionnels=args.additionnels,
        )
    else:
        p.error("Fournir --revenus-nets ou --foyer")

    if args.json:
        print(json.dumps(result, indent=2, ensure_ascii=False))
    else:
        print_result(result)


if __name__ == "__main__":
    main()
