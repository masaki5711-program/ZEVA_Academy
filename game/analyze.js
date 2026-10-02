/* 現場再建記 — 分析室。溜めた記録を道具を替えて見る
 * 土台は core.js（WS）。ここで定義したものは WS.G に載せ、後ろのファイルから使う。
 */
(function () {
  'use strict';
  const WS = window.WS, G = WS.G;
  const ZA = WS.ZA, h = WS.h, t = WS.t, S = WS.S, md = WS.md, fmt = WS.fmt;
  const n1 = WS.n1, sep = WS.sep, wkUnit = WS.wkUnit, yen = WS.yen;
  const WEEKS = WS.WEEKS, PT0 = WS.PT0, LOTS = WS.LOTS, PIECES = WS.PIECES;
  const DPW = WS.DPW, HOURS = WS.HOURS, DAYS = WS.DAYS, HOUR_LABEL = WS.HOUR_LABEL;
  const mulberry32 = WS.mulberry32, randn = WS.randn, binom = WS.binom, season = WS.season;
  const save = WS.save, route = WS.route, show = WS.show, scen = WS.scen, has = WS.has;
  const talk = WS.talk, meter = WS.meter, btn = WS.btn, act = WS.act, note = WS.note;
  const svgBox = WS.svgBox, switcher = WS.switcher, paramPanel = WS.paramPanel, weekStrip = WS.weekStrip;
  const C = window.WOODSHOP_CHARTS;
  const SUSPECTS = WS.G.SUSPECTS;
  const st = WS.state;
  const BASE = G.BASE;
  const FACTORS = G.FACTORS;
  const KNOBS = G.KNOBS;
  const SYMPTOMS = G.SYMPTOMS;
  const TARGET_WHY = G.TARGET_WHY;
  const beyond3 = G.beyond3;
  const cfgKey = G.cfgKey;
  const chart = G.chart;
  const costOf = G.costOf;
  const countOf = G.countOf;
  const dayNo = G.dayNo;
  const hud = G.hud;
  const piecesOf = G.piecesOf;
  const rateOf1 = G.rateOf1;
  const rateOfLots = G.rateOfLots;
  const seLots = G.seLots;
  const shownVal = G.shownVal;
  const stdLevel = G.stdLevel;
  const usable = G.usable;
  const vt = G.vt;
  const axScale = G.axScale;
  const axDec = G.axDec;
  /* ---- 分析室。溜めた記録を、道具を替えて何度でも見る ---- */
  const TABS = [
    ['trend', S('推移', 'Trend', 'Tren'), null],
    ['hourly', S('時間ごと', 'By hour', 'Per jam'), 'daily'],
    ['pchart', S('p管理図', 'p chart', 'Peta kendali p'), null],
    ['pareto', S('パレート', 'Pareto', 'Pareto'), 'daily'],
    ['strat', S('層別', 'Stratify', 'Stratifikasi'), null],
    ['scatter', S('散布図', 'Scatter', 'Diagram pencar'), 'any'],
    ['hist', S('ヒストグラム', 'Histogram', 'Histogram'), 'any'],
    ['inter', S('交互作用', 'Interaction', 'Interaksi'), 'doe'],
    ['boxes', S('4つの箱', 'Four boxes', 'Empat kotak'), null]
  ];
  const anyAttr = function () { return has('mc') || has('wear') || has('attr'); };
  function tabReady(need) {
    if (!need) return true;
    if (need === 'any') return anyAttr();
    return has(need);
  }
  // いまの条件のもとで取れたロット
  const COL = { dim: 'var(--amber)', glue: 'var(--red)', surf: 'var(--green)', total: 'var(--navy)' };

  // いまの条件・いまの標準のもとで取れたロット
  function poolNow() {
    const k = cfgKey(st().cfg, stdLevel());
    return st().lots.filter(function (x) { return x.k === k; });
  }

  function screenAnalyze() {
    const v = h('div');
    v.appendChild(hud());
    if (!st().tab || !tabReady((TABS.filter(function (x) { return x[0] === st().tab; })[0] || [])[2])) st().tab = 'trend';

    const bar = h('div.g-steps');
    TABS.forEach(function (tb) {
      const ok = tabReady(tb[2]);
      const chip = h('button.chip' + (st().tab === tb[0] ? '.tone-navy' : ''), { type: 'button', text: t(tb[1]) });
      chip.style.cssText = 'cursor:pointer;border:1px solid var(--border);' + (ok ? '' : 'opacity:.42;cursor:not-allowed');
      if (ok) chip.addEventListener('click', function () { st().tab = tb[0]; save(); route(); });
      bar.appendChild(chip);
    });
    v.appendChild(bar);

    const pool = poolNow();
    const other = st().lots.length - pool.length;
    v.appendChild(h('div.muted', { style: { fontSize: '12px', margin: '2px 0 10px' },
      text: t(S('いまの条件で取れた ' + pool.length + 'ロット（' + piecesOf(pool).toLocaleString() + '個）が対象',
        'Working from the ' + pool.length + ' lots (' + piecesOf(pool).toLocaleString() + ' pieces) collected under the current condition',
        'Memakai ' + pool.length + ' lot (' + piecesOf(pool).toLocaleString() + ' pcs) yang terkumpul pada kondisi sekarang'))
        + (other > 0 ? t(S('　／　条件を変える前の ' + other + 'ロットは外してある', ' / the ' + other + ' lots from before the change are left out', ' / ' + other + ' lot sebelum perubahan dikeluarkan')) : '') }));

    if (stdLevel() < 1 && st().tab !== 'boxes') {
      v.appendChild(note([S('**標準作業が ' + Math.round(stdLevel() * 5) + ' / 5 工程です。**標準の無い工程では人によって手順が違うので、同じ条件でも出来上がりが揃いません。'
        + 'そのぶんのばらつきが全部の数字に乗っていて、**3σの目安が広がり、本物の因子が偶然の範囲に埋もれます。**'
        + 'そして作業者で層別すると、本物の差が出ます。これは人の問題ではなく、標準が無いというだけのことです。',
        '**Standard work is in place at ' + Math.round(stdLevel() * 5) + ' / 5 processes.** Where there is none, people work differently, so the same conditions do not give the same result. '
        + 'That spread is riding on every number here: **the three-sigma yardstick widens and real factors sink into “within chance”.** '
        + 'Stratify by operator and you will find a real gap — which is not a problem with the people, only the absence of a standard.',
        '**Kerja standar baru ada di ' + Math.round(stdLevel() * 5) + ' dari 5 proses.** Di proses yang belum punya standar, orang bekerja dengan cara berbeda, sehingga kondisi yang sama tidak memberi hasil yang sama. '
        + 'Sebaran itu menumpang pada setiap angka di sini: **patokan tiga sigma melebar dan faktor nyata tenggelam ke “masih dalam batas kebetulan”.** '
        + 'Stratifikasi menurut operator dan Anda akan menemukan selisih nyata — yang bukan masalah orangnya, melainkan tidak adanya standar.')]));
    }
    if (!has('msa') && st().tab !== 'boxes') {
      v.appendChild(note([S('測定のばらつきを確かめていないので、以下の数字には判定のゆれが乗っています。',
        'You have not checked the measurement scatter, so the numbers below carry the scatter of the judgement.',
        'Anda belum memeriksa variasi pengukuran, jadi angka di bawah membawa variasi penilaian.')]));
    }
    st().seenTabs = st().seenTabs || {};
    st().seenTabs[st().tab] = true;
    // 分析室で見た形から、条件が「思いつける」ようになる。見た画面と根拠が手帳に残る。
    const tab = st().tab;
    if (tab === 'pareto' && has('daily')) ['press', 'glueAmt', 'grit'].forEach(function (k) { G.unlock(k); });
    if (tab === 'hourly' && has('daily')) { G.unlock('warmUp'); if (has('mc')) G.unlock('batchSel'); }
    if (tab === 'hist' && has('mc')) G.unlock('kilnTemp');
    if (tab === 'scatter' && has('wear')) G.unlock('sharpen');
    if (tab === 'strat' && scen().mach && has('attr')) {
      const f = FACTORS().filter(function (x) { return x.id === 'machine'; })[0];
      const p2 = usable('attr'), g = [[], []];
      p2.forEach(function (x) { g[f.split(x)].push(x); });
      if (g[0].length && g[1].length) {
        const diff = Math.abs(rateOfLots(g[1]) - rateOfLots(g[0]));
        const lim3 = 3 * Math.sqrt(seLots(g[0]) * seLots(g[0]) + seLots(g[1]) * seLots(g[1]));
        if (diff >= lim3) G.unlock('machFix');
      }
    }
    (PANES[st().tab] || PANES.trend)(v, pool);

    const row = h('div.row', { style: { gap: '8px', flexWrap: 'wrap', marginTop: '14px' } });
    row.appendChild(btn(S('盤面へ戻る', 'Back to the floor', 'Kembali ke papan permainan'), function () { st().screen = 'board'; save(); route(); }));
    row.appendChild(btn(S('この画面のことを手帳に書く', 'Write this in the notebook', 'Tulis tentang layar ini di buku catatan'), function () {
      st().noteFrom = 'analyze'; st().screen = 'notebook'; save(); route();
    }, 'btn-ghost'));
    v.appendChild(row);
    show(v);
  }
  // いまの条件のロットを週で束ねる。条件を変える前の週は入らない。
  function weekSeries(key) {
    const by = {};
    poolNow().forEach(function (x) { (by[x.w] = by[x.w] || []).push(x); });
    return Object.keys(by).map(Number).sort(function (a, b) { return a - b; })
      .map(function (w) { return [w, shownVal(key ? rateOf1(by[w], key) : rateOfLots(by[w]), w)]; });
  }
  const poolSwitch = function (v) {
    if (!st().pool) st().pool = 'now';
    v.appendChild(switcher(S('対象', 'Lots', 'Lot'),
      [['now', S('いまの条件だけ', 'Current settings only', 'Hanya setelan sekarang')],
       ['all', S('全期間（条件変更前も）', 'All weeks (before changes too)', 'Semua minggu (juga sebelum perubahan)')]],
      st().pool, function (x) { st().pool = x; }));
  };

  // 日ごとの集計。d は 1..5、通し番号は (週-1)*5 + d。
  // 時間ごとの行。1日8時間、1時間に1ロット。
  // ある日を指定すればその日の8時間、指定しなければ全部の日をならした8時間。
  function hourRows(key, dn) {
    if (!has('daily')) return [];
    const from = st().bought.daily;
    const k = cfgKey(st().cfg, stdLevel());
    const by = {};
    st().lots.forEach(function (x) {
      if (x.w < from || x.k !== k) return;
      if (dn != null && dayNo(x) !== dn) return;
      (by[x.hr] = by[x.hr] || []).push(x);
    });
    const out = [];
    for (let hr = 1; hr <= HOURS; hr++) {
      const rows = by[hr] || [];
      out.push({ hr: hr, rows: rows, v: rows.length ? (key ? rateOf1(rows, key) : rateOfLots(rows)) : null });
    }
    return out;
  }
  // 記録のある日を、新しい順に
  function daysAvailable() {
    const from = st().bought.daily, k = cfgKey(st().cfg, stdLevel());
    const set = {};
    st().lots.forEach(function (x) { if (x.w >= from && x.k === k) set[dayNo(x)] = 1; });
    return Object.keys(set).map(Number).sort(function (a, b) { return a - b; });
  }

  function dailyRows(key) {
    if (!has('daily')) return [];
    const from = st().bought.daily;
    const k = cfgKey(st().cfg, stdLevel());
    const by = {};
    st().lots.forEach(function (x) {
      if (x.w < from || x.k !== k) return;
      const n = dayNo(x);
      (by[n] = by[n] || []).push(x);
    });
    return Object.keys(by).map(Number).sort(function (a, b) { return a - b; })
      .map(function (n) { return { n: n, rows: by[n], v: key ? rateOf1(by[n], key) : rateOfLots(by[n]) }; });
  }
  // 切替の小さなボタン列

  /* ---- 推移 ---- */
  function paneTrend(v) {
    if (!st().hist.length) { v.appendChild(note([S('まだ記録がありません。', 'No record yet.', 'Belum ada catatan.')])); return; }
    if (!st().grain || (st().grain === 'day' && !has('daily'))) st().grain = 'week';
    if (!st().split) st().split = 'total';
    poolSwitch(v);
    v.appendChild(switcher(S('きざみ', 'Grain', 'Satuan waktu'),
      [['week', S('週ごと', 'By week', 'Per minggu')],
       ['day', S('日ごと', 'By day', 'Per hari'), !has('daily')]], st().grain, function (x) { st().grain = x; }));
    v.appendChild(switcher(S('内訳', 'Breakdown', 'Rincian'),
      [['total', S('合計', 'Total', 'Total')],
       ['sym', S('症状ごと', 'By symptom', 'Per gejala'), !has('daily')],
       ['both', S('合計と症状', 'Both', 'Keduanya'), !has('daily')]], st().split, function (x) { st().split = x; }));

    const byDay = st().grain === 'day';
    const xMax = byDay ? WEEKS * 5 : WEEKS;
    const series = [];
    if (st().split !== 'sym') {
      series.push({ name: 'total', color: COL.total,
        points: byDay ? dailyRows(null).map(function (d) { return [d.n, shownVal(d.v, 9)]; })
          : (st().pool === 'all' ? st().hist.map(function (p) { return [p.w, p.shown]; }) : weekSeries(null)),
        dots: !byDay });
    }
    if (st().split !== 'total' && has('daily')) {
      SYMPTOMS().forEach(function (sy) {
        const pts = byDay
          ? dailyRows(sy[0]).map(function (d) { return [d.n, shownVal(d.v, 7)]; })
          : (function () {
            const out = [];
            for (let w = st().bought.daily; w <= st().week; w++) {
              const ls = st().lots.filter(function (x) { return x.w === w && x.k === cfgKey(st().cfg, stdLevel()); });
              if (ls.length) out.push([w, shownVal(rateOf1(ls, sy[0]), 7)]);
            }
            return out;
          })();
        if (pts.length) series.push({ name: sy[0], color: COL[sy[0]], points: pts, width: 1.8, dots: !byDay });
      });
    }
    const allY = series.reduce(function (a, x) { return a.concat(x.points.map(function (p) { return p[1]; })); }, [0]);
    const hi = Math.max.apply(null, allY) * 1.15;
    v.appendChild(svgBox(byDay ? S('日ごとの不良率', 'Defect rate by day', 'Tingkat cacat per hari')
      : S('週ごとの不良率', 'Defect rate by week', 'Tingkat cacat per minggu'),
      C.lines({ w: 680, h: 240, x0: 1, x1: xMax, y0: 0, y1: Math.max(hi, 8), yUnit: '%',
        xTicks: byDay ? [1, 20, 40, 60, 80] : [1, 4, 7, 10, 13, 16],
        xLabel: t(byDay ? S('日', 'day', 'hari') : S('週', 'week', 'minggu')),
        rules: st().target ? [{ at: st().target.value, color: 'var(--green)', label: t(S('目標', 'target', 'sasaran')) }] : [],
        series: series }),
      byDay
        ? S('1日は8ロット200個です。**日ごとに見ると揺れが大きく見えます。**同じ工程でも、束ねる単位で見え方が変わります。',
          'A day is eight lots, two hundred pieces. **Seen daily the swing looks much larger.** The same process reads differently depending on how you bundle it.',
          'Satu hari adalah delapan lot, 200 pcs. **Dilihat harian, fluktuasinya tampak jauh lebih besar.** Proses yang sama terbaca berbeda tergantung cara mengelompokkannya.')
        : has('daily')
        ? S('太い線が合計。細い3本は ' + SYMPTOMS().map(function (x) { return t(x[1]); }).join('・') + '。**症状ごとに動き方が違うかどうか**を見る。',
          'The thick line is the total. The three thin lines are ' + SYMPTOMS().map(function (x) { return t(x[1]); }).join(', ') + '. Look at **whether the symptoms move differently**.',
          'Garis tebal adalah total. Tiga garis tipis adalah ' + SYMPTOMS().map(function (x) { return t(x[1]); }).join(', ') + '. Perhatikan **apakah gejalanya bergerak berbeda**.')
        : S('日次の不良率記録を買うと、症状ごとの線が出ます。',
          'Buy the daily defect record and the line splits into the three symptoms.',
          'Beli catatan cacat harian dan garisnya terpisah menjadi tiga gejala.')));

    // V.Score（週ごとの不良率のバラツキ）。条件を変える前の週を混ぜると、自分の変更がばらつきに化ける。
    const vals = (st().pool === 'all' ? st().hist.map(function (p) { return p.shown; }) : weekSeries(null).map(function (p) { return p[1]; }));
    if (!vals.length) return;
    const mu = vals.reduce(function (s2, x) { return s2 + x; }, 0) / vals.length;
    const sg = Math.sqrt(vals.reduce(function (s2, x) { return s2 + (x - mu) * (x - mu); }, 0) / vals.length);
    const vs = mu ? sg / mu : 0;
    v.appendChild(h('div.g-hud', null,
      meter(S('平均 μ', 'Mean μ', 'Rata-rata μ'), n1(mu) + '%'),
      meter(S('母標準偏差 σ', 'Population σ', 'σ populasi'), n1(sg) + ' pt'),
      meter(S('V.Score（σ÷μ）', 'V.Score (σ÷μ)', 'V.Score (σ÷μ)'), fmt(vs, 3), null,
        vs < 0.1 ? 'good' : vs < 0.3 ? '' : 'warn')));
    v.appendChild(note([S('V.Scoreは週ごとの不良率のバラツキです。**平均が下がってもV.Scoreが大きいままなら、工程はまだ予測できません。**σは母標準偏差（nで割る）。',
      'V.Score is the variation of the weekly defect rate. **A falling mean with a V.Score still large means the process is not yet predictable.** σ is the population standard deviation, divided by n.',
      'V.Score adalah variasi tingkat cacat mingguan. **Rata-rata yang turun dengan V.Score yang masih besar berarti proses belum dapat diprediksi.** σ adalah simpangan baku populasi, dibagi n.')]));
  }

  /* ---- p管理図 ---- */
  function panePChart(v) {
    if (st().hist.length < 3) { v.appendChild(note([S('3週以上たってから見てください。', 'Come back after three weeks.', 'Kembalilah setelah tiga minggu.')])); return; }
    if (!st().pgrain || (st().pgrain === 'day' && !has('daily'))) st().pgrain = 'week';
    poolSwitch(v);
    v.appendChild(switcher(S('打点の単位', 'Plot by', 'Plot per'),
      [['week', S('週ごと（1,000個）', 'By week (1,000 pcs)', 'Per minggu (1.000 pcs)')],
       ['day', S('日ごと（200個）', 'By day (200 pcs)', 'Per hari (200 pcs)'), !has('daily')]], st().pgrain, function (x) { st().pgrain = x; }));
    const byDay = st().pgrain === 'day';
    // 限界線は、いまの条件で取れた打点から引く。条件を変える前の週を混ぜると、自分の変更が「異常」に見える。
    const pts = byDay
      ? dailyRows(null).map(function (d) { return [d.n, shownVal(d.v, 9)]; })
      : (st().pool === 'all' ? st().hist.map(function (p) { return [p.w, p.shown]; }) : weekSeries(null));
    if (pts.length < 3) { v.appendChild(note([S('この条件の打点がまだ3つありません。3週流すか、「全期間」に切り替えてください。', 'Fewer than three points under this setting yet. Run three weeks, or switch to “all weeks”.', 'Belum ada tiga titik pada setelan ini. Jalankan tiga minggu, atau beralih ke “semua minggu”.')])); return; }
    const pbar = pts.reduce(function (s2, p) { return s2 + p[1]; }, 0) / pts.length / 100;
    const n = byDay ? (LOTS / 5) * PIECES : LOTS * PIECES;
    // 二項のσ(個数だけから)は、ロットが独立でないので狭すぎる。
    // 材の山・季節・刃の減りが群間差を作るため、限界は打点の並びの移動範囲(MR)から引く(XmR の考え方)。
    // 二項のσも計算して、どれだけ狭かったかを注記で見せる。
    const sgBin = Math.sqrt(Math.max(pbar * (1 - pbar), 1e-9) / n) * 100;
    const pvAll = pts.map(function (p) { return p[1]; });
    let mrSum = 0;
    for (let i = 1; i < pvAll.length; i++) mrSum += Math.abs(pvAll[i] - pvAll[i - 1]);
    const sgMR = pvAll.length > 1 ? (mrSum / (pvAll.length - 1)) / 1.128 : sgBin;
    const sg = Math.max(sgMR, sgBin) / 100;
    const ucl = (pbar + 3 * sg) * 100, lcl = Math.max(0, (pbar - 3 * sg) * 100), cl = pbar * 100;
    const flags = pts.map(function (p) { return p[1] > ucl || p[1] < lcl; });
    // 中心線の片側に7点続く
    let run = 0, side = 0, runFlag = false;
    pts.forEach(function (p) {
      const s2 = p[1] > cl ? 1 : -1;
      run = (s2 === side) ? run + 1 : 1; side = s2;
      if (run >= 7) runFlag = true;
    });
    const outN = flags.filter(Boolean).length;
    // 縦軸は限界だけでなく打点も入る幅にする。限界の外に出た点こそ見せたいものなので、
    // 限界の幅で軸を決めると、その点が枠の外に落ちて見えなくなる。
    const pv = pts.map(function (p) { return p[1]; });
    const yLo = Math.max(0, Math.min(lcl, Math.min.apply(null, pv)) - 3);
    const yHi = Math.max(ucl, Math.max.apply(null, pv)) + 3;
    v.appendChild(svgBox(S('p管理図（不良率は計数値）', 'p chart (the defect rate is count data)', 'Peta kendali p (tingkat cacat adalah data atribut)'),
      C.lines({ w: 680, h: 240, x0: 1, x1: byDay ? WEEKS * 5 : WEEKS, y0: yLo, y1: yHi, yUnit: '%',
        xTicks: byDay ? [1, 20, 40, 60, 80] : [1, 4, 7, 10, 13, 16],
        xLabel: t(byDay ? S('日', 'day', 'hari') : S('週', 'week', 'minggu')),
        rules: [
          { at: ucl, color: 'var(--red)', label: 'UCL ' + n1(ucl) + '%' },
          { at: cl, color: 'var(--navy)', dash: '0', width: 1.5, label: 'CL ' + n1(cl) + '%' },
          { at: lcl, color: 'var(--red)', label: 'LCL ' + n1(lcl) + '%' }
        ],
        series: [{ name: 'p', color: 'var(--navy)', points: pts, flags: flags }] }),
      S('限界は 3σ。σは打点の並びの**移動範囲**から出しています（隣り合う点の差の平均 ÷ 1.128）。'
        + '1点あたり ' + fmt(n, 0) + '個の二項のσなら ' + n1(sgBin) + ' ポイントですが、いまの並びから出すと ' + n1(sg * 100) + ' ポイントです。'
        + '**同じロットの材は同じ山から来ていて独立ではない**ので、個数だけから引いた限界は狭すぎ、何をしても「異常」に見えてしまいます。'
        + '日ごとに打つと限界は広く、週でまとめると狭くなります。束ね方で「異常」の数は変わります。',
        'The limits are 3σ, with σ taken from the **moving range** of the points (mean of the differences between neighbours ÷ 1.128). '
        + 'The binomial σ for ' + fmt(n, 0) + ' pieces per point would be ' + n1(sgBin) + ' pt; the sequence itself gives ' + n1(sg * 100) + ' pt. '
        + '**Pieces in a lot come from the same batch and are not independent**, so limits drawn from the count alone are too narrow and everything looks “abnormal”. '
        + 'Plot daily and the limits are wide; bundle into weeks and they narrow. How you bundle changes the count of “abnormal”.',
        'Batas kendalinya 3σ, dengan σ diambil dari **rentang bergerak** (moving range, MR) titik-titiknya (rata-rata selisih antar titik bertetangga ÷ 1,128). '
        + 'Kalau memakai σ binomial untuk ' + fmt(n, 0) + ' pcs per titik, hasilnya hanya ' + n1(sgBin) + ' poin persentase; tetapi dari deret titiknya sendiri ' + n1(sg * 100) + ' poin persentase. '
        + '**Material dalam satu lot berasal dari tumpukan (batch kedatangan) yang sama, jadi tidak saling bebas (independen)**, sehingga batas yang ditarik dari jumlah pcs saja terlalu sempit dan, apa pun yang Anda lakukan, semuanya tampak “abnormal”. '
        + 'Plot harian dan batasnya lebar; kelompokkan per minggu dan menyempit. Cara mengelompokkan mengubah jumlah “abnormal”.')));
    const bad = outN > 0 || runFlag;
    v.appendChild(note([bad
      ? S('**統計的管理状態ではありません。**' + (outN ? '限界の外に ' + outN + '点。' : '') + (runFlag ? '中心線の片側に7点連続。' : '')
        + 'この工程は、今日のデータが明日を予測しません。まず**特殊原因**を突き止めて取り除くのが先で、平均を下げにいくのはそのあとです（シューハートの原則）。'
        + '季節で材料の状態が動いているなら、それも特殊原因です。',
        '**This process is not in statistical control.** ' + (outN ? outN + ' point(s) beyond the limits. ' : '') + (runFlag ? 'Seven in a row on one side of the centre line. ' : '')
        + 'Today’s data does not predict tomorrow here. Find and remove the **special cause** first; pulling the mean down comes after (Shewhart’s principle). '
        + 'If the stock moves with the season, that is a special cause too.',
        '**Proses ini tidak terkendali secara statistik.** ' + (outN ? outN + ' titik di luar batas. ' : '') + (runFlag ? 'Tujuh berturut-turut di satu sisi garis tengah. ' : '')
        + 'Di sini data hari ini tidak memprediksi besok. Temukan dan hilangkan **penyebab khusus** lebih dulu; menurunkan rata-rata datang setelahnya (prinsip Shewhart). '
        + 'Bila material bergerak mengikuti musim, itu juga penyebab khusus.')
      : S('**限界の中に収まっています。**ここでの上下は工程に元からあるバラツキ（共通原因）です。'
        + '1点が上がったからといって手を入れると、かえって揺れが大きくなります。下げたいなら条件そのものを変えることです。',
        '**Every point sits inside the limits.** The ups and downs here are the variation the process always had — common cause. '
        + 'Reacting to a single high point makes the wobble worse. To lower it, change the condition itself.',
        '**Semua titik berada di dalam batas.** Naik-turun di sini adalah variasi yang memang selalu ada — penyebab umum. '
        + 'Bereaksi pada satu titik tinggi justru memperbesar fluktuasi. Untuk menurunkannya, ubah kondisinya sendiri.')]));
  }

  /* ---- パレート ---- */
  function panePareto(v, pool) {
    const d = pool.filter(function (x) { return x.w >= st().bought.daily; });
    if (!d.length) { v.appendChild(note([S('まだ記録が足りません。', 'Not enough record yet.', 'Catatan belum cukup.')])); return; }
    const rows = SYMPTOMS().map(function (sy) {
      return { key: sy[0], label: t(sy[1]), value: shownVal(rateOf1(d, sy[0]), 8), count: countOf(d, sy[0]) };
    }).sort(function (a, b) { return b.value - a.value; });
    const total = rows.reduce(function (s2, r) { return s2 + r.value; }, 0);
    let cum = 0;
    v.appendChild(svgBox(S('症状別のパレート', 'Pareto of the symptoms', 'Pareto gejala'),
      C.bars({ w: 680, left: 96, rows: rows.map(function (r) {
        cum += r.value;
        return { label: r.label, value: r.value, color: COL[r.key],
          note: n1(r.value) + '% (' + r.count.toLocaleString() + t(S('個', ' pcs', ' pcs')) + ', ' + t(S('累計', 'cum.', 'kum.')) + ' ' + n1(cum / total * 100) + '%)' };
      }) }),
      S('分母はどれも同じ ' + piecesOf(d).toLocaleString() + '個です。**いちばん重い症状から手を付ける**のが順序ですが、3つの裏に共通の条件があるなら、1つ直すだけで3つとも動きます。',
        'All three share the same denominator: ' + piecesOf(d).toLocaleString() + ' pieces. **Start with the heaviest symptom** — unless one condition sits behind all three, in which case fixing it moves all three at once.',
        'Ketiganya berbagi penyebut yang sama: ' + piecesOf(d).toLocaleString() + ' pcs. **Mulai dari gejala terberat** — kecuali ada satu kondisi di balik ketiganya, yang bila diperbaiki menggerakkan ketiganya sekaligus.')));
  }

  /* ---- 層別 ---- */
  function paneStrat(v) {
    const box = h('div');
    let any = false;
    FACTORS().forEach(function (f) {
      const p2 = usable(f.need);
      if (!p2.length) return;
      const g = [[], []];
      p2.forEach(function (x) { g[f.split(x)].push(x); });
      if (!g[0].length || !g[1].length) return;
      any = true;
      const a = shownVal(rateOfLots(g[0]), 4), b = shownVal(rateOfLots(g[1]), 5);
      const rows = [h('b', { text: t(f.label) }),
        h('span', { text: t(f.bins[0]) + ' ' + n1(a) + '% (n=' + piecesOf(g[0]).toLocaleString() + ')' + sep()
          + t(f.bins[1]) + ' ' + n1(b) + '% (n=' + piecesOf(g[1]).toLocaleString() + ')' })];
      if (has('daily')) {
        rows.push(h('span', { style: { color: 'var(--text)' },
          text: t(S('症状ごとの差：', 'gap by symptom: ', 'selisih per gejala: ')) + SYMPTOMS().map(function (sy) {
            // 3σを越えた差には★を付ける。合計では埋もれる症状別の信号を見逃さないため。
            const d2 = n1(shownVal(Math.abs(rateOf1(g[0], sy[0]) - rateOf1(g[1], sy[0])), 6));
            return t(sy[1]) + ' ' + d2 + (beyond3(g[0], g[1], sy[0]) ? '★' : '');
          }).join(sep()) }));
      }
      // 差が偶然の範囲かどうか。個数で二項のσを出すと狭すぎる。
      // 同じロットの25個は同じ材・同じ刃なので独立ではなく、ばらつきはロット単位で効く。
      // そこで「1ロットの不良率」を1つの観測として標準誤差を出す。
      const diff = Math.abs(b - a);
      const lim3 = 3 * Math.sqrt(seLots(g[0]) * seLots(g[0]) + seLots(g[1]) * seLots(g[1]));
      const noise = diff < lim3;
      box.appendChild(h('div.g-shop-row', null, h('div.txt', null, rows),
        h('div.buy', null,
          h('span.price', { text: t(S('合計の差 ', 'total gap ', 'selisih total ')) + n1(diff) + ' pt' }),
          h('span.chip' + (noise ? '' : '.tone-navy'), {
            text: noise ? t(S('偶然の範囲', 'within chance', 'masih dalam batas kebetulan'))
              : t(S('偶然では説明できない', 'beyond chance', 'melampaui batas kebetulan')) }))));
    });
    if (!any) {
      box.appendChild(note([S('層別できる属性がまだありません。記録を始めた週からのロットしか使えません。',
        'Nothing to stratify by yet. Only lots from the week the recording started can be used.',
        'Belum ada yang bisa distratifikasi. Hanya lot sejak minggu pencatatan dimulai yang dapat dipakai.')]));
    }
    v.appendChild(h('div.g-shop', null, box));
    if (any) {
      v.appendChild(note([S('**「偶然の範囲」は、差が3σに届いていないという意味です。**効果の無い因子でも、数が少なければ2ポイント台の差は普通に出ます。'
        + '週を重ねてロットを増やせば、この目安は狭くなります。★は症状ごとに3σを越えた差です。',
        '**“Within chance” means the gap has not reached three sigma.** Even a factor with no effect will show a two-point gap when the numbers are small. '
        + 'Run more weeks, gather more lots, and the yardstick narrows. A star marks a symptom whose own gap passes three sigma.',
        '**“Masih dalam batas kebetulan” berarti selisihnya belum mencapai tiga sigma.** Bahkan faktor tanpa efek akan menunjukkan selisih dua poin bila jumlahnya sedikit. '
        + 'Jalankan lebih banyak minggu, kumpulkan lebih banyak lot, dan patokannya menyempit. Bintang menandai gejala yang selisihnya sendiri melewati tiga sigma.'),
        S('**いま5つの因子 × 3つの症状を一度に見ています。**あちこちを見れば、効いていない因子にも印が1つくらい付きます。'
          + '**同じ因子が何度見ても出るか、条件を変えて実際に動くか**で決めてください。',
          '**You are looking at five factors by three symptoms at once.** Look in enough places and something with no effect will earn a mark. '
          + 'Decide on **whether the same factor keeps showing up, or whether changing the condition actually moves the rate.**',
          '**Anda melihat lima faktor kali tiga gejala sekaligus.** Lihat di cukup banyak tempat dan sesuatu tanpa efek akan mendapat tanda. '
          + 'Putuskan berdasarkan **apakah faktor yang sama terus muncul, atau apakah mengubah kondisinya benar-benar menggerakkan tingkatnya.**')]));
    }
    if (any && has('daily')) {
      v.appendChild(note([S('**3つの症状すべてに差を作っている因子があれば、それが共通の上流条件です。**症状ごとに別の因子しか効いていないなら、共通の原因は無いということになります。',
        '**A factor that puts a gap in all three symptoms is the shared upstream condition.** If each symptom answers to a different factor and none touches all three, then there is no shared cause.',
        '**Faktor yang memberi selisih pada ketiga gejala adalah kondisi hulu bersama.** Bila tiap gejala menjawab faktor yang berbeda dan tak satu pun menyentuh ketiganya, berarti tidak ada penyebab bersama.')]));
    }
  }

  /* ---- 時間ごと ----
   * 1日の中のどこで出ているかを見る。日を選べば1日ぶん、「ならす」を選べば全部の日の平均。
   * 日ごとに見ると荒れて見えるが、重ねると形が出る。群内と群間の話そのもの。
   */
  function paneHourly(v, pool) {
    const days = daysAvailable();
    if (!days.length) { v.appendChild(note([S('この条件で取れた日がまだありません。', 'No days collected under this condition yet.', 'Belum ada hari yang terkumpul pada kondisi ini.')])); return; }
    if (st().hday !== 'all' && days.indexOf(st().hday) < 0) st().hday = 'all';

    // 日の選び方。多くなるので、直近10日と「ならす」だけ出す。
    const recent = days.slice(-10);
    const row = h('div.row', { style: { gap: '6px', flexWrap: 'wrap', alignItems: 'center', margin: '6px 0' } },
      h('span.muted', { style: { fontSize: '12px', fontWeight: '700' }, text: t(S('見る日', 'Day', 'Hari')) }));
    const mk = function (val, label) {
      const b = h('button.chip' + (st().hday === val ? '.tone-navy' : ''), { type: 'button', text: label });
      b.style.cssText = 'cursor:pointer;border:1px solid var(--border)';
      b.addEventListener('click', function () { st().hday = val; save(); route(); });
      row.appendChild(b);
    };
    mk('all', t(S('全部ならす', 'All days', 'Semua hari')));
    recent.forEach(function (dn) {
      const w = Math.ceil(dn / DPW);
      mk(dn, w + '-' + (dn - (w - 1) * DPW));
    });
    v.appendChild(row);

    const dn = st().hday === 'all' ? null : st().hday;
    const rows = hourRows(null, dn);
    const have = rows.filter(function (x) { return x.v != null; });
    if (!have.length) { v.appendChild(note([S('その日の記録がありません。', 'No record for that day.', 'Tidak ada catatan untuk hari itu.')])); return; }
    const series = [{ name: 'total', color: COL.total, width: 2.6,
      points: have.map(function (x) { return [x.hr, shownVal(x.v, 11)]; }) }];
    if (st().hsplit !== 'total') {
      SYMPTOMS().forEach(function (sy) {
        const rs = hourRows(sy[0], dn).filter(function (x) { return x.v != null; });
        series.push({ name: sy[0], color: COL[sy[0]], width: 1.8,
          points: rs.map(function (x) { return [x.hr, shownVal(x.v, 12)]; }) });
      });
    }
    v.appendChild(switcher(S('内訳', 'Break down', 'Rincian'),
      [['total', S('合計', 'Total', 'Total')], ['sym', S('症状ごと', 'By symptom', 'Per gejala')]],
      st().hsplit || 'total', function (x) { st().hsplit = x; }));
    const allY = series.reduce(function (a, x) { return a.concat(x.points.map(function (p) { return p[1]; })); }, [0]);
    v.appendChild(svgBox(dn == null
      ? S('時間ごとの不良率（全部の日をならす）', 'Defect rate by hour (all days pooled)', 'Tingkat cacat per jam (semua hari digabung)')
      : S('第' + Math.ceil(dn / DPW) + '週 ' + (dn - (Math.ceil(dn / DPW) - 1) * DPW) + '日目の時間ごとの不良率',
        'Defect rate by hour, week ' + Math.ceil(dn / DPW) + ' day ' + (dn - (Math.ceil(dn / DPW) - 1) * DPW),
        'Tingkat cacat per jam, minggu ' + Math.ceil(dn / DPW) + ' hari ' + (dn - (Math.ceil(dn / DPW) - 1) * DPW)),
      C.lines({ w: 680, h: 240, x0: 1, x1: HOURS, y0: 0, y1: Math.max(Math.max.apply(null, allY) * 1.15, 8), yUnit: '%',
        xTicks: [1, 2, 3, 4, 5, 6, 7, 8], xFmt: function (q) { return HOUR_LABEL[q - 1] + t(S('時', 'h', ':00')); },
        xLabel: t(S('時刻', 'time of day', 'waktu')), series: series }),
      dn == null
        ? S('1点が ' + days.length + '日ぶんの同じ時間帯（' + (days.length * PIECES) + '個）。'
          + '**朝いちばんが高く出ていませんか。**冷えた機械で最初の1本を作ると、同じ条件でも結果が違います。'
          + '昼休み明けにも小さく同じことが起きます。これは日や週でまとめると消えてしまう差で、'
          + '**束ね方を変えると見えるものが変わる**という、層別のそのものです。',
          'Each point pools the same hour across ' + days.length + ' days (' + (days.length * PIECES) + ' pieces). '
          + '**Is the first hour high?** The first part off a cold machine comes out differently under identical settings. '
          + 'A smaller version of the same happens after lunch. Bundle into days or weeks and this difference disappears — '
          + 'which is stratification itself: **change how you bundle and you change what you can see.**',
          'Tiap titik menggabungkan jam yang sama dari ' + days.length + ' hari (' + (days.length * PIECES) + ' pcs). '
          + '**Apakah jam pertama tinggi?** Part pertama dari mesin dingin keluar berbeda pada setelan yang sama. '
          + 'Hal serupa yang lebih kecil terjadi setelah makan siang. Kelompokkan per hari atau minggu dan selisih ini hilang — '
          + 'itulah stratifikasi: **ubah cara mengelompokkan dan berubah pula apa yang dapat Anda lihat.**')
        : S('1点が1ロット（' + PIECES + '個）だけなので、上下に大きく振れます。'
          + '**この1日だけを見て時間帯の癖を決めてはいけません。**「全部ならす」に切り替えて、同じ形が残るかを見てください。',
          'Each point is a single lot of ' + PIECES + ' pieces, so it swings hard. '
          + '**Do not read a time-of-day pattern off one day.** Switch to “all days” and see whether the shape survives.',
          'Tiap titik hanya satu lot berisi ' + PIECES + ' pcs, jadi fluktuasinya besar. '
          + '**Jangan menyimpulkan pola waktu dari satu hari.** Beralih ke “semua hari” dan lihat apakah bentuknya bertahan.')));

    // 時間ごとの数字を表でも置く
    const tb = h('tbody');
    const hd = h('tr', null, h('th', { text: t(S('時刻', 'Hour', 'Jam')) }),
      h('th', { text: t(S('不良率', 'Defect rate', 'Tingkat cacat')) }),
      h('th', { text: t(S('ロット', 'Lots', 'Lot')) }),
      h('th', { text: t(S('平均の', 'Mean ', 'Rata-rata ')) + t(vt('fac.mc', S('含水率', 'moisture', 'kadar air'))) }),
      h('th', { text: t(S('平均の', 'Mean ', 'Rata-rata ')) + t(vt('fac.wear', S('刃の使用時間', 'cutter hours', 'jam pakai pisau'))) }));
    tb.appendChild(hd);
    rows.forEach(function (x) {
      const mc = x.rows.length ? x.rows.reduce(function (s2, y) { return s2 + y.mc; }, 0) / x.rows.length : null;
      const wr = x.rows.length ? x.rows.reduce(function (s2, y) { return s2 + y.wear; }, 0) / x.rows.length : null;
      tb.appendChild(h('tr', null,
        h('td', { text: HOUR_LABEL[x.hr - 1] + t(S('時', ':00', ':00')) }),
        h('td', { text: x.v == null ? '—' : n1(shownVal(x.v, 11)) + '%' }),
        h('td', { text: String(x.rows.length) }),
        h('td', { text: mc == null || !has('mc') ? '—' : n1(mc) + '%' }),
        h('td', { text: wr == null || !has('wear') ? '—' : n1(wr) + 'h' })));
    });
    v.appendChild(h('div.table-wrap', null, h('table.tbl', null, tb)));
  }

  /* ---- 散布図 ---- */
  // 横軸の候補。呼び名と単位は工程で変わるが、目盛りの幅と境目は模型が決めるので変わらない。
  const AXES = function () {
    return [
      { id: 'mc', need: 'mc', label: vt('fac.mc', S('含水率', 'Moisture content', 'Kadar air')),
        unit: vt('unit.mc', '%'), lo: 7 * axScale('mc'), hi: 16 * axScale('mc'),
        d: axDec('mc'), sc: axScale('mc'), vline: 11 * axScale('mc'), band: [0, 11 * axScale('mc')] },
      { id: 'wear', need: 'wear', label: vt('fac.wear', S('刃の使用時間', 'Cutter hours', 'Jam pakai pisau')),
        unit: vt('unit.wear', 'h'), lo: 0, hi: 40 * axScale('wear'),
        d: axDec('wear'), sc: axScale('wear'), band: [0, 20 * axScale('wear')] },
      { id: 'roomT', need: 'attr', label: vt('fac.roomT', S('室温', 'Room temperature', 'Suhu ruang')),
        unit: '℃', lo: 14, hi: 28, d: 0, sc: 1, band: [0, 20] }
    ];
  };
  function paneScatter(v, pool) {
    const axes = AXES().filter(function (a) { return has(a.need); });
    if (!axes.length) { v.appendChild(note([S('まだ測っている属性がありません。', 'You are not recording any attribute yet.', 'Anda belum mencatat atribut apa pun.')])); return; }
    if (!st().sx || !axes.some(function (a) { return a.id === st().sx; })) st().sx = axes[0].id;
    const ys = [['total', S('合計', 'Total', 'Total')]].concat(has('daily') ? SYMPTOMS() : []);
    if (!st().sy || !ys.some(function (a) { return a[0] === st().sy; })) st().sy = 'total';

    const pick = function (label, list, cur, set) {
      const row = h('div.row', { style: { gap: '6px', flexWrap: 'wrap', alignItems: 'center', margin: '6px 0' } },
        h('span.muted', { style: { fontSize: '12px', fontWeight: '700' }, text: t(label) }));
      list.forEach(function (o) {
        const b = h('button.chip' + (cur === o[0] ? '.tone-navy' : ''), { type: 'button', text: t(o[1]) });
        b.style.cssText = 'cursor:pointer;border:1px solid var(--border)';
        b.addEventListener('click', function () { set(o[0]); save(); route(); });
        row.appendChild(b);
      });
      return row;
    };
    v.appendChild(pick(S('横軸', 'X axis', 'Sumbu X'), axes.map(function (a) { return [a.id, a.label]; }), st().sx, function (x) { st().sx = x; }));
    v.appendChild(pick(S('縦軸', 'Y axis', 'Sumbu Y'), ys, st().sy, function (x) { st().sy = x; }));

    const ax = axes.filter(function (a) { return a.id === st().sx; })[0];
    const from = st().bought[ax.need];
    const d = pool.filter(function (x) { return x.w >= from; });
    if (!d.length) {
      v.appendChild(note([S('この条件で流したロットがまだありません。1週流すと点が増えます。',
        'No lots have run under this setting yet. Run a week and the dots will appear.',
        'Belum ada lot yang berjalan pada kondisi ini. Jalankan satu minggu dan titiknya akan muncul.')]));
      return;
    }
    // 1ロット25個の不良率。16週ぶん全部でも640点なので、ふつうは間引かない。
    const step = Math.max(1, Math.ceil(d.length / 640));
    const pts = [];
    for (let i = 0; i < d.length; i += step) {
      const lot = d[i];
      const c = st().sy === 'total' ? (lot.dim + lot.glue + lot.surf) : lot[st().sy];
      // 他の画面と同じく、MSA を省いていれば判定のゆれが乗る
      pts.push([lot[ax.id] * (ax.sc || 1), shownVal(100 * c / lot.n, 10)]);
    }
    const yMax = Math.max(8, Math.ceil(Math.max.apply(null, pts.map(function (p) { return p[1]; })) / 4) * 4);
    // 軸は決まった幅で見せる。ただし外れた材まで隠すと調べる手がかりが消えるので、
    // データがはみ出したぶんだけ軸を広げる。
    const xv = pts.map(function (p) { return p[0]; });
    const x0 = Math.min(ax.lo, Math.floor(Math.min.apply(null, xv)));
    const x1 = Math.max(ax.hi, Math.ceil(Math.max.apply(null, xv)));
    v.appendChild(svgBox(null,
      C.scatter({ w: 680, h: 260, x0: x0, x1: x1, y0: 0, y1: yMax, yUnit: '%', xd: ax.d,
        xLabel: t(ax.label) + (ax.unit ? t(S('（', ' (', ' (')) + ax.unit + t(S('）', ')', ')')) : ''), vline: ax.vline, fit: true, pts: pts }),
      S('点は1ロット（' + PIECES + '個）ごとの不良率で、いま ' + pts.length + '点。'
        + '赤い線は当てはめた直線で、**向きを見るためのもの**です。'
        + (ax.vline ? '緑の縦線は ' + ax.vline + ' の位置。ここを境に形が変わるなら、しきい値があるということです。' : '')
        + '傾きがあっても、それだけでは原因だとは言えません。'
        + (has('msa') ? '' : '　なお測定のばらつきを確かめていないので、縦の位置には判定のゆれが乗っています。'),
        'Each dot is one lot of ' + PIECES + ' pieces; ' + pts.length + ' dots are shown.'
        + ' The red line is a least-squares fit, there **to show the direction**, nothing more.'
        + (ax.vline ? ' The green vertical line sits at ' + ax.vline + '. If the shape changes there, you have found a threshold.' : '')
        + ' A slope on its own does not make it the cause.'
        + (has('msa') ? '' : ' You have not checked the measurement scatter, so the vertical position carries the scatter of the judgement.'),
        'Tiap titik adalah satu lot berisi ' + PIECES + ' pcs; ada ' + pts.length + ' titik.'
        + ' Garis merah adalah garis kuadrat terkecil, **untuk menunjukkan arah** saja.'
        + (ax.vline ? ' Garis hijau vertikal berada di ' + ax.vline + '. Bila bentuknya berubah di sana, Anda menemukan ambang.' : '')
        + ' Kemiringan saja tidak menjadikannya penyebab.'
        + (has('msa') ? '' : ' Anda belum memeriksa variasi pengukuran, jadi posisi vertikalnya membawa variasi penilaian.'))));
  }

  /* ---- ヒストグラムとバンド適合率 ---- */
  function paneHist(v, pool) {
    const axes = AXES().filter(function (a) { return has(a.need) && a.id !== 'roomT'; });
    if (!axes.length) {
      v.appendChild(note([S(t(vt('fac.mc', S('含水率', 'Moisture', 'Kadar air'))) + 'か' + t(vt('fac.wear', S('刃の使用時間', 'cutter hours', 'jam pakai pisau'))) + 'を測り始めると、分布が見られます。',
        'Start measuring moisture or cutter hours and you can look at the distribution.',
        'Mulailah mengukur kadar air atau jam pakai pisau, dan Anda dapat melihat distribusinya.')]));
      return;
    }
    if (!st().hx || !axes.some(function (a) { return a.id === st().hx; })) st().hx = axes[0].id;
    const row = h('div.row', { style: { gap: '6px', flexWrap: 'wrap', margin: '6px 0' } });
    axes.forEach(function (a) {
      const b = h('button.chip' + (st().hx === a.id ? '.tone-navy' : ''), { type: 'button', text: t(a.label) });
      b.style.cssText = 'cursor:pointer;border:1px solid var(--border)';
      b.addEventListener('click', function () { st().hx = a.id; save(); route(); });
      row.appendChild(b);
    });
    v.appendChild(row);
    const ax = axes.filter(function (a) { return a.id === st().hx; })[0];
    const d = pool.filter(function (x) { return x.w >= st().bought[ax.need]; });
    const vals = d.map(function (x) { return x[ax.id] * (ax.sc || 1); });
    const band = ax.band || [0, 20];
    const inBand = vals.filter(function (x) { return x >= band[0] && x <= band[1]; }).length;
    v.appendChild(svgBox(null,
      C.hist({ w: 680, h: 240, x0: ax.lo, x1: ax.hi, bins: 14, vals: vals, band: band,
        xLabel: t(ax.label) + (ax.unit ? t(S('（', ' (', ' (')) + ax.unit + t(S('）', ')', ')')) : ''), xd: ax.d }),
      S('緑の帯が良品範囲です。**バンド適合率 ＝ 帯の中に入ったロット ÷ 全ロット**。',
        'The green band is the good range. **Band conformance = lots inside the band ÷ all lots.**',
        'Band hijau adalah rentang baik. **Kesesuaian band = lot di dalam band ÷ seluruh lot.**')));
    v.appendChild(h('div.g-hud', null,
      meter(S('バンド適合率', 'Band conformance', 'Kesesuaian band'),
        n1(100 * inBand / vals.length) + '%',
        S(inBand + ' ÷ ' + vals.length + ' ロット', inBand + ' ÷ ' + vals.length + ' lots', inBand + ' ÷ ' + vals.length + ' lot'),
        inBand / vals.length > 0.95 ? 'good' : inBand / vals.length > 0.7 ? 'warn' : 'bad'),
      meter(S('平均', 'Mean', 'Rata-rata'), n1(vals.reduce(function (s2, x) { return s2 + x; }, 0) / vals.length) + (ax.unit || '')),
      meter(S('最大', 'Max', 'Maks'), n1(Math.max.apply(null, vals)) + (ax.unit || ''))));
    v.appendChild(note([S('**分布の裾が帯からはみ出しているなら、平均を動かすだけでは足りません。**中心を動かすのか、幅を狭めるのか、条件の決め方が変わります。',
      '**If the tail of the distribution hangs outside the band, moving the mean is not enough.** Shifting the centre and narrowing the spread are different decisions about the condition.',
      '**Bila ekor distribusi menjulur keluar band, menggeser rata-rata saja tidak cukup.** Menggeser pusat dan mempersempit sebaran adalah keputusan yang berbeda tentang kondisinya.')]));
  }

  /* ---- 交互作用 ---- */
  function paneInter(v) {
    const D = st().doe;
    // 振った2つのつまみの呼び名。工程によって「在炉時間×圧締時間」が別の言葉になる。
    const kn = function (k) { const o = KNOBS().filter(function (x) { return x.k === k; })[0]; return o ? t(o.label) : k; };
    // つまみの呼び名に、値と単位を添える。単位はつまみが持っている。
    const knv = function (k, v) {
      const o = KNOBS().filter(function (x) { return x.k === k; })[0];
      if (!o) return k + v;
      const u = typeof o.unit === 'string' ? o.unit : t(o.unit || '');
    // 番手だけは #150 のように数字の前に付ける
    return t(o.label) + (u === '#' ? u + v : v + u);
    };
    const PR = kn('press'), KI = kn('kiln');
    v.appendChild(h('div.table-wrap', null, h('table.tbl', null, h('tbody', null,
      h('tr', null, h('th'), h('th', { text: knv('press', 45) }), h('th', { text: knv('press', 60) })),
      h('tr', null, h('th', { text: knv('kiln', 24) }), h('td', { text: n1(D.a) + '%' }), h('td', { text: n1(D.b) + '%' })),
      h('tr', null, h('th', { text: knv('kiln', 40) }), h('td', { text: n1(D.c) + '%' }), h('td', { text: n1(D.d) + '%' }))))));
    v.appendChild(svgBox(S('交互作用図', 'Interaction plot', 'Plot interaksi'),
      C.interaction({ w: 620, h: 230, xLabels: [knv('press', 45), knv('press', 60)],
        xLabel: PR,
        rows: [
          { label: knv('kiln', 24), a: D.a, b: D.b, color: 'var(--red)' },
          { label: knv('kiln', 40), a: D.c, b: D.d, color: 'var(--navy)' }
        ] }),
      S('**2本が平行なら交互作用はありません。**開きが変わるなら、片方の効き方がもう片方の水準で変わっているということです。',
        '**Two parallel lines mean no interaction.** If the gap between them changes, then how much one factor matters depends on the level of the other.',
        '**Dua garis sejajar berarti tidak ada interaksi.** Bila jarak keduanya berubah, berarti seberapa besar pengaruh satu faktor bergantung pada tingkat faktor lain.')));
    const add = D.a - (D.a - D.b) - (D.a - D.c);
    v.appendChild(note([S('足し算の予測：最良の ' + n1(D.d) + '% に、' + PR + 'だけ悪い分 ' + n1(D.c - D.d) + ' と ' + KI + 'だけ悪い分 ' + n1(D.b - D.d)
      + ' を足して ' + n1(D.d + (D.c - D.d) + (D.b - D.d)) + '%。実際に両方悪い条件は ' + n1(D.a) + '%。**差の ' + n1(D.a - (D.d + (D.c - D.d) + (D.b - D.d)))
      + ' ポイントが、2つが重なったときにだけ出る分**です。',
      'Addition predicts: take the best cell at ' + n1(D.d) + '%, add ' + n1(D.c - D.d) + ' for press alone and ' + n1(D.b - D.d)
      + ' for the kiln alone, and you get ' + n1(D.d + (D.c - D.d) + (D.b - D.d)) + '%. The cell with both bad is ' + n1(D.a)
      + '%. **The ' + n1(D.a - (D.d + (D.c - D.d) + (D.b - D.d))) + ' pt difference is what appears only when the two coincide.**',
      'Penjumlahan memprediksi: ambil sel terbaik ' + n1(D.d) + '%, tambahkan ' + n1(D.c - D.d) + ' untuk pres saja dan ' + n1(D.b - D.d)
      + ' untuk kiln saja, hasilnya ' + n1(D.d + (D.c - D.d) + (D.b - D.d)) + '%. Sel dengan keduanya buruk adalah ' + n1(D.a)
      + '%. **Selisih ' + n1(D.a - (D.d + (D.c - D.d) + (D.b - D.d))) + ' pt itulah yang hanya muncul saat keduanya bertemu.**')]));
  }

  /* ---- 4つの箱 ---- */
  function paneBoxes(v) {
    const first = st().hist.length ? st().hist.slice(0, Math.min(4, st().hist.length)) : [];
    const now = st().hist.length ? st().hist.slice(-4) : [];
    const avg = function (a) { return a.length ? a.reduce(function (s2, x) { return s2 + x.shown; }, 0) / a.length : 0; };
    const changed = KNOBS().filter(function (k) { return st().cfg[k.k] !== BASE[k.k]; });
    const rows = [
      ['①', S('現状の値', 'Where it is now', 'Keadaan sekarang'),
        st().hist.length ? n1(avg(now)) + '%' + t(S('（直近4週）', ' (last four weeks)', ' (empat minggu terakhir)')) : '—',
        st().hist.length ? t(S('始めの4週は ', 'the first four weeks were ', 'empat minggu pertama ')) + n1(avg(first)) + '%' : ''],
      ['②', S('あるべき姿', 'What it should be', 'Kondisi seharusnya'),
        st().suspect ? t((SUSPECTS().filter(function (x) { return x[0] === st().suspect; })[0] || [0, S('—', '—', '—')])[1]) : t(S('（まだ決めていない）', '(not decided yet)', '(belum ditentukan)')),
        t(S('条件が良品範囲に収まっている状態', 'every condition sitting inside its good range', 'setiap kondisi berada dalam rentang baiknya'))],
      ['③', S('新たなやり方', 'The new way of working', 'Cara kerja yang baru'),
        changed.length ? changed.map(function (k) { return t(k.label) + ' ' + BASE[k.k] + ' → ' + st().cfg[k.k]; }).join(t(S('、', ', ', ', '))) : t(S('（まだ何も変えていない）', '(nothing changed yet)', '(belum ada yang diubah)')),
        t(S('毎月 ', 'monthly ', 'bulanan ')) + t(yen(costOf(st().cfg)))],
      ['④', S('目標の値', 'The target', 'Sasaran'),
        st().target ? n1(st().target.value) + '%' : '—',
        st().target ? t(TARGET_WHY[st().target.id] || S('', '', '')) : '']
    ];
    const tb = h('tbody');
    rows.forEach(function (r) {
      tb.appendChild(h('tr', null,
        h('th', { text: r[0] + ' ' + t(r[1]) }),
        h('td', null, h('div', { style: { fontWeight: '700' }, text: r[2] }),
          r[3] ? h('div.muted', { style: { fontSize: '12px' }, text: r[3] }) : null)));
    });
    v.appendChild(h('div.table-wrap', null, h('table.tbl', null, tb)));
    v.appendChild(note([S('**①と④の差が、取りにいく分です。**②で「何をあるべき姿とするか」を決めないと、③のやり方は選べません。'
      + '②が空のままで③だけ動かすと、効いたのか偶然なのかが後から言えなくなります。',
      '**The gap between ① and ④ is what you are going after.** Until ② says what the condition ought to be, ③ has nothing to choose from. '
      + 'Move ③ with ② still blank and you will not be able to say afterwards whether it worked or the week was kind.',
      '**Selisih antara ① dan ④ adalah yang Anda kejar.** Sampai ② menyatakan kondisi seharusnya bagaimana, ③ tidak punya pilihan. '
      + 'Gerakkan ③ dengan ② masih kosong dan Anda tidak akan bisa mengatakan apakah itu memang berhasil atau hanya kebetulan.')]));
  }

  const PANES = {
    trend: paneTrend, hourly: paneHourly, pchart: panePChart, pareto: panePareto, strat: paneStrat,
    scatter: paneScatter, hist: paneHist, inter: paneInter, boxes: paneBoxes
  };

  Object.assign(G, { screenAnalyze: screenAnalyze });
})();
