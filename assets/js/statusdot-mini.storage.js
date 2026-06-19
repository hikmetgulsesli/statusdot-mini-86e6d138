/**
 * StatusDot Mini — persistence layer
 * Wraps localStorage with safe read/write helpers and a stable storage key.
 */
(function () {
  const STORAGE_KEY = 'statusdot-mini:state';

  function read() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn('[StatusDotMiniStorage] read failed:', err);
      return null;
    }
  }

  function write(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      return true;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn('[StatusDotMiniStorage] write failed:', err);
      return false;
    }
  }

  function clear() {
    try {
      localStorage.removeItem(STORAGE_KEY);
      return true;
    } catch (err) {
      return false;
    }
  }

  window.StatusDotMiniStorage = {
    key: STORAGE_KEY,
    read,
    write,
    clear
  };
})();
