# ZEVA Academy

**ZEVA（Zero Variation Production System：バラツキゼロ生産システム）** を、IEの基礎から段階的に学べるインタラクティブ学習サイトです。日本語 / English / Bahasa Indonesia の3言語に対応しています。

An interactive, multilingual (Japanese / English / Indonesian) learning site for **ZEVA — the Zero Variation Production System**, from IE fundamentals to advanced practice.

---

## 構成 / Structure

| Stage | Track | Modules | 内容 |
|---|---|---|---|
| 0 | 基礎IE (IE Fundamentals) | 10 | 生産とIE、TT/CT、時間研究・標準時間、動作研究、工程分析、ラインバランス、OEE、統計の基礎、管理図と工程能力、改善の基本ツール |
| 1 | ZEVA 基礎 (Foundations) | 5 | ZEVAとは、根底ロジック、原則体系（土台＋3原則）、理論値、7つのバラツキ要因とXY思考 |
| 2 | ZEVA 実践 (Practice) | 6 | GPC制御理論、GPC-M/GPC-H、動作安定の原理、ハイブリッド・トリアージ、Quick GPC（H-T-C-A）、PDCA-Sと3つのサイクル |
| 3 | ZEVA 応用 (Advanced) | 6 | 理論値ベースの改善手法（4つの箱・ECRS）、Deep GPC（DMAIC）、評価指標体系、デジタル化の段階的実装、導入プロセス、総合ケーススタディ |

- 各モジュール：解説 → インタラクティブ演習 → まとめ → 確認テスト（80%で修了）
- 20種類のシミュレーター（TT、時間観測、標準時間、ワークサンプリング、ラインバランス、OEE、統計ラボ、正規分布、X̄-R管理図、Cp/Cpk、V.Score、根底ロジック体験、理論値とロス、GPCバンド、動作安定3法則、トリアージ、H-T-C-A、4つの箱、分類ゲーム、シナリオ）
- レベル診断テスト、用語集（138語・3言語）、公式集（印刷対応）
- 進捗はブラウザの localStorage にのみ保存（外部送信なし）
- ライト / ダークテーマ、スマートフォン対応

## 使い方 / Usage

ビルド不要です。`index.html` をブラウザで開くだけで動作します。

No build step. Open `index.html` in a browser, or serve the folder with any static server:

```bash
python -m http.server 8000   # → http://localhost:8000
```

### GitHub Pages

リポジトリの Settings → Pages → Branch: `main` / `(root)` を選択するだけで公開できます。

### 公開サイトへのデプロイ / Deploy

GitHub の `main` に入ると、GitHub Actions（`.github/workflows/deploy.yml`）が検証 → AIチャットの知識ファイルの再生成 → 検索テスト → Firebase Hosting へのデプロイを順に行います。検証かテストが落ちるとデプロイされません。

Pushing to `main` on GitHub runs validation, rebuilds the chat knowledge files, runs the retrieval test and deploys to Firebase Hosting. A failed check stops the deploy. Authentication is keyless (Workload Identity Federation), so the repository holds no deploy secret.

## ディレクトリ / Layout

```
index.html            エントリーポイント（読み込むスクリプト一覧）
css/style.css         スタイル（ライト/ダーク）
js/core.js            レジストリ、i18n、進捗保存、マークアップ
js/i18n.js            UI文言・ステージ定義
js/blocks.js          コンテンツブロックの描画
js/diagrams.js        図（SVG、多言語）
js/widgets-ie.js      IE・統計系シミュレーター
js/widgets-zeva.js    ZEVA系ツール・汎用ゲーム
js/app.js             ルーター・各ページ
content/modules/*.js  学習モジュール（31本）
content/glossary.js   用語集
game/index.html       現場再建記（別ページのシミュレーションゲーム。木工3本・成形1本・組立1本＝不良率、木工丁＝生産性）
game/core.js          土台：乱数・状態・成績表・結果コード・画面の部品・手帳の記録
game/scenarios.js     6本のラインの係数と正解、金額の山（scopeBest）
game/model.js         品質ラインの隠れモデル・調査の棚・条件（調査で現れる）・効果金額・採点表
game/screens.js       盤面・現場調査・スコープ・的・標準作業・調査・条件
game/analyze.js       分析室の9タブ（見た形から条件が解錠される）
game/result.js        結論・結果・答え合わせ
game/notebook.js      手帳（気づき・仮説・打った手・確かめた結果。盤面の記録も並ぶ）
game/prod-*.js        木工ライン丁（生産性）の模型・盤面・分析室・結果
game/charts.js        折れ線・棒・散布図・ヒストグラム・交互作用図
content/formulas.js   公式集
content/placement.js  レベル診断
docs/CONTENT_GUIDE.md コンテンツ執筆ガイド（ブロック・ウィジェット仕様）
tools/validate.js     コンテンツ検証スクリプト
tools/gallery.html    図・ウィジェットの確認用ページ（開発用）
```

## コンテンツの追加・修正 / Contributing

1. `docs/CONTENT_GUIDE.md` の書式に従って `content/` 配下を編集します（すべての文字列は `{ ja, en, id }`）。
2. 新しいモジュールは `index.html` に `<script>` を追加します。
3. 検証を実行します：

```bash
node tools/validate.js
```

検証内容：ブロック/ウィジェット/図の名前、3言語の欠落、クイズの正答インデックス、用語集リンク、公開NGワード。

### 公開時の注意 / Public-release rule

本リポジトリには企業固有の情報（社名・拠点名・実データ・内部資料名など）を含めません。数値例はすべて説明用の架空値です。組織固有の禁止ワードは `tools/forbidden.local.txt`（git管理外）に1行1正規表現で記載すると、`validate.js` が検出します。

## AIチャット（Ask ZEVA）の運用 / Operating the chat

Gemini は Firebase AI Logic 経由で、ブラウザは App Check（reCAPTCHA Enterprise）のトークンを付けて呼ぶ。

- **「AIチャットが Google 側で一時停止されています」と出たら**: Google が App Check 未強制のプロジェクトの AI Logic を止めたもの（2026-09-23 に発生）。
  Firebase コンソール → App Check → APIs → **Firebase AI Logic を「強制」** にすると再開する。CLI からは
  `PATCH https://firebaseappcheck.googleapis.com/v1/projects/zeva-academy-9c3c8/services/firebaseml.googleapis.com?updateMask=enforcementMode`
  に `{"enforcementMode":"ENFORCED"}`（`gcloud auth print-access-token` と `x-goog-user-project` ヘッダが要る）。
- **「ブラウザの確認（reCAPTCHA）に通りませんでした」**: reCAPTCHA Enterprise のスコアが閾値（App Check 設定、既定 0.5）未満。
  自動操作ブラウザ・プライベートウィンドウ・広告ブロックで起きる。閾値は App Check の reCAPTCHA Enterprise 設定で下げられる。
- **ローカルで本物の Gemini を試す**: App Check のデバッグトークンを Firebase コンソール（App Check → アプリ → デバッグトークン）で登録し、
  `js/chat.js` の `self.FIREBASE_APPCHECK_DEBUG_TOKEN = true` をその値に一時的に差し替える。試し終わったらトークンを消す。
- 許可ドメインは reCAPTCHA キー `zeva-academy-web` 側にある（web.app / firebaseapp.com / localhost / 127.0.0.1）。
- **「AIが混み合っています」**: Google 側の 500/503「high demand」。`js/chat.js` の `MODELS` の順に、同じモデルで 2 回再試行 → 次のモデルへ切り替える
  （3.8-flash → 3.5-flash → 3.5-flash-lite。2026-09-24 に AI Logic 経由で存在を確認。3.8-flash-lite / 3.8-pro / 2.5 系は 404）。
  それでも通らないときだけ「1〜2分待って」と出す。モデルを足すときは、存在確認をしてから `MODELS` に並べる。

## ライセンス / License

未設定です。公開前にライセンス（例：コンテンツは CC BY-SA 4.0、コードは MIT など）を決定して `LICENSE` を追加してください。
