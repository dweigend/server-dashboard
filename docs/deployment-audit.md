# Deployment-Prüfung

Stand: 14. September 2026. Read-only-Prüfung von Aufgaben, Dokumentation,
Coolify-CLI, SSH, DNS und ausgewählten TCP-Ports. Keine Installation, Änderung
an Netzregeln, Dienstneustart, Veröffentlichung oder DNS-Änderung durchgeführt.

## Herkunft und belastbare Ergebnisse

Gelesene Codex-Tasks: „Plan MS-A2 Home AI Server“, „Hermes Agent einrichten“
und „Konzept für Hermes Wissensdatenbank“. Neueste Nachrichten des ersten Tasks
wurden vom Reader nicht vollständig geliefert; sein Repository und die direkte
SSH-Prüfung ergänzen daher den Iststand. Die jüngeren Research-Entscheidungen
halten Python, modulare Fachlogik, Hermes und getrennte Medienproduktion fest.

- Der bestehende Coolify-Zugang authentifiziert sich erfolgreich; der Hetzner-
  Host ist per geprüftem SSH-Schlüssel erreichbar. Proxy, Website und Matrix
  laufen. Der Website-Status ohne Healthcheck ist kein Verfügbarkeitsnachweis.
- Der MS-A2 ist per SSH erreichbar, Tailscale und der Hermes-Messaging-Gateway
  laufen. Ein Research-API-Listener wurde nicht beobachtet; die zukünftige
  Wissensanwendung ist dadurch nicht als eingerichtet nachgewiesen.
- Tailscale wurde auf dem Hetzner-Host nicht gefunden. Die geplante private
  Verbindung zwischen den Hosts ist daher noch nicht vorhanden.
- Aktuelle Speicher-/RAM-Snapshots sprechen für einen kleinen Web-Pilot auf
  dem vorhandenen Host. Sie sind keine Lastmessung oder Kapazitätsgarantie.
- Die autoritativen DNS-Nameserver passen zum bisherigen IONOS-Inventar.
  Für die vorgeschlagene Hub-Subdomain lieferte die Abfrage kein A/AAAA-Ziel.
  DNS-Änderungsrechte und ein vollständiger IPv6-Pfad wurden nicht geprüft.

Private Adressen, Ressourcenkennungen, genaue Versionen und Messwerte liegen
ausschließlich lokal in `.local/deployment-audit-2026-09-14.md`. Dieser Bericht
bleibt für ein späteres öffentliches Repository auf die relevanten Schlüsse begrenzt.

## Vor einer neuen produktiven App

1. **Bestehenden Host warten:** Neustartbedarf ist gemeldet. Update-, Backup- und
   Wiederanlaufplan für die vorhandenen Dienste vor dem Wartungsfenster festlegen.
   Keine Versionsaktualisierung ohne Kompatibilitätsprüfung.
2. **Zugangsflächen ordnen:** Der direkte Management-Port war über öffentliche
   IPv4 erreichbar. Andere veröffentlichte Docker-Ports waren beim Mac-Probe
   nicht erreichbar; das beweist weder eine bestimmte Provider-Firewall noch
   deren IPv6-Regeln. Die Hetzner-Regeln wurden nicht direkt eingesehen.
3. **Docker-aware Firewall prüfen:** Eine inaktive UFW und veröffentlichte
   Docker-Ports sind kein Beleg für ein geschlossenes System. Managementpfad,
   Proxy und notwendige Realtime-Verbindungen anhand der tatsächlichen Domain-
   Konfiguration prüfen, bevor Ports geschlossen werden.
4. **Private Strecke testen:** Tailnet-Policy, Container-Egress, HTTPS und
   Dienstautorisierung einschließlich verbotener Zugriffe nachweisen.
5. **Neue Daten absichern:** Eigene DB und Volumes, getrennte Geheimnisse,
   Limits sowie echter Restoretest für Hub. Die laufende NAS-Erstkopie sichert
   nicht automatisch zukünftige Hub-Daten.

Coolify dokumentiert Unterschiede zwischen Domainzugang, direktem Portzugang
und Docker-Portveröffentlichungen. Der öffentliche App-Verkehr benötigt HTTPS;
bestehende Managementports werden separat behandelt.
[Coolify Firewall](https://coolify.io/docs/core/infrastructure/servers/firewall).

## Verifikationsgrenzen

Kein vollständiger Portscan, kein IPv6-Test, keine Prüfung der Hetzner-Control-
Plane oder der Tailnet-Policy. Keine Root-Firewallprüfung auf dem MS-A2: der
read-only Sudo-Aufruf verlangte interaktive Authentifizierung. Der verfügbare
Dokumentationsstand beschreibt dort noch keine abgeschlossene Isolation.

Kein laufender Hub-Container, keine Research-Transaktion, keine Modellkosten,
kein Restore und keine belastbare Aussage über aktuelle Backup-Vollständigkeit.
Das lokale Audit enthält die konkreten Prüfkommandos und Beobachtungen ohne Secrets.
