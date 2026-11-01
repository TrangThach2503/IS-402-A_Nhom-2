# Kỹ năng XLSX — Excel

Hướng dẫn tạo và thao tác bảng tính Excel chuyên nghiệp.

---

## Nguyên tắc tính toán

Với workbook tương tác hoặc file dùng để người dùng thay input sau này, ưu tiên công thức sống để Excel tự tính lại khi dữ liệu đổi.

```python
# Workbook tương tác
sheet['B10'] = '=SUM(B2:B9)'
sheet['C5'] = '=(C4-C2)/C2'
```

Với snapshot report hoặc dashboard render từ `bridge/`, có thể ghi fixed values nếu giá trị đã được tính trong bridge tables và truy vết được qua `metadata.json`/`evidence.json`. Không hard-code số liệu rời rạc trực tiếp trong code khi số đó phải đến từ dữ liệu nguồn.

---

## Công cụ

| Công cụ | Dùng cho |
|---|---|
| `openpyxl` | Tạo file đẹp, format corporate, conditional formatting |
| `pandas` | Làm sạch dữ liệu lớn, data cleaning |

---

## Formatting corporate chuẩn

```python
from openpyxl.styles import Border, Side, Alignment, PatternFill, Font

THIN_BORDER = Border(
    left=Side(style='thin'), right=Side(style='thin'),
    top=Side(style='thin'), bottom=Side(style='thin')
)
CENTER_ALIGN = Alignment(horizontal="center", vertical="center", wrap_text=True)
HEADER_FILL = PatternFill(start_color="4472C4", end_color="4472C4", fill_type="solid")
HEADER_FONT = Font(bold=True, color="FFFFFF")
```

### Column width chuẩn

| Loại cột | Width | Align |
|---|---|---|
| STT | 4-7 | Center |
| Tên / nội dung | 28-48 | Left, wrap |
| Trạng thái | 14-17 | Center |
| Ngày | 12-14 | Center |
| Phần trăm | 10-12 | Center |
| Ghi chú | 25-32 | Left, wrap |

---

## Zero Error Policy

Cấm tuyệt đối khi mở file:
- `#REF!` — cell trỏ vùng không tồn tại
- `#DIV/0!` — chia cho 0 chưa catch `IF`
- `#VALUE!` — lộn data type

---

## Dependencies

```
pip install openpyxl pandas
```

<!--  -->
