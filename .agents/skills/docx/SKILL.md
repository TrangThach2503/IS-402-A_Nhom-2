---
name: docx-cn-reference
description: "Chinese-developed cross-agent reference for creating, editing, and validating professional DOCX files with OOXML, tracked changes, comments, format preservation, text extraction, and rendered visual checks. Use as a specialist reference together with the project Office authority skill."
---

# DOCX 创建、编辑和分析

## CAPSTONE1 Windows Override

When used under `C:\xampp\htdocs\CAPSTONE1`, first load `.agents/skills/capstone-office-documents/SKILL.md` and `TRAINING/OFFICE_DOCUMENT_SKILLS_BASELINE.md`. Do not run `sudo` or Linux package-manager commands. Preserve the active school/source template, and use hidden Microsoft Word COM for high-fidelity TOC refresh, pagination, PDF export, and rendered QA when needed.

## 概述

用户可能会要求你创建、编辑或分析 .docx 文件的内容。.docx 文件本质上是一个包含 XML 文件和其他资源的 ZIP 压缩包，你可以读取或编辑。针对不同任务，你有不同的工具和工作流可用。

## 工作流决策树

### 读取/分析内容
使用下面的"文本提取"或"原始 XML 访问"部分

### 创建新文档
使用"创建新 Word 文档"工作流

### 编辑现有文档
- **自己的文档 + 简单更改**
  使用"基本 OOXML 编辑"工作流

- **他人的文档**
  使用**"红线批注工作流"**（推荐默认）

- **法律、学术、商业或政府文档**
  使用**"红线批注工作流"**（必需）

## 读取和分析内容

### 文本提取
如果你只需要读取文档的文本内容，应该使用 pandoc 将文档转换为 markdown。Pandoc 为保留文档结构提供出色支持，并可以显示修订追踪：

```bash
# 将文档转换为 markdown 并保留修订追踪
pandoc --track-changes=all path-to-file.docx -o output.md
# 选项：--track-changes=accept/reject/all
```

### 原始 XML 访问
以下情况需要原始 XML 访问：批注、复杂格式、文档结构、嵌入媒体和元数据。对于这些功能，你需要解压文档并读取其原始 XML 内容。

#### 解压文件
`python ooxml/scripts/unpack.py <office_file> <output_directory>`

#### 关键文件结构
* `word/document.xml` - 主文档内容
* `word/comments.xml` - document.xml 中引用的批注
* `word/media/` - 嵌入的图片和媒体文件
* 修订追踪使用 `<w:ins>`（插入）和 `<w:del>`（删除）标签

## 创建新 Word 文档

从零创建新 Word 文档时，使用 **docx-js**，它允许你使用 JavaScript/TypeScript 创建 Word 文档。

### 工作流
1. **强制 - 阅读完整文件**：从头到尾完整阅读 [`docx-js.md`](docx-js.md)（约 500 行）。**阅读此文件时永远不要设置范围限制。**在开始创建文档前阅读完整文件内容以了解详细语法、关键格式规则和最佳实践。
2. 使用 Document、Paragraph、TextRun 组件创建 JavaScript/TypeScript 文件（可以假设所有依赖已安装，如果没有，参考下面的依赖部分）
3. 使用 Packer.toBuffer() 导出为 .docx

## 编辑现有 Word 文档

编辑现有 Word 文档时，使用 **Document 库**（用于 OOXML 操作的 Python 库）。该库自动处理基础设施设置，并提供文档操作方法。对于复杂场景，你可以通过库直接访问底层 DOM。

### 工作流
1. **强制 - 阅读完整文件**：从头到尾完整阅读 [`ooxml.md`](ooxml.md)（约 600 行）。**阅读此文件时永远不要设置范围限制。**阅读完整文件内容以了解 Document 库 API 和直接编辑文档文件的 XML 模式。
2. 解压文档：`python ooxml/scripts/unpack.py <office_file> <output_directory>`
3. 使用 Document 库创建并运行 Python 脚本（参见 ooxml.md 中的"Document 库"部分）
4. 打包最终文档：`python ooxml/scripts/pack.py <input_directory> <office_file>`

Document 库为常见操作提供高级方法，也为复杂场景提供直接 DOM 访问。

## 文档审查的红线批注工作流

此工作流允许你在实现到 OOXML 之前使用 markdown 规划全面的修订追踪。**关键**：对于完整的修订追踪，你必须系统地实现所有更改。

**批处理策略**：将相关更改分组为 3-10 个更改的批次。这使调试可管理同时保持效率。在进入下一批之前测试每一批。

**原则：最小化、精确的编辑**
实现修订追踪时，只标记实际更改的文本。重复未更改的文本使编辑更难审查且显得不专业。将替换分解为：[未更改文本] + [删除] + [插入] + [未更改文本]。通过提取原始 `<w:r>` 元素并重用它来保留未更改文本的原始 run RSID。

示例 - 将句子中的"30天"改为"60天"：
```python
# 错误 - 替换整个句子
'<w:del><w:r><w:delText>期限为30天。</w:delText></w:r></w:del><w:ins><w:r><w:t>期限为60天。</w:t></w:r></w:ins>'

# 正确 - 只标记更改的内容，为未更改文本保留原始 <w:r>
'<w:r w:rsidR="00AB12CD"><w:t>期限为</w:t></w:r><w:del><w:r><w:delText>30</w:delText></w:r></w:del><w:ins><w:r><w:t>60</w:t></w:r></w:ins><w:r w:rsidR="00AB12CD"><w:t>天。</w:t></w:r>'
```

### 修订追踪工作流

1. **获取 markdown 表示**：将文档转换为保留修订追踪的 markdown：
   ```bash
   pandoc --track-changes=all path-to-file.docx -o current.md
   ```

2. **识别和分组更改**：审查文档并识别所需的所有更改，将它们组织成逻辑批次：

   **定位方法**（用于在 XML 中查找更改）：
   - 章节/标题编号（如"第 3.2 节"、"第四条"）
   - 如果有编号的段落标识符
   - 带唯一周围文本的 Grep 模式
   - 文档结构（如"第一段"、"签名块"）
   - **不要使用 markdown 行号** - 它们不映射到 XML 结构

   **批次组织**（每批 3-10 个相关更改）：
   - 按章节："批次 1：第 2 节修订"、"批次 2：第 5 节更新"
   - 按类型："批次 1：日期更正"、"批次 2：当事方名称更改"
   - 按复杂度：从简单文本替换开始，然后处理复杂结构更改
   - 顺序："批次 1：第 1-3 页"、"批次 2：第 4-6 页"

3. **阅读文档并解压**：
   - **强制 - 阅读完整文件**：从头到尾完整阅读 [`ooxml.md`](ooxml.md)（约 600 行）。**阅读此文件时永远不要设置范围限制。**特别注意"Document 库"和"修订追踪模式"部分。
   - **解压文档**：`python ooxml/scripts/unpack.py <file.docx> <dir>`
   - **注意建议的 RSID**：解压脚本会建议用于修订追踪的 RSID。复制此 RSID 用于步骤 4b。

4. **批量实现更改**：逻辑分组更改（按章节、类型或位置）并在单个脚本中一起实现。这种方法：
   - 使调试更容易（较小批次 = 更容易隔离错误）
   - 允许渐进进展
   - 保持效率（3-10 个更改的批次效果良好）

   **建议的批次分组：**
   - 按文档章节（如"第 3 节更改"、"定义"、"终止条款"）
   - 按更改类型（如"日期更改"、"当事方名称更新"、"法律术语替换"）
   - 按位置（如"第 1-3 页的更改"、"文档前半部分的更改"）

   对于每批相关更改：

   **a. 将文本映射到 XML**：在 `word/document.xml` 中 grep 文本以验证文本如何在 `<w:r>` 元素间分割。

   **b. 创建并运行脚本**：使用 `get_node` 查找节点，实现更改，然后 `doc.save()`。参见 ooxml.md 中的**"Document 库"**部分了解模式。

   **注意**：在编写脚本之前始终立即 grep `word/document.xml` 以获取当前行号并验证文本内容。每次脚本运行后行号会改变。

5. **打包文档**：所有批次完成后，将解压目录转换回 .docx：
   ```bash
   python ooxml/scripts/pack.py unpacked reviewed-document.docx
   ```

6. **最终验证**：对完整文档进行全面检查：
   - 将最终文档转换为 markdown：
     ```bash
     pandoc --track-changes=all reviewed-document.docx -o verification.md
     ```
   - 验证所有更改已正确应用：
     ```bash
     grep "原始短语" verification.md  # 应该找不到
     grep "替换短语" verification.md  # 应该找到
     ```
   - 检查没有引入意外更改


## 将文档转换为图片

要视觉分析 Word 文档，使用两步过程将它们转换为图片：

1. **将 DOCX 转换为 PDF**：
   ```bash
   soffice --headless --convert-to pdf document.docx
   ```

2. **将 PDF 页面转换为 JPEG 图片**：
   ```bash
   pdftoppm -jpeg -r 150 document.pdf page
   ```
   这会创建 `page-1.jpg`、`page-2.jpg` 等文件。

选项：
- `-r 150`：设置分辨率为 150 DPI（调整质量/大小平衡）
- `-jpeg`：输出 JPEG 格式（如需要可使用 `-png` 输出 PNG）
- `-f N`：要转换的第一页（如 `-f 2` 从第 2 页开始）
- `-l N`：要转换的最后一页（如 `-l 5` 在第 5 页停止）
- `page`：输出文件的前缀

特定范围示例：
```bash
pdftoppm -jpeg -r 150 -f 2 -l 5 document.pdf page  # 仅转换第 2-5 页
```

## 代码风格指南
**重要**：为 DOCX 操作生成代码时：
- 编写简洁代码
- 避免冗长的变量名和冗余操作
- 避免不必要的打印语句

## 依赖

所需依赖（如果不可用则安装）：

- **pandoc**：`sudo apt-get install pandoc`（用于文本提取）
- **docx**：`npm install -g docx`（用于创建新文档）
- **LibreOffice**：`sudo apt-get install libreoffice`（用于 PDF 转换）
- **Poppler**：`sudo apt-get install poppler-utils`（用于 pdftoppm 将 PDF 转换为图片）
- **defusedxml**：`pip install defusedxml`（用于安全的 XML 解析）
