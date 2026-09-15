# Zugang, Datenschutz und Vertrauensgrenzen

Status: erforderliches Sicherheitsdesign für eine persönliche Internet-App.
Keine der Maßnahmen wird durch dieses Dokument als umgesetzt bezeichnet.

Die [Hybrid-Architektur](hybrid-backend.md) ergänzt Dienstidentität, Tailnet-
Rechte, Docker-Netzgrenzen und eingeschränkte Cloud-Ablage. Der
[Deployment-Audit](deployment-audit.md) beschreibt tatsächlich beobachtete Lücken.

## Zugang

Ein vorab eingerichtetes Konto, keine freie Registrierung. Passwort plus TOTP
für produktiven Zugriff; Recovery-Codes bei Einrichtung offline sichern.
Favorisierte Bibliothek Better Auth unterstützt einen 2FA-Baustein; Eignung
und exakte Integration werden im Auth-Spike überprüft.
[Dokumentation](https://better-auth.com/docs/plugins/2fa).

Sitzungen serverseitig widerrufbar; produktive Cookies Secure, HttpOnly,
SameSite=Lax, hostgebunden und ohne Domain-Freigabe an Geschwister-Subdomains.
Vorschlag: 7 Tage absolute Dauer, 24 Stunden Inaktivität; erneute Authentifizierung
vor Änderung von Passwort, zweitem Faktor oder Recovery. Kein JWT/Provider-Key
in LocalStorage. Vor Login keinerlei privater Inhalt im HTML oder Prefetch.

Login-Limit als Pilotwert: fünf Fehlversuche pro Konto und Minute, ergänzt um
IP-basierte Limits und zeitlich begrenzte Verzögerung. Keine dauerhaft leicht
auslösbare Kontosperre. Fehlermeldungen verraten nicht, ob ein Konto existiert.
Abmeldung widerruft die Session und entfernt persönliche Browser-Caches.

## Berechtigungen und Angriffsflächen

- Session- und Objektbesitzprüfung für jedes API-Objekt und jede Datei.
- Mutationen nur mit Origin-/CSRF-Prüfung; CORS nicht als Ersatz verwenden.
- Provider-Credentials ausschließlich im Serveradapter, getrennte Scopes je Dienst.
- Private Verbindung zum Research-System; keine öffentliche Hermes-Adminoberfläche.
- Keine ungeprüften Remote-URLs als serverseitige Downloadziele. Quellenabruf im
  zuständigen isolierten Dienst mit Schutz vor internen Netzen/SSRF.
- Markdown serverseitig sicher rendern; kein ungeprüftes HTML, JavaScript oder
  SVG aus Rechercheergebnissen. Quellen/Artikel sind Daten, keine Systemanweisungen.
- Audio- und Fotodaten vor Nutzung prüfen; MIME-Angaben des Browsers nicht vertrauen.
- CSP und sichere Response-Header festlegen; keine eingebetteten externen Skripte
  oder Fonts für das Kernprodukt. Authentifizierte Dokumente nicht CDN-cachen.

## Datenverarbeitung

Capture-Speicherung ist kein Einverständnis zur Übermittlung an beliebige
Transkriptions-/Modellprovider. Im Pilot einen ausdrücklich gewählten lokalen
oder externen Verarbeitungsweg und dessen Aufbewahrung dokumentieren.
Aufnahme nur nach bewusster Mikrofonaktion; keine Hintergrundaufnahme.

Audit: Actor, Operation, Objekt-/Request-ID, Resultat und Zeitpunkt. Keine
Passwörter, Session-IDs, rohe Prompts, Notiztexte oder komplette Transkripte in
Standardlogs. Diagnosen verwenden korrelierbare IDs und bereinigte Fehlercodes.

## Wiederherstellung und Veröffentlichung

Auth-Daten, Dashboard-DB und Capture-Dateien gehören in verschlüsselte Backups.
Research und Media sichern ihre eigenen autoritativen Daten. Restoretests
prüfen auch Referenzen und Dateihashes, nicht nur das Starten eines Containers.

Vor einer öffentlichen GitHub-Veröffentlichung Quellcode und Historie prüfen;
Runtime-Daten bleiben außerhalb Git. Die App bleibt auch bei öffentlichem
Quellcode eine private, authentifizierte Instanz.
