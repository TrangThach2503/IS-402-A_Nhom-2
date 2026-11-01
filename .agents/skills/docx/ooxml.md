# Office Open XML 技术参考

**重要：开始前请阅读完整文档。** 本文档涵盖：
- [技术指南](#技术指南) - 架构合规性规则和验证要求
- [文档内容模式](#文档内容模式) - 标题、列表、表格、格式等的 XML 模式
- [Document 库（Python）](#document-库python) - 推荐的带自动基础设施设置的 OOXML 操作方法
- [修订追踪（红线批注）](#修订追踪红线批注) - 实现修订追踪的 XML 模式

## 技术指南

### 架构合规性
- **`<w:pPr>` 中的元素顺序**：`<w:pStyle>`、`<w:numPr>`、`<w:spacing>`、`<w:ind>`、`<w:jc>`
- **空白**：对带前导/尾随空格的 `<w:t>` 元素添加 `xml:space='preserve'`
- **Unicode**：在 ASCII 内容中转义字符：`"` 变成 `&#8220;`
  - **字符编码参考**：弯引号 `""` 变成 `&#8220;&#8221;`，撇号 `'` 变成 `&#8217;`，破折号 `—` 变成 `&#8212;`
- **修订追踪**：在 `<w:r>` 元素外使用带 `w:author="Claude"` 的 `<w:del>` 和 `<w:ins>` 标签
  - **关键**：`<w:ins>` 以 `</w:ins>` 结束，`<w:del>` 以 `</w:del>` 结束 - 永远不要混淆
  - **RSID 必须是 8 位十六进制**：使用如 `00AB1234` 的值（只有 0-9、A-F 字符）
  - **trackRevisions 位置**：在 settings.xml 中将 `<w:trackRevisions/>` 添加在 `<w:proofState>` 之后
- **图片**：添加到 `word/media/`，在 `document.xml` 中引用，设置尺寸以防止溢出

## 文档内容模式

### 基本结构
```xml
<w:p>
  <w:r><w:t>文本内容</w:t></w:r>
</w:p>
```

### 标题和样式
```xml
<w:p>
  <w:pPr>
    <w:pStyle w:val="Title"/>
    <w:jc w:val="center"/>
  </w:pPr>
  <w:r><w:t>文档标题</w:t></w:r>
</w:p>

<w:p>
  <w:pPr><w:pStyle w:val="Heading2"/></w:pPr>
  <w:r><w:t>章节标题</w:t></w:r>
</w:p>
```

### 文本格式
```xml
<!-- 粗体 -->
<w:r><w:rPr><w:b/><w:bCs/></w:rPr><w:t>粗体</w:t></w:r>
<!-- 斜体 -->
<w:r><w:rPr><w:i/><w:iCs/></w:rPr><w:t>斜体</w:t></w:r>
<!-- 下划线 -->
<w:r><w:rPr><w:u w:val="single"/></w:rPr><w:t>下划线</w:t></w:r>
<!-- 高亮 -->
<w:r><w:rPr><w:highlight w:val="yellow"/></w:rPr><w:t>高亮</w:t></w:r>
```

### 列表
```xml
<!-- 编号列表 -->
<w:p>
  <w:pPr>
    <w:pStyle w:val="ListParagraph"/>
    <w:numPr><w:ilvl w:val="0"/><w:numId w:val="1"/></w:numPr>
    <w:spacing w:before="240"/>
  </w:pPr>
  <w:r><w:t>第一项</w:t></w:r>
</w:p>

<!-- 从 1 重新开始编号列表 - 使用不同的 numId -->
<w:p>
  <w:pPr>
    <w:pStyle w:val="ListParagraph"/>
    <w:numPr><w:ilvl w:val="0"/><w:numId w:val="2"/></w:numPr>
    <w:spacing w:before="240"/>
  </w:pPr>
  <w:r><w:t>新列表项 1</w:t></w:r>
</w:p>

<!-- 项目符号列表（二级） -->
<w:p>
  <w:pPr>
    <w:pStyle w:val="ListParagraph"/>
    <w:numPr><w:ilvl w:val="1"/><w:numId w:val="1"/></w:numPr>
    <w:spacing w:before="240"/>
    <w:ind w:left="900"/>
  </w:pPr>
  <w:r><w:t>项目符号项</w:t></w:r>
</w:p>
```

### 表格
```xml
<w:tbl>
  <w:tblPr>
    <w:tblStyle w:val="TableGrid"/>
    <w:tblW w:w="0" w:type="auto"/>
  </w:tblPr>
  <w:tblGrid>
    <w:gridCol w:w="4675"/><w:gridCol w:w="4675"/>
  </w:tblGrid>
  <w:tr>
    <w:tc>
      <w:tcPr><w:tcW w:w="4675" w:type="dxa"/></w:tcPr>
      <w:p><w:r><w:t>单元格 1</w:t></w:r></w:p>
    </w:tc>
    <w:tc>
      <w:tcPr><w:tcW w:w="4675" w:type="dxa"/></w:tcPr>
      <w:p><w:r><w:t>单元格 2</w:t></w:r></w:p>
    </w:tc>
  </w:tr>
</w:tbl>
```

### 布局
```xml
<!-- 新章节前的分页符（常见模式） -->
<w:p>
  <w:r>
    <w:br w:type="page"/>
  </w:r>
</w:p>
<w:p>
  <w:pPr>
    <w:pStyle w:val="Heading1"/>
  </w:pPr>
  <w:r>
    <w:t>新章节标题</w:t>
  </w:r>
</w:p>

<!-- 居中段落 -->
<w:p>
  <w:pPr>
    <w:spacing w:before="240" w:after="0"/>
    <w:jc w:val="center"/>
  </w:pPr>
  <w:r><w:t>居中文本</w:t></w:r>
</w:p>

<!-- 字体更改 - 段落级别（应用于所有 run） -->
<w:p>
  <w:pPr>
    <w:rPr><w:rFonts w:ascii="Courier New" w:hAnsi="Courier New"/></w:rPr>
  </w:pPr>
  <w:r><w:t>等宽字体文本</w:t></w:r>
</w:p>

<!-- 字体更改 - run 级别（仅限此文本） -->
<w:p>
  <w:r>
    <w:rPr><w:rFonts w:ascii="Courier New" w:hAnsi="Courier New"/></w:rPr>
    <w:t>这段文本是 Courier New</w:t>
  </w:r>
  <w:r><w:t> 而这段文本使用默认字体</w:t></w:r>
</w:p>
```

## 文件更新

添加内容时，更新以下文件：

**`word/_rels/document.xml.rels`：**
```xml
<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/numbering" Target="numbering.xml"/>
<Relationship Id="rId5" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="media/image1.png"/>
```

**`[Content_Types].xml`：**
```xml
<Default Extension="png" ContentType="image/png"/>
<Override PartName="/word/numbering.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml"/>
```

### 图片
**关键**：计算尺寸以防止页面溢出并保持宽高比。

```xml
<!-- 最小必需结构 -->
<w:p>
  <w:r>
    <w:drawing>
      <wp:inline>
        <wp:extent cx="2743200" cy="1828800"/>
        <wp:docPr id="1" name="Picture 1"/>
        <a:graphic xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main">
          <a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture">
            <pic:pic xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture">
              <pic:nvPicPr>
                <pic:cNvPr id="0" name="image1.png"/>
                <pic:cNvPicPr/>
              </pic:nvPicPr>
              <pic:blipFill>
                <a:blip r:embed="rId5"/>
                <!-- 添加以保持宽高比的拉伸填充 -->
                <a:stretch>
                  <a:fillRect/>
                </a:stretch>
              </pic:blipFill>
              <pic:spPr>
                <a:xfrm>
                  <a:ext cx="2743200" cy="1828800"/>
                </a:xfrm>
                <a:prstGeom prst="rect"/>
              </pic:spPr>
            </pic:pic>
          </a:graphicData>
        </a:graphic>
      </wp:inline>
    </w:drawing>
  </w:r>
</w:p>
```

### 链接（超链接）

**重要**：所有超链接（内部和外部）都需要在 styles.xml 中定义 Hyperlink 样式。没有此样式，链接将看起来像普通文本而不是蓝色带下划线的可点击链接。

**外部链接：**
```xml
<!-- 在 document.xml 中 -->
<w:hyperlink r:id="rId5">
  <w:r>
    <w:rPr><w:rStyle w:val="Hyperlink"/></w:rPr>
    <w:t>链接文本</w:t>
  </w:r>
</w:hyperlink>

<!-- 在 word/_rels/document.xml.rels 中 -->
<Relationship Id="rId5" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink" 
              Target="https://www.example.com/" TargetMode="External"/>
```

**内部链接：**

```xml
<!-- 链接到书签 -->
<w:hyperlink w:anchor="myBookmark">
  <w:r>
    <w:rPr><w:rStyle w:val="Hyperlink"/></w:rPr>
    <w:t>链接文本</w:t>
  </w:r>
</w:hyperlink>

<!-- 书签目标 -->
<w:bookmarkStart w:id="0" w:name="myBookmark"/>
<w:r><w:t>目标内容</w:t></w:r>
<w:bookmarkEnd w:id="0"/>
```

**Hyperlink 样式（styles.xml 中必需）：**
```xml
<w:style w:type="character" w:styleId="Hyperlink">
  <w:name w:val="Hyperlink"/>
  <w:basedOn w:val="DefaultParagraphFont"/>
  <w:uiPriority w:val="99"/>
  <w:unhideWhenUsed/>
  <w:rPr>
    <w:color w:val="467886" w:themeColor="hyperlink"/>
    <w:u w:val="single"/>
  </w:rPr>
</w:style>
```

## Document 库（Python）

使用 `scripts/document.py` 中的 Document 类处理所有修订追踪和批注。它自动处理基础设施设置（people.xml、RSID、settings.xml、批注文件、关系、内容类型）。只有在库不支持的复杂场景才使用直接 XML 操作。

**处理 Unicode 和实体：**
- **搜索**：实体表示法和 Unicode 字符都有效 - `contains="&#8220;Company"` 和 `contains="\u201cCompany"` 找到相同的文本
- **替换**：使用实体（`&#8220;`）或 Unicode（`\u201c`）- 两者都有效，会根据文件编码适当转换（ascii → 实体，utf-8 → Unicode）

### 初始化

**关键**：在导入 `Document` 之前，使用 `find` 搜索 `document.py` 以定位正确的模块路径，然后相应调整导入语句。或者，将 `PYTHONPATH` 设置为项目根目录。

```python
# 调整导入路径或运行：PYTHONPATH=/path/to/skill python script.py
# 例如：from skills.docx.scripts.document import Document, DocxXMLEditor
from ... import Document, DocxXMLEditor

# 基本初始化（自动创建临时副本并设置基础设施）
doc = Document('unpacked')

# 自定义作者和缩写
doc = Document('unpacked', author="张三", initials="ZS")

# 启用修订追踪模式
doc = Document('unpacked', track_revisions=True)

# 指定自定义 RSID（如不提供则自动生成）
doc = Document('unpacked', rsid="07DC5ECB")
```

### 创建修订追踪

**关键**：只标记实际更改的文本。将所有未更改的文本保留在 `<w:del>`/`<w:ins>` 标签之外。标记未更改的文本使编辑不专业且更难审查。

**属性处理**：Document 类会自动向新元素注入属性（w:id、w:date、w:rsidR、w:rsidDel、w16du:dateUtc、xml:space）。当保留原始文档中未更改的文本时，复制带有现有属性的原始 `<w:r>` 元素以保持文档完整性。

**方法选择指南**：
- **向常规文本添加你自己的更改**：使用带 `<w:del>`/`<w:ins>` 标签的 `replace_node()`，或使用 `suggest_deletion()` 移除整个 `<w:r>` 或 `<w:p>` 元素
- **部分修改另一作者的修订追踪**：使用 `replace_node()` 将你的更改嵌套在他们的 `<w:ins>`/`<w:del>` 内
- **完全拒绝另一作者的插入**：对 `<w:ins>` 元素使用 `revert_insertion()`（不是 `suggest_deletion()`）
- **完全拒绝另一作者的删除**：对 `<w:del>` 元素使用 `revert_deletion()` 以使用修订追踪恢复已删除的内容

```python
# 最小编辑 - 更改一个词："报告是月度的" → "报告是季度的"
# 原始：<w:r w:rsidR="00AB12CD"><w:rPr><w:rFonts w:ascii="Calibri"/></w:rPr><w:t>报告是月度的</w:t></w:r>
node = doc["word/document.xml"].get_node(tag="w:r", contains="报告是月度的")
rpr = tags[0].toxml() if (tags := node.getElementsByTagName("w:rPr")) else ""
replacement = f'<w:r w:rsidR="00AB12CD">{rpr}<w:t>报告是</w:t></w:r><w:del><w:r>{rpr}<w:delText>月度</w:delText></w:r></w:del><w:ins><w:r>{rpr}<w:t>季度</w:t></w:r></w:ins><w:r w:rsidR="00AB12CD">{rpr}<w:t>的</w:t></w:r>'
doc["word/document.xml"].replace_node(node, replacement)

# 最小编辑 - 更改数字："30天内" → "45天内"
# 原始：<w:r w:rsidR="00XYZ789"><w:rPr><w:rFonts w:ascii="Calibri"/></w:rPr><w:t>30天内</w:t></w:r>
node = doc["word/document.xml"].get_node(tag="w:r", contains="30天内")
rpr = tags[0].toxml() if (tags := node.getElementsByTagName("w:rPr")) else ""
replacement = f'<w:del><w:r>{rpr}<w:delText>30</w:delText></w:r></w:del><w:ins><w:r>{rpr}<w:t>45</w:t></w:r></w:ins><w:r w:rsidR="00XYZ789">{rpr}<w:t>天内</w:t></w:r>'
doc["word/document.xml"].replace_node(node, replacement)

# 完全替换 - 即使替换所有文本也保留格式
node = doc["word/document.xml"].get_node(tag="w:r", contains="苹果")
rpr = tags[0].toxml() if (tags := node.getElementsByTagName("w:rPr")) else ""
replacement = f'<w:del><w:r>{rpr}<w:delText>苹果</w:delText></w:r></w:del><w:ins><w:r>{rpr}<w:t>香蕉 橙子</w:t></w:r></w:ins>'
doc["word/document.xml"].replace_node(node, replacement)

# 插入新内容（不需要属性 - 自动注入）
node = doc["word/document.xml"].get_node(tag="w:r", contains="现有文本")
doc["word/document.xml"].insert_after(node, '<w:ins><w:r><w:t>新文本</w:t></w:r></w:ins>')

# 删除整个 run（仅在删除所有内容时使用；部分删除使用 replace_node）
node = doc["word/document.xml"].get_node(tag="w:r", contains="要删除的文本")
doc["word/document.xml"].suggest_deletion(node)

# 删除整个段落（就地处理，处理常规和编号列表段落）
para = doc["word/document.xml"].get_node(tag="w:p", contains="要删除的段落")
doc["word/document.xml"].suggest_deletion(para)

# 添加新的编号列表项
target_para = doc["word/document.xml"].get_node(tag="w:p", contains="现有列表项")
pPr = tags[0].toxml() if (tags := target_para.getElementsByTagName("w:pPr")) else ""
new_item = f'<w:p>{pPr}<w:r><w:t>新项目</w:t></w:r></w:p>'
tracked_para = DocxXMLEditor.suggest_paragraph(new_item)
doc["word/document.xml"].insert_after(target_para, tracked_para)
```

### 添加批注

```python
# 添加跨越两个现有修订追踪的批注
# 注意：w:id 自动生成。只有当你从 XML 检查中知道它时才按 w:id 搜索
start_node = doc["word/document.xml"].get_node(tag="w:del", attrs={"w:id": "1"})
end_node = doc["word/document.xml"].get_node(tag="w:ins", attrs={"w:id": "2"})
doc.add_comment(start=start_node, end=end_node, text="此更改的解释")

# 在段落上添加批注
para = doc["word/document.xml"].get_node(tag="w:p", contains="段落文本")
doc.add_comment(start=para, end=para, text="关于此段落的批注")

# 在新创建的修订追踪上添加批注
# 首先创建修订追踪
node = doc["word/document.xml"].get_node(tag="w:r", contains="旧的")
new_nodes = doc["word/document.xml"].replace_node(
    node,
    '<w:del><w:r><w:delText>旧的</w:delText></w:r></w:del><w:ins><w:r><w:t>新的</w:t></w:r></w:ins>'
)
# 然后在新创建的元素上添加批注
# new_nodes[0] 是 <w:del>，new_nodes[1] 是 <w:ins>
doc.add_comment(start=new_nodes[0], end=new_nodes[1], text="根据要求将旧的改为新的")

# 回复现有批注
doc.reply_to_comment(parent_comment_id=0, text="我同意此更改")
```

### 拒绝修订追踪

**重要**：使用 `revert_insertion()` 拒绝插入，使用 `revert_deletion()` 通过修订追踪恢复删除。只对常规未标记的内容使用 `suggest_deletion()`。

```python
# 拒绝插入（将其包装在删除中）
# 当另一作者插入了你想删除的文本时使用
ins = doc["word/document.xml"].get_node(tag="w:ins", attrs={"w:id": "5"})
nodes = doc["word/document.xml"].revert_insertion(ins)  # 返回 [ins]

# 拒绝删除（创建插入以恢复已删除的内容）
# 当另一作者删除了你想恢复的文本时使用
del_elem = doc["word/document.xml"].get_node(tag="w:del", attrs={"w:id": "3"})
nodes = doc["word/document.xml"].revert_deletion(del_elem)  # 返回 [del_elem, new_ins]

# 拒绝段落中的所有插入
para = doc["word/document.xml"].get_node(tag="w:p", contains="段落文本")
nodes = doc["word/document.xml"].revert_insertion(para)  # 返回 [para]

# 拒绝段落中的所有删除
para = doc["word/document.xml"].get_node(tag="w:p", contains="段落文本")
nodes = doc["word/document.xml"].revert_deletion(para)  # 返回 [para]
```

### 插入图片

**关键**：Document 类使用临时副本在 `doc.unpacked_path`。始终将图片复制到此临时目录，而不是原始解压文件夹。

```python
from PIL import Image
import shutil, os

# 首先初始化文档
doc = Document('unpacked')

# 复制图片并计算保持宽高比的全宽尺寸
media_dir = os.path.join(doc.unpacked_path, 'word/media')
os.makedirs(media_dir, exist_ok=True)
shutil.copy('image.png', os.path.join(media_dir, 'image1.png'))
img = Image.open(os.path.join(media_dir, 'image1.png'))
width_emus = int(6.5 * 914400)  # 6.5" 可用宽度，914400 EMU/英寸
height_emus = int(width_emus * img.size[1] / img.size[0])

# 添加关系和内容类型
rels_editor = doc['word/_rels/document.xml.rels']
next_rid = rels_editor.get_next_rid()
rels_editor.append_to(rels_editor.dom.documentElement,
    f'<Relationship Id="{next_rid}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="media/image1.png"/>')
doc['[Content_Types].xml'].append_to(doc['[Content_Types].xml'].dom.documentElement,
    '<Default Extension="png" ContentType="image/png"/>')

# 插入图片
node = doc["word/document.xml"].get_node(tag="w:p", line_number=100)
doc["word/document.xml"].insert_after(node, f'''<w:p>
  <w:r>
    <w:drawing>
      <wp:inline distT="0" distB="0" distL="0" distR="0">
        <wp:extent cx="{width_emus}" cy="{height_emus}"/>
        <wp:docPr id="1" name="Picture 1"/>
        <a:graphic xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main">
          <a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture">
            <pic:pic xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture">
              <pic:nvPicPr><pic:cNvPr id="1" name="image1.png"/><pic:cNvPicPr/></pic:nvPicPr>
              <pic:blipFill><a:blip r:embed="{next_rid}"/><a:stretch><a:fillRect/></a:stretch></pic:blipFill>
              <pic:spPr><a:xfrm><a:ext cx="{width_emus}" cy="{height_emus}"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></pic:spPr>
            </pic:pic>
          </a:graphicData>
        </a:graphic>
      </wp:inline>
    </w:drawing>
  </w:r>
</w:p>''')
```

### 获取节点

```python
# 按文本内容
node = doc["word/document.xml"].get_node(tag="w:p", contains="特定文本")

# 按行范围
para = doc["word/document.xml"].get_node(tag="w:p", line_number=range(100, 150))

# 按属性
node = doc["word/document.xml"].get_node(tag="w:del", attrs={"w:id": "1"})

# 按精确行号（必须是标签打开的行号）
para = doc["word/document.xml"].get_node(tag="w:p", line_number=42)

# 组合过滤器
node = doc["word/document.xml"].get_node(tag="w:r", line_number=range(40, 60), contains="文本")

# 当文本出现多次时消除歧义 - 添加 line_number 范围
node = doc["word/document.xml"].get_node(tag="w:r", contains="章节", line_number=range(2400, 2500))
```

### 保存

```python
# 带自动验证保存（复制回原始目录）
doc.save()  # 默认验证，验证失败时抛出错误

# 保存到不同位置
doc.save('modified-unpacked')

# 跳过验证（仅用于调试 - 在生产中需要这个表示有 XML 问题）
doc.save(validate=False)
```

### 直接 DOM 操作

对于库不支持的复杂场景：

```python
# 访问任何 XML 文件
editor = doc["word/document.xml"]
editor = doc["word/comments.xml"]

# 直接 DOM 访问（defusedxml.minidom.Document）
node = doc["word/document.xml"].get_node(tag="w:p", line_number=5)
parent = node.parentNode
parent.removeChild(node)
parent.appendChild(node)  # 移动到末尾

# 通用文档操作（不带修订追踪）
old_node = doc["word/document.xml"].get_node(tag="w:p", contains="原始文本")
doc["word/document.xml"].replace_node(old_node, "<w:p><w:r><w:t>替换文本</w:t></w:r></w:p>")

# 多次插入 - 使用返回值维护顺序
node = doc["word/document.xml"].get_node(tag="w:r", line_number=100)
nodes = doc["word/document.xml"].insert_after(node, "<w:r><w:t>A</w:t></w:r>")
nodes = doc["word/document.xml"].insert_after(nodes[-1], "<w:r><w:t>B</w:t></w:r>")
nodes = doc["word/document.xml"].insert_after(nodes[-1], "<w:r><w:t>C</w:t></w:r>")
# 结果：original_node, A, B, C
```

## 修订追踪（红线批注）

**使用上面的 Document 类处理所有修订追踪。** 以下模式供构建替换 XML 字符串时参考。

### 验证规则
验证器检查在还原 Claude 的更改后文档文本是否与原始匹配。这意味着：
- **永远不要修改另一作者的 `<w:ins>` 或 `<w:del>` 标签内的文本**
- **始终使用嵌套删除**来移除另一作者的插入
- **每个编辑都必须正确追踪**，使用 `<w:ins>` 或 `<w:del>` 标签

### 修订追踪模式

**关键规则**：
1. 永远不要修改另一作者修订追踪内的内容。始终使用嵌套删除。
2. **XML 结构**：始终将 `<w:del>` 和 `<w:ins>` 放在段落级别，包含完整的 `<w:r>` 元素。永远不要嵌套在 `<w:r>` 元素内 - 这会创建破坏文档处理的无效 XML。

**文本插入：**
```xml
<w:ins w:id="1" w:author="Claude" w:date="2025-07-30T23:05:00Z" w16du:dateUtc="2025-07-31T06:05:00Z">
  <w:r w:rsidR="00792858">
    <w:t>插入的文本</w:t>
  </w:r>
</w:ins>
```

**文本删除：**
```xml
<w:del w:id="2" w:author="Claude" w:date="2025-07-30T23:05:00Z" w16du:dateUtc="2025-07-31T06:05:00Z">
  <w:r w:rsidDel="00792858">
    <w:delText>删除的文本</w:delText>
  </w:r>
</w:del>
```

**删除另一作者的插入（必须使用嵌套结构）：**
```xml
<!-- 将删除嵌套在原始插入内 -->
<w:ins w:author="张三" w:id="16">
  <w:del w:author="Claude" w:id="40">
    <w:r><w:delText>月度</w:delText></w:r>
  </w:del>
</w:ins>
<w:ins w:author="Claude" w:id="41">
  <w:r><w:t>周度</w:t></w:r>
</w:ins>
```

**恢复另一作者的删除：**
```xml
<!-- 保持他们的删除不变，在其后添加新插入 -->
<w:del w:author="张三" w:id="50">
  <w:r><w:delText>30天内</w:delText></w:r>
</w:del>
<w:ins w:author="Claude" w:id="51">
  <w:r><w:t>30天内</w:t></w:r>
</w:ins>
```
