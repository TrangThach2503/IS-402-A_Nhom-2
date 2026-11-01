import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "scripts" / "convert"))

from process_pdf import _parse_page_selection, _validate_pdf


def test_parse_page_selection_supports_ranges_and_single_pages():
    assert _parse_page_selection("1-3,5", 6) == [0, 1, 2, 4]


def test_parse_page_selection_rejects_out_of_range():
    try:
        _parse_page_selection("1,4", 3)
    except ValueError as exc:
        assert "out of range" in str(exc)
    else:
        raise AssertionError("Expected ValueError")


def test_validate_pdf_rejects_wrong_extension(tmp_path):
    text_file = tmp_path / "input.txt"
    text_file.write_text("not a pdf", encoding="utf-8")

    try:
        _validate_pdf(str(text_file), max_file_size_mb=1)
    except ValueError as exc:
        assert "must be a .pdf" in str(exc)
    else:
        raise AssertionError("Expected ValueError")
