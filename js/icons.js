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

  // 肌質 - 四芒星キラキラ（美肌・ツヤ感）
  hada: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M26 2L30 18L46 22L30 26L26 42L22 26L6 22L22 18Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" fill="currentColor" fill-opacity="0.1"/>
    <path d="M48 30L50 38L58 40L50 42L48 50L46 42L38 40L46 38Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" fill="currentColor" fill-opacity="0.08"/>
    <path d="M18 46L19.5 50L24 52L19.5 54L18 58L16.5 54L12 52L16.5 50Z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round" fill="currentColor" fill-opacity="0.06"/>
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
  </svg>`,

  // 顔型アイコン（髪型診断用）
  faceOval: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="32" cy="32" rx="18" ry="24" stroke="currentColor" stroke-width="2"/>
  </svg>`,
  faceRound: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="32" cy="32" r="22" stroke="currentColor" stroke-width="2"/>
  </svg>`,
  faceLong: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="32" cy="32" rx="14" ry="26" stroke="currentColor" stroke-width="2"/>
  </svg>`,
  faceSquare: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 10 L46 10 Q50 10 50 14 L50 44 Q50 48 46 52 L42 56 L22 56 L18 52 Q14 48 14 44 L14 14 Q14 10 18 10 Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
  </svg>`,
  faceInverted: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 14 Q14 10 18 10 L46 10 Q50 10 50 14 L48 32 Q45 48 32 58 Q19 48 16 32 Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
  </svg>`,

  // 手首テスト（3パターン）
  // 親指(青)と中指(緑)で手首を囲んだときの指の重なり具合を図示
  wristOverlap: `<svg viewBox="0 0 80 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <!-- 手首（楕円） -->
    <ellipse cx="40" cy="32" rx="11" ry="15" stroke="currentColor" stroke-width="1.8" opacity="0.6" fill="none"/>
    <text x="40" y="36" text-anchor="middle" fill="currentColor" font-size="7" opacity="0.6">手首</text>
    <!-- 親指リング（左側から回り込み、大きく重なる） -->
    <path d="M 52 32 A 14 14 0 1 0 52 32.01" stroke="currentColor" stroke-width="2" fill="none"/>
    <!-- 中指リング（右側から回り込み、大きく重なる） -->
    <path d="M 28 32 A 14 14 0 1 1 28 32.01" stroke="currentColor" stroke-width="2" fill="none"/>
    <!-- 重なり強調 -->
    <circle cx="28" cy="32" r="3" fill="currentColor" opacity="0.3"/>
    <circle cx="52" cy="32" r="3" fill="currentColor" opacity="0.3"/>
  </svg>`,
  wristTouch: `<svg viewBox="0 0 80 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="40" cy="32" rx="13" ry="17" stroke="currentColor" stroke-width="1.8" opacity="0.6" fill="none"/>
    <text x="40" y="36" text-anchor="middle" fill="currentColor" font-size="7" opacity="0.6">手首</text>
    <!-- 親指と中指がちょうど触れ合う -->
    <path d="M 53 32 A 13 13 0 1 0 53 32.01" stroke="currentColor" stroke-width="2" fill="none"/>
    <path d="M 27 32 A 13 13 0 1 1 27 32.01" stroke="currentColor" stroke-width="2" fill="none"/>
    <!-- タッチポイント -->
    <circle cx="40" cy="16" r="2" fill="currentColor"/>
    <circle cx="40" cy="48" r="2" fill="currentColor"/>
  </svg>`,
  wristGap: `<svg viewBox="0 0 80 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="40" cy="32" rx="16" ry="19" stroke="currentColor" stroke-width="1.8" opacity="0.6" fill="none"/>
    <text x="40" y="36" text-anchor="middle" fill="currentColor" font-size="7" opacity="0.6">手首</text>
    <!-- 届かない：リングが手首より小さい -->
    <path d="M 50 32 A 11 11 0 1 0 50 32.01" stroke="currentColor" stroke-width="2" fill="none" opacity="0.9"/>
    <path d="M 30 32 A 11 11 0 1 1 30 32.01" stroke="currentColor" stroke-width="2" fill="none" opacity="0.9"/>
    <!-- すき間の点線 -->
    <line x1="40" y1="12" x2="40" y2="18" stroke="currentColor" stroke-width="1.5" stroke-dasharray="1 2" opacity="0.7"/>
    <line x1="40" y1="46" x2="40" y2="52" stroke="currentColor" stroke-width="1.5" stroke-dasharray="1 2" opacity="0.7"/>
  </svg>`,

  // 手首テストのやり方イラスト
  wristHowTo: `<svg viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <!-- 腕 -->
    <rect x="10" y="40" width="120" height="20" rx="10" stroke="currentColor" stroke-width="1.5" opacity="0.5"/>
    <!-- 手首位置マーク -->
    <ellipse cx="100" cy="50" rx="14" ry="12" stroke="currentColor" stroke-width="2" fill="none"/>
    <!-- 指で囲むイメージ -->
    <circle cx="100" cy="50" r="20" stroke="currentColor" stroke-width="2" fill="none" stroke-dasharray="3 3"/>
    <!-- ラベル -->
    <text x="100" y="85" text-anchor="middle" fill="currentColor" font-size="9" opacity="0.8">親指と中指で輪を作って手首を囲む</text>
  </svg>`
};

window.MR_ICONS = MR_ICONS;
