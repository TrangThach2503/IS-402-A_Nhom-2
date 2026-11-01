"""Convert a Markdown file to a styled DOCX document.

This script intentionally supports a small, predictable Markdown subset so it can
run without Pandoc: headings, paragraphs, bullets, numbered lists, bold/italic
inline emphasis, horizontal rules, and simple pipe tables.
"""

from __future__ import annotations

import argparse
import re
from pathlib import Path

from docx import Document
from docx.enum.section import WD_SECTION_START
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_CELL_VERTICAL_ALIGNMENT
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Cm, Pt, RGBColor

STYLE_PRESETS = {
    "business": {
        "font": "Arial",
        "body_size": 11,
        "heading_color": "1F4E79",
        "table_header_fill": "1F4E79",
        "margin_left_cm": 2.5,
        "margin_right_cm": 2.0,
        "margin_top_cm": 2.0,
        "margin_bottom_cm": 2.0,
    },
    "formal": {
        "font": "Times New Roman",
        "body_size": 13,
        "heading_color": "000000",
        "table_header_fill": "D9EAF7",
        "margin_left_cm": 3.0,
        "margin_right_cm": 2.0,
        "margin_top_cm": 2.0,
        "margin_bottom_cm": 2.0,
    },
    "technical": {
        "font": "Times New Roman",
        "body_size": 12,
        "heading_color": "0B5394",
        "table_header_fill": "0B5394",
        "margin_left_cm": 2.5,
        "margin_right_cm": 2.0,
        "margin_top_cm": 2.0,
        "margin_bottom_cm": 2.0,
    },
}

INLINE_PATTERN = re.compile(r"(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)")


def convert_md_to_docx(input_file: str, output_file: str, preset: str = "business") -> Path:
    input_path = Path(input_file)
    output_path = Path(output_file)

    if not input_path.is_file():
        raise FileNotFoundError(f"Input Markdown file does not exist: {input_path}")
    if input_path.suffix.lower() not in {".md", ".markdown", ".txt"}:
        raise ValueError("Input file should be .md, .markdown, or .txt")

    config = STYLE_PRESETS[preset]
    lines = input_path.read_text(encoding="utf-8-sig").splitlines()

    document = Document()
    _configure_document(document, config)

    index = 0
    while index < len(lines):
        line = lines[index].rstrip()
        stripped = line.strip()

        if not stripped:
            index += 1
            continue

        if stripped in {"---", "***", "___"}:
            _add_horizontal_rule(document)
            index += 1
            continue

        if _is_table_start(lines, index):
            table_lines = []
            while index < len(lines) and _is_pipe_row(lines[index]):
                table_lines.append(lines[index].strip())
                index += 1
            _add_table(document, table_lines, config)
            continue

        heading = re.match(r"^(#{1,6})\s+(.+)$", stripped)
        if heading:
            level = min(len(heading.group(1)), 4)
            paragraph = document.add_heading(level=level)
            _add_inline_runs(paragraph, heading.group(2).strip(), config, bold=True)
            index += 1
            continue

        if stripped.startswith(("- ", "* ", "+ ")):
            paragraph = document.add_paragraph(style="List Bullet")
            _add_inline_runs(paragraph, stripped[2:].strip(), config)
            index += 1
            continue

        numbered = re.match(r"^\d+[.)]\s+(.+)$", stripped)
        if numbered:
            paragraph = document.add_paragraph(style="List Number")
            _add_inline_runs(paragraph, numbered.group(1).strip(), config)
            index += 1
            continue

        paragraph_lines = [stripped]
        index += 1
        while index < len(lines):
            candidate = lines[index].strip()
            if not candidate or candidate.startswith("#") or candidate in {"---", "***", "___"}:
                break
            if candidate.startswith(("- ", "* ", "+ ")) or re.match(r"^\d+[.)]\s+", candidate):
                break
            if _is_table_start(lines, index):
                break
            paragraph_lines.append(candidate)
            index += 1

        paragraph = document.add_paragraph()
        paragraph.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
        _add_inline_runs(paragraph, " ".join(paragraph_lines), config)

    output_path.parent.mkdir(parents=True, exist_ok=True)
    document.save(output_path)
    return output_path


def _configure_document(document: Document, config: dict) -> None:
    section = document.sections[0]
    section.start_type = WD_SECTION_START.NEW_PAGE
    section.page_width = Cm(21)
    section.page_height = Cm(29.7)
    section.left_margin = Cm(config["margin_left_cm"])
    section.right_margin = Cm(config["margin_right_cm"])
    section.top_margin = Cm(config["margin_top_cm"])
    section.bottom_margin = Cm(config["margin_bottom_cm"])

    normal = document.styles["Normal"]
    _set_style_font(normal, config["font"], config["body_size"])
    normal.paragraph_format.space_after = Pt(6)
    normal.paragraph_format.line_spacing = 1.15

    for level in range(1, 5):
        style = document.styles[f"Heading {level}"]
        _set_style_font(style, config["font"], max(config["body_size"] + 5 - level, config["body_size"]), bold=True)
        style.font.color.rgb = RGBColor.from_string(config["heading_color"])
        style.paragraph_format.space_before = Pt(12)
        style.paragraph_format.space_after = Pt(6)


def _set_style_font(style, font_name: str, size_pt: int, bold: bool = False) -> None:
    style.font.name = font_name
    style.font.size = Pt(size_pt)
    style.font.bold = bold
    rpr = style.element.get_or_add_rPr()
    rfonts = rpr.rFonts
    if rfonts is None:
        rfonts = OxmlElement("w:rFonts")
        rpr.append(rfonts)
    for attr in ("w:ascii", "w:hAnsi", "w:eastAsia", "w:cs"):
        rfonts.set(qn(attr), font_name)


def _add_inline_runs(paragraph, text: str, config: dict, bold: bool = False) -> None:
    parts = INLINE_PATTERN.split(text)
    for part in parts:
        if not part:
            continue
        run = paragraph.add_run()
        run.font.name = config["font"]
        run.font.size = Pt(config["body_size"])
        run._element.get_or_add_rPr().get_or_add_rFonts().set(qn("w:eastAsia"), config["font"])

        if part.startswith("**") and part.endswith("**"):
            run.text = part[2:-2]
            run.bold = True
        elif part.startswith("*") and part.endswith("*"):
            run.text = part[1:-1]
            run.italic = True
        elif part.startswith("`") and part.endswith("`"):
            run.text = part[1:-1]
            run.font.name = "Consolas"
            run._element.get_or_add_rPr().get_or_add_rFonts().set(qn("w:eastAsia"), "Consolas")
        else:
            run.text = part
            run.bold = bold


def _is_pipe_row(line: str) -> bool:
    stripped = line.strip()
    return stripped.startswith("|") and stripped.endswith("|") and stripped.count("|") >= 2


def _is_table_separator(line: str) -> bool:
    cells = [cell.strip() for cell in line.strip().strip("|").split("|")]
    return bool(cells) and all(re.fullmatch(r":?-{3,}:?", cell or "") for cell in cells)


def _is_table_start(lines: list[str], index: int) -> bool:
    return index + 1 < len(lines) and _is_pipe_row(lines[index]) and _is_table_separator(lines[index + 1])


def _parse_table_row(line: str) -> list[str]:
    return [cell.strip() for cell in line.strip().strip("|").split("|")]


def _add_table(document: Document, table_lines: list[str], config: dict) -> None:
    rows = [_parse_table_row(line) for line in table_lines if not _is_table_separator(line)]
    if not rows:
        return

    column_count = max(len(row) for row in rows)
    table = document.add_table(rows=len(rows), cols=column_count)
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    table.style = "Table Grid"

    for row_index, row_values in enumerate(rows):
        row = table.rows[row_index]
        for column_index in range(column_count):
            cell = row.cells[column_index]
            cell.vertical_alignment = WD_CELL_VERTICAL_ALIGNMENT.CENTER
            value = row_values[column_index] if column_index < len(row_values) else ""
            paragraph = cell.paragraphs[0]
            paragraph.alignment = WD_ALIGN_PARAGRAPH.CENTER if row_index == 0 else WD_ALIGN_PARAGRAPH.LEFT
            _add_inline_runs(paragraph, value, config, bold=row_index == 0)
            if row_index == 0:
                _set_cell_shading(cell, config["table_header_fill"])


def _set_cell_shading(cell, fill: str) -> None:
    tc_pr = cell._tc.get_or_add_tcPr()
    shading = OxmlElement("w:shd")
    shading.set(qn("w:fill"), fill)
    tc_pr.append(shading)


def _add_horizontal_rule(document: Document) -> None:
    paragraph = document.add_paragraph()
    p_pr = paragraph._p.get_or_add_pPr()
    border = OxmlElement("w:pBdr")
    bottom = OxmlElement("w:bottom")
    bottom.set(qn("w:val"), "single")
    bottom.set(qn("w:sz"), "6")
    bottom.set(qn("w:space"), "1")
    bottom.set(qn("w:color"), "BFBFBF")
    border.append(bottom)
    p_pr.append(border)


def main() -> None:
    parser = argparse.ArgumentParser(description="Convert Markdown to DOCX with reusable office-skills formatting")
    parser.add_argument("input_file", help="Input Markdown file (.md, .markdown, or .txt)")
    parser.add_argument("output_file", nargs="?", help="Output DOCX file; defaults to input filename with .docx")
    parser.add_argument("--preset", choices=sorted(STYLE_PRESETS), default="business", help="Formatting preset")
    args = parser.parse_args()

    output_file = args.output_file or str(Path(args.input_file).with_suffix(".docx"))
    result = convert_md_to_docx(args.input_file, output_file, preset=args.preset)
    print(f"Created: {result}")


if __name__ == "__main__":
    main()
