# Entscheidungen und offene Punkte

Stand: 2026-09-15. „Arbeitsentscheidung“ ist eine begründete Vorgabe dieses
Konzepts, keine nachträglich behauptete Zustimmung des Nutzers. Die vereinfachte
Architektur mit vier Schichten und vier Anwendungen wurde am 15. September 2026
ausdrücklich bestätigt. Dies bestätigt die konzeptionelle Grundlage; offene
Betriebsentscheidungen und Integrationsnachweise bleiben separat.

## Festgelegt durch den Nutzer oder bestehende Projektentscheidungen

| ID | Entscheidung |
| --- | --- |
| D01 | Eigenständiges Projekt in der lokalen GitBase, später GitHub |
| D02 | Lokal entwickeln; Web-App über Coolify bei Hetzner, Backend mit Heimserver verbinden |
| D03 | Browserzugang von überall, passwortgeschützt, bevorzugt eigene Subdomain |
| D04 | Mobile First, schwarz/weiß, eckig, ruhig und textarm |
| D05 | Hauptnavigation oben; keine Marke, Seitentitelzeile oder Zahnradleiste |
| D06 | Mindestens 90 Prozent der nutzbaren Fläche für Inhalt/Eingabe |
| D07 | Aufgaben, Text/Foto/Stimme, Jobübersicht, tägliches Magazin lesen/hören |
| D08 | Research nutzt Hermes; Wissensautorität PostgreSQL; Literatur Zotero |
| D09 | Audioproduktion ist ein eigenständiges System |
| D10 | Zuerst Specs, Designsystem und Verträge; Grundgerüst inzwischen erstellt, Feature-Implementierung jetzt über Issues vorbereitet |
| D11 | Als Nächstes lokales Wissensfundament; im separaten Task bestätigtes Behauptungs-/Evidenzregister berücksichtigen |
| D12 | Vier Fachanwendungen: Dashboard, Task Service, Knowledge Server, Media Service; Magazin ist internes Dashboard-Modul, Transkription/Narration sind Media-Module; am 2026-09-15 bestätigt; siehe [Schichten](system-modules.md) |

| D13 | Vier getrennte Schichten: Zugänge, Fachanwendungen, Ressourcen und Betriebsbasis; Namen nach Anwendung → Modul → Aktion; siehe [Namensregeln](system-naming.md) |

## Arbeitsentscheidungen dieses Konzepts

| ID | Entscheidung | Grund |
| --- | --- | --- |
| A01 | Repositoryname `server-dashboard`, Subdomainvorschlag `hub.weigend.studio` | klare eigenständige Identität |
| A02 | SvelteKit mit serverseitiger Dashboard-API | ein kleiner Webstack statt paralleler Backends |
| A03 | Svelte 5, Bun-Tooling, Node im Produktionscontainer | Nutzerkonvention und dokumentierter Serveradapter |
| A04 | System-Sans + optionale Leseserif + sparsame Monospace-Akzente | Lesen und Eingabe vor Terminal-Dekor |
| A05 | 48px-Iconnavigation, 44px-Touchziele | messbare Flächenregel bei guter Bedienbarkeit |
| A06 | Dashboard-eigene Capture-Ablage, optional explizite Knowledge-Übernahme | schneller sicherer Eingang ohne zweite Wissensautorität |
| A07 | Polling statt eigener Event-Infrastruktur im ersten Release | einfache verlässliche Statusabfrage |
| A08 | Passwort + TOTP; Better Auth als Kandidat | keine eigene Kryptografie |
| A09 | Forschungs- und Medienbudget getrennt | unabhängige Ausführung und Kostenautorität |
| A10 | 30 Mockups, 10 Originalreferenzen und 15 Stitch-Screenshots im Repo | Nutzerwunsch vom 2026-09-15: alle Designbeispiele übertragen; Herkunft und Abweichungen dokumentieren |
| A11 | Private HTTPS-API über Tailscale zwischen Hetzner und MS-A2 | vorhandenes Heimserver-Netz nutzen, kein öffentlicher Research-Port |
| A12 | Dashboard-Webprozess und kleiner Delivery-Prozess aus einem Image | Zustellung und Lesekopien unabhängig von Browser und HTTP-Laufzeit |
| A13 | Externe Wissensinhalte und Medienartefakte nur als erlaubte, revisionsgebundene Auslieferungskopien; eigene Magazinartikel/-ausgaben bleiben Dashboard-Daten | begrenzte externe Rechte respektieren, keine zweite Wissensautorität |

## Noch zu entscheiden oder nachzuweisen

| ID | Punkt | Blockiert |
| --- | --- | --- |
| O01 | Hostaufteilung festgelegt; Tailnet-Policy, Container-Egress und private HTTPS-Strecke nachweisen | Produktionsnetz/Deployment |
| O02 | finale Bildauswahl und Serif/Sans-Präferenz | visuelle Abnahme, nicht das Konzept |
| O03 | tatsächliche Research-/Hermes-API, Dauerhaftigkeit und Stop-Verhalten | echte Rechercheintegration |
| O04 | Audio-/Transkriptionsanbieter, Stimme, Datenverarbeitung | echte Audio-/Sprachverarbeitung |
| O05 | Themen, Quellen, Uhrzeit und Monatslimits | produktiver Magazinplan |
| O06 | Öffentliches persönliches Repository ohne Open-Source-Lizenz festgelegt | erledigt am 2026-09-15 |
| O07 | Auth-Spike inklusive Recovery und 2FA | Produktivzugang |
| O08 | Backupziel, Kapazität und getestete RPO/RTO | Produktionsfreigabe |
| O09 | 24-Stunden-Rechtefenster für externe Auslieferungskopien und Grenzen der Cloud-Ablage bestätigen | externe Wissens-/Medienkopien bei Ausfall ihres Besitzers |
| O10 | Hetzner-Wartung, Managementports, Provider-Firewall und IPv6 prüfen | Produktionsfreigabe |
| O11 | Lokale Wissens-Pilotverträge vorhanden; externe Authentifizierung, unterstützte Wissensbeiträge, Lesen/Suchen und Revisions-/Rechtevertrag abstimmen | echte Wissensintegration; siehe [Codeabgleich](knowledge-server-status.md) |

Routineannahmen: 07:00 Europe/Berlin, Themen Design/Technik/Forschung, täglicher
Entwurf. Budgetwerte in Bildern sind synthetisch, kein beschlossenes Ausgabenlimit.
Vor konkreten Providerkosten werden verbindliche Grenzen festgelegt.
