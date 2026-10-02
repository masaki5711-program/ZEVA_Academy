ZA.addModule({
  id: "z3-01",
  track: "z3",
  order: 1,
  minutes: 35,
  icon: "📦",
  level: 3,
  prereq: ["z1-04", "z2-06"],
  title: {
    ja: "理論値の改善手法：4つの箱とECRS",
    en: "Theoretical-Value Improvement Methods: The Four Boxes and ECRS",
    id: "Metode Perbaikan Nilai Teoretis: Empat Kotak dan ECRS"
  },
  summary: {
    ja: "理論値からの逆算で改善シナリオを組み立てる「4つの箱」と、ロスを見える化する分析手法、ECRS・最短・同時・最速による具体的な改善策の立て方を学びます。",
    en: "Learn the Four Boxes for building improvement scenarios backward from the theoretical value, the analysis methods that make losses visible, and how to design concrete countermeasures with ECRS and shortest / simultaneous / fastest.",
    id: "Pelajari Empat Kotak untuk menyusun skenario perbaikan mundur dari nilai teoretis, metode analisis untuk memvisualkan kerugian, serta cara merancang tindakan perbaikan dengan ECRS dan prinsip terpendek / serentak / tercepat."
  },
  objectives: [
    { ja: "4つの箱の各箱に「結論」と「根拠」を書き分けて改善シナリオを作れる", en: "Build an improvement scenario by writing a conclusion and grounds in each of the four boxes", id: "Menyusun skenario perbaikan dengan menulis kesimpulan dan dasar pada setiap kotak" },
    { ja: "ロス構造図・CT分析・価値作業分析・OEE分析の役割を説明できる", en: "Explain the roles of the loss structure chart, CT analysis, value-work analysis and OEE analysis", id: "Menjelaskan peran diagram struktur kerugian, analisis CT, analisis kerja bernilai, dan analisis OEE" },
    { ja: "ECRSを正しい順番（Eが最優先）で適用できる", en: "Apply ECRS in the correct order (E first)", id: "Menerapkan ECRS dalam urutan yang benar (E paling utama)" },
    { ja: "最短・同時・最速の原則で動作レベルの改善案を出せる", en: "Generate motion-level ideas with the shortest / simultaneous / fastest principles", id: "Menghasilkan ide perbaikan tingkat gerakan dengan prinsip terpendek / serentak / tercepat" }
  ],
  sections: [
    {
      id: "thinking",
      title: { ja: "理論値の改善の思考プロセス：仮説と検証", en: "The Theoretical-Value Thinking Process: Hypothesis and Verification", id: "Proses Berpikir Berbasis Nilai Teoretis: Hipotesis dan Verifikasi" },
      blocks: [
        { type: "p", text: {
          ja: "[[theoretical-value]]の改善は、日常生活で私たちが無意識に行っている「目的地を決め、ルートを考え、実行し、結果を評価する」という思考を、製造現場で体系的に実践するものです。その中心にあるのは、**現状からムダを引き算する**のではなく、**理論値というゴールから逆算する**という姿勢です。",
          en: "Improvement based on the [[theoretical-value|theoretical value]] is a systematic, shop-floor version of something we do unconsciously every day: decide the destination, think about the route, act, and evaluate the result. At its core is the attitude of **working backward from the theoretical value**, instead of **subtracting waste from the current state**.",
          id: "Perbaikan berbasis [[theoretical-value|nilai teoretis]] adalah versi sistematis di lantai produksi dari hal yang kita lakukan tanpa sadar setiap hari: menentukan tujuan, memikirkan rute, bertindak, dan mengevaluasi hasilnya. Intinya adalah sikap **menghitung mundur dari nilai teoretis**, bukan **mengurangi pemborosan dari kondisi saat ini**."
        } },
        { type: "flow", dir: "h", nodes: [
          { title: { ja: "① 必要性の認識", en: "① Recognise the need", id: "① Menyadari kebutuhan" }, text: { ja: "なぜ改善が必要か（能力向上・コスト削減など）", en: "Why improve? (capacity, cost, ...)", id: "Mengapa perlu perbaikan? (kapasitas, biaya, ...)" }, tone: "gray" },
          { title: { ja: "② 現状の把握", en: "② Grasp the current state", id: "② Memahami kondisi saat ini" }, text: { ja: "現状の値・理論値・その差（ロス）", en: "Current value, theoretical value, the gap (loss)", id: "Nilai saat ini, nilai teoretis, selisihnya (kerugian)" }, tone: "blue" },
          { title: { ja: "③ ありたい姿の設計", en: "③ Design the desired state", id: "③ Merancang kondisi yang diinginkan" }, text: { ja: "理論値をベンチマークに測定可能な目標を設定", en: "Measurable targets benchmarked on the theoretical value", id: "Target terukur dengan acuan nilai teoretis" }, tone: "green" },
          { title: { ja: "④ シナリオ構築", en: "④ Build the scenario", id: "④ Menyusun skenario" }, text: { ja: "到達するための改善テーマとステップ", en: "Improvement themes and steps to get there", id: "Tema dan langkah perbaikan untuk mencapainya" }, tone: "navy" }
        ] },
        { type: "callout", kind: "key", title: { ja: "5W1Hで仮説を立て、検証する", en: "Hypothesise and verify with 5W1H", id: "Buat hipotesis dan verifikasi dengan 5W1H" }, text: {
          ja: "このプロセス全体を貫くのは、5W1H（なぜ・何を・どこで・いつ・誰が・どのように）で論理的に考え、常に仮説を立てて検証する姿勢です。一度で正解を出す必要はありません。往復するほど精度が上がります。",
          en: "Running through the whole process is the habit of thinking logically with 5W1H (why, what, where, when, who, how) and always forming and testing hypotheses. You do not need the right answer on the first try — each loop sharpens it.",
          id: "Di seluruh proses ini ada kebiasaan berpikir logis dengan 5W1H (mengapa, apa, di mana, kapan, siapa, bagaimana) serta selalu membuat dan menguji hipotesis. Tidak perlu benar pada percobaan pertama — setiap putaran membuatnya lebih tajam."
        } }
      ]
    },
    {
      id: "four-boxes",
      title: { ja: "改善の羅針盤「4つの箱」", en: "The Compass of Improvement: The Four Boxes", id: "Kompas Perbaikan: Empat Kotak" },
      blocks: [
        { type: "p", text: {
          ja: "[[four-boxes]]は、現状分析から「ありたい姿」の設計、実現シナリオまでを論理的に組み立てるフレームワークです。上段が**結果系（値）**、下段が**要因系（やり方）**、左が**現状**、右が**ありたい姿**を表します。",
          en: "The [[four-boxes]] is a framework for logically building everything from current-state analysis to the design of the desired state and the scenario to reach it. The top row is the **result side (values)**, the bottom row the **cause side (ways of working)**; the left column is the **current state**, the right column the **desired state**.",
          id: "[[four-boxes]] adalah kerangka untuk menyusun secara logis mulai dari analisis kondisi saat ini hingga rancangan kondisi yang diinginkan dan skenario untuk mencapainya. Baris atas adalah **sisi hasil (nilai)**, baris bawah **sisi penyebab (cara kerja)**; kolom kiri **kondisi saat ini**, kolom kanan **kondisi yang diinginkan**."
        } },
        { type: "diagram", name: "four-boxes", caption: { ja: "図：4つの箱の構造と思考サイクル", en: "Figure: structure and thinking loop of the Four Boxes", id: "Gambar: struktur dan siklus berpikir Empat Kotak" } },
        { type: "table",
          head: [
            { ja: "箱", en: "Box", id: "Kotak" },
            { ja: "結論（何を書くか）", en: "Conclusion (what to write)", id: "Kesimpulan (apa yang ditulis)" },
            { ja: "根拠（どう裏付けるか）", en: "Grounds (how to support it)", id: "Dasar (bagaimana mendukungnya)" }
          ],
          rows: [
            [ { ja: "① 現状の値（結果系）", en: "① Current value (result)", id: "① Nilai saat ini (hasil)" },
              { ja: "OEE、CT、不良率、人員、在庫など現状のパフォーマンスを定量的に示す", en: "Quantify current performance: OEE, CT, defect rate, headcount, inventory", id: "Kuantifikasi kinerja saat ini: OEE, CT, tingkat cacat, jumlah orang, persediaan" },
              { ja: "理論値（本質機能）を理解し、OEEロスやCTロスを構造的に見える化する", en: "Understand the theoretical value (essential function) and visualise OEE and CT losses structurally", id: "Pahami nilai teoretis (fungsi esensial) dan visualkan kerugian OEE dan CT secara terstruktur" } ],
            [ { ja: "② 現状のやり方（要因系）", en: "② Current way (cause)", id: "② Cara saat ini (penyebab)" },
              { ja: "なぜ①の結果なのか、プロセスの弱点を具体的に書く（例：工程が分断、手待ちが多い）", en: "Describe the weaknesses that cause ①, concretely (e.g. processes split apart, lots of waiting)", id: "Jelaskan kelemahan proses penyebab ① secara konkret (mis. proses terpisah-pisah, banyak menunggu)" },
              { ja: "4M（7要因）の視点でバラツキの要因を分析する", en: "Analyse variation causes from the 4M (seven-factor) viewpoint", id: "Analisis penyebab variasi dari sudut pandang 4M (tujuh faktor)" } ],
            [ { ja: "③ 新たなやり方（要因系）", en: "③ New way (cause)", id: "③ Cara baru (penyebab)" },
              { ja: "②の弱点を克服し④を達成する改善策（例：工程の直結化、1人完結作業）", en: "Countermeasures that overcome ② and achieve ④ (e.g. connect processes, one-person completion)", id: "Tindakan yang mengatasi ② dan mencapai ④ (mis. menyambung proses, satu orang menyelesaikan)" },
              { ja: "理論値から考え、ECRSなどでその策が有効な理由を説明する", en: "Reason from the theoretical value and explain why it works using ECRS etc.", id: "Berpikir dari nilai teoretis dan jelaskan mengapa efektif dengan ECRS dll." } ],
            [ { ja: "④ 目標の値（結果系）", en: "④ Target value (result)", id: "④ Nilai target (hasil)" },
              { ja: "達成したいパフォーマンス目標（例：人員1名削減、リードタイム半減）", en: "Performance targets to achieve (e.g. one fewer operator, half the lead time)", id: "Target kinerja yang ingin dicapai (mis. kurang satu operator, lead time setengahnya)" },
              { ja: "削減されるロスを積み上げ、目標値の妥当性を論理的に示す", en: "Stack up the losses to be removed and show logically that the target is valid", id: "Jumlahkan kerugian yang akan dihilangkan dan tunjukkan secara logis bahwa target itu valid" } ]
          ]
        },
        { type: "callout", kind: "tip", title: { ja: "往復して精度を上げる", en: "Loop back and forth", id: "Bolak-balik untuk mempertajam" }, text: {
          ja: "思考は「②現状のやり方 → ③新たなやり方 → ④目標の値 → ①現状の値と比較」の順に何度も往復します。④の数字が②③の説明と噛み合わなければ、どこかの仮説が甘いサインです。",
          en: "Think in the loop “② current way → ③ new way → ④ target value → compare with ① current value” many times. If the numbers in ④ do not match the story in ② and ③, some hypothesis is still weak.",
          id: "Berpikirlah dalam putaran “② cara saat ini → ③ cara baru → ④ nilai target → bandingkan dengan ① nilai saat ini” berkali-kali. Jika angka di ④ tidak cocok dengan cerita di ② dan ③, ada hipotesis yang masih lemah."
        } },
        { type: "callout", kind: "zeva", title: { ja: "ZEVAでの4つの箱", en: "The Four Boxes in ZEVA", id: "Empat Kotak dalam ZEVA" }, text: {
          ja: "ZEVAでは①の「現状の値」に平均値だけでなく[[v-score]]や[[defect-rate]]などの指標を必ず入れます。バラツキが大きいまま①を書くと、値そのものが信頼できず（[[root-logic]]）、④の目標も根拠を失うからです。",
          en: "In ZEVA, box ① must contain metrics such as [[v-score]] and the [[defect-rate]], not just averages. If ① is written while variation is large, the values themselves are unreliable ([[root-logic]]), and the target in ④ loses its grounds.",
          id: "Dalam ZEVA, kotak ① wajib memuat metrik seperti [[v-score]] dan [[defect-rate]], bukan hanya rata-rata. Jika ① ditulis saat variasi masih besar, nilainya sendiri tidak dapat dipercaya ([[root-logic]]) dan target di ④ kehilangan dasarnya."
        } },
        { type: "widget", name: "four-boxes", props: {} }
      ]
    },
    {
      id: "analysis",
      title: { ja: "ロスを徹底的に見える化する分析手法", en: "Analysis Methods that Make Losses Visible", id: "Metode Analisis untuk Memvisualkan Kerugian" },
      blocks: [
        { type: "p", text: {
          ja: "4つの箱を埋めるには、現状を正確に把握しロスの本質を突き止める必要があります。理論値の考え方では次の4つの分析を組み合わせます。",
          en: "To fill the four boxes you must grasp the current state accurately and pin down the nature of the losses. Theoretical-value thinking combines the following four analyses.",
          id: "Untuk mengisi empat kotak, Anda harus memahami kondisi saat ini dengan akurat dan menemukan hakikat kerugiannya. Pemikiran nilai teoretis menggabungkan empat analisis berikut."
        } },
        { type: "cards", cols: 2, items: [
          { icon: "🧱", tone: "navy", title: { ja: "ロス構造図", en: "Loss structure chart", id: "Diagram struktur kerugian" }, text: {
            ja: "現状の総時間を「価値作業・準価値作業・無価値作業」に分け、無価値作業をさらに**動作・停止・速度・品質・流れ**の5つのロスに分解して構成比を可視化。どのロスから手を付けるとインパクトが大きいか一目で分かります。",
            en: "Splits total actual time into value, semi-value and non-value work, then breaks non-value work into five losses — **motion, stop, speed, quality and flow** — and shows the proportions, so you see at a glance where the biggest impact is.",
            id: "Membagi total waktu aktual menjadi pekerjaan bernilai, semi-bernilai, dan tanpa nilai, lalu memecah pekerjaan tanpa nilai menjadi lima kerugian — **gerakan, henti, kecepatan, kualitas, dan aliran** — serta menampilkan proporsinya, sehingga terlihat sekilas di mana dampak terbesar."
          } },
          { icon: "⏱", tone: "blue", title: { ja: "CT（サイクルタイム）分析", en: "CT (cycle time) analysis", id: "Analisis CT (waktu siklus)" }, text: {
            ja: "作業を要素分解し、各要素を繰り返し計測。合計時間だけでなく要素ごとの**バラツキ**を把握します。ラインバランス分析でネックCTと編成効率も評価します。",
            en: "Break work into elements and time each repeatedly. You capture not just the total but the **variation** of each element. Line-balance analysis adds the neck CT and balance efficiency.",
            id: "Pecah pekerjaan menjadi elemen dan ukur berulang kali. Yang ditangkap bukan hanya total waktu, tetapi juga **variasi** tiap elemen. Analisis line balance menambahkan CT leher botol dan efisiensi keseimbangan."
          } },
          { icon: "🎥", tone: "green", title: { ja: "価値作業分析", en: "Value-work analysis", id: "Analisis kerja bernilai" }, text: {
            ja: "動画をコマ送りで見て、価値作業定義に基づき全動作を価値・準価値・無価値に分類。無価値は「手伸ばし・歩行・持ち替え」などロス軸でさらに細分化します。",
            en: "Watch video frame by frame and classify every motion as value, semi-value or non-value using a value-work definition. Non-value is further split by loss axis: reaching, walking, re-gripping, etc.",
            id: "Tonton video bingkai demi bingkai dan klasifikasikan setiap gerakan menjadi bernilai, semi-bernilai, atau tidak bernilai berdasarkan definisi kerja bernilai. Yang tidak bernilai dipecah lagi per sumbu kerugian: menjangkau, berjalan, memindah pegangan, dll."
          } },
          { icon: "⚙️", tone: "amber", title: { ja: "OEE分析", en: "OEE analysis", id: "Analisis OEE" }, text: {
            ja: "時間稼働率・性能稼働率・良品率に分解し、停止・速度・品質ロスの内訳を深掘り。例えば速度ロスの要因は「張り付き調査」で特定します。",
            en: "Split into availability, performance and yield rate and drill into stop, speed and quality losses. For example, speed-loss causes are found by continuous on-site observation.",
            id: "Dipecah menjadi availability, performance, dan rasio produk baik lalu digali kerugian henti, kecepatan, dan kualitas. Misalnya, penyebab kerugian kecepatan ditemukan dengan pengamatan terus-menerus di lokasi."
          } }
        ] },
        { type: "callout", kind: "zeva", title: { ja: "バラツキは「標準化不足の証拠」", en: "Variation is “evidence of missing standards”", id: "Variasi adalah “bukti standar yang kurang”" }, text: {
          ja: "CT分析で要素ごとの時間がばらつくことは、標準化ができていない、あるいは何らかの問題が潜んでいる証拠です。ZEVAでは平均CTより先にバラツキを見て、[[gpc-h]]の対象を決めます。",
          en: "When element times vary in a CT analysis, it proves the work is not standardised or some problem is hidden. ZEVA looks at variation before the average CT to decide the [[gpc-h]] targets.",
          id: "Jika waktu elemen bervariasi dalam analisis CT, itu membuktikan pekerjaan belum distandarkan atau ada masalah tersembunyi. ZEVA melihat variasi sebelum CT rata-rata untuk menentukan target [[gpc-h]]."
        } },
        { type: "h", text: { ja: "ロス構造図：無価値作業の中にある5つのロス", en: "Loss structure chart: the five losses inside non-value work", id: "Diagram struktur kerugian: lima kerugian di dalam pekerjaan tanpa nilai" } },
        { type: "p", text: {
          ja: "無価値作業は一種類のロスではありません。歩く・探すといった動作のムダだけでなく、止まっている時間、遅い時間、**不良や手直しに使った時間**、工程間で滞留している時間もすべて無価値作業に入ります。準価値作業は[[technical-loss]]、無価値作業は[[management-loss]]にあたります。",
          en: "Non-value work is not a single kind of loss. Besides wasted motions such as walking and searching, it includes time stopped, time running slow, **time spent on defects and repair**, and time stuck between processes. Semi-value work corresponds to [[technical-loss]] and non-value work to [[management-loss]].",
          id: "Pekerjaan tanpa nilai bukan satu jenis kerugian saja. Selain gerakan sia-sia seperti berjalan dan mencari, termasuk juga waktu berhenti, waktu ketika laju produksi melambat, **waktu untuk cacat dan perbaikan**, serta waktu tertahan di antara proses. Kerja semi-bernilai sesuai dengan [[technical-loss]], dan pekerjaan tanpa nilai sesuai dengan [[management-loss]]."
        } },
        { type: "table",
          head: [ { ja: "ロス", en: "Loss", id: "Kerugian" }, { ja: "内容", en: "What it is", id: "Artinya" }, { ja: "例", en: "Examples", id: "Contoh" } ],
          rows: [
            [ { ja: "動作ロス", en: "Motion loss", id: "Kerugian gerakan" }, { ja: "作業中の余分な動作", en: "Extra motions during work", id: "Gerakan berlebih saat bekerja" }, { ja: "歩く、探す、持ち替え、腕を伸ばす", en: "Walking, searching, re-gripping, reaching", id: "Berjalan, mencari, memindah pegangan, menjangkau" } ],
            [ { ja: "停止ロス（Stop）", en: "Stop loss", id: "Kerugian henti (Stop)" }, { ja: "生産していない時間", en: "Time not producing", id: "Waktu tidak berproduksi" }, { ja: "故障・材料待ち・操作ミスなどで実際に止まった時間（故障などは原因X）", en: "Time actually stopped by breakdowns, waiting for material, operating errors, etc. (breakdowns and such are causes X)", id: "Waktu benar-benar berhenti karena kerusakan, menunggu material, salah operasi, dll. (kerusakan dan sejenisnya adalah penyebab X)" } ],
            [ { ja: "速度ロス（Slow）", en: "Speed loss (Slow)", id: "Kerugian kecepatan (Slow)" }, { ja: "生産中だが基準速度に届かない時間", en: "Time producing but below the standard speed", id: "Waktu berproduksi, tetapi di bawah kecepatan standar" }, { ja: "記録上は停止に数えない短い停止（チョコ停）、速度低下、CT遅れ", en: "Short stops not counted as stoppages in the records (minor stops), reduced speed, CT delays", id: "Henti singkat yang dalam catatan tidak dihitung sebagai henti (henti kecil), penurunan kecepatan, keterlambatan CT" } ],
            [ { ja: "品質ロス（Defect）", en: "Quality loss (Defect)", id: "Kerugian kualitas (Defect)" }, { ja: "良品にならない時間", en: "Time that does not yield good product", id: "Waktu yang tidak menghasilkan produk baik" }, { ja: "不良、再加工（Rework）、手直し（Repair）、廃棄（Scrap）", en: "Defects, rework, repair, scrap", id: "Cacat, pengerjaan ulang (Rework), perbaikan (Repair), barang afkir (Scrap)" } ],
            [ { ja: "流れロス（Flow）", en: "Flow loss", id: "Kerugian aliran (Flow)" }, { ja: "工程間でモノや人が止まる・運ばれる時間", en: "Time goods or people are held or moved between processes", id: "Waktu barang atau orang tertahan atau dipindahkan di antara proses" }, { ja: "仕掛、手待ち、滞留、工程間の詰まり、工程間搬送", en: "Work in process, waiting, stagnation, jams and transport between processes", id: "Barang setengah jadi, menunggu, penumpukan, macet dan pengangkutan antar proses" } ]
          ],
          caption: { ja: "ロスは結果Y（止まった・遅れた・良品にならなかった）で分ける。品質ロスの時間は原因にかかわらず無価値作業に含め、原因はXとして別に追う。段取り替えの必要最小限は準価値作業", en: "Classify losses by result Y (stopped, slowed, did not yield good product). Quality-loss time counts as non-value work whatever its cause; trace the cause separately as X. Changeover kept to the necessary minimum is semi-value work", id: "Kelompokkan kerugian menurut hasil Y (berhenti, melambat, tidak menghasilkan produk baik). Waktu kerugian kualitas dihitung sebagai pekerjaan tanpa nilai apa pun penyebabnya; telusuri penyebabnya secara terpisah sebagai X. Setup (pergantian model) yang memang diperlukan secara minimum termasuk kerja semi-bernilai" }
        },
        { type: "callout", kind: "note", title: { ja: "OEEとのつながり", en: "Link to OEE", id: "Kaitan dengan OEE" }, text: {
          ja: "停止・速度・品質の3つのロスは、設備OEEの時間稼働率・性能稼働率・良品率の低下として現れます。人の作業では、動作ロスと流れロスが見えにくいので、動画分析と仕掛・待ちの記録で拾います。",
          en: "The stop, speed and quality losses show up as drops in the availability, performance and yield rate of equipment OEE. In manual work, motion and flow losses are harder to see, so pick them up with video analysis and records of WIP and waiting.",
          id: "Kerugian henti, kecepatan, dan kualitas tampak sebagai penurunan availability, performance, dan rasio produk baik pada OEE peralatan. Pada kerja manual, kerugian gerakan dan aliran lebih sulit terlihat, jadi tangkap dengan analisis video dan catatan barang setengah jadi serta waktu tunggu."
        } },
        { type: "example", title: { ja: "例：ロス構造図の読み方（数値は説明用）", en: "Example: reading a loss structure chart (illustrative numbers)", id: "Contoh: membaca diagram struktur kerugian (angka ilustrasi)" }, steps: [
          { ja: "1サイクル60秒を動画分析：価値作業12秒、準価値作業18秒、無価値作業30秒", en: "Video analysis of one 60 s cycle: value 12 s, semi-value 18 s, non-value 30 s", id: "Analisis video satu siklus 60 dtk: bernilai 12 dtk, semi-bernilai 18 dtk, tidak bernilai 30 dtk" },
          { ja: "価値作業比率 = 12 ÷ 60 = 20%", en: "Value-work ratio = 12 ÷ 60 = 20%", id: "Rasio kerja bernilai = 12 ÷ 60 = 20%" },
          { ja: "現場理論値 = 12 + 18 = 30秒 → 管理ロスは30秒（無価値作業）", en: "Site theoretical value = 12 + 18 = 30 s → management loss 30 s (non-value work)", id: "Nilai teoretis lapangan = 12 + 18 = 30 dtk → kerugian manajemen 30 dtk (pekerjaan tanpa nilai)" },
          { ja: "無価値30秒をロス別に分解：動作ロス18秒（歩行10・探す5・持ち替え3）、品質ロス6秒（手直し）、流れロス4秒（手待ち）、停止ロス2秒（材料待ち）。この工程では速度ロスは0秒", en: "Break the 30 s of non-value work down by loss: motion 18 s (walking 10, searching 5, re-gripping 3), quality 6 s (repair), flow 4 s (waiting), stop 2 s (waiting for material). Speed loss is 0 s in this process", id: "Pecah 30 dtk pekerjaan tanpa nilai per jenis kerugian: gerakan 18 dtk (berjalan 10, mencari 5, memindah pegangan 3), kualitas 6 dtk (perbaikan), aliran 4 dtk (menunggu), henti 2 dtk (menunggu material). Kerugian kecepatan 0 dtk pada proses ini" },
          { ja: "手直しの6秒も無価値作業。「検査で見つけて直しているから問題ない」ではなく、ロスとして数える", en: "The 6 s of repair is non-value work too. Count it as a loss instead of saying “it's fine because inspection catches and fixes it”", id: "Waktu perbaikan 6 dtk juga termasuk pekerjaan tanpa nilai. Hitung sebagai kerugian, bukan “tidak apa-apa karena inspeksi menemukan dan memperbaikinya”" }
        ], result: { ja: "最大のロス（動作ロスの歩行）が③新たなやり方の最初のテーマ。品質ロスは原因Xを追ってGPCにかける", en: "The biggest loss (walking, in motion loss) becomes the first theme for ③ new way; the quality loss goes to GPC by tracing its cause X", id: "Kerugian terbesar (berjalan, dalam kerugian gerakan) menjadi tema pertama untuk ③ cara baru; kerugian kualitas dibawa ke GPC dengan menelusuri penyebab X" } }
      ]
    },
    {
      id: "ecrs",
      title: { ja: "ECRSの原則：Eを最優先に", en: "The ECRS Principle: E Comes First", id: "Prinsip ECRS: E Paling Utama" },
      blocks: [
        { type: "p", text: {
          ja: "[[ecrs]]は作業や工程を改善する4つの視点で、**この順番で検討することが極めて重要**です。理論値の考え方では特にE（廃除）を最優先し、本質機能に立ち返って「その作業は本当に必要か？」を徹底的に問います。簡素化（S）から始めると、本来なくせる作業を一生懸命速くするという落とし穴にはまります。",
          en: "[[ecrs]] gives four viewpoints for improving work and processes, and **the order matters a great deal**. Theoretical-value thinking puts E (Eliminate) first, going back to the essential function and asking relentlessly: “Is this work really needed?” Starting from S (Simplify) traps you into making work faster that could have been removed entirely.",
          id: "[[ecrs]] memberi empat sudut pandang untuk memperbaiki pekerjaan dan proses, dan **urutannya sangat penting**. Pemikiran nilai teoretis menempatkan E (Eliminasi) paling utama, kembali ke fungsi esensial dan terus bertanya: “Apakah pekerjaan ini benar-benar perlu?” Memulai dari S (Sederhanakan) menjebak kita mempercepat pekerjaan yang sebenarnya bisa dihapus."
        } },
        { type: "table",
          head: [ { ja: "順序", en: "Order", id: "Urutan" }, { ja: "原則", en: "Principle", id: "Prinsip" }, { ja: "問い", en: "Question", id: "Pertanyaan" }, { ja: "例", en: "Example", id: "Contoh" } ],
          rows: [
            [ "1", "Eliminate", { ja: "なくせないか？", en: "Can we remove it?", id: "Bisakah dihapus?" }, { ja: "工程内で品質を保証し、後工程の検査作業を廃止する", en: "Guarantee quality inside the process and abolish the downstream inspection step", id: "Menjamin kualitas di dalam proses dan menghapus langkah inspeksi berikutnya" } ],
            [ "2", "Combine", { ja: "一緒にできないか？", en: "Can we combine it?", id: "Bisakah digabung?" }, { ja: "穴あけと面取りを同時に行う複合ツールを使う", en: "Use a combined tool that drills and chamfers at once", id: "Memakai alat gabungan yang mengebor dan membuat chamfer sekaligus" } ],
            [ "3", "Rearrange", { ja: "順序や場所を入れ替えられないか？", en: "Can we change the order or place?", id: "Bisakah urutan atau tempat diubah?" }, { ja: "内段取りを外段取り化する", en: "Convert internal setup into external setup", id: "Mengubah setup internal menjadi setup eksternal" } ],
            [ "4", "Simplify", { ja: "もっと簡単にできないか？", en: "Can we make it simpler?", id: "Bisakah lebih sederhana?" }, { ja: "位置決めを容易にする治具を導入する", en: "Introduce a jig that makes positioning easy", id: "Memasang jig yang memudahkan penentuan posisi" } ]
          ]
        },
        { type: "widget", name: "sort-game", props: {
          title: { ja: "この改善案はECRSのどれ？", en: "Which ECRS type is this idea?", id: "Ide ini termasuk ECRS yang mana?" },
          bins: [
            { id: "e", label: { ja: "E 廃除", en: "E Eliminate", id: "E Eliminasi" }, tone: "red" },
            { id: "c", label: { ja: "C 結合", en: "C Combine", id: "C Gabungkan" }, tone: "amber" },
            { id: "r", label: { ja: "R 交換", en: "R Rearrange", id: "R Susun ulang" }, tone: "blue" },
            { id: "s", label: { ja: "S 簡素化", en: "S Simplify", id: "S Sederhanakan" }, tone: "green" }
          ],
          items: [
            { bin: "e", text: { ja: "部品を一度仮置きしてから取り直す作業をやめ、直接組み付ける", en: "Stop placing a part temporarily and picking it up again; assemble it directly", id: "Berhenti menaruh part sementara lalu mengambilnya lagi; langsung dirakit" }, explain: { ja: "仮置きという動作そのものをなくしているのでEです。", en: "The temporary placement itself disappears, so it is E.", id: "Gerakan menaruh sementara itu sendiri hilang, jadi E." } },
            { bin: "c", text: { ja: "ラベル貼りと外観確認を同じ姿勢・同じタイミングで行う", en: "Do labelling and visual check in the same posture at the same moment", id: "Menempel label dan cek visual dalam posisi dan waktu yang sama" }, explain: { ja: "2つの作業を1つにまとめているのでCです。", en: "Two tasks are merged into one, so it is C.", id: "Dua tugas digabung menjadi satu, jadi C." } },
            { bin: "r", text: { ja: "よく使う工具を作業者の右手側に移し、取り出し順に並べ替える", en: "Move frequently used tools to the operator's right side, in order of use", id: "Memindahkan alat yang sering dipakai ke sisi kanan operator sesuai urutan pakai" }, explain: { ja: "場所と順序の入れ替えなのでRです。", en: "It changes place and order, so it is R.", id: "Mengubah tempat dan urutan, jadi R." } },
            { bin: "s", text: { ja: "ネジの向きを揃えて供給するトレイを使い、つまみやすくする", en: "Use a tray that feeds screws in the same orientation so they are easy to pick", id: "Memakai baki yang menyuplai sekrup dengan arah sama agar mudah diambil" }, explain: { ja: "作業は残るが簡単にしているのでSです。", en: "The task remains but becomes easier, so it is S.", id: "Tugas tetap ada tetapi lebih mudah, jadi S." } },
            { bin: "e", text: { ja: "工程で良品が保証されたので、全数の抜き取り再検査を廃止する", en: "Quality is now guaranteed in-process, so the 100% re-inspection is abolished", id: "Kualitas kini terjamin di dalam proses, jadi inspeksi ulang 100% dihapus" }, explain: { ja: "検査という作業自体をなくしているのでEです。", en: "The inspection task is removed, so it is E.", id: "Tugas inspeksi dihapus, jadi E." } },
            { bin: "r", text: { ja: "段取り替え用の治具を、ライン停止前に準備しておく", en: "Prepare the changeover jig before the line stops", id: "Menyiapkan jig pergantian sebelum lini berhenti" }, explain: { ja: "準備のタイミングを入れ替える（外段取り化）のでRです。", en: "The timing of preparation is rearranged (external setup), so it is R.", id: "Waktu persiapan disusun ulang (setup eksternal), jadi R." } },
            { bin: "c", text: { ja: "2つの隣接工程を1人で完結できるように一体化する", en: "Integrate two adjacent processes so one person can complete them", id: "Menyatukan dua proses berdampingan agar bisa diselesaikan satu orang" }, explain: { ja: "工程の結合なのでCです。", en: "Processes are combined, so it is C.", id: "Proses digabung, jadi C." } },
            { bin: "s", text: { ja: "位置合わせを目で見る代わりに、ガイドピンに当てるだけにする", en: "Replace visual alignment with simply pushing against a guide pin", id: "Mengganti penyelarasan visual dengan cukup mendorong ke pin pemandu" }, explain: { ja: "判断を不要にして簡単にしているのでSです（拘束とガイドの法則とも一致）。", en: "Judgment is no longer needed, making it simpler — S (also matches the constraint & guide law).", id: "Tidak perlu penilaian lagi sehingga lebih sederhana — S (juga sesuai hukum pengekangan & pemandu)." } }
          ]
        } }
      ]
    },
    {
      id: "motion",
      title: { ja: "最短・同時・最速の追求", en: "Pursuing Shortest, Simultaneous, Fastest", id: "Mengejar Terpendek, Serentak, Tercepat" },
      blocks: [
        { type: "p", text: {
          ja: "ECRSで「残す」と決めた作業には、動作レベルで効率化を追求します。ムダ・ムリ・ムラなく、次の3原則を組み合わせます。これらは「動作経済の原則」として体系化されている考え方と同じ方向を向いています。",
          en: "For work that ECRS decides to keep, pursue efficiency at the motion level. Combine the following three principles without muda, muri or mura. They point in the same direction as the classic principles of motion economy.",
          id: "Untuk pekerjaan yang diputuskan tetap ada oleh ECRS, kejar efisiensi pada tingkat gerakan. Gabungkan tiga prinsip berikut tanpa muda, muri, atau mura. Semuanya searah dengan prinsip ekonomi gerakan klasik."
        } },
        { type: "cards", cols: 3, items: [
          { icon: "📏", tone: "blue", title: { ja: "最短", en: "Shortest", id: "Terpendek" }, text: {
            ja: "手元化の徹底。身体負担の少ない価値作業範囲（金・銀・銅エリア）に部品・工具を置き、手伸ばしや歩行をなくす。",
            en: "Bring everything to hand. Place parts and tools in the low-strain value-work zone (gold / silver / bronze areas) and eliminate reaching and walking.",
            id: "Dekatkan semuanya ke tangan. Tempatkan part dan alat di zona kerja bernilai yang ringan (area emas / perak / perunggu) dan hilangkan menjangkau serta berjalan."
          } },
          { icon: "🤲", tone: "green", title: { ja: "同時", en: "Simultaneous", id: "Serentak" }, text: {
            ja: "両手化と人・機械の協調。片手待ちをなくし、機械が加工している間に人は次の準備をする。",
            en: "Use both hands and coordinate people with machines. Remove one-hand idling; while the machine processes, the person prepares the next step.",
            id: "Gunakan dua tangan dan koordinasikan manusia dengan mesin. Hilangkan satu tangan yang menganggur; saat mesin memproses, orang menyiapkan langkah berikutnya."
          } },
          { icon: "⚡", tone: "amber", title: { ja: "最速", en: "Fastest", id: "Tercepat" }, text: {
            ja: "最短と同時を組み合わせ、リズムよく連続した動作にする。急がせるのではなく、自然に速くなる構造を作る。",
            en: "Combine shortest and simultaneous into a rhythmic, continuous motion. Not by rushing people, but by building a structure that is naturally fast.",
            id: "Gabungkan terpendek dan serentak menjadi gerakan berirama dan berkesinambungan. Bukan dengan menyuruh buru-buru, tetapi membangun struktur yang secara alami cepat."
          } }
        ] },
        { type: "table",
          head: [ { ja: "エリア", en: "Zone", id: "Zona" }, { ja: "範囲の目安", en: "Rough range", id: "Perkiraan jangkauan" }, { ja: "置くもの", en: "What to place", id: "Yang ditempatkan" } ],
          rows: [
            [ { ja: "金", en: "Gold", id: "Emas" }, { ja: "肘を体側につけたまま手が届く範囲", en: "Reachable with elbows kept at the sides", id: "Terjangkau dengan siku tetap di samping badan" }, { ja: "毎サイクル使う部品・工具", en: "Parts and tools used every cycle", id: "Komponen dan alat yang dipakai setiap siklus" } ],
            [ { ja: "銀", en: "Silver", id: "Perak" }, { ja: "腕を伸ばせば届く範囲", en: "Reachable by extending the arm", id: "Terjangkau dengan meluruskan lengan" }, { ja: "時々使うもの", en: "Items used occasionally", id: "Barang yang kadang dipakai" } ],
            [ { ja: "銅", en: "Bronze", id: "Perunggu" }, { ja: "上体を動かすと届く範囲", en: "Reachable by moving the upper body", id: "Terjangkau dengan menggerakkan badan atas" }, { ja: "まれに使うもの（できれば置かない）", en: "Rarely used items (avoid if possible)", id: "Barang yang jarang dipakai (hindari jika bisa)" } ]
          ],
          caption: { ja: "価値作業範囲の考え方（目安）", en: "Value-work zone concept (guideline)", id: "Konsep zona kerja bernilai (panduan)" }
        },
        { type: "callout", kind: "warn", title: { ja: "「最速」は作業者を急がせることではない", en: "“Fastest” does not mean rushing operators", id: "“Tercepat” bukan berarti menyuruh operator buru-buru" }, text: {
          ja: "作業者を急がせるのはY（CT）を直接操作するNG行為で、バラツキと品質問題を増やします。ZEVAではX（配置・順序・治具）を変えて結果としてCTが縮む状態を目指します。",
          en: "Rushing operators is a “Don't” that manipulates Y (CT) directly and increases variation and quality problems. ZEVA changes X (layout, sequence, jigs) so that CT shrinks as a result.",
          id: "Menyuruh operator buru-buru adalah larangan karena memanipulasi Y (CT) secara langsung dan menambah variasi serta masalah kualitas. ZEVA mengubah X (tata letak, urutan, jig) sehingga CT memendek sebagai hasilnya."
        } },
        { type: "check",
          q: { ja: "部品箱が作業者の後ろの棚にあり、毎サイクル振り向いて取っている。最初に考えるべき原則は？", en: "The parts box is on a shelf behind the operator, who turns around every cycle. Which principle should you think of first?", id: "Kotak part ada di rak di belakang operator yang berbalik setiap siklus. Prinsip mana yang pertama dipikirkan?" },
          choices: [
            { ja: "最短（手元化）", en: "Shortest (bring to hand)", id: "Terpendek (dekatkan ke tangan)" },
            { ja: "最速（テンポを上げる指導）", en: "Fastest (coach a faster tempo)", id: "Tercepat (latih tempo lebih cepat)" },
            { ja: "同時（両手で振り向く）", en: "Simultaneous (turn with both hands)", id: "Serentak (berbalik dengan dua tangan)" }
          ],
          answer: 0,
          explain: { ja: "振り向き・手伸ばしは距離のロスです。部品を金エリアへ移す「最短」が第一。テンポ指導はYの直接操作になりがちです。", en: "Turning and reaching are distance losses. Moving parts into the gold zone (shortest) comes first. Tempo coaching tends to manipulate Y directly.", id: "Berbalik dan menjangkau adalah kerugian jarak. Memindahkan part ke zona emas (terpendek) yang pertama. Melatih tempo cenderung memanipulasi Y secara langsung." }
        }
      ]
    },
    {
      id: "sustain",
      title: { ja: "改善の定着：4M標準とPDCA+S", en: "Making It Stick: 4M Standards and PDCA+S", id: "Membuat Perbaikan Bertahan: Standar 4M dan PDCA+S" },
      blocks: [
        { type: "p", text: {
          ja: "改善は実行して終わりではありません。得られた最良の状態をMan・Machine・Material・Methodの4Mで「基準書」「手順書」として文書化し（4M標準）、[[pdca-s]]で維持・更新します。これにより誰が作業しても同じ結果が出る状態になり、次の改善の土台になります。",
          en: "Improvement does not end with execution. Document the best state achieved as standards and procedures for Man, Machine, Material and Method (4M standards), then maintain and update it with [[pdca-s]]. This lets anyone get the same result and becomes the foundation of the next improvement.",
          id: "Perbaikan tidak berakhir saat dijalankan. Dokumentasikan kondisi terbaik yang dicapai sebagai standar dan prosedur untuk Man, Machine, Material, dan Method (standar 4M), lalu pertahankan dan perbarui dengan [[pdca-s]]. Dengan begitu siapa pun mendapat hasil yang sama dan ini menjadi fondasi perbaikan berikutnya."
        } },
        { type: "cycle", center: { ja: "決める→守る→改める", en: "Decide → Keep → Revise", id: "Tetapkan → Jaga → Perbarui" }, nodes: [
          { title: { ja: "4つの箱で設計", en: "Design with 4 boxes", id: "Rancang dengan 4 kotak" }, text: { ja: "理論値から逆算", en: "Backward from theoretical value", id: "Mundur dari nilai teoretis" }, tone: "navy" },
          { title: { ja: "ECRS・最短同時最速", en: "ECRS & shortest/simul./fastest", id: "ECRS & terpendek/serentak/tercepat" }, text: { ja: "改善策の実行", en: "Execute countermeasures", id: "Jalankan tindakan" }, tone: "blue" },
          { title: { ja: "効果の確認", en: "Verify the effect", id: "Verifikasi efek" }, text: { ja: "CT・V.Score・OEE", en: "CT, V.Score, OEE", id: "CT, V.Score, OEE" }, tone: "amber" },
          { title: { ja: "4M標準化", en: "4M standardisation", id: "Standardisasi 4M" }, text: { ja: "新しい土台へ還元", en: "Feed back into the foundation", id: "Kembalikan ke fondasi" }, tone: "green" }
        ] },
        { type: "callout", kind: "key", title: { ja: "標準無きところに改善なし", en: "No improvement without standards", id: "Tidak ada perbaikan tanpa standar" }, text: {
          ja: "4つの箱で描いた「④目標の値」は、標準化されて初めて毎日再現されます。Sのない改善は、数週間後に元のやり方へ戻ります。",
          en: "The “④ target value” drawn in the four boxes is reproduced every day only after it is standardised. Improvement without S slides back to the old way within weeks.",
          id: "“④ Nilai target” yang digambar di empat kotak baru terulang setiap hari setelah distandarkan. Perbaikan tanpa S akan kembali ke cara lama dalam beberapa minggu."
        } }
      ]
    }
  ],
  keyPoints: [
    { ja: "4つの箱は「結果系（値）×要因系（やり方）」「現状×ありたい姿」の構造で、各箱に結論と根拠を書く", en: "The four boxes cross result (values) × cause (ways) and current × desired; each box has a conclusion and grounds", id: "Empat kotak menyilangkan hasil (nilai) × penyebab (cara) dan saat ini × diinginkan; tiap kotak berisi kesimpulan dan dasar" },
    { ja: "ロス構造図・CT分析・価値作業分析・OEE分析でロスとバラツキを見える化する", en: "Loss structure chart, CT analysis, value-work analysis and OEE analysis make losses and variation visible", id: "Diagram struktur kerugian, analisis CT, analisis kerja bernilai, dan analisis OEE memvisualkan kerugian dan variasi" },
    { ja: "ECRSは順番が重要。E（廃除）を最優先に「本当に必要か」を問う", en: "Order matters in ECRS: ask “is it really needed?” with E first", id: "Urutan penting dalam ECRS: tanyakan “apakah benar perlu?” dengan E terlebih dahulu" },
    { ja: "残す作業は最短・同時・最速で動作レベルまで磨き、急がせるのではなく構造で速くする", en: "Polish kept work at the motion level with shortest / simultaneous / fastest — fast by structure, not by rushing", id: "Asah pekerjaan yang tersisa pada tingkat gerakan dengan terpendek / serentak / tercepat — cepat karena struktur, bukan karena buru-buru" },
    { ja: "改善結果は4M標準とPDCA+Sで定着させ、次の土台にする", en: "Lock in results with 4M standards and PDCA+S so they become the next foundation", id: "Kunci hasil dengan standar 4M dan PDCA+S agar menjadi fondasi berikutnya" }
  ],
  quiz: [
    { q: { ja: "4つの箱で「要因系」にあたる箱はどれか？", en: "Which boxes are on the “cause” side of the four boxes?", id: "Kotak mana yang berada di sisi “penyebab” dalam empat kotak?" },
      choices: [
        { ja: "①現状の値と④目標の値", en: "① current value and ④ target value", id: "① nilai saat ini dan ④ nilai target" },
        { ja: "②現状のやり方と③新たなやり方", en: "② current way and ③ new way", id: "② cara saat ini dan ③ cara baru" },
        { ja: "①現状の値と②現状のやり方", en: "① current value and ② current way", id: "① nilai saat ini dan ② cara saat ini" },
        { ja: "③新たなやり方と④目標の値", en: "③ new way and ④ target value", id: "③ cara baru dan ④ nilai target" }
      ], answer: 1,
      explain: { ja: "値（①④）が結果系、やり方（②③）が要因系です。①②が現状、③④がありたい姿です。", en: "Values (①④) are results; ways (②③) are causes. ①② are current, ③④ desired.", id: "Nilai (①④) adalah hasil; cara (②③) adalah penyebab. ①② saat ini, ③④ yang diinginkan." } },
    { q: { ja: "④目標の値の「根拠」として最も適切なものは？", en: "What is the most appropriate “grounds” for ④ target value?", id: "Apa “dasar” yang paling tepat untuk ④ nilai target?" },
      choices: [
        { ja: "上司から指示された削減率", en: "A reduction rate ordered by the manager", id: "Tingkat pengurangan yang diperintahkan atasan" },
        { ja: "昨年の実績に10%を上乗せした値", en: "Last year's result plus 10%", id: "Hasil tahun lalu ditambah 10%" },
        { ja: "改善策で削減されるロスを積み上げた値", en: "The sum of the losses removed by the countermeasures", id: "Jumlah kerugian yang dihilangkan oleh tindakan perbaikan" },
        { ja: "他社のベンチマーク値", en: "A competitor benchmark", id: "Benchmark pesaing" }
      ], answer: 2,
      explain: { ja: "目標は削減ロスの積み上げで論理的に説明します。これが引き算思考でなく理論値からの設計です。", en: "Targets are justified logically by stacking up the losses removed — design from the theoretical value, not arbitrary subtraction.", id: "Target dibenarkan secara logis dengan menjumlahkan kerugian yang dihilangkan — perancangan dari nilai teoretis, bukan pengurangan sembarang." } },
    { q: { ja: "ECRSで最優先に検討するのは？", en: "Which ECRS viewpoint should be considered first?", id: "Sudut pandang ECRS mana yang pertama dipertimbangkan?" },
      choices: [ { ja: "Simplify", en: "Simplify", id: "Simplify" }, { ja: "Rearrange", en: "Rearrange", id: "Rearrange" }, { ja: "Combine", en: "Combine", id: "Combine" }, { ja: "Eliminate", en: "Eliminate", id: "Eliminate" } ], answer: 3,
      explain: { ja: "なくせる作業を速くしても意味がないため、E（廃除）を最優先します。", en: "Speeding up work that could be removed is pointless, so E comes first.", id: "Mempercepat pekerjaan yang bisa dihapus tidak ada artinya, jadi E yang pertama." } },
    { q: { ja: "CT分析で要素作業の時間が大きくばらついていた。ZEVAではこれをどう解釈するか？", en: "In a CT analysis, element times vary widely. How does ZEVA interpret this?", id: "Dalam analisis CT, waktu elemen sangat bervariasi. Bagaimana ZEVA menafsirkannya?" },
      choices: [
        { ja: "作業者の個性なので問題ない", en: "It is personal style, so no problem", id: "Itu gaya pribadi, jadi tidak masalah" },
        { ja: "標準化不足や潜在的な問題の証拠", en: "Evidence of missing standardisation or hidden problems", id: "Bukti standardisasi kurang atau masalah tersembunyi" },
        { ja: "平均値を使えば無視できる", en: "It can be ignored by using the average", id: "Bisa diabaikan dengan memakai rata-rata" },
        { ja: "測定回数を減らせば解消する", en: "It disappears if you measure fewer times", id: "Hilang jika pengukuran dikurangi" }
      ], answer: 1,
      explain: { ja: "バラツキは標準化不足の証拠であり、GPC-Hの改善対象です。平均値だけでは判断できません。", en: "Variation is evidence of missing standards and a GPC-H target. The average alone cannot be trusted.", id: "Variasi adalah bukti standar kurang dan target GPC-H. Rata-rata saja tidak dapat dipercaya." } },
    { q: { ja: "1サイクル50秒のうち価値作業10秒、準価値作業15秒。価値作業比率と現場理論値は？", en: "In a 50 s cycle, value work is 10 s and semi-value 15 s. Value-work ratio and site theoretical value?", id: "Dalam siklus 50 dtk, kerja bernilai 10 dtk dan semi-bernilai 15 dtk. Rasio kerja bernilai dan nilai teoretis lapangan?" },
      choices: [
        { ja: "20%、25秒", en: "20%, 25 s", id: "20%, 25 dtk" },
        { ja: "50%、25秒", en: "50%, 25 s", id: "50%, 25 dtk" },
        { ja: "20%、10秒", en: "20%, 10 s", id: "20%, 10 dtk" },
        { ja: "30%、35秒", en: "30%, 35 s", id: "30%, 35 dtk" }
      ], answer: 0,
      explain: { ja: "10÷50=20%。現場理論値は価値＋準価値=25秒で、残り25秒が管理ロスです。", en: "10 ÷ 50 = 20%. Site theoretical value = value + semi-value = 25 s; the other 25 s is management loss.", id: "10 ÷ 50 = 20%. Nilai teoretis lapangan = bernilai + semi = 25 dtk; 25 dtk sisanya kerugian manajemen." } },
    { q: { ja: "「同時」の原則に当てはまる改善はどれか？", en: "Which improvement fits the “simultaneous” principle?", id: "Perbaikan mana yang sesuai prinsip “serentak”?" },
      choices: [
        { ja: "工具を手元に移す", en: "Move tools closer to hand", id: "Memindahkan alat lebih dekat ke tangan" },
        { ja: "機械の自動加工中に次の部品を準備する", en: "Prepare the next part while the machine processes automatically", id: "Menyiapkan part berikutnya saat mesin memproses otomatis" },
        { ja: "作業者に速く動くよう指導する", en: "Coach the operator to move faster", id: "Melatih operator agar bergerak lebih cepat" },
        { ja: "検査工程をなくす", en: "Remove the inspection process", id: "Menghapus proses inspeksi" }
      ], answer: 1,
      explain: { ja: "人と機械の協調で待ちをなくすのが「同時」です。工具を手元へは「最短」、検査廃止はECRSのEです。", en: "Coordinating people and machines to remove waiting is “simultaneous”. Tools to hand is “shortest”; removing inspection is ECRS E.", id: "Koordinasi manusia dan mesin untuk menghilangkan menunggu adalah “serentak”. Alat ke tangan adalah “terpendek”; menghapus inspeksi adalah E dalam ECRS." } },
    { q: { ja: "ZEVAで4つの箱の①現状の値に必ず含めるべきものは？", en: "What must ZEVA include in box ① current value?", id: "Apa yang wajib dimasukkan ZEVA ke kotak ① nilai saat ini?" },
      choices: [
        { ja: "平均値のみ", en: "Averages only", id: "Hanya rata-rata" },
        { ja: "改善策の案", en: "Countermeasure ideas", id: "Ide tindakan perbaikan" },
        { ja: "V.Scoreや不良率などの指標", en: "Metrics such as V.Score and the defect rate", id: "Metrik seperti V.Score dan tingkat cacat" },
        { ja: "目標人員数", en: "Target headcount", id: "Target jumlah orang" }
      ], answer: 2,
      explain: { ja: "バラツキが大きいと値そのものが信頼できないため（根底ロジック）、バラツキ指標を併記します。", en: "With large variation the values themselves are unreliable (root logic), so variation metrics are listed together.", id: "Dengan variasi besar nilai itu sendiri tidak dapat dipercaya (logika dasar), jadi metrik variasi dicantumkan bersama." } }
  ]
});
