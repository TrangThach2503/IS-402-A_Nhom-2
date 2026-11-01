# 🚀 PHÂN TÍCH CHIẾN LƯỢC ĐỀ TÀI — CAPSTONE 1 (2026)
> **Nguyễn Hữu Phúc** | Nhóm C1SE.81 | Cập nhật: 05/08/2026
>
> **TRẠNG THÁI LƯU TRỮ:** Đây là snapshot brainstorming trước khi khóa đề tài, không phải định hướng hiện hành. Đề tài chính thức từ 29/08/2026 là **CustomCakeAI**; xem `MASTER_CONTEXT.md` và `DECISION_LOG.md` trước khi ra quyết định.

---

## 🧩 MA TRẬN ĐÁNH GIÁ ĐỀ TÀI

### Tiêu chí chấm điểm (1–5):
- **Khả thi (FEA)**: Thực hiện được trong 16 tuần với nhóm 5 người chưa rõ năng lực
- **Tác động (IMP)**: Ý nghĩa thực tế, giải quyết pain point thật
- **Phù hợp hội đồng (JUR)**: Giám khảo CMU đánh giá cao
- **Độ độc đáo (UNI)**: Chưa bị nhóm nào trong lớp làm
- **Tiềm năng research (RES)**: Có thể viết paper, có baselines rõ
- **Dễ demo (DEM)**: Hội đồng dễ thấy được kết quả

---

## 🏆 TOP IDEA ĐỀ XUẤT (Chưa bị chiếm)

### 💡 IDEA 1: VietGuard — AI Phát Hiện Lừa Đảo Tài Chính Đa Phương Thức cho Người Việt
*(Khác với C1SE.0823 đã chọn: Nhóm 0823 tập trung text/email; idea này tập trung giao dịch ngân hàng + ZALO scam)*

| Tiêu chí | Điểm | Lý do |
|---|---|---|
| Khả thi | ⭐⭐⭐⭐ | Dataset scam VN có thể thu thập từ Cảnh sát mạng, Facebook groups, báo |
| Tác động | ⭐⭐⭐⭐⭐ | Scam tài chính là vấn đề NÓNG nhất 2026 tại VN |
| Phù hợp hội đồng | ⭐⭐⭐⭐ | Security + AI = CMU rất ưa |
| Độ độc đáo | ⭐⭐⭐ | C1SE.0823 làm gần giống — cần differentiate rõ |
| Tiềm năng research | ⭐⭐⭐⭐ | Corpus tiếng Việt scam chưa có benchmark chính thức |
| Dễ demo | ⭐⭐⭐⭐⭐ | Demo thời gian thực rất ấn tượng |

**Differentiation khỏi C1SE.0823:**
- 0823: Phát hiện tin nhắn/email/ảnh chụp/hóa đơn/URL/cuộc gọi chung chung
- IDEA 1 tập trung: **Giao dịch ngân hàng giả mạo** + **Zalo OTP phishing** + **QR code scam** + explainable warning

---

### 💡 IDEA 2: HealthPath VN — AI Triage Assistant & Định Tuyến Y Tế Tiếng Việt
*(Chưa nhóm nào đăng ký)*

| Tiêu chí | Điểm | Lý do |
|---|---|---|
| Khả thi | ⭐⭐⭐⭐ | Knowledge Graph y tế + NLP tiếng Việt — độ phức tạp vừa phải |
| Tác động | ⭐⭐⭐⭐⭐ | Giải tỏa quá tải bệnh viện — vấn đề quốc gia |
| Phù hợp hội đồng | ⭐⭐⭐⭐⭐ | Healthcare AI = hội đồng CMU rất ấn tượng |
| Độ độc đáo | ⭐⭐⭐⭐⭐ | Chưa ai làm |
| Tiềm năng research | ⭐⭐⭐⭐ | Medical NLP tiếng Việt là gap thực sự |
| Dễ demo | ⭐⭐⭐⭐ | Chatbot demo dễ hiểu |

**Thách thức:**
- Cần disclaimer pháp lý rõ ràng (không phải chẩn đoán y khoa)
- Cần medical knowledge graph tiếng Việt (có thể dùng ICD-10 + Wikipedia y tế VN)
- Nhóm MIS (Trang) có thể phụ trách business & compliance side

---

### 💡 IDEA 3: PronounceViet — AI Luyện Phát Âm Tiếng Anh Khắc Phục Lỗi Vùng Miền Việt Nam
*(Chưa nhóm nào đăng ký)*

| Tiêu chí | Điểm | Lý do |
|---|---|---|
| Khả thi | ⭐⭐⭐⭐ | Speech recognition APIs có sẵn (Azure/Google), cần fine-tune |
| Tác động | ⭐⭐⭐⭐ | Startup tiềm năng cao — thị trường học tiếng Anh VN khổng lồ |
| Phù hợp hội đồng | ⭐⭐⭐⭐ | EduTech + AI + User Study = đầy đủ |
| Độ độc đáo | ⭐⭐⭐⭐⭐ | Chưa ai làm, dataset lỗi vùng miền chưa có |
| Tiềm năng research | ⭐⭐⭐⭐⭐ | Phoneme analysis cho tiếng Việt = gap thực sự |
| Dễ demo | ⭐⭐⭐⭐⭐ | Demo nói vào mic, so sánh waveform — visual WOW |

**Tech stack gợi ý:**
- Whisper (OpenAI) for STT
- Mozilla DeepSpeech hoặc Azure Cognitive Services
- Phoneme alignment: Montreal Forced Aligner
- Waveform visualization: D3.js hoặc WaveSurfer.js

---

### 💡 IDEA 4: SBOMGuard VN — Quản Lý Software Supply Chain & Vulnerability Prioritization
*(Đề tài Cyber Security — chưa bị lấy, thầy ưu tiên giao trước)*

| Tiêu chí | Điểm | Lý do |
|---|---|---|
| Khả thi | ⭐⭐⭐⭐ | Tools có sẵn: SBOM generators (Syft, CycloneDX), NVD database |
| Tác động | ⭐⭐⭐⭐ | Log4Shell, Solarwinds dạy ta supply chain attack nguy hiểm |
| Phù hợp hội đồng | ⭐⭐⭐⭐⭐ | Thầy đặc biệt ưu tiên đề tài này |
| Độ độc đáo | ⭐⭐⭐⭐ | Chưa ai trong lớp làm |
| Tiềm năng research | ⭐⭐⭐⭐⭐ | Contextual vuln prioritization là hot topic 2026 |
| Dễ demo | ⭐⭐⭐ | Dashboard kỹ thuật — cần explain rõ cho hội đồng |

**Research Question hay:**
> "Liệu Contextual Risk Scoring kết hợp CVSS + reachability analysis có ưu tiên vulnerability chính xác hơn CVSS-only trên các project Python/Node.js mã nguồn mở?"

---

### 💡 IDEA 5: CloudGuard-IaC — Phát Hiện Lỗi Bảo Mật Infrastructure-as-Code
*(Đề tài Cyber Security — chưa bị lấy, thầy ưu tiên giao trước)*

| Tiêu chí | Điểm | Lý do |
|---|---|---|
| Khả thi | ⭐⭐⭐⭐⭐ | Phạm vi rõ, tools sẵn có (Checkov, Semgrep, Trivy) |
| Tác động | ⭐⭐⭐⭐ | Cloud misconfiguration = nguyên nhân 80% cloud breach |
| Phù hợp hội đồng | ⭐⭐⭐⭐⭐ | Thầy đặc biệt ưu tiên đề tài này |
| Độ độc đáo | ⭐⭐⭐⭐ | Chưa ai trong lớp làm |
| Tiềm năng research | ⭐⭐⭐⭐ | LLM-enhanced rule explanation = đóng góp mới |
| Dễ demo | ⭐⭐⭐⭐ | CI/CD pipeline integration demo = professional |

**Research Question hay:**
> "Liệu LLM-enhanced explanation có cải thiện khả năng hiểu và sửa lỗi IaC của developer so với raw static analysis output?"

---

### 💡 IDEA 6: ✨ ORIGINAL IDEA 2026 — EchoMind: AI Mental Wellness Companion cho Sinh Viên Việt Nam
*(Hoàn toàn chưa xuất hiện trong bất kỳ tài liệu nào)*

| Tiêu chí | Điểm | Lý do |
|---|---|---|
| Khả thi | ⭐⭐⭐⭐ | LLM + CBT framework + Safety guardrails — có thể implement |
| Tác động | ⭐⭐⭐⭐⭐ | Khủng hoảng sức khỏe tâm thần sinh viên VN 2026 |
| Phù hợp hội đồng | ⭐⭐⭐⭐⭐ | Healthcare AI + Ethics + User Study = perfect CMU topic |
| Độ độc đáo | ⭐⭐⭐⭐⭐ | Hoàn toàn mới, chưa ai làm |
| Tiềm năng research | ⭐⭐⭐⭐⭐ | Mental health AI safety = cực kỳ hot |
| Dễ demo | ⭐⭐⭐⭐ | Chatbot demo + user study results |

**Đặc điểm:**
- **Không thay thế chuyên gia** — chỉ là companion, cần disclaimer rõ
- CBT-based conversation framework + safe messaging guidelines
- Crisis detection & escalation to professional resources
- Privacy-first: local processing, no data storage
- Đánh giá: PHQ-9 scale before/after + user satisfaction + safety audit

**Research Question:**
> "Liệu AI companion ứng dụng CBT-based prompting có cải thiện chỉ số PHQ-9 self-reported của sinh viên Đại học Duy Tân so với no-intervention control group, trong khi đảm bảo safe messaging guidelines?"

---

## 🎯 RANKING ĐỀ TÀI CHO NHÓM 4SE+1MIS

| Rank | Idea | Tổng điểm | Lý do ưu tiên |
|---|---|---|---|
| 🥇 1 | **HealthPath VN** (AI Triage) | 26/30 | Tác động cao, chưa ai làm, MIS fit tốt |
| 🥈 2 | **PronounceViet** (Pronunciation AI) | 26/30 | Độc đáo, demo ấn tượng, startup potential |
| 🥉 3 | **EchoMind** (Mental Wellness AI) | 26/30 | Hoàn toàn mới, research value cao |
| 4 | **SBOMGuard** | 24/30 | Thầy ưa, research mạnh nhưng demo khó |
| 5 | **CloudGuard-IaC** | 24/30 | Phạm vi rõ, thầy ưa |
| 6 | **VietGuard** (Scam Detection) | 23/30 | Tốt nhưng gần với C1SE.0823 |

---

## 📊 PHÂN CÔNG DỰ KIẾN THEO ĐỀ TÀI

### Nếu chọn HealthPath VN hoặc EchoMind:
| Thành viên | Role | Nhiệm vụ chính |
|---|---|---|
| **Nguyễn Hữu Phúc** | PM + AI Lead | Kiến trúc hệ thống, AI/ML pipeline, oversight |
| **Trần Văn Phúc Duy** | Backend Dev | API, database, NLP pipeline |
| **Tạ Quốc Thông** | AI/ML Dev | Model training, knowledge graph |
| **Từ Hoàng Phi Long** | Frontend Dev | UI/UX, web app, demo |
| **Thạch Hoài Trang** *(HTTT)* | Business Analyst | Requirements, SRS, user study, compliance, MIS docs |

### Nếu chọn PronounceViet:
| Thành viên | Role | Nhiệm vụ chính |
|---|---|---|
| **Nguyễn Hữu Phúc** | PM + Speech AI Lead | Phoneme analysis, architecture |
| **Trần Văn Phúc Duy** | Audio/ML Dev | STT, phoneme alignment, model |
| **Tạ Quốc Thông** | Backend Dev | API, user data pipeline |
| **Từ Hoàng Phi Long** | Frontend Dev | Mobile/Web app, waveform viz |
| **Thạch Hoài Trang** *(HTTT)* | UX Research + BA | User study, learning path design, MIS docs |

---

## ⚡ QUYẾT ĐỊNH NHANH (Sau khi gặp nhóm tuần 1)

### Câu hỏi cần hỏi từng thành viên:
1. GPA môn nào cao nhất? Thế mạnh kỹ thuật?
2. Đã biết ngôn ngữ/framework nào? (Python, React, Flutter, v.v.)
3. Có dự án cá nhân nào đã làm chưa?
4. Muốn theo hướng nào: AI, Backend, Frontend, Research?
5. Thời gian có thể dành cho dự án mỗi tuần?

### Quy trình chọn đề tài:
1. Giới thiệu 3 idea top → mỗi người vote 1–3 (không biết đề tài kia)
2. Thảo luận 30 phút về feasibility
3. Vote lần 2 sau discussion
4. Finalize trong buổi gặp đầu tiên

---

*Cập nhật file này khi có quyết định mới. Mọi thay đổi đều ghi log vào CAPSTONE1_TRAINING_DATA.md*
