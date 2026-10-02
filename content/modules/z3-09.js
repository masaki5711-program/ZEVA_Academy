(function () {
  const T = (ja, en, id) => ({ ja, en, id });

  ZA.addModule({
    id: 'z3-09',
    track: 'z3',
    order: 9,
    minutes: 45,
    icon: '⏱️',
    level: 3,
    prereq: ['z3-08'],
    title: T('事例：工程間の流れ（リードタイム）', 'Case: flow across processes (lead time)', 'Kasus: aliran antar proses (lead time)'),
    summary: T(
      '6工程をまたぐ製品のリードタイムを9.5日から3.4日にした事例です。どの工程も速くしていません。工程と工程の「間」に置かれた仕掛を減らしただけです。数値は説明用の仮想工程です。',
      'The lead time of a product crossing six processes, cut from 9.5 days to 3.4. No process was made faster. Only the WIP parked *between* the processes was reduced. The numbers describe an illustrative process.',
      'Lead time produk yang melewati enam proses, dipangkas dari 9,5 hari menjadi 3,4 hari. Tidak ada proses yang dipercepat. Hanya WIP yang diparkir *di antara* proses yang dikurangi. Angka-angkanya berasal dari proses fiktif untuk ilustrasi.'
    ),
    objectives: [
      T('リードタイムを「正味の加工」と「待ち」に分けて測れる', 'Split lead time into net processing and waiting, and measure both', 'Memisahkan lead time menjadi waktu proses bersih dan waktu tunggu, lalu mengukur keduanya'),
      T('仕掛の量とリードタイムが比例することを式で説明できる', 'Explain with a formula why WIP and lead time move together', 'Menjelaskan dengan rumus mengapa WIP dan lead time bergerak bersama'),
      T('ロットの大きさを決めているのが段取り時間だと突き止められる', 'Trace the lot size back to the changeover time that sets it', 'Menelusuri ukuran lot ke waktu pergantian yang menentukannya'),
      T('工程単体の改善と、工程間の流れの改善を区別できる', 'Tell improvement of a single process apart from improvement of the flow between them', 'Membedakan perbaikan satu proses dari perbaikan aliran di antaranya')
    ],
    sections: [
      {
        id: 'situation',
        title: T('どの工程も遅くないのに、納期が遅れる', 'No process is slow, yet the delivery slips', 'Tidak ada proses yang lambat, tetapi pengiriman meleset'),
        blocks: [
          { type: 'p', text: T(
            '製品Kは、切断・曲げ・溶接・塗装・乾燥・組立検査の6工程を通ります。日産180個、[[lead-time|リードタイム]]は受注から出荷まで**9.5日**。納期遵守率は78%でした。ところが工程ごとに見ると、どこも能力不足ではありません。',
            'Product K passes through six processes: cutting, bending, welding, painting, drying, and assembly-plus-inspection. Output is 180 a day and the [[lead-time|lead time]] from order to shipment is **9.5 days**, with 78% on-time delivery. Yet look process by process and none of them is short of capacity.',
            'Produk K melewati enam proses: pemotongan, penekukan, pengelasan, pengecatan, pengeringan, dan perakitan-plus-inspeksi. Output 180 per hari dan [[lead-time|lead time]] dari pesanan hingga pengiriman **9,5 hari**, dengan ketepatan pengiriman 78%. Namun lihat proses per proses: tidak ada yang kekurangan kapasitas.'
          ) },
          { type: 'callout', kind: 'warn', title: T('ここで起きがちな取り違え', 'The mix-up that usually happens here', 'Kekeliruan yang biasa terjadi di sini'), text: T(
            '「リードタイムが長い」と聞くと、**どこかの工程が遅い**と考えて工程単体のサイクルタイムを測りに行きます。しかしこの事例では、製品が実際に加工されている時間はリードタイム全体の2%未満でした。残りの98%は、工程と工程の間で**待っていた**時間です。',
            'Hearing "the lead time is long", people go and time the cycle of each process, assuming **some process is slow**. Here, the time the product actually spends being worked on is under 2% of the lead time. The other 98% is spent **waiting** between processes.',
            'Mendengar "lead time-nya panjang", orang langsung mengukur siklus tiap proses, mengira **ada proses yang lambat**. Di sini, waktu produk benar-benar dikerjakan kurang dari 2% dari lead time. Sisanya 98% dihabiskan **menunggu** di antara proses.'
          ) }
        ]
      },
      {
        id: 'standardize',
        title: T('ステップ1：流れを測れる状態にする', 'Step 1: make the flow measurable', 'Langkah 1: buat aliran dapat diukur'),
        blocks: [
          { type: 'p', text: T(
            '工程内の改善なら、作業手順を決めれば測れます。**流れの改善で決めるのは、置き場と順番**です。どこに何個まで置いてよいかが決まっていないと、仕掛は数えられません。',
            'For work inside a process, fixing the procedure makes it measurable. **For the flow, what must be fixed is where things sit and in what order.** Until you say where WIP may sit and how much, it cannot be counted.',
            'Untuk kerja di dalam proses, menetapkan prosedur membuatnya terukur. **Untuk aliran, yang harus ditetapkan adalah di mana barang diletakkan dan dalam urutan apa.** Selama belum ditentukan di mana WIP boleh diletakkan dan berapa banyak, ia tidak dapat dihitung.'
          ) },
          { type: 'table',
            head: [T('決めたこと', 'What was fixed', 'Yang ditetapkan'), T('決める前', 'Before', 'Sebelumnya'), T('初期標準', 'Initial standard', 'Standar awal')],
            rows: [
              [T('仕掛の置き場', 'Where WIP sits', 'Tempat WIP'), T('空いている床に置く', 'Wherever the floor is free', 'Di lantai mana pun yang kosong'), T('工程間ごとに区画を引き、そこにだけ置く', 'A marked area between each pair of processes, and nowhere else', 'Area bertanda di antara tiap pasang proses, dan tidak di tempat lain')],
              [T('流す順番', 'The order of flow', 'Urutan aliran'), T('取りやすいものから', 'Whatever is easiest to reach', 'Yang paling mudah dijangkau'), T('先入れ先出し（区画の端から取る）', 'FIFO — take from one end of the area', 'FIFO (masuk pertama, keluar pertama) — ambil dari satu ujung area')],
              [T('通過の記録', 'The record of passing', 'Catatan perpindahan'), T('日報に「加工済」とだけ', 'Only "processed" in the daily report', 'Hanya "diproses" di laporan harian'), T('工程を出た時刻を個体ごとに記録（2週間）', 'Time-stamp each unit as it leaves a process, for two weeks', 'Catat waktu tiap unit keluar dari proses, selama dua minggu')],
              [T('段取りの記録', 'The record of changeover', 'Catatan pergantian'), T('「段取り中」として一括', 'Lumped together as "changeover"', 'Digabung sebagai "pergantian"'), T('外段取り・内段取りに分けて実測', 'Measured, split into external and internal setup', 'Diukur, dipisah menjadi setup eksternal dan internal')]
            ]
          },
          { type: 'callout', kind: 'tip', title: T('先入れ先出しは、改善ではなく前提', 'FIFO is not the improvement — it is the precondition', 'FIFO bukan perbaikannya — itu prasyaratnya'), text: T(
            '取りやすいものから取っていると、下に埋もれた品物が何日も残ります。個体ごとのリードタイムがばらつき、平均を測っても意味を持ちません。**先入れ先出しにして初めて、仕掛の量がそのまま待ち時間になります。**',
            'If people take whatever is nearest, the pieces buried underneath sit for days. Lead time scatters unit by unit and the average stops meaning anything. **Only under FIFO does the amount of WIP translate directly into waiting time.**',
            'Bila orang mengambil yang terdekat, barang yang tertimbun di bawah bisa tertinggal berhari-hari. Lead time tersebar per unit dan rata-ratanya berhenti bermakna. **Hanya di bawah FIFO jumlah WIP berubah langsung menjadi waktu tunggu.**'
          ) }
        ]
      },
      {
        id: 'data',
        title: T('ステップ2：待ちがどこにあるか', 'Step 2: where the waiting is', 'Langkah 2: di mana waktu tunggunya'),
        blocks: [
          { type: 'h', text: T('正味の加工時間', 'The net processing time', 'Waktu pemrosesan bersih') },
          { type: 'table',
            head: [T('工程', 'Process', 'Proses'), T('正味加工時間', 'Net processing time', 'Waktu pemrosesan bersih'), T('備考', 'Note', 'Catatan')],
            rows: [
              [T('切断', 'Cutting', 'Pemotongan'), T('3.2分', '3.2 min', '3,2 mnt'), ''],
              [T('曲げ', 'Bending', 'Penekukan'), T('4.1分', '4.1 min', '4,1 mnt'), ''],
              [T('溶接', 'Welding', 'Pengelasan'), T('6.5分', '6.5 min', '6,5 mnt'), ''],
              [T('塗装', 'Painting', 'Pengecatan'), T('2.8分', '2.8 min', '2,8 mnt'), ''],
              [T('乾燥', 'Drying', 'Pengeringan'), T('40.0分', '40.0 min', '40,0 mnt'), T('炉の中にいる時間。短縮の対象ではない', 'Time inside the oven. Not a target for shortening', 'Waktu di dalam oven. Bukan sasaran pemendekan')],
              [T('組立検査', 'Assembly + inspection', 'Perakitan + inspeksi'), T('9.3分', '9.3 min', '9,3 mnt'), ''],
              [T('合計', 'Total', 'Total'), T('65.9分', '65.9 min', '65,9 mnt'), T('リードタイム9.5日（3,990分）の1.7%', '1.7% of the 9.5-day (3,990 min) lead time', '1,7% dari lead time 9,5 hari (3.990 mnt)')]
            ]
          },
          { type: 'h', text: T('仕掛の実測', 'The measured WIP', 'WIP terukur') },
          { type: 'table',
            head: [T('置かれている場所', 'Where it sits', 'Tempatnya'), T('仕掛', 'WIP', 'WIP'), T('日数に直すと', 'In days', 'Dalam hari'), T('なぜそこに溜まるか', 'Why it piles up there', 'Mengapa menumpuk di sana')],
            rows: [
              [T('切断 → 曲げ', 'Cutting → bending', 'Pemotongan → penekukan'), T('320個', '320 pcs', '320 pcs'), T('1.8日', '1.8 days', '1,8 hari'), T('材料の到着に合わせてまとめて切る', 'Cut in bulk when the material arrives', 'Dipotong sekaligus saat material tiba')],
              [T('曲げ → 溶接', 'Bending → welding', 'Penekukan → pengelasan'), T('180個', '180 pcs', '180 pcs'), T('1.0日', '1.0 day', '1,0 hari'), T('溶接の作業者が1名で、朝からまとめて着手', 'One welder, who starts the batch in the morning', 'Satu tukang las, yang memulai batch di pagi hari')],
              [T('溶接 → 塗装', 'Welding → painting', 'Pengelasan → pengecatan'), T('640個', '640 pcs', '640 pcs'), T('3.6日', '3.6 days', '3,6 hari'), T('塗装が600個ロットでまとめ流し', 'Painting runs in lots of 600', 'Pengecatan berjalan dalam lot 600')],
              [T('塗装 → 乾燥', 'Painting → drying', 'Pengecatan → pengeringan'), T('480個', '480 pcs', '480 pcs'), T('2.7日', '2.7 days', '2,7 hari'), T('炉が満杯（480個）になるまで待って点火', 'Waits until the oven is full at 480 before firing', 'Menunggu oven penuh 480 sebelum dinyalakan')],
              [T('乾燥 → 組立検査', 'Drying → assembly', 'Pengeringan → perakitan'), T('90個', '90 pcs', '90 pcs'), T('0.5日', '0.5 days', '0,5 hari'), T('通常の流れ', 'Normal flow', 'Aliran normal')],
              [T('合計', 'Total', 'Total'), T('1,710個', '1,710 pcs', '1.710 pcs'), T('9.5日', '9.5 days', '9,5 hari'), T('日産180個で割った値', 'Divided by the 180 a day', 'Dibagi 180 per hari')]
            ],
            caption: T('リードタイム9.5日は、この6か所の待ちの合計にほかならない', 'The 9.5-day lead time is nothing but the sum of the waiting at these six places', 'Lead time 9,5 hari tidak lain adalah jumlah waktu tunggu di enam tempat ini')
          },
          { type: 'formula',
            expr: { ja: 'リードタイム ＝ 仕掛 ÷ 1日の産出', en: 'Lead time = WIP ÷ daily output', id: 'Lead time = WIP ÷ output harian' },
            where: [
              { sym: T('仕掛', 'WIP', 'WIP'), text: T('工程間に置かれている品物の数（1,710個）', 'The number of pieces sitting between processes (1,710)', 'Jumlah barang yang menunggu di antara proses (1.710)') },
              { sym: T('1日の産出', 'Daily output', 'Output harian'), text: T('ラインが1日に出す数（180個）', 'What the line puts out in a day (180)', 'Yang dikeluarkan lini dalam sehari (180)') }
            ]
          },
          { type: 'callout', kind: 'key', title: T('この式が事例の背骨', 'This formula is the spine of the case', 'Rumus ini adalah tulang punggung kasus'), text: T(
            '1,710 ÷ 180 ＝ 9.5日。**産出を変えずにリードタイムを半分にしたければ、仕掛を半分にするしかありません。** 逆に言えば、仕掛を減らさずに納期だけ守れという指示は、算数として実行不能です。',
            '1,710 ÷ 180 = 9.5 days. **If output stays put, the only way to halve the lead time is to halve the WIP.** Read the other way: telling people to hit the date without touching the WIP is arithmetically impossible.',
            '1.710 ÷ 180 = 9,5 hari. **Bila output tetap, satu-satunya cara memangkas lead time separuh adalah memangkas WIP separuh.** Dibaca sebaliknya: menyuruh orang menepati tanggal pengiriman tanpa menyentuh WIP adalah hal yang mustahil secara aritmetika.'
          ) },
          { type: 'h', text: T('では、なぜ600個ロットなのか', 'So why a lot of 600?', 'Jadi mengapa lot 600?') },
          { type: 'p', text: T(
            '最大の待ち（3.6日）は塗装前です。塗装が600個でまとめるのは、**色替えの段取りに45分かかる**からでした。段取りを実測して分けると、45分のうち33分は塗料と治具の準備で、これは機械を止めずにできる作業（外段取り）でした。',
            'The biggest wait, 3.6 days, is in front of painting. Painting batches 600 because **a colour change takes 45 minutes**. Measuring the changeover and splitting it showed that 33 of those 45 minutes are preparing paint and jigs — work that can be done while the machine still runs (external setup).',
            'Waktu tunggu terbesar, 3,6 hari, ada sebelum pengecatan. Pengecatan membuat batch 600 karena **penggantian warna memakan 45 menit**. Mengukur pergantian dan memisahkannya menunjukkan 33 dari 45 menit itu adalah menyiapkan cat dan jig — pekerjaan yang bisa dilakukan saat mesin masih jalan (setup eksternal).'
          ) },
          { type: 'chain', items: [
            { title: T('段取り45分', 'Changeover 45 min', 'Pergantian 45 mnt'), text: T('止めないと割に合わない', 'Too costly to do often', 'Terlalu mahal untuk sering dilakukan') },
            { title: T('ロット600個', 'Lot of 600', 'Lot 600'), text: T('段取り回数を減らすため', 'To cut the number of changeovers', 'Untuk mengurangi jumlah pergantian') },
            { title: T('仕掛640個', 'WIP 640', 'WIP 640'), text: T('ロットが揃うまで溜める', 'Piles up until the lot is complete', 'Menumpuk sampai lot lengkap') },
            { title: T('待ち3.6日', 'Wait 3.6 days', 'Tunggu 3,6 hari'), text: T('リードタイムの38%', '38% of the lead time', '38% dari lead time') }
          ] },
          { type: 'callout', kind: 'zeva', title: T('原因は「塗装が遅い」ではない', 'The cause is not "painting is slow"', 'Penyebabnya bukan "pengecatan lambat"'), text: T(
            '塗装の正味は2.8分で、6工程のうちいちばん短い工程です。遅いのは工程ではなく、**段取り時間が決めたロットの大きさ**でした。結果（待ち3.6日）ではなく条件（段取り45分）を見ています。',
            'Painting takes 2.8 minutes net — the shortest of the six. What is slow is not the process but **the lot size that the changeover time dictates**. We are looking at the condition (45-minute changeover), not the result (3.6 days of waiting).',
            'Pengecatan memakan 2,8 menit bersih — yang terpendek dari enam. Yang lambat bukan prosesnya melainkan **ukuran lot yang ditentukan waktu pergantian**. Kita melihat kondisinya (pergantian 45 menit), bukan hasilnya (tunggu 3,6 hari).'
          ) }
        ]
      },
      {
        id: 'boxes',
        title: T('ステップ3：4つの箱', 'Step 3: the four boxes', 'Langkah 3: empat kotak'),
        blocks: [
          { type: 'diagram', name: 'four-boxes',
            props: {
              label: T('事例：工程間の流れの4つの箱', 'Case: the four boxes for the flow across processes', 'Kasus: empat kotak untuk aliran antar proses'),
              b1: T('リードタイム9.5日／仕掛1,710個\n正味比率1.7%／納期遵守78%', 'Lead time 9.5 days / WIP 1,710\nnet ratio 1.7% / on-time 78%', 'Lead time 9,5 hari / WIP 1.710\nrasio bersih 1,7% / tepat waktu 78%'),
              b2: T('塗装は色替え段取り45分のため600個ロット。\n乾燥は炉が満杯になるまで待つ。置き数に上限なし', 'Painting runs lots of 600 because a colour change\ncosts 45 min. Drying waits for a full oven. No WIP ceiling', 'Pengecatan lot 600 karena ganti warna 45 mnt.\nPengeringan menunggu oven penuh. Tanpa batas WIP'),
              b3: T('外段取り化して段取りを12分に。\n塗装ロット150個。工程間の置き数に上限', 'Move the prep outside so the changeover is 12 min.\nPaint in lots of 150. Put a ceiling on WIP', 'Pindahkan persiapannya ke luar sehingga pergantian 12 mnt.\nCat dalam lot 150. Beri batas atas WIP'),
              b4: T('リードタイム3.4日／仕掛620個\n正味比率4.6%／納期遵守98%', 'Lead time 3.4 days / WIP 620\nnet ratio 4.6% / on-time 98%', 'Lead time 3,4 hari / WIP 620\nrasio bersih 4,6% / tepat waktu 98%'),
              loop: T('リードタイム ＝ 仕掛 ÷ 1日の産出。産出を変えずに縮めるには、仕掛を減らすしかない', 'Lead time = WIP ÷ daily output. With output fixed, cutting WIP is the only way to shorten it', 'Lead time = WIP ÷ output harian. Dengan output tetap, memangkas WIP adalah satu-satunya jalan')
            },
            caption: T('どの工程も速くしていない。②の「間」を変えただけ', 'No process was made faster; only the space between them changed', 'Tidak ada proses yang dipercepat; hanya ruang di antara mereka yang berubah') },
          { type: 'table',
            head: [T('箱', 'Box', 'Kotak'), T('中身', 'Content', 'Isi'), T('根拠', 'Evidence', 'Dasar')],
            rows: [
              [T('① 現状の値', '① Current value', '① Nilai saat ini'), T('[[lead-time|LT]] 9.5日／仕掛1,710個／正味比率1.7%／納期遵守78%', '[[lead-time|LT]] 9.5 days / WIP 1,710 / net ratio 1.7% / on-time 78%', '[[lead-time|LT]] 9,5 hari / WIP 1.710 / rasio bersih 1,7% / tepat waktu 78%'), T('2週間の通過記録と仕掛の実数', 'Two weeks of time stamps and an actual WIP count', 'Dua minggu cap waktu dan hitungan WIP nyata')],
              [T('② 現状のやり方', '② Current way', '② Cara saat ini'), T('塗装は色替え段取り45分のため600個ロット。乾燥は炉が満杯480個になるまで待つ。工程間の置き数に上限がない', 'Painting runs lots of 600 because a colour change costs 45 min. Drying waits for a full 480-piece oven. No ceiling on what may sit between processes', 'Pengecatan lot 600 karena ganti warna 45 mnt. Pengeringan menunggu oven penuh 480. Tidak ada batas atas WIP antar proses'), T('段取りの実測（外段取り33分／内段取り12分）と炉の運用記録', 'The measured changeover (33 min external / 12 min internal) and the oven log', 'Pergantian terukur (33 mnt eksternal / 12 mnt internal) dan log oven')],
              [T('③ 新たなやり方', '③ New way', '③ Cara baru'), T('塗料と治具の準備を外段取り化し段取り12分に。塗装ロット150個。炉に仕切りを入れ160個で回す。工程間の置き数に上限を設ける', 'Move paint and jig prep outside, changeover 12 min. Paint in lots of 150. Partition the oven and run 160 a batch. Put a ceiling on WIP between processes', 'Pindahkan persiapan cat dan jig ke luar, pergantian 12 mnt. Cat dalam lot 150. Sekat oven dan jalankan 160 per batch. Beri batas atas WIP antar proses'), T('[[ecrs|ECRS]]と段取りの内外分離', '[[ecrs|ECRS]] and separating internal from external setup', '[[ecrs|ECRS]] dan pemisahan setup internal-eksternal')],
              [T('④ 目標の値', '④ Target value', '④ Nilai target'), T('[[lead-time|LT]] 3.4日／仕掛620個／正味比率4.6%／納期遵守98%', '[[lead-time|LT]] 3.4 days / WIP 620 / net ratio 4.6% / on-time 98%', '[[lead-time|LT]] 3,4 hari / WIP 620 / rasio bersih 4,6% / tepat waktu 98%'), T('置き数の上限を積み上げて620個、620 ÷ 180 ＝ 3.4日。正味比率 ＝ 65.9分 ÷ 1,428分。遅れた22%のうち19%分は塗装待ち3.6日で説明できたため、そこが0.9日になれば遅れはほぼ残らない', 'Stack the WIP ceilings to 620, then 620 ÷ 180 = 3.4 days. Net ratio = 65.9 min ÷ 1,428 min. Of the 22% that ran late, 19 points were explained by the 3.6-day wait before painting; cut that to 0.9 days and little lateness is left', 'Jumlahkan batas WIP menjadi 620, lalu 620 ÷ 180 = 3,4 hari. Rasio bersih = 65,9 mnt ÷ 1.428 mnt. Dari 22% yang terlambat, 19 poin dijelaskan oleh tunggu 3,6 hari sebelum pengecatan; pangkas menjadi 0,9 hari dan keterlambatan hampir habis')]
            ]
          },
          { type: 'h', text: T('④の内訳（置き数の上限）', 'The make-up of ④: the WIP ceilings', 'Susunan ④: batas atas WIP') },
          { type: 'table',
            head: [T('場所', 'Place', 'Tempat'), T('現状', 'Now', 'Sekarang'), T('上限', 'Ceiling', 'Batas'), T('その数にできる理由', 'Why that number is possible', 'Mengapa angka itu mungkin')],
            rows: [
              [T('切断 → 曲げ', 'Cutting → bending', 'Pemotongan → penekukan'), '320', '120', T('材料の到着に合わせず、日次で切る', 'Cut daily instead of following material arrivals', 'Potong harian alih-alih mengikuti kedatangan material')],
              [T('曲げ → 溶接', 'Bending → welding', 'Penekukan → pengelasan'), '180', '100', T('溶接の着手を午前・午後の2回に分ける', 'Start welding twice a day instead of once', 'Mulai mengelas dua kali sehari alih-alih sekali')],
              [T('溶接 → 塗装', 'Welding → painting', 'Pengelasan → pengecatan'), '640', '180', T('ロット600 → 150。段取り12分なら1日1.2回で回る', 'Lots of 600 → 150. At a 12-minute changeover, 1.2 a day is enough', 'Lot 600 → 150. Dengan pergantian 12 menit, 1,2 kali sehari cukup')],
              [T('塗装 → 乾燥', 'Painting → drying', 'Pengecatan → pengeringan'), '480', '160', T('炉を仕切って160個で点火。乾燥40分は変えない', 'Partition the oven and fire at 160. The 40-minute dry is unchanged', 'Sekat oven dan nyalakan pada 160. Pengeringan 40 menit tidak berubah')],
              [T('乾燥 → 組立検査', 'Drying → assembly', 'Pengeringan → perakitan'), '90', '60', T('上流が細かく流れるので溜まらない', 'Nothing accumulates once upstream flows in small batches', 'Tidak ada yang menumpuk begitu hulu mengalir dalam lot kecil')],
              [T('合計', 'Total', 'Total'), T('1,710', '1,710', '1.710'), T('620', '620', '620'), T('620 ÷ 180 ＝ 3.4日', '620 ÷ 180 = 3.4 days', '620 ÷ 180 = 3,4 hari')]
            ]
          },
          { type: 'callout', kind: 'key', title: T('段取り12分の根拠', 'Where the 12-minute changeover comes from', 'Dari mana pergantian 12 menit berasal'), text: T(
            '45分を内外に分けると、内段取り（機械を止めないとできない作業）は12分だけでした。残る33分は次の色の塗料と治具を先に用意する作業で、前のロットを流している間にできます。**段取りを速くしたのではなく、止めなくてよい作業を止めている時間から外した**だけです。',
            'Splitting the 45 minutes showed that only 12 are internal — work that truly needs the machine stopped. The other 33 are preparing the next colour and its jigs, which can be done while the previous lot still runs. **Nothing was made faster; work that never needed the stop was simply moved out of it.**',
            'Memisahkan 45 menit itu menunjukkan hanya 12 yang internal — pekerjaan yang benar-benar butuh mesin berhenti. Sisanya 33 adalah menyiapkan warna berikut dan jig-nya, yang bisa dilakukan saat lot sebelumnya masih jalan. **Tidak ada yang dipercepat; pekerjaan yang sebenarnya tidak memerlukan mesin berhenti dipindahkan ke luar waktu henti.**'
          ) },
          { type: 'widget', name: 'four-boxes', props: {} }
        ]
      },
      {
        id: 'plan',
        title: T('ステップ4：改善計画', 'Step 4: the improvement plan', 'Langkah 4: rencana perbaikan'),
        blocks: [
          { type: 'p', text: T(
            '上限を一度に全部下げると、どこかで品切れが起きたときに原因が特定できません。**上流から順に、1か所ずつ下げて2週間見る**ことにしました。',
            'Dropping every ceiling at once means that when something starves, you cannot say which change did it. The plan was to **lower one place at a time, from upstream down, and watch for two weeks**.',
            'Menurunkan semua batas sekaligus berarti ketika ada proses yang kehabisan barang, Anda tidak bisa menyebut perubahan mana penyebabnya. Rencananya: **turunkan satu tempat sekaligus, dari hulu ke hilir, dan amati dua minggu**.'
          ) },
          { type: 'table',
            head: [T('週', 'Week', 'Minggu'), T('やること', 'What is done', 'Yang dikerjakan'), T('見る数字', 'What is watched', 'Yang diamati')],
            rows: [
              [T('第1〜2週', 'Weeks 1–2', 'Minggu 1–2'), T('段取りの内外分離。塗料と治具の準備を前倒しする', 'Split the setup. Prepare paint and jigs ahead of the stop', 'Pisahkan setup. Siapkan cat dan jig sebelum henti'), T('段取りによる停止時間（45分 → 12分）', 'Stop time caused by the changeover (45 → 12 min)', 'Waktu henti akibat pergantian (45 → 12 mnt)')],
              [T('第3〜4週', 'Weeks 3–4', 'Minggu 3–4'), T('塗装ロットを600 → 300 → 150へ2段階で下げる', 'Take the paint lot from 600 to 300, then to 150', 'Turunkan lot cat dari 600 ke 300, lalu ke 150'), T('溶接→塗装の仕掛と、塗装の稼働率', 'WIP before painting, and the painting availability', 'WIP sebelum pengecatan, dan availability pengecatan')],
              [T('第5週', 'Week 5', 'Minggu 5'), T('炉に仕切りを入れ、160個で点火する', 'Partition the oven and fire at 160', 'Sekat oven dan nyalakan pada 160'), T('乾燥待ちの仕掛と、炉の1日の回数', 'WIP waiting to dry, and batches per day', 'WIP menunggu pengeringan, dan batch per hari')],
              [T('第6〜7週', 'Weeks 6–7', 'Minggu 6–7'), T('上流3か所の置き数上限を下げる', 'Lower the ceilings at the three upstream places', 'Turunkan batas di tiga tempat hulu'), T('各工程の手待ち時間（品切れが出ないか）', 'Idle time per process — does anything starve?', 'Waktu menganggur per proses — adakah proses yang kehabisan barang?')],
              [T('第8週', 'Week 8', 'Minggu 8'), T('上限を標準として書き、区画に表示する', 'Write the ceilings into the standard and post them at each area', 'Tulis batas ke standar dan pasang di tiap area'), T('[[lead-time|LT]]と納期遵守率', '[[lead-time|Lead time]] and on-time delivery', '[[lead-time|Lead time]] dan ketepatan pengiriman')]
            ]
          },
          { type: 'callout', kind: 'warn', title: T('上限を下げると必ず問題が見える', 'Lowering a ceiling always exposes a problem', 'Menurunkan batas selalu memunculkan masalah'), text: T(
            '仕掛は、工程の不調を隠す在庫でもあります。上限を下げると、隠れていた停止や不良が下流の手待ちとして表面に出ます。これは失敗ではなく**目的**です。出てきた問題を潰してから次の上限を下げます。',
            'WIP is also the stock that hides a process in trouble. Lower the ceiling and the stoppages and defects that were hidden surface as idle time downstream. That is not a failure — it is **the point**. Fix what surfaces, then lower the next ceiling.',
            'WIP juga adalah stok yang menyembunyikan proses bermasalah. Turunkan batasnya dan henti serta cacat yang tersembunyi muncul sebagai waktu menganggur di hilir. Itu bukan kegagalan — itu **tujuannya**. Perbaiki yang muncul, lalu turunkan batas berikutnya.'
          ) }
        ]
      },
      {
        id: 'result',
        title: T('ステップ5：結果と、残った課題', 'Step 5: the result, and what is left', 'Langkah 5: hasil, dan yang tersisa'),
        blocks: [
          { type: 'table',
            head: [T('指標', 'Metric', 'Metrik'), T('改善前', 'Before', 'Sebelum'), T('改善後', 'After', 'Sesudah'), T('効いた条件（X）', 'The condition (X) that moved it', 'Kondisi (X) yang menggerakkan')],
            rows: [
              [T('[[lead-time|リードタイム]]', '[[lead-time|Lead time]]', '[[lead-time|Lead time]]'), T('9.5日', '9.5 days', '9,5 hari'), T('3.4日', '3.4 days', '3,4 hari'), T('仕掛1,710 → 620個', 'WIP 1,710 → 620', 'WIP 1.710 → 620')],
              [T('仕掛', 'WIP', 'WIP'), T('1,710個', '1,710 pcs', '1.710 pcs'), T('620個', '620 pcs', '620 pcs'), T('置き数の上限と先入れ先出し', 'WIP ceilings and FIFO', 'Batas WIP dan FIFO')],
              [T('正味比率', 'Net ratio', 'Rasio bersih'), T('1.7%', '1.7%', '1,7%'), T('4.6%', '4.6%', '4,6%'), T('分母（待ち）が縮んだ。分子は65.9分のまま', 'The denominator shrank; the numerator stays at 65.9 min', 'Penyebut menyusut; pembilang tetap 65,9 mnt')],
              [T('納期遵守率', 'On-time delivery', 'Ketepatan pengiriman'), '78%', '98%', T('LTが短いほど、狂いを吸収できる', 'A shorter LT absorbs disruption', 'LT lebih pendek menyerap gangguan')],
              [T('塗装の段取り', 'Painting changeover', 'Pergantian pengecatan'), T('45分／回', '45 min each', '45 mnt tiap kali'), T('12分／回', '12 min each', '12 mnt tiap kali'), T('外段取り33分を止めない時間へ移した', '33 min of external setup moved out of the stop', '33 mnt setup eksternal dipindah keluar dari henti')],
              [T('日産', 'Daily output', 'Output harian'), T('180個', '180 pcs', '180 pcs'), T('180個', '180 pcs', '180 pcs'), T('変えていない', 'Unchanged', 'Tidak diubah')]
            ],
            caption: T('日産は1個も増えていない。それでも納期遵守率は78%から98%へ動いた', 'Not one more unit a day — and on-time delivery still went from 78% to 98%', 'Tidak ada tambahan satu unit pun per hari — dan ketepatan pengiriman tetap naik dari 78% ke 98%')
          },
          { type: 'callout', kind: 'zeva', title: T('工程単体の改善と、流れの改善は別物', 'Improving a process and improving the flow are different jobs', 'Memperbaiki proses dan memperbaiki aliran adalah dua pekerjaan berbeda'), text: T(
            'この事例では、どの工程のサイクルタイムも1秒も短くなっていません。[[oee|OEE]]も[[v-score|V.Score]]も工程の中を見る指標なので、**この改善はそれらの指標には現れません**。流れを見るにはリードタイムと仕掛を測ります。逆に、工程内のバラツキを減らす改善は、仕掛を測っても見えません。**どちらの目で見ているかを先に決めます。**',
            'Not one process got a second faster here. [[oee|OEE]] and [[v-score|V.Score]] look inside a process, so **this improvement does not show up in either**. To see flow, measure lead time and WIP. Conversely, cutting variation inside a process will not show up in a WIP count. **Decide which lens you are looking through before you measure.**',
            'Tidak ada proses yang menjadi lebih cepat satu detik pun di sini. [[oee|OEE]] dan [[v-score|V.Score]] melihat ke dalam proses, jadi **perbaikan ini tidak muncul di keduanya**. Untuk melihat aliran, ukur lead time dan WIP. Sebaliknya, memangkas variasi di dalam proses tidak akan tampak pada hitungan WIP. **Tentukan dulu dari sudut pandang mana Anda mengukur.**'
          ) },
          { type: 'p', text: T(
            '残った課題は乾燥の40分です。正味65.9分のうち61%を占めますが、これは製品が必要とする時間で、削るには塗料か炉の仕様を変える技術的な検討が要ります。**[[management-loss|管理ロス]]を先に断ち、[[technical-loss|技術ロス]]を後に回す**のが順序です。',
            'What is left is the 40-minute dry — 61% of the 65.9 minutes of net time. That time is what the product needs; shortening it requires a technical study of the paint or the oven. The order is to **cut the [[management-loss|management loss]] first and leave the [[technical-loss|technical loss]] for later**.',
            'Yang tersisa adalah pengeringan 40 menit — 61% dari 65,9 menit waktu bersih. Waktu itu memang dibutuhkan produk; memendekkannya menuntut kajian teknis atas cat atau oven. Urutannya: **pangkas [[management-loss|kerugian manajemen]] lebih dulu dan tinggalkan [[technical-loss|kerugian teknis]] untuk nanti**.'
          ) }
        ]
      }
    ],
    keyPoints: [
      T('リードタイム ＝ 仕掛 ÷ 1日の産出。産出が同じなら、仕掛を減らす以外に短くする道はない', 'Lead time = WIP ÷ daily output. With output fixed, cutting WIP is the only way to shorten it', 'Lead time = WIP ÷ output harian. Dengan output tetap, memangkas WIP adalah satu-satunya jalan memendekkannya'),
      T('ロットの大きさは段取り時間が決めている。ロットを責める前に段取りを内外に分ける', 'The changeover time sets the lot size; split the setup before blaming the lot', 'Waktu pergantian menentukan ukuran lot; pisahkan setup sebelum menyalahkan lot'),
      T('先入れ先出しは改善ではなく、流れを測るための前提', 'FIFO is not an improvement but the precondition for measuring flow', 'FIFO bukan perbaikan melainkan prasyarat untuk mengukur aliran'),
      T('置き数の上限を下げると隠れていた問題が出る。それが目的', 'Lowering the WIP ceiling exposes hidden problems — that is the purpose', 'Menurunkan batas WIP memunculkan masalah tersembunyi — itulah tujuannya'),
      T('流れの改善はOEEにもV.Scoreにも現れない。測る目を先に決める', 'Flow improvement shows up in neither OEE nor V.Score; choose the lens before you measure', 'Perbaikan aliran tidak tampak di OEE maupun V.Score; tentukan dulu sudut pandang pengukurannya')
    ],
    quiz: [
      { q: T('リードタイム9.5日のうち、製品が実際に加工されていた時間は', 'Of the 9.5-day lead time, how much was the product actually being worked on?', 'Dari lead time 9,5 hari, berapa lama produk benar-benar dikerjakan?'),
        choices: [
          T('約65.9分（1.7%）', 'About 65.9 minutes (1.7%)', 'Sekitar 65,9 menit (1,7%)'),
          T('約4時間（5%）', 'About 4 hours (5%)', 'Sekitar 4 jam (5%)'),
          T('約2日（21%）', 'About 2 days (21%)', 'Sekitar 2 hari (21%)'),
          T('約5日（53%）', 'About 5 days (53%)', 'Sekitar 5 hari (53%)')
        ], answer: 0,
        explain: T('6工程の正味合計65.9分に対し、リードタイムは3,990分。残りはすべて工程間の待ちです。', 'The six processes take 65.9 minutes net against a 3,990-minute lead time. All the rest is waiting between processes.', 'Enam proses memakan 65,9 menit bersih terhadap lead time 3.990 menit. Sisanya semuanya menunggu di antara proses.') },
      { q: T('日産180個のまま、リードタイムを3.4日にするには仕掛をいくつにするか', 'With daily output fixed at 180, what WIP gives a 3.4-day lead time?', 'Dengan output harian tetap 180, berapa WIP yang memberi lead time 3,4 hari?'),
        choices: [
          T('約180個', 'About 180', 'Sekitar 180'),
          T('約620個', 'About 620', 'Sekitar 620'),
          T('約1,200個', 'About 1,200', 'Sekitar 1.200'),
          T('仕掛とは関係がない', 'It has nothing to do with WIP', 'Tidak ada hubungannya dengan WIP')
        ], answer: 1,
        explain: T('リードタイム ＝ 仕掛 ÷ 1日の産出 なので、3.4 × 180 ＝ 約620個です。', 'Lead time = WIP ÷ daily output, so 3.4 × 180 = about 620.', 'Lead time = WIP ÷ output harian, jadi 3,4 × 180 = sekitar 620.') },
      { q: T('塗装前に640個も溜まっていた本当の原因は', 'What really caused 640 pieces to pile up before painting?', 'Apa yang sebenarnya menyebabkan 640 unit menumpuk sebelum pengecatan?'),
        choices: [
          T('塗装工程の加工が遅いから', 'Painting is slow to process', 'Pengecatan lambat memproses'),
          T('塗装の作業者が足りないから', 'Painting is short of operators', 'Pengecatan kekurangan operator'),
          T('色替え段取り45分がロット600個を決めていたから', 'A 45-minute colour change dictated a lot of 600', 'Ganti warna 45 menit menentukan lot 600'),
          T('材料の入荷が遅いから', 'Material arrives late', 'Material datang terlambat')
        ], answer: 2,
        explain: T('塗装の正味は2.8分で6工程中いちばん短い。遅いのは工程ではなく、段取りが決めたロットの大きさです。', 'Painting takes 2.8 minutes net, the shortest of the six. What is slow is the lot size the changeover dictates, not the process.', 'Pengecatan memakan 2,8 menit bersih, yang terpendek dari enam. Yang lambat adalah ukuran lot yang ditentukan pergantian, bukan prosesnya.') },
      { q: T('段取りが45分から12分になったのはなぜか', 'Why did the changeover go from 45 minutes to 12?', 'Mengapa pergantian turun dari 45 menit ke 12?'),
        choices: [
          T('作業者が急いだから', 'The operators hurried', 'Operator bergegas'),
          T('新しい設備を入れたから', 'New equipment was installed', 'Peralatan baru dipasang'),
          T('塗料と治具の準備33分を、機械を止めない時間へ移したから', '33 minutes of paint and jig prep were moved out of the stop', '33 menit persiapan cat dan jig dipindah keluar dari henti'),
          T('色替えの回数を減らしたから', 'The number of colour changes was reduced', 'Jumlah penggantian warna dikurangi')
        ], answer: 2,
        explain: T('内段取り（機械を止めないとできない作業）はもともと12分でした。速くしたのではなく、外に出しただけです。', 'The internal setup — work that truly needs the machine stopped — was 12 minutes all along. Nothing got faster; work simply moved out.', 'Setup internal — pekerjaan yang benar-benar butuh mesin berhenti — memang 12 menit sejak awal. Tidak ada yang dipercepat; pekerjaan hanya dipindahkan keluar.') },
      { q: T('置き数の上限を下げたら下流で手待ちが出た。どうするか', 'Lowering a WIP ceiling caused idle time downstream. What now?', 'Menurunkan batas WIP menyebabkan waktu menganggur di hilir. Lalu apa?'),
        choices: [
          T('上限を元に戻す', 'Put the ceiling back', 'Kembalikan batasnya'),
          T('表面に出た停止や不良を潰してから、次の上限を下げる', 'Fix the stoppage or defect that surfaced, then lower the next ceiling', 'Perbaiki henti atau cacat yang muncul, lalu turunkan batas berikutnya'),
          T('下流に人を増やす', 'Add people downstream', 'Tambah orang di hilir'),
          T('手待ちは正常なので放置する', 'Idle time is normal, so leave it', 'Waktu menganggur itu normal, jadi biarkan')
        ], answer: 1,
        explain: T('仕掛は工程の不調を隠す在庫です。上限を下げて問題を見えるようにするのが目的で、手待ちはその合図です。', 'WIP is the stock that hides a troubled process. Exposing the problem is the purpose, and the idle time is the signal.', 'WIP adalah stok yang menyembunyikan proses bermasalah. Memunculkan masalah itulah tujuannya, dan waktu menganggur adalah sinyalnya.') }
    ]
  });
})();
