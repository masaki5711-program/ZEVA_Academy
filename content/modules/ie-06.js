(function () {
  const T = (ja, en, id) => ({ ja, en, id });

  ZA.addModule({
    id: 'ie-06',
    track: 'ie',
    order: 6,
    minutes: 30,
    icon: '⚖️',
    level: 2,
    prereq: ['ie-02', 'ie-03'],
    title: T('ラインバランス', 'Line Balancing', 'Keseimbangan Lini (Line Balancing)'),
    summary: T(
      '工程ごとの作業時間の偏りを「見える化」し、ネック工程・編成効率・必要人員を計算して、ムダの少ない流れを設計する方法を学びます。',
      'Visualise how work time is spread across processes, calculate the neck process, line balance efficiency and required workers, and design a smoother flow.',
      'Memvisualisasikan sebaran waktu kerja antar proses, menghitung proses leher botol (bottleneck), efisiensi keseimbangan lini dan jumlah pekerja yang dibutuhkan, lalu merancang aliran yang lebih lancar.'
    ),
    objectives: [
      T('ラインバランスとネック工程の意味を説明できる', 'Explain what line balance and the neck process are', 'Menjelaskan arti keseimbangan lini dan proses leher botol'),
      T('編成効率・編成ロス・必要人員を計算できる', 'Calculate line balance efficiency, line balance loss and required workers', 'Menghitung efisiensi keseimbangan lini, kerugian keseimbangan lini, dan jumlah pekerja yang dibutuhkan'),
      T('山積み表を読み、作業の再配分（山崩し）の手順を説明できる', 'Read a yamazumi chart and explain how to rebalance work', 'Membaca grafik yamazumi dan menjelaskan langkah menyeimbangkan ulang pekerjaan'),
      T('ラインバランスとバラツキの関係をZEVAの視点で説明できる', 'Explain the link between line balance and variation from a ZEVA viewpoint', 'Menjelaskan hubungan keseimbangan lini dan variasi dari sudut pandang ZEVA'),
    ],
    sections: [
      {
        id: 'what',
        title: T('ラインバランスとは', 'What is line balance?', 'Apa itu keseimbangan lini?'),
        blocks: [
          { type: 'p', text: T(
            '流れ作業のラインでは、製品が工程1→工程2→工程3…と順番に流れます。各工程の作業時間（CT）がそろっていれば、製品は止まらずにスムーズに流れます。これを「[[line-balance]]がとれている」状態といいます。',
            'On a flow line, a product moves from process 1 → process 2 → process 3 and so on. If the work time (CT) of every process is about the same, products flow without stopping. We call this a well-balanced line — good [[line-balance]].',
            'Pada lini aliran, produk bergerak dari proses 1 → proses 2 → proses 3 dan seterusnya. Jika waktu kerja (CT) setiap proses hampir sama, produk mengalir tanpa berhenti. Kondisi ini disebut [[line-balance]] yang baik.'
          ) },
          { type: 'p', text: T(
            '逆に、ある工程だけ時間が長いと、その前には仕掛品がたまり、後ろの工程は「手待ち」になります。ラインの出来高は、**一番遅い工程**で決まってしまいます。この一番遅い工程を[[neck-process]]（ボトルネック工程）と呼びます。',
            'If one process takes much longer, work-in-process piles up in front of it and the following processes wait. The output of the whole line is decided by the **slowest process**. This slowest process is the [[neck-process]] (bottleneck).',
            'Sebaliknya, jika satu proses jauh lebih lama, barang setengah jadi menumpuk di depannya dan proses berikutnya menunggu. Output seluruh lini ditentukan oleh **proses yang paling lambat**. Proses ini disebut [[neck-process]] (bottleneck).'
          ) },
          { type: 'cards', cols: 3, items: [
            { icon: '🐢', tone: 'red', title: T('ネック工程', 'Neck process', 'Proses leher botol'), text: T('最もCTが長い工程。ライン全体の速さを決める。', 'The process with the longest CT. It sets the speed of the whole line.', 'Proses dengan CT terpanjang. Menentukan kecepatan seluruh lini.') },
            { icon: '⏳', tone: 'amber', title: T('手待ち', 'Waiting', 'Menunggu'), text: T('ネック以外の工程で、前後を待つ時間。付加価値を生まない。', 'Time other processes spend waiting. It adds no value.', 'Waktu proses lain menunggu. Tidak menambah nilai.') },
            { icon: '📦', tone: 'gray', title: T('仕掛品のたまり', 'WIP pile-up', 'Penumpukan WIP'), text: T('ネックの手前に在庫がたまり、場所・運搬・品質リスクが増える。', 'Stock builds up before the neck, increasing space, handling and quality risk.', 'Stok menumpuk sebelum proses leher botol, menambah kebutuhan ruang, penanganan, dan risiko kualitas.') },
          ] },
          { type: 'callout', kind: 'note', title: T('たとえ話', 'Analogy', 'Analogi'), text: T(
            '5人でバケツリレーをするとき、1人だけ遅い人がいると、全員がその人のペースに合わせることになります。ほかの4人がどれだけ速くても、水が届く速さは変わりません。',
            'In a bucket relay of five people, if one person is slow, everyone ends up at that person’s pace. No matter how fast the other four are, the water arrives no faster.',
            'Dalam estafet ember lima orang, jika satu orang lambat, semua orang mengikuti kecepatan orang itu. Seberapa cepat pun empat orang lainnya, air tidak sampai lebih cepat.'
          ) },
        ],
      },
      {
        id: 'calc',
        title: T('編成効率と必要人員の計算', 'Calculating efficiency and required workers', 'Menghitung efisiensi dan jumlah pekerja'),
        blocks: [
          { type: 'p', text: T(
            'ラインバランスの良さは[[line-balance-efficiency]]（編成効率）で数値化します。全工程のCTを足した「積上げ工数」を、「ネックCT × 工程数」で割ります。',
            'Balance quality is measured by [[line-balance-efficiency]]. Divide the sum of all process CTs by (neck CT × number of processes).',
            'Kualitas keseimbangan diukur dengan [[line-balance-efficiency]]. Jumlah CT semua proses dibagi dengan (CT leher botol × jumlah proses).'
          ) },
          { type: 'formula',
            expr: T('編成効率 (%) = ΣCT ÷ (ネックCT × 工程数) × 100', 'Line balance efficiency (%) = ΣCT ÷ (Neck CT × Number of processes) × 100', 'Efisiensi keseimbangan lini (%) = ΣCT ÷ (CT leher botol × Jumlah proses) × 100'),
            where: [
              { sym: 'ΣCT', text: T('全工程のCTの合計（積上げ工数）', 'Sum of CTs of all processes (total work content)', 'Jumlah CT semua proses (total isi kerja)') },
              { sym: 'CT<sub>neck</sub>', text: T('最も長いCT', 'The longest CT', 'CT terpanjang') },
            ],
            note: T('100%に近いほど、どの工程も同じくらい忙しい＝手待ちが少ない状態です。目安は90%以上（この式＝IEの基本式に対する目安です）。ZEVAは基準をタクトタイムに置き、一律の目標値は置きません（[[line-balance-efficiency]]）。', 'The closer to 100%, the more evenly loaded the processes are (less waiting). A common target is 90% or more — a guide for this basic IE formula. ZEVA measures against the takt time and sets no single target ([[line-balance-efficiency]]).', 'Semakin mendekati 100%, semakin merata beban proses (sedikit menunggu). Target umum 90% atau lebih — panduan untuk rumus dasar IE ini. ZEVA mengukur terhadap takt time dan tidak menetapkan satu target ([[line-balance-efficiency]]).'),
          },
          { type: 'formula',
            expr: T('編成ロス (%) = 100 − 編成効率', 'Line balance loss (%) = 100 − line balance efficiency', 'Kerugian keseimbangan lini (%) = 100 − efisiensi keseimbangan lini'),
          },
          { type: 'formula',
            expr: T('理論必要人員 = ΣCT ÷ TT（小数点以下は切り上げ）', 'Theoretical required workers = ΣCT ÷ TT (round up)', 'Jumlah pekerja teoretis = ΣCT ÷ TT (dibulatkan ke atas)'),
            note: T('1人が1工程を担当するラインを前提とします。TTは顧客が求めるペースです（ie-02）。', 'Assumes one worker per process. TT is the pace the customer requires (ie-02).', 'Diasumsikan satu pekerja per proses. TT adalah kecepatan yang diminta pelanggan (ie-02).'),
          },
          { type: 'example',
            title: T('計算例：5工程のライン（TT = 60秒）', 'Worked example: a 5-process line (TT = 60 s)', 'Contoh: lini 5 proses (TT = 60 detik)'),
            steps: [
              T('各工程のCT：52秒、58秒、45秒、60秒、41秒', 'Process CTs: 52 s, 58 s, 45 s, 60 s, 41 s', 'CT tiap proses: 52 dtk, 58 dtk, 45 dtk, 60 dtk, 41 dtk'),
              T('ΣCT = 52 + 58 + 45 + 60 + 41 = 256秒', 'ΣCT = 52 + 58 + 45 + 60 + 41 = 256 s', 'ΣCT = 52 + 58 + 45 + 60 + 41 = 256 dtk'),
              T('ネックCT = 60秒（工程4）', 'Neck CT = 60 s (process 4)', 'CT leher botol = 60 dtk (proses 4)'),
              T('編成効率 = 256 ÷ (60 × 5) = 256 ÷ 300 = 85.3%', 'Efficiency = 256 ÷ (60 × 5) = 256 ÷ 300 = 85.3%', 'Efisiensi = 256 ÷ (60 × 5) = 256 ÷ 300 = 85,3%'),
              T('編成ロス = 14.7%（手待ちの合計 = 300 − 256 = 44秒/サイクル）', 'Line balance loss = 14.7% (total idle = 300 − 256 = 44 s per cycle)', 'Kerugian keseimbangan lini = 14,7% (total menganggur = 300 − 256 = 44 dtk per siklus)'),
              T('理論必要人員 = 256 ÷ 60 = 4.27 → 5人', 'Required workers = 256 ÷ 60 = 4.27 → 5 people', 'Pekerja dibutuhkan = 256 ÷ 60 = 4,27 → 5 orang'),
            ],
            result: T('あと16秒（256→240秒）作業を減らせれば、240 ÷ 60 = 4.0 で4人ラインが理論上可能になります。', 'If we remove 16 s of work (256 → 240 s), 240 ÷ 60 = 4.0, so a 4-person line becomes theoretically possible.', 'Jika 16 dtk pekerjaan dihilangkan (256 → 240 dtk), 240 ÷ 60 = 4,0, sehingga lini 4 orang secara teoretis memungkinkan.'),
          },
          { type: 'widget', name: 'line-balance', props: { tt: 60, cts: [52, 58, 45, 60, 41] } },
          { type: 'check',
            q: T('4工程のCTが 40・50・45・55秒 のとき、編成効率は？', 'Four processes have CTs of 40, 50, 45 and 55 s. What is the line balance efficiency?', 'Empat proses memiliki CT 40, 50, 45, dan 55 dtk. Berapa efisiensi keseimbangannya?'),
            choices: [T('約75%', 'About 75%', 'Sekitar 75%'), T('約86%', 'About 86%', 'Sekitar 86%'), T('約95%', 'About 95%', 'Sekitar 95%')],
            answer: 1,
            explain: T('ΣCT = 190秒、ネックCT = 55秒。190 ÷ (55 × 4) = 190 ÷ 220 = 86.4%。', 'ΣCT = 190 s, neck CT = 55 s. 190 ÷ (55 × 4) = 190 ÷ 220 = 86.4%.', 'ΣCT = 190 dtk, CT leher botol = 55 dtk. 190 ÷ (55 × 4) = 190 ÷ 220 = 86,4%.'),
          },
        ],
      },
      {
        id: 'yamazumi',
        title: T('山積み表（ヤマヅミ）で見える化する', 'Visualising with a yamazumi chart', 'Visualisasi dengan grafik yamazumi'),
        blocks: [
          { type: 'p', text: T(
            '[[yamazumi]]（山積み表）は、工程ごと（または作業者ごと）に要素作業の時間を縦に積み上げた棒グラフです。横にTTの線を引くと、どの工程がTTを超えているか、どこに余裕があるかが一目でわかります。',
            'A [[yamazumi]] chart stacks the element times of each process (or worker) as vertical bars. Draw a horizontal TT line and you instantly see which processes exceed TT and which have spare capacity.',
            'Grafik [[yamazumi]] menumpuk waktu elemen kerja tiap proses (atau pekerja) sebagai batang vertikal. Tarik garis TT horizontal, maka langsung terlihat proses mana yang melebihi TT dan mana yang masih longgar.'
          ) },
          { type: 'list', items: [
            T('積み上げを「価値作業・準価値作業・無価値作業」で色分けすると、削るべき時間が見えます。', 'Colour the stacks as value / semi-value / non-value work to see what time should be cut.', 'Warnai tumpukan sebagai kerja bernilai / semi-nilai / tidak bernilai untuk melihat waktu yang harus dipangkas.'),
            T('TTを超える棒 → 顧客ペースに間に合わない。作業の移動や改善が必要。', 'Bars above TT → cannot keep customer pace. Move or improve work.', 'Batang di atas TT → tidak bisa mengikuti kecepatan pelanggan. Pindahkan atau perbaiki pekerjaan.'),
            T('TTより大きく低い棒 → 手待ちが発生。作業を集めて工程を減らせる可能性。', 'Bars far below TT → waiting occurs. Work may be merged to reduce processes.', 'Batang jauh di bawah TT → terjadi menunggu. Pekerjaan bisa digabung untuk mengurangi proses.'),
            T('棒の高さに加えて「毎回の時間のブレ」も記録すると、見かけ上のバランスが本物かどうか判断できます。', 'Record not only bar height but also cycle-to-cycle spread, to judge whether the apparent balance is real.', 'Catat bukan hanya tinggi batang tetapi juga sebaran antar siklus, untuk menilai apakah keseimbangan itu nyata.'),
          ] },
          { type: 'callout', kind: 'tip', title: T('作り方のコツ', 'Tips for making one', 'Tips membuat'), text: T(
            '①作業を要素作業に分ける → ②各要素を複数回測定する（ie-03）→ ③工程ごとに積み上げる → ④TT線を引く → ⑤要素作業を付箋にして、動かしながら再配分を検討する。',
            '① Break work into elements → ② measure each element several times (ie-03) → ③ stack by process → ④ draw the TT line → ⑤ put elements on sticky notes and move them to test rebalancing.',
            '① Pecah pekerjaan menjadi elemen → ② ukur tiap elemen beberapa kali (ie-03) → ③ tumpuk per proses → ④ tarik garis TT → ⑤ tulis elemen di kertas tempel dan pindahkan untuk mencoba penyeimbangan ulang.'
          ) },
        ],
      },
      {
        id: 'rebalance',
        title: T('ラインバランスを改善する手順', 'How to improve line balance', 'Langkah memperbaiki keseimbangan lini'),
        blocks: [
          { type: 'flow', dir: 'h', nodes: [
            { tone: 'blue', title: T('1. 測る', '1. Measure', '1. Ukur'), text: T('要素作業ごとにCTを複数回測定', 'Measure element CTs repeatedly', 'Ukur CT tiap elemen berulang kali') },
            { tone: 'navy', title: T('2. 見える化', '2. Visualise', '2. Visualisasi'), text: T('山積み表とTT線', 'Yamazumi + TT line', 'Yamazumi + garis TT') },
            { tone: 'amber', title: T('3. ネック改善', '3. Fix the neck', '3. Perbaiki leher botol'), text: T('ECRSで作業そのものを減らす', 'Reduce work itself with ECRS', 'Kurangi pekerjaan dengan ECRS') },
            { tone: 'green', title: T('4. 再配分', '4. Redistribute', '4. Distribusi ulang'), text: T('作業を移し、TTに合わせて山をならす', 'Move elements to level bars to TT', 'Pindahkan elemen agar batang rata dengan TT') },
            { tone: 'gray', title: T('5. 標準化', '5. Standardise', '5. Standarisasi'), text: T('新しい配分を標準作業に', 'Make the new split standard work', 'Jadikan pembagian baru sebagai kerja standar') },
          ] },
          { type: 'p', text: T(
            '改善の基本は「山崩し」です。ネック工程の作業を、余裕のある隣の工程へ移します。ただし作業を移すだけではΣCTは変わりません。人数を減らすには、[[ecrs]]で**作業そのものを減らす**ことが必要です。',
            'The basic tactic is levelling ("yama-kuzushi"): move work from the neck to a neighbouring process with spare time. But moving work does not change ΣCT. To reduce headcount you must **remove work itself** using [[ecrs]].',
            'Taktik dasarnya adalah meratakan ("yama-kuzushi"): memindahkan pekerjaan dari proses leher botol ke proses tetangga yang longgar. Tetapi memindahkan pekerjaan tidak mengubah ΣCT. Untuk mengurangi jumlah orang, **pekerjaan itu sendiri harus dikurangi** dengan [[ecrs]].'
          ) },
          { type: 'table',
            head: [T('手段', 'Tactic', 'Taktik'), T('効果', 'Effect', 'Efek'), T('注意点', 'Caution', 'Perhatian')],
            rows: [
              [T('作業の移動（山崩し）', 'Move work (levelling)', 'Pindah pekerjaan (meratakan)'), T('ネックCTが下がり編成効率が上がる', 'Neck CT falls, efficiency rises', 'CT leher botol turun, efisiensi naik'), T('ΣCTは不変。部品や工具の配置も一緒に見直す', 'ΣCT unchanged; review part/tool locations too', 'ΣCT tetap; tinjau juga letak part/alat')],
              [T('作業の削減（ECRS）', 'Remove work (ECRS)', 'Kurangi pekerjaan (ECRS)'), T('ΣCTが下がり、人員削減が可能に', 'ΣCT falls; fewer workers possible', 'ΣCT turun; pekerja bisa dikurangi'), T('品質に必要な作業を消さない', 'Do not remove work needed for quality', 'Jangan hilangkan kerja yang perlu untuk kualitas')],
              [T('並列化（同じ工程を2つ）', 'Parallel stations', 'Stasiun paralel'), T('ネック能力が2倍に', 'Doubles neck capacity', 'Kapasitas leher botol 2 kali'), T('人や設備が増える。最後の手段', 'Adds people/equipment; last resort', 'Menambah orang/mesin; pilihan terakhir')],
              [T('バラツキの低減', 'Reduce variation', 'Kurangi variasi'), T('毎回のCTが安定し、計算どおりに流れる', 'CT becomes stable; line flows as calculated', 'CT stabil; lini mengalir sesuai hitungan'), T('標準作業と5S・3定が前提', 'Needs standard work and 5S/3-tei', 'Perlu kerja standar dan 5S/3-tei')],
            ],
          },
          { type: 'example',
            title: T('再配分の例（TT = 60秒）', 'Rebalancing example (TT = 60 s)', 'Contoh penyeimbangan ulang (TT = 60 dtk)'),
            steps: [
              T('改善前：52・58・45・60・41秒（ΣCT 256秒、5人、編成効率85.3%）', 'Before: 52, 58, 45, 60, 41 s (ΣCT 256 s, 5 people, 85.3%)', 'Sebelum: 52, 58, 45, 60, 41 dtk (ΣCT 256 dtk, 5 orang, 85,3%)'),
              T('ECRSで「部品を探す」「持ち替え」など無価値作業を合計16秒削減 → ΣCT 240秒', 'ECRS removes 16 s of non-value work such as searching and re-gripping → ΣCT 240 s', 'ECRS menghilangkan 16 dtk pekerjaan tanpa nilai seperti mencari dan ganti pegangan → ΣCT 240 dtk'),
              T('作業を再配分して4工程に：60・60・60・60秒', 'Redistribute into 4 processes: 60, 60, 60, 60 s', 'Distribusi ulang menjadi 4 proses: 60, 60, 60, 60 dtk'),
              T('編成効率 = 240 ÷ (60 × 4) = 100%', 'Efficiency = 240 ÷ (60 × 4) = 100%', 'Efisiensi = 240 ÷ (60 × 4) = 100%'),
            ],
            result: T('ただし全工程がTTぴったりだと、少しのブレで遅れが出ます。実際には毎回のCTのバラツキを小さくしてから詰めることが大切です。', 'But if every process sits exactly at TT, any small fluctuation causes delay. In practice, reduce cycle-to-cycle variation before tightening.', 'Namun jika semua proses tepat di TT, sedikit fluktuasi menyebabkan keterlambatan. Dalam praktik, kurangi variasi antar siklus dulu sebelum dirapatkan.'),
          },
        ],
      },
      {
        id: 'variation',
        title: T('平均値のバランスとバラツキの落とし穴', 'The trap of balancing averages', 'Jebakan menyeimbangkan rata-rata'),
        blocks: [
          { type: 'p', text: T(
            '山積み表の棒は、ふつう平均値や最小値で描きます。しかし現場の作業時間は毎回ブレます。平均が55秒でも、ときどき70秒かかる工程があれば、その瞬間はTT 60秒を超え、ライン全体が止まります。',
            'Yamazumi bars are usually drawn with average or minimum times. But real work time varies every cycle. A process averaging 55 s that sometimes takes 70 s exceeds the 60 s TT at that moment and stops the whole line.',
            'Batang yamazumi biasanya digambar dengan waktu rata-rata atau minimum. Tetapi waktu kerja nyata bervariasi tiap siklus. Proses dengan rata-rata 55 dtk yang kadang 70 dtk akan melebihi TT 60 dtk saat itu dan menghentikan seluruh lini.'
          ) },
          { type: 'compare',
            left: { tone: 'red', title: T('バラツキが大きい工程', 'High-variation process', 'Proses variasi tinggi'), items: [
              T('平均55秒、範囲40〜70秒', 'Average 55 s, range 40–70 s', 'Rata-rata 55 dtk, rentang 40–70 dtk'),
              T('ときどきTT超え → 後工程が手待ち', 'Sometimes exceeds TT → downstream waits', 'Kadang melebihi TT → proses berikut menunggu'),
              T('計算上の編成効率が当てにならない', 'Calculated efficiency is unreliable', 'Efisiensi hasil hitungan tidak bisa dipercaya'),
            ] },
            right: { tone: 'green', title: T('バラツキが小さい工程', 'Low-variation process', 'Proses variasi rendah'), items: [
              T('平均55秒、範囲53〜57秒', 'Average 55 s, range 53–57 s', 'Rata-rata 55 dtk, rentang 53–57 dtk'),
              T('常にTT内 → 流れが止まらない', 'Always within TT → flow never stops', 'Selalu dalam TT → aliran tidak berhenti'),
              T('計算どおりの人員・出来高が出る', 'Headcount and output match the calculation', 'Jumlah orang dan output sesuai hitungan'),
            ] },
          },
          { type: 'callout', kind: 'zeva', title: T('ZEVAとのつながり', 'ZEVA connection', 'Kaitan dengan ZEVA'), text: T(
            'ZEVAでは、平均値だけでラインを評価しません。毎回の作業時間のバラツキをV.Score（σ/μ）で数値化し（ie-08）、バラツキが大きい工程を優先して標準化します。バラツキが大きいままでは、測ったCTも編成効率も信頼できず、正しい改善アクションが取れないからです（ZEVAの根底ロジック）。',
            'ZEVA never evaluates a line by averages alone. It quantifies cycle-to-cycle variation with V.Score (σ/μ, see ie-08) and standardises the high-variation processes first. While variation is large, measured CTs and efficiency figures cannot be trusted, so correct improvement actions are impossible (ZEVA root logic).',
            'ZEVA tidak pernah menilai lini hanya dengan rata-rata. Variasi antar siklus diukur dengan V.Score (σ/μ, lihat ie-08) dan proses bervariasi tinggi distandarkan lebih dulu. Selama variasi besar, CT dan efisiensi hasil ukur tidak dapat dipercaya sehingga tindakan perbaikan yang tepat tidak mungkin (logika dasar ZEVA).'
          ) },
          { type: 'callout', kind: 'warn', title: T('よくある間違い', 'Common mistake', 'Kesalahan umum'), text: T(
            '「ネック工程の作業者を急がせる」のは改善ではありません。結果（CT）を直接いじるだけで、原因（作業方法・部品配置など）が変わらないため、品質低下やケガ、すぐに元に戻る結果になります。',
            'Telling the neck operator to hurry is not improvement. It pushes the result (CT) directly without changing causes (method, part layout), leading to defects, injuries, and quick relapse.',
            'Menyuruh operator proses leher botol bekerja lebih cepat bukan perbaikan. Itu hanya menekan hasil (CT) tanpa mengubah penyebab (metode, tata letak part), sehingga menimbulkan cacat, cedera, dan cepat kembali seperti semula.'
          ) },
        ],
      },
    ],
    keyPoints: [
      T('ラインの出来高は最もCTが長いネック工程で決まる', 'Line output is set by the neck process with the longest CT', 'Output lini ditentukan oleh proses leher botol dengan CT terpanjang'),
      T('編成効率（IEの基本式）= ΣCT ÷ (ネックCT × 工程数)、目安90%以上。ZEVAはタクトタイム基準', 'Efficiency (basic IE formula) = ΣCT ÷ (neck CT × processes); guide ≥ 90%. ZEVA measures against takt', 'Efisiensi keseimbangan lini = ΣCT ÷ (CT leher botol × jumlah proses); target ≥ 90%'),
      T('必要人員 = ΣCT ÷ TT（切り上げ）。人を減らすには作業そのものを減らす', 'Required workers = ΣCT ÷ TT (round up); to cut headcount, remove work itself', 'Pekerja = ΣCT ÷ TT (bulatkan ke atas); untuk mengurangi orang, kurangi pekerjaan itu sendiri'),
      T('山積み表で見える化し、ECRSと再配分で山をならす', 'Visualise with yamazumi; level with ECRS and redistribution', 'Visualisasikan dengan yamazumi; ratakan dengan ECRS dan distribusi ulang'),
      T('平均だけでなくバラツキも見る。バラツキが大きいとバランス計算は当てにならない', 'Look at variation, not just averages; with large variation the balance calculation is unreliable', 'Lihat variasi, bukan hanya rata-rata; jika variasi besar, hitungan keseimbangan tidak bisa dipercaya'),
    ],
    quiz: [
      { q: T('ラインの出来高を決めるのはどの工程ですか？', 'Which process decides the output of a line?', 'Proses mana yang menentukan output lini?'),
        choices: [T('最もCTが短い工程', 'The process with the shortest CT', 'Proses dengan CT terpendek'), T('最もCTが長い工程', 'The process with the longest CT', 'Proses dengan CT terpanjang'), T('最初の工程', 'The first process', 'Proses pertama'), T('最後の検査工程', 'The final inspection', 'Inspeksi terakhir')],
        answer: 1, explain: T('最も遅い（CTが長い）ネック工程がライン全体のペースを決めます。', 'The slowest (longest CT) neck process sets the pace of the whole line.', 'Proses leher botol yang paling lambat (CT terpanjang) menentukan kecepatan seluruh lini.') },
      { q: T('CTが 30・36・33・27秒 の4工程。編成効率は？', 'Four processes: 30, 36, 33, 27 s. Line balance efficiency?', 'Empat proses: 30, 36, 33, 27 dtk. Efisiensi keseimbangan?'),
        choices: [T('87.5%', '87.5%', '87,5%'), T('91.7%', '91.7%', '91,7%'), T('80.0%', '80.0%', '80,0%'), T('95.0%', '95.0%', '95,0%')],
        answer: 0, explain: T('ΣCT = 126秒、ネック36秒。126 ÷ (36 × 4) = 126 ÷ 144 = 87.5%。', 'ΣCT = 126 s, neck 36 s. 126 ÷ (36 × 4) = 126 ÷ 144 = 87.5%.', 'ΣCT = 126 dtk, leher botol 36 dtk. 126 ÷ (36 × 4) = 126 ÷ 144 = 87,5%.') },
      { q: T('ΣCTが 330秒、TTが 60秒 のとき、理論必要人員は？', 'ΣCT = 330 s and TT = 60 s. Theoretical required workers?', 'ΣCT = 330 dtk dan TT = 60 dtk. Jumlah pekerja teoretis?'),
        choices: [T('5人', '5 people', '5 orang'), T('5.5人', '5.5 people', '5,5 orang'), T('6人', '6 people', '6 orang'), T('7人', '7 people', '7 orang')],
        answer: 2, explain: T('330 ÷ 60 = 5.5。人は分割できないので切り上げて6人です。', '330 ÷ 60 = 5.5. People cannot be split, so round up to 6.', '330 ÷ 60 = 5,5. Orang tidak bisa dibagi, jadi dibulatkan ke atas menjadi 6.') },
      { q: T('作業を隣の工程へ移す「山崩し」だけで変わらないものは？', 'What does NOT change when you only move work to a neighbouring process?', 'Apa yang TIDAK berubah jika hanya memindahkan pekerjaan ke proses tetangga?'),
        choices: [T('ネックCT', 'Neck CT', 'CT leher botol'), T('編成効率', 'Line balance efficiency', 'Efisiensi keseimbangan lini'), T('ΣCT（積上げ工数）', 'ΣCT (total work content)', 'ΣCT (total isi kerja)'), T('手待ち時間の配分', 'Distribution of waiting time', 'Distribusi waktu menunggu')],
        answer: 2, explain: T('作業を移動しても合計時間は同じです。ΣCTを下げるにはECRSで作業そのものを減らします。', 'Moving work keeps the total the same. To lower ΣCT, remove work with ECRS.', 'Memindahkan pekerjaan tidak mengubah total. Untuk menurunkan ΣCT, kurangi pekerjaan dengan ECRS.') },
      { q: T('山積み表でTT線より大きく低い棒が意味するのは？', 'On a yamazumi chart, a bar far below the TT line means…', 'Pada grafik yamazumi, batang yang jauh di bawah garis TT berarti…'),
        choices: [T('その工程は品質が良い', 'That process has good quality', 'Proses itu kualitasnya baik'), T('手待ちが発生しており、作業を集約できる可能性がある', 'Waiting occurs; work might be consolidated', 'Terjadi menunggu; pekerjaan mungkin bisa digabung'), T('顧客ペースに間に合わない', 'It cannot meet customer pace', 'Tidak bisa mengikuti kecepatan pelanggan'), T('ネック工程である', 'It is the neck process', 'Itu proses leher botol')],
        answer: 1, explain: T('TTより大幅に短い工程は余力があり、手待ちが生じています。', 'A process far shorter than TT has spare capacity and waits.', 'Proses yang jauh lebih pendek dari TT punya kapasitas lebih dan menunggu.') },
      { q: T('平均CTでは完全にバランスしているのに、ラインがよく止まる。最も考えられる原因は？', 'The line is perfectly balanced on average CT but often stops. Most likely cause?', 'Lini seimbang sempurna berdasarkan CT rata-rata tetapi sering berhenti. Penyebab paling mungkin?'),
        choices: [T('TTが長すぎる', 'TT is too long', 'TT terlalu panjang'), T('工程ごとのCTのバラツキが大きい', 'Large CT variation within processes', 'Variasi CT dalam proses besar'), T('工程数が少ない', 'Too few processes', 'Proses terlalu sedikit'), T('編成効率が100%を超えた', 'Efficiency exceeded 100%', 'Efisiensi melebihi 100%')],
        answer: 1, explain: T('平均は同じでも、毎回の時間がブレるとTTを超える瞬間が生まれます。ZEVAがバラツキを重視する理由です。', 'Even with equal averages, cycle-to-cycle spread creates moments above TT. This is why ZEVA focuses on variation.', 'Meski rata-rata sama, sebaran antar siklus menimbulkan saat melebihi TT. Inilah alasan ZEVA berfokus pada variasi.') },
      { q: T('ネック工程に対する改善として適切でないものは？', 'Which is NOT an appropriate improvement for a neck process?', 'Mana yang BUKAN perbaikan yang tepat untuk proses leher botol?'),
        choices: [T('ECRSで不要な動作を廃除する', 'Eliminate unnecessary motions with ECRS', 'Hilangkan gerakan tidak perlu dengan ECRS'), T('部品を手元に配置する', 'Place parts within easy reach', 'Letakkan part dalam jangkauan'), T('作業者に「もっと急げ」と指示する', 'Tell the operator to hurry up', 'Suruh operator lebih cepat'), T('作業の一部を余裕のある工程へ移す', 'Move some work to a process with spare time', 'Pindahkan sebagian kerja ke proses yang longgar')],
        answer: 2, explain: T('急がせるのは結果（Y）を直接いじる行為で、原因（X）が変わらず品質や安全を損ないます。', 'Rushing pushes the result (Y) directly; causes (X) do not change, harming quality and safety.', 'Menyuruh cepat berarti menekan hasil (Y) langsung; penyebab (X) tidak berubah dan merusak kualitas serta keselamatan.') },
    ],
  });
})();
