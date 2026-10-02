(function () {
  const T = (ja, en, id) => ({ ja, en, id });

  ZA.addModule({
    id: 'z1-03',
    track: 'z1',
    order: 3,
    minutes: 40,
    icon: '🏛',
    level: 1,
    prereq: ['z1-02', 'ie-10'],
    title: T('原則体系：土台＋3原則', 'Principle system: foundation + 3 principles', 'Sistem prinsip: fondasi + 3 prinsip'),
    summary: T(
      'ZEVAの行動指針である「標準化の土台」と「3つの原則」、そしてそれらが生み出す持続的改善の循環構造を学びます。',
      'Learn ZEVA’s guiding structure — the foundation of standardization and the three principles — and the cycle of sustainable improvement they create.',
      'Pelajari struktur panduan ZEVA — fondasi standardisasi dan tiga prinsip — serta siklus perbaikan berkelanjutan yang dihasilkannya.'
    ),
    objectives: [
      T('土台（標準化）の4要素を挙げ、なぜ「土台」なのか説明できる', 'List the 4 elements of the foundation and explain why it is the "foundation"', 'Menyebutkan 4 elemen fondasi dan menjelaskan mengapa itu "fondasi"'),
      T('Quick標準化とDeep標準化の違いと、Deep標準化を使う箇所を判断できる', 'Explain the difference between Quick and Deep standardization and judge where Deep standardization is needed', 'Menjelaskan perbedaan standardisasi Quick dan Deep serta menilai di mana standardisasi Deep diperlukan'),
      T('3原則それぞれが答える「問い」を説明できる', 'Explain the "question" each of the 3 principles answers', 'Menjelaskan "pertanyaan" yang dijawab oleh setiap prinsip'),
      T('「土台→原則→改善→土台更新」の循環を説明できる', 'Explain the cycle "foundation → principles → improvement → updated foundation"', 'Menjelaskan siklus "fondasi → prinsip → perbaikan → fondasi diperbarui"'),
      T('原則体系と4層構造・導入ロードマップの対応を説明できる', 'Map the principle system to the 4 layers and the implementation roadmap', 'Memetakan sistem prinsip ke 4 lapis dan peta jalan implementasi')
    ],
    sections: [
      {
        id: 'overview',
        title: T('全体像：なぜ「土台＋3原則」なのか', 'Overview: why "foundation + 3 principles"?', 'Gambaran: mengapa "fondasi + 3 prinsip"?'),
        blocks: [
          { type: 'p', text: T(
            'ZEVAの行動指針は、**標準化という土台**の上に**3つの原則**が立つ、階層構造になっています。家にたとえるなら、土台がなければどんなに立派な柱（原則）も傾いてしまいます。',
            'ZEVA’s guiding principles form a hierarchy: **three principles** stand on a **foundation of standardization**. Like a house, without a foundation even the finest pillars (principles) will lean.',
            'Prinsip panduan ZEVA membentuk hierarki: **tiga prinsip** berdiri di atas **fondasi standardisasi**. Seperti rumah, tanpa fondasi pilar (prinsip) terbaik pun akan miring.'
          ) },
          { type: 'diagram', name: 'zeva-house', caption: T('ZEVAの原則体系（土台＋3原則）', 'ZEVA principle system (foundation + 3 principles)', 'Sistem prinsip ZEVA (fondasi + 3 prinsip)') },
          { type: 'callout', kind: 'note', title: T('「思考の指針」と「環境づくり」を分ける', 'Separating "guides for thinking" from "building the environment"', 'Memisahkan "panduan berpikir" dari "membangun lingkungan"'), text: T(
            'かつて5S・3定は3原則の一つとして並べられていました。しかし原則①②は「何に着目し、どこを目指すか」という**思考・判断の指針**であり、5S・3定は「再現性を保証する**物理的な環境づくり**」です。性質が異なるため、5S・3定は土台へ移り、改善を標準に還元するPDCA+Sが原則③に位置づけられました。',
            '5S / 3-tei was once listed as one of the three principles. But principles ① and ② are **guides for thinking and judgment** ("what to focus on, where to aim"), while 5S / 3-tei is **building a physical environment** that guarantees reproducibility. Because their nature differs, 5S / 3-tei moved into the foundation, and PDCA+S — which returns improvement to the standard — became Principle ③.',
            '5S / 3-tei dulu dicantumkan sebagai salah satu dari tiga prinsip. Namun prinsip ① dan ② adalah **panduan berpikir dan menilai** ("apa yang difokuskan, ke mana dituju"), sedangkan 5S / 3-tei adalah **membangun lingkungan fisik** yang menjamin reprodusibilitas. Karena sifatnya berbeda, 5S / 3-tei dipindahkan ke fondasi, dan PDCA+S — yang mengembalikan perbaikan ke standar — menjadi Prinsip ③.'
          ) },
          { type: 'table',
            head: [T('要素', 'Element', 'Elemen'), T('答える問い', 'Question it answers', 'Pertanyaan yang dijawab'), T('キーワード', 'Keyword', 'Kata kunci')],
            rows: [
              [T('土台：標準化', 'Foundation: standardization', 'Fondasi: standardisasi'), T('再現性をどう保証するか？', 'How do we guarantee reproducibility?', 'Bagaimana menjamin reprodusibilitas?'), T('標準無きところに改善なし', 'No improvement without standards', 'Tidak ada perbaikan tanpa standar')],
              [T('原則①：バラツキ対策', 'Principle ①: variation countermeasure', 'Prinsip ①: penanggulangan variasi'), T('何に着目するか？', 'What do we focus on?', 'Apa yang difokuskan?'), T('ロスの根源を断つ', 'Cut the root of loss', 'Putus akar kerugian')],
              [T('原則②：理論値ベース思考', 'Principle ②: theoretical-value thinking', 'Prinsip ②: berpikir berbasis nilai teoretis'), T('どこを目指すか？', 'Where do we aim?', 'Ke mana kita menuju?'), T('あるべき姿から逆算する', 'Work backward from the ideal', 'Mundur dari kondisi ideal')],
              [T('原則③：PDCA+S', 'Principle ③: PDCA+S', 'Prinsip ③: PDCA+S'), T('どう定着・進化させるか？', 'How do we sustain and evolve?', 'Bagaimana mempertahankan dan mengembangkan?'), T('改善を標準に還元する', 'Return improvement to the standard', 'Kembalikan perbaikan ke standar')]
            ],
            caption: T('[[three-principles]]と土台', '[[three-principles]] and the foundation', '[[three-principles]] dan fondasi')
          }
        ]
      },
      {
        id: 'foundation',
        title: T('土台：標準化 — 再現性の保証', 'Foundation: standardization — guaranteeing reproducibility', 'Fondasi: standardisasi — menjamin reprodusibilitas'),
        blocks: [
          { type: 'p', text: T(
            '[[foundation-standardization]]は、原則が機能するための**前提条件**です。これがなければ測定も改善も成り立ちません。根底ロジックで学んだとおり、再現性のない現場ではデータに意味がないからです。',
            'The [[foundation-standardization]] is the **precondition** for the principles to work. Without it, neither measurement nor improvement is possible — as the root logic showed, data has no meaning on a floor without reproducibility.',
            '[[foundation-standardization]] adalah **prasyarat** agar prinsip dapat berfungsi. Tanpanya, pengukuran maupun perbaikan tidak mungkin — seperti ditunjukkan logika dasar, data tidak bermakna di lini tanpa reprodusibilitas.'
          ) },
          { type: 'cards', cols: 2, items: [
            { icon: '🧹', tone: 'navy', title: T('[[5s]]・[[3tei]]', '[[5s]] / [[3tei]]', '[[5s]] / [[3tei]]'), text: T('物理的環境の整備とモノの管理の標準化。整理・整頓・清掃・清潔・しつけ／定位置・定品・定量。「いつでも・誰でも」同じ条件で作業できる環境。', 'Organizing the physical environment and standardizing how things are managed. Sort, Set in order, Shine, Standardize, Sustain / fixed position, fixed item, fixed quantity. An environment where anyone can work under the same conditions at any time.', 'Menata lingkungan fisik dan menstandarkan pengelolaan barang. Ringkas, Rapi, Resik, Rawat, Rajin / posisi tetap, barang tetap, jumlah tetap. Lingkungan di mana siapa pun dapat bekerja dalam kondisi yang sama kapan pun.') },
            { icon: '🧩', tone: 'blue', title: T('[[4m]]標準', '[[4m]] standards', 'Standar [[4m]]'), text: T('人（作業標準書）・機械（設備管理基準）・材料（受入・保管基準）・方法（手順書・検査基準）の標準を整備する。', 'Standards for Man (work instructions), Machine (maintenance criteria), Material (receiving/storage criteria), Method (procedures, inspection criteria).', 'Standar untuk Man (instruksi kerja), Machine (kriteria perawatan), Material (kriteria penerimaan/penyimpanan), Method (prosedur, kriteria inspeksi).') },
            { icon: '📋', tone: 'green', title: T('[[standard-work]]', '[[standard-work]]', '[[standard-work]]'), text: T('「誰が読んでも一通りにしか解釈できない」手順を確立する。「しっかり締める」ではなく「トルク2.0N·mで、クリック音まで」と書く。', 'Establish procedures that "anyone can interpret only one way". Not "tighten firmly" but "tighten to 2.0 N·m, until the click".', 'Menetapkan prosedur yang "hanya dapat ditafsirkan satu cara oleh siapa pun". Bukan "kencangkan dengan kuat" tetapi "kencangkan ke 2,0 N·m, sampai bunyi klik".') },
            { icon: '🔁', tone: 'amber', title: T('再現性の確保', 'Securing reproducibility', 'Menjamin reprodusibilitas'), text: T('「誰がやっても、いつやっても同じ結果」の状態を達成し、維持する。これが土台の最終的な目的。', 'Achieve and maintain "the same result whoever does it, whenever". This is the final purpose of the foundation.', 'Mencapai dan mempertahankan "hasil sama siapa pun yang mengerjakan, kapan pun". Inilah tujuan akhir fondasi.') }
          ] },
          { type: 'quote', text: T('標準無きところに改善なし', 'Where there is no standard, there can be no improvement', 'Di mana tidak ada standar, tidak ada perbaikan'), cite: T('ZEVAの基本姿勢', 'Basic stance of ZEVA', 'Sikap dasar ZEVA') },
          { type: 'callout', kind: 'example', title: T('なぜ標準がないと改善できないのか', 'Why no standard means no improvement', 'Mengapa tanpa standar tidak ada perbaikan'), text: T(
            '手順が人によって違う現場で「部品配置を変えたらCTが2秒縮んだ」としても、それが配置の効果なのか、たまたま速い人が作業したからなのか区別できません。比較の「基準線」がないからです。',
            'On a floor where procedures differ by person, even if "CT dropped 2 s after changing part layout", you cannot tell whether that came from the layout or from a faster person working that day. There is no "baseline" to compare against.',
            'Di lini di mana prosedur berbeda antar orang, walaupun "CT turun 2 detik setelah tata letak part diubah", Anda tidak dapat membedakan apakah itu efek tata letak atau karena orang yang lebih cepat bekerja hari itu. Tidak ada "garis dasar" untuk dibandingkan.'
          ) },
          { type: 'callout', kind: 'tip', title: T('誤解：「標準化＝創意工夫の否定」', 'Misconception: "standardization kills creativity"', 'Salah paham: "standardisasi mematikan kreativitas"'), text: T(
            '標準は「現時点で最良の方法」であり、固定された鎖ではありません。改善提案によって更新されていくもの——それを仕組みにしたのが原則③です。',
            'A standard is "the best method known right now", not a fixed chain. It is updated through improvement proposals — Principle ③ turns this into a mechanism.',
            'Standar adalah "metode terbaik yang diketahui saat ini", bukan rantai yang mengikat. Standar diperbarui melalui usulan perbaikan — Prinsip ③ menjadikannya mekanisme.'
          ) }
        ]
      },
      {
        id: 'modes',
        title: T('標準化の進め方：Quick標準化とDeep標準化', 'How to standardize: Quick and Deep standardization', 'Cara standardisasi: standardisasi Quick dan Deep'),
        blocks: [
          { type: 'p', text: T(
            '標準化は「**決める → 守る → 改める**」の3段階を枠として進めます。最初に決める標準が[[initial-standard]]です。初期標準は最適解ではなく、同じ方法・同じ測り方で比べられる「**測れる状態**」をつくるためのものです。',
            'Standardization follows three stages as its frame: "**decide → keep → revise**". The first standard you decide is the [[initial-standard]]. It is not the optimum; it exists to create a "**measurable state**" where the same method and the same way of measuring allow comparison.',
            'Standardisasi mengikuti tiga tahap sebagai kerangka: "**tetapkan → jaga → revisi**". Standar pertama yang ditetapkan adalah [[initial-standard]]. Standar ini bukan solusi optimal; tujuannya menciptakan "**kondisi yang dapat diukur**" di mana metode dan cara ukur yang sama memungkinkan perbandingan.'
          ) },
          { type: 'callout', kind: 'warn', title: T('全工程を細かく標準化すると、改善が始まらない', 'Standardizing every process in detail stops improvement from starting', 'Menstandarkan semua proses secara rinci membuat perbaikan tidak pernah dimulai'), text: T(
            'すべての工程に詳細な手順をかけると、標準化が終わるまで改善に入れません。根底ロジックで否定した「データが信頼できるまで動けない」デッドロックを、標準化の段階で自分からつくってしまいます。そこでGPCのQuick / Deepと同じく、通常は[[quick-standardization]]で速く決め、深く掘る必要がある箇所にだけ[[deep-standardization]]を使います。',
            'If every process gets a detailed procedure, improvement cannot start until standardization is finished. You would create, at the standardization stage, the very deadlock ("cannot act until the data is reliable") that the root logic rejects. So, just like Quick / Deep GPC, you normally decide fast with [[quick-standardization]] and use [[deep-standardization]] only where you need to dig deep.',
            'Jika semua proses diberi prosedur rinci, perbaikan tidak bisa dimulai sampai standardisasi selesai. Anda justru menciptakan kebuntuan ("tidak bisa bertindak sampai data andal") yang ditolak oleh logika dasar, pada tahap standardisasi. Karena itu, seperti Quick / Deep GPC, biasanya tetapkan dengan cepat melalui [[quick-standardization]] dan gunakan [[deep-standardization]] hanya di bagian yang perlu dianalisis secara mendalam.'
          ) },
          { type: 'compare',
            left: { title: T('Quick標準化（通常）', 'Quick standardization (normal)', 'Standardisasi Quick (biasa)'), tone: 'blue', items: [
              T('**決める**：今いちばん良いやり方を1つに決め、初期標準にする。期限の目安は当日〜3日以内', '**Decide**: pick the single best method known now as the initial standard, on the same day or within 3 days at most as a guide', '**Tetapkan**: pilih satu metode terbaik saat ini sebagai standar awal, pada hari yang sama atau paling lambat dalam 3 hari sebagai patokan'),
              T('**守る**：全員・全シフトで同じやり方を実行し、測り方をそろえる', '**Keep**: everyone on every shift works and measures the same way', '**Jaga**: semua orang di semua shift bekerja dan mengukur dengan cara yang sama'),
              T('**改める**：データと遵守状況を見て直し、改善結果を成果標準に反映する', '**Revise**: correct it from data and compliance, and put improvements into the outcome standard', '**Revisi**: koreksi berdasarkan data dan tingkat kepatuhan, lalu masukkan hasil perbaikan ke standar hasil')
            ] },
            right: { title: T('Deep標準化（局所）', 'Deep standardization (local)', 'Standardisasi Deep (lokal)'), tone: 'navy', items: [
              T('**決める**：仕様・図面から根拠を集め、要素作業と条件Xまで分解して初期標準をつくる（Step 0〜6）', '**Decide**: collect the basis from specifications and drawings, break down to element tasks and conditions X, and build the initial standard (Steps 0–6)', '**Tetapkan**: kumpulkan dasar dari spesifikasi dan gambar, uraikan hingga elemen kerja dan kondisi X, lalu susun standar awal (Langkah 0–6)'),
              T('**守る**：複数人で実行して再現性を確認し、測定条件を固定する（Step 7〜8）', '**Keep**: several people run it to confirm reproducibility, and measurement conditions are fixed (Steps 7–8)', '**Jaga**: beberapa orang menjalankannya untuk memastikan reprodusibilitas, dan kondisi pengukuran dikunci (Langkah 7–8)'),
              T('**改める**：監査6軸で点検し、事実から改訂して成果標準に反映する', '**Revise**: audit on the 6 axes, revise from facts and put it into the outcome standard', '**Revisi**: audit dengan 6 sumbu, revisi berdasarkan fakta, dan masukkan ke standar hasil')
            ] }
          },
          { type: 'p', text: T('3段階は同じです。違うのは、各段階をどこまで深くやるかです。', 'The three stages are the same; what differs is how deep each stage goes.', 'Tiga tahapnya sama; yang berbeda adalah seberapa dalam setiap tahap dikerjakan.') },
          { type: 'h', text: T('Quick標準化でも必ず行う2つの確認', 'Two checks required even in Quick standardization', 'Dua pengecekan yang tetap wajib dalam standardisasi Quick') },
          { type: 'p', text: T(
            '根拠を確かめずに決めると、**現場の習慣をそのまま標準にしてしまいます**。速く決めるときも、次の2つだけは確認します。',
            'Deciding without checking the basis **turns floor habits straight into the standard**. Even when deciding fast, always do these two checks.',
            'Menetapkan tanpa memeriksa dasarnya **menjadikan kebiasaan lapangan langsung sebagai standar**. Walau menetapkan dengan cepat, selalu lakukan dua pengecekan ini.'
          ) },
          { type: 'cards', cols: 2, items: [
            { icon: '❓', tone: 'blue', title: T('5つの問い', 'The five questions', 'Lima pertanyaan'), text: T('その項目が変わると ①品質は変わるか ②CTは変わるか ③人やシフトで差が出るか ④第三者が確認できるか ⑤逸脱時に止められるか。一つでも該当すれば、標準・点検・GPCの候補にし、Deep標準化の要否を判断する。', 'If this item changes: ① does quality change? ② does CT change? ③ do people or shifts differ? ④ can a third party check it? ⑤ can we stop when it deviates? If any applies, make it a candidate for the standard, inspection or GPC, and judge whether Deep standardization is needed.', 'Jika item ini berubah: ① apakah mutu berubah? ② apakah CT berubah? ③ apakah ada perbedaan antar orang atau shift? ④ dapatkah pihak ketiga memeriksanya? ⑤ dapatkah dihentikan saat menyimpang? Jika salah satu berlaku, jadikan kandidat standar, inspeksi, atau GPC, dan nilai apakah standardisasi Deep diperlukan.') },
            { icon: '📐', tone: 'navy', title: T('仕様の確認', 'Specification check', 'Pengecekan spesifikasi'), text: T('仕様書・図面・技術基準に定めがあるか。定めがあれば、現場の習慣より仕様を優先する。', 'Is it defined in the specification, drawing or technical standard? If so, the specification takes priority over floor habits.', 'Apakah sudah ditetapkan di spesifikasi, gambar, atau standar teknis? Jika ya, spesifikasi diutamakan di atas kebiasaan lapangan.') }
          ] },
          { type: 'h', text: T('Deep標準化を使う箇所', 'Where to use Deep standardization', 'Di mana memakai standardisasi Deep') },
          { type: 'table',
            head: [T('観点', 'Aspect', 'Aspek'), T('Deep標準化を使う', 'Use Deep standardization', 'Pakai standardisasi Deep'), T('Quick標準化で足りる', 'Quick standardization is enough', 'Standardisasi Quick sudah cukup')],
            rows: [
              [T('リスク', 'Risk', 'Risiko'), T('安全・重要品質特性・法規にかかわる', 'Involves safety, critical quality characteristics or regulations', 'Menyangkut keselamatan, karakteristik mutu penting, atau peraturan'), T('安全・重要品質特性・法規にかからない', 'Does not involve safety, critical quality characteristics or regulations', 'Tidak menyangkut keselamatan, karakteristik mutu penting, atau peraturan')],
              [T('仕様', 'Specification', 'Spesifikasi'), T('公差・トルク・温度など、仕様要求が絡む条件', 'Conditions tied to specification requirements such as tolerance, torque or temperature', 'Kondisi yang terkait persyaratan spesifikasi seperti toleransi, torsi, atau suhu'), T('仕様書・図面に定めが無く、現場で決められる条件（置き場など）', 'Conditions not defined in specifications or drawings that the floor can decide (such as storage place)', 'Kondisi yang tidak ditetapkan di spesifikasi atau gambar dan dapat diputuskan lapangan (seperti tempat penyimpanan)')],
              [T('結果', 'Result', 'Hasil'), T('Quick標準化の後もバラツキが残る（工程そのもののバラツキが疑われる）', 'Variation remains after Quick standardization (variation of the process itself is suspected)', 'Variasi tetap ada setelah standardisasi Quick (dicurigai variasi proses itu sendiri)'), T('決めて守ったらバラツキが収まった', 'Variation settled once decided and kept', 'Variasi mereda setelah ditetapkan dan dijaga')],
              [T('変化点', 'Change point', 'Titik perubahan'), T('新製品・新ライン・設備更新の立ち上げ', 'Launch of a new product, new line or equipment renewal', 'Peluncuran produk baru, lini baru, atau pembaruan peralatan'), T('立ち上げではない既存工程の変更', 'Changes to an existing process that are not a launch', 'Perubahan proses yang sudah berjalan (bukan peluncuran)')],
              [T('GPC', 'GPC', 'GPC'), T('Deep GPCで扱う案件', 'Cases handled by Deep GPC', 'Kasus yang ditangani Deep GPC'), T('Deep GPC案件ではない', 'Not a Deep GPC case', 'Bukan kasus Deep GPC')]
            ],
            caption: T('振り分けは班長が判断し、工程技術者が確認する', 'The team leader decides which mode applies (Quick or Deep), and the process engineer confirms it', 'Ketua tim menentukan mode (Quick atau Deep) dan insinyur proses mengonfirmasinya')
          },
          { type: 'callout', kind: 'example', title: T('例：ねじ締め工程（数値は説明用）', 'Example: a screw-tightening process (illustrative numbers)', 'Contoh: proses pengencangan sekrup (angka ilustrasi)'), text: T(
            '部品の置き場と取る順番は「変わるとCTが変わる」に当たるので、標準に入れます。ただし安全にも仕様にも絡まず現場で決められるので、Quick標準化でその日のうちに決め、全シフトでそろえます。一方、締付トルクは「変わると品質が変わる」に当たり、図面にも規定値があります。こちらはDeep標準化で、仕様の根拠から条件表をつくります。同じ工程でも、深く掘るのはトルクの項目だけです。',
            'The parts storage place and picking order hit "CT changes if it changes", so they go into the standard. But they involve neither safety nor specifications and the floor can decide them, so they are decided the same day with Quick standardization and aligned across all shifts. The tightening torque, on the other hand, hits "quality changes if it changes" and has a specified value on the drawing. That item gets Deep standardization: a condition sheet is built from the specification basis. Even within the same process, only the torque item is dug into deeply.',
            'Tempat penyimpanan part dan urutan pengambilan memenuhi "CT berubah jika berubah", jadi dimasukkan ke standar. Namun tidak menyangkut keselamatan maupun spesifikasi dan dapat diputuskan lapangan, jadi ditetapkan hari itu juga dengan standardisasi Quick dan diseragamkan di semua shift. Sebaliknya, torsi pengencangan memenuhi "mutu berubah jika berubah" dan ada nilai yang ditetapkan di gambar. Item ini memakai standardisasi Deep: tabel kondisi disusun dari dasar spesifikasi. Bahkan dalam proses yang sama, hanya item torsi yang dianalisis secara mendalam.'
          ) },
          { type: 'check',
            q: T('「作業台の上の工具の置き場所」を標準化するとき、適切なのはどれですか？（品質・安全への影響なし、仕様の定めなし）', 'When standardizing "where tools sit on the workbench" (no effect on quality or safety, no specification), which is appropriate?', 'Saat menstandarkan "letak alat di meja kerja" (tanpa pengaruh pada mutu atau keselamatan, tanpa spesifikasi), mana yang tepat?'),
            choices: [T('Deep標準化でStep 0から仕様の根拠を集める', 'Use Deep standardization and collect the specification basis from Step 0', 'Pakai standardisasi Deep dan kumpulkan dasar spesifikasi dari Langkah 0'), T('Quick標準化で当日〜3日以内に決め、全シフトでそろえる', 'Decide on the same day, or within 3 days at most with Quick standardization and align across all shifts', 'Tetapkan pada hari yang sama, paling lambat dalam 3 hari dengan standardisasi Quick dan seragamkan di semua shift'), T('最適な配置が分かるまで標準化を待つ', 'Wait to standardize until the optimal layout is known', 'Tunda standardisasi sampai tata letak optimal diketahui')],
            answer: 1,
            explain: T('適用基準に当たらないのでQuick標準化です。初期標準は最適解でなくてよく、まず測れる状態をつくります。', 'It meets none of the criteria, so Quick standardization. The initial standard need not be optimal; first create a measurable state.', 'Tidak memenuhi kriteria, jadi standardisasi Quick. Standar awal tidak harus optimal; pertama ciptakan kondisi yang dapat diukur.')
          }
        ]
      },
      {
        id: 'principles',
        title: T('3つの原則', 'The three principles', 'Tiga prinsip'),
        blocks: [
          { type: 'h', text: T('原則①：バラツキ対策 — ロスの根源を断つ', 'Principle ①: variation countermeasure — cut the root of loss', 'Prinsip ①: penanggulangan variasi — putus akar kerugian') },
          { type: 'p', text: T(
            'バラツキこそが、品質・コスト・納期・安全のすべてのロスの根源です。品質低下、手直し、過剰在庫、計画の乱れ——いずれもバラツキから生まれます。**結果（Y）でなく原因（X）を制御する**ことで、QCDSを同時に改善します。この「一点集中」がZEVAの改善効率の源泉です。',
            'Variation is the root of every loss in quality, cost, delivery and safety. Quality drops, repair, excess inventory, disrupted plans — all come from variation. By **controlling causes (X) instead of results (Y)**, QCDS improves at the same time. This "single focus" is the source of ZEVA’s improvement efficiency.',
            'Variasi adalah akar semua kerugian dalam kualitas, biaya, pengiriman, dan keselamatan. Penurunan kualitas, perbaikan, persediaan berlebih, rencana terganggu — semuanya berasal dari variasi. Dengan **mengendalikan penyebab (X), bukan hasil (Y)**, QCDS membaik secara bersamaan. "Fokus tunggal" ini adalah sumber efisiensi perbaikan ZEVA.'
          ) },
          { type: 'cards', cols: 4, items: [
            { icon: '✅', tone: 'blue', title: T('Q 品質', 'Q Quality', 'Q Kualitas'), text: T('不良・手直しが減る', 'Fewer defects and repairs', 'Cacat dan perbaikan berkurang') },
            { icon: '💴', tone: 'green', title: T('C コスト', 'C Cost', 'C Biaya'), text: T('安全在庫・余裕人員が減る', 'Less safety stock and spare staff', 'Stok pengaman dan tenaga cadangan berkurang') },
            { icon: '🚚', tone: 'amber', title: T('D 納期', 'D Delivery', 'D Pengiriman'), text: T('計画どおりに流れる', 'Flows as planned', 'Mengalir sesuai rencana') },
            { icon: '🦺', tone: 'red', title: T('S 安全', 'S Safety', 'S Keselamatan'), text: T('想定外の動作が減る', 'Fewer unexpected motions', 'Gerakan tak terduga berkurang') }
          ] },
          { type: 'h', text: T('原則②：理論値ベース思考 — あるべき姿から逆算する', 'Principle ②: theoretical-value thinking — work backward from the ideal', 'Prinsip ②: berpikir berbasis nilai teoretis — mundur dari kondisi ideal') },
          { type: 'p', text: T(
            '「今よりマシ」ではなく、「**理論的に到達可能な理想状態**」を定義し、そのギャップを可視化して改善対象を特定します。理論値の基本式「現場理論値＝価値作業＋準価値作業（必要最小限）」にもとづく[[absolute-value-thinking]]です。現状からの引き算ではなく、理論値からの逆算で目標を設定します。',
            'Instead of "a bit better than now", define "**the ideal state theoretically reachable**", visualize the gap and identify improvement targets. This is [[absolute-value-thinking]] based on the theoretical-value formula "site theoretical value = value work + semi-value work (minimum necessary)". Targets are set by working backward from the theoretical value, not by subtracting from the current state.',
            'Bukan "sedikit lebih baik dari sekarang", tetapi definisikan "**kondisi ideal yang secara teoretis dapat dicapai**", visualisasikan selisihnya dan tentukan target perbaikan. Inilah [[absolute-value-thinking]] berdasarkan rumus nilai teoretis "nilai teoretis lapangan = kerja bernilai + kerja semi-bernilai (minimum yang diperlukan)". Target ditetapkan mundur dari nilai teoretis, bukan dengan mengurangi dari kondisi saat ini.'
          ) },
          { type: 'h', text: T('原則③：PDCA+S — 改善を標準に還元し、標準を進化させる', 'Principle ③: PDCA+S — return improvement to the standard and evolve it', 'Prinsip ③: PDCA+S — kembalikan perbaikan ke standar dan kembangkan') },
          { type: 'flow', dir: 'h', nodes: [
            { tone: 'blue', title: T('P 計画', 'P Plan', 'P Rencana'), text: T('決める', 'Decide', 'Tetapkan') },
            { tone: 'blue', title: T('D 実行', 'D Do', 'D Laksanakan'), text: T('やってみる', 'Do it', 'Lakukan') },
            { tone: 'blue', title: T('C 確認', 'C Check', 'C Periksa'), text: T('守れているか、差はあるか', 'Is it followed? Any gap?', 'Apakah dipatuhi? Ada selisih?') },
            { tone: 'blue', title: T('A 是正', 'A Act', 'A Tindak lanjut'), text: T('ギャップを埋める', 'Close the gap', 'Tutup selisih') },
            { tone: 'green', title: T('S 標準化', 'S Standardize', 'S Standarkan'), text: T('改める・新しい標準に', 'Revise into a new standard', 'Revisi menjadi standar baru') }
          ] },
          { type: 'p', text: T(
            '[[pdca-s]]の「S」があることで、改善が一過性で終わらず新しい標準として定着します。「**決める → 守る → 改める**」のサイクルが、土台そのものを進化させ続けます。',
            'The "S" in [[pdca-s]] keeps improvements from being temporary and fixes them as new standards. The cycle "**decide → keep → revise**" keeps evolving the foundation itself.',
            '"S" dalam [[pdca-s]] mencegah perbaikan menjadi sementara dan menetapkannya sebagai standar baru. Siklus "**tetapkan → jaga → revisi**" terus mengembangkan fondasi itu sendiri.'
          ) },
          { type: 'compare',
            left: { title: T('[[initial-standard]]', '[[initial-standard]]', '[[initial-standard]]'), tone: 'blue', items: [
              T('測れる状態をつくる', 'Creates a measurable state', 'Menciptakan kondisi yang dapat diukur'),
              T('最適解でなくてよい。比べられる共通条件にする', 'Need not be optimal; makes common conditions for comparison', 'Tidak harus optimal; menjadi kondisi bersama untuk perbandingan')
            ] },
            right: { title: T('[[outcome-standard]]', '[[outcome-standard]]', '[[outcome-standard]]'), tone: 'green', items: [
              T('良くなった状態を固定する（原則③のS）', 'Locks in the improved state (the S of Principle ③)', 'Mengunci kondisi yang sudah membaik (S dari Prinsip ③)'),
              T('次の改善のスタートラインになる', 'Becomes the starting line for the next improvement', 'Menjadi garis start perbaikan berikutnya')
            ] }
          },
          { type: 'check',
            q: T('「どこを目指すか？」に答える原則はどれですか？', 'Which principle answers "Where do we aim?"', 'Prinsip mana yang menjawab "Ke mana kita menuju?"'),
            choices: [T('原則① バラツキ対策', 'Principle ① variation countermeasure', 'Prinsip ① penanggulangan variasi'), T('原則② 理論値ベース思考', 'Principle ② theoretical-value thinking', 'Prinsip ② berpikir berbasis nilai teoretis'), T('原則③ PDCA+S', 'Principle ③ PDCA+S', 'Prinsip ③ PDCA+S')],
            answer: 1,
            explain: T('①＝何に着目するか、②＝どこを目指すか、③＝どう定着・進化させるか。', '① = what to focus on, ② = where to aim, ③ = how to sustain and evolve.', '① = apa yang difokuskan, ② = ke mana dituju, ③ = bagaimana mempertahankan dan mengembangkan.')
          }
        ]
      },
      {
        id: 'cycle',
        title: T('循環構造：土台が進化し続ける仕組み', 'The cycle: how the foundation keeps evolving', 'Siklus: bagaimana fondasi terus berkembang'),
        blocks: [
          { type: 'p', text: T(
            '原則体系は、一方通行の手順ではなく**循環**です。改善は標準化に還元され、更新された標準化が次の改善の基盤になります。これがZEVAの持続的改善メカニズムです。',
            'The principle system is not a one-way procedure but a **cycle**. Improvements are returned to standardization, and the updated standards become the base for the next improvement. This is ZEVA’s mechanism for sustainable improvement.',
            'Sistem prinsip bukan prosedur satu arah, melainkan **siklus**. Perbaikan dikembalikan ke standardisasi, dan standar yang diperbarui menjadi dasar perbaikan berikutnya. Inilah mekanisme perbaikan berkelanjutan ZEVA.'
          ) },
          { type: 'cycle', center: T('持続的改善', 'Sustainable improvement', 'Perbaikan berkelanjutan'), nodes: [
            { tone: 'navy', title: T('土台（標準化）', 'Foundation', 'Fondasi'), text: T('再現性を確保', 'Secure reproducibility', 'Jamin reprodusibilitas') },
            { tone: 'red', title: T('原則①', 'Principle ①', 'Prinsip ①'), text: T('バラツキを特定', 'Identify variation', 'Identifikasi variasi') },
            { tone: 'blue', title: T('原則②', 'Principle ②', 'Prinsip ②'), text: T('理論値で目標設定', 'Set targets by theoretical value', 'Tetapkan target dengan nilai teoretis') },
            { tone: 'amber', title: T('改善実行', 'Improve', 'Perbaikan'), text: T('Quick GPC：H-T-C-A / Deep GPC：DMAIC', 'Quick GPC: H-T-C-A / Deep GPC: DMAIC', 'Quick GPC: H-T-C-A / Deep GPC: DMAIC') },
            { tone: 'green', title: T('原則③', 'Principle ③', 'Prinsip ③'), text: T('PDCA+Sで新標準へ還元', 'Return to a new standard via PDCA+S', 'Kembalikan ke standar baru via PDCA+S') }
          ] },
          { type: 'callout', kind: 'example', title: T('階段のたとえ', 'Staircase analogy', 'Analogi tangga'), text: T(
            '改善は坂道で重いボールを押し上げるようなものです。手を離すと転がり落ちます（後戻り）。標準化は、押し上げた地点に置く「歯止め（くさび）」です。歯止めがあるから、次の一段に安心して挑めます。',
            'Improvement is like pushing a heavy ball up a slope. Let go and it rolls back (regression). Standardization is the "wedge" placed where you pushed it to. Because of the wedge, you can safely try the next step.',
            'Perbaikan seperti mendorong bola berat ke atas lereng. Jika dilepas, bola menggelinding kembali (kemunduran). Standardisasi adalah "ganjal" yang dipasang di titik yang sudah dicapai. Karena ada ganjal, Anda dapat mencoba langkah berikutnya dengan aman.'
          ) },
          { type: 'widget', name: 'sort-game', props: {
            title: T('この行動はどこに当たる？', 'Where does this action belong?', 'Tindakan ini termasuk yang mana?'),
            bins: [
              { id: 'f', label: T('土台（標準化）', 'Foundation', 'Fondasi'), tone: 'gray' },
              { id: 'p1', label: T('原則① バラツキ対策', 'Principle ① Variation', 'Prinsip ① Variasi'), tone: 'red' },
              { id: 'p2', label: T('原則② 理論値ベース思考', 'Principle ② Theoretical value', 'Prinsip ② Nilai teoretis'), tone: 'blue' },
              { id: 'p3', label: T('原則③ PDCA+S', 'Principle ③ PDCA+S', 'Prinsip ③ PDCA+S'), tone: 'green' }
            ],
            items: [
              { bin: 'f', text: T('工具の置き場所に形跡を描き、定位置を決める', 'Draw tool outlines to fix tool positions', 'Menggambar bentuk alat untuk menetapkan posisi alat'), explain: T('3定（定位置）による物理的な環境づくり＝土台です。', 'Building the physical environment via 3-tei (fixed position) = foundation.', 'Membangun lingkungan fisik melalui 3-tei (posisi tetap) = fondasi.') },
              { bin: 'p1', text: T('作業者間でCTの差が大きい要素作業を特定する', 'Identify element tasks with large CT differences between operators', 'Mengidentifikasi elemen kerja dengan perbedaan CT besar antar operator'), explain: T('何に着目するか＝バラツキを特定する行動です。', 'What to focus on = identifying variation.', 'Apa yang difokuskan = mengidentifikasi variasi.') },
              { bin: 'p2', text: T('価値作業と準価値作業だけで構成した「現場理論値」を算出する', 'Calculate the "site theoretical value" made only of value and semi-value work', 'Menghitung "nilai teoretis lapangan" yang hanya terdiri dari kerja bernilai dan semi-bernilai'), explain: T('あるべき姿から逆算する理論値ベース思考です。', 'Theoretical-value thinking: working backward from the ideal.', 'Berpikir berbasis nilai teoretis: mundur dari kondisi ideal.') },
              { bin: 'p3', text: T('試して効果が出た手順を作業標準書に反映し、教育する', 'Reflect a proven procedure in the work instruction and train people', 'Memasukkan prosedur yang terbukti ke instruksi kerja dan melatih orang'), explain: T('改善を標準に還元する「S」です。', 'The "S" that returns improvement to the standard.', '"S" yang mengembalikan perbaikan ke standar.') },
              { bin: 'f', text: T('「しっかり締める」を「2.0N·m、クリック音まで」に書き換える', 'Rewrite "tighten firmly" as "2.0 N·m, until the click"', 'Menulis ulang "kencangkan dengan kuat" menjadi "2,0 N·m, sampai bunyi klik"'), explain: T('一通りにしか解釈できない標準作業の確立＝土台です。', 'Establishing standard work with only one interpretation = foundation.', 'Menetapkan kerja standar dengan satu tafsiran = fondasi.') },
              { bin: 'p2', text: T('「前年比5%改善」ではなく、理論値とのギャップから目標を決める', 'Set the target from the gap to the theoretical value, not "5% better than last year"', 'Menetapkan target dari selisih dengan nilai teoretis, bukan "5% lebih baik dari tahun lalu"'), explain: T('引き算思考ではなく絶対値思考です。', 'Absolute-value thinking, not subtraction thinking.', 'Berpikir nilai absolut, bukan berpikir pengurangan.') },
              { bin: 'p3', text: T('定期的に標準の遵守状況を確認し、ズレがあれば是正する', 'Regularly check compliance with the standard and correct deviations', 'Secara berkala memeriksa kepatuhan terhadap standar dan memperbaiki penyimpangan'), explain: T('C（確認）→A（是正）の維持サイクルです。', 'The C (check) → A (act) maintenance loop.', 'Siklus pemeliharaan C (periksa) → A (tindak lanjut).') },
              { bin: 'p1', text: T('不良率を下げるために、原因となる設備パラメータのブレを調べる', 'To reduce defects, investigate fluctuation of the causal machine parameter', 'Untuk menurunkan cacat, menyelidiki fluktuasi parameter mesin penyebab'), explain: T('Yでなく原因Xのバラツキに着目しています。', 'Focusing on variation of the cause X, not Y.', 'Berfokus pada variasi penyebab X, bukan Y.') }
            ]
          } }
        ]
      },
      {
        id: 'mapping',
        title: T('4層構造・導入ロードマップとの対応', 'Mapping to the 4 layers and the roadmap', 'Pemetaan ke 4 lapis dan peta jalan'),
        blocks: [
          { type: 'p', text: T(
            '[[four-layers]]は「実装構造（何がどう動くか）」、原則体系は「行動指針（どう考え、どう振る舞うか）」です。両者は次のように対応します。',
            'The [[four-layers]] are the "implementation structure (what runs and how)", and the principle system is the "behavioral guide (how to think and act)". They correspond as follows.',
            '[[four-layers]] adalah "struktur implementasi (apa yang berjalan dan bagaimana)", sedangkan sistem prinsip adalah "panduan perilaku (bagaimana berpikir dan bertindak)". Keduanya berhubungan sebagai berikut.'
          ) },
          { type: 'table',
            head: [T('Layer', 'Layer', 'Layer'), T('名称', 'Name', 'Nama'), T('原則との対応', 'Relation to principles', 'Hubungan dengan prinsip')],
            rows: [
              ['1', T('理論値', 'Theoretical value', 'Nilai teoretis'), T('原則②の理論的基盤', 'Theoretical basis of Principle ②', 'Dasar teori Prinsip ②')],
              ['2', T('ハイブリッド・トリアージ', 'Hybrid triage', 'Triase hibrida'), T('原則①②の適用判断', 'Judgment of applying Principles ①②', 'Penilaian penerapan Prinsip ①②')],
              ['3', T('GPC制御', 'GPC control', 'Kendali GPC'), T('原則①②③の実行機構', 'Execution mechanism of Principles ①②③', 'Mekanisme pelaksanaan Prinsip ①②③')],
              ['4', T('PDCA-S＋7要因＋XY思考', 'PDCA-S + 7 factors + XY thinking', 'PDCA-S + 7 faktor + berpikir XY'), T('原則③の運用メカニズム', 'Operating mechanism of Principle ③', 'Mekanisme operasional Prinsip ③')]
            ]
          },
          { type: 'h', text: T('導入ロードマップ：STEP 1-2＝土台、STEP 3-5＝原則', 'Roadmap: STEP 1-2 = foundation, STEP 3-5 = principles', 'Peta jalan: STEP 1-2 = fondasi, STEP 3-5 = prinsip') },
          { type: 'flow', dir: 'h', nodes: [
            { tone: 'gray', title: T('STEP 1 標準化評価', 'STEP 1 Standardization assessment', 'STEP 1 Penilaian standardisasi'), text: T('土台の現状診断', 'Diagnose the foundation', 'Diagnosis fondasi') },
            { tone: 'gray', title: T('STEP 2 徹底的な標準化', 'STEP 2 Thorough standardization', 'STEP 2 Standardisasi menyeluruh'), text: T('5S・3定＋4M標準で土台を構築', 'Build it with 5S/3-tei + 4M standards', 'Membangunnya dengan 5S/3-tei + standar 4M') },
            { tone: 'red', title: T('STEP 3 価値作業分析', 'STEP 3 Value-work analysis', 'STEP 3 Analisis kerja bernilai'), text: T('原則①②の適用', 'Apply Principles ①②', 'Terapkan Prinsip ①②') },
            { tone: 'blue', title: T('STEP 4 目標設定', 'STEP 4 Target setting', 'STEP 4 Penetapan target'), text: T('原則②の実践', 'Practice Principle ②', 'Praktik Prinsip ②') },
            { tone: 'green', title: T('STEP 5 価値作業比率向上', 'STEP 5 Raise value-work ratio', 'STEP 5 Naikkan rasio kerja bernilai'), text: T('原則①②③の統合実行', 'Integrated Principles ①②③', 'Integrasi Prinsip ①②③') }
          ] },
          { type: 'h', text: T('現場の行動3原則との関係', 'Relation to the 3 operator behaviors', 'Hubungan dengan 3 perilaku operator') },
          { type: 'table',
            head: [T('オペレーターの行動', 'Operator behavior', 'Perilaku operator'), T('原則体系との関係', 'Relation', 'Hubungan')],
            rows: [
              [T('標準を守る', 'Follow the standard', 'Patuhi standar'), T('土台の維持', 'Maintaining the foundation', 'Memelihara fondasi')],
              [T('異常に気づく', 'Notice abnormalities', 'Sadari kelainan'), T('原則①（バラツキの検知）', 'Principle ① (detecting variation)', 'Prinsip ① (mendeteksi variasi)')],
              [T('すぐ報告する', 'Report immediately', 'Segera laporkan'), T('原則③（PDCA+SのCのトリガー）', 'Principle ③ (trigger for C in PDCA+S)', 'Prinsip ③ (pemicu C dalam PDCA+S)')]
            ]
          }
        ]
      }
    ],
    keyPoints: [
      T('ZEVAの行動指針＝標準化の土台＋3原則の階層構造', 'ZEVA’s guide = foundation of standardization + 3 principles in a hierarchy', 'Panduan ZEVA = fondasi standardisasi + 3 prinsip dalam hierarki'),
      T('土台：5S・3定、4M標準、標準作業、再現性の確保 —「標準無きところに改善なし」', 'Foundation: 5S/3-tei, 4M standards, standard work, reproducibility — "no improvement without standards"', 'Fondasi: 5S/3-tei, standar 4M, kerja standar, reprodusibilitas — "tidak ada perbaikan tanpa standar"'),
      T('標準化は「決める→守る→改める」。通常はQuick標準化（初期標準は当日〜3日以内）、安全・仕様が絡む箇所だけDeep標準化', 'Standardization = decide → keep → revise. Normally Quick standardization (initial standard on the same day, or within 3 days at most); Deep standardization only where safety or specifications are involved', 'Standardisasi = tetapkan → jaga → revisi. Biasanya standardisasi Quick (standar awal pada hari yang sama, paling lambat dalam 3 hari); standardisasi Deep hanya bila menyangkut keselamatan atau spesifikasi'),
      T('①何に着目するか（バラツキ）②どこを目指すか（理論値）③どう定着させるか（PDCA+S）', '① what to focus on (variation) ② where to aim (theoretical value) ③ how to sustain (PDCA+S)', '① apa yang difokuskan (variasi) ② ke mana dituju (nilai teoretis) ③ bagaimana mempertahankan (PDCA+S)'),
      T('土台→原則→改善→土台更新 の循環が持続的改善を生む', 'Foundation → principles → improvement → updated foundation creates sustainable improvement', 'Fondasi → prinsip → perbaikan → fondasi diperbarui menciptakan perbaikan berkelanjutan'),
      T('4層は実装構造、原則は行動指針。STEP1-2＝土台、STEP3-5＝原則', '4 layers = implementation, principles = behavior. STEP 1-2 = foundation, STEP 3-5 = principles', '4 lapis = implementasi, prinsip = perilaku. STEP 1-2 = fondasi, STEP 3-5 = prinsip')
    ],
    quiz: [
      { q: T('5S・3定が「原則」ではなく「土台」に位置づけられている理由は？', 'Why is 5S/3-tei placed in the foundation rather than as a principle?', 'Mengapa 5S/3-tei ditempatkan di fondasi, bukan sebagai prinsip?'),
        choices: [T('重要度が低いから', 'Because it is less important', 'Karena kurang penting'), T('思考の指針ではなく、再現性を保証する物理的な環境づくり（前提条件）だから', 'Because it is not a guide for thinking but building the physical environment that guarantees reproducibility (a precondition)', 'Karena bukan panduan berpikir melainkan membangun lingkungan fisik yang menjamin reprodusibilitas (prasyarat)'), T('一度やれば終わりだから', 'Because it is done once and finished', 'Karena cukup dilakukan sekali'), T('デジタル化で代替できるから', 'Because digitalisation can replace it', 'Karena dapat digantikan digitalisasi')],
        answer: 1, explain: T('性質が異なるため、原則が立つための土台として位置づけられます。', 'Its nature differs, so it is the base on which the principles stand.', 'Sifatnya berbeda, sehingga menjadi dasar tempat prinsip berdiri.') },
      { q: T('Deep標準化を使うべき箇所はどれ？', 'Where should Deep standardization be used?', 'Di mana standardisasi Deep sebaiknya dipakai?'),
        choices: [T('部品トレーの置き場所を決める', 'Deciding where the parts tray goes', 'Menentukan letak baki part'), T('図面に規定値がある締付トルクの条件を決める', 'Setting tightening-torque conditions that have a specified value on the drawing', 'Menetapkan kondisi torsi pengencangan yang nilainya ditetapkan di gambar'), T('朝礼の順番を決める', 'Deciding the order of the morning meeting', 'Menentukan urutan rapat pagi'), T('すべての工程で必ず使う', 'Always, for every process', 'Selalu, untuk semua proses')],
        answer: 1, explain: T('仕様要求が絡み品質に影響する条件はDeep標準化です。全工程にかけると改善が始まりません。', 'Conditions tied to specification requirements and affecting quality get Deep standardization. Applying it everywhere stops improvement from starting.', 'Kondisi yang terkait persyaratan spesifikasi dan memengaruhi mutu memakai standardisasi Deep. Menerapkannya ke semua proses membuat perbaikan tidak dimulai.') },
      { q: T('初期標準の目的として正しいのは？', 'What is the purpose of the initial standard?', 'Apa tujuan standar awal?'),
        choices: [T('最適解を一度で決めること', 'To decide the optimum at once', 'Menetapkan solusi optimal sekaligus'), T('同じ方法・同じ測り方で比べられる「測れる状態」をつくること', 'To create a "measurable state" where the same method and measuring allow comparison', 'Menciptakan "kondisi yang dapat diukur" agar metode dan cara ukur yang sama memungkinkan perbandingan'), T('改善を不要にすること', 'To make improvement unnecessary', 'Membuat perbaikan tidak perlu'), T('文書を増やすこと', 'To increase documents', 'Menambah dokumen')],
        answer: 1, explain: T('良くなった状態を固定するのは成果標準の役割です。', 'Locking in the improved state is the role of the outcome standard.', 'Mengunci kondisi yang sudah membaik adalah peran standar hasil.') },
      { q: T('原則①バラツキ対策の考え方として正しいのは？', 'Which matches Principle ① (variation countermeasure)?', 'Mana yang sesuai dengan Prinsip ① (penanggulangan variasi)?'),
        choices: [T('結果（Y）を直接管理する', 'Manage results (Y) directly', 'Mengelola hasil (Y) secara langsung'), T('原因（X）を制御してQCDSを同時改善する', 'Control causes (X) to improve QCDS at the same time', 'Mengendalikan penyebab (X) untuk memperbaiki QCDS sekaligus'), T('平均値を最優先する', 'Prioritize the average', 'Memprioritaskan rata-rata'), T('検査を増やす', 'Increase inspection', 'Menambah inspeksi')],
        answer: 1, explain: T('バラツキはロスの根源。原因Xを制御します。', 'Variation is the root of loss; control the cause X.', 'Variasi adalah akar kerugian; kendalikan penyebab X.') },
      { q: T('原則③PDCA+Sの「S」がないとどうなりやすい？', 'Without the "S" of PDCA+S, what tends to happen?', 'Tanpa "S" dalam PDCA+S, apa yang cenderung terjadi?'),
        choices: [T('改善が一過性で終わり、後戻りする', 'Improvement becomes temporary and regresses', 'Perbaikan menjadi sementara dan mundur'), T('改善の計画が立てられない', 'Improvement cannot be planned', 'Perbaikan tidak dapat direncanakan'), T('データが取れない', 'Data cannot be collected', 'Data tidak dapat dikumpulkan'), T('トリアージができない', 'Triage cannot be done', 'Triase tidak dapat dilakukan')],
        answer: 0, explain: T('Sで新しい標準として固定することで効果が定着します。', 'Fixing it as a new standard with S makes the effect last.', 'Menetapkannya sebagai standar baru dengan S membuat efeknya bertahan.') },
      { q: T('原則体系の循環として正しい順序は？', 'Which is the correct order of the cycle?', 'Manakah urutan siklus yang benar?'),
        choices: [T('原則③→原則①→土台→原則②', 'Principle ③ → ① → foundation → ②', 'Prinsip ③ → ① → fondasi → ②'), T('土台→原則①→原則②→改善実行→原則③→土台更新', 'Foundation → ① → ② → improvement → ③ → updated foundation', 'Fondasi → ① → ② → perbaikan → ③ → fondasi diperbarui'), T('改善実行→土台→原則②→原則①', 'Improvement → foundation → ② → ①', 'Perbaikan → fondasi → ② → ①'), T('原則②→原則③→原則①→改善実行', '② → ③ → ① → improvement', '② → ③ → ① → perbaikan')],
        answer: 1, explain: T('改善は標準化に還元され、次のサイクルの基盤になります。', 'Improvement returns to standardization and becomes the base of the next cycle.', 'Perbaikan kembali ke standardisasi dan menjadi dasar siklus berikutnya.') },
      { q: T('Layer 4（PDCA-S＋7要因＋XY思考）が主に対応する原則は？', 'Which principle does Layer 4 (PDCA-S + 7 factors + XY) mainly serve?', 'Prinsip mana yang terutama dilayani Layer 4 (PDCA-S + 7 faktor + XY)?'),
        choices: [T('原則①', 'Principle ①', 'Prinsip ①'), T('原則②', 'Principle ②', 'Prinsip ②'), T('原則③の運用メカニズム', 'Operating mechanism of Principle ③', 'Mekanisme operasional Prinsip ③'), T('対応なし', 'None', 'Tidak ada')],
        answer: 2, explain: T('Layer 1＝原則②の基盤、Layer 2＝①②の適用判断、Layer 3＝①②③の実行、Layer 4＝③の運用。', 'Layer 1 = basis of ②, Layer 2 = judging ①②, Layer 3 = executing ①②③, Layer 4 = operating ③.', 'Layer 1 = dasar ②, Layer 2 = penilaian ①②, Layer 3 = pelaksanaan ①②③, Layer 4 = operasional ③.') },
      { q: T('導入ロードマップのSTEP 1-2が対応するのは？', 'What do STEP 1-2 of the roadmap correspond to?', 'STEP 1-2 peta jalan berhubungan dengan apa?'),
        choices: [T('土台の構築', 'Building the foundation', 'Membangun fondasi'), T('Deep GPCの実施', 'Running Deep GPC', 'Menjalankan Deep GPC'), T('デジタル化の導入', 'Introducing digitalisation', 'Menerapkan digitalisasi'), T('原則③の実践', 'Practicing Principle ③', 'Praktik Prinsip ③')],
        answer: 0, explain: T('STEP1-2（現状診断・標準化）＝土台、STEP3-5＝原則に基づく改善。', 'STEP 1-2 (diagnosis, standardization) = foundation; STEP 3-5 = principle-based improvement.', 'STEP 1-2 (diagnosis, standardisasi) = fondasi; STEP 3-5 = perbaikan berbasis prinsip.') },
      { q: T('「標準化は創意工夫の否定だ」という声への適切な答えは？', 'Best answer to "standardization kills creativity"?', 'Jawaban terbaik untuk "standardisasi mematikan kreativitas"?'),
        choices: [T('標準は絶対に変えてはいけない', 'Standards must never change', 'Standar tidak boleh diubah'), T('標準は現時点で最良の方法で、改善によって更新していくもの', 'A standard is the current best method and is updated through improvement', 'Standar adalah metode terbaik saat ini dan diperbarui melalui perbaikan'), T('創意工夫は不要', 'Creativity is unnecessary', 'Kreativitas tidak diperlukan'), T('標準化はやめるべき', 'Stop standardizing', 'Hentikan standardisasi')],
        answer: 1, explain: T('原則③がその更新を仕組みにしています。', 'Principle ③ makes that updating a mechanism.', 'Prinsip ③ menjadikan pembaruan itu sebagai mekanisme.') }
    ]
  });
})();
