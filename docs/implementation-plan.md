# Umsetzungsplan

Aktualisiert: 15. September 2026. Konzept, Bildbeispiele, SvelteKit-Grundgerüst
und CI stehen. Fachfunktionen sind noch nicht implementiert. Die konkreten
[14 Feature-Issues](feature-backlog.md) bilden jetzt die ausführbare Reihenfolge;
die folgenden Stufen bleiben das übergeordnete Zielbild.

Das lokale Wissensfundament ist bereits teilweise implementiert. Seine nächste
Priorität ist die isolierte Experimentieroberfläche zur überprüfbaren Verbesserung
der Pipeline, siehe [Knowledge-Stand](knowledge-server-status.md). Der Hub-Ausbau
ordnet diese Priorität nicht neu. Navigation, privater Eingang und Vertragsfixtures
können unabhängig von der späteren Remote-Schnittstelle umgesetzt werden.
Der [gemeinsame Abgleich](knowledge-integration.md) definiert die Abhängigkeiten.

## 0 · Konzept festhalten

- Repository, Specs, UI-Regeln und OpenAPI-Vertrag prüfen.
- Fünf repräsentative Bildideen aus den 30 Varianten für die erste Umsetzung fixieren.
- Offene Entscheidungen aus [decisions.md](decisions.md) jeweils vor der betroffenen Stufe klären.

Ergebnis: dieses Konzeptpaket. Die Auswahl ist keine Freigabe für Deployment.

## 1 · Durchgängiges UI mit Fixtures

Das vorhandene SvelteKit-Grundgerüst nutzen, UI-Tokens in `src/app.css` überführen,
Navigation und CaptureComposer bauen. Eingang, Auftrag, Jobdetail und Artikel mit synthetischen
Daten verbinden. Fehler-/Leer-/Ladezustände ebenso bauen wie den Erfolgsfall.
Lockfile und Build sind vorhanden; Runtime-Abhängigkeiten nur für konkret
benötigte Funktionen ergänzen.

Abnahme: Fokusregel und komplette Navigation auf 390, 360, 320 px sowie Desktop;
Tastatur und Zoom; keine vorgetäuschte Backendverbindung. Build, Typprüfung,
Biome und gezielte Interaktionstests laufen.

## 2 · Zugang und dauerhafter Eingang

Auth-Spike, Konto/TOTP/Recovery, Hub-DB, Uploadspeicher und Capture-Versionierung.
Upload- und Sessiongrenzen prüfen. Text/Foto/Aufnahme real speichern; Transkript
darf vorerst fehlen. Browser- und Serverneustart, fremde Objekt-IDs und Doppeltap testen.

Abnahme: P01/P02/P09; nach Timeout kein Datenverlust oder doppelter Capture.

## 3a · Wissens-Vertragspilot

Zuvor den begrenzten Netzwerkpilot aus [deployment.md](deployment.md) durchführen.
Der [implementierte Wissensstand](knowledge-server-status.md) enthält lokale
Verträge und Leserouten, aber noch keine authentifizierte Remote-API. Mit
Capture-Übernahme beginnen, sobald der referenzfreie Intake vereinbart ist.
Der lokale Wissens-MVP selbst braucht diesen Netzwerkpilot nicht; er ist nur Voraussetzung für die spätere Hetzner-Anbindung.

Installierte Dienste inventarisieren, Ports aus `contracts/integrations.md`
zuordnen und schriftlich bestätigen. Einen Text-Capture ohne Anhänge übernehmen,
kanonischen Zettel, Behauptung und Belege lesen, Bewertungsbegründung und
Gegenbelege anzeigen und das Wissen wiederfinden. Modellfreie Änderung/Prüfung,
Revisionskonflikt, doppelte Zustellung und fehlende Rechte prüfen.

Abnahme: gleiche kanonische Referenzen über Hub, CLI und Hermes-Werkzeuge;
keine zweite Wissensautorität, keine selbst berechneten Wahrheitswerte.

## 3b · Spätere Research-Aufträge

Erst nach eigener Backend-Bereitstellung einen kleinen Agentenauftrag auslösen,
Rückfrage beantworten und Ergebnis mit Quellen abrufen. Stop, Fehler und
Wiederholung nach unklarer Annahme nachweisen. Diese Fähigkeit ist nicht
Voraussetzung für 3a und wird nicht allein aus einem installierten Hermes abgeleitet.

Abnahme: gleiche Request-/Run-/Wissensreferenzen über Hub und bestehende Clients;
kein zweiter Harness. P03/P04/P05.

## 4 · Magazin und unabhängiges Audio

Themen und Quellen festlegen; ersten Ausgabeentwurf erstellen, prüfen und
freigeben. Content-Paket an den getrennten Medienanbieter übergeben. Playback,
Fortsetzen, Audiofehler und Artikelrevision testen. Danach Zeitplan aktivieren.

Abnahme: P06/P07; Audioausfall beschädigt weder Ausgabe noch Research-Status.

## 5 · Betrieb und Coolify-Pilot

Statusadapter, Budget/Annahmepause, reproduzierbarer Container, Staging,
Produktionsprüfung der privaten Netzverbindung, Backup-/Restoretest und Rollback. Erst dann Subdomain
und produktiven Zugang bereitstellen.

Abnahme: P08/P09 und sämtliche Produktionskriterien aus
[acceptance.md](acceptance.md). GitHub-Push und Deployment sind getrennte Schritte.

Zusätzliche Hybrid-Abnahme: Nach Unterbrechung der Heimverbindung funktionieren
Login und Capture-Speicherung; explizite Transfers bleiben nachvollziehbar.
Timeout nach Research-Annahme erzeugt keine Doppelarbeit. Unberechtigte Container
erreichen die lokale API nicht. Lesekopien beachten Freigabe und Frist auch nach
Restore. Bestehende Matrix-/Website-Funktionen bleiben im Deploymenttest intakt.

## Später

Nach realer Nutzung: Markierungen, echtes Offline-Sync, Passkeys, OCR,
Live-Transkript, synchrones Wort-Highlighting und weitere Quellenadapter.
Keinen Screenshot dieser Funktionen als bereits gelieferte Fähigkeit behandeln.
