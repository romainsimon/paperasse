#!/usr/bin/env python3
"""
Update all data sources and check freshness of skills.

Usage:
    python scripts/update_data.py              # Check freshness + update data
    python scripts/update_data.py --check      # Check only, no downloads
    python scripts/update_data.py --force      # Force re-download everything

Downloads:
    - PCG (Plan Comptable Général) JSON from GitHub/Arrhes
    - Nomenclature fiscale CSV from data.gouv.fr

Checks:
    - SKILL.md frontmatter last_updated dates (warns if > 6 months)
    - Data files last_fetched dates (warns if > 1 year for annual, > 6 months for others)
    - Availability of remote sources (HTTP HEAD check)
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
# Config
# ──────────────────────────────────────────────

REPO_ROOT = Path(__file__).parent.parent
DATA_DIR = REPO_ROOT / "data"
SOURCES_FILE = DATA_DIR / "sources.json"
SKILL_MAX_AGE_DAYS = 180  # 6 months
DATA_ANNUAL_MAX_AGE_DAYS = 400  # ~13 months for annual sources
DATA_OTHER_MAX_AGE_DAYS = 180  # 6 months for others

# ANSI
RED = "\033[91m"
YELLOW = "\033[93m"
GREEN = "\033[92m"
CYAN = "\033[96m"
BOLD = "\033[1m"
DIM = "\033[2m"
RESET = "\033[0m"


# ──────────────────────────────────────────────
# Skill freshness
# ──────────────────────────────────────────────

def find_skills():
    """Find all SKILL.md files in the repo."""
    skills = []
    for item in REPO_ROOT.iterdir():
        if item.is_dir() and (item / "SKILL.md").exists():
            skills.append(item)
    return sorted(skills, key=lambda p: p.name)


def parse_skill_date(skill_path):
    """Extract last_updated from SKILL.md frontmatter."""
    content = (skill_path / "SKILL.md").read_text()
    match = re.search(r"last_updated:\s*[\"']?(\d{4}-\d{2}-\d{2})", content)
    if match:
        return datetime.strptime(match.group(1), "%Y-%m-%d").date()
    return None


def check_skills():
    """Check freshness of all skills."""
    print(f"\n{BOLD}1. SKILLS{RESET}")
    print("=" * 60)

    skills = find_skills()
    if not skills:
        print(f"  {YELLOW}Aucun skill trouvé{RESET}")
        return []

    issues = []
    today = date.today()

    for skill_path in skills:
        name = skill_path.name
        last_updated = parse_skill_date(skill_path)

        if not last_updated:
            print(f"  {YELLOW}⚪ {name:<35}{RESET} pas de date last_updated")
            issues.append(("skill", name, "no_date"))
            continue

        age = (today - last_updated).days

        if age > SKILL_MAX_AGE_DAYS:
            print(f"  {RED}🔴 {name:<35}{RESET} {last_updated} ({age}j) OBSOLETE")
            issues.append(("skill", name, "stale"))
        elif age > SKILL_MAX_AGE_DAYS // 2:
            print(f"  {YELLOW}🟠 {name:<35}{RESET} {last_updated} ({age}j)")
            issues.append(("skill", name, "warning"))
        else:
            print(f"  {GREEN}🟢 {name:<35}{RESET} {last_updated} ({age}j)")

    return issues


# ──────────────────────────────────────────────
# Data sources
# ──────────────────────────────────────────────

def load_sources():
    """Load sources.json manifest."""
    if not SOURCES_FILE.exists():
        print(f"  {RED}sources.json introuvable{RESET}")
        return []
    with open(SOURCES_FILE) as f:
        return json.load(f)["sources"]


def check_data_sources():
    """Check freshness of data files."""
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

        # Determine max age based on frequency
        if freq == "annual":
            max_age = DATA_ANNUAL_MAX_AGE_DAYS
        else:
            max_age = DATA_OTHER_MAX_AGE_DAYS

        # No local file (API only)
        if not file_name:
            print(f"  {DIM}  {name:<35}{RESET} {DIM}(API, pas de fichier local){RESET}")
            continue

        file_path = DATA_DIR / file_name

        # File missing?
        if not file_path.exists():
            print(f"  {RED}🔴 {name:<35}{RESET} fichier manquant: {file_name}")
            issues.append(("data", name, "missing"))
            continue

        # Check age
        if last_fetched:
            fetched_date = datetime.strptime(last_fetched, "%Y-%m-%d").date()
            age = (today - fetched_date).days

            if age > max_age:
                print(f"  {RED}🔴 {name:<35}{RESET} {last_fetched} ({age}j) OBSOLETE")
                issues.append(("data", name, "stale"))
            elif age > max_age // 2:
                print(f"  {YELLOW}🟠 {name:<35}{RESET} {last_fetched} ({age}j)")
                issues.append(("data", name, "warning"))
            else:
                size = file_path.stat().st_size
                size_str = f"{size/1024:.0f}KB" if size > 1024 else f"{size}B"
                print(f"  {GREEN}🟢 {name:<35}{RESET} {last_fetched} ({age}j) [{size_str}]")
        else:
            print(f"  {YELLOW}⚪ {name:<35}{RESET} pas de date last_fetched")
            issues.append(("data", name, "no_date"))

    return issues


def update_pcg(sources, force=False):
    """Download latest PCG JSON."""
    pcg_src = next((s for s in sources if s["id"] == "pcg"), None)
    if not pcg_src:
        return

    current_year = date.today().year
    url = pcg_src["source_url"].format(year=current_year)
    file_path = DATA_DIR / f"pcg_{current_year}.json"

    # Check if we need to update
    if file_path.exists() and not force:
        last_fetched = pcg_src.get("last_fetched", "")
        if last_fetched:
            fetched_date = datetime.strptime(last_fetched, "%Y-%m-%d").date()
            age = (date.today() - fetched_date).days
            if age < DATA_ANNUAL_MAX_AGE_DAYS:
                print(f"  {DIM}PCG {current_year}: a jour, skip{RESET}")
                return

    print(f"  Telechargement PCG {current_year}... ", end="", flush=True)
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "paperasse/1.0"})
        with urllib.request.urlopen(req, timeout=30) as resp:
            data = resp.read()

        # Validate JSON
        parsed = json.loads(data)
        account_count = len(parsed.get("flat", []))

        # Remove old versions
        for old in DATA_DIR.glob("pcg_*.json"):
            if old.name != f"pcg_{current_year}.json":
                old.unlink()
                print(f"\n    Supprime {old.name}", end="")

        file_path.write_bytes(data)

        # Update sources.json
        pcg_src["file"] = f"pcg_{current_year}.json"
        pcg_src["version"] = str(current_year)
        pcg_src["last_fetched"] = date.today().isoformat()
        pcg_src["source_url"] = pcg_src["source_url"]  # keep template

        print(f"{GREEN}OK{RESET} ({account_count} comptes, {len(data)/1024:.0f}KB)")
        return True

    except (urllib.error.URLError, json.JSONDecodeError) as e:
        print(f"{RED}ERREUR{RESET}: {e}")
        # Try previous year as fallback
        if current_year > 2023:
            prev_url = pcg_src["source_url"].format(year=current_year - 1)
            print(f"  Fallback PCG {current_year - 1}... ", end="", flush=True)
            try:
                req = urllib.request.Request(prev_url, headers={"User-Agent": "paperasse/1.0"})
                with urllib.request.urlopen(req, timeout=30) as resp:
                    data = resp.read()
                fallback_path = DATA_DIR / f"pcg_{current_year - 1}.json"
                fallback_path.write_bytes(data)
                pcg_src["file"] = f"pcg_{current_year - 1}.json"
                pcg_src["version"] = str(current_year - 1)
                pcg_src["last_fetched"] = date.today().isoformat()
                print(f"{GREEN}OK{RESET}")
                return True
            except Exception as e2:
                print(f"{RED}ERREUR{RESET}: {e2}")
        return False


def update_nomenclature(sources, force=False):
    """Download nomenclature fiscale CSV."""
    src = next((s for s in sources if s["id"] == "nomenclature-liasse"), None)
    if not src:
        return

    file_path = DATA_DIR / src["file"]

    if file_path.exists() and not force:
        last_fetched = src.get("last_fetched", "")
        if last_fetched:
            fetched_date = datetime.strptime(last_fetched, "%Y-%m-%d").date()
            age = (date.today() - fetched_date).days
            if age < DATA_OTHER_MAX_AGE_DAYS:
                print(f"  {DIM}Nomenclature liasse: a jour, skip{RESET}")
                return

    url = src["source_url"]
    print(f"  Telechargement nomenclature liasse... ", end="", flush=True)
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "paperasse/1.0"})
        with urllib.request.urlopen(req, timeout=30) as resp:
            data = resp.read()

        file_path.write_bytes(data)
        line_count = data.count(b"\n")
        src["last_fetched"] = date.today().isoformat()
        print(f"{GREEN}OK{RESET} ({line_count} lignes)")
        return True

    except urllib.error.URLError as e:
        print(f"{RED}ERREUR{RESET}: {e}")
        return False


def check_remote_availability(sources):
    """Quick HEAD check on remote sources."""
    print(f"\n{BOLD}3. SOURCES DISTANTES{RESET}")
    print("=" * 60)

    urls_to_check = []
    for src in sources:
        if src.get("source_url"):
            url = src["source_url"]
            if "{year}" in url:
                url = url.format(year=date.today().year)
            urls_to_check.append((src["name"], url))
        if src.get("api_json"):
            urls_to_check.append((src["name"] + " (API)", src["api_json"]))
        if src.get("alt_api"):
            urls_to_check.append((src["name"] + " (API alt)", src["alt_api"]))

    for name, url in urls_to_check:
        try:
            req = urllib.request.Request(url, method="HEAD", headers={"User-Agent": "paperasse/1.0"})
            with urllib.request.urlopen(req, timeout=10) as resp:
                status = resp.status
                if status == 200:
                    print(f"  {GREEN}✓ {name:<40}{RESET} {DIM}{url[:60]}{RESET}")
                else:
                    print(f"  {YELLOW}? {name:<40}{RESET} HTTP {status}")
        except Exception as e:
            short_err = str(e)[:50]
            print(f"  {RED}✗ {name:<40}{RESET} {short_err}")


def save_sources(sources):
    """Write updated sources.json."""
    with open(SOURCES_FILE, "w") as f:
        json.dump({"sources": sources}, f, indent=2, ensure_ascii=False)
        f.write("\n")


# ──────────────────────────────────────────────
# Main
# ──────────────────────────────────────────────

def main():
    check_only = "--check" in sys.argv
    force = "--force" in sys.argv

    print(f"\n{BOLD}{'='*60}{RESET}")
    print(f"{BOLD}  PAPERASSE — Verification des donnees{RESET}")
    print(f"{BOLD}  {date.today().isoformat()}{RESET}")
    print(f"{BOLD}{'='*60}{RESET}")

    # 1. Check skills
    skill_issues = check_skills()

    # 2. Check data
    data_issues = check_data_sources()

    # 3. Update data (unless --check)
    if not check_only:
        sources = load_sources()

        print(f"\n{BOLD}MISE A JOUR{RESET}")
        print("=" * 60)

        updated = False
        if update_pcg(sources, force):
            updated = True
        if update_nomenclature(sources, force):
            updated = True

        if updated:
            save_sources(sources)
            print(f"\n  {GREEN}sources.json mis a jour{RESET}")

    # 4. Check remote availability
    sources = load_sources()
    check_remote_availability(sources)

    # Summary
    all_issues = skill_issues + data_issues
    stale = [i for i in all_issues if i[2] in ("stale", "missing")]
    warnings = [i for i in all_issues if i[2] in ("warning", "no_date")]

    print(f"\n{BOLD}RESUME{RESET}")
    print("=" * 60)

    if not all_issues:
        print(f"  {GREEN}Tout est a jour.{RESET}")
    else:
        if stale:
            print(f"  {RED}🔴 {len(stale)} element(s) obsolete(s) ou manquant(s){RESET}")
            for typ, name, _ in stale:
                print(f"     - [{typ}] {name}")
        if warnings:
            print(f"  {YELLOW}🟠 {len(warnings)} avertissement(s){RESET}")

    if stale:
        print(f"\n  {BOLD}Actions:{RESET}")
        print("  - Verifier les seuils/taux sur impots.gouv.fr et urssaf.fr")
        print("  - Mettre a jour metadata.last_updated dans les SKILL.md concernes")
        print("  - Relancer: python scripts/update_data.py --force")

    print()

    # Exit code
    if stale:
        sys.exit(2)
    elif warnings:
        sys.exit(1)
    sys.exit(0)


if __name__ == "__main__":
    main()
