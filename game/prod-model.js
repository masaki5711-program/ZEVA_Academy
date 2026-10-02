/* 現場再建記 — 木工ライン丁（生産性）：ライン模型と調査の棚
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


  /* ================= モデル ================= */
  // 需要は460。最良の条件でも日ごとの当たり外れで平均は481の0.99倍ほどになるので、
// 480に置くと「最良でも届かない」盤面になってしまう。
  const SHIFT = 480, DEMAND = 460, PROC = 5, PT0 = 90;
  const BASE = { lot: 600, setup: 0, warm: 0, balance: 0, feed: 0 };
  // 日産だけならロット300で597個、リードタイムだけならロット120で1.11日。
  // その中間の200を「届きうる最良」に置く（日産568、リードタイム1.76日）。
  const BEST = { lot: 200, setup: 0.8, warm: 1, balance: 0.6, feed: 1 };
  // 価値作業の内訳（秒）。価値は工程ごとに決まっていて、移し替えたぶんだけ動く。
  // 準価値は材料の取り置きと測定。残りが無価値で、工程3だけ14秒と突出している。
  const VALUE = [22, 24, 30, 23, 21];
  const SEMI = [10, 11, 12, 10, 9];
  const NAMES = [
    S('1 木取り', '1 Cutting', '1 Pemotongan'),
    S('2 プレーナー', '2 Planing', '2 Penyerutan'),
    S('3 NC加工', '3 NC machining', '3 Pemesinan NC'),
    S('4 接着', '4 Glue-up', '4 Perekatan'),
    S('5 研削', '5 Sanding', '5 Pengamplasan')
  ];
  const setupMin = function (c) { return 45 * (1 - 0.73 * c.setup); };
  const warmMin = function (c) { return 40 * (1 - c.warm); };
  const chokoMin = function (n) { return 6 + n * 2.2; };
  function cycles(c) {
    const move = 8 * c.balance;
    const feed = 8 * (c.feed || 0);      // 工程3の材料待ちを断つ
    return [38 + move * 0.5, 41 + move * 0.5, 56 - move - feed, 39 + move * 0.5, 36 + move * 0.5];
  }
  // 各工程の 価値 / 準価値 / 無価値（秒）。合計はサイクルタイムに一致する。
  function split(c) {
    const move = 8 * c.balance, feed = 8 * (c.feed || 0);
    const ct = cycles(c);
    return ct.map(function (x, i) {
      const val = i === 2 ? VALUE[2] - move : VALUE[i] + move * 0.5;
      const semi = SEMI[i];
      return { ct: x, value: val, semi: semi, non: Math.max(0, x - val - semi) };
    });
  }
  // 標準が無いと、人によって手順が違うぶん、いちばん遅いやり方が混ざってネックが伸びる。
  // 整っている工程の割合だけ薄まる。
  const NOSTD_NECK = 0.06;
  const stdLevel = function () {
    const s2 = st();
    const d = (scen().stdDone || [true, false, false, true, false]);
    let n = 0;
    for (let i = 0; i < 5; i++) if (d[i] || (s2.stdMade && s2.stdMade[i])) n++;
    return n / 5;
  };
  const stdMissing = function () {
    const s2 = st();
    const d = (scen().stdDone || [true, false, false, true, false]);
    const out = [];
    for (let i = 0; i < 5; i++) if (!d[i] && !(s2.stdMade && s2.stdMade[i])) out.push(i);
    return out;
  };
  // 最初から整っている標準作業の割合。「改善前」はこの状態で流した日産。
  const stdLevel0 = function () {
    const d = (scen().stdDone || [true, false, false, true, false]);
    let n = 0;
    for (let i = 0; i < 5; i++) if (d[i]) n++;
    return n / 5;
  };
  function day(c, lv) {
    const L = lv == null ? 1 : lv;
    const ct = cycles(c).map(function (x) { return x * (1 + NOSTD_NECK * (1 - L)); });
    const neck = Math.max.apply(null, ct);
    let out = 700, avail = SHIFT, n = 1;
    for (let i = 0; i < 3; i++) {
      n = Math.max(1, Math.round(out / c.lot));
      avail = Math.max(60, SHIFT - setupMin(c) * n - warmMin(c) - chokoMin(n));
      out = Math.floor(avail * 60 / neck);
    }
    return {
      out: out, neck: neck, avail: avail, setups: n, ct: ct,
      setupTotal: setupMin(c) * n, warm: warmMin(c), choko: chokoMin(n),
      aRate: avail / SHIFT, pRate: (out * neck / 60) / avail, qRate: 0.98,
      balance: ct.reduce(function (s, x) { return s + x; }, 0) / (neck * PROC),
      lt: PROC * c.lot / out
    };
  }
  /* ---- 1日を8時間に割る ----
   * 段取り・立上げ・チョコ停が、どの時間に入るかで出来高が凹む。
   * 1日の合計は total のままなので、日や週でまとめた数は変わらない。
   * 変わるのは「1日のどこで止まっているか」が見えるようになることだけ。
   */
  function hoursOf(c, lv, total) {
    const d = day(c, lv);
    const lost = [];
    for (let i = 0; i < HOURS; i++) lost.push(0);
    lost[0] += d.warm;                                   // 立上げは朝いちばん
    for (let i = 0; i < d.setups; i++) {                 // 段取りはロットが替わるたび
      lost[Math.min(HOURS - 1, Math.floor(i * HOURS / Math.max(1, d.setups)))] += setupMin(c);
    }
    for (let i = 0; i < HOURS; i++) lost[i] += d.choko / HOURS;   // チョコ停はならす
    // 60分を超えたぶんは次の時間へあふれる
    for (let i = 0; i < HOURS; i++) {
      if (lost[i] > 60) { if (i + 1 < HOURS) lost[i + 1] += lost[i] - 60; lost[i] = 60; }
    }
    const am = lost.map(function (x) { return Math.max(0, 60 - x); });
    const sum = am.reduce(function (s, x) { return s + x; }, 0) || 1;
    const out = [];
    let acc = 0;
    for (let i = 0; i < HOURS; i++) {
      const v = i === HOURS - 1 ? total - acc : Math.round(total * am[i] / sum);
      out.push({ hr: i + 1, out: Math.max(0, v), lost: lost[i], avail: am[i] });
      acc += out[i].out;
    }
    return out;
  }
  // 1日の実績。条件どおりにいかない日があるので、少し散らす。
  function oneDay(cfg, dn, seed, std) {
    const r = WS.mulberry32(seed + dn * 2011);
    const base = day(cfg, std);
    // 標準が無いと日ごとの当たり外れも大きい
    const jitter = 1 + WS.randn(r) * (0.045 + 0.045 * (1 - (std == null ? 1 : std)));
    const hiccup = r() < 0.08 ? 0.86 : 1;          // 週に1日くらいは何かある
    const total = Math.max(50, Math.round(base.out * jitter * hiccup));
    return { out: total, hours: hoursOf(cfg, std, total) };
  }
  // 1週ぶんの日産。参考走行などで使う。
  function weekDays(cfg, w, seed, std) {
    const out = [];
    for (let i = 1; i <= DPW; i++) out.push(oneDay(cfg, (w - 1) * DPW + i, seed, std).out);
    return out;
  }
  const weekMean = function (a) { return a.reduce(function (s, x) { return s + x; }, 0) / a.length; };

  /* ================= 調査の棚 ================= */
  const SHOP = [
    { id: 'time', pt: 20, wk: 2,
      name: S('工程別の時間観測', 'Time study by process', 'Studi waktu per proses'),
      gain: S('5工程のサイクルタイムが出る。山積み図とネックが見える',
        'Gives the cycle time of all five processes, so the yamazumi and the bottleneck become visible',
        'Memberi waktu siklus kelima proses, sehingga yamazumi dan bottleneck terlihat') },
    { id: 'stop', pt: 15, wk: 2,
      name: S('停止の記録（段取り・立上げ・チョコ停）', 'Log the stops (setup, warm-up, minor stops)', 'Catat penghentian (setup, pemanasan, henti sesaat)'),
      gain: S('1日480分のうち、何に何分使っているかが分かる',
        'Shows where the 480 minutes of a day actually go',
        'Menunjukkan untuk apa saja 480 menit sehari sebenarnya terpakai') },
    { id: 'setup', pt: 25, wk: 3,
      name: S('段取りの中身を撮って分ける', 'Film the changeover and split it', 'Rekam pergantian dan pisahkan'),
      gain: S('45分の段取りの、どこが内段取りでどこが外段取りかが分かる',
        'Tells you which parts of the 45-minute changeover are internal and which can be external',
        'Memberi tahu bagian mana dari pergantian 45 menit yang internal dan mana yang bisa eksternal') },
    { id: 'wip', pt: 10, wk: 2,
      name: S('工程間の仕掛を数える', 'Count the work in process', 'Hitung WIP (barang dalam proses)'),
      gain: S('リードタイム ＝ 仕掛 ÷ 1日の産出 が読めるようになる',
        'Lets you read lead time = work in process ÷ daily output',
        'Memungkinkan membaca lead time = WIP ÷ output harian') },
    { id: 'attr', pt: 10, wk: 1,
      name: S('担当者と機械の記録', 'Log operators and machines', 'Catat operator dan mesin'),
      gain: S('人と機械で層別できるようになる', 'Lets you stratify by person and machine', 'Memungkinkan stratifikasi menurut orang dan mesin') },
    { id: 'stdaudit', pt: 5, wk: 1,
      name: S('標準作業の棚卸し', 'Take stock of the standard work', 'Inventarisasi kerja standar'),
      gain: S('5工程のどこに標準作業があり、どこに無いかを調べる。無い工程は、調べてはじめて手を入れられる',
        'Find which of the five processes have standard work and which do not. Until you have looked, you cannot fix the ones that do not',
        'Cari proses mana dari kelima yang punya kerja standar dan mana yang tidak. Sebelum melihat, Anda tidak dapat memperbaiki yang tidak punya') },
    { id: 'work', pt: 20, wk: 3,
      name: S('価値作業分析（作業を3つに割る）', 'Value-work analysis (split the work three ways)', 'Analisis pekerjaan bernilai (bagi kerja menjadi tiga)'),
      gain: S('各工程の時間を 価値作業・準価値作業・無価値作業 に割る。どこで待っているかが分かり、待ちを断つ手が使えるようになる',
        'Splits each process time into value, semi-value and non-value work. It shows where the waiting is, and unlocks the move that ends it',
        'Membagi waktu tiap proses menjadi pekerjaan bernilai, semi-bernilai, dan tanpa nilai. Menunjukkan di mana terjadi waktu tunggu, dan membuka langkah untuk mengakhirinya') },
    { id: 'trial', pt: 25, wk: 3,
      name: S('試験日を設けて条件を振る', 'Set aside trial days and vary the conditions', 'Sediakan hari uji dan variasikan kondisi'),
      gain: S('段取り時間 × ロットサイズ の4通りを、本番を止めずに試す',
        'Tries four combinations of changeover time by lot size without stopping production',
        'Mencoba empat kombinasi waktu pergantian dan ukuran lot tanpa menghentikan produksi') }
  ];

  /* ================= 日常点検の候補 ================= */
  const CONTROLS = [
    { id: 'setup', ok: true, label: S('外段取りの準備完了を始業前に確認する', 'Confirm the external setup is ready before the shift', 'Pastikan setup eksternal siap sebelum shift') },
    { id: 'warm', ok: true, label: S('予熱タイマーの作動を毎朝確認する', 'Check the warm-up timer every morning', 'Periksa pengatur waktu pemanasan setiap pagi') },
    { id: 'lot', ok: true, label: S('ロットサイズを掲示して守る', 'Post the lot size and keep to it', 'Pasang ukuran lot dan patuhi') },
    { id: 'wip', ok: true, label: S('工程間の置き数に上限を決める', 'Cap the work in process between processes', 'Batasi WIP antar proses') },
    { id: 'push', ok: false, label: S('朝礼で増産を呼びかける', 'Call for more output at the morning meeting', 'Serukan peningkatan output di rapat pagi') },
    { id: 'ot', ok: false, label: S('足りない分は残業でしのぐ', 'Cover the shortfall with overtime', 'Tutup kekurangan dengan lembur') }
  ];
  const PICK_N = 3;

  const cfgKey = function (c, lv) { return c.lot + '/' + c.setup + '/' + c.warm + '/' + c.balance + '/' + (c.feed || 0) + '/s' + Math.round((lv || 0) * 5); };

  /* ================= 初期化と週送り ================= */
  function init(s) {
    s.cfg = Object.assign({}, BASE);
    s.screen = 'prologue';
    s.days = [];
    s.hours = [];
    s.dayHist = [];
    s.day = 0;
    s.tab = 'trend';
    s.stdMade = {};
  }
  /* 1日を進める。手を打つ単位は1日なので、翌日から新しいやり方が効く。 */
  function advanceDay(ev) {
    const s = st();
    const dn = s.day + 1, w = Math.ceil(dn / DPW);
    const sc = scen();
    const lv = stdLevel(), k = cfgKey(s.cfg, lv);
    const one = oneDay(s.cfg, dn, sc.seed, lv);
    s.day = dn;
    s.week = w;
    s.days = s.days.concat([{ w: w, dn: dn, d: dn - (w - 1) * DPW, out: one.out, k: k }]);
    s.hours = (s.hours || []).concat(one.hours.map(function (o) {
      return { w: w, dn: dn, hr: o.hr, out: o.out, lost: o.lost, k: k };
    }));
    s.dayHist = (s.dayHist || []).concat([{ dn: dn, w: w, d: dn - (w - 1) * DPW,
      rate: one.out, shown: one.out, k: k, act: s.actToday || null, note: ev || null }]);
    s.actToday = null;
    if (dn % DPW === 0) {
      const wk = s.days.filter(function (x) { return x.w === w; }).map(function (x) { return x.out; });
      s.hist.push({ w: w, rate: weekMean(wk), shown: weekMean(wk), k: k,
        act: s.actThisWeek || null, note: s.noteThisWeek || null });
      s.actThisWeek = null;
      s.noteThisWeek = null;
    }
    if (ev) s.noteThisWeek = ev;
    if (s.pendingStd != null) {
      s.pendingStdLeft = (s.pendingStdLeft == null ? DPW : s.pendingStdLeft) - 1;
      if (s.pendingStdLeft <= 0) {
        s.stdMade = s.stdMade || {};
        s.stdMade[s.pendingStd] = true;
        s.stdFrom = s.stdFrom == null ? w : s.stdFrom;
        s.pendingStd = null;
        s.pendingStdLeft = null;
        WS.surveys().forEach(function (sv) { sv.voided = true; });
      }
    }
    WS.surveys().forEach(function (sv) {
      sv.left -= 1;
      if (sv.left > 0) return;
      if (!sv.voided) {
        s.bought[sv.id] = w;
        const sh = SHOP.filter(function (x) { return x.id === sv.id; })[0];
        WS.addNote('sys', S('「' + t(sh.name) + '」の結果が出た', 'Results are in for “' + t(sh.name) + '”', 'Hasil “' + t(sh.name) + '” sudah keluar'), { survey: sv.id });
      } else {
        s.flags.voided = (s.flags.voided || 0) + 1;
      }
    });
    s.surveys = WS.surveys().filter(function (sv) { return sv.left > 0; });
    save();
  }
  // 1週ぶん（5日）まとめて流す
  function advance(ev) {
    for (let i = 0; i < DPW && st().day < DAYS; i++) advanceDay(i === 0 ? ev : null);
  }

  /* ================= 画面の部品 ================= */
  function hud() {
    const s = st();
    const d = day(s.cfg, stdLevel());
    const cur = s.hist.length ? s.hist[s.hist.length - 1].shown : null;
    return h('div.g-hud', null,
      meter(S('日', 'Day', 'Hari'), s.day + ' / ' + DAYS,
        S('第' + Math.max(1, s.week) + '週 ' + Math.max(1, s.day - (Math.max(1, s.week) - 1) * DPW) + '日目',
          'week ' + Math.max(1, s.week) + ', day ' + Math.max(1, s.day - (Math.max(1, s.week) - 1) * DPW),
          'minggu ' + Math.max(1, s.week) + ', hari ' + Math.max(1, s.day - (Math.max(1, s.week) - 1) * DPW)),
        s.day > DAYS - 15 ? 'warn' : '', s.day / DAYS),
      meter(S('調査ポイント', 'Survey points', 'Poin survei'), s.pt + ' / ' + PT0, null, s.pt < 20 ? 'warn' : '', s.pt / PT0),
      meter(S('今週の日産', 'Output this week', 'Output minggu ini'),
        cur == null ? '—' : Math.round(cur) + t(S('個/日', ' pcs/day', ' pcs/hari')),
        S('需要 ' + DEMAND + '個/日', 'demand ' + DEMAND + ' pcs/day', 'permintaan ' + DEMAND + ' pcs/hari'),
        cur == null ? '' : (cur >= DEMAND ? 'good' : cur >= DEMAND * 0.92 ? 'warn' : 'bad')),
      meter(S('リードタイム', 'Lead time', 'Lead time'),
        has('wip') ? n1(d.lt) + t(S('日', ' days', ' hari')) : '—',
        has('wip') ? null : S('仕掛を数えていない', 'work in process not counted', 'WIP belum dihitung')),
      meter(S('標準作業', 'Standard work', 'Kerja standar'),
        Math.round(stdLevel() * 5) + ' / 5',
        has('stdaudit')
          ? (stdMissing().length
            ? S('未整備 ' + stdMissing().map(function (i) { return t(NAMES[i]); }).join('、'),
              'missing: ' + stdMissing().map(function (i) { return t(NAMES[i]); }).join(', '),
              'belum ada: ' + stdMissing().map(function (i) { return t(NAMES[i]); }).join(', '))
            : S('5工程そろった', 'all five in place', 'kelimanya ada'))
          : S('どの工程に無いか調べていない', 'you have not looked at which are missing', 'Anda belum melihat mana yang belum ada'),
        stdLevel() >= 1 ? 'good' : stdLevel() >= 0.6 ? 'warn' : 'bad'));
  }

  const EVENTS = {
    4: { who: 'boss', text: S('1か月たった。**まだ需要に届いていないな。**このままだと来月は外注に出すことになる。',
      'A month gone. **Still short of demand.** Keep this up and next month goes to a subcontractor.',
      'Sebulan berlalu. **Masih kurang dari permintaan.** Bila terus begini, bulan depan diserahkan ke subkontraktor.') },
    7: { who: 'lead', text: S('今週は刃物の当たりが悪くて、1日止めました。**来週には戻ります。**',
      'A bad batch of cutters cost us a day this week. **It should be back next week.**',
      'Pisau yang buruk membuat kami kehilangan sehari minggu ini. **Semestinya kembali minggu depan.**') },
    11: { who: 'lead', text: S('工程3が遅いんですよ。**あそこに人を1人足しましょう。**',
      'Process 3 is the slow one. **Let us put another body on it.**',
      'Proses 3 yang lambat. **Mari tambahkan satu orang di sana.**') },
    14: { who: 'boss', text: S('来月の受注は決まった。**あと2週で答えを出してくれ。**',
      'Next month’s orders are booked. **Two weeks to an answer.**',
      'Pesanan bulan depan sudah dipastikan. **Dua minggu untuk sebuah jawaban.**') }
  };

  /* ================= 画面 ================= */
  function prologue() {
    const sc = scen();
    const v = h('div');
    v.appendChild(h('h2', { text: t(sc.name) }));
    v.appendChild(h('p.muted', { text: t(sc.brief) }));
    // いま出ている数は、標準作業が初期状態(3/5)のときにラインが出す数。台詞に決め打ちの数字を書くと盤面と食い違う。
    const cur0 = day(BASE, stdLevel0()).out;
    v.appendChild(talk('boss', S('受注は1日' + DEMAND + '個ある。**うちは' + cur0 + '個しか出ていない。**残りは外注に流していて、その分は赤字だ。ラインを増やす金は無い。いまの5工程で' + DEMAND + 'を出してくれ。',
      'The orders are ' + DEMAND + ' a day. **We ship ' + cur0 + '.** The rest goes to a subcontractor at a loss. There is no money for another line. Get ' + DEMAND + ' out of the five processes we have.',
      'Pesanannya ' + DEMAND + ' per hari. **Kami mengirim ' + cur0 + '.** Sisanya ke subkontraktor dengan merugi. Tidak ada dana untuk lini lain. Keluarkan ' + DEMAND + ' dari lima proses yang ada.')));
    v.appendChild(talk('lead', S('工程3が遅いんです。あそこがネックですよ。人を足すか、機械をもう1台入れるかです。',
      'Process 3 is the slow one. That is the bottleneck. Either another person on it, or another machine.',
      'Proses 3 yang lambat. Itulah bottleneck-nya. Entah tambah orang di sana, atau tambah mesin.')));
    v.appendChild(talk('eng', S('**それは「工程3が遅い」のか、「工程3で待っている」のか**、まだ分けられていません。1日480分のうち、何に何分使っているかも数えていません。',
      '**We have not separated “process 3 is slow” from “process 3 is waiting”.** Nor have we counted where the 480 minutes of a day actually go.',
      '**Kami belum memisahkan “proses 3 lambat” dari “proses 3 menunggu”.** Kami juga belum menghitung untuk apa saja 480 menit sehari sebenarnya terpakai.')));
    v.appendChild(talk('eng', S('それと、**標準作業がありません。**同じ工程でも、人によって順序も持ち替えも違います。'
      + 'いちばん遅いやり方が混ざるので、**時間観測をしてもサイクルタイムが締まらず、ネックがどこかも決まりません。**',
      'And **there is no standard work.** Within the same process, the order of steps and the way the part is handled differ by person. '
      + 'The slowest way creeps in, so **a time study will not settle the cycle time, and the bottleneck will not stay put.**',
      'Selain itu, **tidak ada kerja standar.** Dalam proses yang sama, urutan langkah dan cara memegang part berbeda menurut orangnya. '
      + 'Cara kerja yang paling lambat ikut tercampur, sehingga **studi waktu tidak akan memantapkan waktu siklus, dan bottleneck tidak akan tetap di tempatnya.**')));
    v.appendChild(talk('boss', S('16週、80日やる。調査の予算は90ポイント。**1日ごとに手を打てる。**最後に、何がネックでどう固めるかを聞かせてくれ。',
      'You have sixteen weeks, eighty working days, and ninety survey points. **You can act every day.** At the end, tell me what the bottleneck was and how you will hold it.',
      'Anda punya enam belas minggu, delapan puluh hari kerja, dan sembilan puluh poin survei. **Anda dapat bertindak setiap hari.** Di akhir, katakan apa bottleneck-nya dan bagaimana Anda mempertahankannya.')));
    const b = btn(S('的を決める', 'Set the target', 'Tetapkan sasaran'), function () { st().screen = 'define'; save(); route(); }, 'btn-primary');
    b.style.marginTop = '12px';
    v.appendChild(b);
    show(v);
  }

  const TARGETS = [
    { id: 'ot', value: 440, pts: 0,
      label: S('残業で30個ぶん積み増す', 'Add thirty pieces with overtime', 'Tambah 30 pcs dengan lembur'),
      why: S('時間を買うだけで、1個あたりのコストは上がる。ラインは何も変わらない',
        'Buying time. The cost per piece rises and the line itself does not change',
        'Membeli waktu. Biaya per unit naik dan lininya sendiri tidak berubah') },
    { id: 'demand', value: DEMAND, pts: 3,
      label: S('需要の460個に合わせる', 'Meet the demand of 460', 'Penuhi permintaan 460'),
      why: S('外注を止められる。ただし「そこが限界か」は分からないまま',
        'It ends the subcontracting. It still says nothing about whether that is the ceiling',
        'Itu menghentikan subkontrak. Namun tetap tidak menyatakan apakah itu batasnya') },
    { id: 'theory', value: 562, pts: 5,
      label: S('理論値から逆算する', 'Work back from the theoretical value', 'Bekerja mundur dari nilai teoretis'),
      why: S('止まらず待たずに流れたときの数。480分 ÷ ネック51.2秒 ＝ 562個。ここを④に置く',
        'What the line makes if nothing stops and nothing waits: 480 min ÷ 51.2 s = 562 pieces. That is ④',
        'Yang dihasilkan lini bila tidak ada yang berhenti dan tidak ada yang menunggu: 480 menit ÷ 51,2 detik = 562 pcs. Itulah ④') }
  ];
  const TARGET_WHY = {
    ot: S('残業で買った数', 'bought with overtime', 'dibeli dengan lembur'),
    demand: S('受注に合わせた数', 'matched to the orders', 'disesuaikan dengan pesanan'),
    theory: S('理論値から逆算した数', 'worked back from the theoretical value', 'dihitung mundur dari nilai teoretis')
  };

  function define() {
    const v = h('div');
    v.appendChild(h('h2', { text: t(S('第0週：的を決める', 'Week 0: set the target', 'Minggu 0: tetapkan sasaran')) }));
    v.appendChild(talk('eng', S('どこを狙うかで、このあと何を調べるかが変わります。**需要に合わせるのか、ラインの限界を狙うのか。**',
      'What you aim at decides what you will go looking for. **Match the orders, or go for what the line can do.**',
      'Apa yang Anda bidik menentukan apa yang akan Anda cari. **Penuhi pesanan, atau kejar batas kemampuan lini.**')));
    const acts = h('div.g-acts');
    TARGETS.forEach(function (o) {
      const lab = t(o.label) + t(S('　→ ', '  →  ', '  →  ')) + o.value + t(S('個/日', ' pcs/day', ' pcs/hari'));
      acts.appendChild(act(S(lab, lab, lab), o.why, null, function () {
        st().target = { id: o.id, value: o.value, pts: o.pts };
        st().screen = 'board'; save(); route();
      }));
    });
    v.appendChild(acts);
    show(v);
  }

  /* ---- 自分のデータから読む実績 ----
   * やり方の画面は模型の「見込み」を出さない。出すのは、そのやり方で実際に流した日の実績だけ。 */
  function triedStats(cfg) {
    const s = st();
    const k = cfgKey(cfg, stdLevel());
    const rows = (s.days || []).filter(function (x) { return x.k === k; });
    const mean = rows.length ? rows.reduce(function (a, x) { return a + x.out; }, 0) / rows.length : null;
    return { n: rows.length, k: k, out: mean };
  }
  function baseStats() {
    const s = st();
    if (!(s.days || []).length) return { n: 0, out: null };
    const k = s.days[0].k;
    const rows = s.days.filter(function (x) { return x.k === k; });
    return { n: rows.length, k: k, out: rows.reduce(function (a, x) { return a + x.out; }, 0) / rows.length };
  }
  Object.assign(P, { BASE: BASE, BEST: BEST, CONTROLS: CONTROLS, DEMAND: DEMAND, EVENTS: EVENTS, NAMES: NAMES, PICK_N: PICK_N, PROC: PROC, SHIFT: SHIFT, SHOP: SHOP, TARGET_WHY: TARGET_WHY, advance: advance, advanceDay: advanceDay, cfgKey: cfgKey, cycles: cycles, day: day, define: define, hoursOf: hoursOf, hud: hud, init: init, oneDay: oneDay, prologue: prologue, setupMin: setupMin, split: split, stdLevel: stdLevel, stdMissing: stdMissing,
    stdLevel0: stdLevel0, triedStats: triedStats, baseStats: baseStats });
})();
