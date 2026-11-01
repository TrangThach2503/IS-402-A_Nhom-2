# Kỹ năng PDF — Xử lý cục bộ

Mọi xử lý PDF chạy local, **không upload lên cloud** (bảo mật dữ liệu).

---

## Hai loại PDF

| Loại | Nhận dạng | Cách xử lý |
|---|---|---|
| **PDF digital** (text-based) | Có thể select text | Dùng script: pypdf, pdfplumber |
| **PDF scan** (image-based) | Không select text được | `/office-skills` chọn workflow OCR/AI Vision cục bộ nếu có công cụ phù hợp, hoặc tái tạo cấu trúc từ ảnh sau khi người dùng xác nhận phạm vi |

---

## Decision flow

1. Thử trích text 1-3 trang đại diện bằng `pdfplumber`.
2. Nếu text rỗng hoặc gần rỗng, phân loại là PDF scan/image-based.
3. Với PDF scan, hỏi người dùng phạm vi trang và mức fidelity mong muốn trước khi OCR/tái tạo.
4. Nếu không có OCR/vision local phù hợp, không giả vờ extract thành công; báo giới hạn và đề xuất tái tạo thủ công từ ảnh/trang đã chọn.
5. Với PDF dài hoặc nhạy cảm, xử lý theo page range đã xác nhận thay vì toàn bộ file.

---

## Thao tác PDF digital

| Thao tác | Lệnh |
|---|---|
| Ghép | `python scripts/convert/process_pdf.py merge --input f1.pdf f2.pdf --output out.pdf` |
| Tách | `python scripts/convert/process_pdf.py split --input in.pdf --pages 1-3,5 --output out.pdf` |
| Trích text | `python scripts/convert/process_pdf.py extract-text --input in.pdf --output text.txt` |
| Trích bảng | `python scripts/convert/process_pdf.py extract-tables --input in.pdf --output tables.csv` |
| Xoay trang | Dùng `pypdf` trong script riêng khi cần |
| Đặt mật khẩu | Dùng `pypdf` encrypt trong script riêng khi cần |

---

## Chuyển đổi PDF → DOCX

| Loại PDF | Phương pháp |
|---|---|
| PDF digital | Script `convert/convert_pdf_to_docx.py` (dùng `pdf2docx`) |
| PDF scan | Phân tích AI Vision → tái tạo cả cấu trúc + màu sắc → DOCX |

Khi tái tạo từ PDF scan, cần phân tích đầy đủ:
- **Cấu trúc**: heading hierarchy, table layout, bullet indentation
- **Màu sắc**: header colors, fill colors, text colors
- Tham khảo `standards/structure/` + `standards/color/` để map vào tiêu chuẩn gần nhất

---

## Dependencies

```
pip install pypdf pdfplumber pdf2docx
```

