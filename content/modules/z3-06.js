ZA.addModule({
  id: "z3-06",
  track: "z3",
  order: 6,
  minutes: 45,
  icon: "🧩",
  level: 3,
  prereq: ["z3-01", "z3-02", "z3-03", "z3-05"],
  title: {
    ja: "総合ケーススタディ",
    en: "Integrated Case Studies",
    id: "Studi Kasus Terpadu"
  },
  summary: {
    ja: "4つの架空ケース（Quick GPC-H、Quick GPC-M、Deep GPC-M、Quick→Deepエスカレーション）で、トリアージから仮説・確認・標準化・PDCA-Sへの引き継ぎまでを意思決定しながら体験します。",
    en: "Four fictional cases (Quick GPC-H, Quick GPC-M, Deep GPC-M, Quick → Deep escalation) let you make the decisions from triage through hypothesis, check and standardisation to the PDCA-S hand-over.",
    id: "Empat kasus fiktif (Quick GPC-H, Quick GPC-M, Deep GPC-M, eskalasi Quick → Deep) memungkinkan Anda mengambil keputusan mulai dari triase, hipotesis, pengecekan, standardisasi, hingga penyerahan ke PDCA-S."
  },
  objectives: [
    { ja: "実際の課題に対してトリアージ4基準を適用し、ルートを判定できる", en: "Apply the four triage criteria to a real-looking issue and choose the route", id: "Menerapkan empat kriteria triase pada masalah yang realistis dan memilih rute" },
    { ja: "GPC-MとGPC-Hのどちらで制御すべきかを判断できる", en: "Decide whether GPC-M or GPC-H should control the issue", id: "Memutuskan apakah masalah dikendalikan dengan GPC-M atau GPC-H" },
    { ja: "エスカレーションのタイミングを見極められる", en: "Recognise when to escalate", id: "Mengenali kapan harus eskalasi" },
    { ja: "改善をPDCA-Sへ引き継ぎ、ナレッジとして残す一連の流れを説明できる", en: "Explain the full flow of handing improvements to PDCA-S and keeping them as knowledge", id: "Menjelaskan alur lengkap menyerahkan perbaikan ke PDCA-S dan menyimpannya sebagai pengetahuan" }
  ],
  sections: [
    {
      id: "howto",
      title: { ja: "ケーススタディの進め方", en: "How to Use These Cases", id: "Cara Menggunakan Kasus Ini" },
      blocks: [
        { type: "p", text: {
          ja: "このモジュールでは、これまで学んだZEVAの要素を一本の流れとしてつなぎます。各ケースは架空の現場を題材にしており、**数値はすべて説明用**です。選択肢を選ぶと、ZEVAの考え方に基づくフィードバックが表示されます。間違えた選択肢のフィードバックこそ学びの宝庫なので、あえて全部選んでみるのもおすすめです。",
          en: "This module ties the ZEVA elements you have learned into a single flow. Each case uses a fictional site and **all numbers are illustrative**. Choosing an option shows feedback based on ZEVA thinking. The feedback on wrong options is where much of the learning is, so try them all.",
          id: "Modul ini menyatukan elemen ZEVA yang sudah dipelajari menjadi satu alur. Setiap kasus memakai lokasi fiktif dan **semua angka bersifat ilustrasi**. Memilih opsi akan menampilkan umpan balik berdasarkan cara berpikir ZEVA. Umpan balik pada opsi yang salah justru banyak pelajarannya, jadi cobalah semuanya."
        } },
        { type: "diagram", name: "cycle-map", caption: { ja: "全ケースに共通する流れ：課題 → トリアージ → H-T-C-A / DMAIC → PDCA-S", en: "Common flow: issue → triage → H-T-C-A / DMAIC → PDCA-S", id: "Alur umum: masalah → triase → H-T-C-A / DMAIC → PDCA-S" } },
        { type: "table",
          head: [ { ja: "ケース", en: "Case", id: "Kasus" }, { ja: "ルート", en: "Route", id: "Rute" }, { ja: "制御", en: "Control", id: "Kendali" }, { ja: "学ぶポイント", en: "Learning point", id: "Poin pembelajaran" } ],
          rows: [
            [ "1", "Quick GPC", "GPC-H", { ja: "人作業のCT改善と暫定標準", en: "Manual CT improvement & temporary standard", id: "Perbaikan CT manual & standar sementara" } ],
            [ "2", "Quick GPC", "GPC-M", { ja: "設備パラメータのトライとGPCバンド更新", en: "Machine parameter trial & GPC band update", id: "Uji parameter mesin & pembaruan GPC band" } ],
            [ "3", "Deep GPC", "GPC-M", { ja: "MSA・統計・DOE・管理図による抜本解決", en: "Root solution with MSA, statistics, DOE, control charts", id: "Solusi akar dengan MSA, statistik, DOE, peta kendali" } ],
            [ "4", "Quick → Deep", "GPC-H → GPC-M", { ja: "エスカレーションと原因の再定義", en: "Escalation and redefining the cause", id: "Eskalasi dan pendefinisian ulang penyebab" } ]
          ]
        },
        { type: "callout", kind: "tip", title: { ja: "各判断で自分に問う3つの質問", en: "Three questions to ask at every decision", id: "Tiga pertanyaan di setiap keputusan" }, text: {
          ja: "① そのデータは信頼できるか？（[[root-logic]]）　② 結果（Y）ではなく原因（X）を触っているか？（[[xy-thinking]]）　③ 成功したらどう標準化し、どう維持するか？（[[pdca-s]]）",
          en: "① Is the data reliable? ([[root-logic]]) ② Am I touching the cause (X), not the result (Y)? ([[xy-thinking]]) ③ If it works, how will it be standardised and maintained? ([[pdca-s]])",
          id: "① Apakah datanya andal? ([[root-logic]]) ② Apakah saya menyentuh penyebab (X), bukan hasil (Y)? ([[xy-thinking]]) ③ Jika berhasil, bagaimana distandarkan dan dipertahankan? ([[pdca-s]])"
        } }
      ]
    },
    {
      id: "case1",
      title: { ja: "ケース1：手組立工程のCTバラツキ（Quick GPC × GPC-H）", en: "Case 1: CT Variation in Manual Assembly (Quick GPC × GPC-H)", id: "Kasus 1: Variasi CT di Perakitan Manual (Quick GPC × GPC-H)" },
      blocks: [
        { type: "widget", name: "scenario", props: {
          title: { ja: "ケース1：部品の取り出しに時間がかかる", en: "Case 1: Picking parts takes too long", id: "Kasus 1: Mengambil part terlalu lama" },
          intro: { ja: "小型製品の手組立工程。標準CTは40秒ですが、10サイクル計測すると38〜52秒とばらつき、V.Scoreは0.11でした。観察すると、作業者は左奥の部品箱に毎回手を伸ばし、ときどき持ち替えています。班長は「部品箱を右手前に移せば速くなるはず」と考えています。", en: "A manual assembly process for a small product. Standard CT is 40 s, but 10 timed cycles range from 38 to 52 s, V.Score 0.11. Observation shows the operator reaches to a parts box at the far left every cycle and sometimes re-grips. The team leader thinks “moving the box to the front right should make it faster”.", id: "Proses perakitan manual produk kecil. CT standar 40 dtk, tetapi 10 siklus terukur antara 38 dan 52 dtk, V.Score 0,11. Pengamatan menunjukkan operator menjangkau kotak part di kiri jauh setiap siklus dan kadang memindah pegangan. Ketua tim berpikir “memindahkan kotak ke kanan depan akan membuatnya lebih cepat”." },
          steps: [
            { prompt: { ja: "トリアージの判定は？", en: "What is the triage decision?", id: "Apa keputusan triase?" }, choices: [
              { text: { ja: "Quick GPC：原因仮説あり（配置）・低リスク・単変量・データはすぐ取れる", en: "Quick GPC: hypothesis exists (layout), low risk, single variable, data available now", id: "Quick GPC: ada hipotesis (tata letak), risiko rendah, variabel tunggal, data tersedia sekarang" }, correct: true, feedback: { ja: "正解。4ステップすべてQuick側です。", en: "Correct. All four steps point to Quick.", id: "Benar. Keempat langkah mengarah ke Quick." } },
              { text: { ja: "Deep GPC：V.Scoreが0.1を超えているから", en: "Deep GPC: because V.Score exceeds 0.1", id: "Deep GPC: karena V.Score melebihi 0,1" }, correct: false, feedback: { ja: "指標の値だけではルートは決まりません。原因の見当・変数・リスク・データの4基準で判定します。", en: "A metric value alone does not decide the route; use the four criteria.", id: "Nilai metrik saja tidak menentukan rute; gunakan empat kriteria." } }
            ] },
            { prompt: { ja: "GPC-MとGPC-Hのどちらで扱う？", en: "GPC-M or GPC-H?", id: "GPC-M atau GPC-H?" }, choices: [
              { text: { ja: "GPC-H：人の動作と作業方法のバラツキ", en: "GPC-H: variation in human motion and work method", id: "GPC-H: variasi gerakan manusia dan metode kerja" }, correct: true, feedback: { ja: "正解。ECRSと動作安定の原理（距離・変位の法則）を使います。", en: "Correct. Use ECRS and motion stability (distance/displacement law).", id: "Benar. Gunakan ECRS dan stabilitas gerakan (hukum jarak/perpindahan)." } },
              { text: { ja: "GPC-M：部品箱は設備だから", en: "GPC-M: the parts box is equipment", id: "GPC-M: kotak part adalah peralatan" }, correct: false, feedback: { ja: "バラツキの源泉は手伸ばし・持ち替えという人の動作です。", en: "The source is human motion — reaching and re-gripping.", id: "Sumbernya adalah gerakan manusia — menjangkau dan memindah pegangan." } }
            ] },
            { prompt: { ja: "仮説の書き方として最も良いのは？", en: "Which is the best hypothesis?", id: "Hipotesis mana yang terbaik?" }, choices: [
              { text: { ja: "「作業者がもっと集中すればCTが安定するはず」", en: "“If the operator concentrates more, CT will stabilise.”", id: "“Jika operator lebih fokus, CT akan stabil.”" }, correct: false, feedback: { ja: "精神論で、変えるX・現在値・変更値が不明です。", en: "It is willpower; the X, current value and new value are unclear.", id: "Ini semangat saja; X, nilai sekarang, dan nilai baru tidak jelas." } },
              { text: { ja: "「部品箱の位置を左奥（約50cm）から右手前（約25cm）に変更すれば、取り時間が短縮しCTのバラツキが減るはず」", en: "“If the parts box moves from far left (~50 cm) to front right (~25 cm), picking time shortens and CT variation falls.”", id: "“Jika kotak part dipindah dari kiri jauh (~50 cm) ke kanan depan (~25 cm), waktu ambil memendek dan variasi CT turun.”" }, correct: true, feedback: { ja: "正解。テンプレート「[対象]を[現在値]から[変更値]に変更すれば[結果]」に沿っています。", en: "Correct. It follows the template “change [target] from [current] to [new] to get [result]”.", id: "Benar. Sesuai templat “ubah [target] dari [nilai sekarang] ke [nilai baru] untuk mendapat [hasil]”." } }
            ] },
            { prompt: { ja: "5サイクル試行し、ストップウォッチでCTが平均2秒短縮、最大値も48秒→42秒に。次のアクションは？", en: "After 5 trial cycles, stopwatch shows CT 2 s shorter on average and the max fell from 48 to 42 s. Next action?", id: "Setelah 5 siklus uji, stopwatch menunjukkan CT rata-rata 2 dtk lebih pendek dan maksimum turun dari 48 ke 42 dtk. Tindakan berikutnya?" }, choices: [
              { text: { ja: "暫定標準として即日適用し、ナレッジベースに写真1枚＋コメントで登録。30日以内にWIを正式改訂", en: "Apply as a temporary standard the same day, register a photo + comment in the knowledge base, formally revise the WI within 30 days", id: "Terapkan sebagai standar sementara hari itu juga, daftarkan foto + komentar di basis pengetahuan, revisi WI resmi dalam 30 hari" }, correct: true, feedback: { ja: "正解。Quick GPCのActionそのものです。", en: "Correct — exactly the Quick GPC Action.", id: "Benar — persis Action Quick GPC." } },
              { text: { ja: "統計的に有意か検定するため、さらに1ヶ月データを取る", en: "Collect another month of data to test statistical significance", id: "Kumpulkan data sebulan lagi untuk uji signifikansi statistik" }, correct: false, feedback: { ja: "Quick GPCのCheckは「良くなったか」の二択に近い判定で、統計検定は不要です。", en: "Quick GPC Check is a near-binary “did it improve?” judgment; no statistical test needed.", id: "Check Quick GPC adalah penilaian hampir biner “apakah membaik?”; tidak perlu uji statistik." } }
            ] },
            { prompt: { ja: "1週間後、WIを正式改訂した。その後は？", en: "One week later the WI is formally revised. What next?", id: "Seminggu kemudian WI direvisi resmi. Selanjutnya?" }, choices: [
              { text: { ja: "PDCA-Sへ移行：簡易チェック項目を設定し、V.Score・CT達成率を定期確認", en: "Move to PDCA-S: set simple check items and review V.Score and CT achievement regularly", id: "Beralih ke PDCA-S: tetapkan item cek sederhana dan tinjau V.Score serta CT achievement secara rutin" }, correct: true, feedback: { ja: "正解。改善（H-T-C-A）から維持（PDCA-S）へ引き継ぎます。", en: "Correct. Hand over from improvement (H-T-C-A) to maintenance (PDCA-S).", id: "Benar. Serahkan dari perbaikan (H-T-C-A) ke pemeliharaan (PDCA-S)." } },
              { text: { ja: "改善完了なので計測をやめる", en: "Improvement is done, so stop measuring", id: "Perbaikan selesai, jadi berhenti mengukur" }, correct: false, feedback: { ja: "監視しなければ後戻りに気づけません。", en: "Without monitoring you will not notice backsliding.", id: "Tanpa pemantauan, kemunduran tidak akan terdeteksi." } }
            ] }
          ],
          outro: { ja: "所要期間は約1日（正式改訂まで1週間）。小さなトライの量産が現場の信頼と改善文化を育てます。", en: "About one day (one week to formal revision). Mass-producing small trials grows trust and an improvement culture.", id: "Sekitar satu hari (seminggu hingga revisi resmi). Memperbanyak uji kecil menumbuhkan kepercayaan dan budaya perbaikan." }
        } }
      ]
    },
    {
      id: "case2",
      title: { ja: "ケース2：はんだ付け温度（Quick GPC × GPC-M）", en: "Case 2: Soldering Temperature (Quick GPC × GPC-M)", id: "Kasus 2: Suhu Penyolderan (Quick GPC × GPC-M)" },
      blocks: [
        { type: "widget", name: "scenario", props: {
          title: { ja: "ケース2：はんだ付け不良が増えた", en: "Case 2: Soldering defects are increasing", id: "Kasus 2: Cacat solder meningkat" },
          intro: { ja: "はんだ付け工程で溶融不足による不良が先週から増えています。技術者は「材料が変わってから溶けにくくなった。温度設定を5℃上げれば安定するはず」と見当をつけています。現在の設定は現行GPCバンドの下限寄りで、5℃上げてもバンドの上限内です。", en: "In a soldering process, defects from insufficient melting have increased since last week. The engineer suspects “since the material changed it melts less easily; raising the setting by 5 °C should stabilise it”. The current setting is near the lower edge of the GPC band, and +5 °C stays within the upper limit.", id: "Pada proses penyolderan, cacat karena pelelehan kurang meningkat sejak minggu lalu. Insinyur menduga “sejak material berganti lebih sulit meleleh; menaikkan setelan 5 °C seharusnya menstabilkan”. Setelan sekarang dekat batas bawah GPC band, dan +5 °C masih di bawah batas atas." },
          steps: [
            { prompt: { ja: "トリアージの判定は？", en: "Triage decision?", id: "Keputusan triase?" }, choices: [
              { text: { ja: "Quick GPC：仮説あり・単変量（温度）・バンド内で低リスク・データはすぐ取れる", en: "Quick GPC: hypothesis, single variable (temperature), low risk within the band, data available now", id: "Quick GPC: ada hipotesis, variabel tunggal (suhu), risiko rendah dalam band, data tersedia sekarang" }, correct: true, feedback: { ja: "正解。バンド内の変更なので失敗しても修正が容易です。", en: "Correct. A change within the band is easy to reverse if it fails.", id: "Benar. Perubahan dalam band mudah dikembalikan jika gagal." } },
              { text: { ja: "Deep GPC：不良は品質問題なので必ずDMAIC", en: "Deep GPC: defects are quality problems, so always DMAIC", id: "Deep GPC: cacat adalah masalah kualitas, jadi selalu DMAIC" }, correct: false, feedback: { ja: "品質問題でも、原因仮説があり低リスク・単変量ならQuick GPCです。過剰なDMAICはリソースの浪費です。", en: "Even for quality issues, a hypothesis + low risk + single variable means Quick GPC. Unneeded DMAIC wastes resources.", id: "Bahkan untuk masalah kualitas, hipotesis + risiko rendah + variabel tunggal berarti Quick GPC. DMAIC yang tidak perlu membuang sumber daya." } }
            ] },
            { prompt: { ja: "トライのやり方は？", en: "How do you run the trial?", id: "Bagaimana menjalankan uji?" }, choices: [
              { text: { ja: "温度を5℃上げて10台だけ流し、溶融状態を確認する", en: "Raise temperature by 5 °C, run just 10 units and check melting", id: "Naikkan suhu 5 °C, jalankan 10 unit saja dan cek pelelehan" }, correct: true, feedback: { ja: "正解。少ないN数ですぐテストします。", en: "Correct. Test immediately with a small N.", id: "Benar. Uji segera dengan N kecil." } },
              { text: { ja: "温度・速度・フラックス量を同時に変えて一気に改善する", en: "Change temperature, speed and flux amount at the same time", id: "Ubah suhu, kecepatan, dan jumlah flux sekaligus" }, correct: false, feedback: { ja: "複数変数を同時に変えると、どれが効いたか分かりません。Quick GPCは単変量で試します。", en: "Changing several variables at once hides which one worked. Quick GPC tests a single variable.", id: "Mengubah beberapa variabel sekaligus menyembunyikan mana yang berpengaruh. Quick GPC menguji satu variabel." } }
            ] },
            { prompt: { ja: "デジタル化はLevel 1（センサーなし）。Checkの方法は？", en: "Digitalisation is Level 1 (no sensors). How do you check?", id: "Digitalisasi berada di Level 1 (tanpa sensor). Bagaimana cara melakukan Check?" }, choices: [
              { text: { ja: "目視確認＋手書きチェックシートで10台の良否を記録", en: "Visual check + handwritten check sheet recording OK/NG for the 10 units", id: "Cek visual + lembar periksa tulisan tangan untuk mencatat OK/NG 10 unit" }, correct: true, feedback: { ja: "正解。アナログ代替ポイント：センサーがなくても判断できます。", en: "Correct. Analog alternative: you can judge without sensors.", id: "Benar. Alternatif analog: bisa menilai tanpa sensor." } },
              { text: { ja: "センサーを導入するまでCheckを保留する", en: "Hold the check until sensors are installed", id: "Tunda cek sampai sensor terpasang" }, correct: false, feedback: { ja: "デジタル化は必須条件ではありません。", en: "Digitalisation is not a prerequisite.", id: "Digitalisasi bukan prasyarat." } }
            ] },
            { prompt: { ja: "10台とも不良ゼロ。3日間の確認でも再発なし。Actionは？", en: "Zero defects in all 10 units and no recurrence over 3 days. Action?", id: "Nol cacat pada 10 unit dan tidak berulang selama 3 hari. Action?" }, choices: [
              { text: { ja: "新しい狙い値に合わせてGPCバンドとWIを更新し、ナレッジ登録、PDCA-Sで定時点検", en: "Update the GPC band and WI around the new target, register the knowledge, monitor with scheduled checks in PDCA-S", id: "Perbarui GPC band dan WI sesuai target baru, daftarkan pengetahuan, pantau dengan cek terjadwal dalam PDCA-S" }, correct: true, feedback: { ja: "正解。GPC-Mでは条件（X）の管理範囲を標準に反映させます。", en: "Correct. In GPC-M the controlled range of conditions (X) is written into the standard.", id: "Benar. Dalam GPC-M rentang kondisi (X) yang dikendalikan dituliskan ke standar." } },
              { text: { ja: "設定はそのままにして、作業者に口頭で伝える", en: "Leave the setting and tell operators verbally", id: "Biarkan setelan dan beri tahu operator secara lisan" }, correct: false, feedback: { ja: "口頭伝達は標準ではありません。担当交代や時間経過で元に戻ります。", en: "Verbal instruction is not a standard; it reverts with shift changes or over time.", id: "Instruksi lisan bukan standar; akan kembali saat pergantian shift atau seiring waktu." } }
            ] }
          ],
          outro: { ja: "所要期間は約3日。材料変更のような変化点では、同じ種類のトライ結果をナレッジベースで検索できると、次回はさらに速くなります。", en: "About three days. At change points such as a material change, being able to search similar trials in the knowledge base makes the next one even faster.", id: "Sekitar tiga hari. Pada titik perubahan seperti pergantian material, kemampuan mencari uji serupa di basis pengetahuan membuat berikutnya lebih cepat." }
        } }
      ]
    },
    {
      id: "case3",
      title: { ja: "ケース3：慢性的な寸法バラツキ（Deep GPC × GPC-M）", en: "Case 3: Chronic Dimensional Variation (Deep GPC × GPC-M)", id: "Kasus 3: Variasi Dimensi Kronis (Deep GPC × GPC-M)" },
      blocks: [
        { type: "widget", name: "scenario", props: {
          title: { ja: "ケース3：切削部品の寸法が安定しない", en: "Case 3: Machined part dimensions are unstable", id: "Kasus 3: Dimensi part pemesinan tidak stabil" },
          intro: { ja: "切削加工ラインで、ある穴径の不良率が長期間2%前後です。季節や時間帯で良くなったり悪くなったりし、何が効いているのか誰も説明できません。条件を大きく変えると高価な工具や設備を傷めるおそれがあります。", en: "On a machining line, the defect rate of a bore diameter has hovered around 2% for a long time. It gets better or worse by season and time of day, and no one can explain why. Large condition changes could damage expensive tools or equipment.", id: "Pada lini pemesinan, tingkat cacat diameter lubang berkisar 2% sejak lama. Kadang membaik atau memburuk menurut musim dan jam, dan tidak ada yang bisa menjelaskan. Perubahan kondisi besar bisa merusak alat atau peralatan mahal." },
          steps: [
            { prompt: { ja: "トリアージの判定は？", en: "Triage decision?", id: "Keputusan triase?" }, choices: [
              { text: { ja: "Deep GPC：原因不明・多変量・高リスク", en: "Deep GPC: unknown cause, multi-variable, high risk", id: "Deep GPC: penyebab tidak diketahui, multivariabel, risiko tinggi" }, correct: true, feedback: { ja: "正解。いずれか1つでもDeep GPCですが、このケースは3つとも該当します。", en: "Correct. One condition is enough; here all three apply.", id: "Benar. Satu kondisi sudah cukup; di sini ketiganya berlaku." } },
              { text: { ja: "Quick GPC：とりあえず切削速度を下げてみる", en: "Quick GPC: just try lowering cutting speed", id: "Quick GPC: coba turunkan kecepatan potong" }, correct: false, feedback: { ja: "仮説の根拠がなく、高リスクです。直感的なトライでは根本原因に届きません。", en: "No grounds for the hypothesis and high risk; intuitive trials will not reach the root cause.", id: "Tidak ada dasar hipotesis dan risiko tinggi; uji intuitif tidak akan mencapai akar penyebab." } }
            ] },
            { prompt: { ja: "Define後、過去の検査記録を見ると測定者によって値の傾向が違う。まず何をする？", en: "After Define, past inspection records show different tendencies by inspector. What first?", id: "Setelah Define, catatan inspeksi lama menunjukkan kecenderungan berbeda per pemeriksa. Apa yang pertama?" }, choices: [
              { text: { ja: "MSA（Gage R&R・偏り・校正）で測定システムを評価する", en: "Evaluate the measurement system with MSA (Gage R&R, bias, calibration)", id: "Evaluasi sistem pengukuran dengan MSA (Gage R&R, bias, kalibrasi)" }, correct: true, feedback: { ja: "正解。%GRRが22%で条件付き、測定治具の当て方を標準化して9%に改善してからデータ収集に進みました。", en: "Correct. %GRR was 22% (conditional); after standardising how the fixture is applied it became 9%, then data collection began.", id: "Benar. %GRR 22% (bersyarat); setelah cara pemakaian fixture distandarkan menjadi 9%, lalu pengumpulan data dimulai." } },
              { text: { ja: "測定者の差は誤差なので平均して使う", en: "Inspector differences are just error, so average them", id: "Perbedaan pemeriksa hanya galat, jadi rata-ratakan" }, correct: false, feedback: { ja: "測定のバラツキ・偏りを放置すると、工程の真の姿が見えません。データの信頼性確保が先です。", en: "Leaving measurement variation and bias hides the true process. Secure data reliability first.", id: "Membiarkan variasi dan bias pengukuran menyembunyikan proses yang sebenarnya. Pastikan keandalan data dulu." } }
            ] },
            { prompt: { ja: "4週間、温度・湿度・工具使用数・材料ロットを層別記録した。Analyzeでは？", en: "For four weeks you recorded temperature, humidity, tool usage count and material lot. What in Analyze?", id: "Selama empat minggu Anda mencatat suhu, kelembapan, jumlah pemakaian alat, dan lot material. Apa di Analyze?" }, choices: [
              { text: { ja: "回帰分析で要因の寄与と交互作用を調べ、なぜなぜ分析で物理的な理由を確認する", en: "Use regression to examine each factor's contribution and interactions, and confirm the physical reason with 5-Why", id: "Gunakan regresi untuk melihat kontribusi faktor dan interaksi, lalu pastikan alasan fisik dengan 5-Why" }, correct: true, feedback: { ja: "正解。分析の結果、工具摩耗×温度の交互作用が主因と分かりました（室温が高い時間帯に摩耗の影響が拡大）。", en: "Correct. The analysis showed the tool wear × temperature interaction as the main cause (wear matters more in warm hours).", id: "Benar. Analisis menunjukkan interaksi keausan alat × suhu sebagai penyebab utama (keausan lebih berpengaruh saat jam hangat)." } },
              { text: { ja: "一番相関が高かった湿度を原因と断定し、除湿機を買う", en: "Declare humidity, the highest correlation, the cause and buy a dehumidifier", id: "Menetapkan kelembapan, korelasi tertinggi, sebagai penyebab dan membeli dehumidifier" }, correct: false, feedback: { ja: "相関は因果ではありません。湿度は温度と一緒に動いていただけかもしれません。", en: "Correlation is not causation; humidity may simply move with temperature.", id: "Korelasi bukan kausalitas; kelembapan mungkin hanya bergerak bersama suhu." } }
            ] },
            { prompt: { ja: "Improveで最適条件を決めたい。どうする？", en: "How do you set the optimum in Improve?", id: "Bagaimana menentukan kondisi optimum di Improve?" }, choices: [
              { text: { ja: "DOEで工具交換周期と冷却条件を計画的に振り、最適条件でGPCバンドを再設定、パイロットランで検証", en: "Vary tool-change interval and cooling conditions systematically with DOE, reset the GPC band at the optimum, verify with a pilot run", id: "Ubah interval ganti alat dan kondisi pendinginan secara terencana dengan DOE, setel ulang GPC band pada kondisi optimum, verifikasi dengan pilot run" }, correct: true, feedback: { ja: "正解。パイロットランで不良率0.2%を確認しました。", en: "Correct. The pilot run confirmed a defect rate of 0.2%.", id: "Benar. Pilot run memastikan tingkat cacat 0,2%." } },
              { text: { ja: "寸法検査を全数にして不良を流出させない", en: "Inspect 100% so no defects escape", id: "Inspeksi 100% agar tidak ada cacat lolos" }, correct: false, feedback: { ja: "Yの直接操作です。バラツキそのものは減りません。", en: "That manipulates Y directly; the variation itself does not fall.", id: "Itu memanipulasi Y secara langsung; variasinya sendiri tidak berkurang." } }
            ] },
            { prompt: { ja: "Controlで行うことは？", en: "What do you do in Control?", id: "Apa yang dilakukan di Control?" }, choices: [
              { text: { ja: "X̄-R管理図で安定を監視し、工具交換周期をSOPとコントロールプランに固定、PDCA-SのPlanへ引き継ぐ", en: "Monitor stability with an X̄-R chart, lock the tool-change interval into the SOP and control plan, hand over to PDCA-S Plan", id: "Pantau kestabilan dengan peta X̄-R, kunci interval ganti alat di SOP dan rencana kontrol, serahkan ke Plan PDCA-S" }, correct: true, feedback: { ja: "正解。安定を確認した上で不良率を定期監視します。", en: "Correct. Monitor the defect rate periodically once stability is confirmed.", id: "Benar. Pantau tingkat cacat secara berkala setelah kestabilan dipastikan." } },
              { text: { ja: "不良率0.2%を達成したのでプロジェクトを閉じ、監視しない", en: "Defect rate 0.2% achieved, so close the project without monitoring", id: "Tingkat cacat 0,2% tercapai, jadi tutup proyek tanpa pemantauan" }, correct: false, feedback: { ja: "安定状態の維持を確認しなければ、その数値はすぐ意味を失います。", en: "Without confirming stability is maintained, the figure quickly loses meaning.", id: "Tanpa memastikan kestabilan terjaga, angka itu cepat kehilangan makna." } }
            ] }
          ],
          outro: { ja: "所要期間は約2ヶ月。MSAで「データを信頼できる状態」にしたことが、正しい真因に到達できた最大の理由です。", en: "About two months. Making the data trustworthy with MSA was the biggest reason the true root cause was found.", id: "Sekitar dua bulan. Menjadikan data dapat dipercaya dengan MSA adalah alasan terbesar akar penyebab yang benar ditemukan." }
        } }
      ]
    },
    {
      id: "case4",
      title: { ja: "ケース4：仮説が外れ続ける（Quick → Deep エスカレーション）", en: "Case 4: Hypotheses Keep Failing (Quick → Deep Escalation)", id: "Kasus 4: Hipotesis Terus Gagal (Eskalasi Quick → Deep)" },
      blocks: [
        { type: "widget", name: "scenario", props: {
          title: { ja: "ケース4：組立不良率3%が下がらない", en: "Case 4: A 3% assembly defect rate will not fall", id: "Kasus 4: Tingkat cacat perakitan 3% tidak turun" },
          intro: { ja: "組立ラインで勘合不良が約3%発生しています。当初は「作業者の手順の問題」と考えられ、Quick GPCで取り組み始めました。", en: "An assembly line has about 3% fitting defects. At first it was thought to be “an operator procedure problem”, and Quick GPC was started.", id: "Sebuah lini perakitan memiliki cacat pemasangan sekitar 3%. Awalnya dianggap “masalah prosedur operator”, dan Quick GPC dimulai." },
          steps: [
            { prompt: { ja: "1回目：作業手順を変更 → 改善なし。2回目：治具を変更 → 数日改善したが再発。次はどうする？", en: "Cycle 1: changed procedure → no change. Cycle 2: changed jig → improved a few days then recurred. What next?", id: "Siklus 1: prosedur diubah → tidak berubah. Siklus 2: jig diubah → membaik beberapa hari lalu berulang. Selanjutnya?" }, choices: [
              { text: { ja: "3回目の仮説（材料の置き方の変更）を試しつつ、エスカレーション基準（再発）にも注意する", en: "Try a third hypothesis (how materials are placed) while watching the escalation criterion (recurrence)", id: "Coba hipotesis ketiga (cara menaruh material) sambil memperhatikan kriteria eskalasi (berulang)" }, correct: true, feedback: { ja: "妥当です。「再発」はすでにエスカレーションのサインの一つなので、3回目の結果次第で速やかに判断します。", en: "Reasonable. Recurrence is already an escalation sign, so decide quickly based on cycle 3.", id: "Masuk akal. Berulang sudah menjadi tanda eskalasi, jadi putuskan cepat berdasarkan siklus 3." } },
              { text: { ja: "作業者への注意喚起を強化する", en: "Increase warnings to operators", id: "Perbanyak peringatan kepada operator" }, correct: false, feedback: { ja: "精神論はXの制御になりません。", en: "Warnings do not control X.", id: "Peringatan tidak mengendalikan X." } }
            ] },
            { prompt: { ja: "3回目：材料の置き方を変更 → 改善なし。仮説も出尽くした。判断は？", en: "Cycle 3: changed material placement → no change. No more hypotheses. Decision?", id: "Siklus 3: penempatan material diubah → tidak berubah. Hipotesis habis. Keputusan?" }, choices: [
              { text: { ja: "Deep GPC（DMAIC）へエスカレーション。3回のトライ結果（失敗含む）を引き継ぐ", en: "Escalate to Deep GPC (DMAIC), handing over the results of all three trials including failures", id: "Eskalasi ke Deep GPC (DMAIC), serahkan hasil ketiga uji termasuk yang gagal" }, correct: true, feedback: { ja: "正解。3回失敗・仮説枯渇・再発のいずれも基準に該当します。失敗結果は「効かなかったX」という貴重な情報です。", en: "Correct. Three failures, no hypotheses and recurrence all meet the criteria. Failed results are valuable “X that did not work” information.", id: "Benar. Tiga kegagalan, hipotesis habis, dan berulang memenuhi kriteria. Hasil gagal adalah informasi berharga “X yang tidak berpengaruh”." } },
              { text: { ja: "4回目、5回目と仮説を変えてQuick GPCを続ける", en: "Keep going with a 4th and 5th Quick GPC hypothesis", id: "Lanjutkan Quick GPC dengan hipotesis ke-4 dan ke-5" }, correct: false, feedback: { ja: "エスカレーション基準を無視すると、現場が疲弊し解決も遅れます。", en: "Ignoring escalation criteria exhausts the floor and delays the solution.", id: "Mengabaikan kriteria eskalasi melelahkan lapangan dan menunda solusi." } }
            ] },
            { prompt: { ja: "DMAICのDefineとMeasureで、X候補に「作業者・時間帯・部品ロット・治具」を挙げデータを収集した。Analyzeで何を使う？", en: "In Define and Measure, X candidates were operator, time slot, part lot and jig, and data was collected. What do you use in Analyze?", id: "Pada Define dan Measure, kandidat X adalah operator, jam, lot part, dan jig, lalu data dikumpulkan. Apa yang dipakai di Analyze?" }, choices: [
              { text: { ja: "分散分析（ANOVA）で各グループ間の差を比較する", en: "ANOVA to compare differences between groups", id: "ANOVA untuk membandingkan perbedaan antar kelompok" }, correct: true, feedback: { ja: "正解。部品ロット間の差が主因で、特定ロットの寸法不良率が高いことが分かりました。", en: "Correct. Differences between part lots were the main cause; one lot had a high dimensional defect rate.", id: "Benar. Perbedaan antar lot part adalah penyebab utama; satu lot memiliki tingkat cacat dimensi tinggi." } },
              { text: { ja: "作業者別のV.Scoreだけを見る", en: "Look only at V.Score by operator", id: "Hanya melihat V.Score per operator" }, correct: false, feedback: { ja: "当初の「人の問題」という思い込みに引きずられています。すべてのX候補を公平に検証します。", en: "That is still anchored on the “people problem” assumption. Test all X candidates fairly.", id: "Masih terpaku pada anggapan “masalah orang”. Uji semua kandidat X secara adil." } }
            ] },
            { prompt: { ja: "原因は部品ロットの寸法バラツキ（Material）。Improveは？", en: "The cause is dimensional variation between part lots (Material). Improve?", id: "Penyebabnya variasi dimensi antar lot part (Material). Improve?" }, choices: [
              { text: { ja: "受入検査基準を改定し、ロット管理を強化する。パイロットで不良率を確認", en: "Revise incoming inspection criteria, strengthen lot control, confirm the defect rate in a pilot", id: "Revisi kriteria inspeksi penerimaan, perkuat pengendalian lot, pastikan tingkat cacat dalam pilot" }, correct: true, feedback: { ja: "正解。材料は7要因の中でGPC-M側で制御します（受入基準・ロット管理）。不良率は3%→0.3%に低下しました。", en: "Correct. Material is controlled on the GPC-M side (acceptance criteria, lot control). The defect rate fell from 3% to 0.3%.", id: "Benar. Material dikendalikan di sisi GPC-M (kriteria penerimaan, pengendalian lot). Tingkat cacat turun dari 3% ke 0,3%." } },
              { text: { ja: "組立工程の最終検査を2回にする", en: "Double the final inspection in assembly", id: "Menggandakan inspeksi akhir di perakitan" }, correct: false, feedback: { ja: "Yの直接操作で、不良の発生自体は減りません。", en: "Direct manipulation of Y; defects are still produced.", id: "Manipulasi Y secara langsung; cacat tetap diproduksi." } }
            ] },
            { prompt: { ja: "最後に残すべきナレッジは？", en: "What knowledge should be kept at the end?", id: "Pengetahuan apa yang harus disimpan di akhir?" }, choices: [
              { text: { ja: "成功したDMAICの結果だけ", en: "Only the successful DMAIC result", id: "Hanya hasil DMAIC yang berhasil" }, correct: false, feedback: { ja: "失敗した3回のQuick GPCも、同じ思い込みによる再実験を防ぐ重要なナレッジです。", en: "The three failed Quick GPC trials are also key knowledge that prevents re-testing the same assumption.", id: "Tiga uji Quick GPC yang gagal juga pengetahuan penting untuk mencegah pengujian ulang anggapan yang sama." } },
              { text: { ja: "3回の失敗トライ、エスカレーション判断、DMAICの分析結果、改定した受入基準をすべて登録", en: "Register the three failed trials, the escalation decision, the DMAIC analysis and the revised acceptance criteria", id: "Daftarkan tiga uji gagal, keputusan eskalasi, analisis DMAIC, dan kriteria penerimaan yang direvisi" }, correct: true, feedback: { ja: "正解。成功・失敗パターンの蓄積がトリアージ精度を上げます。", en: "Correct. Accumulating success and failure patterns improves triage accuracy.", id: "Benar. Akumulasi pola berhasil dan gagal meningkatkan akurasi triase." } }
            ] }
          ],
          outro: { ja: "所要期間はQuick GPC 1週間＋Deep GPC 6週間。グレーゾーンはまずQuickで試し、効かなければ迷わずDeepへ——この段階的アプローチがリソースの無駄を最小化します。", en: "Quick GPC one week + Deep GPC six weeks. Try Quick first in gray zones and escalate to Deep without hesitation if it fails — this staged approach minimises wasted resources.", id: "Quick GPC satu minggu + Deep GPC enam minggu. Coba Quick dulu di zona abu-abu dan eskalasi ke Deep tanpa ragu jika gagal — pendekatan bertahap ini meminimalkan pemborosan sumber daya." }
        } }
      ]
    },
    {
      id: "reflection",
      title: { ja: "振り返り：4ケースに共通する教訓", en: "Reflection: Lessons Common to All Four Cases", id: "Refleksi: Pelajaran Bersama dari Keempat Kasus" },
      blocks: [
        { type: "cards", cols: 2, items: [
          { icon: "🧭", tone: "navy", title: { ja: "入り口はいつもトリアージ", en: "The entrance is always triage", id: "Pintu masuk selalu triase" }, text: { ja: "指標の悪さや問題の種類ではなく、原因の見当・変数・リスク・データの4基準でルートを決めた。", en: "The route was chosen by the four criteria — cause idea, variables, risk, data — not by how bad a metric looked or the problem type.", id: "Rute dipilih dengan empat kriteria — dugaan penyebab, variabel, risiko, data — bukan dari buruknya metrik atau jenis masalah." } },
          { icon: "🔍", tone: "blue", title: { ja: "データの信頼性を先に確保", en: "Secure data reliability first", id: "Pastikan keandalan data dulu" }, text: { ja: "ケース3のMSAのように、測定のバラツキを取り除いたからこそ真因に届いた。", en: "As with the MSA in Case 3, removing measurement variation is what made the root cause reachable.", id: "Seperti MSA di Kasus 3, menghilangkan variasi pengukuran yang membuat akar penyebab dapat dicapai." } },
          { icon: "🎯", tone: "green", title: { ja: "Xを制御し、Yは結果として動かす", en: "Control X; let Y move as a result", id: "Kendalikan X; biarkan Y bergerak sebagai hasil" }, text: { ja: "全ケースで、検査強化・注意喚起・急がせるといったYの直接操作を退けた。", en: "Every case rejected direct manipulation of Y: more inspection, warnings, rushing.", id: "Setiap kasus menolak manipulasi Y secara langsung: inspeksi tambahan, peringatan, terburu-buru." } },
          { icon: "🔁", tone: "amber", title: { ja: "S（標準化）とナレッジで終わる", en: "End with S (standardise) and knowledge", id: "Akhiri dengan S (standardisasi) dan pengetahuan" }, text: { ja: "暫定標準・GPCバンド更新・SOP改訂でPDCA-Sへ引き継ぎ、失敗も含めて記録した。", en: "Hand-over to PDCA-S through temporary standards, band updates and SOP revisions, recording failures too.", id: "Penyerahan ke PDCA-S melalui standar sementara, pembaruan band, dan revisi SOP, termasuk mencatat kegagalan." } }
        ] },
        { type: "callout", kind: "zeva", title: { ja: "好循環を回し続ける", en: "Keep the virtuous cycle turning", id: "Terus putar siklus positif" }, text: {
          ja: "バラツキを減らす → データの信頼性が上がる → 的確なアクションができる → さらにバラツキが減る。4つのケースはすべて、この好循環を1回転させた記録です。あなたの現場の課題でも、同じ流れを描いてみましょう。",
          en: "Reduce variation → data becomes reliable → accurate action becomes possible → variation falls further. All four cases are records of one turn of this virtuous cycle. Try drawing the same flow for an issue on your own site.",
          id: "Kurangi variasi → data menjadi andal → tindakan tepat menjadi mungkin → variasi makin turun. Keempat kasus adalah catatan satu putaran siklus positif ini. Coba gambarkan alur yang sama untuk masalah di lokasi Anda."
        } },
        { type: "widget", name: "triage-wizard", props: {} }
      ]
    }
  ],
  keyPoints: [
    { ja: "ルートは指標の悪さではなく、トリアージ4基準で決める", en: "The route is decided by the four triage criteria, not by how bad a metric is", id: "Rute ditentukan oleh empat kriteria triase, bukan dari buruknya metrik" },
    { ja: "Quick GPCは1文の仮説・小さなN・簡易Check・暫定標準で素早く回す", en: "Quick GPC runs fast with a one-sentence hypothesis, small N, simple check and a temporary standard", id: "Quick GPC berjalan cepat dengan hipotesis satu kalimat, N kecil, cek sederhana, dan standar sementara" },
    { ja: "Deep GPCはMSAでデータ信頼性を確保し、統計・DOEで真因を特定し、管理図で安定を監視する", en: "Deep GPC secures data reliability with MSA, finds the root cause with statistics and DOE, and monitors stability with control charts", id: "Deep GPC memastikan keandalan data dengan MSA, menemukan akar penyebab dengan statistik dan DOE, serta memantau kestabilan dengan peta kendali" },
    { ja: "3回失敗・仮説枯渇・再発・影響拡大はエスカレーションのサイン。失敗トライも引き継ぐ", en: "Three failures, no hypotheses, recurrence or wider impact signal escalation; hand over failed trials too", id: "Tiga kegagalan, hipotesis habis, berulang, atau dampak meluas menandakan eskalasi; serahkan juga uji yang gagal" },
    { ja: "どのルートもPDCA-Sへの引き継ぎとナレッジ登録で完結する", en: "Every route ends with hand-over to PDCA-S and knowledge registration", id: "Setiap rute diakhiri dengan penyerahan ke PDCA-S dan pendaftaran pengetahuan" }
  ],
  quiz: [
    { q: { ja: "ケース1（部品箱の位置）がQuick GPCになった理由として最も適切なものは？", en: "Why was Case 1 (parts box position) Quick GPC?", id: "Mengapa Kasus 1 (posisi kotak part) menjadi Quick GPC?" },
      choices: [
        { ja: "V.Scoreが0.1を少し超えただけだから", en: "Because V.Score only slightly exceeded 0.1", id: "Karena V.Score hanya sedikit melebihi 0,1" },
        { ja: "原因仮説があり、低リスク・単変量でデータもすぐ取れるから", en: "There was a hypothesis, low risk, a single variable and data available now", id: "Ada hipotesis, risiko rendah, variabel tunggal, dan data tersedia sekarang" },
        { ja: "人作業は必ずQuick GPCだから", en: "Manual work is always Quick GPC", id: "Kerja manual selalu Quick GPC" },
        { ja: "統計担当者がいなかったから", en: "No statistician was available", id: "Tidak ada ahli statistik" }
      ], answer: 1,
      explain: { ja: "ルートは4基準で決まります。人作業でも原因不明・高リスクならDeep GPCです。", en: "The route is set by the four criteria; manual work with unknown cause or high risk goes to Deep.", id: "Rute ditentukan empat kriteria; kerja manual dengan penyebab tidak diketahui atau risiko tinggi masuk Deep." } },
    { q: { ja: "ケース2で温度・速度・フラックス量を同時に変えなかった理由は？", en: "In Case 2, why not change temperature, speed and flux at once?", id: "Di Kasus 2, mengapa tidak mengubah suhu, kecepatan, dan flux sekaligus?" },
      choices: [
        { ja: "どの変数が効いたか分からなくなるから", en: "You could not tell which variable worked", id: "Tidak bisa diketahui variabel mana yang berpengaruh" },
        { ja: "設備が壊れるから", en: "The machine would break", id: "Mesin akan rusak" },
        { ja: "デジタル化レベルが低いから", en: "The digital level was low", id: "Level digital rendah" },
        { ja: "規則で禁止されているから", en: "Rules forbid it", id: "Aturan melarangnya" }
      ], answer: 0,
      explain: { ja: "Quick GPCは単変量のトライです。複数変数の同時検討が必要ならDeep GPC（DOE）の領域です。", en: "Quick GPC trials are single-variable; if multiple variables must be studied together, it is Deep GPC (DOE) territory.", id: "Uji Quick GPC bervariabel tunggal; jika beberapa variabel perlu dipelajari bersama, itu wilayah Deep GPC (DOE)." } },
    { q: { ja: "ケース3で、データ収集の前にMSAを行ったのはなぜか？", en: "In Case 3, why was MSA done before data collection?", id: "Di Kasus 3, mengapa MSA dilakukan sebelum pengumpulan data?" },
      choices: [
        { ja: "手順書にそう書いてあるから", en: "Because the procedure says so", id: "Karena prosedur mengatakannya" },
        { ja: "測定者によって値の傾向が違い、データの信頼性が疑わしかったから", en: "Values differed by inspector, so data reliability was doubtful", id: "Nilai berbeda per pemeriksa, sehingga keandalan data diragukan" },
        { ja: "指標を良く見せるため", en: "To make the metrics look better", id: "Agar metrik terlihat lebih baik" },
        { ja: "工具摩耗を測るため", en: "To measure tool wear", id: "Untuk mengukur keausan alat" }
      ], answer: 1,
      explain: { ja: "信頼性の低いデータからは正しい結論もアクションも導けません（根底ロジック）。", en: "Unreliable data yields neither correct conclusions nor actions (root logic).", id: "Data yang tidak andal tidak menghasilkan kesimpulan maupun tindakan yang benar (logika dasar)." } },
    { q: { ja: "ケース3で湿度との相関が高かったのに原因と断定しなかった理由は？", en: "In Case 3, why was humidity not declared the cause despite high correlation?", id: "Di Kasus 3, mengapa kelembapan tidak ditetapkan sebagai penyebab meski korelasinya tinggi?" },
      choices: [
        { ja: "相関は因果ではなく、温度と一緒に動いていただけの可能性があるから", en: "Correlation is not causation; it may just move with temperature", id: "Korelasi bukan kausalitas; mungkin hanya bergerak bersama suhu" },
        { ja: "湿度は7要因に含まれないから", en: "Humidity is not among the seven factors", id: "Kelembapan tidak termasuk tujuh faktor" },
        { ja: "除湿機は高いから", en: "Dehumidifiers are expensive", id: "Dehumidifier mahal" },
        { ja: "湿度は測定できないから", en: "Humidity cannot be measured", id: "Kelembapan tidak dapat diukur" }
      ], answer: 0,
      explain: { ja: "因果の確証は回帰分析での交互作用の確認や、DOEで条件を意図的に振ることで得ます。湿度はEnvironment要因に含まれます。", en: "Causation is confirmed via regression interactions and deliberate DOE changes. Humidity belongs to the Environment factor.", id: "Kausalitas dipastikan lewat interaksi regresi dan perubahan DOE yang disengaja. Kelembapan termasuk faktor Environment." } },
    { q: { ja: "ケース4でエスカレーションを判断した根拠に含まれないものは？", en: "Which was NOT a reason for escalation in Case 4?", id: "Mana yang BUKAN alasan eskalasi di Kasus 4?" },
      choices: [
        { ja: "3回のH-T-C-Aで効果が得られなかった", en: "Three H-T-C-A cycles had no effect", id: "Tiga siklus H-T-C-A tidak berpengaruh" },
        { ja: "仮説が枯渇した", en: "Hypotheses ran out", id: "Hipotesis habis" },
        { ja: "一時的に改善したが再発した", en: "It improved temporarily but recurred", id: "Membaik sementara lalu berulang" },
        { ja: "デジタル化レベルがLevel 1だった", en: "The digital level was Level 1", id: "Level digital adalah Level 1" }
      ], answer: 3,
      explain: { ja: "デジタル化レベルはエスカレーション基準ではありません。基準は3回失敗・仮説枯渇・再発・影響範囲の拡大です。", en: "digital level is not an escalation criterion. The criteria are 3 failures, no hypotheses, recurrence and bigger impact.", id: "Level digital bukan kriteria eskalasi. Kriterianya 3 kegagalan, hipotesis habis, berulang, dan dampak lebih besar." } },
    { q: { ja: "ケース4の真因（部品ロット間差）はどのバラツキ要因・制御側に当たるか？", en: "Case 4's root cause (differences between part lots) belongs to which factor and control side?", id: "Akar penyebab Kasus 4 (perbedaan antar lot part) termasuk faktor dan sisi kendali mana?" },
      choices: [
        { ja: "Man／GPC-H", en: "Man / GPC-H", id: "Man / GPC-H" },
        { ja: "Material／GPC-M", en: "Material / GPC-M", id: "Material / GPC-M" },
        { ja: "Method／GPC-H", en: "Method / GPC-H", id: "Method / GPC-H" },
        { ja: "Management／GPC-H", en: "Management / GPC-H", id: "Management / GPC-H" }
      ], answer: 1,
      explain: { ja: "Material（材料）はGPC-M側で、受入検査基準とロット管理で制御します。", en: "Material is on the GPC-M side, controlled by acceptance criteria and lot control.", id: "Material ada di sisi GPC-M, dikendalikan dengan kriteria penerimaan dan pengendalian lot." } },
    { q: { ja: "4ケースに共通して、改善の最後に必ず行ったことは？", en: "What was always done at the end of improvement in all four cases?", id: "Apa yang selalu dilakukan di akhir perbaikan pada keempat kasus?" },
      choices: [
        { ja: "作業者への表彰", en: "Award the operators", id: "Memberi penghargaan kepada operator" },
        { ja: "標準化（暫定標準・GPCバンド・SOP）とPDCA-Sへの引き継ぎ、ナレッジ登録", en: "Standardisation (temporary standard, GPC band, SOP), hand-over to PDCA-S and knowledge registration", id: "Standardisasi (standar sementara, GPC band, SOP), penyerahan ke PDCA-S, dan pendaftaran pengetahuan" },
        { ja: "デジタル化レベルの引き上げ", en: "Raise the digital level", id: "Menaikkan level digital" },
        { ja: "検査工程の追加", en: "Add an inspection process", id: "Menambah proses inspeksi" }
      ], answer: 1,
      explain: { ja: "Sなき改善は「やりっぱなし」になります。維持サイクルへの接続で効果が定着します。", en: "Improvement without S is do-and-forget; connecting to the maintenance cycle makes it stick.", id: "Perbaikan tanpa S adalah kerjakan-lalu-lupakan; menghubungkan ke siklus pemeliharaan membuatnya bertahan." } }
  ]
});
