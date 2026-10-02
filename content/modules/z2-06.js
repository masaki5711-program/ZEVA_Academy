ZA.addModule({
  id: 'z2-06',
  track: 'z2',
  order: 6,
  minutes: 35,
  icon: '🔁',
  level: 2,
  prereq: ['z2-05'],
  title: { ja: 'PDCA-Sと3つのサイクル', en: 'PDCA-S and the Three Cycles', id: 'PDCA-S dan Tiga Siklus' },
  summary: {
    ja: 'H-T-C-A・DMAIC・PDCA-Sの役割の違いとつながり、そして改善結果を定着させるGPC-M / GPC-Hの日常運用プロトコルを学びます。',
    en: 'Learn the different roles and connections of H-T-C-A, DMAIC and PDCA-S, and the GPC-M / GPC-H daily operation protocols that sustain improvement results.',
    id: 'Pelajari perbedaan peran dan keterkaitan H-T-C-A, DMAIC, dan PDCA-S, serta protokol operasi harian GPC-M / GPC-H yang mempertahankan hasil perbaikan.'
  },
  objectives: [
    { ja: '3つのサイクルの目的・期間・アウトプットを区別できる', en: 'Distinguish the purpose, duration and output of the three cycles', id: 'Membedakan tujuan, durasi, dan keluaran tiga siklus' },
    { ja: 'サイクル間の接続（引き継ぎ）を説明できる', en: 'Explain how the cycles connect (hand-over)', id: 'Menjelaskan keterkaitan siklus (serah terima)' },
    { ja: 'よくある4つの混同を正しく説明できる', en: 'Correctly explain four common confusions', id: 'Menjelaskan dengan benar empat kekeliruan umum' },
    { ja: 'GPC-M / GPC-Hの日常運用・異常対応・定期レビューを説明できる', en: 'Explain daily operation, abnormality response and periodic review for GPC-M / GPC-H', id: 'Menjelaskan operasi harian, respons abnormal, dan tinjauan berkala GPC-M / GPC-H' }
  ],
  sections: [
    {
      id: 'three',
      title: { ja: '3つのサイクルの位置づけ', en: 'Positioning of the three cycles', id: 'Posisi tiga siklus' },
      blocks: [
        { type: 'p', text: {
          ja: 'ZEVAでは3種類のサイクルが使われます。これらは**代替関係ではなく、フェーズの異なる補完関係**にあります。「どれを使うか」ではなく「今どのフェーズか」で使い分けます。',
          en: 'ZEVA uses three kinds of cycles. They are **not alternatives but complements for different phases**. Choose not by "which one do I like" but by "which phase am I in now".',
          id: 'ZEVA memakai tiga jenis siklus. Ketiganya **bukan alternatif tetapi saling melengkapi untuk fase berbeda**. Pilih bukan berdasarkan "mana yang saya suka" tetapi "saya di fase mana sekarang".'
        } },
        { type: 'compare',
          left: { title: { ja: '改善フェーズ：課題を発見し解決する', en: 'Improvement phase: find and solve issues', id: 'Fase perbaikan: temukan dan selesaikan masalah' }, tone: 'blue', items: [
            { ja: '[[htca]]（Quick GPC）', en: '[[htca]] (Quick GPC)', id: '[[htca]] (Quick GPC)' },
            { ja: '[[dmaic]]（Deep GPC）', en: '[[dmaic]] (Deep GPC)', id: '[[dmaic]] (Deep GPC)' }
          ] },
          right: { title: { ja: '維持フェーズ：改善結果を定着させ日常運用する', en: 'Maintenance phase: sustain results in daily operation', id: 'Fase pemeliharaan: pertahankan hasil dalam operasi harian' }, tone: 'green', items: [
            { ja: '[[pdca-s]]（日常運用）', en: '[[pdca-s]] (daily operation)', id: '[[pdca-s]] (operasi harian)' }
          ] }
        },
        { type: 'table',
          head: [ '', { ja: 'H-T-C-A（Quick GPC）', en: 'H-T-C-A (Quick GPC)', id: 'H-T-C-A (Quick GPC)' }, { ja: 'DMAIC（Deep GPC）', en: 'DMAIC (Deep GPC)', id: 'DMAIC (Deep GPC)' }, { ja: 'PDCA-S（日常運用）', en: 'PDCA-S (daily operation)', id: 'PDCA-S (operasi harian)' } ],
          rows: [
            [ { ja: '目的', en: 'Purpose', id: 'Tujuan' }, { ja: '高速に仮説検証し課題を解決', en: 'Solve issues by fast hypothesis testing', id: 'Selesaikan masalah dengan uji hipotesis cepat' }, { ja: '統計的に根本原因を特定し抜本解決', en: 'Find root cause statistically and solve fundamentally', id: 'Temukan akar penyebab secara statistik dan selesaikan mendasar' }, { ja: '改善後の状態を標準化し維持', en: 'Standardize and maintain the improved state', id: 'Standarkan dan pertahankan kondisi hasil perbaikan' } ],
            [ { ja: '適用タイミング', en: 'When', id: 'Kapan' }, { ja: 'トリアージ後（Route A）', en: 'After triage (Route A)', id: 'Setelah triase (Route A)' }, { ja: 'トリアージ後（Route B）', en: 'After triage (Route B)', id: 'Setelah triase (Route B)' }, { ja: '改善完了後（日常的に継続）', en: 'After improvement (continuous)', id: 'Setelah perbaikan (berkelanjutan)' } ],
            [ { ja: '期間', en: 'Duration', id: 'Durasi' }, { ja: '1日〜1週間', en: '1 day – 1 week', id: '1 hari – 1 minggu' }, { ja: '1〜3ヶ月', en: '1 – 3 months', id: '1 – 3 bulan' }, { ja: '継続的（終わりなし）', en: 'Continuous (no end)', id: 'Berkelanjutan (tanpa akhir)' } ],
            [ { ja: 'ステップ', en: 'Steps', id: 'Langkah' }, 'Hypothesis · Trial · Check · Action', 'Define · Measure · Analyze · Improve · Control', 'Plan · Do · Check · Act · Standardize' ],
            [ { ja: '統計知識', en: 'Statistics', id: 'Statistik' }, { ja: '不要', en: 'Not needed', id: 'Tidak perlu' }, { ja: '必要', en: 'Needed', id: 'Perlu' }, { ja: '不要', en: 'Not needed', id: 'Tidak perlu' } ],
            [ { ja: 'アウトプット', en: 'Output', id: 'Keluaran' }, { ja: '暫定標準（30日以内に正式化）', en: 'Temporary standard (formalise within 30 days)', id: 'Standar sementara (resmikan dalam 30 hari)' }, { ja: 'GPCバンド再設定・SOP改訂', en: 'GPC band reset, SOP revision', id: 'Penetapan ulang GPC band, revisi SOP' }, { ja: '標準の維持・更新、異常の早期発見', en: 'Maintain/update standards, early abnormality detection', id: 'Pertahankan/perbarui standar, deteksi dini abnormal' } ]
          ],
          caption: { ja: '3つのサイクルの比較', en: 'Comparison of the three cycles', id: 'Perbandingan tiga siklus' }
        },
        { type: 'callout', kind: 'key', title: { ja: 'ポイント', en: 'Point', id: 'Poin' }, text: {
          ja: 'H-T-C-AとDMAICは「課題を**解決する**ためのサイクル」、PDCA-Sは「解決後の状態を**維持する**ためのサイクル」。改善の実行と維持は別のフェーズであり、両者を組み合わせることで改善効果が定着します。',
          en: 'H-T-C-A and DMAIC are cycles to **solve** issues; PDCA-S is the cycle to **maintain** the solved state. Executing and sustaining improvement are separate phases; combining them makes the effect stick.',
          id: 'H-T-C-A dan DMAIC adalah siklus untuk **menyelesaikan** masalah; PDCA-S adalah siklus untuk **mempertahankan** kondisi setelah selesai. Menjalankan dan mempertahankan perbaikan adalah fase terpisah; menggabungkannya membuat efek bertahan.'
        } }
      ]
    },
    {
      id: 'connect',
      title: { ja: 'サイクル間の接続', en: 'How the cycles connect', id: 'Keterkaitan antar siklus' },
      blocks: [
        { type: 'diagram', name: 'cycle-map', caption: { ja: '課題発生 → トリアージ → H-T-C-A または DMAIC → PDCA-S。H-T-C-Aで3回失敗したらDMAICへ', en: 'Issue → triage → H-T-C-A or DMAIC → PDCA-S. After 3 H-T-C-A failures, move to DMAIC', id: 'Masalah → triase → H-T-C-A atau DMAIC → PDCA-S. Setelah 3 kegagalan H-T-C-A, beralih ke DMAIC' } },
        { type: 'flow', dir: 'v', nodes: [
          { title: { ja: '課題発生 → トリアージ判定', en: 'Issue occurs → triage decision', id: 'Masalah terjadi → keputusan triase' }, text: { ja: '4基準でRoute A / Bを決める', en: 'Decide Route A / B with the four criteria', id: 'Tentukan Route A / B dengan empat kriteria' }, tone: 'gray' },
          { title: { ja: 'Route A：H-T-C-A', en: 'Route A: H-T-C-A', id: 'Route A: H-T-C-A' }, text: { ja: '成功 → PDCA-Sへ移行／3回失敗 → Route Bへエスカレーション', en: 'Success → move to PDCA-S / 3 failures → escalate to Route B', id: 'Berhasil → beralih ke PDCA-S / 3 kegagalan → eskalasi ke Route B' }, tone: 'green' },
          { title: { ja: 'Route B：DMAIC', en: 'Route B: DMAIC', id: 'Route B: DMAIC' }, text: { ja: 'Control完了 → PDCA-Sへ移行', en: 'Control complete → move to PDCA-S', id: 'Control selesai → beralih ke PDCA-S' }, tone: 'navy' },
          { title: { ja: 'PDCA-S（日常運用）', en: 'PDCA-S (daily operation)', id: 'PDCA-S (operasi harian)' }, text: { ja: '標準を維持し、異常があれば再びトリアージへ', en: 'Maintain standards; on abnormality, go back to triage', id: 'Pertahankan standar; jika abnormal, kembali ke triase' }, tone: 'blue' }
        ] },
        { type: 'callout', kind: 'zeva', title: { ja: 'DMAICのControlとPDCA-SのPlanは接続している', en: 'DMAIC Control connects to PDCA-S Plan', id: 'Control DMAIC terhubung ke Plan PDCA-S' }, text: {
          ja: 'DMAICのControlフェーズで設定した管理図・監視項目が、PDCA-Sの「Plan」にそのまま引き継がれます。プロジェクトの「締め」が日常運用の「始まり」になるのです。',
          en: 'The control charts and monitoring items set in the DMAIC Control phase are handed over directly to the "Plan" of PDCA-S. The "close" of the project becomes the "start" of daily operation.',
          id: 'Peta kontrol dan item pemantauan yang ditetapkan di fase Control DMAIC diserahkan langsung ke "Plan" PDCA-S. "Penutupan" proyek menjadi "awal" operasi harian.'
        } },
        { type: 'widget', name: 'sort-game', props: {
          title: { ja: 'この活動はどのサイクル？', en: 'Which cycle is this activity?', id: 'Aktivitas ini siklus mana?' },
          bins: [
            { id: 'q', label: { ja: 'H-T-C-A（Quick GPC）', en: 'H-T-C-A (Quick GPC)', id: 'H-T-C-A (Quick GPC)' }, tone: 'green' },
            { id: 'd', label: { ja: 'DMAIC（Deep GPC）', en: 'DMAIC (Deep GPC)', id: 'DMAIC (Deep GPC)' }, tone: 'navy' },
            { id: 'p', label: { ja: 'PDCA-S（日常運用）', en: 'PDCA-S (daily operation)', id: 'PDCA-S (operasi harian)' }, tone: 'blue' }
          ],
          items: [
            { text: { ja: '「治具の角度を変えれば挿入ミスが減るはず」と考え、今日10個試す', en: 'Think "changing the jig angle should reduce insertion errors" and try 10 pieces today', id: 'Berpikir "mengubah sudut jig seharusnya mengurangi salah pasang" dan coba 10 buah hari ini' }, bin: 'q', explain: { ja: '仮説→少量トライの高速改善です。', en: 'Hypothesis → small trial: fast improvement.', id: 'Hipotesis → uji coba kecil: perbaikan cepat.' } },
            { text: { ja: '測定システム分析を行い、4週間分のデータ収集計画を立てる', en: 'Perform measurement system analysis and plan 4 weeks of data collection', id: 'Lakukan analisis sistem pengukuran dan rencanakan pengumpulan data 4 minggu' }, bin: 'd', explain: { ja: 'MeasureフェーズのDMAIC活動です。', en: 'A DMAIC Measure-phase activity.', id: 'Aktivitas fase Measure DMAIC.' } },
            { text: { ja: '毎日3回、GPCバンドに対する温度を確認し記録する', en: 'Check and record temperature against the GPC band three times a day', id: 'Periksa dan catat suhu terhadap GPC band tiga kali sehari' }, bin: 'p', explain: { ja: '改善後の状態を維持・監視する日常運用です。', en: 'Daily operation that maintains and monitors the improved state.', id: 'Operasi harian yang mempertahankan dan memantau kondisi hasil perbaikan.' } },
            { text: { ja: '分散分析で部品ロット間差が主因かどうかを検証する', en: 'Verify with ANOVA whether lot-to-lot difference is the main cause', id: 'Verifikasi dengan ANOVA apakah perbedaan antar lot adalah penyebab utama' }, bin: 'd', explain: { ja: 'Analyzeフェーズの統計分析です。', en: 'Statistical analysis in the Analyze phase.', id: 'Analisis statistik di fase Analyze.' } },
            { text: { ja: '暫定標準を30日以内に正式承認し、WIを確定する', en: 'Formally approve the temporary standard within 30 days and finalise the WI', id: 'Setujui resmi standar sementara dalam 30 hari dan finalkan WI' }, bin: 'p', explain: { ja: 'Quick GPC後のPDCA-Sの「S」（WI正式承認）です。', en: 'The "S" of PDCA-S after Quick GPC (formal WI approval).', id: '"S" dari PDCA-S setelah Quick GPC (persetujuan resmi WI).' } },
            { text: { ja: '成功したトライ結果を写真1枚とコメントでナレッジ登録する', en: 'Register a successful trial with one photo and a comment', id: 'Daftarkan uji coba berhasil dengan satu foto dan komentar' }, bin: 'q', explain: { ja: 'H-T-C-AのAction（簡易登録）です。', en: 'The Action of H-T-C-A (quick registration).', id: 'Action dari H-T-C-A (pendaftaran cepat).' } },
            { text: { ja: '実験計画法で最適条件を求め、パイロットランで検証する', en: 'Find optimal conditions with DOE and verify with a pilot run', id: 'Temukan kondisi optimal dengan DOE dan verifikasi dengan pilot run' }, bin: 'd', explain: { ja: 'Improveフェーズの活動です。', en: 'An Improve-phase activity.', id: 'Aktivitas fase Improve.' } },
            { text: { ja: '作業者別V.Scoreを週次で集計し、悪化した工程を確認する', en: 'Summarise V.Score by operator weekly and check deteriorating processes', id: 'Rangkum V.Score per operator setiap minggu dan periksa proses yang memburuk' }, bin: 'p', explain: { ja: 'GPC-Hの定期レビュー（日常運用）です。', en: 'Periodic review of GPC-H (daily operation).', id: 'Tinjauan berkala GPC-H (operasi harian).' } }
          ]
        } }
      ]
    },
    {
      id: 'confusions',
      title: { ja: 'よくある混同と正しい理解', en: 'Common confusions and correct understanding', id: 'Kekeliruan umum dan pemahaman yang benar' },
      blocks: [
        { type: 'table',
          head: [ { ja: '混同パターン', en: 'Confusion', id: 'Kekeliruan' }, { ja: '正しい理解', en: 'Correct understanding', id: 'Pemahaman yang benar' } ],
          rows: [
            [ { ja: '「DMAICとPDCA-Sは同じようなものでは？」', en: '"Are DMAIC and PDCA-S not basically the same?"', id: '"Bukankah DMAIC dan PDCA-S pada dasarnya sama?"' }, { ja: 'DMAICは「問題を解決する」サイクル。PDCA-Sは「解決後の状態を維持する」サイクル。目的が根本的に異なる。', en: 'DMAIC solves a problem; PDCA-S maintains the solved state. Their purposes are fundamentally different.', id: 'DMAIC menyelesaikan masalah; PDCA-S mempertahankan kondisi setelah selesai. Tujuannya berbeda secara mendasar.' } ],
            [ { ja: '「PDCA-Sだけで改善できるのでは？」', en: '"Can we not improve with PDCA-S alone?"', id: '"Bukankah bisa memperbaiki hanya dengan PDCA-S?"' }, { ja: 'PDCA-Sは既存標準の微調整には使えるが、根本原因の特定や抜本改善には不向き。複雑な課題にはDMAICが必要。', en: 'PDCA-S works for fine-tuning existing standards but is unsuitable for root-cause identification or fundamental improvement. Complex issues need DMAIC.', id: 'PDCA-S cocok untuk penyesuaian halus standar yang ada tetapi tidak cocok untuk identifikasi akar penyebab atau perbaikan mendasar. Masalah kompleks butuh DMAIC.' } ],
            [ { ja: '「DMAICのControlとPDCA-SのCheckは同じ？」', en: '"Are DMAIC Control and PDCA-S Check the same?"', id: '"Apakah Control DMAIC dan Check PDCA-S sama?"' }, { ja: 'Controlは改善プロジェクトの「締め」で管理体制の構築。Checkは日常運用での定期的な確認。Controlの結果がPDCA-Sに引き継がれる。', en: 'Control is the "close" of an improvement project, building the control system. Check is routine confirmation in daily operation. Control results hand over to PDCA-S.', id: 'Control adalah "penutupan" proyek perbaikan, membangun sistem kontrol. Check adalah konfirmasi rutin dalam operasi harian. Hasil Control diserahkan ke PDCA-S.' } ],
            [ { ja: '「H-T-C-AはPDCAの簡略版では？」', en: '"Is H-T-C-A not a simplified PDCA?"', id: '"Bukankah H-T-C-A adalah PDCA yang disederhanakan?"' }, { ja: 'H-T-C-Aは「仮説→実験→検証→標準化」の改善サイクル。PDCA-Sは「計画→実行→確認→是正→標準化」の維持サイクル。起点が異なる（仮説 vs 計画）。', en: 'H-T-C-A is an improvement cycle: hypothesis → experiment → verification → standardization. PDCA-S is a maintenance cycle: plan → do → check → act → standardize. The starting point differs (hypothesis vs plan).', id: 'H-T-C-A adalah siklus perbaikan: hipotesis → eksperimen → verifikasi → standardisasi. PDCA-S adalah siklus pemeliharaan: rencana → lakukan → periksa → tindak → standarkan. Titik awalnya berbeda (hipotesis vs rencana).' } ]
          ]
        },
        { type: 'check', q: { ja: '「PDCA-Sを回していれば、原因不明の慢性不良も解決できる」。この考えは？', en: '"If we run PDCA-S, chronic defects of unknown cause will also be solved." This idea is…', id: '"Jika PDCA-S dijalankan, cacat kronis tanpa penyebab jelas juga akan terselesaikan." Gagasan ini…' }, choices: [
          { ja: '正しい。PDCA-Sは万能の改善サイクル', en: 'Correct. PDCA-S is an all-purpose improvement cycle', id: 'Benar. PDCA-S adalah siklus perbaikan serba guna' },
          { ja: '誤り。原因不明の課題はトリアージでDeep GPC（DMAIC）に振り分ける', en: 'Wrong. Unknown-cause issues go to Deep GPC (DMAIC) through triage', id: 'Salah. Masalah tanpa penyebab jelas diarahkan ke Deep GPC (DMAIC) melalui triase' },
          { ja: '誤り。原因不明の課題は改善対象外', en: 'Wrong. Unknown-cause issues are outside improvement scope', id: 'Salah. Masalah tanpa penyebab jelas di luar cakupan perbaikan' }
        ], answer: 1, explain: { ja: 'PDCA-Sは維持サイクル。根本原因の特定にはDMAICを使います。', en: 'PDCA-S is a maintenance cycle. Use DMAIC to identify root causes.', id: 'PDCA-S adalah siklus pemeliharaan. Gunakan DMAIC untuk mengidentifikasi akar penyebab.' } }
      ]
    },
    {
      id: 'pdcas',
      title: { ja: 'PDCA-Sサイクルの各ステップ', en: 'Steps of the PDCA-S cycle', id: 'Langkah siklus PDCA-S' },
      blocks: [
        { type: 'callout', kind: 'warn', title: { ja: '重要', en: 'Important', id: 'Penting' }, text: {
          ja: '**Sなきサイクルは改善の「やりっぱなし」を生む**。Sで固定化することで改善効果が定着します。',
          en: '**A cycle without S produces "do-and-forget" improvement.** Fixing results with S makes the effect stick.',
          id: '**Siklus tanpa S menghasilkan perbaikan "kerjakan lalu lupakan".** Mengunci hasil dengan S membuat efek bertahan.'
        } },
        { type: 'p', text: {
          ja: 'PDCA+Sは原則体系の**原則③**でもあります。改善を標準に還元し、土台（標準化）を更新し続けるメカニズムが「土台 → 原則 → 改善 → 土台更新」という循環の駆動力になります。「決める → 守る → 改める」を回し続けることがZEVAの本質的な実践です。',
          en: 'PDCA+S is also **Principle ③** of the principle system. The mechanism that returns improvement to standards and keeps updating the foundation (standardization) drives the loop "foundation → principles → improvement → updated foundation". Continuing "decide → keep → revise" is the essential practice of ZEVA.',
          id: 'PDCA+S juga merupakan **Prinsip ③** dalam sistem prinsip. Mekanisme yang mengembalikan perbaikan ke standar dan terus memperbarui fondasi (standardisasi) menggerakkan siklus "fondasi → prinsip → perbaikan → fondasi diperbarui". Terus menjalankan "tetapkan → jaga → revisi" adalah praktik inti ZEVA.'
        } },
        { type: 'table',
          head: [ { ja: 'ステップ', en: 'Step', id: 'Langkah' }, { ja: '内容', en: 'Content', id: 'Isi' }, { ja: 'Quick GPC（H-T-C-A）後', en: 'After Quick GPC (H-T-C-A)', id: 'Setelah Quick GPC (H-T-C-A)' }, { ja: 'Deep GPC（DMAIC）後', en: 'After Deep GPC (DMAIC)', id: 'Setelah Deep GPC (DMAIC)' } ],
          rows: [
            [ 'Plan', { ja: '監視計画の策定', en: 'Make a monitoring plan', id: 'Susun rencana pemantauan' }, { ja: '簡易チェック項目を設定', en: 'Set simple check items', id: 'Tetapkan item cek sederhana' }, { ja: '管理図・監視項目を設計', en: 'Design control charts and monitoring items', id: 'Rancang peta kontrol dan item pemantauan' } ],
            [ 'Do', { ja: '計画に基づく実行', en: 'Execute per plan', id: 'Laksanakan sesuai rencana' }, { ja: '標準作業の実施', en: 'Perform standard work', id: 'Lakukan kerja standar' }, { ja: 'コントロールプランの実行', en: 'Execute the control plan', id: 'Jalankan rencana kontrol' } ],
            [ 'Check', { ja: '結果の確認', en: 'Confirm results', id: 'Konfirmasi hasil' }, { ja: 'V.Score・CT達成率の確認', en: 'Check V.Score and CT achievement', id: 'Periksa V.Score dan pencapaian CT' }, { ja: '不良率・管理図の確認', en: 'Check the defect rate and control charts', id: 'Periksa tingkat cacat dan peta kontrol' } ],
            [ 'Act', { ja: '差異への対応', en: 'Respond to gaps', id: 'Tanggapi selisih' }, { ja: '軽微な調整', en: 'Minor adjustment', id: 'Penyesuaian kecil' }, { ja: '要因分析の再実施', en: 'Re-run factor analysis', id: 'Ulangi analisis faktor' } ],
            [ 'Standardize', { ja: '効果の固定化', en: 'Lock in the effect', id: 'Kunci efeknya' }, { ja: 'WI正式承認', en: 'Formal WI approval', id: 'Persetujuan resmi WI' }, { ja: 'SOP改訂＋教育', en: 'SOP revision + training', id: 'Revisi SOP + pelatihan' } ]
          ],
          caption: { ja: 'PDCA-Sの各ステップ（前段の改善サイクル別）', en: 'PDCA-S steps by preceding improvement cycle', id: 'Langkah PDCA-S menurut siklus perbaikan sebelumnya' }
        },
        { type: 'cycle', center: { ja: '決める→守る→改める', en: 'Decide → Keep → Revise', id: 'Tetapkan → Jaga → Revisi' }, nodes: [
          { title: { ja: 'P 計画', en: 'P Plan', id: 'P Rencana' }, text: { ja: '監視計画', en: 'Monitoring plan', id: 'Rencana pemantauan' }, tone: 'blue' },
          { title: { ja: 'D 実行', en: 'D Do', id: 'D Lakukan' }, text: { ja: '標準どおり実施', en: 'Execute as standard', id: 'Laksanakan sesuai standar' }, tone: 'blue' },
          { title: { ja: 'C 確認', en: 'C Check', id: 'C Periksa' }, text: { ja: '指標で確認', en: 'Confirm by metrics', id: 'Konfirmasi dengan metrik' }, tone: 'green' },
          { title: { ja: 'A 是正', en: 'A Act', id: 'A Tindak' }, text: { ja: '差異に対応', en: 'Respond to gaps', id: 'Tanggapi selisih' }, tone: 'amber' },
          { title: { ja: 'S 標準化', en: 'S Standardize', id: 'S Standarkan' }, text: { ja: '新たな標準として固定', en: 'Lock in as new standard', id: 'Kunci sebagai standar baru' }, tone: 'navy' }
        ] }
      ]
    },
    {
      id: 'protocol',
      title: { ja: 'GPC-M / GPC-H 運用プロトコル', en: 'GPC-M / GPC-H operation protocols', id: 'Protokol operasi GPC-M / GPC-H' },
      blocks: [
        { type: 'h', text: { ja: 'GPC-M 運用プロトコル', en: 'GPC-M operation protocol', id: 'Protokol operasi GPC-M' } },
        { type: 'table',
          head: [ { ja: '区分', en: 'Category', id: 'Kategori' }, { ja: '内容', en: 'Content', id: 'Isi' } ],
          rows: [
            [ { ja: '日常運用：測定', en: 'Daily: measure', id: 'Harian: ukur' }, { ja: '設備パラメータを連続計測（センサー）または定点サンプリング', en: 'Measure machine parameters continuously (sensor) or by fixed-point sampling', id: 'Ukur parameter mesin terus-menerus (sensor) atau sampling titik tetap' } ],
            [ { ja: '日常運用：監視', en: 'Daily: monitor', id: 'Harian: pantau' }, { ja: 'GPCバンドに対する現在値を確認（デジタル化レベルに応じた方法）', en: 'Check current value against the GPC band (method by digital level)', id: 'Periksa nilai saat ini terhadap GPC band (metode sesuai level digital)' } ],
            [ { ja: '日常運用：記録', en: 'Daily: record', id: 'Harian: catat' }, { ja: '測定値、GPCバンド適合/逸脱、タイムスタンプを記録', en: 'Record value, in-band / deviation, timestamp', id: 'Catat nilai, dalam band / menyimpang, stempel waktu' } ],
            [ { ja: '日常運用：改善', en: 'Daily: improve', id: 'Harian: perbaiki' }, { ja: 'Center-Aimingで分布中心をTargetに近づける', en: 'Move the distribution centre toward Target by Center-Aiming', id: 'Geser pusat distribusi ke Target dengan Center-Aiming' } ],
            [ { ja: '異常対応', en: 'Abnormality', id: 'Abnormal' }, { ja: 'GPCバンド逸脱時は即座に生産停止し原因究明 → トリアージ。Quickで対応可能なら即時パラメータ調整、根本原因不明ならDeep GPC起動', en: 'On band deviation stop production immediately, investigate → triage. If Quick can handle it, adjust parameters at once; if root cause is unknown, start Deep GPC', id: 'Saat keluar band hentikan produksi segera, selidiki → triase. Jika Quick bisa menangani, setel parameter segera; jika akar penyebab tidak diketahui, mulai Deep GPC' } ],
            [ { ja: '定期レビュー', en: 'Periodic review', id: 'Tinjauan berkala' }, { ja: 'GPCバンド適合率・OEE・不良率の集計分析、バンド設定の妥当性検証、改善機会の特定（ギャップ分析の更新）', en: 'Summarise band conformance, OEE and the defect rate; verify band validity; identify improvement opportunities (update gap analysis)', id: 'Rangkum kesesuaian band, OEE, tingkat cacat; verifikasi validitas band; identifikasi peluang perbaikan (perbarui analisis gap)' } ]
          ]
        },
        { type: 'h', text: { ja: 'GPC-H 運用プロトコル', en: 'GPC-H operation protocol', id: 'Protokol operasi GPC-H' } },
        { type: 'table',
          head: [ { ja: '区分', en: 'Category', id: 'Kategori' }, { ja: '内容', en: 'Content', id: 'Isi' } ],
          rows: [
            [ { ja: '日常運用：測定', en: 'Daily: measure', id: 'Harian: ukur' }, { ja: 'CT計測（ストップウォッチ、動画分析、タイムスタディ）', en: 'CT measurement (stopwatch, video analysis, time study)', id: 'Pengukuran CT (stopwatch, analisis video, studi waktu)' } ],
            [ { ja: '日常運用：監視', en: 'Daily: monitor', id: 'Harian: pantau' }, { ja: 'V.Scoreの定期算出・トレンド確認', en: 'Regular V.Score calculation and trend check', id: 'Perhitungan V.Score rutin dan cek tren' } ],
            [ { ja: '日常運用：記録', en: 'Daily: record', id: 'Harian: catat' }, { ja: '要素作業別時間、V.Score算出データ', en: 'Time by work element, V.Score data', id: 'Waktu per elemen kerja, data V.Score' } ],
            [ { ja: '日常運用：確認', en: 'Daily: confirm', id: 'Harian: konfirmasi' }, { ja: '標準作業の遵守状況を観察', en: 'Observe compliance with standard work', id: 'Amati kepatuhan terhadap kerja standar' } ],
            [ { ja: '日常運用：判断', en: 'Daily: judge', id: 'Harian: nilai' }, { ja: '作業の急所ごとに良し悪しの[[judgment-criteria]]（限度見本・ゲージ・数値）を標準作業に書き、作業者がその場で判断できるようにする。基準は要求品質から決める', en: 'Write [[judgment-criteria]] for good or bad (limit samples, gauges, numbers) into standard work at each key point so that the operator can judge on the spot. The criteria come from the required quality', id: 'Tulis [[judgment-criteria]] baik atau buruk (sampel batas, gauge, angka) ke dalam kerja standar di setiap titik kunci agar operator dapat menilai di tempat. Kriteria ditentukan dari kualitas yang diminta' } ],
            [ { ja: '異常対応', en: 'Abnormality', id: 'Abnormal' }, { ja: 'V.Score悪化時 → トリアージ。特定作業者のバラツキ → Quick GPC（再訓練・作業観察）。構造的なCT問題 → Deep GPC（作業設計の見直し）', en: 'V.Score worsens → triage. Variation of a specific operator → Quick GPC (retraining, observation). Structural CT problem → Deep GPC (review work design)', id: 'V.Score memburuk → triase. Variasi operator tertentu → Quick GPC (pelatihan ulang, observasi). Masalah CT struktural → Deep GPC (tinjau desain kerja)' } ],
            [ { ja: '異常対応：保留', en: 'Abnormality: hold', id: 'Abnormal: tahan' }, { ja: '判断基準を外れたとき、標準作業どおりにできなかったとき → その品物を次工程へ流さずに保留し、班長へ知らせる。保留品は判断基準で判定し、品質区分で記録する。前工程から来た品物が基準を外れていると作業の中で気づいたとき → 受け取らずに前工程へ知らせる（受入の検査は足さない）。保留が続くとき → トリアージ', en: 'When the criteria are not met or the work could not be done to standard → hold the item instead of passing it on, and tell the team leader. Judge held items against the criteria and record them by quality category. When you notice during your work that an item from the previous process is outside the criteria → do not accept it and tell the previous process (do not add a receiving inspection). When holds keep occurring → triage', id: 'Saat kriteria tidak terpenuhi atau pekerjaan tidak dapat dilakukan sesuai prosedur → tahan barang tersebut, jangan teruskan ke proses berikutnya, dan beri tahu kepala regu. Nilai barang yang ditahan dengan kriteria dan catat menurut kategori kualitas. Saat dalam pekerjaan Anda menyadari barang dari proses sebelumnya di luar kriteria → jangan terima dan beri tahu proses sebelumnya (jangan menambah inspeksi penerimaan). Saat penahanan terus terjadi → triase' } ],
            [ { ja: '定期レビュー', en: 'Periodic review', id: 'Tinjauan berkala' }, { ja: '作業者別V.Scoreの集計・比較、標準作業の有効性検証、動作安定の原理の追加適用検討、流出（後工程以降で見つかった不良）の件数と発生工程の集計、判断基準の妥当性検証（基準があいまいで判断が割れていないか、要求品質を超えていないか）', en: 'Summarise and compare V.Score by operator; verify effectiveness of standard work; consider more motion-stability applications; tally outflow (defects found in later processes) by count and process of origin; verify the judgment criteria (are they vague so that judgments split, or stricter than the required quality?)', id: 'Rangkum dan bandingkan V.Score per operator; verifikasi efektivitas kerja standar; pertimbangkan penerapan stabilitas gerakan tambahan; rekap aliran keluar (cacat yang ditemukan di proses selanjutnya) menurut jumlah dan proses asal; verifikasi kriteria penilaian (apakah kabur sehingga penilaian berbeda-beda, atau lebih ketat daripada kualitas yang diminta?)' } ]
          ]
        },
        { type: 'callout', kind: 'zeva', title: { ja: '人の作業にも「止める」規定を置く', en: 'Human work also needs a rule to stop', id: 'Pekerjaan manusia juga memerlukan aturan untuk berhenti' }, text: {
          ja: 'GPC-Mはバンドを外れたら即座に止めます。GPC-Hでこれにあたるのが、判断基準を外れた品物の保留です。どちらも[[own-process-completion]]（不良を受け取らない・造らない・流さない）を成り立たせる手段で、検査を増やすこととは違います。',
          en: 'GPC-M stops at once when the band is left. The GPC-H counterpart is holding an item that is outside the judgment criteria. Both are means of making [[own-process-completion]] hold (do not accept, make or pass on defects), which is different from adding inspection.',
          id: 'GPC-M segera berhenti saat keluar dari band. Padanannya di GPC-H adalah menahan barang yang berada di luar kriteria penilaian. Keduanya adalah sarana untuk mewujudkan [[own-process-completion]] (tidak menerima, tidak membuat, tidak meneruskan cacat), yang berbeda dari menambah inspeksi.'
        } },
        { type: 'widget', name: 'scenario', props: {
          title: { ja: '演習：日常運用で異常に気づいたら', en: 'Exercise: noticing an abnormality in daily operation', id: 'Latihan: menyadari abnormal dalam operasi harian' },
          intro: { ja: '標準化から2ヶ月、PDCA-Sで監視している工程です（架空事例）。', en: 'A process monitored with PDCA-S for two months after standardization (fictional case).', id: 'Proses yang dipantau dengan PDCA-S selama dua bulan setelah standardisasi (kasus fiktif).' },
          steps: [
            { prompt: { ja: '朝の定時点検で、リフロー炉の温度がGPCバンドの上限を超えていた。まず何をする？', en: 'At the morning check, reflow oven temperature exceeds the GPC band upper limit. What first?', id: 'Pada cek pagi, suhu oven reflow melebihi batas atas GPC band. Apa yang pertama?' }, choices: [
              { text: { ja: '生産を停止し、原因を究明してトリアージにかける', en: 'Stop production, investigate and run triage', id: 'Hentikan produksi, selidiki, dan lakukan triase' }, correct: true, feedback: { ja: 'GPC-Mプロトコルどおりです。', en: 'Exactly as the GPC-M protocol says.', id: 'Tepat sesuai protokol GPC-M.' } },
              { text: { ja: '規格内の製品が出ているので記録だけして生産を続ける', en: 'Products are within spec, so just record and continue', id: 'Produk masih dalam spesifikasi, jadi cukup catat dan lanjutkan' }, correct: false, feedback: { ja: 'GPCバンド逸脱は良品保証条件の外です。Yが規格内でも即停止が原則です。', en: 'Leaving the GPC band means leaving guaranteed conditions. Stop immediately even if Y is within spec.', id: 'Keluar GPC band berarti keluar kondisi yang dijamin. Hentikan segera meski Y dalam spesifikasi.' } }
            ] },
            { prompt: { ja: '原因はヒーター設定の入力ミスと判明（仮説明確・低リスク・単変量）。次は？', en: 'Cause found: a heater setting input error (clear, low risk, single variable). Next?', id: 'Penyebab ditemukan: salah input setelan heater (jelas, risiko rendah, variabel tunggal). Selanjutnya?' }, choices: [
              { text: { ja: 'Quick GPCで設定を戻して確認し、入力ミス防止（ポカヨケ）を暫定標準化', en: 'Quick GPC: restore and confirm, then make an input poka-yoke a temporary standard', id: 'Quick GPC: kembalikan dan konfirmasi, lalu jadikan poka-yoke input sebagai standar sementara' }, correct: true, feedback: { ja: '即時調整に加え、再発防止を標準に還元するのがPDCA+Sの考え方です。', en: 'Immediate adjustment plus returning prevention to the standard is the PDCA+S way.', id: 'Penyesuaian segera ditambah mengembalikan pencegahan ke standar adalah cara PDCA+S.' } },
              { text: { ja: '3ヶ月のDMAICプロジェクトを立ち上げる', en: 'Launch a 3-month DMAIC project', id: 'Luncurkan proyek DMAIC 3 bulan' }, correct: false, feedback: { ja: '原因が明確で低リスクな課題にDMAICはオーバークオリティです。', en: 'DMAIC is over-quality for a clear, low-risk issue.', id: 'DMAIC berlebihan untuk masalah yang jelas dan berisiko rendah.' } }
            ] },
            { prompt: { ja: '別の工程で、作業者全員のV.Scoreが先月から徐々に悪化している。どう判断する？', en: 'In another process, V.Score of all operators has been slowly worsening since last month. How do you judge?', id: 'Di proses lain, V.Score semua operator memburuk perlahan sejak bulan lalu. Bagaimana menilainya?' }, choices: [
              { text: { ja: '特定作業者の問題なので個別に再訓練する', en: 'It is a specific operator problem; retrain individuals', id: 'Ini masalah operator tertentu; latih ulang secara individu' }, correct: false, feedback: { ja: '全員が悪化しているなら個人ではなく構造的な問題の可能性が高いです。', en: 'If everyone is worsening, it is likely structural, not individual.', id: 'Jika semua memburuk, kemungkinan masalah struktural, bukan individu.' } },
              { text: { ja: '構造的なCT問題の可能性が高いので、トリアージのうえDeep GPCで作業設計を見直す', en: 'Likely a structural CT problem: triage, then review work design with Deep GPC', id: 'Kemungkinan masalah CT struktural: triase, lalu tinjau desain kerja dengan Deep GPC' }, correct: true, feedback: { ja: 'GPC-Hプロトコルでは、構造的なCT問題はDeep GPCで作業設計を見直します。', en: 'Per the GPC-H protocol, structural CT problems go to Deep GPC to review work design.', id: 'Menurut protokol GPC-H, masalah CT struktural ke Deep GPC untuk meninjau desain kerja.' } }
            ] }
          ],
          outro: { ja: 'PDCA-Sは「維持」だけでなく、異常を早期に見つけて再びトリアージにつなぐ入り口でもあります。', en: 'PDCA-S is not only "maintenance" but also the entrance that detects abnormalities early and links back to triage.', id: 'PDCA-S bukan hanya "pemeliharaan" tetapi juga pintu yang mendeteksi abnormal lebih awal dan menghubungkan kembali ke triase.' }
        } }
      ]
    }
  ],
  keyPoints: [
    { ja: 'H-T-C-A・DMAICは「解決」、PDCA-Sは「維持」。代替ではなく補完関係', en: 'H-T-C-A and DMAIC "solve"; PDCA-S "maintains". Complements, not alternatives', id: 'H-T-C-A dan DMAIC "menyelesaikan"; PDCA-S "mempertahankan". Saling melengkapi, bukan alternatif' },
    { ja: 'H-T-C-A成功→PDCA-S、3回失敗→DMAIC、DMAICのControl→PDCA-SのPlanへ引き継ぐ', en: 'H-T-C-A success → PDCA-S; 3 failures → DMAIC; DMAIC Control → hands over to PDCA-S Plan', id: 'H-T-C-A berhasil → PDCA-S; 3 kegagalan → DMAIC; Control DMAIC → diserahkan ke Plan PDCA-S' },
    { ja: 'Sなきサイクルは「やりっぱなし」。PDCA+Sは原則③で土台を更新し続ける', en: 'A cycle without S is "do-and-forget". PDCA+S is Principle ③ and keeps updating the foundation', id: 'Siklus tanpa S adalah "kerjakan lalu lupakan". PDCA+S adalah Prinsip ③ yang terus memperbarui fondasi' },
    { ja: 'GPC-M：バンド監視、逸脱時は即停止→原因究明→トリアージ', en: 'GPC-M: band monitoring; on deviation stop → investigate → triage', id: 'GPC-M: pemantauan band; saat menyimpang berhenti → selidiki → triase' },
    { ja: 'GPC-H：V.Score監視、個人のバラツキはQuick、構造的CT問題はDeep', en: 'GPC-H: V.Score monitoring; individual variation → Quick, structural CT problems → Deep', id: 'GPC-H: pemantauan V.Score; variasi individu → Quick, masalah CT struktural → Deep' }
  ],
  quiz: [
    { q: { ja: 'PDCA-Sの役割として正しいのは？', en: 'Correct role of PDCA-S?', id: 'Peran PDCA-S yang benar?' }, choices: [
      { ja: '原因不明の課題を統計的に解決する', en: 'Solve unknown-cause issues statistically', id: 'Menyelesaikan masalah tanpa penyebab jelas secara statistik' },
      { ja: '改善後の状態を標準化し日常的に維持・監視する', en: 'Standardize the improved state and maintain/monitor it daily', id: 'Menstandarkan kondisi hasil perbaikan dan mempertahankan/memantaunya setiap hari' },
      { ja: '仮説を1日で検証する', en: 'Verify a hypothesis in one day', id: 'Memverifikasi hipotesis dalam satu hari' },
      { ja: 'トリアージを代替する', en: 'Replace triage', id: 'Menggantikan triase' }
    ], answer: 1, explain: { ja: 'PDCA-Sは維持・定着サイクルです。', en: 'PDCA-S is the maintenance and consolidation cycle.', id: 'PDCA-S adalah siklus pemeliharaan dan pemantapan.' } },
    { q: { ja: 'DMAICのControlフェーズの成果はどこに引き継がれる？', en: 'Where do the outputs of DMAIC Control hand over?', id: 'Ke mana keluaran Control DMAIC diserahkan?' }, choices: [
      { ja: 'H-T-C-AのHypothesis', en: 'Hypothesis of H-T-C-A', id: 'Hypothesis dari H-T-C-A' },
      { ja: 'PDCA-SのPlan', en: 'Plan of PDCA-S', id: 'Plan dari PDCA-S' },
      { ja: 'トリアージのStep 1', en: 'Step 1 of triage', id: 'Step 1 triase' },
      { ja: 'どこにも引き継がない', en: 'Nowhere', id: 'Tidak ke mana pun' }
    ], answer: 1, explain: { ja: 'Controlで設定した管理図・監視項目がPDCA-SのPlanに引き継がれます。', en: 'Control charts and monitoring items set in Control go to PDCA-S Plan.', id: 'Peta kontrol dan item pemantauan dari Control diserahkan ke Plan PDCA-S.' } },
    { q: { ja: '統計知識が「必要」なサイクルはどれ？', en: 'Which cycle "requires" statistical knowledge?', id: 'Siklus mana yang "memerlukan" pengetahuan statistik?' }, choices: [
      { ja: 'H-T-C-A', en: 'H-T-C-A', id: 'H-T-C-A' },
      { ja: 'DMAIC', en: 'DMAIC', id: 'DMAIC' },
      { ja: 'PDCA-S', en: 'PDCA-S', id: 'PDCA-S' },
      { ja: '3つとも必要', en: 'All three', id: 'Ketiganya' }
    ], answer: 1, explain: { ja: '統計知識が必要なのはDMAIC（Deep GPC）のみです。', en: 'Only DMAIC (Deep GPC) requires statistics.', id: 'Hanya DMAIC (Deep GPC) yang memerlukan statistik.' } },
    { q: { ja: 'Quick GPC後のPDCA-Sで、Standardizeにあたるのは？', en: 'In PDCA-S after Quick GPC, what is Standardize?', id: 'Dalam PDCA-S setelah Quick GPC, apa itu Standardize?' }, choices: [
      { ja: 'WI正式承認', en: 'Formal WI approval', id: 'Persetujuan resmi WI' },
      { ja: 'SOP改訂＋教育', en: 'SOP revision + training', id: 'Revisi SOP + pelatihan' },
      { ja: '要因分析の再実施', en: 'Re-run factor analysis', id: 'Ulangi analisis faktor' },
      { ja: '管理図の設計', en: 'Design control charts', id: 'Rancang peta kontrol' }
    ], answer: 0, explain: { ja: 'Quick後はWI正式承認、Deep後はSOP改訂＋教育です。', en: 'After Quick: formal WI approval; after Deep: SOP revision + training.', id: 'Setelah Quick: persetujuan resmi WI; setelah Deep: revisi SOP + pelatihan.' } },
    { q: { ja: '「H-T-C-AはPDCAの簡略版」という理解が誤りである理由は？', en: 'Why is "H-T-C-A is a simplified PDCA" wrong?', id: 'Mengapa "H-T-C-A adalah PDCA yang disederhanakan" salah?' }, choices: [
      { ja: 'ステップ数が同じだから', en: 'They have the same number of steps', id: 'Jumlah langkahnya sama' },
      { ja: '起点（仮説 vs 計画）と役割（改善 vs 維持）が異なるから', en: 'Starting point (hypothesis vs plan) and role (improvement vs maintenance) differ', id: 'Titik awal (hipotesis vs rencana) dan peran (perbaikan vs pemeliharaan) berbeda' },
      { ja: 'H-T-C-AのほうがPDCAより遅いから', en: 'H-T-C-A is slower than PDCA', id: 'H-T-C-A lebih lambat dari PDCA' },
      { ja: 'H-T-C-Aは標準化をしないから', en: 'H-T-C-A does not standardize', id: 'H-T-C-A tidak menstandarkan' }
    ], answer: 1, explain: { ja: 'H-T-C-AもActionで標準化しますが、起点と役割が異なる別のサイクルです。', en: 'H-T-C-A also standardizes in Action, but it is a different cycle with a different start and role.', id: 'H-T-C-A juga menstandarkan di Action, tetapi siklus berbeda dengan titik awal dan peran berbeda.' } },
    { q: { ja: 'GPC-H運用で「特定の作業者だけV.Scoreが悪い」ときの対応は？', en: 'In GPC-H operation, "only one operator has a poor V.Score". Response?', id: 'Dalam operasi GPC-H, "hanya satu operator dengan V.Score buruk". Respons?' }, choices: [
      { ja: 'Deep GPCで作業設計を全面的に見直す', en: 'Fully review work design with Deep GPC', id: 'Tinjau total desain kerja dengan Deep GPC' },
      { ja: 'Quick GPCで再訓練・作業観察を行う', en: 'Retrain and observe work with Quick GPC', id: 'Latih ulang dan amati kerja dengan Quick GPC' },
      { ja: 'その作業者を外す', en: 'Remove the operator', id: 'Keluarkan operator tersebut' },
      { ja: '平均CTが良ければ問題にしない', en: 'Ignore if the average CT is fine', id: 'Abaikan jika CT rata-rata baik' }
    ], answer: 1, explain: { ja: '特定作業者のバラツキはQuick GPC（再訓練・作業観察）、構造的なCT問題はDeep GPCです。', en: 'Specific-operator variation → Quick GPC (retraining, observation); structural CT problems → Deep GPC.', id: 'Variasi operator tertentu → Quick GPC (pelatihan ulang, observasi); masalah CT struktural → Deep GPC.' } },
    { q: { ja: 'GPC-Mの日常運用での「改善」にあたる活動は？', en: 'Which is the "improve" activity in GPC-M daily operation?', id: 'Manakah aktivitas "perbaiki" dalam operasi harian GPC-M?' }, choices: [
      { ja: 'Center-Aimingで分布中心をTargetに近づける', en: 'Move the distribution centre toward Target by Center-Aiming', id: 'Geser pusat distribusi ke Target dengan Center-Aiming' },
      { ja: 'GPCバンドを広げて逸脱をなくす', en: 'Widen the GPC band to remove deviations', id: 'Perlebar GPC band untuk menghilangkan penyimpangan' },
      { ja: '記録をやめて工数を減らす', en: 'Stop recording to save man-hours', id: 'Berhenti mencatat untuk menghemat jam kerja' },
      { ja: '作業者のV.Scoreを比較する', en: 'Compare operator V.Scores', id: 'Bandingkan V.Score operator' }
    ], answer: 0, explain: { ja: 'GPC-Mの日常改善はCenter-Aimingです。④はGPC-Hの定期レビューです。', en: 'GPC-M daily improvement is Center-Aiming. Option 4 is a GPC-H periodic review.', id: 'Perbaikan harian GPC-M adalah Center-Aiming. Pilihan 4 adalah tinjauan berkala GPC-H.' } },
    { q: { ja: 'GPC-Hの作業で、品物が判断基準を外れていた。正しい対応は？', en: 'In GPC-H work, an item is outside the judgment criteria. What is the right response?', id: 'Dalam pekerjaan GPC-H, sebuah barang berada di luar kriteria penilaian. Manakah tanggapan yang benar?' }, choices: [
      { ja: '後工程の検査で見つかるので、そのまま流す', en: 'Pass it on, since the inspection downstream will find it', id: 'Teruskan saja, karena inspeksi di proses berikutnya akan menemukannya' },
      { ja: '次工程へ流さずに保留し、班長へ知らせる', en: 'Hold it instead of passing it on, and tell the team leader', id: 'Tahan, jangan teruskan, dan beri tahu kepala regu' },
      { ja: '自工程の出口に全数検査を追加する', en: 'Add a 100% inspection at the exit of the process', id: 'Tambahkan inspeksi 100% di pintu keluar proses' },
      { ja: '判断基準を要求品質より厳しくする', en: 'Make the criteria stricter than the required quality', id: 'Buat kriteria lebih ketat daripada kualitas yang diminta' }
    ], answer: 1, explain: { ja: '保留は、GPC-Mのバンド逸脱時の停止にあたります。③の検査の追加は結果（Y）を選り分けるだけで、④は過剰品質です。', en: 'Holding is the GPC-H counterpart of stopping when the band is left in GPC-M. Adding inspection (option 3) only sorts the result (Y), and option 4 is over-quality.', id: 'Menahan adalah padanan GPC-H dari berhenti saat keluar band pada GPC-M. Menambah inspeksi (pilihan 3) hanya memilah hasil (Y), dan pilihan 4 adalah kualitas berlebih.' } }
  ]
});
