# office-skills — Maintainer Setup Guide

This document is for maintainers of the public `office-skills` skill package. Normal users should start with the root [README.md](../../README.md) and [SKILL.md](../../SKILL.md).

## Public package shape

```text
office-skills/
├── SKILL.md
├── README.md
├── requirements.txt
├── LICENSE
├── resources/
├── standards/
├── templates/
├── scripts/
├── integrations/
│   └── claude-code/
│       └── office-skills.md
└── dev/
    ├── tests/
    └── maintainer-docs/
```

Do not put `.claude/`, `CLAUDE.md`, `bridge/`, `output/`, generated artifacts, or root `tests/` back into the public package root.

## Install dependencies for development

From the repo root:

```bash
python -m venv .venv
# Windows PowerShell: .venv\Scripts\Activate.ps1
# macOS/Linux: source .venv/bin/activate
pip install -r requirements.txt
```

Core dependencies:
- `pandas`, `numpy`, `openpyxl`, `xlsxwriter`, `pyxlsb` for data and Excel.
- `python-docx`, `python-pptx` for DOCX/PPTX basics.
- `pdfplumber`, `pypdf`, `pdf2docx` for PDF workflows.
- `lxml`, `defusedxml` for safe Office XML handling and validation.
- `plotly`, `reportlab`, `Pillow`, `markitdown[pptx]` for charts/reports/QA.
- `pytest` for tests.

Optional external tools:
- Pandoc for Markdown to DOCX/PDF.
- LibreOffice headless for Office conversion, spreadsheet recalc, and visual checks.
- Microsoft Office COM on Windows for high-fidelity hidden Office automation.
- Node packages such as `docx` or `pptxgenjs` only when Python tooling is insufficient.

## Optional Claude Code command installation

The public package stores the Claude Code command wrapper at `integrations/claude-code/office-skills.md`.

Windows PowerShell:

```powershell
New-Item -ItemType Directory -Force "$env:USERPROFILE\.claude\commands"
Copy-Item "integrations\claude-code\office-skills.md" "$env:USERPROFILE\.claude\commands\office-skills.md" -Force
```

macOS/Linux:

```bash
mkdir -p ~/.claude/commands
cp integrations/claude-code/office-skills.md ~/.claude/commands/office-skills.md
```

## Workflow rules to preserve

- `SKILL.md` is the canonical public skill entrypoint.
- `integrations/claude-code/office-skills.md` is an optional wrapper and should stay behaviorally aligned with `SKILL.md`.
- `resources/library-selection.md` tells agents which Python/library/tool to prefer for each task.
- `resources/bridge.md` documents bridge artifacts, but actual `bridge/` folders are generated inside target projects, not inside this repo.
- `output/` is generated in target projects and must not be committed here.

## Run checks

```bash
python -m compileall -q scripts dev/tests
python -m pytest -q dev/tests --basetemp .pytest-tmp
```

Also run:

```bash
git diff --check
git status --short
```

Expected after tests: `.pytest-tmp/` may exist locally, but it must be ignored and absent from `git status`.

## Publish checklist

Before publishing:

- Root contains only public package essentials plus `integrations/` and `dev/`.
- README explains skill package install first and Claude Code wrapper second.
- No generated Office/PDF/report artifacts are tracked.
- No secrets, local settings, `.env`, `.venv`, or Claude local runtime config are tracked.
- Tests pass.
