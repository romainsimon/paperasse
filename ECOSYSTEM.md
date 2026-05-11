# Ecosystem — Community Forks

> **For maintainers of jurisdiction-specific forks:** add your fork to the table below via a PR.
> One row per jurisdiction. Keep it factual: repo, scope, working language, output language, license, status.

---

## Why this file exists

The paperasse architecture — `SKILL.md` + `references/` + `evals/` + `data/` + `templates/` — is jurisdiction-agnostic by design. The pattern travels well, but jurisdiction law is total: French PCG/BOFiP/URSSAF has zero overlap with Tunisian JORT/BCT/CNSS/RNE. Forks belong in separate repos, not as branches of this one.

This file is the registry. Users looking for their jurisdiction start here.

---

## Community forks

| Jurisdiction | Repo | Scope | Working language | Output language | License | Status |
|---|---|---|---|---|---|---|
| TN Tunisia | [`YassineAta/paperasse-tn`](https://github.com/YassineAta/paperasse-tn) | Freelancers / devs / small entrepreneurs -- IRPP, IS, CNSS (10 classes), BCT forex compliance, Diwana, RNE filing, SUARL/patente, NAT codes | English | English (explanations) / French (output docs) | MIT | v0.2.0 - active |

---

## Adding your fork

Open a PR that adds **one row** to the table above. Checklist before opening:

- [ ] Your fork is MIT-compatible (or clearly states a different license in the row).
- [ ] Your `README.md` credits upstream `romainsimon/paperasse` with a link and mentions MIT attribution.
- [ ] Your repo follows the `SKILL.md` + `references/` + `evals/` layout (skills may differ; structure should not).
- [ ] Status is honest: `alpha`, `beta`, `active`, `archived`, or `maintenance`.

That's it. No approval process -- just a PR. If your jurisdiction already has an entry that's gone stale, open a PR to update it.

---

## What forks should NOT do

- **Reuse upstream skill slugs** (`comptable`, `notaire`, etc.) for jurisdiction-specific skills. Use your own slugs to avoid conflicts in skill loaders that index by slug.
- **Claim compatibility with upstream** unless evals pass against the upstream harness. Forks diverge by design.
- **Copy upstream references verbatim** for a different jurisdiction. French CGI articles don't apply to Tunisian IRPP. The references layer must be rebuilt from local primary sources.

---

## Cross-fork coordination

If you're making a change that affects the **shared architecture** -- `SKILL.md` schema, eval harness API, `data/sources.json` format, `marketplace.json` structure -- open an issue on the upstream repo tagged `ecosystem` before merging. Fork maintainers watch upstream; this gives them a heads-up to adapt without breaking their pipelines silently.

---

*This file is maintained by the community. If a fork goes stale for more than 12 months with no commits, it will be moved to a "Stale forks" section -- not removed.*
