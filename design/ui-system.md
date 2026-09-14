# UI-System v0.1

## Fläche und Navigation

Die App verwendet eine einzige, 48 CSS-Pixel hohe Hauptnavigation mit fünf
gleich verteilten Icons: `House`, `Inbox`, `ListTodo`, `BookOpen`, `Server`.
Beschriftungen für Assistenztechnik: Heute, Eingang, Aufgaben, Magazin, Betrieb.
Aktiver Ort: weiße Unterstreichung und `aria-current="page"`. Kein Farbcode.

Keine zweite Titelzeile, kein Markenblock, Avatar, permanentes Zahnrad, Footer,
Bottom-Navigation oder Breadcrumb. Einstellungen werden innerhalb Betrieb
geöffnet. Kontextuelles Zurück führt zur ursprünglichen Position und ersetzt
bei immersiven Detailansichten bei Bedarf die Hauptnavigation.

### Die 90-Prozent-Regel messbar machen

Bezugsfläche ist der nutzbare App-Viewport nach Browser-/Betriebssystem-Chrome
und Safe-Areas. Gemessen wird reservierte globale UI-Fläche, nicht die Anzahl
weißer Pixel oder die Füllung mit Text. Die Hauptnavigation ist die einzige
dauerhafte globale UI und belegt 48 px. Bei 844 px sind damit 94,3 Prozent,
bei 568 px 91,5 Prozent der Höhe für die Arbeit verfügbar.

Artikel-, Eingabe- und aufgabenbezogene Aktionen gehören zur Arbeit, dürfen
aber nicht als Vorwand für große Werkzeugleisten dienen: je Zustand nur die
benötigten Aktionen, grundsätzlich in einer kompakten Reihe. Ein audiobezogener
Transportbereich ersetzt im immersiven Hörmodus die globale Navigation; er
wird nicht zusätzlich dauerhaft unter den Inhalt geklebt.

Bei nutzbarer Höhe unter 480 px (Tastatur, Querformat) scrollt die Navigation
aus dem Sichtbereich. Der Eingabefokus und die primäre Aktion bleiben erreichbar.
Barrierefreie Textvergrößerung hat Vorrang vor starren Höhen: keine Schrift
verkleinern oder abschneiden, um eine Quote zu erfüllen. Abweichungen für
Zoom/Assistenztechnik werden ausdrücklich dokumentiert und getestet.

## Gestaltungstokens

Maschinenlesbare Quelle: [tokens.json](tokens.json), einfaches projektspezifisches
Format. Noch keine behauptete DTCG- oder Komponentenbibliotheks-Implementierung.

| Element | Vorgabe |
| --- | --- |
| Hintergrund | #000000 |
| Primärtext | #FFFFFF |
| Sekundärtext | #B8B8B8; keine blassen Fließtexte |
| Grenzen | #666666 bei funktionalen Begrenzungen; keine dekorativen Rahmen |
| Fokus | 2 px weiß, 2 px Abstand, auch auf weißen Buttons sichtbar abgesetzt |
| Ecken | 0 px; auch Dialoge und Schalter eckig |
| Icons | Lucide, 20 px optisch, 1,75 px Strich; keine Iconfonts |
| Touch-Ziele | mindestens 44 × 44 CSS-Pixel, ohne überlappende Trefferflächen |
| Inhaltsrand | 16 px mobil, 24 px ab 768 px |
| UI/Text | System-Sans, 16 px/1,5; keine neuen Font-Downloads im ersten Schritt |
| Lesen | 18 px/1,65, optional 20/22/24 px; Standard Sans, Serif optional |
| Inhaltstitel | 28 px/1,2, maximal zwei Zeilen vor normalem Umbruch |
| Metadaten | 14 px/1,4; sparsame System-Monospace-Akzente |
| Lesebreite | maximal 65ch; App-Spalte maximal 720 px |
| Bewegung | 120 ms für Zustandswechsel; reduced-motion ohne Animation |

Die 44px-Ziele sind eine bewusst strengere Produktregel als die 24px-
Mindestanforderung mit Ausnahmen in WCAG 2.2 AA. Quelle:
[W3C Target Size](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html).
Kontrastziele: mindestens 4,5:1 für normalen Text und 3:1 für wesentliche
grafische Bedienelemente; im späteren Browser-Rendering nachmessen.

## Komponentenvertrag

| Baustein | Verhalten und Begrenzung |
| --- | --- |
| AppNavigation | Fünf Links, 48 px, zugängliche Namen, keine zusätzlichen Badges außer Handlungsbedarf |
| IconButton | echter Button, Name, Fokus, Disabled-/Busy-Zustand; Tooltip nicht alleiniger Name |
| TextRow | Text und höchstens ein kompakter Status; vollständige Zeile anklickbar |
| CaptureComposer | Mehrzeiliger Text, Foto/Mikrofon, Speichern; kein eigener Titel |
| Disclosure | Details am Auslöser öffnen, Zustand ankündigen, kein Seitenwechsel |
| StatusLine | Symbol + kurzes Wort; Zeit der letzten Beobachtung bei veralteten Daten |
| ReadingDocument | semantische Überschriften und Absätze, anklickbare Quellenanker |
| AudioTransport | Play/Pause, Position, Tempo im Kontext; kein Autoplay |
| InlineFeedback | direkt am betroffenen Inhalt, keine verdeckenden Dauertoasts |
| Dialog | nur für nötige Entscheidung; Fokus halten und danach zurückgeben |
| EmptyState | eine kurze Zeile und sinnvolle Aktion, keine Illustration |

Zustände je bedienbarer Komponente: normal, hover soweit vorhanden, Fokus,
gedrückt/aktiv, deaktiviert, laufend, Fehler. Busy deaktiviert nur die betroffene
Mutation; restliche Inhalte bleiben erreichbar. Statusmeldungen sind gezielte
Live-Regionen, keine ständig neu vorgelesene Aufgabenliste.

## Umsetzungskonventionen

Svelte 5 + SvelteKit; ungestylte Bits-UI-Primitiven und ausgewählte
shadcn-svelte-Muster. Alle App-Regeln und CSS-Variablen liegen in `src/app.css`.
Semantische Klassen im Markup; keine Inline-Stile, `<style>`-Blöcke oder
Tailwind-Utilityketten. Falls Tailwind später benötigt wird, nur zentral
einbinden; es ist keine Voraussetzung für dieses System.

Die responsive Desktopfassung behält die ruhige Spalte. Kein zusätzliches
Desktop-Dashboard mit Seitenleiste oder Kennzahlenkarten. Dialoge, Zoom,
Tastatur und `prefers-reduced-motion` werden von Anfang an berücksichtigt.

## Sprachregeln

„Speichern“, „Starten“, „Erneut versuchen“, „Antwort nötig“, „Nur auf diesem Gerät“.
Keine technischen Zustandsnamen im UI. IDs, Tokens und rohe Logs nur in
bereinigten, bewusst geöffneten Diagnosedetails. Platzhalter ersetzen keine
Formularlabels; sichtbare kurze Feldnamen oder zugängliche Labels verwenden.
