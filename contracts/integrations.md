# Application contracts and data flows

Target design, revised 2026-09-15. The [system layers](../docs/system-modules.md)
and [naming rules](../docs/system-naming.md) replace the former Research,
ExecutionPort, PublicationPort and TranscriptionPort grouping. Names below are
semantic operations, not invented upstream URLs. Existing Knowledge routes and
stored enum values remain unchanged until their explicit contract migration.

## Three remote clients

| Client | Receiver | Purpose |
| --- | --- | --- |
| `TaskClient` | Task Service / verified Hermes control adapter | general task acceptance, control, result and schedule |
| `KnowledgeClient` | Knowledge Server's authorized domain adapter | scoped records, search and supported contributions |
| `MediaClient` | Media Service | separate transcription and narration operations |

Dashboard magazine is an internal module, not a remote client. It owns drafts,
editorial release, text-package creation and current article delivery rights.
Platform observations use narrow read-only adapters, not an all-purpose business
API. The browser never calls a remote application directly.

## Task operations

| Semantic operation | Input | Required result |
| --- | --- | --- |
| `tasks.control.submit` | question, allowed tools/scope, limits, request identity | durable task identity and accepted time |
| `tasks.control.reconcile` | original request identity | known acceptance or still uncertain |
| `tasks.control.read/list` | task ref or scoped page request | owner-qualified state, observation time, next permitted actions |
| `tasks.control.reply/cancel` | task/question ref, expected revision | confirmed transition or conflict; requested stop is not completed stop |
| `tasks.control.retry` | confirmed prior outcome and new request | new linked task |
| `tasks.control.configure-schedule` | timezone/date rule, topics, limits, config revision | confirmed schedule revision |

Task Service owns the Hermes run mapping and general research admission/budget.
It collects news and sources through selected research adapters. It may call
Knowledge through scoped tools when needed; it does not require Knowledge for
every task or persist editorial state there. Matrix uses the same verified task
owner through its own authenticated channel, not Dashboard session cookies.

Verify the installed Hermes version and actual durable/control capabilities
before enabling them. A working Matrix reply, native capability response or
bounded local model call is not that proof. No second agent loop or raw
administrative/tool API is exposed to the browser.

## Knowledge operations

| Semantic operation | Purpose and required evidence |
| --- | --- |
| `knowledge.records.read/propose/edit` | typed note, claim, evidence or assessment with its required provenance, source locators, relations, rationale and revisions; supported commands only |
| `knowledge.records.reconcile` | original command receipt; no new side effect |
| `knowledge.review.record` | permitted human decision on exact revisions/dependencies |
| `knowledge.search.query` | scoped paginated hits, references, counterevidence and coverage |

The [inspected producer](../docs/knowledge-server-status.md) has local records,
receipts and domain rules, but no completed authenticated remote API. Its notes
require pinned references, including inbox notes. An ordinary Dashboard capture
therefore stays local unless a supported explicit contribution is requested.
No dummy reference or mandatory source-free note extension is introduced.

Model-free operations require no Hermes run. Knowledge validates and atomically
accepts changes; a proposal or another system's receipt cannot grant acceptance.
The first contribution excludes attachments unless the producer explicitly
supports them; never silently omit files or claim a partial transfer is complete.

## Local editorial operations

`dashboard.magazine.create-draft` consumes a retrieved task result with source
provenance, coverage and warnings. `dashboard.magazine.release` records David's
editorial decision on a specific edition and dependency revision.
`dashboard.magazine.read` and `check-access` resolve the current permitted view.
These are local application functions with transactional persistence.

A daily schedule lives in Task Service. Dashboard delivery polls the accepted
run/result and records a draft even without an open browser. Deduplicate by
local date, schedule/config revision and task-result identity. No callback into
Dashboard, second scheduler or implicit release is required.

Release creates an immutable text package: ID/revision/hash, article revision,
language, source/paragraph mapping, release reference, allowed use and manifest.
Knowledge refs/checkpoint are included only for actual Knowledge-derived inputs.
A news-only article has no invented Knowledge checkpoint. Input source rights
constrain derivative rights; editorial release does not bypass them.

## Media operations

| Semantic operation | Input | Result |
| --- | --- | --- |
| `media.transcriptions.submit` | authorized original audio ref/hash, language, permitted processing and limits | transcription job |
| `media.narrations.submit` | immutable released text package, voice/language and media limit | narration job |
| `media.transcriptions.read/reconcile` or `media.narrations.read/reconcile` | owner-qualified job/original request | derived revision, source input ref, warnings/errors and artifact access |

Transcription returns derived text and method provenance. Dashboard applies it
to the capture deliberately, with revision checks; the original recording stays
unchanged. Narration returns text/audio versions bound to the exact submitted
package. It cannot alter accepted Knowledge or the edition release.

Both modules may share one Media runtime while enforcing distinct operation
permissions and limits. No provider receives a recording without the explicitly
selected processing path. Choose and verify runtime/voice/provider before live
processing. Media failure changes only its job, not research or released text.

## Identity, retries and delivery rights

Every receiver verifies the service principal and attributed actor/scope; a
browser field or private-network identity alone is not a mutation permission.
Use fixed private destinations, separate staging credentials and least-privilege
operation scopes. Providers and raw material cannot supply URLs or instructions
that expand those permissions.

Commands carry contract version, request/payload identity and expected revisions
where appropriate. Commit effects and receipt atomically at their owner; reconcile
uncertain acceptance with the same identity before retry. Knowledge receipt
lookup already matters for its first integration, independently of task lookup.
A missing receipt during in-flight work is not necessarily final rejection.

Requests, jobs, record revisions and contract versions are distinct. A combined
job view retains `{ owner, kind, id }`, observed time and unknown/stale state.
No cross-application transaction, direct database access or shared job authority
is required. Dashboard outbox is delivery, not agent execution.

Immutable content is separate from current access. Dashboard checks its editorial
release and input permissions; Media enforces audio access. A known hash or past
receipt does not prove current authorization. Apply the bounded private-copy
expiry/revocation and restore rules in [hybrid-backend.md](../docs/hybrid-backend.md).
Media may revalidate via an explicit updated permission/lease at the next request;
a frozen manifest alone never grants indefinite use after withdrawal.

## Platform observations, scheduling and budget

Each owner emits safe state, `observedAt`, stale threshold and actionable code.
Backup-copy and successful-restore timestamps remain separate. Dashboard only
projects them; no Coolify token, shell or raw log is exposed in the browser.
Notifications report actionable changes through explicitly configured channels.

Daily research is once per local date in an IANA zone. Define DST, missed-run and
restart behavior before activation: one skipped-date recovery at most, no duplicate
run at a repeated local time. A timer may produce a draft but cannot approve it.
Task Service enforces research budget/admission, Media enforces its costs; unknown
budgets block new paid work. Show a global pause only when its scope really covers
all relevant clients. Existing API budget value `research` denotes task research,
not Knowledge ownership; wire migration is separate from these naming rules.

## Acceptance

Test each boundary with synthetic success, timeout-after-acceptance, duplicate
request, changed payload, stale revision, wrong scope and restart cases.
Capture and Knowledge-independent tasks must work during a Knowledge outage.
An edition may use permitted sources without any Knowledge mutation. Failed
transcription preserves the original; failed audio preserves released text.
Runtime placement, identity and real integration remain separate acceptance gates.
