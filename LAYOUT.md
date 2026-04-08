# Gravity — Layout & Struttura File Figma

> Documentazione estratta direttamente dai file Figma di Gravity.
> Leggi questo file insieme a CLAUDE.md prima di costruire qualsiasi prototipo.

---

## 1. Struttura dei file Figma

### Organizzazione delle pagine

Ogni pagina Figma corrisponde a un **modulo funzionale** della piattaforma.
Il nome della pagina segue il pattern: `⭐️ (A) NomeModuloA / (B) NomeModuloB`

Esempio: `⭐️ (A) Grants / (B) Authorizations`

### Struttura gerarchica dentro ogni pagina

```
PAGE  →  Modulo
  SECTION  →  Sub-modulo (es. "A - Grants")
    SECTION  →  User Story (es. "US#A1")
      frame  →  "US + User"     ← descrizione US + ruolo utente
      symbol / frame  →  Schermata 1 (stato base)
      frame  →  Schermata 2 (stato variante)
      frame  →  Schermata 3 (stato finale)
      instance  →  Arrow        ← freccia di flusso tra schermate
      instance  →  Post-it      ← nota di design
      instance  →  Manina       ← puntatore su elemento interattivo
```

### Layer type convention

| Tipo layer Figma | Significato |
|-----------------|-------------|
| `symbol`        | Schermata **base/riferimento** (stato iniziale della US) |
| `frame`         | Variante costruita sopra la base (mostra la UI dopo un'azione) |
| `instance`      | Istanza di componente della libreria (Arrow, Post-it, Manina, ecc.) |
| `section`       | Raggruppamento logico (US, sub-modulo, pagina) |

### Flusso di lettura

Le schermate dentro ogni US si leggono **da sinistra a destra** seguendo le frecce (Arrow).
Ogni schermata mostra lo stato della UI dopo un'interazione utente.

### Il frame "US + User"

Contiene sempre:
- **Label** (striscia verticale teal con il numero US, es. "A1")
- **Testo US** — storia utente in italiano nel formato:
  `"TITOLO MAIUSCOLO\nCome [ruolo], voglio [azione], così da [valore]."`
- **User** — nome ruolo + Avatar Gravity in basso a sinistra

---

## 2. Naming convention delle schermate

Il nome del frame segue una **gerarchia a slash** che descrive lo stato della UI:

```
[Modulo] [Tipo vista]
[Modulo] [Tipo vista]/[Azione attiva]
[Modulo] [Tipo vista]/[Azione attiva]/[Stato specifico]
[Modulo] [Tipo vista]/[Feedback]
```

### Esempi reali

| Nome frame | Significato |
|-----------|-------------|
| `Grants List` | Lista concessioni — stato neutro |
| `Grants List/New Grant` | Lista + form di creazione aperto |
| `Grants List/New Grant/DocumentTypeActive` | Lista + form + dropdown tipo documento aperto |
| `Grants List/New Grant/ReminderActive` | Lista + form + sezione reminder espansa |
| `Grants List/New Grant/AddNumber` | Lista + form + aggiunta numero utenza |
| `Grants List/New Grant/NoAccountNumbers` | Lista + form senza numeri utenza |
| `Grants List/Toast Message` | Lista dopo azione completata (toast visibile) |
| `Grants List/LeftFixedActions` | Lista con colonne fisse visibili a destra |
| `Grant Detail` | Schermata dettaglio concessione |
| `Grant Detail/EditHover` | Dettaglio + hover su pulsante Edit |
| `Grant Detail/ Edit Grant` | Dettaglio + form modifica aperto |
| `Grant Detail/ Edit Grant Changes` | Dettaglio + form con modifiche pending |
| `Grant Detail/ Connect Systems` | Dettaglio + pannello collegamento sistemi |
| `Grant Detail/ Connect Systems Selected` | Come sopra + selezioni attive |
| `Grant Detail/Message` | Dettaglio dopo azione (toast visibile) |
| `Autorizations List/LeftFixedActions` | Analogo per le autorizzazioni |

### Regola generale
- **Primo segmento** = nome della schermata base (es. `Grants List`, `Grant Detail`)
- **Segmenti successivi** = stato/azione attiva nella UI
- **`/Toast Message`** o **`/Message`** = sempre l'ultimo step di una US

---

## 3. Dimensioni delle schermate

| Tipo schermata | Larghezza | Altezza | Note |
|---------------|-----------|---------|------|
| List view | 1728px | 1117px | Viewport desktop standard |
| Detail view | 1748px | 1117px | Leggermente più larga (pannello laterale) |
| Detail con panel | 1748px | 1168px | Include spazio extra per panel aperto |
| Form panel (drawer) | ~480px | full height | Sempre a destra, overlay sulla lista |

---

## 4. App Shell — Layout principale

> **IMPORTANTE:** Gravity ha **solo una Navbar orizzontale**. Non esiste sidebar verticale.
> Il componente da usare è `* Navbar *` dalla libreria **Ant Design System for Gravity**
> (pagina "Navbar [CUSTOM]", file `uR6CBOh0Y7dUQvH30SyD0P`).

```
┌─────────────────────────────────────────────────────────┐
│  NAVBAR (height: ~73px)                                 │
│  [Logo Gravity]  [Overview] [Inventory] [...]   🔔 👤  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  MAIN CONTENT AREA (full width)                         │
│                                                         │
│  Page Title                      [Primary Action Btn]   │
│  ─────────────────────────────────────────────────────  │
│  [Tab1] [Tab2]                                          │
│                                                         │
│  Total: xxx items                                       │
│                                                         │
│  [TABLE / CONTENT]                                      │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Navbar (`* Navbar *`)
- **Componente libreria:** `* Navbar *` — pagina "Navbar [CUSTOM]" nella libreria Gravity
- **Figma DS:** https://www.figma.com/design/uR6CBOh0Y7dUQvH30SyD0P/Ant-Design-System-for-Gravity?node-id=48-1331
- **Component key (set):** `7d9a0ca68bfd3d9417be55173f174c6e396934b1`
- **Altezza:** 73px
- **Larghezza:** FILL (si estende a tutta la larghezza del frame)
- **Sinistra:** Logo Gravity (solo logotipo tipografico) + voci di navigazione con dropdown
- **Destra:** icona campanella (24px) + avatar utente (32px, circolare)
- **Varianti per ruolo:** Super Admin, Systems Admin, Sales Leader, Planner, Data Analyst, Creative, Advertiser, Commercial, Publisher
- **Non usare** frame custom al posto di questo componente

> Per misure esatte, pattern HTML completo e istruzioni di trasposizione Figma → **`components/navbar.md`**

### Main Content Area
- **Larghezza:** full width (non c'è sidebar — occupa tutto lo spazio sotto la Navbar)
- **Padding:** 24px (horizontal e vertical)
- **Sfondo:** `colorBgLayout` (#F5F5F5)

---

## 5. Pattern di layout — viste disponibili

### 5.1 List View (vista lista)

La vista più comune. Struttura interna:

```
[Page Title]                      [Primary Action Button ▾]
──────────────────────────────────────────────────────────
[Tab Grants] [Tab Authorizations]
Total: xxx items

[TABLE]
  [Col fissa SX: ID, Grant Type]
  [Colonne scrollabili: ...]
  [Colonne fisse DX: State, Actions ...]
```

**Componenti Ant Design usati:**
- `<Typography.Title level={2}>` — titolo pagina
- `<Button type="primary" size="large">` con `<DownOutlined />` — azione principale con split
- `<Tabs type="line">` — sotto il titolo
- `<Table>` con `fixed` columns + scroll orizzontale
- Badge stato: `<Badge status="success" text="Active">` / `<Badge status="error" text="Expired">`
- Azioni riga: `<Button type="text" icon={<MoreOutlined />}>` (tre puntini)

**Figma:** schermata `[Modulo] List`

---

### 5.2 List + Right Drawer (lista + form laterale)

Aperto da un'azione sulla lista (es. "New Grant"). La lista rimane visibile a sinistra, dimmed (~50%), il drawer occupa la metà destra.

```
[Lista dimmed ~50% width]  │  [DRAWER]
                           │  ✕  New Grant          [Save]
                           │  ─────────────────────────
                           │  * Grant Type: ● Public ○ Private
                           │  * Issuing Authority: [input]  VAT: [input]
                           │  * Document Type: [select]  * Doc ID: [input]
                           │  * Signing Date: [datepicker]  Exp Date: [datepicker]
                           │    Reminder: [select]
                           │
                           │  Account Numbers        + Add number
                           │  * Account number: [input]  Tax: [input] €/y  🗑
```

**Componenti Ant Design:**
- `<Drawer placement="right" width="50%">` — contenitore
- Header drawer: `<CloseOutlined />` + titolo + `<Button>Save</Button>`
- `<Form layout="horizontal">` con label a sinistra
- `<Radio.Group>` per Grant Type
- `<Input>`, `<Select>`, `<DatePicker>` per i campi
- `<Button type="link" icon={<PlusOutlined />}>Add number</Button>` — azione ripetibile
- `<Button type="link" danger icon={<DeleteOutlined />}>Remove</Button>`

**Figma:** schermata `[Modulo] List/[ActionName]`

---

### 5.3 List + Left Fixed Panel (filtri/dettaglio laterale sinistro)

Variante della lista dove il pannello sinistro mostra un'entità secondaria (es. "Issuing Authority") mentre la tabella scrolla a destra.

**Figma:** schermata `[Modulo] List/LeftFixedActions`

---

### 5.4 Detail View (vista dettaglio)

Schermata dedicata a una singola entità. Struttura:

```
← [Breadcrumb: Authorizations list]

[Entity Title]  [Tag: Document ID]          [Edit] [Connect Systems ▾]
#0101  Issuing Authority: [value]  Signing Date: [value]  State: ● Active
─────────────────────────────────────────────────────────────────────────

┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ Auth Type    │ │ Expiration   │ │ Duration     │ │ CUP          │
│ Comunale     │ │ 21/01/2031   │ │ 5 years      │ │ 960 €/year   │
└──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘

Connected Systems
Total: 4 systems  [Filter by channel ▾]  [Filter by system type ▾]

┌────────────────┐ ┌────────────────┐ ┌────────────────┐ ┌────────────────┐
│ [System Card]  │ │ [System Card]  │ │ [System Card]  │ │ [System Card]  │
└────────────────┘ └────────────────┘ └────────────────┘ └────────────────┘
```

**Componenti Ant Design:**
- `<Breadcrumb>` con freccia sinistra — navigazione back
- `<Typography.Title level={2}>` + `<Tag>` per l'identificativo
- Metadata bar: `<Descriptions layout="horizontal" size="small" bordered={false}>`
- KPI cards: `<Row gutter={16}><Col span={6}>` con `<Card>` + `<Statistic>`
- Sezione sistemi: titolo + filtri `<Select size="small">` + grid di card

**Figma:** schermata `[Entity] Detail`

---

### 5.5 Detail + Edit Form (dettaglio con modifica inline)

Il dettaglio rimane visibile, un drawer laterale destro o un overlay mostra il form di modifica.

**Figma:** schermata `[Entity] Detail / Edit [Entity]`

---

### 5.6 Detail + Connect Systems (collegamento entità)

Vista per associare sistemi/impianti a una concessione/autorizzazione. Mostra una lista selezionabile di sistemi con checkbox.

**Figma:** schermata `[Entity] Detail / Connect Systems`

---

## 6. Componenti custom Gravity (non Ant Design standard)

Questi componenti sono disegnati da Gloria e presenti nella libreria Figma Gravity:

| Nome componente | Descrizione | Dove appare |
|----------------|-------------|-------------|
| `Avatar Gravity` | Avatar personalizzato del profilo utente | Top bar (destra), US frame |
| `Label` | Striscia verticale teal con numero US | Solo nei frame UX flow (non nella UI finale) |
| `Post-it` | Nota gialla di annotazione | Solo nei frame UX flow |
| `Arrow` | Freccia di flusso tra schermate | Solo nei frame UX flow |
| `Manina` | Icona mano puntatore | Solo nei frame UX flow |
| `Filter Dropdown` | Dropdown filtro colonna tabella | Tables |
| `Search Dropdown` | Input ricerca inline colonna | Tables |
| `multi-select icon` | Icona selezione multipla | Tables |
| `Issuing Authority` | Pannello autorità emittente | Side panels |
| `Table/Grants` | Variante tabella specifica Grants | Module Grants |
| `Table/Authorizations` | Variante tabella specifica Auth | Module Authorizations |

> **Nota:** I componenti custom elencati sopra sono da **ignorare nei prototipi HTML** — usa i componenti Ant Design standard. Usali solo quando trasferisci su Figma.

---

## 7. Colori nella UI (osservati dalle schermate)

| Elemento | Colore | Token |
|---------|--------|-------|
| Top bar background | `#ffffff` | `colorBgContainer` |
| Sidebar background | `#ffffff` | `colorBgContainer` |
| Page background | `#F5F5F5` | `colorBgLayout` |
| Primary button | `#3E00FB` | `colorPrimary` |
| Active nav item | `#3E00FB` + sfondo viola chiaro | `colorPrimary` |
| Tab attivo underline | `#3E00FB` | `colorPrimary` |
| Badge Active | verde `#52C41A` | `colorSuccess` |
| Badge Expired | rosso `#FF4A1C` | `colorError` |
| Table header bg | `#FAFAFA` | `colorFillQuaternary` |
| Tag tipo sistema OOH | `#3E00FB` (outline) | `colorPrimary` |
| Tag tipo sistema DOOH | `#FF4A1C` (outline) | `colorError` |
| KPI card border | `#F0F0F0` | `colorBorderSecondary` |

---

## 8. Tipografia nelle schermate (osservata)

| Elemento | Font | Size | Weight | Figma token |
|---------|------|------|--------|-------------|
| Page title ("Licenses List") | SF Pro Text | 30px | 600 | `Heading/2` (`fontSizeHeading2`) |
| Section title ("Connected Systems") | SF Pro Text | 20px | 600 | `fontSizeXL` |
| Table header cell | SF Pro Text | 14px | 500 | `Base/Normal` |
| Table cell | SF Pro Text | 14px | 400 | `Base/Normal` |
| KPI valore ("5 years") | SF Pro Text | 24px | 600 | `Heading/3` |
| KPI label ("Duration") | SF Pro Text | 14px | 400 | `Base/Normal` |
| Metadata bar | SF Pro Text | 14px | 400 | `Base/Normal` |
| Breadcrumb | SF Pro Text | 14px | 400 | `Base/Normal` |
| Form label | SF Pro Text | 14px | 400 | `Base/Normal` |

---

## 9. Come usare questa documentazione nei prototipi

Quando costruisci un prototipo:

1. **Identifica il pattern** dalla sezione 5 (List, Drawer, Detail, ecc.)
2. **Costruisci l'App Shell** con Top Bar + Sidebar (`<Layout>` Ant Design)
3. **Usa le dimensioni corrette** (il canvas deve essere 1728px wide come viewport)
4. **Segui il naming** per dare nome ai file: `[modulo]-[tipo-vista]` (es. `02-grants-list`)
5. **Quando trasferisci su Figma**, usa il nome schermata della sezione 2 per trovare il frame corretto

---

## 10. Struttura consigliata per i prototipi HTML

```
prototipi/
  01-login-otp/         ← autenticazione
  02-[modulo]-list/     ← lista + tabella
  03-[modulo]-list-drawer/  ← lista + form laterale
  04-[modulo]-detail/   ← dettaglio entità
  05-[modulo]-detail-edit/  ← dettaglio + modifica
```

Ogni prototipo simula **una singola schermata** (uno stato della US), non l'intero flusso.

---

## 11. Modulo Commercial — Strategy Configurator

> Questo modulo copre il flusso operativo della campagna: dalla trattativa alla generazione e condivisione del preventivo.
> Corrisponde alle sezioni PRD: **6.2.3 Strategie**, **6.2.4 Preventivi**, **6.2.7 Pianificazioni Spazi**.
> File Figma: pagina `⭐️ Strategy configurator`

---

### 11.1 Flusso completo

```
Negotiations List
  └─ [+ New Negotiation] → New Negotiation/Drawer (form laterale)
       └─ [Save] → Toast message → torna alla lista (state: Active)
  └─ [Create Strategy] → Wizard/Strategy (modal 4 step)
       └─ [Finish] → Strategy Detail / Campaigns Strategy Configurator
            ├─ [+ Add Campaign] → campaign card per canale
            │    └─ [Request Planning] → Planning / Sales View (Delivery tab)
            │         └─ planner assegna spazi → Planning Brief/FilledMap
            ├─ [Generate Documents] → Documents Modal (Generate Quote)
            │    └─ [Generate] → Quote Editor / Set Prices and Discounts
            │         └─ [Save] → Sales: Quote Detail/Card
            │              ├─ [Share] → Documents Modal con link OTP
            │              │    └─ Guest riceve email → OTP Insert → Guest: Quote Detail/Card
            │              │         └─ [Sign Contract] → OTP confirm → preventivo accettato
            │              └─ [Sign Contract] (manuale Sales)
            └─ [Documents Modal / Update Quote] → versione aggiornata del preventivo
```

---

### 11.2 Negotiations List

**Figma:** `Negotiations/Table`
**Canvas:** 1728×1117px — App Shell standard

```
[Negotiations List]                [date range picker]     [+ New Negotiation]
────────────────────────────────────────────────────────────────────────────
┌──────────┐  ┌──────────┐  ┌──────────┐
│ ● Active │  │ ✓ Won    │  │ × Lost   │
│    65    │  │    43    │  │    11    │
│Go to Pr. │  │Go to Pr. │  │Go to Pr. │
└──────────┘  └──────────┘  └──────────┘

Showing 10 of 519 negotiations

[TABLE]
  Col. fissa SX: Negotiation (sort + filter), Budget (sort + filter)
  Col. scrollabili: Contact, Advertiser, Creation Date, Last Update
  Col. fissa DX: State (badge), Strategy (button CTA), Actions (...)
```

**KPI cards:** 3 colonne (Active / Won / Lost), ognuna con contatore e link "Go to Profile".

**Colonna Strategy:** CTA contestuale —
- `Create Strategy` (button primary) → se nessuna strategia ancora creata
- `View Strategy` (button default) → se la strategia esiste già

**Filtri tabella:** date range picker nell'header, filtri per colonna (Budget sort, Contact search, State filter), multi-select per azioni batch.

**Componenti Ant Design:**
- `<Typography.Title level={2}>` — titolo "Negotiations List"
- `<RangePicker>` — date range filter nell'header
- `<Button type="primary">+ New Negotiation</Button>`
- `<Card>` × 3 — KPI Active/Won/Lost con `<Statistic>`
- `<Table>` con `fixed` columns, `scroll={{ x: true }}`
- `<Badge status="success|error|default" text="Active|Won|Lost">`
- `<Button type="primary" icon={<PlusOutlined />}>Create Strategy</Button>`
- `<Button>View Strategy</Button>`
- `<Button type="text" icon={<MoreOutlined />}>` — azioni riga

---

### 11.3 New Negotiation/Drawer

**Figma:** `New Negotiation/Drawer`
**Canvas:** 1728×1117px — lista dimmed a sinistra + drawer destra

```
[Lista dimmed ~50%]  │  ✕  New Negotiation                    [Save]
                     │  ─────────────────────────────────────────────
                     │  * Contact:  ● Existent  ○ New
                     │             [Select an Advertiser's Contact ▾]
                     │  * Negotiation Name: [input]
                     │    Budget:           [input €]
                     │    Note:             [textarea 400 chars]
```

**Varianti del drawer:**
- `New Negotiation/Drawer` → stato base
- `New Negotiation/Drawer/Advertiser Select` → dropdown select aperto (lista contatti advertiser)
- `New Contact` → form creazione nuovo contatto inline nel drawer
- `New Negotiation/Drawer` (step successivi) → validazione / feedback

**Nota design:** il budget inserito nel form si auto-popola nel campo budget della strategia successiva e lo blocca (non rieditable dalla strategia).

**Componenti Ant Design:**
- `<Drawer placement="right" width="50%">`
- `<Form layout="horizontal">`
- `<Radio.Group>` — Contact: Existent / New
- `<Select showSearch>` — Advertiser's Contact
- `<Input>` — Negotiation Name
- `<InputNumber addonAfter="€">` — Budget
- `<Input.TextArea maxLength={400} showCount>` — Note

---

### 11.4 Wizard/Strategy (Modal 4 step)

**Figma:** `Wizard/Strategy` (frames multipli, uno per step)
**Canvas:** 1728×1543px — modale centrata sopra la Negotiations List (overlay)

**Step 1 — Channel:**
```
Choose Channel
Scegli il canale che preferisci

☐ OOH (Out Of Home)
☐ DOOH (Digital Out Of Home)
☐ Web
☐ Advertorial
                        [Cancel]  [Next →]
```

**Step 2 — Goal:** selezione obiettivo campagna (Brand Awareness, Lead Generation, ecc.)

**Step 3 — Target:** demografici (Gender, Age groups, Jobs, Interests)

**Step 4 — Budget:** allocazione budget per canale selezionato

**Componenti Ant Design:**
- `<Modal width={640}>` con overlay sulla lista
- `<Steps current={0} items={[Channel, Goal, Target, Budget]}>`
- `<Checkbox.Group>` — selezione canali multipli (step 1)
- `<Radio.Group>` o card selezionabili — Goal (step 2)
- `<Select multiple>` × n — Target campi (step 3)
- `<InputNumber addonAfter="€">` × n canali — Budget (step 4)
- `<Button>Cancel</Button>` + `<Button type="primary">Next</Button>`

---

### 11.5 Strategy Detail / Campaigns Strategy Configurator

**Figma:** `Strategy Detail/Full` e `Strategy Detail/No Campaigns`
**Canvas:** 1728×1455px (taller per contenuto)

```
← Negotiation list

Campaigns Strategy Configurator              [✎ Edit]  [⊕ Generate Documents ▾]
Negotiation: [nome]   State: ● Active   Total Budget: €6.450,00
────────────────────────────────────────────────────────────────────────────────

┌─────────────────┐  ┌──────────────────────────────┐  ┌────────────────────┐
│ Channels Dist.  │  │ Advertiser                   │  │ Goal               │
│   [Donut 4ch]   │  │ 🍣 Gohan Sushi               │  │ Brand Awareness    │
│ OOH ●  4.000€   │  │ → Go to profile              │  │ ○ Dashboard        │
│ DOOH ●  1.000€  │  └──────────────────────────────┘  └────────────────────┘
│ Web ●  1.000€   │  ┌──────────────────────────────────────────────────────┐
│ Adv. ●  450€    │  │ Target                                               │
└─────────────────┘  │ Gender: [Male] [Female]    Age: [25-34][35-44][45-54]│
                     │ Jobs: [Manager][Freelance][Teacher][Student]          │
                     │ Interests: [Technology][Business][Innovation]...      │
                     └──────────────────────────────────────────────────────┘

[OOH] [DOOH] [Web] [Advertorial]

OOH Strategy
Allocated Budget: 4.000,00€   Added campaigns: 6         [+ Add Campaign]

┌──────────────────────┐  ┌──────────────────────┐  ┌──────────────────────┐
│ ADV Palermo Nat. 2025│  │ ADV Palermo Ann. 2025│  │ ADV Palermo Nat. 2025│
│ 📅 01/11 – 15/11  [Standard]│  │ 📅 01/11 – 15/11  [Long Term]│  │...          │
│ Budget: 4.000€ (100%)│  │ Budget: 1.000€ (40%) │  │                      │
│ Subjects Changes: 1  │  │ Subjects Changes: 4  │  │                      │
│ Graphic Costs: Incl. │  │ Graphic Costs: N/I   │  │                      │
│ Print Costs: Incl.   │  │ Print Costs: Incl.   │  │                      │
│ [Choose formats] [Request Planning]│  │ [Choose formats] [🌐 Planning Added]│  │...│
└──────────────────────┘  └──────────────────────┘  └──────────────────────┘
```

**Stato campagna (CTA sulla card):**
| CTA | Significato |
|-----|-------------|
| `Choose formats` (disabled) | nessun formato selezionato |
| `Request Planning` | formati scelti, planning non ancora richiesto |
| `Planning Added` (green) | planning già richiesto/assegnato |

**Varianti:**
- `Strategy Detail/No Campaigns` → tab vuota, empty state con CTA "+ Add Campaign"
- `Strategy/New Campaign Modal` → modale creazione nuova campagna sopra il detail
- `Strategy/Campaign/Create Planning/Confirm` → modal conferma creazione planning

**Componenti Ant Design:**
- `<Breadcrumb>` — breadcrumb back con `<LeftOutlined />`
- `<Button icon={<EditOutlined />}>Edit</Button>` + `<Button type="primary" icon={<FileAddOutlined />}>Generate Documents</Button>`
- `<Row gutter={16}>` — grid a 3 colonne per Channels/Advertiser/Goal
- Donut chart: libreria custom o `<Progress type="circle">` multi-segmento
- `<Tag>` × n — Gender, Age, Jobs, Interests (target tags)
- `<Tabs type="line">` — OOH / DOOH / Web / Advertorial
- `<Card>` × n per campagna (grid 3 col, `<Row gutter={[16,16]}>`)
- `<Tag color="blue">Standard</Tag>` / `<Tag color="orange">Long Term</Tag>`
- `<Button disabled>Choose formats</Button>` / `<Button icon={<TeamOutlined />}>Request Planning</Button>` / `<Button type="primary" icon={<CheckOutlined />} style={{background:'#52C41A'}}>Planning Added</Button>`

---

### 11.6 Planning / Sales View

**Figma:** `Planning/Sales View` (tab Delivery dell'App Shell)
**Canvas:** 1728×1117px

```
← Back to Campaigns Strategy Configurator

Planning  |  ADV Palermo Natale 2025  [OOH]          [○ Comments ①]
#0101   Creation Date: 12/06/2025   Campaign: ADV Palermo Natale 2025   State: ● Draft
────────────────────────────────────────────────────────────────────────────────────────

┌────────────────────┐  ┌─────────────────────────────────────────────────────┐
│ Advertiser         │  │                                                      │
│ 🍣 Gohan Sushi     │  │          🧑‍🚀 There's nothing here!                    │
│ → Go to profile    │  │  This planning will soon be handled by a planner.   │
├────────────────────┤  │              Please wait.                            │
│ Budget             │  │                                                      │
│ € 1.567,00         │  └─────────────────────────────────────────────────────┘
├────────────────────┤
│ Goal               │
│ 1.000.000          │
├────────────────────┤
│ Exposure Period    │
│ [Calendario]       │
│ Start – End        │
└────────────────────┘
```

**Varianti:**
- `Planning Brief/Empty` → stato "In attesa di planner" (astronauta + messaggio)
- `Planning Brief/FilledMap` → mappa con spazi assegnati dal planner
- `Planning/Sales View/Comments` → drawer commenti aperto a destra (badge con contatore)

**Nota:** questo è il confine tra Commercial e Delivery. La schermata è visibile in entrambi i moduli (top bar mostra entrambi i tab attivabili).

**Componenti Ant Design:**
- `<Breadcrumb>` con `<LeftOutlined />` — back al configuratore
- `<Typography.Title level={2}>` — "Planning"
- `<Tag>` — canale (OOH verde, DOOH rosso/orange)
- `<Button icon={<CommentOutlined />}>Comments</Button>` con `<Badge count={1}>`
- `<Descriptions>` — metadata (#ID, Creation Date, Campaign, State)
- Left panel: `<Card>` × 4 (Advertiser, Budget, Goal, Exposure Period)
- `<Calendar>` — con highlight del range di esposizione
- Empty state: `<Empty>` con immagine custom (astronauta Gravity)
- Mappa (FilledMap): componente mappa custom (non Ant Design)

---

### 11.7 Quote Editor — Set Prices and Discounts

**Figma:** `Quote Editor/OOH`, `Quote Editor/DOOH`, `Quote Editor/Web`, `Quote Editor/Advertorial`
**Canvas:** 1728×1542px

```
← Strategy | Preventivo Gohan Sushi

Set Prices and Discounts                                    [View] [💾 Save]
#0101   Last Updated: 14/04/2025   Advertiser: Gohan Sushi   Total Budget: 7.000,00€
────────────────────────────────────────────────────────────────────────────────────────

[OOH] [DOOH] [Web] [Advertorial]

▾ Gohan Sushi Promo Luglio   14/04/2025 – 28/04/2025          €1500,00   10 elements  ↗

[TABLE]
 ID | Item              | Type        | Format            | Address    | Discount | Price
 01 | Pensilina_LPA01   | Front Screen| ■ Pensilina       | Piazza de… | -18%     | 1.000,00€ ...
 02 | Pensilina_LPA01   | Back Screen | ■ Stendardo       | Via Roma…  | -22%     | 2.000,00€ ...
 ...

▾ Gohan Sushi Promo Dicembre  ...

                                            ┌──────────────────────────────┐
                                            │ Summary                      │
                                            │ OOH                          │
                                            │   Campagna Luglio   €1.875,00│
                                            │   Campagna Dicembre   €600,00│
                                            │ DOOH                 €2.475,00│
                                            │ ...                          │
                                            │ Subtotale            €7.050,00│
                                            │ Sconto              -€1.410,00│
                                            │ IVA (22%)            €1.240,80│
                                            │ Totale              €6.880,80 │
                                            └──────────────────────────────┘
```

**Note tecniche:**
- Le colonne **Discount** e **Price** sono fisse a destra (scroll orizzontale sulla tabella)
- Il campo Discount è editabile inline (click per attivare input)
- Il campo Price si aggiorna automaticamente al cambio discount
- Il summary laterale si aggiorna in tempo reale
- Le campagne sono accordion (`▾` per espandere/collassare)

**Componenti Ant Design:**
- `<Breadcrumb>` — back alla strategia
- `<Button>View</Button>` + `<Button type="primary" icon={<SaveOutlined />}>Save</Button>`
- `<Tabs type="line">` — OOH / DOOH / Web / Advertorial
- `<Collapse>` — accordion per campagna (header con nome, date range, totale)
- `<Table>` — colonne: ID, Item, Type (Tag), Format, Address, Discount (editable), Price
  - `fixed` columns: Discount e Price (destra)
  - `scroll={{ x: true }}`
  - Celle Discount e Price: `<InputNumber>` inline o testo cliccabile
- Right summary: `<Card>` sticky con lista prezzi per canale/campagna + totali
- `<Tag>Front Screen</Tag>` (green) / `<Tag>Back Screen</Tag>` (orange)

---

### 11.8 Documents Modal — Genera / Aggiorna Preventivo

**Figma:** `Documents Modal / Version Quote`, `Documents Modal / Update Quote`
**Pattern:** Modal centrata sopra `Strategy Detail/Full`

```
Documents
Generate and share the quote and contract with the advertiser.

┌────────────────────────────────────────────────────────────┐
│ 📄 Quote    [Version 1 ▾]                                  │
│                                                            │
│ Once the first quote is generated, you can create         │
│ subsequent versions by updating the strategy...           │
│                                                            │
│ [Generate Quote]                                           │
│ [Update Quote]          [View]                             │
│ ─────────────────────────────────────────────────────────  │
│ Generate share link                                        │
│ You can generate a shareable link and choose how long...  │
│ [Expiry: 7 days ▾]   [Generate Link]                      │
│ [https://gravity.app/quote/xxx...]  [Copy Link]            │
└────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────┐
│ 📄 Contract  ...                                           │
└────────────────────────────────────────────────────────────┘
```

**Varianti:**
- `Documents Modal / Version Quote` → prima generazione (pulsante "Generate Quote")
- `Documents Modal / Update Quote` → versione aggiornata con Popover di conferma
- `Strategy Configurator / Generate Quote / Modal` → stessa modal, contesto generazione

**Flusso di versionamento:**
1. Prima generazione → `Generate Quote` → crea versione 1
2. Modifica strategia o prezzi → `Update Quote` → Popover conferma → crea versione 2+
3. `Version selector` (`<Select>`) per tornare a versioni precedenti

**Componenti Ant Design:**
- `<Modal width={520}>` con overlay
- `<Card>` × 2 (Quote + Contract)
- `<Select>` — Version selector (Version 1, Version 2, …)
- `<Button type="primary" block>Generate Quote</Button>`
- `<Button block>Update Quote</Button>` + `<Button block>View</Button>` (in riga)
- `<Divider>` — separatore sezione Share
- `<Select>` — durata link (7 days, 14 days, 30 days)
- `<Button>Generate Link</Button>`
- `<Input readOnly>` — URL generato
- `<Button icon={<CopyOutlined />}>Copy Link</Button>`
- `<Popconfirm>` / `<Popover>` — conferma update versione (con ExclamationCircleOutlined)

---

### 11.9 Sales: Quote Detail/Card

**Figma:** `Sales: Quote Detail/Card`
**Canvas:** 1728×1809px (più alta per contenuto scroll)

```
← Campaigns Strategy Configurator

Quote  |  Gohan Advertising Campaigns 2025         [✎ Edit]  [↗ Share]
Advertiser: Gohan Sushi   Contract term: 14/04 – 15/05/2025   Last Update: 30/12/2025
─────────────────────────────────────────────────────────────────────────────────────────

[OOH] [DOOH] [Web] [Advertorial]

▾ Gohan Sushi Promo Luglio   01/07 – 14/07/2025  [Standard]     Price: €1.875,00  ↗
Total: 8 items   ✎ Subjects Changes: 4   🖼 Graphic Costs: Not included   🖨 Print Costs: Incl.
[■ ■] [≡ ≡]  ← toggle card/list view

┌───────────────────┐ ┌───────────────────┐ ┌───────────────────┐ ┌───────────────────┐
│[img Parapedonale] │ │ [img Pensilina]   │ │ [img Poster]      │ │ [img Poster 600]  │
│ Parapedonale 120×80│ │ Pensilina 120×600 │ │ Poster 300×150    │ │ Poster 600×300    │
│ Piazza Verdi      │ │ Viale Croce Rossa │ │ Villa Trabia       │ │ Aeroporto Falcone │
│ [Front Screen]    │ │ [Front Screen]    │ │ [Back Screen]     │ │ [Front Screen]    │
│ 80,00€            │ │ 110,00€           │ │ 240,00€ ~~200~~ -12%│ │ 550,00€ ~~200~~ -3%│
└───────────────────┘ └───────────────────┘ └───────────────────┘ └───────────────────┘

                                    ┌──────────────────────────┐
                                    │ Summary                  │
                                    │ OOH              €3.075  │
                                    │ DOOH             €2.475  │
                                    │ Subtotal         €5.550  │
                                    │ IVA (22%)        €1.221  │
                                    │ Total Price     €6.771   │
                                    │ [○ Feedback] [✎ Sign Contract]│
                                    └──────────────────────────┘
```

**Componenti Ant Design:**
- `<Breadcrumb>` — back
- `<Tabs type="line">` — canali
- `<Collapse>` — accordion per campagna, header con nome/date/badge/prezzo/link esterno
- `<Segmented>` o `<Button.Group>` — toggle vista card/list (icone grid e list)
- Card impianto: `<Card cover={<img>}>` con body (nome, indirizzo, face tag, prezzo)
- `<Tag color="green">Front Screen</Tag>` / `<Tag color="orange">Back Screen</Tag>`
- Prezzo con sconto: prezzo barrato + prezzo scontato + badge percentuale (`<Typography.Text delete>`)
- Summary sticky: `<Card>` con `<Descriptions>` + `<Statistic>` per il totale
- `<Button icon={<MessageOutlined />}>Feedback</Button>`
- `<Button type="primary" icon={<EditOutlined />}>Sign Contract</Button>`

---

### 11.10 Guest: Quote Detail/Card

**Figma:** `Guest: Quote Detail/Card`
**Canvas:** 1728×1796px — **layout senza App Shell** (no sidebar, no top nav)

```
          S GRAVITY

Quote  |  Gohan Advertising Campaigns 2025
Advertiser: Gohan Sushi Srl   Address: Piazza Giuseppe Verdi, 5 — 90146 Palermo (PA)
Contract term: 10/01/2026 – 12/12/2026   Last update: 04/12/2025
"La scelta degli spazi dei network è ottimizzata incrociando i parametri..."

[OOH] [DOOH]

▾ Gohan Sushi Promo Luglio   ...  [Standard]    Price: €1.875,00
[card impianti identico a Sales view]

                                    ┌──────────────────────────┐
                                    │ Summary                  │
                                    │ ...                      │
                                    │ Total Price     €6.771   │
                                    │ [○ Feedback] [✎ Sign Contract]│
                                    └──────────────────────────┘
```

**Differenze rispetto alla Sales view:**
- **No sidebar, no top nav** — solo logo Gravity centrato in cima
- Mostra info advertiser completa (ragione sociale, indirizzo) nell'header
- Ha una riga descrittiva della strategia (tagline)
- Non ha Edit / Share nel header
- I bottoni Sign Contract e Feedback sono gli stessi (il guest può accettare)

---

### 11.11 OTP Insert (Guest Access)

**Figma:** `OTP Insert`
**Canvas:** 1728×1117px — **layout centrato, senza App Shell**

```
         [sfondo viola radiale]

         ┌───────────────────────────────┐
         │         S GRAVITY             │
         │                               │
         │    Verify your Access         │
         │  We've sent a 6-digit code    │
         │  to your email address.       │
         │  Please enter it below.       │
         │                               │
         │  [_] [_] [_] [_] [_] [_]     │
         │                               │
         │  [→  View your quote  ]       │  ← disabled finché OTP incompleto
         │                               │
         │  Didn't receive the code?     │
         │  Regenerate OTP               │
         └───────────────────────────────┘
```

**Note:** identico concettualmente al prototipo `01-login-otp` già costruito, ma con testo adattato al contesto del preventivo guest ("View your quote" invece di "Visualizza preventivo"). Usa `Input.OTP` (Ant Design 5.3+) o 6× `<Input>` custom.

---

### 11.12 Expired Link

**Figma:** `Expired Link`
**Canvas:** 1728×1117px — layout centrato, senza App Shell

Schermata di errore quando il link OTP è scaduto. Pattern: pagina di errore con icona + titolo + CTA per richiedere nuovo link.

**Componenti Ant Design:**
- `<Result status="error" title="Link Expired" subTitle="..." extra={<Button>Request new link</Button>}>`

---

### 11.13 Email Templates

**Figma:** frame `Email Template` con 3 varianti

| Template | Trigger | Contenuto |
|----------|---------|-----------|
| `Preventivo Ricevuto` | Sales genera il preventivo | Notifica advertiser che ha ricevuto un preventivo |
| `Visualizza preventivo` | Sales condivide link OTP | Link + istruzioni per visualizzare il preventivo |
| `Accetta preventivo` | Guest clicca "Sign Contract" | OTP di conferma accettazione + riepilogo |

I template sono HTML email (non prototipi di app). Dimensione canvas: 680px width (standard email width).

---

### 11.14 Slot Wizard (Selezione impianti)

**Figma:** frame `Slot Wizard` con 4 step (simboli separati)

Wizard per la selezione degli impianti pubblicitari da aggiungere a una campagna. Chiamato da "Choose formats" nella campaign card della Strategy Detail.

| Step | Contenuto |
|------|-----------|
| Step 1 | Selezione tipologia di formato/impianti |
| Step 2 | Configurazione dettagli (geolocalizzazione, date) |
| Step 3 | Preview e review impianti selezionati |
| Step 4 | Conferma e riepilogo (form lungo ~1230px height) |

**Pattern:** Modal a step (`<Steps>` + `<Modal>` o full-page wizard).

---

### 11.15 Naming convention schermate — Commercial module

| Nome frame Figma | Schermata |
|-----------------|-----------|
| `Negotiations/Table` | Lista trattative |
| `New Negotiation/Drawer` | Lista + form nuova trattativa |
| `New Negotiation/Drawer/Advertiser Select` | Lista + form + dropdown contatto aperto |
| `Toast message` | Lista + toast conferma salvataggio |
| `Wizard/Strategy` | Lista + modal wizard step 1–4 |
| `Strategy Detail/Full` | Configuratore strategie con campagne |
| `Strategy Detail/No Campaigns` | Configuratore senza campagne (empty) |
| `Strategy/New Campaign Modal` | Configuratore + modal nuova campagna |
| `Strategy/Campaign/Create Planning/Confirm` | Configuratore + modal conferma planning |
| `Planning/Sales View` | Dettaglio planning (stato empty) |
| `Planning Brief/FilledMap` | Dettaglio planning con mappa |
| `Planning/Sales View/Comments` | Dettaglio planning + drawer commenti |
| `Strategy Configurator / Generate Quote` | Configuratore con button Generate evidenziato |
| `Strategy Configurator / Generate Quote / Modal` | Configuratore + modal documenti |
| `Documents Modal / Version Quote` | Modal generazione prima versione |
| `Documents Modal / Update Quote` | Modal aggiornamento versione |
| `Quote Editor/OOH` | Editor prezzi/sconti tab OOH |
| `Quote Editor/DOOH` | Editor prezzi/sconti tab DOOH |
| `Quote Editor/Web` | Editor prezzi/sconti tab Web |
| `Quote Editor/Advertorial` | Editor prezzi/sconti tab Advertorial |
| `Sales: Quote Detail/Card` | Dettaglio preventivo (vista Sales) |
| `Sales: Quote Detail/Map` | Dettaglio preventivo con mappa |
| `Guest: Quote Detail/Card` | Dettaglio preventivo (vista Advertiser) |
| `OTP Insert` | Verifica accesso link preventivo guest |
| `Expired Link` | Link scaduto |
