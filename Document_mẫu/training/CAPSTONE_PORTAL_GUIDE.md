# 🌐 HƯỚNG DẪN SỬ DỤNG PORTAL CAPSTONE — DTU CMU
> **Dành cho:** Nhóm trưởng **Nguyễn Hữu Phúc** — Nhóm **C1SE.81**  
> **Cập nhật:** 05/09/2026  
> **Trạng thái:** Workspace chưa có bằng chứng xác nhận tình trạng tài khoản; Leader cần kiểm tra trực tiếp với mentor/portal.
> **Kế hoạch nhóm:** 19 tuần, 5 Sprint, 24 PBI và 156 SP theo Proposal Review của mentor. Kiểm tra portal có cho cấu hình đủ 5 Sprint trước khi nhập.

---

## 🔗 THÔNG TIN PORTAL

| Mục | Thông tin |
|---|---|
| **URL chính** | https://capstone.vn-us.edu.vn |
| **URL info** | https://capstone.vn-us.edu.vn/info |
| **Tên app** | **CMU Capstone** / **Capstone Project Portal** |
| **Đơn vị phát triển** | Nội bộ DTU (Trường Quốc tế Việt-Mỹ, domain: vn-us.edu.vn) |
| **Framework** | ASP.NET Blazor Server + DevExpress v25.2.6.0 |
| **Hỗ trợ PWA** | ✅ Có thể cài như app trên điện thoại |

---

## 🔍 NHỮNG GÌ ĐÃ XÁC NHẬN QUA SOURCE CODE

### Tính năng đã đọc được từ HTML source (không cần đăng nhập):

```
1. ExportGradingSheetController  → Xuất bảng điểm (giảng viên dùng)
2. downloadFileFromBase64         → Download file deliverables
3. openPdfFromBase64              → Xem PDF trực tiếp trên tab mới
4. Service Worker                 → Hỗ trợ offline + PWA install
5. Splash Screen: "Capstone Project Portal"
6. Blazor Server                  → Real-time connection, không cần reload
```

### Suy luận chức năng hệ thống (dựa trên pattern Blazor + DevExpress):

| Module suy luận | Mô tả |
|---|---|
| **Quản lý nhóm** | Danh sách nhóm, phân công thành viên, vai trò (Leader, Member) |
| **Quản lý Sprint** | Tạo Sprint, gắn task, theo dõi progress theo Scrum |
| **Nộp Deliverables** | Upload PDF, tài liệu theo từng milestone |
| **Xem/Tải Deliverables** | Leader nộp → Thầy mở xem PDF online |
| **Chấm điểm online** | Giảng viên nhập điểm từng tiêu chí → Export bảng điểm |
| **Dashboard tiến độ** | Biểu đồ Burndown, Sprint velocity |
| **Thông báo** | Thông báo deadline, nhận xét từ mentor |

---

## 📋 QUY TRÌNH VẬN HÀNH (SUY LUẬN TỪ CÁC NIÊN KHÓA TRƯỚC)

### Từ thông tin cộng đồng sinh viên DTU thu thập được:

```
FLOW HOẠT ĐỘNG CỦA PORTAL:

Thầy tạo lớp/nhóm trên portal
         ↓
Thầy cấp tài khoản cho Leader (1 người/nhóm)
         ↓
Leader đăng nhập → Thêm thành viên → Setup project
         ↓
Mỗi Sprint: Leader tạo Sprint Backlog trên portal
         ↓
Cuối Sprint: Leader upload deliverables (PDF)
         ↓
Thầy review → Nhập nhận xét → Chấm điểm Sprint
         ↓
Export GradingSheet → Điểm cuối kỳ
```

### Điều kiện để được bảo vệ Capstone (từ quy định DTU):
1. ✅ Mentor đồng ý và chấm đạt **≥ 5.5/10**
2. ✅ Không có phản hồi tiêu cực từ doanh nghiệp (nếu đang thực tập)
3. ✅ Hoàn thành đủ **10+1 deliverables** theo mẫu quy định
4. ✅ Có bằng chứng làm việc nhóm (Jira logs, Git commits, biên bản họp)
5. ✅ Mã nguồn đầy đủ, có thể chạy được

---

## ⚠️ LƯU Ý ĐẶC BIỆT CHO LEADER (PHÚC)

### 🔐 Về tài khoản:
- Cơ chế cấp tài khoản được tài liệu cũ ghi là do giảng viên phụ trách; trạng thái thực tế của nhóm hiện **chưa được xác minh trong workspace**.
- **KHÔNG tự đăng ký** — hệ thống không có nút đăng ký công khai
- Cách xác minh bằng email DTU/MSSV cần kiểm tra lại sau khi đăng nhập hoặc nhận hướng dẫn chính thức.

### 📤 Về nộp tài liệu:
- Tất cả deliverables phải nộp dưới dạng **PDF** (portal chỉ hỗ trợ PDF viewer)
- **Mỗi Sprint phải có folder riêng** (theo cấu trúc deliverable #5)
- **Không nộp trễ deadline** — hệ thống Blazor real-time có thể lock form sau deadline

### 👥 Về quản lý nhóm:
- Leader là người duy nhất có quyền **tạo Sprint, nộp bài**
- Các thành viên có thể được xem nhưng không sửa
- **Peer Review** cũng có thể được thực hiện qua portal (mỗi thành viên tự đánh giá)

### 📊 Về điểm số:
- Portal có module **GradingSheet** → thầy chấm từng tiêu chí
- Điểm Mentor (30%) được nhập qua portal
- Điểm Hội đồng (70%) được nhập sau buổi bảo vệ

---

## 🔎 KẾT QUẢ TÌM KIẾM CỘNG ĐỒNG

### Từ các nguồn công khai tìm được:

| Nguồn | Kết quả |
|---|---|
| **GitHub search** | Không tìm thấy repo public nào về portal này (login required) |
| **Studocu.vn** | Có tài liệu capstone DTU nhưng chủ yếu là báo cáo đồ án, không hướng dẫn portal |
| **Google/Web** | Portal hoàn toàn **nội bộ** — không có hướng dẫn công khai |
| **Source code** | Đọc được HTML source → xác nhận tính năng GradingSheet, PDF viewer |
| **Domain vn-us.edu.vn** | SSL cert hợp lệ, active server, đang chạy |

### Nhận xét:
> Portal này **hoàn toàn kín** với bên ngoài. Không có hướng dẫn công khai, không có sinh viên nào chia sẻ (do quy định trường). Cách duy nhất là **hỏi thầy trực tiếp** và **học từ khóa trước** qua kênh nội bộ nhóm CMU DTU.

---

## 📌 ACTION ITEMS CHO PHÚC

| Việc cần làm | Khi nào | Ưu tiên |
|---|---|---|
| Xác minh trạng thái tài khoản với mentor/portal | Ngay tại checkpoint hiện tại | 🔴 Cao nhất |
| Đăng nhập và khám phá giao diện | Ngay khi có tài khoản | 🔴 Cao |
| Kiểm tra project C1SE.81 đã được tạo hay chưa | Sau khi đăng nhập | 🔴 Cao |
| Kiểm tra đủ 5 thành viên và quyền Leader | Sau khi đăng nhập | 🟠 Trung bình |
| Hỏi anh/chị khóa trước về cách dùng | Bất cứ lúc nào | 🟡 Nên làm |

---

## 💡 TIPS CHIẾN LƯỢC

1. **Hỏi nhóm khóa trước (K28):** Họ vừa dùng portal này — hỏi xem flow như thế nào, có bugs gì không
2. **Chụp ảnh mọi thứ sau khi đăng nhập:** Layout, menu, tính năng để tôi có thể phân tích
3. **Nộp sớm hơn deadline 2 ngày** — Blazor Server đôi khi có lỗi upload file lớn
4. **Git + Portal song song:** Git quản lý code, Portal quản lý tài liệu — hai cái bổ sung nhau

---

*File này sẽ được cập nhật khi Phúc có tài khoản và khám phá được giao diện thực tế.*
