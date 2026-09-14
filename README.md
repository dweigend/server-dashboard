# Weigend Hub

Ein persönlicher, mobiler Arbeitsraum für Gedanken, Recherche und tägliche Lektüre.
Schwarz, weiß, eckig. Oben eine schmale Navigation; darunter beginnt die Arbeit.

**Stand: Konzept v0.1 · 14. September 2026.** Dieses Repository enthält die
konzeptionelle Basis und eine Ideenbibliothek mit 30 Mockups. Es enthält noch
keine implementierte Dashboard-App, Anmeldung oder Serveranbindung.

## Einstieg

1. [Produkt und Umfang](docs/product-spec.md): Was die erste Version leisten soll.
2. [Designkonzept](design/design-concept.md): gestalterische Richtung und Bildauswahl.
3. [UI-System](design/ui-system.md): verbindliche Regeln, Maße und Komponenten.
4. [Screens und Interaktionen](design/interaction-spec.md): Verhalten einschließlich Fehlerfällen.
5. [Architektur](docs/architecture.md): Verantwortlichkeiten und Systemgrenzen.
6. [Schnittstellen](contracts/README.md): OpenAPI-Vertrag, Modelle und Integrationen.
7. [Coolify und Betrieb](docs/deployment.md): geplanter Weg vom Mac zum Server.
8. [Umsetzungsplan](docs/implementation-plan.md): Reihenfolge, Abnahme und offene Entscheidungen.

Neu ergänzt: [Backend zwischen Hetzner und Heimserver](docs/hybrid-backend.md)
mit Netzwerk- und Ausfallkonzept sowie der [Deployment-Audit](docs/deployment-audit.md).
Bestehende Server wurden read-only geprüft; die private Verbindung und die App
sind noch nicht eingerichtet.

Aktuelle Priorität: zuerst die lokale Wissensdatenbank. Der
[Abgleich mit dem Wissens-MVP](docs/knowledge-integration.md) hält gemeinsame
Zuständigkeiten, Behauptungs-/Evidenzdarstellung und getrennte Lieferstufen fest.

Die [Entscheidungsliste](docs/decisions.md) unterscheidet Nutzervorgaben,
Arbeitsentscheidungen und noch zu prüfende Integrationen. Die
[Quellenbasis](docs/sources.md) hält Herkunft und Verifikationsgrenzen fest.

## Ideen auswählen

Die [Galerie](design/portfolio/index.html) enthält 30 einzeln nummerierte Bilder
mit Filtern, Großansicht und Merkliste. Lokal öffnen oder ausschließlich auf dem
eigenen Rechner bereitstellen:

```sh
python3 -m http.server 8769 --bind 127.0.0.1 --directory design/portfolio
```

Danach `http://127.0.0.1:8769` im Browser öffnen. Ist der Port bereits belegt,
einen anderen freien Port verwenden. Die Merkliste gehört zum Browser und
Ursprung; eine Auswahl aus einer früheren Galerie lässt sich über
„Auswahl kopieren“ übertragen. Die Mockups sind Varianten, keine 30 Pflichtscreens.

## Projektstruktur

```text
design/                 Designkonzept, UI-System, Tokens und Bildportfolio
contracts/              Browser-API und Vertragserläuterungen
docs/                   Produkt, Architektur, Daten, Sicherheit, Betrieb, Plan
scripts/                Prüfungen des Konzeptpakets
.github/workflows/      Prüfungen für spätere GitHub-Pushes
.local/                 Nur lokal: ursprüngliche Referenzbilder, nicht in Git
```

Planung: SvelteKit und Svelte 5, Bun als Entwicklungswerkzeug, Node-Server im
Container auf Coolify. Hermes, zentrale Wissensverwaltung und Audioproduktion
bleiben eigenständige Systeme. Es werden jetzt keine App-Abhängigkeiten installiert.

## Prüfen

```sh
bash scripts/check.sh
```

Voraussetzungen sind Bun, Python 3 und uv. Die Prüfwerkzeuge werden über Bun
und uv mit festen Paketversionen ausgeführt. Der erste
Aufruf benötigt Netzwerkzugriff. Die Checks prüfen Dokumentation, Verträge und
Galerie-Dateien; sie sind kein Nachweis einer funktionierenden Anwendung.
Details im [Prüfstand](docs/verification.md).

## GitHub und Veröffentlichung

Das Projekt ist ein eigenständiges lokales Git-Repository. Noch kein Remote,
keine Veröffentlichung und kein Deployment. Webhosting auf Hetzner und Research
auf dem MS-A2 sind zugeordnet; Subdomain, private Verbindung und produktiver
Zugang werden vor der Bereitstellung eingerichtet und geprüft.

Die 30 neuen Mockups sind Teil des Repositorys. Die zehn vom Nutzer gelieferten
Referenzbilder bleiben vollständig im lokalen Projektordner unter `.local/`;
sie werden nicht automatisch mitveröffentlicht. Eine Lizenz für Code und
Designmaterial ist vor einer öffentlichen Veröffentlichung noch auszuwählen.

Siehe [Veröffentlichung und Zusammenarbeit](CONTRIBUTING.md).
