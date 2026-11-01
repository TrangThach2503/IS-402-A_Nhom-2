# C4 AND DATABASE DESIGN BASELINE - CUSTOMCAKEAI C1SE.81
> Adopted: 07/09/2026
> Purpose: mandatory architecture and data-design guardrail before implementation.
> Status: method and quality gates are approved; the final C4 model and database schema remain provisional until the project owner provides detailed requirements.

## 1. Authority And Skill Sources

Project source-of-truth always overrides a generic skill. Agents must load the project baseline before using any installed skill.

Installed project skills:

1. `.agents/skills/c4designer/`
   - Upstream: `https://github.com/muthub-ai/c4-skills/tree/main/c4designer`
   - License: MIT.
   - Purpose: C4 Context, Container, Component and review workflows.
2. `.agents/skills/database-schema-designer/`
   - Upstream: `https://github.com/OneWave-AI/claude-skills/tree/main/database-schema-designer`
   - License: MIT at repository level.
   - Purpose: ERD, relationships, DDL, indexes and reversible migrations.
3. `.agents/skills/postgresql-table-design/`
   - Upstream source: `wshobson/agents`, mirrored through `davila7/claude-code-templates` because the upstream installer path was unavailable on 07/09/2026.
   - Upstream plugin license: MIT.
   - Purpose: PostgreSQL-specific types, constraints, indexes, pgvector and safe schema evolution.

Canonical technical references:

- C4 Model: `https://c4model.com/diagrams`
- C4 checklist: `https://c4model.com/diagrams/checklist`
- Structurizr DSL: `https://docs.structurizr.com/dsl`
- PostgreSQL data definition: `https://www.postgresql.org/docs/current/ddl.html`
- PostgreSQL constraints: `https://www.postgresql.org/docs/current/ddl-constraints.html`
- pgvector: `https://github.com/pgvector/pgvector`

## 2. Required Skill Routing

For C4 design or review:

1. Load this baseline and the project source-of-truth files.
2. Load `.agents/skills/c4designer/SKILL.md` in full.
3. Load only the mode file required by the task: design, document-code, document-prose, review or update.
4. Use `.agents/skills/c4designer/review-checklist.md` before delivery.

For database design or review:

1. Load this baseline and the project source-of-truth files.
2. Load `.agents/skills/database-schema-designer/SKILL.md` and its required references.
3. Load `.agents/skills/postgresql-table-design/SKILL.md` for the PostgreSQL audit pass.
4. Resolve any conflict in favor of this project baseline and official PostgreSQL documentation.

## 3. C4 Modeling Rules

### 3.1 Required views

- Level 1 System Context is required.
- Level 2 Container is required before implementation.
- Level 3 Component is optional and should be created only for a complex or high-risk container, such as the FastAPI backend or asynchronous AI worker.
- Level 4 Code diagrams are not required unless explicitly requested.
- Supporting Dynamic and Deployment diagrams may be added when they answer a concrete integration, state, security or deployment question.

### 3.2 Abstraction rules

- Do not mix people, software systems, containers, components and classes at the same C4 level.
- Context shows people and external software systems around one CustomCakeAI software system. It must not show PostgreSQL, Redis, Celery, FastAPI, Next.js or internal services.
- Container shows independently running/deployable applications and data stores inside the CustomCakeAI boundary. It must not use actor names as containers.
- Component zooms into one container only. It must not duplicate the whole system.
- Every relationship is unidirectional, has a concrete intent and matches the arrow direction.
- Inter-container relationships state a protocol or mechanism when known.
- Every diagram has a title, scope, legend, element descriptions, relationship table and explicit assumptions.
- Do not use color, shape or icon as the only carrier of meaning.

### 3.3 Canonical Context actors and external systems

Human actors:

- Guest Customer.
- Registered Customer.
- CONSULTANT.
- SALES.
- KITCHEN.
- DECORATOR.
- ADMIN/Bakery Owner.

External systems, subject to confirmation during detailed design:

- AI model services through AIProvider/9router-compatible adapters.
- Payment provider/bank integration for VietQR and payment callbacks.
- Google Maps or approved mapping service for address/distance/fee support.
- SMTP/email service for notifications and evidence delivery.

There is no Shipper or QA account. QA is an authorized activity/evidence step. Delivery is a status/handoff flow.

### 3.4 Provisional Container candidates

The following are candidates, not final decisions:

- Responsive Web/PWA presentation application.
- FastAPI backend application.
- Asynchronous worker for AI and notification jobs.
- PostgreSQL database with pgvector.
- Redis broker/cache.
- Object storage for audio, reference images, generated concepts and completion evidence.

Nginx, Docker and Cloud VPS usually belong in Deployment rather than being presented as business containers. The final boundary and deployment topology require user confirmation.

### 3.5 Preferred source format

- Prefer Structurizr DSL as the long-lived source when multiple consistent C4 views are needed.
- Mermaid is acceptable for quick Markdown review but its C4 syntax must be rendered and validated in the target viewer.
- Draw.io and PNG may be retained as presentation artifacts; they do not override the textual source-of-truth or validated model.
- Never replace or rewrite existing diagrams until the user explicitly approves the revised model.

## 4. Database Design Workflow

Agents must not jump directly from feature prose to `CREATE TABLE` statements.

1. Domain discovery: actors, use cases, state transitions, ownership and data sensitivity.
2. Business invariants: rules that must remain true regardless of UI or service implementation.
3. Conceptual model: entities and high-level relationships without PostgreSQL details.
4. Logical model: attributes, cardinalities, optionality, candidate keys and normalization to 3NF.
5. Physical model: PostgreSQL types, PK/FK/UNIQUE/CHECK constraints, delete behavior and indexes.
6. Vector model: embedding ownership, provider/model/version, dimension, distance operator and re-embedding policy.
7. Migration plan: ordered up migration, safe rollback/down strategy and seed separation.
8. Validation: representative inserts, invalid-case tests, query-path review and `EXPLAIN` evidence when implementation exists.
9. Traceability: map tables and constraints to FR/NFR, PBI, architecture component and tests.

Required deliverables before implementation:

- Domain glossary.
- Business invariant list.
- Conceptual ERD.
- Logical ERD with cardinality and optionality.
- Physical PostgreSQL schema/data dictionary.
- Index and query-access matrix.
- Migration and rollback strategy.
- PII, retention and audit classification.
- Open-decision and assumption log.

## 5. Candidate Data Domains

These domains organize discovery and do not pre-authorize final tables:

1. Identity and RBAC.
2. Catalog, cake options, pricing and vouchers.
3. Design request, structured cake specification and Canvas artifacts.
4. AI generation, provider metadata and provenance.
5. Catalog embeddings and recommendation evidence.
6. Orders and independent payment records.
7. Consultant review and feasibility decisions.
8. Kitchen and decorator workflow tasks.
9. Customer history, tracking and reorder.
10. Notifications, media/evidence and audit trail.
11. Research datasets and experiment evidence, isolated from operational truth where appropriate.

## 6. Non-Negotiable Data Invariants

- `order_status` and `payment_status` are separate state models.
- A successful payment never changes an order directly to `APPROVED`.
- Consultant approval is required before `BAKING`.
- No database role/entity may imply a Shipper or standalone QA account.
- QA images are completion/evidence records produced by an authorized workflow actor.
- Payment callbacks require a provider event/transaction identity and idempotent processing evidence.
- Money uses exact numeric types and an explicit currency strategy; never floating point.
- Event timestamps use `TIMESTAMPTZ`; business dates use `DATE` when time-of-day is irrelevant.
- Every relationship has an explicit FK and deliberate `ON DELETE` behavior. Do not default to `CASCADE`.
- Referencing FK columns are indexed when supported by real access paths.
- Evolving business states should not be frozen into PostgreSQL enum types without an explicit decision.
- Core relational data stays relational. JSONB is only for variable/provider-specific metadata with validation.
- Audit records are append-oriented and trace critical actions; a generic `updated_at` column is not an audit trail.
- Passwords, API keys and provider secrets are never stored as plaintext application data.
- Voice, image, phone, address and payment-related data follow minimization, access and retention rules.
- Seed, synthetic, mock and placeholder data are labeled and separated from validated research evidence.

## 7. pgvector Rules

- Do not assume `512` dimensions because an old diagram or placeholder file says so.
- Record embedding provider, model identifier, model version, dimension, normalization and creation time.
- The stored vector dimension must match the selected embedding model.
- Use cosine distance only when it matches the evaluated model and retrieval design.
- Begin with exact nearest-neighbor search for the small Capstone catalog unless measurement demonstrates the need for ANN indexing.
- HNSW is optional. Adding it trades recall and resource usage for speed and requires benchmark evidence.
- A model change requires a re-embedding/versioning strategy; never mix incompatible embeddings silently.
- Store image source/license and catalog approval status separately from the vector.

## 8. Decisions Still Open

The following must not be invented by an agent:

- Whether Customer and staff experiences share one Next.js deployment or use separate web applications.
- Whether async AI jobs use Celery directly and which Redis responsibilities are broker versus cache.
- Object-storage product and deployment mode.
- PostgreSQL major version.
- Internal key strategy: identity, UUID or a mixed internal/public identifier approach.
- Exact order cancellation, rejection, refund and retry transitions.
- Pricing formula ownership and versioning.
- Selected STT, NLP, generation and CLIP model versions.
- Embedding dimension and HNSW parameters.
- Data retention periods and anonymization rules.
- Final deployment topology and environment separation.

## 9. Acceptance Gates

A C4 artifact is not accepted until:

- Its level, scope and audience are explicit.
- It contains no mixed abstraction levels.
- All elements and relationships are described.
- External systems and system boundaries are correct.
- The rendered artifact has been visually reviewed, not only syntax-checked.
- Assumptions and unresolved decisions are visible.

A database design is not accepted until:

- Cardinality and optionality are explicit.
- Business invariants are enforced or assigned to a named application transaction boundary.
- Order/payment independence and Consultant approval are modeled.
- PK, FK, unique and check constraints have rationale.
- Delete behavior, indexes, PII, retention and audit treatment are documented.
- Vector metadata and model compatibility are traceable.
- Migrations and validation tests are planned.
- The design maps back to requirements and forward to tests/evidence.

