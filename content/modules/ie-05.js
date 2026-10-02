ZA.addModule({
  id: 'ie-05',
  track: 'ie',
  order: 5,
  minutes: 30,
  icon: '🗺',
  level: 2,
  prereq: ['ie-04'],
  title: { ja: '工程分析とワークサンプリング', en: 'Process Analysis and Work Sampling', id: 'Analisis Proses dan Work Sampling' },
  summary: {
    ja: '工程記号を使ってモノと人の流れを図に表し、停滞・運搬・検査のムダを見つける方法と、瞬間観測で稼働状況を推定するワークサンプリングを学びます。',
    en: 'Map the flow of materials and people with process symbols to find stagnation, transport and inspection waste, and estimate work status with instantaneous observations (work sampling).',
    id: 'Petakan aliran material dan orang dengan simbol proses untuk menemukan pemborosan stagnasi, transportasi, dan inspeksi, serta perkirakan status kerja dengan pengamatan sesaat (work sampling).'
  },
  objectives: [
    { ja: '工程記号（加工・運搬・停滞・検査）を使い分けられる', en: 'Use the process symbols (operation, transport, delay/storage, inspection) correctly', id: 'Menggunakan simbol proses (operasi, transportasi, tunda/simpan, inspeksi) dengan benar' },
    { ja: '製品工程分析・作業者工程分析を行い、改善点を抽出できる', en: 'Perform product and worker process analysis and extract improvement points', id: 'Melakukan analisis proses produk dan pekerja serta menemukan poin perbaikan' },
    { ja: '流れ線図・マンマシンチャートの目的を説明できる', en: 'Explain the purposes of flow diagrams and man-machine charts', id: 'Menjelaskan tujuan flow diagram dan man-machine chart' },
    { ja: 'ワークサンプリングの原理を理解し、必要観測数と誤差を計算できる', en: 'Understand work sampling and calculate required observations and error', id: 'Memahami work sampling dan menghitung jumlah pengamatan serta galat' }
  ],
  sections: [
    {
      id: 'process-analysis',
      title: { ja: '工程分析とは', en: 'What is process analysis?', id: 'Apa itu analisis proses?' },
      blocks: [
        { type: 'p', text: {
          ja: '[[process-analysis]]とは、原材料が製品になるまで（または作業者が仕事を終えるまで）の過程を、**決められた記号で順番に記録し、流れ全体を見える化する**手法です。動作研究が「手元の動き」を見るのに対し、工程分析は「**流れ全体の中で、どこでモノが止まり、運ばれ、検査されているか**」を見ます。',
          en: '[[process-analysis]] records, **in order and with defined symbols**, the path from raw material to product (or of a worker completing a job), making the **whole flow visible**. Motion study looks at hand movements; process analysis looks at **where in the whole flow goods stop, are carried or are inspected**.',
          id: '[[process-analysis]] mencatat, **secara berurutan dengan simbol yang ditetapkan**, jalur dari bahan baku menjadi produk (atau pekerja menyelesaikan tugas), sehingga **seluruh aliran terlihat**. Studi gerakan melihat gerakan tangan; analisis proses melihat **di mana dalam seluruh aliran barang berhenti, dibawa, atau diperiksa**.'
        } },
        { type: 'p', text: {
          ja: 'IEの改善では「木を見る前に森を見る」ことが大切です。手元の動作を1秒短縮しても、その前後でモノが2日間止まっていれば、全体への効果はわずかです。',
          en: 'In IE improvement it is important to “see the forest before the trees”. Shortening a hand motion by 1 second has little overall effect if goods sit for 2 days before and after it.',
          id: 'Dalam perbaikan IE penting untuk “melihat hutan sebelum pohon”. Memperpendek gerakan tangan 1 detik berdampak kecil jika barang diam 2 hari sebelum dan sesudahnya.'
        } }
      ]
    },
    {
      id: 'symbols',
      title: { ja: '工程記号', en: 'Process symbols', id: 'Simbol proses' },
      blocks: [
        { type: 'p', text: {
          ja: '工程分析では、すべての工程を次の[[process-symbols]]のどれかに分類します。**付加価値を生むのは「加工」だけ**です。',
          en: 'In process analysis every step is classified into one of the following [[process-symbols]]. **Only “operation” adds value.**',
          id: 'Dalam analisis proses setiap langkah diklasifikasikan ke salah satu [[process-symbols]] berikut. **Hanya “operasi” yang menambah nilai.**'
        } },
        { type: 'diagram', name: 'process-symbols', caption: { ja: 'JIS Z 8206 / ASME方式の基本工程記号', en: 'Basic process symbols (JIS Z 8206 / ASME style)', id: 'Simbol proses dasar (gaya JIS Z 8206 / ASME)' } },
        { type: 'table',
          head: [ { ja: '記号', en: 'Symbol', id: 'Simbol' }, { ja: '名称', en: 'Name', id: 'Nama' }, { ja: '意味', en: 'Meaning', id: 'Arti' }, { ja: '付加価値', en: 'Value', id: 'Nilai' } ],
          rows: [
            [ '○', { ja: '加工', en: 'Operation', id: 'Operasi' }, { ja: '形・性質を変える、組み立てる', en: 'change shape or properties, assemble', id: 'mengubah bentuk atau sifat, merakit' }, { ja: 'あり', en: 'Yes', id: 'Ya' } ],
            [ '⇨ / ○(小)', { ja: '運搬', en: 'Transport', id: 'Transportasi' }, { ja: '場所を移動させる', en: 'move to another place', id: 'memindahkan ke tempat lain' }, { ja: 'なし', en: 'No', id: 'Tidak' } ],
            [ '▽', { ja: '貯蔵', en: 'Storage', id: 'Penyimpanan' }, { ja: '計画的に保管する（倉庫など）', en: 'planned storage (warehouse, etc.)', id: 'penyimpanan terencana (gudang, dll.)' }, { ja: 'なし', en: 'No', id: 'Tidak' } ],
            [ 'D', { ja: '滞留（停滞）', en: 'Delay', id: 'Tunda (stagnasi)' }, { ja: '計画に反して止まって待つ', en: 'unplanned waiting', id: 'menunggu tak terencana' }, { ja: 'なし', en: 'No', id: 'Tidak' } ],
            [ '□', { ja: '数量検査', en: 'Quantity inspection', id: 'Inspeksi jumlah' }, { ja: '数を数えて確認する', en: 'count and check quantity', id: 'menghitung dan memeriksa jumlah' }, { ja: 'なし', en: 'No', id: 'Tidak' } ],
            [ '◇', { ja: '品質検査', en: 'Quality inspection', id: 'Inspeksi kualitas' }, { ja: '品質特性を確認する', en: 'check quality characteristics', id: 'memeriksa karakteristik kualitas' }, { ja: 'なし', en: 'No', id: 'Tidak' } ]
          ],
          caption: { ja: '規格により運搬の記号（⇨ または 小さな○）が異なります。社内で統一して使いましょう。', en: 'The transport symbol (⇨ or small ○) differs by standard; use one convention consistently.', id: 'Simbol transportasi (⇨ atau ○ kecil) berbeda menurut standar; gunakan satu konvensi secara konsisten.' } },
        { type: 'callout', kind: 'zeva',
          title: { ja: '検査は付加価値を生まない', en: 'Inspection adds no value', id: 'Inspeksi tidak menambah nilai' },
          text: { ja: '検査は不良を「見つける」だけで、良品を「作る」わけではありません。ZEVAでは、検査を厳しくして結果（Y）を操作するのではなく、**原因（X）であるバラツキを工程で制御し、良品を保証する条件（GPC）をつくる**ことを目指します。', en: 'Inspection only “finds” defects; it does not “make” good products. ZEVA does not manipulate the result (Y) by tightening inspection but aims to **control variation — the cause (X) — in the process and create conditions that guarantee good products (GPC)**.', id: 'Inspeksi hanya “menemukan” cacat, tidak “membuat” produk baik. ZEVA tidak memanipulasi hasil (Y) dengan memperketat inspeksi, tetapi berupaya **mengendalikan variasi — penyebab (X) — dalam proses dan menciptakan kondisi yang menjamin produk baik (GPC)**.' } }
      ]
    },
    {
      id: 'product-worker',
      title: { ja: '製品工程分析と作業者工程分析', en: 'Product and worker process analysis', id: 'Analisis proses produk dan pekerja' },
      blocks: [
        { type: 'compare',
          left: { title: { ja: '製品工程分析（モノを追う）', en: 'Product process analysis (follow the item)', id: 'Analisis proses produk (ikuti barang)' }, tone: 'blue', items: [
            { ja: '材料や部品に「なりきって」一緒に移動する', en: 'move along as if you were the material or part', id: 'bergerak seolah Anda adalah material atau part' },
            { ja: '停滞・運搬の多さ、距離、時間を把握', en: 'grasp the number, distance and time of delays and transports', id: 'pahami jumlah, jarak, dan waktu tunda serta transportasi' },
            { ja: 'レイアウト改善、リードタイム短縮に有効', en: 'effective for layout improvement and lead-time reduction', id: 'efektif untuk perbaikan tata letak dan pengurangan lead time' }
          ] },
          right: { title: { ja: '作業者工程分析（人を追う）', en: 'Worker process analysis (follow the person)', id: 'Analisis proses pekerja (ikuti orang)' }, tone: 'green', items: [
            { ja: '作業者について回り、行った仕事を順に記録', en: 'follow the worker and record tasks in order', id: 'ikuti pekerja dan catat tugas secara berurutan' },
            { ja: '歩行・探す・待ちの多さを把握', en: 'grasp amount of walking, searching and waiting', id: 'pahami banyaknya berjalan, mencari, dan menunggu' },
            { ja: '作業の組み合わせ見直し、多工程持ちの設計に有効', en: 'effective for recombining tasks and designing multi-process handling', id: 'efektif untuk menata ulang tugas dan merancang penanganan multi-proses' }
          ] } },
        { type: 'example',
          title: { ja: '製品工程分析の例（説明用）', en: 'Product process analysis example (illustrative)', id: 'Contoh analisis proses produk (ilustrasi)' },
          steps: [
            { ja: '▽ 部品倉庫で保管（平均2日）', en: '▽ Stored in parts warehouse (avg. 2 days)', id: '▽ Disimpan di gudang part (rata-rata 2 hari)' },
            { ja: '⇨ 台車でラインへ運搬（80m）', en: '⇨ Carted to the line (80 m)', id: '⇨ Dibawa troli ke lini (80 m)' },
            { ja: 'D ライン脇で開梱待ち（3時間）', en: 'D Waiting beside line to be unpacked (3 h)', id: 'D Menunggu dibongkar di samping lini (3 jam)' },
            { ja: '○ 組立（90秒）', en: '○ Assembly (90 s)', id: '○ Perakitan (90 detik)' },
            { ja: 'D 検査待ち（1時間）', en: 'D Waiting for inspection (1 h)', id: 'D Menunggu inspeksi (1 jam)' },
            { ja: '◇ 外観検査（30秒）', en: '◇ Visual inspection (30 s)', id: '◇ Inspeksi visual (30 detik)' },
            { ja: '⇨ 出荷場へ運搬（120m）', en: '⇨ Moved to shipping area (120 m)', id: '⇨ Dibawa ke area pengiriman (120 m)' }
          ],
          result: { ja: '7工程中、加工（○）は1つだけ。時間の大半は停滞（▽・D）で、運搬距離は合計200m。改善はまず停滞と運搬から、が正しい順序です。', en: 'Of 7 steps only one is an operation (○). Most of the time is stagnation (▽, D) and transport totals 200 m. The right order is to attack stagnation and transport first.', id: 'Dari 7 langkah hanya satu operasi (○). Sebagian besar waktu adalah stagnasi (▽, D) dan transportasi total 200 m. Urutan yang benar: tangani stagnasi dan transportasi dulu.' } },
        { type: 'callout', kind: 'tip',
          title: { ja: '集計表で見える化する', en: 'Visualise with a summary table', id: 'Visualkan dengan tabel ringkasan' },
          text: { ja: '工程分析の最後に、記号ごとの「回数・距離・時間」を集計します。改善前後で同じ集計を比べると、効果が一目で分かります。', en: 'At the end of process analysis, total the count, distance and time per symbol. Comparing the same summary before and after shows the effect at a glance.', id: 'Di akhir analisis proses, jumlahkan frekuensi, jarak, dan waktu per simbol. Membandingkan ringkasan yang sama sebelum dan sesudah menunjukkan efeknya sekilas.' } }
      ]
    },
    {
      id: 'charts',
      title: { ja: '流れ線図・マンマシンチャート・連合作業分析', en: 'Flow diagram, man-machine chart, multi-activity analysis', id: 'Flow diagram, man-machine chart, analisis multi-aktivitas' },
      blocks: [
        { type: 'cards', cols: 3, items: [
          { icon: '🧭', tone: 'blue', title: { ja: '流れ線図', en: 'Flow diagram', id: 'Flow diagram' },
            text: { ja: '[[flow-diagram]]：工場の平面図に工程記号と移動経路を書き込む。逆流・交差・長距離運搬がひと目で分かり、レイアウト改善に使う。', en: '[[flow-diagram]]: draw process symbols and movement paths on the floor plan. Backflow, crossings and long transports become obvious; used for layout improvement.', id: '[[flow-diagram]]: gambar simbol proses dan jalur perpindahan pada denah pabrik. Aliran balik, persilangan, dan transportasi jauh terlihat jelas; dipakai untuk perbaikan tata letak.' } },
          { icon: '🤝', tone: 'green', title: { ja: 'マンマシンチャート', en: 'Man-machine chart', id: 'Man-machine chart' },
            text: { ja: '[[man-machine-chart]]：人と機械の稼働・待ちを同じ時間軸に並べる。機械の自動加工中に人が手待ちしている時間を見つけ、多台持ちなどを検討する。', en: '[[man-machine-chart]]: place the working and idle time of person and machine on one time axis. Find person waiting during automatic cycles and consider multi-machine handling.', id: '[[man-machine-chart]]: letakkan waktu kerja dan menganggur orang serta mesin pada satu sumbu waktu. Temukan orang menunggu saat siklus otomatis dan pertimbangkan penanganan multi-mesin.' } },
          { icon: '👥', tone: 'amber', title: { ja: '連合作業分析', en: 'Multi-activity analysis', id: 'Analisis multi-aktivitas' },
            text: { ja: '複数の作業者（や設備）が連携する作業で、互いを待っている時間を分析する。受け渡しのタイミングや人数配分の見直しに使う。', en: 'Analyse waiting time among several workers (or machines) in coordinated work; used to review hand-over timing and staffing.', id: 'Analisis waktu tunggu antar beberapa pekerja (atau mesin) dalam kerja terkoordinasi; dipakai meninjau waktu serah terima dan jumlah orang.' } }
        ] },
        { type: 'example',
          title: { ja: 'マンマシンチャートの計算例', en: 'Man-machine chart worked example', id: 'Contoh man-machine chart' },
          steps: [
            { ja: '機械：ワーク着脱20秒（人と一緒）＋自動加工100秒 = 1サイクル120秒', en: 'Machine: load/unload 20 s (with person) + auto cycle 100 s = 120 s per cycle', id: 'Mesin: pasang/lepas 20 detik (bersama orang) + siklus otomatis 100 detik = 120 detik per siklus' },
            { ja: '人：着脱20秒＋手待ち100秒 → 人の稼働率 = 20 ÷ 120 ≈ 17%', en: 'Person: load/unload 20 s + idle 100 s → person utilisation = 20 ÷ 120 ≈ 17%', id: 'Orang: pasang/lepas 20 detik + menganggur 100 detik → utilisasi orang = 20 ÷ 120 ≈ 17%' },
            { ja: '機械3台を並べ、1台あたり歩行10秒を加えて順に回る：人の1周 = (20+10)×3 = 90秒 ≤ 120秒', en: 'Line up 3 machines with 10 s walking each: one round = (20+10)×3 = 90 s ≤ 120 s', id: 'Jajarkan 3 mesin dengan jalan 10 detik tiap mesin: satu putaran = (20+10)×3 = 90 detik ≤ 120 detik' }
          ],
          result: { ja: '1人で3台を受け持てるため、人の手待ちが大きく減ります（数値は説明用）。', en: 'One person can handle 3 machines, greatly reducing idle time (illustrative numbers).', id: 'Satu orang dapat menangani 3 mesin, mengurangi waktu menganggur secara besar (angka ilustrasi).' } }
      ]
    },
    {
      id: 'work-sampling',
      title: { ja: 'ワークサンプリング', en: 'Work sampling', id: 'Work sampling' },
      blocks: [
        { type: 'p', text: {
          ja: '[[work-sampling]]は、**ランダムな瞬間に何度も観測し、「そのとき何をしていたか」を記録して、各状態の時間比率を統計的に推定する**方法です。ストップウォッチで1日中張り付かなくても、多くの人や設備の稼働状況を効率よくつかめます。',
          en: '[[work-sampling]] **observes at many random instants, records “what was happening at that moment”, and statistically estimates the time share of each state**. You can grasp the utilisation of many people or machines efficiently without timing them all day.',
          id: '[[work-sampling]] **mengamati pada banyak saat acak, mencatat “apa yang terjadi saat itu”, dan memperkirakan secara statistik porsi waktu tiap kondisi**. Utilisasi banyak orang atau mesin dapat diketahui secara efisien tanpa mengukur sepanjang hari.'
        } },
        { type: 'list', ordered: true, items: [
          { ja: '観測の目的と、記録する状態の分類（例：作業中／運搬／手待ち／不在）を決める', en: 'Decide the purpose and the categories of states (e.g. working / transporting / idle / absent)', id: 'Tentukan tujuan dan kategori kondisi (mis. bekerja / mengangkut / menganggur / tidak ada)' },
          { ja: '乱数表などで観測時刻をランダムに決める（規則的だと偏りが出る）', en: 'Set observation times randomly, e.g. with random numbers (regular timing causes bias)', id: 'Tetapkan waktu pengamatan secara acak, mis. dengan angka acak (waktu teratur menimbulkan bias)' },
          { ja: '決めた瞬間に観測し、状態を1つだけ記録する', en: 'Observe at each chosen instant and record exactly one state', id: 'Amati pada setiap saat terpilih dan catat tepat satu kondisi' },
          { ja: '十分な回数を集めたら、状態ごとの比率を計算する', en: 'After enough observations, compute the ratio for each state', id: 'Setelah pengamatan cukup, hitung rasio tiap kondisi' }
        ] },
        { type: 'formula',
          expr: { ja: '比率の推定値 p = 該当回数 ÷ 総観測回数', en: 'Estimated ratio p = count of the state ÷ total observations', id: 'Rasio perkiraan p = jumlah kondisi ÷ total pengamatan' } },
        { type: 'formula',
          expr: { ja: '必要観測数 n = 4 × p(1 − p) ÷ e²　（信頼度約95%）', en: 'Required observations n = 4 × p(1 − p) ÷ e²   (about 95% confidence)', id: 'Jumlah pengamatan n = 4 × p(1 − p) ÷ e²   (kepercayaan sekitar 95%)' },
          where: [
            { sym: 'p', text: { ja: '予想される比率（予備観測から）', en: 'expected ratio (from pilot observation)', id: 'rasio yang diharapkan (dari pengamatan awal)' } },
            { sym: 'e', text: { ja: '許容する絶対誤差（例：±0.05 = ±5ポイント）', en: 'acceptable absolute error (e.g. ±0.05 = ±5 points)', id: 'galat absolut yang diterima (mis. ±0,05 = ±5 poin)' } }
          ],
          note: { ja: '係数4は 1.96² ≈ 3.84 を丸めた値です。誤差は e = 2 × √( p(1−p) ÷ n ) でも求められます。', en: 'The factor 4 rounds 1.96² ≈ 3.84. Error can also be computed as e = 2 × √( p(1−p) ÷ n ).', id: 'Faktor 4 adalah pembulatan 1,96² ≈ 3,84. Galat juga dapat dihitung e = 2 × √( p(1−p) ÷ n ).' } },
        { type: 'example',
          title: { ja: '計算例：必要な観測数', en: 'Worked example: required observations', id: 'Contoh: jumlah pengamatan yang dibutuhkan' },
          steps: [
            { ja: '予備観測で作業中の比率 p ≈ 0.70', en: 'Pilot shows working ratio p ≈ 0.70', id: 'Pengamatan awal menunjukkan rasio bekerja p ≈ 0,70' },
            { ja: '許容誤差 e = ±0.05 としたい', en: 'Desired error e = ±0.05', id: 'Galat yang diinginkan e = ±0,05' },
            { ja: 'n = 4 × 0.70 × 0.30 ÷ 0.05² = 0.84 ÷ 0.0025 = 336回', en: 'n = 4 × 0.70 × 0.30 ÷ 0.05² = 0.84 ÷ 0.0025 = 336', id: 'n = 4 × 0,70 × 0,30 ÷ 0,05² = 0,84 ÷ 0,0025 = 336' },
            { ja: '誤差を±0.03にしたいと n = 0.84 ÷ 0.0009 ≈ 933回', en: 'For ±0.03, n = 0.84 ÷ 0.0009 ≈ 933', id: 'Untuk ±0,03, n = 0,84 ÷ 0,0009 ≈ 933' }
          ],
          result: { ja: '誤差を小さくするほど観測回数は急増します（誤差を約半分にすると回数は約4倍）。目的に合った精度を選びましょう。', en: 'Required observations grow quickly as error shrinks (halving the error needs about 4× observations). Choose the precision that fits the purpose.', id: 'Jumlah pengamatan meningkat cepat saat galat mengecil (galat setengah butuh sekitar 4× pengamatan). Pilih presisi sesuai tujuan.' } },
        { type: 'widget', name: 'work-sampling', props: { trueRatio: 0.7 } },
        { type: 'callout', kind: 'zeva',
          title: { ja: 'データの信頼性という視点', en: 'The viewpoint of data reliability', id: 'Sudut pandang keandalan data' },
          text: { ja: '観測回数が少ない推定値は、たまたまの結果に大きく左右されます。ZEVAの根底ロジックは「**データに基づくアクションには信頼性の高いデータが必要**」というものです。どれくらいの誤差を含む数字なのかを意識して判断する習慣が、改善の質を高めます。', en: 'Estimates from few observations are heavily affected by chance. ZEVA’s root logic states that “**actions based on data require reliable data**”. The habit of judging with awareness of how much error a number contains raises the quality of improvement.', id: 'Perkiraan dari sedikit pengamatan sangat dipengaruhi kebetulan. Logika dasar ZEVA menyatakan “**tindakan berbasis data membutuhkan data yang andal**”. Kebiasaan menilai dengan sadar seberapa besar galat suatu angka meningkatkan kualitas perbaikan.' } }
      ]
    },
    {
      id: 'improve-flow',
      title: { ja: '工程分析からの改善', en: 'Improving from process analysis', id: 'Perbaikan dari analisis proses' },
      blocks: [
        { type: 'table',
          head: [ { ja: '記号', en: 'Symbol', id: 'Simbol' }, { ja: '改善の問いかけ', en: 'Improvement question', id: 'Pertanyaan perbaikan' }, { ja: '改善例', en: 'Example', id: 'Contoh' } ],
          rows: [
            [ { ja: '▽ D 停滞', en: '▽ D Stagnation', id: '▽ D Stagnasi' }, { ja: 'なぜ止まる？ まとめて作っていないか？', en: 'Why does it stop? Are we batching?', id: 'Mengapa berhenti? Apakah kita memproduksi per batch?' }, { ja: '1個流し、工程間の同期化、置き場の廃止', en: 'one-piece flow, synchronising processes, removing storage areas', id: 'aliran satu unit, sinkronisasi proses, menghapus area simpan' } ],
            [ { ja: '⇨ 運搬', en: '⇨ Transport', id: '⇨ Transportasi' }, { ja: '工程を近づけられないか？', en: 'Can processes be moved closer?', id: 'Bisakah proses didekatkan?' }, { ja: '工程の隣接配置、U字ライン、直結化', en: 'adjacent layout, U-shaped line, direct connection', id: 'tata letak berdekatan, lini bentuk U, sambungan langsung' } ],
            [ { ja: '□ ◇ 検査', en: '□ ◇ Inspection', id: '□ ◇ Inspeksi' }, { ja: '検査しなくても良品が保証できないか？', en: 'Can good quality be guaranteed without inspection?', id: 'Bisakah kualitas baik dijamin tanpa inspeksi?' }, { ja: 'ポカヨケ、工程内での品質保証、条件管理', en: 'poka-yoke, in-process quality assurance, condition control', id: 'poka-yoke, jaminan kualitas dalam proses, pengendalian kondisi' } ],
            [ { ja: '○ 加工', en: '○ Operation', id: '○ Operasi' }, { ja: 'この加工は本当に必要か？ 結合できないか？', en: 'Is this operation really needed? Can it be combined?', id: 'Apakah operasi ini benar-benar perlu? Bisa digabung?' }, { ja: 'ECRSによる見直し、複合加工', en: 'ECRS review, combined processing', id: 'tinjauan ECRS, pemrosesan gabungan' } ]
          ] },
        { type: 'check',
          q: { ja: '流れ線図で「同じ通路をモノが行ったり来たりしている（逆流）」ことが分かった。最も適切な対策は？', en: 'A flow diagram shows goods going back and forth along the same aisle (backflow). Best countermeasure?', id: 'Flow diagram menunjukkan barang bolak-balik di lorong yang sama (aliran balik). Tindakan terbaik?' },
          choices: [ { ja: '運搬用の台車を増やす', en: 'Add more carts', id: 'Tambah troli' }, { ja: '工程の並び順どおりに設備を再配置する', en: 'Rearrange equipment in process order', id: 'Tata ulang peralatan sesuai urutan proses' }, { ja: '検査工程を追加する', en: 'Add an inspection step', id: 'Tambah langkah inspeksi' } ],
          answer: 1,
          explain: { ja: '逆流はレイアウトが工程順になっていない証拠です。運搬手段を増やすのではなく、運搬そのものを減らす配置にします（ECRSのR：交換）。', en: 'Backflow shows the layout does not follow process order. Reduce transport itself by rearranging (ECRS “R”), instead of adding carriers.', id: 'Aliran balik menunjukkan tata letak tidak sesuai urutan proses. Kurangi transportasi dengan penataan ulang (ECRS “R”), bukan menambah alat angkut.' } },
        { type: 'callout', kind: 'key',
          title: { ja: 'この単元のまとめの視点', en: 'Key viewpoint of this unit', id: 'Sudut pandang utama unit ini' },
          text: { ja: '工程分析は「加工以外はすべてロス」という目で流れを見る道具です。この見方は、ZEVAの基盤である理論値の「価値作業だけを最速で流し、それ以外はロスとして削る」という思想と同じ方向を向いています。', en: 'Process analysis is a tool for viewing the flow with the eye that “everything except operations is loss”. This matches the idea at the base of ZEVA: “flow only value work at top speed and cut everything else as loss”.', id: 'Analisis proses adalah alat untuk melihat aliran dengan pandangan “semua selain operasi adalah kerugian”. Ini sejalan dengan gagasan yang mendasari ZEVA: “alirkan hanya kerja bernilai dengan kecepatan tertinggi dan pangkas sisanya sebagai kerugian”.' } }
      ]
    }
  ],
  keyPoints: [
    { ja: '工程分析は流れ全体を工程記号で見える化し、「森」を見る手法', en: 'Process analysis visualises the whole flow with symbols — seeing the forest', id: 'Analisis proses memvisualkan seluruh aliran dengan simbol — melihat hutan' },
    { ja: '付加価値を生むのは「加工（○）」だけ。運搬・停滞・検査は削減対象', en: 'Only operations (○) add value; transport, stagnation and inspection are targets for reduction', id: 'Hanya operasi (○) yang menambah nilai; transportasi, stagnasi, dan inspeksi harus dikurangi' },
    { ja: '製品工程分析はモノを追い、作業者工程分析は人を追う', en: 'Product analysis follows the item; worker analysis follows the person', id: 'Analisis produk mengikuti barang; analisis pekerja mengikuti orang' },
    { ja: '流れ線図はレイアウト、マンマシンチャートは人と機械の待ちを明らかにする', en: 'Flow diagrams reveal layout issues; man-machine charts reveal waiting between people and machines', id: 'Flow diagram mengungkap masalah tata letak; man-machine chart mengungkap waktu tunggu orang dan mesin' },
    { ja: 'ワークサンプリングの必要観測数 n = 4p(1−p)/e²。数字の誤差を意識して判断する', en: 'Work sampling needs n = 4p(1−p)/e²; judge with awareness of error', id: 'Work sampling membutuhkan n = 4p(1−p)/e²; menilai dengan sadar galat' }
  ],
  quiz: [
    { q: { ja: '工程記号のうち、付加価値を生むのはどれ？', en: 'Which process symbol adds value?', id: 'Simbol proses mana yang menambah nilai?' },
      choices: [ { ja: '○ 加工', en: '○ Operation', id: '○ Operasi' }, { ja: '⇨ 運搬', en: '⇨ Transport', id: '⇨ Transportasi' }, { ja: '◇ 品質検査', en: '◇ Quality inspection', id: '◇ Inspeksi kualitas' }, { ja: '▽ 貯蔵', en: '▽ Storage', id: '▽ Penyimpanan' } ],
      answer: 0,
      explain: { ja: '形や性質を変える加工だけが付加価値を生みます。', en: 'Only operations that change shape or properties add value.', id: 'Hanya operasi yang mengubah bentuk atau sifat yang menambah nilai.' } },
    { q: { ja: '材料になりきって一緒に移動しながら記録する分析は？', en: 'Which analysis records by moving along as if you were the material?', id: 'Analisis mana yang mencatat dengan bergerak seolah Anda material?' },
      choices: [ { ja: '作業者工程分析', en: 'Worker process analysis', id: 'Analisis proses pekerja' }, { ja: '製品工程分析', en: 'Product process analysis', id: 'Analisis proses produk' }, { ja: '両手作業分析', en: 'Two-hand analysis', id: 'Analisis dua tangan' }, { ja: 'ワークサンプリング', en: 'Work sampling', id: 'Work sampling' } ],
      answer: 1,
      explain: { ja: 'モノを追うのが製品工程分析、人を追うのが作業者工程分析です。', en: 'Following the item is product process analysis; following the person is worker process analysis.', id: 'Mengikuti barang adalah analisis proses produk; mengikuti orang adalah analisis proses pekerja.' } },
    { q: { ja: '機械の自動加工中に作業者がずっと待っていることを明らかにするのに適した図は？', en: 'Which chart best reveals a worker waiting during automatic machining?', id: 'Diagram mana yang paling mengungkap pekerja menunggu saat mesin otomatis?' },
      choices: [ { ja: '流れ線図', en: 'Flow diagram', id: 'Flow diagram' }, { ja: 'パレート図', en: 'Pareto chart', id: 'Diagram Pareto' }, { ja: 'マンマシンチャート', en: 'Man-machine chart', id: 'Man-machine chart' }, { ja: 'ヒストグラム', en: 'Histogram', id: 'Histogram' } ],
      answer: 2,
      explain: { ja: '人と機械の稼働・待ちを同じ時間軸に並べるマンマシンチャートが適しています。', en: 'The man-machine chart puts person and machine work/idle on one time axis.', id: 'Man-machine chart menaruh kerja/menganggur orang dan mesin pada satu sumbu waktu.' } },
    { q: { ja: 'ワークサンプリングで p = 0.5、許容誤差 e = ±0.05 のときの必要観測数は？（n = 4p(1−p)/e²）', en: 'Work sampling with p = 0.5 and e = ±0.05. Required n? (n = 4p(1−p)/e²)', id: 'Work sampling dengan p = 0,5 dan e = ±0,05. Berapa n? (n = 4p(1−p)/e²)' },
      choices: [ { ja: '100回', en: '100', id: '100' }, { ja: '200回', en: '200', id: '200' }, { ja: '400回', en: '400', id: '400' }, { ja: '1,000回', en: '1,000', id: '1.000' } ],
      answer: 2,
      explain: { ja: 'n = 4 × 0.5 × 0.5 ÷ 0.0025 = 1 ÷ 0.0025 = 400回です。', en: 'n = 4 × 0.5 × 0.5 ÷ 0.0025 = 1 ÷ 0.0025 = 400.', id: 'n = 4 × 0,5 × 0,5 ÷ 0,0025 = 1 ÷ 0,0025 = 400.' } },
    { q: { ja: 'ワークサンプリングで観測時刻をランダムにする理由は？', en: 'Why are observation times randomised in work sampling?', id: 'Mengapa waktu pengamatan diacak dalam work sampling?' },
      choices: [ { ja: '観測者が楽だから', en: 'It is easier for the observer', id: 'Lebih mudah bagi pengamat' }, { ja: '規則的だと周期的な作業と重なり偏りが出るから', en: 'Regular timing can coincide with periodic work and cause bias', id: 'Waktu teratur bisa bertepatan dengan kerja periodik dan menimbulkan bias' }, { ja: '観測回数を減らせるから', en: 'It reduces the number of observations', id: 'Mengurangi jumlah pengamatan' }, { ja: '規格で決まっているだけで意味はない', en: 'Only a rule with no meaning', id: 'Hanya aturan tanpa makna' } ],
      answer: 1,
      explain: { ja: '一定間隔だと、例えば休憩や定時の運搬と毎回重なり、実態と違う比率になる恐れがあります。', en: 'Fixed intervals may always coincide with, e.g., breaks or scheduled transport, giving ratios that differ from reality.', id: 'Interval tetap bisa selalu bertepatan dengan, mis., istirahat atau transportasi terjadwal, sehingga rasio berbeda dari kenyataan.' } },
    { q: { ja: '製品工程分析で、7工程中6工程が停滞・運搬・検査だった。最初に取り組むべき改善は？', en: 'Product analysis shows 6 of 7 steps are stagnation, transport or inspection. What to tackle first?', id: 'Analisis produk menunjukkan 6 dari 7 langkah adalah stagnasi, transportasi, atau inspeksi. Apa yang ditangani dulu?' },
      choices: [ { ja: '加工時間を1秒短縮する', en: 'Cut 1 second from the operation', id: 'Kurangi 1 detik dari operasi' }, { ja: '停滞と運搬を減らす', en: 'Reduce stagnation and transport', id: 'Kurangi stagnasi dan transportasi' }, { ja: '検査員を増やす', en: 'Add inspectors', id: 'Tambah inspektur' }, { ja: '倉庫を広げる', en: 'Expand the warehouse', id: 'Perluas gudang' } ],
      answer: 1,
      explain: { ja: '流れ全体の時間の大半を占める停滞・運搬に取り組む方が、全体への効果が圧倒的に大きくなります。', en: 'Stagnation and transport dominate total time, so attacking them has far greater overall effect.', id: 'Stagnasi dan transportasi mendominasi total waktu, sehingga menanganinya berdampak jauh lebih besar.' } },
    { q: { ja: 'ZEVAの考え方で、「不良が多いので検査工程を増やす」ことへの評価は？', en: 'From ZEVA’s viewpoint, how is “adding inspection because defects are high” evaluated?', id: 'Dari sudut pandang ZEVA, bagaimana menilai “menambah inspeksi karena cacat tinggi”?' },
      choices: [ { ja: '最良の対策', en: 'The best countermeasure', id: 'Tindakan terbaik' }, { ja: '結果（Y）を操作しているだけで、原因（X）の制御になっていない', en: 'It only manipulates the result (Y), not controlling the cause (X)', id: 'Hanya memanipulasi hasil (Y), bukan mengendalikan penyebab (X)' }, { ja: '付加価値を増やす対策', en: 'A measure that adds value', id: 'Tindakan yang menambah nilai' }, { ja: 'ワークサンプリングの一種', en: 'A kind of work sampling', id: 'Sejenis work sampling' } ],
      answer: 1,
      explain: { ja: '検査は付加価値を生まず、不良の発生原因も減らしません。ZEVAでは原因（X）であるバラツキを工程で制御します。', en: 'Inspection adds no value and does not reduce the causes of defects. ZEVA controls the variation (X) in the process.', id: 'Inspeksi tidak menambah nilai dan tidak mengurangi penyebab cacat. ZEVA mengendalikan variasi (X) dalam proses.' } }
  ]
});
