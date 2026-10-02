/* 現場再建記 — 木工ライン丁（生産性）：盤面と打つ手
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
  const SHIFT = P.SHIFT;
  const weekStrip = WS.weekStrip;

  const BASE = P.BASE;
  const EVENTS = P.EVENTS;
  const NAMES = P.NAMES;
  const PICK_N = P.PICK_N;
  const SHOP = P.SHOP;
  const advance = P.advance;
  const advanceDay = P.advanceDay;
  const cfgKey = P.cfgKey;
  const day = P.day;
  const hud = P.hud;
  const setupMin = P.setupMin;
  const split = P.split;
  const stdLevel = P.stdLevel;
  const stdMissing = P.stdMissing;
  /* ---- 標準作業を工程ごとに決める ---- */
  function stdwork() {
    const s = st();
    const v = h('div');
    v.appendChild(hud());
    v.appendChild(talk('eng', S('標準の無い工程を1つ選んでください。**手順・順序・時間を1つに決めます。**'
      + 'いちばん遅いやり方が混ざらなくなるので、観測したサイクルタイムが締まります。1工程あたり5ポイントと1週。',
      'Pick one process without a standard. **Settle its steps, their order and their times.** '
      + 'The slowest way stops creeping in, so the times you measure tighten. Five points and one week per process.',
      'Pilih satu proses tanpa standar. **Tetapkan langkah, urutan, dan waktunya.** '
      + 'Cara kerja yang paling lambat tidak lagi ikut tercampur, sehingga waktu yang Anda ukur mengetat. Lima poin dan satu minggu per proses.')));
    const done = scen().stdDone || [true, false, false, true, false];
    if (WS.activeSurveys().length) {
      const left = Math.max.apply(null, WS.activeSurveys().map(function (sv) { return sv.left; }));
      v.appendChild(note([S('**いま調査が走っています（長いもので あと ' + left + ' 日）。**標準が仕上がる日にまだ走っていれば、その調査は読めなくなります。',
        '**A survey is running (the longest has ' + left + ' day(s) left).** If it is still running on the day the standard is finished, it becomes unreadable.',
        '**Survei sedang berjalan (yang terlama ' + left + ' hari lagi).** Bila masih berjalan pada hari standar selesai, survei itu menjadi tak terbaca.')]));
    }
    const box = h('div.g-shop');
    NAMES.forEach(function (nm, i) {
      const has0 = done[i], made = s.stdMade && s.stdMade[i];
      const ok = has0 || made;
      box.appendChild(h('div.g-shop-row', null,
        h('div.txt', null, h('b', { text: t(nm) }),
          h('span', { text: t(has0 ? S('もともと標準作業がある', 'had standard work already', 'sudah punya kerja standar')
            : made ? S('あなたが決めた', 'you wrote it', 'Anda yang menyusunnya')
              : S('標準が無い。いちばん遅いやり方が混ざる', 'no standard: the slowest way creeps in', 'tidak ada standar: cara kerja yang paling lambat ikut tercampur')) })),
        h('div.buy', null,
          ok ? h('span.chip.tone-green', { text: '✓ ' + t(S('あり', 'in place', 'ada')) })
            : btn(S('決める（5pt・5日）', 'Write it (5 pt · 5 days)', 'Susun (5 poin · 5 hari)'), function () {
              if (s.pt < 5 || s.day + DPW > DAYS || s.pendingStd != null) return;
              s.pt -= 5;
              s.pendingStd = i;
              s.pendingStdLeft = DPW;
              s.actThisWeek = 'std';
              s.actToday = 'std';
              advanceDay(EVENTS[s.week + 1] || null);
              s.screen = 'board'; save(); route();
            }, s.pt < 5 ? 'btn-sm btn-ghost' : 'btn-sm'))));
    });
    v.appendChild(box);
    const b = btn(S('盤面へ戻る', 'Back to the floor', 'Kembali ke papan permainan'), function () { s.screen = 'board'; save(); route(); });
    b.style.marginTop = '12px';
    v.appendChild(b);
    show(v);
  }

  /* ---- 育成の能力パラメータと週カレンダー ---- */
  const ACT_ICON = { std: '📏', survey: '🔬', tune: '🔧', run: '▶' };


  /* ---- 育成の能力パラメータ（木工ライン丁） ---- */
  function prodParams() {
    const s = st();
    const surveyPts = SHOP.reduce(function (a2, x) { return a2 + (has(x.id) ? x.pt : 0); }, 0);
    const tabs = Object.keys(s.seenTabs || {}).length;
    // 改善は「どれだけ動かしたか」ではなく「日産をどれだけ伸ばしたか」。需要との差を埋めた割合。
    // 直近5日の日産で見る。やり方を変えた直後は 0 のままで、1週流すと動く。
    const b = P.baseStats();
    const rd = (s.days || []).slice(-DPW);
    const ro = rd.length ? rd.reduce(function (a2, x) { return a2 + x.out; }, 0) / rd.length : null;
    const imp = (b.n && ro != null && DEMAND > b.out) ? Math.max(0, Math.min(1, (ro - b.out) / (DEMAND - b.out))) : 0;
    const ctl = Object.keys(s.controls || {}).filter(function (k) { return s.controls[k]; }).length;
    const hyp = WS.notesOf('hyp').length, chk = WS.notesOf('check').length;
    return [
      { k: S('標準', 'Standard', 'Standar'), v: Math.round(stdLevel() * 100), c: 'var(--green)' },
      { k: S('測定', 'Measurement', 'Pengukuran'), v: Math.min(100, Math.round(surveyPts / 90 * 100)), c: 'var(--navy)' },
      { k: S('分析', 'Analysis', 'Analisis'), v: Math.min(100, Math.round(tabs / 9 * 100)), c: 'var(--amber)' },
      { k: S('仮説', 'Hypotheses', 'Hipotesis'), v: Math.min(100, Math.round(Math.min(hyp, 3) * 20 + Math.min(chk, 2) * 20)), c: 'var(--amber)' },
      { k: S('改善', 'Improvement', 'Perbaikan'), v: Math.round(imp * 100), c: 'var(--red)' },
      { k: S('維持', 'Control', 'Kendali'), v: Math.round(ctl / PICK_N * 100), c: 'var(--green)' }
    ];
  }

  function board() {
    const s = st();
    const v = h('div');
    v.appendChild(h('div.muted', { style: { fontSize: '12px', marginBottom: '8px' },
      text: (s.team ? s.team + sep() : '') + t(scen().name) }));
    v.appendChild(hud());
    v.appendChild(weekStrip());
    v.appendChild(paramPanel(prodParams()));
    if (WS.surveys().length) {
      v.appendChild(note(WS.surveys().map(function (sv) {
        const sh = SHOP.filter(function (x) { return x.id === sv.id; })[0];
        return sv.voided
          ? S('**' + t(sh.name) + '：条件を変えたため読めなくなりました。**残り' + sv.left + '日で終わりますが、結果は使えません。',
            '**' + t(sh.name) + ': unreadable, because a condition changed while it was running.** It ends in ' + sv.left + ' day(s), but the result is no use.',
            '**' + t(sh.name) + ': tidak terbaca, karena kondisi berubah saat berjalan.** Selesai dalam ' + sv.left + ' hari, tetapi hasilnya tidak berguna.')
          : S('**' + t(sh.name) + ' を実施中。**あと' + sv.left + '日で結果が出ます。この間に条件を変えると読めなくなります。',
            '**' + t(sh.name) + ' is running.** The result lands in ' + sv.left + ' day(s). Change a condition meanwhile and it becomes unreadable.',
            '**' + t(sh.name) + ' sedang berjalan.** Hasilnya tiba dalam ' + sv.left + ' hari. Mengubah kondisi sementara itu membuatnya tak terbaca.');
      })));
    }
    if (s.hist.length) v.appendChild(outChart());
    const ln = s.hist.length ? s.hist[s.hist.length - 1].note : null;
    if (ln) v.appendChild(talk(ln.who, ln.text));

    if (s.day >= DAYS) {
      v.appendChild(talk('boss', S('16週たった。**結論を聞かせてくれ。**',
        'Sixteen weeks are up. **Let me hear your conclusion.**',
        'Enam belas minggu telah berlalu. **Saya ingin mendengar kesimpulan Anda.**')));
      v.appendChild(btn(S('結論を出す', 'Give your conclusion', 'Sampaikan kesimpulan'),
        function () { s.screen = 'conclude'; save(); route(); }, 'btn-primary'));
      show(v); return;
    }
    const acts = h('div.g-acts');
    acts.appendChild(act(S('調査を始める', 'Start a survey', 'Mulai survei'),
      S('測るものを選ぶ。ポイントと日数を使う', 'Choose what to measure. It costs points and days', 'Pilih apa yang diukur. Memakan poin dan hari'),
      S('調査ポイント ' + s.pt + '　走行中 ' + WS.surveys().length + '/' + WS.MAX_SURVEYS, s.pt + ' pt · running ' + WS.surveys().length + '/' + WS.MAX_SURVEYS, 'sisa ' + s.pt + ' poin · berjalan ' + WS.surveys().length + '/' + WS.MAX_SURVEYS),
      function () { s.screen = 'shop'; save(); route(); }, WS.surveys().length >= WS.MAX_SURVEYS));
    acts.appendChild(act(S('やり方を変える', 'Change how the line runs', 'Ubah cara lini berjalan'),
      S('段取り・予熱・工程の分担・ロットサイズ', 'Changeover, warm-up, how the work is split, lot size', 'Pergantian, pemanasan, pembagian kerja, ukuran lot'),
      null, function () { s.screen = 'tune'; save(); route(); }));
    acts.appendChild(act(S('記録を読む', 'Read the record', 'Baca catatan'),
      S('山積み図・稼働の内訳・リードタイムを見る', 'Yamazumi, where the minutes go, and lead time', 'Yamazumi, rincian waktu operasi, dan lead time'),
      S('日 ' + s.days.length + '件', s.days.length + ' days', s.days.length + ' hari'),
      function () { s.screen = 'analyze'; save(); route(); }, !s.days.length));
    const nNotes = WS.notesOf().filter(function (n) { return n.kind !== 'sys'; }).length;
    acts.appendChild(act(S('手帳に書く', 'Write in the notebook', 'Tulis di buku catatan'),
      S('気づき・仮説・打った手・確かめた結果を残す。日は使わない。仮説は書いてから調べる',
        'Keep insights, hypotheses, moves and checks. It costs no day. Write the hypothesis, then go and look',
        'Simpan temuan, hipotesis, langkah, dan hasil pemeriksaan. Tidak memakan hari. Tulis hipotesis, lalu selidiki'),
      S(nNotes + '件', nNotes + ' entries', nNotes + ' catatan'),
      function () { s.noteFrom = 'board'; s.screen = 'notebook'; save(); route(); }));
    if (stdMissing().length) {
      acts.appendChild(act(S('標準作業を決める', 'Write standard work', 'Susun kerja standar'),
        has('stdaudit')
          ? S('標準の無い工程を1つ選んで、手順・順序・時間を1つに決める。いちばん遅いやり方が混ざらなくなる',
            'Pick one process without a standard and settle its steps, their order and their times, so the slowest way stops creeping in',
            'Pilih satu proses tanpa standar dan tetapkan langkah, urutan, dan waktunya, agar cara kerja yang paling lambat tidak lagi ikut tercampur')
          : S('どの工程に標準が無いのかを、まだ調べていません', 'You have not yet looked at which processes lack a standard', 'Anda belum melihat proses mana yang tidak punya standar'),
        S('1工程 5 pt ・ 5日', '5 pt · 5 days per process', '5 poin · 5 hari per proses'),
        function () { s.screen = 'stdwork'; save(); route(); },
        !has('stdaudit') || s.pendingStd != null));
    }
    const nd = s.day + 1, nw = Math.ceil(nd / DPW);
    acts.appendChild(act(S('1日流す', 'Run one day', 'Jalankan satu hari'),
      S('8時間ぶん流して、記録を1日ぶん増やす。明日また手を打てる',
        'Run eight hours and add one day to the record. You can act again tomorrow',
        'Jalankan delapan jam dan tambahkan satu hari ke catatan. Anda dapat bertindak lagi besok'),
      S('第' + nw + '週 ' + (nd - (nw - 1) * DPW) + '日目へ', 'to week ' + nw + ' day ' + (nd - (nw - 1) * DPW),
        'ke minggu ' + nw + ' hari ' + (nd - (nw - 1) * DPW)),
      function () {
        s.actToday = 'run';
        if (nd % DPW === 1) s.actThisWeek = 'run';
        advanceDay(nd % DPW === 1 ? (EVENTS[nw] || null) : null);
        route();
      }));
    acts.appendChild(act(S('1週（5日）流す', 'Run one week (5 days)', 'Jalankan satu minggu (5 hari)'),
      S('途中で手を止めずに5日ぶん流す', 'Run five days without stopping in between', 'Jalankan lima hari tanpa berhenti'),
      S('第' + Math.min(WEEKS, Math.ceil((s.day + DPW) / DPW)) + '週の終わりへ',
        'to the end of week ' + Math.min(WEEKS, Math.ceil((s.day + DPW) / DPW)),
        'ke akhir minggu ' + Math.min(WEEKS, Math.ceil((s.day + DPW) / DPW))),
      function () {
        s.actThisWeek = 'run'; s.actToday = 'run';
        for (let i = 0; i < DPW && st().day < DAYS; i++) {
          const d2 = st().day + 1, w2 = Math.ceil(d2 / DPW);
          advanceDay(d2 % DPW === 1 ? (EVENTS[w2] || null) : null);
        }
        route();
      }));
    if (WS.daysToMilestone() > 0) {
      const dm = WS.daysToMilestone();
      acts.appendChild(act(S('区切りまで流す（' + dm + '日）', 'Run to the next milestone (' + dm + ' days)', 'Jalankan sampai tonggak berikutnya (' + dm + ' hari)'),
        S('いちばん早く終わる調査か、標準作業の完成まで流す', 'Run until the earliest survey lands or the standard work is finished', 'Jalankan sampai survei yang paling cepat selesai atau kerja standar rampung'),
        S('第' + Math.ceil((s.day + dm) / DPW) + '週へ', 'to week ' + Math.ceil((s.day + dm) / DPW), 'ke minggu ' + Math.ceil((s.day + dm) / DPW)),
        function () {
          s.actThisWeek = s.actThisWeek || 'run'; s.actToday = 'run';
          for (let i = 0; i < dm && st().day < DAYS; i++) {
            const d2 = st().day + 1, w2 = Math.ceil(d2 / DPW);
            advanceDay(d2 % DPW === 1 ? (EVENTS[w2] || null) : null);
          }
          route();
        }));
    }
    v.appendChild(acts);
    // 途中でもルールを見返せるようにする。状態は預けておいて、戻ったら続きから。
    const rb = btn(S('あそびかたと採点', 'Rules and scoring', 'Aturan dan penilaian'), function () {
      WS.rulesFrom = s;
      WS.setState({ screen: 'rules' });
      route();
    }, 'btn-ghost');
    rb.style.cssText += ';margin-top:4px;margin-left:8px';
    v.appendChild(rb);
    if (s.day >= DAYS / 2) {
      const b = btn(S('ここで結論を出す', 'Conclude here', 'Simpulkan di sini'), function () { s.screen = 'conclude'; save(); route(); }, 'btn-ghost');
      b.style.marginTop = '4px';
      v.appendChild(b);
    }
    show(v);
  }

  function outChart() {
    const s = st();
    const pts = s.hist.map(function (p) { return [p.w, p.shown]; });
    // 縦軸は打点・需要・目標のすべてが入る幅にする。目標を入れ忘れると、
    // 自分で決めた目標の線が枠の上に外れて見えなくなる。
    const hi = Math.max.apply(null, pts.map(function (p) { return p[1]; })
      .concat([DEMAND, s.target ? s.target.value : 0])) * 1.12;
    return svgBox(S('週ごとの日産', 'Output by week', 'Output per minggu'),
      C.lines({ w: 680, h: 240, x0: 1, x1: WEEKS, y0: 0, y1: hi, yd: 0,
        yUnit: t(S('個', '', '')), xTicks: [1, 4, 7, 10, 13, 16], xLabel: t(S('週', 'week', 'minggu')),
        rules: [{ at: DEMAND, color: 'var(--red)', label: t(S('需要', 'demand', 'permintaan')) }]
          .concat(s.target && s.target.value !== DEMAND ? [{ at: s.target.value, color: 'var(--green)', label: t(S('目標', 'target', 'sasaran')) }] : []),
        series: [{ name: 'out', color: 'var(--navy)', points: pts }] }),
      S('1日の産出の週平均です。赤い線が受注の' + DEMAND + '個/日。',
        'The weekly mean of daily output. The red line is the order book at ' + DEMAND + ' a day.',
        'Rata-rata mingguan output harian. Garis merah adalah pesanan ' + DEMAND + ' per hari.'));
  }

  function shop() {
    const s = st();
    const v = h('div');
    v.appendChild(hud());
    v.appendChild(talk('eng', S('何を測るかを選びます。**測っていないものは、あとから層別も分解もできません。**',
      'Choose what to measure. **What you never measured cannot be split or stratified afterwards.**',
      'Pilih apa yang diukur. **Yang tidak pernah diukur tidak dapat dipisah atau distratifikasi setelahnya.**')));
    if (s.pendingStd != null) {
      v.appendChild(note([S('**いま標準作業を決めている最中です（あと ' + (s.pendingStdLeft == null ? DPW : s.pendingStdLeft) + ' 日）。**標準が仕上がった日に走っている調査は読めなくなります。',
        '**Standard work is being written (' + (s.pendingStdLeft == null ? DPW : s.pendingStdLeft) + ' day(s) to go).** A survey still running on the day it is finished becomes unreadable.',
        '**Kerja standar sedang disusun (' + (s.pendingStdLeft == null ? DPW : s.pendingStdLeft) + ' hari lagi).** Survei yang masih berjalan pada hari standar selesai menjadi tak terbaca.')]));
    }
    if (!WS.notesOf('hyp').length) {
      v.appendChild(note([S('**仮説を書いてから測ると、あとで「当たった」と言えます。**手帳に「何がネックなら、何を測ると分かるはず」を一行書いてから始めるのが順序です。',
        '**Write the hypothesis first, and afterwards you can say it was confirmed.** One line in the notebook, “if X is the bottleneck, measuring Y should show it”, before you start.',
        '**Tulis hipotesis lebih dulu, maka nanti Anda dapat mengatakan hipotesis itu terbukti.** Satu baris di buku catatan, “bila X bottleneck-nya, mengukur Y akan menunjukkannya”, sebelum memulai.')]));
    }
    v.appendChild(note([S('**調査は同時に ' + WS.MAX_SURVEYS + ' 本まで走らせられます。**いま ' + WS.surveys().length + ' 本。やり方を変えると走っている調査は全部読めなくなります。',
      '**Up to ' + WS.MAX_SURVEYS + ' surveys can run at once.** ' + WS.surveys().length + ' running now. Changing the way of running spoils every running survey.',
      '**Paling banyak ' + WS.MAX_SURVEYS + ' survei dapat berjalan bersamaan.** Sekarang ' + WS.surveys().length + ' survei sedang berjalan. Mengubah cara kerja membuat semua survei yang sedang berjalan tak terbaca.')]));
    const box = h('div.g-shop');
    SHOP.forEach(function (sh) {
      const owned = has(sh.id);
      const afford = s.pt >= sh.pt && s.week + sh.wk <= WEEKS;
      box.appendChild(h('div.g-shop-row', null,
        h('div.txt', null, h('b', { text: t(sh.name) }), h('span', { text: t(sh.gain) })),
        h('div.buy', null,
          h('span.price', { text: sh.pt + ' pt · ' + (sh.wk * DPW) + t(S('日', ' days', ' hari')) }),
          owned ? h('span.chip.tone-green', { text: t(S('第' + s.bought[sh.id] + '週から', 'from week ' + s.bought[sh.id], 'sejak minggu ' + s.bought[sh.id])) })
            : WS.surveys().some(function (sv) { return sv.id === sh.id; })
            ? h('span.chip', { text: t(S('走行中', 'running', 'berjalan')) })
            : btn(S('始める', 'Start', 'Mulai'), function () {
              if (s.pt < sh.pt || !afford || WS.surveys().length >= WS.MAX_SURVEYS) return;
              s.pt -= sh.pt;
              WS.surveys().push({ id: sh.id, left: sh.wk * DPW, from: s.week + 1, fromDay: s.day + 1, voided: false, hypBefore: WS.notesOf('hyp').length });
              s.surveyLog = (s.surveyLog || []).concat([{ id: sh.id, dn: s.day, hypBefore: WS.notesOf('hyp').length }]);
              WS.addNote('sys', S('「' + t(sh.name) + '」を始めた', 'Started “' + t(sh.name) + '”', 'Memulai “' + t(sh.name) + '”'), { survey: sh.id });
              s.actThisWeek = 'survey';
              s.actToday = 'survey';
              s.screen = 'board'; save(); route();
            }, (afford && WS.surveys().length < WS.MAX_SURVEYS) ? 'btn-sm' : 'btn-sm btn-ghost'))));
    });
    v.appendChild(box);
    const b = btn(S('盤面へ戻る', 'Back to the floor', 'Kembali ke papan permainan'), function () { s.screen = 'board'; save(); route(); });
    b.style.marginTop = '12px';
    v.appendChild(b);
    show(v);
  }

  /* ---- やり方を変える ---- */
  /* 打てる手は、それを思いつく調査を済ませてから現れる。
   * 仕掛を数えなければロットの意味は見えず、段取りを撮らなければ内外の分け方は分からず、
   * 停止を記録しなければ立上げの40分は見えず、時間観測をしなければどこから移すかが決まらない。 */
  const KNOBS = [
    { k: 'lot', min: 100, max: 600, step: 50, need: 'wip', label: S('ロットサイズ', 'Lot size', 'Ukuran lot'),
      unit: S('個', ' pcs', ' pcs') },
    { k: 'setup', min: 0, max: 0.8, step: 0.2, need: 'setup', label: S('段取りの外段取り化', 'Changeover moved to external setup', 'Pergantian dipindah ke setup eksternal'),
      unit: S('', '', ''), pct: true },
    { k: 'warm', min: 0, max: 1, step: 0.5, need: 'stop', label: S('予熱のタイマー化', 'Warm-up put on a timer', 'Pemanasan dengan pengatur waktu'),
      unit: S('', '', ''), pct: true },
    { k: 'balance', min: 0, max: 0.6, step: 0.2, need: 'time', label: S('工程3から2・4へ作業を移す', 'Move work from process 3 to 2 and 4', 'Pindahkan kerja dari proses 3 ke 2 dan 4'),
      unit: S('', '', ''), pct: true },
    { k: 'feed', min: 0, max: 1, step: 0.5, need: 'work',
      label: S('工程3の材料待ちを断つ（供給方法を変える）', 'Stop process 3 waiting for material (change how it is fed)', 'Hentikan proses 3 menunggu material (ubah cara pasokan)'),
      unit: S('', '', ''), pct: true }
  ];
  function tune() {
    const s = st();
    const v = h('div');
    v.appendChild(hud());
    v.appendChild(talk('eng', S('この4つが動かせる範囲です。**順番があります。**段取りを短くする前にロットを小さくすると、段取りの回数が増えた分だけ稼働時間が減ります。',
      'These four are what you can move. **Order matters.** Cut the lot before you cut the changeover and the extra changeovers eat the running time.',
      'Empat inilah yang dapat Anda gerakkan. **Urutannya penting.** Perkecil lot sebelum memperpendek pergantian, dan pergantian tambahan akan memakan waktu operasi.')));
    const draft = Object.assign({}, s.cfg);
    const out = h('div', { style: { marginTop: '12px' } });
    function refresh() {
      out.innerHTML = '';
      // 模型の「見込み」は出さない。そのやり方で実際に流した日の実績だけ。段取り回数は算数なので出す。
      const tried = P.triedStats(draft), base = P.baseStats();
      const setups = Math.max(1, Math.round((tried.out || base.out || 400) / draft.lot));
      out.appendChild(h('div.g-hud', null,
        meter(S('このやり方での実績', 'Record under this way of running', 'Realisasi pada cara kerja ini'),
          tried.n ? Math.round(tried.out) + t(S('個/日', ' pcs/day', ' pcs/hari')) : t(S('未検証', 'not yet tried', 'belum dicoba')),
          tried.n ? S(tried.n + '日の平均', 'mean of ' + tried.n + ' day(s)', 'rata-rata ' + tried.n + ' hari')
            : S('流して測るまで、効くかどうかは分からない', 'until you run it and measure, you do not know whether it works', 'sebelum dijalankan dan diukur, tidak diketahui apakah berpengaruh'),
          tried.n ? (tried.out >= DEMAND ? 'good' : tried.out >= DEMAND * 0.92 ? 'warn' : 'bad') : ''),
        meter(S('改善前', 'Before', 'Sebelum'), base.n ? Math.round(base.out) + t(S('個/日', ' pcs/day', ' pcs/hari')) : '—',
          S('最初のやり方で流した ' + base.n + '日', 'the first ' + base.n + ' day(s) under the starting way', base.n + ' hari pertama pada cara awal')),
        meter(S('段取り', 'Changeover', 'Pergantian'),
          setups + t(S('回/日', ' per day', ' per hari')),
          S('日産 ÷ ロット' + draft.lot + '。1回の時間は撮って分けるまで分からない', 'output ÷ lot of ' + draft.lot + '; the minutes per changeover are unknown until you film and split it', 'output ÷ lot ' + draft.lot + '; menit per pergantian tidak diketahui sebelum direkam dan dipisahkan')),
        meter(S('リードタイム', 'Lead time', 'Lead time'),
          has('wip') && tried.n ? n1(P.PROC * draft.lot / tried.out) + t(S('日', ' days', ' hari')) : '—',
          has('wip') ? (tried.n ? S('仕掛 ÷ 実績の日産', 'WIP ÷ recorded output', 'WIP ÷ output realisasi') : S('実績が要る', 'needs a record', 'memerlukan realisasi')) : S('仕掛を数えていない', 'WIP not counted', 'WIP belum dihitung'))));
      const changed = cfgKey(draft, stdLevel()) !== cfgKey(s.cfg, stdLevel());
      if (WS.activeSurveys().length && changed) {
        out.appendChild(note([S('**いま調査中です。**このまま変えると、その調査は読めなくなります。',
          '**A survey is running.** Change it now and that survey becomes unreadable.',
          '**Survei sedang berjalan.** Mengubahnya sekarang membuat survei itu tak terbaca.')]));
      }
      const apply = btn(changed ? S('このやり方にする（翌週から）', 'Apply from next week', 'Terapkan mulai minggu depan') : S('変更なし', 'No change', 'Tidak ada perubahan'),
        function () {
          if (!changed) { s.screen = 'board'; save(); route(); return; }
          WS.surveys().forEach(function (sv) { sv.voided = true; });
          const diff = KNOBS.filter(function (k) { return draft[k.k] !== s.cfg[k.k]; })
            .map(function (k) { return t(k.label) + ' ' + (k.pct ? Math.round((s.cfg[k.k] || 0) * 100) + '%' : s.cfg[k.k] + t(k.unit)) + ' → ' + (k.pct ? Math.round(draft[k.k] * 100) + '%' : draft[k.k] + t(k.unit)); })
            .join(t(S('、', ', ', ', ')));
          WS.addNote('act', t(S('やり方を変えた：', 'Changed the way of running: ', 'Mengubah cara kerja: ')) + diff, { k: cfgKey(draft, stdLevel()) });
          s.cfg = draft;
          s.actToday = 'tune';
          s.actThisWeek = 'tune';
          if (s.week === 7 || s.week === 8) s.flags.reactedToShock = true;
          s.screen = 'board'; save(); route();
        }, changed ? 'btn-primary' : '');
      apply.style.marginTop = '12px';
      out.appendChild(apply);
    }
    if (!KNOBS.some(function (kn) { return !kn.need || has(kn.need); })) {
      v.appendChild(note([S('**まだ打てる手がありません。**まず「停止の記録」か「工程別の時間観測」を始めてください。480分がどこへ消えているか、どの工程がネックかが分かると、手が現れます。',
        '**There is nothing you can move yet.** Start with “Log the stops” or “Time study by process”. Once you can see where the 480 minutes go and which process is the bottleneck, moves appear.',
        '**Belum ada langkah yang dapat diambil.** Mulailah dengan “Catat penghentian” atau “Studi waktu per proses”. Begitu terlihat ke mana 480 menit terpakai dan proses mana yang bottleneck, langkah akan muncul.')]));
    }
    KNOBS.forEach(function (kn) {
      if (kn.need && !has(kn.need)) {
        const sh = SHOP.filter(function (x) { return x.id === kn.need; })[0];
        const nm = sh ? t(sh.name) : kn.need;
        v.appendChild(h('div.ctrl', { style: { opacity: '.45' } },
          h('label', null, h('span', { text: t(kn.label) }),
            h('output', { text: t(S('「' + nm + '」をするまで使えない', 'locked until “' + nm + '”', 'terkunci sampai “' + nm + '”')) }))));
        return;
      }
      const ov = h('output');
      const inp = h('input', { type: 'range', min: kn.min, max: kn.max, step: kn.step, value: draft[kn.k] });
      const render = function () {
        ov.textContent = kn.pct ? Math.round(+inp.value * 100) + '%' : inp.value + t(kn.unit);
      };
      inp.addEventListener('input', function () { draft[kn.k] = +inp.value; render(); refresh(); });
      render();
      v.appendChild(h('div.ctrl', null, h('label', null, h('span', { text: t(kn.label) }), ov), inp));
    });
    v.appendChild(out);
    refresh();
    const back = btn(S('やめる', 'Cancel', 'Batal'), function () { s.screen = 'board'; save(); route(); }, 'btn-ghost');
    back.style.marginTop = '8px';
    v.appendChild(back);
    show(v);
  }

  Object.assign(P, { KNOBS: KNOBS, board: board, outChart: outChart, shop: shop, stdwork: stdwork, tune: tune });
})();
