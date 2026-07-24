#!/usr/bin/env python3
"""
Oracle DGFIP — interroge le simulateur officiel IR-IFI 2026 et parse la réponse.

À UTILISER UNIQUEMENT POUR LES EVALS OU LA VÉRIFICATION MANUELLE.
Pas en runtime dans le skill (dépendance réseau + brittle + TOS).

Le simulateur officiel se trouve à :
    https://simulateur-ir-ifi.impots.gouv.fr/calcul_impot/2026/

Et accepte des POST sur son endpoint CGI :
    https://simulateur-ir-ifi.impots.gouv.fr/cgi-bin/calc-2026.cgi

Les champs attendus sont les cases 2042 (ex: 1AJ, 1BJ, 2DC, 6NS, 0AM, 0AV, F, G).

Usage:
    # Soumet un fichier JSON {case: valeur}
    python fiscaliste/scripts/dgfip_oracle.py --input eval1.json

    # Inline
    python fiscaliste/scripts/dgfip_oracle.py --cases '{"0AM":1,"1AJ":50000}'

Sortie :
    JSON avec les champs principaux extraits de la réponse HTML
    (IRNET, IRBRUT, TOTPAC, RNI, RFR…).

Note sur la stabilité :
    - Le simulateur DGFIP change chaque année (URL `calcul_impot/XXXX`).
    - Le format HTML peut évoluer — re-vérifier les sélecteurs.
    - Limiter les appels (ne pas spammer : ne pas faire plus de quelques dizaines
      d'appels par session).

LIMITATION CONNUE (TODO) :
    Les cases 2042 standard (1AJ, 0AM, 0DA) ne suffisent PAS à elles seules. Le
    simulateur attend aussi des champs "pre_*" (situation_famille, residence…)
    et souvent des champs cachés du formulaire HTML (`v_PLS_*`, `v_0*`).
    Avant de l'utiliser comme oracle fiable :
      1. Charger https://simulateur-ir-ifi.impots.gouv.fr/calcul_impot/2026/
      2. Ouvrir les devtools, remplir le formulaire, soumettre, et noter
         l'ensemble des noms de champ envoyés dans la requête POST.
      3. Compléter les valeurs par défaut à ajouter automatiquement dans `submit()`.
"""

import argparse
import json
import re
import sys
import urllib.parse
import urllib.request
from pathlib import Path

SIMULATOR_URL = "https://simulateur-ir-ifi.impots.gouv.fr/cgi-bin/calc-2026.cgi"
DEFAULT_HEADERS = {
    "User-Agent": "paperasse-fiscaliste-eval/1.0 (+https://github.com/romainsimon/paperasse)",
    "Accept": "text/html,application/xhtml+xml",
    "Accept-Language": "fr,en;q=0.8",
}


def submit(cases: dict) -> str:
    """POST les cases au CGI et retourne le HTML brut."""
    # Les champs sont encodés en form-urlencoded
    # Le CGI attend les noms de case (1AJ, 1BJ, etc.) comme noms de champ
    body = urllib.parse.urlencode({str(k).upper(): str(v) for k, v in cases.items()})
    req = urllib.request.Request(
        SIMULATOR_URL,
        data=body.encode("latin-1"),
        method="POST",
        headers={**DEFAULT_HEADERS, "Content-Type": "application/x-www-form-urlencoded"},
    )
    with urllib.request.urlopen(req, timeout=30) as resp:
        return resp.read().decode("latin-1", errors="replace")


def parse(html: str) -> dict:
    """Extrait les valeurs clés de la réponse HTML du simulateur."""
    # Le simulateur affiche les résultats dans des balises <input name="CODE" value="XXX">
    # Exemple : <input name="IRNET" value="6604">
    patterns = {
        "IRBRUT": r'name="IRBRUT"[^>]*value="([^"]*)"',
        "IRNET": r'name="IRNET"[^>]*value="([^"]*)"',
        "IRTOT": r'name="IRTOT"[^>]*value="([^"]*)"',
        "IRTOTAL": r'name="IRTOTAL"[^>]*value="([^"]*)"',
        "DEC": r'name="DEC"[^>]*value="([^"]*)"',
        "RNICOL": r'name="RNICOL"[^>]*value="([^"]*)"',
        "RFRN": r'name="RFRN"[^>]*value="([^"]*)"',
        "IINETIR": r'name="IINETIR"[^>]*value="([^"]*)"',
        "PPETOT": r'name="PPETOT"[^>]*value="([^"]*)"',
        "NBPT": r'name="NBPT"[^>]*value="([^"]*)"',
    }
    result = {}
    for key, pat in patterns.items():
        m = re.search(pat, html)
        if m:
            val = m.group(1).strip()
            try:
                result[key] = float(val.replace(",", "."))
            except ValueError:
                result[key] = val
    return result


def main():
    p = argparse.ArgumentParser(description="DGFIP simulator oracle — for evals only")
    p.add_argument("--input", help="Fichier JSON des cases à soumettre")
    p.add_argument("--cases", help="JSON inline, ex: '{\"0AM\":1,\"1AJ\":50000}'")
    p.add_argument("--raw", action="store_true", help="Affiche le HTML brut")
    args = p.parse_args()

    if args.input:
        with open(args.input) as f:
            cases = json.load(f)
    elif args.cases:
        cases = json.loads(args.cases)
    else:
        p.error("Fournir --input ou --cases")

    print(f"# Submitting {len(cases)} cases to DGFIP simulator...", file=sys.stderr)
    html = submit(cases)
    print(f"# Received {len(html)} chars of HTML.", file=sys.stderr)

    if args.raw:
        print(html)
        return

    parsed = parse(html)
    print(json.dumps({"input": cases, "output": parsed}, indent=2, ensure_ascii=False))


if __name__ == "__main__":
    main()
