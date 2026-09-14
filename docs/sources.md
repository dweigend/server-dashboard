# Quellenbasis und Prüfstand

Stand: 14. September 2026. Die Quellen belegen Design- und Architekturannahmen,
nicht den erfolgreichen Betrieb der zukünftigen Hub-Anwendung.

## Aus der Projektarbeit

- Nutzerbrief: mobile private Oberfläche, Aufgaben, schnelle Notizen mit Foto und
  Stimme, laufende Jobs, tägliches Magazin zum Lesen und Hören, Betrieb über Coolify.
- Spätere Korrekturen: sehr wenig UI-Text, Hauptnavigation oben, keine globale
  Titel-/Marken-/Zahnradzeile, mindestens 90 Prozent Fläche für Inhalt/Eingabe.
- Serverprojekt: `docs/knowledge-management-concept.md`,
  `docs/knowledge-system-modules.md`, `docs/podcast-system-boundary.md` und
  `docs/knowledge-architecture-review.md`, jeweils am 14. September lokal gelesen.
  Übernommen: Hermes-Harness, PostgreSQL-Wissensautorität, Zotero, getrennte
  Audioproduktion, gemeinsame versionierte Verträge. Diese Docs sind Zielarchitektur;
  daraus folgt keine vorhandene Knowledge-API.
- Separates Domainprojekt: älteres Coolify-Inventar als Ausgangspunkt für die
  read-only Prüfung von CLI, SSH und DNS verwendet. Die aktuelle Prüfung und
  ihre Grenzen stehen im [Deployment-Audit](deployment-audit.md); detaillierte
  private Inventardaten bleiben ausschließlich in `.local/`.
- Die Codex-Tasks „Plan MS-A2 Home AI Server“, „Hermes Agent einrichten“ und
  „Konzept für Hermes Wissensdatenbank“ wurden gelesen. Letzterer begrenzt den
  nächsten Backend-MVP auf Erfassen, Vorschlagen, Prüfen, Verknüpfen und Suchen.
  Hub darf weitergehende Research-/Magazinfähigkeiten nicht als vorhanden annehmen.
- Jüngster bestätigter Stand im Wissens-Task: Behauptungs-/Evidenzregister,
  getrennte Evidenzlage, Belastbarkeit und Review; festgehalten in
  `server_einstellungen/docs/knowledge-mvp.md`. Direkte Agentenabstimmung und
  der [Hub-Abgleich](knowledge-integration.md) ergänzen die früheren Annahmen.
- 30 GPT-Image-Mockups und zehn zugelieferte Referenzen:
  [Abgleich](../design/portfolio/reference-review.md). Bildvarianten wurden vom
  Portfolio-Subagenten geprüft, aber noch nicht als finale Designs ausgewählt.

## Offizielle Dokumentation

Am 14. September 2026 gelesen; konkrete Paketversionen erst bei Implementierung
festschreiben. Kein Context7-Werkzeug war in dieser Sitzung verfügbar.

- [SvelteKit Node adapter](https://svelte.dev/docs/kit/adapter-node):
  eigenständiger Server, Origin, Trusted Proxy, Body-Limit und Shutdown.
- [Coolify Dockerfile](https://coolify.io/docs/applications/builds/dockerfile):
  dokumentierter Container-Buildweg.
- [Coolify persistenter Speicher](https://coolify.io/docs/core/persistent-storage/storage-mounts/overview):
  persistente Mounts als Bestandteil des Betriebsplans.
- [Bits UI](https://www.bits-ui.com/docs/introduction):
  ungestylte Svelte-Primitiven für zentrale Gestaltung.
- [Lucide Svelte](https://lucide.dev/guide/svelte):
  konsistente Icon-Komponenten; Importpfade bei Versionswahl prüfen.
- [Better Auth 2FA](https://better-auth.com/docs/plugins/2fa):
  möglicher Bibliotheksbaustein, noch kein bestandener Auth-Spike.
- [Hermes API Server](https://hermes-agent.nousresearch.com/docs/user-guide/features/api-server):
  native Programmschnittstelle; installierte Version und Capability-Umfang offen.
- [MediaRecorder Formate](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder/isTypeSupported_static):
  Browserformat prüfen statt einen Codec für alle Geräte vorauszusetzen.
- [W3C Target Size](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html):
  Mindestzielgrößen; das Produkt wählt ausdrücklich größere 44px-Touchziele.
- [OpenAPI 3.1.1](https://spec.openapis.org/oas/v3.1.1.html):
  Struktur des beschriebenen HTTP-Zielvertrags.
- [Tailscale Serve](https://tailscale.com/docs/features/tailscale-serve):
  private HTTPS-Freigabe einer lokalen Anwendung.
- [Tailscale Grants](https://tailscale.com/docs/reference/syntax/grants):
  Quell-/Zielrechte und additive Wirkung bestehender Freigaben.
- [Docker Networking](https://docs.docker.com/engine/network/):
  Container-Netze, DNS und explizite Verbindungen.
- [Coolify Firewall](https://coolify.io/docs/core/infrastructure/servers/firewall):
  Management-/Proxy-Ports und Docker-bedingte Firewallgrenzen.

## Noch nicht verifiziert

SSH-/Coolify-Liveinspektion erfolgt; keine Hetzner-Firewall-/Tailnet-Policyprüfung,
keine private Verbindung von Hetzner zum MS-A2, keine DNS-Änderung. Weiterhin kein
Auth-/Provider-/Research-Smoke-Test, Lasttest oder produktiver Restore.
