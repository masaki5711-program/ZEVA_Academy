(function () {
  const T = (ja, en, id) => ({ ja, en, id });

  ZA.addModule({
    id: 'z3-11',
    track: 'z3',
    order: 11,
    minutes: 60,
    icon: '🪵',
    level: 3,
    prereq: ['z3-02', 'z3-10'],
    title: T('演習：木工ラインを立て直す', 'Exercise: turning a woodshop line around', 'Latihan: membenahi lini kayu'),
    summary: T(
      '5工程の木工ラインを預かり、寸法のバラツキ・接着の不良・研削後の面荒れを相手に、[[dmaic|DMAIC]]の順で自分で決めていく演習です。調査できる量には限りがあり、**何を測るかを選ぶこと自体が問われます**。データの下に何が仕込まれているかは、自分で言い当てることになります。数値は説明用の仮想工程です。',
      'You take charge of a five-process woodshop line and work through [[dmaic|DMAIC]] yourself against dimensional scatter, failed bonds and a poor sanded surface. What you can survey is limited, so **choosing what to measure is itself the question**. What lies under the data is yours to work out. The numbers describe an illustrative process.',
      'Anda memimpin lini kayu lima proses dan menjalani [[dmaic|DMAIC]] sendiri untuk menghadapi sebaran dimensi, rekatan yang gagal, dan permukaan buruk setelah pengamplasan. Yang dapat disurvei terbatas, sehingga **memilih apa yang akan diukur itulah inti persoalannya**. Apa yang ada di bawah data harus Anda simpulkan sendiri. Angka-angkanya berasal dari proses fiktif untuk ilustrasi.'
    ),
    objectives: [
      T('限られた調査資源のなかで、何を測るかを先に決められる', 'Decide what to measure first, within a limited survey budget', 'Menentukan apa yang diukur lebih dulu, dalam anggaran survei yang terbatas'),
      T('層別で差が出た因子について、原因かどうかを確かめる手を打てる', 'Take a step that tests whether a factor showing a gap is actually a cause', 'Mengambil langkah untuk menguji apakah faktor yang menunjukkan selisih benar-benar penyebab'),
      T('1因子ずつの試行が惜しいところで止まる理由を説明できる', 'Explain why one-factor-at-a-time trials keep stopping just short', 'Menjelaskan mengapa percobaan satu faktor pada satu waktu terus berhenti sedikit di bawah sasaran'),
      T('[[gpc-band|GPCバンド]]を、効果とコストの両方から決められる', 'Set a [[gpc-band|GPC band]] from both its effect and its cost', 'Menetapkan [[gpc-band|GPC band]] dari efek sekaligus biayanya'),
      T('原因につながる条件で、維持のしくみを組める', 'Build the maintenance routine out of conditions tied to the cause', 'Menyusun rutinitas pemeliharaan dari kondisi yang terkait penyebab'),
      T('標準化を先に置く理由を、自分のデータで言える', 'Say, from your own data, why standardisation comes first', 'Mengatakan, dari data Anda sendiri, mengapa standarisasi didahulukan')
    ],
    sections: [
      {
        id: 'rules',
        title: T('あなたが預かるライン', 'The line you take charge of', 'Lini yang Anda pimpin'),
        blocks: [
          { type: 'p', text: T(
            '**製材 → 乾燥 → NC加工 → 接着 → 研削** の5工程です。3種類の不良が同時に出ています。寸法が図面から外れる、接着が付かない、研削後の面が荒れる。現場はそれぞれ別の工程の話だと考えていて、工程ごとに担当者が付いています。不良率は **不良個数 ÷ 検査個数** です。毎週40ロット、1ロット25個を検査するので、1週で1,000個を見ます。寸法・接着・面質の3つを足した値が全体の不良率です。',
            'Five processes: **sawing → kiln → NC machining → glue-up → sanding**. Three kinds of defect run at once: parts out of tolerance, bonds that fail, and a rough surface after sanding. The floor treats each as a matter for its own process, and each has its own owner. A defect rate is **defective pieces ÷ pieces inspected**. Forty lots of twenty-five pieces run every week, so a week covers a thousand pieces. The three rates for dimension, adhesion and surface add up to the overall rate.',
            'Lima proses: **penggergajian → kiln → pemesinan NC → perekatan → pengamplasan**. Tiga jenis cacat berjalan bersamaan: part di luar toleransi, rekatan yang gagal, dan permukaan kasar setelah pengamplasan. Lantai produksi menganggap tiap cacat urusan prosesnya sendiri, masing-masing dengan penanggung jawabnya. Tingkat cacat adalah **potong cacat ÷ potong yang diperiksa**. Empat puluh lot berisi dua puluh lima potong berjalan tiap minggu, jadi satu minggu mencakup seribu potong. Ketiga tingkat untuk dimensi, perekatan, dan permukaan dijumlahkan menjadi tingkat keseluruhan.'
          ) },
          { type: 'table',
            head: [T('資源', 'Resource', 'Sumber daya'), T('量', 'Amount', 'Jumlah'), T('何に使うか', 'What it buys', 'Untuk apa')],
            rows: [
              [T('調査ポイント', 'Survey points', 'Poin survei'), T('90', '90', '90'), T('測定・記録・実験の手配', 'Measurements, records and experiments', 'Pengukuran, pencatatan, dan percobaan')],
              [T('期間', 'Time', 'Waktu'), T('16週', '16 weeks', '16 minggu'), T('調査に要る週数と、最後の4週の試験運転', 'The weeks each survey takes, plus a four-week trial run at the end', 'Minggu yang dibutuhkan tiap survei, ditambah uji coba empat minggu di akhir')],
              [T('日常点検の枠', 'Slots on the daily check sheet', 'Slot lembar periksa harian'), T('3件', '3 items', '3 butir'), T('下がった状態を維持する条件', 'The conditions that hold the gain', 'Kondisi yang menahan hasil')]
            ],
            caption: T('すべては買えない。買わなかった属性では、あとで層別できない', 'You cannot buy everything, and you cannot stratify later by an attribute you did not buy', 'Tidak semua bisa dibeli, dan atribut yang tidak Anda beli tidak dapat dipakai untuk stratifikasi nanti')
          },
          { type: 'callout', kind: 'key', title: T('この演習で問われること', 'What this exercise asks of you', 'Apa yang diminta latihan ini'), text: T(
            '不良率を下げること自体は、条件を全部締めれば誰でもできます。問われるのは **どこまでが原因で、どこからがコストだけか** を、限られたデータから言い当てられるかです。条件を締めるには毎月の費用がかかります。',
            'Cutting the defect rate is easy if you simply tighten everything. What is asked is whether you can tell, from limited data, **where the cause ends and where only cost begins**. Every condition you tighten carries a monthly expense.',
            'Menurunkan tingkat cacat itu mudah bila semuanya diperketat. Yang diminta adalah apakah Anda dapat menentukan, dari data terbatas, **di mana penyebab berakhir dan di mana hanya biaya yang dimulai**. Setiap kondisi yang Anda perketat membawa biaya bulanan.'
          ) }
        ]
      },
      {
        id: 'play',
        title: T('演習', 'The exercise', 'Latihan'),
        blocks: [
          { type: 'p', text: T(
            '演習は別画面のアプリになっています。16週を1週ずつ進め、調べる週と条件を変える週を自分で配ります。**最後まで進むと、データの下に何が仕込まれていたかが明かされます。** 先に下の解説を読むと答えが分かってしまうので、まず一度通してください。',
            'The exercise runs as its own app. You move through sixteen weeks one at a time, deciding for yourself which weeks go to surveying and which to changing a condition. **Reaching the end reveals what was underneath the data.** Reading the commentary below first gives the answer away, so play it through once.',
            'Latihan ini berjalan sebagai aplikasi tersendiri. Anda melangkah enam belas minggu satu per satu, menentukan sendiri minggu mana untuk survei dan mana untuk mengubah kondisi. **Mencapai akhir akan mengungkap apa yang ada di bawah data.** Membaca ulasan di bawah lebih dulu akan membocorkan jawabannya, jadi mainkan sekali sampai tuntas.'
          ) },
          { type: 'launch', href: 'game/', blank: true, mark: '🪵',
            title: T('現場再建記をはじめる', 'Start Shopfloor Rebuild', 'Mulai Membangun Ulang Lantai Produksi'),
            desc: T('ラインは4本。甲・乙・丙は不良を相手にし、答えはそれぞれ違います。丁は不良ではなく日産を相手にするラインで、段取り・立上げ・工程の分担・ロットサイズを動かします。チームごとに別のラインを配れば、隣の答えを写しても当たりません。結果コードを集めれば、チーム対抗の成績表になります。',
              'Four lines. Alpha, Beta and Gamma are about defects and each has a different answer. Delta is about daily output instead, where you move the changeover, the warm-up, how the work is split and the lot size. Give each team a different line and copying the neighbours gets them nowhere. Collect the result codes and you have a team scoreboard.',
              'Empat lini. Alfa, Beta, dan Gamma tentang cacat dan masing-masing punya jawaban berbeda. Delta tentang keluaran harian, tempat Anda menggerakkan pergantian, pemanasan, pembagian kerja, dan ukuran lot. Beri tiap tim lini yang berbeda dan menyalin tetangga tidak membantu. Kumpulkan kode hasil dan Anda punya papan skor tim.') }
        ]
      },
      {
        id: 'method',
        title: T('画面とGPCの手順の対応', 'How the screens map to the GPC steps', 'Pemetaan layar ke langkah GPC'),
        blocks: [
          { type: 'table',
            head: [T('画面', 'Screen', 'Layar'), T('GPCで言えば', 'In GPC terms', 'Dalam istilah GPC'), T('ここで決まること', 'What it decides', 'Apa yang ditentukan')],
            rows: [
              [T('初期標準をつくる', 'Write an initial standard', 'Susun standar awal'),
                T('[[foundation-standardization|土台の標準化]]', '[[foundation-standardization|Foundation standardisation]]', '[[foundation-standardization|Standarisasi fondasi]]'),
                T('やり方を1つに決める。最適な手順を探すのではなく、比べられる状態をつくる。ここを飛ばすと、条件の差と手順の差が混ざったものを測ることになる',
                  'Settle on one way of working. Not the best method, but a comparable one. Skip it and you measure the difference between conditions mixed with the difference between methods',
                  'Tetapkan satu cara kerja. Bukan metode terbaik, melainkan yang dapat dibandingkan. Lewati ini dan Anda mengukur perbedaan kondisi bercampur perbedaan metode')],
              [T('Define', 'Define', 'Define'), T('Yを決める', 'Choosing the Y', 'Memilih Y'), T('3つを別々に追うか、合わせて1つの的にするか。合わせた瞬間に、共通の原因を探す目になる', 'Three separate problems, or one combined target. The moment you combine them you start looking for a shared cause', 'Tiga masalah terpisah, atau satu sasaran gabungan. Begitu digabung, Anda mulai mencari penyebab bersama')],
              [T('Measure', 'Measure', 'Measure'), T('[[msa|MSA]]とデータ収集', '[[msa|MSA]] and data collection', '[[msa|MSA]] dan pengumpulan data'), T('測定を確かめずに集めたデータでは、工程が動いたのか判定が動いたのか区別がつかない', 'Data gathered without checking the measurement cannot tell a moving process from a moving judgement', 'Data yang dikumpulkan tanpa memeriksa pengukuran tidak dapat membedakan proses yang bergerak dari penilaian yang bergerak')],
              [T('Analyze', 'Analyze', 'Analyze'), T('層別と[[doe|DOE]]', 'Stratification and [[doe|DOE]]', 'Stratifikasi dan [[doe|DOE]]'), T('どのXで切ると差が出るか。足し算で説明できない分が交互作用', 'Which X splits the data. Whatever addition cannot account for is the interaction', 'X mana yang memisahkan data. Apa yang tak dijelaskan penjumlahan adalah interaksi')],
              [T('Improve', 'Improve', 'Improve'), T('[[gpc-band|GPCバンド]]を決める', 'Setting the [[gpc-band|GPC band]]', 'Menetapkan [[gpc-band|GPC band]]'), T('条件をどこまで締めるか。効果とコストの両方を見て決める', 'How far to tighten each condition, judged on effect and cost together', 'Seberapa ketat tiap kondisi, dinilai dari efek dan biaya sekaligus')],
              [T('Control', 'Control', 'Control'), T('[[pdca-s|PDCA-S]]へ渡す', 'Handing over to [[pdca-s|PDCA-S]]', 'Menyerahkan ke [[pdca-s|PDCA-S]]'), T('日常点検に載せた条件だけが維持される。載せなかった条件は元に戻る', 'Only the conditions on the check sheet are held. The rest drift back', 'Hanya kondisi di lembar periksa yang tertahan. Sisanya kembali seperti semula')]
            ],
            caption: T('[[deep-gpc|Deep GPC]]の1周を、決める側として通す', 'One turn of [[deep-gpc|Deep GPC]], walked from the deciding seat', 'Satu putaran [[deep-gpc|Deep GPC]], dijalani dari kursi pengambil keputusan')
          },
          { type: 'callout', kind: 'tip', title: T('点数が伸びない人がよくやること', 'What a low score usually looks like', 'Seperti apa skor rendah biasanya'), text: T(
            '6件の調査を全部買うには105ポイント要るので、90ポイントでは必ず何かを捨てます。安い順に買っていくと、最後に残るのはいちばん高い実験計画（30ポイント）で、**交互作用だけ見えないまま Improve に入る**ことになります。**Define で決めた的から逆算して、その的を割るために要る軸から先に押さえる**のが、点数の伸びる順序です。',
            'Buying all six surveys would take 105 points, so with 90 you will always drop something. Buy cheapest-first and the one left over is the dearest — the designed experiment at 30 points — so you **enter Improve with the interaction still invisible**. The order that scores well is to **work back from the target you set in Define and secure the axes that split it first**.',
            'Membeli keenam survei memerlukan 105 poin, sehingga dengan 90 poin Anda pasti melepas sesuatu. Bila membeli dari yang termurah, yang tersisa adalah yang termahal — desain eksperimen seharga 30 poin — sehingga Anda **masuk ke Improve dengan interaksi yang masih tak terlihat**. Urutan yang berskor baik adalah **bekerja mundur dari sasaran yang Anda tetapkan di Define dan mengamankan lebih dulu sumbu yang memisahkannya**.'
          ) }
        ]
      },
      {
        id: 'debrief',
        title: T('総括（演習のあとで読む）：仕込んであった3つの型', 'Debrief, to read after playing: the three shapes that were planted', 'Rangkuman, dibaca setelah bermain: tiga bentuk yang ditanam'),
        blocks: [
          { type: 'callout', kind: 'warn', title: T('答えが書いてある', 'This section gives the answer away', 'Bagian ini membocorkan jawabannya'), text: T(
            'ここから先は、演習に仕込んである仕掛けの説明です。一度通してから読んでください。',
            'What follows explains the mechanism planted in the exercise. Play it through once first.',
            'Berikut ini menjelaskan mekanisme yang ditanam dalam latihan. Mainkan sekali dulu.'
          ) },
          { type: 'p', text: T(
            '3つの症状は、**乾燥から出てくる材の含水率**という1つの上流条件から出ていました。湿った材は寸法が動き、接着が付かず、削れば毛羽立ちます。別々の工程の話に見えていたものが、[[xy-thinking|X-Y思考]]で言えば同じXにつながっていたわけです。',
            'The three symptoms came from one upstream condition: **the moisture content of the stock leaving the kiln**. Damp stock moves in size, refuses glue and fuzzes when sanded. What looked like three separate processes traced back, in [[xy-thinking|X-Y terms]], to the same X.',
            'Ketiga gejala berasal dari satu kondisi hulu: **kadar air material yang keluar dari kiln**. Material lembap berubah ukuran, menolak lem, dan berbulu saat diamplas. Yang tampak seperti tiga proses terpisah ternyata mengarah, dalam [[xy-thinking|istilah X-Y]], ke X yang sama.'
          ) },
          { type: 'table',
            head: [T('型', 'Shape', 'Bentuk'), T('演習での現れ方', 'How it appears in the exercise', 'Bagaimana ia muncul di latihan'), T('現場での見分け方', 'How to spot it on the floor', 'Cara mengenalinya di lapangan')],
            rows: [
              [T('相関と原因の取り違え', 'Correlation mistaken for cause', 'Korelasi disalahartikan sebagai penyebab'),
               T('室温で層別すると3σを越える差が出て、しかも3つの症状すべてに出る。含水率とそっくりの形になる。しかし室温を変えても不良は動かない。室温は含水率と一緒に動いていただけ', 'Stratifying by room temperature gives a gap past three sigma, and it appears in all three symptoms — the same shape the moisture makes. Yet changing the temperature moves nothing: it was simply travelling with the moisture', 'Stratifikasi menurut suhu ruang memberi selisih melewati tiga sigma, dan muncul di ketiga gejala — bentuk yang sama dengan kadar air. Namun mengubah suhu tidak menggerakkan apa pun: ia hanya menyertai kadar air'),
               T('差が出た因子を「変えられるか」で試す。変えて動かなければ、それは原因ではなく連れ添っているだけ', 'Test a factor that shows a gap by changing it. If nothing moves, it was travelling alongside the cause, not being it', 'Uji faktor yang menunjukkan selisih dengan mengubahnya. Bila tidak ada yang bergerak, ia hanya menyertai penyebab, bukan penyebabnya')],
              [T('交互作用', 'Interaction', 'Interaksi'),
               T('在炉時間と圧締時間を振ると 3.2 / 5.1 / 9.8 / 14.3%。最良の3.2%に片方ずつの増え分 1.9 と 6.6 を足すと11.6%だが、実際に両方を悪くした条件では14.3%。差の2.7ptが交互作用', 'Varying kiln hours and press time gives 3.2 / 5.1 / 9.8 / 14.3%. Adding the two single increases, 1.9 and 6.6, to the best cell at 3.2% predicts 11.6%, yet the run with both bad is 14.3%. The 2.7 pt gap is the interaction', 'Memvariasikan jam kiln dan waktu pres memberi 3,2 / 5,1 / 9,8 / 14,3%. Menambahkan dua kenaikan tunggal, 1,9 dan 6,6, ke sel terbaik 3,2% memprediksi 11,6%, namun jalannya dengan keduanya buruk adalah 14,3%. Selisih 2,7 pt itulah interaksinya'),
               T('1つずつ変える試行が何度も惜しいところで止まるなら、掛け合わせを疑う。1因子ずつ並べた層別では出ないので、2因子を交差させるか[[doe|DOE]]で条件を振る', 'When one-at-a-time trials keep stopping just short, suspect two factors acting together. A one-factor-at-a-time stratification will not show it: cross the two factors, or vary the conditions with a [[doe|DOE]]', 'Bila percobaan satu per satu terus berhenti sedikit di bawah sasaran, curigai adanya interaksi antara dua faktor. Stratifikasi satu faktor pada satu waktu tidak akan menunjukkannya: silangkan kedua faktor, atau variasikan kondisinya dengan [[doe|DOE]]')],
              [T('締めすぎ', 'Tightening past the effect', 'Terlalu ketat'),
               T('在炉40時間・刃10時間をそろえたうえで、圧締60秒・番手150を越えて締めても不良率は1.8%のまま。追加コストだけが71万円/月から89万円/月へ増える', 'With the kiln at 40 hours and the cutter at 10, tightening past 60 seconds of press and 150 grit leaves the rate at 1.8%, while the added cost climbs from \u00a5710,000 to \u00a5890,000 a month', 'Dengan kiln 40 jam dan pisau 10 jam, pengetatan melewati pres 60 detik dan grit 150 membuat tingkatnya tetap 1,8%, sementara biaya tambahan naik dari \u00a5710.000 menjadi \u00a5890.000 per bulan'),
               T('条件を1段締めるごとに効果を測る。効果が止まった点が[[gpc-band|GPCバンド]]の端', 'Measure the effect at each notch of tightening. The notch where the effect stops is the edge of the [[gpc-band|GPC band]]', 'Ukur efek pada tiap tingkat pengetatan. Tingkat di mana efek berhenti adalah tepi [[gpc-band|GPC band]]')]
            ],
            caption: T('数値は説明用の仮想工程。3つの型はどの工程でも同じ形で現れる', 'The numbers describe an illustrative process; the three shapes appear the same way in any process', 'Angka-angka berasal dari proses fiktif; ketiga bentuk itu muncul dengan cara yang sama di proses mana pun')
          },
          { type: 'callout', kind: 'key', title: T('標準化は、調査の前にある', 'Standardisation comes before the survey', 'Standarisasi datang sebelum survei'), text: T(
            '標準化していない工程では、人によって手順が違います。そのばらつきが全部の数字に乗るので、**平均は同じなのに週ごとの揺れがおよそ1.6倍**になります。'
            + '揺れが大きいと3σの目安が広がり、**本物の因子が「偶然の範囲」に埋もれます。**そして作業者で層別すると、本物の差が出ます。'
            + 'これは人の問題ではなく、標準が無いというだけのことです。'
            + '標準化に使うのは10ポイントと2週。**同じ調査ポイントでも、標準化してから使ったほうが多くが見えます。**'
            + 'ZEVAが 標準化 → データ取得 → 4つの箱 → 改善 の順に置いているのは、このためです。',
            'In a process without a standard, people work differently. That spread rides on every number, so **the mean stays where it is while the week-to-week swing runs about 1.6 times larger.** '
            + 'A wider swing widens the three-sigma yardstick, and **real factors sink into “within chance”.** Stratify by operator and a real gap appears — '
            + 'which is not a problem with the people, only the absence of a standard. '
            + 'A standard costs ten points and two weeks. **The same survey points buy more when they are spent after it.** '
            + 'That is why ZEVA orders it standardisation, then data, then the four boxes, then improvement.',
            'Dalam proses tanpa standar, orang bekerja dengan cara berbeda. Sebaran itu menumpang pada setiap angka, sehingga **rata-rata tetap di tempatnya sementara ayunan antar minggu sekitar 1,6 kali lebih besar.** '
            + 'Ayunan yang lebih lebar melebarkan patokan tiga sigma, dan **faktor nyata tenggelam ke “dalam rentang kebetulan”.** Stratifikasi menurut operator dan selisih nyata muncul — '
            + 'yang bukan masalah orangnya, melainkan tidak adanya standar. '
            + 'Standar berharga sepuluh poin dan dua minggu. **Poin survei yang sama membeli lebih banyak bila dibelanjakan setelahnya.** '
            + 'Itulah sebabnya ZEVA mengurutkannya: standarisasi, lalu data, lalu empat kotak, lalu perbaikan.'
          ) },
          { type: 'callout', kind: 'zeva', title: T('維持は、原因につながる条件にしか効かない', 'Only a condition tied to the cause can hold the gain', 'Hanya kondisi yang terkait penyebab yang dapat menahan hasil'), text: T(
            'Control で「室温を毎日記録する」「作業者に注意を呼びかける」を選んでも、条件は何も押さえられていません。記録しているのは結果と連れ添う数字であり、呼びかけは条件ではないからです。維持できるのは、**含水率・刃の使用時間・圧締時間・番手** のように、値を決めて守れる条件だけです。これを[[pdca-s|PDCA-S]]に載せて、はじめて下がった状態が続きます。',
            'Putting “record the room temperature” or “remind the operators” on the check sheet holds no condition. One records a number that travels with the result; the other is not a condition at all. What can be held are conditions with a value you can set and keep: **moisture, cutter hours, press time, grit**. Only once those sit in [[pdca-s|PDCA-S]] does the lower rate stay.',
            'Menaruh “catat suhu ruang” atau “ingatkan operator” di lembar periksa tidak menahan kondisi apa pun. Yang satu mencatat angka yang menyertai hasil; yang lain sama sekali bukan kondisi. Yang dapat ditahan adalah kondisi dengan nilai yang dapat ditetapkan dan dijaga: **kadar air, jam pakai pisau, waktu pres, grit**. Hanya setelah kondisi-kondisi itu masuk ke [[pdca-s|PDCA-S]], tingkat cacat yang sudah turun akan bertahan.'
          ) }
        ]
      }
    ],
    quiz: [
      { q: T('室温で層別したら、3σを越える差が3つの症状すべてに出た。ここから言えることは', 'Stratified by room temperature, the gap passes three sigma in all three symptoms. What follows from this?', 'Distratifikasi menurut suhu ruang, selisihnya melewati tiga sigma di ketiga gejala. Apa yang dapat disimpulkan?'),
        choices: [
          T('室温を下げれば不良は下がる', 'Lowering the room temperature will lower the defects', 'Menurunkan suhu ruang akan menurunkan cacat'),
          T('室温は原因かもしれないし、原因と一緒に動いているだけかもしれない', 'Room temperature may be the cause, or it may simply be moving with the cause', 'Suhu ruang mungkin penyebabnya, atau mungkin hanya bergerak bersama penyebabnya'),
          T('室温は不良と無関係である', 'Room temperature is unrelated to the defects', 'Suhu ruang tidak berhubungan dengan cacat'),
          T('データの取り方が間違っている', 'The data was collected wrongly', 'Data dikumpulkan secara keliru')
        ], answer: 1,
        explain: T('3σを越えても、そこに原因があるとは限りません。甲ラインの室温は含水率と一緒に動くだけで、室温を変えても不良は動きませんでした。**確かめ方は、その条件を実際に変えてみること**です。', 'Passing three sigma does not put the cause there. On line Alpha the temperature simply travels with the moisture, and changing it moves nothing. **The way to check is to change that condition and watch.**', 'Melewati tiga sigma tidak menempatkan penyebab di situ. Di lini Alfa suhu hanya menyertai kadar air, dan mengubahnya tidak menggerakkan apa pun. **Cara memeriksanya adalah mengubah kondisi itu dan mengamatinya.**') },
      { q: T('在炉時間と圧締時間を振った4通りが 3.2 / 5.1 / 9.8 / 14.3% だった。交互作用は何ポイントか', 'The four runs of kiln hours × press time gave 3.2 / 5.1 / 9.8 / 14.3%. How large is the interaction?', 'Empat kombinasi jam kiln × waktu pres menghasilkan 3,2 / 5,1 / 9,8 / 14,3%. Seberapa besar interaksinya?'),
        choices: [
          T('0pt（交互作用は無い）', 'Zero, there is no interaction', 'Nol, tidak ada interaksi'),
          T('2.7pt', '2.7 pt', '2,7 pt'),
          T('8.5pt', '8.5 pt', '8,5 pt'),
          T('11.1pt', '11.1 pt', '11,1 pt')
        ], answer: 1,
        explain: T('最良の3.2%を基準に、圧締だけ悪い条件が＋1.9、在炉だけ悪い条件が＋6.6。足し算の予測は 3.2＋1.9＋6.6＝11.6% ですが、両方を悪くした条件では14.3%でした。差の2.7ptが、2つが重なったときにだけ出る分です。', 'Against the best cell at 3.2%, press alone adds 1.9 and kiln alone adds 6.6. Addition predicts 3.2 + 1.9 + 6.6 = 11.6%, yet the cell with both is 14.3%. The 2.7 pt gap is what appears only when the two coincide.', 'Terhadap sel terbaik 3,6%, kondisi yang hanya buruk pada pres menambah 2,0, dan kondisi yang hanya buruk pada kiln menambah 6,6. Penjumlahan memprediksi 3,6 + 2,0 + 6,6 = 12,2%, namun sel dengan keduanya adalah 14,3%. Selisih 2,1 poin itulah yang hanya muncul saat keduanya bertemu.') },
      { q: T('Measure で MSA を買わずに進んだ。以降のデータはどうなるか', 'You went on without buying the MSA. What happens to the later data?', 'Anda melanjutkan tanpa membeli MSA. Apa yang terjadi pada data selanjutnya?'),
        choices: [
          T('不良率が実際より高く出る', 'The defect rate reads higher than it is', 'Tingkat cacat terbaca lebih tinggi dari sebenarnya'),
          T('層別しても、工程の差なのか判定の差なのか区別できない', 'A stratification can no longer separate a difference in the process from a difference in the judgement', 'Stratifikasi tidak lagi dapat memisahkan perbedaan proses dari perbedaan penilaian'),
          T('データ量を増やせば解消する', 'Collecting more data resolves it', 'Mengumpulkan lebih banyak data mengatasinya'),
          T('何も変わらない', 'Nothing changes', 'Tidak ada yang berubah')
        ], answer: 1,
        explain: T('測定そのものがばらついていると、層別で出た差が工程の差なのか判定の差なのか分かりません。データを増やしても、ゆれの中心は動きません。', 'If the measurement itself scatters, a gap between strata could be the process or the judgement. More data does not move the centre of that scatter.', 'Bila pengukurannya sendiri menyebar, selisih antar strata bisa jadi prosesnya atau penilaiannya. Menambah data tidak menggeser pusat sebaran itu.') },
      { q: T('在炉40時間・刃10時間をそろえた状態で、圧締時間を60秒より長くしても不良率が1.8%のまま変わらない。このとき正しい判断は', 'With the kiln at 40 hours and the cutter at 10, the rate stays at 1.8% past 60 seconds of press time. What is the right call?', 'Dengan kiln 40 jam dan pisau 10 jam, tingkatnya tetap 1,8% melewati waktu pres 60 detik. Apa keputusan yang tepat?'),
        choices: [
          T('念のためもっと長くする', 'Lengthen it further to be safe', 'Perpanjang lagi untuk berjaga-jaga'),
          T('60秒をバンドの端とし、そこで止める', 'Take 60 seconds as the edge of the band and stop there', 'Ambil 60 detik sebagai tepi GPC band dan berhenti di situ'),
          T('圧締時間は効果がないので45秒に戻す', 'Press time has no effect, so go back to 45 seconds', 'Waktu pres tidak berpengaruh, jadi kembali ke 45 detik'),
          T('別の因子に置き換える', 'Replace it with a different factor', 'Ganti dengan faktor lain')
        ], answer: 1,
        explain: T('効果が止まった点がバンドの端です。そこを越えて締めても不良率は動かず、毎月のコストだけが増えます。45秒に戻せば効果ごと失います。', 'The point where the effect stops is the edge of the band. Tighten past it and the rate does not move while the monthly cost climbs. Going back to 45 seconds throws the effect away with it.', 'Titik di mana efek berhenti adalah tepi GPC band. Diperketat melewatinya, tingkatnya tidak bergerak sementara biaya bulanan naik. Kembali ke 45 detik membuang efeknya sekalian.') },
      { q: T('標準化をせずに16週を通した。データにどう出るか', 'You went sixteen weeks without writing a standard. How does that show in the data?', 'Anda menjalani enam belas minggu tanpa menyusun standar. Bagaimana itu terlihat dalam data?'),
        choices: [
          T('不良率の平均が高く出る', 'The mean defect rate reads higher', 'Rata-rata tingkat cacat terbaca lebih tinggi'),
          T('平均は同じだが、週ごとの揺れが大きくなり、本物の因子が偶然の範囲に埋もれる', 'The mean is unchanged, but the week-to-week swing grows and real factors sink into “within chance”', 'Rata-ratanya tetap, tetapi ayunan antar minggu membesar dan faktor nyata tenggelam ke “dalam rentang kebetulan”'),
          T('層別ができなくなる', 'Stratification stops working', 'Stratifikasi berhenti bekerja'),
          T('何も変わらない', 'Nothing changes', 'Tidak ada yang berubah')
        ], answer: 1,
        explain: T('手順のばらつきは、平均を動かさずにバラツキだけを増やします。揺れが大きいほど3σの目安は広がり、同じ調査をしても差が読めません。あわせて、作業者で層別すると本物の差が出ます。人の問題ではなく、標準が無いというだけのことです。',
          'Method spread adds variation without moving the mean. The wider the swing, the wider the three-sigma yardstick, and the same survey no longer resolves the gap. It also puts a real gap under the operator — not a problem with the people, only the absence of a standard.',
          'Sebaran metode menambah variasi tanpa menggeser rata-rata. Makin lebar ayunannya, makin lebar patokan tiga sigma, dan survei yang sama tidak lagi memisahkan selisihnya. Ia juga menimbulkan selisih nyata pada operator — bukan masalah orangnya, melainkan tidak adanya standar.') },
      { q: T('Control で日常点検に載せる3件として、最も効かないものは', 'Which of these is the weakest item to put on the daily check sheet in Control?', 'Mana butir terlemah untuk dimasukkan ke lembar periksa harian di Control?'),
        choices: [
          T('乾燥出しの含水率を毎日測る', 'Measure the moisture at the kiln exit every day', 'Ukur kadar air di keluaran kiln setiap hari'),
          T('刃の使用時間を記録し、基準で交換する', 'Log the cutter hours and change on the rule', 'Catat jam pakai pisau dan ganti sesuai aturan'),
          T('作業者に注意を呼びかける', 'Remind the operators to take care', 'Ingatkan operator untuk berhati-hati'),
          T('圧締時間をタイマーで固定する', 'Fix the press time with a timer', 'Tetapkan waktu pres dengan pengatur waktu')
        ], answer: 2,
        explain: T('呼びかけは条件ではありません。維持できるのは、値を決めて守れる条件だけです。この演習では作業者に効果そのものがありませんでした。', 'A reminder is not a condition. Only a condition with a value you can set and keep will hold. In this exercise the operator had no effect at all.', 'Pengingat bukanlah kondisi. Hanya kondisi dengan nilai yang dapat ditetapkan dan dijaga yang akan bertahan. Dalam latihan ini operator sama sekali tidak berpengaruh.') }
    ]
  });
})();
