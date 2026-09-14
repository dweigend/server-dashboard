# Screens und Interaktionen

Die Routen sind ein Zielvertrag, noch keine vorhandenen Seiten. Globale
Navigation und Tokens gelten für alle angemeldeten Screens.

| Route | Einstieg und Hauptaktion | Details |
| --- | --- | --- |
| `/` | Gedanke festhalten; aktuelle Ausgabe; maximal drei relevante Aufgaben | Antwortbedarf vor routinemäßiger Aktivität |
| `/inbox` | Textfeld mit Foto/Mikrofon; gespeicherte Eingänge darunter | Capture öffnen, bearbeiten, in Wissen übernehmen |
| `/inbox/:id` | Inhalt direkt lesen/bearbeiten | Anhänge, Transkript, Speicher-/Übernahmestatus |
| `/tasks` | Kurze Aufgabenliste und Plus | Filter Alle/Läuft/Antwort nötig/Erledigt, Fehler bleiben auffindbar |
| `/tasks/new` | „Was soll recherchiert werden?“ und Starten | Frist, Ausgabelänge, Quellenvorgaben, Budget aufklappen |
| `/tasks/:id` | Tatsächlicher Auftragstitel, Status, aktuelle Etappe | Rückfrage, Ergebnis, Quellen, Stoppen oder erneut starten |
| `/magazine` | Aktuelle Ausgabe mit wenigen Schlagzeilen | ältere Ausgaben, Hörliste, Themen |
| `/magazine/:id` | Ausgabe öffnen | Entwurf prüfen und ausdrücklich freigeben |
| `/articles/:id` | Artikeltext | Quellen, Hören, Lesedarstellung, Auftrag aus Auswahl |
| `/operations` | Handlungsbedarf und kompakte Zustandszeilen | Sicherung, Budget, Annahmepause, Einstellungen |
| `/settings` | konkrete Werte ohne Seitentitelzeile | Zeit, Themen, Lesedarstellung, Zugang |
| `/login` | E-Mail, Passwort, Anmelden; danach zweiter Faktor | keine Hauptnavigation; Wiederherstellung |

## Notiz und Anhänge

Tippen → Speichern → serverbestätigter Eingang. Ein Übertragungsfehler lässt den
Entwurf stehen. Der Browser behält während der Sitzung einen lokalen Entwurf;
dauerhafte lokale Ablage erst nach ausdrücklicher Geräteentscheidung. Ein
Serverneustart darf bereits bestätigte Captures nicht verlieren.

Foto: Systemauswahl/Kamera → lokale Vorschau → Entfernen oder Speichern.
Mikrofon: Berechtigung erst nach Tap → Aufnahme mit Zeit und Stop → Anhören,
Verwerfen oder Speichern. Abgelehnte Berechtigung zeigt Text-/Dateieingabe als
Fallback. Kein automatischer erneuter Berechtigungsdialog. Formatunterstützung
mit `MediaRecorder.isTypeSupported` prüfen; iOS und Android real testen.

Transkription ist separat vom Speichern. Aufnahme bleibt erhalten, wenn die
Transkription fehlschlägt. Ein Transkript ist bearbeitbar und überschreibt nicht
das Original. Im ersten Release muss keine Live-Transkription erscheinen.
OCR und Live-Diktat sind Folgefunktionen, nicht Voraussetzung für Foto/Audio.

Ein Capture ist zunächst ein Eingang, keine wissenschaftlich geprüfte Wissensnotiz.
„Übernehmen“ registriert ihn über Research. Nach bestätigter Übernahme wird die
kanonische Wissensreferenz angezeigt; Hub bearbeitet diese nicht als zweite Kopie.

## Wissensreferenz und Belege

Ein übernommener Eingang öffnet seine kanonische Notiz. Verlinkte Behauptungen
zeigen zunächst die genaue Aussage und den kurzen Bewertungsstand; Begründung,
Unterstützung, Gegenbelege, Einschränkungen und Quellenumfang werden bei Bedarf
geöffnet. Kein zusätzlicher Hauptnavigationseintrag. Die Detailansicht folgt
der vorhandenen Flächenregel und bewahrt Absatz, Fokus und Zurücknavigation.

Evidenzlage, Belastbarkeit und Prüfstatus bleiben getrennt. „Geprüft“ bedeutet
nicht „wahr“ und nicht „veröffentlicht“. Neue relevante Belege können erneute
Prüfung erfordern; das frühere Urteil bleibt historisch erkennbar. Keine
Prozentwerte, Stimmenzählung oder Tabellen. Details und gemeinsame Abnahmefälle
stehen im [Wissensabgleich](../docs/knowledge-integration.md).

Der erste Wissens-Transfer unterstützt nur Text-Captures ohne Anhänge. Fotos
und Audio bleiben speicherbar, sobald Hub-Staging implementiert ist; die UI
verspricht keine bereits vorhandene OCR-/Transkriptions-/Importfunktion.

## Auftrag und Rückfrage

Text + Starten erstellt genau einen Auftrag. Doppeltap und ein Retry nach
Timeout verwenden denselben Idempotenzschlüssel. Falls die Annahme unklar ist,
„Wird abgeglichen“ zeigen statt einen neuen Auftrag anzulegen.

Bei Ausfall des Backends bleibt der Eingabetext verfügbar. Erst eine dauerhafte
Auftragsannahme ergibt „Wartet“. Es gibt keine simulierten Prozentwerte.
„Antwort nötig“ zeigt die tatsächliche Rückfrage, ein Feld und Senden. Eine
Antwort zu einer bereits überholten Rückfrage wird nicht still übernommen.

Stoppen → „Wird gestoppt“ → bestätigtes Ende. Ein Stop-Request ist kein Nachweis,
dass ein Prozess schon beendet ist. Erneut starten erzeugt einen nachvollziehbar
verknüpften neuen Versuch, verändert aber nicht die alte Ausführungshistorie.

## Lesen und Hören

Ausgabe → Artikel → Quellen inline öffnen → zum selben Absatz zurückkehren.
Link-/Auswahlaktionen werden nur bei der betreffenden Passage eingeblendet.
Leseposition und spätere Audioposition sind artikelrevisionsgebunden.

Play startet ausschließlich nach Nutzeraktion. „Audio wird erstellt“ und
„Audio nicht verfügbar“ sind klar getrennt. Text bleibt nutzbar. Kein automatischer
kostenpflichtiger Render bei jedem Play. Eine neue Textrevision verwendet keine
alten Zeitmarken. Ohne verifizierte Alignment-Daten läuft normales Audio ohne
vorgetäuschte Satzhervorhebung. Mobile Hintergrundwiedergabe ist zu testen,
nicht allein durch einen Screenshot belegt.

## Betrieb

Probleme zuerst, danach wenige Zeilen: App, Research, Audio, Speicher, Sicherung,
Budget. „Letzte Kopie vorhanden“ und „Wiederherstellung geprüft“ sind unabhängig.
Öffnen zeigt Beobachtungszeit und nächsten sinnvollen Schritt. Die erste Version
ist dort weitgehend lesend; Backup/Restore, Updates und Neustarts bleiben im
separaten Betriebswerkzeug. Nur die Annahme neuer Aufträge ist im Hub schaltbar.

## Übergreifende Fehlerzustände

| Situation | UI-Verhalten |
| --- | --- |
| Sitzung abgelaufen | neu anmelden; Entwurf nicht automatisch übermitteln |
| Revision geändert | eigene Fassung erhalten, neue Fassung zeigen, bewusst übernehmen |
| Budget ausgeschöpft | Grund direkt am Startbutton; Budgetverwaltung verlinken |
| Status veraltet | letzte Beobachtung zeigen; nicht als laufenden Live-Status ausgeben |
| Upload unterbrochen | erneutes Hochladen anbieten; Text und lokale Datei nicht verwerfen |
| Leere Ausgabe | „Noch keine Ausgabe“; Erstellung/Planung anbieten, kein Fake-Inhalt |
| Offline | sichtbarer Geräte-/Übertragungsstatus; keine bestätigte Serverspeicherung behaupten |

Browser-Zurück, Fokus und Scrollposition bleiben über Details hinweg erhalten.
Neuladen ist für gespeicherte Objekte verlustfrei; temporäre Berechtigungen und
Dateipickerzustände werden dabei nicht als persistent versprochen.
