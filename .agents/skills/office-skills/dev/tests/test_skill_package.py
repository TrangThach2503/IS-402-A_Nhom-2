from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]


def test_skill_entrypoint_exists_with_required_metadata():
    skill_file = ROOT / "SKILL.md"
    content = skill_file.read_text(encoding="utf-8")

    assert content.startswith("---\n")
    assert "name: office-skills" in content
    assert "description:" in content
    assert "resources/library-selection.md" in content
    assert "resources/bridge.md" in content


def test_claude_code_integration_wraps_skill_entrypoint():
    command_file = ROOT / "integrations" / "claude-code" / "office-skills.md"
    content = command_file.read_text(encoding="utf-8")

    assert "command wrapper cho skill `office-skills`" in content
    assert "SKILL.md" in content
    assert "resources/library-selection.md" in content


def test_public_root_does_not_require_claude_code_config_tree():
    assert not (ROOT / ".claude" / "commands" / "office-skills.md").exists()


def test_library_selection_resource_covers_core_formats():
    resource_file = ROOT / "resources" / "library-selection.md"
    content = resource_file.read_text(encoding="utf-8")

    for expected in [
        "pandas",
        "openpyxl",
        "xlsxwriter",
        "python-docx",
        "python-pptx",
        "pdfplumber",
        "pypdf",
        "pdf2docx",
    ]:
        assert expected in content
