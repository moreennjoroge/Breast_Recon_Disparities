# Quick Start Guide

## What's Been Set Up

### ✅ Complete Quarto Manuscript System

All files have been created and committed to branch: `claude/manuscript-edits-setup-011CUP6LBQE88uud76ktcEw5`

## 📁 Project Structure

```
Breast_Recon_Disparities/
├── QUARTO_SETUP.md              # ← Quarto installation instructions
├── manuscript/
│   ├── manuscript.qmd           # ← Main manuscript (transcribed from scans)
│   ├── _quarto.yml              # ← Quarto configuration
│   ├── ama.csl                  # ← AMA citation style
│   ├── render.sh                # ← Helper script to render manuscript
│   ├── README.md                # ← Detailed manuscript documentation
│   ├── FEEDBACK_SUMMARY.md      # ← Supervisor feedback summary
│   └── 2024-10-12_feedback_scans/  # ← Original scanned feedback (11 pages)
├── references/
│   └── references.bib           # ← Bibliography file (needs completion)
└── pyproject.toml               # ← Python project config (uv)
```

## 🚀 Next Steps (In Order)

### Step 1: Install Quarto in Your GitHub Codespace

Open a terminal and run:

```bash
# Quick install (requires sudo)
cd /tmp
wget https://github.com/quarto-dev/quarto-cli/releases/download/v1.6.39/quarto-1.6.39-linux-amd64.deb
sudo dpkg -i quarto-1.6.39-linux-amd64.deb

# Verify installation
quarto --version
```

**Alternative (no sudo):** See detailed instructions in `QUARTO_SETUP.md`

### Step 2: Render the Manuscript

```bash
# Navigate to manuscript directory
cd manuscript

# Option A: Use the helper script (recommended)
./render.sh docx          # Renders to Word
./render.sh pdf           # Renders to PDF (requires LaTeX)
./render.sh html          # Renders to HTML
./render.sh preview       # Live preview with auto-reload

# Option B: Use Quarto directly
quarto render manuscript.qmd --to docx
```

**Output location:** `manuscript/_output/manuscript.docx`

### Step 3: Complete the Bibliography

Edit `references/references.bib` to fill in the actual citation details:

1. Find each citation marked with `note={Citation X from manuscript}`
2. Replace placeholder information with actual publication details
3. You can use tools like:
   - Google Scholar (click "Cite" → "BibTeX")
   - PubMed (select citation → "Export" → "BibTeX")
   - Zotero, Mendeley, or EndNote

### Step 4: Implement Supervisor Feedback

See `manuscript/FEEDBACK_SUMMARY.md` for detailed list. **High priority items:**

1. **Shorten participant quotes** - Results section has very long quotes
2. **Balance representation** - Don't rely too heavily on single participants
3. **Add concluding sentences** - Each Discussion subsection needs wrap-up
4. **Reduce PM/date references** - Too much timeline synchronization
5. **Clarify Methods** - Sampling and recruitment needs clearer explanation

### Step 5: Review and Iterate

```bash
# Preview with live reload (auto-updates as you edit)
cd manuscript
quarto preview manuscript.qmd
```

Edit `manuscript.qmd` in your code editor, save, and see changes in real-time!

## 📝 What's in manuscript.qmd

The manuscript has been fully transcribed from your scanned feedback PDF:

- **Title page** - All authors and affiliations
- **Abstract** - Complete with Background, Methods, Results, Conclusion
- **Introduction** - Full introduction section
- **Methods** - Study design, participants, data collection, analysis
- **Results** - Including all participant quotes (marked for shortening)
- **Discussion** - Partial discussion (needs completion per feedback)
- **References** - Bibliography system set up and ready

## 🎯 Immediate Action Items

### For You:

1. **Install Quarto** (5 minutes)
   ```bash
   # See QUARTO_SETUP.md for detailed instructions
   ```

2. **Test rendering** (2 minutes)
   ```bash
   cd manuscript
   ./render.sh docx
   # Check manuscript/_output/manuscript.docx
   ```

3. **Review the transcription** (30 minutes)
   - Open `manuscript/manuscript.qmd`
   - Compare with original scans
   - Note any discrepancies

### For Later:

4. **Complete citations** (varies)
   - Fill in `references/references.bib` with actual publication details

5. **Implement feedback** (several hours)
   - Follow priority order in `FEEDBACK_SUMMARY.md`
   - Start with shortening quotes
   - Add concluding sentences
   - Clarify Methods section

## 📚 Documentation Files

- **`QUARTO_SETUP.md`** - Detailed Quarto installation for GitHub Codespaces
- **`manuscript/README.md`** - Complete guide to using the manuscript system
- **`manuscript/FEEDBACK_SUMMARY.md`** - All 11 pages of supervisor feedback analyzed

## 💡 Tips

### Editing in VS Code

1. Install the **Quarto extension** in VS Code
2. Install **Markdown All in One** extension
3. Use the built-in preview for live editing

### Citations

To add a citation in the text:

```markdown
This is a statement.[@citation_key]
Multiple citations.[@citation1; @citation2]
```

The citation key comes from the `@article{citation_key, ...}` in `references.bib`

### Preview Mode

Best way to work:

```bash
# Terminal 1: Start preview server
cd manuscript
quarto preview manuscript.qmd

# Terminal 2: Your normal terminal
# Edit manuscript.qmd in VS Code
# Save the file and see instant updates in preview
```

## ❓ Troubleshooting

**Quarto command not found**
- Make sure you ran the installation commands
- Try: `which quarto` to find where it's installed
- Add to PATH if needed

**Citations not rendering**
- Check that citation keys in manuscript match those in references.bib
- Verify BibTeX syntax in references.bib

**PDF rendering fails**
- Install LaTeX: `quarto install tinytex`
- Or stick with DOCX output (most journals accept Word)

## 🔄 Git Workflow

All changes are on branch: `claude/manuscript-edits-setup-011CUP6LBQE88uud76ktcEw5`

```bash
# Make edits
git add manuscript/manuscript.qmd
git commit -m "Shortened participant quotes in Results"
git push
```

## 📞 Need Help?

Check these files:
1. `QUARTO_SETUP.md` - Installation issues
2. `manuscript/README.md` - Usage questions
3. `manuscript/FEEDBACK_SUMMARY.md` - What to edit

---

## Summary

**You're all set!** The manuscript system is ready. Just:

1. Install Quarto (see QUARTO_SETUP.md)
2. Test render: `cd manuscript && ./render.sh docx`
3. Start implementing feedback from FEEDBACK_SUMMARY.md

Everything is version-controlled and ready for collaborative editing.
