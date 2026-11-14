#!/usr/bin/env python3
"""
Fetch company info from Annuaire des Entreprises API.

Usage:
    python fetch_company.py <SIREN_OR_SIRET>
    python fetch_company.py 123456789
    python fetch_company.py "Ma Société SAS"  # Search by name

API: https://annuaire-entreprises.data.gouv.fr/api
"""

import sys
import json
import urllib.request
import urllib.parse
import urllib.error
from datetime import datetime


def fetch_by_siren(siren: str) -> dict:
    """Fetch company by SIREN (9 digits) or SIRET (14 digits)."""
    siren = siren.replace(" ", "")[:9]  # Keep only SIREN part
    url = f"https://recherche-entreprises.api.gouv.fr/search?q={siren}"

    try:
        with urllib.request.urlopen(url, timeout=10) as response:
            data = json.loads(response.read().decode())
            if data.get("results"):
                return data["results"][0]
    except urllib.error.HTTPError as e:
        print(f"Erreur API: {e.code}", file=sys.stderr)
    except urllib.error.URLError as e:
        print(f"Erreur réseau: {e.reason}", file=sys.stderr)
    return None


def search_by_name(name: str) -> list:
    """Search companies by name."""
    encoded = urllib.parse.quote(name)
    url = f"https://recherche-entreprises.api.gouv.fr/search?q={encoded}&per_page=5"

    try:
        with urllib.request.urlopen(url, timeout=10) as response:
            data = json.loads(response.read().decode())
            return data.get("results", [])
    except (urllib.error.HTTPError, urllib.error.URLError) as e:
        print(f"Erreur: {e}", file=sys.stderr)
    return []


def format_company(company: dict) -> str:
    """Format company info for display."""
    siege = company.get("siege", {})

    # Extract key info
    siren = company.get("siren", "N/A")
    siret = siege.get("siret", "N/A")
    nom = company.get("nom_complet", "N/A")
    forme = company.get("nature_juridique", "N/A")
    date_creation = company.get("date_creation", "N/A")

    # Address
    adresse = siege.get("adresse", "N/A")
    code_postal = siege.get("code_postal", "")
    ville = siege.get("libelle_commune", "")

    # Activity
    activite = company.get("activite_principale", "N/A")
    libelle_activite = siege.get("libelle_activite_principale", "N/A")

    # Status
    etat = company.get("etat_administratif", "N/A")

    # Format output
    output = f"""
╔══════════════════════════════════════════════════════════════════╗
║  INFORMATIONS ENTREPRISE                                         ║
╠══════════════════════════════════════════════════════════════════╣
║  Raison sociale : {nom[:45]:<45} ║
║  SIREN          : {siren:<45} ║
║  SIRET (siège)  : {siret:<45} ║
║  Forme juridique: {forme:<45} ║
║  Date création  : {date_creation:<45} ║
║  Code APE/NAF   : {activite:<45} ║
║  Activité       : {libelle_activite[:45]:<45} ║
║  Adresse        : {adresse[:45]:<45} ║
║                   {(code_postal + ' ' + ville)[:45]:<45} ║
║  État           : {etat:<45} ║
╚══════════════════════════════════════════════════════════════════╝
"""

    # Add useful links
    output += f"""
📎 Liens utiles:
   • Annuaire: https://annuaire-entreprises.data.gouv.fr/entreprise/{siren}
   • Pappers:  https://www.pappers.fr/entreprise/{siren}
   • Infogreffe: https://www.infogreffe.fr/entreprise/{siren}
"""

    return output


def format_company_json(company: dict) -> dict:
    """Extract key fields for JSON output."""
    siege = company.get("siege", {})
    return {
        "siren": company.get("siren"),
        "siret": siege.get("siret"),
        "nom": company.get("nom_complet"),
        "forme_juridique": company.get("nature_juridique"),
        "date_creation": company.get("date_creation"),
        "code_ape": company.get("activite_principale"),
        "activite": siege.get("libelle_activite_principale"),
        "adresse": siege.get("adresse"),
        "code_postal": siege.get("code_postal"),
        "ville": siege.get("libelle_commune"),
        "etat": company.get("etat_administratif"),
    }


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)

    query = " ".join(sys.argv[1:])
    json_output = "--json" in sys.argv

    if json_output:
        query = query.replace("--json", "").strip()

    # Check if it's a SIREN/SIRET (all digits)
    clean_query = query.replace(" ", "")

    if clean_query.isdigit() and len(clean_query) >= 9:
        # Search by SIREN/SIRET
        company = fetch_by_siren(clean_query)
        if company:
            if json_output:
                print(json.dumps(format_company_json(company), indent=2, ensure_ascii=False))
            else:
                print(format_company(company))
        else:
            print(f"❌ Aucune entreprise trouvée pour: {query}", file=sys.stderr)
            sys.exit(1)
    else:
        # Search by name
        results = search_by_name(query)
        if results:
            if json_output:
                print(json.dumps([format_company_json(r) for r in results], indent=2, ensure_ascii=False))
            else:
                print(f"\n🔍 {len(results)} résultat(s) pour '{query}':\n")
                for i, company in enumerate(results, 1):
                    siren = company.get("siren", "N/A")
                    nom = company.get("nom_complet", "N/A")
                    ville = company.get("siege", {}).get("libelle_commune", "")
                    etat = company.get("etat_administratif", "")
                    status = "🟢" if etat == "A" else "🔴"
                    print(f"  {i}. {status} {nom}")
                    print(f"     SIREN: {siren} | {ville}")
                    print()

                print("💡 Pour plus de détails: python fetch_company.py <SIREN>")
        else:
            print(f"❌ Aucune entreprise trouvée pour: {query}", file=sys.stderr)
            sys.exit(1)


if __name__ == "__main__":
    main()
