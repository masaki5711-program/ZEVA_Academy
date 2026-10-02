(function () {
  const T = (ja, en, id) => ({ ja, en, id });

  ZA.addModule({
    id: 'z1-05',
    track: 'z1',
    order: 5,
    minutes: 30,
    icon: '🔍',
    level: 2,
    prereq: ['z1-04'],
    title: T('7つのバラツキ要因とXY思考', 'The 7 variation factors and XY thinking', '7 faktor variasi dan berpikir XY'),
    summary: T(
      'ZEVAが制御対象とする7つのバラツキ要因と、結果（Y）ではなく原因（X）を制御する「XY思考」、そしてやってはいけない「Yの直接操作」を学びます。',
      'Learn the 7 variation factors ZEVA controls, "XY thinking" that controls causes (X) rather than results (Y), and the forbidden practice of "manipulating Y directly".',
      'Pelajari 7 faktor variasi yang dikendalikan ZEVA, "berpikir XY" yang mengendalikan penyebab (X) bukan hasil (Y), dan praktik terlarang "memanipulasi Y secara langsung".'
    ),
    objectives: [
      T('7つのバラツキ要因を挙げ、それぞれの例と制御方法を説明できる', 'List the 7 variation factors with examples and control methods', 'Menyebutkan 7 faktor variasi beserta contoh dan metode pengendaliannya'),
      T('各要因がGPC-MとGPC-Hのどちらで制御されるか判別できる', 'Tell whether each factor is controlled by GPC-M or GPC-H', 'Menentukan apakah setiap faktor dikendalikan oleh GPC-M atau GPC-H'),
      T('XY思考で、結果（Y）と原因（X）を区別できる', 'Distinguish results (Y) from causes (X) with XY thinking', 'Membedakan hasil (Y) dari penyebab (X) dengan berpikir XY'),
      T('Yを直接操作するNG行動を見抜き、X制御のOK行動に言い換えられる', 'Spot NG actions that manipulate Y and rephrase them as OK actions controlling X', 'Mengenali tindakan NG yang memanipulasi Y dan mengubahnya menjadi tindakan OK yang mengendalikan X')
    ],
    sections: [
      {
        id: 'from4m',
        title: T('4Mから7要因へ', 'From 4M to 7 factors', 'Dari 4M ke 7 faktor'),
        blocks: [
          { type: 'p', text: T(
            '生産の基本要素として知られる[[4m]]（Man・Machine・Material・Method）は、バラツキの源流を探す出発点です。ZEVAはこれを拡張し、**測定（Measurement）・管理（Management）・環境（Environment）**を加えた[[seven-factors]]を制御対象とします。',
            'The well-known [[4m]] (Man, Machine, Material, Method) is the starting point for tracing the sources of variation. ZEVA extends it with **Measurement, Management and Environment**, and controls the [[seven-factors]].',
            '[[4m]] yang terkenal (Man, Machine, Material, Method) adalah titik awal untuk melacak sumber variasi. ZEVA memperluasnya dengan **Measurement, Management, dan Environment**, dan mengendalikan [[seven-factors]].'
          ) },
          { type: 'callout', kind: 'note', title: T('なぜ3つを加えるのか', 'Why add three more?', 'Mengapa menambah tiga?'), text: T(
            '**測定**：データそのものがばらつけば、工程が安定していても不安定に見える（根底ロジック）。**管理**：生産計画や段取りの乱れは、人も設備も正しくてもバラツキを生む。**環境**：温度・湿度・照度は材料や人の動作に直接影響する。4Mだけでは見落としやすい源流です。',
            '**Measurement**: if the data itself varies, even a stable process looks unstable (root logic). **Management**: disorder in planning or changeovers creates variation even when people and machines are right. **Environment**: temperature, humidity and lighting directly affect materials and human motion. These sources are easy to miss with 4M alone.',
            '**Measurement**: jika data itu sendiri bervariasi, proses yang stabil pun tampak tidak stabil (logika dasar). **Management**: kekacauan rencana produksi atau pergantian setup menimbulkan variasi walau orang dan mesin benar. **Environment**: suhu, kelembapan, dan pencahayaan langsung memengaruhi material dan gerakan manusia. Sumber-sumber ini mudah terlewat bila hanya memakai 4M.'
          ) },
          { type: 'cards', cols: 4, items: [
            { icon: '🧑‍🔧', tone: 'blue', title: T('1. Man（人）', '1. Man', '1. Man (manusia)'), text: T('スキル・習熟度・体調・解釈の違い', 'Skill, proficiency, condition, interpretation', 'Keterampilan, kemahiran, kondisi, tafsiran') },
            { icon: '⚙️', tone: 'navy', title: T('2. Machine（設備）', '2. Machine', '2. Machine (mesin)'), text: T('設備・治工具の性能や状態', 'Performance and condition of equipment and tools', 'Kinerja dan kondisi peralatan dan perkakas') },
            { icon: '📦', tone: 'navy', title: T('3. Material（材料）', '3. Material', '3. Material'), text: T('ロット差・寸法・物性', 'Lot differences, dimensions, properties', 'Perbedaan lot, dimensi, sifat') },
            { icon: '📜', tone: 'blue', title: T('4. Method（方法）', '4. Method', '4. Method (metode)'), text: T('手順・標準・コツの曖昧さ', 'Ambiguity in procedure, standard, know-how', 'Ketidakjelasan prosedur, standar, kiat') },
            { icon: '📏', tone: 'amber', title: T('5. Measurement（測定）', '5. Measurement', '5. Measurement (pengukuran)'), text: T('測定器・測定方法の誤差', 'Errors of gauges and measuring methods', 'Kesalahan alat ukur dan metode pengukuran') },
            { icon: '🗂', tone: 'blue', title: T('6. Management（管理）', '6. Management', '6. Management (manajemen)'), text: T('生産計画・段取り・指示の乱れ', 'Disorder in plans, changeovers, instructions', 'Kekacauan rencana, setup, instruksi') },
            { icon: '🌡', tone: 'navy', title: T('7. Environment（環境）', '7. Environment', '7. Environment (lingkungan)'), text: T('温度・湿度・照度・振動', 'Temperature, humidity, lighting, vibration', 'Suhu, kelembapan, pencahayaan, getaran') }
          ] }
        ]
      },
      {
        id: 'factors',
        title: T('7要因とGPC-M / GPC-Hの対応', 'The 7 factors and GPC-M / GPC-H', '7 faktor dan GPC-M / GPC-H'),
        blocks: [
          { type: 'p', text: T(
            'ZEVAのInput制御は、設備を扱う[[gpc-m]]と、人を扱う[[gpc-h]]の二元構造です。7要因はそれぞれ、主にどちらの手法で制御するかが決まっています。',
            'ZEVA’s input control has a dual structure: [[gpc-m]] for machines and [[gpc-h]] for people. Each of the 7 factors is mainly controlled by one of them.',
            'Kendali input ZEVA memiliki struktur ganda: [[gpc-m]] untuk mesin dan [[gpc-h]] untuk manusia. Setiap dari 7 faktor terutama dikendalikan oleh salah satunya.'
          ) },
          { type: 'table',
            head: ['#', T('要因', 'Factor', 'Faktor'), T('GPC-M/H', 'GPC-M/H', 'GPC-M/H'), T('制御方法', 'Control method', 'Metode pengendalian'), T('バラツキの例', 'Example of variation', 'Contoh variasi')],
            rows: [
              ['1', T('Man（人）', 'Man', 'Man (manusia)'), 'GPC-H', T('4M標準化、訓練、V.Score監視', '4M standardization, training, V.Score monitoring', 'Standardisasi 4M, pelatihan, pemantauan V.Score'), T('作業者によって締付け時間や品質が違う、疲労によるポカミス', 'Tightening time/quality differs by operator; fatigue errors', 'Waktu/kualitas pengencangan berbeda antar operator; kesalahan karena lelah')],
              ['2', T('Machine（設備）', 'Machine', 'Machine (mesin)'), 'GPC-M', T('GPCバンド設定、センサー監視、インターロック', 'GPC band setting, sensor monitoring, interlocks', 'Penetapan GPC band, pemantauan sensor, interlock'), T('治工具の摩耗で精度が落ちる、突発停止', 'Tool wear reduces accuracy; sudden stops', 'Keausan perkakas menurunkan akurasi; berhenti mendadak')],
              ['3', T('Material（材料）', 'Material', 'Material'), 'GPC-M', T('受入検査基準、ロット管理', 'Receiving inspection criteria, lot control', 'Kriteria inspeksi penerimaan, pengendalian lot'), T('ロットごとの物性差、公差内の寸法バラツキ', 'Property differences by lot; dimensional scatter within tolerance', 'Perbedaan sifat per lot; sebaran dimensi dalam toleransi')],
              ['4', T('Method（方法）', 'Method', 'Method (metode)'), 'GPC-H', T('標準作業定義、ECRS適用', 'Standard work definition, applying ECRS', 'Definisi kerja standar, penerapan ECRS'), T('「しっかり締める」など曖昧な手順、暗黙のコツ依存', 'Vague steps like "tighten firmly"; reliance on tacit tricks', 'Langkah samar seperti "kencangkan kuat"; bergantung pada kiat tak tertulis')],
              ['5', T('Measurement（測定）', 'Measurement', 'Measurement (pengukuran)'), 'GPC-M/H', T('MSA（測定システム分析）、校正', 'MSA (measurement system analysis), calibration', 'MSA (analisis sistem pengukuran), kalibrasi'), T('測る人で値が変わる、測定器の偏り', 'Values change by who measures; gauge bias', 'Nilai berubah tergantung pengukur; bias alat ukur')],
              ['6', T('Management（管理）', 'Management', 'Management (manajemen)'), 'GPC-H', T('生産計画、段取り管理', 'Production planning, changeover management', 'Perencanaan produksi, manajemen setup'), T('急な計画変更、段取り手順がバラバラ', 'Sudden plan changes; inconsistent changeover steps', 'Perubahan rencana mendadak; langkah setup tidak konsisten')],
              ['7', T('Environment（環境）', 'Environment', 'Environment (lingkungan)'), 'GPC-M', T('温度・湿度・照度の範囲管理', 'Range control of temperature, humidity, lighting', 'Kendali rentang suhu, kelembapan, pencahayaan'), T('季節で接着剤の硬化時間が変わる、暗くて見逃す', 'Adhesive curing time changes by season; missed defects in poor light', 'Waktu pengeringan perekat berubah per musim; cacat terlewat karena gelap')]
            ],
            caption: T('ZEVAの7つのバラツキ要因', 'ZEVA’s 7 variation factors', '7 faktor variasi ZEVA')
          },
          { type: 'callout', kind: 'key', title: T('「正常」の定義', 'Defining "normal"', 'Mendefinisikan "normal"'), text: T(
            '4層構造のLayer 4では、7つのバラツキ要因が「GPCバンド内・標準作業内」にあることを**正常**と定義します。正常の定義が明確だからこそ、異常に気づけるのです。',
            'In Layer 4 of the 4-layer structure, the 7 variation factors being "within the GPC band and within standard work" is defined as **normal**. Because normal is clearly defined, abnormalities can be noticed.',
            'Pada Layer 4 struktur 4 lapis, 7 faktor variasi yang berada "di dalam GPC band dan di dalam kerja standar" didefinisikan sebagai **normal**. Karena normal didefinisikan dengan jelas, kelainan dapat disadari.'
          ) },
          { type: 'widget', name: 'sort-game', props: {
            title: T('このバラツキはどの要因？', 'Which factor causes this variation?', 'Faktor apa penyebab variasi ini?'),
            bins: [
              { id: 'man', label: T('Man（人）', 'Man', 'Man'), tone: 'blue' },
              { id: 'mac', label: T('Machine（設備）', 'Machine', 'Machine'), tone: 'navy' },
              { id: 'mat', label: T('Material（材料）', 'Material', 'Material'), tone: 'green' },
              { id: 'met', label: T('Method（方法）', 'Method', 'Method'), tone: 'amber' },
              { id: 'mea', label: T('Measurement（測定）', 'Measurement', 'Measurement'), tone: 'gray' },
              { id: 'mgt', label: T('Management（管理）', 'Management', 'Management'), tone: 'red' },
              { id: 'env', label: T('Environment（環境）', 'Environment', 'Environment'), tone: 'green' }
            ],
            items: [
              { bin: 'man', text: T('新人は熟練者より組付け時間が長く、ばらつきも大きい', 'New operators take longer and vary more than experienced ones', 'Operator baru lebih lama dan lebih bervariasi daripada yang berpengalaman'), explain: T('スキル・習熟度の差＝Man。GPC-H（訓練・標準化）。', 'Skill/proficiency difference = Man. GPC-H (training, standardization).', 'Perbedaan keterampilan = Man. GPC-H (pelatihan, standardisasi).') },
              { bin: 'mac', text: T('刃物が摩耗するにつれて加工寸法が大きくなる', 'Machined size grows as the cutting tool wears', 'Ukuran pemesinan membesar seiring keausan pisau'), explain: T('設備・治工具の状態＝Machine。GPC-M。', 'Equipment/tool condition = Machine. GPC-M.', 'Kondisi peralatan/perkakas = Machine. GPC-M.') },
              { bin: 'mat', text: T('仕入先のロットが変わると樹脂部品の反りが増える', 'Warping of resin parts increases when the supplier lot changes', 'Lengkungan part resin bertambah saat lot pemasok berganti'), explain: T('ロット差＝Material。GPC-M（受入基準・ロット管理）。', 'Lot difference = Material. GPC-M (receiving criteria, lot control).', 'Perbedaan lot = Material. GPC-M (kriteria penerimaan, pengendalian lot).') },
              { bin: 'met', text: T('手順書に「適量塗る」としか書かれておらず、塗布量が人ごとに違う', 'The instruction only says "apply a suitable amount", so amounts differ by person', 'Instruksi hanya menulis "oleskan secukupnya", sehingga jumlahnya berbeda per orang'), explain: T('曖昧な手順＝Method。GPC-H（標準作業定義）。', 'Vague procedure = Method. GPC-H (standard work definition).', 'Prosedur samar = Method. GPC-H (definisi kerja standar).') },
              { bin: 'mea', text: T('検査員によって同じ製品の合否判定が変わる', 'Pass/fail for the same product changes by inspector', 'Keputusan lulus/gagal produk yang sama berubah tergantung inspektur'), explain: T('測定（判定）システムのバラツキ＝Measurement。MSAで評価。', 'Variation of the measurement (judgment) system = Measurement. Evaluate with MSA.', 'Variasi sistem pengukuran (penilaian) = Measurement. Evaluasi dengan MSA.') },
              { bin: 'mgt', text: T('当日朝に生産順序が変わり、段取り替えが急に増える', 'Production order changes that morning, suddenly increasing changeovers', 'Urutan produksi berubah pagi itu, pergantian setup mendadak bertambah'), explain: T('生産計画・段取り管理＝Management。GPC-H。', 'Production planning / changeover management = Management. GPC-H.', 'Perencanaan produksi / manajemen setup = Management. GPC-H.') },
              { bin: 'env', text: T('夏場は接着剤の硬化が早く、接着強度がばらつく', 'In summer adhesive cures faster and bond strength varies', 'Di musim panas perekat mengering lebih cepat dan kekuatan rekat bervariasi'), explain: T('温度＝Environment。GPC-M（範囲管理）。', 'Temperature = Environment. GPC-M (range control).', 'Suhu = Environment. GPC-M (kendali rentang).') },
              { bin: 'mea', text: T('ストップウォッチ計測で、観測者ごとに押すタイミングが違う', 'In stopwatch timing, each observer presses at a different moment', 'Dalam pengukuran stopwatch, tiap pengamat menekan pada saat berbeda'), explain: T('測定方法のバラツキ＝Measurement。', 'Variation in measuring method = Measurement.', 'Variasi metode pengukuran = Measurement.') }
            ]
          } }
        ]
      },
      {
        id: 'xy',
        title: T('XY思考：結果ではなく原因を制御する', 'XY thinking: control causes, not results', 'Berpikir XY: kendalikan penyebab, bukan hasil'),
        blocks: [
          { type: 'callout', kind: 'key', title: T('核心原理', 'Core principle', 'Prinsip inti'), text: T(
            'OEE・時間・品質は「**結果（Y）**」であり、「原因（X）」ではありません。',
            'OEE, time and quality are "**results (Y)**", not "causes (X)".',
            'OEE, waktu, dan kualitas adalah "**hasil (Y)**", bukan "penyebab (X)".'
          ) },
          { type: 'diagram', name: 'xy-model', caption: T('X（7つのバラツキ要因）→ 工程 → Y（OEE・時間・品質）', 'X (7 variation factors) → process → Y (OEE, time, quality)', 'X (7 faktor variasi) → proses → Y (OEE, waktu, kualitas)') },
          { type: 'formula',
            expr: T('Y ＝ f（X<sub>1</sub>, X<sub>2</sub>, … X<sub>n</sub>）', 'Y = f(X<sub>1</sub>, X<sub>2</sub>, … X<sub>n</sub>)', 'Y = f(X<sub>1</sub>, X<sub>2</sub>, … X<sub>n</sub>)'),
            where: [
              { sym: 'Y', text: T('結果（出力）：不良率、CT、OEEなど', 'Result (output): defect rate, CT, OEE, etc.', 'Hasil (output): tingkat cacat, CT, OEE, dll.') },
              { sym: 'X', text: T('原因（入力）：7つのバラツキ要因に属するパラメータや条件', 'Cause (input): parameters/conditions belonging to the 7 factors', 'Penyebab (input): parameter/kondisi yang termasuk 7 faktor') }
            ],
            note: T('Yを変えたければ、Xを変えるしかない。', 'To change Y, you can only change X.', 'Untuk mengubah Y, Anda hanya dapat mengubah X.')
          },
          { type: 'p', text: T(
            '[[xy-thinking]]では、結果を良くしたいときに上流の原因（7つのバラツキ要因）を制御します。料理にたとえると、味（Y）が薄いときに「味見を増やす」のではなく、塩の量・火加減・時間（X）を決めて守ることです。',
            'In [[xy-thinking]], when you want a better result you control the upstream causes (the 7 factors). In cooking terms, when the taste (Y) is weak you do not "taste more often"; you decide and keep the amount of salt, heat and time (X).',
            'Dalam [[xy-thinking]], jika ingin hasil lebih baik, kendalikan penyebab di hulu (7 faktor). Dalam memasak, jika rasa (Y) hambar Anda tidak "mencicipi lebih sering"; Anda menetapkan dan menjaga jumlah garam, api, dan waktu (X).'
          ) },
          { type: 'callout', kind: 'zeva', title: T('根底ロジックとのつながり', 'Link to the root logic', 'Kaitan dengan logika dasar'), text: T(
            '原因（X）のバラツキを制御することは、結果（Y）として取得される**データの信頼性を高める**ことでもあります。XY思考は、「バラツキの少ないデータがアクションを可能にする」という根底ロジックを、日常の思考に落とし込むための道具です。',
            'Controlling variation in causes (X) also **raises the reliability of the data** obtained as results (Y). XY thinking is the tool that brings the root logic — "low-variation data makes action possible" — into daily thinking.',
            'Mengendalikan variasi penyebab (X) juga **meningkatkan keandalan data** yang diperoleh sebagai hasil (Y). Berpikir XY adalah alat yang membawa logika dasar — "data bervariasi rendah memungkinkan tindakan" — ke dalam pemikiran sehari-hari.'
          ) },
          { type: 'check',
            q: T('次のうち「原因（X）」はどれですか？', 'Which of these is a "cause (X)"?', 'Manakah yang merupakan "penyebab (X)"?'),
            choices: [T('不良率', 'Defect rate', 'Tingkat cacat'), T('はんだごての温度設定', 'Soldering iron temperature setting', 'Pengaturan suhu solder'), T('OEE', 'OEE', 'OEE')],
            answer: 1,
            explain: T('温度設定は工程に入力する条件＝X。不良率とOEEは結果＝Yです。', 'The temperature setting is an input condition = X. Defect rate and OEE are results = Y.', 'Pengaturan suhu adalah kondisi input = X. Tingkat cacat dan OEE adalah hasil = Y.')
          }
        ]
      },
      {
        id: 'donts',
        title: T('やってはいけないこと：Yの直接操作', 'Don’ts: manipulating Y directly', 'Larangan: memanipulasi Y secara langsung'),
        blocks: [
          { type: 'p', text: T(
            'ZEVAにおける代表的な禁止事項は、**結果（Y）を直接操作しようとすること**です。一時的に数字が良く見えても、原因は残ったまま。しかも新たなバラツキやロスを生みます。',
            'A typical prohibition in ZEVA is **trying to manipulate the result (Y) directly**. The numbers may look better for a while, but the cause remains — and new variation and loss appear.',
            'Larangan umum dalam ZEVA adalah **mencoba memanipulasi hasil (Y) secara langsung**. Angka mungkin terlihat lebih baik sementara, tetapi penyebabnya tetap ada — dan muncul variasi serta kerugian baru.'
          ) },
          { type: 'compare',
            left: { tone: 'red', title: T('NG：Yを直接操作している', 'NG: manipulating Y directly', 'NG: memanipulasi Y langsung'), items: [
              T('不良率が高い → 検査を厳しくする', 'Defect rate is high → make inspection stricter', 'Tingkat cacat tinggi → perketat inspeksi'),
              T('CTが遅い → 作業者を急がせる', 'CT is slow → rush the operators', 'CT lambat → buat operator terburu-buru'),
              T('OEEが低い → 残業で数を稼ぐ', 'OEE is low → make up numbers with overtime', 'OEE rendah → kejar jumlah dengan lembur')
            ] },
            right: { tone: 'green', title: T('OK：Xを制御している', 'OK: controlling X', 'OK: mengendalikan X'), items: [
              T('不良率が高い → 設備パラメータ（X）を適正化 → 不良率（Y）が下がる', 'Defect rate is high → optimize machine parameters (X) → defect rate (Y) drops', 'Tingkat cacat tinggi → optimalkan parameter mesin (X) → tingkat cacat (Y) turun'),
              T('CTが遅い → 作業手順（X）を改善 → CT（Y）が短縮される', 'CT is slow → improve the work procedure (X) → CT (Y) shortens', 'CT lambat → perbaiki prosedur kerja (X) → CT (Y) memendek'),
              T('OEEが低い → 設備故障の原因（X）を除去 → OEE（Y）が向上する', 'OEE is low → remove the cause of breakdowns (X) → OEE (Y) rises', 'OEE rendah → hilangkan penyebab kerusakan (X) → OEE (Y) naik')
            ] }
          },
          { type: 'table',
            head: [T('NG行動', 'NG action', 'Tindakan NG'), T('なぜダメか', 'Why it fails', 'Mengapa gagal')],
            rows: [
              [T('検査を厳しくする', 'Stricter inspection', 'Inspeksi lebih ketat'), T('不良は「作られた後に見つかる」だけ。作る量は減らず、検査コストと検査員の判定バラツキが増える', 'Defects are only "found after being made". Nothing stops them being made; inspection cost and inspector variation increase', 'Cacat hanya "ditemukan setelah dibuat". Tidak ada yang mencegahnya dibuat; biaya inspeksi dan variasi inspektur bertambah')],
              [T('作業者を急がせる', 'Rushing operators', 'Membuat operator terburu-buru'), T('ムリが生まれ、ミス・品質バラツキ・安全リスクが増える。手順が変わらない限りCTは戻る', 'Creates overburden (muri), increasing mistakes, quality variation and safety risk; CT returns unless the procedure changes', 'Menimbulkan beban berlebih (muri), menambah kesalahan, variasi kualitas, dan risiko keselamatan; CT kembali kecuali prosedur berubah')],
              [T('残業で数を稼ぐ', 'Overtime to make up numbers', 'Lembur untuk mengejar jumlah'), T('故障の原因は残り、コストと疲労が増える。疲労は新たなManのバラツキ要因になる', 'The cause of breakdowns remains; cost and fatigue increase, and fatigue becomes a new Man variation factor', 'Penyebab kerusakan tetap ada; biaya dan kelelahan bertambah, dan kelelahan menjadi faktor variasi Man yang baru')]
            ]
          },
          { type: 'widget', name: 'sort-game', props: {
            title: T('この対策はOK？NG？', 'Is this countermeasure OK or NG?', 'Apakah penanggulangan ini OK atau NG?'),
            bins: [
              { id: 'ok', label: T('OK：Xを制御', 'OK: controls X', 'OK: mengendalikan X'), tone: 'green' },
              { id: 'ng', label: T('NG：Yを直接操作', 'NG: manipulates Y', 'NG: memanipulasi Y'), tone: 'red' }
            ],
            items: [
              { bin: 'ng', text: T('キズ不良が多いので、出荷前の全数目視検査員を2名増やす', 'Many scratch defects, so add 2 more final visual inspectors', 'Banyak cacat gores, jadi tambah 2 inspektur visual akhir'), explain: T('結果を後で拾うだけで、キズの原因は残ります。', 'It only catches results afterward; the cause of scratches remains.', 'Hanya menangkap hasil setelahnya; penyebab goresan tetap ada.') },
              { bin: 'ok', text: T('キズ不良が多いので、作業台に保護マットを敷き、製品の置き方を標準化する', 'Many scratch defects, so lay protective mats and standardize how products are placed', 'Banyak cacat gores, jadi pasang alas pelindung dan standarkan cara meletakkan produk'), explain: T('キズの原因（環境・方法）を制御しています。', 'Controls the causes (environment, method) of scratches.', 'Mengendalikan penyebab goresan (lingkungan, metode).') },
              { bin: 'ng', text: T('目標CTに届かないので、ラインのスピード目標を掲示して声をかける', 'CT target missed, so post the speed target and urge people on', 'Target CT tidak tercapai, jadi pasang target kecepatan dan dorong orang'), explain: T('作業者を急がせる＝Yの直接操作です。', 'Rushing operators = manipulating Y.', 'Membuat operator terburu-buru = memanipulasi Y.') },
              { bin: 'ok', text: T('目標CTに届かないので、部品を手元化して歩行と持ち替えをなくす', 'CT target missed, so bring parts within reach to remove walking and re-grasping', 'Target CT tidak tercapai, jadi dekatkan part untuk menghilangkan berjalan dan memindah pegangan'), explain: T('作業方法（X）を変えてCT（Y）を短縮しています。', 'Changes the method (X) to shorten CT (Y).', 'Mengubah metode (X) untuk memperpendek CT (Y).') },
              { bin: 'ng', text: T('OEEが低いので、休日出勤で生産数を確保する', 'OEE is low, so work on holidays to secure output', 'OEE rendah, jadi kerja di hari libur untuk mengamankan output'), explain: T('残業・休日出勤で数を稼ぐ＝Yの直接操作です。', 'Making up numbers with extra hours = manipulating Y.', 'Mengejar jumlah dengan jam tambahan = memanipulasi Y.') },
              { bin: 'ok', text: T('OEEが低いので、チョコ停の原因となるセンサー位置ずれを調べて固定する', 'OEE is low, so investigate and fix the sensor misalignment causing minor stops', 'OEE rendah, jadi selidiki dan perbaiki posisi sensor yang bergeser penyebab henti kecil'), explain: T('停止の原因（Machine）を除去しています。', 'Removes the cause of stops (Machine).', 'Menghilangkan penyebab henti (Machine).') },
              { bin: 'ng', text: T('寸法不良が出たので、合否判定の基準値を少し緩める', 'Dimension defects occurred, so loosen the pass/fail criteria a little', 'Terjadi cacat dimensi, jadi longgarkan sedikit kriteria lulus/gagal'), explain: T('結果の数字を操作しているだけで、工程は何も変わっていません。', 'Only the result number is manipulated; the process has not changed.', 'Hanya angka hasil yang dimanipulasi; proses tidak berubah.') },
              { bin: 'ok', text: T('寸法不良が出たので、材料ロットと加工温度の関係を調べる', 'Dimension defects occurred, so investigate the relation between material lot and machining temperature', 'Terjadi cacat dimensi, jadi selidiki hubungan lot material dan suhu pemesinan'), explain: T('原因候補（X）を特定しにいく行動です。', 'Goes after candidate causes (X).', 'Mencari kandidat penyebab (X).') }
            ]
          } }
        ]
      },
      {
        id: 'practice',
        title: T('現場での使い方', 'Using it on the floor', 'Penerapan di lini'),
        blocks: [
          { type: 'h', text: T('問題が起きたときの考え方', 'How to think when a problem occurs', 'Cara berpikir saat masalah terjadi') },
          { type: 'flow', dir: 'v', nodes: [
            { tone: 'red', title: T('① Yを確認する', '① Confirm Y', '① Pastikan Y'), text: T('何が、どれだけ悪いのか（不良率、CT、OEE）。まずその数字は信頼できるか（測定のバラツキ）を確かめる', 'What is bad, and how much (defects, CT, OEE)? First check the number is reliable (measurement variation)', 'Apa yang buruk dan seberapa (cacat, CT, OEE)? Pertama pastikan angkanya andal (variasi pengukuran)') },
            { tone: 'amber', title: T('② 7要因でXの候補を洗い出す', '② List X candidates with the 7 factors', '② Daftar kandidat X dengan 7 faktor'), text: T('Man / Machine / Material / Method / Measurement / Management / Environment の順に「何が変わったか」を問う', 'Ask "what changed?" for Man / Machine / Material / Method / Measurement / Management / Environment', 'Tanyakan "apa yang berubah?" untuk Man / Machine / Material / Method / Measurement / Management / Environment') },
            { tone: 'blue', title: T('③ GPC-MかGPC-Hかを見極める', '③ Decide GPC-M or GPC-H', '③ Tentukan GPC-M atau GPC-H'), text: T('設備起因ならパラメータ範囲制御、人起因なら4M標準化＋動作安定の原理', 'Machine-caused → parameter range control; human-caused → 4M standardization + motion stability principles', 'Akibat mesin → kendali rentang parameter; akibat manusia → standardisasi 4M + prinsip stabilitas gerakan') },
            { tone: 'green', title: T('④ Xを制御し、Yで効果を確認する', '④ Control X and confirm the effect on Y', '④ Kendalikan X dan pastikan efeknya pada Y'), text: T('原因仮説の有無やリスクに応じて、トリアージでQuick GPC / Deep GPCを選ぶ', 'Choose Quick GPC / Deep GPC through triage depending on hypotheses and risk', 'Pilih Quick GPC / Deep GPC melalui triase sesuai hipotesis dan risiko') }
          ] },
          { type: 'callout', kind: 'tip', title: T('口ぐせにしたい質問', 'Questions to make a habit', 'Pertanyaan yang perlu dibiasakan'), text: T(
            '「それはYですか、Xですか？」「そのXは7要因のどれですか？」「そのデータは信頼できますか？」——この3つを会議や朝礼で問いかけるだけで、議論の質が変わります。',
            '"Is that Y or X?" "Which of the 7 factors is that X?" "Is that data reliable?" — just asking these three in meetings and morning huddles changes the quality of discussion.',
            '"Itu Y atau X?" "X itu termasuk faktor yang mana dari 7?" "Apakah data itu andal?" — hanya dengan menanyakan tiga hal ini dalam rapat dan briefing pagi, kualitas diskusi berubah.'
          ) },
          { type: 'widget', name: 'scenario', props: {
            title: T('ケース：接着不良が急に増えた', 'Case: adhesive defects suddenly increased', 'Kasus: cacat perekat tiba-tiba meningkat'),
            intro: T('ある組立工程で、今週に入って接着はがれ不良が増えています（数値は例示）。班長としてどう動きますか？', 'In an assembly process, adhesive peeling defects have increased this week (illustrative). As team leader, what do you do?', 'Di suatu proses perakitan, cacat perekat terkelupas meningkat minggu ini (ilustrasi). Sebagai ketua tim, apa yang Anda lakukan?'),
            steps: [
              { prompt: T('最初の行動は？', 'What is your first action?', 'Apa tindakan pertama Anda?'), choices: [
                { text: T('出荷前検査を強化し、不良を流出させない', 'Strengthen final inspection so no defects escape', 'Perkuat inspeksi akhir agar cacat tidak lolos'), correct: false, feedback: T('流出防止の暫定処置は必要な場合もありますが、それだけではYの直接操作です。原因（X）の追究が抜けています。', 'A temporary containment may be needed, but by itself it manipulates Y. It skips finding the cause (X).', 'Penahanan sementara mungkin perlu, tetapi itu sendiri memanipulasi Y. Ini melewatkan pencarian penyebab (X).') },
                { text: T('不良データの信頼性を確認し、7要因で「今週何が変わったか」を洗い出す', 'Check the defect data is reliable and list "what changed this week" with the 7 factors', 'Pastikan data cacat andal dan daftar "apa yang berubah minggu ini" dengan 7 faktor'), correct: true, feedback: T('正解。Yを確認し、Xの候補を体系的に探します。', 'Correct. Confirm Y, then search X candidates systematically.', 'Benar. Pastikan Y, lalu cari kandidat X secara sistematis.') }
              ] },
              { prompt: T('調べると、今週から気温が上がり、別ロットの接着剤を使い始めたことが分かりました。該当する要因は？', 'You find that temperatures rose this week and a new adhesive lot started. Which factors apply?', 'Ternyata suhu naik minggu ini dan lot perekat baru mulai dipakai. Faktor apa yang berlaku?'), choices: [
                { text: T('Environment と Material', 'Environment and Material', 'Environment dan Material'), correct: true, feedback: T('正解。どちらもGPC-Mで範囲管理・ロット管理する要因です。', 'Correct. Both are controlled by GPC-M (range control, lot control).', 'Benar. Keduanya dikendalikan GPC-M (kendali rentang, pengendalian lot).') },
                { text: T('Man と Method', 'Man and Method', 'Man dan Method'), correct: false, feedback: T('今回見つかった変化は気温（環境）と接着剤ロット（材料）です。', 'The changes found were temperature (environment) and adhesive lot (material).', 'Perubahan yang ditemukan adalah suhu (lingkungan) dan lot perekat (material).') }
              ] },
              { prompt: T('次にとるべき方向性は？', 'Which direction next?', 'Arah selanjutnya?'), choices: [
                { text: T('作業者に「もっと丁寧に貼るように」と指導する', 'Tell operators to "stick it more carefully"', 'Minta operator "menempel lebih hati-hati"'), correct: false, feedback: T('原因候補は環境と材料です。人に努力を求めてもXは制御されません。', 'The candidate causes are environment and material; asking people to try harder does not control X.', 'Kandidat penyebabnya lingkungan dan material; meminta orang berusaha lebih keras tidak mengendalikan X.') },
                { text: T('温度範囲と接着剤ロットを条件として管理し、効果を不良率で確認する', 'Manage temperature range and adhesive lot as conditions and confirm the effect with the defect rate', 'Kelola rentang suhu dan lot perekat sebagai kondisi dan pastikan efeknya dengan tingkat cacat'), correct: true, feedback: T('正解。Xを制御し、Yで効果を確認します。進め方はトリアージで選びます。', 'Correct. Control X and confirm on Y. Choose the route through triage.', 'Benar. Kendalikan X dan pastikan pada Y. Pilih jalurnya melalui triase.') }
              ] }
            ],
            outro: T('XY思考と7要因を使えば、「誰かを責める」「検査を増やす」ではなく、再発しない対策にたどり着けます。', 'With XY thinking and the 7 factors you reach countermeasures that prevent recurrence, instead of "blaming someone" or "adding inspection".', 'Dengan berpikir XY dan 7 faktor, Anda mencapai penanggulangan yang mencegah terulang, bukan "menyalahkan orang" atau "menambah inspeksi".')
          } }
        ]
      }
    ],
    keyPoints: [
      T('7要因＝Man・Machine・Material・Method・Measurement・Management・Environment', '7 factors = Man, Machine, Material, Method, Measurement, Management, Environment', '7 faktor = Man, Machine, Material, Method, Measurement, Management, Environment'),
      T('GPC-H：Man・Method・Management／GPC-M：Machine・Material・Environment／Measurement：両方', 'GPC-H: Man, Method, Management / GPC-M: Machine, Material, Environment / Measurement: both', 'GPC-H: Man, Method, Management / GPC-M: Machine, Material, Environment / Measurement: keduanya'),
      T('OEE・時間・品質は結果（Y）。原因（X）を制御する', 'OEE, time, quality are results (Y); control causes (X)', 'OEE, waktu, kualitas adalah hasil (Y); kendalikan penyebab (X)'),
      T('Xのバラツキ制御は、Yのデータ信頼性を高める', 'Controlling variation in X raises the reliability of Y data', 'Mengendalikan variasi X meningkatkan keandalan data Y'),
      T('NG：検査強化・急がせる・残業で数を稼ぐ（Yの直接操作）', 'NG: stricter inspection, rushing, overtime (manipulating Y directly)', 'NG: inspeksi lebih ketat, terburu-buru, lembur (memanipulasi Y langsung)')
    ],
    quiz: [
      { q: T('4Mに加えてZEVAが7要因として追加したものは？', 'What did ZEVA add to 4M to make 7 factors?', 'Apa yang ditambahkan ZEVA ke 4M menjadi 7 faktor?'),
        choices: [T('Money・Market・Motivation', 'Money, Market, Motivation', 'Money, Market, Motivation'), T('Measurement・Management・Environment', 'Measurement, Management, Environment', 'Measurement, Management, Environment'), T('Maintenance・Mold・Model', 'Maintenance, Mold, Model', 'Maintenance, Mold, Model'), T('Quality・Cost・Delivery', 'Quality, Cost, Delivery', 'Quality, Cost, Delivery')],
        answer: 1, explain: T('測定・管理・環境を加えた7つです。', 'Measurement, Management and Environment were added.', 'Measurement, Management, dan Environment ditambahkan.') },
      { q: T('Material（材料）の主な制御方法は？', 'Main control method for Material?', 'Metode pengendalian utama untuk Material?'),
        choices: [T('訓練とV.Score監視', 'Training and V.Score monitoring', 'Pelatihan dan pemantauan V.Score'), T('受入検査基準とロット管理（GPC-M）', 'Receiving criteria and lot control (GPC-M)', 'Kriteria penerimaan dan pengendalian lot (GPC-M)'), T('生産計画', 'Production planning', 'Perencanaan produksi'), T('ECRS', 'ECRS', 'ECRS')],
        answer: 1, explain: T('材料はGPC-Mで、受入基準とロット管理によって制御します。', 'Material is controlled under GPC-M by receiving criteria and lot control.', 'Material dikendalikan GPC-M dengan kriteria penerimaan dan pengendalian lot.') },
      { q: T('GPC-HとGPC-Mの両方にまたがる要因は？', 'Which factor spans both GPC-M and GPC-H?', 'Faktor mana yang mencakup GPC-M dan GPC-H?'),
        choices: [T('Man', 'Man', 'Man'), T('Environment', 'Environment', 'Environment'), T('Measurement', 'Measurement', 'Measurement'), T('Machine', 'Machine', 'Machine')],
        answer: 2, explain: T('測定は設備の計測にも人の作業時間計測にも関わるため、GPC-M/Hの両方です（MSA・校正）。', 'Measurement involves both machine measurement and human work timing, so it is GPC-M/H (MSA, calibration).', 'Pengukuran menyangkut pengukuran mesin dan waktu kerja manusia, jadi GPC-M/H (MSA, kalibrasi).') },
      { q: T('XY思考でYに当たるものは？', 'In XY thinking, which is Y?', 'Dalam berpikir XY, mana yang termasuk Y?'),
        choices: [T('治具の形状', 'Jig shape', 'Bentuk jig'), T('作業手順', 'Work procedure', 'Prosedur kerja'), T('OEE', 'OEE', 'OEE'), T('室温', 'Room temperature', 'Suhu ruangan')],
        answer: 2, explain: T('OEE・時間・品質は結果（Y）です。', 'OEE, time and quality are results (Y).', 'OEE, waktu, dan kualitas adalah hasil (Y).') },
      { q: T('「CTが遅いので作業者を急がせる」がNGである理由は？', 'Why is "CT is slow, so rush operators" NG?', 'Mengapa "CT lambat, jadi operator dibuat terburu-buru" termasuk NG?'),
        choices: [T('Yを直接操作しており、原因は残り、ミスや品質バラツキが増えるから', 'It manipulates Y directly; the cause remains and mistakes and quality variation increase', 'Memanipulasi Y langsung; penyebab tetap ada dan kesalahan serta variasi kualitas bertambah'), T('作業者が嫌がるから', 'Because operators dislike it', 'Karena operator tidak suka'), T('CTは測定できないから', 'Because CT cannot be measured', 'Karena CT tidak dapat diukur'), T('急がせてもCTは変わらないから', 'Because rushing never changes CT', 'Karena terburu-buru tidak pernah mengubah CT')],
        answer: 0, explain: T('手順（X）を改善してCT（Y）を短縮するのが正しいアプローチです。', 'The right approach is improving the procedure (X) to shorten CT (Y).', 'Pendekatan yang benar adalah memperbaiki prosedur (X) untuk memperpendek CT (Y).') },
      { q: T('原因（X）のバラツキを制御することの、根底ロジック上の意味は？', 'What does controlling variation in X mean in terms of the root logic?', 'Apa arti mengendalikan variasi X menurut logika dasar?'),
        choices: [T('データ収集が不要になる', 'Data collection becomes unnecessary', 'Pengumpulan data tidak diperlukan'), T('結果（Y）として得られるデータの信頼性が高まり、アクションが可能になる', 'The reliability of data obtained as Y rises, making action possible', 'Keandalan data yang diperoleh sebagai Y meningkat, sehingga tindakan menjadi mungkin'), T('Yを直接操作できるようになる', 'Y can be manipulated directly', 'Y dapat dimanipulasi langsung'), T('7要因が4つに減る', 'The 7 factors reduce to 4', '7 faktor berkurang menjadi 4')],
        answer: 1, explain: T('XY思考は根底ロジックを日常の思考に落とし込む道具です。', 'XY thinking brings the root logic into daily thinking.', 'Berpikir XY membawa logika dasar ke pemikiran sehari-hari.') },
      { q: T('Layer 4で「正常」と定義される状態は？', 'What is defined as "normal" in Layer 4?', 'Apa yang didefinisikan sebagai "normal" pada Layer 4?'),
        choices: [T('不良がゼロの状態', 'Zero defects', 'Nol cacat'), T('7要因がGPCバンド内・標準作業内にある状態', 'The 7 factors are within the GPC band and standard work', '7 faktor berada di dalam GPC band dan kerja standar'), T('OEEが85%以上', 'OEE of 85% or more', 'OEE 85% atau lebih'), T('残業がない状態', 'No overtime', 'Tanpa lembur')],
        answer: 1, explain: T('正常の定義が明確だから異常に気づけます。', 'A clear definition of normal lets you notice abnormalities.', 'Definisi normal yang jelas memungkinkan Anda menyadari kelainan.') }
    ]
  });
})();
