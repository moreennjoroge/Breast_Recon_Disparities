# Quarto Installation Instructions for GitHub Codespaces

## Quick Installation

Run these commands in your GitHub Codespace terminal:

```bash
# Download and install Quarto
cd /tmp
wget https://github.com/quarto-dev/quarto-cli/releases/download/v1.8.25/quarto-1.8.25-linux-amd64.deb
sudo dpkg -i quarto-1.8.25-linux-amd64.deb

# Verify installation
quarto --version

# If you get any dependency errors, run:
sudo apt-get install -f
```

## Alternative: Install to User Directory (No sudo needed)

If you don't have sudo access:

```bash
# Download and extract to user directory
cd ~
wget https://github.com/quarto-dev/quarto-cli/releases/download/v1.6.39/quarto-1.6.39-linux-amd64.tar.gz
tar -xzf quarto-1.6.39-linux-amd64.tar.gz

# Add to PATH
echo 'export PATH="$HOME/quarto-1.6.39/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc

# Verify installation
quarto --version
```

## Install Required Python Packages

For Python integration and citations:

```bash
# Using uv (already set up)
uv add jupyter nbformat nbclient

# Or using pip
pip install jupyter nbformat nbclient
```

## Verify Setup

```bash
# Check Quarto is working
quarto check

# Preview the manuscript (from project root)
quarto preview manuscript/manuscript.qmd

# Render to PDF (requires LaTeX)
quarto render manuscript/manuscript.qmd --to pdf

# Render to Word
quarto render manuscript/manuscript.qmd --to docx

# Render to HTML
quarto render manuscript/manuscript.qmd --to html
```

## Install LaTeX for PDF Output (Optional)

If you need PDF output:

```bash
# Install TinyTeX (recommended - lightweight)
quarto install tinytex

# Or install full TeX Live (large download)
sudo apt-get install texlive-full
```

## Troubleshooting

### If Quarto command not found:
```bash
# Check if quarto is in PATH
echo $PATH

# Find where quarto was installed
which quarto

# Manually add to PATH if needed
export PATH="/path/to/quarto/bin:$PATH"
```

### If PDF rendering fails:
```bash
# Install TinyTeX
quarto install tinytex

# Or install additional LaTeX packages
tlmgr install collection-fontsrecommended
```

### If citations don't work:
```bash
# Make sure you have pandoc-citeproc or pandoc >= 2.11
pandoc --version
```

## Visual Studio Code Extensions (Recommended)

Install these extensions in your Codespace:

1. **Quarto** (quarto.quarto)
2. **Markdown All in One** (yzhang.markdown-all-in-one)
3. **Code Spell Checker** (streetsidesoftware.code-spell-checker)

## Quick Start Commands

```bash
# After installation, navigate to manuscript directory
cd /home/user/Breast_Recon_Disparities/manuscript

# Preview the manuscript (live reload)
quarto preview manuscript.qmd

# Render to Word document
quarto render manuscript.qmd --to docx

# Render to PDF
quarto render manuscript.qmd --to pdf
```

## Project Structure

```
Breast_Recon_Disparities/
├── manuscript/
│   ├── manuscript.qmd              # Main manuscript file
│   ├── _quarto.yml                 # Quarto configuration
│   └── 2024-10-12_feedback_scans/  # Supervisor feedback
├── references/
│   └── references.bib              # Bibliography file
└── figures/                        # Figures directory
```

## Useful Quarto Commands

```bash
# Create a new Quarto project
quarto create-project myproject

# Convert existing markdown to qmd
# (just rename .md to .qmd and add YAML header)

# Render all formats at once
quarto render manuscript.qmd

# Watch for changes and auto-render
quarto preview manuscript.qmd --watch

# Publish to Quarto Pub (optional)
quarto publish quarto-pub manuscript.qmd
```

## Next Steps After Installation

1. Open `manuscript/manuscript.qmd` in VS Code
2. Run `quarto preview manuscript/manuscript.qmd`
3. Edit the manuscript and see live updates
4. When ready, render to Word: `quarto render manuscript/manuscript.qmd --to docx`
5. Review output in `manuscript/manuscript.docx`

## References

- Quarto Documentation: https://quarto.org/docs/
- Quarto Guide: https://quarto.org/docs/guide/
- Citations: https://quarto.org/docs/authoring/footnotes-and-citations.html
