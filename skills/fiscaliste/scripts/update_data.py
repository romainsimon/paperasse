#!/usr/bin/env python3
"""
Check freshness of fiscaliste data sources.

Usage:
    python fiscaliste/scripts/update_data.py           # Check freshness
    python fiscaliste/scripts/update_data.py --check   # Same (default)

Le barème de l'IR n'est pas téléchargeable automatiquement : il est fixé
chaque année par la Loi de Finances (vote décembre N-1 pour revenus N-1
déclarés en N). Ce script rappelle quelles données doivent être mises
à jour manuellement après chaque LFI / LFSS.

Sources vérifiées : `fiscaliste/data/sources.json`.
"""

import json
import sys
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

ANNUAL_MAX_AGE_DAYS = 400
RARE_MAX_AGE_DAYS = 730


def load_sources():
    if not SOURCES_FILE.exists():
        print(f"{RED}sources.json introuvable à {SOURCES_FILE}{RESET}")
        sys.exit(1)
    with open(SOURCES_FILE) as f:
        return json.load(f)["sources"]


def check_skill_freshness():
    skill = REPO_ROOT / "SKILL.md"
    if not skill.exists():
        return
    import re
    content = skill.read_text()
    m = re.search(r"last_updated:\s*(\d{4}-\d{2}-\d{2})", content)
    if not m:
        print(f"  {YELLOW}SKILL.md : pas de last_updated{RESET}")
        return
    d = datetime.strptime(m.group(1), "%Y-%m-%d").date()
    age = (date.today() - d).days
    color = GREEN if age < 90 else (YELLOW if age < 180 else RED)
    print(f"  {color}SKILL.md{RESET} last_updated = {m.group(1)} ({age}j)")


def check_sources():
    sources = load_sources()
    today = date.today()
    stale = []
    warn = []

    for src in sources:
        name = src["name"]
        freq = src.get("update_frequency", "unknown")
        last = src.get("last_fetched")
        next_check = src.get("next_check")

        max_age = ANNUAL_MAX_AGE_DAYS if freq == "annual" else RARE_MAX_AGE_DAYS

        # Check next_check date first (plus explicit)
        if next_check:
            try:
                nc = datetime.strptime(next_check, "%Y-%m-%d").date()
                days_until = (nc - today).days
                if days_until < 0:
                    stale.append((name, f"next_check dépassée le {next_check} ({-days_until}j)"))
                elif days_until < 30:
                    warn.append((name, f"next_check dans {days_until}j"))
            except ValueError:
                pass

        if not last:
            warn.append((name, "pas de last_fetched"))
            continue

        fetched = datetime.strptime(last, "%Y-%m-%d").date()
        age = (today - fetched).days

        file_name = src.get("file")
        if file_name:
            path = DATA_DIR / file_name
            if not path.exists():
                stale.append((name, f"fichier manquant : {file_name}"))
                continue

        status_color = GREEN
        if age > max_age:
            status_color = RED
            stale.append((name, f"data {age}j, max {max_age}"))
        elif age > max_age // 2:
            status_color = YELLOW

        label = f"{freq:>10}"
        print(f"  {status_color}●{RESET} {name:<52} {DIM}{label}{RESET}  {last} ({age}j)")

    return stale, warn


def main():
    print(f"\n{BOLD}FISCALISTE — Fraîcheur des données{RESET}")
    print("=" * 72)

    print(f"\n{BOLD}Skill{RESET}")
    check_skill_freshness()

    print(f"\n{BOLD}Sources de données{RESET}")
    stale, warn = check_sources()

    print(f"\n{BOLD}Synthèse{RESET}")
    print("=" * 72)
    if stale:
        print(f"{RED}À mettre à jour ({len(stale)}) :{RESET}")
        for name, msg in stale:
            print(f"  ✗ {name} — {msg}")
    if warn:
        print(f"{YELLOW}À surveiller ({len(warn)}) :{RESET}")
        for name, msg in warn:
            print(f"  ! {name} — {msg}")
    if not stale and not warn:
        print(f"{GREEN}Tout est à jour.{RESET}")

    print(f"\n{DIM}Rappel : pas de téléchargement automatique. Vérifier manuellement")
    print(f"après chaque LFI (décembre) et LFSS (décembre). Sources : impots.gouv.fr,")
    print(f"legifrance.gouv.fr, bofip.impots.gouv.fr.{RESET}")

    sys.exit(1 if stale else 0)


if __name__ == "__main__":
    main()
