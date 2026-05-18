#!/usr/bin/env python3
"""
Récupération de données ouvertes pour le skill notaire belge.

Utilisation :
    # Géocoder une adresse belge
    python scripts/fetch_notaire_data.py geocode "Rue de la Loi 16, 1000 Bruxelles"

    # Obtenir les parcelles cadastrales (AGDP)
    python scripts/fetch_notaire_data.py cadastre --commune "Ixelles" --section A --numero 0012

    # Vérifier le zonage urbanistique (selon région)
    python scripts/fetch_notaire_data.py urbanisme --lat 50.8503 --lon 4.3517 --region bruxelles

    # Rechercher une entreprise (BCE)
    python scripts/fetch_notaire_data.py entreprise "SRL Les Oliviers"

    # Rapport immobilier belge
    python scripts/fetch_notaire_data.py rapport "Rue de la Loi 16, 1000 Bruxelles"

    # Rapport immobilier au format markdown
    python scripts/fetch_notaire_data.py rapport "Rue de la Loi 16, 1000 Bruxelles" --markdown

APIs utilisées:
    - Géocodage: api.bosa.be ou Nominatim (OpenStreetMap) en fallback
    - Cadastre: AGDP (Administration générale de la Documentation Patrimoniale)
    - Urbanisme: Geopunt (Flandre), WalOnMap (Wallonie), UrbIS (Bruxelles)
    - Entreprises: BCE/KBO (kbopub.economie.fgov.be)
"""

import argparse
import json
import sys
import urllib.request
import urllib.parse
import urllib.error


# ---------------------------------------------------------------------------
# Utilitaires BCE (dupliques depuis fetch_company.py pour autonomie)
# ---------------------------------------------------------------------------

def format_bce(raw: str) -> str:
    """
    Normalise un numero BCE vers le format standard 0xxx.xxx.xxx.

    Accepte :
      - "0123456789"      (10 chiffres)
      - "0123.456.789"    (format pointe)
      - "BE0123456789"    (prefixe TVA)
    """
    clean = raw.strip().upper()
    if clean.startswith("BE"):
        clean = clean[2:]
    clean = clean.replace(".", "").replace(" ", "").replace("-", "")
    if not clean.isdigit():
        raise ValueError(f"Numero BCE invalide : {raw!r}")
    if len(clean) != 10:
        raise ValueError(f"Numero BCE invalide : {raw!r} (attendu 10 chiffres, obtenu {len(clean)})")
    return f"{clean[0:4]}.{clean[4:7]}.{clean[7:10]}"


def bce_to_tva(bce: str) -> str:
    """Convertit un numero BCE vers le numero TVA belge (BE0xxxxxxxxx)."""
    clean = format_bce(bce).replace(".", "")
    return f"BE{clean}"


# ---------------------------------------------------------------------------
# URLs de base
# ---------------------------------------------------------------------------

BASE_URLS = {
    # Géocodage BOSA (Belgium Open Source Architects)
    # Documentation : https://api.bosa.be
    "bosa_geocode": "https://api.bosa.be/address-match/match",

    # Nominatim OpenStreetMap — fallback géocodage
    "nominatim": "https://nominatim.openstreetmap.org/search",

    # BCE/KBO — entreprises belges
    "bce_search": "https://kbopub.economie.fgov.be/kbopublic/api/search.json",
    "bce_enterprise": "https://kbopub.economie.fgov.be/kbopublic/api/enterprise",

    # Geopunt (Flandre) — géocodage, cartographie, données patrimoniales
    "geopunt_geocode": "https://loc.geopunt.be/geolocation/location",
    "geopunt_parcel": "https://geo.api.vlaanderen.be/OGCAPI/collections/Perceel/items",

    # UrbIS (Bruxelles) — géocodage et données urbaines
    "urbis_geocode": "https://geoservices.irisnet.be/localization/Rest/Localize/getaddresses",

    # WalOnMap / Géoportail Wallon — pas d'API REST publique unifiée pour le zonage
    # Source manuelle : https://geoportail.wallonie.be
    # SPW Open Data : https://opendata.wallonie.be
    "spw_wfs": "https://geoservices.wallonie.be/arcgis/services/SOL_SOUS_SOL/CADMAP/MapServer/WFSServer",

    # AGDP (patrimoniale) — pas d'API publique directe ; accès via MyMinfin
    # Source manuelle : https://finances.belgium.be/fr/particuliers/habitation/cadastre
}


# ---------------------------------------------------------------------------
# Utilitaires HTTP
# ---------------------------------------------------------------------------

def _fetch_json(url: str, timeout: int = 20) -> dict | None:
    """Effectue une requête GET JSON. Retourne None en cas d'erreur non fatale."""
    headers = {
        "Accept": "application/json",
        "User-Agent": "paperasse-be/1.0",
    }
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            return json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        body = e.read().decode("utf-8", errors="replace")
        print(f"Erreur HTTP {e.code} ({url}) : {body[:300]}", file=sys.stderr)
        return None
    except urllib.error.URLError as e:
        print(f"Erreur de connexion ({url}) : {e.reason}", file=sys.stderr)
        return None


def _fetch_json_fatal(url: str, timeout: int = 20) -> dict:
    """Comme _fetch_json mais quitte le programme en cas d'échec."""
    data = _fetch_json(url, timeout)
    if data is None:
        print(f"Impossible de récupérer les données depuis : {url}", file=sys.stderr)
        sys.exit(1)
    return data


# ---------------------------------------------------------------------------
# 1. Géocodage
# ---------------------------------------------------------------------------

def geocode(address: str) -> dict:
    """
    Géocode une adresse belge.

    Essaie d'abord l'API BOSA (Belgium), puis Nominatim/OpenStreetMap en fallback.
    Retourne : adresse normalisée, latitude, longitude, code postal, commune, région.
    """
    # Tentative 1 : BOSA address-match
    result = _geocode_bosa(address)
    if result:
        return result

    # Tentative 2 : Geopunt (adresses flamandes)
    result = _geocode_geopunt(address)
    if result:
        return result

    # Tentative 3 : UrbIS (adresses bruxelloises)
    result = _geocode_urbis(address)
    if result:
        return result

    # Fallback : Nominatim avec restriction Belgique
    result = _geocode_nominatim(address)
    if result:
        return result

    print(f"Adresse non trouvée : {address}", file=sys.stderr)
    sys.exit(1)


def _geocode_bosa(address: str) -> dict | None:
    """Géocodage via l'API BOSA (service fédéral belge)."""
    params = urllib.parse.urlencode({
        "query": address,
        "language": "fr",
        "limit": 1,
    })
    url = f"{BASE_URLS['bosa_geocode']}?{params}"
    data = _fetch_json(url)

    if not data:
        return None

    # Formats possibles de la réponse BOSA
    hits = data.get("result") or data.get("results") or data.get("addresses") or []
    if isinstance(hits, dict):
        hits = [hits]
    if not hits:
        return None

    hit = hits[0]
    # Extraction des coordonnées (WGS84 ou Lambert)
    lat = hit.get("lat") or hit.get("latitude") or hit.get("y_wgs84")
    lon = hit.get("lon") or hit.get("longitude") or hit.get("x_wgs84")

    if not lat or not lon:
        return None

    return {
        "adresse": hit.get("formattedAddress") or hit.get("formatted_address") or address,
        "score": hit.get("score", 1.0),
        "code_postal": str(hit.get("zipCode") or hit.get("postalCode") or hit.get("postal_code") or ""),
        "commune": hit.get("municipality") or hit.get("commune") or "",
        "region": _detecter_region(str(hit.get("zipCode") or hit.get("postalCode") or "")),
        "latitude": float(lat),
        "longitude": float(lon),
        "source": "BOSA",
    }


def _geocode_geopunt(address: str) -> dict | None:
    """Géocodage via Geopunt (Flandre)."""
    params = urllib.parse.urlencode({
        "q": address,
        "c": 1,
        "srs": "EPSG:4326",
    })
    url = f"{BASE_URLS['geopunt_geocode']}?{params}"
    data = _fetch_json(url)

    if not data:
        return None

    locations = data.get("LocationResult", [])
    if not locations:
        return None

    loc = locations[0]
    lat = loc.get("Location", {}).get("Lat_WGS84")
    lon = loc.get("Location", {}).get("Lon_WGS84")

    if not lat or not lon:
        return None

    cp = str(loc.get("Address", {}).get("Zipcode") or "")
    return {
        "adresse": loc.get("FormattedAddress", address),
        "score": 1.0,
        "code_postal": cp,
        "commune": loc.get("Address", {}).get("Municipality", ""),
        "region": _detecter_region(cp),
        "latitude": float(lat),
        "longitude": float(lon),
        "source": "Geopunt (Flandre)",
    }


def _geocode_urbis(address: str) -> dict | None:
    """Géocodage via UrbIS (Bruxelles)."""
    params = urllib.parse.urlencode({
        "spatialReference": 4326,
        "language": "FR",
        "address": address,
    })
    url = f"{BASE_URLS['urbis_geocode']}?{params}"
    data = _fetch_json(url)

    if not data:
        return None

    results = data.get("result") or []
    if not results:
        return None

    r = results[0]
    point = r.get("adPoint") or {}
    lat = point.get("y")
    lon = point.get("x")

    if not lat or not lon:
        return None

    return {
        "adresse": r.get("address", {}).get("street", {}).get("name", address),
        "score": 1.0,
        "code_postal": str(r.get("address", {}).get("postal", {}).get("code", "")),
        "commune": r.get("address", {}).get("municipality", {}).get("name", ""),
        "region": "bruxelles",
        "latitude": float(lat),
        "longitude": float(lon),
        "source": "UrbIS (Bruxelles)",
    }


def _geocode_nominatim(address: str) -> dict | None:
    """Géocodage via Nominatim/OpenStreetMap, restreint à la Belgique."""
    params = urllib.parse.urlencode({
        "q": address,
        "format": "jsonv2",
        "limit": 1,
        "countrycodes": "be",
        "addressdetails": 1,
    })
    url = f"{BASE_URLS['nominatim']}?{params}"
    data = _fetch_json(url)

    if not data or not isinstance(data, list) or not data:
        return None

    hit = data[0]
    addr = hit.get("address", {})
    cp = addr.get("postcode", "")

    return {
        "adresse": hit.get("display_name", address),
        "score": float(hit.get("importance", 0.5)),
        "code_postal": cp,
        "commune": addr.get("city") or addr.get("town") or addr.get("village") or "",
        "region": _detecter_region(cp),
        "latitude": float(hit.get("lat", 0)),
        "longitude": float(hit.get("lon", 0)),
        "source": "Nominatim/OpenStreetMap",
    }


def _detecter_region(code_postal: str) -> str:
    """
    Détermine la région belge à partir d'un code postal.

    Règles approximatives (non exhaustives) :
      1000-1299 : Bruxelles
      1300-1499 : Brabant wallon
      1500-1999 : Brabant flamand
      2000-2999 : Anvers
      3000-3499 : Brabant flamand
      3500-3999 : Limbourg
      4000-4999 : Liège
      5000-5999 : Namur
      6000-6999 : Hainaut
      7000-7999 : Hainaut
      8000-8999 : Flandre-Occidentale
      9000-9999 : Flandre-Orientale
    """
    try:
        cp = int(code_postal)
    except (ValueError, TypeError):
        return "inconnu"

    if 1000 <= cp <= 1299:
        return "bruxelles"
    if 1300 <= cp <= 1499:
        return "wallonie"
    if 1500 <= cp <= 1999:
        return "flandre"
    if 2000 <= cp <= 3499:
        return "flandre"
    if 3500 <= cp <= 3999:
        return "flandre"
    if 4000 <= cp <= 7999:
        return "wallonie"
    if 8000 <= cp <= 9999:
        return "flandre"
    return "inconnu"


# ---------------------------------------------------------------------------
# 2. Cadastre (AGDP)
# ---------------------------------------------------------------------------

def search_cadastre(commune: str, section: str = None, numero: str = None) -> dict:
    """
    Recherche des parcelles cadastrales belges.

    Note : l'AGDP (Administration générale de la Documentation Patrimoniale)
    ne dispose pas d'une API REST publique directement accessible.

    Pour les parcelles flamandes, Geopunt propose un accès WFS.
    Pour Wallonie et Bruxelles, les données sont disponibles via MyMinfin
    ou les portails régionaux (WalOnMap, UrbIS).

    Cette fonction interroge l'API Geopunt pour la Flandre ; pour les autres
    régions, elle retourne un stub avec les références manuelles appropriées.
    """
    # Tentative via Geopunt (Flandre uniquement)
    result = _cadastre_geopunt(commune, section, numero)
    if result is not None:
        return result

    # Pour Wallonie et Bruxelles : stub avec instructions manuelles
    return {
        "commune": commune,
        "section": section,
        "numero": numero,
        "parcelles": [],
        "stub": True,
        "message": (
            "Le cadastre belge n'est pas accessible via une API publique unifiée. "
            "Pour consulter les parcelles : "
            "(1) Flandre : https://geo.api.vlaanderen.be/ | Geopunt.be ; "
            "(2) Wallonie : https://geoportail.wallonie.be (WalOnMap) ; "
            "(3) Bruxelles : https://urbis.irisnet.be ; "
            "(4) Toutes régions (données patrimoniales officielles) : "
            "https://finances.belgium.be/fr/particuliers/habitation/cadastre "
            "(MyMinfin, accès avec eID ou itsme)."
        ),
    }


def _cadastre_geopunt(commune: str, section: str = None, numero: str = None) -> dict | None:
    """Requête WFS Geopunt pour les parcelles cadastrales flamandes."""
    params = {
        "service": "WFS",
        "version": "2.0.0",
        "request": "GetFeature",
        "typeName": "AGIV:Perceel",
        "outputFormat": "application/json",
        "CQL_FILTER": f"GemeenteNaam LIKE '%{commune}%'",
        "maxFeatures": "20",
    }
    if section:
        params["CQL_FILTER"] += f" AND AfdNaam LIKE '%{section}%'"

    url = f"https://geo.api.vlaanderen.be/AGIV/wfs?{urllib.parse.urlencode(params)}"
    data = _fetch_json(url, timeout=15)

    if not data or "features" not in data:
        return None

    parcelles = []
    for feat in data.get("features", []):
        props = feat.get("properties", {})
        parcelles.append({
            "commune": props.get("GemeenteNaam") or commune,
            "section": props.get("AfdelingCode") or section,
            "numero": props.get("PerceelNummer") or numero,
            "contenance": props.get("CadastraleOppervlakte"),
            "identifiant": props.get("CaPaKey") or props.get("PerceelId"),
        })

    return {
        "commune": commune,
        "section": section,
        "numero": numero,
        "parcelles": parcelles,
        "source": "Geopunt / AGIV (Flandre)",
    }


# ---------------------------------------------------------------------------
# 3. Urbanisme / zonage
# ---------------------------------------------------------------------------

def check_urbanisme(lat: float, lon: float, region: str = None) -> dict:
    """
    Vérifie le zonage urbanistique d'un point en Belgique.

    L'API dépend de la région :
      - Bruxelles : UrbIS / BruGIS
      - Flandre   : Geopunt / Omgevingsloket
      - Wallonie  : WalOnMap (pas d'API REST publique directe)

    Si la région n'est pas précisée, elle est déduite des coordonnées.
    """
    if region is None:
        region = _region_depuis_coords(lat, lon)

    if region == "bruxelles":
        return _urbanisme_bruxelles(lat, lon)
    elif region == "flandre":
        return _urbanisme_flandre(lat, lon)
    else:
        # Wallonie : stub — pas d'API REST publique générale
        return {
            "latitude": lat,
            "longitude": lon,
            "region": "wallonie",
            "zones": [],
            "stub": True,
            "message": (
                "Le zonage urbanistique wallon (Plan de Secteur, PCAR, PCAD) n'est pas "
                "accessible via une API REST publique unifiée. "
                "Consultez manuellement : "
                "(1) WalOnMap : https://www.walonmap.be "
                "(couche 'Plan de secteur') ; "
                "(2) Portail open data SPW : https://opendata.wallonie.be ; "
                "(3) Service du Fonctionnaire délégué de votre commune."
            ),
        }


def _region_depuis_coords(lat: float, lon: float) -> str:
    """
    Estimation grossière de la région belge à partir des coordonnées.
    Utilise Nominatim pour une détection précise.
    """
    params = urllib.parse.urlencode({
        "lat": lat,
        "lon": lon,
        "format": "jsonv2",
        "zoom": 10,
    })
    url = f"https://nominatim.openstreetmap.org/reverse?{params}"
    data = _fetch_json(url)

    if not data:
        return "inconnu"

    addr = data.get("address", {})
    state = (addr.get("state") or addr.get("region") or "").lower()

    if "bruxelles" in state or "brussels" in state or "brussel" in state:
        return "bruxelles"
    if "flandre" in state or "flanders" in state or "vlaanderen" in state:
        return "flandre"
    if "wallonie" in state or "wallonia" in state or "wallonische" in state:
        return "wallonie"

    return "inconnu"


def _urbanisme_flandre(lat: float, lon: float) -> dict:
    """
    Zonage via Geopunt (Omgevingsloket / Bestemmingsplan Vlaanderen).
    """
    # Utilisation du service WFS Geopunt pour le plan de destination flamand
    params = urllib.parse.urlencode({
        "service": "WFS",
        "version": "2.0.0",
        "request": "GetFeature",
        "typeName": "RUIMTEINFO:RuimtelijkeUitvoeringsplannen",
        "outputFormat": "application/json",
        "CQL_FILTER": f"INTERSECTS(SHAPE, POINT({lon} {lat}))",
        "maxFeatures": "10",
    })
    url = f"https://geo.api.vlaanderen.be/RUIMTEINFO/wfs?{params}"
    data = _fetch_json(url)

    if not data or not data.get("features"):
        # Fallback : stub avec instructions manuelles
        return {
            "latitude": lat,
            "longitude": lon,
            "region": "flandre",
            "zones": [],
            "stub": True,
            "message": (
                "Zonage flamand non disponible via l'API. "
                "Consultez : https://omgevingsloket.be (bestemming) "
                "ou https://geopunt.be"
            ),
        }

    zones = []
    for feat in data.get("features", []):
        props = feat.get("properties", {})
        zones.append({
            "libelle": props.get("NAAM") or props.get("naam"),
            "type_zone": props.get("BESTEMMINGSKLASSE") or props.get("KLEURCODE"),
            "description": props.get("OMSCHRIJVING"),
            "partition": props.get("IDENTIFICATOR"),
        })

    return {
        "latitude": lat,
        "longitude": lon,
        "region": "flandre",
        "zones": zones,
        "source": "Geopunt / Omgevingsloket (Flandre)",
    }


def _urbanisme_bruxelles(lat: float, lon: float) -> dict:
    """
    Zonage via UrbIS / BruGIS (Région de Bruxelles-Capitale).
    Le PRAS (Plan Régional d'Affectation du Sol) est disponible via WMS/WFS.
    """
    params = urllib.parse.urlencode({
        "SERVICE": "WFS",
        "VERSION": "1.1.0",
        "REQUEST": "GetFeature",
        "TYPENAME": "UrbIS:PRAS",
        "OUTPUTFORMAT": "application/json",
        "CQL_FILTER": f"INTERSECTS(SHAPE, POINT({lon} {lat}))",
        "MAXFEATURES": "5",
    })
    url = f"https://geoservices.irisnet.be/arcgis/services/Urbanism/PRAS/MapServer/WFSServer?{params}"
    data = _fetch_json(url)

    if not data or not data.get("features"):
        return {
            "latitude": lat,
            "longitude": lon,
            "region": "bruxelles",
            "zones": [],
            "stub": True,
            "message": (
                "Zonage bruxellois (PRAS) non disponible via l'API. "
                "Consultez : https://myurbanisme.brussels (permis & urbanisme) "
                "ou https://urbis.irisnet.be"
            ),
        }

    zones = []
    for feat in data.get("features", []):
        props = feat.get("properties", {})
        zones.append({
            "libelle": props.get("LIBELLE_FR") or props.get("LIBELLE_NL"),
            "type_zone": props.get("CATEGORIE"),
            "description": props.get("DESCRIPTION_FR"),
        })

    return {
        "latitude": lat,
        "longitude": lon,
        "region": "bruxelles",
        "zones": zones,
        "source": "UrbIS / PRAS (Bruxelles)",
    }


# ---------------------------------------------------------------------------
# 4. Entreprises (BCE/KBO)
# ---------------------------------------------------------------------------

def search_entreprise(query: str) -> dict:
    """
    Recherche une entreprise belge via la BCE (Banque-Carrefour des Entreprises).
    Délègue vers le module fetch_company.py si disponible, sinon appel direct.
    """
    encoded = urllib.parse.quote(query)
    url = f"{BASE_URLS['bce_search']}?q={encoded}"
    data = _fetch_json(url)

    if data is None:
        return {
            "query": query,
            "count": 0,
            "results": [],
            "stub": True,
            "message": (
                "L'API BCE/KBO n'a pas répondu. "
                "Recherche manuelle : https://kbopub.economie.fgov.be/kbopublic/"
            ),
        }

    entries = data if isinstance(data, list) else data.get("results", data.get("enterprises", []))
    results = []
    for entry in entries[:5]:
        bce_raw = (
            entry.get("enterpriseNumber")
            or entry.get("enterprise_number")
            or entry.get("number")
            or ""
        )
        denominations = entry.get("denominations", [])
        nom = None
        for d in denominations:
            if isinstance(d, dict) and d.get("language") in ("FR", "2", 2):
                nom = d.get("denomination") or d.get("name")
                break
        if not nom and denominations:
            first = denominations[0]
            nom = (first.get("denomination") or first.get("name")) if isinstance(first, dict) else str(first)
        if not nom:
            nom = entry.get("name") or entry.get("denomination")

        results.append({
            "bce": bce_raw,
            "nom": nom,
            "forme_juridique": entry.get("juridicalForm", {}).get("labelFR") if isinstance(entry.get("juridicalForm"), dict) else entry.get("juridicalForm"),
            "statut": entry.get("enterpriseStatus") or entry.get("status"),
        })

    return {
        "query": query,
        "count": len(results),
        "results": results,
    }


# ---------------------------------------------------------------------------
# 5. Rapport immobilier belge
# ---------------------------------------------------------------------------

def rapport_complet(address: str) -> dict:
    """
    Rapport immobilier belge : géocode l'adresse puis enchaîne
    les données disponibles (cadastre, urbanisme, entreprise si pertinent).
    """
    print(f"[1/3] Géocodage : {address}", file=sys.stderr)
    geo = geocode(address)
    region = geo.get("region", "inconnu")
    print(
        f"       -> {geo.get('commune')} ({geo.get('code_postal')}), "
        f"region={region}, lat={geo.get('latitude')}, lon={geo.get('longitude')}",
        file=sys.stderr,
    )

    print(f"[2/3] Cadastre (AGDP)...", file=sys.stderr)
    commune = geo.get("commune") or ""
    cadastre = search_cadastre(commune)
    if cadastre.get("stub"):
        print(f"       -> STUB (pas d'API publique)", file=sys.stderr)
    else:
        print(f"       -> {len(cadastre.get('parcelles', []))} parcelle(s)", file=sys.stderr)

    print(f"[3/3] Zonage urbanistique ({region})...", file=sys.stderr)
    urbanisme = check_urbanisme(geo["latitude"], geo["longitude"], region)
    if urbanisme.get("stub"):
        print(f"       -> STUB (voir message)", file=sys.stderr)
    else:
        print(f"       -> {len(urbanisme.get('zones', []))} zone(s)", file=sys.stderr)

    return {
        "adresse": geo,
        "cadastre": cadastre,
        "urbanisme": urbanisme,
    }


def format_rapport_markdown(data: dict) -> str:
    """Formate un rapport immobilier belge en markdown structuré."""
    geo = data["adresse"]
    cadastre = data["cadastre"]
    urbanisme = data["urbanisme"]

    lines = []
    lines.append("# Rapport Immobilier (Belgique)")
    lines.append("")
    lines.append(f"**Adresse** : {geo.get('adresse', 'N/A')}")
    lines.append(f"**Commune** : {geo.get('commune', 'N/A')} ({geo.get('code_postal', 'N/A')})")
    lines.append(f"**Region** : {geo.get('region', 'N/A').title()}")
    lines.append(f"**Coordonnees** : {geo.get('latitude')}, {geo.get('longitude')}")
    lines.append(f"**Source geocodage** : {geo.get('source', 'N/A')}")
    lines.append("")
    lines.append("---")
    lines.append("")

    # Cadastre
    lines.append("## Cadastre (AGDP)")
    lines.append("")
    if cadastre.get("stub"):
        lines.append(f"*{cadastre['message']}*")
    elif cadastre.get("parcelles"):
        lines.append("| Commune | Section | Parcelle | Contenance |")
        lines.append("|---------|---------|----------|:----------:|")
        for p in cadastre["parcelles"][:20]:
            lines.append(
                f"| {p.get('commune', '?')} | {p.get('section', '?')} "
                f"| {p.get('numero', '?')} | {p.get('contenance', '?')} m2 |"
            )
        lines.append(f"")
        lines.append(f"*Source : {cadastre.get('source', 'N/A')}*")
    else:
        lines.append("*Aucune parcelle trouvee.*")
    lines.append("")
    lines.append("---")
    lines.append("")

    # Urbanisme
    lines.append("## Zonage Urbanistique")
    lines.append("")
    lines.append(f"**Region** : {urbanisme.get('region', 'N/A').title()}")
    lines.append("")
    if urbanisme.get("stub"):
        lines.append(f"*{urbanisme['message']}*")
    elif urbanisme.get("zones"):
        lines.append("| Zone | Type | Description |")
        lines.append("|------|------|-------------|")
        for z in urbanisme["zones"]:
            lines.append(
                f"| {z.get('libelle', '?')} | {z.get('type_zone', '?')} "
                f"| {z.get('description', '')} |"
            )
        lines.append(f"")
        lines.append(f"*Source : {urbanisme.get('source', 'N/A')}*")
    else:
        lines.append("*Aucun zonage disponible.*")
    lines.append("")
    lines.append("---")
    lines.append("")
    lines.append(
        "*Rapport genere automatiquement. Donnees issues de sources publiques belges "
        "(BOSA, Geopunt, UrbIS, Nominatim). "
        "Verifier aupres des services competents (notaire, commune, SPF Finances) "
        "pour un dossier officiel.*"
    )

    return "\n".join(lines)


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------

def main():
    parser = argparse.ArgumentParser(
        description="Recuperation de donnees ouvertes pour le skill notaire belge"
    )
    subparsers = parser.add_subparsers(dest="command", help="Commande a executer")

    # geocode
    p_geo = subparsers.add_parser("geocode", help="Geocoder une adresse belge")
    p_geo.add_argument("address", help="Adresse a geocoder")

    # cadastre
    p_cad = subparsers.add_parser("cadastre", help="Chercher des parcelles cadastrales (AGDP)")
    p_cad.add_argument("--commune", required=True, help="Nom de la commune")
    p_cad.add_argument("--section", default=None, help="Section cadastrale (ex: A)")
    p_cad.add_argument("--numero", default=None, help="Numero de parcelle (ex: 0012)")

    # urbanisme
    p_urb = subparsers.add_parser(
        "urbanisme",
        help="Verifier le zonage urbanistique selon la region",
    )
    p_urb.add_argument("--lat", type=float, required=True, help="Latitude (WGS84)")
    p_urb.add_argument("--lon", type=float, required=True, help="Longitude (WGS84)")
    p_urb.add_argument(
        "--region",
        choices=["bruxelles", "flandre", "wallonie"],
        default=None,
        help="Region (detectee automatiquement si absent)",
    )

    # entreprise
    p_ent = subparsers.add_parser("entreprise", help="Rechercher une entreprise (BCE/KBO)")
    p_ent.add_argument("query", help="Nom ou numero BCE de l'entreprise")

    # rapport
    p_rap = subparsers.add_parser("rapport", help="Rapport immobilier belge complet")
    p_rap.add_argument("address", help="Adresse du bien")
    p_rap.add_argument("--markdown", action="store_true", help="Sortie au format markdown")

    args = parser.parse_args()

    if not args.command:
        parser.print_help()
        sys.exit(1)

    if args.command == "geocode":
        result = geocode(args.address)
    elif args.command == "cadastre":
        result = search_cadastre(args.commune, args.section, args.numero)
    elif args.command == "urbanisme":
        result = check_urbanisme(args.lat, args.lon, args.region)
    elif args.command == "entreprise":
        result = search_entreprise(args.query)
    elif args.command == "rapport":
        result = rapport_complet(args.address)
        if args.markdown:
            print(format_rapport_markdown(result))
            return
    else:
        parser.print_help()
        sys.exit(1)

    print(json.dumps(result, indent=2, ensure_ascii=False))


if __name__ == "__main__":
    main()
