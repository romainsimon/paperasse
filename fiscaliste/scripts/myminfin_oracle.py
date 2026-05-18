#!/usr/bin/env python3
"""
Oracle MyMinfin — vérification de calculs IPP belges.

Contrairement au simulateur DGFIP français, MyMinfin (myminfin.be) ne dispose
pas d'un endpoint public permettant la soumission automatisée de déclarations.

Alternatives :
    1. Simulateur officiel SPF Finances (manuel) :
       https://eservices.minfin.fgov.be/myminfin-web/pages/public/simulation

    2. Vérification via calc_ipp.py (ce repo) :
       python fiscaliste/scripts/calc_ipp.py --revenus-nets 45000 --enfants 2 --json

Usage:
    python fiscaliste/scripts/myminfin_oracle.py --foyer foyer.example.json
    python fiscaliste/scripts/myminfin_oracle.py --revenus-nets 45000 --enfants 0

Ce script est un wrapper autour de calc_ipp.py. Il fournit une sortie lisible
et rappelle l'URL du simulateur officiel pour vérification manuelle.

Pourquoi pas d'API automatique ?
    - SPF Finances / MyMinfin ne fournit pas d'API publique documentée.
    - L'interface Tax-on-web (https://tax-on-web.be) est authentifiée via
      eID / itsme et ne permet pas la soumission programmatique.
    - Contrairement à la DGFIP (simulateur-ir-ifi.impots.gouv.fr), il n'existe
      pas de formulaire CGI public accessible sans session authentifiée.
"""

import argparse
import json
import subprocess
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).parent.parent
SCRIPT_CALC_IPP = Path(__file__).parent / "calc_ipp.py"

MYMINFIN_URL = "https://eservices.minfin.fgov.be/myminfin-web/pages/public/simulation"


def verify_with_calc_ipp(foyer_json_path=None, revenus_nets=None, enfants=0,
                          additionnels=0.07, type_contribuable="salarie"):
    """
    Lance calc_ipp.py et retourne les résultats pour vérification croisée.

    Paramètres :
        foyer_json_path : chemin vers un fichier foyer.json (str ou Path)
        revenus_nets    : revenus bruts professionnels en euros (float)
        enfants         : nombre d'enfants à charge (int)
        additionnels    : taux d'additionnels communaux (float, ex: 0.07)
        type_contribuable : 'salarie' ou 'dirigeant'

    Retourne :
        dict contenant les résultats de calc_ipp.py ou un dict d'erreur.
    """
    cmd = [sys.executable, str(SCRIPT_CALC_IPP), "--json"]

    if foyer_json_path:
        cmd += ["--foyer", str(foyer_json_path)]
    elif revenus_nets is not None:
        cmd += [
            "--revenus-nets", str(revenus_nets),
            "--enfants", str(enfants),
            "--additionnels", str(additionnels),
            "--type", type_contribuable,
        ]
    else:
        raise ValueError("Fournir foyer_json_path ou revenus_nets")

    try:
        proc = subprocess.run(cmd, capture_output=True, text=True, timeout=30)
        if proc.returncode != 0:
            return {
                "erreur": "calc_ipp.py a retourné une erreur",
                "detail": proc.stderr.strip(),
            }
        return json.loads(proc.stdout)
    except subprocess.TimeoutExpired:
        return {"erreur": "Timeout — calc_ipp.py n'a pas répondu dans les 30 secondes"}
    except json.JSONDecodeError as e:
        return {
            "erreur": "Sortie JSON invalide",
            "detail": str(e),
            "stdout": proc.stdout[:500],
        }


def print_verification(result, revenus_nets=None, foyer_path=None):
    """Affiche les résultats avec un rappel vers le simulateur officiel."""
    print()
    print("=" * 72)
    print("  ORACLE IPP BELGE — vérification via calc_ipp.py")
    print("=" * 72)

    if "erreur" in result:
        print(f"\n  ERREUR : {result['erreur']}")
        if "detail" in result:
            print(f"  Détail : {result['detail']}")
        sys.exit(1)

    # Résultat foyer ou contribuable seul
    if "foyer_total" in result:
        ft = result["foyer_total"]
        print(f"\n  IPP fédéral net total .......... {ft['ipp_federal_net_total']:>10,} €")
        print(f"  Additionnels communaux total ... {ft['additionnels_communaux_total']:>10,} €")
        print(f"  IPP TOTAL FOYER ................ {ft['ipp_total']:>10,} €")
        print(f"  Taux moyen effectif ............ {ft['taux_moyen_effectif']:>9.1f} %")
    else:
        print(f"\n  Revenus nets imposables ........ {result.get('revenus_nets_imposables', '?'):>10,} €")
        print(f"  Base imposable ................. {result.get('base_imposable', '?'):>10,} €")
        print(f"  IPP fédéral net ................ {result.get('ipp_federal_net', '?'):>10,} €")
        ac = result.get("additionnels_communaux", {})
        taux_str = f"{ac.get('taux', 0)*100:.1f}%" if ac else "?"
        print(f"  Additionnels communaux ({taux_str}) .. {ac.get('montant', '?'):>10,} €")
        print(f"  IPP TOTAL ...................... {result.get('ipp_total', '?'):>10,} €")
        print(f"  Taux moyen effectif ............ {result.get('taux_moyen_effectif', '?'):>9} %")

    print()
    print("  " + "─" * 68)
    print(f"  NOTE : Ces résultats sont fournis par calc_ipp.py (calcul déterministe).")
    print(f"  Pour vérification officielle, utiliser le simulateur SPF Finances :")
    print(f"  {MYMINFIN_URL}")
    print()
    print(f"  MyMinfin (myminfin.be) et Tax-on-web ne disposent pas d'API publique.")
    print(f"  La vérification automatisée n'est pas possible sans session eID / itsme.")
    print("=" * 72)
    print()


# ─────────────────────────────────────────────────────
# CLI
# ─────────────────────────────────────────────────────

def main():
    p = argparse.ArgumentParser(
        description=(
            "Oracle IPP belge — wrapper autour de calc_ipp.py. "
            "Rappel : aucune API MyMinfin publique n'existe."
        )
    )
    p.add_argument("--foyer", type=str, help="Chemin vers un foyer.json")
    p.add_argument("--revenus-nets", type=float, help="Revenus bruts professionnels")
    p.add_argument("--enfants", type=int, default=0, help="Nombre d'enfants à charge")
    p.add_argument("--additionnels", type=float, default=0.07,
                   help="Taux d'additionnels communaux (defaut 7%%)")
    p.add_argument("--type", choices=["salarie", "dirigeant"], default="salarie")
    p.add_argument("--json", action="store_true", help="Sortie JSON brute de calc_ipp.py")
    args = p.parse_args()

    if not args.foyer and args.revenus_nets is None:
        p.error("Fournir --foyer ou --revenus-nets")

    result = verify_with_calc_ipp(
        foyer_json_path=args.foyer,
        revenus_nets=args.revenus_nets,
        enfants=args.enfants,
        additionnels=args.additionnels,
        type_contribuable=args.type,
    )

    if args.json:
        print(json.dumps(result, indent=2, ensure_ascii=False))
    else:
        print_verification(result)


if __name__ == "__main__":
    main()
