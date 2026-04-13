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

  // 肌質 - 男性の顔＋キラキラ（肌ケア）
  hada: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M32 4C22 4 16 12 16 22V32C16 44 22 56 32 56C42 56 48 44 48 32V22C48 12 42 4 32 4Z" stroke="currentColor" stroke-width="2"/>
    <path d="M16 22C12 24 10 22 10 22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M48 22C52 24 54 22 54 22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    <circle cx="26" cy="26" r="1.5" fill="currentColor"/>
    <circle cx="38" cy="26" r="1.5" fill="currentColor"/>
    <path d="M28 35C28 35 30 38 32 38C34 38 36 35 36 35" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    <path d="M52 8L54 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.7"/>
    <path d="M56 12L58 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.7"/>
    <path d="M52 16L54 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.7"/>
    <circle cx="53" cy="12" r="1" fill="currentColor" opacity="0.9"/>
    <path d="M8 38L6 36" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" opacity="0.5"/>
    <path d="M4 42L2 42" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" opacity="0.5"/>
    <circle cx="5" cy="39" r="0.8" fill="currentColor" opacity="0.6"/>
  </svg>`,

  // 髪型 - はさみ
  kamigata: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="18" cy="50" r="6" stroke="currentColor" stroke-width="2"/>
    <circle cx="46" cy="50" r="6" stroke="currentColor" stroke-width="2"/>
    <line x1="22" y1="46" x2="42" y2="14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <line x1="42" y1="46" x2="22" y2="14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  </svg>`,

  // ファッション - シャツ（襟付き）
  fashion: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 6L20 10L12 8L6 22L16 26L16 56H48V26L54 26L58 22L52 8L44 10L40 6" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
    <path d="M24 6C24 6 26 14 32 14C38 14 40 6 40 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <line x1="32" y1="14" x2="32" y2="42" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" opacity="0.4"/>
    <circle cx="32" cy="24" r="1" fill="currentColor" opacity="0.5"/>
    <circle cx="32" cy="32" r="1" fill="currentColor" opacity="0.5"/>
    <circle cx="32" cy="40" r="1" fill="currentColor" opacity="0.5"/>
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
