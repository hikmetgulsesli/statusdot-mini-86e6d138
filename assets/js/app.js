/**
 * StatusDot Mini — app shell
 * Renders the three status dots, wires user actions, persists state,
 * and exposes the live runtime bridge on window.app.
 */
(function () {
  const FALLBACK_SEED = {
    dots: [
      { id: 'dot-1', label: 'Database Cluster Alpha', status: 'ready' },
      { id: 'dot-2', label: 'API Gateway Beta', status: 'warn' },
      { id: 'dot-3', label: 'Cache Node Gamma', status: 'fail' }
    ]
  };

  function getEl(selector) {
    return document.querySelector(selector);
  }

  function createEl(tag, className, attrs) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (attrs) {
      Object.keys(attrs).forEach(function (key) {
        el.setAttribute(key, attrs[key]);
      });
    }
    return el;
  }

  function renderDot(dot) {
    const card = createEl('article', 'dot-card', {
      'data-dot-id': dot.id,
      'data-status': dot.status
    });

    const header = createEl('div', 'dot-card__header');
    const dotVisual = createEl('span', 'dot-visual dot-visual--' + dot.status, {
      'aria-label': 'Status: ' + dot.status
    });
    const label = createEl('h2', 'dot-card__label');
    label.textContent = dot.label;
    header.appendChild(dotVisual);
    header.appendChild(label);

    const meta = createEl('p', 'dot-card__status');
    meta.textContent = dot.status.toUpperCase();

    const action = createEl('button', 'btn btn--secondary', {
      type: 'button',
      'data-action-id': 'ACT_CYCLE_DOT_STATUS'
    });
    action.textContent = 'Cycle status';
    action.addEventListener('click', function () {
      app.actions.cycleStatus(dot.id);
    });

    card.appendChild(header);
    card.appendChild(meta);
    card.appendChild(action);

    return card;
  }

  function renderGrid() {
    const grid = getEl('#dot-grid');
    if (!grid) return;
    grid.innerHTML = '';
    app.state.dots.forEach(function (dot) {
      grid.appendChild(renderDot(dot));
    });
  }

  function downloadSnapshot() {
    const blob = app.actions.exportSnapshot();
    const url = URL.createObjectURL(blob);
    const a = createEl('a', '', {
      href: url,
      download: 'statusdot-mini-snapshot.json'
    });
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function wireExportButton() {
    const btn = getEl('[data-action-id="ACT_EXPORT_SNAPSHOT"]');
    if (!btn) return;
    btn.addEventListener('click', downloadSnapshot);
  }

  function syncTitle() {
    const root = getEl('[data-setfarm-root]');
    if (root) {
      root.setAttribute('data-statusdot-ready', 'true');
    }
  }

  function initState(seedData) {
    const stateModule = window.StatusDotMiniState;
    if (!stateModule) {
      throw new Error('StatusDotMiniState module is not loaded');
    }
    stateModule.load(seedData || FALLBACK_SEED);
    return stateModule;
  }

  function bootstrap() {
    const stateModule = initState(window.__STATUSDOT_MINI_SEED__);

    app = {
      state: stateModule.getState(),
      actions: {
        cycleStatus: stateModule.cycleStatus,
        setLabel: stateModule.setLabel,
        reset: stateModule.reset,
        exportSnapshot: stateModule.exportSnapshot,
        subscribe: stateModule.subscribe
      }
    };

    // Live runtime bridge required by US-001 acceptance criteria.
    window.app = {
      state: app.state,
      actions: app.actions
    };
    globalThis.app = window.app;

    // Keep the exposed state reference fresh as the model mutates in place.
    stateModule.subscribe(function (nextState) {
      app.state = nextState;
      window.app.state = nextState;
      renderGrid();
    });

    renderGrid();
    wireExportButton();
    syncTitle();

    window.setfarmStaticReady = true;
  }

  let app = null;

  function start() {
    if (window.__STATUSDOT_MINI_SEED__) {
      bootstrap();
      return;
    }

    fetch('assets/data/statusdot-mini.json')
      .then(function (res) {
        return res.ok ? res.json() : FALLBACK_SEED;
      })
      .catch(function () {
        return FALLBACK_SEED;
      })
      .then(function (seed) {
        window.__STATUSDOT_MINI_SEED__ = seed;
        bootstrap();
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
