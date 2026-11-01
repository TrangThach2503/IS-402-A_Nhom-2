"""Build a runtime-only office-skills package zip.

The runtime package excludes maintainer-only files such as dev tests/docs,
Git metadata, virtual environments, caches, and generated workflow artifacts.
"""

from __future__ import annotations

import argparse
import fnmatch
import zipfile
from pathlib import Path


DEFAULT_OUTPUT = Path("dist") / "office-skills-runtime.zip"

EXCLUDE_DIRS = {
    ".git",
    ".claude",
    ".pytest_cache",
    ".pytest-tmp",
    ".mypy_cache",
    ".ruff_cache",
    ".cache",
    ".tox",
    ".nox",
    ".venv",
    "venv",
    "env",
    "__pycache__",
    "build",
    "dist",
    "dev",
    "bridge",
    "output",
    "unpacked",
}

EXCLUDE_FILE_PATTERNS = [
    "*.pyc",
    "*.pyo",
    "*.tmp",
    "*.bak",
    "~$*.docx",
    "~$*.xlsx",
    "~$*.pptx",
    "*.converted.*",
    "*.generated.*",
    "*.rendered.*",
    "*.validation.log",
    "*.qa.log",
    "*.pptx.png",
    "*.docx.pdf",
    "*.pptx.pdf",
    "*.xlsx.pdf",
]

INCLUDE_ROOT_FILES = {
    "LICENSE",
    "README.md",
    "requirements.txt",
    "SKILL.md",
}

INCLUDE_DIRS = {
    "integrations",
    "resources",
    "scripts",
    "standards",
    "templates",
}


def build_runtime_zip(repo_root: Path, output_path: Path) -> Path:
    repo_root = repo_root.resolve()
    output_path = output_path.resolve()
    output_path.parent.mkdir(parents=True, exist_ok=True)

    with zipfile.ZipFile(output_path, "w", zipfile.ZIP_DEFLATED) as archive:
        for path in sorted(repo_root.rglob("*")):
            if path == output_path or not path.is_file():
                continue
            relative = path.relative_to(repo_root)
            if _should_exclude(relative):
                continue
            archive.write(path, Path("office-skills") / relative)

    return output_path


def _should_exclude(relative_path: Path) -> bool:
    parts = relative_path.parts
    if any(part in EXCLUDE_DIRS for part in parts[:-1]):
        return True

    if len(parts) == 1:
        return parts[0] not in INCLUDE_ROOT_FILES

    if parts[0] not in INCLUDE_DIRS:
        return True

    filename = parts[-1]
    return any(fnmatch.fnmatch(filename, pattern) for pattern in EXCLUDE_FILE_PATTERNS)


def main() -> None:
    parser = argparse.ArgumentParser(description="Build runtime-only office-skills zip")
    parser.add_argument(
        "--output",
        default=str(DEFAULT_OUTPUT),
        help=f"Output zip path (default: {DEFAULT_OUTPUT})",
    )
    args = parser.parse_args()

    repo_root = Path(__file__).resolve().parents[1]
    output_path = build_runtime_zip(repo_root, Path(args.output))
    print(f"Created: {output_path}")


if __name__ == "__main__":
    main()
