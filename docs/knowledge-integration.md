# Abstimmung mit dem Wissens-MVP

Aktualisiert: 15. September 2026. Die Produzentenseite liegt jetzt im eigenen
[Knowledge-Server-Repository](https://github.com/dweigend/knowledge-server).
Pilotverträge, Bewertungsregeln und lokale Implementierung existieren inzwischen.
Der [aktuelle Codeabgleich](knowledge-server-status.md) beschreibt die noch
fehlende Remote-Authentifizierung, Textaufnahme ohne Referenz und JSON-Suche.
Diese Seite definiert das Ziel der Integration, keine bereits bereitgestellte API.
Die ursprüngliche Abstimmung vom 14. September bleibt unten als Historie erhalten.

## Verbindliche Abgrenzung im Gesamtsystem

Knowledge besitzt nur seine Wissensfachaufgabe und dazu erforderliche Verarbeitung.
Allgemeine Ausführung, Rohnotizen, Redaktion, Transkription und Audio haben
[eigene Modulbesitzer](system-modules.md). Die folgenden Integrationsschritte
sind optionale Wissensaktionen; sie verpflichten nicht zur Übernahme jedes Captures.
Die aktuelle Referenzpflicht ist eine Knowledge-Grenze, kein Capture-Defekt.
Ein erster Pilot kann vorhandenes Wissen lesen und unterstützte referenzgebundene
Beiträge übertragen. Freie Wissensnotizen sind eine separate Produktentscheidung.

## Gemeinsamer erster Ablauf

```text
Text oder ausgewählte Passage erfassen → Original und Herkunft bewahren
→ Behauptung mit Belegbeziehungen vorschlagen → konkrete Revision prüfen
→ Zettel/Wiki verknüpfen → mit Gegenbelegen und Unsicherheit wiederfinden
```

Der lokale Wissens-MVP beginnt mit einem Thema, fünf bis zehn Quellen und fünf
bis zehn Behauptungen. Text, Markdown und manuell ausgewählte Passagen reichen.
Eigene Gedanken brauchen keinen künstlichen wissenschaftlichen Beleg.

Der Nutzer priorisiert jetzt den Aufbau dieses Wissensfundaments. Dashboard-UI,
Internet-Zugang, Tailscale-Verbindung und Magazin sind keine Voraussetzungen
für den ersten lokalen Durchlauf. Die Python-Anwendung kann zunächst über
schmale Werkzeuge oder CLI bedient werden. Später verwendet ihr HTTP-Adapter
dieselben Anwendungsfälle; manuelle Änderungen benötigen keinen Modellaufruf.

## Zuständigkeiten

| Bereich | Wissenssystem | Dashboard |
| --- | --- | --- |
| Wissensbeitrag | explizite unterstützte Übernahme mit Herkunft und Revision | persönliche Captures unabhängig davon dauerhaft speichern |
| Quellen | Identität, unveränderliche Versionen, Originale und Fundstellen | erlaubte Ausschnitte und Quellenreferenzen darstellen |
| Zettel/Wiki | gemeinsames Notizmodell, Revisionen und begründete Links | kanonische Notiz lesen; Änderungen über Fachoperationen vermitteln |
| Behauptungen | Aussage, Geltungsbereich und Qualifikationen | genaue Aussage und Begrenzungen sichtbar halten |
| Evidenz | Fundstellen, Beziehung und Einzelbeurteilung | Pro, Contra, Einschränkungen und unklare Belege aufklappbar zeigen |
| Gesamtbewertung | begründetes Urteil und geprüfte Abhängigkeiten | geliefertes Urteil darstellen, niemals selbst berechnen |
| Review | Entscheidungen über festgelegte Revisionen und erneuten Prüfbedarf | bewusste Prüfaktion vermitteln; veraltete Entscheidung nicht anwenden |
| Suche | Volltext, Beziehungen, relevante Gegenbelege und Suchumfang | Treffer verständlich darstellen, keine neue Suchautorität |
| Wissensverarbeitung | nur eigene Import-/Extraktions-/Pflegejobs | Herkunft dieser Jobs anzeigen; allgemeine Hermes-Aufträge gehören zu Task Service |

Ein kanonischer Eingang vom Notiztyp `inbox` ist bereits ein Objekt des
Wissenssystems. Er ist nicht identisch mit einem noch unübertragenen Dashboard-Capture.
Die Zuordnung verwendet IDs und Revisionen; gleichlautende Texte sind kein
zuverlässiger Identitätsnachweis.

## Was die Oberfläche wissen muss

Die folgenden Angaben sind ein fachlicher Mindestbedarf, keine fertig
vereinbarten Feldnamen oder Endpunkte:

- **Notiz:** ID/Revision, Art, Inhalt, Urheberschaft, Quellen-, Behauptungs- und
  Verbindungsreferenzen. Eine Revision darf nicht still überschrieben werden.
- **Behauptung:** ID/Revision, präzise Aussage und Geltungsbereich; verknüpfte
  Evidenzreferenzen und die zugehörige Bewertungsrevision.
- **Beleg:** unveränderliche Quellenversion, genaue Fundstelle, Ausschnitt mit
  Auslieferungsrecht, Beziehungsart, Begründung und Einzelbeurteilung.
- **Abhängigkeit:** gemeinsame Studien-/Datensatzbasis oder unbekannte Überlappung.
  Drei Texte über dieselbe Studie sind nicht drei unabhängige Bestätigungen.
- **Bewertung:** Evidenzlage, Belastbarkeit, Begründung, geprüfter Quellenumfang,
  Suchabdeckung, Reviewstatus und die konkret zugrunde liegenden Revisionen.
- **Suche:** Treffer mit IDs/Revisionen, Relevanz und verfügbarer Abdeckung;
  relevante Gegenbelege und Einschränkungen bleiben im Ergebnis zugänglich.

Die stabilen API-Werte werden zuerst im Wissenssystem festgelegt. Dashboard übernimmt
und übersetzt sie; die bestehenden Produktlabels werden nicht voreilig zu
Enums eines zweiten Vertrags gemacht. Unbekannte Werte erscheinen neutral mit
einem Kompatibilitätshinweis und dürfen keine Freigabeaktion aktivieren.

## Vier verschiedene Zustandsachsen

| Achse | Bedeutung | Nicht daraus ableiten |
| --- | --- | --- |
| Ausführungsstatus | Auftrag läuft oder ist beendet | inhaltliche Richtigkeit |
| Evidenzlage | offen, überwiegend gestützt, gemischt oder überwiegend widersprochen | Wahrheitswahrscheinlichkeit |
| Belastbarkeit | gering, mittel oder hoch, jeweils begründet | Richtung der Evidenzlage |
| Reviewstatus | vorgeschlagen, geprüft oder erneute Prüfung nötig | Publikationsfreigabe oder absolute Wahrheit |

Eine zusätzliche Publikationsentscheidung betrifft eine konkrete Ausgabe und
deren Abhängigkeiten. Sie gehört zu einer späteren Fähigkeit. Ein geprüftes
Urteil kann eine Behauptung überwiegend widerlegen; „geprüft“ heißt nicht „wahr“.

Die aktuellen Dashboard-Felder `Result.reviewState` und `Article.reviewState` gehören
zur Ergebnis-/Publikationssicht. Sie bilden das Behauptungsregister nicht ab.
Insbesondere ist `needs_changes` nicht dasselbe wie „erneute Prüfung nötig“:
Neue Belege können eine zuvor korrekte Bewertung prüfbedürftig machen, ohne
dass bereits eine konkrete Korrektur entschieden wurde. Kein automatisches
Mapping auf `accepted` und kein Wahrheits-Prozentwert.

## Schlanke Interaktion

Eine Quellen- oder Behauptungsreferenz im Zettel/Ergebnis öffnet die Details
inline oder als fokussierte Unteransicht. Kein neuer Hauptnavigationseintrag
und kein Statistikdashboard. Die präzise Behauptung steht zuerst, darunter ein
kurzer Bewertungsstand. Begründung, Belege und Suchumfang folgen auf Nachfrage.

„Belege“ zeigt textuelle Gruppen für Unterstützung, Widerspruch, Einschränkung
und Unklarheit. Eine leere Gruppe bedeutet keine positive oder negative
Bestätigung. Herkunft und Abhängigkeiten bleiben bei jeder Fundstelle erreichbar.
Keine Tabellen, Ampelwahrheiten oder dekorativen Bewertungsanzeigen in der UI.

Eine Prüfaktion nennt die konkrete Behauptungs-/Bewertungsrevision. Änderungen
an relevanten Abhängigkeiten machen die Entscheidung ungültig oder prüfbedürftig
gemäß dem Wissensvertrag; die UI zeigt die neue Fassung, bewahrt einen eigenen
Entwurf und führt eine alte Aktion nicht still erneut aus. Frühere Urteile bleiben
als historische Urteile erkennbar. Bewertungsskalen werden nicht in Dashboard erfunden.

## Lieferstufen statt übergroßem Backendauftrag

| Stufe | Fähigkeit | Dashboard-Konsequenz |
| --- | --- | --- |
| K0 · lokal | Bewertungsregeln und fachliche Verträge | gemeinsame Beispiele und IDs abstimmen |
| K1 · lokal | Quelle → Behauptung/Belege → Review → Zettel → Suche, mit Historie/Restore | Referenz für spätere Integration; keine Web-Abhängigkeit |
| H1 · Dashboard | Anmeldung, Capture-Staging, Darstellung mit Fixtures | klar als Vorschau gekennzeichnet |
| K2 · Verbindung | authentifiziertes Lesen/Suchen und unterstützte Wissensbeiträge | erster echter Dashboard-/Wissensdurchlauf; kein freier Intake als Pflicht |
| X · Task Service | dauerhafte Annahme, Abgleich, Rückfrage, Stop und Budget | eigener allgemeiner Auftragsbereich, keine Knowledge-Ausbaustufe |
| P/M · Dashboard magazine/Media Service | freigegebene Pakete, tägliche Ausgabe, unabhängiges Audio | Magazin im Dashboard, Medien im Media Service; Knowledge optional |

Die Stufen benennen Fähigkeiten, keine neuen Dienste. Speicherung eines Fotos
oder einer Sprachnotiz in Dashboard verpflichtet den Wissens-MVP nicht zu OCR, PDF-
Import oder Transkription. K2 überträgt nur die dort ausdrücklich unterstützten
Textformate; Anhänge bleiben in Dashboard. Eine Teilübernahme wird ausdrücklich als
solche ausgewiesen und darf nicht den gesamten Capture als übernommen markieren.

Für das erste Release von K2 ist der einfachste Vertrag: nur Captures ohne
Anhänge übertragen. Bei Anhängen einen eigenständigen Text-Capture erstellen
lassen oder Übernahme noch nicht anbieten; niemals Anhänge still weglassen.

## Gemeinsame Abnahmebeispiele

1. Eigener Gedanke ohne Quellen wird mit Urheberschaft im Dashboard gespeichert.
   Keine implizite Knowledge-Übernahme, kein erfundener Beleg oder Evidenzurteil.
2. Eine Behauptung hat direkte Unterstützung, eine indirekte Einschränkung,
   einen wiederholenden Bericht derselben Studie und einen unklaren Befund.
   Dashboard zählt keine Stimmen; die begründete Bewertung kommt aus Knowledge.
3. Eine neue relevante Quelle löst gemäß Wissensregel erneuten Prüfbedarf aus.
   Das frühere Urteil und seine damaligen Eingaben bleiben nachvollziehbar.
4. Ein Konflikt bei Prüfung/Bearbeitung bewahrt die Nutzerfassung; ein erneuter
   Request mit gleichem Schlüssel erzeugt kein zweites Objekt oder Urteil.
5. Ein Timeout nach Übernahme wird über Request-ID abgeglichen. Die kanonische
   Referenz und Revision stimmen für Dashboard, CLI und Hermes-Werkzeuge überein.
6. Ein Suchtreffer führt zur genauen Quellenversion; Gegenbelege, unbekannte
   Überlappungen und die Grenzen des ausgewerteten Bestands bleiben sichtbar.
7. Fehlende Rechte sperren Objekt und Quellenpassage; eine bekannte ID oder
   ein Modellvorschlag darf keine Berechtigung herstellen.

## Vertragsführung

Die Wissensseite führt Fachregeln, Schemas und Bewertungsrubrik. Dashboard führt UI,
Browser-API und Adaptermapping. Kein gemeinsames Codepaket oder zweites Schema-
Repository vor Bedarf. Sobald die Produzentenschemas existieren, werden Version
und konkrete Beispiele festgehalten und auf beiden Seiten gegen denselben Stand
geprüft. Additive Änderungen dürfen keine stillen Bedeutungsänderungen enthalten.

Die bestehende Dashboard-OpenAPI bleibt ein Entwurf mit 38 Operationen; sie enthält
noch keine fertige Knowledge-CRUD-API. Der nächste Vertragsschritt ergänzt nach
Abstimmung Notiz-/Behauptungsansichten, Suche und Prüfaktionen. Bis dahin sind
diese Funktionen beschrieben, aber nicht implementierungsfertig behauptet.

## Historie: Ergebnis der direkten Abstimmung am 14. September

Der Agent im Wissensdatenbank-Task hat die aktualisierten Dashboard-Dokumente geprüft
und den producerseitigen Abgleich in `knowledge-mvp.md` ergänzt. Seine beiden
anfänglichen Lücken sind konzeptionell geschlossen: explizite Wissensoperationen
und getrennte Abnahme von Wissen, Agentenaufträgen und Publikation.

Die Abschlussprüfung meldet keinen verbleibenden Konflikt auf Konzeptebene.
Zwei Präzisierungen wurden übernommen: Request-Abgleich gehört schon zum ersten
Wissenspilot; modellfreie Operationen setzen weder Run-ID noch Hermes-Ausführung
voraus. Der Serverprojekt-Abgleich ist in Commit `963d647` festgehalten.

Zum damaligen Zeitpunkt fehlten Bewertungsrubrik und genaue Schemas. Inzwischen
sind lokale Pilotverträge implementiert; offen bleibt deren externer
Revision-/Rechte-/Fehlervertrag. Maßgeblich ist der [aktuelle Stand](knowledge-server-status.md).
Die bestätigte Konzeptübereinstimmung ist keine API-Freigabe oder
Behauptung einer bereits funktionierenden Integration.
