# Men's Rise 男磨き診断ツール セットアップガイド

## 構成

```
/
├── index.html              # トップページ（5診断選択）
├── shindan1-kintore.html   # 筋トレ診断
├── shindan2-hada.html      # 肌質診断
├── shindan3-kamigata.html  # 髪型診断
├── shindan4-fashion.html   # ファッション診断
├── shindan5-phase.html     # 男磨きフェーズ診断
├── admin.html              # 管理ダッシュボード
├── css/style.css           # スタイル
├── js/
│   ├── config.js           # 設定ファイル（GAS URLをここに）
│   ├── quiz-engine.js      # クイズエンジン
│   ├── cta-variants.js     # CTA 5パターン
│   ├── database.js         # データベース連携
│   └── icons.js            # SVGアイコン
└── gas/Code.gs             # Google Apps Script（手動セットアップ）
```

---

## Google Apps Script（データベース）セットアップ

### ステップ1: スプレッドシート作成
1. [Google スプレッドシート](https://sheets.new) を開く
2. ファイル名を `Men's Rise 診断データ` に変更

### ステップ2: Apps Script を設定
1. スプレッドシート画面で「拡張機能」→「Apps Script」
2. デフォルトのコードを消して、`gas/Code.gs` の中身を全部コピペ
3. 保存（Ctrl+S or ⌘+S）
4. 関数選択欄で `setupSheet` を選んで「実行」
   - 初回は権限承認のダイアログが出るので許可
5. スプレッドシートに `診断結果` タブが作られ、ヘッダー行が入る

### ステップ3: Webアプリとしてデプロイ
1. Apps Script 画面右上「デプロイ」→「新しいデプロイ」
2. 歯車アイコン→「ウェブアプリ」を選択
3. 設定：
   - **説明**：`Men's Rise v1`（任意）
   - **実行するユーザー**：`自分`
   - **アクセスできるユーザー**：`全員`
4. 「デプロイ」をクリック
5. 表示された **ウェブアプリURL** をコピー

### ステップ4: フロントエンドにURLを貼る
`js/config.js` を開いて、`GAS_ENDPOINT` を書き換え：

```js
GAS_ENDPOINT: 'https://script.google.com/macros/s/ここに貼る/exec',
```

### ステップ5: テスト
1. 診断ツールで任意の診断を回答
2. スプレッドシートを確認 → 1行追加されていればOK
3. `admin.html` をパスワード `mensrise2026` でログイン → 統計が表示されればOK

---

## パスワード変更

`js/config.js` の `ADMIN_PASSWORD` を変更してください。

---

## 注意事項

- `no-cors` モードでPOSTしているため、フロントエンドから送信成功/失敗は検知できません
- 検証はスプレッドシートに行が追加されるかで確認
- GAS の無料枠は十分大きいので課金の心配なし
- スプレッドシート自体の共有設定は「リンクを知っている人」ではなく「制限付き（自分のみ）」推奨
