#!/usr/bin/env bash
# Helper: render_prs.sh
# Safely render the Quarto manuscript to a DOCX using a publisher-provided
# Word reference document (reference.docx). Do NOT add publisher templates
# to the repository. Place the reference DOCX at manuscript/reference-docx/

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
MANUSCRIPT_DIR="$ROOT_DIR/manuscript"
REFERENCE_DIR="$MANUSCRIPT_DIR/reference-docx"
REFERENCE_DOCX="$REFERENCE_DIR/reference.docx"

if [ ! -d "$MANUSCRIPT_DIR" ]; then
  echo "Error: manuscript directory not found: $MANUSCRIPT_DIR" >&2
  exit 2
fi

if [ ! -f "$REFERENCE_DOCX" ]; then
  echo "No publisher reference DOCX found."
  echo "Place the PRS Word reference document at: $REFERENCE_DOCX"
  echo "(Do NOT commit the reference DOCX to git.)"
  echo
  echo "You can still render without the reference doc: running default render..."
  (cd "$MANUSCRIPT_DIR" && ./render.sh docx)
  exit 0
fi

echo "Using publisher reference DOCX: $REFERENCE_DOCX"
echo "Rendering manuscript to DOCX with reference doc..."

cd "$MANUSCRIPT_DIR"

# Quarto allows specifying a reference-docx via the format options in YAML or
# using pandoc options. We'll invoke quarto render and rely on `_quarto.yml`
# to pick up `reference-docx: reference-docx/reference.docx` if present.

quarto render manuscript.qmd --to docx

echo "Render complete. Output is in manuscript/_output/"
