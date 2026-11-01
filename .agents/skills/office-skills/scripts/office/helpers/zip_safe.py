"""Safe ZIP extraction helpers for Office Open XML packages."""

from __future__ import annotations

import zipfile
from pathlib import Path


class UnsafeZipMemberError(ValueError):
    """Raised when a ZIP member would extract outside the destination."""


def safe_extract(zip_file: zipfile.ZipFile, destination: str | Path) -> None:
    destination_path = Path(destination).resolve()
    destination_path.mkdir(parents=True, exist_ok=True)

    for member in zip_file.infolist():
        member_name = member.filename.replace("\\", "/")
        if member_name.startswith("/") or member_name.startswith("../") or "/../" in member_name:
            raise UnsafeZipMemberError(f"Unsafe ZIP member path: {member.filename}")

        target_path = (destination_path / member_name).resolve()
        if not _is_relative_to(target_path, destination_path):
            raise UnsafeZipMemberError(f"ZIP member escapes destination: {member.filename}")

    zip_file.extractall(destination_path)


def _is_relative_to(path: Path, parent: Path) -> bool:
    try:
        path.relative_to(parent)
        return True
    except ValueError:
        return False
