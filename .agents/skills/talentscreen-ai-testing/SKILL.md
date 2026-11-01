---
name: talentscreen-ai-testing
description: Verify TalentScreen AI with OpenAPI/Swagger, database integrity, end-to-end CV linkage, AI regression cases, privacy checks, and Docker release validation.
---

# TalentScreen AI Testing

Start with `TalentScreen_AI/docs/api/swagger.json` as the API contract and the
tests under `TalentScreen_AI/backend/tests/`.

Minimum verification for an upload change:

1. Upload each fixture and verify one source file has one exact screening item.
2. Verify source filename, candidate profile, score, batch, review queue, and
   profile route all point to the same opaque ID.
3. Verify no record is selected by index or sorting position.
4. Verify completed, failed, duplicate, unsupported-format, and incomplete-AI
   states are distinct and visible.
5. Verify deterministic score arithmetic and missing/unknown evidence.
6. Verify PII is absent from remote payloads and logs.
7. Regenerate and validate Swagger after API changes.

Use focused pytest, `alembic check`, `scripts.export_openapi`, frontend
typecheck/lint, and the documented smoke/release scripts. Docker release tests
must use separate named volumes and must never delete the development volume.
