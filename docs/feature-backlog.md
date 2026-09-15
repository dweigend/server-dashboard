# Erste Feature-Implementierungen

Stand: 15. September 2026. Alle zehn Produktfähigkeiten P01–P10 wurden mit
UI-/Interaktionsregeln, Browser-API, Hybridbetrieb und dem
[aktuellen Knowledge Server](knowledge-server-status.md) abgeglichen.
Die [14 GitHub-Issues](https://github.com/dweigend/server-dashboard/issues)
enthalten Ergebnis, Abnahmekriterien, Abhängigkeiten, Grenzen und Prüfungen.
Dieser Plan beschreibt offene Arbeit, keine bereits gelieferten Funktionen.

## Was jetzt starten kann

Mit [#1: Navigation](https://github.com/dweigend/server-dashboard/issues/1) und
[#2: dauerhafter Speicherung](https://github.com/dweigend/server-dashboard/issues/2)
beginnen. Danach folgen Anmeldung, Text, Foto und Stimme. Der
[#7: Vertragsabgleich](https://github.com/dweigend/server-dashboard/issues/7)
kann unabhängig davon stattfinden. Der erste nutzbare Abschluss ist ein privater,
dauerhafter Eingang, der auch ohne erreichbaren Heimserver funktioniert.

Das vorhandene SvelteKit-Grundgerüst, der Produktionsbuild und Prozess-Healthcheck
werden erweitert. Die Implementierung baut keine neue Scaffold-App. Reale Inhalte
kommen erst nach Anmeldung und dauerhafter Speicherung hinzu. Bis dahin bleiben
Ansichten ausdrücklich synthetische Vorschauen.

## Reihenfolge und Abhängigkeiten

| Issue | Umsetzung | Voraussetzung / Grenze |
| --- | --- | --- |
| [#1](https://github.com/dweigend/server-dashboard/issues/1) | Mobile Navigation, Tokens, gemeinsame UI-Zustände | sofort; fünf Ziele, kein neuer Wissens-Tab |
| [#2](https://github.com/dweigend/server-dashboard/issues/2) | Hub-PostgreSQL, Migrationen, private Dateiablage, Readiness | sofort; keine Knowledge-Tabellen |
| [#3](https://github.com/dweigend/server-dashboard/issues/3) | Privater Login, TOTP, Recovery und Sessions | #1, #2; Auth-Spike vor Festlegung der Bibliothek |
| [#4](https://github.com/dweigend/server-dashboard/issues/4) | Dauerhafte Textnotizen, Bearbeiten, Retry und Konflikte | #1–#3; unabhängig vom Knowledge Server |
| [#5](https://github.com/dweigend/server-dashboard/issues/5) | Fotoaufnahme/-auswahl und geschützte Uploads | #4; keine OCR oder automatische Übernahme |
| [#6](https://github.com/dweigend/server-dashboard/issues/6) | Sprachnotiz aufnehmen, anhören und speichern | #5; keine automatische Transkription |
| [#7](https://github.com/dweigend/server-dashboard/issues/7) | Produzentenverträge und synthetische Consumer-Beispiele abgleichen | sofort; konkrete Lücken dokumentieren |
| [#8](https://github.com/dweigend/server-dashboard/issues/8) | Private Verbindung und wiederaufnehmbare Textübernahme | #4, #7; Remote-Auth und referenzfreier Intake upstream fehlen |
| [#9](https://github.com/dweigend/server-dashboard/issues/9) | Zettel, Claims, Belege und Suche lesen | #1, #3, #7; Fixtures möglich, Live-Lesen/Suchen noch gesperrt |
| [#10](https://github.com/dweigend/server-dashboard/issues/10) | Auftrag, laufende Jobs, Rückfragen, Stop und Ergebnisse | #1, #3, #7; allgemeine Research-API noch nicht vorhanden |
| [#11](https://github.com/dweigend/server-dashboard/issues/11) | Tagesausgabe und fokussierter Artikelreader | #1, #3, #7; Publikation/Pakete upstream noch offen |
| [#12](https://github.com/dweigend/server-dashboard/issues/12) | Audio abspielen und Position fortsetzen | #11; separater Medienanbieter und Rechtevertrag erforderlich |
| [#13](https://github.com/dweigend/server-dashboard/issues/13) | Betrieb, Aktualität, Speicher, Sicherung und Budget | #1, #3, #7; reale Werte erst mit geprüftem Collector |
| [#14](https://github.com/dweigend/server-dashboard/issues/14) | Staging, Wiederherstellung und Deployment-Abnahme | #3–#5, #8, #13; produktive Aktivierung bleibt eigener Schritt |

Die Reihenfolge folgt Fähigkeiten, keinen Terminzusagen. Insbesondere verlangt
sie nicht, dass der Knowledge Server seine Experimentieroberfläche zugunsten
des Dashboards zurückstellt. Die dortigen Issues werden verlinkt, nicht dupliziert.
Live-Adapter werden erst nach verifizierter Produzentenfähigkeit eingeschaltet;
gleiche TypeScript-Typen oder vorhandene Screens reichen nicht.

## Vollständiger Funktionsabgleich

| Produktfähigkeit | Erste Lieferung / Abdeckung |
| --- | --- |
| P01 · Privater Zugang | #2, #3; öffentliche Nutzung erst nach #14 |
| P02 · Text, Foto, Stimme | #4, #5, #6; explizite Wissensübernahme separat #8 |
| P03 · Recherche beauftragen | #10; Frage zuerst, weitere Grenzen auf Nachfrage |
| P04 · Laufende Arbeit | #10; Extraktions-, Research- und Mediajobs nicht gleichsetzen |
| P05 · Ergebnisse mit Quellen | #9, #10, #11; Ausführung, Review und Freigabe getrennt |
| P06 · Tägliches Magazin | #11; Fixtures zuerst, reale Entwürfe/Freigabe und Zeitplan später |
| P07 · Hören und Fortsetzen | #12; Medienfehler verändern keine Research-Ergebnisse |
| P08 · Betrieb | #13, #14; unbekannte/veraltete Daten niemals als gesund darstellen |
| P09 · Verlässlichkeit | #2–#6, #8 und #14; Timeout, Duplikate, Rechte, Neustart und Restore prüfen |
| P10 · Wissen und Evidenz | #7, #9; echte Producer-Werte, Gegenbelege und Revisionen |

Jedes UI-Issue folgt [design.md](../design.md): eine kompakte obere Navigation,
90 Prozent Arbeitsfläche bei normaler Höhe, keine redundanten Titelzeilen,
keine Tabellen/Kacheln und alle Styles in `src/app.css`. Lange relevante Texte
bleiben lesbar; kurze UI-Beschriftung bedeutet nicht gekürztes Wissen.

## Bewusst folgende Ausbaustufen

Diese Ideen wurden ebenfalls geprüft. Sie sind nicht stillschweigend Bestandteil
der ersten sechs Implementierungen und werden nach Auswahl kleiner zugeschnitten:

- Modellfreie Wissensbearbeitung und revisionsgebundene Review-Aktionen folgen
  auf #7/#9. Das Produzentensystem führt bereits lokale Fachoperationen; der
  externe Rechte-/Konfliktvertrag muss dieselben Regeln erhalten.
- Magazinfreigabe, echte tägliche Planung, Sommerzeit/Wiederanlauf sowie verbindliche
  Budgets und Annahmepause folgen auf #10/#11/#13 und producerseitige Durchsetzung.
  Musterwerte und eine allein lokale Pause gelten nicht als bestätigte Grenzen.
- Transkription braucht einen gewählten Verarbeitungsweg, Datenfreigabe und
  Grenzen. Originalaufnahmen werden bereits in #6 erhalten. OCR, Live-Transkript
  und Wort-Highlighting folgen nicht automatisch aus erfolgreicher Speicherung.
- Echte Offline-Synchronisierung, Markierungen, Passkeys, fortgeschrittene Suche
  und weitere Quellenadapter folgen nach realer Nutzung. Browser-Entwürfe sind
  keine zugesicherte Offline-Queue und kein Ersatz für serverbestätigte Speicherung.
- Handlungsrelevante Benachrichtigungen und ein optionaler Matrix-Kanal werden
  erst nach stabilen Statusbeobachtungen geplant; keine Meldung bei jedem Poll.
- Die 30 Mockup-Richtungen bleiben Alternativen. Eine finale Bildauswahl und
  Serif-/Sans-Präferenz betreffen die visuelle Abnahme, nicht das Starten der
  Navigation nach dem bereits festgelegten UI-System.

Nicht zum Produkt gehören Teams, öffentliche Registrierung, Bezahlfunktionen,
Gamification, Shell-Zugriff, ein zweiter Forschungsharness, eine eigene
Literaturverwaltung oder Podcastproduktion im Dashboard.

## Prüfung und Pflege

Vor Umsetzung den aktuellen Repository- und Produzentenstand erneut lesen.
`bun run validate` ist Pflicht; pro Issue kommen gezielte Datenbank-, Vertrags-,
Browser- oder Deploymentprüfungen hinzu. Die Issue-Checkboxen werden erst mit
Nachweis abgeschlossen. Private Inputs, Hostinventare und Zugangsdaten bleiben
außerhalb Git. Wenn sich ein Vertrag ändert, Dokumentation und abhängige Issues
zusammen aktualisieren.
