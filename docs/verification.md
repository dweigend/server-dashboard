# Prüfstand des Konzeptpakets

Datum: 14. September 2026. Lokal geprüft, nicht auf einem produktiven Server.

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

## Grenzen

Schema-Validität ist kein Nachweis einer funktionierenden API, sicherer Sessions
oder vollständiger Integration. Auth-Spike, Research-/Media-Adaptertests,
Lastmessungen, Coolify-Deployment und Restore bleiben geplante Arbeit.
