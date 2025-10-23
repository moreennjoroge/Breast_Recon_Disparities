# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a qualitative research project examining breast reconstruction decision-making among Black women. The repository contains manuscript materials, research data (de-identified), and analysis files for a study of 11 participants. The primary deliverable is a manuscript written using Quarto.

## Manuscript Workflow

### Environment Setup

The project uses Python 3.11+ with uv for package management:

```bash
# Install dependencies
uv sync

# Or add new packages
uv add package-name
```

### Quarto Installation

Quarto must be installed separately (not in Python environment):

```bash
# Quick install with sudo
cd /tmp
wget https://github.com/quarto-dev/quarto-cli/releases/download/v1.8.25/quarto-1.8.25-linux-amd64.deb
sudo dpkg -i quarto-1.8.25-linux-amd64.deb
quarto --version

# Without sudo (user directory)
cd ~
wget https://github.com/quarto-dev/quarto-cli/releases/download/v1.6.39/quarto-1.6.39-linux-amd64.tar.gz
tar -xzf quarto-1.6.39-linux-amd64.tar.gz
echo 'export PATH="$HOME/quarto-1.6.39/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

Full installation instructions: `QUARTO_SETUP.md`

### Rendering the Manuscript

Primary manuscript file: `manuscript/manuscript.qmd`

```bash
# Navigate to manuscript directory
cd manuscript

# Preview with live reload (best for editing)
quarto preview manuscript.qmd

# Render to Word (most common for academic submissions)
quarto render manuscript.qmd --to docx

# Or use the convenience script
./render.sh docx       # Word document
./render.sh pdf        # PDF (requires LaTeX: quarto install tinytex)
./render.sh html       # HTML
./render.sh preview    # Live preview
```

Output location: `manuscript/_output/manuscript.docx`

### Citation Management

- Bibliography: `references/references.bib` (BibTeX format)
- Citation style: AMA (American Medical Association) via `manuscript/ama.csl`
- Configuration: `manuscript/_quarto.yml`

To cite in manuscript:
```markdown
This is a statement.[@citation_key]
Multiple citations.[@citation1; @citation2]
```

Citation keys must match `@article{citation_key, ...}` entries in `references.bib`.

### Adding Figures

Place figures in `figures/` and reference in manuscript:
```markdown
![Caption text](../figures/filename.png){#fig-label}

Reference in text: @fig-label shows...
```

### Adding Tables

```markdown
| Column 1 | Column 2 |
|----------|----------|
| Data 1   | Data 2   |

: Table caption {#tbl-label}
```

Reference: `@tbl-label`

## Repository Structure

```
Breast_Recon_Disparities/
├── manuscript/
│   ├── manuscript.qmd              # Main manuscript (Quarto markdown)
│   ├── _quarto.yml                 # Quarto configuration
│   ├── ama.csl                     # Citation style
│   ├── render.sh                   # Helper script for rendering
│   ├── FEEDBACK_SUMMARY.md         # Supervisor feedback analysis
│   └── 2024-10-12_feedback_scans/  # Scanned supervisor comments (11 pages)
├── references/
│   └── references.bib              # Bibliography (BibTeX)
├── data/
│   └── README.md                   # Data handling and confidentiality protocols
├── analysis/
│   └── themes_template.md          # Qualitative coding templates
├── figures/
│   └── table1_demographics_template.md
├── notes/                          # Research planning and notes
├── QUARTO_SETUP.md                 # Quarto installation guide
├── QUICK_START.md                  # Quick reference for manuscript workflow
└── pyproject.toml                  # Python dependencies (uv)
```

## Key Manuscript Details

### Study Characteristics
- **Sample:** 11 Black women
- **Median Age:** 45 years (IQR: 10)
- **Method:** Semi-structured interviews
- **Analysis:** Thematic content analysis

### Three Main Themes
1. Patient-Provider Communication
2. Financial Barriers
3. Medical Mistrust

### Current Status

The manuscript has been transcribed from supervisor-annotated scans. Priority edits are documented in `manuscript/FEEDBACK_SUMMARY.md`.

**High-priority action items:**
1. Shorten participant quotes in Results section (currently too long)
2. Balance participant representation across themes (avoid over-relying on single participants)
3. Add concluding sentences to Discussion subsections
4. Reduce PM/date references in Discussion (too many timeline synchronizations)
5. Clarify Methods section, especially sampling and recruitment strategy

## Data Confidentiality - CRITICAL

**All participant data MUST be de-identified before committing to repository.**

De-identification requirements (see `data/README.md`):
- Names → pseudonyms
- Locations → general regions
- Specific dates → relative timeframes
- Healthcare facilities → removed
- Provider names → removed

Never commit files containing:
- `.env` files
- Files with identifiable participant information
- Original interview recordings
- Unredacted transcripts

Original identifiable data should be stored securely outside Git.

## Git Workflow

Default branch pattern: `claude/[task-description]-[id]`

Current branch: See git status output at session start

```bash
# Typical workflow
git add manuscript/manuscript.qmd
git commit -m "Shortened quotes in Results per supervisor feedback"
git push

# When ready for review
gh pr create --title "Implement supervisor feedback" --body "..."
```

## Common Tasks

### Test if Quarto is working
```bash
quarto check
cd manuscript && quarto render manuscript.qmd --to docx
```

### Edit manuscript with live preview
```bash
cd manuscript
quarto preview manuscript.qmd
# Edit manuscript.qmd in VS Code - changes appear in browser automatically
```

### Add a new citation
1. Add BibTeX entry to `references/references.bib`
2. Use `[@citation_key]` in `manuscript.qmd`
3. Citations render automatically on next build

### Find specific content in manuscript
```bash
# Use Grep tool on manuscript.qmd
# Or use Read tool to view relevant sections
```

## Project Documentation

- `QUICK_START.md` - Quick reference for manuscript workflow
- `QUARTO_SETUP.md` - Quarto installation instructions for GitHub Codespaces
- `manuscript/README.md` - Detailed manuscript editing guide
- `manuscript/FEEDBACK_SUMMARY.md` - Complete supervisor feedback with priorities
- `data/README.md` - Data handling and confidentiality protocols

## Dependencies

Python packages (managed by uv):
- jupyter
- nbformat
- nbclient

External requirement:
- Quarto CLI (must be installed separately)

Optional:
- TinyTeX for PDF output: `quarto install tinytex`

## Architecture Notes

### Manuscript Format
The manuscript uses Quarto markdown (`.qmd`), which combines:
- Markdown for text content
- YAML headers for configuration
- Pandoc-style citations
- Support for computational outputs (though not currently used in this project)

### Output Formats
Configured in `manuscript/_quarto.yml`:
- **DOCX:** Uses custom reference template, no TOC, AMA citations
- **PDF:** Letter size, 1-inch margins, 12pt font, double-spaced
- **HTML:** With TOC, Cosmo theme

All outputs save to `manuscript/_output/`

### Citation Processing
Citations flow: `manuscript.qmd` → Quarto/Pandoc → `references.bib` → `ama.csl` → formatted citations

The AMA style formats citations as superscript numbers with corresponding reference list.

## Tips for Editing

1. **Preview mode is your friend:** `quarto preview` provides live updates as you edit
2. **Keep quotes concise:** This is emphasized in supervisor feedback - extract essential points only
3. **Check participant balance:** Track which participants (P1-P11) are quoted in each theme
4. **Define all abbreviations:** First use should include full term
5. **Word count awareness:** Academic journals have strict limits
6. **Citation verification:** Ensure all in-text citations have corresponding BibTeX entries

## Troubleshooting

**"Quarto command not found":**
- Check installation: `which quarto`
- Verify PATH: `echo $PATH`
- Reinstall following `QUARTO_SETUP.md`

**Citations not rendering:**
- Verify citation keys match between `.qmd` and `.bib`
- Check BibTeX syntax in `references.bib`
- Ensure `bibliography:` path is correct in `_quarto.yml`

**PDF rendering fails:**
- Install TinyTeX: `quarto install tinytex`
- Or use DOCX output (most journals accept Word)

**Preview not updating:**
- Stop preview (Ctrl+C) and restart
- Check for YAML syntax errors
- Clear cache: `rm -rf manuscript/_output`
