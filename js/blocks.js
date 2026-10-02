/* ZEVA Academy — content block renderers. */
(function () {
  'use strict';
  const ZA = window.ZA;
  const h = ZA.h, t = ZA.t, md = ZA.md, u = ZA.u;
  const TONES = ['navy', 'blue', 'teal', 'green', 'amber', 'red', 'gray'];
  const tone = function (x, d) { return TONES.indexOf(x) >= 0 ? x : (d || 'navy'); };
  const HTML = function (tag, v) { return h(tag, { html: md(v) }); };

  const B = ZA.blocks;

  B.p = function (b) { return HTML('p', b.text); };
  B.h = function (b) { return h('h3.sub', { html: md(b.text) }); };

  B.list = function (b) {
    return h(b.ordered ? 'ol.list' : 'ul.list', null, (b.items || []).map(function (it) { return HTML('li', it); }));
  };

  B.callout = function (b) {
    const kind = ['key', 'note', 'warn', 'zeva', 'example', 'tip'].indexOf(b.kind) >= 0 ? b.kind : 'note';
    const defTitle = u('callout' + kind[0].toUpperCase() + kind.slice(1));
    return h('div.callout.callout-' + kind, null,
      h('div.c-title', { html: b.title ? md(b.title) : ZA.esc(defTitle) }),
      h('div.c-body', null, b.text ? HTML('p', b.text) : null,
        b.items ? h('ul.list', null, b.items.map(function (x) { return HTML('li', x); })) : null));
  };

  B.quote = function (b) {
    return h('blockquote.quote', null, h('div', { html: md(b.text) }), b.cite ? h('cite', { html: md(b.cite) }) : null);
  };

  B.formula = function (b) {
    return h('div.formula', null,
      h('div.expr', { html: md(b.expr) }),
      b.where && b.where.length ? h('div.where', null, b.where.map(function (w) {
        return [h('b', { html: md(w.sym) }), h('span', { html: md(w.text) })];
      })) : null,
      b.note ? h('div.fnote', { html: md(b.note) }) : null);
  };

  B.example = function (b) {
    return h('div.example', null,
      h('div.ex-head', { html: '🧮 ' + (b.title ? md(b.title) : ZA.esc(u('example'))) }),
      h('ol', null, (b.steps || []).map(function (s) { return HTML('li', s); })),
      b.result ? h('div.ex-result', { html: '→ ' + md(b.result) }) : null);
  };

  B.table = function (b) {
    return h('div', null,
      h('div.table-wrap', null, h('table.tbl', null,
        b.head ? h('thead', null, h('tr', null, b.head.map(function (c) { return h('th', { html: md(c) }); }))) : null,
        h('tbody', null, (b.rows || []).map(function (r) {
          return h('tr', null, r.map(function (c) { return h('td', { html: md(c) }); }));
        })))),
      b.caption ? h('div.table-cap', { html: md(b.caption) }) : null);
  };

  B.cards = function (b) {
    const cols = [2, 3, 4].indexOf(b.cols) >= 0 ? b.cols : 3;
    return h('div.cards.cols-' + cols, null, (b.items || []).map(function (c) {
      return h('div.ccard.tc-' + tone(c.tone), null,
        c.icon ? h('div.ic', { text: c.icon }) : null,
        h('h4', { html: md(c.title) }),
        c.text ? h('p', { html: md(c.text) }) : null);
    }));
  };

  B.compare = function (b) {
    const side = function (s, d) {
      if (!s) return null;
      return h('div.side.tc-' + tone(s.tone, d), null,
        h('h4', { html: md(s.title) }),
        h('ul', null, (s.items || []).map(function (x) { return HTML('li', x); })));
    };
    return h('div.compare', null, side(b.left, 'red'), side(b.right, 'green'));
  };

  B.flow = function (b) {
    const dir = b.dir === 'v' ? 'v' : 'h';
    const kids = [];
    (b.nodes || []).forEach(function (n, i) {
      if (i) kids.push(h('div.farrow', { 'aria-hidden': 'true', text: dir === 'v' ? '▼' : '▶' }));
      kids.push(h('div.fnode.tc-' + tone(n.tone, 'blue'), null,
        h('h4', { html: md(n.title) }), n.text ? h('p', { html: md(n.text) }) : null));
    });
    return h('div.flow.' + dir, null, kids);
  };

  B.cycle = function (b) {
    const nodes = b.nodes || [];
    const n = nodes.length;
    const wrap = h('div.cycle');
    const R = 36; // percent radius
    const ns = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', '0 0 100 100');
    svg.setAttribute('class', 'ring');
    svg.setAttribute('aria-hidden', 'true');
    const defs = document.createElementNS(ns, 'defs');
    const mk = document.createElementNS(ns, 'marker');
    const mid = 'cyc-arrow-' + Math.random().toString(36).slice(2, 7);
    mk.setAttribute('id', mid); mk.setAttribute('viewBox', '0 0 10 10'); mk.setAttribute('refX', '5'); mk.setAttribute('refY', '5');
    mk.setAttribute('markerWidth', '4'); mk.setAttribute('markerHeight', '4'); mk.setAttribute('orient', 'auto-start-reverse');
    const mp = document.createElementNS(ns, 'path'); mp.setAttribute('d', 'M0,0 L10,5 L0,10 z'); mp.setAttribute('fill', 'var(--muted)');
    mk.appendChild(mp); defs.appendChild(mk); svg.appendChild(defs);
    for (let i = 0; i < n; i++) {
      const a0 = (-90 + (360 / n) * i + 360 / n * 0.28) * Math.PI / 180;
      const a1 = (-90 + (360 / n) * (i + 1) - 360 / n * 0.28) * Math.PI / 180;
      const p = document.createElementNS(ns, 'path');
      const x0 = 50 + R * Math.cos(a0), y0 = 50 + R * Math.sin(a0), x1 = 50 + R * Math.cos(a1), y1 = 50 + R * Math.sin(a1);
      p.setAttribute('d', 'M' + x0 + ',' + y0 + ' A' + R + ',' + R + ' 0 0 1 ' + x1 + ',' + y1);
      p.setAttribute('fill', 'none'); p.setAttribute('stroke', 'var(--border-strong)'); p.setAttribute('stroke-width', '0.8');
      p.setAttribute('marker-end', 'url(#' + mid + ')');
      svg.appendChild(p);
    }
    wrap.appendChild(svg);
    if (b.center) wrap.appendChild(h('div.ccenter', { html: md(b.center) }));
    nodes.forEach(function (nd, i) {
      const a = (-90 + (360 / n) * i) * Math.PI / 180;
      const el = h('div.cnode.tc-' + tone(nd.tone, 'blue'), null,
        h('h4', { html: md(nd.title) }), nd.text ? h('p', { html: md(nd.text) }) : null);
      el.style.left = (50 + R * Math.cos(a)) + '%';
      el.style.top = (50 + R * Math.sin(a)) + '%';
      wrap.appendChild(el);
    });
    return wrap;
  };

  B.chain = function (b) {
    return h('div.chain', null,
      (b.items || []).map(function (it) { return h('div.citem', null, h('div', { html: md(it) })); }),
      b.conclusion ? h('div.conclusion', { html: '∴ ' + md(b.conclusion) }) : null);
  };

  B.layers = function (b) {
    return h('div.layers', null, (b.items || []).map(function (l) {
      const el = h('div.layer', null,
        h('div.lbl', { html: md(l.label) }),
        h('div.lbody', null, h('h4', { html: md(l.title) }), l.text ? h('p', { html: md(l.text) }) : null));
      el.style.setProperty('--tc', 'var(--' + tone(l.tone) + ')');
      return el;
    }));
  };

  B.diagram = function (b) {
    const fn = ZA.diagrams[b.name];
    const box = h('figure.diagram', { style: { margin: 0 } });
    if (!fn) { box.appendChild(h('div.muted', { text: 'diagram: ' + b.name })); return box; }
    const out = fn(b.props || {});
    if (typeof out === 'string') box.innerHTML = out; else box.appendChild(out);
    if (b.caption) box.appendChild(h('figcaption.fig-cap', { html: md(b.caption) }));
    return box;
  };

  // single ungraded question
  B.check = function (b) {
    const box = h('div.check');
    box.appendChild(h('div.q', { html: md(b.q) }));
    const fb = h('div');
    const list = h('div.choices');
    const btns = (b.choices || []).map(function (c, i) {
      const btn = h('button.choice', { type: 'button' }, h('span.mk', { text: String.fromCharCode(65 + i) }), h('span', { html: md(c) }));
      btn.addEventListener('click', function () {
        btns.forEach(function (x, j) {
          x.disabled = true;
          if (j === b.answer) x.classList.add('right');
        });
        const ok = i === b.answer;
        if (!ok) btn.classList.add('wrong');
        fb.className = 'feedback ' + (ok ? 'ok' : 'ng');
        fb.innerHTML = '<b>' + ZA.esc(u(ok ? 'correct' : 'incorrect')) + '</b>' + (b.explain ? md(b.explain) : '');
        const again = h('button.btn.btn-sm.btn-ghost', { type: 'button', text: '↺ ' + u('retry') });
        again.addEventListener('click', function () {
          btns.forEach(function (x) { x.disabled = false; x.classList.remove('right', 'wrong'); });
          fb.className = ''; fb.innerHTML = '';
        });
        fb.appendChild(h('div', { style: { marginTop: '6px' } }, again));
      });
      list.appendChild(btn);
      return btn;
    });
    box.appendChild(list);
    box.appendChild(fb);
    return box;
  };

  // launch: 別ページのアプリへ渡す大きめの入口。モジュールの中に埋め込めないもの用。
  B.launch = function (b) {
    const a = h('a.launch', { href: b.href },
      h('span.l-mark', { text: b.mark || '▶' }),
      h('span.l-txt', null,
        h('strong', { html: md(b.title) }),
        b.desc ? h('span', { html: md(b.desc) }) : null),
      h('span.l-go', { text: '→' }));
    if (b.blank) { a.setAttribute('target', '_blank'); a.setAttribute('rel', 'noopener'); }
    return a;
  };

  B.widget = function (b) {
    const fn = ZA.widgets[b.name];
    if (!fn) return h('div.callout.callout-warn', null, h('div.c-title', { text: 'widget: ' + b.name }));
    try { return fn(b.props || {}); } catch (e) {
      console.error('[ZA] widget error', b.name, e);
      return h('div.callout.callout-warn', null, h('div.c-title', { text: 'widget error: ' + b.name }));
    }
  };

  ZA.renderBlock = function (b) {
    const fn = B[b && b.type];
    if (!fn) { console.warn('[ZA] unknown block', b); return h('div'); }
    const el = fn(b);
    const wrap = h('div.block');
    wrap.appendChild(el);
    return wrap;
  };

  /* Widget chrome shared by widgets.js */
  ZA.widgetShell = function (title, badge) {
    const body = h('div.w-body');
    const el = h('div.widget', null,
      h('div.w-head', null, h('span.w-badge', { text: badge || u('tryIt') }), h('h4', { html: md(title) })),
      body);
    return { el: el, body: body };
  };
})();
