/* 現場再建記 — 手帳
 * 気づき・仮説・打った手・確かめた結果を、日付と「そのとき見ていた画面」つきで残す。
 * 盤面が書く記録(sys)もここに並ぶ：現場で見聞きしたこと、調査の開始と結果、新しく動かせるようになった条件。
 * 品質のライン(G)と生産性のライン(P)の両方から使う。土台は core.js（WS）。
 */
(function () {
  'use strict';
  const WS = window.WS, G = WS.G, P = WS.P;
  const h = WS.h, t = WS.t, S = WS.S, md = WS.md;
  const DPW = WS.DPW;
  const save = WS.save, route = WS.route, show = WS.show, scen = WS.scen;
  const talk = WS.talk, btn = WS.btn, note = WS.note;
  const st = WS.state;

  const KINDS = [
    ['note', S('気づき', 'Insight', 'Temuan'), '💡'],
    ['hyp', S('仮説', 'Hypothesis', 'Hipotesis'), '❓'],
    ['act', S('打った手', 'Move', 'Langkah'), '🔧'],
    ['check', S('確かめた結果', 'Check', 'Pemeriksaan'), '✅'],
    ['sys', S('盤面の記録', 'From the floor', 'Dari lantai produksi'), '📋']
  ];
  const kindOf = function (k) { return KINDS.filter(function (x) { return x[0] === k; })[0] || KINDS[0]; };
  const VERDICTS = [
    ['yes', S('支持された', 'Supported', 'Didukung')],
    ['no', S('棄却した', 'Rejected', 'Ditolak')],
    ['open', S('まだ分からない', 'Still open', 'Belum jelas')]
  ];
  // 画面とタブの呼び名。手帳に「どこを見て書いたか」を添えるため。
  const PLACES = {
    board: S('盤面', 'the floor', 'papan permainan'), analyze: S('分析室', 'analysis room', 'ruang analisis'),
    tune: S('条件', 'settings', 'setelan'), shop: S('調査の棚', 'survey shelf', 'rak survei'),
    recon: S('現場調査', 'reconnaissance', 'peninjauan lapangan'), stdwork: S('標準作業', 'standard work', 'kerja standar'),
    conclude: S('結論', 'conclusion', 'kesimpulan'), notebook: S('手帳', 'notebook', 'buku catatan'),
    trend: S('推移', 'trend', 'tren'), hourly: S('時間ごと', 'by hour', 'per jam'), pchart: S('p管理図', 'p chart', 'peta kendali p'),
    pareto: S('パレート', 'Pareto', 'Pareto'), strat: S('層別', 'stratify', 'stratifikasi'), scatter: S('散布図', 'scatter', 'diagram pencar'),
    hist: S('ヒストグラム', 'histogram', 'histogram'), inter: S('交互作用', 'interaction', 'interaksi'), boxes: S('4つの箱', 'four boxes', 'empat kotak'),
    yama: S('山積み図', 'yamazumi', 'yamazumi'), time: S('稼働の内訳', 'where the minutes go', 'rincian waktu operasi'),
    setup: S('段取りの分解', 'changeover split', 'pembagian pergantian'), value: S('価値作業分析', 'value work', 'pekerjaan bernilai'),
    lt: S('リードタイム', 'lead time', 'lead time'), trial: S('試験日の結果', 'trial days', 'hari uji')
  };
  const isProd = function () { return (scen() || {}).kind === 'prod'; };
  const suspects = function () { return isProd() ? (P.SUSPECTS || []) : G.SUSPECTS(); };
  const suspectName = function (id) {
    const o = suspects().filter(function (x) { return x[0] === id; })[0];
    return o ? t(o[1]) : id;
  };
  const dayLabel = function (dn) {
    if (!dn) return t(S('第0週', 'week 0', 'minggu 0'));
    const w = Math.ceil(dn / DPW), d = dn - (w - 1) * DPW;
    return t(S('第' + w + '週 ' + d + '日目', 'wk ' + w + ' day ' + d, 'minggu ' + w + ' hari ' + d));
  };
  const placeLabel = function (n) {
    const p = [];
    if (n.screen && PLACES[n.screen] && n.screen !== 'notebook') p.push(t(PLACES[n.screen]));
    if (n.screen === 'analyze' && n.tab && PLACES[n.tab]) p.push(t(PLACES[n.tab]));
    return p.join(' › ');
  };
  // 本文。盤面が書いたものは3つ組、プレイヤーが書いたものは文字列。
  const bodyOf = function (n) { return typeof n.text === 'string' ? n.text : t(n.text); };

  /* ---- 採点に使う読み ----
   * 仮説を書いてから調査を始めたか、書いた仮説を確かめたか、原因を名指しした仮説があったか。 */
  function bookScore() {
    const log = st().surveyLog || [];
    const hyps = WS.notesOf('hyp');
    const before = log.length ? log.filter(function (x) { return x.hypBefore > 0; }).length / log.length : 0;
    const checked = hyps.length
      ? hyps.filter(function (hp, i) { return WS.notesOf('check').some(function (c) { return c.hypIdx === i; }); }).length / hyps.length
      : 0;
    return { before: before, checked: checked, hyps: hyps.length, checks: WS.notesOf('check').length, surveys: log.length };
  }
  const hypNaming = function (suspectId) {
    return WS.notesOf('hyp').some(function (n) { return n.suspect === suspectId; });
  };

  /* ---- 書き出し。講評で「点数」ではなく「辿った道」を比べるための文章 ---- */
  function notesText() {
    const sc = scen();
    const lines = ['# ' + (st().team ? st().team + ' / ' : '') + t(sc.name), ''];
    (st().notes || []).forEach(function (n) {
      const k = kindOf(n.kind);
      let body = bodyOf(n);
      if (n.kind === 'hyp' && n.suspect) body = '[' + suspectName(n.suspect) + '] ' + body;
      if (n.kind === 'check') {
        const vd = VERDICTS.filter(function (x) { return x[0] === n.verdict; })[0];
        body = (n.hypIdx != null ? '→ ' + t(S('仮説', 'hypothesis', 'hipotesis')) + ' #' + (n.hypIdx + 1) + ' ' : '') + (vd ? t(vd[1]) + '. ' : '') + body;
      }
      lines.push('- ' + dayLabel(n.dn) + ' ' + k[2] + ' ' + t(k[1]) + (placeLabel(n) ? ' (' + placeLabel(n) + ')' : '') + ': ' + body.replace(/\*\*/g, ''));
    });
    return lines.join('\n');
  }

  /* ---- 一覧 ---- */
  function entryEl(n, idx, hypNo) {
    const k = kindOf(n.kind);
    const head = h('div.g-nb-head', null,
      h('span.chip' + (n.kind === 'sys' ? '' : '.tone-navy'), { text: k[2] + ' ' + t(k[1]) + (n.kind === 'hyp' ? ' #' + hypNo : '') }),
      h('span.muted', { text: dayLabel(n.dn) + (placeLabel(n) ? ' · ' + placeLabel(n) : '') }));
    const body = h('div.g-nb-body');
    if (n.kind === 'hyp' && n.suspect) body.appendChild(h('b', { text: t(S('疑う：', 'Suspect: ', 'Dicurigai: ')) + suspectName(n.suspect) + '　' }));
    if (n.kind === 'check') {
      const vd = VERDICTS.filter(function (x) { return x[0] === n.verdict; })[0];
      body.appendChild(h('b', { text: (n.hypIdx != null ? t(S('仮説 #', 'hypothesis #', 'hipotesis #')) + (n.hypIdx + 1) + '　' : '') + (vd ? t(vd[1]) : '') + '　' }));
    }
    if (typeof n.text === 'string') body.appendChild(h('span', { text: n.text }));
    else body.appendChild(h('span', { html: md(t(n.text)) }));
    const el = h('div.g-nb-item.k-' + n.kind, null, head, body);
    if (n.kind !== 'sys') {
      const del = btn(S('消す', 'Delete', 'Hapus'), function () {
        st().notes.splice(idx, 1);
        // 消した仮説を指していた確認は、指し先を外す
        st().notes.forEach(function (m) { if (m.kind === 'check' && m.hypIdx != null && m.hypIdx >= hypNo - 1) m.hypIdx = null; });
        save(); route();
      }, 'btn-sm btn-ghost');
      el.appendChild(del);
    }
    return el;
  }

  /* ---- 画面 ---- */
  function screenNotebook() {
    const v = h('div');
    v.appendChild((isProd() ? P.hud : G.hud)());
    v.appendChild(h('h2', { text: t(S('手帳', 'Notebook', 'Buku catatan')) }));
    v.appendChild(talk('eng', S('**仮説は、調べる前に書きます。**「何が原因なら、何で層別すると差が出るはず」を一行。'
      + '調べたら、その仮説が支持されたか棄却されたかを書く。当たったかどうかは、書いてあるものだけが後から言えます。',
      '**Write the hypothesis before you look.** One line: “if X is the cause, stratifying by Y should show a gap.” '
      + 'After looking, write whether it held or fell. Only what is written can later be called a hit.',
      '**Tulis hipotesis sebelum menyelidiki.** Satu baris: “bila X penyebabnya, stratifikasi menurut Y akan menunjukkan selisih.” '
      + 'Setelah menyelidiki, tulis apakah hipotesis itu didukung atau ditolak. Hanya yang tertulis yang nanti dapat disebut tepat.')));

    // 記入
    const form = h('div.g-nb-form');
    const kind = st().nbKind || 'note';
    const kindRow = h('div.row', { style: { gap: '6px', flexWrap: 'wrap', marginBottom: '8px' } });
    KINDS.filter(function (k) { return k[0] !== 'sys'; }).forEach(function (k) {
      const b = h('button.chip' + (kind === k[0] ? '.tone-navy' : ''), { type: 'button', text: k[2] + ' ' + t(k[1]) });
      b.style.cssText = 'cursor:pointer;border:1px solid var(--border)';
      b.addEventListener('click', function () { st().nbKind = k[0]; save(); route(); });
      kindRow.appendChild(b);
    });
    form.appendChild(kindRow);

    let suspectSel = null, hypSel = null, verdict = st().nbVerdict || 'open';
    if (kind === 'hyp') {
      suspectSel = h('select');
      suspectSel.style.cssText = 'width:100%;max-width:420px;padding:8px 10px;border-radius:10px;border:1px solid var(--border-strong);background:var(--surface);color:var(--text);font:inherit;margin-bottom:8px';
      suspectSel.appendChild(h('option', { value: '', text: t(S('— 何を疑うか —', '— what do you suspect —', '— apa yang dicurigai —')) }));
      suspects().forEach(function (o) { suspectSel.appendChild(h('option', { value: o[0], text: t(o[1]) })); });
      form.appendChild(suspectSel);
    }
    if (kind === 'check') {
      const hyps = WS.notesOf('hyp');
      if (!hyps.length) {
        form.appendChild(note([S('確かめる仮説がまだありません。先に仮説を書いてください。', 'There is no hypothesis to check yet. Write one first.', 'Belum ada hipotesis untuk diperiksa. Tulis satu dulu.')]));
      } else {
        hypSel = h('select');
        hypSel.style.cssText = 'width:100%;max-width:420px;padding:8px 10px;border-radius:10px;border:1px solid var(--border-strong);background:var(--surface);color:var(--text);font:inherit;margin-bottom:8px';
        hyps.forEach(function (hp, i) {
          hypSel.appendChild(h('option', { value: String(i), text: '#' + (i + 1) + ' ' + (hp.suspect ? suspectName(hp.suspect) + '：' : '') + String(hp.text).slice(0, 40) }));
        });
        form.appendChild(hypSel);
        const vrow = h('div.row', { style: { gap: '6px', flexWrap: 'wrap', marginBottom: '8px' } });
        VERDICTS.forEach(function (o) {
          const b = h('button.chip' + (verdict === o[0] ? '.tone-navy' : ''), { type: 'button', text: t(o[1]) });
          b.style.cssText = 'cursor:pointer;border:1px solid var(--border)';
          b.addEventListener('click', function () { st().nbVerdict = o[0]; save(); route(); });
          vrow.appendChild(b);
        });
        form.appendChild(vrow);
      }
    }
    const PH = {
      note: S('例：朝いちばんの時間帯だけ不良が高い', 'e.g. only the first hour of the day runs high', 'mis. hanya jam pertama yang tinggi'),
      hyp: S('例：含水率が原因なら、含水率で層別すると3つの症状すべてに差が出るはず。日次記録と含水率の実測で確かめる', 'e.g. if moisture is the cause, stratifying by moisture should put a gap in all three symptoms; check with the daily record and moisture measurement', 'mis. bila kadar air penyebabnya, stratifikasi menurut kadar air akan memberi selisih pada ketiga gejala; periksa dengan catatan harian dan pengukuran kadar air'),
      act: S('例：在炉時間を24→32時間にした。2週流して見る', 'e.g. kiln hours 24 → 32; run two weeks and look', 'mis. jam kiln 24 → 32; jalankan dua minggu dan lihat'),
      check: S('例：含水率で層別すると寸法・接着・面質すべてに★。室温にも★が付くが、室温は含水率と一緒に動いているだけかもしれない', 'e.g. stratifying by moisture stars all three; room temperature stars too, but it may only move with the moisture', 'mis. stratifikasi menurut kadar air memberi bintang pada ketiganya; suhu ruang juga berbintang, tetapi mungkin hanya bergerak bersama kadar air')
    };
    const ta = h('textarea', { rows: 3, placeholder: t(PH[kind] || PH.note) });
    ta.style.cssText = 'width:100%;padding:10px 12px;border-radius:10px;border:1px solid var(--border-strong);background:var(--surface);color:var(--text);font:inherit;font-size:14px';
    ta.value = st().nbDraft || '';
    ta.addEventListener('input', function () { st().nbDraft = ta.value; });
    form.appendChild(ta);
    const add = btn(S('書く', 'Write', 'Tulis'), function () {
      const text = ta.value.trim();
      if (!text) return;
      const extra = { screen: st().noteFrom || 'board', tab: st().noteFrom === 'analyze' ? (st().tab || null) : null };
      if (kind === 'hyp') extra.suspect = suspectSel && suspectSel.value ? suspectSel.value : null;
      if (kind === 'check') {
        if (!hypSel) return;
        extra.hypIdx = +hypSel.value;
        extra.verdict = verdict;
      }
      WS.addNote(kind, text, extra);
      st().nbDraft = '';
      save(); route();
    }, 'btn-primary');
    add.style.marginTop = '8px';
    form.appendChild(add);
    v.appendChild(form);

    // 一覧。新しいものを上に。仮説には通し番号を付け、確認がどれを指すか分かるようにする。
    const notes = st().notes || [];
    let hypNo = 0;
    const numbered = notes.map(function (n, i) { if (n.kind === 'hyp') hypNo += 1; return { n: n, i: i, hypNo: n.kind === 'hyp' ? hypNo : 0 }; });
    const list = h('div.g-nb-list');
    if (!notes.length) list.appendChild(note([S('まだ何も書いていません。', 'Nothing written yet.', 'Belum ada yang ditulis.')]));
    // 盤面の記録が多くて自分の記入が埋もれるので、絞り込める。既定は自分の記入だけ。
    if (!st().nbView) st().nbView = 'mine';
    const mine = numbered.filter(function (o) { return o.n.kind !== 'sys'; });
    const shown = st().nbView === 'mine' ? mine : numbered;
    // 講評用の書き出しと同じ古い順。新しい記入は末尾に付く。
    shown.forEach(function (o) { list.appendChild(entryEl(o.n, o.i, o.hypNo)); });
    if (st().nbView === 'mine' && notes.length && !mine.length) {
      list.appendChild(note([S('自分の記入はまだありません。盤面の記録は「全部」で見られます。', 'You have written nothing yet. Switch to “all” to see the floor’s entries.', 'Anda belum menulis apa pun. Beralih ke “Semua” untuk melihat catatan papan permainan.')]));
    }
    v.appendChild(h('h3', { style: { marginTop: '18px' }, text: t(S('これまでの記録（古い順）', 'Entries so far (oldest first)', 'Catatan sejauh ini (dari yang terlama)')) + ' ' + shown.length + ' / ' + notes.length }));
    v.appendChild(WS.switcher(S('表示', 'Show', 'Tampilan'),
      [['mine', S('自分の記入だけ', 'My entries only', 'Hanya catatan saya')], ['all', S('全部（盤面の記録も）', 'All (with the floor’s entries)', 'Semua (termasuk catatan papan permainan)')]],
      st().nbView, function (x) { st().nbView = x; }));
    v.appendChild(list);

    const row = h('div.row', { style: { gap: '8px', flexWrap: 'wrap', marginTop: '14px' } });
    row.appendChild(btn(S('戻る', 'Back', 'Kembali'), function () {
      st().screen = st().noteFrom || 'board'; st().noteFrom = null; save(); route();
    }, 'btn-primary'));
    const copy = btn(S('手帳をコピーする', 'Copy the notebook', 'Salin buku catatan'), function () {
      try { navigator.clipboard.writeText(notesText()); copy.textContent = t(S('コピーしました', 'Copied', 'Tersalin')); } catch (e) { /* クリップボードが使えない環境 */ }
    }, 'btn-ghost');
    row.appendChild(copy);
    v.appendChild(row);
    show(v);
  }

  Object.assign(G, { screenNotebook: screenNotebook, bookScore: bookScore, hypNaming: hypNaming, notesText: notesText, KINDS: KINDS, VERDICTS: VERDICTS, suspectName: suspectName, dayLabel: dayLabel, placeLabel: placeLabel, bodyOf: bodyOf });
})();
