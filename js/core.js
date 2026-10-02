/* ZEVA Academy — core registry, i18n helpers, progress store, markup. */
(function () {
  'use strict';

  const LANGS = ['ja', 'en', 'id'];
  const STORE_KEY = 'zeva-academy:v1';

  const ZA = {
    LANGS,
    modules: {},
    glossary: [],
    glossaryById: {},
    formulas: [],
    placement: null,
    lang: 'ja',
    blocks: {},
    diagrams: {},
    widgets: {},
    ui: {},
    tracks: [],
  };

  /* ---------- registration (called from content/*.js) ---------- */
  ZA.addModule = function (m) {
    if (!m || !m.id) { console.error('[ZA] module without id', m); return; }
    if (ZA.modules[m.id]) console.warn('[ZA] duplicate module', m.id);
    ZA.modules[m.id] = m;
  };
  ZA.addGlossary = function (list) {
    (list || []).forEach(function (g) {
      ZA.glossary.push(g);
      ZA.glossaryById[g.id] = g;
    });
  };
  ZA.addFormulas = function (groups) { ZA.formulas = ZA.formulas.concat(groups || []); };
  ZA.setPlacement = function (p) { ZA.placement = p; };

  /* ---------- i18n ---------- */
  // t(L) -> string in current language with fallback
  ZA.t = function (v, lang) {
    if (v == null) return '';
    if (typeof v === 'string' || typeof v === 'number') return String(v);
    const l = lang || ZA.lang;
    if (v[l] != null) return v[l];
    if (v.en != null) return v.en;
    if (v.ja != null) return v.ja;
    return '';
  };
  // ui(key, vars) -> UI string from ZA.ui dictionary
  ZA.u = function (key, vars) {
    const entry = ZA.ui[key];
    let s = entry ? ZA.t(entry) : key;
    if (vars) Object.keys(vars).forEach(function (k) { s = s.split('{' + k + '}').join(vars[k]); });
    return s;
  };

  /* ---------- HTML helpers ---------- */
  ZA.esc = function (s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  };

  // Inline markup: **b**, ==mark==, `code`, [[term]] / [[term|label]], allow <sub><sup><br>
  ZA.md = function (v) {
    let s = ZA.esc(ZA.t(v));
    s = s.replace(/&lt;(\/?)(sub|sup|br|b|i|strong|em|small)\s*\/?&gt;/g, '<$1$2>');
    s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
    s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    s = s.replace(/==([^=]+)==/g, '<mark>$1</mark>');
    s = s.replace(/\[\[([a-z0-9-]+)(?:\|([^\]]+))?\]\]/g, function (_, id, label) {
      const g = ZA.glossaryById[id];
      const text = label || (g ? ZA.t(g.term) : id);
      if (!g) return '<span class="term term-missing">' + text + '</span>';
      return '<a class="term" href="#/glossary/' + id + '" data-term="' + id + '">' + text + '</a>';
    });
    s = s.replace(/\n/g, '<br>');
    return s;
  };

  // Tiny element builder: h('div.cls#id', {attrs}, children...)
  ZA.h = function (sel, attrs) {
    const parts = sel.split(/(?=[.#])/);
    const el = document.createElement(parts[0] || 'div');
    for (let i = 1; i < parts.length; i++) {
      const p = parts[i];
      if (p[0] === '.') el.classList.add(p.slice(1));
      else if (p[0] === '#') el.id = p.slice(1);
    }
    let start = 2;
    if (attrs && (typeof attrs !== 'object' || attrs.nodeType || Array.isArray(attrs))) { start = 1; attrs = null; }
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        const val = attrs[k];
        if (val == null || val === false) return;
        if (k === 'html') el.innerHTML = val;
        else if (k === 'text') el.textContent = val;
        else if (k.slice(0, 2) === 'on' && typeof val === 'function') el.addEventListener(k.slice(2), val);
        else if (k === 'style' && typeof val === 'object') Object.assign(el.style, val);
        else el.setAttribute(k, val === true ? '' : val);
      });
    }
    for (let i = start; i < arguments.length; i++) append(el, arguments[i]);
    return el;
  };
  function append(el, c) {
    if (c == null || c === false) return;
    if (Array.isArray(c)) { c.forEach(function (x) { append(el, x); }); return; }
    if (c.nodeType) el.appendChild(c);
    else el.appendChild(document.createTextNode(String(c)));
  }

  ZA.fmt = function (n, d) {
    if (n == null || !isFinite(n)) return '—';
    const digits = d == null ? 2 : d;
    return Number(n).toLocaleString(ZA.lang === 'id' ? 'id-ID' : (ZA.lang === 'ja' ? 'ja-JP' : 'en-US'),
      { minimumFractionDigits: digits, maximumFractionDigits: digits });
  };
  ZA.pct = function (n, d) { return ZA.fmt(n * 100, d == null ? 1 : d) + '%'; };

  /* ---------- statistics helpers (shared by widgets) ---------- */
  ZA.stat = {
    mean: function (a) { return a.length ? a.reduce(function (s, x) { return s + x; }, 0) / a.length : NaN; },
    sd: function (a, sample) {
      if (a.length < 2) return 0;
      const m = ZA.stat.mean(a);
      const ss = a.reduce(function (s, x) { return s + (x - m) * (x - m); }, 0);
      return Math.sqrt(ss / (sample === false ? a.length : a.length - 1));
    },
    min: function (a) { return Math.min.apply(null, a); },
    max: function (a) { return Math.max.apply(null, a); },
    median: function (a) {
      const s = a.slice().sort(function (x, y) { return x - y; });
      const n = s.length; if (!n) return NaN;
      return n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2;
    },
    // Box-Muller normal random
    randn: function () {
      let u = 0, v = 0;
      while (u === 0) u = Math.random();
      while (v === 0) v = Math.random();
      return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
    },
    // standard normal CDF (Abramowitz-Stegun)
    phi: function (x) {
      const t = 1 / (1 + 0.2316419 * Math.abs(x));
      const d = 0.3989423 * Math.exp(-x * x / 2);
      let p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
      return x > 0 ? 1 - p : p;
    },
    pdf: function (x, mu, s) { return Math.exp(-0.5 * Math.pow((x - mu) / s, 2)) / (s * Math.sqrt(2 * Math.PI)); },
  };

  /* ---------- persistent store ---------- */
  function readStore() {
    try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; } catch (e) { return {}; }
  }
  let state = readStore();
  state.done = state.done || {};
  state.visited = state.visited || {};
  state.read = state.read || {};

  ZA.store = {
    get: function (k, d) { return state[k] === undefined ? d : state[k]; },
    set: function (k, v) {
      state[k] = v;
      try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) { /* storage unavailable */ }
    },
    save: function () { try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) { /* ignore */ } },
    reset: function () { state = { done: {}, visited: {}, read: {}, lang: state.lang, theme: state.theme }; ZA.store.save(); },
    state: function () { return state; },
  };

  ZA.progress = {
    markVisited: function (id) { state.visited[id] = true; ZA.store.save(); },
    markSection: function (id, sec) {
      state.read[id] = state.read[id] || {};
      if (!state.read[id][sec]) { state.read[id][sec] = true; ZA.store.save(); }
    },
    sectionsRead: function (id) { return Object.keys(state.read[id] || {}).length; },
    setQuiz: function (id, score) {
      const prev = state.done[id];
      if (!prev || score >= prev.score) state.done[id] = { score: score, at: Date.now() };
      ZA.store.save();
    },
    passed: function (id) { const d = state.done[id]; return !!(d && d.score >= 0.8); },
    score: function (id) { const d = state.done[id]; return d ? d.score : null; },
  };

  ZA.modulesOf = function (track) {
    return Object.keys(ZA.modules).map(function (k) { return ZA.modules[k]; })
      .filter(function (m) { return m.track === track; })
      .sort(function (a, b) { return a.order - b.order; });
  };
  ZA.orderedModules = function () {
    return ZA.tracks.reduce(function (acc, tr) { return acc.concat(ZA.modulesOf(tr.id)); }, []);
  };

  window.ZA = ZA;
})();
