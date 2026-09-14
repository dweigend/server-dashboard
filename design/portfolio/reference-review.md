# Referenzabgleich

## Verbindliches Ziel

Ein persönlicher mobiler Arbeitsraum für Lesen, Hören, Eingabe und Recherche.
Schwarzer Hintergrund, weiße Schrift, eckige Flächen, kurze Texte und sinnvolle
Icons. Keine Marken-, Seiten- oder Zahnradleiste. Hauptnavigation ausschließlich
oben. Mindestens 90 Prozent der Appfläche sollen für Inhalt und Eingabe
verfügbar bleiben; das bedeutet nicht, jede Fläche mit Text zu füllen.

## Zehn Referenzen

1. **Dunkle Film-Leseansicht:** Übernommen werden ruhige Texthierarchie und
   kontextbezogene Aktionen. Cover, Avatar, Metadatenhäufung und untere
   Pillenleiste entfallen. Entwürfe: 02, 07, 10.
2. **Heller synchroner Hörtext:** Übernommen werden Satzfokus und ein
   unaufdringlicher Transportbereich. Hintergrund wird schwarz; nicht aktive
   Absätze bleiben ausreichend sichtbar. Entwurf: 03.
3. **Lesen/Hören mit Typografie-Steuerung:** Übernommen wird die direkte
   Anpassung des Textes. Die runden permanenten Schalter werden zu kleinen,
   temporären eckigen Werkzeugen. Entwürfe: 04, 06.
4. **Großes Live-Diktat:** Übernommen wird der unmittelbar sichtbare Gedanke.
   Lichtsaum, Hand, Telefonrahmen und große Mikrofonkugel entfallen.
   Entwürfe: 12, 13.
5. **Terminal-Telefon mit Verlauf:** Übernommen wird nur die knappe
   Monospace-Anmutung. Farbverlauf, schräges Telefon und Präsentationsdekor
   entfallen. Entwürfe: 15 und Richtung Linie.
6. **Text mit Punktinteraktion:** Übernommen werden unmittelbare Eingabe und
   wenige eindeutige Zustände. Das Punktfeld wird nicht als neue Tastatur
   kopiert. Entwürfe: 11, 18, 20.
7. **Dunkles redaktionelles Portfolio:** Übernommen werden Typografie,
   feine Trennlinien und zurückhaltende Hierarchie. Lange Einleitung,
   Kontaktzeile, große Außenabstände und Datumswiederholungen entfallen.
   Entwürfe: 01, 08, 09, 19, 24.
8. **Eckige Einstellungen:** Übernommen werden klare Reihen und eindeutige
   Schalter. Große Settings-Überschrift, doppelter Erklärungstext und helle
   Fläche entfallen. Entwürfe: 25, 27, 28, 30.
9. **Aufgaben-Upgrades:** Übernommen werden klare Aufgaben- und Statussymbole.
   Das Kachelraster, Gamification und dekorative Kennzahlen passen nicht zum
   Fokusziel. Entwurf: 17.
10. **Mobile Akkordeonfolge:** Übernommen wird das Öffnen direkt im Kontext.
    Dekorative Illustrationen, lange Beschreibungen und prominente
    Kontakt-/Markenzeilen entfallen. Entwürfe: 05, 16, 21–23, 26.

## Drei Richtungen

- **Redaktion, 01–10:** Typografische Lese- und Höransichten, Quellen und
  Markierungen. Serifbetonung mit ruhigeren Varianten.
- **Direkt, 11–20:** Größere serifenlose Eingabe, Stimme, Foto, Aufgabenfolge.
  Der Inhalt selbst ist das Arbeitsfeld.
- **Linie, 21–30:** Monospace, feine Regeln und progressive Offenlegung.
  Details, Betrieb und Zugang bleiben konkret.

## Erzeugung und Sichtprüfung

Alle 30 Einzelmotive wurden mit dem eingebauten GPT-Image-Werkzeug erzeugt.
Sieben Motive wurden anschließend ebenfalls mit GPT-Image gezielt bereinigt:
01, 07, 10, 17, 21, 26, 29. Insgesamt gab es 37 erfolgreiche Bildausgaben;
das finale Portfolio enthält genau 30 PNG-Dateien. Die ursprünglichen
Werkzeugausgaben blieben außerhalb dieses Repositorys unverändert erhalten.

Jede ausgegebene Fassung wurde visuell betrachtet. Bereinigt wurden zu viele
Metadaten, ungewollte Referenzfotos, ein Textartefakt sowie übergroße dekorative
Symbole. Keine App-Kopfzeile, kein Kennzahlenraster und kein Telefonrahmen sind
in den finalen Bildern erforderlich.

## Grenzen der Mockups

Die Motive sind visuelle Ideen, keine implementierten Bildschirme. Aktive
Navigationsmarkierungen, Icons, Schriftmaße und Abstände variieren leicht.
Die 48px- und 90%-Vorgaben sind gestalterische Ziele; eine pixelgenaue
Umsetzungsprüfung ist erst im späteren responsiven Prototyp möglich.
Es gibt bewusst keine Behauptung einer vollständig getesteten Bedienbarkeit
der abgebildeten App. Artikeltexte, Quellen und Betriebszustände sind
Demoinhalte. Die Galerie selbst ist lokal bedienbar.

## Dateien

- `index.html`: Galerie mit Filtern, Großansicht und lokaler Merkliste.
- `images/01.png` bis `images/30.png`: unveränderte finale Einzelbilder.
- `manifest.json`: Zuordnung, Prompts und Korrekturen; interne lokale Quellpfade
  wurden für dieses eigenständige Repository entfernt.
