# Designkonzept: Der Inhalt ist die Oberfläche

Ein schwarzes digitales Notizbuch: so direkt wie ein Eingabefeld, so ruhig wie
eine gute Lese-App. Die Terminal-Anmutung entsteht durch Präzision, klare
Ausrichtung und sparsame Monospace-Details. Nicht durch Code-Dekoration.

## Empfohlene Synthese

Die drei Bildrichtungen liefern unterschiedliche Stärken für **ein** UI-System:

- **Direkt** trägt Eingabe und Navigation: klare serifenlose Texte, sofortiger
  Schreibbeginn, kleine verständliche Werkzeuge.
- **Redaktion** trägt Artikel und Ausgaben: lesbare Textbreite, echter Inhaltstitel,
  sorgfältige Absätze. Serifenschrift ist eine bewusste Leseoption, kein drittes Menüdesign.
- **Linie** trägt Detailansichten und Betrieb: Information öffnet direkt an ihrer
  Stelle; feine Trennlinien ersetzen Kästen und Tabellen.

Die Synthese ist eine Arbeitsentscheidung. Noch keine der 30 Varianten wurde vom
Nutzer als verbindliche Pixelvorlage ausgewählt. [UI-System](ui-system.md) und
[Tokens](tokens.json) gelten gegenüber Bildartefakten und variierenden Icons.

## Bildauswahl für die erste Umsetzung

| Aufgabe | Ideen aus dem Portfolio | Zu übernehmendes Prinzip |
| --- | --- | --- |
| Start | 10, 21 | Gedanke und heutige Lektüre unmittelbar erreichbar |
| Eingang | 11, 14, 20 | Inhalt statt Kopfzeile; klarer Speicherzustand |
| Stimme | 12, 13 | Transkript als Arbeitsfläche, Original erhalten |
| Auftrag | 15, 16, 22 | Frage zuerst, Details aufklappen |
| Fortschritt | 17, 18, 23 | Status und nächste nötige Handlung |
| Ergebnis | 19, 24 | Lesbarer Bericht mit Quellen im Kontext |
| Magazin/Artikel | 01–06 | Redaktionelle Hierarchie und reduzierte Lesewerkzeuge |
| Betrieb | 25–28, 30 | Problem, Aktualität und konkrete Folgeschritte |
| Zugang | 29 | Kompaktes Formular, keine Markeninszenierung |

Alle [30 Bilder in der Galerie](portfolio/index.html). Ihr
[Referenzabgleich](portfolio/reference-review.md) erklärt die Ableitung aus den
zehn gelieferten Referenzen. Alle [Originalreferenzen](references/README.md)
und [15 Stitch-Screenshots](stitch/README.md) sind jetzt als Beispiele enthalten.
Der [Design-Brief aus Stitch](../design.md) fasst die Umsetzungsvorgaben zusammen.

## Was „minimal“ hier bedeutet

Nicht alle Informationen auf einen Bildschirm pressen. Stattdessen bleibt die
Fläche für die aktuelle Tätigkeit frei. Ein Artikel darf lang sein, eine
Notiz darf eine ganze Seite füllen. Die App selbst spricht möglichst wenig.

Keine permanenten Titel wie „Heute“, „Eingang“ oder „Weigend Hub“ innerhalb der
Seite. Seitentitel existieren trotzdem semantisch für Browser und Screenreader.
Eine Überschrift wie „Lokale KI in der Forschung“ bezeichnet den tatsächlichen
Auftrag und ist sinnvoller Inhalt.

## Auswahlprozess

Bildnummern und konkrete Eigenschaften auswählen, nicht ganze Bilder unbesehen
kopieren. Für den ersten UI-Durchstich werden Start, Eingabe, Aufgabenliste,
Artikel und ein Fehlerzustand als Referenzset fixiert. Änderungen danach am
gemeinsamen UI-System vornehmen, nicht getrennte Designs pro Screen schaffen.

Die Portfolio-Galerie ist ein Auswahlwerkzeug; ihr Filterraster und ihre
Überschriften sind keine Vorgabe für das Dashboard.
