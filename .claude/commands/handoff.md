---
description: Crea un file di handoff Figma per Gravity MVP. Raccoglie user story, lingua e ruoli, esplora i template di schermata presenti nel file, poi costruisce ogni Section duplicando e compilando le schermate corrette per raccontare il flusso.
---

# Handoff Gravity — Costruisci Flusso

Segui questo flusso nell'ordine esatto. Non saltare nessun passo.

---

## FASE 1 — Raccolta informazioni

Prima di toccare Figma, chiedi all'utente tutte le informazioni necessarie in un'unica risposta strutturata:

**Domanda 1 — File di destinazione**
In quale file Figma devo lavorare? Fornisci l'URL del file (e la pagina specifica, se ce n'è una).

**Domanda 2 — User Story**
Elenca le user story da disegnare. Per ognuna fornisci:
- Numero (es. US#01)
- Titolo breve
- Descrizione narrativa del flusso: chi fa cosa, in quale contesto, step per step
- Ruolo/i coinvolti (vedi lista sotto)

**Domanda 3 — Lingua**
In che lingua vanno scritti tutti i testi del canvas? (italiano / inglese / altra)

**Domanda 4 — Prototipo HTML** *(opzionale ma molto utile)*
Hai un prototipo HTML che implementa questo flusso? Se sì, fornisci il percorso del file (es. `prototipi/03-inventory/index.html`) oppure aprilo nel browser e condividi l'URL locale. Lo userò per navigare il flusso reale, capire gli stati UI, i dati mostrati e le interazioni prima di costruire le schermate.

**Domanda 5 — Diagramma di flusso** *(opzionale)*
Hai un diagramma di flusso (Figma, FigJam, immagine, o testo strutturato) che descrive la logica del flusso con branch, condizioni e percorsi alternativi? Se sì, condividi l'URL o il percorso. Lo userò per identificare tutti i path da raccontare (happy path + eccezioni).

**Ruoli supportati da Gravity:**
| Ruolo | Colore label |
|-------|-------------|
| Tenant Admin | blu `#1677FF` |
| Inventory Manager | cyan `#13C2C2` |
| Sales | arancione `#FF4A1C` |
| Operation Manager | verde `#52C41A` |
| Planner | viola `#722ED1` |

Se una US coinvolge più ruoli in sequenza, specificalo — la label cambia a ogni cambio di ruolo nel flusso.

Aspetta le risposte prima di procedere.

---

## FASE 2 — Esplorazione delle fonti disponibili

Carica obbligatoriamente la skill `figma:figma-use` prima di qualsiasi chiamata `use_figma`.

Esplora **tutte le fonti disponibili in parallelo** prima di pianificare qualsiasi cosa.

### 2a. Mappa i template nel file Figma
1. Usa `get_metadata` sulla root del file di destinazione (node `0:1`) per vedere la struttura di pagine e sezioni
2. Per ogni pagina o sezione che contiene template di schermata, fai `get_metadata` per listare i frame disponibili
3. Costruisci una mappa: nome frame → cosa rappresenta (es. "Inventory List", "Space Detail Drawer", "Create Campaign Modal")
4. Fai `get_design_context` sui frame rilevanti per le US in analisi, per capirne il contenuto e gli stati UI disponibili

### 2b. Esplora il prototipo HTML (se fornito)
Se l'utente ha fornito un prototipo HTML:
- Leggi il file con `Read` per capire la struttura dei componenti e gli stati UI implementati
- Usa il browser via Playwright (`mcp__playwright__browser_navigate` + `browser_snapshot`) per navigare il prototipo interattivo:
  - Percorri l'happy path della US click by click
  - Prendi screenshot di ogni stato rilevante (pagina iniziale, form vuoto, form compilato, conferma, errore)
  - Esplora anche i percorsi alternativi e gli stati di errore
- Usa questi screenshot come **riferimento visivo diretto** per capire esattamente cosa mostrare in ogni schermata del flusso
- Confronta i dati mostrati nel prototipo con quelli da usare nelle schermate Figma

### 2c. Consulta il diagramma di flusso (se fornito)
Se l'utente ha fornito un diagramma di flusso:
- Se è un URL Figma/FigJam: usa `get_design_context` o `get_figjam` per leggerlo
- Se è un'immagine: leggila con `Read` (tool immagini)
- Se è testo strutturato: analizzalo direttamente
- Estrai da esso:
  - Tutti i nodi/stati del flusso (non solo l'happy path)
  - Le condizioni di branching ("SE utente ha permesso X", "SE slot disponibile", ecc.)
  - I percorsi di errore e le eccezioni esplicite
  - I punti di cambio ruolo
- Usa il diagramma come **mappa autoritativa** del flusso — se c'è contraddizione tra la descrizione narrativa e il diagramma, chiedi chiarimento all'utente

**Non procedere alla costruzione finché non hai una comprensione chiara del flusso da tutte le fonti disponibili.**

---

## FASE 3 — Pianificazione dei flussi

Per ogni User Story, prima di toccare il canvas, pianifica:

1. **Sequenza di schermate**: quali template corrispondono a ogni step della US?
   - Abbina ogni passo della descrizione narrativa a un template di schermata esistente
   - Se uno step richiede uno stato diverso dello stesso template (es. form vuoto vs form compilato, lista vuota vs lista con dati), pianifica di duplicare il template e modificarlo
   - Se nessun template corrisponde a uno step, segnalalo all'utente e usa il template più vicino come base

2. **Modifiche necessarie per ogni schermata**: cosa va cambiato nel template per raccontare quello specifico step?
   - Testi (titoli, label, dati, messaggi di stato)
   - Stato UI (loading, empty state, error, success, filled form, ecc.)
   - Elementi visibili/nascosti (modal aperta, drawer aperto, badge, tooltip, ecc.)
   - Dati di esempio coerenti con il contesto della US

3. **Cambio di ruolo** (se presente): a quale schermata cambia il protagonista?

---

## FASE 4 — Costruzione del canvas

### Template di riferimento per la Section
- **File template:** `tMW8bcBYHSeJ9WyWzZqojL`
- **Section node:** `1:16803` (nome `US#00`)
- Struttura:
  - `1:16804` — frame `US + User` (pannello sinistro)
    - `1:16805` — istanza `Label` (striscia verticale colorata)
    - `1:16806` — frame `User` (ruolo + avatar in basso)
      - `1:16807` — rettangolo sfondo
      - `1:16808` — testo nome ruolo
      - `1:16809` — istanza `Avatar Gravity`
    - `1:16810` — testo US numero + titolo
    - `1:43729` — testo descrizione narrativa
  - `1:43730..1:45553` — frame placeholder Screen 1–4 (da sostituire con le schermate reali)

### Per ogni User Story:

**4a. Crea la Section**
- Crea una nuova Section nel file di destinazione
- Nome: `US#NN — Titolo` (es. `US#01 — Visualizza inventario spazi`)
- Disponi le sections **in verticale** con gap 200px tra l'una e l'altra

**4b. Compila il pannello sinistro (US + User)**
Duplica la struttura `1:16804` dal template e aggiorna:
- `1:16810` → `US#NN` + titolo breve (nella lingua scelta)
- `1:43729` → descrizione narrativa del flusso (nella lingua scelta)
- `1:16808` → nome del ruolo primario
- `1:16807` → fill con il colore del ruolo (vedi mappatura)
- `1:16805` → fill della Label con il colore del ruolo
- Testo `1:16808` → bianco `#FFFFFF`
- `1:16809` → avatar del ruolo (cerca nella libreria `uR6CBOh0Y7dUQvH30SyD0P`; fallback: Avatar Ant Design con iniziali del ruolo)

**Mappatura ruolo → colore:**
```
Tenant Admin      → #1677FF
Inventory Manager → #13C2C2
Sales             → #FF4A1C
Operation Manager → #52C41A
Planner           → #722ED1
```

**4c. Costruisci il flusso principale (sunny case) — Riga 1**

Il sunny case è sempre la **prima riga orizzontale** della Section, quella che racconta l'happy path dall'inizio alla fine.

Per ogni step del sunny case:
1. **Duplica** il template di schermata corrispondente dal file
2. **Rinomina** con il formato: `RuoloAttivo: NomeSchermata` (es. `Inventory Manager: Lista Spazi`)
3. **Modifica** per rappresentare lo step specifico (testi, stato UI, dati di esempio)
4. **Posiziona** da sinistra a destra con gap ~80px tra le schermate
5. **Aggiungi frecce** (`→`) tra le schermate, con etichetta dell'azione che le collega
6. **Post-it gialli** sopra ogni schermata per regole di business rilevanti a quello step

**4d. Costruisci ogni edge case — Righe successive (verticale)**

Ogni edge case occupa una **riga orizzontale dedicata**, posizionata sotto la riga precedente con gap di 160px.

Per ogni edge case:
1. **Aggiungi un'etichetta di riga** sul lato sinistro, appena prima delle schermate, con:
   - Sfondo colorato `#FF4A1C` (rosso accento Gravity)
   - Testo bianco: nome dell'edge case in maiuscolo (es. `CREDENZIALI ERRATE`)
   - Dimensioni: ~240px × 80px, posizionato in verticale a fianco delle schermate
2. **Replica le schermate necessarie** per raccontare il flusso completo di quell'edge case:
   - **Non scrivere solo il nome dell'eccezione** — mostra visivamente ogni step con le schermate reali duplicate e modificate
   - Includi sempre la schermata di partenza del branch (anche se è la stessa del sunny case) per mantenere leggibilità autonoma di ogni riga
   - Se il path non ha una schermata UI (es. redirect automatico), crea un frame placeholder `[→ Redirect automatico]` con sfondo neutro e testo descrittivo
3. **Posiziona le schermate** da sinistra a destra nella riga, con lo stesso gap del sunny case (~80px)
4. **Frecce** tra le schermate dell'edge case con etichette che spiegano la condizione (es. "SE 1 tenant")
5. **Post-it** sopra le schermate dell'edge case per le condizioni che attivano quel path

**Gap verticale tra righe:** 160px misurato tra il bordo inferiore dell'ultima schermata di una riga e il bordo superiore della prima della riga successiva.

**Ordine consigliato delle righe:**
1. Sunny case (happy path completo)
2. Edge case principale / errore più frequente
3. Edge case secondari in ordine di probabilità/importanza
4. Edge case "non accade UI" (es. redirect automatici) per ultimi

**4e. Cambio di ruolo (se presente)**
Quando il flusso passa da un ruolo all'altro:
- Aggiorna il frame `User` nel pannello sinistro per mostrare il nuovo ruolo (o crea una versione parallela)
- Aggiungi un Post-it esplicativo al punto di transizione: "Cambio ruolo: da [RuoloA] a [RuoloB]"
- Cambia il colore della Label per il segmento successivo del flusso

**4f. Annotazioni (Post-it)**
Aggiungi Post-it gialli (`#FFF7CD`) per:
- Regole di business importanti ("SE E SOLO SE...")
- Condizioni che determinano quale path prendere
- Vincoli tecnici o di ruolo da comunicare allo sviluppatore

Posiziona ogni Post-it **sopra** la schermata a cui si riferisce, con gap di ~20px dal bordo superiore dello schermo.

---

## FASE 5 — Validazione

Dopo aver costruito ogni Section:
1. Screenshot del pannello `US + User` — verifica label colore, testo ruolo, avatar
2. Screenshot panoramico della Section — verifica sequenza schermate, frecce, post-it
3. Controlla che ogni schermata sia leggibile e racconta chiaramente quello step

Al termine di tutte le Sections:
1. Riporta all'utente:
   - Elenco sections create (con node ID e URL diretto)
   - Quali template di schermata hai usato e duplicato
   - Eventuali step per cui non hai trovato un template corrispondente (con proposta di soluzione)
   - Eventuali modifiche significative applicate ai template

---

## Note operative

- **Non usare i placeholder Screen 1–4 del template**: quei frame vanno sostituiti con le schermate reali duplicate dai template del file.
- **Lingua**: tutti i testi (titoli US, descrizioni, label ruolo, nomi schermate, post-it) devono essere nella lingua scelta — non mescolare.
- **Fedeltà al template**: quando duplichi e modifichi un template di schermata, mantieni la struttura e i componenti originali — modifica solo i contenuti necessari per la narrazione.
- **Dati di esempio**: usa dati realistici e coerenti con il dominio OOH/DOOH di Gravity (nomi di spazi pubblicitari, campagne, locazioni, date, budget, ecc.).
- **Non inventare componenti**: usa solo componenti e template già presenti nel file. Se manca qualcosa, segnalalo e usa il più vicino disponibile.
