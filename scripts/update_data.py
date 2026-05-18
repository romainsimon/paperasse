#!/usr/bin/env python3
"""
Verifie la fraicheur des donnees fiscales et comptables belges.
Met a jour les fichiers data/ si necessaire.

Utilisation :
    python scripts/update_data.py              # Verifier + mise a jour
    python scripts/update_data.py --check      # Verifier uniquement, sans telechargement
    python scripts/update_data.py --force      # Forcer le re-telechargement

Sources belges :
    - Bareme IPP : finances.belgium.be (annuel)
    - PCMN       : cnc-cbn.be (modifications rares)
    - ISOC 275   : finances.belgium.be (annuel)
    - Precompte mobilier : fisconetplus.be (annuel)
    - Coefficient indexation RC : finances.belgium.be (annuel)

Note sur les telechargements automatiques :
    Le PCMN (Plan Comptable Minimum Normalise) est publie par la CNC-CBN
    (Commission des Normes Comptables / Commissie voor Boekhoudkundige Normen).
    Il evolue rarement — les modifications sont rares et font l'objet d'avis officiels.
    Les baremes IPP et ISOC sont fixes annuellement par la loi-programme ou la LF belge.
    Ce script verifie la fraicheur et rappelle les actions manuelles necessaires.
"""

import json
import os
import re
import sys
import urllib.request
import urllib.error
from datetime import datetime, date
from pathlib import Path

# ──────────────────────────────────────────────
# Configuration
# ──────────────────────────────────────────────

REPO_ROOT = Path(__file__).parent.parent
DATA_DIR = REPO_ROOT / "data"
SOURCES_FILE = DATA_DIR / "sources.json"
SKILL_MAX_AGE_DAYS = 180         # 6 mois
DATA_ANNUAL_MAX_AGE_DAYS = 400   # ~13 mois pour les sources annuelles
DATA_OTHER_MAX_AGE_DAYS = 180    # 6 mois pour les autres

# ANSI
RED = "\033[91m"
YELLOW = "\033[93m"
GREEN = "\033[92m"
CYAN = "\033[96m"
BOLD = "\033[1m"
DIM = "\033[2m"
RESET = "\033[0m"


# ──────────────────────────────────────────────
# Fraicheur des skills
# ──────────────────────────────────────────────

def find_skills():
    """Trouve tous les fichiers SKILL.md dans le depot."""
    skills = []
    for item in REPO_ROOT.iterdir():
        if item.is_dir() and (item / "SKILL.md").exists():
            skills.append(item)
    return sorted(skills, key=lambda p: p.name)


def parse_skill_date(skill_path: Path) -> date | None:
    """Extrait la date last_updated du frontmatter SKILL.md."""
    content = (skill_path / "SKILL.md").read_text(encoding="utf-8")
    match = re.search(r"last_updated:\s*(\d{4}-\d{2}-\d{2})", content)
    if match:
        return datetime.strptime(match.group(1), "%Y-%m-%d").date()
    return None


def check_skills():
    """Verifie la fraicheur de tous les skills."""
    print(f"\n{BOLD}1. SKILLS{RESET}")
    print("=" * 60)

    skills = find_skills()
    if not skills:
        print(f"  {YELLOW}Aucun skill trouve{RESET}")
        return []

    issues = []
    today = date.today()

    for skill_path in skills:
        name = skill_path.name
        last_updated = parse_skill_date(skill_path)

        if not last_updated:
            print(f"  {YELLOW}o {name:<35}{RESET} pas de date last_updated")
            issues.append(("skill", name, "no_date"))
            continue

        age = (today - last_updated).days

        if age > SKILL_MAX_AGE_DAYS:
            print(f"  {RED}[OBSOLETE] {name:<30}{RESET} {last_updated} ({age}j)")
            issues.append(("skill", name, "stale"))
        elif age > SKILL_MAX_AGE_DAYS // 2:
            print(f"  {YELLOW}[AVERTIS.] {name:<30}{RESET} {last_updated} ({age}j)")
            issues.append(("skill", name, "warning"))
        else:
            print(f"  {GREEN}[OK]       {name:<30}{RESET} {last_updated} ({age}j)")

    return issues


# ──────────────────────────────────────────────
# Sources de donnees
# ──────────────────────────────────────────────

def load_sources() -> list:
    """Charge le manifeste sources.json."""
    if not SOURCES_FILE.exists():
        print(f"  {RED}sources.json introuvable{RESET}")
        return []
    with open(SOURCES_FILE, encoding="utf-8") as f:
        return json.load(f)["sources"]


def check_data_sources():
    """Verifie la fraicheur des fichiers de donnees declares dans sources.json."""
    print(f"\n{BOLD}2. DONNEES{RESET}")
    print("=" * 60)

    sources = load_sources()
    issues = []
    today = date.today()

    for src in sources:
        name = src["name"]
        file_name = src.get("file")
        last_fetched = src.get("last_fetched")
        freq = src.get("update_frequency", "unknown")

        # Age maximal selon la frequence
        if freq in ("annual", "rare"):
            max_age = DATA_ANNUAL_MAX_AGE_DAYS
        else:
            max_age = DATA_OTHER_MAX_AGE_DAYS

        # Source API sans fichier local
        if not file_name:
            print(f"  {DIM}  {name:<40}{RESET} {DIM}(API, pas de fichier local){RESET}")
            continue

        file_path = DATA_DIR / file_name

        # Fichier manquant
        if not file_path.exists():
            print(f"  {RED}[MANQUANT] {name:<35}{RESET} {file_name}")
            issues.append(("data", name, "missing"))
            continue

        # Verifier l'age
        if last_fetched:
            fetched_date = datetime.strptime(last_fetched, "%Y-%m-%d").date()
            age = (today - fetched_date).days

            if age > max_age:
                print(f"  {RED}[OBSOLETE] {name:<35}{RESET} {last_fetched} ({age}j)")
                issues.append(("data", name, "stale"))
            elif age > max_age // 2:
                print(f"  {YELLOW}[AVERTIS.] {name:<35}{RESET} {last_fetched} ({age}j)")
                issues.append(("data", name, "warning"))
            else:
                size = file_path.stat().st_size
                size_str = f"{size/1024:.0f}KB" if size > 1024 else f"{size}B"
                print(f"  {GREEN}[OK]       {name:<35}{RESET} {last_fetched} ({age}j) [{size_str}]")
        else:
            print(f"  {YELLOW}[?]        {name:<35}{RESET} pas de date last_fetched")
            issues.append(("data", name, "no_date"))

    return issues


def update_pcmn(sources: list, force: bool = False) -> bool:
    """
    Verifie la disponibilite du PCMN (Plan Comptable Minimum Normalise belge).

    Le PCMN est publie par la CNC-CBN (Commission des Normes Comptables).
    Il n'existe pas de flux automatique officiel — les mises a jour sont rares
    et publiees sous forme d'avis sur https://www.cnc-cbn.be.

    Cette fonction verifie uniquement que le fichier pcmn.json existe
    et est a jour. Elle ne tente pas de telechargement automatique.
    """
    src = next((s for s in sources if s["id"] in ("pcmn", "pcg")), None)
    if not src:
        print(f"  {DIM}PCMN : non configure dans sources.json{RESET}")
        return False

    file_name = src.get("file", "")
    file_path = DATA_DIR / file_name if file_name else None

    if file_path and file_path.exists():
        size = file_path.stat().st_size
        last = src.get("last_fetched", "?")
        print(f"  {GREEN}PCMN{RESET} : {file_name} ({size/1024:.0f}KB), last_fetched={last}")
        print(
            f"  {DIM}  -> Pour mettre a jour : verifier https://www.cnc-cbn.be/fr/avis{RESET}"
        )
        return True
    else:
        print(f"  {YELLOW}PCMN{RESET} : fichier manquant ou non configure")
        print(
            f"  {DIM}  -> Source : https://www.cnc-cbn.be (Plan Comptable Minimum Normalise){RESET}"
        )
        return False


def update_nomenclature_isoc(sources: list, force: bool = False) -> bool:
    """
    Verifie la disponibilite de la nomenclature ISOC 275 (formulaire belge).

    Cette nomenclature est publiee annuellement par le SPF Finances belge.
    Elle n'est pas disponible sous forme de fichier CSV automatiquement
    telechargeable — elle est incluse dans les instructions du formulaire 275.

    Source officielle : https://finances.belgium.be (formulaire 275 / ISOC)
    """
    src = next(
        (s for s in sources if s["id"] in ("nomenclature-isoc", "nomenclature-liasse")),
        None,
    )
    if not src:
        print(f"  {DIM}Nomenclature ISOC : non configure dans sources.json{RESET}")
        return False

    file_name = src.get("file", "")
    file_path = DATA_DIR / file_name if file_name else None

    if file_path and file_path.exists():
        last = src.get("last_fetched", "?")
        size = file_path.stat().st_size
        print(f"  {GREEN}Nomenclature ISOC{RESET} : {file_name} ({size/1024:.0f}KB), last_fetched={last}")
    else:
        print(f"  {YELLOW}Nomenclature ISOC{RESET} : fichier manquant ou non configure")
        print(
            f"  {DIM}  -> Source : https://finances.belgium.be "
            f"(formulaire 275 / instructions ISOC){RESET}"
        )

    return bool(file_path and file_path.exists())


def check_remote_availability(sources: list):
    """Verifie rapidement la disponibilite des sources distantes (HEAD)."""
    print(f"\n{BOLD}3. SOURCES DISTANTES{RESET}")
    print("=" * 60)

    urls_to_check = []
    for src in sources:
        for cle in ("source_url", "api_json", "alt_api", "api_url"):
            url = src.get(cle)
            if url and "{year}" not in url:
                label = src["name"]
                if cle != "source_url":
                    label += f" ({cle})"
                urls_to_check.append((label, url))
                break  # Un seul URL par source suffit

    for name, url in urls_to_check:
        try:
            req = urllib.request.Request(
                url,
                method="HEAD",
                headers={"User-Agent": "paperasse-be/1.0"},
            )
            with urllib.request.urlopen(req, timeout=10) as resp:
                status = resp.status
                if status == 200:
                    print(f"  {GREEN}OK  {name:<45}{RESET} {DIM}{url[:55]}{RESET}")
                else:
                    print(f"  {YELLOW}?   {name:<45}{RESET} HTTP {status}")
        except Exception as e:
            short_err = str(e)[:60]
            print(f"  {RED}NOK {name:<45}{RESET} {short_err}")


def save_sources(sources: list):
    """Ecrit le manifeste sources.json mis a jour."""
    with open(SOURCES_FILE, "w", encoding="utf-8") as f:
        json.dump({"sources": sources}, f, indent=2, ensure_ascii=False)
        f.write("\n")


# ──────────────────────────────────────────────
# Principal
# ──────────────────────────────────────────────

def main():
    check_only = "--check" in sys.argv
    force = "--force" in sys.argv

    print(f"\n{BOLD}{'='*60}{RESET}")
    print(f"{BOLD}  PAPERASSE-BE — Verification des donnees belges{RESET}")
    print(f"{BOLD}  {date.today().isoformat()}{RESET}")
    print(f"{BOLD}{'='*60}{RESET}")

    # 1. Fraicheur des skills
    skill_issues = check_skills()

    # 2. Fraicheur des donnees
    data_issues = check_data_sources()

    # 3. Verification locale PCMN + nomenclature ISOC (sans telechargement auto)
    if not check_only:
        sources = load_sources()

        print(f"\n{BOLD}VERIFICATION FICHIERS BELGES{RESET}")
        print("=" * 60)
        update_pcmn(sources, force)
        update_nomenclature_isoc(sources, force)

    # 4. Disponibilite des sources distantes
    sources = load_sources()
    check_remote_availability(sources)

    # Resume
    all_issues = skill_issues + data_issues
    stale = [i for i in all_issues if i[2] in ("stale", "missing")]
    warnings = [i for i in all_issues if i[2] in ("warning", "no_date")]

    print(f"\n{BOLD}RESUME{RESET}")
    print("=" * 60)

    if not all_issues:
        print(f"  {GREEN}Tout est a jour.{RESET}")
    else:
        if stale:
            print(f"  {RED}[OBSOLETE/MANQUANT] {len(stale)} element(s){RESET}")
            for typ, name, _ in stale:
                print(f"     - [{typ}] {name}")
        if warnings:
            print(f"  {YELLOW}[AVERTISSEMENT] {len(warnings)} element(s){RESET}")

    if stale:
        print(f"\n  {BOLD}Actions necessaires :{RESET}")
        print("  - Bareme IPP      : https://finances.belgium.be")
        print("  - ISOC 275        : https://finances.belgium.be (formulaire 275)")
        print("  - Precompte mob.  : https://fisconetplus.be")
        print("  - PCMN / CNC-CBN  : https://www.cnc-cbn.be/fr/avis")
        print("  - Coeff. index RC : https://finances.belgium.be")
        print("  - BCE / KBO       : https://kbopub.economie.fgov.be")
        print("  - Apres maj, mettre a jour last_updated dans les SKILL.md concernes")
        print("  - Relancer : python scripts/update_data.py --force")

    print()

    # Code de retour
    if stale:
        sys.exit(2)
    elif warnings:
        sys.exit(1)
    sys.exit(0)


if __name__ == "__main__":
    main()
