# System naming conventions

Decision: 2026-09-15. Use these names in current architecture, issue descriptions
and new integration code. Existing public APIs, stored enum values, repository
names and installed unit names are not silently renamed by a document change.

## Application names

| User-facing German | English name | Stable technical key |
| --- | --- | --- |
| Dashboard | Dashboard | `dashboard` |
| Auftragsdienst | Task Service | `tasks` |
| Knowledge Server | Knowledge Server | `knowledge` |
| Mediendienst | Media Service | `media` |

Use **Research/research** only for the activity of researching or the existing
research budget domain. Do not use it as the name of the entire backend.
Use **magazine** for the Dashboard's editorial module. Publication/release
is an operation, not the name of a fifth application.

Use **platform** for deployment, networking, observations and recovery together.
Authentication is enforced at each entry boundary; browser authentication lives
inside Dashboard. Neither is a central business-data routing service.

## Vocabulary: distinguish levels

| Word | Meaning | Example |
| --- | --- | --- |
| Application | Owns a coherent user capability and data | Knowledge Server |
| Module | Owns one domain within an application | `dashboard.magazine` |
| Operation | A request for one domain outcome | `knowledge.records.read` |
| Client/adapter | Translates a specific boundary | `KnowledgeClient` |
| Worker | A process executing bounded background work | `media-worker` |
| Provider | External tool/runtime implementation | a speech backend |
| View | A projection; does not own the source records | combined job list |

A module name does not require a class, folder, service or database. First use
existing structures and simple functions. Names communicate responsibility;
they are not instructions to build a general plugin or workflow framework.

## Operations and references

Use `<application>.<module>.<verb>` for semantic contract names. Examples:

- `dashboard.inbox.save`: persist a personal capture.
- `dashboard.magazine.release`: commit an editorial release locally.
- `tasks.control.submit`: accept a general agent task.
- `knowledge.records.read`: retrieve a canonical note revision.
- `knowledge.review.record`: record a permitted knowledge decision.
- `media.transcriptions.submit`: request audio-to-text processing.
- `media.narrations.submit`: request audio from a released text package.

These names describe outcomes, not guessed URLs. Producers choose and version
actual routes when the contract is implemented. Existing Knowledge routes are
mapped by an adapter, not renamed to resemble this notation.

A job reference includes `{ owner, kind, id }`. `owner` is `tasks`, `knowledge`
or `media`; `kind` distinguishes research, extraction, transcription or narration
as the producing contract defines. A capture is not a job, and a completed
model-free knowledge command does not need an artificial run ID.

Keep `requestId` (one command), `jobId` (accepted asynchronous work), `revision`
(domain version) and `contractVersion` (wire meaning) distinct. A retry after
uncertain acceptance preserves the original command identity. A new deliberate
job after a confirmed failure gets a new identity linked to its predecessor.

## Files, configuration and diagrams

New filenames use English `kebab-case`; semantic namespace notation uses dots.
Use intention-revealing names such as `capture-repository` or `article-audio`
instead of universal `manager`, `processor`, `data` or `backend` wrappers.

Server-side remote clients are `TaskClient`, `KnowledgeClient` and `MediaClient`
when such code is needed. Magazine uses internal application functions; it has
no remote `PublicationPort` or separate service credentials.

Configuration proposals follow the receiving application:
`TASKS_BASE_URL` / `TASKS_TOKEN`, `KNOWLEDGE_BASE_URL` / `KNOWLEDGE_TOKEN`, and
`MEDIA_BASE_URL` / `MEDIA_TOKEN`. Credential scope remains operation-specific;
one media identity must not gain unrelated permissions merely by sharing a URL.

Proposed process names use `<application>-<role>`, for example
`dashboard-web`, `dashboard-worker` and `knowledge-extraction-worker`.
Actual migration of installed units/configuration is separately verified.
`server-dashboard` and `knowledge-server` keep their repository names.

Diagrams show one abstraction level at a time. An application diagram shows
calls and their purpose; a sequence diagram shows commands and results over
time; a deployment diagram shows hosts. Never mix all three into one network.

## Previous names and responsibility mapping

The M01-M14 IDs are retired inventory labels, not stable API identifiers.

| Previous label | Current responsibility |
| --- | --- |
| M01 presentation | Dashboard UI |
| M02 access | `dashboard.access` and receiving-service authorization |
| M03 capture/delivery | `dashboard.inbox` / `dashboard.delivery` |
| M04 Execution | `tasks.control`; Hermes remains the harness |
| M05 knowledge | `knowledge.records` / review / search |
| M06 literature | Zotero via `knowledge.sources` |
| M07 processing | `knowledge.processing` |
| M08 Discovery | `tasks.research` provider adapters |
| M09 Publication | `dashboard.magazine` |
| M10 Transcription | `media.transcriptions` |
| M11 Audio | `media.narrations` |
| M12-M14 operations | Platform support |

`Hub`, `ExecutionPort` and `ResearchPort` in older design material must be
interpreted through this map. Historical screenshots and source records retain
their original names; new implementation documents use the current vocabulary.
