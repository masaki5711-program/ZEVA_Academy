ZA.addModule({
  id: 'ie-03',
  track: 'ie',
  order: 3,
  minutes: 30,
  icon: '⏲',
  level: 1,
  prereq: ['ie-02'],
  title: { ja: '時間研究と標準時間', en: 'Time Study and Standard Time', id: 'Studi Waktu dan Waktu Standar' },
  summary: {
    ja: 'ストップウォッチによる時間研究の手順、要素作業への分解、観測回数、レーティングと余裕率、標準時間の決め方、PTS法の概要を学びます。',
    en: 'Learn the procedure of stopwatch time study, breaking work into elements, number of observations, rating and allowances, setting standard time, and an overview of PTS.',
    id: 'Pelajari prosedur studi waktu dengan stopwatch, pemecahan kerja menjadi elemen, jumlah pengamatan, rating dan kelonggaran, penetapan waktu standar, serta gambaran PTS.'
  },
  objectives: [
    { ja: '時間研究の準備と手順を説明できる', en: 'Explain the preparation and procedure of a time study', id: 'Menjelaskan persiapan dan prosedur studi waktu' },
    { ja: '作業を要素作業に分解し、観測記録をまとめられる', en: 'Break work into elements and summarise observation records', id: 'Memecah kerja menjadi elemen dan merangkum catatan pengamatan' },
    { ja: '正味時間・レーティング・余裕率から標準時間を計算できる', en: 'Calculate standard time from normal time, rating and allowance', id: 'Menghitung waktu standar dari waktu normal, rating, dan kelonggaran' },
    { ja: '測定結果のバラツキを読み取り、標準化の必要性を判断できる', en: 'Read variation in measurements and judge the need for standardization', id: 'Membaca variasi hasil ukur dan menilai kebutuhan standardisasi' }
  ],
  sections: [
    {
      id: 'purpose',
      title: { ja: '時間研究とは', en: 'What is time study?', id: 'Apa itu studi waktu?' },
      blocks: [
        { type: 'p', text: {
          ja: '[[time-study]]とは、作業を直接観察し、ストップウォッチや動画を使って**作業にかかる時間を測定・分析する**手法です。目的は大きく3つあります。',
          en: '[[time-study]] is a method of directly observing work and **measuring and analysing the time it takes** with a stopwatch or video. It has three main purposes.',
          id: '[[time-study]] adalah metode mengamati kerja secara langsung dan **mengukur serta menganalisis waktunya** dengan stopwatch atau video. Ada tiga tujuan utama.'
        } },
        { type: 'cards', cols: 3, items: [
          { icon: '📏', tone: 'navy', title: { ja: '標準時間を決める', en: 'Set standard time', id: 'Menetapkan waktu standar' }, text: { ja: '人員計画・原価計算・生産計画の基準をつくる', en: 'create a basis for staffing, costing and production planning', id: 'membuat dasar perencanaan tenaga kerja, biaya, dan produksi' } },
          { icon: '🔍', tone: 'amber', title: { ja: 'ムダとバラツキを見つける', en: 'Find waste and variation', id: 'Menemukan pemborosan dan variasi' }, text: { ja: 'どの要素作業が長いか、毎回ばらつくかを発見する', en: 'discover which elements are long or vary every cycle', id: 'menemukan elemen mana yang lama atau bervariasi tiap siklus' } },
          { icon: '📈', tone: 'green', title: { ja: '改善効果を測る', en: 'Measure improvement effect', id: 'Mengukur efek perbaikan' }, text: { ja: '改善前後を同じ方法で測り、数字で比較する', en: 'measure before and after with the same method and compare numerically', id: 'mengukur sebelum dan sesudah dengan metode sama dan membandingkan secara angka' } }
        ] },
        { type: 'callout', kind: 'warn',
          title: { ja: '時間研究は「人を監視する」ことではない', en: 'Time study is not “watching people”', id: 'Studi waktu bukan “mengawasi orang”' },
          text: { ja: '測る対象は人ではなく**作業方法**です。事前に目的を説明し、作業者の協力を得ることが正確なデータの前提です。緊張して普段と違う作業になると、データの信頼性が失われます。', en: 'The target of measurement is the **work method**, not the person. Explaining the purpose and gaining worker cooperation in advance is a prerequisite for accurate data. If the worker is nervous and works differently, data reliability is lost.', id: 'Yang diukur adalah **metode kerja**, bukan orangnya. Menjelaskan tujuan dan mendapat kerja sama pekerja sebelumnya adalah syarat data akurat. Jika pekerja tegang dan bekerja berbeda dari biasanya, keandalan data hilang.' } }
      ]
    },
    {
      id: 'procedure',
      title: { ja: '時間研究の手順', en: 'Time study procedure', id: 'Prosedur studi waktu' },
      blocks: [
        { type: 'flow', dir: 'v', nodes: [
          { title: { ja: '1. 準備', en: '1. Prepare', id: '1. Persiapan' }, text: { ja: '目的の説明、対象作業・作業者の選定、標準手持ち（仕掛品）と作業条件の確認', en: 'explain purpose, select work & worker, confirm standard WIP and conditions', id: 'jelaskan tujuan, pilih pekerjaan & pekerja, pastikan WIP standar dan kondisi' }, tone: 'navy' },
          { title: { ja: '2. 観察', en: '2. Observe', id: '2. Amati' }, text: { ja: '数サイクル見て手順を理解し、手順が毎回同じか確認する（違えばまず手順をそろえる）', en: 'watch several cycles, confirm the sequence is the same every time (if not, align it first)', id: 'amati beberapa siklus, pastikan urutan sama tiap kali (jika tidak, samakan dulu)' }, tone: 'blue' },
          { title: { ja: '3. 要素作業に分解', en: '3. Break into elements', id: '3. Pecah menjadi elemen' }, text: { ja: '区切り点（観測点）を決め、記録用紙に要素を書き出す', en: 'define break points and list elements on the observation sheet', id: 'tentukan titik potong dan tulis elemen di lembar pengamatan' }, tone: 'blue' },
          { title: { ja: '4. 測定', en: '4. Measure', id: '4. Ukur' }, text: { ja: '連続して10回程度以上測定。異常があったサイクルはメモする', en: 'measure about 10+ consecutive cycles; note any abnormal cycle', id: 'ukur sekitar 10+ siklus berturut-turut; catat siklus tidak normal' }, tone: 'amber' },
          { title: { ja: '5. 集計・分析', en: '5. Summarise & analyse', id: '5. Rangkum & analisis' }, text: { ja: '要素ごとに最小・最大・平均・バラツキを算出し、原因を考える', en: 'compute min, max, mean and variation per element and consider causes', id: 'hitung min, maks, rata-rata, dan variasi per elemen, pikirkan penyebab' }, tone: 'amber' },
          { title: { ja: '6. 標準時間の設定', en: '6. Set standard time', id: '6. Tetapkan waktu standar' }, text: { ja: 'レーティングと余裕率を加えて標準時間を決める', en: 'apply rating and allowance to set the standard time', id: 'terapkan rating dan kelonggaran untuk menetapkan waktu standar' }, tone: 'green' }
        ] },
        { type: 'h', text: { ja: '測定方法：継続法と反復法', en: 'Measuring methods: continuous and snap-back', id: 'Metode pengukuran: kontinu dan snap-back' } },
        { type: 'table',
          head: [ { ja: '方法', en: 'Method', id: 'Metode' }, { ja: 'やり方', en: 'How', id: 'Cara' }, { ja: '長所', en: 'Advantage', id: 'Kelebihan' }, { ja: '短所', en: 'Disadvantage', id: 'Kekurangan' } ],
          rows: [
            [ { ja: '継続法', en: 'Continuous', id: 'Kontinu' }, { ja: '時計を止めずに各区切りの時刻を読み、後で引き算する', en: 'read the clock at each break point without stopping; subtract later', id: 'baca jam di tiap titik potong tanpa berhenti; kurangkan kemudian' }, { ja: '抜け漏れがなく、異常時間も記録できる', en: 'nothing is missed; abnormal time is also captured', id: 'tidak ada yang terlewat; waktu tidak normal juga tercatat' }, { ja: '後の計算に手間がかかる', en: 'more calculation afterwards', id: 'perhitungan lebih banyak setelahnya' } ],
            [ { ja: '反復法', en: 'Snap-back', id: 'Snap-back' }, { ja: '要素ごとにゼロに戻して直接時間を読む', en: 'reset to zero at each element and read time directly', id: 'reset ke nol tiap elemen dan baca waktu langsung' }, { ja: '要素時間がすぐ分かる', en: 'element times are known immediately', id: 'waktu elemen langsung diketahui' }, { ja: 'リセット時の誤差が積み重なる', en: 'reset errors accumulate', id: 'kesalahan saat reset menumpuk' } ]
          ] },
        { type: 'callout', kind: 'tip',
          title: { ja: '動画の活用', en: 'Using video', id: 'Menggunakan video' },
          text: { ja: '作業を撮影すれば、コマ送りで何度でも見返せ、要素の区切りも正確になります。複数人で同じ映像を見て議論できるのも利点です。', en: 'Filming the work lets you replay frame by frame, making element break points precise, and lets several people discuss the same footage.', id: 'Merekam kerja memungkinkan diputar ulang per frame, sehingga titik potong elemen presisi, dan beberapa orang dapat mendiskusikan rekaman yang sama.' } }
      ]
    },
    {
      id: 'elements',
      title: { ja: '要素作業への分解と観測回数', en: 'Elements and number of observations', id: 'Elemen kerja dan jumlah pengamatan' },
      blocks: [
        { type: 'p', text: {
          ja: '[[element-work]]とは、1サイクルの作業を**目的ごとのまとまり**に分けたものです。区切りは「部品に手が触れた瞬間」「ボタンを押した瞬間」など、**音や動きで誰でも判断できる点**にします。',
          en: '[[element-work]] are **purpose-based chunks** of one work cycle. Break points should be moments **anyone can recognise by sound or motion**, such as “the moment the hand touches the part” or “the moment the button is pressed”.',
          id: '[[element-work]] adalah **potongan berdasarkan tujuan** dari satu siklus kerja. Titik potong harus berupa momen yang **dapat dikenali siapa pun dari suara atau gerakan**, seperti “saat tangan menyentuh part” atau “saat tombol ditekan”.'
        } },
        { type: 'table',
          head: [ '#', { ja: '要素作業', en: 'Element', id: 'Elemen' }, { ja: '終わりの区切り点', en: 'End break point', id: 'Titik potong akhir' } ],
          rows: [
            [ '1', { ja: 'ケースを取り治具にセット', en: 'Pick case and set in jig', id: 'Ambil casing dan pasang di jig' }, { ja: 'ケースが治具に当たる音', en: 'sound of case hitting jig', id: 'suara casing mengenai jig' } ],
            [ '2', { ja: '基板を取り付ける', en: 'Mount the board', id: 'Pasang papan' }, { ja: '基板がはまった瞬間', en: 'moment the board clicks in', id: 'saat papan terpasang' } ],
            [ '3', { ja: 'ねじ4本を締める', en: 'Tighten 4 screws', id: 'Kencangkan 4 sekrup' }, { ja: 'ドライバーを置いた瞬間', en: 'moment the driver is put down', id: 'saat obeng diletakkan' } ],
            [ '4', { ja: '完成品をコンベアへ置く', en: 'Place unit on conveyor', id: 'Letakkan unit di konveyor' }, { ja: '手が製品から離れた瞬間', en: 'moment the hand leaves the unit', id: 'saat tangan lepas dari unit' } ]
          ],
          caption: { ja: '要素分解の例（説明用の架空の作業）', en: 'Example element breakdown (fictional work for illustration)', id: 'Contoh pemecahan elemen (pekerjaan fiktif untuk ilustrasi)' } },
        { type: 'h', text: { ja: '何回測ればよいか', en: 'How many observations?', id: 'Berapa kali mengukur?' } },
        { type: 'p', text: {
          ja: '現場ではまず**連続10回程度**の測定が目安です。統計的に必要な回数は、ばらつきが大きいほど多くなります。信頼度95%・誤差±5%で必要な観測回数の目安は次の式で求められます。',
          en: 'On the floor, about **10 consecutive cycles** is a practical start. Statistically, the more variation, the more observations are needed. For 95% confidence and ±5% error, the required number can be estimated as follows.',
          id: 'Di lantai produksi, sekitar **10 siklus berturut-turut** adalah awal yang praktis. Secara statistik, semakin besar variasi, semakin banyak pengamatan diperlukan. Untuk kepercayaan 95% dan galat ±5%, jumlah yang dibutuhkan dapat diperkirakan sebagai berikut.'
        } },
        { type: 'formula',
          expr: { ja: 'n ≈ ( 1.96 × σ ÷ (0.05 × μ) )² = ( 39.2 × V )²', en: 'n ≈ ( 1.96 × σ ÷ (0.05 × μ) )² = ( 39.2 × V )²', id: 'n ≈ ( 1,96 × σ ÷ (0,05 × μ) )² = ( 39,2 × V )²' },
          where: [
            { sym: 'μ', text: { ja: '予備測定の平均', en: 'mean of a pilot measurement', id: 'rata-rata pengukuran awal' } },
            { sym: 'σ', text: { ja: '予備測定の標準偏差', en: 'standard deviation of the pilot measurement', id: 'simpangan baku pengukuran awal' } },
            { sym: 'V', text: { ja: '変動係数 σ/μ（ZEVAのV.Scoreと同じ考え方）', en: 'coefficient of variation σ/μ (same idea as ZEVA V.Score)', id: 'koefisien variasi σ/μ (konsep sama dengan V.Score ZEVA)' } }
          ],
          note: { ja: '例：V = 0.05 なら n ≈ 3.8 → 4回で十分。V = 0.15 なら n ≈ 35回必要。**バラツキが大きい作業ほど、正しく測ること自体が難しくなります。**', en: 'e.g. V = 0.05 → n ≈ 3.8, 4 cycles are enough. V = 0.15 → n ≈ 35 cycles. **The larger the variation, the harder it is even to measure correctly.**', id: 'Contoh: V = 0,05 → n ≈ 3,8, cukup 4 siklus. V = 0,15 → n ≈ 35 siklus. **Semakin besar variasi, semakin sulit bahkan untuk mengukur dengan benar.**' } },
        { type: 'widget', name: 'stopwatch-sim', props: { baseSec: 30, noise: 0.15, cycles: 10 } }
      ]
    },
    {
      id: 'min-vs-mean',
      title: { ja: '最小値か平均値か：測定値の読み方', en: 'Minimum or mean: reading the measurements', id: 'Minimum atau rata-rata: membaca hasil ukur' },
      blocks: [
        { type: 'p', text: {
          ja: '測定した10回の値から何を「代表値」とするかは目的によって異なります。',
          en: 'Which value to take as the representative of 10 measurements depends on the purpose.',
          id: 'Nilai mana yang diambil sebagai perwakilan dari 10 pengukuran tergantung tujuannya.'
        } },
        { type: 'table',
          head: [ { ja: '代表値', en: 'Representative value', id: 'Nilai perwakilan' }, { ja: '意味', en: 'Meaning', id: 'Arti' }, { ja: '主な用途', en: 'Main use', id: 'Kegunaan' } ],
          rows: [
            [ { ja: '最小値', en: 'Minimum', id: 'Minimum' }, { ja: '余計な動作や迷いが最も少なかった回＝その方法で到達できる実力の目安', en: 'the cycle with the least extra motion or hesitation = what the method can achieve', id: 'siklus dengan gerakan tambahan/ragu paling sedikit = kemampuan metode tersebut' }, { ja: '改善の目標、標準作業の作業時間の基準（トヨタ式の改善現場で多用）', en: 'improvement target, basis of standard work time (common in lean practice)', id: 'target perbaikan, dasar waktu kerja standar (umum dalam praktik lean)' } ],
            [ { ja: '平均値', en: 'Mean', id: 'Rata-rata' }, { ja: '全体としてかかっている時間', en: 'time taken overall', id: 'waktu yang dipakai secara keseluruhan' }, { ja: '人員計画・原価計算の基準（標準時間）', en: 'basis for staffing and costing (standard time)', id: 'dasar perencanaan tenaga kerja dan biaya (waktu standar)' } ],
            [ { ja: '最大−最小（範囲）', en: 'Max − Min (range)', id: 'Maks − Min (rentang)' }, { ja: '毎回の作業のばらつき', en: 'cycle-to-cycle variation', id: 'variasi antar siklus' }, { ja: '標準化の不足・問題の兆候の発見', en: 'detecting lack of standardization and problems', id: 'mendeteksi kurangnya standardisasi dan masalah' } ]
          ] },
        { type: 'example',
          title: { ja: '計算例：10回の測定', en: 'Worked example: 10 measurements', id: 'Contoh: 10 pengukuran' },
          steps: [
            { ja: '測定値（秒）：32, 30, 35, 31, 42, 30, 33, 31, 38, 30', en: 'Values (s): 32, 30, 35, 31, 42, 30, 33, 31, 38, 30', id: 'Nilai (detik): 32, 30, 35, 31, 42, 30, 33, 31, 38, 30' },
            { ja: '合計 = 332、平均 = 33.2秒', en: 'Sum = 332, mean = 33.2 s', id: 'Jumlah = 332, rata-rata = 33,2 detik' },
            { ja: '最小 = 30秒、最大 = 42秒、範囲 = 12秒', en: 'Min = 30 s, max = 42 s, range = 12 s', id: 'Min = 30 detik, maks = 42 detik, rentang = 12 detik' },
            { ja: '42秒の回を映像で確認すると「部品を落として拾った」ことが判明', en: 'Video of the 42-s cycle shows “a part was dropped and picked up”', id: 'Video siklus 42 detik menunjukkan “part jatuh dan dipungut”' }
          ],
          result: { ja: '平均との差（33.2 − 30 = 3.2秒）はムダとバラツキの量を示しています。長い回の原因を調べることが改善の入り口です。', en: 'The gap to the mean (33.2 − 30 = 3.2 s) indicates the amount of waste and variation. Investigating long cycles is the entrance to improvement.', id: 'Selisih dengan rata-rata (33,2 − 30 = 3,2 detik) menunjukkan besarnya pemborosan dan variasi. Menyelidiki siklus panjang adalah pintu masuk perbaikan.' } },
        { type: 'callout', kind: 'zeva',
          title: { ja: 'ZEVAの視点：まず手順のバラツキを無くす', en: 'ZEVA view: first remove sequence variation', id: 'Pandangan ZEVA: hilangkan dulu variasi urutan' },
          text: { ja: '手順が毎回違う作業を測っても、その数字は「方法の実力」を表しません。ZEVAでは、まず標準作業で手順をそろえ（土台＝標準化）、そのうえでCTを測り、**V.Score（σ/μ）**でバラツキを評価します。バラツキの大きいデータは信頼できず、改善のアクションの根拠にできないからです。', en: 'Measuring work whose sequence changes each time does not show the method’s ability. In ZEVA you first align the sequence with standard work (foundation = standardization), then measure CT and evaluate variation with **V.Score (σ/μ)** — because data with large variation is unreliable and cannot ground improvement actions.', id: 'Mengukur kerja yang urutannya berubah tiap kali tidak menunjukkan kemampuan metode. Dalam ZEVA, samakan dulu urutan dengan kerja standar (fondasi = standardisasi), lalu ukur CT dan evaluasi variasi dengan **V.Score (σ/μ)** — karena data bervariasi besar tidak dapat dipercaya dan tidak bisa menjadi dasar tindakan perbaikan.' } }
      ]
    },
    {
      id: 'standard-time',
      title: { ja: '標準時間：レーティングと余裕率', en: 'Standard time: rating and allowance', id: 'Waktu standar: rating dan kelonggaran' },
      blocks: [
        { type: 'p', text: {
          ja: '[[standard-time]]とは、**所定の方法と設備で、その作業に適性があり習熟した作業者が、普通のペースで作業し、必要な余裕を含めて1単位を完成させるのに要する時間**です。',
          en: '[[standard-time]] is **the time a qualified, trained worker needs to complete one unit using the specified method and equipment at a normal pace, including necessary allowances**.',
          id: '[[standard-time]] adalah **waktu yang dibutuhkan pekerja terampil dan terlatih untuk menyelesaikan satu unit dengan metode dan peralatan yang ditentukan pada kecepatan normal, termasuk kelonggaran yang diperlukan**.'
        } },
        { type: 'formula',
          expr: { ja: '標準時間 = 観測時間 × レーティング係数 × (1 + 余裕率)', en: 'Standard time = Observed time × Rating factor × (1 + Allowance)', id: 'Waktu standar = Waktu teramati × Faktor rating × (1 + Kelonggaran)' },
          where: [
            { sym: 'Observed', text: { ja: '測定した代表時間（異常を除いた平均など）', en: 'representative measured time (e.g. mean excluding abnormal cycles)', id: 'waktu terukur perwakilan (misal rata-rata tanpa siklus tidak normal)' } },
            { sym: 'Rating', text: { ja: '作業者のペースを「普通」に補正する係数。速ければ100%超', en: 'factor that adjusts the worker’s pace to “normal”; above 100% if faster', id: 'faktor penyesuaian kecepatan pekerja ke “normal”; di atas 100% jika lebih cepat' } },
            { sym: 'Allowance', text: { ja: '生理的欲求・疲労・避けられない遅れのための余裕', en: 'allowance for personal needs, fatigue and unavoidable delays', id: 'kelonggaran untuk kebutuhan pribadi, kelelahan, dan penundaan tak terhindarkan' } }
          ],
          note: { ja: '観測時間 × レーティング係数 を「正味時間（正常時間）」と呼びます。', en: 'Observed time × rating factor is called “normal time” (basic time).', id: 'Waktu teramati × faktor rating disebut “waktu normal”.' } },
        { type: 'h', text: { ja: 'レーティング', en: 'Rating', id: 'Rating' } },
        { type: 'p', text: {
          ja: '[[rating]]とは、観測した作業者のペースを、標準的な作業者の普通のペースと比べて評価することです。観測した人が普通より20%速ければレーティング120%として、正味時間を長めに補正します。熟練した観測者でも判断にばらつきが出るため、映像教材で観測者どうしの目合わせを行うことが大切です。',
          en: '[[rating]] is judging the observed worker’s pace against the normal pace of a standard worker. If the observed worker is 20% faster than normal, the rating is 120%, and normal time is adjusted upward. Even trained observers vary in judgment, so calibrating observers with reference videos is important.',
          id: '[[rating]] adalah menilai kecepatan pekerja yang diamati dibanding kecepatan normal pekerja standar. Jika pekerja 20% lebih cepat dari normal, rating 120% dan waktu normal disesuaikan ke atas. Pengamat terlatih pun bervariasi dalam menilai, jadi penyamaan penilaian antar pengamat dengan video acuan penting.'
        } },
        { type: 'h', text: { ja: '余裕率', en: 'Allowance', id: 'Kelonggaran' } },
        { type: 'table',
          head: [ { ja: '余裕の種類', en: 'Type', id: 'Jenis' }, { ja: '内容', en: 'Content', id: 'Isi' }, { ja: '目安（説明用）', en: 'Guide (illustrative)', id: 'Panduan (ilustrasi)' } ],
          rows: [
            [ { ja: '用達余裕', en: 'Personal allowance', id: 'Kelonggaran pribadi' }, { ja: '水を飲む、トイレなど', en: 'drinking water, restroom', id: 'minum, ke toilet' }, '2–5%' ],
            [ { ja: '疲労余裕', en: 'Fatigue allowance', id: 'Kelonggaran kelelahan' }, { ja: '作業の重さ・姿勢・環境による疲れの回復', en: 'recovery from fatigue due to load, posture, environment', id: 'pemulihan kelelahan akibat beban, postur, lingkungan' }, '3–10%' ],
            [ { ja: '作業余裕', en: 'Work allowance', id: 'Kelonggaran kerja' }, { ja: '避けられない小さな遅れ、段取りの準備など', en: 'unavoidable small delays, preparation', id: 'penundaan kecil tak terhindarkan, persiapan' }, '2–5%' ],
            [ { ja: '管理余裕', en: 'Management allowance', id: 'Kelonggaran manajemen' }, { ja: '指示待ちなど管理上避けられない遅れ', en: 'unavoidable management delays such as waiting for instructions', id: 'penundaan manajemen tak terhindarkan seperti menunggu instruksi' }, '0–5%' ]
          ] },
        { type: 'example',
          title: { ja: '計算例：標準時間', en: 'Worked example: standard time', id: 'Contoh: waktu standar' },
          steps: [
            { ja: '観測時間（平均）= 50秒、レーティング = 110%、余裕率 = 12%', en: 'Observed (mean) = 50 s, rating = 110%, allowance = 12%', id: 'Teramati (rata-rata) = 50 detik, rating = 110%, kelonggaran = 12%' },
            { ja: '正味時間 = 50 × 1.10 = 55秒', en: 'Normal time = 50 × 1.10 = 55 s', id: 'Waktu normal = 50 × 1,10 = 55 detik' },
            { ja: '標準時間 = 55 × (1 + 0.12) = 61.6秒', en: 'Standard time = 55 × (1 + 0.12) = 61.6 s', id: 'Waktu standar = 55 × (1 + 0,12) = 61,6 detik' },
            { ja: '1日の稼働時間27,000秒あたりの標準生産量 = 27,000 ÷ 61.6 ≈ 438個', en: 'Standard output per 27,000 s = 27,000 ÷ 61.6 ≈ 438 units', id: 'Output standar per 27.000 detik = 27.000 ÷ 61,6 ≈ 438 unit' }
          ],
          result: { ja: '標準時間は61.6秒。これが人員計算や生産計画の基準になります。', en: 'Standard time is 61.6 s — the basis for staffing and production planning.', id: 'Waktu standar 61,6 detik — dasar perencanaan tenaga kerja dan produksi.' } },
        { type: 'widget', name: 'std-time-calc', props: { observed: 50, rating: 110, allowance: 12 } }
      ]
    },
    {
      id: 'pts',
      title: { ja: 'PTS法：測らずに時間を決める', en: 'PTS: setting time without a stopwatch', id: 'PTS: menetapkan waktu tanpa stopwatch' },
      blocks: [
        { type: 'p', text: {
          ja: '[[pts]]（既定時間標準法）は、作業を「手を伸ばす」「つかむ」「運ぶ」などの基本動作に分解し、**動作の種類・距離・条件ごとにあらかじめ決められた時間値**を合計して標準時間を求める方法です。代表的なものにMTM法やWF法があります。',
          en: '[[pts]] (Predetermined Time Standards) break work into basic motions such as reach, grasp and move, and sum **predetermined time values for each motion type, distance and condition** to obtain standard time. MTM and Work-Factor are well-known systems.',
          id: '[[pts]] (Predetermined Time Standards) memecah kerja menjadi gerakan dasar seperti menjangkau, menggenggam, dan memindahkan, lalu menjumlahkan **nilai waktu yang telah ditentukan untuk tiap jenis gerakan, jarak, dan kondisi** untuk mendapatkan waktu standar. MTM dan Work-Factor adalah sistem yang terkenal.'
        } },
        { type: 'compare',
          left: { title: { ja: 'ストップウォッチ法', en: 'Stopwatch study', id: 'Studi stopwatch' }, tone: 'blue', items: [
            { ja: '実際の作業が必要', en: 'requires the actual work', id: 'membutuhkan pekerjaan nyata' },
            { ja: 'レーティングに観測者の主観が入る', en: 'rating includes observer subjectivity', id: 'rating mengandung subjektivitas pengamat' },
            { ja: '習得が比較的容易', en: 'relatively easy to learn', id: 'relatif mudah dipelajari' }
          ] },
          right: { title: { ja: 'PTS法', en: 'PTS', id: 'PTS' }, tone: 'green', items: [
            { ja: '設計段階（まだ作業がない）でも時間を見積もれる', en: 'can estimate time at design stage (before the work exists)', id: 'dapat memperkirakan waktu di tahap desain (sebelum pekerjaan ada)' },
            { ja: 'レーティング不要で客観性が高い', en: 'no rating needed, more objective', id: 'tanpa rating, lebih objektif' },
            { ja: '動作分析に熟練が必要', en: 'requires skill in motion analysis', id: 'membutuhkan keahlian analisis gerakan' }
          ] } },
        { type: 'callout', kind: 'zeva',
          title: { ja: '理論値との関係', en: 'Relationship to theoretical values', id: 'Hubungan dengan nilai teoretis' },
          text: { ja: 'PTS法のように「その動作に本来必要な時間」を積み上げる考え方は、ZEVAの基盤である**理論値**（価値作業＋必要最小限の準価値作業）の発想と通じます。現状を測るだけでなく「あるべき時間」を設計する視点を持ちましょう。', en: 'Building up “the time a motion truly requires”, as PTS does, is close to the idea of the **theoretical value** (value work + minimum semi-value work) that is the base of ZEVA. Keep the viewpoint of designing “the time it should take”, not only measuring the present.', id: 'Menyusun “waktu yang benar-benar dibutuhkan suatu gerakan”, seperti PTS, dekat dengan konsep **nilai teoretis** dalam nilai teoretis (kerja bernilai + kerja semi-nilai minimum), dasar ZEVA. Miliki sudut pandang merancang “waktu yang seharusnya”, bukan hanya mengukur kondisi sekarang.' } }
      ]
    }
  ],
  keyPoints: [
    { ja: '時間研究は人ではなく方法を測る。目的を説明し協力を得る', en: 'Time study measures methods, not people — explain the purpose and gain cooperation', id: 'Studi waktu mengukur metode, bukan orang — jelaskan tujuan dan dapatkan kerja sama' },
    { ja: '誰でも判断できる区切り点で要素作業に分け、連続10回程度以上測る', en: 'Split into elements with recognisable break points and measure 10+ consecutive cycles', id: 'Pecah menjadi elemen dengan titik potong jelas dan ukur 10+ siklus berturut-turut' },
    { ja: '最小値は方法の実力、平均値は計画の基準、範囲はバラツキの兆候', en: 'Minimum = method ability, mean = planning basis, range = sign of variation', id: 'Minimum = kemampuan metode, rata-rata = dasar perencanaan, rentang = tanda variasi' },
    { ja: '標準時間 = 観測時間 × レーティング × (1 + 余裕率)', en: 'Standard time = observed × rating × (1 + allowance)', id: 'Waktu standar = teramati × rating × (1 + kelonggaran)' },
    { ja: 'バラツキが大きいと必要な観測回数が増え、データの信頼性も下がる', en: 'Large variation increases needed observations and lowers data reliability', id: 'Variasi besar menambah jumlah pengamatan dan menurunkan keandalan data' }
  ],
  quiz: [
    { q: { ja: '観測時間40秒、レーティング90%、余裕率10%の標準時間は？', en: 'Observed 40 s, rating 90%, allowance 10%. Standard time?', id: 'Teramati 40 detik, rating 90%, kelonggaran 10%. Waktu standar?' },
      choices: [ { ja: '39.6秒', en: '39.6 s', id: '39,6 detik' }, { ja: '48.0秒', en: '48.0 s', id: '48,0 detik' }, { ja: '36.0秒', en: '36.0 s', id: '36,0 detik' }, { ja: '44.0秒', en: '44.0 s', id: '44,0 detik' } ],
      answer: 0,
      explain: { ja: '正味時間 = 40 × 0.9 = 36秒、標準時間 = 36 × 1.1 = 39.6秒。', en: 'Normal time = 40 × 0.9 = 36 s; standard = 36 × 1.1 = 39.6 s.', id: 'Waktu normal = 40 × 0,9 = 36 detik; standar = 36 × 1,1 = 39,6 detik.' } },
    { q: { ja: '観測した作業者が普通より速いペースで作業していた。レーティングはどうなる？', en: 'The observed worker was faster than normal. What happens to the rating?', id: 'Pekerja yang diamati lebih cepat dari normal. Bagaimana ratingnya?' },
      choices: [ { ja: '100%未満にする', en: 'Below 100%', id: 'Di bawah 100%' }, { ja: '100%超にする', en: 'Above 100%', id: 'Di atas 100%' }, { ja: '常に100%', en: 'Always 100%', id: 'Selalu 100%' }, { ja: '余裕率で調整する', en: 'Adjust with allowance instead', id: 'Disesuaikan lewat kelonggaran' } ],
      answer: 1,
      explain: { ja: '速い作業者の観測時間は短いので、100%超のレーティングで普通のペースの時間に補正します。', en: 'A fast worker’s observed time is short, so a rating above 100% corrects it to normal-pace time.', id: 'Waktu teramati pekerja cepat pendek, jadi rating di atas 100% mengoreksinya ke waktu kecepatan normal.' } },
    { q: { ja: '要素作業の区切り点として最も適切なのは？', en: 'Which is the most suitable break point for an element?', id: 'Titik potong elemen mana yang paling tepat?' },
      choices: [ { ja: '「だいたい半分くらい終わったころ」', en: '“About halfway through”', id: '“Sekitar setengah jalan”' }, { ja: '「部品が治具に当たる音がした瞬間」', en: '“The moment the part clicks against the jig”', id: '“Saat part berbunyi mengenai jig”' }, { ja: '「作業者が集中し始めたとき」', en: '“When the worker starts concentrating”', id: '“Saat pekerja mulai fokus”' }, { ja: '「10秒ごと」', en: '“Every 10 seconds”', id: '“Setiap 10 detik”' } ],
      answer: 1,
      explain: { ja: '音や動きで誰でも同じように判断できる点を区切りにすると、測定のバラツキが減ります。', en: 'Break points anyone can recognise by sound or motion reduce measurement variation.', id: 'Titik potong yang dapat dikenali siapa pun dari suara atau gerakan mengurangi variasi pengukuran.' } },
    { q: { ja: '測定値の「最大 − 最小」が大きい作業から分かることは？', en: 'What does a large “max − min” in measurements tell you?', id: 'Apa arti “maks − min” yang besar pada hasil ukur?' },
      choices: [ { ja: '作業者の能力が高い', en: 'The worker is highly skilled', id: 'Pekerja sangat terampil' }, { ja: '手順や条件が安定しておらず、標準化が不足している兆候', en: 'Sign that the sequence or conditions are unstable and standardization is lacking', id: 'Tanda urutan atau kondisi tidak stabil dan standardisasi kurang' }, { ja: '測定回数が多すぎる', en: 'Too many measurements', id: 'Terlalu banyak pengukuran' }, { ja: '標準時間が短すぎる', en: 'Standard time is too short', id: 'Waktu standar terlalu pendek' } ],
      answer: 1,
      explain: { ja: '範囲の大きさは毎回の作業のバラツキを示し、原因（手順・部品・設備など）を調べる手がかりになります。', en: 'The range shows cycle-to-cycle variation and is a clue to investigate causes (sequence, parts, equipment, etc.).', id: 'Rentang menunjukkan variasi antar siklus dan menjadi petunjuk untuk menyelidiki penyebab (urutan, part, peralatan, dll.).' } },
    { q: { ja: '予備測定で変動係数 V = σ/μ が0.05から0.15に大きくなると、必要な観測回数は？', en: 'If the pilot coefficient of variation rises from 0.05 to 0.15, the required number of observations…', id: 'Jika koefisien variasi awal naik dari 0,05 ke 0,15, jumlah pengamatan yang dibutuhkan…' },
      choices: [ { ja: '3分の1になる', en: 'becomes one third', id: 'menjadi sepertiga' }, { ja: '変わらない', en: 'does not change', id: 'tidak berubah' }, { ja: '約3倍になる', en: 'about triples', id: 'sekitar tiga kali' }, { ja: '約9倍になる', en: 'becomes about 9 times', id: 'menjadi sekitar 9 kali' } ],
      answer: 3,
      explain: { ja: 'n は V の2乗に比例するので、Vが3倍なら n は9倍（約4回→約35回）になります。', en: 'n is proportional to V², so tripling V multiplies n by 9 (about 4 → about 35).', id: 'n sebanding dengan V², jadi V tiga kali membuat n sembilan kali (sekitar 4 → sekitar 35).' } },
    { q: { ja: 'PTS法の特長として正しいものは？', en: 'Which is a correct feature of PTS?', id: 'Manakah ciri PTS yang benar?' },
      choices: [ { ja: '実際に作業を行わないと使えない', en: 'Cannot be used without actual work', id: 'Tidak dapat dipakai tanpa pekerjaan nyata' }, { ja: 'レーティングが必須', en: 'Rating is mandatory', id: 'Rating wajib' }, { ja: '設計段階でも作業時間を見積もれる', en: 'Can estimate work time even at the design stage', id: 'Dapat memperkirakan waktu kerja bahkan di tahap desain' }, { ja: '動作の距離は考慮しない', en: 'Does not consider motion distance', id: 'Tidak memperhitungkan jarak gerakan' } ],
      answer: 2,
      explain: { ja: '基本動作ごとの既定時間を合計するため、ラインができる前でも時間を見積もれます。', en: 'Because it sums predetermined times per basic motion, time can be estimated before the line exists.', id: 'Karena menjumlahkan waktu yang telah ditentukan per gerakan dasar, waktu dapat diperkirakan sebelum lini ada.' } },
    { q: { ja: '時間研究の前に「手順が毎回違う」と分かった。まずすべきことは？', en: 'Before a time study you find the sequence differs every time. What should you do first?', id: 'Sebelum studi waktu, ternyata urutan berbeda tiap kali. Apa yang harus dilakukan dulu?' },
      choices: [ { ja: 'そのまま100回測って平均をとる', en: 'Measure 100 cycles anyway and take the mean', id: 'Tetap ukur 100 siklus dan ambil rata-rata' }, { ja: '手順をそろえる（標準化する）', en: 'Align the sequence (standardize)', id: 'Samakan urutan (standarkan)' }, { ja: '最も速い作業者だけを測る', en: 'Measure only the fastest worker', id: 'Ukur hanya pekerja tercepat' }, { ja: '余裕率を大きくする', en: 'Increase the allowance', id: 'Perbesar kelonggaran' } ],
      answer: 1,
      explain: { ja: '手順がばらばらのまま測った数値は方法の実力を表さず、信頼できません。まず手順をそろえるのが先です（ZEVAの「土台＝標準化」）。', en: 'Numbers measured with an inconsistent sequence do not represent the method and are unreliable. Align the sequence first (ZEVA’s “foundation = standardization”).', id: 'Angka yang diukur dengan urutan tidak konsisten tidak mewakili metode dan tidak dapat dipercaya. Samakan urutan dulu (“fondasi = standardisasi” ZEVA).' } }
  ]
});
