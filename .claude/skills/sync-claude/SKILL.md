---
description: Sincronizza skills e comandi .claude tra la repo Gravity e ~/.claude globale, in entrambe le direzioni
---

# Sync .claude — Sincronizzazione bidirezionale

Gestisci la sincronizzazione tra due cartelle `.claude`:
- **Repo:** `/Users/elenafaraci/Desktop/gravity/.claude`
- **Globale:** `~/.claude` (si applica a tutti i progetti Claude Code sul Mac)

---

## Direzione 1 — Repo → Globale (dopo un `git pull`)

Usa questa direzione quando hai appena fatto un pull e la repo contiene skills o comandi nuovi o aggiornati.

```bash
cp -r /Users/elenafaraci/Desktop/gravity/.claude/commands/. /Users/elenafaraci/.claude/commands/
cp -r /Users/elenafaraci/Desktop/gravity/.claude/skills/. /Users/elenafaraci/.claude/skills/
```

Poi mostra un riepilogo:
```bash
echo "=== commands ===" && ls /Users/elenafaraci/.claude/commands/
echo "=== skills ===" && ls /Users/elenafaraci/.claude/skills/
```

---

## Direzione 2 — Globale → Repo (dopo aver creato o modificato una skill/comando in ~/.claude)

Usa questa direzione quando hai creato o modificato qualcosa in `~/.claude` e vuoi portarlo nella repo (così il team lo riceve al prossimo pull).

```bash
cp -r /Users/elenafaraci/.claude/commands/. /Users/elenafaraci/Desktop/gravity/.claude/commands/
cp -r /Users/elenafaraci/.claude/skills/. /Users/elenafaraci/Desktop/gravity/.claude/skills/
```

Poi fai commit e push:
```bash
git -C /Users/elenafaraci/Desktop/gravity add .claude/
git -C /Users/elenafaraci/Desktop/gravity commit -m "sync: aggiorna skills e comandi .claude"
git -C /Users/elenafaraci/Desktop/gravity push
```

---

## Come scegliere la direzione

| Situazione | Direzione |
|-----------|-----------|
| Hai appena fatto `git pull` con modifiche a `.claude/` | Repo → Globale |
| Hai creato o modificato una skill/comando in `~/.claude` | Globale → Repo |
| Non sei sicuro | Chiedi all'utente quale operazione ha appena fatto |

---

## Note
- La copia sovrascrive i file esistenti con lo stesso nome — è il comportamento corretto
- Non sincronizzare mai file al di fuori di `commands/` e `skills/` (es. `settings.json`, `memory/`, ecc.)
- Dopo la direzione Globale → Repo, verifica sempre con `git status` prima del commit
