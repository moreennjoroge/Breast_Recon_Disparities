<!-- .github/copilot-instructions.md
     Purpose: concise, actionable guidance for AI coding agents working on this repo.
-->

# Copilot instructions for Breast_Recon_Disparities

Be practical, conservative, and repository-aware. This project is a Quarto-based manuscript + analysis repo for a qualitative study. Follow these rules when making edits, suggestions, or automation changes.

1. Big-picture: this repo contains manuscript source (Quarto `.qmd`), references (`references/references.bib`), figures (`figures/`), analysis notes (`analysis/`), and data (`data/`). Primary user workflow: edit `manuscript/manuscript.qmd`, preview with Quarto, render to DOCX/PDF via `manuscript/render.sh` or `quarto render`.

2. Do not touch sensitive data: The `data/README.md` documents strict de-identification requirements. Never add, un-redact, or output participant identifiers. If code would process raw transcripts, add clear comments and require an opt-in flag (and ensure files are excluded by `.gitignore`).

3. Key files to reference in suggestions or edits:
   - `manuscript/manuscript.qmd` — main manuscript source
   - `manuscript/_quarto.yml` — output formats and templates
   - `manuscript/render.sh` — convenience render script
   - `references/references.bib` — BibTeX bibliography
   - `QUARTO_SETUP.md`, `manuscript/README.md`, `manuscript/FEEDBACK_SUMMARY.md` — workflow and priorities

4. Typical developer commands you may suggest (use exactly where appropriate):
   - Install deps (uv): `uv sync` or `uv add <pkg>`
   - Render manuscript (dir: `manuscript/`): `./render.sh docx` or `quarto render manuscript.qmd --to docx`
   - Live preview: `cd manuscript && quarto preview manuscript.qmd`

5. Citation and figure conventions:
      - Citations use Pandoc/Quarto style: in-text like `[@citation_key]`. Always reference `references/references.bib` entries. Do not invent citation keys.
         - Figures live in `figures/`. Reference them from the manuscript using Quarto image syntax and assign a short label for cross-references (example label: `fig-label`). Place new images in `figures/` and update captions/labels accordingly.

6. Editing manuscript text:
   - When shortening participant quotes (frequent requested task), preserve meaning and note which participant ID (P1–P11) the quote came from. Keep a short inline comment in the commit message referencing `FEEDBACK_SUMMARY.md` priority items.
   - Avoid altering study methods, sample numbers, or participant identifiers unless given explicit instruction and a source file to change.

7. Automation and code changes:
   - Prefer non-invasive, reversible edits. Add small scripts (under `scripts/`) only if they include README and a safety check that data are de-identified.
   - If adding dependencies, update `pyproject.toml` and describe rationale in the commit message.

8. Tests, linting, and verification:
   - There are no unit tests by default. For any runnable code added, include a minimal smoke test and document how to run it in the file header or `README.md`.

9. Git workflow and branch naming:
   - Branches follow `claude/<task>-<id>` by convention in this repo. Use descriptive commit messages and reference `FEEDBACK_SUMMARY.md` when implementing requested edits.

10. When uncertain, add a short TODO comment and do not make assumptions about participant data or IRB constraints. Flag the maintainer in the PR body and link to `data/README.md`.

Examples (use these patterns when making edits):

- To render and check DOCX output: `cd manuscript && ./render.sh docx` — output appears in `manuscript/_output/`.
- To add a citation: add BibTeX in `references/references.bib` and use `[@newkey]` in `manuscript/manuscript.qmd`.
- To shorten a quote: edit `manuscript/manuscript.qmd`, replace the long quote, and commit with message: `Shorten quote in Results — follow FEEDBACK_SUMMARY.md (P3 example)`.

If you update these instructions, keep them concise and include only repository-discoverable information. Ask for clarification in PR descriptions when tasks touch data confidentiality or study facts.
