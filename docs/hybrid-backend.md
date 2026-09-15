# Backend zwischen Hetzner und Heimserver

Aktualisiert: 15. September 2026. Architekturvorschlag auf Basis der Server-Tasks,
Repository-Dokumentation und einer read-only SSH-/Coolify-Inspektion.
Die Web-App gehört nach der aktuellen Nutzervorgabe auf Hetzner; Knowledge und
allgemeine Ausführung bleiben fachlich getrennte Bereiche auf dem MS-A2.
Die [Modulgrenzen](system-modules.md) präzisieren die ursprüngliche Research-Sammelfassade. Die hier beschriebene Verbindung ist noch nicht eingerichtet.

## Aufteilung

```mermaid
flowchart LR
    subgraph Cloud["Hetzner"]
        Web["Dashboard web + delivery worker"]
        DB["Dashboard DB and private files"]
        Web --> DB
    end
    subgraph Home["Home server"]
        Tasks["Task Service / Hermes"]
        Knowledge["Knowledge Server and workers"]
    end
    Media["Media Service: placement to verify"]
    Web -->|Private authenticated HTTPS| Tasks
    Web -->|Private authenticated HTTPS| Knowledge
    Web -->|Scoped media contract| Media
```

Hetzner hält Anmeldung, Sitzungen, schnelle Eingänge, Uploads, Lesepositionen und
Zustellbelege sowie eigene Magazinartikel/-ausgaben. Dadurch lassen sich auch bei ausgeschaltetem Heimserver Gedanken
speichern. Es gibt eine eigene Dashboard-Datenbank; weder Coolifys interne Datenbank
noch die Matrix-Datenbank wird dafür verwendet.

Knowledge hält Wissen, Revisionen, Evidenz und Wissensreview; Zotero besitzt
Literatur und Original-PDFs. Knowledge-spezifische Verarbeitung und deren lokale
Jobs bleiben in der bestehenden Python-Anwendung. Ihr HTTP-Adapter erweitert
nur diese Fachoperationen, nicht das gesamte persönliche Serversystem.

Allgemeine Aufträge, Hermes-Zuordnung, Rückfragen und Stop gehören zum Auftragsdienst.
Redaktion und Ausgabenfreigabe gehören zum Dashboard-Magazin. Die Fähigkeiten
müssen Knowledge nur verwenden, wenn der konkrete Ablauf dessen Wissen benötigt.
Ein gemeinsamer privater HTTPS-Einstieg kann nach Fähigkeit routen, ohne dass
Knowledge alle Aufträge entgegennimmt. Der Matrix-Gateway bleibt ein anderer
Client; eine Chatantwort ersetzt keinen belastbaren Annahmebeleg.

Der [Wissensabgleich](knowledge-integration.md) gilt ausschließlich für dessen
Fachzugriff. Private Netzwerkprüfung und API-Verträge sind erforderlich, bevor
Live-Funktionen aktiviert werden; lokale Fixtures können vorher entstehen.

Media bleibt ein eigenes System mit eigenen Jobs, Daten und Geheimnissen.
Ein Betrieb auf dem MS-A2 ist möglich, seine endgültige Hostzuordnung bleibt
offen. Alle lokalen Verfahren müssen unter Linux ohne GPU funktionieren.

## Verbindung und Isolation

Arbeitsentscheidung: Tailscale auf dem Hetzner-Host ergänzen, den vorhandenen
MS-A2-Knoten weiterverwenden. Keine Portfreigabe am Heimrouter, kein Exit-Node,
kein Subnet-Routing ins Heimnetz und keine öffentlichen Fach-APIs.
Ein zusätzlicher Coolify-Servereintrag für den MS-A2 ist dafür nicht nötig.

Auf dem MS-A2 binden die privaten Fachadapter zunächst nur an Loopback. Tailscale Serve übernimmt
privates HTTPS auf TCP 443. Eigene Diensttokens begrenzen die erlaubten
Operationen zusätzlich. HTTPS-Freigabe, Zertifikat und bestehende Serve-Belegung
vorher prüfen. Serve ist für Tailnet-Zugriff dokumentiert; Funnel gehört nicht
zu diesem Entwurf. [Tailscale Serve](https://tailscale.com/docs/features/tailscale-serve).

Der Browser spricht ausschließlich mit Dashboard. Dashboard verwendet einen fest
konfigurierten privaten Hostnamen; Nutzerinhalte dürfen Zieladresse, Header,
Scope oder Downloadziel nicht frei setzen. Keine Shell über SSH pro Auftrag,
keine freien Hermes-Toolaufrufe und keine SQL-Verbindung von Hetzner nach Hause.

Das Zugriffsmodell erlaubt dem Hetzner-Dienst nur TCP 443 zum MS-A2. Bei einer
späteren lokalen Media-API kommt ein ausdrücklich vereinbarter eigener Port
und Token hinzu. SSH, RDP, SMB, PostgreSQL, NAS und andere Tailnet-Geräte bleiben
für diesen Dienst gesperrt. Davids administrative Geräte behalten separat
ihre geprüften Zugänge.

Die gesamte bestehende Tailnet-Policy muss vor Enrollment geprüft werden:
Eine engere Grant-Regel hebt ein vorhandenes breites Allow nicht auf. Tags und
Tag-Eigentümer sind kontrolliert zu vergeben; eine Umstellung des MS-A2 auf
Tags darf bestehende persönliche Adminrechte nicht unbeabsichtigt entfernen.
[Grant-Semantik](https://tailscale.com/docs/reference/syntax/grants).

### Der Containerpfad ist ein eigener Abnahmepunkt

Dashboard bleibt im Docker-Bridge-Netz. Ausgehende Verbindungen müssen vom tatsächlichen
Dashboard-Container über den Host nach Tailscale funktionieren, einschließlich DNS,
TLS-Prüfung, Routing und wirksamer Quellidentität. Ein erfolgreicher Host-Ping
beweist das nicht. Docker behandelt Container-DNS und Netzräume ausdrücklich
separat. [Docker Networking](https://docs.docker.com/engine/network/).

Für den ersten Pilot kann ein konfiguriertes `extra_hosts`-Mapping den privaten
vollständigen Hostnamen auf die bestätigte Tailnet-IP abbilden. Die HTTPS-URL
bleibt der Zertifikatsname. Kein globaler DNS-Umbau und kein Abschalten der
Zertifikatsprüfung als Fehlerbehebung. Mapping bei Wiederaufnahme eines Knotens
prüfen; echte Werte gehören nur in die Deployment-Konfiguration.

Bei Host-Tailscale teilen erlaubte Container die Netzwerkidentität des Hosts.
Die Policy allein isoliert Dashboard daher nicht von anderen Hetzner-Workloads.
Eine persistente Host-Egress-Regel muss die Dashboard-Web-/Worker-Netzpfade erlauben und andere
Containerpfade zur jeweiligen Fach-API sperren; auch nach Redeploy testen. Tokens sind
nur in den jeweils berechtigten Dashboard-Prozessen verfügbar. Root/Coolify bleibt Teil der Vertrauensbasis.
Wenn diese Trennung im Coolify-Pilot nicht stabil gelingt, bekommt Dashboard einen
eigenen Tailscale-Sidecar mit Dienstidentität. Das ist eine gezielte Alternative,
keine zusätzliche Pflichtkomponente im ersten Entwurf.

Dashboard erhält keinen Docker-Socket und keine Coolify-Administrator-Credentials.
App und eigene DB teilen ein privates Backend-Netz; nur der Webdienst ist am
Proxy-Netz angeschlossen. Die DB veröffentlicht keinen Host-Port. Die tatsächliche
Coolify-Netzanbindung muss geprüft werden, bevor Isolation behauptet wird.

## Dauerhafte Übergabe

### Gedanke erfassen

1. Dashboard prüft und speichert Text beziehungsweise Dateien auf Hetzner dauerhaft.
2. Der Capture darf dauerhaft im Dashboard bleiben. Nur eine ausdrückliche, vom
   Knowledge-Vertrag unterstützte Wissensaktion legt Revision und Zustellauftrag
   in derselben Dashboard-Transaktion fest.
3. Ein kleiner Delivery-Worker übermittelt genau diese Revision und deren
   erforderliche Quellen-/Wissensreferenzen. Freie Gedanken werden nicht
   über eine erfundene Referenz in das aktuelle Notizmodell gezwungen.
4. Knowledge registriert die unterstützte Fachoperation und Referenzen atomar.
5. Erst der bestätigte Beleg setzt diesen Transfer auf `transferred`.

Der Worker ist ein eigener Prozess aus demselben Dashboard-Image, damit er unabhängig
von offenen Browserseiten und HTTP-Laufzeiten arbeitet. Für Zustellungen liest
er die transaktionale Outbox. Zusätzlich fragt er bekannte Task-/Medienaufträge
und konfigurierte Briefing-Ergebnisse ab und übergibt sie den zuständigen
Dashboard-Modulen. Kein Redis und kein zweiter Forschungs-Scheduler.
Leases und begrenzte Wiederholungen verhindern parallele Doppelzustellung;
nach ausgeschöpften Versuchen bleibt ein sichtbarer Transferfehler.

Anhänge bleiben im ersten Knowledge-Pilot im Dashboard; eine vollständige Übernahme
mit still weggelassenen Dateien ist unzulässig. Andere ausdrücklich unterstützte
Transfers, etwa an media.transcriptions, verwenden begrenzte authentifizierte Uploads
mit Hash/Größe statt öffentlicher Links. Jede Antwort bestätigt nur ihren eigenen
Verarbeitungsschritt, keine implizite Wissensaufnahme.

### Recherche auslösen

Dashboard schreibt zuerst einen RequestReceipt mit stabiler Request-ID. Task Service
bestätigt erst nach dauerhaftem Eintrag in seinem Auftragsregister. Der
Hermes-Adapter korreliert die Ausführung mit dieser ID; die Antwort eines
LLM allein ist keine Annahmebestätigung. Dashboard zeigt erst dann einen echten Job.

Ist Task Service sicher nicht erreichbar, bleibt die Aufgabe ein Entwurf. Ein
Timeout nach möglicherweise erfolgter Annahme bleibt dagegen `uncertain` im
internen Zustellbeleg. Der Abgleich nutzt dieselbe Request-ID. Bei unklarem
Ergebnis wird kein neuer Schlüssel erzeugt und keine zweite Ausführung gestartet.
Wiederholung erst nach verbindlich negativem Abgleich und weiterhin gültiger
Ausführungsabsicht. Der Worker darf diese Belege abgleichen, aber keine nicht
angenommenen kostenpflichtigen Aufträge nach Stunden ungefragt neu starten.

Auftragsstatus wird über dieselbe Verbindung abgefragt; Ergebnisse benötigen
keinen öffentlich erreichbaren Callback. Stop und Rückfragen sind versionierte
Befehle. Task Service-Neustarts müssen Annahmen und Hermes-Zuordnungen bewahren.
Die [Adapterverträge](../contracts/integrations.md) definieren die Fachoperationen;
konkrete Upstream-URLs bleiben bis zur Implementierung unbesetzt.

## Lesen und Hören bei Heimserverausfall

Magazinartikel und Ausgaben gehören dashboard.magazine auf Hetzner. Der Ausfall
des Heimservers macht diese eigenen Daten nicht zu ungültigen Remote-Kopien.
Lokale Freigabe/Widerruf und aktuelle Zugriffsrechte gelten weiter. Neue Recherche
wartet auf Task Service; bestehende erlaubte Texte bleiben lesbar.

Für Beiträge aus externem Wissen und kopierte Media-Artefakte gelten zusätzlich
die Einschränkungen des jeweiligen Besitzers. Nur ausdrücklich erlaubte,
versionsgebundene Inhalte dürfen als private DeliveryCopy gespeichert werden.
Kein Spiegel der gesamten Knowledge-Datenbank und keine dort editierbaren Kopien.
IDs, Revisionen, Hashes, Freigabereferenz und Rechteprüfzeit bleiben nachvollziehbar.

Arbeitsvorschlag für solche externen Kopien: Rechte alle fünf Minuten abgleichen,
höchstens 24 Stunden seit letzter erfolgreicher Prüfung ausliefern. Bekannter
Widerruf sperrt sofort bei Verarbeitung; bei fehlender Verbindung kann ein
unbekannter Widerruf im Restfenster nicht sofort erkannt werden. Dieses Fenster
muss vor Aktivierung bestätigt werden. Eigene Magazintexte benötigen keinen
künstlichen 24-Stunden-Refresh bei einem entfernten Publication-Dienst.

Eine Medienanforderung bindet freigegebenen Text an konkrete Rechte/Revisionen;
Audio wird nur bei gültiger Textfreigabe und Media-Berechtigung ausgeliefert.
Nach Restore lokale Freigaben und externe Rechte prüfen, bevor Kopien erneut
bereitgestellt werden. Bereits heruntergeladene Dateien lassen sich nicht
nachträglich zurückholen.

Das ist serverseitige Verfügbarkeit, kein Browser-Offline-Sync. Private
Browserantworten bleiben `Cache-Control: private, no-store`. Fehlende oder alte
Jobbeobachtungen werden als unbekannt/veraltet dargestellt.

| Störung | Verbleibendes Verhalten |
| --- | --- |
| Heimserver offline | Login, Captures und erlaubte lokale Magazintexte funktionieren; neue Remote-Arbeit wartet |
| Task Service offline | keine behauptete allgemeine Annahme; alte Beobachtungen ausdrücklich veraltet |
| Knowledge offline | nur wissensabhängige Schritte betroffen |
| Media offline | Originale und Texte bleiben erhalten; berechtigte Audiokopien innerhalb ihrer Rechtefrist nutzbar |
| Dashboard-Magazin fehlerhaft | keine neue lokale Freigabe; andere verifizierte Dashboard-Module bleiben nutzbar |
| Dashboard DB/Volume defekt | keine erfolgreiche Speicherbestätigung; Readiness meldet die Störung |
| Hetzner offline | Dashboard nicht erreichbar; bereits angenommene externe Jobs laufen unabhängig weiter |

## Alternativen und nächste Entscheidung

Die ganze App zu Hause würde auch Login und Eingang vom Heimanschluss abhängig
machen. Ein öffentlicher Reverse-Tunnel zur jeweiligen Fach-API schafft eine weitere
Zugangsfläche. Ein ausgehender Pull-Agent vom MS-A2 wäre möglich, verlagert aber
Mailbox, Leasing und Statussynchronisierung nach Hetzner. Für den aktuellen
kleinen Umfang bleibt die private API über vorhandenes Tailscale am klarsten.

Der nächste Infrastruktur-Schritt ist der begrenzte Netzwerkpilot aus dem
[Deployment-Plan](deployment.md). Er richtet noch keine Rechercheautomatik ein.
