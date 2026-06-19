/**
 * Setfarm test bridge for the static HTML stack.
 * Surfaces the live app state/actions for deterministic verification.
 */
window.__SETFARM_TEST_BRIDGE__ = {
  stack: 'static-html',
  ready: true,
  get app() {
    return window.app || null;
  },
  get state() {
    var app = window.app;
    return app && app.state ? app.state : null;
  },
  get actions() {
    var app = window.app;
    return app && app.actions ? app.actions : null;
  }
};
