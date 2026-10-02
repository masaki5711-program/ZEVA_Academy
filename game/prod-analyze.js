/* 現場再建記 — 木工ライン丁（生産性）：分析室（山積み・稼働・価値作業）
 * 土台は core.js（WS）。ここで定義したものは WS.P に載せ、後ろのファイルから使う。
 */
(function () {
  'use strict';
  const WS = window.WS, P = WS.P;
  const ZA = WS.ZA, h = WS.h, t = WS.t, S = WS.S, n1 = WS.n1, sep = WS.sep;
  const btn = WS.btn, act = WS.act, note = WS.note, meter = WS.meter, talk = WS.talk;
  const svgBox = WS.svgBox, show = WS.show, paramPanel = WS.paramPanel, RANK = WS.RANK;
  const save = WS.save, route = WS.route, has = WS.has, scen = WS.scen;
  const C = window.WOODSHOP_CHARTS;
  const st = WS.state;
  const WEEKS = WS.WEEKS;
  const DPW = WS.DPW, HOURS = WS.HOURS, DAYS = WS.DAYS, HOUR_LABEL = WS.HOUR_LABEL;
  const DEMAND = P.DEMAND;
  const PROC = P.PROC;
  const SHIFT = P.SHIFT;

  const BASE = P.BASE;
  const KNOBS = P.KNOBS;
  const NAMES = P.NAMES;
  const TARGET_WHY = P.TARGET_WHY;
  const board = P.board;
  const cfgKey = P.cfgKey;
  const day = P.day;
  const hud = P.hud;
  const outChart = P.outChart;
  const setupMin = P.setupMin;
  const split = P.split;
  const stdLevel = P.stdLevel;
  /* ---- 分析室 ---- */
  const TABS = [
    ['trend', S('推移', 'Trend', 'Tren'), null],
    ['hourly', S('時間ごと', 'By hour', 'Per jam'), 'stop'],
    ['yama', S('山積み図', 'Yamazumi', 'Yamazumi'), 'time'],
    ['time', S('稼働の内訳', 'Where the minutes go', 'Rincian waktu operasi'), 'stop'],
    ['setup', S('段取りの分解', 'Changeover split', 'Pembagian pergantian'), 'setup'],
    ['value', S('価値作業分析', 'Value work', 'Pekerjaan bernilai'), 'work'],
    ['lt', S('リードタイム', 'Lead time', 'Lead time'), 'wip'],
    ['trial', S('試験日の結果', 'Trial days', 'Hari uji'), 'trial'],
    ['boxes', S('4つの箱', 'Four boxes', 'Empat kotak'), null]
  ];
  function analyze() {
    const s = st();
    const v = h('div');
    v.appendChild(hud());
    const okTab = function (need) { return !need || has(need); };
    if (!okTab((TABS.filter(function (x) { return x[0] === s.tab; })[0] || [])[2])) s.tab = 'trend';
    const bar = h('div.g-steps');
    TABS.forEach(function (tb) {
      const ok = okTab(tb[2]);
      const chip = h('button.chip' + (s.tab === tb[0] ? '.tone-navy' : ''), { type: 'button', text: t(tb[1]) });
      chip.style.cssText = 'cursor:pointer;border:1px solid var(--border);' + (ok ? '' : 'opacity:.42;cursor:not-allowed');
      if (ok) chip.addEventListener('click', function () { s.tab = tb[0]; save(); route(); });
      bar.appendChild(chip);
    });
    v.appendChild(bar);
    s.seenTabs = s.seenTabs || {};
    s.seenTabs[s.tab] = true;
    (PANES[s.tab] || PANES.trend)(v);
    const b = btn(S('盤面へ戻る', 'Back to the floor', 'Kembali ke papan permainan'), function () { s.screen = 'board'; save(); route(); });
    b.style.marginTop = '14px';
    v.appendChild(b);
    show(v);
  }

  function paneTrend(v) {
    const s = st();
    v.appendChild(outChart());
    const ds = s.days.map(function (x) { return x.out; });
    const mu = ds.reduce(function (a, b) { return a + b; }, 0) / ds.length;
    const sg = Math.sqrt(ds.reduce(function (a, b) { return a + (b - mu) * (b - mu); }, 0) / ds.length);
    v.appendChild(h('div.g-hud', null,
      meter(S('1日の平均', 'Daily mean', 'Rata-rata harian'), Math.round(mu) + t(S('個', ' pcs', ' pcs'))),
      meter(S('母標準偏差 σ', 'Population σ', 'σ populasi'), n1(sg) + t(S('個', ' pcs', ' pcs'))),
      meter(S('V.Score（σ÷μ）', 'V.Score (σ÷μ)', 'V.Score (σ÷μ)'), WS.fmt(sg / mu, 3), null, sg / mu < 0.1 ? 'good' : 'warn'),
      meter(S('需要に対して', 'Against demand', 'Terhadap permintaan'),
        (mu >= DEMAND ? '+' : '') + Math.round(mu - DEMAND) + t(S('個/日', ' pcs/day', ' pcs/hari')), null,
        mu >= DEMAND ? 'good' : 'bad')));
    v.appendChild(note([S('**日産の平均だけでなく、日ごとのばらつきも見てください。**平均が需要に届いていても、σが大きければ欠品する日が出ます。',
      '**Look at the day-to-day scatter, not only the mean.** A mean that clears demand still misses on the bad days if σ is large.',
      '**Perhatikan sebaran harian, bukan hanya rata-ratanya.** Rata-rata yang melewati permintaan tetap meleset di hari buruk bila σ besar.')]));
  }

  function paneYama(v) {
    const s = st();
    const d = day(s.cfg, stdLevel());
    const neck = d.neck;
    const takt = SHIFT * 60 / DEMAND;
    v.appendChild(svgBox(S('山積み図（工程別のサイクルタイム）', 'Yamazumi: cycle time by process', 'Yamazumi: waktu siklus per proses'),
      C.bars({ w: 680, left: 118, unit: t(S('秒', ' s', ' detik')), d: 1,
        rows: d.ct.map(function (x, i) {
          return { label: t(NAMES[i]), value: x, color: x >= neck - 0.01 ? 'var(--red)' : 'var(--navy)',
            note: n1(x) + t(S('秒', ' s', ' detik')) + (x >= neck - 0.01 ? t(S('　← ネック', '  ← bottleneck', '  ← bottleneck')) : '') };
        }) }),
      S('赤がネック工程です。**日産はネックタイムで決まります。**タクトタイムは ' + SHIFT + '分 × 60 ÷ ' + DEMAND + '個 ＝ ' + n1(takt) + '秒。'
        + 'ネックがタクトを越えている間は、どれだけ他を速くしても需要に届きません。',
        'Red is the bottleneck. **Output is set by the bottleneck time.** Takt time is ' + SHIFT + ' min × 60 ÷ ' + DEMAND + ' = ' + n1(takt) + ' s. '
        + 'While the bottleneck sits above takt, speeding anything else up will not reach demand.',
        'Merah adalah bottleneck. **Output ditentukan oleh waktu bottleneck.** Takt time adalah ' + SHIFT + ' menit × 60 ÷ ' + DEMAND + ' = ' + n1(takt) + ' detik. '
        + 'Selama bottleneck di atas takt, mempercepat yang lain tidak akan mencapai permintaan.')));
    if (stdLevel() < 1) {
      v.appendChild(note([S('**標準作業が ' + Math.round(stdLevel() * 5) + ' / 5 工程です。整っていない工程があるので、この山積みはまだ信用できません。**同じ工程でも人によって手順が違うぶん、'
        + '観測した時間にはいちばん遅いやり方が混ざっています。標準作業をつくると、各工程のサイクルタイムは今より短く締まります。',
        '**Standard work is in place at ' + Math.round(stdLevel() * 5) + ' / 5 processes, so this yamazumi cannot be trusted yet.** Within a process the steps differ by person, so the times you measured '
        + 'have the slowest way mixed into them. Write the standard work and every process time tightens below what you see here.',
        '**Kerja standar baru ada di ' + Math.round(stdLevel() * 5) + ' dari 5 proses. Karena masih ada proses yang belum dibakukan, yamazumi ini belum dapat dipercaya.** Dalam satu proses langkahnya berbeda menurut orang, sehingga waktu yang Anda ukur '
        + 'bercampur dengan cara kerja yang paling lambat. Susun kerja standar dan setiap waktu proses akan mengetat di bawah yang Anda lihat di sini.')]));
    }
    v.appendChild(h('div.g-hud', null,
      meter(S('ネックタイム', 'Bottleneck time', 'Waktu bottleneck'), n1(neck) + t(S('秒', ' s', ' detik'))),
      meter(S('タクトタイム', 'Takt time', 'Takt time'), n1(takt) + t(S('秒', ' s', ' detik'))),
      meter(S('編成効率', 'Line balance efficiency', 'Efisiensi keseimbangan lini'), n1(d.balance * 100) + '%', null, d.balance > 0.85 ? 'good' : 'warn'),
      meter(S('編成ロス', 'Balance loss', 'Kerugian keseimbangan lini'), n1((1 - d.balance) * 100) + '%')));
    v.appendChild(note([S('編成効率 ＝ 各工程の合計 ÷（ネックタイム × 工程数）。**ネックを削るか、ネックの仕事を他へ移すか**の2つしか手はありません。'
      + '人を足しても、ネックの中身が減らなければ日産は増えません。',
      'Line balance efficiency = sum of the process times ÷ (bottleneck × number of processes). There are only two moves: **shorten the bottleneck, or move work out of it.** '
      + 'Adding a person changes nothing unless the work inside the bottleneck shrinks.',
      'Efisiensi keseimbangan lini = jumlah waktu proses ÷ (bottleneck × jumlah proses). Hanya ada dua langkah: **perpendek bottleneck, atau pindahkan kerja darinya.** '
      + 'Menambah orang tidak mengubah apa pun kecuali kerja di dalam bottleneck berkurang.')]));
  }

  function paneTime(v) {
    const s = st();
    const d = day(s.cfg, stdLevel());
    const rows = [
      { label: t(S('正味の生産', 'Net production', 'Produksi bersih')), value: d.out * d.neck / 60, color: 'var(--green)' },
      { label: t(S('段取り', 'Changeover', 'Pergantian')), value: d.setupTotal, color: 'var(--red)' },
      { label: t(S('立上げの予熱', 'Warm-up', 'Pemanasan')), value: d.warm, color: 'var(--amber)' },
      { label: t(S('チョコ停', 'Minor stops', 'Henti sesaat (chokotei)')), value: d.choko, color: 'var(--amber)' },
      { label: t(S('その他の待ち', 'Other waiting', 'Waktu tunggu lainnya')), value: Math.max(0, SHIFT - d.out * d.neck / 60 - d.setupTotal - d.warm - d.choko), color: 'var(--muted)' }
    ];
    v.appendChild(svgBox(S('1日480分の使われ方', 'Where the 480 minutes of a day go', 'Untuk apa saja 480 menit sehari terpakai'),
      C.bars({ w: 680, left: 118, d: 0, unit: t(S('分', ' min', ' menit')), rows: rows }),
      S('**いちばん長い赤から手を付けます。**段取りは回数 × 1回の時間なので、どちらを減らすかで手が変わります。',
        '**Start with the longest red bar.** Changeover is a count times a duration, so which of the two you attack changes the move.',
        '**Mulai dari batang merah terpanjang.** Pergantian adalah jumlah kali durasi, jadi mana dari keduanya yang diserang mengubah langkahnya.')));
    v.appendChild(h('div.g-hud', null,
      meter(S('時間稼働率', 'Availability', 'Availability'), n1(d.aRate * 100) + '%'),
      meter(S('性能稼働率', 'Performance', 'Performance'), n1(d.pRate * 100) + '%'),
      meter(S('良品率', 'Quality', 'Rasio produk baik'), n1(d.qRate * 100) + '%'),
      meter(S('OEE', 'OEE', 'OEE'), n1(d.aRate * d.pRate * d.qRate * 100) + '%', null,
        d.aRate * d.pRate * d.qRate > 0.85 ? 'good' : 'warn')));
    v.appendChild(note([S('OEE ＝ 時間稼働率 × 性能稼働率 × 良品率。**3つのどれが低いかで打つ手が変わります。**'
      + '時間稼働率が低いのは止まっているから、性能稼働率が低いのは遅いから、良品率が低いのは作り直しているからです。',
      'OEE = availability × performance × quality. **Which of the three is low decides the move.** '
      + 'Low availability means it is stopped; low performance means it is slow; low quality means it is being made twice.',
      'OEE = Availability × Performance × rasio produk baik. **Mana dari ketiganya yang rendah menentukan langkahnya.** '
      + 'Availability rendah berarti berhenti; Performance rendah berarti lambat; rasio produk baik rendah berarti dibuat dua kali.')]));
  }

  function paneSetup(v) {
    const s = st();
    const cur = setupMin(s.cfg);
    const rows = [
      { label: t(S('外段取りにできる', 'Can be external', 'Bisa dijadikan eksternal')), value: 33, color: 'var(--green)',
        note: t(S('33分：刃と治具の準備、塗料の計量、図面の確認', '33 min: preparing cutters and jigs, weighing finish, checking drawings', '33 menit: menyiapkan pisau dan jig, menakar cat, memeriksa gambar')) },
      { label: t(S('内段取りのまま', 'Must stay internal', 'Harus tetap internal')), value: 12, color: 'var(--red)',
        note: t(S('12分：機械を止めないとできない取付けと芯出し', '12 min: mounting and centring that need the machine stopped', '12 menit: pemasangan dan pemusatan yang memerlukan mesin berhenti')) }
    ];
    v.appendChild(svgBox(S('段取り45分の中身', 'Inside the 45-minute changeover', 'Di dalam pergantian 45 menit'),
      C.bars({ w: 680, left: 150, d: 0, unit: t(S('分', ' min', ' menit')), rows: rows }),
      S('いまの1回あたりは ' + Math.round(cur) + '分です。**機械を止めなくてもできる仕事を、止めている間にやっている**のが段取りが長い理由です。',
        'One changeover currently takes ' + Math.round(cur) + ' minutes. A changeover is long because **work that does not need the machine stopped is being done while it is stopped.**',
        'Satu pergantian kini memakan ' + Math.round(cur) + ' menit. Pergantian menjadi lama karena **kerja yang tidak memerlukan mesin berhenti dikerjakan saat mesin berhenti.**')));
    v.appendChild(note([S('外段取り化できる33分を前の日のうちに済ませると、1回の段取りは12分に近づきます。'
      + '**そこまで縮めてから**ロットを小さくすると、回数が増えても稼働時間はさほど減りません。順番が逆だと日産は落ちます。',
      'Do the 33 externalisable minutes the day before and a changeover approaches 12. **Only once it is that short** does cutting the lot stop hurting: the count rises but the running time barely falls. The other order costs output.',
      'Kerjakan 33 menit yang dapat dieksternalkan pada hari sebelumnya dan pergantian mendekati 12 menit. **Baru setelah sependek itu** memperkecil lot berhenti merugikan: jumlahnya naik tetapi waktu operasi nyaris tak berkurang. Urutan sebaliknya memakan output.')]));
  }

  function paneLt(v) {
    const s = st();
    const d = day(s.cfg, stdLevel());
    const wip = PROC * s.cfg.lot;
    v.appendChild(h('div.g-hud', null,
      meter(S('仕掛', 'Work in process', 'WIP'), wip.toLocaleString() + t(S('個', ' pcs', ' pcs')),
        S(PROC + '工程 × ロット' + s.cfg.lot + '個', PROC + ' processes × lot of ' + s.cfg.lot, PROC + ' proses × lot ' + s.cfg.lot)),
      meter(S('1日の産出', 'Daily output', 'Output harian'), Math.round(d.out) + t(S('個', ' pcs', ' pcs'))),
      meter(S('リードタイム', 'Lead time', 'Lead time'), n1(d.lt) + t(S('日', ' days', ' hari')), null, d.lt < 2 ? 'good' : d.lt < 4 ? 'warn' : 'bad')));
    const lots = [600, 500, 400, 300, 200, 150, 100];
    // 2本の線と需要の線が全部入る高さ。段取りを直していないと
    // リードタイムが伸びるので、決め打ちの高さでは上に飛び出す。
    const lotY = lots.reduce(function (a, L) {
      const dd = day(Object.assign({}, s.cfg, { lot: L }), stdLevel());
      return a.concat([dd.out, dd.lt * 80]);
    }, [DEMAND]);
    v.appendChild(svgBox(S('ロットサイズを変えると', 'What the lot size does', 'Apa yang dilakukan ukuran lot'),
      C.lines({ w: 680, h: 240, x0: 100, x1: 600, y0: 0, y1: Math.max.apply(null, lotY) * 1.12, yd: 0,
        xTicks: lots.slice().reverse(), xLabel: t(S('ロットサイズ（個）', 'lot size (pcs)', 'ukuran lot (pcs)')),
        rules: [{ at: DEMAND, color: 'var(--red)', label: t(S('需要', 'demand', 'permintaan')) }],
        series: [
          { name: 'out', color: 'var(--navy)', points: lots.map(function (L) { return [L, day(Object.assign({}, s.cfg, { lot: L }), stdLevel()).out]; }) },
          { name: 'lt', color: 'var(--green)', dash: '5 4',
            points: lots.map(function (L) { const dd = day(Object.assign({}, s.cfg, { lot: L }), stdLevel()); return [L, dd.lt * 80]; }) }
        ] }),
      S('紺が日産、緑がリードタイム（1日を80でかけて同じ目盛りに載せてあります）。'
        + '**いまの段取り時間のままで、ロットをどこまで小さくできるか**がこの図で読めます。赤い線を割ったら欠品です。',
        'Navy is output, green is lead time (multiplied by 80 to share the axis). '
        + 'The chart says **how small the lot can go at the changeover time you have now.** Below the red line you are short.',
        'Biru tua adalah output, hijau adalah lead time (dikali 80 agar berbagi sumbu). '
        + 'Grafik ini menyatakan **seberapa kecil lot bisa dibuat pada waktu pergantian yang ada sekarang.** Di bawah garis merah berarti kurang.')));
  }

  function paneTrial(v) {
    const s = st();
    const cell = function (setup, lot) { return day(Object.assign({}, s.cfg, { setup: setup, lot: lot }), stdLevel()).out; };
    v.appendChild(h('div.table-wrap', null, h('table.tbl', null, h('tbody', null,
      h('tr', null, h('th'), h('th', { text: t(S('ロット600', 'Lot 600', 'Lot 600')) }), h('th', { text: t(S('ロット150', 'Lot 150', 'Lot 150')) })),
      h('tr', null, h('th', { text: t(S('段取り45分のまま', 'Changeover left at 45 min', 'Pergantian tetap 45 menit')) }),
        h('td', { text: cell(0, 600) + t(S('個', '', '')) }), h('td', { text: cell(0, 150) + t(S('個', '', '')) })),
      h('tr', null, h('th', { text: t(S('外段取り化して19分', 'Externalised to 19 min', 'Dieksternalkan menjadi 19 menit')) }),
        h('td', { text: cell(0.8, 600) + t(S('個', '', '')) }), h('td', { text: cell(0.8, 150) + t(S('個', '', '')) }))))));
    v.appendChild(svgBox(S('交互作用図：段取り時間 × ロットサイズ', 'Interaction: changeover time by lot size', 'Interaksi: waktu pergantian dan ukuran lot'),
      C.interaction({ w: 620, h: 230,
        xLabels: [t(S('ロット600', 'Lot 600', 'Lot 600')), t(S('ロット150', 'Lot 150', 'Lot 150'))],
        xLabel: t(S('ロットサイズ', 'lot size', 'ukuran lot')),
        rows: [
          { label: t(S('段取り45分', 'Changeover 45 min', 'Pergantian 45 menit')), a: cell(0, 600), b: cell(0, 150), color: 'var(--red)' },
          { label: t(S('段取り19分', 'Changeover 19 min', 'Pergantian 19 menit')), a: cell(0.8, 600), b: cell(0.8, 150), color: 'var(--navy)' }
        ] }),
      S('**2本の傾きが違います。**ロットを小さくしたときに日産がどれだけ落ちるかは、段取りが何分かで決まります。'
        + 'これが「小ロットは段取りを短くしてから」の中身です。',
        '**The two lines have different slopes.** How much output a smaller lot costs depends on how long a changeover takes. '
        + 'That is what “shorten the changeover before you shrink the lot” means.',
        '**Kedua garis memiliki kemiringan berbeda.** Seberapa besar output yang hilang karena lot lebih kecil bergantung pada lama pergantian. '
        + 'Itulah arti “perpendek pergantian sebelum memperkecil lot”.')));
  }

  function paneBoxes(v) {
    const s = st();
    const d = day(s.cfg, stdLevel());
    const first = s.hist.slice(0, Math.min(4, s.hist.length));
    const now = s.hist.slice(-4);
    const avg = function (a) { return a.length ? a.reduce(function (t2, x) { return t2 + x.shown; }, 0) / a.length : 0; };
    const changed = KNOBS.filter(function (k) { return s.cfg[k.k] !== BASE[k.k]; });
    const rows = [
      ['①', S('現状の値', 'Where it is now', 'Keadaan sekarang'),
        s.hist.length ? Math.round(avg(now)) + t(S('個/日', ' pcs/day', ' pcs/hari')) : '—',
        s.hist.length ? t(S('始めの4週は ', 'the first four weeks were ', 'empat minggu pertama ')) + Math.round(avg(first)) + t(S('個/日', ' pcs/day', ' pcs/hari')) : ''],
      ['②', S('あるべき姿', 'What it should be', 'Kondisi seharusnya'),
        s.suspect ? t((SUSPECTS.filter(function (x) { return x[0] === s.suspect; })[0] || [0, S('—', '—', '—')])[1]) : t(S('（まだ決めていない）', '(not decided yet)', '(belum ditentukan)')),
        t(S('止まらず待たずに流れている状態', 'nothing stopping and nothing waiting', 'tidak ada yang berhenti dan tidak ada yang menunggu'))],
      ['③', S('新たなやり方', 'The new way of working', 'Cara kerja yang baru'),
        changed.length ? changed.map(function (k) { return t(k.label); }).join(t(S('、', ', ', ', '))) : t(S('（まだ何も変えていない）', '(nothing changed yet)', '(belum ada yang diubah)')),
        t(S('ネック ', 'bottleneck ', 'bottleneck ')) + n1(d.neck) + t(S('秒　稼働 ', ' s, running ', ' detik, operasi ')) + Math.round(d.avail) + t(S('分', ' min', ' menit'))],
      ['④', S('目標の値', 'The target', 'Sasaran'),
        s.target ? s.target.value + t(S('個/日', ' pcs/day', ' pcs/hari')) : '—',
        s.target ? t(TARGET_WHY[s.target.id] || S('', '', '')) : '']
    ];
    const tb = h('tbody');
    rows.forEach(function (r) {
      tb.appendChild(h('tr', null, h('th', { text: r[0] + ' ' + t(r[1]) }),
        h('td', null, h('div', { style: { fontWeight: '700' }, text: r[2] }),
          r[3] ? h('div.muted', { style: { fontSize: '12px' }, text: r[3] }) : null)));
    });
    v.appendChild(h('div.table-wrap', null, h('table.tbl', null, tb)));
    v.appendChild(note([S('**①と④の差が、取りにいく分です。**②を決めないと③は選べません。生産性でも順番は同じです。',
      '**The gap between ① and ④ is what you are going after.** Until ② is settled, ③ has nothing to choose from. The order is the same for productivity.',
      '**Selisih antara ① dan ④ adalah yang Anda kejar.** Sampai ② ditetapkan, ③ tidak punya pilihan. Urutannya sama untuk produktivitas.')]));
  }

  /* ---- 価値作業分析 ---- */
  function paneValue(v) {
    const s = st();
    const sp = split(s.cfg);
    const tot = sp.reduce(function (a, x) { return { v: a.v + x.value, s: a.s + x.semi, n: a.n + x.non, c: a.c + x.ct }; },
      { v: 0, s: 0, n: 0, c: 0 });
    // 工程ごとの積み上げ（3本の棒で見せる）
    const rows = [];
    sp.forEach(function (x, i) {
      rows.push({ label: t(NAMES[i]) + t(S(' 価値', ' value', ' bernilai')), value: x.value, color: 'var(--green)' });
      rows.push({ label: t(NAMES[i]) + t(S(' 準価値', ' semi', ' semi-bernilai')), value: x.semi, color: 'var(--amber)' });
      rows.push({ label: t(NAMES[i]) + t(S(' 無価値', ' non-value', ' tanpa nilai')), value: x.non, color: 'var(--red)' });
    });
    v.appendChild(svgBox(S('工程ごとの作業の中身', 'What the work is made of, process by process', 'Isi kerja, proses demi proses'),
      C.bars({ w: 680, left: 150, d: 1, unit: t(S('秒', ' s', ' detik')), rowH: 20, rows: rows }),
      S('**無価値作業がいちばん大きい工程を探してください。**他の工程が6秒前後のところ、1つだけ飛び抜けているなら、'
        + 'そこは「遅い」のではなく「待っている」のです。',
        '**Look for the process with the largest non-value bar.** Where the others sit around six seconds and one stands out, '
        + 'that process is not slow — it is waiting.',
        '**Cari proses dengan batang tanpa nilai terbesar.** Bila yang lain sekitar enam detik dan satu menonjol, '
        + 'proses itu tidak lambat — ia sedang menunggu.')));
    v.appendChild(h('div.g-hud', null,
      meter(S('価値作業', 'Value work', 'Pekerjaan bernilai'), n1(tot.v) + t(S('秒', ' s', ' detik')),
        S('価値作業比率 ' + n1(100 * tot.v / tot.c) + '%', 'value ratio ' + n1(100 * tot.v / tot.c) + '%', 'rasio pekerjaan bernilai ' + n1(100 * tot.v / tot.c) + '%'),
        tot.v / tot.c > 0.7 ? 'good' : 'warn'),
      meter(S('準価値作業', 'Semi-value work', 'Pekerjaan semi-bernilai'), n1(tot.s) + t(S('秒', ' s', ' detik')),
        S('技術ロス。工法や設備を変えないと消えない', 'technical loss: it goes only if the method or the machine changes', 'kerugian teknis: hilang hanya bila metode atau mesin berubah')),
      meter(S('無価値作業', 'Non-value work', 'Pekerjaan tanpa nilai'), n1(tot.n) + t(S('秒', ' s', ' detik')),
        S('管理ロス。やり方を変えれば消える', 'management loss: it goes when the way of working changes', 'kerugian manajemen: hilang saat cara kerja berubah'),
        tot.n > 30 ? 'bad' : '')));
    const genba = tot.v + tot.s, giji = tot.v;
    v.appendChild(h('div.table-wrap', null, h('table.tbl', null, h('tbody', null,
      h('tr', null, h('th', { text: t(S('現状（5工程の合計）', 'As it is (five processes)', 'Apa adanya (lima proses)')) }), h('td', { text: n1(tot.c) + t(S('秒', ' s', ' detik')) })),
      h('tr', null, h('th', { text: t(S('現場理論値（価値＋準価値）', 'Site theoretical value (value + semi)', 'Nilai teoretis lapangan (nilai + semi)')) }), h('td', { text: n1(genba) + t(S('秒', ' s', ' detik')) })),
      h('tr', null, h('th', { text: t(S('技術理論値（価値だけ）', 'Technical theoretical value (value only)', 'Nilai teoretis teknis (hanya nilai)')) }), h('td', { text: n1(giji) + t(S('秒', ' s', ' detik')) })),
      h('tr', null, h('th', { text: t(S('管理ロス（現状 − 現場理論値）', 'Management loss (as-is − site theoretical)', 'Kerugian manajemen (apa adanya − teoretis lapangan)')) }), h('td', { text: n1(tot.c - genba) + t(S('秒', ' s', ' detik')) })),
      h('tr', null, h('th', { text: t(S('技術ロス（現場理論値 − 技術理論値）', 'Technical loss (site − technical)', 'Kerugian teknis (lapangan − teknis)')) }), h('td', { text: n1(genba - giji) + t(S('秒', ' s', ' detik')) }))))));
    v.appendChild(note([S('**先に取りにいくのは管理ロスです。**やり方を変えれば消えるもので、設備も工法も変えずに済みます。'
      + '技術ロスに手を出すのは、工法か設備を変える話になってからです。'
      + '価値作業そのものを短くするのは、最後の最後です。',
      '**Go after the management loss first.** It goes when the way of working changes, with no new machine and no new method. '
      + 'The technical loss is a conversation about changing the method or the machine. '
      + 'Shortening the value work itself comes last of all.',
      '**Kejar kerugian manajemen lebih dulu.** Ia hilang saat cara kerja berubah, tanpa mesin baru dan tanpa metode baru. '
      + 'Kerugian teknis adalah pembicaraan tentang mengubah metode atau mesin. '
      + 'Memperpendek pekerjaan bernilai itu sendiri datang paling akhir.')]));
    if (!s.cfg.feed) {
      v.appendChild(note([S('**工程3の無価値 ' + n1(sp[2].non) + '秒 は、前工程からの材料待ちです。**'
        + '「やり方を変える」に、材料の供給方法を変える手が増えています。',
        '**The ' + n1(sp[2].non) + ' seconds of non-value work at process 3 is waiting for material from upstream.** '
        + 'A new move has appeared under “change how the line runs”: change the way it is fed.',
        '**' + n1(sp[2].non) + ' detik pekerjaan tanpa nilai di proses 3 adalah menunggu material dari hulu.** '
        + 'Langkah baru muncul di bawah “ubah cara lini berjalan”: ubah cara pasokannya.')]));
    }
  }

  /* ---- 時間ごと ----
   * 1日のどこで止まっているかを見る。段取りと立上げが入った時間だけ出来高が凹むので、
   * 「1日の平均で見ていると、山も谷も平らになって消える」ことが目で分かる。
   */
  function paneHourly(v) {
    const s = st();
    const k = cfgKey(s.cfg, stdLevel());
    const rows = (s.hours || []).filter(function (x) { return x.k === k && x.w >= s.bought.stop; });
    if (!rows.length) {
      v.appendChild(note([S('この条件で流した日がまだありません。', 'No days under this setting yet.', 'Belum ada hari pada kondisi ini.')]));
      return;
    }
    const days = [];
    rows.forEach(function (x) { if (days.indexOf(x.dn) < 0) days.push(x.dn); });
    days.sort(function (a, b) { return a - b; });
    if (s.hday !== 'all' && days.indexOf(s.hday) < 0) s.hday = 'all';

    const row = h('div.row', { style: { gap: '6px', flexWrap: 'wrap', alignItems: 'center', margin: '6px 0' } },
      h('span.muted', { style: { fontSize: '12px', fontWeight: '700' }, text: t(S('見る日', 'Day', 'Hari')) }));
    const mk = function (val, label) {
      const b = h('button.chip' + (s.hday === val ? '.tone-navy' : ''), { type: 'button', text: label });
      b.style.cssText = 'cursor:pointer;border:1px solid var(--border)';
      b.addEventListener('click', function () { s.hday = val; save(); route(); });
      row.appendChild(b);
    };
    mk('all', t(S('全部ならす', 'All days', 'Semua hari')));
    days.slice(-10).forEach(function (dn) {
      const w = Math.ceil(dn / DPW);
      mk(dn, w + '-' + (dn - (w - 1) * DPW));
    });
    v.appendChild(row);

    const pick = s.hday === 'all' ? rows : rows.filter(function (x) { return x.dn === s.hday; });
    const outs = [], lost = [];
    for (let hr = 1; hr <= HOURS; hr++) {
      const g = pick.filter(function (x) { return x.hr === hr; });
      if (!g.length) { outs.push(null); lost.push(null); continue; }
      outs.push(g.reduce(function (a, x) { return a + x.out; }, 0) / g.length);
      lost.push(g.reduce(function (a, x) { return a + x.lost; }, 0) / g.length);
    }
    const have = outs.filter(function (x) { return x != null; });
    const flat = have.length ? have.reduce(function (a, x) { return a + x; }, 0) / have.length : 0;
    v.appendChild(svgBox(S('時間ごとの出来高', 'Output by hour', 'Output per jam'),
      C.lines({ w: 680, h: 240, x0: 1, x1: HOURS, y0: 0,
        y1: Math.max.apply(null, have.concat([flat])) * 1.2 || 10, yd: 0,
        xTicks: [1, 2, 3, 4, 5, 6, 7, 8], xFmt: function (q) { return HOUR_LABEL[q - 1] + t(S('時', 'h', ':00')); },
        xLabel: t(S('時刻', 'time of day', 'waktu')),
        rules: [{ at: flat, color: 'var(--green)', label: t(S('1日をならすと', 'day average', 'rata-rata hari')) }],
        series: [{ name: 'out', color: 'var(--navy)', width: 2.6,
          points: outs.map(function (o, i) { return o == null ? null : [i + 1, o]; }).filter(Boolean) }] }),
      S('紺が時間ごとの出来高、緑が1日をならした線。**凹んでいる時間に、段取りか立上げが入っています。**'
        + '1日の合計は同じでも、止まっている場所は時間で見ないと分かりません。'
        + '日や週の平均は、山も谷も平らにしてしまいます。',
        'Navy is the output of each hour, green the day flattened into one number. **Where it dips, a changeover or a warm-up sits.** '
        + 'The daily total is the same either way, but you cannot see where the line stops unless you look by hour. '
        + 'A daily or weekly mean flattens both the peaks and the troughs.',
        'Biru tua adalah output tiap jam, hijau adalah hari yang diratakan menjadi satu angka. **Di titik yang turun, ada pergantian atau pemanasan.** '
        + 'Total hariannya sama, tetapi Anda tidak dapat melihat di mana lini berhenti kecuali melihat per jam. '
        + 'Rata-rata harian atau mingguan meratakan puncak maupun lembahnya.')));

    const tb = h('tbody');
    tb.appendChild(h('tr', null, h('th', { text: t(S('時刻', 'Hour', 'Jam')) }),
      h('th', { text: t(S('出来高', 'Output', 'Output')) }),
      h('th', { text: t(S('止まった時間', 'Minutes stopped', 'Menit berhenti')) }),
      h('th', { text: t(S('流せた時間', 'Minutes running', 'Menit berjalan')) })));
    for (let hr = 1; hr <= HOURS; hr++) {
      tb.appendChild(h('tr', null,
        h('td', { text: HOUR_LABEL[hr - 1] + t(S('時', ':00', ':00')) }),
        h('td', { text: outs[hr - 1] == null ? '—' : Math.round(outs[hr - 1]) + t(S('個', '', '')) }),
        h('td', { text: lost[hr - 1] == null ? '—' : n1(lost[hr - 1]) + t(S('分', ' min', ' menit')) }),
        h('td', { text: lost[hr - 1] == null ? '—' : n1(Math.max(0, 60 - lost[hr - 1])) + t(S('分', ' min', ' menit')) })));
    }
    v.appendChild(h('div.table-wrap', null, h('table.tbl', null, tb)));
  }

  const PANES = { trend: paneTrend, hourly: paneHourly, yama: paneYama, time: paneTime, setup: paneSetup, value: paneValue, lt: paneLt, trial: paneTrial, boxes: paneBoxes };

  Object.assign(P, { analyze: analyze });
})();
