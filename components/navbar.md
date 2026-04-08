# Navbar — Gravity Platform

> Questo file è la fonte di verità per la navbar in tutti i prototipi HTML e nella trasposizione Figma.
> Ogni prototipo DEVE usare questo pattern. Non inventare varianti.

---

## Figma Design System

- **File:** Ant Design System for Gravity
- **Link diretto al componente:** https://www.figma.com/design/uR6CBOh0Y7dUQvH30SyD0P/Ant-Design-System-for-Gravity?node-id=48-1331
- **Component node ID:** `48:1331` (component set `*Navbar*`)
- **Istanza Planner:** node `129:10634`

---

## Specifiche visive (misurate da Figma)

| Proprietà | Valore |
|-----------|--------|
| Altezza navbar | **73px** |
| Sfondo | `#ffffff` |
| Border bottom | `1px solid rgba(0,0,0,0.06)` |
| Logo padding orizzontale | `20px` |
| Logo — type SVG height in prototipo | **28px** (scalato per leggibilità senza il mark) |
| Menu item padding orizzontale | `16px` |
| Menu item padding verticale | `12px` |
| Font voci menu | SF Pro Text Regular, 14px / line-height 22px |
| Colore voce attiva | `#3E00FB` + `border-bottom: 2px solid #3E00FB` |
| Colore voce inattiva | `rgba(0,0,0,0.88)` |
| Icon size nelle voci menu | `14×14px` |
| Gap icon → label | `8px` |
| Bell icon size | `24×24px` |
| Avatar size | `32×32px`, `border-radius: 999px` |
| Gap bell → avatar | `24px` |
| Padding destro | `20px` |

---

## Logo

Usa **solo il logotipo tipografico** (`Gravity_type.svg`). Non usare il mark (`Gravity_mark.svg`) o entrambi insieme.

```
src: ../../brand/Gravity_type.svg
height: 28px
width: auto
```

Percorso relativo ai prototipi in `prototipi/NN-nome/index.html` → `../../brand/Gravity_type.svg`

---

## Voci di navigazione per ruolo Planner

| Voce | Icona Ant Design | Dropdown |
|------|-----------------|----------|
| Overview | `AppstoreOutlined` | no |
| Inventory | `InboxOutlined` | no |
| Delivery | `SendOutlined` | sì → Campaigns, Plannings |

**La voce Delivery apre un dropdown** con:
- `Campaigns` → naviga alla lista campagne
- `Plannings` → naviga alla lista plannings

Quando l'utente si trova nell'area Planning (list, detail, select-systems), la `selectedKey` del Menu deve essere `'plannings'` — Ant Design evidenzia automaticamente anche il parent `Delivery` con il colore e l'underline attivo.

---

## Avatar — Planner

- **Tipo:** foto reale (immagine circolare `object-cover`)
- **Figma asset (temporaneo, 7gg):** `https://www.figma.com/api/mcp/asset/df094a9b-9185-4165-9f4c-fdb584fa6cac`
- **Fallback:** cerchio `#3E00FB` con iniziale `P`
- Per aggiornare l'asset: aprire il file Figma al node `129:10638` e riesportare

---

## Pattern HTML (React, no JSX)

```js
// ── Navbar ─────────────────────────────────────────────────────────────
// Requisiti: antd.Menu, icons.AppstoreOutlined, InboxOutlined, SendOutlined, BellOutlined

function TopNav({ activeNavKey, onNavSelect }) {
  const navItems = [
    { key: 'overview',   icon: React.createElement(AppstoreOutlined), label: 'Overview'  },
    { key: 'inventory',  icon: React.createElement(InboxOutlined),     label: 'Inventory' },
    {
      key: 'delivery',
      icon: React.createElement(SendOutlined),
      label: 'Delivery',
      children: [
        { key: 'campaigns', label: 'Campaigns' },
        { key: 'plannings', label: 'Plannings' },
      ],
    },
  ];

  return React.createElement('div', { className: 'top-nav' },
    // Logo
    React.createElement('div', { className: 'top-nav-logo' },
      React.createElement('img', {
        src: '../../brand/Gravity_type.svg',
        alt: 'Gravity',
        style: { height: 28, width: 'auto' },
        onError: e => { e.target.style.display = 'none'; },
      })
    ),
    // Menu orizzontale
    React.createElement('div', { className: 'top-nav-menu-wrap' },
      React.createElement(Menu, {
        mode: 'horizontal',
        selectedKeys: [activeNavKey],
        items: navItems,
        onSelect: ({ key }) => onNavSelect(key),
        style: { flex: 1, border: 'none', height: 73, lineHeight: '73px' },
        theme: 'light',
      })
    ),
    // Destra: Bell + Avatar
    React.createElement('div', { className: 'top-nav-right' },
      React.createElement('button', { className: 'top-nav-bell' },
        React.createElement(BellOutlined, { style: { fontSize: 20, color: 'rgba(0,0,0,0.65)' } })
      ),
      React.createElement('div', {
        style: { width: 32, height: 32, borderRadius: '999px', overflow: 'hidden', flexShrink: 0, cursor: 'pointer' },
      },
        React.createElement('img', {
          src: 'https://www.figma.com/api/mcp/asset/df094a9b-9185-4165-9f4c-fdb584fa6cac',
          alt: 'Planner',
          style: { width: '100%', height: '100%', objectFit: 'cover', display: 'block' },
          onError: e => {
            e.target.parentElement.style.background = '#3E00FB';
            e.target.style.display = 'none';
            e.target.parentElement.innerHTML = '<span style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:#fff;font-size:12px;font-weight:700">P</span>';
          },
        })
      )
    )
  );
}
```

### CSS necessario

```css
.top-nav {
  height: 73px;
  background: #ffffff;
  border-bottom: 1px solid rgba(0,0,0,0.06);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
  z-index: 100;
}
.top-nav-logo {
  display: flex;
  align-items: center;
  padding: 0 20px;
  height: 100%;
  flex-shrink: 0;
}
.top-nav-logo img { display: block; }
.top-nav-menu-wrap {
  flex: 1;
  align-self: stretch;
  display: flex;
  align-items: stretch;
}
/* Azzeramento bordo inferiore del Menu Ant Design */
.top-nav-menu-wrap .ant-menu-horizontal {
  border-bottom: none !important;
  height: 73px;
  line-height: 73px;
}
.top-nav-menu-wrap .ant-menu-horizontal > .ant-menu-item,
.top-nav-menu-wrap .ant-menu-horizontal > .ant-menu-submenu {
  height: 73px;
  line-height: 73px;
  padding: 0 16px;
  top: 0;
}
.top-nav-menu-wrap .ant-menu-horizontal > .ant-menu-item::after,
.top-nav-menu-wrap .ant-menu-horizontal > .ant-menu-submenu::after {
  bottom: 0 !important;
  border-bottom-width: 2px !important;
}
.top-nav-right {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 0 20px;
  flex-shrink: 0;
}
.top-nav-bell {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: rgba(0,0,0,0.65);
  padding: 4px;
  border-radius: 6px;
  transition: background 0.15s;
}
.top-nav-bell:hover { background: rgba(0,0,0,0.04); }
```

### State management in AppRoot

```js
// activeNavKey si calcola dalla view corrente
const activeNavKey = (view === 'list' || view === 'detail' || view === 'select-systems')
  ? 'plannings'
  : 'overview';

function handleNavSelect(key) {
  if (key === 'plannings') { setView('list'); setSelectedPlanning(null); }
  // altri key: navigazione futura
}

// Render
React.createElement(TopNav, { activeNavKey, onNavSelect: handleNavSelect })
```

---

## Trasposizione Figma

Quando si trasferisce una schermata di prototipo su Figma:

1. Usa il componente **`*Navbar*`** dalla libreria _Ant Design System for Gravity_
2. Variante: **Role = Planner**
3. Node diretto: `48:1331` → scegli l'istanza con le 3 voci Overview / Inventory / Delivery
4. La voce attiva si imposta dalla proprietà `Selected Item` del componente Figma
5. Non disegnare la navbar da zero: usa sempre il componente dal file del DS

---

## Note

- La navbar è **sticky** (rimane in cima allo scroll): aggiungere `position: sticky; top: 0;` se il layout non usa `overflow: hidden` sull'app shell.
- In dark mode (futura): esiste una variante `Theme = Dark` nello stesso component set Figma.
- Non usare entrambi i loghi (mark + type) insieme: solo il logotipo tipografico esteso.
