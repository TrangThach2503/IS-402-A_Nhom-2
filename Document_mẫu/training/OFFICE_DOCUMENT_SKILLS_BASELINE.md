# OFFICE DOCUMENT SKILLS BASELINE - CUSTOMCAKEAI
> Approved operating baseline: 08/09/2026

## 1. Purpose

This file standardizes how every AI agent handles Microsoft Word and Excel artifacts for CustomCakeAI. It applies to Codex, Google Antigravity/Gemini, Hermes, Claude-compatible agents, and any other runtime that reads `SKILL.md`.

The current documentation sequence is:

`Project Plan -> Product Backlog -> User Stories -> C4 Model -> Database Design -> Implementation`

C4 and database design remain mandatory before core implementation, but they are deferred until the planning artifacts above have stabilized requirements and traceability.

## 2. Installed Skill Stack

| Layer | Path | Purpose |
|---|---|---|
| Project authority | `.agents/skills/capstone-office-documents/` | CustomCakeAI formatting, source-of-truth, workflow, and QA rules |
| Cross-agent router | `.agents/skills/office-skills/` | Vietnamese-capable Office workflow, OOXML tools, template profiling, and validation |
| Word specialist | `.agents/skills/docx/` (`docx-cn-reference`) | Chinese-developed DOCX workflow for OOXML, tracked changes, format preservation, and render checks |
| Excel specialist | `.agents/skills/xlsx/` (`xlsx-cn-reference`) | Chinese-developed XLSX workflow for template preservation, formulas, and zero-error checks |

The project authority layer overrides conflicts in generic skills. In particular, Chinese official-document typography, financial-model color conventions, Claude-only command wording, and Linux package commands are references only and must not override the current school template or Windows environment.

## 3. Source And Compatibility

- `office-skills` comes from `lamvu211/office-skills`, is MIT licensed, uses a standard root `SKILL.md`, and explicitly supports Claude, Codex-compatible, and other skill-aware agents.
- `docx-cn-reference` and `xlsx-cn-reference` come from the Chinese repository `SelfEvolveAI/claude-office-skills-cn`, licensed Apache-2.0. Their local identifiers were renamed to avoid shadowing Hermes built-in `docx`/`xlsx`; project routing removes reliance on Claude-specific slash commands.
- Hermes supports the Agent Skills open standard and scans `<project>/.agents/skills`. Because this workspace currently has no Git root, Hermes is configured to scan `C:/xampp/htdocs/CAPSTONE1/.agents/skills` through `skills.external_dirs`.
- Codex and Antigravity use the project `AGENTS.md`/`GEMINI.md` routing and the same `.agents/skills` copies.

## 4. Environment Baseline

- Operating system: Windows.
- Microsoft Word COM: available; use hidden mode for TOC refresh, pagination, and high-fidelity PDF export.
- Microsoft Excel COM: available; use hidden mode for full recalculation and save.
- Times New Roman regular, bold, italic, and bold-italic fonts: available.
- Python core for current Word/Excel work: `python-docx`, `openpyxl`, `pandas`, `xlsxwriter`, `lxml`, and `defusedxml`.
- Poppler `pdftoppm`: available through the Codex bundled runtime.
- LibreOffice and Pandoc are not currently on `PATH`; agents must not assume Linux/macOS commands work. Prefer Microsoft Office COM on this host or use the bundled/runtime path discovered at execution time.

## 5. Template Preservation Rules

1. Existing approved files are visual specifications, not just text containers.
2. Never change cover design, table colors, font hierarchy, margins, section layout, headers/footers, numbering, or TOC unless explicitly requested.
3. Profile the source before editing and make the smallest possible change.
4. Do not flatten a real TOC into static text or manually type page numbers.
5. Do not recreate complex tables if cell-level edits can preserve widths, merges, shading, borders, and pagination.
6. Save to a versioned output by default. Never silently overwrite the source.
7. Vietnamese text must remain Unicode. Detect and reject mojibake such as replacement characters or broken diacritics.

The current Proposal formatting instruction is Times New Roman, body 13 pt, main headings 15 pt, and subheadings 14 pt. Apply it to that document family when relevant; otherwise preserve the active template.

Table Header Standing Rule: Toàn bộ bảng biểu (tables) trong tài liệu Word/Excel từ nay trở về sau BẮT BUỘC dùng màu nền xám nhạt (`D9D9D9` hoặc `E7E6E6`), chữ màu đen đậm (`RGB(0,0,0)`, Bold), căn giữa (`CENTER`). Tuyệt đối KHÔNG dùng màu nền tối/xanh đậm (`1F497D`) gây chìm chữ hoặc giảm tương phản.

## 6. Required Word QA

- Reopen the final DOCX with a document library.
- Validate ZIP/OOXML integrity and ensure Word does not request repair.
- Refresh fields/TOC through hidden Word COM when the document contains dynamic fields.
- Export to PDF and inspect all pages, not only the first page.
- Check font fallback, Vietnamese diacritics, line spacing, heading hierarchy, page breaks, blank pages, table overflow, repeated headers, split rows, captions, images, and page numbering.
- Compare important structural counts before/after: sections, tables, images, headers/footers, and TOC fields.

## 7. Required Excel QA

- Preserve formulas, merged ranges, formats, validations, filters, freeze panes, named ranges, charts/images, and print setup unless the task changes them.
- Use hidden Excel COM for recalculation when formulas are present.
- Reopen the saved workbook with `openpyxl` and verify expected sheets and ranges.
- Reconcile `24 PBI` and `156 SP`, and verify both sprint measures where present: planned capacity guideline `30/38/35/31/22` and approved mapped PBI totals `28/42/37/31/18`. The mapped PBI totals must reconcile to 156 SP; the guideline is not a replacement for the PBI allocation.
- Reject formula errors, lost formulas, unintended external links, duplicate IDs, clipped content, broken merged cells, incorrect data types, or print-area overflow.
- Generic financial color conventions never apply automatically to Capstone planning spreadsheets.

## 8. Content And Traceability Gate

Office formatting quality cannot hide content inconsistency. Every Project Plan, Product Backlog, and User Story artifact must also satisfy:

- Mentor-reviewed scope and canonical roles.
- `Business Function -> FR/NFR -> User Story/PBI -> Architecture -> Test -> Evidence`.
- `24 PBI / 156 SP / 19 weeks / 5 Sprints` with no return to the superseded four-Sprint plan.
- Targets and hypotheses are not reported as measured results.
- No hardware POS/KDS, Shipper/QA account, food-safety scope, or watermark removal.

## 9. Protected Boundary

Never read, edit, move, index, or create files under `C:\xampp\htdocs\CAPSTONE1\Thay_DUC`.
