# Umsetzungsplan

Aktueller Abschnitt: Konzept. Die folgenden Stufen sind noch nicht ausgeführt.
Sie erzeugen jeweils einen prüfbaren Stand und keine große parallele Baustelle.

## 0 · Konzept festhalten

- Repository, Specs, UI-Regeln und OpenAPI-Vertrag prüfen.
- Fünf repräsentative Bildideen aus den 30 Varianten für die erste Umsetzung fixieren.
- Offene Entscheidungen aus [decisions.md](decisions.md) jeweils vor der betroffenen Stufe klären.

Ergebnis: dieses Konzeptpaket. Die Auswahl ist keine Freigabe für Deployment.

## 1 · Durchgängiges UI mit Fixtures

SvelteKit initialisieren, UI-Tokens in `src/app.css` überführen, Navigation und
CaptureComposer bauen. Eingang, Auftrag, Jobdetail und Artikel mit synthetischen
Daten verbinden. Fehler-/Leer-/Ladezustände ebenso bauen wie den Erfolgsfall.
Erst hier Runtime-Abhängigkeiten und Lockfile anlegen.

Abnahme: Fokusregel und komplette Navigation auf 390, 360, 320 px sowie Desktop;
Tastatur und Zoom; keine vorgetäuschte Backendverbindung. Build, Typprüfung,
Biome und gezielte Interaktionstests laufen.

## 2 · Zugang und dauerhafter Eingang

Auth-Spike, Konto/TOTP/Recovery, Hub-DB, Uploadspeicher und Capture-Versionierung.
Upload- und Sessiongrenzen prüfen. Text/Foto/Aufnahme real speichern; Transkript
darf vorerst fehlen. Browser- und Serverneustart, fremde Objekt-IDs und Doppeltap testen.

Abnahme: P01/P02/P09; nach Timeout kein Datenverlust oder doppelter Capture.

## 3 · Research-Vertragspilot

Installierte Dienste inventarisieren, Ports aus `contracts/integrations.md`
zuordnen und schriftlich bestätigen. Ein Capture übernehmen und einen einzigen
kleinen Auftrag auslösen, Rückfrage beantworten, Ergebnis mit Quellen abrufen.
Stop, Fehler und Wiederholung nach unklarer Annahme nachweisen.

Abnahme: gleiche Request-/Run-/Wissensreferenzen über Hub und bestehende Clients;
kein zweiter Harness. P03/P04/P05.

## 4 · Magazin und unabhängiges Audio

Themen und Quellen festlegen; ersten Ausgabeentwurf erstellen, prüfen und
freigeben. Content-Paket an den getrennten Medienanbieter übergeben. Playback,
Fortsetzen, Audiofehler und Artikelrevision testen. Danach Zeitplan aktivieren.

Abnahme: P06/P07; Audioausfall beschädigt weder Ausgabe noch Research-Status.

## 5 · Betrieb und Coolify-Pilot

Statusadapter, Budget/Annahmepause, reproduzierbarer Container, Staging, minimale
private Netzverbindung, Backup-/Restoretest und Rollback. Erst dann Subdomain
und produktiven Zugang bereitstellen.

Abnahme: P08/P09 und sämtliche Produktionskriterien aus
[acceptance.md](acceptance.md). GitHub-Push und Deployment sind getrennte Schritte.

## Später

Nach realer Nutzung: Markierungen, echtes Offline-Sync, Passkeys, OCR,
Live-Transkript, synchrones Wort-Highlighting und weitere Quellenadapter.
Keinen Screenshot dieser Funktionen als bereits gelieferte Fähigkeit behandeln.
