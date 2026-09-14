# Produktspezifikation v0.1

Status: konzeptioneller Entwurf. Verbindliche Nutzervorgaben sind in
[Entscheidungen](decisions.md) gekennzeichnet. Keine Funktion ist dadurch bereits gebaut.

## Aufgabe des Produkts

David soll auf dem Telefon einen Gedanken festhalten, eine Recherche beauftragen,
ihren Fortschritt verstehen und eine tägliche Ausgabe lesen oder hören können.
Dieselbe Anwendung funktioniert am Desktop. Ein Browser und eine geschützte
Verbindung reichen; ein nativer App-Store-Client ist zunächst nicht erforderlich.

Der Start ist ein Arbeitsfeld: kurze Eingabe, aktuelle Ausgabe und wirklich
relevante Aufgaben. Kein Begrüßungsbanner, kein Logo und kein Kennzahlendashboard.

## Erste Version

| ID | Fähigkeit | Erkennbares Ergebnis |
| --- | --- | --- |
| P01 | Privater Zugang | Passwort und zweiter Faktor; keine öffentliche Registrierung |
| P02 | Schnellerfassung | Text, Foto oder Sprachnotiz landet dauerhaft im Eingang |
| P03 | Rechercheauftrag | Frage genügt; Frist, Quellen und Kostenlimit sind optionale Details |
| P04 | Laufende Arbeit | Läuft, wartet auf Antwort, abgeschlossen oder fehlgeschlagen ist erkennbar |
| P05 | Ergebnis | Lesbarer Text mit Quellen und getrenntem Prüfstatus |
| P06 | Magazin | Tägliche Ausgabe mit wenigen relevanten Meldungen und nachvollziehbaren Quellen |
| P07 | Hören | Verfügbares Audio abspielen, pausieren und später fortsetzen |
| P08 | Betrieb | Verfügbarkeit, Aktualität, Speicher, Sicherungsprüfung und Budget sichtbar |
| P09 | Verlässlichkeit | Kein stiller Datenverlust bei Timeout, doppeltem Senden oder Serverausfall |

P06 wird im Pilot als Entwurf erstellt und von David freigegeben. Die geplante
Uhrzeit ist die Bereitstellung eines Entwurfs, kein Versprechen automatischer
wissenschaftlicher Freigabe. P07 benötigt den unabhängigen Medienanbieter;
ein erfolgreicher Textlauf bleibt bei Audioproblemen erfolgreich.

## Bewusste Begrenzungen

Ein Nutzerkonto mit eigener Datenabgrenzung; keine Teams, Mandantenverwaltung,
öffentliche Inhalte, Bezahlfunktion oder Gamification. Kein Terminal im Browser,
keine beliebigen Shell-Kommandos, kein Ersatz für Coolify oder NAS-Verwaltung.
Keine vollständige Zotero-, Wissenswiki- oder Podcast-Produktionsoberfläche.

Passkeys, fortgeschrittene Suche, gespeicherte Markierungen, synchrone Wort-
Hervorhebung, OCR-Automation und echte Offline-Synchronisierung folgen nach
dem ersten durchgängigen Ablauf. Mockups dafür bleiben wertvolle Folgeideen.

## Produktregeln

- Eine zentrale Aktion je Zustand; weitere Entscheidungen erst bei Bedarf.
- Gespeichert heißt vom Server bestätigt. „Nur auf diesem Gerät“ ist etwas anderes.
- Ausführungserfolg, fachliche Prüfung und Veröffentlichung sind getrennte Zustände.
- Unbekannte oder veraltete Betriebsdaten sind nicht „gesund“.
- Eine Nachricht eines Agents ist kein freigegebener Forschungsbericht.
- Fehlende Audiodaten ändern nicht den Text und lösen keine erneute Recherche aus.
- Ausgaben verlinken Primärquellen; fremde Artikel werden nicht pauschal vollständig
  gespiegelt. Eigene Zusammenfassungen, erlaubte Zitate und Herkunft bleiben getrennt.

## Nutzungsqualität als Ziel

Bei bestehender Anmeldung ist die erste Texteingabe ohne zusätzlichen Dialog
erreichbar. Eine Notiz benötigt Eingabe und Speichern, ein Auftrag Frage und Start.
Lokale UI reagiert innerhalb von 100 ms auf Taps; serverbestätigtes Erfassen
soll bei normalen Textgrößen im p95 unter zwei Sekunden liegen. Dies sind
Abnahmeziele, noch keine Messwerte. Lange Verarbeitung läuft asynchron.

Mobile Zielgrößen: 390 × 844, 360 × 800, kleiner Prüffall 320 × 568 CSS-Pixel.
Desktop-Prüfung: 1440 × 900. iOS Safari und Android Chrome sind Pflicht;
Desktop Safari/Chrome werden mitgeprüft. Zoom und Bildschirmtastatur dürfen
keine entscheidende Aktion verdecken.
