import argparse
import json
import sys
import xml.etree.ElementTree as ET
from pathlib import Path

TEXT_TAGS = {
    "{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t",
    "{http://schemas.openxmlformats.org/drawingml/2006/main}t",
    "{http://schemas.openxmlformats.org/spreadsheetml/2006/main}t",
}


def clone_xml_text(xml_file: str, map_file: str) -> int:
    xml_path = Path(xml_file)
    map_path = Path(map_file)

    if not xml_path.is_file():
        print(f"Error: XML file does not exist: {xml_path}", file=sys.stderr)
        return 1
    if not map_path.is_file():
        print(f"Error: mapping JSON file does not exist: {map_path}", file=sys.stderr)
        return 1

    try:
        mapping = json.loads(map_path.read_text(encoding="utf-8"))
    except json.JSONDecodeError as exc:
        print(f"Error: invalid mapping JSON: {exc}", file=sys.stderr)
        return 1

    if not isinstance(mapping, dict):
        print("Error: mapping JSON must be an object of text replacements", file=sys.stderr)
        return 1

    try:
        tree = ET.parse(xml_path)
    except ET.ParseError as exc:
        print(f"Error: invalid XML file: {exc}", file=sys.stderr)
        return 1

    root = tree.getroot()
    changes_made = 0

    for element in root.iter():
        if element.tag not in TEXT_TAGS or element.text is None:
            continue
        original_text = element.text
        updated_text = original_text
        for key, value in mapping.items():
            updated_text = updated_text.replace(str(key), str(value))
        if updated_text != original_text:
            element.text = updated_text
            changes_made += 1

    tree.write(xml_path, encoding="utf-8", xml_declaration=True)
    print(f"Completed text clone with {changes_made} text node replacement(s).")
    return 0


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Replace exact text inside Office XML text nodes while preserving markup")
    parser.add_argument("xml_file", help="Path to XML file, such as word/document.xml")
    parser.add_argument("--map", required=True, help="Path to replacement mapping JSON")
    args = parser.parse_args()

    sys.exit(clone_xml_text(args.xml_file, args.map))
