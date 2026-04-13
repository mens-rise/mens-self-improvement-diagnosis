/**
 * Men's Rise - SVGアイコン
 * ダークテーマに合うミニマルなラインアイコン
 */
const MR_ICONS = {
  // 筋トレ - ダンベル
  kintore: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="22" width="8" height="20" rx="2" stroke="currentColor" stroke-width="2"/>
    <rect x="48" y="22" width="8" height="20" rx="2" stroke="currentColor" stroke-width="2"/>
    <rect x="2" y="26" width="6" height="12" rx="1.5" stroke="currentColor" stroke-width="2"/>
    <rect x="56" y="26" width="6" height="12" rx="1.5" stroke="currentColor" stroke-width="2"/>
    <line x1="16" y1="32" x2="48" y2="32" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
  </svg>`,

  // 肌質 - 水滴（保湿イメージ）
  hada: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M32 6C32 6 14 28 14 40C14 50 22 58 32 58C42 58 50 50 50 40C50 28 32 6 32 6Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M24 42C24 42 26 36 32 36C38 36 40 42 40 42" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.5"/>
  </svg>`,

  // 髪型 - はさみ
  kamigata: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="18" cy="50" r="6" stroke="currentColor" stroke-width="2"/>
    <circle cx="46" cy="50" r="6" stroke="currentColor" stroke-width="2"/>
    <line x1="22" y1="46" x2="42" y2="14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <line x1="42" y1="46" x2="22" y2="14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  </svg>`,

  // ファッション - ハンガー
  fashion: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M32 8V16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <path d="M32 16C36 16 38 14 38 11C38 8 36 6 32 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/>
    <path d="M8 44L32 24L56 44" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <line x1="8" y1="44" x2="56" y2="44" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <path d="M12 44V54C12 55.1 12.9 56 14 56H50C51.1 56 52 55.1 52 54V44" stroke="currentColor" stroke-width="2"/>
  </svg>`,

  // フェーズ - コンパス
  phase: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="32" r="26" stroke="currentColor" stroke-width="2"/>
    <circle cx="32" cy="32" r="2" fill="currentColor"/>
    <polygon points="32,10 36,28 32,32 28,28" fill="currentColor" opacity="0.9"/>
    <polygon points="32,54 28,36 32,32 36,36" stroke="currentColor" stroke-width="1" fill="none" opacity="0.4"/>
    <line x1="32" y1="2" x2="32" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.5"/>
    <line x1="32" y1="56" x2="32" y2="62" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.5"/>
    <line x1="2" y1="32" x2="8" y2="32" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.5"/>
    <line x1="56" y1="32" x2="62" y2="32" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.5"/>
  </svg>`,

  // ロック（ゲーティング用）
  lock: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="14" y="28" width="36" height="28" rx="4" stroke="currentColor" stroke-width="2"/>
    <path d="M22 28V20C22 14.5 26.5 10 32 10C37.5 10 42 14.5 42 20V28" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <circle cx="32" cy="42" r="4" fill="currentColor"/>
    <line x1="32" y1="46" x2="32" y2="50" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  </svg>`
};

window.MR_ICONS = MR_ICONS;
