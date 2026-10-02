/* 現場再建記 — 結論と結果、そして答え合わせ
 * 土台は core.js（WS）。ここで定義したものは WS.G に載せ、後ろのファイルから使う。
 */
(function () {
  'use strict';
  const WS = window.WS, G = WS.G;
  const ZA = WS.ZA, h = WS.h, t = WS.t, S = WS.S, md = WS.md, fmt = WS.fmt;
  const n1 = WS.n1, sep = WS.sep, wkUnit = WS.wkUnit, yen = WS.yen;
  const WEEKS = WS.WEEKS, PT0 = WS.PT0, LOTS = WS.LOTS, PIECES = WS.PIECES;
  const DPW = WS.DPW, HOURS = WS.HOURS, DAYS = WS.DAYS;
  const mulberry32 = WS.mulberry32, randn = WS.randn, binom = WS.binom, season = WS.season;
  const save = WS.save, route = WS.route, show = WS.show, scen = WS.scen, has = WS.has;
  const talk = WS.talk, meter = WS.meter, btn = WS.btn, act = WS.act, note = WS.note;
  const svgBox = WS.svgBox, switcher = WS.switcher, paramPanel = WS.paramPanel, weekStrip = WS.weekStrip;
  const C = window.WOODSHOP_CHARTS;
  const SUSPECTS = WS.G.SUSPECTS;
  const st = WS.state;
  const makeCode = WS.makeCode, boardAdd = WS.boardAdd;
  const BASE = G.BASE;
  const BEST = G.BEST;
  const CONTROLS = G.CONTROLS;
  const PICK_N = G.PICK_N;
  const chart = G.chart;
  const costOf = G.costOf;
  const hud = G.hud;
  const last4 = G.last4;
  const lossMan = G.lossMan;
  const man = G.man;
  const manSpan = G.manSpan;
  const rateOf1 = G.rateOf1;
  const rateOfLots = G.rateOfLots;
  const reference = G.reference;
  const scopeOf = G.scopeOf;
  const simRows = G.simRows;
  const stdLevel = G.stdLevel;
  const withBase = G.withBase;
  const SCORE = G.SCORE;
  const W = G.SCORE_W;
  const madeOf = G.madeOf;
  const madeCap = G.madeCap;
  const myDaily = G.myDaily;
  const KNOBS = G.KNOBS;
  const vt = G.vt;
  // つまみの呼び名は工程で変わるので、名前で引く
  const kn = function (k) { const o = KNOBS().filter(function (x) { return x.k === k; })[0]; return o ? t(o.label) : k; };
  // つまみの呼び名に、値と単位を添える。単位はつまみが持っている。
  const knv = function (k, v) {
    const o = KNOBS().filter(function (x) { return x.k === k; })[0];
    if (!o) return k + v;
    const u = typeof o.unit === 'string' ? o.unit : t(o.unit || '');
    // 番手だけは #150 のように数字の前に付ける
    return t(o.label) + (u === '#' ? u + v : v + u);
  };
  /* ---- 結論 ---- */
  function screenConclude() {
    const v = h('div');
    v.appendChild(h('h2', { text: t(S('結論', 'Your conclusion', 'Kesimpulan Anda')) }));
    v.appendChild(talk('boss', S('で、**原因は何だった。**そして、それをどう固める。',
      'So, **what was the cause?** And how will you hold it?',
      'Jadi, **apa penyebabnya?** Dan bagaimana Anda mempertahankannya?')));
    // 結論の前に、自分の手帳を見返す。仮説と、それをどう確かめたか。
    const hyps = WS.notesOf('hyp');
    if (hyps.length) {
      const ul = h('ul');
      hyps.forEach(function (hp, i) {
        const cks = WS.notesOf('check').filter(function (c) { return c.hypIdx === i; });
        const last = cks.length ? cks[cks.length - 1] : null;
        const vd = last ? (G.VERDICTS.filter(function (x) { return x[0] === last.verdict; })[0] || null) : null;
        ul.appendChild(h('li', null,
          h('b', { text: '#' + (i + 1) + ' ' + (hp.suspect ? G.suspectName(hp.suspect) + ' · ' : '') }),
          h('span', { text: String(hp.text) + ' · ' }),
          h('span.chip' + (vd ? (vd[0] === 'yes' ? '.tone-green' : vd[0] === 'no' ? '.tone-red' : '') : ''),
            { text: vd ? t(vd[1]) : t(S('確かめていない', 'never checked', 'belum diperiksa')) })));
      });
      v.appendChild(h('h3', { text: t(S('手帳の仮説', 'Your hypotheses', 'Hipotesis Anda')) }));
      v.appendChild(h('div.g-note', null, ul));
    } else {
      v.appendChild(note([S('**手帳に仮説がありません。**書いていない原因を選んでも、当たりは偶然と区別できず、原因の点は10点止まりです。盤面に戻って書くこともできます。',
        '**There is no hypothesis in the notebook.** Naming a cause you never wrote down cannot be told from luck, and the cause scores at most ten. You can go back and write one.',
        '**Tidak ada hipotesis di buku catatan.** Menyebut penyebab yang tidak pernah Anda tulis tidak dapat dibedakan dari kebetulan, dan nilai pembacaan penyebab paling banyak sepuluh poin. Anda dapat kembali dan menulisnya.')]));
    }
    const nbBtn = btn(S('手帳に書く', 'Write in the notebook', 'Tulis di buku catatan'), function () {
      st().noteFrom = 'conclude'; st().screen = 'notebook'; save(); route();
    }, 'btn-ghost');
    nbBtn.style.marginBottom = '12px';
    v.appendChild(nbBtn);
    v.appendChild(h('h3', { text: t(S('いちばん上流の原因はどれか', 'Which is the upstream cause?', 'Mana penyebab di hulu?')) }));
    const pick = h('div.g-acts');
    SUSPECTS().forEach(function (o) {
      const b = h('button.g-act', { type: 'button' }, h('b', { text: t(o[1]) }));
      if (st().suspect === o[0]) b.style.borderColor = 'var(--navy)';
      b.addEventListener('click', function () { st().suspect = o[0]; save(); route(); });
      pick.appendChild(b);
    });
    v.appendChild(pick);

    v.appendChild(h('h3', { style: { marginTop: '18px' }, text: t(S('日常点検に載せる3件', 'The three items for the daily check sheet', 'Tiga butir untuk lembar periksa harian')) }));
    v.appendChild(talk('eng', S('載せなかった条件は、来月には元に戻ります。**枠は3つだけ**です。',
      'A condition you leave off will have drifted back by next month. **There are only three slots.**',
      'Kondisi yang tidak dimasukkan akan kembali seperti semula bulan depan. **Hanya ada tiga slot.**')));
    const n = Object.keys(st().controls).filter(function (k) { return st().controls[k]; }).length;
    const list = h('div.g-acts');
    CONTROLS().forEach(function (o) {
      const on = !!st().controls[o.id];
      const b = h('button.g-act', { type: 'button', disabled: !on && n >= PICK_N }, h('b', { text: (on ? '☑ ' : '☐ ') + t(o.label) }));
      if (on) b.style.borderColor = 'var(--navy)';
      if (on || n < PICK_N) b.addEventListener('click', function () { st().controls[o.id] = !on; save(); route(); });
      list.appendChild(b);
    });
    v.appendChild(list);
    v.appendChild(h('div.muted', { style: { fontSize: '13px', margin: '6px 0 14px' },
      text: t(S('選んだ数：', 'Selected: ', 'Dipilih: ')) + n + ' / ' + PICK_N }));

    v.appendChild(btn(S('報告する', 'Report', 'Laporkan'), function () {
      if (!st().suspect || n !== PICK_N) return;
      st().screen = 'result'; save(); route();
    }, (st().suspect && n === PICK_N) ? 'btn-primary' : 'btn-ghost'));
    if (st().day < DAYS) {
      const back = btn(S('盤面へ戻る', 'Back to the floor', 'Kembali ke papan permainan'), function () { st().screen = 'board'; save(); route(); }, 'btn-ghost');
      back.style.marginLeft = '8px';
      v.appendChild(back);
    }
    show(v);
  }

  /* ---- 結果 ---- */
  function screenResult() {
    const sc = scen();
    const v = h('div');
    const baseRef = reference(BASE, sc);
    const before = last4(baseRef);
    const best = last4(reference(BEST, sc));
    const mine = st().hist.length >= 4
      ? st().hist.slice(-4).reduce(function (s2, x) { return s2 + x.rate; }, 0) / 4
      : (st().hist.length ? st().hist[st().hist.length - 1].rate : before);
    const cost = costOf(st().cfg), bestCost = costOf(BEST);
    const cut = before - mine;
    // 効果金額。対象にした不良だけを数え、追加コストを年で引く。
    const sc0 = scopeOf(), scn = scen();
    const r0 = simRows(BASE, scn), r1 = simRows(st().cfg, scn);
    const inB = sc0.ys.reduce(function (a2, y) { return a2 + rateOf1(r0, y); }, 0);
    const inA = sc0.ys.reduce(function (a2, y) { return a2 + rateOf1(r1, y); }, 0);
    const sideGain = lossMan((rateOfLots(r0) - inB)) - lossMan((rateOfLots(r1) - inA));
    const money = lossMan(inB) - lossMan(inA) - cost * 12;
    // 上限は、このラインでこのスコープの条件をいちばん金額の出る形にしたときの金額。
    // 同じ数字を全ラインに当てると、条件の効きが違うライン（乙・丙）では満点に届かない。
    // 金額と同じ道筋（simRows）で出すので、最適どおりに動かせば必ず満点になる。
    const capCfg = withBase(((scn.scopeBest || {})[sc0.id]) || {});
    const rcap = simRows(capCfg, scn);
    const inCap = sc0.ys.reduce(function (a2, y) { return a2 + rateOf1(rcap, y); }, 0);
    const cap = Math.max(1, Math.round(lossMan(inB) - lossMan(inCap) - costOf(capCfg) * 12));
    const reachMoney = Math.max(0, Math.min(1, money / cap));
    // 期中の作り込み。16週のあいだに実際に減らした損失で、早く辿り着いたぶんだけ積み上がる。
    // 効果金額（年換算）が「最後にどこに居たか」なのに対し、こちらは「いつ辿り着いたか」を見る。
    const made = madeOf(scn, sc0.ys, myDaily(sc0.ys));
    const madeMax = Math.max(1, madeCap(scn, sc0.ys, capCfg));
    const reachMade = Math.max(0, Math.min(1, made.net / madeMax));
    const reach = Math.max(0, Math.min(1, cut / (before - best)));
    const benchmark = bestCost / (before - best);
    const perPoint = cut > 0.1 ? cost / cut : Infinity;
    const ratio = cut <= 0.1 ? 0 : Math.min(1, benchmark / Math.max(perPoint, 0.01));
    const eff = ratio * ratio;
    const good = CONTROLS().filter(function (x) { return st().controls[x.id] && x.ok; }).length;
    // 手帳。仮説を書いてから調査を始めた割合と、書いた仮説を確かめた割合。
    const bk = G.bookScore();

    // 得点は「あそびかた」に出しているのと同じ配点表から引く。
    // 標準化は早いほどよい。標準化前に取ったデータは、比べられる条件で取られていない。
    const got = {
      money: reachMoney * W.money,
      made: reachMade * W.made,
      // 当たっていても、その原因を疑う仮説を書いていなければ満点にしない。書いていない当たりは偶然と区別できない。
      cause: st().suspect === sc.answer ? (G.hypNaming(sc.answer) ? W.cause : Math.round(W.cause * 2 / 3)) : 0,
      control: good / PICK_N * W.control,
      eff: eff * W.eff,
      book: bk.before * W.book / 2 + bk.checked * W.book / 2,
      msa: has('msa') ? W.msa : 0,
      std: stdLevel() * W.std * (st().stdFrom == null || st().stdFrom <= 6 ? 1 : 0.6),
      target: st().target ? st().target.pts : 0
    };
    const parts = SCORE.map(function (x) { return [x[2], Math.round(got[x[0]] || 0)]; });
    const total = parts.reduce(function (s2, x) { return s2 + x[1]; }, 0);
    const rank = total >= 90 ? 'S' : total >= 75 ? 'A' : total >= 55 ? 'B' : 'C';

    // 成績表に記録し、結果コードを作る
    if (!st().recorded) {
      const d = new Date();
      const run = {
        team: st().team || '', sc: sc.code, score: total, rate: mine, cost: Math.round(money),
        date: '' + d.getFullYear() + String(d.getMonth() + 1).padStart(2, '0') + String(d.getDate()).padStart(2, '0')
      };
      st().code = makeCode(run);
      boardAdd(run);
      st().recorded = true;
      save();
    }

    v.appendChild(h('div', { style: { textAlign: 'center', padding: '10px 0 4px' } },
      h('div.muted', { style: { fontSize: '13px' }, text: (st().team ? st().team + sep() : '') + t(sc.name) }),
      h('div.g-rank.' + rank.toLowerCase(), { text: rank }),
      h('div', { style: { fontWeight: '800', fontSize: '20px' }, text: total + ' / 100' })));

    v.appendChild(h('div.g-hud', null,
      meter(S('効果金額（答え合わせの試算）', 'Benefit (post-hoc estimate)', 'Manfaat tahunan (taksiran kunci jawaban)'), t(man(money)),
        S('いまの条件を1年続けたときの試算。上限は ' + cap.toLocaleString() + '万円/年',
          'what the current settings would be worth over a year; the ceiling is ¥' + (cap * 10000).toLocaleString('en-US') + '/yr',
          'taksiran bila setelan sekarang dipertahankan setahun; plafonnya ¥' + (cap * 10000).toLocaleString('id-ID') + '/thn'),
        money > cap * 0.7 ? 'good' : money > 0 ? 'warn' : 'bad'),
      meter(S('期中の作り込み', 'Built in during the run', 'Perolehan selama periode'), t(manSpan(made.net)),
        S('16週で実際に減らした損失。上限は30日目に最適条件へ着いた場合の ' + Math.round(madeMax).toLocaleString() + '万円',
          'the loss actually avoided over the sixteen weeks; the ceiling, reaching the best settings by day 30, is ¥' + (Math.round(madeMax) * 10000).toLocaleString('en-US'),
          'kerugian yang benar-benar dihindari selama enam belas minggu; plafonnya, bila setelan terbaik dicapai pada hari ke-30, ¥' + (Math.round(madeMax) * 10000).toLocaleString('id-ID')),
        made.net > madeMax * 0.6 ? 'good' : made.net > 0 ? 'warn' : 'bad'),
      sideGain > 1 ? meter(S('副次効果（成果に入らない）', 'Side benefit (not counted)', 'Manfaat sampingan (tidak dihitung)'), t(man(sideGain))) : null,
      meter(S('スコープ', 'Scope', 'Lingkup'), t(sc0.name),
        S('対象の不良 ' + n1(inB) + '% → ' + n1(inA) + '%', 'scoped ' + n1(inB) + '% → ' + n1(inA) + '%', 'dalam lingkup ' + n1(inB) + '% → ' + n1(inA) + '%')),
      meter(S('改善前', 'Before', 'Sebelum'), n1(before) + '%', S('全体。条件を変えなかった場合の最後の4週', 'all defects, last four weeks if nothing had changed', 'semua cacat, empat minggu terakhir bila tak ada yang berubah')),
      meter(S('あなたの最後の4週', 'Your last four weeks', 'Empat minggu terakhir Anda'), n1(mine) + '%', null,
        mine < before * 0.4 ? 'good' : mine < before * 0.7 ? 'warn' : 'bad'),
      meter(S('届きうる最良', 'Best reachable', 'Terbaik yang dapat dicapai'), n1(best) + '%', S('追加コスト ' + t(yen(bestCost)), 'at ' + t(yen(bestCost)), 'dengan ' + t(yen(bestCost)))),
      meter(S('あなたのコスト', 'Your cost', 'Biaya Anda'), t(yen(cost)))));
    v.appendChild(chart());

    v.appendChild(h('h3', { text: t(S('採点の内訳', 'How the score breaks down', 'Rincian skor')) }));
    const tb = h('tbody');
    parts.forEach(function (p) {
      tb.appendChild(h('tr', null, h('th', { text: t(p[0]) }), h('td', { text: p[1] + t(S(' 点', ' pts', ' poin')) })));
    });
    v.appendChild(h('div.table-wrap', null, h('table.tbl', null, tb)));
    v.appendChild(note([
      S('**効果金額（年換算）は答え合わせの試算です。**最後に居た条件を1年続けたらいくらか、を隠れモデルで計算しています。'
        + '条件画面の「効果金額（実績から）」は自分が流したロットだけから出す値なので、流した日数が少ないと2つは合いません。',
        '**The annualised benefit is a post-hoc estimate.** It is what the settings you ended on would be worth over a year, computed from the hidden model. '
        + 'The settings screen’s “benefit (from the record)” uses only the lots you actually ran, so with few days run the two will not agree.',
        '**Manfaat tahunan adalah taksiran kunci jawaban.** Nilai setelan terakhir Anda bila dipertahankan setahun, dihitung dari model tersembunyi. '
        + '“Manfaat (dari realisasi)” di layar setelan hanya memakai lot yang benar-benar Anda jalankan, jadi bila hari yang dijalankan masih sedikit, keduanya tidak akan sama.'),
      S('**金額を2つに分けて数えています。**'
        + '「効果金額（年換算）」は、いまの条件をこのまま1年続けたときの効果で、**最後にどの条件に居るか**だけで決まります。'
        + '「期中の作り込み」は、この16週のあいだに実際に減らした損失で、**いつそこへ辿り着いたか**で決まります。'
        + '1日を1ポイント下げれば' + t(manSpan(1)).replace(/（.*$/, '') + 'ぶんです。'
        + '同じ条件に辿り着いても、5日目に辿り着いた班と70日目の班では、'
        + '積み上がる日数が違うぶんだけ差が出ます。',
        '**The money is counted in two parts.** The annualised benefit is what the current settings are worth if you hold them for a year; '
        + 'it depends only on **where you ended up.** What you built in during the run is the loss actually avoided over these sixteen weeks; '
        + 'it depends on **when you got there.** A point taken off one day is worth ' + t(manSpan(1)).replace(/ \(.*$/, '') + '. '
        + 'Two teams can reach the same settings and still differ, because one of them was there for sixty-five more days.',
        '**Uangnya dihitung dalam dua bagian.** Manfaat tahunan adalah nilai setelan sekarang bila dipertahankan setahun; '
        + 'ini hanya bergantung pada **di mana Anda berakhir.** Yang Anda peroleh selama periode adalah kerugian yang benar-benar dihindari selama enam belas minggu ini; '
        + 'ini bergantung pada **kapan Anda sampai di sana.** Satu poin yang dikurangi dalam sehari bernilai ' + t(manSpan(1)).replace(/ \(.*$/, '') + '. '
        + 'Dua tim dapat mencapai setelan yang sama dan tetap berbeda, karena yang satu sudah berada di sana enam puluh lima hari lebih lama.'),
      S('**急げばよいわけでもありません。**調べずに条件だけ動かすと、作り込みは稼げても'
        + '「原因の見立て」「手帳」「測定のばらつき」で落とします。'
        + '調べる日数と、直っている日数の**取り合い**が、このゲームの本当の勝負どころです。',
        '**Rushing is not the answer either.** Move the settings without investigating and you may collect the in-period money, '
        + 'but you lose it again on the cause, on the notebook, and on the measurement check. '
        + 'The real contest here is the **trade between days spent looking and days spent fixed.**',
        '**Terburu-buru juga bukan jawabannya.** Geser setelan tanpa menyelidiki dan Anda mungkin mengumpulkan uang periode, '
        + 'tetapi kehilangannya lagi pada penyebab, pada buku catatan, dan pada pemeriksaan pengukuran. '
        + 'Pertarungan sesungguhnya di sini adalah **pertukaran antara hari untuk mencari dan hari dalam keadaan sudah diperbaiki.**')
    ]));

    // 手帳。点数ではなく「辿った道」を講評で比べるための材料。
    v.appendChild(h('h3', { style: { marginTop: '18px' }, text: t(S('手帳：辿った道', 'Notebook: the path you took', 'Buku catatan: jalan yang Anda tempuh')) }));
    const hyps = WS.notesOf('hyp');
    if (!hyps.length) {
      v.appendChild(note([S('**仮説を1つも書いていません。**当たっていても、書いていない当たりは偶然と区別できません。原因の点は10点止まり、手帳の点は0です。',
        '**You wrote no hypothesis at all.** A right answer with nothing written cannot be told from luck. The cause scores at most ten, the notebook zero.',
        '**Anda tidak menulis satu pun hipotesis.** Jawaban benar tanpa catatan tidak dapat dibedakan dari kebetulan. Nilai pembacaan penyebab paling banyak sepuluh poin, nilai buku catatan nol.')]));
    } else {
      const ul = h('ul');
      hyps.forEach(function (hp, i) {
        const cks = WS.notesOf('check').filter(function (c) { return c.hypIdx === i; });
        const last = cks.length ? cks[cks.length - 1] : null;
        const vd = last ? (G.VERDICTS.filter(function (x) { return x[0] === last.verdict; })[0] || null) : null;
        ul.appendChild(h('li', null,
          h('b', { text: '#' + (i + 1) + ' ' + (hp.suspect ? G.suspectName(hp.suspect) + ' · ' : '') }),
          h('span', { text: G.dayLabel(hp.dn) + ' · ' + String(hp.text) + ' · ' }),
          h('span.chip' + (vd ? (vd[0] === 'yes' ? '.tone-green' : vd[0] === 'no' ? '.tone-red' : '') : ''),
            { text: vd ? t(vd[1]) : t(S('確かめていない', 'never checked', 'belum diperiksa')) })));
      });
      v.appendChild(h('div.g-note', null, ul));
      v.appendChild(note([S('仮説を書いてから始めた調査 ' + Math.round(bk.before * 100) + '%、確かめた仮説 ' + Math.round(bk.checked * 100) + '%。'
        + '**手帳の点はこの2つで決まります。**チーム対抗の講評では、点数ではなくこの道筋を並べて比べてください。',
        'Surveys begun with a hypothesis written first: ' + Math.round(bk.before * 100) + '%. Hypotheses checked: ' + Math.round(bk.checked * 100) + '%. '
        + '**These two decide the notebook score.** In the team debrief, compare these paths side by side rather than the totals.',
        'Survei yang dimulai dengan hipotesis tertulis: ' + Math.round(bk.before * 100) + '%. Hipotesis yang diperiksa: ' + Math.round(bk.checked * 100) + '%. '
        + '**Kedua angka ini menentukan skor buku catatan.** Dalam pembahasan antar tim, bandingkan jalan ini berdampingan, bukan totalnya.')]));
    }
    const copyNb = btn(S('手帳をコピーする（講評用）', 'Copy the notebook (for the debrief)', 'Salin buku catatan (untuk pembahasan)'), function () {
      try { navigator.clipboard.writeText(G.notesText()); copyNb.textContent = t(S('コピーしました', 'Copied', 'Tersalin')); } catch (e) { /* クリップボードが使えない環境 */ }
    }, 'btn-ghost');
    v.appendChild(copyNb);

    // 結果コード
    v.appendChild(h('h3', { style: { marginTop: '18px' }, text: t(S('結果コード', 'Result code', 'Kode hasil')) }));
    v.appendChild(note([S('このコードを進行役に渡すと、**別の端末で遊んだ結果も1つの表にまとめられます。**',
      'Hand this code to the facilitator and **results played on other devices can be gathered into one table.**',
      'Serahkan kode ini kepada fasilitator dan **hasil dari perangkat lain dapat dikumpulkan dalam satu tabel.**')]));
    const codeBox = h('div', { style: { fontFamily: 'ui-monospace,monospace', fontSize: '13px', wordBreak: 'break-all', background: 'var(--surface-2)', padding: '10px 12px', borderRadius: '10px' }, text: st().code });
    v.appendChild(codeBox);
    const copy = btn(S('コピーする', 'Copy', 'Salin'), function () {
      try {
        navigator.clipboard.writeText(st().code);
        copy.textContent = t(S('コピーしました', 'Copied', 'Tersalin'));
      } catch (e) { /* クリップボードが使えない環境 */ }
    });
    copy.style.marginTop = '8px';
    v.appendChild(copy);

    // 実績
    const badges = [
      // 正解が作業者のライン(組立)では、作業者を選ぶのは思い込みではない
      [S('思い込みに乗らなかった', 'Did not take the bait', 'Tidak termakan umpan'), st().suspect === sc.answer || (st().suspect !== 'roomT' && st().suspect !== 'worker')],
      [S('仮説を書いてから調べた', 'Wrote the hypothesis before looking', 'Menulis hipotesis sebelum menyelidiki'), bk.surveys > 0 && bk.before >= 0.99],
      [S('仮説を確かめて書き残した', 'Checked the hypotheses and wrote it down', 'Memeriksa hipotesis dan mencatatnya'), bk.hyps > 0 && bk.checked >= 0.99],
      [S('測ってから測った', 'Measured the measurement first', 'Memeriksa alat ukur lebih dulu'), !!st().flags.msaFirst],
      [S('条件を固定して測った', 'Held the condition while measuring', 'Menahan kondisi selama mengukur'), !st().flags.voided],
      [S('濡れた材に動じなかった', 'Did not chase the rained-on stock', 'Tidak mengejar material yang kehujanan'), !st().flags.reactedToShock],
      [S('締めすぎなかった', 'Did not over-tighten', 'Tidak terlalu memperketat'), cost <= bestCost],
      [S('標準化してから測った', 'Standardised before measuring', 'Membakukan sebelum mengukur'), stdLevel() >= 1 && st().stdFrom != null && st().stdFrom <= 6]
    ];
    v.appendChild(h('h3', { style: { marginTop: '18px' }, text: t(S('実績', 'Badges', 'Lencana')) }));
    const bs = h('div.g-badges');
    badges.forEach(function (b) { bs.appendChild(h('span.g-badge' + (b[1] ? '' : '.off'), { text: (b[1] ? '✓ ' : '· ') + t(b[0]) })); });
    v.appendChild(bs);

    // 答え合わせ
    v.appendChild(h('h3', { style: { marginTop: '20px' }, text: t(S('答え合わせ：このラインの下にあったもの', 'The reveal: what was under this line', 'Kunci jawaban: apa yang ada di bawah lini ini')) }));
    v.appendChild(talk('eng', sc.reveal));
    const mcOnly = last4(reference(Object.assign({}, BASE, { kiln: BEST.kiln }), sc));
    const wearOnly = last4(reference(Object.assign({}, BASE, { toolLife: BEST.toolLife }), sc));
    // 金額の山と不良率の底は別の条件。ライン全体の最適(scopeBest.all)と全部締め(BEST)を、このラインの係数で比べる。
    const capAll = withBase(((scn.scopeBest || {}).all) || {});
    const rAllB = simRows(BASE, scn), rAllBest = simRows(BEST, scn), rAllCap = simRows(capAll, scn);
    const rateAllBest = rateOfLots(rAllBest), rateAllCap = rateOfLots(rAllCap);
    const moneyBest = lossMan(rateOfLots(rAllB)) - lossMan(rateAllBest) - costOf(BEST) * 12;
    const moneyCap = lossMan(rateOfLots(rAllB)) - lossMan(rateAllCap) - costOf(capAll) * 12;
    const capDiff = KNOBS().filter(function (k) { return capAll[k.k] !== BEST[k.k] && capAll[k.k] === BASE[k.k]; })
      .map(function (k) { return t(k.label); }).join(t(S('、', ', ', ', ')));
    const over = withBase({ kiln: 40, kilnTemp: 60, incoming: 1, press: 75, glueAmt: 30, toolLife: 10, grit: 180 });
    v.appendChild(note([
      S('条件を1つずつ直したときの最後の4週：現状 ' + n1(before) + '%、' + kn('kiln') + 'だけ ' + n1(mcOnly) + '%、' + kn('toolLife') + 'だけ ' + n1(wearOnly) + '%、すべてそろえて ' + n1(best) + '%。**1つでは届きません。**',
        'The last four weeks with one condition fixed at a time: as-is ' + n1(before) + '%, kiln alone ' + n1(mcOnly) + '%, cutter alone ' + n1(wearOnly) + '%, all of them together ' + n1(best) + '%. **One alone does not get there.**',
        'Empat minggu terakhir dengan satu kondisi diperbaiki bergantian: apa adanya ' + n1(before) + '%, kiln saja ' + n1(mcOnly) + '%, pisau saja ' + n1(wearOnly) + '%, semuanya bersama ' + n1(best) + '%. **Satu saja tidak cukup.**'),
      vt('lesson.confound', S('**室温は犯人ではありません。** 室温は材料の状態と一緒に動くだけで、室温を変えても不良は動きません。層別で差が出ることと、そこに原因があることは別の話です。',
        '**Room temperature was not the culprit.** It simply moves with the state of the material; changing it moves nothing. A gap in a stratification is not the same thing as a cause.',
        '**Suhu ruang bukan pelakunya.** Ia hanya bergerak bersama kondisi material; mengubahnya tidak menggerakkan apa pun. Selisih dalam stratifikasi bukanlah penyebab.')),
      vt('lesson.money', S('**不良率をいちばん下げる条件と、金額がいちばん大きくなる条件は違います。**'
        + '全部いちばん締めると不良率 ' + n1(rateAllBest) + '% で効果金額は ' + t(man(moneyBest)) + '。'
        + '金額の山は不良率 ' + n1(rateAllCap) + '% で ' + t(man(moneyCap)) + ' です'
        + (capDiff ? '（' + capDiff + ' はそのまま）' : '') + '。'
        + '締めた分の費用が、減った不良の損失を上回る点があるからです。**④に置くのは不良率ではなく、効果金額です。**',
        '**The settings that minimise the defect rate are not the settings that maximise the money.** '
        + 'Tighten everything and the rate is ' + n1(rateAllBest) + '% for a benefit of ' + t(man(moneyBest)) + '. '
        + 'The money peaks at a rate of ' + n1(rateAllCap) + '% and ' + t(man(moneyCap))
        + (capDiff ? ' (leaving ' + capDiff + ' as it is)' : '') + '. '
        + 'Past a point, the cost of tightening outgrows the loss it removes. **What goes in ④ is the money, not the rate.**',
        '**Setelan yang meminimalkan tingkat cacat bukanlah setelan yang memaksimalkan uang.** '
        + 'Ketatkan semuanya dan tingkatnya ' + n1(rateAllBest) + '% dengan manfaat ' + t(man(moneyBest)) + '. '
        + 'Uang memuncak pada tingkat ' + n1(rateAllCap) + '% dan ' + t(man(moneyCap))
        + (capDiff ? ' (membiarkan ' + capDiff + ' apa adanya)' : '') + '. '
        + 'Melewati satu titik, biaya pengetatan melampaui kerugian yang dihilangkannya. **Yang masuk ke ④ adalah uangnya, bukan tingkatnya.**')),
      S('**バンドには効かなくなる点があります。** ' + knv('press', 60) + 'と' + knv('grit', 150) + 'を越えて締めても不良率は動かず、コストだけが ' + t(yen(bestCost)) + ' から ' + t(yen(costOf(over))) + ' へ増えます。GPCのバンドは、狭ければよいものではありません。',
        '**A band has a point past which tightening no longer pays for itself.** Past 60 seconds of press and 150 grit the rate does not move, while the cost climbs from ' + t(yen(bestCost)) + ' to ' + t(yen(costOf(over))) + '. A GPC band is not better simply for being narrower.',
        '**Setiap band punya titik di mana pengetatan tidak lagi sepadan dengan biayanya.** Melewati pres 60 detik dan grit 150, tingkatnya tidak bergerak, sementara biaya naik dari ' + t(yen(bestCost)) + ' menjadi ' + t(yen(costOf(over))) + '. GPC band tidak otomatis lebih baik hanya karena lebih sempit.'),
      (stdLevel() >= 1
        ? S('**標準化が効いていました。**手順を1つに決めるだけで、平均は動かないのに週ごとの揺れが小さくなります。'
          + '揺れが小さくなると3σの目安が狭くなり、同じ調査でも本物の因子が見えるようになります。'
          + '標準化しないまま層別すると、作業者に本物の差が出ます。人の問題ではなく、標準が無いというだけのことです。',
          '**The standard was doing work.** Settling on one method leaves the mean where it was but shrinks the week-to-week swing. '
          + 'A smaller swing means a narrower three-sigma yardstick, and the same surveys start showing the real factor. '
          + 'Stratify without a standard and the operator shows a real gap — not a problem with the people, only the absence of a standard.',
          '**Standar itu bekerja.** Menetapkan satu metode membiarkan rata-rata di tempatnya tetapi mengecilkan fluktuasi antar minggu. '
          + 'Fluktuasi yang lebih kecil berarti patokan tiga sigma yang lebih sempit, dan survei yang sama mulai menunjukkan faktor yang nyata. '
          + 'Stratifikasi tanpa standar dan operator akan menunjukkan selisih nyata — bukan masalah orangnya, melainkan tidak adanya standar.')
        : S('**標準作業は ' + Math.round(stdLevel() * 5) + ' / 5 工程で終わりました。**標準の無い工程の手順のばらつきが、全部の数字に乗り続けていました。'
          + '平均は変わりませんが、週ごとの揺れがおよそ1.6倍になり、3σの目安もそのぶん広がります。'
          + '**同じポイントを使っても、標準化してから測ったほうが多くが見えます。**ZEVAが標準化を最初に置くのはこのためです。',
          '**Standard work stopped at ' + Math.round(stdLevel() * 5) + ' / 5 processes.** For all sixteen weeks the spread of people working differently rode on every number. '
          + 'The mean is unaffected, but the week-to-week swing runs about 1.6 times larger and the three-sigma yardstick widens with it. '
          + '**The same points buy more when they are spent after standardising.** That is why ZEVA puts standardisation first.',
          '**Kerja standar berhenti di ' + Math.round(stdLevel() * 5) + ' dari 5 proses.** Selama enam belas minggu, sebaran orang yang bekerja berbeda menumpang pada setiap angka. '
          + 'Rata-ratanya tidak terpengaruh, tetapi fluktuasi antar minggu sekitar 1,6 kali lebih besar dan patokan tiga sigma melebar bersamanya. '
          + '**Poin yang sama membeli lebih banyak bila dibelanjakan setelah dibakukan.** Itulah sebabnya ZEVA menempatkan pembakuan lebih dulu.')),
      S('**週ごとの揺れは2ポイント近くあります。** 連続する2週の平均をとっても ' + n1(Math.min.apply(null, pairMeans(baseRef))) + '〜' + n1(Math.max.apply(null, pairMeans(baseRef))) + '% に散らばります。条件を変えて2週見ただけでは、効いたのかどうかは分かりません。',
        '**The week-to-week wobble is close to two points.** Even a two-week average ranges from ' + n1(Math.min.apply(null, pairMeans(baseRef))) + ' to ' + n1(Math.max.apply(null, pairMeans(baseRef))) + '%. Two weeks after a change tells you nothing about whether it worked.',
        '**Fluktuasi antar minggu hampir dua poin.** Bahkan rata-rata dua minggu berkisar dari ' + n1(Math.min.apply(null, pairMeans(baseRef))) + ' hingga ' + n1(Math.max.apply(null, pairMeans(baseRef))) + '%. Dua minggu setelah perubahan tidak mengatakan apa pun tentang apakah itu berhasil.')
    ]));

    const bad = CONTROLS().filter(function (x) { return st().controls[x.id] && !x.ok; });
    if (bad.length) {
      v.appendChild(talk('eng', S(
        '日常点検に載せた「' + bad.map(function (x) { return x.label.ja; }).join('」「') + '」は、条件を押さえていません。維持できるのは、値を決めて守れる条件だけです。',
        'The items you put on the check sheet, ' + bad.map(function (x) { return x.label.en; }).join('; ') + ', hold no condition. Only a condition with a value you can set and keep will hold the gain.',
        'Butir yang Anda masukkan ke lembar periksa harian, ' + bad.map(function (x) { return x.label.id; }).join('; ') + ', tidak mengunci kondisi apa pun. Hanya kondisi dengan nilai yang dapat ditetapkan dan dijaga yang akan mempertahankan hasil.')));
    }

    const again = btn(S('別のラインをやる', 'Take another line', 'Ambil lini lain'), function () { WS.setState(null); route(); }, 'btn-primary');
    again.style.marginTop = '16px';
    v.appendChild(again);
    const toLesson = btn(S('ZEVA Academy へ', 'To ZEVA Academy', 'Ke ZEVA Academy'), function () { location.href = '../'; });
    toLesson.style.cssText = 'margin-top:16px;margin-left:8px';
    v.appendChild(toLesson);
    show(v);
  }
  function pairMeans(a) {
    const out = [];
    for (let i = 0; i + 1 < a.length; i++) out.push((a[i] + a[i + 1]) / 2);
    return out;
  }

  Object.assign(G, { screenConclude: screenConclude, screenResult: screenResult });
})();
