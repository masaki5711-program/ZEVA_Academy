/* 現場再建記 — 盤面と、週ごとに打つ手の画面
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
  const BEST = G.BEST;
  const KNOBS = G.KNOBS;
  const PICK_N = G.PICK_N;
  const PROCS = G.PROCS;
  const SCOPES = G.SCOPES;
  const SHOCK_WEEK = G.SHOCK_WEEK;
  const SHOP = G.SHOP;
  const advance = G.advance;
  const advanceDay = G.advanceDay;
  const canTouch = G.canTouch;
  const cfgKey = G.cfgKey;
  const costOf = G.costOf;
  const last4 = G.last4;
  const lossMan = G.lossMan;
  const man = G.man;
  const mcMean = G.mcMean;
  const rateOf1 = G.rateOf1;
  const rateOfLots = G.rateOfLots;
  const reference = G.reference;
  const scopeOf = G.scopeOf;
  const shopById = G.shopById;
  const simRows = G.simRows;
  const stdLevel = G.stdLevel;
  const stdMissing = G.stdMissing;
  const vt = G.vt;
  const axShow = G.axShow;
  /* ---- 日ごとの折れ線。手を打つ単位が1日なので、盤面もその粒度で見せる ---- */
  function chart() {
    const W = 680, H = 190, padL = 38, padB = 26, padT = 12, padR = 10;
    const dh = st().dayHist || [];
    const vals = dh.map(function (x) { return x.shown; });
    const hi = Math.max(20, Math.ceil(Math.max.apply(null, vals.concat([12])) / 5) * 5);
    const x = function (d) { return padL + (d - 1) / Math.max(DAYS - 1, 1) * (W - padL - padR); };
    const y = function (v) { return padT + (1 - Math.max(0, Math.min(hi, v)) / hi) * (H - padT - padB); };
    let g = '';
    for (let v = 0; v <= hi; v += 5) {
      g += '<line class="grid-line" x1="' + padL + '" x2="' + (W - padR) + '" y1="' + y(v) + '" y2="' + y(v) + '"/>';
      g += '<text x="' + (padL - 6) + '" y="' + (y(v) + 3) + '" text-anchor="end">' + v + '%</text>';
    }
    // 週の切れ目に薄い縦線を入れて、日と週の両方が読めるようにする
    for (let w = 1; w <= WEEKS; w++) {
      const dx = x((w - 1) * DPW + 1);
      g += '<line class="grid-line" x1="' + dx + '" x2="' + dx + '" y1="' + padT + '" y2="' + (H - padB) + '"/>';
      if (w % 3 === 1) g += '<text x="' + dx + '" y="' + (H - 8) + '" text-anchor="middle">' + w + '</text>';
    }
    if (st().target) {
      g += '<line x1="' + padL + '" x2="' + (W - padR) + '" y1="' + y(st().target.value) + '" y2="' + y(st().target.value)
        + '" stroke="var(--green)" stroke-width="2" stroke-dasharray="6 4"/>';
    }
    if (dh.length) {
      g += '<polyline points="' + dh.map(function (p) { return x(p.dn) + ',' + y(p.shown); }).join(' ')
        + '" fill="none" stroke="var(--navy)" stroke-width="1.8"/>';
      dh.forEach(function (p) {
        if (!p.note && dh.length > 30) return;   // 点が増えたら、印のある日だけ丸を出す
        g += '<circle cx="' + x(p.dn) + '" cy="' + y(p.shown) + '" r="' + (p.note ? 5 : 2.6)
          + '" fill="' + (p.note ? 'var(--red)' : 'var(--navy)') + '"/>';
      });
      // 手帳を書いた日は琥珀の輪。何を考えてどう動いたかが、線の上で辿れる。
      dh.forEach(function (p) {
        if (!WS.memoOn(p.dn)) return;
        g += '<circle cx="' + x(p.dn) + '" cy="' + y(p.shown) + '" r="6.5" fill="none" stroke="var(--amber)" stroke-width="2"/>';
      });
      // 週の平均も重ねる。日で見ると荒いが、束ねると動きが見える。
      if (st().hist.length > 1) {
        g += '<polyline points="' + st().hist.map(function (p) {
          return x((p.w - 1) * DPW + (DPW + 1) / 2) + ',' + y(p.shown);
        }).join(' ') + '" fill="none" stroke="var(--green)" stroke-width="2.4"/>';
      }
    }
    return h('div.g-chart', null,
      h('h4', { text: t(S('日ごとの不良率', 'Defect rate by day', 'Tingkat cacat per hari')) }),
      h('div', { html: '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img">' + g + '</svg>' }),
      h('div.muted', { style: { fontSize: '11.5px', marginTop: '4px' },
        text: t(has('msa')
          ? S('紺が1日（' + (HOURS * PIECES) + '個）ごと、緑が週（' + (DPW * HOURS * PIECES) + '個）ごとの平均。横の目盛りは週。赤い点は何かがあった日、琥珀の輪は手帳を書いた日。',
            'Navy is each day (' + (HOURS * PIECES) + ' pieces), green the weekly mean (' + (DPW * HOURS * PIECES) + ' pieces). The axis is numbered by week. A red dot marks a day when something happened; an amber ring, a day you wrote in the notebook.',
            'Biru tua adalah tiap hari (' + (HOURS * PIECES) + ' pcs), hijau rata-rata mingguan (' + (DPW * HOURS * PIECES) + ' pcs). Sumbunya bernomor minggu. Titik merah menandai hari yang ada kejadiannya; lingkaran kuning, hari Anda menulis di buku catatan.')
          : S('紺が1日（' + (HOURS * PIECES) + '個）ごと、緑が週ごとの平均。測定を確かめていないので、どちらにも判定のゆれが乗っている。',
            'Navy is each day (' + (HOURS * PIECES) + ' pieces), green the weekly mean. You have not checked the measurement, so both carry the scatter of the judgement.',
            'Biru tua adalah tiap hari (' + (HOURS * PIECES) + ' pcs), hijau rata-rata mingguan. Anda belum memeriksa pengukuran, jadi keduanya membawa variasi penilaian.')) }));
  }

  /* ---- プロローグ ---- */
  function screenPrologue() {
    const sc = scen();
    const v = h('div');
    v.appendChild(h('h2', { text: t(sc.name) }));
    v.appendChild(h('p.muted', { text: t(sc.brief) }));
    // 工程によって症状も言い分も変わるので、掴みの3つはシナリオが持てるようにする。
    // 持っていなければ木工の言い分に落ちる。
    (sc.intro || [
      ['boss', S('よく来てくれた。このラインは3年前からこの調子でね。寸法が図面から外れる、接着が付かない、研削のあとの面が荒れる。**3つとも別々の工程の話**で、それぞれ担当を付けてある。',
        'Glad you came. The line has been like this for three years. Parts out of tolerance, bonds that fail, a rough surface after sanding. **Three separate processes, three separate problems**, and each has its own owner.',
        'Senang Anda datang. Lini ini sudah begini selama tiga tahun. Part di luar toleransi, rekatan yang gagal, permukaan kasar setelah pengamplasan. **Tiga proses terpisah, tiga masalah terpisah**, masing-masing dengan penanggung jawabnya.')],
      ['lead', S('担当としては、はっきり言って人の問題ですよ。Bさんの日は数字が悪い。配置を変えればいい。',
        'If you ask me, it is a people problem. The numbers are worse on B’s days. Move him and it is done.',
        'Kalau menurut saya, ini masalah orang. Angkanya lebih buruk pada hari B. Pindahkan dia, selesai.')],
      ['eng', S('わたしは保留にしています。**その「悪い日」の数え方が、まだ確かめられていない**ので。',
        'I am holding off. **We have never checked how those bad days are counted.**',
        'Saya belum mengambil kesimpulan. **Kita belum pernah memeriksa bagaimana hari-hari buruk itu dihitung.**')]
    ]).forEach(function (o) { v.appendChild(talk(o[0], o[1])); });
    v.appendChild(talk('eng', S('それと、**この工程にはまだ標準がありません。**同じ品物でも、誰が作るかで手順が違います。'
      + 'このまま測ると、条件の差と手順の差が混ざったものを見ることになります。',
      'And **this process has no standard.** The same part is built differently depending on who builds it. '
      + 'Measure it as it is and you will be looking at the difference between conditions mixed with the difference between methods.',
      'Selain itu, **proses ini belum punya standar.** Part yang sama dibuat berbeda tergantung siapa yang membuatnya. '
      + 'Ukur apa adanya dan Anda akan melihat perbedaan kondisi bercampur dengan perbedaan metode.')));
    v.appendChild(talk('boss', S('16週、80日やる。調査の予算は90ポイント。**1日ごとに手を打てる。**最後に、何が原因でどう固めるかを聞かせてくれ。',
      'You have sixteen weeks, eighty working days, and ninety survey points. **You can act every day.** At the end, tell me what the cause was and how you will hold it.',
      'Anda punya enam belas minggu, delapan puluh hari kerja, dan sembilan puluh poin survei. **Anda dapat bertindak setiap hari.** Di akhir, katakan apa penyebabnya dan bagaimana Anda mempertahankannya.')));
    const b = btn(S('現場を見に行く', 'Go and look at the floor', 'Pergi melihat lantai produksi'), function () { st().screen = 'recon'; save(); route(); }, 'btn-primary');
    b.style.marginTop = '12px';
    v.appendChild(b);
    show(v);
  }

  /* ================= データが無い状態の調査 ================= */
  const RECON0 = [
    { id: 'walk', days: 1, pt: 0,
      name: S('現場を1日歩く', 'Spend a day on the floor', 'Habiskan sehari di lantai produksi'),
      find: S('乾燥から出てきた材に、手で触れて分かるほど湿っているものが混じっている。'
        + 'NC加工の前で材が積まれて待っている。研削の作業者が「日によって全然ちがう」と言う。',
        'Some of the stock coming out of the kiln is damp enough to feel by hand. Material sits waiting in front of the NC. '
        + 'The sander says it is “completely different depending on the day”.',
        'Sebagian material yang keluar dari kiln cukup lembap untuk dirasakan dengan tangan. Material menumpuk menunggu di depan NC. '
        + 'Operator pengamplasan bilang “sangat berbeda tergantung harinya”.') },
    { id: 'files', days: 0, pt: 0,
      name: S('過去の月報を読む', 'Read the past monthly reports', 'Baca laporan bulanan lampau'),
      find: S('月ごとの不良率は12〜16%の間で上下している。冬に高く、梅雨どきにも高い。'
        + '3年前に一度10%まで下がった月があるが、理由は書かれていない。',
        'The monthly defect rate swings between 12 and 16 per cent, high in winter and high again in the rainy season. '
        + 'One month three years ago it fell to 10 per cent; no reason is recorded.',
        'Tingkat cacat bulanan berfluktuasi antara 12 dan 16 persen, tinggi di musim dingin dan tinggi lagi di musim hujan. '
        + 'Satu bulan tiga tahun lalu turun ke 10 persen; alasannya tidak dicatat.') },
    { id: 'ask', days: 2, pt: 5,
      name: S('3人に聞き取りをする', 'Interview three people', 'Wawancarai tiga orang'),
      find: S('**班長タケダ**「Bさんの日は数字が悪い。腕の問題です」。'
        + '**保全**「NCの刃は、折れるまで使うのが普通です。交換の記録は取っていません」。'
        + '**乾燥の担当**「在炉時間は24時間で決まっています。でも、材の入荷が遅れた日は短くして出します」。',
        '**Takeda, the line leader:** “The numbers are worse on B’s days. It is a skill problem.” '
        + '**Maintenance:** “We run an NC cutter until it breaks. We keep no record of changes.” '
        + '**The kiln operator:** “Twenty-four hours is the rule. But on days when the stock arrives late we cut it short and ship anyway.”',
        '**Takeda, leader lini:** “Angkanya lebih buruk pada hari B. Ini masalah keterampilan.” '
        + '**Pemeliharaan:** “Kami memakai pisau NC sampai patah. Kami tidak mencatat penggantiannya.” '
        + '**Operator kiln:** “Dua puluh empat jam adalah aturannya. Tapi pada hari material datang terlambat, kami persingkat dan tetap kirim.”') }
  ];
  // 見聞きしたことから思いつく手。歩けば湿った材(在炉時間)、聞けば在炉時間と刃の交換基準。
  const RECON_OPEN = { walk: ['kiln'], files: [], ask: ['kiln', 'toolLife'] };
  // 現場で見聞きすることは工程で変わる。呼び名と同じく、シナリオが持てるようにする。
  const RECON = function () {
    return RECON0.map(function (o) { return Object.assign({}, o, { find: vt('recon.' + o.id, o.find) }); });
  };

  function screenRecon() {
    const v = h('div');
    v.appendChild(h('h2', { text: t(S('着任：データが無いところから', 'Day one: starting with no data', 'Hari pertama bertugas: memulai tanpa data')) }));
    v.appendChild(talk('eng', S('**まだ何も測っていません。**この段階でできるのは、見ること、読むこと、聞くことです。'
      + 'ここで見た形が、あとで何を測るかを決めます。順番を逆にすると、測ってから「何のために測ったのか」を考えることになります。',
      '**Nothing has been measured yet.** At this stage you can look, read and ask. '
      + 'What you see here decides what you will measure later. Do it the other way round and you will be working out afterwards what the measurement was for.',
      '**Belum ada yang diukur.** Pada tahap ini Anda bisa melihat, membaca, dan bertanya. '
      + 'Apa yang Anda lihat di sini menentukan apa yang akan Anda ukur nanti. Bila urutannya dibalik, Anda baru memikirkan “untuk apa ini diukur” setelah selesai mengukur.')));
    v.appendChild(h('div.g-hud', null,
      meter(S('調査ポイント', 'Survey points', 'Poin survei'), st().pt + ' / ' + PT0),
      meter(S('日', 'Day', 'Hari'), st().day + ' / ' + DAYS)));
    RECON().forEach(function (o) {
      const done = st().recon && st().recon[o.id];
      const box = h('div.g-shop', { style: { marginBottom: '10px' } },
        h('div.g-shop-row', null,
          h('div.txt', null, h('b', { text: t(o.name) }),
            done ? h('span', { html: md(t(o.find)) })
              : h('span', { text: t(S('まだ見ていない', 'not yet', 'belum')) })),
          h('div.buy', null,
            h('span.price', { text: (o.pt ? o.pt + t(S(' pt ・ ', ' pt · ', ' poin · ')) : '') + o.days + t(S('日', ' day(s)', ' hari')) }),
            done ? h('span.chip.tone-green', { text: t(S('済', 'done', 'selesai')) })
              : btn(S('やる', 'Do it', 'Lakukan'), function () {
                if (st().pt < o.pt) return;
                st().pt -= o.pt;
                st().recon = st().recon || {};
                st().recon[o.id] = true;
                // 歩くのは1日、聞き取りは2日。以前は各1週(5日)で、盤面に入る前に2週が消えていた(実プレイで検出 2026-09-22)
                for (let i = 0; i < (o.days || 0); i++) advanceDay(null);
                // 見聞きしたことは手帳に残り、そこから条件が「思いつける」ようになる
                WS.addNote('sys', S('【' + t(o.name) + '】' + t(o.find), '[' + t(o.name) + '] ' + t(o.find), '[' + t(o.name) + '] ' + t(o.find)), { recon: o.id });
                (RECON_OPEN[o.id] || []).forEach(function (k) { G.unlock(k); });
                save(); route();
              }, 'btn-sm'))));
      v.appendChild(box);
    });
    const go = btn(S('スコープを決める', 'Set the scope', 'Tetapkan lingkup'), function () { st().screen = 'scope'; save(); route(); }, 'btn-primary');
    go.style.marginTop = '10px';
    v.appendChild(go);
    if (!st().recon || !Object.keys(st().recon).length) {
      v.appendChild(note([S('**何も見ずにスコープを決めることもできます。**ただし、そのスコープが当たっているかどうかは、最後まで分かりません。',
        '**You may set the scope without looking at anything.** You will just not know whether it was the right one until the end.',
        '**Anda boleh menetapkan lingkup tanpa melihat apa pun.** Anda hanya tidak akan tahu apakah itu tepat sampai akhir.')]));
    }
    show(v);
  }

  function screenScope() {
    const v = h('div');
    v.appendChild(h('h2', { text: t(S('スコープを決める', 'Set the scope', 'Tetapkan lingkup')) }));
    v.appendChild(talk('boss', S('どこまでを君の担当にする。**広く取れば上限は高いが、16週で終わらんかもしれん。**'
      + '狭く取れば確実だが、取れる金額もそのぶん小さい。それと、**担当の外で良くなった分は君の成果には数えない。**',
      'How far does your remit go? **Take it wide and the ceiling is high, but sixteen weeks may not be enough.** '
      + 'Take it narrow and it is safe, but the money is smaller. And **anything that improves outside your remit does not count as yours.**',
      'Sejauh mana tanggung jawab Anda? **Ambil lingkup yang luas dan plafonnya tinggi, tetapi enam belas minggu mungkin tidak cukup.** '
      + 'Ambil lingkup yang sempit dan itu aman, tetapi uangnya lebih kecil. Dan **apa pun yang membaik di luar tanggung jawab Anda tidak dihitung sebagai milik Anda.**')));
    const acts = h('div.g-acts');
    SCOPES.forEach(function (sc) {
      const knobNames = KNOBS().filter(function (k) { return sc.knobs.indexOf(k.k) >= 0; })
        .map(function (k) { return t(k.label); }).join(t(S('、', ', ', ', ')));
      const b = h('button.g-act', { type: 'button' },
        h('b', { text: t(sc.name) }),
        h('span', { text: t(sc.what) }),
        h('span', { style: { marginTop: '6px' }, text: t(S('動かせる条件：', 'Conditions you may move: ', 'Kondisi yang dapat digerakkan: ')) + knobNames }),
        h('span', { style: { marginTop: '4px', color: 'var(--text)' }, text: t(sc.risk) }));
      b.addEventListener('click', function () { st().scope = sc.id; st().screen = 'define'; save(); route(); });
      acts.appendChild(b);
    });
    v.appendChild(acts);
    v.appendChild(note([S('**スコープは、あとから広げられません。**16週のあいだ、ここで決めた範囲の中で戦います。',
      '**The scope cannot be widened later.** For sixteen weeks you work inside what you choose here.',
      '**Lingkup tidak dapat diperluas kemudian.** Selama enam belas minggu Anda bekerja di dalam apa yang Anda pilih di sini.')]));
    show(v);
  }

  /* ---- Define ---- */
  // 目標の置き方。4つの箱の④でも同じ文を使う。
  const TARGET_WHY = {
    last: S('去年の実績からの引き算', 'subtracted from last year', 'dikurangi dari tahun lalu'),
    boss: S('上から降りてきた数字', 'a number handed down', 'angka yang diturunkan dari atas'),
    theory: S('理論値から逆算した値', 'worked back from the theoretical value', 'dihitung mundur dari nilai teoretis')
  };
  function screenDefine() {
    const sc = scen();
    // 理論値は「どの条件も効いていないときに工程が持つ素の不良率」。隠れモデルの最良走行は見せない。
    const bestRate = G.theoryRate(sc);
    const baseRate = last4(reference(BASE, sc));
    const TARGETS = [
      { id: 'last', value: Math.round(baseRate * 0.8 * 10) / 10, pts: 0,
        label: S('去年の実績より2割良くする', 'Twenty per cent better than last year', 'Dua puluh persen lebih baik dari tahun lalu'),
        why: S('実績からの引き算。届く数字だが、どこまで下げられるかは分からないまま',
          'Subtracting from what happened. Reachable, but it never says how far down you could go',
          'Mengurangi dari yang sudah terjadi. Dapat dicapai, tetapi tak pernah menyatakan seberapa jauh bisa turun') },
      { id: 'boss', value: 5.0, pts: 2,
        label: S('工場長の言う5%', 'The 5% the plant manager asked for', '5% yang diminta manajer pabrik'),
        why: S('上から降りてきた数字。根拠が工程の側に無い',
          'A number handed down. Nothing in the process backs it',
          'Angka yang diturunkan dari atas. Tidak ada di proses yang mendukungnya') },
      { id: 'theory', value: Math.round(bestRate * 10) / 10, pts: 5,
        label: S('理論値から逆算する', 'Work back from the theoretical value', 'Bekerja mundur dari nilai teoretis'),
        why: S('条件がすべて良品範囲に入ったときの値を置き、そこを④とする。ZEVAはここから始める',
          'Take the value when every condition sits inside its good range and call that ④. This is where ZEVA starts',
          'Ambil nilai saat setiap kondisi berada dalam rentang baiknya dan sebut itu ④. Dari sinilah ZEVA dimulai') }
    ];
    const v = h('div');
    v.appendChild(h('h2', { text: t(S('第0週：的を決める', 'Week 0: set the target', 'Minggu 0: tetapkan sasaran')) }));
    v.appendChild(talk('eng', S('先に的を決めましょう。**どこを狙うかで、このあと何を調べるかが変わります。**',
      'Let us fix the target first. **What you aim at decides what you will go looking for.**',
      'Mari tetapkan sasaran dulu. **Apa yang Anda bidik menentukan apa yang akan Anda cari.**')));
    const acts = h('div.g-acts');
    TARGETS.forEach(function (o) {
      acts.appendChild(act(S(t(o.label) + '　→ ' + n1(o.value) + '%', t(o.label) + ' → ' + n1(o.value) + '%', t(o.label) + ' → ' + n1(o.value) + '%'),
        o.why, null,
        function () { st().target = { id: o.id, value: o.value, pts: o.pts }; st().screen = 'board'; save(); route(); }));
    });
    v.appendChild(acts);
    show(v);
  }

  /* ---- 標準作業を工程ごとに決める ---- */
  function screenStdWork() {
    const v = h('div');
    v.appendChild(hud());
    v.appendChild(talk('eng', S('標準の無い工程を1つ選んでください。**最適な手順を探すのではなく、全員が同じ手順で作る状態をつくります。**'
      + '1工程あたり5ポイントと1週。入れた週から、それ以前のデータは別の工程のものになります。',
      'Pick one process without a standard. **You are not looking for the best method, only for everyone building the same way.** '
      + 'Five points and one week per process. From the week it goes in, the data you already hold belongs to a different process.',
      'Pilih satu proses tanpa standar. **Anda tidak mencari metode terbaik, hanya agar semua membuat dengan cara yang sama.** '
      + 'Lima poin dan satu minggu per proses. Sejak minggu itu masuk, data yang sudah Anda miliki menjadi milik proses yang berbeda.')));
    const done = scen().stdDone || [true, false, false, false, true];
    if (WS.activeSurveys().length) {
      const left = Math.max.apply(null, WS.activeSurveys().map(function (sv) { return sv.left; }));
      v.appendChild(note([S('**いま調査が走っています（長いもので あと ' + left + ' 日）。**標準が仕上がる日にまだ走っていれば、その調査は読めなくなります。',
        '**A survey is running (the longest has ' + left + ' day(s) left).** If it is still running on the day the standard is finished, it becomes unreadable.',
        '**Survei sedang berjalan (yang terlama ' + left + ' hari lagi).** Bila masih berjalan pada hari standar selesai, survei itu menjadi tak terbaca.')]));
    }
    const box = h('div.g-shop');
    PROCS().forEach(function (nm, i) {
      const has0 = done[i], made = st().stdMade && st().stdMade[i];
      const ok = has0 || made;
      box.appendChild(h('div.g-shop-row', null,
        h('div.txt', null, h('b', { text: t(nm) }),
          h('span', { text: t(has0 ? S('もともと標準作業がある', 'had standard work already', 'sudah punya kerja standar')
            : made ? S('あなたが決めた', 'you wrote it', 'Anda yang menyusunnya')
              : S('標準が無い。人によって手順が違う', 'no standard: people work differently', 'tidak ada standar: orang bekerja berbeda')) })),
        h('div.buy', null,
          ok ? h('span.chip.tone-green', { text: '✓ ' + t(S('あり', 'in place', 'ada')) })
            : btn(S('決める（5pt・5日）', 'Write it (5 pt · 5 days)', 'Susun (5 poin · 5 hari)'), function () {
              if (st().pt < 5 || st().day + DPW > DAYS || st().pendingStd != null) return;
              st().pt -= 5;
              st().pendingStd = i;
              st().pendingStdLeft = DPW;
              st().actToday = 'std';
              st().actThisWeek = 'std';
              advanceDay(st().day % DPW === 0 ? (EVENTS[st().week + 1] || null) : null);
              st().screen = 'board'; save(); route();
            }, st().pt < 5 ? 'btn-sm btn-ghost' : 'btn-sm'))));
    });
    v.appendChild(box);
    const b = btn(S('盤面へ戻る', 'Back to the floor', 'Kembali ke papan permainan'), function () { st().screen = 'board'; save(); route(); });
    b.style.marginTop = '12px';
    v.appendChild(b);
    show(v);
  }

  /* ---- 育成の能力パラメータ ---- */
  function params() {
    const surveyPts = SHOP().reduce(function (a, x) { return a + (has(x.id) ? x.pt : 0); }, 0);
    const tabsSeen = Object.keys(st().seenTabs || {}).length;
    // 改善は「どれだけ動かしたか」ではなく「対象の不良をどれだけ減らしたか」。締めるほど上がる指標にはしない。
    // 直近1週(40ロット)の実績で見る。条件を変えた直後は 0 のままで、1週流すと動く。
    const b = G.baseStats();
    const recent = st().lots.slice(-HOURS * DPW);
    const rc = recent.length ? scopeOf().ys.reduce(function (a, y) { return a + rateOf1(recent, y); }, 0) : null;
    const imp = (b.n && rc != null && b.inRate > 0) ? Math.max(0, (b.inRate - rc) / b.inRate) : 0;
    const ctl = Object.keys(st().controls || {}).filter(function (k) { return st().controls[k]; }).length;
    const hyp = WS.notesOf('hyp').length, chk = WS.notesOf('check').length;
    return [
      { k: S('標準', 'Standard', 'Standar'), v: Math.round(stdLevel() * 100), c: 'var(--green)' },
      { k: S('測定', 'Measurement', 'Pengukuran'), v: Math.min(100, Math.round(surveyPts / 90 * 100)), c: 'var(--navy)' },
      { k: S('分析', 'Analysis', 'Analisis'), v: Math.min(100, Math.round(tabsSeen / 9 * 100)), c: 'var(--amber)' },
      { k: S('仮説', 'Hypotheses', 'Hipotesis'), v: Math.min(100, Math.round((Math.min(hyp, 3) * 20 + Math.min(chk, 2) * 20))), c: 'var(--amber)' },
      { k: S('改善', 'Improvement', 'Perbaikan'), v: Math.min(100, Math.round(imp * 100)), c: 'var(--red)' },
      { k: S('維持', 'Control', 'Kendali'), v: Math.round(ctl / PICK_N * 100), c: 'var(--green)' }
    ];
  }
  /* ---- 週ごとの出来事 ---- */
  const EVENTS = {
    4: { who: 'boss', text: S('1か月たった。**数字はまだ動いていないな。**動かすつもりはあるのか。',
      'A month gone. **Nothing has moved yet.** Do you intend to move it?',
      'Sebulan berlalu. **Belum ada yang bergerak.** Apakah Anda berniat menggerakkannya?') },
    7: { who: 'lead', text: S('今週の材、**雨に当たったやつが混ざってます。**数字は跳ねますよ。来週には戻るはずです。',
      'Some of this week’s stock **got rained on.** The number will jump. It should come back next week.',
      'Sebagian material minggu ini **terkena hujan.** Angkanya akan melonjak. Semestinya kembali minggu depan.') },
    11: { who: 'lead', text: S('ほら、やっぱりBさんの週が悪い。**配置、変えましょう。**',
      'See, B’s weeks are worse. **Let us move him.**',
      'Lihat, minggu B lebih buruk. **Mari pindahkan dia.**') },
    14: { who: 'boss', text: S('来月は予算会議だ。**あと2週で答えを出してくれ。**',
      'The budget meeting is next month. **Two weeks to an answer.**',
      'Rapat anggaran bulan depan. **Dua minggu untuk sebuah jawaban.**') }
  };

  /* ---- 盤面 ---- */
  function hud() {
    const dh = st().dayHist || [];
    const last = dh.length ? dh[dh.length - 1].shown : null;
    // 1日200個の値は毎日跳ねるので、色は週の平均で付ける。直近1日は添え書きにする。
    const wkRows = dh.filter(function (x) { return x.w === Math.max(1, st().week); });
    const cur = wkRows.length ? wkRows.reduce(function (s2, x) { return s2 + x.shown; }, 0) / wkRows.length : last;
    const cost = costOf(st().cfg);
    return h('div.g-hud', null,
      meter(S('日', 'Day', 'Hari'), st().day + ' / ' + DAYS,
        S('第' + Math.max(1, st().week) + '週 ' + Math.max(1, st().day - (Math.max(1, st().week) - 1) * DPW) + '日目',
          'week ' + Math.max(1, st().week) + ', day ' + Math.max(1, st().day - (Math.max(1, st().week) - 1) * DPW),
          'minggu ' + Math.max(1, st().week) + ', hari ' + Math.max(1, st().day - (Math.max(1, st().week) - 1) * DPW)),
        st().day > DAYS - 15 ? 'warn' : '', st().day / DAYS),
      meter(S('調査ポイント', 'Survey points', 'Poin survei'), st().pt + ' / ' + PT0, null, st().pt < 20 ? 'warn' : '', st().pt / PT0),
      meter(S('今週の不良率', 'Defect rate this week', 'Tingkat cacat minggu ini'),
        cur == null ? '—' : n1(cur) + '%',
        cur == null ? null : S('直近1日 ' + n1(last) + '%' + (st().target ? '　目標 ' + n1(st().target.value) + '%' : ''),
          'last day ' + n1(last) + '%' + (st().target ? ', target ' + n1(st().target.value) + '%' : ''),
          'hari terakhir ' + n1(last) + '%' + (st().target ? ', sasaran ' + n1(st().target.value) + '%' : '')),
        cur == null ? '' : (cur <= (st().target ? st().target.value : 2) * 1.2 ? 'good' : cur > 10 ? 'bad' : 'warn')),
      meter(S('毎月の追加コスト', 'Added monthly cost', 'Biaya bulanan tambahan'), t(yen(cost)), null, cost > 80 ? 'warn' : ''),
      meter(S('標準作業', 'Standard work', 'Kerja standar'),
        Math.round(stdLevel() * 5) + ' / 5',
        has('stdaudit')
          ? (stdMissing().length
            ? S('未整備 ' + stdMissing().map(function (i) { return t(PROCS()[i]); }).join('、'),
              'missing: ' + stdMissing().map(function (i) { return t(PROCS()[i]); }).join(', '),
              'belum ada: ' + stdMissing().map(function (i) { return t(PROCS()[i]); }).join(', '))
            : S('5工程そろった', 'all five in place', 'kelimanya ada'))
          : S('どの工程に無いか調べていない', 'you have not looked at which are missing', 'Anda belum melihat mana yang belum ada'),
        stdLevel() >= 1 ? 'good' : stdLevel() >= 0.6 ? 'warn' : 'bad'));
  }


  function screenBoard() {
    const v = h('div');
    v.appendChild(h('div.muted', { style: { fontSize: '12px', marginBottom: '8px' },
      text: (st().team ? st().team + sep() : '') + t(scen().name) }));
    v.appendChild(hud());
    v.appendChild(weekStrip());
    v.appendChild(paramPanel(params()));

    // 調査で新しく動かせるようになった条件は、一度だけ盤面で知らせる。根拠は手帳に残っている。
    if ((st().newKnobs || []).length) {
      const names = st().newKnobs.map(function (k) {
        const o = KNOBS().filter(function (x) { return x.k === k; })[0];
        return o ? t(o.label) : k;
      }).join(t(S('、', ', ', ', ')));
      v.appendChild(note([S('**新しく動かせる条件：' + names + '。**なぜ候補に上がったかは手帳に書いてあります。',
        '**New conditions you can move: ' + names + '.** Why each came up is written in the notebook.',
        '**Kondisi baru yang dapat digerakkan: ' + names + '.** Alasan tiap kondisi muncul ada di buku catatan.')]));
      st().newKnobs = [];
      save();
    }

    if (WS.surveys().length) {
      v.appendChild(note(WS.surveys().map(function (sv) {
        const s2 = shopById(sv.id);
        return sv.voided
          ? S('**' + t(s2.name) + '：条件を変えたため読めなくなりました。**残り' + sv.left + '日で終わりますが、結果は使えません。',
            '**' + t(s2.name) + ': unreadable, because a condition changed while it was running.** It ends in ' + sv.left + ' day(s), but the result is no use.',
            '**' + t(s2.name) + ': tidak terbaca, karena kondisi berubah saat berjalan.** Selesai dalam ' + sv.left + ' hari, tetapi hasilnya tidak berguna.')
          : S('**' + t(s2.name) + ' を実施中。**あと' + sv.left + '日で結果が出ます。この間に条件を変えると読めなくなります。',
            '**' + t(s2.name) + ' is running.** The result lands in ' + sv.left + ' day(s). Change a condition meanwhile and it becomes unreadable.',
            '**' + t(s2.name) + ' sedang berjalan.** Hasilnya tiba dalam ' + sv.left + ' hari. Mengubah kondisi sementara itu membuatnya tak terbaca.');
      })));
    }
    if (st().pendingStd != null) {
      v.appendChild(note([S('**初期標準をつくっています。**あと' + (st().pendingStdLeft == null ? DPW : st().pendingStdLeft) + '日で全員が同じ手順になります。'
        + 'そこから先のデータは、いまのデータとは別の工程で取ったものになります。',
        '**The initial standard is being written.** In ' + (st().pendingStdLeft == null ? DPW : st().pendingStdLeft) + ' day(s) everyone will be working the same way. '
        + 'Data from then on comes from a different process than the data you have now.',
        '**Standar awal sedang disusun.** Dalam ' + (st().pendingStdLeft == null ? DPW : st().pendingStdLeft) + ' hari semua orang akan bekerja dengan cara yang sama. '
        + 'Data setelah itu berasal dari proses yang berbeda dari data yang Anda miliki sekarang.')]));
    }
    if ((st().dayHist || []).length) v.appendChild(chart());
    const dh2 = st().dayHist || [];
    const lastNote = dh2.length ? dh2[dh2.length - 1].note : null;
    if (lastNote) v.appendChild(talk(lastNote.who, lastNote.text));

    if (st().day >= DAYS) {
      v.appendChild(talk('boss', S('16週たった。**結論を聞かせてくれ。**',
        'Sixteen weeks are up. **Let me hear your conclusion.**',
        'Enam belas minggu telah berlalu. **Saya ingin mendengar kesimpulan Anda.**')));
      v.appendChild(btn(S('結論を出す', 'Give your conclusion', 'Sampaikan kesimpulan'),
        function () { st().screen = 'conclude'; save(); route(); }, 'btn-primary'));
      show(v);
      return;
    }

    const acts = h('div.g-acts');
    acts.appendChild(act(S('調査を始める', 'Start a survey', 'Mulai survei'),
      S('測るものを選ぶ。ポイントと日数を使う', 'Choose what to measure. It costs points and days', 'Pilih apa yang diukur. Memakan poin dan hari'),
      S('調査ポイント ' + st().pt + '　走行中 ' + WS.surveys().length + '/' + WS.MAX_SURVEYS, st().pt + ' pt · running ' + WS.surveys().length + '/' + WS.MAX_SURVEYS, 'sisa ' + st().pt + ' poin · berjalan ' + WS.surveys().length + '/' + WS.MAX_SURVEYS),
      function () { st().screen = 'shop'; save(); route(); }, WS.surveys().length >= WS.MAX_SURVEYS));
    acts.appendChild(act(S('条件を変える', 'Change a condition', 'Ubah kondisi'),
      S('GPCバンドを決め直す。翌日から効く', 'Reset a GPC band. It takes effect tomorrow', 'Tetapkan ulang GPC band. Berlaku besok'),
      S('毎月 ' + t(yen(costOf(st().cfg))), 'now ' + t(yen(costOf(st().cfg))), 'kini ' + t(yen(costOf(st().cfg)))),
      function () { st().screen = 'tune'; save(); route(); }));
    acts.appendChild(act(S('記録を読む', 'Read the record', 'Baca catatan'),
      S('溜まったデータを層別する。日は使わない', 'Stratify what you have collected. It costs no day', 'Stratifikasi data yang terkumpul. Tidak memakan hari'),
      S('ロット ' + st().lots.length + '件', st().lots.length + ' lots', st().lots.length + ' lot'),
      function () { st().screen = 'analyze'; save(); route(); }, !st().lots.length));
    const nNotes = WS.notesOf().filter(function (n) { return n.kind !== 'sys'; }).length;
    acts.appendChild(act(S('手帳に書く', 'Write in the notebook', 'Tulis di buku catatan'),
      S('気づき・仮説・打った手・確かめた結果を残す。日は使わない。仮説は書いてから調べる',
        'Keep insights, hypotheses, moves and checks. It costs no day. Write the hypothesis, then go and look',
        'Simpan temuan, hipotesis, langkah, dan hasil pemeriksaan. Tidak memakan hari. Tulis hipotesis, lalu selidiki'),
      S(nNotes + '件', nNotes + ' entries', nNotes + ' catatan'),
      function () { st().noteFrom = 'board'; st().screen = 'notebook'; save(); route(); }));
    if (stdMissing().length) {
      acts.appendChild(act(S('標準作業を決める', 'Write standard work', 'Susun kerja standar'),
        has('stdaudit')
          ? S('標準の無い工程を1つ選んで、やり方を1つに決める。最適な手順を探すのではなく、比べられる状態をつくる',
            'Pick one process without a standard and settle on one way of working. Not the best method — a comparable one',
            'Pilih satu proses tanpa standar dan tetapkan satu cara kerja. Bukan metode terbaik — melainkan yang dapat dibandingkan')
          : S('どの工程に標準が無いのかを、まだ調べていません', 'You have not yet looked at which processes lack a standard', 'Anda belum melihat proses mana yang tidak punya standar'),
        S('1工程 5 pt ・ 5日', '5 pt · 5 days per process', '5 poin · 5 hari per proses'),
        function () { st().screen = 'stdwork'; save(); route(); },
        !has('stdaudit') || st().pendingStd != null));
    }
    // 手を打つ単位は1日。5日ぶんまとめて流すこともできる。
    const nd = st().day + 1, nw = Math.ceil(nd / DPW);
    acts.appendChild(act(S('1日流す', 'Run one day', 'Jalankan satu hari'),
      S('8時間ぶん（' + (HOURS * PIECES) + '個）流して、記録を1日ぶん増やす。明日また手を打てる',
        'Run eight hours (' + (HOURS * PIECES) + ' pieces) and add one day to the record. You can act again tomorrow',
        'Jalankan delapan jam (' + (HOURS * PIECES) + ' pcs) dan tambahkan satu hari ke catatan. Anda dapat bertindak lagi besok'),
      S('第' + nw + '週 ' + (nd - (nw - 1) * DPW) + '日目へ', 'to week ' + nw + ' day ' + (nd - (nw - 1) * DPW),
        'ke minggu ' + nw + ' hari ' + (nd - (nw - 1) * DPW)),
      function () {
        st().actToday = 'run';
        if ((st().day + 1) % DPW === 1) st().actThisWeek = 'run';
        advanceDay(nd % DPW === 1 || DPW === 1 ? (EVENTS[nw] || null) : null);
        route();
      }));
    acts.appendChild(act(S('1週（5日）流す', 'Run one week (5 days)', 'Jalankan satu minggu (5 hari)'),
      S('途中で手を止めずに5日ぶん流す。急いでいるとき用',
        'Run five days without stopping in between. For when you are in a hurry',
        'Jalankan lima hari tanpa berhenti. Untuk saat Anda terburu-buru'),
      S('第' + Math.min(WEEKS, Math.ceil((st().day + DPW) / DPW)) + '週の終わりへ',
        'to the end of week ' + Math.min(WEEKS, Math.ceil((st().day + DPW) / DPW)),
        'ke akhir minggu ' + Math.min(WEEKS, Math.ceil((st().day + DPW) / DPW))),
      function () {
        st().actThisWeek = 'run'; st().actToday = 'run';
        for (let i = 0; i < DPW && st().day < DAYS; i++) {
          const d2 = st().day + 1, w2 = Math.ceil(d2 / DPW);
          advanceDay(d2 % DPW === 1 ? (EVENTS[w2] || null) : null);
        }
        route();
      }));
    // 区切り(調査の結果か標準作業の完成)まで、日刻みで流す。手数を減らすためで、途中で止まる意義は変わらない。
    if (WS.daysToMilestone() > 0) {
      const dm = WS.daysToMilestone();
      acts.appendChild(act(S('区切りまで流す（' + dm + '日）', 'Run to the next milestone (' + dm + ' days)', 'Jalankan sampai tonggak berikutnya (' + dm + ' hari)'),
        S('いちばん早く終わる調査か、標準作業の完成まで流す', 'Run until the earliest survey lands or the standard work is finished', 'Jalankan sampai survei yang paling cepat selesai atau kerja standar rampung'),
        S('第' + Math.ceil((st().day + dm) / DPW) + '週へ', 'to week ' + Math.ceil((st().day + dm) / DPW), 'ke minggu ' + Math.ceil((st().day + dm) / DPW)),
        function () {
          st().actThisWeek = st().actThisWeek || 'run'; st().actToday = 'run';
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
      WS.rulesFrom = st();
      WS.setState({ screen: 'rules' });
      route();
    }, 'btn-ghost');
    rb.style.cssText += ';margin-top:4px;margin-left:8px';
    v.appendChild(rb);
    if (st().day >= DAYS / 2) {
      const b = btn(S('ここで結論を出す', 'Conclude here', 'Simpulkan di sini'), function () { st().screen = 'conclude'; save(); route(); }, 'btn-ghost');
      b.style.marginTop = '4px';
      v.appendChild(b);
    }
    show(v);
  }

  /* ---- 調査の棚 ---- */
  function screenShop() {
    const v = h('div');
    v.appendChild(hud());
    v.appendChild(talk('eng', S('何を測るかを選びます。**買わなかった属性では、あとで層別できません。**記録は始めた週からしか残らないので、遅く買うほど使えるロットが減ります。',
      'Choose what to measure. **You cannot stratify later by an attribute you did not buy.** Recording starts the week it starts, so the later you buy, the fewer lots it covers.',
      'Pilih apa yang diukur. **Atribut yang tidak dibeli tidak dapat dipakai untuk stratifikasi nanti.** Pencatatan dimulai pada minggunya, jadi makin lambat dibeli makin sedikit lot yang tercakup.')));
    if (st().pendingStd != null) {
      v.appendChild(note([S('**いま標準作業を決めている最中です（あと ' + (st().pendingStdLeft == null ? DPW : st().pendingStdLeft) + ' 日）。**'
        + '標準が仕上がった日に走っている調査は、前の工程で取ったものになり読めなくなります。仕上がってから始めるか、仕上がる前に終わる調査を選んでください。',
        '**Standard work is being written (' + (st().pendingStdLeft == null ? DPW : st().pendingStdLeft) + ' day(s) to go).** '
        + 'A survey still running on the day it is finished belongs to the old process and becomes unreadable. Start after it is done, or pick a survey that ends before.',
        '**Kerja standar sedang disusun (' + (st().pendingStdLeft == null ? DPW : st().pendingStdLeft) + ' hari lagi).** '
        + 'Survei yang masih berjalan pada hari standar selesai menjadi milik proses lama dan tak terbaca. Mulailah setelah selesai, atau pilih survei yang berakhir sebelumnya.')]));
    }
    v.appendChild(note([S('**調査は同時に ' + WS.MAX_SURVEYS + ' 本まで走らせられます。**いま ' + WS.surveys().length + ' 本。人手を分ければ並行して測れますが、条件を変えると走っている調査は全部読めなくなります。',
      '**Up to ' + WS.MAX_SURVEYS + ' surveys can run at once.** ' + WS.surveys().length + ' running now. Split the hands and you measure in parallel, but a change of condition spoils every running survey.',
      '**Paling banyak ' + WS.MAX_SURVEYS + ' survei dapat berjalan bersamaan.** Sekarang ' + WS.surveys().length + ' survei sedang berjalan. Dengan membagi tenaga kerja Anda dapat mengukur secara paralel, tetapi mengubah kondisi membuat semua survei yang sedang berjalan tak terbaca.')]));
    if (!WS.notesOf('hyp').length) {
      v.appendChild(note([S('**仮説を書いてから測ると、あとで「当たった」と言えます。**手帳に「何が原因なら、何で層別すると差が出るはず」を一行書いてから始めるのが順序です。',
        '**Write the hypothesis first, and afterwards you can say it was confirmed.** One line in the notebook, “if X is the cause, stratifying by Y should show a gap”, before you start.',
        '**Tulis hipotesis lebih dulu, maka nanti Anda dapat mengatakan hipotesis itu terbukti.** Satu baris di buku catatan, “bila X penyebabnya, stratifikasi menurut Y akan menunjukkan selisih”, sebelum memulai.')]));
    }
    const shop = h('div.g-shop');
    SHOP().forEach(function (s2) {
      const owned = has(s2.id);
      const afford = st().pt >= s2.pt && st().day + s2.wk * DPW <= DAYS;
      shop.appendChild(h('div.g-shop-row', null,
        h('div.txt', null, h('b', { text: t(s2.name) }), h('span', { text: t(s2.gain) })),
        h('div.buy', null,
          h('span.price', { text: s2.pt + ' pt · ' + (s2.wk * DPW) + t(S('日', ' days', ' hari')) }),
          owned
            ? h('span.chip.tone-green', { text: t(S('第' + st().bought[s2.id] + '週から', 'from week ' + st().bought[s2.id], 'sejak minggu ' + st().bought[s2.id])) })
            : WS.surveys().some(function (sv) { return sv.id === s2.id; })
            ? h('span.chip', { text: t(S('走行中', 'running', 'berjalan')) })
            : btn(S('始める', 'Start', 'Mulai'), function () {
              // 上限の判定はポイントを引く前に。後だと、始まらないのにポイントだけ減る(翻訳検品が発見 2026-09-22)
              if (st().pt < s2.pt || !afford || WS.surveys().length >= WS.MAX_SURVEYS) return;
              st().pt -= s2.pt;
              if (!Object.keys(st().bought).length && !st().flags.anySurvey && s2.id === 'msa') st().flags.msaFirst = true;
              st().flags.anySurvey = true;
              // 仮説を書いてから始めた調査かどうかは、採点で見る
              WS.surveys().push({ id: s2.id, left: s2.wk * DPW, from: st().week + 1, fromDay: st().day + 1, voided: false,
                hypBefore: WS.notesOf('hyp').length });
              st().surveyLog = (st().surveyLog || []).concat([{ id: s2.id, dn: st().day, hypBefore: WS.notesOf('hyp').length }]);
              WS.addNote('sys', S('「' + t(s2.name) + '」を始めた', 'Started “' + t(s2.name) + '”', 'Memulai “' + t(s2.name) + '”'), { survey: s2.id });
              st().actThisWeek = 'survey';
              st().actToday = 'survey';
              st().screen = 'board'; save(); route();
            }, (afford && WS.surveys().length < WS.MAX_SURVEYS) ? 'btn-sm' : 'btn-sm btn-ghost'))));
    });
    v.appendChild(shop);
    const b = btn(S('盤面へ戻る', 'Back to the floor', 'Kembali ke papan permainan'), function () { st().screen = 'board'; save(); route(); });
    b.style.marginTop = '12px';
    v.appendChild(b);
    show(v);
  }

  /* ---- 条件を決める ----
   * 見えている手だけを並べる。隠れモデルの「見込み」は出さない。
   * 出すのは、その条件で実際に流したロットの実績だけ。試していない条件は「未検証」。
   */
  const fmtKnob = function (kn, v) { return kn.pct ? Math.round(v * 100) + '%' : v + ' ' + t(kn.unit); };
  function screenTune() {
    const v = h('div');
    v.appendChild(hud());
    v.appendChild(talk('eng', S('条件の範囲を決めます。これが**GPCバンド**です。締めるほど毎月のコストがかかりますが、効くかどうかは流して測るまで分かりません。'
      + '**現場を見る・聞く・測る・層別すると、動かせる条件が増えます。**',
      'You are setting the range for each condition. That range is the **GPC band**. Tighter costs more every month, and whether it works you only learn by running and measuring. '
      + '**Look, ask, measure and stratify, and more conditions become available to move.**',
      'Anda menetapkan rentang tiap kondisi. Rentang itulah **GPC band**. Makin ketat makin mahal tiap bulan, dan apakah berpengaruh baru diketahui setelah dijalankan dan diukur. '
      + '**Berkeliling di lantai produksi, bertanya, mengukur, dan melakukan stratifikasi, maka makin banyak kondisi yang dapat digerakkan.**')));
    const draft = Object.assign({}, st().cfg);
    const out = h('div', { style: { marginTop: '12px' } });
    function refresh() {
      out.innerHTML = '';
      const changed = cfgKey(draft, stdLevel()) !== cfgKey(st().cfg, stdLevel());
      const tried = G.triedStats(draft), base = G.baseStats();
      const costNow = costOf(draft);
      const est = (tried.n && base.n) ? lossMan(base.inRate) - lossMan(tried.inRate) - costNow * 12 : null;
      out.appendChild(h('div.g-hud', null,
        meter(S('この条件での実績', 'Record under these settings', 'Realisasi pada setelan ini'),
          tried.n ? n1(tried.inRate) + '%' : t(S('未検証', 'not yet tried', 'belum dicoba')),
          tried.n
            ? S('対象の不良。' + tried.n + 'ロット（' + (tried.n * PIECES).toLocaleString() + '個）',
              'scoped defects over ' + tried.n + ' lots (' + (tried.n * PIECES).toLocaleString() + ' pcs)',
              'cacat dalam lingkup dari ' + tried.n + ' lot (' + (tried.n * PIECES).toLocaleString() + ' pcs)')
            : S('流して測るまで、効くかどうかは分からない', 'until you run it and measure, you do not know whether it works', 'sebelum dijalankan dan diukur, tidak diketahui apakah berpengaruh'),
          tried.n ? (base.n && tried.inRate < base.inRate ? 'good' : 'warn') : ''),
        meter(S('改善前', 'Before', 'Sebelum'), base.n ? n1(base.inRate) + '%' : '—',
          S('最初の条件で取れた ' + base.n + 'ロット', 'the first ' + base.n + ' lots under the starting settings', base.n + ' lot pertama pada setelan awal')),
        meter(S('効果金額（実績から）', 'Benefit (from the record)', 'Manfaat (dari realisasi)'),
          est == null ? '—' : t(man(est)),
          est == null ? S('この条件の実績が要る', 'needs a record under these settings', 'memerlukan realisasi pada setelan ini')
            : S('年換算。追加コストを引いたあと', 'annualised, after the added cost', 'setahun, setelah biaya tambahan'),
          est == null ? '' : est > 0 ? 'good' : 'bad'),
        meter(S('年間の追加コスト', 'Added cost per year', 'Biaya tambahan per tahun'), t(man(costNow * 12)),
          S('毎月 ' + t(yen(costNow)), 'monthly ' + t(yen(costNow)), 'bulanan ' + t(yen(costNow))),
          costNow > costOf(st().cfg) ? 'warn' : '')));
      if (tried.n && tried.n < HOURS * DPW) {
        out.appendChild(note([S('**まだ ' + tried.n + ' ロットです。**1週ぶん（' + (HOURS * DPW) + 'ロット）に満たない実績は、揺れの中に埋もれています。',
          '**Only ' + tried.n + ' lots so far.** Less than a week (' + (HOURS * DPW) + ' lots) is still inside the wobble.',
          '**Baru ' + tried.n + ' lot.** Kurang dari seminggu (' + (HOURS * DPW) + ' lot) masih tenggelam dalam fluktuasi.')]));
      }
      if (WS.activeSurveys().length && changed) {
        out.appendChild(note([S('**いま調査中です。**このまま条件を変えると、その調査は読めなくなります。',
          '**A survey is running.** Change the condition now and that survey becomes unreadable.',
          '**Survei sedang berjalan.** Mengubah kondisi sekarang membuat survei itu tak terbaca.')]));
      }
      const apply = btn(changed ? S('この条件にする（翌日から）', 'Apply from tomorrow', 'Terapkan mulai besok') : S('変更なし', 'No change', 'Tidak ada perubahan'),
        function () {
          if (!changed) { st().screen = 'board'; save(); route(); return; }
          WS.surveys().forEach(function (sv) { sv.voided = true; });
          // 打った手は手帳に残す。何をいくつからいくつへ、が後から辿れる。
          const diff = KNOBS().filter(function (k) { return draft[k.k] !== st().cfg[k.k]; })
            .map(function (k) { return t(k.label) + ' ' + fmtKnob(k, st().cfg[k.k]) + ' → ' + fmtKnob(k, draft[k.k]); })
            .join(t(S('、', ', ', ', ')));
          WS.addNote('act', t(S('条件を変えた：', 'Changed the settings: ', 'Mengubah setelan: ')) + diff, { k: cfgKey(draft, stdLevel()) });
          st().cfg = draft;
          st().actThisWeek = 'tune';
          st().actToday = 'tune';
          st().flags.tuned = (st().flags.tuned || 0) + 1;
          if (st().week === SHOCK_WEEK || st().week === SHOCK_WEEK + 1) st().flags.reactedToShock = true;
          st().screen = 'board'; save(); route();
        }, changed ? 'btn-primary' : '');
      apply.style.marginTop = '12px';
      out.appendChild(apply);
    }
    let shown = 0;
    KNOBS().forEach(function (kn) {
      if (!G.knobOpen(kn.k)) return;   // まだ思いついていない手は出さない
      shown += 1;
      if (!canTouch(kn.k)) {
        v.appendChild(h('div.ctrl', { style: { opacity: '.45' } },
          h('label', null, h('span', { text: t(kn.label) }),
            h('output', { text: t(S('スコープの外', 'outside the scope', 'di luar lingkup')) }))));
        return;
      }
      const ov = h('output');
      const inp = h('input', { type: 'range', min: kn.min, max: kn.max, step: kn.step, value: draft[kn.k] });
      const render = function () { ov.textContent = fmtKnob(kn, +inp.value); };
      inp.addEventListener('input', function () { draft[kn.k] = +inp.value; render(); refresh(); });
      render();
      v.appendChild(h('div.ctrl', null,
        h('label', null, h('span', { text: t(kn.label) }), ov), inp,
        kn.note ? h('div.muted', { style: { fontSize: '11.5px', marginTop: '2px' }, text: t(kn.note) }) : null));
    });
    if (shown < KNOBS().length) {
      v.appendChild(note([S('**ここに無い条件は、まだ思いついていません。**現場を歩く・聞き取る・測る・分析室で層別すると、根拠のある手が増えていきます。増えたときは手帳に理由が書かれます。',
        '**A condition missing here is one you have not yet found a reason to try.** Walk the floor, interview, measure and stratify in the analysis room, and moves with a reason behind them appear. When one appears, the reason is written in the notebook.',
        '**Kondisi yang tidak ada di sini adalah yang belum Anda temukan alasannya.** Berkeliling di lantai produksi, bertanya, mengukur, dan melakukan stratifikasi di ruang analisis, maka langkah yang beralasan akan bertambah. Saat muncul, alasannya ditulis di buku catatan.')]));
    }
    v.appendChild(out);
    refresh();
    const back = btn(S('やめる', 'Cancel', 'Batal'), function () { st().screen = 'board'; save(); route(); }, 'btn-ghost');
    back.style.marginTop = '8px';
    v.appendChild(back);
    show(v);
  }
  Object.assign(G, { EVENTS: EVENTS, screenShop: screenShop, TARGET_WHY: TARGET_WHY, chart: chart, hud: hud });

  Object.assign(G, { screenPrologue: screenPrologue, screenRecon: screenRecon, screenScope: screenScope, screenDefine: screenDefine, screenStdWork: screenStdWork, screenBoard: screenBoard, screenTune: screenTune });
})();
