# RISK AND EVIDENCE CHECKLIST - CUSTOMCAKEAI
> Updated: 05/09/2026 - synchronized with mentor review.
> Plan: 19 weeks, 5 Sprints, 24 PBI, 156 SP.

## Risk Register

| ID | Risk | Probability | Impact | Mandatory mitigation | Closure evidence |
|---|---|---:|---:|---|---|
| R-01 | Vietnamese ASR fails on accent, speed or noise | High | High | RNNoise/PhoWhisper candidate, transcript confirmation and text fallback | Licensed/consented audio set, WER by condition and error analysis |
| R-02 | NLP extracts incorrect or missing cake attributes | High | High | Editable structured fields, ambiguity handling and rule baseline | 200-300 annotated samples, Precision/Recall/F1/Exact Match |
| R-03 | AI concept is attractive but infeasible | High | High | Constrained prompt, concept-draft label, rule checks and Consultant approval | Independent feasibility rubric and reviewed cases |
| R-04 | CLIP recommendation is irrelevant | Medium-High | High | Category/color baselines, verified embeddings and relevance labels | P@5/R@5 report, query set and reviewer agreement |
| R-05 | Feasibility evaluation is circular | High | High | Independent human ground truth; separate rule specification from labels | 100 valid/invalid/borderline cases with reviewer record |
| R-06 | Dataset is too small, unlicensed or weakly labeled | High | High | Collect early, preserve provenance, two-person label audit and leakage-safe splits | Dataset cards, license manifest, annotation guide and split report |
| R-07 | User study cannot recruit enough participants | Medium | Medium-High | Recruit early, prepare consent/tasks and document fallback expert review as limited evidence | Participant log, anonymized raw data and limitation statement |
| R-08 | External model/9router changes, fails or costs too much | High | High | AIProvider abstraction, timeout/retry, budget limit and catalog fallback | Adapter tests, cost/latency log and failure demo |
| R-09 | Payment callback is forged, delayed or repeated | Medium | High | Verify actual provider mechanism, idempotency, unique transaction and reconciliation | Provider documentation plus replay/invalid/integration tests |
| R-10 | Voice, image, phone or address data leaks | Medium | High | Minimize PII, consent/retention, RBAC, secure secrets and safe logging | Data-flow/privacy review and authorization tests |
| R-11 | Copyright/provenance violation | Medium-High | High | Licensed sources, source manifest, AI disclosure and preserved watermark/SynthID | License/provenance records and UI evidence |
| R-12 | Scope drifts to hardware POS/KDS, Shipper or physical production control | Medium | High | Enforce Web/PWA boundary and change-control gate | Architecture/backlog audit with no unapproved scope |
| R-13 | Cash-pull edge case becomes the project headline | Medium | Medium-High | Keep it only in parsing/pricing/financial-separation tests | Proposal/objectives contain no cash-pull headline |
| R-14 | Five-Sprint plan is not reflected in backlog/documents | High | High | Preserve the capacity guideline, document the approved PBI mapping, and map every PBI exactly once | Cross-document mapped PBI totals equal 28/42/37/31/18 = 156; capacity guideline remains 30/38/35/31/22 |
| R-15 | Performance targets are reported without controlled tests | High | High | Record hardware, workload, warm/cold state and provider delay separately | Reproducible load scripts, raw logs and summary statistics |
| R-16 | Research target is fabricated as a result | Medium | Critical | Separate target/result fields and require raw evidence review | Signed result sheet, scripts, logs and immutable source artifacts |
| R-17 | Project overload across AI, Web, payment and research | High | High | Protect core flow, prioritize Must-Have and review scope each Sprint | Sprint review decisions, backlog changes and burndown |
| R-18 | Git/Jira/Postman evidence is missing | High | High | Start in Sprint 1 and assign owners | Repository, Jira board, Postman collection and member activity |
| R-19 | Documentation numbering/traceability drifts | High | Medium-High | Dual traceability matrix and release checklist | Versioned matrix with no orphan RQ/FR/PBI/test |
| R-20 | Security claims exceed implementation | Medium | High | Do not claim WAF, encryption-at-rest or signature algorithms without verification | Security architecture, config and test evidence |

## Mentor Research Gates

- [ ] Four business problems and four research gaps are stated with evidence.
- [ ] RQ1-RQ5 map to RO1-RO5, hypotheses, datasets, baselines, experiments and metrics.
- [ ] E1 covers STT/NLP and reports WER separately from NLP F1.
- [ ] E2 covers CLIP recommendation with independently labeled relevance.
- [ ] E3 uses independently reviewed feasibility ground truth.
- [ ] E4 has consent, comparable tasks and counterbalancing for UX.
- [ ] E5 documents environment, workload, latency, throughput and error rate.
- [ ] Continuous results include mean/median/SD/95% CI where appropriate.
- [ ] Paired tests use paired t-test or Wilcoxon according to assumptions.
- [ ] Negative results and limitations are retained.

## Engineering Gates

- [ ] Plan is 5 Sprints; mapped PBI totals are 28/42/37/31/18 = 156 SP and the separate capacity guideline is 30/38/35/31/22.
- [ ] Every PBI maps to one Sprint and acceptance evidence.
- [ ] Order and payment state machines remain independent.
- [ ] Payment does not automatically approve production.
- [ ] Human roles are Customer, CONSULTANT, SALES, KITCHEN, DECORATOR and ADMIN.
- [ ] QA is an activity; no QA or Shipper account is introduced.
- [ ] No hardware POS/KDS, native app, oven, printer or food-safety scope appears.
- [ ] AIProvider isolates generation models and records provenance.
- [ ] PostgreSQL + pgvector is used for official vector retrieval.
- [ ] Security covers RBAC, safe uploads, PII, callbacks, secrets and audit.
- [ ] Git, Jira, Postman and test evidence have owners.

## Dataset Gates

- [ ] Text target: 200-300 annotated Vietnamese descriptions.
- [ ] Audio target: 100-200 samples with speaker/accent/noise metadata.
- [ ] Image target: at least 50, preferably 100-200 licensed cake images.
- [ ] Feasibility target: at least 100 valid/invalid/borderline cases.
- [ ] UX target: 20-30 participants or a justified feasible sample.
- [ ] Seed, synthetic and placeholder assets are explicitly labeled.
- [ ] No random 16-dimensional vector is reported as CLIP evidence.
- [ ] Cash-pull remains an optional edge-case field.
- [ ] Data provenance, license, annotation and split are documented.

## Release Gate

Block release if any of these remains true:

1. A document still uses the superseded four-Sprint allocation as current.
2. A target is written as an achieved result without raw evidence.
3. Proposal, Project Plan, backlog and traceability totals disagree.
4. Feasibility ground truth is generated by the same rule engine under test.
5. AI images or dataset images lack provenance/license handling.
6. Payment approval and production approval are conflated.
7. Unapproved hardware/actor scope is reintroduced.
8. Critical/Blocker defects remain open at acceptance.
