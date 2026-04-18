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

  // 診断間で共有する回答（年齢・身長体重など）
  saveShared(key, value) {
    localStorage.setItem(`mr_shared_${key}`, JSON.stringify(value));
  },

  getShared(key) {
    try {
      const raw = localStorage.getItem(`mr_shared_${key}`);
      return raw === null ? null : JSON.parse(raw);
    } catch {
      return null;
    }
  },

  // CTAクリックを記録（ナビゲーションを邪魔しないよう sendBeacon を優先）
  trackCtaClick({ source, diagnosisId, diagnosisName, url }) {
    const payload = {
      type: 'cta_click',
      name: this.getName(),
      timestamp: new Date().toISOString(),
      source: source || 'unknown',      // 'result' | 'top'
      diagnosisId: diagnosisId || '',
      diagnosisName: diagnosisName || '',
      url: url || ''
    };
    try {
      const body = JSON.stringify(payload);
      if (navigator.sendBeacon) {
        // sendBeacon はナビゲーションをブロックしない（最推奨）
        const blob = new Blob([body], { type: 'text/plain;charset=utf-8' });
        navigator.sendBeacon(CONFIG.GAS_ENDPOINT, blob);
      } else {
        // フォールバック（ブラウザが対応してない場合）
        fetch(CONFIG.GAS_ENDPOINT, {
          method: 'POST',
          mode: 'no-cors',
          keepalive: true,
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: body
        });
      }
    } catch (err) {
      console.error('trackCtaClick failed:', err);
    }
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
