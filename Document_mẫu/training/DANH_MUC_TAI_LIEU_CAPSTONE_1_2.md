# 📚 CÁCH THỨC VẬN HÀNH CAPSTONE 1 & 2 VÀ BỘ HỒ SƠ TÀI LIỆU CÁC NIÊN KHÓA TRƯỚC (DTU CMU)
> **Trích xuất từ:** Quy chế Đào tạo Quốc tế (IS - DTU), Studocu, Scribd, CMU-SE 450/451 Guidelines  
> **Cập nhật:** 05/09/2026 | **Dành cho:** Nguyễn Hữu Phúc & Nhóm C1SE.81
> **Ghi chú hiện hành:** Lộ trình tổng quát bên dưới là dữ liệu tham khảo khóa trước. Kế hoạch riêng của C1SE.81 đã được mentor điều chỉnh thành 19 tuần, 5 Sprint và 156 SP; xem `MENTOR_REVIEW_BASELINE.md`.

---

## 🏛️ 1. TỔNG QUAN LUỒNG VẬN HÀNH CAPSTONE 1 VÀ CAPSTONE 2

Chương trình Công nghệ Phần mềm chuẩn CMU (Carnegie Mellon University) tại Đại học Duy Tân chia đồ án tốt nghiệp thành **2 học phần liên tiếp** kéo dài trong **1 năm học (2 học kỳ)**:

```
[HỌC KỲ 1] CAPSTONE 1 (CMU-SE 450)
Focus: Planning + Requirements + System Architecture + UI/UX + Proof-of-Concept Prototype
 ├── Tuần 1-3: Form nhóm, chọn đề tài, nộp Initial Pitch, được duyệt Proposal
 ├── Tuần 4-6: Phân tích kỹ nghệ yêu cầu (SRS) + Thiết kế Kiến trúc (SAD - C4 Model)
 ├── Tuần 7-8: Đánh giá giữa kỳ (Demo nguyên mẫu 20-30% + Slide Tiếng Anh)
 ├── Tuần 9-13: Hoàn thiện UI Design, Test Plan sơ bộ, Fail-safe Matrix, API specs
 └── Tuần 14-16: Bảo vệ Capstone 1 trước Hội đồng (Bắt buộc 14 Deliverables + Demo Prototype)
                           │
                           ▼ (Đạt Capstone 1 mới được lên Capstone 2)
                           │
[HỌC KỲ 2] CAPSTONE 2 (CMU-SE 451)
Focus: Full-scale Implementation + Intensive Testing + Deployment + Final Defense
 ├── Sprint 1 - Sprint 4: Lập trình sản phẩm hoàn chỉnh theo Agile/Scrum
 ├── Tuần 8-10: Software Testing (Functional, Non-functional, Load Test, Security Audit)
 └── Tuần 14-16: Bảo vệ Tốt nghiệp Cuối kỳ (Full Working Product + User Manual + Final Defense)
```

---

## 📑 2. DANH MỤC CÁC TÀI LIỆU CHUẨN CẦN LÀM (DELIVERABLES TEMPLATES)

Dựa trên mẫu chuẩn CMU của Khoa Đào tạo Quốc tế (DTU IS) qua các niên khóa K25, K26, K27, K28, bộ hồ sơ bắt buộc gồm **14 Deliverables chính** chia làm 4 nhóm:

### 🅰️ NHÓM 1: KHỞI ĐỘNG VÀ QUẢN LÝ DỰ ÁN (INITIATION & MANAGEMENT)
1. **Project Registration Form (Mẫu đăng ký đề tài):**
   - Tên đề tài (Anh - Việt), phát biểu ranh giới hệ thống, thông tin 5 thành viên, cam kết của nhóm.
2. **Project Proposal (Đề xuất dự án):**
   - Business Case (Lý do chọn đề tài, tính cấp thiết).
   - Problem Statement & Solution (Phát biểu bài toán & Giải pháp đề xuất).
   - Research Question & Methodology (Câu hỏi nghiên cứu kiểm chứng & Phương pháp luận).
   - Baseline Comparison & Expected Contribution (So sánh với các nghiên cứu trước & Đóng góp mới).
3. **Project Management Plan / Sprint Plan (Kế hoạch quản lý dự án):**
   - WBS (Work Breakdown Structure).
   - Gantt Chart / Roadmap 19 tuần theo baseline 5 Sprint của mentor.
   - Agile/Scrum Backlog (Epic, User Stories, Story Points).
   - Risk Management Matrix (Ma trận quản lý rủi ro & Phương án dự phòng).

### 🅱️ NHÓM 2: PHÂN TÍCH & THIẾT KẾ KỸ THUẬT (ANALYSIS & DESIGN)
4. **Software Requirements Specification (SRS):**
   - Functional Requirements (Yêu cầu chức năng - Use Case Specs / User Stories).
   - Non-Functional Requirements (Yêu cầu phi chức năng: Hiệu năng, Bảo mật, Độ sẵn sàng).
   - Traceability Matrix (Ma trận vết: Yêu cầu $\leftrightarrow$ Test Case $\leftrightarrow$ Code Module).
5. **Software Architecture Document (SAD) — ⭐ QUAN TRỌNG NHẤT:**
   - Visual Architecture (C4 Model: System Context, Container, Component Diagrams).
   - Tech Stack Rationale (Lý giải lựa chọn công nghệ & Trade-off analysis).
   - Database Design (ERD chuẩn 3NF, Data Dictionary, Indexing Strategy).
   - API Specifications (Postman / Swagger documentation).
   - **System Constraints and Impact Analysis (Chương điểm huyệt):**
     - *Problem Complexity Analysis* (Toán học / Thuật toán phức tạp).
     - *Engineering Constraints* (Health, Safety, Economic, Fail-safe).
     - *Ethical & Global Impact* (Sở hữu trí tuệ, AI Bias, Quyền riêng tư).
6. **UI/UX Design Document:**
   - Wireframes & High-fidelity Mockups (Figma).
   - User Journey Map & User Interface Flow diagrams.

### 🅲 NHÓM 3: KIỂM THỬ VÀ CHẤT LƯỢNG (TESTING & QUALITY)
7. **Software Test Plan:**
   - Chiến lược kiểm thử (Unit Test, Integration Test, System Test, Acceptance Test).
   - Môi trường kiểm thử & Dữ liệu test (Test Data Strategy).
8. **Test Cases & Test Scenarios:**
   - Danh sách Test Case chức năng và phi chức năng (Happy path, Edge cases, Error handling).
9. **Test Report & Bug Tracking Report:**
   - Báo cáo số lượng lỗi phát hiện (Pass/Fail rate), biểu đồ lỗi (Severity / Priority), báo cáo sửa lỗi.
10. **Fail-Safe & Edge Case Matrix (Phòng thủ bảo vệ):**
    - Danh sách các tình huống sập mạng, lỗi dữ liệu, race condition và cơ chế xử lý tự động.

### 🅳 NHÓM 4: BẰNG CHỨNG QUY TRÌNH VÀ BẢO VỆ (EVIDENCE & DEFENSE)
11. **Teamwork Evidence Record:**
    - Biểu đồ Jira Burndown, Nhật ký họp Sprint (Daily Standup notes), Lịch sử Git Commit/Merge.
12. **Peer Review Records:**
    - Đánh giá chéo đóng góp từng thành viên sau mỗi Sprint (Individual Contribution %).
13. **AI Usage Report (Báo cáo sử dụng AI):**
    - Khai báo các công cụ AI đã dùng (Gemini, ChatGPT, Copilot...), mục đích dùng, ai là người kiểm chứng code/tài liệu.
14. **Final Defense Package:**
    - Báo cáo tổng kết (Final Report PDF), Slide thuyết trình 100% Tiếng Anh, Working Prototype / Live Demo.

---

## 💡 3. KINH NGHIỆM ĐÃ ĐƯỢC KIỂM CHỨNG TỪ CÁC KHÓA TRƯỚC (K25 - K28)

1. **Về việc chọn Đề tài (Initial Pitch):**
   - Đừng chọn đề tài quá mênh mông. Hội đồng CMU đánh giá cao bài toán **sâu và hẹp** hơn là rộng nhưng hời hợt.
   - Bắt buộc phải có **Research Question** (Ví dụ: *"Liệu thuật toán X có làm giảm 20% độ trễ so với phương pháp Y trên tập dữ liệu tiếng Việt hay không?"*).

2. **Về việc chuẩn bị Slide Thuyết trình:**
   - Slide bảo vệ dài từ 25–35 trang (Tiếng Anh).
   - Cấu trúc chuẩn: Problem (2 trang) $\rightarrow$ Proposed Solution (2 trang) $\rightarrow$ System Architecture & ERD (5 trang) $\rightarrow$ Key Contribution/Math (4 trang) $\rightarrow$ Evaluation & Demo (10 trang) $\rightarrow$ System Constraints & Lessons Learned (3 trang).

3. **Về việc Live Demo trước Hội đồng:**
   - **Luôn chuẩn bị Video Demo quay sẵn (Backup Video 4K):** Trong trường hợp wifi trường chập chờn hoặc Server bị sập bất ngờ, ngay lập tức bật Video Demo để trình bày không bị ngắt đoạn.
   - Demo phải có cả kịch bản báo lỗi (Ví dụ: Cố tình nhập sai để cho thấy hệ thống bắt lỗi chuẩn).

---

*File này đã được lưu vào hệ thống để dùng làm kim chỉ nam khi nhóm tiến hành viết SRS, SAD và slide bảo vệ.*
