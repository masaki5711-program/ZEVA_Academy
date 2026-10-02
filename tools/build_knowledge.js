#!/usr/bin/env node
/* Build content/knowledge-{ja,en,id}.json — the retrieval corpus for the "Ask ZEVA" chat.
 * Every module section, module overview, quiz, glossary term and formula becomes a chunk in ja / en / id.
 * The chat searches these chunks in the browser and sends only the best matches to Gemini,
 * so answers stay grounded in the published learning material.
 * Usage: node tools/build_knowledge.js   (run after editing content/, then commit the JSON)
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const scripts = [...html.matchAll(/<script src="([^"]+)"/g)].map((m) => m[1])
  .filter((s) => s.startsWith('content/') || s === 'js/core.js' || s === 'js/i18n.js');

const sandbox = { console, window: {}, localStorage: { getItem: () => null, setItem: () => {} }, navigator: { language: 'ja' } };
sandbox.window = sandbox;
vm.createContext(sandbox);
for (const s of scripts) vm.runInContext(fs.readFileSync(path.join(root, s), 'utf8'), sandbox, { filename: s });
const ZA = sandbox.ZA;
const LANGS = ['ja', 'en', 'id'];
const MAX = 1400; // characters per chunk

const isL = (v) => v && typeof v === 'object' && !Array.isArray(v) && typeof v.ja === 'string';

function clean(s, lang) {
  return String(s)
    .replace(/\[\[([a-z0-9-]+)\|([^\]]+)\]\]/g, '$2')
    .replace(/\[\[([a-z0-9-]+)\]\]/g, (_, id) => {
      const g = ZA.glossaryById[id];
      return g ? (g.term[lang] || g.term.en || id) : id;
    })
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/\*\*|==|`/g, '')
    .replace(/[ \t]+/g, ' ')
    .trim();
}

// Collect every localized string under a node, in document order.
function texts(node, lang, out) {
  out = out || [];
  if (node == null) return out;
  if (isL(node)) { const v = node[lang] || node.en || node.ja; if (v) out.push(clean(v, lang)); return out; }
  if (Array.isArray(node)) { node.forEach((x) => texts(x, lang, out)); return out; }
  if (typeof node === 'object') {
    for (const k of Object.keys(node)) {
      if (k === 'answer' || k === 'tone' || k === 'icon' || k === 'name' || k === 'type' || k === 'kind' || k === 'id' || k === 'bin') continue;
      texts(node[k], lang, out);
    }
  }
  return out;
}

function split(text) {
  if (text.length <= MAX) return [text];
  const parts = [];
  const lines = text.split('\n');
  let buf = '';
  for (const ln of lines) {
    if (buf && (buf.length + ln.length + 1) > MAX) { parts.push(buf); buf = buf.slice(-150) + '\n'; }
    buf += (buf ? '\n' : '') + ln;
  }
  if (buf.trim()) parts.push(buf);
  return parts;
}

const out = { built: new Date().toISOString(), ja: [], en: [], id: [] };
const trackName = (id, lang) => { const tr = ZA.tracks.find((x) => x.id === id); return tr ? (tr.name[lang] || tr.name.en) : id; };

for (const lang of LANGS) {
  const push = (c) => split(c.x).forEach((x, i, arr) => out[lang].push({ ...c, x, p: arr.length > 1 ? i + 1 : undefined }));
  const mods = Object.values(ZA.modules).sort((a, b) => a.id.localeCompare(b.id));
  for (const m of mods) {
    const mt = clean(m.title[lang], lang);
    const head = `${trackName(m.track, lang)} › ${mt}`;
    push({ m: m.id, t: head, u: `#/m/${m.id}`,
      x: texts([m.title, m.summary, m.objectives, m.keyPoints], lang).join('\n') });
    for (const sec of m.sections || []) {
      push({ m: m.id, s: sec.id, t: `${head} › ${clean(sec.title[lang], lang)}`, u: `#/m/${m.id}/${sec.id}`,
        x: texts([sec.title, sec.blocks], lang).join('\n') });
    }
    if (m.quiz && m.quiz.length) {
      push({ m: m.id, s: 'quiz', t: `${head} › Quiz`, u: `#/m/${m.id}/quiz`,
        x: m.quiz.map((q) => {
          const ans = q.choices && q.choices[q.answer] ? clean(q.choices[q.answer][lang], lang) : '';
          return `Q: ${clean(q.q[lang], lang)}\nA: ${ans}\n${q.explain ? clean(q.explain[lang], lang) : ''}`;
        }).join('\n') });
    }
  }
  for (const g of ZA.glossary) {
    out[lang].push({ m: g.module, g: g.id, t: `${lang === 'ja' ? '用語集' : lang === 'id' ? 'Glosarium' : 'Glossary'} › ${clean(g.term[lang], lang)}`,
      u: `#/glossary/${g.id}`, x: `${clean(g.term[lang], lang)}${g.abbr ? ' (' + g.abbr + ')' : ''}: ${clean(g.def[lang], lang)}` });
  }
  for (const grp of ZA.formulas) {
    out[lang].push({ t: `${lang === 'ja' ? '公式集' : lang === 'id' ? 'Rumus' : 'Formulas'} › ${clean(grp.group[lang], lang)}`, u: '#/formulas',
      x: grp.items.map((f) => `${clean(f.name[lang], lang)}: ${clean(f.expr[lang], lang)}${f.note ? ' — ' + clean(f.note[lang], lang) : ''}`).join('\n') });
  }
}

// one file per language, loaded only when the chat opens; drop undefined keys to keep them small
for (const lang of LANGS) {
  const file = path.join(root, 'content', `knowledge-${lang}.json`);
  fs.writeFileSync(file, JSON.stringify({ built: out.built, chunks: out[lang] }, (k, v) => (v === undefined ? undefined : v)));
  console.log(`knowledge-${lang}.json: ${out[lang].length} chunks, ${Math.round(fs.statSync(file).size / 1024)} KB`);
}