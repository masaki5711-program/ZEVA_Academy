/* ZEVA Academy — widgets: IE calculators, statistics, SPC. */
(function () {
  'use strict';
  const ZA = window.ZA;
  const h = ZA.h, t = ZA.t, u = ZA.u, fmt = ZA.fmt, st = ZA.stat;
  const W = ZA.widgets;
  const S = function (ja, en, id) { return { ja: ja, en: en, id: id }; };
  const esc = ZA.esc;

  /* ---------- shared UI helpers ---------- */
  function slider(label, o, onInput) {
    const out = h('output');
    const inp = h('input', { type: 'range', min: o.min, max: o.max, step: o.step || 1, value: o.value });
    const show = function () { out.textContent = (o.format ? o.format(+inp.value) : inp.value) + (o.unit ? ' ' + o.unit : ''); };
    inp.addEventListener('input', function () { show(); onInput(+inp.value); });
    show();
    const el = h('div.ctrl', null, h('label', null, h('span', { text: t(label) }), out), inp);
    el.input = inp; el.set = function (v) { inp.value = v; show(); };
    return el;
  }
  function number(label, o, onInput) {
    const inp = h('input', { type: 'number', min: o.min, max: o.max, step: o.step || 'any', value: o.value });
    inp.addEventListener('input', function () { onInput(parseFloat(inp.value)); });
    const el = h('div.ctrl', null, h('label', null, h('span', { text: t(label) }), o.unit ? h('small.muted', { text: o.unit }) : null), inp);
    el.input = inp;
    return el;
  }
  function tile(k, v, s, cls) {
    const classes = cls ? '.' + String(cls).trim().split(/\s+/).join('.') : '';
    return h('div.tile' + classes, null, h('div.k', { text: t(k) }), h('div.v', { html: v }), s ? h('div.s', { html: t(s) }) : null);
  }
  function note(cls, v) { return h('div.w-note' + (cls ? '.' + cls : ''), { html: ZA.md(v) }); }
  function btn(label, fn, cls) { const b = h('button.btn.btn-sm' + (cls ? '.' + cls : ''), { type: 'button', text: t(label) }); b.addEventListener('click', fn); return b; }
  function parseNums(s) { return String(s).split(/[\s,;、，]+/).map(parseFloat).filter(function (x) { return isFinite(x); }); }
  ZA.wui = { slider: slider, number: number, tile: tile, note: note, btn: btn, parseNums: parseNums };

  /* ---------- tiny SVG chart kit ---------- */
  function scale(d0, d1, r0, r1) { return function (v) { return d1 === d0 ? (r0 + r1) / 2 : r0 + (v - d0) * (r1 - r0) / (d1 - d0); }; }
  function niceTicks(lo, hi, n) {
    const span = hi - lo || 1, step0 = span / (n || 5);
    const mag = Math.pow(10, Math.floor(Math.log10(step0)));
    const norm = step0 / mag;
    const step = (norm < 1.5 ? 1 : norm < 3 ? 2 : norm < 7 ? 5 : 10) * mag;
    const out = [];
    for (let v = Math.ceil(lo / step) * step; v <= hi + 1e-9; v += step) out.push(+v.toFixed(10));
    return out;
  }
  ZA.chartKit = { scale: scale, niceTicks: niceTicks };

  /* ======================================================
   * tt-calc
   * ====================================================== */
  W['tt-calc'] = function (p) {
    const s = ZA.widgetShell(S('タクトタイム計算機', 'Takt time calculator', 'Kalkulator takt time'));
    const v = { shift: p.shiftMin || 480, brk: p.breakMin == null ? 60 : p.breakMin, demand: p.demand || 400, ct: p.ct || 55 };
    const res = h('div');
    const ctrls = h('div', null,
      number(S('勤務時間（分/日）', 'Shift time (min/day)', 'Waktu shift (menit/hari)'), { value: v.shift, min: 1 }, function (x) { v.shift = x; draw(); }),
      number(S('休憩など非稼働時間（分/日）', 'Breaks & non-working (min/day)', 'Istirahat & non-kerja (menit/hari)'), { value: v.brk, min: 0 }, function (x) { v.brk = x; draw(); }),
      number(S('必要生産数（個/日）', 'Required quantity (pcs/day)', 'Jumlah dibutuhkan (pcs/hari)'), { value: v.demand, min: 1 }, function (x) { v.demand = x; draw(); }),
      number(S('実際のサイクルタイム CT（秒）', 'Actual cycle time CT (sec)', 'Cycle time aktual CT (detik)'), { value: v.ct, min: 0.1 }, function (x) { v.ct = x; draw(); }));
    function draw() {
      res.innerHTML = '';
      const avail = (v.shift - v.brk) * 60;
      if (!(avail > 0) || !(v.demand > 0) || !(v.ct > 0)) { res.appendChild(note('bad', S('入力値を確認してください', 'Please check the inputs', 'Periksa input'))); return; }
      const tt = avail / v.demand;
      const cap = Math.floor(avail / v.ct);
      const diff = v.ct - tt;
      res.appendChild(h('div.tiles', null,
        tile(S('稼働時間', 'Available time', 'Waktu tersedia'), fmt(avail, 0) + ' s', t(S('= ', '= ', '= ')) + fmt(avail / 60, 0) + ' min'),
        tile(S('タクトタイム TT', 'Takt time TT', 'Takt time TT'), fmt(tt, 1) + ' s', S('お客様の要求ペース', 'customer demand pace', 'ritme permintaan'), 'big'),
        tile(S('生産能力（CTベース）', 'Capacity (from CT)', 'Kapasitas (dari CT)'), fmt(cap, 0), S('個/日', 'pcs/day', 'pcs/hari'), cap >= v.demand ? 'good' : 'bad')));
      // comparison bars
      const max = Math.max(tt, v.ct) * 1.15;
      const bar = function (label, val, col) {
        return '<div style="display:grid;grid-template-columns:90px 1fr 70px;gap:8px;align-items:center;margin:6px 0">' +
          '<b style="font-size:13px">' + esc(label) + '</b><div style="background:var(--surface-3);border-radius:6px;height:22px;overflow:hidden"><div style="width:' + (val / max * 100) + '%;height:100%;background:' + col + ';border-radius:6px"></div></div>' +
          '<span style="font-variant-numeric:tabular-nums;font-weight:700">' + fmt(val, 1) + ' s</span></div>';
      };
      res.appendChild(h('div', { html: bar('TT', tt, 'var(--navy)') + bar('CT', v.ct, diff > 0 ? 'var(--red)' : 'var(--green)') }));
      if (diff > 0.05) {
        const short = v.demand - cap;
        const ot = short * v.ct / 60;
        res.appendChild(note('bad', S('CT > TT：このままでは **' + fmt(short, 0) + '個/日** 不足します（残業なら約 ' + fmt(ot, 0) + ' 分）。CTの短縮（ムダ・バラツキの排除）か工程の分割が必要です。',
          'CT > TT: you will be **' + fmt(short, 0) + ' pcs/day** short (≈ ' + fmt(ot, 0) + ' min overtime). Shorten CT (remove waste & variation) or split the work.',
          'CT > TT: kurang **' + fmt(short, 0) + ' pcs/hari** (≈ ' + fmt(ot, 0) + ' menit lembur). Perpendek CT (hilangkan pemborosan & variasi) atau bagi pekerjaan.')));
      } else if (diff < -0.05) {
        res.appendChild(note('warn', S('CT < TT：能力に余裕があります（1サイクルあたり ' + fmt(-diff, 1) + ' 秒）。TTを超えて作ると「つくりすぎのムダ」になります。人員や工程の編成を見直す余地があります。',
          'CT < TT: spare capacity of ' + fmt(-diff, 1) + ' s per cycle. Producing faster than TT creates overproduction waste — consider rebalancing people/processes.',
          'CT < TT: kapasitas lebih ' + fmt(-diff, 1) + ' detik per siklus. Memproduksi lebih cepat dari TT = pemborosan produksi berlebih — pertimbangkan penyeimbangan ulang.')));
      } else {
        res.appendChild(note('good', S('CT ≒ TT：要求ペースどおりに生産できる理想的な状態です。', 'CT ≈ TT: producing exactly at the demand pace.', 'CT ≈ TT: produksi tepat sesuai ritme permintaan.')));
      }
    }
    s.body.appendChild(h('div.w-grid', null, ctrls, res));
    draw();
    return s.el;
  };

  /* ======================================================
   * stopwatch-sim
   * ====================================================== */
  W['stopwatch-sim'] = function (p) {
    const s = ZA.widgetShell(S('時間観測シミュレーター', 'Time-study simulator', 'Simulator studi waktu'));
    const cfg = { base: p.baseSec || 30, noise: p.noise == null ? 0.15 : p.noise, cycles: p.cycles || 10, outlier: true };
    let data = [];
    const res = h('div');
    const ctrls = h('div', null,
      slider(S('作業者のバラツキ（習熟度）', 'Worker variation (skill)', 'Variasi pekerja (keterampilan)'), { min: 0.02, max: 0.4, step: 0.01, value: cfg.noise, format: function (x) { return x <= 0.06 ? t(S('熟練', 'Expert', 'Ahli')) + ' ' + Math.round(x * 100) + '%' : x >= 0.25 ? t(S('新人', 'Novice', 'Pemula')) + ' ' + Math.round(x * 100) + '%' : Math.round(x * 100) + '%'; } }, function (x) { cfg.noise = x; }),
      h('div.ctrl', null, h('label', null, h('span', { text: t(S('ときどき異常値（部品落下など）', 'Occasional abnormal cycles (dropped part…)', 'Kadang siklus abnormal (part jatuh…)')) }),
        (function () { const c = h('input', { type: 'checkbox', checked: true }); c.addEventListener('change', function () { cfg.outlier = c.checked; }); return c; })())),
      h('div.w-actions', null,
        btn(S('1サイクル観測', 'Observe 1 cycle', 'Amati 1 siklus'), function () { add(1); }),
        btn(S(cfg.cycles + 'サイクル観測', 'Observe ' + cfg.cycles + ' cycles', 'Amati ' + cfg.cycles + ' siklus'), function () { add(cfg.cycles); }, 'btn-primary'),
        btn(S('クリア', 'Clear', 'Hapus'), function () { data = []; draw(); })));
    function add(n) {
      for (let i = 0; i < n; i++) {
        let x = cfg.base * (1 + Math.abs(st.randn()) * cfg.noise * 0.9 + st.randn() * cfg.noise * 0.25);
        if (cfg.outlier && Math.random() < 0.07) x += cfg.base * (0.4 + Math.random() * 0.4);
        data.push(Math.max(cfg.base * 0.8, +x.toFixed(1)));
      }
      draw();
    }
    function draw() {
      res.innerHTML = '';
      if (!data.length) { res.appendChild(note('', S('「観測」ボタンで仮想作業者のサイクルタイムを測定します。理論上の最短作業時間は約 ' + cfg.base + ' 秒です。', 'Press “Observe” to time a virtual worker. The theoretical fastest cycle is about ' + cfg.base + ' s.', 'Tekan “Amati” untuk mengukur pekerja virtual. Siklus tercepat teoretis sekitar ' + cfg.base + ' detik.'))); return; }
      const m = st.mean(data), sd = st.sd(data, false), mn = st.min(data), mx = st.max(data), cv = sd / m;
      const cls = cv < 0.1 ? 'good' : cv < 0.2 ? '' : cv < 0.3 ? 'warn' : 'bad';
      res.appendChild(h('div.tiles', null,
        tile('n', String(data.length)), tile(S('最小値', 'Min', 'Min'), fmt(mn, 1) + ' s'),
        tile(S('平均', 'Mean', 'Rata-rata'), fmt(m, 1) + ' s'), tile(S('最大値', 'Max', 'Maks'), fmt(mx, 1) + ' s'),
        tile('σ', fmt(sd, 2) + ' s'), tile('V.Score (σ/μ)', fmt(cv, 3), null, cls)));
      // dot chart
      const Wd = 520, Hd = 170, pad = 34;
      const lo = Math.min(mn, cfg.base) * 0.95, hi = mx * 1.05;
      const x = scale(0, Math.max(data.length - 1, 1), pad, Wd - 10), y = scale(lo, hi, Hd - 22, 10);
      let g = '';
      niceTicks(lo, hi, 4).forEach(function (tv) { g += '<line class="grid-line" x1="' + pad + '" x2="' + (Wd - 10) + '" y1="' + y(tv) + '" y2="' + y(tv) + '"/><text x="' + (pad - 4) + '" y="' + (y(tv) + 4) + '" text-anchor="end">' + tv + '</text>'; });
      g += '<line x1="' + pad + '" x2="' + (Wd - 10) + '" y1="' + y(m) + '" y2="' + y(m) + '" stroke="var(--blue)" stroke-width="1.5" stroke-dasharray="6 4"/><text x="' + (Wd - 12) + '" y="' + (y(m) - 5) + '" text-anchor="end" style="fill:var(--blue);font-weight:700">μ</text>';
      g += '<line x1="' + pad + '" x2="' + (Wd - 10) + '" y1="' + y(mn) + '" y2="' + y(mn) + '" stroke="var(--green)" stroke-width="1.5" stroke-dasharray="2 3"/><text x="' + (Wd - 12) + '" y="' + (y(mn) + 13) + '" text-anchor="end" style="fill:var(--green);font-weight:700">min</text>';
      let path = '';
      data.forEach(function (d, i) { path += (i ? 'L' : 'M') + x(i) + ',' + y(d); });
      g += '<path d="' + path + '" fill="none" stroke="var(--border-strong)"/>';
      const q3 = m + 2 * sd;
      data.forEach(function (d, i) { g += '<circle cx="' + x(i) + '" cy="' + y(d) + '" r="4.5" fill="' + (d > q3 ? 'var(--red)' : 'var(--navy)') + '"/>'; });
      res.appendChild(h('div', { html: '<svg class="chart" viewBox="0 0 ' + Wd + ' ' + Hd + '">' + g + '</svg>' }));
      res.appendChild(note(cls, S(
        '平均と最小値の差 ' + fmt(m - mn, 1) + ' 秒は「手順のバラツキ・迷い・異常」を表します。IEの時間観測では**最小値**を作業の実力（標準の候補）とし、平均との差を改善対象と見ます。ZEVAではさらに **V.Score = σ/μ** でバラツキそのものを評価します（< 0.1 が目標）。',
        'The gap between mean and minimum (' + fmt(m - mn, 1) + ' s) reflects method variation, hesitation and abnormalities. IE time study takes the **minimum** as the capability (standard candidate); ZEVA also rates the variation itself with **V.Score = σ/μ** (target < 0.1).',
        'Selisih rata-rata dan minimum (' + fmt(m - mn, 1) + ' detik) mencerminkan variasi metode, keraguan, dan abnormalitas. Studi waktu IE memakai **minimum** sebagai kemampuan; ZEVA juga menilai variasinya dengan **V.Score = σ/μ** (target < 0,1).')));
    }
    s.body.appendChild(h('div.w-grid', null, ctrls, res));
    add(cfg.cycles);
    return s.el;
  };

  /* ======================================================
   * std-time-calc
   * ====================================================== */
  W['std-time-calc'] = function (p) {
    const s = ZA.widgetShell(S('標準時間の計算', 'Standard time calculator', 'Kalkulator waktu standar'));
    const v = { obs: p.observed || 50, rating: p.rating || 110, allow: p.allowance == null ? 12 : p.allowance };
    const res = h('div');
    const ctrls = h('div', null,
      slider(S('観測時間（代表値）', 'Observed time (representative)', 'Waktu teramati (representatif)'), { min: 5, max: 200, step: 0.5, value: v.obs, unit: 's' }, function (x) { v.obs = x; draw(); }),
      slider(S('レーティング係数', 'Rating factor', 'Faktor rating'), { min: 70, max: 140, step: 1, value: v.rating, unit: '%' }, function (x) { v.rating = x; draw(); }),
      slider(S('余裕率', 'Allowance', 'Kelonggaran'), { min: 0, max: 30, step: 1, value: v.allow, unit: '%' }, function (x) { v.allow = x; draw(); }));
    function draw() {
      const normal = v.obs * v.rating / 100, std = normal * (1 + v.allow / 100);
      res.innerHTML = '';
      res.appendChild(h('div.tiles', null,
        tile(S('正味時間', 'Normal time', 'Waktu normal'), fmt(normal, 1) + ' s', S('観測 × レーティング', 'observed × rating', 'teramati × rating')),
        tile(S('標準時間', 'Standard time', 'Waktu standar'), fmt(std, 1) + ' s', S('正味 ×（1＋余裕率）', 'normal × (1 + allowance)', 'normal × (1 + kelonggaran)'), 'big good')));
      res.appendChild(h('ol.list', null,
        h('li', { html: ZA.md(S('正味時間 = ' + fmt(v.obs, 1) + ' × ' + v.rating + '% = **' + fmt(normal, 1) + ' 秒**', 'Normal time = ' + fmt(v.obs, 1) + ' × ' + v.rating + '% = **' + fmt(normal, 1) + ' s**', 'Waktu normal = ' + fmt(v.obs, 1) + ' × ' + v.rating + '% = **' + fmt(normal, 1) + ' dtk**')) }),
        h('li', { html: ZA.md(S('標準時間 = ' + fmt(normal, 1) + ' × (1 + ' + v.allow + '%) = **' + fmt(std, 1) + ' 秒**', 'Standard time = ' + fmt(normal, 1) + ' × (1 + ' + v.allow + '%) = **' + fmt(std, 1) + ' s**', 'Waktu standar = ' + fmt(normal, 1) + ' × (1 + ' + v.allow + '%) = **' + fmt(std, 1) + ' dtk**')) })));
      res.appendChild(note('', v.rating > 100
        ? S('レーティング > 100%：観測した作業者は標準より速いペースだったため、正味時間は観測値より長くなります。', 'Rating > 100%: the observed worker was faster than standard pace, so normal time is longer than observed.', 'Rating > 100%: pekerja lebih cepat dari ritme standar, jadi waktu normal lebih panjang dari teramati.')
        : v.rating < 100 ? S('レーティング < 100%：標準より遅いペースだったため、正味時間は観測値より短くなります。', 'Rating < 100%: slower than standard pace, so normal time is shorter than observed.', 'Rating < 100%: lebih lambat dari standar, jadi waktu normal lebih pendek.')
          : S('レーティング = 100%：標準ペースどおりの作業です。', 'Rating = 100%: exactly standard pace.', 'Rating = 100%: tepat ritme standar.')));
    }
    s.body.appendChild(h('div.w-grid', null, ctrls, res));
    draw();
    return s.el;
  };

  /* ======================================================
   * work-sampling
   * ====================================================== */
  W['work-sampling'] = function (p) {
    const s = ZA.widgetShell(S('ワークサンプリング・シミュレーター', 'Work-sampling simulator', 'Simulator work sampling'));
    const trueP = p.trueRatio == null ? 0.7 : p.trueRatio;
    let n = 0, k = 0, hist = [], revealed = false;
    const res = h('div');
    const ctrls = h('div', null,
      h('p.muted', { style: { fontSize: '14px' }, text: t(S('ある作業者を瞬間的にランダム観測し「稼働中」か「非稼働（手待ち・歩行など）」かを記録します。本当の稼働率は隠されています。', 'Randomly glance at a worker and record “working” or “not working (waiting, walking…)”. The true ratio is hidden.', 'Amati pekerja secara acak dan catat “bekerja” atau “tidak bekerja (menunggu, berjalan…)”. Rasio sebenarnya disembunyikan.')) }),
      h('div.w-actions', null,
        btn(S('+10回観測', '+10 observations', '+10 observasi'), function () { obs(10); }),
        btn(S('+100回観測', '+100 observations', '+100 observasi'), function () { obs(100); }, 'btn-primary'),
        btn(S('真の値を見る', 'Reveal true ratio', 'Lihat nilai sebenarnya'), function () { revealed = true; draw(); }),
        btn(S('リセット', 'Reset', 'Atur ulang'), function () { n = 0; k = 0; hist = []; revealed = false; draw(); })));
    function obs(m) { for (let i = 0; i < m; i++) { n++; if (Math.random() < trueP) k++; if (n % 5 === 0) hist.push([n, k / n]); } draw(); }
    function draw() {
      res.innerHTML = '';
      if (!n) { res.appendChild(note('', S('観測を始めましょう。', 'Start observing.', 'Mulai mengamati.'))); return; }
      const ph = k / n, e = 1.96 * Math.sqrt(ph * (1 - ph) / n);
      const need = Math.ceil(1.96 * 1.96 * ph * (1 - ph) / (0.05 * 0.05));
      res.appendChild(h('div.tiles', null,
        tile(S('観測数 n', 'Observations n', 'Observasi n'), String(n)),
        tile(S('推定稼働率 p', 'Estimated ratio p', 'Rasio perkiraan p'), ZA.pct(ph)),
        tile(S('95%誤差 ±', '95% error ±', 'Galat 95% ±'), ZA.pct(e), null, e <= 0.05 ? 'good' : 'warn'),
        tile(S('±5%に必要なn', 'n for ±5%', 'n untuk ±5%'), String(need))));
      const Wd = 520, Hd = 180, pad = 36;
      const x = scale(0, Math.max(n, 50), pad, Wd - 10), y = scale(0, 1, Hd - 20, 10);
      let g = '';
      [0, 0.25, 0.5, 0.75, 1].forEach(function (tv) { g += '<line class="grid-line" x1="' + pad + '" x2="' + (Wd - 10) + '" y1="' + y(tv) + '" y2="' + y(tv) + '"/><text x="' + (pad - 4) + '" y="' + (y(tv) + 4) + '" text-anchor="end">' + (tv * 100) + '%</text>'; });
      let path = '';
      hist.forEach(function (hp, i) { path += (i ? 'L' : 'M') + x(hp[0]) + ',' + y(hp[1]); });
      g += '<path d="' + path + '" fill="none" stroke="var(--blue)" stroke-width="2"/>';
      if (revealed) g += '<line x1="' + pad + '" x2="' + (Wd - 10) + '" y1="' + y(trueP) + '" y2="' + y(trueP) + '" stroke="var(--green)" stroke-width="2" stroke-dasharray="6 4"/><text x="' + (Wd - 12) + '" y="' + (y(trueP) - 6) + '" text-anchor="end" style="fill:var(--green);font-weight:700">' + t(S('真の値', 'true', 'nilai asli')) + ' ' + Math.round(trueP * 100) + '%</text>';
      res.appendChild(h('div', { html: '<svg class="chart" viewBox="0 0 ' + Wd + ' ' + Hd + '">' + g + '</svg>' }));
      res.appendChild(note('', S('観測数が少ないうちは推定値が大きく揺れます。誤差は √(p(1−p)/n) に比例し、**誤差を半分にするには観測数を4倍**にする必要があります。',
        'With few observations the estimate swings widely. Error is proportional to √(p(1−p)/n): **halving the error needs 4× the observations**.',
        'Dengan sedikit observasi, perkiraan berayun besar. Galat sebanding √(p(1−p)/n): **memperkecil galat setengahnya butuh 4× observasi**.')));
    }
    s.body.appendChild(h('div.w-grid', null, ctrls, res));
    draw();
    return s.el;
  };

  /* ======================================================
   * line-balance
   * ====================================================== */
  W['line-balance'] = function (p) {
    const s = ZA.widgetShell(S('ラインバランス分析', 'Line balance analyzer', 'Analisis keseimbangan lini'));
    let tt = p.tt || 60;
    let cts = (p.cts || [52, 58, 45, 60, 41]).slice();
    let rebalanced = null;
    const list = h('div');
    const res = h('div');
    const ttCtrl = number(S('タクトタイム TT（秒）', 'Takt time TT (s)', 'Takt time TT (detik)'), { value: tt, min: 1 }, function (x) { if (x > 0) { tt = x; rebalanced = null; draw(); } });
    function renderList() {
      list.innerHTML = '';
      cts.forEach(function (c, i) {
        const inp = h('input', { type: 'number', value: c, min: 1, step: 'any', style: { width: '90px' } });
        inp.addEventListener('input', function () { const x = parseFloat(inp.value); if (x > 0) { cts[i] = x; rebalanced = null; draw(); } });
        const del = h('button.btn.btn-sm.btn-ghost', { type: 'button', text: '✕', 'aria-label': 'remove' });
        del.addEventListener('click', function () { if (cts.length > 1) { cts.splice(i, 1); rebalanced = null; renderList(); draw(); } });
        list.appendChild(h('div.row', { style: { gap: '6px', marginBottom: '6px' } }, h('span', { style: { width: '64px', fontSize: '13px', fontWeight: 600 }, text: t(S('工程', 'Proc.', 'Proses')) + ' ' + (i + 1) }), inp, h('small.muted', { text: 's' }), del));
      });
    }
    const ctrls = h('div', null, ttCtrl, h('div.ctrl', null, h('label', null, h('span', { text: t(S('各工程のCT（秒）', 'CT of each process (s)', 'CT tiap proses (detik)')) }))), list,
      h('div.w-actions', null,
        btn(S('＋工程を追加', '+ Add process', '+ Tambah proses'), function () { cts.push(50); rebalanced = null; renderList(); draw(); }),
        btn(S('山崩し（再編成）してみる', 'Try rebalancing (yamazumi)', 'Coba seimbangkan ulang'), function () {
          const total = cts.reduce(function (a, b) { return a + b; }, 0);
          const k = Math.ceil(total / tt - 1e-9);
          rebalanced = [];
          for (let i = 0; i < k; i++) rebalanced.push(Math.min(tt, total - tt * i));
          draw();
        }, 'btn-primary')));
    function stats(arr) {
      const sum = arr.reduce(function (a, b) { return a + b; }, 0), neck = Math.max.apply(null, arr);
      return { sum: sum, neck: neck, eff: sum / (neck * arr.length), need: sum / tt };
    }
    function chart(arr, title) {
      const Wd = 520, Hd = 220, pad = 36, n = arr.length;
      const top = Math.max(tt, Math.max.apply(null, arr)) * 1.15;
      const y = scale(0, top, Hd - 26, 10);
      const bw = Math.min(60, (Wd - pad - 20) / n * 0.65), gap = (Wd - pad - 10) / n;
      const neck = Math.max.apply(null, arr);
      let g = '';
      niceTicks(0, top, 4).forEach(function (tv) { g += '<line class="grid-line" x1="' + pad + '" x2="' + (Wd - 6) + '" y1="' + y(tv) + '" y2="' + y(tv) + '"/><text x="' + (pad - 4) + '" y="' + (y(tv) + 4) + '" text-anchor="end">' + tv + '</text>'; });
      arr.forEach(function (c, i) {
        const x = pad + gap * i + (gap - bw) / 2;
        const col = c === neck ? 'var(--red)' : c > tt ? 'var(--amber)' : 'var(--blue)';
        g += '<rect x="' + x + '" y="' + y(c) + '" width="' + bw + '" height="' + (y(0) - y(c)) + '" rx="4" fill="' + col + '" opacity=".85"/>';
        g += '<text x="' + (x + bw / 2) + '" y="' + (y(c) - 5) + '" text-anchor="middle" style="font-weight:700;fill:var(--text)">' + fmt(c, 0) + '</text>';
        g += '<text x="' + (x + bw / 2) + '" y="' + (Hd - 10) + '" text-anchor="middle">' + (i + 1) + '</text>';
      });
      g += '<line x1="' + pad + '" x2="' + (Wd - 6) + '" y1="' + y(tt) + '" y2="' + y(tt) + '" stroke="var(--navy)" stroke-width="2" stroke-dasharray="7 4"/><text x="' + (Wd - 8) + '" y="' + (y(tt) - 6) + '" text-anchor="end" style="fill:var(--navy);font-weight:800">TT ' + fmt(tt, 0) + 's</text>';
      return h('div', null, h('div', { style: { fontSize: '13px', fontWeight: 700, color: 'var(--text-2)' }, text: t(title) }), h('div', { html: '<svg class="chart" viewBox="0 0 ' + Wd + ' ' + Hd + '">' + g + '</svg>' }));
    }
    function draw() {
      res.innerHTML = '';
      const a = stats(cts);
      res.appendChild(h('div.tiles', null,
        tile(S('ネックCT', 'Neck CT', 'CT leher botol'), fmt(a.neck, 1) + ' s', null, a.neck > tt ? 'bad' : ''),
        tile(S('編成効率', 'Balance efficiency', 'Efisiensi keseimbangan'), ZA.pct(a.eff), S('ΣCT ÷ (ネックCT × 工程数)', 'ΣCT ÷ (neck CT × processes)', 'ΣCT ÷ (CT leher botol × jumlah proses)'), a.eff >= 0.9 ? 'good' : a.eff >= 0.8 ? 'warn' : 'bad'),
        tile(S('理論必要人員', 'Theoretical workers', 'Pekerja teoretis'), fmt(a.need, 2), S('ΣCT ÷ TT → ' + Math.ceil(a.need - 1e-9) + '人', 'ΣCT ÷ TT → ' + Math.ceil(a.need - 1e-9) + ' people', 'ΣCT ÷ TT → ' + Math.ceil(a.need - 1e-9) + ' orang')),
        tile(S('現在の人員', 'Current workers', 'Pekerja saat ini'), String(cts.length))));
      res.appendChild(chart(cts, S('現状（赤＝ネック工程、黄＝TT超過）', 'Current (red = neck, amber = over TT)', 'Saat ini (merah = leher botol, kuning = melebihi TT)')));
      if (a.neck > tt) res.appendChild(note('bad', S('ネック工程がTTを超えています。ラインの出来高はネック工程で決まるため、要求数を作れません。', 'The neck process exceeds TT. Line output is set by the neck, so demand cannot be met.', 'Proses leher botol melebihi TT. Output lini ditentukan leher botol, jadi permintaan tak terpenuhi.')));
      if (rebalanced) {
        const b = stats(rebalanced);
        res.appendChild(chart(rebalanced, S('山崩し後（TTに合わせて作業を積み直した理想形）', 'After rebalancing (work re-stacked up to TT)', 'Setelah diseimbangkan ulang (kerja ditumpuk hingga TT)')));
        res.appendChild(note('good', S('工程数 ' + cts.length + ' → ' + rebalanced.length + '、編成効率 ' + ZA.pct(a.eff) + ' → ' + ZA.pct(b.eff) + '。最後の工程に残った小さな作業は、さらなる改善で消す対象です。※実際は作業の順序制約や分割可能性も考慮します。',
          'Processes ' + cts.length + ' → ' + rebalanced.length + ', efficiency ' + ZA.pct(a.eff) + ' → ' + ZA.pct(b.eff) + '. The small leftover in the last process is the next improvement target. (Real rebalancing must respect precedence and divisibility of tasks.)',
          'Proses ' + cts.length + ' → ' + rebalanced.length + ', efisiensi ' + ZA.pct(a.eff) + ' → ' + ZA.pct(b.eff) + '. Sisa kecil di proses terakhir adalah target perbaikan berikutnya. (Kenyataannya urutan dan kemungkinan pembagian kerja harus diperhatikan.)')));
      }
    }
    renderList();
    s.body.appendChild(h('div.w-grid', null, ctrls, res));
    draw();
    return s.el;
  };

  /* ======================================================
   * oee-calc
   * ====================================================== */
  W['oee-calc'] = function (p) {
    const s = ZA.widgetShell(S('OEE計算機', 'OEE calculator', 'Kalkulator OEE'));
    const v = { planned: p.planned || 480, down: p.downtime == null ? 45 : p.downtime, ict: p.idealCt || 1.0, out: p.output || 380, good: p.good || 370 };
    const res = h('div');
    const ctrls = h('div', null,
      number(S('負荷時間（分）', 'Loading time (min)', 'Waktu beban (menit)'), { value: v.planned, min: 1 }, function (x) { v.planned = x; draw(); }),
      number(S('停止時間：故障・段取りなど（分）', 'Downtime: breakdowns, setup… (min)', 'Waktu henti: kerusakan, setup… (menit)'), { value: v.down, min: 0 }, function (x) { v.down = x; draw(); }),
      number(S('基準（理論）サイクルタイム（分/個）', 'Ideal cycle time (min/pc)', 'Cycle time ideal (menit/pcs)'), { value: v.ict, min: 0.01 }, function (x) { v.ict = x; draw(); }),
      number(S('生産数（個）', 'Output (pcs)', 'Output (pcs)'), { value: v.out, min: 0 }, function (x) { v.out = x; draw(); }),
      number(S('良品数（個）', 'Good pieces (pcs)', 'Produk baik (pcs)'), { value: v.good, min: 0 }, function (x) { v.good = x; draw(); }));
    function draw() {
      res.innerHTML = '';
      const op = v.planned - v.down;
      if (!(op > 0) || !(v.out > 0) || v.good > v.out) { res.appendChild(note('bad', S('入力値を確認してください（良品数 ≤ 生産数、停止時間 < 負荷時間）', 'Check inputs (good ≤ output, downtime < loading time)', 'Periksa input (baik ≤ output, henti < beban)'))); return; }
      const A = op / v.planned, P = v.ict * v.out / op, Q = v.good / v.out, oee = A * P * Q;
      const c = function (x, g, w) { return x >= g ? 'good' : x >= w ? 'warn' : 'bad'; };
      res.appendChild(h('div.tiles', null,
        tile(S('時間稼働率', 'Availability', 'Availability'), ZA.pct(A), S('稼働 ÷ 負荷', 'operating ÷ loading', 'operasi ÷ beban'), c(A, 0.9, 0.8)),
        tile(S('性能稼働率', 'Performance', 'Performance'), ZA.pct(P), S('基準CT×生産数 ÷ 稼働', 'ideal CT × output ÷ operating', 'CT ideal × output ÷ operasi'), P > 1.001 ? 'bad' : c(P, 0.95, 0.85)),
        tile(S('良品率', 'Yield rate', 'Rasio produk baik'), ZA.pct(Q), S('良品 ÷ 生産数', 'good ÷ output', 'baik ÷ output'), c(Q, 0.99, 0.95)),
        tile('OEE', ZA.pct(oee), S('A × P × Q', 'A × P × Q', 'A × P × Q'), 'big ' + c(oee, 0.85, 0.6))));
      // waterfall
      const loss = [
        [S('負荷時間', 'Loading', 'Beban'), v.planned, 'var(--navy)', 0],
        [S('停止ロス', 'Downtime loss', 'Kerugian henti'), v.down, 'var(--red)', 1],
        [S('性能ロス', 'Speed loss', 'Kerugian kecepatan'), Math.max(0, op - v.ict * v.out), 'var(--amber)', 1],
        [S('不良ロス', 'Quality loss', 'Kerugian mutu'), v.ict * (v.out - v.good), 'var(--red)', 1],
        [S('価値稼働時間', 'Valuable time', 'Waktu bernilai'), v.ict * v.good, 'var(--green)', 0],
      ];
      const Wd = 520, Hd = 210, pad = 10, bw = 70, gap = (Wd - 2 * pad) / loss.length;
      const y = scale(0, v.planned, Hd - 40, 14);
      let g = '', level = v.planned;
      loss.forEach(function (l, i) {
        const x = pad + gap * i + (gap - bw) / 2;
        let y0, y1;
        if (i === 0) { y0 = y(v.planned); y1 = y(0); }
        else if (l[3]) { y0 = y(level); level -= l[1]; y1 = y(level); }
        else { y0 = y(l[1]); y1 = y(0); }
        g += '<rect x="' + x + '" y="' + y0 + '" width="' + bw + '" height="' + Math.max(1, y1 - y0) + '" rx="4" fill="' + l[2] + '" opacity=".85"/>';
        g += '<text x="' + (x + bw / 2) + '" y="' + (y0 - 5) + '" text-anchor="middle" style="font-weight:700;fill:var(--text)">' + fmt(l[1], 0) + '</text>';
        g += '<text x="' + (x + bw / 2) + '" y="' + (Hd - 22) + '" text-anchor="middle">' + esc(t(l[0])) + '</text>';
      });
      g += '<text x="' + (Wd - 4) + '" y="10" text-anchor="end">' + esc(t(S('単位：分', 'unit: min', 'satuan: menit'))) + '</text>';
      res.appendChild(h('div', { html: '<svg class="chart" viewBox="0 0 ' + Wd + ' ' + Hd + '">' + g + '</svg>' }));
      if (P > 1.001) res.appendChild(note('bad', S('性能稼働率が100%を超えています。基準サイクルタイムが実力より長く設定されている可能性があります（基準の見直しが必要）。', 'Performance exceeds 100%: the ideal cycle time is probably set too long — review the standard.', 'Performance melebihi 100%: CT ideal kemungkinan terlalu panjang — tinjau standarnya.')));
      else {
        const worst = [[A, S('停止ロス', 'downtime loss', 'kerugian henti')], [P, S('性能ロス', 'speed loss', 'kerugian kecepatan')], [Q, S('不良ロス', 'quality loss', 'kerugian mutu')]].sort(function (a, b) { return a[0] - b[0]; })[0];
        res.appendChild(note(oee >= 0.85 ? 'good' : '', S('OEE ' + ZA.pct(oee) + '（世界水準の目安は85%以上）。最も大きいのは **' + t(worst[1]) + '** です。OEEは「結果（Y）」なので、ロスを生んでいる原因（X）を探しましょう。',
          'OEE ' + ZA.pct(oee) + ' (world-class ≈ 85%+). The biggest is **' + t(worst[1]) + '**. OEE is a result (Y) — look for the causes (X) behind the loss.',
          'OEE ' + ZA.pct(oee) + ' (kelas dunia ≈ 85%+). Terbesar: **' + t(worst[1]) + '**. OEE adalah hasil (Y) — cari penyebab (X) kerugiannya.')));
      }
    }
    s.body.appendChild(h('div.w-grid', null, ctrls, res));
    draw();
    return s.el;
  };

  /* ======================================================
   * stats-lab
   * ====================================================== */
  W['stats-lab'] = function (p) {
    const s = ZA.widgetShell(S('統計ラボ', 'Statistics lab', 'Lab statistik'));
    const ta = h('textarea', { rows: 5 });
    ta.value = (p.data || [31.2, 30.8, 32.5, 29.9, 31.0, 30.4, 33.1, 30.7, 31.6, 30.2, 31.9, 30.5]).join(', ');
    ta.addEventListener('input', draw);
    const gen = function (kind) {
      const out = [];
      for (let i = 0; i < 40; i++) {
        let x;
        if (kind === 'stable') x = 30 + st.randn() * 0.6;
        else if (kind === 'wide') x = 30 + st.randn() * 3;
        else if (kind === 'bimodal') x = (Math.random() < 0.5 ? 27 : 33) + st.randn() * 0.8;
        else { x = 30 + st.randn() * 0.8; if (i % 13 === 5) x += 9; }
        out.push(+x.toFixed(1));
      }
      ta.value = out.join(', ');
      draw();
    };
    const res = h('div');
    const ctrls = h('div', null,
      h('div.ctrl', null, h('label', null, h('span', { text: t(S('データ（カンマ・空白区切り）', 'Data (comma/space separated)', 'Data (pisahkan koma/spasi)')) })), ta),
      h('div.w-actions', null,
        btn(S('安定した工程', 'Stable process', 'Proses stabil'), function () { gen('stable'); }),
        btn(S('バラツキ大', 'Wide variation', 'Variasi besar'), function () { gen('wide'); }),
        btn(S('ふた山（2条件混在）', 'Two humps (mixed)', 'Dua puncak (campur)'), function () { gen('bimodal'); }),
        btn(S('外れ値あり', 'With outliers', 'Ada pencilan'), function () { gen('outlier'); })));
    function draw() {
      res.innerHTML = '';
      const d = parseNums(ta.value);
      if (d.length < 2) { res.appendChild(note('warn', S('2つ以上の数値を入力してください', 'Enter at least two numbers', 'Masukkan minimal dua angka'))); return; }
      const m = st.mean(d), sd = st.sd(d, false), cv = sd / m, med = st.median(d), mn = st.min(d), mx = st.max(d);
      res.appendChild(h('div.tiles', null,
        tile('n', String(d.length)), tile(S('平均 μ', 'Mean μ', 'Rata-rata μ'), fmt(m, 2)), tile(S('中央値', 'Median', 'Median'), fmt(med, 2)),
        tile(S('範囲 R', 'Range R', 'Rentang R'), fmt(mx - mn, 2)), tile(S('標準偏差 σ', 'Std. dev. σ', 'Simpangan baku σ'), fmt(sd, 3)),
        tile(S('変動係数 CV', 'CV (σ/μ)', 'CV (σ/μ)'), fmt(cv, 3), S('= V.Score', '= V.Score', '= V.Score'))));
      const k = Math.max(5, Math.min(14, Math.ceil(1 + Math.log2(d.length))));
      const lo = mn - (mx - mn) * 0.05 - 1e-9, hi = mx + (mx - mn) * 0.05 + 1e-9, bwid = (hi - lo) / k;
      const bins = new Array(k).fill(0);
      d.forEach(function (x) { bins[Math.min(k - 1, Math.floor((x - lo) / bwid))]++; });
      const Wd = 520, Hd = 200, pad = 30;
      const x = scale(lo, hi, pad, Wd - 10), y = scale(0, Math.max.apply(null, bins) * 1.15, Hd - 24, 10);
      let g = '';
      bins.forEach(function (c, i) {
        const x0 = x(lo + i * bwid), x1 = x(lo + (i + 1) * bwid);
        g += '<rect x="' + (x0 + 1) + '" y="' + y(c) + '" width="' + Math.max(1, x1 - x0 - 2) + '" height="' + (y(0) - y(c)) + '" fill="var(--blue)" opacity=".75"/>';
        if (c) g += '<text x="' + ((x0 + x1) / 2) + '" y="' + (y(c) - 4) + '" text-anchor="middle">' + c + '</text>';
      });
      g += '<line class="axis" x1="' + pad + '" x2="' + (Wd - 10) + '" y1="' + y(0) + '" y2="' + y(0) + '"/>';
      niceTicks(lo, hi, 6).forEach(function (tv) { g += '<text x="' + x(tv) + '" y="' + (Hd - 8) + '" text-anchor="middle">' + tv + '</text>'; });
      [[m, 'μ', 'var(--navy)'], [m - sd, '−σ', 'var(--muted)'], [m + sd, '+σ', 'var(--muted)']].forEach(function (l) {
        if (l[0] < lo || l[0] > hi) return;
        g += '<line x1="' + x(l[0]) + '" x2="' + x(l[0]) + '" y1="10" y2="' + y(0) + '" stroke="' + l[2] + '" stroke-width="2" stroke-dasharray="5 4"/><text x="' + (x(l[0]) + 3) + '" y="18" style="fill:' + l[2] + ';font-weight:700">' + l[1] + '</text>';
      });
      res.appendChild(h('div', { html: '<svg class="chart" viewBox="0 0 ' + Wd + ' ' + Hd + '">' + g + '</svg>' }));
      res.appendChild(note('', Math.abs(m - med) > sd * 0.35
        ? S('平均と中央値が大きく離れています。外れ値や分布の偏りがあるサインです。平均だけで判断すると誤ります。', 'Mean and median differ a lot — a sign of outliers or skew. Judging by the mean alone would mislead.', 'Rata-rata dan median jauh berbeda — tanda pencilan atau kemiringan. Menilai dari rata-rata saja menyesatkan.')
        : S('ヒストグラムの「形」を見ることが大切です。ふた山なら2つの条件（作業者・設備・材料ロットなど）が混ざっている可能性があります。', 'Always look at the shape. Two humps suggest two mixed conditions (operators, machines, material lots…).', 'Selalu lihat bentuknya. Dua puncak menandakan dua kondisi bercampur (operator, mesin, lot material…).')));
    }
    s.body.appendChild(h('div.w-grid', null, ctrls, res));
    draw();
    return s.el;
  };

  /* ======================================================
   * normal-explorer
   * ====================================================== */
  W['normal-explorer'] = function () {
    const s = ZA.widgetShell(S('正規分布エクスプローラー', 'Normal distribution explorer', 'Penjelajah distribusi normal'));
    const v = { mu: 50, sd: 5, a: 40, b: 60 };
    const res = h('div');
    const ctrls = h('div', null,
      slider(S('平均 μ', 'Mean μ', 'Rata-rata μ'), { min: 30, max: 70, step: 0.5, value: v.mu }, function (x) { v.mu = x; draw(); }),
      slider(S('標準偏差 σ', 'Std. dev. σ', 'Simpangan baku σ'), { min: 1, max: 15, step: 0.5, value: v.sd }, function (x) { v.sd = x; draw(); }),
      slider(S('下限', 'Lower limit', 'Batas bawah'), { min: 20, max: 80, step: 0.5, value: v.a }, function (x) { v.a = x; draw(); }),
      slider(S('上限', 'Upper limit', 'Batas atas'), { min: 20, max: 80, step: 0.5, value: v.b }, function (x) { v.b = x; draw(); }));
    function draw() {
      res.innerHTML = '';
      const lo = Math.min(v.a, v.b), hi = Math.max(v.a, v.b);
      const inside = st.phi((hi - v.mu) / v.sd) - st.phi((lo - v.mu) / v.sd);
      res.appendChild(h('div.tiles', null,
        tile(S('範囲内の割合', 'Inside limits', 'Di dalam batas'), ZA.pct(inside, 2), null, inside > 0.997 ? 'good' : inside > 0.95 ? 'warn' : 'bad'),
        tile(S('範囲外（ppm）', 'Outside (ppm)', 'Di luar (ppm)'), fmt((1 - inside) * 1e6, 0)),
        tile(S('下限まで', 'To lower', 'Ke bawah'), fmt((v.mu - lo) / v.sd, 2) + ' σ'),
        tile(S('上限まで', 'To upper', 'Ke atas'), fmt((hi - v.mu) / v.sd, 2) + ' σ')));
      const Wd = 520, Hd = 200, pad = 10;
      const x = scale(20, 80, pad, Wd - pad);
      const peak = st.pdf(v.mu, v.mu, v.sd);
      const y = scale(0, Math.max(peak, st.pdf(0, 0, 3)) * 1.05, Hd - 24, 8);
      let area = 'M' + x(Math.max(20, lo)) + ',' + y(0), curve = '';
      for (let xx = 20; xx <= 80; xx += 0.25) {
        const yy = y(st.pdf(xx, v.mu, v.sd));
        curve += (xx === 20 ? 'M' : 'L') + x(xx) + ',' + yy;
        if (xx >= lo && xx <= hi) area += ' L' + x(xx) + ',' + yy;
      }
      area += ' L' + x(Math.min(80, hi)) + ',' + y(0) + ' Z';
      let g = '<path d="' + area + '" fill="var(--tone-green-bg)"/><path d="' + curve + '" fill="none" stroke="var(--navy)" stroke-width="2.5"/>';
      g += '<line class="axis" x1="' + pad + '" x2="' + (Wd - pad) + '" y1="' + y(0) + '" y2="' + y(0) + '"/>';
      [lo, hi].forEach(function (l) { g += '<line x1="' + x(l) + '" x2="' + x(l) + '" y1="8" y2="' + y(0) + '" stroke="var(--red)" stroke-width="2"/>'; });
      [20, 30, 40, 50, 60, 70, 80].forEach(function (tv) { g += '<text x="' + x(tv) + '" y="' + (Hd - 8) + '" text-anchor="middle">' + tv + '</text>'; });
      res.appendChild(h('div', { html: '<svg class="chart" viewBox="0 0 ' + Wd + ' ' + Hd + '">' + g + '</svg>' }));
      res.appendChild(note('', S('σを小さくすると、同じ上下限でも範囲外の割合が急激に減ります。「平均を合わせる」だけでなく「バラツキを小さくする」ことが不良ゼロへの近道です。', 'Shrinking σ sharply cuts the share outside the same limits. Not just centering the mean — reducing variation is the shortcut to zero defects.', 'Mengecilkan σ memangkas tajam porsi di luar batas yang sama. Bukan hanya memusatkan rata-rata — mengurangi variasi adalah jalan pintas menuju nol cacat.')));
    }
    s.body.appendChild(h('div.w-grid', null, ctrls, res));
    draw();
    return s.el;
  };

  /* ======================================================
   * control-chart (X̄-R, n = 5)
   * ====================================================== */
  W['control-chart'] = function () {
    const s = ZA.widgetShell(S('X̄-R 管理図シミュレーター', 'X̄-R control chart simulator', 'Simulator peta kendali X̄-R'));
    const A2 = 0.577, D3 = 0, D4 = 2.114, N = 5;
    let groups = [], shift = 0, spread = 1, lim = null;
    function sample() { const g = []; for (let i = 0; i < N; i++) g.push(50 + shift + st.randn() * 1.2 * spread); return g; }
    function init() {
      groups = []; shift = 0; spread = 1;
      for (let i = 0; i < 20; i++) groups.push(sample());
      const xb = groups.map(st.mean), rr = groups.map(function (g) { return st.max(g) - st.min(g); });
      const xbb = st.mean(xb), rb = st.mean(rr);
      lim = { xbb: xbb, rb: rb, ucl: xbb + A2 * rb, lcl: xbb - A2 * rb, rucl: D4 * rb, rlcl: D3 * rb };
    }
    const res = h('div');
    const ctrls = h('div', null,
      h('p', { style: { fontSize: '14px' }, html: ZA.md(S('最初の20群（各5個）から管理限界を計算済みです。群を追加しながら、**異常原因（特殊原因）**を入れてみましょう。', 'Control limits were computed from the first 20 subgroups (n = 5). Add subgroups and inject **special causes**.', 'Batas kendali dihitung dari 20 subgrup pertama (n = 5). Tambah subgrup dan masukkan **penyebab khusus**.')) }),
      h('div.w-actions', null,
        btn(S('＋1群追加', '+1 subgroup', '+1 subgrup'), function () { add(1); }),
        btn(S('＋5群追加', '+5 subgroups', '+5 subgrup'), function () { add(5); }, 'btn-primary')),
      h('div.w-actions', null,
        btn(S('⚠ 平均がずれる（工具摩耗など）', '⚠ Mean shift (tool wear…)', '⚠ Pergeseran rata-rata (aus alat…)'), function () { shift = 2.2; add(5); }),
        btn(S('⚠ バラツキ増大（新人・材料ロット）', '⚠ More variation (novice, lot)', '⚠ Variasi naik (pemula, lot)'), function () { spread = 2.6; add(5); })),
      h('div.w-actions', null,
        btn(S('原因を除去（正常に戻す）', 'Remove cause (back to normal)', 'Hilangkan penyebab (normal)'), function () { shift = 0; spread = 1; add(3); }),
        btn(S('リセット', 'Reset', 'Atur ulang'), function () { init(); draw(); })));
    function add(n) { for (let i = 0; i < n; i++) groups.push(sample()); if (groups.length > 45) groups = groups.slice(groups.length - 45); draw(); }
    function chart(vals, cl, ucl, lcl, label, flags) {
      const Wd = 520, Hd = 150, pad = 44;
      const lo = Math.min(lcl, st.min(vals)) - (ucl - lcl) * 0.15, hi = Math.max(ucl, st.max(vals)) + (ucl - lcl) * 0.15;
      const x = scale(0, Math.max(vals.length - 1, 1), pad, Wd - 40), y = scale(lo, hi, Hd - 12, 12);
      let g = '';
      [[ucl, 'UCL', 'var(--red)', '6 4'], [cl, 'CL', 'var(--navy)', ''], [lcl, 'LCL', 'var(--red)', '6 4']].forEach(function (l) {
        g += '<line x1="' + pad + '" x2="' + (Wd - 40) + '" y1="' + y(l[0]) + '" y2="' + y(l[0]) + '" stroke="' + l[2] + '" stroke-width="1.6"' + (l[3] ? ' stroke-dasharray="' + l[3] + '"' : '') + '/>' +
          '<text x="' + (Wd - 36) + '" y="' + (y(l[0]) + 4) + '" style="fill:' + l[2] + ';font-weight:700">' + l[1] + '</text>' +
          '<text x="' + (pad - 4) + '" y="' + (y(l[0]) + 4) + '" text-anchor="end">' + fmt(l[0], 2) + '</text>';
      });
      let path = '';
      vals.forEach(function (v, i) { path += (i ? 'L' : 'M') + x(i) + ',' + y(v); });
      g += '<path d="' + path + '" fill="none" stroke="var(--border-strong)" stroke-width="1.4"/>';
      vals.forEach(function (v, i) { g += '<circle cx="' + x(i) + '" cy="' + y(v) + '" r="' + (flags[i] ? 5.5 : 3.8) + '" fill="' + (flags[i] ? 'var(--red)' : 'var(--blue)') + '"/>'; });
      g += '<text x="4" y="14" style="font-weight:800;fill:var(--text)">' + label + '</text>';
      return '<svg class="chart" viewBox="0 0 ' + Wd + ' ' + Hd + '">' + g + '</svg>';
    }
    function draw() {
      res.innerHTML = '';
      const xb = groups.map(st.mean), rr = groups.map(function (g) { return st.max(g) - st.min(g); });
      const fx = xb.map(function (v) { return v > lim.ucl || v < lim.lcl; });
      // run rule: 7 consecutive on one side
      for (let i = 6; i < xb.length; i++) {
        const w = xb.slice(i - 6, i + 1);
        if (w.every(function (v) { return v > lim.xbb; }) || w.every(function (v) { return v < lim.xbb; })) for (let j = i - 6; j <= i; j++) fx[j] = true;
      }
      const fr = rr.map(function (v) { return v > lim.rucl; });
      const bad = fx.some(Boolean) || fr.some(Boolean);
      res.appendChild(h('div', { html: chart(xb, lim.xbb, lim.ucl, lim.lcl, 'X̄', fx) + chart(rr, lim.rb, lim.rucl, lim.rlcl, 'R', fr) }));
      res.appendChild(note(bad ? 'bad' : 'good', bad
        ? S('**異常あり（統計的管理状態ではない）**：限界外の点、または中心線の片側に7点連続があります。特殊原因を突き止めて除去するまで、この工程のCpkやV.Scoreは意味を持ちません（シューハートの原則）。',
          '**Out of control**: points beyond limits or 7 in a row on one side. Until the special cause is found and removed, Cpk or V.Score of this process are meaningless (Shewhart’s principle).',
          '**Tidak terkendali**: titik di luar batas atau 7 berturut-turut di satu sisi. Sebelum penyebab khusus ditemukan dan dihilangkan, Cpk atau V.Score proses ini tidak bermakna (prinsip Shewhart).')
        : S('**統計的管理状態**：点は限界内でランダムに動いています（偶然原因のみ）。この状態で初めて工程能力を評価できます。', '**In statistical control**: points move randomly within limits (common causes only). Only now can process capability be evaluated.', '**Dalam kendali statistik**: titik bergerak acak di dalam batas (hanya penyebab umum). Baru sekarang kapabilitas proses dapat dinilai.')));
      res.appendChild(h('div.muted', { style: { fontSize: '12px', marginTop: '6px' }, text: 'n = 5: A2 = 0.577, D3 = 0, D4 = 2.114 — UCL/LCL(X̄) = X̿ ± A2·R̄, UCL(R) = D4·R̄' }));
    }
    init();
    s.body.appendChild(h('div.w-grid', null, ctrls, res));
    draw();
    return s.el;
  };

  /* ======================================================
   * cpk-calc
   * ====================================================== */
  W['cpk-calc'] = function (p) {
    const s = ZA.widgetShell(S('工程能力 Cp / Cpk', 'Process capability Cp / Cpk', 'Kapabilitas proses Cp / Cpk'));
    const v = { lsl: p.lsl == null ? 9.5 : p.lsl, usl: p.usl == null ? 10.5 : p.usl, mu: p.mu == null ? 10.1 : p.mu, sd: p.sigma || 0.12 };
    const span = v.usl - v.lsl;
    const res = h('div');
    const ctrls = h('div', null,
      slider(S('平均 μ', 'Mean μ', 'Rata-rata μ'), { min: v.lsl - span * 0.2, max: v.usl + span * 0.2, step: span / 200, value: v.mu, format: function (x) { return fmt(x, 3); } }, function (x) { v.mu = x; draw(); }),
      slider(S('標準偏差 σ', 'Std. dev. σ', 'Simpangan baku σ'), { min: span / 60, max: span / 2.5, step: span / 1000, value: v.sd, format: function (x) { return fmt(x, 3); } }, function (x) { v.sd = x; draw(); }),
      slider('LSL', { min: v.lsl - span * 0.5, max: v.lsl + span * 0.4, step: span / 200, value: v.lsl, format: function (x) { return fmt(x, 2); } }, function (x) { v.lsl = x; draw(); }),
      slider('USL', { min: v.usl - span * 0.4, max: v.usl + span * 0.5, step: span / 200, value: v.usl, format: function (x) { return fmt(x, 2); } }, function (x) { v.usl = x; draw(); }));
    function draw() {
      res.innerHTML = '';
      if (v.usl <= v.lsl) { res.appendChild(note('bad', S('USL は LSL より大きくしてください', 'USL must be greater than LSL', 'USL harus lebih besar dari LSL'))); return; }
      const cp = (v.usl - v.lsl) / (6 * v.sd), cpu = (v.usl - v.mu) / (3 * v.sd), cpl = (v.mu - v.lsl) / (3 * v.sd), cpk = Math.min(cpu, cpl);
      const ppm = (st.phi((v.lsl - v.mu) / v.sd) + 1 - st.phi((v.usl - v.mu) / v.sd)) * 1e6;
      const judge = cpk >= 1.67 ? ['good', S('十分すぎる（1.67以上）', 'More than sufficient (≥ 1.67)', 'Sangat memadai (≥ 1,67)')] : cpk >= 1.33 ? ['good', S('十分（1.33以上）＝ZEVAの目標', 'Sufficient (≥ 1.33) = ZEVA target', 'Memadai (≥ 1,33) = target ZEVA')] : cpk >= 1.0 ? ['warn', S('やや不足（1.00〜1.33）', 'Marginal (1.00–1.33)', 'Kurang (1,00–1,33)')] : ['bad', S('不足（1.00未満）', 'Not capable (< 1.00)', 'Tidak mampu (< 1,00)')];
      res.appendChild(h('div.tiles', null,
        tile('Cp', fmt(cp, 2), S('規格幅 ÷ 6σ', 'spec width ÷ 6σ', 'lebar spek ÷ 6σ')),
        tile('Cpk', fmt(cpk, 2), judge[1], 'big ' + judge[0]),
        tile(S('不良率（推定）', 'Defects (est.)', 'Cacat (perkiraan)'), fmt(ppm, ppm < 10 ? 1 : 0) + ' ppm')));
      const Wd = 520, Hd = 200, pad = 10;
      const lo = Math.min(v.lsl, v.mu - 4 * v.sd) - span * 0.1, hi = Math.max(v.usl, v.mu + 4 * v.sd) + span * 0.1;
      const x = scale(lo, hi, pad, Wd - pad), y = scale(0, st.pdf(v.mu, v.mu, v.sd) * 1.1, Hd - 24, 18);
      let curve = '', badL = 'M' + x(lo) + ',' + y(0), badR = 'M' + x(v.usl) + ',' + y(0);
      for (let i = 0; i <= 300; i++) {
        const xx = lo + (hi - lo) * i / 300, yy = y(st.pdf(xx, v.mu, v.sd));
        curve += (i ? 'L' : 'M') + x(xx) + ',' + yy;
        if (xx <= v.lsl) badL += ' L' + x(xx) + ',' + yy;
        if (xx >= v.usl) badR += ' L' + x(xx) + ',' + yy;
      }
      badL += ' L' + x(v.lsl) + ',' + y(0) + ' Z'; badR += ' L' + x(hi) + ',' + y(0) + ' Z';
      let g = '<path d="' + badL + '" fill="var(--tone-red-bg)"/><path d="' + badR + '" fill="var(--tone-red-bg)"/><path d="' + curve + '" fill="none" stroke="var(--navy)" stroke-width="2.5"/>';
      g += '<line class="axis" x1="' + pad + '" x2="' + (Wd - pad) + '" y1="' + y(0) + '" y2="' + y(0) + '"/>';
      [[v.lsl, 'LSL', 'var(--red)'], [v.usl, 'USL', 'var(--red)'], [v.mu, 'μ', 'var(--blue)']].forEach(function (l) {
        g += '<line x1="' + x(l[0]) + '" x2="' + x(l[0]) + '" y1="16" y2="' + y(0) + '" stroke="' + l[2] + '" stroke-width="2"' + (l[1] === 'μ' ? ' stroke-dasharray="4 4"' : '') + '/><text x="' + x(l[0]) + '" y="12" text-anchor="middle" style="fill:' + l[2] + ';font-weight:800">' + l[1] + '</text>';
      });
      niceTicks(lo, hi, 6).forEach(function (tv) { g += '<text x="' + x(tv) + '" y="' + (Hd - 8) + '" text-anchor="middle">' + tv + '</text>'; });
      res.appendChild(h('div', { html: '<svg class="chart" viewBox="0 0 ' + Wd + ' ' + Hd + '">' + g + '</svg>' }));
      res.appendChild(note('', Math.abs(cp - cpk) > 0.15
        ? S('Cp と Cpk の差が大きい＝**中心がずれています**。まず平均を規格中心に寄せるだけで Cpk は Cp に近づきます。', 'A big gap between Cp and Cpk means the process is **off-center**. Centering the mean brings Cpk up toward Cp.', 'Selisih besar Cp dan Cpk = proses **tidak di tengah**. Memusatkan rata-rata menaikkan Cpk mendekati Cp.')
        : S('※Cpkは工程が統計的管理状態（安定）であることが前提です。管理図で安定を確認してから評価しましょう。', 'Note: Cpk assumes the process is in statistical control. Confirm stability on a control chart first.', 'Catatan: Cpk mengasumsikan proses dalam kendali statistik. Pastikan stabil dengan peta kendali dulu.')));
    }
    s.body.appendChild(h('div.w-grid', null, ctrls, res));
    draw();
    return s.el;
  };
})();
