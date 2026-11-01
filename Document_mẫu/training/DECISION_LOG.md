# DECISION LOG - CAPSTONE C1SE.81
> **Nguyên tắc:** Giữ toàn bộ lịch sử; quyết định mới không xóa quyết định cũ mà phải ghi rõ trạng thái thay thế.
> **Đồng bộ gần nhất:** 06/09/2026

---

## [07/08/2026] Khởi tạo dự án và khóa quy trình
- **Quyết định:** Áp dụng brainstorming, phản biện đa góc nhìn và C4/architecture review cho các thay đổi lớn.
- **Lý do:** Hạn chế scope creep, khóa rõ bài toán trước khi thiết kế và chuẩn bị khả năng phản biện trước hội đồng.
- **Trạng thái:** Còn hiệu lực như quy trình quản trị thay đổi; không dùng để bắt đầu lại ideation cho đề tài đã lock-in.

## [09/08/2026] Ý tưởng 1 - Automated F&B Kiosk Simulator
- **Quyết định tại thời điểm đó:** Xây dựng phần mềm điều phối máy bán/chế biến đồ ăn tự động, có state machine, SePay và demand forecasting.
- **Rủi ro đã phân tích:** Race condition giữ hàng, hardware desync, hoàn tiền/voucher và cửa nhận món thông minh.
- **Trạng thái:** **Lịch sử / không phải đề tài chính thức.** Tài liệu còn giữ tại `TOPIC_OF_PHUC/Y_Tuong_1_Vending_Machine.docx`.

## [12/08/2026] Ý tưởng dự phòng 2 và 3
- **FeedBackFlow AI:** Phân tích phản hồi đa kênh cho SME, dùng NLP/multimodal/RAG.
- **ListingCraft AI:** Tự động tạo hình ảnh và nội dung listing đa kênh cho nhà bán lẻ online.
- **Trạng thái:** **Đề tài dự phòng**, không thay thế CustomCakeAI.

## [22/08/2026] Rút gọn danh sách đề tài ứng viên
- **Các phương án được lưu:** CustomCake, FeedBackFlow, ListingCraft và Food Waste AI.
- **Tiêu chí chọn:** Có stakeholder rõ, AI là thành phần thật, demo được trong 16 tuần và không trùng danh sách đề tài đã đăng ký.
- **Kết quả:** CustomCake được đưa vào vòng làm việc với mentor.

## [26/08/2026] Mentor chốt hướng CustomCakeAI
- **Quyết định:** Đề tài chính thức là nền tảng cá nhân hóa thiết kế bánh sinh nhật 2D sử dụng AI tạo ảnh kết hợp hệ thống gợi ý.
- **Điều chỉnh từ mentor:** Voice tiếng Việt là đầu vào quan trọng để tăng hàm lượng khoa học; hệ thống gợi ý phải dựa trên mẫu bánh tiệm có khả năng thực hiện.
- **Phạm vi ngôn ngữ:** Ưu tiên tiếng Việt; không mở rộng song ngữ trong MVP.
- **Trạng thái:** **LOCK-IN về hướng đề tài.** Approval Section của form trong workspace vẫn chưa có chữ ký, nên chưa ghi nhận phê duyệt hành chính hoàn tất.

## [27/08/2026] Khóa mô hình nghiệp vụ và kiến trúc sơ bộ
- **Stakeholder:** Khách đặt bánh custom và tiệm bánh SME tại Đà Nẵng.
- **Luồng lõi:** Voice/Text -> bóc tách yêu cầu -> sinh phác thảo 2D -> Canvas -> gợi ý mẫu khả thi -> định giá -> đặt hàng -> vận hành tiệm.
- **Kiến trúc:** Web-first PWA, FastAPI, PostgreSQL, Redis/Celery, object storage và Docker VPS.
- **Vector store chính thức:** PostgreSQL + `pgvector`; Qdrant chỉ là tùy chọn PoC cho đến khi có quyết định thay thế.
- **Ngoài phạm vi:** Native mobile app, 3D modeling, IoT lò nướng và tích hợp hãng vận chuyển bên thứ ba.

## [29/08/2026] Chốt đội hình và kế hoạch Sprint
- **Đội hình:** 5 thành viên; Nguyễn Hữu Phúc là Leader/Scrum Master và AI Pipeline Lead.
- **Kế hoạch:** 4 Sprint x 4 tuần trong giai đoạn 15/08/2026-05/12/2026.
- **Phân công:** Duy phụ trách Canvas/Recommender; Trang phụ trách Frontend/Auth; Thông phụ trách Database/Payment; Long phụ trách Operations Workflow/Production Task Board.
- **Công cụ bắt buộc:** Git, Jira và Postman.

## [30/08/2026] Hoàn thành bộ hồ sơ bản nháp
- **Đã có:** Proposal DOCX/PDF, Registration Form tiếng Anh, BA, backlog, Architectural Drivers, BFD, System Context và Layered Architecture.
- **Trạng thái:** Bản nháp sẵn sàng kiểm tra; chưa có bằng chứng chữ ký/phê duyệt cuối trong workspace.

## [31/08/2026] Kiểm toán và đồng bộ nguồn sự thật
- **Sửa số liệu:** Product Backlog thực tế có **24 items / 156 SP**, gồm Sprint 1: 57, Sprint 2: 42, Sprint 3: 39, Sprint 4: 18. Số `25 / 161` bị loại khỏi memory hiện hành.
- **Sửa tuyên bố AI:** Không tuyên bố OpenCV xóa SynthID/watermark 100%. Chỉ dùng hậu xử lý ảnh được phép và phải giữ minh bạch nguồn gốc AI.
- **Đánh giá dữ liệu:** 10 ảnh hiện tại là seed photos; 1.000 câu synthetic cần làm sạch; catalog vector 16 chiều là placeholder, không phải CLIP 512-dim.
- **Trạng thái triển khai:** Chưa có Git repository, source code sản phẩm, database schema hoặc test evidence trong workspace.
- **Ưu tiên đã khóa:** (1) làm sạch hồ sơ; (2) khóa MVP và traceability; (3) PoC STT, sinh ảnh 2D và CLIP thật; (4) khởi tạo Git/Jira/Postman và Sprint 1.

## [31/08/2026] Khóa guardrail tránh lệch scope trong Registration Form
- **Quyết định:** MVP chính thức là Web App và các portal phần mềm. Không mô tả như dự án triển khai phần cứng POS/KDS, lò nướng, máy in hay thiết bị bếp.
- **Lý do:** Hội đồng có thể bắt bẻ nếu tài liệu gợi ý nhóm phải mang thiết bị thật hoặc kiểm soát quy trình vật lý ngoài phạm vi đồ án đại học.
- **Bánh rút tiền:** Chỉ giữ như edge case/risk cho NLP, pricing và financial separation; không dùng làm objective, innovation hoặc economic impact chính.
- **Overclaiming:** Không dùng các cam kết `100%`, `70%`, latency/accuracy cố định nếu chưa có đo kiểm. Dùng `target`, `expected`, `designed to`, hoặc `validated by PoC/load test`.
- **Food safety:** Không tuyên bố kiểm soát hạn sử dụng nguyên liệu hoặc vệ sinh an toàn thực phẩm, vì hệ thống không quản lý nguyên liệu vật lý.
- **Trạng thái:** **APPROVED** theo lưu ý của Phúc để cập nhật form và agent memory.

---

## Quy tắc ghi quyết định tiếp theo
Mỗi entry mới phải có: ngày, quyết định, lý do, tác động phạm vi/kiến trúc, người xác nhận và trạng thái `PROPOSED`, `APPROVED`, `SUPERSEDED` hoặc `REJECTED`.


## [31/08/2026] Xác nhận Tick cả 2 Học phần CMU-SE 450 & CMU-IS 450
- **Quyết định:** Trên Form đăng ký đề tài, tick chọn cả **☑ CMU-SE 450** và **☑ CMU-IS 450**.
- **Lý do:** Nhóm C1SE.81 là nhóm liên ngành Cross-Functional chuẩn CMU gồm 4 sinh viên K29 TPM (SE - CMU-SE 450) và 1 sinh viên K29 HTTT (Thạch Hoài Trang - CMU-IS 450).
- **Trạng thái:** Chính thức áp dụng trên cả bản Word Tiếng Việt và Tiếng Anh.

## [05/09/2026] Tiếp nhận toàn bộ Proposal Review của Mentor
- **Nguồn:** `REVIEW_OF_THAY_HUY_MENTOR/proposal_review/C1SE.81_Project_Proposal_VN_review.docx`.
- **Người xác nhận áp dụng:** Nguyễn Hữu Phúc, đại diện nhóm C1SE.81.
- **Quyết định:** Dùng toàn bộ định hướng trong bản review làm baseline mới cho Proposal, Project Plan, SRS, SAD, STP, backlog, diagrams, implementation và evaluation.
- **Định vị mới:** CustomCakeAI là Applied Experimental Research Capstone kết hợp Software Engineering, không chỉ là dự án xây dựng tính năng Web.
- **Research baseline:** 4 research gaps, RQ1-RQ5, RO1-RO5, H1-H5, dataset, baselines, experiments, metrics, statistical analysis, limitations và research contributions.
- **Kiến trúc baseline:** năm lớp Presentation, API/Security, Business Services, AI/ML và Data/Infrastructure; dùng PostgreSQL + pgvector, Redis/Celery, object storage, Docker/Nginx và model gateway.
- **Responsible AI:** lưu provenance, giữ watermark/SynthID, human-in-the-loop và data minimization.
- **Trạng thái:** **APPROVED**.

## [05/09/2026] Thay thế kế hoạch 4 Sprint bằng 5 Sprint
- **Quyết định mới:** Giai đoạn `15/08/2026-25/12/2026`, tổng 19 tuần, 5 Sprint và 156 SP.
- **Phân bổ mới:** Sprint 1 = 30 SP; Sprint 2 = 38 SP; Sprint 3 = 35 SP; Sprint 4 = 31 SP; Sprint 5 = 22 SP.
- **Mục tiêu Sprint:** Research Foundation; AI Core; Customer/Payment/Feasibility; Bakery Operation/Integration; Evaluation/Optimization/Documentation.
- **Quyết định bị thay thế:** Entry ngày 29/08/2026 và 31/08/2026 về `4 Sprint / 16 tuần / 57-42-39-18 SP`.
- **Tác động:** Mọi tài liệu mới phải dùng 5 Sprint. Backlog phải tái ánh xạ 24 PBI sang phân bổ mới mà không tự thay đổi tổng 156 SP.
- **Trạng thái:** **APPROVED; SUPERSEDES FOUR-SPRINT PLAN**.

## [05/09/2026] Phân công Research Stream theo Mentor Review
- **Quyết định:** Giữ nguyên role chính thức của năm thành viên và bổ sung trách nhiệm nghiên cứu thứ cấp.
- **Phúc:** research coordination, architecture và system evaluation.
- **Thông:** RQ1 - STT/NLP.
- **Long:** RQ2 - CLIP recommendation.
- **Trang:** RQ4 - UX/Canvas.
- **Duy:** RQ3 feasibility và RQ5 performance.
- **Lý do:** Đảm bảo đóng góp nghiên cứu cá nhân mà không làm sai bảng role chính thức đã chốt.
- **Trạng thái:** **APPROVED FOR RESEARCH STREAMS; FORMAL ROLE WORDING SUPERSEDED BY 06/09/2026 PROPOSAL ROLE LOCK**.

## [06/09/2026] Khóa role theo Proposal `CAP1_nhom81.docx`
- **Nguồn:** Yêu cầu xác nhận của Nguyễn Hữu Phúc sau khi rà soát bản Proposal `PROPOSAL/CAP1_nhom81.docx`.
- **Quyết định:** Role trong bảng Proposal hiện tại là canonical cho các tài liệu tiếp theo.
- **Role áp dụng:** Nguyễn Hữu Phúc - Project Leader / Scrum Master / Full-stack Developer; Tạ Quốc Thông - Backend Dev & AI Researcher; Từ Hoàng Phi Long - Backend Dev & AI Researcher; Thạch Hoài Trang - Frontend / Authentication / UX Researcher; Trần Văn Phúc Duy - Backend Developer / QA Engineer.
- **Tác động:** Các agent không được đánh dấu role dạng `AI Researcher`, `UX Researcher` hoặc `QA Engineer` là lỗi. Các role cũ trong Registration/decision trước đó được xem là lịch sử nếu mâu thuẫn với Proposal hiện hành.
- **Trạng thái:** **APPROVED; SUPERSEDES OLD FORMAL ROLE WORDING FOR NEW DOCUMENTS**.

## [05/09/2026] Khóa nguyên tắc Research Integrity
- **Quyết định:** Các ngưỡng H1-H5 và NFR trong mentor review là target/acceptance threshold, không phải kết quả đã đạt.
- **Dữ liệu:** Seed, synthetic, placeholder và vector random phải được gắn nhãn, không được dùng làm scientific evidence.
- **Feasibility:** Ground truth cần review độc lập, không được sinh từ cùng rule engine đang đánh giá.
- **Kết quả:** Hypothesis không đạt vẫn phải báo cáo trung thực cùng error analysis và limitation.
- **Trạng thái:** **APPROVED**.

## [07/09/2026] Khóa quy trình C4 và Database Design trước Implementation
- **Nguồn tham khảo:** C4 Model/Structurizr, PostgreSQL/pgvector official documentation và ba project-local skills `c4designer`, `database-schema-designer`, `postgresql-table-design`.
- **Quyết định:** Bắt buộc hoàn thành và review C4 System Context, C4 Container, conceptual ERD, logical ERD và physical PostgreSQL design trước khi triển khai core implementation. Component diagram chỉ tạo cho container phức tạp hoặc rủi ro cao; Code diagram không bắt buộc.
- **Quy trình dữ liệu:** `Domain -> Invariant -> Conceptual ERD -> Logical ERD -> PostgreSQL schema -> Migration -> Validation`.
- **Guardrail:** Order/payment độc lập; Consultant duyệt trước BAKING; không có Shipper/QA account; AI provenance và model metadata phải truy vết; vector dimension/HNSW không được đoán.
- **Chưa khóa:** Số lượng container cuối, chiến lược ID, PostgreSQL version, model/version, embedding dimension, HNSW, retention và deployment topology sẽ chờ Phúc mô tả chi tiết và xác nhận.
- **Tác động:** `TRAINING/C4_DATABASE_DESIGN_BASELINE.md` trở thành file auto-load cho các agent khi làm kiến trúc hoặc database. Các diagram hiện có chưa bị sửa.
- **Người xác nhận:** Nguyễn Hữu Phúc thông qua yêu cầu chuẩn bị C4 và database trước khi vào dự án.
- **Trạng thái:** **APPROVED FOR PROCESS; FINAL DESIGN PENDING**.

## [08/09/2026] Ưu tiên kế hoạch và khóa quy trình Word/Excel trước C4
- **Nguồn:** Yêu cầu trực tiếp của Nguyễn Hữu Phúc về thứ tự củng cố tài liệu và khả năng dùng chung skill giữa Codex, Google Antigravity/Gemini, Hermes và các agent khác.
- **Quyết định:** Thứ tự hiện hành là `Project Plan -> Product Backlog -> User Stories -> C4 Model -> Database Design -> Implementation`.
- **Quan hệ với quyết định 07/09:** C4 và Database Design vẫn bắt buộc trước core implementation; chỉ được dời sau ba artifact kế hoạch để kiến trúc bám đúng scope, PBI và acceptance criteria.
- **Skill đã cài:** `office-skills` từ `lamvu211/office-skills`; `docx-cn-reference` và `xlsx-cn-reference` từ kho Trung Quốc `SelfEvolveAI/claude-office-skills-cn`; bổ sung project authority skill `capstone-office-documents`.
- **Quy tắc:** Template hiện có và yêu cầu trực tiếp của người dùng luôn thắng generic defaults. Không tự đổi bìa, màu bảng, font, layout hoặc mục lục; bắt buộc kiểm tra cấu trúc, mở lại file và visual QA sau render.
- **Hermes:** Vì workspace hiện chưa có Git root, dùng `skills.external_dirs` để Hermes quét `C:/xampp/htdocs/CAPSTONE1/.agents/skills`.
- **Tác động:** `TRAINING/OFFICE_DOCUMENT_SKILLS_BASELINE.md` trở thành file auto-load. Không có Proposal, diagram, C4 hay database schema nào bị sửa trong quyết định này.
- **Trạng thái:** **APPROVED**.

## [09/09/2026] Cập nhật Master Timeline chính thức của Bộ môn CMU Duy Tân
- **Nguồn:** Lịch trình chính thức đồ án Capstone 1 (MIS-SE-NE CMU Duy Tân) do người dùng cung cấp (Thầy Huy, Thầy Diệu).
- **Các mốc quan trọng:**
  - `05/09 - 12/09/2026`: Present Proposal and Approval Project (đã tô cam).
  - `07/09 - 14/09/2026`: Submit Project Plan (Nhóm hoàn thành ngày 09/09/2026 hoàn toàn đúng hạn).
  - `14/09 - 18/09/2026`: Submit Architecture Documents (C4 / SAD).
  - `21/09 - 25/09/2026`: Submit DB Design Docs.
  - `28/09 - 03/10/2026`: Status report 1st (Mentor).
  - `12/10 - 17/10/2026`: Status report 2nd (Mentor).
  - `01/11 - 07/11/2026`: Midterm Report (Hội đồng CMU & Mentor).
  - `16/11 - 20/11/2026`: Status report 3rd (Mentor).
  - `29/11 - 05/12/2026`: Status report 4th (Mentor).
  - `10/12 - 13/12/2026`: Final Submission.
  - `17/12 - 26/12/2026`: Capstone Defense.
- **Tài liệu lưu trữ:** `TRAINING/OFFICIAL_CAPSTONE_TIMELINE_CMU.md`.
- **Trạng thái:** **APPROVED**.

## [09/09/2026] Khóa cứng Baseline 24 PBIs (156 SP) và Phân bổ Sprint Thực tế
- **Nguồn:** Rà soát học thuật và phán quyết Hội đồng Chấm Đề tài Capstone 1.
- **Quyết định:**
  1. Bảo toàn nguyên vẹn 24 PBIs gốc theo baseline chính thức (tổng 156 SP). Không tự ý đổi điểm từng PBI (SYS-04=8, SYS-01=13, G-04=5, SYS-03=8, CH-05=8) và không thêm PBI ngoài danh mục (loại bỏ SYS-05).
  2. Phân bổ Story Points thực tế theo 24 PBIs nguyên khối qua 5 Sprints: Sprint 1 = 28 SP; Sprint 2 = 42 SP; Sprint 3 = 37 SP; Sprint 4 = 31 SP; Sprint 5 = 18 SP (Tổng = 156 SP). Kế hoạch 30/38/35/31/22 SP được định danh là Khung Năng lực Đề xuất sơ bộ (Capacity Guideline) từ Proposal Review.
  3. Chuyển `CH-05` thành **Must-Have** (8 SP) vì phân hệ này tích hợp kịch bản kiểm thử tải Locust cung cấp bằng chứng thực nghiệm bắt buộc cho câu hỏi nghiên cứu RQ5 (System Performance).
  4. Cơ cấu MoSCoW: Must-Have = 22 PBIs (146 SP / 93.6%), Should-Have = 2 PBIs (10 SP / 6.4%: CH-03, CH-04), Could-Have = 0 PBIs.
  5. Trình tự kỹ nghệ: Hoàn thành và nộp C4 Model (14-18/09) và DB Design (21-25/09) trước khi triển khai lập trình core AI services (từ 25/09/2026).
- **Trạng thái:** **APPROVED**.

## [10/09/2026] Quy chuẩn Thiết kế Table Header: Nền Xám Nhạt (D9D9D9), Chữ Đen Đậm
- **Nguồn:** Chỉ đạo trực tiếp của Project Leader (ảnh `image_ccce26.png`).
- **Nội dung:** Toàn bộ bảng biểu trong tài liệu kỹ nghệ (Word/Excel) từ nay trở về sau khóa cứng định dạng tiêu đề cột (table header):
  1. Màu nền tiêu đề (Shading Fill): **Màu xám nhạt trung tính (`D9D9D9` hoặc `E7E6E6`)**.
  2. Màu chữ (Text Color): **Màu đen đậm thuần túy (`RGBColor(0, 0, 0)`, Bold)**, font Times New Roman 9.5pt.
  3. Căn lề: Căn giữa theo cả chiều ngang và chiều dọc (`alignment=CENTER`, `vertical_alignment=CENTER`).
  4. Tuyệt đối KHÔNG dùng màu nền xanh đậm / tối màu (`1F497D`) gây chìm chữ hoặc giảm tương phản.
- **Trạng thái:** **LOCKED & ENFORCED**.
