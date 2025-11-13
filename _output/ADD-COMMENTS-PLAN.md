# Plan: Add Word Comments to Manuscript

## Objective
Add Word comments to `index.docx` documenting where all 17 November 2025 feedback items were addressed.

## Current Status
- ✅ All 17 changes implemented in manuscript
- ✅ FEEDBACK-TRACKING-REPORT.md created with complete documentation
- ✅ Comment-adding script created (`/tmp/add_feedback_comments.py`)
- ❌ Script hanging due to iCloud path issues

## The Problem
Python scripts hang when accessing files in iCloud paths:
```
/Users/shakes/Library/Mobile Documents/com~apple~CloudDocs/Mundy Edits/...
```

## The Solution
Move files to local `/tmp` directory, run scripts there, then move final output back.

---

## Step-by-Step Workflow

### Phase 1: Move Files Out of iCloud ✓ (Already Done)

Files already unpacked to `/tmp/manuscript-unpacked/` by earlier test script.

### Phase 2: Run Comment Script

**Script Location:** `/tmp/add_feedback_comments.py`

**Command:**
```bash
cd /tmp && \
PYTHONPATH="/Users/shakes/Library/Mobile Documents/com~apple~CloudDocs/Mundy Edits/Breast_Recon_Disparities/.claude/skills/docx" \
python3 add_feedback_comments.py
```

**What it does:**
- Loads unpacked manuscript from `/tmp/manuscript-unpacked/`
- Adds 14 Word comments documenting all feedback implementation
- Saves modified manuscript to temporary location within document library

**Expected output:**
```
Initializing document with comments support...
Adding comments to document...

1. Adding summary comment...
   ✓ Summary comment added

2. Financial disclosure...
   ✓ Comment added

[... etc for all 14 comments ...]

======================================================================
Saving document with comments...
======================================================================

✓ Document saved successfully with all comments!
```

### Phase 3: Pack Modified Document

The Document library saves to a temporary directory. Find this location from script output.

**Command:**
```bash
# Find the temp directory (script will output this)
# It will be something like: /tmp/manuscript-unpacked_XXXXXX

# Pack it back to DOCX
cd /tmp
python3 "/Users/shakes/Library/Mobile Documents/com~apple~CloudDocs/Mundy Edits/Breast_Recon_Disparities/.claude/skills/docx/ooxml/scripts/pack.py" \
  <temp_directory_from_script> \
  index-with-comments.docx
```

**Expected output:**
```
✓ Document packed successfully
Output: /tmp/index-with-comments.docx
```

### Phase 4: Move Back to Project

**Command:**
```bash
cp /tmp/index-with-comments.docx \
  "/Users/shakes/Library/Mobile Documents/com~apple~CloudDocs/Mundy Edits/Breast_Recon_Disparities/_output/index-with-comments.docx"
```

### Phase 5: Verify in Microsoft Word

**Manual step:**
1. Open `_output/index-with-comments.docx` in Microsoft Word
2. View > Review Pane
3. Verify all 14 comments appear correctly:
   - 1 summary comment at document start
   - 8 tracked edit comments
   - 7 strategic comment responses
   - Comments should reference correct locations in text

---

## Comments to be Added

### Summary Comment (Document Start)
✅ NOVEMBER 2025 REVISION COMPLETE - ALL FEEDBACK ADDRESSED

### Tracked Edits (8 comments)
1. **Financial disclosure** - "This work was supported by a grant..."
2. **Compensation** - "Participants received compensation for their time"
3. **Data Collection** - "Semi-structured interviews were conducted using an interview guide"
4. **Encrypted drive** - "securely stored on an encrypted drive"
5. **Data Analysis** - "discuss coding decisions through consensus-building"
6. **Reconstruction status** - "with a history of breast reconstruction"

### Strategic Comments (7 comments)
7. **Introduction opening** - "Psychosocial and quality-of-life benefits"
8. **Purposive sampling** - "purposive sampling"
9. **Study site** - "single academic cancer center clinic"
10. **Results streamlined** - "Eleven women consented"
11. **Participant IDs** - "I still wanted to look like a woman"
12. **Figure** - "Figure 1"
13. **Tables placement** - "Table 1"

---

## Troubleshooting

### If script still hangs:
1. Kill all background processes
2. Check that `/tmp/manuscript-unpacked/` has proper structure:
   ```bash
   ls -la /tmp/manuscript-unpacked/
   # Should show: [Content_Types].xml, _rels/, docProps/, word/
   ```
3. Re-run unpack step from scratch if needed

### If comments don't appear in Word:
- Check that `word/comments.xml` exists in unpacked directory after script runs
- Verify `word/_rels/document.xml.rels` has comment relationships
- Check `[Content_Types].xml` includes comments content type

### Alternative: Manual Comment Addition
If automated approach fails, open Word and manually add comments using text from FEEDBACK-TRACKING-REPORT.md:
1. Open `_output/index.docx`
2. Review > New Comment at each location
3. Copy/paste comment text from tracking report

---

## Files Reference

**Input:**
- `/tmp/manuscript-unpacked/` - Unpacked DOCX structure
- `/tmp/add_feedback_comments.py` - Comment script

**Scripts:**
- `/tmp/add_feedback_comments.py` - Adds all 14 comments
- `.claude/skills/docx/ooxml/scripts/pack.py` - Packs back to DOCX

**Output:**
- `/tmp/index-with-comments.docx` - Final commented manuscript
- `_output/index-with-comments.docx` - Final location in project

**Documentation:**
- `_output/FEEDBACK-TRACKING-REPORT.md` - Complete change documentation
- `_output/ADD-COMMENTS-PLAN.md` - This file

---

## Success Criteria

✅ Script runs without hanging
✅ 14 Word comments added to manuscript
✅ All comments reference correct text locations
✅ Comments visible in Microsoft Word Review Pane
✅ Final DOCX saved to `_output/index-with-comments.docx`
✅ Document can be shared with Dr. Mundy for review

---

## Next Steps After Completion

1. **Share with Dr. Mundy:**
   - Primary: `_output/index-with-comments.docx` (with Word comments)
   - Supporting: `_output/FEEDBACK-TRACKING-REPORT.md` (detailed documentation)

2. **Verification:**
   - Dr. Mundy opens Word document
   - Reviews comments in Review Pane
   - Can see exactly where each feedback item was addressed

3. **Final manuscript ready for journal submission** after supervisor approval
