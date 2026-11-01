<!-- diagram-design-profile
name: CustomCakeAI Capstone
slug: customcakeai
source-url: none
created: 2026-09-21
updated: 2026-09-21
notes: Profile for CustomCakeAI Capstone (C1SE.81) - DTU CMU-SE, supporting Vietnamese typography, academic report fidelity, and mentor baselines (Thay Huy, Thay Hieu).
-->
# Style Guide

**The single source of truth for colors, typography, and tokens.** Every diagram draws from this — not from hex values inlined in other reference files.

Active profile: **CustomCakeAI Capstone** — tailored for DTU CMU Capstone C1SE.81 (CustomCakeAI). Optimized for academic Word/PDF embedding, razor-sharp monochrome/color printing, and native Vietnamese typography.

---

## Tokens

### Semantic roles

Every token is referred to by **semantic role**, not by its hex value. Type references (`type-*.md`) and SKILL.md say `accent`, not `#e65100`.

| Role | Purpose | Default (light) | Default (dark) |
|---|---|---|---|
| `paper` | Page background, default node fill (pure white for Word docx / print) | `#ffffff` | `#18181b` |
| `paper-2` | Diagram container bg, secondary fill | `#f8f9fa` | `#27272a` |
| `ink` | Primary text, primary stroke | `#1e293b` | `#f8fafc` |
| `ink-strong` | High-contrast text on warm accent fills | `#0f172a` | `#ffffff` |
| `muted` | Secondary text, default arrow stroke | `#475569` | `#cbd5e1` |
| `soft` | Sublabels, boundary labels | `#64748b` | `#94a3b8` |
| `rule` | Hairline borders | `rgba(15,23,42,0.12)` | `rgba(248,250,252,0.12)` |
| `rule-solid` | Stronger borders, baselines | `#cbd5e1` | `rgba(203,213,225,0.25)` |
| `accent` | Focal / 1–2 max per diagram (warm bakery amber) | `#e65100` | `#fb923c` |
| `accent-tint` | Fill for accent-bordered boxes | `rgba(230,81,0,0.08)` | `rgba(251,146,60,0.12)` |
| `link` | HTTP/API calls, external arrows | `#2563eb` | `#60a5fa` |

### Inversion rule (light → dark)

Any `rgba(15,23,42, X)` in light becomes `rgba(248,250,252, X)` in dark. Same opacities, RGB flipped.

### Series palette (multi-series chart types only)

| Token | Light | Dark | Notes |
|---|---|---|---|
| `series-1` | `#059669` (emerald) | `#34d399` | Non-focal series |
| `series-2` | `#2563eb` (royal-blue) | `#60a5fa` | Non-focal series |
| `series-3` | `#d97706` (amber) | `#fbbf24` | Non-focal series |
| `series-4` | `#dc2626` (crimson) | `#f87171` | Non-focal series |
| `series-5` | `#7c3aed` (purple) | `#a78bfa` | Non-focal series |

---

## Typography

| Role | Family | Size | Weight | Usage |
|---|---|---|---|---|
| `title` | Instrument Serif, Times New Roman, serif | 1.75rem | 400 | Page H1 |
| `node-name` | Be Vietnam Pro, Geist, sans-serif | 12px | 600 | Human-readable labels |
| `sublabel` | Geist Mono, monospace | 9px | 400 | Port, protocol, URL, field type |
| `eyebrow` | Geist Mono, monospace | 7–8px | 500, tracked 0.18em, uppercase | Type tags, axis labels |
| `arrow-label` | Geist Mono, monospace | 8px | 400, tracked 0.06em | Arrow annotations |
| `callout` | Instrument Serif, Times New Roman, italic, serif | 14px | 400 | Editorial asides only |

### Font stack

```html
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@400;500;600&family=Geist+Mono:wght@400;500;600&family=Be+Vietnam+Pro:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet">
```

### Vietnamese typography rules

1. **Native Vietnamese Diacritics Support:** All node names, descriptions, and labels in Vietnamese use `'Be Vietnam Pro', 'Geist', sans-serif`. This completely prevents glyph substitution, mismatched font heights, and diacritic clipping on complex vowels (ơ, ư, ă, ê, ô, dấu hỏi, ngã, nặng, sắc, huyền).
2. **Title Stack:** Page H1 uses `'Instrument Serif', 'Times New Roman', serif`. When Vietnamese accents are present in H1, `Times New Roman` provides seamless academic serif styling matching DTU CMU report guidelines.
3. **Sublabels & Code:** Technical tags, HTTP methods (GET, POST), ports, and data types remain in `'Geist Mono', monospace` in Latin.
4. **Width Budget for Vietnamese:** Vietnamese compound words require slightly wider text bounding boxes than English. Add at least 15% margin to horizontal box widths when rendering Vietnamese text labels to prevent text overflow.

---

## Stroke, radius, spacing

| Token | Value | Use |
|---|---|---|
| `stroke-thin` | `0.8` | Tag-box outlines, leaf nodes |
| `stroke-default` | `1` | Most strokes |
| `stroke-strong` | `1.2` | Emphasis strokes |
| `radius-sm` | `4` | Small tags |
| `radius-md` | `6` | Node boxes |
| `radius-lg` | `8` | Containers, rings |
| `grid` | `4` | Every coord, size, and gap is divisible by 4 (hard rule) |

---

## Node type → treatment

| Type | Fill | Stroke |
|---|---|---|
| `focal` (1–2 max) | `accent-tint` | `accent` |
| `backend` | `#ffffff` (white) | `ink` |
| `store` | `ink @ 0.05` | `muted` |
| `external` | `ink @ 0.03` | `ink @ 0.30` |
| `input` | `muted @ 0.10` | `soft` |
| `optional` | `ink @ 0.02` | `ink @ 0.20` dashed `4,3` |
| `security` | `accent @ 0.05` | `accent @ 0.50` dashed `4,4` |
