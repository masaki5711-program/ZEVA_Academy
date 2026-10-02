/* ZEVA Academy — built-in localized diagrams (inline SVG). */
(function () {
  'use strict';
  const ZA = window.ZA;
  const t = ZA.t;
  const D = ZA.diagrams;
  let uid = 0;

  /* ---------- helpers ---------- */
  function esc(s) { return ZA.esc(s); }
  const isWide = function (ch) { return /[　-鿿＀-￯]/.test(ch); };
  function units(s) { let n = 0; for (const ch of s) n += isWide(ch) ? 2 : 1; return n; }
  // wrap text to max units per line; respects explicit \n
  function wrap(s, max) {
    const out = [];
    String(s).split('\n').forEach(function (para) {
      if (units(para) <= max) { out.push(para); return; }
      if (/[　-鿿]/.test(para)) {
        let line = '';
        for (const ch of para) {
          if (units(line + ch) > max && line) { out.push(line); line = ''; }
          line += ch;
        }
        if (line) out.push(line);
      } else {
        let line = '';
        para.split(/\s+/).forEach(function (w) {
          const cand = line ? line + ' ' + w : w;
          if (units(cand) > max && line) { out.push(line); line = w; } else line = cand;
        });
        if (line) out.push(line);
      }
    });
    return out;
  }
  function T(x, y, v, o) {
    o = o || {};
    const size = o.size || 14;
    const lines = o.wrap ? wrap(t(v), o.wrap) : String(t(v)).split('\n');
    const lh = size * (o.lh || 1.3);
    const y0 = o.valign === 'middle' ? y - (lines.length - 1) * lh / 2 : y;
    return '<text x="' + x + '" y="' + y0 + '" font-size="' + size + '" text-anchor="' + (o.anchor || 'middle') +
      '" dominant-baseline="' + (o.baseline || 'middle') + '" font-weight="' + (o.weight || 400) + '" fill="' + (o.fill || 'var(--text)') + '">' +
      lines.map(function (ln, i) { return '<tspan x="' + x + '" dy="' + (i ? lh : 0) + '">' + esc(ln) + '</tspan>'; }).join('') + '</text>';
  }
  function R(x, y, w, hh, o) {
    o = o || {};
    return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + hh + '" rx="' + (o.rx == null ? 10 : o.rx) +
      '" fill="' + (o.fill || 'var(--surface)') + '" stroke="' + (o.stroke || 'var(--border-strong)') + '" stroke-width="' + (o.sw || 1.5) + '"' +
      (o.dash ? ' stroke-dasharray="' + o.dash + '"' : '') + '/>';
  }
  function L(x1, y1, x2, y2, o) {
    o = o || {};
    return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="' + (o.stroke || 'var(--muted)') +
      '" stroke-width="' + (o.sw || 2) + '"' + (o.dash ? ' stroke-dasharray="' + o.dash + '"' : '') + (o.arrow ? ' marker-end="url(#' + o.arrow + ')"' : '') + '/>';
  }
  function P(d, o) {
    o = o || {};
    return '<path d="' + d + '" fill="' + (o.fill || 'none') + '" stroke="' + (o.stroke || 'var(--muted)') + '" stroke-width="' + (o.sw || 2) + '"' +
      (o.dash ? ' stroke-dasharray="' + o.dash + '"' : '') + (o.arrow ? ' marker-end="url(#' + o.arrow + ')"' : '') + (o.opacity ? ' opacity="' + o.opacity + '"' : '') + '/>';
  }
  function svg(w, hh, body, label) {
    const id = 'ar' + (++uid);
    const defs = '<defs><marker id="' + id + '" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="var(--muted)"/></marker>' +
      '<marker id="' + id + 'b" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="var(--blue)"/></marker>' +
      '<marker id="' + id + 'g" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="var(--green)"/></marker>' +
      '<marker id="' + id + 'r" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="var(--red)"/></marker></defs>';
    return '<svg viewBox="0 0 ' + w + ' ' + hh + '" role="img" aria-label="' + esc(t(label || '')) + '" xmlns="http://www.w3.org/2000/svg">' + defs + body(id) + '</svg>';
  }
  const tone = {
    navy: ['var(--tone-navy-bg)', 'var(--tone-navy-fg)'], blue: ['var(--tone-blue-bg)', 'var(--tone-blue-fg)'],
    teal: ['var(--tone-teal-bg)', 'var(--tone-teal-fg)'], green: ['var(--tone-green-bg)', 'var(--tone-green-fg)'],
    amber: ['var(--tone-amber-bg)', 'var(--tone-amber-fg)'], red: ['var(--tone-red-bg)', 'var(--tone-red-fg)'],
    gray: ['var(--tone-gray-bg)', 'var(--tone-gray-fg)'],
  };
  function box(x, y, w, hh, title, sub, tn, o) {
    o = o || {};
    const c = tone[tn || 'blue'];
    const ts = o.ts || 15, ss = o.ss || 12;
    let s = R(x, y, w, hh, { fill: c[0], stroke: c[1], sw: o.sw || 1.5, rx: o.rx });
    const maxU = Math.floor((w - 16) / (ts * 0.55));
    const subU = Math.floor((w - 16) / (ss * 0.55));
    if (sub) {
      const tl = wrap(t(title), maxU), sl = wrap(t(sub), subU);
      const total = tl.length * ts * 1.25 + sl.length * ss * 1.3 + 4;
      let yy = y + hh / 2 - total / 2 + ts * 0.62;
      s += T(x + w / 2, yy, tl.join('\n'), { size: ts, weight: 700, fill: c[1], lh: 1.25 });
      yy += tl.length * ts * 1.25 + 2;
      s += T(x + w / 2, yy, sl.join('\n'), { size: ss, fill: 'var(--text-2)', lh: 1.3 });
    } else {
      s += T(x + w / 2, y + hh / 2, title, { size: ts, weight: 700, fill: c[1], wrap: maxU, valign: 'middle', lh: 1.25 });
    }
    return s;
  }
  const S = function (ja, en, id) { return { ja: ja, en: en, id: id }; };

  /* ---------- quality-cost ----------
   * 品質とコストのトレードオフ。要求品質・過剰品質・要求コスト・工程バラツキ、
   * そして「技術理論と製品設計を変えると傾きが下がる」を1枚に置く(仕様書 v29 図2-3)。
   */
  D['quality-cost'] = function () {
    const W = 860, H = 470;
    return svg(W, H, function (a) {
      const X0 = 96, Y0 = 386, X1 = 792, Y1 = 92;      // 軸
      const QL = 470, QR = 590;                         // 要求品質の帯
      const slope = (Y0 - Y1) / (X1 - X0);
      const costAt = function (x) { return Y0 - (x - X0) * slope; };
      const CB = costAt(QL), CT = costAt(QR);           // 要求コストの帯(直線から計算)
      let s = '';
      s += R(QL, Y1, QR - QL, Y0 - Y1, { fill: 'var(--tone-blue-bg)', stroke: 'none', rx: 0 });
      s += L(X0, Y0, X1 + 10, Y0, { stroke: 'var(--text-2)', sw: 2 });
      s += L(X0, Y0, X0, Y1 - 10, { stroke: 'var(--text-2)', sw: 2 });
      s += T((X0 + X1) / 2, Y0 + 34, S('品質', 'Quality', 'Kualitas'), { size: 15, weight: 700 });
      s += T(30, (Y0 + Y1) / 2, S('コスト\n（生産性）', 'Cost\n(productivity)', 'Biaya\n(produktivitas)'),
        { size: 14, weight: 700, anchor: 'start', valign: 'middle' });
      // トレードオフの直線と、傾きを下げた直線
      s += L(X0, Y0, X1, Y1, { stroke: 'var(--red)', sw: 5 });
      s += L(X0, Y0, X1, Y0 - (Y0 - Y1) * 0.55, { stroke: 'var(--green)', sw: 4, dash: '10 7' });
      s += T(QL - 16, Y1 + 40, S('品質を上げるほどコストが増える', 'The higher the quality, the higher the cost', 'Semakin tinggi kualitas, semakin tinggi biaya'),
        { size: 12.5, weight: 700, fill: 'var(--red)', anchor: 'end', wrap: 20 });
      s += T(X1 - 8, Y0 - 86, S('技術理論と製品設計を変えるとこの傾きが下がる', 'Changing the technical theory and the product design lowers this slope', 'Mengubah teori teknis dan desain produk menurunkan kemiringan'),
        { size: 12.5, weight: 700, fill: 'var(--green)', anchor: 'end', wrap: 26 });
      // 要求品質 / 過剰品質
      [QL, QR].forEach(function (x) { s += L(x, Y1, x, Y0, { stroke: 'var(--blue)', sw: 1.5, dash: '4 4' }); });
      s += L(QL, Y1 - 26, QR, Y1 - 26, { stroke: 'var(--blue)', sw: 2, arrow: a + 'b' });
      s += L(QR, Y1 - 26, X1, Y1 - 26, { stroke: 'var(--amber)', sw: 2, arrow: a });
      s += T((QL + QR) / 2, Y1 - 58, S('要求品質', 'Required quality', 'Kualitas yang diminta'), { size: 14, weight: 700, fill: 'var(--blue)' });
      s += T((QR + X1) / 2, Y1 - 58, S('過剰品質（コストだけ増える）', 'Over-quality (only cost grows)', 'Kualitas berlebihan (hanya biaya naik)'),
        { size: 12.5, weight: 700, fill: 'var(--tone-amber-fg)', wrap: 30 });
      // 要求コスト
      s += L(X0, CB, QR, CB, { stroke: 'var(--muted)', sw: 1.2, dash: '3 4' });
      s += L(X0, CT, QR, CT, { stroke: 'var(--muted)', sw: 1.2, dash: '3 4' });
      s += L(X0 + 44, CB, X0 + 44, CT, { stroke: 'var(--muted)', sw: 1.8, arrow: a });
      s += T(X0 + 54, (CB + CT) / 2, S('要求コスト', 'Required cost', 'Biaya yang diminta'),
        { size: 13, weight: 700, fill: 'var(--text-2)', anchor: 'start', valign: 'middle' });
      // 工程バラツキ(要求品質の中、要求コストの中)
      s += R(QL + 22, CT + 12, QR - QL - 44, CB - CT - 24, { fill: 'none', stroke: 'var(--green)', sw: 2.5, rx: 8 });
      s += '<circle cx="' + ((QL + QR) / 2) + '" cy="' + costAt((QL + QR) / 2) + '" r="6" fill="var(--red)"/>';
      s += T((QL + QR) / 2, CT - 16, S('工程バラツキ（結果Y）', 'Process variation (result Y)', 'Variasi proses (hasil Y)'),
        { size: 12.5, weight: 700, fill: 'var(--green)' });
      return s;
    }, S('品質とコストの関係', 'Quality and cost', 'Kualitas dan biaya'));
  };

  /* ---------- zeva-house ---------- */
  D['zeva-house'] = function () {
    const W = 820, H = 560;
    return svg(W, H, function (a) {
      let s = '';
      // roof
      s += P('M60,150 L410,20 L760,150 Z', { fill: 'var(--tone-navy-bg)', stroke: 'var(--navy)', sw: 2 });
      s += T(410, 78, 'ZEVA = Zero Variation', { size: 20, weight: 800, fill: 'var(--navy)' });
      s += T(410, 112, S('バラツキゼロで理論値を実現する', 'Reach the theoretical value through zero variation', 'Mencapai nilai teoretis melalui variasi nol'), { size: 14, fill: 'var(--text-2)', wrap: 70 });
      const pill = [
        [S('原則① バラツキ対策', 'Principle ① Variation countermeasure', 'Prinsip ① Penanggulangan variasi'), S('何に着目するか\nロスの根源を断つ\nYではなくXを制御', 'What to focus on\nCut the root of loss\nControl X, not Y', 'Apa yang difokuskan\nPutus akar kerugian\nKendalikan X, bukan Y'), 'red'],
        [S('原則② 理論値ベース思考', 'Principle ② Theoretical-value thinking', 'Prinsip ② Berpikir berbasis nilai teoretis'), S('どこを目指すか\nあるべき姿から逆算\nギャップで優先順位', 'Where to aim\nWork back from the ideal\nPrioritize by the gap', 'Ke mana menuju\nMundur dari kondisi ideal\nPrioritas dari gap'), 'blue'],
        [S('原則③ PDCA+S', 'Principle ③ PDCA+S', 'Prinsip ③ PDCA+S'), S('どう定着・進化させるか\n改善を標準に還元\n決める→守る→改める', 'How to sustain & evolve\nReturn improvement to standards\nDecide → Keep → Revise', 'Bagaimana mempertahankan\nKembalikan perbaikan ke standar\nTetapkan → Patuhi → Revisi'), 'green'],
      ];
      pill.forEach(function (p, i) {
        const x = 80 + i * 225;
        s += box(x, 165, 210, 200, p[0], p[1], p[2], { ts: 15, ss: 12.5 });
      });
      // foundation
      s += R(40, 385, 740, 110, { fill: 'var(--tone-gray-bg)', stroke: 'var(--gray)', sw: 2, rx: 12 });
      s += T(410, 410, S('土台：標準化 ― 再現性の保証（すべての前提）', 'Foundation: Standardization — guaranteeing reproducibility', 'Fondasi: Standardisasi — menjamin reprodusibilitas'), { size: 16, weight: 800, fill: 'var(--text)' });
      const f = [S('5S・3定', '5S & 3-Tei', '5S & 3-Tei'), S('4M標準', '4M standards', 'Standar 4M'), S('標準作業', 'Standard work', 'Kerja standar'), S('再現性の確保', 'Reproducibility', 'Reprodusibilitas')];
      f.forEach(function (x, i) {
        s += R(62 + i * 178, 432, 160, 46, { fill: 'var(--surface)', stroke: 'var(--border-strong)', rx: 8 });
        s += T(142 + i * 178, 455, x, { size: 14, weight: 700 });
      });
      // return arrow from ③ to foundation
      s += P('M725,365 C790,380 800,440 782,470', { stroke: 'var(--green)', sw: 2.5, arrow: a + 'g' });
      s += T(740, 525, S('Sで標準に還元 → 土台が進化し、次のサイクルへ', 'S returns results to standards → the foundation evolves', 'S mengembalikan hasil ke standar → fondasi berkembang'), { size: 13, weight: 700, fill: 'var(--green)', anchor: 'end' });
      s += T(80, 525, S('「標準無きところに改善なし」', '“No improvement without standards”', '“Tanpa standar, tidak ada perbaikan”'), { size: 13, weight: 700, fill: 'var(--text-2)', anchor: 'start' });
      return s;
    }, S('ZEVAの原則体系：土台＋3原則', 'ZEVA principle system', 'Sistem prinsip ZEVA'));
  };

  /* ---------- four-layers ---------- */
  D['four-layers'] = function () {
    const W = 840, H = 440;
    const layers = [
      [S('Layer 1 目的基盤', 'Layer 1 Purpose', 'Layer 1 Tujuan'), S('理論値', 'Theoretical value', 'Nilai teoretis'), S('あるべき姿を物理的・技術的に定義し、ギャップで優先順位を決める', 'Define the ideal physically & technically; prioritize by the gap', 'Definisikan kondisi ideal secara fisik & teknis; prioritas dari gap'), 'navy'],
      [S('Layer 2 振り分け', 'Layer 2 Routing', 'Layer 2 Pemilahan'), S('ハイブリッド・トリアージ', 'Hybrid Triage', 'Triase Hibrida'), S('課題を Quick GPC（H-T-C-A）/ Deep GPC（DMAIC）に振り分ける', 'Route issues to Quick GPC (H-T-C-A) or Deep GPC (DMAIC)', 'Arahkan masalah ke Quick GPC (H-T-C-A) atau Deep GPC (DMAIC)'), 'blue'],
      [S('Layer 3 手法基盤', 'Layer 3 Method', 'Layer 3 Metode'), S('GPC制御理論', 'GPC control theory', 'Teori kontrol GPC'), S('GPC-M（設備）/ GPC-H（人）の二元構造でバラツキを制御する', 'Control variation with the dual GPC-M (machine) / GPC-H (human) structure', 'Kendalikan variasi dengan struktur ganda GPC-M (mesin) / GPC-H (manusia)'), 'teal'],
      [S('Layer 4 実行基盤', 'Layer 4 Execution', 'Layer 4 Eksekusi'), S('PDCA-S ＋ 7要因 ＋ XY思考', 'PDCA-S + 7 factors + XY thinking', 'PDCA-S + 7 faktor + berpikir XY'), S('日常運用と構造的な原因特定の仕組み', 'Daily operation and structured root-cause identification', 'Operasi harian dan identifikasi akar penyebab terstruktur'), 'green'],
    ];
    return svg(W, H, function () {
      let s = '';
      const top = 20, bottom = 420, apexX = 200, half = 180;
      const hL = (bottom - top) / 4;
      layers.forEach(function (ly, i) {
        const y0 = top + i * hL, y1 = y0 + hL;
        const w0 = half * (i / 4), w1 = half * ((i + 1) / 4);
        const c = tone[ly[3]];
        s += P('M' + (apexX - w0) + ',' + y0 + ' L' + (apexX + w0) + ',' + y0 + ' L' + (apexX + w1) + ',' + y1 + ' L' + (apexX - w1) + ',' + y1 + ' Z',
          { fill: c[0], stroke: c[1], sw: 1.5 });
        s += T(apexX, y0 + hL * 0.62, String(i + 1), { size: i ? 22 : 16, weight: 800, fill: c[1] });
        const bx = 410, by = y0 + 6, bw = 410, bh = hL - 12;
        s += R(bx, by, bw, bh, { fill: 'var(--surface)', stroke: c[1], rx: 10 });
        s += T(bx + 14, by + 20, ly[0], { size: 12, weight: 700, fill: c[1], anchor: 'start' });
        s += T(bx + 14, by + 42, ly[1], { size: 16, weight: 800, anchor: 'start' });
        s += T(bx + 14, by + 64, ly[2], { size: 11.5, fill: 'var(--text-2)', anchor: 'start', wrap: 62, lh: 1.2 });
        s += L(apexX + w1 * 0.5 + 30, y0 + hL / 2, bx - 6, y0 + hL / 2, { stroke: 'var(--border-strong)', sw: 1.5, dash: '4 4' });
      });
      return s;
    }, S('ZEVAの4層構造', 'ZEVA 4-layer structure', 'Struktur 4 lapis ZEVA'));
  };

  /* ---------- root-logic ---------- */
  D['root-logic'] = function () {
    const W = 860, H = 470;
    return svg(W, H, function (a) {
      let s = '';
      s += T(210, 20, S('根底ロジック（論理連鎖）', 'Root logic (chain of reasoning)', 'Logika dasar (rantai penalaran)'), { size: 15, weight: 800 });
      const chain = [
        [S('改善アクション', 'Improvement action', 'Aksi perbaikan'), S('勘や経験ではなくデータに基づく', 'Based on data, not hunches', 'Berdasarkan data, bukan firasat'), 'navy'],
        [S('信頼性の高いデータ', 'Reliable data', 'Data yang andal'), S('アクションの根拠として使える', 'Usable as grounds for action', 'Dapat menjadi dasar aksi'), 'blue'],
        [S('バラツキが少なく、偏りが無い', 'Low variation, no bias', 'Variasi kecil, tanpa bias'), S('精度（precision）＋正確さ（accuracy）', 'Precision + accuracy', 'Presisi + akurasi'), 'teal'],
        [S('工程が統計的管理状態にある', 'Process in statistical control', 'Proses dalam kendali statistik'), S('シューハートの原則が前提', 'Shewhart’s principle', 'Prinsip Shewhart'), 'green'],
      ];
      chain.forEach(function (c, i) {
        const y = 40 + i * 104;
        s += box(40, y, 340, 78, c[0], c[1], c[2], { ts: 16, ss: 12.5 });
        if (i) s += L(210, y - 4, 210, y - 24, { arrow: a, sw: 2.5 });
      });
      s += T(210, 462, S('↑ 下が満たされて初めて上が成り立つ', '↑ each level requires the one below', '↑ tiap tingkat butuh tingkat di bawahnya'), { size: 12, fill: 'var(--text-2)' });

      // cycles as loop panels
      function loop(y, tn, title, labels, arrowId) {
        const c = tone[tn];
        let o = R(420, y, 420, 150, { fill: c[0], stroke: c[1], rx: 14 });
        o += T(436, y + 22, title, { size: 15, weight: 800, fill: c[1], anchor: 'start' });
        labels.forEach(function (lb, i) {
          const bx = 436 + i * 100;
          o += R(bx, y + 44, 88, 58, { fill: 'var(--surface)', stroke: c[1], rx: 8 });
          o += T(bx + 44, y + 73, lb, { size: 11.5, weight: 700, wrap: 14, valign: 'middle', lh: 1.2 });
          if (i < labels.length - 1) o += L(bx + 89, y + 73, bx + 99, y + 73, { stroke: c[1], sw: 2, arrow: arrowId });
        });
        o += P('M' + (436 + 344) + ',' + (y + 103) + ' V' + (y + 130) + ' H480 V' + (y + 104), { stroke: c[1], sw: 2, arrow: arrowId, dash: '5 4' });
        return o;
      }
      s += loop(24, 'green', S('好循環', 'Virtuous cycle', 'Siklus baik'), [
        S('バラツキを削減', 'Reduce variation', 'Kurangi variasi'), S('データ信頼性↑', 'Data reliability ↑', 'Keandalan data ↑'),
        S('的確なアクション', 'Accurate action', 'Aksi tepat'), S('さらに削減', 'Even less variation', 'Variasi makin kecil')], a + 'g');
      s += loop(194, 'red', S('悪循環', 'Vicious cycle', 'Siklus buruk'), [
        S('バラツキを放置', 'Leave variation', 'Biarkan variasi'), S('データ信頼性↓', 'Data reliability ↓', 'Keandalan data ↓'),
        S('アクション不能・誤判断', 'No action / wrong call', 'Tak bertindak / salah'), S('バラツキ拡大', 'Variation grows', 'Variasi membesar')], a + 'r');
      s += R(420, 364, 420, 80, { fill: 'var(--tone-navy-bg)', stroke: 'var(--navy)', rx: 12 });
      s += T(630, 404, S('好循環の起点は土台（標準化）。信頼できるデータを待たず、\nQuick GPCで小さく試しながら好循環を立ち上げる', 'The virtuous cycle starts from the foundation (standardization).\nDon’t wait for perfect data — start small with Quick GPC', 'Siklus baik dimulai dari fondasi (standardisasi).\nJangan menunggu data sempurna — mulai kecil dengan Quick GPC'), { size: 12.5, weight: 700, fill: 'var(--navy)', valign: 'middle' });
      return s;
    }, S('根底ロジック', 'Root logic', 'Logika dasar'));
  };

  /* ---------- precision-accuracy ---------- */
  D['precision-accuracy'] = function () {
    const W = 840, H = 270;
    const cases = [
      [S('精度○ 正確さ○', 'Precise & accurate', 'Presisi & akurat'), S('信頼できるデータ', 'Reliable data', 'Data andal'), 0, 0, 6, 'green'],
      [S('精度○ 正確さ×', 'Precise, biased', 'Presisi, bias'), S('偏り → 校正で修正', 'Bias → fix by calibration', 'Bias → kalibrasi'), 26, -20, 6, 'amber'],
      [S('精度× 正確さ○', 'Accurate, imprecise', 'Akurat, tidak presisi'), S('バラツキ → 原因を制御', 'Variation → control causes', 'Variasi → kendalikan penyebab'), 0, 0, 30, 'amber'],
      [S('精度× 正確さ×', 'Neither', 'Keduanya tidak'), S('アクション不能', 'Cannot act', 'Tidak bisa bertindak'), 24, 18, 30, 'red'],
    ];
    // deterministic pseudo random
    let seed = 7;
    const rnd = function () { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
    return svg(W, H, function () {
      let s = '';
      cases.forEach(function (c, i) {
        const cx = 105 + i * 210, cy = 110;
        [80, 60, 40, 20].forEach(function (r, k) {
          s += '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="' + (k % 2 ? 'var(--surface)' : 'var(--surface-2)') + '" stroke="var(--border-strong)"/>';
        });
        s += '<circle cx="' + cx + '" cy="' + cy + '" r="5" fill="var(--navy)"/>';
        for (let k = 0; k < 9; k++) {
          const ang = rnd() * Math.PI * 2, rr = Math.sqrt(rnd()) * c[4];
          s += '<circle cx="' + (cx + c[2] + rr * Math.cos(ang)) + '" cy="' + (cy + c[3] + rr * Math.sin(ang)) + '" r="4.5" fill="' + tone[c[5]][1] + '" opacity=".85"/>';
        }
        s += T(cx, 214, c[0], { size: 14, weight: 800, fill: tone[c[5]][1] });
        s += T(cx, 240, c[1], { size: 12, fill: 'var(--text-2)', wrap: 32 });
      });
      return s;
    }, S('精度と正確さ', 'Precision and accuracy', 'Presisi dan akurasi'));
  };

  /* ---------- value-boundary ---------- */
  D['value-boundary'] = function () {
    const W = 860, H = 360;
    return svg(W, H, function () {
      let s = '';
      const x0 = 150, total = 660, y = 120, hh = 56;
      const v = 0.2, sv = 0.3, nv = 0.5;
      const segs = [
        [v, 'green', S('価値', 'Value', 'Nilai'), S('境界：製品設計', 'Boundary: Design', 'Batas: Desain')],
        [sv, 'amber', S('準価値', 'Semi-value', 'Semi-nilai'), S('境界：工法・プロセス', 'Boundary: Process', 'Batas: Proses')],
        [nv, 'red', S('無価値', 'Non-value', 'Tanpa nilai'), S('境界：実行・管理', 'Boundary: Management', 'Batas: Manajemen')],
      ];
      let x = x0;
      segs.forEach(function (sg) {
        const w = total * sg[0], c = tone[sg[1]];
        s += R(x, y, w, hh, { fill: c[0], stroke: c[1], rx: 0, sw: 2 });
        s += T(x + w / 2, y + 22, sg[2], { size: 16, weight: 800, fill: c[1] });
        s += T(x + w / 2, y + 42, sg[3], { size: 11.5, fill: 'var(--text-2)' });
        x += w;
      });
      s += T(x0 - 10, y + hh / 2, S('現状の\n作業時間', 'Current\nwork time', 'Waktu kerja\nsaat ini'), { size: 13, weight: 700, anchor: 'end', valign: 'middle' });
      // brackets above
      function bracket(xa, xb, yy, label, col, up) {
        const d = up ? -10 : 10;
        let o = P('M' + xa + ',' + (yy - d) + ' L' + xa + ',' + yy + ' L' + xb + ',' + yy + ' L' + xb + ',' + (yy - d), { stroke: col, sw: 2 });
        o += T((xa + xb) / 2, yy + (up ? -14 : 16), label, { size: 13, weight: 700, fill: col });
        return o;
      }
      s += bracket(x0, x0 + total * v, 96, S('技術理論値', 'Technical theoretical value', 'Nilai teoretis teknis'), 'var(--green)', true);
      s += bracket(x0, x0 + total * (v + sv), 58, S('現場理論値 ＝ 価値＋準価値（必要最小限）', 'Site theoretical value = value + semi-value (minimum)', 'Nilai teoretis lapangan = nilai + semi-nilai (minimum)'), 'var(--blue)', true);
      s += bracket(x0 + total * v, x0 + total * (v + sv), 196, S('技術ロス（工法改善・設備投資で解消）', 'Technical loss (new method / investment)', 'Kerugian teknis (metode baru / investasi)'), 'var(--amber)', false);
      s += bracket(x0 + total * (v + sv), x0 + total, 236, S('管理ロス（無価値作業の排除で解消）', 'Management loss (eliminate non-value work)', 'Kerugian manajemen (hilangkan kerja tanpa nilai)'), 'var(--red)', false);
      s += T(W / 2, 300, S('価値作業比率 ＝ 価値作業時間 ÷ 総作業時間 × 100%', 'Value-work ratio = value-work time ÷ total work time × 100%', 'Rasio kerja bernilai = waktu kerja bernilai ÷ total waktu kerja × 100%'), { size: 15, weight: 800, fill: 'var(--navy)' });
      s += T(W / 2, 330, S('境界を動かすこと自体が改善：設計変更→価値の再定義／工法変更→準価値の削減／管理改善→無価値の排除', 'Moving a boundary is improvement: design change → redefine value / new process → cut semi-value / better management → remove non-value', 'Menggeser batas = perbaikan: ubah desain → nilai baru / ubah proses → kurangi semi-nilai / manajemen → hapus tanpa nilai'), { size: 12, fill: 'var(--text-2)', wrap: 130 });
      return s;
    }, S('作業の3分類と境界', 'Three work categories and boundaries', 'Tiga kategori kerja dan batasnya'));
  };

  /* ---------- xy-model ---------- */
  D['xy-model'] = function () {
    const W = 860, H = 400;
    const f = [
      S('Man 人', 'Man', 'Man (manusia)'), S('Machine 設備', 'Machine', 'Machine (mesin)'), S('Material 材料', 'Material', 'Material'),
      S('Method 方法', 'Method', 'Method (metode)'), S('Measurement 測定', 'Measurement', 'Measurement (pengukuran)'),
      S('Management 管理', 'Management', 'Management'), S('Environment 環境', 'Environment', 'Environment (lingkungan)'),
    ];
    return svg(W, H, function (a) {
      let s = '';
      s += T(130, 18, S('X：原因（Input）', 'X: causes (input)', 'X: penyebab (input)'), { size: 15, weight: 800, fill: 'var(--blue)' });
      f.forEach(function (x, i) {
        const y = 34 + i * 44;
        s += box(30, y, 200, 36, x, null, i === 0 || i === 3 || i === 5 ? 'amber' : 'teal', { ts: 13, rx: 8 });
        s += P('M232,' + (y + 18) + ' C300,' + (y + 18) + ' 300,190 348,190', { stroke: 'var(--border-strong)', sw: 1.5 });
      });
      s += R(350, 120, 190, 140, { fill: 'var(--tone-navy-bg)', stroke: 'var(--navy)', sw: 2, rx: 14 });
      s += T(445, 175, S('工程\n（プロセス）', 'Process', 'Proses'), { size: 18, weight: 800, fill: 'var(--navy)', valign: 'middle' });
      s += T(445, 228, 'Y = f(X)', { size: 15, weight: 700, fill: 'var(--text-2)' });
      s += L(542, 190, 612, 190, { arrow: a, sw: 3 });
      s += T(730, 60, S('Y：結果（Output）', 'Y: results (output)', 'Y: hasil (output)'), { size: 15, weight: 800, fill: 'var(--red)' });
      [S('OEE', 'OEE', 'OEE'), S('時間（CT）', 'Time (CT)', 'Waktu (CT)'), S('品質（不良率）', 'Quality (defects)', 'Mutu (cacat)')].forEach(function (y, i) {
        s += box(620, 90 + i * 70, 220, 52, y, null, 'red', { ts: 15 });
      });
      s += R(30, 350, 810, 40, { fill: 'var(--tone-green-bg)', stroke: 'var(--green)', rx: 10 });
      s += T(435, 370, S('Yを直接いじらず、Xのバラツキを制御する → 結果が改善し、データの信頼性も高まる', 'Don’t manipulate Y directly — control variation in X → results improve and data become reliable', 'Jangan ubah Y langsung — kendalikan variasi X → hasil membaik dan data makin andal'), { size: 13.5, weight: 700, fill: 'var(--green)' });
      return s;
    }, S('XY思考', 'XY thinking', 'Berpikir XY'));
  };

  /* ---------- gpc-band ---------- */
  D['gpc-band'] = function () {
    const W = 840, H = 330;
    let seed = 11;
    const rnd = function () { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
    return svg(W, H, function () {
      let s = '';
      const x0 = 150, x1 = 800, top = 40, bot = 270;
      const yMax = 90, yMin = 230, yT = 160;
      s += R(x0, yMax, x1 - x0, yMin - yMax, { fill: 'var(--tone-green-bg)', stroke: 'none', rx: 0 });
      s += L(x0, yMax, x1, yMax, { stroke: 'var(--green)', sw: 2, dash: '6 4' });
      s += L(x0, yMin, x1, yMin, { stroke: 'var(--green)', sw: 2, dash: '6 4' });
      s += L(x0, yT, x1, yT, { stroke: 'var(--navy)', sw: 2 });
      s += L(x0, top, x0, bot, { stroke: 'var(--border-strong)' });
      s += L(x0, bot, x1, bot, { stroke: 'var(--border-strong)' });
      s += T(x0 - 10, yMax, 'GPC_max', { size: 13, weight: 700, fill: 'var(--green)', anchor: 'end' });
      s += T(x0 - 10, yT, S('Target（理論値）', 'Target (theoretical)', 'Target (teoretis)'), { size: 13, weight: 700, fill: 'var(--navy)', anchor: 'end', wrap: 18, valign: 'middle' });
      s += T(x0 - 10, yMin, 'GPC_min', { size: 13, weight: 700, fill: 'var(--green)', anchor: 'end' });
      let px = null, py = null;
      for (let i = 0; i < 26; i++) {
        const x = x0 + 20 + i * 24;
        const spread = i < 13 ? 55 : 22;
        const center = i < 13 ? 175 : 162;
        let y = center + (rnd() - 0.5) * 2 * spread;
        if (i === 6) y = 250;
        const out = y > yMin || y < yMax;
        if (px != null) s += L(px, py, x, y, { stroke: 'var(--border-strong)', sw: 1.2 });
        s += '<circle cx="' + x + '" cy="' + y + '" r="5" fill="' + (out ? 'var(--red)' : 'var(--blue)') + '"/>';
        px = x; py = y;
      }
      s += L(x0 + 20 + 12.5 * 24, top, x0 + 20 + 12.5 * 24, bot, { stroke: 'var(--muted)', dash: '3 4', sw: 1.5 });
      s += T(x0 + 170, top - 8, S('第一段階：バンド内に収束', 'Stage 1: converge inside the band', 'Tahap 1: masuk ke dalam band'), { size: 13, weight: 700, fill: 'var(--text-2)' });
      s += T(x0 + 490, top - 8, S('第二段階：Targetに中心を寄せる', 'Stage 2: center-aiming at Target', 'Tahap 2: pusatkan ke Target'), { size: 13, weight: 700, fill: 'var(--text-2)' });
      s += T(W / 2 + 60, 300, S('GPCバンド＝物理実験で検証された「良品が保証される条件範囲」（範囲制御）', 'GPC band = the experimentally verified range of conditions that guarantees good products (range control)', 'GPC band = rentang kondisi yang terverifikasi eksperimen dan menjamin produk baik (kontrol rentang)'), { size: 13, weight: 700, wrap: 110 });
      return s;
    }, S('GPCバンド', 'GPC band', 'GPC band'));
  };

  /* ---------- triage-flow ---------- */
  D['triage-flow'] = function () {
    const W = 820, H = 640;
    const steps = [
      [S('Step 1  原因に心当たりがあるか？', 'Step 1  Do you have a cause hypothesis?', 'Step 1  Ada dugaan penyebab?'), S('基準① 原因の見当', 'Criterion ① cause', 'Kriteria ① penyebab'), S('No', 'No', 'Tidak'), S('Yes', 'Yes', 'Ya')],
      [S('Step 2  失敗時のリスクは高いか？', 'Step 2  Is the risk of failure high?', 'Step 2  Risiko gagal tinggi?'), S('基準③ リスク', 'Criterion ③ risk', 'Kriteria ③ risiko'), S('High', 'High', 'Tinggi'), S('Low', 'Low', 'Rendah')],
      [S('Step 3  関連する変数は3つ以上か？', 'Step 3  Three or more related variables?', 'Step 3  Tiga variabel atau lebih?'), S('基準② 変数の数', 'Criterion ② variables', 'Kriteria ② variabel'), S('Yes', 'Yes', 'Ya'), S('No', 'No', 'Tidak')],
      [S('Step 4  データは今すぐ取れるか？', 'Step 4  Can you get data right now?', 'Step 4  Data bisa diambil sekarang?'), S('基準④ データ（入手性・信頼性）', 'Criterion ④ data', 'Kriteria ④ data'), S('No', 'No', 'Tidak'), S('Yes', 'Yes', 'Ya')],
    ];
    return svg(W, H, function (a) {
      let s = '';
      s += box(170, 10, 300, 44, S('改善課題の発生', 'An improvement issue arises', 'Muncul masalah perbaikan'), null, 'gray', { ts: 15 });
      steps.forEach(function (st, i) {
        const cy = 110 + i * 120, cx = 320;
        s += L(cx, cy - 56 + (i ? 0 : 0), cx, cy - 40, { arrow: a });
        s += P('M' + cx + ',' + (cy - 40) + ' L' + (cx + 190) + ',' + cy + ' L' + cx + ',' + (cy + 40) + ' L' + (cx - 190) + ',' + cy + ' Z', { fill: 'var(--tone-blue-bg)', stroke: 'var(--blue)', sw: 1.8 });
        s += T(cx, cy - 8, st[0], { size: 13.5, weight: 800, fill: 'var(--tone-blue-fg)', wrap: 40, valign: 'middle', lh: 1.2 });
        s += T(cx, cy + 20, st[1], { size: 11, fill: 'var(--text-2)', wrap: 40 });
        s += L(cx + 190, cy, 600, cy, { arrow: a + 'b', stroke: 'var(--blue)' });
        s += T(555, cy - 12, st[2], { size: 13, weight: 800, fill: 'var(--blue)' });
        s += T(cx + 22, cy + 58, st[3], { size: 13, weight: 800, fill: 'var(--green)', anchor: 'start' });
        if (i < 3) s += L(cx, cy + 40, cx, cy + 64, { arrow: a });
      });
      // deep box
      s += R(606, 80, 200, 400, { fill: 'var(--tone-blue-bg)', stroke: 'var(--blue)', sw: 2.5, rx: 14 });
      s += T(706, 250, S('Route B\nDeep GPC\nモード', 'Route B\nDeep GPC\nmode', 'Route B\nMode\nDeep GPC'), { size: 20, weight: 800, fill: 'var(--tone-blue-fg)', valign: 'middle' });
      s += T(706, 340, S('DMAIC\n1〜3ヶ月\n止まって深く考える', 'DMAIC\n1–3 months\nStop and think deeply', 'DMAIC\n1–3 bulan\nBerhenti & berpikir dalam'), { size: 13, fill: 'var(--text-2)', valign: 'middle' });
      // quick box
      s += L(320, 510, 320, 540, { arrow: a + 'g', stroke: 'var(--green)' });
      s += R(140, 544, 360, 86, { fill: 'var(--tone-green-bg)', stroke: 'var(--green)', sw: 2.5, rx: 14 });
      s += T(320, 572, S('Route A  Quick GPCモード', 'Route A  Quick GPC mode', 'Route A  Mode Quick GPC'), { size: 18, weight: 800, fill: 'var(--tone-green-fg)' });
      s += T(320, 602, S('H-T-C-A ／ 1日〜1週間 ／ 走りながら考える', 'H-T-C-A / 1 day–1 week / think while running', 'H-T-C-A / 1 hari–1 minggu / berpikir sambil jalan'), { size: 13, fill: 'var(--text-2)' });
      s += R(560, 520, 250, 110, { fill: 'var(--tone-amber-bg)', stroke: 'var(--amber)', rx: 12, dash: '5 4' });
      s += T(685, 575, S('グレーゾーン：まずQuick GPCで1サイクル試行 → 効果なしならDeepへ', 'Gray zone: try one Quick GPC cycle first → escalate to Deep if no effect', 'Zona abu-abu: coba 1 siklus Quick GPC → naik ke Deep bila tak efektif'), { size: 12.5, weight: 700, fill: 'var(--tone-amber-fg)', wrap: 32, valign: 'middle' });
      return s;
    }, S('トリアージ判定フロー', 'Triage decision flow', 'Alur keputusan triase'));
  };

  /* ---------- cycle-map ---------- */
  D['cycle-map'] = function () {
    const W = 860, H = 420;
    return svg(W, H, function (a) {
      let s = '';
      s += box(20, 170, 130, 70, S('課題発生', 'Issue', 'Masalah'), null, 'gray', { ts: 15 });
      s += L(152, 205, 190, 205, { arrow: a });
      s += P('M195,205 L255,160 L315,205 L255,250 Z', { fill: 'var(--tone-navy-bg)', stroke: 'var(--navy)', sw: 2 });
      s += T(255, 205, S('トリアージ', 'Triage', 'Triase'), { size: 13, weight: 800, fill: 'var(--navy)' });
      s += P('M255,160 L255,95 L352,95', { arrow: a + 'g', stroke: 'var(--green)' });
      s += P('M255,250 L255,315 L352,315', { arrow: a + 'b', stroke: 'var(--blue)' });
      s += T(262, 125, 'Route A', { size: 12, weight: 700, fill: 'var(--green)', anchor: 'start' });
      s += T(262, 285, 'Route B', { size: 12, weight: 700, fill: 'var(--blue)', anchor: 'start' });
      s += box(356, 55, 220, 80, S('H-T-C-A（Quick GPC）', 'H-T-C-A (Quick GPC)', 'H-T-C-A (Quick GPC)'), S('仮説→試行→確認→標準化／1日〜1週間', 'H → T → C → A / 1 day–1 week', 'H → T → C → A / 1 hari–1 minggu'), 'green', { ts: 15, ss: 11.5 });
      s += box(356, 275, 220, 80, S('DMAIC（Deep GPC）', 'DMAIC (Deep GPC)', 'DMAIC (Deep GPC)'), S('定義→測定→分析→改善→管理／1〜3ヶ月', 'D → M → A → I → C / 1–3 months', 'D → M → A → I → C / 1–3 bulan'), 'blue', { ts: 15, ss: 11.5 });
      s += L(466, 138, 466, 270, { arrow: a + 'r', stroke: 'var(--red)', dash: '6 4' });
      s += T(458, 205, S('3回失敗・仮説枯渇・再発\n→ エスカレーション', '3 failed cycles, no ideas,\nrecurrence → escalate', '3x gagal, ide habis,\nberulang → eskalasi'), { size: 12, weight: 700, fill: 'var(--red)', anchor: 'end', valign: 'middle' });
      s += P('M578,95 L660,95 L660,180', { arrow: a + 'g', stroke: 'var(--green)' });
      s += P('M578,315 L660,315 L660,235', { arrow: a + 'b', stroke: 'var(--blue)' });
      s += T(590, 80, S('成功', 'Success', 'Berhasil'), { size: 12, weight: 700, fill: 'var(--green)', anchor: 'start' });
      s += T(590, 335, S('Control完了', 'Control done', 'Control selesai'), { size: 12, weight: 700, fill: 'var(--blue)', anchor: 'start' });
      s += R(600, 182, 240, 52, { fill: 'var(--tone-teal-bg)', stroke: 'var(--teal)', sw: 2.5, rx: 12 });
      s += T(720, 208, S('PDCA-S（日常運用・維持）', 'PDCA-S (daily operation)', 'PDCA-S (operasi harian)'), { size: 14.5, weight: 800, fill: 'var(--tone-teal-fg)' });
      s += T(720, 262, S('改善フェーズ → 維持フェーズ', 'Improve phase → sustain phase', 'Fase perbaikan → fase pemeliharaan'), { size: 12, fill: 'var(--text-2)' });
      s += P('M720,236 C720,290 560,395 300,395 C120,395 70,300 85,245', { arrow: a, stroke: 'var(--muted)', dash: '5 5' });
      s += T(420, 408, S('S（標準化）で土台が更新され、次の課題はより高いレベルから始まる', 'S updates the foundation — the next issue starts from a higher level', 'S memperbarui fondasi — masalah berikutnya mulai dari level lebih tinggi'), { size: 12, fill: 'var(--text-2)' });
      return s;
    }, S('3つのサイクルの関係', 'How the three cycles connect', 'Hubungan tiga siklus'));
  };

  /* ---------- four-boxes ---------- */
  // 事例ごとの中身を入れて描けるようにする(2026-09-19)。props を省くと汎用の説明図になる。
  //   p.b1〜p.b4 … 各箱の本文  p.loop … 下段の一文  p.label … 図の見出し
  D['four-boxes'] = function (p) {
    p = p || {};
    const W = 820, H = 400;
    return svg(W, H, function (a) {
      let s = '';
      s += T(230, 22, S('現状', 'Current', 'Saat ini'), { size: 15, weight: 800, fill: 'var(--text-2)' });
      s += T(590, 22, S('ありたい姿', 'Desired future', 'Kondisi yang diinginkan'), { size: 15, weight: 800, fill: 'var(--text-2)' });
      s += T(34, 120, S('結果系', 'Result', 'Hasil'), { size: 13, weight: 800, fill: 'var(--text-2)' });
      s += T(34, 290, S('要因系', 'Cause', 'Penyebab'), { size: 13, weight: 800, fill: 'var(--text-2)' });
      const bx = [
        [80, 40, '①', S('現状の値', 'Current value', 'Nilai saat ini'), p.b1 || S('OEE・CT・人員・不良率・価値作業比率…\n理論値に対するロスを見える化', 'OEE, CT, headcount, defects, value ratio…\nvisualize loss vs theoretical value', 'OEE, CT, jumlah orang, cacat, rasio nilai…\nvisualisasi kerugian vs nilai teoretis'), 'blue'],
        [80, 215, '②', S('現状のやり方', 'Current way', 'Cara saat ini'), p.b2 || S('なぜ①の結果なのか\n4M（7要因）視点で弱点・バラツキ要因を分析', 'Why is ① the result?\nAnalyze weaknesses & variation causes by 4M (7 factors)', 'Mengapa hasil ①?\nAnalisis kelemahan & penyebab variasi (4M/7 faktor)'), 'red'],
        [440, 215, '③', S('新たなやり方', 'New way', 'Cara baru'), p.b3 || S('②の弱点を克服する改善策\n理論値から考え、ECRS等で有効性を説明', 'Countermeasures overcoming ②\nReason from theoretical value, justify with ECRS', 'Solusi mengatasi ②\nBerangkat dari nilai teoretis, jelaskan dengan ECRS'), 'amber'],
        [440, 40, '④', S('目標の値', 'Target value', 'Nilai target'), p.b4 || S('削減ロスを積み上げた論理的な目標\n例：人員−1、CT−20%', 'Logical target built from the losses removed\ne.g. −1 person, −20% CT', 'Target logis dari kerugian yang dihapus\nmis. −1 orang, −20% CT'), 'green'],
      ];
      bx.forEach(function (b) {
        const c = tone[b[5]];
        s += R(b[0], b[1], 300, 140, { fill: 'var(--surface)', stroke: c[1], sw: 2.5, rx: 14 });
        s += T(b[0] + 150, b[1] + 32, b[2] + ' ' + t(b[3]), { size: 18, weight: 800, fill: c[1] });
        s += T(b[0] + 150, b[1] + 84, b[4], { size: 12, fill: 'var(--text-2)', wrap: 50, valign: 'middle' });
      });
      s += L(230, 182, 230, 210, { arrow: a, sw: 3 });
      s += L(382, 285, 434, 285, { arrow: a, sw: 3 });
      s += L(590, 213, 590, 186, { arrow: a, sw: 3 });
      s += L(382, 110, 434, 110, { arrow: a, sw: 3, dash: '6 4' });
      s += T(410, 390, p.loop || S('②→③→④→①との比較 を何度も往復し、仮説と検証で改善シナリオの精度を高める', 'Loop ② → ③ → ④ → compare with ① repeatedly; refine the scenario with hypothesis & verification', 'Ulangi ② → ③ → ④ → bandingkan dengan ①; pertajam skenario dengan hipotesis & verifikasi'), { size: 13, weight: 700, fill: 'var(--navy)', wrap: 120 });
      return s;
    }, p.label || S('理論値「4つの箱」', 'Theoretical value: the “four boxes”', 'Nilai teoretis: “empat kotak”'));
  };

  /* ---------- oee-tree ---------- */
  D['oee-tree'] = function () {
    const W = 860, H = 380;
    return svg(W, H, function () {
      let s = '';
      const x0 = 190, full = 520, hh = 44;
      const rows = [
        [S('負荷時間', 'Loading time', 'Waktu beban'), 1, 0, null, null],
        [S('稼働時間', 'Operating time', 'Waktu operasi'), 0.85, 0.15, S('停止ロス\n①故障 ②段取り・調整', 'Downtime loss\n① breakdown ② setup/adjust', 'Kerugian henti\n① rusak ② setup'), S('時間稼働率', 'Availability', 'Availability')],
        [S('正味稼働時間', 'Net operating time', 'Waktu operasi bersih'), 0.72, 0.13, S('性能ロス\n③チョコ停・空転 ④速度低下', 'Speed loss\n③ minor stops ④ reduced speed', 'Kerugian kecepatan\n③ henti kecil ④ lambat'), S('性能稼働率', 'Performance', 'Performance')],
        [S('価値稼働時間', 'Valuable operating time', 'Waktu operasi bernilai'), 0.68, 0.04, S('不良ロス\n⑤不良・手直し ⑥立上り', 'Quality loss\n⑤ defects/rework ⑥ startup', 'Kerugian mutu\n⑤ cacat ⑥ start-up'), S('良品率', 'Yield rate', 'Rasio produk baik')],
      ];
      rows.forEach(function (r, i) {
        const y = 30 + i * 78;
        s += T(x0 - 12, y + hh / 2, r[0], { size: 13.5, weight: 700, anchor: 'end', wrap: 24, valign: 'middle' });
        s += R(x0, y, full * r[1], hh, { fill: i === 3 ? 'var(--tone-green-bg)' : 'var(--tone-blue-bg)', stroke: i === 3 ? 'var(--green)' : 'var(--blue)', rx: 6 });
        if (r[2]) {
          s += R(x0 + full * r[1], y, full * r[2], hh, { fill: 'var(--tone-red-bg)', stroke: 'var(--red)', rx: 6, dash: '4 3' });
          s += T(x0 + full * r[1] + full * r[2] + 12, y + hh / 2, r[3], { size: 11.5, fill: 'var(--tone-red-fg)', anchor: 'start', valign: 'middle', weight: 600 });
          s += T(x0 + full * r[1] / 2, y + hh / 2, r[4], { size: 12, weight: 700, fill: 'var(--text-2)' });
        }
      });
      s += R(40, 330, 780, 40, { fill: 'var(--tone-navy-bg)', stroke: 'var(--navy)', rx: 10 });
      s += T(430, 350, S('OEE ＝ 時間稼働率 × 性能稼働率 × 良品率 ＝ 価値稼働時間 ÷ 負荷時間', 'OEE = Availability × Performance × Yield rate = valuable operating time ÷ loading time', 'OEE = Availability × Performance × Rasio produk baik = waktu bernilai ÷ waktu beban'), { size: 14.5, weight: 800, fill: 'var(--navy)' });
      return s;
    }, S('OEEとロス構造', 'OEE loss structure', 'Struktur kerugian OEE'));
  };

  /* ---------- process-symbols ---------- */
  D['process-symbols'] = function () {
    const W = 860, H = 230;
    const items = [
      ['op', S('加工', 'Operation', 'Operasi'), S('形・性質を変える', 'Changes shape/property', 'Mengubah bentuk/sifat'), 'green'],
      ['tr', S('運搬', 'Transport', 'Transportasi'), S('位置を変える', 'Changes location', 'Mengubah lokasi'), 'amber'],
      ['iq', S('数量検査', 'Inspection (qty)', 'Inspeksi (jumlah)'), S('数を調べる', 'Checks quantity', 'Memeriksa jumlah'), 'blue'],
      ['iql', S('品質検査', 'Inspection (quality)', 'Inspeksi (mutu)'), S('品質を調べる', 'Checks quality', 'Memeriksa mutu'), 'blue'],
      ['st', S('貯蔵', 'Storage', 'Penyimpanan'), S('計画的に保管', 'Planned storage', 'Simpan terencana'), 'red'],
      ['de', S('滞留（停滞）', 'Delay', 'Tunda'), S('計画外に待つ', 'Unplanned waiting', 'Menunggu tak terencana'), 'red'],
    ];
    return svg(W, H, function () {
      let s = '';
      items.forEach(function (it, i) {
        const cx = 72 + i * 143, cy = 70, c = tone[it[3]][1];
        const st = 'fill="var(--surface)" stroke="' + c + '" stroke-width="3"';
        if (it[0] === 'op') s += '<circle cx="' + cx + '" cy="' + cy + '" r="32" ' + st + '/>';
        if (it[0] === 'tr') s += '<circle cx="' + cx + '" cy="' + cy + '" r="17" ' + st + '/><path d="M' + (cx - 38) + ',' + (cy + 44) + ' h52 v-8 l20,14 l-20,14 v-8 h-52 z" ' + st + ' stroke-width="2"/>';
        if (it[0] === 'iq') s += '<rect x="' + (cx - 30) + '" y="' + (cy - 30) + '" width="60" height="60" ' + st + '/>';
        if (it[0] === 'iql') s += '<path d="M' + cx + ',' + (cy - 36) + ' L' + (cx + 36) + ',' + cy + ' L' + cx + ',' + (cy + 36) + ' L' + (cx - 36) + ',' + cy + ' Z" ' + st + '/>';
        if (it[0] === 'st') s += '<path d="M' + (cx - 34) + ',' + (cy - 28) + ' L' + (cx + 34) + ',' + (cy - 28) + ' L' + cx + ',' + (cy + 32) + ' Z" ' + st + '/>';
        if (it[0] === 'de') s += '<path d="M' + (cx - 26) + ',' + (cy - 30) + ' L' + cx + ',' + (cy - 30) + ' A30,30 0 0 1 ' + cx + ',' + (cy + 30) + ' L' + (cx - 26) + ',' + (cy + 30) + ' Z" ' + st + '/>';
        s += T(cx, 150, it[1], { size: 15, weight: 800, fill: c, wrap: 20 });
        s += T(cx, 185, it[2], { size: 12, fill: 'var(--text-2)', wrap: 22, valign: 'middle' });
      });
      s += T(W / 2, 222, S('付加価値を生むのは「加工」のみ。運搬・検査・停滞はすべて改善対象', 'Only “operation” adds value — transport, inspection and delay are improvement targets', 'Hanya “operasi” yang menambah nilai — transportasi, inspeksi, dan tunda adalah target perbaikan'), { size: 13, weight: 700, fill: 'var(--navy)' });
      return s;
    }, S('工程図記号', 'Process chart symbols', 'Simbol peta proses'));
  };

  /* ---------- learning-map ---------- */
  D['learning-map'] = function () {
    const W = 860, H = 210;
    return svg(W, H, function (a) {
      let s = '';
      const cols = ['teal', 'navy', 'blue', 'green'];
      ZA.tracks.forEach(function (tr, i) {
        const cx = 110 + i * 213, cy = 80, c = tone[cols[i]];
        if (i) s += L(cx - 213 + 62, cy, cx - 62, cy, { arrow: a, sw: 3 });
        s += '<circle cx="' + cx + '" cy="' + cy + '" r="56" fill="' + c[0] + '" stroke="' + c[1] + '" stroke-width="3"/>';
        s += T(cx, cy - 16, tr.icon, { size: 26 });
        s += T(cx, cy + 20, 'STAGE ' + tr.stage, { size: 13, weight: 800, fill: c[1] });
        s += T(cx, 160, tr.name, { size: 16, weight: 800 });
        s += T(cx, 186, ZA.u('modulesCount', { n: ZA.modulesOf(tr.id).length || '—' }), { size: 12, fill: 'var(--text-2)' });
      });
      return s;
    }, S('学習パス', 'Learning path', 'Jalur belajar'));
  };

  /* ---------- normal-curve ---------- */
  D['normal-curve'] = function () {
    const W = 820, H = 330;
    return svg(W, H, function () {
      let s = '';
      const x0 = 60, x1 = 760, base = 250, peak = 50, cx = (x0 + x1) / 2, sd = (x1 - x0) / 8;
      const y = function (x) { const z = (x - cx) / sd; return base - (base - peak) * Math.exp(-z * z / 2); };
      const band = function (k, col) {
        let d = 'M' + (cx - k * sd) + ',' + base;
        for (let x = cx - k * sd; x <= cx + k * sd; x += 3) d += ' L' + x + ',' + y(x);
        d += ' L' + (cx + k * sd) + ',' + base + ' Z';
        return P(d, { fill: col, stroke: 'none' });
      };
      s += band(3, 'var(--tone-blue-bg)');
      s += band(2, 'color-mix(in srgb, var(--blue) 22%, transparent)');
      s += band(1, 'color-mix(in srgb, var(--blue) 38%, transparent)');
      let d = 'M' + x0 + ',' + y(x0);
      for (let x = x0; x <= x1; x += 3) d += ' L' + x + ',' + y(x);
      s += P(d, { stroke: 'var(--navy)', sw: 3 });
      s += L(x0, base, x1, base, { stroke: 'var(--border-strong)' });
      [-3, -2, -1, 0, 1, 2, 3].forEach(function (k) {
        const x = cx + k * sd;
        s += L(x, base, x, base + 6, { stroke: 'var(--border-strong)' });
        s += T(x, base + 20, k === 0 ? 'μ' : (k > 0 ? 'μ+' + k + 'σ' : 'μ−' + (-k) + 'σ'), { size: 13, weight: 700, fill: 'var(--text-2)' });
      });
      s += T(cx, 150, '68.3%', { size: 16, weight: 800, fill: 'var(--navy)' });
      function span(k, yy, label) {
        let o = L(cx - k * sd, yy, cx + k * sd, yy, { stroke: 'var(--navy)', sw: 1.5 });
        o += L(cx - k * sd, yy - 5, cx - k * sd, yy + 5, { stroke: 'var(--navy)', sw: 1.5 }) + L(cx + k * sd, yy - 5, cx + k * sd, yy + 5, { stroke: 'var(--navy)', sw: 1.5 });
        o += R(cx - 36, yy - 11, 72, 22, { fill: 'var(--surface)', stroke: 'none', rx: 6 });
        o += T(cx, yy, label, { size: 13, weight: 800, fill: 'var(--navy)' });
        return o;
      }
      s += span(2, 290, '95.4%');
      s += span(3, 315, '99.7%');
      return s;
    }, S('正規分布', 'Normal distribution', 'Distribusi normal'));
  };
})();
