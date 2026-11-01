---
name: talentscreen-ai-project
description: Project-specific orchestration for the TalentScreen AI single-HR CV screening capstone. Use when starting work, reloading context, planning a feature, or coordinating architecture, frontend, backend, database, AI grounding, privacy, and testing changes.
---

# TalentScreen AI Project Orchestrator

## Mandatory reload

Project root: `C:/xampp/htdocs/CAPSTONE1/Thay_DUC/TalentScreen_AI`.
Read, in order:

1. `C:/xampp/htdocs/CAPSTONE1/Thay_DUC/AGENTS.md`
2. `docs/project-standards/AGENT_RELOAD_CONTEXT.md`
3. `docs/project-standards/TECHNOLOGY_LANGUAGE_STANDARD.md`
4. `docs/project-standards/PROJECT_CONTEXT_GUARDRAIL.md`
5. The relevant local architecture source under `docs/architecture/`

Before doing work, classify the request as IN_SCOPE, PROJECT_RELATED_BUT_UNCLEAR,
or OUT_OF_SCOPE. For OUT_OF_SCOPE requests, use the prescribed response from
`PROJECT_CONTEXT_GUARDRAIL.md`; do not browse, edit files, or invent a project
connection.

The authoritative theory PDFs and slides are in `C:/xampp/htdocs/CAPSTONE1/Thay_DUC/KIEN_TRUC`.

## Routing

- Architecture or C4: use `talentscreen-ai-architecture`.
- Stitch screen, route, UI, or VI/ENG: use `talentscreen-ai-frontend`.
- FastAPI endpoint, schema, service, or error: use `talentscreen-ai-backend-api`.
- PostgreSQL, Alembic, Navicat, or schema: use `talentscreen-ai-database`.
- RAG, prompt, evidence, model output, or privacy boundary: use `talentscreen-ai-rag-grounding`.
- Regression, Swagger, smoke, integration, or release validation: use `talentscreen-ai-testing`.

## Global invariant

Do not identify a candidate by filename, display name, array index, or table
position. Preserve exact linkage from source CV to screening document, candidate
profile, score, batch, results, and comparison using opaque IDs and foreign keys.
