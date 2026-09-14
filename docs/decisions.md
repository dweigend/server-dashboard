# Entscheidungen und offene Punkte

Stand: 2026-09-14. „Arbeitsentscheidung“ ist eine begründete Vorgabe dieses
Konzepts, keine nachträglich behauptete Zustimmung des Nutzers.

## Festgelegt durch den Nutzer oder bestehende Projektentscheidungen

| ID | Entscheidung |
| --- | --- |
| D01 | Eigenständiges Projekt in der lokalen GitBase, später GitHub |
| D02 | Lokal entwickeln, später über eigenen Server mit Coolify bereitstellen |
| D03 | Browserzugang von überall, passwortgeschützt, bevorzugt eigene Subdomain |
| D04 | Mobile First, schwarz/weiß, eckig, ruhig und textarm |
| D05 | Hauptnavigation oben; keine Marke, Seitentitelzeile oder Zahnradleiste |
| D06 | Mindestens 90 Prozent der nutzbaren Fläche für Inhalt/Eingabe |
| D07 | Aufgaben, Text/Foto/Stimme, Jobübersicht, tägliches Magazin lesen/hören |
| D08 | Research nutzt Hermes; Wissensautorität PostgreSQL; Literatur Zotero |
| D09 | Audioproduktion ist ein eigenständiges System |
| D10 | Zuerst Specs, Designsystem und Verträge; noch keine App-Implementierung |

## Arbeitsentscheidungen dieses Konzepts

| ID | Entscheidung | Grund |
| --- | --- | --- |
| A01 | Name `weigend-hub`, Subdomainvorschlag `hub.weigend.studio` | klare eigenständige Identität |
| A02 | SvelteKit mit serverseitiger Hub-API | ein kleiner Webstack statt paralleler Backends |
| A03 | Svelte 5, Bun-Tooling, Node im Produktionscontainer | Nutzerkonvention und dokumentierter Serveradapter |
| A04 | System-Sans + optionale Leseserif + sparsame Monospace-Akzente | Lesen und Eingabe vor Terminal-Dekor |
| A05 | 48px-Iconnavigation, 44px-Touchziele | messbare Flächenregel bei guter Bedienbarkeit |
| A06 | Hub-eigene Capture-Ablage, danach explizite Research-Übernahme | schneller sicherer Eingang ohne zweite Wissensautorität |
| A07 | Polling statt eigener Event-Infrastruktur im ersten Release | einfache verlässliche Statusabfrage |
| A08 | Passwort + TOTP; Better Auth als Kandidat | keine eigene Kryptografie |
| A09 | Forschungs- und Medienbudget getrennt | unabhängige Ausführung und Kostenautorität |
| A10 | Originalreferenzen lokal; 30 neue Mockups im Repo | vollständige lokale Grundlage, nachvollziehbare Veröffentlichung |

## Noch zu entscheiden oder nachzuweisen

| ID | Punkt | Blockiert |
| --- | --- | --- |
| O01 | bestehender Coolify-Host oder MS-A2 als Webhost; sichere Verbindung | Produktionsnetz/Deployment |
| O02 | finale Bildauswahl und Serif/Sans-Präferenz | visuelle Abnahme, nicht das Konzept |
| O03 | tatsächliche Research-/Hermes-API, Dauerhaftigkeit und Stop-Verhalten | echte Rechercheintegration |
| O04 | Audio-/Transkriptionsanbieter, Stimme, Datenverarbeitung | echte Audio-/Sprachverarbeitung |
| O05 | Themen, Quellen, Uhrzeit und Monatslimits | produktiver Magazinplan |
| O06 | Lizenz und GitHub-Sichtbarkeit | Veröffentlichung |
| O07 | Auth-Spike inklusive Recovery und 2FA | Produktivzugang |
| O08 | Backupziel, Kapazität und getestete RPO/RTO | Produktionsfreigabe |

Routineannahmen: 07:00 Europe/Berlin, Themen Design/Technik/Forschung, täglicher
Entwurf. Budgetwerte in Bildern sind synthetisch, kein beschlossenes Ausgabenlimit.
Vor konkreten Providerkosten werden verbindliche Grenzen festgelegt.
