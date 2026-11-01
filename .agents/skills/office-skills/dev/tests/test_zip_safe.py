import sys
import zipfile
from io import BytesIO
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "scripts" / "office"))

from helpers.zip_safe import UnsafeZipMemberError, safe_extract


def _zip_bytes(name: str, content: bytes = b"data") -> BytesIO:
    buffer = BytesIO()
    with zipfile.ZipFile(buffer, "w") as zip_file:
        zip_file.writestr(name, content)
    buffer.seek(0)
    return buffer


def test_safe_extract_allows_normal_members(tmp_path):
    with zipfile.ZipFile(_zip_bytes("word/document.xml", b"<root/>")) as zip_file:
        safe_extract(zip_file, tmp_path)

    assert (tmp_path / "word" / "document.xml").read_bytes() == b"<root/>"


def test_safe_extract_rejects_path_traversal(tmp_path):
    with zipfile.ZipFile(_zip_bytes("../evil.txt")) as zip_file:
        try:
            safe_extract(zip_file, tmp_path)
        except UnsafeZipMemberError:
            pass
        else:
            raise AssertionError("Expected UnsafeZipMemberError")
