(function () {
  const T = (ja, en, id) => ({ ja, en, id });

  ZA.addModule({
    id: 'z3-08',
    track: 'z3',
    order: 8,
    minutes: 45,
    icon: '🧑‍🏭',
    level: 3,
    prereq: ['z3-07'],
    title: T('事例：組立ライン（人中心）', 'Case: assembly line (people-led)', 'Kasus: lini perakitan (berpusat pada manusia)'),
    summary: T(
      '5工程の手組立ラインを、QCDの3面で分析して改善します。ネック工程の作業時間がばらつき、タクトに届かない状態から、編成効率69.5%→87.1%、V.Score 0.119→0.023 まで動かした事例です。数値は説明用の仮想工程です。',
      'A five-station manual assembly line, analysed across Q, C and D. From a neck station whose time scattered and missed takt, to 69.5% → 87.1% line balance efficiency and V.Score 0.119 → 0.023. The numbers describe an illustrative process.',
      'Lini perakitan manual lima stasiun, dianalisis lewat Q, C, dan D. Berawal dari stasiun leher botol yang waktunya tersebar dan tidak mencapai takt, efisiensi keseimbangan lini bergerak dari 69,5% ke 87,1% dan V.Score dari 0,119 ke 0,023. Angka-angkanya berasal dari proses fiktif untuk ilustrasi.'
    ),
    objectives: [
      T('人の作業をQCDの3面から同じデータで分析できる', 'Analyse manual work across Q, C and D from one set of data', 'Menganalisis kerja manual lewat Q, C, dan D dari satu set data'),
      T('ネック工程のバラツキが、品質にも納期にも効くことを説明できる', 'Explain how scatter at the neck station hits quality and delivery alike', 'Menjelaskan bagaimana variasi di stasiun leher botol berdampak pada kualitas sekaligus pengiriman'),
      T('人の作業に対して打つ手が、結果ではなく条件（配置・順序・治具）であることを示せる', 'Show that the countermeasure for manual work is the condition (layout, sequence, jig), not the result', 'Menunjukkan bahwa penanggulangan untuk kerja manual adalah kondisinya (tata letak, urutan, jig), bukan hasilnya'),
      T('[[ole|OLE]]・[[v-score|V.Score]]・編成効率をあわせて読める', 'Read [[ole|OLE]], [[v-score|V.Score]] and line balance efficiency together', 'Membaca [[ole|OLE]], [[v-score|V.Score]], dan efisiensi keseimbangan lini bersama')
    ],
    sections: [
      {
        id: 'situation',
        title: T('ラインの姿とQCDの症状', 'The line, and its Q, C and D symptoms', 'Lini ini, dan gejala Q, C, D-nya'),
        blocks: [
          { type: 'p', text: T(
            '**A-3ライン**は5人でスピーカーユニットを組み立てます。1直420分、必要数560台、つまり**タクトタイムは45秒**です。工程3（配線とはんだ付け）が明らかに遅く、前後に仕掛が溜まっていました。',
            '**Line A-3** assembles a speaker unit with five people. A 420-minute shift and a demand of 560 units give a **takt time of 45 s**. Station 3 (wiring and soldering) was visibly slow, and WIP piled up around it.',
            '**Lini A-3** merakit unit speaker dengan lima orang. Shift 420 menit dan permintaan 560 unit memberi **takt time 45 detik**. Stasiun 3 (pengkabelan dan penyolderan) jelas lambat, dan WIP menumpuk di sekitarnya.'
          ) },
          { type: 'table',
            head: [T('面', 'Facet', 'Aspek'), T('症状', 'Symptom', 'Gejala'), T('現場の言い分', 'What the floor said', 'Kata orang lapangan')],
            rows: [
              [T('Q 品質', 'Q Quality', 'Q Kualitas'), T('はんだ不良 2.6%（手直しで戻す）', 'Solder defects 2.6% (recovered by repair)', 'Cacat solder 2,6% (dipulihkan lewat perbaikan)'), T('「新人の腕の差」', '"The new operators\' skill"', '"Keterampilan operator baru"')],
              [T('C コスト', 'C Cost', 'C Biaya'), T('1直あたり残業45分', '45 minutes of overtime per shift', '45 menit lembur per shift'), T('「数が足りないから」', '"Because we are short of output"', '"Karena output kurang"')],
              [T('D 納期', 'D Delivery', 'D Pengiriman'), T('日産419台（残業45分込み。必要560台に届かない）', '419 units a day including the 45 min of overtime, against the 560 required', '419 unit per hari termasuk lembur 45 menit, terhadap 560 yang dibutuhkan'), T('「人を増やすしかない」', '"We need more people"', '"Kami perlu tambahan orang"')]
            ],
            caption: T('3つとも別々の話に見えるが、データを取ると同じ場所を指す', 'All three look like different stories until the data points at one place', 'Ketiganya tampak seperti cerita yang berbeda sampai data menunjuk ke satu tempat')
          },
          { type: 'callout', kind: 'warn', title: T('ここで人を増やすと何が起きるか', 'What happens if you add people here', 'Apa yang terjadi bila menambah orang di sini'), text: T(
            '人を増やせば日産は少し上がります。しかし**工程3のバラツキはそのまま**なので、仕掛も手直しも残り、増えた人件費だけが確定します。原因（X）を見ずに結果（Y）を買いに行く形です。',
            'Adding people lifts output a little. But **the scatter at station 3 stays**, so the WIP and the repair work stay too, and only the labour cost is locked in. That is buying the result (Y) without looking at the cause (X).',
            'Menambah orang sedikit menaikkan output. Tetapi **sebaran di stasiun 3 tetap**, sehingga WIP dan pekerjaan perbaikan juga tetap, dan hanya biaya tenaga kerja yang terkunci. Itu membeli hasil (Y) tanpa melihat penyebab (X).'
          ) }
        ]
      },
      {
        id: 'standardize',
        title: T('ステップ1：測れる状態をつくる', 'Step 1: make it measurable', 'Langkah 1: buat dapat diukur'),
        blocks: [
          { type: 'p', text: T(
            '人の作業は、**同じ手順で流れていないと時間を測る意味がありません**。まず工程3の作業を要素に分け、順序と置き場を決めました。ここが[[initial-standard|初期標準]]です。',
            'With manual work, **measuring time means nothing unless everyone follows the same sequence**. Station 3 was broken into elements, and the order and the placement were fixed. That is the [[initial-standard|initial standard]].',
            'Pada kerja manual, **mengukur waktu tidak ada gunanya bila tidak semua orang mengikuti urutan yang sama**. Stasiun 3 dipecah menjadi elemen, lalu urutan dan tata letaknya ditetapkan. Itulah [[initial-standard|standar awal]].'
          ) },
          { type: 'table',
            head: [T('要素作業', 'Work element', 'Elemen kerja'), T('決める前', 'Before', 'Sebelumnya'), T('初期標準', 'Initial standard', 'Standar awal')],
            rows: [
              [T('部品を取る', 'Pick the part', 'Ambil part'), T('棚まで歩く（3.5m）', 'Walk to the rack (3.5 m)', 'Berjalan ke rak (3,5 m)'), T('手元の箱から取る（0.4m）', 'Take from a box at hand (0.4 m)', 'Ambil dari kotak di dekat tangan (0,4 m)')],
              [T('配線の順序', 'Wiring order', 'Urutan pengkabelan'), T('人によって違う', 'Differs by person', 'Berbeda antar orang'), T('赤→黒→信号線に固定', 'Fixed: red → black → signal wire', 'Ditetapkan: merah → hitam → kabel sinyal')],
              [T('はんだごての温度', 'Soldering-iron temperature', 'Suhu ujung solder'), T('表示を見ていない', 'Nobody watches the display', 'Tidak ada yang melihat tampilan'), T('始業時に確認し記録', 'Check and record at start-up', 'Periksa dan catat saat mulai')],
              [T('時間の測り方', 'How time is measured', 'Cara mengukur waktu'), T('平均だけ日報に', 'Only the average in the daily report', 'Hanya rata-rata di laporan harian'), T('1サイクルずつ、3日間で毎日10サイクル記録（下表は代表の1日分）', 'Record every cycle: 10 a day for three days (the table shows one representative day)', 'Catat tiap siklus: 10 per hari selama tiga hari (tabel menampilkan satu hari representatif)')],
              [T('不良の数え方', 'How defects are counted', 'Cara menghitung cacat'), T('「手直し」とだけ', 'Just "repair"', 'Hanya "perbaikan"'), T('[[quality-category|品質区分]]と発生要素', 'By [[quality-category|quality category]] and which element', 'Per [[quality-category|kategori kualitas]] dan elemen penyebab')]
            ]
          }
        ]
      },
      {
        id: 'data',
        title: T('ステップ2：データが指した場所', 'Step 2: where the data pointed', 'Langkah 2: ke mana data menunjuk'),
        blocks: [
          { type: 'table',
            head: [T('取ったもの', 'What was taken', 'Yang diambil'), T('結果', 'Result', 'Hasil'), T('読み', 'Reading', 'Pembacaan')],
            rows: [
              [T('工程3の作業時間', 'Station 3 cycle times', 'Waktu siklus stasiun 3'), T('57／71／60／76／58／68／63／80／59／74 秒', '57 / 71 / 60 / 76 / 58 / 68 / 63 / 80 / 59 / 74 s', '57 / 71 / 60 / 76 / 58 / 68 / 63 / 80 / 59 / 74 dtk'), T('平均66.6秒、母標準偏差7.90、[[v-score|V.Score]] 0.119。最小値57秒がこの工程の基準サイクルタイム', 'Mean 66.6 s, population σ 7.90, [[v-score|V.Score]] 0.119. The minimum, 57 s, is the standard CT of this station', 'Rata-rata 66,6 dtk, σ populasi 7,90, [[v-score|V.Score]] 0,119. Nilai minimum 57 dtk adalah CT standar stasiun ini')],
              [T('5工程の基準サイクルタイム', 'Standard CT of the five stations', 'CT standar lima stasiun'), T('34／38／57／36／33 秒', '34 / 38 / 57 / 36 / 33 s', '34 / 38 / 57 / 36 / 33 dtk'), T('ネックタイム57秒 ＞ タクト45秒', 'Neck time 57 s > takt 45 s', 'Waktu leher botol 57 dtk > takt 45 dtk')],
              [T('はんだ不良の発生要素', 'Which element produced the solder defects', 'Elemen penyebab cacat solder'), T('11件中9件が「信号線」', '9 of 11 at the signal wire', '9 dari 11 pada kabel sinyal'), T('人ではなく特定の要素作業に集中', 'Concentrated in one element, not in a person', 'Terpusat pada satu elemen, bukan pada orang'),],
              [T('遅いサイクルの中身', 'What the slow cycles contained', 'Isi siklus yang lambat'), T('61秒・57秒・55秒はすべて部品探し込み', '61, 57 and 55 s all include searching for a part', '61, 57, dan 55 dtk semuanya termasuk mencari part'), T('無価値作業（動作ロス）', 'Non-value work (motion loss)', 'Pekerjaan tanpa nilai (kerugian gerakan)')]
            ]
          },
          { type: 'callout', kind: 'tip', title: T('「新人の腕の差」ではなかった', 'It was not "the new operators\' skill"', 'Ternyata bukan "keterampilan operator baru"'), text: T(
            '作業者別にV.Scoreを分けても差は出ませんでした。**遅いサイクルは人ではなく、部品探しが起きたサイクル**に集中していました。はんだ不良も信号線という特定の要素に集中しています。人の問題に見えたものが、置き場と順序の問題でした。',
            'Splitting V.Score by operator showed no difference. **The slow cycles clustered around searching for a part, not around a person.** The solder defects clustered at one element, the signal wire. What looked like a people problem was a placement and sequence problem.',
            'Memisahkan V.Score per operator tidak menunjukkan perbedaan. **Siklus lambat mengelompok pada pencarian part, bukan pada orang.** Cacat solder mengelompok pada satu elemen, kabel sinyal. Yang tampak sebagai masalah orang ternyata masalah tata letak dan urutan.'
          ) }
        ]
      },
      {
        id: 'boxes',
        title: T('ステップ3：4つの箱', 'Step 3: the four boxes', 'Langkah 3: empat kotak'),
        blocks: [
          { type: 'diagram', name: 'four-boxes',
            props: {
              label: T('事例：組立ラインの4つの箱', 'Case: the four boxes for the assembly line', 'Kasus: empat kotak untuk lini perakitan'),
              b1: T('編成効率69.5%／ネック57秒／V.Score 0.119\n不良率2.6%／日産419台（残業45分込み）', 'Line balance 69.5% / neck 57 s / V.Score 0.119\ndefects 2.6% / 419 a day incl. 45 min of overtime', 'Keseimbangan lini 69,5% / leher botol 57 dtk / V.Score 0,119\ncacat 2,6% / 419 per hari termasuk lembur 45 menit'),
              b2: T('工程3が配線とはんだを1人で担当。\n部品は3.5m先の棚。信号線は最後に付ける', 'Station 3 does wiring and soldering alone.\nParts sit 3.5 m away; the signal wire goes on last', 'Stasiun 3 mengerjakan pengkabelan dan solder sendiri.\nPart 3,5 m jauhnya; kabel sinyal dipasang terakhir'),
              b3: T('はんだ付けを工程4へ移す。部品を手元に\n3定で置く。信号線を先に固定する治具', 'Move soldering to station 4. Place parts at hand\nwith 3-tei. Add a jig that seats the signal wire first', 'Pindahkan solder ke stasiun 4. Letakkan part di dekat\ntangan dengan 3-tei. Tambah jig untuk kabel sinyal'),
              b4: T('編成効率87.1%／ネック42秒／V.Score 0.03\n不良率0.3%／日産580台（残業なし）', 'Line balance 87.1% / neck 42 s / V.Score 0.03\ndefects 0.3% / 580 a day, no overtime', 'Keseimbangan lini 87,1% / leher botol 42 dtk / V.Score 0,03\ncacat 0,3% / 580 per hari, tanpa lembur'),
              loop: T('置き場と順序という1つの条件で、品質・コスト・納期の3つとも動く', 'One condition — where parts sit and in what order — moves quality, cost and delivery alike', 'Satu kondisi — di mana part diletakkan dan dalam urutan apa — menggerakkan kualitas, biaya, dan pengiriman sekaligus')
            },
            caption: T('QCDを別々に追わない。②を変えると①が④になる', 'Do not chase Q, C and D separately; change ② and ① becomes ④', 'Jangan kejar Q, C, D terpisah; ubah ② dan ① menjadi ④') },
          { type: 'table',
            head: [T('箱', 'Box', 'Kotak'), T('中身', 'Content', 'Isi'), T('根拠', 'Evidence', 'Dasar')],
            rows: [
              [T('① 現状の値', '① Current value', '① Nilai saat ini'), T('編成効率69.5%／ネック57秒／[[v-score|V.Score]] 0.119／不良2.6%／日産419台', 'Line balance efficiency 69.5% / neck 57 s / [[v-score|V.Score]] 0.119 / defects 2.6% / 419 a day', 'Efisiensi keseimbangan lini 69,5% / leher botol 57 dtk / [[v-score|V.Score]] 0,119 / cacat 2,6% / 419 per hari'), T('3日間×10サイクルの実測（代表の1日分を掲載）と品質記録。不良率 ＝ 11件 ÷ 419台 ＝ 2.6%', 'Three days × 10 cycles — one representative day is shown — plus the quality record. Defect rate = 11 ÷ 419 = 2.6%', 'Tiga hari × 10 siklus — satu hari representatif ditampilkan — ditambah catatan kualitas. Tingkat cacat = 11 ÷ 419 = 2,6%')],
              [T('② 現状のやり方', '② Current way', '② Cara saat ini'), T('工程3が配線とはんだを1人で担当。部品は3.5m先の棚。信号線は最後に付ける', 'Station 3 does wiring and soldering alone. Parts sit 3.5 m away. The signal wire goes on last', 'Stasiun 3 mengerjakan pengkabelan dan solder sendiri. Part berada 3,5 m dari tempat kerja. Kabel sinyal dipasang terakhir'), T('動作観察と、遅いサイクルの中身', 'Motion observation and the content of the slow cycles', 'Observasi gerakan dan isi siklus lambat')],
              [T('③ 新たなやり方', '③ New way', '③ Cara baru'), T('はんだ付けを工程4へ移す。部品を手元に3定で置く。信号線を先に付ける治具を作る', 'Move soldering to station 4. Place parts at hand with 3-tei. Add a jig that seats the signal wire first', 'Pindahkan penyolderan ke stasiun 4. Letakkan part di dekat tangan dengan 3-tei. Tambah jig yang memasang kabel sinyal lebih dulu'), T('[[ecrs|ECRS]]と[[motion-stability|動作安定の原理]]', '[[ecrs|ECRS]] and the [[motion-stability|principles of motion stability]]', '[[ecrs|ECRS]] dan [[motion-stability|prinsip stabilitas gerakan]]')],
              [T('④ 目標の値', '④ Target value', '④ Nilai target'), T('編成効率87.1%／ネック42秒／[[v-score|V.Score]] 0.03／不良0.3%／日産580台', 'Line balance efficiency 87.1% / neck 42 s / [[v-score|V.Score]] 0.03 / defects 0.3% / 580 a day', 'Efisiensi keseimbangan lini 87,1% / leher botol 42 dtk / [[v-score|V.Score]] 0,03 / cacat 0,3% / 580 per hari'), T('移し替え後の基準サイクルタイムは39／40／42／38／37秒（合計196、ネック42）。ネック42秒はタクト45秒以下なので基準時間はタクト。196 ÷（45 × 5）＝ 87.1%。日産580台 ＝ 25,200秒 ÷ 平均43.4秒。信号線の9件が消え、残るのは他要素の2件（419台あたり0.5%）。順序を固定すれば台数が増えても件数は増えないと置き、2 ÷ 580 ＝ 0.3%', 'Standard CTs after the move: 39 / 40 / 42 / 38 / 37 s (196 total, neck 42). The neck is inside the 45 s takt, so takt is the reference: 196 ÷ (45 × 5) = 87.1%. 580 a day = 25,200 s ÷ a 43.4 s mean. The nine signal-wire defects go; the two from other elements remain (0.5% against 419). Holding the sequence keeps the count flat as output rises, so 2 ÷ 580 = 0.3%', 'CT standar setelah pemindahan: 39 / 40 / 42 / 38 / 37 dtk (total 196, leher botol 42). Leher botol masih di dalam takt 45 dtk, jadi acuannya takt: 196 ÷ (45 × 5) = 87,1%. 580 per hari = 25.200 dtk ÷ rata-rata 43,4 dtk. Sembilan cacat kabel sinyal hilang; dua dari elemen lain tersisa (0,5% terhadap 419). Menjaga urutan membuat jumlahnya tetap saat output naik, jadi 2 ÷ 580 = 0,3%')]
            ]
          },
          { type: 'callout', kind: 'key', title: T('④の日産580台は「タクトに追いつく」という意味', '580 a day in ④ means "catching up with takt"', '580 per hari di ④ berarti "mengejar takt"'), text: T(
            'ネックタイムが57秒から42秒に下がると、タクト45秒を下回ります。**ネックがタクト以下になって初めて、必要数を作れる**ようになります。人を増やさず、残業も止めて日産419台→580台となり、必要数560台を超えます。',
            'When the neck time falls from 57 s to 42 s it drops below the 45 s takt. **Only once the neck is inside takt can the line make the required quantity.** 419 → 580 a day, with no extra people and no overtime — above the 560 required.',
            'Ketika waktu leher botol turun dari 57 dtk ke 42 dtk, ia jatuh di bawah takt 45 dtk. **Baru setelah leher botol masuk takt, lini dapat membuat jumlah yang dibutuhkan.** 419 → 580 per hari, tanpa tambahan orang dan tanpa lembur — di atas 560 yang dibutuhkan.'
          ) }
        ]
      },
      {
        id: 'result',
        title: T('ステップ4：結果をQCDで読む', 'Step 4: read the result across Q, C and D', 'Langkah 4: baca hasil lewat Q, C, dan D'),
        blocks: [
          { type: 'table',
            head: [T('面', 'Facet', 'Aspek'), T('改善前', 'Before', 'Sebelum'), T('改善後', 'After', 'Sesudah'), T('効いた条件（X）', 'The condition (X) that moved it', 'Kondisi (X) yang menggerakkan')],
            rows: [
              [T('Q はんだ不良', 'Q Solder defects', 'Q Cacat solder'), T('2.6%', '2.6%', '2,6%'), T('0.3%', '0.3%', '0,3%'), T('信号線を先に固定する治具。残る2件は他要素', 'A jig that seats the signal wire first; the two that remain are other elements', 'Jig yang memasang kabel sinyal lebih dulu; dua yang tersisa dari elemen lain')],
              [T('C 残業', 'C Overtime', 'C Lembur'), T('45分/直', '45 min/shift', '45 mnt/shift'), T('0分', '0 min', '0 mnt'), T('ネックがタクト内に収まった', 'The neck came inside takt', 'Leher botol masuk dalam takt')],
              [T('D 日産', 'D Daily output', 'D Output harian'), T('419台', '419 units', '419 unit'), T('580台', '580 units', '580 unit'), T('作業の移し替えと部品の3定', 'Moving work across, and 3-tei for parts', 'Memindahkan pekerjaan, dan 3-tei untuk part')],
              [T('編成効率', 'Line balance efficiency', 'Efisiensi keseimbangan lini'), T('69.5%', '69.5%', '69,5%'), T('87.1%', '87.1%', '87,1%'), T('57秒の山を4工程へ崩した', 'The 57 s peak was levelled across four stations', 'Puncak 57 dtk diratakan ke empat stasiun')],
              [T('[[v-score|V.Score]]', '[[v-score|V.Score]]', '[[v-score|V.Score]]'), T('0.119', '0.119', '0,119'), T('0.023', '0.023', '0,023'), T('部品探しの消滅。母標準偏差1.02 ÷ 平均43.4 ＝ 0.023で、④に置いた0.03を下回った', 'Searching for parts disappeared. Population σ 1.02 ÷ a 43.4 s mean = 0.023, below the 0.03 in box 4', 'Pencarian part hilang. σ populasi 1,02 ÷ rata-rata 43,4 = 0,023, di bawah 0,03 pada kotak 4')]
            ]
          },
          { type: 'callout', kind: 'zeva', title: T('QCDは別々に追わない', 'Do not chase Q, C and D separately', 'Jangan kejar Q, C, dan D secara terpisah'), text: T(
            '品質・コスト・納期の3つとも、**工程3の置き場と順序**という1つの条件で動きました。3つを別々のKPIとして追いかけると、担当も打ち手も分かれ、互いに打ち消し合います（例：不良を減らすために検査を増やして日産が落ちる）。',
            'Quality, cost and delivery all moved on one condition: **the placement and the sequence at station 3**. Chase them as three separate KPIs and the owners and countermeasures split, then cancel each other out (adding inspection to cut defects lowers output).',
            'Kualitas, biaya, dan pengiriman semuanya bergerak pada satu kondisi: **tata letak dan urutan di stasiun 3**. Mengejarnya sebagai tiga KPI terpisah memecah penanggung jawab dan penanggulangan, lalu saling meniadakan (menambah inspeksi untuk mengurangi cacat menurunkan output).'
          ) },
          { type: 'p', text: T(
            '固定のしかたは設備の事例と同じです。新しい要素順序と部品の置き場を標準作業書に書き、[[v-score|V.Score]]を週次で監視します。0.03が0.1に近づいたら、標準どおりに流れていない合図です。',
            'Freezing it works the same as in the machine case. Write the new element order and the part placement into the work instruction, then watch [[v-score|V.Score]] weekly. When 0.03 drifts towards 0.1, the standard is no longer being followed.',
            'Cara membekukannya sama seperti pada kasus mesin. Tulis urutan elemen baru dan tata letak part ke instruksi kerja, lalu pantau [[v-score|V.Score]] mingguan. Ketika 0,03 bergerak ke arah 0,1, standar tidak lagi diikuti.'
          ) },
          { type: 'widget', name: 'vscore-calc', props: { a: [42, 44, 43, 45, 42, 44, 43, 45, 43, 43], b: [57, 71, 60, 76, 58, 68, 63, 80, 59, 74], stdCt: 45 } }
        ]
      }
    ],
    keyPoints: [
      T('人の作業でも、まず順序と置き場を決めないと時間を測る意味がない', 'With manual work too, fixing the sequence and the placement comes before measuring time', 'Pada kerja manual pun, menetapkan urutan dan tata letak mendahului pengukuran waktu'),
      T('遅いサイクルの「中身」を見る。人ではなく要素作業に原因が集中する', 'Look at what the slow cycles contain; the cause clusters in an element, not in a person', 'Lihat isi siklus lambat; penyebabnya mengelompok pada elemen, bukan pada orang'),
      T('ネックタイムがタクトを下回って初めて必要数を作れる', 'Only once the neck time is inside takt can the line make the required quantity', 'Baru setelah waktu leher botol masuk takt, lini dapat membuat jumlah yang dibutuhkan'),
      T('QCDは別々に追わない。1つの条件（X）で3つとも動くことがある', 'Do not chase Q, C and D separately; one condition (X) can move all three', 'Jangan kejar Q, C, D terpisah; satu kondisi (X) dapat menggerakkan ketiganya'),
      T('人を増やすのは、条件を直したあとで判断する', 'Decide about adding people only after the conditions are fixed', 'Putuskan penambahan orang hanya setelah kondisinya diperbaiki')
    ],
    quiz: [
      { q: T('工程3の遅いサイクルの原因は何だったか', 'What caused the slow cycles at station 3?', 'Apa penyebab siklus lambat di stasiun 3?'),
        choices: [
          T('新人の技能不足', 'The new operators\' skill', 'Keterampilan operator baru'),
          T('部品を探す動作が混ざったサイクル', 'Cycles that included searching for a part', 'Siklus yang mengandung pencarian part'),
          T('はんだごての故障', 'A faulty soldering iron', 'Solder yang rusak'),
          T('材料のロット差', 'Material lot variation', 'Variasi lot material')
        ], answer: 1,
        explain: T('作業者別にV.Scoreを分けても差は出ず、遅いサイクルは部品探しに集中していました。', 'Splitting V.Score by operator showed no difference; the slow cycles clustered around searching for a part.', 'Memisahkan V.Score per operator tidak menunjukkan perbedaan; siklus lambat mengelompok pada pencarian part.') },
      { q: T('改善前の編成効率69.5%の基準時間はどれか', 'Which reference time gives the 69.5% line balance efficiency before the improvement?', 'Waktu acuan mana yang memberi efisiensi 69,5% sebelum perbaikan?'),
        choices: [
          T('タクトタイム45秒', 'The takt time, 45 s', 'Takt time, 45 dtk'),
          T('ネックタイム57秒（タクトを超えているため）', 'The neck time, 57 s, because it exceeds takt', 'Waktu leher botol, 57 dtk, karena melampaui takt'),
          T('平均CT 39.6秒', 'The mean CT, 39.6 s', 'CT rata-rata, 39,6 dtk'),
          T('最小CT 33秒', 'The minimum CT, 33 s', 'CT minimum, 33 dtk')
        ], answer: 1,
        explain: T('198 ÷（57 × 5）＝ 69.5%。ネックがタクトを超えたので基準はネックタイムです（仕様書v29 16.5）。', '198 ÷ (57 × 5) = 69.5%. The neck exceeded takt, so the reference is the neck time (spec v29, 16.5).', '198 ÷ (57 × 5) = 69,5%. Leher botol melampaui takt, jadi acuannya adalah waktu leher botol (spesifikasi v29, 16.5).') },
      { q: T('はんだ不良に対して打った手はどれか', 'What was done about the solder defects?', 'Apa yang dilakukan terhadap cacat solder?'),
        choices: [
          T('全数検査を追加した', 'Added 100% inspection', 'Menambah inspeksi 100%'),
          T('作業者を再教育した', 'Retrained the operators', 'Melatih ulang operator'),
          T('信号線を先に固定する治具を作った', 'Built a jig that seats the signal wire first', 'Membuat jig yang memasang kabel sinyal lebih dulu'),
          T('はんだの種類を変えた', 'Changed the solder type', 'Mengganti jenis solder')
        ], answer: 2,
        explain: T('不良は信号線という要素に集中していました。結果（Y）ではなく条件（X）を変えています。', 'The defects clustered at one element, the signal wire. The condition (X) was changed, not the result (Y).', 'Cacat mengelompok pada satu elemen, kabel sinyal. Kondisi (X) yang diubah, bukan hasil (Y).') },
      { q: T('この事例でQCDが同時に良くなった理由は', 'Why did Q, C and D improve together here?', 'Mengapa Q, C, dan D membaik bersama di sini?'),
        choices: [
          T('3つのKPIに別々の担当を付けたから', 'Each KPI was given its own owner', 'Tiap KPI diberi penanggung jawab sendiri'),
          T('工程3の置き場と順序という1つの条件が3つに効いたから', 'One condition — the placement and sequence at station 3 — moved all three', 'Satu kondisi — tata letak dan urutan di stasiun 3 — menggerakkan ketiganya'),
          T('残業を禁止したから', 'Overtime was banned', 'Lembur dilarang'),
          T('人を1人増やしたから', 'One more person was added', 'Ditambah satu orang')
        ], answer: 1,
        explain: T('部品探しの消滅がCTとバラツキを、治具が不良を、ネック解消が日産を動かしました。', 'Removing the search moved CT and scatter, the jig moved defects, and the neck moved daily output.', 'Menghapus pencarian menggerakkan CT dan sebaran, jig menggerakkan cacat, dan leher botol menggerakkan output harian.') },
      { q: T('改善を固定するために週次で見る指標は', 'Which metric is watched weekly to keep the improvement?', 'Metrik mana yang dipantau mingguan untuk menjaga perbaikan?'),
        choices: [
          T('日産台数', 'Daily output', 'Output harian'),
          T('残業時間', 'Overtime hours', 'Jam lembur'),
          T('[[v-score|V.Score]]', '[[v-score|V.Score]]', '[[v-score|V.Score]]'),
          T('作業者の人数', 'Headcount', 'Jumlah orang')
        ], answer: 2,
        explain: T('V.Scoreが0.03から0.1へ近づくのは、標準どおりに流れていない合図です。', 'V.Score drifting from 0.03 towards 0.1 signals that the standard is no longer being followed.', 'V.Score yang bergerak dari 0,03 ke 0,1 menandakan standar tidak lagi diikuti.') }
    ]
  });
})();
