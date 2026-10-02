#!/usr/bin/env node
/* Check the "Ask ZEVA" retrieval: does each question pull the module that teaches it?
 * Only the search is tested here — no Gemini call, no network.
 * Usage: node tools/test_chat.js
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const sandbox = {
  console,
  location: { hash: '' },
  document: {
    readyState: 'complete', addEventListener() {}, body: { appendChild() {} },
    createElement: () => ({ classList: { add() {} }, appendChild() {}, addEventListener() {}, setAttribute() {}, style: {}, querySelector: () => null }),
    createTextNode: (s) => ({ nodeType: 3, text: s }),
  },
  fetch: async (url) => {
    const file = path.join(root, url.split('?')[0]);
    if (!fs.existsSync(file)) return { ok: false, status: 404 };
    return { ok: true, status: 200, json: async () => JSON.parse(fs.readFileSync(file, 'utf8')) };
  },
  localStorage: { getItem: () => null, setItem: () => {} },
  navigator: { language: 'ja' },
  addEventListener() {},
};
sandbox.window = sandbox;
sandbox.self = sandbox;
vm.createContext(sandbox);
for (const s of ['js/core.js', 'js/i18n.js', 'js/chat.js']) {
  vm.runInContext(fs.readFileSync(path.join(root, s), 'utf8'), sandbox, { filename: s });
}
const ZA = sandbox.ZA;

// question -> module (or glossary id) that must appear in the top excerpts.
// 複数書いた場合は、どれか1つが出れば通す(同じ話題を複数モジュールが扱うため)
const CASES = [
  ['ja', 'GPCバンドと規格限界の違いは？', 'z2-01'],
  ['ja', 'Quick標準化とDeep標準化の使い分けは？', 'z1-03'],
  ['ja', '無価値作業に品質ロスは入りますか', 'z3-01'],
  ['ja', 'V.Scoreが0.25のときどうする', 'z2-02'],
  ['ja', 'タクトタイムの計算式', 'ie-02'],
  ['ja', '初期標準と成果標準の違い', 'z1-03'],
  ['ja', 'OEEの3要素は', 'ie-07'],
  ['ja', 'ZEVAでDXはどう扱う？', ['z3-04', 'dx']],   // DX は範囲外。z3-04 と用語集 dx が説明する
  ['ja', '要求品質と過剰品質の違いは？', ['z1-04', 'required-quality', 'over-quality']],
  ['ja', 'GPCは品質だけの手法ですか', ['z2-01', 'gpc']],
  ['ja', 'デジタイゼーションとデジタライゼーションの違い', 'z3-04'],
  ['en', 'What is the difference between Quick GPC and Deep GPC?', ['z2-04', 'z2-05']],
  ['en', 'How do I calculate Cpk?', 'ie-09'],
  ['id', 'Apa itu standar awal?', 'z1-03'],
  ['id', 'Bagaimana menghitung takt time?', 'ie-02'],
];

(async function () {
  let bad = 0;
  for (const [lang, q, want] of CASES) {
    const hits = await ZA.chat.find(q, lang);
    const mods = hits.map((c) => c.m || c.g || '-');
    const wants = Array.isArray(want) ? want : [want];
    const ok = mods.slice(0, 5).some((m) => wants.includes(m));
    if (!ok) bad++;
    console.log(`${ok ? 'OK  ' : 'MISS'} [${lang}] ${q}\n       want ${wants.join(' or ')} / got ${mods.slice(0, 5).join(', ')}`);
  }
  const chars = (await ZA.chat.find('GPCバンドとは', 'ja')).reduce((s, c) => s + c.x.length, 0);
  console.log(`\ncontext size for one question: ${chars} chars`);
  console.log(bad ? `\n${bad} / ${CASES.length} questions missed their module` : `\nall ${CASES.length} questions found their module`);
  process.exit(bad ? 1 : 0);
})();
