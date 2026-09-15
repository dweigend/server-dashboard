# Project instructions

- Communicate in German. Write code, filenames, comments and commits in English.
- This personal repository now contains a minimal SvelteKit scaffold and concept
  documentation. Build features incrementally; deployment remains a separate task.
- Read README, docs/decisions.md and the relevant spec before changes.
- Inspect Git status. Preserve unrelated edits; checkpoint substantial work.
- Distinguish a proposal, an implemented feature and an observed deployment.
- Keep source-of-truth boundaries: Hub owns presentation and capture staging;
  Execution/Hermes owns general tasks; Knowledge owns canonical knowledge and
  its domain processing; Publication owns editions/releases; Media owns audio.
- Read docs/system-modules.md. Do not assign every capture, task or publication
  to Knowledge Server or require source-free Knowledge notes for Hub capture.
- Do not invent upstream endpoints or treat a model response as a committed note.
- Stack: SvelteKit, Svelte 5, Bun tooling, Node production runtime,
  Bits UI/shadcn-svelte patterns and Lucide. Pin compatible versions at build time.
- All app styling belongs in src/app.css. Use semantic classes, no inline
  styles, component style blocks or Tailwind utility classes in markup.
- Read design.md and apply design/ui-system.md. A mockup cannot override the 48px navigation,
  content-area rule, accessibility, or lack of brand/title chrome.
- Prefer standard components and existing code over custom abstractions.
- Keep UI, domain behavior, data access and integration adapters separate.
- No private infrastructure inventory, credentials, raw transcripts or access
  URLs in Git. Use synthetic examples and ignored .local/ files.
- Run bun run validate after changes: concept checks, lint, Svelte checks, build
  and production smoke tests. Preserve private artifacts in ignored .local/.
- Record contract changes with examples and update dependent specs together.
- Do not commit .local/ or claim that ignoring files alone is a security review.
