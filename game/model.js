/* 現場再建記 — 隠れモデル・調査の棚・スコープ・効果金額
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
  const st = WS.state;
  // 見立ての候補。並びと id はどの工程でも同じで、呼び名だけが変わる。
  const SUSPECTS = function () {
    return window.WOODSHOP_SUSPECTS.map(function (o) { return [o[0], vt('suspect.' + o[0], o[1])]; });
  };

  /* ================= 共通の定数 ================= */
  // machFix は「2台のうち片方だけ悪い機械を整備する」手。sc.mach を持つラインでだけ意味を持つ。
  const BASE = { kiln: 24, kilnTemp: 80, incoming: 0, press: 45, glueAmt: 22, toolLife: 40, grit: 120, roomCtl: 0,
    warmUp: 0, batchSel: 0, sharpen: 0, machFix: 0 };
  const BEST = { kiln: 40, kilnTemp: 60, incoming: 1, press: 60, glueAmt: 30, toolLife: 10, grit: 150, roomCtl: 0,
    warmUp: 1, batchSel: 1, sharpen: 1, machFix: 1 };
  // 乾燥温度は含水率の「幅」を決める。低いほど幅が狭くなり、そのぶん時間と燃料がかかる。
  const mcSigma = function (temp) { return 0.6 + (temp - 60) / 30 * 0.9; };
  const SHOCK_WEEK = 7, SHOCK = 1.2;

  const mcMean = function (kiln) { return 12.5 - (kiln - 24) * (2.5 / 12); };
  // 標準化したら、それ以前のデータは別の工程で取ったものになる。だから鍵に入れる。
  const CKEYS = ['kiln', 'kilnTemp', 'incoming', 'press', 'glueAmt', 'toolLife', 'grit', 'roomCtl',
    'warmUp', 'batchSel', 'sharpen', 'machFix'];
  const cfgKey = function (c, lv) {
    return CKEYS.map(function (k) { return c[k]; }).join('/') + '/s' + Math.round((lv || 0) * 5);
  };
  // 標準が無いときの作業者ごとの手順差。3人の平均は1.0なので、不良率の水準は動かない。動くのはばらつきだけ。
  const WORK = { A: 0.55, B: 1.90, C: 0.55 };
  /* ---- 工程ごとの言い換え ----
   * 模型の中身（含水率のような連続量が1つ、摩耗する道具が1つ、交絡が1つ、症状が3つ）は
   * どの工程でも同じ形をしている。違うのは呼び名だけなので、呼び名はシナリオが持つ。
   * シナリオに words があればそれを使い、無ければ木工の言葉に落ちる。
   * 新しい工程を足すときに触るのは scenarios.js だけで済む。
   */
  const vt = function (id, def) {
    const sc = scen();
    const m = (sc && sc.words) || {};
    return m[id] == null ? def : m[id];
  };
  /* 模型の中の数値は工程が変わっても同じだが、現場での呼び方と桁は変わる。
   * 木工の含水率は 7〜16%、射出成形の水分率は 0.07〜0.16%、組立のはめあい代は 70〜160μm。
   * どれも同じ 7〜16 を見ているだけなので、倍率と桁だけをシナリオに持たせる。 */
  const axScale = function (id) { return +vt('scale.' + id, 1); };
  const axDec = function (id) { return +vt('dec.' + id, 0); };
  const axShow = function (id, v) { return fmt(v * axScale(id), axDec(id)); };
  const PROCS = function () {
    return [
      vt('proc.1', S('1 製材', '1 Sawing', '1 Penggergajian')),
      vt('proc.2', S('2 乾燥', '2 Kiln', '2 Kiln')),
      vt('proc.3', S('3 NC加工', '3 NC machining', '3 Pemesinan NC')),
      vt('proc.4', S('4 接着', '4 Glue-up', '4 Perekatan')),
      vt('proc.5', S('5 研削', '5 Sanding', '5 Pengamplasan'))
    ];
  };
  // 標準作業が整っている割合。整っている工程が多いほど、手順のばらつきは薄まる。
  const stdLevel = function () {
    const d = (scen().stdDone || [true, false, false, false, true]);
    let n = 0;
    for (let i = 0; i < 5; i++) if (d[i] || (st().stdMade && st().stdMade[i])) n++;
    return n / 5;
  };
  const stdMissing = function () {
    const d = (scen().stdDone || [true, false, false, false, true]);
    const out = [];
    for (let i = 0; i < 5; i++) if (!d[i] && !(st().stdMade && st().stdMade[i])) out.push(i);
    return out;
  };
  // 追加コストは「最初の条件からの増分」。BASE 自体に 2.8 の素のコストがあり、
  // 何も変えていないのに「効果金額 −36万円/年」と出ていた(実プレイで検出 2026-09-22)。
  const costOf = function (c) { return Math.round(rawCost(c) - rawCost(BASE)); };
  const rawCost = function (c) {
    return (
      (c.kiln - 24) * 1.6
      + (90 - c.kilnTemp) * 0.25
      + c.incoming * 12
      + (c.press - 45) * 0.7
      + Math.abs(c.glueAmt - 20) * 0.15
      + (40 - c.toolLife) * 0.9
      + (c.grit - 120) * 0.25
      + c.roomCtl * 18
      + (c.warmUp || 0) * 5
      + (c.batchSel || 0) * 15
      + (c.sharpen || 0) * 4
      // 機械の整備は、片方だけ悪い機械があるラインでだけ費用になる
      + (c.machFix || 0) * ((scen() || {}).mach ? 6 : 0));
  };
  // 条件オブジェクトは必ず BASE を土台にする。項目を増やしたときの落としを防ぐ。
  const withBase = function (o) { return Object.assign({}, BASE, o); };

  /* ---- 1日の中の時間の癖 ----
   * どれも8時間ならした平均が1.0になるように置いてある。だから日や週でまとめた
   * 不良率の水準は動かない。動くのは「1日の中のどこで出るか」だけで、
   * 日次・時間別で見てはじめて形が見える。
   */
  // 朝いちばんは機械が冷えていて荒れる。昼休み明けも少し戻る。
  const HOUR_F = [1.90, 0.8083, 0.8083, 0.8083, 1.25, 0.8083, 0.8083, 0.8083];
  // 室温は昼に向かって上がる。8時間の平均は0なので、室温の水準も動かない。
  const HOUR_T = function (hr) { return (hr - 4.5) * 0.35; };
  // 材は入荷のまとまりで届く。1日の中で同じ山から取るので、日をまたぐ差（群間）と
  // 日の中の差（群内）に分かれる。合わせた幅は mcSigma のままなので、分布は変わらない。
  const BATCH_FRAC = 0.5;

  // 二項。1ロット25個を検査するので、n が小さく素直に回してよい。
  // 1日ぶんの8ロット（1時間に1ロット）。乱数の引き方の順序は変えないこと。
  // 不良は「個数」で数える。不良率 ＝ 不良個数 ÷ 検査個数 なので計数値であり、p管理図で見られる。
  function runDay(r, cfg, dayNo, shock, sc, stdLv, wear0) {
    const out = [];
    const w = Math.ceil(dayNo / DPW), dow = dayNo - (w - 1) * DPW;
    const pd = Math.max(0, (60 - cfg.press) / 10);
    const gd = Math.max(0, (150 - cfg.grit) / 30);
    const D = sc.d, G = sc.g, Su = sc.s;
    // 手順のばらつきは本筋と別の乱数列から引く。そうしないと、標準化の有無で
    // 材や刃の当たり外れまで変わってしまい、同じ条件の比較にならない。
    const lv = stdLv == null ? 1 : stdLv;
    const r2 = lv >= 1 ? null : mulberry32(sc.seed + dayNo * 7919);
    const wkDrift = lv >= 1 ? 1 : 1 + (randn(r2) * 0.10) * (1 - lv);
    const sg = mcSigma(cfg.kilnTemp);
    const ctr = mcMean(cfg.kiln) + season(w) + (shock || 0);
    let batch = randn(r) * sg * BATCH_FRAC;
    // 入荷ロットの選別。その日の山の平均が12.0%を超えていたら、荷受けで返して
    // 別の山に差し替える。1個ずつはじく受入検査とちがい、日をまたぐ差（群間）に効く。
    const bsel = r();
    if (ctr + batch > 12.0 && bsel < (cfg.batchSel || 0)) batch = 11.0 - ctr;
    const sgIn = sg * Math.sqrt(1 - BATCH_FRAC * BATCH_FRAC);
    // 予熱を入れると、冷えた機械で出ていたぶんだけが消える。1.0を下回る時間は動かない。
    const wu = cfg.warmUp || 0;
    const hf = HOUR_F.map(function (x) { return x - wu * Math.max(0, x - 1); });
    // 室温の日内の動きを足したぶん、残りのゆれを細くして、合計の幅は元のままにする。
    let vT = 0;
    for (let q = 1; q <= HOURS; q++) vT += HOUR_T(q) * HOUR_T(q);
    const sgT = Math.sqrt(Math.max(0.04, 1.2 * 1.2 - vT / HOURS));
    let wear = wear0 || 0;
    for (let hr = 1; hr <= HOURS; hr++) {
      let mc = ctr + batch + randn(r) * sgIn;
      // 受入で12.5%超をはじく。原因は直っていないが、その分の材は流れてこない。
      const scr = r();
      if (mc > 12.5 && scr < cfg.incoming) mc = 11.5;
      // 刃は1時間に1時間ぶん減り、交換周期で新品に戻る。長く見れば分布は前と同じで、
      // 1日の中で見ると、のこぎりの歯の形が出る。
      const wearH = wear % cfg.toolLife;
      let wearV = wearH + r();
      // 途中研ぎ。周期の半ばで一度だけ研ぐので、後半の減りが周期の1/4ぶん戻る。
      if (cfg.sharpen && wearH >= cfg.toolLife / 2) wearV -= cfg.toolLife / 4;
      wear += 1;
      // 室温を管理すると、材の状態との連れ動きが消える。不良率は動かない。
      // 「相関のある方を押さえても何も起きない」ことを、自分の手で確かめられる。
      const roomT = 18 + (mc - 10) * 1.6 * (1 - (cfg.roomCtl || 0)) + HOUR_T(hr) + randn(r) * sgT;
      const worker = ['A', 'B', 'C'][Math.floor(r() * 3)];
      const machine = ['NC-1', 'NC-2'][Math.floor(r() * 2)];
      const e = Math.max(0, mc - 11), wr = wearV / 20;
      // 標準が整っている割合だけ、手順のばらつきが薄まる
      // 手順差の係数。ふつうは3人の平均が1.0で、標準化しても水準は動かない。
      // sc.wrk を持つラインだけ平均が1.0より大きく、標準化そのものが効き目を持つ。
      const wkMap = sc.wrk || WORK;
      const f0 = lv >= 1 ? 1
        : Math.max(0.25, 1 + (wkMap[worker] * (1 + randn(r2) * 0.25) * wkDrift - 1) * (1 - lv));
      // 2台のうち片方だけ具合が悪いライン用。2台の平均は1.0なので全体の水準は動かず、
      // 機械で層別してはじめて差が出る。sc.mach が無いラインでは何も起きない。
      // 整備すると、悪いほうの機械が良いほうと同じになる。条件のつまみと違い、片方にだけ効く。
      const mg = sc.mach ? (machine === 'NC-1' || cfg.machFix ? 1 - sc.mach / 2 : 1 + sc.mach / 2) : 1;
      const f = f0 * hf[hr - 1] * mg;
      out.push({
        w: w, d: dow, dn: dayNo, hr: hr, mc: mc, wear: wearV, roomT: roomT,
        worker: worker, machine: machine, k: cfgKey(cfg, lv), n: PIECES,
        dim: binom(r, PIECES, f * (D[0] + D[1] * e + D[2] * wr + D[3] * e * wr) / 100),
        // 塗布量は30が最適。少なすぎても多すぎても付きが悪くなる。
        glue: binom(r, PIECES, f * (G[0] + G[1] * e + G[2] * pd + G[3] * e * pd + G[4] * wr
          + Math.abs(cfg.glueAmt - 30) / 10 * 0.8) / 100),
        surf: binom(r, PIECES, f * (Su[0] + Su[1] * e + Su[2] * gd + Su[3] * e * gd + Su[4] * wr) / 100)
      });
    }
    return { lots: out, wear: wear };
  }
  // 日通し番号。第1週の1日目が1、16週の5日目が80。
  const dayNo = function (x) { return x.dn != null ? x.dn : (x.w - 1) * DPW + x.d; };
  const piecesOf = function (a) { return a.reduce(function (s, x) { return s + x.n; }, 0); };
  const countOf = function (a, k) { return a.reduce(function (s, x) { return s + x[k]; }, 0); };
  // 症状ごとの不良率(%)。分母は必ず検査個数。
  const rateOf1 = function (a, k) { const n = piecesOf(a); return n ? 100 * countOf(a, k) / n : 0; };
  // 1ロットの不良率(%)。層別の目安を出すときの観測単位。key を渡すと症状ごと。
  const lotRate = function (x, key) { return 100 * (key ? x[key] : x.dim + x.glue + x.surf) / x.n; };
  // 層の平均の標準誤差。ロットのばらつき ÷ √ロット数。
  const seLots = function (a, key) {
    if (a.length < 2) return 99;
    const r = a.map(function (x) { return lotRate(x, key); });
    const m = r.reduce(function (s2, x) { return s2 + x; }, 0) / r.length;
    const va = r.reduce(function (s2, x) { return s2 + (x - m) * (x - m); }, 0) / (r.length - 1);
    return Math.sqrt(va / r.length);
  };
  // 3σを越えているか。越えていなければ偶然の範囲。
  const beyond3 = function (g0, g1, key) {
    const d = Math.abs(rateOf1(g0, key) - rateOf1(g1, key));
    return d >= 3 * Math.sqrt(seLots(g0, key) * seLots(g0, key) + seLots(g1, key) * seLots(g1, key));
  };
  const rateOfLots = function (a) {
    const n = piecesOf(a);
    return n ? 100 * (countOf(a, 'dim') + countOf(a, 'glue') + countOf(a, 'surf')) / n : 0;
  };
  // 条件を固定したまま流したときの、1週ぶんの日を並べる小さな走行
  function runSpan(cfg, sc, d0, d1, withShock, stdLv) {
    let rows = [];
    let wear = 0;
    // 刃の減りは前から続いているので、助走をつけて途中の状態から始める
    for (let n = Math.max(1, d0 - DPW * 2); n < d0; n++) wear += HOURS;
    for (let n = d0; n <= d1; n++) {
      const w = Math.ceil(n / DPW);
      const r = mulberry32(sc.seed + n * 1013);
      const res = runDay(r, cfg, n, withShock && w === SHOCK_WEEK ? SHOCK : 0, sc,
        stdLv == null ? 1 : stdLv, wear);
      wear = res.wear;
      rows = rows.concat(res.lots);
    }
    return rows;
  }
  // 最初から整っている標準作業の割合。「何も手を打たなかったら」の比較に使う。
  const stdLevel0 = function (sc) {
    const d = ((sc || scen()).stdDone) || [true, false, false, false, true];
    let n = 0;
    for (let i = 0; i < 5; i++) if (d[i]) n++;
    return n / 5;
  };
  // 条件を固定したまま流したときの、最後の4週のロット。効果金額の見積もりに使う。
  function simRows(cfg, sc) {
    return runSpan(cfg, sc, (WEEKS - 4) * DPW + 1, WEEKS * DPW, false);
  }
  // 参考走行。条件を固定したまま16週流したときの週ごとの実績。
  // 乱数の作り方は advanceDay() と同じにする。そうしないと「何も変えなかった場合」が
  // 実際の16週と別の材料になり、チーム同士の比較が同じ天気の比較でなくなる。
  function reference(cfg, sc) {
    const out = [];
    const all = runSpan(cfg, sc, 1, DAYS, true);
    for (let w = 1; w <= WEEKS; w++) {
      out.push(rateOfLots(all.filter(function (x) { return x.w === w; })));
    }
    return out;
  }
  const last4 = function (a) { return a.slice(-4).reduce(function (s, x) { return s + x; }, 0) / 4; };

  /* ================= 期中の作り込み =================
   * 効果金額（年換算）は「最後にどの条件に居たか」しか見ない。それだけだと、
   * 10日目に原因へ辿り着いた班と75日目に辿り着いた班が同じ点になる。
   * そこで、16週のあいだに実際に減らした損失も数える。
   *   1日 = 8時間 × 25個 = 200個。不良1個の損失は5,000円。
   *   だから「ある1日に1ポイント下げた」＝ 200×0.01×5,000円 ＝ 1万円。
   * 早く辿り着くほど、その1万円が積み上がる日数が増える。
   */
  const DAY_PCS = HOURS * PIECES;
  const madeMan = function (pt) { return DAY_PCS * pt / 100 * UNIT_LOSS / 10000; };
  // 「何も手を打たなかったら」の1日ごとの不良率。条件はBASE、標準は最初のまま。
  const refDaily = function (sc, ys) {
    const rows = runSpan(BASE, sc, 1, DAYS, true, stdLevel0(sc));
    const out = [];
    for (let n = 1; n <= DAYS; n++) {
      const d = rows.filter(function (x) { return x.dn === n; });
      out.push(ys.reduce(function (a, y) { return a + rateOf1(d, y); }, 0));
    }
    return out;
  };
  // 1日ごとに「減らせた分 − その日かかった費用」を積む。
  // 費用は月あたりなので、1か月＝20日で割って日割りにする。
  const madeOf = function (sc, ys, days) {
    const ref = refDaily(sc, ys);
    let gain = 0, cost = 0;
    days.forEach(function (d) {
      const r = ref[d.dn - 1];
      if (r == null) return;
      gain += madeMan(r - d.rate);
      cost += (d.cost || 0) / (DPW * 4);
    });
    return { gain: gain, cost: cost, net: gain - cost, ref: ref };
  };
  // 実際に流したロットから、1日ごとの「対象にした不良だけ」の率を出す
  const myDaily = function (ys) {
    const by = {};
    st().lots.forEach(function (x) { (by[x.dn] = by[x.dn] || []).push(x); });
    const dh = st().dayHist || [];
    return dh.map(function (h2) {
      const rows = by[h2.dn] || [];
      return { dn: h2.dn, cost: h2.cost, rate: ys.reduce(function (a, y) { return a + rateOf1(rows, y); }, 0) };
    });
  };
  // 上限。調べてから直す順路で現実に着ける日(REACH_DAY)にいちばん金額の出る条件へ着き、
  // そこから最後まで流していたら、いくら作り込めたか。初日からにすると、調べる順路では構造的に届かない
  // (2026-09-22 実プレイ評価: 48日目に着いて 342/855万円=4点)。
  const REACH_DAY = 30;
  const madeCap = function (sc, ys, cfg) {
    const ref = refDaily(sc, ys);
    const rows = runSpan(cfg, sc, REACH_DAY, DAYS, true, 1);
    const days = [];
    for (let n = 1; n <= DAYS; n++) {
      if (n < REACH_DAY) { days.push({ dn: n, cost: 0, rate: ref[n - 1] }); continue; }
      const d = rows.filter(function (x) { return x.dn === n; });
      days.push({ dn: n, cost: costOf(cfg), rate: ys.reduce(function (a, y) { return a + rateOf1(d, y); }, 0) });
    }
    return madeOf(sc, ys, days).net;
  };

  /* ================= 調査の棚 ================= */
  const SHOP0 = [
    { id: 'daily', pt: 10, wk: 3,
      name: S('日次の不良率記録', 'Daily defect record', 'Catatan cacat harian'),
      gain: S('寸法・接着・面質を分けて数える。症状ごとに層別できるようになる',
        'Count dimension, adhesion and surface separately, so you can stratify each symptom on its own',
        'Hitung dimensi, perekatan, dan permukaan terpisah, agar tiap gejala dapat distratifikasi sendiri') },
    { id: 'stdaudit', pt: 5, wk: 1,
      name: S('標準作業の棚卸し', 'Take stock of the standard work', 'Inventarisasi kerja standar'),
      gain: S('5工程のどこに標準があり、どこに無いかを調べる。無い工程は、調べてはじめて手を入れられる',
        'Find which of the five processes have standard work and which do not. Until you have looked, you cannot fix the ones that do not',
        'Cari proses mana dari kelima yang punya kerja standar dan mana yang tidak. Sebelum melihat, Anda tidak dapat memperbaiki yang tidak punya') },
    { id: 'msa', pt: 15, wk: 2,
      name: S('測定のばらつきを確かめる（MSA）', 'Check the measurement scatter (MSA)', 'Periksa variasi pengukuran (MSA)'),
      gain: S('これを省くと、毎週の数字に判定のゆれが乗り続ける',
        'Skip it and every weekly number keeps carrying the scatter of the judgement',
        'Jika dilewati, setiap angka mingguan terus membawa variasi penilaian') },
    { id: 'attr', pt: 10, wk: 1,
      name: S('ロット属性の記録（作業者・機械・室温）', 'Lot attributes (operator, machine, room temperature)', 'Atribut lot (operator, mesin, suhu ruang)'),
      gain: S('この3つで層別できるようになる。記録を始めた週より前には遡れない',
        'Lets you stratify by these three. It cannot reach back before the week you start recording',
        'Memungkinkan stratifikasi menurut ketiganya. Tidak dapat menjangkau sebelum minggu pencatatan dimulai') },
    { id: 'mc', pt: 25, wk: 3,
      name: S('材の含水率を実測する', 'Measure the moisture content of the stock', 'Ukur kadar air material'),
      gain: S('乾燥から出てくる材の状態が見えるようになる',
        'Shows the state of the stock leaving the kiln',
        'Menampilkan kondisi material yang keluar dari kiln') },
    { id: 'wear', pt: 15, wk: 2,
      name: S('刃の使用時間を記録する', 'Log the cutter hours', 'Catat jam pakai pisau'),
      gain: S('NC加工の刃の摩耗で層別できる', 'Lets you stratify by cutter wear at the NC', 'Memungkinkan stratifikasi menurut keausan pisau di NC') },
    { id: 'doe', pt: 30, wk: 3,
      name: S('試験ラインで条件を振る（実験計画）', 'Vary the conditions on a trial line (designed experiment)', 'Variasikan kondisi di lini uji (desain eksperimen)'),
      gain: S('本番を止めずに在炉時間 × 圧締時間の4通りを流す。組み合わせたときだけ出る不良が見える',
        'Runs four combinations of kiln hours by press time without stopping production, so a defect that appears only when two coincide becomes visible',
        'Menjalankan empat kombinasi jam kiln dan waktu pres tanpa menghentikan produksi, sehingga cacat yang hanya muncul saat keduanya bertemu menjadi terlihat') }
  ];
  const SHOP = function () {
    return SHOP0.map(function (o) { return Object.assign({}, o, { name: vt('shop.' + o.id, o.name), gain: vt('shop.' + o.id + '.gain', o.gain) }); });
  };
  const shopById = function (id) { return SHOP().filter(function (x) { return x.id === id; })[0]; };

  /* ================= 層別できる因子 ================= */
  const FACTORS = function () {
    return [
    { id: 'mc', need: 'mc', label: vt('fac.mc', S('含水率', 'Moisture content', 'Kadar air')),
      split: function (x) { return x.mc < 11 ? 0 : 1; },
      bins: [vt('fac.mc.b0', S('11%未満', 'Below 11%', 'Di bawah 11%')), vt('fac.mc.b1', S('11%以上', '11% and over', '11% ke atas'))] },
    { id: 'wear', need: 'wear', label: vt('fac.wear', S('刃の使用時間', 'Cutter hours', 'Jam pakai pisau')),
      split: function (x) { return x.wear < 20 ? 0 : 1; },
      bins: [vt('fac.wear.b0', S('20時間未満', 'Under 20 h', 'Di bawah 20 jam')), vt('fac.wear.b1', S('20時間以上', '20 h and over', '20 jam ke atas'))] },
    { id: 'roomT', need: 'attr', label: vt('fac.roomT', S('室温', 'Room temperature', 'Suhu ruang')),
      split: function (x) { return x.roomT < 20 ? 0 : 1; },
      bins: [S('20℃未満', 'Below 20 °C', 'Di bawah 20 °C'), S('20℃以上', '20 °C and over', '20 °C ke atas')] },
    { id: 'worker', need: 'attr', label: vt('fac.worker', S('作業者', 'Operator', 'Operator')),
      split: function (x) { return x.worker === 'A' ? 0 : 1; },
      bins: [S('作業者A', 'Operator A', 'Operator A'), S('作業者B・C', 'Operators B and C', 'Operator B dan C')] },
    { id: 'machine', need: 'attr', label: vt('fac.machine', S('機械番号', 'Machine', 'Mesin')),
      split: function (x) { return x.machine === 'NC-1' ? 0 : 1; },
      bins: [vt('mach.0', S('NC-1', 'NC-1', 'NC-1')), vt('mach.1', S('NC-2', 'NC-2', 'NC-2'))] }
    ];
  };
  const SYMPTOMS = function () {
    return [
      ['dim', vt('sym.dim', S('寸法', 'Dimension', 'Dimensi'))],
      ['glue', vt('sym.glue', S('接着', 'Adhesion', 'Perekatan'))],
      ['surf', vt('sym.surf', S('面質', 'Surface', 'Permukaan'))]
    ];
  };

  /* ================= 日常点検の候補 ================= */
  // 日常点検の候補。どれが「効く」かは原因によって変わるので、
  // シナリオが controls を持っていればそれをそのまま使う。
  const CONTROLS = function () {
    const own = (scen() || {}).controls;
    if (own) return own;
    return [
      { id: 'mc', ok: true, label: vt('ctrl.mc', S('乾燥出しの含水率を毎日測る', 'Measure moisture at the kiln exit every day', 'Ukur kadar air saat keluar dari kiln setiap hari')) },
      { id: 'tool', ok: true, label: vt('ctrl.tool', S('刃の使用時間を記録し、基準で交換する', 'Log cutter hours and change on the rule', 'Catat jam pakai pisau dan ganti sesuai aturan')) },
      { id: 'press', ok: true, label: vt('ctrl.press', S('圧締時間をタイマーで固定する', 'Fix the press time with a timer', 'Tetapkan waktu pres dengan pengatur waktu')) },
      { id: 'grit', ok: true, label: vt('ctrl.grit', S('番手の交換基準を決めて掲示する', 'Set and post a rule for changing grit', 'Tetapkan dan pasang aturan penggantian grit')) },
      { id: 'room', ok: false, label: vt('ctrl.room', S('室温を毎日記録する', 'Record the room temperature every day', 'Catat suhu ruang setiap hari')) },
      { id: 'worker', ok: false, label: vt('ctrl.worker', S('作業者に注意を呼びかける', 'Remind the operators to take care', 'Ingatkan operator untuk berhati-hati')) }
    ];
  };
  const PICK_N = 3;

  /* ================= 状態と保存 ================= */

  // MSA を買うまで、見える数字には判定のゆれが乗る。値ごとに決まるので再描画しても動かない。
  function shownVal(v, salt) {
    if (has('msa')) return v;
    const r = mulberry32(Math.round(v * 1000) + salt * 97);
    return v * (1 + (r() - 0.5) * 0.6);
  }
  // 今の条件のもとで、その属性を記録していた週のロットだけが層別に使える
  function usable(need) {
    const from = st().bought[need];
    if (from == null) return [];
    const k = cfgKey(st().cfg, stdLevel());
    return st().lots.filter(function (x) { return x.w >= from && x.k === k; });
  }

  /* ================= 1日を進める =================
   * 手を打つ単位は1日。条件を変えれば翌日から効くので、週のまん中でも方針を変えられる。
   * 週ごとの記録は、5日目を流し終えたところで1行ぶん締める。
   */
  function advanceDay(noteLine) {
    const dn = st().day + 1;
    const w = Math.ceil(dn / DPW);
    const sc = scen();
    // 日番号を種に混ぜる。条件を変えても、同じ日には同じ材料が入ってくる。
    const r = mulberry32(sc.seed + dn * 1013);
    const res = runDay(r, st().cfg, dn, w === SHOCK_WEEK ? SHOCK : 0, sc, stdLevel(), st().wearHrs);
    const lots = res.lots;
    st().wearHrs = res.wear;
    st().day = dn;
    st().week = w;
    st().lots = st().lots.concat(lots);
    const dRate = rateOfLots(lots);
    st().dayHist = (st().dayHist || []).concat([{
      dn: dn, w: w, d: dn - (w - 1) * DPW, rate: dRate, shown: shownVal(dRate, dn),
      k: cfgKey(st().cfg, stdLevel()), std: stdLevel(), cost: costOf(st().cfg),
      act: st().actToday || null, note: noteLine || null
    }]);
    st().actToday = null;
    if (dn % DPW === 0) {
      // 週が締まった。週の記録は、その週に流した5日ぶんから作る。
      const wk = st().lots.filter(function (x) { return x.w === w; });
      const rate = rateOfLots(wk);
      st().hist.push({ w: w, rate: rate, shown: shownVal(rate, w), k: cfgKey(st().cfg, stdLevel()),
        std: stdLevel(), act: st().actThisWeek || null, note: st().noteThisWeek || null });
      st().actThisWeek = null;
      st().noteThisWeek = null;
    }
    if (noteLine) st().noteThisWeek = noteLine;
    if (st().pendingStd != null) {
      // 決めている最中の工程が1つある。5日で仕上がる。
      st().pendingStdLeft = (st().pendingStdLeft == null ? DPW : st().pendingStdLeft) - 1;
      if (st().pendingStdLeft <= 0) {
        st().stdMade = st().stdMade || {};
        st().stdMade[st().pendingStd] = true;
        st().stdFrom = st().stdFrom == null ? w : st().stdFrom;
        const procName = PROCS()[st().pendingStd];
        st().pendingStd = null;
        st().pendingStdLeft = null;
        // 標準を入れた日に走っていた調査は、前の工程で取ったものになる
        WS.surveys().forEach(function (sv) {
          if (sv.voided) return;
          sv.voided = true;
          WS.addNote('sys', S('標準作業が仕上がった日に走っていた調査は、前の工程で取ったものになり読めなくなった',
            'The survey running on the day the standard was finished belongs to the old process and can no longer be read',
            'Survei yang berjalan pada hari standar selesai menjadi milik proses lama dan tidak lagi terbaca'));
        });
        WS.addNote('sys', S('「' + t(procName) + '」の標準作業が仕上がった。ここから先のデータは別の工程のもの',
          'Standard work for “' + t(procName) + '” is in place. Data from here on comes from a different process',
          'Kerja standar untuk “' + t(procName) + '” sudah ada. Data mulai sekarang berasal dari proses yang berbeda'));
      }
    }
    // 走っている調査を1日ずつ進める。同時に2本まで走る。
    WS.surveys().forEach(function (sv) {
      sv.left -= 1;
      if (sv.left > 0) return;
      if (!sv.voided) {
        const sid = sv.id;
        st().bought[sid] = w;
        st().boughtDay = st().boughtDay || {};
        st().boughtDay[sid] = dn;
        if (sid === 'doe') st().doe = doeTable();
        WS.addNote('sys', S('「' + t(shopById(sid).name) + '」の結果が出た', 'Results are in for “' + t(shopById(sid).name) + '”', 'Hasil “' + t(shopById(sid).name) + '” sudah keluar'), { survey: sid });
        // 測り始めると、その条件を動かす手が候補に上がる
        if (sid === 'mc') unlock('kiln');
        if (sid === 'wear') unlock('toolLife');
      } else {
        st().flags.voided = (st().flags.voided || 0) + 1;
      }
    });
    st().surveys = WS.surveys().filter(function (sv) { return sv.left > 0; });
    save();
  }
  // 1週ぶん（5日）まとめて流す
  function advance(noteLine) {
    for (let i = 0; i < DPW && st().day < DAYS; i++) advanceDay(i === 0 ? noteLine : null);
  }
  function doeTable() {
    const sc = scen();
    const cell = function (kiln, press) {
      return last4(reference(withBase({ kiln: kiln, press: press }), sc));
    };
    return { a: cell(24, 45), b: cell(24, 60), c: cell(40, 45), d: cell(40, 60) };
  }

  /* ================= 効果金額 =================
   * 年48週 × 週1,000個 ＝ 48,000個。不良1個の損失は材料と手直し工数で5,000円。
   * 効果金額 ＝（対象にした不良の損失の減り）－ 追加コスト×12か月。
   * 不良率をいちばん下げる条件と、金額がいちばん大きくなる条件は一致しない。
   * scratchpad/money.js で検算済み。
   */
  const YEAR_PCS = 48 * 1000, UNIT_LOSS = 5000;
  const lossMan = function (pct) { return YEAR_PCS * pct / 100 * UNIT_LOSS / 10000; };
  // 16週ぶんの額。年換算ではないので「/年」を付けない。
  const manSpan = function (v) {
    const n = Math.round(v);
    return S(n.toLocaleString() + '万円（16週）', '¥' + (n * 10000).toLocaleString('en-US') + ' (16 wks)',
      '¥' + (n * 10000).toLocaleString('id-ID') + ' (16 minggu)');
  };
  const man = function (v) {
    const n = Math.round(v);
    return S(n.toLocaleString() + '万円/年', '¥' + (n * 10000).toLocaleString('en-US') + '/yr',
      '¥' + (n * 10000).toLocaleString('id-ID') + '/thn');
  };

  /* ================= 採点の配点 =================
   * 「あそびかた」の画面も結果画面も、この1つの表から引く。
   * 説明と実装が別々に書かれていると、片方だけ直したときに必ず食い違う。
   */
  const SCORE = [
    ['money', 20, S('効果金額（年換算）', 'Benefit in money (annualised)', 'Manfaat tahunan (dalam uang)'),
      S('いまの条件をこのまま1年続けたときの効果。**最後にどの条件に居るか**だけで決まる',
        'What the current settings are worth if held for a year. It depends only on **where you ended up**',
        'Nilai setelan sekarang bila dipertahankan setahun. Hanya bergantung pada **di mana Anda berakhir**')],
    ['made', 10, S('期中の作り込み', 'Built in during the run', 'Perolehan selama periode'),
      S('16週のあいだに実際に減らした損失。**いつそこへ辿り着いたか**で決まる。1日を1ポイント下げれば1万円。満点は「30日目に最適条件へ着いた場合」',
        'The loss actually avoided over the sixteen weeks. It depends on **when you got there**. A point off one day is worth ¥10,000. Full marks means reaching the best settings by day 30',
        'Kerugian yang benar-benar dihindari selama enam belas minggu. Bergantung pada **kapan Anda sampai**. Satu poin sehari bernilai ¥10.000. Nilai penuh berarti mencapai setelan terbaik pada hari ke-30')],
    ['cause', 15, S('原因の見立て', 'Your reading of the cause', 'Pembacaan penyebab Anda'),
      S('最後に選んだ原因が当たっていれば15点。ただし、**その原因を疑う仮説を手帳に書いていなければ10点**。外れれば0',
        'Fifteen if the cause you name is right, **but only ten if you never wrote a hypothesis naming it**. Nothing if it is wrong',
        'Lima belas bila penyebab yang Anda sebut benar, **tetapi hanya sepuluh bila Anda tidak pernah menulis hipotesis yang menyebutnya**. Nol bila salah')],
    ['control', 15, S('維持のしくみ', 'What holds the gain', 'Mekanisme mempertahankan hasil'),
      S('日常点検に載せた3件のうち、実際に効くものがいくつか。**直すことと、戻らないようにすることは別**',
        'How many of your three daily-check items actually matter. **Fixing it and keeping it fixed are two different things**',
        'Berapa dari tiga butir periksa harian Anda yang benar-benar berarti. **Memperbaiki dan menjaga agar tetap baik adalah dua hal berbeda**')],
    ['eff', 12, S('コスト効率', 'Cost efficiency', 'Efisiensi biaya'),
      S('1ポイント下げるのにいくら払ったか。**締めれば締めるほどよいわけではない**',
        'What you paid per point removed. **Tighter is not automatically better**',
        'Berapa yang Anda bayar per poin yang dihilangkan. **Lebih ketat tidak otomatis lebih baik**')],
    ['book', 10, S('手帳：仮説を立てて確かめたか', 'Notebook: hypotheses written and checked', 'Buku catatan: hipotesis ditulis dan diperiksa'),
      S('調査を始める前に仮説を書いたか(5点)、書いた仮説を確かめた結果まで書いたか(5点)。**書いていない当たりは、偶然と区別できない**',
        'Was a hypothesis written before each survey (5), and was the check of each hypothesis recorded (5). **A right answer with nothing written is indistinguishable from luck**',
        'Apakah hipotesis ditulis sebelum tiap survei (5), dan apakah hasil pemeriksaan tiap hipotesis dicatat (5). **Jawaban benar tanpa catatan tidak dapat dibedakan dari kebetulan**')],
    ['msa', 5, S('測定のばらつきを確かめたか', 'Did you check the measurement scatter', 'Apakah memeriksa variasi pengukuran'),
      S('確かめていないと、画面に出る数字すべてに判定のゆれが乗ったままになる',
        'Skip it and every number on screen keeps carrying the scatter of the judgement',
        'Jika dilewati, setiap angka di layar terus membawa variasi penilaian')],
    ['std', 8, S('標準作業をそろえたか', 'Did you get the standard work in place', 'Apakah kerja standar tersusun'),
      S('そろえた工程の数。**遅れて入れると、それ以前のデータは別の工程のものになる**ので減点',
        'How many processes you settled. **Do it late and the data you already hold came from a different process**, so it scores less',
        'Berapa proses yang Anda tetapkan. **Terlambat melakukannya berarti data yang sudah ada berasal dari proses lain**, jadi nilainya berkurang')],
    ['target', 5, S('目標の置き方', 'How you set the target', 'Cara menetapkan sasaran'),
      S('理論値から逆算したか、それとも去年より少しよく、で置いたか',
        'Did you work back from the theoretical value, or just aim a little better than last year',
        'Apakah Anda menghitung mundur dari nilai teoretis, atau sekadar sedikit lebih baik dari tahun lalu')]
  ];
  const SCORE_W = {};
  SCORE.forEach(function (x) { SCORE_W[x[0]] = x[1]; });

  /* ================= スコープ ================= */
  const SCOPES = [
    { id: 'all', ys: ['dim', 'glue', 'surf'], knobs: ['kiln', 'kilnTemp', 'incoming', 'press', 'glueAmt', 'toolLife', 'grit', 'roomCtl', 'warmUp', 'batchSel', 'sharpen', 'machFix'],
      name: S('ライン全体', 'The whole line', 'Seluruh lini'),
      what: S('製材から研削まで。3つの不良すべてを自分の成果に数える',
        'From sawing to sanding. All three defects count as yours',
        'Dari penggergajian hingga pengamplasan. Ketiga cacat dihitung sebagai milik Anda'),
      risk: S('触れる条件は全工程ぶん。上限はいちばん高いが、調べる属性も多く、90ポイントでは全部は見きれない',
        'Conditions across every process. The highest ceiling, but the most attributes to buy, and ninety points will not cover them all',
        'Kondisi di seluruh proses. Plafon tertinggi, tetapi paling banyak atribut yang harus dibeli, dan sembilan puluh poin tidak akan menutupi semuanya') },
    { id: 'up', ys: ['dim'], knobs: ['kiln', 'kilnTemp', 'incoming', 'toolLife', 'roomCtl', 'warmUp', 'batchSel', 'sharpen', 'machFix'],
      name: S('乾燥とNC加工', 'The kiln and the NC', 'Kiln dan NC'),
      what: S('上流の2工程。寸法の不良だけを自分の成果に数える',
        'The two upstream processes. Only the dimensional defect counts as yours',
        'Dua proses hulu. Hanya cacat dimensi yang dihitung sebagai milik Anda'),
      risk: S('上流の条件に手が届くので下流も良くなるが、それは副次効果で、正式な効果金額には入らない',
        'You can reach the kiln hours, so the downstream improves too — but that is a side benefit and does not enter the official figure',
        'Anda dapat menjangkau jam kiln, sehingga hilir juga membaik — tetapi itu manfaat sampingan dan tidak masuk angka resmi') },
    { id: 'down', ys: ['glue', 'surf'], knobs: ['press', 'glueAmt', 'grit', 'roomCtl', 'warmUp'],
      name: S('接着と研削', 'Glue-up and sanding', 'Perekatan dan pengamplasan'),
      what: S('下流の2工程。接着と面質を自分の成果に数える',
        'The two downstream processes. Adhesion and surface count as yours',
        'Dua proses hilir. Perekatan dan permukaan dihitung sebagai milik Anda'),
      risk: S('工程の中で完結するので確実だが、上流の材料には手が出せない。上限はそのぶん低い',
        'It closes inside the processes, so it is the safe one — but the moisture upstream is out of reach, and the ceiling is lower for it',
        'Selesai di dalam prosesnya, jadi ini yang aman — tetapi kadar air di hulu tak terjangkau, dan plafonnya lebih rendah') }
  ];
  const scopeOf = function () { return SCOPES.filter(function (x) { return x.id === (st().scope || 'all'); })[0]; };
  const canTouch = function (k) { return scopeOf().knobs.indexOf(k) >= 0; };
  // 対象にした不良だけの率
  const inScopeRate = function (rows) {
    const sc = scopeOf();
    return sc.ys.reduce(function (a, y) { return a + rateOf1(rows, y); }, 0);
  };
  const outScopeRate = function (rows) { return rateOfLots(rows) - inScopeRate(rows); };



  /* ---- 動かせる条件（GPCバンド） ----
   * 最初から見えるのは、素朴な手(受入ではじく・室温を管理する)だけ。
   * 残りは調査の過程で「思いつく根拠」を手にしたときに現れる(from が鍵)。
   * 仕組みの解説(頭打ち・壁・中心と幅)は書かない。動かして、測って、初めて分かる。
   */
  const KNOBS0 = [
    { k: 'kiln', min: 24, max: 40, step: 2, unit: 'h', from: 'kiln', label: S('乾燥の在炉時間', 'Kiln hours', 'Jam kiln') },
    { k: 'kilnTemp', min: 60, max: 90, step: 10, unit: '℃', from: 'kilnTemp', label: S('乾燥の温度', 'Kiln temperature', 'Suhu kiln') },
    { k: 'incoming', min: 0, max: 1, step: 0.5, unit: S('', '', ''), pct: true, label: S('受入で含水率をはじく', 'Screen the incoming stock', 'Saring material masuk'),
      note: S('12.5%を超えた材を止める。原因は直らないが、すぐ効く', 'stops stock above 12.5%: it fixes nothing upstream but works at once', 'menahan material di atas 12,5%: tidak memperbaiki hulu tetapi langsung bekerja') },
    { k: 'press', min: 45, max: 75, step: 5, unit: S('秒', 's', 'detik'), from: 'press', label: S('接着の圧締時間', 'Press time', 'Waktu pres') },
    { k: 'glueAmt', min: 20, max: 40, step: 5, unit: S('g/㎡', ' g/m²', ' g/m²'), from: 'glueAmt', label: S('接着剤の塗布量', 'Glue spread', 'Sebaran lem') },
    { k: 'toolLife', min: 10, max: 40, step: 5, unit: 'h', from: 'toolLife', label: S('刃の交換周期', 'Cutter change interval', 'Interval ganti pisau') },
    { k: 'grit', min: 120, max: 180, step: 10, unit: '#', from: 'grit', label: S('研削の番手', 'Sanding grit', 'Grit amplas') },
    { k: 'roomCtl', min: 0, max: 1, step: 0.5, unit: S('', '', ''), pct: true, label: S('室温を管理する', 'Control the room temperature', 'Kendalikan suhu ruang'),
      note: S('空調を入れて室温を一定にする', 'put in air conditioning and hold the room steady', 'pasang pendingin dan jaga ruangan tetap stabil') },
    { k: 'warmUp', min: 0, max: 1, step: 0.5, unit: S('', '', ''), pct: true, from: 'warmUp', label: S('朝の暖機（予熱）', 'Warm the machines before the shift', 'Panaskan mesin sebelum shift') },
    { k: 'batchSel', min: 0, max: 1, step: 0.5, unit: S('', '', ''), pct: true, from: 'batchSel', label: S('入荷ロットの選別', 'Reject incoming batches', 'Tolak lot masuk') },
    { k: 'sharpen', min: 0, max: 1, step: 1, unit: S('', '', ''), pct: true, from: 'sharpen', label: S('刃の途中研ぎ', 'Touch up the cutter mid-life', 'Asah pisau di tengah umur') },
    // 2台のうち片方だけ悪いラインにだけ現れる。sc.mach が無いラインでは KNOBS() が外す。
    { k: 'machFix', min: 0, max: 1, step: 1, unit: S('', '', ''), pct: true, from: 'machFix', onlyMach: true,
      label: S('悪いほうの機械を整備する', 'Service the worse machine', 'Servis mesin yang lebih buruk') }
  ];
  const KNOBS = function () {
    const sc = scen() || {};
    return KNOBS0.filter(function (o) { return !o.onlyMach || sc.mach; })
      .map(function (o) { return Object.assign({}, o, { label: vt('knobs.' + o.k, o.label), note: vt('knobs.' + o.k + '.note', o.note), unit: vt('knobs.' + o.k + '.unit', o.unit) }); });
  };
  // 見えている手だけ。from を持たない手は最初から見える。
  const knobOpen = function (k) {
    const o = KNOBS0.filter(function (x) { return x.k === k; })[0];
    // 解錠した日を入れるので、第0週(0)でも「開いている」と読めるよう null 比較にする
    return !!o && (!o.from || (st().unlocked || {})[k] != null);
  };
  const openKnobs = function () { return KNOBS().filter(function (o) { return knobOpen(o.k); }); };
  /* 条件が「思いつける」ようになった理由。手帳に盤面が書く。
   * 何を根拠に、どの手が候補に上がったかが残るので、後から辿れる。 */
  const UNLOCK_WHY = {
    kiln: S('乾燥の出し方が守られていないと分かった。在炉時間を条件として動かせる',
      'The kiln is not being run to its rule. Kiln hours can now be set as a condition',
      'Kiln tidak dijalankan sesuai aturannya. Jam kiln kini dapat diatur sebagai kondisi'),
    kilnTemp: S('含水率の分布に幅がある。中心とは別に、幅を決める条件(乾燥の温度)を動かせる',
      'The moisture distribution has a spread of its own. Apart from the centre, the kiln temperature that sets the spread can now be moved',
      'Distribusi kadar air punya sebaran tersendiri. Selain pusatnya, suhu kiln yang menentukan sebaran kini dapat digerakkan'),
    press: S('症状ごとに数えて、どの工程の不良かが分かれた。接着の工程の条件(圧締時間)を動かせる',
      'Counting by symptom separated the defects by process. The glue-up condition (press time) can now be moved',
      'Menghitung per gejala memisahkan cacat menurut prosesnya. Kondisi proses perekatan (waktu pres) kini dapat digerakkan'),
    glueAmt: S('症状ごとに数えて、どの工程の不良かが分かれた。接着の工程の条件(塗布量)を動かせる',
      'Counting by symptom separated the defects by process. The glue-up condition (glue spread) can now be moved',
      'Menghitung per gejala memisahkan cacat menurut prosesnya. Kondisi proses perekatan (sebaran lem) kini dapat digerakkan'),
    toolLife: S('刃を交換する基準が無いと分かった。交換周期を条件として動かせる',
      'There is no rule for changing the cutter. The change interval can now be set as a condition',
      'Tidak ada aturan penggantian pisau. Interval ganti kini dapat diatur sebagai kondisi'),
    grit: S('症状ごとに数えて、どの工程の不良かが分かれた。研削の工程の条件(番手)を動かせる',
      'Counting by symptom separated the defects by process. The sanding condition (grit) can now be moved',
      'Menghitung per gejala memisahkan cacat menurut prosesnya. Kondisi proses pengamplasan (grit) kini dapat digerakkan'),
    warmUp: S('朝いちばんと昼休み明けに不良が高い。始業前の暖機を手として使える',
      'Defects run high in the first hour and after lunch. Warming up before the shift is now a move',
      'Cacat tinggi pada jam pertama dan setelah makan siang. Pemanasan sebelum shift kini dapat dipakai sebagai langkah'),
    batchSel: S('含水率が日ごとの山でまとまって動いている。入荷ロットごと返す手を使える',
      'Moisture moves in day-sized batches. Sending back a whole incoming lot is now a move',
      'Kadar air bergerak dalam kelompok harian. Mengembalikan seluruh lot masuk kini dapat dipakai sebagai langkah'),
    sharpen: S('刃の使用時間に沿って不良が増えている。交換を待たずに途中で研ぐ手を使える',
      'Defects climb with cutter hours. Touching up the cutter mid-life is now a move',
      'Cacat naik seiring jam pakai pisau. Mengasah pisau di tengah umur kini dapat dipakai sebagai langkah'),
    machFix: S('2台の機械で層別すると差が消えない。悪いほうを整備する手を使える',
      'The gap between the two machines will not go away. Servicing the worse one is now a move',
      'Selisih antara kedua mesin tidak hilang. Menyervis yang lebih buruk kini dapat dipakai sebagai langkah')
  };
  function unlock(k, why) {
    if (!knobOpen(k) && KNOBS0.some(function (x) { return x.k === k; })) {
      const o = KNOBS0.filter(function (x) { return x.k === k; })[0];
      if (o.onlyMach && !(scen() || {}).mach) return false;
      st().unlocked = st().unlocked || {};
      st().unlocked[k] = st().day;
      st().newKnobs = (st().newKnobs || []).concat([k]);
      WS.addNote('sys', why || vt('unlock.' + k, UNLOCK_WHY[k]), { knob: k });
      return true;
    }
    return false;
  }
  /* ---- 自分のデータから読む実績 ----
   * 条件画面は隠れモデルの「見込み」を出さない。出すのは、その条件で実際に流したロットの実績だけ。
   * 試していない条件は「未検証」で、それが本当の現場と同じ。 */
  function triedStats(cfg) {
    const k = cfgKey(cfg, stdLevel());
    const rows = st().lots.filter(function (x) { return x.k === k; });
    const sc = scopeOf();
    return { n: rows.length, k: k,
      inRate: rows.length ? sc.ys.reduce(function (a, y) { return a + rateOf1(rows, y); }, 0) : null,
      allRate: rows.length ? rateOfLots(rows) : null };
  }
  // 改善前。最初の日に流した条件(BASE・標準は初期のまま)で取れたロット。
  function baseStats() {
    const dh = st().dayHist || [];
    if (!dh.length) return { n: 0, inRate: null, allRate: null };
    const k = dh[0].k;
    const rows = st().lots.filter(function (x) { return x.k === k; });
    const sc = scopeOf();
    return { n: rows.length, k: k,
      inRate: rows.length ? sc.ys.reduce(function (a, y) { return a + rateOf1(rows, y); }, 0) : null,
      allRate: rows.length ? rateOfLots(rows) : null };
  }
  // 技術理論値。含水率・摩耗・圧締・番手のどれも効かない状態で残る、工程が持っている素の不良率。
  const theoryRate = function (sc) { return sc.d[0] + sc.g[0] + sc.s[0]; };
  Object.assign(G, { advance: advance, advanceDay: advanceDay, axDec: axDec, axScale: axScale, axShow: axShow, BASE: BASE, BEST: BEST, beyond3: beyond3, canTouch: canTouch, cfgKey: cfgKey, CONTROLS: CONTROLS, costOf: costOf, countOf: countOf, dayNo: dayNo, FACTORS: FACTORS, HOUR_F: HOUR_F, KNOBS: KNOBS, last4: last4, lossMan: lossMan, madeCap: madeCap, madeMan: madeMan, madeOf: madeOf, man: man, manSpan: manSpan, mcMean: mcMean, myDaily: myDaily, PICK_N: PICK_N, piecesOf: piecesOf, PROCS: PROCS, rateOf1: rateOf1, rateOfLots: rateOfLots, reference: reference, runDay: runDay, runSpan: runSpan, scopeOf: scopeOf, SCOPES: SCOPES, SCORE: SCORE, SCORE_W: SCORE_W, seLots: seLots, SHOCK_WEEK: SHOCK_WEEK, SHOP: SHOP, shopById: shopById, shownVal: shownVal, simRows: simRows, stdLevel: stdLevel, stdLevel0: stdLevel0, stdMissing: stdMissing, SUSPECTS: SUSPECTS, SYMPTOMS: SYMPTOMS, usable: usable, vt: vt, withBase: withBase,
    knobOpen: knobOpen, openKnobs: openKnobs, unlock: unlock, UNLOCK_WHY: UNLOCK_WHY, triedStats: triedStats, baseStats: baseStats, theoryRate: theoryRate });
})();
