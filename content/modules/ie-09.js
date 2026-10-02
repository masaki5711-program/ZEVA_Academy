(function () {
  const T = (ja, en, id) => ({ ja, en, id });

  ZA.addModule({
    id: 'ie-09',
    track: 'ie',
    order: 9,
    minutes: 40,
    icon: '📈',
    level: 3,
    prereq: ['ie-08'],
    title: T('管理図と工程能力', 'Control Charts and Process Capability', 'Diagram Kontrol dan Kapabilitas Proses'),
    summary: T(
      '偶然原因と異常原因を見分ける管理図（X̄-R管理図）と、規格に対する実力を表す工程能力指数 Cp・Cpk を学びます。「まず安定、次に能力」が鉄則です。',
      'Learn the X̄-R control chart, which separates common causes from special causes, and the capability indices Cp and Cpk, which show performance against the specification. Rule: stability first, capability second.',
      'Mempelajari diagram kontrol X̄-R yang memisahkan penyebab umum dari penyebab khusus, serta indeks kapabilitas Cp dan Cpk yang menunjukkan kinerja terhadap spesifikasi. Aturan: stabil dulu, kapabilitas kemudian.'
    ),
    objectives: [
      T('偶然原因と異常原因の違いを説明できる', 'Explain common causes vs special causes', 'Menjelaskan penyebab umum vs penyebab khusus'),
      T('X̄-R管理図の管理限界を計算し、異常のサインを読める', 'Calculate X̄-R control limits and read out-of-control signals', 'Menghitung batas kontrol X̄-R dan membaca sinyal di luar kendali'),
      T('管理限界と規格限界の違いを説明できる', 'Explain the difference between control limits and spec limits', 'Menjelaskan perbedaan batas kontrol dan batas spesifikasi'),
      T('Cp・Cpkを計算し、判定基準で評価できる', 'Calculate Cp and Cpk and judge them', 'Menghitung Cp dan Cpk serta menilainya'),
      T('「安定状態でなければ工程能力は定義できない」理由を説明できる', 'Explain why capability cannot be defined without stability', 'Menjelaskan mengapa kapabilitas tidak dapat didefinisikan tanpa stabilitas'),
    ],
    sections: [
      {
        id: 'causes',
        title: T('2種類のバラツキ：偶然原因と異常原因', 'Two kinds of variation: common and special causes', 'Dua jenis variasi: penyebab umum dan khusus'),
        blocks: [
          { type: 'p', text: T(
            '1920年代、W.A.シューハートは工程のバラツキを2種類に分けました。この区別が、管理図と品質管理全体の出発点です。',
            'In the 1920s, W. A. Shewhart split process variation into two kinds. This distinction is the starting point of control charts and of quality control as a whole.',
            'Pada tahun 1920-an, W. A. Shewhart membagi variasi proses menjadi dua jenis. Pembedaan ini adalah titik awal diagram kontrol dan pengendalian kualitas secara keseluruhan.'
          ) },
          { type: 'compare',
            left: { tone: 'blue', title: T('偶然原因（共通原因）', 'Common causes (chance)', 'Penyebab umum (kebetulan)'), items: [
              T('いつも存在する小さな原因の積み重ね', 'Many small causes that are always present', 'Banyak penyebab kecil yang selalu ada'),
              T('例：材料のわずかな差、室温の小さな揺れ', 'e.g. tiny material differences, small room-temperature swings', 'mis. perbedaan kecil material, fluktuasi kecil suhu ruang'),
              T('バラツキは予測できる範囲に収まる', 'Variation stays within a predictable band', 'Variasi tetap dalam rentang yang dapat diprediksi'),
              T('減らすには仕組み（4M・標準）を変える＝管理者の仕事', 'Reducing it needs system change (4M, standards) — a management job', 'Mengurangi perlu perubahan sistem (4M, standar) — tugas manajemen'),
            ] },
            right: { tone: 'red', title: T('異常原因（特殊原因）', 'Special causes (assignable)', 'Penyebab khusus (dapat ditentukan)'), items: [
              T('ときどき現れる、特定できる大きな原因', 'Occasional, identifiable, larger causes', 'Penyebab besar yang sesekali muncul dan dapat diidentifikasi'),
              T('例：工具の欠け、手順の飛ばし、別ロット材料', 'e.g. a chipped tool, a skipped step, a different material lot', 'mis. alat terkelupas, langkah terlewat, lot material berbeda'),
              T('バラツキが予測できなくなる', 'Variation becomes unpredictable', 'Variasi menjadi tidak dapat diprediksi'),
              T('現場で原因を突き止め、取り除く', 'Find and remove the cause on the shop floor', 'Temukan dan hilangkan penyebab di lantai produksi'),
            ] },
          },
          { type: 'p', text: T(
            '異常原因が取り除かれ、偶然原因だけでばらついている状態を[[statistical-control]]（安定状態）と呼びます。安定状態の工程は、明日も同じような分布でデータを出すと予測できます。',
            'When special causes are removed and only common causes remain, the process is in [[statistical-control]] (stable). A stable process can be predicted to produce a similar distribution tomorrow.',
            'Saat penyebab khusus dihilangkan dan hanya penyebab umum yang tersisa, proses berada dalam [[statistical-control]] (stabil). Proses stabil dapat diprediksi menghasilkan distribusi serupa esok hari.'
          ) },
          { type: 'quote',
            text: T('安定状態（統計的管理状態）にない工程には、定義可能な工程能力が存在しない。', 'A process that is not in a state of statistical control has no definable capability.', 'Proses yang tidak berada dalam kendali statistik tidak memiliki kapabilitas yang dapat didefinisikan.'),
            cite: T('シューハートの原則', 'Shewhart principle', 'Prinsip Shewhart'),
          },
          { type: 'callout', kind: 'warn', title: T('2つの間違い', 'Two mistakes', 'Dua kesalahan'), text: T(
            '①偶然のバラツキに毎回反応して設備を調整する（過剰調整）→ かえってバラツキが増える。②異常原因のサインを「いつものこと」と見逃す → 不良が続く。管理図はこの2つの間違いを防ぐための道具です。',
            '① Reacting to every chance fluctuation by adjusting the machine (over-adjustment) increases variation. ② Ignoring a special-cause signal as "normal" lets defects continue. The control chart exists to prevent both mistakes.',
            '① Bereaksi terhadap setiap fluktuasi kebetulan dengan menyetel mesin (penyetelan berlebihan) justru menambah variasi. ② Mengabaikan sinyal penyebab khusus sebagai "biasa" membuat cacat berlanjut. Diagram kontrol ada untuk mencegah keduanya.'
          ) },
        ],
      },
      {
        id: 'xbar-r',
        title: T('X̄-R管理図のつくり方', 'Building an X̄-R chart', 'Membuat diagram X̄-R'),
        blocks: [
          { type: 'p', text: T(
            '[[control-chart]]は、データを時間順に打点し、中心線と上下の[[control-limit]]を引いたグラフです。代表的な[[xbar-r-chart]]では、一定間隔で数個（例：5個）ずつ測った「群」ごとに、平均 X̄ と範囲 R を打点します。X̄管理図は中心のズレを、R管理図は群内のバラツキの変化を監視します。',
            'A [[control-chart]] plots data in time order with a centre line and upper/lower [[control-limit]]s. In the common [[xbar-r-chart]], small subgroups (e.g. 5 parts) are sampled at intervals, and each subgroup’s mean X̄ and range R are plotted. The X̄ chart watches shifts in the centre; the R chart watches changes in within-subgroup spread.',
            '[[control-chart]] memplot data menurut urutan waktu dengan garis tengah dan [[control-limit]] atas/bawah. Pada [[xbar-r-chart]] yang umum, subgrup kecil (mis. 5 part) diambil secara berkala, lalu rata-rata X̄ dan rentang R tiap subgrup diplot. Diagram X̄ memantau pergeseran pusat; diagram R memantau perubahan sebaran dalam subgrup.'
          ) },
          { type: 'flow', dir: 'h', nodes: [
            { tone: 'blue', title: T('1. 群をとる', '1. Sample subgroups', '1. Ambil subgrup'), text: T('例：1時間ごとに5個、20〜25群', 'e.g. 5 parts every hour, 20–25 subgroups', 'mis. 5 part tiap jam, 20–25 subgrup') },
            { tone: 'navy', title: T('2. X̄とRを計算', '2. Compute X̄ and R', '2. Hitung X̄ dan R'), text: T('群ごとの平均と範囲', 'Mean and range of each subgroup', 'Rata-rata dan rentang tiap subgrup') },
            { tone: 'amber', title: T('3. 中心線', '3. Centre lines', '3. Garis tengah'), text: T('X̿（X̄の平均）、R̄（Rの平均）', 'X̿ (mean of X̄), R̄ (mean of R)', 'X̿ (rata-rata X̄), R̄ (rata-rata R)') },
            { tone: 'green', title: T('4. 管理限界', '4. Control limits', '4. Batas kontrol'), text: T('係数表で計算', 'Use the constants table', 'Gunakan tabel konstanta') },
            { tone: 'red', title: T('5. 打点・判定', '5. Plot and judge', '5. Plot dan nilai'), text: T('異常のサインを探す', 'Look for out-of-control signals', 'Cari sinyal di luar kendali') },
          ] },
          { type: 'formula',
            expr: T('X̄管理図：UCL = X̿ + A<sub>2</sub>R̄、CL = X̿、LCL = X̿ − A<sub>2</sub>R̄', 'X̄ chart: UCL = X̿ + A<sub>2</sub>R̄, CL = X̿, LCL = X̿ − A<sub>2</sub>R̄', 'Diagram X̄: UCL = X̿ + A<sub>2</sub>R̄, CL = X̿, LCL = X̿ − A<sub>2</sub>R̄'),
          },
          { type: 'formula',
            expr: T('R管理図：UCL = D<sub>4</sub>R̄、CL = R̄、LCL = D<sub>3</sub>R̄', 'R chart: UCL = D<sub>4</sub>R̄, CL = R̄, LCL = D<sub>3</sub>R̄', 'Diagram R: UCL = D<sub>4</sub>R̄, CL = R̄, LCL = D<sub>3</sub>R̄'),
            note: T('群の大きさ n = 5 のとき：A2 = 0.577、D3 = 0（下限なし）、D4 = 2.114、d2 = 2.326。管理限界は「平均±3σ」に相当します。', 'For subgroup size n = 5: A2 = 0.577, D3 = 0 (no lower limit), D4 = 2.114, d2 = 2.326. The limits correspond to mean ± 3σ.', 'Untuk ukuran subgrup n = 5: A2 = 0,577, D3 = 0 (tanpa batas bawah), D4 = 2,114, d2 = 2,326. Batas setara dengan rata-rata ± 3σ.'),
          },
          { type: 'example',
            title: T('計算例（n = 5、25群）', 'Worked example (n = 5, 25 subgroups)', 'Contoh (n = 5, 25 subgrup)'),
            steps: [
              T('X̿ = 10.00 mm、R̄ = 0.20 mm だった', 'X̿ = 10.00 mm and R̄ = 0.20 mm', 'X̿ = 10,00 mm dan R̄ = 0,20 mm'),
              T('X̄のUCL = 10.00 + 0.577 × 0.20 = 10.115 mm', 'X̄ UCL = 10.00 + 0.577 × 0.20 = 10.115 mm', 'UCL X̄ = 10,00 + 0,577 × 0,20 = 10,115 mm'),
              T('X̄のLCL = 10.00 − 0.115 = 9.885 mm', 'X̄ LCL = 10.00 − 0.115 = 9.885 mm', 'LCL X̄ = 10,00 − 0,115 = 9,885 mm'),
              T('RのUCL = 2.114 × 0.20 = 0.423 mm、LCLなし', 'R UCL = 2.114 × 0.20 = 0.423 mm; no LCL', 'UCL R = 2,114 × 0,20 = 0,423 mm; tanpa LCL'),
              T('個々の値のσの推定 = R̄ ÷ d2 = 0.20 ÷ 2.326 ≒ 0.086 mm', 'Estimated σ of individual values = R̄ ÷ d2 = 0.20 ÷ 2.326 ≈ 0.086 mm', 'Perkiraan σ nilai individu = R̄ ÷ d2 = 0,20 ÷ 2,326 ≈ 0,086 mm'),
            ],
            result: T('以後、群のX̄が 9.885〜10.115 mm、Rが 0.423 mm 以下で、並び方に癖がなければ「安定」と判断します。', 'From now on, if subgroup X̄ stays within 9.885–10.115 mm, R stays at or below 0.423 mm, and no patterns appear, the process is judged stable.', 'Selanjutnya, jika X̄ subgrup tetap dalam 9,885–10,115 mm, R tidak melebihi 0,423 mm, dan tidak ada pola, proses dinilai stabil.'),
          },
        ],
      },
      {
        id: 'read',
        title: T('管理図の読み方：異常のサイン', 'Reading the chart: out-of-control signals', 'Membaca diagram: sinyal di luar kendali'),
        blocks: [
          { type: 'p', text: T(
            '点が管理限界の内側にあっても、並び方に「偶然とは思えない癖」があれば[[special-cause]]を疑います。代表的な判定ルールは次のとおりです（規格・文献によって点数に差があります）。',
            'Even when all points are inside the limits, a pattern that does not look random suggests a [[special-cause]]. Typical rules are below (point counts differ slightly between standards).',
            'Meskipun semua titik di dalam batas, pola yang tidak tampak acak menunjukkan [[special-cause]]. Aturan umum ada di bawah (jumlah titik sedikit berbeda antar standar).'
          ) },
          { type: 'table',
            head: [T('ルール', 'Rule', 'Aturan'), T('パターン', 'Pattern', 'Pola'), T('考えられる原因の例', 'Example cause', 'Contoh penyebab')],
            rows: [
              ['1', T('1点が管理限界の外', 'One point outside a control limit', 'Satu titik di luar batas kontrol'), T('工具破損、材料不良、測定ミス', 'Tool breakage, bad material, measurement error', 'Alat patah, material buruk, salah ukur')],
              ['2', T('中心線の片側に連続して点が並ぶ（連9点など）', 'A run of points on one side of the centre line (e.g. 9 in a row)', 'Deretan titik di satu sisi garis tengah (mis. 9 berturut-turut)'), T('設定値の変更、材料ロット切替、作業者交代', 'Setting change, lot change, operator change', 'Perubahan setelan, ganti lot, ganti operator')],
              ['3', T('連続して上昇または下降（6点など）', 'Steady rise or fall (e.g. 6 in a row)', 'Naik atau turun terus (mis. 6 berturut-turut)'), T('工具摩耗、温度上昇、作業者の疲労', 'Tool wear, heating up, operator fatigue', 'Keausan alat, pemanasan, kelelahan operator')],
              ['4', T('3点中2点が±2σの外側', '2 of 3 points beyond ±2σ on the same side', '2 dari 3 titik di luar ±2σ pada sisi yang sama'), T('中心のズレの初期段階', 'Early stage of a shift', 'Tahap awal pergeseran')],
              ['5', T('周期的な上下', 'Cyclical up-and-down', 'Naik-turun berkala'), T('シフト交代、午前/午後の温度、2台設備の交互投入', 'Shift change, morning/afternoon temperature, alternating two machines', 'Pergantian shift, suhu pagi/sore, dua mesin bergantian')],
              ['6', T('中心線付近に点が集中しすぎ', 'Points hug the centre line too closely', 'Titik terlalu rapat di garis tengah'), T('群のとり方の誤り、異なる流れの混合、データの改ざん', 'Wrong subgrouping, mixed streams, altered data', 'Pengelompokan salah, aliran tercampur, data diubah')],
            ],
          },
          { type: 'widget', name: 'control-chart', props: {} },
          { type: 'callout', kind: 'tip', title: T('異常を見つけたら', 'When you find a signal', 'Saat menemukan sinyal'), text: T(
            '「いつ・どこで・何が変わったか」を記録と現物で確認します（4M変化点）。原因を除去したら、その対策を標準に反映させ、同じ異常が再発しない仕組みにします。',
            'Check records and the actual parts for "when, where, what changed" (4M change points). After removing the cause, build the countermeasure into the standard so the same abnormality cannot recur.',
            'Periksa catatan dan barang aktual untuk "kapan, di mana, apa yang berubah" (titik perubahan 4M). Setelah penyebab dihilangkan, masukkan penanggulangan ke standar agar keabnormalan yang sama tidak terulang.'
          ) },
        ],
      },
      {
        id: 'limits',
        title: T('管理限界 ≠ 規格限界', 'Control limits ≠ specification limits', 'Batas kontrol ≠ batas spesifikasi'),
        blocks: [
          { type: 'table',
            head: [T('', '', ''), T('管理限界（UCL/LCL）', 'Control limits (UCL/LCL)', 'Batas kontrol (UCL/LCL)'), T('規格限界（USL/LSL）', 'Spec limits (USL/LSL)', 'Batas spesifikasi (USL/LSL)')],
            rows: [
              [T('誰が決める', 'Who decides', 'Siapa yang menentukan'), T('工程のデータ（工程の声）', 'The process data (voice of the process)', 'Data proses (suara proses)'), T('設計・顧客（顧客の声）', 'Design / customer (voice of the customer)', 'Desain / pelanggan (suara pelanggan)')],
              [T('意味', 'Meaning', 'Arti'), T('工程が安定しているかの判定線', 'Line to judge whether the process is stable', 'Garis untuk menilai apakah proses stabil'), T('製品が良品か不良品かの判定線', 'Line to judge good vs defective product', 'Garis untuk menilai produk baik vs cacat')],
              [T('対象', 'Applied to', 'Diterapkan pada'), T('群の平均や範囲', 'Subgroup means and ranges', 'Rata-rata dan rentang subgrup'), T('個々の製品', 'Individual products', 'Produk individual')],
            ],
          },
          { type: 'p', text: T(
            '「管理限界内だから良品」「規格内だから安定」はどちらも誤りです。安定していても規格を外れ続ける工程（能力不足）もあれば、規格内でも不安定で、いつ不良が出るかわからない工程もあります。',
            'Neither "inside control limits means good product" nor "inside spec means stable" is true. A stable process can consistently miss the spec (not capable), and a process can be inside spec yet unstable, so defects may appear at any time.',
            'Baik "di dalam batas kontrol berarti produk baik" maupun "di dalam spesifikasi berarti stabil" tidak benar. Proses stabil bisa terus meleset dari spesifikasi (tidak kapabel), dan proses bisa di dalam spesifikasi tetapi tidak stabil sehingga cacat bisa muncul kapan saja.'
          ) },
          { type: 'callout', kind: 'zeva', title: T('ZEVAとのつながり：GPCバンド', 'ZEVA connection: GPC band', 'Kaitan ZEVA: GPC band'), text: T(
            'ZEVAにはさらに「GPCバンド」という第3の線があります。これは物理実験で「この条件範囲なら良品になる」と確かめた工程条件（X）の範囲で、統計的な管理限界とも製品の規格限界とも異なります（z2-01で学びます）。',
            'ZEVA adds a third kind of line: the GPC band — the range of process conditions (X) verified by physical experiments to produce good products. It differs from both statistical control limits and product spec limits (covered in z2-01).',
            'ZEVA menambahkan jenis garis ketiga: GPC band — rentang kondisi proses (X) yang diverifikasi dengan eksperimen fisik untuk menghasilkan produk baik. Ini berbeda dari batas kontrol statistik maupun batas spesifikasi produk (dibahas di z2-01).'
          ) },
        ],
      },
      {
        id: 'capability',
        title: T('工程能力指数 Cp と Cpk', 'Capability indices Cp and Cpk', 'Indeks kapabilitas Cp dan Cpk'),
        blocks: [
          { type: 'p', text: T(
            '工程能力とは、安定した工程が「規格に対してどれだけ余裕をもって作れるか」という実力です。規格の幅と工程のバラツキ（6σ）を比べます。',
            'Process capability is how comfortably a stable process can meet the specification. It compares the spec width with the process spread (6σ).',
            'Kapabilitas proses adalah seberapa leluasa proses stabil memenuhi spesifikasi. Membandingkan lebar spesifikasi dengan sebaran proses (6σ).'
          ) },
          { type: 'formula',
            expr: T('[[cp]] = (USL − LSL) ÷ 6σ', '[[cp]] = (USL − LSL) ÷ 6σ', '[[cp]] = (USL − LSL) ÷ 6σ'),
            note: T('バラツキの小ささだけを見る。中心がずれていても値は変わらない。', 'Looks only at spread; unchanged even if the centre is off.', 'Hanya melihat sebaran; tidak berubah walau pusat bergeser.'),
          },
          { type: 'formula',
            expr: T('[[cpk]] = min{ (USL − μ) ÷ 3σ , (μ − LSL) ÷ 3σ }', '[[cpk]] = min{ (USL − μ) ÷ 3σ , (μ − LSL) ÷ 3σ }', '[[cpk]] = min{ (USL − μ) ÷ 3σ , (μ − LSL) ÷ 3σ }'),
            note: T('中心のズレも考慮し、規格に近い側で評価する。Cpk ≦ Cp（中心が規格中央のとき等しい）。', 'Includes centring; evaluates the side closer to a spec limit. Cpk ≤ Cp (equal when centred).', 'Memperhitungkan pemusatan; menilai sisi yang lebih dekat ke batas. Cpk ≤ Cp (sama saat terpusat).'),
          },
          { type: 'example',
            title: T('計算例：規格 10.0 ± 0.5 mm', 'Worked example: spec 10.0 ± 0.5 mm', 'Contoh: spesifikasi 10,0 ± 0,5 mm'),
            steps: [
              T('LSL = 9.5、USL = 10.5、工程の μ = 10.1、σ = 0.12', 'LSL = 9.5, USL = 10.5, process μ = 10.1, σ = 0.12', 'LSL = 9,5, USL = 10,5, proses μ = 10,1, σ = 0,12'),
              T('Cp = 1.0 ÷ (6 × 0.12) = 1.0 ÷ 0.72 ≒ 1.39', 'Cp = 1.0 ÷ (6 × 0.12) = 1.0 ÷ 0.72 ≈ 1.39', 'Cp = 1,0 ÷ (6 × 0,12) = 1,0 ÷ 0,72 ≈ 1,39'),
              T('上側：(10.5 − 10.1) ÷ 0.36 ≒ 1.11、下側：(10.1 − 9.5) ÷ 0.36 ≒ 1.67', 'Upper: (10.5 − 10.1) ÷ 0.36 ≈ 1.11; lower: (10.1 − 9.5) ÷ 0.36 ≈ 1.67', 'Atas: (10,5 − 10,1) ÷ 0,36 ≈ 1,11; bawah: (10,1 − 9,5) ÷ 0,36 ≈ 1,67'),
              T('Cpk = 小さいほう = 1.11 → 上側の不良が約430 ppm見込まれる', 'Cpk = the smaller = 1.11 → about 430 ppm expected above USL', 'Cpk = yang lebih kecil = 1,11 → sekitar 430 ppm diperkirakan di atas USL'),
              T('中心を10.0に合わせると Cpk = Cp = 1.39、さらにσを0.10にすると 1.67', 'Centre at 10.0 → Cpk = Cp = 1.39; also cut σ to 0.10 → 1.67', 'Pusatkan di 10,0 → Cpk = Cp = 1,39; kurangi σ menjadi 0,10 → 1,67'),
            ],
            result: T('Cpを上げるにはバラツキを減らす、CpkをCpに近づけるには中心を合わせる。根本はバラツキの低減です。', 'Raise Cp by reducing variation; bring Cpk up to Cp by centring. The fundamental lever is variation reduction.', 'Naikkan Cp dengan mengurangi variasi; dekatkan Cpk ke Cp dengan memusatkan. Tuas mendasar adalah pengurangan variasi.'),
          },
          { type: 'table',
            head: [T('Cpk', 'Cpk', 'Cpk'), T('判定（一般的な目安）', 'Judgement (common guide)', 'Penilaian (panduan umum)'), T('処置', 'Action', 'Tindakan')],
            rows: [
              [T('≥ 1.67', '≥ 1.67', '≥ 1,67'), T('十分すぎる', 'More than sufficient', 'Lebih dari cukup'), T('検査の簡素化・コスト低減を検討', 'Consider simplifying inspection, cutting cost', 'Pertimbangkan penyederhanaan inspeksi, penghematan')],
              [T('1.33 – 1.67', '1.33 – 1.67', '1,33 – 1,67'), T('十分', 'Sufficient', 'Cukup'), T('現状を維持・監視', 'Maintain and monitor', 'Pertahankan dan pantau')],
              [T('1.00 – 1.33', '1.00 – 1.33', '1,00 – 1,33'), T('まずまず（不十分に近い）', 'Barely adequate', 'Hampir tidak cukup'), T('注意して管理、改善を計画', 'Manage carefully; plan improvement', 'Kelola hati-hati; rencanakan perbaikan')],
              [T('< 1.00', '< 1.00', '< 1,00'), T('不足', 'Insufficient', 'Tidak cukup'), T('全数検査などで流出防止、至急改善', 'Contain (e.g. 100% inspection) and improve urgently', 'Cegah lolos (mis. inspeksi 100%) dan segera perbaiki')],
            ],
          },
          { type: 'widget', name: 'cpk-calc', props: { lsl: 9.5, usl: 10.5, mu: 10.1, sigma: 0.12 } },
          { type: 'callout', kind: 'note', title: T('ZEVAでは工程能力指数を評価指標に使わない', 'ZEVA does not use capability indices as metrics', 'ZEVA tidak memakai indeks kapabilitas sebagai metrik'), text: T(
            'CpとCpkはIEの共通言語なのでここで学びますが、ZEVAの評価指標体系（[[defect-rate]]・[[oee]]・[[v-score]]・[[xbar-r-chart]]）には入りません。ZEVAは結果の指数ではなく、条件（X）をGPCバンドで押さえ、結果は不良率とOEEで見る組み立てにしているためです（評価指標体系のモジュールで扱います）。',
            'Cp and Cpk are common IE language, so they are taught here, but they are not part of the ZEVA metrics system ([[defect-rate]], [[oee]], [[v-score]], [[xbar-r-chart]]). ZEVA holds the conditions (X) inside the GPC band and reads the result through the defect rate and OEE, rather than through an index of the result (see the metrics-system module).',
            'Cp dan Cpk adalah istilah umum dalam IE sehingga diajarkan di sini, tetapi tidak termasuk dalam sistem metrik ZEVA ([[defect-rate]], [[oee]], [[v-score]], [[xbar-r-chart]]). ZEVA menjaga kondisi (X) di dalam GPC band dan membaca hasilnya lewat tingkat cacat dan OEE, bukan lewat indeks hasil (lihat modul sistem metrik).') },
        ],
      },
      {
        id: 'stable-first',
        title: T('鉄則：まず安定、次に工程能力', 'Golden rule: stability first, then capability', 'Aturan emas: stabil dulu, lalu kapabilitas'),
        blocks: [
          { type: 'chain', items: [
            T('データを集め、管理図を描く', 'Collect data and draw a control chart', 'Kumpulkan data dan buat diagram kontrol'),
            T('異常のサインがあれば、原因を除去して安定状態にする', 'If signals appear, remove causes to reach stability', 'Jika ada sinyal, hilangkan penyebab hingga stabil'),
            T('安定を確認できたら、そのデータでσを推定する', 'Once stable, estimate σ from that data', 'Setelah stabil, perkirakan σ dari data itu'),
            T('Cp・Cpkを計算し、規格に対する実力を評価する', 'Calculate Cp and Cpk to judge capability against spec', 'Hitung Cp dan Cpk untuk menilai kapabilitas terhadap spesifikasi'),
          ], conclusion: T('不安定な工程のCpkは、計算はできても「明日の工程」を予測しない＝意味を持たない数字です。', 'Cpk of an unstable process can be calculated, but it does not predict tomorrow — it is a meaningless number.', 'Cpk proses yang tidak stabil bisa dihitung, tetapi tidak memprediksi hari esok — angka tanpa makna.') },
          { type: 'callout', kind: 'zeva', title: T('ZEVAとのつながり：根底ロジック', 'ZEVA connection: the root logic', 'Kaitan ZEVA: logika dasar'), text: T(
            'ZEVAの根底ロジックは「データに基づくアクションには信頼できるデータが必要で、信頼できるデータとはバラツキが少なく偏りの無いデータ」というものです。その理論的基盤がシューハートの原則です。ZEVAでもCpkやV.Scoreを評価する前に、X̄-R管理図で工程の安定を確認します（GPC-Mの目標：Cpk ≥ 1.33）。',
            'ZEVA’s root logic says data-based action needs reliable data, and reliable data has little variation and no bias. Its theoretical foundation is the Shewhart principle. In ZEVA too, process stability is confirmed with an X̄-R chart before evaluating Cpk or V.Score (GPC-M target: Cpk ≥ 1.33).',
            'Logika dasar ZEVA menyatakan tindakan berbasis data membutuhkan data yang andal, dan data andal memiliki variasi kecil dan tanpa bias. Landasan teorinya adalah prinsip Shewhart. Di ZEVA pun, stabilitas proses dikonfirmasi dengan diagram X̄-R sebelum menilai Cpk atau V.Score (target GPC-M: Cpk ≥ 1,33).'
          ) },
          { type: 'check',
            q: T('管理図に異常のサインが多数ある工程で、Cpk = 1.5 と計算された。正しい判断は？', 'A process with many out-of-control signals shows Cpk = 1.5. What is the right conclusion?', 'Proses dengan banyak sinyal di luar kendali menunjukkan Cpk = 1,5. Kesimpulan yang benar?'),
            choices: [T('十分な能力があるので問題ない', 'It is capable, no problem', 'Kapabel, tidak masalah'), T('安定していないのでCpkは信頼できない。まず異常原因を除去する', 'Not stable, so Cpk is not trustworthy; remove special causes first', 'Tidak stabil, jadi Cpk tidak dapat dipercaya; hilangkan penyebab khusus dulu'), T('規格を広げればよい', 'Just widen the spec', 'Cukup perlebar spesifikasi')],
            answer: 1,
            explain: T('安定状態にない工程には定義可能な工程能力が存在しません（シューハートの原則）。', 'A process not in statistical control has no definable capability (Shewhart principle).', 'Proses yang tidak dalam kendali statistik tidak memiliki kapabilitas yang dapat didefinisikan (prinsip Shewhart).'),
          },
        ],
      },
    ],
    keyPoints: [
      T('バラツキには偶然原因と異常原因がある。管理図で見分ける', 'Variation has common and special causes; the control chart separates them', 'Variasi memiliki penyebab umum dan khusus; diagram kontrol memisahkannya'),
      T('X̄-R管理図（n=5）：X̿ ± 0.577R̄、R の上限 2.114R̄', 'X̄-R (n = 5): X̿ ± 0.577R̄; R upper limit 2.114R̄', 'X̄-R (n = 5): X̿ ± 0,577R̄; batas atas R 2,114R̄'),
      T('管理限界は工程の声、規格限界は顧客の声。混同しない', 'Control limits = voice of the process; spec limits = voice of the customer', 'Batas kontrol = suara proses; batas spesifikasi = suara pelanggan'),
      T('Cp = 規格幅 ÷ 6σ、Cpk は中心のズレも含む。1.33以上が目安', 'Cp = spec width ÷ 6σ; Cpk includes centring; ≥ 1.33 is the usual target', 'Cp = lebar spesifikasi ÷ 6σ; Cpk memperhitungkan pemusatan; target umum ≥ 1,33'),
      T('安定状態にない工程には工程能力が存在しない：まず安定、次に能力', 'No stability, no capability: stabilise first, then assess capability', 'Tanpa stabilitas, tidak ada kapabilitas: stabilkan dulu, lalu nilai kapabilitas'),
    ],
    quiz: [
      { q: T('工具の摩耗で寸法が少しずつ大きくなっていく。これは？', 'Dimensions grow gradually due to tool wear. This is…', 'Dimensi membesar perlahan karena keausan alat. Ini adalah…'),
        choices: [T('偶然原因', 'A common cause', 'Penyebab umum'), T('異常原因', 'A special cause', 'Penyebab khusus'), T('規格限界', 'A spec limit', 'Batas spesifikasi'), T('測定のバラツキだけ', 'Only measurement variation', 'Hanya variasi pengukuran')],
        answer: 1, explain: T('特定できる原因による系統的な変化で、管理図では「連続上昇」として現れます。', 'It is a systematic change from an identifiable cause, appearing as a steady rise on the chart.', 'Ini perubahan sistematis dari penyebab yang dapat diidentifikasi, tampak sebagai kenaikan terus pada diagram.') },
      { q: T('n=5、X̿ = 50.0、R̄ = 2.0 のとき、X̄管理図のUCLは？（A2 = 0.577）', 'n = 5, X̿ = 50.0, R̄ = 2.0. X̄ chart UCL? (A2 = 0.577)', 'n = 5, X̿ = 50,0, R̄ = 2,0. UCL diagram X̄? (A2 = 0,577)'),
        choices: [T('51.15', '51.15', '51,15'), T('52.00', '52.00', '52,00'), T('54.23', '54.23', '54,23'), T('50.58', '50.58', '50,58')],
        answer: 0, explain: T('50.0 + 0.577 × 2.0 = 51.154 ≒ 51.15。', '50.0 + 0.577 × 2.0 = 51.154 ≈ 51.15.', '50,0 + 0,577 × 2,0 = 51,154 ≈ 51,15.') },
      { q: T('全点が管理限界内だが、中心線の上側に10点連続している。判断は？', 'All points are inside the limits, but 10 in a row are above the centre line. Conclusion?', 'Semua titik di dalam batas, tetapi 10 berturut-turut di atas garis tengah. Kesimpulan?'),
        choices: [T('限界内なので安定', 'Stable because inside limits', 'Stabil karena di dalam batas'), T('中心がずれた可能性があり、異常を疑う', 'The centre may have shifted; suspect a special cause', 'Pusat mungkin bergeser; curigai penyebab khusus'), T('データ数が足りない', 'Not enough data', 'Data tidak cukup'), T('規格を見直す', 'Revise the spec', 'Revisi spesifikasi')],
        answer: 1, explain: T('片側への連続は、設定値やロットの変化などによる中心のズレのサインです。', 'A run on one side signals a shift, e.g. from a setting or lot change.', 'Deretan di satu sisi menandakan pergeseran, mis. dari perubahan setelan atau lot.') },
      { q: T('管理限界と規格限界について正しいものは？', 'Which statement about control and spec limits is correct?', 'Pernyataan mana tentang batas kontrol dan spesifikasi yang benar?'),
        choices: [T('管理限界は顧客が決める', 'Customers set control limits', 'Pelanggan menetapkan batas kontrol'), T('規格内なら工程は安定している', 'Inside spec means the process is stable', 'Di dalam spesifikasi berarti stabil'), T('管理限界は工程のデータから計算する', 'Control limits are calculated from process data', 'Batas kontrol dihitung dari data proses'), T('両者は常に同じ値', 'They are always equal', 'Keduanya selalu sama')],
        answer: 2, explain: T('管理限界は工程の声（データ）、規格限界は顧客・設計の要求です。', 'Control limits are the voice of the process (data); spec limits are customer/design requirements.', 'Batas kontrol adalah suara proses (data); batas spesifikasi adalah kebutuhan pelanggan/desain.') },
      { q: T('LSL = 10、USL = 20、σ = 1、μ = 16 のCpkは？', 'LSL = 10, USL = 20, σ = 1, μ = 16. Cpk?', 'LSL = 10, USL = 20, σ = 1, μ = 16. Cpk?'),
        choices: [T('1.67', '1.67', '1,67'), T('1.33', '1.33', '1,33'), T('2.00', '2.00', '2,00'), T('1.00', '1.00', '1,00')],
        answer: 1, explain: T('上側 (20−16)÷3 = 1.33、下側 (16−10)÷3 = 2.0。小さいほうで Cpk = 1.33。なお Cp = 10÷6 = 1.67。', 'Upper (20 − 16) ÷ 3 = 1.33; lower (16 − 10) ÷ 3 = 2.0. The smaller gives Cpk = 1.33. (Cp = 10 ÷ 6 = 1.67.)', 'Atas (20 − 16) ÷ 3 = 1,33; bawah (16 − 10) ÷ 3 = 2,0. Yang lebih kecil: Cpk = 1,33. (Cp = 10 ÷ 6 = 1,67.)') },
      { q: T('Cp = 1.5、Cpk = 0.9 の工程で、まず効果的な対策は？', 'Cp = 1.5 and Cpk = 0.9. What is the most effective first action?', 'Cp = 1,5 dan Cpk = 0,9. Tindakan pertama paling efektif?'),
        choices: [T('分布の中心を規格中央に合わせる', 'Centre the distribution on the spec midpoint', 'Pusatkan distribusi di tengah spesifikasi'), T('規格を狭める', 'Tighten the spec', 'Persempit spesifikasi'), T('測定回数を減らす', 'Measure less often', 'Kurangi frekuensi ukur'), T('何もしない', 'Do nothing', 'Tidak melakukan apa-apa')],
        answer: 0, explain: T('Cpは十分なのにCpkが低い＝バラツキは小さいが中心がずれています。中心を合わせればCpkはCpに近づきます。', 'Cp is good but Cpk is low: spread is small but the centre is off. Centring brings Cpk toward Cp.', 'Cp baik tetapi Cpk rendah: sebaran kecil tetapi pusat bergeser. Memusatkan membawa Cpk mendekati Cp.') },
      { q: T('シューハートの原則が述べていることは？', 'What does the Shewhart principle state?', 'Apa yang dinyatakan prinsip Shewhart?'),
        choices: [T('平均が規格内なら不良は出ない', 'If the mean is in spec, no defects occur', 'Jika rata-rata dalam spesifikasi, tidak ada cacat'), T('安定状態にない工程には定義可能な工程能力が存在しない', 'A process not in statistical control has no definable capability', 'Proses yang tidak dalam kendali statistik tidak memiliki kapabilitas yang dapat didefinisikan'), T('管理限界は規格限界と一致させるべき', 'Control limits should equal spec limits', 'Batas kontrol harus sama dengan batas spesifikasi'), T('Cpkは常に1.33以上にできる', 'Cpk can always exceed 1.33', 'Cpk selalu bisa di atas 1,33')],
        answer: 1, explain: T('不安定な工程のデータは明日を予測しないため、工程能力を定義できません。ZEVAの根底ロジックの理論的基盤です。', 'Data from an unstable process does not predict tomorrow, so capability cannot be defined. This underpins ZEVA’s root logic.', 'Data dari proses tidak stabil tidak memprediksi hari esok, sehingga kapabilitas tidak dapat didefinisikan. Ini landasan logika dasar ZEVA.') },
    ],
  });
})();
