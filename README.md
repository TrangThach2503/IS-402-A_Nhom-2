# SalesDSS - Hệ Thống Hỗ Trợ Ra Quyết Định Bán Lẻ
### Chuỗi Tiện Lợi WinMart & WinMart+ Đà Nẵng (Masan WinCommerce)
**Học phần:** IS402 - Hệ Hỗ Trợ Ra Quyết Định (DSS) | **Lớp:** IS402 A | **Nhóm thực hiện:** Nhóm 2

---

## 📌 Thành Viên Nhóm 2 & Phân Công Nhiệm Vụ (Chuẩn 20%/thành viên)

| TT | Họ và Tên | MSSV | Vai trò | Mảng kỹ thuật phụ trách |
|:---:|:---|:---:|:---|:---|
| 1 | **Thạch Hoài Trang** | 29209257890 | Nhóm trưởng | Quản lý tiến độ, Phân tích nghiệp vụ, Sơ đồ BFD, Use Case, Flowcharts quy trình DSS |
| 2 | **Nguyễn Minh Toàn** | 29219222826 | Thành viên | Thiết kế CSDL quan hệ (ERD/3NF), Kiến trúc OLAP Star Schema, Kịch bản SQL phân tích |
| 3 | **Trần Viết Lê Nhân** | 29219146362 | Thành viên | Thiết kế Giao diện GUI (React Pastel), Dashboard điều hành, Báo cáo độ lệch Waterfall |
| 4 | **Huỳnh Đức Tiến Mạnh** | 29211157944 | Thành viên | Xây dựng Backend REST API (Python FastAPI), Xử lý đồng bộ dữ liệu, Cấp phát OTP email |
| 5 | **Nguyễn Ngọc Hân** | 29204423268 | Thành viên | Nghiên cứu thuật toán AI (Facebook Prophet, Scikit-learn), Mô phỏng What-If & Đánh giá sai số |

---

## 🚀 Giới Thiệu Dự Án

Ứng dụng Web **SalesDSS** là hệ thống hỗ trợ ra quyết định thông minh phục vụ Ban Giám đốc Kinh doanh và Chuyên viên Kế hoạch của chuỗi **WinMart & WinMart+ tại khu vực Thành phố Đà Nẵng** (32 điểm bán: 1 đại siêu thị Vincom Ngô Quyền và 31 cửa hàng tiện ích WinMart+/WiN; tổng kho Hòa Cầm).

Hệ thống được thiết kế bám sát 100% **Chu trình ra quyết định 4 giai đoạn của Herbert Simon**:
1. **Trí Tuệ (Intelligence) - Bảng Điều Khiển Kinh Doanh:**
   * Giám sát doanh thu thực tế, biên lợi nhuận gộp, tỷ lệ đạt kế hoạch 32 điểm bán.
   * Bản đồ nhiệt hiệu suất theo quận huyện (Hải Châu, Sơn Trà, Thanh Khê, Ngũ Hành Sơn, Cẩm Lệ, Liên Chiểu...).
   * Phân tích đối chiếu phương sai độ lệch (Waterfall Variance Decomposition).
2. **Thiết Kế (Design) - Xưởng Dự Báo Chuỗi Thời Gian AI (AI Prophet Hub):**
   * Dự báo xu hướng chuỗi thời gian 30 - 60 - 90 ngày kèm dải tin cậy 95% (Upper/Lower Bound).
   * Đo lường sai số dự báo tối ưu: $\text{MAPE} = 4.62\%$.
3. **Lựa Chọn (Choice) - Hộp Cát Mô Phỏng What-If (What-If Sandbox):**
   * Thanh trượt giả lập đa kịch bản nhạy cảm: Điều chỉnh giá bán ($E_d = -1.2$), ngân sách Marketing ($\beta_{\text{mkt}} = 0.35$).
   * Ma trận so sánh 3 kịch bản: Thận Trọng (Conservative), Cơ Sở (Base-Case), và Tối Ưu Song Hành (Optimal - AI Khuyến Nghị).
4. **Thực Thi (Implementation) - Phân Bổ Chỉ Tiêu Quota & Phê Duyệt Kế Hoạch:**
   * Thuật toán phân bổ quota tự động đa tiêu chí: Năng lực lịch sử ($W_i$) $\times$ Tiềm năng tương lai ($G_i$).
   * Ràng buộc bảo toàn ngân sách 100% không phát sinh sai số làm tròn.
   * Luồng phê duyệt và ban hành kế hoạch bán hàng có phân quyền vai trò (RBAC).

---

## 🛠 Công Nghệ Sử Dụng

* **Frontend:** React 18.3.1, Vite 5, Tailwind CSS, Lucide React Icons, Recharts (Modern Executive Pastel).
* **Backend:** Python FastAPI, Pydantic, Uvicorn, Google SMTP Service.
* **Database & OLAP:** PostgreSQL 16 (3NF Relational Model & Star Schema Multi-dimensional Warehouse).
* **AI & Data Science:** Facebook Prophet Time-Series, Scikit-learn, Pandas, NumPy.

---

## 💻 Hướng Dẫn Cài Đặt & Chạy Cục Bộ

### 1. Khởi chạy Frontend
```bash
# Di chuyển vào thư mục frontend
cd CODE/frontend

# Cài đặt thư viện
npm install

# Khởi chạy máy chủ giao diện
npm run dev
```
Ứng dụng giao diện sẽ hoạt động tại: **`http://localhost:5173/`**

### 2. Khởi chạy Backend API
```bash
# Di chuyển vào thư mục backend
cd CODE/backend

# Cài đặt thư viện Python (nếu chưa có)
pip install fastapi uvicorn pydantic python-dotenv

# Khởi chạy máy chủ API
python main.py
```
Máy chủ API sẽ hoạt động tại: **`http://localhost:8000/`** (Swagger Docs tại `http://localhost:8000/docs`).
