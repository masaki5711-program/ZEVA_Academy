/* 現場再建記 — タイトル・集計・進行
 * 土台は core.js（WS）。ここで定義したものは WS.G に載せ、後ろのファイルから使う。
 */
(function () {
  'use strict';
  const WS = window.WS;
  const ZA = WS.ZA, h = WS.h, t = WS.t, S = WS.S, md = WS.md, fmt = WS.fmt;
  const n1 = WS.n1, sep = WS.sep, wkUnit = WS.wkUnit, yen = WS.yen;
  const WEEKS = WS.WEEKS, PT0 = WS.PT0, LOTS = WS.LOTS, PIECES = WS.PIECES;
  const mulberry32 = WS.mulberry32, randn = WS.randn, binom = WS.binom, season = WS.season;
  const save = WS.save, route = WS.route, show = WS.show, scen = WS.scen, has = WS.has;
  const talk = WS.talk, meter = WS.meter, btn = WS.btn, act = WS.act, note = WS.note;
  const svgBox = WS.svgBox, switcher = WS.switcher, paramPanel = WS.paramPanel, weekStrip = WS.weekStrip;
  const C = window.WOODSHOP_CHARTS;
  const SUSPECTS = WS.G.SUSPECTS;
  const st = WS.state;
  const load = WS.load, board = WS.board, fresh = WS.fresh, readCode = WS.readCode;
  const SCENARIOS = window.WOODSHOP_SCENARIOS;
  const DPW = WS.DPW;
  const HOURS = WS.HOURS;
  const SCORE = WS.G.SCORE;
  const G = WS.G;
  /* ================= 画面 ================= */


  /* ---- あそびかたと採点 ----
   * 配点は model.js の SCORE から引く。説明を手で書くと、配点を直したときに必ずズレる。
   */
  function screenRules() {
    const v = h('div');
    v.appendChild(h('h2', { text: t(S('あそびかた', 'How to play', 'Cara bermain')) }));

    v.appendChild(talk('boss', S('やることは1つだ。**なぜ不良が出ているのかを突き止めて、金額で示して、戻らないようにする。**'
      + 'それを16週でやってくれ。',
      'There is one job. **Find out why the defects are happening, put a number on it in money, and make it stay fixed.** '
      + 'You have sixteen weeks.',
      'Ada satu tugas. **Cari tahu mengapa cacat terjadi, nyatakan dalam uang, dan pastikan tidak kembali.** '
      + 'Anda punya enam belas minggu.')));

    v.appendChild(h('h3', { text: t(S('時間の単位', 'The clock', 'Satuan waktu')) }));
    v.appendChild(note([
      S('**16週 ＝ 80日。1日ずつ動かせます。**1日は8時間、1時間に1ロット' + PIECES + '個が流れるので、'
        + '1日で' + (HOURS * PIECES) + '個、1週で' + (DPW * HOURS * PIECES).toLocaleString() + '個です。',
        '**Sixteen weeks is eighty working days, and you move one day at a time.** A day is eight hours and one lot of '
        + PIECES + ' pieces runs each hour, so ' + (HOURS * PIECES) + ' pieces a day and '
        + (DPW * HOURS * PIECES).toLocaleString() + ' a week.',
        '**Enam belas minggu adalah delapan puluh hari kerja, dan Anda melangkah sehari demi sehari.** Satu hari delapan jam dan satu lot berisi '
        + PIECES + ' pcs berjalan tiap jam, jadi ' + (HOURS * PIECES) + ' pcs sehari dan '
        + (DPW * HOURS * PIECES).toLocaleString() + ' seminggu.'),
      S('**条件を変えると翌日から効きます。**週のまん中でも方針を変えられますが、'
        + '条件を変えるとそれ以前のロットは「別の条件で取ったもの」になり、比べる対象から外れます。'
        + '**むやみに動かすと、手元のデータが細切れになります。**',
        '**A change to the conditions takes effect tomorrow.** You can change course mid-week, but every change means the lots you already have '
        + 'were taken under a different condition, so they drop out of the comparison. **Move things at random and your data falls into crumbs.**',
        '**Perubahan kondisi berlaku besok.** Anda dapat berganti arah di tengah minggu, tetapi setiap perubahan berarti lot yang sudah ada '
        + 'diambil pada kondisi berbeda, sehingga keluar dari perbandingan. **Ubah sembarangan dan data Anda terpecah-pecah.**')
    ]));

    v.appendChild(h('h3', { text: t(S('1日にできること', 'What you can do in a day', 'Yang dapat Anda lakukan dalam sehari')) }));
    const acts = h('tbody');
    [[S('調査を始める', 'Start a survey', 'Mulai survei'),
      S('測るものを選ぶ。**調査ポイントは全部で' + PT0 + '**で、日数もかかる。**同時に' + WS.MAX_SURVEYS + '本まで**走らせられる。走っている最中に条件を変えると、その調査は読めなくなる',
        'Choose what to measure. **You have ' + PT0 + ' survey points in total**, and it costs days. **Up to ' + WS.MAX_SURVEYS + ' can run at once.** Change a condition while one is running and that survey becomes unreadable',
        'Pilih apa yang diukur. **Anda punya ' + PT0 + ' poin survei**, dan memakan hari. **Paling banyak ' + WS.MAX_SURVEYS + ' survei dapat berjalan bersamaan.** Ubah kondisi saat survei berjalan dan survei itu menjadi tak terbaca')],
    [S('条件を変える', 'Change a condition', 'Ubah kondisi'),
      S('GPCバンドを決め直す。**毎月の追加コストがかかる**ので、締めれば締めるほどよいわけではない',
        'Reset a GPC band. **It adds a monthly cost**, so tighter is not automatically better',
        'Tetapkan ulang GPC band. **Ini menambah biaya bulanan**, jadi lebih ketat tidak otomatis lebih baik')],
    [S('記録を読む', 'Read the record', 'Baca catatan'),
      S('溜めたデータを層別する。**日数は使いません。**何度でも見てよい',
        'Stratify what you have collected. **It costs no days** and you can look as often as you like',
        'Stratifikasi data yang terkumpul. **Tidak memakan hari** dan Anda boleh melihat sesering yang Anda mau')],
    [S('手帳に書く', 'Write in the notebook', 'Tulis di buku catatan'),
      S('気づき・仮説・打った手・確かめた結果を残す。**日数は使いません。**仮説を書いてから調査を始めると採点に入る。'
        + '現場で見聞きしたことや、新しく動かせるようになった条件の根拠は、盤面が勝手に書き足す',
        'Keep insights, hypotheses, moves and checks. **It costs no days.** A hypothesis written before a survey counts towards the score. '
        + 'What you saw and heard on the floor, and why a new condition became available, the floor writes in for you',
        'Simpan temuan, hipotesis, langkah, dan hasil pemeriksaan. **Tidak memakan hari.** Hipotesis yang ditulis sebelum survei dihitung dalam skor. '
        + 'Apa yang Anda lihat dan dengar di lantai produksi, dan alasan kondisi baru tersedia, dicatat otomatis oleh papan permainan')],
    [S('条件は調査で現れる', 'Conditions appear as you investigate', 'Kondisi muncul seiring penyelidikan'),
      S('最初に動かせるのは素朴な手だけ。**歩く・聞く・測る・層別する**と、根拠のある条件が増える。'
        + '条件画面に「見込み」は出ない。出るのは、その条件で実際に流した実績だけ',
        'At first only the naive moves can be made. **Walk, ask, measure and stratify**, and conditions with a reason behind them appear. '
        + 'The settings screen shows no forecast, only the record of what you actually ran',
        'Awalnya hanya langkah sederhana yang tersedia. **Berkeliling di lantai produksi, bertanya, mengukur, dan melakukan stratifikasi**, maka kondisi yang beralasan akan bertambah. '
        + 'Layar setelan tidak menampilkan perkiraan, hanya catatan dari yang benar-benar Anda jalankan')],
    [S('標準作業を決める', 'Write standard work', 'Susun kerja standar'),
      S('やり方を1つに決める。**平均は動かず、ばらつきだけが小さくなります。**先に棚卸しをしないと、どの工程に無いか分かりません',
        'Settle on one way of working. **The average does not move; only the spread narrows.** Until you take stock, you cannot see which processes lack one',
        'Tetapkan satu cara kerja. **Rata-ratanya tidak bergerak; hanya sebarannya menyempit.** Sebelum inventarisasi, Anda tidak tahu proses mana yang belum punya')],
    [S('能力パラメータ', 'Ability parameters', 'Parameter kemampuan'),
      S('標準・測定・分析・仮説・改善・維持。**「改善」は直近1週の実績で動く**ので、条件を変えた直後は0のまま。1週流すと動く',
        'Standard, measurement, analysis, hypotheses, improvement, control. **“Improvement” follows the last week’s record**, so it stays at 0 right after a change and moves once a week has run',
        'Standar, pengukuran, analisis, hipotesis, perbaikan, kendali. **“Perbaikan” mengikuti realisasi minggu terakhir**, jadi tetap 0 tepat setelah perubahan dan bergerak setelah seminggu berjalan')],
    [S('1日流す／1週流す／区切りまで流す', 'Run a day / a week / to the next milestone', 'Jalankan sehari / seminggu / sampai tonggak berikutnya'),
      S('そのまま生産して記録を増やす。**何もしなくても日は過ぎます**',
        'Keep producing and add to the record. **The days pass whether you act or not**',
        'Terus berproduksi dan tambah catatan. **Hari berlalu baik Anda bertindak maupun tidak**')]
    ].forEach(function (r) {
      acts.appendChild(h('tr', null, h('th', { text: t(r[0]) }), h('td', { html: md(t(r[1])) })));
    });
    v.appendChild(h('div.table-wrap', null, h('table.tbl', null, acts)));

    v.appendChild(h('h3', { text: t(S('採点 — 100点の内訳', 'The score — how the 100 points break down', 'Skor — rincian 100 poin')) }));
    const tb = h('tbody');
    tb.appendChild(h('tr', null,
      h('th', { text: t(S('項目', 'Item', 'Butir')) }),
      h('th', { text: t(S('配点', 'Points', 'Poin')) }),
      h('th', { text: t(S('何で決まるか', 'What decides it', 'Apa yang menentukannya')) })));
    let sum = 0;
    SCORE.forEach(function (x) {
      sum += x[1];
      tb.appendChild(h('tr', null,
        h('th', { text: t(x[2]) }),
        h('td', { text: x[1] + t(S(' 点', ' pts', ' poin')) }),
        h('td', { html: md(t(x[3])) })));
    });
    tb.appendChild(h('tr', null, h('th', { text: t(S('合計', 'Total', 'Total')) }),
      h('td', { text: sum + t(S(' 点', ' pts', ' poin')) }), h('td')));
    v.appendChild(h('div.table-wrap', null, h('table.tbl', null, tb)));

    v.appendChild(h('h3', { text: t(S('金額を2つに分けて数えます', 'The money is counted in two parts', 'Uangnya dihitung dalam dua bagian')) }));
    v.appendChild(note([
      S('**効果金額（年換算）**は、いまの条件をこのまま1年続けたときの効果です。'
        + '**最後にどの条件に居るか**だけで決まるので、途中で何日かかっても同じ額になります。',
        '**The annualised benefit** is what the current settings are worth if you hold them for a year. '
        + 'It depends only on **where you ended up**, so it comes out the same however long you took.',
        '**Manfaat tahunan** adalah nilai setelan sekarang bila dipertahankan setahun. '
        + 'Hanya bergantung pada **di mana Anda berakhir**, jadi hasilnya sama berapa lama pun waktu yang Anda pakai.'),
      S('**期中の作り込み**は、この16週のあいだに実際に減らした損失です。'
        + '1日ぶんの' + (HOURS * PIECES) + '個で不良率を1ポイント下げれば1万円。'
        + '**早く辿り着くほど、その1万円が積み上がる日数が増えます。**'
        + '同じ条件に辿り着いても、5日目の班と70日目の班では差が出ます。',
        '**What you built in during the run** is the loss actually avoided over these sixteen weeks. '
        + 'Take a point off the ' + (HOURS * PIECES) + ' pieces of one day and that is ¥10,000. '
        + '**The sooner you get there, the more days that ¥10,000 accumulates over.** '
        + 'Two teams can reach the same settings on day 5 and day 70 and still finish apart.',
        '**Yang Anda peroleh selama periode** adalah kerugian yang benar-benar dihindari selama enam belas minggu ini. '
        + 'Kurangi satu poin dari ' + (HOURS * PIECES) + ' pcs dalam sehari dan itu ¥10.000. '
        + '**Makin cepat Anda sampai, makin banyak hari ¥10.000 itu menumpuk.** '
        + 'Dua tim dapat mencapai setelan yang sama pada hari ke-5 dan ke-70 dan tetap berakhir berbeda.'),
      S('**だから、急げばよいわけでもありません。**調べずに条件だけ動かすと作り込みは稼げますが、'
        + '「原因の見立て」「手帳」「測定のばらつき」で落とします。そもそも、調べないと動かせる条件が現れません。'
        + '**調べる日数と、直っている日数の取り合いが、このゲームの勝負どころです。**',
        '**Which does not mean you should rush.** Move the settings without investigating and you collect the in-period money, '
        + 'but you give it back on the cause, on the notebook, and on the measurement check. And without investigating, the conditions do not appear at all. '
        + '**The contest is the trade between days spent looking and days spent fixed.**',
        '**Bukan berarti Anda harus terburu-buru.** Geser setelan tanpa menyelidiki dan Anda mengumpulkan uang periode, '
        + 'tetapi mengembalikannya pada penyebab, pada buku catatan, dan pada pemeriksaan pengukuran. Lagi pula, tanpa menyelidiki, kondisinya tidak akan muncul. '
        + '**Pertarungannya adalah pertukaran antara hari untuk mencari dan hari dalam keadaan sudah diperbaiki.**')
    ]));

    v.appendChild(h('h3', { text: t(S('つまずきやすいところ', 'Where people trip', 'Kesalahan yang sering terjadi')) }));
    v.appendChild(note([
      S('**週ごとの揺れは2ポイント近くあります。**数字が動いたとき、それが工程なのか、ただの揺れなのか。'
        + 'ここを見分けるのがこのゲームの中身です。p管理図と3σの目安を使ってください。',
        '**The week-to-week wobble is close to two points.** When a number moves, was that the process or just the wobble? '
        + 'Telling those apart is what this game is. Use the p chart and the three-sigma yardstick.',
        '**Fluktuasi antar minggu hampir dua poin.** Ketika angka bergerak, itu prosesnya atau sekadar fluktuasi? '
        + 'Membedakannya itulah inti permainan ini. Gunakan peta p dan patokan tiga sigma.'),
      S('**層別で差が出ることと、そこに原因があることは別の話です。**'
        + '一緒に動いているだけの条件を押さえても、費用がかかるだけで不良は動きません。',
        '**A gap in a stratification is not the same thing as a cause.** '
        + 'Hold down something that merely moves alongside and you pay for it without moving the defect rate.',
        '**Selisih dalam stratifikasi bukanlah penyebab.** '
        + 'Kendalikan sesuatu yang sekadar bergerak bersamaan dan Anda membayar tanpa menggerakkan tingkat cacat.'),
      S('**記録を始めた日より前には遡れません。**買うのが遅いほど、層別に使えるロットが減ります。',
        '**A survey cannot reach back before the day you started it.** The later you buy, the fewer lots it covers.',
        '**Survei tidak dapat menjangkau sebelum hari Anda memulainya.** Makin lambat membeli, makin sedikit lot yang tercakup.')
    ]));

    // 途中で開いたときは元の画面へ戻す。保存は消さない。
    const back = WS.rulesFrom;
    const b = btn(back ? S('盤面へ戻る', 'Back to the floor', 'Kembali ke papan permainan')
      : S('タイトルへ戻る', 'Back to the title', 'Kembali ke judul'), function () {
      WS.setState(back || null);
      WS.rulesFrom = null;
      route();
    }, 'btn-primary');
    b.style.marginTop = '16px';
    v.appendChild(b);
    show(v);
  }

  /* ---- タイトル ---- */
  function screenTitle() {
    const saved = load();
    const v = h('div');
    const hero = h('div.g-hero', null,
      h('div.mark', { text: '🪵' }),
      h('h1', { text: t(S('現場再建記', 'Shopfloor Rebuild', 'Membangun Ulang Lantai Produksi')) }),
      h('p', { text: t(S('16週・80日で、現場を立て直すシミュレーションです。1日ずつ手を打てます。日ごとの揺れは大きく、週でまとめても2ポイント近く動きます。数字が動いたとき、それが工程なのか、ただの揺れなのかを見分けるのがこのゲームです。',
        'A sixteen-week, eighty-day simulation of pulling a line back into shape, one day at a time. The day-to-day wobble is large, and even bundled into weeks it moves close to two points. Telling a real change from that wobble is the game.',
        'Simulasi enam belas minggu, delapan puluh hari, untuk membenahi lini, sehari demi sehari. Fluktuasi harian besar, dan bahkan dikelompokkan per minggu bergerak hampir dua poin. Membedakan perubahan nyata dari fluktuasi itulah permainannya.')) }),
      h('p', { text: t(S('工程のちがうラインが並んでいます。**答えはラインごとに違います。**上流の材料だったり、道具の摩耗だったり、2台のうち片方の機械だったり、そもそも共通の原因が無かったりします。チームごとに別のラインを配れば、隣の答えを写しても当たりません。同じラインを配れば、進め方そのものを競えます。',
        'The lines come from different processes, and **each has a different answer**: the material upstream, a tool wearing out, one machine of two, or no shared cause at all. Give each team a different line and copying the neighbours gets them nowhere; give them the same line and they compete on how they went about it.',
        'Lini-lini ini berasal dari proses yang berbeda, dan **masing-masing punya jawaban berbeda**: material di hulu, perkakas yang aus, satu dari dua mesin, atau tidak ada penyebab bersama sama sekali. Beri tiap tim lini yang berbeda dan menyalin tetangga tidak membantu; beri lini yang sama dan mereka bersaing pada cara mengerjakannya.')) }));
    v.appendChild(hero);

    // チーム名
    const nameIn = h('input', {
      type: 'text', maxlength: 24, placeholder: t(S('チーム名（例：第2班）', 'Team name (e.g. Team 2)', 'Nama tim (mis. Tim 2)')),
      value: ZA.store.get('woodshopTeam', '') || ''
    });
    nameIn.style.cssText = 'width:100%;max-width:340px;padding:10px 12px;border-radius:10px;border:1px solid var(--border-strong);background:var(--surface);color:var(--text);font:inherit';
    v.appendChild(h('div', { style: { textAlign: 'center', margin: '4px 0 20px' } },
      h('div', { style: { fontSize: '13px', fontWeight: '700', marginBottom: '6px' },
        text: t(S('チーム名', 'Team name', 'Nama tim')) }), nameIn));

    // はじめての人はここから
    const rulesBtn = btn(S('あそびかたと採点を読む', 'Read the rules and the scoring', 'Baca aturan dan penilaian'), function () {
      WS.rulesFrom = null;
      WS.setState({ screen: 'rules' });
      route();
    }, 'btn-ghost');
    v.appendChild(h('div', { style: { textAlign: 'center', marginBottom: '18px' } }, rulesBtn));

    // ライン選択
    v.appendChild(h('h3', { style: { textAlign: 'center', marginBottom: '10px' },
      text: t(S('担当するラインを選ぶ', 'Choose your line', 'Pilih lini Anda')) }));
    const picks = h('div.g-acts');
    SCENARIOS.forEach(function (s2) {
      picks.appendChild(act(s2.name, s2.brief,
        S('ライン記号 ' + s2.code, 'line code ' + s2.code, 'kode lini ' + s2.code),
        function () {
          const team = nameIn.value.trim();
          ZA.store.set('woodshopTeam', team);
          const g = fresh(s2.id, team);
          // 条件の初期値はラインの型で違う。生産性のラインは prod.init が入れる。
          if (s2.kind !== 'prod') g.cfg = Object.assign({}, G.BASE);
          WS.setState(g);
          if (s2.kind === 'prod' && window.WOODSHOP_PROD) window.WOODSHOP_PROD.init(g);
          save(); route();
        }));
    });
    v.appendChild(picks);

    if (saved && saved.week > 0) {
      const s2 = SCENARIOS.filter(function (x) { return x.id === saved.scenario; })[0];
      v.appendChild(note([S('**つづきがあります。**' + (saved.team ? saved.team + '／' : '') + t(s2.name) + '　第' + saved.week + '週',
        '**There is a game in progress:** ' + (saved.team ? saved.team + ', ' : '') + t(s2.name) + ', week ' + saved.week,
        '**Ada permainan yang sedang berjalan:** ' + (saved.team ? saved.team + ', ' : '') + t(s2.name) + ', minggu ' + saved.week)]));
      const c = btn(S('つづきから', 'Continue', 'Lanjutkan'), function () { WS.setState(saved); route(); }, 'btn-primary');
      v.appendChild(c);
    }

    // 成績表
    const b = board();
    if (b.length) {
      v.appendChild(h('h3', { style: { marginTop: '26px' }, text: t(S('この端末の成績', 'Results on this device', 'Hasil di perangkat ini')) }));
      v.appendChild(boardTable(b));
    }
    const tallyBtn = btn(S('集計する（チーム対抗）', 'Tally the teams', 'Rekap tim'), function () {
      WS.setState({ screen: 'tally' }); route();
    }, 'btn-ghost');
    tallyBtn.style.marginTop = '12px';
    v.appendChild(tallyBtn);
    show(v);
  }

  function boardTable(rows) {
    const isProd = function (r) {
      const s2 = SCENARIOS.filter(function (x) { return x.code === r.sc; })[0];
      return !!(s2 && s2.kind === 'prod');
    };
    // 同点なら、品質は不良率の低いほう、生産性は日産の多いほうを上にする
    const byScore = rows.slice().sort(function (a, b) {
      if (b.score !== a.score) return b.score - a.score;
      return isProd(a) ? b.rate - a.rate : a.rate - b.rate;
    });
    const tb = h('tbody');
    tb.appendChild(h('tr', null,
      h('th', { text: '#' }),
      h('th', { text: t(S('チーム', 'Team', 'Tim')) }),
      h('th', { text: t(S('ライン', 'Line', 'Lini')) }),
      h('th', { text: t(S('スコア', 'Score', 'Skor')) }),
      h('th', { text: t(S('最後の4週', 'Last 4 weeks', '4 minggu terakhir')) }),
      h('th', { text: t(S('代償', 'What it cost', 'Biayanya')) })));
    byScore.forEach(function (r, i) {
      const s2 = SCENARIOS.filter(function (x) { return x.code === r.sc; })[0];
      // 生産性のラインは単位が違う。日産と、コスト欄にはリードタイムを入れてある。
      const prod = s2 && s2.kind === 'prod';
      tb.appendChild(h('tr', null,
        h('td', { text: String(i + 1) }),
        h('td', { text: r.team || '—' }),
        h('td', { text: s2 ? t(s2.name) : r.sc }),
        h('td', { text: String(r.score) }),
        h('td', { text: prod ? Math.round(r.rate) + t(S('個/日', ' pcs/day', ' pcs/hari')) : n1(r.rate) + '%' }),
        h('td', { text: prod ? n1(r.cost / 10) + t(S('日', ' days', ' hari')) : t(yen(r.cost)) })));
    });
    return h('div.table-wrap', null, h('table.tbl', null, tb));
  }

  /* ---- 集計 ---- */
  function screenTally() {
    const v = h('div');
    v.appendChild(h('h2', { text: t(S('チーム対抗の集計', 'Team tally', 'Rekap tim')) }));
    v.appendChild(note([S('各チームの結果画面に出る**結果コード**を、1行に1つずつ貼ってください。別の端末で遊んだ結果もここに集められます。',
      'Paste one **result code** per line, taken from each team’s result screen. Results played on other devices can be collected here too.',
      'Tempelkan satu **kode hasil** per baris, diambil dari layar hasil tiap tim. Hasil dari perangkat lain juga dapat dikumpulkan di sini.')]));
    const ta = h('textarea', { rows: 6, placeholder: 'WS-...-XXXX' });
    ta.style.cssText = 'width:100%;padding:10px 12px;border-radius:10px;border:1px solid var(--border-strong);background:var(--surface);color:var(--text);font:inherit;font-family:ui-monospace,monospace;font-size:13px';
    v.appendChild(ta);
    const out = h('div', { style: { marginTop: '14px' } });
    const go = btn(S('集計する', 'Tally', 'Rekap'), function () {
      const rows = [], bad = [];
      ta.value.split(/[\r\n]+/).forEach(function (line) {
        if (!line.trim()) return;
        const r = readCode(line);
        if (r) rows.push(r); else bad.push(line.trim());
      });
      out.innerHTML = '';
      if (bad.length) {
        out.appendChild(note([S('読めなかったコードが ' + bad.length + ' 件あります。写し間違いがないか確かめてください。',
          bad.length + ' code(s) could not be read. Check them for typing slips.',
          bad.length + ' kode tidak terbaca. Periksa apakah ada salah ketik.')]));
      }
      if (!rows.length) return;
      const byLine = {};
      rows.forEach(function (r) { (byLine[r.sc] = byLine[r.sc] || []).push(r); });
      Object.keys(byLine).sort().forEach(function (code) {
        const s2 = SCENARIOS.filter(function (x) { return x.code === code; })[0];
        out.appendChild(h('h3', { style: { marginTop: '18px' }, text: s2 ? t(s2.name) : code }));
        out.appendChild(boardTable(byLine[code]));
      });
      out.appendChild(note([S('同じラインどうしだけを比べてください。**ラインが違えば答えも届きうる最良も違う**ので、横並びにはなりません。',
        'Compare within a line only. **A different line has a different answer and a different best reachable rate**, so the numbers do not line up across lines.',
        'Bandingkan hanya dalam satu lini. **Lini yang berbeda punya jawaban dan tingkat terbaik yang berbeda**, jadi angkanya tidak sebanding antar lini.')]));
    }, 'btn-primary');
    go.style.marginTop = '10px';
    v.appendChild(go);
    v.appendChild(out);
    const back = btn(S('タイトルへ', 'To the title', 'Ke judul'), function () { WS.setState(null); route(); }, 'btn-ghost');
    back.style.cssText = 'margin-top:14px;margin-left:8px';
    v.appendChild(back);
    show(v);
  }

  /* ================= 進行 ================= */

  /* ---- 言語と表示切替 ---- */
  function applyChrome() {
    document.getElementById('g-name').textContent =
      t(S('現場再建記', 'Shopfloor Rebuild', 'Membangun Ulang Lantai Produksi'));
    document.getElementById('g-sub').textContent =
      t(S('16週のライン再建シミュレーション', 'A sixteen-week line-rebuilding simulation', 'Simulasi membangun ulang lini selama enam belas minggu'));
    document.title = document.getElementById('g-name').textContent + ' — ZEVA Academy';
  }
  function boot() {
    const sel = document.getElementById('g-lang');
    ZA.lang = ZA.store.get('lang', null) || (navigator.language || 'ja').slice(0, 2);
    if (ZA.LANGS.indexOf(ZA.lang) < 0) ZA.lang = 'ja';
    sel.value = ZA.lang;
    document.documentElement.lang = ZA.lang;
    sel.addEventListener('change', function () {
      ZA.lang = sel.value;
      ZA.store.set('lang', ZA.lang);
      document.documentElement.lang = ZA.lang;
      applyChrome(); route();
    });
    const th = ZA.store.get('theme', null);
    if (th) document.documentElement.setAttribute('data-theme', th);
    document.getElementById('g-theme').addEventListener('click', function () {
      const cur = document.documentElement.getAttribute('data-theme');
      const next = cur === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      ZA.store.set('theme', next);
    });
    applyChrome();
    WS.setState(null);
    route();
  }
  // 画面の登録。core の route はここを見る。
  Object.assign(WS.screens, {
    title: screenTitle, tally: screenTally, rules: screenRules,
    prologue: G.screenPrologue, recon: G.screenRecon, scope: G.screenScope,
    define: G.screenDefine, stdwork: G.screenStdWork,
    board: G.screenBoard, shop: G.screenShop, tune: G.screenTune,
    analyze: G.screenAnalyze, conclude: G.screenConclude, result: G.screenResult,
    // 手帳は品質・生産性の両方のラインで同じ画面。生産性の棚(P)に無いので、ここへ落ちてくる。
    notebook: G.screenNotebook
  });

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
