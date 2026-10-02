/* ZEVA Academy — application shell, router and pages. */
(function () {
  'use strict';
  const ZA = window.ZA;
  const h = ZA.h, t = ZA.t, u = ZA.u, md = ZA.md;
  const S = function (ja, en, id) { return { ja: ja, en: en, id: id }; };
  const $ = function (sel) { return document.querySelector(sel); };
  const view = function () { return $('#view'); };

  /* ---------- language & theme ---------- */
  function detectLang() {
    const saved = ZA.store.get('lang');
    if (saved && ZA.LANGS.indexOf(saved) >= 0) return saved;
    const nav = (navigator.language || 'en').toLowerCase();
    if (nav.indexOf('ja') === 0) return 'ja';
    if (nav.indexOf('id') === 0 || nav.indexOf('in') === 0 || nav.indexOf('ms') === 0) return 'id';
    return 'en';
  }
  function setLang(l) {
    ZA.lang = l;
    ZA.store.set('lang', l);
    document.documentElement.lang = l;
    renderChrome();
    route();
  }
  function applyTheme() {
    const th = ZA.store.get('theme');
    if (th === 'dark' || th === 'light') document.documentElement.setAttribute('data-theme', th);
    else document.documentElement.removeAttribute('data-theme');
  }
  function toggleTheme() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark' ||
      (!document.documentElement.getAttribute('data-theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    ZA.store.set('theme', isDark ? 'light' : 'dark');
    applyTheme();
  }

  /* ---------- chrome ---------- */
  function renderChrome() {
    const top = $('#topbar');
    top.innerHTML = '';
    const nav = h('nav.nav#mainnav', { 'aria-label': 'main' },
      navLink('#/', u('navHome'), 'home'),
      navLink('#/path', u('navPath'), 'path'),
      navLink('#/placement', u('navPlacement'), 'placement'),
      navLink('game/', u('navSim'), 'sim'),
      navLink('#/glossary', u('navGlossary'), 'glossary'),
      navLink('#/formulas', u('navFormulas'), 'formulas'),
      navLink('#/about', u('navAbout'), 'about'),
      navLink('#/ask', u('navAsk'), 'ask'));
    const sel = h('select.lang-select', { 'aria-label': u('language') });
    ZA.LANGS.forEach(function (l) { sel.appendChild(h('option', { value: l, text: ZA.langNames[l], selected: l === ZA.lang })); });
    sel.addEventListener('change', function () { setLang(sel.value); });
    const themeBtn = h('button.icon-btn', { type: 'button', title: u('theme'), 'aria-label': u('theme'), text: '◐' });
    themeBtn.addEventListener('click', toggleTheme);
    const menuBtn = h('button.icon-btn.menu-btn', { type: 'button', 'aria-label': u('menu'), text: '☰' });
    menuBtn.addEventListener('click', function () { nav.classList.toggle('open'); });
    top.appendChild(h('div.topbar-inner', null,
      h('a.brand', { href: '#/' }, h('span.brand-mark', { text: 'Z' }), h('span', null, u('siteName'), h('small', { text: u('siteSub') }))),
      nav,
      h('div.topbar-tools', null, sel, themeBtn, menuBtn)));
    $('#footer').innerHTML = '';
    $('#footer').appendChild(h('div', { text: u('footer') }));
    document.title = u('siteName') + ' — ' + u('siteSub');
  }
  function navLink(href, label, key) { return h('a', { href: href, 'data-nav': key, text: label }); }
  function markNav(key) {
    document.querySelectorAll('#mainnav a').forEach(function (a) { a.classList.toggle('active', a.getAttribute('data-nav') === key); });
    const nav = $('#mainnav'); if (nav) nav.classList.remove('open');
  }

  /* ---------- helpers ---------- */
  function trackById(id) { return ZA.tracks.find(function (x) { return x.id === id; }); }
  function trackStats(tid) {
    const mods = ZA.modulesOf(tid);
    const done = mods.filter(function (m) { return ZA.progress.passed(m.id); }).length;
    const minutes = mods.reduce(function (s, m) { return s + (m.minutes || 0); }, 0);
    return { mods: mods, done: done, total: mods.length, minutes: minutes, ratio: mods.length ? done / mods.length : 0 };
  }
  function nextModule() {
    const all = ZA.orderedModules();
    return all.find(function (m) { return !ZA.progress.passed(m.id); }) || all[0];
  }
  function statusChip(m) {
    if (ZA.progress.passed(m.id)) return h('span.chip.tone-green', { text: '✓ ' + u('completed') });
    if (ZA.store.state().visited[m.id]) return h('span.chip.tone-amber', { text: u('inProgress') });
    return h('span.chip', { text: u('notStarted') });
  }
  function progressBar(ratio, color) {
    const bar = h('div.progressbar', null, h('span', { style: { width: Math.round(ratio * 100) + '%' } }));
    if (color) bar.style.setProperty('--c', 'var(--' + color + ')');
    return bar;
  }

  /* ---------- pages ---------- */
  function heroVisual() {
    // two distributions with the same mean: wide vs narrow
    const W = 360, H = 220, cx = 180, base = 180;
    const curve = function (sd, amp) {
      let d = '';
      for (let x = 10; x <= 350; x += 2) {
        const z = (x - cx) / sd;
        d += (x === 10 ? 'M' : 'L') + x + ',' + (base - amp * Math.exp(-z * z / 2));
      }
      return d;
    };
    const s = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="variation">' +
      '<line x1="10" y1="' + base + '" x2="350" y2="' + base + '" stroke="rgba(255,255,255,.35)"/>' +
      '<rect x="95" y="20" width="170" height="' + (base - 20) + '" fill="rgba(120,220,160,.12)" stroke="rgba(120,220,160,.6)" stroke-dasharray="5 4"/>' +
      '<path d="' + curve(62, 58) + '" fill="rgba(255,120,110,.18)" stroke="#ff8a7a" stroke-width="2.5"/>' +
      '<path d="' + curve(20, 150) + '" fill="rgba(120,200,255,.22)" stroke="#8fd0ff" stroke-width="3"/>' +
      '<line x1="' + cx + '" y1="14" x2="' + cx + '" y2="' + base + '" stroke="#fff" stroke-dasharray="3 4"/>' +
      '<text x="' + cx + '" y="200" fill="#fff" font-size="12" text-anchor="middle" font-weight="700">' + ZA.esc(t(S('平均は同じ', 'Same average', 'Rata-rata sama'))) + '</text>' +
      '<text x="100" y="36" fill="rgba(160,240,190,.95)" font-size="11" font-weight="700">' + ZA.esc(t(S('良品保証範囲', 'Good-part range', 'Rentang produk baik'))) + '</text>' +
      '<text x="300" y="150" fill="#ff9d90" font-size="12" font-weight="700" text-anchor="middle">' + ZA.esc(t(S('バラツキ大', 'High variation', 'Variasi besar'))) + '</text>' +
      '<text x="238" y="52" fill="#a8dcff" font-size="12" font-weight="700">' + ZA.esc(t(S('バラツキ小', 'Low variation', 'Variasi kecil'))) + '</text>' +
      '</svg>';
    return h('div.hero-visual', { html: s });
  }

  function pageHome() {
    markNav('home');
    const v = view();
    const nm = nextModule();
    const started = Object.keys(ZA.store.state().done).length > 0 || Object.keys(ZA.store.state().visited).length > 0;
    v.appendChild(h('section.hero', null, h('div.hero-grid', null,
      h('div', null,
        h('div.hero-kicker', { text: u('heroKicker') }),
        h('h1', { text: u('heroTitle') }),
        h('p', { text: u('heroLead') }),
        h('div.row', { style: { marginTop: '18px' } },
          nm ? h('a.btn.btn-primary', { href: '#/m/' + nm.id, text: (started ? u('ctaContinue') : u('ctaStart')) + ' →' }) : null,
          h('a.btn', { href: '#/placement', text: u('ctaPlacement') })),
        h('div.hero-q', null, h('span', { text: u('heroQ') }),
          h('a.chip', { href: '#/track/z1', style: { background: 'rgba(255,255,255,.14)', color: '#fff' }, text: u('heroQyes') }),
          h('a.chip', { href: '#/track/ie', style: { background: 'rgba(255,255,255,.14)', color: '#fff' }, text: u('heroQno') }))),
      heroVisual())));

    v.appendChild(h('div.spacer'));
    v.appendChild(h('h2.section-title', { text: u('stagesTitle') }));
    v.appendChild(h('p.lead', { text: u('stagesLead') }));
    const rail = h('div.stage-rail', { style: { marginTop: '18px' } });
    ZA.tracks.forEach(function (tr) {
      const s = trackStats(tr.id);
      rail.appendChild(h('a.stage-card.c-' + tr.color, { href: '#/track/' + tr.id },
        h('div.stage-tag', { text: t(tr.tag) }),
        h('h3', null, h('span', { text: tr.icon }), t(tr.name)),
        h('p', { text: t(tr.desc) }),
        h('div.stage-meta', null, h('span.chip', { text: u('modulesCount', { n: s.total }) }), h('span.chip', { text: u('minutesTotal', { n: s.minutes }) })),
        h('div.muted', { style: { fontSize: '13px' }, text: u('audience') + '：' + t(tr.audience) }),
        h('div', null, progressBar(s.ratio, tr.color), h('div.muted', { style: { fontSize: '12px', marginTop: '4px' }, text: s.done + ' / ' + s.total + ' ' + u('completed') }))));
    });
    v.appendChild(rail);

    // 学習パスとは別の、個別モードとしての入口。4ステージのあとに置く。
    v.appendChild(h('a.sim-card', { href: 'game/' },
      h('div.sim-mark', { text: '🪵' }),
      h('div.sim-txt', null,
        h('div.sim-tag', { text: t(S('個別モード ・ 手を動かす', 'Separate mode · hands on', 'Mode terpisah · praktik')) }),
        h('h3', { text: t(S('現場再建記', 'Shopfloor Rebuild', 'Membangun Ulang Lantai Produksi')) }),
        h('p', { text: t(S('16週のライン再建シミュレーション。木工・成形・組立の6本のラインから1つを預かり、調査ポイント90と80日を配って、標準化・調査・層別・条件決め・維持まで自分で決めます。動かせる条件は調べるほど増え、仮説と気づきは手帳に残ります。ラインごとに答えが違うので、チームを分けて競えます。',
          'A sixteen-week line-rebuilding simulation. Take one of six lines (woodwork, moulding, assembly), spend ninety survey points across eighty days, and decide for yourself when to standardise, what to measure, how to stratify, where to set the bands and what to hold. The conditions you can move grow as you investigate, and your hypotheses and insights go into a notebook. Each line has a different answer, so teams can compete.',
          'Simulasi membangun ulang lini selama enam belas minggu. Ambil satu dari enam lini (kayu, molding, perakitan), belanjakan sembilan puluh poin survei sepanjang delapan puluh hari, dan putuskan sendiri kapan membakukan, apa yang diukur, bagaimana stratifikasinya, di mana menetapkan band, dan apa yang dipertahankan. Kondisi yang dapat digerakkan bertambah seiring penyelidikan, dan hipotesis serta temuan Anda tersimpan di buku catatan. Tiap lini punya jawaban berbeda, sehingga tim dapat bersaing.')) }),
        h('div.stage-meta', null,
          h('span.chip', { text: t(S('6ライン', '6 lines', '6 lini')) }),
          h('span.chip', { text: t(S('不良率 ・ 生産性', 'defects · productivity', 'cacat · produktivitas')) }),
          h('span.chip', { text: t(S('チーム対抗', 'team scoring', 'skor tim')) }))),
      h('div.sim-go', { text: '→' })));

    v.appendChild(h('div.spacer'));
    const why = h('div.why');
    why.appendChild(h('div', null,
      h('h2.section-title', { text: u('whyTitle') }),
      h('p.lead', { html: md(S(
        'ムダ取りで「平均」が良くなっても、**バラツキ**が大きい工程は、今日のデータが明日を予測しません。データが信頼できなければ、正しい改善アクションも起こせません。ZEVAはこの**根底ロジック**から出発し、バラツキを制御下に置いたうえで**理論値**への収束を目指します。',
        'Removing waste may improve the **average**, but in a process with large **variation** today’s data do not predict tomorrow. Without reliable data you cannot take the right action. ZEVA starts from this **root logic**: bring variation under control, then converge on the **theoretical value**.',
        'Menghapus pemborosan mungkin memperbaiki **rata-rata**, tetapi pada proses dengan **variasi** besar, data hari ini tidak memprediksi besok. Tanpa data andal, aksi yang tepat tak bisa diambil. ZEVA berangkat dari **logika dasar** ini: kendalikan variasi, lalu mendekati **nilai teoretis**.')) }),
      h('div.row', null, h('a.btn', { href: '#/m/z1-02', text: t(S('根底ロジックを学ぶ →', 'Learn the root logic →', 'Pelajari logika dasar →')) }))));
    why.appendChild(ZA.renderBlock({ type: 'diagram', name: 'zeva-house' }));
    v.appendChild(why);

    v.appendChild(h('div.spacer'));
    v.appendChild(h('h2.section-title', { text: u('featureTitle') }));
    const feats = [
      ['🪜', S('段階的な構成', 'Step-by-step structure', 'Struktur bertahap'), S('基礎IE → ZEVA基礎 → 実践 → 応用。レベル診断で最適なスタート地点がわかります。', 'IE basics → ZEVA foundations → practice → advanced. The placement test finds your best starting point.', 'Dasar IE → dasar ZEVA → praktik → lanjutan. Tes penempatan menentukan titik awal terbaik.')],
      ['🧪', S('触って学ぶ', 'Learn by doing', 'Belajar sambil mencoba'), S('OEE・ラインバランス・管理図・V.Score・トリアージなど20種類以上のシミュレーター。', '20+ simulators: OEE, line balance, control charts, V.Score, triage and more.', '20+ simulator: OEE, keseimbangan lini, peta kendali, V.Score, triase, dll.')],
      ['✅', S('理解度チェック', 'Check understanding', 'Cek pemahaman'), S('各モジュールに確認テスト。80%以上で修了。進捗はブラウザに保存されます。', 'A quiz in every module; 80% to complete. Progress is saved in your browser.', 'Kuis di setiap modul; 80% untuk lulus. Kemajuan disimpan di browser.')],
      ['🌏', S('3言語対応', 'Three languages', 'Tiga bahasa'), S('日本語・English・Bahasa Indonesia をいつでも切り替え可能。用語集も3言語。', 'Switch anytime between Japanese, English and Indonesian — glossary included.', 'Ganti kapan saja antara Jepang, Inggris, dan Indonesia — termasuk glosarium.')],
    ];
    v.appendChild(h('div.grid.grid-4', { style: { marginTop: '14px' } }, feats.map(function (f) {
      return h('div.card.feature', null, h('div.fi', { text: f[0] }), h('div', null, h('h4', { text: t(f[1]) }), h('p', { text: t(f[2]) })));
    })));

    // progress summary
    const all = ZA.orderedModules();
    const done = all.filter(function (m) { return ZA.progress.passed(m.id); }).length;
    if (done) {
      v.appendChild(h('div.spacer'));
      const resetBtn = h('button.btn.btn-sm.btn-ghost', { type: 'button', text: u('resetProgress') });
      resetBtn.addEventListener('click', function () { if (window.confirm(u('resetConfirm'))) { ZA.store.reset(); route(); } });
      v.appendChild(h('div.card', null,
        h('div.row', { style: { justifyContent: 'space-between' } }, h('h3', { style: { margin: 0 }, text: u('yourProgress') }), resetBtn),
        h('div', { style: { margin: '10px 0 4px', fontWeight: 700 }, text: u('overall') + ' ' + done + ' / ' + all.length }),
        progressBar(done / all.length)));
    }
  }

  function pagePath() {
    markNav('path');
    const v = view();
    v.appendChild(h('h1.section-title', { text: u('navPath') }));
    v.appendChild(h('p.lead', { text: u('stagesLead') }));
    v.appendChild(ZA.renderBlock({ type: 'diagram', name: 'learning-map' }));
    ZA.tracks.forEach(function (tr) {
      const s = trackStats(tr.id);
      const sec = h('section.c-' + tr.color, { style: { marginTop: '28px' } });
      sec.appendChild(h('div.row', { style: { justifyContent: 'space-between', marginBottom: '10px' } },
        h('div', null, h('div.stage-tag', { style: { fontSize: '12px', fontWeight: 700, color: 'var(--c)' }, text: t(tr.tag) }), h('h2', { style: { margin: 0 } }, h('a', { href: '#/track/' + tr.id, style: { color: 'inherit' }, text: tr.icon + ' ' + t(tr.name) }))),
        h('div', { style: { minWidth: '180px' } }, progressBar(s.ratio, tr.color), h('div.muted', { style: { fontSize: '12px' }, text: s.done + ' / ' + s.total }))));
      sec.appendChild(moduleList(s.mods));
      v.appendChild(sec);
    });
  }

  function moduleList(mods) {
    return h('div.module-list', null, mods.map(function (m) {
      const tr = trackById(m.track);
      return h('a.module-row', { href: '#/m/' + m.id },
        h('div.module-num', null, m.icon || '📘', ZA.progress.passed(m.id) ? h('span.ok', { text: '✓' }) : null),
        h('div', null,
          h('div.muted', { style: { fontSize: '12px', fontWeight: 700 }, text: (tr ? 'STAGE ' + tr.stage + ' · ' : '') + (m.order < 10 ? '0' : '') + m.order }),
          h('h3', { text: t(m.title) }), h('p', { text: t(m.summary) })),
        h('div.side', null, statusChip(m), h('span.chip', { text: '⏱ ' + u('minutes', { n: m.minutes || '—' }) })));
    }));
  }

  function pageTrack(id) {
    markNav('path');
    const tr = trackById(id);
    const v = view();
    if (!tr) { v.appendChild(h('p', { text: u('moduleNotFound') })); return; }
    const s = trackStats(id);
    const idx = ZA.tracks.indexOf(tr);
    const head = h('div.track-head.c-' + tr.color, null,
      h('div', null,
        h('div.breadcrumb', null, h('a', { href: '#/path', text: u('navPath') }), '›', h('span', { text: t(tr.name) })),
        h('div', { style: { fontSize: '13px', fontWeight: 700, color: 'var(--c)' }, text: t(tr.tag) }),
        h('h1.section-title', { text: tr.icon + ' ' + t(tr.name) }),
        h('p.lead', { text: t(tr.desc) }),
        h('div.row', null, h('span.chip', { text: u('audience') + '：' + t(tr.audience) }), h('span.chip', { text: u('modulesCount', { n: s.total }) }), h('span.chip', { text: u('minutesTotal', { n: s.minutes }) }))),
      h('div.card', { style: { minWidth: '240px' } },
        h('div', { style: { fontWeight: 700 }, text: u('yourProgress') }),
        h('div', { style: { fontSize: '28px', fontWeight: 800 }, text: s.done + ' / ' + s.total }),
        progressBar(s.ratio, tr.color)));
    v.appendChild(head);
    v.appendChild(moduleList(s.mods));
    const nav = h('div.pager');
    if (idx > 0) nav.appendChild(h('a', { href: '#/track/' + ZA.tracks[idx - 1].id }, h('small', { text: '← ' + u('prev') }), t(ZA.tracks[idx - 1].name)));
    if (idx < ZA.tracks.length - 1) nav.appendChild(h('a.nx', { href: '#/track/' + ZA.tracks[idx + 1].id }, h('small', { text: u('next') + ' →' }), t(ZA.tracks[idx + 1].name)));
    v.appendChild(nav);
  }

  /* ---------- module page ---------- */
  let observer = null;
  function pageModule(id, focus) {
    markNav('path');
    const m = ZA.modules[id];
    const v = view();
    if (!m) { v.appendChild(h('div.card', null, h('h2', { text: u('moduleNotFound') }), h('p', { text: u('comingSoon') }), h('a.btn', { href: '#/path', text: u('navPath') }))); return; }
    ZA.progress.markVisited(id);
    const tr = trackById(m.track) || ZA.tracks[0];
    const all = ZA.orderedModules();
    const pos = all.indexOf(m);
    const prev = all[pos - 1], next = all[pos + 1];

    const layout = h('div.module-layout.c-' + tr.color);
    // TOC
    const toc = h('aside.toc');
    toc.appendChild(h('div.toc-track', { text: t(tr.tag) + ' — ' + t(tr.name) }));
    const ol = h('ol');
    const tocLinks = {};
    (m.sections || []).forEach(function (sec, i) {
      const sid = 'sec-' + i;
      const a = h('a', { href: '#/m/' + id + '/' + sid, 'data-sec': sid }, h('span.dot', { text: String(i + 1) }), h('span', { html: md(sec.title) }));
      a.addEventListener('click', function (e) { e.preventDefault(); scrollToId(sid); });
      if (ZA.store.state().read[id] && ZA.store.state().read[id][sid]) a.classList.add('read');
      tocLinks[sid] = a;
      ol.appendChild(h('li', null, a));
    });
    const qa = h('a', { href: '#/m/' + id + '/quiz', 'data-sec': 'quiz' }, h('span.dot', { text: '?' }), h('span', { text: u('quiz') }));
    qa.addEventListener('click', function (e) { e.preventDefault(); scrollToId('quiz'); });
    if (ZA.progress.passed(id)) qa.classList.add('read');
    tocLinks.quiz = qa;
    ol.appendChild(h('li', null, qa));
    toc.appendChild(h('div', { style: { fontSize: '13px', fontWeight: 700, marginBottom: '6px' }, text: u('contents') }));
    toc.appendChild(ol);
    const others = h('details', { open: window.innerWidth > 1000 });
    others.appendChild(h('summary', { text: t(tr.name) }));
    const ol2 = h('ol.mod-nav');
    ZA.modulesOf(tr.id).forEach(function (mm) {
      const a = h('a', { href: '#/m/' + mm.id }, h('span.dot', { text: ZA.progress.passed(mm.id) ? '✓' : String(mm.order) }), h('span', { text: t(mm.title) }));
      if (mm.id === id) a.classList.add('active');
      if (ZA.progress.passed(mm.id)) a.classList.add('read');
      ol2.appendChild(h('li', null, a));
    });
    others.appendChild(ol2);
    toc.appendChild(others);
    layout.appendChild(toc);

    // article
    const art = h('article.article');
    art.appendChild(h('div.breadcrumb', null,
      h('a', { href: '#/path', text: u('navPath') }), '›', h('a', { href: '#/track/' + tr.id, text: t(tr.name) }), '›', h('span', { text: t(m.title) })));
    const header = h('header.mod-header', null,
      h('div.row', null,
        h('span.chip.tone-' + (tr.color === 'teal' ? 'teal' : tr.color === 'green' ? 'green' : tr.color === 'blue' ? 'blue' : 'navy'), { text: t(tr.tag) }),
        h('span.chip', { text: '⏱ ' + u('minutes', { n: m.minutes || '—' }) }),
        m.level ? h('span.chip', { text: u('level') + ' ' + '★'.repeat(m.level) + '☆'.repeat(Math.max(0, 3 - m.level)) }) : null,
        statusChip(m)),
      h('h1', null, h('span', { text: m.icon || '📘' }), h('span', { text: t(m.title) })),
      h('p.summary', { html: md(m.summary) }));
    if (m.objectives && m.objectives.length) {
      header.appendChild(h('div.objectives', null, h('h4', { text: u('objectives') }), h('ul', null, m.objectives.map(function (o) { return h('li', { html: md(o) }); }))));
    }
    if (m.prereq && m.prereq.length) {
      header.appendChild(h('div.row', { style: { marginTop: '12px', fontSize: '14px' } }, h('span.muted', { text: u('prereq') + '：' }),
        m.prereq.map(function (pid) { const pm = ZA.modules[pid]; return pm ? h('a.chip', { href: '#/m/' + pid, text: (ZA.progress.passed(pid) ? '✓ ' : '') + t(pm.title) }) : null; })));
    }
    art.appendChild(header);

    (m.sections || []).forEach(function (sec, i) {
      const el = h('section.sec#sec-' + i, { 'data-sec': 'sec-' + i });
      el.appendChild(h('h2', null, h('span.num', { text: String(i + 1).padStart(2, '0') }), h('span', { html: md(sec.title) })));
      (sec.blocks || []).forEach(function (b) { el.appendChild(ZA.renderBlock(b)); });
      art.appendChild(el);
    });

    if (m.keyPoints && m.keyPoints.length) {
      art.appendChild(h('div.keypoints', null, h('h2', { text: '📌 ' + u('keyPoints') }), h('ol', null, m.keyPoints.map(function (k) { return h('li', { html: md(k) }); }))));
    }
    art.appendChild(renderQuiz(m));

    const pager = h('div.pager');
    if (prev) pager.appendChild(h('a', { href: '#/m/' + prev.id }, h('small', { text: '← ' + u('prev') }), t(prev.title)));
    if (next) pager.appendChild(h('a.nx', { href: '#/m/' + next.id }, h('small', { text: u('next') + ' →' }), t(next.title)));
    art.appendChild(pager);
    layout.appendChild(art);
    v.appendChild(layout);

    // scroll spy
    if (observer) observer.disconnect();
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          const sid = en.target.getAttribute('data-sec');
          Object.keys(tocLinks).forEach(function (k) { tocLinks[k].classList.toggle('active', k === sid); });
          if (sid && sid !== 'quiz') { ZA.progress.markSection(id, sid); tocLinks[sid].classList.add('read'); }
        });
      }, { rootMargin: '-30% 0px -60% 0px' });
      art.querySelectorAll('[data-sec]').forEach(function (el) { observer.observe(el); });
    }
    if (focus) setTimeout(function () { scrollToId(focus); }, 30);
  }

  function scrollToId(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function renderQuiz(m) {
    const box = h('section.quiz#quiz', { 'data-sec': 'quiz' });
    const qs = m.quiz || [];
    box.appendChild(h('h2', null, h('span', { text: '📝' }), h('span', { text: u('quiz') })));
    const best = ZA.progress.score(m.id);
    box.appendChild(h('p.muted', { text: u('quizLead', { n: qs.length }) + (best != null ? '  ' + u('best') + ': ' + Math.round(best * 100) + '%' : '') }));
    const answers = new Array(qs.length).fill(null);
    const itemEls = [];
    qs.forEach(function (q, i) {
      const it = h('div.qitem');
      it.appendChild(h('div.qn', null, h('span.n', { text: 'Q' + (i + 1) }), h('span', { html: md(q.q) })));
      const list = h('div.choices');
      const btns = (q.choices || []).map(function (c, j) {
        const b = h('button.choice', { type: 'button' }, h('span.mk', { text: String.fromCharCode(65 + j) }), h('span', { html: md(c) }));
        b.addEventListener('click', function () {
          if (box.classList.contains('graded')) return;
          answers[i] = j;
          btns.forEach(function (x, k) { x.classList.toggle('sel', k === j); });
        });
        list.appendChild(b);
        return b;
      });
      it.appendChild(list);
      const fb = h('div');
      it.appendChild(fb);
      itemEls.push({ btns: btns, fb: fb, q: q });
      box.appendChild(it);
    });
    const result = h('div');
    const submit = h('button.btn.btn-primary', { type: 'button', text: u('submit') });
    submit.addEventListener('click', function () {
      if (answers.some(function (a) { return a == null; })) {
        result.className = 'quiz-result fail'; result.textContent = u('answerAll'); return;
      }
      box.classList.add('graded');
      let score = 0;
      itemEls.forEach(function (ie, i) {
        const ok = answers[i] === ie.q.answer;
        if (ok) score++;
        ie.btns.forEach(function (b, k) {
          b.disabled = true;
          b.classList.remove('sel');
          if (k === ie.q.answer) b.classList.add('right');
          else if (k === answers[i]) b.classList.add('wrong');
        });
        ie.fb.className = 'feedback ' + (ok ? 'ok' : 'ng');
        ie.fb.innerHTML = '<b>' + ZA.esc(u(ok ? 'correct' : 'incorrect')) + '</b>' + (ie.q.explain ? md(ie.q.explain) : '');
      });
      const ratio = qs.length ? score / qs.length : 0;
      ZA.progress.setQuiz(m.id, ratio);
      const pass = ratio >= 0.8;
      result.className = 'quiz-result ' + (pass ? 'pass' : 'fail');
      result.innerHTML = '';
      const retry = h('button.btn.btn-sm', { type: 'button', text: '↺ ' + u('retry') });
      retry.addEventListener('click', function () { const n = renderQuiz(m); box.replaceWith(n); n.scrollIntoView({ behavior: 'smooth' }); });
      result.appendChild(h('div', null, h('div', { text: u('scoreIs', { s: score, n: qs.length, p: Math.round(ratio * 100) + '%' }) }), h('div', { style: { fontWeight: 500, fontSize: '15px' }, text: pass ? u('passMsg') : u('failMsg') })));
      result.appendChild(retry);
      submit.remove();
    });
    box.appendChild(h('div.row', { style: { marginTop: '16px' } }, submit));
    box.appendChild(result);
    return box;
  }

  /* ---------- glossary ---------- */
  function pageGlossary(focusId) {
    markNav('glossary');
    const v = view();
    v.appendChild(h('h1.section-title', { text: u('glossaryTitle') }));
    v.appendChild(h('p.lead', { text: u('glossaryLead') + ' (' + ZA.glossary.length + ')' }));
    const input = h('input.gl-search', { type: 'search', placeholder: u('search'), 'aria-label': u('search') });
    let cat = 'all';
    const cats = [['all', u('all')], ['ie', u('catIe')], ['stat', u('catStat')], ['qc', u('catQc')], ['zeva', u('catZeva')]];
    const catBtns = h('div.row', null, cats.map(function (c) {
      const b = h('button.btn.btn-sm', { type: 'button', text: c[1] });
      b.addEventListener('click', function () { cat = c[0]; draw(); });
      b.dataset.cat = c[0];
      return b;
    }));
    v.appendChild(h('div.gl-tools', null, input, catBtns));
    const list = h('div.gl-list');
    v.appendChild(list);
    input.addEventListener('input', draw);
    const collator = new Intl.Collator(ZA.lang === 'ja' ? 'ja' : ZA.lang);
    function draw() {
      const q = input.value.trim().toLowerCase();
      catBtns.querySelectorAll('button').forEach(function (b) { b.classList.toggle('btn-primary', b.dataset.cat === cat); });
      list.innerHTML = '';
      const items = ZA.glossary.filter(function (g) {
        if (cat !== 'all' && g.cat !== cat) return false;
        if (!q) return true;
        const hay = [g.id, g.abbr || ''].concat(ZA.LANGS.map(function (l) { return t(g.term, l) + ' ' + t(g.def, l); })).join(' ').toLowerCase();
        return hay.indexOf(q) >= 0;
      }).sort(function (a, b) { return collator.compare(t(a.term), t(b.term)); });
      if (!items.length) list.appendChild(h('p.muted', { text: u('noResults') }));
      items.forEach(function (g) {
        const mod = g.module && ZA.modules[g.module];
        const others = ZA.LANGS.filter(function (l) { return l !== ZA.lang; }).map(function (l) { return t(g.term, l); }).join(' / ');
        list.appendChild(h('div.gl-item' + (g.id === focusId ? '.hl' : ''), { id: 'g-' + g.id },
          h('h3', null, h('span', { text: t(g.term) }), g.abbr ? h('span.abbr', { text: g.abbr }) : null, h('span.chip.tone-' + ({ ie: 'teal', stat: 'blue', qc: 'amber', zeva: 'navy' }[g.cat] || 'gray'), { text: u('cat' + (g.cat || 'ie')[0].toUpperCase() + (g.cat || 'ie').slice(1)) })),
          h('p', { html: md(g.def) }),
          h('div.meta', null, h('span', { text: u('otherLangs') + '：' + others }), mod ? h('a', { href: '#/m/' + mod.id, text: u('learnIn') + '：' + t(mod.title) }) : null)));
      });
    }
    draw();
    if (focusId) setTimeout(function () { const el = document.getElementById('g-' + focusId); if (el) el.scrollIntoView({ block: 'center' }); }, 30);
  }

  /* ---------- formulas ---------- */
  function pageFormulas() {
    markNav('formulas');
    const v = view();
    const pr = h('button.btn.btn-sm.no-print', { type: 'button', text: '🖨 ' + u('print') });
    pr.addEventListener('click', function () { window.print(); });
    v.appendChild(h('div.row', { style: { justifyContent: 'space-between' } }, h('h1.section-title', { text: u('formulasTitle') }), pr));
    v.appendChild(h('p.lead', { text: u('formulasLead') }));
    ZA.formulas.forEach(function (g) {
      v.appendChild(h('section.fx-group', null, h('h2', { html: md(g.group) }),
        h('div.fx-items', null, (g.items || []).map(function (f) {
          const mod = f.module && ZA.modules[f.module];
          return h('div.fx', null, h('h4', { html: md(f.name) }), h('div.e', { html: md(f.expr) }), f.note ? h('div.n', { html: md(f.note) }) : null,
            mod ? h('div.n', null, h('a', { href: '#/m/' + mod.id, text: '→ ' + t(mod.title) })) : null);
        }))));
    });
  }

  /* ---------- placement ---------- */
  function pagePlacement() {
    markNav('placement');
    const v = view();
    const P = ZA.placement;
    const wrap = h('div.narrow');
    v.appendChild(wrap);
    wrap.appendChild(h('h1.section-title', { text: u('placementTitle') }));
    if (!P) { wrap.appendChild(h('p', { text: u('comingSoon') })); return; }
    wrap.appendChild(h('p.lead', { html: md(P.intro) }));
    const fake = { id: '__placement', quiz: P.questions };
    const answers = new Array(P.questions.length).fill(null);
    const box = h('div.quiz');
    P.questions.forEach(function (q, i) {
      const it = h('div.qitem');
      it.appendChild(h('div.qn', null, h('span.n', { text: 'Q' + (i + 1) }), h('span', { html: md(q.q) })));
      const list = h('div.choices');
      const btns = q.choices.map(function (c, j) {
        const b = h('button.choice', { type: 'button' }, h('span.mk', { text: String.fromCharCode(65 + j) }), h('span', { html: md(c) }));
        b.addEventListener('click', function () { if (box.classList.contains('graded')) return; answers[i] = j; btns.forEach(function (x, k) { x.classList.toggle('sel', k === j); }); });
        list.appendChild(b);
        return b;
      });
      it.appendChild(list);
      q._btns = btns;
      box.appendChild(it);
    });
    const res = h('div');
    const submit = h('button.btn.btn-primary', { type: 'button', text: u('submit') });
    submit.addEventListener('click', function () {
      if (answers.some(function (a) { return a == null; })) { res.className = 'quiz-result fail'; res.textContent = u('answerAll'); return; }
      box.classList.add('graded');
      let ieRight = 0, ieTotal = 0, right = 0;
      const weak = {};
      P.questions.forEach(function (q, i) {
        const ok = answers[i] === q.answer;
        if (ok) right++;
        const isIe = String(q.topic || '').indexOf('ie-') === 0;
        if (isIe) { ieTotal++; if (ok) ieRight++; }
        if (!ok && q.topic) weak[q.topic] = true;
        q._btns.forEach(function (b, k) { b.disabled = true; b.classList.remove('sel'); if (k === q.answer) b.classList.add('right'); else if (k === answers[i]) b.classList.add('wrong'); });
      });
      const ieRatio = ieTotal ? ieRight / ieTotal : right / P.questions.length;
      const goIe = ieRatio < 0.6;
      ZA.store.set('placement', { at: Date.now(), ie: ieRatio, total: right / P.questions.length });
      res.className = '';
      res.innerHTML = '';
      const weakMods = Object.keys(weak).map(function (k) { return ZA.modules[k]; }).filter(Boolean);
      const target = goIe ? trackById('ie') : trackById('z1');
      const card = h('div.card', { style: { marginTop: '16px', borderTop: '5px solid var(--' + target.color + ')' } },
        h('h2', { text: u('placementResult') }),
        h('div', { style: { fontSize: '30px', fontWeight: 800 }, text: right + ' / ' + P.questions.length }),
        h('p', { text: goIe ? u('recommendIe') : u('recommendZeva') }),
        weakMods.length ? h('div.row', null, weakMods.map(function (m) { return h('a.chip.tone-amber', { href: '#/m/' + m.id, text: t(m.title) }); })) : null,
        h('div.row', { style: { marginTop: '14px' } }, h('a.btn.btn-primary', { href: '#/track/' + target.id, text: u('goTo', { x: t(target.name) }) + ' →' })));
      res.appendChild(card);
      submit.remove();
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
    box.appendChild(h('div.row', { style: { marginTop: '16px' } }, submit));
    wrap.appendChild(box);
    wrap.appendChild(res);
    void fake;
  }

  /* ---------- about ---------- */
  function pageAbout() {
    markNav('about');
    const v = view();
    const w = h('div.narrow');
    v.appendChild(w);
    w.appendChild(h('h1.section-title', { text: u('aboutTitle') }));
    const blocks = [
      { type: 'p', text: S('ZEVA Academy は、**ZEVA（Zero Variation Production System：バラツキゼロ生産システム）**を、IEの基礎から段階的に学べるように構成したオープンな学習サイトです。', 'ZEVA Academy is an open learning site that teaches **ZEVA (Zero Variation Production System)** step by step, starting from IE fundamentals.', 'ZEVA Academy adalah situs belajar terbuka yang mengajarkan **ZEVA (Zero Variation Production System)** langkah demi langkah, mulai dari dasar IE.') },
      { type: 'diagram', name: 'learning-map' },
      { type: 'table', head: [S('ステージ', 'Stage', 'Tahap'), S('内容', 'Content', 'Isi'), S('対象', 'For', 'Untuk')], rows: ZA.tracks.map(function (tr) { return [t(tr.tag) + '<br><b>' + ZA.esc(t(tr.name)) + '</b>', tr.desc, tr.audience]; }) },
      { type: 'h', text: S('使い方', 'How to use', 'Cara menggunakan') },
      { type: 'list', ordered: true, items: [
        S('「レベル診断」で、基礎IEから始めるか、ZEVA基礎から始めるかを判断します。', 'Take the placement test to decide whether to start with IE Fundamentals or ZEVA Foundations.', 'Ikuti tes penempatan untuk menentukan mulai dari Dasar IE atau Dasar ZEVA.'),
        S('各モジュールは「解説 → インタラクティブ演習 → まとめ → 確認テスト」の順に進みます。', 'Each module goes explanation → interactive practice → key takeaways → quiz.', 'Setiap modul: penjelasan → latihan interaktif → poin penting → kuis.'),
        S('確認テストで80%以上正解すると修了です。進捗はこのブラウザ（localStorage）にのみ保存され、外部には送信されません。', 'Score 80% or more to complete a module. Progress is stored only in this browser (localStorage) and never sent anywhere.', 'Skor 80% atau lebih untuk lulus. Kemajuan hanya disimpan di browser ini (localStorage) dan tidak dikirim ke mana pun.'),
        S('用語に点線の下線がある場合は、クリックすると用語集に移動します。', 'Terms with a dotted underline link to the glossary.', 'Istilah bergaris bawah titik-titik tertaut ke glosarium.'),
      ] },
      { type: 'callout', kind: 'note', title: S('掲載内容について', 'About the content', 'Tentang isi'), text: S('本サイトの数値例・事例はすべて説明用に作成した架空のものであり、特定の企業・工場・製品のデータではありません。IE・統計・品質管理の一般的な知識と、ZEVAの理論体系を教育目的で解説しています。', 'All numbers and cases on this site are invented for explanation and do not represent any specific company, plant or product. General IE, statistics and quality knowledge and the ZEVA theory are explained for educational purposes.', 'Semua angka dan kasus di situs ini dibuat untuk penjelasan dan tidak mewakili perusahaan, pabrik, atau produk tertentu. Pengetahuan umum IE, statistik, mutu, dan teori ZEVA dijelaskan untuk tujuan edukasi.') },
      { type: 'callout', kind: 'tip', title: S('コンテンツの追加・修正', 'Contributing content', 'Menambah konten'), text: S('学習コンテンツは `content/` 配下のJavaScriptファイルで管理されています。書式は `docs/CONTENT_GUIDE.md` を参照してください。ビルド不要で、`index.html` を開くだけで動作します。', 'Learning content lives in JavaScript files under `content/`. See `docs/CONTENT_GUIDE.md` for the format. No build step — just open `index.html`.', 'Konten ada di file JavaScript di bawah `content/`. Lihat `docs/CONTENT_GUIDE.md` untuk format. Tanpa build — cukup buka `index.html`.') },
    ];
    blocks.forEach(function (b) { w.appendChild(ZA.renderBlock(b)); });
  }

  /* ---------- term popover ---------- */
  let pop = null;
  function hidePop() { if (pop) { pop.remove(); pop = null; } }
  document.addEventListener('mouseover', function (e) {
    const a = e.target.closest && e.target.closest('a.term');
    if (!a) return;
    if (window.matchMedia('(hover: none)').matches) return;
    const g = ZA.glossaryById[a.getAttribute('data-term')];
    if (!g) return;
    hidePop();
    pop = h('div.popover', { role: 'tooltip' }, h('h5', { text: t(g.term) + (g.abbr ? ' (' + g.abbr + ')' : '') }), h('p', { html: md(g.def) }));
    document.body.appendChild(pop);
    const r = a.getBoundingClientRect();
    const pw = Math.min(340, window.innerWidth - 24);
    let left = window.scrollX + r.left;
    if (left + pw > window.scrollX + window.innerWidth - 12) left = window.scrollX + window.innerWidth - pw - 12;
    pop.style.left = Math.max(12, left) + 'px';
    pop.style.top = (window.scrollY + r.bottom + 8) + 'px';
  });
  document.addEventListener('mouseout', function (e) {
    const a = e.target.closest && e.target.closest('a.term');
    if (a) hidePop();
  });

  /* ---------- router ---------- */
  let lastRoute = '';
  function route() {
    hidePop();
    if (ZA.chat) ZA.chat.leave();
    const hash = location.hash.replace(/^#\/?/, '');
    const parts = hash.split('/').filter(Boolean);
    const v = view();
    const sameModule = parts[0] === 'm' && lastRoute.split('/')[1] === parts[1] && lastRoute.split('/')[0] === 'm' && parts[2];
    if (sameModule && document.getElementById(parts[2])) { scrollToId(parts[2]); lastRoute = hash; return; }
    v.innerHTML = '';
    lastRoute = hash;
    try {
      switch (parts[0]) {
        case undefined: case '': pageHome(); break;
        case 'path': pagePath(); break;
        case 'track': pageTrack(parts[1]); break;
        case 'm': pageModule(parts[1], parts[2]); break;
        case 'glossary': pageGlossary(parts[1]); break;
        case 'formulas': pageFormulas(); break;
        case 'placement': pagePlacement(); break;
        case 'about': pageAbout(); break;
        case 'ask': markNav('ask'); if (ZA.chat) ZA.chat.page(v); break;
        default: pageHome();
      }
    } catch (err) {
      console.error(err);
      v.appendChild(h('div.callout.callout-warn', null, h('div.c-title', { text: 'Error' }), h('div.c-body', { text: String(err && err.message || err) })));
    }
    if (!(parts[0] === 'm' && parts[2]) && !(parts[0] === 'glossary' && parts[1])) window.scrollTo(0, 0);
  }

  function init() {
    ZA.lang = detectLang();
    document.documentElement.lang = ZA.lang;
    applyTheme();
    renderChrome();
    window.addEventListener('hashchange', route);
    route();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
