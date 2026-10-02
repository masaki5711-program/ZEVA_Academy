ZA.addModule({
  id: 'z2-03',
  track: 'z2',
  order: 3,
  minutes: 30,
  icon: '🤲',
  level: 2,
  prereq: ['z2-02', 'ie-04'],
  title: { ja: '動作安定の原理', en: 'Principles of Motion Stability', id: 'Prinsip Stabilitas Gerakan' },
  summary: {
    ja: 'GPC-Hで人の作業バラツキを構造的に排除するための3つの法則（距離・変位、シーケンス累積、拘束とガイド）を学びます。',
    en: 'Learn the three laws used in GPC-H to structurally eliminate human work variation: distance/displacement, sequence accumulation, and constraint & guide.',
    id: 'Pelajari tiga hukum dalam GPC-H untuk menghilangkan variasi kerja manusia secara struktural: jarak/perpindahan, akumulasi urutan, serta batasan & pemandu.'
  },
  objectives: [
    { ja: '「すべての動作はバラツキの発生源である」の意味を説明できる', en: 'Explain what "every motion is a source of variation" means', id: 'Menjelaskan arti "setiap gerakan adalah sumber variasi"' },
    { ja: '3つの法則それぞれの内容と理由を説明できる', en: 'Explain the content and reasoning of each of the three laws', id: 'Menjelaskan isi dan alasan masing-masing dari tiga hukum' },
    { ja: '動作数と成功確率の関係を計算で示せる', en: 'Show the relation between number of motions and success probability by calculation', id: 'Menunjukkan hubungan jumlah gerakan dan peluang berhasil dengan perhitungan' },
    { ja: '作業台に3法則を適用するチェックができる', en: 'Check a workstation by applying the three laws', id: 'Memeriksa stasiun kerja dengan menerapkan tiga hukum' }
  ],
  sections: [
    {
      id: 'core',
      title: { ja: 'すべての動作はバラツキの発生源', en: 'Every motion is a source of variation', id: 'Setiap gerakan adalah sumber variasi' },
      blocks: [
        { type: 'callout', kind: 'key', title: { ja: '核心', en: 'Core', id: 'Inti' }, text: {
          ja: 'すべての動作は「バラツキ（Variation）」の発生源である。',
          en: 'Every motion is a source of variation.',
          id: 'Setiap gerakan adalah sumber variasi.'
        } },
        { type: 'p', text: {
          ja: '人は機械ではないので、同じ動作を何度繰り返しても毎回わずかに違います。手を伸ばす距離、つかむ位置、置く角度、動作の順番 ―― そのひとつひとつが時間と品質のバラツキを生みます。[[motion-stability]]は、「気をつけてください」という精神論ではなく、**作業の設計そのもの**によってバラツキが生まれにくい構造をつくる考え方です。',
          en: 'People are not machines, so even when repeating the same motion, it differs slightly each time. The reach distance, grasp position, placing angle and motion order — each of these creates variation in time and quality. [[motion-stability]] is not a "please be careful" mindset; it builds a structure where variation hardly arises, **through the design of the work itself**.',
          id: 'Manusia bukan mesin, jadi meski mengulang gerakan yang sama, setiap kali sedikit berbeda. Jarak menjangkau, posisi memegang, sudut meletakkan, dan urutan gerakan — masing-masing menimbulkan variasi waktu dan kualitas. [[motion-stability]] bukan sikap "harap berhati-hati", tetapi membangun struktur di mana variasi sulit muncul, **melalui desain kerja itu sendiri**.'
        } },
        { type: 'cards', cols: 3, items: [
          { icon: '📐', title: { ja: '第1法則：距離・変位', en: 'Law 1: Distance / displacement', id: 'Hukum 1: Jarak / perpindahan' }, text: { ja: '動作距離の短縮は、バラツキの許容範囲を物理的に縮小する', en: 'Shortening motion distance physically shrinks the room for variation', id: 'Memperpendek jarak gerakan secara fisik mempersempit ruang variasi' }, tone: 'blue' },
          { icon: '🎲', title: { ja: '第2法則：シーケンス累積', en: 'Law 2: Sequence accumulation', id: 'Hukum 2: Akumulasi urutan' }, text: { ja: '動作数の削減は、バラツキ発生の機会を消滅させる', en: 'Reducing the number of motions eliminates opportunities for variation', id: 'Mengurangi jumlah gerakan menghilangkan kesempatan terjadinya variasi' }, tone: 'amber' },
          { icon: '🧲', title: { ja: '第3法則：拘束とガイド', en: 'Law 3: Constraint & guide', id: 'Hukum 3: Batasan & pemandu' }, text: { ja: '自由度の制限は、バラツキの発生を構造的に封じる', en: 'Limiting degrees of freedom structurally blocks variation', id: 'Membatasi derajat kebebasan secara struktural mencegah variasi' }, tone: 'green' }
        ] },
        { type: 'callout', kind: 'zeva', title: { ja: 'GPC-Hの中での位置づけ', en: 'Position within GPC-H', id: 'Posisi dalam GPC-H' }, text: {
          ja: 'GPC-Hは「ECRSと動作安定の原理で作業を設計 → 4M標準化で標準作業を定義 → CT計測 → V.Scoreで評価」という流れです。動作安定の原理は、標準作業を書く**前に**作業そのものをブレにくく設計する段階で使います。',
          en: 'GPC-H flows as: design the work with ECRS and motion stability → define standard work with 4M standards → measure CT → evaluate with V.Score. Motion stability is used **before** writing the standard, when designing the work itself to be hard to vary.',
          id: 'Alur GPC-H: rancang kerja dengan ECRS dan stabilitas gerakan → definisikan kerja standar dengan standar 4M → ukur CT → evaluasi dengan V.Score. Stabilitas gerakan dipakai **sebelum** menulis standar, saat merancang kerja agar sulit bervariasi.'
        } }
      ]
    },
    {
      id: 'law1',
      title: { ja: '第1法則：距離・変位の法則', en: 'Law 1: Distance / displacement', id: 'Hukum 1: Jarak / perpindahan' },
      blocks: [
        { type: 'callout', kind: 'note', title: { ja: '法則', en: 'Law', id: 'Hukum' }, text: {
          ja: '[[distance-law]]：動作距離の短縮は、バラツキの許容範囲を物理的に縮小する。',
          en: '[[distance-law]]: shortening motion distance physically shrinks the allowable range of variation.',
          id: '[[distance-law]]: memperpendek jarak gerakan secara fisik mempersempit rentang variasi yang mungkin.'
        } },
        { type: 'list', items: [
          { ja: '**距離が短い ＝ ズレる余地がない**。10cm先の部品と60cm先の部品では、手が止まる位置のブレ幅がまったく違います。', en: '**Short distance = no room to drift.** The spread of where the hand stops is very different for a part 10 cm away and one 60 cm away.', id: '**Jarak pendek = tidak ada ruang untuk meleset.** Sebaran posisi tangan berhenti sangat berbeda untuk part berjarak 10 cm dan 60 cm.' },
          { ja: '**移動ベクトルの極小化**で物理的なブレ幅を強制的に下げます。移動が長いほど、加速・減速・位置合わせの誤差が積み重なります。', en: '**Minimising the movement vector** forcibly reduces the physical spread. The longer the movement, the more acceleration, deceleration and positioning errors add up.', id: '**Meminimalkan vektor gerakan** menurunkan sebaran fisik secara paksa. Semakin panjang gerakan, semakin banyak kesalahan percepatan, perlambatan, dan penempatan yang bertumpuk.' },
          { ja: '時間の面でも、距離が長い動作は速さが人や体調で変わりやすく、CTのバラツキになります。', en: 'In terms of time too, long-distance motions vary in speed with the person and their condition, becoming CT variation.', id: 'Dari sisi waktu juga, gerakan berjarak jauh kecepatannya mudah berubah menurut orang dan kondisinya, menjadi variasi CT.' }
        ] },
        { type: 'example', title: { ja: '適用例（説明用）', en: 'Application example (illustrative)', id: 'Contoh penerapan (ilustrasi)' }, steps: [
          { ja: '部品箱が作業者の正面50cm・高さ違いの棚にあり、取り時間が2〜5秒でばらつく', en: 'Parts bins sit 50 cm in front on shelves of different heights; pick time varies 2–5 s', id: 'Kotak part berada 50 cm di depan pada rak berbeda tinggi; waktu ambil bervariasi 2–5 dtk' },
          { ja: '使用頻度の高い部品から、肘を曲げたまま届く範囲（ゴールデンゾーン）へ移動', en: 'Move the most frequently used parts into the range reachable with elbows bent (golden zone)', id: 'Pindahkan part paling sering dipakai ke jangkauan dengan siku tertekuk (zona emas)' },
          { ja: '取り出し口を手元に向けた傾斜棚に変更', en: 'Change to inclined shelves with openings facing the operator', id: 'Ganti dengan rak miring yang lubangnya menghadap operator' }
        ], result: { ja: '取り時間 1.5〜2.0秒に安定（ばらつきの幅が縮小）', en: 'Pick time stabilised at 1.5–2.0 s (spread reduced)', id: 'Waktu ambil stabil di 1,5–2,0 dtk (sebaran menyempit)' } }
      ]
    },
    {
      id: 'law2',
      title: { ja: '第2法則：シーケンス累積の法則', en: 'Law 2: Sequence accumulation', id: 'Hukum 2: Akumulasi urutan' },
      blocks: [
        { type: 'callout', kind: 'note', title: { ja: '法則', en: 'Law', id: 'Hukum' }, text: {
          ja: '[[sequence-law]]：動作数の削減は、バラツキ発生の機会を消滅させる。',
          en: '[[sequence-law]]: reducing the number of motions eliminates the opportunities for variation to occur.',
          id: '[[sequence-law]]: mengurangi jumlah gerakan menghilangkan kesempatan terjadinya variasi.'
        } },
        { type: 'p', text: {
          ja: '動作をひとつ行うたびに、わずかな確率でミスや時間のブレが起きます。動作が多いことは、**サイコロを振る回数が多い**のと同じです。1回あたりの失敗確率が小さくても、回数が増えれば全体としての失敗は確実に積み上がります。',
          en: 'Each motion carries a small chance of an error or a time deviation. Many motions are like **rolling a die many times**. Even if the failure chance per motion is small, total failures surely accumulate as the count grows.',
          id: 'Setiap gerakan membawa peluang kecil terjadinya kesalahan atau penyimpangan waktu. Banyak gerakan sama seperti **melempar dadu berkali-kali**. Meski peluang gagal per gerakan kecil, total kegagalan pasti bertambah seiring jumlahnya.'
        } },
        { type: 'formula', expr: { ja: '全動作がミスなく終わる確率 = (1 − p)<sup>n</sup>', en: 'Probability all motions succeed = (1 − p)<sup>n</sup>', id: 'Peluang semua gerakan berhasil = (1 − p)<sup>n</sup>' }, where: [
          { sym: 'p', text: { ja: '1動作あたりのミス（ブレ）発生確率', en: 'Probability of error (deviation) per motion', id: 'Peluang kesalahan (penyimpangan) per gerakan' } },
          { sym: 'n', text: { ja: '動作数', en: 'Number of motions', id: 'Jumlah gerakan' } }
        ], note: { ja: '考え方を理解するための簡略モデル（各動作が独立と仮定）です。', en: 'A simplified model to grasp the idea (assumes independent motions).', id: 'Model sederhana untuk memahami gagasan (mengasumsikan gerakan independen).' } },
        { type: 'table',
          head: [ { ja: '動作数 n', en: 'Motions n', id: 'Gerakan n' }, 'p = 1%', 'p = 2%' ],
          rows: [
            [ '5', '95.1%', '90.4%' ],
            [ '10', '90.4%', '81.7%' ],
            [ '20', '81.8%', '66.8%' ],
            [ '40', '66.9%', '44.6%' ]
          ],
          caption: { ja: '動作数が増えるほど、1サイクルを「ブレなし」で終える確率は下がる', en: 'The more motions, the lower the chance of finishing a cycle without deviation', id: 'Semakin banyak gerakan, semakin rendah peluang menyelesaikan siklus tanpa penyimpangan' }
        },
        { type: 'list', items: [
          { ja: '**持ち替え**をなくす：右手で取って左手に渡す動作は丸ごと不要にできないか', en: 'Eliminate **re-grasping**: can passing a part from right hand to left hand be removed entirely?', id: 'Hilangkan **pindah pegangan**: bisakah memindahkan part dari tangan kanan ke kiri dihilangkan sama sekali?' },
          { ja: '**探す・選ぶ**をなくす：3定（定位置・定品・定量）で探す動作をゼロに', en: 'Eliminate **searching/selecting**: make searching zero with 3-teii (fixed position, item, quantity)', id: 'Hilangkan **mencari/memilih**: jadikan mencari nol dengan 3-teii (posisi, barang, jumlah tetap)' },
          { ja: '**確認動作**を構造に置き換える：目視確認を治具やポカヨケで不要に', en: 'Replace **checking motions** with structure: jigs and poka-yoke make visual checks unnecessary', id: 'Ganti **gerakan pengecekan** dengan struktur: jig dan poka-yoke membuat cek visual tidak perlu' }
        ] }
      ]
    },
    {
      id: 'law3',
      title: { ja: '第3法則：拘束とガイドの法則', en: 'Law 3: Constraint & guide', id: 'Hukum 3: Batasan & pemandu' },
      blocks: [
        { type: 'callout', kind: 'note', title: { ja: '法則', en: 'Law', id: 'Hukum' }, text: {
          ja: '[[constraint-law]]：自由度の制限は、バラツキの発生を構造的に封じる。',
          en: '[[constraint-law]]: limiting degrees of freedom structurally blocks variation from occurring.',
          id: '[[constraint-law]]: membatasi derajat kebebasan secara struktural mencegah terjadinya variasi.'
        } },
        { type: 'compare',
          left: { title: { ja: '自由な動作 → 最大のバラツキ', en: 'Free motion → maximum variation', id: 'Gerakan bebas → variasi maksimum' }, tone: 'red', items: [
            { ja: '作業台の上の「だいたいこのあたり」に部品を置く', en: 'Place the part "roughly around here" on the bench', id: 'Letakkan part "kira-kira di sekitar sini" di meja' },
            { ja: 'ラベルを目分量でまっすぐ貼る', en: 'Stick a label straight by eye', id: 'Tempel label lurus dengan perkiraan mata' },
            { ja: '差し込み方向を作業者が判断する', en: 'The operator decides insertion direction', id: 'Operator menentukan arah pemasangan' }
          ] },
          right: { title: { ja: '拘束された動作 → バラツキはゼロに近づく', en: 'Constrained motion → variation approaches zero', id: 'Gerakan dibatasi → variasi mendekati nol' }, tone: 'green', items: [
            { ja: '位置決め治具・ストッパーに当てて置く', en: 'Place it against a locating jig / stopper', id: 'Letakkan menempel jig penentu posisi / stopper' },
            { ja: 'ガイド付きの貼り付け治具で位置と角度を固定', en: 'Fix position and angle with a guided labelling jig', id: 'Tetapkan posisi dan sudut dengan jig label berpemandu' },
            { ja: '形状で逆向きには入らないようにする', en: 'Shape it so it cannot be inserted the wrong way', id: 'Bentuk sehingga tidak bisa dipasang terbalik' }
          ] }
        },
        { type: 'p', text: {
          ja: '人に「正確に」を求めるほど、スキル・集中力・体調への依存が強まります。ガイドやストッパーは、動きの選択肢そのものを減らすので、**誰がやっても同じ位置・同じ向き**になります。これは[[poka-yoke]]とも同じ発想です。',
          en: 'The more you demand "accuracy" from people, the more you depend on skill, concentration and physical condition. Guides and stoppers reduce the options of motion themselves, so the result is **the same position and orientation whoever does it**. This is the same idea as [[poka-yoke]].',
          id: 'Semakin menuntut "ketepatan" dari manusia, semakin bergantung pada keterampilan, konsentrasi, dan kondisi fisik. Pemandu dan stopper mengurangi pilihan gerakan itu sendiri, sehingga hasilnya **posisi dan arah yang sama siapa pun yang mengerjakan**. Ini sama dengan gagasan [[poka-yoke]].'
        } },
        { type: 'widget', name: 'motion-laws', props: {} }
      ]
    },
    {
      id: 'link',
      title: { ja: '動作経済の原則との関係と現場への適用', en: 'Relation to motion economy and application', id: 'Hubungan dengan ekonomi gerakan dan penerapan' },
      blocks: [
        { type: 'table',
          head: [ { ja: 'ZEVA 動作安定の原理', en: 'ZEVA motion stability', id: 'Stabilitas gerakan ZEVA' }, { ja: 'IEの[[motion-economy]]との対応', en: 'Counterpart in IE [[motion-economy]]', id: 'Padanan dalam [[motion-economy]] IE' }, { ja: '視点の違い', en: 'Difference in viewpoint', id: 'Perbedaan sudut pandang' } ],
          rows: [
            [ { ja: '距離・変位の法則', en: 'Distance / displacement law', id: 'Hukum jarak / perpindahan' }, { ja: '最適・最短距離、作業域の配置', en: 'Optimal/shortest distance, workplace layout', id: 'Jarak optimal/terpendek, tata letak area kerja' }, { ja: '時間短縮だけでなく「ブレ幅の縮小」として捉える', en: 'Seen not only as time saving but as shrinking spread', id: 'Dilihat bukan hanya penghematan waktu tetapi penyempitan sebaran' } ],
            [ { ja: 'シーケンス累積の法則', en: 'Sequence accumulation law', id: 'Hukum akumulasi urutan' }, { ja: '動作をなくす・減らす', en: 'Eliminate / reduce motions', id: 'Hilangkan / kurangi gerakan' }, { ja: '「バラツキ発生の機会」を減らすという確率的な理由', en: 'Probabilistic reason: fewer opportunities for variation', id: 'Alasan probabilistik: lebih sedikit kesempatan variasi' } ],
            [ { ja: '拘束とガイドの法則', en: 'Constraint & guide law', id: 'Hukum batasan & pemandu' }, { ja: '治具・工具の活用', en: 'Use of jigs and tools', id: 'Pemanfaatan jig dan alat' }, { ja: '自由度を構造的に制限して再現性を保証', en: 'Guarantee reproducibility by structurally limiting freedom', id: 'Menjamin reprodusibilitas dengan membatasi kebebasan secara struktural' } ]
          ]
        },
        { type: 'callout', kind: 'tip', title: { ja: '適用の順番', en: 'Order of application', id: 'Urutan penerapan' }, text: {
          ja: 'まず[[ecrs]]の E（なくせないか）で動作そのものを消し、残った動作に対して「数を減らす（第2法則）→ 距離を縮める（第1法則）→ 自由度を拘束する（第3法則）」の順に考えると効率的です。',
          en: 'First remove motions with the E of [[ecrs]] (can it be eliminated?). For the remaining motions, think in the order: reduce count (Law 2) → shorten distance (Law 1) → constrain freedom (Law 3).',
          id: 'Pertama hilangkan gerakan dengan E dari [[ecrs]] (bisakah dihilangkan?). Untuk gerakan tersisa, pikirkan urutan: kurangi jumlah (Hukum 2) → perpendek jarak (Hukum 1) → batasi kebebasan (Hukum 3).'
        } },
        { type: 'h', text: { ja: '作業台チェックリスト', en: 'Workstation checklist', id: 'Daftar periksa stasiun kerja' } },
        { type: 'list', ordered: true, items: [
          { ja: '手を伸ばす・歩く動作は、肘を曲げた範囲で完結しているか（第1法則）', en: 'Are reaching and walking completed within elbow-bent range? (Law 1)', id: 'Apakah menjangkau dan berjalan selesai dalam jangkauan siku tertekuk? (Hukum 1)' },
          { ja: '持ち替え・探す・選ぶ・向きを直す動作が残っていないか（第2法則）', en: 'Are there remaining re-grasp, search, select or re-orient motions? (Law 2)', id: 'Apakah masih ada gerakan pindah pegangan, mencari, memilih, atau membetulkan arah? (Hukum 2)' },
          { ja: '置き位置・差し込み方向は治具・ストッパー・形状で決まっているか（第3法則）', en: 'Are placing positions and insertion directions determined by jigs, stoppers or shape? (Law 3)', id: 'Apakah posisi letak dan arah pemasangan ditentukan oleh jig, stopper, atau bentuk? (Hukum 3)' },
          { ja: '「注意する」「確認する」と書かれた手順を、構造で置き換えられないか', en: 'Can steps saying "be careful" or "check" be replaced by structure?', id: 'Bisakah langkah bertuliskan "hati-hati" atau "periksa" diganti dengan struktur?' },
          { ja: '改善後にCTを計測し、V.Scoreが下がったことを確認したか', en: 'After the change, did you measure CT and confirm V.Score went down?', id: 'Setelah perubahan, apakah CT diukur dan V.Score dipastikan turun?' }
        ] },
        { type: 'check', q: { ja: '「部品をトレーの“だいたい中央”に置く」手順で位置ズレ不良が出ている。最も効果的な対策は？', en: 'A step says "place the part roughly in the centre of the tray" and misplacement defects occur. Most effective countermeasure?', id: 'Langkah berbunyi "letakkan part kira-kira di tengah baki" dan terjadi cacat salah posisi. Tindakan paling efektif?' }, choices: [
          { ja: '手順書に「正確に中央に置くこと」と太字で追記する', en: 'Add "place exactly in the centre" in bold to the instruction', id: 'Tambahkan "letakkan tepat di tengah" dengan huruf tebal di instruksi' },
          { ja: 'トレーに部品形状に合った位置決めガイドを付ける', en: 'Add a locating guide matching the part shape to the tray', id: 'Pasang pemandu posisi sesuai bentuk part pada baki' },
          { ja: '作業者に注意喚起の朝礼を毎日行う', en: 'Hold a daily morning reminder meeting for operators', id: 'Adakan pengingat pagi setiap hari untuk operator' }
        ], answer: 1, explain: { ja: '拘束とガイドの法則。自由度を物理的に制限すれば、注意力に頼らず誰がやっても同じ位置になります。', en: 'Constraint & guide law: physically limiting freedom gives the same position for anyone without relying on attention.', id: 'Hukum batasan & pemandu: membatasi kebebasan secara fisik memberi posisi sama untuk siapa pun tanpa bergantung pada perhatian.' } }
      ]
    }
  ],
  keyPoints: [
    { ja: 'すべての動作はバラツキの発生源。精神論ではなく作業設計でバラツキを封じる', en: 'Every motion is a source of variation — block it by work design, not by willpower', id: 'Setiap gerakan sumber variasi — cegah dengan desain kerja, bukan dengan kemauan' },
    { ja: '第1法則：距離を短くすればズレる余地がなくなる', en: 'Law 1: shorter distance leaves no room to drift', id: 'Hukum 1: jarak lebih pendek tidak menyisakan ruang meleset' },
    { ja: '第2法則：動作数を減らす＝サイコロを振る回数を減らす。(1−p)ⁿ', en: 'Law 2: fewer motions = fewer dice rolls. (1−p)ⁿ', id: 'Hukum 2: lebih sedikit gerakan = lebih sedikit lemparan dadu. (1−p)ⁿ' },
    { ja: '第3法則：ガイド・ストッパーで自由度を制限すればバラツキはゼロに近づく', en: 'Law 3: limiting freedom with guides/stoppers brings variation close to zero', id: 'Hukum 3: membatasi kebebasan dengan pemandu/stopper membuat variasi mendekati nol' },
    { ja: '効果はCT計測とV.Scoreで確認する', en: 'Confirm the effect with CT measurement and V.Score', id: 'Pastikan efeknya dengan pengukuran CT dan V.Score' }
  ],
  quiz: [
    { q: { ja: '動作安定の原理はGPC-M・GPC-Hのどちらで使われる？', en: 'Motion stability principles are used in which?', id: 'Prinsip stabilitas gerakan digunakan dalam?' }, choices: [
      { ja: 'GPC-M（設備制御）', en: 'GPC-M (machine control)', id: 'GPC-M (kontrol mesin)' },
      { ja: 'GPC-H（人制御）', en: 'GPC-H (human control)', id: 'GPC-H (kontrol manusia)' },
      { ja: 'デジタル化レベル3 のみ', en: 'Only digital level 3', id: 'Hanya level digital 3' },
      { ja: 'Deep GPCのAnalyzeのみ', en: 'Only in Deep GPC Analyze', id: 'Hanya di Analyze Deep GPC' }
    ], answer: 1, explain: { ja: '人の作業バラツキを構造的に排除するための、GPC-Hの原理です。', en: 'It is a GPC-H principle to structurally eliminate human work variation.', id: 'Ini prinsip GPC-H untuk menghilangkan variasi kerja manusia secara struktural.' } },
    { q: { ja: '「動作数の削減は、バラツキ発生の機会を消滅させる」はどの法則？', en: '"Reducing the number of motions eliminates opportunities for variation" is which law?', id: '"Mengurangi jumlah gerakan menghilangkan kesempatan variasi" adalah hukum mana?' }, choices: [
      { ja: '距離・変位の法則', en: 'Distance / displacement law', id: 'Hukum jarak / perpindahan' },
      { ja: 'シーケンス累積の法則', en: 'Sequence accumulation law', id: 'Hukum akumulasi urutan' },
      { ja: '拘束とガイドの法則', en: 'Constraint & guide law', id: 'Hukum batasan & pemandu' },
      { ja: 'シューハートの原則', en: 'Shewhart’s principle', id: 'Prinsip Shewhart' }
    ], answer: 1, explain: { ja: '動作をサイコロに例えると、振る回数を減らすことに相当します。', en: 'If motions are dice rolls, this means rolling fewer times.', id: 'Jika gerakan adalah lemparan dadu, ini berarti melempar lebih sedikit.' } },
    { q: { ja: '1動作のミス確率1%、動作数20の場合、全動作がミスなく終わる確率は約何%？', en: 'Error probability 1% per motion, 20 motions. Probability all succeed is about?', id: 'Peluang salah 1% per gerakan, 20 gerakan. Peluang semua berhasil sekitar?' }, choices: [
      { ja: '約99%', en: 'About 99%', id: 'Sekitar 99%' },
      { ja: '約90%', en: 'About 90%', id: 'Sekitar 90%' },
      { ja: '約82%', en: 'About 82%', id: 'Sekitar 82%' },
      { ja: '約80%ちょうど（1%×20）', en: 'Exactly 80% (1% × 20)', id: 'Tepat 80% (1% × 20)' }
    ], answer: 2, explain: { ja: '(0.99)²⁰ ≒ 0.818。単純な掛け算ではなく累乗で積み上がります。', en: '(0.99)^20 ≈ 0.818. It accumulates by power, not simple multiplication.', id: '(0,99)^20 ≈ 0,818. Terakumulasi secara pangkat, bukan perkalian sederhana.' } },
    { q: { ja: '距離・変位の法則の説明として正しいのは？', en: 'Which describes the distance/displacement law?', id: 'Manakah yang menjelaskan hukum jarak/perpindahan?' }, choices: [
      { ja: '動作距離を短くすると、ブレ幅が物理的に小さくなる', en: 'Shorter motion distance physically reduces spread', id: 'Jarak gerakan lebih pendek secara fisik mengurangi sebaran' },
      { ja: '動作距離を長くすると、作業者の運動になり疲労が減る', en: 'Longer distance gives exercise and reduces fatigue', id: 'Jarak lebih jauh memberi olahraga dan mengurangi lelah' },
      { ja: '距離はバラツキと無関係で、時間だけに影響する', en: 'Distance is unrelated to variation; it only affects time', id: 'Jarak tidak terkait variasi; hanya memengaruhi waktu' },
      { ja: '距離より動作の速さを上げることが重要', en: 'Speeding up motion matters more than distance', id: 'Mempercepat gerakan lebih penting dari jarak' }
    ], answer: 0, explain: { ja: '距離が短いほどズレる余地がなく、移動ベクトルの極小化でブレ幅を下げます。', en: 'The shorter the distance, the less room to drift; minimising the movement vector lowers spread.', id: 'Semakin pendek jarak, semakin sedikit ruang meleset; meminimalkan vektor gerakan menurunkan sebaran.' } },
    { q: { ja: '拘束とガイドの法則の適用例はどれ？', en: 'Which is an application of the constraint & guide law?', id: 'Manakah penerapan hukum batasan & pemandu?' }, choices: [
      { ja: '部品箱を手元に移動する', en: 'Move the parts bin closer', id: 'Pindahkan kotak part lebih dekat' },
      { ja: 'ストッパー付き治具で置き位置を固定する', en: 'Fix the placing position with a jig that has a stopper', id: 'Tetapkan posisi letak dengan jig ber-stopper' },
      { ja: '作業者の人数を増やす', en: 'Add more operators', id: 'Tambah operator' },
      { ja: '平均CTの目標を下げる', en: 'Lower the average CT target', id: 'Turunkan target CT rata-rata' }
    ], answer: 1, explain: { ja: '自由度を制限して「そこにしか置けない」状態にするのが第3法則です。①は第1法則です。', en: 'Law 3 limits freedom so the part "can only go there". Option 1 is Law 1.', id: 'Hukum 3 membatasi kebebasan sehingga part "hanya bisa di sana". Pilihan 1 adalah Hukum 1.' } },
    { q: { ja: '動作安定の原理の考え方として誤っているものは？', en: 'Which is NOT consistent with motion stability?', id: 'Manakah yang TIDAK sesuai dengan stabilitas gerakan?' }, choices: [
      { ja: '作業の設計そのものでバラツキを出にくくする', en: 'Make variation unlikely through work design itself', id: 'Membuat variasi sulit muncul lewat desain kerja itu sendiri' },
      { ja: '「よく注意する」と作業者に徹底させることが最も確実', en: 'Telling operators to "pay close attention" is the most reliable method', id: 'Menyuruh operator "sangat berhati-hati" adalah cara paling andal' },
      { ja: '持ち替えや探す動作をなくす', en: 'Remove re-grasping and searching', id: 'Hilangkan pindah pegangan dan mencari' },
      { ja: '改善効果をV.Scoreで確認する', en: 'Confirm improvement with V.Score', id: 'Pastikan perbaikan dengan V.Score' }
    ], answer: 1, explain: { ja: '注意力に頼る方法は人に依存し、再現性を保証できません。構造で封じるのが原理の本質です。', en: 'Relying on attention depends on people and cannot guarantee reproducibility. The essence is blocking variation by structure.', id: 'Mengandalkan perhatian bergantung pada manusia dan tidak menjamin reprodusibilitas. Intinya mencegah variasi dengan struktur.' } }
  ]
});
