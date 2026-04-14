/**
 * Men's Rise 診断ツール - 共通設定
 */

const CONFIG = {
  // CTA先のVSL視聴ページ（個別説明会申込ページと同一）
  CTA_URL: 'https://info.opt--in.com/page/OenZEyCyYPQH?ftid=tD53IsLSjGP9',

  // Google Apps Script Web App エンドポイント
  // ※デプロイ後、GASのWeb App URLをここに貼り付けてください
  GAS_ENDPOINT: 'https://script.google.com/macros/s/REPLACE_WITH_YOUR_GAS_URL/exec',

  // 管理ダッシュボードのパスワード（admin.htmlで使用）
  ADMIN_PASSWORD: 'mensrise2026',

  // プライバシー注意書き
  PRIVACY_NOTICE: '入力内容は診断結果の提供およびサービス向上のために使用します。'
};

window.CONFIG = CONFIG;
