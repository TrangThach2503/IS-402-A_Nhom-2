# Capstone Diagram Rules & Faculty Baselines (CustomCakeAI C1SE.81)

This reference defines the project-specific rules, academic standards, and mentor baselines (ThS. Nguyễn Đăng Quang Huy & TS. Nguyễn Đức Hiệu) for generating diagrams using `diagram-design` in the CustomCakeAI capstone repository.

---

## 1. System Context Diagram (Thầy Hiệu Baseline)

When creating or redrawing a **System Context Diagram**:

1. **Central System Shape:**
   - The central system (**CustomCakeAI Platform**) MUST be rendered as an **Ellipse** (`<ellipse cx="..." cy="..." rx="120" ry="70" .../>`), NOT a box.
2. **Actor & External System Shapes:**
   - Human Actors and External Systems MUST be **2D sharp rectangles** (`<rect rx="0" .../>` or `rx="2"`).
   - Visually distinguish **Human Actors** vs **External Systems** (e.g. human actors have user icon badge or tag `[ACTOR]`, external systems have `[SYSTEM]` / `[CLOUD]` tag).
3. **Palette & Styling:**
   - Clean, high-contrast monochrome or minimal accent (monochrome `#1e293b` strokes, white `#ffffff` fill).
   - Only highlight the central system with a subtle accent border or light tint.
4. **Connectors:**
   - Strictly 90° orthogonal (rounded elbow `r=8`).
   - Every connector line MUST have a white opaque label mask (`<rect fill="#ffffff" .../>`) with a 6–10px visible gap from the stroke.
   - Explicit element connection points (no overlapping lines, distinct attach points).

---

## 2. Chen ERD / Conceptual Data Model (Thầy Hiệu CMUIS 401 Baseline)

When creating or redrawing a **Chen ERD**:

1. **Strict Geometric Shapes:**
   - **Entities:** Strong Rectangles (`<rect rx="0" .../>`).
   - **Attributes:** Ovals/Ellipses (`<ellipse .../>`). Primary Keys MUST have underlined text.
   - **Relationships:** Diamonds / Rhombus (`<polygon points="..." />`).
   - **Weak Entities / Identifying Relationships:** Double borders.
2. **NO Arrowheads:**
   - Connectors in Chen ERD are undirected semantic relationships.
   - **NEVER put arrowheads** on connector lines in Chen ERD (`marker-end="none"`, `marker-start="none"`). Both entity-relationship lines and entity-attribute lines MUST be plain lines.
3. **Cardinality Notation:**
   - Strictly text labels **'1'** and **'N'** (e.g. `1 - N`, `N - N`, `1 - 1`).
   - **NEVER use 'M'** (e.g., do NOT write `M - N`, write `N - N` or `1 - N`).
   - Place cardinality labels immediately adjacent to the entity boundary.
4. **Canvas Density:**
   - Compact, tight canvas layout without tangled connector lines.

---

## 3. Business Function Diagram - BFD (Thầy Huy Baseline)

When creating or redrawing a **Business Function Diagram (BFD)**:

1. **No "LEVEL" Labels:**
   - **NEVER show "LEVEL 1", "LEVEL 2", "LEVEL 0" labels** on the diagram nodes or hierarchy headers.
2. **Functional Hierarchy:**
   - Use clean Tree or Nested decomposition showing business functions:
     - F1: Quản lý khách hàng & Đặt hàng bánh kem tùy chỉnh (Custom Ordering)
     - F2: Thiết kế AI & Thử nghiệm Canvas (AI Generation & 3D/2D Canvas)
     - F3: Thẩm định & Tư vấn kỹ thuật (Consultation & Feasibility Assessment)
     - F4: Quản lý sản xuất bánh tại xưởng (Kitchen & Decor Task Board)
     - F5: Thanh toán & Bàn giao đơn hàng (Payment & Handover)
     - F6: Quản trị hệ thống & Cấu hình tiệm (Admin & Store Configuration)

---

## 4. C4 Architecture Models (Context & Container)

1. **C4 Level 1 - System Context:** Follow Section 1 above.
2. **C4 Level 2 - Container Diagram:**
   - **Web Frontend (PWA / SPA):** React / Vite + TailwindCSS + Fabric.js Canvas.
   - **Backend API Service:** Python FastAPI (REST API + Pydantic validation + WebSockets).
   - **AI Pipeline / Workers:** Asynchronous worker processing STT, NLP, Prompt Engine, Diffusion / Vision Feasibility.
   - **Database (Relational):** PostgreSQL (Order, Cake Spec, User, Audit log).
   - **Cache & Vector Store:** Redis / pgvector (Vector embeddings for cake retrieval, session cache).
   - **Object Storage:** Cloudinary / S3 (Generated cake images, reference cake images, staff QA photos).
3. **Approved Portals & Task Boards:**
   - `Web Checkout` (Customer custom cake builder & ordering)
   - `Sales Portal` (Consultant review, pricing adjustment, feasibility validation)
   - `Order Management Portal` (Store Manager order tracking, assignment)
   - `Kitchen Task Board` (Baker cake base & sponge production tasks)
   - `Decor Board` (Decorator icing, topping, decorative finishing tasks)
   - `Admin Dashboard` (System settings, user management, audit logs)
   - *Note:* NO separate Shipper or QA accounts (Delivery is a status handoff; QA is an authorized staff activity).

---

## 5. CustomCakeAI Core Pipeline Flows

When drawing **Sequence**, **Flowchart**, or **Data Flow** diagrams for CustomCakeAI:

1. **AI Design Pipeline:**
   `Voice/Text Input` → `STT (Whisper)` → `NLP Parsing` → `Structured Cake Specification` → `AI 2D Concept Generator` → `Interactive 2D Canvas Editor` → `Recommendation Engine` → `Feasibility Assessment Engine`.
2. **Consultant Approval Gating:**
   `Customer Order & Payment Success` → `Status: PAID_AWAITING_CONSULTANT` → `Consultant Feasibility Check & Approval` → `Status: APPROVED_FOR_KITCHEN` → `Kitchen Sponge Baking` → `Decorator Finishing` → `Staff QA Photo Verification` → `Ready for Pickup / Delivery Handoff`.
   - *Crucial Rule:* Payment success NEVER automatically triggers kitchen baking. Human Consultant approval is strictly required.

---

## 6. Typography & Vietnamese Language Contract

1. **Vietnamese Text:**
   - Use `'Be Vietnam Pro', 'Geist', sans-serif` for all human-readable Vietnamese text.
   - Never let compound diacritics get clipped: maintain adequate vertical line-height (`1.4`) and increase box width by 15% compared to English text.
2. **Title:**
   - Use `'Instrument Serif', 'Times New Roman', serif`.
3. **Print & Word Embedding:**
   - Diagrams must use `paper` = `#ffffff` (white background) so they blend cleanly into Word `.docx` documents and printed reports without unsightly grey boxes.

---

## 7. Lessons Learned — Recurring Diagram Bugs (CustomCakeAI + TalentScreen AI)

These rules are derived from actual production bugs found and fixed across both capstone projects. Every agent **MUST** check for these before outputting any diagram.

### BUG-01: Chen ERD — Arrowheads appear on connector lines
- **Symptom:** Agent adds `marker-end="url(#arrow)"` to entity–relationship or entity–attribute lines.
- **Root cause:** LLM defaults to directional arrows for all connector types; Chen ERD is semantically undirected.
- **Rule:** In Chen ERD, ALL connector lines MUST have `marker-end="none"` AND `marker-start="none"`. Both entity–relationship lines and entity–attribute lines are plain lines. Never add any arrow marker. This is a hard fail.
- **Verification:** `grep -c 'marker-end' <file>` must return 0 for Chen ERD files.

### BUG-02: BFD Tree — "LEVEL" labels rendered on diagram
- **Symptom:** Agent renders "LEVEL 0", "LEVEL 1", "LEVEL 2" text labels on hierarchy headers or above tree rows.
- **Root cause:** LLM infers hierarchical labeling from common BFD textbook examples.
- **Rule:** Following Thầy Huy baseline — NEVER show any "LEVEL" label text on BFD nodes or tree headers. The hierarchy is implicit from the tree structure and indentation. Remove any "LEVEL" text during generation.

### BUG-03: System Context — Central system drawn as rectangle instead of ellipse
- **Symptom:** Agent draws the central system as a `<rect>` box, matching the actor/external shapes.
- **Root cause:** LLM treats all nodes uniformly; doesn't distinguish the central system shape.
- **Rule:** The central system MUST be an `<ellipse>`. Human Actors and External Systems MUST be sharp `<rect rx="0">` or `<rect rx="2">`. The visual distinction is mandatory per Thầy Hiệu baseline.

### BUG-04: Long text labels overflow node boxes
- **Symptom:** Node labels extend beyond `<rect>` boundaries, especially multi-word names like "Order Management Portal", "AI Grounding & Deterministic Scorer", "Feasibility Assessment Engine".
- **Root cause:** LLM estimates text width incorrectly; does not account for actual rendered glyph widths at the chosen font-size.
- **Rule:** (a) Size box width from the **longest label** first — measure character count × average glyph width at the target font-size, then add **16–24px horizontal padding** (8–12px each side). (b) For labels >20 characters, split across 2 lines using `<tspan>` with `dy` offset. (c) Use `line-height: 1.4` minimum to prevent descenders/ascenders from clipping. (d) All diagram output is **full English** — Vietnamese is only for companion documents, never inside SVG labels.

### BUG-05: Connector lines hidden behind nodes (Z-order violation)
- **Symptom:** Arrow connectors drawn before nodes in SVG source → node `<rect>` fill covers the connector stroke, making arrows invisible.
- **Root cause:** SVG z-order is determined by source order (later elements paint on top). Agent draws arrows in the same `<g>` as nodes without considering paint order.
- **Rule:** Use explicit SVG layer groups in this exact order:
  1. `<g id="layer-containers">` — outer zone/container boxes
  2. `<g id="layer-components">` — inner component cards (fill `#ffffff` solid)
  3. `<g id="layer-connectors">` — ALL arrow paths and connector lines
  4. `<g id="layer-labels">` — ALL text labels, badges with opaque mask rects
  5. `<g id="layer-legend">` — legend strip at bottom
- **Why this order:** Connectors paint AFTER component cards (visible above fills), labels paint AFTER connectors (text never hidden by arrows). This is the proven fix from the TalentScreen Module View.

### BUG-06: Module View — Badge labels clipped by adjacent node
- **Symptom:** A connector badge label (e.g., "HTTP REST", "uses") has its opaque mask rect partially overlapping a node drawn after it, causing the text to appear fragmented.
- **Root cause:** Badge mask placed too close to source/destination node edge; node fill paints over part of the mask.
- **Rule:** Badge labels on connectors in the "docking corridor" (space between two column regions) MUST: (a) be placed with **≥8px clearance** from both source and destination node edges, (b) use a white opaque `<rect fill="#ffffff">` mask with `1px` border, (c) be in `layer-labels` (painted last), (d) if corridor is <80px wide, shrink badge text to ≤10 chars or abbreviate.

### BUG-07: Module View — 3rd-party packages not aligned horizontally with internal layers
- **Symptom:** External dependency blocks (React, FastAPI, PostgreSQL) are positioned at arbitrary y-coordinates, creating visual chaos and breaking the layered architecture message.
- **Root cause:** LLM places external packages in a vertical stack without cross-referencing y-coordinates of internal layers.
- **Rule:** Each 3rd-party package block MUST share the same y-range (±4px) as its corresponding internal layer. Example: if Controller Layer spans y=240..328, the FastAPI Framework block must also span approximately y=240..328. Verify by checking: `|internal_layer.y - external_pkg.y| <= 4`.

### BUG-08: Multiple connectors sharing the same attach point on a node edge
- **Symptom:** Two or more arrows enter/exit the same point on a box edge, creating a visual merge where individual connections become indistinguishable.
- **Root cause:** LLM uses the same midpoint for all connections to a node edge.
- **Rule:** Fan the attach points along the edge: for N connectors on an edge of length L, attach point k (1..N) sits at offset `L × k / (N+1)` from the edge's leading corner. Minimum spacing: **≥12px** between adjacent attach points (≥100px for Module View to avoid congestion). Each arrow must be independently traceable end-to-end.

### BUG-09: Diagonal connector lines between off-axis nodes
- **Symptom:** Agent uses `<line x1="..." y1="..." x2="..." y2="...">` creating diagonal slashes across the diagram.
- **Root cause:** LLM takes the shortest geometric path rather than an orthogonal route.
- **Rule:** NEVER use diagonal lines between nodes that don't share an x or y coordinate. Every connector between off-axis nodes MUST use an orthogonal elbow path with quarter-arc bends at `r=8`. Formula: `M startX startY → H midX → Q midX midY → V endY → H endX` (adjust for direction). Diagonal connectors are an **automatic fail**.

### BUG-10: Arrow label sitting ON its connector line (no gap)
- **Symptom:** Label text mask directly overlaps the arrow stroke, hiding the connection path under the label.
- **Root cause:** LLM places label at exact connector y-coordinate without offset.
- **Rule:** Arrow labels MUST have a **6-10px visible gap** between the bottom of the mask rect and the connector stroke. The mask rect prevents bleed-through, but the reader must still be able to trace the line visually. For horizontal connectors: label sits ABOVE with gap. For vertical connectors: label sits to the SIDE with horizontal gap.

### BUG-11: Module View — Annotation panels or QA text blocks inside the diagram
- **Symptom:** Agent adds text-heavy annotation sections, QA descriptions, or specification prose inside the SVG canvas area, cluttering the visual.
- **Root cause:** Agent conflates the diagram with its specification document; tries to embed explanatory text.
- **Rule:** The diagram contains ONLY: (a) visual nodes with short labels, (b) connectors with brief badges, (c) a horizontal legend strip at the bottom. ALL descriptive text, QA annotations, architectural rationale, and specification prose go into a **separate companion document** (`.md` or `.docx`), NEVER inside the SVG. The legend contains ONLY symbol definitions (2 rows max).

### BUG-12: Connector crosses behind non-endpoint node without dashing
- **Symptom:** A connector line passes behind a node that is neither its source nor destination, making it appear as if the connector connects to that intermediate node.
- **Root cause:** LLM routes connectors through the shortest path without checking for intervening boxes.
- **Rule:** A connector must NOT pass behind a non-endpoint box unless geometrically unavoidable. When unavoidable: (a) use dashed stroke `stroke-dasharray="4,3"` to signal transit, (b) place the label at the visible end, (c) no arrowhead marker may land on the intervening box's edge. When in doubt, reroute around the intermediate box.

---

## 8. Pre-Generation Verification Checklist (Capstone-Specific)

Before outputting any diagram for CustomCakeAI or TalentScreen AI, verify:

- [ ] **Profile active:** `.diagram-design` marker resolved to `customcakeai` or `talentscreen` profile?
- [ ] **BUG-01:** If Chen ERD — zero `marker-end` attributes in output?
- [ ] **BUG-02:** If BFD — zero occurrences of "LEVEL" text?
- [ ] **BUG-03:** If System Context — central system is `<ellipse>`, actors are `<rect rx="0">`?
- [ ] **BUG-04:** Long labels — boxes sized from longest label + 16-24px padding? Labels >20 chars split into 2 lines?
- [ ] **BUG-05:** SVG layers in correct paint order (containers → components → connectors → labels → legend)?
- [ ] **BUG-06:** Badge labels ≥8px from node edges on both sides?
- [ ] **BUG-07:** If Module View — external packages horizontally aligned (±4px) with internal layers?
- [ ] **BUG-08:** No two connectors share the same attach point? Fan spacing ≥12px?
- [ ] **BUG-09:** Zero diagonal `<line>` elements between off-axis nodes? All elbows r=8?
- [ ] **BUG-10:** All arrow labels have 6-10px gap above/beside their connector?
- [ ] **BUG-11:** No annotation panels or prose text blocks inside the SVG canvas?
- [ ] **BUG-12:** No undashed connector crossing behind a non-endpoint node?
