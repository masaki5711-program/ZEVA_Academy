ZA.addModule({
  id: 'ie-02',
  track: 'ie',
  order: 2,
  minutes: 25,
  icon: '⏱',
  level: 1,
  prereq: ['ie-01'],
  title: { ja: '時間の基本：TT・CT・リードタイム', en: 'Time Basics: TT, CT and Lead Time', id: 'Dasar Waktu: TT, CT, dan Lead Time' },
  summary: {
    ja: '稼働時間・タクトタイム・サイクルタイム・リードタイム・生産能力の意味と計算方法を学び、「必要なペース」と「現場の実力」を比較できるようになります。',
    en: 'Learn the meaning and calculation of available time, takt time, cycle time, lead time and capacity, and compare the required pace with the actual ability of the floor.',
    id: 'Pelajari arti dan perhitungan waktu tersedia, takt time, cycle time, lead time, dan kapasitas, lalu bandingkan ritme yang dibutuhkan dengan kemampuan aktual.'
  },
  objectives: [
    { ja: '稼働時間とタクトタイムを計算できる', en: 'Calculate available time and takt time', id: 'Menghitung waktu tersedia dan takt time' },
    { ja: 'サイクルタイムとタクトタイムの違いと関係を説明できる', en: 'Explain the difference and relationship between cycle time and takt time', id: 'Menjelaskan perbedaan dan hubungan cycle time dan takt time' },
    { ja: 'リードタイムの構成要素を分解できる', en: 'Break lead time into its components', id: 'Menguraikan komponen lead time' },
    { ja: '生産能力を計算し、需要に対する過不足を判断できる', en: 'Calculate capacity and judge surplus or shortage against demand', id: 'Menghitung kapasitas dan menilai kelebihan atau kekurangan terhadap permintaan' }
  ],
  sections: [
    {
      id: 'available-time',
      title: { ja: '稼働時間：使える時間はいくらか', en: 'Available time: how much time can we use?', id: 'Waktu tersedia: berapa waktu yang bisa dipakai?' },
      blocks: [
        { type: 'p', text: {
          ja: '時間の計算は、まず「生産に使える時間」を正しく決めることから始まります。[[available-time]]とは、勤務時間から休憩や朝礼、計画的な清掃など**生産しないと決まっている時間**を差し引いた時間です。',
          en: 'Time calculation starts by correctly determining the “time usable for production”. [[available-time]] is shift time minus breaks, meetings, planned cleaning and other **time planned not to produce**.',
          id: 'Perhitungan waktu dimulai dengan menentukan dengan benar “waktu yang bisa dipakai untuk produksi”. [[available-time]] adalah waktu shift dikurangi istirahat, rapat, pembersihan terencana, dan **waktu yang direncanakan tidak berproduksi** lainnya.'
        } },
        { type: 'formula',
          expr: { ja: '稼働時間 = 勤務時間 − 計画停止時間（休憩・朝礼・清掃など）', en: 'Available time = Shift time − Planned stops (breaks, meetings, cleaning, etc.)', id: 'Waktu tersedia = Waktu shift − Henti terencana (istirahat, rapat, pembersihan, dll.)' },
          note: { ja: '突発の設備故障や手待ちは差し引きません。それらは「ロス」として後で改善する対象です。', en: 'Do not subtract unexpected breakdowns or waiting. Those are losses to be improved later.', id: 'Jangan kurangi kerusakan mendadak atau waktu tunggu. Itu adalah kerugian yang harus diperbaiki nanti.' } },
        { type: 'example',
          title: { ja: '計算例', en: 'Worked example', id: 'Contoh perhitungan' },
          steps: [
            { ja: '勤務時間：8:00〜17:00 = 540分', en: 'Shift: 8:00–17:00 = 540 min', id: 'Shift: 08.00–17.00 = 540 menit' },
            { ja: '昼休み60分、小休憩10分×2回、朝礼10分', en: 'Lunch 60 min, two 10-min breaks, 10-min morning meeting', id: 'Makan siang 60 menit, dua istirahat 10 menit, rapat pagi 10 menit' },
            { ja: '計画停止 = 60 + 20 + 10 = 90分', en: 'Planned stops = 60 + 20 + 10 = 90 min', id: 'Henti terencana = 60 + 20 + 10 = 90 menit' },
            { ja: '稼働時間 = 540 − 90 = 450分 = 27,000秒', en: 'Available time = 540 − 90 = 450 min = 27,000 s', id: 'Waktu tersedia = 540 − 90 = 450 menit = 27.000 detik' }
          ],
          result: { ja: '1日に生産に使える時間は450分です。', en: '450 minutes per day are available for production.', id: 'Tersedia 450 menit per hari untuk produksi.' } }
      ]
    },
    {
      id: 'tt',
      title: { ja: 'タクトタイム（TT）：お客様が決めるペース', en: 'Takt time (TT): the pace set by the customer', id: 'Takt time (TT): ritme yang ditentukan pelanggan' },
      blocks: [
        { type: 'p', text: {
          ja: '[[takt-time]]（TT）とは、**1個をどれだけの時間ごとに作ればお客様の需要にちょうど応えられるか**を示す時間です。「タクト」はドイツ語で指揮棒・拍子を意味し、生産のリズムを表します。',
          en: '[[takt-time]] (TT) shows **how often one unit must be made to exactly meet customer demand**. “Takt” is German for the conductor’s beat — it represents the rhythm of production.',
          id: '[[takt-time]] (TT) menunjukkan **setiap berapa lama satu unit harus dibuat agar tepat memenuhi permintaan pelanggan**. “Takt” adalah kata Jerman untuk ketukan dirigen — melambangkan ritme produksi.'
        } },
        { type: 'formula',
          expr: { ja: 'TT = 稼働時間 ÷ 必要生産数', en: 'TT = Available time ÷ Required quantity', id: 'TT = Waktu tersedia ÷ Jumlah produksi yang dibutuhkan' },
          where: [
            { sym: 'T', text: { ja: '1日（または1シフト）の稼働時間（秒）', en: 'available time per day (or shift), in seconds', id: 'waktu tersedia per hari (atau shift), dalam detik' } },
            { sym: 'D', text: { ja: '同じ期間の必要生産数（需要）', en: 'required quantity (demand) in the same period', id: 'jumlah yang dibutuhkan (permintaan) pada periode yang sama' } }
          ],
          note: { ja: 'TTは市場の需要から決まる「基準値」であり、現場が勝手に変えることはできません。', en: 'TT is a reference value determined by market demand; the floor cannot change it on its own.', id: 'TT adalah nilai acuan dari permintaan pasar; lantai produksi tidak dapat mengubahnya sendiri.' } },
        { type: 'example',
          title: { ja: '計算例：TT', en: 'Worked example: TT', id: 'Contoh perhitungan: TT' },
          steps: [
            { ja: '稼働時間 27,000秒、1日の必要数 450台', en: 'Available time 27,000 s, daily demand 450 units', id: 'Waktu tersedia 27.000 detik, permintaan harian 450 unit' },
            { ja: 'TT = 27,000 ÷ 450 = 60秒', en: 'TT = 27,000 ÷ 450 = 60 s', id: 'TT = 27.000 ÷ 450 = 60 detik' },
            { ja: '需要が540台に増えると TT = 27,000 ÷ 540 = 50秒', en: 'If demand rises to 540, TT = 27,000 ÷ 540 = 50 s', id: 'Jika permintaan naik ke 540, TT = 27.000 ÷ 540 = 50 detik' }
          ],
          result: { ja: '需要が増えるほどTTは短くなり、より速いリズムが求められます。', en: 'The higher the demand, the shorter the TT and the faster the rhythm required.', id: 'Semakin tinggi permintaan, semakin pendek TT dan semakin cepat ritme yang dibutuhkan.' } },
        { type: 'callout', kind: 'key',
          title: { ja: 'TTの意味を誤解しない', en: 'Do not misunderstand TT', id: 'Jangan salah paham tentang TT' },
          text: { ja: 'TTは「どれだけ速く作れるか」ではなく「**どれだけのペースで作るべきか**」です。TTより速く作り続けると作りすぎのムダになり、遅いと納期遅れになります。', en: 'TT is not “how fast we can make” but “**at what pace we should make**”. Producing faster than TT becomes overproduction; slower causes late delivery.', id: 'TT bukan “seberapa cepat kita bisa membuat” tetapi “**pada ritme berapa kita seharusnya membuat**”. Lebih cepat dari TT menjadi produksi berlebih; lebih lambat menyebabkan keterlambatan.' } }
      ]
    },
    {
      id: 'ct',
      title: { ja: 'サイクルタイム（CT）：現場の実力', en: 'Cycle time (CT): the actual ability of the floor', id: 'Cycle time (CT): kemampuan aktual lantai produksi' },
      blocks: [
        { type: 'p', text: {
          ja: '[[cycle-time]]（CT）とは、**1つの工程（または作業者）が1サイクルの作業を行うのに実際にかかる時間**です。TTが「需要側の要求」なら、CTは「供給側の実力」です。',
          en: '[[cycle-time]] (CT) is **the actual time one process (or worker) needs to complete one cycle of work**. If TT is the demand side’s request, CT is the supply side’s ability.',
          id: '[[cycle-time]] (CT) adalah **waktu aktual yang dibutuhkan satu proses (atau pekerja) untuk menyelesaikan satu siklus kerja**. Jika TT adalah permintaan sisi pasar, CT adalah kemampuan sisi pasokan.'
        } },
        { type: 'table',
          head: [ { ja: '関係', en: 'Relationship', id: 'Hubungan' }, { ja: '状態', en: 'State', id: 'Kondisi' }, { ja: '起きること', en: 'What happens', id: 'Yang terjadi' } ],
          rows: [
            [ 'CT > TT', { ja: '能力不足', en: 'Capacity shortage', id: 'Kekurangan kapasitas' }, { ja: '残業・納期遅れ・無理な作業（ムリ）', en: 'overtime, late delivery, overburden (muri)', id: 'lembur, terlambat kirim, beban berlebih (muri)' } ],
            [ 'CT ≈ TT', { ja: 'ちょうど良い', en: 'Balanced', id: 'Seimbang' }, { ja: '需要どおりに流れる（ただしバラツキがあると崩れる）', en: 'flows with demand (but collapses if variation exists)', id: 'mengalir sesuai permintaan (namun runtuh bila ada variasi)' } ],
            [ 'CT < TT', { ja: '能力余剰', en: 'Capacity surplus', id: 'Kelebihan kapasitas' }, { ja: '作りすぎ・手待ち（ムダ）。人員や工程の再編成の余地', en: 'overproduction, waiting (muda); room to rebalance people/processes', id: 'produksi berlebih, menunggu (muda); ruang untuk menata ulang orang/proses' } ]
          ] },
        { type: 'h', text: { ja: 'CTを測るときの注意', en: 'Cautions when measuring CT', id: 'Perhatian saat mengukur CT' } },
        { type: 'list', items: [
          { ja: '1回だけでなく、**複数回（10回以上）連続して**測る', en: 'Measure **several (10+) consecutive cycles**, not just once', id: 'Ukur **beberapa (10+) siklus berturut-turut**, bukan sekali saja' },
          { ja: '作業の開始点と終了点（区切り）を事前に決める', en: 'Decide the start and end points (break points) in advance', id: 'Tentukan titik awal dan akhir (titik potong) sebelumnya' },
          { ja: '部品切れ・設備停止など「異常」が混ざったサイクルは記録して区別する', en: 'Record and separate cycles containing abnormalities such as part shortage or machine stops', id: 'Catat dan pisahkan siklus yang berisi kelainan seperti part habis atau mesin berhenti' },
          { ja: '平均だけでなく、**最小値と最大値の差（バラツキ）**を見る', en: 'Look not only at the average but at **the gap between minimum and maximum (variation)**', id: 'Lihat bukan hanya rata-rata tetapi **selisih minimum dan maksimum (variasi)**' }
        ] },
        { type: 'callout', kind: 'zeva',
          title: { ja: 'CTは「平均」ではなく「分布」で見る', en: 'Look at CT as a distribution, not an average', id: 'Lihat CT sebagai distribusi, bukan rata-rata' },
          text: { ja: '平均CTがTTより短くても、CTのバラツキが大きければ、ある時はTTを超えてラインが止まります。ZEVAではCTのバラツキを **V.Score（σ/μ）** で数値化し、平均だけで評価しません。', en: 'Even if average CT is shorter than TT, large CT variation means some cycles exceed TT and the line stops. ZEVA quantifies CT variation with **V.Score (σ/μ)** and never evaluates by average alone.', id: 'Meskipun rata-rata CT lebih pendek dari TT, variasi CT yang besar membuat beberapa siklus melebihi TT dan lini berhenti. ZEVA mengukur variasi CT dengan **V.Score (σ/μ)** dan tidak menilai hanya dari rata-rata.' } },
        { type: 'widget', name: 'tt-calc', props: { shiftMin: 540, breakMin: 90, demand: 450, ct: 55 } }
      ]
    },
    {
      id: 'lead-time',
      title: { ja: 'リードタイム：注文から届けるまで', en: 'Lead time: from order to delivery', id: 'Lead time: dari pesanan hingga pengiriman' },
      blocks: [
        { type: 'p', text: {
          ja: '[[lead-time]]とは、ある起点（材料投入、受注など）から終点（完成、出荷、納品など）までにかかる**総経過時間**です。CTが「1個を加工する時間」なのに対し、リードタイムには**待ち・運搬・停滞の時間がすべて含まれます**。',
          en: '[[lead-time]] is the **total elapsed time** from a start point (material input, order receipt) to an end point (completion, shipment, delivery). While CT is “time to process one unit”, lead time **includes all waiting, transport and stagnation**.',
          id: '[[lead-time]] adalah **total waktu yang berlalu** dari titik awal (masuk material, penerimaan pesanan) hingga titik akhir (selesai, pengiriman). Jika CT adalah “waktu memproses satu unit”, lead time **mencakup semua waktu tunggu, transportasi, dan stagnasi**.'
        } },
        { type: 'formula',
          expr: { ja: '生産リードタイム = 加工時間 + 検査時間 + 運搬時間 + 停滞（待ち）時間', en: 'Production lead time = Processing + Inspection + Transport + Stagnation (waiting)', id: 'Lead time produksi = Proses + Inspeksi + Transportasi + Stagnasi (menunggu)' } },
        { type: 'example',
          title: { ja: '計算例：リードタイムの中身', en: 'Worked example: inside a lead time', id: 'Contoh: isi sebuah lead time' },
          steps: [
            { ja: '3工程の加工時間合計：3分', en: 'Total processing time of 3 processes: 3 min', id: 'Total waktu proses 3 proses: 3 menit' },
            { ja: '検査：2分、工程間の運搬：10分', en: 'Inspection: 2 min, transport between processes: 10 min', id: 'Inspeksi: 2 menit, transportasi antar proses: 10 menit' },
            { ja: '工程間の仕掛品置き場で待つ時間：合計2日（960分、稼働時間換算）', en: 'Waiting in WIP areas between processes: 2 days total (960 min of working time)', id: 'Menunggu di area WIP antar proses: total 2 hari (960 menit waktu kerja)' },
            { ja: 'リードタイム = 3 + 2 + 10 + 960 = 975分', en: 'Lead time = 3 + 2 + 10 + 960 = 975 min', id: 'Lead time = 3 + 2 + 10 + 960 = 975 menit' },
            { ja: '加工時間の比率 = 3 ÷ 975 ≈ 0.3%', en: 'Processing share = 3 ÷ 975 ≈ 0.3%', id: 'Porsi proses = 3 ÷ 975 ≈ 0,3%' }
          ],
          result: { ja: 'リードタイムの大半は「停滞」です。加工を速くするより、停滞をなくす方が効果は圧倒的に大きいのです。', en: 'Most of the lead time is stagnation. Removing stagnation is far more effective than speeding up processing.', id: 'Sebagian besar lead time adalah stagnasi. Menghilangkan stagnasi jauh lebih efektif daripada mempercepat proses.' } },
        { type: 'check',
          q: { ja: 'リードタイムを短縮するために最初に着目すべきものは？', en: 'What should you look at first to shorten lead time?', id: 'Apa yang pertama harus diperhatikan untuk memperpendek lead time?' },
          choices: [ { ja: '加工スピードを上げる', en: 'Increase processing speed', id: 'Menaikkan kecepatan proses' }, { ja: '停滞・待ちの時間を減らす', en: 'Reduce stagnation and waiting', id: 'Mengurangi stagnasi dan waktu tunggu' }, { ja: '検査を増やす', en: 'Add inspections', id: 'Menambah inspeksi' } ],
          answer: 1,
          explain: { ja: '一般にリードタイムの大部分は停滞時間です。流れを止めている場所を探すのが先決です。', en: 'Stagnation usually makes up most of the lead time, so first find where the flow stops.', id: 'Stagnasi biasanya merupakan bagian terbesar lead time, jadi cari dulu di mana aliran berhenti.' } }
      ]
    },
    {
      id: 'capacity',
      title: { ja: '生産能力とピッチ', en: 'Capacity and pitch', id: 'Kapasitas dan pitch' },
      blocks: [
        { type: 'p', text: {
          ja: '[[capacity]]とは、一定時間内に作ることができる最大の数量です。ライン全体の能力は、**最も遅い工程（ネック工程）**で決まります。',
          en: '[[capacity]] is the maximum quantity that can be made in a given time. The capacity of a whole line is determined by **its slowest process (the bottleneck)**.',
          id: '[[capacity]] adalah jumlah maksimum yang dapat dibuat dalam waktu tertentu. Kapasitas seluruh lini ditentukan oleh **proses paling lambat (bottleneck)**.'
        } },
        { type: 'formula',
          expr: { ja: '生産能力（個）= 稼働時間 ÷ ネック工程のCT', en: 'Capacity (units) = Available time ÷ CT of the bottleneck process', id: 'Kapasitas (unit) = Waktu tersedia ÷ CT proses bottleneck' } },
        { type: 'example',
          title: { ja: '計算例：ネック工程が能力を決める', en: 'Worked example: the bottleneck decides capacity', id: 'Contoh: bottleneck menentukan kapasitas' },
          steps: [
            { ja: '4工程のCT：48秒、55秒、62秒、50秒', en: 'CTs of 4 processes: 48 s, 55 s, 62 s, 50 s', id: 'CT 4 proses: 48, 55, 62, 50 detik' },
            { ja: 'ネック工程のCT = 62秒', en: 'Bottleneck CT = 62 s', id: 'CT bottleneck = 62 detik' },
            { ja: '能力 = 27,000 ÷ 62 ≈ 435台', en: 'Capacity = 27,000 ÷ 62 ≈ 435 units', id: 'Kapasitas = 27.000 ÷ 62 ≈ 435 unit' },
            { ja: '需要450台（TT 60秒）に対して15台不足', en: 'Against demand of 450 (TT 60 s): 15 units short', id: 'Terhadap permintaan 450 (TT 60 detik): kurang 15 unit' }
          ],
          result: { ja: 'ネック工程の62秒をTT 60秒以下にすることが最優先の改善テーマです。', en: 'Bringing the 62-s bottleneck to 60 s or less is the top-priority theme.', id: 'Menurunkan bottleneck 62 detik ke 60 detik atau kurang adalah prioritas utama.' } },
        { type: 'h', text: { ja: 'ピッチ（ピッチタイム）', en: 'Pitch (pitch time)', id: 'Pitch (waktu pitch)' } },
        { type: 'p', text: {
          ja: '部品や製品を箱単位で運ぶ場合、「TT × 収容数」をピッチと呼び、運搬や生産指示の間隔として使います。例：TT 60秒、1箱10個なら、ピッチ = 600秒（10分）ごとに1箱を引き取ります。',
          en: 'When parts or products move in containers, “TT × pack quantity” is called pitch, used as the interval for conveyance or production instructions. e.g. TT 60 s and 10 pcs per box → pitch = 600 s (10 min), one box withdrawn every 10 minutes.',
          id: 'Bila part atau produk dipindahkan per kotak, “TT × isi kotak” disebut pitch, digunakan sebagai interval pengangkutan atau instruksi produksi. Contoh: TT 60 detik, 10 pcs per kotak → pitch = 600 detik (10 menit), satu kotak diambil tiap 10 menit.'
        } },
        { type: 'callout', kind: 'zeva',
          title: { ja: 'ZEVAでの位置づけ', en: 'Position in ZEVA', id: 'Posisi dalam ZEVA' },
          text: { ja: 'TTに対してCTを合わせる「TT生産」は、ラインバランスとバラツキの安定があって初めて実現します。ZEVAではCTが安定していない状態で平均値から能力を計算しても、その数値は信頼できないと考えます。', en: '“Takt-time production” — matching CT to TT — is only achieved with good line balance and stable variation. In ZEVA, capacity calculated from the average of an unstable CT is not considered reliable.', id: '“Produksi takt time” — menyesuaikan CT dengan TT — hanya tercapai dengan keseimbangan lini yang baik dan variasi yang stabil. Dalam ZEVA, kapasitas yang dihitung dari rata-rata CT yang tidak stabil dianggap tidak dapat dipercaya.' } }
      ]
    },
    {
      id: 'overview',
      title: { ja: '時間の指標を整理する', en: 'Organising the time metrics', id: 'Merangkum metrik waktu' },
      blocks: [
        { type: 'table',
          head: [ { ja: '指標', en: 'Metric', id: 'Metrik' }, { ja: '誰が決める？', en: 'Who decides?', id: 'Siapa yang menentukan?' }, { ja: '意味', en: 'Meaning', id: 'Arti' }, { ja: '主な使い道', en: 'Main use', id: 'Kegunaan utama' } ],
          rows: [
            [ { ja: '稼働時間', en: 'Available time', id: 'Waktu tersedia' }, { ja: '会社の勤務体制', en: 'company work schedule', id: 'jadwal kerja perusahaan' }, { ja: '生産に使える時間', en: 'time usable for production', id: 'waktu yang dapat dipakai produksi' }, { ja: 'TT・能力の計算', en: 'TT & capacity calculation', id: 'perhitungan TT & kapasitas' } ],
            [ 'TT', { ja: 'お客様（需要）', en: 'customer (demand)', id: 'pelanggan (permintaan)' }, { ja: '作るべきペース', en: 'pace we should produce at', id: 'ritme produksi yang seharusnya' }, { ja: '人員配置、ライン設計の基準', en: 'basis for staffing & line design', id: 'dasar penempatan orang & desain lini' } ],
            [ 'CT', { ja: '現場の方法・設備', en: 'floor methods & equipment', id: 'metode & peralatan lantai' }, { ja: '実際にかかる時間', en: 'actual time taken', id: 'waktu aktual' }, { ja: '能力評価、改善対象の発見', en: 'ability assessment, finding targets', id: 'penilaian kemampuan, menemukan sasaran' } ],
            [ { ja: 'リードタイム', en: 'Lead time', id: 'Lead time' }, { ja: '流れ全体', en: 'the whole flow', id: 'seluruh aliran' }, { ja: '起点から終点までの総時間', en: 'total time from start to end', id: 'total waktu dari awal sampai akhir' }, { ja: '納期対応力、停滞の発見', en: 'delivery responsiveness, finding stagnation', id: 'responsivitas pengiriman, menemukan stagnasi' } ],
            [ { ja: '生産能力', en: 'Capacity', id: 'Kapasitas' }, { ja: 'ネック工程', en: 'bottleneck process', id: 'proses bottleneck' }, { ja: '作れる最大数', en: 'maximum quantity possible', id: 'jumlah maksimum yang mungkin' }, { ja: '需要との過不足判断', en: 'judging surplus/shortage vs demand', id: 'menilai kelebihan/kekurangan vs permintaan' } ]
          ] },
        { type: 'callout', kind: 'tip',
          title: { ja: '単位をそろえる', en: 'Keep units consistent', id: 'Samakan satuan' },
          text: { ja: '計算ミスの多くは単位の不一致（分と秒）です。TT・CTは**秒**に統一して計算する習慣をつけましょう。', en: 'Many calculation errors come from mixed units (minutes vs seconds). Make it a habit to calculate TT and CT in **seconds**.', id: 'Banyak kesalahan hitung berasal dari satuan campur (menit vs detik). Biasakan menghitung TT dan CT dalam **detik**.' } }
      ]
    }
  ],
  keyPoints: [
    { ja: '稼働時間 = 勤務時間 − 計画停止。突発停止は差し引かない', en: 'Available time = shift time − planned stops; do not subtract unplanned stops', id: 'Waktu tersedia = waktu shift − henti terencana; jangan kurangi henti tak terencana' },
    { ja: 'TT = 稼働時間 ÷ 必要数。お客様が決める「作るべきペース」', en: 'TT = available time ÷ demand — the pace set by the customer', id: 'TT = waktu tersedia ÷ permintaan — ritme yang ditentukan pelanggan' },
    { ja: 'CTは現場の実力。平均だけでなくバラツキも見る', en: 'CT is the floor’s ability — look at variation, not only the average', id: 'CT adalah kemampuan lantai — lihat variasi, bukan hanya rata-rata' },
    { ja: 'リードタイムの大半は停滞。流れを止める場所を探す', en: 'Most lead time is stagnation — find where the flow stops', id: 'Sebagian besar lead time adalah stagnasi — cari di mana aliran berhenti' },
    { ja: 'ライン能力はネック工程のCTで決まる', en: 'Line capacity is set by the bottleneck CT', id: 'Kapasitas lini ditentukan oleh CT bottleneck' }
  ],
  quiz: [
    { q: { ja: '稼働時間450分、必要数360台のときのTTは？', en: 'Available time 450 min, demand 360 units. What is TT?', id: 'Waktu tersedia 450 menit, permintaan 360 unit. Berapa TT?' },
      choices: [ { ja: '75秒', en: '75 s', id: '75 detik' }, { ja: '1.25秒', en: '1.25 s', id: '1,25 detik' }, { ja: '80秒', en: '80 s', id: '80 detik' }, { ja: '60秒', en: '60 s', id: '60 detik' } ],
      answer: 0,
      explain: { ja: '450分 = 27,000秒。27,000 ÷ 360 = 75秒です。', en: '450 min = 27,000 s. 27,000 ÷ 360 = 75 s.', id: '450 menit = 27.000 detik. 27.000 ÷ 360 = 75 detik.' } },
    { q: { ja: '稼働時間を計算するとき、差し引くべきものは？', en: 'What should be subtracted when calculating available time?', id: 'Apa yang harus dikurangi saat menghitung waktu tersedia?' },
      choices: [ { ja: '突発の設備故障時間', en: 'Unexpected breakdown time', id: 'Waktu kerusakan mendadak' }, { ja: '部品待ちの時間', en: 'Waiting for parts', id: 'Waktu menunggu part' }, { ja: '計画された休憩時間', en: 'Planned break time', id: 'Waktu istirahat terencana' }, { ja: '不良の手直し時間', en: 'Repair time', id: 'Waktu perbaikan' } ],
      answer: 2,
      explain: { ja: '計画停止（休憩など）だけを差し引きます。故障・待ち・手直しは改善すべきロスとして残します。', en: 'Only planned stops (breaks, etc.) are subtracted. Breakdowns, waiting and repair remain as losses to improve.', id: 'Hanya henti terencana (istirahat, dll.) yang dikurangi. Kerusakan, menunggu, dan perbaikan tetap sebagai kerugian untuk diperbaiki.' } },
    { q: { ja: 'CTがTTより長い（CT > TT）状態で起こりやすいことは？', en: 'What tends to happen when CT > TT?', id: 'Apa yang cenderung terjadi saat CT > TT?' },
      choices: [ { ja: '作りすぎ', en: 'Overproduction', id: 'Produksi berlebih' }, { ja: '残業や納期遅れ', en: 'Overtime and late delivery', id: 'Lembur dan keterlambatan' }, { ja: '作業者の手待ち', en: 'Worker waiting', id: 'Pekerja menunggu' }, { ja: '何も起きない', en: 'Nothing happens', id: 'Tidak terjadi apa-apa' } ],
      answer: 1,
      explain: { ja: '実力が需要のペースに追いつかないため、残業や遅れ、無理な作業が発生します。', en: 'Ability cannot keep up with the demand pace, causing overtime, delays and overburden.', id: 'Kemampuan tidak mengikuti ritme permintaan, sehingga terjadi lembur, keterlambatan, dan beban berlebih.' } },
    { q: { ja: '5工程のCTが 40, 45, 58, 50, 44 秒のライン。稼働時間27,000秒での生産能力は？', en: 'A line has process CTs of 40, 45, 58, 50, 44 s. Capacity with 27,000 s available?', id: 'Lini dengan CT 40, 45, 58, 50, 44 detik. Kapasitas dengan waktu tersedia 27.000 detik?' },
      choices: [ { ja: '約675台', en: 'about 675 units', id: 'sekitar 675 unit' }, { ja: '約567台', en: 'about 567 units', id: 'sekitar 567 unit' }, { ja: '約465台', en: 'about 465 units', id: 'sekitar 465 unit' }, { ja: '約540台', en: 'about 540 units', id: 'sekitar 540 unit' } ],
      answer: 2,
      explain: { ja: '能力はネック工程（58秒）で決まります。27,000 ÷ 58 ≈ 465台。', en: 'Capacity is set by the bottleneck (58 s). 27,000 ÷ 58 ≈ 465 units.', id: 'Kapasitas ditentukan bottleneck (58 detik). 27.000 ÷ 58 ≈ 465 unit.' } },
    { q: { ja: '一般に、生産リードタイムの中で最も大きな割合を占めるのは？', en: 'What usually takes the largest share of production lead time?', id: 'Apa yang biasanya mengambil porsi terbesar lead time produksi?' },
      choices: [ { ja: '加工時間', en: 'Processing time', id: 'Waktu proses' }, { ja: '検査時間', en: 'Inspection time', id: 'Waktu inspeksi' }, { ja: '停滞・待ち時間', en: 'Stagnation / waiting time', id: 'Waktu stagnasi / menunggu' }, { ja: '段取り時間', en: 'Setup time', id: 'Waktu setup' } ],
      answer: 2,
      explain: { ja: '工程間でモノが待っている時間が大部分を占めることが多く、ここが最大の改善余地です。', en: 'Goods waiting between processes usually dominate, making this the largest improvement opportunity.', id: 'Barang yang menunggu antar proses biasanya dominan, sehingga ini peluang perbaikan terbesar.' } },
    { q: { ja: '平均CTがTTより短いのに、ラインがときどき遅れる。最も考えられる理由は？', en: 'Average CT is shorter than TT, yet the line is sometimes late. Most likely reason?', id: 'Rata-rata CT lebih pendek dari TT, tetapi lini kadang terlambat. Alasan paling mungkin?' },
      choices: [ { ja: 'TTの計算が必ず間違っている', en: 'The TT calculation must be wrong', id: 'Perhitungan TT pasti salah' }, { ja: 'CTのバラツキが大きく、TTを超えるサイクルがある', en: 'CT varies a lot, so some cycles exceed TT', id: 'CT sangat bervariasi sehingga beberapa siklus melebihi TT' }, { ja: '需要が少なすぎる', en: 'Demand is too low', id: 'Permintaan terlalu rendah' }, { ja: '稼働時間が長すぎる', en: 'Available time is too long', id: 'Waktu tersedia terlalu panjang' } ],
      answer: 1,
      explain: { ja: '平均は良くてもバラツキが大きいとTTを超える回が生まれます。これがZEVAがバラツキを重視する理由の一つです。', en: 'Even with a good average, large variation creates cycles above TT. This is one reason ZEVA emphasises variation.', id: 'Meskipun rata-rata baik, variasi besar menimbulkan siklus di atas TT. Ini salah satu alasan ZEVA menekankan variasi.' } },
    { q: { ja: 'TT 45秒、1箱20個で運搬する場合のピッチは？', en: 'TT 45 s, conveyed in boxes of 20. What is the pitch?', id: 'TT 45 detik, diangkut per kotak isi 20. Berapa pitch?' },
      choices: [ { ja: '65秒', en: '65 s', id: '65 detik' }, { ja: '900秒（15分）', en: '900 s (15 min)', id: '900 detik (15 menit)' }, { ja: '2.25秒', en: '2.25 s', id: '2,25 detik' }, { ja: '450秒', en: '450 s', id: '450 detik' } ],
      answer: 1,
      explain: { ja: 'ピッチ = TT × 収容数 = 45 × 20 = 900秒です。', en: 'Pitch = TT × pack quantity = 45 × 20 = 900 s.', id: 'Pitch = TT × isi kotak = 45 × 20 = 900 detik.' } }
  ]
});
