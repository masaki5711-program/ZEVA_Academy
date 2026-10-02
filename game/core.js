/* 現場再建記 — 土台。
 *
 * 画面の部品・状態の保存・成績表・結果コード・進行を、ここ1つに集める。
 * 品質のライン（quality.js ほか）も生産性のライン（prod.js）も、この WS を借りて動く。
 * ファイルの並びは index.html の読み込み順のとおり:
 *   core → charts → scenarios → model → screens → analyze → result → prod → app
 */
(function () {
  'use strict';
  const ZA = window.ZA;
  const h = ZA.h, fmt = ZA.fmt, md = ZA.md;
  const S = function (ja, en, id) { return { ja: ja, en: en, id: id }; };
  const t = function (v) { return ZA.t(v); };

  // 時間の単位。手を打つ単位は「1日」で、1日は8時間、1時間に1ロット25個を流す。
  // 1日200個、1週1000個。週でまとめたときの数は、日次にする前と変わらない。
  const WEEKS = 16, PT0 = 90, LOTS = 40, PIECES = 25;
  const DPW = 5, HOURS = 8, DAYS = WEEKS * DPW;
  // 何時の仕事か。昼休みは12時台。
  const HOUR_LABEL = ['8', '9', '10', '11', '13', '14', '15', '16'];
  const SAVE = 'zeva-woodshop:v2';
  const BOARD = 'zeva-woodshop:board:v2';

  /* ---------- 乱数 ---------- */
  function mulberry32(a) {
    return function () {
      a |= 0; a = a + 0x6D2B79F5 | 0;
      let x = Math.imul(a ^ a >>> 15, 1 | a);
      x = x + Math.imul(x ^ x >>> 7, 61 | x) ^ x;
      return ((x ^ x >>> 14) >>> 0) / 4294967296;
    };
  }
  function randn(r) {
    let u1 = 0, v = 0;
    while (u1 === 0) u1 = r();
    while (v === 0) v = r();
    return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * v);
  }
  // 二項。1ロット25個なので素直に回してよい。
  function binom(r, n, p) {
    if (p <= 0) return 0;
    let c = 0;
    for (let i = 0; i < n; i++) if (r() < p) c++;
    return c;
  }
  // 季節。16週の平均が0になるよう中心化する。基準の水準は動かさない。
  let SEASON_MEAN = 0;
  for (let w = 1; w <= WEEKS; w++) SEASON_MEAN += 0.6 * Math.sin(2 * Math.PI * (w - 3) / 26);
  SEASON_MEAN /= WEEKS;
  const season = function (w) { return 0.6 * Math.sin(2 * Math.PI * (w - 3) / 26) - SEASON_MEAN; };

  /* ---------- 状態 ---------- */
  let st = null;
  const state = function () { return st; };
  const setState = function (o) { st = o; };
  function fresh(scenarioId, team) {
    return {
      screen: 'prologue', scenario: scenarioId, team: team || '',
      week: 0, day: 0, pt: PT0, cfg: null,
      // 刃は流した時間ぶんだけ減り、交換周期で戻る。日をまたいで持ち越す。
      wearHrs: 0,
      stdMade: {}, scope: null, recon: {}, bought: {}, survey: null, hist: [], lots: [],
      target: null, suspect: null, controls: {},
      doe: null, flags: {}, seenTabs: {},
      // 手帳。気づき・仮説・打った手・確かめた結果を日付つきで残す。
      // 調査で現れた条件(unlocked)と、まだ盤面で知らせていない新しい手(newKnobs)もここに持つ。
      notes: [], unlocked: {}, newKnobs: [],
      // 走っている調査。同時に MAX_SURVEYS 本まで(2026-09-22 実プレイ評価で 1→2)
      surveys: []
    };
  }
  const MAX_SURVEYS = 2;
  // 走っている調査の配列。古い保存(survey が1つ)は配列に移す。
  function surveys() {
    if (!st) return [];
    if (st.survey) { st.surveys = (st.surveys || []).concat([st.survey]); st.survey = null; }
    st.surveys = st.surveys || [];
    return st.surveys;
  }
  const activeSurveys = function () { return surveys().filter(function (sv) { return !sv.voided; }); };
  // 次の区切り(いちばん早く終わる調査か、標準作業の完成)までの日数。無ければ 0。
  function daysToMilestone() {
    const ds = surveys().map(function (sv) { return sv.left; });
    if (st.pendingStd != null) ds.push(st.pendingStdLeft == null ? DPW : st.pendingStdLeft);
    return ds.length ? Math.max(1, Math.min.apply(null, ds)) : 0;
  }
  /* ---------- 手帳 ----------
   * kind: note(気づき) / hyp(仮説) / act(打った手) / check(確かめた結果) / sys(盤面からの記録)
   * text は文字列(プレイヤーが書いた)か S() の3つ組(盤面が書いた)。
   * 書いた日と、そのとき開いていた画面・タブを自動で添える。 */
  function addNote(kind, text, extra) {
    if (!st) return null;
    st.notes = st.notes || [];
    const n = Object.assign({ dn: st.day || 0, w: st.week || 0, kind: kind, text: text,
      screen: st.screen || null, tab: st.tab || null, at: Date.now() }, extra || {});
    st.notes.push(n);
    return n;
  }
  const notesOf = function (kind) { return (st && st.notes || []).filter(function (n) { return !kind || n.kind === kind; }); };
  function save() { try { localStorage.setItem(SAVE, JSON.stringify(st)); } catch (e) { /* 保存できない環境 */ } }
  function load() {
    try {
      const o = JSON.parse(localStorage.getItem(SAVE) || 'null');
      return (o && o.screen && o.scenario) ? o : null;
    } catch (e) { return null; }
  }
  function board() {
    try { return JSON.parse(localStorage.getItem(BOARD) || '[]'); } catch (e) { return []; }
  }
  function boardAdd(run) {
    const b = board();
    b.push(run);
    try { localStorage.setItem(BOARD, JSON.stringify(b.slice(-200))); } catch (e) { /* ignore */ }
  }
  const scen = function () {
    return window.WOODSHOP_SCENARIOS.filter(function (x) { return x.id === st.scenario; })[0];
  };
  const has = function (id) { return st.bought[id] != null; };

  /* ---------- 結果コード ----------
   * チームごとの端末で遊んでも集計できるよう、結果を短い文字列にする。
   * 改ざん防止ではなく、写し間違いを拾うための検査記号を末尾に付ける。 */
  function sum32(s2) {
    let a = 5381;
    for (let i = 0; i < s2.length; i++) a = ((a * 33) ^ s2.charCodeAt(i)) >>> 0;
    return a;
  }
  const B64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
  function b64(bytes) {
    let out = '';
    for (let i = 0; i < bytes.length; i += 3) {
      const a = bytes[i], b = bytes[i + 1], c = bytes[i + 2];
      out += B64[a >> 2] + B64[((a & 3) << 4) | ((b || 0) >> 4)];
      out += (b === undefined) ? '' : B64[((b & 15) << 2) | ((c || 0) >> 6)];
      out += (c === undefined) ? '' : B64[c & 63];
    }
    return out;
  }
  function unb64(s2) {
    const bytes = [];
    for (let i = 0; i < s2.length; i += 4) {
      const n = [0, 1, 2, 3].map(function (k) { return B64.indexOf(s2[i + k]); });
      bytes.push(((n[0] << 2) | (n[1] >> 4)) & 255);
      if (n[2] >= 0) bytes.push(((n[1] << 4) | (n[2] >> 2)) & 255);
      if (n[3] >= 0) bytes.push(((n[2] << 6) | n[3]) & 255);
    }
    return bytes;
  }
  const utf8 = function (s2) { return Array.from(new TextEncoder().encode(s2)); };
  const deutf8 = function (b) { return new TextDecoder().decode(new Uint8Array(b)); };
  function makeCode(run) {
    const payload = [run.team, run.sc, run.score, run.rate.toFixed(2), run.cost, run.date].join('|');
    return 'WS-' + b64(utf8(payload)) + '-' + sum32(payload).toString(36).slice(-4).toUpperCase();
  }
  function readCode(code) {
    const m = String(code).trim().match(/^WS-([A-Za-z0-9\-_]+)-([A-Z0-9]{1,4})$/);
    if (!m) return null;
    let payload;
    try { payload = deutf8(unb64(m[1])); } catch (e) { return null; }
    if (sum32(payload).toString(36).slice(-4).toUpperCase() !== m[2]) return null;
    const p = payload.split('|');
    if (p.length !== 6) return null;
    return { team: p[0], sc: p[1], score: +p[2], rate: +p[3], cost: +p[4], date: p[5] };
  }

  /* ---------- 画面の部品 ---------- */
  const CAST = {
    boss: { face: '👔', cls: 'boss', name: S('工場長', 'Plant manager', 'Manajer pabrik') },
    lead: { face: '🧢', cls: '', name: S('班長 タケダ', 'Takeda, line leader', 'Takeda, leader lini') },
    eng: { face: '📐', cls: 'eng', name: S('工程技術者 リン', 'Lin, process engineer', 'Lin, insinyur proses') }
  };
  function talk(who, text) {
    const c = CAST[who];
    return h('div.g-talk' + (c.cls ? '.' + c.cls : ''), null,
      h('div.g-face', { text: c.face }),
      h('div.g-bubble', null, h('span.who', { text: t(c.name) }), h('div', { html: md(t(text)) })));
  }
  function meter(k, v, s2, cls, frac) {
    const el = h('div.g-meter' + (cls ? '.' + cls : ''), null,
      h('div.k', { text: t(k) }), h('div.v', { html: v }), s2 ? h('div.s', { text: t(s2) }) : null);
    if (frac != null) el.appendChild(h('div.g-bar', null, h('i', { style: { width: Math.max(0, Math.min(1, frac)) * 100 + '%' } })));
    return el;
  }
  function btn(label, fn, cls) {
    // 'btn-sm btn-ghost' のように空白で複数渡されるので、1つずつクラスにする。
    // 空白を含んだまま classList.add に渡すと例外になり、画面ごと描画されない(実プレイで検出 2026-09-22)。
    const cs = (cls || '').split(/\s+/).filter(Boolean).map(function (c) { return '.' + c; }).join('');
    const b = h('button.btn' + cs, { type: 'button', text: t(label) });
    b.addEventListener('click', fn);
    return b;
  }
  function act(title, desc, cost, fn, disabled) {
    const b = h('button.g-act', { type: 'button', disabled: !!disabled },
      h('b', { text: t(title) }), h('span', { text: t(desc) }), cost ? h('span.cost', { text: t(cost) }) : null);
    if (!disabled) b.addEventListener('click', fn);
    return b;
  }
  function note(lines) {
    const ul = h('ul');
    lines.forEach(function (l) { ul.appendChild(h('li', { html: md(t(l)) })); });
    return h('div.g-note', null, ul);
  }
  function svgBox(title, svg, foot) {
    return h('div.g-chart', null,
      title ? h('h4', { text: t(title) }) : null,
      h('div', { html: svg }),
      foot ? h('div.muted', { style: { fontSize: '11.5px', marginTop: '6px' }, html: md(t(foot)) }) : null);
  }
  // 切替の小さなボタン列
  function switcher(label, opts, cur, set) {
    const row = h('div.row', { style: { gap: '6px', flexWrap: 'wrap', alignItems: 'center', margin: '4px 0 10px' } },
      h('span.muted', { style: { fontSize: '12px', fontWeight: '700' }, text: t(label) }));
    opts.forEach(function (o) {
      const b = h('button.chip' + (cur === o[0] ? '.tone-navy' : ''), { type: 'button', text: t(o[1]), disabled: !!o[2] });
      b.style.cssText = 'cursor:pointer;border:1px solid var(--border)' + (o[2] ? ';opacity:.4;cursor:not-allowed' : '');
      if (!o[2]) b.addEventListener('click', function () { set(o[0]); save(); route(); });
      row.appendChild(b);
    });
    return row;
  }
  const n1 = function (x) { return fmt(x, 1); };
  const sep = function () { return t(S('　/　', ' / ', ' / ')); };
  const wkUnit = function () { return t(S('週', ' wk', ' minggu')); };
  const yen = function (man) {
    const v = man * 10000;
    return S(man + '万円/月', '¥' + v.toLocaleString('en-US') + '/month', '¥' + v.toLocaleString('id-ID') + '/bulan');
  };

  /* ---------- 育成の見た目 ---------- */
  const RANK = function (v) { return v >= 90 ? 'S' : v >= 75 ? 'A' : v >= 60 ? 'B' : v >= 40 ? 'C' : v >= 20 ? 'D' : 'E'; };
  function paramPanel(rows) {
    const box = h('div.g-params');
    rows.forEach(function (p) {
      box.appendChild(h('div.g-param', null,
        h('span.pk', { text: t(p.k) }),
        h('span.pr.r' + RANK(p.v), { text: RANK(p.v) }),
        h('span.pb', null, h('i', { style: { width: Math.max(2, p.v) + '%', background: p.c } })),
        h('span.pv', { text: String(p.v) })));
    });
    return box;
  }
  const ACT_ICON = { std: '📏', survey: '🔬', tune: '🔧', run: '▶' };
  // その日に手帳へ何か書いたか(盤面が書いた sys は数えない)
  const memoOn = function (dn) {
    return (st.notes || []).some(function (n) { return n.kind !== 'sys' && n.dn === dn; });
  };
  // 週のカレンダー。今日が入っている週は、日ごとの升目に開く。手帳を書いた日には📝を添える。
  function weekStrip() {
    const box = h('div.g-cal');
    const dh = st.dayHist || [];
    const curW = Math.floor(st.day / DPW) + 1;
    for (let w = 1; w <= WEEKS; w++) {
      if (w === curW) {
        for (let i = 1; i <= DPW; i++) {
          const dn = (w - 1) * DPW + i;
          const rec = dh.filter(function (x) { return x.dn === dn; })[0];
          const cls = dn === st.day + 1 ? '.now' : rec ? '.past' : '';
          box.appendChild(h('span.g-cell.g-day' + cls + (memoOn(dn) ? '.memo' : ''), null,
            h('b', { text: w + '-' + i }),
            h('i', { text: rec ? (ACT_ICON[rec.act] || '▶') : (dn === st.day + 1 ? '◆' : '') })));
        }
      } else {
        const rec = st.hist.filter(function (x) { return x.w === w; })[0];
        const memo = (st.notes || []).some(function (n) { return n.kind !== 'sys' && n.w === w; });
        box.appendChild(h('span.g-cell' + (rec ? '.past' : '') + (memo ? '.memo' : ''), null,
          h('b', { text: String(w) }),
          h('i', { text: rec ? (ACT_ICON[rec.act] || '▶') : '' })));
      }
    }
    return box;
  }

  /* ---------- 描画と進行 ---------- */
  const root = function () { return document.getElementById('g-main'); };
  function show(el) { const m = root(); m.innerHTML = ''; m.appendChild(el); window.scrollTo(0, 0); }
  // 画面は各ファイルが WS.screens に登録する。生産性のラインは WS.prodScreens。
  const screens = {};
  const prodScreens = {};
  function route() {
    if (!st || !st.screen) { (screens.title || function () {})(); return; }
    const sc = st.scenario ? window.WOODSHOP_SCENARIOS.filter(function (x) { return x.id === st.scenario; })[0] : null;
    const P = window.WOODSHOP_PROD || prodScreens;
    if (sc && sc.kind === 'prod' && P[st.screen]) { P[st.screen](); return; }
    (screens[st.screen] || screens.title)();
  }

  // 各ファイルが定義したものを載せる棚。読み込み順に前から後ろへ渡る。
  const G = {};
  // 木工ライン丁（生産性）の棚。品質ラインの G と分けておく。
  const P = {};

  window.WS = {
    G: G, P: P,
    ZA: ZA, h: h, t: t, S: S, md: md, fmt: fmt, n1: n1, sep: sep, wkUnit: wkUnit, yen: yen,
    WEEKS: WEEKS, PT0: PT0, LOTS: LOTS, PIECES: PIECES,
    DPW: DPW, HOURS: HOURS, DAYS: DAYS, HOUR_LABEL: HOUR_LABEL,
    mulberry32: mulberry32, randn: randn, binom: binom, season: season,
    state: state, setState: setState, fresh: fresh, save: save, load: load,
    board: board, boardAdd: boardAdd, scen: scen, has: has,
    addNote: addNote, notesOf: notesOf, memoOn: memoOn,
    MAX_SURVEYS: MAX_SURVEYS, surveys: surveys, activeSurveys: activeSurveys, daysToMilestone: daysToMilestone,
    makeCode: makeCode, readCode: readCode,
    CAST: CAST, talk: talk, meter: meter, btn: btn, act: act, note: note, svgBox: svgBox, switcher: switcher,
    RANK: RANK, paramPanel: paramPanel, weekStrip: weekStrip,
    show: show, route: route, screens: screens, prodScreens: prodScreens
  };
})();
