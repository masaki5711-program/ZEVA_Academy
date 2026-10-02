ZA.addModule({
  id: 'z2-04',
  track: 'z2',
  order: 4,
  minutes: 35,
  icon: '🚦',
  level: 2,
  prereq: ['z2-02'],
  title: { ja: 'ハイブリッド・トリアージ', en: 'Hybrid Triage', id: 'Hybrid Triage' },
  summary: {
    ja: 'すべての改善課題の入り口であるトリアージ（Phase 0）で、課題をQuick GPC（高速）とDeep GPC（深耕）に振り分ける方法を学びます。',
    en: 'Learn triage (Phase 0), the entrance to every improvement issue, which routes issues to Quick GPC (fast) or Deep GPC (deep).',
    id: 'Pelajari triase (Phase 0), pintu masuk setiap masalah perbaikan, yang mengarahkan masalah ke Quick GPC (cepat) atau Deep GPC (mendalam).'
  },
  objectives: [
    { ja: 'トリアージが必要な3つの理由を説明できる', en: 'Explain three reasons why triage is needed', id: 'Menjelaskan tiga alasan mengapa triase diperlukan' },
    { ja: '4つの判定基準で課題を評価できる', en: 'Evaluate an issue with the four criteria', id: 'Mengevaluasi masalah dengan empat kriteria' },
    { ja: 'フローチャートに沿ってQuick / Deepを判定できる', en: 'Decide Quick / Deep by following the flowchart', id: 'Menentukan Quick / Deep mengikuti diagram alir' },
    { ja: 'グレーゾーンの扱いを説明できる', en: 'Explain how to handle the gray zone', id: 'Menjelaskan cara menangani zona abu-abu' }
  ],
  sections: [
    {
      id: 'why',
      title: { ja: 'なぜトリアージが必要か', en: 'Why triage is needed', id: 'Mengapa triase diperlukan' },
      blocks: [
        { type: 'p', text: {
          ja: '製造現場の改善課題は、原因が明白ですぐ対処できるものから、複数の要因が絡み合い統計的な分析を要するものまでさまざまです。これらを**画一的な改善プロセス**で処理すると、次の3つの問題が生じます。',
          en: 'Improvement issues on the shop floor range from those with an obvious cause that can be fixed at once, to those where many factors interact and statistical analysis is needed. Handling them all with **one uniform improvement process** causes three problems.',
          id: 'Masalah perbaikan di lantai produksi beragam, dari yang penyebabnya jelas dan bisa langsung diatasi, hingga yang banyak faktornya saling terkait dan butuh analisis statistik. Menangani semuanya dengan **satu proses perbaikan seragam** menimbulkan tiga masalah.'
        } },
        { type: 'cards', cols: 3, items: [
          { icon: '🐘', title: { ja: 'オーバークオリティ', en: 'Over-quality', id: 'Kualitas berlebihan' }, text: { ja: '軽微な問題に重厚なDMAICを適用し、リソースを浪費する', en: 'Applying heavy DMAIC to minor issues wastes resources', id: 'Menerapkan DMAIC yang berat pada masalah kecil memboroskan sumber daya' }, tone: 'amber' },
          { icon: '🪫', title: { ja: '解決力不足', en: 'Lack of solving power', id: 'Kurang daya penyelesaian' }, text: { ja: '複雑な複合要因に直感的なトライを適用し、根本原因に到達できない', en: 'Applying intuitive trials to complex multi-factor issues never reaches the root cause', id: 'Menerapkan uji coba intuitif pada masalah multi-faktor yang kompleks tidak mencapai akar penyebab' }, tone: 'red' },
          { icon: '🌀', title: { ja: '速度の矛盾', en: 'Speed contradiction', id: 'Kontradiksi kecepatan' }, text: { ja: '「とにかくやってみる」と「統計的に証明する」を無理に混ぜ、両方の良さを殺す', en: 'Forcing "just try it" and "prove it statistically" together kills the strengths of both', id: 'Memaksa menggabungkan "coba saja" dan "buktikan secara statistik" mematikan kelebihan keduanya' }, tone: 'gray' }
        ] },
        { type: 'callout', kind: 'key', title: { ja: 'コンセプト', en: 'Concept', id: 'Konsep' }, text: {
          ja: 'すべての課題を同じ手順で処理するのではなく、**入り口で**「Quick GPCモード（高速）」と「Deep GPCモード（深耕）」に振り分ける。',
          en: 'Instead of handling every issue with the same procedure, route issues **at the entrance** to Quick GPC mode (fast) or Deep GPC mode (deep).',
          id: 'Alih-alih menangani setiap masalah dengan prosedur yang sama, arahkan masalah **di pintu masuk** ke mode Quick GPC (cepat) atau Deep GPC (mendalam).'
        } },
        { type: 'p', text: {
          ja: '[[hybrid-triage]]は、医療のトリアージ（緊急度に応じて患者を振り分ける仕組み）に着想を得ています。救急外来で軽い擦り傷と重い外傷を同じ手順で診ないように、改善課題も性質に応じて最適な「速度（ギア）」を選びます。',
          en: '[[hybrid-triage]] is inspired by medical triage (sorting patients by urgency). Just as an emergency room does not treat a light scratch and a severe injury with the same procedure, improvement issues get the best "speed (gear)" for their nature.',
          id: '[[hybrid-triage]] terinspirasi dari triase medis (memilah pasien berdasarkan urgensi). Seperti UGD tidak menangani luka ringan dan cedera berat dengan prosedur yang sama, masalah perbaikan mendapat "kecepatan (gigi)" terbaik sesuai sifatnya.'
        } }
      ]
    },
    {
      id: 'modes',
      title: { ja: '2つのモード', en: 'The two modes', id: 'Dua mode' },
      blocks: [
        { type: 'table',
          head: [ { ja: 'モード', en: 'Mode', id: 'Mode' }, { ja: '対象', en: 'Target issues', id: 'Sasaran masalah' }, { ja: '期間', en: 'Duration', id: 'Durasi' }, { ja: 'サイクル', en: 'Cycle', id: 'Siklus' }, { ja: 'アプローチ', en: 'Approach', id: 'Pendekatan' } ],
          rows: [
            [ { ja: '[[quick-gpc]]（高速改善）', en: '[[quick-gpc]] (fast improvement)', id: '[[quick-gpc]] (perbaikan cepat)' }, { ja: '原因仮説あり・低リスク・単変量', en: 'Cause hypothesis, low risk, single variable', id: 'Ada hipotesis penyebab, risiko rendah, variabel tunggal' }, { ja: '1日〜1週間', en: '1 day – 1 week', id: '1 hari – 1 minggu' }, 'H-T-C-A', { ja: '走りながら考える。小さなトライの量産', en: 'Think while running. Mass-produce small trials', id: 'Berpikir sambil berjalan. Produksi massal uji coba kecil' } ],
            [ { ja: '[[deep-gpc]]（深耕解析）', en: '[[deep-gpc]] (deep analysis)', id: '[[deep-gpc]] (analisis mendalam)' }, { ja: '原因不明・高リスク・多変量', en: 'Unknown cause, high risk, multiple variables', id: 'Penyebab tidak diketahui, risiko tinggi, multi-variabel' }, { ja: '1〜3ヶ月', en: '1 – 3 months', id: '1 – 3 bulan' }, 'DMAIC', { ja: '止まって深く考える。統計的な根本原因特定', en: 'Stop and think deeply. Statistical root-cause identification', id: 'Berhenti dan berpikir mendalam. Identifikasi akar penyebab secara statistik' } ]
          ]
        },
        { type: 'callout', kind: 'note', title: { ja: 'デジタル化は加速装置', en: 'Digitalisation is an accelerator', id: 'Digitalisasi adalah akselerator' }, text: {
          ja: 'トリアージは紙のチェックリストでも実施できます。デジタル化は「必須条件」ではなく「加速装置（オプション）」で、Level 2ではWeb画面の対話形式、Level 3ではAIによる判定・推薦に発展させられます。',
          en: 'Triage can be done with a paper checklist. Digitalisation is not a prerequisite but an optional accelerator: at Level 2 it can be an interactive web form, at Level 3 AI-assisted judgment and recommendation.',
          id: 'Triase dapat dilakukan dengan daftar periksa kertas. Digitalisasi bukan prasyarat tetapi akselerator opsional: di Level 2 dapat berupa formulir web interaktif, di Level 3 penilaian dan rekomendasi berbantuan AI.'
        } }
      ]
    },
    {
      id: 'criteria',
      title: { ja: '4つの判定基準', en: 'The four criteria', id: 'Empat kriteria' },
      blocks: [
        { type: 'table',
          head: [ { ja: '判定基準', en: 'Criterion', id: 'Kriteria' }, { ja: '質問', en: 'Question', id: 'Pertanyaan' }, { ja: 'Quick GPC寄り', en: 'Toward Quick GPC', id: 'Mengarah Quick GPC' }, { ja: 'Deep GPC寄り', en: 'Toward Deep GPC', id: 'Mengarah Deep GPC' } ],
          rows: [
            [ { ja: '① 原因の見当', en: '① Cause idea', id: '① Dugaan penyebab' }, { ja: '原因に心当たりがあるか？', en: 'Do you have an idea of the cause?', id: 'Apakah ada dugaan penyebab?' }, { ja: 'ある（仮説が立つ）', en: 'Yes (hypothesis possible)', id: 'Ya (hipotesis dapat dibuat)' }, { ja: 'まったく不明', en: 'Completely unknown', id: 'Sama sekali tidak diketahui' } ],
            [ { ja: '② 変数の数', en: '② Number of variables', id: '② Jumlah variabel' }, { ja: '関連パラメータはいくつか？', en: 'How many related parameters?', id: 'Berapa parameter terkait?' }, { ja: '特定の1〜2個', en: 'Specific 1–2', id: 'Tertentu 1–2' }, { ja: '複合要因（多変数）', en: 'Compound (many variables)', id: 'Majemuk (banyak variabel)' } ],
            [ { ja: '③ リスク', en: '③ Risk', id: '③ Risiko' }, { ja: '失敗した場合の影響は？', en: 'Impact if it fails?', id: 'Dampak jika gagal?' }, { ja: '修正容易（Low）', en: 'Easy to revert (Low)', id: 'Mudah dikembalikan (Low)' }, { ja: '設備破損・人身事故リスク（High）', en: 'Equipment damage / injury risk (High)', id: 'Risiko kerusakan alat / cedera (High)' } ],
            [ { ja: '④ データ', en: '④ Data', id: '④ Data' }, { ja: 'データの入手性は？', en: 'Data availability?', id: 'Ketersediaan data?' }, { ja: '今すぐ取れる', en: 'Available right now', id: 'Tersedia sekarang' }, { ja: '長期間の収集が必要', en: 'Long collection needed', id: 'Perlu pengumpulan lama' } ]
          ],
          caption: { ja: 'トリアージ判定基準', en: 'Triage criteria', id: 'Kriteria triase' }
        },
        { type: 'callout', kind: 'zeva', title: { ja: '基準④と根底ロジック', en: 'Criterion ④ and the root logic', id: 'Kriteria ④ dan logika dasar' }, text: {
          ja: '基準④の「データ」は入手性だけでなく**信頼性（バラツキの程度）**も含みます。取得データのバラツキが大きく信頼できない場合は、まず標準化と測定の安定化によってデータの信頼性を確保することが先決です（[[root-logic]]）。',
          en: 'The "data" of criterion ④ includes not only availability but also **reliability (degree of variation)**. If the data varies so much that it cannot be trusted, first secure data reliability through standardization and stabilising measurement ([[root-logic]]).',
          id: '"Data" pada kriteria ④ mencakup bukan hanya ketersediaan tetapi juga **keandalan (tingkat variasi)**. Jika data sangat bervariasi sehingga tidak dapat dipercaya, pertama amankan keandalan data melalui standardisasi dan stabilisasi pengukuran ([[root-logic]]).'
        } },
        { type: 'h', text: { ja: '判定ロジック', en: 'Decision logic', id: 'Logika keputusan' } },
        { type: 'compare',
          left: { title: { ja: 'Route A：Quick GPC', en: 'Route A: Quick GPC', id: 'Route A: Quick GPC' }, tone: 'green', items: [
            { ja: '条件：原因仮説あり **AND** 低リスク **AND** 単変量', en: 'Condition: cause hypothesis **AND** low risk **AND** single variable', id: 'Syarat: ada hipotesis **AND** risiko rendah **AND** variabel tunggal' },
            { ja: 'すべてを満たしたときだけ選ぶ', en: 'Chosen only when all are met', id: 'Dipilih hanya jika semua terpenuhi' },
            { ja: '現場の気づきを即座に試し、成功体験とナレッジを量産', en: 'Try floor insights at once; mass-produce successes and knowledge', id: 'Coba ide lapangan segera; hasilkan banyak keberhasilan dan pengetahuan' }
          ] },
          right: { title: { ja: 'Route B：Deep GPC', en: 'Route B: Deep GPC', id: 'Route B: Deep GPC' }, tone: 'navy', items: [
            { ja: '条件：原因不明 **OR** 高リスク **OR** 多変量', en: 'Condition: unknown cause **OR** high risk **OR** many variables', id: 'Syarat: penyebab tidak diketahui **OR** risiko tinggi **OR** banyak variabel' },
            { ja: 'どれか一つでも当てはまれば選ぶ', en: 'Chosen if any one applies', id: 'Dipilih jika salah satu berlaku' },
            { ja: '統計的手法で根本原因を特定し抜本解決', en: 'Identify root cause statistically and solve fundamentally', id: 'Identifikasi akar penyebab secara statistik dan selesaikan secara mendasar' }
          ] }
        },
        { type: 'check', q: { ja: '原因の見当はあり、変数は1つ。ただし失敗するとプレス金型を破損する恐れがある。判定は？', en: 'There is a cause idea and one variable, but failure could damage a press die. Decision?', id: 'Ada dugaan penyebab dan satu variabel, tetapi kegagalan bisa merusak cetakan press. Keputusan?' }, choices: [
          { ja: 'Quick GPC（2つの条件を満たすので）', en: 'Quick GPC (two conditions are met)', id: 'Quick GPC (dua syarat terpenuhi)' },
          { ja: 'Deep GPC（高リスクなので）', en: 'Deep GPC (because risk is high)', id: 'Deep GPC (karena risiko tinggi)' },
          { ja: 'トリアージ不要、すぐ試す', en: 'No triage needed, just try', id: 'Tidak perlu triase, langsung coba' }
        ], answer: 1, explain: { ja: 'Route BはOR条件。高リスクが一つでもあればDeep GPCです。', en: 'Route B is an OR condition — high risk alone means Deep GPC.', id: 'Route B adalah syarat OR — risiko tinggi saja berarti Deep GPC.' } }
      ]
    },
    {
      id: 'flow',
      title: { ja: '判定フローチャート', en: 'Decision flowchart', id: 'Diagram alir keputusan' },
      blocks: [
        { type: 'diagram', name: 'triage-flow', caption: { ja: 'トリアージ判定フロー：Step 1〜4 のどこかで該当すればDeep GPC、すべて通過すればQuick GPC', en: 'Triage flow: if any of Steps 1–4 triggers, Deep GPC; if all pass, Quick GPC', id: 'Alur triase: jika salah satu Step 1–4 terpicu, Deep GPC; jika semua lolos, Quick GPC' } },
        { type: 'list', ordered: true, items: [
          { ja: '**Step 1：原因に心当たりがあるか？**（基準①）→ No なら Deep GPC、Yes なら Step 2 へ', en: '**Step 1: Any idea of the cause?** (criterion ①) → No: Deep GPC; Yes: go to Step 2', id: '**Step 1: Ada dugaan penyebab?** (kriteria ①) → Tidak: Deep GPC; Ya: ke Step 2' },
          { ja: '**Step 2：失敗時のリスクは高いか？**（基準③）→ High なら Deep GPC、Low なら Step 3 へ', en: '**Step 2: Is the risk on failure high?** (criterion ③) → High: Deep GPC; Low: go to Step 3', id: '**Step 2: Apakah risiko jika gagal tinggi?** (kriteria ③) → Tinggi: Deep GPC; Rendah: ke Step 3' },
          { ja: '**Step 3：関連する変数は3つ以上か？**（基準②）→ Yes なら Deep GPC、No なら Step 4 へ', en: '**Step 3: Are there 3 or more related variables?** (criterion ②) → Yes: Deep GPC; No: go to Step 4', id: '**Step 3: Apakah ada 3 variabel terkait atau lebih?** (kriteria ②) → Ya: Deep GPC; Tidak: ke Step 4' },
          { ja: '**Step 4：データは今すぐ取れるか？**（基準④）→ No（長期収集が必要）なら Deep GPC、Yes なら **Quick GPC**', en: '**Step 4: Can data be obtained right now?** (criterion ④) → No (long collection): Deep GPC; Yes: **Quick GPC**', id: '**Step 4: Bisakah data diperoleh sekarang?** (kriteria ④) → Tidak (pengumpulan lama): Deep GPC; Ya: **Quick GPC**' }
        ] },
        { type: 'callout', kind: 'tip', title: { ja: 'なぜこの順番？', en: 'Why this order?', id: 'Mengapa urutan ini?' }, text: {
          ja: '仮説がなければそもそもH-T-C-Aの「H」が書けません。次に安全・設備への影響を確認し、試してよいかを判断します。そのうえで変数の数とデータの入手性を見て、「すぐ小さく試せるか」を最終確認します。',
          en: 'Without a hypothesis you cannot even write the "H" of H-T-C-A. Next, check safety and equipment impact to decide whether trying is acceptable. Then look at the number of variables and data availability to confirm you can try small and fast.',
          id: 'Tanpa hipotesis, "H" dari H-T-C-A bahkan tidak dapat ditulis. Selanjutnya periksa dampak keselamatan dan peralatan untuk memutuskan apakah boleh mencoba. Lalu lihat jumlah variabel dan ketersediaan data untuk memastikan bisa mencoba kecil dan cepat.'
        } },
        { type: 'widget', name: 'triage-wizard', props: {} }
      ]
    },
    {
      id: 'gray',
      title: { ja: 'グレーゾーンとモードの連携', en: 'Gray zone and linking the modes', id: 'Zona abu-abu dan keterkaitan mode' },
      blocks: [
        { type: 'p', text: {
          ja: '判定が曖昧な場合は、**まずQuick GPCモードで1サイクル（1日〜1週間）試行**します。効果が得られなければDeep GPCモードに[[escalation]]します。この「Quick → Deep」の段階的アプローチによって、リソースの無駄を最小にしながら確実に解決へ向かえます。',
          en: 'If the decision is unclear, **first try one cycle (1 day – 1 week) in Quick GPC mode**. If there is no effect, [[escalation]] to Deep GPC mode follows. This stepwise "Quick → Deep" approach heads surely to a solution while minimising wasted resources.',
          id: 'Jika keputusan tidak jelas, **coba dulu satu siklus (1 hari – 1 minggu) dalam mode Quick GPC**. Jika tidak ada efek, lakukan [[escalation]] ke mode Deep GPC. Pendekatan bertahap "Quick → Deep" ini menuju solusi dengan pasti sambil meminimalkan pemborosan sumber daya.'
        } },
        { type: 'callout', kind: 'warn', title: { ja: 'ただし安全が最優先', en: 'But safety comes first', id: 'Namun keselamatan utama' }, text: {
          ja: 'グレーゾーンで「まず試す」のは、失敗しても修正が容易な（低リスクな）場合に限ります。設備破損や人身事故のリスクがあるなら、曖昧でもDeep GPCを選びます。',
          en: '"Try first" in the gray zone applies only when failure is easy to revert (low risk). If there is a risk of equipment damage or injury, choose Deep GPC even if unclear.',
          id: '"Coba dulu" di zona abu-abu hanya berlaku jika kegagalan mudah dikembalikan (risiko rendah). Jika ada risiko kerusakan alat atau cedera, pilih Deep GPC meski tidak jelas.'
        } },
        { type: 'flow', dir: 'h', nodes: [
          { title: { ja: '判定が曖昧', en: 'Unclear decision', id: 'Keputusan tidak jelas' }, text: { ja: '（低リスク）', en: '(low risk)', id: '(risiko rendah)' }, tone: 'gray' },
          { title: { ja: 'Quick GPC 1サイクル', en: 'One Quick GPC cycle', id: 'Satu siklus Quick GPC' }, text: { ja: '1日〜1週間で試行', en: 'Try in 1 day – 1 week', id: 'Coba dalam 1 hari – 1 minggu' }, tone: 'green' },
          { title: { ja: '効果あり → 標準化', en: 'Effective → standardize', id: 'Efektif → standarkan' }, text: { ja: '暫定標準 → PDCA-S', en: 'Temporary standard → PDCA-S', id: 'Standar sementara → PDCA-S' }, tone: 'blue' },
          { title: { ja: '効果なし → Deep GPC', en: 'No effect → Deep GPC', id: 'Tidak efektif → Deep GPC' }, text: { ja: 'エスカレーション', en: 'Escalation', id: 'Eskalasi' }, tone: 'navy' }
        ] },
        { type: 'p', text: {
          ja: 'また、両モードは排他的ではありません。Deep GPCの分析中に「これは試してみよう」というアイデアが出て、それがQuick GPCの条件（低リスク・単変量）を満たすなら、分析と**並行して**Quick GPCトライを実施して構いません。',
          en: 'The modes are not mutually exclusive. If, during a Deep GPC analysis, an idea comes up that meets the Quick GPC conditions (low risk, single variable), you may run a Quick GPC trial **in parallel** with the analysis.',
          id: 'Kedua mode tidak saling eksklusif. Jika selama analisis Deep GPC muncul ide yang memenuhi syarat Quick GPC (risiko rendah, variabel tunggal), uji coba Quick GPC boleh dijalankan **paralel** dengan analisis.'
        } },
        { type: 'widget', name: 'scenario', props: {
          title: { ja: '演習：3つの課題をトリアージする', en: 'Exercise: triage three issues', id: 'Latihan: triase tiga masalah' },
          intro: { ja: 'あなたはライン班長です。今週報告された課題を振り分けてください（内容は説明用の架空事例です）。', en: 'You are a line leader. Route the issues reported this week (fictional illustrative cases).', id: 'Anda pemimpin lini. Arahkan masalah yang dilaporkan minggu ini (kasus ilustrasi fiktif).' },
          steps: [
            { prompt: { ja: '課題1：「梱包工程でテープの貼り位置がばらつく。テープカッターの置き場所が作業者ごとに違うのが原因だと思う。」', en: 'Issue 1: "Tape position varies in packing. I think it is because each operator puts the tape cutter in a different place."', id: 'Masalah 1: "Posisi selotip bervariasi di pengemasan. Saya kira karena tiap operator meletakkan pemotong selotip di tempat berbeda."' }, choices: [
              { text: { ja: 'Quick GPC', en: 'Quick GPC', id: 'Quick GPC' }, correct: true, feedback: { ja: '正解。仮説あり・変数1つ・低リスク・すぐ計測可能。置き場所を固定して数サイクル試します。', en: 'Correct. Hypothesis, one variable, low risk, measurable now. Fix the location and try a few cycles.', id: 'Benar. Ada hipotesis, satu variabel, risiko rendah, dapat diukur sekarang. Tetapkan lokasi dan coba beberapa siklus.' } },
              { text: { ja: 'Deep GPC', en: 'Deep GPC', id: 'Deep GPC' }, correct: false, feedback: { ja: 'この課題にDMAICはオーバークオリティです。4条件すべてがQuick寄りです。', en: 'DMAIC would be over-quality here. All four criteria point to Quick.', id: 'DMAIC berlebihan di sini. Keempat kriteria mengarah ke Quick.' } }
            ] },
            { prompt: { ja: '課題2：「塗装の膜厚不良が月に数回出る。温度、湿度、塗料ロット、ガン距離、前処理…どれが原因か見当がつかない。」', en: 'Issue 2: "Paint film thickness defects occur a few times a month. Temperature, humidity, paint lot, gun distance, pretreatment… no idea which is the cause."', id: 'Masalah 2: "Cacat ketebalan cat terjadi beberapa kali sebulan. Suhu, kelembapan, lot cat, jarak gun, pra-perlakuan… tidak tahu mana penyebabnya."' }, choices: [
              { text: { ja: 'Quick GPC', en: 'Quick GPC', id: 'Quick GPC' }, correct: false, feedback: { ja: '原因不明・多変量・発生頻度が低くデータ収集に時間がかかります。直感トライでは根本原因に届きません。', en: 'Unknown cause, many variables, low frequency so data takes time. Intuitive trials will not reach the root cause.', id: 'Penyebab tidak diketahui, banyak variabel, frekuensi rendah sehingga data butuh waktu. Uji coba intuitif tidak mencapai akar penyebab.' } },
              { text: { ja: 'Deep GPC', en: 'Deep GPC', id: 'Deep GPC' }, correct: true, feedback: { ja: '正解。Step 1で「原因不明」の時点でDeep GPC。MSAから始めてDMAICで解析します。', en: 'Correct. "Unknown cause" at Step 1 already means Deep GPC. Start with MSA and analyse with DMAIC.', id: 'Benar. "Penyebab tidak diketahui" di Step 1 sudah berarti Deep GPC. Mulai dengan MSA dan analisis dengan DMAIC.' } }
            ] },
            { prompt: { ja: '課題3：「組立CTが先週から少し遅い気がする。部品の供給方法を変えたせいかもしれないが、CTデータの記録がバラバラで比較できない。」', en: 'Issue 3: "Assembly CT seems a bit slower since last week. Maybe the new part supply method, but CT records are inconsistent and cannot be compared."', id: 'Masalah 3: "CT perakitan terasa sedikit lebih lambat sejak minggu lalu. Mungkin karena metode suplai part baru, tetapi catatan CT tidak konsisten dan tidak dapat dibandingkan."' }, choices: [
              { text: { ja: 'すぐ供給方法を元に戻して結論を出す', en: 'Revert the supply method immediately and conclude', id: 'Segera kembalikan metode suplai dan simpulkan' }, correct: false, feedback: { ja: 'データの信頼性が低いままでは、戻して速くなったかも判断できません。', en: 'With unreliable data you cannot even tell whether reverting made it faster.', id: 'Dengan data tidak andal, Anda bahkan tidak dapat tahu apakah pengembalian membuatnya lebih cepat.' } },
              { text: { ja: 'まず計測方法を標準化してデータの信頼性を確保し、そのうえでQuick GPCで試す', en: 'First standardize measurement to secure data reliability, then try with Quick GPC', id: 'Pertama standarkan pengukuran untuk mengamankan keandalan data, lalu coba dengan Quick GPC' }, correct: true, feedback: { ja: '正解。基準④はデータの信頼性も含みます。計測を揃えれば仮説あり・低リスクなのでQuick GPCで検証できます。', en: 'Correct. Criterion ④ includes data reliability. Once measurement is aligned, it is a low-risk hypothesis for Quick GPC.', id: 'Benar. Kriteria ④ mencakup keandalan data. Setelah pengukuran diseragamkan, ini hipotesis berisiko rendah untuk Quick GPC.' } }
            ] }
          ],
          outro: { ja: 'トリアージは「課題の性質を見極める」ことです。判定を誤ると、リソースの浪費か解決力不足が起きます。', en: 'Triage means judging the nature of an issue. A wrong decision leads to wasted resources or lack of solving power.', id: 'Triase berarti menilai sifat masalah. Keputusan salah menyebabkan pemborosan sumber daya atau kurang daya penyelesaian.' }
        } }
      ]
    }
  ],
  keyPoints: [
    { ja: 'トリアージ（Phase 0）はすべての改善活動の入り口。画一処理の3つの問題を防ぐ', en: 'Triage (Phase 0) is the entrance to all improvement; it prevents the three problems of uniform handling', id: 'Triase (Phase 0) adalah pintu masuk semua perbaikan; mencegah tiga masalah penanganan seragam' },
    { ja: '4基準：①原因の見当 ②変数の数 ③リスク ④データ（入手性＋信頼性）', en: 'Four criteria: ① cause idea ② number of variables ③ risk ④ data (availability + reliability)', id: 'Empat kriteria: ① dugaan penyebab ② jumlah variabel ③ risiko ④ data (ketersediaan + keandalan)' },
    { ja: 'Quick＝仮説あり AND 低リスク AND 単変量／Deep＝原因不明 OR 高リスク OR 多変量', en: 'Quick = hypothesis AND low risk AND single variable / Deep = unknown OR high risk OR many variables', id: 'Quick = hipotesis AND risiko rendah AND variabel tunggal / Deep = tidak diketahui OR risiko tinggi OR banyak variabel' },
    { ja: 'フロー順：原因→リスク→変数（3つ以上）→データ', en: 'Flow order: cause → risk → variables (3 or more) → data', id: 'Urutan alir: penyebab → risiko → variabel (3 atau lebih) → data' },
    { ja: 'グレーゾーンはまずQuickで1サイクル、効果なければDeepへ。両モードは並行運用も可', en: 'Gray zone: try one Quick cycle, escalate to Deep if no effect. Modes can run in parallel', id: 'Zona abu-abu: coba satu siklus Quick, eskalasi ke Deep jika tidak efektif. Mode dapat berjalan paralel' }
  ],
  quiz: [
    { q: { ja: 'トリアージが防ごうとしている問題でないものは？', en: 'Which is NOT a problem triage aims to prevent?', id: 'Manakah yang BUKAN masalah yang dicegah triase?' }, choices: [
      { ja: 'オーバークオリティ', en: 'Over-quality', id: 'Kualitas berlebihan' },
      { ja: '解決力不足', en: 'Lack of solving power', id: 'Kurang daya penyelesaian' },
      { ja: '速度の矛盾', en: 'Speed contradiction', id: 'Kontradiksi kecepatan' },
      { ja: 'デジタル化投資の不足', en: 'Insufficient investment in digitalisation', id: 'Investasi digitalisasi kurang' }
    ], answer: 3, explain: { ja: 'デジタル化は加速装置でありトリアージの目的ではありません。', en: 'Digitalisation is an accelerator, not the purpose of triage.', id: 'Digitalisasi adalah akselerator, bukan tujuan triase.' } },
    { q: { ja: 'Quick GPCモードの期間の目安は？', en: 'Typical duration of Quick GPC mode?', id: 'Durasi umum mode Quick GPC?' }, choices: [
      { ja: '1時間以内', en: 'Within 1 hour', id: 'Dalam 1 jam' },
      { ja: '1日〜1週間', en: '1 day – 1 week', id: '1 hari – 1 minggu' },
      { ja: '1〜3ヶ月', en: '1 – 3 months', id: '1 – 3 bulan' },
      { ja: '半年以上', en: 'Over six months', id: 'Lebih dari enam bulan' }
    ], answer: 1, explain: { ja: 'Quickは1日〜1週間、Deepは1〜3ヶ月です。', en: 'Quick: 1 day – 1 week; Deep: 1 – 3 months.', id: 'Quick: 1 hari – 1 minggu; Deep: 1 – 3 bulan.' } },
    { q: { ja: 'Route A（Quick GPC）の判定条件は？', en: 'Decision condition for Route A (Quick GPC)?', id: 'Syarat keputusan Route A (Quick GPC)?' }, choices: [
      { ja: '原因仮説あり OR 低リスク OR 単変量', en: 'Hypothesis OR low risk OR single variable', id: 'Hipotesis OR risiko rendah OR variabel tunggal' },
      { ja: '原因仮説あり AND 低リスク AND 単変量', en: 'Hypothesis AND low risk AND single variable', id: 'Hipotesis AND risiko rendah AND variabel tunggal' },
      { ja: '原因不明 AND 低リスク', en: 'Unknown cause AND low risk', id: 'Penyebab tidak diketahui AND risiko rendah' },
      { ja: 'データが長期間ある', en: 'Long-term data exists', id: 'Ada data jangka panjang' }
    ], answer: 1, explain: { ja: 'Quickはすべての条件を満たすAND、DeepはどれかひとつのORです。', en: 'Quick requires all (AND); Deep needs any one (OR).', id: 'Quick memerlukan semua (AND); Deep cukup salah satu (OR).' } },
    { q: { ja: 'フローチャートのStep 1で確認するのは？', en: 'What is checked at Step 1 of the flowchart?', id: 'Apa yang diperiksa di Step 1 diagram alir?' }, choices: [
      { ja: '失敗時のリスク', en: 'Risk on failure', id: 'Risiko jika gagal' },
      { ja: '原因に心当たりがあるか', en: 'Whether there is an idea of the cause', id: 'Apakah ada dugaan penyebab' },
      { ja: 'データの入手性', en: 'Data availability', id: 'Ketersediaan data' },
      { ja: '変数の数', en: 'Number of variables', id: 'Jumlah variabel' }
    ], answer: 1, explain: { ja: '順番は Step1 原因 → Step2 リスク → Step3 変数 → Step4 データ です。', en: 'Order: Step 1 cause → Step 2 risk → Step 3 variables → Step 4 data.', id: 'Urutan: Step 1 penyebab → Step 2 risiko → Step 3 variabel → Step 4 data.' } },
    { q: { ja: 'Step 3でDeep GPCになる条件は？', en: 'At Step 3, what leads to Deep GPC?', id: 'Di Step 3, apa yang mengarah ke Deep GPC?' }, choices: [
      { ja: '関連する変数が1つ以上', en: '1 or more related variables', id: '1 atau lebih variabel terkait' },
      { ja: '関連する変数が3つ以上', en: '3 or more related variables', id: '3 atau lebih variabel terkait' },
      { ja: '関連する変数が10個以上', en: '10 or more related variables', id: '10 atau lebih variabel terkait' },
      { ja: '変数の数は判定に使わない', en: 'Variables are not used', id: 'Variabel tidak dipakai' }
    ], answer: 1, explain: { ja: '特定の1〜2個ならQuick寄り、3つ以上ならDeep GPCです。', en: 'Specific 1–2 leans Quick; 3 or more means Deep GPC.', id: 'Tertentu 1–2 mengarah Quick; 3 atau lebih berarti Deep GPC.' } },
    { q: { ja: '判定基準④「データ」について正しいのは？', en: 'Which is correct about criterion ④ "data"?', id: 'Manakah yang benar tentang kriteria ④ "data"?' }, choices: [
      { ja: '入手性だけを見ればよい', en: 'Only availability matters', id: 'Hanya ketersediaan yang penting' },
      { ja: '入手性に加えて信頼性（バラツキの程度）も含む', en: 'It includes reliability (degree of variation) as well as availability', id: 'Mencakup keandalan (tingkat variasi) selain ketersediaan' },
      { ja: 'デジタル化レベル3でなければ評価できない', en: 'It can only be evaluated at digital level 3', id: 'Hanya dapat dievaluasi di level digital 3' },
      { ja: 'データがなければ改善を中止する', en: 'Stop improvement if there is no data', id: 'Hentikan perbaikan jika tidak ada data' }
    ], answer: 1, explain: { ja: '信頼できないデータなら、まず標準化と測定の安定化で信頼性を確保します（根底ロジック）。', en: 'If data is unreliable, first secure reliability through standardization and stable measurement (root logic).', id: 'Jika data tidak andal, pertama amankan keandalan melalui standardisasi dan pengukuran stabil (logika dasar).' } },
    { q: { ja: '判定が曖昧（低リスク）なときの推奨は？', en: 'Recommendation when the decision is unclear (low risk)?', id: 'Rekomendasi saat keputusan tidak jelas (risiko rendah)?' }, choices: [
      { ja: '判断できるまで何もしない', en: 'Do nothing until you can decide', id: 'Tidak melakukan apa pun sampai dapat memutuskan' },
      { ja: 'いきなりDeep GPCを3ヶ月実施', en: 'Start 3-month Deep GPC immediately', id: 'Langsung Deep GPC 3 bulan' },
      { ja: 'まずQuick GPCで1サイクル試し、効果がなければDeep GPCへ', en: 'Try one Quick GPC cycle first; escalate to Deep GPC if no effect', id: 'Coba satu siklus Quick GPC dulu; eskalasi ke Deep GPC jika tidak efektif' },
      { ja: '両方とも実施しない', en: 'Do neither', id: 'Tidak melakukan keduanya' }
    ], answer: 2, explain: { ja: '段階的アプローチでリソースの無駄を最小化しつつ確実に解決に向かいます。', en: 'The stepwise approach minimises waste while heading surely to a solution.', id: 'Pendekatan bertahap meminimalkan pemborosan sambil pasti menuju solusi.' } },
    { q: { ja: 'Deep GPC分析中に低リスク・単変量のアイデアが出た。どうする？', en: 'During Deep GPC analysis, a low-risk single-variable idea appears. What do you do?', id: 'Selama analisis Deep GPC muncul ide berisiko rendah dan satu variabel. Apa yang dilakukan?' }, choices: [
      { ja: 'Deepが終わるまで保留する', en: 'Hold it until Deep finishes', id: 'Tahan sampai Deep selesai' },
      { ja: '分析と並行してQuick GPCトライを実施してよい', en: 'You may run a Quick GPC trial in parallel', id: 'Boleh menjalankan uji coba Quick GPC secara paralel' },
      { ja: 'Deepを中止してQuickに切り替える', en: 'Cancel Deep and switch to Quick', id: 'Batalkan Deep dan beralih ke Quick' },
      { ja: 'アイデアは記録せず捨てる', en: 'Discard the idea without recording', id: 'Buang ide tanpa mencatat' }
    ], answer: 1, explain: { ja: '両モードは排他的ではなく、条件を満たせば並行運用できます。', en: 'The modes are not exclusive and can run in parallel when conditions are met.', id: 'Mode tidak eksklusif dan dapat berjalan paralel jika syarat terpenuhi.' } }
  ]
});
