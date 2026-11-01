---
name: capstone-office-documents
description: Create, edit, and verify CustomCakeAI Word and Excel artifacts while preserving approved templates, Vietnamese Unicode text, fonts, tables, cover pages, TOC fields, formulas, and print layout. Use for Project Plan, Product Backlog, User Stories, Proposal, SRS, SAD, STP, registration forms, and related DOCX/XLSX work.
version: 1.0.0
author: CustomCakeAI C1SE.81
platforms: [windows]
metadata:
  tags: [docx, xlsx, word, excel, office, vietnamese, capstone]
  category: productivity
---

# CustomCakeAI Office Documents

This project skill is the authority layer above the vendored `office-skills`, `docx`, and `xlsx` skills. Generic or upstream formatting suggestions never override the user's source file, an approved school template, or `TRAINING/OFFICE_DOCUMENT_SKILLS_BASELINE.md`.

## Required Load

1. Read `AGENTS.md` and the mandatory project context.
2. Read `TRAINING/OFFICE_DOCUMENT_SKILLS_BASELINE.md`.
3. Read `.agents/skills/office-skills/SKILL.md`.
4. For Word, read the `docx-cn-reference` package at `.agents/skills/docx/SKILL.md` and the referenced file needed by the chosen workflow.
5. For Excel, read the `xlsx-cn-reference` package at `.agents/skills/xlsx/SKILL.md`.

## Work Order

The current documentation order is:

`Project Plan -> Product Backlog -> User Stories -> C4 Model -> Database Design -> Implementation`

Do not force C4 or database decisions into planning documents before the Product Backlog and User Stories have stabilized the functional scope.

## Non-Negotiable Rules

- Never access or modify `C:\xampp\htdocs\CAPSTONE1\Thay_DUC`.
- Never overwrite an official/source file unless the user explicitly asks. Produce a versioned copy by default.
- Zero unprompted file conversion or compression: never automatically export to PDF or compress into `.zip` files unless the user explicitly requests it (`koc cần sửa file pdf khi nào toi nói làm mới dc làm`, `à viecj nén khi nào tôi keo mới được làm, xóa đi`). Keep deliverables strictly in the requested native format (e.g. `.xlsx` alone).
- Treat the existing document as both content input and visual specification. Preserve its cover, theme colors, styles, margins, headers, footers, numbering, table design, images, section breaks, and TOC behavior unless the user explicitly asks to change them.
- Do not rebuild a complex approved DOCX from plain text when a targeted OOXML or template-preserving edit can retain more formatting.
- Use Unicode end to end. Never pass Vietnamese text through a lossy ANSI code page.
- Do not claim a document is complete merely because it opens. Verification must include structure, content, and rendered layout.

## Word Workflow

1. Duplicate the source to a versioned output.
2. Profile page setup, sections, styles, fonts, cover, headers/footers, numbering, TOC field, tables, images, and tracked changes before editing.
3. Make the smallest safe change. Prefer style-aware `python-docx` for simple edits and OOXML for structures that `python-docx` cannot preserve reliably.
4. For Vietnamese Times New Roman requirements, set `ascii`, `hAnsi`, `eastAsia`, and `cs` font mappings consistently on new or repaired runs/styles. Do not globally restyle an approved template without instruction.
5. Preserve Word field codes. A TOC must remain a real TOC field based on heading styles, not pasted static text.
6. On this Windows host, use hidden Microsoft Word COM when high-fidelity field refresh, pagination, or PDF export is required. Do not display Word windows unless requested.
7. Reopen the result, validate the OOXML package, export to PDF, render pages, and inspect every page for mojibake, fallback fonts, overflow, orphan headings, broken tables, blank pages, displaced images, and TOC/page-number errors.

For the current proposal family, the user-approved rule is Times New Roman with body text 13 pt, main headings 15 pt, and subheadings 14 pt. Apply this only where that document family or the user requires it; an existing official template remains authoritative.

## Excel Workflow

1. Profile workbook sheets, merged ranges, formulas, styles, widths/heights, filters, freeze panes, validations, conditional formatting, named ranges, charts/images, and print settings.
2. Preserve established workbook formatting. Do not impose generic financial-model colors on Product Backlog or User Story workbooks.
3. Keep IDs and codes as text when leading zeros or exact spelling matter. Keep dates, story points, owners, acceptance criteria, RQ/RO links, and sprint totals type-safe.
4. Use formulas for workbook calculations that must remain dynamic. Do not replace formulas with cached values.
5. On this Windows host, prefer hidden Microsoft Excel COM for full recalculation and save when LibreOffice is unavailable. Ensure background COM processes (`EXCEL.EXE`) are cleanly terminated; an unreleased COM handle locks the file and throws `PermissionError: [Errno 13] Permission denied` on subsequent openpyxl writes. Terminate orphaned Excel COM processes via PowerShell (`Stop-Process -Id <pid> -Force`) if locked.
6. Reopen with `openpyxl`, verify expected sheets/ranges, reconcile totals, and reject `#REF!`, `#DIV/0!`, `#VALUE!`, `#N/A`, `#NAME?`, unintended external links, clipped columns, broken merges, or print-area overflow.

### Weekly Meeting Review Report (DTU CMU 4-Part Standard)

When generating or updating `Weekly_Meeting_Report/C1SE81_Weekly Meeting Report_*.xlsx`:

- **4-Part Standard Structure:**
  - `I. WORK CONTENT PLAN`: Task, Priority, Status, Estimate (Hours), Person, Notes.
  - `II. WORK CONTENT DONE`: Deliverable / Work Done, Priority, Status, Effort (Hours), Actual (Hours), Done (%), Person, Notes.
  - `III. ISSUE / RISK`: No., Issue / Risk Description (merged B:C), Impact, Solution / Mitigation Action (merged E:G), Status. Keep rows empty/blank when no blockers are active; do not invent artificial risks.
  - `IV. PLAN CONTENT THE NEXT WEEK`: Task, Priority, Status, Estimate (Hours), Estimate (%), Target, Assignee, Notes.
- **Language & Notes Conventions:** When full English is requested (`sửa lại tất cả gọn full tiếng anh`), translate all headings, tasks, deliverables, and targets to clean professional English without mixed Vietnamese text. Leave `Notes` columns in Part I and Part II blank unless specific remarks are requested.
- **Team Effort Invariants:** Actual logged hours must maintain $\ge 10\text{h/day}$ across 5 members ($\ge 2\text{h/day/member}$). In Part IV, all 5 members must be assigned concrete sprint responsibilities (zero unassigned members).
- **Realistic Task Hours Estimation:** Database modeling tasks should reflect real effort (e.g. Chen ERD ~12h, Table Relationship Diagram ~9h, Attributes ~8h, Entities ~7h).
- **Multi-line Text Wrapping & Explicit Row Heights (Pitfall):** When long descriptions wrap inside merged cells (e.g. Columns B:C or E:G in Section III, or Column A in Section IV), Excel COM auto-fit fails on PDF export, causing text to collapse, overlap vertically, or be clipped mid-sentence. Always set explicit generous row heights:
  - Standard table headers/totals: `22.0pt` to `24.0pt`
  - Single-line data rows: `24.0pt` to `26.0pt`
  - Multi-line wrapped text (Issue / Risk, next week tasks): `38.0pt` to `48.0pt`
  - Section title banners: `24.0pt`
- **Page Break Strategy:** When a report spans 2 landscape pages, insert an explicit row break (`ws.row_breaks.append(Break(id=...))` right before Section III). This enforces a clean semantic split:
  - Page 1: Header metadata, Section I (Plan), and Section II (Done).
  - Page 2: Section III (Issue / Risk), Section IV (Next Week Sprint Plan), and Signatures.
- **Excel COM Landscape Page Setup:**
  - Set `ws.PageSetup.Orientation = 2` (`xlLandscape`).
  - Set `ws.PageSetup.Zoom = $false`, `ws.PageSetup.FitToPagesWide = 1`, and `ws.PageSetup.FitToPagesTall = 2` (or `$false`). Never pass `0` to `FitToPagesTall` as Excel COM throws a COMException.
- **Dynamic Formulas:** Totals must use `=SUM(...)` and `=AVERAGE(...)` with cell ranges matching the exact table rows. Re-evaluate with Excel COM to verify calculated numbers.

## Project Traceability

Planning artifacts must preserve:

- `24 PBI / 156 SP / 19 weeks / 5 Sprints`.
- Sprint allocation `30 / 38 / 35 / 31 / 22 SP`.
- `Business Function -> FR/NFR -> User Story/PBI -> Architecture -> Test -> Evidence`.
- Canonical team roles and mentor-reviewed scope from project source-of-truth files.
- Targets as targets, never fabricated measured results.

## Delivery Gate

Before reporting completion, provide evidence that:

- The output exists and opens without a repair prompt.
- Vietnamese text and required fonts render correctly.
- Cover, headings, TOC, page numbering, tables, and images remain coherent.
- Excel formulas and totals are correct with zero formula errors.
- The output was visually inspected after rendering.
- No unrelated file or protected directory was modified.
