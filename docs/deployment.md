# Lokale Entwicklung und Coolify-Betrieb

Status: geplanter Betrieb. Bisheriger Arbeitsstand ist ausschließlich lokal.
Vorläufiges Ziel: bestehender Coolify-Server; Research auf dem MS-A2.
Die endgültige Hostzuordnung ist in [Entscheidungen](decisions.md) als offen markiert.

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

Subdomain-Vorschlag: `hub.weigend.studio`. DNS-Zuständigkeit, aktueller Proxy und
Zertifikate werden vor dem Deployment geprüft. Bisherige ältere Inventare sind
kein Live-Nachweis. Kein DNS-Eintrag oder Coolify-Projekt wurde hier verändert.

## Netzwerk und Ressourcen

Öffentlich nur HTTPS zur Hub-App. Datenbank, Dateien, Statusadapter und Research
erhalten keine zusätzlichen öffentlichen Ports. Bei Hub auf dem bestehenden
externen Server ist eine eingeschränkte private Verbindung zum MS-A2 erforderlich;
die Existenz von Tailscale auf anderen Geräten beweist diese Strecke noch nicht.
Host, Netzregeln und Dienstidentität im Integrationspilot prüfen.

Ein Hub-Container und eine persistente Hub-PostgreSQL-Datenbank reichen als
Startpunkt; keine Redis-/Broker-Abhängigkeit ohne Bedarf. Pilotbudget: 1 CPU,
512 MiB für Hub, separat mindestens 512 MiB für dessen DB als zu messende
Startannahme. Research-/Audioressourcen sind davon unabhängig. Datei- und
Backupvolumen vor Start messen und mit Grenzen versehen.

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
