# SalesDSS Frontend - Hệ Thống Hỗ Trợ Ra Quyết Định Bán Lẻ
### Chuỗi Tiện Lợi WinMart & WinMart+ Đà Nẵng (Masan WinCommerce)
**Học phần:** IS402 - Phát Triển Hệ Thống Thông Tin Doanh Nghiệp | **Nhóm thực hiện:** Nhóm 2

---

## 📌 Giới Thiệu Dự Án

Ứng dụng Web **SalesDSS** (Frontend) là giao diện hỗ trợ ra quyết định thông minh phục vụ Ban Giám đốc Kinh doanh và Chuyên viên Kế hoạch của chuỗi **WinMart & WinMart+ tại khu vực Thành phố Đà Nẵng** (32 điểm bán: 2 siêu thị WinMart và 30 cửa hàng tiện lợi WinMart+).

Giao diện được thiết kế chuẩn mực theo mô hình chu trình quyết định 4 giai đoạn của **Herbert Simon**:

1. **Trí Tuệ (Intelligence) - Bảng Điều Khiển Kinh Doanh:**
   * Theo dõi doanh thu thực tế, biên lợi nhuận gộp, tỷ lệ đạt kế hoạch 32 điểm bán WinMart Đà Nẵng.
   * Bản đồ nhiệt hiệu suất theo quận huyện (Hải Châu, Sơn Trà, Thanh Khê, Ngũ Hành Sơn...).
   * Phân tích cơ cấu ngành hàng và đối chiếu phương sai Waterfall.

2. **Thiết Kế (Design) - Xưởng Dự Báo Chuỗi Thời Gian AI (AI Prophet Hub):**
   * Dự báo xu hướng chuỗi thời gian 30 ngày tiếp theo kèm dải tin cậy 95% (Upper/Lower Bound).
   * Đo lường sai số dự báo MAPE tối ưu ($4.18\%$).

3. **Lựa Chọn (Choice) - Hộp Cát Mô Phỏng What-If (What-If Sandbox):**
   * Thanh trượt giả lập đa kịch bản nhạy cảm: Chiết khấu khuyến mại, Ngân sách tiếp thị O2O, Giá vốn nhà cung cấp, Mùa du lịch Đà Nẵng.
   * Ma trận so sánh 3 kịch bản: Thận Trọng (Conservative), Cơ Sở (Base-Case), và Tăng Tốc (Aggressive).

4. **Thực Thi (Implementation) - Phân Bổ Chỉ Tiêu Quota & Phê Duyệt Kế Hoạch:**
   * Thuật toán phân bổ quota doanh số xuống từng cửa hàng và nhân sự phụ trách.
   * Luồng phê duyệt số ký quỹ hạn ngạch có phân quyền vai trò.

5. **Xác Thực Đa Lớp & Cấp Lại Mật Khẩu Qua OTP:**
   * Phân quyền người dùng (Sales Director / Planning Analyst).
   * Quy trình khôi phục mật khẩu xác thực mã OTP 6 số bảo mật.

---

## 🛠 Công Nghệ Sử Dụng (Frontend)

* **Framework:** React 18, Vite
* **Styling & Icons:** Tailwind CSS, Lucide React Icons
* **Kiến trúc:** Component-based, SPA (Single Page Application)
* **Giao diện:** Pastel Modern, Glassmorphism, Micro-animations

---

## 💻 Hướng Dẫn Cài Đặt & Chạy Cục Bộ

```bash
# 1. Di chuyển vào thư mục frontend
cd frontend

# 2. Cài đặt các thư viện phụ thuộc
npm install

# 3. Khởi chạy máy chủ phát triển
npm run dev
```

Ứng dụng sẽ hoạt động tại: **`http://localhost:5173/`**
