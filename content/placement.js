/* ZEVA Academy — Placement (diagnostic) test */
(function () {
  var T = function (ja, en, id) { return { ja: ja, en: en, id: id }; };

  // Correct answer is authored as choice 0; a fixed permutation spreads answer positions.
  var PERMS = [[2, 0, 1, 3], [1, 2, 0, 3], [3, 1, 2, 0], [0, 1, 2, 3]];
  function arrange(qs) {
    return qs.map(function (item, i) {
      var p = PERMS[i % PERMS.length];
      var out = {};
      for (var k in item) out[k] = item[k];
      out.choices = p.map(function (src) { return item.choices[src]; });
      out.answer = p.indexOf(0);
      return out;
    });
  }

  var data = {
    intro: T(
      'どこから学び始めるべきかを診断します。全12問・約5分です。IEの基礎知識（8問）と、バラツキ・統計の感覚（4問）を確認します。分からない問題は推測せず、「分からない」に近い選択肢を選んでかまいません。',
      'This short diagnostic tells you where to start. 12 questions, about 5 minutes: 8 on IE basics and 4 on your intuition about variation and statistics. If you do not know an answer, do not guess wildly.',
      'Diagnostik singkat ini menunjukkan dari mana Anda sebaiknya mulai belajar. 12 soal, sekitar 5 menit: 8 soal dasar IE dan 4 soal tentang intuisi variasi dan statistik. Jika tidak tahu jawabannya, jangan menebak sembarangan.'
    ),
    questions: [
      {
        topic: 'ie-01',
        q: T('「ムダ・ムリ・ムラ」のうち、作業時間や品質が一定せずバラつく状態を指すのはどれですか？',
             'Among muda, muri and mura, which one means that work time or quality is uneven and varies?',
             'Di antara muda, muri, dan mura, mana yang berarti waktu kerja atau kualitas tidak rata dan bervariasi?'),
        choices: [
          T('ムラ', 'Mura', 'Mura'),
          T('ムダ', 'Muda', 'Muda'),
          T('ムリ', 'Muri', 'Muri'),
          T('どれにも当てはまらない', 'None of them', 'Tidak satu pun')
        ],
        answer: 0
      },
      {
        topic: 'ie-02',
        q: T('稼働時間が420分、1日の必要生産数が210個のとき、タクトタイムはいくつですか？',
             'Available time is 420 minutes and daily demand is 210 units. What is the takt time?',
             'Waktu kerja tersedia 420 menit dan permintaan harian 210 unit. Berapa takt time-nya?'),
        choices: [
          T('120秒', '120 seconds', '120 detik'),
          T('2秒', '2 seconds', '2 detik'),
          T('210秒', '210 seconds', '210 detik'),
          T('60秒', '60 seconds', '60 detik')
        ],
        answer: 0
      },
      {
        topic: 'ie-03',
        q: T('観測時間50秒、レーティング100%、余裕率10%のとき、標準時間はいくつですか？',
             'Observed time 50 s, rating 100%, allowance 10%. What is the standard time?',
             'Waktu observasi 50 detik, rating 100%, kelonggaran 10%. Berapa waktu standarnya?'),
        choices: [
          T('55秒', '55 seconds', '55 detik'),
          T('50秒', '50 seconds', '50 detik'),
          T('45秒', '45 seconds', '45 detik'),
          T('60秒', '60 seconds', '60 detik')
        ],
        answer: 0
      },
      {
        topic: 'ie-04',
        q: T('動作経済の原則として最も適切なものはどれですか？',
             'Which is the best example of a principle of motion economy?',
             'Manakah contoh terbaik prinsip ekonomi gerakan?'),
        choices: [
          T('よく使う部品は、肘を曲げて届く範囲に置く', 'Place frequently used parts within forearm reach', 'Tempatkan part yang sering dipakai dalam jangkauan lengan bawah'),
          T('部品はまとめて遠くの棚に置く', 'Keep all parts together on a distant shelf', 'Simpan semua part bersama di rak yang jauh'),
          T('片手で作業し、もう片方の手は休ませる', 'Work with one hand and rest the other', 'Bekerja dengan satu tangan dan istirahatkan tangan lainnya'),
          T('作業者が自由に工具の置き場所を決める', 'Let each worker decide where to put tools', 'Biarkan setiap pekerja menentukan tempat alat')
        ],
        answer: 0
      },
      {
        topic: 'ie-05',
        q: T('工程分析の記号で、付加価値を生むのはどれですか？',
             'In process analysis, which category adds value?',
             'Dalam analisis proses, kategori mana yang menambah nilai?'),
        choices: [
          T('加工', 'Operation', 'Operasi'),
          T('運搬', 'Transport', 'Transportasi'),
          T('停滞', 'Delay / storage', 'Menunggu / penyimpanan'),
          T('検査', 'Inspection', 'Inspeksi')
        ],
        answer: 0
      },
      {
        topic: 'ie-06',
        q: T('4工程のCTが40秒・50秒・30秒・40秒のライン。編成効率はいくつですか？',
             'A 4-process line has CTs of 40 s, 50 s, 30 s and 40 s. What is the line balance efficiency?',
             'Lini 4 proses memiliki CT 40, 50, 30, dan 40 detik. Berapa efisiensi keseimbangan lininya?'),
        choices: [
          T('80%', '80%', '80%'),
          T('100%', '100%', '100%'),
          T('50%', '50%', '50%'),
          T('90%', '90%', '90%')
        ],
        answer: 0
      },
      {
        topic: 'ie-07',
        q: T('時間稼働率90%、性能稼働率90%、良品率100%のとき、OEEはいくつですか？',
             'Availability 90%, performance 90%, quality 100%. What is OEE?',
             'Availability 90%, performance 90%, quality 100%. Berapa OEE-nya?'),
        choices: [
          T('81%', '81%', '81%'),
          T('90%', '90%', '90%'),
          T('93%', '93%', '93%'),
          T('280%', '280%', '280%')
        ],
        answer: 0
      },
      {
        topic: 'ie-09',
        q: T('管理限界と規格限界の関係として正しいものはどれですか？',
             'Which statement about control limits and specification limits is correct?',
             'Pernyataan mana yang benar tentang batas kendali dan batas spesifikasi?'),
        choices: [
          T('管理限界は工程のデータから計算し、規格限界は設計・顧客要求から決まる', 'Control limits are calculated from process data; specification limits come from design or customer requirements', 'Batas kendali dihitung dari data proses; batas spesifikasi berasal dari desain atau kebutuhan pelanggan'),
          T('両者は常に同じ値である', 'They are always the same values', 'Keduanya selalu bernilai sama'),
          T('規格限界は工程のデータから計算する', 'Specification limits are calculated from process data', 'Batas spesifikasi dihitung dari data proses'),
          T('管理限界は顧客が決める', 'The customer decides the control limits', 'Pelanggan yang menentukan batas kendali')
        ],
        answer: 0
      },
      {
        topic: 'ie-08',
        q: T('ライン Aの平均CTは30秒、ライン Bも30秒です。どちらの方が安定していると言えますか？',
             'Line A and line B both have an average CT of 30 s. Which one is more stable?',
             'Lini A dan lini B sama-sama memiliki rata-rata CT 30 detik. Mana yang lebih stabil?'),
        choices: [
          T('平均だけでは判断できない。バラツキ（標準偏差など）を見る必要がある', 'Cannot tell from the average alone; you need to look at variation such as standard deviation', 'Tidak bisa dinilai dari rata-rata saja; perlu melihat variasi seperti simpangan baku'),
          T('平均が同じなので同じくらい安定している', 'They are equally stable because the averages are equal', 'Sama stabilnya karena rata-ratanya sama'),
          T('ライン A', 'Line A', 'Lini A'),
          T('ライン B', 'Line B', 'Lini B')
        ],
        answer: 0
      },
      {
        topic: 'ie-08',
        q: T('平均10秒・標準偏差1秒の作業と、平均100秒・標準偏差5秒の作業。相対的なバラツキが大きいのはどちらですか？',
             'Task X: mean 10 s, σ 1 s. Task Y: mean 100 s, σ 5 s. Which has larger relative variation?',
             'Tugas X: rata-rata 10 detik, σ 1 detik. Tugas Y: rata-rata 100 detik, σ 5 detik. Mana yang variasi relatifnya lebih besar?'),
        choices: [
          T('平均10秒の作業（変動係数0.1）', 'Task X (coefficient of variation 0.1)', 'Tugas X (koefisien variasi 0,1)'),
          T('平均100秒の作業（変動係数0.05）', 'Task Y (coefficient of variation 0.05)', 'Tugas Y (koefisien variasi 0,05)'),
          T('同じ', 'They are the same', 'Sama'),
          T('比較できない', 'They cannot be compared', 'Tidak dapat dibandingkan')
        ],
        answer: 0
      },
      {
        topic: 'ie-09',
        q: T('測定値が日によって大きく不規則に変わる工程で、今日1日分のデータからCpkを計算しました。この値について正しいのはどれですか？',
             'In a process whose values jump irregularly from day to day, you calculate Cpk from one day of data. What is true about this value?',
             'Pada proses yang nilainya melonjak tidak teratur dari hari ke hari, Anda menghitung Cpk dari data satu hari. Apa yang benar tentang nilai ini?'),
        choices: [
          T('工程が安定していないので、明日の工程能力を表すとは言えない', 'The process is not stable, so it does not represent tomorrow\'s capability', 'Proses tidak stabil, sehingga tidak mewakili kapabilitas besok'),
          T('計算できたので、そのまま工程能力として使える', 'It was calculated, so it can be used as the process capability', 'Sudah dihitung, jadi bisa langsung dipakai sebagai kapabilitas proses'),
          T('データ数を増やせば安定していなくても問題ない', 'With more data, instability does not matter', 'Dengan data lebih banyak, ketidakstabilan tidak masalah'),
          T('Cpkは安定性とは無関係である', 'Cpk has nothing to do with stability', 'Cpk tidak ada hubungannya dengan stabilitas')
        ],
        answer: 0
      },
      {
        topic: 'ie-10',
        q: T('改善を行ったあと、効果を定着させるために最も重要なことはどれですか？',
             'After an improvement, what is most important to make the effect last?',
             'Setelah perbaikan, apa yang paling penting agar efeknya bertahan?'),
        choices: [
          T('改善後のやり方を標準として決め、守られているか確認する', 'Set the improved method as the standard and check that it is followed', 'Menetapkan cara yang telah diperbaiki sebagai standar dan memeriksa bahwa standar itu dipatuhi'),
          T('改善内容は各作業者の記憶に任せる', 'Leave it to each worker\'s memory', 'Menyerahkannya pada ingatan masing-masing pekerja'),
          T('すぐに次のテーマに移り、結果は確認しない', 'Move to the next topic immediately without checking results', 'Langsung pindah ke tema berikutnya tanpa memeriksa hasil'),
          T('検査を増やして不良を見逃さないようにする', 'Add more inspection so defects are not missed', 'Menambah inspeksi agar cacat tidak terlewat')
        ],
        answer: 0
      }
    ]
  };
  data.questions = arrange(data.questions);
  ZA.setPlacement(data);
})();
