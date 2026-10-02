ZA.addModule({
  id: "z3-03",
  track: "z3",
  order: 3,
  minutes: 40,
  icon: "📈",
  level: 3,
  prereq: ["z2-02", "ie-09"],
  title: {
    ja: "評価指標体系と安定状態",
    en: "The Metrics System and Statistical Stability",
    id: "Sistem Metrik dan Kestabilan Statistik"
  },
  summary: {
    ja: "ZEVAの評価指標は「データの信頼性」を可視化する仕組みです。安定状態を先に確認してから不良率やV.Scoreを解釈する手順、GPC-M/GPC-Hの指標と目標値、指標の組み合わせによる読み解き方を学びます。",
    en: "ZEVA metrics are a way of making data reliability visible. Learn to confirm stability before interpreting the defect rate and V.Score, the GPC-M / GPC-H metrics and targets, and how to read metrics in combination.",
    id: "Metrik ZEVA adalah cara memvisualkan keandalan data. Pelajari cara memastikan kestabilan sebelum menafsirkan tingkat cacat dan V.Score, metrik dan target GPC-M / GPC-H, serta cara membaca metrik secara gabungan."
  },
  objectives: [
    { ja: "「安定状態にない工程には定義可能な工程能力が存在しない」の意味を説明できる", en: "Explain “a process not in statistical control has no definable capability”", id: "Menjelaskan “proses yang tidak dalam kendali statistik tidak memiliki kapabilitas yang dapat didefinisikan”" },
    { ja: "管理図で安定を確認してから指標（不良率・V.Score）を評価する手順を実行できる", en: "Follow the procedure: confirm stability with a control chart, then evaluate the metrics", id: "Mengikuti prosedur: pastikan kestabilan dengan peta kendali, lalu evaluasi metrik" },
    { ja: "GPC-M・GPC-Hの評価指標と目標値を正しく使い分けられる", en: "Use GPC-M and GPC-H metrics and targets correctly", id: "Menggunakan metrik dan target GPC-M serta GPC-H dengan benar" },
    { ja: "OEEとV.Scoreを組み合わせて改善の優先順位を判断できる", en: "Combine OEE and V.Score to judge improvement priority", id: "Menggabungkan OEE dan V.Score untuk menilai prioritas perbaikan" }
  ],
  sections: [
    {
      id: "why-metrics",
      title: { ja: "指標は「データの信頼性」を映す鏡", en: "Metrics Mirror Data Reliability", id: "Metrik Mencerminkan Keandalan Data" },
      blocks: [
        { type: "p", text: {
          ja: "ZEVAの評価指標体系は、単に成果を点数化するためのものではありません。バラツキを定量化することで、**そのデータに基づいてアクションを起こせる状態かどうか**を可視化する仕組みです。[[v-score]]や[[defect-rate]]が改善することは、[[root-logic]]でいう「データに基づくアクションを起こせる状態」に近づいていることを意味します。",
          en: "The ZEVA metrics system is not just for scoring results. By quantifying variation it shows **whether the data is good enough to act on**. When [[v-score]] or the [[defect-rate]] improves, you are moving closer to the state the [[root-logic]] calls “able to take data-based action”.",
          id: "Sistem metrik ZEVA bukan sekadar untuk memberi skor hasil. Dengan mengkuantifikasi variasi, sistem ini menunjukkan **apakah data cukup baik untuk dijadikan dasar tindakan**. Ketika [[v-score]] atau [[defect-rate]] membaik, Anda semakin dekat ke kondisi yang oleh [[root-logic]] disebut “mampu bertindak berdasarkan data”."
        } },
        { type: "chain", items: [
          { ja: "バラツキが小さい", en: "Variation is small", id: "Variasi kecil" },
          { ja: "データの信頼性が高い", en: "Data is reliable", id: "Data andal" },
          { ja: "指標（不良率・V.Score）が意味を持つ", en: "Metrics (defect rate, V.Score) are meaningful", id: "Metrik (tingkat cacat, V.Score) bermakna" },
          { ja: "的確なアクションを選べる", en: "The right action can be chosen", id: "Tindakan yang tepat dapat dipilih" }
        ], conclusion: { ja: "指標の改善＝アクション可能性の向上", en: "Better metrics = greater ability to act", id: "Metrik lebih baik = kemampuan bertindak lebih besar" } },
        { type: "quote", text: {
          ja: "安定状態（統計的管理状態）にない工程には、定義可能な工程能力が存在しない。",
          en: "A process that is not in a state of statistical control has no definable process capability.",
          id: "Proses yang tidak berada dalam kondisi kendali statistik tidak memiliki kapabilitas proses yang dapat didefinisikan."
        }, cite: { ja: "[[shewhart-principle]]", en: "[[shewhart-principle]]", id: "[[shewhart-principle]]" } },
        { type: "p", text: {
          ja: "特殊原因による変動が残る不安定な工程では、今日のデータは明日の工程を予測しません。不良率やV.Scoreは**計算することはできても、安定が確認されるまで意味を持たない**のです。",
          en: "In an unstable process where special-cause variation remains, today's data does not predict tomorrow's process. The defect rate and V.Score **can be calculated, but mean nothing until stability is confirmed**.",
          id: "Pada proses tidak stabil yang masih memiliki variasi penyebab khusus, data hari ini tidak memprediksi proses besok. Tingkat cacat dan V.Score **bisa dihitung, tetapi tidak bermakna sampai kestabilan dipastikan**."
        } }
      ]
    },
    {
      id: "stability-first",
      title: { ja: "手順：まず安定、次に指標", en: "Procedure: Stability First, Then Metrics", id: "Prosedur: Stabil Dulu, Lalu Metrik" },
      blocks: [
        { type: "flow", dir: "v", nodes: [
          { title: { ja: "1. 測定システムを確認", en: "1. Check the measurement system", id: "1. Cek sistem pengukuran" }, text: { ja: "MSAで精度と正確さを確保（測定のバラツキ・偏りを排除）", en: "Secure precision and accuracy with MSA (remove measurement variation and bias)", id: "Pastikan presisi dan akurasi dengan MSA (hilangkan variasi dan bias pengukuran)" }, tone: "gray" },
          { title: { ja: "2. 管理図で安定を確認", en: "2. Confirm stability with a control chart", id: "2. Pastikan kestabilan dengan peta kendali" }, text: { ja: "[[xbar-r-chart]]で管理限界外の点や異常なパターンがないか", en: "Any points outside control limits or abnormal patterns on the [[xbar-r-chart]]?", id: "Adakah titik di luar batas kendali atau pola abnormal pada [[xbar-r-chart]]?" }, tone: "blue" },
          { title: { ja: "3a. 不安定なら", en: "3a. If unstable", id: "3a. Jika tidak stabil" }, text: { ja: "特殊原因を特定・除去（Quick/Deep GPC）。指標は参考値扱い", en: "Find and remove special causes (Quick/Deep GPC). Treat the metrics as reference only", id: "Temukan dan hilangkan penyebab khusus (Quick/Deep GPC). Metrik hanya sebagai acuan" }, tone: "red" },
          { title: { ja: "3b. 安定なら", en: "3b. If stable", id: "3b. Jika stabil" }, text: { ja: "不良率・V.Scoreを算出して目標値と比較", en: "Calculate the defect rate and V.Score and compare with targets", id: "Hitung tingkat cacat dan V.Score lalu bandingkan dengan target" }, tone: "green" },
          { title: { ja: "4. 継続監視", en: "4. Monitor continuously", id: "4. Pantau terus" }, text: { ja: "PDCA-Sでトレンドを見て後戻りを防ぐ", en: "Watch the trend with PDCA-S to prevent backsliding", id: "Pantau tren dengan PDCA-S untuk mencegah kemunduran" }, tone: "navy" }
        ] },
        { type: "p", text: {
          ja: "下のシミュレーターで、工程に特殊原因（平均のシフトやバラツキの増大）を加えてみましょう。管理図が異常を知らせているとき、そのデータから計算した指標は「次のロットの予測」には使えません。",
          en: "In the simulator below, inject special causes (a mean shift or increased spread). When the chart signals an abnormality, metrics calculated from that data cannot be used to predict the next lot.",
          id: "Pada simulator di bawah, tambahkan penyebab khusus (pergeseran rata-rata atau sebaran meningkat). Saat peta kendali memberi sinyal abnormal, metrik yang dihitung dari data itu tidak bisa dipakai untuk memprediksi lot berikutnya."
        } },
        { type: "widget", name: "control-chart", props: {} },
        { type: "callout", kind: "warn", title: { ja: "よくある誤り：不安定な工程の数値を実力として報告する", en: "Common mistake: reporting numbers from an unstable process as real ability", id: "Kesalahan umum: melaporkan angka dari proses tidak stabil sebagai kemampuan nyata" }, text: {
          ja: "たまたまバラツキの小さい週のデータで「不良率0.05%を達成」と報告し、翌週に不良が多発する——これは安定確認を飛ばした典型例です。数値が良くても、管理図で異常が出ていれば「この数字はまだ工程の実力を表さない」と報告するのが正しい姿勢です。",
          en: "Reporting “defect rate 0.05%, target met” from a week that happened to be quiet, then seeing defects spike the next week, is the classic result of skipping the stability check. Even if the number looks good, if the chart shows abnormalities the correct report is “this figure does not yet show what the process can do”.",
          id: "Melaporkan “tingkat cacat 0,05%, target tercapai” dari minggu yang kebetulan tenang lalu cacat melonjak minggu berikutnya adalah akibat klasik melewatkan cek kestabilan. Walau angkanya bagus, jika peta kendali menunjukkan abnormal, laporan yang benar adalah “angka ini belum menunjukkan kemampuan proses”."
        } }
      ]
    },
    {
      id: "gpcm",
      title: { ja: "GPC-M（設備制御）の評価指標", en: "GPC-M (Machine Control) Metrics", id: "Metrik GPC-M (Kendali Mesin)" },
      blocks: [
        { type: "table",
          head: [ { ja: "指標", en: "Metric", id: "Metrik" }, { ja: "定義", en: "Definition", id: "Definisi" }, { ja: "目標値", en: "Target", id: "Target" } ],
          rows: [
            [ { ja: "[[band-conformance-rate]]", en: "[[band-conformance-rate]]", id: "[[band-conformance-rate]]" }, { ja: "パラメータがGPCバンド内に収まった割合", en: "Share of parameter readings inside the GPC band", id: "Porsi pembacaan parameter di dalam GPC band" }, "≥ 99%" ],
            [ { ja: "[[defect-rate]]", en: "[[defect-rate]]", id: "[[defect-rate]]" }, { ja: "（Rework ＋ Repair ＋ Scrap）÷ 総生産数（Trialを除く）", en: "(Rework + Repair + Scrap) ÷ total production (excluding Trial)", id: "(Rework + Repair + Scrap) ÷ total produksi (tanpa Trial)" }, { ja: "製品・工程ごとに設定", en: "Set per product and process", id: "Ditetapkan per produk dan proses" } ],
            [ { ja: "[[oee]]", en: "[[oee]]", id: "[[oee]]" }, { ja: "時間稼働率 × 性能稼働率 × 良品率", en: "Availability × Performance × Yield rate", id: "Availability × Performance × Rasio produk baik" }, "≥ 85%" ],
            [ { ja: "[[xbar-r-chart]]", en: "[[xbar-r-chart]]", id: "[[xbar-r-chart]]" }, { ja: "プロセス平均とバラツキの時系列推移", en: "Time trend of process mean and range", id: "Tren waktu rata-rata dan rentang proses" }, { ja: "管理限界内", en: "Within control limits", id: "Dalam batas kendali" } ]
          ],
          caption: { ja: "GPC-M評価指標（仕様書v29 16.1）", en: "GPC-M metrics (spec v29, 16.1)", id: "Metrik GPC-M (spesifikasi v29, 16.1)" }
        },
        { type: "callout", kind: "note", title: { ja: "OEEはGPC-Mの指標", en: "OEE is a GPC-M metric", id: "OEE adalah metrik GPC-M" }, text: {
          ja: "OEEは設備の総合的な生産効率を表すため、GPC-M（設備制御）の指標に分類されます。人の総合効率は同じ考え方のOLEで見て、作業バラツキはV.Score、速さはCT達成率で見ます。",
          en: "OEE expresses the overall effectiveness of equipment, so it is classified under GPC-M (machine control). Human effectiveness is read with OLE, the same idea applied to people, while variation is read with V.Score and speed with the CT achievement rate.",
          id: "OEE menyatakan efektivitas keseluruhan peralatan, sehingga termasuk metrik GPC-M (kendali mesin). Efektivitas manusia dibaca dengan OLE, gagasan yang sama untuk manusia, sedangkan variasi dengan V.Score dan kecepatan dengan CT achievement rate."
        } },
        { type: "table",
          head: [ { ja: "区分", en: "Category", id: "Kategori" }, { ja: "内容", en: "What it is", id: "Isinya" }, { ja: "扱い", en: "How it counts", id: "Cara menghitung" } ],
          rows: [
            [ { ja: "Good（良品）", en: "Good", id: "Good (baik)" }, { ja: "追加の修理も再加工もなしに良品になったもの", en: "Came out good with no repair or rework", id: "Langsung baik tanpa perbaikan atau pengerjaan ulang" }, { ja: "OEEの良品率はこの区分だけで数える", en: "Only this counts in the OEE yield rate", id: "Hanya kategori ini yang dihitung dalam rasio produk baik (yield rate) pada OEE" } ],
            [ { ja: "Rework（再加工）", en: "Rework", id: "Rework (pengerjaan ulang)" }, { ja: "同じ工程をやり直したもの", en: "The same process was run again", id: "Proses yang sama diulang" }, { ja: "品質ロス。やり直した時間を数える", en: "Quality loss; count the time spent redoing it", id: "Kerugian kualitas; hitung waktu pengulangan" } ],
            [ { ja: "Repair（手直し）", en: "Repair", id: "Repair (perbaikan)" }, { ja: "調整や手直しで良品に戻したもの", en: "Recovered by adjustment or touch-up", id: "Dipulihkan lewat penyetelan atau perbaikan" }, { ja: "品質ロス。手直しの時間を数える", en: "Quality loss; count the repair time", id: "Kerugian kualitas; hitung waktu perbaikan" } ],
            [ { ja: "Scrap（廃棄）", en: "Scrap", id: "Scrap (barang afkir)" }, { ja: "良品化できず廃棄したもの", en: "Could not be recovered and was scrapped", id: "Tidak bisa dipulihkan dan dibuang" }, { ja: "品質ロス。投入した時間と材料を数える", en: "Quality loss; count the time and material put in", id: "Kerugian kualitas; hitung waktu dan material yang terpakai" } ],
            [ { ja: "Trial（試作・条件確認品）", en: "Trial", id: "Trial (barang uji coba)" }, { ja: "条件を確かめるために作ったもの（H-T-C-AのTrialステップとは別）", en: "Made to confirm conditions (not the Trial step of H-T-C-A)", id: "Dibuat untuk memastikan kondisi (bukan langkah Trial pada H-T-C-A)" }, { ja: "品質ロスに数えない。総生産数からも除く", en: "Not a quality loss; also excluded from total production", id: "Bukan kerugian kualitas; juga dikeluarkan dari total produksi" } ]
          ],
          caption: { ja: "[[quality-category]]：品質ロスを数える単位（仕様書v29 16.3）", en: "[[quality-category]]: the units for counting quality loss (spec v29, 16.3)", id: "[[quality-category]]: satuan untuk menghitung kerugian kualitas (spesifikasi v29, 16.3)" }
        },
        { type: "callout", kind: "note", title: { ja: "区分は個数、ロスは時間", en: "Categories in pieces, losses in time", id: "Kategori dalam unit, kerugian dalam waktu" }, text: {
          ja: "品質区分は個数で記録し、ロス構造図に載せる品質ロスは時間で数えます。[[defect-rate]]は個数の比、品質ロスは時間の比です。",
          en: "Quality categories are recorded in pieces, while the quality loss shown on the loss-structure diagram is counted in time. The [[defect-rate]] is a ratio of pieces; quality loss is a ratio of time.",
          id: "Kategori kualitas dicatat dalam jumlah unit, sedangkan kerugian kualitas pada diagram struktur kerugian dihitung dalam waktu. [[defect-rate]] adalah rasio unit; kerugian kualitas adalah rasio waktu."
        } },
        { type: "callout", kind: "key", title: { ja: "発生工程と発見工程を両方記録する", en: "Record both where a defect was made and where it was found", id: "Catat proses asal dan proses penemuan cacat" }, text: {
          ja: "不良は、発生工程（造った工程）と発見工程（見つけた工程）の両方を記録します。発見工程が発生工程より後ろにあるものを流出と数えます。[[outflow-rate]] ＝ その工程で発生し後工程以降で見つかった不良数 ÷ その工程の総生産数（Trialを除く）。不良率が同じでも、流出が多い工程は[[own-process-completion]]が成り立っていません。流出は検査の追加で止めず、発生工程の条件（X）と[[judgment-criteria]]に戻って直します（仕様書v30 16.3）。",
          en: "For each defect, record both the process of origin (where it was made) and the process of detection (where it was found). A defect found later than where it was made counts as outflow. [[outflow-rate]] = defects made in the process and found in a later process ÷ total production of that process (excluding Trial). Even with the same defect rate, a process with a lot of outflow has not achieved [[own-process-completion]]. Do not stop outflow by adding inspection; go back to the conditions (X) and the [[judgment-criteria]] of the process of origin (spec v30, 16.3).",
          id: "Untuk setiap cacat, catat proses asal (tempat dibuat) dan proses penemuan (tempat ditemukan). Cacat yang ditemukan di proses setelah proses asalnya dihitung sebagai aliran keluar. [[outflow-rate]] = cacat yang dibuat di proses itu dan ditemukan di proses selanjutnya ÷ total produksi proses itu (tanpa Trial). Meski tingkat cacatnya sama, proses dengan banyak aliran keluar belum mencapai [[own-process-completion]]. Jangan menghentikan aliran keluar dengan menambah inspeksi; kembalilah ke kondisi (X) dan [[judgment-criteria]] di proses asal (spesifikasi v30, 16.3)."
        } },
        { type: "callout", kind: "tip", title: { ja: "GPCバンドと規格の関係", en: "GPC band vs specification", id: "GPC band vs spesifikasi" }, text: {
          ja: "不良率は結果（Y）の指標、GPCバンド適合率は条件（X）の指標です。バンドは物理実験で検証した「良品を保証する工程条件の範囲」で、条件をバンド内に保つほど結果の不良率が下がって安定する、という関係で両方を見ます。",
          en: "The defect rate is a metric of the result (Y); band conformance is a metric of the conditions (X). The band is the experimentally verified range of process conditions that guarantee good parts, so the better you hold conditions inside it, the lower and steadier the defect rate becomes — watch both in that relation.",
          id: "Tingkat cacat adalah metrik hasil (Y); band conformance adalah metrik kondisi (X). Band adalah rentang kondisi proses hasil verifikasi eksperimen yang menjamin produk baik, sehingga makin baik kondisi dijaga di dalamnya, makin rendah dan stabil tingkat cacatnya — pantau keduanya dalam hubungan itu."
        } }
      ]
    },
    {
      id: "gpch",
      title: { ja: "GPC-H（人制御）の評価指標", en: "GPC-H (Human Control) Metrics", id: "Metrik GPC-H (Kendali Manusia)" },
      blocks: [
        { type: "table",
          head: [ { ja: "指標", en: "Metric", id: "Metrik" }, { ja: "定義", en: "Definition", id: "Definisi" }, { ja: "目標値", en: "Target", id: "Target" } ],
          rows: [
            [ { ja: "[[ole]]", en: "[[ole]]", id: "[[ole]]" }, { ja: "時間稼働率 × 性能稼働率 × 良品率。人の作業の総合効率", en: "Availability × Performance × Yield rate; the overall effectiveness of human work", id: "Availability × Performance × Rasio produk baik; efektivitas keseluruhan kerja manusia" }, "≥ 85%" ],
            [ { ja: "[[v-score]]（σ/μ）", en: "[[v-score]] (σ/μ)", id: "[[v-score]] (σ/μ)" }, { ja: "作業時間の変動係数", en: "Coefficient of variation of work time", id: "Koefisien variasi waktu kerja" }, { ja: "< 0.1", en: "< 0.1", id: "< 0,1" } ],
            [ { ja: "[[ct-achievement-rate]]", en: "[[ct-achievement-rate]]", id: "[[ct-achievement-rate]]" }, { ja: "標準CT以内で完了したサイクルの割合", en: "Share of cycles completed within the standard CT", id: "Porsi siklus yang selesai dalam CT standar" }, "≥ 95%" ]
          ],
          caption: { ja: "GPC-H評価指標（仕様書v29 16.2）", en: "GPC-H metrics (spec v29, 16.2)", id: "Metrik GPC-H (spesifikasi v29, 16.2)" }
        },
        { type: "callout", kind: "note", title: { ja: "設備はOEE、人はOLE", en: "OEE for equipment, OLE for people", id: "OEE untuk mesin, OLE untuk manusia" }, text: {
          ja: "設備の総合効率は[[oee|OEE]]、人の総合効率は[[ole|OLE]]で見ます。どちらも時間稼働率 × 性能稼働率 × 良品率です。[[ole|OLE]]が低いときは、[[v-score|V.Score]]（作業時間のバラツキ）と[[ct-achievement-rate|CT達成率]]（速さ）でどの要素が落ちているかを分解します。",
          en: "Equipment effectiveness is [[oee|OEE]]; human effectiveness is [[ole|OLE]]. Both are availability × performance × yield rate. When [[ole|OLE]] is low, break it down with [[v-score|V.Score]] (variation in work time) and [[ct-achievement-rate|CT achievement rate]] (speed).",
          id: "Efektivitas mesin diukur dengan [[oee|OEE]]; efektivitas manusia dengan [[ole|OLE]]. Keduanya adalah availability × performance × rasio produk baik. Bila [[ole|OLE]] rendah, uraikan dengan [[v-score|V.Score]] (variasi waktu kerja) dan [[ct-achievement-rate|rasio pencapaian CT]] (kecepatan)."
        } },
        { type: "formula",
          expr: { ja: "V.Score = σ ÷ μ　　CT達成率 = 標準CT以内のサイクル数 ÷ 全サイクル数 × 100", en: "V.Score = σ ÷ μ　　CT achievement = cycles within standard CT ÷ all cycles × 100", id: "V.Score = σ ÷ μ　　CT achievement = siklus dalam CT standar ÷ semua siklus × 100" },
          where: [
            { sym: "σ", text: { ja: "作業時間の標準偏差", en: "Standard deviation of work time", id: "Simpangan baku waktu kerja" } },
            { sym: "μ", text: { ja: "作業時間の平均", en: "Mean work time", id: "Rata-rata waktu kerja" } }
          ]
        },
        { type: "table",
          head: [ { ja: "V.Score", en: "V.Score", id: "V.Score" }, { ja: "判定", en: "Judgment", id: "Penilaian" }, { ja: "意味", en: "Meaning", id: "Arti" } ],
          rows: [
            [ { ja: "< 0.1", en: "< 0.1", id: "< 0,1" }, { ja: "極めて安定", en: "Extremely stable", id: "Sangat stabil" }, { ja: "狙いどおりのペースで流れている", en: "The line runs at the pace it was designed for", id: "Lini berjalan pada laju yang dirancang" } ],
            [ { ja: "0.1 – 0.3", en: "0.1 – 0.3", id: "0,1 – 0,3" }, { ja: "安定", en: "Stable", id: "Stabil" }, { ja: "標準作業が機能している", en: "Standard work is working", id: "Kerja standar berjalan" } ],
            [ { ja: "0.3 – 0.5", en: "0.3 – 0.5", id: "0,3 – 0,5" }, { ja: "やや不安定", en: "Slightly unstable", id: "Agak tidak stabil" }, { ja: "改善の余地がある", en: "There is room to improve", id: "Masih ada ruang perbaikan" } ],
            [ { ja: "0.5 – 1.0", en: "0.5 – 1.0", id: "0,5 – 1,0" }, { ja: "不安定", en: "Unstable", id: "Tidak stabil" }, { ja: "標準作業を見直す", en: "Revisit the standard work", id: "Tinjau ulang kerja standar" } ],
            [ { ja: "≥ 1.0", en: "≥ 1.0", id: "≥ 1,0" }, { ja: "非常に不安定", en: "Very unstable", id: "Sangat tidak stabil" }, { ja: "毎回のやり方が違う。土台の標準化から着手する", en: "Every cycle is done differently; start from the foundation", id: "Setiap siklus dikerjakan berbeda; mulai dari fondasi" } ]
          ],
          caption: { ja: "V.Scoreの判定（仕様書v29 16.4）。GPC-Hの目標値は0.1未満で、この5段階は現状がどこにあるかの目安", en: "How to read V.Score (spec v29, 16.4). The GPC-H target is < 0.1; these five bands say where the line stands today", id: "Cara membaca V.Score (spesifikasi v29, 16.4). Target GPC-H adalah < 0,1; lima pita ini menunjukkan posisi lini saat ini" }
        },
        { type: "callout", kind: "note", title: { ja: "V.Scoreの算出：モデル別に出して台数で加重平均する", en: "Computing V.Score: per model, then weighted by output", id: "Menghitung V.Score: per model, lalu dibobot dengan jumlah unit" }, text: {
          ja: "完了時刻の間隔をサイクルタイムとし、シフトで絞って休憩を除き、0.5分未満と60分超を外します。1日に複数モデルを流すラインでは、**モデルごとにσ÷μを出して生産台数で加重平均**します。全モデルを混ぜると、モデル間の速さの違いまでバラツキとして数えてしまうからです。全体のバラツキは「モデル内のバラツキ」と「モデル間の違い」に分かれ、制御したいのは前者です。",
          en: "Take the interval between completion times as the cycle time, keep the shift window, drop breaks, and exclude anything under 0.5 min or over 60 min. On a line that runs several models a day, **compute σ ÷ μ per model and take a weighted average by output**. Mixing all models counts the speed difference between models as variation. Total variation splits into within-model variation and between-model difference; the one to control is the first.",
          id: "Ambil selang antar waktu selesai sebagai waktu siklus, batasi pada jam shift, keluarkan istirahat, dan buang yang di bawah 0,5 menit atau di atas 60 menit. Pada lini yang menjalankan beberapa model per hari, **hitung σ ÷ μ per model lalu ambil rata-rata tertimbang menurut jumlah unit**. Mencampur semua model membuat perbedaan kecepatan antar model ikut terhitung sebagai variasi. Variasi total terbagi menjadi variasi dalam model dan perbedaan antar model; yang ingin dikendalikan adalah yang pertama."
        } },
        { type: "widget", name: "vscore-calc", props: { a: [31, 30, 32, 31, 30, 31, 33, 30, 31, 32], b: [28, 36, 31, 41, 29, 33, 45, 30, 34, 38] } },
        { type: "callout", kind: "zeva", title: { ja: "平均が同じでも評価は違う", en: "Same average, different evaluation", id: "Rata-rata sama, penilaian berbeda" }, text: {
          ja: "平均CTが目標を満たしていても、V.Scoreが大きければ「不安定なプロセス」として改善対象です。平均値だけで評価しない——これがZEVAの評価基準の転換です。",
          en: "Even if the average CT meets the target, a large V.Score makes it an “unstable process” and an improvement target. Never evaluate by averages alone — this is ZEVA's shift in evaluation criteria.",
          id: "Walau CT rata-rata memenuhi target, V.Score yang besar menjadikannya “proses tidak stabil” dan target perbaikan. Jangan menilai hanya dari rata-rata — inilah pergeseran kriteria evaluasi ZEVA."
        } }
      ]
    },
    {
      id: "line-balance",
      title: { ja: "編成効率はタクト基準で見る", en: "Read line balance against the takt time", id: "Baca keseimbangan lini terhadap takt time" },
      blocks: [
        { type: "p", text: {
          ja: "[[v-score|V.Score]]は作業時間そのもののバラツキ（同じ作業を繰り返したときの揺れ）を見る指標で、工程単位でもライン単位でも出せます。ただし工程どうしの釣り合いは表しません。[[line-balance-efficiency]]の基本式では基準をネックCTに置きますが、ZEVAではラインバランスを**タクトタイムを基準**に計算し、**[[neck-time|ネックタイム]]がタクトタイムを超えるときだけ**ネックタイムを基準にします。タクトタイムで流せないラインを、タクトタイムを基準に評価しても実態を表さないからです。",
          en: "[[v-score|V.Score]] looks at the variation in the work time itself — the scatter when the same work is repeated — and can be taken per process or for a whole line. What it does not show is the balance between processes. The basic [[line-balance-efficiency]] formula uses the neck CT as its reference, but ZEVA measures line balance **against the takt time**, and switches to the **[[neck-time|neck time]] only when the neck exceeds takt**. Measuring a line that cannot run at takt against the takt time would not describe reality.",
          id: "[[v-score|V.Score]] melihat variasi pada waktu kerja itu sendiri — sebaran ketika pekerjaan yang sama diulang — dan dapat diambil per proses maupun untuk satu lini. Yang tidak ditunjukkannya adalah keseimbangan antar proses. Rumus dasar [[line-balance-efficiency]] memakai CT leher botol sebagai acuan, tetapi ZEVA mengukur keseimbangan lini **terhadap takt time**, dan beralih ke **[[neck-time|waktu leher botol]] hanya bila leher botol melampaui takt**. Mengukur lini yang tidak bisa berjalan pada takt terhadap takt time tidak menggambarkan kenyataan."
        } },
        { type: "formula",
          expr: { ja: "編成効率 ＝ Σ基準サイクルタイム ÷（基準時間 × 工程数）", en: "Line balance efficiency = Σ standard CT ÷ (reference time × number of processes)", id: "Efisiensi keseimbangan lini = Σ CT standar ÷ (waktu acuan × jumlah proses)" },
          where: [
            { sym: { ja: "基準時間", en: "Reference time", id: "Waktu acuan" }, text: { ja: "タクトタイムとネックタイムの大きいほう", en: "The larger of the takt time and the neck time", id: "Yang lebih besar antara takt time dan waktu leher botol" } },
            { sym: { ja: "基準サイクルタイム", en: "Standard CT", id: "CT standar" }, text: { ja: "その工程が正常に流れたときの実力値（イレギュラーを除いた最小値）", en: "What the process does when it runs normally (the smallest value after outliers are removed)", id: "Nilai proses saat berjalan normal (nilai terkecil setelah pencilan dibuang)" } }
          ]
        },
        { type: "example",
          title: { ja: "計算例：10工程のライン（実測値）", en: "Worked example: a 10-process line (measured)", id: "Contoh perhitungan: lini 10 proses (terukur)" },
          steps: [
            { ja: "各工程の基準サイクルタイム：32／57／34／32／31／33／70／59／54／34 秒（合計436秒）", en: "Standard CT per process: 32 / 57 / 34 / 32 / 31 / 33 / 70 / 59 / 54 / 34 s (total 436 s)", id: "CT standar tiap proses: 32 / 57 / 34 / 32 / 31 / 33 / 70 / 59 / 54 / 34 dtk (total 436 dtk)" },
            { ja: "ネックタイム＝70秒、タクトタイム＝98秒 → ネックがタクト以下なので基準時間は98秒", en: "Neck time = 70 s, takt time = 98 s → the neck is within takt, so the reference time is 98 s", id: "Waktu leher botol = 70 dtk, takt time = 98 dtk → leher botol masih di bawah takt, jadi waktu acuan 98 dtk" },
            { ja: "編成効率 ＝ 436 ÷（98 × 10）＝ 44.5%、編成ロス ＝ 55.5%", en: "Efficiency = 436 ÷ (98 × 10) = 44.5%, line balance loss = 55.5%", id: "Efisiensi = 436 ÷ (98 × 10) = 44,5%, kerugian keseimbangan lini = 55,5%" },
            { ja: "タクトタイムが60秒なら、ネック70秒がタクトを超えるので基準時間は70秒。編成効率 ＝ 436 ÷（70 × 10）＝ 62.3%", en: "If takt were 60 s, the neck of 70 s exceeds it, so the reference time is 70 s. Line balance efficiency = 436 ÷ (70 × 10) = 62.3%", id: "Bila takt 60 dtk, leher botol 70 dtk melampauinya, jadi waktu acuan 70 dtk. Efisiensi keseimbangan lini = 436 ÷ (70 × 10) = 62,3%" }
          ],
          result: { ja: "同じラインでも基準時間が変われば効率の数字は変わります。報告するときは、基準時間がタクトタイムとネックタイムのどちらかを必ず添えます。", en: "The same line gives a different figure when the reference time changes. Always say which one the reference was: the takt time or the neck time.", id: "Lini yang sama memberi angka berbeda saat waktu acuan berubah. Selalu sebutkan acuannya: takt time atau waktu leher botol." }
        },
        { type: "compare",
          left: { tone: "blue", title: { ja: "基準＝タクトタイム（ネック ≦ タクト）", en: "Reference = takt time (neck ≤ takt)", id: "Acuan = takt time (leher botol ≤ takt)" }, items: [
            { ja: "効率は「タクトの枠をどれだけ使えているか」", en: "Efficiency says how much of the takt window is used", id: "Efisiensi menunjukkan seberapa banyak jendela takt terpakai" },
            { ja: "余りは工程間の待ち、または需要に対する能力の余裕", en: "The remainder is waiting between processes, or capacity beyond demand", id: "Sisanya adalah waktu tunggu antar proses, atau kapasitas melebihi permintaan" },
            { ja: "当てどころ：タクトの見直し、工程の統合", en: "Where to act: revisit the takt, merge processes", id: "Tindakan: tinjau takt, gabungkan proses" }
          ] },
          right: { tone: "amber", title: { ja: "基準＝ネックタイム（ネック ＞ タクト）", en: "Reference = neck time (neck > takt)", id: "Acuan = waktu leher botol (leher botol > takt)" }, items: [
            { ja: "効率は「実際に流せるペースに対する釣り合い」", en: "Efficiency says how even the load is against the pace the line can run", id: "Efisiensi menunjukkan kemerataan beban terhadap laju yang bisa dijalankan" },
            { ja: "余りはネック工程を待つ時間", en: "The remainder is time spent waiting for the neck process", id: "Sisanya adalah waktu menunggu proses leher botol" },
            { ja: "当てどころ：ネック工程の分割、作業の移し替え", en: "Where to act: split the neck process, move work across", id: "Tindakan: pecah proses leher botol, pindahkan pekerjaan" }
          ] }
        },
        { type: "h", text: { ja: "3つを同時に動かす：ハイブリッドスコア", en: "Move all three at once: the hybrid score", id: "Gerakkan ketiganya sekaligus: skor hibrida" } },
        { type: "p", text: {
          ja: "編成効率・工程内のバラツキ・タクトとの差は、別々に見ると改善の優先順位が決まりません。**ハイブリッドスコア**は3つを0～1にそろえて重みを掛け、100点法にまとめます。0点は最も悪い状態、100点は理想の状態を表します。バラツキの重みを大きく取るのがZEVAの立場で、バラツキが大きいままでは編成もタクト差も正しく測れないためです（仕様書v29 16.5）。",
          en: "Balance, within-process variation and the takt gap do not tell you what to do first when you read them separately. The **hybrid score** normalises all three to 0–1, weights them and reports one number out of 100. Zero is the worst state, 100 the ideal one. ZEVA puts the heaviest weight on variation, because until variation is cut neither balance nor the takt gap can be measured properly (spec v29, 16.5).",
          id: "Keseimbangan, variasi dalam proses, dan selisih takt tidak memberi tahu apa yang harus dikerjakan lebih dulu bila dibaca terpisah. **Skor hibrida** menormalkan ketiganya ke 0–1, memberi bobot, lalu melaporkan satu angka dari 100. Nol adalah keadaan terburuk, 100 keadaan ideal. ZEVA memberi bobot terbesar pada variasi, karena sebelum variasi dipangkas, keseimbangan maupun selisih takt tidak dapat diukur dengan benar (spesifikasi v29, 16.5)."
        } },
        { type: "widget", name: "hybrid-score", props: {} },
        { type: "callout", kind: "tip", title: { ja: "スライダーで確かめること", en: "What to try with the sliders", id: "Yang bisa dicoba dengan slider" }, text: {
          ja: "**工程内のバラツキを0に**すると、スコアが跳ね上がり、失点が編成とタクト差だけになります。次に**工程間のばらつきを0に**すると編成効率が100%に近づきます。逆に**重みを γ1：α1：β1 に**すると、実測ラインでも点が残り、バラツキの重さが配点で決まっていることが分かります。",
          en: "Set **within-process variation to 0** and the score jumps: the only losses left are balance and the takt gap. Then set **spread between processes to 0** and the efficiency approaches 100%. Conversely, set the **weights to γ1 : α1 : β1** and even the measured line keeps some points — which shows the weight on variation is a choice, not an accident.",
          id: "Setel **variasi dalam proses ke 0** dan skor melonjak: kerugian yang tersisa hanya keseimbangan dan selisih takt. Lalu setel **sebaran antar proses ke 0** dan efisiensi mendekati 100%. Sebaliknya, setel **bobot ke γ1 : α1 : β1** dan lini terukur pun menyisakan poin — ini menunjukkan bobot pada variasi adalah pilihan, bukan kebetulan."
        } },
        { type: "callout", kind: "note", title: { ja: "実力値で計算する", en: "Compute from what the process can do", id: "Hitung dari kemampuan proses" }, text: {
          ja: "ネックタイムも基準サイクルタイムも、イレギュラーを除いた**実力値**から計算します。実際の生産ペース（平均サイクルタイム）とは別の数です。現場で数字が食い違って見えるときは、どちらを見ているかを確かめてください。",
          en: "Both the neck time and the standard CT come from **what the process does when it runs normally**, with outliers removed. That is a different number from the actual pace (the mean cycle time). When two figures disagree on the floor, check which one is being quoted.",
          id: "Waktu leher botol maupun CT standar dihitung dari **kemampuan proses saat berjalan normal**, setelah pencilan dibuang. Itu angka yang berbeda dari laju sebenarnya (rata-rata waktu siklus). Bila dua angka tampak berbeda di lantai produksi, pastikan yang mana yang dimaksud."
        } }
      ]
    },
    {
      id: "matrix",
      title: { ja: "指標を組み合わせて読む", en: "Reading Metrics in Combination", id: "Membaca Metrik Secara Gabungan" },
      blocks: [
        { type: "p", text: {
          ja: "1つの指標だけでは状況を誤読します。例えば効率（OEE）と安定性（V.Score）を組み合わせると、改善の優先順位と方向性が見えてきます（ライン比較用の考え方で、数値の境界は各現場で決めます）。",
          en: "A single metric can mislead. Combining efficiency (OEE) with stability (V.Score), for example, shows priority and direction (a way of thinking for comparing lines; set the thresholds for your own site).",
          id: "Satu metrik saja bisa menyesatkan. Misalnya, menggabungkan efisiensi (OEE) dengan kestabilan (V.Score) memperlihatkan prioritas dan arah (cara berpikir untuk membandingkan lini; ambang batas ditetapkan tiap lokasi)."
        } },
        { type: "cards", cols: 2, items: [
          { icon: "🏆", tone: "green", title: { ja: "高OEE × 低V.Score：最良", en: "High OEE × low V.Score: best", id: "OEE tinggi × V.Score rendah: terbaik" }, text: { ja: "効率的で安定。標準を維持し、理論値へのCenter-Aimingを続ける。横展開の手本。", en: "Efficient and stable. Keep the standard, continue center-aiming toward the theoretical value. A model for rollout.", id: "Efisien dan stabil. Pertahankan standar, lanjutkan center-aiming ke nilai teoretis. Contoh untuk perluasan." } },
          { icon: "⚠️", tone: "amber", title: { ja: "高OEE × 高V.Score：要安定化", en: "High OEE × high V.Score: stabilise", id: "OEE tinggi × V.Score tinggi: stabilkan" }, text: { ja: "今は数が出ているが不安定。熟練者頼みの可能性。標準作業と動作安定の原理で再現性を固める。", en: "Output is fine now but unstable — maybe reliant on experts. Lock in reproducibility with standard work and motion stability.", id: "Output baik saat ini tetapi tidak stabil — mungkin bergantung pada ahli. Kunci reprodusibilitas dengan kerja standar dan stabilitas gerakan." } },
          { icon: "🔧", tone: "blue", title: { ja: "低OEE × 低V.Score：要稼働改善", en: "Low OEE × low V.Score: raise effectiveness", id: "OEE rendah × V.Score rendah: tingkatkan efektivitas" }, text: { ja: "安定しているのでデータは信頼できる。停止・速度・品質ロスの原因（X）をOEE分析で特定し改善。", en: "Stable, so the data can be trusted. Find the causes (X) of stop, speed and quality losses via OEE analysis and improve.", id: "Stabil, sehingga data dapat dipercaya. Temukan penyebab (X) kerugian henti, kecepatan, dan kualitas melalui analisis OEE lalu perbaiki." } },
          { icon: "🚨", tone: "red", title: { ja: "低OEE × 高V.Score：最優先", en: "Low OEE × high V.Score: top priority", id: "OEE rendah × V.Score tinggi: prioritas utama" }, text: { ja: "効率も安定性も悪い。まず土台（5S・3定・標準作業）でバラツキを抑え、信頼できるデータを取れる状態にする。", en: "Both efficiency and stability are poor. First suppress variation with the foundation (5S, 3-tei, standard work) so reliable data can be collected.", id: "Efisiensi dan kestabilan sama-sama buruk. Tekan variasi dulu dengan fondasi (5S, 3-tei, kerja standar) agar data andal bisa dikumpulkan." } }
        ] },
        { type: "callout", kind: "key", title: { ja: "なぜ「低OEE×高V.Score」はまず安定化なのか", en: "Why stabilise first for low OEE × high V.Score?", id: "Mengapa stabilkan dulu untuk OEE rendah × V.Score tinggi?" }, text: {
          ja: "バラツキが大きい状態でOEEのロス分析をしても、データの信頼性が低く、どのロスが本当の原因か判断を誤ります。好循環の起点は土台（標準化）です。",
          en: "Analysing OEE losses while variation is large gives unreliable data, so you misjudge which loss is the real cause. The virtuous cycle starts from the foundation (standardisation).",
          id: "Menganalisis kerugian OEE saat variasi besar memberi data tidak andal, sehingga salah menilai kerugian mana yang menjadi penyebab nyata. Siklus positif dimulai dari fondasi (standardisasi)."
        } },
        { type: "h", text: { ja: "トレンド監視で後戻りを防ぐ", en: "Prevent backsliding with trend monitoring", id: "Cegah kemunduran dengan pemantauan tren" } },
        { type: "table",
          head: [ { ja: "週", en: "Week", id: "Minggu" }, "V.Score", { ja: "読み方（説明用）", en: "Reading (illustrative)", id: "Cara membaca (ilustrasi)" } ],
          rows: [
            [ "1", { ja: "0.08", en: "0.08", id: "0,08" }, { ja: "極めて安定。標準が機能", en: "Extremely stable; standard works", id: "Sangat stabil; standar berjalan" } ],
            [ "2", { ja: "0.15", en: "0.15", id: "0,15" }, { ja: "安定だが悪化方向", en: "Stable but worsening", id: "Stabil tetapi memburuk" } ],
            [ "3", { ja: "0.28", en: "0.28", id: "0,28" }, { ja: "悪化傾向が続く → 標準作業の遵守状況を観察", en: "Worsening continues → observe standard-work adherence", id: "Terus memburuk → amati kepatuhan kerja standar" } ],
            [ "4", { ja: "0.42", en: "0.42", id: "0,42" }, { ja: "やや不安定の域に入った → トリアージを実施", en: "Now in the slightly-unstable band → run triage", id: "Masuk pita agak tidak stabil → lakukan triase" } ]
          ]
        },
        { type: "callout", kind: "warn", title: { ja: "指標の落とし穴", en: "Metric pitfalls", id: "Jebakan metrik" }, text: {
          ja: "①平均値だけで評価する　②安定を確認せず指標を解釈する　③測定システムを確認せず数値を信じる　④指標（Y）を良く見せるために検査強化や残業で数字を作る——いずれもZEVAの考え方に反します。",
          en: "① Evaluating by averages only ② interpreting metrics without checking stability ③ trusting numbers without checking the measurement system ④ making Y look good with extra inspection or overtime — all contradict ZEVA thinking.",
          id: "① Menilai hanya dari rata-rata ② menafsirkan metrik tanpa cek kestabilan ③ memercayai angka tanpa cek sistem pengukuran ④ membuat Y tampak bagus dengan inspeksi tambahan atau lembur — semuanya bertentangan dengan cara berpikir ZEVA."
        } }
      ]
    },
    {
      id: "practice",
      title: { ja: "演習：レポートを読み解く", en: "Exercise: Interpreting a Report", id: "Latihan: Menafsirkan Laporan" },
      blocks: [
        { type: "widget", name: "scenario", props: {
          title: { ja: "月次KPIレビュー（数値は説明用）", en: "Monthly KPI review (illustrative numbers)", id: "Tinjauan KPI bulanan (angka ilustrasi)" },
          intro: { ja: "あなたは月次レビューで2つの工程の報告を受けました。報告を読み、ZEVAの考え方で判断してください。", en: "In a monthly review you receive reports on two processes. Read them and judge using ZEVA thinking.", id: "Dalam tinjauan bulanan Anda menerima laporan dua proses. Baca dan nilai dengan cara berpikir ZEVA." },
          steps: [
            { prompt: { ja: "工程A：「今月の不良率は0.05%で目標達成」。ただしX̄-R管理図に管理限界外の点が3つある。どう判断する？", en: "Process A: “The defect rate this month is 0.05%, target met.” But the X̄-R chart has three points outside the control limits. Your judgment?", id: "Proses A: “Tingkat cacat bulan ini 0,05%, target tercapai.” Namun peta X̄-R memiliki tiga titik di luar batas kendali. Penilaian Anda?" }, choices: [
              { text: { ja: "目標達成なので問題なし", en: "Target met, no problem", id: "Target tercapai, tidak masalah" }, correct: false, feedback: { ja: "安定状態にない工程の数値は、次の週や次のロットを予測しません。0.05%はたまたまの結果かもしれません。", en: "Numbers from an unstable process do not predict the next week or the next lot; 0.05% may be a coincidence.", id: "Angka dari proses tidak stabil tidak memprediksi minggu atau lot berikutnya; 0,05% bisa saja kebetulan." } },
              { text: { ja: "工程は不安定。特殊原因を調査し、安定を確認するまで不良率の評価は保留", en: "The process is unstable. Investigate special causes and hold the defect-rate evaluation until stability is confirmed", id: "Proses tidak stabil. Selidiki penyebab khusus dan tunda evaluasi tingkat cacat sampai kestabilan dipastikan" }, correct: true, feedback: { ja: "正解。シューハートの原則に基づく判断です。", en: "Correct — a judgment based on Shewhart's principle.", id: "Benar — penilaian berdasarkan prinsip Shewhart." } }
            ] },
            { prompt: { ja: "工程B（手組立）：「OEEが80%から86%に向上」。作業時間のV.Scoreは0.42。どう評価する？", en: "Process B (manual assembly): “OEE rose from 80% to 86%.” The work-time V.Score is 0.42. How do you evaluate?", id: "Proses B (perakitan manual): “OEE naik dari 80% ke 86%.” V.Score waktu kerja 0,42. Bagaimana penilaian Anda?" }, choices: [
              { text: { ja: "OEEが目標超えなので人の作業も良好", en: "OEE exceeds target, so human work is good too", id: "OEE melampaui target, jadi kerja manusia juga baik" }, correct: false, feedback: { ja: "OEEはGPC-Mの指標です。人の作業はV.Scoreで評価し、0.42はやや不安定の域です。", en: "OEE is a GPC-M metric. Human work is judged by V.Score, and 0.42 is in the slightly-unstable band.", id: "OEE adalah metrik GPC-M. Kerja manusia dinilai dengan V.Score, dan 0,42 berada di pita agak tidak stabil." } },
              { text: { ja: "高OEE×高V.Score＝要安定化。標準作業と動作安定の原理でGPC-Hを進める", en: "High OEE × high V.Score = stabilise. Advance GPC-H with standard work and motion stability", id: "OEE tinggi × V.Score tinggi = stabilkan. Jalankan GPC-H dengan kerja standar dan stabilitas gerakan" }, correct: true, feedback: { ja: "正解。今の成果が再現性を持つようにします。", en: "Correct. Make today's result reproducible.", id: "Benar. Jadikan hasil hari ini dapat diulang." } }
            ] },
            { prompt: { ja: "工程Bの班長が「来月は作業者を急がせてCTを縮める」と提案した。どう応じる？", en: "Process B's team leader proposes “next month we rush operators to shorten CT”. How do you respond?", id: "Ketua tim Proses B mengusulkan “bulan depan operator dipercepat untuk memperpendek CT”. Bagaimana tanggapan Anda?" }, choices: [
              { text: { ja: "Yの直接操作なので不可。配置・順序・治具（X）を変える案に置き換える", en: "Not allowed — it manipulates Y directly. Replace it with changes to layout, sequence, jigs (X)", id: "Tidak boleh — memanipulasi Y secara langsung. Ganti dengan perubahan tata letak, urutan, jig (X)" }, correct: true, feedback: { ja: "正解。急がせるとバラツキと品質問題が増え、V.Scoreはさらに悪化します。", en: "Correct. Rushing increases variation and quality problems, worsening V.Score further.", id: "Benar. Terburu-buru menambah variasi dan masalah kualitas, sehingga V.Score makin buruk." } },
              { text: { ja: "CTが縮むなら採用", en: "Adopt it if CT gets shorter", id: "Terima jika CT menjadi lebih pendek" }, correct: false, feedback: { ja: "「CTが遅い→作業者を急がせる」はZEVAのNG例そのものです。", en: "“CT is slow → rush operators” is exactly a ZEVA “Don't” example.", id: "“CT lambat → percepat operator” persis contoh larangan ZEVA." } }
            ] }
          ],
          outro: { ja: "指標は「良い／悪い」の点数ではなく、次のアクションを選ぶための情報です。安定→指標→組み合わせの順に読みましょう。", en: "Metrics are not good/bad scores but information for choosing the next action. Read them in the order stability → metrics → combination.", id: "Metrik bukan skor baik/buruk melainkan informasi untuk memilih tindakan berikutnya. Baca dengan urutan kestabilan → metrik → kombinasi." }
        } }
      ]
    }
  ],
  keyPoints: [
    { ja: "評価指標はバラツキを定量化し、データに基づいてアクションできる状態かを可視化する", en: "Metrics quantify variation and show whether data-based action is possible", id: "Metrik mengkuantifikasi variasi dan menunjukkan apakah tindakan berbasis data dimungkinkan" },
    { ja: "安定状態にない工程には定義可能な工程能力が存在しない：管理図で安定を確認してから指標を評価", en: "An unstable process has no definable capability: confirm stability with a control chart before evaluating the metrics", id: "Proses tidak stabil tidak memiliki kapabilitas yang dapat didefinisikan: pastikan kestabilan dengan peta kendali sebelum evaluasi metrik" },
    { ja: "GPC-M：GPCバンド適合率≥99%、OEE≥85%、X̄-R管理限界内、不良率は製品・工程ごとの目標", en: "GPC-M: band conformance ≥ 99%, OEE ≥ 85%, X̄-R within limits, defect rate against a per-product target", id: "GPC-M: band conformance ≥ 99%, OEE ≥ 85%, X̄-R dalam batas, tingkat cacat terhadap target per produk" },
    { ja: "GPC-H：V.Score<0.1、CT達成率≥95%。平均だけで評価しない", en: "GPC-H: V.Score < 0.1, CT achievement ≥ 95%. Never evaluate by averages alone", id: "GPC-H: V.Score < 0,1, CT achievement ≥ 95%. Jangan menilai hanya dari rata-rata" },
    { ja: "OEE×V.Scoreなど指標を組み合わせて優先順位と改善の方向を決める", en: "Combine metrics such as OEE × V.Score to set priority and direction", id: "Gabungkan metrik seperti OEE × V.Score untuk menentukan prioritas dan arah" }
  ],
  quiz: [
    { q: { ja: "シューハートの原則の内容として正しいものは？", en: "Which statement is Shewhart's principle?", id: "Pernyataan mana yang merupakan prinsip Shewhart?" },
      choices: [
        { ja: "平均値が規格内なら工程能力は十分である", en: "If the mean is within spec, capability is sufficient", id: "Jika rata-rata dalam spesifikasi, kapabilitas cukup" },
        { ja: "安定状態にない工程には定義可能な工程能力が存在しない", en: "A process not in statistical control has no definable capability", id: "Proses yang tidak dalam kendali statistik tidak memiliki kapabilitas yang dapat didefinisikan" },
        { ja: "サンプル数を増やせば工程は安定する", en: "More samples make a process stable", id: "Lebih banyak sampel membuat proses stabil" },
        { ja: "不良率が目標以内なら管理図は不要", en: "If the defect rate is within target, control charts are unnecessary", id: "Jika tingkat cacat dalam target, peta kendali tidak diperlukan" }
      ], answer: 1,
      explain: { ja: "特殊原因が残る工程では今日のデータが明日を予測しないため、工程能力は定義できません。", en: "With special causes present, today's data does not predict tomorrow, so capability cannot be defined.", id: "Dengan adanya penyebab khusus, data hari ini tidak memprediksi besok, sehingga kapabilitas tidak dapat didefinisikan." } },
    { q: { ja: "不良率やV.Scoreを評価する前に行うべきことは？", en: "What should be done before evaluating the defect rate or V.Score?", id: "Apa yang harus dilakukan sebelum mengevaluasi tingkat cacat atau V.Score?" },
      choices: [
        { ja: "目標値を下げる", en: "Lower the target", id: "Turunkan target" },
        { ja: "管理図で工程の安定を確認する", en: "Confirm process stability with a control chart", id: "Pastikan kestabilan proses dengan peta kendali" },
        { ja: "OEEを計算する", en: "Calculate OEE", id: "Hitung OEE" },
        { ja: "外れ値をすべて削除する", en: "Delete all outliers", id: "Hapus semua pencilan" }
      ], answer: 1,
      explain: { ja: "X̄-R管理図などで安定状態を確認してから指標を解釈します。外れ値を削除するのは特殊原因を隠す行為です。", en: "Confirm stability with an X̄-R chart etc. before interpreting the metrics. Deleting outliers hides special causes.", id: "Pastikan kestabilan dengan peta X̄-R dsb. sebelum menafsirkan metrik. Menghapus pencilan menyembunyikan penyebab khusus." } },
    { q: { ja: "OEEはどの評価指標グループに属するか？", en: "Which metric group does OEE belong to?", id: "OEE termasuk kelompok metrik mana?" },
      choices: [ { ja: "GPC-M", en: "GPC-M", id: "GPC-M" }, { ja: "GPC-H", en: "GPC-H", id: "GPC-H" }, { ja: "トリアージ", en: "Triage", id: "Triase" }, { ja: "どれにも属さない", en: "None", id: "Tidak ada" } ], answer: 0,
      explain: { ja: "OEEは設備の総合効率を表すためGPC-Mの指標です。", en: "OEE represents equipment effectiveness, so it is a GPC-M metric.", id: "OEE mewakili efektivitas peralatan, jadi merupakan metrik GPC-M." } },
    { q: { ja: "作業時間の平均60秒、標準偏差9秒。V.Scoreと判定は？", en: "Mean work time 60 s, standard deviation 9 s. V.Score and judgment?", id: "Rata-rata waktu kerja 60 dtk, simpangan baku 9 dtk. V.Score dan penilaiannya?" },
      choices: [
        { ja: "0.15、安定", en: "0.15, stable", id: "0,15, stabil" },
        { ja: "0.15、極めて安定", en: "0.15, extremely stable", id: "0,15, sangat stabil" },
        { ja: "6.7、非常に不安定", en: "6.7, very unstable", id: "6,7, sangat tidak stabil" },
        { ja: "0.09、極めて安定", en: "0.09, extremely stable", id: "0,09, sangat stabil" }
      ], answer: 0,
      explain: { ja: "9÷60=0.15。0.1〜0.3は「安定（標準作業が機能）」です。", en: "9 ÷ 60 = 0.15. 0.1–0.3 is “stable (standard work is working)”.", id: "9 ÷ 60 = 0,15. 0,1–0,3 adalah “stabil (kerja standar berjalan)”." } },
    { q: { ja: "GPCバンド適合率の目標値は？", en: "What is the target for GPC band conformance rate?", id: "Berapa target GPC band conformance rate?" },
      choices: [ { ja: "≥ 85%", en: "≥ 85%", id: "≥ 85%" }, { ja: "≥ 95%", en: "≥ 95%", id: "≥ 95%" }, { ja: "≥ 99%", en: "≥ 99%", id: "≥ 99%" }, { ja: "100%以外は不可", en: "Anything below 100% is unacceptable", id: "Di bawah 100% tidak dapat diterima" } ], answer: 2,
      explain: { ja: "GPCバンド適合率は≥99%、CT達成率は≥95%、OEEは≥85%です。", en: "Band conformance ≥ 99%, CT achievement ≥ 95%, OEE ≥ 85%.", id: "Band conformance ≥ 99%, CT achievement ≥ 95%, OEE ≥ 85%." } },
    { q: { ja: "低OEE×高V.Scoreのラインで最初に取り組むべきことは？", en: "On a line with low OEE × high V.Score, what should be tackled first?", id: "Pada lini dengan OEE rendah × V.Score tinggi, apa yang pertama ditangani?" },
      choices: [
        { ja: "残業で生産数を確保する", en: "Secure output with overtime", id: "Mengamankan output dengan lembur" },
        { ja: "高額な自動化設備を導入する", en: "Buy expensive automation", id: "Membeli otomasi mahal" },
        { ja: "土台（5S・3定・標準作業）でバラツキを抑え、信頼できるデータを取れる状態にする", en: "Suppress variation with the foundation (5S, 3-tei, standard work) so reliable data can be collected", id: "Tekan variasi dengan fondasi (5S, 3-tei, kerja standar) agar data andal bisa dikumpulkan" },
        { ja: "OEEのロス分析を詳細に行う", en: "Do a detailed OEE loss analysis", id: "Lakukan analisis kerugian OEE secara rinci" }
      ], answer: 2,
      explain: { ja: "バラツキが大きいとロス分析のデータも信頼できません。好循環の起点は土台です。", en: "With large variation even loss-analysis data is unreliable. The virtuous cycle starts at the foundation.", id: "Dengan variasi besar, data analisis kerugian pun tidak andal. Siklus positif dimulai dari fondasi." } },
    { q: { ja: "次のうちZEVAの考え方に沿った指標の扱いはどれか？", en: "Which use of metrics is consistent with ZEVA?", id: "Penggunaan metrik mana yang sesuai dengan ZEVA?" },
      choices: [
        { ja: "平均CTが目標内なのでV.Scoreは見ない", en: "Average CT meets target, so ignore V.Score", id: "CT rata-rata memenuhi target, jadi abaikan V.Score" },
        { ja: "V.Scoreの週次トレンドを見て、悪化傾向で標準作業の遵守状況を確認する", en: "Watch the weekly V.Score trend and check standard-work adherence when it worsens", id: "Pantau tren V.Score mingguan dan cek kepatuhan kerja standar saat memburuk" },
        { ja: "不良率を下げるため全数検査を追加し、指標を改善する", en: "Add 100% inspection to lower the defect rate metric", id: "Menambah inspeksi 100% untuk menurunkan metrik tingkat cacat" },
        { ja: "MSAを省略して早く数値を報告する", en: "Skip MSA to report numbers quickly", id: "Lewati MSA agar cepat melaporkan angka" }
      ], answer: 1,
      explain: { ja: "トレンド監視で後戻りを防ぐのが正しい使い方です。他はいずれも落とし穴です。", en: "Trend monitoring to prevent backsliding is correct; the others are pitfalls.", id: "Pemantauan tren untuk mencegah kemunduran adalah yang benar; lainnya adalah jebakan." } }
  ]
});
