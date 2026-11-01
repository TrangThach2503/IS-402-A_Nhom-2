# SalesDSS - Hệ Thống Hỗ Trợ Ra Quyết Định Bán Lẻ
### Chuỗi Tiện Lợi WinMart & WinMart+ Đà Nẵng (Masan WinCommerce)
**Học phần:** IS402 - Phát Triển Hệ Thống Thông Tin Doanh Nghiệp | **Nhóm thực hiện:** Nhóm 2

---

## 📌 Giới Thiệu Dự Án

**SalesDSS** là hệ thống hỗ trợ ra quyết định thông minh (Decision Support System - DSS) được thiết kế chuyên biệt cho Ban Giám đốc Kinh doanh và Chuyên viên Kế hoạch thuộc chuỗi bán lẻ **WinMart & WinMart+ tại khu vực Thành phố Đà Nẵng** (bao gồm 32 điểm bán: 2 siêu thị WinMart và 30 cửa hàng tiện lợi WinMart+ trải rộng tại Hải Châu, Thanh Khê, Sơn Trà, Ngũ Hành Sơn, Liên Chiểu, Cẩm Lệ).

Hệ thống được phát triển bám sát chu trình ra quyết định 4 giai đoạn chuẩn của **Herbert Simon**:

```
[ Intelligence (Trí tuệ) ] ➔ [ Design (Thiết kế) ] ➔ [ Choice (Lựa chọn) ] ➔ [ Implementation (Thực thi) ]
   Bảng điều khiển kinh doanh     Xưởng dự báo AI Prophet       Hộp cát mô phỏng What-If      Phân bổ & Phê duyệt Quota
```

---

## 🚀 Các Tính Năng & Phân Hệ Cốt Lõi

1. **Giai đoạn Trí Tuệ (Intelligence) - Bảng Điều Khiển Kinh Doanh:**
   * Theo dõi doanh thu thực tế, biên lợi nhuận gộp, lưu lượng khách hàng và tỷ lệ đạt kế hoạch 32 điểm bán WinMart Đà Nẵng.
   * Bản đồ nhiệt hiệu suất theo quận huyện (Hải Châu, Sơn Trà, Thanh Khê...) và cơ cấu doanh thu theo ngành hàng (Thực phẩm tươi sống MeatDeli/WinEco, FMCG, Bách hóa...).
   * Bộ lọc dữ liệu đa chiều, nạp dữ liệu POS/ERP thực tế.

2. **Giai đoạn Thiết Kế (Design) - Xưởng Dự Báo Chuỗi Thời Gian AI (AI Prophet Hub):**
   * Tích hợp thuật toán học máy phân tích xu hướng dài hạn, tính chu kỳ tuần/tháng và các điểm dị biệt (lễ hội, thời tiết mùa du lịch Đà Nẵng).
   * Dự báo doanh thu 30 ngày tiếp theo kèm dải tin cậy 95% (Upper / Lower Bound) và chỉ số sai số MAPE tối ưu ($4.18\%$).

3. **Giai đoạn Lựa Chọn (Choice) - Hộp Cát Mô Phỏng What-If (What-If Sandbox):**
   * Thanh trượt giả lập đa biến số nhạy cảm: Tỷ lệ chiết khấu khuyến mại, Ngân sách tiếp thị O2O, Biến động giá vốn nhà cung cấp, và Dự báo sức mua mùa du lịch Đà Nẵng.
   * Ma trận so sánh 3 kịch bản: **Thận Trọng (Conservative)**, **Cơ Sở (Base-Case)**, và **Tăng Tốc (Aggressive)**.

4. **Giai đoạn Thực Thi (Implementation) - Phân Bổ Chỉ Tiêu Quota & Phê Duyệt Kế Hoạch:**
   * Cơ chế thuật toán phân bổ quota doanh số xuống từng cửa hàng dựa trên tỷ trọng đóng góp lịch sử, tiềm năng tăng trưởng và chỉ số diện tích mặt sàn/vị trí.
   * Quy trình phê duyệt số ký quỹ hạn ngạch có xác thực bảo mật và phân quyền vai trò (Sales Director vs. Planning Analyst).

5. **Bảo Mật & Xác Thực Tài Khoản Đa Lớp:**
   * Đăng nhập phân quyền chuyên biệt (Giám đốc kinh doanh / Chuyên viên kế hoạch).
   * Cơ chế **Cấp lại mật khẩu qua OTP 6 số**: Tích hợp Backend FastAPI gửi mã xác thực trực tiếp qua dịch vụ Google SMTP (`smtp.gmail.com:587`) đến hộp thư cá nhân, kèm chế độ xem trước mã trực tiếp cho người kiểm thử.

---

## 🛠 Kiến Trúc Công Nghệ

* **Giao diện người dùng (Frontend):**
  * React 18, Vite
  * Tailwind CSS, Lucide React Icons
  * Thiết kế thích ứng (Responsive), hiệu ứng Glassmorphism & Micro-animations
* **Xử lý phía sau (Backend API):**
  * Python 3, FastAPI, Uvicorn
  * Thư viện gửi email bảo mật `smtplib`, `email.mime`
  * CORS Middleware, Pydantic Data Models

---

## 💻 Hướng Dẫn Cài Đặt & Chạy Cục Bộ (Local Development)

### 1. Khởi chạy Giao diện (Frontend)
```bash
cd frontend
npm install
npm run dev
```
Trang web sẽ hoạt động tại: **`http://localhost:5173/`**

### 2. Khởi chạy Máy chủ API (Backend)
```bash
cd backend
pip install fastapi uvicorn pydantic python-dotenv requests
python -m uvicorn main:app --host 0.0.0.0 --port 8008 --reload
```
API Documentation (Swagger UI) có sẵn tại: **`http://localhost:8008/docs`**

*(Tùy chọn) Để gửi email thật về Gmail:* Sao chép và cấu hình tệp `backend/.env` với email và Mật khẩu ứng dụng Google (App Password).

---

## 👥 Thành Viên Nhóm Thực Hiện
* **Nhóm 2 - IS402.A**
* Dự án kết thúc môn Hệ Thống Thông Tin Doanh Nghiệp (IS402).
