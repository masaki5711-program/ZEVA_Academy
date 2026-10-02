ZA.addModule({
  id: "z3-02",
  track: "z3",
  order: 2,
  minutes: 45,
  icon: "🔬",
  level: 3,
  prereq: ["z2-04", "ie-09"],
  title: {
    ja: "Deep GPC：DMAIC",
    en: "Deep GPC: DMAIC",
    id: "Deep GPC: DMAIC"
  },
  summary: {
    ja: "原因不明・高リスク・多変量の課題を1〜3ヶ月かけて統計的に解明する Deep GPC モード。DMAIC各フェーズの進め方と、MSA・統計分析・DOE・管理計画の要点を学びます。",
    en: "Deep GPC mode tackles unknown-cause, high-risk, multi-variable issues statistically over 1–3 months. Learn how to run each DMAIC phase and the essentials of MSA, statistical analysis, DOE and control planning.",
    id: "Mode Deep GPC menangani masalah yang penyebabnya tidak diketahui, berisiko tinggi, dan multivariabel secara statistik selama 1–3 bulan. Pelajari cara menjalankan setiap fase DMAIC serta inti MSA, analisis statistik, DOE, dan rencana kontrol."
  },
  objectives: [
    { ja: "Deep GPCを使うべき課題と使うべきでない課題を区別できる", en: "Distinguish issues that need Deep GPC from those that do not", id: "Membedakan masalah yang memerlukan Deep GPC dari yang tidak" },
    { ja: "DMAIC各フェーズの目的・主な活動・アウトプットを説明できる", en: "Explain the purpose, main activities and outputs of each DMAIC phase", id: "Menjelaskan tujuan, aktivitas utama, dan keluaran setiap fase DMAIC" },
    { ja: "MSAがデータ信頼性（精度＋正確さ）を保証する理由を説明し、%GRRを判定できる", en: "Explain why MSA guarantees data reliability (precision + accuracy) and judge %GRR", id: "Menjelaskan mengapa MSA menjamin keandalan data (presisi + akurasi) dan menilai %GRR" },
    { ja: "Controlの結果をPDCA-Sへ引き継ぐ方法を説明できる", en: "Explain how Control results are handed over to PDCA-S", id: "Menjelaskan cara menyerahkan hasil Control ke PDCA-S" }
  ],
  sections: [
    {
      id: "when",
      title: { ja: "Deep GPCとは：止まって深く考える", en: "What Deep GPC Is: Stop and Think Deeply", id: "Apa Itu Deep GPC: Berhenti dan Berpikir Mendalam" },
      blocks: [
        { type: "p", text: {
          ja: "[[deep-gpc]]は、[[hybrid-triage]]で「原因不明 OR 高リスク OR 多変量」と判定された課題に適用する深耕解析モードです。慢性的な不良や複雑に絡み合った要因を、Six Sigmaの[[dmaic]]フレームワークと統計手法で解明し、抜本解決します。期間の目安は1〜3ヶ月です。",
          en: "[[deep-gpc]] is the deep-analysis mode applied to issues that [[hybrid-triage]] judged as “unknown cause OR high risk OR multi-variable”. It uncovers chronic defects and tangled causes with the Six Sigma [[dmaic]] framework and statistics, and solves them at the root. Typical duration is 1–3 months.",
          id: "[[deep-gpc]] adalah mode analisis mendalam untuk masalah yang dinilai [[hybrid-triage]] sebagai “penyebab tidak diketahui ATAU risiko tinggi ATAU multivariabel”. Mode ini mengungkap cacat kronis dan penyebab yang saling terkait dengan kerangka [[dmaic]] Six Sigma serta statistik, lalu menyelesaikannya sampai akar. Durasi umumnya 1–3 bulan."
        } },
        { type: "compare",
          left: { title: { ja: "Quick GPC（H-T-C-A）", en: "Quick GPC (H-T-C-A)", id: "Quick GPC (H-T-C-A)" }, tone: "blue", items: [
            { ja: "原因仮説あり・低リスク・単変量", en: "Cause hypothesis, low risk, single variable", id: "Ada hipotesis penyebab, risiko rendah, variabel tunggal" },
            { ja: "1日〜1週間", en: "1 day – 1 week", id: "1 hari – 1 minggu" },
            { ja: "統計知識は不要、五感と簡易計測", en: "No statistics needed; senses and simple measurement", id: "Tidak perlu statistik; indera dan pengukuran sederhana" },
            { ja: "アウトプット：暫定標準", en: "Output: temporary standard", id: "Keluaran: standar sementara" }
          ] },
          right: { title: { ja: "Deep GPC（DMAIC）", en: "Deep GPC (DMAIC)", id: "Deep GPC (DMAIC)" }, tone: "navy", items: [
            { ja: "原因不明・高リスク・多変量", en: "Unknown cause, high risk, multi-variable", id: "Penyebab tidak diketahui, risiko tinggi, multivariabel" },
            { ja: "1〜3ヶ月", en: "1 – 3 months", id: "1 – 3 bulan" },
            { ja: "統計手法を使用（回帰・分散分析・DOEなど）", en: "Uses statistics (regression, ANOVA, DOE ...)", id: "Memakai statistik (regresi, ANOVA, DOE ...)" },
            { ja: "アウトプット：GPCバンド再設定・SOP改訂", en: "Output: reset GPC band, revised SOP", id: "Keluaran: GPC band disetel ulang, SOP direvisi" }
          ] }
        },
        { type: "p", text: {
          ja: "Deep GPCは[[quick-gpc]]で3回サイクルを回しても効果が出ない、仮説が枯渇した、問題が再発する、影響範囲が想定より大きい、といった[[escalation]]によっても起動されます。",
          en: "Deep GPC is also launched by [[escalation]] from [[quick-gpc]]: no effect after three cycles, hypotheses have run out, the problem recurs, or the impact turns out bigger than expected.",
          id: "Deep GPC juga dijalankan melalui [[escalation]] dari [[quick-gpc]]: tidak ada efek setelah tiga siklus, hipotesis habis, masalah berulang, atau dampaknya ternyata lebih besar dari perkiraan."
        } },
        { type: "flow", dir: "h", nodes: [
          { title: { ja: "D 定義", en: "D Define", id: "D Define" }, text: { ja: "Y・X候補・範囲・ギャップ", en: "Y, X candidates, scope, gap", id: "Y, kandidat X, ruang lingkup, selisih" }, tone: "navy" },
          { title: { ja: "M 測定", en: "M Measure", id: "M Measure" }, text: { ja: "MSA・収集計画・現状のバラツキと不良率", en: "MSA, data plan, baseline variation and defect rate", id: "MSA, rencana data, variasi dan tingkat cacat awal" }, tone: "blue" },
          { title: { ja: "A 分析", en: "A Analyze", id: "A Analyze" }, text: { ja: "統計で真因を特定", en: "Find root cause statistically", id: "Temukan akar penyebab secara statistik" }, tone: "amber" },
          { title: { ja: "I 改善", en: "I Improve", id: "I Improve" }, text: { ja: "DOEで最適条件・パイロット", en: "DOE optimum, pilot run", id: "Optimum DOE, uji coba pilot" }, tone: "green" },
          { title: { ja: "C 管理", en: "C Control", id: "C Control" }, text: { ja: "管理図・標準化・PDCA-Sへ", en: "Control chart, standardise, to PDCA-S", id: "Peta kendali, standarkan, ke PDCA-S" }, tone: "gray" }
        ] }
      ]
    },
    {
      id: "define",
      title: { ja: "Define（定義）：YとXを明確にする", en: "Define: Clarify Y and X", id: "Define: Memperjelas Y dan X" },
      blocks: [
        { type: "p", text: {
          ja: "Defineでは「何を解決するのか」を曖昧さなく決めます。ここで問題の定義がぶれると、以降の測定や分析はすべて的外れになります。",
          en: "Define decides unambiguously what is to be solved. If the problem definition wobbles here, all later measurement and analysis will miss the mark.",
          id: "Define menetapkan dengan jelas apa yang akan diselesaikan. Jika definisi masalah goyah di sini, semua pengukuran dan analisis berikutnya akan meleset."
        } },
        { type: "list", items: [
          { ja: "**Y（結果系）を定義**：何が問題で、どの指標をどこまで改善するか（例：寸法の[[defect-rate]]を2%から0.2%以下へ）", en: "**Define Y (result)**: what the problem is and which metric to improve to what level (e.g. the dimensional [[defect-rate]] from 2% to ≤ 0.2%)", id: "**Definisikan Y (hasil)**: apa masalahnya dan metrik mana yang diperbaiki sampai tingkat berapa (mis. [[defect-rate]] dimensi dari 2% ke ≤ 0,2%)" },
          { ja: "**X（要因系）の候補を列挙**：[[fishbone]]（特性要因図）で[[seven-factors]]の視点から洗い出す", en: "**List X (cause) candidates**: brainstorm with a [[fishbone]] diagram from the [[seven-factors]] viewpoint", id: "**Daftar kandidat X (penyebab)**: curah pendapat dengan diagram [[fishbone]] dari sudut pandang [[seven-factors]]" },
          { ja: "**スコープ設定**：対象ライン・製品・期間、やらないことも明記", en: "**Set scope**: target line, product, period — and what is out of scope", id: "**Tetapkan ruang lingkup**: lini, produk, periode — dan apa yang di luar cakupan" },
          { ja: "**理論値とのギャップを数値化**：[[theoretical-value]]との差でプロジェクトの価値を示す", en: "**Quantify the gap to the theoretical value**: show project value as the gap to the [[theoretical-value|theoretical value]]", id: "**Kuantifikasi selisih terhadap nilai teoretis**: tunjukkan nilai proyek sebagai selisih terhadap [[theoretical-value|nilai teoretis]]" },
          { ja: "補助ツール：プロジェクト憲章、[[ctq]]（品質重要特性）の特定、[[sipoc]]で工程の境界を確認", en: "Supporting tools: project charter, identify [[ctq]], confirm process boundaries with [[sipoc]]", id: "Alat pendukung: piagam proyek, identifikasi [[ctq]], pastikan batas proses dengan [[sipoc]]" }
        ] },
        { type: "table",
          head: [ { ja: "SIPOC", en: "SIPOC", id: "SIPOC" }, { ja: "意味", en: "Meaning", id: "Arti" }, { ja: "例（はんだ付け工程・説明用）", en: "Example (soldering, illustrative)", id: "Contoh (penyolderan, ilustrasi)" } ],
          rows: [
            [ "S", { ja: "供給者", en: "Supplier", id: "Pemasok" }, { ja: "基板・部品の前工程", en: "Upstream board & parts process", id: "Proses hulu papan & part" } ],
            [ "I", { ja: "インプット", en: "Input", id: "Masukan" }, { ja: "基板、はんだ、温度設定、作業者", en: "Board, solder, temperature setting, operator", id: "Papan, solder, setelan suhu, operator" } ],
            [ "P", { ja: "プロセス", en: "Process", id: "Proses" }, { ja: "予熱 → はんだ付け → 冷却", en: "Preheat → solder → cool", id: "Pemanasan awal → solder → pendinginan" } ],
            [ "O", { ja: "アウトプット", en: "Output", id: "Keluaran" }, { ja: "接合済み基板", en: "Soldered board", id: "Papan tersolder" } ],
            [ "C", { ja: "顧客", en: "Customer", id: "Pelanggan" }, { ja: "組立工程（後工程）", en: "Assembly (downstream)", id: "Perakitan (hilir)" } ]
          ]
        },
        { type: "callout", kind: "warn", title: { ja: "Yを直接いじる計画にしない", en: "Do not plan to manipulate Y directly", id: "Jangan merencanakan memanipulasi Y secara langsung" }, text: {
          ja: "「検査を強化して不良流出を減らす」はYの直接操作です。Defineの段階から「どのXを制御すればYが変わるか」を問う形でテーマを書きます（[[xy-thinking]]）。",
          en: "“Tighten inspection to reduce escapes” manipulates Y directly. From Define onward, phrase the theme as “which X must we control so that Y changes?” ([[xy-thinking]]).",
          id: "“Perketat inspeksi agar cacat lolos berkurang” adalah memanipulasi Y secara langsung. Sejak Define, rumuskan tema sebagai “X mana yang harus dikendalikan agar Y berubah?” ([[xy-thinking]])."
        } }
      ]
    },
    {
      id: "measure",
      title: { ja: "Measure（測定）：まずデータを信頼できるものにする", en: "Measure: First Make the Data Trustworthy", id: "Measure: Jadikan Data Dapat Dipercaya Terlebih Dahulu" },
      blocks: [
        { type: "p", text: {
          ja: "Measureの最初の仕事は、分析に使うデータが信頼できるかを確かめることです。信頼性の低いデータからは、正しい結論もアクションも導けません（[[root-logic]]）。そのために[[msa]]（測定システム分析）を行います。",
          en: "The first job in Measure is to confirm that the data used for analysis can be trusted. Unreliable data leads to neither correct conclusions nor correct actions ([[root-logic]]). That is why we perform [[msa]] (measurement system analysis).",
          id: "Tugas pertama dalam Measure adalah memastikan data yang dipakai untuk analisis dapat dipercaya. Data yang tidak andal tidak menghasilkan kesimpulan maupun tindakan yang benar ([[root-logic]]). Karena itu kita melakukan [[msa]] (analisis sistem pengukuran)."
        } },
        { type: "diagram", name: "precision-accuracy", caption: { ja: "データ信頼性＝精度（バラツキ小）＋正確さ（偏りなし）", en: "Data reliability = precision (low variation) + accuracy (no bias)", id: "Keandalan data = presisi (variasi kecil) + akurasi (tanpa bias)" } },
        { type: "table",
          head: [ { ja: "MSAの確認項目", en: "MSA check item", id: "Item cek MSA" }, { ja: "意味", en: "Meaning", id: "Arti" }, { ja: "信頼性の側面", en: "Aspect of reliability", id: "Aspek keandalan" } ],
          rows: [
            [ { ja: "繰返し性（Repeatability）", en: "Repeatability", id: "Repeatability" }, { ja: "同じ人・同じ測定器で同じものを何度測っても同じ値になるか", en: "Same person, same gauge, same part — same value every time?", id: "Orang sama, alat ukur sama, benda sama — nilainya selalu sama?" }, { ja: "精度（バラツキ）", en: "Precision (variation)", id: "Presisi (variasi)" } ],
            [ { ja: "再現性（Reproducibility）", en: "Reproducibility", id: "Reproducibility" }, { ja: "測る人が変わっても同じ値になるか", en: "Same value when a different person measures?", id: "Nilai sama walau diukur orang berbeda?" }, { ja: "精度（バラツキ）", en: "Precision (variation)", id: "Presisi (variasi)" } ],
            [ { ja: "偏り（Bias）", en: "Bias", id: "Bias" }, { ja: "基準値（真の値）からずれていないか", en: "Is there an offset from the reference (true) value?", id: "Apakah ada pergeseran dari nilai acuan (sebenarnya)?" }, { ja: "正確さ", en: "Accuracy", id: "Akurasi" } ],
            [ { ja: "校正（Calibration）", en: "Calibration", id: "Kalibrasi" }, { ja: "測定器が定期的に基準と照合されているか", en: "Is the gauge regularly checked against a standard?", id: "Apakah alat ukur rutin dicocokkan dengan standar?" }, { ja: "正確さ", en: "Accuracy", id: "Akurasi" } ]
          ]
        },
        { type: "formula",
          expr: { ja: "%GRR = 測定システムのバラツキ（σ<sub>GRR</sub>）÷ 全体のバラツキ（σ<sub>total</sub>）× 100", en: "%GRR = measurement-system variation (σ<sub>GRR</sub>) ÷ total variation (σ<sub>total</sub>) × 100", id: "%GRR = variasi sistem pengukuran (σ<sub>GRR</sub>) ÷ variasi total (σ<sub>total</sub>) × 100" },
          where: [
            { sym: "σ<sub>GRR</sub>", text: { ja: "繰返し性と再現性を合わせた測定のバラツキ", en: "Combined repeatability and reproducibility variation", id: "Variasi gabungan repeatability dan reproducibility" } },
            { sym: "σ<sub>total</sub>", text: { ja: "部品間のバラツキ＋測定のバラツキ", en: "Part-to-part variation + measurement variation", id: "Variasi antar benda + variasi pengukuran" } }
          ],
          note: { ja: "一般的な目安：10%未満＝良好、10〜30%＝用途により条件付きで可、30%超＝不可（測定システムの改善が先）", en: "Common rule of thumb: < 10% good, 10–30% conditionally acceptable depending on use, > 30% not acceptable (fix the measurement system first)", id: "Pedoman umum: < 10% baik, 10–30% dapat diterima bersyarat tergantung penggunaan, > 30% tidak dapat diterima (perbaiki sistem pengukuran dulu)" }
        },
        { type: "check",
          q: { ja: "[[gage-rr]]の結果、%GRRが38%だった。次に行うべきことは？", en: "A [[gage-rr]] study gives %GRR = 38%. What should you do next?", id: "Studi [[gage-rr]] menghasilkan %GRR = 38%. Apa yang harus dilakukan berikutnya?" },
          choices: [
            { ja: "そのままデータを集めて回帰分析に進む", en: "Collect data as is and move on to regression", id: "Kumpulkan data apa adanya dan lanjut ke regresi" },
            { ja: "測定方法・治具・測定器・教育を見直し、測定システムを改善してから再評価する", en: "Review method, fixture, gauge and training; improve the measurement system and re-evaluate", id: "Tinjau metode, fixture, alat ukur, dan pelatihan; perbaiki sistem pengukuran lalu evaluasi ulang" },
            { ja: "サンプル数を増やせば問題ない", en: "Just increase the sample size", id: "Cukup tambah jumlah sampel" }
          ],
          answer: 1,
          explain: { ja: "30%超は測定のバラツキが大きすぎ、工程のバラツキと区別できません。サンプルを増やしても測定誤差は消えないため、測定システムの改善が先です。", en: "Above 30% the measurement noise is too large to separate from process variation. More samples do not remove measurement error — fix the measurement system first.", id: "Di atas 30% derau pengukuran terlalu besar untuk dipisahkan dari variasi proses. Menambah sampel tidak menghapus galat pengukuran — perbaiki sistem pengukuran dulu." }
        },
        { type: "list", items: [
          { ja: "**データ収集計画（サンプリング計画）**：何を・いつ・どこで・何個・誰が測るか。X候補（時間帯、ロット、作業者、設備など）を層別できるよう記録項目を設計する", en: "**Data collection (sampling) plan**: what, when, where, how many, who measures. Design record fields so X candidates (time slot, lot, operator, machine ...) can be stratified", id: "**Rencana pengumpulan data (sampling)**: apa, kapan, di mana, berapa, siapa yang mengukur. Rancang kolom catatan agar kandidat X (jam, lot, operator, mesin ...) bisa distratifikasi" },
          { ja: "**現状のバラツキと不良率を把握**：標準偏差と[[defect-rate]]を計算。ただし[[statistical-control]]にあるかを[[xbar-r-chart]]で確認してから解釈する", en: "**Measure baseline variation and defects**: calculate the standard deviation and the [[defect-rate]], but interpret them only after confirming [[statistical-control]] with an [[xbar-r-chart]]", id: "**Ukur variasi dan cacat awal**: hitung simpangan baku dan [[defect-rate]], tetapi tafsirkan hanya setelah memastikan [[statistical-control]] dengan [[xbar-r-chart]]" }
        ] },
        { type: "callout", kind: "zeva", title: { ja: "アナログ代替ポイント", en: "Analog alternative", id: "Alternatif analog" }, text: {
          ja: "データ収集にセンサーは必須ではありません。手動計測＋Excelでも十分な分析が可能です。重要なのは道具ではなく、測定システムの信頼性です。",
          en: "Sensors are not required for data collection. Manual measurement plus a spreadsheet is enough for solid analysis. What matters is the reliability of the measurement system, not the tools.",
          id: "Sensor tidak wajib untuk pengumpulan data. Pengukuran manual ditambah spreadsheet sudah cukup untuk analisis yang baik. Yang penting adalah keandalan sistem pengukuran, bukan alatnya."
        } }
      ]
    },
    {
      id: "analyze",
      title: { ja: "Analyze（分析）：統計で真因を特定する", en: "Analyze: Identify the Root Cause Statistically", id: "Analyze: Identifikasi Akar Penyebab Secara Statistik" },
      blocks: [
        { type: "p", text: {
          ja: "Analyzeで初めて本格的な統計ツールを使います。X候補のうち、どれが本当にYを動かしているのかを、データで検証します。[[five-why|なぜなぜ分析]]で論理的に掘り下げ、統計で裏付けるのが基本の組み合わせです。",
          en: "Analyze is where statistical tools are used in earnest. You verify with data which X candidates really move Y. The basic combination is digging logically with [[five-why]] and confirming with statistics.",
          id: "Analyze adalah tahap penggunaan alat statistik secara serius. Anda memverifikasi dengan data kandidat X mana yang benar-benar menggerakkan Y. Kombinasi dasarnya adalah menggali secara logis dengan [[five-why]] dan memastikannya dengan statistik."
        } },
        { type: "table",
          head: [ { ja: "手法", en: "Method", id: "Metode" }, { ja: "何が分かるか", en: "What it tells you", id: "Apa yang diketahui" }, { ja: "使う場面の例", en: "Typical use", id: "Contoh penggunaan" } ],
          rows: [
            [ { ja: "パレート図・層別", en: "Pareto & stratification", id: "Pareto & stratifikasi" }, { ja: "どの項目・層に問題が集中しているか", en: "Where the problem concentrates", id: "Di mana masalah terkonsentrasi" }, { ja: "不良モード別、ロット別、時間帯別", en: "By defect mode, lot, time slot", id: "Per mode cacat, lot, jam" } ],
            [ { ja: "相関分析・散布図", en: "Correlation & scatter plot", id: "Korelasi & diagram pencar" }, { ja: "2つの連続変数の関係の強さ", en: "Strength of relation between two continuous variables", id: "Kekuatan hubungan dua variabel kontinu" }, { ja: "温度と寸法", en: "Temperature vs dimension", id: "Suhu vs dimensi" } ],
            [ { ja: "[[regression]]（回帰分析）", en: "[[regression]]", id: "[[regression]]" }, { ja: "XがYをどれだけ動かすか（式）、交互作用", en: "How much X moves Y (equation), interactions", id: "Seberapa besar X menggerakkan Y (persamaan), interaksi" }, { ja: "工具摩耗量×温度 → 寸法", en: "Tool wear × temperature → dimension", id: "Keausan alat × suhu → dimensi" } ],
            [ { ja: "[[anova]]（分散分析）", en: "[[anova]]", id: "[[anova]]" }, { ja: "グループ間（ロット・設備・作業者）の平均差が偶然か", en: "Whether mean differences between groups (lot, machine, operator) are real", id: "Apakah beda rata-rata antar kelompok (lot, mesin, operator) nyata" }, { ja: "部品ロット3種の比較", en: "Comparing three part lots", id: "Membandingkan tiga lot part" } ],
            [ { ja: "[[hypothesis-test]]（仮説検定）", en: "[[hypothesis-test]]", id: "[[hypothesis-test]]" }, { ja: "差や効果が統計的に有意か（t検定、カイ二乗検定など）", en: "Whether a difference/effect is statistically significant (t-test, chi-square ...)", id: "Apakah perbedaan/efek signifikan secara statistik (uji-t, chi-kuadrat ...)" }, { ja: "改善前後の不良率比較", en: "Defect rate before vs after", id: "Tingkat cacat sebelum vs sesudah" } ]
          ]
        },
        { type: "callout", kind: "note", title: { ja: "p値の読み方（基本）", en: "Reading a p-value (basics)", id: "Membaca nilai-p (dasar)" }, text: {
          ja: "p値は「本当は差がないのに、偶然これだけの差が出る確率」です。一般に0.05未満なら「差は偶然とは考えにくい」と判断します。ただし統計的に有意でも、実務上の効果が小さければ優先度は低くなります。",
          en: "A p-value is “the probability of seeing a difference this large by chance if there were really no difference”. Commonly below 0.05 we judge the difference unlikely to be chance. But a statistically significant effect that is practically small still has low priority.",
          id: "Nilai-p adalah “peluang munculnya perbedaan sebesar ini secara kebetulan jika sebenarnya tidak ada perbedaan”. Umumnya di bawah 0,05 perbedaan dinilai tidak mungkin kebetulan. Namun efek yang signifikan secara statistik tetapi kecil secara praktis tetap berprioritas rendah."
        } },
        { type: "callout", kind: "warn", title: { ja: "相関は因果ではない", en: "Correlation is not causation", id: "Korelasi bukan kausalitas" }, text: {
          ja: "散布図で関係が見えても、第三の要因が両方を動かしているだけかもしれません。原因の確証は、Improveで条件を意図的に振る実験（DOE）で得ます。",
          en: "A relationship in a scatter plot may just be a third factor moving both. Proof of cause comes from deliberately changing conditions in Improve (DOE).",
          id: "Hubungan pada diagram pencar mungkin hanya karena faktor ketiga yang menggerakkan keduanya. Bukti penyebab didapat dengan sengaja mengubah kondisi di Improve (DOE)."
        } }
      ]
    },
    {
      id: "improve-control",
      title: { ja: "Improve（改善）とControl（管理）", en: "Improve and Control", id: "Improve dan Control" },
      blocks: [
        { type: "h", text: { ja: "Improve：最適条件を導き、パイロットで検証する", en: "Improve: derive the optimum and verify with a pilot", id: "Improve: menurunkan kondisi optimum dan memverifikasi dengan pilot" } },
        { type: "list", items: [
          { ja: "[[doe]]（実験計画法）で複数のXを計画的に振り、主効果と交互作用を効率よく把握する。DOEの変動は**意図的な実験変動**であり、排除対象ではなく学習の源泉", en: "Use [[doe]] to vary several X systematically and efficiently learn main effects and interactions. DOE variation is **intentional experimental variation** — not something to eliminate, but a source of learning", id: "Gunakan [[doe]] untuk mengubah beberapa X secara terencana dan mempelajari efek utama serta interaksi secara efisien. Variasi DOE adalah **variasi eksperimen yang disengaja** — bukan untuk dihilangkan, melainkan sumber pembelajaran" },
          { ja: "[[gpc-m]]の場合：最適パラメータと[[gpc-band]]を再設定する", en: "For [[gpc-m]]: reset the optimum parameters and the [[gpc-band]]", id: "Untuk [[gpc-m]]: setel ulang parameter optimum dan [[gpc-band]]" },
          { ja: "[[gpc-h]]の場合：作業手順の抜本改定、治具・設備の改造", en: "For [[gpc-h]]: fundamentally revise work procedures, modify jigs and equipment", id: "Untuk [[gpc-h]]: merevisi prosedur kerja secara mendasar, memodifikasi jig dan peralatan" },
          { ja: "[[pilot-run]]（パイロットラン）で改善効果を実環境で検証してから全面展開する", en: "Verify the effect in the real environment with a [[pilot-run]] before full rollout", id: "Verifikasi efek di lingkungan nyata dengan [[pilot-run]] sebelum diterapkan penuh" }
        ] },
        { type: "table",
          head: [ { ja: "実験No.", en: "Run", id: "Uji" }, { ja: "温度", en: "Temperature", id: "Suhu" }, { ja: "速度", en: "Speed", id: "Kecepatan" }, { ja: "結果の見方", en: "How to read", id: "Cara membaca" } ],
          rows: [
            [ "1", { ja: "低", en: "Low", id: "Rendah" }, { ja: "低", en: "Low", id: "Rendah" }, { ja: "4通りの組合せを全部試す（2因子2水準の要因配置）", en: "Try all 4 combinations (2-factor, 2-level full factorial)", id: "Coba keempat kombinasi (faktorial penuh 2 faktor, 2 level)" } ],
            [ "2", { ja: "高", en: "High", id: "Tinggi" }, { ja: "低", en: "Low", id: "Rendah" }, { ja: "温度の主効果 = 高の平均 − 低の平均", en: "Temperature main effect = mean at high − mean at low", id: "Efek utama suhu = rata-rata tinggi − rata-rata rendah" } ],
            [ "3", { ja: "低", en: "Low", id: "Rendah" }, { ja: "高", en: "High", id: "Tinggi" }, { ja: "速度の主効果も同様に計算", en: "Speed main effect is computed the same way", id: "Efek utama kecepatan dihitung dengan cara sama" } ],
            [ "4", { ja: "高", en: "High", id: "Tinggi" }, { ja: "高", en: "High", id: "Tinggi" }, { ja: "片方の効果がもう片方の水準で変わる＝交互作用", en: "If one effect changes with the other's level = interaction", id: "Jika efek satu faktor berubah menurut level faktor lain = interaksi" } ]
          ],
          caption: { ja: "DOEの最小イメージ（2因子×2水準）", en: "Minimal DOE picture (2 factors × 2 levels)", id: "Gambaran DOE minimal (2 faktor × 2 level)" }
        },
        { type: "h", text: { ja: "Control：安定状態を監視し、標準に固定する", en: "Control: monitor stability and lock it into the standard", id: "Control: memantau kestabilan dan menguncinya ke standar" } },
        { type: "list", items: [
          { ja: "[[xbar-r-chart]]などの管理図で、工程が安定状態にあるかを監視する", en: "Monitor whether the process is stable with control charts such as the [[xbar-r-chart]]", id: "Pantau apakah proses stabil dengan peta kendali seperti [[xbar-r-chart]]" },
          { ja: "[[control-plan]]（コントロールプラン）に、管理項目・方法・頻度・責任者・異常時の対応を定める", en: "Define control items, method, frequency, owner and reaction to abnormalities in a [[control-plan]]", id: "Tetapkan item kontrol, metode, frekuensi, penanggung jawab, dan reaksi terhadap abnormalitas dalam [[control-plan]]" },
          { ja: "改善した条件を[[pdca-s]]の「S」で標準化・固定する（SOP改訂＋教育）", en: "Standardise and lock the improved conditions with the “S” of [[pdca-s]] (SOP revision + training)", id: "Standarkan dan kunci kondisi yang diperbaiki dengan “S” dari [[pdca-s]] (revisi SOP + pelatihan)" },
          { ja: "定期的な管理図の確認で、安定状態が続いていることを確かめる", en: "Confirm the process stays stable by checking the control chart regularly", id: "Pastikan proses tetap stabil dengan memeriksa peta kendali secara berkala" }
        ] },
        { type: "callout", kind: "key", title: { ja: "ControlとPDCA-Sは接続している", en: "Control connects to PDCA-S", id: "Control terhubung ke PDCA-S" }, text: {
          ja: "DMAICのControlは改善プロジェクトの「締め」＝管理体制の構築です。ここで設定した管理図と監視項目が、日常運用サイクルであるPDCA-Sの「Plan」に引き継がれます。",
          en: "Control is the “closing” of the DMAIC project — building the management system. The control charts and monitoring items set here are handed over to the “Plan” of PDCA-S, the daily-operation cycle.",
          id: "Control adalah “penutup” proyek DMAIC — membangun sistem pengelolaan. Peta kendali dan item pemantauan yang ditetapkan di sini diserahkan ke “Plan” dari PDCA-S, siklus operasi harian."
        } },
        { type: "callout", kind: "tip", title: { ja: "Quick GPCとの並行運用", en: "Running Quick GPC in parallel", id: "Menjalankan Quick GPC secara paralel" }, text: {
          ja: "分析中に「これは試してみよう」というアイデアが出て、それが低リスク・単変量ならQuick GPCのトライを並行して実施して構いません。両モードは排他的ではありません。",
          en: "If an idea worth trying comes up during analysis and it is low-risk and single-variable, you may run a Quick GPC trial in parallel. The two modes are not mutually exclusive.",
          id: "Jika muncul ide yang layak dicoba saat analisis dan ide itu berisiko rendah serta variabel tunggal, uji Quick GPC boleh dijalankan paralel. Kedua mode tidak saling meniadakan."
        } }
      ]
    },
    {
      id: "practice",
      title: { ja: "演習：DMAICプロジェクトを進める", en: "Exercise: Run a DMAIC Project", id: "Latihan: Menjalankan Proyek DMAIC" },
      blocks: [
        { type: "widget", name: "scenario", props: {
          title: { ja: "慢性的な寸法バラツキ（数値は説明用）", en: "Chronic dimensional variation (illustrative numbers)", id: "Variasi dimensi kronis (angka ilustrasi)" },
          intro: { ja: "加工ラインで、ある寸法の不良率が2%と高い状態が半年続いています。原因は誰にも分からず、設備条件を誤ると高価な工具を破損するおそれがあります。あなたはプロジェクトリーダーです。", en: "On a machining line, the defect rate of a dimension has stayed high at 2% for six months. No one knows why, and wrong machine settings could break expensive tooling. You are the project leader.", id: "Di lini pemesinan, tingkat cacat sebuah dimensi tetap tinggi di 2% selama enam bulan. Tidak ada yang tahu penyebabnya, dan setelan mesin yang salah bisa merusak alat potong yang mahal. Anda pemimpin proyek." },
          steps: [
            { prompt: { ja: "トリアージの結果は？", en: "What is the triage result?", id: "Apa hasil triase?" }, choices: [
              { text: { ja: "Deep GPC（原因不明・高リスク）", en: "Deep GPC (unknown cause, high risk)", id: "Deep GPC (penyebab tidak diketahui, risiko tinggi)" }, correct: true, feedback: { ja: "正解。原因不明、または高リスクのどちらか一方でもDeep GPCです。", en: "Correct. Either unknown cause or high risk alone is enough for Deep GPC.", id: "Benar. Penyebab tidak diketahui atau risiko tinggi saja sudah cukup untuk Deep GPC." } },
              { text: { ja: "Quick GPC（まず温度を上げてみる）", en: "Quick GPC (just try raising the temperature)", id: "Quick GPC (coba naikkan suhu saja)" }, correct: false, feedback: { ja: "仮説がなく、失敗時に工具破損のリスクがあるためQuick GPCは不適切です。", en: "There is no hypothesis and a risk of tool breakage, so Quick GPC is inappropriate.", id: "Tidak ada hipotesis dan ada risiko alat rusak, jadi Quick GPC tidak tepat." } }
            ] },
            { prompt: { ja: "Defineで書くべき内容は？", en: "What should be written in Define?", id: "Apa yang harus ditulis di Define?" }, choices: [
              { text: { ja: "Y＝寸法精度（不良率2%→0.2%以下）、X候補＝温度・湿度・工具摩耗・材料ロット、範囲と理論値ギャップ", en: "Y = dimensional accuracy (defect rate 2% → ≤ 0.2%), X candidates = temperature, humidity, tool wear, material lot; scope and the gap to the theoretical value", id: "Y = akurasi dimensi (tingkat cacat 2% → ≤ 0,2%), kandidat X = suhu, kelembapan, keausan alat, lot material; ruang lingkup dan selisih terhadap nilai teoretis" }, correct: true, feedback: { ja: "YとX候補、ゴールが明確です。", en: "Y, X candidates and the goal are clear.", id: "Y, kandidat X, dan tujuan sudah jelas." } },
              { text: { ja: "「検査を全数にして不良を流さない」", en: "“Inspect 100% so no defects escape”", id: "“Inspeksi 100% agar tidak ada cacat lolos”" }, correct: false, feedback: { ja: "Yを直接操作する対策で、原因（X）に触れていません。", en: "This manipulates Y directly and never touches the cause (X).", id: "Ini memanipulasi Y secara langsung dan tidak menyentuh penyebab (X)." } }
            ] },
            { prompt: { ja: "Measureで最初にやることは？", en: "What comes first in Measure?", id: "Apa yang pertama di Measure?" }, choices: [
              { text: { ja: "過去半年の検査記録ですぐ回帰分析する", en: "Run regression right away on six months of inspection records", id: "Langsung regresi pada catatan inspeksi enam bulan" }, correct: false, feedback: { ja: "測定システムの信頼性が未確認です。測定誤差が大きければ分析結果は誤ります。", en: "The measurement system's reliability is unconfirmed; if measurement error is large, the analysis will mislead.", id: "Keandalan sistem pengukuran belum dipastikan; jika galat pengukuran besar, analisis akan menyesatkan." } },
              { text: { ja: "MSA（Gage R&R・偏り・校正）を行い、収集計画を立てる", en: "Do MSA (Gage R&R, bias, calibration) and make a data collection plan", id: "Lakukan MSA (Gage R&R, bias, kalibrasi) dan buat rencana pengumpulan data" }, correct: true, feedback: { ja: "正解。データ信頼性を確保してから4週間のデータを層別収集します。", en: "Correct. Secure data reliability, then collect four weeks of stratified data.", id: "Benar. Pastikan keandalan data, lalu kumpulkan data terstratifikasi selama empat minggu." } }
            ] },
            { prompt: { ja: "回帰分析で「工具摩耗×温度」の交互作用が主因と分かった。Improveでは？", en: "Regression shows the interaction “tool wear × temperature” is the main cause. What do you do in Improve?", id: "Regresi menunjukkan interaksi “keausan alat × suhu” sebagai penyebab utama. Apa yang dilakukan di Improve?" }, choices: [
              { text: { ja: "DOEで工具交換周期と温度の最適条件を求め、GPCバンドを再設定し、パイロットランで検証", en: "Use DOE to find the optimum tool-change interval and temperature, reset the GPC band, verify with a pilot run", id: "Gunakan DOE untuk mencari interval ganti alat dan suhu optimum, setel ulang GPC band, verifikasi dengan pilot run" }, correct: true, feedback: { ja: "正解。交互作用はDOEで効率よく確認できます。", en: "Correct. Interactions are confirmed efficiently with DOE.", id: "Benar. Interaksi dapat dikonfirmasi secara efisien dengan DOE." } },
              { text: { ja: "温度だけを変えて様子を見る", en: "Change only temperature and see", id: "Ubah suhu saja dan lihat hasilnya" }, correct: false, feedback: { ja: "交互作用があるため、1因子ずつ変えると最適条件を見逃します。", en: "With an interaction, changing one factor at a time can miss the optimum.", id: "Karena ada interaksi, mengubah satu faktor per waktu bisa melewatkan kondisi optimum." } }
            ] },
            { prompt: { ja: "不良率が0.2%に改善した。Controlでは？", en: "The defect rate improved to 0.2%. What happens in Control?", id: "Tingkat cacat membaik menjadi 0,2%. Apa yang dilakukan di Control?" }, choices: [
              { text: { ja: "プロジェクト完了なので管理は不要", en: "Project is done, no need to monitor", id: "Proyek selesai, tidak perlu pemantauan" }, correct: false, feedback: { ja: "管理体制がなければ元に戻ります。Sなき改善は「やりっぱなし」です。", en: "Without a control system it will slide back. Improvement without S is do-and-forget.", id: "Tanpa sistem kontrol, kondisi akan kembali. Perbaikan tanpa S adalah kerjakan-lalu-lupakan." } },
              { text: { ja: "X̄-R管理図で監視、コントロールプランとSOP改訂・教育、PDCA-SのPlanへ引き継ぐ", en: "Monitor with an X̄-R chart, control plan, SOP revision and training, hand over to PDCA-S Plan", id: "Pantau dengan peta X̄-R, rencana kontrol, revisi SOP dan pelatihan, serahkan ke Plan PDCA-S" }, correct: true, feedback: { ja: "正解。ControlからPDCA-Sへ接続して効果を定着させます。", en: "Correct. Control connects to PDCA-S so the effect sticks.", id: "Benar. Control terhubung ke PDCA-S sehingga efeknya bertahan." } }
            ] }
          ],
          outro: { ja: "定義→測定→分析→改善→管理の各段で「データは信頼できるか」「Xを制御しているか」を問い続けることが、Deep GPC成功の鍵です。", en: "Asking “is the data reliable?” and “are we controlling X?” at every step from Define to Control is the key to Deep GPC success.", id: "Terus bertanya “apakah data andal?” dan “apakah kita mengendalikan X?” di setiap tahap dari Define hingga Control adalah kunci keberhasilan Deep GPC." }
        } }
      ]
    }
  ],
  keyPoints: [
    { ja: "Deep GPCは「原因不明 OR 高リスク OR 多変量」の課題に、DMAICで1〜3ヶ月かけて取り組む", en: "Deep GPC applies DMAIC over 1–3 months to issues with unknown cause OR high risk OR many variables", id: "Deep GPC menerapkan DMAIC selama 1–3 bulan untuk masalah dengan penyebab tidak diketahui ATAU risiko tinggi ATAU banyak variabel" },
    { ja: "DefineでYとX候補・スコープ・理論値ギャップを明確にし、Yを直接いじる計画にしない", en: "Define clarifies Y, X candidates, scope and theoretical-value gap — never a plan to manipulate Y directly", id: "Define memperjelas Y, kandidat X, ruang lingkup, dan selisih nilai teoretis — bukan rencana memanipulasi Y secara langsung" },
    { ja: "MeasureではまずMSAで精度（繰返し性・再現性）と正確さ（偏り・校正）を確認する", en: "Measure starts with MSA to confirm precision (repeatability, reproducibility) and accuracy (bias, calibration)", id: "Measure dimulai dengan MSA untuk memastikan presisi (repeatability, reproducibility) dan akurasi (bias, kalibrasi)" },
    { ja: "Analyzeは統計＋なぜなぜで真因を特定し、ImproveはDOEとパイロットランで検証する", en: "Analyze finds the root cause with statistics + 5-Why; Improve verifies with DOE and a pilot run", id: "Analyze menemukan akar penyebab dengan statistik + 5-Why; Improve memverifikasi dengan DOE dan pilot run" },
    { ja: "Controlで管理図・コントロールプラン・標準化を行い、PDCA-Sへ引き継ぐ", en: "Control sets control charts, a control plan and standardisation, then hands over to PDCA-S", id: "Control menetapkan peta kendali, rencana kontrol, dan standardisasi, lalu menyerahkan ke PDCA-S" }
  ],
  quiz: [
    { q: { ja: "Deep GPCに振り分けられる条件として正しいものは？", en: "Which condition routes an issue to Deep GPC?", id: "Kondisi mana yang mengarahkan masalah ke Deep GPC?" },
      choices: [
        { ja: "原因仮説あり AND 低リスク AND 単変量", en: "Hypothesis AND low risk AND single variable", id: "Ada hipotesis DAN risiko rendah DAN variabel tunggal" },
        { ja: "原因不明 OR 高リスク OR 多変量", en: "Unknown cause OR high risk OR multi-variable", id: "Penyebab tidak diketahui ATAU risiko tinggi ATAU multivariabel" },
        { ja: "統計担当者が空いているとき", en: "When a statistician is available", id: "Saat ahli statistik sedang luang" },
        { ja: "改善期間を長く取りたいとき", en: "When you want a longer improvement period", id: "Saat ingin periode perbaikan lebih lama" }
      ], answer: 1,
      explain: { ja: "Deep GPCはOR条件で、どれか一つでも該当すれば選択されます。Quick GPCはAND条件です。", en: "Deep GPC uses OR: any one condition triggers it. Quick GPC requires all conditions (AND).", id: "Deep GPC memakai ATAU: satu kondisi saja sudah memicunya. Quick GPC memerlukan semua kondisi (DAN)." } },
    { q: { ja: "MSAで「偏り」と「校正」が確認するデータ信頼性の側面は？", en: "Which aspect of data reliability do “bias” and “calibration” check in MSA?", id: "Aspek keandalan data mana yang dicek oleh “bias” dan “kalibrasi” dalam MSA?" },
      choices: [ { ja: "精度", en: "Precision", id: "Presisi" }, { ja: "正確さ", en: "Accuracy", id: "Akurasi" }, { ja: "再現性", en: "Reproducibility", id: "Reproducibility" }, { ja: "工程能力", en: "Process capability", id: "Kapabilitas proses" } ], answer: 1,
      explain: { ja: "繰返し性・再現性は精度（バラツキ）、偏り・校正は正確さ（真の値からのずれ）を確認します。", en: "Repeatability/reproducibility check precision (variation); bias/calibration check accuracy (offset from true value).", id: "Repeatability/reproducibility mengecek presisi (variasi); bias/kalibrasi mengecek akurasi (pergeseran dari nilai sebenarnya)." } },
    { q: { ja: "%GRRが8%の測定システムの一般的な評価は？", en: "What is the common judgment for a measurement system with %GRR = 8%?", id: "Apa penilaian umum untuk sistem pengukuran dengan %GRR = 8%?" },
      choices: [ { ja: "良好", en: "Good", id: "Baik" }, { ja: "条件付きで可", en: "Conditionally acceptable", id: "Diterima bersyarat" }, { ja: "不可", en: "Not acceptable", id: "Tidak dapat diterima" }, { ja: "判定できない", en: "Cannot be judged", id: "Tidak dapat dinilai" } ], answer: 0,
      explain: { ja: "目安は10%未満が良好、10〜30%が条件付き、30%超が不可です。", en: "Rule of thumb: < 10% good, 10–30% conditional, > 30% not acceptable.", id: "Pedoman: < 10% baik, 10–30% bersyarat, > 30% tidak dapat diterima." } },
    { q: { ja: "3種類の部品ロット間で寸法の平均に差があるかを調べたい。適した手法は？", en: "You want to know whether mean dimensions differ between three part lots. Which method fits?", id: "Anda ingin tahu apakah rata-rata dimensi berbeda antar tiga lot part. Metode mana yang cocok?" },
      choices: [ { ja: "分散分析（ANOVA）", en: "ANOVA", id: "ANOVA" }, { ja: "パイロットラン", en: "Pilot run", id: "Pilot run" }, { ja: "SIPOC", en: "SIPOC", id: "SIPOC" }, { ja: "5S", en: "5S", id: "5S" } ], answer: 0,
      explain: { ja: "3つ以上のグループ間の平均差の検定には分散分析を使います。", en: "ANOVA tests mean differences among three or more groups.", id: "ANOVA menguji perbedaan rata-rata antara tiga kelompok atau lebih." } },
    { q: { ja: "DOEで条件を計画的に振ることによる変動は、ZEVAでどう扱うか？", en: "How does ZEVA treat the variation created by deliberately changing conditions in DOE?", id: "Bagaimana ZEVA memperlakukan variasi yang sengaja dibuat dengan mengubah kondisi dalam DOE?" },
      choices: [
        { ja: "制御されていないバラツキとして排除する", en: "Eliminate it as uncontrolled variation", id: "Dihilangkan sebagai variasi tidak terkendali" },
        { ja: "意図的な実験変動であり、原因特定のための学習の源泉", en: "Intentional experimental variation — a source of learning to identify causes", id: "Variasi eksperimen yang disengaja — sumber pembelajaran untuk mengidentifikasi penyebab" },
        { ja: "測定のバラツキとしてMSAで除去する", en: "Remove it with MSA as measurement variation", id: "Dihapus dengan MSA sebagai variasi pengukuran" },
        { ja: "無視してよい", en: "It can be ignored", id: "Boleh diabaikan" }
      ], answer: 1,
      explain: { ja: "ZEVAでは変動を「対象のバラツキ」「測定のバラツキ・偏り」「意図的な実験変動」に区別し、DOEの変動は排除対象ではありません。", en: "ZEVA separates object variation, measurement variation/bias and intentional experimental variation; DOE variation is not eliminated.", id: "ZEVA membedakan variasi objek, variasi/bias pengukuran, dan variasi eksperimen yang disengaja; variasi DOE tidak dihilangkan." } },
    { q: { ja: "DMAICのControlとPDCA-Sの関係として正しいものは？", en: "Which correctly describes the relation between DMAIC Control and PDCA-S?", id: "Mana yang benar tentang hubungan Control DMAIC dan PDCA-S?" },
      choices: [
        { ja: "同じものなのでどちらか一方でよい", en: "They are the same, so one is enough", id: "Keduanya sama, jadi satu saja cukup" },
        { ja: "Controlで設定した管理図・監視項目がPDCA-SのPlanに引き継がれる", en: "Control charts and monitoring items set in Control are handed over to PDCA-S Plan", id: "Peta kendali dan item pemantauan dari Control diserahkan ke Plan PDCA-S" },
        { ja: "PDCA-Sが終わってからDMAICのControlを行う", en: "DMAIC Control is done after PDCA-S ends", id: "Control DMAIC dilakukan setelah PDCA-S selesai" },
        { ja: "両者に関係はない", en: "They are unrelated", id: "Keduanya tidak berhubungan" }
      ], answer: 1,
      explain: { ja: "Controlは改善プロジェクトの締め（管理体制の構築）で、その結果が日常運用のPDCA-Sに接続されます。", en: "Control closes the project by building the management system, whose results connect into daily PDCA-S.", id: "Control menutup proyek dengan membangun sistem pengelolaan, yang hasilnya tersambung ke PDCA-S harian." } },
    { q: { ja: "Deep GPC分析中に、低リスク・単変量の試したいアイデアが出た。どうする？", en: "During Deep GPC analysis, a low-risk, single-variable idea worth trying comes up. What do you do?", id: "Saat analisis Deep GPC, muncul ide berisiko rendah dan variabel tunggal yang layak dicoba. Apa yang dilakukan?" },
      choices: [
        { ja: "DMAICが終わるまで試してはいけない", en: "Do not try it until DMAIC is finished", id: "Jangan dicoba sampai DMAIC selesai" },
        { ja: "Quick GPCトライを並行して実施してよい", en: "You may run a Quick GPC trial in parallel", id: "Boleh menjalankan uji Quick GPC secara paralel" },
        { ja: "プロジェクトを中止してQuick GPCに切り替える", en: "Cancel the project and switch to Quick GPC", id: "Batalkan proyek dan beralih ke Quick GPC" },
        { ja: "DOEに組み込むまで記録しない", en: "Do not record it until it is included in DOE", id: "Jangan dicatat sampai dimasukkan ke DOE" }
      ], answer: 1,
      explain: { ja: "両モードは排他的ではなく、Quick GPCの条件を満たすなら並行運用できます。", en: "The modes are not exclusive; if it meets Quick GPC conditions it can run in parallel.", id: "Kedua mode tidak eksklusif; jika memenuhi syarat Quick GPC dapat dijalankan paralel." } }
  ]
});
