/**
 * Men's Rise 診断ツール - 筋トレ診断用データ
 * TDEE/PFC計算、食事例、買い物リスト、ジムメニュー等
 */

// =========================================
// 栄養計算（TDEE/PFC）
// =========================================
window.calcNutrition = function(answers, type) {
  const body = answers.body || {};
  const height = body.height || 170;
  const weight = body.weight || 65;
  const sharedAge = MRDB.getShared('age');
  const age = (sharedAge && (sharedAge.age || sharedAge)) || 28;
  const exp = answers.experience;
  const freq = answers.frequency;
  const targetBody = answers.targetBody || 'lean';

  // BMR（Mifflin-St Jeor, 男性）
  const bmr = Math.round(10 * weight + 6.25 * height - 5 * age + 5);

  // 活動係数
  let activityFactor = 1.5;
  if (freq === 'four' && (exp === 'intermediate' || exp === 'advanced')) activityFactor = 1.725;
  else if (freq === 'four' || exp === 'advanced') activityFactor = 1.55;
  else if (exp === 'none' && freq === 'two') activityFactor = 1.375;
  const tdee = Math.round(bmr * activityFactor);

  // 目標体重（BMI基準）
  const heightM = height / 100;
  const targetBMI = targetBody === 'lean' ? 22 : 24;
  const targetWeight = Math.round(heightM * heightM * targetBMI * 10) / 10;

  // 目標カロリー（体型×目標で調整）
  let targetKcal = tdee;
  if (type === 'ecto') {
    targetKcal = targetBody === 'lean' ? tdee + 200 : tdee + 400;
  } else if (type === 'meso') {
    targetKcal = targetBody === 'lean' ? tdee + 50 : tdee + 250;
  } else {
    targetKcal = targetBody === 'lean' ? tdee - 400 : tdee - 200;
  }
  targetKcal = Math.round(targetKcal / 50) * 50; // 50kcal単位に丸める

  // PFC（g数）
  const refWeight = type === 'endo' ? Math.min(weight, targetWeight) : targetWeight;
  const pG = Math.round(refWeight * 2);
  const fG = Math.round(refWeight * 0.8);
  const remaining = targetKcal - (pG * 4) - (fG * 9);
  const cG = Math.max(30, Math.round(remaining / 4));
  // 実際の目標カロリー（計算後の値）
  const actualKcal = pG * 4 + fG * 9 + cG * 4;

  return { bmr, tdee, targetKcal, actualKcal, targetWeight, currentWeight: weight, p: pG, f: fG, c: cG };
};

// =========================================
// PFC円グラフSVG生成
// =========================================
window.pfcChartSVG = function(p, f, c) {
  const pKcal = p * 4;
  const fKcal = f * 9;
  const cKcal = c * 4;
  const total = pKcal + fKcal + cKcal;
  const pPct = Math.round((pKcal / total) * 100);
  const fPct = Math.round((fKcal / total) * 100);
  const cPct = 100 - pPct - fPct;

  const r = 58;
  const circumference = 2 * Math.PI * r;
  const pLen = (pPct / 100) * circumference;
  const fLen = (fPct / 100) * circumference;
  const cLen = (cPct / 100) * circumference;

  return `
    <div style="display:flex; align-items:center; gap:20px; flex-wrap:wrap; justify-content:center;">
      <svg viewBox="0 0 160 160" style="width:160px; height:160px; flex-shrink:0;">
        <circle cx="80" cy="80" r="${r}" fill="none" stroke="#2a2a2a" stroke-width="24"/>
        <circle cx="80" cy="80" r="${r}" fill="none" stroke="#e74c3c" stroke-width="24"
                stroke-dasharray="${pLen} ${circumference - pLen}" stroke-dashoffset="0"
                transform="rotate(-90 80 80)" stroke-linecap="butt"/>
        <circle cx="80" cy="80" r="${r}" fill="none" stroke="#f1c40f" stroke-width="24"
                stroke-dasharray="${fLen} ${circumference - fLen}" stroke-dashoffset="-${pLen}"
                transform="rotate(-90 80 80)" stroke-linecap="butt"/>
        <circle cx="80" cy="80" r="${r}" fill="none" stroke="#27ae60" stroke-width="24"
                stroke-dasharray="${cLen} ${circumference - cLen}" stroke-dashoffset="-${pLen + fLen}"
                transform="rotate(-90 80 80)" stroke-linecap="butt"/>
        <text x="80" y="72" text-anchor="middle" fill="#bbb" font-size="10" font-weight="500">Total</text>
        <text x="80" y="94" text-anchor="middle" fill="#fff" font-size="20" font-weight="800" font-family="-apple-system, BlinkMacSystemFont, 'Noto Sans JP', sans-serif">${total}</text>
        <text x="80" y="108" text-anchor="middle" fill="#888" font-size="9" font-weight="500">kcal</text>
      </svg>
      <div style="display:flex; flex-direction:column; gap:10px; font-size:0.85rem;">
        <div style="display:flex; align-items:center; gap:10px;">
          <span style="width:12px; height:12px; background:#e74c3c; border-radius:2px; display:inline-block;"></span>
          <span style="color:#fff; min-width:90px; font-weight:600;">P タンパク質</span>
          <span style="color:#fff; font-weight:700; font-size:0.92rem;">${p}<span style="font-size:0.75rem; color:#aaa; font-weight:500;">g</span></span>
          <span style="color:#888; font-size:0.72rem;">${pPct}%</span>
        </div>
        <div style="display:flex; align-items:center; gap:10px;">
          <span style="width:12px; height:12px; background:#f1c40f; border-radius:2px; display:inline-block;"></span>
          <span style="color:#fff; min-width:90px; font-weight:600;">F 脂質</span>
          <span style="color:#fff; font-weight:700; font-size:0.92rem;">${f}<span style="font-size:0.75rem; color:#aaa; font-weight:500;">g</span></span>
          <span style="color:#888; font-size:0.72rem;">${fPct}%</span>
        </div>
        <div style="display:flex; align-items:center; gap:10px;">
          <span style="width:12px; height:12px; background:#27ae60; border-radius:2px; display:inline-block;"></span>
          <span style="color:#fff; min-width:90px; font-weight:600;">C 炭水化物</span>
          <span style="color:#fff; font-weight:700; font-size:0.92rem;">${c}<span style="font-size:0.75rem; color:#aaa; font-weight:500;">g</span></span>
          <span style="color:#888; font-size:0.72rem;">${cPct}%</span>
        </div>
      </div>
    </div>
  `;
};

// =========================================
// 体型タイプ × 目標 別のデータ
// =========================================

window.MEAL_PLANS = {
  // 痩せ型 × 細マッチョ
  ecto_lean: {
    overview: 'カロリー摂取が第一。体が燃やしちゃう分を毎食しっかり補給する。1日4食が理想。',
    meals: [
      { time: '07:00', title: '朝食', items: ['セブン 鮭おにぎり 150円 ×2', 'セブン サラダチキン プレーン 268円', 'プロテイン（アンビーク or コンビニのザバス） 1杯（牛乳200ml）'], kcal: 720, p: 52 },
      { time: '12:00', title: '昼食', items: ['ローソン 鶏むね&もち麦ボウル 598円', 'ゆで卵 ×2', 'バナナ 1本'], kcal: 780, p: 48 },
      { time: '15:00', title: '間食', items: ['プロテイン（アンビーク or コンビニのザバス） ×1', 'おにぎり 1個 or 和菓子（だんご等）'], kcal: 320, p: 22 },
      { time: '19:00', title: '夕食', items: ['サバ缶 1缶', '白米 200g', '納豆 1パック', '味噌汁'], kcal: 750, p: 42 }
    ]
  },
  ecto_athlete: {
    overview: 'アスリート体型は増量が必須。体重×40kcal目安で食べ込む。間食2回入れて胃腸を慣らす。',
    meals: [
      { time: '07:00', title: '朝食', items: ['白米 250g', '卵 3個（スクランブル）', '鶏むね 100g', 'バナナ 1本'], kcal: 850, p: 58 },
      { time: '12:00', title: '昼食', items: ['どんぶり系（牛丼大盛り、親子丼等）', 'サラダチキン 追加', 'プロテイン 1杯'], kcal: 900, p: 55 },
      { time: '15:00', title: '間食①', items: ['おにぎり ×2', 'プロテイン（アンビーク or コンビニのザバス）'], kcal: 450, p: 28 },
      { time: '19:00', title: '夕食', items: ['白米 250g', 'サーモン塩焼き 150g', 'ブロッコリー', '味噌汁'], kcal: 850, p: 45 },
      { time: '22:00', title: '間食②', items: ['ギリシャヨーグルト 170g', 'プロテイン（アンビーク or コンビニのザバス）'], kcal: 280, p: 25 }
    ]
  },
  // 筋肉質型 × 細マッチョ
  meso_lean: {
    overview: 'キープ＋わずかに増やす「リーンバルク」。PFCを毎日同じ量で固定して、体の反応を見る。',
    meals: [
      { time: '07:00', title: '朝食', items: ['オートミール 40g（牛乳200ml）', '卵 2個', 'バナナ 1本'], kcal: 520, p: 32 },
      { time: '12:00', title: '昼食', items: ['ローソン 鶏むね&もち麦ボウル', 'サラダ（ゴマドレ）', '豆腐 1/2丁'], kcal: 620, p: 48 },
      { time: '15:00', title: '間食', items: ['プロテイン（アンビーク or コンビニのザバス） 1杯', 'ナッツ 20g'], kcal: 260, p: 22 },
      { time: '19:00', title: '夕食', items: ['鶏むね 150g（皮なし）', '玄米 150g', 'ブロッコリー', '納豆'], kcal: 680, p: 52 }
    ]
  },
  meso_athlete: {
    overview: 'リーンバルクから通常バルクへ。炭水化物を少し多めに振って、筋合成スイッチを常時ON。',
    meals: [
      { time: '07:00', title: '朝食', items: ['オートミール 60g', '卵 3個', 'バナナ 2本', 'プロテイン（アンビーク or コンビニのザバス）'], kcal: 720, p: 48 },
      { time: '12:00', title: '昼食', items: ['鶏むね 200g', '白米 200g', 'キャベツ', '味噌汁'], kcal: 780, p: 55 },
      { time: '15:00', title: '間食', items: ['おにぎり 1個', 'プロテイン（アンビーク or コンビニのザバス）', 'ナッツ'], kcal: 420, p: 28 },
      { time: '19:00', title: '夕食', items: ['サーモン 150g or 牛赤身 150g', '白米 180g', 'ブロッコリー'], kcal: 780, p: 50 },
      { time: '22:00', title: '間食', items: ['ギリシャヨーグルト', 'プロテイン'], kcal: 260, p: 25 }
    ]
  },
  // がっしり型 × 細マッチョ（減量寄り）
  endo_lean: {
    overview: '引き締め優先。脂質と糖質をコントロール。タンパク質は高めキープで筋肉を守る。',
    meals: [
      { time: '07:00', title: '朝食', items: ['オートミール 30g（水またはアーモンドミルク）', '卵白 3個＋全卵 1個', 'ブラックコーヒー'], kcal: 380, p: 32 },
      { time: '12:00', title: '昼食', items: ['セブン サラダチキン 2個', 'ゆで卵 2個', 'もずくスープ', '玄米おにぎり 1個'], kcal: 580, p: 55 },
      { time: '15:00', title: '間食', items: ['プロテイン（アンビーク or コンビニのザバス） 1杯（水割り）', 'ブラックコーヒー'], kcal: 130, p: 22 },
      { time: '19:00', title: '夕食', items: ['鶏むね 200g（皮なし）', 'ブロッコリー 100g', 'キャベツ山盛り', '味噌汁'], kcal: 520, p: 55 }
    ]
  },
  endo_athlete: {
    overview: 'まず脂肪を落としてから筋肉を乗せる「リコンプ」。タンパク質だけは絶対に削らない。',
    meals: [
      { time: '07:00', title: '朝食', items: ['オートミール 40g', '卵 2個', 'プロテイン（アンビーク or コンビニのザバス）'], kcal: 520, p: 42 },
      { time: '12:00', title: '昼食', items: ['鶏むね 180g', '玄米 100g', 'サラダ', 'ゆで卵'], kcal: 620, p: 52 },
      { time: '15:00', title: '間食', items: ['プロテイン（アンビーク or コンビニのザバス）', 'ゆで卵 1個'], kcal: 200, p: 28 },
      { time: '19:00', title: '夕食', items: ['サバ缶 or 鮭 150g', '玄米 100g', 'ブロッコリー', 'キャベツ'], kcal: 620, p: 48 }
    ]
  }
};

window.CONVENIENCE_LIST = {
  ecto: [
    { name: 'セブン 塩むすび or 鮭おにぎり', price: '110〜150円', nut: 'C45g／P6g' },
    { name: 'セブン サラダチキン プレーン', price: '268円', nut: 'P24g／F1g' },
    { name: 'ザバス ミルクプロテイン（各コンビニ）', price: '200円', nut: 'P15g／C7g' },
    { name: 'ローソン 鶏むねともち麦のサラダボウル', price: '598円', nut: 'P27g／C45g' },
    { name: 'セブン ゆで卵', price: '80円', nut: 'P7g／F5g' },
    { name: 'バナナ', price: '80円', nut: 'C25g' }
  ],
  meso: [
    { name: 'セブン サラダチキン', price: '268円', nut: 'P24g／F1g' },
    { name: 'ローソン ブランパン 4個入り', price: '125円', nut: 'C13g／P16g' },
    { name: 'ザバス ミルクプロテイン（各コンビニ）', price: '200円', nut: 'P15g／C7g' },
    { name: 'セブン 焼鳥串（もも/ねぎま）', price: '150円', nut: 'P10g／F3g' },
    { name: 'もずく酢', price: '100円', nut: '低カロリー／食物繊維' },
    { name: 'ギリシャヨーグルト（無糖）', price: '250円', nut: 'P10g／低脂質' }
  ],
  endo: [
    { name: 'セブン サラダチキン', price: '268円', nut: 'P24g／F1g' },
    { name: 'ローソン ブランパン', price: '125円', nut: 'C13g／P16g（低糖質）' },
    { name: 'セブン ゆで卵', price: '80円', nut: 'P7g／F5g' },
    { name: 'もずくスープ', price: '150円', nut: '低カロリー／満腹感' },
    { name: 'ローソン サラダ（ゴマドレ抜き）', price: '250円', nut: '低カロリー／食物繊維' },
    { name: 'ブラックコーヒー', price: '110円', nut: '0kcal／食欲抑制' }
  ]
};

window.SUPERMARKET_LIST = {
  ecto: [
    { name: '鶏むね肉（皮付き）', price: '100gあたり50円', nut: 'P22g／F8g' },
    { name: '白米（5kg）', price: '2,500円前後', nut: '炭水化物の主役' },
    { name: '卵（10個入り）', price: '250円', nut: 'P7g／F5g（1個）' },
    { name: 'バナナ（房）', price: '200円', nut: 'エネルギー源' },
    { name: '納豆（3個パック）', price: '100円', nut: 'P9g／C6g（1個）' },
    { name: 'オートミール', price: '500円', nut: '朝の炭水化物に最適' },
    { name: '牛乳（1L）', price: '250円', nut: 'P6g／C5g（200ml）／プロテイン増量にも' }
  ],
  meso: [
    { name: '鶏むね肉（皮なし）', price: '100gあたり60円', nut: 'P24g／F1g' },
    { name: '玄米 or もち麦', price: '1,200円〜', nut: '血糖値を安定させる' },
    { name: '卵（10個入り）', price: '250円', nut: 'P7g／F5g' },
    { name: '豆腐', price: '100円', nut: 'P10g／F5g' },
    { name: 'ブロッコリー', price: '200円', nut: 'P13g（1株）／食物繊維' },
    { name: 'サバ缶（水煮）', price: '200円', nut: 'P20g／F10g／オメガ3' },
    { name: 'ギリシャヨーグルト（無糖）', price: '170g 250円', nut: 'P10g／低脂質' }
  ],
  endo: [
    { name: '鶏むね肉（皮なし）', price: '100gあたり60円', nut: 'P24g／F1g' },
    { name: '玄米', price: '1,500円', nut: '低GI／腹持ち◎' },
    { name: 'ブロッコリー', price: '200円', nut: '満腹感／食物繊維' },
    { name: 'キャベツ（1玉）', price: '200円', nut: 'カサ増しの王様' },
    { name: 'サバ缶（水煮）', price: '200円', nut: 'P20g／F10g／オメガ3' },
    { name: '卵（10個入り）', price: '250円', nut: '卵白だけでも使う' },
    { name: 'オートミール', price: '500円', nut: '低GI／白米の代替' },
    { name: 'ギリシャヨーグルト（無糖）', price: '170g 250円', nut: '高P／低脂質の間食' }
  ]
};

window.GYM_MENU = {
  ecto_gym: [
    { name: 'バーベルスクワット', detail: '8回 × 3セット（セット間2分）', note: '体で一番デカい筋肉。ここを鍛えるだけで全身の成長ホルモンが出る。' },
    { name: 'ベンチプレス', detail: '8回 × 3セット（セット間2分）', note: 'バーだけ（20kg）からスタートでOK。胸・肩前・三頭を同時に鍛えられる王道種目。' },
    { name: 'ラットプルダウン', detail: '8回 × 3セット（セット間90秒）', note: '逆三角形シルエットの第一歩。腕で引かず「肘を下に引く」意識で。' }
  ],
  meso_gym: [
    { name: 'ベンチプレス', detail: '10回 × 3セット（セット間2分）', note: '胸トレの王様。肩甲骨を寄せて胸を張るのが最重要。' },
    { name: 'デッドリフト', detail: '8回 × 3セット（セット間2〜3分）', note: '背中全体の厚みを作る。フォームを動画で必ず確認してから。' },
    { name: 'サイドレイズ', detail: '12〜15回 × 3セット（セット間60秒）', note: '軽い重量でじわじわ効かせる。肩幅が広がるとスタイルが激変する。' }
  ],
  endo_gym: [
    { name: 'スミスベンチプレス', detail: '10〜12回 × 3セット（セット間60秒）', note: '軌道が固定されてるから初心者でも胸に効かせやすい。' },
    { name: 'レッグプレス', detail: '12回 × 3セット（セット間60秒）', note: '大きな筋肉を動かしてカロリー消費を稼ぐ。' },
    { name: '有酸素（クロストレーナー or ランニング）', detail: '筋トレ後に20分、心拍120前後', note: '筋トレで成長ホルモンを出した後の有酸素が脂肪燃焼に最適。' }
  ],
  // 自宅
  ecto_home: [
    { name: 'プッシュアップ（腕立て）', detail: '限界回数 × 3セット（セット間60秒）', note: '体重の約60%が負荷。膝つきOKから始めよう。' },
    { name: 'スクワット（自重）', detail: '15〜20回 × 3セット', note: '太ももが床と平行になるまで。ゆっくり3秒で下ろすと効く。' },
    { name: 'プランク', detail: '30〜60秒 × 3セット', note: '姿勢の土台。お尻を上げず、頭からかかとを一直線に。' }
  ],
  meso_home: [
    { name: 'ワイドプッシュアップ', detail: '限界回数 × 3セット', note: '胸の外側に効く。手を肩幅より広く置く。' },
    { name: 'ブルガリアンスクワット', detail: '10回 × 3セット（左右）', note: '片足に集中。ヒップアップも同時に狙える。' },
    { name: 'リバースプッシュアップ', detail: '10〜15回 × 3セット', note: '椅子があればOK。腕（三頭筋）に直接効く。' }
  ],
  endo_home: [
    { name: 'プッシュアップ', detail: '限界回数 × 3セット（セット間30秒）', note: '休憩短めで心拍を上げて脂肪燃焼。' },
    { name: 'スクワット', detail: '20回 × 3セット', note: '大きな筋肉で代謝を上げる。' },
    { name: 'バーピー', detail: '10回 × 3セット', note: '全身運動＋有酸素効果。脂肪燃焼の最強自重種目。' }
  ]
};
