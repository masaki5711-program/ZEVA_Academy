ZA.addModule({
  id: 'z2-01',
  track: 'z2',
  order: 1,
  minutes: 30,
  icon: '🎯',
  level: 2,
  prereq: ['z1-05', 'ie-09'],
  title: { ja: 'GPC制御理論', en: 'GPC Control Theory', id: 'Teori Kontrol GPC' },
  summary: {
    ja: 'ZEVAの手法基盤であるGPC（良品保証工程条件）とGPCバンドの考え方を学び、「範囲で制御する」意味を理解します。',
    en: 'Learn GPC (Good Process Conditions), the method foundation of ZEVA, and the GPC band — what it means to control by range.',
    id: 'Pelajari GPC (Good Process Conditions), fondasi metode ZEVA, dan GPC band — arti mengendalikan berdasarkan rentang.'
  },
  objectives: [
    { ja: 'GPCとGPCバンド（Target・GPC_min・GPC_max）を定義できる', en: 'Define GPC and the GPC band (Target, GPC_min, GPC_max)', id: 'Mendefinisikan GPC dan GPC band (Target, GPC_min, GPC_max)' },
    { ja: 'GPCバンド・規格限界・管理限界の違いを説明できる', en: 'Explain the difference between the GPC band, specification limits and control limits', id: 'Menjelaskan perbedaan GPC band, batas spesifikasi, dan batas kontrol' },
    { ja: '「範囲制御」と「中心狙い（Center-Aiming）」の2段階を説明できる', en: 'Explain the two stages: range control and Center-Aiming', id: 'Menjelaskan dua tahap: kontrol rentang dan Center-Aiming' },
    { ja: 'GPCバンド適合率を計算し、改善の方向を判断できる', en: 'Calculate the band conformance rate and decide the direction of improvement', id: 'Menghitung tingkat kesesuaian band dan menentukan arah perbaikan' }
  ],
  sections: [
    {
      id: 'what',
      title: { ja: 'GPCとは何か', en: 'What is GPC?', id: 'Apa itu GPC?' },
      blocks: [
        { type: 'p', text: {
          ja: '[[gpc]]（Good Process Conditions：良品保証工程条件）は、[[zeva]]の**手法基盤**となる制御理論です。[[theoretical-value]]が「どこを目指すか（あるべき姿）」を示すのに対し、GPCは「どうやってバラツキを制御下に置くか」を示します。',
          en: '[[gpc]] (Good Process Conditions) is the control theory that forms the **method foundation** of [[zeva]]. While the [[theoretical-value|theoretical value]] shows where to aim (the ideal state), GPC shows how to bring variation under control.',
          id: '[[gpc]] (Good Process Conditions) adalah teori kontrol yang menjadi **fondasi metode** [[zeva]]. Jika [[theoretical-value|nilai teoretis]] menunjukkan ke mana harus menuju (kondisi ideal), GPC menunjukkan cara menempatkan variasi di bawah kendali.'
        } },
        { type: 'callout', kind: 'key', title: { ja: 'GPCの定義', en: 'Definition of GPC', id: 'Definisi GPC' }, text: {
          ja: '物理実験により検証された「**良品生成を保証する工程条件の範囲**」',
          en: 'The **range of process conditions that guarantees good products**, verified by physical experiments.',
          id: '**Rentang kondisi proses yang menjamin produk baik**, yang telah diverifikasi melalui eksperimen fisik.'
        } },
        { type: 'p', text: {
          ja: 'GPCの核心は、実際にトライ（物理実験）して「この条件の幅なら良品ができる」ことを確認し、その範囲の中で生産を行うことにあります。この範囲を[[gpc-band]]と呼びます。',
          en: 'The core of GPC is to actually try (physically experiment) and confirm that "within this width of conditions, good products are made", and then to produce within that range. This range is called the [[gpc-band]].',
          id: 'Inti GPC adalah benar-benar mencoba (eksperimen fisik) dan memastikan bahwa "dalam lebar kondisi ini, produk baik dihasilkan", lalu berproduksi di dalam rentang tersebut. Rentang ini disebut [[gpc-band]].'
        } },
        { type: 'layers', items: [
          { label: { ja: 'Layer 1', en: 'Layer 1', id: 'Layer 1' }, title: { ja: '理論値（目的基盤）', en: 'Theoretical value (purpose foundation)', id: 'Nilai teoretis (fondasi tujuan)' }, text: { ja: 'あるべき姿＝Target を定義する', en: 'Defines the ideal state = Target', id: 'Mendefinisikan kondisi ideal = Target' }, tone: 'navy' },
          { label: { ja: 'Layer 2', en: 'Layer 2', id: 'Layer 2' }, title: { ja: 'ハイブリッド・トリアージ', en: 'Hybrid Triage', id: 'Hybrid Triage' }, text: { ja: '課題をQuick / Deepに振り分ける', en: 'Routes issues to Quick / Deep', id: 'Mengarahkan masalah ke Quick / Deep' }, tone: 'blue' },
          { label: { ja: 'Layer 3', en: 'Layer 3', id: 'Layer 3' }, title: { ja: 'GPC制御（手法基盤）← 本モジュール', en: 'GPC control (method foundation) ← this module', id: 'Kontrol GPC (fondasi metode) ← modul ini' }, text: { ja: 'GPC-M / GPC-H でバラツキを範囲内に制御', en: 'Controls variation within range by GPC-M / GPC-H', id: 'Mengendalikan variasi dalam rentang melalui GPC-M / GPC-H' }, tone: 'green' },
          { label: { ja: 'Layer 4', en: 'Layer 4', id: 'Layer 4' }, title: { ja: 'PDCA-S + 7要因 + XY思考', en: 'PDCA-S + 7 factors + XY thinking', id: 'PDCA-S + 7 faktor + berpikir XY' }, text: { ja: '日常運用と原因特定', en: 'Daily operation and cause identification', id: 'Operasi harian dan identifikasi penyebab' }, tone: 'gray' }
        ] }
      ]
    },
    {
      id: 'band',
      title: { ja: 'GPCバンドの3要素', en: 'The three elements of the GPC band', id: 'Tiga elemen GPC band' },
      blocks: [
        { type: 'diagram', name: 'gpc-band', caption: { ja: 'GPCバンド：GPC_min と GPC_max の間で良品が保証され、Target が理論値と一致する', en: 'GPC band: good products are guaranteed between GPC_min and GPC_max; Target matches the theoretical value', id: 'GPC band: produk baik dijamin antara GPC_min dan GPC_max; Target sama dengan nilai teoretis' } },
        { type: 'table',
          head: [ { ja: '要素', en: 'Element', id: 'Elemen' }, { ja: '意味', en: 'Meaning', id: 'Arti' }, { ja: 'どう決めるか', en: 'How it is set', id: 'Cara menetapkan' } ],
          rows: [
            [ 'Target', { ja: '物理的な最高効率・最高品質点。理論値と一致する', en: 'The physically best efficiency and quality point. It matches the theoretical value', id: 'Titik efisiensi dan kualitas terbaik secara fisik. Sama dengan nilai teoretis' }, { ja: '理論・原理と実験から定義', en: 'Defined from theory, physics and experiments', id: 'Ditentukan dari teori, prinsip fisik, dan eksperimen' } ],
            [ 'GPC_min', { ja: '良品が保証される条件の下限', en: 'Lower limit of conditions where good products are guaranteed', id: 'Batas bawah kondisi yang menjamin produk baik' }, { ja: '物理実験（トライ）で確認', en: 'Confirmed by physical trials', id: 'Dikonfirmasi dengan uji coba fisik' } ],
            [ 'GPC_max', { ja: '良品が保証される条件の上限', en: 'Upper limit of conditions where good products are guaranteed', id: 'Batas atas kondisi yang menjamin produk baik' }, { ja: '物理実験（トライ）で確認', en: 'Confirmed by physical trials', id: 'Dikonfirmasi dengan uji coba fisik' } ]
          ],
          caption: { ja: 'GPCバンドの構成', en: 'Structure of the GPC band', id: 'Struktur GPC band' }
        },
        { type: 'example', title: { ja: '例：はんだ付け温度のGPCバンド（数値は説明用）', en: 'Example: GPC band for soldering temperature (illustrative numbers)', id: 'Contoh: GPC band untuk suhu solder (angka ilustrasi)' }, steps: [
          { ja: '温度を 320℃〜380℃ の間で 10℃刻みに振り、各条件で20個ずつ試作する', en: 'Vary the temperature from 320°C to 380°C in 10°C steps and make 20 pieces at each condition', id: 'Variasikan suhu dari 320°C sampai 380°C dengan langkah 10°C dan buat 20 buah pada setiap kondisi' },
          { ja: '330℃以下では濡れ不足、370℃以上では部品の熱ダメージが発生した', en: 'At 330°C or below, wetting was insufficient; at 370°C or above, components were heat-damaged', id: 'Pada 330°C atau lebih rendah, pembasahan kurang; pada 370°C atau lebih, part rusak karena panas' },
          { ja: '340℃〜360℃ ではすべて良品。最も接合状態が良いのは 350℃', en: 'From 340°C to 360°C all pieces were good. The best joint was at 350°C', id: 'Dari 340°C sampai 360°C semua baik. Sambungan terbaik pada 350°C' }
        ], result: { ja: 'GPC_min = 340℃、GPC_max = 360℃、Target = 350℃ と設定する', en: 'Set GPC_min = 340°C, GPC_max = 360°C, Target = 350°C', id: 'Tetapkan GPC_min = 340°C, GPC_max = 360°C, Target = 350°C' } }
      ]
    },
    {
      id: 'thought',
      title: { ja: 'GPCの核心思想：範囲制御と物理的根拠', en: 'Core ideas: range control and physical basis', id: 'Gagasan inti: kontrol rentang dan dasar fisik' },
      blocks: [
        { type: 'cards', cols: 2, items: [
          { icon: '📏', title: { ja: '範囲制御（Range Control）', en: 'Range Control', id: 'Kontrol Rentang (Range Control)' }, text: {
            ja: 'GPCバンドの中にあれば「制御下にある」とみなします。完璧な一点を追いかけるのではなく、良品が保証される**範囲を維持**します。一点狙いは過剰な調整（いじりすぎ）を招き、かえってバラツキを増やすことがあるためです。',
            en: 'If the value is inside the GPC band it is regarded as "under control". Instead of chasing one perfect point, we **keep the range** where good products are guaranteed. Chasing a single point invites over-adjustment (tampering), which can actually increase variation.',
            id: 'Jika nilai berada di dalam GPC band, dianggap "terkendali". Bukan mengejar satu titik sempurna, tetapi **menjaga rentang** yang menjamin produk baik. Mengejar satu titik mendorong penyetelan berlebihan yang justru dapat menambah variasi.'
          }, tone: 'blue' },
          { icon: '🔬', title: { ja: '物理的根拠', en: 'Physical basis', id: 'Dasar fisik' }, text: {
            ja: 'GPCバンドは統計的な管理限界ではなく、**物理実験で検証された良品保証範囲**です。「この範囲なら良品になる」ことを実際のトライで確かめているので、現場が自信を持って守れる根拠になります。',
            en: 'The GPC band is not a statistical control limit but a **good-product range verified by physical experiments**. Because it has been confirmed by real trials that "this range makes good products", the shop floor can keep it with confidence.',
            id: 'GPC band bukan batas kontrol statistik, melainkan **rentang produk baik yang diverifikasi dengan eksperimen fisik**. Karena sudah dikonfirmasi lewat uji coba nyata, lantai produksi dapat menjaganya dengan yakin.'
          }, tone: 'green' }
        ] },
        { type: 'h', text: { ja: 'GPCバンド・規格限界・管理限界の違い', en: 'GPC band vs specification limits vs control limits', id: 'GPC band vs batas spesifikasi vs batas kontrol' } },
        { type: 'table',
          head: [ { ja: '項目', en: 'Item', id: 'Item' }, { ja: '何に対する範囲か', en: 'Range of what', id: 'Rentang untuk apa' }, { ja: '誰が・どう決めるか', en: 'Who / how it is set', id: 'Siapa / bagaimana ditetapkan' }, { ja: '主な使い道', en: 'Main use', id: 'Kegunaan utama' } ],
          rows: [
            [ { ja: '[[spec-limit]]（USL/LSL）', en: '[[spec-limit]] (USL/LSL)', id: '[[spec-limit]] (USL/LSL)' }, { ja: '結果（Y）＝製品特性', en: 'Result (Y) = product characteristic', id: 'Hasil (Y) = karakteristik produk' }, { ja: '設計・顧客要求から決まる', en: 'Set by design / customer requirement', id: 'Ditentukan dari desain / permintaan pelanggan' }, { ja: '合否判定、[[defect-rate]]の集計', en: 'Pass/fail judgment, tallying the [[defect-rate]]', id: 'Penilaian lulus/gagal, penghitungan [[defect-rate]]' } ],
            [ { ja: '[[control-limit]]（UCL/LCL）', en: '[[control-limit]] (UCL/LCL)', id: '[[control-limit]] (UCL/LCL)' }, { ja: '工程データの統計的な振る舞い', en: 'Statistical behaviour of process data', id: 'Perilaku statistik data proses' }, { ja: '実データから ±3σ で計算', en: 'Calculated from actual data (±3σ)', id: 'Dihitung dari data aktual (±3σ)' }, { ja: '安定状態の判定（[[xbar-r-chart]]）', en: 'Judging stability ([[xbar-r-chart]])', id: 'Menilai kestabilan ([[xbar-r-chart]])' } ],
            [ { ja: '[[gpc-band]]', en: '[[gpc-band]]', id: '[[gpc-band]]' }, { ja: '原因（X）＝工程条件', en: 'Cause (X) = process condition', id: 'Penyebab (X) = kondisi proses' }, { ja: '物理実験で良品が出る条件幅を検証', en: 'Condition width verified by physical experiment', id: 'Lebar kondisi diverifikasi dengan eksperimen fisik' }, { ja: '日常の条件管理・逸脱時の停止', en: 'Daily condition control, stop on deviation', id: 'Kontrol kondisi harian, berhenti saat menyimpang' } ]
          ]
        },
        { type: 'callout', kind: 'zeva', title: { ja: 'XY思考とのつながり', en: 'Link to XY thinking', id: 'Hubungan dengan berpikir XY' }, text: {
          ja: '規格限界は結果（Y）を見る範囲、GPCバンドは原因（X）を管理する範囲です。Yが規格外になってから対応するのではなく、XをGPCバンド内に保つことで「良品しかできない状態」を先につくります。',
          en: 'Specification limits look at the result (Y); the GPC band controls the cause (X). Rather than reacting after Y goes out of spec, keeping X inside the GPC band creates a state where only good products can be made.',
          id: 'Batas spesifikasi melihat hasil (Y); GPC band mengendalikan penyebab (X). Daripada bereaksi setelah Y keluar spesifikasi, menjaga X di dalam GPC band menciptakan kondisi di mana hanya produk baik yang dapat dibuat.'
        } },
        { type: 'h', text: { ja: '自工程完結：GPCが成り立った工程の状態', en: 'Own-process completion: the state of a process where GPC holds', id: 'Penyelesaian di proses sendiri: keadaan proses ketika GPC terpenuhi' } },
        { type: 'p', text: {
          ja: '条件（X）がGPCバンドの中にあり、標準作業が守られている工程は、検査を足さなくても良品だけを次工程へ渡せます。この状態を[[own-process-completion]]と呼びます。新しい原則や手法ではありません。[[gpc-m]] / [[gpc-h]]が成り立った結果として工程に現れる状態であり、工程の出口に置く責任の持ち方です。',
          en: 'A process whose conditions (X) are inside the GPC band and whose standard work is followed can hand only good products to the next process without adding inspection. This state is called [[own-process-completion]]. It is not a new principle or method. It is the state that appears in a process as a result of [[gpc-m]] / [[gpc-h]] holding, and a way of placing responsibility at the exit of the process.',
          id: 'Proses yang kondisinya (X) berada di dalam GPC band dan kerja standarnya dipatuhi dapat menyerahkan hanya produk baik ke proses berikutnya tanpa menambah inspeksi. Keadaan ini disebut [[own-process-completion]]. Ini bukan prinsip atau metode baru. Ini adalah keadaan yang muncul di proses sebagai hasil terpenuhinya [[gpc-m]] / [[gpc-h]], dan cara menempatkan tanggung jawab di pintu keluar proses.'
        } },
        { type: 'list', items: [
          { ja: '**受け取らない・造らない・流さない**：不良を前工程から受け取らず、自工程で造らず、次工程へ流しません。責任の境界は工程の出口に置きます。', en: '**Do not accept, do not make, do not pass on**: do not accept defects from the previous process, do not make them in your own, and do not pass them to the next. The boundary of responsibility sits at the exit of the process.', id: '**Tidak menerima, tidak membuat, tidak meneruskan**: tidak menerima cacat dari proses sebelumnya, tidak membuatnya di proses sendiri, dan tidak meneruskannya ke proses berikutnya. Batas tanggung jawab berada di pintu keluar proses.' },
          { ja: '**自工程で検査を増やすことではない**：検査は結果（Y）を選り分ける行為で、足せば[[required-cost]]を超えます。条件（X）をバンドの中に収め、検査が要らない状態をつくります。', en: '**It does not mean adding inspection in your own process**: inspection only sorts the result (Y), and adding it pushes you past the [[required-cost]]. Keep the conditions (X) inside the band and create a state where inspection is not needed.', id: '**Bukan berarti menambah inspeksi di proses sendiri**: inspeksi hanya memilah hasil (Y), dan menambahnya membuat [[required-cost]] terlampaui. Jaga kondisi (X) di dalam band dan ciptakan keadaan di mana inspeksi tidak diperlukan.' },
          { ja: '**良し悪しの基準は[[required-quality]]**：基準を上積みすれば[[over-quality]]になり、コストだけが増えます。', en: '**The standard for good or bad is the [[required-quality]]**: stacking extra criteria on top leads to [[over-quality]], which only adds cost.', id: '**Dasar baik atau buruk adalah [[required-quality]]**: menambah kriteria di atasnya menghasilkan [[over-quality]], yang hanya menambah biaya.' },
          { ja: '**成り立たせる手段**：設備はGPCバンドと逸脱時の即時停止、人は標準作業と[[judgment-criteria]]、保留の規定。成り立っているかどうかは[[outflow-rate]]で測ります。', en: '**What makes it hold**: for machines, the GPC band and an immediate stop on deviation; for people, standard work, [[judgment-criteria]] and a hold rule. Whether it holds is measured with the [[outflow-rate]].', id: '**Sarana untuk mewujudkannya**: untuk mesin, GPC band dan penghentian segera saat menyimpang; untuk manusia, kerja standar, [[judgment-criteria]], dan aturan penahanan. Terpenuhi atau tidaknya diukur dengan [[outflow-rate]].' }
        ] },
        { type: 'check', q: { ja: '自工程完結の説明として正しいものはどれ？', en: 'Which statement about own-process completion is correct?', id: 'Pernyataan mana tentang penyelesaian di proses sendiri yang benar?' }, choices: [
          { ja: '各工程の出口に検査を追加して、不良を選り分けること', en: 'Adding an inspection at the exit of each process to sort out defects', id: 'Menambah inspeksi di pintu keluar setiap proses untuk memilah cacat' },
          { ja: '条件（X）をバンド内に保ち、検査を足さなくても良品だけを渡せる状態', en: 'A state where conditions (X) are kept in the band so that only good products are handed on without added inspection', id: 'Keadaan di mana kondisi (X) dijaga di dalam band sehingga hanya produk baik yang diserahkan tanpa inspeksi tambahan' },
          { ja: '要求品質より厳しい基準を自工程で独自に設けること', en: 'Setting your own criteria stricter than the required quality', id: 'Menetapkan kriteria sendiri yang lebih ketat daripada kualitas yang diminta' }
        ], answer: 1, explain: {
          ja: '検査は結果（Y）を選り分けるだけで、足せば要求コストを超えます。③は過剰品質です。自工程完結は、GPCが成り立った工程に現れる状態を指します。',
          en: 'Inspection only sorts the result (Y), and adding it exceeds the required cost. Option 3 is over-quality. Own-process completion is the state that appears in a process where GPC holds.',
          id: 'Inspeksi hanya memilah hasil (Y), dan menambahnya melampaui biaya yang diminta. Pilihan 3 adalah kualitas berlebih. Penyelesaian di proses sendiri adalah keadaan yang muncul di proses ketika GPC terpenuhi.'
        } },
        { type: 'check', q: { ja: 'GPCバンドの説明として正しいものはどれ？', en: 'Which statement about the GPC band is correct?', id: 'Pernyataan mana tentang GPC band yang benar?' }, choices: [
          { ja: '過去データの平均±3σで計算した統計的な範囲', en: 'A statistical range calculated as mean ±3σ of past data', id: 'Rentang statistik yang dihitung dari rata-rata ±3σ data masa lalu' },
          { ja: '物理実験で良品が保証されると確認した工程条件の範囲', en: 'A range of process conditions confirmed by physical experiment to guarantee good products', id: 'Rentang kondisi proses yang dikonfirmasi eksperimen fisik menjamin produk baik' },
          { ja: '顧客が図面で指定する製品寸法の許容範囲', en: 'The product dimension tolerance specified by the customer on the drawing', id: 'Toleransi dimensi produk yang ditentukan pelanggan di gambar' }
        ], answer: 1, explain: {
          ja: 'GPCバンドは物理的根拠を持つ「工程条件（X）」の範囲です。①は管理限界、③は規格限界の説明です。',
          en: 'The GPC band is a physically grounded range of process conditions (X). Option 1 describes control limits; option 3 describes specification limits.',
          id: 'GPC band adalah rentang kondisi proses (X) yang berdasar fisik. Pilihan 1 menjelaskan batas kontrol; pilihan 3 menjelaskan batas spesifikasi.'
        } }
      ]
    },
    {
      id: 'scope',
      title: { ja: 'GPCは品質だけの手法ではない', en: 'GPC is not a quality-only method', id: 'GPC bukan metode khusus kualitas' },
      blocks: [
        { type: 'p', text: {
          ja: '「良品保証工程条件」という名前から、GPCは品質の手法だと読まれがちです。しかし**バンドの幅は良品範囲（品質）が決め、バンドの中のTargetは理論値、すなわち物理的な最高効率・最高品質点が決めます**。つまりGPCは、品質を制約として、その中で理論値に近づける条件制御です。',
          en: 'The name "conditions that guarantee good products" makes GPC look like a quality method. But **the width of the band is set by the good-part range (quality), while the Target inside it is set by the theoretical value — the point of physically highest efficiency and quality**. GPC is therefore condition control that moves toward the theoretical value within a constraint of quality.',
          id: 'Nama "kondisi proses yang menjamin produk baik" membuat GPC tampak seperti metode kualitas. Namun **lebar band ditentukan oleh rentang produk baik (kualitas), sedangkan Target di dalamnya ditentukan oleh nilai teoretis — titik dengan efisiensi dan kualitas tertinggi secara fisik**. Jadi GPC adalah kendali kondisi yang mendekati nilai teoretis dalam batasan kualitas.'
        } },
        { type: 'compare',
          left: { title: { ja: 'バンドの幅を決めるもの', en: 'What sets the width of the band', id: 'Yang menentukan lebar band' }, tone: 'blue', items: [
            { ja: '[[good-range]]（品質）。物理実験で「この範囲なら良品」を確かめる', en: 'The [[good-range]] (quality). Physical trials confirm "inside this range we get good parts"', id: '[[good-range]] (kualitas). Uji fisik memastikan "di dalam rentang ini produknya baik"' },
            { ja: 'はみ出せば不良。だから範囲を外れたら止める', en: 'Outside it you get defects, so you stop when a condition leaves the band', id: 'Di luar itu muncul cacat, jadi hentikan saat kondisi keluar dari band' }
          ] },
          right: { title: { ja: 'バンドの中のTargetを決めるもの', en: 'What sets the Target inside the band', id: 'Yang menentukan Target di dalam band' }, tone: 'green', items: [
            { ja: '理論値（効率）。物理的な最高効率・最高品質点', en: 'The theoretical value (efficiency): the point of physically highest efficiency and quality', id: 'Nilai teoretis (efisiensi): titik efisiensi dan kualitas tertinggi secara fisik' },
            { ja: 'だからGPCは、品質を守りながら速さや安定も取りにいく', en: 'So GPC pursues speed and stability too, while protecting quality', id: 'Jadi GPC juga mengejar kecepatan dan kestabilan sambil menjaga kualitas' }
          ] }
        },
        { type: 'h', text: { ja: 'ロス構造図の5つのロスを何で受けるか', en: 'What handles each of the five losses in the loss structure', id: 'Apa yang menangani lima kerugian dalam struktur kerugian' } },
        { type: 'p', text: {
          ja: '無価値作業の5つのロス（[[loss-structure]]）は、すべてGPCバンドで受けるわけではありません。条件を範囲で決められるものはGPCバンドで受け、作業の順序や配置で決まるものは標準作業とECRSで受けます。どちらも[[gpc-h]]の手段であり、GPCの外に出るわけではありません。',
          en: 'The five losses inside non-value work ([[loss-structure]]) are not all received by the GPC band. What can be set as a range of conditions goes to the GPC band; what is decided by work sequence and layout goes to standard work and ECRS. Standard work and ECRS are both means of [[gpc-h]], so neither falls outside GPC.',
          id: 'Lima kerugian di dalam pekerjaan tanpa nilai ([[loss-structure]]) tidak semuanya ditangani GPC band. Yang dapat ditetapkan sebagai rentang kondisi ditangani GPC band; yang ditentukan urutan dan tata letak kerja ditangani kerja standar dan ECRS. Kerja standar dan ECRS keduanya adalah sarana [[gpc-h]], jadi tidak ada yang berada di luar GPC.'
        } },
        { type: 'table',
          head: [ { ja: 'ロス', en: 'Loss', id: 'Kerugian' }, { ja: '主な受け皿', en: 'Mainly handled by', id: 'Ditangani terutama oleh' }, { ja: '決め方', en: 'How it is set', id: 'Cara menetapkannya' } ],
          rows: [
            [ { ja: '動作ロス', en: 'Motion loss', id: 'Kerugian gerakan' }, { ja: '[[gpc-h]]（標準作業・動作安定の原理）', en: '[[gpc-h]] (standard work, motion-stability principles)', id: '[[gpc-h]] (kerja standar, prinsip stabilitas gerakan)' }, { ja: '動作の距離・数・自由度を決める。範囲ではなく手順と配置で決まる', en: 'Set the distance, count and freedom of motions. Decided by procedure and layout, not by a range', id: 'Tetapkan jarak, jumlah, dan kebebasan gerakan. Ditentukan prosedur dan tata letak, bukan rentang' } ],
            [ { ja: '停止ロス（Stop）', en: 'Stop loss', id: 'Kerugian henti' }, { ja: '[[gpc-m]]（操作ミスは[[gpc-h]]）', en: '[[gpc-m]] (operating errors go to [[gpc-h]])', id: '[[gpc-m]] (kesalahan operasi ke [[gpc-h]])' }, { ja: '設備条件をGPCバンド内に保ち、チョコ停・故障の芽を潰す。故障・材料待ちは設備と材料の管理で受ける', en: 'Keep equipment conditions inside the band and remove the seeds of minor stops and breakdowns. Breakdowns and material waiting go to equipment and material management', id: 'Jaga kondisi peralatan di dalam GPC band dan hilangkan penyebab awal henti kecil dan kerusakan. Kerusakan dan menunggu material ditangani manajemen peralatan dan material' } ],
            [ { ja: '速度ロス（Slow）', en: 'Speed loss', id: 'Kerugian kecepatan' }, { ja: '[[gpc-m]]（人の作業は[[gpc-h]]）', en: '[[gpc-m]] (human work goes to [[gpc-h]])', id: '[[gpc-m]] (kerja manusia ke [[gpc-h]])' }, { ja: '設備は基準速度をGPCバンドで保ち、人の作業は標準CTを標準作業で保つ', en: 'Equipment holds the standard speed with the band; human work holds the standard CT with standard work', id: 'Peralatan menjaga kecepatan standar dengan GPC band; kerja manusia menjaga CT standar dengan kerja standar' } ],
            [ { ja: '品質ロス（Defect）', en: 'Quality loss', id: 'Kerugian kualitas' }, { ja: '[[gpc-m]] / [[gpc-h]]', en: '[[gpc-m]] / [[gpc-h]]', id: '[[gpc-m]] / [[gpc-h]]' }, { ja: '良品範囲を物理実験で確かめてGPCバンドにする。GPCの原点はここにある', en: 'Confirm the good-part range by physical trials and fix it as the band. This is where GPC starts', id: 'Pastikan rentang produk baik lewat uji fisik dan tetapkan sebagai GPC band. Di sinilah GPC bermula' } ],
            [ { ja: '流れロス（Flow）', en: 'Flow loss', id: 'Kerugian aliran' }, { ja: '[[gpc-h]]（標準作業・管理。GPCバンドの対象外）', en: '[[gpc-h]] (standard work and management; outside the GPC band)', id: '[[gpc-h]] (kerja standar dan manajemen; di luar GPC band)' }, { ja: '仕掛の上限や工程間搬送の頻度を決める。工程間の設計で受ける', en: 'Set the WIP cap and the frequency of transport between processes. Handled by the design of the flow between processes', id: 'Tetapkan batas WIP dan frekuensi pengangkutan antar proses. Ditangani lewat desain aliran antar proses' } ]
          ],
          caption: { ja: '準価値作業は工法・設備・製品設計で縮める。GPCバンドではなく、技術ロスとして理論値とのギャップで管理する', en: 'Semi-value work is shortened by method, equipment and product design: not by the band, but managed as technical loss against the theoretical value', id: 'Kerja semi-bernilai dipersingkat lewat metode, peralatan, dan desain produk: bukan oleh GPC band, tetapi dikelola sebagai kerugian teknis terhadap nilai teoretis' }
        },
        { type: 'callout', kind: 'note', title: { ja: 'Quick GPC / Deep GPC は品質の課題に限らない', en: 'Quick GPC / Deep GPC are not only for quality problems', id: 'Quick GPC / Deep GPC bukan hanya untuk masalah kualitas' }, text: {
          ja: 'Quick GPCとDeep GPCは改善の進め方の呼び名です。不良だけでなく、CTが遅い、チョコ停が多い、仕掛が溜まるといった課題にもそのまま使います。',
          en: 'Quick GPC and Deep GPC are names for how improvement is run. They apply to slow CT, frequent minor stops and piled-up WIP just as much as to defects.',
          id: 'Quick GPC dan Deep GPC adalah nama cara menjalankan perbaikan. Keduanya berlaku untuk CT lambat, henti kecil yang sering, dan WIP menumpuk, sama seperti untuk cacat.'
        } }
      ]
    },
    {
      id: 'stages',
      title: { ja: '「ゼロ」の2段階：バンド内収束と中心狙い', en: 'The two stages of "Zero": in-band and Center-Aiming', id: 'Dua tahap "Zero": dalam band dan Center-Aiming' },
      blocks: [
        { type: 'p', text: {
          ja: 'ZEVAの「Zero Variation」は、バラツキが完全に消えることではありません。「**バラツキが制御下にあり、良品が保証され、かつ理論値への収束を継続している状態**」を意味します。GPCはこれを2段階で実現します。',
          en: 'In ZEVA, "Zero Variation" does not mean variation disappears completely. It means "**variation is under control, good products are guaranteed, and convergence toward the theoretical value continues**". GPC realises this in two stages.',
          id: 'Dalam ZEVA, "Zero Variation" tidak berarti variasi hilang sepenuhnya. Artinya "**variasi terkendali, produk baik terjamin, dan konvergensi menuju nilai teoretis terus berlangsung**". GPC mewujudkannya dalam dua tahap.'
        } },
        { type: 'flow', dir: 'h', nodes: [
          { title: { ja: '現状', en: 'Current state', id: 'Kondisi saat ini' }, text: { ja: '条件がバンド外に出ることがある（不良リスク）', en: 'Conditions sometimes leave the band (defect risk)', id: 'Kondisi kadang keluar band (risiko cacat)' }, tone: 'red' },
          { title: { ja: '第一段階（必達）', en: 'Stage 1 (must)', id: 'Tahap 1 (wajib)' }, text: { ja: '全パラメータをGPCバンド内に収束 = Variation Under Control', en: 'All parameters converge inside the GPC band = Variation Under Control', id: 'Semua parameter konvergen di dalam GPC band = Variation Under Control' }, tone: 'amber' },
          { title: { ja: '第二段階（指向）', en: 'Stage 2 (aim)', id: 'Tahap 2 (arah)' }, text: { ja: '分布の中心をTarget（理論値）に近づける = Center-Aiming', en: 'Move the distribution centre toward Target (theoretical value) = Center-Aiming', id: 'Geser pusat distribusi ke Target (nilai teoretis) = Center-Aiming' }, tone: 'green' }
        ] },
        { type: 'p', text: {
          ja: 'なぜ順番が大切なのでしょうか。バラツキが大きいまま中心だけを動かしても、分布の裾がバンドからはみ出して不良が出ます。また、安定していない工程のデータは信頼できないため、「中心がどこにあるか」自体が正しく分かりません（[[root-logic]]）。まずバラツキを小さくしてバンド内に収め、その後で[[center-aiming]]を行います。',
          en: 'Why does the order matter? If you only move the centre while variation is still large, the tails of the distribution spill out of the band and defects occur. Also, data from an unstable process is unreliable, so you cannot even know correctly where the centre is ([[root-logic]]). First shrink variation to fit inside the band, then perform [[center-aiming]].',
          id: 'Mengapa urutannya penting? Jika hanya menggeser pusat saat variasi masih besar, ekor distribusi keluar dari band dan terjadi cacat. Selain itu, data dari proses yang tidak stabil tidak dapat dipercaya, sehingga letak pusat pun tidak dapat diketahui dengan benar ([[root-logic]]). Pertama kecilkan variasi agar masuk band, lalu lakukan [[center-aiming]].'
        } },
        { type: 'widget', name: 'gpc-band', props: {} },
        { type: 'callout', kind: 'tip', title: { ja: 'シミュレーターの使い方', en: 'How to use the simulator', id: 'Cara menggunakan simulator' }, text: {
          ja: '①まず「バラツキ」を小さくしてバンド適合率が上がるのを確認し、②次に中心をTargetへ寄せてみましょう。逆の順番で操作すると何が起きるかも試してください。',
          en: 'First reduce the variation and watch the conformance rate rise, then move the centre toward Target. Also try the reverse order and see what happens.',
          id: 'Pertama kurangi variasi dan lihat tingkat kesesuaian naik, lalu geser pusat ke Target. Coba juga urutan sebaliknya dan lihat apa yang terjadi.'
        } }
      ]
    },
    {
      id: 'conformance',
      title: { ja: 'GPCバンド適合率で評価する', en: 'Evaluating with the band conformance rate', id: 'Evaluasi dengan tingkat kesesuaian band' },
      blocks: [
        { type: 'formula', expr: {
          ja: 'GPCバンド適合率 = GPCバンド内の測定数 ÷ 全測定数 × 100%',
          en: 'Band conformance rate = measurements inside GPC band ÷ total measurements × 100%',
          id: 'Tingkat kesesuaian band = jumlah pengukuran dalam GPC band ÷ total pengukuran × 100%'
        }, note: {
          ja: 'ZEVAの目標値は ≧ 99%。GPC-M（設備制御）の代表的な評価指標です。',
          en: 'ZEVA target: ≥ 99%. A key metric of GPC-M (machine control).',
          id: 'Target ZEVA: ≥ 99%. Metrik utama GPC-M (kontrol mesin).'
        } },
        { type: 'example', title: { ja: '計算例（数値は説明用）', en: 'Worked example (illustrative numbers)', id: 'Contoh perhitungan (angka ilustrasi)' }, steps: [
          { ja: '1日3回×20日間、合計60回の温度記録を取った', en: 'Temperature was recorded 3 times a day for 20 days: 60 records in total', id: 'Suhu dicatat 3 kali sehari selama 20 hari: total 60 catatan' },
          { ja: 'そのうちGPCバンド（340〜360℃）内は 57回、外は 3回', en: '57 records were inside the GPC band (340–360°C), 3 were outside', id: '57 catatan di dalam GPC band (340–360°C), 3 di luar' },
          { ja: '57 ÷ 60 × 100 = 95%', en: '57 ÷ 60 × 100 = 95%', id: '57 ÷ 60 × 100 = 95%' }
        ], result: { ja: '目標99%に未達。逸脱の原因（X）を調べ、トリアージにかける', en: 'Below the 99% target. Investigate the cause (X) of the deviations and run triage', id: 'Di bawah target 99%. Selidiki penyebab (X) penyimpangan dan lakukan triase' } },
        { type: 'callout', kind: 'warn', title: { ja: 'バンド逸脱時の原則', en: 'Rule on band deviation', id: 'Aturan saat keluar band' }, text: {
          ja: 'GPCバンドを逸脱したら、**即座に生産を停止し原因を究明**します。そのうえでトリアージ判定を行い、原因仮説があり低リスクならQuick GPCで即時調整、根本原因が不明ならDeep GPCを起動します。',
          en: 'When the GPC band is exceeded, **stop production immediately and investigate the cause**. Then run triage: if there is a cause hypothesis and low risk, adjust immediately with Quick GPC; if the root cause is unknown, start Deep GPC.',
          id: 'Saat GPC band terlampaui, **segera hentikan produksi dan selidiki penyebabnya**. Lalu lakukan triase: jika ada hipotesis penyebab dan risiko rendah, sesuaikan segera dengan Quick GPC; jika akar penyebab tidak diketahui, mulai Deep GPC.'
        } },
        { type: 'callout', kind: 'note', title: { ja: 'GPCは設備だけのものではない', en: 'GPC is not only for machines', id: 'GPC tidak hanya untuk mesin' }, text: {
          ja: 'GPCの考え方は、設備パラメータを範囲で制御する[[gpc-m]]と、人の作業バラツキを標準化で排除する[[gpc-h]]の二元構造で使われます。詳細は次のモジュールで学びます。',
          en: 'The GPC idea is used in a dual structure: [[gpc-m]] controls machine parameters by range, and [[gpc-h]] eliminates human work variation through standardization. You will learn the details in the next module.',
          id: 'Gagasan GPC digunakan dalam struktur ganda: [[gpc-m]] mengendalikan parameter mesin berdasarkan rentang, dan [[gpc-h]] menghilangkan variasi kerja manusia melalui standardisasi. Detailnya dipelajari di modul berikutnya.'
        } }
      ]
    }
  ],
  keyPoints: [
    { ja: 'GPC＝物理実験で検証された「良品を保証する工程条件の範囲」。ZEVAの手法基盤', en: 'GPC = the range of process conditions that guarantees good products, verified by physical experiments. The method foundation of ZEVA', id: 'GPC = rentang kondisi proses yang menjamin produk baik, diverifikasi eksperimen fisik. Fondasi metode ZEVA' },
    { ja: 'GPCバンド＝GPC_min〜GPC_max、Targetは理論値と一致', en: 'GPC band = GPC_min to GPC_max; Target matches the theoretical value', id: 'GPC band = GPC_min sampai GPC_max; Target sama dengan nilai teoretis' },
    { ja: 'GPCバンドは原因（X）の範囲。規格限界（Y）や管理限界（統計）とは別物', en: 'The GPC band is a range for causes (X), different from spec limits (Y) and control limits (statistics)', id: 'GPC band adalah rentang penyebab (X), berbeda dari batas spesifikasi (Y) dan batas kontrol (statistik)' },
    { ja: '第一段階はバンド内収束（必達）、第二段階はCenter-Aiming（指向）', en: 'Stage 1: converge inside the band (must); Stage 2: Center-Aiming (aim)', id: 'Tahap 1: konvergen dalam band (wajib); Tahap 2: Center-Aiming (arah)' },
    { ja: 'GPCバンド適合率の目標は≧99%。逸脱時は即停止→原因究明→トリアージ', en: 'Band conformance target ≥ 99%. On deviation: stop → investigate → triage', id: 'Target kesesuaian band ≥ 99%. Saat menyimpang: berhenti → selidiki → triase' }
  ],
  quiz: [
    { q: { ja: 'GPCの正式名称として正しいものは？', en: 'What does GPC stand for?', id: 'Apa kepanjangan GPC?' }, choices: [
      { ja: 'General Production Control', en: 'General Production Control', id: 'General Production Control' },
      { ja: 'Good Process Conditions（良品保証工程条件）', en: 'Good Process Conditions', id: 'Good Process Conditions' },
      { ja: 'Guided Parameter Check', en: 'Guided Parameter Check', id: 'Guided Parameter Check' },
      { ja: 'Global Process Capability', en: 'Global Process Capability', id: 'Global Process Capability' }
    ], answer: 1, explain: { ja: 'GPC＝Good Process Conditions。良品生成を保証する工程条件の範囲です。', en: 'GPC = Good Process Conditions: the range of process conditions that guarantees good products.', id: 'GPC = Good Process Conditions: rentang kondisi proses yang menjamin produk baik.' } },
    { q: { ja: 'GPCバンドの Target は何と一致する？', en: 'The Target of the GPC band matches what?', id: 'Target GPC band sama dengan apa?' }, choices: [
      { ja: '過去データの平均値', en: 'The mean of past data', id: 'Rata-rata data masa lalu' },
      { ja: '規格の中央値', en: 'The midpoint of the specification', id: 'Titik tengah spesifikasi' },
      { ja: '理論値', en: 'The theoretical value', id: 'Nilai teoretis' },
      { ja: 'ベテラン作業者の設定値', en: 'The setting of a veteran operator', id: 'Setelan operator senior' }
    ], answer: 2, explain: { ja: 'Targetは物理的な最高効率・最高品質点で、理論値と一致します。', en: 'Target is the physically best efficiency/quality point and matches the theoretical value.', id: 'Target adalah titik efisiensi/kualitas terbaik secara fisik dan sama dengan nilai teoretis.' } },
    { q: { ja: 'GPCバンドと管理限界の違いとして正しいのは？', en: 'Which is a correct difference between the GPC band and control limits?', id: 'Manakah perbedaan yang benar antara GPC band dan batas kontrol?' }, choices: [
      { ja: 'GPCバンドは物理実験で検証、管理限界はデータから統計的に計算', en: 'The GPC band is verified by physical experiment; control limits are calculated statistically from data', id: 'GPC band diverifikasi eksperimen fisik; batas kontrol dihitung statistik dari data' },
      { ja: '両者は同じもので呼び方が違うだけ', en: 'They are the same thing with different names', id: 'Keduanya sama, hanya beda nama' },
      { ja: 'GPCバンドは顧客が決め、管理限界は設計者が決める', en: 'Customers set the GPC band; designers set control limits', id: 'Pelanggan menetapkan GPC band; perancang menetapkan batas kontrol' },
      { ja: '管理限界は常にGPCバンドより広い', en: 'Control limits are always wider than the GPC band', id: 'Batas kontrol selalu lebih lebar dari GPC band' }
    ], answer: 0, explain: { ja: 'GPCバンドは「物理的根拠」、管理限界は「統計的根拠」です。広さの大小関係に決まりはありません。', en: 'The GPC band has a physical basis; control limits have a statistical basis. There is no fixed rule about which is wider.', id: 'GPC band berdasar fisik; batas kontrol berdasar statistik. Tidak ada aturan tetap mana yang lebih lebar.' } },
    { q: { ja: '「範囲制御」の考え方として正しいのは？', en: 'Which describes "range control" correctly?', id: 'Manakah yang benar tentang "kontrol rentang"?' }, choices: [
      { ja: '毎回Targetぴったりになるよう、少しでもずれたら調整する', en: 'Adjust whenever the value moves even slightly, so it is always exactly on Target', id: 'Setel setiap kali nilai bergeser sedikit agar selalu tepat di Target' },
      { ja: 'GPCバンド内なら制御下とみなし、範囲を維持する', en: 'If within the GPC band it is under control; keep the range', id: 'Jika di dalam GPC band dianggap terkendali; jaga rentangnya' },
      { ja: '規格内であれば条件は自由に変えてよい', en: 'Conditions can be changed freely as long as the product is within spec', id: 'Kondisi boleh diubah bebas selama produk dalam spesifikasi' },
      { ja: 'バンドは広いほど良い', en: 'The wider the band, the better', id: 'Semakin lebar band, semakin baik' }
    ], answer: 1, explain: { ja: '一点を追いかけると過剰調整でかえってバラツキが増えることがあります。良品保証範囲を維持するのが範囲制御です。', en: 'Chasing one point can cause over-adjustment and more variation. Range control keeps the guaranteed range.', id: 'Mengejar satu titik dapat menyebabkan penyetelan berlebihan dan variasi bertambah. Kontrol rentang menjaga rentang yang dijamin.' } },
    { q: { ja: 'ZEVAの「ゼロ」の第一段階（必達）はどれ？', en: 'Which is Stage 1 (must) of ZEVA "Zero"?', id: 'Manakah Tahap 1 (wajib) dari "Zero" ZEVA?' }, choices: [
      { ja: 'バラツキを完全に消滅させる', en: 'Eliminate variation completely', id: 'Menghilangkan variasi sepenuhnya' },
      { ja: '分布の中心をTargetに合わせる', en: 'Align the distribution centre with Target', id: 'Menyelaraskan pusat distribusi dengan Target' },
      { ja: '全パラメータをGPCバンド内に収束させる', en: 'Make all parameters converge inside the GPC band', id: 'Membuat semua parameter konvergen di dalam GPC band' },
      { ja: 'デジタル化でリアルタイム監視を導入する', en: 'Introduce real-time monitoring with digitalisation', id: 'Menerapkan pemantauan real-time dengan digitalisasi' }
    ], answer: 2, explain: { ja: '第一段階はVariation Under Control（バンド内収束）、第二段階がCenter-Aimingです。', en: 'Stage 1 is Variation Under Control (in-band); Stage 2 is Center-Aiming.', id: 'Tahap 1 adalah Variation Under Control (dalam band); Tahap 2 adalah Center-Aiming.' } },
    { q: { ja: '200回の記録のうち196回がバンド内だった。GPCバンド適合率と判定は？', en: '196 of 200 records were inside the band. What is the conformance rate and judgment?', id: '196 dari 200 catatan di dalam band. Berapa tingkat kesesuaian dan penilaiannya?' }, choices: [
      { ja: '98%、目標（≧99%）未達', en: '98%, below target (≥ 99%)', id: '98%, di bawah target (≥ 99%)' },
      { ja: '98%、目標達成', en: '98%, target achieved', id: '98%, target tercapai' },
      { ja: '96%、目標未達', en: '96%, below target', id: '96%, di bawah target' },
      { ja: '99.5%、目標達成', en: '99.5%, target achieved', id: '99,5%, target tercapai' }
    ], answer: 0, explain: { ja: '196 ÷ 200 = 98%。目標99%には届いていません。', en: '196 ÷ 200 = 98%, below the 99% target.', id: '196 ÷ 200 = 98%, di bawah target 99%.' } },
    { q: { ja: 'GPCバンドを逸脱したときの最初の対応は？', en: 'What is the first response when the GPC band is exceeded?', id: 'Apa respons pertama saat GPC band terlampaui?' }, choices: [
      { ja: '記録だけして生産を続け、月末に分析する', en: 'Just record it, keep producing, analyse at month end', id: 'Cukup catat, lanjutkan produksi, analisis di akhir bulan' },
      { ja: 'バンドを広げて逸脱をなくす', en: 'Widen the band so there is no deviation', id: 'Perlebar band agar tidak ada penyimpangan' },
      { ja: '即座に生産停止し、原因究明してトリアージ判定する', en: 'Stop production immediately, investigate and run triage', id: 'Segera hentikan produksi, selidiki, dan lakukan triase' },
      { ja: '検査を厳しくして不良を流出させない', en: 'Tighten inspection so no defects escape', id: 'Perketat inspeksi agar cacat tidak lolos' }
    ], answer: 2, explain: { ja: '運用プロトコルでは逸脱時は即停止→原因究明→トリアージです。検査強化はYの直接操作でNGです。', en: 'The protocol is stop → investigate → triage. Tightening inspection manipulates Y directly and is a "don’t".', id: 'Protokolnya berhenti → selidiki → triase. Memperketat inspeksi berarti memanipulasi Y langsung dan dilarang.' } }
  ]
});
