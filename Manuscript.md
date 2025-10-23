# Manuscript Directory

This directory contains the manuscript files for the breast reconstruction disparities study.

## Files

- `manuscript.qmd` - Main manuscript file in Quarto markdown format
- `_quarto.yml` - Quarto configuration file
- `ama.csl` - American Medical Association citation style
- `FEEDBACK_SUMMARY.md` - Summary of supervisor feedback from scanned edits
- `2024-10-12_feedback_scans/` - Scanned pages with handwritten supervisor comments

## Quick Start

### Prerequisites

1. Install Quarto following instructions in `../QUARTO_SETUP.md`
2. Ensure you have a LaTeX installation for PDF output (optional)

### Rendering the Manuscript

```bash
# Navigate to manuscript directory
cd manuscript

# Preview with live reload (opens in browser)
quarto preview manuscript.qmd

# Render to Word document
quarto render manuscript.qmd --to docx

# Render to PDF (requires LaTeX)
quarto render manuscript.qmd --to pdf

# Render to HTML
quarto render manuscript.qmd --to html

# Render all formats
quarto render manuscript.qmd
```

### Output Location

Rendered files are saved to `_output/` directory:
- `_output/manuscript.docx` - Word document
- `_output/manuscript.pdf` - PDF document
- `_output/manuscript.html` - HTML document

## Editing the Manuscript

### Adding Citations

Citations are stored in `../references/references.bib`. To cite a source in the manuscript:

```markdown
This is a citation.[@author_year]
Multiple citations can be combined.[@author1_year; @author2_year]
```

### Adding Figures

Place figures in `../figures/` directory and reference them:

```markdown
![Figure caption](../figures/figure_name.png){#fig-label}

Reference in text: @fig-label shows...
```

### Adding Tables

Create tables in markdown or use computational outputs:

```markdown
| Column 1 | Column 2 |
|----------|----------|
| Data 1   | Data 2   |
| Data 3   | Data 4   |

: Table caption {#tbl-label}
```

## Managing References

### BibTeX Format

References are in BibTeX format in `../references/references.bib`. Example:

```bibtex
@article{smith2020,
  title={Article Title},
  author={Smith, John and Doe, Jane},
  journal={Journal Name},
  year={2020},
  volume={10},
  number={5},
  pages={123--145},
  doi={10.1234/example}
}
```

### Citation Style

The manuscript uses AMA (American Medical Association) citation style defined in `ama.csl`.

To change citation style, download a different `.csl` file from:
https://github.com/citation-style-language/styles

And update the `csl:` field in the YAML header of `manuscript.qmd` or in `_quarto.yml`.

## Customizing Output

### Word Document Template

To customize Word document formatting:

1. Generate a reference document:
   ```bash
   quarto pandoc -o custom-reference.docx --print-default-data-file reference.docx
   ```

2. Edit `custom-reference.docx` with your preferred styles

3. The template is already referenced in `_quarto.yml`

### PDF Formatting

PDF formatting is controlled in the YAML header:

```yaml
format:
  pdf:
    documentclass: article
    geometry: margin=1in
    fontsize: 12pt
    linestretch: 2  # double spacing
```

## Supervisor Feedback

Supervisor feedback is documented in:
- `FEEDBACK_SUMMARY.md` - Comprehensive summary with prioritized action items
- `2024-10-12_feedback_scans/` - Original scanned pages with handwritten comments

### Priority Edits

**HIGH PRIORITY:**
1. Shorten participant quotes in Results
2. Balance participant representation across themes
3. Add concluding sentences to Discussion sections
4. Reduce PM/date references in Discussion
5. Clarify Methods section (sampling and recruitment)

**MEDIUM PRIORITY:**
6. Simplify title page and corresponding author section
7. Clarify Introduction logic and flow
8. Define all abbreviations
9. Reorganize Discussion paragraphs

## Version Control

The manuscript is version controlled with Git. Commit frequently with descriptive messages:

```bash
git add manuscript.qmd
git commit -m "Updated Results section based on feedback"
git push
```

## Troubleshooting

### Citations not rendering
- Check that `references.bib` path is correct in YAML header
- Verify BibTeX entries are properly formatted
- Ensure citation keys match between `.bib` file and manuscript

### PDF rendering fails
- Install TinyTeX: `quarto install tinytex`
- Or install full LaTeX distribution

### Preview not updating
- Stop preview (Ctrl+C) and restart
- Check for YAML syntax errors
- Clear cache: `rm -rf _output`

## Additional Resources

- Quarto Documentation: https://quarto.org/docs/
- Quarto Manuscripts: https://quarto.org/docs/manuscripts/
- Citation Management: https://quarto.org/docs/authoring/footnotes-and-citations.html
- Cross-references: https://quarto.org/docs/authoring/cross-references.html
