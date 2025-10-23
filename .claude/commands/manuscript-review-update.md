# Manuscript Review and Update Workflow

**Command:** `/manuscript:review-update` or `/ms:review` (shorthand)
**Purpose:** Automated multi-tier manuscript quality improvement with parallel execution
**Cost:** ~$0.35 per full review cycle (56% cheaper than all-Sonnet)
**Time:** 30-45 minutes (vs 4-6 hours manual)

---

## Usage

```
/manuscript:review-update [sections] [--research-threshold=LEVEL]
```

**Parameters:**
- `[sections]`: Optional. Comma-separated list of sections to review
  - Options: `abstract`, `intro`, `methods`, `results`, `discussion`, `conclusion`, `all`
  - Default: `all`
  - Example: `/manuscript:review-update intro,discussion`

- `[--research-threshold=LEVEL]`: Optional. Minimum issue count to trigger research
  - Options: `low` (≥3 high-priority gaps), `medium` (≥5), `high` (≥8)
  - Default: `medium`
  - Example: `/manuscript:review-update --research-threshold=low`

**Examples:**
```bash
# Review all sections, medium threshold
/manuscript:review-update

# Review only Introduction and Discussion
/manuscript:review-update intro,discussion

# Review all with low threshold (trigger research more easily)
/manuscript:review-update all --research-threshold=low

# Short form
/ms:review
```

---

## Workflow Overview

This command orchestrates a 6-phase automated manuscript improvement workflow:

```
PHASE 1: Parallel Section Review (Claude 3 Haiku)
   ↓
PHASE 2: Coordination & Decision (Sonnet) → Research needed?
   ↓                                          ↓
   NO → Skip to Phase 4                     YES → Continue
                                              ↓
PHASE 3a: Parallel Research (3.5 Haiku) || PHASE 3b: Bib Prep (Claude 3 Haiku)
   ↓
PHASE 4: Consolidation & Writing (Sonnet)
   ↓
PHASE 5: Bibliography Update (Claude 3 Haiku)
   ↓
PHASE 6: Validation & Rendering
```

---

## Execution Instructions

When this command is invoked, execute the following phases:

---

### PHASE 1: Parallel Section Review

**Objective:** Generate quality analysis reports for each manuscript section

**Execution:**

1. **Determine sections to review** based on user parameter:
   ```
   If [sections] = "all" or not provided:
     sections_list = [abstract, intro, methods, results, discussion, conclusion]
   Else:
     sections_list = parse([sections])
   ```

2. **Spawn N × manuscript-section-reviewer agents in parallel:**

   For each section in sections_list, spawn:
   ```
   Task tool with:
     subagent_type: "general-purpose"
     description: "Review [section] section"
     prompt: |
       Read your specification from .claude/agents/manuscript-section-reviewer.md

       Review the [SECTION] section of the manuscript (index.qmd lines [X-Y]).

       Generate a structured report identifying:
       - Citation gaps (claims without citations)
       - Outdated references (≥10 years old)
       - Vague quantifiers ("significantly", "substantially", etc.)
       - Weak claims needing stronger evidence

       Save report to: .parallel/section-reviews/[section]-review-$(date +%Y%m%d).md

       Cost target: <$0.005
   ```

   **Section line ranges:**
   - Abstract: lines 117-135
   - Introduction: lines 118-165
   - Methods: lines 136-195
   - Results: lines 196-235
   - Discussion: lines 238-282
   - Conclusion: lines 276-282

3. **Wait for all section reviewers to complete**

4. **Expected outputs:**
   - `.parallel/section-reviews/abstract-review-[date].md`
   - `.parallel/section-reviews/intro-review-[date].md`
   - `.parallel/section-reviews/methods-review-[date].md`
   - `.parallel/section-reviews/results-review-[date].md`
   - `.parallel/section-reviews/discussion-review-[date].md`
   - `.parallel/section-reviews/conclusion-review-[date].md`

**Cost:** ~$0.024 (6 sections × $0.004)
**Time:** ~5 minutes (parallel execution)

---

### PHASE 2: Coordination & Decision

**Objective:** Analyze all section reports and decide if research is needed

**Execution:**

1. **Read all section review reports:**
   ```bash
   Read .parallel/section-reviews/abstract-review-[date].md
   Read .parallel/section-reviews/intro-review-[date].md
   # ... etc for all sections
   ```

2. **Aggregate findings:**
   ```markdown
   ## Aggregated Findings Across All Sections

   **Total Issues:**
   - High-priority citation gaps: [N]
   - Medium-priority citation gaps: [N]
   - Low-priority citation gaps: [N]
   - Outdated references (high priority): [N]
   - Outdated references (medium priority): [N]
   - Vague quantifiers: [N]
   - Weak claims: [N]

   **Section Rankings by Issue Count:**
   1. [Section]: [N] high-priority issues
   2. [Section]: [N] high-priority issues
   ...
   ```

3. **Apply research threshold decision:**
   ```
   Research threshold levels:
   - low: ≥3 high-priority gaps → spawn researchers
   - medium: ≥5 high-priority gaps → spawn researchers
   - high: ≥8 high-priority gaps → spawn researchers

   If high-priority gaps >= threshold:
     decision = "SPAWN RESEARCH AGENTS"
     research_tasks = extract high-priority research recommendations from reports
   Else:
     decision = "SKIP RESEARCH - Proceed to Phase 4 with existing citations"
   ```

4. **Generate coordination report:**

   Save to `.parallel/coordination/coordinator-decision-[date].md`:
   ```markdown
   # Coordinator Decision Report

   **Date:** [Current date]
   **Coordinator:** Sonnet (manuscript-writer)
   **Sections Analyzed:** [N]
   **Research Threshold:** [low/medium/high]

   ---

   ## Aggregated Findings

   [Paste aggregated findings from step 2]

   ---

   ## Decision

   **Research Needed:** [YES / NO]
   **Rationale:** [Explanation based on threshold and findings]

   ---

   ## Research Tasks (If YES)

   ### High Priority Tasks ([N] tasks)
   1. **Task:** Find 2023-2025 studies on [topic]
      - **For section:** [Section name]
      - **Line:** [X]
      - **Current gap:** [Description]
      - **Search strategy:** Keywords, journals, date range

   2. [... more tasks ...]

   ---

   ## Next Steps

   [If YES] Spawn [N] research agents in Phase 3
   [If NO] Proceed to Phase 4 with editorial improvements only
   ```

5. **Branch based on decision:**
   - If YES → Continue to Phase 3
   - If NO → Skip to Phase 4

**Cost:** ~$0.075 (5K output)
**Time:** ~3 minutes

---

### PHASE 3a: Parallel Research (If Research Needed)

**Objective:** Find recent literature to fill citation gaps

**Execution:**

1. **Extract research tasks from coordinator report:**
   ```
   research_tasks = coordinator-decision-[date].md → "Research Tasks" section
   N = count(high-priority tasks)
   ```

2. **Spawn M × medical-lit-research agents in parallel:**

   For each high-priority research task, spawn:
   ```
   Task tool with:
     subagent_type: "general-purpose"
     description: "Research literature for [topic]"
     prompt: |
       Read your specification from .claude/agents/medical-lit-research.md

       Research Task: [Specific task from coordinator report]

       Search for: [Topic/keywords]
       Date range: 2020-2025 (prioritize 2023-2025)
       Journals: Prioritize PRS, JPRAS, Ann Plast Surg, JAMA, NEJM, Cancer, Ann Surg Oncol

       Requirements:
       - Find 2-4 relevant studies
       - Generate complete BibTeX entries immediately
       - Check PMC availability
       - Flag paywalls if encountered

       Save findings to: .parallel/research/[topic-slug]-lit-$(date +%Y%m%d).md

       Include:
       - Study summaries with key statistics
       - Complete BibTeX entries
       - Relevance notes (how this addresses the gap)
       - PMC access status
   ```

3. **Wait for all research agents to complete**

4. **Expected outputs:**
   - `.parallel/research/[topic1]-lit-[date].md`
   - `.parallel/research/[topic2]-lit-[date].md`
   - ... (one per research task)

**Cost:** ~$0.100 (4 researchers × $0.025)
**Time:** ~5-8 minutes (parallel execution)

---

### PHASE 3b: Bibliography Preparation (Parallel to 3a)

**Objective:** Validate existing bibliography while research happens

**Execution:**

1. **Spawn bibliography-formatter agent:**
   ```
   Task tool with:
     subagent_type: "general-purpose"
     description: "Validate bibliography"
     prompt: |
       Read your specification from .claude/agents/bibliography-formatter.md

       Task: Validate references/references.bib for formatting consistency

       Actions:
       - Read current bibliography
       - Check all entries for format compliance
       - Verify citation key format (lowercase, authorYEAR pattern)
       - Verify author format (Last, FI and Last2, FI2 and others)
       - Verify journal abbreviations (NLM standard)
       - Generate validation report

       Save report to: .parallel/bibliography-updates/bib-validation-[date].md

       Do NOT make changes yet - just validate and report.
   ```

2. **This runs in parallel with Phase 3a research**

**Cost:** ~$0.002
**Time:** ~2 minutes (overlaps with Phase 3a)

---

### PHASE 3c: Research TODO Creation

**Objective:** Create structured TODO checklist for citation tracking

**Execution:**

1. **After Phase 3a completes, create TODO list:**

   Read all research findings from `.parallel/research/` and create TODO items:

   ```
   TodoWrite with todos array containing all research citations:

   [
     {
       "content": "Kumar 2022 - Financial toxicity prevalence (23.8%)",
       "status": "pending",
       "activeForm": "Incorporating Kumar 2022 citation",
       "metadata": {
         "citation_key": "kumar2022",
         "target_section": "Discussion",
         "target_line": 254,
         "statistic": "23.8% experience financial toxicity",
         "integration_type": "replace_vague_quantifier"
       }
     },
     {
       "content": "Freeman 2024 - Treatment declination disparities (2× odds)",
       "status": "pending",
       "activeForm": "Incorporating Freeman 2024 citation",
       "metadata": {
         "citation_key": "freeman2024",
         "target_section": "Discussion",
         "target_line": 262,
         "statistic": "Black patients face 2-fold higher odds",
         "integration_type": "strengthen_mistrust_claim"
       }
     },
     // ... one TODO per research finding ...
   ]
   ```

2. **Save TODO metadata to file for Phase 6a reference:**
   ```
   Save to: .parallel/coordination/research-todos-[date].json
   ```

**Expected output:**
- TODO list visible to user showing all research citations pending incorporation
- JSON file with full metadata for later phases

**Cost:** ~$0.01 (part of coordinator role)
**Time:** ~1 minute

---

### PHASE 4: Consolidation & Writing (PARALLEL WITH PHASE 5)

**Objective:** Incorporate research findings into manuscript with internal citation tracking

**⚡ V2 OPTIMIZATION:** This phase now runs **in parallel** with Phase 5

**Execution:**

1. **Read TODO list and research findings:**
   ```bash
   # Read TODO list created in Phase 3c
   Read TODO list (get all pending citation tasks)

   # Read research findings
   Read .parallel/research/[topic1]-lit-[date].md
   Read .parallel/research/[topic2]-lit-[date].md
   # ... etc

   # Initialize internal tracking list
   incorporated_citations = []
   skipped_citations = []
   ```

2. **Extract BibTeX entries and key statistics:**
   ```markdown
   ## Research Findings Summary

   **New Literature Found:** [N] studies

   **Study 1: [Citation key]**
   - Key finding: [Statistic or main result]
   - Integration point: [Section], line [X]
   - Replaces: [Old citation] OR Fills gap
   - BibTeX: [Complete entry]

   [... for each study ...]
   ```

3. **Update manuscript sections with internal tracking:**

   For each TODO citation in the list:
   ```
   - Locate the paragraph in index.qmd
   - Replace vague quantifier with specific statistic
   - Add new citation [@newcitation2024]
   - Remove outdated citation if replacing
   - Ensure smooth flow

   # TRACK INTERNALLY (do not update TODO yet)
   if citation_was_incorporated:
       incorporated_citations.append({
           "key": "newcitation2024",
           "line": 254,
           "reason": "Replaced vague 'significant' with '23.8%'"
       })
   else:
       skipped_citations.append({
           "key": "redundantcitation2024",
           "reason": "Redundant with existing qazi2024 systematic review"
       })
   ```

4. **Generate detailed edit log:**

   Save to `.parallel/edits/review-update-edits-[date].md`:
   ```markdown
   # Manuscript Review & Update - Edit Log

   **Date:** [Current date]
   **Editor:** Sonnet (manuscript-writer with plastic-surgery-research-writer skill)
   **Sections Updated:** [List]
   **Research Incorporated:** [YES/NO]

   ---

   ## Summary of Changes

   **Citations Added:** [N]
   **Citations Removed:** [N]
   **Vague Quantifiers Replaced:** [N]
   **Citation Gaps Filled:** [N]

   ---

   ## Detailed Changes

   ### Change 1: [Section] - Line [X]

   **Before:**
   ```markdown
   [Original text]
   ```

   **After:**
   ```markdown
   [Revised text]
   ```

   **Rationale:**
   - Replaced vague term "[X]" with specific statistic "[Y]"
   - Added citation [@newcitation2024]
   - Removed outdated citation [@old2010]

   **Statistics Integrated:**
   - [Specific finding from new literature]

   ---

   [... for each change ...]

   ---

   ## BibTeX Entries to Add

   [List all complete BibTeX entries that need to be added to references.bib]
   ```

5. **Invoke plastic-surgery-research-writer skill** for quality check:
   ```
   Use plastic-surgery-research-writer skill to review all edits for:
   - AMA compliance
   - Publication-quality prose
   - Logical flow
   - Citation placement
   ```

6. **Batch TODO update (ONCE at end of Phase 4):**

   ```
   # Update all TODOs in a single batch operation
   TodoWrite with updated todos array:

   - Mark all incorporated_citations as "completed"
   - Add notes to skipped_citations explaining why not used
   - Keep status="pending" for citations explicitly not incorporated

   Example:
   [
     {
       "content": "Kumar 2022 - Financial toxicity (23.8%)",
       "status": "completed",  // ← Updated!
       "activeForm": "Incorporated Kumar 2022 citation"
     },
     {
       "content": "Vangsness 2024 - Systematic review",
       "status": "pending",  // ← Still pending
       "activeForm": "Skipped - redundant with qazi2024",
       "note": "Not incorporated: redundant with existing qazi2024 systematic review"
       }
   ]
   ```

**Benefits of batch update:**
- ✅ Single TODO update instead of 12 individual updates
- ✅ Maintains agent focus during writing (no context switching)
- ✅ Cleaner execution flow
- ✅ Phase 6a can easily identify what to clean up

**Cost:** ~$0.150 (10K output)
**Time:** ~15 minutes

---

### PHASE 5: Bibliography Update (PARALLEL WITH PHASE 4)

**Objective:** Add ALL research BibTeX entries to references.bib

**⚡ V2 OPTIMIZATION:** This phase now runs **in parallel** with Phase 4

**Key change:** Instead of waiting for Phase 4 to decide which citations to use, Phase 5 adds **ALL** BibTeX entries found in Phase 3 research. Phase 6a will clean up unused entries later.

**Execution:**

1. **Start immediately after Phase 3c completes (don't wait for Phase 4)**

2. **Read all research outputs from Phase 3:**
   ```bash
   Read .parallel/research/medical-mistrust-lit-[date].md
   Read .parallel/research/communication-lit-[date].md
   Read .parallel/research/systematic-reviews-[date].md
   Read .parallel/research/financial-barriers-[date].md
   # ... all Phase 3 research files
   ```

3. **Extract ALL BibTeX entries from research outputs:**
   ```
   # Each research file contains complete BibTeX entries
   # Extract all of them (don't filter based on Phase 4 decisions)

   all_bibtex_entries = []
   for research_file in Phase3_outputs:
       extract_bibtex_entries(research_file)
       all_bibtex_entries.append(entries)
   ```

4. **Spawn bibliography-formatter agent:**
   ```
   Task tool with:
     subagent_type: "general-purpose"
     description: "Add ALL research citations to bibliography"
     prompt: |
       Read your specification from .claude/agents/bibliography-formatter.md

       Task: Add the following [N] BibTeX entries to references/references.bib

       [Paste ALL complete BibTeX entries from Phase 3 research]

       Actions:
       - Check for duplicates
       - Validate formatting
       - Append ALL entries to references.bib
       - Generate update report

       Note: You are adding ALL entries found by research agents. Phase 6a will
       remove any unused entries after Phase 4 writing completes.

       Save report to: .parallel/bibliography-updates/bib-add-all-[date].md
   ```

5. **This completes while Phase 4 is still working**
   - Phase 5 finishes in ~2 minutes
   - Phase 4 takes ~15 minutes
   - Total time: max(15, 2) = 15 minutes (not 17!)

**Benefits:**
- ✅ Saves 2 minutes (parallel execution)
- ✅ Bibliography ready when Phase 4 finishes
- ✅ Simpler logic (add all, cleanup later)

**Cost:** ~$0.002
**Time:** ~2 minutes (overlaps with Phase 4)

---

### PHASE 6a: Citation Cleanup (PARALLEL WITH PHASE 6b)

**Objective:** Remove unused BibTeX entries from references.bib

**⚡ V2 OPTIMIZATION:** This phase runs **in parallel** with Phase 6b validation

**Start condition:** Both Phase 4 and Phase 5 must be complete

**Execution:**

1. **Read TODO list (final state from Phase 4):**
   ```bash
   # Get all TODO items with their final status
   # Citations marked "completed" = were incorporated (keep in bibliography)
   # Citations marked "pending" = were NOT incorporated (remove from bibliography)
   ```

2. **Identify citations to remove:**
   ```
   citations_to_remove = []
   for todo in todos:
       if todo.status == "pending" and todo.metadata.citation_key:
           citations_to_remove.append({
               "key": todo.metadata.citation_key,
               "reason": todo.note or "Not incorporated"
           })
   ```

3. **Spawn bibliography-cleanup agent:**
   ```
   Task tool with:
     subagent_type: "general-purpose"
     description: "Clean up unused citations"
     prompt: |
       Read your specification from .claude/agents/bibliography-cleanup.md

       Task: Remove the following unused BibTeX entries from references/references.bib

       Citations to remove:
       [List citation keys with reasons]

       Actions:
       - For each citation_key, remove entire entry from references.bib
       - Document each removal with reason
       - Generate cleanup report

       Save report to: .parallel/bibliography-updates/bib-cleanup-[date].md
   ```

4. **This completes in ~1 minute while Phase 6b runs (2 minutes)**

**Cost:** ~$0.001
**Time:** ~1 minute (overlaps with Phase 6b)

---

### PHASE 6b: Manuscript Validation (PARALLEL WITH PHASE 6a)

**Objective:** Verify manuscript renders correctly with all citations

**⚡ V2 OPTIMIZATION:** This phase runs **in parallel** with Phase 6a cleanup

**Start condition:** Both Phase 4 and Phase 5 must be complete

**Execution:**

1. **Render manuscript:**
   ```bash
   cd "[project root]"
   quarto render index.qmd --to docx
   ```

2. **Check for citation errors:**
   ```
   - Review render output for warnings
   - Verify References section includes all incorporated citations
   - Check citation numbering is sequential
   - Look for [?] markers (broken citations)
   ```

3. **Validation checks:**
   ```
   ✅ Manuscript renders without errors
   ✅ All citations from Phase 4 appear in References section
   ✅ No [?] markers (undefined citations)
   ✅ Citation numbers sequential
   ✅ AMA format maintained
   ```

**Cost:** ~$0.00 (Quarto is free)
**Time:** ~2 minutes (overlaps with Phase 6a)

---

### PHASE 6c: Final Reconciliation

**Objective:** Verify both cleanup and validation succeeded, generate completion report

**Start condition:** Both Phase 6a and Phase 6b must be complete

**Execution:**

1. **Verify Phase 6a cleanup:**
   ```bash
   Read .parallel/bibliography-updates/bib-cleanup-[date].md
   # Confirm unused entries were removed
   # Verify no errors during cleanup
   ```

2. **Verify Phase 6b validation:**
   ```bash
   # Confirm manuscript rendered successfully
   # Verify _output/index.docx exists
   # Check for any citation errors
   ```

3. **Generate completion report:**

   Save to `.parallel/review-cycles/review-cycle-[date]-COMPLETE.md`:
   ```markdown
   # Manuscript Review Cycle - Completion Report

   **Date:** [Current date]
   **Command:** /manuscript:review-update [parameters]
   **Sections Reviewed:** [List]
   **Research Threshold:** [level]

   ---

   ## Workflow Summary

   **Phase 1:** Section Review
   - Sections analyzed: [N]
   - Issues found: [N] high-priority, [N] medium, [N] low
   - Cost: $0.024
   - Time: 5 min

   **Phase 2:** Coordination
   - Decision: [Research needed YES/NO]
   - Rationale: [Brief explanation]
   - Cost: $0.075
   - Time: 3 min

   **Phase 3:** Research (if executed)
   - Research tasks: [N]
   - Studies found: [N]
   - Cost: $0.100
   - Time: 8 min

   **Phase 4:** Writing
   - Edits made: [N]
   - Citations added: [N]
   - Citations removed: [N]
   - Cost: $0.150
   - Time: 15 min

   **Phase 5:** Bibliography
   - Entries added: [N]
   - Duplicates skipped: [N]
   - Cost: $0.002
   - Time: 2 min

   **Phase 6:** Validation
   - Manuscript rendered: ✅
   - Citation errors: [N] (should be 0)
   - Output: _output/index.docx

   ---

   ## Total Metrics

   **Cost:** $[X.XX]
   **Time:** ~[X] minutes
   **Manuscript Quality Improvement:**
   - Citation currency: [% of citations ≤10 years old]
   - Evidence gaps filled: [N]
   - Vague quantifiers eliminated: [N]

   ---

   ## Files Created/Modified

   **Created:**
   - [List all reports and logs generated]

   **Modified:**
   - index.qmd ([N] edits in [sections])
   - references/references.bib (+[N] entries)

   ---

   ## Next Steps

   **Optional:**
   - [ ] Review _output/index.docx for final quality check
   - [ ] Run Opus reviewer on high-stakes sections (Abstract, Intro, Discussion)
   - [ ] Address any remaining low-priority issues manually

   **If ready for submission:**
   - [ ] Spawn manuscript-reviewer-opus for final polish
   - [ ] Generate submission checklist

   ---

   **Workflow completed successfully!**
   ```

4. **Display summary to user:**
   ```markdown
   ### ⚡ Status: Complete

   **Action:** Manuscript review and update cycle completed

   **Output:**
   - Completion report: `.parallel/review-cycles/review-cycle-[date]-COMPLETE.md`
   - Updated manuscript: `_output/index.docx`

   **Summary:**
   - Reviewed [N] sections
   - Research [executed/skipped]: [N] studies found
   - Updates: [N] edits, +[N] citations, -[N] outdated refs
   - Citation currency: [%] ≤10 years old

   **Next Steps:**
   - Review updated manuscript in `_output/index.docx`
   - Optional: Run Opus reviewer for final polish

   **Blockers:** None

   ---

   **📊 Cycle Metrics:**
   - Total cost: $[X.XX]
   - Total time: ~[X] minutes
   - Quality improvement: [N] evidence gaps filled, [N] vague terms eliminated
   ```

**Cost:** ~$0.00 (Quarto rendering is free)
**Time:** ~2 minutes

---

### PHASE 7: Git Commit & Session Handoff

**Objective:** Document changes, commit to git, and prepare for next session

**Execution:**

1. **Update or create CHANGELOG.md:**
   ```bash
   # If CHANGELOG.md doesn't exist, create it
   # If it exists, prepend new entry

   Write to CHANGELOG.md:
   ```markdown
   # Manuscript Changelog

   ## [Current Date] - [Sections] Section Review and Update

   ### Overview
   Completed [sections] section review using /manuscript:review-update workflow.
   Addressed [N] high-priority citation gaps and [N] editorial issues.

   ### [Section Name] Changes (Lines X-Y)

   **Citations Added ([N] total):**
   1. Line X: Added [@citation1] for [purpose]
   2. Line Y: Added [@citation2] for [purpose]

   **Editorial Changes:**
   - Line X: Shortened quote from [N] to [N] words
   - Line Y: Replaced vague "[term]" with specific "[statistic]"

   **Impact:** [Brief description of improvement]

   ### Bibliography Changes

   **New Citations Added ([N] entries):**
   - citation1 - [Brief description]
   - citation2 - [Brief description]

   ### Key Findings
   - [Important discovery or disparity revealed]

   ### Validation
   - ✅ Rendered successfully to _output/index.docx
   - ✅ All citations validated (no [?] markers)

   ---

   [Previous changelog entries follow...]
   ```

2. **Update or create SESSION_HANDOFF.md:**
   ```bash
   Write to SESSION_HANDOFF.md:
   ```markdown
   # Session Handoff - Ready for Next Claude Instance

   **Date:** [Current date]
   **Session Type:** Manuscript Review & Update ([Sections])
   **Status:** ✅ COMPLETE - Ready to continue

   ---

   ## 🎯 Quick Start for Next Session

   ### What Was Done (This Session)

   **Completed:** [Sections] section review and update
   - ✅ [Section]: [Brief summary of changes]
   - ✅ [Section]: [Brief summary of changes]

   **See:** `CHANGELOG.md` for detailed changes

   ---

   ## 📋 What's Next (Priority Order)

   ### HIGH PRIORITY - [Next Section/Task]

   [List remaining high-priority tasks from supervisor feedback]

   **See:** `.parallel/supervisor-feedback-todos.md` for complete task list

   ---

   ## 📂 Important Files

   ### Read First
   1. **`CHANGELOG.md`** - All changes made this session
   2. **`.parallel/supervisor-feedback-todos.md`** - Detailed TODO list
   3. **`.parallel/review-cycles/review-cycle-[date]-COMPLETE.md`** - Full workflow report

   ### For Reference
   - **Supervisor feedback:** `archive/[date]_feedback_scans/` (scanned pages)
   - **Output:** `_output/index.docx` (validated manuscript)

   ---

   ## 🔑 Key Context to Remember

   ### Critical Information
   - **Placeholder IDs are INTENTIONAL** (HIPAA compliance) - not errors
   - [Other important context discovered this session]

   ### Important Findings
   - [Key discovery 1]
   - [Key discovery 2]

   ### Citations Added ([N] total)
   [List citation keys added]

   ---

   ## 🚀 Suggested Next Steps

   ### Option 1: Continue Supervisor Feedback (Recommended)
   ```
   "Review [next section] and address supervisor feedback:
   [specific tasks]"
   ```

   ### Option 2: Run Another Review Cycle
   ```
   "/manuscript:review-update [SECTIONS]"
   ```

   ---

   ## 📊 Progress Tracking

   ### Overall Manuscript Status
   - ✅ [Section]: Complete
   - ✅ [Section]: Complete
   - ⏸️ **[Section]: Needs work** (supervisor feedback)

   ### Supervisor Feedback Status
   - **Completed:** ~[N]% ([N] items done)
   - **Remaining:** ~[N]% ([N] items, mostly [section])

   ---

   **Session complete! Ready for next Claude instance to continue.**
   ```

3. **Stage and commit changes:**
   ```bash
   cd "[project root]"

   # Stage manuscript and bibliography changes
   git add index.qmd references/references.bib CHANGELOG.md SESSION_HANDOFF.md

   # Create descriptive commit message
   git commit -m "$(cat <<'EOF'
   Review [sections] section(s): Add citations and address supervisor feedback

   ## [Section 1] (Lines X-Y)
   - Add [N] citations ([list key citation purposes])
   - [Editorial changes summary]

   ## [Section 2] (Lines X-Y)
   - Add [N] citations ([list key citation purposes])
   - [Editorial changes summary]

   ## Key Findings
   - [Important discovery or disparity]

   ## Bibliography
   - Add [N] new citations to references/references.bib
   - All citations validated (no [?] markers)

   ## Documentation
   - Update CHANGELOG.md for session continuity
   - Update SESSION_HANDOFF.md for next session
   - Generate complete review cycle report (.parallel/review-cycles/)

   🤖 Generated with [Claude Code](https://claude.com/claude-code)

   Co-Authored-By: Claude <noreply@anthropic.com>
   EOF
   )"
   ```

4. **Display commit summary:**
   ```bash
   git log --oneline -3
   ```

5. **Check git status and inform user:**
   ```markdown
   ### ⚡ Status: Complete - Session Ready for Handoff

   **Action:** All changes committed and documented

   **Git Status:**
   - ✅ [N] commits ahead of origin
   - ✅ CHANGELOG.md updated
   - ✅ SESSION_HANDOFF.md updated
   - ✅ Manuscript changes committed

   **Next Steps:**
   - Optional: Push commits to remote with `git push`
   - Ready to clear conversation and start new session

   **For Next Session:**
   ```
   "Continuing manuscript. Read SESSION_HANDOFF.md and CHANGELOG.md.
   Ready to work on [next tasks]."
   ```

   **Session Metrics:**
   - Time: [N] minutes
   - Cost: $[X.XX]
   - Citations added: [N]
   - Context used: [X]K / 200K tokens ([Y]%)
   ```

**Benefits:**
- ✅ Complete session documentation for continuity
- ✅ Git history tracks all manuscript evolution
- ✅ Next Claude instance can start immediately
- ✅ No context lost between sessions

**Cost:** ~$0.00 (git and file operations)
**Time:** ~2 minutes

---

## Total Workflow Metrics

**Full cycle (all phases including handoff):**
- Cost: ~$0.35 (vs $0.80 all-Sonnet = 56% savings)
- Time: 35-50 minutes (vs 4-6 hours manual)
- Phases: 7 total (Review → Research → Write → Validate → Document → Commit)
- Sections: All 6 manuscript sections
- Parallelization: Phase 1 (6 agents), Phase 3 (4 agents), Phase 6 (2 parallel)

**Partial cycle (no research needed):**
- Cost: ~$0.25 (skip Phase 3)
- Time: 20-30 minutes
- Improvements: Editorial only (no new citations)

---

## Error Handling

**If Phase 1 agents fail:**
- Report which sections failed
- Continue with successfully completed sections
- Offer to retry failed sections

**If Phase 2 coordination fails:**
- Fall back to conservative decision: spawn research for any high-priority gaps
- Document fallback decision

**If Phase 3 research fails:**
- Continue with successfully completed research tasks
- Flag incomplete research for manual follow-up
- Proceed to Phase 4 with available findings

**If Phase 4 writing fails:**
- Preserve all research findings (don't lose them)
- Report specific error
- Offer to retry with different approach

**If Phase 5 bibliography fails:**
- Report BibTeX entries that couldn't be added
- Provide manual fallback instructions

**If Phase 6 rendering fails:**
- Check for citation errors in manuscript
- Report specific Quarto error
- Offer troubleshooting steps

---

## Cost Breakdown by Agent Type

| Agent Type | Model | Phase | Cost/Unit | Units | Total |
|------------|-------|-------|-----------|-------|-------|
| section-reviewer | Claude 3 Haiku | 1 | $0.004 | 6 | $0.024 |
| manuscript-writer | Sonnet | 2 | $0.075 | 1 | $0.075 |
| medical-lit-research | 3.5 Haiku | 3a | $0.025 | 4 | $0.100 |
| bibliography-formatter | Claude 3 Haiku | 3b, 5 | $0.001 | 2 | $0.002 |
| manuscript-writer | Sonnet | 4 | $0.150 | 1 | $0.150 |
| **TOTAL** | | | | | **$0.351** |

**Comparison:**
- All Sonnet: $0.80
- Optimized: $0.35
- **Savings: $0.45 (56%)**

---

## When to Use This Workflow

✅ **Use when:**
- Supervisor feedback indicates outdated citations
- Preparing manuscript for journal submission
- After completing Results section (ready to strengthen Discussion)
- Periodic quality checks during manuscript development
- After major revisions to ensure citation currency

❌ **Don't use when:**
- Early drafting (too many structural changes happening)
- Just added citations yesterday (too soon for re-review)
- Only need to check one specific claim (use manual search instead)
- Budget is tight and manuscript is already high-quality

---

## Customization Options

**Adjust research threshold:**
- `--research-threshold=low` - Trigger research more easily (≥3 gaps)
- `--research-threshold=high` - Only trigger for major issues (≥8 gaps)

**Select specific sections:**
- `/manuscript:review-update intro,discussion` - Only review key sections
- Saves cost if Methods/Results are already solid

**Future enhancements:**
- `--skip-research` flag to force editorial-only improvements
- `--opus-polish` flag to automatically run Opus reviewer after updates
- `--target-journal=PRS` to customize for specific journal requirements

---

**This workflow is now ready for use!**

Invoke with: `/manuscript:review-update` or `/ms:review`
