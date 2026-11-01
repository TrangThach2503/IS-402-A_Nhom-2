---
name: talentscreen-ai-rag-grounding
description: Design or review TalentScreen AI CV extraction, RAG/evidence grounding, prompt versions, privacy boundaries, provider adapters, and model regression evaluation.
---

# TalentScreen AI RAG And Grounding

This project does not fine-tune a third-party model on real candidate CVs.
Quality improvement uses versioned prompts, a fixed output schema, local
redaction, bounded JSONB context, deterministic scoring, synthetic/consented
regression cases, and human review.

Read `TalentScreen_AI/docs/architecture/04-ai-rag/RAG_AND_FEEDBACK_TRAINING.md`
and `docs/architecture/03-data-security/SECURITY_AND_PRIVACY.md` before changes.

Rules:

- AI output is untrusted evidence, not truth.
- Remote payloads come only from `screening_documents.payload`; do not join
  arbitrary relational data into prompts.
- Remove direct PII and the original filename before remote calls.
- Use `store=false`; do not use provider File API, explicit caching, Search, or
  Maps grounding for CV processing.
- `strict_local` blocks remote providers. `redacted_remote` is not proof of
  zero retention.
- Missing or ambiguous facts remain unknown and are reviewable.
- Never infer location from school/employer location or education duration as
  work experience.
- Recompute skills, criteria, score, and recommendation in backend code.
- Model/provider changes must pass the same grounding and regression suite.

Do not claim 100% model accuracy. Report measurable extraction coverage,
grounding violations, deterministic-score agreement, and unresolved review
cases.
