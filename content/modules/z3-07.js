(function () {
  const T = (ja, en, id) => ({ ja, en, id });

  ZA.addModule({
    id: 'z3-07',
    track: 'z3',
    order: 7,
    minutes: 45,
    icon: '🏭',
    level: 3,
    prereq: ['z3-01', 'z3-03'],
    title: T('事例：射出成形（設備中心）', 'Case: injection moulding (machine-led)', 'Kasus: injection molding (berpusat pada mesin)'),
    summary: T(
      '1本の成形機を、標準化 → データ取得 → 4つの箱 → 改善計画 → 実施の順で改善します。品質（ソリ不良3.2%）と効率（OEE 64.8%）の両方を、同じデータから同時に動かした事例です。数値は説明用の仮想工程です。',
      'One moulding machine improved in order: standardise, collect data, fill the four boxes, plan, act. Quality (3.2% warp defects) and efficiency (OEE 64.8%) move together from the same data. The numbers describe an illustrative process.',
      'Satu mesin molding diperbaiki berurutan: standardisasi, ambil data, isi empat kotak, rencanakan, laksanakan. Kualitas (3,2% cacat melengkung) dan efisiensi (OEE 64,8%) bergerak bersama dari data yang sama. Angka-angkanya berasal dari proses fiktif untuk ilustrasi.'
    ),
    objectives: [
      T('標準化がデータ取得の前提であることを、事例の順序で説明できる', 'Explain why standardisation comes before data collection, following the case', 'Menjelaskan mengapa standardisasi mendahului pengambilan data, mengikuti kasus ini'),
      T('取得したデータから4つの箱を埋められる', 'Fill the four boxes from the data that was collected', 'Mengisi empat kotak dari data yang telah dikumpulkan'),
      T('品質改善と効率改善が同じ原因（X）に帰着する場合があることを説明できる', 'Explain how quality and efficiency can trace back to the same cause (X)', 'Menjelaskan bagaimana kualitas dan efisiensi dapat berpangkal pada penyebab (X) yang sama'),
      T('GPCバンドを決めるまでの手順を順に並べられる', 'Put the steps that lead to a GPC band in order', 'Mengurutkan langkah yang menghasilkan GPC band')
    ],
    sections: [
      {
        id: 'situation',
        title: T('工程の姿と、困っていること', 'The process, and what hurts', 'Proses ini, dan di mana masalahnya'),
        blocks: [
          { type: 'p', text: T(
            '**M-07号機**は樹脂カバーを成形する2本取りの成形機です。1直420分（休憩を除く負荷時間）で動かしています。困っていることは2つあり、現場ではそれぞれ別の問題として扱われていました。',
            '**Machine M-07** moulds a resin cover in a two-cavity tool. It runs a 420-minute shift (loading time, breaks removed). Two things hurt, and the floor treated them as two separate problems.',
            '**Mesin M-07** mencetak penutup resin dengan cetakan dua rongga. Mesin berjalan 420 menit per shift (loading time, istirahat dikeluarkan). Ada dua masalah, dan orang di lapangan menanganinya sebagai dua hal terpisah.'
          ) },
          { type: 'cards', cols: 2, items: [
            { icon: '🚫', tone: 'red', title: T('品質：ソリ不良 3.2%', 'Quality: 3.2% warp defects', 'Kualitas: 3,2% cacat melengkung'), text: T('402個作って13個がソリで廃棄。朝と午後で出方が違う。', 'Of 402 shots, 13 are scrapped for warp. It behaves differently in the morning and the afternoon.', 'Dari 402 shot, 13 dibuang karena melengkung. Perilakunya berbeda pagi dan sore.') },
            { icon: '🐌', tone: 'amber', title: T('効率：OEE 64.8%', 'Efficiency: OEE 64.8%', 'Efisiensi: OEE 64,8%'), text: T('CTが44〜63秒でばらつく。段取りと金型清掃で止まる時間が62分。', 'CT scatters between 44 and 63 s. 62 minutes are lost to changeover and mould cleaning.', 'CT bervariasi antara 44 dan 63 detik. 62 menit hilang untuk pergantian dan pembersihan cetakan.') }
          ] },
          { type: 'callout', kind: 'zeva', title: T('ZEVAはここで順序を疑う', 'ZEVA questions the order here', 'ZEVA mempertanyakan urutannya di sini'), text: T(
            '「不良を減らす」と「CTを縮める」を別々の活動にすると、担当も打ち手も分かれます。ZEVAはまず**同じデータを取る**ところから始めます。どちらも原因（X）は工程条件にあるかもしれないからです。',
            'Splitting "cut defects" and "shorten CT" into two activities splits the owners and the countermeasures too. ZEVA starts by **collecting one set of data**, because the cause (X) of both may sit in the process conditions.',
            'Memisahkan "kurangi cacat" dan "perpendek CT" menjadi dua kegiatan juga memisahkan penanggung jawab dan penanggulangannya. ZEVA memulai dengan **mengumpulkan satu set data**, karena penyebab (X) keduanya mungkin ada pada kondisi proses.'
          ) }
        ]
      },
      {
        id: 'standardize',
        title: T('ステップ1：測れる状態をつくる（初期標準）', 'Step 1: make it measurable (initial standard)', 'Langkah 1: buat dapat diukur (standar awal)'),
        blocks: [
          { type: 'p', text: T(
            'データを取る前に、**測り方と条件をそろえます**。バラツキが大きいままのデータは、原因を指し示しません（[[root-logic]]）。M-07では、条件の記録がオペレーターの記憶に頼っており、同じ「標準条件」でも人によって±10℃の差がありました。',
            'Before collecting anything, **fix how you measure and what you set**. Data taken while variation is large does not point at a cause ([[root-logic]]). On M-07 the settings lived in the operators\' memory, so the same "standard condition" varied by ±10 °C between people.',
            'Sebelum mengambil apa pun, **tetapkan cara mengukur dan apa yang disetel**. Data yang diambil saat variasi besar tidak menunjuk pada penyebab ([[root-logic]]). Di M-07 setelan tersimpan di ingatan operator, sehingga "kondisi standar" yang sama berbeda ±10 °C antar orang.'
          ) },
          { type: 'table',
            head: [T('決めたこと', 'What was decided', 'Yang diputuskan'), T('決める前', 'Before', 'Sebelumnya'), T('初期標準', 'Initial standard', 'Standar awal')],
            rows: [
              [T('樹脂温度', 'Resin temperature', 'Suhu resin'), T('240〜260℃（人による）', '240–260 °C (varies by person)', '240–260 °C (tergantung orang)'), T('250℃（±5℃を記録）', '250 °C (record ±5 °C)', '250 °C (catat ±5 °C)')],
              [T('保圧', 'Holding pressure', 'Tekanan tahan'), T('記録なし', 'Not recorded', 'Tidak dicatat'), T('設定値と実測を毎ショット記録', 'Record setpoint and actual every shot', 'Catat setpoint dan aktual tiap shot')],
              [T('冷却時間', 'Cooling time', 'Waktu pendinginan'), T('「様子を見て」', '"By feel"', '"Sesuai perasaan"'), T('18秒で固定して観察', 'Fix at 18 s and observe', 'Tetapkan 18 dtk dan amati')],
              [T('CTの測り方', 'How CT is measured', 'Cara mengukur CT'), T('人が時計で', 'Stopwatch by hand', 'Stopwatch manual'), T('完了時刻の間隔（セクション16.4）', 'Interval between completion times (16.4)', 'Selang antar waktu selesai (16.4)')],
              [T('不良の数え方', 'How defects are counted', 'Cara menghitung cacat'), T('日報に「不良」とだけ', 'Just "defect" in the daily report', 'Hanya "cacat" di laporan harian'), T('品質区分で記録（セクション16.3）', 'Record by quality category (16.3)', 'Catat per kategori kualitas (16.3)')]
            ],
            caption: T('初期標準は最適解ではなく、比べられる状態をつくるためのもの（仕様書v29 1.5）', 'The initial standard is not the optimum; it makes comparison possible (spec v29, 1.5)', 'Standar awal bukan optimum; ia memungkinkan perbandingan (spesifikasi v29, 1.5)')
          },
          { type: 'callout', kind: 'key', title: T('ここを飛ばすと4つの箱が書けない', 'Skip this and the four boxes cannot be written', 'Lewati ini dan empat kotak tidak bisa ditulis'), text: T(
            '4つの箱の①「現状の値」は、**測り方が揃って初めて値になります**。人によって条件が違えば、平均もバラツキも工程の姿ではなく人の差を映します。',
            'Box ① "the current value" only becomes a value **once everyone measures the same way**. If settings differ between people, the mean and the spread describe the people, not the process.',
            'Kotak ① "nilai saat ini" baru menjadi nilai **setelah semua orang mengukur dengan cara yang sama**. Bila setelan berbeda antar orang, rata-rata dan sebarannya menggambarkan orangnya, bukan prosesnya.'
          ) }
        ]
      },
      {
        id: 'data',
        title: T('ステップ2：データを取る（2週間）', 'Step 2: collect the data (two weeks)', 'Langkah 2: kumpulkan data (dua minggu)'),
        blocks: [
          { type: 'p', text: T(
            '初期標準のまま2週間流し、**条件（X）と結果（Y）を同じ時刻で記録**しました。条件だけ、結果だけでは対応が取れないためです。',
            'The line ran two weeks on the initial standard, **recording the conditions (X) and the results (Y) against the same clock**. Conditions alone, or results alone, cannot be matched up later.',
            'Lini berjalan dua minggu dengan standar awal, **mencatat kondisi (X) dan hasil (Y) pada waktu yang sama**. Kondisi saja, atau hasil saja, tidak bisa dipasangkan kemudian.'
          ) },
          { type: 'table',
            head: [T('取ったもの', 'What was taken', 'Yang diambil'), T('中身', 'Content', 'Isi'), T('分かったこと', 'What it showed', 'Yang ditunjukkan')],
            rows: [
              [T('結果Y：不良', 'Result Y: defects', 'Hasil Y: cacat'), T('品質区分ごとの個数・発生時刻', 'Count and time by quality category', 'Jumlah dan waktu per kategori kualitas'), T('13個中11個がソリ。午前に集中', '11 of 13 are warp, concentrated in the morning', '11 dari 13 adalah melengkung, terpusat di pagi hari')],
              [T('結果Y：CT', 'Result Y: CT', 'Hasil Y: CT'), T('完了時刻の間隔、全ショット', 'Interval between completion times, every shot', 'Selang antar waktu selesai, tiap shot'), T('平均53.4秒、σ5.66、[[v-score|V.Score]] 0.106', 'Mean 53.4 s, σ 5.66, [[v-score|V.Score]] 0.106', 'Rata-rata 53,4 dtk, σ 5,66, [[v-score|V.Score]] 0,106')],
              [T('原因X：金型温度', 'Cause X: mould temperature', 'Penyebab X: suhu cetakan'), T('10分ごとに自動記録', 'Logged automatically every 10 min', 'Dicatat otomatis tiap 10 menit'), T('始業後90分は設定より12℃低い', 'For 90 min after start-up it sits 12 °C below setpoint', 'Selama 90 menit setelah mulai, 12 °C di bawah setpoint')],
              [T('原因X：保圧', 'Cause X: holding pressure', 'Penyebab X: tekanan tahan'), T('毎ショットの実測', 'Actual value every shot', 'Nilai aktual tiap shot'), T('設定どおり。ばらついていない', 'On setpoint; not a source of scatter', 'Sesuai setpoint; bukan sumber sebaran')],
              [T('停止', 'Stops', 'Henti'), T('理由と時間', 'Reason and duration', 'Alasan dan durasi'), T('62分のうち34分が金型清掃（ソリ品の取り出し含む）', 'Of 62 min, 34 are mould cleaning, including removing warped parts', 'Dari 62 menit, 34 adalah pembersihan cetakan, termasuk mengeluarkan part melengkung')]
            ]
          },
          { type: 'callout', kind: 'tip', title: T('品質と効率が1つの原因に繋がった', 'Quality and efficiency met at one cause', 'Kualitas dan efisiensi bertemu pada satu penyebab'), text: T(
            '午前のソリ不良と、CTのばらつきと、清掃停止の34分は、**すべて始業後の金型温度の立ち上がり**に紐づいていました。別々の問題に見えていたものが、1つの原因（X）に繋がります。',
            'The morning warp defects, the CT scatter and the 34 minutes of cleaning all tied back to **the mould warming up after start-up**. What looked like separate problems met at one cause (X).',
            'Cacat melengkung pagi hari, sebaran CT, dan 34 menit pembersihan semuanya berpangkal pada **cetakan yang baru menghangat setelah start-up**. Yang tampak sebagai masalah terpisah bertemu pada satu penyebab (X).'
          ) }
        ]
      },
      {
        id: 'boxes',
        title: T('ステップ3：4つの箱を埋める', 'Step 3: fill the four boxes', 'Langkah 3: isi empat kotak'),
        blocks: [
          { type: 'p', text: T(
            '4つの箱は、**埋めた数字の裏に必ずデータがある**ときだけ機能します。ここまでの2週間は、この4枚を書くための準備でした。',
            'The four boxes work only when **every number in them has data behind it**. The two weeks so far were the preparation for writing these four.',
            'Empat kotak hanya berfungsi bila **setiap angka di dalamnya punya data di belakangnya**. Dua minggu tadi adalah persiapan untuk menulis keempatnya.'
          ) },
          { type: 'diagram', name: 'four-boxes',
            props: {
              label: T('事例：射出成形の4つの箱', 'Case: the four boxes for the moulding machine', 'Kasus: empat kotak untuk mesin molding'),
              b1: T('OEE 64.8%／不良率3.2%\nCT 53.4秒／V.Score 0.106', 'OEE 64.8% / defects 3.2%\nCT 53.4 s / V.Score 0.106', 'OEE 64,8% / cacat 3,2%\nCT 53,4 dtk / V.Score 0,106'),
              b2: T('始業後すぐ生産開始。金型温度は成り行き。\n1直62分の停止、うち金型清掃34分', 'Production starts at once; the mould temperature is left to settle.\n62 min of stops a shift, 34 of them mould cleaning', 'Produksi langsung mulai; suhu cetakan dibiarkan.\n62 menit henti per shift, 34 di antaranya pembersihan cetakan'),
              b3: T('始業40分前の予熱をタイマーで自動化。\n金型温度58～66℃をGPCバンドで監視。標準作業書を改訂', 'Automate a 40-minute pre-heat with a timer.\nHold 58–66 °C as the GPC band; revise the work instruction', 'Otomatiskan pra-panas 40 menit dengan timer.\nJaga 58–66 °C sebagai GPC band; revisi instruksi kerja'),
              b4: T('OEE 77.7%／不良率0.4%\nCT 50.3秒／V.Score 0.03', 'OEE 77.7% / defects 0.4%\nCT 50.3 s / V.Score 0.03', 'OEE 77,7% / cacat 0,4%\nCT 50,3 dtk / V.Score 0,03'),
              loop: T('③で条件（X＝金型温度）を範囲に収めると、①が④になる。結果（Y）には手を触れていない', 'Hold the condition (X = mould temperature) inside a range in ③ and ① becomes ④. Nothing is done to the result (Y)', 'Jaga kondisi (X = suhu cetakan) dalam rentang di ③ dan ① menjadi ④. Tidak ada yang dilakukan pada hasil (Y)')
            },
            caption: T('①②から③④を逆算する。矢印は考える順番', 'Boxes ③ and ④ are reasoned backwards from ① and ②; the arrows are the order of thinking', 'Kotak ③ dan ④ disusun mundur dari ① dan ②; panah menunjukkan urutan berpikir') },
          { type: 'table',
            head: [T('箱', 'Box', 'Kotak'), T('中身', 'Content', 'Isi'), T('根拠', 'Evidence', 'Dasar')],
            rows: [
              [T('① 現状の値', '① Current value', '① Nilai saat ini'), T('OEE 64.8%／不良率3.2%／CT 53.4秒／[[v-score|V.Score]] 0.106', 'OEE 64.8% / defect rate 3.2% / CT 53.4 s / [[v-score|V.Score]] 0.106', 'OEE 64,8% / tingkat cacat 3,2% / CT 53,4 dtk / [[v-score|V.Score]] 0,106'), T('2週間・全ショットの記録。生産402個・良品389個・ソリ廃棄13個。イレギュラーを除いた最小値42秒がこの設備の実力値。時間稼働率 ＝ 358 ÷ 420 ＝ 85.2%、性能稼働率 ＝ 42秒 × 402個 ＝ 281.4分で 281.4 ÷ 358 ＝ 78.6%、良品率 ＝ 389 ÷ 402 ＝ 96.8%。0.852 × 0.786 × 0.968 ＝ 0.648。不良率 ＝ 13 ÷ 402 ＝ 3.2%', 'Two weeks, every shot. 402 produced, 389 good, 13 scrapped for warp. The smallest cycle after outliers, 42 s, is the capability. Availability = 358 ÷ 420 = 85.2%; 42 s × 402 pcs = 281.4 min, 281.4 ÷ 358 = 78.6% performance; yield = 389 ÷ 402 = 96.8%. 0.852 × 0.786 × 0.968 = 0.648. Defect rate = 13 ÷ 402 = 3.2%', 'Dua minggu, tiap shot. 402 diproduksi, 389 baik, 13 dibuang karena melengkung. Siklus terkecil setelah pencilan, 42 dtk, adalah kemampuan mesin. Availability = 358 ÷ 420 = 85,2%; 42 dtk × 402 pcs = 281,4 menit, 281,4 ÷ 358 = 78,6% Performance; rasio produk baik = 389 ÷ 402 = 96,8%. 0,852 × 0,786 × 0,968 = 0,648. Tingkat cacat = 13 ÷ 402 = 3,2%')],
              [T('② 現状のやり方', '② Current way', '② Cara saat ini'), T('始業後すぐ生産開始。金型温度は成り行き。ソリ品は都度清掃して取り出す', 'Production starts right after start-up. Mould temperature is left to settle by itself. Warped parts are removed with a clean each time', 'Produksi dimulai tepat setelah start-up. Suhu cetakan dibiarkan menyesuaikan sendiri. Part melengkung dikeluarkan dengan pembersihan tiap kali'), T('作業観察と停止記録62分（うち金型清掃34分）。稼働時間は 420 － 62 ＝ 358分', 'Work observation and the 62 min of stops, 34 of them mould cleaning. Operating time = 420 − 62 = 358 min', 'Observasi kerja dan 62 menit henti, 34 di antaranya pembersihan cetakan. Waktu operasi = 420 − 62 = 358 mnt')],
              [T('③ 新たなやり方', '③ New way', '③ Cara baru'), T('金型を予熱してから生産開始。温度が範囲に入るまで生産しない。温度と保圧を[[gpc-band|GPCバンド]]で管理', 'Pre-heat the mould before starting. Do not produce until the temperature is inside the range. Hold temperature and pressure inside a [[gpc-band|GPC band]]', 'Pra-panaskan cetakan sebelum produksi dimulai. Jangan produksi sampai suhu masuk rentang. Jaga suhu dan tekanan dalam [[gpc-band|GPC band]]'), T('物理実験（次のステップ）で範囲を確かめる', 'The range is confirmed by physical trials (next step)', 'Rentang dipastikan lewat uji fisik (langkah berikutnya)')],
              [T('④ 目標の値', '④ Target value', '④ Nilai target'), T('OEE 77.7%／不良率0.4%／CT 50.3秒／[[v-score|V.Score]] 0.03', 'OEE 77.7% / defect rate 0.4% / CT 50.3 s / [[v-score|V.Score]] 0.03', 'OEE 77,7% / tingkat cacat 0,4% / CT 50,3 dtk / [[v-score|V.Score]] 0,03'), T('稼働392分 ＝ 358 ＋ 34（清掃停止の解消）。立ち上がりの遅いサイクルが消えて平均CTは53.4→50.3秒。生産数 ＝ 392分 × 60 ÷ 50.3秒 ＝ 467.6、丸めて468個。ソリ13件のうち11件は午前の立ち上がりで、これが消えると残るのは他要因の2件（402個あたり0.5%）。温度が範囲に収まれば個数が増えても件数は増えないと置き、2 ÷ 468 ＝ 0.4%。目標ばらつきを母標準偏差1.5秒と置くと V.Score ＝ 1.5 ÷ 50.3 ＝ 0.03', 'Operating time 392 min = 358 + 34 (the cleaning stops removed). The slow start-up cycles disappear, so mean CT goes 53.4 → 50.3 s. Output = 392 min × 60 ÷ 50.3 s = 467.6, rounded to 468. Of the 13 warp scraps, 11 were in the start-up band; remove them and two from other causes remain (0.5% against 402). Holding the temperature keeps the count flat as output rises, so 2 ÷ 468 = 0.4%. Take 1.5 s as the target population σ and V.Score = 1.5 ÷ 50.3 = 0.03', 'Waktu operasi 392 menit = 358 + 34 (henti pembersihan dihapus). Siklus start-up yang lambat hilang, sehingga CT rata-rata 53,4 → 50,3 dtk. Output = 392 menit × 60 ÷ 50,3 dtk = 467,6, dibulatkan menjadi 468. Dari 13 buangan melengkung, 11 ada di pita start-up; hapus itu dan tersisa dua dari penyebab lain (0,5% terhadap 402). Menjaga suhu membuat jumlahnya tetap saat output naik, jadi 2 ÷ 468 = 0,4%. Ambil 1,5 dtk sebagai target σ populasi, maka V.Score = 1,5 ÷ 50,3 = 0,03')]
            ],
            caption: T('4つの箱（仕様書v29 14.3）。③と④は①②の根拠から逆算する', 'The four boxes (spec v29, 14.3). ③ and ④ are worked back from the evidence in ① and ②', 'Empat kotak (spesifikasi v29, 14.3). ③ dan ④ dihitung mundur dari dasar pada ① dan ②')
          },
          { type: 'callout', kind: 'warn', title: T('④は願望ではない', '④ is not a wish', '④ bukan harapan'), text: T(
            'OEE 77.7%は「頑張る」ではなく計算です。清掃停止34分がなくなれば稼働は358分から392分になり時間稼働率93.3%、性能稼働率は 42秒 × 468個 ＝ 19,656秒 ＝ 327.6分で 327.6 ÷ 392 ＝ 83.6%、ソリ不良が0.4%まで下がれば良品率99.6%。**0.933 × 0.836 × 0.996 ＝ 0.777** です。根拠がないと④は動機づけのスローガンになります。',
            'OEE 77.7% is arithmetic, not effort. Remove the 34 minutes of cleaning and operating time goes from 358 to 392 min, so availability is 93.3%; 42 s × 468 pcs = 19,656 s = 327.6 min, and 327.6 ÷ 392 = 83.6% performance; bring warp down to 0.4% and yield is 99.6%. **0.933 × 0.836 × 0.996 = 0.777**. Without evidence, ④ becomes a slogan.',
            'OEE 77,7% adalah hitungan, bukan usaha. Hapus 34 menit pembersihan dan waktu operasi naik dari 358 ke 392 menit, sehingga availability 93,3%; 42 dtk × 468 pcs = 19.656 dtk = 327,6 menit, dan 327,6 ÷ 392 = 83,6% Performance; turunkan cacat melengkung ke 0,4% dan rasio produk baik 99,6%. **0,933 × 0,836 × 0,996 = 0,777**. Tanpa dasar, ④ menjadi slogan.'
          ) }
        ]
      },
      {
        id: 'plan',
        title: T('ステップ4：改善計画（トリアージから）', 'Step 4: the plan (starting from triage)', 'Langkah 4: rencana (mulai dari triase)'),
        blocks: [
          { type: 'p', text: T(
            '原因の心当たり（金型温度）があり、変数も少なく、設備条件なので[[hybrid-triage|トリアージ]]は**Quick GPC（H-T-C-A）**に振り分けました。',
            'There was a hypothesis (mould temperature), few variables and an equipment condition, so [[hybrid-triage|triage]] routed this to **Quick GPC (H-T-C-A)**.',
            'Ada hipotesis (suhu cetakan), sedikit variabel, dan kondisi peralatan, sehingga [[hybrid-triage|triase]] mengarahkannya ke **Quick GPC (H-T-C-A)**.'
          ) },
          { type: 'flow', dir: 'v', nodes: [
            { title: T('H 仮説', 'H Hypothesis', 'H Hipotesis'), text: T('金型温度が低いうちはソリが出て、CTも延びる', 'While the mould is cold, parts warp and CT stretches', 'Selama cetakan dingin, part melengkung dan CT memanjang'), tone: 'green' },
            { title: T('T 試す', 'T Trial', 'T Uji'), text: T('予熱30分・40分・50分で各20ショット。温度と結果を記録', 'Pre-heat 30, 40 and 50 min, 20 shots each. Record temperature and results', 'Pra-panaskan 30, 40, dan 50 menit, 20 shot masing-masing. Catat suhu dan hasil'), tone: 'green' },
            { title: T('C 確かめる', 'C Check', 'C Periksa'), text: T('金型温度58℃以上でソリが消え、CTが43秒台で揃った', 'Above 58 °C the warp disappeared and CT settled in the 43 s range', 'Di atas 58 °C melengkung hilang dan CT stabil di kisaran 43 dtk'), tone: 'green' },
            { title: T('A 適用', 'A Action', 'A Terapkan'), text: T('予熱40分を暫定標準に。金型温度58～66℃をGPCバンドに設定', 'Make 40 min of pre-heat the temporary standard; set the GPC band at 58–66 °C', 'Jadikan pra-panas 40 menit sebagai standar sementara; tetapkan GPC band 58–66 °C'), tone: 'navy' }
          ] },
          { type: 'table',
            head: [T('やること', 'Action', 'Tindakan'), T('狙う箱', 'Which box', 'Kotak mana'), T('効くところ', 'What it moves', 'Yang digerakkan')],
            rows: [
              [T('始業40分前の予熱をタイマーで自動化', 'Automate a 40-minute pre-heat with a timer', 'Otomatiskan pra-panas 40 menit dengan timer'), T('③→④', '③→④', '③→④'), T('ソリ不良、清掃停止34分', 'Warp defects, 34 min of cleaning', 'Cacat melengkung, 34 menit pembersihan')],
              [T('金型温度58～66℃をGPCバンドとして監視', 'Monitor 58–66 °C as the GPC band', 'Pantau 58–66 °C sebagai GPC band'), T('③', '③', '③'), T('条件Xの逸脱を即検知', 'Catches a deviation in X at once', 'Menangkap penyimpangan X seketika')],
              [T('バンド外では生産開始をインターロック', 'Interlock: production cannot start outside the band', 'Interlock: produksi tidak dapat dimulai di luar band'), T('③', '③', '③'), T('作り込みを未然に止める', 'Stops the defect from being made', 'Mencegah cacat dibuat')],
              [T('冷却18秒の妥当性を再確認（CT短縮）', 'Re-check whether 18 s of cooling is right (to shorten CT)', 'Periksa ulang apakah pendinginan 18 dtk sudah tepat (untuk memperpendek CT)'), T('④', '④', '④'), T('性能稼働率', 'Performance', 'Performance (rasio kinerja)')]
            ]
          }
        ]
      },
      {
        id: 'result',
        title: T('ステップ5：結果と、次の一手', 'Step 5: the result, and what is next', 'Langkah 5: hasil, dan langkah berikutnya'),
        blocks: [
          { type: 'table',
            head: [T('指標', 'Metric', 'Metrik'), T('改善前', 'Before', 'Sebelum'), T('改善後', 'After', 'Sesudah'), T('効いた打ち手', 'What moved it', 'Yang menggerakkan')],
            rows: [
              [T('[[oee|OEE]]', '[[oee|OEE]]', '[[oee|OEE]]'), T('64.8%', '64.8%', '64,8%'), T('77.7%', '77.7%', '77,7%'), T('停止62分→28分、CT安定', 'Stops 62→28 min, CT steady', 'Henti 62→28 mnt, CT stabil')],
              [T('[[defect-rate|不良率]]', '[[defect-rate|Defect rate]]', '[[defect-rate|Tingkat cacat]]'), T('3.2%', '3.2%', '3,2%'), T('0.4%', '0.4%', '0,4%'), T('予熱とGPCバンド', 'Pre-heat and the GPC band', 'Pra-panas dan GPC band')],
              [T('CT平均', 'Mean CT', 'CT rata-rata'), T('53.4秒', '53.4 s', '53,4 dtk'), T('50.3秒', '50.3 s', '50,3 dtk'), T('立ち上がりのばらつき解消', 'Start-up scatter removed', 'Sebaran start-up hilang')],
              [T('[[v-score|V.Score]]', '[[v-score|V.Score]]', '[[v-score|V.Score]]'), T('0.106', '0.106', '0,106'), T('0.023', '0.023', '0,023'), T('母標準偏差が5.66→1.16秒。1.16 ÷ 50.3 ＝ 0.023で、④の0.03を下回った（小さいほどよい）', 'Population σ 5.66 → 1.16 s; 1.16 ÷ 50.3 = 0.023 — below the 0.03 in box 4, and lower is better', 'σ populasi 5,66 → 1,16 dtk; 1,16 ÷ 50,3 = 0,023 — di bawah 0,03 pada kotak 4, dan makin kecil makin baik')],
              [T('生産数', 'Output', 'Output'), T('402個', '402 pcs', '402 pcs'), T('468個', '468 pcs', '468 pcs'), T('稼働時間＋CT短縮', 'Operating time and shorter CT', 'Waktu operasi dan CT lebih pendek')]
            ],
            caption: T('同じ原因（X＝金型温度）に手を打ったら、品質と効率が同時に動いた', 'One cause (X = mould temperature) moved quality and efficiency together', 'Satu penyebab (X = suhu cetakan) menggerakkan kualitas dan efisiensi bersama')
          },
          { type: 'p', text: T(
            '改善前の数字を入れてあります。**停止時間を62分から28分へ**、**生産数を402個から468個へ**、**良品数を389個から466個へ**動かすと、OEEが64.8%から77.7%へ上がる過程を確かめられます。3つの率のどれが効いているかも見えます。',
            'The calculator starts from the "before" figures. Move **downtime from 62 to 28 minutes**, **output from 402 to 468**, and **good pieces from 389 to 466** to watch OEE travel from 64.8% to 77.7% — and to see which of the three rates is doing the work.',
            'Kalkulator dimulai dari angka "sebelum". Ubah **waktu henti dari 62 ke 28 menit**, **output dari 402 ke 468**, dan **produk baik dari 389 ke 466** untuk melihat OEE bergerak dari 64,8% ke 77,7% — dan melihat rasio mana dari ketiganya yang bekerja.'
          ) },
          { type: 'widget', name: 'oee-calc', props: { planned: 420, downtime: 62, idealCt: 0.7, output: 402, good: 389 } },
          { type: 'callout', kind: 'key', title: T('この事例の骨', 'The bone of this case', 'Tulang kasus ini'), text: T(
            '結果（Y）を直接いじっていません。**条件（X）を範囲に収めた**だけです。不良を検査で止めたのでも、CTを急がせたのでもありません。これが[[xy-thinking|XY思考]]です。',
            'Nothing was done to the result (Y). The **conditions (X) were simply held inside a range**. Defects were not caught by inspection, and nobody was told to hurry. That is [[xy-thinking|XY thinking]].',
            'Tidak ada yang dilakukan pada hasil (Y). **Kondisi (X) hanya dijaga dalam rentang**. Cacat tidak ditangkap lewat inspeksi, dan tidak ada yang disuruh terburu-buru. Itulah [[xy-thinking|berpikir XY]].'
          ) },
          { type: 'p', text: T(
            '次の一手は**成果標準**です。予熱40分とGPCバンドを標準作業書とコントロールプランに書き、[[pdca-s|PDCA-S]]の日常管理に渡します。ここで固定しないと、人が変わった時点で元に戻ります（仕様書v29 1.6 原則③）。',
            'The next move is the **outcome standard**. Write the 40-minute pre-heat and the GPC band into the work instruction and the control plan, then hand them to [[pdca-s|PDCA-S]] for daily management. Without this the line reverts the moment the people change (spec v29, 1.6, principle ③).',
            'Langkah berikutnya adalah **standar hasil**. Tuliskan pra-panas 40 menit dan GPC band ke instruksi kerja dan control plan, lalu serahkan ke [[pdca-s|PDCA-S]] untuk manajemen harian. Tanpa ini lini kembali seperti semula begitu orangnya berganti (spesifikasi v29, 1.6, prinsip ③).'
          ) }
        ]
      }
    ],
    keyPoints: [
      T('標準化 → データ取得 → 4つの箱 → 計画 → 実施 → 成果標準の順に進む', 'Go in order: standardise, collect, four boxes, plan, act, outcome standard', 'Ikuti urutan: standardisasi, kumpulkan, empat kotak, rencana, tindakan, standar hasil'),
      T('4つの箱の数字には必ず根拠のデータを持たせる。④は計算で出す', 'Every number in the four boxes needs evidence; ④ is arithmetic', 'Setiap angka di empat kotak butuh dasar; ④ adalah hitungan'),
      T('品質と効率は別々の活動にしない。同じ原因（X）に行き着くことがある', 'Do not split quality and efficiency into two activities; they can meet at one cause (X)', 'Jangan pisahkan kualitas dan efisiensi; keduanya bisa bertemu pada satu penyebab (X)'),
      T('打つのは条件（X）。結果（Y）を直接動かさない', 'Act on the conditions (X), never on the result (Y)', 'Bertindak pada kondisi (X), bukan pada hasil (Y)'),
      T('最後に成果標準として固定しないと元に戻る', 'Freeze it as an outcome standard or it reverts', 'Bekukan sebagai standar hasil atau semuanya kembali')
    ],
    quiz: [
      { q: T('データを取る前に初期標準を決めるのはなぜか', 'Why fix an initial standard before collecting data?', 'Mengapa menetapkan standar awal sebelum mengambil data?'),
        choices: [
          T('標準があると改善が速く見えるから', 'A standard makes improvement look faster', 'Standar membuat perbaikan tampak lebih cepat'),
          T('測り方と条件が揃わないと、データが人の差を映してしまうから', 'Unless measurement and settings match, the data describes the people, not the process', 'Bila pengukuran dan setelan tidak sama, data menggambarkan orangnya, bukan prosesnya'),
          T('標準がないと作業者が困るから', 'Operators are troubled without a standard', 'Operator kesulitan tanpa standar'),
          T('ISOで決められているから', 'ISO requires it', 'ISO mensyaratkannya')
        ], answer: 1,
        explain: T('初期標準は最適解ではなく、比較可能な共通条件をつくるためのものです（仕様書v29 1.5）。', 'The initial standard is not the optimum; it creates a comparable common condition (spec v29, 1.5).', 'Standar awal bukan optimum; ia menciptakan kondisi umum yang dapat dibandingkan (spesifikasi v29, 1.5).') },
      { q: T('この事例で④の目標値 OEE 77.7% はどこから出たか', 'Where did the OEE target of 77.7% in box ④ come from?', 'Dari mana target OEE 77,7% pada kotak ④ berasal?'),
        choices: [
          T('前年比10%改善という方針から', 'A policy of 10% better than last year', 'Kebijakan 10% lebih baik dari tahun lalu'),
          T('他工場のベンチマークから', 'A benchmark from another plant', 'Tolok ukur dari pabrik lain'),
          T('清掃停止の解消・実力値42秒・ソリ停止の3つを掛け合わせた計算から', 'From arithmetic: removing the cleaning stops, the 42 s capability, and stopping the warp', 'Dari hitungan: menghapus henti pembersihan, kemampuan 42 dtk, dan menghentikan cacat melengkung'),
          T('管理者が決めた努力目標から', 'A stretch goal set by the manager', 'Target menantang yang ditetapkan manajer')
        ], answer: 2,
        explain: T('0.933 × 0.836 × 0.996 ＝ 0.777。根拠のない④はスローガンになります。', '0.933 × 0.836 × 0.996 = 0.777. A ④ without evidence is a slogan.', '0,933 × 0,836 × 0,996 = 0,777. ④ tanpa dasar adalah slogan.') },
      { q: T('品質（ソリ）と効率（CT・停止）が同時に良くなったのはなぜか', 'Why did quality (warp) and efficiency (CT, stops) improve together?', 'Mengapa kualitas (cacat melengkung) dan efisiensi (CT, henti) membaik bersama?'),
        choices: [
          T('2つの改善チームを同時に動かしたから', 'Two improvement teams ran in parallel', 'Dua tim perbaikan berjalan paralel'),
          T('検査を強化して不良を止め、作業者に急いでもらったから', 'Inspection was tightened and operators were asked to hurry', 'Inspeksi diperketat dan operator diminta bergegas'),
          T('どちらの原因（X）も始業後の金型温度だったから', 'Both traced back to the same X: the mould temperature after start-up', 'Keduanya berpangkal pada X yang sama: suhu cetakan setelah start-up'),
          T('設備を新品に入れ替えたから', 'The machine was replaced', 'Mesin diganti baru')
        ], answer: 2,
        explain: T('ソリも、CTの延びも、清掃停止も、金型温度の立ち上がりに紐づいていました。', 'The warp, the stretched CT and the cleaning stops all tied back to the mould warming up.', 'Cacat melengkung, CT yang memanjang, dan henti pembersihan semuanya berpangkal pada cetakan yang menghangat.') },
      { q: T('GPCバンド 58～66℃ はどうやって決まったか', 'How was the GPC band of 58–66 °C decided?', 'Bagaimana GPC band 58–66 °C ditetapkan?'),
        choices: [
          T('カタログの推奨値から', 'From the catalogue recommendation', 'Dari rekomendasi katalog'),
          T('予熱時間を変えた物理実験で、良品になる範囲を確かめたから', 'A physical trial varying pre-heat time confirmed the range that yields good parts', 'Uji fisik dengan mengubah waktu pra-panas memastikan rentang yang menghasilkan produk baik'),
          T('過去の平均値±3σから', 'From the historical mean ±3σ', 'Dari rata-rata historis ±3σ'),
          T('作業者の経験から', 'From operator experience', 'Dari pengalaman operator')
        ], answer: 1,
        explain: T('GPCバンドは物理実験で確かめた良品範囲です。統計だけで決めません（仕様書v29 3.1）。', 'A GPC band is the good-part range confirmed by physical trials, not by statistics alone (spec v29, 3.1).', 'GPC band adalah rentang produk baik yang dipastikan lewat uji fisik, bukan hanya statistik (spesifikasi v29, 3.1).') },
      { q: T('改善のあと最初にやるべきことは', 'What comes first after the improvement?', 'Apa yang pertama dilakukan setelah perbaikan?'),
        choices: [
          T('次のラインへ横展開する', 'Roll it out to the next line', 'Terapkan ke lini berikutnya'),
          T('予熱40分とGPCバンドを標準作業書とコントロールプランに書く', 'Write the 40-minute pre-heat and the GPC band into the work instruction and control plan', 'Tulis pra-panas 40 menit dan GPC band ke instruksi kerja dan control plan'),
          T('OEEの目標を上げ直す', 'Raise the OEE target again', 'Naikkan lagi target OEE'),
          T('報告書を書いて終わる', 'Write the report and close', 'Tulis laporan dan selesai')
        ], answer: 1,
        explain: T('成果標準として固定しないと、人が変わった時点で元に戻ります（原則③）。', 'Unless it is frozen as an outcome standard, the line reverts when the people change (principle ③).', 'Bila tidak dibekukan sebagai standar hasil, lini kembali semula saat orangnya berganti (prinsip ③).') }
    ]
  });
})();
