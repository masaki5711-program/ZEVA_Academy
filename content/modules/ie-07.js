(function () {
  const T = (ja, en, id) => ({ ja, en, id });

  ZA.addModule({
    id: 'ie-07',
    track: 'ie',
    order: 7,
    minutes: 30,
    icon: '🏭',
    level: 2,
    prereq: ['ie-02'],
    title: T('設備総合効率 OEE', 'Overall Equipment Effectiveness (OEE)', 'Efektivitas Peralatan Menyeluruh (OEE)'),
    summary: T(
      '設備が「本来の能力のうち、どれだけ良品を生み出せたか」を表すOEEを、時間稼働率・性能稼働率・良品率と6大ロスに分解して理解します。',
      'Understand OEE — how much of an equipment’s full potential actually became good products — by breaking it into availability, performance, yield rate and the six big losses.',
      'Memahami OEE — seberapa besar potensi penuh mesin benar-benar menjadi produk baik — dengan menguraikannya menjadi availability, performance, rasio produk baik, dan enam kerugian besar.'
    ),
    objectives: [
      T('負荷時間・稼働時間などの時間の構造を説明できる', 'Explain the time structure: loading time, operating time, etc.', 'Menjelaskan struktur waktu: loading time, operating time, dll.'),
      T('時間稼働率・性能稼働率・良品率とOEEを計算できる', 'Calculate availability, performance, yield rate and OEE', 'Menghitung availability, performance, rasio produk baik, dan OEE'),
      T('6大ロスを3つの率に分類できる', 'Classify the six big losses into the three rates', 'Mengelompokkan enam kerugian besar ke dalam tiga rasio'),
      T('OEEが「結果（Y）」の指標であることを説明できる', 'Explain why OEE is a result (Y) indicator', 'Menjelaskan mengapa OEE adalah indikator hasil (Y)'),
    ],
    sections: [
      {
        id: 'why',
        title: T('OEEとは何か', 'What is OEE?', 'Apa itu OEE?'),
        blocks: [
          { type: 'p', text: T(
            '[[oee]]（Overall Equipment Effectiveness：設備総合効率）は、設備が「動くべき時間に、本来の速さで、良品だけを作れたか」を1つの数字で表す指標です。TPM（全員参加の生産保全）の中で広まりました。',
            '[[oee]] (Overall Equipment Effectiveness) expresses in one number whether equipment ran when it should, at its designed speed, making only good parts. It spread through TPM (Total Productive Maintenance).',
            '[[oee]] (Overall Equipment Effectiveness) menyatakan dalam satu angka apakah mesin berjalan saat seharusnya, pada kecepatan rancangan, dan hanya membuat produk baik. Konsep ini menyebar melalui TPM (Total Productive Maintenance).'
          ) },
          { type: 'p', text: T(
            '「稼働率が高い」だけでは不十分です。止まらずに動いていても、ゆっくり動いていたり、不良ばかり作っていたりすれば、設備の能力は活かされていません。OEEは3つの観点を掛け算するので、どれか1つが悪いと全体も低くなります。',
            'High running time alone is not enough. A machine that never stops but runs slowly or makes defects is still wasting its capability. OEE multiplies three factors, so if any one is poor, the total is poor.',
            'Waktu jalan yang tinggi saja tidak cukup. Mesin yang tidak pernah berhenti tetapi berjalan lambat atau membuat cacat tetap menyia-nyiakan kemampuannya. OEE mengalikan tiga faktor, sehingga jika salah satu buruk, totalnya juga buruk.'
          ) },
          { type: 'formula',
            expr: T('OEE = 時間稼働率 × 性能稼働率 × 良品率', 'OEE = Availability × Performance × Yield rate', 'OEE = Availability × Performance × Rasio produk baik'),
            note: T('世界的に優秀とされる目安は85%以上（例：90% × 95% × 99.9% ≒ 85%）。', 'A widely quoted world-class benchmark is 85% or more (e.g. 90% × 95% × 99.9% ≈ 85%).', 'Tolok ukur kelas dunia yang sering dikutip adalah 85% atau lebih (misalnya 90% × 95% × 99,9% ≈ 85%).'),
          },
          { type: 'cards', cols: 3, items: [
            { icon: '⏱', tone: 'blue', title: T('時間稼働率', 'Availability', 'Availability'), text: T('止まらずに動けたか？（停止ロス）', 'Did it run without stopping? (downtime loss)', 'Apakah berjalan tanpa berhenti? (kerugian henti)') },
            { icon: '🚀', tone: 'amber', title: T('性能稼働率', 'Performance', 'Performance'), text: T('本来の速さで動けたか？（速度ロス）', 'Did it run at designed speed? (speed loss)', 'Apakah berjalan pada kecepatan rancangan? (kerugian kecepatan)') },
            { icon: '✅', tone: 'green', title: T('良品率', 'Yield rate', 'Rasio produk baik'), text: T('良品だけを作れたか？（品質ロス）', 'Did it make only good parts? (quality loss)', 'Apakah hanya membuat produk baik? (kerugian kualitas)') },
          ] },
        ],
      },
      {
        id: 'structure',
        title: T('時間の構造とOEEの計算', 'Time structure and OEE calculation', 'Struktur waktu dan perhitungan OEE'),
        blocks: [
          { type: 'diagram', name: 'oee-tree', caption: T('負荷時間から価値を生んだ時間までの分解', 'Breakdown from loading time to valuable operating time', 'Uraian dari loading time hingga waktu operasi bernilai') },
          { type: 'table',
            head: [T('時間', 'Time', 'Waktu'), T('意味', 'Meaning', 'Arti')],
            rows: [
              [T('負荷時間', 'Loading time', 'Loading time'), T('設備を動かす予定の時間（操業時間から計画休止・休憩などを除く）', 'Time the equipment is planned to run (operating hours minus planned stops, breaks)', 'Waktu mesin direncanakan berjalan (jam kerja dikurangi henti terencana, istirahat)')],
              [T('稼働時間', 'Operating time', 'Operating time'), T('負荷時間 − 停止時間（故障・段取り・調整）', 'Loading time − downtime (breakdown, setup, adjustment)', 'Loading time − downtime (kerusakan, setup, penyetelan)')],
              [T('正味稼働時間', 'Net operating time', 'Net operating time'), T('稼働時間 − 速度ロス・チョコ停', 'Operating time − speed losses and minor stops', 'Operating time − kerugian kecepatan dan henti kecil')],
              [T('価値稼働時間', 'Valuable operating time', 'Valuable operating time'), T('正味稼働時間 − 不良・手直しに使った時間', 'Net operating time − time spent on defects and repair', 'Net operating time − waktu untuk cacat dan perbaikan')],
            ],
          },
          { type: 'formula',
            expr: T('時間稼働率 = 稼働時間 ÷ 負荷時間', 'Availability = Operating time ÷ Loading time', 'Availability = Operating time ÷ Loading time'),
            note: T('[[availability]]', '[[availability]]', '[[availability]]'),
          },
          { type: 'formula',
            expr: T('性能稼働率 = (基準サイクルタイム × 加工数量) ÷ 稼働時間', 'Performance = (Ideal cycle time × Total count) ÷ Operating time', 'Performance = (Cycle time ideal × Jumlah total) ÷ Operating time'),
            note: T('[[performance-rate]]：基準（理想）サイクルタイムは設備の設計上の速さ。', '[[performance-rate]]: the ideal cycle time is the designed speed of the equipment.', '[[performance-rate]]: cycle time ideal adalah kecepatan rancangan mesin.'),
          },
          { type: 'formula',
            expr: T('良品率 = Good ÷ 総生産数（Trialを除く）', 'Yield rate = Good ÷ total production (excluding Trial)', 'Rasio produk baik = Good ÷ total produksi (tanpa Trial)'),
            note: T('[[quality-rate]]', '[[quality-rate]]', '[[quality-rate]]'),
          },
          { type: 'example',
            title: T('計算例', 'Worked example', 'Contoh perhitungan'),
            steps: [
              T('負荷時間 480分、停止時間 45分 → 稼働時間 435分', 'Loading time 480 min, downtime 45 min → operating time 435 min', 'Loading time 480 menit, downtime 45 menit → operating time 435 menit'),
              T('時間稼働率 = 435 ÷ 480 = 90.6%', 'Availability = 435 ÷ 480 = 90.6%', 'Availability = 435 ÷ 480 = 90,6%'),
              T('基準CT 1.0分、加工数量 380個 → 性能稼働率 = (1.0 × 380) ÷ 435 = 87.4%', 'Ideal CT 1.0 min, total count 380 → performance = (1.0 × 380) ÷ 435 = 87.4%', 'CT ideal 1,0 menit, jumlah total 380 → performance = (1,0 × 380) ÷ 435 = 87,4%'),
              T('Good 370個（総生産数 380個、Trialなし）→ 良品率 = 370 ÷ 380 = 97.4%', 'Good 370 (total production 380, no Trial) → yield rate = 370 ÷ 380 = 97.4%', 'Good 370 (total produksi 380, tanpa Trial) → rasio produk baik = 370 ÷ 380 = 97,4%'),
              T('OEE = 0.906 × 0.874 × 0.974 ≒ 77.1%', 'OEE = 0.906 × 0.874 × 0.974 ≈ 77.1%', 'OEE = 0,906 × 0,874 × 0,974 ≈ 77,1%'),
              T('検算：良品370個 × 1.0分 ÷ 480分 = 77.1%（価値を生んだ時間の割合）', 'Check: 370 good × 1.0 min ÷ 480 min = 77.1% (share of time that created value)', 'Cek: 370 baik × 1,0 menit ÷ 480 menit = 77,1% (porsi waktu yang menghasilkan nilai)'),
            ],
            result: T('ロスの内訳：停止45分、速度ロス55分（435−380）、品質ロス10分、価値稼働時間370分。合計480分。', 'Loss breakdown: downtime 45 min, speed loss 55 min (435 − 380), quality loss 10 min, valuable time 370 min — total 480 min.', 'Rincian kerugian: henti 45 menit, kerugian kecepatan 55 menit (435 − 380), kerugian kualitas 10 menit, waktu bernilai 370 menit — total 480 menit.'),
          },
          { type: 'widget', name: 'oee-calc', props: { planned: 480, downtime: 45, idealCt: 1.0, output: 380, good: 370 } },
          { type: 'callout', kind: 'tip', title: T('検算のコツ', 'Quick check', 'Cek cepat'), text: T(
            'OEEは「良品数 × 基準CT ÷ 負荷時間」でも求められます。3つの率を掛けた値と一致すれば、計算は正しいです。',
            'OEE also equals good count × ideal CT ÷ loading time. If it matches the product of the three rates, your calculation is right.',
            'OEE juga sama dengan jumlah baik × CT ideal ÷ loading time. Jika cocok dengan hasil kali tiga rasio, perhitungan Anda benar.'
          ) },
        ],
      },
      {
        id: 'losses',
        title: T('6大ロス', 'The six big losses', 'Enam kerugian besar'),
        blocks: [
          { type: 'p', text: T(
            'OEEを下げる原因は、TPMでは[[six-big-losses]]として整理されています。OEEの数字を見るだけでなく、どのロスが大きいのかを分解することが改善の出発点です。',
            'TPM organises the causes of low OEE as the [[six-big-losses]]. Improvement starts by breaking down which loss is largest — not just by looking at the OEE number.',
            'TPM mengelompokkan penyebab OEE rendah sebagai [[six-big-losses]]. Perbaikan dimulai dengan menguraikan kerugian mana yang terbesar — bukan hanya melihat angka OEE.'
          ) },
          { type: 'table',
            head: [T('率', 'Rate', 'Rasio'), T('ロス', 'Loss', 'Kerugian'), T('例', 'Example', 'Contoh')],
            rows: [
              [T('時間稼働率', 'Availability', 'Availability'), T('①故障ロス', '① Breakdown loss', '① Kerugian kerusakan'), T('モーター焼損で2時間停止', 'Motor burn-out stops the machine for 2 hours', 'Motor terbakar, mesin berhenti 2 jam')],
              [T('時間稼働率', 'Availability', 'Availability'), T('②段取り・調整ロス', '② Setup & adjustment loss', '② Kerugian setup & penyetelan'), T('品種切替で金型交換と試し打ちに40分', 'Model change: die change and trial shots take 40 min', 'Ganti model: ganti cetakan dan uji coba 40 menit')],
              [T('性能稼働率', 'Performance', 'Performance'), T('③チョコ停・空転ロス', '③ Minor stop & idling loss', '③ Kerugian henti kecil & idle'), T('部品詰まりで数十秒の停止が何度も発生', 'Part jams cause repeated stops of tens of seconds', 'Part macet menyebabkan henti puluhan detik berulang kali')],
              [T('性能稼働率', 'Performance', 'Performance'), T('④速度低下ロス', '④ Reduced speed loss', '④ Kerugian penurunan kecepatan'), T('不良が怖いので設計速度より遅く運転', 'Running slower than designed speed for fear of defects', 'Berjalan lebih lambat dari rancangan karena takut cacat')],
              [T('良品率', 'Quality', 'Quality'), T('⑤不良・手直しロス', '⑤ Defect & repair loss', '⑤ Kerugian cacat & perbaikan'), T('寸法不良品の廃棄・手直し', 'Scrapping or repairing out-of-size parts', 'Membuang atau memperbaiki part di luar ukuran')],
              [T('良品率', 'Quality', 'Quality'), T('⑥立上がりロス', '⑥ Start-up (yield) loss', '⑥ Kerugian start-up (yield)'), T('始業直後、温度が安定するまでの不良', 'Defects right after start-up until temperature stabilises', 'Cacat setelah mulai hingga suhu stabil')],
            ],
          },
          { type: 'widget', name: 'sort-game', props: {
            title: T('このロスはどの率を下げる？', 'Which rate does this loss reduce?', 'Rasio mana yang diturunkan kerugian ini?'),
            bins: [
              { id: 'a', label: T('時間稼働率', 'Availability', 'Availability'), tone: 'blue' },
              { id: 'p', label: T('性能稼働率', 'Performance', 'Performance'), tone: 'amber' },
              { id: 'q', label: T('良品率', 'Quality', 'Quality'), tone: 'green' },
            ],
            items: [
              { bin: 'a', text: T('設備故障で1時間停止した', 'Machine broke down for 1 hour', 'Mesin rusak selama 1 jam'), explain: T('故障ロス：稼働時間が減ります。', 'Breakdown loss reduces operating time.', 'Kerugian kerusakan mengurangi operating time.') },
              { bin: 'a', text: T('品種切替の段取りに30分かかった', 'Changeover took 30 minutes', 'Pergantian model memakan 30 menit'), explain: T('段取り・調整ロス：停止時間に含まれます。', 'Setup loss counts as downtime.', 'Kerugian setup dihitung sebagai downtime.') },
              { bin: 'p', text: T('ワーク詰まりで短い停止が何度も起きた', 'Frequent short stops due to jams', 'Henti singkat berulang karena macet'), explain: T('チョコ停：記録されにくく、性能稼働率を下げます。', 'Minor stops are often unrecorded and lower Performance.', 'Henti kecil sering tidak tercatat dan menurunkan Performance.') },
              { bin: 'p', text: T('設計1分/個なのに1.2分/個で運転した', 'Designed 1.0 min/pc but ran at 1.2 min/pc', 'Rancangan 1,0 menit/pcs tetapi berjalan 1,2 menit/pcs'), explain: T('速度低下ロスです。', 'Reduced speed loss.', 'Kerugian penurunan kecepatan.') },
              { bin: 'q', text: T('キズ不良を手直しした', 'Scratched parts were repaired', 'Part tergores diperbaiki'), explain: T('手直し品は良品数に含めません。', 'Repaired items are not counted as first-time good.', 'Barang yang diperbaiki tidak dihitung sebagai baik pertama kali.') },
              { bin: 'q', text: T('朝一番の立上げで試作品が不良になった', 'Start-up pieces in the morning were defective', 'Produk awal saat start pagi cacat'), explain: T('立上がりロスです。', 'Start-up loss.', 'Kerugian start-up.') },
              { bin: 'a', text: T('材料が届かず設備が止まっていた', 'Machine waited because material did not arrive', 'Mesin menunggu karena material tidak datang'), explain: T('負荷時間内の停止は時間稼働率を下げます（計画休止でなければ）。', 'An unplanned stop within loading time lowers availability.', 'Henti tak terencana dalam loading time menurunkan availability.') },
            ],
          } },
        ],
      },
      {
        id: 'use',
        title: T('OEEを正しく使う', 'Using OEE correctly', 'Menggunakan OEE dengan benar'),
        blocks: [
          { type: 'list', items: [
            T('**3つの率を必ず分けて見る**：同じOEE 70%でも、故障が多いラインと不良が多いラインでは打ち手がまったく違います。', '**Always look at the three rates separately**: two lines with OEE 70% may need completely different actions — one has breakdowns, the other defects.', '**Selalu lihat tiga rasio secara terpisah**: dua lini dengan OEE 70% bisa perlu tindakan berbeda — satu banyak kerusakan, yang lain banyak cacat.'),
            T('**チョコ停を記録する**：短い停止は日報に書かれず、性能稼働率の低さとして隠れます。張り付き調査で実態をつかみます。', '**Record minor stops**: short stops rarely appear in daily reports and hide inside a low Performance figure. Direct observation reveals them.', '**Catat henti kecil**: henti singkat jarang masuk laporan harian dan tersembunyi di angka Performance yang rendah. Observasi langsung mengungkapnya.'),
            T('**基準CTをごまかさない**：基準CTを遅く設定すれば性能稼働率は見かけ上上がります。基準は設計上・理論上の速さにします。', '**Do not inflate the ideal CT**: setting a slow ideal CT makes performance look better. Use the designed / theoretical speed.', '**Jangan melonggarkan CT ideal**: CT ideal yang lambat membuat performance tampak bagus. Gunakan kecepatan rancangan / teoretis.'),
            T('**OEEの推移とバラツキを見る**：日ごとのOEEが大きく上下するなら、工程は安定していません。', '**Watch the trend and spread of OEE**: if daily OEE swings widely, the process is not stable.', '**Perhatikan tren dan sebaran OEE**: jika OEE harian naik-turun lebar, proses tidak stabil.'),
          ] },
          { type: 'callout', kind: 'note', title: T('OEEとOLE', 'OEE and OLE', 'OEE dan OLE'), text: T(
            '人の作業が中心のラインでは、同じ考え方を人に当てはめたOLE（Overall Labor Effectiveness：人の総合効率）が使われることもあります。人の稼働・速度・品質を掛け算で評価します。',
            'On lines where people do most of the work, the same idea applied to labour — OLE (Overall Labor Effectiveness) — is sometimes used, multiplying people’s availability, performance and quality.',
            'Pada lini yang sebagian besar dikerjakan manusia, konsep yang sama untuk tenaga kerja — OLE (Overall Labor Effectiveness) — kadang digunakan, mengalikan availability, performance, dan quality pekerja.'
          ) },
          { type: 'callout', kind: 'zeva', title: T('ZEVAとのつながり：OEEは「結果（Y）」', 'ZEVA connection: OEE is a result (Y)', 'Kaitan ZEVA: OEE adalah hasil (Y)'), text: T(
            'ZEVAのXY思考では、OEE・時間・品質はすべて「結果（Y）」です。OEEが低いときに「残業して数を稼ぐ」のはYを直接いじるNG行為です。正しくは、故障の原因や設備パラメータなどの「原因（X）」を制御します。ZEVAではOEEはGPC-M（設備制御）の評価指標で、目標は85%以上です。',
            'In ZEVA XY thinking, OEE, time and quality are all results (Y). When OEE is low, "working overtime to make the numbers" manipulates Y directly and is prohibited. The right way is to control causes (X) such as breakdown causes and equipment parameters. In ZEVA, OEE is a GPC-M (equipment control) metric with a target of 85% or more.',
            'Dalam pemikiran XY ZEVA, OEE, waktu, dan kualitas semuanya adalah hasil (Y). Saat OEE rendah, "lembur untuk mengejar angka" berarti memanipulasi Y secara langsung dan dilarang. Cara yang benar adalah mengendalikan penyebab (X) seperti penyebab kerusakan dan parameter mesin. Di ZEVA, OEE adalah metrik GPC-M (kontrol mesin) dengan target 85% atau lebih.'
          ) },
          { type: 'compare',
            left: { tone: 'red', title: T('NG：Yを直接いじる', 'NG: pushing Y directly', 'NG: menekan Y langsung'), items: [
              T('OEEが低い → 残業で数を稼ぐ', 'Low OEE → overtime to hit numbers', 'OEE rendah → lembur mengejar angka'),
              T('OEEが低い → 基準CTを遅く設定し直す', 'Low OEE → reset the ideal CT slower', 'OEE rendah → set ulang CT ideal lebih lambat'),
            ] },
            right: { tone: 'green', title: T('OK：原因Xを制御する', 'OK: control cause X', 'OK: kendalikan penyebab X'), items: [
              T('故障の原因（X）を除去 → OEE（Y）が上がる', 'Remove breakdown causes (X) → OEE (Y) rises', 'Hilangkan penyebab kerusakan (X) → OEE (Y) naik'),
              T('段取り手順（X）を標準化・短縮 → 停止ロスが減る', 'Standardise and shorten setup (X) → downtime falls', 'Standarkan dan persingkat setup (X) → downtime turun'),
            ] },
          },
        ],
      },
    ],
    keyPoints: [
      T('OEE = 時間稼働率 × 性能稼働率 × 良品率。優秀の目安は85%以上', 'OEE = Availability × Performance × Yield rate; world-class ≈ 85%+', 'OEE = Availability × Performance × Rasio produk baik; kelas dunia ≈ 85%+'),
      T('検算：OEE = 良品数 × 基準CT ÷ 負荷時間', 'Check: OEE = good count × ideal CT ÷ loading time', 'Cek: OEE = jumlah baik × CT ideal ÷ loading time'),
      T('6大ロス：故障・段取り（時間）、チョコ停・速度低下（性能）、不良・立上がり（品質）', 'Six big losses: breakdown, setup (availability); minor stops, speed (performance); defects, start-up (quality)', 'Enam kerugian: kerusakan, setup (availability); henti kecil, kecepatan (performance); cacat, start-up (quality)'),
      T('3つの率を分けて見て、最大のロスから手を打つ', 'Look at the three rates separately and attack the biggest loss', 'Lihat tiga rasio terpisah dan tangani kerugian terbesar'),
      T('OEEは結果（Y）。原因（X）を制御して上げる', 'OEE is a result (Y); raise it by controlling causes (X)', 'OEE adalah hasil (Y); naikkan dengan mengendalikan penyebab (X)'),
    ],
    quiz: [
      { q: T('時間稼働率90%、性能稼働率90%、良品率95%のOEEは？', 'Availability 90%, performance 90%, quality 95%. OEE?', 'Availability 90%, performance 90%, quality 95%. OEE?'),
        choices: [T('約77%', 'About 77%', 'Sekitar 77%'), T('約85%', 'About 85%', 'Sekitar 85%'), T('約92%', 'About 92%', 'Sekitar 92%'), T('約70%', 'About 70%', 'Sekitar 70%')],
        answer: 0, explain: T('0.90 × 0.90 × 0.95 = 0.7695 ≒ 77%。', '0.90 × 0.90 × 0.95 = 0.7695 ≈ 77%.', '0,90 × 0,90 × 0,95 = 0,7695 ≈ 77%.') },
      { q: T('負荷時間400分、停止時間40分のときの時間稼働率は？', 'Loading time 400 min, downtime 40 min. Availability?', 'Loading time 400 menit, downtime 40 menit. Availability?'),
        choices: [T('10%', '10%', '10%'), T('90%', '90%', '90%'), T('111%', '111%', '111%'), T('36%', '36%', '36%')],
        answer: 1, explain: T('稼働時間 = 360分。360 ÷ 400 = 90%。', 'Operating time = 360 min. 360 ÷ 400 = 90%.', 'Operating time = 360 menit. 360 ÷ 400 = 90%.') },
      { q: T('稼働時間360分、基準CT0.5分、加工数量630個の性能稼働率は？', 'Operating time 360 min, ideal CT 0.5 min, total count 630. Performance?', 'Operating time 360 menit, CT ideal 0,5 menit, jumlah 630. Performance?'),
        choices: [T('87.5%', '87.5%', '87,5%'), T('57.1%', '57.1%', '57,1%'), T('90.0%', '90.0%', '90,0%'), T('175%', '175%', '175%')],
        answer: 0, explain: T('0.5 × 630 = 315分。315 ÷ 360 = 87.5%。', '0.5 × 630 = 315 min. 315 ÷ 360 = 87.5%.', '0,5 × 630 = 315 menit. 315 ÷ 360 = 87,5%.') },
      { q: T('「チョコ停」はどの率を下げますか？', 'Minor stops reduce which rate?', 'Henti kecil menurunkan rasio mana?'),
        choices: [T('時間稼働率', 'Availability', 'Availability'), T('性能稼働率', 'Performance', 'Performance'), T('良品率', 'Yield rate', 'Rasio produk baik'), T('どれも下げない', 'None', 'Tidak ada')],
        answer: 1, explain: T('短い停止や空転は、6大ロスでは性能稼働率のロスに分類されます。', 'Short stops and idling are classified as performance losses.', 'Henti singkat dan idle dikelompokkan sebagai kerugian performance.') },
      { q: T('良品率を下げるロスの組み合わせは？', 'Which pair of losses reduces the yield rate?', 'Pasangan kerugian mana yang menurunkan rasio produk baik?'),
        choices: [T('故障ロスと段取りロス', 'Breakdown and setup', 'Kerusakan dan setup'), T('チョコ停と速度低下', 'Minor stops and reduced speed', 'Henti kecil dan penurunan kecepatan'), T('不良・手直しロスと立上がりロス', 'Defect/repair and start-up losses', 'Cacat/perbaikan dan start-up'), T('段取りロスと速度低下', 'Setup and reduced speed', 'Setup dan penurunan kecepatan')],
        answer: 2, explain: T('不良・手直しと立上がりのロスが品質ロスです。', 'Defects/repair and start-up are quality losses.', 'Cacat/perbaikan dan start-up adalah kerugian kualitas.') },
      { q: T('OEEが低いラインへの対応として、ZEVAのXY思考に合っているものは？', 'For a line with low OEE, which action fits ZEVA XY thinking?', 'Untuk lini dengan OEE rendah, tindakan mana yang sesuai pemikiran XY ZEVA?'),
        choices: [T('残業して生産数を確保する', 'Work overtime to secure output', 'Lembur untuk mengejar output'), T('基準CTを実績に合わせて遅くする', 'Slow the ideal CT to match actuals', 'Perlambat CT ideal agar sesuai aktual'), T('故障や停止の原因を特定して除去する', 'Identify and remove causes of breakdowns and stops', 'Identifikasi dan hilangkan penyebab kerusakan dan henti'), T('OEEの目標値を下げる', 'Lower the OEE target', 'Turunkan target OEE')],
        answer: 2, explain: T('OEEは結果（Y）。原因（X）を制御することでOEEが上がります。他はYや基準をいじるだけです。', 'OEE is a result (Y). Controlling causes (X) raises it; the others only manipulate Y or the baseline.', 'OEE adalah hasil (Y). Mengendalikan penyebab (X) menaikkannya; pilihan lain hanya memanipulasi Y atau acuan.') },
      { q: T('ZEVAではOEEはどの評価指標に分類されますか？', 'In ZEVA, OEE belongs to which metric group?', 'Di ZEVA, OEE termasuk kelompok metrik mana?'),
        choices: [T('GPC-M（設備制御）', 'GPC-M (equipment control)', 'GPC-M (kontrol mesin)'), T('GPC-H（人制御）', 'GPC-H (human control)', 'GPC-H (kontrol manusia)'), T('トリアージ', 'Triage', 'Triase'), T('どれにも属さない', 'None', 'Tidak ada')],
        answer: 0, explain: T('OEEは設備の総合効率を表すため、GPC-Mの評価指標です（目標85%以上）。', 'OEE expresses equipment effectiveness, so it is a GPC-M metric (target ≥ 85%).', 'OEE menyatakan efektivitas mesin, jadi termasuk metrik GPC-M (target ≥ 85%).') },
    ],
  });
})();
