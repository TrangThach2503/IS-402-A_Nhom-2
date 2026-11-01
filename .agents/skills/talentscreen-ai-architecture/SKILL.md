---
name: talentscreen-ai-architecture
description: Design or review TalentScreen AI architecture using the local course theory, Architecture Drivers, ADD, C4, quality attributes, constraints, and ADRs.
---

# TalentScreen AI Architecture

Before making an architecture claim, read:

- `TalentScreen_AI/docs/architecture/00-course-theory/ARCHITECTURE_SOURCE_INDEX.md`
- `TalentScreen_AI/docs/architecture/00-course-theory/ARCHITECTURE_KNOWLEDGE_BASE.md`
- the cited source page/slide in `KIEN_TRUC/`
- the relevant driver, ADD, C4, security, RAG, or evaluation document

Use the required flow: Functional Requirements + Quality Attributes +
Constraints -> Attribute-Driven Design -> ADD iteration -> Core Architecture ->
C4 views -> implementation and verification.

Baseline architecture: one HR operator, modular monolith, Next.js frontend,
FastAPI backend, PostgreSQL source of truth, bounded JSONB AI read model, and a
replaceable 9Router-compatible provider. Do not introduce microservices,
MongoDB, vector databases, queues, or a second operational database without a
measured quality-attribute justification and an ADR.

Every diagram must state technology, responsibility, protocol, assumptions,
and the source slide/page used. Keep C4 levels separate and preserve the
editable Draw.io artifacts under `TalentScreen_AI/docs/architecture/diagrams/`.
