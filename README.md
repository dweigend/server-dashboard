# Server Dashboard

Mein persönliches Dashboard für Notizen, Recherche und tägliche Lektüre.
Ich entwickle es für mich und meinen eigenen Server: die Weboberfläche soll
auf Hetzner laufen, das Wissenssystem mit Hermes auf meinem Heimserver.

Der Code ist öffentlich einsehbar. Dies ist aber kein allgemein nutzbares
Open-Source-Produkt: Es gibt keine Open-Source-Lizenz, keinen Supportanspruch
und keine Zusage, externe Beiträge oder andere Server-Setups zu unterstützen.
Die Rechte an verwendeten Abhängigkeiten bleiben davon unberührt.

Aktuell stehen Konzept, 30 Designentwürfe und eine minimale SvelteKit-Basis.
Anmeldung, Speicherung und Serveranbindung sind noch nicht implementiert.

## Lokal entwickeln

Bun 1.3.14 und Node 24 verwenden.

```sh
bun install --frozen-lockfile
bun run dev
```

Prüfen: `bun run validate` (zusätzlich Python 3 und uv für die Konzeptchecks).
Die Vorschau bindet nur an den eigenen Rechner.

## Projektgrundlage

- [Konzeptübersicht](docs/README.md) und [Systemmodule mit klaren Zuständigkeiten](docs/system-modules.md)
- [Design-Brief aus Stitch](design.md) und [UI-System](design/ui-system.md)
- [Wissenssystem und Dashboard](docs/knowledge-integration.md)
- [Knowledge Server auf GitHub](https://github.com/dweigend/knowledge-server) und [geprüfter Integrationsstand](docs/knowledge-server-status.md)
- [Feature-Issues und Reihenfolge](docs/feature-backlog.md)
- [Entwicklung und Betrieb](docs/development.md)
- [30 Mockups](design/portfolio/index.html)
- [10 Referenzbilder](design/references/README.md) und [15 Stitch-Screenshots](design/stitch/README.md)

Private Serverdaten, Zugangsdaten und persönliche Arbeitsinhalte bleiben lokal.
Die Designbeispiele sind im Repository dokumentiert.
