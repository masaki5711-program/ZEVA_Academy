/* ZEVA Academy — widgets: ZEVA tools and generic learning games. */
(function () {
  'use strict';
  const ZA = window.ZA;
  const h = ZA.h, t = ZA.t, u = ZA.u, md = ZA.md, fmt = ZA.fmt, st = ZA.stat;
  const W = ZA.widgets;
  const ui = ZA.wui, K = ZA.chartKit;
  const slider = ui.slider, number = ui.number, tile = ui.tile, note = ui.note, btn = ui.btn;
  const S = function (ja, en, id) { return { ja: ja, en: en, id: id }; };
  const esc = ZA.esc;
  const svgWrap = function (w, hh, g) { return '<svg class="chart" viewBox="0 0 ' + w + ' ' + hh + '">' + g + '</svg>'; };

  function vJudge(v) {
    if (v < 0.1) return ['good', S('極めて安定（狙いどおりのペース）', 'Extremely stable (the pace it was designed for)', 'Sangat stabil (laju yang dirancang)')];
    if (v < 0.3) return ['good', S('安定（標準作業が機能）', 'Stable (standard work is working)', 'Stabil (kerja standar berjalan)')];
    if (v < 0.5) return ['warn', S('やや不安定（改善の余地がある）', 'Slightly unstable (room to improve)', 'Agak tidak stabil (masih ada ruang perbaikan)')];
    if (v < 1.0) return ['bad', S('不安定（標準作業を見直す）', 'Unstable (revisit the standard work)', 'Tidak stabil (tinjau ulang kerja standar)')];
    return ['bad', S('非常に不安定（土台の標準化から）', 'Very unstable (start from the foundation)', 'Sangat tidak stabil (mulai dari fondasi)')];
  }

  /* ======================================================
   * hybrid-score — 編成効率・V.Score・タクト差を同時に動かして
   * ハイブリッドスコアが何を測っているかを見せる(仕様書v29 16.5)
   * ====================================================== */
  W['hybrid-score'] = function (p) {
    const s = ZA.widgetShell(S('ハイブリッドスコア シミュレーター', 'Hybrid score simulator', 'Simulator skor hibrida'));
    // 各工程: 実力値(基準CT)と、その工程のレンジ(最大-最小)
    let procs = (p.procs || [
      { ct: 32, range: 332 }, { ct: 57, range: 244 }, { ct: 34, range: 427 }, { ct: 32, range: 430 },
      { ct: 31, range: 495 }, { ct: 33, range: 587 }, { ct: 70, range: 153 }, { ct: 59, range: 208 },
      { ct: 54, range: 206 }, { ct: 34, range: 299 }
    ]).map(function (x) { return { ct: x.ct, range: x.range }; });
    let takt = p.takt || 98;
    let R0 = p.r0 || 5;          // 基準レンジ比
    let g = 6, a = 2, b = 2;     // 重み γ:α:β
    let spread = 1;              // 工程間のばらつきの倍率(編成をいじる)
    let noise = 1;               // 工程内のレンジの倍率(バラツキをいじる)

    const res = h('div');
    function ctsNow() {
      // spread=1 で原データ。0 で全工程が平均値にそろう(完全な釣り合い)
      const base = procs.map(function (x) { return x.ct; });
      const m = st.mean(base);
      return base.map(function (c) { return Math.max(1, m + (c - m) * spread); });
    }
    function rangesNow() { return procs.map(function (x) { return x.range * noise; }); }

    function calc() {
      const cts = ctsNow(), rgs = rangesNow(), n = cts.length;
      const sum = cts.reduce(function (x, y) { return x + y; }, 0);
      const neck = Math.max.apply(null, cts);
      const base = Math.max(takt, neck);                    // 基準時間
      const eff = sum / (base * n);                         // 編成効率
      const mean = sum / n;
      const sd = Math.sqrt(cts.reduce(function (acc, c) { return acc + (c - mean) * (c - mean); }, 0) / n); // 母標準偏差
      const t1 = sd / neck, t2 = Math.abs(neck - takt) / takt;
      const rms = Math.sqrt(rgs.reduce(function (acc, r, i) { const q = r / cts[i]; return acc + q * q; }, 0) / n);
      const n1 = Math.min(1, t1 / 0.5), n2 = Math.min(1, t2), n3 = Math.min(1, rms / R0);
      const wsum = g + a + b;
      const H = (g * n3 + a * n1 + b * n2) / wsum;
      return { cts: cts, rgs: rgs, sum: sum, neck: neck, base: base, eff: eff, sd: sd,
               t1: t1, t2: t2, rms: rms, n1: n1, n2: n2, n3: n3, H: H, score: Math.max(0, 100 * (1 - H)) };
    }

    function scoreJudge(v) {
      if (v >= 85) return 'good';
      if (v >= 60) return 'warn';
      return 'bad';
    }

    // 失点の内訳を積み上げバーで見せる
    function lossChart(r) {
      const Wd = 520, Hd = 96, pad = 8, wsum = g + a + b;
      const x = K.scale(0, 100, pad, Wd - pad);
      const parts = [
        { k: S('バラツキ（工程内）', 'Variation (within process)', 'Variasi (dalam proses)'), v: 100 * (g * r.n3) / wsum, c: 'var(--red)' },
        { k: S('編成（工程間）', 'Balance (between processes)', 'Keseimbangan (antar proses)'), v: 100 * (a * r.n1) / wsum, c: 'var(--amber)' },
        { k: S('タクト差', 'Takt gap', 'Selisih takt'), v: 100 * (b * r.n2) / wsum, c: 'var(--purple, #6C3BAF)' }
      ];
      let sv = '', cursor = 0;
      parts.forEach(function (q) {
        if (q.v <= 0.01) { cursor += q.v; return; }
        sv += '<rect x="' + x(cursor) + '" y="18" width="' + (x(cursor + q.v) - x(cursor)) + '" height="26" fill="' + q.c + '" opacity=".9"/>';
        if (q.v > 7) sv += '<text x="' + ((x(cursor) + x(cursor + q.v)) / 2) + '" y="36" text-anchor="middle" style="fill:#fff;font-weight:800">' + fmt(q.v, 0) + '</text>';
        cursor += q.v;
      });
      sv += '<rect x="' + x(cursor) + '" y="18" width="' + Math.max(0, x(100) - x(cursor)) + '" height="26" fill="var(--green)" opacity=".85"/>';
      if (100 - cursor > 7) sv += '<text x="' + ((x(cursor) + x(100)) / 2) + '" y="36" text-anchor="middle" style="fill:#fff;font-weight:800">' + fmt(100 - cursor, 0) + '</text>';
      sv += '<text x="' + pad + '" y="12" style="font-weight:700;fill:var(--text-2)">' + esc(t(S('失点の内訳（赤＝バラツキ／黄＝編成／紫＝タクト差／緑＝得点）', 'Where the points go (red = variation, amber = balance, purple = takt gap, green = score)', 'Ke mana poin pergi (merah = variasi, kuning = keseimbangan, ungu = selisih takt, hijau = skor)'))) + '</text>';
      K.niceTicks(0, 100, 5).forEach(function (tv) { sv += '<text x="' + x(tv) + '" y="60" text-anchor="middle">' + tv + '</text>'; });
      return h('div', { html: svgWrap(Wd, Hd, sv) });
    }

    // 工程ごとの実力値とレンジ
    function procChart(r) {
      const Wd = 520, Hd = 210, pad = 34, n = r.cts.length;
      const top = Math.max(r.base, Math.max.apply(null, r.cts)) * 1.2;
      const y = K.scale(0, top, Hd - 30, 12);
      const gap = (Wd - pad - 10) / n, bw = Math.min(40, gap * 0.6);
      let sv = '';
      K.niceTicks(0, top, 4).forEach(function (tv) {
        sv += '<line class="grid-line" x1="' + pad + '" x2="' + (Wd - 6) + '" y1="' + y(tv) + '" y2="' + y(tv) + '"/>' +
              '<text x="' + (pad - 4) + '" y="' + (y(tv) + 4) + '" text-anchor="end">' + fmt(tv, 0) + '</text>';
      });
      r.cts.forEach(function (c, i) {
        const x0 = pad + gap * i + (gap - bw) / 2;
        const col = c === r.neck ? 'var(--red)' : 'var(--blue)';
        sv += '<rect x="' + x0 + '" y="' + y(c) + '" width="' + bw + '" height="' + (y(0) - y(c)) + '" rx="3" fill="' + col + '" opacity=".85"/>';
        // レンジ(工程内のバラツキ)をひげで重ねる
        const hi = Math.min(top, c + r.rgs[i]);
        sv += '<line x1="' + (x0 + bw / 2) + '" x2="' + (x0 + bw / 2) + '" y1="' + y(c) + '" y2="' + y(hi) + '" stroke="var(--text-2)" stroke-width="2" opacity=".55"/>' +
              '<line x1="' + (x0 + bw / 2 - 6) + '" x2="' + (x0 + bw / 2 + 6) + '" y1="' + y(hi) + '" y2="' + y(hi) + '" stroke="var(--text-2)" stroke-width="2" opacity=".55"/>';
        sv += '<text x="' + (x0 + bw / 2) + '" y="' + (Hd - 10) + '" text-anchor="middle">' + (i + 1) + '</text>';
      });
      sv += '<line x1="' + pad + '" x2="' + (Wd - 6) + '" y1="' + y(takt) + '" y2="' + y(takt) + '" stroke="var(--navy)" stroke-width="2" stroke-dasharray="7 4"/>' +
            '<text x="' + (Wd - 8) + '" y="' + (y(takt) - 5) + '" text-anchor="end" style="fill:var(--navy);font-weight:700">' + esc(t(S('タクト', 'Takt', 'Takt'))) + ' ' + fmt(takt, 0) + '</text>';
      if (r.base !== takt) {
        sv += '<line x1="' + pad + '" x2="' + (Wd - 6) + '" y1="' + y(r.base) + '" y2="' + y(r.base) + '" stroke="var(--red)" stroke-width="2" stroke-dasharray="3 3"/>' +
              '<text x="' + (Wd - 8) + '" y="' + (y(r.base) + 14) + '" text-anchor="end" style="fill:var(--red);font-weight:700">' + esc(t(S('基準＝ネック', 'Reference = neck', 'Acuan = leher botol'))) + ' ' + fmt(r.base, 0) + '</text>';
      }
      return h('div', null,
        h('div', { style: { fontSize: '13px', fontWeight: 700, color: 'var(--text-2)' }, text: t(S('工程ごとの実力値（棒）とレンジ（ひげ）', 'Standard CT per process (bars) and range (whiskers)', 'CT standar tiap proses (batang) dan rentang (garis)')) }),
        h('div', { html: svgWrap(Wd, Hd, sv) }));
    }

    const ctrls = h('div', null,
      number(S('タクトタイム（秒）', 'Takt time (s)', 'Takt time (detik)'), { value: takt, min: 1 }, function (x) { if (x > 0) { takt = x; draw(); } }),
      slider(S('工程間のばらつき（0＝完全に釣り合う、1＝実測どおり、2＝倍に開く）', 'Spread between processes (0 = perfectly even, 1 = as measured, 2 = twice as wide)', 'Sebaran antar proses (0 = merata sempurna, 1 = seperti terukur, 2 = dua kali lebih lebar)'),
        { value: spread, min: 0, max: 2, step: 0.05 }, function (x) { spread = x; draw(); }),
      slider(S('工程内のバラツキ（0＝ぶれ無し、1＝実測どおり）', 'Variation within a process (0 = no scatter, 1 = as measured)', 'Variasi dalam proses (0 = tanpa sebaran, 1 = seperti terukur)'),
        { value: noise, min: 0, max: 1.5, step: 0.05 }, function (x) { noise = x; draw(); }),
      slider(S('バラツキの重み γ', 'Weight on variation γ', 'Bobot variasi γ'), { value: g, min: 0, max: 10, step: 1 }, function (x) { g = x; draw(); }),
      slider(S('編成の重み α', 'Weight on balance α', 'Bobot keseimbangan α'), { value: a, min: 0, max: 10, step: 1 }, function (x) { a = x; draw(); }),
      slider(S('タクト差の重み β', 'Weight on takt gap β', 'Bobot selisih takt β'), { value: b, min: 0, max: 10, step: 1 }, function (x) { b = x; draw(); }),
      number(S('基準レンジ比（レンジが実力値の何倍で満点の失点か）', 'Reference range ratio (range ÷ standard CT that costs all the points)', 'Rasio rentang acuan (rentang ÷ CT standar yang menghabiskan poin)'), { value: R0, min: 0.5, step: 0.5 }, function (x) { if (x > 0) { R0 = x; draw(); } }));

    function draw() {
      res.innerHTML = '';
      const r = calc();
      res.appendChild(h('div.tiles', null,
        tile(S('スコア', 'Score', 'Skor'), fmt(r.score, 0) + ' / 100', S('0はだめ、100は完璧', '0 is bad, 100 is perfect', '0 buruk, 100 sempurna'), scoreJudge(r.score)),
        tile(S('編成効率', 'Line balance efficiency', 'Efisiensi keseimbangan lini'), ZA.pct(r.eff),
          S('基準時間 ' + fmt(r.base, 0) + '秒', 'reference ' + fmt(r.base, 0) + ' s', 'acuan ' + fmt(r.base, 0) + ' dtk'), r.eff >= 0.85 ? 'good' : r.eff >= 0.6 ? 'warn' : 'bad'),
        tile(S('工程内バラツキ（レンジ基準）', 'Within-process variation (range)', 'Variasi dalam proses (rentang)'), fmt(r.rms, 2),
          S('基準レンジ比 ' + fmt(R0, 1), 'ref ratio ' + fmt(R0, 1), 'rasio acuan ' + fmt(R0, 1)), r.n3 >= 1 ? 'bad' : r.n3 >= 0.5 ? 'warn' : 'good'),
        tile(S('ネックタイム', 'Neck time', 'Waktu leher botol'), fmt(r.neck, 0) + ' s', r.neck > takt ? S('タクト超過', 'over takt', 'melebihi takt') : S('タクト内', 'within takt', 'dalam takt'), r.neck > takt ? 'bad' : 'good')));
      res.appendChild(lossChart(r));
      res.appendChild(procChart(r));
      res.appendChild(h('div.tiles', null,
        tile(S('第1項 編成', '1st term: balance', 'Suku 1: keseimbangan'), fmt(r.n1, 2), S('母σ÷ネック＝' + fmt(r.t1, 3), 'pop σ ÷ neck = ' + fmt(r.t1, 3), 'σ populasi ÷ leher botol = ' + fmt(r.t1, 3))),
        tile(S('第2項 タクト差', '2nd term: takt gap', 'Suku 2: selisih takt'), fmt(r.n2, 2), S('｜ネック−タクト｜÷タクト', '|neck − takt| ÷ takt', '|leher botol − takt| ÷ takt')),
        tile(S('第3項 バラツキ', '3rd term: variation', 'Suku 3: variasi'), fmt(r.n3, 2), S('RMS（レンジ÷実力値）÷基準比', 'RMS(range ÷ standard CT) ÷ ref ratio', 'RMS(rentang ÷ CT standar) ÷ rasio acuan')),
        tile(S('重み', 'Weights', 'Bobot'), 'γ' + g + ' : α' + a + ' : β' + b)));
      const msgs = [];
      if (r.n3 >= 1) msgs.push(['bad', S('工程内のバラツキが基準レンジ比に達しています。ここを断たないと、編成もタクト差も正しく測れません。', 'Within-process variation has reached the reference ratio. Until it is cut, neither balance nor takt gap can be measured properly.', 'Variasi dalam proses telah mencapai rasio acuan. Sebelum ini dipangkas, keseimbangan maupun selisih takt tidak dapat diukur dengan benar.')]);
      if (r.neck > takt) msgs.push(['bad', S('ネックタイムがタクトタイムを超えたので、基準時間がネックタイムに切り替わりました。編成効率は「実際に流せるペースに対する釣り合い」を表します。', 'The neck time exceeds takt, so the reference switched to the neck time. Efficiency now describes the balance against the pace the line can actually run.', 'Waktu leher botol melampaui takt, sehingga acuan beralih ke waktu leher botol. Efisiensi kini menggambarkan keseimbangan terhadap laju yang benar-benar bisa dijalankan.')]);
      if (r.n3 < 0.3 && r.n1 >= 0.5) msgs.push(['warn', S('バラツキが収まった一方で、工程間の釣り合いが失点の主因になりました。次は山崩し（作業の移し替え）です。', 'Variation is under control, and the imbalance between processes is now the main loss. The next move is to move work across processes.', 'Variasi sudah terkendali, dan ketidakseimbangan antar proses kini menjadi kerugian utama. Langkah berikutnya adalah memindahkan pekerjaan antar proses.')]);
      if (r.score >= 85) msgs.push(['good', S('3つとも小さく収まっています。この状態を標準として固定し、次の理論値へ狙いを移します。', 'All three are small. Freeze this as the standard and aim at the next theoretical value.', 'Ketiganya kecil. Bekukan kondisi ini sebagai standar dan arahkan ke nilai teoretis berikutnya.')]);
      msgs.forEach(function (m) { res.appendChild(note(m[0], m[1])); });
    }

    s.body.appendChild(h('div.w-grid', null, ctrls, res));
    draw();
    return s.el;
  };

  /* ======================================================
   * vscore-calc
   * ====================================================== */
  W['vscore-calc'] = function (p) {
    const s = ZA.widgetShell(S('V.Score 計算機（σ/μ）', 'V.Score calculator (σ/μ)', 'Kalkulator V.Score (σ/μ)'));
    const A = p.a || [42, 44, 41, 43, 42, 45, 43, 42, 44, 43];
    const B = p.b || [38, 55, 44, 66, 41, 49, 60, 39, 52, 70];
    const taA = h('textarea', { rows: 3 }); taA.value = A.join(', ');
    const taB = h('textarea', { rows: 3 }); taB.value = B.join(', ');
    let stdCt = p.stdCt || 46;
    [taA, taB].forEach(function (x) { x.addEventListener('input', draw); });
    const res = h('div');
    const ctrls = h('div', null,
      h('div.ctrl', null, h('label', null, h('span', { text: t(S('作業者A のCT（秒）', 'Operator A CT (s)', 'CT Operator A (detik)')) })), taA),
      h('div.ctrl', null, h('label', null, h('span', { text: t(S('作業者B のCT（秒）', 'Operator B CT (s)', 'CT Operator B (detik)')) })), taB),
      number(S('標準CT（CT達成率の基準・秒）', 'Standard CT for achievement rate (s)', 'CT standar untuk tingkat capaian (detik)'), { value: stdCt, min: 0.1 }, function (x) { if (x > 0) { stdCt = x; draw(); } }));
    function calc(d) {
      const m = st.mean(d), sd = st.sd(d, false);   // V.Score は母標準偏差（n）で割る
      const ach = d.filter(function (x) { return x <= stdCt; }).length / d.length;
      return { m: m, sd: sd, v: sd / m, ach: ach, d: d };
    }
    function draw() {
      res.innerHTML = '';
      const a = ui.parseNums(taA.value), b = ui.parseNums(taB.value);
      if (a.length < 2 || b.length < 2) { res.appendChild(note('warn', S('各2個以上の数値を入力してください', 'Enter at least two values each', 'Masukkan minimal dua nilai masing-masing'))); return; }
      const ra = calc(a), rb = calc(b);
      [[ra, 'A'], [rb, 'B']].forEach(function (x) {
        const j = vJudge(x[0].v);
        res.appendChild(h('div', { style: { fontWeight: 800, margin: '4px 0' }, text: t(S('作業者', 'Operator', 'Operator')) + ' ' + x[1] }));
        res.appendChild(h('div.tiles', null,
          tile('μ', fmt(x[0].m, 1) + ' s'), tile('σ', fmt(x[0].sd, 2) + ' s'),
          tile('V.Score', fmt(x[0].v, 3), j[1], j[0]),
          tile(S('CT達成率', 'CT achievement', 'Capaian CT'), ZA.pct(x[0].ach, 0), S('目標 ≥95%', 'target ≥95%', 'target ≥95%'), x[0].ach >= 0.95 ? 'good' : 'warn')));
      });
      const all = a.concat(b), lo = Math.min(st.min(all), stdCt) * 0.95, hi = Math.max(st.max(all), stdCt) * 1.03;
      const Wd = 520, Hd = 120, x = K.scale(lo, hi, 40, Wd - 12);
      let g = '';
      K.niceTicks(lo, hi, 6).forEach(function (tv) { g += '<line class="grid-line" x1="' + x(tv) + '" x2="' + x(tv) + '" y1="10" y2="' + (Hd - 22) + '"/><text x="' + x(tv) + '" y="' + (Hd - 6) + '" text-anchor="middle">' + tv + '</text>'; });
      g += '<line x1="' + x(stdCt) + '" x2="' + x(stdCt) + '" y1="6" y2="' + (Hd - 22) + '" stroke="var(--navy)" stroke-width="2" stroke-dasharray="5 4"/><text x="' + (x(stdCt) + 4) + '" y="14" style="fill:var(--navy);font-weight:700">' + esc(t(S('標準CT', 'Std CT', 'CT std'))) + '</text>';
      [[a, 38, 'var(--green)', 'A'], [b, 72, 'var(--red)', 'B']].forEach(function (r) {
        g += '<text x="8" y="' + (r[1] + 4) + '" style="font-weight:800;fill:var(--text)">' + r[3] + '</text>';
        r[0].forEach(function (v, i) { g += '<circle cx="' + x(v) + '" cy="' + (r[1] + ((i % 3) - 1) * 5) + '" r="5" fill="' + r[2] + '" opacity=".75"/>'; });
      });
      res.appendChild(h('div', { html: svgWrap(Wd, Hd, g) }));
      res.appendChild(note('', S('平均だけを見ると差は ' + fmt(Math.abs(ra.m - rb.m), 1) + ' 秒ですが、V.Scoreは A=' + fmt(ra.v, 3) + '、B=' + fmt(rb.v, 3) + '。バラツキの大きい作業者は、平均が良くても「予測できない工程」です。ZEVAでは平均ではなくバラツキで評価します。',
        'By mean the gap is only ' + fmt(Math.abs(ra.m - rb.m), 1) + ' s, but V.Score is A=' + fmt(ra.v, 3) + ', B=' + fmt(rb.v, 3) + '. A widely varying operator is an unpredictable process even if the mean looks fine. ZEVA evaluates variation, not the average.',
        'Dari rata-rata selisihnya hanya ' + fmt(Math.abs(ra.m - rb.m), 1) + ' detik, tetapi V.Score A=' + fmt(ra.v, 3) + ', B=' + fmt(rb.v, 3) + '. Operator bervariasi besar = proses yang tak terduga walau rata-rata bagus. ZEVA menilai variasi, bukan rata-rata.')));
      res.appendChild(h('div.muted', { style: { fontSize: '12px', marginTop: '6px' }, text: t(S('判定：<0.1 極めて安定／0.1〜0.3 安定／0.3〜0.5 やや不安定／0.5〜1.0 不安定／≥1.0 非常に不安定（σは母標準偏差。観測した作業そのものを評価するので n で割る）', 'Scale: <0.1 extremely stable / 0.1–0.3 stable / 0.3–0.5 slightly unstable / 0.5–1.0 unstable / ≥1.0 very unstable (σ = population SD, divided by n, because we rate the work we observed)', 'Skala: <0,1 sangat stabil / 0,1–0,3 stabil / 0,3–0,5 agak tidak stabil / 0,5–1,0 tidak stabil / ≥1,0 sangat tidak stabil (σ populasi, dibagi n, karena yang dinilai adalah kerja yang diamati)')) }));
    }
    s.body.appendChild(h('div.w-grid', null, ctrls, res));
    draw();
    return s.el;
  };

  /* ======================================================
   * data-trust  (root-logic demo)
   * ====================================================== */
  W['data-trust'] = function () {
    const s = ZA.widgetShell(S('根底ロジック体験：そのデータで判断できますか？', 'Root-logic lab: can you decide with this data?', 'Lab logika dasar: bisakah memutuskan dengan data ini?'));
    let sigma = 1.0, runs = null, cur = null, guess = null;
    const before = 30, after = 28; // true improvement: 2 s
    const res = h('div');
    const ctrls = h('div', null,
      h('p', { style: { fontSize: '14px' }, html: md(S('ある工程で改善を行いました。**本当の効果はCT −2秒**です。改善前後で各10サイクル測定したデータから、改善が効いたと判断できるでしょうか？ 工程のバラツキ（σ）を変えて試してください。', 'An improvement was made. **The true effect is −2 s of CT.** From 10 cycles measured before and after, can you tell it worked? Change the process variation (σ) and try.', 'Sebuah perbaikan dilakukan. **Efek sebenarnya CT −2 detik.** Dari 10 siklus sebelum dan sesudah, bisakah Anda tahu itu berhasil? Ubah variasi proses (σ) dan coba.')) }),
      slider(S('工程のバラツキ σ（秒）', 'Process variation σ (s)', 'Variasi proses σ (detik)'), { min: 0.5, max: 8, step: 0.5, value: sigma }, function (x) { sigma = x; runs = null; cur = null; guess = null; draw(); }),
      h('div.w-actions', null,
        btn(S('測定する（前後10個ずつ）', 'Measure (10 before / 10 after)', 'Ukur (10 sebelum / 10 sesudah)'), function () { cur = gen(); guess = null; draw(); }, 'btn-primary'),
        btn(S('100回繰り返して検証', 'Repeat 100 times', 'Ulangi 100 kali'), function () { sim100(); draw(); })));
    function gen() {
      const b = [], a = [];
      for (let i = 0; i < 10; i++) { b.push(before + st.randn() * sigma); a.push(after + st.randn() * sigma); }
      return { b: b, a: a };
    }
    function tstat(d) {
      const mb = st.mean(d.b), ma = st.mean(d.a), vb = Math.pow(st.sd(d.b), 2), va = Math.pow(st.sd(d.a), 2);
      return (mb - ma) / Math.sqrt(vb / 10 + va / 10);
    }
    function sim100() {
      let clear = 0, wrongDir = 0;
      for (let i = 0; i < 100; i++) {
        const d = gen(), tv = tstat(d);
        if (tv > 2.1) clear++;
        if (st.mean(d.a) >= st.mean(d.b)) wrongDir++;
      }
      runs = { clear: clear, wrongDir: wrongDir };
    }
    function draw() {
      res.innerHTML = '';
      if (cur) {
        const lo = Math.min(st.min(cur.a), st.min(cur.b)) - 1, hi = Math.max(st.max(cur.a), st.max(cur.b)) + 1;
        const Wd = 520, Hd = 130, x = K.scale(lo, hi, 70, Wd - 12);
        let g = '';
        K.niceTicks(lo, hi, 6).forEach(function (tv) { g += '<line class="grid-line" x1="' + x(tv) + '" x2="' + x(tv) + '" y1="8" y2="' + (Hd - 22) + '"/><text x="' + x(tv) + '" y="' + (Hd - 6) + '" text-anchor="middle">' + tv + '</text>'; });
        [[cur.b, 36, 'var(--gray)', S('改善前', 'Before', 'Sebelum')], [cur.a, 80, 'var(--blue)', S('改善後', 'After', 'Sesudah')]].forEach(function (r) {
          g += '<text x="6" y="' + (r[1] + 4) + '" style="font-weight:800;fill:var(--text)">' + esc(t(r[3])) + '</text>';
          r[0].forEach(function (v, i) { g += '<circle cx="' + x(v) + '" cy="' + (r[1] + ((i % 3) - 1) * 6) + '" r="5" fill="' + r[2] + '" opacity=".8"/>'; });
          const m = st.mean(r[0]);
          g += '<line x1="' + x(m) + '" x2="' + x(m) + '" y1="' + (r[1] - 16) + '" y2="' + (r[1] + 16) + '" stroke="var(--navy)" stroke-width="3"/>';
        });
        res.appendChild(h('div', { html: svgWrap(Wd, Hd, g) }));
        if (guess == null) {
          res.appendChild(h('div', { style: { fontWeight: 700, margin: '6px 0' }, text: t(S('あなたの判断は？', 'Your call?', 'Keputusan Anda?')) }));
          res.appendChild(h('div.w-actions', null,
            btn(S('改善した', 'Improved', 'Membaik'), function () { guess = 'yes'; draw(); }),
            btn(S('変わらない／悪化', 'No change / worse', 'Tidak berubah / memburuk'), function () { guess = 'no'; draw(); }),
            btn(S('このデータでは判断できない', 'Can’t tell from this data', 'Tak bisa diputuskan'), function () { guess = 'unk'; draw(); })));
        } else {
          const tv = tstat(cur), clear = tv > 2.1;
          const diff = st.mean(cur.b) - st.mean(cur.a);
          res.appendChild(h('div.tiles', null,
            tile(S('平均の差（前−後）', 'Mean difference', 'Selisih rata-rata'), fmt(diff, 2) + ' s'),
            tile(S('t値（目安 >2.1で有意）', 't value (>2.1 significant)', 'nilai t (>2,1 signifikan)'), fmt(tv, 2), null, clear ? 'good' : 'warn')));
          res.appendChild(note(clear ? 'good' : 'warn', clear
            ? S('バラツキが小さいため、2秒の差がノイズに埋もれず**データで判断できます**。', 'Variation is small, so the 2 s effect stands out from noise — **the data support a decision**.', 'Variasi kecil, jadi efek 2 detik terlihat jelas — **data mendukung keputusan**.')
            : S('バラツキ（ノイズ）が大きく、本当は効果があるのに**データからは判断できません**。これが「バラツキが大きい＝データの信頼性が無い＝アクションを起こせない」という根底ロジックです。', 'Noise is large: the effect is real, but **the data cannot show it**. This is the root logic — large variation → unreliable data → no confident action.', 'Noise besar: efeknya nyata, tetapi **data tidak bisa menunjukkannya**. Inilah logika dasar — variasi besar → data tak andal → tak bisa bertindak.')));
        }
      } else {
        res.appendChild(note('', S('「測定する」を押してデータを取りましょう。', 'Press “Measure” to collect data.', 'Tekan “Ukur” untuk mengambil data.')));
      }
      if (runs) {
        res.appendChild(h('div.tiles', { style: { marginTop: '10px' } },
          tile(S('100回中「効果あり」と判定できた回数', 'Out of 100: effect detected', 'Dari 100: efek terdeteksi'), String(runs.clear), null, runs.clear >= 80 ? 'good' : runs.clear >= 40 ? 'warn' : 'bad'),
          tile(S('100回中「逆に悪化」に見えた回数', 'Out of 100: looked worse', 'Dari 100: tampak memburuk'), String(runs.wrongDir), null, runs.wrongDir > 5 ? 'bad' : 'good')));
        res.appendChild(note('', S('σ = ' + sigma + ' 秒のとき、同じ改善でも判断の再現性はこの程度です。σを小さくすると、ほぼ毎回正しく判断できるようになります（好循環）。',
          'With σ = ' + sigma + ' s, this is how reproducible the judgement is for the very same improvement. Shrink σ and you decide correctly almost every time (virtuous cycle).',
          'Dengan σ = ' + sigma + ' detik, inilah tingkat reprodusibilitas keputusan untuk perbaikan yang sama. Kecilkan σ dan keputusan hampir selalu benar (siklus baik).')));
      }
    }
    s.body.appendChild(h('div.w-grid', null, ctrls, res));
    draw();
    return s.el;
  };

  /* ======================================================
   * theory-gap
   * ====================================================== */
  W['theory-gap'] = function (p) {
    const s = ZA.widgetShell(S('理論値とロスの計算', 'Theoretical values & losses', 'Nilai teoretis & kerugian'));
    const v = { val: p.value == null ? 12 : p.value, semi: p.semi == null ? 18 : p.semi, non: p.non == null ? 30 : p.non };
    const res = h('div');
    const ctrls = h('div', null,
      slider(S('価値作業（秒）', 'Value work (s)', 'Kerja bernilai (detik)'), { min: 1, max: 60, value: v.val, unit: 's' }, function (x) { v.val = x; draw(); }),
      slider(S('準価値作業（秒）', 'Semi-value work (s)', 'Kerja semi-nilai (detik)'), { min: 0, max: 60, value: v.semi, unit: 's' }, function (x) { v.semi = x; draw(); }),
      slider(S('無価値作業（秒）', 'Non-value work (s)', 'Kerja tanpa nilai (detik)'), { min: 0, max: 90, value: v.non, unit: 's' }, function (x) { v.non = x; draw(); }));
    function draw() {
      res.innerHTML = '';
      // v23.1: technical theoretical value = value work only
      const total = v.val + v.semi + v.non, site = v.val + v.semi, tech = v.val;
      const ratio = v.val / total;
      res.appendChild(h('div.tiles', null,
        tile(S('現状CT', 'Current CT', 'CT saat ini'), fmt(total, 0) + ' s'),
        tile(S('現場理論値', 'Site theoretical', 'Teoretis lapangan'), fmt(site, 0) + ' s', S('価値＋準価値', 'value + semi', 'nilai + semi')),
        tile(S('技術理論値', 'Technical theoretical', 'Teoretis teknis'), fmt(tech, 0) + ' s', S('価値のみ', 'value only', 'hanya nilai')),
        tile(S('価値作業比率', 'Value-work ratio', 'Rasio kerja bernilai'), ZA.pct(ratio, 0), S('目標 50〜60%以上', 'target 50–60%+', 'target 50–60%+'), ratio >= 0.5 ? 'good' : ratio >= 0.3 ? 'warn' : 'bad')));
      const Wd = 520, Hd = 150, x = K.scale(0, total, 10, Wd - 10);
      let g = '';
      const seg = [[0, v.val, 'var(--green)', S('価値', 'Value', 'Nilai')], [v.val, site, 'var(--amber)', S('準価値', 'Semi', 'Semi')], [site, total, 'var(--red)', S('無価値', 'Non-value', 'Tanpa nilai')]];
      seg.forEach(function (sg) {
        if (sg[1] <= sg[0]) return;
        g += '<rect x="' + x(sg[0]) + '" y="40" width="' + (x(sg[1]) - x(sg[0])) + '" height="40" fill="' + sg[2] + '" opacity=".8"/>';
        if (x(sg[1]) - x(sg[0]) > 40) g += '<text x="' + ((x(sg[0]) + x(sg[1])) / 2) + '" y="64" text-anchor="middle" style="fill:#fff;font-weight:800;font-size:12px">' + esc(t(sg[3])) + '</text>';
      });
      function br(a, b, yy, label, col) {
        if (b <= a) return '';
        return '<path d="M' + x(a) + ',' + (yy + 6) + ' V' + yy + ' H' + x(b) + ' V' + (yy + 6) + '" fill="none" stroke="' + col + '" stroke-width="2"/><text x="' + ((x(a) + x(b)) / 2) + '" y="' + (yy - 5) + '" text-anchor="middle" style="fill:' + col + ';font-weight:700">' + esc(label) + '</text>';
      }
      g += br(0, site, 28, t(S('現場理論値', 'Site theoretical', 'Teoretis lapangan')), 'var(--blue)');
      g += '<path d="M' + x(v.val) + ',96 V104 H' + x(site) + ' V96" fill="none" stroke="var(--amber)" stroke-width="2"/><text x="' + ((x(v.val) + x(site)) / 2) + '" y="120" text-anchor="middle" style="fill:var(--amber);font-weight:700">' + esc(t(S('技術ロス', 'Technical loss', 'Kerugian teknis'))) + ' ' + fmt(v.semi, 0) + 's</text>';
      g += '<path d="M' + x(site) + ',96 V104 H' + x(total) + ' V96" fill="none" stroke="var(--red)" stroke-width="2"/><text x="' + ((x(site) + x(total)) / 2) + '" y="140" text-anchor="middle" style="fill:var(--red);font-weight:700">' + esc(t(S('管理ロス', 'Management loss', 'Kerugian manajemen'))) + ' ' + fmt(v.non, 0) + 's</text>';
      res.appendChild(h('div', { html: svgWrap(Wd, Hd, g) }));
      res.appendChild(note('', S('まず**管理ロス（無価値）**を管理改善・ECRSで排除すれば、CTは ' + fmt(total, 0) + '秒 → ' + fmt(site, 0) + '秒（−' + ZA.pct(v.non / total, 0) + '）。その先の**技術ロス（準価値）**は工法変更・設備投資で縮めます。',
        'Removing the **management loss (non-value)** through better management and ECRS takes CT from ' + fmt(total, 0) + ' s to ' + fmt(site, 0) + ' s (−' + ZA.pct(v.non / total, 0) + '). The remaining **technical loss (semi-value)** needs new methods or investment.',
        'Menghapus **kerugian manajemen (tanpa nilai)** lewat perbaikan manajemen & ECRS menurunkan CT dari ' + fmt(total, 0) + ' ke ' + fmt(site, 0) + ' detik (−' + ZA.pct(v.non / total, 0) + '). Sisa **kerugian teknis (semi-nilai)** butuh metode baru atau investasi.')));
    }
    s.body.appendChild(h('div.w-grid', null, ctrls, res));
    draw();
    return s.el;
  };

  /* ======================================================
   * gpc-band
   * ====================================================== */
  W['gpc-band'] = function () {
    const s = ZA.widgetShell(S('GPCバンド・シミュレーター', 'GPC band simulator', 'Simulator GPC band'));
    const band = { min: 240, max: 260, target: 250 };
    const v = { mu: 254, sd: 4.5 };
    let pts = [];
    const res = h('div');
    const muC = slider(S('工程の中心（平均）', 'Process center (mean)', 'Pusat proses (rata-rata)'), { min: 236, max: 264, step: 0.5, value: v.mu }, function (x) { v.mu = x; resample(); });
    const sdC = slider(S('工程のバラツキ σ', 'Process variation σ', 'Variasi proses σ'), { min: 0.5, max: 9, step: 0.1, value: v.sd }, function (x) { v.sd = x; resample(); });
    const ctrls = h('div', null,
      h('p', { style: { fontSize: '14px' }, html: md(S('例：はんだ温度（℃）。物理実験で **240〜260℃ なら良品が保証される**ことを確認し、Target（理論値）は 250℃ とします。', 'Example: soldering temperature (°C). Physical trials confirmed **good parts are guaranteed between 240–260 °C**; Target (theoretical value) = 250 °C.', 'Contoh: suhu solder (°C). Uji fisik memastikan **produk baik terjamin pada 240–260 °C**; Target (nilai teoretis) = 250 °C.')) }),
      muC, sdC,
      h('div.w-actions', null,
        btn(S('① バラツキを減らす（σ×0.6）', '① Reduce variation (σ×0.6)', '① Kurangi variasi (σ×0,6)'), function () { v.sd = Math.max(0.5, +(v.sd * 0.6).toFixed(1)); sdC.set(v.sd); resample(); }, 'btn-primary'),
        btn(S('② 中心を狙う（Center-Aiming）', '② Center-aiming', '② Center-aiming'), function () { v.mu = band.target; muC.set(v.mu); resample(); }),
        btn(S('再サンプリング', 'Resample', 'Sampel ulang'), resample)));
    function resample() { pts = []; for (let i = 0; i < 60; i++) pts.push(v.mu + st.randn() * v.sd); draw(); }
    function draw() {
      res.innerHTML = '';
      const inBand = pts.filter(function (x) { return x >= band.min && x <= band.max; }).length / pts.length;
      const theo = st.phi((band.max - v.mu) / v.sd) - st.phi((band.min - v.mu) / v.sd);
      const stage1 = theo >= 0.99, stage2 = stage1 && Math.abs(v.mu - band.target) <= 1;
      res.appendChild(h('div.tiles', null,
        tile(S('バンド適合率（今回60点）', 'Conformance (60 pts)', 'Kesesuaian (60 titik)'), ZA.pct(inBand, 1)),
        tile(S('バンド適合率（理論）', 'Conformance (theory)', 'Kesesuaian (teori)'), ZA.pct(theo, 2), S('目標 ≥99%', 'target ≥99%', 'target ≥99%'), stage1 ? 'good' : theo > 0.95 ? 'warn' : 'bad'),
        tile(S('Targetとのズレ', 'Offset from Target', 'Selisih dari Target'), fmt(v.mu - band.target, 1) + ' ℃', null, Math.abs(v.mu - band.target) <= 1 ? 'good' : 'warn')));
      const Wd = 520, Hd = 200, pad = 40;
      const x = K.scale(0, pts.length - 1, pad, Wd - 12), y = K.scale(228, 272, Hd - 14, 10);
      let g = '<rect x="' + pad + '" y="' + y(band.max) + '" width="' + (Wd - 12 - pad) + '" height="' + (y(band.min) - y(band.max)) + '" fill="var(--tone-green-bg)"/>';
      [[band.max, 'GPC_max', 'var(--green)', '6 4'], [band.target, 'Target', 'var(--navy)', ''], [band.min, 'GPC_min', 'var(--green)', '6 4']].forEach(function (l) {
        g += '<line x1="' + pad + '" x2="' + (Wd - 12) + '" y1="' + y(l[0]) + '" y2="' + y(l[0]) + '" stroke="' + l[2] + '" stroke-width="1.8"' + (l[3] ? ' stroke-dasharray="' + l[3] + '"' : '') + '/><text x="' + (pad - 4) + '" y="' + (y(l[0]) + 4) + '" text-anchor="end" style="fill:' + l[2] + ';font-weight:700;font-size:10px">' + l[0] + '</text>';
      });
      pts.forEach(function (pv, i) {
        const ok = pv >= band.min && pv <= band.max;
        g += '<circle cx="' + x(i) + '" cy="' + y(Math.max(229, Math.min(271, pv))) + '" r="3.8" fill="' + (ok ? 'var(--blue)' : 'var(--red)') + '"/>';
      });
      res.appendChild(h('div', { html: svgWrap(Wd, Hd, g) }));
      res.appendChild(note(stage2 ? 'good' : stage1 ? 'good' : 'warn', stage2
        ? S('**第二段階達成**：バンド内に収束し、中心もTargetに一致しています。これがZEVAの「ゼロ」の姿です。', '**Stage 2 reached**: converged in band and centered on Target — ZEVA’s “zero”.', '**Tahap 2 tercapai**: di dalam band dan terpusat pada Target — “nol” versi ZEVA.')
        : stage1 ? S('**第一段階達成**（Variation Under Control）。次は分布の中心をTargetに近づけましょう（Center-Aiming）。', '**Stage 1 reached** (Variation Under Control). Next, move the center toward Target (center-aiming).', '**Tahap 1 tercapai** (Variation Under Control). Selanjutnya geser pusat ke Target (center-aiming).')
          : S('バンド外（赤）が発生しています。中心をずらすだけでは限界があります。まず**バラツキ（σ）を小さく**してバンド内に収めることが第一段階です。', 'Points fall outside the band (red). Moving the center alone has limits — first **shrink σ** to fit the band (Stage 1).', 'Ada titik di luar band (merah). Menggeser pusat saja terbatas — pertama **kecilkan σ** agar masuk band (Tahap 1).')));
    }
    s.body.appendChild(h('div.w-grid', null, ctrls, res));
    resample();
    return s.el;
  };

  /* ======================================================
   * motion-laws
   * ====================================================== */
  W['motion-laws'] = function () {
    const s = ZA.widgetShell(S('動作安定の3法則ラボ', 'Motion stability lab (3 laws)', 'Lab 3 hukum stabilitas gerakan'));
    const tabs = h('div.tabs');
    const pane = h('div');
    const defs = [
      [S('第1法則 距離・変位', 'Law 1 Distance', 'Hukum 1 Jarak'), distance],
      [S('第2法則 シーケンス累積', 'Law 2 Sequence', 'Hukum 2 Urutan'), sequence],
      [S('第3法則 拘束とガイド', 'Law 3 Constraint', 'Hukum 3 Pembatas'), constraint],
    ];
    defs.forEach(function (d, i) {
      const b = h('button', { type: 'button', text: t(d[0]) });
      b.addEventListener('click', function () { Array.prototype.forEach.call(tabs.children, function (x) { x.classList.remove('on'); }); b.classList.add('on'); pane.innerHTML = ''; pane.appendChild(d[1]()); });
      tabs.appendChild(b);
      if (!i) { b.classList.add('on'); }
    });
    s.body.appendChild(tabs); s.body.appendChild(pane);
    pane.appendChild(distance());

    function scatter(spread, seedN, label) {
      const Wd = 220, Hd = 220, c = 110;
      let g = '';
      [90, 60, 30].forEach(function (r, k) { g += '<circle cx="' + c + '" cy="' + c + '" r="' + r + '" fill="' + (k % 2 ? 'var(--surface)' : 'var(--surface-2)') + '" stroke="var(--border-strong)"/>'; });
      g += '<rect x="' + (c - 12) + '" y="' + (c - 12) + '" width="24" height="24" fill="none" stroke="var(--green)" stroke-width="2.5"/>';
      for (let i = 0; i < seedN; i++) {
        const px = c + st.randn() * spread, py = c + st.randn() * spread;
        const ok = Math.abs(px - c) <= 12 && Math.abs(py - c) <= 12;
        g += '<circle cx="' + px + '" cy="' + py + '" r="3.2" fill="' + (ok ? 'var(--blue)' : 'var(--red)') + '" opacity=".8"/>';
      }
      g += '<text x="' + c + '" y="' + (Hd - 4) + '" text-anchor="middle" style="font-weight:700;fill:var(--text)">' + esc(label) + '</text>';
      return svgWrap(Wd, Hd, g);
    }
    function distance() {
      const box = h('div.w-grid');
      const out = h('div');
      let dist = 60;
      const c = h('div', null,
        h('p', { style: { fontSize: '14px' }, html: md(S('**動作距離の短縮は、バラツキの許容範囲を物理的に縮小する。** 手の方向が同じ角度（±2°）ぶれても、遠くへ伸ばすほど着地点のズレは大きくなります。', '**Shorter motion distance physically shrinks the room for variation.** With the same ±2° wobble in direction, the farther you reach, the larger the landing error.', '**Jarak gerak yang lebih pendek secara fisik mempersempit ruang variasi.** Dengan goyangan arah ±2° yang sama, makin jauh menjangkau, makin besar penyimpangan.')) }),
        slider(S('手を伸ばす距離（cm）', 'Reach distance (cm)', 'Jarak jangkauan (cm)'), { min: 10, max: 80, value: dist, unit: 'cm' }, function (x) { dist = x; render(); }));
      function render() {
        const dev = dist * Math.tan(2 * Math.PI / 180);
        out.innerHTML = '';
        out.appendChild(h('div.tiles', null, tile(S('ズレ（±）', 'Error (±)', 'Penyimpangan (±)'), fmt(dev * 10, 1) + ' mm', null, dev < 1 ? 'good' : dev < 2 ? 'warn' : 'bad')));
        out.appendChild(h('div', { style: { maxWidth: '260px' }, html: scatter(dev * 7, 40, t(S('着地点のバラツキ', 'Landing spread', 'Sebaran pendaratan'))) }));
        out.appendChild(note('', S('部品・工具を「手元化」（価値作業範囲に配置）すると、時間だけでなくバラツキも減ります。', 'Bringing parts and tools close (inside the value-work zone) cuts variation, not just time.', 'Mendekatkan part & alat (di zona kerja bernilai) mengurangi variasi, bukan hanya waktu.')));
      }
      render();
      box.appendChild(c); box.appendChild(out);
      return box;
    }
    function sequence() {
      const box = h('div.w-grid');
      const out = h('div');
      let n = 12, pe = 0.5;
      const c = h('div', null,
        h('p', { style: { fontSize: '14px' }, html: md(S('**動作数の削減は、バラツキ発生の機会を消滅させる。** 1つの動作でミスが起きる確率を p とすると、n 個の動作をすべて正しく終える確率は **(1−p)<sup>n</sup>** です。動作を減らす＝サイコロを振る回数を減らす。', '**Fewer motions eliminate opportunities for variation.** If each motion fails with probability p, doing n motions all correctly has probability **(1−p)<sup>n</sup>**. Fewer motions = fewer dice rolls.', '**Lebih sedikit gerakan menghapus peluang variasi.** Jika tiap gerakan gagal dengan peluang p, peluang n gerakan semuanya benar adalah **(1−p)<sup>n</sup>**. Lebih sedikit gerakan = lebih sedikit lemparan dadu.')) }),
        slider(S('1製品あたりの動作数 n', 'Motions per unit n', 'Gerakan per unit n'), { min: 1, max: 40, value: n }, function (x) { n = x; render(); }),
        slider(S('1動作のミス確率 p', 'Error probability per motion p', 'Peluang salah per gerakan p'), { min: 0.05, max: 3, step: 0.05, value: pe, unit: '%' }, function (x) { pe = x; render(); }));
      function render() {
        const pp = pe / 100, ok = Math.pow(1 - pp, n);
        out.innerHTML = '';
        out.appendChild(h('div.tiles', null,
          tile(S('全動作が正しい確率', 'All motions correct', 'Semua gerakan benar'), ZA.pct(ok, 2), null, ok > 0.99 ? 'good' : ok > 0.95 ? 'warn' : 'bad'),
          tile(S('不良の機会（ppm）', 'Defect opportunity (ppm)', 'Peluang cacat (ppm)'), fmt((1 - ok) * 1e6, 0))));
        const Wd = 520, Hd = 170, x = K.scale(1, 40, 40, Wd - 12), y = K.scale(0.4, 1, Hd - 22, 10);
        let g = '';
        [0.4, 0.6, 0.8, 1].forEach(function (tv) { g += '<line class="grid-line" x1="40" x2="' + (Wd - 12) + '" y1="' + y(tv) + '" y2="' + y(tv) + '"/><text x="36" y="' + (y(tv) + 4) + '" text-anchor="end">' + (tv * 100) + '%</text>'; });
        let d = '';
        for (let k = 1; k <= 40; k++) d += (k > 1 ? 'L' : 'M') + x(k) + ',' + y(Math.max(0.4, Math.pow(1 - pp, k)));
        g += '<path d="' + d + '" fill="none" stroke="var(--blue)" stroke-width="2.5"/>';
        g += '<circle cx="' + x(n) + '" cy="' + y(Math.max(0.4, ok)) + '" r="6" fill="var(--red)"/>';
        [1, 10, 20, 30, 40].forEach(function (k) { g += '<text x="' + x(k) + '" y="' + (Hd - 6) + '" text-anchor="middle">' + k + '</text>'; });
        out.appendChild(h('div', { html: svgWrap(Wd, Hd, g) }));
        const half = Math.max(1, Math.round(n / 2));
        out.appendChild(note('', S('動作を ' + n + ' → ' + half + ' に半減すると、不良の機会は約 ' + fmt((1 - Math.pow(1 - pp, half)) * 1e6, 0) + ' ppm に減ります。ECRSの「E（廃除）」「C（結合）」がバラツキ対策になる理由です。', 'Halving motions from ' + n + ' to ' + half + ' cuts defect opportunities to about ' + fmt((1 - Math.pow(1 - pp, half)) * 1e6, 0) + ' ppm. That is why ECRS “Eliminate” and “Combine” are variation countermeasures.', 'Mengurangi gerakan dari ' + n + ' ke ' + half + ' menurunkan peluang cacat menjadi sekitar ' + fmt((1 - Math.pow(1 - pp, half)) * 1e6, 0) + ' ppm. Karena itu “Eliminate” dan “Combine” pada ECRS adalah penanggulangan variasi.')));
      }
      render();
      box.appendChild(c); box.appendChild(out);
      return box;
    }
    function constraint() {
      const box = h('div');
      const opts = [[S('自由な動作（目分量で置く）', 'Free motion (by eye)', 'Gerak bebas (perkiraan mata)'), 22], [S('ガイドあり（当て面・溝）', 'With a guide (edge, groove)', 'Dengan pemandu (tepi, alur)'), 8], [S('拘束（位置決めピン・ストッパー）', 'Constrained (locating pin, stopper)', 'Dibatasi (pin, stopper)'), 2.5]];
      box.appendChild(h('p', { style: { fontSize: '14px' }, html: md(S('**自由度の制限は、バラツキの発生を構造的に封じる。** 同じ作業者でも、治具で動きを拘束すると置き位置のバラツキはゼロに近づきます。緑の枠が許容範囲です。', '**Limiting degrees of freedom structurally locks out variation.** Same operator — constrain the motion with a jig and placement spread approaches zero. The green square is the tolerance.', '**Membatasi derajat kebebasan mengunci variasi secara struktural.** Operator sama — batasi gerak dengan jig dan sebaran penempatan mendekati nol. Kotak hijau = toleransi.')) }));
      const row = h('div.grid.grid-3');
      opts.forEach(function (o) { row.appendChild(h('div', { style: { textAlign: 'center' }, html: scatter(o[1], 50, t(o[0])) })); });
      box.appendChild(row);
      box.appendChild(h('div.w-actions', null, btn(S('もう一度置いてみる', 'Place again', 'Tempatkan lagi'), function () { const n = constraint(); box.replaceWith(n); })));
      box.appendChild(note('', S('ポカヨケ・位置決め治具は「注意して作業する」を不要にする仕組みです。人の注意力に頼る標準は、バラツキを残します。', 'Poka-yoke and locating jigs remove the need to “be careful”. Standards that rely on attention leave variation behind.', 'Poka-yoke dan jig penentu posisi menghapus kebutuhan “hati-hati”. Standar yang bergantung pada perhatian meninggalkan variasi.')));
      return box;
    }
    return s.el;
  };

  /* ======================================================
   * triage-wizard
   * ====================================================== */
  W['triage-wizard'] = function () {
    const s = ZA.widgetShell(S('トリアージ判定ウィザード', 'Triage wizard', 'Wizard triase'));
    const Q = [
      { key: 'cause', q: S('Step 1（基準①）：原因に心当たりがありますか？', 'Step 1 (criterion ①): Do you have an idea of the cause?', 'Step 1 (kriteria ①): Apakah ada dugaan penyebab?'),
        hint: S('「これをこう変えれば良くなるはず」という仮説が立つか', 'Can you state “if we change this, it should improve”?', 'Bisakah menyatakan “jika ini diubah, seharusnya membaik”?'),
        a: [[S('はい、仮説が立つ', 'Yes, I have a hypothesis', 'Ya, ada hipotesis'), 'next'], [S('まったく不明', 'No idea at all', 'Sama sekali tidak tahu'), 'deep'], [S('自信がない（グレー）', 'Not sure (gray)', 'Tidak yakin (abu-abu)'), 'gray']] },
      { key: 'risk', q: S('Step 2（基準③）：失敗した場合のリスクは？', 'Step 2 (criterion ③): What if the trial fails?', 'Step 2 (kriteria ③): Bagaimana jika uji coba gagal?'),
        hint: S('設備破損・人身事故・大量不良流出の恐れはあるか', 'Risk of equipment damage, injury, or mass defects escaping?', 'Risiko kerusakan alat, cedera, atau cacat massal lolos?'),
        a: [[S('低い（すぐ元に戻せる）', 'Low (easy to revert)', 'Rendah (mudah dikembalikan)'), 'next'], [S('高い', 'High', 'Tinggi'), 'deep']] },
      { key: 'vars', q: S('Step 3（基準②）：関連する変数（パラメータ）はいくつ？', 'Step 3 (criterion ②): How many related variables?', 'Step 3 (kriteria ②): Berapa variabel terkait?'),
        hint: S('温度・圧力・作業手順・材料ロット…など', 'e.g. temperature, pressure, method, material lot…', 'mis. suhu, tekanan, metode, lot material…'),
        a: [[S('1〜2個に絞れる', 'Narrowed to 1–2', 'Dapat dipersempit ke 1–2'), 'next'], [S('3つ以上が絡む', 'Three or more interact', 'Tiga atau lebih saling terkait'), 'deep']] },
      { key: 'data', q: S('Step 4（基準④）：データは今すぐ取れますか？', 'Step 4 (criterion ④): Can you get data right now?', 'Step 4 (kriteria ④): Bisakah data diambil sekarang?'),
        hint: S('入手性に加えて信頼性（バラツキ）も確認。信頼できないなら標準化・測定の安定化が先', 'Check reliability (variation) too. If unreliable, stabilize standards & measurement first', 'Periksa juga keandalan (variasi). Jika tidak andal, stabilkan standar & pengukuran dulu'),
        a: [[S('今すぐ取れる（信頼できる）', 'Yes, right now (reliable)', 'Ya, sekarang (andal)'), 'quick'], [S('長期間の収集が必要', 'Needs long collection', 'Butuh pengumpulan lama'), 'deep']] },
    ];
    let step = 0, path = [], result = null;
    function render() {
      s.body.innerHTML = '';
      const prog = h('div.wiz-progress');
      for (let i = 0; i < Q.length; i++) prog.appendChild(h('span' + (i < step || result ? '.on' : '')));
      s.body.appendChild(prog);
      if (!result) {
        const q = Q[step];
        const wrap = h('div.wiz-step', null, h('h4', { style: { margin: 0 }, text: t(q.q) }), h('div.muted', { style: { fontSize: '14px' }, text: t(q.hint) }));
        const ch = h('div.choices');
        q.a.forEach(function (a) {
          const b = h('button.choice', { type: 'button' }, h('span.mk', { text: '→' }), h('span', { text: t(a[0]) }));
          b.addEventListener('click', function () {
            path.push([q.q, a[0]]);
            if (a[1] === 'next') step++;
            else result = a[1];
            render();
          });
          ch.appendChild(b);
        });
        wrap.appendChild(ch);
        s.body.appendChild(wrap);
      } else {
        const quick = result === 'quick', gray = result === 'gray';
        const r = h('div.wiz-result.' + (quick || gray ? 'quick' : 'deep'));
        r.appendChild(h('div', { style: { fontSize: '13px', fontWeight: 700, opacity: .8 }, text: quick ? 'Route A' : gray ? t(S('グレーゾーン', 'Gray zone', 'Zona abu-abu')) : 'Route B' }));
        r.appendChild(h('h3', { text: quick ? t(S('Quick GPCモード（H-T-C-A）', 'Quick GPC mode (H-T-C-A)', 'Mode Quick GPC (H-T-C-A)')) : gray ? t(S('まずQuick GPCで1サイクル試行', 'Try one Quick GPC cycle first', 'Coba satu siklus Quick GPC dulu')) : t(S('Deep GPCモード（DMAIC）', 'Deep GPC mode (DMAIC)', 'Mode Deep GPC (DMAIC)')) }));
        r.appendChild(h('p', { html: md(quick
          ? S('**原因仮説あり AND 低リスク AND 単変量 AND データ即取得** → 「走りながら考える」。仮説を1文で書き、少量トライ（例：5台）で即確認し、良ければ暫定標準として即日適用します（期間：1日〜1週間）。',
            '**Hypothesis AND low risk AND few variables AND data now** → “think while running”. Write the hypothesis in one sentence, trial small (e.g. 5 units), check immediately, and apply as a temporary standard the same day (1 day–1 week).',
            '**Ada hipotesis DAN risiko rendah DAN variabel sedikit DAN data tersedia** → “berpikir sambil jalan”. Tulis hipotesis 1 kalimat, uji kecil (mis. 5 unit), cek segera, terapkan sebagai standar sementara hari itu juga (1 hari–1 minggu).')
          : gray ? S('判定が曖昧なときは、まずQuick GPCで1サイクル（1日〜1週間）試します。効果が得られなければDeep GPCにエスカレーションします。リソースの無駄を最小化する段階的アプローチです。',
            'When unclear, run one Quick GPC cycle (1 day–1 week). If there is no effect, escalate to Deep GPC — a staged approach that minimizes wasted resources.',
            'Jika tidak jelas, jalankan satu siklus Quick GPC (1 hari–1 minggu). Jika tak ada efek, eskalasi ke Deep GPC — pendekatan bertahap yang meminimalkan pemborosan.')
            : S('**原因不明 OR 高リスク OR 多変量 OR 長期データ** → 「止まって深く考える」。Y/Xの定義、MSAでデータ信頼性を確保し、統計分析とDOEで根本原因を特定します（期間：1〜3ヶ月）。',
              '**Unknown cause OR high risk OR many variables OR long data collection** → “stop and think deeply”. Define Y/X, secure data reliability with MSA, find root causes with statistics and DOE (1–3 months).',
              '**Penyebab tak diketahui ATAU risiko tinggi ATAU banyak variabel ATAU data lama** → “berhenti dan berpikir dalam”. Definisikan Y/X, pastikan keandalan data dengan MSA, temukan akar penyebab dengan statistik & DOE (1–3 bulan).')) }));
        s.body.appendChild(r);
        s.body.appendChild(h('div', { style: { marginTop: '12px', fontWeight: 700, fontSize: '14px' }, text: t(S('判定の経路', 'Decision path', 'Jalur keputusan')) }));
        s.body.appendChild(h('ol.list', { style: { fontSize: '14px' } }, path.map(function (pth) { return h('li', null, t(pth[0]) + ' → ', h('b', { text: t(pth[1]) })); })));
        s.body.appendChild(h('div.w-actions', null, btn(S('もう一度判定する', 'Start over', 'Ulangi'), function () { step = 0; path = []; result = null; render(); }, 'btn-primary')));
      }
    }
    render();
    return s.el;
  };

  /* ======================================================
   * htca-builder
   * ====================================================== */
  W['htca-builder'] = function () {
    const s = ZA.widgetShell(S('H-T-C-A プランビルダー', 'H-T-C-A plan builder', 'Penyusun rencana H-T-C-A'));
    const v = { type: 'H', param: '', cur: '', chg: '', exp: '', n: 5, dx: '1' };
    const res = h('div');
    const field = function (label, key, ph) {
      const inp = h('input', { type: 'text', placeholder: t(ph) });
      inp.addEventListener('input', function () { v[key] = inp.value; draw(); });
      return h('div.ctrl', null, h('label', null, h('span', { text: t(label) })), inp);
    };
    const typeSel = h('select', null,
      h('option', { value: 'H', text: t(S('GPC-H（人・作業）', 'GPC-H (human work)', 'GPC-H (kerja manusia)')) }),
      h('option', { value: 'M', text: t(S('GPC-M（設備パラメータ）', 'GPC-M (machine parameter)', 'GPC-M (parameter mesin)')) }));
    typeSel.addEventListener('change', function () { v.type = typeSel.value; draw(); });
    const dxSel = h('select', null,
      h('option', { value: '1', text: 'Level 1 ' + t(S('アナログ', 'Analog', 'Analog')) }),
      h('option', { value: '2', text: 'Level 2 ' + t(S('デジタイゼーション', 'Digitisation', 'Digitisasi')) }),
      h('option', { value: '3', text: 'Level 3 ' + t(S('デジタライゼーション', 'Digitalisation', 'Digitalisasi')) }));
    dxSel.addEventListener('change', function () { v.dx = dxSel.value; draw(); });
    const ctrls = h('div', null,
      h('div.ctrl', null, h('label', null, h('span', { text: t(S('制御の種類', 'Control type', 'Jenis kontrol')) })), typeSel),
      field(S('対象パラメータ', 'Target parameter', 'Parameter target'), 'param', S('例：部品トレイの配置', 'e.g. parts tray layout', 'mis. tata letak baki part')),
      field(S('現在値', 'Current value', 'Nilai saat ini'), 'cur', S('例：右奥', 'e.g. back right', 'mis. kanan belakang')),
      field(S('変更値', 'New value', 'Nilai baru'), 'chg', S('例：左手前（手元化）', 'e.g. front left (within reach)', 'mis. kiri depan (dalam jangkauan)')),
      field(S('期待する結果', 'Expected result', 'Hasil yang diharapkan'), 'exp', S('例：取り時間が2秒短縮しV.Scoreが下がる', 'e.g. pick time −2 s and lower V.Score', 'mis. waktu ambil −2 dtk dan V.Score turun')),
      slider(S('トライのN数', 'Trial size N', 'Ukuran uji N'), { min: 3, max: 30, value: v.n }, function (x) { v.n = x; draw(); }),
      h('div.ctrl', null, h('label', null, h('span', { text: t(S('デジタル化レベル（確認方法）', 'Digital level (check method)', 'Level digital (metode cek)')) })), dxSel));
    function draw() {
      res.innerHTML = '';
      const ph = function (x, d) { return x ? '<b>' + esc(x) + '</b>' : '<span class="muted">[' + esc(t(d)) + ']</span>'; };
      const hyp = {
        ja: '「' + ph(v.param, S('対象パラメータ')) + 'を' + ph(v.cur, S('現在値')) + 'から' + ph(v.chg, S('変更値')) + 'に変更すれば、' + ph(v.exp, S('期待する結果')) + 'が得られるはず」',
        en: '“If we change ' + ph(v.param, S(0, 'parameter')) + ' from ' + ph(v.cur, S(0, 'current')) + ' to ' + ph(v.chg, S(0, 'new value')) + ', we should get ' + ph(v.exp, S(0, 'expected result')) + '.”',
        id: '“Jika ' + ph(v.param, S(0, 0, 'parameter')) + ' diubah dari ' + ph(v.cur, S(0, 0, 'nilai saat ini')) + ' menjadi ' + ph(v.chg, S(0, 0, 'nilai baru')) + ', seharusnya diperoleh ' + ph(v.exp, S(0, 0, 'hasil harapan')) + '.”',
      };
      const check = { '1': S('目視確認＋手書きチェックシート（ストップウォッチ計測）', 'Visual check + handwritten check sheet (stopwatch)', 'Cek visual + lembar cek tulisan tangan (stopwatch)'), '2': S('Excel集計＋グラフ（テンプレートでV.Score自動算出）', 'Excel tally + chart (template auto-calculates V.Score)', 'Rekap Excel + grafik (template hitung V.Score otomatis)'), '3': S('リアルタイムダッシュボード', 'Real-time dashboard', 'Dasbor real-time') }[v.dx];
      const card = function (letter, title, body, tn) {
        return h('div.ccard.tc-' + tn, null, h('h4', null, h('span.chip.tone-' + tn, { text: letter }), ' ', t(title)), h('p', { html: body }));
      };
      res.appendChild(h('div.cards.cols-2', null,
        card('H', S('Hypothesis 仮説', 'Hypothesis', 'Hipotesis'), hyp[ZA.lang] || hyp.en, 'navy'),
        card('T', S('Trial 実行', 'Trial', 'Uji coba'), md(v.type === 'M'
          ? S('パラメータを変更して **' + v.n + '台** 少量生産。完璧な実験計画は不要。', 'Change the parameter and run **' + v.n + ' units**. No perfect experimental design needed.', 'Ubah parameter dan produksi **' + v.n + ' unit**. Tak perlu desain eksperimen sempurna.')
          : S('標準作業を変更して **' + v.n + 'サイクル** 試行。「まずやってみる」レベルで十分。', 'Change the standard work and try **' + v.n + ' cycles**. “Just try it” level is enough.', 'Ubah kerja standar dan coba **' + v.n + ' siklus**. Level “coba dulu” sudah cukup.')), 'blue'),
        card('C', S('Check 即時確認', 'Check', 'Cek'), md(S('良くなったか・悪くなったかの二択に近い判定。統計検定は不要。方法：', 'Near-binary judgement: better or worse? No statistical test. Method: ', 'Penilaian hampir biner: lebih baik atau buruk? Tanpa uji statistik. Metode: ')) + esc(t(check)) + (v.type === 'H' ? md(S('（CT・V.Scoreを比較）', ' (compare CT & V.Score)', ' (bandingkan CT & V.Score)')) : md(S('（不良・GPCバンド適合を確認）', ' (check defects & band conformance)', ' (cek cacat & kesesuaian band)'))), 'teal'),
        card('A', S('Action 標準化 or 再試行', 'Action', 'Aksi'), md(S('✓ 良ければ即WI更新 → **暫定標準**（最大30日・単一ライン・ロールバック可）→ 30日以内に正式承認 → PDCA-Sへ<br>✗ ダメなら翌日条件変更で再実行<br>⚠ **3回失敗・仮説枯渇・再発・影響拡大** → Deep GPCへエスカレーション<br>📷 結果は成功・失敗ともナレッジベースへ（写真1枚＋コメント）',
          '✓ Works → update the WI now → **temporary standard** (max 30 days, single line, rollback ready) → formal approval within 30 days → PDCA-S<br>✗ Fails → change conditions and retry next day<br>⚠ **3 failures, no ideas left, recurrence, bigger impact** → escalate to Deep GPC<br>📷 Log success and failure in the knowledge base (one photo + comment)',
          '✓ Berhasil → perbarui WI → **standar sementara** (maks 30 hari, 1 lini, bisa rollback) → persetujuan resmi ≤30 hari → PDCA-S<br>✗ Gagal → ubah kondisi, ulangi besok<br>⚠ **3x gagal, ide habis, berulang, dampak meluas** → eskalasi ke Deep GPC<br>📷 Catat berhasil & gagal di basis pengetahuan (1 foto + komentar)')), 'green')));
    }
    s.body.appendChild(h('div.w-grid', null, ctrls, res));
    draw();
    return s.el;
  };

  /* ======================================================
   * four-boxes
   * ====================================================== */
  W['four-boxes'] = function () {
    const s = ZA.widgetShell(S('4つの箱ワークシート', 'Four-box worksheet', 'Lembar kerja empat kotak'));
    const KEY = 'fourboxes';
    let saved = {};
    try { saved = JSON.parse(localStorage.getItem('zeva-academy:' + KEY)) || {}; } catch (e) { saved = {}; }
    const boxes = [
      ['b1', '①', S('現状の値（結果系）', 'Current value (result)', 'Nilai saat ini (hasil)'), S('OEE・CT・人員・不良率・V.Score・価値作業比率など数値で', 'Numbers: OEE, CT, headcount, defects, V.Score, value ratio…', 'Angka: OEE, CT, jumlah orang, cacat, V.Score, rasio nilai…'), 'var(--blue)',
        S('CT 60秒（価値12/準価値18/無価値30）、V.Score 0.28、作業者4名、価値作業比率20%', 'CT 60 s (value 12 / semi 18 / non-value 30), V.Score 0.28, 4 operators, value ratio 20%', 'CT 60 dtk (nilai 12 / semi 18 / tanpa nilai 30), V.Score 0,28, 4 operator, rasio nilai 20%')],
      ['b2', '②', S('現状のやり方（要因系）', 'Current way (cause)', 'Cara saat ini (penyebab)'), S('なぜ①なのか。4M/7要因で弱点・バラツキ要因を書く', 'Why ①? Weak points & variation causes by 4M / 7 factors', 'Mengapa ①? Kelemahan & penyebab variasi per 4M / 7 faktor'), 'var(--red)',
        S('Method：部品を探す・持ち替えが多い／Man：手順の解釈が人により違う／Material：部品置き場が定位置化されていない', 'Method: searching and re-gripping parts / Man: instructions interpreted differently / Material: no fixed locations for parts', 'Method: mencari & memindah pegangan part / Man: instruksi ditafsirkan berbeda / Material: lokasi part tidak tetap')],
      ['b3', '③', S('新たなやり方（要因系）', 'New way (cause)', 'Cara baru (penyebab)'), S('②を克服する策。理論値から考え、ECRS・動作安定の3法則で根拠を示す', 'Countermeasures for ②, reasoned from the theoretical value with ECRS & motion laws', 'Solusi untuk ②, berangkat dari nilai teoretis dengan ECRS & hukum gerakan'), 'var(--amber)',
        S('E：探す動作を3定で廃除／C：2工程の締結を1工程に結合／S：位置決め治具で拘束（第3法則）／部品を手元化（第1法則）', 'E: remove searching by 3-Tei / C: combine two fastening steps / S: locating jig (law 3) / bring parts within reach (law 1)', 'E: hapus mencari dengan 3-Tei / C: gabungkan dua langkah pengencangan / S: jig penentu posisi (hukum 3) / dekatkan part (hukum 1)')],
      ['b4', '④', S('目標の値（結果系）', 'Target value (result)', 'Nilai target (hasil)'), S('③で削減できるロスを積み上げた論理的な目標', 'Logical target built by stacking the losses removed in ③', 'Target logis dari penumpukan kerugian yang dihapus di ③'), 'var(--green)',
        S('CT 60→38秒（無価値−22秒）、V.Score 0.28→0.10、作業者4→3名、価値作業比率20%→32%', 'CT 60 → 38 s (non-value −22 s), V.Score 0.28 → 0.10, operators 4 → 3, value ratio 20% → 32%', 'CT 60 → 38 dtk (tanpa nilai −22 dtk), V.Score 0,28 → 0,10, operator 4 → 3, rasio nilai 20% → 32%')],
    ];
    const areas = {};
    const grid = h('div.fb-grid');
    [boxes[0], boxes[3], boxes[1], boxes[2]].forEach(function (b) {
      const ta = h('textarea', { placeholder: t(b[3]) });
      ta.value = saved[b[0]] || '';
      ta.addEventListener('input', function () { saved[b[0]] = ta.value; try { localStorage.setItem('zeva-academy:' + KEY, JSON.stringify(saved)); } catch (e) { /* ignore */ } });
      areas[b[0]] = ta;
      const el = h('div.fb-box', null, h('h5', { text: b[1] + ' ' + t(b[2]) }), ta);
      el.style.setProperty('--tc', b[4]);
      grid.appendChild(el);
    });
    s.body.appendChild(h('p', { style: { fontSize: '14px' }, html: md(S('手元の工程で書いてみましょう（入力内容はこのブラウザにだけ保存されます）。**②→③→④→①との比較**を往復して精度を高めます。', 'Fill it in for a process you know (saved only in this browser). Loop **② → ③ → ④ → compare with ①** to sharpen it.', 'Isi untuk proses yang Anda kenal (tersimpan hanya di browser ini). Ulangi **② → ③ → ④ → bandingkan dengan ①** untuk mempertajam.')) }));
    s.body.appendChild(grid);
    s.body.appendChild(h('div.w-actions', null,
      btn(S('記入例を表示', 'Show example', 'Tampilkan contoh'), function () { boxes.forEach(function (b) { areas[b[0]].value = t(b[5]); saved[b[0]] = t(b[5]); }); }, 'btn-primary'),
      btn(S('クリア', 'Clear', 'Hapus'), function () { boxes.forEach(function (b) { areas[b[0]].value = ''; saved[b[0]] = ''; }); try { localStorage.removeItem('zeva-academy:' + KEY); } catch (e) { /* ignore */ } })));
    s.body.appendChild(note('', S('チェック：④の目標は「頑張る」ではなく③で消えるロスの積み上げになっていますか？ ②に「作業者の意識」だけを書いていませんか（XではなくYの言い換えになっていないか）？', 'Check: is ④ built from the losses removed in ③, not “try harder”? Does ② list real causes (X) rather than “operator awareness”?', 'Cek: apakah ④ dibangun dari kerugian yang dihapus di ③, bukan “berusaha lebih keras”? Apakah ② berisi penyebab nyata (X), bukan sekadar “kesadaran operator”?')));
    return s.el;
  };

  /* ======================================================
   * sort-game (generic)
   * ====================================================== */
  W['sort-game'] = function (p) {
    const s = ZA.widgetShell(p.title || S('分類してみよう', 'Sort them', 'Kelompokkan'), t(S('演習', 'Practice', 'Latihan')));
    const bins = p.bins || [], items = (p.items || []).map(function (it, i) { return { it: it, i: i, placed: null }; });
    let picked = null, checked = false;
    function shuffle(a) { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); const x = a[i]; a[i] = a[j]; a[j] = x; } return a; }
    shuffle(items);
    function render() {
      s.body.innerHTML = '';
      s.body.appendChild(h('div.sg-hint', { text: t(S('カードをクリック（またはドラッグ）して、正しい箱をクリックしてください。', 'Click (or drag) a card, then click the right box.', 'Klik (atau seret) kartu, lalu klik kotak yang tepat.')) }));
      const pool = h('div.sg-pool');
      items.filter(function (x) { return x.placed == null; }).forEach(function (x) { pool.appendChild(chip(x)); });
      if (!pool.children.length) pool.appendChild(h('span.muted', { style: { fontSize: '13px' }, text: checked ? '' : t(S('すべて配置しました。「答え合わせ」を押してください。', 'All placed — press “Check answers”.', 'Semua sudah ditempatkan — tekan “Cek jawaban”.')) }));
      s.body.appendChild(pool);
      const binsEl = h('div.sg-bins');
      bins.forEach(function (b) {
        const drop = h('div.sg-drop');
        items.filter(function (x) { return x.placed === b.id; }).forEach(function (x) { drop.appendChild(chip(x)); });
        const el = h('div.sg-bin' + (picked ? '.target' : ''), null, h('h5.tone-' + (b.tone || 'gray'), { html: md(b.label) }), drop);
        el.addEventListener('click', function () { if (picked && !checked) { picked.placed = b.id; picked = null; render(); } });
        el.addEventListener('dragover', function (e) { e.preventDefault(); el.classList.add('over'); });
        el.addEventListener('dragleave', function () { el.classList.remove('over'); });
        el.addEventListener('drop', function (e) { e.preventDefault(); const idx = +e.dataTransfer.getData('text/plain'); const x = items.find(function (y) { return y.i === idx; }); if (x && !checked) { x.placed = b.id; picked = null; render(); } });
        binsEl.appendChild(el);
      });
      s.body.appendChild(binsEl);
      const actions = h('div.w-actions');
      if (!checked) {
        const ck = btn(S('答え合わせ', 'Check answers', 'Cek jawaban'), function () { checked = true; render(); }, 'btn-primary');
        if (items.some(function (x) { return x.placed == null; })) ck.disabled = true;
        actions.appendChild(ck);
      }
      actions.appendChild(btn(S('やり直す', 'Start over', 'Ulangi'), function () { items.forEach(function (x) { x.placed = null; }); shuffle(items); picked = null; checked = false; render(); }));
      s.body.appendChild(actions);
      if (checked) {
        const right = items.filter(function (x) { return x.placed === x.it.bin; }).length;
        s.body.appendChild(note(right === items.length ? 'good' : 'warn', S('正解 ' + right + ' / ' + items.length + '。赤いカードにカーソルを合わせる（タップする）と解説が見られます。', right + ' / ' + items.length + ' correct. Hover or tap a card for the explanation.', right + ' / ' + items.length + ' benar. Arahkan atau ketuk kartu untuk penjelasan.')));
        const ex = h('div.sg-explain');
        items.forEach(function (x) {
          if (!x.it.explain) return;
          const ok = x.placed === x.it.bin;
          const bin = bins.find(function (b) { return b.id === x.it.bin; });
          ex.appendChild(h('div', { html: (ok ? '✅ ' : '❌ ') + '<b>' + md(x.it.text) + '</b> → ' + md(bin ? bin.label : '') + ': ' + md(x.it.explain) }));
        });
        s.body.appendChild(ex);
      }
    }
    function chip(x) {
      let cls = '';
      if (checked) cls = x.placed === x.it.bin ? '.right' : '.wrong';
      else if (picked === x) cls = '.picked';
      const el = h('span.sg-item' + cls, { draggable: !checked, html: md(x.it.text), title: checked && x.it.explain ? t(x.it.explain) : null, tabindex: 0, role: 'button' });
      el.addEventListener('click', function (e) {
        e.stopPropagation();
        if (checked) return;
        picked = picked === x ? null : x;
        if (x.placed != null && picked) { x.placed = null; }
        render();
      });
      el.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); el.click(); } });
      el.addEventListener('dragstart', function (e) { e.dataTransfer.setData('text/plain', String(x.i)); });
      return el;
    }
    render();
    return s.el;
  };

  /* ======================================================
   * scenario (generic)
   * ====================================================== */
  W['scenario'] = function (p) {
    const s = ZA.widgetShell(p.title || S('シナリオ演習', 'Scenario', 'Skenario'), t(S('ケース', 'Case', 'Kasus')));
    const steps = p.steps || [];
    let cur = 0;
    const log = h('div');
    if (p.intro) s.body.appendChild(h('div.sc-intro', { html: md(p.intro) }));
    s.body.appendChild(log);
    function renderStep(i) {
      const stp = steps[i];
      const el = h('div.sc-step');
      el.appendChild(h('div.prompt', { html: md(stp.prompt) }));
      const fb = h('div');
      const list = h('div.choices');
      const btns = stp.choices.map(function (c, j) {
        const b = h('button.choice', { type: 'button' }, h('span.mk', { text: String.fromCharCode(65 + j) }), h('span', { html: md(c.text) }));
        b.addEventListener('click', function () {
          if (el.classList.contains('done')) return;
          fb.className = 'feedback ' + (c.correct ? 'ok' : 'ng');
          fb.innerHTML = '<b>' + esc(u(c.correct ? 'correct' : 'incorrect')) + '</b>' + md(c.feedback || '');
          if (c.correct) {
            b.classList.add('right');
            btns.forEach(function (x) { x.disabled = true; });
            el.classList.add('done');
            cur = i + 1;
            if (cur < steps.length) log.appendChild(renderStep(cur));
            else {
              if (p.outro) log.appendChild(h('div.sc-outro', { html: '🏁 ' + md(p.outro) }));
              log.appendChild(h('div.w-actions', null, btn(S('最初からやり直す', 'Restart', 'Mulai ulang'), function () { log.innerHTML = ''; cur = 0; log.appendChild(renderStep(0)); })));
            }
          } else {
            b.classList.add('wrong');
            b.disabled = true;
          }
        });
        list.appendChild(b);
        return b;
      });
      el.appendChild(list);
      el.appendChild(fb);
      return el;
    }
    if (steps.length) log.appendChild(renderStep(0));
    return s.el;
  };
})();
