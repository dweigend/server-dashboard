# Prüfstand des Konzeptpakets

Datum: 14. September 2026. Konzeptprüfungen lokal ausgeführt. Zusätzlich wurden
die bestehenden Server read-only per SSH und Coolify geprüft; es wurde dort
keine Hub-Anwendung gestartet oder getestet.

## Inhalt und Struktur

- Eigenständiger Projektordner und Git-Repository angelegt; keine Serverdateien verändert.
- 30 finale PNG-Mockups mit Galerie und bereinigtem Manifest übernommen.
- Zehn Originalreferenzen zusätzlich lokal im ignorierten `.local/`-Ordner erhalten.
- 38 Browser-API-Operationen beschrieben; Auth-Bibliotheks- und Upstream-
  Schnittstellen bewusst als Integrationsnachweise offengehalten.
- Systemgrenzen mit der bestehenden Research-/Podcast-Konzeption abgeglichen.
- Budgetmutationen auf einzelne Autoritäten beschränkt; keine verteilte
  Transaktion über Research und Audio vorgetäuscht.

## Lokale Checks

`bash scripts/check.sh` führt aus:

- Git-Whitespace-Prüfung.
- Lokale Markdown-Dateilinks, JSON-/OpenAPI-Referenzen, 30 eindeutige Bildnummern
  und gültige PNG-Header im Hochformat.
- Ruff-Lint und Formatprüfung für das kleine Prüfsystem.
- Markdownlint für alle veröffentlichten Markdown-Dateien.
- Redocly-Validierung des OpenAPI-Entwurfs einschließlich Schema-Beispielen.
- Biome für vorhandenes Galerie-JavaScript und CSS.
- Browser-Bundling des Galerie-JavaScripts und Shell-Syntaxprüfung.

Diese Checks bestanden lokal. Der GitHub-Workflow ist vorbereitet, aber noch
nicht auf GitHub ausgeführt. Der Portfolio-Subagent hatte die 30 Bilder visuell
und die ursprüngliche Galerie mobil sowie am Desktop geprüft; der Umzug
übernimmt dieselben UI-Dateien und Bildinhalte. Es wurde hier keine neue
Dashboard-Oberfläche implementiert oder pixelgenau abgenommen.

## Abstimmung mit dem Wissensprojekt

Der aktuelle bestätigte Wissens-MVP und die jüngsten Task-Nachrichten wurden
gelesen. Zwei direkte Abstimmungsrunden mit dem dortigen Agenten führten zu
expliziten Wissensoperationen, getrennten Lieferstufen und einer eigenständigen
Darstellung von Behauptungsbewertungen. Der Produzent bestätigte die konzeptionelle
Übereinstimmung; Details stehen im [Wissensabgleich](knowledge-integration.md).
Die Hub-OpenAPI wurde dabei nicht um spekulative Knowledge-Endpunkte erweitert.

## Grenzen

Die [Deployment-Prüfung](deployment-audit.md) belegt bestehende Zugänge und
benennt fehlende Netzwerk-/Betriebsnachweise. Private Messwerte liegen nur lokal.
Der aktualisierte Backend-Entwurf ist weiterhin eine Spezifikation.

Schema-Validität ist kein Nachweis einer funktionierenden API, sicherer Sessions
oder vollständiger Integration. Auth-Spike, Research-/Media-Adaptertests,
Lastmessungen, Coolify-Deployment und Restore bleiben geplante Arbeit.
