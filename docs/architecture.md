# Dashboard architecture

Target design, revised 2026-09-15. The [layered system](system-modules.md)
contains Dashboard, Task Service, Knowledge Server and Media Service.
The [naming rules](system-naming.md) distinguish applications, internal modules,
providers and deployment processes. Existing runtime names are not migrated.

## Application boundary

Dashboard is one SvelteKit application: UI plus server-side application logic.
Use Svelte 5, TypeScript/Bun tooling and the existing Node production adapter.
Browser requests stay on the same origin. Server-side clients call only Task,
Knowledge and Media capabilities, with platform observations read separately.

Dashboard owns access, personal captures, editorial editions and preferences.
Knowledge owns canonical knowledge and its domain processing. Task Service owns
general agent execution and schedules with Hermes. Media owns its transcription
and narration jobs. No application reads another owner's tables.

## Internal modules

| Module | Owns | Calls |
| --- | --- | --- |
| `dashboard.access` | personal login/session/recovery | selected auth library and own persistence |
| `dashboard.inbox` | captures, original attachments and revisions | own storage; explicit delivery functions |
| `dashboard.magazine` | article/edition revisions, editorial release, rights, immutable text packages | task results; optional Knowledge reads; media requests |
| `dashboard.preferences` | display choices and reading/listening positions | own persistence |
| `dashboard.delivery` | durable explicit handoffs and reconciliation | narrow Task/Knowledge/Media clients |

Modules are domain responsibilities, not mandatory classes or directory trees.
Keep business operations, persistence, UI and remote clients separate. Magazine
release is a local domain operation, so there is no remote Publication service,
Publication token or network hop for editorial changes.

## Data ownership and execution

One private Dashboard database stores its own records with module-owned tables;
a private volume stores capture originals and permitted delivery copies.
The magazine module alone changes edition release state. It does not treat a
successful task or Knowledge review as editorial approval.

General tasks run in Task Service/Hermes. Dashboard delivery can submit, reconcile
and retrieve results, including when no browser is open. It cannot start its own
model loop or research scheduler. Scheduled task results become idempotent local
magazine drafts keyed by date, configuration revision and task-result identity.

Captures may remain in Dashboard permanently. Explicit Knowledge contributions
must satisfy the actual supported producer contract. Free thoughts are not
forced into referenced Knowledge notes; originals survive rejected transfers.

Media receives bounded authorized input and returns results. Dashboard retrieves
a transcript/audio result before applying its own revisioned domain operation.
There is no direct media write into captures, articles or Knowledge records.

## UI and integration behavior

All styling remains in `src/app.css`, using semantic classes. Follow the
48px top navigation and content-area rules in [design.md](../design.md).
A combined job list projects `{ owner, kind, id }` and observed time; it does
not create a universal job store or infer failure from a missing response.

Poll visible active jobs every five seconds and inactive status at most every
30 seconds; pause hidden tabs, reconcile on resume and back off on errors.
SSE is a possible later transport, not an additional lifecycle.

Synthetic fixtures can precede each integration. Missing Task capabilities
block only those task actions; independent captures, Knowledge reads and Media
operations retain their own verified behavior. Production never substitutes
fabricated successful data for an unavailable adapter.

## Placement and code boundaries

The [hybrid deployment plan](hybrid-backend.md) places Dashboard on Hetzner and
Task/Knowledge work on the home server. Media placement remains a separate
runtime decision. Deployment topology does not redefine application ownership.

Extend the current routes, domain/application functions, persistence and narrow
server clients only when a feature needs them. Use `TaskClient`,
`KnowledgeClient` and `MediaClient` for real remote boundaries; internal modules
use ordinary functions. Do not pre-create a generic service framework.

The [data model](data-model.md), [integration contracts](../contracts/integrations.md)
and [security rules](security.md) define identity, revisions, delivery expiry,
retry and object-level permissions. The [deployment audit](deployment-audit.md)
records earlier observations, not acceptance of this target design.
