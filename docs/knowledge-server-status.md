# Knowledge Server: geprüfter Stand und Dashboard-Grenzen

Stand: 15. September 2026. Projekt:
[**dweigend/knowledge-server**](https://github.com/dweigend/knowledge-server).
Die [Dokumentationsübersicht](https://github.com/dweigend/knowledge-server/blob/main/docs/README.md)
und die [bestehenden Issues](https://github.com/dweigend/knowledge-server/issues)
sind die maßgeblichen Einstiege für die Produzentenseite.

## Grundlage dieser Prüfung

Gelesen wurden Quellcode, Tests, Verträge, README und offene GitHub-Issues.
Lokaler Stand: `98809bbcebd2e9dd48fcd4fe3f6788a2576f4825`;
veröffentlichter Stand zum Prüfzeitpunkt:
[`9bb983c85c2f0ec71cfceb899135985ac27b6e15`](https://github.com/dweigend/knowledge-server/tree/9bb983c85c2f0ec71cfceb899135985ac27b6e15).
Die zwei zusätzlichen lokalen Commits ändern nur Dokumentation. Der geprüfte
Code ist im veröffentlichten Stand enthalten. Das Knowledge-Repository wurde
weder verändert noch gepusht. Quellverweise unten sind auf diesen Stand fixiert.

Die Knowledge-Tests wurden gelesen, aber hier nicht erneut ausgeführt. Es wurde
kein Live-Server angesprochen. Code, Testfälle und eine systemd-Vorlage belegen
keinen laufenden Dienst, keine Netzfreigabe und keine Produktionsabnahme.

## Vorhandene Fähigkeiten und Konsequenzen

| Fähigkeit | Beobachteter Stand | Konsequenz für das Dashboard |
| --- | --- | --- |
| Wissensdaten | PostgreSQL, unveränderliche Revisionen, Claims, Evidence, Assessments, Notes, Review | vorhandene IDs und Revisionen nutzen; keine eigene Wissensdatenbank |
| Fachoperationen | gemeinsame Python-Operationen für CLI, HTML und begrenzte Hermes-Aufrufe | keinen zweiten Agentenprozess oder parallele Fachregeln bauen |
| Idempotenz | Annahmebelege und Änderungen in einer Transaktion; Konflikt bei geändertem Payload | gute Grundlage, aber noch kein abgestimmter Remote-Intake-Vertrag |
| Lesen | `GET /api/records/{entity_id}?revision=N` liefert einen revisionsgebundenen Datensatz | lokal vorhandene JSON-Route, noch kein autorisierter externer Zugriff |
| Annahmebeleg | `GET /api/requests/{request_id}` liefert gespeicherte Ergebnisreferenzen oder 404 | kein Statusmodell für laufende oder fehlgeschlagene Intake-Aufträge; 404 beendet keinen möglicherweise noch laufenden Request |
| Suche | PostgreSQL-Volltextsuche, HTML und CLI mit Offset/Total | kein JSON-HTTP-Suchendpunkt für das Dashboard |
| Textnotiz | Notiztyp `inbox` vorhanden, aber mindestens eine gepinnte Referenz erforderlich | ein freier Gedanke ohne bestehende Wissensreferenz ist noch nicht übernehmbar |
| Dokumente | Zotero/PDF-Zugriff, strukturierte Extraktion, Quellenansicht und Extraktionsqueue | teilweise implementiert; Corpus-Abnahme und Migration offen |
| Jobs | persistente PDF-Extraktion und private Laufhistorie | kein allgemeiner Rechercheauftrag mit Annahme, Rückfrage, Stop und Budgetvertrag |
| Magazin/Audio | Quellenartikelansicht vorhanden | tägliche Ausgabe, Publikationspakete und unabhängiges Audio bleiben spätere Fähigkeiten |

Die HTML-App hat keine Anmeldung. Host-Prüfung und Formular-CSRF ersetzen keine
Authentifizierung. Die Deploymentvorlage bindet an Loopback. Das Dashboard darf
diese Oberfläche nicht als vermeintlich geschützte API veröffentlichen oder
per HTML-Scraping und direktem Datenbankzugriff anbinden.

## Konkrete Vertragslücken

1. **Freie Gedanken:** Der gewünschte Capture darf ohne wissenschaftliche Quelle
   entstehen. Der aktuelle `Note.references`-Vertrag verlangt eine Referenz.
   Die Produzentenseite muss die Aufnahmeart festlegen. Keine erfundene Quelle,
   Dummy-Referenz oder stillschweigende Lockerung im Dashboard.
2. **Remote-Zugang:** Dienst- und Nutzeridentität, Berechtigungen, Versionierung,
   Rechte für Quellenpassagen und ein konkreter HTTP-Fehlervertrag fehlen.
3. **Unsichere Annahme:** Lokale Receipts sind eine Grundlage, aber das Mapping
   von Hub-Capture/Revision auf Request und kanonische Referenz muss vereinbart
   werden. Ein Timeout oder noch fehlender Beleg darf keine Doppelannahme erzeugen.
4. **Wissensansichten:** Lesen/Suchen braucht einen externen Vertrag einschließlich
   Suchumfang, Pagination und unbekannter Werte. Bearbeiten und Review werden erst
   nach demselben Revisions-/Rechtevertrag aktiviert.
5. **Arbeit und Publikation:** Extraktionsstatus ist kein Research-Jobstatus;
   ein Quellenartikel ist keine freigegebene Magazinausgabe. Diese Grenzen bleiben
   auch bei ähnlich aussehenden Screens erhalten.

Das frühere Dashboard-Konzept behauptete, Wissensschemas und Bewertungsrubrik
fehlten vollständig. Das ist überholt: Pilotverträge und begründete
Bewertungswerte existieren. Ihre externe Übertragung und weitere strukturierte
Schemas sind jedoch noch offen. Evidenzlage, Belastbarkeit, Review und
Publikationsentscheidung bleiben getrennt; es gibt keinen Wahrheits-Prozentwert.

## Bestehende Arbeit auf der Produzentenseite

- [#1: Isolierte Experimentieroberfläche](https://github.com/dweigend/knowledge-server/issues/1)
  ist die dortige erste Priorität. Sie ist ein Werkzeug zur Pipeline-Prüfung und
  nicht dieses persönliche Dashboard auf Hetzner.
- [#26: Gemeinsamer Intake](https://github.com/dweigend/knowledge-server/issues/26),
  [#27: Wiederaufnehmbare Verarbeitung](https://github.com/dweigend/knowledge-server/issues/27)
  und [#28: Fortschritt](https://github.com/dweigend/knowledge-server/issues/28)
  behandeln zunächst Link/PDF/Zotero. Sie garantieren keine freie Textaufnahme.
- [#29: Enge Fähigkeiten](https://github.com/dweigend/knowledge-server/issues/29)
  ist Voraussetzung der dortigen Integrationsplanung.
- [#36: Authentifizierte Dashboard-/Client-Anbindung](https://github.com/dweigend/knowledge-server/issues/36)
  bündelt den Remote-Vertrag und liegt dort noch im späteren Backlog.
- [#40: Publikation](https://github.com/dweigend/knowledge-server/issues/40) und
  [#41: Freigegebene Pakete](https://github.com/dweigend/knowledge-server/issues/41)
  sind Voraussetzungen für das echte Magazin und dessen Medienverbraucher.
- [#19: Nützliche Wissensintegration](https://github.com/dweigend/knowledge-server/issues/19)
  adressiert die noch nicht zuverlässig belegte Verbesserung vorhandener Notizen.
  Erfolgreiche Verarbeitung und korrekte Zitatstruktur sind keine Qualitätsabnahme.

Die [Dashboard-Issues](feature-backlog.md) verlinken diese bestehenden Aufgaben.
Es wurden keine doppelten Produzenten-Issues angelegt und keine dortigen
Prioritäten geändert. Fixtures können die Darstellung voranbringen; eine echte
Integration benötigt die jeweils nachgewiesene Fähigkeit.

## Code- und Testbelege

- [Verträge und Referenzpflicht](https://github.com/dweigend/knowledge-server/blob/9bb983c85c2f0ec71cfceb899135985ac27b6e15/src/knowledge/contracts.py#L125).
- [Gemeinsame Anwendungsoperationen](https://github.com/dweigend/knowledge-server/blob/9bb983c85c2f0ec71cfceb899135985ac27b6e15/src/knowledge/application.py#L50).
- [HTTP-Routen und lokales Sicherheitsmodell](https://github.com/dweigend/knowledge-server/blob/9bb983c85c2f0ec71cfceb899135985ac27b6e15/src/knowledge/web.py#L55).
- [Atomare Idempotenz](https://github.com/dweigend/knowledge-server/blob/9bb983c85c2f0ec71cfceb899135985ac27b6e15/src/knowledge/storage.py#L158).
- [Revisionsschutz und Extraktionsqueue](https://github.com/dweigend/knowledge-server/blob/9bb983c85c2f0ec71cfceb899135985ac27b6e15/src/knowledge/schema.sql#L30).
- [Lokale Hermes-Bridge](https://github.com/dweigend/knowledge-server/blob/9bb983c85c2f0ec71cfceb899135985ac27b6e15/src/knowledge/hermes_bridge.py#L24).
- [Fach-, HTTP- und Idempotenztests](https://github.com/dweigend/knowledge-server/blob/9bb983c85c2f0ec71cfceb899135985ac27b6e15/tests/test_knowledge.py#L48).
- [Extraktions- und Revisionsbindungstests](https://github.com/dweigend/knowledge-server/blob/9bb983c85c2f0ec71cfceb899135985ac27b6e15/tests/test_document_extraction.py#L56).
