# Lokale Entwicklung und Coolify-Betrieb

Status: geplanter Hub-Betrieb; bestehende Infrastruktur read-only geprüft.
Ziel nach aktueller Nutzervorgabe: Web-App auf Hetzner unter Coolify,
Research auf dem MS-A2. Die App ist weiterhin ausschließlich ein lokales Konzept.
Siehe [Live-Prüfung](deployment-audit.md) und [Backend-Verbindung](hybrid-backend.md).

## Lokal

Projekt in `GitBase/weigend-hub`. Zuerst Fixtures und Mockadapter ohne
Produktiv-Credentials. Danach eigene Entwicklungsdatenbank und isolierte
Testdienste. Bun für Installation, Dev-Server und Checks; Lockfile mitführen.
Keine Verbindung zu Produktionsdaten durch voreingestellte `.env`-Werte.

Noch kein `package.json`, Dockerfile oder Compose-Stack: diese werden erst mit
dem ersten ausführbaren Durchstich angelegt und tatsächlich getestet.

## Produktionspfad

```text
Mac → Feature-Branch → Checks/Review → main → Container-Build → Staging
    → Migration/Smoke-Test → bewusste Promotion → Coolify-Produktionsinstanz
```

Ein reproduzierbares Dockerfile mit festgelegten kompatiblen Bun-/Node-Versionen
und Lockfile ist der geplante Buildweg. Non-root-Laufzeit, nur benötigte
Produktionsdateien, kein Secret in Build-Layern. SvelteKits Node-Adapter liefert
den eigenständigen Server; Coolify unterstützt Dockerfile-Builds.
[SvelteKit](https://svelte.dev/docs/kit/adapter-node),
[Coolify](https://coolify.io/docs/applications/builds/dockerfile).

Subdomain-Vorschlag: `hub.weigend.studio`. Laufender Proxy und Coolify-Zugang sind
geprüft; Nameserver passen zu IONOS. Für Hub wurde noch kein A/AAAA-Ziel gefunden.
DNS-Schreibzugang und Hub-Zertifikat sind vor Deployment nachzuweisen.
Kein DNS-Eintrag oder Coolify-Projekt wurde hier verändert.

## Netzwerk und Ressourcen

Öffentlich nur HTTPS zur Hub-App. Datenbank, Dateien, Statusadapter und Research
erhalten keine zusätzlichen öffentlichen Ports. Bei Hub auf dem bestehenden
externen Server ist eine eingeschränkte private Verbindung zum MS-A2 erforderlich;
die Existenz von Tailscale auf anderen Geräten beweist diese Strecke noch nicht.
Auf Hetzner fehlt Tailscale noch. Host, Netzregeln und Dienstidentität im
Integrationspilot prüfen; Details stehen im Hybrid-Backend-Entwurf.

Ein Hub-Webcontainer, ein kleiner Delivery-Worker aus demselben Image und eine
eigene persistente PostgreSQL-Datenbank bilden den Startpunkt. Pilotgrenzen:
1 CPU/512 MiB Web, 0,5 CPU/256 MiB Worker, 1 CPU/512 MiB DB; noch zu messen.
Web und Worker teilen Capture-/Lesespeicher; die DB hat ein eigenes Volume.
Keine Wiederverwendung interner Coolify-/Matrix-Datenbanken und kein neuer Broker.
Research-/Audioressourcen sind unabhängig. Datei- und Backupvolumen begrenzen.

Research wird zunächst als Python-Dienst mit eigener Unix-Identität und systemd
auf dem MS-A2 betrieben; API nur auf Loopback, Datenbank lokal. Kein zweites
Coolify nur für diese Verbindung. Das Verfahren wird im Research-Projekt
implementiert. Die vorhandene interaktive Hermes-Konfiguration wird dafür
nicht ungeprüft als Internet-Auftragsdienst verwendet.

## Konfiguration zur späteren Umsetzung

| Name | Zweck | Geheimnis |
| --- | --- | --- |
| ORIGIN | exakter öffentlicher HTTPS-Ursprung | nein |
| HOST / PORT | Container-Bindung / interner Port | nein |
| DATABASE_URL | ausschließlich Hub-Datenbank | ja |
| AUTH_SECRET | Bibliothekskonfiguration | ja |
| RESEARCH_BASE_URL / RESEARCH_TOKEN | private Research-Fassade | Token ja |
| MEDIA_BASE_URL / MEDIA_TOKEN | separater Medienanbieter | Token ja |
| CAPTURE_STORAGE_PATH | privates persistentes Volume | nein |
| OPERATIONS_BASE_URL / OPERATIONS_TOKEN | minimaler Statuszugriff | Token ja |
| PUBLICATION_CACHE_PATH | private freigegebene Lesekopien | nein |
| PUBLICATION_CACHE_MAX_AGE_SECONDS | vorgeschlagenes Rechtefenster 86400 | nein |

Namen sind ein Zielvertrag, keine aktuell unterstützten Umgebungsvariablen.
In Coolify zur Laufzeit setzen. Trusted-Proxy-Header und ORIGIN explizit
konfigurieren; Uploadgrenzen am Proxy, Node-Adapter und Handler abstimmen.
Kein unbegrenztes Request-Body-Limit.

## Health, Migration und Rollback

`/health/live`: Prozess antwortet, keine sensiblen Details. `/health/ready`:
Hub-DB, kompatibles Schema und Capture-Speicher verfügbar. Research-/Audioausfall
setzt die App nicht automatisch auf unready; er wird als Teilstörung angezeigt.
So bleiben Login, Eingänge und vorhandene Texte erreichbar.

Migrationen als einmaliger kontrollierter Schritt mit Lock und Backup vor
Promotion ausführen; nicht konkurrierend bei jedem Replica-Start. Zuerst
additive/abwärtskompatible Änderungen. Container-Rollback auf vorherigen
Image-Digest nur bei kompatiblem Schema; destruktive Migrationen brauchen
eigenen Wiederherstellungsplan. Rollback ist kein automatisches DB-Downgrade.

## Backups und laufender Betrieb

Persistente Daten benötigen Volumes; ein Container-Neustart bewahrt ohne
geeignete Mounts keine Dateien. Die konkrete Mountkonfiguration wird im ersten
Deployment geprüft. [Coolify Storage](https://coolify.io/docs/core/persistent-storage/storage-mounts/overview).

Zielwerte zur Bestätigung: RPO 24 Stunden, RTO vier Stunden. Tägliche konsistente
Hub-DB-/Dateisicherung, verschlüsselte zweite Kopie außerhalb des App-Hosts,
7 tägliche + 4 wöchentliche Stände, monatlicher Restoretest. Vorhandene NAS-
Sicherungen gelten nicht automatisch als verifizierte Hub-Sicherung.

Beobachten: Appfehler, fehlgeschlagene Zustellungen, ältester wartender Auftrag,
Staleness der Adapter, freie Dateifläche, Budget, letzte erfolgreiche Sicherung
und letzter Restoretest. Benachrichtigung nur bei handlungsrelevanter Änderung.
Matrix ist optionaler bestehender Kanal, kein Pflichtteil der Browser-App.

Dateispeicher knapp: neue Uploads begrenzt ablehnen, bestehende Inhalte lesbar
halten. Research offline: neue Aufträge nicht als angenommen behaupten.
Audio offline: Text weiter verfügbar. Zertifikat-/Authprobleme: Zugriff sperren,
keinen unsicheren Ausweichmodus anbieten.

## Konkrete Reihenfolge ab diesem Konzept

1. Wartungs- und Wiederanlaufplan des bestehenden Hetzner-Hosts klären; aktuelle
   Sicherung und Verwaltungszugang prüfen. Provider-Firewall und IPv6 einsehen.
2. Vollständige Tailnet-Policy prüfen, Dienstidentität vorbereiten, Adminzugänge
   bewahren. Danach Hetzner enrollen; keine LAN- oder NAS-Routen veröffentlichen.
3. Einen synthetischen privaten HTTPS-Pilot auf dem MS-A2 über Serve anbinden.
   Aus isoliertem Testcontainer DNS, TLS und erlaubten API-Zugriff nachweisen;
   SSH/RDP/SMB/DB und fremde Container müssen gesperrt bleiben. Neustart testen.
4. In der Research-Anwendung den minimalen Capture-Vertrag und den Hermes-
   Annahme-/Abgleichvertrag implementieren. Hub kann parallel Fixtures verwenden.
5. Eigenes Coolify-Projekt mit getrenntem Staging, DB, Volumes und Runtime-Secrets
   anlegen. Einen expliziten Docker-Zielserver wählen; die vorhandenen Einträge
   nicht als zwei unabhängige Maschinen oder als Hochverfügbarkeit interpretieren.
6. Vollständigen Durchlauf mit Neustart und Netzunterbrechung, Daten-/Dateirestore,
   kompatibler Migration und Rollback prüfen. Bestehende Website/Matrix mitprüfen.
7. Erst anschließend DNS, Zertifikat und produktive Anmeldung aktivieren.

Die Netzwerkprüfung gehört vor die echte Research-Anbindung. Der GitHub-Build
braucht keinen Zugang zum Heimnetz; Code wird am Mac entwickelt, ein festes
geprüftes Image nach Staging und danach unverändert nach Produktion übernommen.
Builds auf demselben Hetzner-Host müssen bestehende Dienste durch Limits schützen.
