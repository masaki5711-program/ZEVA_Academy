#!/usr/bin/env node
/* Validate ZEVA Academy content against docs/CONTENT_GUIDE.md.
 * Usage: node tools/validate.js
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const scripts = [...html.matchAll(/<script src="([^"]+)"/g)].map((m) => m[1]);

// Minimal browser stubs so core.js / content load.
const sandbox = { console, window: {}, localStorage: { getItem: () => null, setItem: () => {} }, navigator: { language: 'ja' } };
sandbox.window = sandbox;
vm.createContext(sandbox);

const errors = [];
const warns = [];
const loadOnly = scripts.filter((s) => s.startsWith('content/') || s === 'js/core.js' || s === 'js/i18n.js');
for (const s of loadOnly) {
  const file = path.join(root, s);
  if (!fs.existsSync(file)) { errors.push(`missing script: ${s}`); continue; }
  try { vm.runInContext(fs.readFileSync(file, 'utf8'), sandbox, { filename: s }); }
  catch (e) { errors.push(`load error in ${s}: ${e.message}`); }
}
const ZA = sandbox.ZA;
if (!ZA) { console.error('core not loaded'); process.exit(1); }

const LANGS = ['ja', 'en', 'id'];
const BLOCKS = new Set(['p', 'h', 'list', 'callout', 'quote', 'formula', 'example', 'table', 'cards', 'compare', 'flow', 'cycle', 'chain', 'layers', 'diagram', 'check', 'widget', 'launch']);
// 三面の文字列を持つソース。ウィジェットと、別ページのゲームアプリ。
const WIDGET_FILES = ['js/widgets-ie.js', 'js/widgets-zeva.js'];
const TRIPLE_FILES = WIDGET_FILES.concat(['game/core.js', 'game/model.js', 'game/screens.js', 'game/analyze.js', 'game/result.js', 'game/app.js', 'game/scenarios.js', 'game/prod-model.js', 'game/prod-screens.js', 'game/prod-analyze.js', 'game/prod-result.js']);
const wsrc = WIDGET_FILES.map((f) => fs.readFileSync(path.join(root, f), 'utf8')).join('\n');
const WIDGETS = new Set([...wsrc.matchAll(/W\['([a-z0-9-]+)'\]\s*=/g)].map((m) => m[1]));
const dsrc = fs.readFileSync(path.join(root, 'js/diagrams.js'), 'utf8');
const DIAGRAMS = new Set([...dsrc.matchAll(/D\['([a-z0-9-]+)'\]\s*=/g)].map((m) => m[1]));

// Terms that must never appear in a public repository.
// Generic patterns live here; organisation-specific ones go in tools/forbidden.local.txt (git-ignored, one regex per line).
const FORBIDDEN = [/\.xlsx|\.xlsm|\.mp4|\.docx|\.pptx/i, /[A-Z]:\\Users\\/i];
const localList = path.join(__dirname, "forbidden.local.txt");
if (fs.existsSync(localList)) {
  fs.readFileSync(localList, "utf8").split(/\r?\n/).map((x) => x.trim()).filter((x) => x && !x.startsWith("#"))
    .forEach((x) => FORBIDDEN.push(new RegExp(x, 'i')));
} else {
  console.log('NOTE  tools/forbidden.local.txt not found — only generic confidentiality checks run');
}

const isL = (v) => v && typeof v === 'object' && !Array.isArray(v) && ('ja' in v || 'en' in v) && Object.keys(v).every((k) => LANGS.includes(k));
// id: 訳語の逆戻りを止める(2026-09-17 translation-reviewer と確定)
const ID_WORDS = [
  [/bahasa bersama/i, 'istilah umum'],
  [/benda uji/i, 'barang uji coba'],
  [/barang dibuang/i, 'barang afkir'],
  [/di lapangan/, 'di lantai produksi'],
  [/berpikir nilai teoretis/i, 'berpikir berbasis nilai teoretis'],
];

function checkL(v, where) {
  if (typeof v === 'string' || typeof v === 'number') return;
  if (!isL(v)) { errors.push(`${where}: expected localized object`); return; }
  for (const l of LANGS) {
    if (typeof v[l] !== 'string') { errors.push(`${where}: missing "${l}"`); continue; }
    if (!v[l].trim() && LANGS.some((x) => (v[x] || '').trim())) warns.push(`${where}: empty "${l}"`);
    for (const re of FORBIDDEN) if (re.test(v[l])) errors.push(`${where} [${l}]: forbidden term ${re}`);
    // Japanese left in an en/id field: a find-and-replace that ignored the language.
    // (2026-09-17: "デジタル化レベル3" reached the English and Indonesian answers of a quiz.)
    if (l !== 'ja' && /[぀-ヿ一-鿿]/.test(v[l])) {
      errors.push(`${where} [${l}]: Japanese text in a non-Japanese field`);
    }
    for (const m of v[l].matchAll(/\[\[([a-z0-9-]+)(?:\|[^\]]+)?\]\]/g)) {
      if (!ZA.glossaryById[m[1]]) errors.push(`${where} [${l}]: unknown glossary id "${m[1]}"`);
    }
    // Tracks left by a find-and-replace across all three languages
    // (2026-09-17: renaming TVP to the theoretical value produced
    //  "nilai teoretis nilai teoretis", "the the", and English articles inside Indonesian.)
    const dup = v[l].match(/\b([A-Za-z][A-Za-z-]{2,}(?:\s+[a-z][A-Za-z-]+){0,2})\s+\1\b/);
    if (dup) errors.push(`${where} [${l}]: repeated phrase "${dup[1]}"`);
    if (l === 'id' && /(^|[\s(])the\s/.test(v[l])) {
      errors.push(`${where} [id]: English article "the" in an Indonesian field`);
    }
    // "komponen" means both a physical part and a component/element. Only the first
    // becomes "part" (2026-09-17: a blanket rename turned 4 components of ZEVA,
    // the components of lead time and ANOVA variance components into "part").
    if (l === 'id' && /part/.test(v[l]) && /構成要素|成分/.test(v.ja || '')) {
      errors.push(`${where} [id]: "構成要素/成分" is komponen, not part`);
    }
    // Indonesian wording settled with the reviewer on 2026-09-17: shop-floor words,
    // not textbook or literal-translation ones. The right side is what to write instead.
    if (l === 'id') {
      for (const [bad, good] of ID_WORDS) {
        if (bad.test(v[l])) errors.push(`${where} [id]: use "${good}" instead of ${bad}`);
      }
    }
  }
}
// Walk an arbitrary structure and check every localized object.
function walk(v, where) {
  if (Array.isArray(v)) { v.forEach((x, i) => walk(x, `${where}[${i}]`)); return; }
  if (v && typeof v === 'object') {
    if (isL(v)) { checkL(v, where); return; }
    for (const k of Object.keys(v)) walk(v[k], `${where}.${k}`);
  } else if (typeof v === 'string') {
    for (const re of FORBIDDEN) if (re.test(v)) errors.push(`${where}: forbidden term ${re}`);
  }
}

function checkBlock(b, where) {
  if (!b || !BLOCKS.has(b.type)) { errors.push(`${where}: unknown block type "${b && b.type}"`); return; }
  if (b.type === 'widget' && !WIDGETS.has(b.name)) errors.push(`${where}: unknown widget "${b.name}"`);
  if (b.type === 'diagram' && !DIAGRAMS.has(b.name)) errors.push(`${where}: unknown diagram "${b.name}"`);
  if (b.type === 'check') {
    if (!Array.isArray(b.choices) || !(b.answer >= 0 && b.answer < b.choices.length)) errors.push(`${where}: check answer out of range`);
  }
  if (b.type === 'widget' && b.name === 'sort-game') {
    const ids = new Set((b.props.bins || []).map((x) => x.id));
    (b.props.items || []).forEach((it, i) => { if (!ids.has(it.bin)) errors.push(`${where}: sort-game item ${i} bin "${it.bin}" not in bins`); });
  }
  if (b.type === 'widget' && b.name === 'scenario') {
    (b.props.steps || []).forEach((s, i) => { if (!(s.choices || []).some((c) => c.correct)) errors.push(`${where}: scenario step ${i} has no correct choice`); });
  }
  walk(b, where);
}

const expected = scripts.filter((s) => s.startsWith('content/modules/')).map((s) => path.basename(s, '.js'));
const tracks = new Set(['ie', 'z1', 'z2', 'z3']);
let stats = { modules: 0, sections: 0, blocks: 0, widgets: 0, quiz: 0, chars: 0 };
for (const id of expected) {
  const m = ZA.modules[id];
  if (!m) { errors.push(`module ${id} not registered`); continue; }
  stats.modules++;
  if (!tracks.has(m.track)) errors.push(`${id}: bad track`);
  ['title', 'summary'].forEach((k) => checkL(m[k], `${id}.${k}`));
  (m.objectives || []).forEach((o, i) => checkL(o, `${id}.objectives[${i}]`));
  (m.keyPoints || []).forEach((o, i) => checkL(o, `${id}.keyPoints[${i}]`));
  (m.prereq || []).forEach((p) => { if (!expected.includes(p)) errors.push(`${id}: unknown prereq ${p}`); });
  let hasInteractive = false;
  (m.sections || []).forEach((s, i) => {
    stats.sections++;
    checkL(s.title, `${id}.sections[${i}].title`);
    (s.blocks || []).forEach((b, j) => {
      stats.blocks++;
      // launch は別ページのアプリへ渡す入口。埋め込みではないが、手を動かす先があるので数える
      if (b.type === 'widget' || b.type === 'check' || b.type === 'launch') { hasInteractive = true; if (b.type === 'widget') stats.widgets++; }
      checkBlock(b, `${id}.s${i}.b${j}`);
    });
  });
  if (!hasInteractive) warns.push(`${id}: no interactive element`);
  if (!m.quiz || m.quiz.length < 5) warns.push(`${id}: fewer than 5 quiz questions`);
  (m.quiz || []).forEach((q, i) => {
    stats.quiz++;
    walk(q, `${id}.quiz[${i}]`);
    if (!(q.answer >= 0 && q.answer < (q.choices || []).length)) errors.push(`${id}.quiz[${i}]: answer out of range`);
  });
  stats.chars += JSON.stringify(m).length;
}
walk(ZA.glossary, 'glossary');
walk(ZA.formulas, 'formulas');
walk(ZA.placement, 'placement');
const gids = new Set();
ZA.glossary.forEach((g) => { if (gids.has(g.id)) errors.push(`glossary duplicate ${g.id}`); gids.add(g.id); if (g.module && !expected.includes(g.module)) warns.push(`glossary ${g.id}: module ${g.module} not found`); });

/* ウィジェットの原文検査。
 * モジュールと違い widgets-*.js は evaluate されないので、上の walk() が届かない。
 * 生のソースから S(ja, en, id) の第1引数とコメントを伏せ、残りに日本語が出れば
 * それは3つ組を通らずに全言語へ流れる文字列である。単位や区切り記号を日本語のまま
 * 直書きすると、英語・インドネシア語の画面にそのまま出てしまう。
 * 行単位で伏せると、複数行にまたがる ja の文字列を全部拾って鳴りすぎる。
 * 引数の切れ目まで読んで伏せるのはそのため。 */
const JP = /[\u3040-\u309f\u30a0-\u30ff\u4e00-\u9fff\u3001\u3002\uff08\uff09\uff1a\uff0f\u30fb\uff0b\uff1d\u3000]/;
function maskJaSlots(src) {
  const out = src.split('');
  const blank = (from, to) => { for (let k = from; k < to; k++) if (out[k] !== '\n') out[k] = ' '; };
  let i = 0;
  while (i < src.length) {
    const c = src[i];
    // コメントと文字列を読み飛ばしつつ、S( を見つけたら第1引数を伏せる
    if (c === '/' && src[i + 1] === '/') { const e = src.indexOf('\n', i); blank(i, e < 0 ? src.length : e); i = e < 0 ? src.length : e; continue; }
    if (c === '/' && src[i + 1] === '*') { const e = src.indexOf('*/', i); blank(i, e < 0 ? src.length : e + 2); i = e < 0 ? src.length : e + 2; continue; }
    if (c === "'" || c === '"' || c === '`') { i = skipString(src, i); continue; }
    // 正規表現リテラル。区切り文字クラス /[\s,;、，]+/ の読点は表示文字ではない。
    // 直前の空白を飛ばした先が値の終わり（識別子・数字・閉じ括弧）なら、それは除算である。
    // 空白1文字だけを見て判断すると `(val / max * 100)` を正規表現と読み、
    // 同じ行の後ろにある `</div>` の `/` まで飲み込んで引用符の対応が崩れる。
    if (c === '/') {
      let p = i - 1;
      while (p >= 0 && (src[p] === ' ' || src[p] === '\t')) p--;
      const prev = p >= 0 ? src[p] : '(';
      if (!/[A-Za-z0-9_$)\]]/.test(prev)) { const e = skipRegex(src, i); if (e > i) { blank(i, e); i = e; continue; } }
    }
    // S(ja, …) の第1引数と、{ ja: …, en: …, id: … } の ja の値を伏せる。
    const isS = c === 'S' && src[i + 1] === '(' && !/[A-Za-z0-9_$.]/.test(src[i - 1] || ' ');
    const isJa = c === 'j' && src.slice(i, i + 3) === 'ja:' && !/[A-Za-z0-9_$.]/.test(src[i - 1] || ' ');
    if (isS || isJa) {
      const from = i + (isS ? 2 : 3);
      const j = endOfArg(src, from);
      blank(from, j);
      i = j;
      continue;
    }
    i++;
  }
  return out.join('');
}
function skipString(src, i) {
  const q = src[i];
  let j = i + 1;
  while (j < src.length) {
    if (src[j] === '\\') { j += 2; continue; }
    if (src[j] === q) return j + 1;
    j++;
  }
  return src.length;
}
// 正規表現リテラルの末尾。改行を跨いだら正規表現ではなかったと見て諦める。
function skipRegex(src, i) {
  let j = i + 1, cls = false;
  while (j < src.length) {
    const d = src[j];
    if (d === '\n') return i;
    if (d === '\\') { j += 2; continue; }
    if (d === '[') cls = true;
    else if (d === ']') cls = false;
    else if (d === '/' && !cls) return j + 1;
    j++;
  }
  return i;
}
// 引数1つ分の終わり。入れ子と文字列を数えながら、同じ深さのコンマか閉じ括弧まで進む。
function endOfArg(src, from) {
  let j = from, depth = 0;
  while (j < src.length) {
    const d = src[j];
    if (d === "'" || d === '"' || d === '`') { j = skipString(src, j); continue; }
    if ('([{'.indexOf(d) >= 0) depth++;
    else if (')]}'.indexOf(d) >= 0) { if (depth === 0) return j; depth--; }
    else if (d === ',' && depth === 0) return j;
    j++;
  }
  return src.length;
}
for (const wf of TRIPLE_FILES) {
  const src = fs.readFileSync(path.join(root, wf), 'utf8');
  maskJaSlots(src).split(/\r?\n/).forEach((line, i) => {
    if (JP.test(line)) errors.push(`${wf}:${i + 1}: Japanese text outside the ja slot of S()`);
  });
  if (/juta yen/.test(src)) errors.push(`${wf}: "juta yen" for 10,000 yen (juta is 10^6) — write the yen amount`);
  if (/man-yen/.test(src)) errors.push(`${wf}: "man-yen" is not English — write the yen amount`);
}

console.log(`modules ${stats.modules}/${expected.length}, sections ${stats.sections}, blocks ${stats.blocks}, widgets ${stats.widgets}, quiz ${stats.quiz}, glossary ${ZA.glossary.length}, ~${Math.round(stats.chars / 1024)} KB of module data`);
console.log(`widgets available: ${[...WIDGETS].length}, diagrams available: ${[...DIAGRAMS].length}`);
warns.forEach((w) => console.log('WARN  ' + w));
errors.forEach((e) => console.log('ERROR ' + e));
console.log(errors.length ? `\n${errors.length} error(s)` : '\nOK');
process.exit(errors.length ? 1 : 0);
