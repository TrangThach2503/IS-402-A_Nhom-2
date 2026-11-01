# office-skills

`office-skills` is a self-contained skill package for Claude, Codex-compatible agents, and other skill-aware AI agents that need to work with Office documents and workplace data: DOCX, XLSX, PPTX, PDF, charts, dashboards, reports, and format conversion.

The public entrypoint is [SKILL.md](SKILL.md). A user can download this repo and give the whole folder to an agent/host as the `office-skills` skill.

## What is included

```text
office-skills/
├── SKILL.md              # skill entrypoint
├── README.md             # public install/use guide
├── requirements.txt      # Python dependencies
├── resources/            # DOCX/XLSX/PPTX/PDF/OOXML and tool-selection guidance
├── standards/            # presentation standards, palettes, Vietnamese NĐ 30 guidance
├── templates/            # document/report templates
├── scripts/              # reusable local Office/PDF automation toolkit
├── integrations/         # optional host-specific wrappers
└── dev/                  # maintainer-only tests/docs
```

For normal skill installation, the important runtime files are [SKILL.md](SKILL.md), [resources/](resources/), [standards/](standards/), [templates/](templates/), [scripts/](scripts/), and [requirements.txt](requirements.txt).

## Install as a skill package

Clone or download the repo, then place the whole folder where your agent/host expects skills:

```bash
git clone <repo-url> office-skills
```

Expected package shape:

```text
skills/
└── office-skills/
    ├── SKILL.md
    ├── resources/
    ├── standards/
    ├── templates/
    ├── scripts/
    └── requirements.txt
```

The exact skills directory depends on your host. The key requirement is that [SKILL.md](SKILL.md) and its relative resources stay together in the same package folder.

## Install Python dependencies

From the repo root:

```bash
python -m venv .venv
# Windows PowerShell: .venv\Scripts\Activate.ps1
# macOS/Linux: source .venv/bin/activate
pip install -r requirements.txt
```

Optional external tools can improve fidelity for some workflows:

- Pandoc: Markdown to DOCX/PDF.
- LibreOffice headless: Office conversion, visual checks, spreadsheet recalculation.
- Microsoft Office COM on Windows: high-fidelity hidden Office automation.
- Node packages such as `docx` or `pptxgenjs`: only when a workflow clearly needs them.

The skill tells agents which Python library to prioritize for each task in [resources/library-selection.md](resources/library-selection.md).

## Optional Claude Code slash command

Claude Code users can also install the optional `/office-skills` wrapper from [integrations/claude-code/office-skills.md](integrations/claude-code/office-skills.md).

### Windows PowerShell

```powershell
New-Item -ItemType Directory -Force "$env:USERPROFILE\.claude\commands"
Copy-Item "integrations\claude-code\office-skills.md" "$env:USERPROFILE\.claude\commands\office-skills.md" -Force
```

### macOS/Linux

```bash
mkdir -p ~/.claude/commands
cp integrations/claude-code/office-skills.md ~/.claude/commands/office-skills.md
```

Then open Claude Code in the target project and call:

```text
/office-skills tạo dashboard từ file sales.xlsx, có chart theo tháng và top sản phẩm
```

## What the skill does

When activated, the agent should:

1. Classify the document/data task and ask for missing source/template/field/business-rule/output details.
2. Bootstrap only the target-project structure needed for the task: usually `output/` for simple outputs, `bridge/`/`INSTRUCT.md`/`LOG.md` for traceable reports, and optional `CLAUDE.md` only for long-lived workspaces.
3. Use bridge artifacts for raw data → chart/dashboard/report workflows.
4. Read the relevant resources, standards, templates, and scripts before producing professional output.
5. Choose libraries according to [resources/library-selection.md](resources/library-selection.md).
6. Verify output before reporting completion: data correctness, layout sanity, non-blank Office files, no repair prompts, and no blank chart/image frames.

## Common examples

```text
Use office-skills to create an Excel report from all CSV files in data/ with a summary sheet.
```

```text
Use office-skills to draft a Vietnamese administrative notice following NĐ 30 format.
```

```text
Use office-skills with template.docx and mapping.xlsx, replacing content while preserving the template layout.
```

## Maintainer notes

Development-only material lives under [dev/](dev/):

- [dev/tests/](dev/tests/) — smoke/contract tests.
- [dev/maintainer-docs/](dev/maintainer-docs/) — repo-agent context and detailed setup notes.

Run checks from the repo root:

```bash
python -m compileall -q scripts dev/tests
python -m pytest -q dev/tests --basetemp .pytest-tmp
```

Build a runtime-only zip for GitHub releases:

```bash
python scripts/package_runtime.py
```

This creates `dist/office-skills-runtime.zip` with only install/runtime files: `SKILL.md`, `README.md`, `requirements.txt`, `resources/`, `standards/`, `templates/`, `scripts/`, and `integrations/`. It excludes `dev/`, Git metadata, caches, virtual environments, and generated artifacts.

## License

MIT. See [LICENSE](LICENSE).
