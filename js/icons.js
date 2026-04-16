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
  // 手首を上から見た断面図。中央の円が「手首」、それを囲む親指＋中指の輪
  // ① 余裕で重なる：指の輪が手首より大きい → 指先が交差
  wristOverlap: `<svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <!-- 手首（細い） -->
    <circle cx="60" cy="52" r="14" fill="#3a3a3a" stroke="currentColor" stroke-width="1.5" opacity="0.9"/>
    <text x="60" y="56" text-anchor="middle" fill="#fff" font-size="9" font-weight="500">手首</text>
    <!-- 親指（左） -->
    <path d="M 60 74 Q 30 74 22 52 Q 18 36 30 26 Q 42 20 55 28" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" fill="none"/>
    <!-- 中指（右） -->
    <path d="M 60 74 Q 90 74 98 52 Q 102 36 90 26 Q 78 20 65 28" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" fill="none"/>
    <!-- 指先の重なり（先端が交差） -->
    <circle cx="55" cy="28" r="3" fill="currentColor"/>
    <circle cx="65" cy="28" r="3" fill="currentColor"/>
    <path d="M 50 24 L 70 32 M 70 24 L 50 32" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.7"/>
    <!-- 指先重なりラベル -->
    <text x="60" y="15" text-anchor="middle" fill="currentColor" font-size="9" font-weight="600">✓ 重なる</text>
  </svg>`,

  // ② ちょうど触れ合う：指の輪と手首が同じ大きさ → 指先が接触
  wristTouch: `<svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <!-- 手首（中） -->
    <circle cx="60" cy="52" r="18" fill="#3a3a3a" stroke="currentColor" stroke-width="1.5" opacity="0.9"/>
    <text x="60" y="56" text-anchor="middle" fill="#fff" font-size="9" font-weight="500">手首</text>
    <!-- 親指（左・手首ぎりぎりを回る） -->
    <path d="M 60 76 Q 30 76 22 52 Q 18 34 32 26 Q 45 22 57 29" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" fill="none"/>
    <!-- 中指（右・手首ぎりぎりを回る） -->
    <path d="M 60 76 Q 90 76 98 52 Q 102 34 88 26 Q 75 22 63 29" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" fill="none"/>
    <!-- 指先が接触 -->
    <circle cx="57" cy="29" r="3" fill="currentColor"/>
    <circle cx="63" cy="29" r="3" fill="currentColor"/>
    <!-- 接触ラベル -->
    <text x="60" y="15" text-anchor="middle" fill="currentColor" font-size="9" font-weight="600">◯ 触れる</text>
  </svg>`,

  // ③ 全く届かない：指の輪が手首より小さい → 間にすき間
  wristGap: `<svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <!-- 手首（太い） -->
    <circle cx="60" cy="52" r="22" fill="#3a3a3a" stroke="currentColor" stroke-width="1.5" opacity="0.9"/>
    <text x="60" y="56" text-anchor="middle" fill="#fff" font-size="9" font-weight="500">手首</text>
    <!-- 親指（届いてない） -->
    <path d="M 60 80 Q 34 80 28 56 Q 26 42 38 34 Q 48 30 54 34" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" fill="none"/>
    <!-- 中指（届いてない） -->
    <path d="M 60 80 Q 86 80 92 56 Q 94 42 82 34 Q 72 30 66 34" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" fill="none"/>
    <!-- 指先 -->
    <circle cx="54" cy="34" r="3" fill="currentColor"/>
    <circle cx="66" cy="34" r="3" fill="currentColor"/>
    <!-- 届かない隙間の点線 -->
    <line x1="54" y1="34" x2="66" y2="34" stroke="currentColor" stroke-width="2" stroke-dasharray="2 2" opacity="0.7"/>
    <!-- 隙間ラベル -->
    <text x="60" y="15" text-anchor="middle" fill="currentColor" font-size="9" font-weight="600">✗ 届かない</text>
  </svg>`
};

window.MR_ICONS = MR_ICONS;
