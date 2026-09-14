# Zusammenarbeit und Veröffentlichung

Der erste Entwicklungsabschnitt beginnt nach den Konzeptentscheidungen in
[Umsetzungsplan](docs/implementation-plan.md). Kleine vertikale Schritte liefern
jeweils UI, Vertrag, Zustände und eine nachvollziehbare Abnahme.

## Arbeitsweise

- Feature-Branches: `codex/<topic>`; Hauptbranch: `main`.
- Code, Bezeichner, Kommentare und Commit-Texte Englisch; Produktsprache Deutsch.
- Änderungen am Vertrag und an der UI-Spezifikation gemeinsam dokumentieren.
- `bash scripts/check.sh` vor einem Commit ausführen.
- Keine Kopie privater Serverkonfiguration in dieses öffentlich vorbereitete Repo.

## Vor dem ersten GitHub-Push

1. Repositoryname, Sichtbarkeit und Lizenz entscheiden.
2. Alle zu veröffentlichenden Dateien und die Git-Historie auf private Inhalte
   prüfen. `.local/` bleibt lokal; Secrets kommen später in Coolify bzw. lokale
   Secret-Verwaltung, nicht in GitHub-Dateien.
3. Rechte und Herkunft verwendeter Bilder, Fonts und Bibliotheken dokumentieren.
   Das Portfolio enthält neue GPT-Image-Entwürfe; die zugelieferten Original-
   Referenzen werden nicht automatisch lizenziert oder veröffentlicht.
4. GitHub-Repository erstellen und Remote bewusst setzen. Hier ist kein Remote
   vorbelegt, und der vorbereitete Workflow löst kein Deployment aus.
5. Checks auf GitHub ausführen und erst später einen separaten Coolify-
   Deploymentpfad anschließen.

Eine Veröffentlichung des Quellcodes veröffentlicht keine Wissensdaten,
Aufnahmen oder produktiven Konfigurationswerte.
