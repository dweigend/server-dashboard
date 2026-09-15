# Datenmodell und Lebenszyklen

Die [OpenAPI-Schemas](../contracts/openapi.json) definieren die Browserdarstellung.
Diese Seite ergänzt Eigentum, Persistenz und Regeln, die ein Schema allein
nicht ausdrückt. Alle IDs sind undurchsichtige Strings; Timestamps sind UTC nach
RFC 3339, lokale Anzeige nach IANA-Zone `Europe/Berlin`. Geld: ganze Eurocent.

## Dashboard-eigene Datensätze

| Datensatz | Zweck | Wichtige Bindungen |
| --- | --- | --- |
| Account/Session | Authentifizierung | Schema der gewählten Auth-Bibliothek |
| Capture | unverarbeiteter Text oder Mediengedanke | owner, revision, attachments, Transferstatus |
| Upload | private Binärdatei | owner, gemessener MIME-Typ, Größe, Hash, Zustand |
| Delivery | idempotente Übernahme | requestId, payloadHash, canonicalReference |
| Preferences | Anzeige, Themen, Zeit, Budgetvorschlag | owner, revision; Scheduler-/Budgetautorität beachten |
| Edition/Article | redaktioneller Inhalt und Freigabe | magazine owner, revision, sources, release/withdrawal |
| TextPackage | unveränderlicher freigegebener Text für Media | article revision, hash, rights, release reference |
| ReadingPosition | Fortsetzen | articleId, articleRevision, Absatz/Audiozeit |
| RequestReceipt | Schutz vor Doppelübermittlung | owner + operation + key + bodyHash |
| DeliveryCopy | private abgeleitete Kopie eines externen Artefakts | owner, package/revision/hash, releaseReference, rightsCheckedAt, serveUntil |

Jobansichten sind Projektionen ihrer externen Besitzer. Artikel und Ausgaben
gehören dagegen dem internen Modul dashboard.magazine. `observedAt`
und `stale` werden mitgeführt. Cacheverlust darf keine Forschungsdaten löschen.
Keine zweite editierbare Quellen-, Zitat- oder Notenbibliothek.

Kanonische Notes, Claims, Evidence und Assessments gehören vollständig dem
Wissenssystem. Dashboard führt dafür Referenzen/Ansichten, keine editierbaren Kopien.
`Result.reviewState` und `Article.reviewState` ersetzen weder Evidenzlage noch
Belastbarkeit oder den Reviewstatus einer Behauptungsbewertung. Das Mapping wird
im [Wissensabgleich](knowledge-integration.md) bewusst noch nicht auf feste
API-Werte reduziert; lokale Pilot-Schemas existieren, ihr externer Vertrag
bleibt abzustimmen. [Systembesitzer](system-modules.md) sind getrennt.

Delivery enthält zusätzlich Versuchszahl, nächste Zustellzeit und Lease-Ende;
die Zustellung bleibt an die unveränderliche Capture-Revision gebunden.
RequestReceipt unterscheidet intern `pending`, `accepted`, `rejected` und
`uncertain`. Diese Transportzustände sind keine Research-Jobzustände.
Ein verlorenes HTTP-Ergebnis erzeugt niemals automatisch einen neuen Auftrag.

DeliveryCopy speichert ausschließlich freigegebene Auslieferungsartefakte.
Lokale Magazintexte sind eigene Datensätze, keine Kopien eines entfernten
Publication-Dienstes. Für externe Artefakte stehen Rechtefrist, Abgleich und
Verhalten bei Widerruf im
[Hybrid-Backend-Vertrag](hybrid-backend.md). Sicherungen solcher Kopien dürfen
keine alte Freigabe wieder aktivieren; nach Restore zuerst Rechte abgleichen.

Eine zusammengeführte Jobansicht führt Besitzer und lokale ID getrennt.
`Task` beschreibt im aktuellen API-Entwurf allgemeine Task Service-Aufträge;
Knowledge-Extraktion, Transkription und Media haben eigene Statusverträge.
Deren spätere gemeinsame Projektion benötigt konkrete Beispiele, nicht eine
unbelegte Gleichsetzung der Zustände.

## Eingangslebenszyklus

```text
Browserentwurf → saved → transferring → transferred
                          ↘ transfer_failed → transferring
```

`saved` benötigt eine bestätigte Dashboard-Transaktion und ist ein dauerhaft gültiger
Zustand ohne spätere Knowledge-Pflicht. Der Transfer ist ausdrücklich optional. Bei Textänderung im Zustand
`transferring` verweigert der Server mit Konflikt; nach `transferred` führt die
kanonische Referenz zu Knowledge. Fehler vor Bestätigung erzeugen keine behauptete
Übernahme. Der Server registriert eine idempotente Zustellung einschließlich
exakter Capture-Revision. Gelöschte/veränderte Anhänge können nicht unbemerkt
in einen bereits begonnenen Transfer geraten.

## Recherchelebenszyklus

```text
queued → running → succeeded
           ↕
     waiting_for_input
queued/running/waiting_for_input → cancelling → cancelled
queued/running/waiting_for_input/cancelling → failed
```

Ein Stop kann mit erfolgreichem Abschluss konkurrieren; `cancelling → succeeded`
ist dann zulässig und wird als bereits abgeschlossen dargestellt. Wiederholen
erzeugt einen neuen Job mit `retryOf`; die alte Ausführung bleibt unverändert.
Terminalzustände haben `finishedAt`. Fortschritt ist eine echte kurze Etappe,
kein frei erfundener Prozentwert. Rückfragen haben eine eigene ID und Revision.

Getrennte Ergebnisprüfung: `unreviewed`, `needs_changes`, `accepted`.
Ausführung `succeeded` impliziert nicht `accepted` und nicht Veröffentlichung.
Ausgabezustände: `draft`, `released`, `withdrawn`; nur dashboard.magazine darf sie ändern.
Freigaben beziehen sich auf die exakte Ausgabe- und Abhängigkeitsrevision.

## Revisionen und Konflikte

Mutable Ressourcen liefern `revision` und ein dazu passendes starkes ETag.
Updates und Zustandsbefehle benötigen `If-Match`. Fehlender Header: 428;
veraltete Revision: 412. Für fachlich ungültige Übergänge: 409. Der Browser
bewahrt den eigenen Entwurf und lässt die neue Fassung bewusst übernehmen.

Idempotenz gilt pro Konto und Operation. Gleicher Schlüssel und gleiche Nutzlast
geben die ursprüngliche Antwort; andere Nutzlast mit gleichem Schlüssel ergibt
409. Annahme und Schlüssel werden atomar gespeichert. Eine unklare ursprüngliche
Zustellung ist kein Anlass für automatischen Retry mit neuem Schlüssel.
Dashboard-Receipts mindestens sieben Tage halten; Upstream-Annahmen länger anhand
der stabilen Request-ID abgleichen, bevor ein Ablaufdatum Doppelarbeit erlaubt.

## Dateien und Aufbewahrung

Erster Zielrahmen: maximal 20 MiB pro Bild, 25 MiB und fünf Minuten pro Aufnahme,
höchstens fünf Anhänge je Capture. JPEG/PNG/WebP/HEIC als Eingabe; HEIC wird
vor Vorschau serverseitig isoliert konvertiert. Audio WebM/MP4/Ogg/WAV nach
tatsächlicher Browserunterstützung. Kein HTML/SVG als Bild-Upload.

Bytes, Format und Dekodierung serverseitig prüfen; Bildmetadaten vor der
Weitergabe entfernen. Quarantäne bis erfolgreicher Prüfung. Nicht angehängte
Uploads nach 24 Stunden entfernen, fehlgeschlagene Transfers sichtbar behalten.
Das Produkt besitzt in v0.1 keine automatische Löschung bestätigter Captures.
Eingänge, Wissen, Audio und Backups benötigen später getrennte Retentionsregeln.

Private Dateien werden über authentifizierte Handler ausgeliefert, nie aus
einem öffentlichen `static`-Ordner. Objekt-IDs erlauben ohne Session keinen Zugriff.
HTTP Range für Audio wird am ausliefernden Adapter unterstützt und getestet.
