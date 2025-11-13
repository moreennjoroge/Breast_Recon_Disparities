# Clone and Run Instructions

## What's Been Committed

All necessary files for the Word comments workflow have been committed to git:

### Documentation Files
✅ `_output/ADD-COMMENTS-PLAN.md` - Complete workflow for adding Word comments
✅ `_output/FEEDBACK-TRACKING-REPORT.md` - All 17 changes documented
✅ `_output/add_feedback_comments.py` - Python script using docx skill

### Manuscript Files
✅ `index.qmd` - Main manuscript with all 17 November 2025 feedback changes implemented
✅ `manuscript/custom-affiliations.css` - Manuscript styling
✅ `figures/Socioecological_Model_Final.pptx` - Updated figure
✅ `archive/FEEDBACK_SUMMARY.md` - Original feedback documentation

### Configuration Files
✅ `pyproject.toml` - Python dependencies (includes python-docx)
✅ `.gitignore` - Updated to exclude uv.lock and .venv
✅ `.claude/output-styles/research-workflow.md` - Output style configuration
✅ `.claude/settings.json` - Project settings
✅ `_quarto.yml` - Quarto configuration

### What's Excluded (by .gitignore)
❌ `uv.lock` - Can be regenerated from pyproject.toml
❌ `.venv/` - Virtual environment (recreated on each system)
❌ `_output/*.docx` - Binary Word files (too large for git)

---

## Step 1: Clone Repository Outside iCloud

The iCloud directory path causes Python and git commands to hang. Clone to a non-iCloud location:

```bash
# Choose a non-iCloud directory
cd ~/Documents  # or ~/Projects or any non-iCloud path

# Clone the repository
git clone <your-repo-url> Breast_Recon_Disparities

# Navigate into the cloned repository
cd Breast_Recon_Disparities
```

**Important:** Replace `<your-repo-url>` with your actual GitHub repository URL.

---

## Step 2: Check Git Status

Once cloned, check if you have unpushed commits:

```bash
git status
git log --oneline -5
```

You should see the recent commit:
```
deded32 Add November 2025 feedback documentation and Word comment workflow
```

If you see "ahead of origin" by 11 commits, you need to push:

```bash
git push
```

---

## Step 3: Set Up Python Environment

Install dependencies from `pyproject.toml`:

```bash
# Install uv if not already installed
curl -LsSf https://astral.sh/uv/install.sh | sh

# Create virtual environment and install dependencies
uv sync

# Verify python-docx is installed
uv pip list | grep python-docx
```

---

## Step 4: Copy Manuscript DOCX File

The Word document is not in git (excluded by .gitignore). You need to copy it from your iCloud directory:

```bash
# Copy the current manuscript from iCloud to local project
cp "/Users/shakes/Library/Mobile Documents/com~apple~CloudDocs/Mundy Edits/Breast_Recon_Disparities/_output/index.docx" \
   _output/index.docx
```

Or render a fresh copy from the Quarto source:

```bash
# Install Quarto if needed (see QUARTO_SETUP.md)
quarto render index.qmd --to docx

# The output will be at: _output/index.docx
```

---

## Step 5: Run the Word Comments Workflow

Now follow the workflow in `_output/ADD-COMMENTS-PLAN.md`:

### Phase 1: Unpack the DOCX

```bash
# Unpack to /tmp to avoid any iCloud issues
cd _output
python3 ~/.claude/skills/docx/ooxml/scripts/unpack.py \
  index.docx \
  /tmp/manuscript-unpacked
```

### Phase 2: Add Comments

```bash
cd /tmp

# Find the docx skill location
DOCX_SKILL_PATH=$(find ~/.claude/skills -name "document.py" -path "*/docx/scripts/*" 2>/dev/null | head -1 | xargs dirname | xargs dirname)

# Run the comment script with proper PYTHONPATH
PYTHONPATH="$DOCX_SKILL_PATH" python3 ~/path/to/Breast_Recon_Disparities/_output/add_feedback_comments.py
```

### Phase 3: Pack Back to DOCX

```bash
cd /tmp

# Pack the modified manuscript
python3 ~/.claude/skills/docx/ooxml/scripts/pack.py \
  manuscript-unpacked \
  index-with-comments.docx
```

### Phase 4: Copy Back to Project

```bash
# Copy the commented manuscript back to your project
cp /tmp/index-with-comments.docx ~/Documents/Breast_Recon_Disparities/_output/
```

### Phase 5: Verify in Microsoft Word

```bash
# Open in Word to verify comments
open ~/Documents/Breast_Recon_Disparities/_output/index-with-comments.docx
```

In Word:
1. View > Review Pane
2. Verify all 14 comments appear correctly
3. Comments should reference the correct text locations

---

## Alternative: Use Existing Documentation

If the automated workflow has issues, you can share the existing documentation with Dr. Mundy:

**Primary:** `_output/FEEDBACK-TRACKING-REPORT.md` - Complete documentation of all 17 changes
**Supporting:** `_output/index.docx` - Clean manuscript with all changes implemented

The markdown report already provides comprehensive documentation that can be reviewed alongside the manuscript.

---

## Troubleshooting

### Python Script Hangs
- Ensure you're running from a non-iCloud directory
- Check that PYTHONPATH points to the correct docx skill location
- Try running with explicit python path: `python3 script.py`

### DOCX Unpacking Fails
- Verify the DOCX file exists and is valid
- Check file permissions
- Try opening the DOCX in Word first to ensure it's not corrupted

### Comments Don't Appear in Word
- Check that `word/comments.xml` exists after script runs
- Verify `word/_rels/document.xml.rels` has comment relationships
- Open the unpacked document structure to inspect XML files

### Git Push Hangs
- Try pushing from the cloned non-iCloud directory
- Check network connection
- Verify GitHub credentials are configured

---

## Success Criteria

✅ Repository cloned to non-iCloud location
✅ All commits pushed to remote
✅ Python environment set up with uv
✅ python-docx installed
✅ Manuscript DOCX copied to project
✅ Comments script runs successfully
✅ 14 Word comments added to manuscript
✅ Final `index-with-comments.docx` created
✅ Comments visible in Microsoft Word
✅ Ready to share with Dr. Mundy

---

## What to Share with Dr. Mundy

Once complete, share these files:

1. **`_output/index-with-comments.docx`** - Manuscript with Word comments showing where each feedback item was addressed
2. **`_output/FEEDBACK-TRACKING-REPORT.md`** - Comprehensive documentation of all changes (backup reference)

Dr. Mundy can then:
- Open the Word document
- View comments in Review Pane
- See exactly where each of her 17 feedback items was implemented
- Review the changes in context

---

## Files in This Repository

```
Breast_Recon_Disparities/
├── index.qmd                                    # Main manuscript source
├── _quarto.yml                                  # Quarto config
├── pyproject.toml                               # Python dependencies
├── .gitignore                                   # Excludes uv.lock, .venv, binary files
├── CLONE-AND-RUN-INSTRUCTIONS.md                # This file
├── _output/
│   ├── ADD-COMMENTS-PLAN.md                     # Detailed workflow
│   ├── FEEDBACK-TRACKING-REPORT.md              # All 17 changes documented
│   ├── add_feedback_comments.py                 # Comment script
│   └── [index.docx - Copy from iCloud or render]
├── .claude/
│   ├── output-styles/research-workflow.md       # Output style
│   └── settings.json                            # Project settings
├── manuscript/
│   └── custom-affiliations.css                  # Styling
├── figures/
│   └── Socioecological_Model_Final.pptx         # Updated figure
└── archive/
    └── FEEDBACK_SUMMARY.md                      # Original feedback
```

---

## Need Help?

Refer to these files:
- `_output/ADD-COMMENTS-PLAN.md` - Detailed step-by-step workflow
- `_output/FEEDBACK-TRACKING-REPORT.md` - Complete change documentation
- `QUARTO_SETUP.md` - Quarto installation instructions
- `QUICK_START.md` - Manuscript workflow reference
