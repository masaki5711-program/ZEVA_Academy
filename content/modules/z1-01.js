(function () {
  const T = (ja, en, id) => ({ ja, en, id });

  ZA.addModule({
    id: 'z1-01',
    track: 'z1',
    order: 1,
    minutes: 30,
    icon: '🎯',
    level: 1,
    prereq: ['ie-01', 'ie-08'],
    title: T('ZEVAとは何か', 'What is ZEVA?', 'Apa itu ZEVA?'),
    summary: T(
      'ZEVA（バラツキゼロ生産システム）の定義、構成要素、誕生の背景、そして「ゼロ」の本当の意味を学びます。',
      'Learn the definition of ZEVA (Zero Variation Production System), its components, why it was born, and what "zero" really means.',
      'Pelajari definisi ZEVA (Zero Variation Production System), komponennya, latar belakang kelahirannya, dan arti sebenarnya dari "nol".'
    ),
    objectives: [
      T('ZEVAの正式な定義を自分の言葉で説明できる', 'Explain the formal definition of ZEVA in your own words', 'Menjelaskan definisi resmi ZEVA dengan kata-kata sendiri'),
      T('ZEVAが「改善ツール」ではなく「生産方式」である理由を説明できる', 'Explain why ZEVA is a "production system", not an improvement tool', 'Menjelaskan mengapa ZEVA adalah "sistem produksi", bukan alat perbaikan'),
      T('ZEVAの4つの構成要素と4層構造の関係を説明できる', 'Describe the 4 components of ZEVA and how they relate to the 4-layer structure', 'Menjelaskan 4 komponen ZEVA dan hubungannya dengan struktur 4 lapis'),
      T('「ゼロ」の2段階の定義（制御下→中心狙い）を説明できる', 'Explain the two-stage definition of "zero" (under control → center-aiming)', 'Menjelaskan definisi dua tahap dari "nol" (terkendali → membidik pusat)'),
      T('平均値管理からバラツキ管理へ視点を転換する意味を理解する', 'Understand the shift from managing averages to managing variation', 'Memahami pergeseran dari mengelola rata-rata ke mengelola variasi')
    ],
    sections: [
      {
        id: 'definition',
        title: T('ZEVAの定義', 'Definition of ZEVA', 'Definisi ZEVA'),
        blocks: [
          { type: 'p', text: T(
            '**[[zeva]]**（Zero Variation Production System：バラツキゼロ生産システム）は、[[theoretical-value]]の考え方を**目的基盤**とし、[[gpc]]（Good Process Conditions：良品保証工程条件）を**手法基盤**として、「バラツキの制御」を核心とした次世代生産方式の総称です。',
            '**[[zeva]]** (Zero Variation Production System) is the general name for a next-generation production system that uses the idea of the [[theoretical-value|theoretical value]] as its **purpose foundation**, [[gpc]] (Good Process Conditions) as its **method foundation**, and places "control of variation" at its core.',
            '**[[zeva]]** (Zero Variation Production System) adalah nama umum untuk sistem produksi generasi berikutnya yang menggunakan pemikiran [[theoretical-value|nilai teoretis]] sebagai **fondasi tujuan**, [[gpc]] (Good Process Conditions) sebagai **fondasi metode**, dan menempatkan "pengendalian variasi" sebagai intinya.'
          ) },
          { type: 'callout', kind: 'key', title: T('ひとことで言うと', 'In one sentence', 'Dalam satu kalimat'), text: T(
            '「バラツキの根源を断ち、理論値への収束を、標準化の循環で持続させる」— これがZEVAの核心原則です。',
            '"Cut off the root of variation, converge toward the theoretical value, and sustain it through the cycle of standardization" — this is the core principle of ZEVA.',
            '"Putuskan akar variasi, mendekat ke nilai teoretis, dan pertahankan melalui siklus standardisasi" — inilah prinsip inti ZEVA.'
          ) },
          { type: 'h', text: T('名前に込められた意味', 'What the name means', 'Makna di balik nama') },
          { type: 'cards', cols: 3, items: [
            { icon: '0️⃣', tone: 'navy', title: T('Zero', 'Zero', 'Zero'), text: T('バラツキを「制御下に置き」、理論値に近づけ続ける状態を目指す', 'Aim for a state where variation is under control and keeps converging to the theoretical value', 'Menuju kondisi di mana variasi terkendali dan terus mendekati nilai teoretis') },
            { icon: '〰️', tone: 'blue', title: T('Variation', 'Variation', 'Variation'), text: T('改善の焦点を「ムダ」から「バラツキ（ムラ）」へ移す', 'Shift the focus of improvement from "waste" to "variation (mura)"', 'Menggeser fokus perbaikan dari "pemborosan" ke "variasi (mura)"') },
            { icon: '🏭', tone: 'green', title: T('Production System', 'Production System', 'Production System'), text: T('一時的な活動ではなく、生産全体を設計・運用する「方式」', 'Not a temporary activity but a "system" that designs and runs all of production', 'Bukan kegiatan sementara, melainkan "sistem" yang merancang dan menjalankan seluruh produksi') }
          ] },
          { type: 'h', text: T('ZEVAは「生産方式」であり、改善ツールではない', 'ZEVA is a production system, not an improvement tool', 'ZEVA adalah sistem produksi, bukan alat perbaikan') },
          { type: 'p', text: T(
            '改善ツール（例：なぜなぜ分析、パレート図）は「必要なときに取り出して使う道具」です。一方、ZEVAは統一された思想と方法論にもとづいて、**生産活動全体を設計・運用する枠組み**です。どの課題を、どの速度で、どの手法で改善し、どう定着させるか——その全体の流れを一つの体系として定めています。',
            'Improvement tools (e.g. 5-Why analysis, Pareto charts) are "instruments you pick up when needed". ZEVA, in contrast, is a **framework for designing and operating all production activities** based on a unified philosophy and methodology. It defines, as one system, which problem to improve, at what speed, with what method, and how to sustain the result.',
            'Alat perbaikan (misalnya analisis 5-Why, diagram Pareto) adalah "perkakas yang diambil saat dibutuhkan". Sebaliknya, ZEVA adalah **kerangka untuk merancang dan menjalankan seluruh aktivitas produksi** berdasarkan filosofi dan metodologi yang terpadu. ZEVA menetapkan dalam satu sistem: masalah mana yang diperbaiki, dengan kecepatan apa, dengan metode apa, dan bagaimana hasilnya dipertahankan.'
          ) },
          { type: 'callout', kind: 'example', title: T('たとえ話', 'Analogy', 'Analogi'), text: T(
            '理論値が「目的地（理想の姿）」だとすれば、ZEVAはそこへ確実に到達するための**ナビゲーションシステム**です。目的地を示すだけでなく、道を曇らせる「霧（バラツキ）」を晴らし、揺るがない「道路（再現性）」を築きながら進みます。',
            'If the theoretical value is the "destination (the ideal state)", ZEVA is the **navigation system** that gets you there reliably. It not only shows the destination but also clears the "fog (variation)" that hides the road and builds a solid "road (reproducibility)" as it goes.',
            'Jika nilai teoretis adalah "tujuan (kondisi ideal)", maka ZEVA adalah **sistem navigasi** yang membawa Anda ke sana dengan pasti. ZEVA tidak hanya menunjukkan tujuan, tetapi juga menghilangkan "kabut (variasi)" yang menutupi jalan dan membangun "jalan (reprodusibilitas)" yang kokoh sambil melaju.'
          ) }
        ]
      },
      {
        id: 'background',
        title: T('誕生の背景：なぜZEVAが必要になったのか', 'Background: why ZEVA was needed', 'Latar belakang: mengapa ZEVA dibutuhkan'),
        blocks: [
          { type: 'p', text: T(
            'ZEVAは、人の作業が中心の工場に理論値の考え方を広げようとしたときに直面した**壁**から生まれました。理論値の考え方では「理論値（あるべき姿）と現状のギャップ」で改善対象を決めます。ところが、工程のバラツキが大きい現場では、そのギャップ自体を正しく測れなかったのです。',
            'ZEVA was born from a **wall** encountered when trying to spread theoretical-value thinking into a plant where people do most of the work. Working from the theoretical value means deciding what to improve based on "the gap between the theoretical value (ideal state) and the current state". But on a floor where process variation was large, that gap itself could not be measured correctly.',
            'ZEVA lahir dari **tembok** yang dihadapi saat membawa pemikiran nilai teoretis ke pabrik yang sebagian besar pekerjaannya dilakukan oleh manusia. Cara berpikir ini menentukan target perbaikan berdasarkan "selisih antara nilai teoretis (kondisi ideal) dan kondisi saat ini". Namun, di lini dengan variasi proses yang besar, selisih itu sendiri tidak dapat diukur dengan benar.'
          ) },
          { type: 'cards', cols: 3, items: [
            { icon: '⏱', tone: 'red', title: T('作業のバラツキ', 'Work variation', 'Variasi kerja'), text: T('熟練者と新人で作業時間が倍近く違う。作るたびに品質が微妙に変わる。改善の基準となる「現状値」が安定しない。', 'Experienced and new operators differ by nearly 2× in work time. Quality shifts slightly every time. The "current value" used as the baseline is not stable.', 'Waktu kerja operator berpengalaman dan operator baru berbeda hampir 2×. Kualitas sedikit berubah setiap kali. "Nilai saat ini" sebagai dasar perbaikan tidak stabil.') },
            { icon: '📄', tone: 'amber', title: T('曖昧な手順書', 'Vague instructions', 'Instruksi kerja yang samar'), text: T('「しっかり締める」「きれいに塗る」など解釈が人によって異なる表現。同じ手順書でも結果がバラバラ。', 'Expressions like "tighten firmly" or "apply neatly" are interpreted differently by each person. Same instruction, different results.', 'Ungkapan seperti "kencangkan dengan kuat" atau "oleskan dengan rapi" ditafsirkan berbeda oleh tiap orang. Instruksi sama, hasil berbeda.') },
            { icon: '🧱', tone: 'gray', title: T('標準化の不徹底', 'Weak standardization', 'Standardisasi lemah'), text: T('どこまでが本当のロスなのかを正確に測定・評価できず、改善活動そのものが成り立たない。', 'It is impossible to measure what the real loss is, so improvement activity itself cannot work.', 'Tidak dapat mengukur secara tepat mana kerugian yang sebenarnya, sehingga kegiatan perbaikan itu sendiri tidak berjalan.') }
          ] },
          { type: 'callout', kind: 'warn', title: T('平均が良くても評価できない', 'A good average is not enough', 'Rata-rata yang baik tidak cukup'), text: T(
            '平均値が目標を満たしていても、バラツキが大きければその工程は「評価できない」。今日の平均は明日の平均を保証しないからです。それでも理論値は追い求める——この二つを両立させるためにZEVAは考えられました。',
            'Even if the average meets the target, a process with large variation "cannot be evaluated", because today’s average does not guarantee tomorrow’s. Yet we still pursue the theoretical value — ZEVA was designed to achieve both.',
            'Walaupun rata-rata memenuhi target, proses dengan variasi besar "tidak dapat dievaluasi", karena rata-rata hari ini tidak menjamin rata-rata besok. Namun nilai teoretis tetap dikejar — ZEVA dirancang untuk mencapai keduanya.'
          ) },
          { type: 'quote', text: T(
            '改善以前に、まずすべての前提となる「再現性」を確保しなければならない。そのためにはバラツキこそが悪の根源である。',
            'Before improvement, we must first secure "reproducibility", the premise of everything. For that, variation is the root of all evil.',
            'Sebelum perbaikan, kita harus terlebih dahulu memastikan "reprodusibilitas" yang menjadi dasar segalanya. Untuk itu, variasi adalah akar dari semua masalah.'
          ), cite: T('ZEVA誕生時の結論', 'Conclusion at the birth of ZEVA', 'Kesimpulan saat ZEVA lahir') },
          { type: 'p', text: T(
            '特に、自動化設備の投資対効果が出にくく、人に頼る部分が大きい拠点ほど、バラツキ対策の重要性は増します。ZEVAはこうした現場で、手順書を「誰が読んでも一通りにしか解釈できない」レベルまで具体化することから始まりました。',
            'The more a site depends on people — for example where automation investment does not pay back easily — the more important variation countermeasures become. ZEVA started on such floors by making work instructions concrete enough that "anyone who reads them can interpret them only one way".',
            'Semakin sebuah lokasi bergantung pada manusia — misalnya ketika investasi otomasi sulit balik modal — semakin penting penanggulangan variasi. ZEVA dimulai di lini seperti itu dengan membuat instruksi kerja cukup konkret sehingga "siapa pun yang membacanya hanya dapat menafsirkannya dengan satu cara".'
          ) }
        ]
      },
      {
        id: 'components',
        title: T('ZEVAの4つの構成要素と4層構造', 'The 4 components and the 4-layer structure', '4 komponen dan struktur 4 lapis'),
        blocks: [
          { type: 'p', text: T(
            'ZEVAは次の4つの要素で構成されます。それぞれが異なる役割を持ち、組み合わさることで一つの生産方式として機能します。',
            'ZEVA consists of the following 4 elements. Each has a different role, and together they work as one production system.',
            'ZEVA terdiri dari 4 elemen berikut. Masing-masing memiliki peran berbeda, dan bersama-sama berfungsi sebagai satu sistem produksi.'
          ) },
          { type: 'table',
            head: [T('要素', 'Element', 'Elemen'), T('役割', 'Role', 'Peran'), T('内容', 'Content', 'Isi')],
            rows: [
              [T('理論値', 'Theoretical value', 'Nilai teoretis'), T('目的基盤', 'Purpose foundation', 'Fondasi tujuan'), T('あるべき姿を物理的・技術的に定義する', 'Define the ideal state physically and technically', 'Mendefinisikan kondisi ideal secara fisik dan teknis')],
              [T('GPC制御理論', 'GPC control theory', 'Teori kendali GPC'), T('手法基盤', 'Method foundation', 'Fondasi metode'), T('GPC-M（設備）/ GPC-H（人）の二元構造でバラツキを制御', 'Control variation with the dual structure GPC-M (machine) / GPC-H (human)', 'Mengendalikan variasi dengan struktur ganda GPC-M (mesin) / GPC-H (manusia)')],
              [T('ハイブリッド・トリアージ', 'Hybrid triage', 'Triase hibrida'), T('改善エンジン', 'Improvement engine', 'Mesin perbaikan'), T('課題の性質に応じてQuick GPC / Deep GPCに振り分け', 'Route each issue to Quick GPC or Deep GPC according to its nature', 'Mengarahkan masalah ke Quick GPC atau Deep GPC sesuai sifatnya')],
              [T('デジタル化の段階的実装', 'Staged digitalisation', 'Implementasi digitalisasi bertahap'), T('加速装置', 'Accelerator', 'Akselerator'), T('アナログでも動作し、デジタル化で加速する3段階設計', '3-level design that works in analog and accelerates with digitalisation', 'Desain 3 tingkat yang berjalan secara analog dan dipercepat dengan digitalisasi')]
            ],
            caption: T('ZEVAの構成要素', 'Components of ZEVA', 'Komponen ZEVA')
          },
          { type: 'h', text: T('4層構造：上位層が下位層の行動を決める', '4 layers: upper layers guide lower layers', '4 lapis: lapisan atas mengarahkan lapisan bawah') },
          { type: 'diagram', name: 'four-layers', caption: T('ZEVAの4層構造', 'The ZEVA 4-layer structure', 'Struktur 4 lapis ZEVA') },
          { type: 'layers', items: [
            { label: T('Layer 1', 'Layer 1', 'Layer 1'), tone: 'navy', title: T('理論値 — 目的基盤', 'Theoretical value — purpose foundation', 'Nilai teoretis — fondasi tujuan'), text: T('あるべき姿を定義し、理論値とのギャップで優先順位を決める', 'Defines the ideal and sets priorities by the gap to the theoretical value', 'Mendefinisikan kondisi ideal dan menentukan prioritas berdasarkan selisih dengan nilai teoretis') },
            { label: T('Layer 2', 'Layer 2', 'Layer 2'), tone: 'blue', title: T('ハイブリッド・トリアージ — 振り分け', 'Hybrid triage — routing', 'Triase hibrida — pengarahan'), text: T('課題を Quick GPC（H-T-C-A）か Deep GPC（DMAIC）へ振り分ける', 'Routes issues to Quick GPC (H-T-C-A) or Deep GPC (DMAIC)', 'Mengarahkan masalah ke Quick GPC (H-T-C-A) atau Deep GPC (DMAIC)') },
            { label: T('Layer 3', 'Layer 3', 'Layer 3'), tone: 'green', title: T('GPC制御 — 手法基盤', 'GPC control — method foundation', 'Kendali GPC — fondasi metode'), text: T('GPC-M（設備）とGPC-H（人）でバラツキを制御する', 'Controls variation through GPC-M (machine) and GPC-H (human)', 'Mengendalikan variasi melalui GPC-M (mesin) dan GPC-H (manusia)') },
            { label: T('Layer 4', 'Layer 4', 'Layer 4'), tone: 'amber', title: T('PDCA-S ＋ 7要因 ＋ XY思考 — 実行基盤', 'PDCA-S + 7 factors + XY thinking — execution foundation', 'PDCA-S + 7 faktor + berpikir XY — fondasi pelaksanaan'), text: T('日常運用と、構造的に原因を特定する仕組み', 'Daily operation and the mechanism to identify causes structurally', 'Operasi harian dan mekanisme untuk mengidentifikasi penyebab secara terstruktur') }
          ] },
          { type: 'callout', kind: 'note', title: T('デジタル化は「必須」ではない', 'Digitalisation is not mandatory', 'Digitalisasi tidak wajib'), text: T(
            'ZEVAは紙・ストップウォッチ・ホワイトボードのアナログ環境でも完全に機能します。デジタル化は速度とカバー範囲を上げる「加速装置」です。',
            'ZEVA works fully in an analog environment with paper, stopwatches and whiteboards. Digitalisation is an "accelerator" that raises speed and coverage.',
            'ZEVA berfungsi penuh di lingkungan analog dengan kertas, stopwatch, dan papan tulis. Digitalisasi adalah "akselerator" yang meningkatkan kecepatan dan cakupan.'
          ) }
        ]
      },
      {
        id: 'zero',
        title: T('「ゼロ」の定義', 'Definition of "zero"', 'Definisi "nol"'),
        blocks: [
          { type: 'callout', kind: 'key', title: T('重要', 'Important', 'Penting'), text: T(
            'ZEVAの「ゼロ」は「完全消滅」ではありません。',
            'The "zero" in ZEVA does not mean "complete disappearance".',
            '"Nol" dalam ZEVA tidak berarti "hilang sepenuhnya".'
          ) },
          { type: 'p', text: T(
            '物理的な世界でバラツキを完全にゼロにすることは不可能です。どれほど精密な機械でも、測定を細かくすれば必ず違いが見えます。そこでZEVAでは[[zero-definition]]を次のように定めています：「**バラツキが制御下にあり、良品が保証され、かつ理論値への収束を継続している状態**」。',
            'Making variation literally zero is impossible in the physical world. Even the most precise machine shows differences if you measure finely enough. ZEVA therefore defines [[zero-definition]] as: "**a state in which variation is under control, good products are guaranteed, and convergence toward the theoretical value continues**".',
            'Membuat variasi benar-benar nol tidak mungkin di dunia fisik. Mesin paling presisi pun menunjukkan perbedaan jika diukur cukup teliti. Karena itu ZEVA mendefinisikan [[zero-definition]] sebagai: "**kondisi di mana variasi terkendali, produk baik terjamin, dan pendekatan ke nilai teoretis terus berlanjut**".'
          ) },
          { type: 'flow', dir: 'h', nodes: [
            { tone: 'blue', title: T('第一段階（必達）', 'Stage 1 (must)', 'Tahap 1 (wajib)'), text: T('全パラメータを[[gpc-band]]内に収束させる — Variation Under Control', 'Bring all parameters inside the [[gpc-band]] — Variation Under Control', 'Membawa semua parameter ke dalam [[gpc-band]] — Variation Under Control') },
            { tone: 'green', title: T('第二段階（指向）', 'Stage 2 (aim)', 'Tahap 2 (arah)'), text: T('分布の中心をTarget（理論値）に近づける — [[center-aiming]]', 'Move the center of the distribution toward the Target (theoretical value) — [[center-aiming]]', 'Menggeser pusat distribusi ke Target (nilai teoretis) — [[center-aiming]]') }
          ] },
          { type: 'callout', kind: 'example', title: T('弓道のたとえ', 'Archery analogy', 'Analogi memanah'), text: T(
            '第一段階は「すべての矢を的の中に入れる」こと。第二段階は「矢の集まりの中心を的の真ん中に寄せていく」ことです。的に入らない矢があるうちは、中心を狙う議論をしても意味がありません。',
            'Stage 1 is "getting every arrow onto the target". Stage 2 is "moving the center of the arrow group to the bullseye". While some arrows still miss the target, discussing the bullseye is meaningless.',
            'Tahap 1 adalah "membuat semua anak panah mengenai papan sasaran". Tahap 2 adalah "menggeser pusat kelompok anak panah ke titik tengah". Selama masih ada anak panah yang meleset, membahas titik tengah tidak ada artinya.'
          ) },
          { type: 'check',
            q: T('ZEVAの「ゼロ」の第一段階（必達）はどれですか？', 'Which is Stage 1 (must) of "zero" in ZEVA?', 'Manakah Tahap 1 (wajib) dari "nol" dalam ZEVA?'),
            choices: [
              T('バラツキを物理的に完全消滅させる', 'Eliminate variation completely', 'Menghilangkan variasi sepenuhnya'),
              T('全パラメータをGPCバンド内に収束させる', 'Bring all parameters inside the GPC band', 'Membawa semua parameter ke dalam GPC band'),
              T('平均値を目標値に一致させる', 'Make the average equal the target', 'Membuat rata-rata sama dengan target')
            ],
            answer: 1,
            explain: T('まず「制御下にある（バンド内）」状態を必達とし、そのうえで中心を理論値へ寄せます。完全消滅は目標ではありません。', 'First, being "under control (inside the band)" is required; then the center is moved to the theoretical value. Complete elimination is not the goal.', 'Pertama, kondisi "terkendali (di dalam band)" wajib dicapai; lalu pusat digeser ke nilai teoretis. Menghilangkan sepenuhnya bukan tujuan.')
          }
        ]
      },
      {
        id: 'mindset',
        title: T('視点の転換：平均値からバラツキへ', 'Mindset shift: from average to variation', 'Pergeseran cara pandang: dari rata-rata ke variasi'),
        blocks: [
          { type: 'p', text: T(
            '従来の改善は「ムダ取り」が中心で、評価は結果の**平均値**で行われがちでした。ZEVAは改善の焦点を[[mura]]（バラツキ）へ移し、評価の軸を「平均がどれだけ良いか」から「どれだけ**安定して再現できるか**」へ転換します。',
            'Traditional improvement focused on "removing waste", and evaluation tended to use the **average** of results. ZEVA shifts the focus to [[mura]] (variation) and changes the evaluation axis from "how good the average is" to "how **stably it can be reproduced**".',
            'Perbaikan tradisional berfokus pada "menghilangkan pemborosan", dan evaluasi cenderung memakai **rata-rata** hasil. ZEVA menggeser fokus ke [[mura]] (variasi) dan mengubah sumbu evaluasi dari "seberapa baik rata-ratanya" menjadi "seberapa **stabil dapat direproduksi**".'
          ) },
          { type: 'compare',
            left: { tone: 'gray', title: T('従来の見方', 'Traditional view', 'Cara pandang tradisional'), items: [
              T('平均CTが目標以内ならOK', 'OK if the average CT is within target', 'OK jika CT rata-rata dalam target'),
              T('ムダを見つけて引き算する', 'Find waste and subtract it', 'Temukan pemborosan dan kurangi'),
              T('結果（不良率・OEE）を直接追いかける', 'Chase results (defect rate, OEE) directly', 'Mengejar hasil (tingkat cacat, OEE) secara langsung'),
              T('改善は一過性になりやすい', 'Improvements tend to be temporary', 'Perbaikan cenderung sementara')
            ] },
            right: { tone: 'green', title: T('ZEVAの見方', 'ZEVA view', 'Cara pandang ZEVA'), items: [
              T('平均が良くてもバラツキが大きければ「不安定」＝改善対象', 'Even with a good average, large variation = "unstable" = improvement target', 'Walau rata-rata baik, variasi besar = "tidak stabil" = target perbaikan'),
              T('理論値からの逆算で目標を設計する', 'Design targets backward from the theoretical value', 'Merancang target mundur dari nilai teoretis'),
              T('原因（X）を制御して結果（Y）を変える', 'Control causes (X) to change results (Y)', 'Mengendalikan penyebab (X) untuk mengubah hasil (Y)'),
              T('PDCA+Sで新しい標準として定着させる', 'Sustain as a new standard with PDCA+S', 'Mempertahankan sebagai standar baru dengan PDCA+S')
            ] }
          },
          { type: 'example',
            title: T('同じ平均、違う工程（数値は例示）', 'Same average, different processes (illustrative numbers)', 'Rata-rata sama, proses berbeda (angka ilustrasi)'),
            steps: [
              T('作業者A のCT（秒）：30, 31, 29, 30, 30 → 平均 30秒', 'Operator A CT (s): 30, 31, 29, 30, 30 → average 30 s', 'CT operator A (detik): 30, 31, 29, 30, 30 → rata-rata 30 dtk'),
              T('作業者B のCT（秒）：22, 40, 25, 38, 25 → 平均 30秒', 'Operator B CT (s): 22, 40, 25, 38, 25 → average 30 s', 'CT operator B (detik): 22, 40, 25, 38, 25 → rata-rata 30 dtk'),
              T('平均だけ見れば同じ。しかしBの工程では「次の1台が何秒かかるか」予測できず、後工程は待ちや滞留に振り回されます。', 'By average they are the same. But in B you cannot predict how long the next unit will take, and downstream suffers waiting and piling up.', 'Dari rata-rata keduanya sama. Tetapi pada B Anda tidak dapat memprediksi berapa lama unit berikutnya, dan proses berikutnya terganggu oleh menunggu dan penumpukan.')
            ],
            result: T('ZEVAではBを優先的な改善対象とします。バラツキはV.Score（σ/μ）で定量化します。', 'ZEVA treats B as a priority improvement target. Variation is quantified with V.Score (σ/μ).', 'ZEVA menjadikan B target perbaikan prioritas. Variasi diukur dengan V.Score (σ/μ).')
          },
          { type: 'widget', name: 'data-trust', props: {} },
          { type: 'callout', kind: 'tip', title: T('次のモジュールへ', 'Next module', 'Modul berikutnya'), text: T(
            'なぜバラツキがあると「改善したかどうかさえ判断できない」のか？——その論理（根底ロジック）を次のモジュールで詳しく学びます。',
            'Why does variation make it impossible to even judge whether an improvement worked? The logic behind this (the root logic) is covered in the next module.',
            'Mengapa variasi membuat kita bahkan tidak dapat menilai apakah perbaikan berhasil? Logika di baliknya (logika dasar) dibahas di modul berikutnya.'
          ) }
        ]
      },
      {
        id: 'scope',
        title: T('適用範囲と他の生産理論との関係', 'Scope and relation to other theories', 'Cakupan dan hubungan dengan teori lain'),
        blocks: [
          { type: 'cards', cols: 3, items: [
            { icon: '🧑‍🔧', tone: 'green', title: T('主戦場：人作業中心の工程', 'Main field: people-centered processes', 'Medan utama: proses berbasis manusia'), text: T('手組立ライン、手作業比率が高い工程、スキル差がバラツキの主因となる環境', 'Manual assembly lines, high manual ratio, environments where skill differences cause variation', 'Lini perakitan manual, rasio kerja manual tinggi, lingkungan di mana perbedaan keterampilan menyebabkan variasi') },
            { icon: '🤝', tone: 'blue', title: T('主戦場：人と設備が関わる工程', 'Main field: human + machine', 'Medan utama: manusia + mesin'), text: T('半自動ライン、段取りが頻繁な工程、設備性能が人の操作に依存する環境', 'Semi-automatic lines, frequent changeovers, machine performance depending on operation', 'Lini semi-otomatis, sering pergantian setup, kinerja mesin bergantung pada operasi manusia') },
            { icon: '🤖', tone: 'gray', title: T('対応可能：自動化設備中心', 'Also applicable: automated', 'Juga dapat: otomatis'), text: T('理論値ベースのOEE分析・CT分析・ロス構造図と、GPC-Mのパラメータ範囲制御で対応できる', 'Handled with theoretical-value OEE/CT analysis and loss structure plus GPC-M parameter range control', 'Ditangani dengan analisis OEE/CT berbasis nilai teoretis dan struktur kerugian serta kendali rentang parameter GPC-M') }
          ] },
          { type: 'table',
            head: [T('観点', 'Aspect', 'Aspek'), T('ZEVA', 'ZEVA', 'ZEVA'), T('リーン生産（TPS）', 'Lean (TPS)', 'Lean (TPS)'), T('シックスシグマ', 'Six Sigma', 'Six Sigma')],
            rows: [
              [T('最重視', 'Top priority', 'Prioritas utama'), T('再現性・バラツキの制御', 'Reproducibility, control of variation', 'Reprodusibilitas, pengendalian variasi'), T('フロー効率・ムダ排除', 'Flow efficiency, waste removal', 'Efisiensi aliran, penghapusan pemborosan'), T('統計的厳密性・品質', 'Statistical rigor, quality', 'Ketelitian statistik, kualitas')],
              [T('主な手法', 'Main methods', 'Metode utama'), T('理論値、GPC-M/H、トリアージ、PDCA+S', 'Theoretical value, GPC-M/H, triage, PDCA+S', 'Nilai teoretis, GPC-M/H, triase, PDCA+S'), T('JIT、自働化、かんばん', 'JIT, jidoka, kanban', 'JIT, jidoka, kanban'), T('DMAIC、SPC、DOE', 'DMAIC, SPC, DOE', 'DMAIC, SPC, DOE')],
              [T('特徴', 'Feature', 'Ciri'), T('速度（Quick）と深度（Deep）を使い分ける', 'Switches between speed (Quick) and depth (Deep)', 'Beralih antara kecepatan (Quick) dan kedalaman (Deep)'), T('流れをつくる', 'Creates flow', 'Menciptakan aliran'), T('データで根本原因を特定', 'Finds root causes with data', 'Menemukan akar penyebab dengan data')]
            ],
            caption: T('ZEVAは他理論を否定せず、相互補完的に活用する', 'ZEVA does not reject other theories; it uses them complementarily', 'ZEVA tidak menolak teori lain; ZEVA memanfaatkannya secara saling melengkapi')
          },
          { type: 'callout', kind: 'zeva', title: T('ZEVAの独自性', 'What makes ZEVA unique', 'Keunikan ZEVA'), text: T(
            '①改善のベクトルを「バラツキ制御」の一点に揃える　②現状からの引き算ではなく理論値からの逆算　③課題の性質で改善速度を選ぶ（Quick / Deep）　④アナログでも回り、デジタル化で加速する。',
            '① Aligns all improvement toward one point: controlling variation ② Works backward from the theoretical value instead of subtracting from the current state ③ Chooses improvement speed by the nature of the issue (Quick / Deep) ④ Runs in analog and accelerates with digitalisation.',
            '① Menyelaraskan semua perbaikan ke satu titik: pengendalian variasi ② Bekerja mundur dari nilai teoretis, bukan mengurangi dari kondisi saat ini ③ Memilih kecepatan perbaikan sesuai sifat masalah (Quick / Deep) ④ Berjalan secara analog dan dipercepat dengan digitalisasi.'
          ) }
        ]
      }
    ],
    keyPoints: [
      T('ZEVA＝理論値を目的基盤、GPCを手法基盤とし、バラツキの制御を核心とする「生産方式」', 'ZEVA = a "production system" with the theoretical value as purpose foundation, GPC as method foundation, and variation control at its core', 'ZEVA = "sistem produksi" dengan nilai teoretis sebagai fondasi tujuan, GPC sebagai fondasi metode, dan pengendalian variasi sebagai inti'),
      T('バラツキが大きいと理論値とのギャップを正しく評価できない——これがZEVA誕生のきっかけ', 'With large variation, the gap to the theoretical value cannot be evaluated — this triggered ZEVA', 'Dengan variasi besar, selisih dengan nilai teoretis tidak dapat dievaluasi — inilah pemicu lahirnya ZEVA'),
      T('構成要素：理論値（目的）・GPC（手法）・ハイブリッド・トリアージ（エンジン）・デジタル化（加速装置）', 'Components: theoretical value (purpose), GPC (method), hybrid triage (engine), digitalisation (accelerator)', 'Komponen: nilai teoretis (tujuan), GPC (metode), triase hibrida (mesin), digitalisasi (akselerator)'),
      T('「ゼロ」＝完全消滅ではなく、①バンド内に制御 → ②中心を理論値へ', '"Zero" ≠ complete elimination; ① control within band → ② center toward theoretical value', '"Nol" ≠ hilang sepenuhnya; ① kendali dalam band → ② pusat menuju nilai teoretis'),
      T('平均値ではなく「安定して再現できるか」で評価する', 'Evaluate by "stable reproducibility", not by averages', 'Evaluasi berdasarkan "reprodusibilitas yang stabil", bukan rata-rata')
    ],
    quiz: [
      { q: T('ZEVAの目的基盤はどれですか？', 'What is the purpose foundation of ZEVA?', 'Apa fondasi tujuan ZEVA?'),
        choices: [T('GPC制御理論', 'GPC control theory', 'Teori kendali GPC'), T('理論値', 'Theoretical value', 'Nilai teoretis'), T('デジタル化', 'Digitalisation', 'Digitalisasi'), T('シックスシグマ', 'Six Sigma', 'Six Sigma')],
        answer: 1, explain: T('理論値が目的基盤、GPCが手法基盤です。', 'The theoretical value is the purpose foundation; GPC is the method foundation.', 'Nilai teoretis adalah fondasi tujuan; GPC adalah fondasi metode.') },
      { q: T('ZEVAについて正しい説明はどれですか？', 'Which statement about ZEVA is correct?', 'Pernyataan mana tentang ZEVA yang benar?'),
        choices: [T('必要なときだけ使う改善ツールの一つ', 'One improvement tool used only when needed', 'Salah satu alat perbaikan yang dipakai saat perlu'), T('生産活動全体を設計・運用する生産方式', 'A production system that designs and runs all production activity', 'Sistem produksi yang merancang dan menjalankan seluruh aktivitas produksi'), T('デジタル化プロジェクトの名称', 'The name of a digitalisation project', 'Nama proyek digitalisasi'), T('品質検査の手法', 'A quality inspection method', 'Metode inspeksi kualitas')],
        answer: 1, explain: T('ZEVAは「生産方式」であり、改善ツールや手法ではありません。', 'ZEVA is a "production system", not a tool or technique.', 'ZEVA adalah "sistem produksi", bukan alat atau teknik.') },
      { q: T('ZEVAが生まれた直接のきっかけは？', 'What directly triggered the birth of ZEVA?', 'Apa pemicu langsung lahirnya ZEVA?'),
        choices: [T('設備投資の予算が余った', 'There was extra capital budget', 'Ada kelebihan anggaran investasi'), T('工程のバラツキが大きく、理論値とのギャップを正しく評価できなかった', 'Process variation was large, so the gap to the theoretical value could not be evaluated correctly', 'Variasi proses besar sehingga selisih dengan nilai teoretis tidak dapat dievaluasi dengan benar'), T('統計ソフトが導入された', 'Statistics software was introduced', 'Perangkat lunak statistik diperkenalkan'), T('在庫が不足した', 'Inventory ran short', 'Persediaan kurang')],
        answer: 1, explain: T('バラツキが「現状値」を不安定にし、理論値ベースの改善の推進を困難にしていました。', 'Variation made the "current value" unstable and made theoretical-value-based improvement hard to drive.', 'Variasi membuat "nilai saat ini" tidak stabil dan menyulitkan penerapan perbaikan berbasis nilai teoretis.') },
      { q: T('ZEVAの「ゼロ」の意味として正しいのは？', 'What does "zero" in ZEVA mean?', 'Apa arti "nol" dalam ZEVA?'),
        choices: [T('バラツキが存在しない状態', 'A state with no variation at all', 'Kondisi tanpa variasi sama sekali'), T('不良がゼロ件の日が続く状態', 'A state of consecutive zero-defect days', 'Kondisi hari tanpa cacat berturut-turut'), T('バラツキが制御下にあり、良品が保証され、理論値への収束を継続している状態', 'Variation under control, good products guaranteed, and convergence toward the theoretical value continuing', 'Variasi terkendali, produk baik terjamin, dan pendekatan ke nilai teoretis terus berlanjut'), T('作業者がゼロの自動化工場', 'A fully automated plant with zero operators', 'Pabrik otomatis tanpa operator')],
        answer: 2, explain: T('「ゼロ」は完全消滅ではなく、制御と収束の状態を指します。', '"Zero" is not total elimination but a state of control and convergence.', '"Nol" bukan penghapusan total melainkan kondisi terkendali dan konvergen.') },
      { q: T('4層構造で「課題をQuick GPC / Deep GPCに振り分ける」のはどの層？', 'In the 4-layer structure, which layer routes issues to Quick / Deep GPC?', 'Dalam struktur 4 lapis, lapisan mana yang mengarahkan masalah ke Quick / Deep GPC?'),
        choices: [T('Layer 1', 'Layer 1', 'Layer 1'), T('Layer 2', 'Layer 2', 'Layer 2'), T('Layer 3', 'Layer 3', 'Layer 3'), T('Layer 4', 'Layer 4', 'Layer 4')],
        answer: 1, explain: T('Layer 2 がハイブリッド・トリアージ（振り分け）です。', 'Layer 2 is hybrid triage (routing).', 'Layer 2 adalah triase hibrida (pengarahan).') },
      { q: T('デジタル化の位置づけとして正しいのは？', 'How is digitalisation positioned in ZEVA?', 'Bagaimana posisi digitalisasi dalam ZEVA?'),
        choices: [T('ZEVA導入の必須条件', 'A mandatory prerequisite', 'Prasyarat wajib'), T('アナログでも機能するZEVAを速くする加速装置', 'An accelerator that speeds up ZEVA, which also works in analog', 'Akselerator yang mempercepat ZEVA, yang juga berjalan secara analog'), T('ZEVAの目的そのもの', 'The purpose of ZEVA itself', 'Tujuan ZEVA itu sendiri'), T('人をなくすための手段', 'A means to remove people', 'Sarana untuk menghilangkan manusia')],
        answer: 1, explain: T('デジタル化は加速装置（オプション）です。Level 1（アナログ）でもZEVAは完全に機能します。', 'Digitalisation is an optional accelerator; ZEVA fully works at Level 1 (analog).', 'Digitalisasi adalah akselerator opsional; ZEVA berfungsi penuh pada Level 1 (analog).') },
      { q: T('平均CTが同じ2つの工程。ZEVAが優先的に改善対象とするのは？', 'Two processes with the same average CT. Which does ZEVA prioritize?', 'Dua proses dengan CT rata-rata sama. Mana yang diprioritaskan ZEVA?'),
        choices: [T('バラツキ（σ/μ）が大きい工程', 'The one with larger variation (σ/μ)', 'Yang variasinya (σ/μ) lebih besar'), T('作業者が多い工程', 'The one with more operators', 'Yang operatornya lebih banyak'), T('どちらも改善不要', 'Neither needs improvement', 'Keduanya tidak perlu perbaikan'), T('最後の工程', 'The last process', 'Proses terakhir')],
        answer: 0, explain: T('平均が良くてもバラツキが大きければ「不安定なプロセス」として改善対象です。', 'Even with a good average, large variation means an "unstable process" to improve.', 'Walau rata-rata baik, variasi besar berarti "proses tidak stabil" yang harus diperbaiki.') }
    ]
  });
})();
