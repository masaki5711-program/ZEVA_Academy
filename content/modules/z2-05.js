ZA.addModule({
  id: 'z2-05',
  track: 'z2',
  order: 5,
  minutes: 35,
  icon: '⚡',
  level: 2,
  prereq: ['z2-04'],
  title: { ja: 'Quick GPC：H-T-C-A', en: 'Quick GPC: H-T-C-A', id: 'Quick GPC: H-T-C-A' },
  summary: {
    ja: '現場の「気づき」を即座に試し、小さな成功体験とナレッジを量産する高速改善サイクル H-T-C-A の進め方を学びます。',
    en: 'Learn the fast improvement cycle H-T-C-A, which tries floor insights immediately and mass-produces small successes and knowledge.',
    id: 'Pelajari siklus perbaikan cepat H-T-C-A, yang langsung mencoba ide lapangan dan menghasilkan banyak keberhasilan kecil serta pengetahuan.'
  },
  objectives: [
    { ja: 'H-T-C-Aの4ステップで行うことを説明できる', en: 'Explain what is done in each of the four H-T-C-A steps', id: 'Menjelaskan apa yang dilakukan di tiap empat langkah H-T-C-A' },
    { ja: '仮説テンプレートで1文の仮説を書ける', en: 'Write a one-sentence hypothesis with the template', id: 'Menulis hipotesis satu kalimat dengan templat' },
    { ja: '暫定標準のルール（期限・範囲・ロールバック）を説明できる', en: 'Explain the rules of a temporary standard (deadline, scope, rollback)', id: 'Menjelaskan aturan standar sementara (batas waktu, cakupan, rollback)' },
    { ja: 'Deep GPCへのエスカレーション基準を判断できる', en: 'Judge the escalation criteria to Deep GPC', id: 'Menilai kriteria eskalasi ke Deep GPC' }
  ],
  sections: [
    {
      id: 'purpose',
      title: { ja: 'Quick GPCの目的と考え方', en: 'Purpose and mindset of Quick GPC', id: 'Tujuan dan pola pikir Quick GPC' },
      blocks: [
        { type: 'callout', kind: 'key', title: { ja: '目的', en: 'Purpose', id: 'Tujuan' }, text: {
          ja: '現場の「気づき」を即座に試し、**小さな成功体験とナレッジを量産する**。期間：1日〜1週間。',
          en: 'Try shop-floor insights immediately and **mass-produce small successes and knowledge**. Duration: 1 day – 1 week.',
          id: 'Segera coba ide lapangan dan **hasilkan banyak keberhasilan kecil serta pengetahuan**. Durasi: 1 hari – 1 minggu.'
        } },
        { type: 'p', text: {
          ja: '[[quick-gpc]]は、DMAICの重厚さを排した4ステップの高速サイクル[[htca]]で改善を進めます。統計の知識は不要で、アナログ環境（紙とストップウォッチ）でも完全に回ります。「完璧な計画を立ててから動く」のではなく「**走りながら考える**」ことで、改善のスピードと現場の参加意欲を高めます。',
          en: '[[quick-gpc]] drives improvement with [[htca]], a four-step fast cycle without the heaviness of DMAIC. No statistical knowledge is required, and it runs fully in an analog environment (paper and stopwatch). Instead of "move after making a perfect plan", it **thinks while running**, raising improvement speed and floor participation.',
          id: '[[quick-gpc]] menjalankan perbaikan dengan [[htca]], siklus cepat empat langkah tanpa beratnya DMAIC. Tidak perlu pengetahuan statistik, dan berjalan penuh di lingkungan analog (kertas dan stopwatch). Alih-alih "bergerak setelah rencana sempurna", pendekatan ini **berpikir sambil berjalan**, meningkatkan kecepatan perbaikan dan partisipasi lapangan.'
        } },
        { type: 'cycle', center: { ja: 'H-T-C-A', en: 'H-T-C-A', id: 'H-T-C-A' }, nodes: [
          { title: { ja: 'H：仮説', en: 'H: Hypothesis', id: 'H: Hipotesis' }, text: { ja: '「こう変えれば良くなるはず」を1文に', en: 'Put "changing this should improve it" in one sentence', id: '"Mengubah ini seharusnya memperbaiki" dalam satu kalimat' }, tone: 'blue' },
          { title: { ja: 'T：試行', en: 'T: Trial', id: 'T: Uji coba' }, text: { ja: '少ないN数ですぐテスト', en: 'Test right away with small N', id: 'Uji segera dengan N kecil' }, tone: 'amber' },
          { title: { ja: 'C：即時確認', en: 'C: Check', id: 'C: Periksa' }, text: { ja: '良くなった？悪くなった？', en: 'Better or worse?', id: 'Lebih baik atau lebih buruk?' }, tone: 'green' },
          { title: { ja: 'A：標準化 or 再試行', en: 'A: Standardize or retry', id: 'A: Standarkan atau ulangi' }, text: { ja: '良ければ即WI更新、ダメなら条件変更', en: 'If good, update WI now; if not, change conditions', id: 'Jika baik, perbarui WI sekarang; jika tidak, ubah kondisi' }, tone: 'navy' }
        ] },
        { type: 'callout', kind: 'note', title: { ja: 'PDCAの簡略版ではない', en: 'Not a simplified PDCA', id: 'Bukan PDCA yang disederhanakan' }, text: {
          ja: 'H-T-C-Aは「仮説→実験→検証→標準化」の**改善**サイクルで、起点は仮説です。PDCA-Sは「計画→実行→確認→是正→標準化」の**維持**サイクルで、起点は計画です。役割が違います。',
          en: 'H-T-C-A is an **improvement** cycle — hypothesis → experiment → verification → standardization — starting from a hypothesis. PDCA-S is a **maintenance** cycle — plan → do → check → act → standardize — starting from a plan. Their roles differ.',
          id: 'H-T-C-A adalah siklus **perbaikan** — hipotesis → eksperimen → verifikasi → standardisasi — dimulai dari hipotesis. PDCA-S adalah siklus **pemeliharaan** — rencana → lakukan → periksa → tindak → standarkan — dimulai dari rencana. Perannya berbeda.'
        } }
      ]
    },
    {
      id: 'hypo',
      title: { ja: 'Step 1：Hypothesis（仮説設定）', en: 'Step 1: Hypothesis', id: 'Step 1: Hipotesis' },
      blocks: [
        { type: 'list', items: [
          { ja: '**「ベスト5M」の設定**：複雑な分析は不要。「これをこう変えれば良くなるはず」という直感を言語化します。', en: '**Set the "best 5M"**: no complex analysis needed. Put into words the intuition "changing this in this way should make it better".', id: '**Tetapkan "5M terbaik"**: tidak perlu analisis rumit. Ungkapkan intuisi "mengubah ini dengan cara ini seharusnya lebih baik".' },
          { ja: '**ナレッジベースを検索**：過去の類似事例から推奨パラメータや、失敗したトライを確認し、無駄な再実験を防ぎます。', en: '**Search the knowledge base**: check recommended parameters and failed trials from similar past cases to avoid wasted re-experiments.', id: '**Cari di basis pengetahuan**: periksa parameter yang direkomendasikan dan uji coba gagal dari kasus serupa untuk menghindari eksperimen ulang yang sia-sia.' },
          { ja: '**1文で書ける**レベルに簡潔化します。1文で書けないなら、変数が多すぎるかもしれません（トリアージを見直す）。', en: 'Simplify it so it **fits in one sentence**. If it does not, there may be too many variables (revisit triage).', id: 'Sederhanakan agar **muat dalam satu kalimat**. Jika tidak, mungkin variabelnya terlalu banyak (tinjau ulang triase).' }
        ] },
        { type: 'callout', kind: 'example', title: { ja: '仮説テンプレート', en: 'Hypothesis template', id: 'Templat hipotesis' }, text: {
          ja: '「**[対象パラメータ]** を **[現在値]** から **[変更値]** に変更すれば、**[期待する結果]** が得られるはず」',
          en: '"If we change **[target parameter]** from **[current value]** to **[new value]**, we should get **[expected result]**."',
          id: '"Jika **[parameter sasaran]** diubah dari **[nilai saat ini]** menjadi **[nilai baru]**, seharusnya diperoleh **[hasil yang diharapkan]**."'
        } },
        { type: 'compare',
          left: { title: { ja: '良くない仮説', en: 'Poor hypotheses', id: 'Hipotesis yang kurang baik' }, tone: 'red', items: [
            { ja: '「作業者がもっと注意すれば不良が減る」→ 変える対象（X）が曖昧', en: '"Defects drop if operators are more careful" → the X to change is vague', id: '"Cacat berkurang jika operator lebih hati-hati" → X yang diubah tidak jelas' },
            { ja: '「いろいろ見直せば良くなる」→ 検証できない', en: '"Reviewing various things will help" → cannot be verified', id: '"Meninjau banyak hal akan membantu" → tidak dapat diverifikasi' },
            { ja: '「検査を2回にすれば流出が減る」→ Yを直接操作している', en: '"Double inspection reduces escapes" → manipulates Y directly', id: '"Inspeksi dua kali mengurangi kebocoran" → memanipulasi Y langsung' }
          ] },
          right: { title: { ja: '良い仮説', en: 'Good hypotheses', id: 'Hipotesis yang baik' }, tone: 'green', items: [
            { ja: '「部品トレーを左から右に移せば、取り時間が2秒短くなるはず」', en: '"Moving the parts tray from left to right should cut pick time by 2 s."', id: '"Memindahkan baki part dari kiri ke kanan seharusnya memangkas waktu ambil 2 dtk."' },
            { ja: '「はんだ温度を345℃から350℃にすれば、濡れ不足がなくなるはず」', en: '"Raising solder temperature from 345°C to 350°C should eliminate poor wetting."', id: '"Menaikkan suhu solder dari 345°C ke 350°C seharusnya menghilangkan pembasahan kurang."' },
            { ja: '「作業台にフェルトを敷けば、キズ不良がゼロになるはず」', en: '"Laying felt on the bench should bring scratch defects to zero."', id: '"Memasang kain felt di meja seharusnya membuat cacat gores nol."' }
          ] }
        },
        { type: 'check', q: { ja: '仮説テンプレートに最も沿っているのはどれ？', en: 'Which best follows the hypothesis template?', id: 'Manakah yang paling sesuai templat hipotesis?' }, choices: [
          { ja: 'ネジ締め工程の品質を上げたい', en: 'We want to improve quality in the screw-tightening process', id: 'Kami ingin meningkatkan kualitas proses pengencangan sekrup' },
          { ja: 'ドライバーのトルク設定を1.0N·mから1.2N·mに変更すれば、ネジ浮きがなくなるはず', en: 'Changing the driver torque from 1.0 N·m to 1.2 N·m should eliminate lifted screws', id: 'Mengubah torsi obeng dari 1,0 N·m ke 1,2 N·m seharusnya menghilangkan sekrup terangkat' },
          { ja: 'ネジ浮きの原因を統計的に調べる', en: 'Investigate the cause of lifted screws statistically', id: 'Selidiki penyebab sekrup terangkat secara statistik' }
        ], answer: 1, explain: { ja: '対象・現在値・変更値・期待結果がそろっています。①は目標、③はDeep GPCの活動です。', en: 'It has target, current value, new value and expected result. Option 1 is a goal; option 3 is a Deep GPC activity.', id: 'Memuat sasaran, nilai saat ini, nilai baru, dan hasil yang diharapkan. Pilihan 1 adalah tujuan; pilihan 3 aktivitas Deep GPC.' } }
      ]
    },
    {
      id: 'trial-check',
      title: { ja: 'Step 2：Trial（実行）とStep 3：Check（即時確認）', en: 'Step 2: Trial and Step 3: Check', id: 'Step 2: Uji coba dan Step 3: Periksa' },
      blocks: [
        { type: 'h', text: { ja: 'Trial：小さく、すぐに', en: 'Trial: small and immediate', id: 'Uji coba: kecil dan segera' } },
        { type: 'list', items: [
          { ja: 'N数（サンプル数）を少なく設定し、すぐにテストします。「まず5台やってみる」レベルで十分です。', en: 'Set a small N (sample size) and test right away. "Try 5 units first" is enough.', id: 'Tetapkan N (ukuran sampel) kecil dan uji segera. "Coba 5 unit dulu" sudah cukup.' },
          { ja: '完璧な実験計画は不要です（それはDeep GPCの役割）。', en: 'A perfect experimental design is unnecessary (that is the job of Deep GPC).', id: 'Desain eksperimen sempurna tidak diperlukan (itu tugas Deep GPC).' },
          { ja: '**GPC-Mの場合**：パラメータを変更して少量生産', en: '**For GPC-M**: change the parameter and produce a small lot', id: '**Untuk GPC-M**: ubah parameter dan produksi lot kecil' },
          { ja: '**GPC-Hの場合**：標準作業を変更して数サイクル試行', en: '**For GPC-H**: change the standard work and try several cycles', id: '**Untuk GPC-H**: ubah kerja standar dan coba beberapa siklus' }
        ] },
        { type: 'h', text: { ja: 'Check：二択に近い判定', en: 'Check: a near-binary judgment', id: 'Periksa: penilaian hampir biner' } },
        { type: 'p', text: {
          ja: '判定は「良くなったか？悪くなったか？」の二択に近い形で行います。統計検定は不要で、現場の五感と簡易計測で判断します。',
          en: 'The judgment is close to binary: "better or worse?". No statistical test is needed; decide with the senses of the floor and simple measurement.',
          id: 'Penilaian hampir biner: "lebih baik atau lebih buruk?". Tidak perlu uji statistik; putuskan dengan indera lapangan dan pengukuran sederhana.'
        } },
        { type: 'callout', kind: 'tip', title: { ja: 'アナログ代替ポイント', en: 'Analog alternative', id: 'Alternatif analog' }, text: {
          ja: 'センサーがなければ「目視」「手書きチェックシート」でOK。',
          en: 'No sensors? "Visual check" and "handwritten check sheet" are fine.',
          id: 'Tidak ada sensor? "Cek visual" dan "lembar periksa tulisan tangan" sudah cukup.'
        } },
        { type: 'table',
          head: [ { ja: 'デジタル化レベル', en: 'Digital level', id: 'Level digital' }, { ja: '確認方法', en: 'Check method', id: 'Metode periksa' } ],
          rows: [
            [ { ja: 'Level 1（アナログ）', en: 'Level 1 (analog)', id: 'Level 1 (analog)' }, { ja: '目視確認＋手書き記録', en: 'Visual check + handwritten record', id: 'Cek visual + catatan tulisan tangan' } ],
            [ { ja: 'Level 2（デジタイゼーション）', en: 'Level 2 (digitisasi)', id: 'Level 2 (digitisasi)' }, { ja: 'Excel集計＋グラフ', en: 'Spreadsheet summary + graph', id: 'Ringkasan spreadsheet + grafik' } ],
            [ { ja: 'Level 3（デジタライゼーション）', en: 'Level 3 (digitalisation)', id: 'Level 3 (Digitalisasi)' }, { ja: 'リアルタイムダッシュボード', en: 'Real-time dashboard', id: 'Dasbor real-time' } ]
          ],
          caption: { ja: '[[dx-levels]]に応じた確認方法', en: 'Check methods by [[dx-levels]]', id: 'Metode periksa menurut [[dx-levels]]' }
        },
        { type: 'callout', kind: 'zeva', title: { ja: '簡易でも「揃えた計測」で', en: 'Simple, but consistent measurement', id: 'Sederhana, tetapi pengukuran konsisten' }, text: {
          ja: '統計は不要でも、比べる前後で**計測方法を揃える**ことは必須です（同じ区切り点、同じ人、同じ道具）。計測がばらつくと、効果があったのかどうか判断できません（[[root-logic]]）。改善のたびにデータの信頼性が上がっていく ―― これが好循環の立ち上げ方です。',
          en: 'Even without statistics, you must **keep the measurement method the same** before and after (same break points, same person, same tool). If measurement varies, you cannot tell whether there was an effect ([[root-logic]]). Data reliability rises with each improvement — this is how the virtuous cycle starts.',
          id: 'Meski tanpa statistik, **metode pengukuran harus sama** sebelum dan sesudah (titik potong sama, orang sama, alat sama). Jika pengukuran bervariasi, efeknya tidak dapat dinilai ([[root-logic]]). Keandalan data meningkat di setiap perbaikan — beginilah siklus positif dimulai.'
        } }
      ]
    },
    {
      id: 'action',
      title: { ja: 'Step 4：Action（標準化 or 再試行）', en: 'Step 4: Action (standardize or retry)', id: 'Step 4: Tindakan (standarkan atau ulangi)' },
      blocks: [
        { type: 'compare',
          left: { title: { ja: '良かった場合', en: 'If it worked', id: 'Jika berhasil' }, tone: 'green', items: [
            { ja: '即[[work-instruction]]（作業標準書）を更新', en: 'Update the [[work-instruction]] immediately', id: 'Segera perbarui [[work-instruction]]' },
            { ja: '[[temporary-standard]]として即日現場に適用', en: 'Apply it on the floor the same day as a [[temporary-standard]]', id: 'Terapkan di lantai produksi hari itu juga sebagai [[temporary-standard]]' },
            { ja: 'ナレッジベースに簡易登録（写真1枚＋コメント）', en: 'Register briefly in the knowledge base (one photo + comment)', id: 'Daftarkan singkat di basis pengetahuan (satu foto + komentar)' },
            { ja: 'PDCA-Sの日常監視へ移行', en: 'Move to daily monitoring in PDCA-S', id: 'Beralih ke pemantauan harian PDCA-S' }
          ] },
          right: { title: { ja: 'ダメだった場合', en: 'If it did not work', id: 'Jika tidak berhasil' }, tone: 'amber', items: [
            { ja: '翌日に条件を変更', en: 'Change the conditions the next day', id: 'Ubah kondisi keesokan harinya' },
            { ja: '別の仮説でH-T-C-Aを再実行', en: 'Run H-T-C-A again with another hypothesis', id: 'Jalankan H-T-C-A lagi dengan hipotesis lain' },
            { ja: '失敗もナレッジとして登録（同じ失敗を繰り返さない）', en: 'Register the failure as knowledge too (avoid repeating it)', id: 'Daftarkan kegagalan sebagai pengetahuan juga (hindari mengulanginya)' },
            { ja: 'エスカレーション基準に当てはまればDeep GPCへ', en: 'If escalation criteria apply, move to Deep GPC', id: 'Jika kriteria eskalasi berlaku, beralih ke Deep GPC' }
          ] }
        },
        { type: 'h', text: { ja: '暫定標準（Temporary Standard）のルール', en: 'Rules of the temporary standard', id: 'Aturan standar sementara' } },
        { type: 'p', text: {
          ja: '成功した改善を正式な文書改訂プロセス（承認フロー）の完了まで待つと、せっかくの効果が現場に届くまで時間がかかり、元のやり方に戻ってしまうこともあります。そこで承認フローを簡略化した「特急レーン」として暫定標準を使います。ただし、安全に使うための制約があります。',
          en: 'Waiting for the formal revision process (approval flow) delays the benefit reaching the floor, and people may drift back to the old way. So a temporary standard is used as an "express lane" with a simplified approval flow — with constraints to keep it safe.',
          id: 'Menunggu proses revisi resmi (alur persetujuan) menunda manfaat sampai ke lapangan, dan orang bisa kembali ke cara lama. Maka standar sementara dipakai sebagai "jalur ekspres" dengan alur persetujuan yang disederhanakan — dengan batasan agar tetap aman.'
        } },
        { type: 'cards', cols: 3, items: [
          { icon: '⏳', title: { ja: '有効期限：最大30日', en: 'Validity: max 30 days', id: 'Masa berlaku: maks 30 hari' }, text: { ja: '30日以内に正式承認を取得する', en: 'Obtain formal approval within 30 days', id: 'Dapatkan persetujuan resmi dalam 30 hari' }, tone: 'amber' },
          { icon: '📍', title: { ja: '適用範囲：単一ライン限定', en: 'Scope: single line only', id: 'Cakupan: satu lini saja' }, text: { ja: '他ラインへの水平展開は正式承認後', en: 'Horizontal deployment to other lines only after formal approval', id: 'Penyebaran ke lini lain hanya setelah persetujuan resmi' }, tone: 'blue' },
          { icon: '↩️', title: { ja: 'ロールバック可能', en: 'Rollback possible', id: 'Dapat di-rollback' }, text: { ja: '変更前の状態をバックアップし、いつでも戻せる', en: 'Back up the previous state so it can be restored any time', id: 'Cadangkan kondisi sebelumnya agar bisa dipulihkan kapan saja' }, tone: 'green' }
        ] },
        { type: 'widget', name: 'htca-builder', props: {} }
      ]
    },
    {
      id: 'examples',
      title: { ja: '適用例とエスカレーション', en: 'Examples and escalation', id: 'Contoh dan eskalasi' },
      blocks: [
        { type: 'table',
          head: [ { ja: '課題', en: 'Issue', id: 'Masalah' }, { ja: '仮説', en: 'Hypothesis', id: 'Hipotesis' }, { ja: 'トライ', en: 'Trial', id: 'Uji coba' }, { ja: '結果', en: 'Result', id: 'Hasil' } ],
          rows: [
            [ { ja: 'はんだ付け不良が増加', en: 'Soldering defects increasing', id: 'Cacat solder meningkat' }, { ja: '温度設定を5℃上げれば溶融が安定するはず', en: 'Raising temperature 5°C should stabilise melting', id: 'Menaikkan suhu 5°C seharusnya menstabilkan pelelehan' }, { ja: '10台で試行', en: 'Tried on 10 units', id: 'Dicoba pada 10 unit' }, { ja: '不良ゼロ → WI更新（GPCバンド更新）', en: 'Zero defects → WI updated (GPC band updated)', id: 'Nol cacat → WI diperbarui (GPC band diperbarui)' } ],
            [ { ja: '組立CTが遅い', en: 'Assembly CT slow', id: 'CT perakitan lambat' }, { ja: '部品配置を左右逆にすれば取り時間が短縮するはず', en: 'Swapping part positions left/right should shorten pick time', id: 'Menukar posisi part kiri/kanan seharusnya mempersingkat waktu ambil' }, { ja: '5サイクル計測', en: 'Measured 5 cycles', id: 'Diukur 5 siklus' }, { ja: 'CT 2秒短縮 → 標準化', en: 'CT −2 s → standardized', id: 'CT −2 dtk → distandarkan' } ],
            [ { ja: 'キズ不良発生', en: 'Scratch defects', id: 'Cacat gores' }, { ja: '作業台にフェルトを敷けば防げるはず', en: 'Felt on the bench should prevent them', id: 'Felt di meja seharusnya mencegahnya' }, { ja: '即実施', en: 'Implemented at once', id: 'Langsung diterapkan' }, { ja: 'キズゼロ → 標準化', en: 'Zero scratches → standardized', id: 'Nol gores → distandarkan' } ]
          ],
          caption: { ja: 'Quick GPCの適用例（説明用）', en: 'Quick GPC examples (illustrative)', id: 'Contoh Quick GPC (ilustrasi)' }
        },
        { type: 'h', text: { ja: 'Deep GPCへのエスカレーション基準', en: 'Escalation criteria to Deep GPC', id: 'Kriteria eskalasi ke Deep GPC' } },
        { type: 'list', items: [
          { ja: '**3回**のH-T-C-Aサイクルで効果が得られない', en: 'No effect after **three** H-T-C-A cycles', id: 'Tidak ada efek setelah **tiga** siklus H-T-C-A' },
          { ja: '仮説が枯渇した（何を変えればよいか分からない）', en: 'Hypotheses have run out (you do not know what to change)', id: 'Hipotesis habis (tidak tahu apa yang harus diubah)' },
          { ja: '問題が再発する（一時的には改善するが戻る）', en: 'The problem recurs (improves temporarily, then returns)', id: 'Masalah berulang (membaik sementara lalu kembali)' },
          { ja: '影響範囲が想定より大きいことが判明した', en: 'The impact turns out to be larger than expected', id: 'Dampaknya ternyata lebih besar dari perkiraan' }
        ] },
        { type: 'widget', name: 'scenario', props: {
          title: { ja: '演習：Quick GPCを回す', en: 'Exercise: run Quick GPC', id: 'Latihan: jalankan Quick GPC' },
          intro: { ja: '手組立工程で、ケースのツメ割れ不良が1日数件出ています。トリアージでQuick GPC（GPC-H）と判定されました（架空事例）。', en: 'In a manual assembly process, a few cracked case-clip defects occur daily. Triage chose Quick GPC (GPC-H). (Fictional case.)', id: 'Di proses perakitan manual, beberapa cacat klip casing retak terjadi setiap hari. Triase memilih Quick GPC (GPC-H). (Kasus fiktif.)' },
          steps: [
            { prompt: { ja: 'H：どの仮説を立てますか？', en: 'H: Which hypothesis do you set?', id: 'H: Hipotesis mana yang Anda tetapkan?' }, choices: [
              { text: { ja: '「ケースをはめる前に向きを揃えるガイドを置けば、斜め押し込みがなくなりツメ割れがゼロになるはず」', en: '"Placing a guide that aligns the case before fitting should stop angled pushing and bring clip cracks to zero."', id: '"Memasang pemandu yang meluruskan casing sebelum dipasang seharusnya menghentikan dorongan miring dan membuat retak klip nol."' }, correct: true, feedback: { ja: '対象・変更・期待結果が明確で、1文で検証可能です。', en: 'Clear target, change and expected result — verifiable in one sentence.', id: 'Sasaran, perubahan, dan hasil jelas — dapat diverifikasi dalam satu kalimat.' } },
              { text: { ja: '「作業者にやさしくはめるよう指導すれば減るはず」', en: '"Coaching operators to fit gently should reduce it."', id: '"Membina operator agar memasang dengan lembut seharusnya menguranginya."' }, correct: false, feedback: { ja: '注意力に頼る仮説です。拘束とガイドの法則で構造的に封じる仮説にしましょう。', en: 'This relies on attention. Make a hypothesis that blocks it structurally (constraint & guide law).', id: 'Ini mengandalkan perhatian. Buat hipotesis yang mencegah secara struktural (hukum batasan & pemandu).' } }
            ] },
            { prompt: { ja: 'T：どう試しますか？', en: 'T: How do you try it?', id: 'T: Bagaimana Anda mencobanya?' }, choices: [
              { text: { ja: '段ボールと両面テープで簡易ガイドを作り、1人の作業者で20個試す', en: 'Make a simple guide from cardboard and tape; try 20 pieces with one operator', id: 'Buat pemandu sederhana dari kardus dan selotip; coba 20 buah dengan satu operator' }, correct: true, feedback: { ja: '小さく、すぐに。完璧な治具を発注するのは効果を確認してからで十分です。', en: 'Small and immediate. Order a proper jig only after confirming the effect.', id: 'Kecil dan segera. Pesan jig yang layak setelah efek terkonfirmasi.' } },
              { text: { ja: '金属製の治具を外注し、納品後に全ラインで一斉に試す', en: 'Outsource a metal jig and try it on all lines after delivery', id: 'Pesan jig logam ke luar dan coba di semua lini setelah dikirim' }, correct: false, feedback: { ja: '時間がかかり、失敗時の影響も大きくなります。Quick GPCの考え方に反します。', en: 'Slow, and the impact of failure grows. Against the Quick GPC mindset.', id: 'Lambat, dan dampak kegagalan membesar. Bertentangan dengan pola pikir Quick GPC.' } }
            ] },
            { prompt: { ja: 'C：20個中ツメ割れ0個（前日は同じ数で3個）。次は？', en: 'C: 0 cracks in 20 pieces (the day before: 3 in the same number). Next?', id: 'C: 0 retak dari 20 buah (hari sebelumnya: 3 dalam jumlah yang sama). Selanjutnya?' }, choices: [
              { text: { ja: 'WIを更新し暫定標準としてこのラインに即日適用、写真付きでナレッジ登録', en: 'Update the WI, apply as a temporary standard on this line today, register with a photo', id: 'Perbarui WI, terapkan sebagai standar sementara di lini ini hari ini, daftarkan dengan foto' }, correct: true, feedback: { ja: '正解。30日以内に正式承認し、PDCA-Sで日常監視へ移行します。', en: 'Correct. Get formal approval within 30 days and move to PDCA-S daily monitoring.', id: 'Benar. Dapatkan persetujuan resmi dalam 30 hari dan beralih ke pemantauan harian PDCA-S.' } },
              { text: { ja: 'すぐに全工場の全ラインへ暫定標準として展開する', en: 'Deploy immediately to all lines of all plants as a temporary standard', id: 'Segera sebarkan ke semua lini semua pabrik sebagai standar sementara' }, correct: false, feedback: { ja: '暫定標準は単一ライン限定です。水平展開は正式承認後に行います。', en: 'A temporary standard is limited to one line. Horizontal deployment comes after formal approval.', id: 'Standar sementara terbatas satu lini. Penyebaran horizontal setelah persetujuan resmi.' } }
            ] }
          ],
          outro: { ja: '1日で1サイクル。こうした小さな成功とナレッジの積み重ねが、現場の改善文化をつくります。', en: 'One cycle in one day. Accumulating such small successes and knowledge builds the improvement culture of the floor.', id: 'Satu siklus dalam satu hari. Menumpuk keberhasilan kecil dan pengetahuan seperti ini membangun budaya perbaikan di lantai produksi.' }
        } },
        { type: 'callout', kind: 'tip', title: { ja: '文化が成功の鍵', en: 'Culture is the key', id: 'Budaya adalah kunci' }, text: {
          ja: '「失敗してもいい小さなトライ」を奨励する文化が不可欠です。失敗事例も[[knowledge-base]]の貴重なナレッジとして評価しましょう。',
          en: 'A culture that encourages "small trials where failure is OK" is essential. Value failed cases as precious knowledge in the [[knowledge-base]].',
          id: 'Budaya yang mendorong "uji coba kecil yang boleh gagal" sangat penting. Hargai kasus gagal sebagai pengetahuan berharga di [[knowledge-base]].'
        } }
      ]
    }
  ],
  keyPoints: [
    { ja: 'Quick GPC＝H-T-C-A、1日〜1週間、統計不要、アナログでもOK', en: 'Quick GPC = H-T-C-A, 1 day – 1 week, no statistics, analog OK', id: 'Quick GPC = H-T-C-A, 1 hari – 1 minggu, tanpa statistik, analog OK' },
    { ja: 'H：テンプレートで1文の仮説。ナレッジベースで過去事例を検索', en: 'H: one-sentence hypothesis with the template; search past cases in the knowledge base', id: 'H: hipotesis satu kalimat dengan templat; cari kasus lalu di basis pengetahuan' },
    { ja: 'T：少ないN数ですぐ試す／C：良い・悪いの二択に近い判定（計測方法は揃える）', en: 'T: try immediately with small N / C: near-binary better/worse (keep measurement consistent)', id: 'T: coba segera dengan N kecil / C: hampir biner lebih baik/buruk (pengukuran konsisten)' },
    { ja: 'A：成功→WI更新・暫定標準（30日以内に正式化、単一ライン、ロールバック可）／失敗→条件変更', en: 'A: success → update WI, temporary standard (formalise within 30 days, one line, rollback) / failure → change conditions', id: 'A: berhasil → perbarui WI, standar sementara (resmikan dalam 30 hari, satu lini, rollback) / gagal → ubah kondisi' },
    { ja: '3回失敗・仮説枯渇・再発・影響拡大でDeep GPCへエスカレーション', en: 'Escalate to Deep GPC after 3 failures, no hypotheses, recurrence, or larger impact', id: 'Eskalasi ke Deep GPC setelah 3 kegagalan, hipotesis habis, berulang, atau dampak lebih besar' }
  ],
  quiz: [
    { q: { ja: 'H-T-C-Aの「C」で行うことは？', en: 'What is done in the "C" of H-T-C-A?', id: 'Apa yang dilakukan di "C" H-T-C-A?' }, choices: [
      { ja: '統計検定で有意差を確認する', en: 'Confirm significance with a statistical test', id: 'Pastikan signifikansi dengan uji statistik' },
      { ja: '良くなったか悪くなったかを即時に確認する', en: 'Immediately check whether it got better or worse', id: 'Segera periksa apakah lebih baik atau lebih buruk' },
      { ja: '管理図を設計する', en: 'Design a control chart', id: 'Rancang peta kontrol' },
      { ja: '予算を申請する', en: 'Apply for a budget', id: 'Ajukan anggaran' }
    ], answer: 1, explain: { ja: 'Checkは二択に近い即時確認で、統計検定は不要です。', en: 'Check is an immediate near-binary confirmation; no statistical test.', id: 'Check adalah konfirmasi segera hampir biner; tanpa uji statistik.' } },
    { q: { ja: '暫定標準の有効期限は？', en: 'Validity period of a temporary standard?', id: 'Masa berlaku standar sementara?' }, choices: [
      { ja: '最大7日', en: 'Max 7 days', id: 'Maks 7 hari' },
      { ja: '最大30日', en: 'Max 30 days', id: 'Maks 30 hari' },
      { ja: '最大90日', en: 'Max 90 days', id: 'Maks 90 hari' },
      { ja: '無期限', en: 'Unlimited', id: 'Tidak terbatas' }
    ], answer: 1, explain: { ja: '最大30日で、その間に正式承認を取得します。', en: 'Max 30 days, during which formal approval must be obtained.', id: 'Maks 30 hari, selama itu persetujuan resmi harus diperoleh.' } },
    { q: { ja: '暫定標準の適用範囲として正しいのは？', en: 'Correct scope of a temporary standard?', id: 'Cakupan standar sementara yang benar?' }, choices: [
      { ja: '単一ライン限定', en: 'Single line only', id: 'Hanya satu lini' },
      { ja: '同じ製品を作る全ライン', en: 'All lines making the same product', id: 'Semua lini yang membuat produk sama' },
      { ja: '全工場', en: 'All plants', id: 'Semua pabrik' },
      { ja: '範囲の制限はない', en: 'No limit', id: 'Tanpa batas' }
    ], answer: 0, explain: { ja: '水平展開は正式承認後に行います。', en: 'Horizontal deployment happens after formal approval.', id: 'Penyebaran horizontal dilakukan setelah persetujuan resmi.' } },
    { q: { ja: 'Trialの進め方として適切なのは？', en: 'Appropriate way to run a Trial?', id: 'Cara menjalankan Uji coba yang tepat?' }, choices: [
      { ja: '直交表で完璧な実験計画を立ててから始める', en: 'Start after a perfect design with orthogonal arrays', id: 'Mulai setelah desain sempurna dengan tabel ortogonal' },
      { ja: '「まず5台やってみる」レベルの少ないN数ですぐ試す', en: 'Try at once with a small N like "5 units first"', id: 'Coba segera dengan N kecil seperti "5 unit dulu"' },
      { ja: '1ヶ月データを取ってから試す', en: 'Collect data for a month before trying', id: 'Kumpulkan data sebulan sebelum mencoba' },
      { ja: '全ラインで同時に試す', en: 'Try on all lines simultaneously', id: 'Coba di semua lini bersamaan' }
    ], answer: 1, explain: { ja: '完璧な実験計画はDeep GPCの役割です。Quickは小さく速く試します。', en: 'Perfect experimental design belongs to Deep GPC. Quick tries small and fast.', id: 'Desain eksperimen sempurna milik Deep GPC. Quick mencoba kecil dan cepat.' } },
    { q: { ja: 'エスカレーション基準に含まれないものは？', en: 'Which is NOT an escalation criterion?', id: 'Manakah yang BUKAN kriteria eskalasi?' }, choices: [
      { ja: '3回のH-T-C-Aで効果なし', en: 'No effect after 3 H-T-C-A cycles', id: 'Tidak efektif setelah 3 siklus H-T-C-A' },
      { ja: '一時的に改善するが再発する', en: 'Improves temporarily but recurs', id: 'Membaik sementara tetapi berulang' },
      { ja: '1回目のトライで効果が確認できた', en: 'The effect was confirmed on the first trial', id: 'Efek terkonfirmasi pada uji coba pertama' },
      { ja: '影響範囲が想定より大きい', en: 'The impact is larger than expected', id: 'Dampak lebih besar dari perkiraan' }
    ], answer: 2, explain: { ja: '効果が確認できたら標準化（Action）してPDCA-Sへ移行します。', en: 'If the effect is confirmed, standardize (Action) and move to PDCA-S.', id: 'Jika efek terkonfirmasi, standarkan (Action) dan beralih ke PDCA-S.' } },
    { q: { ja: '失敗したトライの扱いとして正しいのは？', en: 'Correct handling of a failed trial?', id: 'Penanganan uji coba gagal yang benar?' }, choices: [
      { ja: '記録せず忘れる', en: 'Forget it without recording', id: 'Lupakan tanpa mencatat' },
      { ja: 'ナレッジベースに登録し、無駄な再実験を防ぐ', en: 'Register it in the knowledge base to prevent wasteful re-experiments', id: 'Daftarkan di basis pengetahuan untuk mencegah eksperimen ulang yang sia-sia' },
      { ja: '担当者の評価を下げる', en: 'Lower the evaluation of the person in charge', id: 'Turunkan penilaian penanggung jawab' },
      { ja: '直ちにQuick GPCを禁止する', en: 'Ban Quick GPC immediately', id: 'Segera larang Quick GPC' }
    ], answer: 1, explain: { ja: '失敗事例も重要なナレッジです。失敗を許容する文化が成功要因です。', en: 'Failed cases are important knowledge. A culture accepting failure is a success factor.', id: 'Kasus gagal adalah pengetahuan penting. Budaya yang menerima kegagalan adalah faktor keberhasilan.' } },
    { q: { ja: 'H-T-C-AとPDCA-Sの違いとして正しいのは？', en: 'Correct difference between H-T-C-A and PDCA-S?', id: 'Perbedaan yang benar antara H-T-C-A dan PDCA-S?' }, choices: [
      { ja: 'H-T-C-AはPDCAの簡略版で同じ役割', en: 'H-T-C-A is a simplified PDCA with the same role', id: 'H-T-C-A adalah PDCA sederhana dengan peran sama' },
      { ja: 'H-T-C-Aは仮説起点の改善サイクル、PDCA-Sは計画起点の維持サイクル', en: 'H-T-C-A is a hypothesis-driven improvement cycle; PDCA-S is a plan-driven maintenance cycle', id: 'H-T-C-A siklus perbaikan berbasis hipotesis; PDCA-S siklus pemeliharaan berbasis rencana' },
      { ja: 'PDCA-Sのほうが統計知識を必要とする', en: 'PDCA-S requires more statistical knowledge', id: 'PDCA-S butuh lebih banyak pengetahuan statistik' },
      { ja: 'H-T-C-Aは1〜3ヶ月かかる', en: 'H-T-C-A takes 1–3 months', id: 'H-T-C-A butuh 1–3 bulan' }
    ], answer: 1, explain: { ja: '起点（仮説 vs 計画）と役割（改善 vs 維持）が異なります。', en: 'They differ in starting point (hypothesis vs plan) and role (improvement vs maintenance).', id: 'Berbeda titik awal (hipotesis vs rencana) dan peran (perbaikan vs pemeliharaan).' } }
  ]
});
