---
name: talentscreen-ai-database
description: Design and maintain TalentScreen AI PostgreSQL tables, relationships, JSONB screening read models, Alembic migrations, Navicat workflows, and integrity constraints.
---

# TalentScreen AI Database

PostgreSQL 16 is the only operational source of truth. Navicat is a client for
inspection and queries; it does not replace SQLAlchemy models or Alembic.

Read `TalentScreen_AI/docs/architecture/03-data-security/DATABASE_ARCHITECTURE.md`
and `TalentScreen_AI/docs/database/NAVICAT_POSTGRESQL_SETUP.md` first.

Rules:

- Keep normalized identity and integrity data relational.
- Use `screening_documents.payload` only as the bounded per-CV AI read model.
- Add foreign keys, uniqueness constraints, indexes, and cascade behavior
  deliberately.
- Preserve exact source filename/provenance without making it the identity.
- Use Alembic for schema changes; do not manually patch production tables in
  Navicat.
- Never log or commit real CV contents, PII, or `.env` secrets.

Verify with `alembic check`, focused database tests, schema export, and queries
that prove every uploaded file has one exact downstream result or an explicit
failure state.
