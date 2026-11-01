# 🚀 QUY TRÌNH AWESOME SKILLS — THIẾT KẾ & XÂY DỰNG HỆ THỐNG
> **Mục đích:** Áp dụng triết lý từ `brainstorming`, `multi-agent-brainstorming` và `c4-architecture` để kiểm soát phạm vi, phản biện và thiết kế hệ thống CustomCakeAI.
> **Cập nhật:** 05/09/2026 | **Trạng thái:** Mentor review đã được nhận làm baseline; dự án theo 19 tuần, 5 Sprint và Applied Experimental Research.

---

## 🛠️ PHASE 1: ĐỊNH HÌNH & KHÓA Ý TƯỞNG (Skill: `brainstorming`)
*Tuyệt đối KHÔNG code hay bàn về Database/Tech-stack ở bước này.*

> **Kết quả hiện tại:** Đã hoàn tất cho CustomCakeAI. Chỉ mở lại Phase 1 khi mentor yêu cầu đổi bài toán lõi hoặc phạm vi.

Khi bạn mang một (hoặc nhiều) ý tưởng về, AI sẽ hỏi bạn từng câu một (One Question at a Time) để làm rõ:
1. **Bài toán lõi:** Nỗi đau thực sự là gì?
2. **Đối tượng (User):** Ai sẽ dùng? Stakeholder thật sự là ai?
3. **Giới hạn (Non-Goals):** Hệ thống sẽ KHÔNG làm gì? (Chống Scope Creep/Nồi lẩu).
4. **Ràng buộc phi chức năng (NFRs):** Hiệu năng, bảo mật, giới hạn chi phí.

🛑 **HARD GATE - UNDERSTANDING LOCK:**
AI sẽ tóm tắt lại 5 gạch đầu dòng về hệ thống. Bạn (Phúc) phải `Approve` thì mới được phép chuyển sang thiết kế. Mọi quyết định sẽ được ghi vào `DECISION_LOG.md`.

---

## 🥊 PHASE 2: HỘI ĐỒNG PHẢN BIỆN ẢO (Skill: `multi-agent-brainstorming`)
*Tìm lỗ hổng trước khi Giám khảo CMU tìm ra nó.*

AI sẽ đóng vai 3 "nhân vật" phản biện ý tưởng của bạn:
1. **Skeptic (Kẻ hoài nghi):** *"Giả sử hệ thống này thất bại lúc demo, nguyên nhân là gì?"*, *"Tính năng này có vi phạm YAGNI (You Aren't Gonna Need It) không?"*
2. **Constraint Guardian (Người gác cổng tài nguyên):** *"Nhóm 5 người có thể hoàn thành sản phẩm và thực nghiệm trong 19 tuần không?"*, *"Dataset, participant và server cho GenAI lấy từ đâu?"*
3. **User Advocate (Đại diện người dùng):** *"Quy trình này quá phức tạp, user sẽ bỏ cuộc ở bước 2!"*

🔥 **Mục tiêu:** Bạn và AI sẽ cùng "cãi" lại các agent này để vá lỗ hổng, cập nhật thiết kế.

---

## 🏗️ PHASE 3: THIẾT KẾ KIẾN TRÚC C4 (Skill: `c4-architecture`)
*Chuẩn bị Deliverable #6 & #7 cho hội đồng CMU.*

Sử dụng phương pháp C4 Model để tạo bộ tài liệu chuẩn mực (Giám khảo CMU, đặc biệt Prof. Lattanze cực kỳ thích cái này):
1. **Context Level (`c4-context.md`):** Sơ đồ tương tác giữa User ↔ System ↔ External APIs.
2. **Container Level (`c4-container.md`):** Tách Frontend, Backend, Database, Cloud Storage.
3. **Component Level (`c4-component.md`):** Cấu trúc module bên trong Backend (Auth, Payment, Core Logic).
4. **Code Level (`c4-code-*.md`):** Áp dụng sau khi đã code xong để generate tài liệu tự động.

---

## 📝 TEMPLATE QUYẾT ĐỊNH (DECISION LOG)
Tất cả những thay đổi quan trọng sẽ được lưu lại dưới dạng:
- **Quyết định:** (Ví dụ: Bỏ tính năng thanh toán online).
- **Lý do chọn:** (Không đủ thời gian trong kế hoạch 19 tuần/5 Sprint, rủi ro bảo mật hoặc thiếu bằng chứng nghiên cứu).
- **Giải pháp thay thế:** (Chuyển khoản thủ công + upload biên lai).

---

## PHASE 4: RESEARCH EVIDENCE GATE

Mỗi AI/research stream phải qua chuỗi:

`Problem -> Gap -> RQ -> RO -> Hypothesis -> Dataset -> Baseline -> Experiment -> Metric -> Result -> Finding`

Không cho phép agent viết kết quả trước khi có raw data, script, model/version, môi trường và error analysis. Feasibility ground truth phải được review độc lập với rule engine.

👉 **NEXT ACTION:** Dùng Phase 2 để phản biện backlog/kiến trúc, Phase 3 cho C4 và Phase 4 cho dataset/baseline/experiment trước khi tuyên bố kết quả. Mọi thay đổi phải cập nhật `DECISION_LOG.md`.
