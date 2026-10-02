ZA.addModule({
  id: 'z2-02',
  track: 'z2',
  order: 2,
  minutes: 35,
  icon: '⚖️',
  level: 2,
  prereq: ['z2-01', 'ie-08'],
  title: { ja: 'GPC-M / GPC-H 二元論と評価指標', en: 'GPC-M / GPC-H Dual Structure and Metrics', id: 'Struktur Ganda GPC-M / GPC-H dan Metrik' },
  summary: {
    ja: 'バラツキの発生源に応じて「設備制御（GPC-M）」と「人制御（GPC-H）」を使い分ける二元論と、それぞれの評価指標・目標値を学びます。',
    en: 'Learn the dual structure that uses machine control (GPC-M) and human control (GPC-H) according to the source of variation, and the metrics and targets of each.',
    id: 'Pelajari struktur ganda yang memakai kontrol mesin (GPC-M) dan kontrol manusia (GPC-H) sesuai sumber variasi, serta metrik dan target masing-masing.'
  },
  objectives: [
    { ja: 'なぜZEVAが人と設備を別々に制御するのか説明できる', en: 'Explain why ZEVA controls people and machines separately', id: 'Menjelaskan mengapa ZEVA mengendalikan manusia dan mesin secara terpisah' },
    { ja: 'GPC-MとGPC-Hの手法の流れを説明できる', en: 'Describe the method flow of GPC-M and GPC-H', id: 'Menjelaskan alur metode GPC-M dan GPC-H' },
    { ja: '各評価指標と目標値を答えられる', en: 'State each metric and its target value', id: 'Menyebutkan setiap metrik dan nilai targetnya' },
    { ja: 'V.Scoreを計算し、ZEVAの基準で判定できる', en: 'Calculate V.Score and judge it by the ZEVA scale', id: 'Menghitung V.Score dan menilainya dengan skala ZEVA' }
  ],
  sections: [
    {
      id: 'why',
      title: { ja: 'なぜ二元論なのか', en: 'Why a dual structure?', id: 'Mengapa struktur ganda?' },
      blocks: [
        { type: 'callout', kind: 'key', title: { ja: '核心', en: 'Core', id: 'Inti' }, text: {
          ja: 'ZEVAのInput制御は「**GPC-M（Machine）**」と「**GPC-H（Human）**」の二元構造で設計する。',
          en: 'ZEVA designs input control as a dual structure: **GPC-M (Machine)** and **GPC-H (Human)**.',
          id: 'ZEVA merancang kontrol input sebagai struktur ganda: **GPC-M (Machine)** dan **GPC-H (Human)**.'
        } },
        { type: 'p', text: {
          ja: '設備と人では、バラツキの生まれ方がまったく違います。設備のバラツキは温度・圧力・速度などの**パラメータ**の変動として現れ、センサーや記録で数値として追えます。一方、人のバラツキは手順の解釈、動作の順序、手の位置、慣れや疲労などとして現れ、「パラメータを設定すれば済む」ものではありません。',
          en: 'Machines and people create variation in completely different ways. Machine variation appears as fluctuation of **parameters** such as temperature, pressure and speed, which can be tracked as numbers with sensors or records. Human variation appears as differences in interpreting procedures, motion order, hand position, habituation and fatigue — it cannot be solved just by setting a parameter.',
          id: 'Mesin dan manusia menghasilkan variasi dengan cara yang sangat berbeda. Variasi mesin muncul sebagai fluktuasi **parameter** seperti suhu, tekanan, dan kecepatan, yang dapat dilacak sebagai angka dengan sensor atau catatan. Variasi manusia muncul sebagai perbedaan interpretasi prosedur, urutan gerakan, posisi tangan, kebiasaan, dan kelelahan — tidak bisa diselesaikan hanya dengan menyetel parameter.'
        } },
        { type: 'p', text: {
          ja: 'そのためZEVAは、「人」と「設備」を別の制御要素として扱う考え方を受け継ぎ、原因に合った最適な手法を選べるようにしています。',
          en: 'Therefore ZEVA inherits the view of treating people and machines as separate control elements, so the best method can be chosen for each cause.',
          id: 'Karena itu ZEVA mewarisi pandangan yang memperlakukan manusia dan mesin sebagai elemen kontrol terpisah, sehingga metode terbaik dapat dipilih untuk setiap penyebab.'
        } },
        { type: 'compare',
          left: { title: { ja: '設備起因のバラツキ → GPC-M', en: 'Machine-caused variation → GPC-M', id: 'Variasi karena mesin → GPC-M' }, tone: 'blue', items: [
            { ja: 'パラメータ範囲制御', en: 'Parameter range control', id: 'Kontrol rentang parameter' },
            { ja: '物理実験でGPCバンドを決定', en: 'Set the GPC band by physical experiment', id: 'Tetapkan GPC band lewat eksperimen fisik' },
            { ja: 'センサー・記録・インターロック', en: 'Sensors, records, interlocks', id: 'Sensor, catatan, interlock' }
          ] },
          right: { title: { ja: '人起因のバラツキ → GPC-H', en: 'Human-caused variation → GPC-H', id: 'Variasi karena manusia → GPC-H' }, tone: 'green', items: [
            { ja: '4M標準化で標準作業を定義', en: 'Define standard work through 4M standardization', id: 'Definisikan kerja standar melalui standardisasi 4M' },
            { ja: 'ECRSと動作安定の原理で作業設計', en: 'Design work with ECRS and motion stability principles', id: 'Rancang kerja dengan ECRS dan prinsip stabilitas gerakan' },
            { ja: 'CT計測とV.Scoreで評価', en: 'Evaluate with CT measurement and V.Score', id: 'Evaluasi dengan pengukuran CT dan V.Score' }
          ] }
        }
      ]
    },
    {
      id: 'gpcm',
      title: { ja: 'GPC-M：設備制御', en: 'GPC-M: machine control', id: 'GPC-M: kontrol mesin' },
      blocks: [
        { type: 'p', text: {
          ja: '[[gpc-m]]は「**設備パラメータの範囲制御**」に特化した手法です。7つのバラツキ要因のうち Machine（設備）、Material（材料）、Environment（環境）が主な対象で、Measurement（測定）はGPC-M/Hの両方にまたがります。',
          en: '[[gpc-m]] is the method specialised in **range control of machine parameters**. Among the seven variation factors, it mainly handles Machine, Material and Environment; Measurement spans both GPC-M and GPC-H.',
          id: '[[gpc-m]] adalah metode khusus untuk **kontrol rentang parameter mesin**. Dari tujuh faktor variasi, terutama menangani Machine, Material, dan Environment; Measurement mencakup GPC-M dan GPC-H.'
        } },
        { type: 'flow', dir: 'h', nodes: [
          { title: { ja: '① 物理実験', en: '① Physical experiment', id: '① Eksperimen fisik' }, text: { ja: '条件を振って良品範囲を確認し、GPCバンドを決定', en: 'Vary conditions, confirm the good range, set the GPC band', id: 'Variasikan kondisi, pastikan rentang baik, tetapkan GPC band' }, tone: 'blue' },
          { title: { ja: '② 記録・監視', en: '② Record & monitor', id: '② Catat & pantau' }, text: { ja: 'センサーまたは定点サンプリングで連続監視', en: 'Continuous monitoring by sensors or fixed-time sampling', id: 'Pemantauan terus-menerus dengan sensor atau sampling berkala' }, tone: 'blue' },
          { title: { ja: '③ 評価', en: '③ Evaluate', id: '③ Evaluasi' }, text: { ja: 'GPCバンド適合率・OEE・不良率・管理図', en: 'Band conformance, OEE, defect rate, control chart', id: 'Kesesuaian band, OEE, tingkat cacat, peta kontrol' }, tone: 'green' }
        ] },
        { type: 'table',
          head: [ { ja: '指標', en: 'Metric', id: 'Metrik' }, { ja: '定義', en: 'Definition', id: 'Definisi' }, { ja: '目標値', en: 'Target', id: 'Target' } ],
          rows: [
            [ { ja: '[[band-conformance-rate]]', en: '[[band-conformance-rate]]', id: '[[band-conformance-rate]]' }, { ja: 'GPCバンド内に収まった割合', en: 'Share of values inside the GPC band', id: 'Persentase nilai di dalam GPC band' }, '≥ 99%' ],
            [ { ja: '[[defect-rate]]', en: '[[defect-rate]]', id: '[[defect-rate]]' }, { ja: '（Rework ＋ Repair ＋ Scrap）÷ 総生産数（Trialを除く）', en: '(Rework + Repair + Scrap) ÷ total production (excluding Trial)', id: '(Rework + Repair + Scrap) ÷ total produksi (tanpa Trial)' }, { ja: '製品・工程ごとに設定', en: 'Set per product and process', id: 'Ditetapkan per produk dan proses' } ],
            [ { ja: '[[oee|OEE]]（設備総合効率）', en: '[[oee|OEE]] (overall equipment effectiveness)', id: '[[oee|OEE]] (efektivitas peralatan keseluruhan)' }, { ja: '時間稼働率 × 性能稼働率 × 良品率', en: 'Availability × Performance × Yield rate', id: 'Availability × Performance × Rasio produk baik' }, '≥ 85%' ],
            [ { ja: '[[xbar-r-chart]]', en: '[[xbar-r-chart]]', id: '[[xbar-r-chart]]' }, { ja: 'プロセス平均とバラツキの時系列推移', en: 'Time series of process mean and range', id: 'Deret waktu rata-rata proses dan rentang' }, { ja: '管理限界内', en: 'Within control limits', id: 'Dalam batas kontrol' } ]
          ],
          caption: { ja: 'GPC-M評価指標（仕様書v29 16.1）', en: 'GPC-M metrics (spec v29, 16.1)', id: 'Metrik GPC-M (spesifikasi v29, 16.1)' }
        },
        { type: 'callout', kind: 'note', title: { ja: 'OEEはなぜGPC-Mの指標なのか', en: 'Why is OEE a GPC-M metric?', id: 'Mengapa OEE metrik GPC-M?' }, text: {
          ja: 'OEEは設備の総合的な生産効率を表す指標です。人の作業バラツキはV.ScoreとCT達成率で直接評価するため、OEEはGPC-M側に分類されています（過去の版ではGPC-Hに置かれていたこともありますが、現行の体系ではGPC-Mです）。',
          en: 'OEE expresses the overall production effectiveness of equipment. Human work variation is evaluated directly with V.Score and CT achievement rate, so OEE belongs to GPC-M (older versions once placed it under GPC-H, but in the current system it is GPC-M).',
          id: 'OEE menyatakan efektivitas produksi keseluruhan peralatan. Variasi kerja manusia dievaluasi langsung dengan V.Score dan tingkat pencapaian CT, jadi OEE termasuk GPC-M (versi lama pernah menempatkannya di GPC-H, tetapi dalam sistem saat ini termasuk GPC-M).'
        } }
      ]
    },
    {
      id: 'gpch',
      title: { ja: 'GPC-H：人制御', en: 'GPC-H: human control', id: 'GPC-H: kontrol manusia' },
      blocks: [
        { type: 'p', text: {
          ja: '[[gpc-h]]は「**人の作業バラツキの排除**」に特化した手法です。「バラツキ＝標準化不足の証拠」という考え方に基づき、[[4m]]標準化によって作業バラツキを取り除きます。対象はMan（人）、Method（方法）、Management（管理）が中心です。',
          en: '[[gpc-h]] is the method specialised in **eliminating human work variation**. Based on the idea that "variation = evidence of insufficient standardization", it removes work variation through [[4m]] standardization. It mainly handles Man, Method and Management.',
          id: '[[gpc-h]] adalah metode khusus untuk **menghilangkan variasi kerja manusia**. Berdasarkan gagasan bahwa "variasi = bukti standardisasi yang kurang", metode ini menghilangkan variasi kerja melalui standardisasi [[4m]]. Terutama menangani Man, Method, dan Management.'
        } },
        { type: 'flow', dir: 'h', nodes: [
          { title: { ja: '① 作業設計', en: '① Design the work', id: '① Rancang kerja' }, text: { ja: '[[ecrs]]と[[motion-stability]]で「ブレない作業」をつくる', en: 'Build stable work with [[ecrs]] and [[motion-stability]]', id: 'Bangun kerja stabil dengan [[ecrs]] dan [[motion-stability]]' }, tone: 'green' },
          { title: { ja: '② 標準化', en: '② Standardize', id: '② Standarkan' }, text: { ja: '4M標準化で[[standard-work]]を定義（誰が読んでも一通り）', en: 'Define [[standard-work]] with 4M standards (only one interpretation)', id: 'Definisikan [[standard-work]] dengan standar 4M (hanya satu tafsiran)' }, tone: 'green' },
          { title: { ja: '③ 計測', en: '③ Measure', id: '③ Ukur' }, text: { ja: 'CT計測（ストップウォッチ・動画）でバラツキを数値化', en: 'Quantify variation with CT measurement (stopwatch, video)', id: 'Kuantifikasi variasi dengan pengukuran CT (stopwatch, video)' }, tone: 'blue' },
          { title: { ja: '④ 評価', en: '④ Evaluate', id: '④ Evaluasi' }, text: { ja: 'V.Score（σ/μ）とCT達成率', en: 'V.Score (σ/μ) and CT achievement rate', id: 'V.Score (σ/μ) dan tingkat pencapaian CT' }, tone: 'navy' }
        ] },
        { type: 'table',
          head: [ { ja: '指標', en: 'Metric', id: 'Metrik' }, { ja: '定義', en: 'Definition', id: 'Definisi' }, { ja: '目標値', en: 'Target', id: 'Target' } ],
          rows: [
            [ { ja: '[[v-score]]（σ/μ）', en: '[[v-score]] (σ/μ)', id: '[[v-score]] (σ/μ)' }, { ja: '作業時間の変動係数', en: 'Coefficient of variation of work time', id: 'Koefisien variasi waktu kerja' }, '< 0.1' ],
            [ { ja: '[[ct-achievement-rate]]', en: '[[ct-achievement-rate]]', id: '[[ct-achievement-rate]]' }, { ja: '標準CT以内で完了した割合', en: 'Share of cycles finished within the standard CT', id: 'Persentase siklus selesai dalam CT standar' }, '≥ 95%' ]
          ],
          caption: { ja: 'GPC-H 評価指標', en: 'GPC-H metrics', id: 'Metrik GPC-H' }
        },
        { type: 'widget', name: 'sort-game', props: {
          title: { ja: 'このバラツキはGPC-M？GPC-H？', en: 'Is this variation GPC-M or GPC-H?', id: 'Variasi ini GPC-M atau GPC-H?' },
          bins: [
            { id: 'm', label: { ja: 'GPC-M（設備制御）', en: 'GPC-M (machine)', id: 'GPC-M (mesin)' }, tone: 'blue' },
            { id: 'h', label: { ja: 'GPC-H（人制御）', en: 'GPC-H (human)', id: 'GPC-H (manusia)' }, tone: 'green' }
          ],
          items: [
            { text: { ja: '成形機の金型温度が時間帯によって±8℃変動する', en: 'Mold temperature of a molding machine fluctuates ±8°C by time of day', id: 'Suhu cetakan mesin molding berfluktuasi ±8°C tergantung waktu' }, bin: 'm', explain: { ja: '設備パラメータの変動。GPCバンドで範囲制御します。', en: 'Machine parameter fluctuation — range control with a GPC band.', id: 'Fluktuasi parameter mesin — kontrol rentang dengan GPC band.' } },
            { text: { ja: '作業者によってネジを締める順番が違う', en: 'Operators tighten screws in different orders', id: 'Operator mengencangkan sekrup dengan urutan berbeda' }, bin: 'h', explain: { ja: '手順の解釈違い＝Methodのバラツキ。標準作業で順番を一通りに決めます。', en: 'Different interpretation of the procedure = Method variation. Fix one order in standard work.', id: 'Tafsiran prosedur berbeda = variasi Method. Tetapkan satu urutan dalam kerja standar.' } },
            { text: { ja: '同じ作業者でも部品を取る時間が毎回2〜6秒とばらつく', en: 'Even for one operator, picking a part takes 2–6 seconds each time', id: 'Bahkan untuk satu operator, mengambil part butuh 2–6 detik tiap kali' }, bin: 'h', explain: { ja: '部品配置・動作の問題。動作安定の原理で作業を設計し直します。', en: 'A layout/motion issue — redesign with the motion stability principles.', id: 'Masalah tata letak/gerakan — rancang ulang dengan prinsip stabilitas gerakan.' } },
            { text: { ja: '接着剤の吐出圧が工場の湿度とともに変化する', en: 'Adhesive dispensing pressure changes with humidity', id: 'Tekanan dispensing lem berubah mengikuti kelembapan' }, bin: 'm', explain: { ja: '設備パラメータと環境の問題。条件範囲と環境範囲を管理します。', en: 'Machine parameter and environment — control condition and environment ranges.', id: 'Parameter mesin dan lingkungan — kendalikan rentang kondisi dan lingkungan.' } },
            { text: { ja: '新人とベテランで検査の判定が分かれる', en: 'New and veteran operators judge inspection differently', id: 'Operator baru dan senior menilai inspeksi secara berbeda' }, bin: 'h', explain: { ja: '判断基準の曖昧さ。限度見本や標準の明確化で人のバラツキを排除します。', en: 'Ambiguous criteria — remove human variation with limit samples and clear standards.', id: 'Kriteria ambigu — hilangkan variasi manusia dengan sampel batas dan standar yang jelas.' } },
            { text: { ja: '工具の摩耗で加工寸法が徐々にずれていく', en: 'Machined dimension drifts gradually due to tool wear', id: 'Dimensi hasil pemesinan bergeser perlahan karena keausan alat' }, bin: 'm', explain: { ja: '設備・治工具の状態変化。交換周期や補正条件を範囲で管理します。', en: 'Change in machine/tool condition — manage replacement cycle and offsets by range.', id: 'Perubahan kondisi mesin/alat — kelola siklus penggantian dan koreksi berdasarkan rentang.' } },
            { text: { ja: '段取り替えの手順が班ごとに違い、立上げ時間がばらつく', en: 'Changeover steps differ by team, so start-up time varies', id: 'Langkah changeover berbeda tiap tim, sehingga waktu start-up bervariasi' }, bin: 'h', explain: { ja: '段取り管理（Management）と手順（Method）の問題。標準化で排除します。', en: 'Management and Method issue — eliminate through standardization.', id: 'Masalah Management dan Method — hilangkan melalui standardisasi.' } },
            { text: { ja: '炉のコンベア速度が設定値から外れることがある', en: 'Oven conveyor speed sometimes deviates from its setting', id: 'Kecepatan konveyor oven kadang menyimpang dari setelannya' }, bin: 'm', explain: { ja: '設備パラメータ。GPCバンド監視とアラート／インターロックで制御します。', en: 'Machine parameter — GPC band monitoring with alarms / interlocks.', id: 'Parameter mesin — pemantauan GPC band dengan alarm / interlock.' } }
          ]
        } }
      ]
    },
    {
      id: 'vscore',
      title: { ja: 'V.Scoreの計算と判定', en: 'Calculating and judging V.Score', id: 'Menghitung dan menilai V.Score' },
      blocks: [
        { type: 'formula', expr: { ja: 'V.Score = σ ÷ μ', en: 'V.Score = σ ÷ μ', id: 'V.Score = σ ÷ μ' }, where: [
          { sym: 'σ', text: { ja: '作業時間（CT）の標準偏差', en: 'Standard deviation of work time (CT)', id: 'Simpangan baku waktu kerja (CT)' } },
          { sym: 'μ', text: { ja: '作業時間（CT）の平均値', en: 'Mean of work time (CT)', id: 'Rata-rata waktu kerja (CT)' } }
        ], note: { ja: '変動係数（CV）と同じ。平均値に対する相対的なバラツキなので、CTの長さが違う工程どうしでも公平に比較できます。', en: 'Same as the coefficient of variation (CV). Because it is relative to the mean, processes with different CT lengths can be compared fairly.', id: 'Sama dengan koefisien variasi (CV). Karena relatif terhadap rata-rata, proses dengan panjang CT berbeda dapat dibandingkan secara adil.' } },
        { type: 'table',
          head: [ { ja: 'V.Score', en: 'V.Score', id: 'V.Score' }, { ja: '判定', en: 'Judgment', id: 'Penilaian' }, { ja: '意味', en: 'Meaning', id: 'Arti' } ],
          rows: [
            [ { ja: '< 0.1', en: '< 0.1', id: '< 0,1' }, { ja: '極めて安定', en: 'Extremely stable', id: 'Sangat stabil' }, { ja: '狙いどおりのペースで流れている', en: 'The line runs at the pace it was designed for', id: 'Lini berjalan pada laju yang dirancang' } ],
            [ { ja: '0.1 – 0.3', en: '0.1 – 0.3', id: '0,1 – 0,3' }, { ja: '安定', en: 'Stable', id: 'Stabil' }, { ja: '標準作業が機能している', en: 'Standard work is working', id: 'Kerja standar berjalan' } ],
            [ { ja: '0.3 – 0.5', en: '0.3 – 0.5', id: '0,3 – 0,5' }, { ja: 'やや不安定', en: 'Slightly unstable', id: 'Agak tidak stabil' }, { ja: '改善の余地がある', en: 'There is room to improve', id: 'Masih ada ruang perbaikan' } ],
            [ { ja: '0.5 – 1.0', en: '0.5 – 1.0', id: '0,5 – 1,0' }, { ja: '不安定', en: 'Unstable', id: 'Tidak stabil' }, { ja: '標準作業を見直す', en: 'Revisit the standard work', id: 'Tinjau ulang kerja standar' } ],
            [ { ja: '≥ 1.0', en: '≥ 1.0', id: '≥ 1,0' }, { ja: '非常に不安定', en: 'Very unstable', id: 'Sangat tidak stabil' }, { ja: '毎回のやり方が違う', en: 'Every cycle is done differently', id: 'Setiap siklus dikerjakan berbeda' } ]
          ],
          caption: { ja: 'V.Scoreの判定（仕様書v29 16.4）。GPC-Hの目標値は0.1未満', en: 'How to read V.Score (spec v29, 16.4). The GPC-H target is < 0.1', id: 'Cara membaca V.Score (spesifikasi v29, 16.4). Target GPC-H adalah < 0,1' }
        },
        { type: 'example', title: { ja: '計算例：2人の作業者（数値は説明用）', en: 'Worked example: two operators (illustrative)', id: 'Contoh: dua operator (ilustrasi)' }, steps: [
          { ja: '作業者A：30, 31, 29, 30, 32, 29, 30, 31 秒 → μ ≒ 30.3、σ ≒ 1.0', en: 'Operator A: 30, 31, 29, 30, 32, 29, 30, 31 s → μ ≈ 30.3, σ ≈ 1.0', id: 'Operator A: 30, 31, 29, 30, 32, 29, 30, 31 dtk → μ ≈ 30,3, σ ≈ 1,0' },
          { ja: 'V.Score(A) = 1.0 ÷ 30.3 ≒ 0.03 → 極めて安定', en: 'V.Score(A) = 1.0 ÷ 30.3 ≈ 0.03 → Extremely stable', id: 'V.Score(A) = 1,0 ÷ 30,3 ≈ 0,03 → Sangat stabil' },
          { ja: '作業者B：19, 42, 23, 39, 17, 45, 22, 35 秒 → μ ≒ 30.3、σ ≒ 11.2', en: 'Operator B: 19, 42, 23, 39, 17, 45, 22, 35 s → μ ≈ 30.3, σ ≈ 11.2', id: 'Operator B: 19, 42, 23, 39, 17, 45, 22, 35 dtk → μ ≈ 30,3, σ ≈ 11,2' },
          { ja: 'V.Score(B) = 11.2 ÷ 30.3 ≒ 0.37 → やや不安定', en: 'V.Score(B) = 11.2 ÷ 30.3 ≈ 0.37 → Slightly unstable', id: 'V.Score(B) = 11,2 ÷ 30,3 ≈ 0,37 → Agak tidak stabil' }
        ], result: { ja: '平均はほぼ同じでも、Bの作業は標準化不足。平均だけで評価すると見逃します。', en: 'The means are almost the same, but B lacks standardization. Looking only at averages would miss it.', id: 'Rata-ratanya hampir sama, tetapi B kurang standardisasi. Jika hanya melihat rata-rata, hal ini terlewat.' } },
        { type: 'widget', name: 'vscore-calc', props: { a: [30, 31, 29, 30, 32, 29, 30, 31], b: [19, 42, 23, 39, 17, 45, 22, 35] } },
        { type: 'formula', expr: { ja: 'CT達成率 = 標準CT以内で完了したサイクル数 ÷ 全サイクル数 × 100%', en: 'CT achievement rate = cycles finished within standard CT ÷ all cycles × 100%', id: 'Tingkat pencapaian CT = siklus selesai dalam CT standar ÷ semua siklus × 100%' }, note: { ja: '目標 ≧ 95%。上の例で標準CTを32秒とすると、Aは8/8=100%、Bは4/8=50%です。', en: 'Target ≥ 95%. With a standard CT of 32 s in the example above, A = 8/8 = 100%, B = 4/8 = 50%.', id: 'Target ≥ 95%. Dengan CT standar 32 dtk pada contoh di atas, A = 8/8 = 100%, B = 4/8 = 50%.' } }
      ]
    },
    {
      id: 'stable',
      title: { ja: '指標を読む前の前提：安定状態', en: 'Before reading metrics: stability', id: 'Sebelum membaca metrik: kestabilan' },
      blocks: [
        { type: 'quote', text: {
          ja: '安定状態（統計的管理状態）にない工程には、定義可能な工程能力が存在しない。',
          en: 'A process that is not in a stable state (statistical control) has no definable process capability.',
          id: 'Proses yang tidak berada dalam kondisi stabil (kendali statistik) tidak memiliki kapabilitas proses yang dapat didefinisikan.'
        }, cite: { ja: 'シューハートの原則', en: 'Shewhart’s principle', id: 'Prinsip Shewhart' } },
        { type: 'p', text: {
          ja: '不良率やV.Scoreは、データさえあれば**計算はできます**。しかし特殊原因による変動が残る不安定な工程では、今日のデータは明日の工程を予測しません。そのため数値そのものに意味がありません。ZEVAでは、まず[[xbar-r-chart]]などで工程が[[statistical-control]]にあることを確認してから、不良率などの指標を評価します。',
          en: 'The defect rate and V.Score **can be calculated** whenever you have data. But in an unstable process with special-cause variation remaining, today’s data does not predict tomorrow’s process, so the numbers themselves have no meaning. In ZEVA, first confirm the process is in [[statistical-control]] with an [[xbar-r-chart]] or similar, then evaluate the defect rate and the other metrics.',
          id: 'Tingkat cacat dan V.Score **dapat dihitung** selama ada data. Namun pada proses tidak stabil yang masih memiliki variasi penyebab khusus, data hari ini tidak memprediksi proses besok, sehingga angkanya tidak bermakna. Dalam ZEVA, pastikan dulu proses berada dalam [[statistical-control]] dengan [[xbar-r-chart]] atau sejenisnya, lalu evaluasi tingkat cacat dan metrik lain.'
        } },
        { type: 'callout', kind: 'zeva', title: { ja: '指標＝データ信頼性の見える化', en: 'Metrics = visualising data reliability', id: 'Metrik = visualisasi keandalan data' }, text: {
          ja: '評価指標は、バラツキを定量化することで[[data-reliability]]を可視化する仕組みでもあります。V.Scoreや不良率が改善することは、データに基づくアクションを起こせる状態に近づいていることを意味します。',
          en: 'Metrics are also a mechanism that visualises [[data-reliability]] by quantifying variation. When V.Score or the defect rate improves, you are getting closer to a state where data-based actions are possible.',
          id: 'Metrik juga merupakan mekanisme yang memvisualisasikan [[data-reliability]] dengan mengkuantifikasi variasi. Saat V.Score atau tingkat cacat membaik, Anda semakin dekat ke kondisi di mana tindakan berbasis data dapat dilakukan.'
        } },
        { type: 'check', q: { ja: 'ある工程の不良率が0.05%と計算された。しかし管理図に管理限界外の点が多数ある。正しい解釈は？', en: 'A process shows a defect rate of 0.05%, but its control chart has many points outside the control limits. Correct interpretation?', id: 'Suatu proses menunjukkan tingkat cacat 0,05%, tetapi peta kontrolnya memiliki banyak titik di luar batas kontrol. Interpretasi yang benar?' }, choices: [
          { ja: '目標を下回っているので工程は十分', en: 'It is below target, so the process is fine', id: 'Sudah di bawah target, jadi proses memadai' },
          { ja: '工程が安定していないので、この数値は意味を持たない', en: 'The process is not stable, so this figure has no meaning', id: 'Proses tidak stabil, jadi angka ini tidak bermakna' },
          { ja: '管理限界を広げればよい', en: 'Just widen the control limits', id: 'Cukup perlebar batas kontrol' }
        ], answer: 1, explain: { ja: 'シューハートの原則により、安定状態が確認されるまで指標は解釈できません。まず特殊原因を取り除きます。', en: 'By Shewhart’s principle, the metrics cannot be interpreted until stability is confirmed. Remove special causes first.', id: 'Menurut prinsip Shewhart, metrik tidak dapat ditafsirkan sampai kestabilan dikonfirmasi. Hilangkan penyebab khusus terlebih dahulu.' } }
      ]
    }
  ],
  keyPoints: [
    { ja: 'バラツキの発生源に合わせて GPC-M（設備）と GPC-H（人）を使い分ける', en: 'Use GPC-M (machine) or GPC-H (human) according to the source of variation', id: 'Gunakan GPC-M (mesin) atau GPC-H (manusia) sesuai sumber variasi' },
    { ja: 'GPC-M：物理実験→GPCバンド→記録監視。指標はバンド適合率≧99%、OEE≧85%、X̄-R管理限界内、不良率は製品・工程ごとの目標', en: 'GPC-M: experiment → GPC band → record & monitor. Metrics: band conformance ≥ 99%, OEE ≥ 85%, X̄-R within limits, defect rate against a per-product target', id: 'GPC-M: eksperimen → GPC band → catat & pantau. Metrik: kesesuaian band ≥ 99%, OEE ≥ 85%, X̄-R dalam batas, tingkat cacat terhadap target per produk' },
    { ja: 'GPC-H：ECRS＋動作安定→4M標準→CT計測。指標はV.Score<0.1、CT達成率≧95%', en: 'GPC-H: ECRS + motion stability → 4M standards → CT measurement. Metrics: V.Score < 0.1, CT achievement ≥ 95%', id: 'GPC-H: ECRS + stabilitas gerakan → standar 4M → pengukuran CT. Metrik: V.Score < 0,1, pencapaian CT ≥ 95%' },
    { ja: 'V.Score＝σ/μ。平均が同じでもバラツキの差が見える', en: 'V.Score = σ/μ — reveals variation differences even when means are equal', id: 'V.Score = σ/μ — menunjukkan perbedaan variasi meski rata-rata sama' },
    { ja: '指標の解釈は安定状態の確認が前提（シューハートの原則）', en: 'Interpreting metrics requires confirming stability first (Shewhart’s principle)', id: 'Menafsirkan metrik mensyaratkan konfirmasi kestabilan terlebih dahulu (prinsip Shewhart)' }
  ],
  quiz: [
    { q: { ja: 'GPC-Hの評価指標の組み合わせとして正しいのは？', en: 'Which pair are the GPC-H metrics?', id: 'Pasangan mana yang merupakan metrik GPC-H?' }, choices: [
      { ja: 'OEE と 不良率', en: 'OEE and the defect rate', id: 'OEE dan tingkat cacat' },
      { ja: 'V.Score と CT達成率', en: 'V.Score and CT achievement rate', id: 'V.Score dan tingkat pencapaian CT' },
      { ja: 'GPCバンド適合率 と OEE', en: 'Band conformance rate and OEE', id: 'Tingkat kesesuaian band dan OEE' },
      { ja: '不良率 と 在庫回転率', en: 'Defect rate and inventory turnover', id: 'Tingkat cacat dan perputaran persediaan' }
    ], answer: 1, explain: { ja: 'GPC-HはV.Score（<0.1）とCT達成率（≧95%）で評価します。', en: 'GPC-H is evaluated by V.Score (< 0.1) and CT achievement rate (≥ 95%).', id: 'GPC-H dievaluasi dengan V.Score (< 0,1) dan tingkat pencapaian CT (≥ 95%).' } },
    { q: { ja: 'OEEはどちらの評価指標に分類される？', en: 'OEE is classified under which metrics?', id: 'OEE diklasifikasikan ke metrik mana?' }, choices: [
      { ja: 'GPC-M', en: 'GPC-M', id: 'GPC-M' },
      { ja: 'GPC-H', en: 'GPC-H', id: 'GPC-H' },
      { ja: '両方に同じ重みで属する', en: 'Both equally', id: 'Keduanya sama rata' },
      { ja: 'どちらにも属さない', en: 'Neither', id: 'Tidak keduanya' }
    ], answer: 0, explain: { ja: 'OEEは設備の総合効率を表すため、GPC-Mの指標です。', en: 'OEE expresses equipment effectiveness, so it is a GPC-M metric.', id: 'OEE menyatakan efektivitas peralatan, jadi termasuk metrik GPC-M.' } },
    { q: { ja: 'CTの平均40秒、標準偏差6秒。V.Scoreと判定は？', en: 'CT mean 40 s, standard deviation 6 s. V.Score and judgment?', id: 'Rata-rata CT 40 dtk, simpangan baku 6 dtk. V.Score dan penilaian?' }, choices: [
      { ja: '0.15、安定', en: '0.15, Stable', id: '0,15, Stabil' },
      { ja: '0.15、極めて安定', en: '0.15, Extremely stable', id: '0,15, Sangat stabil' },
      { ja: '6.7、非常に不安定', en: '6.7, Very unstable', id: '6,7, Sangat tidak stabil' },
      { ja: '0.25、やや不安定', en: '0.25, Slightly unstable', id: '0,25, Agak tidak stabil' }
    ], answer: 0, explain: { ja: '6 ÷ 40 = 0.15。0.1〜0.3は「安定（標準作業が機能）」です。', en: '6 ÷ 40 = 0.15. 0.1–0.3 is "stable (standard work is working)".', id: '6 ÷ 40 = 0,15. 0,1–0,3 adalah "stabil (kerja standar berjalan)".' } },
    { q: { ja: 'V.Scoreを標準偏差ではなく σ/μ で表す主な理由は？', en: 'Main reason V.Score uses σ/μ rather than σ alone?', id: 'Alasan utama V.Score memakai σ/μ bukan σ saja?' }, choices: [
      { ja: '計算が簡単だから', en: 'It is easier to calculate', id: 'Lebih mudah dihitung' },
      { ja: 'CTの長さが違う工程どうしを公平に比較できるから', en: 'Processes with different CT lengths can be compared fairly', id: 'Proses dengan panjang CT berbeda dapat dibandingkan adil' },
      { ja: '値が必ず1以下になるから', en: 'The value is always below 1', id: 'Nilainya selalu di bawah 1' },
      { ja: '平均を無視できるから', en: 'The mean can be ignored', id: 'Rata-rata dapat diabaikan' }
    ], answer: 1, explain: { ja: 'σ=2秒でも平均10秒と100秒では意味が違います。σ/μなら相対的に比較できます。', en: 'σ = 2 s means different things for a 10 s and a 100 s mean. σ/μ allows relative comparison.', id: 'σ = 2 dtk berarti berbeda untuk rata-rata 10 dtk dan 100 dtk. σ/μ memungkinkan perbandingan relatif.' } },
    { q: { ja: 'GPC-Mの手法の流れとして正しい順番は？', en: 'Correct order of the GPC-M method?', id: 'Urutan metode GPC-M yang benar?' }, choices: [
      { ja: '記録で監視 → 物理実験 → 評価', en: 'Monitor by records → physical experiment → evaluate', id: 'Pantau dengan catatan → eksperimen fisik → evaluasi' },
      { ja: '物理実験でGPCバンド決定 → 記録で連続監視 → 適合率・OEE等で評価', en: 'Set GPC band by experiment → continuous monitoring by records → evaluate with conformance, OEE, etc.', id: 'Tetapkan GPC band lewat eksperimen → pantau terus dengan catatan → evaluasi dengan kesesuaian, OEE, dll.' },
      { ja: '標準作業書作成 → CT計測 → V.Score', en: 'Write standard work → CT measurement → V.Score', id: 'Tulis kerja standar → pengukuran CT → V.Score' },
      { ja: '管理限界を計算 → それをGPCバンドにする', en: 'Calculate control limits → use them as the GPC band', id: 'Hitung batas kontrol → jadikan GPC band' }
    ], answer: 1, explain: { ja: '③はGPC-Hの流れ、④はGPCバンドの物理的根拠を無視しています。', en: 'Option 3 is the GPC-H flow; option 4 ignores the physical basis of the GPC band.', id: 'Pilihan 3 adalah alur GPC-H; pilihan 4 mengabaikan dasar fisik GPC band.' } },
    { q: { ja: '「作業者によって部品の取り方が違い、CTがばらつく」。適した制御は？', en: '"Operators pick parts in different ways, so CT varies." Suitable control?', id: '"Operator mengambil part dengan cara berbeda, sehingga CT bervariasi." Kontrol yang sesuai?' }, choices: [
      { ja: 'GPC-M：設備パラメータの範囲制御', en: 'GPC-M: machine parameter range control', id: 'GPC-M: kontrol rentang parameter mesin' },
      { ja: 'GPC-H：4M標準化と動作安定の原理', en: 'GPC-H: 4M standardization and motion stability', id: 'GPC-H: standardisasi 4M dan stabilitas gerakan' },
      { ja: 'OEEを上げるために残業する', en: 'Work overtime to raise OEE', id: 'Lembur untuk menaikkan OEE' },
      { ja: '平均CTだけを管理する', en: 'Manage only the average CT', id: 'Kelola hanya CT rata-rata' }
    ], answer: 1, explain: { ja: '人起因のバラツキはGPC-Hで、作業設計と標準化により排除します。', en: 'Human-caused variation is handled by GPC-H through work design and standardization.', id: 'Variasi karena manusia ditangani GPC-H melalui desain kerja dan standardisasi.' } },
    { q: { ja: '指標を評価する前に確認すべきことは？', en: 'What must be confirmed before evaluating the metrics?', id: 'Apa yang harus dikonfirmasi sebelum mengevaluasi metrik?' }, choices: [
      { ja: 'デジタル化レベルが3であること', en: 'That the digital level is 3', id: 'Bahwa level digital adalah 3' },
      { ja: '工程が安定状態（統計的管理状態）にあること', en: 'That the process is in a stable state (statistical control)', id: 'Bahwa proses dalam kondisi stabil (kendali statistik)' },
      { ja: '平均値が規格の中心にあること', en: 'That the mean is at the centre of the spec', id: 'Bahwa rata-rata di tengah spesifikasi' },
      { ja: 'サンプル数が5個以下であること', en: 'That the sample size is 5 or less', id: 'Bahwa ukuran sampel 5 atau kurang' }
    ], answer: 1, explain: { ja: '安定状態にない工程には定義可能な工程能力が存在しません（シューハートの原則）。', en: 'A process not in statistical control has no definable capability (Shewhart’s principle).', id: 'Proses yang tidak dalam kendali statistik tidak memiliki kapabilitas yang dapat didefinisikan (prinsip Shewhart).' } }
  ]
});
