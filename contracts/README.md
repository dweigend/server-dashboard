# Schnittstellen v0.1

[openapi.json](openapi.json) ist der maschinenlesbare Zielvertrag der Dashboard-
Browser-API. Es beschreibt neue Dashboard-Endpunkte, **keine bereits existierenden
Knowledge-, Task-Service-, Media-, Hermes- oder Coolify-APIs**. Vertragsstatus: Entwurf für den ersten
Implementierungspilot. Rückwärtskompatibilität ist erst nach Freigabe garantiert.

Der Vertrag enthält noch keine fertigen Endpunkte für kanonische Wissensnotizen,
Behauptungen und Bewertungen. Die abgestimmten Operationsfamilien stehen in
[integrations.md](integrations.md); verbindliche Produzentenschemas und Rubrik
werden aus den lokalen Pilotverträgen für den externen Zugriff abgestimmt.
Die [Systemmodule](../docs/system-modules.md) trennen ihre Besitzer. Die bestehende
Ergebnis-/Artikelprüfung ist kein Ersatz für Claim-Assessment-Review.

## Konventionen

- Gleicher Ursprung wie die UI; Basis `/api/v1`. Keine Provider-Keys im Browser.
- Session-Cookie, HttpOnly, Secure in Produktion, SameSite=Lax, Host-only.
- Alle Mutationen prüfen Session, Origin und CSRF-Schutz; Auth-Bibliothek und
  eigene Handler benötigen jeweils wirksamen Schutz.
- Fehler: `application/problem+json`, stabiler `code`, sichere `detail`, requestId.
- Neue Ressourcen: 201; dauerhaft angenommene asynchrone Befehle: 202.
  `202` sagt nichts über spätere Ausführung oder fachliche Freigabe aus.
- Mutable Ressourcen mit Revision und ETag; Mutationen mit `If-Match`.
- Nicht idempotente POST-Befehle benötigen `Idempotency-Key`.
- Paginierung: opaker Cursor, maximal 100 Objekte; Filter ändern den Cursorraum.
- Authentifizierte Antworten `Cache-Control: private, no-store`.
- 401 führt zur Anmeldung, 403 verweigert, 404 verrät keine fremden Objekte,
  409 ist fachlicher Konflikt, 412 Revisionskonflikt, 413 zu groß, 422 ungültiger
  Inhalt, 428 fehlende Revision, 429 Rate-Limit, 503 nicht verfügbar.

`Issue`, `Article` und `AudioStatus` können zusätzlich `delivery` mit letzter
erfolgreicher Zustands-/Rechteprüfung, Veraltetheit und Kopieherkunft liefern.
Bei privater Lesekopie ist `accessValidUntil` Pflicht; abgelaufene oder bekannt
widerrufene Inhalte werden gar nicht ausgeliefert. Das JSON-Schema ergänzt die
Regeln aus [hybrid-backend.md](../docs/hybrid-backend.md), ersetzt sie aber nicht.

Bei unklarer Auftragsannahme liefert `createTask` einen 503-Problembeleg mit
`acceptance_uncertain` und stabiler Request-ID. Derselbe Idempotenzschlüssel
löst zuerst einen Abgleich aus. Die UI bewahrt den Entwurf und zeigt „Annahme
wird geprüft“; sie erzeugt dafür keinen zweiten Forschungsjob.

Lesende Listen sind nach `updatedAt` absteigend und als stabiler Snapshot zu
paginieren. Artikel einer Ausgabe folgen deren redaktioneller Reihenfolge.
Jobfilter verwenden die technischen Statuswerte; die UI übersetzt sie.
Beispielnutzlasten sind in den Schemas für CaptureCreate, TaskCreate, Budget
und Problem enthalten; ihre Inhalte und Geldbeträge sind synthetisch.

## Authentifizierungsgrenze

`/api/auth/*` gehört der später eingebundenen Auth-Bibliothek und wird nicht als
selbst erfundene Passwort-API nachgebaut. Favorit: Better Auth mit Passwort,
TOTP und Wiederherstellungscodes. `/api/v1/session` ist die kleine normalisierte
Dashboard-Sicht. Session-Cookiename im Zielvertrag: `hub_session`, bei Integration in
der Bibliothek entsprechend konfigurieren oder Vertrag anpassen.

Vor Umsetzung muss der Auth-Spike konkrete Bibliotheksversion, Cookieverhalten,
Login/TOTP/Logout/Recovery-Endpunkte und Tests festhalten. Solange dieser Nachweis
fehlt, ist P01 nicht implementierungsfertig. Keine selbst geschriebenen
Kryptografie- oder Sessionmechanismen als Abkürzung.

## Upload

`POST /uploads` überträgt eine Datei als multipart, liefert deren private ID und
Prüfstatus. Nur `ready`-Uploads desselben Kontos können einem Capture zugeordnet
werden. `GET /uploads/{id}` liefert den Prüfstatus, `/content` die autorisierten
Bytes. Ein GET führt keine Transkription, Konvertierung oder kostenpflichtige
Erstellung aus. Upload-Limits gelten auch am Proxy und Node-Adapter.

## Ausführung, Ausgabe und Audio

Auftragsannahme, Rückfragen, Stoppen und Wiederholen sind fachliche Operationen,
keine freien Prompt-to-Shell-Endpunkte. Die erlaubten Zustände stehen im
[Datenmodell](../docs/data-model.md). Artikel und Quellen sind revisionsgebunden.

Die Audio-Erstellung referenziert ein freigegebenes Content-Paket mit ID,
Revision und Hash. Auswahl einer Stimme darf keine neue redaktionelle Freigabe
erzeugen. `audio/request` ist ausdrücklich kostenrelevant und wird nur nach
einer Nutzeraktion ausgelöst. Vorhandenes Audio kann ohne Neugenerierung gehört
werden. Die Statusantwort trennt `unavailable`, `queued`, `running`, `ready`, `failed`.

`POST /issues/drafts` erstellt ausdrücklich einen Ausgabeentwurf, keine Freigabe
und kein Audio. Das Dashboard bestätigt die Quellen-/Zeitplanrevision.
dashboard.magazine führt geplante und manuelle Ausgabeergebnisse für denselben
Tag zusammen. Task Service besitzt den Zeitplan; Dashboard delivery holt dessen
Ergebnis ab. Die redaktionelle Freigabe ist eine lokale Domainoperation.

`/budgets/{domain}` verwaltet Task Service-Forschungsbudget (`research`) und Media
getrennt; `research` bezeichnet hier keine Knowledge-Tabellen. Ein gemeinsamer
Bildschirm kann beide Budgets zeigen; eine einzelne Mutation schreibt nur bei
einem Eigentümer. So gibt es keine vorgetäuschte atomare Änderung über zwei Dienste.

## Weitere Vertragsdetails

- [Systemadapter und Discovery](integrations.md)
- [Datenmodell und Zustandsübergänge](../docs/data-model.md)
- [Sicherheit und Berechtigungen](../docs/security.md)
- [Abnahmefälle](../docs/acceptance.md)

Version 0.1 bleibt bewusst auf die erste Version begrenzt. Passkeys, Annotation-
Synchronisierung, OCR-Befehle, Offline-Outbox im Browser und SSE sind nicht
scheinbar fertige Endpunkte in diesem Vertrag.
