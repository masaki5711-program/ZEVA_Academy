(function () {
  const T = (ja, en, id) => ({ ja, en, id });

  ZA.addModule({
    id: 'z1-04',
    track: 'z1',
    order: 4,
    minutes: 45,
    icon: '📐',
    level: 2,
    prereq: ['z1-03', 'ie-04'],
    title: T('理論値', 'Theoretical value', 'Nilai teoretis'),
    summary: T(
      'ZEVAの目的基盤である理論値。作業の3分類と「境界」、現場理論値と技術理論値、管理ロスと技術ロス、価値作業比率を学びます。',
      'The theoretical value is the purpose foundation of ZEVA. Learn the 3 work categories and their "boundaries", site vs technical theoretical value, management vs technical loss, and the value-work ratio.',
      'Nilai teoretis adalah fondasi tujuan ZEVA. Pelajari 3 kategori kerja dan "batasnya", nilai teoretis lapangan vs teknis, kerugian manajemen vs teknis, dan rasio kerja bernilai.'
    ),
    objectives: [
      T('分析的アプローチと設計的アプローチ（絶対値思考）の違いを説明できる', 'Explain the difference between the analytic approach and the design approach (absolute-value thinking)', 'Menjelaskan perbedaan pendekatan analitis dan pendekatan desain (berpikir nilai absolut)'),
      T('作業を価値・準価値・無価値に分類し、その「境界」を説明できる', 'Classify work into value, semi-value and non-value and explain their "boundaries"', 'Mengklasifikasikan kerja menjadi bernilai, semi-bernilai, dan tidak bernilai serta menjelaskan "batasnya"'),
      T('現場理論値・技術理論値と、管理ロス・技術ロスを算出できる', 'Calculate site/technical theoretical values and management/technical loss', 'Menghitung nilai teoretis lapangan/teknis dan kerugian manajemen/teknis'),
      T('価値作業比率を計算し、目標水準を説明できる', 'Calculate the value-work ratio and explain target levels', 'Menghitung rasio kerja bernilai dan menjelaskan tingkat target'),
      T('要求品質・要求コスト・過剰品質の関係を説明し、工程バラツキをどこに収めるか判断できる', 'Explain how required quality, required cost and over-quality relate, and judge where process variation must sit', 'Menjelaskan hubungan kualitas yang diminta, biaya yang diminta, dan kualitas berlebihan, serta menilai di mana variasi proses harus berada')
    ],
    sections: [
      {
        id: 'what',
        title: T('理論値とは：価値作業だけを最速で流す', 'What the theoretical value is: flow only value work, at top speed', 'Apa itu nilai teoretis: alirkan hanya kerja bernilai, secepat mungkin'),
        blocks: [
          { type: 'p', text: T(
            '[[theoretical-value]]とは、「**価値作業だけを最速で流し、それ以外はすべてロスとして削る**」という思想です。単なる生産性向上の手法ではなく、経営に貢献する現場力をつくる継続的な改革・改善活動そのものを指します。',
            '[[theoretical-value]] is the idea of "**flowing only value work at top speed and cutting everything else as loss**". It is not just a productivity technique but continuous reform and improvement activity that builds shop-floor capability contributing to the business.',
            '[[theoretical-value]] adalah pemikiran "**hanya mengalirkan kerja bernilai secepat mungkin dan memangkas semua yang lain sebagai kerugian**". Ini bukan sekadar teknik produktivitas, melainkan kegiatan reformasi dan perbaikan berkelanjutan yang membangun kemampuan lini untuk berkontribusi pada bisnis.'
          ) },
          { type: 'h', text: T('ZEVAが継承する理論値の核心', 'The core of the theoretical-value approach that ZEVA inherits', 'Inti nilai teoretis yang diwarisi ZEVA') },
          { type: 'cards', cols: 3, items: [
            { icon: '🎯', tone: 'blue', title: T('理論値の明確化', 'Clarify the theoretical value', 'Perjelas nilai teoretis'), text: T('あるべき姿を物理的・技術的に定義する', 'Define the ideal state physically and technically', 'Mendefinisikan kondisi ideal secara fisik dan teknis') },
            { icon: '🧭', tone: 'green', title: T('絶対値思考', 'Absolute-value thinking', 'Berpikir nilai absolut'), text: T('現状からの引き算ではなく、理論値からの逆算', 'Work backward from the theoretical value, not subtract from the current state', 'Mundur dari nilai teoretis, bukan mengurangi dari kondisi saat ini') },
            { icon: '📊', tone: 'amber', title: T('ギャップによる優先順位', 'Priority by gap', 'Prioritas berdasarkan selisih'), text: T('理論値との差が大きいところから着手する', 'Start where the gap to the theoretical value is largest', 'Mulai dari selisih terbesar dengan nilai teoretis') }
          ] },
          { type: 'h', text: T('2つのアプローチ', 'Two approaches', 'Dua pendekatan') },
          { type: 'compare',
            left: { tone: 'gray', title: T('分析的アプローチ（引き算思考）', 'Analytic approach (subtraction)', 'Pendekatan analitis (pengurangan)'), items: [
              T('現状 − ムダ ＝ 改善後', 'Current − waste = after improvement', 'Saat ini − pemborosan = setelah perbaikan'),
              T('積み上げ式で着実', 'Steady, step by step', 'Bertahap dan pasti'),
              T('現状の延長線上から抜け出しにくい', 'Hard to escape the extension of the current state', 'Sulit keluar dari perpanjangan kondisi saat ini'),
              T('「どこまで改善すれば十分か」が分からない', 'You never know "how far is enough"', 'Tidak tahu "seberapa jauh sudah cukup"')
            ] },
            right: { tone: 'green', title: T('設計的アプローチ（絶対値思考）', 'Design approach (absolute value)', 'Pendekatan desain (nilai absolut)'), items: [
              T('理論値 ＋ 準価値 ＝ あるべき姿', 'Theoretical value + semi-value = ideal state', 'Nilai teoretis + semi-bernilai = kondisi ideal'),
              T('理想から逆算して設計する', 'Design backward from the ideal', 'Merancang mundur dari kondisi ideal'),
              T('抜本的な改善発想を促す', 'Encourages radical improvement ideas', 'Mendorong ide perbaikan radikal'),
              T('到達点（ゴール）が明確', 'The destination (goal) is clear', 'Tujuan (goal) jelas')
            ] }
          },
          { type: 'callout', kind: 'example', title: T('たとえ話：旅行の計画', 'Analogy: planning a trip', 'Analogi: merencanakan perjalanan'), text: T(
            '引き算思考は「いつもの道から、渋滞しそうな所を避ける」。絶対値思考は「地図上の最短ルートをまず引き、そこから現実的に必要な寄り道だけを足す」。後者の方が、今の道がどれだけ遠回りかがはっきり分かります。',
            'Subtraction thinking is "take the usual road and avoid spots likely to be jammed". Absolute-value thinking is "first draw the shortest route on the map, then add only the detours you really need". The latter shows clearly how much of a detour your current road is.',
            'Berpikir pengurangan adalah "lewat jalan biasa dan hindari titik yang mungkin macet". Berpikir nilai absolut adalah "gambar dulu rute terpendek di peta, lalu tambahkan hanya jalan memutar yang benar-benar perlu". Yang kedua menunjukkan dengan jelas seberapa jauh jalan Anda saat ini memutar.'
          ) }
        ]
      },
      {
        id: 'three',
        title: T('作業の3分類と境界', 'The 3 work categories and their boundaries', '3 kategori kerja dan batasnya'),
        blocks: [
          { type: 'p', text: T(
            '理論値の考え方では、すべての作業を厳密に3つに分類します。3分類の本質は「**何がその作業の存在を決めているか（境界）**」にあります。',
            'Theoretical-value thinking strictly classifies all work into 3 categories. The essence of the classification is "**what determines that the work exists (its boundary)**".',
            'Pemikiran nilai teoretis mengklasifikasikan semua kerja secara ketat menjadi 3 kategori. Inti klasifikasi ini adalah "**apa yang menentukan keberadaan kerja itu (batasnya)**".'
          ) },
          { type: 'diagram', name: 'value-boundary', caption: T('3分類と境界', 'The 3 categories and their boundaries', '3 kategori dan batasnya') },
          { type: 'table',
            head: [T('分類', 'Category', 'Kategori'), T('境界（何が決めるか）', 'Boundary (what decides)', 'Batas (apa yang menentukan)'), T('定義', 'Definition', 'Definisi'), T('例', 'Examples', 'Contoh')],
            rows: [
              [T('**[[value-work]]**', '**[[value-work]]**', '**[[value-work]]**'), T('製品設計（Design）— 設計が変わらない限り必ず必要', 'Product design — always needed unless the design changes', 'Desain produk — selalu diperlukan kecuali desain berubah'), T('物の形・質を、製品が持つべき機能のために変化させている「瞬間」', 'The "moment" that changes the shape or properties of the item for its required function', '"Momen" yang mengubah bentuk atau sifat barang untuk fungsi yang dibutuhkan'), T('ドリルで穴が開く瞬間、ボルトが規定トルクに達する瞬間、塗料の塗布', 'The moment a drill makes the hole, a bolt reaching the specified torque, applying paint', 'Momen bor membuat lubang, baut mencapai torsi yang ditentukan, pengolesan cat')],
              [T('**[[semi-value-work]]**', '**[[semi-value-work]]**', '**[[semi-value-work]]**'), T('工法・プロセス（Process）— 工法を変えれば削減・排除できる', 'Method/process — can be reduced or removed by changing the method', 'Metode/proses — dapat dikurangi atau dihilangkan dengan mengubah metode'), T('現在の工法を前提とした場合に必要最小限の付随作業', 'Accompanying work that is the minimum necessary given the current method', 'Kerja penyerta yang minimum diperlukan berdasarkan metode saat ini'), T('部品を掴む、治具にセットする、スタートボタンを押す、段取り替え', 'Grasping a part, setting it in a jig, pressing start, changeover', 'Memegang part, memasang di jig, menekan tombol start, pergantian setup')],
              [T('**[[non-value-work]]**', '**[[non-value-work]]**', '**[[non-value-work]]**'), T('実行・管理（Management）— 適切な管理下では本来ゼロにできる', 'Execution/management — can be zero under proper management', 'Pelaksanaan/manajemen — dapat menjadi nol dengan manajemen yang tepat'), T('付加価値を一切生まない純粋なロス', 'Pure loss that creates no added value', 'Kerugian murni yang tidak menambah nilai'), T('歩行、手待ち、探す、持ち替え、手直し、工程間搬送', 'Walking, waiting, searching, re-grasping, repair, transport between processes', 'Berjalan, menunggu, mencari, memindah pegangan, perbaikan, angkut antar proses')]
            ]
          },
          { type: 'callout', kind: 'key', title: T('「瞬間」に注目', 'Focus on the "moment"', 'Fokus pada "momen"'), text: T(
            'ねじ締め作業全体が価値作業なのではありません。ねじを掴む・穴に当てる・ドライバーを構えるは準価値、ねじが**締結トルクに達する瞬間**が価値です。解像度を上げるほど、価値作業は驚くほど短いことに気づきます。',
            'The whole screw-tightening task is not value work. Grasping the screw, placing it in the hole and positioning the driver are semi-value; the **moment the screw reaches the tightening torque** is value. The higher the resolution, the more you realize how surprisingly short value work is.',
            'Seluruh tugas mengencangkan sekrup bukanlah kerja bernilai. Memegang sekrup, menempatkannya di lubang, dan memposisikan obeng adalah semi-bernilai; **momen sekrup mencapai torsi pengencangan** adalah bernilai. Semakin tinggi resolusinya, semakin terlihat betapa singkatnya kerja bernilai.'
          ) },
          { type: 'widget', name: 'sort-game', props: {
            title: T('この作業はどれ？ 価値・準価値・無価値', 'Which is it? Value, semi-value, non-value', 'Yang mana? Bernilai, semi-bernilai, tidak bernilai'),
            bins: [
              { id: 'v', label: T('価値', 'Value', 'Bernilai'), tone: 'green' },
              { id: 's', label: T('準価値', 'Semi-value', 'Semi-bernilai'), tone: 'amber' },
              { id: 'n', label: T('無価値', 'Non-value', 'Tidak bernilai'), tone: 'red' }
            ],
            items: [
              { bin: 'v', text: T('プレスが金属板を曲げている瞬間', 'The moment the press bends the metal sheet', 'Momen mesin press membengkokkan lembaran logam'), explain: T('製品機能のために形を変える瞬間＝価値。', 'Changing shape for the product function = value.', 'Mengubah bentuk untuk fungsi produk = bernilai.') },
              { bin: 's', text: T('部品を治具にセットする', 'Setting the part in the jig', 'Memasang part di jig'), explain: T('現工法で必要最小限の付随作業＝準価値。自動供給にすれば消える。', 'Minimum accompanying work under the current method = semi-value; disappears with auto-feeding.', 'Kerja penyerta minimum dengan metode saat ini = semi-bernilai; hilang dengan pengumpan otomatis.') },
              { bin: 'n', text: T('足りない部品を棚まで取りに行く', 'Walking to the shelf for a missing part', 'Berjalan ke rak untuk mengambil part yang kurang'), explain: T('管理不備が生む歩行＝無価値。', 'Walking caused by poor management = non-value.', 'Berjalan akibat manajemen yang buruk = tidak bernilai.') },
              { bin: 'n', text: T('混ざった部品の中から正しい部品を探す', 'Searching for the right part among mixed parts', 'Mencari part yang benar di antara part campur'), explain: T('3定ができていれば「探す」はゼロにできる＝無価値。', 'With 3-tei in place, searching can be zero = non-value.', 'Dengan 3-tei, mencari bisa nol = tidak bernilai.') },
              { bin: 'v', text: T('接着剤が塗布されている瞬間', 'The moment adhesive is being applied', 'Momen perekat sedang dioleskan'), explain: T('製品の質を変える瞬間＝価値。', 'Changing the product’s properties = value.', 'Mengubah sifat produk = bernilai.') },
              { bin: 's', text: T('スタートボタンを押す', 'Pressing the start button', 'Menekan tombol start'), explain: T('現設備を前提とした必要最小限の操作＝準価値。', 'Minimum operation given the current equipment = semi-value.', 'Operasi minimum berdasarkan peralatan saat ini = semi-bernilai.') },
              { bin: 'n', text: T('前工程からの部品を待つ', 'Waiting for parts from the previous process', 'Menunggu part dari proses sebelumnya'), explain: T('手待ち＝無価値。', 'Waiting = non-value.', 'Menunggu = tidak bernilai.') },
              { bin: 'n', text: T('キズが見つかった製品を手直しする', 'Reworking a product with a scratch', 'Memperbaiki produk yang tergores'), explain: T('手直しは付加価値を生まない＝無価値。', 'Rework adds no value = non-value.', 'Pengerjaan ulang tidak menambah nilai = tidak bernilai.') },
              { bin: 's', text: T('製品を持ち上げて次の位置に置く（現工法で必要な分だけ）', 'Lifting the product to the next position (only as the current method requires)', 'Mengangkat produk ke posisi berikutnya (sebatas yang diperlukan metode saat ini)'), explain: T('工法が要求する最小限のハンドリング＝準価値。', 'Minimum handling required by the method = semi-value.', 'Penanganan minimum yang dibutuhkan metode = semi-bernilai.') },
              { bin: 'n', text: T('右手から左手へ工具を持ち替える', 'Switching a tool from the right hand to the left', 'Memindahkan alat dari tangan kanan ke kiri'), explain: T('持ち替えは配置や手順の工夫でなくせる＝無価値。', 'Re-grasping can be removed by layout or procedure = non-value.', 'Memindah pegangan dapat dihilangkan dengan tata letak atau prosedur = tidak bernilai.') }
            ]
          } }
        ]
      },
      {
        id: 'moving',
        title: T('境界を動かすこと自体が改善', 'Moving a boundary is improvement itself', 'Menggeser batas adalah perbaikan itu sendiri'),
        blocks: [
          { type: 'p', text: T(
            '3分類の境界は固定ではありません。**境界を変えれば分類も変わる**——それが改善の方向性を示します。',
            'The boundaries of the 3 categories are not fixed. **Change the boundary and the classification changes** — this shows the direction of improvement.',
            'Batas 3 kategori tidak tetap. **Ubah batasnya maka klasifikasinya berubah** — inilah yang menunjukkan arah perbaikan.'
          ) },
          { type: 'table',
            head: [T('境界の変化', 'Boundary change', 'Perubahan batas'), T('例', 'Example', 'Contoh'), T('効果', 'Effect', 'Efek')],
            rows: [
              [T('設計（Design）を変える → 価値の境界が移動', 'Change the design → value boundary moves', 'Ubah desain → batas nilai bergeser'), T('ねじ4本締結 → スナップフィット設計に変更し、「ねじ締め」という価値作業自体が消滅', '4 screws → snap-fit design; the value work "screw tightening" itself disappears', '4 sekrup → desain snap-fit; kerja bernilai "mengencangkan sekrup" hilang'), T('価値作業の再定義（本質機能の実現方法が変わる）', 'Redefine value work (how the essential function is achieved changes)', 'Mendefinisikan ulang kerja bernilai (cara mencapai fungsi inti berubah)')],
              [T('工法（Process）を変える → 準価値の境界が移動', 'Change the method → semi-value boundary moves', 'Ubah metode → batas semi-bernilai bergeser'), T('手動セット → 自動供給装置を導入し、「部品を掴む」準価値作業が消滅', 'Manual setting → automatic feeder; semi-value work "grasping the part" disappears', 'Pemasangan manual → pengumpan otomatis; kerja semi-bernilai "memegang part" hilang'), T('準価値の削減・排除（現場理論値が技術理論値に近づく）', 'Reduce/remove semi-value (site theoretical value approaches technical theoretical value)', 'Kurangi/hilangkan semi-bernilai (nilai teoretis lapangan mendekati nilai teoretis teknis)')],
              [T('管理（Management）を改善 → 無価値が減少', 'Improve management → non-value decreases', 'Perbaiki manajemen → tidak bernilai berkurang'), T('部品配置を3定化して「探す」が消滅／ライン内配置最適化で「歩行」が消滅', 'Apply 3-tei to parts so "searching" disappears / optimize layout so "walking" disappears', 'Terapkan 3-tei pada part sehingga "mencari" hilang / optimalkan tata letak sehingga "berjalan" hilang'), T('無価値の徹底排除（ECRSで即時対応可能）', 'Thorough removal of non-value (can act immediately with ECRS)', 'Penghapusan total tidak bernilai (dapat segera ditangani dengan ECRS)')]
            ]
          },
          { type: 'callout', kind: 'zeva', title: T('ZEVAとのつながり', 'Link to ZEVA', 'Kaitan dengan ZEVA'), text: T(
            '無価値作業の多くは**管理の不備**＝バラツキの温床です。「探す」「待つ」「持ち替え」は毎回違う時間がかかり、CTのバラツキを生みます。無価値をなくすことは、ロス削減とバラツキ削減を同時に進めることなのです。',
            'Much non-value work comes from **poor management**, a breeding ground for variation. "Searching", "waiting" and "re-grasping" take a different time each cycle and create CT variation. Removing non-value work reduces loss and variation at the same time.',
            'Banyak pekerjaan tanpa nilai berasal dari **manajemen yang buruk**, sumber variasi. "Mencari", "menunggu", dan "memindah pegangan" memakan waktu berbeda setiap siklus dan menimbulkan variasi CT. Menghilangkan pekerjaan tanpa nilai berarti mengurangi kerugian dan variasi sekaligus.'
          ) }
        ]
      },
      {
        id: 'values',
        title: T('2つの理論値と2つのロス', 'Two theoretical values and two losses', 'Dua nilai teoretis dan dua kerugian'),
        blocks: [
          { type: 'formula',
            expr: T('現場理論値 ＝ 価値作業 ＋ 準価値作業（現工法で必要最小限）', 'Site theoretical value = value work + semi-value work (minimum under current method)', 'Nilai teoretis lapangan = kerja bernilai + kerja semi-bernilai (minimum dengan metode saat ini)'),
            note: T('[[site-theoretical-value]]：現在の設備・道具・工法を肯定したうえで到達可能な理想。まず目指す到達点。', '[[site-theoretical-value]]: the ideal reachable while accepting current equipment, tools and methods. The first destination.', '[[site-theoretical-value]]: kondisi ideal yang dapat dicapai dengan menerima peralatan, alat, dan metode saat ini. Tujuan pertama.')
          },
          { type: 'formula',
            expr: T('技術理論値 ＝ 価値作業のみ（新技術・新工法で準価値も排除）', 'Technical theoretical value = value work only (semi-value also removed by new technology/method)', 'Nilai teoretis teknis = hanya kerja bernilai (semi-bernilai juga dihilangkan dengan teknologi/metode baru)'),
            note: T('[[technical-theoretical-value]]：将来の技術開発や設備投資の指針となる理想状態。', '[[technical-theoretical-value]]: the ideal that guides future technology development and investment.', '[[technical-theoretical-value]]: kondisi ideal yang menjadi panduan pengembangan teknologi dan investasi di masa depan.')
          },
          { type: 'layers', items: [
            { tone: 'red', label: T('現状', 'Current', 'Saat ini'), title: T('現状の作業時間', 'Current work time', 'Waktu kerja saat ini'), text: T('価値＋準価値＋無価値', 'Value + semi-value + non-value', 'Bernilai + semi-bernilai + tidak bernilai') },
            { tone: 'amber', label: T('↓ 管理ロス', '↓ Management loss', '↓ Kerugian manajemen'), title: T('[[management-loss]]＝現状 − 現場理論値', '[[management-loss]] = current − site theoretical value', '[[management-loss]] = saat ini − nilai teoretis lapangan'), text: T('無価値作業の排除で解消（管理・ECRSで今すぐ着手できる）', 'Solved by removing non-value work (start now with management and ECRS)', 'Diatasi dengan menghilangkan pekerjaan tanpa nilai (mulai sekarang dengan manajemen dan ECRS)') },
            { tone: 'blue', label: T('現場理論値', 'Site theoretical value', 'Nilai teoretis lapangan'), title: T('価値＋準価値（最小限）', 'Value + semi-value (minimum)', 'Bernilai + semi-bernilai (minimum)'), text: T('まず目指す到達点', 'The first destination', 'Tujuan pertama') },
            { tone: 'navy', label: T('↓ 技術ロス', '↓ Technical loss', '↓ Kerugian teknis'), title: T('[[technical-loss]]＝現場理論値 − 技術理論値', '[[technical-loss]] = site theoretical value − technical theoretical value', '[[technical-loss]] = nilai teoretis lapangan − nilai teoretis teknis'), text: T('工法改善・設備投資で解消', 'Solved by method improvement or investment', 'Diatasi dengan perbaikan metode atau investasi') },
            { tone: 'green', label: T('技術理論値', 'Technical theoretical value', 'Nilai teoretis teknis'), title: T('価値作業のみ', 'Value work only', 'Hanya kerja bernilai'), text: T('究極の理想状態', 'The ultimate ideal', 'Kondisi ideal tertinggi') }
          ] },
          { type: 'example',
            title: T('計算例（数値は例示）', 'Worked example (illustrative numbers)', 'Contoh perhitungan (angka ilustrasi)'),
            steps: [
              T('ある組立作業の1サイクル60秒を動画分析：価値12秒、準価値18秒、無価値30秒', 'Video analysis of a 60 s assembly cycle: value 12 s, semi-value 18 s, non-value 30 s', 'Analisis video siklus perakitan 60 dtk: bernilai 12 dtk, semi-bernilai 18 dtk, tidak bernilai 30 dtk'),
              T('現場理論値 ＝ 12 ＋ 18 ＝ 30秒 → 管理ロス ＝ 60 − 30 ＝ 30秒', 'Site theoretical value = 12 + 18 = 30 s → management loss = 60 − 30 = 30 s', 'Nilai teoretis lapangan = 12 + 18 = 30 dtk → kerugian manajemen = 60 − 30 = 30 dtk'),
              T('新工法なら準価値を6秒まで減らせると想定 → その工法での理想は12＋6＝18秒。準価値をすべて排除した技術理論値は12秒 → 技術ロス ＝ 30 − 12 ＝ 18秒', 'Assume a new method can cut semi-value to 6 s → ideal under it = 12 + 6 = 18 s. Technical theoretical value with all semi-value removed = 12 s → technical loss = 30 − 12 = 18 s', 'Misalkan metode baru dapat memotong semi-bernilai menjadi 6 dtk → ideal dengan metode itu = 12 + 6 = 18 dtk. Nilai teoretis teknis tanpa semi-bernilai = 12 dtk → kerugian teknis = 30 − 12 = 18 dtk'),
              T('価値作業比率 ＝ 12 ÷ 60 × 100 ＝ 20%', 'Value-work ratio = 12 ÷ 60 × 100 = 20%', 'Rasio kerja bernilai = 12 ÷ 60 × 100 = 20%')
            ],
            result: T('まず管理ロス30秒（無価値）の排除から着手し、現場理論値30秒を目指します。', 'Start by removing the 30 s management loss (non-value) and aim for the site theoretical value of 30 s.', 'Mulailah dengan menghilangkan kerugian manajemen 30 dtk (tidak bernilai) dan menuju nilai teoretis lapangan 30 dtk.')
          },
          { type: 'widget', name: 'theory-gap', props: { value: 12, semi: 18, non: 30, techSemi: 6 } },
          { type: 'h', text: T('事例：射出成形の充填時間', 'Example: fill time in injection moulding', 'Contoh: waktu pengisian pada injection molding') },
          { type: 'p', text: T(
            '時間だけでなく、工程の条件でも同じ見方をします。射出成形では、成形機の射出速度を最大にしたときの充填時間が**技術理論値**です。ただし速く充填しすぎるとジェッティング・フローマーク・エアトラップ・ヤケ・バリが出て、遅すぎるとショート（充填不足）になります。良品になるのはその間の範囲だけで、この範囲は製品形状や金型仕様等で変わります。',
            'The same view applies to process conditions, not just time. In injection moulding, the fill time at the machine’s maximum injection speed is the **technical theoretical value**. Fill too fast and you get jetting, flow marks, air traps, burn marks and flash; too slow and you get a short shot (incomplete filling). Only the range in between yields good parts, and that range changes with part shape, mould specification and so on.',
            'Cara pandang yang sama berlaku untuk kondisi proses, bukan hanya waktu. Pada injection molding, waktu pengisian pada kecepatan injeksi maksimum mesin adalah **nilai teoretis teknis**. Terlalu cepat menimbulkan jetting, flow mark, air trap, burn mark, dan flash; terlalu lambat menimbulkan short shot (pengisian tidak penuh). Hanya rentang di antaranya yang menghasilkan produk baik, dan rentang itu berubah sesuai bentuk produk, spesifikasi cetakan, dan sebagainya.'
          ) },
          { type: 'table',
            head: [T('理論値', 'Theoretical value', 'Nilai teoretis'), T('決まり方', 'How it is set', 'Cara ditetapkan'), T('動かす手段', 'How to move it', 'Cara menggesernya')],
            rows: [
              [T('[[technical-theoretical-value]]', '[[technical-theoretical-value]]', '[[technical-theoretical-value]]'),
               T('物理法則から計算する、その工法での最速・最小の値（射出速度が最大のときの充填時間など）', 'Calculated from the laws of physics: the fastest or smallest value for that method (such as the fill time at maximum injection speed)', 'Dihitung dari hukum fisika: nilai tercepat atau terkecil untuk metode itu (misalnya waktu pengisian pada kecepatan injeksi maksimum)'),
               T('工法・設備・製品設計を変える', 'Change the method, the equipment or the product design', 'Mengubah metode, peralatan, atau desain produk')],
              [T('[[site-theoretical-value]]', '[[site-theoretical-value]]', '[[site-theoretical-value]]'),
               T('良品範囲の中で、設備のバラツキも見込んで決めた実設定値。現行の工法・設備で到達できる', 'The actual setting decided inside the good-part range with equipment variation allowed for. Reachable with today’s method and equipment', 'Nilai setelan aktual yang ditetapkan di dalam rentang produk baik dengan memperhitungkan variasi peralatan. Dapat dicapai dengan metode dan peralatan saat ini'),
               T('条件のバラツキを減らし、良品範囲の中で理論値側へ寄せる', 'Reduce variation of the conditions and move it toward the theoretical value inside the good-part range', 'Kurangi variasi kondisi dan geser ke arah nilai teoretis di dalam rentang produk baik')]
            ],
            caption: T('不良は理論値への阻害要因。阻害要因があるために、現場理論値は技術理論値まで詰められない', 'Defects are obstacles to the theoretical value: because of them, the site theoretical value cannot be pushed all the way to the technical theoretical value', 'Cacat adalah penghambat menuju nilai teoretis: karena itu nilai teoretis lapangan tidak dapat didorong sampai nilai teoretis teknis')
          },
          { type: 'callout', kind: 'zeva', title: T('この良品範囲がGPCバンドになる', 'This good-part range becomes the GPC band', 'Rentang produk baik ini menjadi GPC band'), text: T(
            '良品範囲を物理実験で確かめ、工程条件の範囲として定めたものが[[gpc-band]]です（ZEVA実践で学びます）。良品範囲の中で狙いを技術理論値の側へ寄せる動きが[[center-aiming]]にあたります。',
            'Confirming the good-part range by physical trials and fixing it as a range of process conditions gives the [[gpc-band]] (covered in ZEVA Practice). Moving the aim toward the technical theoretical value inside that range is [[center-aiming]].',
            'Memastikan rentang produk baik melalui uji fisik dan menetapkannya sebagai rentang kondisi proses menghasilkan [[gpc-band]] (dibahas di Praktik ZEVA). Menggeser sasaran ke arah nilai teoretis teknis di dalam rentang itu adalah [[center-aiming]].'
          ) }
        ]
      },
      {
        id: 'quality',
        title: T('品質の考え方：要求品質・要求コストと工程バラツキ', 'How quality is decided: required quality, required cost and process variation', 'Cara menentukan kualitas: kualitas yang diminta, biaya yang diminta, dan variasi proses'),
        blocks: [
          { type: 'p', text: T(
            '生産には必ず[[required-quality]]があります。高ければ高いほどよいものではありません。企画・開発・生産のすべての領域で検討と検証を行い、量産で成立すること（量産妥当性）を確かめたうえで設定します。',
            'Production always has a [[required-quality]]. Higher is not always better. It is set after planning, development and production have all examined and verified it, and after mass-production feasibility has been confirmed.',
            'Produksi selalu memiliki [[required-quality]]. Lebih tinggi tidak selalu lebih baik. Kualitas itu ditetapkan setelah bidang perencanaan, pengembangan, dan produksi memeriksa dan memverifikasinya, serta setelah kelayakan produksi massal dipastikan.'
          ) },
          { type: 'diagram', name: 'quality-cost', caption: T('品質とコストはトレードオフ。要求品質を超えた部分は過剰品質', 'Quality and cost trade off; beyond the required quality lies over-quality', 'Kualitas dan biaya saling tukar; di luar kualitas yang diminta adalah kualitas berlebihan') },
          { type: 'cards', cols: 2, items: [
            { icon: '🎯', tone: 'blue', title: T('[[required-quality]]', '[[required-quality]]', '[[required-quality]]'), text: T('量産妥当性を確かめて決める。企画・開発・生産の三者で検討し、検証する。', 'Decided after confirming mass-production feasibility, examined and verified by planning, development and production together.', 'Ditetapkan setelah memastikan kelayakan produksi massal, diperiksa dan diverifikasi bersama oleh perencanaan, pengembangan, dan produksi.') },
            { icon: '💸', tone: 'amber', title: T('[[over-quality]]', '[[over-quality]]', '[[over-quality]]'), text: T('要求品質を超えた部分。コストだけが増えて価値は増えない。', 'The part beyond the required quality. Only cost grows; value does not.', 'Bagian di luar kualitas yang diminta. Hanya biaya yang naik; nilainya tidak.') },
            { icon: '📉', tone: 'navy', title: T('[[required-cost]]', '[[required-cost]]', '[[required-cost]]'), text: T('生産側に設定されるコストの枠。この範囲内で要求品質を確保する。', 'The cost frame set on the production side. The required quality must be secured within it.', 'Kerangka biaya yang ditetapkan di sisi produksi. Kualitas yang diminta harus dicapai di dalamnya.') },
            { icon: '〰', tone: 'green', title: T('工程バラツキ', 'Process variation', 'Variasi proses'), text: T('結果（Y）として現れるバラツキ。要求品質の中に、要求コストの範囲で収める。', 'The variation that appears as the result (Y). Keep it inside the required quality, within the required cost.', 'Variasi yang muncul sebagai hasil (Y). Jaga di dalam kualitas yang diminta, dalam batas biaya yang diminta.') }
          ] },
          { type: 'callout', kind: 'key', title: T('検査で押さえ込むとコストが増える', 'Holding it down with inspection raises cost', 'Menahannya dengan inspeksi menaikkan biaya'), text: T(
            'バラツキが要求品質の外にはみ出せば不良です。内側に収めるために検査や手直しを足せば、今度は要求コストを超えます。ZEVAが原因（X）を[[gpc-band]]の中に収めるのは、結果のバラツキを要求品質の中に収め、それを要求コストの範囲で実現するためです。',
            'If variation spills outside the required quality, you get defects. Adding inspection and repair to hold it inside then breaks the required cost. ZEVA keeps causes (X) inside the [[gpc-band]] so that the resulting variation stays inside the required quality — and does so within the required cost.',
            'Jika variasi keluar dari kualitas yang diminta, muncul cacat. Menambah inspeksi dan perbaikan untuk menahannya justru melampaui biaya yang diminta. ZEVA menjaga penyebab (X) di dalam [[gpc-band]] agar variasi hasil tetap di dalam kualitas yang diminta, dan itu dicapai dalam batas biaya yang diminta.'
          ) },
          { type: 'h', text: T('直線の傾きを下げる', 'Lowering the slope of the line', 'Menurunkan kemiringan garis') },
          { type: 'compare',
            left: { title: T('直線の上を動く（現場の改善）', 'Moving along the line (floor improvement)', 'Bergerak di sepanjang garis (perbaikan lapangan)'), tone: 'blue', items: [
              T('バラツキを小さくし、要求コストの中に収める', 'Reduce variation and stay within the required cost', 'Kurangi variasi dan tetap dalam biaya yang diminta'),
              T('品質を上げようとすれば、コストは必ず増える', 'Raising quality always raises cost', 'Menaikkan kualitas selalu menaikkan biaya')
            ] },
            right: { title: T('傾きそのものを下げる', 'Lowering the slope itself', 'Menurunkan kemiringan garis itu sendiri'), tone: 'green', items: [
              T('同じ要求品質を、より低いコストで達成できる', 'The same required quality is met at a lower cost', 'Kualitas yang diminta yang sama dicapai dengan biaya lebih rendah'),
              T('工法・設備の変更（[[technical-loss]]の解消）と製品設計の変更が要る。現場の管理だけでは傾きは変わらない', 'It needs a change of method or equipment (removing [[technical-loss]]) and a change of product design. Floor management alone never changes the slope', 'Perlu perubahan metode atau peralatan (menghilangkan [[technical-loss]]) dan perubahan desain produk. Manajemen lapangan saja tidak mengubah kemiringan')
            ] }
          },
          { type: 'check',
            q: T('要求品質より高い品質を出している工程があります。ZEVAの考え方として正しいのは？', 'A process is delivering higher quality than required. Which view is correct according to ZEVA?', 'Sebuah proses menghasilkan kualitas lebih tinggi dari yang diminta. Manakah yang benar menurut cara pandang ZEVA?'),
            choices: [
              T('良いことなので、そのまま続ける', 'It is a good thing, so keep it', 'Hal itu baik, jadi lanjutkan saja'),
              T('過剰品質。コストだけが増えているので、要求品質に見合う条件に戻す', 'Over-quality: only cost is growing, so bring the conditions back to what the required quality needs', 'Kualitas berlebihan: hanya biaya yang naik, jadi kembalikan kondisinya sesuai kualitas yang diminta'),
              T('要求品質を引き上げる', 'Raise the required quality', 'Naikkan kualitas yang diminta')
            ],
            answer: 1,
            explain: T('要求品質は企画・開発・生産で検証して決めた値です。現場の判断で上げ下げするものではなく、超えた分はコストだけが増えます。', 'The required quality was verified and set by planning, development and production. The floor does not raise or lower it, and anything beyond it only adds cost.', 'Kualitas yang diminta telah diverifikasi dan ditetapkan oleh perencanaan, pengembangan, dan produksi. Lapangan tidak menaikkan atau menurunkannya, dan kelebihannya hanya menambah biaya.')
          }
        ]
      },
      {
        id: 'ratio',
        title: T('価値作業比率：改善の核心指標', 'Value-work ratio: the core improvement metric', 'Rasio kerja bernilai: metrik inti perbaikan'),
        blocks: [
          { type: 'formula',
            expr: T('価値作業比率（%）＝ 価値作業時間 ÷ 総作業時間 × 100', 'Value-work ratio (%) = value work time ÷ total work time × 100', 'Rasio kerja bernilai (%) = waktu kerja bernilai ÷ total waktu kerja × 100'),
            note: T('[[value-work-ratio]]は、真に価値を生んでいる時間の割合です。', '[[value-work-ratio]] is the share of time that truly creates value.', '[[value-work-ratio]] adalah porsi waktu yang benar-benar menciptakan nilai.')
          },
          { type: 'p', text: T(
            '一般的な現場の価値作業比率は**10〜30%**程度にとどまります。理論値の考え方では**50〜60%以上**を目標とします。人作業中心の工程では、最初は低い値からのスタートになるのが普通です。数字が低いことは恥ではなく、「改善の余地が見えた」ことを意味します。',
            'On typical floors the value-work ratio is only about **10–30%**. Theoretical-value thinking targets **50–60% or more**. Manual processes usually start from a low value. A low number is not a shame; it means "the room for improvement has become visible".',
            'Di lini pada umumnya rasio kerja bernilai hanya sekitar **10–30%**. Pemikiran nilai teoretis menargetkan **50–60% atau lebih**. Proses manual biasanya dimulai dari nilai rendah. Angka rendah bukan hal memalukan; artinya "ruang perbaikan telah terlihat".'
          ) },
          { type: 'callout', kind: 'warn', title: T('バラツキがあると理論値も測れない', 'With variation, even the theoretical value cannot be measured', 'Dengan variasi, nilai teoretis pun tidak dapat diukur'), text: T(
            '同じ作業でも毎回手順が違えば、「どれが準価値の最小限か」を決められません。理論値の分析は、標準化で再現性が確保されてはじめて正確になります。これこそZEVAが「土台（標準化）」を先に置く理由です。',
            'If the same task is done in a different way each time, you cannot decide "what is the minimum semi-value". Theoretical-value analysis becomes accurate only after reproducibility is secured through standardization. This is exactly why ZEVA puts the foundation (standardization) first.',
            'Jika tugas yang sama dikerjakan dengan cara berbeda setiap kali, Anda tidak dapat menentukan "berapa semi-bernilai minimum". Analisis nilai teoretis baru akurat setelah reprodusibilitas dijamin melalui standardisasi. Inilah alasan ZEVA menempatkan fondasi (standardisasi) terlebih dahulu.'
          ) },
          { type: 'check',
            q: T('総作業時間80秒、価値作業20秒のときの価値作業比率は？', 'Total work 80 s, value work 20 s. Value-work ratio?', 'Total kerja 80 dtk, kerja bernilai 20 dtk. Rasio kerja bernilai?'),
            choices: [T('20%', '20%', '20%'), T('25%', '25%', '25%'), T('40%', '40%', '40%')],
            answer: 1,
            explain: T('20 ÷ 80 × 100 ＝ 25%。', '20 ÷ 80 × 100 = 25%.', '20 ÷ 80 × 100 = 25%.')
          }
        ]
      }
    ],
    keyPoints: [
      T('理論値＝価値作業だけを最速で流し、それ以外はすべてロスとして削る思想', 'Theoretical value = flow only value work at top speed and cut everything else as loss', 'Nilai teoretis = alirkan hanya kerja bernilai secepat mungkin dan pangkas sisanya sebagai kerugian'),
      T('絶対値思考：理論値＋準価値＝あるべき姿（現状からの引き算ではない）', 'Absolute-value thinking: theoretical value + semi-value = ideal (not subtracting from now)', 'Berpikir nilai absolut: nilai teoretis + semi-bernilai = ideal (bukan mengurangi dari saat ini)'),
      T('価値＝設計、準価値＝工法、無価値＝管理 が境界。境界を動かすことが改善', 'Boundaries: value = design, semi-value = method, non-value = management; moving boundaries is improvement', 'Batas: bernilai = desain, semi-bernilai = metode, tidak bernilai = manajemen; menggeser batas adalah perbaikan'),
      T('管理ロス＝現状−現場理論値、技術ロス＝現場理論値−技術理論値', 'Management loss = current − site theoretical value; technical loss = site theoretical value − technical theoretical value', 'Kerugian manajemen = saat ini − nilai teoretis lapangan; kerugian teknis = nilai teoretis lapangan − nilai teoretis teknis'),
      T('価値作業比率：一般的に10〜30%、目標50〜60%以上', 'Value-work ratio: typically 10–30%, target 50–60%+', 'Rasio kerja bernilai: umumnya 10–30%, target 50–60%+'),
      T('要求品質は量産妥当性を確かめて決める。超えた分は過剰品質で、コストだけが増える', 'The required quality is set after confirming mass-production feasibility; anything beyond it is over-quality and only adds cost', 'Kualitas yang diminta ditetapkan setelah memastikan kelayakan produksi massal; kelebihannya adalah kualitas berlebihan dan hanya menambah biaya'),
      T('工程バラツキは要求コストの範囲で要求品質の中に収める。傾きを下げるには技術理論と製品設計を変える', 'Keep process variation inside the required quality within the required cost; lowering the slope needs a change of technical theory and product design', 'Jaga variasi proses di dalam kualitas yang diminta dalam batas biaya yang diminta; menurunkan kemiringan memerlukan perubahan teori teknis dan desain produk')
    ],
    quiz: [
      { q: T('理論値の設計的アプローチを表す式は？', 'Which formula expresses the design approach of the theoretical value?', 'Rumus mana yang menyatakan pendekatan desain nilai teoretis?'),
        choices: [T('現状 − ムダ ＝ 改善後', 'Current − waste = after', 'Saat ini − pemborosan = sesudah'), T('理論値 ＋ 準価値 ＝ あるべき姿', 'Theoretical value + semi-value = ideal state', 'Nilai teoretis + semi-bernilai = kondisi ideal'), T('平均 ÷ 標準偏差', 'Mean ÷ standard deviation', 'Rata-rata ÷ simpangan baku'), T('稼働率 × 良品率', 'Availability × Yield rate', 'Availability × Rasio produk baik')],
        answer: 1, explain: T('絶対値思考：理想から逆算して必要な準価値だけを足します。', 'Absolute-value thinking: add only the needed semi-value to the ideal.', 'Berpikir nilai absolut: tambahkan hanya semi-bernilai yang perlu ke kondisi ideal.') },
      { q: T('準価値作業の境界（存在を決めるもの）は？', 'What is the boundary of semi-value work?', 'Apa batas kerja semi-bernilai?'),
        choices: [T('製品設計', 'Product design', 'Desain produk'), T('工法・プロセス', 'Method / process', 'Metode / proses'), T('実行・管理', 'Execution / management', 'Pelaksanaan / manajemen'), T('顧客の要望', 'Customer requests', 'Permintaan pelanggan')],
        answer: 1, explain: T('準価値は現在の工法が要求する作業で、工法を変えれば削減・排除できます。', 'Semi-value is required by the current method and can be removed by changing it.', 'Semi-bernilai dibutuhkan metode saat ini dan dapat dihilangkan dengan mengubahnya.') },
      { q: T('「部品を探す」はどれに分類される？', 'How is "searching for parts" classified?', '"Mencari part" diklasifikasikan sebagai apa?'),
        choices: [T('価値', 'Value', 'Bernilai'), T('準価値', 'Semi-value', 'Semi-bernilai'), T('無価値', 'Non-value', 'Tidak bernilai'), T('分類できない', 'Cannot be classified', 'Tidak dapat diklasifikasi')],
        answer: 2, explain: T('管理の不備が生む純粋なロス。3定で排除できます。', 'Pure loss caused by poor management; removable with 3-tei.', 'Kerugian murni akibat manajemen buruk; dapat dihilangkan dengan 3-tei.') },
      { q: T('ねじ締結をスナップフィット設計に変えたとき、何が起きた？', 'Changing screw fastening to a snap-fit design does what?', 'Mengubah pengencangan sekrup menjadi desain snap-fit berdampak apa?'),
        choices: [T('無価値作業が増えた', 'Non-value work increased', 'Pekerjaan tanpa nilai bertambah'), T('価値の境界が移動し、「ねじ締め」という価値作業自体が消滅した', 'The value boundary moved and the value work "screw tightening" disappeared', 'Batas nilai bergeser dan kerja bernilai "mengencangkan sekrup" hilang'), T('管理ロスが増えた', 'Management loss increased', 'Kerugian manajemen bertambah'), T('何も変わらない', 'Nothing changed', 'Tidak ada perubahan')],
        answer: 1, explain: T('設計を変えると、価値作業の定義そのものが変わります。', 'Changing design changes the definition of value work itself.', 'Mengubah desain mengubah definisi kerja bernilai itu sendiri.') },
      { q: T('現状60秒、現場理論値35秒のとき、管理ロスは？', 'Current 60 s, site theoretical value 35 s. Management loss?', 'Saat ini 60 dtk, nilai teoretis lapangan 35 dtk. Kerugian manajemen?'),
        choices: [T('25秒', '25 s', '25 dtk'), T('35秒', '35 s', '35 dtk'), T('60秒', '60 s', '60 dtk'), T('95秒', '95 s', '95 dtk')],
        answer: 0, explain: T('管理ロス＝現状−現場理論値＝60−35＝25秒。', 'Management loss = current − site theoretical value = 60 − 35 = 25 s.', 'Kerugian manajemen = saat ini − nilai teoretis lapangan = 60 − 35 = 25 dtk.') },
      { q: T('技術ロスを解消する主な手段は？', 'Main way to eliminate technical loss?', 'Cara utama menghilangkan kerugian teknis?'),
        choices: [T('3定・整理整頓', '3-tei and tidying', '3-tei dan kerapian'), T('工法改善・設備投資', 'Method improvement / investment', 'Perbaikan metode / investasi'), T('作業者を急がせる', 'Rushing operators', 'Membuat operator terburu-buru'), T('検査を増やす', 'More inspection', 'Menambah inspeksi')],
        answer: 1, explain: T('現場理論値と技術理論値の差は、新工法・新技術で埋めます。', 'The gap between site and technical theoretical value is closed by new methods/technology.', 'Selisih nilai teoretis lapangan dan teknis ditutup dengan metode/teknologi baru.') },
      { q: T('理論値が目標とする価値作業比率の水準は？', 'Target level of value-work ratio for the theoretical value?', 'Tingkat target rasio kerja bernilai untuk nilai teoretis?'),
        choices: [T('5〜10%', '5–10%', '5–10%'), T('10〜30%', '10–30%', '10–30%'), T('50〜60%以上', '50–60% or more', '50–60% atau lebih'), T('100%', '100%', '100%')],
        answer: 2, explain: T('一般的な現状は10〜30%、目標は50〜60%以上です。', 'Typical current level is 10–30%; the target is 50–60%+.', 'Tingkat umum 10–30%; targetnya 50–60%+.') },
      { q: T('バラツキが大きい現場で理論値の分析が不正確になる理由は？', 'Why does theoretical-value analysis become inaccurate with large variation?', 'Mengapa analisis nilai teoretis tidak akurat bila variasi besar?'),
        choices: [T('動画が撮れないから', 'Video cannot be recorded', 'Video tidak dapat direkam'), T('毎回手順が違い、準価値の最小限や現状値を確定できないから', 'Procedures differ each time, so minimum semi-value and current values cannot be fixed', 'Prosedur berbeda setiap kali, sehingga semi-bernilai minimum dan nilai saat ini tidak dapat ditetapkan'), T('価値作業が存在しないから', 'Value work does not exist', 'Kerja bernilai tidak ada'), T('計算式が複雑だから', 'The formula is complex', 'Rumusnya rumit')],
        answer: 1, explain: T('再現性がないと理論値とのギャップを正しく評価できません。これがZEVA誕生の理由でもあります。', 'Without reproducibility the gap cannot be evaluated — the very reason ZEVA was born.', 'Tanpa reprodusibilitas selisih tidak dapat dievaluasi — alasan ZEVA lahir.') }
    ]
  });
})();
