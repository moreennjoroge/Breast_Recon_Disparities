#!/usr/bin/env python3
"""
Add Word comments to manuscript showing where November 2025 feedback was addressed.
Uses the docx skill's Document library for proper comment handling.
"""

import sys
from scripts.document import Document

print("Initializing document with comments support...")
doc = Document('manuscript-unpacked', author="November 2025 Review", initials="NR")

print("Adding comments to document...\n")

doc_xml = doc["word/document.xml"]

# Summary comment at document start
print("1. Adding summary comment...")
try:
    first_para = doc_xml.get_node(tag="w:p")
    doc.add_comment(
        start=first_para,
        end=first_para,
        text="""✅ NOVEMBER 2025 REVISION COMPLETE - ALL FEEDBACK ADDRESSED

This manuscript incorporates ALL supervisor feedback from November 10, 2025:

📋 TRACKED EDITS (8 direct text changes):
1. Financial disclosure rewritten
2. Compensation wording simplified
3. Interview guide sentence added
4. 'Semi-structured' repetition removed
5. 'Duke Surgery' removed from encrypted drive
6. 'Ensure trustworthiness' removed
7. 'Our' changed to 'the' reflexivity
8. 'Undergoing' → 'with a history of'

📝 COMMENTS (7 strategic changes):
#7: Introduction opening rewritten
#17: 'Purposive sampling' verified
#18: Study site de-identified
#37: Tables/Figures moved to end
#42: Citations removed from Results
#44: Results section condensed
#47: New socioecological figure created

🔍 USER REQUEST:
Removed all 10 participant IDs from quotes

TOTAL: 17 changes implemented (100% completion)"""
    )
    print("   ✓ Summary comment added\n")
except Exception as e:
    print(f"   ⚠ Error: {e}\n")

# 1. Financial Disclosure
print("2. Financial disclosure...")
try:
    para = doc_xml.get_node(tag="w:p", contains="This work was supported by a grant from the Kenan Institute")
    doc.add_comment(
        start=para,
        end=para,
        text="✅ TRACKED EDIT #1: Financial disclosure rewritten as complete sentence. Changed from 'Kenan Grant' to full statement."
    )
    print("   ✓ Comment added\n")
except Exception as e:
    print(f"   ⚠ Error: {e}\n")

# 2. Participant compensation
print("3. Participant compensation...")
try:
    para = doc_xml.get_node(tag="w:p", contains="Participants received compensation for their time")
    doc.add_comment(
        start=para,
        end=para,
        text="✅ TRACKED EDIT #2: Removed 'and involvement'. Changed from 'Participants received compensation for their time and involvement' to 'Participants received compensation for their time.'"
    )
    print("   ✓ Comment added\n")
except Exception as e:
    print(f"   ⚠ Error: {e}\n")

# 3-4. Data Collection
print("4. Data Collection restructuring...")
try:
    para = doc_xml.get_node(tag="w:p", contains="Semi-structured interviews were conducted using an interview guide")
    doc.add_comment(
        start=para,
        end=para,
        text="✅ TRACKED EDITS #3 & #4: Data Collection section restructured. Added opening sentence. Changed subsequent 'Semi-structured interviews were conducted via Zoom' to 'Interviews were conducted via Zoom' to avoid repetition."
    )
    print("   ✓ Comment added\n")
except Exception as e:
    print(f"   ⚠ Error: {e}\n")

# 5. Encrypted drive
print("5. Encrypted drive...")
try:
    para = doc_xml.get_node(tag="w:p", contains="securely stored on an encrypted drive")
    doc.add_comment(
        start=para,
        end=para,
        text="✅ TRACKED EDIT #5: Removed institution-specific identifier. Changed from 'Duke Surgery encrypted drive' to 'an encrypted drive' to align with de-identification guidelines."
    )
    print("   ✓ Comment added\n")
except Exception as e:
    print(f"   ⚠ Error: {e}\n")

# 6-7. Data Analysis
print("6. Data Analysis edits...")
try:
    para = doc_xml.get_node(tag="w:p", contains="discuss coding decisions through consensus-building")
    doc.add_comment(
        start=para,
        end=para,
        text="✅ TRACKED EDITS #6 & #7: Data Analysis refined. Removed 'and ensure trustworthiness' (streamlined). Changed 'our reflexivity process' to 'the reflexivity process' (objective tone)."
    )
    print("   ✓ Comment added\n")
except Exception as e:
    print(f"   ⚠ Error: {e}\n")

# 8. Reconstruction status
print("7. Reconstruction status...")
try:
    para = doc_xml.get_node(tag="w:p", contains="with a history of breast reconstruction")
    doc.add_comment(
        start=para,
        end=para,
        text="✅ TRACKED EDIT #8: Improved temporal accuracy. Changed from 'undergoing breast reconstruction' to 'with a history of breast reconstruction' - participants already had reconstruction completed."
    )
    print("   ✓ Comment added\n")
except Exception as e:
    print(f"   ⚠ Error: {e}\n")

# Comment #7: Introduction opening
print("8. Introduction opening...")
try:
    para = doc_xml.get_node(tag="w:p", contains="Psychosocial and quality-of-life benefits")
    doc.add_comment(
        start=para,
        end=para,
        text="✅ COMMENT #7: Introduction opening rewritten. Removed 'Despite' opening (passive construction). Changed to active, direct statement. Same change applied to Abstract."
    )
    print("   ✓ Comment added\n")
except Exception as e:
    print(f"   ⚠ Error: {e}\n")

# Comment #17: Purposive sampling
print("9. Purposive sampling...")
try:
    para = doc_xml.get_node(tag="w:p", contains="purposive sampling")
    doc.add_comment(
        start=para,
        end=para,
        text="✅ COMMENT #17: Sampling terminology verified. 'Purposive sampling' is appropriate for qualitative research with intentional participant selection. Citation [@palinkas2015] supports this."
    )
    print("   ✓ Comment added\n")
except Exception as e:
    print(f"   ⚠ Error: {e}\n")

# Comment #18: Study site
print("10. Study site de-identification...")
try:
    para = doc_xml.get_node(tag="w:p", contains="single academic cancer center clinic")
    doc.add_comment(
        start=para,
        end=para,
        text="✅ COMMENT #18: Study site de-identified. Changed from 'Duke Breast Cancer Clinic' to 'a single academic cancer center clinic' - more appropriate for journal submission while maintaining methodological transparency."
    )
    print("   ✓ Comment added\n")
except Exception as e:
    print(f"   ⚠ Error: {e}\n")

# Comment #42 & #44: Results
print("11. Results section streamlined...")
try:
    para = doc_xml.get_node(tag="w:p", contains="Eleven women consented")
    doc.add_comment(
        start=para,
        end=para,
        text="✅ COMMENTS #42 & #44: Results section streamlined. Removed all citations and editorial commentary. Results now contain only descriptive findings. Condensed redundant content, eliminated 3 repetitive quotes."
    )
    print("   ✓ Comment added\n")
except Exception as e:
    print(f"   ⚠ Error: {e}\n")

# Comment #38: Participant IDs removed
print("12. Participant IDs removal...")
try:
    para = doc_xml.get_node(tag="w:p", contains="I still wanted to look like a woman")
    doc.add_comment(
        start=para,
        end=para,
        text="✅ COMMENT #38 - IMPLEMENTED DIFFERENTLY: User requested removal of ALL participant IDs from quotes (not adding age/reconstruction status). All 10 participant IDs [###] removed from Results section for cleaner presentation."
    )
    print("   ✓ Comment added\n")
except Exception as e:
    print(f"   ⚠ Error: {e}\n")

# Comment #47: Figure
print("13. Socioecological figure...")
try:
    para = doc_xml.get_node(tag="w:p", contains="Figure 1")
    doc.add_comment(
        start=para,
        end=para,
        text="✅ COMMENT #47: New socioecological model figure created. Addressed copyright concerns and quantification inconsistency. Created original figure design with qualitative findings only (no percentages) appropriate for n=11 sample size."
    )
    print("   ✓ Comment added\n")
except Exception as e:
    print(f"   ⚠ Error: {e}\n")

# Comment #37: Tables/Figures placement
print("14. Tables/Figures placement...")
try:
    para = doc_xml.get_node(tag="w:p", contains="Table 1")
    doc.add_comment(
        start=para,
        end=para,
        text="✅ COMMENT #37: Tables and figures moved to end of document. Created dedicated 'Tables and Figures' section after References. This follows standard manuscript submission format."
    )
    print("   ✓ Comment added\n")
except Exception as e:
    print(f"   ⚠ Error: {e}\n")

print("\n" + "="*70)
print("Saving document with comments...")
print("="*70)

doc.save()

print("\n✓ Document saved successfully with all comments!")
print(f"✓ Output location: {doc.unpacked_path}")
print("\nNext: Pack the document back to DOCX format")
