# CAPSTONE1 TRAINING DATA - CUSTOMCAKEAI C1SE.81
> Synchronized: 08/09/2026
> Detailed authority: `MENTOR_REVIEW_BASELINE.md`

## Project Snapshot

| Field | Current value |
|---|---|
| Project | CustomCakeAI - 2D Birthday Cake Personalization Platform |
| Team | C1SE.81 - five members |
| Courses | CMU-SE 450 and CMU-IS 450 |
| Mentor/PO | MSc. Nguyen Dang Quang Huy |
| Dates | 15/08/2026-25/12/2026 |
| Plan | 19 weeks, 5 Sprints |
| Backlog | 24 PBI / 156 SP |
| Method | Scrum + Applied Experimental Research |
| Status | Proposal baseline stabilized; Project Plan -> Product Backlog -> User Stories is the current preparation sequence |

## Sprint Plan

| Sprint | Weeks | Focus | SP |
|---|---:|---|---:|
| 1 | 1-3 | Research Foundation + Requirements + Dataset | 30 |
| 2 | 4-7 | AI Core + Canvas + Recommendation | 38 |
| 3 | 8-11 | Customer + Payment + Feasibility | 35 |
| 4 | 12-15 | Bakery Operation + Integration | 31 |
| 5 | 16-19 | Evaluation + Optimization + Documentation | 22 |

The earlier four-Sprint allocation is superseded. Do not use it as current planning data.

Current artifact order: `Project Plan -> Product Backlog -> User Stories -> C4 Model -> Database Design -> Implementation`. C4 and database gates remain mandatory before core implementation.

## Problem And Gap

Business problems:

1. Ambiguous design communication.
2. Fragmented order information.
3. Inconsistent feasibility and pricing.
4. Payment/order state ambiguity.

Research/application gaps:

1. Vietnamese natural-language cake specification.
2. AI-assisted 2D design converted into an editable specification.
3. Semantic image/text cake recommendation.
4. Integrated AI plus bakery operation workflow.

## Canonical Product Flow

`Voice/Text -> STT -> NLP -> Structured Cake Specification -> AI 2D Concept -> Canvas -> Recommendation -> Feasibility -> Pricing -> Payment -> Consultant Approval -> Kitchen -> Decorator/QA Evidence -> Handoff/Delivery`

Rules:

- Payment and order states remain independent.
- Consultant decides production feasibility.
- QA is an activity, not a separate account.
- Delivery is a handoff/state flow; no Shipper account.
- AI output is a concept draft, not a production drawing.

## Research Matrix

| RQ | Focus | Dataset | Baseline | Main metrics | Target |
|---|---|---|---|---|---|
| RQ1 | Vietnamese STT/NLP | 200-300 text; 100-200 audio | Keyword/rule | WER, P/R/F1, Exact Match | NLP F1 >=90% |
| RQ2 | CLIP recommendation | 50 minimum; 100-200 preferred images | Category and color/category | Top-K, P@5, R@5, optional MRR | P@5 >=80% |
| RQ3 | Feasibility | At least 100 reviewed cases | Independent manual/expert review | Accuracy, P/R/F1, FP/FN | F1 >=90% |
| RQ4 | UX | 20-30 participants or justified sample | Traditional consultation | Time, turns, completion, errors, SUS | SUS >=75; time improvement target >=30% |
| RQ5 | Performance | Documented load scenarios | Stated architecture/NFR targets | Latency, throughput, errors, concurrency | API <500 ms under stated conditions |

All target values are hypotheses/thresholds. They are not achieved results.

## Statistical Evaluation

- Report mean, median, standard deviation and 95% confidence interval for continuous values.
- Use paired t-test for paired data when assumptions hold.
- Otherwise use Wilcoxon signed-rank test.
- Significance level target: alpha = 0.05.
- Preserve raw data, scripts, environment and model/version information.
- Report negative, failed and inconclusive findings.

## Functional Requirement Groups

1. Multimodal Cake Requirement.
2. Vietnamese Speech-to-Text.
3. Cake Attribute Extraction.
4. AI 2D Blueprint.
5. AI Provenance.
6. 2D Canvas.
7. CLIP Recommendation.
8. Dynamic Pricing.
9. Feasibility Checking.
10. Guest Checkout.
11. VietQR Payment.
12. Payment Webhook.
13. Consultant Portal.
14. Sales Portal.
15. Kitchen Task Board.
16. Decor Board and QA evidence.
17. Customer Tracking.
18. CRM and reorder.
19. Admin.
20. Audit Trail.

Every FR must trace to an actor, PBI, architecture component, test case and evidence.

## Actors And Permissions

| Actor | Scope |
|---|---|
| Guest/Registered Customer | Describe, fine-tune, submit, pay and track authorized data |
| CONSULTANT | Review AI/specification bundle, clarify, assess feasibility and approve/reject |
| SALES | Web checkout, permitted catalog operations and payment/COD recording |
| KITCHEN | View approved tasks and update BAKING |
| DECORATOR | View approved blueprint, decorate, upload completion/QA evidence |
| ADMIN | Manage staff/roles, catalog, pricing, voucher, configured capacity, reports and audit |
| External AI/Payment | External systems, never human staff roles |

## Team Roles And Research Responsibility

Current canonical roles follow the revised Proposal role table in `PROPOSAL/CAP1_nhom81.docx`.

| Member | Canonical Proposal role | Research responsibility |
|---|---|---|
| Nguyen Huu Phuc | Project Leader / Scrum Master / Full-stack Developer | Coordination, architecture, system evaluation |
| Ta Quoc Thong | Backend Dev & AI Researcher | RQ1 |
| Tu Hoang Phi Long | Backend Dev & AI Researcher | RQ2 |
| Thach Hoai Trang | Frontend / Authentication / UX Researcher | RQ4 |
| Tran Van Phuc Duy | Backend Developer / QA Engineer | RQ3 and RQ5 |

## Architecture

- Presentation: Next.js, Tailwind CSS, Konva.js and responsive PWA.
- API/Security: FastAPI, authentication, JWT/session controls, RBAC and rate limiting.
- Business: pricing, feasibility, order, payment and audit.
- AI/ML: RNNoise, PhoWhisper, NLP/LLM, AIProvider/9router-compatible generation and CLIP.
- Data/Infrastructure: PostgreSQL + pgvector, Redis, Celery, object storage, Docker Compose and Nginx.

Do not hard-code business logic to one generation model. HNSW/vector dimension must match the selected embedding model and benchmark.

## State Machines

Order:

`DRAFT -> SUBMITTED -> PENDING_REVIEW -> APPROVED -> BAKING -> DECORATING -> READY_FOR_HANDOFF -> OUT_FOR_DELIVERY -> DELIVERED`

Payment:

- `PENDING_TRANSFER -> PAID_TRANSFER`
- `AWAITING_COD -> PAID_QR_AT_DELIVERY`
- `AWAITING_COD -> PAID_CASH_CONFIRMED`

Final SRS must define guards, authorized actors, cancellation/refund/failure paths and audit events.

## Responsible AI And Security

- Display AI output as an AI-generated concept draft.
- Store provider/model/prompt/version/timestamp/generation metadata.
- Preserve provider watermark/SynthID and copyright information.
- Use licensed image data and document provenance.
- Minimize PII sent to external AI services.
- Use role-aware access, safe uploads, secrets management, rate limiting and audit.
- Verify the payment provider's actual callback authentication mechanism.
- Use idempotency and replay protection.
- Do not claim WAF, encryption-at-rest or availability without implementation evidence.

## Testing

- Unit: parser, pricing, feasibility, state transitions and payment validation.
- Integration: frontend, FastAPI, database and AI services.
- API: auth, authorization, orders, payment and callbacks.
- Performance: latency, throughput, concurrency, CPU and memory.
- Security: access control, replay/invalid callbacks, rate limiting and safe uploads.
- UAT: documented business scenarios and participants.

## Expected Deliverables

1. Responsive Web/PWA product.
2. AI pipeline.
3. PostgreSQL + pgvector database.
4. FastAPI backend.
5. Docker/Nginx deployment package.
6. Proposal/SRS/SAD/database/API/STP/traceability documents.
7. Research datasets and annotations.
8. RQ1-RQ5 experimental logs and results.
9. Final report with discussion and limitations.
10. End-to-end demo and defense materials.

## Limitations

- Capstone-scale datasets.
- Dependency on pretrained/external AI services.
- Limited participant representativeness.
- Bakery-specific feasibility rules.
- 2D concept draft, not official 3D/production design.
- Payment may be evaluated in sandbox/test conditions.

## Non-Negotiable Boundaries

- Never touch `C:\xampp\htdocs\CAPSTONE1\Thay_DUC`.
- No hardware POS/KDS, native app, printer driver, oven/IoT or food-safety system.
- No Shipper/QA account.
- Cash-pull cake is an optional edge case.
- No fabricated results or unmeasured guarantees.
- No seed/synthetic/placeholder evidence represented as validated research.
- Preserve AI provenance and watermark/SynthID.
- For Word/Excel, load `OFFICE_DOCUMENT_SKILLS_BASELINE.md` and preserve the source template before applying generic skill defaults.
