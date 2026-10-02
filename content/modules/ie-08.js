(function () {
  const T = (ja, en, id) => ({ ja, en, id });

  ZA.addModule({
    id: 'ie-08',
    track: 'ie',
    order: 8,
    minutes: 35,
    icon: '📊',
    level: 2,
    prereq: ['ie-03'],
    title: T('統計の基礎', 'Basic Statistics', 'Dasar Statistik'),
    summary: T(
      '平均・範囲・標準偏差・変動係数・ヒストグラム・正規分布を、電卓レベルの計算から直感的に理解します。バラツキを「数字で語る」ための土台です。',
      'Understand mean, range, standard deviation, coefficient of variation, histograms and the normal distribution from calculator-level examples — the base for talking about variation with numbers.',
      'Memahami rata-rata, rentang, standar deviasi, koefisien variasi, histogram, dan distribusi normal melalui contoh hitungan sederhana — dasar untuk membicarakan variasi dengan angka.'
    ),
    objectives: [
      T('母集団とサンプルの違いを説明できる', 'Explain population vs sample', 'Menjelaskan populasi vs sampel'),
      T('平均・中央値・範囲・分散・標準偏差を手計算できる', 'Calculate mean, median, range, variance and standard deviation by hand', 'Menghitung rata-rata, median, rentang, varians, dan standar deviasi secara manual'),
      T('変動係数（CV）で平均の異なるデータのバラツキを比較できる', 'Compare variation of data with different means using CV', 'Membandingkan variasi data dengan rata-rata berbeda menggunakan CV'),
      T('ヒストグラムの形と正規分布の68-95-99.7ルールを読める', 'Read histogram shapes and the 68-95-99.7 rule', 'Membaca bentuk histogram dan aturan 68-95-99,7'),
    ],
    sections: [
      {
        id: 'why',
        title: T('なぜ統計が必要なのか', 'Why statistics?', 'Mengapa statistik?'),
        blocks: [
          { type: 'p', text: T(
            '現場のデータは、同じ作業・同じ設備でも毎回少しずつ違います。1回だけ測って「CTは30秒」と決めると、たまたま速かった回かもしれません。統計は、**ばらつくデータ全体の姿**を少ない数字で正しく表すための道具です。',
            'Shop-floor data differ a little every time, even for the same job on the same machine. Measure once and call it "CT = 30 s" and it may have been a lucky fast cycle. Statistics is the toolkit for describing **the whole picture of varying data** with a few numbers.',
            'Data di lantai produksi sedikit berbeda setiap kali, bahkan untuk pekerjaan dan mesin yang sama. Mengukur sekali lalu menyebut "CT = 30 dtk" bisa jadi hanya siklus yang kebetulan cepat. Statistik adalah alat untuk menggambarkan **gambaran utuh data yang bervariasi** dengan beberapa angka.'
          ) },
          { type: 'cards', cols: 2, items: [
            { icon: '🎯', tone: 'blue', title: T('中心（位置）', 'Centre (location)', 'Pusat (lokasi)'), text: T('データはどのあたりに集まっているか？ → 平均・中央値', 'Where do the data gather? → mean, median', 'Di mana data berkumpul? → rata-rata, median') },
            { icon: '↔️', tone: 'amber', title: T('ちらばり（バラツキ）', 'Spread (variation)', 'Sebaran (variasi)'), text: T('どのくらい広がっているか？ → 範囲・標準偏差・CV', 'How widely do they spread? → range, σ, CV', 'Seberapa lebar sebarannya? → rentang, σ, CV') },
          ] },
          { type: 'h', text: T('母集団とサンプル', 'Population and sample', 'Populasi dan sampel') },
          { type: 'p', text: T(
            '知りたい対象全体（例：この工程で今後作られる全製品）を**母集団**、実際に測った一部（例：今日測った20個）を**サンプル**と呼びます。私たちはサンプルから母集団を推測しています。だからこそ、測り方が偏っていたり、工程が不安定だったりすると、推測が外れます。',
            'The whole group you want to know about (e.g. every part this process will make) is the **population**; the part you actually measure (e.g. 20 parts today) is the **sample**. We infer the population from the sample, so a biased measurement or an unstable process leads to wrong conclusions.',
            'Seluruh kelompok yang ingin diketahui (mis. semua part yang akan dibuat proses ini) disebut **populasi**; bagian yang benar-benar diukur (mis. 20 part hari ini) disebut **sampel**. Kita menduga populasi dari sampel, sehingga pengukuran yang bias atau proses yang tidak stabil menghasilkan kesimpulan yang salah.'
          ) },
        ],
      },
      {
        id: 'center',
        title: T('中心を表す：平均と中央値', 'Centre: mean and median', 'Pusat: rata-rata dan median'),
        blocks: [
          { type: 'formula',
            expr: T('平均 x̄ = Σx ÷ n', 'Mean x̄ = Σx ÷ n', 'Rata-rata x̄ = Σx ÷ n'),
            where: [
              { sym: 'Σx', text: T('データの合計', 'Sum of the data', 'Jumlah data') },
              { sym: 'n', text: T('データの個数', 'Number of data', 'Banyak data') },
            ],
          },
          { type: 'p', text: T(
            '[[mean]]はすべての値を足して個数で割ったものです。[[median]]は小さい順に並べたときの真ん中の値です（個数が偶数なら真ん中2つの平均）。',
            'The [[mean]] is the sum divided by the count. The [[median]] is the middle value when sorted (for an even count, the average of the middle two).',
            '[[mean]] adalah jumlah dibagi banyak data. [[median]] adalah nilai tengah setelah diurutkan (untuk jumlah genap, rata-rata dua nilai tengah).'
          ) },
          { type: 'example',
            title: T('外れ値に強いのはどっち？', 'Which is robust to outliers?', 'Mana yang tahan terhadap pencilan?'),
            steps: [
              T('CT：30, 31, 29, 30, 80秒（最後の1回は部品切れで待った）', 'CT: 30, 31, 29, 30, 80 s (the last cycle waited for missing parts)', 'CT: 30, 31, 29, 30, 80 dtk (siklus terakhir menunggu part habis)'),
              T('平均 = 200 ÷ 5 = 40秒', 'Mean = 200 ÷ 5 = 40 s', 'Rata-rata = 200 ÷ 5 = 40 dtk'),
              T('並べ替え：29, 30, 30, 31, 80 → 中央値 = 30秒', 'Sorted: 29, 30, 30, 31, 80 → median = 30 s', 'Diurutkan: 29, 30, 30, 31, 80 → median = 30 dtk'),
            ],
            result: T('平均は1つの異常値に大きく引っ張られます。ただし、その80秒こそが「異常のサイン」です。消すのではなく、原因を調べる対象です。', 'The mean is pulled strongly by one abnormal value. But that 80 s is a signal of an abnormality — investigate its cause rather than just deleting it.', 'Rata-rata sangat tertarik oleh satu nilai abnormal. Namun 80 dtk itu adalah tanda keabnormalan — selidiki penyebabnya, jangan sekadar dihapus.'),
          },
          { type: 'callout', kind: 'warn', title: T('平均値だけの管理の危険', 'The danger of managing by averages', 'Bahaya mengelola hanya dengan rata-rata'), text: T(
            '平均が同じ30秒でも、「29〜31秒」の工程と「20〜40秒」の工程はまったく別物です。平均は中心しか語りません。バラツキを表す数字を必ずセットで見ます。',
            'A process at 29–31 s and one at 20–40 s can both average 30 s, yet they are completely different. The mean speaks only about the centre — always pair it with a measure of spread.',
            'Proses 29–31 dtk dan proses 20–40 dtk bisa sama-sama rata-rata 30 dtk, tetapi sangat berbeda. Rata-rata hanya bicara tentang pusat — selalu pasangkan dengan ukuran sebaran.'
          ) },
        ],
      },
      {
        id: 'spread',
        title: T('バラツキを表す：範囲・分散・標準偏差', 'Spread: range, variance, standard deviation', 'Sebaran: rentang, varians, standar deviasi'),
        blocks: [
          { type: 'formula', expr: T('範囲 R = 最大値 − 最小値', 'Range R = Max − Min', 'Rentang R = Maks − Min'),
            note: T('[[range]]：簡単だが、両端の2つの値しか使わないため外れ値に弱い。', '[[range]]: simple, but uses only two extreme values, so it is sensitive to outliers.', '[[range]]: sederhana, tetapi hanya memakai dua nilai ekstrem sehingga peka terhadap pencilan.') },
          { type: 'formula',
            expr: T('標準偏差 s = √{ Σ(x − x̄)² ÷ (n − 1) }', 'Standard deviation s = √{ Σ(x − x̄)² ÷ (n − 1) }', 'Standar deviasi s = √{ Σ(x − x̄)² ÷ (n − 1) }'),
            where: [
              { sym: 'x − x̄', text: T('偏差（各値と平均との差）', 'Deviation (difference from the mean)', 'Deviasi (selisih dari rata-rata)') },
              { sym: 's²', text: T('分散（標準偏差の2乗）', 'Variance (square of σ)', 'Varians (kuadrat σ)') },
            ],
            note: T('サンプルから母集団のバラツキを推定するときは n−1 で割ります（母集団全体なら n）。表計算ソフトのSTDEV.S が n−1、STDEV.P が n です。', 'When estimating population spread from a sample, divide by n − 1 (divide by n for a whole population). In spreadsheets, STDEV.S uses n − 1 and STDEV.P uses n.', 'Saat menduga sebaran populasi dari sampel, bagi dengan n − 1 (bagi n untuk seluruh populasi). Di spreadsheet, STDEV.S memakai n − 1 dan STDEV.P memakai n.'),
          },
          { type: 'p', text: T(
            '[[variance]]は「平均からのズレの2乗の平均」、[[standard-deviation]]はその平方根です。2乗するのは、プラスとマイナスのズレが打ち消し合わないようにするため。平方根で元の単位（秒・mm）に戻します。',
            '[[variance]] is the average of squared deviations; the [[standard-deviation]] is its square root. We square so that positive and negative deviations do not cancel out, then take the root to return to the original unit (seconds, mm).',
            '[[variance]] adalah rata-rata kuadrat deviasi; [[standard-deviation]] adalah akarnya. Dikuadratkan agar deviasi positif dan negatif tidak saling meniadakan, lalu diakarkan untuk kembali ke satuan asli (detik, mm).'
          ) },
          { type: 'example',
            title: T('手計算してみよう：10, 12, 11, 9, 13', 'Calculate by hand: 10, 12, 11, 9, 13', 'Hitung manual: 10, 12, 11, 9, 13'),
            steps: [
              T('平均 = 55 ÷ 5 = 11、範囲 = 13 − 9 = 4', 'Mean = 55 ÷ 5 = 11; range = 13 − 9 = 4', 'Rata-rata = 55 ÷ 5 = 11; rentang = 13 − 9 = 4'),
              T('偏差：−1, +1, 0, −2, +2（合計は必ず0）', 'Deviations: −1, +1, 0, −2, +2 (they always sum to 0)', 'Deviasi: −1, +1, 0, −2, +2 (jumlahnya selalu 0)'),
              T('偏差の2乗：1, 1, 0, 4, 4 → 合計 10', 'Squared: 1, 1, 0, 4, 4 → sum 10', 'Kuadrat: 1, 1, 0, 4, 4 → jumlah 10'),
              T('分散 s² = 10 ÷ (5 − 1) = 2.5', 'Variance s² = 10 ÷ (5 − 1) = 2.5', 'Varians s² = 10 ÷ (5 − 1) = 2,5'),
              T('標準偏差 s = √2.5 ≒ 1.58', 'Standard deviation s = √2.5 ≈ 1.58', 'Standar deviasi s = √2,5 ≈ 1,58'),
            ],
            result: T('「平均11、標準偏差約1.6」と2つの数字で、データの中心と広がりが伝わります。', '"Mean 11, standard deviation about 1.6" — two numbers convey both centre and spread.', '"Rata-rata 11, standar deviasi sekitar 1,6" — dua angka menyampaikan pusat dan sebaran.'),
          },
          { type: 'widget', name: 'stats-lab', props: { data: [30, 31, 29, 30, 30, 32, 28, 31, 30, 29] } },
        ],
      },
      {
        id: 'cv',
        title: T('変動係数（CV）：平均が違っても比べられる', 'Coefficient of variation (CV): comparing different means', 'Koefisien variasi (CV): membandingkan rata-rata berbeda'),
        blocks: [
          { type: 'formula',
            expr: T('変動係数 CV = σ ÷ μ（標準偏差 ÷ 平均）', 'CV = σ ÷ μ (standard deviation ÷ mean)', 'CV = σ ÷ μ (standar deviasi ÷ rata-rata)'),
            note: T('[[coefficient-of-variation]]：単位のない「相対的なバラツキ」。%で表すこともある。', '[[coefficient-of-variation]]: a unit-free "relative spread", sometimes shown as %.', '[[coefficient-of-variation]]: "sebaran relatif" tanpa satuan, kadang ditampilkan dalam %.'),
          },
          { type: 'p', text: T(
            '標準偏差2秒は、平均10秒の作業では大きなバラツキですが、平均100秒の作業ではごく小さなバラツキです。CVなら 2÷10 = 0.20 と 2÷100 = 0.02 となり、公平に比べられます。',
            'A standard deviation of 2 s is large for a 10 s job but tiny for a 100 s job. CV gives 2 ÷ 10 = 0.20 versus 2 ÷ 100 = 0.02, so they can be compared fairly.',
            'Standar deviasi 2 dtk besar untuk pekerjaan 10 dtk tetapi sangat kecil untuk pekerjaan 100 dtk. CV memberi 2 ÷ 10 = 0,20 versus 2 ÷ 100 = 0,02, sehingga bisa dibandingkan secara adil.'
          ) },
          { type: 'example',
            title: T('作業者AとBの比較（平均はどちらも30秒）', 'Operators A and B (both average 30 s)', 'Operator A dan B (keduanya rata-rata 30 dtk)'),
            steps: [
              T('A：30, 31, 29, 30, 30秒 → 偏差²の合計 2 → s = √(2÷4) ≒ 0.71 → CV ≒ 0.024', 'A: 30, 31, 29, 30, 30 s → sum of squared deviations 2 → s = √(2 ÷ 4) ≈ 0.71 → CV ≈ 0.024', 'A: 30, 31, 29, 30, 30 dtk → jumlah kuadrat deviasi 2 → s = √(2 ÷ 4) ≈ 0,71 → CV ≈ 0,024'),
              T('B：25, 36, 28, 34, 27秒 → 偏差²の合計 90 → s = √(90÷4) ≒ 4.74 → CV ≒ 0.158', 'B: 25, 36, 28, 34, 27 s → sum of squared deviations 90 → s = √(90 ÷ 4) ≈ 4.74 → CV ≈ 0.158', 'B: 25, 36, 28, 34, 27 dtk → jumlah kuadrat deviasi 90 → s = √(90 ÷ 4) ≈ 4,74 → CV ≈ 0,158'),
            ],
            result: T('平均が同じでも、Bのバラツキは Aの約6.7倍。Bの作業方法に標準化されていない部分があると考えられます。', 'Same average, but B varies about 6.7 times more than A — B’s method likely has unstandardised parts.', 'Rata-rata sama, tetapi variasi B sekitar 6,7 kali A — metode B kemungkinan memiliki bagian yang belum distandarkan.'),
          },
          { type: 'callout', kind: 'zeva', title: T('ZEVAとのつながり：CV = V.Score', 'ZEVA connection: CV = V.Score', 'Kaitan ZEVA: CV = V.Score'), text: T(
            'ZEVAの人作業（GPC-H）の中心指標「V.Score」は、作業時間の変動係数（σ/μ）そのものです。ZEVAの目安は 0.1未満 極めて安定、0.1〜0.3 安定、0.3〜0.5 やや不安定、0.5〜1.0 不安定、1.0以上 非常に不安定。上の例なら Aは極めて安定、Bは安定の範囲ですが、Aとの差は明らかです。',
            'V.Score, the core metric for human work (GPC-H) in ZEVA, is exactly the coefficient of variation of work time (σ/μ). ZEVA guide: < 0.1 extremely stable, 0.1–0.3 stable, 0.3–0.5 slightly unstable, 0.5–1.0 unstable, ≥ 1.0 very unstable. Above, A is extremely stable and B is in the stable band, but the gap to A is obvious.',
            'V.Score, metrik inti kerja manusia (GPC-H) di ZEVA, adalah koefisien variasi waktu kerja (σ/μ). Panduan ZEVA: < 0,1 sangat stabil, 0,1–0,3 stabil, 0,3–0,5 agak tidak stabil, 0,5–1,0 tidak stabil, ≥ 1,0 sangat tidak stabil. Di atas, A sangat stabil dan B di rentang stabil, tetapi selisih dengan A jelas.'
          ) },
          { type: 'check',
            q: T('平均60秒・標準偏差9秒の工程のCVは？', 'A process has mean 60 s and σ 9 s. CV?', 'Proses dengan rata-rata 60 dtk dan σ 9 dtk. CV?'),
            choices: [T('0.15', '0.15', '0,15'), T('6.7', '6.7', '6,7'), T('0.54', '0.54', '0,54')],
            answer: 0,
            explain: T('9 ÷ 60 = 0.15。ZEVAの基準では「安定（0.1〜0.3）」です。', '9 ÷ 60 = 0.15 — "stable" (0.1–0.3) on the ZEVA scale.', '9 ÷ 60 = 0,15 — "stabil" (0,1–0,3) pada skala ZEVA.'),
          },
        ],
      },
      {
        id: 'histogram',
        title: T('ヒストグラムで形を見る', 'Seeing the shape with histograms', 'Melihat bentuk dengan histogram'),
        blocks: [
          { type: 'p', text: T(
            '[[histogram]]は、データを区間に分け、各区間に入る個数を棒で表したグラフです。平均や標準偏差だけでは見えない「分布の形」がわかります。データは最低30〜50個、区間数は √n 程度が目安です。',
            'A [[histogram]] groups data into intervals and draws the count in each as a bar. It shows the shape of the distribution that mean and σ alone cannot. Use at least 30–50 data points and about √n intervals.',
            '[[histogram]] mengelompokkan data ke dalam interval dan menggambar jumlah tiap interval sebagai batang. Terlihat bentuk distribusi yang tidak terlihat dari rata-rata dan σ saja. Gunakan minimal 30–50 data dan sekitar √n interval.'
          ) },
          { type: 'table',
            head: [T('形', 'Shape', 'Bentuk'), T('読み取れること', 'What it suggests', 'Yang ditunjukkan')],
            rows: [
              [T('一般形（釣鐘形）', 'Bell-shaped', 'Bentuk lonceng'), T('偶然のバラツキだけ。安定している可能性が高い', 'Only chance variation; likely stable', 'Hanya variasi kebetulan; kemungkinan stabil')],
              [T('二山形', 'Two peaks', 'Dua puncak'), T('異なる条件（作業者2人・設備2台・材料2ロット）が混ざっている', 'Two different conditions mixed (2 operators, 2 machines, 2 lots)', 'Dua kondisi berbeda tercampur (2 operator, 2 mesin, 2 lot)')],
              [T('歪んだ形（片側に裾が長い）', 'Skewed (long tail on one side)', 'Miring (ekor panjang di satu sisi)'), T('作業時間など下限がある量で起こりやすい。長い側に時々の遅れ要因', 'Common for quantities with a lower limit, like work time; occasional delays on the long side', 'Umum untuk besaran dengan batas bawah seperti waktu kerja; keterlambatan sesekali di sisi panjang')],
              [T('絶壁形', 'Cliff (cut off)', 'Tebing (terpotong)'), T('規格外を選別して取り除いた後のデータ', 'Out-of-spec items have been sorted out', 'Barang di luar spesifikasi telah disortir')],
              [T('離れ小島', 'Isolated island', 'Pulau terpisah'), T('一時的な異常（測定ミス・異材混入など）', 'A temporary abnormality (measurement error, wrong material)', 'Keabnormalan sementara (salah ukur, material salah)')],
            ],
          },
          { type: 'widget', name: 'sort-game', props: {
            title: T('ヒストグラムの形から原因を推測しよう', 'Guess the cause from the histogram shape', 'Tebak penyebab dari bentuk histogram'),
            bins: [
              { id: 'bell', label: T('釣鐘形', 'Bell', 'Lonceng'), tone: 'green' },
              { id: 'two', label: T('二山形', 'Two peaks', 'Dua puncak'), tone: 'amber' },
              { id: 'island', label: T('離れ小島', 'Island', 'Pulau'), tone: 'red' },
            ],
            items: [
              { bin: 'two', text: T('熟練者と新人のCTを1つのグラフにした', 'CTs of a veteran and a newcomer plotted together', 'CT operator senior dan pemula digabung dalam satu grafik'), explain: T('2つの異なる分布が重なり、山が2つになります。', 'Two different distributions overlap, giving two peaks.', 'Dua distribusi berbeda bertumpuk, menghasilkan dua puncak.') },
              { bin: 'island', text: T('ある日だけ別ロットの材料が混入した', 'A different material lot got mixed in on one day', 'Lot material berbeda tercampur pada satu hari'), explain: T('一時的な異常は、本体から離れた小さな山になります。', 'A temporary abnormality forms a small separate bump.', 'Keabnormalan sementara membentuk tonjolan kecil terpisah.') },
              { bin: 'bell', text: T('標準作業が定着した工程の寸法データ', 'Dimensions from a process with established standard work', 'Data dimensi dari proses dengan kerja standar yang mapan'), explain: T('偶然原因だけなら左右対称の釣鐘形になりやすい。', 'With only common causes, a symmetric bell is typical.', 'Dengan hanya penyebab umum, bentuk lonceng simetris adalah tipikal.') },
              { bin: 'two', text: T('2台の設備の製品を混ぜて測った', 'Parts from two machines measured together', 'Part dari dua mesin diukur bersama'), explain: T('設備ごとに中心がずれていると二山になります。', 'If each machine has a different centre, two peaks appear.', 'Jika tiap mesin memiliki pusat berbeda, muncul dua puncak.') },
              { bin: 'island', text: T('測定器を1回だけ落として、その後の数個が大きな値になった', 'The gauge was dropped once and a few readings jumped high', 'Alat ukur jatuh sekali dan beberapa bacaan melonjak'), explain: T('測定の異常も離れ小島の原因です。', 'Measurement problems also create islands.', 'Masalah pengukuran juga menciptakan pulau.') },
            ],
          } },
        ],
      },
      {
        id: 'normal',
        title: T('正規分布と68-95-99.7ルール', 'Normal distribution and the 68-95-99.7 rule', 'Distribusi normal dan aturan 68-95-99,7'),
        blocks: [
          { type: 'p', text: T(
            '多数の小さな偶然の要因が重なってできるバラツキは、左右対称の釣鐘形＝[[normal-distribution]]に近づきます。正規分布は、平均μと標準偏差σの2つだけで形が決まります。',
            'Variation produced by many small chance causes tends toward a symmetric bell — the [[normal-distribution]]. Its shape is fully determined by just two numbers: mean μ and standard deviation σ.',
            'Variasi yang dihasilkan banyak penyebab kebetulan kecil cenderung membentuk lonceng simetris — [[normal-distribution]]. Bentuknya ditentukan sepenuhnya oleh dua angka: rata-rata μ dan standar deviasi σ.'
          ) },
          { type: 'diagram', name: 'normal-curve', caption: T('μ±1σに約68%、±2σに約95%、±3σに約99.7%', 'About 68% within μ±1σ, 95% within ±2σ, 99.7% within ±3σ', 'Sekitar 68% dalam μ±1σ, 95% dalam ±2σ, 99,7% dalam ±3σ') },
          { type: 'table',
            head: [T('範囲', 'Range', 'Rentang'), T('入る割合', 'Share inside', 'Porsi di dalam'), T('外に出る割合', 'Share outside', 'Porsi di luar')],
            rows: [
              ['μ ± 1σ', '68.27%', T('約3個に1個', 'about 1 in 3', 'sekitar 1 dari 3')],
              ['μ ± 2σ', '95.45%', T('約22個に1個', 'about 1 in 22', 'sekitar 1 dari 22')],
              ['μ ± 3σ', '99.73%', T('約370個に1個', 'about 1 in 370', 'sekitar 1 dari 370')],
            ],
          },
          { type: 'example',
            title: T('使ってみよう', 'Try it', 'Coba'),
            steps: [
              T('ある部品の長さ：μ = 50.0 mm、σ = 0.1 mm（正規分布とする）', 'Part length: μ = 50.0 mm, σ = 0.1 mm (assume normal)', 'Panjang part: μ = 50,0 mm, σ = 0,1 mm (anggap normal)'),
              T('±3σ = 49.7〜50.3 mm に約99.7%が入る', '±3σ = 49.7–50.3 mm contains about 99.7%', '±3σ = 49,7–50,3 mm memuat sekitar 99,7%'),
              T('規格が 49.7〜50.3 mm なら、約0.27%（1000個に約3個）が規格外になる', 'If the spec is 49.7–50.3 mm, about 0.27% (≈3 per 1,000) fall outside', 'Jika spesifikasi 49,7–50,3 mm, sekitar 0,27% (≈3 per 1.000) di luar'),
            ],
            result: T('バラツキ（σ）を半分の0.05 mmにできれば、同じ規格に±6σの余裕が生まれ、規格外はほぼゼロになります。', 'Halve σ to 0.05 mm and the same spec gives ±6σ of margin — defects become practically zero.', 'Jika σ dijadikan setengah menjadi 0,05 mm, spesifikasi yang sama memberi margin ±6σ — cacat praktis nol.'),
          },
          { type: 'widget', name: 'normal-explorer', props: {} },
          { type: 'callout', kind: 'zeva', title: T('ZEVAとのつながり', 'ZEVA connection', 'Kaitan dengan ZEVA'), text: T(
            '平均を規格の中心に合わせるだけでは不良は減りきりません。σを小さくすることが根本対策です。ZEVAが「平均値管理」から「バラツキ管理」へ評価の軸を移すのはこのためです。なお、分布の形やσが意味を持つのは工程が安定しているときだけです（ie-09）。',
            'Centring the mean on the spec alone cannot eliminate defects; shrinking σ is the fundamental fix. That is why ZEVA shifts evaluation from managing averages to managing variation. Note that distribution shape and σ are meaningful only when the process is stable (ie-09).',
            'Hanya memusatkan rata-rata pada spesifikasi tidak dapat menghilangkan cacat; memperkecil σ adalah perbaikan mendasar. Karena itu ZEVA menggeser penilaian dari mengelola rata-rata ke mengelola variasi. Catatan: bentuk distribusi dan σ hanya bermakna saat proses stabil (ie-09).'
          ) },
        ],
      },
    ],
    keyPoints: [
      T('データは「中心」と「バラツキ」の2つをセットで表す', 'Describe data with both centre and spread', 'Gambarkan data dengan pusat dan sebaran sekaligus'),
      T('標準偏差は平均からのズレの大きさ。サンプルでは n−1 で割る', 'σ measures typical distance from the mean; divide by n − 1 for samples', 'σ mengukur jarak tipikal dari rata-rata; bagi n − 1 untuk sampel'),
      T('CV = σ ÷ μ で平均の違うデータも比較できる。ZEVAのV.Scoreと同じ', 'CV = σ ÷ μ compares data with different means — same as ZEVA V.Score', 'CV = σ ÷ μ membandingkan data dengan rata-rata berbeda — sama dengan V.Score ZEVA'),
      T('ヒストグラムの形は原因のヒント（二山＝混在、離れ小島＝一時異常）', 'Histogram shape hints at causes (two peaks = mixture, island = temporary abnormality)', 'Bentuk histogram memberi petunjuk penyebab (dua puncak = campuran, pulau = keabnormalan sementara)'),
      T('正規分布では ±1σ/±2σ/±3σ に 68/95/99.7% が入る', 'Normal distribution: 68/95/99.7% within ±1σ/±2σ/±3σ', 'Distribusi normal: 68/95/99,7% dalam ±1σ/±2σ/±3σ'),
    ],
    quiz: [
      { q: T('データ 4, 6, 8 の平均と範囲は？', 'Data 4, 6, 8: mean and range?', 'Data 4, 6, 8: rata-rata dan rentang?'),
        choices: [T('平均6、範囲4', 'Mean 6, range 4', 'Rata-rata 6, rentang 4'), T('平均6、範囲2', 'Mean 6, range 2', 'Rata-rata 6, rentang 2'), T('平均18、範囲4', 'Mean 18, range 4', 'Rata-rata 18, rentang 4'), T('平均4、範囲8', 'Mean 4, range 8', 'Rata-rata 4, rentang 8')],
        answer: 0, explain: T('平均 = 18 ÷ 3 = 6、範囲 = 8 − 4 = 4。', 'Mean = 18 ÷ 3 = 6; range = 8 − 4 = 4.', 'Rata-rata = 18 ÷ 3 = 6; rentang = 8 − 4 = 4.') },
      { q: T('データ 4, 6, 8 のサンプル標準偏差（n−1）は？', 'Sample standard deviation (n − 1) of 4, 6, 8?', 'Standar deviasi sampel (n − 1) dari 4, 6, 8?'),
        choices: [T('2', '2', '2'), T('1.63', '1.63', '1,63'), T('4', '4', '4'), T('8', '8', '8')],
        answer: 0, explain: T('偏差 −2, 0, +2 → 2乗の合計 8 → 8 ÷ 2 = 4 → √4 = 2。（n で割ると1.63）', 'Deviations −2, 0, +2 → squares sum 8 → 8 ÷ 2 = 4 → √4 = 2. (Dividing by n gives 1.63.)', 'Deviasi −2, 0, +2 → jumlah kuadrat 8 → 8 ÷ 2 = 4 → √4 = 2. (Dibagi n menghasilkan 1,63.)') },
      { q: T('外れ値の影響を受けにくい中心の指標は？', 'Which centre measure is least affected by outliers?', 'Ukuran pusat mana yang paling tidak terpengaruh pencilan?'),
        choices: [T('平均', 'Mean', 'Rata-rata'), T('中央値', 'Median', 'Median'), T('範囲', 'Range', 'Rentang'), T('分散', 'Variance', 'Varians')],
        answer: 1, explain: T('中央値は並べた真ん中の値なので、端の極端な値の影響をほとんど受けません。', 'The median is the middle value, so extreme values at the ends barely affect it.', 'Median adalah nilai tengah, sehingga nilai ekstrem di ujung hampir tidak memengaruhinya.') },
      { q: T('工程X：平均20秒・σ3秒、工程Y：平均100秒・σ5秒。相対的にバラツキが大きいのは？', 'Process X: mean 20 s, σ 3 s. Process Y: mean 100 s, σ 5 s. Which varies more relatively?', 'Proses X: rata-rata 20 dtk, σ 3 dtk. Proses Y: rata-rata 100 dtk, σ 5 dtk. Mana yang variasinya relatif lebih besar?'),
        choices: [T('工程X（CV 0.15）', 'Process X (CV 0.15)', 'Proses X (CV 0,15)'), T('工程Y（CV 0.05）', 'Process Y (CV 0.05)', 'Proses Y (CV 0,05)'), T('同じ', 'Equal', 'Sama'), T('比較できない', 'Cannot compare', 'Tidak bisa dibandingkan')],
        answer: 0, explain: T('X：3÷20 = 0.15、Y：5÷100 = 0.05。σはYが大きいが、相対的にはXのほうが3倍ばらついています。', 'X: 3 ÷ 20 = 0.15; Y: 5 ÷ 100 = 0.05. Y has larger σ, but X varies three times more relatively.', 'X: 3 ÷ 20 = 0,15; Y: 5 ÷ 100 = 0,05. σ Y lebih besar, tetapi X bervariasi tiga kali lebih besar secara relatif.') },
      { q: T('二山形のヒストグラムが示す可能性が高いのは？', 'A two-peaked histogram most likely indicates…', 'Histogram dua puncak kemungkinan besar menunjukkan…'),
        choices: [T('工程が理想的に安定している', 'An ideally stable process', 'Proses yang stabil ideal'), T('異なる条件のデータが混ざっている', 'Data from different conditions are mixed', 'Data dari kondisi berbeda tercampur'), T('規格外品が選別された', 'Out-of-spec items were sorted out', 'Barang di luar spesifikasi disortir'), T('データ数が多すぎる', 'Too much data', 'Data terlalu banyak')],
        answer: 1, explain: T('作業者・設備・ロットなど、中心の異なる2つの集団が混在していると二山になります。層別して確認します。', 'Two groups with different centres (operators, machines, lots) produce two peaks. Stratify the data to check.', 'Dua kelompok dengan pusat berbeda (operator, mesin, lot) menghasilkan dua puncak. Stratifikasi data untuk memeriksa.') },
      { q: T('正規分布で μ±2σ の範囲に入るデータの割合は約何%？', 'In a normal distribution, about what share lies within μ ± 2σ?', 'Pada distribusi normal, berapa porsi data dalam μ ± 2σ?'),
        choices: [T('68%', '68%', '68%'), T('95%', '95%', '95%'), T('99.7%', '99.7%', '99,7%'), T('50%', '50%', '50%')],
        answer: 1, explain: T('±1σ 約68%、±2σ 約95%、±3σ 約99.7%。', '±1σ ≈ 68%, ±2σ ≈ 95%, ±3σ ≈ 99.7%.', '±1σ ≈ 68%, ±2σ ≈ 95%, ±3σ ≈ 99,7%.') },
      { q: T('ZEVAのV.Scoreは統計のどの指標と同じですか？', 'ZEVA V.Score is the same as which statistic?', 'V.Score ZEVA sama dengan statistik apa?'),
        choices: [T('範囲', 'Range', 'Rentang'), T('分散', 'Variance', 'Varians'), T('変動係数（σ/μ）', 'Coefficient of variation (σ/μ)', 'Koefisien variasi (σ/μ)'), T('中央値', 'Median', 'Median')],
        answer: 2, explain: T('V.Scoreは作業時間の変動係数 σ/μ です。0.1未満が極めて安定。', 'V.Score is the coefficient of variation of work time, σ/μ. Below 0.1 is extremely stable.', 'V.Score adalah koefisien variasi waktu kerja, σ/μ. Di bawah 0,1 sangat stabil.') },
    ],
  });
})();
