# bridge

`bridge/` là thư mục quy ước cho lớp dữ liệu trung gian và bằng chứng kiểm tra khi workflow cần chuyển raw data thành chart, dashboard, report hoặc output Office nhiều thành phần.

Mục tiêu:
- giữ `output/` sạch, chỉ chứa file cuối cùng người dùng cần nhận;
- tách rõ dữ liệu nguồn, business rules và presentation;
- lưu bảng đã làm sạch, bảng tổng hợp, chart sources, metadata, validation và evidence để dễ truy vết;
- giúp agent và người dùng có cùng nhận thức về dữ liệu đã dùng trước khi render output.

## Cấu trúc khuyến nghị

```text
bridge/
├── 01-cleaned-data.xlsx
├── 02-summary-tables.xlsx
├── 03-chart-sources.xlsx
├── metadata.json
├── validation.txt
├── deep-validation.txt
├── evidence.json
├── build.log
└── qa.log
```

Không phải workflow nào cũng cần đủ tất cả file trên. Với tác vụ đơn giản, chỉ cần các bảng trung gian và metadata. Với dashboard/report/PPTX dùng để ra quyết định, nên có thêm validation và evidence.

## Vai trò từng artifact

| Artifact | Vai trò |
|---|---|
| `01-cleaned-data.xlsx` | Dữ liệu đã chuẩn hóa từ source, chưa aggregate quá sâu. |
| `02-summary-tables.xlsx` | Pivot/summary theo business rules đã xác nhận. |
| `03-chart-sources.xlsx` | Bảng nguồn cuối cùng cho từng chart/KPI/panel. |
| `metadata.json` | Nguồn dữ liệu, template, kỳ báo cáo, filters, field mapping, output target. |
| `validation.txt` | Kiểm tra cơ bản: số dòng, sheet, missing columns, filters, totals. |
| `deep-validation.txt` | Kiểm tra sâu khi cần: đối chiếu chart/table/output với bridge. |
| `evidence.json` | Bằng chứng máy đọc được về dữ liệu và QA đã thực hiện. |
| `build.log` | Log quá trình dựng bridge/output. |
| `qa.log` | Log kiểm tra output cuối. |

## Metadata tối thiểu

`metadata.json` nên có các nhóm thông tin sau khi phù hợp:

```json
{
  "intent": "dashboard|report|chart|docx|pptx|xlsx|convert",
  "source_files": [
    {
      "path": "data/source.xlsx",
      "role": "primary_source",
      "sheets": ["Sheet1"]
    }
  ],
  "template_files": [
    {
      "path": "templates/template.pptx",
      "role": "format_template"
    }
  ],
  "field_mapping": {
    "period": "Month",
    "category": "Product",
    "measure": "Revenue"
  },
  "business_rules": {
    "filters": ["Year = 2026"],
    "aggregations": ["sum Revenue by Month and Product"],
    "ranking": "top 10 by Revenue"
  },
  "row_counts": {
    "raw": 1000,
    "cleaned": 980,
    "included": 950
  },
  "output": {
    "format": "xlsx|html|docx|pptx|pdf",
    "path": "output/report.xlsx"
  }
}
```

## Evidence tối thiểu

`evidence.json` nên ghi lại những kiểm tra quan trọng thay vì chỉ nói chung là đã QA:

```json
{
  "checks": [
    {
      "name": "chart_source_match",
      "status": "passed",
      "source_table": "03-chart-sources.xlsx::monthly_revenue",
      "output_element": "dashboard chart: monthly revenue"
    },
    {
      "name": "kpi_value_match",
      "status": "passed",
      "source_table": "02-summary-tables.xlsx::kpi_summary",
      "output_element": "executive summary KPI"
    }
  ],
  "visual_sanity": {
    "text_overlap": "checked",
    "label_wrapping": "checked",
    "template_dummy_data": "not_found",
    "office_repair_prompt": "not_found",
    "blank_output": "not_found"
  },
  "office_object_transfer": [
    {
      "source": "03-chart-sources.xlsx::chart_revenue",
      "target": "output/report.pptx::slide 3::shape 5",
      "method": "export_png_insert",
      "width_height_checked": true,
      "bounds_checked": true,
      "blank_frame_checked": true,
      "status": "passed"
    }
  ]
}
```

## Intake trước khi tạo bridge

Trước khi dựng bridge, agent cần xác nhận đủ các điểm ảnh hưởng đến output:

1. **Mục đích:** người dùng muốn phân tích, dashboard, report, trình chiếu, văn bản, hay convert?
2. **Source:** file nào là nguồn chính, file nào là lookup/mapping, sheet/table nào cần đọc?
3. **Format/template:** có file mẫu cần giữ layout/format không?
4. **Fields:** cột nào là period, category, entity, measure, status, owner, hoặc identifier?
5. **Business rules:** lọc gì, group by gì, aggregate gì, top N/ranking/rate tính thế nào?
6. **Output:** định dạng, tên file, nơi lưu, ngôn ngữ, tone, chart/KPI bắt buộc?

Nếu có thể tự nhận diện từ file, agent nên nêu giả định để người dùng xác nhận thay vì hỏi quá nhiều câu rời rạc.

## Bảo mật và tối thiểu hóa dữ liệu

- Không ghi secret, credential, token, thông tin cá nhân không cần thiết vào `bridge/`, `INSTRUCT.md`, hoặc `LOG.md`.
- Nếu cần lưu ví dụ lỗi hoặc evidence, ưu tiên lưu schema, row count, hash, aggregate hoặc dữ liệu đã ẩn danh thay vì copy nguyên dòng nhạy cảm.
- Chỉ giữ bridge artifacts cần thiết để truy vết và tái chạy workflow; không biến `bridge/` thành bản sao raw data nếu không cần.

## Nguyên tắc

- Raw data không bị sửa tại chỗ.
- Business rules/filter được áp dụng trước khi render và ghi rõ vào metadata.
- Chart/dashboard/report chỉ đọc từ các bảng bridge đã kiểm tra.
- Output cuối phải được QA ngược lại với bridge tables.
- `output/` chỉ chứa artifact cuối: `.xlsx`, `.html`, `.pptx`, `.docx`, `.pdf`.
