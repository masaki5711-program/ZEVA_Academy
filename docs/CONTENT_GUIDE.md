# ZEVA Academy — Content Authoring Guide

This site is a static, build-free learning site (open `index.html` directly or host on GitHub Pages).
All learning content lives in `content/` as plain JavaScript files that call registration functions.
The engine (`js/`) renders them. **Do not edit `js/` or `css/` from a content task.**

---

## 0. Public-release rules (MUST)

Run `node tools/validate.js` before every commit. Put organisation-specific terms that must never appear in `tools/forbidden.local.txt` (one regex per line; the file is git-ignored).

This repository will be public on GitHub. Never include:

- Company names, plant names, subsidiary names, brand names, customer or consultant names
- Country-specific plant stories that identify a site. Use generic wording: "a manual-assembly-heavy overseas plant", "a plant where people do most of the work"
- Real line names/IDs, real production data, real product names, part numbers, real KPIs of a real site
- Internal document names/file names, internal tool file names, video file names, template file names
- Internal AI / digitalisation strategy or roadmaps
- Personal names

All numeric examples must be clearly **illustrative** (round, invented numbers).
ZEVA theory itself (principles, formulas, triage, GPC, etc.) is the content to be taught and is OK to publish.
Standard IE / QC knowledge (textbook-level) is OK.

Source of truth for ZEVA theory = ZEVA Specification v23.1.
Where older material conflicts with v23.1, **v23.1 wins**. Notably:
- V.Score = σ / μ (coefficient of variation of work time). ZEVA GPC-H interpretation: < 0.1 excellent, 0.1–0.2 good, 0.2–0.3 needs improvement, > 0.3 problem.
- 4-layer structure (theoretical value / Hybrid Triage / GPC control / PDCA-S + 7 factors + XY thinking)
- Foundation (standardization) + 3 principles (① variation countermeasure ② theoretical-value thinking ③ PDCA+S)
- 7 variation factors: Man, Machine, Material, Method, Measurement, Management, Environment
- OEE belongs to GPC-M metrics. GPC-H metrics = V.Score, CT achievement rate.
- Root logic (sec 1.5) + Shewhart's principle + 3 kinds of variation + precision & accuracy + virtuous cycle starts from the foundation.

---

## 1. Languages

Every human-readable string is a **localized object**:

```js
{ ja: '日本語', en: 'English', id: 'Bahasa Indonesia' }
```

- `ja` = Japanese (primary, natural, polite である/です調 mixed is fine — use です・ます for body text)
- `en` = English (natural, not word-for-word)
- `id` = Bahasa Indonesia (natural, standard factory vocabulary; keep acronyms like OEE, CT, TT, GPC)
- All three are required for every string. Keep meaning aligned across languages.
- Lists that differ in length per language are NOT allowed; every list item is its own localized object.

We call such an object `L` below.

### Inline markup inside L strings

| Markup | Result |
|---|---|
| `**text**` | bold |
| `==text==` | highlighted (marker) |
| `` `text` `` | inline code / formula token |
| `[[term-id]]` | glossary link showing the localized term name (id must exist in `content/glossary.js`) |
| `[[term-id\|custom label]]` | glossary link with custom label (label is not translated; avoid, prefer plain form) |
| `<sub>` `<sup>` `<br>` | allowed HTML |

---

## 2. Module file

One file per module: `content/modules/<module-id>.js`

```js
ZA.addModule({
  id: 'ie-02',                 // file name without .js
  track: 'ie',                 // 'ie' | 'z1' | 'z2' | 'z3'
  order: 2,                    // order within track
  minutes: 20,                 // estimated study time
  icon: '⏱',                   // one emoji
  level: 1,                    // difficulty 1..3 (display only)
  prereq: ['ie-01'],           // recommended previous modules (not enforced)
  title:   L,
  summary: L,                  // 1-2 sentences for cards
  objectives: [L, L, L],       // "After this module you can ..."
  sections: [
    { id: 'tt', title: L, blocks: [ /* blocks, see §3 */ ] },
    ...
  ],
  keyPoints: [L, L, L],        // summary at end (3-5)
  quiz: [                      // 5-8 questions, pass = 80%
    { q: L, choices: [L, L, L, L], answer: 0, explain: L },
  ],
});
```

Aim for **4–7 sections** per module and substantial explanations (this is a "complete explanation" site).
Each module should contain **at least one interactive element** (widget, check, sort-game, scenario).

---

## 3. Block types

### Text
```js
{ type: 'p', text: L }
{ type: 'h', text: L }                                   // sub-heading inside a section
{ type: 'list', items: [L, L], ordered: false }
{ type: 'callout', kind: 'key'|'note'|'warn'|'zeva'|'example'|'tip', title: L, text: L }
{ type: 'quote', text: L, cite: L }                      // cite optional
```
`kind: 'zeva'` = "ZEVA connection" box — use in IE modules to link IE concepts to ZEVA.

### Formula
```js
{ type: 'formula', expr: L, where: [ { sym: 'TT', text: L }, ... ], note: L }
```
`expr` may use `<sub>`, `×`, `÷`, `√`, `σ`, `μ`, `Σ`. Example: `{ja:'TT = 稼働時間 ÷ 必要生産数', en:'TT = Available time ÷ Required quantity', id:'TT = Waktu kerja tersedia ÷ Jumlah produksi yang dibutuhkan'}`.
`where` and `note` optional.

### Worked example
```js
{ type: 'example', title: L, steps: [L, L, L], result: L }
```

### Table
```js
{ type: 'table', head: [L, L, L], rows: [ [L, L, L], ... ], caption: L }
```
Cells may also be plain strings when language-neutral (numbers, symbols like '○', 'OEE').

### Cards (grid of concept cards)
```js
{ type: 'cards', cols: 2|3|4, items: [ { icon: '🧑', title: L, text: L, tone: 'navy'|'blue'|'green'|'amber'|'red'|'gray' } ] }
```

### Compare (side-by-side, e.g. NG vs OK, old vs new)
```js
{ type: 'compare', left: { title: L, tone: 'red', items: [L, L] }, right: { title: L, tone: 'green', items: [L, L] } }
```

### Flow (horizontal / vertical process arrows)
```js
{ type: 'flow', dir: 'h'|'v', nodes: [ { title: L, text: L, tone: 'blue' } ] }
```

### Cycle (nodes placed on a ring, arrows clockwise)
```js
{ type: 'cycle', center: L, nodes: [ { title: L, text: L, tone: 'green' } ] }   // 3..6 nodes
```

### Chain (numbered logical chain ①→②→③ with a conclusion)
```js
{ type: 'chain', items: [L, L, L, L], conclusion: L }
```

### Layers (stacked layers, top to bottom)
```js
{ type: 'layers', items: [ { label: L, title: L, text: L, tone: 'navy' } ] }
```

### Built-in diagram (engine-drawn SVG/HTML, localized by the engine)
```js
{ type: 'diagram', name: '<name>', caption: L }
```
Available names:
| name | shows |
|---|---|
| `zeva-house` | Foundation (standardization) + 3 pillars (principles ①②③) + roof "Zero Variation → theoretical value" |
| `four-layers` | ZEVA 4-layer triangle (theoretical value / Triage / GPC / PDCA-S+7 factors+XY) |
| `root-logic` | action ← data ← reliable data ← low variation chain, with virtuous & vicious cycles |
| `precision-accuracy` | 4 target boards: precise/accurate combinations |
| `value-boundary` | Value / Semi-value / Non-value with their boundaries (Design / Process / Management) and theoretical values |
| `xy-model` | X (7 factors, inputs) → Process → Y (OEE, time, quality) |
| `gpc-band` | GPC_min / Target / GPC_max band with data points, "range control" |
| `triage-flow` | Step1..4 triage flowchart → Quick GPC / Deep GPC |
| `cycle-map` | Issue → Triage → H-T-C-A or DMAIC → PDCA-S, with 3-fail escalation |
| `four-boxes` | Theoretical-value 4 boxes ①current value ②current way ③new way ④target value with arrows |
| `oee-tree` | Loading time → operating time → net operating → valuable operating time, with 6 big losses |
| `process-symbols` | IE process chart symbols (operation, transport, delay, storage, inspection) |
| `learning-map` | Site learning path (IE → Z1 → Z2 → Z3) |
| `normal-curve` | Normal distribution with ±1σ/±2σ/±3σ = 68/95/99.7 % |

### Inline check (one question, instant feedback, not scored)
```js
{ type: 'check', q: L, choices: [L, L, L], answer: 1, explain: L }
```

### Interactive widget
```js
{ type: 'widget', name: '<name>', props: { ... } }
```
Widgets (props all optional unless marked):

| name | purpose | props |
|---|---|---|
| `tt-calc` | Takt time calculator (shift time, breaks, demand → TT; compare CT) | `{ shiftMin: 480, breakMin: 60, demand: 400, ct: 55 }` |
| `stopwatch-sim` | Time-study simulator: observe a virtual worker N cycles, see min/mean/σ/V.Score | `{ baseSec: 30, noise: 0.15, cycles: 10 }` |
| `std-time-calc` | Standard time = observed × rating × (1 + allowance) | `{ observed: 50, rating: 110, allowance: 12 }` |
| `work-sampling` | Work-sampling simulator (random observations → estimated ratio ± error) | `{ trueRatio: 0.7 }` |
| `line-balance` | Editable process CTs + TT → neck CT, line balance efficiency, required workers, bar chart | `{ tt: 60, cts: [52, 58, 45, 60, 41] }` |
| `oee-calc` | OEE calculator with loss breakdown | `{ planned: 480, downtime: 45, idealCt: 1.0, output: 380, good: 370 }` |
| `stats-lab` | Enter/generate data → mean, range, σ, CV, histogram | `{ data: [..] }` |
| `normal-explorer` | Move μ and σ, see curve & % inside limits | `{}` |
| `control-chart` | X̄-R chart simulator; inject special causes; see out-of-control signals; Shewhart message | `{}` |
| `cpk-calc` | μ, σ, LSL, USL sliders → Cp, Cpk, expected defect ppm, curve | `{ lsl: 9.5, usl: 10.5, mu: 10.1, sigma: 0.12 }` |
| `vscore-calc` | Paste/enter CT samples (or compare two operators) → μ, σ, V.Score with ZEVA judgment | `{ a: [..], b: [..] }` |
| `data-trust` | Root-logic demo: before/after improvement with low vs high variation — can you tell it improved? | `{}` |
| `theory-gap` | Sliders for value / semi-value / non-value seconds → site & technical theoretical values, management loss, technical loss, value-work ratio | `{ value: 12, semi: 18, non: 30, techSemi: 6 }` |
| `gpc-band` | Simulate parameter vs GPC band; reduce variation / center-aim; see conformance rate | `{}` |
| `motion-laws` | 3 tabs: distance law (distance → spread), sequence law (n motions × error p → success %), constraint law (free vs guided) | `{}` |
| `triage-wizard` | 4-question triage → Quick GPC / Deep GPC with reason | `{}` |
| `htca-builder` | Fill the hypothesis template, choose N & check method, get an H-T-C-A plan card | `{}` |
| `four-boxes` | Fillable 4-box worksheet with a preset example you can reveal | `{}` |
| `sort-game` | **Generic** classification game | see below |
| `scenario` | **Generic** step-by-step decision scenario | see below |

#### `sort-game` props
```js
{
  title: L,
  bins:  [ { id: 'v', label: L, tone: 'green' }, { id: 's', label: L, tone: 'amber' }, { id: 'n', label: L, tone: 'red' } ],
  items: [ { text: L, bin: 'v', explain: L }, ... ]     // 6-12 items
}
```
#### `scenario` props
```js
{
  title: L,
  intro: L,
  steps: [
    { prompt: L, choices: [ { text: L, correct: true,  feedback: L },
                            { text: L, correct: false, feedback: L } ] },
  ],
  outro: L
}
```

---

## 4. Glossary file — `content/glossary.js`

```js
ZA.addGlossary([
  { id: 'takt-time', cat: 'ie'|'stat'|'qc'|'zeva', term: L, abbr: 'TT', def: L, module: 'ie-02' },
]);
```
`id` = lowercase-kebab. `abbr` optional. `module` = where it is taught.

## 5. Placement test — `content/placement.js`

```js
ZA.setPlacement({
  intro: L,
  questions: [ { q: L, choices: [L, L, L, L], answer: 0, topic: 'ie-02' } ],   // 12 questions
});
```
Score < 60% on IE topics → recommend IE track; otherwise ZEVA Foundations.

## 6. Formula sheet — `content/formulas.js`

```js
ZA.addFormulas([
  { group: L, items: [ { name: L, expr: L, note: L, module: 'ie-02' } ] },
]);
```

---

## 7. Module catalogue (fixed IDs)

### Track `ie` — IE Fundamentals (基礎IE)
| id | title (ja) | must cover | suggested widgets/diagrams |
|---|---|---|---|
| ie-01 | 生産とIEの基礎 | IE definition & history (Taylor, Gilbreth), productivity, QCDS(+E), 4M, value added, 3M (muda/muri/mura), 7 wastes, why "mura" leads to ZEVA | sort-game (7 wastes) |
| ie-02 | 時間の基本：TT・CT・リードタイム | available time, TT, CT, lead time, capacity, TT vs CT relations, pitch | tt-calc |
| ie-03 | 時間研究と標準時間 | stopwatch methods (continuous/repetitive), element breakdown, number of observations, taking the minimum vs mean, rating, allowances, standard time, PTS (MTM/WF) intro | stopwatch-sim, std-time-calc |
| ie-04 | 動作研究と動作経済の原則 | therbligs (value/aux/non-value/waste groups), principles of motion economy (body, workplace, tools), normal/maximum work area, golden zone | sort-game (therbligs) |
| ie-05 | 工程分析とワークサンプリング | process chart symbols, product/worker process analysis, flow diagram, man-machine chart, multi-activity, work sampling (formula for n, error) | diagram process-symbols, work-sampling |
| ie-06 | ラインバランス | neck process, line balance efficiency = ΣCT ÷ (neck CT × processes), required workers = ΣCT ÷ TT, balance loss, yamazumi, rebalancing tactics | line-balance |
| ie-07 | 設備総合効率 OEE | loading/operating time, availability, performance, quality rate, 6 big losses, OEE ≥ 85% world-class, OEE vs OLE, OEE is a result (Y) | oee-calc, diagram oee-tree |
| ie-08 | 統計の基礎 | population/sample, mean, median, range, variance, σ (n vs n-1), CV, histogram shapes, normal distribution, 68-95-99.7 | stats-lab, normal-explorer, diagram normal-curve |
| ie-09 | 管理図と工程能力 | common vs special cause, Shewhart, X̄-R chart (A2, D3, D4 constants for n=5), rules (Western Electric basics), spec limit ≠ control limit, Cp, Cpk, 1.33 / 1.67, stable first | control-chart, cpk-calc |
| ie-10 | 改善の基本ツール | 5S, 3定 (fixed position/item/quantity), standard work 3 elements (TT, sequence, standard WIP), ECRS, PDCA, 5-Why, fishbone, Pareto, QC 7 tools, poka-yoke | sort-game (ECRS) |

### Track `z1` — ZEVA Foundations (ZEVA基礎)
| id | title (ja) | must cover |
|---|---|---|
| z1-01 | ZEVAとは何か | formal definition, "production system not a tool", 4 components (theoretical value/GPC/Triage/digitalisation), birth background (generic: the gap to the theoretical value was hard to evaluate where variation was large; average looks OK but variation makes evaluation impossible), definition of "Zero" (Variation Under Control → Center-Aiming), average vs variation mindset shift, where ZEVA fits (manual-heavy, human+machine, automated also OK), comparison with TPS & Six Sigma | diagram four-layers, check, scenario or data-trust teaser |
| z1-02 | 根底ロジック | 5-step chain, Shewhart principle ("A process not in statistical control has no definable capability"), 3 kinds of variation (object / measurement / intentional DOE), data reliability = precision + accuracy, virtuous/vicious cycle, start point = foundation (no deadlock), double reason to eliminate variation, mapping to components | diagram root-logic, diagram precision-accuracy, widget data-trust, sort-game (3 kinds of variation) |
| z1-03 | 原則体系：土台＋3原則 | foundation (5S・3定, 4M standards, standard work, reproducibility), principles ①②③ with their questions (what to focus / where to aim / how to sustain), cycle structure, "no improvement without standards", mapping to 4 layers & roadmap STEP1-5 | diagram zeva-house, cycle, table |
| z1-04 | 理論値 | theoretical-value idea, analytic vs design approach (absolute-value thinking), value/semi/non-value with boundary (Design/Process/Management), moving boundaries = improvement (examples), site vs technical theoretical value, management loss vs technical loss, value-work ratio (typical 10-30%, target 50-60%+) | diagram value-boundary, sort-game (classification), theory-gap |
| z1-05 | 7つのバラツキ要因とXY思考 | 7 factors with GPC-M/H mapping & control methods, examples per factor, XY thinking (OEE/time/quality are Y), controlling X raises data reliability, "Don'ts" = manipulating Y directly (NG: defects high→stricter inspection; CT slow→rush workers; OEE low→overtime; OK versions) | diagram xy-model, sort-game (factor), sort-game or compare (NG/OK) |

### Track `z2` — ZEVA Practice (ZEVA実践)
| id | title (ja) | must cover |
|---|---|---|
| z2-01 | GPC制御理論 | GPC = Good Process Conditions, GPC band (Target, GPC_min, GPC_max), range control, physical basis (experimentally verified, not statistical control limits) — difference from spec limits & control limits, Stage 1 in-band / Stage 2 center-aiming | diagram gpc-band, widget gpc-band |
| z2-02 | GPC-M / GPC-H 二元論と評価指標 | why dual structure, GPC-M (physical experiment → band, recording, band conformance, OEE, Cpk, X̄-R), GPC-H (ECRS & motion stability, 4M standard, CT measurement, V.Score, CT achievement), metrics tables & targets, V.Score interpretation scale, stability precondition | vscore-calc, sort-game (M or H) |
| z2-03 | 動作安定の原理 | "every motion is a source of variation", law 1 distance/displacement, law 2 sequence accumulation (probability intuition (1-p)^n), law 3 constraint & guide, link to motion economy & poka-yoke, how to apply on a workstation (checklist) | motion-laws |
| z2-04 | ハイブリッド・トリアージ | why triage (over-quality, lack of power, speed contradiction), medical triage analogy, Quick vs Deep table, 4 criteria (incl. data reliability note), decision logic (AND/OR), 4-step flowchart, gray zone rule | diagram triage-flow, triage-wizard, scenario |
| z2-05 | Quick GPC：H-T-C-A | purpose, 4 steps in detail, hypothesis template, small N, check by digital level, action: temporary standard (≤30 days, single line, rollback), knowledge base (photo + comment), examples, escalation criteria (3 failed cycles, no hypotheses, recurrence, bigger impact), parallel with Deep | htca-builder, scenario |
| z2-06 | PDCA-Sと3つのサイクル | 3 cycles role table (H-T-C-A / DMAIC / PDCA-S), serial connection, common confusions (4), PDCA-S steps after Quick vs after Deep, GPC-M & GPC-H daily operation protocols (measure/monitor/record/improve, abnormality response, periodic review), "no S = do-and-forget" | diagram cycle-map, sort-game (which cycle) |

### Track `z3` — ZEVA Advanced (ZEVA応用)
| id | title (ja) | must cover |
|---|---|---|
| z3-01 | 理論値ベースの改善手法：4つの箱とECRS | 4 boxes (current value / current way / new way / target value — conclusions & grounds, thinking loop), loss structure chart, CT analysis, value-work analysis via video, ECRS (E first), shortest/simultaneous/fastest, gold/silver/bronze zone | diagram four-boxes, four-boxes widget, sort-game (ECRS) |
| z3-02 | Deep GPC：DMAIC | each phase in detail, Y & X definition, fishbone, scope, gap to theoretical value, MSA (repeatability, reproducibility, bias, calibration; %GRR rule-of-thumb <10% good, 10-30% conditional, >30% not acceptable), sampling plan, regression/ANOVA/correlation/hypothesis test, 5-why + statistics, DOE, pilot run, control plan & X̄-R, hand-over to PDCA-S, running Quick trials in parallel | scenario (DMAIC project), check |
| z3-03 | 評価指標体系と安定状態 | metrics as visualisation of data reliability, stability first (X̄-R then Cpk), GPC-M metrics & targets, GPC-H metrics & targets, OEE × V.Score matrix reading (illustrative), KPI trend monitoring, pitfalls (evaluating averages only, Cpk on unstable process) | control-chart, cpk-calc, scenario |
| z3-04 | デジタル化の段階的実装とZEVAシステム | digitalisation = accelerator not prerequisite, Level 1/2/3 table, activities by level table, migration criteria, "digital level ≠ improvement quality", system requirements (intelligent triage, knowledge DB, agile standard update, analysis support), AI as a weapon to absorb/visualise variation (generic: AI visual inspection, video motion analysis, skeleton motion analysis) — ZEVA stays at the centre | sort-game (level), cards |
| z3-05 | 導入プロセスと成功要因 | 6 implementation steps with duration & digital level, points (gap priority, small start, quick win, Digitalisation later), success factors, barriers & countermeasures, organisational culture (shared understanding, success experiences, top commitment, promotion structure), misconception "standardization kills creativity", checklists (B.1–B.6) as interactive checklist via sort-game or list | flow, scenario |
| z3-06 | 総合ケーススタディ | 4 illustrative cases walked through (Quick GPC-H, Quick GPC-M, Deep GPC-M, Quick→Deep escalation) each as a `scenario` widget with decisions at triage, hypothesis, check, action/escalation, PDCA-S hand-over; final reflection | scenario ×4 |
| z3-07 | 事例：射出成形（設備中心） | One machine walked through standardise → collect data → four boxes → plan → act. Quality (3.2% warp) and efficiency (OEE 64.8%) trace back to one cause: mould temperature at start-up. Initial standard table, X-and-Y data table, four boxes with an evidence column, H-T-C-A plan, before/after results. OEE 64.8→77.7%, defects 3.2→0.4%, CT 53.4→50.3 s, V.Score 0.106→0.023. Mirrors spec v29 §21.5 | oee-calc (seeded with the "before" figures) |
| z3-08 | 事例：組立ライン（人中心） | Five-station manual line read across Q, C and D. The slow cycles cluster around searching for a part, not around a person; the solder defects cluster in one element. Takt 45 s, neck 57 s → the reference time is the neck time (§16.5). Line balance 69.5→87.1%, V.Score 0.119→0.023 (population σ), 419→580 a day with no extra people. Mirrors spec v29 §21.6 | vscore-calc (before/after series) |
| z3-09 | 事例：工程間の流れ（リードタイム） | Six processes; net processing is 1.7% of the lead time. Lead time = WIP ÷ daily output (1,710 ÷ 180 = 9.5 days). The 3.6-day wait before painting traces to a 45-minute colour change that dictates a lot of 600; splitting internal from external setup makes it 12 minutes. WIP ceilings lowered one place at a time. LT 9.5→3.4 days with output unchanged. Mirrors spec v29 §21.7 | four-boxes |
| z3-10 | 事例：塗装工程（Deep GPC） | Three Quick GPC tries failed, so the case escalates to Deep GPC. Measure starts with MSA: inspectors agreed on only 46/60 = 77% of parts, so the rate itself could not be trusted; after retraining, 58/60 = 97%. Analyze stratifies by filter age × humidity and finds an interaction — addition predicts 4.4%, the actual both-bad cell is 10.0%, so 5.6 points appear only when the two coincide. DOE then cuts inside the band (filter within 7 days, humidity 55-65%). 4.2→0.5%, respray 625→75 min/day. Mirrors spec v29 §21.8 | four-boxes, control-chart |
| z3-11 | 演習：木工ラインを立て直す | The lesson around the standalone simulation at `game/`. Sections: the line and its resources, a `launch` block into the game, how the screens map to the DMAIC steps, and a debrief (marked "read after playing") of the three planted shapes: correlation mistaken for cause, interaction, and tightening past the point where it pays. Numbers quoted are line 甲 (Alpha): 14.3% as-is, 5.6% moisture alone, 6.9% second factors alone, 2.0% both; room temperature 8.0% vs 15.9% without being causal; the 2×2 of kiln by press 3.6/5.6/10.2/14.3 giving a 2.1 pt interaction; 71→89 man-yen a month past the plateau | launch → game/ |

## 別ページのゲームアプリ（game/）

`game/` は ZEVA Academy のエンジンには載せず、独立したページとして動くシミュレーションゲームである。
ホームの「演習モード」から入る。ファイル構成は末尾の「ゲームのファイル構成」を見る。

| ファイル | 中身 |
|---|---|
| `game/index.html` | 殻。`../css/style.css` と `../js/core.js` を借りて、配色・言語・保存をサイトと共有する |
| `game/scenarios.js` | 6本のラインの係数と正解。道具は同じで答えだけが違う |
| `game/game.css` | 盤面まわりの見た目 |

### 条件は調査で現れる（2026-09-22）

**条件画面に隠れモデルの「見込み」は出さない。** 出すのは、その条件で実際に流したロットの実績（`triedStats`）と、
最初の条件で取れたロット（`baseStats`）だけ。試していない条件は「未検証」。
以前は `simRows(draft)` の見込み効果金額をそのまま出していたので、スライダーを触るだけで原因が読めた
（甲は在炉時間だけ 1,638万円、乙は刃だけ 822万円と一本だけ突出）。調査ゼロでも80点(A)に届いていた。

最初から見える手は「受入で含水率をはじく」「室温を管理する」の素朴な2つだけ。残りは `KNOBS0[].from` を鍵に、
根拠を手にしたときに `G.unlock(k)` で現れ、理由（`UNLOCK_WHY`、シナリオは `words['unlock.<k>']` で上書き可）が手帳に書かれる。

| 手 | 鍵 |
|---|---|
| 在炉時間 | 現場を歩く／聞き取り／含水率の実測が終わる |
| 刃の交換周期 | 聞き取り／刃の記録が終わる |
| 乾燥の温度（幅） | 含水率を測ったうえでヒストグラムを開く |
| 入荷ロットの選別 | 含水率と日次記録があり、時間ごとタブを開く |
| 朝の暖機 | 日次記録があり、時間ごとタブを開く |
| 圧締時間・塗布量・番手 | 日次記録があり、パレートを開く |
| 刃の途中研ぎ | 刃の記録があり、散布図を開く |
| 悪いほうの機械を整備する（`machFix`、`sc.mach` のラインだけ） | ロット属性があり、層別で機械の差が3σを越える |

つまみの注記（「150で頭打ち」「両側に壁」「中心と幅」）は消した。動かして測って初めて分かる。
生産性ライン（丁）も同じ形で、`KNOBS[].need` が調査 id（段取り→撮って分ける、予熱→停止の記録、分担→時間観測、ロット→仕掛）。

`machFix` は成形甲の答え（2号機）に打てる手が無かったのを埋めたもの。`mg` で悪いほうの機械を良いほうと同じにし、費用は月6。
金額の山（`scopeBest`）は `scratchpad/bestsearch.js`（座標降下）で探し直した。**係数やつまみを触ったら回し直す。**

### 手帳（2026-09-22）

`st().notes[]` に `{dn, w, kind, text, screen, tab, ...}` を積む。`kind` は note（気づき）/ hyp（仮説、`suspect` を持つ）/
act（打った手、条件変更時に盤面が自動で書く）/ check（確かめた結果、`hypIdx` と `verdict` yes/no/open）/ sys（盤面の記録）。
sys は現場調査の見聞き、調査の開始と結果、標準作業の完成、条件の解錠理由。画面は `game/notebook.js`、品質・生産性の両方で同じ。

採点は「軸を買ったか」10点を「手帳：仮説を立てて確かめたか」10点に置き換えた。
仮説を書いてから始めた調査の割合（`surveyLog[].hypBefore`）で5点、書いた仮説を確かめた割合で5点。
原因の見立て15点は、その原因を疑う仮説が手帳に無ければ10点止まり（`hypNaming`）。
結論画面は手帳の仮説を見せてから原因を選ばせ、結果画面に「手帳をコピーする（講評用）」を置いた。
チーム対抗の講評では点数ではなくこの文章を並べる。

### 実プレイ評価で直したこと（2026-09-22、Playwright で木工甲を2回通し）

- **調査は同時に2本まで**（`WS.MAX_SURVEYS`、状態は `st().surveys[]`。旧保存の `survey` は `WS.surveys()` が配列へ移す）。
  1本ずつだった頃は学習者の順路で75日目まで条件を変えられず、改善条件で流せたのが5日だった。2本並行で48日目になった。
- **「区切りまで流す」**（`WS.daysToMilestone()`）。いちばん早く終わる調査か標準作業の完成まで日刻みで流す。標準3工程を1日ずつ15回押す手数を消す。
- **p管理図の限界は移動範囲から**（XmR の考え方。`sgMR = mean|Δ| / 1.128`、二項のσと大きいほう）。二項のσだけだと群間差で常に「管理外」になっていた。注記に二項のσと並びのσを両方出す。
- 結果画面の効果金額は「答え合わせの試算」と明記し、条件画面の「実績から」と違う理由を書いた。
- 結論画面から手帳へ飛べる。手帳は古い順（書き出しと同じ）。能力パラメータ「改善」は直近1週の実績。
- 丁の条件画面は、全部灰色のとき「まず停止の記録か時間観測を」と出す。
- 現場を歩くのは1日、聞き取りは2日（各1週だった）。追加コストは初期条件からの増分（初期条件で −36万円/年 と出ていた）。
- **期中の作り込みの上限は「30日目に最適条件へ着いた場合」**（`REACH_DAY`）。初日からにすると調べる順路では構造的に届かず、48日目に着いて4点だった。置き直して6点。丁も同じ置き方。
- 手帳は「自分の記入だけ／全部」を切り替えられる（既定は自分の記入だけ）。盤面の記録が26件中24件で自分の記入が埋もれていた。
- `btn()` はクラスを空白で分けて付ける。`'btn-sm btn-ghost'` のまま `classList.add` に渡して棚と手帳が描画ごと落ちていた。

### 分析室の母集団と HUD（2026-09-22）

推移・p管理図・V.Score は「いまの条件だけ／全期間」を切り替える（既定はいまの条件）。全期間のまま限界線を引くと、
自分の条件変更が「異常」に見える。HUD の不良率は週平均で色を付け、直近1日は添え書き。
能力パラメータ「改善」は「どれだけ動かしたか」ではなく「対象の不良をどれだけ減らしたか」。
「仮説」の項目を足した。

**盤面の骨。** 16週。毎週40ロットが流れ、不良率が1点ずつ記録に増える。週のσは約1.8ポイントあるので、
2週の試行では条件の良し悪しを読めない。プレイヤーは調査ポイント90と16週を配る。
調査の最中に条件を変えると、その調査は読めなくなる（止めて測る）。
季節は16週の平均が0になるよう中心化してあるので、基準の不良率は動かない。

**3本のライン。** 甲＝含水率が共通の上流条件（3つの症状すべてに効く）。
乙＝刃の摩耗が共通の上流条件（含水率は接着にしか効かない）。
丙＝共通の原因は無い（寸法は刃、接着は含水率と圧締、面質は番手）。
**見分け方は症状ごとの層別**で、日次の不良率記録を買わないと読めない。
どのラインでも室温は含水率と相関するだけの錯誤、作業者と機械番号は最初から無効果。

**チーム対抗。** タイトルでチーム名を入れ、ラインを選ぶ。結果画面に `WS-…` の結果コードが出る。
進行役はタイトルの「集計する」にコードを貼ると、ライン別の成績表になる。
別の端末で遊んだ結果も同じ方法で集まる。**比べるのは同じライン同士だけ**（ラインが違えば届きうる最良が違う）。

数値は `scratchpad/sim_week.js` と `scratchpad/scenarios.js` で検算済み。
係数を触ったら、両方を回してから本文の数字を写し直すこと。

### 木工ライン丁（生産性）

甲・乙・丙は不良率を相手にするが、丁は **日産個数とリードタイム** を相手にする。
道具も指標も入れ替わるので、画面は `game/prod.js` が持つ（`game/game.js` の `WOODSHOP_UI` を借りる）。

```
日産 ＝ 稼働時間 ÷ ネックタイム
稼働時間 ＝ 定時480分 － 段取り － 立上げロス － チョコ停
リードタイム ＝ 仕掛（5工程 × ロット） ÷ 1日の産出
```

**仕込んである形。** 見かけのネックは工程3の56秒だが、工程3が長いのは工程2からの待ちを抱えているためで、
作業を2と4へ移すと51.2秒になる。段取り45分のうち33分は外段取り化できる。立上げの予熱40分はタイマー化で消える。

**罠は順番。** 段取りを短くする前にロットを150へ落とすと、段取り回数が増えた分だけ稼働が減り、
日産は 414個 → 313個 へ**下がる**。外段取り化してから落とせば481個、リードタイムは7.25日→1.56日。
ロット120以下ではまた需要を割るので、ロットサイズにも効かなくなる点がある。

**錯誤。** 作業者ごとのサイクルタイム差は担当工程の違いがそのまま出ているだけで、人を足しても日産は増えない。

| 調査 | pt / 週 | 開く画面 |
|---|---|---|
| 工程別の時間観測 | 20 / 2 | 山積み図、ネックタイム、編成効率 |
| 停止の記録 | 15 / 2 | 稼働の内訳、OEEの三要素 |
| 段取りの中身を撮って分ける | 25 / 3 | 内段取り12分 / 外段取り33分の分解 |
| 工程間の仕掛を数える | 10 / 2 | リードタイムと、ロットサイズを振ったときの曲線 |
| 担当者と機械の記録 | 10 / 1 | 錯誤の層別 |
| 試験日を設けて条件を振る | 25 / 3 | 段取り時間 × ロットサイズ の交互作用図 |

合計105ポイントで予算は90なので、ここでも何かを捨てる。
需要は460個/日。最良の条件でも日ごとの当たり外れで平均は481の0.99倍ほどになるため、
480に置くと「最良でも届かない」盤面になる。

数値は `scratchpad/sim_prod.js` で検算済み。係数を触ったら回し直してから本文を写すこと。

### 標準化が調査段階に効く

ZEVA は 標準化 → データ取得 → 4つの箱 → 改善 の順である。ゲームでもその順序が効くようにしてある。
盤面の手として「初期標準をつくる」（10ポイント・2週）があり、買うまでは標準が無い状態で16週が進む。

**標準が無いと何が起きるか。** 作業者ごとに手順が違うぶんの係数（A 0.70 / B 1.60 / C 0.70、3人の平均は1.0）と、
週ごとの手順のぶれ（±10%）、ロットごとのぶれ（±25%）が乗る。**平均は動かない。動くのはバラツキだけ。**

| | 16週の平均 | 週のσ | 作業者で層別 |
|---|---|---|---|
| 標準化していない | 14.3% | 3.75 | **5.7pt差＝偶然では説明できない** |
| 標準化したあと | 14.3% | 2.28 | 0.5pt差＝偶然の範囲 |

揺れが大きいと3σの目安が広がり、**本物の因子が「偶然の範囲」に埋もれる**。
そして作業者に本物の差が立つ。人の問題ではなく、標準が無いというだけのこと。

**手順のばらつきは別の乱数列から引く**（`mulberry32(sc.seed + w * 7919)`）。
本筋の乱数に混ぜると、標準化の有無で材や刃の当たり外れまで変わり、同じ条件の比較にならなくなる。
おかげで、標準化した状態の数字は標準化を入れる前と完全に同じである（木工ライン甲 14.3 / 5.1 / 13.1 / 1.8）。

**標準化するとデータは持ち越せない。** `cfgKey` に標準の有無を入れてあるので、
標準化した瞬間、それ以前のロットは層別の対象から外れる。走っていた調査も無効になる。
早く標準化するほど有利で、採点も第4週までなら8点、第8週までなら5点、それ以降は2点とした。

木工ライン丁（生産性）でも同じ。標準作業が無いといちばん遅いやり方が混ざり、
**ネックタイムは実力より6%長く出て**（56.0秒 → 59.4秒）、日ごとの揺れも倍（±4.5% → ±9.0%）になる。
時間観測を買っても、標準作業が無ければ山積み図は信用できない。

### 演習モードは学習パスの外にある

`game/` は事例モジュールの中ではなく、**応用のあとの個別モード**として置く。
ホームの4ステージの下に独立したカード、ナビにも「演習モード」を出す。
z3-11 は廃止し、解説はゲームの中へ移した（`index.html` から外し、`content/modules/` からも消した）。

### スコープを決めるところから始める

プロローグのあと、**データが1つも無い状態**で次の3つができる。

| 手 | 費用 | 分かること |
|---|---|---|
| 現場を1日歩く | 1週 | 湿った材、NC前の停滞、研削の作業者の声 |
| 過去の月報を読む | 無料 | 月ごとの不良率12〜16%、冬と梅雨に高い |
| 3人に聞き取り | 5pt・1週 | 班長は人のせいだと言う。刃の交換記録は無い。在炉時間は守られていない |

そのうえで**スコープを選ぶ**。スコープは「触れる条件」と「自分の成果に数える不良」を同時に決める。

| スコープ | 触れる条件 | 数える不良 | 上限（効果金額） |
|---|---|---|---|
| ライン全体 | 在炉・圧締・刃・番手 | 3つとも | **2,436万円/年** |
| 乾燥とNC加工 | 在炉・刃 | 寸法だけ | 306万円/年（副次効果は1,374万円） |
| 接着と研削 | 圧締・番手 | 接着・面質 | 1,470万円/年 |

### 効果金額が方針で変わる

年48週 × 週1,000個 ＝ 48,000個。不良1個の損失は5,000円（材料＋手直し工数）。
**効果金額 ＝（対象にした不良の損失の減り）－ 追加コスト × 12か月。**

いちばん大事な形はこれ。**不良率をいちばん下げる条件と、金額がいちばん大きくなる条件は違う。**

| 条件 | 不良率 | 追加コスト | 効果金額 |
|---|---|---|---|
| 在炉38・圧締60・**刃はそのまま**・番手150 | 2.2% | 480万円/年 | **2,436万円/年** |
| 全部いちばん締める | 1.8% | 852万円/年 | 2,154万円/年 |

刃の交換周期を40時間から10時間に詰めると不良率は0.3ポイント下がるが、費用は年324万円かかる。
**④に置くのは不良率ではなく効果金額**、という話をここで体で覚える。
スコープを狭く切ると、実際に出ている効果が「副次効果」になって成果に数えられないことも見える。

### 日別と週別を切り替える

日次の不良率記録を買うと、ロット単位の記録が日で束ねられるようになる（1日8ロット200個）。
推移とp管理図に「週ごと / 日ごと」の切替が出る。
**日ごとに打つと管理限界は広く、週でまとめると狭い。**同じ工程でも、束ね方で「異常」の数が変わる。
推移はさらに「合計 / 症状ごと / 両方」で切り替えられる。

### 価値作業分析（木工ライン丁）

`work`（20pt・3週）を買うと、各工程のサイクルタイムが **価値作業 / 準価値作業 / 無価値作業** に割れる。

```
価値 [22, 24, 30, 23, 21]   準価値 [10, 11, 12, 10, 9]
無価値 = サイクルタイム − 価値 − 準価値  →  [6, 6, 14, 6, 6]
```

工程3だけ無価値が14秒と突出する。他は6秒。**「遅い」のではなく「待っている」。**
現場理論値（価値＋準価値）と技術理論値（価値だけ）、管理ロスと技術ロスも出る。

この分析を買うと、**「工程3の材料待ちを断つ」という手が新しく使えるようになる**（買うまで灰色）。
ネックは 56.0秒 → 43.4秒、編成効率 75.0% → 95.3%、日産は481個 → 568個まで伸びる。
買わなければこの手は最後まで見えない。**分析が手を開く**という形にしてある。

### 標準作業は「棚卸し → 未整備の工程だけ決める」

一括の標準化をやめ、工程ごとにした。5工程のうち何工程かは最初から標準がある。

| ライン | 最初から標準がある工程 |
|---|---|
| 甲 | 製材・研削（残り3工程が未整備） |
| 乙 | 乾燥・接着 |
| 丙 | 製材・NC加工 |
| 丁 | 木取り・接着 |

**どの工程に無いかは「標準作業の棚卸し」（5pt・1週）を買うまで分からない。**
買うまで「標準作業を決める」は灰色のまま。調べてはじめて手が入る。
決めるのは1工程あたり5ポイント・1週。

手順のばらつきは、整っている工程の割合で薄まる。

```
f = 1 + (作業者係数 × ロットのぶれ × 週のぶれ − 1) × (1 − 整備率)
作業者係数 A 0.55 / B 1.90 / C 0.55（3人の平均は1.0なので、不良率の水準は動かない）
```

| 整備率 | 週のσ | 作業者で層別した差 |
|---|---|---|
| 0 / 5 | 3.72 | **8.45pt（偶然では説明できない）** |
| 2 / 5（初期状態） | 2.90 | **5.53pt（偶然では説明できない）** |
| 5 / 5 | 2.28 | 0.51pt（偶然の範囲） |

初期状態でも偽の信号が立つよう係数を決めた。班長が言う「Bさんの日は数字が悪い」は、
標準がそろうまで本当に統計的に正しく見える。
木工ライン丁では、整っていないぶんネックタイムが最大6%長く出て、日ごとの揺れも最大2倍になる。

### 育成シミュレーション風の盤面

- **16週のカレンダー帯**：過去の週にその週何をしたかのアイコン（📏標準 🔬調査 🔧条件 ▶様子見）、現在地は濃紺
- **能力パラメータ**：標準・測定・分析・改善・維持 の5項目を 0〜100 とランク（E/D/C/B/A/S）で表示
- **行動カード**：コストを右上のチップに出し、押せる手を大きめのカードで並べる

パラメータは行動の結果として動く。分析は開いたタブの数、測定は買った調査のポイント、
改善は条件をどれだけ動かしたか、維持は日常点検に載せた数。**何をしていないかが一目で分かる**ようにした。

### 設定できる条件は12（品質ライン。うち machFix は成形甲だけ）

下表は2026-09-20 時点の8本。その後 暖機（warmUp 月5）・入荷ロットの選別（batchSel 月15）・途中研ぎ（sharpen 月4）・
機械の整備（machFix 月6、`sc.mach` のラインだけ）が加わり、条件は調査で現れる形になった（上の節）。

| 条件 | 範囲 | 効き方 | 費用 |
|---|---|---|---|
| 乾燥の在炉時間 | 24〜40 h | 含水率の**中心**を下げる | (h−24)×1.6 |
| 乾燥の温度 | 60〜90 ℃ | 含水率の**幅**を狭める。中心は動かない | (90−℃)×0.25 |
| 受入で含水率をはじく | 0〜100% | 12.5%超の材を止める。原因は直らないが即効 | ×12 |
| 接着の圧締時間 | 45〜75 秒 | 60秒で頭打ち | (秒−45)×0.7 |
| 接着剤の塗布量 | 20〜40 g/㎡ | **30が最適。両側に壁がある** | \|g−20\|×0.15 |
| 刃の交換周期 | 10〜40 h | 効くが費用が重い | (40−h)×0.9 |
| 研削の番手 | 120〜180 | 150で頭打ち | (番手−120)×0.25 |
| 室温を管理する | 0〜100% | **何も起きない。費用だけかかる** | ×18 |

含水率は `mc = 中心(在炉時間) + 季節 + N(0, σ(温度))`、`σ(温度) = 0.6 + (温度−60)/30 × 0.9`。
基準は80℃で σ=1.2。60℃まで下げると σ=0.6 になる。**中心と幅は別の手**という形にしてある。

効果金額の上限（`scratchpad/knobs.js` で 555,660通りを期待値で総当たり）:
ライン全体 2,506万円 / 乾燥とNC加工 205万円 / 接着と研削 1,474万円。

罠の確認（それだけをやった場合の効果金額）:

| 手 | 合計不良 | 効果金額 |
|---|---|---|
| 室温管理だけ | 15.2%（変わらず） | **−250万円** |
| 乾燥温度だけ下げる | 14.8% | −11万円 |
| 塗布量を40に増やす | 15.3%（悪化） | −104万円 |
| 塗布量を30に合わせる | 14.5% | +106万円 |
| 受入チェックだけ | 9.5% | +1,190万円 |
| 全部いちばん締める | 1.8%（最小） | **1,626万円** |
| 金額の山（刃はそのまま） | 2.3% | **2,304万円** |

受入チェックは単独では大きく効くが、在炉時間を直したあとは要らなくなる。
**検査で止めるのは原因を直す前の手**、という形が金額で出る。

**条件オブジェクトは必ず `withBase()` を通す。** 項目を増やしたとき、
部分的に書いた条件（`{kiln, press}` など）が新しい項目を欠いて NaN になった事故がある。

### ゲームのファイル構成

1つのファイルが2,000行を超えたので分けた。読み込み順がそのまま依存の向きになっている。

| ファイル | 行 | 中身 |
|---|---|---|
| `core.js` | 241 | 土台。乱数・季節・状態の保存・成績表・結果コード・画面の部品・育成の見た目・進行 |
| `charts.js` | 160 | 折れ線・棒・散布図・ヒストグラム・交互作用図 |
| `scenarios.js` | 102 | 4本のラインの係数・正解・標準作業の整備状況 |
| `model.js` | 355 | 品質ラインの隠れモデル・調査の棚・層別の因子・スコープ・効果金額・条件 |
| `screens.js` | 590 | 盤面・現場調査・スコープ決定・的・標準作業・調査・条件 |
| `analyze.js` | 511 | 分析室の8タブ |
| `result.js` | 276 | 結論・結果・答え合わせ |
| `prod-model.js` | 296 | 木工ライン丁のライン模型と調査の棚 |
| `prod-screens.js` | 292 | 木工ライン丁の盤面と打つ手 |
| `prod-analyze.js` | 284 | 木工ライン丁の分析室 |
| `prod-result.js` | 200 | 木工ライン丁の結論と結果 |
| `notebook.js` | 230 | 手帳。品質・生産性の両方で同じ画面。採点用の `bookScore` / `hypNaming` / `notesText` もここ |
| `app.js` | 212 | タイトル・集計・言語切替・画面の登録 |

行数は分割時のもの。2026-09-22 の改修で model / screens / analyze / result は各100〜200行増えている。

**受け渡しの決まり。**

- 共通の部品は `window.WS`（core.js）。`WS.h` `WS.talk` `WS.save` のように借りる
- 品質ラインが互いに渡すものは `WS.G`、木工ライン丁は `WS.P` に載せる
- 各ファイルの先頭で `const x = G.x;` と借り、末尾で `Object.assign(G, { ... })` と渡す
- **状態は1つだけ。** `WS.state()` で取りに行く。`st.week` ではなく `st().week` と書く
- 画面は `app.js` の末尾で `WS.screens` に登録する。木工ライン丁は `window.WOODSHOP_PROD`

**分けるときの手順。** 先に `scratchpad/gharness.js` の出力を基準として保存し、
分割後に `diff` で突き合わせる。**差分0でなければ分割は終わっていない。**
今回は差分0になるまでに、st の受け渡し・重複した定義・貼り直しの漏れ・借用の不足を12箇所直した。
