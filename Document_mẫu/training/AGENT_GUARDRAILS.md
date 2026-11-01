# AGENT GUARDRAILS - CUSTOMCAKEAI
> Updated: 08/09/2026 - synchronized with mentor review and Office-document workflow.

## Source And Schedule

- Load `MENTOR_REVIEW_BASELINE.md` before generating project artifacts.
- Current plan: 19 weeks, 5 Sprints, 24 PBI and 156 SP.
- Sprint SP: Kế hoạch năng lực `30 / 38 / 35 / 31 / 22`; ánh xạ 24 PBI chi tiết là `28 / 42 / 37 / 31 / 18` (Tổng 156 SP).
- The old 16-week/four-Sprint allocation is historical.
- Current work order: `Project Plan -> Product Backlog -> User Stories -> C4 -> Database Design -> Implementation`.

## Product Boundary

- Browser-based Web/PWA product.
- Core: Vietnamese Voice/Text -> STT/NLP -> structured specification -> AI 2D concept -> Canvas -> recommendation -> feasibility -> pricing/order workflow.
- Internal views: Consultant Portal, Sales/Web Checkout, Kitchen Task Board, Decor Board and Admin Dashboard.
- No hardware POS/KDS, native mobile app, IoT oven, printer driver or physical production control.
- No ingredient inventory, expiry, hygiene, nutrition or public-health compliance management.

## Actors And State

- Human roles: Guest/Registered Customer, CONSULTANT, SALES, KITCHEN, DECORATOR and ADMIN.
- No Shipper account. No separate QA account; QA is a workflow activity/evidence step.
- Payment state is independent from order state.
- A paid order still requires Consultant feasibility approval before production.

## Research Integrity

- CustomCakeAI is an Applied Experimental Research Capstone as well as a software project.
- Every AI claim needs a documented dataset, baseline, experiment, metric and reproducible result.
- Values such as 30% improvement, P@5 80%, F1 90%, SUS 75, API 500 ms, AI 15 s, webhook 30 s and availability 99.5% are targets, not results.
- Report negative and inconclusive results honestly.
- Feasibility labels require independent human review; do not generate ground truth from the same code under test.
- Seed, synthetic, placeholder and random vectors are never validated evidence.

## AI And Data

- Use PostgreSQL + pgvector as the official vector store.
- Use AIProvider for 9router-compatible generation models.
- Preserve provider, model, prompt/version, timestamp and generation metadata.
- Do not remove or conceal provider watermark, SynthID or copyright information.
- Use licensed images and document dataset provenance.
- Minimize voice, image, phone, address and order data sent to external providers.
- Cash-pull cake is an optional parsing/pricing/financial-separation edge case, not the objective or innovation.

## Wording

- Use `AI-generated Concept Draft`, `AI-assisted`, `customize`, `fine-tune` and `expected deliverables`.
- Use `target`, `designed to`, `expected` and `measured under documented conditions`.
- Do not use `100%`, guaranteed accuracy/latency/savings, professional production drawing or full physical bakery automation.

## Traceability

- Research: `Problem -> Gap -> RQ -> RO -> Hypothesis -> Dataset -> Baseline -> Experiment -> Metric -> Result`.
- Engineering: `Business Function -> FR/NFR -> Actor/Story -> PBI -> Component -> Test -> Evidence`.
- Record material changes in `DECISION_LOG.md`.
- Never touch `C:\xampp\htdocs\CAPSTONE1\Thay_DUC`.

## Office Documents

- Load `OFFICE_DOCUMENT_SKILLS_BASELINE.md` and `.agents/skills/capstone-office-documents/SKILL.md` for DOCX/XLSX work.
- Existing school/source templates override generic typography, colors, table styles and layout suggestions.
- Preserve cover, TOC fields, headings, margins, sections, headers/footers, tables, images and Excel formulas unless the user explicitly changes them.
- Reopen and visually verify final Office files; use hidden Word/Excel COM on Windows for high-fidelity refresh and recalculation when needed.
