/**
 * Gravity Prototype Navbar
 * Componente condiviso — caricarlo dopo React, ReactDOM, antd, @ant-design/icons e tokens.js
 *
 * Utilizzo in ogni prototipo:
 *   1. Prima del tag <script> del prototipo:
 *        window.GRAVITY_NAV = { section: 'Inventory', item: 'Systems' };
 *   2. Caricare questo file:
 *        <script src="../navbar.js"></script>
 *   3. Nel render, usare: React.createElement(window.GravityNavbar, null)
 *
 * Sezioni e voci disponibili (dal DS Figma):
 *   Overview   → Dashboard finance | Dashboard analytics
 *   Inventory  → Systems | Licenses | Supplier
 *   Commercial → Wallet | Activities | Negotiations | Orders
 *   Delivery   → Campaigns | Plannings
 *   Settings   → Users | Tenants
 */
(function () {
  if (window.GravityNavbar) return;

  var h          = React.createElement;
  var useState   = React.useState;
  var useEffect  = React.useEffect;
  var Fragment   = React.Fragment;

  // ── Dati ruoli (source of truth: Figma node 48-1331) ──────────────────────

  var ROLES = [
    'Tenant Admin',
    'Inventory Manager',
    'Operation Manager',
    'Planner',
    'Sales',
  ];

  var ROLE_NAV = {
    'Tenant Admin':      ['Overview', 'Inventory', 'Commercial', 'Delivery', 'Settings'],
    'Inventory Manager': ['Overview', 'Inventory'],
    'Operation Manager': ['Overview', 'Inventory', 'Delivery'],
    'Planner':           ['Overview', 'Inventory', 'Delivery'],
    'Sales':             ['Commercial', 'Delivery'],
  };

  // Voci di navigazione e link ai prototipi (Figma node 3261-3147)
  var NAV = {
    Overview:   { items: ['Dashboard finance', 'Dashboard analytics'], links: {} },
    Inventory:  { items: ['Systems', 'Licenses', 'Supplier'],
                  links: { Systems: '../inventory-map--v2/' } },
    Commercial: { items: ['Wallet', 'Activities', 'Negotiations', 'Orders'], links: {} },
    Delivery:   { items: ['Campaigns', 'Plannings'],
                  links: { Plannings: '../planning-redesign/' } },
    Settings:   { items: ['Users', 'Tenants'], links: {} },
  };

  var ROLE_COLOR = {
    'Tenant Admin':      '#3e00fb',
    'Inventory Manager': '#13c2c2',
    'Operation Manager': '#eb2f96',
    'Planner':           '#722ed1',
    'Sales':             '#fa8c16',
  };

  var ROLE_ABBR = {
    'Tenant Admin':      'TA',
    'Inventory Manager': 'IM',
    'Operation Manager': 'OM',
    'Planner':           'PL',
    'Sales':             'SA',
  };

  // ── CSS injection (override altezza antd Menu horizontal) ─────────────────

  var _style = document.createElement('style');
  _style.textContent = [
    '.gv-nav-menu.ant-menu-horizontal{border-bottom:none!important;height:64px!important;line-height:64px!important;}',
    '.gv-nav-menu.ant-menu-horizontal>.ant-menu-item,',
    '.gv-nav-menu.ant-menu-horizontal>.ant-menu-submenu{height:64px!important;line-height:64px!important;top:0!important;}',
    '.gv-nav-menu.ant-menu-horizontal>.ant-menu-item::after,',
    '.gv-nav-menu.ant-menu-horizontal>.ant-menu-submenu::after{bottom:0!important;border-bottom-width:2px!important;}',
    '.gv-nav-menu.ant-menu-horizontal>.ant-menu-overflow{height:64px;}',
  ].join('');
  document.head.appendChild(_style);

  // ── Componente ────────────────────────────────────────────────────────────

  function GravityNavbar() {
    var cfg           = window.GRAVITY_NAV || {};
    var activeSection = cfg.section || null;
    var activeItem    = cfg.item    || null;

    var _r1     = useState(function () { return localStorage.getItem('gravity_proto_role') || null; });
    var role    = _r1[0]; var setRole = _r1[1];

    var _r2        = useState(!role);
    var showModal  = _r2[0]; var setShowModal = _r2[1];

    useEffect(function () { if (role) localStorage.setItem('gravity_proto_role', role); }, [role]);

    var cur     = role || 'Tenant Admin';
    var color   = ROLE_COLOR[cur];
    var abbr    = ROLE_ABBR[cur];
    var sections = ROLE_NAV[cur];

    // Voci Menu antd
    var menuItems = sections.map(function (sec) {
      var conf = NAV[sec];
      return {
        key: sec,
        label: sec,
        children: conf.items.map(function (item) {
          var link   = conf.links[item];
          var isAct  = item === activeItem;
          return {
            key: sec + '/' + item,
            label: link
              ? h('a', { href: link, style: { color: isAct ? '#3e00fb' : undefined } }, item)
              : h('span', { style: { color: isAct ? '#3e00fb' : undefined } }, item),
          };
        }),
      };
    });

    var selectedKeys = [];
    if (activeSection && activeItem) selectedKeys = [activeSection + '/' + activeItem];
    else if (activeSection)          selectedKeys = [activeSection];

    // Dropdown avatar — cambio ruolo
    var avatarMenuItems = [
      { key: '_hd', label: h('span', { style: { fontSize: 11, color: 'rgba(0,0,0,0.45)', textTransform: 'uppercase', letterSpacing: '0.5px' } }, 'Vista ruolo'), disabled: true },
      { type: 'divider' },
    ].concat(ROLES.map(function (r) {
      return {
        key: r,
        label: h('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32, minWidth: 200 } },
          h('span', { style: { fontWeight: r === cur ? 600 : 400 } }, r),
          r === cur ? h(icons.CheckOutlined, { style: { color: '#3e00fb', fontSize: 12 } }) : null
        ),
        onClick: function () { setRole(r); },
      };
    }));

    // Modal "Per chi stai progettando?"
    var modalBody = h('div', null,
      h('p', { style: { color: 'rgba(0,0,0,0.65)', marginBottom: 16, marginTop: 4 } },
        'Seleziona il ruolo per cui stai progettando questa feature. La navbar adatterà le voci di navigazione visibili.'
      ),
      h('div', { style: { display: 'flex', flexDirection: 'column', gap: 8 } },
        ROLES.map(function (r) {
          return h('div', {
            key: r,
            onClick: function () { setRole(r); setShowModal(false); },
            style: {
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '10px 14px', border: '1px solid #f0f0f0',
              borderRadius: 8, cursor: 'pointer', transition: 'all 0.15s',
            },
            onMouseEnter: function (e) {
              e.currentTarget.style.borderColor = ROLE_COLOR[r];
              e.currentTarget.style.background  = ROLE_COLOR[r] + '0d';
            },
            onMouseLeave: function (e) {
              e.currentTarget.style.borderColor = '#f0f0f0';
              e.currentTarget.style.background  = '';
            },
          },
            h('div', {
              style: {
                width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                background: ROLE_COLOR[r], display: 'flex', alignItems: 'center', justifyContent: 'center',
              }
            }, h('span', { style: { color: '#fff', fontSize: 11, fontWeight: 700 } }, ROLE_ABBR[r])),
            h('div', null,
              h('div', { style: { fontWeight: 600, fontSize: 14, color: 'rgba(0,0,0,0.88)' } }, r),
              h('div', { style: { fontSize: 12, color: 'rgba(0,0,0,0.45)', marginTop: 2 } },
                ROLE_NAV[r].join(' · '))
            )
          );
        })
      )
    );

    return h(Fragment, null,

      // ── Modal selezione ruolo ─────────────────────────────────────────────
      h(antd.Modal, {
        title: 'Per chi stai progettando?',
        open: showModal,
        footer: null,
        closable: !!role,
        onCancel: function () { if (role) setShowModal(false); },
        centered: true,
        width: 420,
        maskClosable: !!role,
      }, modalBody),

      // ── Navbar ────────────────────────────────────────────────────────────
      h('nav', {
        style: {
          background: '#fff',
          borderBottom: '1px solid rgba(0,0,0,0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 64,
          position: 'sticky',
          top: 0,
          zIndex: 100,
          flexShrink: 0,
        },
      },

        // Sinistra: logo + menu
        h('div', { style: { display: 'flex', alignItems: 'stretch', height: '100%', flex: 1, minWidth: 0 } },
          h('a', {
            href: '../app/',
            style: {
              padding: '0 20px', display: 'flex', alignItems: 'center',
              textDecoration: 'none', flexShrink: 0,
              borderRight: '1px solid rgba(0,0,0,0.06)',
            },
          },
            h('img', {
              src: '../../brand/Gravity_type.svg',
              alt: 'Gravity',
              style: { height: 20 },
              onError: function (e) { e.target.style.display = 'none'; },
            })
          ),
          h(antd.Menu, {
            mode: 'horizontal',
            selectedKeys: selectedKeys,
            items: menuItems,
            className: 'gv-nav-menu',
            style: { border: 'none', flex: 1, minWidth: 0 },
          })
        ),

        // Destra: badge ruolo + campana + avatar
        h('div', { style: { display: 'flex', alignItems: 'center', gap: 16, padding: '0 20px', flexShrink: 0 } },

          // Badge "per chi stai progettando" — cliccabile per riaprire modal
          h('div', {
            onClick: function () { setShowModal(true); },
            title: 'Clicca per cambiare il ruolo di riferimento',
            style: {
              background: color + '18',
              border: '1px solid ' + color + '50',
              borderRadius: 20,
              padding: '2px 12px',
              fontSize: 12,
              color: color,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              fontWeight: 500,
              userSelect: 'none',
            },
          }, cur),

          h(icons.BellOutlined, { style: { fontSize: 18, color: 'rgba(0,0,0,0.45)', cursor: 'pointer' } }),

          // Avatar con dropdown cambio ruolo
          h(antd.Dropdown, {
            menu: { items: avatarMenuItems },
            trigger: ['click'],
            placement: 'bottomRight',
          },
            h('div', {
              style: {
                width: 32, height: 32, borderRadius: '50%', background: color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', flexShrink: 0, userSelect: 'none',
              },
            },
              h('span', { style: { color: '#fff', fontSize: 11, fontWeight: 700 } }, abbr)
            )
          )
        )
      )
    );
  }

  window.GravityNavbar = GravityNavbar;
}());
