# NHẬT KÝ FEEDBACK MENTOR THẦY HUY - 25/09/2026
> **Dự án:** CustomCakeAI (C1SE.81)  
> **Mentor / Product Owner:** ThS. Nguyễn Đăng Quang Huy  
> **Ngày họp review:** 25/09/2026  
> **Nguồn lưu trữ gốc:** `REVIEW_OF_THAY_HUY_MENTOR/25_09_2026/feedback_of_mentor_Huy_25_9_2026.docx` và 4 ảnh media (`media/image1.png` - `image4.png`)  
> **Trạng thái:** NGUỒN SỰ THẬT QUY ĐỊNH KỸ NGHỆ HIỆN HÀNH (AUTHORITATIVE MENTOR BASELINE)

---

## 1. TỔNG QUAN ĐỊNH HƯỚNG MỚI TỪ MENTOR (EXECUTIVE SUMMARY)

Trong buổi họp review tiến độ ngày 25/09/2026, Mentor ThS. Nguyễn Đăng Quang Huy đã đưa ra 4 chỉ đạo chiến lược mang tính bước ngoặt nhằm tối ưu hóa năng suất và giảm thiểu rủi ro cho nhóm C1SE.81:

1. **Chuẩn hóa Báo cáo Định kỳ (Weekly Meeting Report):** Khóa chặt cấu trúc biểu mẫu báo cáo, loại bỏ các cột không hợp lý trong kế hoạch, và nghiêm cấm sử dụng từ ngữ không chuẩn mực học thuật trong tên tài liệu giao nộp.
2. **Tinh giản Bộ khung Actor (5 Actors):** Gộp hoàn toàn vai trò `NV-TV` (Tư vấn viên) vào `NV-BH` (Nhân viên Bán hàng kiêm duyệt đơn custom) để giảm tải độ phức tạp phân quyền, tập trung nguồn lực kỹ thuật vào **AI Core**.
3. **Triết lý "Product First" & Điều chỉnh Trình tự Kỹ nghệ:** Tập trung ưu tiên thời gian làm sản phẩm thực tế chạy được trước, tài liệu hoàn thiện sau để khớp với sản phẩm; tạm hoãn đào sâu C4 Model; thiết kế Database trước UI/UX; phân định rõ FE và BE trong mô tả công việc.
4. **Chiến dịch Nước rút Giao diện (Deadline 02/10/2026):** Toàn bộ nhóm dồn lực hoàn thành bộ giao diện Frontend mẫu hoàn chỉnh (từ vẽ tay -> Figma -> React FE) để trình diễn cho Mentor trước khi bước vào lập trình Backend và AI Core.

---

## 2. QUY CHUẨN BIỂU MẪU WEEKLY MEETING REPORT

Dựa trên phản hồi trực tiếp và 4 ảnh chụp bảng biểu (`image1.png` - `image4.png`), biểu mẫu báo cáo tiến độ tuần được chuẩn hóa nghiêm ngặt như sau:

### 2.1. Phần I. Work Content Plan (Kế hoạch tuần hiện tại)
* **Quy tắc bắt buộc:** **TUYỆT ĐỐI KHÔNG ĐƯỢC CÓ 2 CỘT `Actual(hours)` và `Done(%)`**.
* **Giải thích logic:** Phần I là lập kế hoạch cho tuần tới/tuần hiện tại (tương lai). Vì là kế hoạch nên chưa diễn ra công việc, số giờ thực tế (`Actual`) và tỷ lệ hoàn thành (`Done %`) là điều không thể biết trước. Việc để 2 cột này trong bảng Plan là vô nghĩa và sai nguyên tắc quản lý dự án.
* **Cấu trúc cột hợp lệ:**
  $$\text{Task} \quad|\quad \text{Priority} \quad|\quad \text{Status (To Do / In Progress)} \quad|\quad \text{Estimate (Hours)} \quad|\quad \text{Assignee / Person} \quad|\quad \text{Notes}$$

### 2.2. Phần II. Work Content Done (Công việc đã hoàn thành tuần này)
* **Quy tắc đặt tên Deliverable:** **NGHIÊM CẤM VIẾT TỪ "Specification" TRONG TÊN CÁC TÀI LIỆU GIAO NỘP.**
  * ❌ *Sai:* `User Stories Specification Document v1.0`  
  * ✅ *Đúng:* `User Stories Document v1.0`
  * ❌ *Sai:* `Product Backlog Specification Document v1.0`  
  * ✅ *Đúng:* `Product Backlog Document v1.0`
* **Lưu ý cốt lõi từ Mentor:** "Tài liệu chỉ là phần phụ, quan trọng là sản phẩm. Ưu tiên thời gian cho quá trình ra sản phẩm hơn là làm tài liệu, vì khi làm xong sản phẩm cũng bị bắt buộc sửa lại tài liệu cho khớp (tiết kiệm thời gian tập trung vào sản phẩm hơn)."
* **Sprint Backlog:** Bắt buộc tuân thủ 100% theo mẫu chuẩn (template) của Thầy Huy.

### 2.3. Phần III. Issue / Risk (Theo dõi Vấn đề & Rủi ro)
* Giữ nguyên cơ cấu quản trị rủi ro chuyên nghiệp:
  $$\text{No.} \quad|\quad \text{Issue / Risk Description} \quad|\quad \text{Impact (High/Med/Low)} \quad|\quad \text{Solution / Mitigation Action} \quad|\quad \text{Status}$$
* Các rủi ro kỹ thuật đã khóa biện pháp xử lý:
  * *Rủi ro thanh toán:* VietQR callback tự động duyệt đơn -> Khóa quy tắc: Webhook chỉ ghi nhận trạng thái thanh toán, bắt buộc `NV-BH` duyệt thủ công trước khi chuyển sang bếp (`BAKING`).
  * *Tải AI nặng:* PhoWhisper STT và CLIP retrieval gây nghẽn -> Thiết kế Celery worker kết hợp Redis broker (PBI SYS-01) đảm bảo API REST phản hồi $< 500\text{ ms}$.

### 2.4. Phần IV. Plan Content The Next Week & Quy tắc Chuyển tiếp (Carry-over Rule)
* **Nguyên tắc:** Những thành phần/task nào chưa hoàn thành ở *Work Content Plan* hoặc *Work Content Done* của tuần hiện tại thì được phép mang sang *Plan Content The Next Week* để tiếp tục thực hiện ở tuần kế tiếp cho đến khi hoàn thành triệt để.

---

## 3. TINH GIẢN BỘ KHUNG ACTOR (5 ACTORS CHUẨN)

### 3.1. Đánh giá của Mentor về Bộ khung 6 Actors cũ
* **Bộ khung cũ:** `Khách hàng` + `NV-TV (Tư vấn)` + `NV-BH (Bán hàng)` + `NV-BEP (Bếp)` + `NV-DECOR (Trang trí)` + `ADMIN`.
* **Nhận định:** Việc chia thành 6 Actor là quá nhiều, rườm rà và nặng nề cho một dự án đồ án tốt nghiệp Capstone. Bản chất cốt lõi (CORE) của đề tài CustomCakeAI là **AI (Voice/Text-to-Image và Hệ thống gợi ý CLIP)**, không nên tự làm khó nhóm bằng cách phức tạp hóa quá nhiều luồng phân quyền và tài khoản nhân sự.

### 3.2. Phương án Hợp nhất (Actor Consolidation)
* **Đề xuất & Chốt:** Giữ nguyên toàn bộ nghiệp vụ thực tế nhưng **GỘP 2 ACTOR `NV-TV` VÀ `NV-BH` THÀNH DUY NHẤT 1 ACTOR LÀ `NV-BH` (Nhân viên Bán hàng kiêm Tư vấn & Duyệt đơn)**.
* **Loại bỏ:** Xóa bỏ hoàn toàn khái niệm Actor và tài khoản người dùng độc lập `NV-TV`.

### 3.3. Bộ khung 5 Actors Chính thức của Hệ thống

| STT | Actor (Tiếng Việt / Anh) | Portal / Giao diện Tương ứng | Trách nhiệm Nghiệp vụ Cốt lõi |
|:---:|---|---|---|
| **1** | **Khách hàng**<br>*(Customer - Guest & Registered)* | Customer Web App / Web Checkout | - Cấu hình bánh 2D trực quan trên Canvas (Konva.js).<br>- Nhập yêu cầu bằng Giọng nói (STT) hoặc Text.<br>- Xem phác thảo AI Concept 2D và nhận gợi ý mẫu bánh (CLIP).<br>- Đặt hàng, thanh toán VietQR / COD và theo dõi trạng thái đơn. |
| **2** | **Nhân viên Bán hàng**<br>*(Sales Staff - NV-BH)*<br>*(Gộp nghiệp vụ NV-TV)* | Sales & Order Management Portal | - Tư vấn, báo giá và tính tiền tại quầy cho khách mua trực tiếp.<br>- Tiếp nhận các đơn bánh custom đặt trực tuyến.<br>- Thẩm định tính khả thi (Feasibility Engine hỗ trợ) và duyệt/từ chối đơn.<br>- Xác nhận thanh toán đặt cọc / tiền mặt. |
| **3** | **Nhân viên Bếp bánh**<br>*(Kitchen Staff - NV-BEP)* | Kitchen Task Board | - Tiếp nhận danh sách cốt bánh cần nướng theo mẻ/đơn.<br>- Xử lý nguyên liệu thô, nướng cốt bánh theo đúng kích thước/vị.<br>- Cập nhật trạng thái `BAKING` hoàn thành để chuyển giao cho thợ trang trí. |
| **4** | **Nhân viên Trang trí**<br>*(Decorator - NV-DECOR)* | Decor Board | - Nhận cốt bánh từ bếp và xem bản vẽ kỹ thuật 2D/AI đã duyệt.<br>- Thực hiện phủ kem, vẽ hình, bắt hoa văn, tạo hình fondant.<br>- Chụp ảnh thành phẩm đối soát chất lượng (QA evidence) và đánh dấu hoàn tất. |
| **5** | **Quản trị viên**<br>*(Admin / Bakery Owner)* | Admin Dashboard | - Quản lý tài khoản nhân viên, phân quyền ca làm.<br>- Quản lý danh mục bánh mẫu, giá nguyên liệu, phụ kiện, voucher.<br>- Cấu hình giới hạn công suất tiếp nhận đơn của tiệm.<br>- Xem báo cáo doanh thu, hiệu suất AI và nhật ký kiểm toán (Audit Trail). |

* **Lưu ý ranh giới hệ thống:**
  * **Tuyệt đối KHÔNG có tài khoản `Shipper`:** Giao hàng chỉ là trạng thái luồng (`OUT_FOR_DELIVERY` -> `DELIVERED`).
  * **Tuyệt đối KHÔNG có tài khoản `QA` riêng:** QA là hành động nghiệp vụ đối soát chụp ảnh của `NV-DECOR` và xác nhận của `NV-BH`.

---

## 4. ĐIỀU CHỈNH TRÌNH TỰ KỸ NGHỆ (ENGINEERING SEQUENCE)

Theo chỉ đạo của Thầy Huy và thảo luận nội bộ nhóm:

1. **Tạm hoãn đào sâu C4 Model:** Chưa cần thiết phải vẽ chi tiết C4 Component/Code lúc này. C4 chỉ giữ ở mức bao quát (Context & Container cơ bản), không để việc vẽ C4 làm chậm tiến độ làm phần mềm.
2. **Database Design đi trước UI/UX:** Cần hoàn thành thiết kế Database (Conceptual & Logical ERD, lược đồ quan hệ) để khóa cấu trúc dữ liệu trước, làm cơ sở vững chắc cho việc thiết kế giao diện UI/UX và logic luồng dữ liệu.
3. **Phác thảo luồng giao diện (Workflow Sketching):** Trước khi đi vào chi tiết, cần vẽ phác thảo tay hoặc vẽ nhanh trên Canva các màn hình và luồng chuyển đổi trạng thái (từ A qua B, B qua C) để hình dung rõ nét toàn bộ trải nghiệm người dùng.
4. **Quy chuẩn mô tả công việc (FE vs. BE):**
   * Trong WBS, Sprint Backlog và Weekly Report, phải ghi rõ ràng thành phần công việc là **Frontend (FE)** hay **Backend (BE)**.
   * *Ví dụ vi phạm:* Viết "Complete Konva.js 2D Cake Canvas Editor (PBI G-03) & Implement candidate CLIP vector extraction pipeline (PBI G-04)" khiến Mentor không hiểu là đang làm giao diện FE hay chức năng BE.
   * *Ví dụ chuẩn hóa:*
     * Task FE: `[FE] Xây dựng giao diện Canvas 2D tương tác kéo thả phụ kiện bánh (Konva.js - PBI G-03)`
     * Task BE: `[BE] Triển khai pipeline trích xuất vector CLIP cho catalog bánh mẫu (PBI G-04)`

---

## 5. KẾ HOẠCH HÀNH ĐỘNG NƯỚC RÚT TRƯỚC 02/10/2026 (UI/UX PROTOTYPE SPRINT)

* **Mục tiêu tối thượng:** Tập trung toàn bộ nguồn lực để hoàn thiện bộ giao diện người dùng chính (Frontend Prototype) của dự án.
* **Thời hạn nghiệm thu (Deadline):** **02/10/2026** — Trình diễn bộ giao diện hoàn chỉnh cho Mentor Huy xem trước khi nhóm đi sâu vào lập trình Backend và AI Core.
* **Quy trình 3 giai đoạn (Stages):**
  1. **Stage 1 - Phác thảo luồng nghiệp vụ (Sketches):** Vẽ tay hoặc phác thảo nhanh trên Canva toàn bộ các màn hình, liên kết rõ nét luồng đi từ bước A sang bước B (Customer đặt bánh -> Canvas -> Sales duyệt -> Bếp nướng -> Decor hoàn thiện).
  2. **Stage 2 - Dựng bộ khung mẫu (Figma / Mockup):** Thiết kế chi tiết UI/UX trên Figma theo Design System chuẩn, đảm bảo màu sắc nhận diện thương hiệu, bố cục thân thiện, chuẩn trải nghiệm người dùng.
  3. **Stage 3 - Hiện thực hóa mã nguồn Frontend (React FE Component):** Lập trình chuyển đổi mockup Figma thành mã nguồn giao diện tương tác thật trên nền tảng Next.js / React, Tailwind CSS và tích hợp thư viện Canvas Konva.js (60fps).

---

## 6. MA TRẬN ÁNH XẠ TRÁCH NHIỆM THÀNH VIÊN TRONG SPRINT UI/UX (ĐẾN 02/10/2026)

| Thành viên | Trách nhiệm chính đến 02/10/2026 | Hạng mục bàn giao (Deliverable) |
|---|---|---|
| **Thạch Hoài Trang**<br>*(Frontend / Auth Lead & UX)* | Chủ trì thiết kế UI/UX & Lập trình giao diện Khách hàng (Customer Web App & Canvas 2D) | - Flow phác thảo hành trình Khách hàng.<br>- Mockup Figma Customer Flow & 2D Canvas Editor.<br>- Mã nguồn FE Next.js/React cho luồng cấu hình bánh và đặt hàng. |
| **Nguyễn Hữu Phúc**<br>*(Project Leader & Full-stack)* | Điều phối chung, chuẩn hóa Weekly Report & Thiết kế giao diện Quản trị / Bán hàng | - Weekly Meeting Report chuẩn form Thầy Huy.<br>- Mockup & FE cho Sales & Order Management Portal (NV-BH).<br>- Hỗ trợ tích hợp Konva.js Canvas với Trang. |
| **Trần Văn Phúc Duy**<br>*(Database & QA Lead)* | Thiết kế Lược đồ Cơ sở Dữ liệu (Database Design) phục vụ UI/UX | - Conceptual & Logical ERD (PostgreSQL + pgvector).<br>- Bảng từ điển dữ liệu (Data Dictionary) khớp với các trường hiển thị trên UI. |
| **Từ Hoàng Phi Long**<br>*(Backend Dev & AI)* | Thiết kế giao diện Bảng điều khiển Bếp & Thợ Decor | - Mockup & FE cho Kitchen Task Board (NV-BEP).<br>- Mockup & FE cho Decor Board & QA Evidence (NV-DECOR). |
| **Tạ Quốc Thông**<br>*(Backend Dev & AI)* | Thu thập bộ dữ liệu mẫu bánh & Chuẩn bị API Contracts cho FE | - Bộ catalog 50-100 ảnh bánh mẫu có gắn nhãn ngữ nghĩa.<br>- Tài liệu đặc tả Mock API Contracts phục vụ kết nối Frontend. |

---
*Tài liệu này được biên soạn và kiểm chứng theo chỉ đạo của Mentor ThS. Nguyễn Đăng Quang Huy ngày 25/09/2026, là cơ sở pháp lý và kỹ thuật cao nhất cho toàn bộ các hoạt động triển khai tiếp theo của nhóm C1SE.81.*
