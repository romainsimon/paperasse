#!/usr/bin/env python3
"""
Tests pour fetch_notaire_data.py

Vérifie que toutes les APIs de données ouvertes répondent correctement et que le parsing fonctionne.
Exécution : python3 scripts/test_fetch_notaire_data.py

Ce sont des tests d'intégration qui appellent les vraies APIs. Ils peuvent échouer si :
- Pas de connexion internet
- Une API est temporairement indisponible
- Une API change son format de réponse (c'est justement le but de ces tests)
"""

import json
import sys
import os
import traceback

# Ajouter le répertoire parent au path pour importer le module
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import fetch_notaire_data as fnd


REUSSI = 0
ECHOUE = 0
IGNORE = 0

def test(nom, func):
    """Exécute un test et affiche le résultat."""
    global REUSSI, ECHOUE, IGNORE
    try:
        result = func()
        if result is None:
            IGNORE += 1
            print(f"  IGNORÉ  {nom}")
            return
        REUSSI += 1
        print(f"  OK      {nom}")
    except Exception as e:
        ECHOUE += 1
        print(f"  ÉCHEC   {nom} : {e}")
        traceback.print_exc()


def verifier_cles(data, cles, contexte=""):
    """Vérifie qu'un dictionnaire contient les clés attendues."""
    for cle in cles:
        assert cle in data, f"{contexte}Clé manquante '{cle}' dans {list(data.keys())}"


def verifier_type(valeur, type_attendu, contexte=""):
    """Vérifie qu'une valeur a le type attendu."""
    assert isinstance(valeur, type_attendu), f"{contexte}Attendu {type_attendu.__name__}, obtenu {type(valeur).__name__} : {valeur}"


# --- Tests ---

def test_geocode():
    """Test de l'API BAN (géocodage)."""
    result = fnd.geocode("1 place de la Concorde, Paris")
    verifier_cles(result, ["adresse", "score", "code_insee", "code_postal", "commune", "latitude", "longitude"])
    verifier_type(result["latitude"], float, "latitude : ")
    verifier_type(result["longitude"], float, "longitude : ")
    verifier_type(result["code_insee"], str, "code_insee : ")
    assert result["commune"] == "Paris", f"Attendu Paris, obtenu {result['commune']}"
    assert result["code_postal"].startswith("75"), f"Attendu 75xxx, obtenu {result['code_postal']}"
    assert result["score"] > 0.5, f"Score de confiance trop bas : {result['score']}"
    return result


def test_geocode_province():
    """Test du géocodage pour une adresse hors Paris."""
    result = fnd.geocode("10 place Bellecour, Lyon")
    assert result["commune"] == "Lyon", f"Attendu Lyon, obtenu {result['commune']}"
    assert result["code_postal"].startswith("69"), f"Attendu 69xxx, obtenu {result['code_postal']}"
    return result


def test_dvf():
    """Test de l'API DVF (Cerema)."""
    result = fnd.search_dvf("75101", limit=5)
    verifier_cles(result, ["code_insee", "count", "transactions"])
    verifier_type(result["count"], int, "count : ")
    assert result["count"] > 0, "Aucune transaction trouvée pour Paris 1er"
    assert len(result["transactions"]) <= 5, f"Obtenu {len(result['transactions'])} transactions, attendu <= 5"

    if result["transactions"]:
        tx = result["transactions"][0]
        verifier_cles(tx, ["date", "nature", "valeur_fonciere", "type_bien"])
    return result


def test_dvf_petite_commune():
    """Test DVF avec une commune plus petite."""
    try:
        result = fnd.search_dvf("94080", limit=3)  # Vincennes
    except (SystemExit, Exception) as e:
        if "timed out" in str(e).lower():
            return None  # Ignoré en cas de timeout
        raise
    verifier_cles(result, ["code_insee", "count", "transactions"])
    verifier_type(result["count"], int)
    return result


def test_cadastre():
    """Test de l'API Cadastre (IGN)."""
    result = fnd.search_cadastre("75101")
    verifier_cles(result, ["code_insee", "parcelles"])
    verifier_type(result["parcelles"], list)
    # L'API cadastre peut retourner une liste vide pour certaines requêtes
    return result


def test_risques():
    """Test de l'API Géorisques."""
    # Coordonnées de Paris
    result = fnd.check_risques(48.8566, 2.3522)
    # Géorisques retourne une structure complexe, on vérifie juste qu'on a quelque chose
    assert result is not None, "Géorisques a retourné None"
    verifier_type(result, dict, "risques : ")
    return result


def test_urbanisme():
    """Test de l'API GPU (IGN)."""
    result = fnd.check_urbanisme(48.8566, 2.3522)
    verifier_cles(result, ["latitude", "longitude", "zones"])
    verifier_type(result["zones"], list)
    return result


def test_deces():
    """Test de l'API MatchID (personnes décédées). Peut échouer à cause de Cloudflare."""
    try:
        result = fnd.search_deces("Dupont", prenom="Jean")
    except SystemExit:
        # MatchID est derrière Cloudflare et peut bloquer les requêtes automatisées
        return None  # Ignoré
    verifier_cles(result, ["count", "persons"])
    verifier_type(result["persons"], list)
    assert result["count"] > 0, "Aucune personne décédée trouvée pour Dupont Jean"

    if result["persons"]:
        person = result["persons"][0]
        verifier_cles(person, ["nom", "prenoms", "date_naissance", "date_deces"])
    return result


def test_entreprise():
    """Test de l'API Annuaire Entreprises."""
    result = fnd.search_entreprise("SCI")
    verifier_cles(result, ["query", "count", "results"])
    assert result["count"] > 0, "Aucune entreprise trouvée pour 'SCI'"

    if result["results"]:
        company = result["results"][0]
        verifier_cles(company, ["siren", "nom"])
        verifier_type(company["siren"], str, "siren : ")
    return result


def test_fichiers_donnees():
    """Vérifie que les fichiers de données sont du JSON valide avec la structure attendue."""
    data_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "notaire", "data")

    # DMTO
    with open(os.path.join(data_dir, "dmto-departements.json")) as f:
        dmto = json.load(f)
    verifier_cles(dmto, ["_meta", "taux_par_defaut", "departements"])
    verifier_type(dmto["departements"], list)
    assert len(dmto["departements"]) >= 100, f"Attendu >= 100 départements, obtenu {len(dmto['departements'])}"

    # Diagnostics
    with open(os.path.join(data_dir, "diagnostics-obligatoires.json")) as f:
        diag = json.load(f)
    verifier_cles(diag, ["_meta", "diagnostics", "resume_conditions"])
    assert len(diag["diagnostics"]) >= 10, f"Attendu >= 10 diagnostics, obtenu {len(diag['diagnostics'])}"

    # Abattements
    with open(os.path.join(data_dir, "abattements-succession-donation.json")) as f:
        abat = json.load(f)
    verifier_cles(abat, ["_meta", "abattements", "baremes", "usufruit_art_669"])
    verifier_cles(abat["abattements"], ["succession", "donation"])
    verifier_cles(abat["baremes"], ["ligne_directe", "entre_epoux", "freres_soeurs"])

    return True


# --- Principal ---

def main():
    global REUSSI, ECHOUE, IGNORE
    print("Test des APIs de fetch_notaire_data.py...\n")

    print("[Fichiers de données]")
    test("Structure des fichiers JSON", test_fichiers_donnees)

    print("\n[BAN — Géocodage]")
    test("Géocodage adresse Paris", test_geocode)
    test("Géocodage adresse Lyon", test_geocode_province)

    print("\n[DVF — Valeurs foncières]")
    test("DVF Paris 1er", test_dvf)
    test("DVF Vincennes", test_dvf_petite_commune)

    print("\n[Cadastre — IGN]")
    test("Cadastre Paris 1er", test_cadastre)

    print("\n[Géorisques]")
    test("Risques Paris", test_risques)

    print("\n[GPU — Urbanisme]")
    test("PLU Paris", test_urbanisme)

    print("\n[MatchID — Décès]")
    test("Recherche personne décédée", test_deces)

    print("\n[Annuaire Entreprises]")
    test("Recherche SCI", test_entreprise)

    print(f"\n{'='*50}")
    print(f"Résultats : {REUSSI} réussi(s), {ECHOUE} échoué(s), {IGNORE} ignoré(s)")
    print(f"{'='*50}")

    sys.exit(1 if ECHOUE > 0 else 0)


if __name__ == "__main__":
    main()
