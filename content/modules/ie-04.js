ZA.addModule({
  id: 'ie-04',
  track: 'ie',
  order: 4,
  minutes: 25,
  icon: '✋',
  level: 1,
  prereq: ['ie-03'],
  title: { ja: '動作研究と動作経済の原則', en: 'Motion Study and Principles of Motion Economy', id: 'Studi Gerakan dan Prinsip Ekonomi Gerakan' },
  summary: {
    ja: '作業を最小単位の動作（サーブリッグ）に分解してムダな動きを見つけ、動作経済の原則と作業域の考え方で「楽で、速く、安定した」作業を設計する方法を学びます。',
    en: 'Break work into basic motions (therbligs) to find wasted movement, and design work that is easy, fast and stable using the principles of motion economy and work areas.',
    id: 'Pecah kerja menjadi gerakan dasar (therblig) untuk menemukan gerakan sia-sia, dan rancang kerja yang mudah, cepat, dan stabil dengan prinsip ekonomi gerakan dan area kerja.'
  },
  objectives: [
    { ja: 'サーブリッグ（動素）を4つのグループに分類できる', en: 'Classify therbligs into four groups', id: 'Mengelompokkan therblig ke dalam empat grup' },
    { ja: '両手作業分析で片手待ちや保持などのムダを見つけられる', en: 'Find waste such as idle hands and holding with two-hand analysis', id: 'Menemukan pemborosan seperti tangan menganggur dan menahan dengan analisis dua tangan' },
    { ja: '動作経済の原則（身体・作業場所・治工具）を説明し適用できる', en: 'Explain and apply the principles of motion economy (body, workplace, tools)', id: 'Menjelaskan dan menerapkan prinsip ekonomi gerakan (tubuh, tempat kerja, alat)' },
    { ja: '通常作業域・最大作業域を考慮して部品・工具を配置できる', en: 'Place parts and tools considering normal and maximum work areas', id: 'Menempatkan part dan alat dengan mempertimbangkan area kerja normal dan maksimum' }
  ],
  sections: [
    {
      id: 'motion-study',
      title: { ja: '動作研究とは', en: 'What is motion study?', id: 'Apa itu studi gerakan?' },
      blocks: [
        { type: 'p', text: {
          ja: '動作研究は、作業者の手や体の動きを細かく観察・分析し、**ムダな動作をなくし、必要な動作をより楽に・速く・確実に行える方法**を見つける手法です。時間研究が「どれだけかかるか」を問うのに対し、動作研究は「**なぜその時間がかかるのか、どう動けばよいか**」を問います。',
          en: 'Motion study observes and analyses the movements of the hands and body in detail to find **a method that removes useless motion and lets necessary motion be done more easily, quickly and reliably**. While time study asks “how long?”, motion study asks “**why does it take that long, and how should we move?**”',
          id: 'Studi gerakan mengamati dan menganalisis gerakan tangan dan tubuh secara rinci untuk menemukan **metode yang menghilangkan gerakan sia-sia dan membuat gerakan penting lebih mudah, cepat, dan pasti**. Studi waktu bertanya “berapa lama?”, sedangkan studi gerakan bertanya “**mengapa selama itu, dan bagaimana seharusnya bergerak?**”'
        } },
        { type: 'table',
          head: [ { ja: '分析レベル', en: 'Level of analysis', id: 'Tingkat analisis' }, { ja: '単位', en: 'Unit', id: 'Satuan' }, { ja: '例', en: 'Example', id: 'Contoh' } ],
          rows: [
            [ { ja: '工程', en: 'Process', id: 'Proses' }, { ja: '工程・作業ステーション', en: 'process / workstation', id: 'proses / stasiun kerja' }, { ja: '組立工程', en: 'assembly process', id: 'proses perakitan' } ],
            [ { ja: '要素作業', en: 'Element', id: 'Elemen' }, { ja: '目的をもったまとまり', en: 'purposeful chunk', id: 'potongan bertujuan' }, { ja: 'ねじ4本を締める', en: 'tighten 4 screws', id: 'kencangkan 4 sekrup' } ],
            [ { ja: '動作（動素）', en: 'Motion (therblig)', id: 'Gerakan (therblig)' }, { ja: '手足の最小の動き', en: 'smallest motion of hand/foot', id: 'gerakan terkecil tangan/kaki' }, { ja: '手を伸ばす→つかむ→運ぶ→位置決め', en: 'reach → grasp → move → position', id: 'menjangkau → menggenggam → memindahkan → memposisikan' } ]
          ],
          caption: { ja: '動作研究は最も細かい「動作」レベルの分析です。', en: 'Motion study works at the finest level: motions.', id: 'Studi gerakan bekerja di tingkat paling rinci: gerakan.' } }
      ]
    },
    {
      id: 'therbligs',
      title: { ja: 'サーブリッグ（動素）', en: 'Therbligs', id: 'Therblig' },
      blocks: [
        { type: 'p', text: {
          ja: '[[therblig]]は、ギルブレス夫妻が考案した、人の動作を分類する**18種類の基本動作記号**です（名称は Gilbreth を逆さに綴ったもの）。日本では17〜18種類として紹介され、次の4グループで考えると改善の方向が分かりやすくなります。',
          en: '[[therblig]]s are **about 18 basic motion symbols** devised by the Gilbreths to classify human motion (the name is “Gilbreth” spelled roughly backwards). Grouping them into the four groups below makes the direction of improvement clear.',
          id: '[[therblig]] adalah **sekitar 18 simbol gerakan dasar** yang dirancang keluarga Gilbreth untuk mengklasifikasikan gerakan manusia (namanya kira-kira “Gilbreth” dieja terbalik). Mengelompokkannya ke empat grup di bawah memperjelas arah perbaikan.'
        } },
        { type: 'table',
          head: [ { ja: 'グループ', en: 'Group', id: 'Grup' }, { ja: '主な動素', en: 'Main therbligs', id: 'Therblig utama' }, { ja: '改善の方向', en: 'Improvement direction', id: 'Arah perbaikan' } ],
          rows: [
            [ { ja: '第1類：作業を進める（価値に直結）', en: 'Class 1: advance the work (directly valuable)', id: 'Kelas 1: memajukan kerja (langsung bernilai)' }, { ja: '組み立てる、分解する、使う（加工する）', en: 'assemble, disassemble, use', id: 'merakit, membongkar, menggunakan' }, { ja: '確実に・楽に行えるよう支援する', en: 'support to do reliably and easily', id: 'dukung agar dilakukan pasti dan mudah' } ],
            [ { ja: '第2類：補助的な動作', en: 'Class 2: supporting motions', id: 'Kelas 2: gerakan pendukung' }, { ja: '手を伸ばす（空手移動）、つかむ、運ぶ、放す、位置決め、前置き', en: 'reach (transport empty), grasp, move (transport loaded), release, position, pre-position', id: 'menjangkau, menggenggam, memindahkan, melepas, memposisikan, pra-posisi' }, { ja: '距離を短く、回数を少なく', en: 'shorten distance, reduce count', id: 'perpendek jarak, kurangi jumlah' } ],
            [ { ja: '第3類：作業を遅らせる（判断・迷い）', en: 'Class 3: slow the work (judgment, hesitation)', id: 'Kelas 3: memperlambat kerja (penilaian, ragu)' }, { ja: '探す、見出す、選ぶ、調べる（検査）、考える', en: 'search, find, select, inspect, plan', id: 'mencari, menemukan, memilih, memeriksa, merencanakan' }, { ja: '3定・色分け・治具で「迷わない」ようにしてなくす', en: 'eliminate by 3-tei, colour coding and jigs so no one hesitates', id: 'hilangkan dengan 3-tei, kode warna, dan jig agar tidak ragu' } ],
            [ { ja: '第4類：作業が進まない（ムダ）', en: 'Class 4: no progress (waste)', id: 'Kelas 4: tidak ada kemajuan (pemborosan)' }, { ja: '保持する、避けられない遅れ、避けられる遅れ、休む', en: 'hold, unavoidable delay, avoidable delay, rest', id: 'menahan, penundaan tak terhindar, penundaan terhindar, istirahat' }, { ja: '治具で保持を代替、工程設計で待ちをなくす', en: 'replace holding with jigs, remove waiting by process design', id: 'ganti menahan dengan jig, hilangkan menunggu dengan desain proses' } ]
          ] },
        { type: 'callout', kind: 'key',
          title: { ja: '「保持」は見逃しやすいムダ', en: '“Holding” is an easily missed waste', id: '“Menahan” adalah pemborosan yang mudah terlewat' },
          text: { ja: '片手で部品を押さえ、もう片方の手だけで作業している状態は、手が1本しか働いていないのと同じです。治具やクランプで保持させれば、両手を価値のある動作に使えます。', en: 'Holding a part with one hand while working with the other is the same as having only one working hand. Letting a jig or clamp hold it frees both hands for valuable motion.', id: 'Menahan part dengan satu tangan sambil bekerja dengan tangan lain sama dengan hanya satu tangan yang bekerja. Jig atau klem yang menahan membebaskan kedua tangan untuk gerakan bernilai.' } },
        { type: 'widget', name: 'sort-game', props: {
          title: { ja: 'この動作はどのグループ？', en: 'Which group is this motion?', id: 'Gerakan ini termasuk grup mana?' },
          bins: [
            { id: 'c1', label: { ja: '第1類 作業を進める', en: 'Class 1 Advance work', id: 'Kelas 1 Memajukan kerja' }, tone: 'green' },
            { id: 'c2', label: { ja: '第2類 補助', en: 'Class 2 Support', id: 'Kelas 2 Pendukung' }, tone: 'blue' },
            { id: 'c3', label: { ja: '第3類 遅らせる', en: 'Class 3 Slow down', id: 'Kelas 3 Memperlambat' }, tone: 'amber' },
            { id: 'c4', label: { ja: '第4類 進まない', en: 'Class 4 No progress', id: 'Kelas 4 Tidak maju' }, tone: 'red' }
          ],
          items: [
            { text: { ja: '基板にコネクタを差し込む', en: 'Insert a connector into the board', id: 'Memasukkan konektor ke papan' }, bin: 'c1', explain: { ja: '製品を組み立てている＝作業を進める動作です。', en: 'Assembling the product = advancing the work.', id: 'Merakit produk = memajukan kerja.' } },
            { text: { ja: '部品箱に手を伸ばす', en: 'Reach toward the parts box', id: 'Menjangkau kotak part' }, bin: 'c2', explain: { ja: '手を伸ばす（空手移動）は補助動作。距離を短くするのが改善です。', en: 'Reach is a supporting motion; shorten the distance.', id: 'Menjangkau adalah gerakan pendukung; perpendek jaraknya.' } },
            { text: { ja: '似た形のねじの中から正しいものを選ぶ', en: 'Select the right screw among similar ones', id: 'Memilih sekrup yang benar di antara yang mirip' }, bin: 'c3', explain: { ja: '選ぶは迷いの動作。定品化や色分けでなくします。', en: 'Selecting is hesitation; eliminate it with fixed items or colour coding.', id: 'Memilih adalah keraguan; hilangkan dengan barang tetap atau kode warna.' } },
            { text: { ja: '片手でケースを押さえ続ける', en: 'Keep holding the case with one hand', id: 'Terus menahan casing dengan satu tangan' }, bin: 'c4', explain: { ja: '保持は作業が進まないムダ。治具で置き換えます。', en: 'Holding is no-progress waste; replace with a jig.', id: 'Menahan adalah pemborosan tanpa kemajuan; ganti dengan jig.' } },
            { text: { ja: 'ドライバーでねじを締める', en: 'Tighten a screw with a driver', id: 'Mengencangkan sekrup dengan obeng' }, bin: 'c1', explain: { ja: '工具を「使う」動作で製品を変化させています。', en: 'Using the tool changes the product.', id: 'Menggunakan alat mengubah produk.' } },
            { text: { ja: '部品を穴の位置に合わせる', en: 'Align a part with the hole', id: 'Menyelaraskan part dengan lubang' }, bin: 'c2', explain: { ja: '位置決めは補助動作。ガイドをつけると短く確実になります。', en: 'Positioning is supporting; guides make it short and reliable.', id: 'Memposisikan adalah pendukung; pemandu membuatnya singkat dan pasti.' } },
            { text: { ja: '工具がどこにあるか見回す', en: 'Look around for where the tool is', id: 'Melihat sekeliling mencari alat' }, bin: 'c3', explain: { ja: '探すは迷いの動作。定位置化でなくします。', en: 'Searching is hesitation; eliminate with fixed positions.', id: 'Mencari adalah keraguan; hilangkan dengan posisi tetap.' } },
            { text: { ja: '前工程から製品が来るまで待つ', en: 'Wait for the product from the previous process', id: 'Menunggu produk dari proses sebelumnya' }, bin: 'c4', explain: { ja: '避けられる遅れ（手待ち）です。工程の流れを見直します。', en: 'An avoidable delay (waiting); review the process flow.', id: 'Penundaan yang dapat dihindari (menunggu); tinjau aliran proses.' } },
            { text: { ja: '組み付け後に目で見て向きを確認する', en: 'Visually check orientation after assembly', id: 'Memeriksa arah secara visual setelah perakitan' }, bin: 'c3', explain: { ja: '調べる（検査）は第3類。形状で逆付けできない設計（ポカヨケ）にすれば不要になります。', en: 'Inspect is class 3; a shape that cannot be assembled backwards (poka-yoke) removes it.', id: 'Memeriksa adalah kelas 3; bentuk yang tidak bisa dipasang terbalik (poka-yoke) menghilangkannya.' } }
          ]
        } }
      ]
    },
    {
      id: 'two-hand',
      title: { ja: '両手作業分析', en: 'Two-hand (left-right hand) analysis', id: 'Analisis dua tangan' },
      blocks: [
        { type: 'p', text: {
          ja: '両手作業分析は、左手と右手の動作を**同じ時間軸に並べて**記録する方法です。片方の手が「保持」や「待ち」をしている時間が一目で分かります。',
          en: 'Two-hand analysis records the motions of the left and right hands **side by side on the same time axis**, making it obvious when one hand is holding or idle.',
          id: 'Analisis dua tangan mencatat gerakan tangan kiri dan kanan **berdampingan pada sumbu waktu yang sama**, sehingga terlihat jelas saat satu tangan menahan atau menganggur.'
        } },
        { type: 'table',
          head: [ { ja: '時間', en: 'Time', id: 'Waktu' }, { ja: '左手（改善前）', en: 'Left hand (before)', id: 'Tangan kiri (sebelum)' }, { ja: '右手（改善前）', en: 'Right hand (before)', id: 'Tangan kanan (sebelum)' } ],
          rows: [
            [ '0–2 s', { ja: '待ち', en: 'idle', id: 'menganggur' }, { ja: 'ケースに手を伸ばしつかむ', en: 'reach & grasp case', id: 'menjangkau & menggenggam casing' } ],
            [ '2–3 s', { ja: 'ケースを受け取る', en: 'receive case', id: 'menerima casing' }, { ja: 'ケースを渡す', en: 'hand over case', id: 'menyerahkan casing' } ],
            [ '3–9 s', { ja: 'ケースを保持', en: 'hold case', id: 'menahan casing' }, { ja: 'ねじを取り締める（×2）', en: 'pick & tighten screws (×2)', id: 'ambil & kencangkan sekrup (×2)' } ],
            [ '9–10 s', { ja: '製品を置く', en: 'put down product', id: 'meletakkan produk' }, { ja: '待ち', en: 'idle', id: 'menganggur' } ]
          ],
          caption: { ja: '説明用の架空例：左手は10秒のうち8秒が「待ち」か「保持」', en: 'Fictional example: the left hand is idle or holding for 8 of 10 seconds', id: 'Contoh fiktif: tangan kiri menganggur atau menahan 8 dari 10 detik' } },
        { type: 'example',
          title: { ja: '改善の考え方', en: 'Improvement thinking', id: 'Cara berpikir perbaikan' },
          steps: [
            { ja: 'ケースを治具に置けば、左手の「保持」6秒がなくなる', en: 'Putting the case in a jig removes 6 s of left-hand holding', id: 'Menaruh casing di jig menghilangkan 6 detik menahan tangan kiri' },
            { ja: 'ねじ供給器を左右に置けば、両手で同時にねじを取れる', en: 'Screw feeders on both sides let both hands pick screws simultaneously', id: 'Pengumpan sekrup di kedua sisi memungkinkan kedua tangan mengambil sekrup bersamaan' },
            { ja: '左右対称の動作になり、リズムが生まれる', en: 'Motions become symmetrical and rhythmical', id: 'Gerakan menjadi simetris dan berirama' }
          ],
          result: { ja: '同じ作業が10秒 → 約6秒になり、動作が一定になるため時間のバラツキも小さくなります（数値は説明用）。', en: 'The same job goes from 10 s to about 6 s, and since motions become constant, time variation also shrinks (illustrative numbers).', id: 'Pekerjaan yang sama dari 10 detik menjadi sekitar 6 detik, dan karena gerakan menjadi konstan, variasi waktu juga mengecil (angka ilustrasi).' } }
      ]
    },
    {
      id: 'motion-economy',
      title: { ja: '動作経済の原則', en: 'Principles of motion economy', id: 'Prinsip ekonomi gerakan' },
      blocks: [
        { type: 'p', text: {
          ja: '[[motion-economy]]は、疲れを少なく、ムダなく作業するための経験則を体系化したものです。まず全体を貫く**4つの基本原則**を覚えましょう。',
          en: 'The [[motion-economy]] principles systematise rules of thumb for working with less fatigue and no waste. First remember the **four basic principles** that run through them all.',
          id: 'Prinsip [[motion-economy]] mensistematisasi aturan praktis untuk bekerja dengan sedikit kelelahan dan tanpa pemborosan. Pertama ingat **empat prinsip dasar** yang mendasari semuanya.'
        } },
        { type: 'cards', cols: 4, items: [
          { icon: '❌', tone: 'red', title: { ja: 'なくす', en: 'Eliminate', id: 'Hilangkan' }, text: { ja: '探す・選ぶ・持ち替えなどの動作そのものをなくす', en: 'remove motions such as searching, selecting, re-grasping', id: 'hilangkan gerakan seperti mencari, memilih, berganti pegangan' } },
          { icon: '➖', tone: 'amber', title: { ja: '減らす', en: 'Reduce', id: 'Kurangi' }, text: { ja: '動作の回数・距離・目の移動を減らす', en: 'reduce number of motions, distance and eye movement', id: 'kurangi jumlah gerakan, jarak, dan gerakan mata' } },
          { icon: '🤲', tone: 'blue', title: { ja: '同時に行う', en: 'Simultaneous', id: 'Serentak' }, text: { ja: '両手を同時に対称に使う、足も活用する', en: 'use both hands simultaneously and symmetrically; use feet too', id: 'gunakan kedua tangan serentak dan simetris; manfaatkan kaki' } },
          { icon: '🪶', tone: 'green', title: { ja: '楽にする', en: 'Make easier', id: 'Permudah' }, text: { ja: '短い距離、重力の利用、治具・工具の工夫', en: 'short distances, use gravity, smart jigs and tools', id: 'jarak pendek, manfaatkan gravitasi, jig dan alat yang cerdas' } }
        ] },
        { type: 'h', text: { ja: '3つの領域の原則', en: 'Principles in three areas', id: 'Prinsip di tiga area' } },
        { type: 'table',
          head: [ { ja: '領域', en: 'Area', id: 'Area' }, { ja: '主な原則', en: 'Main principles', id: 'Prinsip utama' } ],
          rows: [
            [ { ja: 'A. 身体の使い方', en: 'A. Use of the body', id: 'A. Penggunaan tubuh' }, { ja: '両手は同時に動かし始め同時に終える／両手は対称・反対方向に動かす／できるだけ低い身体部位（指→手首→前腕）で動作する／急な方向転換を避け、なめらかな曲線運動にする／リズムよく動作する', en: 'start and end both hands together; move them symmetrically in opposite directions; use the lowest body segment possible (fingers → wrist → forearm); avoid sharp direction changes, use smooth curves; work with rhythm', id: 'mulai dan akhiri kedua tangan bersamaan; gerakkan simetris berlawanan arah; gunakan bagian tubuh terendah (jari → pergelangan → lengan bawah); hindari perubahan arah tajam, gunakan lengkungan halus; bekerja berirama' } ],
            [ { ja: 'B. 作業場所の配置', en: 'B. Arrangement of the workplace', id: 'B. Tata letak tempat kerja' }, { ja: '工具・材料は定位置に置く／使う順に、手の届く通常作業域内に置く／重力を利用して部品を供給・排出する（シュート、傾斜棚）／作業面の高さを適切にし、座り・立ちを選べるようにする／十分な照明', en: 'fixed places for tools and materials; place in order of use within normal work area; use gravity to feed and remove parts (chutes, inclined shelves); appropriate work height, allow sitting or standing; adequate lighting', id: 'tempat tetap untuk alat dan material; letakkan sesuai urutan pakai dalam area kerja normal; manfaatkan gravitasi untuk memasok dan mengeluarkan part (saluran, rak miring); tinggi kerja sesuai, bisa duduk atau berdiri; pencahayaan cukup' } ],
            [ { ja: 'C. 治工具・設備の設計', en: 'C. Design of tools and equipment', id: 'C. Desain alat dan peralatan' }, { ja: '保持は治具にさせる／2つ以上の工具を組み合わせる（複合工具）／足で操作できるものは足で行う／工具は持ちやすく、手を離しても戻る位置に吊るす／位置決めはガイドやストッパーで楽にする', en: 'let jigs do the holding; combine two or more tools; use feet for what feet can operate; tools easy to grip and hung so they return when released; make positioning easy with guides and stoppers', id: 'biarkan jig yang menahan; gabungkan dua alat atau lebih; gunakan kaki untuk yang bisa dioperasikan kaki; alat mudah digenggam dan digantung agar kembali saat dilepas; permudah pemosisian dengan pemandu dan stopper' } ]
          ] },
        { type: 'callout', kind: 'zeva',
          title: { ja: 'ZEVA「動作安定の原理」との対応', en: 'Link to ZEVA “principles of motion stability”', id: 'Kaitan dengan “prinsip stabilitas gerakan” ZEVA' },
          text: { ja: '動作経済の原則は主に「速く・楽に」を目指しますが、ZEVAはさらに「**安定（バラツキが出ない）**」を重視します。距離を短くする → **距離・変位の法則**、動作数を減らす → **シーケンス累積の法則**、治具・ガイドで位置決め → **拘束とガイドの法則**。同じ改善が、時間短縮とバラツキ削減の両方に効きます。', en: 'Motion economy aims mainly at “fast and easy”, while ZEVA additionally emphasises “**stable (no variation)**”. Shorter distance → **law of distance/displacement**; fewer motions → **law of sequence accumulation**; positioning with jigs/guides → **law of constraint and guide**. The same improvement shortens time and reduces variation.', id: 'Ekonomi gerakan terutama menuju “cepat dan mudah”, sedangkan ZEVA juga menekankan “**stabil (tanpa variasi)**”. Jarak lebih pendek → **hukum jarak/perpindahan**; gerakan lebih sedikit → **hukum akumulasi urutan**; pemosisian dengan jig/pemandu → **hukum batasan dan pemandu**. Perbaikan yang sama memperpendek waktu dan mengurangi variasi.' } }
      ]
    },
    {
      id: 'work-area',
      title: { ja: '作業域とゴールデンゾーン', en: 'Work areas and the golden zone', id: 'Area kerja dan zona emas' },
      blocks: [
        { type: 'p', text: {
          ja: '[[work-area]]とは、作業者が体を動かさずに手が届く範囲のことです。部品や工具をどこに置くかで、手を伸ばす距離・体をひねる回数・疲れ方が大きく変わります。',
          en: 'A [[work-area]] is the range the hands can reach without moving the body. Where parts and tools are placed greatly changes reach distance, body twisting and fatigue.',
          id: '[[work-area]] adalah jangkauan tangan tanpa menggerakkan tubuh. Letak part dan alat sangat memengaruhi jarak menjangkau, frekuensi memutar tubuh, dan kelelahan.'
        } },
        { type: 'cards', cols: 3, items: [
          { icon: '🥇', tone: 'amber', title: { ja: '通常作業域', en: 'Normal work area', id: 'Area kerja normal' }, text: { ja: '肘を体側につけたまま前腕を回して届く範囲（半径約35〜45cm）。頻繁に使う部品・工具はここへ。', en: 'Reached by swinging the forearm with elbows at the sides (radius about 35–45 cm). Frequently used parts/tools go here.', id: 'Dijangkau dengan mengayunkan lengan bawah, siku di samping badan (radius sekitar 35–45 cm). Komponen/alat yang sering dipakai diletakkan di sini.' } },
          { icon: '🥈', tone: 'gray', title: { ja: '最大作業域', en: 'Maximum work area', id: 'Area kerja maksimum' }, text: { ja: '腕を伸ばしきって届く範囲（半径約55〜65cm）。ときどき使うものまで。これを超えると体の移動が必要。', en: 'Reached with fully extended arms (radius about 55–65 cm). For occasionally used items; beyond this the body must move.', id: 'Dijangkau dengan lengan terentang penuh (radius sekitar 55–65 cm). Untuk barang yang sesekali dipakai; di luar ini tubuh harus bergerak.' } },
          { icon: '🎯', tone: 'green', title: { ja: 'ゴールデンゾーン', en: 'Golden zone', id: 'Zona emas' }, text: { ja: '高さ方向では、肩と腰の間（ひじ付近）が最も楽で速く正確に作業できる高さ。', en: 'Vertically, between shoulder and waist (around elbow height) is the easiest, fastest and most precise height.', id: 'Secara vertikal, antara bahu dan pinggang (sekitar tinggi siku) adalah ketinggian paling mudah, cepat, dan presisi.' } }
        ] },
        { type: 'callout', kind: 'note',
          title: { ja: '数値は目安', en: 'Values are guides', id: 'Nilai hanya panduan' },
          text: { ja: '作業域の寸法は体格によって変わります。実際の作業者の体格に合わせて作業台の高さや配置を調整しましょう。', en: 'Work-area dimensions depend on body size. Adjust bench height and layout to the actual workers.', id: 'Dimensi area kerja tergantung ukuran tubuh. Sesuaikan tinggi meja dan tata letak dengan pekerja sebenarnya.' } },
        { type: 'check',
          q: { ja: '1サイクルに4回使うねじと、1日に1回交換するドライバービット予備。通常作業域に置くべきなのは？', en: 'Screws used 4 times per cycle, and spare driver bits changed once a day. Which belongs in the normal work area?', id: 'Sekrup dipakai 4 kali per siklus, dan mata obeng cadangan diganti sekali sehari. Mana yang harus di area kerja normal?' },
          choices: [ { ja: 'ねじ', en: 'The screws', id: 'Sekrup' }, { ja: 'ビット予備', en: 'The spare bits', id: 'Mata obeng cadangan' }, { ja: '両方とも最大作業域の外', en: 'Both outside the maximum area', id: 'Keduanya di luar area maksimum' } ],
          answer: 0,
          explain: { ja: '使用頻度の高いものほど手元（通常作業域）に置きます。予備ビットは作業域の外でも問題ありません。', en: 'The more often an item is used, the closer it should be (normal area). Spare bits can be outside.', id: 'Semakin sering dipakai, semakin dekat letaknya (area normal). Mata cadangan boleh di luar.' } }
      ]
    },
    {
      id: 'apply',
      title: { ja: '動作改善の進め方', en: 'How to carry out motion improvement', id: 'Cara melakukan perbaikan gerakan' },
      blocks: [
        { type: 'flow', dir: 'h', nodes: [
          { title: { ja: '撮影', en: 'Film', id: 'Rekam' }, text: { ja: '手元が見える角度で数サイクル', en: 'several cycles, hands clearly visible', id: 'beberapa siklus, tangan terlihat jelas' }, tone: 'navy' },
          { title: { ja: '分解', en: 'Break down', id: 'Uraikan' }, text: { ja: '左右の手の動素を書き出す', en: 'write therbligs for each hand', id: 'tulis therblig tiap tangan' }, tone: 'blue' },
          { title: { ja: '着眼', en: 'Focus', id: 'Fokus' }, text: { ja: '第3類・第4類から先に', en: 'start with class 3 & 4', id: 'mulai dari kelas 3 & 4' }, tone: 'amber' },
          { title: { ja: '改善', en: 'Improve', id: 'Perbaiki' }, text: { ja: 'なくす→減らす→同時→楽に', en: 'eliminate → reduce → simultaneous → easier', id: 'hilangkan → kurangi → serentak → permudah' }, tone: 'green' },
          { title: { ja: '確認・標準化', en: 'Verify & standardize', id: 'Verifikasi & standarkan' }, text: { ja: 'CTとバラツキを再測定し標準作業へ', en: 're-measure CT & variation; update standard work', id: 'ukur ulang CT & variasi; perbarui kerja standar' }, tone: 'gray' }
        ] },
        { type: 'list', ordered: true, items: [
          { ja: '「なくせないか？」を最初に問う。探す・選ぶ・保持は、なくせる可能性が高い', en: 'First ask “can it be eliminated?” Search, select and hold are highly likely removable', id: 'Tanyakan dulu “bisakah dihilangkan?” Mencari, memilih, dan menahan sangat mungkin dihilangkan' },
          { ja: '次に距離と回数。部品を手元に、使う順に並べる', en: 'Next distance and count: bring parts close, arrange in order of use', id: 'Berikutnya jarak dan jumlah: dekatkan part, susun sesuai urutan pakai' },
          { ja: '両手が同時に価値のある動作をしているか確認する', en: 'Check whether both hands are doing valuable motion simultaneously', id: 'Periksa apakah kedua tangan melakukan gerakan bernilai secara serentak' },
          { ja: '位置決めはガイド・ストッパーで「考えなくても合う」ようにする', en: 'Make positioning “fit without thinking” with guides and stoppers', id: 'Buat pemosisian “pas tanpa berpikir” dengan pemandu dan stopper' },
          { ja: '改善後は時間だけでなく、毎回同じ動作になっているか（バラツキ）も確認する', en: 'After improving, check not only time but whether motions are the same every cycle (variation)', id: 'Setelah perbaikan, periksa bukan hanya waktu tetapi apakah gerakan sama tiap siklus (variasi)' }
        ] },
        { type: 'callout', kind: 'warn',
          title: { ja: '速さを強制しない', en: 'Do not force speed', id: 'Jangan memaksa kecepatan' },
          text: { ja: '動作改善の目的は作業者を急がせることではありません。無理な速さはムリとバラツキを生みます。**「普通に動けば自然に速く、毎回同じになる」**配置と道具を設計するのが正しい方向です。', en: 'The purpose of motion improvement is not to rush workers. Forced speed creates muri and variation. The right direction is to design layouts and tools where **“moving normally is naturally fast and the same every time.”**', id: 'Tujuan perbaikan gerakan bukan untuk memburu-buru pekerja. Kecepatan paksa menimbulkan muri dan variasi. Arah yang benar adalah merancang tata letak dan alat di mana **“bergerak normal secara alami cepat dan sama setiap kali.”**' } }
      ]
    }
  ],
  keyPoints: [
    { ja: '動作研究は動作レベルで「なぜ時間がかかるか」を解明する', en: 'Motion study explains “why it takes time” at the motion level', id: 'Studi gerakan menjelaskan “mengapa butuh waktu” di tingkat gerakan' },
    { ja: 'サーブリッグは4グループ。第3類（迷い）・第4類（保持・待ち）から改善する', en: 'Therbligs fall into 4 groups; improve class 3 (hesitation) and class 4 (holding, waiting) first', id: 'Therblig terbagi 4 grup; perbaiki dulu kelas 3 (ragu) dan kelas 4 (menahan, menunggu)' },
    { ja: '動作経済の基本は「なくす・減らす・同時に・楽にする」', en: 'Motion economy basics: eliminate, reduce, simultaneous, easier', id: 'Dasar ekonomi gerakan: hilangkan, kurangi, serentak, permudah' },
    { ja: 'よく使うものは通常作業域・ゴールデンゾーンに置く', en: 'Place frequently used items in the normal work area and golden zone', id: 'Letakkan barang yang sering dipakai di area kerja normal dan zona emas' },
    { ja: '動作の削減・短縮・拘束は、時間短縮と同時にバラツキ削減にも効く（ZEVA動作安定の原理）', en: 'Reducing, shortening and constraining motions cut both time and variation (ZEVA motion stability)', id: 'Mengurangi, memperpendek, dan membatasi gerakan memotong waktu sekaligus variasi (stabilitas gerakan ZEVA)' }
  ],
  quiz: [
    { q: { ja: 'サーブリッグの「保持」はどのグループに属し、どう改善する？', en: 'Which group does the therblig “hold” belong to, and how is it improved?', id: 'Therblig “menahan” termasuk grup mana, dan bagaimana diperbaiki?' },
      choices: [ { ja: '第1類。さらに増やす', en: 'Class 1; increase it', id: 'Kelas 1; tambah' }, { ja: '第2類。距離を短くする', en: 'Class 2; shorten distance', id: 'Kelas 2; perpendek jarak' }, { ja: '第4類。治具に保持させる', en: 'Class 4; let a jig hold', id: 'Kelas 4; biarkan jig menahan' }, { ja: '第3類。色分けする', en: 'Class 3; colour code', id: 'Kelas 3; beri kode warna' } ],
      answer: 2,
      explain: { ja: '保持は作業が進まない第4類のムダ。治具やクランプで置き換え、手を解放します。', en: 'Holding is class 4 no-progress waste; replace with a jig or clamp to free the hand.', id: 'Menahan adalah pemborosan kelas 4; ganti dengan jig atau klem untuk membebaskan tangan.' } },
    { q: { ja: '「探す」「選ぶ」をなくすのに最も有効な対策は？', en: 'Most effective countermeasure to eliminate “search” and “select”?', id: 'Tindakan paling efektif menghilangkan “mencari” dan “memilih”?' },
      choices: [ { ja: '作業者に集中するよう指導する', en: 'Tell workers to concentrate', id: 'Minta pekerja fokus' }, { ja: '定位置・定品・定量（3定）や色分け', en: 'Fixed position/item/quantity (3-tei) and colour coding', id: 'Posisi/barang/jumlah tetap (3-tei) dan kode warna' }, { ja: '作業時間を短く設定する', en: 'Set a shorter work time', id: 'Tetapkan waktu kerja lebih pendek' }, { ja: '部品の種類を増やす', en: 'Increase part variety', id: 'Tambah jenis part' } ],
      answer: 1,
      explain: { ja: '迷う原因は「どこに・どれが」が決まっていないこと。仕組みで迷いを消します。', en: 'Hesitation comes from undefined “where / which”; remove it with a system.', id: 'Keraguan berasal dari “di mana / yang mana” yang tidak ditetapkan; hilangkan dengan sistem.' } },
    { q: { ja: '動作経済の原則で、身体の使い方として正しいものは？', en: 'Which is a correct body-use principle of motion economy?', id: 'Manakah prinsip penggunaan tubuh yang benar?' },
      choices: [ { ja: '片手ずつ交互に動かす', en: 'Move one hand at a time alternately', id: 'Gerakkan satu tangan bergantian' }, { ja: '両手を同時に動かし始め、同時に終える', en: 'Start and finish both hands at the same time', id: 'Mulai dan akhiri kedua tangan bersamaan' }, { ja: 'できるだけ大きな身体部位で動く', en: 'Use the largest body segment possible', id: 'Gunakan bagian tubuh terbesar' }, { ja: '急な方向転換を多用する', en: 'Use many sharp direction changes', id: 'Banyak perubahan arah tajam' } ],
      answer: 1,
      explain: { ja: '両手の同時・対称動作はバランスがよく、片手待ちもなくなります。身体部位はできるだけ低い（小さい）ものを使います。', en: 'Simultaneous, symmetrical hand motion is balanced and removes idle hands. Use the lowest (smallest) body segment possible.', id: 'Gerakan tangan serentak dan simetris seimbang dan menghilangkan tangan menganggur. Gunakan bagian tubuh terendah (terkecil).' } },
    { q: { ja: '頻繁に使う部品を置くべき場所は？', en: 'Where should frequently used parts be placed?', id: 'Di mana part yang sering dipakai diletakkan?' },
      choices: [ { ja: '最大作業域の外', en: 'Outside the maximum work area', id: 'Di luar area kerja maksimum' }, { ja: '通常作業域の、使う順の位置', en: 'Within the normal work area, in order of use', id: 'Dalam area kerja normal, sesuai urutan pakai' }, { ja: '作業者の背後', en: 'Behind the worker', id: 'Di belakang pekerja' }, { ja: '床の上', en: 'On the floor', id: 'Di lantai' } ],
      answer: 1,
      explain: { ja: '肘を体側につけたまま届く通常作業域に、使う順に置くと距離も迷いも減ります。', en: 'Placing them in order within the normal area (reachable with elbows at the sides) reduces distance and hesitation.', id: 'Meletakkannya berurutan di area normal (terjangkau dengan siku di samping) mengurangi jarak dan keraguan.' } },
    { q: { ja: '両手作業分析で最も発見しやすいムダは？', en: 'Which waste is easiest to find with two-hand analysis?', id: 'Pemborosan apa yang paling mudah ditemukan dengan analisis dua tangan?' },
      choices: [ { ja: '在庫のムダ', en: 'Inventory', id: 'Persediaan' }, { ja: '片手の待ち・保持', en: 'One hand idle or holding', id: 'Satu tangan menganggur atau menahan' }, { ja: '作りすぎ', en: 'Overproduction', id: 'Produksi berlebih' }, { ja: '運搬のムダ', en: 'Transport', id: 'Transportasi' } ],
      answer: 1,
      explain: { ja: '左右を同じ時間軸に並べるので、片手が働いていない時間が一目で分かります。', en: 'Left and right on the same time axis make it obvious when one hand is not working.', id: 'Kiri dan kanan pada sumbu waktu yang sama menunjukkan jelas saat satu tangan tidak bekerja.' } },
    { q: { ja: '部品に位置決めガイドを付けた。ZEVAの動作安定の原理ではどの法則に当たる？', en: 'A positioning guide was added for a part. Which ZEVA motion-stability law applies?', id: 'Pemandu posisi ditambahkan untuk part. Hukum stabilitas gerakan ZEVA mana yang berlaku?' },
      choices: [ { ja: '距離・変位の法則', en: 'Law of distance/displacement', id: 'Hukum jarak/perpindahan' }, { ja: 'シーケンス累積の法則', en: 'Law of sequence accumulation', id: 'Hukum akumulasi urutan' }, { ja: '拘束とガイドの法則', en: 'Law of constraint and guide', id: 'Hukum batasan dan pemandu' }, { ja: 'どれにも当たらない', en: 'None', id: 'Tidak ada' } ],
      answer: 2,
      explain: { ja: '動きの自由度を制限し、構造的にバラツキを封じるのが拘束とガイドの法則です。', en: 'Limiting degrees of freedom to structurally block variation is the law of constraint and guide.', id: 'Membatasi derajat kebebasan untuk menahan variasi secara struktural adalah hukum batasan dan pemandu.' } },
    { q: { ja: '動作改善の正しい考え方は？', en: 'What is the right mindset for motion improvement?', id: 'Pola pikir yang benar untuk perbaikan gerakan?' },
      choices: [ { ja: '作業者に速く動くよう指示する', en: 'Instruct workers to move faster', id: 'Instruksikan pekerja bergerak lebih cepat' }, { ja: '普通に動けば自然に速く、毎回同じになる配置と道具を設計する', en: 'Design layouts and tools so normal movement is naturally fast and repeatable', id: 'Rancang tata letak dan alat agar gerakan normal secara alami cepat dan berulang sama' }, { ja: '熟練者だけに作業させる', en: 'Let only experts do the work', id: 'Hanya ahli yang bekerja' }, { ja: '余裕率を下げる', en: 'Lower the allowance', id: 'Turunkan kelonggaran' } ],
      answer: 1,
      explain: { ja: '仕組みで動作を変えるのがIE・ZEVAの基本。無理な速さはムリとバラツキを生みます。', en: 'Changing motion through the system is the IE/ZEVA basic; forced speed breeds muri and variation.', id: 'Mengubah gerakan melalui sistem adalah dasar IE/ZEVA; kecepatan paksa menimbulkan muri dan variasi.' } }
  ]
});
