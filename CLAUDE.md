# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static site for an academic policy analysis paper: "Age Verification via EUDI Wallet: Technical Risks, Societal Consequences, and Alternative Regulatory Approaches." Built with Vite + Handlebars partials, output is a single `dist/index.html`.

## Commands

- `pnpm dev` — Start Vite dev server (root is `src/`)
- `pnpm build` — Build to `dist/` (always run after edits to verify)
- `pnpm preview` — Preview the built output

## Architecture

**Vite + Handlebars partials** — `src/index.html` is the shell that includes partials via `{{> partialName}}`. All content lives in `src/partials/`:

- `header.html`, `abstract.html`, `toc.html` — Front matter
- `framework.html` — Analytical framework
- `part0.html` through `part3.html` — Main paper sections (Part 0: Introduction, Part 1, Part 2, Part 2b, Part 3)
- `interim.html` — Interim assessment (fulcrum between risks and alternatives)
- `conclusion.html` — Synthesis (no new arguments)
- `footnotes.html` — All footnotes (bidirectional linking: `#fn-{n}` / `#fnref-{n}`)
- `references.html` — Categorized bibliography
- `revision-history.html` — Change log
- `footer.html`

Styling: `src/css/style.css`

## Editing Conventions

- **Footnotes** are bidirectional: each `<sup><a href="#fn-{n}" id="fnref-{n}">` must have a matching `<li id="fn-{n}">` in `footnotes.html` with a back-link `<a href="#fnref-{n}">`. Numbering must be sequential with no gaps or duplicates.
- **TOC** in `toc.html` must match actual heading text and section IDs (`<section id="s{part}-{number}">`).
- **Cross-references** between sections use `(see Section X.Y)` patterns — verify accuracy after structural changes.
- **References** go in `references.html` under the correct category.
- **Revision history** in `revision-history.html` must be updated after every content change.

## Content Guidelines

See `PROMPT.md` for the full editorial system prompt covering:
- Writing style and voice (academic, positioned, direct)
- Evidence standards and source hierarchy
- Argumentation structure (claim → evidence → counterargument → response → synthesis)
- HTML semantic conventions (heading hierarchy, blockquotes, footnote format)
- Quality verification checklist

## Post-Edit Verification

After any content edit:
1. Run `pnpm build` — must succeed
2. Verify footnote integrity (all refs have matching targets, sequential numbering)
3. Verify TOC entries match headings
4. Verify cross-references are accurate
