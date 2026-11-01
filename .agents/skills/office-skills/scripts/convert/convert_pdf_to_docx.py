"""Convert a PDF file to DOCX using pdf2docx."""

from __future__ import annotations

import argparse
from pathlib import Path

from pypdf import PdfReader
from pdf2docx import Converter

DEFAULT_MAX_FILE_SIZE_MB = 100
DEFAULT_MAX_PAGES = 500


def convert_pdf_to_docx(input_file: str, output_file: str, max_file_size_mb: int = DEFAULT_MAX_FILE_SIZE_MB, max_pages: int = DEFAULT_MAX_PAGES) -> Path:
    input_path = Path(input_file)
    output_path = Path(output_file)

    if not input_path.is_file():
        raise FileNotFoundError(f"Input PDF file does not exist: {input_path}")
    if input_path.suffix.lower() != ".pdf":
        raise ValueError("Input file must be a .pdf file")
    if input_path.stat().st_size > max_file_size_mb * 1024 * 1024:
        raise ValueError(f"PDF exceeds size limit of {max_file_size_mb} MB: {input_path}")
    reader = PdfReader(str(input_path))
    if len(reader.pages) > max_pages:
        raise ValueError(f"PDF exceeds page limit of {max_pages}: {input_path}")

    output_path.parent.mkdir(parents=True, exist_ok=True)
    converter = Converter(str(input_path))
    try:
        converter.convert(str(output_path), start=0, end=None)
    finally:
        converter.close()
    return output_path


def main() -> None:
    parser = argparse.ArgumentParser(description="Convert PDF to DOCX using pdf2docx")
    parser.add_argument("input_file", help="Input PDF file")
    parser.add_argument("output_file", nargs="?", help="Output DOCX file; defaults to input filename with .docx")
    parser.add_argument("--max-file-size-mb", type=int, default=DEFAULT_MAX_FILE_SIZE_MB, help="Maximum input PDF size in MB")
    parser.add_argument("--max-pages", type=int, default=DEFAULT_MAX_PAGES, help="Maximum pages in input PDF")
    args = parser.parse_args()

    output_file = args.output_file or str(Path(args.input_file).with_suffix(".docx"))
    result = convert_pdf_to_docx(args.input_file, output_file, max_file_size_mb=args.max_file_size_mb, max_pages=args.max_pages)
    print(f"Created: {result}")


if __name__ == "__main__":
    main()
