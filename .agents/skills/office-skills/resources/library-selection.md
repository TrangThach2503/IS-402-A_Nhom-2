# Library and Tool Selection

Use this file when `office-skills` is activated and the workflow requires Python or local document tooling. Prefer the smallest tool that preserves correctness, formatting, and verification.

## General priority

1. Preserve source files; write new artifacts to `output/`.
2. Use `bridge/` for intermediate data and evidence in report/dashboard workflows.
3. Prefer deterministic local libraries before GUI automation.
4. Use Office XML or headless Office/LibreOffice when high-fidelity template preservation or validation is required.
5. Verify by reopening or rendering the artifact before reporting completion.

## Tabular data and Excel

| Task | Prefer | Use when | Avoid / notes |
|---|---|---|---|
| Read CSV/XLSX into dataframes | `pandas` | Cleaning, joins, aggregations, pivot tables, bridge tables | Do not mutate raw source files. |
| Numeric transforms | `numpy` | Vectorized calculations, rates, outlier rules | Keep business rules explicit in metadata. |
| Read/write existing XLSX | `openpyxl` | Preserve formulas/styles, inspect sheets, validate workbook, edit cells/ranges | It does not calculate formulas. Use Excel/LibreOffice if recalculation is required. |
| Create polished XLSX reports | `xlsxwriter` | New workbook with formatting, charts, conditional formats | Cannot edit existing workbook. |
| `.xlsb` input | `pandas` + `pyxlsb` | Binary Excel workbooks | Convert/normalize into bridge output before reporting. |
| Formula recalculation | Excel COM or LibreOffice headless | Output depends on live formulas | Run hidden/headless and reopen result. |

Rules:
- Use live formulas for workbooks the user will continue editing.
- Use computed static values only for snapshot reports.
- Always read the final XLSX with `openpyxl` to confirm expected sheets/cells/charts/images exist and workbook is readable.

## DOCX

| Task | Prefer | Use when | Avoid / notes |
|---|---|---|---|
| Create new DOCX | `python-docx` | Standard reports, letters, tables, headings, images | Profile standards first for formal/Vietnamese admin docs. |
| Markdown to DOCX | `scripts/convert/convert_md_to_docx.py` or Pandoc + `scripts/format/format_docx.py` | Markdown source, predictable business/formal docs | Pandoc is optional external dependency; bundled converter supports a smaller Markdown subset. |
| Preserve DOCX template formatting | Office XML scripts: `unpack.py`, `clone_text.py`, `pack.py`, `validate.py` | User provides template and asks to keep layout/style | Do not rebuild template with `python-docx` if format preservation matters. |
| Deep DOCX XML validation | `scripts/office/validate.py`, `defusedxml`, `lxml` | OOXML patching, tracked changes, repair-risk files | Do not regex-delete arbitrary XML. |
| Convert DOCX to PDF | LibreOffice headless via `scripts/office/soffice.py` | Final PDF deliverable or visual QA | Validate source DOCX first. |

Rules:
- For Vietnamese administrative documents, read `standards/nd30.md` and the matching `templates/docx-hanh-chinh-*.md`.
- If replacing text in XML, modify text nodes only and keep run/style properties untouched.
- Reopen final DOCX with `python-docx` and confirm expected paragraphs/tables exist.

## PPTX

| Task | Prefer | Use when | Avoid / notes |
|---|---|---|---|
| Create/edit basic PPTX | `python-pptx` | Slides, text boxes, images, basic tables/shapes | Chart editing and master/layout fidelity are limited. |
| Preserve template slide formatting | Office XML scripts or PowerPoint COM | Need exact masters/layouts/shape positions/placeholders | Profile template geometry and style first. |
| Generate chart images | `plotly` export or Excel/PowerPoint export | Need reliable visual insertion into PPTX | Prefer exported PNG over clipboard paste. |
| Visual QA | LibreOffice/PowerPoint headless export to PDF/PNG | Important presentation deliverable | Check for blank frames, clipped text, wrong z-order. |

Rules:
- Do not create text-only slide decks when the goal is presentation.
- Slide 1 should usually be executive summary/title; details follow.
- After creation, reopen with `python-pptx` and confirm slide/shape counts are non-zero.

## PDF

| Task | Prefer | Use when | Avoid / notes |
|---|---|---|---|
| Extract text from digital PDF | `pdfplumber` | Need per-page text, layout-aware extraction | If text is empty, treat as scanned/image PDF. |
| Extract tables from digital PDF | `pdfplumber` | Tables are text-based and structured enough | Always inspect extracted table quality before using. |
| Merge/split/select pages | `pypdf` | Page-level operations | Validate page ranges and file size/page limits. |
| Convert PDF to DOCX | `pdf2docx` via `scripts/convert/convert_pdf_to_docx.py` | Digital PDF where layout preservation matters | Not suitable for scanned PDFs without OCR. |
| Create PDF from data/text | `reportlab` or DOCX/PPTX/XLSX → PDF via LibreOffice | Programmatic PDF output | Prefer source document + conversion if layout is complex. |
| Scanned PDF | OCR/vision workflow | Image-only documents | Do not pretend digital extraction succeeded. |

Rules:
- Separate digital PDF workflows from scanned PDF workflows.
- For extracted tables, write cleaned/normalized tables to `bridge/` before using them in reports.

## Office XML / OOXML

| Task | Prefer | Use when | Avoid / notes |
|---|---|---|---|
| Unpack Office file | `scripts/office/unpack.py` | Need to inspect or patch DOCX/PPTX/XLSX internals | Use safe extraction; do not unzip manually into trusted paths. |
| Replace visible text | `scripts/office/clone_text.py` | Exact text replacement while preserving markup | Replacements are text-node only. |
| Pack Office file | `scripts/office/pack.py` | Rebuild Office ZIP package | Include original file for validation where useful. |
| Validate package | `scripts/office/validate.py` | OOXML edits, repair-risk outputs | Run before reporting completion. |
| XML parsing | `defusedxml`, `lxml` | Secure parsing and schema-aware operations | Avoid unsafe XML parsers on untrusted files. |

Rules:
- Never edit formatting nodes unless the task explicitly requires it and you understand the schema impact.
- Prefer schema/structure-aware edits over regex on XML.

## Charts, dashboards, and reports

| Task | Prefer | Use when | Avoid / notes |
|---|---|---|---|
| Aggregation and bridge tables | `pandas` | Any raw data to report/dashboard workflow | Bridge first, render second. |
| Interactive/static HTML dashboard | `plotly` + static HTML | No dynamic backend required | Keep assets local and output self-contained when possible. |
| Excel charts | `xlsxwriter` for new files, `openpyxl` for existing files | XLSX deliverable with chart source sheets | Ensure chart source tables remain traceable. |
| PPT/DOCX chart images | `plotly`/Excel export to PNG then insert | Cross-Office chart transfer | Avoid clipboard if possible. |
| Visual evidence | `Pillow` for basic image checks | Need to confirm generated images dimensions/non-blank | Use render/export when available. |

Rules:
- Metadata must state source file, period/year, filters, row counts, field mapping, and output path.
- Titles/subtitles must come from metadata, not hard-coded assumptions.
- QA final values against bridge tables.

## Optional external tools

| Tool | Use for | Notes |
|---|---|---|
| Pandoc | Markdown to DOCX/PDF workflows | Optional; use bundled converter if unavailable and scope is simple. |
| LibreOffice headless | Convert Office to PDF, recalc spreadsheets, visual/openability checks | Run headless and close processes cleanly. |
| Microsoft Office COM | Highest-fidelity Excel/PowerPoint/Word automation on Windows | Use hidden instances, disable alerts, close in `finally`. |
| Node `pptxgenjs` / `docx` | Complex generation when Python libraries are insufficient | Optional; do not introduce unless workflow benefits clearly. |

## Verification by artifact

- XLSX: `openpyxl.load_workbook`, expected sheets/cells/charts/images, optional recalc.
- DOCX: `python-docx.Document`, expected paragraphs/tables/images, optional PDF render.
- PPTX: `python-pptx.Presentation`, expected slides/shapes/images, optional slide render.
- PDF: `pypdf.PdfReader`, expected page count, `pdfplumber` text/table spot checks.
- HTML dashboard: parse/check output file, inspect embedded data/config, optionally screenshot if browser tooling is available.
