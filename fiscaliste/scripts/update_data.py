#!/usr/bin/env python3
"""
Verifie la fraicheur des donnees fiscales et comptables belges.
Met a jour les fichiers data/ si necessaire.

Sources belges :
    - Bareme IPP : finances.belgium.be (annuel)
    - PCMN       : cnc-cbn.be (modifications rares)
    - ISOC 275   : finances.belgium.be (annuel)
    - Precompte mobilier : fisconetplus.be (annuel)
    - Coefficient indexation RC : finances.belgium.be (annuel)

Utilisation :
    python fiscaliste/scripts/update_data.py           # Verifier la fraicheur
    python fiscaliste/scripts/update_data.py --check   # Meme effet (defaut)

Le bareme IPP (Impot des Personnes Physiques) n'est pas telechargeable
automatiquement : il est fixe annuellement par la loi-programme belge
ou la loi de finances (vote en decembre N pour revenus N).
Ce script rappelle quelles donnees doivent etre mises a jour manuellement
apres chaque loi-programme / loi de finances belge.

Sources a verifier manuellement :
    - IPP / bareme : https://finances.belgium.be
    - Precompte mobilier : https://fisconetplus.be
    - ISOC 275 : https://finances.belgium.be (formulaire 275)
    - PCMN : https://www.cnc-cbn.be/fr/avis
    - Coefficient indexation RC : https://finances.belgium.be
    - Legislation : https://www.ejustice.just.fgov.be (Moniteur belge)
"""

import json
import sys
import re
from datetime import datetime, date
from pathlib import Path

REPO_ROOT = Path(__file__).parent.parent
DATA_DIR = REPO_ROOT / "data"
SOURCES_FILE = DATA_DIR / "sources.json"

RED = "\033[91m"
YELLOW = "\033[93m"
GREEN = "\033[92m"
CYAN = "\033[96m"
BOLD = "\033[1m"
DIM = "\033[2m"
RESET = "\033[0m"

# Age maximal selon la frequence de mise a jour
ANNUAL_MAX_AGE_DAYS = 400   # ~13 mois pour les sources annuelles
RARE_MAX_AGE_DAYS = 730     # 2 ans pour les sources stables


def load_sources() -> list:
    """Charge le manifeste sources.json du skill fiscaliste."""
    if not SOURCES_FILE.exists():
        print(f"{RED}sources.json introuvable a {SOURCES_FILE}{RESET}")
        sys.exit(1)
    with open(SOURCES_FILE, encoding="utf-8") as f:
        return json.load(f)["sources"]


def check_skill_freshness():
    """Verifie la fraicheur de SKILL.md (date last_updated)."""
    skill = REPO_ROOT / "SKILL.md"
    if not skill.exists():
        return
    content = skill.read_text(encoding="utf-8")
    m = re.search(r"last_updated:\s*(\d{4}-\d{2}-\d{2})", content)
    if not m:
        print(f"  {YELLOW}SKILL.md : pas de last_updated{RESET}")
        return
    d = datetime.strptime(m.group(1), "%Y-%m-%d").date()
    age = (date.today() - d).days
    color = GREEN if age < 90 else (YELLOW if age < 180 else RED)
    print(f"  {color}SKILL.md{RESET} last_updated = {m.group(1)} ({age}j)")


def check_sources() -> tuple[list, list]:
    """
    Verifie la fraicheur de chaque source declaree dans sources.json.

    Retourne (stale, warn) : listes de tuples (nom, message).
    """
    sources = load_sources()
    today = date.today()
    stale = []
    warn = []

    for src in sources:
        name = src["name"]
        freq = src.get("update_frequency", "unknown")
        last = src.get("last_fetched")
        next_check = src.get("next_check")

        max_age = ANNUAL_MAX_AGE_DAYS if freq in ("annual",) else RARE_MAX_AGE_DAYS

        # Verifier la date next_check (plus explicite qu'un age calcule)
        if next_check:
            try:
                nc = datetime.strptime(next_check, "%Y-%m-%d").date()
                days_until = (nc - today).days
                if days_until < 0:
                    stale.append((name, f"next_check depassee le {next_check} ({-days_until}j)"))
                elif days_until < 30:
                    warn.append((name, f"next_check dans {days_until}j"))
            except ValueError:
                pass

        if not last:
            warn.append((name, "pas de last_fetched"))
            continue

        fetched = datetime.strptime(last, "%Y-%m-%d").date()
        age = (today - fetched).days

        # Verifier la presence du fichier local
        file_name = src.get("file")
        if file_name:
            path = DATA_DIR / file_name
            if not path.exists():
                stale.append((name, f"fichier manquant : {file_name}"))
                continue

        status_color = GREEN
        if age > max_age:
            status_color = RED
            stale.append((name, f"donnees {age}j, max {max_age}"))
        elif age > max_age // 2:
            status_color = YELLOW

        label = f"{freq:>10}"
        print(f"  {status_color}[+]{RESET} {name:<52} {DIM}{label}{RESET}  {last} ({age}j)")

    return stale, warn


def main():
    print(f"\n{BOLD}FISCALISTE BELGE — Fraicheur des donnees{RESET}")
    print("=" * 72)

    print(f"\n{BOLD}Skill{RESET}")
    check_skill_freshness()

    print(f"\n{BOLD}Sources de donnees{RESET}")
    stale, warn = check_sources()

    print(f"\n{BOLD}Synthese{RESET}")
    print("=" * 72)
    if stale:
        print(f"{RED}A mettre a jour ({len(stale)}) :{RESET}")
        for name, msg in stale:
            print(f"  x {name} -- {msg}")
    if warn:
        print(f"{YELLOW}A surveiller ({len(warn)}) :{RESET}")
        for name, msg in warn:
            print(f"  ! {name} -- {msg}")
    if not stale and not warn:
        print(f"{GREEN}Tout est a jour.{RESET}")

    print(f"\n{DIM}Rappel : pas de telechargement automatique. Verifier manuellement")
    print(f"apres chaque loi-programme belge (decembre) et loi de finances.")
    print(f"Sources : finances.belgium.be, fisconetplus.be, cnc-cbn.be, nbb.be{RESET}")

    sys.exit(1 if stale else 0)


if __name__ == "__main__":
    main()
