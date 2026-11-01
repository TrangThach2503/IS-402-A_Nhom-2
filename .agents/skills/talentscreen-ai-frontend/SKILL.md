---
name: talentscreen-ai-frontend
description: Build and review TalentScreen AI Next.js screens, routes, Stitch-aligned UI, exact candidate linking, loading/error states, and VI/ENG behavior.
---

# TalentScreen AI Frontend

Read `TalentScreen_AI/docs/project-standards/TECHNOLOGY_LANGUAGE_STANDARD.md`
and inspect the existing feature/API client before editing. Preserve the Stitch
Dashboard shell and explicit route map. Use the existing Next.js App Router,
React, TypeScript, and Lucide icons.

Rules:

- Every major screen has an explicit stable route.
- Fetch data through the feature API client, not ad hoc URL construction in a
  visual component.
- Use opaque IDs from links and API responses. Never resolve a candidate by
  array index, sorted position, filename, or display label.
- Render loading, empty, validation, provider failure, and database failure
  states. A completed upload with no candidate profile must be visibly marked
  as incomplete, never shown with `undefined%`.
- Keep UI text in the existing language provider and preserve VI/ENG parity.
- Keep source filename as provenance, but show extracted candidate name as the
  profile identity.

Validate with `npm run typecheck`, `npm run lint`, and focused browser/API
checks for the affected route.
