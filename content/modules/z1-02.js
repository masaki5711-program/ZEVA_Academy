(function () {
  const T = (ja, en, id) => ({ ja, en, id });

  ZA.addModule({
    id: 'z1-02',
    track: 'z1',
    order: 2,
    minutes: 35,
    icon: '🧠',
    level: 2,
    prereq: ['z1-01', 'ie-09'],
    title: T('根底ロジック：なぜバラツキを極限まで無くすのか', 'Root logic: why eliminate variation to the limit?', 'Logika dasar: mengapa variasi dihilangkan hingga batas?'),
    summary: T(
      'データに基づくアクションには信頼できるデータが必要——ZEVAのすべてを支える論理連鎖と、その理論的基盤であるシューハートの原則を学びます。',
      'Data-based action needs reliable data — learn the logical chain behind all of ZEVA and its theoretical basis, Shewhart’s principle.',
      'Tindakan berbasis data membutuhkan data yang andal — pelajari rantai logika di balik seluruh ZEVA dan dasar teorinya, prinsip Shewhart.'
    ),
    objectives: [
      T('根底ロジックの5段階の論理連鎖を順に説明できる', 'Explain the 5-step chain of the root logic in order', 'Menjelaskan rantai 5 langkah logika dasar secara berurutan'),
      T('シューハートの原則の意味と、不良率・V.Scoreの解釈への影響を説明できる', 'Explain Shewhart’s principle and its effect on interpreting the defect rate and V.Score', 'Menjelaskan prinsip Shewhart dan pengaruhnya pada interpretasi tingkat cacat dan V.Score'),
      T('3種類の変動（対象・測定・意図的）を区別できる', 'Distinguish 3 kinds of variation (object, measurement, intentional)', 'Membedakan 3 jenis variasi (objek, pengukuran, disengaja)'),
      T('データ信頼性＝精度＋正確さを説明できる', 'Explain data reliability = precision + accuracy', 'Menjelaskan keandalan data = presisi + akurasi'),
      T('好循環の起点が土台（標準化）にあり、デッドロックにならない理由を説明できる', 'Explain why the virtuous cycle starts from the foundation and is not a deadlock', 'Menjelaskan mengapa siklus positif dimulai dari fondasi dan bukan kebuntuan')
    ],
    sections: [
      {
        id: 'chain',
        title: T('根底ロジックの論理連鎖', 'The logical chain of the root logic', 'Rantai logika dari logika dasar'),
        blocks: [
          { type: 'p', text: T(
            'ZEVAの基本思想は「**すべてのバラツキを極限まで無くす**」ことです。これは「品質を良くしよう」というスローガンではありません。**改善活動そのものを成立させるための論理**——[[root-logic]]——に支えられています。',
            'The basic idea of ZEVA is to "**eliminate all variation to the limit**". This is not a slogan like "let’s improve quality". It rests on **the logic that makes improvement activity possible at all** — the [[root-logic]].',
            'Ide dasar ZEVA adalah "**menghilangkan semua variasi hingga batas**". Ini bukan slogan seperti "mari tingkatkan kualitas". Ide ini bertumpu pada **logika yang membuat kegiatan perbaikan dapat berjalan** — [[root-logic]].'
          ) },
          { type: 'chain', items: [
            T('改善のアクションは、勘や経験ではなく、**データに基づいて**起こさなければならない', 'Improvement actions must be based on **data**, not on intuition or experience', 'Tindakan perbaikan harus berdasarkan **data**, bukan intuisi atau pengalaman'),
            T('データに基づいたアクションには、**信頼性の高いデータ**が必要である', 'Data-based action requires **highly reliable data**', 'Tindakan berbasis data membutuhkan **data yang sangat andal**'),
            T('信頼性の高いデータとは、**バラツキが少なく、かつ偏りの無い**データである', 'Reliable data is data with **little variation and no bias**', 'Data yang andal adalah data dengan **variasi kecil dan tanpa bias**'),
            T('したがって、制御されていないバラツキが大きい＝データの信頼性が無く、**アクションを起こせない**（起こしにくい）', 'Therefore large uncontrolled variation = unreliable data = **you cannot (easily) act**', 'Maka variasi tak terkendali yang besar = data tidak andal = **tidak dapat (sulit) bertindak**'),
            T('ゆえに、すべてのバラツキ（制御されていない変動）を極限まで無くすことが、データに基づくアクションの**大前提**となる', 'Hence eliminating all variation (uncontrolled change) to the limit is the **fundamental premise** of data-based action', 'Karena itu menghilangkan semua variasi (perubahan tak terkendali) hingga batas adalah **premis dasar** tindakan berbasis data')
          ], conclusion: T('バラツキを無くすことは「目的」であると同時に、改善を可能にする「前提条件」でもある', 'Removing variation is both a "goal" and the "precondition" that makes improvement possible', 'Menghilangkan variasi adalah "tujuan" sekaligus "prasyarat" yang memungkinkan perbaikan') },
          { type: 'diagram', name: 'root-logic', caption: T('根底ロジックと好循環・悪循環', 'Root logic with virtuous and vicious cycles', 'Logika dasar dengan siklus positif dan negatif') },
          { type: 'callout', kind: 'example', title: T('体重計のたとえ', 'Bathroom scale analogy', 'Analogi timbangan badan'), text: T(
            'ダイエットの効果を確かめたいのに、体重計が乗るたびに±3kg変わるとしたら？ 1kg減ったかどうか判断できず、「食事を変えるべきか」も決められません。工程データも同じです。',
            'You want to check whether your diet works, but the scale changes ±3 kg every time you step on it. You cannot tell whether you lost 1 kg, so you cannot decide whether to change your meals. Process data works the same way.',
            'Anda ingin memeriksa apakah diet berhasil, tetapi timbangan berubah ±3 kg setiap kali Anda naik. Anda tidak bisa tahu apakah turun 1 kg, sehingga tidak bisa memutuskan apakah pola makan perlu diubah. Data proses pun sama.'
          ) },
          { type: 'widget', name: 'data-trust', props: {} }
        ]
      },
      {
        id: 'shewhart',
        title: T('理論的基盤：シューハートの原則', 'Theoretical basis: Shewhart’s principle', 'Dasar teori: prinsip Shewhart'),
        blocks: [
          { type: 'quote', text: T(
            '安定状態（統計的管理状態）にない工程には、定義可能な工程能力が存在しない。',
            'A process that is not in a stable state (statistical control) has no definable process capability.',
            'Proses yang tidak berada dalam kondisi stabil (terkendali secara statistik) tidak memiliki kapabilitas proses yang dapat didefinisikan.'
          ), cite: T('シューハートの原則', 'Shewhart’s principle', 'Prinsip Shewhart') },
          { type: 'p', text: T(
            '管理図理論（シューハート／デミング）では、変動を**偶然原因**（常に存在する小さな多数の要因）と**特殊原因**（工具の破損、材料ロット変更、手順の逸脱など、突発的で特定できる要因）に分けます。特殊原因が排除され、偶然原因だけで変動している状態を[[statistical-control]]と呼びます。',
            'Control chart theory (Shewhart / Deming) divides variation into **common causes** (many small factors always present) and **special causes** (sudden, identifiable factors such as a broken tool, a material lot change, or a deviation from the procedure). The state where special causes are removed and only common causes remain is called [[statistical-control]].',
            'Teori peta kendali (Shewhart / Deming) membagi variasi menjadi **penyebab umum** (banyak faktor kecil yang selalu ada) dan **penyebab khusus** (faktor mendadak yang dapat diidentifikasi seperti alat patah, pergantian lot material, atau penyimpangan prosedur). Kondisi di mana penyebab khusus dihilangkan dan hanya penyebab umum yang tersisa disebut [[statistical-control]].'
          ) },
          { type: 'compare',
            left: { tone: 'red', title: T('不安定な工程（特殊原因あり）', 'Unstable process (special causes)', 'Proses tidak stabil (ada penyebab khusus)'), items: [
              T('今日取ったデータが明日の工程を予測しない', 'Today’s data does not predict tomorrow’s process', 'Data hari ini tidak memprediksi proses besok'),
              T('不良率・V.Scoreは「計算はできる」が意味を持たない', 'The defect rate and V.Score can be calculated but mean nothing', 'Tingkat cacat dan V.Score dapat dihitung tetapi tidak bermakna'),
              T('改善前後の比較が偶然に左右される', 'Before/after comparisons depend on luck', 'Perbandingan sebelum/sesudah bergantung pada kebetulan')
            ] },
            right: { tone: 'green', title: T('安定した工程（統計的管理状態）', 'Stable process (in statistical control)', 'Proses stabil (terkendali secara statistik)'), items: [
              T('データに再現性があり、将来を予測できる', 'Data is reproducible and predicts the future', 'Data dapat direproduksi dan memprediksi masa depan'),
              T('工程の実力を指標で評価できる', 'What the process can do can be judged from the metrics', 'Kemampuan proses dapat dinilai dari metrik'),
              T('改善の効果を正しく判定できる', 'Improvement effects can be judged correctly', 'Efek perbaikan dapat dinilai dengan benar')
            ] }
          },
          { type: 'p', text: T(
            '根底ロジックの「バラツキが大きい＝データの信頼性が無い」とは、厳密には**工程が統計的管理状態になく、データが再現性を持たない状態**を指します。だからZEVAでは、[[defect-rate]]や[[v-score]]を評価する前に、まず管理図で工程の安定を確認します。',
            'In the root logic, "large variation = unreliable data" strictly means **the process is not in statistical control and its data is not reproducible**. That is why ZEVA first confirms stability with a control chart before evaluating the [[defect-rate]] or [[v-score]].',
            'Dalam logika dasar, "variasi besar = data tidak andal" secara tepat berarti **proses tidak terkendali secara statistik dan datanya tidak dapat direproduksi**. Karena itu ZEVA terlebih dahulu memastikan stabilitas dengan peta kendali sebelum mengevaluasi [[defect-rate]] atau [[v-score]].'
          ) },
          { type: 'callout', kind: 'warn', title: T('よくある落とし穴', 'Common pitfall', 'Jebakan umum'), text: T(
            '「今月の不良率は0.05%だから大丈夫」——その工程が安定状態にあることを確認していなければ、その数字は「たまたまの値」かもしれません。',
            '"The defect rate is 0.05% this month, so we are fine" — if you have not confirmed the process is stable, that number may just be a coincidence.',
            '"Tingkat cacat bulan ini 0,05%, jadi aman" — jika Anda belum memastikan proses stabil, angka itu mungkin hanya kebetulan.'
          ) },
          { type: 'check',
            q: T('工程が統計的管理状態にないとき、指標の数値について正しいのは？', 'When a process is not in statistical control, what is true about its metrics?', 'Jika proses tidak terkendali secara statistik, apa yang benar tentang metriknya?'),
            choices: [
              T('計算できないので0とみなす', 'It cannot be calculated, so treat it as 0', 'Tidak dapat dihitung, jadi dianggap 0'),
              T('計算はできるが、工程能力として意味を持たない', 'It can be calculated but has no meaning as process capability', 'Dapat dihitung tetapi tidak bermakna sebagai kapabilitas proses'),
              T('サンプル数を増やせば意味を持つ', 'It becomes meaningful with more samples', 'Menjadi bermakna dengan sampel lebih banyak')
            ],
            answer: 1,
            explain: T('シューハートの原則：安定状態にない工程には定義可能な工程能力が存在しません。まず特殊原因を取り除きます。', 'Shewhart’s principle: an unstable process has no definable capability. Remove special causes first.', 'Prinsip Shewhart: proses tidak stabil tidak memiliki kapabilitas yang dapat didefinisikan. Hilangkan penyebab khusus terlebih dahulu.')
          }
        ]
      },
      {
        id: 'three-kinds',
        title: T('「バラツキ」の定義：3つの変動の区別', 'Defining "variation": three kinds of change', 'Mendefinisikan "variasi": tiga jenis perubahan'),
        blocks: [
          { type: 'p', text: T(
            '根底ロジックが排除を求める「バラツキ」とは、**制御されていない変動**のことです。すべての変動が悪ではありません。次の3つを区別することで、「測定の問題」と「工程の問題」、そして「意図的な実験」を混同しないようにします。',
            'The "variation" that the root logic asks us to remove is **uncontrolled change**. Not all change is bad. Distinguishing the following three prevents confusing "measurement problems", "process problems" and "intentional experiments".',
            '"Variasi" yang diminta untuk dihilangkan oleh logika dasar adalah **perubahan yang tidak terkendali**. Tidak semua perubahan buruk. Membedakan tiga hal berikut mencegah kita mencampuradukkan "masalah pengukuran", "masalah proses", dan "eksperimen yang disengaja".'
          ) },
          { type: 'table',
            head: [T('種類', 'Kind', 'Jenis'), T('内容', 'Content', 'Isi'), T('扱い', 'Treatment', 'Perlakuan')],
            rows: [
              [T('対象のバラツキ', 'Variation of the object', 'Variasi objek'), T('工程・作業に残る制御されていない変動', 'Uncontrolled change remaining in the process or work', 'Perubahan tak terkendali yang tersisa di proses atau pekerjaan'), T('**排除対象**。ZEVAで「バラツキ」と言えば原則これ', '**To be removed.** "Variation" in ZEVA normally means this', '**Harus dihilangkan.** "Variasi" dalam ZEVA biasanya berarti ini')],
              [T('測定のバラツキ・偏り', 'Measurement variation & bias', 'Variasi & bias pengukuran'), T('測定システム自体の誤差（精度・正確さ）', 'Error of the measurement system itself (precision, accuracy)', 'Kesalahan sistem pengukuran itu sendiri (presisi, akurasi)'), T('[[msa]]・校正で排除し、データの信頼性を直接保証する', 'Removed via [[msa]] and calibration to directly guarantee data reliability', 'Dihilangkan melalui [[msa]] dan kalibrasi untuk langsung menjamin keandalan data')],
              [T('意図的な実験変動', 'Intentional experimental change', 'Perubahan eksperimental yang disengaja'), T('[[doe]]などで計画的に条件を振る変動', 'Change created on purpose by varying conditions, e.g. in [[doe]]', 'Perubahan yang dibuat sengaja dengan memvariasikan kondisi, misalnya dalam [[doe]]'), T('**排除対象ではない**。原因特定のための学習の源泉', '**Not to be removed.** A source of learning to identify causes', '**Tidak dihilangkan.** Sumber pembelajaran untuk mengidentifikasi penyebab')]
            ],
            caption: T('3つの変動の区別', 'Distinguishing three kinds of change', 'Membedakan tiga jenis perubahan')
          },
          { type: 'widget', name: 'sort-game', props: {
            title: T('この変動はどの種類？', 'Which kind of change is this?', 'Jenis perubahan apakah ini?'),
            bins: [
              { id: 'obj', label: T('対象のバラツキ（排除）', 'Object variation (remove)', 'Variasi objek (hilangkan)'), tone: 'red' },
              { id: 'meas', label: T('測定のバラツキ・偏り（MSA・校正）', 'Measurement variation/bias (MSA, calibration)', 'Variasi/bias pengukuran (MSA, kalibrasi)'), tone: 'amber' },
              { id: 'doe', label: T('意図的な実験変動（学習）', 'Intentional experiment (learning)', 'Eksperimen disengaja (pembelajaran)'), tone: 'green' }
            ],
            items: [
              { bin: 'obj', text: T('作業者によってねじ締め時間が大きく違う', 'Screw-tightening time differs greatly between operators', 'Waktu pengencangan sekrup sangat berbeda antar operator'), explain: T('工程（人の作業）に残る制御されていない変動です。', 'Uncontrolled change remaining in the work.', 'Perubahan tak terkendali yang tersisa di pekerjaan.') },
              { bin: 'meas', text: T('同じ部品を2人が測ると寸法値が違う', 'Two people measure the same part and get different sizes', 'Dua orang mengukur part yang sama dan hasilnya berbeda'), explain: T('対象は同じなので、測定システム（再現性）の問題です。', 'The object is the same, so it is a measurement system (reproducibility) issue.', 'Objeknya sama, jadi ini masalah sistem pengukuran (reprodusibilitas).') },
              { bin: 'doe', text: T('最適条件を探すため温度を3水準に振って試作する', 'Trial production at 3 temperature levels to find the optimum', 'Produksi percobaan pada 3 level suhu untuk mencari kondisi optimal'), explain: T('計画的に条件を振る実験変動。学習の源泉です。', 'Planned change for experiment — a source of learning.', 'Perubahan terencana untuk eksperimen — sumber pembelajaran.') },
              { bin: 'meas', text: T('ノギスがいつも0.05mm大きく表示する', 'The caliper always reads 0.05 mm too large', 'Jangka sorong selalu menunjukkan 0,05 mm lebih besar'), explain: T('測定の偏り（正確さの問題）。校正で解消します。', 'Measurement bias (accuracy). Fixed by calibration.', 'Bias pengukuran (akurasi). Diatasi dengan kalibrasi.') },
              { bin: 'obj', text: T('治具の摩耗で加工位置が日ごとにずれていく', 'Jig wear shifts the machining position day by day', 'Keausan jig membuat posisi pemesinan bergeser dari hari ke hari'), explain: T('工程に残る制御されていない変動です。', 'Uncontrolled change in the process.', 'Perubahan tak terkendali dalam proses.') },
              { bin: 'doe', text: T('2種類の部品配置をA/B比較テストする', 'A/B test of two part layouts', 'Uji A/B dua tata letak part'), explain: T('意図的に条件を変えた比較。排除対象ではありません。', 'An intentional comparison; not something to remove.', 'Perbandingan yang disengaja; bukan untuk dihilangkan.') },
              { bin: 'meas', text: T('ストップウォッチの押し方が人によって違い、計測値がばらつく', 'Stopwatch operation differs by observer, scattering readings', 'Cara menekan stopwatch berbeda antar pengamat sehingga hasil bervariasi'), explain: T('測定方法の違いによる測定のバラツキです。', 'Measurement variation due to different measuring methods.', 'Variasi pengukuran karena metode pengukuran berbeda.') },
              { bin: 'obj', text: T('部品ロットが変わると不良率が急に上がる', 'Defect rate jumps when the part lot changes', 'Tingkat cacat melonjak saat lot part berganti'), explain: T('材料に起因する制御されていない変動（特殊原因）です。', 'Uncontrolled, material-caused change (special cause).', 'Perubahan tak terkendali akibat material (penyebab khusus).') }
            ]
          } }
        ]
      },
      {
        id: 'reliability',
        title: T('データ信頼性＝精度＋正確さ', 'Data reliability = precision + accuracy', 'Keandalan data = presisi + akurasi'),
        blocks: [
          { type: 'p', text: T(
            '[[data-reliability]]とは、データが**バラツキ（精度）**と**偏り（正確さ）**の両面で信頼でき、アクションの根拠として使える度合いです。どちらか片方だけでは不十分です。',
            '[[data-reliability]] is the degree to which data can be trusted in terms of both **variation (precision)** and **bias (accuracy)**, so that it can be the basis for action. One without the other is not enough.',
            '[[data-reliability]] adalah tingkat di mana data dapat dipercaya dari sisi **variasi (presisi)** dan **bias (akurasi)**, sehingga dapat menjadi dasar tindakan. Salah satu saja tidak cukup.'
          ) },
          { type: 'diagram', name: 'precision-accuracy', caption: T('精度と正確さ：4つの的', 'Precision and accuracy: four targets', 'Presisi dan akurasi: empat sasaran') },
          { type: 'cards', cols: 2, items: [
            { icon: '🎯', tone: 'blue', title: T('[[precision]]（バラツキが小さい）', '[[precision]] (small variation)', '[[precision]] (variasi kecil)'), text: T('同じものを繰り返し測ったとき、値がどれだけ揃っているか。偶然誤差の小ささ。', 'How closely repeated measurements of the same thing agree. Small random error.', 'Seberapa dekat hasil pengukuran berulang dari hal yang sama. Kesalahan acak kecil.') },
            { icon: '📍', tone: 'green', title: T('[[accuracy]]（偏りが無い）', '[[accuracy]] (no bias)', '[[accuracy]] (tanpa bias)'), text: T('値の中心が真の値にどれだけ近いか。系統誤差（偏り）の小ささ。', 'How close the center of the values is to the true value. Small systematic error (bias).', 'Seberapa dekat pusat nilai dengan nilai sebenarnya. Kesalahan sistematis (bias) kecil.') }
          ] },
          { type: 'callout', kind: 'note', title: T('「揃っているが間違っている」データ', 'Data that is "consistent but wrong"', 'Data yang "konsisten tetapi salah"'), text: T(
            '精度が高く偏りがある測定器は、毎回同じように間違えます。バラツキが小さいので信頼できそうに見えますが、アクションは誤った方向に向かいます。だからZEVAではデータ信頼性の定義に「偏りの無さ」を加えています。',
            'A precise but biased gauge is wrong the same way every time. It looks trustworthy because variation is small, but actions go in the wrong direction. That is why "absence of bias" is part of the definition of data reliability.',
            'Alat ukur yang presisi tetapi bias salah dengan cara yang sama setiap kali. Tampak dapat dipercaya karena variasinya kecil, tetapi tindakan mengarah ke arah yang salah. Karena itu "tanpa bias" menjadi bagian definisi keandalan data.'
          ) },
          { type: 'p', text: T(
            '測定のバラツキ（繰返し性・再現性）と偏り（校正）は、Deep GPCのMeasureフェーズで行う[[msa]]で評価・排除します。',
            'Measurement variation (repeatability, reproducibility) and bias (calibration) are evaluated and removed through [[msa]] in the Measure phase of Deep GPC.',
            'Variasi pengukuran (repeatability, reproducibility) dan bias (kalibrasi) dievaluasi dan dihilangkan melalui [[msa]] pada fase Measure dari Deep GPC.'
          ) }
        ]
      },
      {
        id: 'cycles',
        title: T('好循環と悪循環、そして起点', 'Virtuous and vicious cycles, and the starting point', 'Siklus positif dan negatif, serta titik awal'),
        blocks: [
          { type: 'cycle', center: T('好循環', 'Virtuous cycle', 'Siklus positif'), nodes: [
            { tone: 'green', title: T('バラツキを削減', 'Reduce variation', 'Kurangi variasi'), text: T('標準化・GPC制御', 'Standardization, GPC control', 'Standardisasi, kendali GPC') },
            { tone: 'blue', title: T('データ信頼性が向上', 'Data reliability rises', 'Keandalan data naik'), text: T('再現性のあるデータ', 'Reproducible data', 'Data yang dapat direproduksi') },
            { tone: 'navy', title: T('的確なアクション', 'Accurate action', 'Tindakan tepat'), text: T('効果を正しく判定', 'Judge effects correctly', 'Menilai efek dengan benar') },
            { tone: 'green', title: T('さらにバラツキ削減', 'Even less variation', 'Variasi makin kecil'), text: T('新しい標準へ', 'Into a new standard', 'Menjadi standar baru') }
          ] },
          { type: 'cycle', center: T('悪循環', 'Vicious cycle', 'Siklus negatif'), nodes: [
            { tone: 'red', title: T('バラツキを放置', 'Leave variation', 'Biarkan variasi'), text: T('標準が曖昧', 'Vague standards', 'Standar samar') },
            { tone: 'amber', title: T('データの信頼性喪失', 'Data loses reliability', 'Data kehilangan keandalan'), text: T('何が効いたか分からない', 'Cannot tell what worked', 'Tidak tahu apa yang berhasil') },
            { tone: 'red', title: T('動けない・誤判断', 'No action / wrong judgment', 'Tidak bertindak / salah menilai'), text: T('勘と経験に逆戻り', 'Back to intuition', 'Kembali ke intuisi') },
            { tone: 'gray', title: T('バラツキ拡大', 'Variation grows', 'Variasi membesar'), text: T('ロスが増える', 'Losses increase', 'Kerugian bertambah') }
          ] },
          { type: 'h', text: T('好循環の起点：デッドロックではない', 'Starting point: not a deadlock', 'Titik awal: bukan kebuntuan') },
          { type: 'callout', kind: 'warn', title: T('誤った読み方', 'Wrong interpretation', 'Tafsiran yang salah'), text: T(
            '「データが信頼できるようになるまで、アクションを起こしてはいけない」——これは誤りです。**バラツキを減らすこと自体がアクション**だからです。',
            '"Do not act until the data becomes reliable" — this is wrong, because **reducing variation is itself an action**.',
            '"Jangan bertindak sampai data menjadi andal" — ini salah, karena **mengurangi variasi itu sendiri adalah tindakan**.'
          ) },
          { type: 'flow', dir: 'h', nodes: [
            { tone: 'navy', title: T('① 土台づくり', '① Build the foundation', '① Bangun fondasi'), text: T('[[5s]]・[[3tei]]と[[standard-work]]で最低限の再現性を確保。最初の標準は[[initial-standard]]として速く決める', 'Secure minimum reproducibility with [[5s]], [[3tei]] and [[standard-work]]; decide the first standard quickly as the [[initial-standard]]', 'Pastikan reprodusibilitas minimum dengan [[5s]], [[3tei]], dan [[standard-work]]; tetapkan standar pertama dengan cepat sebagai [[initial-standard]]') },
            { tone: 'blue', title: T('② 意味のあるデータ', '② Meaningful data', '② Data bermakna'), text: T('比較できるデータが取れる状態にする', 'Reach a state where comparable data can be taken', 'Mencapai kondisi di mana data yang dapat dibandingkan bisa diambil') },
            { tone: 'green', title: T('③ 小さく試す', '③ Try small', '③ Coba kecil-kecilan'), text: T('Quick GPCが粗いデータでも小さなトライを回す', 'Quick GPC runs small trials even with rough data', 'Quick GPC menjalankan uji kecil walau datanya masih kasar') },
            { tone: 'green', title: T('④ 信頼性が上がる', '④ Reliability rises', '④ Keandalan naik'), text: T('改善のたびにデータがより信頼できるようになる', 'Each improvement makes the data more reliable', 'Setiap perbaikan membuat data lebih andal') }
          ] },
          { type: 'p', text: T(
            '信頼できるデータが揃うのを「待つ」のではなく、**動きながら好循環を立ち上げる**——循環の起点は[[foundation-standardization]]にあります。',
            'Do not "wait" for reliable data to appear; **start the virtuous cycle while moving**. The starting point of the cycle is the [[foundation-standardization]].',
            'Jangan "menunggu" data yang andal; **mulailah siklus positif sambil bergerak**. Titik awal siklus ada pada [[foundation-standardization]].'
          ) }
        ]
      },
      {
        id: 'mapping',
        title: T('二重の排除理由と各構成要素との対応', 'The double reason and mapping to components', 'Alasan ganda dan pemetaan ke komponen'),
        blocks: [
          { type: 'cards', cols: 2, items: [
            { icon: '💸', tone: 'red', title: T('理由1：ロスの根源として', 'Reason 1: as the root of loss', 'Alasan 1: sebagai akar kerugian'), text: T('品質・コスト・納期・安全（QCDS）のあらゆるロスを生む（原則①）', 'Creates every loss in quality, cost, delivery and safety (QCDS) (Principle ①)', 'Menimbulkan semua kerugian kualitas, biaya, pengiriman, dan keselamatan (QCDS) (Prinsip ①)') },
            { icon: '📉', tone: 'amber', title: T('理由2：データ信頼性の毀損要因として', 'Reason 2: as a destroyer of data reliability', 'Alasan 2: sebagai perusak keandalan data'), text: T('データの信頼性を失わせ、データに基づく改善アクションそのものを不可能にする', 'Destroys data reliability and makes data-based improvement action itself impossible', 'Menghilangkan keandalan data dan membuat tindakan perbaikan berbasis data menjadi mustahil') }
          ] },
          { type: 'table',
            head: [T('構成要素', 'Component', 'Komponen'), T('根底ロジックとの関係', 'Relation to the root logic', 'Hubungan dengan logika dasar')],
            rows: [
              [T('土台（標準化）', 'Foundation (standardization)', 'Fondasi (standardisasi)'), T('再現性の確保が、バラツキの少ないデータ取得の第一歩', 'Securing reproducibility is the first step to low-variation data', 'Menjamin reprodusibilitas adalah langkah pertama menuju data bervariasi rendah')],
              [T('GPC制御（GPC-M / GPC-H）', 'GPC control (GPC-M / GPC-H)', 'Kendali GPC (GPC-M / GPC-H)'), T('バラツキを制御下に置き、取得データの信頼性を保証する', 'Keeps variation under control and guarantees data reliability', 'Menjaga variasi terkendali dan menjamin keandalan data')],
              [T('トリアージ基準④（データ）', 'Triage criterion ④ (data)', 'Kriteria triase ④ (data)'), T('データの入手性だけでなく信頼性もルート判定の基準に含む', 'Includes not only availability but also reliability of data in routing', 'Memasukkan tidak hanya ketersediaan tetapi juga keandalan data dalam pengarahan')],
              [T('MSA（測定システム分析）', 'MSA (measurement system analysis)', 'MSA (analisis sistem pengukuran)'), T('測定の精度と正確さを評価・排除し、データ信頼性を保証する', 'Evaluates and removes precision/accuracy problems of measurement', 'Mengevaluasi dan menghilangkan masalah presisi/akurasi pengukuran')],
              [T('V.Score・不良率', 'V.Score, defect rate', 'V.Score, tingkat cacat'), T('バラツキ＝データ信頼性を定量化。解釈には安定状態の確認が前提', 'Quantify variation = data reliability; interpretation requires confirmed stability', 'Mengukur variasi = keandalan data; interpretasi memerlukan stabilitas yang terkonfirmasi')]
            ]
          },
          { type: 'callout', kind: 'zeva', title: T('まとめ', 'Summary', 'Ringkasan'), text: T(
            'ZEVAの全活動は、この好循環を回し続けるための仕組みです。',
            'Every ZEVA activity is a mechanism to keep this virtuous cycle turning.',
            'Setiap aktivitas ZEVA adalah mekanisme untuk menjaga siklus positif ini terus berputar.'
          ) }
        ]
      }
    ],
    keyPoints: [
      T('アクションはデータに基づく → 信頼できるデータが必要 → 信頼できるデータ＝バラツキが少なく偏りが無い', 'Action is based on data → needs reliable data → reliable = low variation and no bias', 'Tindakan berbasis data → butuh data andal → andal = variasi rendah dan tanpa bias'),
      T('シューハートの原則：安定状態にない工程には定義可能な工程能力が存在しない', 'Shewhart: an unstable process has no definable capability', 'Shewhart: proses tidak stabil tidak memiliki kapabilitas yang dapat didefinisikan'),
      T('排除するのは「制御されていない変動」。測定の問題はMSA・校正、DOEの変動は学習の源泉', 'Remove "uncontrolled change"; measurement issues → MSA/calibration; DOE change → learning', 'Hilangkan "perubahan tak terkendali"; masalah pengukuran → MSA/kalibrasi; perubahan DOE → pembelajaran'),
      T('データ信頼性＝精度（バラツキ小）＋正確さ（偏り無し）', 'Data reliability = precision (low variation) + accuracy (no bias)', 'Keandalan data = presisi (variasi rendah) + akurasi (tanpa bias)'),
      T('好循環の起点は土台（標準化）。待たずに、動きながら立ち上げる', 'The virtuous cycle starts from the foundation; start it while moving, do not wait', 'Siklus positif dimulai dari fondasi; mulailah sambil bergerak, jangan menunggu')
    ],
    quiz: [
      { q: T('根底ロジックで「信頼性の高いデータ」とは？', 'In the root logic, what is "reliable data"?', 'Dalam logika dasar, apa itu "data yang andal"?'),
        choices: [T('量が多いデータ', 'Data in large volume', 'Data dalam jumlah besar'), T('バラツキが少なく、かつ偏りの無いデータ', 'Data with little variation and no bias', 'Data dengan variasi kecil dan tanpa bias'), T('最新のデータ', 'The latest data', 'Data terbaru'), T('センサーで自動収集したデータ', 'Data collected automatically by sensors', 'Data yang dikumpulkan otomatis oleh sensor')],
        answer: 1, explain: T('精度（バラツキ小）と正確さ（偏り無し）の両方が必要です。', 'Both precision (low variation) and accuracy (no bias) are needed.', 'Diperlukan presisi (variasi rendah) dan akurasi (tanpa bias).') },
      { q: T('シューハートの原則の内容は？', 'What does Shewhart’s principle state?', 'Apa isi prinsip Shewhart?'),
        choices: [T('平均値が規格内なら工程能力は十分', 'If the average is within spec, capability is enough', 'Jika rata-rata dalam spesifikasi, kapabilitas cukup'), T('安定状態にない工程には定義可能な工程能力が存在しない', 'A process not in a stable state has no definable process capability', 'Proses yang tidak stabil tidak memiliki kapabilitas proses yang dapat didefinisikan'), T('サンプルは30個以上必要', 'At least 30 samples are needed', 'Minimal 30 sampel diperlukan'), T('管理限界は規格限界と同じ', 'Control limits equal spec limits', 'Batas kendali sama dengan batas spesifikasi')],
        answer: 1, explain: T('特殊原因が残る工程では、今日のデータが明日を予測しません。', 'With special causes remaining, today’s data does not predict tomorrow.', 'Dengan penyebab khusus yang tersisa, data hari ini tidak memprediksi hari esok.') },
      { q: T('DOEで計画的に温度条件を振ったときの変動の扱いは？', 'How is change created intentionally by DOE treated?', 'Bagaimana perlakuan terhadap perubahan yang sengaja dibuat dalam DOE?'),
        choices: [T('ただちに排除する', 'Remove immediately', 'Segera dihilangkan'), T('測定のバラツキとしてMSAを行う', 'Treat as measurement variation and run MSA', 'Diperlakukan sebagai variasi pengukuran dan lakukan MSA'), T('排除対象ではなく、原因特定のための学習の源泉', 'Not removed — a source of learning to identify causes', 'Tidak dihilangkan — sumber pembelajaran untuk menemukan penyebab'), T('不良として記録する', 'Record as a defect', 'Dicatat sebagai cacat')],
        answer: 2, explain: T('意図的な実験変動は排除対象ではありません。', 'Intentional experimental change is not something to remove.', 'Perubahan eksperimental yang disengaja tidak dihilangkan.') },
      { q: T('毎回ほぼ同じ値を示すが、真の値より常に大きい測定器の状態は？', 'A gauge gives nearly the same value every time but always larger than true. Its state?', 'Alat ukur memberi nilai hampir sama setiap kali tetapi selalu lebih besar dari nilai sebenarnya. Kondisinya?'),
        choices: [T('精度が高く、正確さが低い', 'High precision, low accuracy', 'Presisi tinggi, akurasi rendah'), T('精度が低く、正確さが高い', 'Low precision, high accuracy', 'Presisi rendah, akurasi tinggi'), T('どちらも高い', 'Both high', 'Keduanya tinggi'), T('どちらも低い', 'Both low', 'Keduanya rendah')],
        answer: 0, explain: T('揃っている（精度高）が、中心がずれている（偏り＝正確さ低）状態です。校正が必要です。', 'Consistent (high precision) but shifted (bias = low accuracy). Calibration is needed.', 'Konsisten (presisi tinggi) tetapi bergeser (bias = akurasi rendah). Perlu kalibrasi.') },
      { q: T('「信頼できるデータが揃うまでアクションを起こさない」という解釈について正しいのは？', 'About the reading "do not act until reliable data is available", which is correct?', 'Tentang tafsiran "jangan bertindak sampai data andal tersedia", mana yang benar?'),
        choices: [T('正しい。まずデータ収集に専念する', 'Correct; focus only on data collection first', 'Benar; fokus mengumpulkan data dulu'), T('誤り。バラツキを減らすこと自体がアクションであり、起点は土台（標準化）', 'Wrong; reducing variation is itself action, and the start is the foundation (standardization)', 'Salah; mengurangi variasi itu sendiri tindakan, dan titik awalnya fondasi (standardisasi)'), T('誤り。データは不要', 'Wrong; data is unnecessary', 'Salah; data tidak diperlukan'), T('デジタル化を導入するまで待つべき', 'Wait until digitalisation is introduced', 'Tunggu sampai digitalisasi diterapkan')],
        answer: 1, explain: T('5S・3定と標準作業で最低限の再現性を確保し、Quick GPCで小さく試しながら好循環を立ち上げます。', 'Secure minimum reproducibility with 5S/3-tei and standard work, then start the cycle with small Quick GPC trials.', 'Pastikan reprodusibilitas minimum dengan 5S/3-tei dan kerja standar, lalu mulai siklus dengan uji kecil Quick GPC.') },
      { q: T('バラツキが「二重の意味で」排除対象となる理由の組合せは？', 'Why is variation removed for a "double reason"?', 'Mengapa variasi dihilangkan karena "alasan ganda"?'),
        choices: [T('コストが高い／見た目が悪い', 'High cost / looks bad', 'Biaya tinggi / terlihat buruk'), T('ロスの根源である／データ信頼性を毀損する', 'It is the root of loss / it destroys data reliability', 'Akar kerugian / merusak keandalan data'), T('顧客が嫌う／監査で指摘される', 'Customers dislike it / audits point it out', 'Pelanggan tidak suka / ditemukan saat audit'), T('設備が壊れる／人が疲れる', 'Machines break / people get tired', 'Mesin rusak / orang lelah')],
        answer: 1, explain: T('原則①の「ロスの根源」と、根底ロジックの「データ信頼性の毀損」の二重の理由です。', 'The "root of loss" of Principle ① and the "destroyer of data reliability" of the root logic.', '"Akar kerugian" dari Prinsip ① dan "perusak keandalan data" dari logika dasar.') },
      { q: T('指標を評価する前にZEVAがまず行うことは？', 'What does ZEVA do first before evaluating its metrics?', 'Apa yang ZEVA lakukan terlebih dahulu sebelum mengevaluasi metriknya?'),
        choices: [T('規格を広げる', 'Widen the specification', 'Memperlebar spesifikasi'), T('管理図（X̄-R）で工程の安定を確認する', 'Confirm process stability with a control chart (X̄-R)', 'Memastikan stabilitas proses dengan peta kendali (X̄-R)'), T('平均値を計算する', 'Calculate the average', 'Menghitung rata-rata'), T('作業者を増やす', 'Add operators', 'Menambah operator')],
        answer: 1, explain: T('指標の解釈には、工程が統計的管理状態にあることが前提です。', 'Interpreting metrics requires the process to be in statistical control.', 'Interpretasi metrik memerlukan proses yang terkendali secara statistik.') }
    ]
  });
})();
