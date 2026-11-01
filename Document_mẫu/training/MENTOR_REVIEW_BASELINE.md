# MENTOR REVIEW BASELINE - CUSTOMCAKEAI C1SE.81
> Adopted by project owner: 05/09/2026
> Source: `REVIEW_OF_THAY_HUY_MENTOR/proposal_review/C1SE.81_Project_Proposal_VN_review.docx`
> Status: authoritative mentor direction for the next Proposal, Project Plan, SRS, SAD, STP, backlog, diagrams, code and evaluation evidence.

## 1. Interpretation Rule

- Treat the mentor review as the latest approved project direction unless a later signed school document or mentor decision supersedes it.
- The current `PROPOSAL/C1SE.81_Project_Proposal_ver1.0.docx` is the pre-review baseline and must not override this file.
- The review contains no Word comments or tracked changes; it is a complete proposed structure with 50 sections, 15 tables and 13 figures.
- Preserve the canonical Proposal role table from `PROPOSAL/CAP1_nhom81.docx`. Older registration-style roles are historical unless a later mentor/school document restores them.
- Numeric thresholds are research targets, not achieved results. Never report them as measured outcomes without evidence.

## 2. Product And Research Positioning

**Title:** CustomCakeAI - 2D Birthday Cake Personalization Platform.

CustomCakeAI is a Web/PWA platform that converts Vietnamese text or voice cake ideas into structured cake attributes, produces an AI-assisted 2D concept draft, lets the customer fine-tune it on a 2D Canvas, recommends similar catalog cakes, checks configured feasibility rules, estimates price and supports the bakery order workflow.

The Capstone is both:

- a Software Engineering product; and
- an Applied Experimental Research project.

The project must answer not only whether the system runs, but how effective it is and what evidence supports that conclusion.

## 3. Mentor-Defined Problem And Research Gap

### Business problems

1. Ambiguous Design Communication.
2. Fragmented Order Information.
3. Inconsistent Feasibility and Pricing.
4. Payment and Order State Ambiguity.

### Research/application gaps

1. Vietnamese natural-language cake specification.
2. AI-assisted 2D cake design that becomes an editable specification.
3. Semantic cake recommendation using image-text embeddings.
4. Integration of AI with the bakery operation workflow instead of an isolated AI prototype.

### Canonical integrated flow

`Vietnamese Voice/Text -> STT -> NLP Attribute Extraction -> Structured Cake Specification -> AI 2D Concept -> Canvas Fine-tuning -> Recommendation -> Feasibility -> Pricing -> Payment -> Consultant Approval -> Kitchen -> Decorator/QA Activity -> Delivery/Handoff`

Payment success never automatically approves production. Consultant approval remains mandatory.

## 4. Research Questions And Objectives

| ID | Research Question | Objective |
|---|---|---|
| RQ1/RO1 | How accurately can the speech-to-attribute pipeline extract structured cake attributes from Vietnamese requests? | Build and evaluate Vietnamese speech/text to structured-attribute processing. |
| RQ2/RO2 | How effectively can CLIP vector similarity retrieve visually relevant cake designs? | Build and evaluate CLIP + PostgreSQL/pgvector recommendation. |
| RQ3/RO3 | How accurately can a rule-based engine identify infeasible configurations before approval? | Build and evaluate the Feasibility Engine. |
| RQ4/RO4 | Does the AI-assisted workflow improve completion efficiency and usability over conventional consultation? | Evaluate task time, clarification turns, completion and usability. |
| RQ5/RO5 | Can the architecture satisfy response-time and reliability targets under the expected workload? | Evaluate system performance and responsiveness. |

### Hypotheses and targets

- H1: AI-assisted design reduces task completion time; target improvement is at least 30%.
- H2: CLIP recommendation target is `Precision@5 >= 80%`.
- H3: NLP attribute extraction target is `F1 >= 90%`; ASR is evaluated separately with WER.
- H4: Feasibility Engine target is `F1 >= 90%` on independently reviewed cases.
- H5: Usability target is `SUS >= 75/100`.

Failure to reach a target is a valid research result. Do not alter, hide or manufacture measurements.

## 5. Dataset And Evaluation Baseline

| Dataset | Mentor target | Required controls |
|---|---:|---|
| Vietnamese text descriptions | 200-300 samples | Annotation schema, provenance, deduplication and split. |
| Vietnamese speech | 100-200 audio samples | Speakers, accent/speed/noise coverage, consent and transcript ground truth. |
| Cake images | Minimum 50; target 100-200 if feasible | Source/license manifest, semantic labels and approved catalog status. |
| Feasibility cases | Minimum 100 | Valid, invalid and borderline cases with independent human review. |
| UX participants | 20-30 or a justified feasible sample | Consent, task protocol, counterbalancing and anonymized results. |

Seed, synthetic and placeholder data must be labeled as such and cannot be reported as validated evidence.

### Baselines

- NLP: keyword/rule extraction versus NLP/LLM-assisted extraction.
- Recommendation: category matching and color/category matching versus CLIP embedding + cosine similarity + pgvector/HNSW.
- UX: traditional consultation versus the CustomCakeAI workflow.
- Feasibility: independent manual/expert review versus the rule engine.
- Performance: documented workload and environment versus the stated NFR targets.

### Experiments and metrics

- E1 STT/NLP: WER, Precision, Recall, F1 and Exact Match.
- E2 Recommendation: Top-1, Top-5, Precision@5, Recall@5 and MRR when justified.
- E3 Feasibility: Accuracy, Precision, Recall, F1, false positives and false negatives.
- E4 UX: completion time, clarification turns, completion rate, error rate, Likert satisfaction and SUS.
- E5 Performance: API latency, AI processing time, webhook processing time, throughput, error rate and concurrent workload.
- Continuous values: mean, median, standard deviation and 95% confidence interval.
- Paired UX data: paired t-test when assumptions hold; otherwise Wilcoxon signed-rank test; `alpha = 0.05`.

## 6. Functional Scope

The mentor review defines 20 functional requirement groups:

1. FR01 Multimodal Cake Requirement.
2. FR02 Vietnamese Speech-to-Text.
3. FR03 Cake Attribute Extraction.
4. FR04 AI 2D Blueprint.
5. FR05 AI Provenance.
6. FR06 2D Canvas.
7. FR07 CLIP Recommendation.
8. FR08 Dynamic Pricing.
9. FR09 Feasibility Checking.
10. FR10 Guest Checkout.
11. FR11 VietQR Payment.
12. FR12 Payment Webhook.
13. FR13 Consultant Portal.
14. FR14 Sales Portal.
15. FR15 Kitchen Task Board.
16. FR16 Decor Board and QA evidence.
17. FR17 Customer Tracking.
18. FR18 CRM and reorder.
19. FR19 Admin management.
20. FR20 Audit Trail.

Each final FR must use verifiable wording and trace to actor, PBI, test case and evidence.

## 7. Actors, Roles And Research Ownership

### System actors

- Guest Customer and Registered Customer.
- CONSULTANT: review, CRM, feasibility decision and approval/rejection.
- SALES: web checkout, payment/COD recording and permitted catalog operations.
- KITCHEN: production tasks and BAKING updates.
- DECORATOR: approved blueprint, decoration, completion/QA photo evidence.
- ADMIN/Bakery Owner: staff, roles, catalog, pricing, voucher, intake capacity, audit and reports.
- AI services and payment services are external systems, not human roles.
- QA is an activity/evidence step, not a new staff account unless later approved.
- Delivery is a status/handoff flow; there is no Shipper account in the system.

### Canonical Proposal roles and research streams

| Member | Canonical Proposal role | Mentor research responsibility |
|---|---|---|
| Nguyen Huu Phuc | Project Leader / Scrum Master / Full-stack Developer | Research coordination, architecture and system evaluation. |
| Ta Quoc Thong | Backend Dev & AI Researcher | RQ1 - STT/NLP. |
| Tu Hoang Phi Long | Backend Dev & AI Researcher | RQ2 - CLIP recommendation. |
| Thach Hoai Trang | Frontend / Authentication / UX Researcher | RQ4 - UX/Canvas evaluation. |
| Tran Van Phuc Duy | Backend Developer / QA Engineer | RQ3 feasibility and RQ5 performance. |

## 8. State Machines

**Order:** `DRAFT -> SUBMITTED -> PENDING_REVIEW -> APPROVED -> BAKING -> DECORATING -> READY_FOR_HANDOFF -> OUT_FOR_DELIVERY -> DELIVERED`

**Payment:**

- `PENDING_TRANSFER -> PAID_TRANSFER`
- `AWAITING_COD -> PAID_QR_AT_DELIVERY`
- `AWAITING_COD -> PAID_CASH_CONFIRMED`

Final specifications must add transition guards, authorized actors and failure/cancel/refund handling. No payment state may implicitly move the order to `APPROVED`.

## 9. Architecture Baseline

1. Presentation: Next.js, Tailwind CSS, Konva.js and responsive PWA.
2. API and Security: FastAPI, authentication, JWT/session controls, RBAC and rate limiting.
3. Business Services: pricing, feasibility, order state, payment state and audit.
4. AI/ML: RNNoise, PhoWhisper, NLP/LLM extraction, model gateway for 2D generation and CLIP.
5. Data and Infrastructure: PostgreSQL + pgvector, Redis, Celery, object storage, Docker Compose, Nginx and a deployable environment.

Use an `AIProvider` abstraction for 9router-compatible models. A named model is configuration, not a permanent business dependency. Record provider, model, prompt/version, timestamp and generation metadata.

Recommendation flow: `Text/Image -> CLIP Encoder -> Embedding -> PostgreSQL/pgvector -> optional HNSW -> Cosine Similarity -> Top-5`.

Feasibility flow: `Structured Specification -> Rule Engine -> Size/Tier/Balance/Accessory/Configured Capacity Rules -> Advisory VALID/INVALID -> Consultant Decision`.

Security must cover TLS, authentication, RBAC, rate limiting, secret handling, safe uploads, PII minimization, verified/idempotent payment callbacks and audit records. Do not claim WAF, encryption-at-rest or a provider-specific signature scheme unless implemented and verified.

## 10. Non-Functional Targets

- REST API average latency target: `< 500 ms` under a documented standard workload.
- AI blueprint generation target: `<= 15 s` under documented provider/environment conditions.
- Payment webhook processing target: `<= 30 s`, measured separately from external bank/provider delay.
- Availability target: `>= 99.5%` only when a valid observation method and period exist.
- Usability target: `SUS >= 75/100`.
- Security: HTTPS, authentication, RBAC, rate limiting, verified payment callbacks and secure API-key management.
- Data integrity: independent order/payment states and traceable critical actions.

These are targets inherited from the mentor review, never pre-existing results.

## 11. Product Backlog And Development Plan

- Backlog remains `24 PBI / 156 SP`.
- Mentor-adopted schedule: `15/08/2026 - 25/12/2026`, 19 weeks, 5 Sprints.

| Sprint | Weeks | Focus | SP |
|---|---:|---|---:|
| 1 | 1-3 | Research Foundation + Requirements + Dataset | 30 |
| 2 | 4-7 | AI Core + Canvas + Recommendation | 38 |
| 3 | 8-11 | Customer + Payment + Feasibility | 35 |
| 4 | 12-15 | Bakery Operation + Integration | 31 |
| 5 | 16-19 | Evaluation + Optimization + Documentation | 22 |
| Total | 19 weeks |  | 156 |

The old `57/42/39/18` four-Sprint allocation is superseded. Future backlog documents must map every PBI into the five-Sprint allocation without changing the total unless a later decision is recorded.

## 12. Testing, Risks And Responsible AI

### Testing

- Unit: pricing, feasibility, parser, state transitions and payment validation.
- Integration: frontend, FastAPI, database and AI services.
- API: authentication, authorization, order, payment and webhook.
- Performance: response time, throughput, concurrency, CPU and memory.
- Security: JWT/session controls, RBAC, unauthorized access, callback verification and rate limiting.
- UAT: real business scenarios with documented participants and evidence.

### Mentor risk set

1. Vietnamese ASR errors.
2. Infeasible AI blueprint.
3. Copyright and provenance.
4. Poor CLIP recommendation.
5. Payment webhook failure or replay.
6. Project overload.
7. Data privacy.
8. Performance limits.
9. Dataset too small or weakly labeled.
10. User-study unavailability.

### Responsible AI

- Mark AI images as `AI-generated Concept Draft`.
- Preserve provider/model/prompt/timestamp/generation metadata.
- Do not remove or conceal provider watermark, SynthID or copyright information.
- AI does not authorize production; Consultant is human-in-the-loop.
- Minimize voice, image, phone, address and order data; restrict access by role.
- Cash-pull requests remain an optional edge-case for parsing, pricing and financial separation, not the project objective.

## 13. Expected Contributions, Deliverables And Limitations

### Expected research contributions

1. Vietnamese cake-attribute extraction pipeline and evaluation.
2. CLIP + pgvector semantic cake recommendation.
3. Integrated natural-language -> AI concept -> Canvas -> feasibility workflow.
4. Human-in-the-loop AI decision model.
5. Empirical evaluation with baselines, metrics and statistical analysis.

### Expected deliverables

1. Responsive Web/PWA software product.
2. STT/NLP/generation/CLIP/feasibility AI pipeline.
3. PostgreSQL + pgvector database.
4. FastAPI REST backend.
5. Docker Compose + Nginx deployment package.
6. Proposal, SRS, SAD, database design, API specification, STP and traceability documents.
7. Text, audio, image and feasibility evaluation datasets with annotations.
8. RQ1-RQ5 experimental results and logs.
9. Final report with methodology, results, discussion and limitations.
10. End-to-end demonstration and defense materials.

### Declared limitations

- Capstone-scale datasets are smaller than commercial datasets.
- Results depend on pretrained models and external AI services.
- Participant samples may not represent all customers.
- Feasibility rules may be bakery-specific.
- AI output is a 2D concept draft, not a 3D model or official production drawing.
- Payment integration may use sandbox/test conditions.

## 14. Success And Traceability Rules

Software success requires an end-to-end core flow, expected backlog completion and no unresolved Critical/Blocker defects at acceptance. Story points are planning estimates, not scientific quality evidence.

Research completion requires dataset documentation, baselines, experimental design, quantitative metrics, reproducible results, statistical analysis, limitations and explicit answers to RQ1-RQ5.

Maintain both chains:

- `Business Problem -> Research Gap -> RQ -> RO -> Hypothesis -> Dataset -> Baseline -> Experiment -> Metric -> Result -> Finding`
- `Business Function -> FR/NFR -> Actor/User Story -> PBI -> Architecture Component -> Test Case -> Evidence`

## 15. Hard Boundaries For Agents

- Do not touch `C:\xampp\htdocs\CAPSTONE1\Thay_DUC`.
- Do not rewrite the Proposal unless explicitly requested; this baseline prepares that later revision.
- Do not create a hardware POS/KDS, native mobile app, IoT oven controller, printer driver, ingredient inventory or food-safety system.
- Use Web Checkout, Sales Portal, Kitchen Task Board, Decor Board, Order Management Portal and Admin Dashboard.
- Do not invent measured results, participants, datasets, approvals, signatures or deployed infrastructure.
- Do not silently copy numbering errors from the review: its missing section 24 and mislabeled section 32 are editorial defects, not project requirements.
