---
name: talentscreen-ai-backend-api
description: Implement or review TalentScreen AI FastAPI routes, Pydantic contracts, services, deterministic linkage, errors, trace IDs, and OpenAPI updates.
---

# TalentScreen AI Backend API

Read the relevant FastAPI feature module, SQLAlchemy model, schema, service,
test, and `TalentScreen_AI/docs/api/swagger.json` before changing behavior.

Rules:

- Keep route modules organized under `backend/app/features/`.
- Use explicit Pydantic request and response schemas.
- Use database foreign keys and opaque IDs for source CV -> screening run ->
  candidate profile -> result linkage.
- Return one shared error shape with `code`, `message`, `details`, and `traceId`.
- Do not put candidate PII or CV text in logs or error details.
- A model-reported score is never authoritative; deterministic backend scoring
  owns totals and recommendation thresholds.
- Update `docs/api/swagger.json` whenever an endpoint or schema changes.

Run focused pytest coverage, API smoke checks, and OpenAPI regeneration after
implementation.
