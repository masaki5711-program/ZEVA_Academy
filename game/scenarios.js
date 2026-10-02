/* 木工ライン再建記 — シナリオ定義。
 *
 * 3本とも道具（調査の棚・層別・条件のつまみ）は同じで、**答えだけが違う**。
 * チームを分けて別のラインを割り当てれば、前のチームの答えを写しても外れる。
 *
 * 共通の式（wr = 刃の使用時間 ÷ 20、e = max(0, 含水率 − 11)、
 *          pd = max(0,(60 − 圧締)/10)、gd = max(0,(150 − 番手)/30)）:
 *   dim  = d0 + d1·e + d2·wr + d3·e·wr
 *   glue = g0 + g1·e + g2·pd + g3·e·pd + g4·wr
 *   surf = s0 + s1·e + s2·gd + s3·e·gd + s4·wr
 *
 * scratchpad/scenarios.js で検算した、現状と層別の効き（SEED 777、40ロット/週、16週）:
 *   甲 現状14.3% 含水率だけ5.6% 全部2.0%／含水率の差10.0pt（寸法2.3 接着4.3 面質3.4）室温8.5pt 刃1.5pt
 *   木工乙 現状13.3% 刃だけ8.6%   全部3.3%／刃の差6.8pt（寸法3.0 接着1.7 面質2.1）含水率2.8pt 室温2.1pt
 *   木工丙 現状12.3% 全部2.6%     ／含水率の差3.8pt（接着だけ3.4）刃3.2pt（寸法だけ3.0）室温3.1pt
 *
 * 見分け方は「症状ごとの層別」。3つの症状すべてに効く因子があれば共通の上流条件、
 * 症状ごとに別の因子しか効かないなら共通の原因は無い。
 */
(function () {
  'use strict';
  const S = function (ja, en, id) { return { ja: ja, en: en, id: id }; };
  // stdDone: 5工程のうち、最初から標準作業が整っている工程。
  // どの工程に無いかは「標準作業の棚卸し」を買うまで分からない。

  window.WOODSHOP_SCENARIOS = [
    {
      id: 'ko', scopeBest: { all: { kiln: 36, kilnTemp: 60, incoming: 0, press: 60, glueAmt: 30, toolLife: 40, grit: 150, roomCtl: 0, warmUp: 0.5, batchSel: 0, sharpen: 0 }, up: { kiln: 34, kilnTemp: 90, incoming: 0, toolLife: 40, roomCtl: 0, warmUp: 0, batchSel: 0, sharpen: 0 }, down: { press: 60, glueAmt: 30, grit: 150, roomCtl: 0, warmUp: 1 } }, seed: 777, code: 'A', stdDone: [true, false, false, false, true],
      name: S('木工ライン甲（座卓の天板）', 'Woodshop line A — low table tops', 'Lini kayu A — daun meja rendah'),
      brief: S('ナラの天板。3年前からこの調子で、寸法・接着・面質のどれもが同じくらい悪い。',
        'Oak table tops. It has been like this for three years, and dimension, adhesion and surface are all about equally bad.',
        'Daun meja kayu ek. Sudah tiga tahun begini, dan dimensi, perekatan, serta permukaan sama-sama buruk.'),
      d: [0.5, 0.95, 0.60, 0.40],
      g: [0.6, 1.05, 1.30, 0.95, 0],
      s: [0.7, 1.15, 1.10, 0.85, 0],
      answer: 'mc',
      reveal: S(
        '**共通の原因は材の含水率でした。** 乾燥から出てくる材が湿っていると、寸法は動き、接着は付かず、削れば毛羽立ちます。含水率で層別すると3つの症状すべてに差が出ていたのが、その印でした。',
        '**The shared cause was the moisture content of the stock.** Damp stock out of the kiln moves in size, refuses glue and fuzzes when sanded. Stratifying by moisture put a gap in all three symptoms, and that was the sign.',
        '**Penyebab bersamanya adalah kadar air material.** Material lembap dari kiln berubah ukuran, lemnya tidak mau melekat, dan permukaannya berbulu saat diamplas. Stratifikasi menurut kadar air memberi selisih pada ketiga gejala, dan itulah tandanya.')
    },
    {
      id: 'otsu', scopeBest: { all: { kiln: 32, kilnTemp: 90, incoming: 0, press: 60, glueAmt: 30, toolLife: 10, grit: 150, roomCtl: 0, warmUp: 1, batchSel: 0, sharpen: 1 }, up: { kiln: 24, kilnTemp: 90, incoming: 0, toolLife: 10, roomCtl: 0, warmUp: 0, batchSel: 0, sharpen: 0 }, down: { press: 60, glueAmt: 30, grit: 150, roomCtl: 0, warmUp: 1 } }, seed: 20260919, code: 'B', stdDone: [false, true, false, true, false],
      name: S('木工ライン乙（椅子の座枠）', 'Woodshop line B — chair seat frames', 'Lini kayu B — rangka dudukan kursi'),
      brief: S('ブナの座枠。寸法が重く、面質もそれなりに悪い。接着は他の2つほどではない。',
        'Beech seat frames. Dimension is the heavy one, surface is not far behind, and adhesion is less bad than the other two.',
        'Rangka dudukan kayu beech. Dimensi yang terberat, permukaan tidak jauh di belakang, dan perekatan tidak seburuk keduanya.'),
      d: [0.5, 0.15, 2.60, 0.20],
      g: [0.6, 0.70, 1.25, 0.20, 1.60],
      s: [0.7, 0.20, 1.05, 0.15, 2.00],
      answer: 'wear',
      reveal: S(
        '**共通の原因は刃の摩耗でした。** 摩耗した刃は寸法を動かすだけでなく、切削面を荒らして接着の付きを悪くし、研削の取り代を狂わせます。含水率も接着には効いていましたが、3つすべてに効いていたのは刃のほうでした。',
        '**The shared cause was cutter wear.** A worn cutter does not only move the size: it roughens the cut face so the glue takes badly, and it throws off the stock left for sanding. Moisture did affect adhesion, but the factor touching all three was the cutter.',
        '**Penyebab bersamanya adalah keausan pisau.** Pisau aus tidak hanya menggeser ukuran: ia mengasarkan permukaan potong sehingga lem melekat buruk, dan mengacaukan sisa bahan untuk pengamplasan. Kadar air memang memengaruhi perekatan, tetapi faktor yang menyentuh ketiganya adalah pisau.')
    },
    {
      id: 'hei', scopeBest: { all: { kiln: 34, kilnTemp: 60, incoming: 0, press: 60, glueAmt: 30, toolLife: 10, grit: 150, roomCtl: 0, warmUp: 1, batchSel: 0, sharpen: 0 }, up: { kiln: 24, kilnTemp: 90, incoming: 0, toolLife: 40, roomCtl: 0, warmUp: 1, batchSel: 0, sharpen: 1 }, down: { press: 60, glueAmt: 30, grit: 150, roomCtl: 0, warmUp: 1 } }, seed: 31415926, code: 'C', stdDone: [true, false, true, false, false],
      name: S('木工ライン丙（引出しの側板）', 'Woodshop line C — drawer sides', 'Lini kayu C — sisi laci'),
      brief: S('タモの側板。接着がいちばん重く、寸法がそれに次ぐ。面質はそこまででもない。',
        'Ash drawer sides. Adhesion is the heaviest, dimension next, and the surface is not so bad.',
        'Sisi laci kayu ash. Perekatan yang terberat, lalu dimensi, dan permukaannya tidak begitu buruk.'),
      d: [0.5, 0.05, 2.80, 0.05],
      g: [0.6, 1.80, 1.45, 0.10, 0.05],
      s: [0.7, 0.10, 2.10, 0.10, 0.05],
      answer: 'none',
      reveal: S(
        '**共通の原因はありませんでした。** 寸法は刃の摩耗、接着は含水率と圧締、面質は番手。**現場が「3つとも別々の工程の話だ」と言っていたのは、このラインに関しては正しかった**のです。共通の原因を探す型を覚えると、無いところにも見つけてしまいます。症状ごとに層別して、どの因子も3つすべてには効いていないことを確かめるのが答えでした。',
        '**There was no shared cause.** Dimension came from cutter wear, adhesion from moisture and press time, the surface from grit. **The floor saying “three separate processes” was right about this line.** Once you learn the shape of a hidden shared cause, you start finding one where there is none. The answer was to stratify each symptom and confirm that no factor touched all three.',
        '**Tidak ada penyebab bersama.** Dimensi berasal dari keausan pisau, perekatan dari kadar air dan waktu pres, permukaan dari grit. **Orang-orang di lantai produksi yang bilang “tiga proses terpisah” memang benar untuk lini ini.** Begitu Anda hafal bentuk penyebab bersama yang tersembunyi, Anda mulai menemukannya di tempat yang tidak ada. Jawabannya adalah melakukan stratifikasi per gejala dan memastikan tidak ada faktor yang menyentuh ketiganya.')
    }
    ,
    {
      id: 'tei', seed: 5772156, code: 'D', kind: 'prod', stdDone: [true, false, false, true, false],
      name: S('木工ライン丁（生産性）', 'Woodshop line D — productivity', 'Lini kayu D — produktivitas'),
      brief: S('受注は1日460個。いま出ているのは400個ほどで、足りない分は外注に流している。不良ではなく「数が出ない」ほうの問題。',
        'The order book is 460 a day. The line ships about 400, and the rest goes to a subcontractor. This one is not about defects but about not making enough.',
        'Pesanannya 460 per hari. Lini mengirim sekitar 400, sisanya ke subkontraktor. Yang ini bukan soal cacat, melainkan soal kurangnya jumlah.'),
      answer: 'setup',
      reveal: S(
        '**日産を決めていたのは段取りでした。** 工程3が遅いのではなく、工程3が待っていたのです。'
        + '1日480分のうち45分が段取りに、40分が立上げの予熱に消えていました。'
        + 'そして段取り45分のうち33分は、機械を止めなくてもできる仕事でした。',
        '**The changeover was setting the output.** Process 3 was not slow; process 3 was waiting. '
        + 'Of the 480 minutes in a day, 45 went to the changeover and 40 to warming up. '
        + 'And of those 45 changeover minutes, 33 were work that never needed the machine stopped.',
        '**Pergantianlah yang menentukan output.** Proses 3 tidak lambat; proses 3 sedang menunggu. '
        + 'Dari 480 menit sehari, 45 menit untuk pergantian dan 40 menit untuk pemanasan. '
        + 'Dan dari 45 menit pergantian itu, 33 menit adalah kerja yang tidak pernah memerlukan mesin berhenti.')
    }
    ,
    {
      /* ---- 成形ライン甲 ----
       * 模型は木工と同じ。違うのは呼び名（words）と係数、そして答えだけ。
       * 答えは「成形機の個体差」。2台の平均は1.0なので全体の水準は動かず、
       * 機械で層別してはじめて差が出る。標準作業をそろえると作業者の差は消え、
       * 機械の差だけが残る——残ったほうが本物、という形にしてある。
       */
      id: 'bo', seed: 1618033, code: 'E', stdDone: [false, true, false, true, false],
      // 金額の山は「悪いほうの機械を整備する(machFix)」を含む。scratchpad/bestsearch.js の座標降下で 2026-09-22 に探し直した。
      scopeBest: { all: { kiln: 34, kilnTemp: 70, incoming: 0, press: 60, glueAmt: 30, toolLife: 35, grit: 150, roomCtl: 0, warmUp: 1, batchSel: 0, sharpen: 1, machFix: 1 }, up: { kiln: 24, kilnTemp: 90, incoming: 0, toolLife: 30, roomCtl: 0, warmUp: 0, batchSel: 0, sharpen: 1, machFix: 1 }, down: { press: 60, glueAmt: 30, grit: 150, roomCtl: 0, warmUp: 1 } },
      name: S('成形ライン甲（操作パネルのABS筐体）', 'Moulding line A — ABS control-panel housings', 'Lini molding A (cetak injeksi) — rumah panel kontrol ABS'),
      brief: S('ABSの射出成形。バリ・ヒケ・そりの3つが出ている。材料は吸湿するので、投入前に乾燥させている。',
        'Injection moulding in ABS. Flash, sink marks and warpage. The resin takes up moisture, so it is dried before it goes in.',
        'Cetak injeksi ABS. Bari, cekungan, dan cacat melengkung. Resinnya menyerap lembap, jadi dikeringkan sebelum masuk.'),
      // 2台の成形機のうち片方だけ具合が悪い。2台の平均は1.0。
      mach: 0.55,
      d: [0.5, 0.05, 2.60, 0.05],
      g: [0.6, 1.70, 1.50, 0.15, 0.05],
      s: [0.7, 0.10, 2.20, 0.10, 0.05],
      answer: 'machine',
      intro: [
        ['boss', S('新しく入れた成形のラインだ。バリが出る、ヒケが出る、そる。**3つとも別の話**だと聞いている。'
          + '機械は同じものを2台、同じ条件で回している。',
          'This is the new moulding line. Flash, sink marks, warpage. I am told they are **three separate problems**. '
          + 'Two identical machines, running the same settings.',
          'Ini lini molding yang baru. Bari, cekungan, cacat melengkung. Katanya ini **tiga masalah terpisah**. '
          + 'Dua mesin identik, berjalan dengan setelan yang sama.')],
        ['lead', S('材料の乾燥でしょう。ABSは湿気を吸うので、雨の日は目に見えて悪くなります。',
          'It is the drying. ABS takes up moisture, and on a wet day you can see the difference.',
          'Ini soal pengeringan. ABS menyerap lembap, dan pada hari hujan bedanya terlihat.')],
        ['eng', S('そう見えます。ただ、**2台を分けて数えたことが一度もありません。**'
          + '同じ機械だから同じはず、という前提で、ずっと足して見ています。',
          'It looks that way. But **we have never once counted the two machines separately.** '
          + 'They are the same model, so we assumed they behave the same, and we have always added them together.',
          'Tampaknya begitu. Tetapi **kami belum pernah sekali pun menghitung kedua mesin secara terpisah.** '
          + 'Modelnya sama, jadi kami menganggap perilakunya sama, dan selalu menjumlahkannya.')]
      ],
      // どの点検が効くかは原因で変わる。ここでは金型ごとに分けて見ることが要。
      controls: [
        { id: 'mach', ok: true, label: S('成形機ごとに不良を分けて数える', 'Count the defects separately for each machine', 'Hitung cacat terpisah untuk tiap mesin') },
        { id: 'tool', ok: true, label: S('金型の連続運転時間を記録し、基準で手入れする', 'Log the mould hours and service it on the rule', 'Catat jam cetakan dan rawat sesuai aturan') },
        { id: 'mc', ok: true, label: S('乾燥後の水分率を毎日測る', 'Measure the moisture after drying every day', 'Ukur kadar air setelah pengeringan setiap hari') },
        { id: 'press', ok: true, label: S('保圧時間をタイマーで固定する', 'Fix the holding time with a timer', 'Tetapkan waktu tahan dengan pengatur waktu') },
        { id: 'room', ok: false, label: S('室温を毎日記録する', 'Record the room temperature every day', 'Catat suhu ruang setiap hari') },
        { id: 'worker', ok: false, label: S('作業者に注意を呼びかける', 'Remind the operators to take care', 'Ingatkan operator untuk berhati-hati') }
      ],
      // 呼び名だけの差し替え。模型の中身は木工と同じものが動いている。
      words: {
        'scale.mc': 0.01,
        'dec.mc': 2,
        'proc.1': S('1 材料乾燥', '1 Drying', '1 Pengeringan'),
        'proc.2': S('2 計量・可塑化', '2 Metering', '2 Penakaran'),
        'proc.3': S('3 射出', '3 Injection', '3 Injeksi'),
        'proc.4': S('4 保圧・冷却', '4 Hold and cool', '4 Tahan dan dinginkan'),
        'proc.5': S('5 取出し・ゲートカット', '5 Eject and degate', '5 Keluarkan dan potong gate'),
        'sym.dim': S('バリ', 'Flash', 'Bari'),
        'sym.glue': S('ヒケ', 'Sink marks', 'Cekungan'),
        'sym.surf': S('そり', 'Warpage', 'Cacat melengkung'),
        'fac.mc': S('乾燥後の水分率', 'Moisture after drying', 'Kadar air setelah pengeringan'),
        'fac.mc.b0': S('0.11%未満', 'Below 0.11%', 'Di bawah 0,11%'),
        'fac.mc.b1': S('0.11%以上', '0.11% and over', '0,11% ke atas'),
        'fac.wear.b0': S('20時間未満', 'Under 20 h', 'Di bawah 20 jam'),
        'fac.wear.b1': S('20時間以上', '20 h and over', '20 jam ke atas'),
        'fac.wear': S('金型の連続運転時間', 'Mould hours', 'Jam cetakan'),
        'fac.machine': S('成形機', 'Machine', 'Mesin'),
        'mach.0': S('1号機', 'Machine 1', 'Mesin 1'),
        'mach.1': S('2号機', 'Machine 2', 'Mesin 2'),
        'suspect.mc': S('材料の水分率', 'The moisture of the material', 'Kadar air material'),
        'suspect.wear': S('金型の摩耗', 'Mould wear', 'Keausan cetakan'),
        'suspect.machine': S('成形機の個体差', 'The difference between the two machines', 'Perbedaan antara kedua mesin'),
        'knobs.kiln': S('乾燥の時間', 'Drying hours', 'Jam pengeringan'),
        'knobs.kiln.note': S('水分率の中心を下げる', 'moves the centre of the moisture', 'menggeser pusat kadar air'),
        'knobs.kilnTemp': S('乾燥機の温度', 'Dryer temperature', 'Suhu pengering'),
        'knobs.kilnTemp.note': S('低いほど水分率の幅が狭くなる。中心ではなく幅の話',
          'lower narrows the spread of the moisture, not its centre',
          'makin rendah makin sempit sebaran kadar air, bukan pusatnya'),
        'knobs.incoming': S('投入前に水分率ではじく', 'Screen the material before it goes in', 'Saring material sebelum masuk'),
        'knobs.incoming.note': S('0.125%を超えた材料を止める。乾燥そのものは直らないが、すぐ効く',
          'stops material above 0.125%: it fixes nothing at the dryer but works at once',
          'menahan material di atas 0,125%: tidak memperbaiki pengering tetapi langsung bekerja'),
        'knobs.kiln.unit': 'h',
        'knobs.press.unit': S('秒', 's', 'detik'),
        'knobs.glueAmt.unit': S('mm', ' mm', ' mm'),
        'knobs.grit.unit': S('秒', ' s', ' detik'),
        'knobs.toolLife.unit': S('時間', ' h', ' jam'),
        'knobs.press': S('保圧の時間', 'Holding time', 'Waktu tahan'),
        'knobs.glueAmt': S('クッション量', 'Cushion', 'Cushion'),
        'knobs.glueAmt.note': S('少なすぎても多すぎてもヒケが出る。両側に壁がある',
          'too little and too much both leave sink marks: this one has a wall on each side',
          'terlalu sedikit dan terlalu banyak sama-sama meninggalkan cekungan: yang ini berdinding di kedua sisi'),
        'knobs.toolLife': S('金型の手入れ周期', 'Mould service interval', 'Interval perawatan cetakan'),
        'knobs.toolLife.note': S('短くすると効くが、費用が重い', 'shorter works, and it is expensive', 'lebih pendek berdampak, dan itu mahal'),
        'knobs.grit': S('冷却の時間', 'Cooling time', 'Waktu pendinginan'),
        'knobs.grit.note': S('150で頭打ち', 'it stops paying past 150', 'tidak lagi berpengaruh di atas 150'),
        'knobs.warmUp': S('金型の予熱', 'Pre-heat the mould', 'Panaskan cetakan lebih dulu'),
        'knobs.sharpen': S('パーティング面の途中清掃', 'Clean the parting line mid-run', 'Bersihkan parting line di tengah proses'),
        'knobs.batchSel': S('入荷ロットの選別', 'Reject incoming batches', 'Tolak lot masuk'),
        'shop.mc': S('乾燥後の水分率を実測する', 'Measure the moisture after drying', 'Ukur kadar air setelah pengeringan'),
        'shop.mc.gain': S('乾燥機から出てくる材料の状態が見えるようになる',
          'Shows the state of the material leaving the dryer',
          'Menampilkan kondisi material yang keluar dari pengering'),
        'shop.wear': S('金型の連続運転時間を記録する', 'Log the mould hours', 'Catat jam cetakan'),
        'shop.wear.gain': S('金型の摩耗で層別できる', 'Lets you stratify by mould wear', 'Memungkinkan stratifikasi menurut keausan cetakan'),
        'shop.attr': S('ロット属性の記録（作業者・成形機・室温）', 'Lot attributes (operator, machine, room temperature)', 'Atribut lot (operator, mesin, suhu ruang)'),
        'shop.attr.gain': S('この3つで層別できるようになる。**2台の成形機を分けて数えられるのもここから。**記録を始めた週より前には遡れない',
          'Lets you stratify by these three. **This is also what lets you count the two machines apart.** It cannot reach back before the week you start recording',
          'Memungkinkan stratifikasi menurut ketiganya. **Ini juga yang memungkinkan Anda menghitung kedua mesin secara terpisah.** Tidak dapat menjangkau sebelum minggu pencatatan dimulai'),
        'shop.daily.gain': S('バリ・ヒケ・そりを分けて数える。症状ごとに層別できるようになる',
          'Count flash, sink marks and warpage separately, so you can stratify each symptom on its own',
          'Hitung bari, cekungan, dan cacat melengkung terpisah, agar tiap gejala dapat distratifikasi sendiri'),
        'shop.doe.gain': S('本番を止めずに乾燥時間 × 保圧時間の4通りを流す。組み合わせたときだけ出る不良が見える',
          'Runs four combinations of drying hours by holding time without stopping production, so a defect that appears only when two coincide becomes visible',
          'Menjalankan empat kombinasi jam pengeringan dan waktu tahan tanpa menghentikan produksi, sehingga cacat yang hanya muncul saat keduanya bertemu menjadi terlihat'),
        // 条件が候補に上がった理由。木工の言葉(在炉時間・刃)をこのラインの言葉に置き換える。
        'unlock.kiln': S('乾燥の時間が守られていないと分かった。乾燥の時間を条件として動かせる',
          'The drying hours are not being kept. Drying hours can now be set as a condition',
          'Jam pengeringan tidak dipatuhi. Jam pengeringan kini dapat diatur sebagai kondisi'),
        'unlock.kilnTemp': S('水分率の分布に幅がある。中心とは別に、幅を決める条件(乾燥機の温度)を動かせる',
          'The moisture distribution has a spread of its own. Apart from the centre, the dryer temperature that sets the spread can now be moved',
          'Distribusi kadar air punya sebaran tersendiri. Selain pusatnya, suhu pengering yang menentukan sebaran kini dapat digerakkan'),
        'unlock.toolLife': S('金型の手入れに基準が無いと分かった。手入れ周期を条件として動かせる',
          'There is no rule for servicing the mould. The service interval can now be set as a condition',
          'Tidak ada aturan perawatan cetakan. Interval perawatan kini dapat diatur sebagai kondisi'),
        'unlock.press': S('症状ごとに数えて、どの工程の不良かが分かれた。保圧の時間を動かせる',
          'Counting by symptom separated the defects by process. Holding time can now be moved',
          'Menghitung per gejala memisahkan cacat menurut prosesnya. Waktu tahan kini dapat digerakkan'),
        'unlock.glueAmt': S('症状ごとに数えて、どの工程の不良かが分かれた。クッション量を動かせる',
          'Counting by symptom separated the defects by process. The cushion can now be moved',
          'Menghitung per gejala memisahkan cacat menurut prosesnya. Cushion kini dapat digerakkan'),
        'unlock.grit': S('症状ごとに数えて、どの工程の不良かが分かれた。冷却の時間を動かせる',
          'Counting by symptom separated the defects by process. Cooling time can now be moved',
          'Menghitung per gejala memisahkan cacat menurut prosesnya. Waktu pendinginan kini dapat digerakkan'),
        'unlock.warmUp': S('朝いちばんと昼休み明けに不良が高い。金型の予熱を手として使える',
          'Defects run high in the first hour and after lunch. Pre-heating the mould is now a move',
          'Cacat tinggi pada jam pertama dan setelah makan siang. Memanaskan cetakan lebih dulu kini dapat dipakai sebagai langkah'),
        'unlock.batchSel': S('水分率が入荷ロットごとにまとまって動いている。ロットごと返す手を使える',
          'Moisture moves in batch-sized steps. Rejecting a whole incoming batch is now a move',
          'Kadar air bergerak per batch masuk. Menolak seluruh batch masuk kini dapat dipakai sebagai langkah'),
        'unlock.sharpen': S('金型の連続運転時間に沿って不良が増えている。途中でパーティング面を清掃する手を使える',
          'Defects climb with mould hours. Cleaning the parting line mid-run is now a move',
          'Cacat naik seiring jam cetakan. Membersihkan parting line di tengah proses kini dapat dipakai sebagai langkah'),
        'recon.walk': S('乾燥ホッパーの滞留時間が、銘柄によってまちまちになっている。'
          + '2台の成形機は同じ設定で回っているが、2号機のほうがゲート付近の汚れが目立つ。'
          + '取出しの作業者が「日によって全然ちがう」と言う。',
          'The dwell time in the dryer hopper varies from one resin grade to another. '
          + 'The two machines run the same settings, but number 2 has visibly more residue around the gate. '
          + 'The operator at the eject station says it is “completely different depending on the day”.',
          'Waktu tinggal material di hopper pengering berbeda-beda menurut grade resinnya. '
          + 'Kedua mesin berjalan dengan setelan sama, tetapi nomor 2 jelas lebih banyak sisa di sekitar gate. '
          + 'Operator di stasiun take-out bilang “sangat berbeda tergantung harinya”.'),
        'recon.files': S('月ごとの不良率は11〜15%の間で上下している。冬に高く、梅雨どきにも高い。'
          + '2台を分けた記録はどこにも残っていない。',
          'The monthly defect rate swings between 11 and 15 per cent, high in winter and high again in the rainy season. '
          + 'Nowhere is there a record that separates the two machines.',
          'Tingkat cacat bulanan berfluktuasi antara 11 dan 15 persen, tinggi di musim dingin dan tinggi lagi di musim hujan. '
          + 'Tidak ada satu pun catatan yang memisahkan kedua mesin.'),
        'recon.ask': S('**班長タケダ**「Bさんの日は数字が悪い。腕の問題です」。'
          + '**保全**「金型は不具合が出るまで使います。手入れの記録は取っていません」。'
          + '**材料の担当**「乾燥は24時間で決まっています。でも、入荷が遅れた日は短くして出します」。',
          '**Takeda, the line leader:** “The numbers are worse on B’s days. It is a skill problem.” '
          + '**Maintenance:** “We run a mould until it gives trouble. We keep no record of servicing.” '
          + '**The material operator:** “Twenty-four hours is the rule. But on days when the material arrives late we cut it short and run anyway.”',
          '**Takeda, leader lini:** “Angkanya lebih buruk pada hari B. Ini masalah keterampilan.” '
          + '**Pemeliharaan:** “Kami memakai cetakan sampai bermasalah. Kami tidak mencatat perawatannya.” '
          + '**Operator material:** “Dua puluh empat jam adalah aturannya. Tapi pada hari material datang terlambat, kami persingkat dan tetap jalankan.”'),
        'lesson.confound': S('**室温は犯人ではありませんが、成形機は犯人でした。**室温は材料の状態と一緒に動くだけです。'
          + '一方、2台の成形機の差は、標準作業をそろえたあとも残りました。'
          + '**層別で差が出ることと、そこに原因があることは別の話ですが、「手を打っても消えない差」は本物です。**'
          + '作業者の差は標準で消え、機械の差は消えませんでした。',
          '**Room temperature was not the culprit, but the machine was.** The room simply moves with the state of the material. '
          + 'The gap between the two machines, on the other hand, survived even after the standard work was in place. '
          + '**A gap in a stratification is not the same thing as a cause — but a gap that will not go away when you act on it is real.** '
          + 'The operator gap vanished with the standard. The machine gap did not.',
          '**Suhu ruang bukan pelakunya, tetapi mesinnya memang pelakunya.** Ruangan hanya bergerak bersama kondisi material. '
          + 'Sebaliknya, selisih antara kedua mesin bertahan bahkan setelah kerja standar tersusun. '
          + '**Selisih dalam stratifikasi bukanlah penyebab — tetapi selisih yang tidak hilang ketika Anda bertindak adalah nyata.** '
          + 'Selisih antar operator lenyap dengan standar. Selisih antar mesin tidak.'),
        'lesson.money': S('**不良率をいちばん下げる条件と、金額がいちばん大きくなる条件は違います。**'
          + '金型の手入れ周期を40時間から10時間に詰めると不良率は下がりますが、費用は年324万円かかります。'
          + 'このラインでは、**条件を締めるより先に2号機を直すほうが安く効きます。**'
          + '条件のつまみは2台の両方に等しく効くので、片方だけ悪い状態を条件で埋めようとすると、'
          + '良いほうの機械にも同じ費用を払うことになるからです。'
          + '**④に置くのは不良率ではなく、効果金額です。**',
          '**The settings that minimise the defect rate are not the settings that maximise the money.** '
          + 'Taking the mould service interval from 40 hours to 10 lowers the rate but costs ¥3.24 million a year. '
          + 'On this line, **fixing machine 2 is cheaper and works better than tightening the settings.** '
          + 'A setting acts on both machines equally, so paying to cover for one bad machine means paying the same on the good one too. '
          + '**What goes in ④ is the money, not the rate.**',
          '**Setelan yang meminimalkan tingkat cacat bukanlah setelan yang memaksimalkan uang.** '
          + 'Memperpendek interval perawatan cetakan dari 40 jam ke 10 menurunkan tingkatnya tetapi berbiaya ¥3.240.000 per tahun. '
          + 'Di lini ini, **memperbaiki mesin 2 lebih murah dan lebih berdampak daripada mengetatkan setelan.** '
          + 'Setelan bekerja pada kedua mesin secara setara, jadi membayar untuk menutupi satu mesin buruk berarti membayar sama pada mesin yang baik. '
          + '**Yang masuk ke ④ adalah uangnya, bukan tingkatnya.**'),
        'ctrl.mc': S('乾燥後の水分率を毎日測る', 'Measure the moisture after drying every day', 'Ukur kadar air setelah pengeringan setiap hari')
      },
      reveal: S(
        '**共通の原因は、材料でも金型の摩耗でもなく「2台のうち片方の成形機」でした。**'
        + '全体の平均で見ているかぎり、この差は出てきません。2台を足してならしてしまうからです。'
        + 'ロット属性を記録して成形機で層別すると、片方だけが一貫して悪いことが分かります。'
        + '**しかも、標準作業をそろえると作業者の差は消えますが、機械の差は残ります。**'
        + '消える差と残る差——残ったほうが本物です。'
        + '水分率が効いて見えたのは本当ですが、それはヒケにだけで、バリとそりには効いていません。',
        '**The shared cause was neither the material nor the mould wear: it was one of the two machines.** '
        + 'You will never see it in the overall mean, because adding the two together averages it away. '
        + 'Record the lot attributes, stratify by machine, and one of them is consistently worse. '
        + '**And when you get the standard work in place, the operator gap disappears while the machine gap stays.** '
        + 'A gap that vanishes and a gap that survives — the one that survives is the real one. '
        + 'Moisture did matter, but only for the sink marks, not for the flash or the warpage.',
        '**Penyebab bersamanya bukan material dan bukan keausan cetakan, melainkan salah satu dari kedua mesin.** '
        + 'Anda tidak akan pernah melihatnya pada rata-rata keseluruhan, karena menjumlahkan keduanya meratakannya. '
        + 'Catat atribut lot, stratifikasi menurut mesin, dan salah satunya konsisten lebih buruk. '
        + '**Dan ketika kerja standar tersusun, selisih antar operator hilang sementara selisih antar mesin bertahan.** '
        + 'Selisih yang lenyap dan selisih yang bertahan — yang bertahan itulah yang nyata. '
        + 'Kadar air memang berpengaruh, tetapi hanya pada cekungan, bukan pada bari atau cacat melengkung.')
    }
    ,
    {
      /* ---- 組立ライン甲：製品の総組立 ----
       * 答えは「人によって手順が違うこと」。ただし原因は人ではなく、標準が無いこと。
       * このラインだけ wrk を持たせ、3人の平均が1.0を超えるようにしてある。
       * つまり標準化そのものが水準を下げる手になっていて、他のラインとは効き方が違う。
       */
      id: 'asm', seed: 2718281, code: 'F', stdDone: [true, false, false, false, false],
      scopeBest: { all: { kiln: 34, kilnTemp: 60, incoming: 0, press: 60, glueAmt: 30, toolLife: 40, grit: 150, roomCtl: 0, warmUp: 1, batchSel: 0, sharpen: 0 }, up: { kiln: 34, kilnTemp: 70, incoming: 0, toolLife: 40, roomCtl: 0, warmUp: 0, batchSel: 0, sharpen: 0 }, down: { press: 60, glueAmt: 30, grit: 150, roomCtl: 0, warmUp: 1 } },
      name: S('組立ライン甲（電動工具の総組立）', 'Assembly line A — final assembly of power tools', 'Lini perakitan A — perakitan akhir perkakas listrik'),
      brief: S('完成品の総組立。嵌合不良・ねじ締結不良・外観キズの3つが出ている。部品は協力会社から届く。',
        'Final assembly of the finished product. Bad fits, bad screw joints and cosmetic scratches. The parts arrive from suppliers.',
        'Perakitan akhir produk jadi. Pemasangan tidak pas, sambungan sekrup buruk, dan goresan tampilan. Part datang dari pemasok.'),
      // 手順差。3人の平均は1.27で、標準をそろえるとこれが1.0に近づく。
      wrk: { A: 0.85, B: 2.05, C: 0.90 },
      d: [0.5, 1.60, 0.35, 0.15],
      g: [0.6, 0.35, 1.70, 0.10, 0.30],
      s: [0.7, 0.20, 1.90, 0.10, 0.20],
      answer: 'worker',
      intro: [
        ['boss', S('総組立だ。**はまらない、ねじが効かない、キズが付く。**'
          + '部品は協力会社から来る。うちは組むだけだ。',
          'Final assembly. **Parts that will not seat, screws that will not hold, scratches.** '
          + 'The parts come from suppliers. All we do here is put them together.',
          'Perakitan akhir. **Part yang tidak duduk, sekrup yang tidak menahan, goresan.** '
          + 'Part datang dari pemasok. Kami di sini hanya merakit.')],
        ['lead', S('部品が悪いんですよ。はめあいがロットで違う。協力会社に締めてもらえば済む話です。',
          'It is the parts. The fit changes from lot to lot. Lean on the supplier and it goes away.',
          'Ini soal partnya. Kesesuaiannya berubah antar lot. Tekan pemasoknya dan masalahnya hilang.')],
        ['eng', S('部品のせいもあるでしょう。ただ、**この工程は5つのうち4つに作業手順書がありません。**'
          + '同じ製品でも、組む人によって順番も力の入れ方も違います。'
          + 'そのままだと、部品の差と手順の差が混ざったものを見ることになります。',
          'The parts are part of it. But **four of the five processes here have no written procedure.** '
          + 'The same product is built in a different order, with different force, depending on who builds it. '
          + 'Measure it as it is and you will be looking at the parts mixed with the method.',
          'Partnya memang berperan. Tetapi **empat dari lima proses di sini tidak punya prosedur tertulis.** '
          + 'Produk yang sama dirakit dengan urutan dan tenaga berbeda tergantung siapa yang merakit. '
          + 'Ukur apa adanya dan Anda akan melihat part bercampur dengan metode.')]
      ],
      controls: [
        { id: 'std', ok: true, label: S('工程ごとに作業手順書を掲示し、順番と力の入れ方を決める', 'Post a written procedure for each process, fixing the order and the force', 'Pasang prosedur tertulis tiap proses, menetapkan urutan dan tenaga') },
        { id: 'torque', ok: true, label: S('締付トルクを毎日校正する', 'Calibrate the tightening torque every day', 'Kalibrasi torsi pengencangan setiap hari') },
        { id: 'tool', ok: true, label: S('ビットの使用時間を記録し、基準で交換する', 'Log the bit hours and change on the rule', 'Catat jam pakai mata obeng dan ganti sesuai aturan') },
        { id: 'fit', ok: true, label: S('受入ではめあい代を毎ロット測る', 'Measure the fit clearance on every incoming lot', 'Ukur celah suaian pada tiap lot masuk') },
        { id: 'room', ok: false, label: S('室温を毎日記録する', 'Record the room temperature every day', 'Catat suhu ruang setiap hari') },
        { id: 'worker', ok: false, label: S('作業者に注意を呼びかける', 'Remind the operators to take care', 'Ingatkan operator untuk berhati-hati') }
      ],
      words: {
        'scale.mc': 10,
        'dec.mc': 0,
        'unit.mc': 'μm',
        'proc.1': S('1 部品受入', '1 Goods-in', '1 Penerimaan'),
        'proc.2': S('2 サブ組立', '2 Sub-assembly', '2 Sub-rakitan'),
        'proc.3': S('3 本体組付', '3 Main build', '3 Rakitan utama'),
        'proc.4': S('4 ねじ締結', '4 Screw fastening', '4 Pengencangan sekrup'),
        'proc.5': S('5 検査・梱包', '5 Inspect and pack', '5 Periksa dan kemas'),
        'sym.dim': S('嵌合不良', 'Bad fit', 'Pemasangan tidak pas'),
        'sym.glue': S('ねじ締結不良', 'Bad screw joint', 'Sambungan sekrup buruk'),
        'sym.surf': S('外観キズ', 'Cosmetic scratch', 'Goresan tampilan'),
        'fac.mc': S('部品のはめあい代', 'Fit clearance', 'Celah suaian'),
        'fac.mc.b0': S('110μm未満', 'Below 110 μm', 'Di bawah 110 μm'),
        'fac.mc.b1': S('110μm以上', '110 μm and over', '110 μm ke atas'),
        'fac.wear': S('ビットの使用時間', 'Bit hours', 'Jam pakai mata obeng'),
        'fac.worker': S('組む人', 'Who built it', 'Siapa yang merakit'),
        'suspect.mc': S('部品のはめあい代', 'The fit clearance of the parts', 'Celah suaian part'),
        'suspect.wear': S('ビットの摩耗', 'Bit wear', 'Keausan mata obeng'),
        'suspect.worker': S('人によって手順が違うこと', 'That people work to different procedures', 'Bahwa orang bekerja dengan prosedur berbeda'),
        'suspect.machine': S('電動ドライバの個体差', 'The difference between the drivers', 'Perbedaan antar obeng listrik'),
        'knobs.kiln': S('協力会社での寸法追い込み', 'Supplier work on the dimension', 'Kerja pemasok pada dimensi'),
        'knobs.kiln.unit': S('h/週', ' h/wk', ' jam/minggu'),
        'knobs.kiln.note': S('はめあい代の中心を狙いに寄せる', 'brings the centre of the clearance towards nominal', 'mendekatkan pusat celah suaian ke nominal'),
        'knobs.kilnTemp': S('ならし場の湿度管理', 'Humidity where parts settle', 'Kelembapan ruang aklimatisasi part'),
        'knobs.kilnTemp.unit': '%RH',
        'knobs.kilnTemp.note': S('低いほど寸法の幅が狭くなる。中心ではなく幅の話',
          'lower narrows the spread of the dimension, not its centre',
          'makin rendah makin sempit sebaran dimensi, bukan pusatnya'),
        'knobs.incoming': S('受入ではめあい代ではじく', 'Screen the incoming parts on the clearance', 'Saring part masuk menurut kelonggaran'),
        'knobs.incoming.note': S('125μmを超えた部品を止める。協力会社は直らないが、すぐ効く',
          'stops parts above 125 μm: it fixes nothing at the supplier but works at once',
          'menahan part di atas 125 μm: tidak memperbaiki pemasok tetapi langsung bekerja'),
        'knobs.press': S('ねじ締付後の保持時間', 'Hold time after fastening', 'Waktu tahan setelah pengencangan'),
        'knobs.press.note': S('60秒で頭打ち', 'it stops paying past 60 s', 'tidak lagi berpengaruh di atas 60 detik'),
        'knobs.glueAmt': S('締付トルク', 'Tightening torque', 'Torsi pengencangan'),
        'knobs.glueAmt.unit': S('N·m', ' N·m', ' N·m'),
        'knobs.glueAmt.note': S('30が最適。弱いと緩み、強いとねじ山をなめる。両側に壁がある',
          '30 is the optimum: too little and it works loose, too much and the thread strips. A wall on each side',
          '30 optimum: terlalu kecil jadi longgar, terlalu besar ulirnya dol. Berdinding di kedua sisi'),
        'knobs.toolLife': S('ビットの交換周期', 'Bit change interval', 'Interval ganti mata obeng'),
        'knobs.grit': S('治具の清掃周期', 'Jig cleaning interval', 'Interval pembersihan jig'),
        'knobs.grit.unit': S('分', ' min', ' menit'),
        'knobs.grit.note': S('150分で頭打ち', 'it stops paying past 150 min', 'tidak lagi berpengaruh di atas 150 menit'),
        'knobs.warmUp': S('始業前の治具ならし', 'Settle the jigs before the shift', 'Penyetelan jig sebelum shift'),
        'knobs.sharpen': S('ビットの途中点検', 'Check the bit mid-life', 'Periksa mata obeng di tengah umur'),
        'knobs.batchSel': S('入荷ロットの選別', 'Reject incoming lots', 'Tolak lot masuk'),
        'shop.mc': S('部品のはめあい代を実測する', 'Measure the fit clearance of the parts', 'Ukur celah suaian part'),
        'shop.mc.gain': S('協力会社から届く部品の状態が見えるようになる',
          'Shows the state of the parts arriving from the supplier',
          'Menampilkan kondisi part yang datang dari pemasok'),
        'shop.wear': S('ビットの使用時間を記録する', 'Log the bit hours', 'Catat jam pakai mata obeng'),
        'shop.wear.gain': S('ビットの摩耗で層別できる', 'Lets you stratify by bit wear', 'Memungkinkan stratifikasi menurut keausan mata obeng'),
        'shop.attr': S('ロット属性の記録（組む人・ドライバ・室温）', 'Lot attributes (who built it, driver, room temperature)', 'Atribut lot (perakit, obeng, suhu ruang)'),
        'shop.attr.gain': S('この3つで層別できるようになる。**誰が組んだかで分けて数えられるのもここから。**記録を始めた週より前には遡れない',
          'Lets you stratify by these three. **This is also what lets you count by who built it.** It cannot reach back before the week you start recording',
          'Memungkinkan stratifikasi menurut ketiganya. **Ini juga yang memungkinkan menghitung menurut perakitnya.** Tidak dapat menjangkau sebelum minggu pencatatan dimulai'),
        'shop.daily.gain': S('嵌合・ねじ・キズを分けて数える。症状ごとに層別できるようになる',
          'Count bad fits, bad joints and scratches separately, so you can stratify each symptom on its own',
          'Hitung pemasangan, sambungan, dan goresan terpisah, agar tiap gejala dapat distratifikasi sendiri'),
        'shop.doe.gain': S('本番を止めずに寸法追い込み × 保持時間の4通りを流す。組み合わせたときだけ出る不良が見える',
          'Runs four combinations of supplier work by hold time without stopping production, so a defect that appears only when two coincide becomes visible',
          'Menjalankan empat kombinasi kerja pemasok dan waktu tahan tanpa menghentikan produksi, sehingga cacat yang hanya muncul saat keduanya bertemu menjadi terlihat'),
        'ctrl.mc': S('受入ではめあい代を毎ロット測る', 'Measure the fit clearance on every incoming lot', 'Ukur celah suaian pada tiap lot masuk'),
        // 条件が候補に上がった理由。木工の言葉(在炉時間・刃)をこのラインの言葉に置き換える。
        'unlock.kiln': S('部品のはめあいが測られずに流れていると分かった。協力会社での寸法追い込みを条件として動かせる',
          'Parts are flowing in with the fit unmeasured. Supplier work on the dimension can now be set as a condition',
          'Part mengalir masuk tanpa celah suaian diukur. Kerja pemasok pada dimensi kini dapat diatur sebagai kondisi'),
        'unlock.kilnTemp': S('はめあい代の分布に幅がある。中心とは別に、幅を決める条件(ならし場の湿度)を動かせる',
          'The clearance distribution has a spread of its own. Apart from the centre, the humidity where parts settle can now be moved',
          'Distribusi celah suaian punya sebaran tersendiri. Selain pusatnya, kelembapan ruang aklimatisasi kini dapat digerakkan'),
        'unlock.toolLife': S('ビットを交換する基準が無いと分かった。交換周期を条件として動かせる',
          'There is no rule for changing the bit. The change interval can now be set as a condition',
          'Tidak ada aturan penggantian mata obeng. Interval ganti kini dapat diatur sebagai kondisi'),
        'unlock.press': S('症状ごとに数えて、どの工程の不良かが分かれた。締付後の保持時間を動かせる',
          'Counting by symptom separated the defects by process. Hold time after fastening can now be moved',
          'Menghitung per gejala memisahkan cacat menurut prosesnya. Waktu tahan setelah pengencangan kini dapat digerakkan'),
        'unlock.glueAmt': S('症状ごとに数えて、どの工程の不良かが分かれた。締付トルクを動かせる',
          'Counting by symptom separated the defects by process. Tightening torque can now be moved',
          'Menghitung per gejala memisahkan cacat menurut prosesnya. Torsi pengencangan kini dapat digerakkan'),
        'unlock.grit': S('症状ごとに数えて、どの工程の不良かが分かれた。治具の清掃周期を動かせる',
          'Counting by symptom separated the defects by process. The jig cleaning interval can now be moved',
          'Menghitung per gejala memisahkan cacat menurut prosesnya. Interval pembersihan jig kini dapat digerakkan'),
        'unlock.warmUp': S('朝いちばんと昼休み明けに不良が高い。始業前の治具ならしを手として使える',
          'Defects run high in the first hour and after lunch. Settling the jigs before the shift is now a move',
          'Cacat tinggi pada jam pertama dan setelah makan siang. Penyetelan jig sebelum shift kini dapat dipakai sebagai langkah'),
        'unlock.batchSel': S('はめあい代が入荷ロットごとにまとまって動いている。ロットごと返す手を使える',
          'The clearance moves in lot-sized steps. Rejecting a whole incoming lot is now a move',
          'Celah suaian bergerak per lot masuk. Menolak seluruh lot masuk kini dapat dipakai sebagai langkah'),
        'unlock.sharpen': S('ビットの使用時間に沿って不良が増えている。交換を待たずに途中で点検する手を使える',
          'Defects climb with bit hours. Checking the bit mid-life is now a move',
          'Cacat naik seiring jam pakai mata obeng. Memeriksa mata obeng di tengah umur kini dapat dipakai sebagai langkah'),
        'recon.walk': S('同じ機種を組んでいる2人の手つきが、はっきり違う。'
          + 'ねじを締める順番も、押さえる場所も別々。'
          + '受入の棚には、はめあいがきついロットとゆるいロットが混ざって積んである。',
          'Two people building the same model do it visibly differently. Different order of screws, different place to hold it. '
          + 'On the goods-in rack, tight lots and loose lots are stacked together.',
          'Dua orang merakit model yang sama dengan cara yang jelas berbeda. Urutan sekrup berbeda, tempat memegang berbeda. '
          + 'Di rak penerimaan, lot ketat dan lot longgar bertumpuk bersama.'),
        'recon.files': S('月ごとの不良率は11〜15%の間で上下している。'
          + '作業手順書は5工程のうち1つぶんしか見当たらない。',
          'The monthly defect rate swings between 11 and 15 per cent. '
          + 'Written procedures exist for only one of the five processes.',
          'Tingkat cacat bulanan berfluktuasi antara 11 dan 15 persen. '
          + 'Prosedur tertulis hanya ada untuk satu dari lima proses.'),
        'recon.ask': S('**班長タケダ**「Bさんの日は数字が悪い。腕の問題です」。'
          + '**保全**「ビットは滑るまで使います。交換の記録は取っていません」。'
          + '**受入の担当**「はめあいは測っていません。入ったら流すだけです」。',
          '**Takeda, the line leader:** “The numbers are worse on B’s days. It is a skill problem.” '
          + '**Maintenance:** “We run a bit until it slips. We keep no record of changes.” '
          + '**Goods-in:** “We do not measure the fit. It arrives, it goes out to the line.”',
          '**Takeda, leader lini:** “Angkanya lebih buruk pada hari B. Ini masalah keterampilan.” '
          + '**Pemeliharaan:** “Kami memakai mata obeng sampai selip. Kami tidak mencatat penggantiannya.” '
          + '**Penerimaan:** “Kami tidak mengukur celah suaiannya. Datang, lalu dialirkan ke lini.”'),
        'lesson.confound': S('**「Bさんの腕が悪い」は外れです。原因は人ではなく、標準が無いことでした。**'
          + '手順書を入れると、同じBさんが組んでも数字は下がります。'
          + '人を入れ替えても標準が無ければ元に戻り、標準を入れれば誰が組んでも揃う。'
          + '**層別で人の差が出たのは本当ですが、そこから読むべきは「人を替えろ」ではなく「手順を決めろ」です。**'
          + '室温は例によって犯人ではありません。',
          '**“B is not good enough” is the wrong read. The cause was not the person but the absence of a standard.** '
          + 'Put the procedure in and the numbers come down with the same B building them. '
          + 'Swap the people and without a standard it comes straight back; write the standard and it evens out whoever builds it. '
          + '**The operator gap in the stratification was real, but what it tells you is “settle the procedure”, not “replace the person”.** '
          + 'Room temperature, as ever, was not the culprit.',
          '**“B kurang baik” adalah pembacaan yang salah. Penyebabnya bukan orangnya, melainkan tidak adanya standar.** '
          + 'Masukkan prosedurnya dan angkanya turun meski B yang sama yang merakit. '
          + 'Tukar orangnya dan tanpa standar semuanya kembali; susun standarnya dan hasilnya merata siapa pun perakitnya. '
          + '**Selisih antar operator dalam stratifikasi memang nyata, tetapi yang harus dibaca adalah “tetapkan prosedurnya”, bukan “ganti orangnya”.** '
          + 'Suhu ruang, seperti biasa, bukan pelakunya.'),
        'lesson.money': S('**このラインでは、条件のつまみより先に手順書のほうが効きます。**'
          + '5工程のうち4つに標準が無いので、同じ条件でも組む人によって出来が違います。'
          + '手順を決めるのは1工程5ポイント・5日で、条件を締めるより安い。'
          + '**しかも標準化は毎月の費用が増えません。**'
          + '条件のつまみは全員に等しく効くので、手順の差が残ったままだと、'
          + 'そのばらつきを費用で埋めることになります。'
          + '**④に置くのは不良率ではなく、効果金額です。**',
          '**On this line the written procedure beats the settings.** '
          + 'Four of the five processes have no standard, so the same settings give a different result depending on who builds it. '
          + 'Settling a procedure costs five points and five days per process, which is cheaper than tightening the conditions. '
          + '**And unlike the conditions, a standard adds nothing to the monthly cost.** '
          + 'A setting acts on everyone equally, so while the method still varies you are paying money to paper over that variation. '
          + '**What goes in ④ is the money, not the rate.**',
          '**Di lini ini prosedur tertulis mengalahkan setelan.** '
          + 'Empat dari lima proses tidak punya standar, jadi setelan yang sama memberi hasil berbeda tergantung perakitnya. '
          + 'Menetapkan prosedur berbiaya lima poin dan lima hari per proses, lebih murah daripada mengetatkan kondisi. '
          + '**Dan tidak seperti kondisi, standar tidak menambah biaya bulanan.** '
          + 'Setelan bekerja setara pada semua orang, jadi selama metodenya masih beragam Anda membayar uang untuk menutupi keragaman itu. '
          + '**Yang masuk ke ④ adalah uangnya, bukan tingkatnya.**')
      },
      reveal: S(
        '**共通の原因は「人によって手順が違うこと」でした。**部品のはめあい代も効いていますが、'
        + 'それは嵌合不良にだけで、ねじ締結とキズには効いていません。'
        + '3つすべてに効いていたのは手順の差です。'
        + '**そして、これは人の問題ではありません。**5工程のうち4つに手順書が無く、'
        + '同じ製品でも組む順番と力の入れ方が人によって違っただけです。'
        + '手順書を入れれば、同じ人が組んでも数字は下がります。'
        + '標準作業は「測れる状態をつくるもの」だと習いますが、'
        + '**手作業の工程では、それ自体が改善そのものになります。**',
        '**The shared cause was that people were working to different procedures.** The fit clearance mattered too, '
        + 'but only for the bad fits, not for the screw joints or the scratches. '
        + 'What touched all three was the difference in method. '
        + '**And this is not a problem with the people.** Four of the five processes had no written procedure, so the same product '
        + 'was built in a different order with a different force depending on who had it. '
        + 'Put the procedure in and the numbers come down with the same people building them. '
        + 'You learn that standard work is what makes a process measurable — '
        + '**on a line of manual work it is the improvement itself.**',
        '**Penyebab bersamanya adalah orang bekerja dengan prosedur berbeda.** Celah suaian juga berpengaruh, '
        + 'tetapi hanya pada pemasangan, bukan pada sambungan sekrup atau goresan. '
        + 'Yang menyentuh ketiganya adalah perbedaan metode. '
        + '**Dan ini bukan masalah orangnya.** Empat dari lima proses tidak punya prosedur tertulis, sehingga produk yang sama '
        + 'dirakit dengan urutan dan tenaga berbeda tergantung siapa yang mengerjakannya. '
        + 'Masukkan prosedurnya dan angkanya turun meski orang yang sama yang merakit. '
        + 'Anda belajar bahwa kerja standar adalah yang membuat proses dapat diukur — '
        + '**di lini kerja manual, itu sendiri adalah perbaikannya.**')
    }
  ];

  // 原因の選択肢。シナリオによって正解が変わる。
  window.WOODSHOP_SUSPECTS = [
    ['mc', S('材の含水率', 'The moisture content of the stock', 'Kadar air material')],
    ['wear', S('刃の摩耗', 'Cutter wear', 'Keausan pisau')],
    ['roomT', S('室温', 'Room temperature', 'Suhu ruang')],
    ['worker', S('作業者の腕', 'Operator skill', 'Keterampilan operator')],
    ['machine', S('機械の個体差', 'Machine to machine', 'Perbedaan antar mesin')],
    ['none', S('共通の原因は無い', 'There is no shared cause', 'Tidak ada penyebab bersama')]
  ];
})();
