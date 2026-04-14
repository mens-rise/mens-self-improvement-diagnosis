/**
 * Men's Rise 診断ツール - データベース連携
 * Google Apps Script Web App に診断結果を送信する
 */

const MRDB = {
  // 名前の保存/取得（localStorage）
  saveName(name) {
    localStorage.setItem('mr_user_name', name);
  },

  getName() {
    return localStorage.getItem('mr_user_name') || '';
  },

  // 診断結果をGASに送信
  async saveResult(payload) {
    const data = {
      name: this.getName(),
      timestamp: new Date().toISOString(),
      ...payload
    };

    try {
      // GASへのPOST送信（CORSエラー回避のためno-corsモード）
      await fetch(CONFIG.GAS_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(data)
      });
      return true;
    } catch (err) {
      console.error('Failed to save result:', err);
      return false;
    }
  }
};

window.MRDB = MRDB;
