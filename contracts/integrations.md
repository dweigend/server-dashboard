# Systemadapter und Integrationsverträge

Status: zu vereinbarende Ports; keine bestätigten Implementierungen. Öffentliche
Hub-Routen dürfen stabil bleiben, während ein Adapter auf den tatsächlich
installierten Dienst abgebildet wird. Niemals URLs aus Vorschlägen erraten.

Transportziel ist jetzt die [private HTTPS-Strecke](../docs/hybrid-backend.md)
von Hetzner zum MS-A2. Im [Knowledge-Server-Repository](https://github.com/dweigend/knowledge-server)
existieren inzwischen lokale JSON-Leserouten und Python-Fachoperationen.
Der [Codeabgleich vom 15. September](../docs/knowledge-server-status.md)
bestätigt jedoch keine authentifizierte Remote-API oder laufende private Strecke.
Die hier genannten Operationen bleiben Zielverträge, keine ausgerollten URL-Pfade.

## KnowledgePort

KnowledgePort bezeichnet ausschließlich den Adapter zur Wissensanwendung.
Allgemeine Agentenaufträge und Publikation besitzen eigene Ports gemäß den
[Systemgrenzen](../docs/system-modules.md). Der [Wissensabgleich](../docs/knowledge-integration.md)
hat Vorrang für den ersten Pilot: Textübernahme und kanonische Wissensoperationen
werden unabhängig von Recherchejobs, Publikation und Audio abgenommen.

### Wissensoperationen des ersten Piloten

Die Namen sind fachliche Arbeitsbezeichnungen, keine festgelegten API-Pfade.
Pilot-Schemas und Bewertungswerte existieren auf Produzentenseite; der externe
Vertrag wird dort abgestimmt und danach in den Hub-Vertrag übernommen.
Nicht jede Operation braucht eine eigene UI-Seite.

| Operation | Eingabe | Ausgabe / Pflichtnachweis |
| --- | --- | --- |
| capture.register | Text/Markdown oder ausgewählte Passage, Herkunft, Request-ID | kanonischer Eingang mit ID und Revision |
| requests.find | ursprüngliche Request-ID im erlaubten Operations-/Kontoumfang | Annahmestand und vorhandene kanonische Referenzen; kein neuer Befehl |
| notes.read/propose/edit | Notizreferenz oder Inhalt/Art, Urheberschaft, erwartete Revision | Zettel/Wiki mit Quellen-, Claim- und Linkreferenzen |
| claims.read/propose | präzise Aussage, Geltungsbereich oder Claim-Referenz | Claim-ID/Revision; keine automatische Wahrheitsfeststellung |
| evidence.read/link/appraise | Claim-/Quellenversion, Locator, Beziehung und Begründung | versionierte Belegbeziehung, Einzelbeurteilung und Abhängigkeiten |
| assessments.read/propose | Claim-Revision, ausgewertete Belegrevisionen, begründetes Urteil | Evidenzlage, Belastbarkeit, Umfang und Bewertungsrevision |
| review.record | genaue Ziel-/Bewertungsrevision, Abhängigkeitsstand, Entscheidung | attribuierte Entscheidung oder Revisionskonflikt |
| retrieval.search | erlaubter Wissensbereich, Frage/Suchtext, Filter | revisionsgebundene Treffer, Gegenbelege und Abdeckungsgrenzen |

Manuelle Fachbefehle und Hermes-Werkzeuge verwenden dieselben Regeln. Ein
Notiz-Edit oder eine Prüfentscheidung löst nicht automatisch Agentenarbeit aus.
Der erste Capture-Zielvertrag überträgt keine Fotos, Audio oder PDFs.
Freie Texte ohne Wissensreferenz sind im aktuellen Note-Vertrag noch nicht
unterstützt. capture.register bleibt nur eine Kandidatenbezeichnung für eine
explizite unterstützte Wissensaufnahme, kein Pflichtweg für jeden Capture.
Der erste Pilot darf bestehende Datensätze lesen und eine referenzgebundene
Passage übergeben; eine Erweiterung für freie Gedanken ist keine Hub-Voraussetzung.
Hub darf eine Übernahme mit Anhängen nicht als vollständig melden, wenn nur Text übernommen
wurde. Auslieferungsrechte für konkrete Quellenstellen separat prüfen.

## ExecutionPort

Der allgemeine Auftragszugang mit Hermes besitzt Annahme, Status und Kontrolle.
Knowledge wird nur bei fachlichem Bedarf aufgerufen. research.* benennt hier
Operationskandidaten dieses Ausführungsbereichs, keine Knowledge-Endpunkte.

| Operation | Eingabe | Ausgabe / Pflichtnachweis |
| --- | --- | --- |
| research.submit | requestId, Operation, Frage, Referenzen, Grenzen | dauerhafte Job-ID und Annahmezeit |
| research.findRequest | requestId | nicht angenommen, angenommen oder noch unklar |
| research.get/list | Job-ID oder Cursor/Filter | versionierter Status, beobachtete Zeit, Hermes-Zuordnung |
| research.reply | Job-/Rückfrage-ID, erwartete Revision, Antwort | aktualisierter Status |
| research.stop | Job-ID, erwartete Revision | Stop angefragt; später bestätigtes Ende |
| research.retry | alter Job, neue requestId | neuer Job mit retryOf |

## PublicationPort

Redaktion besitzt Artikel, Ausgaben und aktuelle Auslieferungsfreigaben.
Knowledge liefert bei Bedarf erlaubte referenzierte Beiträge. Eine Ausgabe
kann ohne Knowledge entstehen; dessen geplante Exportfunktionen sind kein
allgemeiner Blocker. Die Freigabe wahrt Rechte sämtlicher verwendeter Quellen.

| Operation | Eingabe | Ausgabe / Pflichtnachweis |
| --- | --- | --- |
| publication.list/read | Ausgabe/Artikel und Revision | zitierter Text, Review, Quellen, Paketreferenz |
| publication.release | exakte Ausgabe-Revision | geprüfte Freigabe oder Begründung |
| publication.checkAccess | PackageRef, Actor, letzte bekannte Revision | aktuelle Berechtigung, Freigabestatus, Prüfzeit oder expliziter Widerruf |

## Gemeinsame Anforderungen an die jeweiligen Besitzer

Jeder schreibende Aufruf führt `contractVersion`, `requestId`, `idempotencyKey`,
authentifizierten Actor/Scope, Payload und erwartete Revisionen mit. Actor/Scope
werden vom Adapter gesetzt und vom Produzenten autorisiert. Jede Antwort
korreliert den Request mit ihrem Ergebnis beziehungsweise kanonischen Revisionen.
Run-ID, Hermes-Zuordnung und Execution-State sind nur bei tatsächlicher
Agentenausführung erforderlich; modellfreie Befehle benötigen keinen Dummy-Job.
Review/Output-Revisionen bleiben davon unabhängig. `requests.find` muss bereits
im ersten Wissenspilot verfügbar sein, bevor Wiederholungen nach Timeouts
produktiv aktiviert werden; es hängt nicht vom späteren `research.findRequest` ab.

Hermes bleibt der Forschungsharness. Seine aktuelle Dokumentation beschreibt
HTTP-Integration und Capability-Discovery. Das beweist nicht, dass die lokal
installierte Version diese Funktionen bereitstellt. Im Spike Version,
Authentifizierung, Annahme, Status, Events, Rückfragen und Stop nachweisen;
keine internen Datenbanktabellen oder undokumentierten Python-Interna anzapfen.
Quelle: [Hermes API Server](https://hermes-agent.nousresearch.com/docs/user-guide/features/api-server).

Jede empfangende API authentifiziert den Diensttoken und ordnet ihn serverseitig
einem erlaubten Konto-/Operationsumfang zu. Ein vom Browser angelieferter Actor
oder ein Tailscale-Identity-Header allein erteilt keine Schreibrechte. Staging
und Produktion erhalten getrennte Tokens und Datenbereiche. Diensttokens
dürfen weder freie Shellbefehle noch allgemeine Hermes-Administration erlauben.

Ein Capability-Nachweis muss fachliche Unterstützung belegen: Knowledge-Übernahme,
Execution-Annahme/Abgleich und Publikation können zu unterschiedlichen Zeitpunkten
bereitstehen. Die native Hermes-Capability-Antwort beweist keine implementierten
Wissens- oder Review-Operationen.

## MediaPort

`media.request` erhält eine immutable PackageRef aus Publication: `packageId`,
`revision`, `sha256`, `contractVersion`. Der Produzent gibt zusätzlich
Dokumentrevision, Textsprache, Quellen-/Absatzreferenzen, Freigabe,
Nutzungsrechte und Dateien im Paketmanifest mit. Bei verwendeten Knowledge-Inhalten
kommen deren tatsächliche Revisionen beziehungsweise Checkpoint hinzu; sonst
kein künstlicher Wissensbezug. Hub erfindet dieses Paket nicht.

Die Medienanforderung hat eigene Request-/Job-IDs, eigene Contract-Version,
Idempotenz, Sprache/Stimme und Kostengrenze. `media.status` liefert PackageRef,
eigenen Jobstatus, Audiorevision, Dauer, sichere Artefaktreferenz, optionale
Alignment-Segmente, Warnungen und Fehler. Paket-ID/Revision/Hash müssen zur
Anforderung passen; andernfalls keine Wiedergabe als Audio dieses Artikels.

Für eine private Audiokopie muss zusätzlich der aktuelle Auslieferungsstatus
der Audiorevision prüfbar sein. Sowohl Publication-Freigabe als auch Media-Rechte
müssen gültig sein; eine Sperre an einer der Grenzen verhindert Auslieferung.
Es gibt keinen Rückschluss von einem vorhandenen Dateihash auf aktuelle Rechte.

Ein Audio-Fehler ändert niemals den Execution-Jobstatus. Medienjobs werden nicht
im Execution-Auftragsregister gespeichert. Keine Medienprozesse im Hub-Webrequest.

## TranscriptionPort

Ein eigener Auftrag erhält Capture-/Upload-Referenz, Originalhash, Sprache und
expliziten Verarbeitungsumfang. Der zuständige Worker liefert Jobstatus,
Transkriptrevision, Methodenherkunft und strukturierte Fehler. Das Original bleibt
im Hub; abgeleiteter Text wird dort bewusst übernommen und nicht automatisch
als Wissen gespeichert. Kein Mitsenden an einen Hosted-Provider ohne festgelegten
Verarbeitungsweg und Erlaubnis. Runtime und Provider bleiben zu prüfen.

## OperationsPort

Read-only-Snapshot: Komponentenkennung, `state` (`ok`, `degraded`, `down`,
`unknown`), sichere Zusammenfassung, `observedAt`, `staleAfterSeconds`, optional
konkreter Problemcode. Backup liefert getrennt Zeitpunkt der Kopie und des
erfolgreichen Restoretests. Fehlende Daten bleiben `unknown`.

Globale Annahmepause und verbindliches Forschungsbudget liegen im Execution-
Auftragszugang. Hub vermittelt `admission.set` mit Revision. Der Schalter gilt
auch für Matrix und geplante Research-Aufträge, sonst muss die Oberfläche
ausdrücklich „Nur Hub-Aufträge pausieren“ heißen. Audio hat ein eigenes Limit.
Laufende Jobs werden durch eine Annahmepause nicht still gestoppt.

Keine Coolify-Administrator-Tokens an den Browser, keine Shellbefehle im
OperationsPort. Vor dem Pilot einen minimal berechtigten Status-Collector oder
eine vorhandene sichere Statusschnittstelle auswählen. Keine Kopie vollständiger Logs.

## Scheduler und Budget

Execution/Hermes ist Autorität für geplante Rechercheaufträge. Publication
führt Ausgabeentwürfe/Freigaben; ein Timer verleiht keine redaktionelle Freigabe.
Konfiguration:
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

Der lokale Wissenspilot benötigt zunächst keinen HTTP-Transport. Der spätere
Hub-Pilot prüft zuerst Textübernahme, Notiz-/Behauptungsansicht, Beleg-/Bewertungs-
bezug und Suche. Jobannahme, Rückfragen, Stop, Budgets und Publikation bilden
eigene Abnahmen bei ihren Besitzern. Sie blockieren weder den Aufbau der
Wissensdatenbank noch sind sie deren Implementierungsauftrag.
