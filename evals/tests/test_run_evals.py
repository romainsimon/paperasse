import json
import sys
import tempfile
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

import run_evals


class ChangedSkillSelectionTest(unittest.TestCase):
    def setUp(self) -> None:
        self.config = {
            "global_paths": ["evals/", "package.json"],
            "skills": {
                "comptable": {
                    "path": "comptable",
                    "shared_paths": ["data/", "scripts/", "company.example.json"],
                },
                "notaire": {
                    "path": "notaire",
                    "shared_paths": ["scripts/fetch_notaire_data.py"],
                },
                "syndic": {
                    "path": "syndic",
                },
            },
        }
        self.selected = ["comptable", "notaire", "syndic"]

    def test_docs_only_changes_do_not_select_skills(self) -> None:
        changed = ["README.md", "CONTRIBUTING.md"]
        resolved = run_evals._resolve_changed_skills(self.config, self.selected, changed)
        self.assertEqual(resolved, [])

    def test_shared_paths_select_expected_skill(self) -> None:
        changed = ["scripts/fetch_notaire_data.py"]
        resolved = run_evals._resolve_changed_skills(self.config, self.selected, changed)
        self.assertEqual(resolved, ["comptable", "notaire"])

    def test_global_paths_select_all_skills(self) -> None:
        changed = ["evals/run_evals.py"]
        resolved = run_evals._resolve_changed_skills(self.config, self.selected, changed)
        self.assertEqual(resolved, self.selected)


class RunCacheKeyTest(unittest.TestCase):
    def setUp(self) -> None:
        self.tempdir = tempfile.TemporaryDirectory()
        self.root = Path(self.tempdir.name)
        self.skill_path = self.root / "comptable"
        (self.skill_path / "fixtures").mkdir(parents=True)
        (self.skill_path / "SKILL.md").write_text("name: Comptable\n")
        (self.skill_path / "fixtures" / "input.json").write_text('{"amount": 100}\n')

        self.original_root = run_evals.REPO_ROOT
        run_evals.REPO_ROOT = self.root

    def tearDown(self) -> None:
        run_evals.REPO_ROOT = self.original_root
        self.tempdir.cleanup()

    def test_cache_key_changes_when_inputs_change(self) -> None:
        skill_config = {
            "path": "comptable",
            "baseline_prompt": "Tu es un expert-comptable.",
            "tools": "Read",
        }
        scenario = {
            "prompt": "Fais la cloture annuelle.",
            "files": ["fixtures/input.json"],
            "expectations": [],
        }

        key_initial = run_evals._cache_key(
            run_evals._build_run_cache_spec(skill_config, scenario, "with_skill", "claude-sonnet")
        )

        (self.skill_path / "fixtures" / "input.json").write_text('{"amount": 200}\n')
        key_after_fixture_change = run_evals._cache_key(
            run_evals._build_run_cache_spec(skill_config, scenario, "with_skill", "claude-sonnet")
        )
        self.assertNotEqual(key_initial, key_after_fixture_change)

        (self.skill_path / "SKILL.md").write_text("name: Comptable\nrole: senior\n")
        key_after_skill_change = run_evals._cache_key(
            run_evals._build_run_cache_spec(skill_config, scenario, "with_skill", "claude-sonnet")
        )
        self.assertNotEqual(key_after_fixture_change, key_after_skill_change)

    def test_mark_cached_run_timing_zeroes_incremental_cost(self) -> None:
        output_dir = self.root / "out"
        output_dir.mkdir()
        timing_path = output_dir / run_evals.TIMING_FILE
        timing_path.write_text(
            '{"input_tokens": 120, "output_tokens": 45, "total_cost_usd": 1.25, "duration_ms": 9000, "duration_api_ms": 8500}\n'
        )

        run_evals._mark_cached_run_timing(output_dir)

        timing = json.loads(timing_path.read_text())
        self.assertTrue(timing["cache_hit"])
        self.assertEqual(timing["total_cost_usd"], 0)
        self.assertEqual(timing["duration_ms"], 0)
        self.assertEqual(timing["source_total_cost_usd"], 1.25)
        self.assertEqual(timing["source_input_tokens"], 120)


if __name__ == "__main__":
    unittest.main()
