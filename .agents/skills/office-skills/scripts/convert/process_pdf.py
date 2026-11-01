"""Process digital PDF files locally: merge, split, extract text, and extract tables."""

from __future__ import annotations

import argparse
from pathlib import Path

import pdfplumber
from pypdf import PdfReader, PdfWriter

DEFAULT_MAX_FILE_SIZE_MB = 100
DEFAULT_MAX_PAGES = 500


def merge_pdfs(input_files: list[str], output_file: str, max_file_size_mb: int = DEFAULT_MAX_FILE_SIZE_MB, max_pages: int = DEFAULT_MAX_PAGES) -> Path:
    if len(input_files) < 2:
        raise ValueError("Merge requires at least two input PDF files")

    output_path = Path(output_file)
    writer = PdfWriter()

    for input_file in input_files:
        input_path = _validate_pdf(input_file, max_file_size_mb=max_file_size_mb)
        reader = PdfReader(str(input_path))
        _validate_page_count(reader, max_pages=max_pages, input_path=input_path)
        for page in reader.pages:
            writer.add_page(page)

    output_path.parent.mkdir(parents=True, exist_ok=True)
    with output_path.open("wb") as file_obj:
        writer.write(file_obj)
    return output_path


def split_pdf(input_file: str, pages: str, output_file: str, max_file_size_mb: int = DEFAULT_MAX_FILE_SIZE_MB, max_pages: int = DEFAULT_MAX_PAGES) -> Path:
    input_path = _validate_pdf(input_file, max_file_size_mb=max_file_size_mb)
    output_path = Path(output_file)
    reader = PdfReader(str(input_path))
    _validate_page_count(reader, max_pages=max_pages, input_path=input_path)
    writer = PdfWriter()

    for page_index in _parse_page_selection(pages, len(reader.pages)):
        writer.add_page(reader.pages[page_index])

    output_path.parent.mkdir(parents=True, exist_ok=True)
    with output_path.open("wb") as file_obj:
        writer.write(file_obj)
    return output_path


def extract_text(input_file: str, output_file: str, pages: str | None = None, max_file_size_mb: int = DEFAULT_MAX_FILE_SIZE_MB, max_pages: int = DEFAULT_MAX_PAGES) -> Path:
    input_path = _validate_pdf(input_file, max_file_size_mb=max_file_size_mb)
    output_path = Path(output_file)

    with pdfplumber.open(input_path) as pdf:
        _validate_pdfplumber_page_count(pdf, max_pages=max_pages, input_path=input_path)
        page_indexes = _parse_page_selection(pages, len(pdf.pages)) if pages else range(len(pdf.pages))
        chunks = []
        for page_index in page_indexes:
            text = pdf.pages[page_index].extract_text() or ""
            chunks.append(f"--- Page {page_index + 1} ---\n{text}".rstrip())

    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text("\n\n".join(chunks) + "\n", encoding="utf-8")
    return output_path


def extract_tables(input_file: str, output_file: str, pages: str | None = None, max_file_size_mb: int = DEFAULT_MAX_FILE_SIZE_MB, max_pages: int = DEFAULT_MAX_PAGES) -> Path:
    input_path = _validate_pdf(input_file, max_file_size_mb=max_file_size_mb)
    output_path = Path(output_file)

    rows: list[list[str]] = []
    with pdfplumber.open(input_path) as pdf:
        _validate_pdfplumber_page_count(pdf, max_pages=max_pages, input_path=input_path)
        page_indexes = _parse_page_selection(pages, len(pdf.pages)) if pages else range(len(pdf.pages))
        for page_index in page_indexes:
            tables = pdf.pages[page_index].extract_tables()
            for table_number, table in enumerate(tables, start=1):
                rows.append([f"page {page_index + 1}", f"table {table_number}"])
                rows.extend([[cell or "" for cell in row] for row in table])
                rows.append([])

    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(_to_csv(rows), encoding="utf-8")
    return output_path


def _validate_pdf(input_file: str, max_file_size_mb: int) -> Path:
    input_path = Path(input_file)
    if not input_path.is_file():
        raise FileNotFoundError(f"Input PDF file does not exist: {input_path}")
    if input_path.suffix.lower() != ".pdf":
        raise ValueError(f"Input file must be a .pdf file: {input_path}")
    max_bytes = max_file_size_mb * 1024 * 1024
    if input_path.stat().st_size > max_bytes:
        raise ValueError(f"PDF exceeds size limit of {max_file_size_mb} MB: {input_path}")
    return input_path


def _validate_page_count(reader: PdfReader, max_pages: int, input_path: Path) -> None:
    if len(reader.pages) > max_pages:
        raise ValueError(f"PDF exceeds page limit of {max_pages}: {input_path}")


def _validate_pdfplumber_page_count(pdf, max_pages: int, input_path: Path) -> None:
    if len(pdf.pages) > max_pages:
        raise ValueError(f"PDF exceeds page limit of {max_pages}: {input_path}")


def _parse_page_selection(selection: str, page_count: int) -> list[int]:
    indexes: list[int] = []
    for part in selection.split(","):
        part = part.strip()
        if not part:
            continue
        if "-" in part:
            start_text, end_text = part.split("-", 1)
            start = int(start_text)
            end = int(end_text)
            if start > end:
                raise ValueError(f"Invalid page range: {part}")
            indexes.extend(range(start - 1, end))
        else:
            indexes.append(int(part) - 1)

    invalid = [index + 1 for index in indexes if index < 0 or index >= page_count]
    if invalid:
        raise ValueError(f"Page selection out of range: {invalid}; PDF has {page_count} page(s)")
    return indexes


def _to_csv(rows: list[list[str]]) -> str:
    return "\n".join(",".join(_csv_escape(cell) for cell in row) for row in rows) + "\n"


def _csv_escape(value: str) -> str:
    if any(char in value for char in [",", '"', "\n", "\r"]):
        return '"' + value.replace('"', '""') + '"'
    return value


def main() -> None:
    parser = argparse.ArgumentParser(description="Process digital PDF files locally")
    subparsers = parser.add_subparsers(dest="command", required=True)

    merge_parser = subparsers.add_parser("merge", help="Merge multiple PDFs")
    merge_parser.add_argument("--input", nargs="+", required=True, help="Input PDF files")
    merge_parser.add_argument("--output", required=True, help="Output PDF file")
    merge_parser.add_argument("--max-file-size-mb", type=int, default=DEFAULT_MAX_FILE_SIZE_MB, help="Maximum input PDF size in MB")
    merge_parser.add_argument("--max-pages", type=int, default=DEFAULT_MAX_PAGES, help="Maximum pages per input PDF")

    split_parser = subparsers.add_parser("split", help="Split selected pages into a new PDF")
    split_parser.add_argument("--input", required=True, help="Input PDF file")
    split_parser.add_argument("--pages", required=True, help="Pages to keep, e.g. 1-3,5")
    split_parser.add_argument("--output", required=True, help="Output PDF file")
    split_parser.add_argument("--max-file-size-mb", type=int, default=DEFAULT_MAX_FILE_SIZE_MB, help="Maximum input PDF size in MB")
    split_parser.add_argument("--max-pages", type=int, default=DEFAULT_MAX_PAGES, help="Maximum pages in input PDF")

    text_parser = subparsers.add_parser("extract-text", help="Extract text to UTF-8 text file")
    text_parser.add_argument("--input", required=True, help="Input PDF file")
    text_parser.add_argument("--output", required=True, help="Output text file")
    text_parser.add_argument("--pages", help="Optional pages, e.g. 1-3,5")
    text_parser.add_argument("--max-file-size-mb", type=int, default=DEFAULT_MAX_FILE_SIZE_MB, help="Maximum input PDF size in MB")
    text_parser.add_argument("--max-pages", type=int, default=DEFAULT_MAX_PAGES, help="Maximum pages in input PDF")

    table_parser = subparsers.add_parser("extract-tables", help="Extract tables to CSV")
    table_parser.add_argument("--input", required=True, help="Input PDF file")
    table_parser.add_argument("--output", required=True, help="Output CSV file")
    table_parser.add_argument("--pages", help="Optional pages, e.g. 1-3,5")
    table_parser.add_argument("--max-file-size-mb", type=int, default=DEFAULT_MAX_FILE_SIZE_MB, help="Maximum input PDF size in MB")
    table_parser.add_argument("--max-pages", type=int, default=DEFAULT_MAX_PAGES, help="Maximum pages in input PDF")

    args = parser.parse_args()

    if args.command == "merge":
        result = merge_pdfs(args.input, args.output, max_file_size_mb=args.max_file_size_mb, max_pages=args.max_pages)
    elif args.command == "split":
        result = split_pdf(args.input, args.pages, args.output, max_file_size_mb=args.max_file_size_mb, max_pages=args.max_pages)
    elif args.command == "extract-text":
        result = extract_text(args.input, args.output, args.pages, max_file_size_mb=args.max_file_size_mb, max_pages=args.max_pages)
    elif args.command == "extract-tables":
        result = extract_tables(args.input, args.output, args.pages, max_file_size_mb=args.max_file_size_mb, max_pages=args.max_pages)
    else:
        parser.error(f"Unsupported command: {args.command}")

    print(f"Created: {result}")


if __name__ == "__main__":
    main()
