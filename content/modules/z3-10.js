(function () {
  const T = (ja, en, id) => ({ ja, en, id });

  ZA.addModule({
    id: 'z3-10',
    track: 'z3',
    order: 10,
    minutes: 50,
    icon: '🎨',
    level: 3,
    prereq: ['z3-02', 'z3-09'],
    title: T('事例：塗装工程（Deep GPC）', 'Case: the paint line (Deep GPC)', 'Kasus: lini pengecatan (Deep GPC)'),
    summary: T(
      '3年続いたブツ不良4.2%を、[[deep-gpc|Deep GPC]]（[[dmaic|DMAIC]]）で0.5%にした事例です。[[quick-gpc|Quick GPC]]が3回失敗したのは、原因が1つではなく2つの掛け合わせだったからでした。数値は説明用の仮想工程です。',
      'Three years of 4.2% dirt-inclusion defects brought to 0.5% with [[deep-gpc|Deep GPC]] ([[dmaic|DMAIC]]). [[quick-gpc|Quick GPC]] had failed three times because the cause was not one factor but two acting together. The numbers describe an illustrative process.',
      'Cacat kotoran 4,2% yang bertahan tiga tahun diturunkan menjadi 0,5% dengan [[deep-gpc|Deep GPC]] ([[dmaic|DMAIC]]). [[quick-gpc|Quick GPC]] gagal tiga kali karena penyebabnya bukan satu faktor melainkan dua yang bekerja bersama. Angka-angkanya berasal dari proses fiktif untuk ilustrasi.'
    ),
    objectives: [
      T('Quick GPC から Deep GPC へ移す判断ができる', 'Decide when to escalate from Quick GPC to Deep GPC', 'Memutuskan kapan naik dari Quick GPC ke Deep GPC'),
      T('測定そのものを疑い、[[msa|MSA]]から始められる', 'Question the measurement itself and start with [[msa|MSA]]', 'Mempertanyakan pengukuran itu sendiri dan memulai dari [[msa|MSA]]'),
      T('交互作用を層別で見つけ、単変量では届かない理由を説明できる', 'Find an interaction by stratifying, and explain why one factor at a time cannot reach it', 'Menemukan interaksi lewat stratifikasi, dan menjelaskan mengapa satu faktor saja tidak cukup'),
      T('Control で条件を[[gpc-band|GPCバンド]]に落とし、[[pdca-s|PDCA-S]]へ渡せる', 'Turn the condition into a [[gpc-band|GPC band]] in Control and hand it to [[pdca-s|PDCA-S]]', 'Mengubah kondisi menjadi [[gpc-band|GPC band]] di Control dan menyerahkannya ke [[pdca-s|PDCA-S]]')
    ],
    sections: [
      {
        id: 'situation',
        title: T('3回試して、3回とも効かなかった', 'Three tries, three failures', 'Tiga percobaan, tiga kegagalan'),
        blocks: [
          { type: 'p', text: T(
            '**P-2塗装ライン**は樹脂カバーに塗装します。日産600台。塗装面に異物が付く「ブツ不良」が**3年間4.2%前後**で動きません。不良品は研磨して再塗装するため、1台あたり25分かかります。',
            '**Paint line P-2** coats a resin cover, 600 units a day. Dirt inclusions — specks in the paint film — have sat at **around 4.2% for three years**. A rejected part is sanded and resprayed, which costs 25 minutes each.',
            '**Lini pengecatan P-2** melapisi penutup resin, 600 unit per hari. Cacat kotoran — bintik pada lapisan cat — bertahan di **sekitar 4,2% selama tiga tahun**. Part yang ditolak diamplas dan dicat ulang, memakan waktu 25 menit per unit.'
          ) },
          { type: 'table',
            head: [T('回', 'Try', 'Percobaan'), T('仮説（X）', 'Hypothesis (X)', 'Hipotesis (X)'), T('やったこと', 'What was done', 'Yang dilakukan'), T('結果', 'Result', 'Hasil')],
            rows: [
              [T('1回目', '1st', 'Ke-1'), T('ブースの清掃が足りない', 'The booth is not clean enough', 'Booth kurang bersih'), T('始業前の清掃を30分追加', 'Added 30 minutes of cleaning before the shift', 'Menambah 30 menit pembersihan sebelum shift'), T('4.2% → 4.0%。変わらない', '4.2% → 4.0%. No change', '4,2% → 4,0%. Tidak berubah')],
              [T('2回目', '2nd', 'Ke-2'), T('フィルタが古い', 'The filter is old', 'Filter sudah tua'), T('交換周期を30日→20日に', 'Changed the interval from 30 to 20 days', 'Mengubah interval dari 30 ke 20 hari'), T('4.2% → 3.6%。戻る', '4.2% → 3.6%. It came back', '4,2% → 3,6%. Kembali lagi')],
              [T('3回目', '3rd', 'Ke-3'), T('作業者の腕の差', 'Operator skill', 'Keterampilan operator'), T('ベテランを固定配置', 'Assigned the experienced operator permanently', 'Menugaskan operator berpengalaman secara tetap'), T('4.2% → 4.1%。変わらない', '4.2% → 4.1%. No change', '4,2% → 4,1%. Tidak berubah')]
            ],
            caption: T('H-T-C-Aを3回まわして届かなかった。これが[[escalation|エスカレーション]]の条件', 'Three H-T-C-A cycles fell short. That is the [[escalation|escalation]] criterion', 'Tiga siklus H-T-C-A tidak cukup. Itulah kriteria [[escalation|eskalasi]]')
          },
          { type: 'callout', kind: 'zeva', title: T('3回失敗したら、失敗の仕方を疑う', 'After three failures, question the shape of the failure', 'Setelah tiga kegagalan, pertanyakan bentuk kegagalannya'), text: T(
            '3回とも「**Xを1つ選んで、それだけ変える**」やり方でした。[[quick-gpc|Quick GPC]]は原因の見当がついていて、変数が1つのときに速い手です。**見当が外れ続けるのは、原因が1つではない合図**かもしれません。ここで[[deep-gpc|Deep GPC]]（[[dmaic|DMAIC]]）へ移します。',
            'All three followed the same shape: **pick one X and change only that**. [[quick-gpc|Quick GPC]] is the fast route when you have a hypothesis and one variable. **Guesses that keep missing may be telling you the cause is not one thing.** That is the moment to move to [[deep-gpc|Deep GPC]] ([[dmaic|DMAIC]]).',
            'Ketiganya mengikuti bentuk yang sama: **pilih satu X dan ubah itu saja**. [[quick-gpc|Quick GPC]] adalah jalur cepat bila Anda punya hipotesis dan satu variabel. **Tebakan yang terus meleset mungkin pertanda bahwa penyebabnya bukan satu hal.** Itulah saatnya pindah ke [[deep-gpc|Deep GPC]] ([[dmaic|DMAIC]]).'
          ) }
        ]
      },
      {
        id: 'define',
        title: T('Define：何を、どこまで', 'Define: what, and how far', 'Define: apa, dan sejauh mana'),
        blocks: [
          { type: 'table',
            head: [T('項目', 'Item', 'Butir'), T('内容', 'Content', 'Isi')],
            rows: [
              [T('Y（結果）', 'Y (result)', 'Y (hasil)'), T('ブツ不良率。塗装後の外観検査で異物が見つかった台数 ÷ 塗装した台数', 'Dirt-inclusion rate: units with a speck found at the post-paint visual inspection ÷ units painted', 'Tingkat cacat kotoran: unit dengan bintik pada inspeksi visual setelah pengecatan ÷ unit yang dicat')],
              [T('現状 → 目標', 'Now → target', 'Sekarang → target'), T('4.2% → 0.5%', '4.2% → 0.5%', '4,2% → 0,5%')],
              [T('X候補', 'Candidate Xs', 'Kandidat X'), T('ブース内の湿度・温度・風速／フィルタ交換からの経過日数／塗料の粘度／前処理の除電／作業者／材料ロット', 'Booth humidity, temperature, air speed / days since the filter change / paint viscosity / static removal in pretreatment / operator / material lot', 'Kelembapan, suhu, dan kecepatan udara di dalam booth / hari sejak ganti filter / viskositas cat / penghilangan muatan statis di pratindakan / operator / lot material')],
              [T('範囲', 'Scope', 'Lingkup'), T('P-2ライン1本。塗料の配合そのものは変えない（変えると別の検証が要る）', 'Line P-2 only. The paint formulation is not touched — changing it would need its own verification', 'Hanya lini P-2. Formulasi cat tidak disentuh — mengubahnya butuh verifikasi tersendiri')],
              [T('効果の見積り', 'Expected gain', 'Perkiraan hasil'), T('再塗装 625分/日 → 75分/日', 'Respray 625 min/day → 75 min/day', 'Cat ulang 625 mnt/hari → 75 mnt/hari')]
            ]
          },
          { type: 'callout', kind: 'tip', title: T('X候補は広く出す。絞るのは Analyze', 'List the Xs widely; narrowing is the job of Analyze', 'Daftarkan X secara luas; menyempitkan adalah tugas Analyze'), text: T(
            'ここで候補を絞ると、[[quick-gpc|Quick GPC]]の3回と同じことになります。**Define では「関係ありそうなもの」を全部挙げ、データで落とします。** 落とす根拠は勘ではなく Analyze の数字です。',
            'Narrowing here repeats what the three Quick GPC cycles did. **In Define you list everything that might matter and let the data drop them.** What drops them is the arithmetic in Analyze, not a hunch.',
            'Menyempitkan di sini mengulang apa yang dilakukan tiga siklus Quick GPC. **Di Define Anda mendaftarkan semua yang mungkin berpengaruh dan membiarkan data menggugurkannya.** Yang menggugurkan adalah hitungan di Analyze, bukan firasat.'
          ) }
        ]
      },
      {
        id: 'measure',
        title: T('Measure：まず、測り方を疑う', 'Measure: question the measurement first', 'Measure: pertanyakan dulu cara mengukurnya'),
        blocks: [
          { type: 'p', text: T(
            'データを集める前に[[msa|MSA]]をやりました。同じ10台を3人が2回ずつ判定したところ、**判定が割れたのは60回中14回**。判定の一致率は 46 ÷ 60 ＝ **77%**。合否の判定なので、計量値の[[gage-rr|Gage R&R]]（%GRR）ではなく一致率で見ます（Deep GPC の手順）。',
            'Before collecting anything, an [[msa|MSA]] was run. Three inspectors judged the same ten parts twice each; **14 of the 60 judgments disagreed**. Agreement was 46 ÷ 60 = **77%**. This is a pass/fail judgement, so it is read as an agreement rate rather than a [[gage-rr|Gage R&R]] (%GRR), which is for variable data (see the Deep GPC procedure).',
            'Sebelum mengumpulkan apa pun, [[msa|MSA]] dijalankan. Tiga inspektur menilai sepuluh part yang sama masing-masing dua kali; **14 dari 60 penilaian berbeda**. [[gage-rr|%GRR]] keluar di **38%**. Sistem pengukuran di atas 30% tidak dapat dipakai (lihat prosedur Deep GPC).'
          ) },
          { type: 'callout', kind: 'warn', title: T('一致率77%の判定で集めた4週間は、4週間のムダ', 'Four weeks collected on judgements that agree 77% of the time is four weeks wasted', 'Empat minggu dengan penilaian yang hanya sepakat 77% adalah empat minggu terbuang'), text: T(
            '判定が人によって割れる状態では、不良率が動いても**工程が動いたのか判定が動いたのか**が分かりません。[[data-reliability|データの信頼性]]が無い上に積んだ分析は、全部やり直しになります。',
            'While inspectors disagree, a moving defect rate cannot tell you whether **the process moved or the judgment moved**. Analysis stacked on unreliable [[data-reliability|data]] has to be redone from the start.',
            'Selama inspektur berbeda pendapat, tingkat cacat yang bergerak tidak memberi tahu kita apakah **prosesnya yang bergerak atau penilaiannya**. Analisis di atas [[data-reliability|data]] yang tidak andal harus diulang dari awal.'
          ) },
          { type: 'table',
            head: [T('直したこと', 'What was fixed', 'Yang diperbaiki'), T('前', 'Before', 'Sebelum'), T('後', 'After', 'Sesudah')],
            rows: [
              [T('判定の基準', 'The judgment standard', 'Standar penilaian'), T('「目立つもの」（言葉だけ）', '"Anything noticeable" — words only', '"Yang mencolok" — hanya kata'), T('限度見本の写真3枚（可／限度／不可）', 'Three boundary photographs: OK / limit / NG', 'Tiga foto batas: OK / batas / NG')],
              [T('見る条件', 'Viewing conditions', 'Kondisi melihat'), T('作業台の蛍光灯', 'The fluorescent light over the workbench', 'Lampu neon di atas meja kerja'), T('照度と角度を決めた検査台', 'An inspection bench with fixed illuminance and viewing angle', 'Meja inspeksi dengan tingkat pencahayaan dan sudut pandang tetap')],
              [T('数え方', 'What is counted', 'Yang dihitung'), T('台数だけ', 'The number of units only', 'Hanya jumlah unit'), T('台数と、異物の位置・大きさ', 'The number of units, plus where the speck sits and how big it is', 'Jumlah unit, ditambah letak dan ukuran bintiknya')],
              [T('判定の一致率', 'Agreement rate', 'Tingkat kesepakatan'), T('77%（判定が割れる）', '77% (inspectors disagree)', '77% (inspektur berbeda pendapat)'), T('97%（そろった）', '97% (they agree)', '97% (mereka sepakat)')]
            ]
          },
          { type: 'p', text: T(
            '測定を直してから**4週間（20日 × 600台 ＝ 12,000台）**を記録しました。ブツ不良は**504件**で、504 ÷ 12,000 ＝ **4.2%**。3年言われてきた数字が、はじめて根拠のある数字になりました。',
            'With the measurement fixed, **four weeks — 20 days × 600 units = 12,000** — were recorded. Dirt inclusions: **504**, and 504 ÷ 12,000 = **4.2%**. The figure quoted for three years finally had something behind it.',
            'Dengan pengukuran yang sudah diperbaiki, **empat minggu — 20 hari × 600 unit = 12.000** — dicatat. Cacat kotoran: **504**, dan 504 ÷ 12.000 = **4,2%**. Angka yang dikutip selama tiga tahun akhirnya memiliki dasar.'
          ) }
        ]
      },
      {
        id: 'analyze',
        title: T('Analyze：原因は1つではなかった', 'Analyze: the cause was not one thing', 'Analyze: penyebabnya bukan satu hal'),
        blocks: [
          { type: 'p', text: T(
            '12,000台を X候補で層別しました。単独で見ると、効いていそうなのは**フィルタの経過日数**と**ブース内の湿度**の2つ。ただし、どちらも単独では説明しきれません。2つを掛け合わせて並べたのが次の表です。',
            'The 12,000 units were stratified by each candidate X. Two stood out on their own: **days since the filter change** and **booth humidity**. Neither explained the whole picture. Crossing the two gives the table below.',
            'Seluruh 12.000 unit distratifikasi menurut tiap kandidat X. Dua menonjol sendiri: **hari sejak ganti filter** dan **kelembapan booth**. Tidak satu pun menjelaskan keseluruhannya. Menyilangkan keduanya menghasilkan tabel berikut.'
          ) },
          { type: 'table',
            head: [T('', '', ''), T('湿度 55%以上', 'Humidity ≥ 55%', 'Kelembapan ≥ 55%'), T('湿度 55%未満', 'Humidity < 55%', 'Kelembapan < 55%')],
            rows: [
              [T('フィルタ 1〜15日', 'Filter 1–15 days', 'Filter 1–15 hari'), T('**1.2%**', '**1.2%**', '**1,2%**'), T('2.4%', '2.4%', '2,4%')],
              [T('フィルタ 16〜30日', 'Filter 16–30 days', 'Filter 16–30 hari'), T('3.2%', '3.2%', '3,2%'), T('**10.0%**', '**10.0%**', '**10,0%**')]
            ],
            caption: T('4つの層の平均が4.2%。右下だけが桁違いに悪い', 'The four cells average 4.2%. Only the bottom-right is in another league', 'Rata-rata empat sel adalah 4,2%. Hanya kanan-bawah yang jauh lebih buruk')
          },
          { type: 'callout', kind: 'key', title: T('足し算では届かない差が、交互作用', 'The gap that addition cannot reach is the interaction', 'Selisih yang tak terjangkau oleh penjumlahan adalah interaksi'), text: T(
            '湿度だけの影響は **2.4 － 1.2 ＝ 1.2pt**、フィルタだけは **3.2 － 1.2 ＝ 2.0pt**。両方が悪い日は足し算なら **1.2 ＋ 1.2 ＋ 2.0 ＝ 4.4%** のはずですが、実際は **10.0%** でした。差の **5.6pt** が[[anova|交互作用]]です。**乾いた空気が静電気でホコリを呼び、古いフィルタがそのホコリを止めない。** 2つが重なったときだけ起きます。',
            'Humidity alone costs **2.4 − 1.2 = 1.2 pt**; the filter alone **3.2 − 1.2 = 2.0 pt**. A day with both should be **1.2 + 1.2 + 2.0 = 4.4%** if the effects simply added. It was **10.0%**. The **5.6 pt** difference is the [[anova|interaction]]. **Dry air pulls dust in by static electricity, and an old filter does not stop it.** It only happens when the two coincide.',
            'Pengaruh kelembapan saja adalah **2,4 − 1,2 = 1,2 poin**; filter saja **3,2 − 1,2 = 2,0 poin**. Hari ketika kedua kondisi itu buruk seharusnya **1,2 + 1,2 + 2,0 = 4,4%** bila kedua efek itu sekadar dijumlahkan. Kenyataannya **10,0%**. Selisih **5,6 poin** adalah [[anova|interaksi]]. **Udara kering menarik debu lewat listrik statis, dan filter tua tidak menahannya.** Ini hanya terjadi saat keduanya bertemu.'
          ) },
          { type: 'callout', kind: 'zeva', title: T('Quick GPC が3回とも届かなかった理由', 'Why Quick GPC fell short three times', 'Mengapa Quick GPC gagal tiga kali'), text: T(
            '2回目の「フィルタ30日→20日」は、湿度を放ったままでした。表でいえば右下から右上へ動くだけで、たどり着く先は**2.4%**止まり。しかも20日では1〜15日の層に入りきらないため、実際は3.6%までしか下がりませんでした。**単変量で追う限り、最良でも2.4%か3.2%にしか届きません。** 1.2%は両方そろえた日にだけ現れます。',
            'The second try — filter 30 → 20 days — left humidity alone. On the table it moves from bottom-right to top-right, where the best you can reach is **2.4%**. And 20 days does not reach the 1–15 day band, so in practice it only fell to 3.6%. **Chasing one variable at a time, the best you reach is 2.4% or 3.2%.** The 1.2% shows up only on days when both are right.',
            'Percobaan kedua — filter 30 → 20 hari — membiarkan kelembapan apa adanya. Pada tabel itu bergerak dari kanan-bawah ke kanan-atas, dan batas terbaiknya di sana hanya **2,4%**. Lagi pula 20 hari belum masuk pita 1–15 hari, sehingga nyatanya hanya turun ke 3,6%. **Selama variabel dikejar satu per satu, yang terbaik pun hanya 2,4% atau 3,2%.** Yang 1,2% hanya muncul pada hari ketika keduanya tepat.'
          ) }
        ]
      },
      {
        id: 'boxes',
        title: T('4つの箱', 'The four boxes', 'Empat kotak'),
        blocks: [
          { type: 'diagram', name: 'four-boxes',
            props: {
              label: T('事例：塗装工程（Deep GPC）の4つの箱', 'Case: the four boxes for the paint line (Deep GPC)', 'Kasus: empat kotak untuk lini pengecatan (Deep GPC)'),
              b1: T('ブツ不良率4.2%（504件 ÷ 12,000台）\n再塗装625分／日、一致率77%', 'Dirt inclusions 4.2% (504 ÷ 12,000)\nrespray 625 min/day, agreement 77%', 'Cacat kotoran 4,2% (504 ÷ 12.000)\ncat ulang 625 mnt/hari, kesepakatan 77%'),
              b2: T('フィルタ交換はカレンダー30日周期。\n湿度は成り行き。判定は人で割れる（一致率77%）', 'The filter is changed every 30 calendar days.\nHumidity is left alone. Inspectors agree only 77% of the time', 'Filter diganti tiap 30 hari kalender.\nKelembapan dibiarkan. Inspektur hanya sepakat 77%'),
              b3: T('限度見本で判定を固定。フィルタは差圧で交換（7日以内）。\n湿度55〜65%をGPCバンドで監視', 'Fix the judgment with boundary samples. Change the filter on pressure drop (within 7 days).\nHold 55–65% humidity as a GPC band', 'Kunci kriteria penilaian dengan sampel batas. Ganti filter berdasarkan beda tekanan (dalam 7 hari).\nJaga kelembapan 55–65% sebagai GPC band'),
              b4: T('ブツ不良率0.5%（3台 ÷ 600台）\n再塗装75分／日、一致率97%', 'Dirt inclusions 0.5% (3 ÷ 600)\nrespray 75 min/day, agreement 97%', 'Cacat kotoran 0,5% (3 ÷ 600)\ncat ulang 75 mnt/hari, kesepakatan 97%'),
              loop: T('②の2つの条件は、どちらか一方を直しても3.2%か2.4%で止まる。両方そろえて初めて④に届く', 'Fixing either condition in ② alone stops at 3.2% or 2.4%. Only both together reach ④', 'Memperbaiki salah satu kondisi di ② saja berhenti di 3,2% atau 2,4%. Hanya keduanya bersama yang mencapai ④')
            },
            caption: T('③には測定を直す手も入る。Measure で 一致率77% と分かったため', '③ also carries a fix to the measurement, because Measure found only 77% agreement', '③ juga memuat perbaikan pengukuran, karena Measure menemukan kesepakatan hanya 77%') },
          { type: 'callout', kind: 'key', title: T('④の0.5%はどこから出たか', 'Where the 0.5% in ④ comes from', 'Dari mana 0,5% di ④ berasal'), text: T(
            '層別で最良だった **1.2%** は「フィルタ1〜15日 × 湿度55%以上」という粗い括りの平均です。この枠の中を[[doe|DOE]]で刻むと、**フィルタ7日以内・湿度55〜65%**で0.5%まで下がりました。層別は当たりをつけるところまで、刻むのは DOE の仕事です。',
            'The best cell, **1.2%**, is the average of a coarse band: filter 1–15 days × humidity ≥ 55%. Cutting inside that band with [[doe|DOE]] reached 0.5% at **a filter within 7 days and 55–65% humidity**. Stratification finds the neighbourhood; DOE finds the address.',
            'Sel terbaik, **1,2%**, adalah rata-rata dari kelompok yang masih kasar: filter 1–15 hari × kelembapan ≥ 55%. Memotong di dalam pita itu dengan [[doe|DOE]] mencapai 0,5% pada **filter dalam 7 hari dan kelembapan 55–65%**. Stratifikasi hanya sampai pada perkiraan kasar; memotong di dalamnya adalah tugas DOE.'
          ) }
        ]
      },
      {
        id: 'improve',
        title: T('Improve と Control：条件を固定し、日常へ渡す', 'Improve and Control: fix the condition, hand it over', 'Improve dan Control: kunci kondisinya, serahkan ke operasi harian'),
        blocks: [
          { type: 'table',
            head: [T('段', 'Phase', 'Fase'), T('やったこと', 'What was done', 'Yang dikerjakan'), T('決めた条件（X）', 'The condition (X) set', 'Kondisi (X) yang ditetapkan')],
            rows: [
              [T('Improve', 'Improve', 'Improve'), T('[[doe|DOE]]でフィルタ経過日数3水準 × 湿度3水準を試し、最小の枠を探した', 'A [[doe|DOE]] over three filter ages × three humidity levels to find the smallest window', '[[doe|DOE]] pada tiga tingkat umur filter × tiga tingkat kelembapan untuk menemukan jendela terkecil'), T('フィルタ7日以内、湿度55〜65%', 'Filter within 7 days, humidity 55–65%', 'Filter dalam 7 hari, kelembapan 55–65%')],
              [T('Improve', 'Improve', 'Improve'), T('カレンダー交換をやめ、フィルタの差圧で交換時期を決めた', 'Dropped calendar changes; the pressure drop across the filter now calls the change', 'Menghentikan penggantian berbasis kalender; beda tekanan filter kini menentukan waktunya'), T('差圧が上限に達したら交換', 'Change when the pressure drop hits its upper limit', 'Ganti saat beda tekanan mencapai batas atas')],
              [T('Improve', 'Improve', 'Improve'), T('ブースに加湿器を入れ、冬季の乾燥を止めた', 'Added a humidifier in the booth so the winter air stops drying out', 'Menambah humidifier di booth agar udara musim dingin tidak menjadi kering'), T('湿度が55%を割ると自動で加湿', 'Humidify automatically below 55%', 'Melembapkan otomatis di bawah 55%')],
              [T('Control', 'Control', 'Control'), T('[[xbar-r-chart|X̄-R管理図]]で日々の不良率を打点し、[[control-plan|管理計画]]に条件を書いた', 'Plotted the daily defect rate on an [[xbar-r-chart|X̄-R chart]] and wrote the conditions into a [[control-plan|control plan]]', 'Memplot tingkat cacat harian pada [[xbar-r-chart|peta X̄-R]] dan menulis kondisinya ke [[control-plan|control plan]]'), T('湿度と差圧をGPCバンドで監視', 'Watch humidity and pressure drop as a GPC band', 'Pantau kelembapan dan beda tekanan sebagai GPC band')],
              [T('Control', 'Control', 'Control'), T('限度見本と検査台を標準作業に組み込み、[[pdca-s|PDCA-S]]へ渡した', 'Built the boundary samples and the inspection bench into standard work, then handed it to [[pdca-s|PDCA-S]]', 'Memasukkan sampel batas dan meja inspeksi ke kerja standar, lalu menyerahkannya ke [[pdca-s|PDCA-S]]'), T('一致率を半年ごとに取り直す', 'Re-measure the agreement rate every six months', 'Ukur ulang tingkat kesepakatan tiap enam bulan')]
            ]
          },
          { type: 'widget', name: 'control-chart', props: {} },
          { type: 'table',
            head: [T('指標', 'Metric', 'Metrik'), T('改善前', 'Before', 'Sebelum'), T('改善後', 'After', 'Sesudah'), T('効いた条件（X）', 'The condition (X) that moved it', 'Kondisi (X) yang menggerakkannya')],
            rows: [
              [T('[[defect-rate|ブツ不良率]]', '[[defect-rate|Dirt-inclusion rate]]', '[[defect-rate|Tingkat cacat kotoran]]'), T('4.2%', '4.2%', '4,2%'), T('0.5%', '0.5%', '0,5%'), T('フィルタ7日以内 × 湿度55〜65%', 'Filter within 7 days × humidity 55–65%', 'Filter dalam 7 hari × kelembapan 55–65%')],
              [T('1日の不良', 'Defects a day', 'Cacat per hari'), T('25台', '25 units', '25 unit'), T('3台', '3 units', '3 unit'), T('600台 × 各不良率', '600 units × each rate', '600 unit × masing-masing tingkat cacat')],
              [T('再塗装の時間', 'Respray time', 'Waktu cat ulang'), T('625分／日', '625 min/day', '625 mnt/hari'), T('75分／日', '75 min/day', '75 mnt/hari'), T('25分 × 不良台数', '25 min × the number of defects', '25 mnt × jumlah cacat')],
              [T('判定の一致率', 'Agreement rate', 'Tingkat kesepakatan'), T('38%', '38%', '38%'), T('8%', '8%', '8%'), T('限度見本と検査台', 'Boundary samples and the inspection bench', 'Sampel batas dan meja inspeksi')]
            ],
            caption: T('所要は Define 1週 ＋ Measure 4週 ＋ Analyze 2週 ＋ Improve 3週 ＋ Control 2週 ＝ 12週', 'It took Define 1 + Measure 4 + Analyze 2 + Improve 3 + Control 2 = 12 weeks', 'Waktunya Define 1 + Measure 4 + Analyze 2 + Improve 3 + Control 2 = 12 minggu')
          },
          { type: 'callout', kind: 'zeva', title: T('Deep GPC は遅いのではなく、順番が違う', 'Deep GPC is not slow; it runs in a different order', 'Deep GPC tidak lambat; ia berjalan dengan urutan berbeda'), text: T(
            'H-T-C-Aそのものは1回1週間以内で回ります。それでも3回で8週かかったのは、2回目がフィルタの交換周期を20日に変えたため、効果の判定に1か月の様子見が要ったからです。しかもその8週のデータは、一致率77%の判定で取ったものでした。**測り方を直してから測る**という順番を守ると、後戻りが消えます。',
            'An H-T-C-A cycle itself turns inside a week. The three of them still took eight, because the second one moved the filter interval to 20 days and then had to wait a month to judge the effect. And those eight weeks of data came off judgements that agreed only 77% of the time. **Fix the measurement, then measure** — that order is what removes the rework.',
            'Satu siklus H-T-C-A sendiri berputar dalam seminggu. Ketiganya tetap memakan delapan minggu, karena percobaan kedua mengubah interval filter menjadi 20 hari lalu harus menunggu sebulan untuk menilai efeknya. Dan data delapan minggu itu diambil dari penilaian yang hanya sepakat 77%. **Perbaiki cara mengukur, baru mengukur** — urutan itulah yang menghapus pengulangan.'
          ) }
        ]
      }
    ],
    keyPoints: [
      T('Quick GPC が3回届かなかったら、原因が1つでない可能性を疑って Deep GPC へ移す', 'Three Quick GPC cycles that fall short suggest the cause is not one factor; escalate to Deep GPC', 'Tiga siklus Quick GPC yang gagal menandakan penyebabnya bukan satu faktor; beralih ke Deep GPC'),
      T('判定が割れたまま集めたデータは、分析ごとやり直しになる。Measure は MSA から始める', 'Data collected while inspectors disagree forces the whole analysis to be redone; Measure starts with MSA', 'Data yang dikumpulkan saat inspektur berbeda pendapat memaksa seluruh analisis diulang; Measure dimulai dari MSA'),
      T('2つの条件を掛け合わせて層別すると、足し算では説明できない交互作用が見える', 'Crossing two conditions in a stratification exposes an interaction that addition cannot explain', 'Menyilangkan dua kondisi dalam stratifikasi menampakkan interaksi yang tak dapat dijelaskan oleh penjumlahan'),
      T('層別は当たりをつけるところまで。枠の中を刻むのは DOE の仕事', 'Stratification finds the neighbourhood; cutting inside the band is the job of DOE', 'Stratifikasi hanya sampai pada perkiraan kasar; memotong di dalamnya adalah tugas DOE'),
      T('Control で条件を GPCバンドに落とし、管理図と標準作業で PDCA-S へ渡す', 'In Control the conditions become a GPC band, handed to PDCA-S through the chart and standard work', 'Di Control kondisi menjadi GPC band, diserahkan ke PDCA-S lewat peta kendali dan kerja standar')
    ],
    quiz: [
      { q: T('Quick GPC を3回試して届かなかった。次にすることは', 'Three Quick GPC cycles fell short. What comes next?', 'Tiga siklus Quick GPC gagal. Apa berikutnya?'),
        choices: [
          T('4回目の仮説を立てて、また1つだけ変える', 'Form a fourth hypothesis and change one thing again', 'Susun hipotesis keempat dan ubah satu hal lagi'),
          T('原因が1つでない可能性を疑い、Deep GPC へ移す', 'Suspect the cause is not one factor and move to Deep GPC', 'Curigai penyebabnya bukan satu faktor dan beralih ke Deep GPC'),
          T('検査を増やして不良を外に出さないようにする', 'Add inspection so the defects do not escape', 'Tambah inspeksi agar cacat tidak lolos'),
          T('作業者を入れ替える', 'Swap the operators', 'Ganti operatornya')
        ], answer: 1,
        explain: T('3回とも「Xを1つ選んで変える」形でした。見当が外れ続けるのは、原因が1つではない合図です。', 'All three took the same shape: pick one X and change it. Guesses that keep missing signal that the cause is not one thing.', 'Ketiganya berbentuk sama: pilih satu X dan ubah. Tebakan yang terus meleset menandakan penyebabnya bukan satu hal.') },
      { q: T('Measure で最初にやったことは', 'What was done first in Measure?', 'Apa yang dilakukan pertama di Measure?'),
        choices: [
          T('4週間のデータ収集', 'Four weeks of data collection', 'Pengumpulan data empat minggu'),
          T('MSA（測定系の評価）', 'MSA — evaluating the measurement system', 'MSA — evaluasi sistem pengukuran'),
          T('回帰分析', 'Regression', 'Regresi'),
          T('DOE', 'DOE', 'DOE')
        ], answer: 1,
        explain: T('判定の一致率が77%では、不良率が動いても工程が動いたのか判定が動いたのか分かりません。', 'When inspectors agree only 77% of the time, a moving defect rate cannot tell you whether the process or the judgment moved.', 'Ketika inspektur hanya sepakat 77%, tingkat cacat yang bergerak tidak memberi tahu kita apakah proses atau penilaian yang bergerak.') },
      { q: T('湿度だけ直すと1.2pt、フィルタだけ直すと2.0pt。両方悪い日が10.0%だったとき、交互作用は何ポイントか', 'Humidity alone accounts for 1.2 pt and the filter alone 2.0 pt. If a day with both is 10.0%, how large is the interaction?', 'Kelembapan saja 1,2 poin dan filter saja 2,0 poin. Bila hari dengan keduanya 10,0%, seberapa besar interaksinya?'),
        choices: [
          T('3.2ポイント', '3.2 points', '3,2 poin'),
          T('4.4ポイント', '4.4 points', '4,4 poin'),
          T('5.6ポイント', '5.6 points', '5,6 poin'),
          T('10.0ポイント', '10.0 points', '10,0 poin')
        ], answer: 2,
        explain: T('足し算の予測は 1.2 ＋ 1.2 ＋ 2.0 ＝ 4.4%。実際10.0%との差 5.6pt が交互作用です。', 'Addition predicts 1.2 + 1.2 + 2.0 = 4.4%. The 5.6 pt gap to the actual 10.0% is the interaction.', 'Penjumlahan memprediksi 1,2 + 1,2 + 2,0 = 4,4%. Selisih 5,6 poin terhadap angka nyata 10,0% adalah interaksinya.') },
      { q: T('層別で最良だった1.2%から、④の0.5%へ届いたのは何によってか', 'What took the case from the best cell, 1.2%, down to the 0.5% in ④?', 'Apa yang membawa kasus dari sel terbaik 1,2% ke 0,5% di ④?'),
        choices: [
          T('検査を全数に増やした', 'Inspection went to 100%', 'Inspeksi menjadi 100%'),
          T('DOE で枠の中を刻み、フィルタ7日以内・湿度55〜65%を見つけた', 'A DOE cut inside the band and found a filter within 7 days and 55–65% humidity', 'DOE memotong di dalam pita dan menemukan filter dalam 7 hari dan kelembapan 55–65%'),
          T('塗料を変えた', 'The paint was changed', 'Catnya diganti'),
          T('作業者を固定した', 'The operator was fixed', 'Operatornya ditetapkan')
        ], answer: 1,
        explain: T('1.2%は「1〜15日 × 55%以上」という粗い括りの平均です。刻むのは DOE の仕事でした。', 'The 1.2% is the average of a coarse band, 1–15 days × ≥ 55%. Cutting inside it was the job of DOE.', '1,2% adalah rata-rata pita kasar, 1–15 hari × ≥ 55%. Memotong di dalamnya adalah tugas DOE.') },
      { q: T('Control で条件を渡す先はどこか', 'Where does Control hand the conditions on to?', 'Ke mana Control menyerahkan kondisinya?'),
        choices: [
          T('次の Deep GPC プロジェクト', 'The next Deep GPC project', 'Proyek Deep GPC berikutnya'),
          T('[[pdca-s|PDCA-S]]（日常の維持サイクル）', '[[pdca-s|PDCA-S]] — the day-to-day maintenance cycle', '[[pdca-s|PDCA-S]] — siklus harian untuk mempertahankan kondisi'),
          T('品質保証部の検査', 'The QA department\'s inspection', 'Inspeksi departemen QA'),
          T('どこにも渡さない', 'Nowhere', 'Tidak ke mana-mana')
        ], answer: 1,
        explain: T('管理図・GPCバンド・標準作業として固定し、日常運用の PDCA-S に移します。', 'It is frozen as a control chart, a GPC band and standard work, then moved into the PDCA-S of daily operation.', 'Kondisi itu dibekukan sebagai peta kendali, GPC band, dan kerja standar, lalu dipindahkan ke PDCA-S operasi harian.') }
    ]
  });
})();
