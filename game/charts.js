/* 現場再建記 — 作図の部品。
 * SVG を文字列で組む。外部ライブラリは使わない。
 * 色は ../css/style.css の変数に乗せるので、配色と明暗の切替はサイトと揃う。
 */
(function () {
  'use strict';
  const esc = function (s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  };
  const F = function (n, d) { return Number(n).toFixed(d == null ? 1 : d); };

  // 目盛りの刻み。1 / 2 / 5 の系列から選ぶ。
  function ticks(lo, hi, n) {
    const span = (hi - lo) || 1, step0 = span / (n || 5);
    const mag = Math.pow(10, Math.floor(Math.log10(step0)));
    const norm = step0 / mag;
    const step = (norm < 1.5 ? 1 : norm < 3 ? 2 : norm < 7 ? 5 : 10) * mag;
    const out = [];
    for (let v = Math.ceil(lo / step) * step; v <= hi + 1e-9; v += step) out.push(+v.toFixed(10));
    return out;
  }

  // 枠と目盛り。以降の図はこの上に描く。
  function frame(o) {
    const W = o.w || 680, H = o.h || 240;
    const L = o.left == null ? 46 : o.left, B = o.bottom == null ? 30 : o.bottom;
    const T = o.top == null ? 14 : o.top, R = o.right == null ? 14 : o.right;
    const x = function (v) { return L + (v - o.x0) / ((o.x1 - o.x0) || 1) * (W - L - R); };
    const y = function (v) { return T + (1 - (v - o.y0) / ((o.y1 - o.y0) || 1)) * (H - T - B); };
    let g = '';
    ticks(o.y0, o.y1, 5).forEach(function (v) {
      g += '<line class="grid-line" x1="' + L + '" x2="' + (W - R) + '" y1="' + y(v) + '" y2="' + y(v) + '"/>'
        + '<text x="' + (L - 6) + '" y="' + (y(v) + 3.5) + '" text-anchor="end">' + F(v, o.yd) + (o.yUnit || '') + '</text>';
    });
    (o.xTicks || ticks(o.x0, o.x1, 6)).forEach(function (v) {
      g += '<text x="' + x(v) + '" y="' + (H - 9) + '" text-anchor="middle">' + (o.xFmt ? o.xFmt(v) : F(v, o.xd == null ? 0 : o.xd)) + '</text>';
    });
    if (o.xLabel) g += '<text x="' + (L + (W - L - R) / 2) + '" y="' + (H - 1) + '" text-anchor="middle" class="ax">' + esc(o.xLabel) + '</text>';
    return { W: W, H: H, x: x, y: y, g: g, L: L, R: R, T: T, B: B };
  }
  const wrap = function (f, body) {
    return '<svg viewBox="0 0 ' + f.W + ' ' + f.H + '" role="img">' + f.g + body + '</svg>';
  };

  /* ---- 折れ線。series = [{name, color, points:[[x,y]], dash}] ---- */
  function lines(o) {
    const f = frame(o);
    let b = '';
    (o.rules || []).forEach(function (r) {
      b += '<line x1="' + f.L + '" x2="' + (f.W - f.R) + '" y1="' + f.y(r.at) + '" y2="' + f.y(r.at)
        + '" stroke="' + r.color + '" stroke-width="' + (r.width || 2) + '" stroke-dasharray="' + (r.dash || '6 4') + '"/>';
      if (r.label) b += '<text x="' + (f.W - f.R - 2) + '" y="' + (f.y(r.at) - 4) + '" text-anchor="end" style="fill:' + r.color + ';font-weight:700">' + esc(r.label) + '</text>';
    });
    o.series.forEach(function (s) {
      if (!s.points.length) return;
      b += '<polyline points="' + s.points.map(function (p) { return f.x(p[0]) + ',' + f.y(p[1]); }).join(' ')
        + '" fill="none" stroke="' + s.color + '" stroke-width="' + (s.width || 2.4) + '"'
        + (s.dash ? ' stroke-dasharray="' + s.dash + '"' : '') + '/>';
      if (s.dots !== false) {
        s.points.forEach(function (p, i) {
          const flag = s.flags && s.flags[i];
          b += '<circle cx="' + f.x(p[0]) + '" cy="' + f.y(p[1]) + '" r="' + (flag ? 5 : 3)
            + '" fill="' + (flag ? 'var(--red)' : s.color) + '"/>';
        });
      }
    });
    return wrap(f, b);
  }

  /* ---- 横棒。rows = [{label, value, color, note}] ---- */
  function bars(o) {
    const rows = o.rows, W = o.w || 680, rh = o.rowH || 26, L = o.left == null ? 120 : o.left;
    const H = rows.length * rh + 14;
    const max = Math.max.apply(null, rows.map(function (r) { return r.value; }).concat([o.min || 0.1]));
    let b = '';
    rows.forEach(function (r, i) {
      const y = 8 + i * rh, w = Math.max(1, (r.value / max) * (W - L - 76));
      b += '<text x="' + (L - 8) + '" y="' + (y + 13) + '" text-anchor="end">' + esc(r.label) + '</text>';
      b += '<rect x="' + L + '" y="' + (y + 3) + '" width="' + w + '" height="' + (rh - 10) + '" rx="3" fill="' + (r.color || 'var(--navy)') + '"/>';
      b += '<text x="' + (L + w + 6) + '" y="' + (y + 13) + '" style="font-weight:700">' + esc(r.note || (F(r.value, o.d) + (o.unit || ''))) + '</text>';
    });
    return '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img">' + b + '</svg>';
  }

  /* ---- 散布図。pts = [[x,y]] ---- */
  function scatter(o) {
    const f = frame(o);
    let b = '';
    if (o.vline != null) {
      b += '<line x1="' + f.x(o.vline) + '" x2="' + f.x(o.vline) + '" y1="' + f.T + '" y2="' + (f.H - f.B)
        + '" stroke="var(--green)" stroke-width="2" stroke-dasharray="5 4"/>';
    }
    // 枠の外に出る点は描かない。描くと目盛りの上に乗ってしまう。
    o.pts.forEach(function (p) {
      if (!isFinite(p[0]) || !isFinite(p[1])) return;
      if (p[0] < o.x0 || p[0] > o.x1 || p[1] < o.y0 || p[1] > o.y1) return;
      b += '<circle cx="' + f.x(p[0]) + '" cy="' + f.y(p[1]) + '" r="3" fill="var(--navy)" opacity=".38"/>';
    });
    if (o.fit && o.pts.length > 3) {
      // 最小二乗の直線。当てはめの良し悪しではなく、向きを見るためのもの。
      let sx = 0, sy = 0, sxy = 0, sxx = 0;
      o.pts.forEach(function (p) { sx += p[0]; sy += p[1]; sxy += p[0] * p[1]; sxx += p[0] * p[0]; });
      const n = o.pts.length, den = n * sxx - sx * sx;
      if (Math.abs(den) > 1e-9) {
        const a = (n * sxy - sx * sy) / den, c = (sy - a * sx) / n;
        // 枠から出るところで線を切る。y だけを押し込めると、端が上下に寄って
        // 傾きが寝てしまい、向きを見るという目的そのものが崩れる。
        let xa = o.x0, xb = o.x1, draw = true;
        if (Math.abs(a) > 1e-12) {
          const xAt = function (y) { return (y - c) / a; };
          const ea = xAt(o.y0), eb = xAt(o.y1);
          xa = Math.max(xa, Math.min(ea, eb));
          xb = Math.min(xb, Math.max(ea, eb));
          draw = xb > xa;
        } else {
          draw = c >= o.y0 && c <= o.y1;
        }
        if (draw) {
          const cy = function (x) { return Math.max(o.y0, Math.min(o.y1, a * x + c)); };
          b += '<line x1="' + f.x(xa) + '" y1="' + f.y(cy(xa))
            + '" x2="' + f.x(xb) + '" y2="' + f.y(cy(xb))
            + '" stroke="var(--red)" stroke-width="2"/>';
        }
      }
    }
    return wrap(f, b);
  }

  /* ---- ヒストグラム。vals = 数値の配列 ---- */
  function hist(o) {
    const vals = o.vals;
    const lo = o.x0, hi = o.x1, k = o.bins || 12, bw = (hi - lo) / k;
    const cnt = new Array(k).fill(0);
    vals.forEach(function (v) {
      let i = Math.floor((v - lo) / bw);
      if (i < 0) i = 0; if (i >= k) i = k - 1;
      cnt[i]++;
    });
    const f = frame({ w: o.w, h: o.h, x0: lo, x1: hi, y0: 0, y1: Math.max.apply(null, cnt) * 1.12 || 1,
      yUnit: '', yd: 0, xLabel: o.xLabel, xd: o.xd });
    let b = '';
    if (o.band) {
      b += '<rect x="' + f.x(Math.max(lo, o.band[0])) + '" y="' + f.T
        + '" width="' + Math.max(0, f.x(Math.min(hi, o.band[1])) - f.x(Math.max(lo, o.band[0])))
        + '" height="' + (f.H - f.T - f.B) + '" fill="var(--green)" opacity=".12"/>';
    }
    cnt.forEach(function (c, i) {
      const x0 = f.x(lo + i * bw), x1 = f.x(lo + (i + 1) * bw);
      b += '<rect x="' + (x0 + 1) + '" y="' + f.y(c) + '" width="' + Math.max(1, x1 - x0 - 2)
        + '" height="' + (f.y(0) - f.y(c)) + '" fill="var(--navy)" opacity=".75"/>';
    });
    return wrap(f, b);
  }

  /* ---- 交互作用図。2本の折れ線が平行なら交互作用は無い ---- */
  function interaction(o) {
    const f = frame({ w: o.w || 560, h: o.h || 220, x0: -0.25, x1: 1.25,
      y0: 0, y1: Math.max.apply(null, o.rows.map(function (r) { return Math.max(r.a, r.b); })) * 1.2,
      yUnit: '%', xTicks: [0, 1], xFmt: function (v) { return v === 0 ? o.xLabels[0] : o.xLabels[1]; },
      xLabel: o.xLabel });
    let b = '';
    o.rows.forEach(function (r) {
      b += '<polyline points="' + f.x(0) + ',' + f.y(r.a) + ' ' + f.x(1) + ',' + f.y(r.b)
        + '" fill="none" stroke="' + r.color + '" stroke-width="2.6"/>';
      b += '<circle cx="' + f.x(0) + '" cy="' + f.y(r.a) + '" r="4" fill="' + r.color + '"/>';
      b += '<circle cx="' + f.x(1) + '" cy="' + f.y(r.b) + '" r="4" fill="' + r.color + '"/>';
      b += '<text x="' + (f.x(1) + 6) + '" y="' + (f.y(r.b) + 4) + '" style="fill:' + r.color + ';font-weight:700">' + esc(r.label) + '</text>';
    });
    return wrap(f, b);
  }

  window.WOODSHOP_CHARTS = {
    lines: lines, bars: bars, scatter: scatter, hist: hist, interaction: interaction, ticks: ticks
  };
})();
