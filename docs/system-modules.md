# Zuständigkeiten im Gesamtsystem

Festlegung vom 15. September 2026: Das Dashboard bedient mehrere spezialisierte
Systeme. Der Knowledge Server ist die Wissensanwendung, nicht das gesamte
Backend. Die detaillierte Betriebsplanung liegt im separaten lokalen
Repository `server_einstellungen`; diese Seite hält die öffentlichen Grenzen
für Dashboard-Code und Issues fest. Module bedeuten nicht automatisch eigene
Repositories oder Dienste.

| Modul | Verantwortung | Zuordnung |
| --- | --- | --- |
| M01 · Oberfläche | Navigation, Eingabe, Lesen, Präferenzen und Abspielposition | Dashboard |
| M02 · Zugang | Login/TOTP/Recovery; Dienstidentitäten und Rechte an jeder API | Hub und jeweiliger Empfänger |
| M03 · Eingang/Zustellung | persönliche Rohnotizen, Originalfotos/-aufnahmen, Revisionen und explizite Übertragung | Hub-DB, privater Speicher, Delivery-Worker |
| M04 · Aufträge/Ausführung | allgemeine Aufgaben, Annahme, Hermes-Runs, Rückfragen, Stop, Zeitplan und Forschungsbudget | eigener Execution-Vertrag über vorhandenen Harness |
| M05 · Wissen | kanonische Notizen, Claims, Evidenz, Bewertung, Review, Revisionen und Retrieval | [Knowledge Server](https://github.com/dweigend/knowledge-server) |
| M06 · Literatur | Bibliografie, Original-PDFs, Leseannotationen und Dateisynchronisierung | Zotero und schmale Adapter |
| M07 · Wissensverarbeitung | Extraktion, Fundstellen, Matching, Wissenspflege und dafür erforderliche Jobs | bestehende Knowledge-Module und Worker |
| M08 · Recherche/News | Quellenkandidaten, Feeds, Web-/Archivadapter, Herkunft und Suchumfang | ausgewählte Werkzeuge für Execution/Publication |
| M09 · Redaktion/Publikation | Artikel/Ausgaben, redaktionelle Prüfung, Freigabe/Widerruf und Content-Pakete | eigenständige fachliche Publication-Verantwortung |
| M10 · Transkription | Aufnahme zu abgeleitetem Text, eigene Jobs und Verarbeitungserlaubnis | gezielte Worker-Fähigkeit; Original bleibt im Hub |
| M11 · Audio | Sprechtext, TTS, Audioversionen, Jobs, Rechte und Medienbudget | unabhängiges Mediensystem |
| M12 · Betrieb/Meldungen | bereinigte Beobachtungen mit Zeitpunkt und handlungsrelevante Benachrichtigungen | Collector/Adapter; kein globaler Job-Eigentümer |
| M13 · Infrastruktur | Coolify/Proxy, private Netzstrecke, Prozessbetrieb, Secrets und Ressourcenlimits | jeweiliger Hostbetrieb |
| M14 · Wiederherstellung | konsistente Sicherung je Datenbesitzer, Retention, Restore und Rollback | Betriebswerkzeuge; keine Wissensfachfunktion |

M02/M03 beginnen im Hub. M05/M07 bleiben im vorhandenen Knowledge-Projekt.
M08 kann zunächst aus wenigen Adaptern bestehen; M09 braucht eine klare
Code-/Datenverantwortung, nicht zwangsläufig einen eigenen Container.
Ein gemeinsamer Medienruntime für M10/M11 ist möglich, ihre Aufträge und
Datenfreigaben bleiben getrennt. Keine neue Pluginplattform oder zweite
Agentenschleife wird durch diese Aufteilung verlangt.

## Knowledge: Aufgabe und Grenze

Knowledge bewahrt bewusst ausgewähltes Wissen mit Quellenbezug, Gegenbelegen,
Begründung und Historie. Dazu gehören seine vorhandenen Import-, Extraktions-,
Abgleich- und Prüfabläufe einschließlich ihrer lokalen Jobs. Diese funktionierende
Fachverarbeitung soll nicht pauschal herausgelöst werden.

Allgemeine Aufgabenplanung, rohe persönliche Eingaben, Magazinredaktion,
Transkription, TTS, Login und Serveradministration gehören anderen Modulen.
Ein Wissensreview ist keine Ausgabenfreigabe; eine Quellenansicht ist keine
Magazinausgabe. Ein Knowledge-Export kann einen Artikel beliefern, besitzt aber
nicht deshalb die gesamte Publikation.

Ein persönlicher Gedanke darf dauerhaft im Hub bleiben. Die vorhandene
Referenzpflicht einer Knowledge-Notiz ist kein Hindernis für Capture und kein
Auftrag, diese Regel aufzuweichen. Erst eine bewusste Wissensaktion überträgt
unterstütztes Material. Eine freie kanonische Wissensnotiz wäre eine eigene
Produktentscheidung; es werden keine Dummy-Quellen erfunden.

## Schnittstellen und Unabhängigkeit

- **KnowledgePort:** bestehendes Wissen lesen/suchen und unterstützte
  revisionsgebundene Fachbefehle. Keine allgemeinen Task- oder Magazinbefehle.
- **ExecutionPort:** allgemeine Aufgaben mit Hermes ausführen und ihren Zustand
  abgleichen. Nur ausdrücklich wissensabhängige Schritte benötigen Knowledge.
- **PublicationPort:** Ausgabeentwurf, Artikel, Freigabe, Rechteprüfung und
  versioniertes Textpaket. Knowledge ist eine mögliche Inhaltsquelle.
- **TranscriptionPort:** Originalaufnahme zu abgeleitetem Text; kein implizites
  Speichern im Wissenssystem oder Übermitteln an einen ungeprüften Provider.
- **MediaPort:** autorisiertes Publication-Paket zu Audio; unabhängig von
  Wissensänderungen, Research-Erfolg und Forschungsbudget.
- **OperationsPort:** lesende Beobachtungen aller beteiligten Besitzer.

Jede Mutation wird beim tatsächlichen Besitzer bestätigt. Eine zusammengeführte
Jobliste führt Herkunft und ID mit; sie wird keine zweite Auftragsdatenbank.
Model-free Wissensbefehle brauchen keine künstliche Job-ID. Verträge und
Dienstrechte werden pro Fähigkeit geprüft, auch bei gemeinsamem HTTPS-Zugang.
Die [Adapterdetails](../contracts/integrations.md) definieren den Zielumfang.

## Konsequenzen für die ersten Issues

Capture, freie Aufgaben, eine redaktionell geprüfte News-Ausgabe und Audio aus
freigegebenem Text dürfen grundsätzlich ohne Knowledge funktionieren.
Knowledge-Ausfall blockiert ausschließlich davon abhängige Arbeit.

Knowledge [#36](https://github.com/dweigend/knowledge-server/issues/36) betrifft
seinen eigenen externen Zugriff. Allgemeine Ausführung und Publikation erhalten
eigene Verträge in ihren zuständigen Modulen. Knowledge
[#40](https://github.com/dweigend/knowledge-server/issues/40) und
[#41](https://github.com/dweigend/knowledge-server/issues/41) sind mögliche spätere
Wissensexporte, keine Pflichtvoraussetzung für jedes Magazin oder jede Audiodatei.
Die [Dashboard-Issues](feature-backlog.md) werden entsprechend eingegrenzt.
