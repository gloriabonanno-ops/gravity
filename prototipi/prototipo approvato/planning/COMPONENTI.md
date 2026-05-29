# Mappa componenti — Planning Redesign

Analisi di tutti i componenti usati nel prototipo `planning-redesign/index.html`
rispetto alla libreria Ant Design System for Gravity.

---

## Componenti Ant Design standard

Questi componenti sono usati direttamente dal CDN `antd` senza modifiche
e hanno un corrispondente diretto nella libreria Figma.

| Componente | Props principali usate | Figma |
|---|---|---|
| `ConfigProvider` | theme | — wrapper, non si disegna |
| `App` | — | — wrapper, non si disegna |
| `Menu` | mode=horizontal, selectedKeys, items, theme=light | `*Menu*` Mode=Horizontal |
| `Dropdown` | menu, trigger | `*Dropdown*` |
| `Table` | dataSource, columns, rowKey, size, onRow | `*Table*` + `*Table Header Cell*` + `*Table Body Cell*` |
| `Card` | base | `*Card*` |
| `Tag` | color, style | `*Tag*` |
| `Badge` | status, text | `*Badge*` |
| `Avatar` | size, shape | `*Avatar*` |
| `Progress` | percent, strokeColor, size | `*Progress*` Type=Line |
| `Form` | base | `*Form Item*` |
| `Input` | placeholder, size, value, onChange | `*Input*` |
| `InputNumber` | min, max, step, formatter, parser | `*InputNumber*` |
| `Select` | placeholder, showSearch, options, optionRender | `*Select*` |
| `Checkbox` | checked, indeterminate | `*Checkbox*` |
| `Switch` | size, checked | `*Switch*` |
| `DatePicker` | base | `*DatePicker*` |
| `Slider` | base | `*Slider*` |
| `Button` | type, size, icon, danger, loading, shape | `*Button*` |
| `Tooltip` | title, placement | `*Tooltip*` |
| `Popover` | content, trigger, placement, open | `*Popover*` |
| `Popconfirm` | title, okText, cancelText, onConfirm | `*Popconfirm*` |
| `Modal` | open, footer, width | `*Modal*` |
| `Alert` | type, showIcon, message, description, closable | `*Alert*` |
| `Empty` | base | `*Empty*` |
| `Drawer` | base | `*Drawer*` |
| `Divider` | orizzontale | `*Divider Horizontal*` |
| `Space` | gap, direction | Frame con Auto Layout |
| `Typography.Title` | level | `*Title*` |
| `Typography.Text` | type | `*Text*` |
| `Typography.Paragraph` | base | `*Paragraph*` |

---

## Componenti custom — Gruppo 1: mappabili su Ant Design

Questi componenti sono definiti nel file ma sono wrapper sottili
di un componente Ant Design standard. In Figma si usano i componenti
corrispondenti senza creare nulla di nuovo.

### `AdvertiserAvatar`
Mostra il logo dell'inserzionista se disponibile, altrimenti le iniziali
su sfondo colorato. Internamente usa `Avatar`.

→ **Figma:** `*Avatar*` con `Type=Image` (logo) oppure `Type=Text` (iniziali)

---

### `CategoryTag`
`Tag` con colore predefinito per OOH (verde) e DOOH (magenta).

→ **Figma:** `*Tag*` — Color=Success per OOH, Color=Error per DOOH

---

### `ChannelChip`
Etichetta inline con dot colorato e testo del canale.
Stilisticamente identica a un `Tag` con colore.

→ **Figma:** `*Tag*` — Color=Success per OOH, Color=Error per DOOH

---

### `StateBadge`
Dot colorato 7px + testo dello stato (Bozza / In trattativa / Confermata).
Usa un `span` custom, non il componente `Badge`.

→ **Figma:** `*Badge*` — Type=Dot + status appropriato

| Stato | Badge status |
|---|---|
| Bozza | Default |
| In trattativa | Processing |
| Confermata | Success |

---

### `AvailDot`
Dot colorato 6px + testo disponibilità (Available / In Option / Reserved).
Struttura identica a `StateBadge`.

→ **Figma:** `*Badge*` — Type=Dot + status appropriato

| Disponibilità | Badge status |
|---|---|
| Available | Success |
| In Option | Warning |
| Reserved | Error |

---

## Componenti custom — Gruppo 2: composizioni di Ant Design

Questi componenti assemblano più componenti Ant Design standard
in un layout specifico. Non esiste un corrispondente singolo nella libreria,
ma si costruiscono in Figma usando i componenti esistenti dentro una frame.

### `TopNav`
Navbar principale dell'applicazione. Contiene:
- Logo Gravity (`Gravity_type.svg`)
- `Menu` orizzontale con voci Panoramica / Inventario / Espletamento
- Campanella notifiche (bottone nativo con `BellOutlined`)
- Avatar utente con `Popover` che mostra profilo planner e canali

→ **Figma:** già documentato in `components/navbar.md`.
Usare il componente Navbar custom Gravity — non Ant Design puro.

---

### `FilterPanel`
Pannello filtri per la vista selezione spazi. Contiene:
- `Checkbox.Group` per stato disponibilità
- `Checkbox.Group` per tipo impianto (suddivisi per categoria)
- `Slider` per fascia di prezzo
- `Select` per formato
- `Switch` per filtrare per brief

→ **Figma:** frame sidebar verticale con componenti standard.
Nessun componente Figma nuovo necessario — assemblare da libreria.

---

### `PlanningHeaderNR`
Header della schermata di dettaglio pianificazione. Contiene:
- Freccia indietro (`Button` type=text)
- Nome e metadati della pianificazione (`Title`, `Tag`, `Badge`)
- Bottone "Consegna in trattativa" con stato dinamico
- `Popover` per collegare a una trattativa (`Select` interno)
- `Modal` per mostrare le modifiche rispetto all'ultima consegna

→ **Figma:** frame header orizzontale con componenti standard.
Lo stato del bottone consegna va rappresentato in varianti separate.

---

### `DataCard`
Card informativa con icona, label, valore principale e valore secondario.
Internamente è un `div` custom, non usa `Card` di Ant Design.
Ha la stessa struttura del componente **System Card** già presente nel DS Gravity.

→ **Figma:** verificare se `System Card` nel DS Gravity copre questo caso.
Se sì, usarlo direttamente. Altrimenti creare una variante.

---

### `AudienceModal`
Modale con profilo audience dell'inserzionista. Usa `Modal` come wrapper
e al suo interno assembla: `Avatar`, `Tag`, `Title`, `Text`, `Paragraph`,
barre di genere/età custom (div con width percentuale inline).

→ **Figma:** `*Modal*` con body custom.
Le barre genere/età sono frame con Auto Layout — non `Progress`.

---

### `KpiModal`
Modale con KPI obiettivo della pianificazione. Usa `Modal` come wrapper
e al suo interno: `Tag`, `Progress`, `Popover`, `Text`.

→ **Figma:** `*Modal*` con body custom.
Usare `*Progress*` Type=Line per le barre KPI.

---

### `BriefPanelNR`
Pannello laterale del brief. Contiene zona geografica, POI, tipologie
richieste, trattativa collegata. Usa `Button`, `Tag`, `Input`, `Select`,
`Switch`, `Divider`.

→ **Figma:** frame pannello laterale con componenti standard.
Nessun componente Figma nuovo necessario.

---

## Componenti custom — Gruppo 3: richiedono un componente Figma nuovo

Questi componenti non hanno equivalenti in Ant Design e non si possono
costruire assemblando componenti esistenti. Vanno disegnati come
componenti nuovi nella libreria Figma.

### `SvgMap`
Mappa SVG statica (100×62px viewBox) che mostra una griglia urbana
con edifici, strade e pin colorati per stato disponibilità.
È un elemento di preview nell'elenco pianificazioni — non una mappa interattiva.

**Struttura interna:**
- Rettangolo di sfondo grigio-blu (#E3EBF3)
- Blocchi edifici (#F0EFEB)
- Strade orizzontali e verticali (rettangoli bianchi)
- Pin cerchio con ombra — colore per stato (verde/viola/giallo)
- Badge totale spazi in alto a sinistra

→ **Figma:** componente nuovo `*Map Preview*`.
Disegnare come frame SVG statica con varianti per densità pin.

---

### `MiniCalendar`
Calendario a griglia con navigazione mese precedente/successivo.
Evidenzia il range di date della pianificazione con sfondo colorato.
Non usa il `DatePicker` di Ant Design — è reimplementato da zero.

**Struttura interna:**
- Header: frecce navigazione + nome mese/anno
- Griglia 7 colonne: label giorni della settimana + celle giorno
- Celle in-range: sfondo primary (#3E00FB), testo bianco
- Footer: data inizio/fine oppure tipo di vendita

→ **Figma:** componente nuovo `*Mini Calendar*`.
Disegnare con stati: default, in-range, today, outside-month.

---

### `PlanningsList`
Lista delle pianificazioni divisa in tre sezioni (Bozze / In trattativa /
Confermate). Ogni riga contiene: avatar inserzionista, nome pianificazione,
CategoryTag, StateBadge, date, budget, numero facce, assegnatario,
SvgMap in miniatura, MiniCalendar in miniatura.

Non è una `Table` Ant Design — è un layout a righe con componenti eterogenei.

**Struttura di ogni riga:**
- Colonna sx: `AdvertiserAvatar` + nome + metadati
- Colonna centrale: date + budget + facce + assignee
- Colonna dx: `SvgMap` + `MiniCalendar`
- Header di sezione con contatore

→ **Figma:** componente nuovo `*Planning Row*` + frame sezione.
Varianti per stato: Bozza / In trattativa / Confermata.

---

### `SelectSystems`
Componente principale della schermata di selezione spazi. Orchestra:
- Barra di ricerca con input indirizzo e suggerimenti
- Mappa Leaflet interattiva (libreria esterna, non Ant Design)
- Lista risultati con `Table` filtrabile
- `FilterPanel` laterale
- Selezione facce con `Checkbox`
- Contatori facce selezionate in tempo reale

È il componente più complesso del prototipo. La mappa Leaflet
non ha equivalente in Figma — va rappresentata come frame statica.

→ **Figma:** frame di schermata completa con layout a tre colonne
(filtri | mappa | tabella risultati). La mappa va disegnata come
immagine/frame statica con pin. Nessun componente singolo —
è una schermata intera.

---

## Riepilogo

| Gruppo | Componenti | Lavoro Figma |
|---|---|---|
| Ant Design standard | 30 | Già in libreria |
| Custom → mappabili su Ant Design | 5 | Usare componenti esistenti |
| Custom → composizioni | 7 | Assemblare da libreria, nessun nuovo componente |
| Custom → richiedono componente nuovo | 4 | **Disegnare da zero** |

**Componenti nuovi da creare in Figma:**
1. `*Map Preview*` — thumbnail SVG mappa con pin
2. `*Mini Calendar*` — griglia calendario con range evidenziato
3. `*Planning Row*` — riga lista pianificazione con varianti di stato
4. Schermata `SelectSystems` — layout a tre colonne (non è un componente singolo)
