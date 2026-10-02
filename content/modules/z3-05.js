ZA.addModule({
  id: "z3-05",
  track: "z3",
  order: 5,
  minutes: 45,
  icon: "🚀",
  level: 3,
  prereq: ["z3-01", "z3-02", "z3-04"],
  title: {
    ja: "導入プロセスと成功要因",
    en: "Implementation Process and Success Factors",
    id: "Proses Penerapan dan Faktor Keberhasilan"
  },
  summary: {
    ja: "ZEVAを現場と組織に根付かせるための6つの導入ステップ、成功要因、よくある障壁と対処法、組織文化づくり、導入チェックリストを学びます。",
    en: "Learn the six implementation steps for rooting ZEVA in the shop floor and organisation, success factors, common barriers and countermeasures, culture building, and the implementation checklists.",
    id: "Pelajari enam langkah penerapan untuk menanamkan ZEVA di lantai produksi dan organisasi, faktor keberhasilan, hambatan umum dan penanganannya, pembentukan budaya, serta daftar periksa penerapan."
  },
  objectives: [
    { ja: "ZEVA導入の6ステップと期間・デジタル化レベルの目安を説明できる", en: "Explain the six ZEVA implementation steps with duration and digital-level guidelines", id: "Menjelaskan enam langkah penerapan ZEVA beserta pedoman durasi dan level digital" },
    { ja: "Deep標準化の手順（Step 0〜8）と監査6軸を使って標準をつくれる", en: "Build a standard using the Deep standardisation procedure (Steps 0–8) and the 6 audit axes", id: "Menyusun standar dengan prosedur standardisasi Deep (Langkah 0–8) dan 6 sumbu audit" },
    { ja: "スモールスタートとクイックウィンの意義を説明できる", en: "Explain the value of a small start and quick wins", id: "Menjelaskan nilai memulai kecil dan kemenangan cepat" },
    { ja: "よくある障壁に対し、ZEVAの仕組みを使った対処法を提示できる", en: "Offer countermeasures to common barriers using ZEVA mechanisms", id: "Menawarkan penanganan hambatan umum dengan mekanisme ZEVA" },
    { ja: "チェックリストで導入準備・トリアージ・各GPCの抜け漏れを確認できる", en: "Use checklists to catch gaps in preparation, triage and each GPC mode", id: "Memakai daftar periksa untuk menemukan celah dalam persiapan, triase, dan tiap mode GPC" }
  ],
  sections: [
    {
      id: "steps",
      title: { ja: "導入の基本ステップ", en: "Basic Implementation Steps", id: "Langkah Dasar Penerapan" },
      blocks: [
        { type: "p", text: {
          ja: "ZEVAの導入は、まずトリアージの仕組みを構築し、その後[[gpc-m]]と[[gpc-h]]を並行して進めます。どこから手を付けるかは、**理論値とのギャップ**で決めます。",
          en: "ZEVA implementation first builds the triage mechanism, then advances [[gpc-m]] and [[gpc-h]] in parallel. Where to start is decided by the **gap to the theoretical value**.",
          id: "Penerapan ZEVA pertama-tama membangun mekanisme triase, lalu menjalankan [[gpc-m]] dan [[gpc-h]] secara paralel. Titik awal ditentukan oleh **selisih terhadap nilai teoretis**."
        } },
        { type: "table",
          head: [ { ja: "Step", en: "Step", id: "Langkah" }, { ja: "活動", en: "Activity", id: "Aktivitas" }, { ja: "期間目安", en: "Duration", id: "Durasi" }, { ja: "デジタル化レベル", en: "Digital level", id: "Level digital" } ],
          rows: [
            [ "1", { ja: "理論値の明確化、ギャップの可視化", en: "Clarify the theoretical value, visualise the gap", id: "Perjelas nilai teoretis, visualkan selisih" }, { ja: "2週間", en: "2 weeks", id: "2 minggu" }, { ja: "Level 1でOK", en: "Level 1 is fine", id: "Level 1 cukup" } ],
            [ "2", { ja: "トリアージ体制の構築、判定基準の教育", en: "Build the triage structure, teach the criteria", id: "Bangun struktur triase, ajarkan kriteria" }, { ja: "1週間", en: "1 week", id: "1 minggu" }, { ja: "Level 1でOK", en: "Level 1 is fine", id: "Level 1 cukup" } ],
            [ "3", { ja: "モデルライン選定、Quick GPC（H-T-C-A）の実践開始", en: "Select a model line, start Quick GPC (H-T-C-A)", id: "Pilih lini model, mulai Quick GPC (H-T-C-A)" }, { ja: "1週間", en: "1 week", id: "1 minggu" }, { ja: "Level 1でOK", en: "Level 1 is fine", id: "Level 1 cukup" } ],
            [ "4", { ja: "Deep GPC（DMAIC）案件の選定、プロジェクト化", en: "Select Deep GPC (DMAIC) cases, set up projects", id: "Pilih kasus Deep GPC (DMAIC), bentuk proyek" }, { ja: "2週間", en: "2 weeks", id: "2 minggu" }, { ja: "Level 2推奨", en: "Level 2 recommended", id: "Level 2 disarankan" } ],
            [ "5", { ja: "ナレッジベースの構築開始、成功/失敗事例の蓄積", en: "Start the knowledge base, accumulate success/failure cases", id: "Mulai basis pengetahuan, kumpulkan kasus berhasil/gagal" }, { ja: "継続", en: "Ongoing", id: "Berkelanjutan" }, { ja: "Level 1〜", en: "Level 1+", id: "Level 1+" } ],
            [ "6", { ja: "水平展開、デジタル化レベルの段階的向上", en: "Horizontal rollout, gradual digital-level increase", id: "Perluasan horizontal, peningkatan level digital bertahap" }, { ja: "3ヶ月〜", en: "3 months+", id: "3 bulan+" }, { ja: "Level 2〜3", en: "Level 2–3", id: "Level 2–3" } ]
          ],
          caption: { ja: "期間は目安であり、現場の規模により調整する", en: "Durations are guidelines; adjust to site scale", id: "Durasi adalah pedoman; sesuaikan dengan skala lokasi" }
        },
        { type: "flow", dir: "h", nodes: [
          { title: { ja: "ギャップで優先順位", en: "Prioritise by gap", id: "Prioritas berdasarkan selisih" }, text: { ja: "理論値との差が大きいところから", en: "Start where the gap to the theoretical value is largest", id: "Mulai dari selisih terbesar terhadap nilai teoretis" }, tone: "navy" },
          { title: { ja: "スモールスタート", en: "Small start", id: "Mulai kecil" }, text: { ja: "モデルラインで成功事例を作る", en: "Create a success story on a model line", id: "Buat kisah sukses di lini model" }, tone: "blue" },
          { title: { ja: "クイックウィン", en: "Quick win", id: "Kemenangan cepat" }, text: { ja: "Quick GPCで早期に成果を出し信頼を得る", en: "Deliver early results with Quick GPC to earn trust", id: "Hasilkan capaian awal dengan Quick GPC untuk meraih kepercayaan" }, tone: "green" },
          { title: { ja: "デジタル化は後から", en: "Digitalisation later", id: "Digitalisasi belakangan" }, text: { ja: "まずアナログで思考法を浸透", en: "Spread the thinking in analog first", id: "Sebarkan cara berpikir secara analog dulu" }, tone: "amber" }
        ] },
        { type: "callout", kind: "zeva", title: { ja: "ロードマップと原則体系の対応", en: "Roadmap vs principle system", id: "Peta jalan vs sistem prinsip" }, text: {
          ja: "現場の改善ロードマップで見ると、STEP 1〜2（現状診断・徹底的な標準化）が**土台**の構築、STEP 3〜5（価値作業分析・目標設定・改善実行）が**3原則**に基づく改善に対応します。土台を飛ばして改善に入ると、データが信頼できず好循環が立ち上がりません。",
          en: "In the shop-floor improvement roadmap, STEP 1–2 (diagnosis, thorough standardisation) build the **foundation**, and STEP 3–5 (value-work analysis, target setting, improvement) apply the **three principles**. Skipping the foundation means unreliable data, and the virtuous cycle never starts.",
          id: "Dalam peta jalan perbaikan lapangan, LANGKAH 1–2 (diagnosis, standardisasi menyeluruh) membangun **fondasi**, dan LANGKAH 3–5 (analisis kerja bernilai, penetapan target, perbaikan) menerapkan **tiga prinsip**. Melewatkan fondasi berarti data tidak andal, dan siklus positif tidak pernah dimulai."
        } },
        { type: "callout", kind: "tip", title: { ja: "標準化はQuick標準化で速く始める", en: "Start standardisation fast with Quick standardisation", id: "Mulai standardisasi dengan cepat lewat standardisasi Quick" }, text: {
          ja: "「徹底的な標準化」は、全工程に詳しい手順をかけるという意味ではありません。通常は[[quick-standardization]]で初期標準を当日〜3日以内に決め、[[deep-standardization]]は安全・仕様が絡む箇所に絞ります（[[initial-standard]]の考え方はモジュール「原則体系」で学びます）。",
          en: "“Thorough standardisation” does not mean applying a detailed procedure to every process. Normally decide the initial standard on the same day, or within 3 days at most with [[quick-standardization|Quick standardisation]], and limit [[deep-standardization|Deep standardisation]] to places involving safety or specifications (the [[initial-standard]] is covered in the “Principle system” module).",
          id: "“Standardisasi menyeluruh” bukan berarti menerapkan prosedur rinci ke semua proses. Biasanya tetapkan standar awal pada hari yang sama, paling lambat dalam 3 hari dengan [[quick-standardization]], dan batasi [[deep-standardization]] pada bagian yang menyangkut keselamatan atau spesifikasi ([[initial-standard]] dibahas di modul “Sistem prinsip”)."
        } }
      ]
    },
    {
      id: "standardization",
      title: { ja: "標準化の進め方：Deep標準化の手順", en: "How to Standardise: the Deep Standardisation Procedure", id: "Cara Standardisasi: Prosedur Standardisasi Deep" },
      blocks: [
        { type: "p", text: {
          ja: "標準化は「決める → 守る → 改める」を枠とし、通常はQuick標準化で進めます。Deep標準化の適用基準（安全・重要品質特性・法規、仕様要求が絡む条件、Quick標準化の後も残るバラツキ、新製品・新ライン・設備更新の立ち上げ、Deep GPC案件）に当たった工程・項目にだけ、次の手順をかけます。振り分けは班長が判断し、工程技術者が確認します。",
          en: "Standardisation uses “decide → keep → revise” as its frame and normally proceeds with Quick standardisation. Only processes or items that meet the Deep standardisation criteria (safety, critical quality characteristics or regulations; conditions tied to specification requirements; variation that remains after Quick standardisation; launches of new products or new lines, or equipment renewal; Deep GPC cases) get the procedure below. The team leader decides which mode applies (Quick or Deep), and the process engineer confirms it.",
          id: "Standardisasi memakai “tetapkan → jaga → revisi” sebagai kerangka dan biasanya berjalan dengan standardisasi Quick. Hanya proses atau item yang memenuhi kriteria standardisasi Deep (keselamatan, karakteristik mutu penting, atau peraturan; kondisi yang terkait persyaratan spesifikasi; variasi yang tetap ada setelah standardisasi Quick; peluncuran produk baru, lini baru, atau pembaruan peralatan; kasus Deep GPC) yang diberi prosedur berikut. Ketua tim menentukan mode (Quick atau Deep) dan insinyur proses mengonfirmasinya."
        } },
        { type: "table",
          head: [ { ja: "Step", en: "Step", id: "Langkah" }, { ja: "名称", en: "Name", id: "Nama" }, { ja: "内容", en: "What to do", id: "Yang dilakukan" } ],
          rows: [
            [ "0", { ja: "範囲", en: "Scope", id: "Cakupan" }, { ja: "対象の製品と工程を決める", en: "Decide the target product and process", id: "Tentukan produk dan proses sasaran" } ],
            [ "1", { ja: "仕様", en: "Specification", id: "Spesifikasi" }, { ja: "製品・品質、設備・治具、材料・環境の根拠を集め、仕様要求と現場の習慣を分ける", en: "Collect the basis for product/quality, equipment/jigs and material/environment; separate specification requirements from floor habits", id: "Kumpulkan dasar untuk produk/mutu, peralatan/jig, dan material/lingkungan; pisahkan persyaratan spesifikasi dari kebiasaan lapangan" } ],
            [ "2", { ja: "分解", en: "Break down", id: "Uraikan" }, { ja: "工程を要素作業に分ける", en: "Split the process into element tasks", id: "Bagi proses menjadi elemen kerja" } ],
            [ "3", { ja: "価値分類", en: "Value classification", id: "Klasifikasi nilai" }, { ja: "価値・準価値・無価値に分ける。残す無価値作業も改善候補として見える化する", en: "Classify into value, semi-value and non-value; make remaining non-value work visible as improvement candidates", id: "Klasifikasikan menjadi bernilai, semi-bernilai, dan tidak bernilai; visualisasikan pekerjaan tanpa nilai yang tersisa sebagai kandidat perbaikan" } ],
            [ "4", { ja: "条件X", en: "Conditions X", id: "Kondisi X" }, { ja: "7要因ごとに、品質・CTに影響し現場で確認・制御できる条件を抽出する", en: "For each of the 7 factors, extract conditions that affect quality or CT and can be checked and controlled on the floor", id: "Untuk tiap 7 faktor, ambil kondisi yang memengaruhi mutu atau CT dan dapat diperiksa serta dikendalikan di lantai produksi" } ],
            [ "5", { ja: "監査", en: "Audit", id: "Audit" }, { ja: "現行の手順を監査6軸で点検する", en: "Check the current procedure on the 6 audit axes", id: "Periksa prosedur saat ini dengan 6 sumbu audit" } ],
            [ "6", { ja: "初期標準", en: "Initial standard", id: "Standar awal" }, { ja: "標準作業票・条件表・異常対応表をつくる", en: "Create the standard work sheet, condition sheet and abnormality response sheet", id: "Buat lembar kerja standar, tabel kondisi, dan tabel penanganan kelainan" } ],
            [ "7", { ja: "再現確認", en: "Reproducibility check", id: "Cek reprodusibilitas" }, { ja: "複数人で実行し、同じ方法で同じ結果になるか確認する", en: "Several people run it to confirm the same method gives the same result", id: "Beberapa orang menjalankannya untuk memastikan metode yang sama memberi hasil yang sama" } ],
            [ "8", { ja: "データへ", en: "To data", id: "Ke data" }, { ja: "測定条件を固定し、比較できるデータを取り始める", en: "Fix measurement conditions and start taking comparable data", id: "Kunci kondisi pengukuran dan mulai mengambil data yang dapat dibandingkan" } ]
          ],
          caption: { ja: "Step 0〜6が「決める」、Step 7〜8が「守る」。「改める」はPDCA-Sで行い、改善結果を成果標準に反映する", en: "Steps 0–6 are “decide”, Steps 7–8 are “keep”. “Revise” is done with PDCA-S, putting improvements into the outcome standard", id: "Langkah 0–6 adalah “tetapkan”, Langkah 7–8 adalah “jaga”. “Revisi” dilakukan dengan PDCA-S, memasukkan hasil perbaikan ke standar hasil" }
        },
        { type: "h", text: { ja: "監査6軸", en: "The 6 audit axes", id: "6 sumbu audit" } },
        { type: "table",
          head: [ { ja: "監査軸", en: "Axis", id: "Sumbu" }, { ja: "確認質問", en: "Question", id: "Pertanyaan" }, { ja: "未達時", en: "If not met", id: "Jika tidak terpenuhi" } ],
          rows: [
            [ { ja: "存在", en: "Exists", id: "Ada" }, { ja: "文書・表示・条件表があるか", en: "Are there documents, displays, condition sheets?", id: "Apakah ada dokumen, tampilan, tabel kondisi?" }, { ja: "初期の取り決めをつくる", en: "Create initial agreements", id: "Buat kesepakatan awal" } ],
            [ { ja: "一致", en: "Matches", id: "Sesuai" }, { ja: "文書と実作業が一致するか", en: "Do documents match actual work?", id: "Apakah dokumen sesuai dengan kerja nyata?" }, { ja: "事実から改訂する", en: "Revise from facts", id: "Revisi berdasarkan fakta" } ],
            [ { ja: "遵守", en: "Followed", id: "Dipatuhi" }, { ja: "全員・全シフトで同じか", en: "Is it the same for everyone on every shift?", id: "Apakah sama untuk semua orang di semua shift?" }, { ja: "守られていない理由を確認する", en: "Find why it is not being followed", id: "Cari tahu mengapa tidak dipatuhi" } ],
            [ { ja: "実行可能", en: "Doable", id: "Dapat dilakukan" }, { ja: "安全・品質・タクトの上で守れるか", en: "Can it be followed within safety, quality and takt?", id: "Dapatkah dipatuhi dalam batas keselamatan, mutu, dan takt?" }, { ja: "標準の側を見直す", en: "Review the standard itself", id: "Tinjau ulang standarnya" } ],
            [ { ja: "判断可能", en: "Clear to judge", id: "Dapat dinilai" }, { ja: "OK/NG、Go/Stopの判断が同じか", en: "Are OK/NG and Go/Stop judgments the same?", id: "Apakah penilaian OK/NG dan Go/Stop sama?" }, { ja: "数値・現物で固定する", en: "Fix with numbers or physical samples", id: "Bakukan dengan angka atau sampel fisik" } ],
            [ { ja: "測定可能", en: "Measurable", id: "Dapat diukur" }, { ja: "第三者が確認・監査できるか", en: "Can a third party check and audit it?", id: "Dapatkah pihak ketiga memeriksa dan mengauditnya?" }, { ja: "観察項目を具体化する", en: "Make observation items concrete", id: "Perjelas item pengamatan" } ]
          ]
        },
        { type: "h", text: { ja: "初期標準の3文書", en: "The 3 documents of the initial standard", id: "3 dokumen standar awal" } },
        { type: "cards", cols: 3, items: [
          { icon: "📋", tone: "navy", title: { ja: "標準作業票", en: "Standard work sheet", id: "Lembar kerja standar" }, text: { ja: "要素作業、順序、品質ポイント、標準CT、工具、確認方法", en: "Element tasks, order, quality points, standard CT, tools, check method", id: "Elemen kerja, urutan, poin mutu, CT standar, alat, metode cek" } },
          { icon: "⚙️", tone: "blue", title: { ja: "条件表", en: "Condition sheet", id: "Tabel kondisi" }, text: { ja: "設備設定、材料、環境、測定器、点検頻度、担当者", en: "Equipment settings, material, environment, measuring instruments, inspection frequency, person in charge", id: "Pengaturan peralatan, material, lingkungan, alat ukur, frekuensi inspeksi, penanggung jawab" } },
          { icon: "🚨", tone: "red", title: { ja: "異常対応表", en: "Abnormality response sheet", id: "Tabel penanganan kelainan" }, text: { ja: "Go/Stop、隔離、連絡、確認項目、再開条件、承認者", en: "Go/Stop, isolation, contact, check items, restart conditions, approver", id: "Go/Stop, isolasi, kontak, item cek, syarat mulai ulang, pemberi persetujuan" } }
        ] },
        { type: "callout", kind: "note", title: { ja: "発行して終わりではない", en: "Issuing it is not the end", id: "Menerbitkan bukan akhir" }, text: {
          ja: "初期標準は、理解 → 実行 → 結果 → 観察 → 監査 → 改訂を経て完成させます。",
          en: "The initial standard is completed through understand → do → result → observe → audit → revise.",
          id: "Standar awal diselesaikan melalui pahami → lakukan → hasil → amati → audit → revisi."
        } }
      ]
    },
    {
      id: "success",
      title: { ja: "成功要因", en: "Success Factors", id: "Faktor Keberhasilan" },
      blocks: [
        { type: "cards", cols: 2, items: [
          { icon: "🎯", tone: "navy", title: { ja: "理論値の明確化", en: "Clear theoretical value", id: "Nilai teoretis yang jelas" }, text: { ja: "理論値であるべき姿を定義する。これがないと優先順位が決まらない。", en: "Define the ideal with theoretical-value thinking. Without it, priorities cannot be set.", id: "Definisikan kondisi ideal dengan pemikiran nilai teoretis. Tanpanya, prioritas tidak dapat ditetapkan." } },
          { icon: "🧭", tone: "blue", title: { ja: "トリアージの正確さ", en: "Accurate triage", id: "Triase yang akurat" }, text: { ja: "振り分けを誤るとリソースが無駄になる。判定者の教育が重要。", en: "Mis-routing wastes resources. Training the people who judge is essential.", id: "Salah arah membuang sumber daya. Pelatihan bagi penilai sangat penting." } },
          { icon: "⚖️", tone: "green", title: { ja: "GPC-M / GPC-Hの使い分け", en: "Using GPC-M / GPC-H correctly", id: "Menggunakan GPC-M / GPC-H dengan tepat" }, text: { ja: "バラツキの原因が設備か人かを見極め、適切な手法を選ぶ。", en: "Determine whether variation comes from machines or people and choose the right method.", id: "Tentukan apakah variasi berasal dari mesin atau manusia dan pilih metode yang tepat." } },
          { icon: "🌱", tone: "amber", title: { ja: "Quick GPCの文化醸成", en: "Quick GPC culture", id: "Budaya Quick GPC" }, text: { ja: "「失敗してもいい小さなトライ」を奨励し、失敗事例もナレッジとして評価する。", en: "Encourage “small trials where failure is OK” and value failures as knowledge.", id: "Dorong “uji kecil yang boleh gagal” dan hargai kegagalan sebagai pengetahuan." } }
        ] },
        { type: "h", text: { ja: "組織文化を変える4つの鍵", en: "Four keys to changing the culture", id: "Empat kunci mengubah budaya" } },
        { type: "list", items: [
          { ja: "**共通認識の醸成**：なぜ「ムダ」ではなく「バラツキ」なのか。バラツキが品質・コスト・データ信頼性に与える影響を全員が理解するまで教育を続ける", en: "**Shared understanding**: why “variation” rather than “waste”? Keep teaching until everyone understands its impact on quality, cost and data reliability", id: "**Pemahaman bersama**: mengapa “variasi” dan bukan “pemborosan”? Terus mengajar sampai semua memahami dampaknya pada kualitas, biaya, dan keandalan data" },
          { ja: "**成功体験の創出**：改善実践会などで小さな成功を積み重ね、「気づき→面白い→もっと知りたい」の循環を作る", en: "**Success experiences**: stack small wins in improvement workshops and build the loop “insight → fun → want to learn more”", id: "**Pengalaman sukses**: kumpulkan kemenangan kecil di lokakarya perbaikan dan bangun putaran “wawasan → menyenangkan → ingin tahu lebih”" },
          { ja: "**トップのコミットメント**：時間・人員・予算を配分し、改善を「通常業務の妨げ」ではなく「最優先業務」と位置づける", en: "**Top commitment**: allocate time, people and budget; treat improvement as top-priority work, not an interruption", id: "**Komitmen pimpinan**: alokasikan waktu, orang, dan anggaran; jadikan perbaikan pekerjaan prioritas utama, bukan gangguan" },
          { ja: "**推進体制の構築**：各ラインの推進リーダー、部門横断の改善チーム、月次のKPIレビュー会議", en: "**Promotion structure**: a promotion leader per line, cross-functional improvement teams, monthly KPI review meetings", id: "**Struktur penggerak**: pemimpin penggerak per lini, tim perbaikan lintas fungsi, rapat tinjauan KPI bulanan" }
        ] }
      ]
    },
    {
      id: "barriers",
      title: { ja: "よくある障壁と対処法", en: "Common Barriers and Countermeasures", id: "Hambatan Umum dan Penanganannya" },
      blocks: [
        { type: "table",
          head: [ { ja: "障壁", en: "Barrier", id: "Hambatan" }, { ja: "問題", en: "Problem", id: "Masalah" }, { ja: "対処", en: "Countermeasure", id: "Penanganan" } ],
          rows: [
            [ { ja: "デジタル環境がない", en: "No digital environment", id: "Tidak ada lingkungan digital" }, { ja: "導入自体が不可能に見える", en: "Implementation looks impossible", id: "Penerapan tampak mustahil" }, { ja: "Level 1（アナログ）で開始できる", en: "Start at Level 1 (analog)", id: "Mulai di Level 1 (analog)" } ],
            [ { ja: "統計の知識がない", en: "No statistics knowledge", id: "Tidak punya pengetahuan statistik" }, { ja: "分析手法が使えない", en: "Analysis methods cannot be used", id: "Metode analisis tidak bisa dipakai" }, { ja: "Quick GPCは統計不要。Deep GPCのみ専門知識を活用", en: "Quick GPC needs no statistics; use expertise only for Deep GPC", id: "Quick GPC tidak perlu statistik; keahlian hanya untuk Deep GPC" } ],
            [ { ja: "改善に時間がかかりすぎる", en: "Improvement takes too long", id: "Perbaikan terlalu lama" }, { ja: "現場が疲弊する", en: "The floor gets exhausted", id: "Lapangan kelelahan" }, { ja: "Quick GPCで1日〜1週間の高速改善", en: "Fast improvement in 1 day – 1 week with Quick GPC", id: "Perbaikan cepat 1 hari – 1 minggu dengan Quick GPC" } ],
            [ { ja: "何から始めればいいか分からない", en: "Do not know where to start", id: "Tidak tahu harus mulai dari mana" }, { ja: "手順が不明確", en: "Procedure is unclear", id: "Prosedur tidak jelas" }, { ja: "トリアージがルートを推薦する", en: "Triage recommends the route", id: "Triase merekomendasikan rute" } ],
            [ { ja: "改善効果が定着しない", en: "Results do not stick", id: "Hasil tidak bertahan" }, { ja: "やりっぱなしになる", en: "Do-and-forget", id: "Kerjakan-lalu-lupakan" }, { ja: "PDCA-Sの「S」で標準化・固定化", en: "Standardise and lock with the “S” of PDCA-S", id: "Standarkan dan kunci dengan “S” dari PDCA-S" } ],
            [ { ja: "「現状でも問題ない」「忙しい」", en: "“It's fine as is” / “Too busy”", id: "“Sudah baik” / “Terlalu sibuk”" }, { ja: "危機感がない", en: "No sense of urgency", id: "Tidak ada rasa urgensi" }, { ja: "ロスとバラツキを数値で可視化し、小さな成功で「改善は楽しい」文化を作る", en: "Visualise losses and variation in numbers; build a “kaizen is fun” culture with small wins", id: "Visualkan kerugian dan variasi dengan angka; bangun budaya “kaizen itu menyenangkan” dengan kemenangan kecil" } ]
          ]
        },
        { type: "compare",
          left: { title: { ja: "誤解：標準化＝創意工夫の否定", en: "Misconception: standardisation kills creativity", id: "Salah paham: standardisasi membunuh kreativitas" }, tone: "red", items: [
            { ja: "決められた通りにやるだけで考えなくなる", en: "People just follow rules and stop thinking", id: "Orang hanya mengikuti aturan dan berhenti berpikir" },
            { ja: "一度決めた標準は変えられない", en: "Once set, a standard cannot change", id: "Standar yang sudah ditetapkan tidak bisa diubah" }
          ] },
          right: { title: { ja: "ZEVA：標準は進化するもの", en: "ZEVA: standards evolve", id: "ZEVA: standar berkembang" }, tone: "green", items: [
            { ja: "標準は「現時点の最良の方法」であり、改善の出発点", en: "A standard is “the best method known now” and the starting point for improvement", id: "Standar adalah “metode terbaik yang diketahui saat ini” dan titik awal perbaikan" },
            { ja: "改善提案を奨励し、PDCA+Sで標準を更新し続ける（決める→守る→改める）", en: "Encourage proposals and keep updating the standard with PDCA+S (decide → keep → revise)", id: "Dorong usulan dan terus perbarui standar dengan PDCA+S (tetapkan → jaga → revisi)" }
          ] }
        },
        { type: "widget", name: "scenario", props: {
          title: { ja: "推進リーダーの対話練習", en: "Practice for a promotion leader", id: "Latihan untuk pemimpin penggerak" },
          intro: { ja: "モデルラインでZEVAを始めようとすると、現場からさまざまな声が上がりました。ZEVAの仕組みを使って応答してください。", en: "When you try to start ZEVA on the model line, various voices come from the floor. Respond using ZEVA mechanisms.", id: "Saat Anda mulai menerapkan ZEVA di lini model, berbagai suara muncul dari lapangan. Tanggapi dengan mekanisme ZEVA." },
          steps: [
            { prompt: { ja: "班長：「うちにはセンサーもシステムもない。ZEVAは無理だよ」", en: "Team leader: “We have no sensors or systems. ZEVA is impossible here.”", id: "Ketua tim: “Kami tidak punya sensor atau sistem. ZEVA mustahil di sini.”" }, choices: [
              { text: { ja: "「まずIoTの予算を申請しましょう」", en: "“Let's apply for an IoT budget first.”", id: "“Ayo ajukan anggaran IoT dulu.”" }, correct: false, feedback: { ja: "デジタル化は加速装置です。導入を先延ばしにする理由になってしまいます。", en: "Digitalisation is an accelerator; this turns it into a reason to delay.", id: "Digitalisasi adalah akselerator; ini justru menjadi alasan menunda." } },
              { text: { ja: "「ストップウォッチと紙のLevel 1で始められます。デジタル化は後から足せます」", en: "“We can start at Level 1 with a stopwatch and paper. Digitalisation can be added later.”", id: "“Kita bisa mulai di Level 1 dengan stopwatch dan kertas. Digitalisasi bisa ditambah nanti.”" }, correct: true, feedback: { ja: "正解。アナログでも完全に機能する設計です。", en: "Correct. ZEVA is designed to work fully in analog.", id: "Benar. ZEVA dirancang berfungsi penuh secara analog." } }
            ] },
            { prompt: { ja: "作業者：「統計なんて分からないし、改善は技術者の仕事でしょ」", en: "Operator: “I don't understand statistics; improvement is the engineers' job.”", id: "Operator: “Saya tidak paham statistik; perbaikan itu tugas insinyur.”" }, choices: [
              { text: { ja: "「Quick GPCは統計不要。気づきを1文の仮説にして、まず5台試してみましょう」", en: "“Quick GPC needs no statistics. Turn your insight into a one-sentence hypothesis and try it on 5 units.”", id: "“Quick GPC tidak perlu statistik. Ubah pengamatan Anda jadi hipotesis satu kalimat dan coba pada 5 unit.”" }, correct: true, feedback: { ja: "正解。現場の気づきが改善の起点になり、小さな成功体験につながります。", en: "Correct. Floor insights become the starting point and lead to small successes.", id: "Benar. Pengamatan lapangan menjadi titik awal dan menghasilkan sukses kecil." } },
              { text: { ja: "「まず統計研修を3日間受けてください」", en: "“Please take a three-day statistics course first.”", id: "“Silakan ikuti kursus statistik tiga hari dulu.”" }, correct: false, feedback: { ja: "統計が必要なのはDeep GPCだけです。参加のハードルを上げてしまいます。", en: "Statistics is needed only for Deep GPC; this raises the barrier to participation.", id: "Statistik hanya diperlukan untuk Deep GPC; ini justru menaikkan hambatan partisipasi." } }
            ] },
            { prompt: { ja: "課長：「前も改善したけど、3ヶ月で元に戻った」", en: "Manager: “We improved before, but it went back within three months.”", id: "Manajer: “Dulu sudah diperbaiki, tapi kembali lagi dalam tiga bulan.”" }, choices: [
              { text: { ja: "「今度はもっと頑張るよう全員に呼びかけます」", en: "“This time I'll ask everyone to try harder.”", id: "“Kali ini saya minta semua berusaha lebih keras.”" }, correct: false, feedback: { ja: "精神論では定着しません。仕組みが必要です。", en: "Willpower does not make results stick; a mechanism is needed.", id: "Semangat saja tidak membuat hasil bertahan; perlu mekanisme." } },
              { text: { ja: "「PDCA-SのSで標準化し、V.Scoreや不良率のトレンドを月次で監視します」", en: "“We will standardise with the S of PDCA-S and monitor V.Score and defect-rate trends monthly.”", id: "“Kita standarkan dengan S dari PDCA-S dan pantau tren V.Score dan tingkat cacat setiap bulan.”" }, correct: true, feedback: { ja: "正解。Sなき改善は「やりっぱなし」を生みます。", en: "Correct. Improvement without S becomes do-and-forget.", id: "Benar. Perbaikan tanpa S menjadi kerjakan-lalu-lupakan." } }
            ] },
            { prompt: { ja: "工場長：「成果が出たら全工程に一斉展開しよう」", en: "Plant manager: “Once it works, let's roll it out to all processes at once.”", id: "Kepala pabrik: “Kalau berhasil, ayo terapkan ke semua proses sekaligus.”" }, choices: [
              { text: { ja: "「賛成です。暫定標準のまま全ラインに適用しましょう」", en: "“Agreed. Let's apply the temporary standard to all lines as is.”", id: "“Setuju. Terapkan standar sementara ke semua lini apa adanya.”" }, correct: false, feedback: { ja: "暫定標準は単一ライン限定で、水平展開は正式承認後です。", en: "Temporary standards are limited to a single line; rollout comes after formal approval.", id: "Standar sementara terbatas satu lini; perluasan setelah persetujuan resmi." } },
              { text: { ja: "「正式承認した標準から、ギャップの大きい工程へ段階的に横展開し、ナレッジベースで共有します」", en: "“We'll roll out formally approved standards step by step to processes with large gaps, sharing via the knowledge base.”", id: "“Kita perluas standar yang sudah disetujui resmi secara bertahap ke proses dengan selisih besar, berbagi lewat basis pengetahuan.”" }, correct: true, feedback: { ja: "正解。水平展開はStep 6として段階的に行います。", en: "Correct. Rollout is done gradually as Step 6.", id: "Benar. Perluasan dilakukan bertahap sebagai Langkah 6." } }
            ] }
          ],
          outro: { ja: "障壁の多くは「ZEVAの仕組み」で答えられます。精神論ではなく、Level 1・Quick GPC・トリアージ・PDCA-Sで応答しましょう。", en: "Most barriers can be answered with ZEVA's mechanisms. Respond with Level 1, Quick GPC, triage and PDCA-S — not with willpower.", id: "Sebagian besar hambatan dapat dijawab dengan mekanisme ZEVA. Tanggapi dengan Level 1, Quick GPC, triase, dan PDCA-S — bukan dengan semangat saja." }
        } }
      ]
    },
    {
      id: "donts",
      title: { ja: "やってはいけないこと：Yを直接操作しない", en: "Don'ts: Never Manipulate Y Directly", id: "Larangan: Jangan Memanipulasi Y Secara Langsung" },
      blocks: [
        { type: "p", text: {
          ja: "導入が進むとKPIへのプレッシャーが高まり、結果（Y）の数字を直接動かしたくなります。しかしそれは原因（X）を放置したまま、バラツキとデータの信頼性をさらに悪化させる行為です（[[xy-thinking]]）。",
          en: "As implementation progresses, KPI pressure grows and it becomes tempting to push the result numbers (Y) directly. But that leaves the causes (X) untouched and makes variation and data reliability even worse ([[xy-thinking]]).",
          id: "Seiring penerapan berjalan, tekanan KPI meningkat dan muncul godaan untuk mendorong angka hasil (Y) secara langsung. Namun itu membiarkan penyebab (X) dan membuat variasi serta keandalan data semakin buruk ([[xy-thinking]])."
        } },
        { type: "compare",
          left: { title: { ja: "NG：Yを直接操作", en: "NG: manipulating Y", id: "NG: memanipulasi Y" }, tone: "red", items: [
            { ja: "不良率が高い → 検査を厳しくする", en: "Defect rate high → tighten inspection", id: "Tingkat cacat tinggi → perketat inspeksi" },
            { ja: "CTが遅い → 作業者を急がせる", en: "CT slow → rush operators", id: "CT lambat → percepat operator" },
            { ja: "OEEが低い → 残業で数を稼ぐ", en: "OEE low → make up numbers with overtime", id: "OEE rendah → kejar angka dengan lembur" }
          ] },
          right: { title: { ja: "OK：Xを制御する", en: "OK: controlling X", id: "OK: mengendalikan X" }, tone: "green", items: [
            { ja: "不良率が高い → 設備パラメータ(X)を適正化 → 不良率(Y)が下がる", en: "Defect rate high → optimise machine parameters (X) → defect rate (Y) falls", id: "Tingkat cacat tinggi → optimalkan parameter mesin (X) → tingkat cacat (Y) turun" },
            { ja: "CTが遅い → 作業手順(X)を改善 → CT(Y)が短縮", en: "CT slow → improve work procedure (X) → CT (Y) shortens", id: "CT lambat → perbaiki prosedur kerja (X) → CT (Y) memendek" },
            { ja: "OEEが低い → 設備故障の原因(X)を除去 → OEE(Y)が向上", en: "OEE low → remove the cause of breakdowns (X) → OEE (Y) rises", id: "OEE rendah → hilangkan penyebab kerusakan (X) → OEE (Y) naik" }
          ] }
        }
      ]
    },
    {
      id: "checklists",
      title: { ja: "導入チェックリスト", en: "Implementation Checklists", id: "Daftar Periksa Penerapan" },
      blocks: [
        { type: "p", text: {
          ja: "活動の節目で次のチェックリストを使い、抜け漏れを防ぎます。印刷して掲示するか、ナレッジベースのテンプレートに組み込むと効果的です。",
          en: "Use these checklists at each milestone to prevent gaps. Printing and posting them, or building them into knowledge-base templates, works well.",
          id: "Gunakan daftar periksa ini di setiap tonggak untuk mencegah celah. Mencetak dan menempelnya, atau memasukkannya ke templat basis pengetahuan, sangat efektif."
        } },
        { type: "cards", cols: 2, items: [
          { icon: "📋", tone: "navy", title: { ja: "B.1 導入準備", en: "B.1 Preparation", id: "B.1 Persiapan" }, text: { ja: "□ 理論値を定義した<br>□ 現状とのギャップを可視化した<br>□ ギャップで優先順位を決めた<br>□ GPC-M/GPC-Hのどちらか判断した<br>□ トリアージ4基準を理解した<br>□ 現在のデジタル化レベルを把握した", en: "□ Defined the theoretical value<br>□ Visualised the gap<br>□ Set priority by gap<br>□ Judged GPC-M or GPC-H<br>□ Understood the 4 triage criteria<br>□ Know the current digital level", id: "□ Nilai teoretis sudah didefinisikan<br>□ Selisih sudah divisualkan<br>□ Prioritas ditetapkan berdasarkan selisih<br>□ Sudah menilai GPC-M atau GPC-H<br>□ Memahami 4 kriteria triase<br>□ Mengetahui level digital saat ini" } },
          { icon: "🧭", tone: "blue", title: { ja: "B.2 トリアージ", en: "B.2 Triage", id: "B.2 Triase" }, text: { ja: "□ 原因の見当を確認（基準①）<br>□ 変数の数を評価（基準②）<br>□ 失敗時のリスクを評価（基準③）<br>□ データの入手性・信頼性を確認（基準④）<br>□ Quick/Deepの振り分けを判定", en: "□ Checked cause idea (①)<br>□ Evaluated number of variables (②)<br>□ Evaluated failure risk (③)<br>□ Checked data availability & reliability (④)<br>□ Decided Quick or Deep", id: "□ Cek dugaan penyebab (①)<br>□ Evaluasi jumlah variabel (②)<br>□ Evaluasi risiko kegagalan (③)<br>□ Cek ketersediaan & keandalan data (④)<br>□ Putuskan Quick atau Deep" } },
          { icon: "⚡", tone: "green", title: { ja: "B.3 Quick GPC", en: "B.3 Quick GPC", id: "B.3 Quick GPC" }, text: { ja: "□ 仮説を1文にした<br>□ N数を決めた<br>□ Check方法を決めた<br>□ 暫定標準の適用範囲を決めた<br>□ エスカレーション基準を確認<br>□ ナレッジベースに登録<br>□ PDCA-Sへの移行計画", en: "□ One-sentence hypothesis<br>□ Decided N<br>□ Decided check method<br>□ Scope of temporary standard<br>□ Confirmed escalation criteria<br>□ Registered in knowledge base<br>□ Plan to move to PDCA-S", id: "□ Hipotesis satu kalimat<br>□ Menentukan N<br>□ Menentukan metode cek<br>□ Cakupan standar sementara<br>□ Cek kriteria eskalasi<br>□ Didaftarkan di basis pengetahuan<br>□ Rencana beralih ke PDCA-S" } },
          { icon: "🔬", tone: "amber", title: { ja: "B.4 Deep GPC", en: "B.4 Deep GPC", id: "B.4 Deep GPC" }, text: { ja: "□ Yを定義<br>□ X候補を列挙<br>□ MSAを実施<br>□ サンプリング計画を作成<br>□ 統計で根本原因を特定<br>□ パイロットランで検証<br>□ 管理図で安定を確認<br>□ PDCA-Sへの移行計画", en: "□ Defined Y<br>□ Listed X candidates<br>□ Performed MSA<br>□ Made sampling plan<br>□ Found root cause statistically<br>□ Verified with pilot run<br>□ Confirmed stability on control chart<br>□ Plan to move to PDCA-S", id: "□ Definisikan Y<br>□ Daftar kandidat X<br>□ Lakukan MSA<br>□ Buat rencana sampling<br>□ Temukan akar penyebab secara statistik<br>□ Verifikasi dengan pilot run<br>□ Pastikan kestabilan di peta kendali<br>□ Rencana beralih ke PDCA-S" } },
          { icon: "⚙️", tone: "gray", title: { ja: "B.5 GPC-M", en: "B.5 GPC-M", id: "B.5 GPC-M" }, text: { ja: "□ 物理実験でGPCバンドを検証<br>□ 計測体制がある<br>□ インターロックを設定（可能な場合）<br>□ GPCバンド適合率・OEEを監視", en: "□ Verified GPC band by physical experiment<br>□ Measurement system in place<br>□ Interlock set (if possible)<br>□ Monitoring band conformance & OEE", id: "□ GPC band diverifikasi dengan eksperimen fisik<br>□ Sistem pengukuran tersedia<br>□ Interlock dipasang (jika memungkinkan)<br>□ Memantau band conformance & OEE" } },
          { icon: "🧑‍🔧", tone: "red", title: { ja: "B.6 GPC-H", en: "B.6 GPC-H", id: "B.6 GPC-H" }, text: { ja: "□ CT計測でV.Scoreを算出<br>□ ECRSで作業を改善<br>□ 動作安定の原理を適用<br>□ 4M標準化で標準作業を定義<br>□ V.Scoreを定期監視", en: "□ Calculated V.Score from CT timing<br>□ Improved work with ECRS<br>□ Applied motion stability principles<br>□ Defined standard work via 4M standards<br>□ Monitoring V.Score regularly", id: "□ Menghitung V.Score dari pengukuran CT<br>□ Memperbaiki kerja dengan ECRS<br>□ Menerapkan prinsip stabilitas gerakan<br>□ Mendefinisikan kerja standar lewat standar 4M<br>□ Memantau V.Score rutin" } },
          { icon: "📏", tone: "blue", title: { ja: "B.7 標準化", en: "B.7 Standardisation", id: "B.7 Standardisasi" }, text: { ja: "□ 5つの問いで項目を確認した<br>□ 仕様書・図面の定めを確認した<br>□ Quick/Deepを振り分け、工程技術者の確認を得た<br>□ 初期標準を当日〜3日以内に決めた（Quick）<br>□ 全員・全シフトが同じ方法・同じ測り方で実行<br>□ 改善結果を成果標準に反映した", en: "□ Checked items with the five questions<br>□ Checked specifications and drawings<br>□ Routed Quick/Deep, confirmed by the process engineer<br>□ Decided the initial standard on the same day, or within 3 days at most (Quick)<br>□ Everyone on every shift uses the same method and measuring<br>□ Put improvements into the outcome standard", id: "□ Item dicek dengan lima pertanyaan<br>□ Spesifikasi dan gambar dicek<br>□ Mode Quick/Deep sudah ditentukan, dikonfirmasi insinyur proses<br>□ Standar awal ditetapkan pada hari yang sama, paling lambat dalam 3 hari (Quick)<br>□ Semua orang di semua shift memakai metode dan cara ukur yang sama<br>□ Hasil perbaikan dimasukkan ke standar hasil" } }
        ] }
      ]
    }
  ],
  keyPoints: [
    { ja: "導入は理論値の明確化→トリアージ体制→モデルラインでQuick GPC→Deep GPC案件→ナレッジベース→水平展開の6ステップ", en: "Six steps: clarify theoretical value → triage structure → Quick GPC on a model line → Deep GPC projects → knowledge base → rollout", id: "Enam langkah: perjelas nilai teoretis → struktur triase → Quick GPC di lini model → proyek Deep GPC → basis pengetahuan → perluasan" },
    { ja: "標準化はQuick標準化で速く始め、Deep標準化（Step 0〜8・監査6軸・3文書）は適用基準に当たる箇所に絞る", en: "Start standardisation fast with Quick standardisation; limit Deep standardisation (Steps 0–8, 6 audit axes, 3 documents) to places that meet the criteria", id: "Mulai standardisasi dengan cepat lewat standardisasi Quick; batasi standardisasi Deep (Langkah 0–8, 6 sumbu audit, 3 dokumen) pada bagian yang memenuhi kriteria" },
    { ja: "ギャップで優先順位、スモールスタート、クイックウィン、デジタル化は後から", en: "Prioritise by gap, start small, go for quick wins, add digitalisation later", id: "Prioritas berdasarkan selisih, mulai kecil, kejar kemenangan cepat, digitalisasi belakangan" },
    { ja: "成功要因：理論値の明確化、正確なトリアージ、GPC-M/Hの使い分け、失敗を許すQuick GPC文化", en: "Success factors: clear theoretical value, accurate triage, correct GPC-M/H use, a Quick GPC culture that accepts failure", id: "Faktor keberhasilan: nilai teoretis jelas, triase akurat, penggunaan GPC-M/H yang tepat, budaya Quick GPC yang menerima kegagalan" },
    { ja: "障壁には精神論ではなくZEVAの仕組み（Level 1・Quick GPC・トリアージ・PDCA-S）で応える", en: "Answer barriers with ZEVA mechanisms (Level 1, Quick GPC, triage, PDCA-S), not willpower", id: "Jawab hambatan dengan mekanisme ZEVA (Level 1, Quick GPC, triase, PDCA-S), bukan semangat" },
    { ja: "標準は「現時点の最良」であり進化するもの。Yを直接操作しない", en: "A standard is “the best for now” and evolves. Never manipulate Y directly", id: "Standar adalah “terbaik untuk saat ini” dan berkembang. Jangan memanipulasi Y secara langsung" }
  ],
  quiz: [
    { q: { ja: "ZEVA導入で最初に行うステップは？", en: "What is the first ZEVA implementation step?", id: "Apa langkah pertama penerapan ZEVA?" },
      choices: [
        { ja: "IoTセンサーの導入", en: "Install IoT sensors", id: "Memasang sensor IoT" },
        { ja: "理論値の明確化とギャップの可視化", en: "Clarify the theoretical value and visualise the gap", id: "Memperjelas nilai teoretis dan memvisualkan selisih" },
        { ja: "全工程への水平展開", en: "Roll out to all processes", id: "Perluasan ke semua proses" },
        { ja: "Deep GPCプロジェクトの立ち上げ", en: "Launch Deep GPC projects", id: "Meluncurkan proyek Deep GPC" }
      ], answer: 1,
      explain: { ja: "理論値がないと優先順位が決まりません。Step 1はLevel 1で2週間程度が目安です。", en: "Without a theoretical value, priorities cannot be set. Step 1 takes about two weeks at Level 1.", id: "Tanpa nilai teoretis, prioritas tidak dapat ditetapkan. Langkah 1 sekitar dua minggu di Level 1." } },
    { q: { ja: "Deep標準化の監査で「文書はあるが、シフトによってやり方が違う」と分かった。当てはまる監査軸と対応は？", en: "A Deep standardisation audit finds “the document exists, but the method differs by shift”. Which axis and response apply?", id: "Audit standardisasi Deep menemukan “dokumen ada, tetapi caranya berbeda per shift”. Sumbu dan tindakan mana yang sesuai?" },
      choices: [
        { ja: "存在：初期の取り決めをつくる", en: "Exists: create initial agreements", id: "Ada: buat kesepakatan awal" },
        { ja: "遵守：守られていない理由を確認する", en: "Followed: find why it is not followed", id: "Dipatuhi: cari tahu mengapa tidak dipatuhi" },
        { ja: "測定可能：観察項目を具体化する", en: "Measurable: make observation items concrete", id: "Dapat diukur: perjelas item pengamatan" },
        { ja: "監査は不要なので文書を配り直す", en: "No audit needed; just redistribute the document", id: "Audit tidak perlu; bagikan ulang dokumennya saja" }
      ], answer: 1,
      explain: { ja: "全員・全シフトで同じかを見るのは「遵守」です。守られていない理由が「守れない標準」なら、標準の側を見直します（実行可能の軸）。", en: "Checking whether everyone on every shift does the same is “Followed”. If the reason it is not followed is that the standard cannot be followed, review the standard itself (the Doable axis).", id: "Memeriksa apakah semua orang di semua shift melakukan hal yang sama adalah “Dipatuhi”. Jika alasan tidak dipatuhi adalah karena standarnya memang tidak dapat dipatuhi, tinjau ulang standarnya (sumbu Dapat dilakukan)." } },
    { q: { ja: "導入初期にQuick GPCで早期成果を出す主な狙いは？", en: "What is the main aim of early results with Quick GPC?", id: "Apa tujuan utama hasil awal dengan Quick GPC?" },
      choices: [
        { ja: "Deep GPCを不要にする", en: "Make Deep GPC unnecessary", id: "Membuat Deep GPC tidak perlu" },
        { ja: "現場の信頼を獲得し、改善文化を立ち上げる", en: "Earn the floor's trust and start an improvement culture", id: "Meraih kepercayaan lapangan dan memulai budaya perbaikan" },
        { ja: "標準化を省略する", en: "Skip standardisation", id: "Melewatkan standardisasi" },
        { ja: "予算を確保する", en: "Secure a budget", id: "Mengamankan anggaran" }
      ], answer: 1,
      explain: { ja: "クイックウィンで信頼を得て、小さな成功体験を積み重ねます。", en: "Quick wins build trust and accumulate small successes.", id: "Kemenangan cepat membangun kepercayaan dan mengumpulkan sukses kecil." } },
    { q: { ja: "Deep GPC案件の選定・プロジェクト化（Step 4）で推奨されるデジタル化レベルは？", en: "Which digital level is recommended for selecting Deep GPC cases (Step 4)?", id: "Level digital mana yang disarankan untuk memilih kasus Deep GPC (Langkah 4)?" },
      choices: [ { ja: "Level 1でOK", en: "Level 1 is fine", id: "Level 1 cukup" }, { ja: "Level 2推奨", en: "Level 2 recommended", id: "Level 2 disarankan" }, { ja: "Level 3必須", en: "Level 3 required", id: "Level 3 wajib" }, { ja: "デジタル化は使わない", en: "No digitalisation", id: "Tanpa digitalisasi" } ], answer: 1,
      explain: { ja: "データ量が増えるDeep GPCではLevel 2が推奨されます。ただし必須ではありません。", en: "Deep GPC handles more data, so Level 2 is recommended — but not required.", id: "Deep GPC menangani lebih banyak data, jadi Level 2 disarankan — tetapi tidak wajib." } },
    { q: { ja: "「統計の知識がない」という障壁への対処として正しいものは？", en: "What is the right answer to the barrier “we have no statistics knowledge”?", id: "Apa jawaban yang tepat untuk hambatan “kami tidak punya pengetahuan statistik”?" },
      choices: [
        { ja: "統計を学ぶまで導入を延期する", en: "Postpone until everyone learns statistics", id: "Tunda sampai semua belajar statistik" },
        { ja: "Quick GPCは統計不要で、Deep GPCのみ専門知識を活用する", en: "Quick GPC needs no statistics; use expertise only for Deep GPC", id: "Quick GPC tidak perlu statistik; keahlian hanya untuk Deep GPC" },
        { ja: "すべてDeep GPCで外部に任せる", en: "Outsource everything as Deep GPC", id: "Serahkan semuanya ke pihak luar sebagai Deep GPC" },
        { ja: "統計を使わずに勘で判断する", en: "Judge by gut feeling without statistics", id: "Menilai dengan firasat tanpa statistik" }
      ], answer: 1,
      explain: { ja: "トリアージにより、統計が必要な課題とそうでない課題を分けられます。", en: "Triage separates issues that need statistics from those that do not.", id: "Triase memisahkan masalah yang butuh statistik dari yang tidak." } },
    { q: { ja: "「標準化は創意工夫を否定する」という誤解への答えは？", en: "How do you answer “standardisation kills creativity”?", id: "Bagaimana menjawab “standardisasi membunuh kreativitas”?" },
      choices: [
        { ja: "標準は一度決めたら変えない", en: "Standards never change once set", id: "Standar tidak pernah berubah setelah ditetapkan" },
        { ja: "標準は現時点の最良の方法で、改善提案で進化させるもの", en: "A standard is the best method for now and evolves through proposals", id: "Standar adalah metode terbaik saat ini dan berkembang melalui usulan" },
        { ja: "創意工夫は標準化の後には不要", en: "Creativity is unnecessary after standardisation", id: "Kreativitas tidak perlu setelah standardisasi" },
        { ja: "標準化は熟練者だけに適用する", en: "Standardise only for experts", id: "Standardisasi hanya untuk ahli" }
      ], answer: 1,
      explain: { ja: "「決める→守る→改める」のサイクルで標準は更新され続けます。", en: "Standards keep updating through the decide → keep → revise cycle.", id: "Standar terus diperbarui melalui siklus tetapkan → jaga → revisi." } },
    { q: { ja: "「OEEが低いので残業で数を稼ぐ」はなぜNGか？", en: "Why is “OEE is low, so make up the numbers with overtime” a Don't?", id: "Mengapa “OEE rendah, jadi kejar angka dengan lembur” dilarang?" },
      choices: [
        { ja: "残業代が高いから", en: "Because overtime is expensive", id: "Karena lembur mahal" },
        { ja: "結果（Y）を直接操作し、原因（X）を放置するから", en: "It manipulates the result (Y) directly and leaves the cause (X)", id: "Memanipulasi hasil (Y) secara langsung dan membiarkan penyebab (X)" },
        { ja: "OEEは人の指標だから", en: "Because OEE is a human metric", id: "Karena OEE metrik manusia" },
        { ja: "労働時間の記録が面倒だから", en: "Because recording hours is troublesome", id: "Karena mencatat jam kerja merepotkan" }
      ], answer: 1,
      explain: { ja: "設備故障の原因（X）を除去してOEE（Y）を上げるのが正しいアプローチです。", en: "The right approach is to remove the cause of breakdowns (X) so OEE (Y) rises.", id: "Pendekatan yang benar adalah menghilangkan penyebab kerusakan (X) agar OEE (Y) naik." } },
    { q: { ja: "Quick GPCのチェックリスト（B.3）に含まれない項目は？", en: "Which item is NOT on the Quick GPC checklist (B.3)?", id: "Item mana yang TIDAK ada di daftar periksa Quick GPC (B.3)?" },
      choices: [
        { ja: "仮説を1文で言語化したか", en: "Hypothesis written in one sentence?", id: "Hipotesis ditulis satu kalimat?" },
        { ja: "MSAを実施したか", en: "MSA performed?", id: "MSA dilakukan?" },
        { ja: "エスカレーション基準を確認したか", en: "Escalation criteria confirmed?", id: "Kriteria eskalasi dikonfirmasi?" },
        { ja: "ナレッジベースに結果を登録したか", en: "Result registered in the knowledge base?", id: "Hasil didaftarkan di basis pengetahuan?" }
      ], answer: 1,
      explain: { ja: "MSAはDeep GPCのチェックリスト（B.4）の項目です。", en: "MSA is on the Deep GPC checklist (B.4).", id: "MSA ada di daftar periksa Deep GPC (B.4)." } }
  ]
});
