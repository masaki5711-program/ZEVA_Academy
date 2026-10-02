/* 現場再建記 — 木工ライン丁（生産性）：結論と結果
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
  const DPW = WS.DPW, HOURS = WS.HOURS, DAYS = WS.DAYS;
  const DEMAND = P.DEMAND;
  const analyze = P.analyze;
  const define = P.define;
  const init = P.init;
  const prologue = P.prologue;
  const shop = P.shop;
  const stdwork = P.stdwork;
  const tune = P.tune;

  const BASE = P.BASE;
  const BEST = P.BEST;
  const CONTROLS = P.CONTROLS;
  const PICK_N = P.PICK_N;
  const board = P.board;
  const cycles = P.cycles;
  const day = P.day;
  const hud = P.hud;
  const outChart = P.outChart;
  const stdLevel = P.stdLevel;
  /* ---- 結論 ---- */
  const SUSPECTS = [
    ['neck', S('工程3そのものが遅い', 'Process 3 is genuinely slow', 'Proses 3 memang lambat')],
    ['setup', S('段取りに時間を取られている', 'The changeover is eating the time', 'Pergantian memakan waktunya')],
    ['warm', S('立上げの予熱で時間を落としている', 'The warm-up is losing the time', 'Pemanasan yang menghilangkan waktu')],
    ['people', S('人が足りない', 'There are not enough people', 'Orangnya kurang')],
    ['machine', S('機械が古い', 'The machines are old', 'Mesinnya tua')]
  ];
  function conclude() {
    const s = st();
    const v = h('div');
    v.appendChild(h('h2', { text: t(S('結論', 'Your conclusion', 'Kesimpulan Anda')) }));
    v.appendChild(talk('boss', S('で、**何が日産を決めていた。**そして、それをどう固める。',
      'So, **what was setting the output?** And how will you hold it?',
      'Jadi, **apa yang menentukan output?** Dan bagaimana Anda mempertahankannya?')));
    // 結論の前に、自分の手帳を見返す
    const hyps = WS.notesOf('hyp');
    if (hyps.length) {
      const ul = h('ul');
      hyps.forEach(function (hp, i) {
        const cks = WS.notesOf('check').filter(function (c) { return c.hypIdx === i; });
        const last = cks.length ? cks[cks.length - 1] : null;
        const vd = last ? (WS.G.VERDICTS.filter(function (x) { return x[0] === last.verdict; })[0] || null) : null;
        ul.appendChild(h('li', null,
          h('b', { text: '#' + (i + 1) + ' ' + (hp.suspect ? WS.G.suspectName(hp.suspect) + ' · ' : '') }),
          h('span', { text: String(hp.text) + ' · ' }),
          h('span.chip' + (vd ? (vd[0] === 'yes' ? '.tone-green' : vd[0] === 'no' ? '.tone-red' : '') : ''),
            { text: vd ? t(vd[1]) : t(S('確かめていない', 'never checked', 'belum diperiksa')) })));
      });
      v.appendChild(h('h3', { text: t(S('手帳の仮説', 'Your hypotheses', 'Hipotesis Anda')) }));
      v.appendChild(h('div.g-note', null, ul));
    } else {
      v.appendChild(note([S('**手帳に仮説がありません。**書いていないネックを選んでも、当たりは偶然と区別できず、見立ての点は10点止まりです。',
        '**There is no hypothesis in the notebook.** Naming a bottleneck you never wrote down cannot be told from luck, and the reading scores at most ten.',
        '**Tidak ada hipotesis di buku catatan.** Menyebut bottleneck yang tidak pernah Anda tulis tidak dapat dibedakan dari kebetulan, dan nilai pembacaan bottleneck paling banyak sepuluh poin.')]));
    }
    const nbBtn = btn(S('手帳に書く', 'Write in the notebook', 'Tulis di buku catatan'), function () {
      s.noteFrom = 'conclude'; s.screen = 'notebook'; save(); route();
    }, 'btn-ghost');
    nbBtn.style.marginBottom = '12px';
    v.appendChild(nbBtn);
    v.appendChild(h('h3', { text: t(S('日産を決めていたのは何か', 'What was setting the output?', 'Apa yang menentukan output?')) }));
    const pick = h('div.g-acts');
    SUSPECTS.forEach(function (o) {
      const b = h('button.g-act', { type: 'button' }, h('b', { text: t(o[1]) }));
      if (s.suspect === o[0]) b.style.borderColor = 'var(--navy)';
      b.addEventListener('click', function () { s.suspect = o[0]; save(); route(); });
      pick.appendChild(b);
    });
    v.appendChild(pick);
    v.appendChild(h('h3', { style: { marginTop: '18px' }, text: t(S('日常点検に載せる3件', 'The three items for the daily check sheet', 'Tiga butir untuk lembar periksa harian')) }));
    const n = Object.keys(s.controls).filter(function (k) { return s.controls[k]; }).length;
    const list = h('div.g-acts');
    CONTROLS.forEach(function (o) {
      const on = !!s.controls[o.id];
      const b = h('button.g-act', { type: 'button', disabled: !on && n >= PICK_N }, h('b', { text: (on ? '☑ ' : '☐ ') + t(o.label) }));
      if (on) b.style.borderColor = 'var(--navy)';
      if (on || n < PICK_N) b.addEventListener('click', function () { s.controls[o.id] = !on; save(); route(); });
      list.appendChild(b);
    });
    v.appendChild(list);
    v.appendChild(h('div.muted', { style: { fontSize: '13px', margin: '6px 0 14px' },
      text: t(S('選んだ数：', 'Selected: ', 'Dipilih: ')) + n + ' / ' + PICK_N }));
    v.appendChild(btn(S('報告する', 'Report', 'Laporkan'), function () {
      if (!s.suspect || n !== PICK_N) return;
      s.screen = 'result'; save(); route();
    }, (s.suspect && n === PICK_N) ? 'btn-primary' : 'btn-ghost'));
    if (s.day < DAYS) {
      const back = btn(S('盤面へ戻る', 'Back to the floor', 'Kembali ke papan permainan'), function () { s.screen = 'board'; save(); route(); }, 'btn-ghost');
      back.style.marginLeft = '8px';
      v.appendChild(back);
    }
    show(v);
  }

  /* ---- 結果 ---- */
  function result() {
    const s = st();
    const sc = scen();
    const v = h('div');
    // 改善前は、標準作業が初期状態のときの日産。盤面で最初に見える数と同じにする。
    const before = day(BASE, P.stdLevel0()).out;
    const best = day(BEST, 1).out;
    const mine = s.hist.length >= 4
      ? s.hist.slice(-4).reduce(function (a, x) { return a + x.shown; }, 0) / 4
      : (s.hist.length ? s.hist[s.hist.length - 1].shown : before);
    const d = day(s.cfg, stdLevel());
    const gain = mine - before;
    const reach = Math.max(0, Math.min(1, gain / (best - before)));
    const ltGain = Math.max(0, Math.min(1, (day(BASE, 1).lt - d.lt) / (day(BASE, 1).lt - day(BEST, 1).lt)));
    const good = CONTROLS.filter(function (x) { return s.controls[x.id] && x.ok; }).length;
    const bk = WS.G.bookScore();
    /* 期中の作り込み。日産の増加は「最後にどのやり方に居たか」しか見ないので、
     * 10日目に段取りを外へ出した班と70日目の班が同じ点になってしまう。
     * そこで、16週のあいだに実際に余計に作れた数も数える。
     * 早く辿り着くほど、その日数ぶんが積み上がる。 */
    const madeP = (s.days || []).reduce(function (a, x) { return a + Math.max(0, x.out - before); }, 0);
    // 上限は30日目に最良のやり方へ着いた場合(品質ラインと同じ置き方)
    const madeMaxP = (best - before) * (DAYS - 30 + 1);
    const reachMade = Math.max(0, Math.min(1, madeP / Math.max(1, madeMaxP)));
    const parts = [
      [S('日産の増加', 'Output gained', 'Output bertambah'), Math.round(reach * 16)],
      [S('期中の作り込み（辿り着いた速さ）', 'Built in during the run (how fast you got there)', 'Perolehan selama periode (secepat apa Anda sampai)'), Math.round(reachMade * 10)],
      [S('需要を満たしたか', 'Did you meet demand', 'Apakah memenuhi permintaan'), mine >= DEMAND ? 12 : 0],
      [S('リードタイムの短縮', 'Lead time cut', 'Lead time dipangkas'), Math.round(ltGain * 12)],
      // 当たっていても、段取りを疑う仮説を書いていなければ10点止まり
      [S('ネックの見立て', 'Your reading of the bottleneck', 'Pembacaan bottleneck Anda'), s.suspect === 'setup' ? (WS.G.hypNaming('setup') ? 15 : 10) : 0],
      [S('維持のしくみ', 'What holds the gain', 'Mekanisme mempertahankan hasil'), Math.round(good / PICK_N * 12)],
      [S('手帳：仮説を立てて確かめたか', 'Notebook: hypotheses written and checked', 'Buku catatan: hipotesis ditulis dan diperiksa'), Math.round(bk.before * 5 + bk.checked * 5)],
      [S('標準作業をそろえたか', 'Did you get the standard work in place', 'Apakah kerja standar tersusun'),
        Math.round(stdLevel() * 8 * (s.stdFrom == null || s.stdFrom <= 6 ? 1 : 0.6))],
      [S('目標の置き方', 'How you set the target', 'Cara menetapkan sasaran'), s.target ? s.target.pts : 0]
    ];
    const total = parts.reduce(function (a, x) { return a + x[1]; }, 0);
    const rank = total >= 90 ? 'S' : total >= 75 ? 'A' : total >= 55 ? 'B' : 'C';

    if (!s.recorded) {
      const dt = new Date();
      const run = { team: s.team || '', sc: sc.code, score: total, rate: mine, cost: Math.round(d.lt * 10),
        date: '' + dt.getFullYear() + String(dt.getMonth() + 1).padStart(2, '0') + String(dt.getDate()).padStart(2, '0') };
      s.code = WS.makeCode(run);
      WS.boardAdd(run);
      s.recorded = true;
      save();
    }

    v.appendChild(h('div', { style: { textAlign: 'center', padding: '10px 0 4px' } },
      h('div.muted', { style: { fontSize: '13px' }, text: (s.team ? s.team + sep() : '') + t(sc.name) }),
      h('div.g-rank.' + rank.toLowerCase(), { text: rank }),
      h('div', { style: { fontWeight: '800', fontSize: '20px' }, text: total + ' / 100' })));
    v.appendChild(h('div.g-hud', null,
      meter(S('期中の作り込み', 'Built in during the run', 'Perolehan selama periode'),
        Math.round(madeP).toLocaleString() + t(S('個', ' pcs', ' pcs')),
        S('16週で改善前より余計に作れた数。上限は30日目に最良のやり方へ着いた場合の ' + Math.round(madeMaxP).toLocaleString() + '個',
          'pieces made over and above the starting rate across sixteen weeks; the ceiling, reaching the best way by day 30, is ' + Math.round(madeMaxP).toLocaleString(),
          'pcs yang dibuat melebihi laju awal selama enam belas minggu; plafonnya ' + Math.round(madeMaxP).toLocaleString() + ' pcs bila cara terbaik dicapai pada hari ke-30'),
        madeP > madeMaxP * 0.6 ? 'good' : madeP > 0 ? 'warn' : 'bad'),
      meter(S('改善前', 'Before', 'Sebelum'), before + t(S('個/日', ' pcs/day', ' pcs/hari'))),
      meter(S('あなたの最後の4週', 'Your last four weeks', 'Empat minggu terakhir Anda'), Math.round(mine) + t(S('個/日', ' pcs/day', ' pcs/hari')), null,
        mine >= DEMAND ? 'good' : 'bad'),
      meter(S('届きうる最良', 'Best reachable', 'Terbaik yang dapat dicapai'), best + t(S('個/日', ' pcs/day', ' pcs/hari'))),
      meter(S('リードタイム', 'Lead time', 'Lead time'), n1(d.lt) + t(S('日', ' days', ' hari')),
        S('始めは ' + n1(day(BASE, 1).lt) + '日', 'from ' + n1(day(BASE, 1).lt) + ' days', 'dari ' + n1(day(BASE, 1).lt) + ' hari'))));
    v.appendChild(outChart());
    v.appendChild(h('h3', { text: t(S('採点の内訳', 'How the score breaks down', 'Rincian skor')) }));
    const tb = h('tbody');
    parts.forEach(function (p) { tb.appendChild(h('tr', null, h('th', { text: t(p[0]) }), h('td', { text: p[1] + t(S(' 点', ' pts', ' poin')) }))); });
    v.appendChild(h('div.table-wrap', null, h('table.tbl', null, tb)));

    // 手帳。点数ではなく「辿った道」を講評で比べるための材料。
    v.appendChild(h('h3', { style: { marginTop: '18px' }, text: t(S('手帳：辿った道', 'Notebook: the path you took', 'Buku catatan: jalan yang Anda tempuh')) }));
    const hyps = WS.notesOf('hyp');
    if (!hyps.length) {
      v.appendChild(note([S('**仮説を1つも書いていません。**当たっていても、書いていない当たりは偶然と区別できません。見立ての点は10点止まり、手帳の点は0です。',
        '**You wrote no hypothesis at all.** A right answer with nothing written cannot be told from luck. The reading scores at most ten, the notebook zero.',
        '**Anda tidak menulis satu pun hipotesis.** Jawaban benar tanpa catatan tidak dapat dibedakan dari kebetulan. Nilai pembacaan bottleneck paling banyak sepuluh poin, nilai buku catatan nol.')]));
    } else {
      const ul = h('ul');
      hyps.forEach(function (hp, i) {
        const cks = WS.notesOf('check').filter(function (c) { return c.hypIdx === i; });
        const last = cks.length ? cks[cks.length - 1] : null;
        const vd = last ? (WS.G.VERDICTS.filter(function (x) { return x[0] === last.verdict; })[0] || null) : null;
        ul.appendChild(h('li', null,
          h('b', { text: '#' + (i + 1) + ' ' + (hp.suspect ? WS.G.suspectName(hp.suspect) + ' · ' : '') }),
          h('span', { text: WS.G.dayLabel(hp.dn) + ' · ' + String(hp.text) + ' · ' }),
          h('span.chip' + (vd ? (vd[0] === 'yes' ? '.tone-green' : vd[0] === 'no' ? '.tone-red' : '') : ''),
            { text: vd ? t(vd[1]) : t(S('確かめていない', 'never checked', 'belum diperiksa')) })));
      });
      v.appendChild(h('div.g-note', null, ul));
      v.appendChild(note([S('仮説を書いてから始めた調査 ' + Math.round(bk.before * 100) + '%、確かめた仮説 ' + Math.round(bk.checked * 100) + '%。**手帳の点はこの2つで決まります。**',
        'Surveys begun with a hypothesis written first: ' + Math.round(bk.before * 100) + '%. Hypotheses checked: ' + Math.round(bk.checked * 100) + '%. **These two decide the notebook score.**',
        'Survei yang dimulai dengan hipotesis tertulis: ' + Math.round(bk.before * 100) + '%. Hipotesis yang diperiksa: ' + Math.round(bk.checked * 100) + '%. **Kedua angka ini menentukan skor buku catatan.**')]));
    }
    const copyNb = btn(S('手帳をコピーする（講評用）', 'Copy the notebook (for the debrief)', 'Salin buku catatan (untuk pembahasan)'), function () {
      try { navigator.clipboard.writeText(WS.G.notesText()); copyNb.textContent = t(S('コピーしました', 'Copied', 'Tersalin')); } catch (e) { /* クリップボードが使えない環境 */ }
    }, 'btn-ghost');
    v.appendChild(copyNb);

    v.appendChild(h('h3', { style: { marginTop: '18px' }, text: t(S('結果コード', 'Result code', 'Kode hasil')) }));
    v.appendChild(h('div', { style: { fontFamily: 'ui-monospace,monospace', fontSize: '13px', wordBreak: 'break-all', background: 'var(--surface-2)', padding: '10px 12px', borderRadius: '10px' }, text: s.code }));

    v.appendChild(h('h3', { style: { marginTop: '20px' }, text: t(S('答え合わせ：このラインの下にあったもの', 'The reveal: what was under this line', 'Kunci jawaban: apa yang ada di bawah lini ini')) }));
    v.appendChild(talk('eng', sc.reveal));
    v.appendChild(note([
      S('手を1つずつ打ったときの日産：現状 ' + before + '個、段取りの内外分離だけ ' + day(Object.assign({}, BASE, { setup: 0.8 }), 1).out
        + '個、予熱のタイマー化だけ ' + day(Object.assign({}, BASE, { warm: 1 }), 1).out + '個、工程3の分割だけ '
        + day(Object.assign({}, BASE, { balance: 0.6 }), 1).out + '個。**どれ1つでも需要の' + DEMAND + 'には届きません。**',
        'Output with one move at a time: as-is ' + before + ', externalising the changeover alone ' + day(Object.assign({}, BASE, { setup: 0.8 }), 1).out
        + ', the warm-up timer alone ' + day(Object.assign({}, BASE, { warm: 1 }), 1).out + ', splitting process 3 alone '
        + day(Object.assign({}, BASE, { balance: 0.6 }), 1).out + '. **No single move reaches the demand of ' + DEMAND + '.**',
        'Output dengan satu langkah pada satu waktu: apa adanya ' + before + ', mengeksternalkan pergantian saja ' + day(Object.assign({}, BASE, { setup: 0.8 }), 1).out
        + ', pengatur waktu pemanasan saja ' + day(Object.assign({}, BASE, { warm: 1 }), 1).out + ', memecah proses 3 saja '
        + day(Object.assign({}, BASE, { balance: 0.6 }), 1).out + '. **Tidak ada langkah tunggal yang mencapai permintaan ' + DEMAND + '.**'),
      S('**順番を間違えると下がります。**段取りを45分のままロットだけ150に落とすと、日産は ' + before + '個から '
        + day(Object.assign({}, BASE, { lot: 150 }), 1).out + '個へ落ちます。段取りの回数が増えた分だけ稼働時間が消えるからです。'
        + '外段取り化してからロットを落とせば ' + day(BEST, 1).out + '個で、リードタイムは ' + n1(day(BASE, 1).lt) + '日から ' + n1(day(BEST, 1).lt) + '日になります。',
        '**In the wrong order it goes down.** Cut the lot to 150 with the changeover still at 45 minutes and output falls from ' + before
        + ' to ' + day(Object.assign({}, BASE, { lot: 150 }), 1).out + ': the extra changeovers eat the running time. '
        + 'Externalise first and the same lot gives ' + day(BEST, 1).out + ' with lead time down from ' + n1(day(BASE, 1).lt) + ' to ' + n1(day(BEST, 1).lt) + ' days.',
        '**Dalam urutan yang salah, outputnya turun.** Perkecil lot menjadi 150 dengan pergantian masih 45 menit dan output jatuh dari ' + before
        + ' ke ' + day(Object.assign({}, BASE, { lot: 150 }), 1).out + ': pergantian tambahan memakan waktu operasi. '
        + 'Eksternalkan dulu dan lot yang sama memberi ' + day(BEST, 1).out + ' dengan lead time turun dari ' + n1(day(BASE, 1).lt) + ' ke ' + n1(day(BEST, 1).lt) + ' hari.'),
      S('**日産とリードタイムは同時には最大化できません。**ロット300なら日産 '
        + day(Object.assign({}, BEST, { lot: 300 }), 1).out + '個（リードタイム ' + n1(day(Object.assign({}, BEST, { lot: 300 }), 1).lt) + '日）、'
        + 'ロット120なら日産 ' + day(Object.assign({}, BEST, { lot: 120 }), 1).out + '個（リードタイム ' + n1(day(Object.assign({}, BEST, { lot: 120 }), 1).lt) + '日）。'
        + '**どちらを取るかは、受注の形で決まります。**まとまった注文が続くなら大きく、短納期の注文が多いなら小さくします。',
        '**Output and lead time cannot both be maximised.** A lot of 300 gives ' + day(Object.assign({}, BEST, { lot: 300 }), 1).out
        + ' pieces at ' + n1(day(Object.assign({}, BEST, { lot: 300 }), 1).lt) + ' days; a lot of 120 gives '
        + day(Object.assign({}, BEST, { lot: 120 }), 1).out + ' at ' + n1(day(Object.assign({}, BEST, { lot: 120 }), 1).lt) + ' days. '
        + '**Which you take depends on the order book:** steady bulk orders favour the large lot, short lead times favour the small one.',
        '**Output dan lead time tidak bisa dimaksimalkan bersamaan.** Lot 300 memberi ' + day(Object.assign({}, BEST, { lot: 300 }), 1).out
        + ' pcs pada ' + n1(day(Object.assign({}, BEST, { lot: 300 }), 1).lt) + ' hari; lot 120 memberi '
        + day(Object.assign({}, BEST, { lot: 120 }), 1).out + ' pada ' + n1(day(Object.assign({}, BEST, { lot: 120 }), 1).lt) + ' hari. '
        + '**Mana yang diambil bergantung pada pola pesanan:** pesanan besar yang rutin cocok dengan lot besar, pesanan bertenggat pendek cocok dengan lot kecil.'),
      S('**小さくしすぎても落ちます。**ロット120では ' + day(Object.assign({}, BEST, { lot: 120 }), 1).out + '個、100では '
        + day(Object.assign({}, BEST, { lot: 100 }), 1).out + '個で、また需要を割ります。ロットサイズにも、効かなくなる点があります。',
        '**Too small and it falls again.** A lot of 120 gives ' + day(Object.assign({}, BEST, { lot: 120 }), 1).out + ' and 100 gives '
        + day(Object.assign({}, BEST, { lot: 100 }), 1).out + ', back under demand. The lot size has an edge past which it stops paying too.',
        '**Terlalu kecil dan turun lagi.** Lot 120 memberi ' + day(Object.assign({}, BEST, { lot: 120 }), 1).out + ' dan 100 memberi '
        + day(Object.assign({}, BEST, { lot: 100 }), 1).out + ', kembali di bawah permintaan. Ukuran lot pun punya batas; di bawah batas itu tidak lagi menguntungkan.'),
      (stdLevel() >= 1
        ? S('**標準作業が土台でした。**手順を1つに決めると、いちばん遅いやり方が混ざらなくなり、各工程のサイクルタイムが締まります。'
          + 'ネックが動かなくなってはじめて、どこを削るかを決められます。',
          '**The standard work was the floor under all of it.** Settle the steps and the slowest way stops creeping in, so every process time tightens. '
          + 'Only once the bottleneck stays put can you decide what to cut.',
          '**Kerja standar adalah fondasi dari semuanya.** Tetapkan langkahnya dan cara kerja yang paling lambat tidak lagi ikut tercampur, sehingga setiap waktu proses mengetat. '
          + 'Baru setelah bottleneck tetap di tempatnya, Anda dapat memutuskan apa yang dipangkas.')
        : S('**標準作業は ' + Math.round(stdLevel() * 5) + ' / 5 工程で終わりました。**手順が人によって違うぶん、観測したサイクルタイムには'
          + 'いちばん遅いやり方が混ざり、ネックタイムは実力より約6%長く出ます。日ごとの揺れも倍です。'
          + '**同じ手を打っても、標準作業をつくってからのほうが効きます。**',
          '**Standard work stopped at ' + Math.round(stdLevel() * 5) + ' / 5 processes.** With the steps differing by person, the slowest way stayed mixed into the times you measured: '
          + 'the bottleneck reads about six per cent longer than the line can actually do, and the day-to-day swing is twice as wide. '
          + '**The same moves pay more once the standard work is written.**',
          '**Kerja standar berhenti di ' + Math.round(stdLevel() * 5) + ' dari 5 proses.** Dengan langkah yang berbeda menurut orang, cara kerja yang paling lambat tetap bercampur dalam waktu yang Anda ukur: '
          + 'bottleneck terbaca sekitar enam persen lebih lama dari kemampuan lini, dan fluktuasi harian dua kali lebih lebar. '
          + '**Langkah yang sama memberi hasil lebih besar setelah kerja standar disusun.**')),
      S('**工程3の56秒のうち、価値作業は30秒でした。**準価値が12秒、残る14秒は前工程からの材料待ち、つまり無価値作業です。'
        + '他の工程の無価値は6秒前後なので、工程3だけが突出していました。**「遅い」のではなく「待っている」**というのは、この形のことです。'
        + '材料の供給方法を変えて待ちを断つと、ネックは ' + n1(cycles(BEST)[2]) + '秒まで落ちます。',
        '**Of the 56 seconds at process 3, thirty were value work.** Twelve were semi-value, and the remaining fourteen were waiting for material from upstream — non-value work. '
        + 'The other processes sat around six seconds of non-value, so process 3 stood alone. **Not slow, waiting** is what that shape means. '
        + 'Change how it is fed and the bottleneck falls to ' + n1(cycles(BEST)[2]) + ' seconds.',
        '**Dari 56 detik di proses 3, tiga puluh adalah pekerjaan bernilai.** Dua belas semi-bernilai, dan empat belas sisanya menunggu material dari hulu — pekerjaan tanpa nilai. '
        + 'Proses lain sekitar enam detik tanpa nilai, jadi hanya proses 3 yang menonjol. **Bukan lambat, melainkan menunggu** itulah arti bentuk tersebut. '
        + 'Ubah cara pasokannya dan bottleneck turun ke ' + n1(cycles(BEST)[2]) + ' detik.'),
      S('**人を足しても日産は増えません。**工程3が遅かったのではなく、工程3が待っていたのです。'
        + '作業者ごとのサイクルタイム差は、担当していた工程の違いがそのまま出ていただけでした。',
        '**Another person would not have raised the output.** Process 3 was not slow; process 3 was waiting. '
        + 'The differences between operators were the differences between the processes they happened to be standing at.',
        '**Menambah orang tidak akan menaikkan output.** Proses 3 tidak lambat; proses 3 sedang menunggu. '
        + 'Perbedaan antar operator hanyalah perbedaan antar proses tempat mereka kebetulan berdiri.')
    ]));
    const bad = CONTROLS.filter(function (x) { return s.controls[x.id] && !x.ok; });
    if (bad.length) {
      v.appendChild(talk('eng', S('日常点検に載せた「' + bad.map(function (x) { return x.label.ja; }).join('」「') + '」は、条件を押さえていません。呼びかけと残業は、やり方ではなくその場しのぎです。',
        'The items you put on the check sheet, ' + bad.map(function (x) { return x.label.en; }).join('; ') + ', hold no condition. Exhortation and overtime are not a way of working.',
        'Butir yang Anda masukkan ke lembar periksa harian, ' + bad.map(function (x) { return x.label.id; }).join('; ') + ', tidak mengunci kondisi apa pun. Seruan dan lembur bukanlah cara kerja.')));
    }
    const again = btn(S('別のラインをやる', 'Take another line', 'Ambil lini lain'), function () { WS.setState(null); route(); }, 'btn-primary');
    again.style.marginTop = '16px';
    v.appendChild(again);
    show(v);
  }

  // 手帳の仮説で「何を疑うか」を選ぶために、原因の候補を渡す
  Object.assign(P, { conclude: conclude, result: result, SUSPECTS: SUSPECTS });
  // core の route はここを見る
  window.WOODSHOP_PROD = {
    init: P.init, prologue: P.prologue, define: P.define, board: P.board, shop: P.shop,
    stdwork: P.stdwork, tune: P.tune, analyze: P.analyze, conclude: P.conclude, result: P.result
  };
})();
