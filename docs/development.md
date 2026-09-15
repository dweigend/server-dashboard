# Entwicklungsbasis

Stand: 15. September 2026. Das Projekt ist von `weigend-hub` nach
`server-dashboard` umgezogen. Dokumentation, Verträge, Portfolio und Git-Historie
sind erhalten; private Originalreferenzen und Auditdaten bleiben in `.local/`.

## Implementiert

- Offizielles minimales SvelteKit-Template aus `sv` 0.17.0, TypeScript und Svelte 5.
- Vite-Konfiguration einschließlich Node-Adapter, wie vom aktuellen CLI erstellt.
- Eine schlichte deutsche Startansicht, zentrale `src/app.css`, keine UI-Kit-
  Abhängigkeit vor der ersten echten interaktiven Komponente.
- `GET /health/live` prüft nur den laufenden Webprozess. Kein Readiness-Nachweis.
- Bun-Lockfile, Versionsangaben und GitHub-Checks einschließlich Docker-Smoke-Test.
- Biome für TypeScript/JavaScript/JSON/CSS; Prettier mit Svelte-Plugin nur für
  Svelte-Dateien. Svelte-Check prüft Typen und Compiler-/Accessibility-Warnungen.

Die App besitzt noch keine Anmeldung, Persistenz, echten Jobs oder Serveradapter.
Die 38 OpenAPI-Operationen bleiben bis auf den Liveness-Endpunkt Zielverträge.
Bits UI/shadcn-Svelte und Lucide werden mit der ersten benötigten Komponente
hinzugefügt. Die zentrale CSS-Konvention bleibt erhalten.

## Befehle

```sh
bun install --frozen-lockfile
bun run dev
bun run validate
```

`validate` führt zuerst die übernommenen Dokumentationsprüfungen aus, danach
Lint, Svelte-Check, Produktionsbuild und zwei HTTP-Smoke-Tests des gebauten
Node-Handlers. Die Tests verwenden Nodes eingebauten Testrunner. Vitest oder
Playwright kommen hinzu, sobald fachliche Logik oder Interaktionen sie benötigen.

Produktionsbuild lokal starten:

```sh
bun run build
HOST=127.0.0.1 PORT=3000 ORIGIN=http://127.0.0.1:3000 bun run start
```

## Container

Das Dockerfile baut mit Bun und startet den Node-Adapter als nicht privilegierter
Nutzer unter Node 24. Der Buildkontext enthält ausschließlich Runtime-Quellen
und Konfiguration; keine `.local/`, Dokumente, Mockups, Git-Historie oder Secrets.
Aktuell sind alle Pakete Build-Abhängigkeiten und werden gebündelt. Sobald
Runtime-Abhängigkeiten hinzukommen, deren Installation im finalen Image ergänzen.

Der Node-Basistag folgt aktuell der 24er-Linie. Vor produktivem Deployment den
geprüften Image-Digest festhalten. Authentifizierung und Backend-Readiness müssen
vor Anschluss privater Daten umgesetzt werden. Kein Deployment durch diesen Push.

## Quellen und Prüfung

Der Context7-Aufruf erreichte das Monatslimit; verwendet wurden die offiziellen
[Svelte CLI](https://svelte.dev/docs/cli/sv-create)- und
[Node-Adapter](https://svelte.dev/docs/kit/adapter-node)-Dokumentationen sowie das
aktuell installierte CLI-Template. Das ist keine Behauptung, das geplante
Gesamtdashboard sei bereits implementiert.

Der lokale Docker-Daemon war nicht erreichbar. Der Docker-Build und Containerstart
werden deshalb zusätzlich im GitHub-Workflow überprüft; lokale Node-Prüfung und
Containerprüfung sind getrennte Nachweise.
