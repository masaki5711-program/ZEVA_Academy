(function () {
  const T = (ja, en, id) => ({ ja, en, id });

  ZA.addModule({
    id: 'ie-10',
    track: 'ie',
    order: 10,
    minutes: 40,
    icon: '🧰',
    level: 1,
    prereq: ['ie-01'],
    title: T('改善の基本ツール', 'Basic Improvement Tools', 'Alat Dasar Perbaikan'),
    summary: T(
      '5S・3定、標準作業、ECRS、PDCA、なぜなぜ分析、特性要因図、パレート図、QC七つ道具、ポカヨケ——現場改善の共通言語となる基本ツールをまとめて学びます。',
      '5S & 3-tei, standard work, ECRS, PDCA, 5-Why, fishbone, Pareto, the QC 7 tools and poka-yoke — the basic tools that form the common language of shop-floor improvement.',
      '5S & 3-tei, kerja standar, ECRS, PDCA, 5-Why, fishbone, Pareto, 7 alat QC, dan poka-yoke — alat dasar yang membuat semua berbicara dalam bahasa yang sama di lantai produksi.'
    ),
    objectives: [
      T('5Sと3定の意味を説明し、職場をチェックできる', 'Explain 5S and 3-tei and check a workplace', 'Menjelaskan 5S dan 3-tei serta memeriksa tempat kerja'),
      T('標準作業の3要素を説明できる', 'Explain the three elements of standard work', 'Menjelaskan tiga elemen kerja standar'),
      T('ECRSの順番で改善案を考えられる', 'Generate improvement ideas in ECRS order', 'Menyusun ide perbaikan sesuai urutan ECRS'),
      T('なぜなぜ分析・特性要因図・パレート図で原因を絞り込める', 'Narrow down causes with 5-Why, fishbone and Pareto', 'Mempersempit penyebab dengan 5-Why, fishbone, dan Pareto'),
      T('PDCAとポカヨケで改善を定着させる考え方を説明できる', 'Explain how PDCA and poka-yoke make improvements stick', 'Menjelaskan bagaimana PDCA dan poka-yoke membuat perbaikan bertahan'),
    ],
    sections: [
      {
        id: '5s',
        title: T('5Sと3定：すべての改善の土台', '5S and 3-tei: the base of all improvement', '5S dan 3-tei: dasar semua perbaikan'),
        blocks: [
          { type: 'p', text: T(
            '[[5s]]は、職場を「いつでも・誰でも・同じ条件で」働ける状態に保つ活動です。きれいにすることが目的ではなく、**異常がすぐ見え、ムダな探し物やミスが起きない環境**をつくることが目的です。',
            '[[5s]] keeps the workplace in a state where anyone can work under the same conditions at any time. The goal is not just tidiness but **an environment where abnormalities are instantly visible and searching and mistakes do not happen**.',
            '[[5s]] menjaga tempat kerja agar siapa pun dapat bekerja dalam kondisi yang sama kapan saja. Tujuannya bukan sekadar rapi, tetapi **lingkungan di mana keabnormalan langsung terlihat dan tidak ada pencarian sia-sia maupun kesalahan**.'
          ) },
          { type: 'table',
            head: [T('S', 'S', 'S'), T('意味', 'Meaning', 'Arti'), T('具体例', 'Example', 'Contoh')],
            rows: [
              [T('整理（Seiri）', 'Sort (Seiri)', 'Ringkas (Seiri)'), T('要るものと要らないものを分け、要らないものを捨てる', 'Separate needed from unneeded; remove the unneeded', 'Pisahkan yang perlu dan tidak; singkirkan yang tidak perlu'), T('1か月使っていない工具に赤札を貼り撤去', 'Red-tag and remove tools unused for a month', 'Beri label merah dan singkirkan alat yang sebulan tidak dipakai')],
              [T('整頓（Seiton）', 'Set in order (Seiton)', 'Rapi (Seiton)'), T('要るものを、すぐ取り出せるように置き場を決める', 'Give needed items a place where they can be taken at once', 'Tentukan tempat barang yang perlu agar bisa langsung diambil'), T('工具の形に切り抜いた置き台（姿置き）', 'Shadow boards cut to the tool shape', 'Papan bayangan sesuai bentuk alat')],
              [T('清掃（Seiso）', 'Shine (Seiso)', 'Resik (Seiso)'), T('掃除しながら点検し、汚れや不具合を見つける', 'Clean and inspect at the same time to find dirt and faults', 'Membersihkan sambil memeriksa untuk menemukan kotoran dan kerusakan'), T('設備の油漏れを清掃時に発見', 'Finding an oil leak during cleaning', 'Menemukan kebocoran oli saat membersihkan')],
              [T('清潔（Seiketsu）', 'Standardise (Seiketsu)', 'Rawat (Seiketsu)'), T('整理・整頓・清掃を維持するルールを決める', 'Make rules to maintain the first three S', 'Membuat aturan untuk mempertahankan tiga S pertama'), T('5Sチェックシートと担当表', '5S checklist and duty roster', 'Daftar periksa 5S dan jadwal petugas')],
              [T('しつけ（Shitsuke）', 'Sustain (Shitsuke)', 'Rajin (Shitsuke)'), T('決めたルールを守る習慣をつける', 'Build the habit of following the rules', 'Membangun kebiasaan mematuhi aturan'), T('毎日の終業前5分の5S', 'Five-minute 5S before every shift end', '5S lima menit sebelum akhir shift')],
            ],
          },
          { type: 'h', text: T('3定：定位置・定品・定量', '3-tei: fixed position, fixed item, fixed quantity', '3-tei: posisi tetap, barang tetap, jumlah tetap') },
          { type: 'cards', cols: 3, items: [
            { icon: '📍', tone: 'blue', title: T('定位置', 'Fixed position', 'Posisi tetap'), text: T('どこに置くかを決め、住所を表示する', 'Decide where it goes and label the address', 'Tentukan tempatnya dan beri label alamat') },
            { icon: '🏷️', tone: 'green', title: T('定品', 'Fixed item', 'Barang tetap'), text: T('何を置くかを決め、品名を表示する', 'Decide what goes there and label the item', 'Tentukan barang apa dan beri label nama') },
            { icon: '🔢', tone: 'amber', title: T('定量', 'Fixed quantity', 'Jumlah tetap'), text: T('いくつ置くかを決め、上限・下限を表示する', 'Decide how many; mark max and min', 'Tentukan berapa banyak; tandai maks dan min') },
          ] },
          { type: 'p', text: T(
            '[[3tei]]が守られていると、「部品がない」「工具を探す」「数が合わない」が一目でわかり、作業の手順や時間がブレなくなります。',
            'When [[3tei]] is kept, "missing parts", "searching for tools" and "wrong counts" are obvious at a glance, so work sequence and time stop fluctuating.',
            'Jika [[3tei]] dijaga, "part hilang", "mencari alat", dan "jumlah salah" langsung terlihat, sehingga urutan dan waktu kerja tidak lagi berfluktuasi.'
          ) },
          { type: 'callout', kind: 'zeva', title: T('ZEVAとのつながり：5S・3定は「土台」', 'ZEVA connection: 5S & 3-tei are the foundation', 'Kaitan ZEVA: 5S & 3-tei adalah fondasi'), text: T(
            'ZEVAでは、5S・3定・4M標準・標準作業をまとめて「標準化＝すべての土台」と位置づけます。探す・迷うといった管理のムラが残っていると、作業時間のデータがばらつき、信頼できるデータが取れません。最低限の再現性を確保することが、データに基づく改善（好循環）の起点です。',
            'ZEVA groups 5S, 3-tei, 4M standards and standard work as "standardisation — the foundation of everything". If management gaps like searching and hesitation remain, work-time data scatter and cannot be trusted. Securing basic reproducibility is the starting point of data-based improvement (the virtuous cycle).',
            'ZEVA mengelompokkan 5S, 3-tei, standar 4M, dan kerja standar sebagai "standarisasi — fondasi segalanya". Jika celah manajemen seperti mencari dan ragu-ragu masih ada, data waktu kerja tersebar dan tidak dapat dipercaya. Mengamankan reprodusibilitas dasar adalah titik awal perbaikan berbasis data (siklus positif).'
          ) },
        ],
      },
      {
        id: 'standard-work',
        title: T('標準作業', 'Standard work', 'Kerja standar'),
        blocks: [
          { type: 'p', text: T(
            '[[standard-work]]とは、現時点で最も良いやり方（品質・安全・効率）を決め、全員がそのとおりに作業する状態です。「標準なくして改善なし」——基準がなければ、改善したかどうかも判断できません。',
            '[[standard-work]] is the current best way (quality, safety, efficiency) that everyone follows. "Without standards, no improvement" — without a baseline you cannot even tell whether something improved.',
            '[[standard-work]] adalah cara terbaik saat ini (kualitas, keselamatan, efisiensi) yang diikuti semua orang. "Tanpa standar, tidak ada perbaikan" — tanpa acuan, kita bahkan tidak bisa tahu apakah sesuatu membaik.'
          ) },
          { type: 'cards', cols: 3, items: [
            { icon: '⏱', tone: 'navy', title: T('①タクトタイム', '① Takt time', '① Takt time'), text: T('何秒で1個作るべきか（顧客ペース）', 'How many seconds per unit (customer pace)', 'Berapa detik per unit (kecepatan pelanggan)') },
            { icon: '🔢', tone: 'blue', title: T('②作業順序', '② Work sequence', '② Urutan kerja'), text: T('どの順番で、どう動くか', 'In what order and how to move', 'Dalam urutan apa dan bagaimana bergerak') },
            { icon: '📦', tone: 'green', title: T('③標準手持ち', '③ Standard WIP', '③ WIP standar'), text: T('工程内に常に持つ最小限の仕掛品', 'Minimum work-in-process kept in the process', 'Barang setengah jadi minimum dalam proses') },
          ] },
          { type: 'compare',
            left: { tone: 'red', title: T('あいまいな手順書', 'Vague instruction', 'Instruksi samar'), items: [
              T('「ネジをしっかり締める」', '"Tighten the screw firmly"', '"Kencangkan sekrup dengan kuat"'),
              T('「きれいに塗る」', '"Apply neatly"', '"Oleskan dengan rapi"'),
              T('人によって解釈が変わる → 結果がばらつく', 'Interpretation differs by person → results vary', 'Tafsiran berbeda tiap orang → hasil bervariasi'),
            ] },
            right: { tone: 'green', title: T('一通りにしか読めない手順書', 'Instruction with only one interpretation', 'Instruksi dengan satu tafsiran'), items: [
              T('「トルクドライバー（設定値○N·m）で、クリック音が鳴るまで締める」', '"Tighten with the torque driver set to X N·m until it clicks"', '"Kencangkan dengan obeng torsi disetel X N·m hingga berbunyi klik"'),
              T('「写真の範囲に、ハケを1往復させる」', '"One back-and-forth brush stroke over the area in the photo"', '"Satu sapuan kuas bolak-balik pada area di foto"'),
              T('写真・動画・判定基準つき', 'With photos, video and judgement criteria', 'Dengan foto, video, dan kriteria penilaian'),
            ] },
          },
          { type: 'callout', kind: 'note', title: T('標準は変えるためにある', 'Standards exist to be changed', 'Standar ada untuk diubah'), text: T(
            '標準化は創意工夫の否定ではありません。標準は「今の最善」であり、もっと良い方法が見つかったら更新します。「決める → 守る → 改める」の繰り返しです。',
            'Standardisation does not kill creativity. A standard is "today’s best"; when a better way is found, the standard is updated. Decide → follow → revise, again and again.',
            'Standarisasi tidak mematikan kreativitas. Standar adalah "yang terbaik hari ini"; saat cara lebih baik ditemukan, standar diperbarui. Tetapkan → patuhi → revisi, berulang-ulang.'
          ) },
        ],
      },
      {
        id: 'ecrs',
        title: T('ECRS：改善の4つの視点', 'ECRS: four angles for improvement', 'ECRS: empat sudut pandang perbaikan'),
        blocks: [
          { type: 'p', text: T(
            '[[ecrs]]は、作業や工程を見直すときの問いかけの順番です。**なくす（E）ことを最優先**し、なくせないものだけを結合・交換・簡素化します。後ろほど効果は小さく、手間は大きくなりがちです。',
            '[[ecrs]] is the order of questions for reviewing work or processes. **Eliminate first**; only what cannot be eliminated is then combined, rearranged or simplified. Later steps usually give less effect for more effort.',
            '[[ecrs]] adalah urutan pertanyaan untuk meninjau pekerjaan atau proses. **Hilangkan dulu**; hanya yang tidak dapat dihilangkan kemudian digabung, diatur ulang, atau disederhanakan. Langkah berikutnya biasanya memberi efek lebih kecil dengan usaha lebih besar.'
          ) },
          { type: 'table',
            head: [T('順', 'Order', 'Urutan'), T('視点', 'Angle', 'Sudut'), T('問いかけ', 'Question', 'Pertanyaan'), T('例', 'Example', 'Contoh')],
            rows: [
              ['1', T('E：Eliminate（排除）', 'E: Eliminate', 'E: Eliminate (hilangkan)'), T('その作業はなくせないか？', 'Can this work be removed?', 'Bisakah pekerjaan ini dihilangkan?'), T('工程内で品質を保証し、後の検査をなくす', 'Guarantee quality in-process and remove later inspection', 'Jamin kualitas dalam proses dan hilangkan inspeksi setelahnya')],
              ['2', T('C：Combine（結合）', 'C: Combine', 'C: Combine (gabung)'), T('一緒にできないか？', 'Can it be done together?', 'Bisakah dilakukan bersama?'), T('穴あけと面取りを1つの工具で同時に', 'Drill and chamfer at once with one tool', 'Bor dan chamfer sekaligus dengan satu alat')],
              ['3', T('R：Rearrange（交換）', 'R: Rearrange', 'R: Rearrange (atur ulang)'), T('順序や場所を入れ替えられないか？', 'Can order or place be swapped?', 'Bisakah urutan atau tempat ditukar?'), T('段取りの準備を停止前に済ませる（外段取り化）', 'Prepare setup before stopping (external setup)', 'Siapkan setup sebelum berhenti (setup eksternal)')],
              ['4', T('S：Simplify（簡素化）', 'S: Simplify', 'S: Simplify (sederhanakan)'), T('もっと簡単にできないか？', 'Can it be made easier?', 'Bisakah dibuat lebih mudah?'), T('位置決め治具で「合わせる」動作を不要に', 'A locating jig removes the need to align', 'Jig penentu posisi menghilangkan kebutuhan menyelaraskan')],
            ],
          },
          { type: 'widget', name: 'sort-game', props: {
            title: T('この改善はE・C・R・Sのどれ？', 'Is this improvement E, C, R or S?', 'Perbaikan ini E, C, R, atau S?'),
            bins: [
              { id: 'e', label: T('E 排除', 'E Eliminate', 'E Hilangkan'), tone: 'red' },
              { id: 'c', label: T('C 結合', 'C Combine', 'C Gabung'), tone: 'amber' },
              { id: 'r', label: T('R 交換', 'R Rearrange', 'R Atur ulang'), tone: 'blue' },
              { id: 's', label: T('S 簡素化', 'S Simplify', 'S Sederhanakan'), tone: 'green' },
            ],
            items: [
              { bin: 'e', text: T('部品を仮置きしてから取り直す動作をやめ、直接組み付ける', 'Stop placing a part down and picking it up again; assemble directly', 'Berhenti meletakkan part lalu mengambilnya lagi; langsung rakit'), explain: T('仮置きという作業そのものをなくしています。', 'The temporary placing step itself is removed.', 'Langkah meletakkan sementara dihilangkan.') },
              { bin: 'c', text: T('ラベル貼りと外観確認を1回の持ち上げで行う', 'Label and visually check in a single lift', 'Tempel label dan cek visual dalam satu kali angkat'), explain: T('2つの作業を1つの動作にまとめています。', 'Two tasks are merged into one motion.', 'Dua tugas digabung dalam satu gerakan.') },
              { bin: 'r', text: T('よく使う部品棚を作業者の正面に移す', 'Move the most-used parts rack in front of the operator', 'Pindahkan rak part yang paling sering dipakai ke depan operator'), explain: T('置き場所の入れ替えです。', 'This rearranges the location.', 'Ini mengatur ulang lokasi.') },
              { bin: 's', text: T('向きを間違えない形状のガイドをつける', 'Add a guide shaped so orientation cannot be wrong', 'Tambahkan pemandu berbentuk agar orientasi tidak bisa salah'), explain: T('作業を簡単・確実にしています。', 'It makes the work easier and surer.', 'Membuat pekerjaan lebih mudah dan pasti.') },
              { bin: 'e', text: T('不要になった二重チェックの記入を廃止する', 'Abolish a double-check record that is no longer needed', 'Hapus pencatatan cek ganda yang tidak lagi diperlukan'), explain: T('価値を生まない作業を取り除いています。', 'Non-value work is removed.', 'Pekerjaan tidak bernilai dihilangkan.') },
              { bin: 'r', text: T('塗装前に行っていた穴あけを、塗装より前の工程順に入れ替えてキズを防ぐ', 'Swap process order so drilling happens before painting to prevent scratches', 'Tukar urutan proses agar pengeboran sebelum pengecatan untuk mencegah goresan'), explain: T('順序の入れ替えです。', 'Order is rearranged.', 'Urutan diatur ulang.') },
              { bin: 'c', text: T('2人で行っていた運搬を、1回の台車にまとめる', 'Merge two people’s separate trips into one cart run', 'Gabungkan dua perjalanan terpisah menjadi satu kali troli'), explain: T('複数の運搬をまとめています。', 'Multiple transports are combined.', 'Beberapa pengangkutan digabung.') },
              { bin: 's', text: T('ネジ締めを手回しから電動ドライバーに変える', 'Change hand screwing to an electric driver', 'Ganti mengencangkan sekrup manual dengan obeng listrik'), explain: T('作業を楽にする簡素化です。', 'It simplifies by making the work easier.', 'Menyederhanakan dengan membuat kerja lebih mudah.') },
            ],
          } },
        ],
      },
      {
        id: 'cause',
        title: T('原因を突き止める：なぜなぜ・特性要因図・パレート図', 'Finding causes: 5-Why, fishbone, Pareto', 'Mencari penyebab: 5-Why, fishbone, Pareto'),
        blocks: [
          { type: 'h', text: T('パレート図：どこから手をつけるか', 'Pareto chart: where to start', 'Diagram Pareto: mulai dari mana') },
          { type: 'p', text: T(
            '[[pareto]]図は、項目を件数の多い順に棒で並べ、累積比率の折れ線を重ねた図です。「少数の項目が全体の大部分を占める」ことが多く、上位から手をつけると効果が大きくなります。',
            'A [[pareto]] chart sorts items by count as bars and overlays a cumulative percentage line. Often a few items account for most of the total, so attacking the top items gives the biggest effect.',
            'Diagram [[pareto]] mengurutkan item berdasarkan jumlah sebagai batang dan menambahkan garis persentase kumulatif. Sering kali sedikit item menyumbang sebagian besar total, sehingga menangani item teratas memberi efek terbesar.'
          ) },
          { type: 'example',
            title: T('不良100件の内訳（例）', 'Breakdown of 100 defects (illustrative)', 'Rincian 100 cacat (ilustrasi)'),
            steps: [
              T('キズ 45件（45%）→ 累積45%', 'Scratch 45 (45%) → cumulative 45%', 'Goresan 45 (45%) → kumulatif 45%'),
              T('位置ズレ 25件（25%）→ 累積70%', 'Misalignment 25 (25%) → cumulative 70%', 'Posisi bergeser 25 (25%) → kumulatif 70%'),
              T('ネジ欠品 15件（15%）→ 累積85%', 'Missing screw 15 (15%) → cumulative 85%', 'Sekrup hilang 15 (15%) → kumulatif 85%'),
              T('汚れ 10件（10%）→ 累積95%', 'Stain 10 (10%) → cumulative 95%', 'Noda 10 (10%) → kumulatif 95%'),
              T('その他 5件（5%）→ 累積100%', 'Other 5 (5%) → cumulative 100%', 'Lainnya 5 (5%) → kumulatif 100%'),
            ],
            result: T('上位2項目で70%。まず「キズ」と「位置ズレ」の原因分析に集中します。', 'The top two items make up 70%. Focus the cause analysis on scratches and misalignment first.', 'Dua item teratas mencakup 70%. Fokuskan analisis penyebab pada goresan dan posisi bergeser dulu.'),
          },
          { type: 'h', text: T('特性要因図（フィッシュボーン）：原因の候補を洗い出す', 'Fishbone diagram: listing candidate causes', 'Diagram fishbone: mendaftar calon penyebab') },
          { type: 'p', text: T(
            '[[fishbone]]は、右端に「特性（結果・問題）」を書き、太い骨に要因の大分類（4Mなど）、小骨に具体的な要因を書き込む図です。チームで漏れなく原因候補を出すのに使います。',
            'A [[fishbone]] diagram writes the effect (problem) at the head, major cause categories (such as 4M) on the big bones, and specific causes on the small bones. Teams use it to list candidate causes without gaps.',
            'Diagram [[fishbone]] menuliskan akibat (masalah) di kepala, kategori penyebab utama (seperti 4M) di tulang besar, dan penyebab spesifik di tulang kecil. Tim menggunakannya untuk mendaftar calon penyebab tanpa celah.'
          ) },
          { type: 'flow', dir: 'h', nodes: [
            { tone: 'blue', title: T('人', 'Man', 'Manusia'), text: T('手順の理解不足、力加減の差', 'Poor understanding of steps, force differences', 'Kurang paham langkah, perbedaan tenaga') },
            { tone: 'navy', title: T('機械', 'Machine', 'Mesin'), text: T('治具のガタ、ドライバーのトルク低下', 'Jig play, driver torque drop', 'Jig longgar, torsi obeng turun') },
            { tone: 'amber', title: T('材料', 'Material', 'Material'), text: T('ロットによる寸法差', 'Size differences by lot', 'Perbedaan ukuran per lot') },
            { tone: 'green', title: T('方法', 'Method', 'Metode'), text: T('置き方の指定がない', 'No rule on how to place parts', 'Tidak ada aturan cara meletakkan') },
            { tone: 'red', title: T('特性：位置ズレ', 'Effect: misalignment', 'Akibat: posisi bergeser'), text: T('結果（Y）', 'Result (Y)', 'Hasil (Y)') },
          ] },
          { type: 'h', text: T('なぜなぜ分析：真因まで掘り下げる', '5-Why analysis: digging to the root cause', 'Analisis 5-Why: menggali ke akar penyebab') },
          { type: 'p', text: T(
            '[[five-why]]は、起きた事実に対して「なぜ？」を繰り返し、対策を打てる真因までたどり着く方法です。5回は目安で、回数より「事実で確認しながら、仕組みの原因まで行く」ことが大切です。',
            '[[five-why]] repeats "why?" on an observed fact until reaching a root cause you can act on. Five is only a guide; what matters is checking with facts and reaching a system-level cause.',
            '[[five-why]] mengulang "mengapa?" pada fakta yang diamati hingga mencapai akar penyebab yang bisa ditindaklanjuti. Lima hanya panduan; yang penting adalah memeriksa dengan fakta dan mencapai penyebab tingkat sistem.'
          ) },
          { type: 'chain', items: [
            T('なぜ位置ズレした？ → 部品が治具に正しく入っていなかった', 'Why misaligned? → The part was not seated correctly in the jig', 'Mengapa bergeser? → Part tidak duduk dengan benar di jig'),
            T('なぜ正しく入らなかった？ → 部品の向きが逆でも置けてしまう', 'Why not seated? → The part can be placed even when reversed', 'Mengapa tidak duduk? → Part bisa diletakkan walau terbalik'),
            T('なぜ逆でも置ける？ → 治具に向きを制限する形状がない', 'Why can it be reversed? → The jig has no shape that restricts orientation', 'Mengapa bisa terbalik? → Jig tidak punya bentuk yang membatasi orientasi'),
            T('なぜ形状がない？ → 設計時に誤組の検討をしていない', 'Why no such shape? → Mis-assembly was not considered in jig design', 'Mengapa tidak ada? → Salah rakit tidak dipertimbangkan saat desain jig'),
          ], conclusion: T('対策：向きが逆だと入らないガイドを治具に追加（ポカヨケ）し、治具設計チェック項目に「誤組防止」を追加する。', 'Countermeasure: add a guide so a reversed part will not fit (poka-yoke), and add "mis-assembly prevention" to the jig design checklist.', 'Penanggulangan: tambahkan pemandu agar part terbalik tidak masuk (poka-yoke), dan tambahkan "pencegahan salah rakit" ke daftar periksa desain jig.') },
          { type: 'callout', kind: 'warn', title: T('なぜなぜのNG', 'Common 5-Why mistakes', 'Kesalahan umum 5-Why'), text: T(
            '「作業者の不注意」「気が緩んでいた」で止めるのはNGです。人を責めても再発します。「なぜ不注意でもミスが起きる仕組みなのか」まで掘り下げます。',
            'Stopping at "operator carelessness" or "lack of attention" is a mistake. Blaming people does not prevent recurrence. Dig into "why does the system allow a careless moment to become a defect?"',
            'Berhenti pada "operator lalai" atau "kurang perhatian" adalah kesalahan. Menyalahkan orang tidak mencegah terulang. Gali "mengapa sistem membiarkan kelalaian menjadi cacat?"'
          ) },
        ],
      },
      {
        id: 'qc7',
        title: T('QC七つ道具', 'The QC 7 tools', '7 alat QC'),
        blocks: [
          { type: 'p', text: T(
            '[[qc-7-tools]]は、データを使って問題を見える化・分析するための基本の道具セットです。多くは統計の専門知識がなくても使えます。',
            'The [[qc-7-tools]] are the basic set for visualising and analysing problems with data. Most can be used without advanced statistics.',
            '[[qc-7-tools]] adalah perangkat dasar untuk memvisualisasikan dan menganalisis masalah dengan data. Sebagian besar dapat digunakan tanpa statistik lanjutan.'
          ) },
          { type: 'table',
            head: [T('道具', 'Tool', 'Alat'), T('何がわかる', 'What it shows', 'Yang ditunjukkan'), T('学ぶ場所', 'Where taught', 'Dipelajari di')],
            rows: [
              [T('パレート図', 'Pareto chart', 'Diagram Pareto'), T('重点項目（どこから手をつけるか）', 'Priority items (where to start)', 'Item prioritas (mulai dari mana)'), 'ie-10'],
              [T('特性要因図', 'Fishbone diagram', 'Diagram fishbone'), T('原因の候補の全体像', 'Overview of candidate causes', 'Gambaran calon penyebab'), 'ie-10'],
              [T('チェックシート', 'Check sheet', 'Lembar periksa'), T('データを漏れなく簡単に集める', 'Collect data simply and completely', 'Mengumpulkan data dengan mudah dan lengkap'), 'ie-10'],
              [T('ヒストグラム', 'Histogram', 'Histogram'), T('バラツキの形', 'Shape of variation', 'Bentuk variasi'), 'ie-08'],
              [T('散布図', 'Scatter diagram', 'Diagram pencar'), T('2つの量の関係（相関）', 'Relationship between two variables (correlation)', 'Hubungan dua variabel (korelasi)'), 'ie-10'],
              [T('管理図（グラフ）', 'Control chart (graphs)', 'Diagram kontrol (grafik)'), T('工程が安定しているか', 'Whether the process is stable', 'Apakah proses stabil'), 'ie-09'],
              [T('層別', 'Stratification', 'Stratifikasi'), T('条件ごと（人・機械・ロット）に分けて差を見る', 'Split by condition (person, machine, lot) to see differences', 'Pisahkan per kondisi (orang, mesin, lot) untuk melihat perbedaan'), 'ie-08'],
            ],
            caption: T('※流派により「グラフ」「層別」の扱いが異なります', 'Note: some versions list "graphs" or "stratification" differently', 'Catatan: beberapa versi mencantumkan "grafik" atau "stratifikasi" secara berbeda'),
          },
          { type: 'callout', kind: 'tip', title: T('散布図の注意', 'Scatter diagram caution', 'Perhatian diagram pencar'), text: T(
            '「締付トルクと不良率に相関がある」ことは、トルクが原因だという証明ではありません。第3の要因（例：作業者の熟練度）が両方に影響しているかもしれません。相関は仮説のヒントとして使い、実験で確かめます。',
            'A correlation between torque and defect rate does not prove torque is the cause. A third factor (e.g. operator skill) may affect both. Use correlation as a hint for hypotheses and confirm by experiment.',
            'Korelasi antara torsi dan tingkat cacat tidak membuktikan torsi sebagai penyebab. Faktor ketiga (mis. keterampilan operator) mungkin memengaruhi keduanya. Gunakan korelasi sebagai petunjuk hipotesis dan pastikan dengan eksperimen.'
          ) },
        ],
      },
      {
        id: 'pdca',
        title: T('PDCAとポカヨケ：改善を回し、定着させる', 'PDCA and poka-yoke: run and lock in improvement', 'PDCA dan poka-yoke: menjalankan dan mengunci perbaikan'),
        blocks: [
          { type: 'cycle', center: T('PDCA', 'PDCA', 'PDCA'), nodes: [
            { tone: 'blue', title: T('Plan 計画', 'Plan', 'Plan (rencana)'), text: T('目標・原因分析・対策の計画', 'Target, cause analysis, countermeasure plan', 'Target, analisis penyebab, rencana penanggulangan') },
            { tone: 'green', title: T('Do 実行', 'Do', 'Do (lakukan)'), text: T('計画どおり、まず小さく試す', 'Try it as planned, small first', 'Coba sesuai rencana, mulai kecil') },
            { tone: 'amber', title: T('Check 確認', 'Check', 'Check (periksa)'), text: T('データで効果を確かめる', 'Verify the effect with data', 'Pastikan efek dengan data') },
            { tone: 'red', title: T('Act 処置', 'Act', 'Act (tindak)'), text: T('良ければ標準化、ダメなら次の手', 'Standardise if good; otherwise try the next idea', 'Standarkan jika baik; jika tidak, coba ide berikutnya') },
          ] },
          { type: 'p', text: T(
            '[[pdca]]は改善を「やりっぱなし」にしないための基本サイクルです。特にCheckでは、1回の結果ではなく複数回のデータで効果を判断します。バラツキが大きいと、良くなったのか偶然なのか判断できないからです。',
            '[[pdca]] is the basic cycle that stops improvement from being "done and forgotten". In Check, judge by repeated data rather than a single result — with large variation you cannot tell a real improvement from chance.',
            '[[pdca]] adalah siklus dasar agar perbaikan tidak "dikerjakan lalu dilupakan". Pada Check, nilai dengan data berulang, bukan satu hasil — jika variasi besar, perbaikan nyata tidak bisa dibedakan dari kebetulan.'
          ) },
          { type: 'h', text: T('ポカヨケ：うっかりミスを仕組みで防ぐ', 'Poka-yoke: preventing slips by design', 'Poka-yoke: mencegah kelalaian dengan desain') },
          { type: 'p', text: T(
            '[[poka-yoke]]は、人がうっかりしても不良が作れない・流れない仕組みです。「注意しよう」ではなく、形・センサー・順序制御で物理的に防ぎます。',
            '[[poka-yoke]] is a mechanism that makes it impossible to make or pass on a defect even when someone slips. Instead of "be careful", it prevents errors physically with shapes, sensors or sequence control.',
            '[[poka-yoke]] adalah mekanisme yang membuat cacat tidak mungkin dibuat atau diteruskan meski seseorang lalai. Bukan "hati-hati", tetapi mencegah secara fisik dengan bentuk, sensor, atau kontrol urutan.'
          ) },
          { type: 'table',
            head: [T('レベル', 'Level', 'Level'), T('働き', 'Function', 'Fungsi'), T('例', 'Example', 'Contoh')],
            rows: [
              [T('予防（最良）', 'Prevention (best)', 'Pencegahan (terbaik)'), T('ミスそのものができない', 'The mistake cannot be made', 'Kesalahan tidak bisa dilakukan'), T('逆向きでは入らない形状の治具', 'A jig shape that rejects reversed parts', 'Bentuk jig yang menolak part terbalik')],
              [T('停止', 'Stop', 'Henti'), T('ミスが起きたら設備が止まる', 'Equipment stops when a mistake occurs', 'Mesin berhenti saat terjadi kesalahan'), T('ネジ本数が足りないと次工程に送れない', 'Cannot send to next process if screw count is short', 'Tidak bisa dikirim ke proses berikut jika sekrup kurang')],
              [T('警告', 'Warning', 'Peringatan'), T('ミスを音や光で知らせる', 'Signals the mistake with sound or light', 'Memberi tahu kesalahan dengan suara atau lampu'), T('部品の取り忘れでランプが点灯', 'A lamp lights when a part is not picked', 'Lampu menyala jika part tidak diambil')],
            ],
          },
          { type: 'callout', kind: 'zeva', title: T('ZEVAとのつながり', 'ZEVA connection', 'Kaitan dengan ZEVA'), text: T(
            'ZEVAはPDCAに「S（Standardize：標準化）」を加えたPDCA+Sを原則の1つとし、改善結果を必ず新しい標準に還元します。またポカヨケは、ZEVAの「動作安定の原理」の第3法則（拘束とガイド：自由度を制限するとバラツキが構造的に封じられる）の代表的な実践です。',
            'ZEVA adds "S (Standardize)" to PDCA as PDCA+S — one of its principles — so every improvement is fed back into a new standard. Poka-yoke is also a typical application of ZEVA’s third law of motion stability (constraint & guide: limiting freedom structurally blocks variation).',
            'ZEVA menambahkan "S (Standardize)" ke PDCA menjadi PDCA+S — salah satu prinsipnya — sehingga setiap perbaikan dikembalikan ke standar baru. Poka-yoke juga penerapan khas hukum ketiga stabilitas gerakan ZEVA (batasan & pemandu: membatasi kebebasan secara struktural menutup variasi).'
          ) },
        ],
      },
    ],
    keyPoints: [
      T('5S・3定は「異常が見え、ムラが出ない」職場の土台', '5S and 3-tei build a workplace where abnormalities are visible and inconsistency cannot arise', '5S dan 3-tei membangun tempat kerja di mana keabnormalan terlihat dan ketidakkonsistenan tidak muncul'),
      T('標準作業の3要素：タクトタイム・作業順序・標準手持ち', 'Standard work: takt time, work sequence, standard WIP', 'Kerja standar: takt time, urutan kerja, WIP standar'),
      T('ECRSは E（なくす）が最優先', 'In ECRS, Eliminate comes first', 'Dalam ECRS, Eliminate paling utama'),
      T('パレートで重点を決め、特性要因図で候補を出し、なぜなぜで真因へ', 'Pareto to prioritise, fishbone to list candidates, 5-Why to reach the root cause', 'Pareto untuk prioritas, fishbone untuk calon, 5-Why untuk akar penyebab'),
      T('PDCAで回し、標準化とポカヨケで定着させる', 'Run with PDCA; lock in with standardisation and poka-yoke', 'Jalankan dengan PDCA; kunci dengan standarisasi dan poka-yoke'),
    ],
    quiz: [
      { q: T('「要るものと要らないものを分け、要らないものを捨てる」は5Sのどれ？', '"Separate needed from unneeded and remove the unneeded" is which S?', '"Pisahkan yang perlu dan tidak, singkirkan yang tidak perlu" adalah S yang mana?'),
        choices: [T('整理', 'Sort (Seiri)', 'Ringkas (Seiri)'), T('整頓', 'Set in order (Seiton)', 'Rapi (Seiton)'), T('清掃', 'Shine (Seiso)', 'Resik (Seiso)'), T('しつけ', 'Sustain (Shitsuke)', 'Rajin (Shitsuke)')],
        answer: 0, explain: T('整理＝分けて捨てる。整頓＝すぐ取り出せるように置き場を決める。', 'Sort = separate and remove. Set in order = decide places for quick retrieval.', 'Ringkas = pisahkan dan singkirkan. Rapi = tentukan tempat agar cepat diambil.') },
      { q: T('3定に含まれないものは？', 'Which is NOT part of 3-tei?', 'Mana yang BUKAN bagian 3-tei?'),
        choices: [T('定位置', 'Fixed position', 'Posisi tetap'), T('定品', 'Fixed item', 'Barang tetap'), T('定量', 'Fixed quantity', 'Jumlah tetap'), T('定時', 'Fixed time', 'Waktu tetap')],
        answer: 3, explain: T('3定は定位置・定品・定量です。', '3-tei = fixed position, fixed item, fixed quantity.', '3-tei = posisi tetap, barang tetap, jumlah tetap.') },
      { q: T('標準作業の3要素の組み合わせとして正しいのは？', 'Which set is the three elements of standard work?', 'Set mana yang merupakan tiga elemen kerja standar?'),
        choices: [T('タクトタイム・作業順序・標準手持ち', 'Takt time, work sequence, standard WIP', 'Takt time, urutan kerja, WIP standar'), T('品質・コスト・納期', 'Quality, cost, delivery', 'Kualitas, biaya, pengiriman'), T('人・機械・材料', 'Man, machine, material', 'Manusia, mesin, material'), T('整理・整頓・清掃', 'Sort, set in order, shine', 'Ringkas, rapi, resik')],
        answer: 0, explain: T('標準作業はタクトタイム、作業順序、標準手持ちの3要素で構成されます。', 'Standard work consists of takt time, work sequence and standard WIP.', 'Kerja standar terdiri dari takt time, urutan kerja, dan WIP standar.') },
      { q: T('ECRSで最初に検討すべきことは？', 'In ECRS, what should be considered first?', 'Dalam ECRS, apa yang pertama dipertimbangkan?'),
        choices: [T('もっと簡単にできないか', 'Can it be made simpler?', 'Bisakah lebih sederhana?'), T('その作業をなくせないか', 'Can the work be eliminated?', 'Bisakah pekerjaan dihilangkan?'), T('順序を入れ替えられないか', 'Can the order be swapped?', 'Bisakah urutan ditukar?'), T('一緒にできないか', 'Can it be combined?', 'Bisakah digabung?')],
        answer: 1, explain: T('E（排除）が最優先。なくせれば、それ以上の改善は不要です。', 'E (Eliminate) comes first — if it can be removed, no further improvement is needed.', 'E (Eliminate) paling utama — jika bisa dihilangkan, perbaikan lain tidak diperlukan.') },
      { q: T('不良の件数：A 40、B 30、C 15、D 10、E 5。上位2項目の累積比率は？', 'Defects: A 40, B 30, C 15, D 10, E 5. Cumulative share of the top two?', 'Cacat: A 40, B 30, C 15, D 10, E 5. Porsi kumulatif dua teratas?'),
        choices: [T('40%', '40%', '40%'), T('70%', '70%', '70%'), T('85%', '85%', '85%'), T('30%', '30%', '30%')],
        answer: 1, explain: T('合計100件。A+B = 70件 → 70%。', 'Total 100. A + B = 70 → 70%.', 'Total 100. A + B = 70 → 70%.') },
      { q: T('なぜなぜ分析の結論として最も不適切なものは？', 'Which is the worst conclusion for a 5-Why analysis?', 'Mana kesimpulan 5-Why yang paling tidak tepat?'),
        choices: [T('治具に向きを制限する形状がない', 'The jig has no orientation-restricting shape', 'Jig tidak punya bentuk pembatas orientasi'), T('作業者が不注意だった', 'The operator was careless', 'Operator lalai'), T('部品置き場が決まっていない', 'No fixed location for parts', 'Tidak ada lokasi tetap untuk part'), T('手順書に判定基準がない', 'The instruction has no judgement criteria', 'Instruksi tidak memiliki kriteria penilaian')],
        answer: 1, explain: T('人の不注意で止めると対策が「注意する」になり再発します。仕組みの原因まで掘り下げます。', 'Stopping at carelessness leads to "be careful" and recurrence. Dig down to a system cause.', 'Berhenti pada kelalaian menghasilkan "hati-hati" dan terulang. Gali hingga penyebab sistem.') },
      { q: T('ポカヨケのレベルとして最も望ましいのは？', 'Which poka-yoke level is most desirable?', 'Level poka-yoke mana yang paling diinginkan?'),
        choices: [T('ミスをランプで警告する', 'Warn of a mistake with a lamp', 'Peringatkan kesalahan dengan lampu'), T('ミスそのものができない形状にする', 'Make the mistake physically impossible', 'Buat kesalahan tidak mungkin secara fisik'), T('朝礼で注意喚起する', 'Remind people at the morning meeting', 'Mengingatkan di rapat pagi'), T('最終検査を強化する', 'Strengthen final inspection', 'Perketat inspeksi akhir')],
        answer: 1, explain: T('予防型が最良。検査強化は結果（Y）を見張るだけで、原因（X）は変わりません。', 'Prevention is best. Stronger inspection only watches the result (Y) without changing causes (X).', 'Pencegahan paling baik. Inspeksi yang diperketat hanya mengawasi hasil (Y) tanpa mengubah penyebab (X).') },
      { q: T('ZEVAで5S・3定はどのように位置づけられていますか？', 'How does ZEVA position 5S and 3-tei?', 'Bagaimana ZEVA memosisikan 5S dan 3-tei?'),
        choices: [T('オプションの活動', 'An optional activity', 'Aktivitas opsional'), T('標準化という「すべての土台」の一部', 'Part of standardisation — the foundation of everything', 'Bagian standarisasi — fondasi segalanya'), T('デジタル化の代わり', 'A substitute for digitalisation', 'Pengganti digitalisasi'), T('最終段階でのみ行う', 'Done only at the final stage', 'Hanya dilakukan di tahap akhir')],
        answer: 1, explain: T('ZEVAは土台（標準化：5S・3定・4M標準・標準作業）の上に3原則を置きます。再現性がなければ測定も改善も成り立ちません。', 'ZEVA places its three principles on the foundation of standardisation (5S, 3-tei, 4M standards, standard work). Without reproducibility, neither measurement nor improvement works.', 'ZEVA menempatkan tiga prinsipnya di atas fondasi standarisasi (5S, 3-tei, standar 4M, kerja standar). Tanpa reprodusibilitas, pengukuran dan perbaikan tidak berjalan.') },
    ],
  });
})();
