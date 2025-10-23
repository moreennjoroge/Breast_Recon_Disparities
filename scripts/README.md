Rendering for journal submissions (PRS guideline)
===============================================

This folder contains a small helper script to render the Quarto manuscript
to a DOCX using a publisher-supplied Word reference document (often called
"reference.docx" or a journal template). Because publisher templates
are typically proprietary, DO NOT add them to this repository.


How it works
------------

- If you have a PRS (Plastic and Reconstructive Surgery) or PRS Global
  Open Word reference document, place it at `manuscript/reference-docx/reference.docx`.

- Run the helper script from the repo root:

```bash
./scripts/render_prs.sh
```


What the script does
--------------------

- If no reference DOCX is present, it falls back to the project's default
  render script: `manuscript/render.sh docx`.

- If a reference DOCX is present, Quarto will use it when rendering the
  DOCX output (Quarto/Pandoc handles `reference-docx` via YAML or format
  options). The script keeps the workflow simple and avoids committing
  publisher files.


Where to get a PRS reference DOCX
---------------------------------

- PRS/PRS Global Open author instructions pages usually link to Word
  templates or specify formatting details. The publisher (Lippincott
  / Wolters Kluwer) may require authentication to download templates.

- If you have institutional access or an editorial contact, download the
  Word reference document and place it in `manuscript/reference-docx/`.


Safety and confidentiality
-------------------------

- Do NOT commit the publisher-supplied reference DOCX or any proprietary
  templates to the repository.

- If you store templates locally, add `manuscript/reference-docx/` to
  `.gitignore` (the project intentionally avoids including templates).


Notes
-----

- If you want Quarto to explicitly use the reference DOCX, add the
  following to your YAML (e.g., in `manuscript/_quarto.yml` or the
  document header):

```yaml
format:
  docx:
    reference-docx: reference-docx/reference.docx
```

This repo's helper script assumes the same relative path.
