#!/usr/bin/env python3
"""
Fetch company info from the BCE (Banque-Carrefour des Entreprises / KBO) API.

Usage:
    python scripts/fetch_company.py <BCE_NUMBER>
    python scripts/fetch_company.py 0123456789
    python scripts/fetch_company.py "0123.456.789"
    python scripts/fetch_company.py "Ma Société SRL"  # Search by name

BCE number format: 0xxx.xxx.xxx (10 digits)
TVA format: BE0xxxxxxxxx

API: https://kbopub.economie.fgov.be
"""

import sys
import json
import urllib.request
import urllib.parse
import urllib.error
from datetime import datetime


# API publique KBO/BCE
BCE_API_SEARCH = "https://kbopub.economie.fgov.be/kbopublic/api/search.json"
BCE_API_ENTERPRISE = "https://kbopub.economie.fgov.be/kbopublic/api/enterprise"


def format_bce(raw: str) -> str:
    """
    Normalise un numéro BCE vers le format standard 0xxx.xxx.xxx.

    Accepte les formats suivants :
      - "0123456789"      (10 chiffres sans ponctuation)
      - "0123.456.789"    (format pointé)
      - "BE0123456789"    (préfixe TVA)
      - "BE 0123.456.789" (TVA avec espaces)
    """
    # Supprimer le préfixe BE/be, espaces, points
    clean = raw.strip().upper()
    if clean.startswith("BE"):
        clean = clean[2:]
    clean = clean.replace(".", "").replace(" ", "").replace("-", "")

    if not clean.isdigit():
        raise ValueError(f"Numéro BCE invalide : {raw!r} (doit être 10 chiffres)")
    if len(clean) != 10:
        raise ValueError(f"Numéro BCE invalide : {raw!r} (attendu 10 chiffres, obtenu {len(clean)})")

    # Format 0xxx.xxx.xxx
    return f"{clean[0:4]}.{clean[4:7]}.{clean[7:10]}"


def bce_to_tva(bce: str) -> str:
    """
    Convertit un numéro BCE vers le numéro TVA belge.

    Exemples :
      "0123.456.789"  -> "BE0123456789"
      "0123456789"    -> "BE0123456789"
    """
    clean = format_bce(bce).replace(".", "")
    return f"BE{clean}"


def _fetch_json(url: str) -> dict | None:
    """Effectue une requête GET JSON et retourne les données ou None en cas d'erreur."""
    headers = {
        "Accept": "application/json",
        "User-Agent": "paperasse-be/1.0 (skill notaire/comptable)",
    }
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=15) as response:
            return json.loads(response.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        print(f"Erreur API BCE {e.code} : {url}", file=sys.stderr)
    except urllib.error.URLError as e:
        print(f"Erreur réseau : {e.reason}", file=sys.stderr)
    return None


def fetch_by_bce(bce_number: str) -> dict | None:
    """
    Récupère les informations d'une entreprise via son numéro BCE.

    Normalise automatiquement l'entrée (avec ou sans points, préfixe BE).
    """
    try:
        formatted = format_bce(bce_number)
    except ValueError as e:
        print(f"Erreur : {e}", file=sys.stderr)
        return None

    # L'API BCE accepte le numéro avec points : 0xxx.xxx.xxx
    url = f"{BCE_API_ENTERPRISE}/{formatted}"
    data = _fetch_json(url)

    if data is None:
        # Fallback : recherche par numéro
        return _search_fallback(formatted)

    return _parse_enterprise(data)


def search_by_name(name: str) -> list:
    """
    Recherche des entreprises par nom dans la BCE.

    Retourne une liste de dicts avec les champs essentiels.
    """
    encoded = urllib.parse.quote(name)
    url = f"{BCE_API_SEARCH}?q={encoded}"
    data = _fetch_json(url)

    if data is None:
        return []

    # La réponse peut être une liste directe ou un objet avec un champ "results"
    if isinstance(data, list):
        entries = data
    else:
        entries = data.get("results", data.get("enterprises", []))

    return [_parse_enterprise(e) for e in entries[:10] if e]


def _search_fallback(bce_formatted: str) -> dict | None:
    """
    Fallback : recherche par numéro BCE via l'endpoint de recherche générale.
    Utilisé si l'endpoint direct /enterprise/NNN échoue.
    """
    encoded = urllib.parse.quote(bce_formatted)
    url = f"{BCE_API_SEARCH}?q={encoded}"
    data = _fetch_json(url)

    if data is None:
        return None

    if isinstance(data, list) and data:
        return _parse_enterprise(data[0])
    entries = data.get("results", data.get("enterprises", []))
    if entries:
        return _parse_enterprise(entries[0])
    return None


def _parse_enterprise(raw: dict) -> dict:
    """
    Extrait et normalise les champs utiles d'une réponse BCE brute.

    L'API BCE peut retourner des structures variables selon l'endpoint ;
    cette fonction tente de couvrir les deux formats courants.
    """
    if not raw:
        return {}

    # Numéro BCE : présent sous plusieurs noms possibles
    bce_raw = (
        raw.get("enterpriseNumber")
        or raw.get("enterprise_number")
        or raw.get("number")
        or raw.get("bce")
        or ""
    )
    try:
        bce_fmt = format_bce(str(bce_raw)) if bce_raw else None
        tva = bce_to_tva(str(bce_raw)) if bce_raw else None
    except ValueError:
        bce_fmt = str(bce_raw) if bce_raw else None
        tva = None

    # Dénomination sociale
    denominations = raw.get("denominations", [])
    name = None
    if denominations:
        # Prendre la dénomination française ou la première disponible
        for d in denominations:
            if isinstance(d, dict) and d.get("language") in ("FR", "2", 2):
                name = d.get("denomination") or d.get("name")
                break
        if not name and denominations:
            first = denominations[0]
            name = (first.get("denomination") or first.get("name")) if isinstance(first, dict) else str(first)
    if not name:
        name = raw.get("name") or raw.get("denomination") or raw.get("nom")

    # Adresse du siège
    address_data = raw.get("address") or raw.get("addresses") or {}
    if isinstance(address_data, list):
        address_data = address_data[0] if address_data else {}
    adresse = (
        address_data.get("street", "")
        + (" " + str(address_data.get("houseNumber", "")) if address_data.get("houseNumber") else "")
    ).strip() or address_data.get("adresse") or raw.get("adresse")
    code_postal = address_data.get("zipcode") or address_data.get("zipCode") or address_data.get("code_postal")
    commune = address_data.get("municipality") or address_data.get("commune") or address_data.get("city")

    # Forme juridique
    legal_form_data = raw.get("juridicalForm") or raw.get("legalForm") or raw.get("juridical_form") or {}
    if isinstance(legal_form_data, dict):
        legal_form = (
            legal_form_data.get("labelFR")
            or legal_form_data.get("label_fr")
            or legal_form_data.get("label")
            or legal_form_data.get("code")
        )
    else:
        legal_form = str(legal_form_data) if legal_form_data else None

    # Statut
    status = raw.get("enterpriseStatus") or raw.get("status") or raw.get("etat")

    # Codes NACE (activités)
    activities = raw.get("activities") or raw.get("naceActivities") or []
    nace_codes = []
    for act in activities:
        if isinstance(act, dict):
            code = act.get("naceCode") or act.get("code")
            label = act.get("labelFR") or act.get("label_fr") or act.get("label")
            if code:
                nace_codes.append({"code": code, "libelle": label})
        elif isinstance(act, str):
            nace_codes.append({"code": act, "libelle": None})

    return {
        "bce": bce_fmt,
        "tva": tva,
        "nom": name,
        "adresse": adresse,
        "code_postal": str(code_postal) if code_postal else None,
        "commune": commune,
        "forme_juridique": legal_form,
        "statut": status,
        "nace_codes": nace_codes,
        "_raw": raw,  # conservé pour debug ; retirer si non voulu
    }


def format_company(company: dict) -> str:
    """Formate les informations d'une entreprise pour l'affichage console."""
    bce = company.get("bce", "N/A")
    tva = company.get("tva", "N/A")
    nom = company.get("nom", "N/A") or "N/A"
    forme = company.get("forme_juridique", "N/A") or "N/A"
    adresse = company.get("adresse", "N/A") or "N/A"
    cp_commune = " ".join(filter(None, [company.get("code_postal"), company.get("commune")])) or "N/A"
    statut = company.get("statut", "N/A") or "N/A"
    nace = ", ".join(n["code"] for n in company.get("nace_codes", [])[:3]) or "N/A"

    output = f"""
+------------------------------------------------------------------+
|  INFORMATIONS ENTREPRISE (BCE/KBO)                               |
+------------------------------------------------------------------+
|  Raison sociale : {nom[:45]:<45} |
|  N BCE          : {bce:<45} |
|  N TVA          : {tva:<45} |
|  Forme juridique: {forme[:45]:<45} |
|  Adresse        : {adresse[:45]:<45} |
|                   {cp_commune[:45]:<45} |
|  Statut         : {str(statut)[:45]:<45} |
|  Codes NACE     : {nace[:45]:<45} |
+------------------------------------------------------------------+
"""

    output += f"""
Liens utiles :
   BCE en ligne : https://kbopub.economie.fgov.be/kbopublic/company?number={bce}
   BOSA         : https://bosa.belgium.be/fr
"""

    return output


def format_company_json(company: dict) -> dict:
    """Retourne les champs clés sans la clé _raw (pour export JSON propre)."""
    return {k: v for k, v in company.items() if k != "_raw"}


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)

    query = " ".join(sys.argv[1:])
    json_output = "--json" in sys.argv

    if json_output:
        query = query.replace("--json", "").strip()

    # Détecter si c'est un numéro BCE (chiffres, points, éventuellement préfixe BE)
    clean_query = query.strip().upper()
    if clean_query.startswith("BE"):
        clean_query = clean_query[2:]
    clean_digits = clean_query.replace(".", "").replace(" ", "")

    is_bce_number = clean_digits.isdigit() and len(clean_digits) == 10

    if is_bce_number:
        # Recherche directe par numéro BCE
        company = fetch_by_bce(query)
        if company and company.get("bce"):
            if json_output:
                print(json.dumps(format_company_json(company), indent=2, ensure_ascii=False))
            else:
                print(format_company(company))
        else:
            print(f"Aucune entreprise trouvée pour le numéro BCE : {query}", file=sys.stderr)
            print(
                f"Conseil : vérifiez directement sur "
                f"https://kbopub.economie.fgov.be/kbopublic/",
                file=sys.stderr,
            )
            sys.exit(1)
    else:
        # Recherche par nom
        results = search_by_name(query)
        if results:
            if json_output:
                print(json.dumps([format_company_json(r) for r in results], indent=2, ensure_ascii=False))
            else:
                print(f"\n{len(results)} résultat(s) pour '{query}' :\n")
                for i, company in enumerate(results, 1):
                    bce = company.get("bce", "N/A")
                    nom = company.get("nom", "N/A") or "N/A"
                    commune = company.get("commune", "")
                    statut = company.get("statut", "")
                    actif = "[ACTIF]" if str(statut).upper() in ("ACTIVE", "A", "1") else f"[{statut}]" if statut else ""
                    print(f"  {i}. {actif} {nom}")
                    print(f"     BCE: {bce} | {commune}")
                    print()

                print("Pour plus de détails : python scripts/fetch_company.py <BCE_NUMBER>")
        else:
            print(f"Aucune entreprise trouvée pour : {query}", file=sys.stderr)
            print(
                "Conseil : effectuez une recherche directe sur "
                "https://kbopub.economie.fgov.be/kbopublic/",
                file=sys.stderr,
            )
            sys.exit(1)


if __name__ == "__main__":
    main()
