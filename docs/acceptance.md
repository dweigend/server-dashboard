# Abnahme und Verifikation

Alle Punkte dieser Liste beschreiben spätere Produktnachweise. Die jetzigen
Dokumentationschecks ersetzen diese Tests nicht.

## UI

- [ ] Keine Marken-/Titel-/Zahnradzeile auf angemeldeten Hauptscreens.
- [ ] 48px-Hauptnavigation; reservierte globale Fläche höchstens zehn Prozent
  in den definierten Normal-Viewports. Tastatur/Querformat und Zoom separat prüfen.
- [ ] 44px-Touchziele kollidieren nicht; Icons haben zugängliche deutsche Namen.
- [ ] Text- und UI-Kontraste gemessen, Tastaturfokus sichtbar, Reihenfolge sinnvoll.
- [ ] Textvergrößerung bis 200 Prozent, 320px-Reflow und Screenreader getestet.
- [ ] Kein horizontaler Scroll, kein überdecktes Speichern bei geöffneter Tastatur.
- [ ] 390 × 844 und 1440 × 900 gegen die ausgewählten Referenzen vergleichen;
  Bildartefakte verlieren gegenüber dem UI-System.

## Kernabläufe und Fehler

| Fall | Erwartung | Anforderung |
| --- | --- | --- |
| falsches Passwort / fehlender zweiter Faktor | kein Zugriff und keine privaten SSR-Daten | P01 |
| fremde Capture-/Upload-/Artikel-ID | Zugriff abgelehnt, keine Existenzdetails | P01 |
| CSRF von fremdem Ursprung | Mutation abgelehnt | P01 |
| Doppeltap / verlorene HTTP-Antwort | genau eine dauerhafte Annahme | P02/P03/P09 |
| Browserneuladen nach Speichern | Capture und Anhänge vorhanden | P02/P09 |
| widersprechende Revision | 412; eigene Eingabe bleibt erhalten | P02/P09 |
| fünf Minuten Audio auf iOS/Android | speichern/wiedergeben oder verständlicher Fallback | P02 |
| Server lehnt MIME/Größe ab | kurze Ursache, Textentwurf bleibt erhalten | P02 |
| Auftrag wartet auf Antwort | konkrete Rückfrage; Reply nur für aktuelle Revision | P04 |
| Stop und Abschluss konkurrieren | echter endgültiger Status, kein falsches Cancelled | P04 |
| erfolgreicher ungeprüfter Bericht | als ungeprüft sichtbar | P05 |
| Teilfehler der Quellenkollektion | fehlende Abdeckung sichtbar, nicht „keine News“ | P06 |
| Audio fehlt oder falsche Paketrevision | Text verfügbar, kein falsches Alignment | P07 |
| Research offline / Status zu alt | unbekannt/veraltet; kein erfundener Livezustand | P08 |
| Budgetgleichzeitigkeit | Grenzen serverseitig eingehalten, klare Rückmeldung | P08/P09 |
| DST / Neustart des Schedulers | höchstens eine Ausgabe je lokalem Datum | P06/P09 |

## Produktionsfreigabe

- [ ] Keine öffentlichen Datenbank-/Agent-/Verwaltungsports neu exponiert.
- [ ] Secrets fehlen im Bundle, Image, Quellcode, Git-Verlauf und normalen Logs.
- [ ] TLS, Proxy-Origin, Uploadgrenzen und Cookie-Scope unter realer Subdomain geprüft.
- [ ] Migration, Neustart und Rollback auf Staging durchgeführt.
- [ ] Restore von DB und Dateien mit IDs/Hashes erfolgreich; RPO/RTO gemessen.
- [ ] Verlust des Research-/Audio-Dienstes verhindert nicht das Lesen verfügbarer Inhalte.
- [ ] Sessionwiderruf und Recovery funktionieren ohne ungeschützten Ausweichzugang.
- [ ] Operative Alarmierung meldet tatsächlichen Handlungsbedarf ohne Meldungsflut.
- [ ] Auth-, Storage-, Research- und Medienadapter bestehen dieselben Vertragsfälle
  wie ihre Mockadapter; verwendete Versionen sind dokumentiert.
