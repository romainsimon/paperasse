#!/usr/bin/env python3
"""
Tests pour fetch_notaire_data.py (version belge)

Verifie que les APIs de donnees ouvertes belges repondent correctement
et que le parsing fonctionne.
Execution : python3 scripts/test_fetch_notaire_data.py

Ce sont des tests d'integration qui appellent les vraies APIs.
Ils peuvent echouer si :
- Pas de connexion internet
- Une API est temporairement indisponible
- Une API change son format de reponse (c'est justement le but de ces tests)

Les stubs (fonctions qui n'appellent pas d'API publique) sont marques STUB
et sont toujours valides.
"""

import json
import sys
import os
import traceback

# Ajouter le repertoire courant au path pour importer le module
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import fetch_notaire_data as fnd


REUSSI = 0
ECHOUE = 0
IGNORE = 0


def test(nom, func):
    """Execute un test et affiche le resultat."""
    global REUSSI, ECHOUE, IGNORE
    try:
        result = func()
        if result is None:
            IGNORE += 1
            print(f"  IGNORE  {nom}")
            return
        REUSSI += 1
        print(f"  OK      {nom}")
    except Exception as e:
        ECHOUE += 1
        print(f"  ECHEC   {nom} : {e}")
        traceback.print_exc()


def verifier_cles(data, cles, contexte=""):
    """Verifie qu'un dictionnaire contient les cles attendues."""
    for cle in cles:
        assert cle in data, f"{contexte}Cle manquante '{cle}' dans {list(data.keys())}"


def verifier_type(valeur, type_attendu, contexte=""):
    """Verifie qu'une valeur a le type attendu."""
    assert isinstance(valeur, type_attendu), (
        f"{contexte}Attendu {type_attendu.__name__}, "
        f"obtenu {type(valeur).__name__} : {valeur}"
    )


# ---------------------------------------------------------------------------
# Utilitaires BCE
# ---------------------------------------------------------------------------

def test_format_bce_chiffres():
    """Normalisation d'un numero BCE depuis 10 chiffres bruts."""
    assert fnd.format_bce("0123456789") == "0123.456.789"
    assert fnd.format_bce("0474289237") == "0474.289.237"
    return True


def test_format_bce_pointe():
    """Normalisation depuis format pointe."""
    assert fnd.format_bce("0123.456.789") == "0123.456.789"
    return True


def test_format_bce_prefixe_be():
    """Normalisation depuis format TVA belge."""
    assert fnd.format_bce("BE0123456789") == "0123.456.789"
    assert fnd.format_bce("BE 0123.456.789") == "0123.456.789"
    return True


def test_bce_vers_tva():
    """Conversion BCE -> numero TVA belge."""
    assert fnd.bce_to_tva("0123456789") == "BE0123456789"
    assert fnd.bce_to_tva("0123.456.789") == "BE0123456789"
    return True


# ---------------------------------------------------------------------------
# Geocodage
# ---------------------------------------------------------------------------

def test_geocode_bruxelles():
    """Geocodage d'une adresse bruxelloise connue."""
    try:
        result = fnd.geocode("Rue de la Loi 16, 1000 Bruxelles")
    except SystemExit:
        return None  # API indisponible

    verifier_cles(result, ["adresse", "latitude", "longitude", "code_postal", "commune", "region"])
    verifier_type(result["latitude"], float, "latitude : ")
    verifier_type(result["longitude"], float, "longitude : ")

    # La latitude de Bruxelles est autour de 50.8
    assert 50.5 <= result["latitude"] <= 51.2, f"Latitude inattendue : {result['latitude']}"
    # La longitude de Bruxelles est autour de 4.3
    assert 4.0 <= result["longitude"] <= 4.7, f"Longitude inattendue : {result['longitude']}"

    assert result["region"] == "bruxelles", f"Region attendue bruxelles, obtenu {result['region']}"
    return result


def test_geocode_liege():
    """Geocodage d'une adresse liegeoise."""
    try:
        result = fnd.geocode("Place Saint-Lambert 1, 4000 Liege")
    except SystemExit:
        return None

    verifier_cles(result, ["latitude", "longitude", "code_postal"])
    verifier_type(result["latitude"], float)
    assert result["region"] == "wallonie", f"Region attendue wallonie, obtenu {result['region']}"
    return result


def test_geocode_gand():
    """Geocodage d'une adresse flamande (Gand)."""
    try:
        result = fnd.geocode("Korenmarkt 1, 9000 Gent")
    except SystemExit:
        return None

    verifier_cles(result, ["latitude", "longitude"])
    verifier_type(result["latitude"], float)
    assert result["region"] == "flandre", f"Region attendue flandre, obtenu {result['region']}"
    return result


def test_detecter_region_codes_postaux():
    """Detection de region par code postal."""
    assert fnd._detecter_region("1000") == "bruxelles"
    assert fnd._detecter_region("1200") == "bruxelles"
    assert fnd._detecter_region("4000") == "wallonie"   # Liege
    assert fnd._detecter_region("5000") == "wallonie"   # Namur
    assert fnd._detecter_region("6000") == "wallonie"   # Charleroi
    assert fnd._detecter_region("2000") == "flandre"    # Anvers
    assert fnd._detecter_region("9000") == "flandre"    # Gand
    assert fnd._detecter_region("8000") == "flandre"    # Bruges
    return True


# ---------------------------------------------------------------------------
# Cadastre (AGDP)
# ---------------------------------------------------------------------------

def test_cadastre_stub_wallonie():
    """
    Le cadastre wallon/bruxellois retourne un stub avec message explicatif.
    La fonction ne doit pas lever d'exception.
    """
    # Ixelles est bruxellois/wallon -> doit retourner un stub ou donnees Geopunt
    result = fnd.search_cadastre("Ixelles", section="A", numero="0012")
    verifier_cles(result, ["commune", "parcelles"])
    verifier_type(result["parcelles"], list)
    # Si stub, le message doit etre informatif
    if result.get("stub"):
        assert len(result.get("message", "")) > 50, "Message stub trop court"
    return result


def test_cadastre_commune_flamande():
    """Cadastre pour une commune flamande via Geopunt (peut retourner stub si API indisponible)."""
    try:
        result = fnd.search_cadastre("Gent")
    except SystemExit:
        return None

    verifier_cles(result, ["commune", "parcelles"])
    verifier_type(result["parcelles"], list)
    return result


# ---------------------------------------------------------------------------
# Urbanisme
# ---------------------------------------------------------------------------

def test_urbanisme_bruxelles():
    """Zonage urbanistique pour un point bruxellois."""
    try:
        result = fnd.check_urbanisme(50.8503, 4.3517, region="bruxelles")
    except SystemExit:
        return None

    verifier_cles(result, ["latitude", "longitude", "region", "zones"])
    assert result["region"] == "bruxelles"
    verifier_type(result["zones"], list)
    # Stub acceptable si API indisponible
    if result.get("stub"):
        assert len(result.get("message", "")) > 20
    return result


def test_urbanisme_flandre():
    """Zonage urbanistique pour un point flamand."""
    try:
        result = fnd.check_urbanisme(51.0543, 3.7174, region="flandre")  # Gand
    except SystemExit:
        return None

    verifier_cles(result, ["latitude", "longitude", "region", "zones"])
    assert result["region"] == "flandre"
    verifier_type(result["zones"], list)
    return result


def test_urbanisme_wallonie_stub():
    """Wallonie retourne obligatoirement un stub (pas d'API publique unifiee)."""
    result = fnd.check_urbanisme(50.4669, 4.8674, region="wallonie")  # Namur
    verifier_cles(result, ["latitude", "longitude", "region", "zones", "stub", "message"])
    assert result["stub"] is True, "Wallonie doit retourner un stub"
    assert result["region"] == "wallonie"
    assert len(result["message"]) > 50
    return result


# ---------------------------------------------------------------------------
# Entreprises (BCE/KBO)
# ---------------------------------------------------------------------------

def test_entreprise_recherche_nom():
    """Recherche d'une entreprise belge par nom."""
    try:
        result = fnd.search_entreprise("SRL")
    except SystemExit:
        return None

    verifier_cles(result, ["query", "count", "results"])
    verifier_type(result["results"], list)

    if result["results"]:
        company = result["results"][0]
        verifier_cles(company, ["bce", "nom"])
    return result


def test_entreprise_numero_bce():
    """Recherche par numero BCE (Bpost : 0214.596.464)."""
    try:
        result = fnd.search_entreprise("0214.596.464")
    except SystemExit:
        return None

    verifier_cles(result, ["query", "count", "results"])
    return result


def test_entreprise_stub_fallback():
    """
    Si l'API BCE n'est pas disponible, le resultat doit etre un stub valide
    avec un message, et non une exception.
    """
    # On ne peut pas simuler une panne ici, mais on verifie la structure du stub
    # en mockant _fetch_json localement
    original = fnd._fetch_json

    def mock_fetch_json(url, timeout=20):
        return None  # Simule une panne reseau

    fnd._fetch_json = mock_fetch_json
    try:
        result = fnd.search_entreprise("Test entreprise")
    finally:
        fnd._fetch_json = original

    verifier_cles(result, ["query", "count", "results", "stub", "message"])
    assert result["stub"] is True
    assert result["count"] == 0
    return result


# ---------------------------------------------------------------------------
# Rapport complet
# ---------------------------------------------------------------------------

def test_rapport_structure():
    """
    Verifie la structure du rapport complet pour une adresse bruxelloise.
    Peut retourner None si le geocodage echoue (pas de connexion).
    """
    try:
        result = fnd.rapport_complet("Avenue Louise 65, 1050 Ixelles")
    except SystemExit:
        return None

    verifier_cles(result, ["adresse", "cadastre", "urbanisme"])
    verifier_cles(result["adresse"], ["latitude", "longitude", "commune"])
    verifier_cles(result["cadastre"], ["commune", "parcelles"])
    verifier_cles(result["urbanisme"], ["latitude", "longitude", "zones"])
    return result


def test_format_rapport_markdown():
    """
    Verifie que format_rapport_markdown genere du markdown valide
    a partir d'un rapport fictif.
    """
    donnees_fictives = {
        "adresse": {
            "adresse": "Rue de la Loi 16, 1000 Bruxelles",
            "commune": "Bruxelles",
            "code_postal": "1000",
            "region": "bruxelles",
            "latitude": 50.8503,
            "longitude": 4.3517,
            "source": "Test",
        },
        "cadastre": {
            "commune": "Bruxelles",
            "section": "A",
            "numero": "0001",
            "parcelles": [
                {
                    "commune": "Bruxelles",
                    "section": "A",
                    "numero": "0001",
                    "contenance": 250,
                    "identifiant": "21004A0001/00_000",
                }
            ],
            "source": "Test",
        },
        "urbanisme": {
            "latitude": 50.8503,
            "longitude": 4.3517,
            "region": "bruxelles",
            "zones": [
                {
                    "libelle": "Zone administrative",
                    "type_zone": "ADMIN",
                    "description": "Zone a affectation administrative",
                }
            ],
            "source": "Test",
        },
    }

    md = fnd.format_rapport_markdown(donnees_fictives)
    assert "# Rapport Immobilier" in md
    assert "Bruxelles" in md
    assert "Cadastre" in md
    assert "Zonage" in md
    assert len(md) > 300, "Markdown trop court"
    return True


# ---------------------------------------------------------------------------
# Fichiers de donnees
# ---------------------------------------------------------------------------

def test_fichiers_donnees():
    """Verifie que les fichiers de donnees notaire sont du JSON valide."""
    data_dir = os.path.join(
        os.path.dirname(os.path.abspath(__file__)),
        "..",
        "notaire",
        "data",
    )

    fichiers_a_verifier = [
        ("abattements-succession-donation.json", ["_meta", "abattements", "baremes"]),
        ("diagnostics-obligatoires.json", ["_meta", "diagnostics"]),
    ]

    for fichier, cles_attendues in fichiers_a_verifier:
        chemin = os.path.join(data_dir, fichier)
        if not os.path.exists(chemin):
            print(f"    (fichier absent : {fichier})", file=sys.stderr)
            continue
        with open(chemin, encoding="utf-8") as f:
            data = json.load(f)
        verifier_cles(data, cles_attendues, f"{fichier} : ")

    return True


# ---------------------------------------------------------------------------
# Principal
# ---------------------------------------------------------------------------

def main():
    global REUSSI, ECHOUE, IGNORE
    print("Test des APIs belges de fetch_notaire_data.py...\n")

    print("[Utilitaires BCE — sans reseau]")
    test("format_bce depuis chiffres", test_format_bce_chiffres)
    test("format_bce depuis format pointe", test_format_bce_pointe)
    test("format_bce depuis prefixe BE", test_format_bce_prefixe_be)
    test("bce_to_tva", test_bce_vers_tva)
    test("detection region par code postal", test_detecter_region_codes_postaux)

    print("\n[Geocodage — APIs belges]")
    test("Geocodage Bruxelles (Rue de la Loi)", test_geocode_bruxelles)
    test("Geocodage Liege (Place Saint-Lambert)", test_geocode_liege)
    test("Geocodage Gand (Korenmarkt)", test_geocode_gand)

    print("\n[Cadastre — AGDP]")
    test("Cadastre Ixelles (stub attendu)", test_cadastre_stub_wallonie)
    test("Cadastre Gand (Geopunt)", test_cadastre_commune_flamande)

    print("\n[Urbanisme — par region]")
    test("Zonage Bruxelles (lat/lon)", test_urbanisme_bruxelles)
    test("Zonage Flandre (Gand)", test_urbanisme_flandre)
    test("Zonage Wallonie (stub obligatoire)", test_urbanisme_wallonie_stub)

    print("\n[BCE/KBO — Entreprises]")
    test("Recherche entreprise par nom", test_entreprise_recherche_nom)
    test("Recherche entreprise par numero BCE", test_entreprise_numero_bce)
    test("Fallback stub si API indisponible", test_entreprise_stub_fallback)

    print("\n[Rapport immobilier]")
    test("Structure rapport complet Ixelles", test_rapport_structure)
    test("Format rapport markdown (donnees fictives)", test_format_rapport_markdown)

    print("\n[Fichiers de donnees]")
    test("Structure des fichiers JSON notaire", test_fichiers_donnees)

    print(f"\n{'='*50}")
    print(f"Resultats : {REUSSI} reussi(s), {ECHOUE} echoue(s), {IGNORE} ignore(s)")
    print(f"{'='*50}")

    sys.exit(1 if ECHOUE > 0 else 0)


if __name__ == "__main__":
    main()
