#!/usr/bin/env python3
"""
Récupération de données ouvertes pour le skill notaire.

Utilisation :
    # Géocoder une adresse (retourne coordonnées, code INSEE)
    python scripts/fetch_notaire_data.py geocode "12 rue de Rivoli, Paris"

    # Chercher des transactions DVF dans une commune
    python scripts/fetch_notaire_data.py dvf --code-insee 75101 --nature Vente --limit 20

    # Obtenir les parcelles cadastrales
    python scripts/fetch_notaire_data.py cadastre --code-insee 75101 --section AB --numero 0012

    # Vérifier les risques d'un emplacement (Géorisques)
    python scripts/fetch_notaire_data.py risques --lat 48.8566 --lon 2.3522

    # Vérifier le zonage PLU (GPU)
    python scripts/fetch_notaire_data.py urbanisme --lat 48.8566 --lon 2.3522

    # Rechercher une personne décédée (MatchID)
    python scripts/fetch_notaire_data.py deces --nom "Dupont" --prenom "Jean" --date-naissance "1930-01-01"

    # Rechercher une entreprise (Annuaire Entreprises)
    python scripts/fetch_notaire_data.py entreprise "SCI Les Oliviers"

    # Rapport immobilier complet (enchaîne toutes les APIs)
    python scripts/fetch_notaire_data.py rapport "12 rue de Rivoli, Paris"

    # Rapport immobilier au format markdown
    python scripts/fetch_notaire_data.py rapport "12 rue de Rivoli, Paris" --markdown
"""

import argparse
import json
import sys
import urllib.request
import urllib.parse
import urllib.error


BASE_URLS = {
    "ban": "https://api-adresse.data.gouv.fr/search/",
    "dvf": "https://apidf-preprod.cerema.fr/dvf_opendata/mutations/",
    "cadastre": "https://apicarto.ign.fr/api/cadastre/parcelle",
    "georisques": "https://www.georisques.gouv.fr/api/v1/resultats_rapport_risque",
    "gpu": "https://apicarto.ign.fr/api/gpu/zone-urba",
    "entreprise": "https://recherche-entreprises.api.gouv.fr/search",
    "matchid": "https://deces.matchid.io/deces/api/v1/search",
}


def fetch_json(url, method="GET", data=None, content_type=None):
    """Récupère du JSON depuis une URL."""
    headers = {"Accept": "application/json"}
    if content_type:
        headers["Content-Type"] = content_type

    if data and isinstance(data, dict):
        data = json.dumps(data).encode("utf-8")

    req = urllib.request.Request(url, data=data, headers=headers, method=method)
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            return json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        body = e.read().decode("utf-8", errors="replace")
        print(f"Erreur HTTP {e.code} : {body[:500]}", file=sys.stderr)
        sys.exit(1)
    except urllib.error.URLError as e:
        print(f"Erreur de connexion : {e.reason}", file=sys.stderr)
        sys.exit(1)


def geocode(address):
    """Géocode une adresse via l'API BAN. Retourne coordonnées et code INSEE."""
    params = urllib.parse.urlencode({"q": address, "limit": 1})
    url = f"{BASE_URLS['ban']}?{params}"
    data = fetch_json(url)

    if not data.get("features"):
        print(f"Adresse non trouvée : {address}", file=sys.stderr)
        sys.exit(1)

    feature = data["features"][0]
    props = feature["properties"]
    coords = feature["geometry"]["coordinates"]  # [lon, lat]

    result = {
        "adresse": props.get("label"),
        "score": props.get("score"),
        "code_insee": props.get("citycode"),
        "code_postal": props.get("postcode"),
        "commune": props.get("city"),
        "latitude": coords[1],
        "longitude": coords[0],
    }
    return result


def search_dvf(code_insee, nature="Vente", limit=20):
    """Recherche des transactions DVF dans une commune."""
    params = {
        "code_insee": code_insee,
        "page_size": limit,
        "ordering": "-datemut",
    }
    if nature:
        params["libnatmut"] = nature

    url = f"{BASE_URLS['dvf']}?{urllib.parse.urlencode(params)}"
    data = fetch_json(url)

    results = data.get("results", [])
    transactions = []
    for tx in results:
        transactions.append({
            "date": tx.get("datemut"),
            "nature": tx.get("libnatmut"),
            "valeur_fonciere": tx.get("valeurfonc"),
            "type_bien": tx.get("libtypbien"),
            "surface_bati": tx.get("sbati"),
            "surface_terrain": tx.get("sterr"),
            "parcelles": tx.get("l_idpar", []),
            "vefa": tx.get("vefa"),
            "nb_locaux": tx.get("nblocmut"),
        })

    return {
        "code_insee": code_insee,
        "count": data.get("count", 0),
        "transactions": transactions,
    }


def search_cadastre(code_insee, section=None, numero=None):
    """Recherche des parcelles cadastrales."""
    params = {"code_insee": code_insee}
    if section:
        params["section"] = section
    if numero:
        params["numero"] = numero

    url = f"{BASE_URLS['cadastre']}?{urllib.parse.urlencode(params)}"
    data = fetch_json(url)

    parcelles = []
    for feature in data.get("features", []):
        props = feature["properties"]
        parcelles.append({
            "commune": props.get("nom_com"),
            "section": props.get("section"),
            "numero": props.get("numero"),
            "contenance": props.get("contenance"),
            "code_arr": props.get("code_arr"),
        })

    return {"code_insee": code_insee, "parcelles": parcelles}


def check_risques(lat, lon):
    """Vérifie les risques d'un emplacement via l'API Géorisques."""
    url = f"{BASE_URLS['georisques']}?latlon={lon},{lat}"
    data = fetch_json(url)
    return data


def check_urbanisme(lat, lon):
    """Vérifie le zonage PLU via l'API GPU (nécessite un point GeoJSON)."""
    geojson = {
        "type": "Point",
        "coordinates": [lon, lat]
    }
    url = f"{BASE_URLS['gpu']}?geom={urllib.parse.quote(json.dumps(geojson))}"
    data = fetch_json(url)

    zones = []
    for feature in data.get("features", []):
        props = feature["properties"]
        zones.append({
            "libelle": props.get("libelle"),
            "libelong": props.get("libelong"),
            "typezone": props.get("typezone"),
            "destdomi": props.get("destdomi"),
            "partition": props.get("partition"),
        })

    return {"latitude": lat, "longitude": lon, "zones": zones}


def search_deces(nom, prenom=None, date_naissance=None):
    """Recherche de personnes décédées via l'API MatchID."""
    params = {"q": nom}
    if prenom:
        params["q"] = f"{prenom} {nom}"
    if date_naissance:
        params["birthDate"] = date_naissance

    url = f"{BASE_URLS['matchid']}?{urllib.parse.urlencode(params)}"
    data = fetch_json(url)

    persons = []
    for hit in data.get("response", {}).get("persons", []):
        persons.append({
            "nom": hit.get("name", {}).get("last", [None])[0],
            "prenoms": hit.get("name", {}).get("first", []),
            "date_naissance": hit.get("birth", {}).get("date"),
            "lieu_naissance": hit.get("birth", {}).get("location", {}).get("city"),
            "date_deces": hit.get("death", {}).get("date"),
            "lieu_deces": hit.get("death", {}).get("location", {}).get("city"),
        })

    return {"count": len(persons), "persons": persons[:10]}


def search_entreprise(query):
    """Recherche d'informations sur une entreprise via l'Annuaire Entreprises."""
    params = {"q": query, "page": 1, "per_page": 5}
    url = f"{BASE_URLS['entreprise']}?{urllib.parse.urlencode(params)}"
    data = fetch_json(url)

    results = []
    for r in data.get("results", []):
        results.append({
            "siren": r.get("siren"),
            "nom": r.get("nom_complet"),
            "nature_juridique": r.get("nature_juridique"),
            "siege": r.get("siege", {}).get("adresse"),
            "date_creation": r.get("date_creation"),
            "dirigeants": r.get("dirigeants", []),
            "nombre_etablissements": r.get("nombre_etablissements"),
        })

    return {"query": query, "count": data.get("total_results", 0), "results": results}


def rapport_complet(address):
    """Rapport immobilier complet : géocodage puis DVF, cadastre, risques, urbanisme."""
    print(f"[1/5] Géocodage : {address}", file=sys.stderr)
    geo = geocode(address)
    print(f"       → {geo['commune']} (INSEE : {geo['code_insee']}), lat={geo['latitude']}, lon={geo['longitude']}", file=sys.stderr)

    print(f"[2/5] DVF : transactions récentes...", file=sys.stderr)
    dvf = search_dvf(geo["code_insee"], limit=10)
    print(f"       → {dvf['count']} transactions trouvées", file=sys.stderr)

    print(f"[3/5] Cadastre...", file=sys.stderr)
    try:
        cadastre = search_cadastre(geo["code_insee"])
        print(f"       → {len(cadastre['parcelles'])} parcelles", file=sys.stderr)
    except SystemExit:
        cadastre = {"error": "Cadastre non disponible pour cette commune"}
        print(f"       → Non disponible", file=sys.stderr)

    print(f"[4/5] Risques (Géorisques)...", file=sys.stderr)
    try:
        risques = check_risques(geo["latitude"], geo["longitude"])
    except SystemExit:
        risques = {"error": "Géorisques non disponible"}
        print(f"       → Non disponible", file=sys.stderr)

    print(f"[5/5] Urbanisme (GPU)...", file=sys.stderr)
    try:
        urbanisme = check_urbanisme(geo["latitude"], geo["longitude"])
        print(f"       → {len(urbanisme['zones'])} zones trouvées", file=sys.stderr)
    except SystemExit:
        urbanisme = {"error": "GPU non disponible"}
        print(f"       → Non disponible", file=sys.stderr)

    return {
        "adresse": geo,
        "dvf": dvf,
        "cadastre": cadastre,
        "risques": risques,
        "urbanisme": urbanisme,
    }


def format_rapport_markdown(data):
    """Formate un rapport immobilier en markdown structuré."""
    geo = data["adresse"]
    dvf = data["dvf"]
    cadastre = data["cadastre"]
    risques = data["risques"]
    urbanisme = data["urbanisme"]

    lines = []
    lines.append(f"# Rapport Immobilier")
    lines.append(f"")
    lines.append(f"**Adresse** : {geo['adresse']}")
    lines.append(f"**Commune** : {geo['commune']} ({geo['code_postal']})")
    lines.append(f"**Code INSEE** : {geo['code_insee']}")
    lines.append(f"**Coordonnées** : {geo['latitude']}, {geo['longitude']}")
    lines.append(f"")
    lines.append(f"---")
    lines.append(f"")

    # DVF
    lines.append(f"## Transactions Comparables (DVF)")
    lines.append(f"")
    if dvf.get("error"):
        lines.append(f"*{dvf['error']}*")
    else:
        lines.append(f"**{dvf['count']}** transactions enregistrées dans la commune.")
        lines.append(f"")
        ventes = [t for t in dvf.get("transactions", []) if t.get("valeur_fonciere")]
        if ventes:
            lines.append(f"| Date | Type | Surface bâtie | Valeur foncière |")
            lines.append(f"|------|------|:-------------:|:---------------:|")
            for tx in ventes[:15]:
                date = tx.get("date", "?")
                type_bien = tx.get("type_bien", "?")
                surface = tx.get("surface_bati", "?")
                valeur = tx.get("valeur_fonciere", "?")
                try:
                    valeur_fmt = f"{float(valeur):,.0f} EUR".replace(",", " ")
                except (ValueError, TypeError):
                    valeur_fmt = str(valeur)
                try:
                    surface_fmt = f"{float(surface):,.0f} m²".replace(",", " ")
                except (ValueError, TypeError):
                    surface_fmt = str(surface)
                lines.append(f"| {date} | {type_bien} | {surface_fmt} | {valeur_fmt} |")

            # Statistiques de prix
            prices = []
            for tx in ventes:
                try:
                    v = float(tx["valeur_fonciere"])
                    s = float(tx.get("surface_bati", 0))
                    if v > 0 and s > 0:
                        prices.append(v / s)
                except (ValueError, TypeError, KeyError):
                    pass
            if prices:
                lines.append(f"")
                avg = sum(prices) / len(prices)
                lines.append(f"**Prix moyen au m²** (sur {len(prices)} transactions avec surface) : **{avg:,.0f} EUR/m²**".replace(",", " "))
        else:
            lines.append(f"*Aucune transaction avec valeur foncière trouvée.*")
    lines.append(f"")
    lines.append(f"---")
    lines.append(f"")

    # Cadastre
    lines.append(f"## Cadastre")
    lines.append(f"")
    if cadastre.get("error"):
        lines.append(f"*{cadastre['error']}*")
    elif cadastre.get("parcelles"):
        lines.append(f"| Commune | Section | Parcelle | Contenance |")
        lines.append(f"|---------|---------|----------|:----------:|")
        for p in cadastre["parcelles"][:20]:
            lines.append(f"| {p.get('commune', '?')} | {p.get('section', '?')} | {p.get('numero', '?')} | {p.get('contenance', '?')} m² |")
    else:
        lines.append(f"*Aucune parcelle trouvée.*")
    lines.append(f"")
    lines.append(f"---")
    lines.append(f"")

    # Risques
    lines.append(f"## Risques (Géorisques)")
    lines.append(f"")
    if risques.get("error"):
        lines.append(f"*{risques['error']}*")
    else:
        has_risks = False
        for key in ["risques_naturels", "risques_technologiques", "radon", "installations_classees"]:
            if key in risques and risques[key]:
                has_risks = True
                lines.append(f"### {key.replace('_', ' ').title()}")
                lines.append(f"")
                if isinstance(risques[key], list):
                    for r in risques[key][:10]:
                        if isinstance(r, dict):
                            lines.append(f"- {r.get('libelle', r.get('libelle_risque', json.dumps(r)))}")
                        else:
                            lines.append(f"- {r}")
                else:
                    lines.append(f"```json")
                    lines.append(json.dumps(risques[key], indent=2, ensure_ascii=False)[:500])
                    lines.append(f"```")
                lines.append(f"")
        if not has_risks:
            lines.append(f"Données brutes (clés) : {', '.join(risques.keys())}")
            lines.append(f"")
            lines.append(f"*Consulter https://www.georisques.gouv.fr pour le rapport complet.*")
    lines.append(f"")
    lines.append(f"---")
    lines.append(f"")

    # Urbanisme
    lines.append(f"## Urbanisme (PLU)")
    lines.append(f"")
    if urbanisme.get("error"):
        lines.append(f"*{urbanisme['error']}*")
    elif urbanisme.get("zones"):
        lines.append(f"| Zone | Description | Type |")
        lines.append(f"|------|-------------|------|")
        for z in urbanisme["zones"]:
            lines.append(f"| {z.get('libelle', '?')} | {z.get('libelong', '?')} | {z.get('typezone', '?')} |")
    else:
        lines.append(f"*Aucune zone PLU trouvée. Le PLU peut ne pas être numérisé pour cette commune.*")
    lines.append(f"")
    lines.append(f"---")
    lines.append(f"")
    lines.append(f"*Rapport généré automatiquement. Les données proviennent de sources publiques (BAN, DVF, IGN, Géorisques). Vérifier auprès des services compétents pour un dossier officiel.*")

    return "\n".join(lines)


def main():
    parser = argparse.ArgumentParser(description="Récupération de données ouvertes pour le skill notaire")
    subparsers = parser.add_subparsers(dest="command", help="Commande à exécuter")

    # geocode
    p_geo = subparsers.add_parser("geocode", help="Géocoder une adresse")
    p_geo.add_argument("address", help="Adresse à géocoder")

    # dvf
    p_dvf = subparsers.add_parser("dvf", help="Chercher des transactions DVF")
    p_dvf.add_argument("--code-insee", required=True, help="Code INSEE de la commune")
    p_dvf.add_argument("--nature", default="Vente", help="Nature de la transaction")
    p_dvf.add_argument("--limit", type=int, default=20, help="Nombre max de résultats")

    # cadastre
    p_cad = subparsers.add_parser("cadastre", help="Chercher des parcelles cadastrales")
    p_cad.add_argument("--code-insee", required=True, help="Code INSEE")
    p_cad.add_argument("--section", help="Section cadastrale")
    p_cad.add_argument("--numero", help="Numéro de parcelle")

    # risques
    p_risk = subparsers.add_parser("risques", help="Vérifier les risques d'un emplacement")
    p_risk.add_argument("--lat", type=float, required=True, help="Latitude")
    p_risk.add_argument("--lon", type=float, required=True, help="Longitude")

    # urbanisme
    p_urb = subparsers.add_parser("urbanisme", help="Vérifier le zonage PLU")
    p_urb.add_argument("--lat", type=float, required=True, help="Latitude")
    p_urb.add_argument("--lon", type=float, required=True, help="Longitude")

    # deces
    p_dec = subparsers.add_parser("deces", help="Rechercher une personne décédée")
    p_dec.add_argument("--nom", required=True, help="Nom de famille")
    p_dec.add_argument("--prenom", help="Prénom")
    p_dec.add_argument("--date-naissance", help="Date de naissance (AAAA-MM-JJ)")

    # entreprise
    p_ent = subparsers.add_parser("entreprise", help="Rechercher une entreprise")
    p_ent.add_argument("query", help="Nom de l'entreprise à rechercher")

    # rapport
    p_rap = subparsers.add_parser("rapport", help="Rapport immobilier complet")
    p_rap.add_argument("address", help="Adresse du bien")
    p_rap.add_argument("--markdown", action="store_true", help="Sortie au format markdown")

    args = parser.parse_args()

    if not args.command:
        parser.print_help()
        sys.exit(1)

    if args.command == "geocode":
        result = geocode(args.address)
    elif args.command == "dvf":
        result = search_dvf(args.code_insee, args.nature, args.limit)
    elif args.command == "cadastre":
        result = search_cadastre(args.code_insee, args.section, args.numero)
    elif args.command == "risques":
        result = check_risques(args.lat, args.lon)
    elif args.command == "urbanisme":
        result = check_urbanisme(args.lat, args.lon)
    elif args.command == "deces":
        result = search_deces(args.nom, args.prenom, args.date_naissance)
    elif args.command == "entreprise":
        result = search_entreprise(args.query)
    elif args.command == "rapport":
        result = rapport_complet(args.address)
        if args.markdown:
            print(format_rapport_markdown(result))
            return

    print(json.dumps(result, indent=2, ensure_ascii=False))


if __name__ == "__main__":
    main()
