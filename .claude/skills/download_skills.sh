#!/bin/bash

# Script to download all document skills from Anthropic skills repository
# with complete folder structures and all files

set -e

REPO_URL="https://raw.githubusercontent.com/anthropics/skills/c74d647e56e6daa12029b6acb11a821348ad044b"
BASE_PATH="document-skills"
SKILLS_DIR="/workspaces/Breast_Recon_Disparities/.claude/skills"

# Color output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Starting download of document skills...${NC}"

# Function to download a file
download_file() {
    local url="$1"
    local output_path="$2"

    echo "  Downloading: $(basename "$output_path")"
    curl -sL "$url" -o "$output_path"
}

# PDF Skill
echo -e "\n${GREEN}Downloading PDF skill...${NC}"
PDF_DIR="$SKILLS_DIR/pdf"
mkdir -p "$PDF_DIR/scripts"

download_file "$REPO_URL/$BASE_PATH/pdf/LICENSE.txt" "$PDF_DIR/LICENSE.txt"
download_file "$REPO_URL/$BASE_PATH/pdf/SKILL.md" "$PDF_DIR/SKILL.md"
download_file "$REPO_URL/$BASE_PATH/pdf/forms.md" "$PDF_DIR/forms.md"
download_file "$REPO_URL/$BASE_PATH/pdf/reference.md" "$PDF_DIR/reference.md"

# PDF scripts
download_file "$REPO_URL/$BASE_PATH/pdf/scripts/fill_form.py" "$PDF_DIR/scripts/fill_form.py"

# DOCX Skill
echo -e "\n${GREEN}Downloading DOCX skill...${NC}"
DOCX_DIR="$SKILLS_DIR/docx"
mkdir -p "$DOCX_DIR/ooxml" "$DOCX_DIR/scripts"

download_file "$REPO_URL/$BASE_PATH/docx/LICENSE.txt" "$DOCX_DIR/LICENSE.txt"
download_file "$REPO_URL/$BASE_PATH/docx/SKILL.md" "$DOCX_DIR/SKILL.md"
download_file "$REPO_URL/$BASE_PATH/docx/docx-js.md" "$DOCX_DIR/docx-js.md"
download_file "$REPO_URL/$BASE_PATH/docx/ooxml.md" "$DOCX_DIR/ooxml.md"

# DOCX ooxml examples
download_file "$REPO_URL/$BASE_PATH/docx/ooxml/document.xml" "$DOCX_DIR/ooxml/document.xml"
download_file "$REPO_URL/$BASE_PATH/docx/ooxml/styles.xml" "$DOCX_DIR/ooxml/styles.xml"

# DOCX scripts
download_file "$REPO_URL/$BASE_PATH/docx/scripts/create_docx.py" "$DOCX_DIR/scripts/create_docx.py"

# XLSX Skill
echo -e "\n${GREEN}Downloading XLSX skill...${NC}"
XLSX_DIR="$SKILLS_DIR/xlsx"
mkdir -p "$XLSX_DIR"

download_file "$REPO_URL/$BASE_PATH/xlsx/LICENSE.txt" "$XLSX_DIR/LICENSE.txt"
download_file "$REPO_URL/$BASE_PATH/xlsx/SKILL.md" "$XLSX_DIR/SKILL.md"
download_file "$REPO_URL/$BASE_PATH/xlsx/recalc.py" "$XLSX_DIR/recalc.py"

# PPTX Skill
echo -e "\n${GREEN}Downloading PPTX skill...${NC}"
PPTX_DIR="$SKILLS_DIR/pptx"
mkdir -p "$PPTX_DIR/ooxml" "$PPTX_DIR/scripts"

download_file "$REPO_URL/$BASE_PATH/pptx/LICENSE.txt" "$PPTX_DIR/LICENSE.txt"
download_file "$REPO_URL/$BASE_PATH/pptx/SKILL.md" "$PPTX_DIR/SKILL.md"
download_file "$REPO_URL/$BASE_PATH/pptx/html2pptx.md" "$PPTX_DIR/html2pptx.md"
download_file "$REPO_URL/$BASE_PATH/pptx/ooxml.md" "$PPTX_DIR/ooxml.md"

# PPTX ooxml examples
download_file "$REPO_URL/$BASE_PATH/pptx/ooxml/presentation.xml" "$PPTX_DIR/ooxml/presentation.xml"
download_file "$REPO_URL/$BASE_PATH/pptx/ooxml/slide1.xml" "$PPTX_DIR/ooxml/slide1.xml"

# PPTX scripts
download_file "$REPO_URL/$BASE_PATH/pptx/scripts/html_to_pptx.py" "$PPTX_DIR/scripts/html_to_pptx.py"

# Clean up old single files
echo -e "\n${GREEN}Cleaning up old files...${NC}"
rm -f "$SKILLS_DIR/pdf-skill.md" "$SKILLS_DIR/docx-skill.md" "$SKILLS_DIR/xlsx-skill.md" "$SKILLS_DIR/pptx-skill.md"

echo -e "\n${BLUE}Download complete!${NC}"
echo -e "\nSkill structure:"
tree "$SKILLS_DIR" -L 2 2>/dev/null || find "$SKILLS_DIR" -maxdepth 2 -type d

echo -e "\n${GREEN}All document skills downloaded successfully!${NC}"
