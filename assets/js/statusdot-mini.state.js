/**
 * StatusDot Mini — state manager
 * Owns the live dot state, status transitions, persistence, and snapshot export.
 */
(function () {
  const STATUS_ORDER = ['ready', 'warn', 'fail'];

  const storage = window.StatusDotMiniStorage || {
    read: () => null,
    write: () => false
  };

  let state = {
    dots: [],
    lastError: null
  };

  const listeners = new Set();

  function notify() {
    listeners.forEach(function (fn) {
      fn(state);
    });
  }

  function makeDots(seed) {
    if (!seed || !Array.isArray(seed.dots)) {
      return [
        { id: 'dot-1', label: 'Service Alpha', status: 'ready' },
        { id: 'dot-2', label: 'Service Beta', status: 'warn' },
        { id: 'dot-3', label: 'Service Gamma', status: 'fail' }
      ];
    }
    return seed.dots.map(function (dot) {
      return {
        id: String(dot.id),
        label: String(dot.label || ''),
        status: STATUS_ORDER.includes(dot.status) ? dot.status : 'ready'
      };
    });
  }

  function load(seed) {
    const saved = storage.read();
    if (saved && Array.isArray(saved.dots)) {
      state = {
        dots: saved.dots.map(function (dot) {
          return {
            id: String(dot.id),
            label: String(dot.label || ''),
            status: STATUS_ORDER.includes(dot.status) ? dot.status : 'ready'
          };
        }),
        lastError: saved.lastError || null
      };
    } else {
      state = {
        dots: makeDots(seed),
        lastError: null
      };
    }
    notify();
    return state;
  }

  function persist() {
    storage.write(state);
  }

  function getState() {
    return state;
  }

  function findDotIndex(id) {
    return state.dots.findIndex(function (dot) {
      return dot.id === id;
    });
  }

  function cycleStatus(id) {
    const idx = findDotIndex(id);
    if (idx === -1) return state;
    const current = state.dots[idx].status;
    const nextIndex = (STATUS_ORDER.indexOf(current) + 1) % STATUS_ORDER.length;
    state.dots[idx].status = STATUS_ORDER[nextIndex];
    state.lastError = null;
    persist();
    notify();
    return state;
  }

  function setLabel(id, label) {
    const idx = findDotIndex(id);
    if (idx === -1) return state;
    state.dots[idx].label = String(label || '');
    persist();
    notify();
    return state;
  }

  function reset(seed) {
    state = {
      dots: makeDots(seed),
      lastError: null
    };
    persist();
    notify();
    return state;
  }

  function exportSnapshot() {
    return new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
  }

  function subscribe(fn) {
    listeners.add(fn);
    fn(state);
    return function unsubscribe() {
      listeners.delete(fn);
    };
  }

  window.StatusDotMiniState = {
    STATUS_ORDER,
    load,
    getState,
    cycleStatus,
    setLabel,
    reset,
    exportSnapshot,
    subscribe
  };
})();
