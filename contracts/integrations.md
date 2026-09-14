# Systemadapter und Integrationsverträge

Status: zu vereinbarende Ports; keine bestätigten Implementierungen. Öffentliche
Hub-Routen dürfen stabil bleiben, während ein Adapter auf den tatsächlich
installierten Dienst abgebildet wird. Niemals URLs aus Vorschlägen erraten.

## ResearchPort

| Operation | Eingabe | Ausgabe / Pflichtnachweis |
| --- | --- | --- |
| capture.register | requestId, Capture-Revision, Inhalt, geprüfte FileRefs | Input-ID und kanonische Revision |
| research.submit | requestId, Operation, Frage, Referenzen, Grenzen | dauerhafte Job-ID und Annahmezeit |
| research.findRequest | requestId | nicht angenommen, angenommen oder noch unklar |
| research.get/list | Job-ID oder Cursor/Filter | versionierter Status, beobachtete Zeit, Hermes-Zuordnung |
| research.reply | Job-/Rückfrage-ID, erwartete Revision, Antwort | aktualisierter Status |
| research.stop | Job-ID, erwartete Revision | Stop angefragt; später bestätigtes Ende |
| research.retry | alter Job, neue requestId | neuer Job mit retryOf |
| publication.list/read | Ausgabe/Artikel und Revision | zitierter Text, Review, Quellen, Paketreferenz |
| publication.release | exakte Ausgabe-Revision | geprüfte Freigabe oder Begründung |

Jeder schreibende Aufruf führt `contractVersion`, `requestId`, `idempotencyKey`,
authentifizierten Actor/Scope, Payload und erwartete Revisionen mit. Actor/Scope
werden vom Adapter gesetzt. Ergebnisse enthalten Request-/Run-Korrelation,
Execution-State und davon getrennt Review/Output-Revisionen. Ein Upstream-
Request-ID-Suchweg ist Voraussetzung, bevor Wiederholungen nach Timeouts
produktiv aktiviert werden.

Hermes bleibt der Forschungsharness. Seine aktuelle Dokumentation beschreibt
HTTP-Integration und Capability-Discovery. Das beweist nicht, dass die lokal
installierte Version diese Funktionen bereitstellt. Im Spike Version,
Authentifizierung, Annahme, Status, Events, Rückfragen und Stop nachweisen;
keine internen Datenbanktabellen oder undokumentierten Python-Interna anzapfen.
Quelle: [Hermes API Server](https://hermes-agent.nousresearch.com/docs/user-guide/features/api-server).

## MediaPort

`media.request` erhält eine immutable PackageRef aus Research: `packageId`,
`revision`, `sha256`, `contractVersion`. Der Produzent gibt zusätzlich
Dokumentrevision, Checkpoint, Textsprache, Quellen-/Absatzreferenzen, Freigabe,
Nutzungsrechte und Dateien im Paketmanifest mit. Hub erfindet dieses Paket nicht.

Die Medienanforderung hat eigene Request-/Job-IDs, eigene Contract-Version,
Idempotenz, Sprache/Stimme und Kostengrenze. `media.status` liefert PackageRef,
eigenen Jobstatus, Audiorevision, Dauer, sichere Artefaktreferenz, optionale
Alignment-Segmente, Warnungen und Fehler. Paket-ID/Revision/Hash müssen zur
Anforderung passen; andernfalls keine Wiedergabe als Audio dieses Artikels.

Ein Audio-Fehler ändert niemals den Research-Jobstatus. Medienjobs werden nicht
in der Research-Queue gespeichert. Keine Medienprozesse im Hub-Webrequest.
Transkription hat einen getrennten Capture-Media-Vorgang mit Upload-Referenz;
vertrauliche Aufnahmen dürfen nicht automatisch an einen Hosted-Provider gehen.
Provider, Datenfreigabe und Grenzen müssen vor Aktivierung dokumentiert sein.

## OperationsPort

Read-only-Snapshot: Komponentenkennung, `state` (`ok`, `degraded`, `down`,
`unknown`), sichere Zusammenfassung, `observedAt`, `staleAfterSeconds`, optional
konkreter Problemcode. Backup liefert getrennt Zeitpunkt der Kopie und des
erfolgreichen Restoretests. Fehlende Daten bleiben `unknown`.

Globale Annahmepause und verbindliches Forschungsbudget liegen im Research-
Auftragszugang. Hub vermittelt `admission.set` mit Revision. Der Schalter gilt
auch für Matrix und geplante Research-Aufträge, sonst muss die Oberfläche
ausdrücklich „Nur Hub-Aufträge pausieren“ heißen. Audio hat ein eigenes Limit.
Laufende Jobs werden durch eine Annahmepause nicht still gestoppt.

Keine Coolify-Administrator-Tokens an den Browser, keine Shellbefehle im
OperationsPort. Vor dem Pilot einen minimal berechtigten Status-Collector oder
eine vorhandene sichere Statusschnittstelle auswählen. Keine Kopie vollständiger Logs.

## Scheduler und Budget

Research/Hermes ist Autorität für die tägliche Recherche. Konfiguration:
IANA-Zeitzone, lokale Uhrzeit, Wochentage, Themen, letzte angewandte Revision.
Die UI zeigt eine Änderung erst nach bestätigter Anwendung als aktiv.
Bei Sommerzeitwechsel einmal pro lokalem Datum: ausgefallene Uhrzeit zum nächsten
gültigen Zeitpunkt, doppelte Uhrzeit nur einmal. Wiederanlauf höchstens einen
verpassten heutigen Lauf nachholen, keine unbegrenzte Aufholschlange.

Budget wird bei Annahme atomar reserviert und bei Abschluss mit tatsächlichen
Kosten abgeglichen. Harte Grenzen brauchen Upstream-Enforcement; geschätzte
Kosten allein sind keine Garantie. Neue kostenpflichtige Arbeit bei unklarem
Budget sperren, vorhandene Inhalte weiter anzeigen. Das Monatslimit bezieht sich
auf die lokale Kalenderperiode und getrennte Research-/Audio-Töpfe.

## Erforderlicher Adapterpilot

Mit synthetischen Daten jeweils Erfolgsfall, Timeout nach Annahme, erneute
Zustellung, falsche Revision, unerlaubter Scope und Dienstneustart nachweisen.
Kein Dienst erhält Produktivzugriff allein deshalb, weil ein Mockadapter denselben
TypeScript-Typ erfüllt. Verifizierte Zuordnungen werden hier mit Version und
Datum ergänzt; offene Ports bleiben ausdrücklich offen.
