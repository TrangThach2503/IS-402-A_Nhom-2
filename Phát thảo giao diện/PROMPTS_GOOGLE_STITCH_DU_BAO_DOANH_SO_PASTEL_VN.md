# HỆ THỐNG HỖ TRỢ RA QUYẾT ĐỊNH DỰ BÁO DOANH SỐ & KẾ HOẠCH BÁN HÀNG (SALESDSS)
# BỘ PROMPT GOOGLE STITCH CHUẨN VÀNG DSS (GOLDEN SUITE — 5 MÀN HÌNH HOÀN CHỈNH)

> **Môn học:** IS402 — Hệ Hỗ Trợ Ra Quyết Định (Decision Support Systems - DSS) | **Đại học Duy Tân**  
> **Giảng viên hướng dẫn:** ThS. Nguyễn Đăng Quang Huy  
> **Nhóm thực hiện:** Nhóm 2 — Lớp IS402 A (5 thành viên)  
> **Công cụ sinh giao diện:** Google Stitch (`https://stitch.withgoogle.com/`)  
> **Ngôn ngữ giao diện:** **100% Tiếng Việt** có dấu chuẩn mực, thuật ngữ quản trị kinh doanh & tài chính chuyên nghiệp  
> **Tone màu chủ đạo:** **Executive Pastel** (Màu phấn dịu mắt, tương phản cao đạt chuẩn WCAG AAA, chống mỏi mắt cho nhà quản lý)  
> **Triết lý thiết kế:** **Golden DSS Suite** — Gồm 1 Màn hình Đăng nhập Phân quyền Vai trò Nhanh (1-Click Demo Switcher) + 4 Màn hình Lõi bám sát **4 giai đoạn ra quyết định của Herbert Simon**: *Thông minh hóa (Intelligence)* → *Thiết kế (Design)* → *Lựa chọn (Choice)* → *Thực thi (Implementation)*.

---

## MỤC LỤC BỘ PROMPT CHUẨN VÀNG (5 MÀN HÌNH)

- [I. HỆ THỐNG THIẾT KẾ PASTEL & QUY TẮC CHỐNG TRÀN GOOGLE STITCH](#i-hệ-thống-thiết-kế-pastel--quy-tắc-chống-tràn-google-stitch)
- [II. MA TRẬN ÁNH XẠ 5 MÀN HÌNH THEO MÔ HÌNH HERBERT SIMON](#ii-ma-trận-ánh-xạ-5-màn-hình-theo-mô-hình-herbert-simon)
- [III. BỘ PROMPT CHI TIẾT DÁN TRỰC TIẾP VÀO GOOGLE STITCH](#iii-bộ-prompt-chi-tiết-dán-trực-tiếp-vào-google-stitch)
  - [PROMPT 0: Màn hình Đăng nhập Phân quyền Vai trò Nhanh (Role-Selector Login)](https://stitch.withgoogle.com/)
  - [PROMPT 1: Màn hình Giám sát Sai lệch & Cảnh báo Đỏ (Executive Intelligence Dashboard)](https://stitch.withgoogle.com/)
  - [PROMPT 2: Xưởng Dự báo Chuỗi thời gian AI & Nạp Dữ liệu Excel (AI Prophet Forecasting Hub)](https://stitch.withgoogle.com/)
  - [PROMPT 3: Hộp cát Mô phỏng What-If & Ma trận Lựa chọn Kịch bản (Interactive What-If Sandbox)](https://stitch.withgoogle.com/)
  - [PROMPT 4: Ma trận Phân bổ Chỉ tiêu Quota & Phê duyệt Kế hoạch (Target Quota Allocation Engine)](https://stitch.withgoogle.com/)
- [IV. PHÂN CÔNG THỰC HIỆN DÀNH CHO NHÓM 5 THÀNH VIÊN](#iv-phân-công-thực-hiện-dành-cho-nhóm-5-thành-viên)

---

# I. HỆ THỐNG THIẾT KẾ PASTEL & QUY TẮC CHỐNG TRÀN GOOGLE STITCH

Hệ thống sử dụng bảng màu **Executive Pastel**. Tông màu pastel mang lại sự thanh lịch, sang trọng và giảm áp lực thị giác khi phân tích khối lượng số liệu lớn, đồng thời đảm bảo độ tương phản chữ đạt chuẩn tiếp cận WCAG AAA.

### 1. Bảng màu Pastel chuẩn tỷ lệ 60–25–10–5
* **60% Nền Canvas Chủ đạo:** Soft Powder Canvas (`#F8FAFC`). Nền xám sữa siêu dịu, không chói lóa.
* **25% Bề mặt Thẻ Card & Khung khối:** Pure White (`#FFFFFF`) kết hợp viền mờ Pastel Slate (`#E2E8F0`, 1.5px) và đổ bóng nhẹ môi trường `box-shadow: 0 4px 16px -2px rgba(148, 163, 184, 0.12)`.
* **10% Màu Thương hiệu & Nút Hành động Chính:** Soft Indigo Navy (`#3B82F6` kết hợp `#1E40AF`).
* **5% Màu Nhấn Ngữ nghĩa DSS:**
  * **Xanh Baby Pastel (Baby Sky `#7DD3FC` / `#0284C7`):** Dải xu hướng dự báo AI và vùng tin cậy 95% Confidence Interval.
  * **Xanh Bạc Hà Pastel (Mint `#86EFAC` / `#16A34A`):** Doanh số thực tế, tỷ lệ hoàn thành vượt kế hoạch (+).
  * **Cam Đào Pastel (Peach `#FDBA74` / `#EA580C`):** Chỉ tiêu kế hoạch ban hành, kịch bản mục tiêu.
  * **Tím Lavender Pastel (Soft Lavender `#D8B4FE` / `#7C3AED`):** Thanh trượt kịch bản What-If và nhãn AI Insight.
  * **Hồng San Hô Pastel (Soft Coral `#FECDD3` / `#E11D48`):** Cảnh báo đỏ hụt doanh thu (-), chi nhánh có nguy cơ vỡ kế hoạch.

### 2. Quy tắc Chống Tràn Giao diện (Anti-Clipping) cho Google Stitch
Để code sinh bởi Google Stitch hiển thị hoàn hảo trên mọi kích thước màn hình máy tính:
1. Luôn sử dụng bố cục chuẩn Flexbox/Grid: `w-full min-h-screen bg-[#F8FAFC] flex`.
2. Thanh Sidebar bên trái cố định chiều rộng: `w-64 flex-shrink-0 bg-white border-r border-[#E2E8F0]`.
3. Vùng nội dung chính chiếm phần còn lại và tự cuộn khi dài: `flex-1 flex flex-col min-w-0 overflow-y-auto`.
4. Không bao giờ gán chiều cao cố định dạng pixel cho bảng biểu hay card biểu đồ; luôn dùng `min-h-[...]` hoặc `h-auto`.

---

# II. MA TRẬN ÁNH XẠ 5 MÀN HÌNH THEO MÔ HÌNH HERBERT SIMON

| STT | Mã Màn hình | Giai đoạn Ra Quyết định (Herbert Simon) | Trọng tâm Nghiệp vụ DSS | Quyền Hạn Tương Ứng (RBAC) |
|:---:|---|:---:|---|---|
| **0** | **GD-00: Đăng Nhập Phân Quyền Vai Trò Nhanh (Role Selector)** | **Cổng Xác thực Điều hành** | Chuyển đổi vai trò 1-Click phục vụ demo và bảo mật dữ liệu doanh nghiệp. | Cấp quyền tự động theo vai trò (Director / Analyst) |
| **1** | **GD-01: Bảng Điều Khiển Giám Sát Sai Lệch (Intelligence Dashboard)** | **Giai đoạn 1: Thông minh hóa (Intelligence)** | Phát hiện chênh lệch Kế hoạch vs Thực tế qua biểu đồ Thác nước (Waterfall Variance), kích hoạt cảnh báo đỏ. | Giám đốc Kinh doanh & Chuyên viên Kế hoạch |
| **2** | **GD-02: Xưởng Dự Báo AI & Nạp Dữ Liệu Excel (AI Forecasting Hub)** | **Giai đoạn 2: Thiết kế phương án (Design)** | Nạp dữ liệu Excel/CSV vào kho OLAP, chạy mô hình AI Prophet, đánh giá sai số MAPE/RMSE và vẽ dải tin cậy 95%. | Chuyên viên Kế hoạch (Toàn quyền) / Giám đốc (Xem) |
| **3** | **GD-03: Hộp Cát Mô Phỏng What-If & Ma Trận Kịch Bản (What-If Sandbox)** | **Giai đoạn 2 & 3: Thiết kế & Lựa chọn (Design & Choice)** | Kéo thanh trượt Giá ($\Delta P\%$) và Marketing ($\Delta M\%$), chạy thuật toán co giãn $E_d$, hộp giải thích AI Insight, so sánh 3 kịch bản. | Giám đốc Kinh doanh (Duyệt kịch bản tối ưu) |
| **4** | **GD-04: Ma Trận Phân Bổ Quota & Ban Hành (Quota Allocation Engine)** | **Giai đoạn 4: Thực thi & Đánh giá (Implementation)** | Tự động phân bổ chỉ tiêu Quota theo $W_i$ và $G_i$, bảo toàn 100% ngân sách, ký số điện tử và xuất nghị quyết ban hành. | Giám đốc Kinh doanh (Ký số & Ban hành) |

---

# III. BỘ PROMPT CHI TIẾT DÁN TRỰC TIẾP VÀO GOOGLE STITCH

---

## PROMPT 0: Màn hình Đăng nhập Phân quyền Vai trò Nhanh (Role-Selector Login)

> **Mã màn hình:** `GD-00_DANG_NHAP_PHAN_QUYEN_VAI_TRO_NHANH_ROLE_SELECTOR`  
> **Mục tiêu:** Cổng xác thực điều hành nội bộ doanh nghiệp. Tích hợp 2 nút chọn vai trò 1-Click giúp nhóm chuyển đổi vai trò tức thì khi thuyết trình trước hội đồng.

```markdown
Thiết kế giao diện Màn Hình Đăng Nhập Phân Quyền Vai Trò Nhanh (Role-Selector Single Sign-On Login) cho Hệ thống Hỗ trợ Ra Quyết định Chuỗi Cửa Hàng Tiện Lợi (SalesDSS). 
Giao diện bằng 100% Tiếng Việt, phong cách thiết kế hiện đại Modern Executive Pastel, nền sáng dịu mắt #F8FAFC, chuẩn responsive desktop 1440px.

1. BỐ CỤC CHUNG (SPLIT-SCREEN LAYOUT):
- Màn hình toàn trang (w-full min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6).
- Hộp chứa trung tâm bo tròn lớn (max-w-4xl w-full bg-white rounded-3xl shadow-xl border border-[#E2E8F0] overflow-hidden flex flex-col md:flex-row):

2. CỘT TRÁI: BẢN SẮC THƯƠNG HIỆU & GIỚI THIỆU DSS (w-full md:w-5/12 bg-gradient-to-br from-[#EFF6FF] via-[#F3E8FF] to-[#F8FAFC] p-8 flex flex-col justify-between border-r border-[#E2E8F0]):
- Phần trên:
  + Logo SalesDSS màu tím pastel kết hợp xanh navy đậm, bên dưới có nhãn con nhộng màu tím hoa cà pastel: "IS402 - HỆ HỖ TRỢ RA QUYẾT ĐỊNH".
  + Tiêu đề đồ án: "HỆ THỐNG DỰ BÁO DOANH SỐ & KẾ HOẠCH BÁN HÀNG"
  + Tên đơn vị: "Trường Đại học Duy Tân • Khoa Công nghệ Thông tin".
- Phần giữa:
  + 3 Điểm nhấn công nghệ của hệ thống (kèm icon pastel mềm mại):
    * 🎯 Mô hình Herbert Simon 4 Giai đoạn chuẩn mực.
    * 📈 Dự báo Chuỗi thời gian Facebook Prophet (MAPE 4.62%).
    * 🎛️ Hộp cát Mô phỏng What-If tương tác độ co giãn vi mô.
- Phần dưới:
  + Nhãn phiên bản: "Phiên bản Đồ án v1.0 • Nhóm 2 - Lớp IS402 A • GVHD: ThS. Nguyễn Đăng Quang Huy".

3. CỘT PHẢI: FORM ĐĂNG NHẬP & LỐI TẮT BÁO CÁO HỘI ĐỒNG (w-full md:w-7/12 p-8 md:p-10 flex flex-col justify-center space-y-6):
- Tiêu đề khối:
  + "ĐĂNG NHẬP HỆ THỐNG ĐIỀU HÀNH"
  + Dòng phụ: "Vui lòng đăng nhập bằng tài khoản quản trị nội bộ hoặc chọn lối tắt vai trò để báo cáo đồ án."

- KHỐI LỐI TẮT BÁO CÁO HỘI ĐỒNG (QUICK DEMO SWITCHER - TÂM ĐIỂM CHẤM ĐIỂM):
  + Tiêu đề nhỏ: "🚀 LỐI TẮT CHUYỂN NHANH VAI TRÒ (DÀNH CHO BÁO CÁO DEMO):"
  + Nút 1 (Nền Xanh Biển Pastel Nhạt #EFF6FF, viền xanh #93C5FD, chữ xanh navy đậm, hiệu ứng hover phóng to nhẹ):
    * "👔 Đăng nhập với tư cách: GIÁM ĐỐC KINH DOANH (Sales Director)"
    * Dòng mô tả nhỏ: "Toàn quyền điều hành: Giám sát Sai lệch, Mô phỏng What-If, Phê duyệt & Ban hành Quota."
  + Nút 2 (Nền Tím Lavender Pastel Nhạt #FAF5FF, viền tím #D8B4FE, chữ tím đậm, hiệu ứng hover):
    * "📊 Đăng nhập với tư cách: CHUYÊN VIÊN KẾ HOẠCH (Planning Analyst)"
    * Dòng mô tả nhỏ: "Quyền kỹ thuật: Nạp tệp Excel dữ liệu, Huấn luyện mô hình AI Prophet, Lưu kịch bản đề xuất."

- Đường phân cách ngang có chữ "HOẶC NHẬP TÀI KHOẢN NỘI BỘ":
- Form đăng nhập truyền thống (tinh gọn):
  + Ô 1: "Tên đăng nhập / Email công vụ" (Placeholder: `director@salesdss.dtu.vn`).
  + Ô 2: "Mật khẩu" (Dạng password chấm tròn).
  + Hàng ghi nhớ: Checkbox "Duy trì phiên đăng nhập" và Dòng chữ mờ "Liên hệ IT để cấp lại quyền".
  + Nút bấm chính: Nút màu xanh Navy Pastel "ĐĂNG NHẬP VÀO HỆ THỐNG".

- Chân trang form:
  + Dòng chữ nhỏ màu xám nhạt: "🔒 Hệ thống bảo mật nội bộ chuẩn RBAC. Mọi phiên làm việc được ghi nhận vào Nhật ký Kiểm toán (Audit Log)."
```

---

## PROMPT 1: Màn hình Giám sát Sai lệch & Cảnh báo Đỏ (Executive Intelligence Dashboard)

> **Mã màn hình:** `GD-01_BANG_DIEU_KHIEN_GIAM_SAT_SAI_LECH_VA_CANH_BAO_INTELLIGENCE`  
> **Mục tiêu:** Giao diện điều hành cấp cao hỗ trợ phát hiện các bất thường kinh doanh và kích hoạt phản xạ ra quyết định.

```markdown
Thiết kế giao diện Bảng Điều Khiển Giám Sát Sai Lệch & Cảnh Báo Ra Quyết Định (Executive Intelligence Dashboard) cho Hệ thống Hỗ trợ Ra Quyết định Chuỗi Cửa Hàng Tiện Lợi (SalesDSS). 
Giao diện bằng 100% Tiếng Việt, phong cách thiết kế hiện đại Modern Executive Pastel, nền sáng dịu mắt #F8FAFC, chuẩn responsive desktop 1440px.

1. BỐ CỤC CHUNG (LAYOUT):
- Cột bên trái (Sidebar w-64 cố định):
  + Logo SalesDSS màu tím pastel kết hợp xanh navy, bên dưới có nhãn con nhộng "IS402 - HỆ HỖ TRỢ RA QUYẾT ĐỊNH".
  + Menu điều hướng 4 phân hệ chính:
    * 1. Giám sát Sai lệch (Đang kích hoạt - Nền Xanh biển Pastel nhạt #EFF6FF, chữ xanh navy đậm, có chấm xanh nổi bật).
    * 2. Xưởng Dự báo AI (AI Prophet).
    * 3. Hộp cát Mô phỏng What-If.
    * 4. Phân bổ Chỉ tiêu Quota.
  + Góc dưới Sidebar: Thông tin người dùng "Giám đốc Kinh doanh (Sales Director)" kèm ảnh đại diện tròn bo viền xanh mint và nút "Đổi vai trò / Đăng xuất".
- Vùng nội dung chính (flex-1 p-8 overflow-y-auto):
  + Thanh Header trên cùng:
    * Tiêu đề lớn: "BẢNG ĐIỀU KHIỂN GIÁM SÁT SAI LỆCH & CẢNH BÁO DOANH SỐ"
    * Phụ đề nhỏ: "Giai đoạn 1: Thông minh hóa (Intelligence Phase) — Phát hiện chênh lệch & nhận diện cơ hội kinh doanh"
    * Bên phải: Bộ lọc kỳ kế hoạch (Nút chọn Quý 4/2026, nút chọn Toàn chuỗi Đà Nẵng) và Nút bấm Pastel "Xuất Báo Cáo DSS (PDF/Excel)".

2. KHỐI 4 THẺ KPI CHỈ SỐ RA QUYẾT ĐỊNH (GRID 4 CỘT):
- Thẻ 1 (Nền trắng viền xanh mint pastel #DCFCE7): Tiêu đề "DOANH SỐ THỰC TẾ LŨY KẾ", giá trị "28.45 Tỷ VNĐ", so với kế hoạch "+1.85 Tỷ (+6.9%)", nhãn con nhộng xanh mint "VƯỢT CHỈ TIÊU".
- Thẻ 2 (Nền trắng viền cam đào pastel #FFEDD5): Tiêu đề "TỔNG CHỈ TIÊU KẾ HOẠCH GIAO", giá trị "26.60 Tỷ VNĐ", tỷ lệ đạt "106.9% Tiến độ", thanh tiến trình màu cam pastel lấp đầy 106.9%.
- Thẻ 3 (Nền trắng viền xanh baby pastel #E0F2FE): Tiêu đề "TỐC ĐỘ TĂNG TRƯỞNG YOY", giá trị "+14.2% So cùng kỳ", nhãn "Mở rộng 3 điểm bán mới".
- Thẻ 4 (Nền trắng viền hồng san hô pastel #FEE2E2): Tiêu đề "CHI NHÁNH CẢNH BÁO ĐỎ", giá trị "2 / 12 Cửa hàng", mô tả "Độ lệch âm > 10% so với kế hoạch", nhãn cảnh báo đỏ "CẦN CAN THIỆP".

3. KHỐI ĐỒ THỊ PHÂN TÍCH RA QUYẾT ĐỊNH (2 CỘT):
- Cột trái (Biểu đồ Đường kép & Vùng Recharts):
  + Tiêu đề: "QUỸ ĐẠO DOANH THU THỰC TẾ SO VỚI KẾ HOẠCH THEO THÁNG"
  + Đồ thị thể hiện 12 tháng: Đường màu Cam đào Pastel (Chỉ tiêu kế hoạch) chạy song song với Đường Xanh Bạc Hà Pastel (Doanh số thực tế). Các tháng vượt chỉ tiêu có vùng tô sáng xanh dịu.
- Cột phải (Biểu đồ Thác nước Bóc tách Sai lệch - Waterfall Variance Chart):
  + Tiêu đề: "BÓC TÁCH NGUYÊN NHÂN LỆCH KẾ HOẠCH (WATERFALL VARIANCE)"
  + Cột gốc Kế hoạch (26.6 Tỷ) -> Cột Tăng do Sản lượng (+1.4 Tỷ, xanh lá) -> Cột Giảm do Giảm giá (-0.3 Tỷ, đỏ hồng) -> Cột Tăng do Marketing (+1.0 Tỷ, xanh lá) -> Cột Giảm do Hết hàng cục bộ (-0.25 Tỷ, đỏ hồng) -> Cột Doanh số Thực tế (28.45 Tỷ, xanh navy).

4. KHỐI BẢNG CẢNH BÁO ĐỎ & HÀNH ĐỘNG CAN THIỆP DSS:
- Tiêu đề khối: "DANH SÁCH CHI NHÁNH CÓ NGUY CƠ VỠ KẾ HOẠCH (CẢNH BÁO ĐỎ)"
- Bảng hiển thị 2 chi nhánh cần hỗ trợ ra quyết định:
  + Dòng 1: Cửa hàng Cẩm Lệ | Doanh số: 1.62 Tỷ | Kế hoạch: 1.90 Tỷ | Độ lệch: -280 Triệu (-14.7%) | Nguyên nhân: Sức mua đồ uống giải khát giảm sâu do thời tiết mưa kéo dài | Cột Thao tác: Nút bấm màu tím pastel "Kích hoạt Hộp Cát What-If để cứu doanh số →".
  + Dòng 2: Cửa hàng Hòa Khánh | Doanh số: 1.75 Tỷ | Kế hoạch: 2.00 Tỷ | Độ lệch: -250 Triệu (-12.5%) | Nguyên nhân: Cạnh tranh mở mới của đối thủ trong bán kính 500m | Cột Thao tác: Nút bấm màu tím pastel "Kích hoạt Hộp Cát What-If để cứu doanh số →".
```

---

## PROMPT 2: Xưởng Dự báo Chuỗi thời gian AI & Nạp Dữ liệu Excel (AI Prophet Forecasting Hub)

> **Mã màn hình:** `GD-02_XUONG_DU_BAO_CHUOI_THOI_GIAN_AI_PROPHET_FORECASTING`  
> **Mục tiêu:** Áp dụng mô hình Facebook Prophet dự báo nhu cầu tương lai kèm dải tin cậy 95% và tích hợp Modal Popup Nạp Tệp Dữ Liệu Excel/CSV giải quyết mắt xích đầu vào.

```markdown
Thiết kế giao diện Xưởng Dự Báo Chuỗi Thời Gian Thông Minh (AI Prophet Forecasting Hub & Data Intake Modal) cho Hệ thống Hỗ trợ Ra Quyết định Chuỗi Cửa Hàng Tiện Lợi (SalesDSS).
Giao diện bằng 100% Tiếng Việt, phong cách thiết kế hiện đại Modern Executive Pastel, nền sáng dịu mắt #F8FAFC, chuẩn responsive desktop 1440px.

1. BỐ CỤC CHUNG (LAYOUT):
- Sidebar chuẩn 4 phân hệ (mục "2. Xưởng Dự báo AI" đang kích hoạt nền Tím Lavender Pastel nhạt #F3E8FF, chữ tím đậm, chấm tròn tím nổi bật).
- Vùng nội dung chính (p-8 overflow-y-auto):
  + Header trang:
    * Tiêu đề lớn: "XƯỞNG DỰ BÁO DOANH SỐ CHUỖI THỜI GIAN (AI PROPHET HUB)"
    * Phụ đề nhỏ: "Giai đoạn 2: Thiết kế phương án (Design Phase) — Mô hình hóa xu hướng thị trường & Ước lượng nhu cầu khách quan"
    * Nhóm nút bên phải:
      - Nút 1: Nút viền Pastel xanh mint "📂 Nạp Tệp Dữ Liệu Bán Hàng (Excel/CSV)" (Khi click sẽ mở Modal Popup Nạp Dữ Liệu).
      - Nút 2: Nút lớn màu tím gradient pastel "Khởi chạy Dự báo AI Ngay".

2. MODAL POPUP: NẠP DỮ LIỆU BÁN HÀNG VÀO KHO DỮ LIỆU OLAP (DATA INGESTION MODAL):
- Modal xuất hiện ở giữa màn hình khi bấm nút Nạp Tệp:
  + Tiêu đề modal: "NẠP DỮ LIỆU DOANH SỐ MỚI VÀO KHO DỮ LIỆU ĐA CHIỀU (OLAP INTAKE)"
  + Khung kéo thả tệp (Drag & Drop Zone bo viền nét đứt màu xanh pastel #93C5FD bg-[#F0F9FF] p-6 text-center):
    * Icon Excel màu xanh lá kèm dòng chữ: "Kéo thả tệp doanh số (.xlsx, .csv) vào đây hoặc bấm để chọn tệp từ máy tính".
    * Hỗ trợ cấu trúc cột: `NgayGiaoDich`, `MaChiNhanh`, `MaSanPham`, `SoLuongBan`, `DonGia`, `ThanhTien`.
  + Tiến trình đồng bộ: Thanh tiến trình xanh mint hiển thị: "100% - Đã xác thực 12,450 dòng giao dịch không có lỗi dữ liệu".
  + Nút hành động: "Đóng cửa sổ" và "Lưu & Cập nhật Mô hình AI".

3. CẤU TRÚC 2 CỘT CHÍNH TRÊN TRANG:
- Cột bên trái (Khung điều khiển tham số mô hình w-80 bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm):
  + Tiêu đề: "THAM SỐ MÔ HÌNH HỌC MÁY"
  + Chọn Ngành hàng: Dropdown chọn "Thực phẩm tiện lợi & Nước giải khát".
  + Chọn Phạm vi: Dropdown chọn "Toàn bộ chuỗi (12 Điểm bán)".
  + Tầm dự báo (Forecast Horizon): Radio buttons chọn [30 Ngày] - [60 Ngày] - [90 Ngày] (Đang chọn 90 Ngày).
  + Bật/Tắt Thành phần Mùa vụ (Seasonality Components):
    * Checkbox có tick: "Mùa vụ theo Tuần (Weekly Pattern - P=7 ngày)".
    * Checkbox có tick: "Mùa vụ theo Năm (Yearly Pattern - P=365 ngày)".
  + Tích hợp Sự kiện Đột biến (Holiday Regressors):
    * Tag pastel hiển thị các sự kiện đã thêm: "Tết Nguyên Đán 2027", "Black Friday", "Lễ 30/4 - 1/5".
  + Dải tin cậy mong muốn: Thanh trượt chọn mức 95% (95% Confidence Interval).

- Cột bên phải (Vùng hiển thị đồ thị & Đánh giá chất lượng mô hình flex-1 space-y-6):
  + Hàng 3 thẻ Thẩm định Sai số Thuật toán (Model Accuracy Metrics):
    * Thẻ 1 (Viền xanh bạc hà): Chỉ số MAPE (Mean Absolute Percentage Error) = "4.62%", nhãn con nhộng "XẾP LOẠI: RẤT CHÍNH XÁC (< 10%)".
    * Thẻ 2 (Viền xanh baby): Chỉ số RMSE = "14.28 Triệu VNĐ", giải thích "Độ lệch chuẩn bình quân trên chuỗi ngày".
    * Thẻ 3 (Viền tím pastel): Thời gian huấn luyện mô hình = "0.38 giây", giải thích "Thuật toán tối ưu hóa L-BFGS hoàn tất".

  + Khung Biểu đồ Quỹ đạo Dự báo Tương tác (Interactive Prophet Trajectory Chart - h-[450px] bg-white p-6 rounded-2xl border border-[#E2E8F0]):
    * Header biểu đồ có chú giải màu sắc rõ ràng:
      - Nét đứt màu Xám: "Dữ liệu lịch sử 12 tháng qua".
      - Đường liền nét Xanh Navy Đậm: "Đường Dự báo Trung tâm (yhat)".
      - Dải màu Xanh Baby Pastel trong suốt (opacity 0.25): "Dải Tin Cậy 95% (yhat_lower đến yhat_upper)".
      - Đường màu Cam Đào Pastel: "Mục tiêu Kế hoạch hiện tại".
    * Trục hoành là trục thời gian kéo dài từ quá khứ đến 90 ngày tương lai.
    * Khi rê chuột vào điểm dự báo, hiển thị Tooltip Pastel: "Ngày 15/12/2026: Dự báo 320 Triệu đ (Khoảng tin cậy: 295 Tr - 345 Tr đ)".

  + Khung Bảng Trích xuất Kết quả Dự báo Tổng hợp 3 Tháng tới (bg-white rounded-2xl border border-[#E2E8F0] p-6):
    * Cột: Tháng dự báo | Dự báo Thận trọng (Cận dưới) | Dự báo Kỳ vọng (Trung tâm) | Dự báo Lạc quan (Cận trên) | Tăng trưởng so với cùng kỳ | Thao tác.
    * Tháng 11/2026: 2.85 Tỷ | 3.10 Tỷ | 3.35 Tỷ | +8.5% | Nút "Đưa vào What-If".
    * Tháng 12/2026: 3.40 Tỷ | 3.75 Tỷ | 4.10 Tỷ | +14.2% | Nút "Đưa vào What-If".
    * Tháng 01/2027: 3.90 Tỷ | 4.30 Tỷ | 4.70 Tỷ | +18.0% | Nút "Đưa vào What-If".
```

---

## PROMPT 3: Hộp cát Mô phỏng What-If & Ma trận Lựa chọn Kịch bản (Interactive What-If Sandbox)

> **Mã màn hình:** `GD-03_HOP_CAT_MO_PHONG_WHAT_IF_VA_MA_TRAN_SO_SANH_KICH_BAN`  
> **Mục tiêu:** Màn hình trọng tâm cốt lõi nhất của DSS. Giúp người lãnh đạo thử nghiệm quyết định qua thanh trượt và có Hộp Khuyến Nghị Thông Minh của AI (AI Decision Explanation Box).

```markdown
Thiết kế giao diện Hộp Cát Mô Phỏng Kịch Bản What-If & Ma Trận Lựa Chọn Kịch Bản (Interactive What-If Sandbox & Decision Choice) cho Hệ thống Hỗ trợ Ra Quyết định Chuỗi Cửa Hàng Tiện Lợi (SalesDSS).
Giao diện bằng 100% Tiếng Việt, phong cách thiết kế hiện đại Modern Executive Pastel, nền sáng dịu mắt #F8FAFC, chuẩn responsive desktop 1440px.

1. BỐ CỤC CHUNG (LAYOUT):
- Sidebar chuẩn 4 phân hệ (mục "3. Hộp cát Mô phỏng What-If" đang kích hoạt nền Tím Lavender Pastel nhạt #F3E8FF, chữ tím đậm).
- Vùng nội dung chính (p-8 overflow-y-auto):
  + Header trang:
    * Tiêu đề lớn: "HỘP CÁT MÔ PHỎNG WHAT-IF & MA TRẬN LỰA CHỌN KỊCH BẢN"
    * Phụ đề nhỏ: "Giai đoạn 2 & 3: Thiết kế & Lựa chọn (Design & Choice Phase) — Tương tác kéo thanh trượt để lượng hóa phản ứng thị trường & Phê duyệt phương án tối ưu"
    * Góc phải: Nút bấm viền pastel "Khôi phục Mặc định" và Nút bấm màu xanh mint pastel "Lưu Kịch Bản Mới".

2. CẤU TRÚC 2 CỘT TƯƠNG TÁC THỜI GIAN THỰC (REAL-TIME REACTIVE LAYOUT):
- Cột bên trái: "BẢNG ĐIỀU KHIỂN THANH TRƯỢT THAM SỐ WHAT-IF" (w-[420px] bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm space-y-6):
  + Khối Mốc Doanh thu Cơ sở (Baseline Reference):
    * Nhãn: "Kỳ kế hoạch: Tháng 11/2026 | Nhóm hàng: Thực phẩm & Nước uống"
    * Thẻ xám pastel: "Sản lượng cơ sở Q_base = 50,000 sp | Giá cơ sở P_base = 25,000 đ | Doanh thu gốc R_base = 1.250 Tỷ đ".
  
  + Thanh trượt 1: ĐIỀU CHỈNH GIÁ BÁN NIÊM YẾT (ΔP%)
    * Dải giá trị từ -20% đến +20%. Con trượt đang ở mức: "+3.0%".
    * Hiển thị giá bán mới tương ứng: "25,750 đ / sản phẩm (+750 đ)".
    * Chú thích vi mô hiển thị mờ bên dưới: "Hệ số co giãn cầu Ed = -1.20 (Khi tăng giá, sản lượng cầu giảm tương ứng)".

  + Thanh trượt 2: ĐIỀU CHỈNH NGÂN SÁCH MARKETING (ΔM%)
    * Dải giá trị từ -50% đến +100%. Con trượt đang ở mức: "+30.0%".
    * Hiển thị ngân sách marketing mới: "65 Triệu đ (Tăng thêm 15 Triệu đ)".
    * Chú thích vi mô hiển thị mờ bên dưới: "Hệ số phản ứng Marketing β_mkt = 0.35 qua hàm ln(1 + ΔM%) chống bão hòa".

  + Công tắc Switch Toggles Kịch bản Môi trường:
    * Toggle 1 (BẬT): "Chiến dịch Mùa Tựu Trường / Ngày Hội Mua Sắm (Dự kiến tăng thêm +5% lượng khách vãng lai)".
    * Toggle 2 (TẮT): "Áp lực Đối thủ Cạnh tranh Giảm giá Sốc trong Bán kính 1km".

  + Hộp ghi chú Công thức Kinh tế Vi mô:
    * Khung màu tím nhạt #FAF5FF viền #E9D5FF bo tròn: "Công thức DSS: Q_new = Q_base × (1 + Ed × ΔP%) × (1 + β_mkt × ln(1 + ΔM%))".

- Cột bên phải: "KẾT QUẢ MÔ PHỎNG TỨC THÌ & MA TRẬN LỰA CHỌN KỊCH BẢN" (flex-1 space-y-6):
  + Hàng Thẻ KPI Phản hồi Thời gian thực (Realtime Metric Cards):
    * Thẻ Doanh Thu Kỳ Vọng Mới (R_new): "1,366,758,500 đ", so với mốc cơ sở: "+116,758,500 đ (+9.34%)", nhãn con nhộng xanh mint "TỐI ƯU HÓA THÀNH CÔNG".
    * Thẻ Sản Lượng Bán Mới (Q_new): "53,078 sản phẩm", so với mốc cơ sở: "+3,078 sản phẩm (+6.16%)".
    * Thẻ Lợi Nhuận Gộp Ước Tính: "410.0 Triệu đ", Tăng ròng sau khi trừ chi phí Marketing: "+86.7 Triệu đ".

  + KHỐI CHÚ GIẢI KHUYẾN NGHỊ THÔNG MINH CỦA AI (AI DECISION EXPLANATION BOX - ĐIỂM NHẤN DSS):
    * Khung bo viền tím lavender đậm #C084FC bg-[#FAF5FF] p-5 rounded-2xl border-2 flex items-start space-x-4:
    * Icon bóng đèn AI tỏa sáng màu vàng pastel.
    * Nội dung giải thích: "💡 KHUYẾN NGHỊ TỪ TRỢ LÝ DSS: Kịch bản tăng giá +3% kết hợp tăng Marketing +30% mang lại lợi nhuận biên ròng cao nhất (+86.7 Tr đ). Tuy nhiên, tại Chi nhánh Ngũ Hành Sơn (đối tượng sinh viên), sản lượng có thể giảm 4.2% do nhạy cảm giá. Đề xuất: Ban Giám đốc phê duyệt kịch bản này nhưng áp dụng voucher giảm 5% riêng cho nhóm sinh viên có thẻ thành viên."

  + Biểu đồ Cột So sánh Doanh thu (Recharts Bar Chart h-60 bg-white p-6 rounded-2xl border border-[#E2E8F0]):
    * Đặt cạnh nhau 3 cột: Cột Xám Pastel (Kế hoạch cơ sở: 1.250 Tỷ) - Cột Xanh Baby Pastel (Dự báo AI tự nhiên: 1.310 Tỷ) - Cột Tím Lavender Đậm (Kịch bản What-If sau điều chỉnh: 1.367 Tỷ).

  + MA TRẬN SO SÁNH 3 KỊCH BẢN ĐỂ RA QUYẾT ĐỊNH (DECISION CHOICE MATRIX):
    * Tiêu đề: "SO SÁNH 3 PHƯƠNG ÁN HÀNH ĐỘNG CHIẾN LƯỢC"
    * Bảng gồm 5 cột: Chỉ tiêu so sánh | Kịch bản 1: Cơ sở (Không đổi) | Kịch bản 2: Giảm giá kích cầu | Kịch bản 3: Tối ưu Song hành (Đề xuất) | Đánh giá & Rủi ro.
    * Dòng Giá bán: 25,000 đ | 23,750 đ (-5%) | 25,750 đ (+3%) | Tăng nhẹ giá để bù chi phí.
    * Dòng Ngân sách MKT: 50 Tr đ | 62.5 Tr đ (+25%) | 65.0 Tr đ (+30%) | Tập trung truyền thông số.
    * Dòng Sản lượng: 50,000 sp | 56,974 sp | 53,078 sp | Sản lượng tăng ổn định.
    * Dòng Doanh thu: 1.250 Tỷ đ | 1.353 Tỷ đ | 1.367 Tỷ đ | Kịch bản 3 Doanh thu cao nhất.
    * Dòng Lợi nhuận ròng: 350 Tr đ | 385 Tr đ | 410 Tr đ | Kịch bản 3 sinh lời tốt nhất.
    * Hàng cuối cùng có Nút Radio chọn: Kịch bản 3 có nhãn sáng chói "AI KHUYẾN NGHỊ LỰA CHỌN".

3. THANH HÀNH ĐỘNG CUỐI TRANG:
- Nút bấm lớn màu xanh navy (Soft Indigo Navy) toàn chiều rộng: "PHÊ DUYỆT KỊCH BẢN TỐI ƯU NÀY & CHUYỂN SANG PHÂN BỔ CHỈ TIÊU QUOTA →".
```

---

## PROMPT 4: Ma trận Phân bổ Chỉ tiêu Quota & Phê duyệt Kế hoạch (Target Quota Allocation Engine)

> **Mã màn hình:** `GD-04_MA_TRAN_PHAN_BO_CHI_TIEU_QUOTA_VA_BAN_HANH_KE_HOACH`  
> **Mục tiêu:** Giai đoạn Thực thi (Implementation Phase). Tự động phân bổ chỉ tiêu Quota, khử số dư lẻ bảo toàn 100% ngân sách và xuất nghị quyết ban hành.

```markdown
Thiết kế giao diện Ma Trận Phân Bổ Chỉ Tiêu Doanh Số Quota & Phê Duyệt Kế Hoạch (Target Quota Allocation & Execution Engine) cho Hệ thống Hỗ trợ Ra Quyết định Chuỗi Cửa Hàng Tiện Lợi (SalesDSS).
Giao diện bằng 100% Tiếng Việt, phong cách thiết kế hiện đại Modern Executive Pastel, nền sáng dịu mắt #F8FAFC, chuẩn responsive desktop 1440px.

1. BỐ CỤC CHUNG (LAYOUT):
- Sidebar chuẩn 4 phân hệ (mục "4. Phân bổ Chỉ tiêu Quota" đang kích hoạt nền Tím Lavender Pastel nhạt #F3E8FF, chữ tím đậm).
- Vùng nội dung chính (p-8 overflow-y-auto):
  + Header trang:
    * Tiêu đề lớn: "MA TRẬN PHÂN BỔ CHỈ TIÊU DOANH SỐ & PHÊ DUYỆT KẾ HOẠCH"
    * Phụ đề nhỏ: "Giai đoạn 4: Thực thi & Đánh giá (Implementation Phase) — Tự động phân bổ chỉ tiêu Quota theo trọng số lịch sử (Wi) & Tiềm năng vùng (Gi), bảo toàn 100% ngân sách tài chính"

2. KHỐI CẤU HÌNH TỔNG CHỈ TIÊU ĐIỀU HÀNH (bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm mb-6):
- Dòng nhập liệu trên cùng (Flexbox):
  + Khung nhập số tiền: "TỔNG CHỈ TIÊU KẾ HOẠCH TOÀN CHUỖI (T_total)" với giá trị định dạng tiền tệ: "3,000,000,000 VNĐ" (3 Tỷ VNĐ).
  + Chọn Kỳ Kế Hoạch: Dropdown chọn "Quý 1 / Năm 2027 (01/01/2027 - 31/03/2027)".
  + Phương pháp phân bổ: Badge màu xanh mint "KẾT HỢP ĐA TIÊU CHÍ (LỊCH SỬ 12 THÁNG + TIỀM NĂNG VÙNG)".
  + Nút bấm màu tím pastel "Tự Động Tính Toán & Phân Bổ Lại".

3. MA TRẬN BẢNG TÍNH PHÂN BỔ CHỈ TIÊU QUOTA CHI TIẾT (bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden shadow-sm):
- Header bảng: Nền xám nhạt Pastel (#D9D9D9), chữ in hoa đậm màu đen, căn giữa.
- Các cột hiển thị chuẩn nghiệp vụ DSS:
  + Cột 1: Mã Đơn Vị (Store ID).
  + Cột 2: Tên Chi Nhánh Cửa Hàng (Kèm nhãn phân loại: Đầu tàu / Ổn định / Tiềm năng du lịch).
  + Cột 3: Doanh số Thực tế 12 Tháng qua (VND).
  + Cột 4: Trọng số Lịch sử Wi (%) = Doanh số chi nhánh / Tổng doanh số chuỗi.
  + Cột 5: Hệ số Tiềm năng Tăng trưởng Vùng Gi (Ô nhập dạng số mềm mại, cho phép người quản lý tinh chỉnh trực tiếp: 1.10, 1.00, 1.25...).
  + Cột 6: Tích số Ki = Wi × Gi.
  + Cột 7: Tỷ lệ Phân bổ Chuẩn hóa (Ki / Σ Kk %).
  + Cột 8: Chỉ tiêu Giao Quý tới (Target_i - VND) (Đã làm tròn đến hàng nghìn đồng).
  + Cột 9: Tốc độ Tăng trưởng so với cùng kỳ (%).
- Dữ liệu mẫu 3 chi nhánh tiêu biểu:
  + Dòng 1: ST-01 | Cửa hàng 1: Quận Hải Châu (Đầu tàu) | 12,000,000,000 đ | 50.00% | 1.10 | 0.550 | 50.00% | 1,500,000,000 đ | +25.0%
  + Dòng 2: ST-02 | Cửa hàng 2: Quận Thanh Khê (Ổn định) | 7,200,000,000 đ | 30.00% | 1.00 | 0.300 | 27.27% | 818,182,000 đ | +13.6%
  + Dòng 3: ST-03 | Cửa hàng 3: Ngũ Hành Sơn (Du lịch cao) | 4,800,000,000 đ | 20.00% | 1.25 | 0.250 | 22.73% | 681,818,000 đ | +42.0%
- DÒNG TỔNG CỘNG KIỂM TRA BẢO TOÀN (CONSERVATION CHECK ROW - Nền xanh bạc hà nhạt #DCFCE7):
  + TỔNG CỘNG TOÀN CHUỖI | 24,000,000,000 đ | 100.00% | - | 1.100 | 100.00% | 3,000,000,000 đ | Khớp chính xác 100.00% (Sai lệch: 0 đ).

4. KHỐI TRÌNH DUYỆT & BAN HÀNH QUYẾT ĐỊNH (bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm flex items-center justify-between):
- Cột bên trái:
  + Dòng trạng thái: Tag màu vàng cam pastel "KẾ HOẠCH ĐANG Ở TRẠNG THÁI DỰ THẢO (DRAFT v1.2)".
  + Người tạo: "Thạch Hoài Trang (Nhóm trưởng / Chuyên viên Kế hoạch)".
  + Chữ ký số điện tử của Giám đốc Kinh doanh: Hộp ký tên hiển thị nhãn "ĐÃ XÁC THỰC MÃ TOKEN DSS-2026-Q1".
- Cột bên phải (Nhóm nút bấm hành động):
  + Nút 1: Viền pastel "Xuất Tệp Excel Phân Bổ (XLSX)".
  + Nút 2: Viền pastel xanh baby "Xuất Nghị Quyết Kế Hoạch DSS (PDF)".
  + Nút 3: Nút lớn màu xanh Navy Pastel "PHÊ DUYỆT & BAN HÀNH CHỈ TIÊU CHÍNH THỨC". Khi bấm nút này, hệ thống đổi trạng thái sang "ĐÃ BAN HÀNH (OFFICIAL)" và tự động gửi thông báo chỉ tiêu xuống ứng dụng quản lý của các Cửa hàng trưởng.
```

---

# IV. PHÂN CÔNG THỰC HIỆN DÀNH CHO NHÓM 5 THÀNH VIÊN

Bộ 5 màn hình chuẩn DSS này phân chia công việc cực kỳ đồng đều, không ai bị quá tải và ai cũng có sản phẩm nổi bật để bảo vệ đồ án:

| TT | Thành viên phụ trách | Phân hệ đảm nhiệm | Công việc chi tiết Frontend (React) & Backend (FastAPI) |
|:---:|---|---|---|
| **1** | **Thạch Hoài Trang** *(Trưởng nhóm)* | **GD-00: Đăng nhập Role Selector & GD-01: Giám sát Sai lệch** | Xây dựng màn hình đăng nhập chuyển đổi vai trò 1-Click; dựng bố cục Sidebar chuẩn; lập trình 4 thẻ KPI chỉ số, Biểu đồ đường Recharts và Biểu đồ Thác nước (Waterfall Variance). |
| **2** | **Nguyễn Minh Toàn** | **GD-02: Xưởng Dự báo AI & Nạp Dữ liệu Excel** | Thiết kế modal popup nạp dữ liệu Excel/CSV vào CSDL; xây dựng bảng tham số lọc; hiển thị thẻ sai số MAPE/RMSE; tích hợp biểu đồ diện tích dải tin cậy 95% Prophet. |
| **3** | **Trần Viết Lê Nhân** | **GD-03: Hộp cát What-If & Khuyến nghị AI** | Lập trình các thanh trượt Slider tương tác ($\Delta P\%, \Delta M\%$); xử lý phản hồi realtime trên đồ thị cột; thiết kế Hộp chú giải khuyến nghị thông minh của AI và Ma trận so sánh 3 kịch bản. |
| **4** | **Tạ Quốc Thông** | **GD-04: Phân bổ Quota & Xuất Nghị quyết** | Xây dựng bảng ma trận phân bổ chỉ tiêu Quota; lập trình thuật toán làm tròn và cơ chế bù trừ số dư lẻ bảo toàn 100% ngân sách; thiết kế nút ký số điện tử và xuất file PDF/Excel. |
| **5** | **Từ Hoàng Phi Long** | **Backend REST API & CSDL (FastAPI + AI)** | Xây dựng toàn bộ các Endpoint API: Auth phân quyền (`/api/auth/switch-role`), Nạp dữ liệu (`/api/data/import`), Chạy AI Prophet (`/api/forecast`), Tính What-If vi mô (`/api/simulate-what-if`), Thuật toán phân bổ Quota (`/api/allocate-quota`), kết nối PostgreSQL. |

---

> [!TIP]
> **Cách sử dụng với Google Stitch (`https://stitch.withgoogle.com/`):**
> 1. Truy cập vào dự án của bạn trên Google Stitch.
> 2. Copy toàn bộ nội dung khối code của từng **PROMPT 0, 1, 2, 3, 4** ở trên.
> 3. Dán vào ô tạo màn hình trên Stitch để hệ thống tự động sinh mã nguồn HTML/Tailwind CSS chuẩn xác nhất.