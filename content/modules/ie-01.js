ZA.addModule({
  id: 'ie-01',
  track: 'ie',
  order: 1,
  minutes: 25,
  icon: '🏭',
  level: 1,
  prereq: [],
  title: { ja: '生産とIEの基礎', en: 'Basics of Production and IE', id: 'Dasar Produksi dan IE' },
  summary: {
    ja: 'IE（インダストリアル・エンジニアリング）とは何か、生産性・QCDS・4M・付加価値・3M・7つのムダといった、改善を学ぶための共通言語を身につけます。',
    en: 'Learn what Industrial Engineering (IE) is and acquire the common language of improvement: productivity, QCDS, 4M, value added, 3M and the 7 wastes.',
    id: 'Pelajari apa itu Industrial Engineering (IE) dan kuasai istilah umum untuk perbaikan: produktivitas, QCDS, 4M, nilai tambah, 3M, dan 7 pemborosan.'
  },
  objectives: [
    { ja: 'IEの目的と歴史的な成り立ちを説明できる', en: 'Explain the purpose of IE and how it developed historically', id: 'Menjelaskan tujuan IE dan sejarah perkembangannya' },
    { ja: '生産性を計算し、QCDS・4Mの枠組みで現場を捉えられる', en: 'Calculate productivity and view the shop floor through the QCDS and 4M frameworks', id: 'Menghitung produktivitas dan melihat lantai produksi dengan kerangka QCDS dan 4M' },
    { ja: '付加価値とムダを区別し、7つのムダを見分けられる', en: 'Distinguish value added from waste and identify the 7 wastes', id: 'Membedakan nilai tambah dari pemborosan dan mengenali 7 pemborosan' },
    { ja: 'ムダ・ムリ・ムラ（3M）の関係と、ムラがZEVAにつながる理由を説明できる', en: 'Explain the relationship among muda, muri and mura (3M) and why mura leads to ZEVA', id: 'Menjelaskan hubungan muda, muri, dan mura (3M) serta mengapa mura mengarah ke ZEVA' }
  ],
  sections: [
    {
      id: 'what-is-ie',
      title: { ja: 'IEとは何か', en: 'What is IE?', id: 'Apa itu IE?' },
      blocks: [
        { type: 'p', text: {
          ja: '[[industrial-engineering]]（IE）とは、**人・設備・材料・方法・情報**を組み合わせた「仕事のしくみ」を、科学的・工学的な方法で設計し、改善し、定着させるための技術です。勘や経験だけに頼るのではなく、**観察し、測り、数字で考え、仕組みを変える**のがIEの基本姿勢です。',
          en: '[[industrial-engineering]] (IE) is the discipline of designing, improving and sustaining the “system of work” — the combination of **people, machines, materials, methods and information** — using scientific and engineering methods. Instead of relying only on intuition and experience, the basic attitude of IE is to **observe, measure, think in numbers and change the system**.',
          id: '[[industrial-engineering]] (IE) adalah ilmu untuk merancang, memperbaiki, dan mempertahankan “sistem kerja” — gabungan **manusia, mesin, material, metode, dan informasi** — dengan metode ilmiah dan teknik. Alih-alih hanya mengandalkan intuisi dan pengalaman, sikap dasar IE adalah **mengamati, mengukur, berpikir dengan angka, dan mengubah sistem**.'
        } },
        { type: 'p', text: {
          ja: 'IEの本質は、仕事の中に潜む**ムダ・ムリ・ムラ**を見つけて取り除き、同じ資源でより多くの価値を、より安定して生み出すことにあります。',
          en: 'The essence of IE is to find and remove **muda, muri and mura** (waste, overburden, unevenness) hidden in work, so that the same resources produce more value, more stably.',
          id: 'Inti IE adalah menemukan dan menghilangkan **muda, muri, dan mura** (pemborosan, beban berlebih, ketidakrataan) yang tersembunyi dalam pekerjaan, sehingga sumber daya yang sama menghasilkan nilai lebih banyak dan lebih stabil.'
        } },
        { type: 'h', text: { ja: 'IEの歴史：3人の先駆者', en: 'History of IE: three pioneers', id: 'Sejarah IE: tiga pelopor' } },
        { type: 'cards', cols: 3, items: [
          { icon: '⏱', tone: 'navy',
            title: { ja: 'テイラー：時間研究', en: 'Taylor: time study', id: 'Taylor: studi waktu' },
            text: { ja: '19世紀末、作業をストップウォッチで測り「標準的な作業量」を科学的に決める科学的管理法を提唱しました。', en: 'In the late 19th century he measured work with a stopwatch and proposed scientific management — setting a standard amount of work scientifically.', id: 'Pada akhir abad ke-19 ia mengukur kerja dengan stopwatch dan mengusulkan manajemen ilmiah — menetapkan jumlah kerja standar secara ilmiah.' } },
          { icon: '✋', tone: 'blue',
            title: { ja: 'ギルブレス夫妻：動作研究', en: 'The Gilbreths: motion study', id: 'Keluarga Gilbreth: studi gerakan' },
            text: { ja: 'れんが積みなどの動作を撮影・分析し、動作を最小単位（サーブリッグ）に分けて「最良の方法」を追求しました。', en: 'They filmed and analysed motions such as bricklaying, split them into basic units (therbligs) and searched for the “one best way”.', id: 'Mereka merekam dan menganalisis gerakan seperti memasang bata, memecahnya menjadi unit dasar (therblig), dan mencari “cara terbaik”.' } },
          { icon: '🔄', tone: 'green',
            title: { ja: '現代：仕組みの改善へ', en: 'Today: improving the system', id: 'Kini: perbaikan sistem' },
            text: { ja: '時間・動作の研究は、工程分析、ラインバランス、品質管理、トヨタ生産方式などへ発展し、現代の改善活動の土台となっています。', en: 'Time and motion study evolved into process analysis, line balancing, quality control and lean production, forming the base of modern improvement activity.', id: 'Studi waktu dan gerakan berkembang menjadi analisis proses, line balancing, pengendalian kualitas, dan produksi lean, menjadi fondasi aktivitas perbaikan modern.' } }
        ] },
        { type: 'h', text: { ja: 'IEの2つの柱', en: 'Two pillars of IE', id: 'Dua pilar IE' } },
        { type: 'table',
          head: [ { ja: '柱', en: 'Pillar', id: 'Pilar' }, { ja: '問い', en: 'Question', id: 'Pertanyaan' }, { ja: '主な手法', en: 'Main methods', id: 'Metode utama' } ],
          rows: [
            [ { ja: '方法研究', en: 'Method study', id: 'Studi metode' }, { ja: 'どうやるのが最も良いか？', en: 'What is the best way to do it?', id: 'Bagaimana cara terbaik melakukannya?' }, { ja: '工程分析、動作研究、ECRS', en: 'Process analysis, motion study, ECRS', id: 'Analisis proses, studi gerakan, ECRS' } ],
            [ { ja: '作業測定', en: 'Work measurement', id: 'Pengukuran kerja' }, { ja: 'どれだけ時間がかかるか？', en: 'How long does it take?', id: 'Berapa lama waktunya?' }, { ja: '時間研究、標準時間、ワークサンプリング', en: 'Time study, standard time, work sampling', id: 'Studi waktu, waktu standar, work sampling' } ]
          ],
          caption: { ja: '方法を良くしてから時間を測る、が基本の順序です。', en: 'The basic order is: improve the method first, then measure the time.', id: 'Urutan dasarnya: perbaiki metode dahulu, lalu ukur waktunya.' } }
      ]
    },
    {
      id: 'productivity',
      title: { ja: '生産性とQCDS', en: 'Productivity and QCDS', id: 'Produktivitas dan QCDS' },
      blocks: [
        { type: 'p', text: {
          ja: '[[productivity]]とは、投入した資源（インプット）に対して、どれだけの成果（アウトプット）を得られたかを表す比率です。',
          en: '[[productivity]] is the ratio of results obtained (output) to resources invested (input).',
          id: '[[productivity]] adalah rasio hasil yang diperoleh (output) terhadap sumber daya yang digunakan (input).'
        } },
        { type: 'formula',
          expr: { ja: '生産性 = アウトプット ÷ インプット', en: 'Productivity = Output ÷ Input', id: 'Produktivitas = Output ÷ Input' },
          where: [
            { sym: 'Output', text: { ja: '生産数、良品数、付加価値額など', en: 'units produced, good units, value added, etc.', id: 'jumlah produksi, unit baik, nilai tambah, dll.' } },
            { sym: 'Input', text: { ja: '工数（人×時間）、設備時間、材料、エネルギーなど', en: 'man-hours, machine hours, materials, energy, etc.', id: 'jam-orang, jam mesin, material, energi, dll.' } }
          ],
          note: { ja: '現場でよく使うのは「労働生産性 = 生産数 ÷ 投入工数（台/人時）」です。', en: 'On the shop floor the most common is labour productivity = units ÷ man-hours (units per man-hour).', id: 'Di lantai produksi yang paling umum adalah produktivitas tenaga kerja = unit ÷ jam-orang (unit per jam-orang).' } },
        { type: 'example',
          title: { ja: '計算例：労働生産性', en: 'Worked example: labour productivity', id: 'Contoh perhitungan: produktivitas tenaga kerja' },
          steps: [
            { ja: 'ラインA：5人 × 8時間 = 40人時で、200台を生産', en: 'Line A: 5 people × 8 h = 40 man-hours, producing 200 units', id: 'Lini A: 5 orang × 8 jam = 40 jam-orang, menghasilkan 200 unit' },
            { ja: '生産性 = 200 ÷ 40 = 5.0 台/人時', en: 'Productivity = 200 ÷ 40 = 5.0 units/man-hour', id: 'Produktivitas = 200 ÷ 40 = 5,0 unit/jam-orang' },
            { ja: '改善後：4人 × 8時間 = 32人時で、同じ200台を生産', en: 'After improvement: 4 people × 8 h = 32 man-hours, same 200 units', id: 'Setelah perbaikan: 4 orang × 8 jam = 32 jam-orang, tetap 200 unit' },
            { ja: '生産性 = 200 ÷ 32 = 6.25 台/人時', en: 'Productivity = 200 ÷ 32 = 6.25 units/man-hour', id: 'Produktivitas = 200 ÷ 32 = 6,25 unit/jam-orang' }
          ],
          result: { ja: '生産性は 6.25 ÷ 5.0 = 1.25倍、つまり25%向上しました。', en: 'Productivity rose by 6.25 ÷ 5.0 = 1.25×, i.e. +25%.', id: 'Produktivitas naik 6,25 ÷ 5,0 = 1,25×, yaitu +25%.' } },
        { type: 'callout', kind: 'warn',
          title: { ja: '「速く働かせる」は生産性向上ではない', en: '“Make people work faster” is not productivity improvement', id: '“Menyuruh orang bekerja lebih cepat” bukan peningkatan produktivitas' },
          text: { ja: 'IEが目指すのは、作業者に無理をさせることではなく、**ムダな動きや待ちを仕組みでなくす**ことです。無理をさせるとムリ・ムラが増え、品質や安全が悪化します。', en: 'IE does not aim to overwork people; it aims to **remove wasted motion and waiting through the system**. Forcing speed increases muri and mura and worsens quality and safety.', id: 'IE tidak bertujuan memaksa orang bekerja berlebihan; tujuannya **menghilangkan gerakan dan waktu tunggu yang sia-sia melalui sistem**. Memaksa kecepatan menambah muri dan mura serta memperburuk kualitas dan keselamatan.' } },
        { type: 'h', text: { ja: 'QCDS：現場の評価軸', en: 'QCDS: the evaluation axes of the shop floor', id: 'QCDS: sumbu evaluasi lantai produksi' } },
        { type: 'p', text: {
          ja: '[[qcds]]は、ものづくりの成果を測る4つの基本軸です。環境（Environment）を加えてQCDSEとすることもあります。',
          en: '[[qcds]] are the four basic axes for measuring manufacturing results. Environment is sometimes added (QCDSE).',
          id: '[[qcds]] adalah empat sumbu dasar untuk mengukur hasil manufaktur. Kadang ditambah Environment (QCDSE).'
        } },
        { type: 'cards', cols: 4, items: [
          { icon: '✅', tone: 'green', title: { ja: 'Q：品質', en: 'Q: Quality', id: 'Q: Kualitas' }, text: { ja: '不良率、手直し、顧客クレーム', en: 'defect rate, repair, customer complaints', id: 'tingkat cacat, perbaikan, keluhan pelanggan' } },
          { icon: '💰', tone: 'blue', title: { ja: 'C：コスト', en: 'C: Cost', id: 'C: Biaya' }, text: { ja: '工数、材料費、在庫、エネルギー', en: 'man-hours, material cost, inventory, energy', id: 'jam-orang, biaya material, persediaan, energi' } },
          { icon: '🚚', tone: 'amber', title: { ja: 'D：納期', en: 'D: Delivery', id: 'D: Pengiriman' }, text: { ja: 'リードタイム、納期遵守率、生産量', en: 'lead time, on-time delivery, output', id: 'lead time, ketepatan kirim, volume produksi' } },
          { icon: '🦺', tone: 'red', title: { ja: 'S：安全', en: 'S: Safety', id: 'S: Keselamatan' }, text: { ja: '災害件数、ヒヤリハット、作業負荷', en: 'accidents, near misses, workload', id: 'kecelakaan, nyaris celaka, beban kerja' } }
        ] },
        { type: 'callout', kind: 'zeva',
          title: { ja: 'ZEVAとのつながり', en: 'Connection to ZEVA', id: 'Hubungan dengan ZEVA' },
          text: { ja: 'ZEVAは「バラツキこそがQCDSすべてのロスの根源」と考えます。一つひとつのQCDS指標を別々に追いかけるのではなく、その原因であるバラツキを制御することで、**QCDSを同時に改善**しようとします。', en: 'ZEVA holds that “variation is the root of all QCDS losses”. Rather than chasing each QCDS metric separately, it controls the variation that causes them, aiming to **improve QCDS simultaneously**.', id: 'ZEVA berpandangan bahwa “variasi adalah akar semua kerugian QCDS”. Alih-alih mengejar setiap metrik QCDS secara terpisah, ZEVA mengendalikan variasi penyebabnya untuk **memperbaiki QCDS secara bersamaan**.' } }
      ]
    },
    {
      id: '4m',
      title: { ja: '4M：生産の4要素', en: '4M: the four elements of production', id: '4M: empat unsur produksi' },
      blocks: [
        { type: 'p', text: {
          ja: 'どんな生産活動も、[[4m]]と呼ばれる4つの要素の組み合わせでできています。問題が起きたとき「4Mのどこが変わったか？」と考えるのが、原因を探す基本の型です。',
          en: 'Every production activity is a combination of four elements called [[4m]]. When a problem occurs, asking “which of the 4Ms changed?” is the basic pattern for finding the cause.',
          id: 'Setiap aktivitas produksi adalah kombinasi empat unsur yang disebut [[4m]]. Saat masalah muncul, bertanya “unsur 4M mana yang berubah?” adalah pola dasar mencari penyebab.'
        } },
        { type: 'table',
          head: [ { ja: '要素', en: 'Element', id: 'Unsur' }, { ja: '内容', en: 'Content', id: 'Isi' }, { ja: '変化・バラツキの例', en: 'Examples of change / variation', id: 'Contoh perubahan / variasi' } ],
          rows: [
            [ { ja: 'Man（人）', en: 'Man', id: 'Man (manusia)' }, { ja: '作業者のスキル・習熟・体調', en: 'skill, proficiency, condition of workers', id: 'keterampilan, kemahiran, kondisi pekerja' }, { ja: '新人とベテランで作業時間が倍違う', en: 'a newcomer takes twice as long as a veteran', id: 'pekerja baru butuh waktu dua kali lipat dibanding senior' } ],
            [ { ja: 'Machine（設備）', en: 'Machine', id: 'Machine (mesin)' }, { ja: '設備・治工具・測定器', en: 'equipment, jigs & tools, gauges', id: 'peralatan, jig & alat, alat ukur' }, { ja: '工具摩耗で寸法が少しずつずれる', en: 'tool wear makes dimensions drift', id: 'keausan alat membuat dimensi bergeser' } ],
            [ { ja: 'Material（材料）', en: 'Material', id: 'Material (bahan)' }, { ja: '原材料・部品・副資材', en: 'raw material, parts, consumables', id: 'bahan baku, komponen, bahan habis pakai' }, { ja: 'ロットにより部品の硬さが違う', en: 'part hardness differs by lot', id: 'kekerasan part berbeda per lot' } ],
            [ { ja: 'Method（方法）', en: 'Method', id: 'Method (metode)' }, { ja: '手順・条件・標準', en: 'procedures, conditions, standards', id: 'prosedur, kondisi, standar' }, { ja: '「しっかり締める」の解釈が人により違う', en: '“tighten firmly” is interpreted differently by each person', id: '“kencangkan dengan kuat” ditafsirkan berbeda oleh tiap orang' } ]
          ] },
        { type: 'callout', kind: 'zeva',
          title: { ja: '4Mから7要因へ', en: 'From 4M to 7 factors', id: 'Dari 4M ke 7 faktor' },
          text: { ja: 'ZEVAでは4Mに **Measurement（測定）・Management（管理）・Environment（環境）** を加えた「7つのバラツキ要因」を制御対象とします。詳しくはZEVA基礎トラックで学びます。', en: 'ZEVA extends the 4M with **Measurement, Management and Environment** into the “7 variation factors” it controls. You will study them in the ZEVA Foundations track.', id: 'ZEVA memperluas 4M dengan **Measurement, Management, dan Environment** menjadi “7 faktor variasi” yang dikendalikan. Anda akan mempelajarinya di jalur ZEVA Dasar.' } },
        { type: 'check',
          q: { ja: '「湿度が高い日に塗装不良が増える」。これは4Mのどれにも入りにくい要因です。ZEVAの7要因ではどれに当たるでしょう？', en: '“Painting defects increase on humid days.” This hardly fits any of the 4Ms. Which of ZEVA’s 7 factors is it?', id: '“Cacat pengecatan meningkat pada hari lembap.” Ini sulit masuk ke 4M. Termasuk faktor ZEVA yang mana?' },
          choices: [ { ja: 'Measurement（測定）', en: 'Measurement', id: 'Measurement' }, { ja: 'Environment（環境）', en: 'Environment', id: 'Environment' }, { ja: 'Management（管理）', en: 'Management', id: 'Management' } ],
          answer: 1,
          explain: { ja: '温度・湿度・照度などはEnvironment（環境）要因です。範囲を決めて管理します。', en: 'Temperature, humidity and lighting are Environment factors, managed within defined ranges.', id: 'Suhu, kelembapan, dan pencahayaan adalah faktor Environment, dikelola dalam rentang yang ditetapkan.' } }
      ]
    },
    {
      id: 'value-added',
      title: { ja: '付加価値とムダ', en: 'Value added and waste', id: 'Nilai tambah dan pemborosan' },
      blocks: [
        { type: 'p', text: {
          ja: '[[value-added]]とは、**お客様がお金を払ってもよいと思う変化**を製品に与えることです。部品を削る、組み付ける、締結する——形や性質が機能のために変わる瞬間が付加価値です。',
          en: '[[value-added]] means giving the product **a change the customer is willing to pay for**. Machining, assembling, fastening — the moments when shape or properties change for the product’s function are value added.',
          id: '[[value-added]] berarti memberi produk **perubahan yang bersedia dibayar pelanggan**. Memotong, merakit, mengencangkan — momen ketika bentuk atau sifat berubah untuk fungsi produk adalah nilai tambah.'
        } },
        { type: 'p', text: {
          ja: '一方、運ぶ・探す・待つ・数える・検査する、といった作業は製品を変化させません。これらは付加価値を生まない時間であり、減らすべき対象です。実際の現場では、作業時間のうち付加価値を生んでいる時間はごく一部であることが珍しくありません。',
          en: 'On the other hand, carrying, searching, waiting, counting and inspecting do not change the product. They are non-value time and should be reduced. On real shop floors it is common that only a small part of work time actually adds value.',
          id: 'Sebaliknya, membawa, mencari, menunggu, menghitung, dan memeriksa tidak mengubah produk. Itu adalah waktu tanpa nilai dan harus dikurangi. Di lantai produksi nyata, umum sekali hanya sebagian kecil waktu kerja yang benar-benar menambah nilai.'
        } },
        { type: 'compare',
          left: { title: { ja: '付加価値あり', en: 'Adds value', id: 'Menambah nilai' }, tone: 'green', items: [
            { ja: 'ボルトが規定トルクに達する瞬間', en: 'the moment a bolt reaches specified torque', id: 'saat baut mencapai torsi yang ditentukan' },
            { ja: 'ドリルが穴を開けている時間', en: 'the time a drill is cutting a hole', id: 'waktu bor sedang membuat lubang' },
            { ja: '塗料が表面に塗布される瞬間', en: 'the moment paint is applied to the surface', id: 'saat cat diaplikasikan ke permukaan' }
          ] },
          right: { title: { ja: '付加価値なし', en: 'Does not add value', id: 'Tidak menambah nilai' }, tone: 'red', items: [
            { ja: '部品棚まで歩いて取りに行く', en: 'walking to the parts shelf', id: 'berjalan ke rak part' },
            { ja: '工具を探す、持ち替える', en: 'searching for or switching tools', id: 'mencari atau berganti alat' },
            { ja: '前工程から部品が来るのを待つ', en: 'waiting for parts from the previous process', id: 'menunggu part dari proses sebelumnya' }
          ] } },
        { type: 'callout', kind: 'zeva',
          title: { ja: '理論値の3分類へ', en: 'Toward the three categories of the theoretical value', id: 'Menuju tiga kategori nilai teoretis' },
          text: { ja: 'ZEVAの基盤である理論値では、作業を**価値・準価値・無価値**の3つに厳密に分けます。「部品を掴む」のように今の工法では必要最小限な作業を「準価値」として区別するのが特徴です。', en: 'Theoretical value, the base of ZEVA, strictly splits work into **value, semi-value and non-value**. It distinguishes work that is minimally necessary with the current method, such as “grasping a part”, as semi-value.', id: 'Nilai teoretis, dasar ZEVA, membagi pekerjaan secara ketat menjadi **bernilai, semi-nilai, dan tanpa nilai**. Pekerjaan yang minimal diperlukan dengan metode sekarang, seperti “memegang part”, dibedakan sebagai semi-nilai.' } }
      ]
    },
    {
      id: '3m',
      title: { ja: '3M：ムダ・ムリ・ムラ', en: '3M: muda, muri, mura', id: '3M: muda, muri, mura' },
      blocks: [
        { type: 'p', text: {
          ja: '改善の対象は、次の3つの頭文字をとって「3M（ダラリ）」と呼ばれます。3つは互いに原因と結果の関係でつながっています。',
          en: 'The targets of improvement are called “3M” after three Japanese words. The three are linked to each other as causes and effects.',
          id: 'Sasaran perbaikan disebut “3M” dari tiga kata Jepang. Ketiganya saling terhubung sebagai sebab dan akibat.'
        } },
        { type: 'cards', cols: 3, items: [
          { icon: '🗑', tone: 'amber', title: { ja: 'ムダ（Muda）', en: 'Muda (waste)', id: 'Muda (pemborosan)' },
            text: { ja: '[[muda]]：付加価値を生まない活動。能力 ＞ 負荷 の状態。例：手待ち、運搬、作りすぎ。', en: '[[muda]]: activity that adds no value. Capacity > load. e.g. waiting, transport, overproduction.', id: '[[muda]]: aktivitas tanpa nilai tambah. Kapasitas > beban. Contoh: menunggu, transportasi, produksi berlebih.' } },
          { icon: '🏋', tone: 'red', title: { ja: 'ムリ（Muri）', en: 'Muri (overburden)', id: 'Muri (beban berlebih)' },
            text: { ja: '[[muri]]：人や設備に能力以上の負担をかけること。能力 ＜ 負荷 の状態。例：重量物を無理な姿勢で持つ、設備の過負荷運転。', en: '[[muri]]: loading people or machines beyond capacity. Capacity < load. e.g. lifting heavy items in bad posture, overloading machines.', id: '[[muri]]: membebani orang atau mesin melebihi kapasitas. Kapasitas < beban. Contoh: mengangkat benda berat dengan postur buruk, mesin kelebihan beban.' } },
          { icon: '〰', tone: 'blue', title: { ja: 'ムラ（Mura）', en: 'Mura (unevenness)', id: 'Mura (ketidakrataan)' },
            text: { ja: '[[mura]]：ムダとムリが混在し、状態が一定しないこと。例：日によって生産量が大きく変わる、作業時間が毎回違う。', en: '[[mura]]: muda and muri alternate and the state is not constant. e.g. output varies greatly by day, work time differs every cycle.', id: '[[mura]]: muda dan muri bergantian dan kondisi tidak konstan. Contoh: produksi sangat berbeda tiap hari, waktu kerja berbeda tiap siklus.' } }
        ] },
        { type: 'example',
          title: { ja: 'ムラがムリとムダを生む例', en: 'Example: mura creates muri and muda', id: 'Contoh: mura menimbulkan muri dan muda' },
          steps: [
            { ja: 'ある工程の作業時間が、25秒の時もあれば45秒の時もある（ムラ）', en: 'A process takes 25 s sometimes and 45 s at other times (mura)', id: 'Suatu proses kadang 25 detik, kadang 45 detik (mura)' },
            { ja: '45秒の時、後工程は部品が来ずに手待ちになる（ムダ）', en: 'At 45 s, the next process waits for parts (muda)', id: 'Saat 45 detik, proses berikutnya menunggu part (muda)' },
            { ja: '遅れを取り戻そうと、作業者が急いで作業する（ムリ）', en: 'To catch up, the worker rushes (muri)', id: 'Untuk mengejar, pekerja terburu-buru (muri)' },
            { ja: '急いだ結果、締め忘れなどの不良が出る（品質ロス）', en: 'Rushing causes defects such as missed tightening (quality loss)', id: 'Terburu-buru menimbulkan cacat seperti lupa mengencangkan (kerugian kualitas)' }
          ],
          result: { ja: 'ムラを放置すると、ムダとムリが連鎖的に発生します。', en: 'If mura is left alone, muda and muri follow in a chain.', id: 'Jika mura dibiarkan, muda dan muri muncul berantai.' } },
        { type: 'callout', kind: 'zeva',
          title: { ja: 'ムラ ＝ バラツキ：ZEVAの出発点', en: 'Mura = variation: the starting point of ZEVA', id: 'Mura = variasi: titik awal ZEVA' },
          text: { ja: '従来の改善は「ムダ取り」が中心でした。しかしムラ（バラツキ）が大きい現場では、測るたびに値が変わり、どこが本当のロスかを正しく評価できません。ZEVAは改善の焦点を**ムダ取りからバラツキ（ムラ）撲滅へ**シフトさせた生産方式です。', en: 'Traditional improvement focused on “removing waste”. But where mura (variation) is large, values change every time you measure, and you cannot correctly judge where the real loss is. ZEVA is a production system that shifts the focus **from waste removal to eliminating variation (mura)**.', id: 'Perbaikan tradisional berfokus pada “menghilangkan pemborosan”. Tetapi jika mura (variasi) besar, nilai berubah setiap diukur dan kerugian sebenarnya tidak dapat dinilai dengan benar. ZEVA adalah sistem produksi yang menggeser fokus **dari penghilangan pemborosan ke pemberantasan variasi (mura)**.' } }
      ]
    },
    {
      id: 'seven-wastes',
      title: { ja: '7つのムダ', en: 'The 7 wastes', id: '7 pemborosan' },
      blocks: [
        { type: 'p', text: {
          ja: 'ムダを見つけやすくするために、代表的なムダを7種類に分類したものが[[seven-wastes]]です。「このムダはどれか？」と名前をつけられると、現場でムダが見えるようになります。',
          en: 'To make waste easier to spot, typical wastes are classified into the [[seven-wastes]]. Once you can name “which waste is this?”, waste becomes visible on the floor.',
          id: 'Agar pemborosan mudah dikenali, pemborosan umum diklasifikasikan menjadi [[seven-wastes]]. Setelah bisa menamai “ini pemborosan yang mana?”, pemborosan menjadi terlihat di lantai produksi.'
        } },
        { type: 'table',
          head: [ { ja: 'ムダ', en: 'Waste', id: 'Pemborosan' }, { ja: '内容', en: 'Description', id: 'Deskripsi' }, { ja: '現場の例', en: 'Floor example', id: 'Contoh di lantai' } ],
          rows: [
            [ { ja: '① 作りすぎのムダ', en: '① Overproduction', id: '① Produksi berlebih' }, { ja: '必要以上・必要より早く作る。最悪のムダ', en: 'making more or earlier than needed; the worst waste', id: 'membuat lebih banyak atau lebih awal dari kebutuhan; pemborosan terburuk' }, { ja: '次の注文分まで先に作って積んでおく', en: 'building ahead for the next order and stacking it', id: 'membuat di muka untuk pesanan berikutnya dan menumpuknya' } ],
            [ { ja: '② 手待ちのムダ', en: '② Waiting', id: '② Menunggu' }, { ja: '人や設備が何もせず待つ', en: 'people or machines idle', id: 'orang atau mesin menganggur' }, { ja: '設備の自動運転をじっと見ている', en: 'watching a machine run its automatic cycle', id: 'menonton mesin menjalankan siklus otomatis' } ],
            [ { ja: '③ 運搬のムダ', en: '③ Transport', id: '③ Transportasi' }, { ja: '必要以上のモノの移動・積み替え', en: 'unnecessary moving or re-handling of goods', id: 'pemindahan atau bongkar muat barang yang tidak perlu' }, { ja: '仮置き場を経由して2回運ぶ', en: 'moving twice via a temporary storage area', id: 'memindahkan dua kali lewat area simpan sementara' } ],
            [ { ja: '④ 加工そのもののムダ', en: '④ Over-processing', id: '④ Proses berlebih' }, { ja: '品質に寄与しない余計な加工', en: 'extra processing that adds no quality', id: 'proses tambahan yang tidak menambah kualitas' }, { ja: '見えない面まで鏡面仕上げする', en: 'polishing a hidden surface to a mirror finish', id: 'memoles permukaan tersembunyi hingga mengilap' } ],
            [ { ja: '⑤ 在庫のムダ', en: '⑤ Inventory', id: '⑤ Persediaan' }, { ja: '材料・仕掛品・製品の滞留', en: 'stagnant materials, WIP, products', id: 'material, WIP, produk yang tertahan' }, { ja: '工程間に仕掛品が山積み', en: 'piles of WIP between processes', id: 'tumpukan WIP antar proses' } ],
            [ { ja: '⑥ 動作のムダ', en: '⑥ Motion', id: '⑥ Gerakan' }, { ja: '付加価値を生まない体の動き', en: 'body motion that adds no value', id: 'gerakan tubuh tanpa nilai tambah' }, { ja: '部品を取るたびに振り返る・かがむ', en: 'turning or bending every time to pick a part', id: 'berbalik atau membungkuk setiap mengambil part' } ],
            [ { ja: '⑦ 不良をつくるムダ', en: '⑦ Defects', id: '⑦ Cacat' }, { ja: '不良・手直し・廃棄', en: 'defects, repair, scrap', id: 'cacat, perbaikan, barang afkir' }, { ja: '組付けミスを分解して再組立', en: 'disassembling and reassembling after a mistake', id: 'membongkar dan merakit ulang setelah kesalahan' } ]
          ] },
        { type: 'callout', kind: 'key',
          title: { ja: 'なぜ「作りすぎ」が最悪なのか', en: 'Why overproduction is the worst', id: 'Mengapa produksi berlebih paling buruk' },
          text: { ja: '作りすぎは在庫・運搬・保管スペースを生み、さらに不良や手待ちなど**他のムダを覆い隠して**しまうからです。', en: 'Overproduction creates inventory, transport and storage space, and **hides other wastes** such as defects and waiting.', id: 'Produksi berlebih menciptakan persediaan, transportasi, dan ruang simpan, serta **menyembunyikan pemborosan lain** seperti cacat dan menunggu.' } },
        { type: 'widget', name: 'sort-game', props: {
          title: { ja: 'どのムダ？ 現場の例を分類しよう', en: 'Which waste? Classify the floor examples', id: 'Pemborosan yang mana? Klasifikasikan contoh berikut' },
          bins: [
            { id: 'over', label: { ja: '作りすぎ', en: 'Overproduction', id: 'Produksi berlebih' }, tone: 'red' },
            { id: 'wait', label: { ja: '手待ち', en: 'Waiting', id: 'Menunggu' }, tone: 'amber' },
            { id: 'trans', label: { ja: '運搬', en: 'Transport', id: 'Transportasi' }, tone: 'blue' },
            { id: 'proc', label: { ja: '加工そのもの', en: 'Over-processing', id: 'Proses berlebih' }, tone: 'gray' },
            { id: 'inv', label: { ja: '在庫', en: 'Inventory', id: 'Persediaan' }, tone: 'navy' },
            { id: 'motion', label: { ja: '動作', en: 'Motion', id: 'Gerakan' }, tone: 'green' },
            { id: 'defect', label: { ja: '不良', en: 'Defects', id: 'Cacat' }, tone: 'red' }
          ],
          items: [
            { text: { ja: '部品箱が作業台の後ろにあり、毎回振り返って取る', en: 'The parts box is behind the bench; the worker turns around every time', id: 'Kotak part ada di belakang meja; pekerja berbalik setiap kali' }, bin: 'motion', explain: { ja: '体の余計な動き＝動作のムダ。部品を手元に置けば消えます。', en: 'Unnecessary body motion = motion waste. Placing parts within reach removes it.', id: 'Gerakan tubuh berlebih = pemborosan gerakan. Letakkan part dalam jangkauan.' } },
            { text: { ja: '後工程が止まっているのに、ラインの最初で生産を続けた', en: 'The first process kept producing although the downstream was stopped', id: 'Proses awal terus produksi padahal proses hilir berhenti' }, bin: 'over', explain: { ja: '必要以上に早く作っている＝作りすぎのムダです。', en: 'Making earlier than needed = overproduction.', id: 'Membuat lebih awal dari kebutuhan = produksi berlebih.' } },
            { text: { ja: '設備の加工が終わるまで、作業者が横で立って見ている', en: 'The worker stands and watches until the machine finishes', id: 'Pekerja berdiri menonton sampai mesin selesai' }, bin: 'wait', explain: { ja: '人が何もしていない時間＝手待ちのムダです。', en: 'Time when the person does nothing = waiting.', id: 'Waktu orang tidak melakukan apa-apa = menunggu.' } },
            { text: { ja: 'フォークリフトで一度仮置き場に置き、後でまたラインへ運ぶ', en: 'A forklift drops goods at temporary storage and later moves them again to the line', id: 'Forklift menaruh barang di area sementara lalu memindahkannya lagi ke lini' }, bin: 'trans', explain: { ja: '二度運び＝運搬のムダです。', en: 'Double handling = transport waste.', id: 'Pemindahan ganda = pemborosan transportasi.' } },
            { text: { ja: '工程間に仕掛品が3日分たまっている', en: 'Three days of WIP have piled up between processes', id: 'WIP tiga hari menumpuk antar proses' }, bin: 'inv', explain: { ja: '滞留しているモノ＝在庫のムダです。', en: 'Stagnant goods = inventory waste.', id: 'Barang tertahan = pemborosan persediaan.' } },
            { text: { ja: '図面で要求されていない面まで研磨している', en: 'Grinding a surface the drawing does not require', id: 'Menggerinda permukaan yang tidak diminta gambar' }, bin: 'proc', explain: { ja: '品質に寄与しない余計な加工＝加工そのもののムダです。', en: 'Extra work with no quality benefit = over-processing.', id: 'Kerja tambahan tanpa manfaat kualitas = proses berlebih.' } },
            { text: { ja: '配線の差し間違いが見つかり、分解してやり直した', en: 'A mis-inserted wire was found; the unit was disassembled and redone', id: 'Kabel salah pasang ditemukan; unit dibongkar dan dikerjakan ulang' }, bin: 'defect', explain: { ja: '手直し＝不良をつくるムダです。', en: 'Rework = defect waste.', id: 'Pengerjaan ulang = pemborosan cacat.' } },
            { text: { ja: '工具が決まった場所になく、毎回探している', en: 'Tools have no fixed place, so the worker searches every time', id: 'Alat tidak punya tempat tetap, pekerja mencarinya setiap kali' }, bin: 'motion', explain: { ja: '「探す」は動作のムダ。3定（定位置・定品・定量）で解消します。', en: '“Searching” is motion waste, solved by fixed position/item/quantity.', id: '“Mencari” adalah pemborosan gerakan, diatasi dengan posisi/barang/jumlah tetap.' } }
          ]
        } }
      ]
    },
    {
      id: 'see-with-ie-eyes',
      title: { ja: 'IEの目で現場を見る', en: 'Seeing the floor with IE eyes', id: 'Melihat lantai produksi dengan mata IE' },
      blocks: [
        { type: 'p', text: {
          ja: 'IEの手法を学ぶ前に、改善の基本的な進め方を押さえておきましょう。このトラックの各モジュールは、この流れのどこかで使う道具です。',
          en: 'Before learning individual IE techniques, grasp the basic flow of improvement. Each module in this track is a tool used somewhere in this flow.',
          id: 'Sebelum mempelajari teknik IE satu per satu, pahami alur dasar perbaikan. Setiap modul di jalur ini adalah alat yang dipakai di salah satu tahap alur ini.'
        } },
        { type: 'flow', dir: 'h', nodes: [
          { title: { ja: '① 観察する', en: '① Observe', id: '① Amati' }, text: { ja: '現場・現物・現実を見る', en: 'go and see the real place and things', id: 'lihat tempat dan barang nyata' }, tone: 'navy' },
          { title: { ja: '② 測る', en: '② Measure', id: '② Ukur' }, text: { ja: '時間・回数・距離を数値化', en: 'quantify time, counts, distance', id: 'kuantifikasi waktu, jumlah, jarak' }, tone: 'blue' },
          { title: { ja: '③ 分析する', en: '③ Analyse', id: '③ Analisis' }, text: { ja: 'ムダ・ムリ・ムラを特定', en: 'identify muda, muri, mura', id: 'identifikasi muda, muri, mura' }, tone: 'amber' },
          { title: { ja: '④ 改善する', en: '④ Improve', id: '④ Perbaiki' }, text: { ja: 'ECRSで方法を変える', en: 'change the method with ECRS', id: 'ubah metode dengan ECRS' }, tone: 'green' },
          { title: { ja: '⑤ 標準化する', en: '⑤ Standardize', id: '⑤ Standarkan' }, text: { ja: '良い方法を標準にして守る', en: 'make the good method the standard', id: 'jadikan metode baik sebagai standar' }, tone: 'gray' }
        ] },
        { type: 'table',
          head: [ { ja: 'モジュール', en: 'Module', id: 'Modul' }, { ja: '身につく道具', en: 'Tool you gain', id: 'Alat yang diperoleh' } ],
          rows: [
            [ 'ie-02', { ja: 'TT・CT・リードタイムで「必要なペース」と「実力」を比べる', en: 'compare required pace and actual ability with TT, CT, lead time', id: 'membandingkan ritme yang dibutuhkan dan kemampuan aktual dengan TT, CT, lead time' } ],
            [ 'ie-03', { ja: '時間研究で作業時間を正しく測り、標準時間を決める', en: 'measure work time correctly and set standard time', id: 'mengukur waktu kerja dengan benar dan menetapkan waktu standar' } ],
            [ 'ie-04', { ja: '動作研究で動きのムダを見つける', en: 'find motion waste with motion study', id: 'menemukan pemborosan gerakan dengan studi gerakan' } ],
            [ 'ie-05', { ja: '工程分析で流れ全体のムダを見つける', en: 'find waste in the whole flow with process analysis', id: 'menemukan pemborosan di seluruh aliran dengan analisis proses' } ],
            [ 'ie-06', { ja: 'ラインバランスで工程間の偏りをなくす', en: 'remove imbalance between processes with line balancing', id: 'menghilangkan ketidakseimbangan antar proses dengan line balancing' } ],
            [ 'ie-07', { ja: 'OEEで設備のロスを見える化する', en: 'visualise equipment losses with OEE', id: 'memvisualkan kerugian mesin dengan OEE' } ],
            [ 'ie-08 / ie-09', { ja: '統計・管理図・工程能力でバラツキを数字で扱う', en: 'handle variation numerically with statistics, control charts, capability', id: 'menangani variasi secara numerik dengan statistik, peta kendali, kapabilitas' } ],
            [ 'ie-10', { ja: '5S・標準作業・ECRS・QC手法で改善を実行し定着させる', en: 'implement and sustain improvement with 5S, standard work, ECRS, QC tools', id: 'melaksanakan dan mempertahankan perbaikan dengan 5S, kerja standar, ECRS, alat QC' } ]
          ] },
        { type: 'callout', kind: 'tip',
          title: { ja: '三現主義', en: 'The three “gen” principle', id: 'Prinsip tiga “gen”' },
          text: { ja: '**現場**（実際の場所）で、**現物**（実際のモノ）を見て、**現実**（実際の事実）を捉える。会議室のデータだけで判断しないことが、IEの第一歩です。', en: 'Go to the **real place**, look at the **real thing**, grasp the **real facts**. Not judging only from data in the meeting room is the first step of IE.', id: 'Pergi ke **tempat nyata**, lihat **barang nyata**, pahami **fakta nyata**. Tidak menilai hanya dari data di ruang rapat adalah langkah pertama IE.' } }
      ]
    }
  ],
  keyPoints: [
    { ja: 'IEは、人・設備・材料・方法の「仕事のしくみ」を観察・測定・分析して改善する工学的手法である', en: 'IE improves the system of work (people, machines, materials, methods) by observing, measuring and analysing', id: 'IE memperbaiki sistem kerja (manusia, mesin, material, metode) dengan mengamati, mengukur, dan menganalisis' },
    { ja: '生産性 = アウトプット ÷ インプット。無理に速く働かせるのではなく、ムダを仕組みで取り除く', en: 'Productivity = output ÷ input — remove waste through the system, not by forcing speed', id: 'Produktivitas = output ÷ input — hilangkan pemborosan lewat sistem, bukan memaksa kecepatan' },
    { ja: '成果はQCDSで評価し、原因は4Mで考える', en: 'Evaluate results with QCDS; think about causes with 4M', id: 'Nilai hasil dengan QCDS; pikirkan penyebab dengan 4M' },
    { ja: '7つのムダの中で最悪なのは作りすぎのムダ', en: 'Among the 7 wastes, overproduction is the worst', id: 'Di antara 7 pemborosan, produksi berlebih yang terburuk' },
    { ja: 'ムラ（バラツキ）はムダとムリを生む。ZEVAはこのムラに焦点を当てる', en: 'Mura (variation) breeds muda and muri; ZEVA focuses on this mura', id: 'Mura (variasi) melahirkan muda dan muri; ZEVA berfokus pada mura ini' }
  ],
  quiz: [
    { q: { ja: '5人×8時間で240台生産するラインの労働生産性は？', en: 'A line produces 240 units with 5 people × 8 hours. What is labour productivity?', id: 'Lini memproduksi 240 unit dengan 5 orang × 8 jam. Berapa produktivitas tenaga kerja?' },
      choices: [ { ja: '6.0 台/人時', en: '6.0 units/man-hour', id: '6,0 unit/jam-orang' }, { ja: '48 台/人', en: '48 units/person', id: '48 unit/orang' }, { ja: '30 台/時間', en: '30 units/hour', id: '30 unit/jam' }, { ja: '1.2 台/人時', en: '1.2 units/man-hour', id: '1,2 unit/jam-orang' } ],
      answer: 0,
      explain: { ja: '投入工数 = 5 × 8 = 40人時。240 ÷ 40 = 6.0 台/人時です。', en: 'Man-hours = 5 × 8 = 40. 240 ÷ 40 = 6.0 units/man-hour.', id: 'Jam-orang = 5 × 8 = 40. 240 ÷ 40 = 6,0 unit/jam-orang.' } },
    { q: { ja: 'QCDSの「D」が表すものは？', en: 'What does “D” in QCDS stand for?', id: 'Apa arti “D” dalam QCDS?' },
      choices: [ { ja: '設計（Design）', en: 'Design', id: 'Desain' }, { ja: '納期（Delivery）', en: 'Delivery', id: 'Pengiriman (Delivery)' }, { ja: '不良（Defect）', en: 'Defect', id: 'Cacat' }, { ja: 'データ（Data）', en: 'Data', id: 'Data' } ],
      answer: 1,
      explain: { ja: 'Q=品質、C=コスト、D=納期、S=安全です。', en: 'Q = quality, C = cost, D = delivery, S = safety.', id: 'Q = kualitas, C = biaya, D = pengiriman, S = keselamatan.' } },
    { q: { ja: '次のうち、付加価値を生んでいる作業はどれ？', en: 'Which of the following adds value?', id: 'Manakah yang menambah nilai?' },
      choices: [ { ja: '部品を検査台まで運ぶ', en: 'Carrying parts to the inspection table', id: 'Membawa part ke meja inspeksi' }, { ja: '完成品の数を数える', en: 'Counting finished products', id: 'Menghitung produk jadi' }, { ja: 'ねじを締結して部品を固定する', en: 'Fastening a screw to fix a part', id: 'Mengencangkan sekrup untuk memasang part' }, { ja: '次の部品が来るまで待つ', en: 'Waiting for the next part', id: 'Menunggu part berikutnya' } ],
      answer: 2,
      explain: { ja: '製品の状態を機能のために変化させているのは締結だけです。運ぶ・数える・待つは変化を与えません。', en: 'Only fastening changes the product for its function. Carrying, counting and waiting do not.', id: 'Hanya pengencangan yang mengubah produk untuk fungsinya. Membawa, menghitung, dan menunggu tidak.' } },
    { q: { ja: '7つのムダのうち、他のムダを覆い隠すため「最悪」とされるのは？', en: 'Which of the 7 wastes is called the worst because it hides other wastes?', id: 'Pemborosan mana yang disebut terburuk karena menyembunyikan pemborosan lain?' },
      choices: [ { ja: '動作のムダ', en: 'Motion', id: 'Gerakan' }, { ja: '作りすぎのムダ', en: 'Overproduction', id: 'Produksi berlebih' }, { ja: '手待ちのムダ', en: 'Waiting', id: 'Menunggu' }, { ja: '加工そのもののムダ', en: 'Over-processing', id: 'Proses berlebih' } ],
      answer: 1,
      explain: { ja: '作りすぎは在庫・運搬を生み、不良や待ちなどの問題を見えなくします。', en: 'Overproduction creates inventory and transport and makes problems like defects and waiting invisible.', id: 'Produksi berlebih menciptakan persediaan dan transportasi serta membuat masalah seperti cacat dan menunggu tak terlihat.' } },
    { q: { ja: '「作業時間が毎回25秒〜45秒と変わる」状態は3Mのどれ？', en: '“Work time changes between 25 s and 45 s each cycle” is which of the 3Ms?', id: '“Waktu kerja berubah 25–45 detik tiap siklus” termasuk 3M yang mana?' },
      choices: [ { ja: 'ムダ', en: 'Muda', id: 'Muda' }, { ja: 'ムリ', en: 'Muri', id: 'Muri' }, { ja: 'ムラ', en: 'Mura', id: 'Mura' }, { ja: 'どれでもない', en: 'None', id: 'Tidak ada' } ],
      answer: 2,
      explain: { ja: '状態が一定しない＝ムラ（バラツキ）です。ムラはムダとムリを誘発します。', en: 'An unstable state = mura (variation), which triggers muda and muri.', id: 'Kondisi tidak stabil = mura (variasi), yang memicu muda dan muri.' } },
    { q: { ja: '4M（Man, Machine, Material, Method）にZEVAが加えて7要因とするものの組み合わせは？', en: 'Which set does ZEVA add to the 4M to make 7 factors?', id: 'Set mana yang ditambahkan ZEVA ke 4M menjadi 7 faktor?' },
      choices: [ { ja: 'Money・Market・Motivation', en: 'Money, Market, Motivation', id: 'Money, Market, Motivation' }, { ja: 'Measurement・Management・Environment', en: 'Measurement, Management, Environment', id: 'Measurement, Management, Environment' }, { ja: 'Maintenance・Model・Energy', en: 'Maintenance, Model, Energy', id: 'Maintenance, Model, Energy' }, { ja: 'Mind・Method2・Education', en: 'Mind, Method 2, Education', id: 'Mind, Method 2, Education' } ],
      answer: 1,
      explain: { ja: 'ZEVAの7つのバラツキ要因は、4M＋測定・管理・環境です。', en: 'ZEVA’s 7 variation factors are the 4M plus measurement, management and environment.', id: '7 faktor variasi ZEVA adalah 4M ditambah measurement, management, dan environment.' } },
    { q: { ja: 'IEで「方法研究」と「作業測定」を行う基本の順序は？', en: 'What is the basic order of method study and work measurement in IE?', id: 'Bagaimana urutan dasar studi metode dan pengukuran kerja dalam IE?' },
      choices: [ { ja: '先に時間を測り、あとで方法を考える', en: 'Measure time first, then think about the method', id: 'Ukur waktu dulu, lalu pikirkan metode' }, { ja: '方法を良くしてから時間を測る', en: 'Improve the method first, then measure time', id: 'Perbaiki metode dulu, lalu ukur waktu' }, { ja: 'どちらか一方だけ行えばよい', en: 'Only one of them is needed', id: 'Cukup salah satu' }, { ja: '順序に意味はない', en: 'The order does not matter', id: 'Urutan tidak penting' } ],
      answer: 1,
      explain: { ja: '悪い方法の時間を精密に測っても意味が薄いため、まず方法を改善し、その方法の時間を測って標準にします。', en: 'Precisely timing a bad method has little value, so first improve the method, then time it and make it the standard.', id: 'Mengukur waktu metode yang buruk kurang bermakna, jadi perbaiki metode dulu, lalu ukur dan jadikan standar.' } }
  ]
});
