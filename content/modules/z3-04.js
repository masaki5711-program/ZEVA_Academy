ZA.addModule({
  id: "z3-04",
  track: "z3",
  order: 4,
  minutes: 30,
  icon: "🛰",
  level: 3,
  prereq: ["z2-05", "z3-03"],
  title: {
    ja: "デジタル化の段階的実装とZEVAシステム",
    en: "Staged Digitalisation and the ZEVA System",
    id: "Implementasi Digitalisasi Bertahap dan Sistem ZEVA"
  },
  summary: {
    ja: "デジタル化は必須条件ではなく「加速装置」。アナログでも回るZEVAを、Level 1〜3のデジタル化でどう加速するか、移行の判断基準、ZEVAシステムに求められる機能、AI技術の位置づけを学びます。",
    en: "Digitalisation is not a prerequisite but an accelerator. Learn how digital levels 1–3 speed up a ZEVA that already works on paper, when to move up a level, which functions a ZEVA system needs, and where AI fits.",
    id: "Digitalisasi bukan prasyarat melainkan akselerator. Pelajari bagaimana level digital 1–3 mempercepat ZEVA yang sudah berjalan secara analog, kapan naik level, fungsi apa yang dibutuhkan sistem ZEVA, dan posisi AI."
  },
  objectives: [
    { ja: "「デジタル化は加速装置でありオプション」という設計思想を説明できる", en: "Explain the design idea “Digitalisation is an optional accelerator”", id: "Menjelaskan gagasan desain “Digitalisasi adalah akselerator opsional”" },
    { ja: "デジタル化レベル1〜3の特徴と、各レベルでの改善活動の違いを説明できる", en: "Describe digital levels 1–3 and how improvement activities differ at each", id: "Menjelaskan level digital 1–3 dan perbedaan aktivitas perbaikan di tiap level" },
    { ja: "現場の状況からデジタル化レベル移行の要否を判断できる", en: "Judge from site conditions whether to move to the next digital level", id: "Menilai dari kondisi lapangan apakah perlu naik ke level digital berikutnya" },
    { ja: "ZEVAシステムの4機能と、AIを「バラツキを吸収・可視化する武器」として位置づける意味を説明できる", en: "Explain the four ZEVA system functions and why AI is positioned as a weapon to absorb and visualise variation", id: "Menjelaskan empat fungsi sistem ZEVA dan mengapa AI diposisikan sebagai senjata untuk menyerap dan memvisualkan variasi" }
  ],
  sections: [
    {
      id: "philosophy",
      title: { ja: "設計思想：アナログでも回る、デジタル化でもっと速く", en: "Design Idea: Works in Analog, Faster with Digitalisation", id: "Gagasan Desain: Berjalan Secara Analog, Lebih Cepat dengan Digitalisasi" },
      blocks: [
        { type: "p", text: {
          ja: "ZEVAはデジタル化を「必須条件」ではなく「加速装置（オプション）」として位置づけています。ホワイトボードとストップウォッチしかない現場でも完全に機能し、デジタル化が整うほど**速度とカバレッジ**が上がる設計です。",
          en: "ZEVA positions digitalisation not as a prerequisite but as an optional accelerator. It works fully on a site with only a whiteboard and a stopwatch, and as digitalisation matures, **speed and coverage** increase.",
          id: "ZEVA menempatkan digitalisasi bukan sebagai prasyarat melainkan akselerator opsional. ZEVA berfungsi penuh di lokasi yang hanya punya papan tulis dan stopwatch, dan saat digitalisasi makin matang, **kecepatan dan cakupan** meningkat."
        } },
        { type: "callout", kind: "key", title: { ja: "デジタル化レベル ≠ 改善活動の質", en: "Digital level ≠ quality of improvement", id: "Level digital ≠ kualitas perbaikan" }, text: {
          ja: "デジタル化レベルの向上は改善活動の質とは独立しています。Level 1でも優れた改善は可能です。デジタル化は速度とカバレッジを上げるツールに過ぎません。",
          en: "Raising the digital level is independent of the quality of improvement. Excellent improvement is possible at Level 1. Digitalisation is only a tool for speed and coverage.",
          id: "Menaikkan level digital tidak bergantung pada kualitas perbaikan. Perbaikan yang sangat baik bisa dilakukan di Level 1. Digitalisasi hanyalah alat untuk kecepatan dan cakupan."
        } },
        { type: "callout", kind: "note", title: { ja: "「DX」という語は使わない", en: "We do not use the word “DX”", id: "Kami tidak memakai kata “DX”" }, text: {
          ja: "[[dx]]は、経営やビジネスモデルの変革までを指す言葉です。ZEVAが扱うのは現場改善の加速なので、その範囲を超えます。ここで扱うのは、紙の記録をデータに変える**デジタイゼーション**（Level 2）と、デジタル技術で工程の運用を変える**デジタライゼーション**（Level 3）の2つです。",
          en: "[[dx]] reaches all the way to changing the business model. ZEVA is about accelerating shop-floor improvement, which is narrower. This site therefore talks about **digitisation** (Level 2), turning paper records into data, and **digitalisation** (Level 3), changing how the process runs with digital technology.",
          id: "[[dx]] mencakup perubahan model bisnis. ZEVA berbicara tentang mempercepat perbaikan di lantai produksi, yang lebih sempit. Karena itu situs ini memakai **digitisasi** (Level 2), mengubah catatan kertas menjadi data, dan **digitalisasi** (Level 3), mengubah cara proses dijalankan dengan teknologi digital."
        } },
        { type: "compare",
          left: { title: { ja: "よくある誤解", en: "Common misunderstanding", id: "Salah paham umum" }, tone: "red", items: [
            { ja: "センサーやシステムがないからZEVAは始められない", en: "No sensors or system, so we cannot start ZEVA", id: "Tidak ada sensor atau sistem, jadi tidak bisa mulai ZEVA" },
            { ja: "ダッシュボードを作れば改善が進む", en: "Building a dashboard will drive improvement", id: "Membuat dashboard akan mendorong perbaikan" },
            { ja: "AIを入れればバラツキの問題は解決する", en: "Adding AI solves the variation problem", id: "Menambah AI menyelesaikan masalah variasi" }
          ] },
          right: { title: { ja: "ZEVAの考え方", en: "ZEVA thinking", id: "Cara berpikir ZEVA" }, tone: "green", items: [
            { ja: "まずアナログでZEVAの思考法を浸透させ、デジタル化は後から追加する", en: "Spread ZEVA thinking in analog first; add digitalisation later", id: "Sebarkan cara berpikir ZEVA secara analog dulu; tambahkan digitalisasi kemudian" },
            { ja: "データを見て行動する仕組み（トリアージ・PDCA-S）が先", en: "The mechanism for acting on data (triage, PDCA-S) comes first", id: "Mekanisme bertindak berdasarkan data (triase, PDCA-S) didahulukan" },
            { ja: "常にZEVAが中心にあり、技術はそれを実現する手段", en: "ZEVA is always at the centre; technology is the means", id: "ZEVA selalu menjadi pusat; teknologi adalah sarana" }
          ] }
        }
      ]
    },
    {
      id: "levels",
      title: { ja: "3段階のデジタル化レベル", en: "The Three Digital Levels", id: "Tiga Level Digital" },
      blocks: [
        { type: "layers", items: [
          { label: { ja: "Level 3", en: "Level 3", id: "Level 3" }, title: { ja: "デジタライゼーション", en: "Digitalisation", id: "Digitalisasi" }, text: { ja: "PLC・センサーからの自動収集、IoT、生産管理システム連携 → リアルタイム異常検知、予知保全アラート、GPC条件の自動補正提案", en: "Automatic collection from PLCs and sensors, IoT, production-system integration → real-time anomaly detection, predictive maintenance alerts, automatic GPC-condition correction proposals", id: "Pengumpulan otomatis dari PLC dan sensor, IoT, integrasi sistem produksi → deteksi anomali real-time, peringatan pemeliharaan prediktif, usulan koreksi kondisi GPC otomatis" }, tone: "navy" },
          { label: { ja: "Level 2", en: "Level 2", id: "Level 2" }, title: { ja: "デジタイゼーション", en: "Digitisation", id: "Digitisasi" }, text: { ja: "Excel・スプレッドシート、タブレット入力、バーコードスキャン → データの自動集計、トレンドグラフの自動作成、V.Score・OEEの自動算出", en: "Spreadsheets, tablet input, barcode scanning → automatic aggregation, automatic trend graphs, automatic V.Score and OEE calculation", id: "Spreadsheet, input tablet, pemindaian barcode → agregasi otomatis, grafik tren otomatis, perhitungan V.Score dan OEE otomatis" }, tone: "blue" },
          { label: { ja: "Level 1", en: "Level 1", id: "Level 1" }, title: { ja: "アナログ", en: "Analog", id: "Analog" }, text: { ja: "ホワイトボードの写真、手書き日報のスキャン、ストップウォッチ計測 → 文字認識（OCR）でデジタル化、ナレッジベースに格納、手動入力の簡素化", en: "Photos of whiteboards, scanned handwritten reports, stopwatch timing → digitise with OCR, store in the knowledge base, simplify manual input", id: "Foto papan tulis, pindaian laporan tulisan tangan, pengukuran stopwatch → digitisasi dengan OCR, simpan di basis pengetahuan, sederhanakan input manual" }, tone: "green" }
        ] },
        { type: "table",
          head: [ { ja: "活動", en: "Activity", id: "Aktivitas" }, "Level 1", "Level 2", "Level 3" ],
          rows: [
            [ { ja: "CT計測", en: "CT measurement", id: "Pengukuran CT" }, { ja: "ストップウォッチ＋紙記録", en: "Stopwatch + paper", id: "Stopwatch + kertas" }, { ja: "タブレットでタップ計測", en: "Tap timing on a tablet", id: "Ketuk pengukuran di tablet" }, { ja: "センサー・カメラ画像認識による自動計測", en: "Automatic timing by sensors / camera image recognition", id: "Pengukuran otomatis dengan sensor / pengenalan gambar kamera" } ],
            [ { ja: "V.Score算出", en: "V.Score calculation", id: "Perhitungan V.Score" }, { ja: "電卓またはExcelで手動計算", en: "Manual by calculator or spreadsheet", id: "Manual dengan kalkulator atau spreadsheet" }, { ja: "テンプレートで自動", en: "Automatic with a template", id: "Otomatis dengan templat" }, { ja: "リアルタイムダッシュボード", en: "Real-time dashboard", id: "Dashboard real-time" } ],
            [ { ja: "GPCバンド監視", en: "GPC band monitoring", id: "Pemantauan GPC band" }, { ja: "定時点検（1日3回など）", en: "Scheduled checks (e.g. 3 times a day)", id: "Pengecekan terjadwal (mis. 3 kali sehari)" }, { ja: "日次自動集計・メール通知", en: "Daily automatic summary, email notice", id: "Ringkasan harian otomatis, notifikasi email" }, { ja: "リアルタイム監視・自動アラート", en: "Real-time monitoring, automatic alerts", id: "Pemantauan real-time, peringatan otomatis" } ],
            [ { ja: "ナレッジ蓄積", en: "Knowledge accumulation", id: "Akumulasi pengetahuan" }, { ja: "紙のファイル、改善事例集", en: "Paper files, case collection", id: "Berkas kertas, kumpulan kasus" }, { ja: "共有フォルダ＋検索", en: "Shared folder + search", id: "Folder bersama + pencarian" }, { ja: "AI検索、類似事例の自動推薦", en: "AI search, automatic similar-case recommendation", id: "Pencarian AI, rekomendasi kasus serupa otomatis" } ],
            [ { ja: "トリアージ判定", en: "Triage judgment", id: "Penilaian triase" }, { ja: "紙のチェックリスト", en: "Paper checklist", id: "Daftar periksa kertas" }, { ja: "Web画面の対話形式", en: "Interactive web form", id: "Formulir web interaktif" }, { ja: "AIによる自動判定・推薦", en: "Automatic judgment and recommendation by AI", id: "Penilaian dan rekomendasi otomatis oleh AI" } ]
          ],
          caption: { ja: "各デジタル化レベルでの改善活動", en: "Improvement activities at each digital level", id: "Aktivitas perbaikan di tiap level digital" }
        },
        { type: "widget", name: "sort-game", props: {
          title: { ja: "このやり方はどのデジタル化レベル？", en: "Which digital level is this practice?", id: "Praktik ini termasuk level digital mana?" },
          bins: [
            { id: "l1", label: { ja: "Level 1 アナログ", en: "Level 1 Analog", id: "Level 1 Analog" }, tone: "green" },
            { id: "l2", label: { ja: "Level 2 デジタイゼーション", en: "Level 2 Digitisation", id: "Level 2 Digitisasi" }, tone: "blue" },
            { id: "l3", label: { ja: "Level 3 デジタライゼーション", en: "Level 3 Digitalisation", id: "Level 3 Digitalisasi" }, tone: "navy" }
          ],
          items: [
            { bin: "l1", text: { ja: "班長がストップウォッチで10サイクル計測し、用紙に記入する", en: "The team leader times 10 cycles with a stopwatch and writes them on a sheet", id: "Ketua tim mengukur 10 siklus dengan stopwatch dan menulisnya di lembar" }, explain: { ja: "手動計測＋紙記録はLevel 1です。", en: "Manual timing + paper is Level 1.", id: "Pengukuran manual + kertas adalah Level 1." } },
            { bin: "l2", text: { ja: "入力したCTからテンプレートがV.Scoreとグラフを自動で作る", en: "A template automatically creates V.Score and graphs from entered CTs", id: "Templat otomatis membuat V.Score dan grafik dari CT yang diinput" }, explain: { ja: "表計算テンプレートによる自動集計はLevel 2です。", en: "Automatic aggregation with a spreadsheet template is Level 2.", id: "Agregasi otomatis dengan templat spreadsheet adalah Level 2." } },
            { bin: "l3", text: { ja: "設備の温度がGPCバンドを外れそうになると即座にアラートが出る", en: "An alert fires immediately when machine temperature is about to leave the GPC band", id: "Peringatan langsung muncul saat suhu mesin hampir keluar GPC band" }, explain: { ja: "リアルタイム監視・自動アラートはLevel 3です。", en: "Real-time monitoring with automatic alerts is Level 3.", id: "Pemantauan real-time dengan peringatan otomatis adalah Level 3." } },
            { bin: "l1", text: { ja: "定時にパラメータを確認し、チェックシートに○×を付ける（1日3回）", en: "Check parameters at fixed times and mark OK/NG on a check sheet (3 times a day)", id: "Cek parameter pada waktu tetap dan tandai OK/NG di lembar periksa (3 kali sehari)" }, explain: { ja: "定時点検＋チェックシートはLevel 1です。", en: "Scheduled checks + check sheet is Level 1.", id: "Pengecekan terjadwal + lembar periksa adalah Level 1." } },
            { bin: "l2", text: { ja: "タブレットの画面で課題を入力すると、質問形式でトリアージ結果が出る", en: "Entering an issue on a tablet gives a triage result through questions", id: "Memasukkan masalah di tablet memberi hasil triase melalui pertanyaan" }, explain: { ja: "Web画面の対話形式はLevel 2です。", en: "An interactive web form is Level 2.", id: "Formulir web interaktif adalah Level 2." } },
            { bin: "l3", text: { ja: "カメラ映像から作業サイクルを自動で切り出してCTを記録する", en: "Work cycles are automatically cut from camera video and CT is recorded", id: "Siklus kerja otomatis dipotong dari video kamera dan CT dicatat" }, explain: { ja: "画像認識による自動計測はLevel 3です。", en: "Automatic timing by image recognition is Level 3.", id: "Pengukuran otomatis dengan pengenalan gambar adalah Level 3." } },
            { bin: "l1", text: { ja: "ホワイトボードの改善記録を写真に撮って保管する", en: "Photograph the improvement record on the whiteboard and keep it", id: "Memotret catatan perbaikan di papan tulis dan menyimpannya" }, explain: { ja: "写真・スキャンからのデジタル化はLevel 1の入力方法です。", en: "Digitising photos and scans is a Level 1 input method.", id: "Digitisasi foto dan pindaian adalah metode input Level 1." } },
            { bin: "l2", text: { ja: "部品のバーコードをスキャンして投入ロットを記録する", en: "Scan part barcodes to record the lot used", id: "Memindai barcode part untuk mencatat lot yang dipakai" }, explain: { ja: "バーコードスキャンはLevel 2です。", en: "Barcode scanning is Level 2.", id: "Pemindaian barcode adalah Level 2." } }
          ]
        } }
      ]
    },
    {
      id: "migration",
      title: { ja: "デジタル化レベル移行の判断", en: "Deciding When to Move Up a Level", id: "Menentukan Kapan Naik Level" },
      blocks: [
        { type: "p", text: {
          ja: "デジタル化レベルは「高いほど良い」のではなく、**現場の困りごとに合わせて上げる**ものです。移行の目安は次のとおりです。",
          en: "A higher digital level is not automatically better; you **raise it to match a real pain on the shop floor**. Guidelines for moving up:",
          id: "Level digital lebih tinggi tidak otomatis lebih baik; Anda **menaikkannya sesuai kesulitan nyata di lantai produksi**. Panduan untuk naik level:"
        } },
        { type: "flow", dir: "h", nodes: [
          { title: { ja: "Level 1", en: "Level 1", id: "Level 1" }, text: { ja: "まず思考法を浸透", en: "Spread the thinking first", id: "Sebarkan cara berpikir dulu" }, tone: "green" },
          { title: { ja: "→ Level 2 の条件", en: "→ Level 2 when", id: "→ Level 2 jika" }, text: { ja: "手動入力の負荷が高く、集計に時間がかかる", en: "Manual input is heavy and aggregation takes too long", id: "Input manual berat dan agregasi terlalu lama" }, tone: "blue" },
          { title: { ja: "→ Level 3 の条件", en: "→ Level 3 when", id: "→ Level 3 jika" }, text: { ja: "リアルタイム対応が必要、または異常検知の自動化が求められる", en: "Real-time response is needed, or anomaly detection must be automated", id: "Respons real-time diperlukan, atau deteksi anomali harus diotomatisasi" }, tone: "navy" }
        ] },
        { type: "check",
          q: { ja: "ある工程では毎日30分かけて手書きのCT記録を集計しているが、異常はほとんど起きず、翌日の対応で十分間に合っている。適切な判断は？", en: "A process spends 30 minutes daily aggregating handwritten CT records, but abnormalities are rare and next-day response is fast enough. What is the right decision?", id: "Sebuah proses menghabiskan 30 menit setiap hari untuk merekap catatan CT tulisan tangan, tetapi abnormalitas jarang dan respons hari berikutnya sudah cukup. Keputusan yang tepat?" },
          choices: [
            { ja: "Level 3に一気に移行し、リアルタイム監視を導入する", en: "Jump to Level 3 and introduce real-time monitoring", id: "Langsung ke Level 3 dan pasang pemantauan real-time" },
            { ja: "集計負荷を下げるためLevel 2（入力テンプレート・自動集計）を検討する", en: "Consider Level 2 (input template, automatic aggregation) to reduce the aggregation load", id: "Pertimbangkan Level 2 (templat input, agregasi otomatis) untuk mengurangi beban rekap" },
            { ja: "デジタル化は不要なので、集計そのものをやめる", en: "Digitalisation is unnecessary, so stop aggregating altogether", id: "Digitalisasi tidak perlu, jadi hentikan rekap sama sekali" }
          ],
          answer: 1,
          explain: { ja: "困りごとは「集計の手間」で、リアルタイム性は求められていません。Level 1→2の移行条件に当てはまります。", en: "The pain is aggregation effort, not real-time need — the Level 1 → 2 condition.", id: "Kesulitannya adalah upaya rekap, bukan kebutuhan real-time — syarat Level 1 → 2." }
        },
        { type: "callout", kind: "zeva", title: { ja: "導入の順番", en: "Order of introduction", id: "Urutan penerapan" }, text: {
          ja: "ZEVA導入ステップのうち、理論値の明確化・トリアージ体制・Quick GPCの開始まではLevel 1で十分です。Deep GPC案件ではLevel 2が推奨され、水平展開の段階でLevel 2〜3へ段階的に上げていきます。",
          en: "In the ZEVA implementation steps, clarifying the theoretical value, building triage and starting Quick GPC all work at Level 1. Level 2 is recommended for Deep GPC projects, and you raise to Level 2–3 gradually during rollout.",
          id: "Dalam langkah penerapan ZEVA, memperjelas nilai teoretis, membangun triase, dan memulai Quick GPC semuanya cukup di Level 1. Level 2 disarankan untuk proyek Deep GPC, dan naik bertahap ke Level 2–3 saat perluasan."
        } }
      ]
    },
    {
      id: "system",
      title: { ja: "ZEVAシステムに求められる4つの機能", en: "Four Functions a ZEVA System Needs", id: "Empat Fungsi yang Dibutuhkan Sistem ZEVA" },
      blocks: [
        { type: "p", text: {
          ja: "[[hybrid-triage]]モデルを仕組みとして支えるため、ZEVAシステムには次の機能が求められます。紙やExcelで代替することもでき、デジタル化レベルに応じて実装の形が変わります。",
          en: "To support the [[hybrid-triage]] model as a mechanism, a ZEVA system needs the following functions. They can also be substituted with paper or spreadsheets; their form changes with the digital level.",
          id: "Untuk mendukung model [[hybrid-triage]] sebagai mekanisme, sistem ZEVA memerlukan fungsi berikut. Fungsi ini juga bisa digantikan kertas atau spreadsheet; bentuknya berubah sesuai level digital."
        } },
        { type: "cards", cols: 2, items: [
          { icon: "🧭", tone: "navy", title: { ja: "インテリジェント・トリアージ", en: "Intelligent triage", id: "Triase cerdas" }, text: {
            ja: "「不良が出た」「CTが遅い」などの入力に対し、4基準（原因の見当・変数の数・リスク・データ）を対話形式で質問し、Quick/Deepを推奨。適切なテンプレートとガイドを提示する。",
            en: "For inputs like “defects appeared” or “CT is slow”, asks the four criteria (cause idea, number of variables, risk, data) interactively, recommends Quick or Deep, and presents the right template and guide.",
            id: "Untuk masukan seperti “muncul cacat” atau “CT lambat”, menanyakan empat kriteria (dugaan penyebab, jumlah variabel, risiko, data) secara interaktif, merekomendasikan Quick atau Deep, dan menyajikan templat serta panduan yang sesuai."
          } },
          { icon: "📚", tone: "blue", title: { ja: "ナレッジ統合データベース", en: "Integrated knowledge database", id: "Basis data pengetahuan terpadu" }, text: {
            ja: "小さな改善（Quick）と大きな改善（Deep）を区別しつつ同じ[[knowledge-base]]で管理。失敗を含む類似トライを即座に検索でき、無駄な再実験を防ぐ。GPC-M/GPC-H別に整理し横断検索も可能。",
            en: "Manages small (Quick) and large (Deep) improvements in one [[knowledge-base]] while keeping them distinct. Similar trials — including failures — can be found instantly, preventing wasted re-experiments. Organised by GPC-M/GPC-H with cross search.",
            id: "Mengelola perbaikan kecil (Quick) dan besar (Deep) dalam satu [[knowledge-base]] namun tetap terpisah. Uji serupa — termasuk yang gagal — dapat dicari seketika, mencegah eksperimen ulang yang sia-sia. Disusun per GPC-M/GPC-H dengan pencarian lintas."
          } },
          { icon: "⚡", tone: "green", title: { ja: "アジャイル標準書更新（Quick GPC用）", en: "Agile standard update (for Quick GPC)", id: "Pembaruan standar agile (untuk Quick GPC)" }, text: {
            ja: "成功した改善を[[temporary-standard]]として即日適用する特急レーン。有効期限は最大30日（期限内に正式承認）、適用は単一ライン限定、変更前を自動バックアップしていつでもロールバック可能。",
            en: "A fast lane to apply a successful improvement the same day as a [[temporary-standard]]. Valid for up to 30 days (formal approval within that time), limited to a single line, with automatic backup of the previous state for rollback at any time.",
            id: "Jalur cepat untuk menerapkan perbaikan yang berhasil pada hari yang sama sebagai [[temporary-standard]]. Berlaku maksimal 30 hari (persetujuan resmi dalam periode itu), terbatas satu lini, dengan cadangan otomatis kondisi sebelumnya untuk rollback kapan saja."
          } },
          { icon: "📊", tone: "amber", title: { ja: "分析支援（Deep GPC用）", en: "Analysis support (for Deep GPC)", id: "Dukungan analisis (untuk Deep GPC)" }, text: {
            ja: "データ投入時の相関関係の自動可視化、サンプリング計画の自動作成、X̄-R管理図の自動生成、不良率・V.Scoreの自動算出とトレンド表示。統計に不慣れな人もDMAICを進めやすくする。",
            en: "Automatic correlation visualisation when data is loaded, automatic sampling plans, automatic X̄-R charts, automatic defect rate and V.Score with trends — making DMAIC easier for people new to statistics.",
            id: "Visualisasi korelasi otomatis saat data dimasukkan, rencana sampling otomatis, peta X̄-R otomatis, tingkat cacat dan V.Score otomatis dengan tren — memudahkan DMAIC bagi yang belum terbiasa statistik."
          } }
        ] },
        { type: "callout", kind: "note", title: { ja: "失敗事例も資産", en: "Failures are assets too", id: "Kegagalan juga aset" }, text: {
          ja: "ナレッジベースに失敗したトライを登録するのは、同じ失敗の再実験を防ぐためです。成功/失敗パターンが蓄積するほど、トリアージの精度も上がります。",
          en: "Failed trials are registered in the knowledge base to stop the same failure being re-tested. The more success/failure patterns accumulate, the more accurate triage becomes.",
          id: "Uji yang gagal didaftarkan di basis pengetahuan agar kegagalan yang sama tidak diuji ulang. Makin banyak pola berhasil/gagal terkumpul, makin akurat triase."
        } }
      ]
    },
    {
      id: "ai",
      title: { ja: "AI技術の位置づけ：バラツキを吸収・可視化する武器", en: "Where AI Fits: A Weapon to Absorb and Visualise Variation", id: "Posisi AI: Senjata untuk Menyerap dan Memvisualkan Variasi" },
      blocks: [
        { type: "p", text: {
          ja: "ZEVAの文脈では、AIやデジタル化は単なる自動化ツールではありません。人が介在することで避けられない「どうしても無くせないバラツキ」を**吸収・可視化する武器**です。特に、人の感覚やスキルへの依存度が高く、手順書の標準化だけではバラツキを無くしにくい工程で効果を発揮します。自動化設備の投資対効果が出にくい人作業中心の現場では、「人の作業を残しつつ技術でバラツキを吸収する」という選択肢にもなります。",
          en: "In ZEVA, AI and digitalisation are not mere automation tools. They are **weapons to absorb and visualise** the variation that cannot be removed when people are involved. They are most effective where work depends heavily on human senses and skill and standard procedures alone cannot remove variation. On people-centred sites where automation is hard to justify financially, they also offer the option “keep human work, absorb variation with technology”.",
          id: "Dalam ZEVA, AI dan digitalisasi bukan sekadar alat otomasi. Keduanya adalah **senjata untuk menyerap dan memvisualkan** variasi yang tidak bisa dihilangkan ketika manusia terlibat. Paling efektif di proses yang sangat bergantung pada indera dan keterampilan manusia, di mana prosedur standar saja tidak mampu menghilangkan variasi. Di lokasi berbasis tenaga manusia yang sulit membenarkan investasi otomasi, teknologi ini juga memberi pilihan “pertahankan kerja manusia, serap variasi dengan teknologi”."
        } },
        { type: "table",
          head: [ { ja: "技術（一般的な例）", en: "Technology (generic example)", id: "Teknologi (contoh umum)" }, { ja: "狙うバラツキ", en: "Variation targeted", id: "Variasi yang disasar" }, { ja: "効果", en: "Effect", id: "Efek" } ],
          rows: [
            [ { ja: "AI画像検査（物体検出）", en: "AI visual inspection (object detection)", id: "Inspeksi visual AI (deteksi objek)" }, { ja: "判断のバラツキ（Man）、解釈のバラツキ（Method）", en: "Judgment variation (Man), interpretation variation (Method)", id: "Variasi penilaian (Man), variasi interpretasi (Method)" }, { ja: "部品の有無・位置・種類、同梱品チェックなどを客観化し、人に依存しない品質保証へ", en: "Objectifies checks such as part presence, position, type and packing contents — quality assurance not dependent on people", id: "Mengobjektifkan pengecekan seperti keberadaan, posisi, jenis part, dan isi kemasan — jaminan kualitas yang tidak bergantung pada orang" } ],
            [ { ja: "動画による作業分析", en: "Video-based work analysis", id: "Analisis kerja berbasis video" }, { ja: "方法のバラツキ（Method）、潜在的なムダ", en: "Method variation, hidden waste", id: "Variasi metode, pemborosan tersembunyi" }, { ja: "コマ送りで価値/準価値/無価値を分類・時間計測し、熟練者と新人の動作を比較", en: "Classifies value/semi/non-value frame by frame, times elements, compares experts and newcomers", id: "Mengklasifikasikan bernilai/semi/tidak bernilai bingkai demi bingkai, mengukur waktu, membandingkan ahli dan pemula" } ],
            [ { ja: "骨格（姿勢）推定による動作解析", en: "Motion analysis by skeleton (pose) estimation", id: "Analisis gerakan dengan estimasi kerangka (pose)" }, { ja: "技能のバラツキ（Man）＝「コツ・カン」", en: "Skill variation (Man) = knacks and intuition", id: "Variasi keterampilan (Man) = kiat dan intuisi" }, { ja: "暗黙知を動作データとして可視化し、技能の標準化や教育に活用", en: "Visualises tacit knowledge as motion data for skill standardisation and training", id: "Memvisualkan pengetahuan tacit sebagai data gerakan untuk standardisasi keterampilan dan pelatihan" } ],
            [ { ja: "IoT・センサー", en: "IoT and sensors", id: "IoT dan sensor" }, { ja: "設備・環境のバラツキ（Machine, Environment）", en: "Machine and environment variation", id: "Variasi mesin dan lingkungan" }, { ja: "稼働状況・温湿度のリアルタイム監視、異常検知、予兆管理", en: "Real-time monitoring of operation and temperature/humidity, anomaly detection, early warning", id: "Pemantauan real-time operasi dan suhu/kelembapan, deteksi anomali, peringatan dini" } ]
          ]
        },
        { type: "callout", kind: "warn", title: { ja: "技術導入が目的化しないように", en: "Do not let technology become the goal", id: "Jangan jadikan teknologi sebagai tujuan" }, text: {
          ja: "AI・デジタル化はZEVAの「バラツキ撲滅」を達成する手段です。常にZEVAが中心にあることを忘れず、「このツールはどのバラツキ（7要因のどれ）を吸収・可視化するのか」を説明できない導入は見直しましょう。また、AI検査の判定精度自体も測定システムの一種としてMSAの考え方で確認します。",
          en: "AI and digitalisation are means to achieve ZEVA's elimination of variation. Keep ZEVA at the centre; reconsider any introduction that cannot explain “which variation (which of the seven factors) this tool absorbs or visualises”. Also, verify the accuracy of AI inspection itself as a measurement system, using MSA thinking.",
          id: "AI dan digitalisasi adalah sarana untuk mencapai penghapusan variasi ZEVA. Jadikan ZEVA tetap pusat; tinjau ulang penerapan yang tidak bisa menjelaskan “variasi mana (faktor mana dari tujuh) yang diserap atau divisualkan alat ini”. Selain itu, verifikasi akurasi inspeksi AI sebagai sistem pengukuran dengan cara berpikir MSA."
        } }
      ]
    }
  ],
  keyPoints: [
    { ja: "デジタル化は必須条件ではなく加速装置。Level 1（アナログ）でもZEVAは完全に機能する", en: "Digitalisation is an accelerator, not a prerequisite. ZEVA works fully at Level 1 (analog)", id: "Digitalisasi adalah akselerator, bukan prasyarat. ZEVA berfungsi penuh di Level 1 (analog)" },
    { ja: "デジタル化レベルは改善の質とは独立。困りごと（集計負荷→Level 2、リアルタイム性→Level 3）に合わせて上げる", en: "The digital level is independent of improvement quality; raise it to match the pain (aggregation load → Level 2, real-time → Level 3)", id: "Level digital tidak bergantung pada kualitas perbaikan; naikkan sesuai kesulitan (beban rekap → Level 2, real-time → Level 3)" },
    { ja: "ZEVAシステムの4機能：インテリジェント・トリアージ、ナレッジ統合DB、アジャイル標準書更新、分析支援", en: "Four ZEVA system functions: intelligent triage, integrated knowledge DB, agile standard update, analysis support", id: "Empat fungsi sistem ZEVA: triase cerdas, basis data pengetahuan terpadu, pembaruan standar agile, dukungan analisis" },
    { ja: "暫定標準は最大30日・単一ライン限定・ロールバック可能", en: "Temporary standards: max 30 days, single line only, rollback possible", id: "Standar sementara: maks 30 hari, hanya satu lini, bisa rollback" },
    { ja: "AIはバラツキを吸収・可視化する武器。常にZEVAが中心", en: "AI is a weapon to absorb and visualise variation; ZEVA stays at the centre", id: "AI adalah senjata untuk menyerap dan memvisualkan variasi; ZEVA tetap menjadi pusat" }
  ],
  quiz: [
    { q: { ja: "ZEVAにおけるデジタル化の位置づけとして正しいものは？", en: "How does ZEVA position digitalisation?", id: "Bagaimana ZEVA memposisikan digitalisasi?" },
      choices: [
        { ja: "ZEVAを始めるための必須条件", en: "A prerequisite for starting ZEVA", id: "Prasyarat untuk memulai ZEVA" },
        { ja: "改善を速くするための加速装置（オプション）", en: "An optional accelerator that speeds up improvement", id: "Akselerator opsional yang mempercepat perbaikan" },
        { ja: "改善活動の質を決める最重要要素", en: "The most important factor deciding improvement quality", id: "Faktor terpenting penentu kualitas perbaikan" },
        { ja: "Deep GPCでのみ使うもの", en: "Something used only in Deep GPC", id: "Hanya dipakai dalam Deep GPC" }
      ], answer: 1,
      explain: { ja: "アナログでも回り、デジタル化で速度とカバレッジが上がる設計です。", en: "It works in analog; digitalisation raises speed and coverage.", id: "Berjalan secara analog; digitalisasi menaikkan kecepatan dan cakupan." } },
    { q: { ja: "Level 1からLevel 2への移行を検討すべき状況は？", en: "When should moving from Level 1 to Level 2 be considered?", id: "Kapan perlu mempertimbangkan naik dari Level 1 ke Level 2?" },
      choices: [
        { ja: "リアルタイムの異常検知が必要になった", en: "Real-time anomaly detection is needed", id: "Deteksi anomali real-time diperlukan" },
        { ja: "手動データ入力の負荷が高く、集計に時間がかかる", en: "Manual data input is heavy and aggregation takes long", id: "Input data manual berat dan rekap memakan waktu" },
        { ja: "予算が余った", en: "There is spare budget", id: "Ada anggaran lebih" },
        { ja: "トリアージが不要になった", en: "Triage is no longer needed", id: "Triase tidak diperlukan lagi" }
      ], answer: 1,
      explain: { ja: "Level 1→2は集計負荷、Level 2→3はリアルタイム性・異常検知の自動化が目安です。", en: "Level 1 → 2 is about aggregation load; Level 2 → 3 about real-time response and automated anomaly detection.", id: "Level 1 → 2 terkait beban rekap; Level 2 → 3 terkait respons real-time dan deteksi anomali otomatis." } },
    { q: { ja: "GPCバンドを「1日3回の定時点検」で監視している。デジタル化レベルは？", en: "The GPC band is monitored by “scheduled checks three times a day”. Which digital level?", id: "GPC band dipantau dengan “pengecekan terjadwal tiga kali sehari”. Level digital berapa?" },
      choices: [ { ja: "Level 1", en: "Level 1", id: "Level 1" }, { ja: "Level 2", en: "Level 2", id: "Level 2" }, { ja: "Level 3", en: "Level 3", id: "Level 3" }, { ja: "デジタル化の対象外", en: "Outside digitalisation", id: "Di luar digitalisasi" } ], answer: 0,
      explain: { ja: "定時点検はLevel 1、日次自動集計・通知はLevel 2、リアルタイム監視はLevel 3です。", en: "Scheduled checks = Level 1; daily automatic summary = Level 2; real-time monitoring = Level 3.", id: "Pengecekan terjadwal = Level 1; ringkasan harian otomatis = Level 2; pemantauan real-time = Level 3." } },
    { q: { ja: "アジャイル標準書更新機能の暫定標準の条件として正しいものは？", en: "Which is a correct condition of a temporary standard in the agile standard update function?", id: "Mana syarat yang benar untuk standar sementara dalam fungsi pembaruan standar agile?" },
      choices: [
        { ja: "有効期限なし、全ラインに即時展開", en: "No expiry, rolled out to all lines immediately", id: "Tanpa kedaluwarsa, langsung ke semua lini" },
        { ja: "最大30日、単一ライン限定、ロールバック可能", en: "Max 30 days, single line only, rollback possible", id: "Maks 30 hari, hanya satu lini, bisa rollback" },
        { ja: "最大1年、承認不要", en: "Max 1 year, no approval needed", id: "Maks 1 tahun, tanpa persetujuan" },
        { ja: "Deep GPCでのみ使用", en: "Used only in Deep GPC", id: "Hanya dipakai di Deep GPC" }
      ], answer: 1,
      explain: { ja: "暫定標準は30日以内に正式承認し、水平展開は正式承認後です。", en: "Formal approval within 30 days; horizontal rollout only after approval.", id: "Persetujuan resmi dalam 30 hari; perluasan horizontal hanya setelah disetujui." } },
    { q: { ja: "ナレッジ統合データベースに失敗したトライも登録する主な理由は？", en: "Why are failed trials also registered in the integrated knowledge database?", id: "Mengapa uji yang gagal juga didaftarkan di basis data pengetahuan terpadu?" },
      choices: [
        { ja: "担当者の評価に使うため", en: "To evaluate the person in charge", id: "Untuk menilai penanggung jawab" },
        { ja: "無駄な再実験を防ぎ、トリアージの精度を上げるため", en: "To prevent wasted re-experiments and improve triage accuracy", id: "Untuk mencegah eksperimen ulang yang sia-sia dan meningkatkan akurasi triase" },
        { ja: "データ量を増やすため", en: "To increase data volume", id: "Untuk menambah volume data" },
        { ja: "規則で決まっているだけで意味はない", en: "Only because rules require it; no real purpose", id: "Hanya karena aturan; tidak ada tujuan nyata" }
      ], answer: 1,
      explain: { ja: "失敗事例も重要なナレッジで、同じ失敗の繰り返しを防ぎます。", en: "Failures are important knowledge that stops the same failure recurring.", id: "Kegagalan adalah pengetahuan penting yang mencegah kegagalan yang sama terulang." } },
    { q: { ja: "ZEVAにおけるAI技術の正しい位置づけは？", en: "What is the correct position of AI in ZEVA?", id: "Apa posisi AI yang benar dalam ZEVA?" },
      choices: [
        { ja: "人を置き換えることが目的の自動化ツール", en: "An automation tool whose goal is replacing people", id: "Alat otomasi yang bertujuan menggantikan manusia" },
        { ja: "ZEVAに代わる新しい改善体系", en: "A new improvement system that replaces ZEVA", id: "Sistem perbaikan baru yang menggantikan ZEVA" },
        { ja: "どうしても無くせないバラツキを吸収・可視化する武器で、常にZEVAが中心", en: "A weapon to absorb and visualise variation that cannot be removed, with ZEVA always at the centre", id: "Senjata untuk menyerap dan memvisualkan variasi yang tidak bisa dihilangkan, dengan ZEVA selalu sebagai pusat" },
        { ja: "標準化が不要になる技術", en: "A technology that makes standardisation unnecessary", id: "Teknologi yang membuat standardisasi tidak perlu" }
      ], answer: 2,
      explain: { ja: "技術導入が目的ではなく、ZEVAの理念実現が目的です。", en: "The goal is realising ZEVA, not introducing technology.", id: "Tujuannya mewujudkan ZEVA, bukan memperkenalkan teknologi." } },
    { q: { ja: "AI画像検査が主に吸収するバラツキは？", en: "Which variation does AI visual inspection mainly absorb?", id: "Variasi mana yang terutama diserap inspeksi visual AI?" },
      choices: [
        { ja: "人の判断のバラツキと、方法の解釈のバラツキ", en: "Human judgment variation and method interpretation variation", id: "Variasi penilaian manusia dan variasi interpretasi metode" },
        { ja: "材料ロットの成分のバラツキ", en: "Composition variation between material lots", id: "Variasi komposisi antar lot material" },
        { ja: "生産計画のバラツキ", en: "Production planning variation", id: "Variasi perencanaan produksi" },
        { ja: "意図的な実験変動", en: "Intentional experimental variation", id: "Variasi eksperimen yang disengaja" }
      ], answer: 0,
      explain: { ja: "集中力や解釈に依存する検査を定量化し、Man・Methodのバラツキを排除します。", en: "It quantifies inspections that depend on attention and interpretation, removing Man and Method variation.", id: "Mengkuantifikasi inspeksi yang bergantung pada konsentrasi dan interpretasi, menghilangkan variasi Man dan Method." } }
  ]
});
