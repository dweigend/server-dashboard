# Server Dashboard — Design specification

Prepared with Google Stitch on 15 September 2026, using the existing project
and a second review against this repository's requirements. This is the reviewed
implementation brief derived from Stitch's updated `design.md` document.
Export provenance and known visual deviations are recorded in the
[Stitch examples](design/stitch/README.md).

This is David's personal workspace for capture, research, reading and listening.
The repository currently implements a start view and process healthcheck.
Everything below describes target behavior, not completed functionality.

## 1. Principles

Give the current thought, article or task the screen. Keep interface copy short;
allow actual content to be long. A terminal influence means precise alignment,
monochrome contrast and occasional monospace metadata. It does not mean logs,
command decoration or dense dashboard furniture.

Use pure black, white text and square geometry. Avoid shadows, gradients,
decorative illustrations, cards, tables and metric grids. Actual article and task
titles are content; repeated page names, branding and settings headers are not.

## 2. Tokens and typography

The machine-readable source is [design/tokens.json](design/tokens.json).
The detailed component contract is [design/ui-system.md](design/ui-system.md).
Keep those files and this brief aligned when making a design decision.

| Token | Value |
| --- | --- |
| Background / primary text | `#000000` / `#FFFFFF` |
| Secondary text / functional boundary | `#B8B8B8` / `#666666` |
| Inverse text | `#000000` on white controls |
| Radius | `0px`, including dialogs and switches |
| Spacing | `4, 8, 12, 16, 24, 32px` |
| UI | System sans, `16px / 1.5` |
| Reading | System sans, `18px / 1.65`; optional local Georgia |
| Reading size choices | `18, 20, 22, 24px` |
| Content title | `28px / 1.2`; wrapping permitted |
| Metadata | System monospace, `14px / 1.4` |
| SVG icons | Lucide, `20px`, stroke `1.75` |
| Pointer targets | At least `44 × 44px`, no overlapping hit areas |
| Focus | White `2px` outline, `2px` offset; dark separation on white controls |
| Motion | `120ms`; no animation with reduced motion |
| Content inset | `16px`; `24px` from `768px` viewport width |
| Width | App at most `720px`; reading at most `65ch` |

These documentation tables describe tokens; they are not a dashboard UI pattern.
Use system fonts first. Stitch's IBM Plex Sans, JetBrains Mono and iconfont
exports are historical prototype choices, not additional font dependencies.

## 3. Navigation and screen area

Use one `48px` top navigation with five evenly distributed links:

- Heute: `House`, `/`.
- Eingang: `Inbox`, `/inbox`.
- Aufgaben: `ListTodo`, `/tasks`.
- Magazin: `BookOpen`, `/magazine`.
- Betrieb: `Server`, `/operations`.

Each link has a German accessible name. Show the current location through a
white underline and `aria-current="page"`. Use SVGs, never iconfont ligatures.
Settings open within Betrieb. There is no global brand, avatar, breadcrumb,
page-title bar, settings gear, footer or bottom navigation.

Keep navigation in normal flow for the first implementation. With usable
viewport height `H`, reserve at least `(H - 48) / H >= 0.9` for work when
`H >= 480px`. Usable height excludes browser/OS chrome and safe areas. The rule
measures available work area, not how many pixels contain text.

Below `480px`, let navigation scroll away. Never overlap content or shrink text
to achieve the ratio. Text zoom, keyboard access and readable wrapping win.
Reader/listening modes may replace global navigation with a compact contextual
row. Do not stack a permanent player underneath it. Restore the prior scroll
position when leaving a detail view.

## 4. Components

- **CaptureComposer:** Multiline input, camera, microphone and save. Use a real
  accessible label; “Gedanke festhalten …” is only a prompt. No additional title.
- **TextRow:** A meaningful title and one concise status. Let necessary text
  wrap; no fixed one-line rule or ellipsis hiding essential information.
- **Disclosure:** Open supporting information in place and expose expanded state.
- **ReadingDocument:** Semantic headings, paragraphs and source anchors.
  Typography controls appear on request and apply directly to the text.
- **AudioTransport:** Play/pause, position and speed in context. No autoplay.
- **StatusLine:** Symbol plus short text; show observation time when stale.
- **InlineFeedback:** Success, progress and failure beside the affected content.
- **Dialog:** Only for a necessary decision, with focus containment and return.
- **EmptyState:** One short sentence and the next useful action.

Reuse Bits UI primitives or shadcn-svelte patterns when a real interaction needs
them. Define default, hover, focus, active, disabled, busy and error states.
Only disable the mutation currently in progress; keep other content usable.

## 5. Core interactions

Capture text immediately. A photograph remains attached to its note; extraction
is a separate state. For voice, request permission when recording is chosen,
then show actual recording, stop, cancel and permission/device failures.
Preserve the original recording when producing an editable transcript.

Start a research task from its question. Reveal deadline, attachments and budget
only when needed. A running job shows its actual state and the next action that
needs David. Results, sources and technical diagnostics open in context.

The magazine presents article titles, reading/listening duration and a compact
play action. Reading uses the main content area. Sources stay inspectable;
source records, claims and assessments are distinct concepts.

Betrieb shows actionable connection, backup, storage and cost information.
A stale observation is not an “online” assertion. A successful backup copy is
not a verified restore. Keep detailed logs behind explicit disclosure.

## 6. Saving, failure and offline behavior

“Gespeichert” requires acknowledgment of durable capture storage by the server.
A device-only draft is “Nur auf diesem Gerät”; pending delivery is
“Noch nicht übertragen”. If browser persistence fails, explicitly say the draft
could not be saved locally. Do not describe a demo localStorage value as durable
server storage or an offline research queue as running work.

Preserve entered text and available attachments on failure. Show the error inline
with “Erneut versuchen”. Permission failures offer a relevant alternative such
as text input. After reconnecting, reconcile status before claiming success.
Announce important changes with targeted live regions, not the entire job list.

Capture acknowledgment and confirmed adoption into the knowledge system are
separate events. Follow the [knowledge integration contract](docs/knowledge-integration.md)
and [interaction specification](design/interaction-spec.md); UI copy must not
invent an upstream endpoint, a completed job or a committed knowledge note.

## 7. Responsive behavior and accessibility

`390px` is a reference width, not a minimum. Support fluid wrapping at `320px`,
`200%` text enlargement, virtual keyboards, landscape and desktop. Preserve the
same calm column on desktop rather than adding a second dashboard or sidebar.

Target WCAG 2.2 AA, including text contrast of at least `4.5:1` and essential
graphical controls at least `3:1`. Measure actual rendered states. Monochrome
tokens alone prove neither accessibility nor AAA compliance.

Use semantic links, buttons and form labels, visible keyboard focus and a
logical focus order. Keep a way back from immersive views. Respect reduced
motion. Static images do not establish keyboard, screen reader or zoom support.

## 8. Implementation boundaries

Use Svelte 5, SvelteKit and Bun tooling. All styles and CSS variables belong in
`src/app.css`, using semantic classes in markup. No inline CSS, component style
blocks or Tailwind utility strings. Keep rendering, business behavior and server
adapters separate. Add a UI dependency only when an implemented component needs it.

## 9. Examples and precedence

- [30 mockups](design/portfolio/index.html): alternative ideas for reading,
  capture, tasks, operations and their detailed interactions.
- [10 original references](design/references/README.md): inspiration with the
  existing analysis of what to adopt and omit.
- [15 Stitch screenshots](design/stitch/README.md): the prototype's design
  progression, including rejected desktop/header-heavy variants.
- [Complete image inventory](design/image-inventory.json): filenames,
  provenance, dimensions and SHA-256 checksums for all 55 image examples.

User requirements and the repository's UI/interaction contracts take precedence
over screenshots. None of the 30 visual directions has been selected as a final
pixel template. Screenshot colors, footer navigation, extra headers or clipped
filters must not silently become implementation requirements.

## 10. Acceptance checklist

These are checks to perform on the implemented interface, not completed claims.

- [ ] One top navigation, five accessible SVG links and nonoverlapping targets.
- [ ] No redundant chrome, tables, metric tiles or persistent bottom player.
- [ ] Content-area ratio checked at normal heights; short viewports remain usable.
- [ ] Text, controls and focus survive `320px`, `200%` text zoom and keyboard input.
- [ ] Colors, spacing, typography and motion match the shared tokens.
- [ ] Save, upload, recording and job status describe real backend/device outcomes.
- [ ] Errors retain input and expose a usable recovery action.
- [ ] Knowledge adoption remains separate from capture saving.
- [ ] Reading, audio and return navigation preserve focus and position.
- [ ] Actual contrast, keyboard and screen reader behavior are verified.
