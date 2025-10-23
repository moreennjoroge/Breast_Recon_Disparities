#!/bin/bash

# Manuscript Rendering Script
# Usage: ./render.sh [format]
# Formats: docx (default), pdf, html, all

set -e

FORMAT=${1:-docx}

echo "============================================"
echo "Rendering Manuscript"
echo "============================================"
echo "Format: $FORMAT"
echo "Time: $(date)"
echo "============================================"
echo ""

cd "$(dirname "$0")"

case $FORMAT in
  docx)
    echo "Rendering to Word document..."
    quarto render manuscript.qmd --to docx
    echo "✓ Word document created: _output/manuscript.docx"
    ;;
  pdf)
    echo "Rendering to PDF..."
    quarto render manuscript.qmd --to pdf
    echo "✓ PDF created: _output/manuscript.pdf"
    ;;
  html)
    echo "Rendering to HTML..."
    quarto render manuscript.qmd --to html
    echo "✓ HTML created: _output/manuscript.html"
    ;;
  all)
    echo "Rendering to all formats..."
    quarto render manuscript.qmd
    echo "✓ All formats created in _output/"
    ;;
  preview)
    echo "Starting preview server..."
    echo "Press Ctrl+C to stop"
    quarto preview manuscript.qmd
    ;;
  *)
    echo "Error: Unknown format '$FORMAT'"
    echo "Usage: ./render.sh [docx|pdf|html|all|preview]"
    exit 1
    ;;
esac

echo ""
echo "============================================"
echo "Rendering complete!"
echo "============================================"
