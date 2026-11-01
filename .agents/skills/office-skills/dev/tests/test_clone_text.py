import json
import sys
import xml.etree.ElementTree as ET
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "scripts" / "office"))

from clone_text import clone_xml_text


def test_clone_xml_text_replaces_only_text_nodes(tmp_path):
    xml_file = tmp_path / "document.xml"
    map_file = tmp_path / "mapping.json"
    xml_file.write_text(
        """<?xml version='1.0' encoding='utf-8'?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>
    <w:p><w:r><w:t>Hello NAME</w:t></w:r></w:p>
    <w:p><w:r><w:rPr><w:color w:val="NAME" /></w:rPr></w:r></w:p>
  </w:body>
</w:document>
""",
        encoding="utf-8",
    )
    map_file.write_text(json.dumps({"NAME": "World"}), encoding="utf-8")

    assert clone_xml_text(str(xml_file), str(map_file)) == 0

    content = xml_file.read_text(encoding="utf-8")
    assert "Hello World" in content

    root = ET.parse(xml_file).getroot()
    color = root.find(".//{http://schemas.openxmlformats.org/wordprocessingml/2006/main}color")
    assert color is not None
    assert color.get("{http://schemas.openxmlformats.org/wordprocessingml/2006/main}val") == "NAME"


def test_clone_xml_text_rejects_non_object_mapping(tmp_path):
    xml_file = tmp_path / "document.xml"
    map_file = tmp_path / "mapping.json"
    xml_file.write_text("<root />", encoding="utf-8")
    map_file.write_text("[]", encoding="utf-8")

    assert clone_xml_text(str(xml_file), str(map_file)) == 1
