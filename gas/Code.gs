/**
 * Men's Rise 診断ツール - Google Apps Script
 *
 * 【セットアップ手順】
 * 1. Google スプレッドシートを新規作成
 * 2. スプレッドシートのメニュー「拡張機能」→「Apps Script」を開く
 * 3. このコードを全てコピペ
 * 4. 「デプロイ」→「新しいデプロイ」→「ウェブアプリ」
 *    - 実行するユーザー：自分
 *    - アクセスできるユーザー：全員
 * 5. 表示されたWebアプリURLを js/config.js の GAS_ENDPOINT に貼り付け
 */

// スプレッドシートのシート名
const SHEET_NAME = '診断結果';
const CTA_SHEET_NAME = 'CTAクリック';

// CTAクリックシートのヘッダー
const CTA_HEADERS = [
  '日時',
  '名前',
  'クリック元',   // 'result' = 診断結果画面, 'top' = トップページ
  '診断ID',
  '診断名',
  'リンク先'
];

// シートのヘッダー（列の順番）
const HEADERS = [
  '日時',
  '名前',
  '診断名',
  '診断結果',
  '回答詳細',
  // 定量データ（全診断で使い回し、該当するものだけ入る）
  '年齢',
  '身長',
  '体重',
  '男磨き予算',
  '美容院頻度',
  '美容院予算',
  '肌の悩み'
];

// 診断ID → 日本語名の対応表
const DIAGNOSIS_NAMES = {
  kintore: '筋トレ診断',
  hada: '肌質診断',
  kamigata: '髪型診断',
  fashion: 'ファッション診断',
  phase: '男磨きフェーズ診断'
};

// 男磨き予算の値 → 日本語ラベル
const BUDGET_LABELS = {
  minimal: '3,000円以内',
  low: '3,000〜10,000円',
  mid: '10,000〜30,000円',
  high: '30,000円以上'
};

// 美容院頻度の値 → 日本語ラベル
const SALON_FREQ_LABELS = {
  monthly: '月1回',
  bimonthly: '2〜3ヶ月に1回',
  semiannual: '半年に1回',
  rare: 'ほぼ行かない'
};

// 美容院予算の値 → 日本語ラベル
const SALON_BUDGET_LABELS = {
  low: '3,000円以内',
  mid: '5,000円以内',
  high: '8,000円以内',
  unlimited: 'こだわらない'
};

// 肌の悩みの値 → 日本語ラベル
const SKIN_CONCERN_LABELS = {
  acne: 'ニキビ・吹き出物',
  pores: '毛穴の黒ずみ・開き',
  dryness: '乾燥・カサつき',
  oiliness: 'テカリ・脂っぽさ',
  redness: '赤み・肌荒れ',
  spots: 'シミ・くすみ',
  shaving: 'ひげ剃り後のヒリつき',
  none: '特になし'
};

/**
 * 初回のみ実行：ヘッダー行を作成
 * Apps Script エディタで setupSheet() を選択して実行してください
 */
function setupSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  sheet.clear();
  sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  sheet.getRange(1, 1, 1, HEADERS.length)
    .setBackground('#1a1a1a')
    .setFontColor('#c8a96e')
    .setFontWeight('bold');
  sheet.setFrozenRows(1);

  // 列幅の調整
  sheet.setColumnWidth(1, 140); // 日時
  sheet.setColumnWidth(2, 120); // 名前
  sheet.setColumnWidth(3, 160); // 診断名
  sheet.setColumnWidth(4, 220); // 診断結果
  sheet.setColumnWidth(5, 400); // 回答詳細
  for (let i = 6; i <= HEADERS.length; i++) {
    sheet.setColumnWidth(i, 120);
  }

  // CTAクリックシートもセットアップ
  setupCtaSheet();
}

/**
 * CTAクリック用シートのセットアップ
 */
function setupCtaSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(CTA_SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(CTA_SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, CTA_HEADERS.length).setValues([CTA_HEADERS]);
    sheet.getRange(1, 1, 1, CTA_HEADERS.length)
      .setBackground('#1a1a1a')
      .setFontColor('#c8a96e')
      .setFontWeight('bold');
    sheet.setFrozenRows(1);
    sheet.setColumnWidth(1, 160); // 日時
    sheet.setColumnWidth(2, 140); // 名前
    sheet.setColumnWidth(3, 120); // クリック元
    sheet.setColumnWidth(4, 120); // 診断ID
    sheet.setColumnWidth(5, 180); // 診断名
    sheet.setColumnWidth(6, 320); // リンク先
  }
  return sheet;
}

/**
 * CTAクリックを記録
 */
function recordCtaClick(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(CTA_SHEET_NAME);
  if (!sheet) sheet = setupCtaSheet();

  const diagnosisId = data.diagnosisId || '';
  const diagnosisName = data.diagnosisName || DIAGNOSIS_NAMES[diagnosisId] || '';

  sheet.appendRow([
    new Date(data.timestamp || Date.now()),
    data.name || '(名前なし)',
    data.source || '',
    diagnosisId,
    diagnosisName,
    data.url || ''
  ]);
}

/**
 * POST: 診断結果を受信してスプレッドシートに保存
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    // CTAクリックの記録（診断結果とは別シートに保存）
    if (data.type === 'cta_click') {
      recordCtaClick(data);
      return ContentService.createTextOutput(JSON.stringify({ status: 'ok' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      setupSheet();
      sheet = ss.getSheetByName(SHEET_NAME);
    }

    const answers = data.answers || {};
    const answersReadable = data.answersReadable || {};

    // 診断名（日本語）
    const diagnosisName = data.diagnosisName ||
                         DIAGNOSIS_NAMES[data.diagnosisId] ||
                         data.diagnosisId || '';

    // 診断結果（日本語ラベル）
    const resultLabel = data.resultLabel || extractResultLabel(data.result);

    // 回答詳細を「質問: 回答」形式で整形
    const answersStr = formatReadableAnswers(answersReadable);

    // 定量データの抽出（複数のキーから拾う）
    const age = extractNumber(answers.age, 'age');
    const height = extractNumber(answers.body, 'height');
    const weight = extractNumber(answers.body, 'weight');
    const manBudget = BUDGET_LABELS[answers.budget] || answers.budget || '';
    const salonFreq = SALON_FREQ_LABELS[answers.salonFreq] || answers.salonFreq || '';
    const salonBudget = SALON_BUDGET_LABELS[answers.salonBudget] || answers.salonBudget || '';
    const skinConcerns = Array.isArray(answers.skinConcerns)
      ? answers.skinConcerns.map(v => SKIN_CONCERN_LABELS[v] || v).join('、')
      : '';

    const row = [
      new Date(data.timestamp || Date.now()),
      data.name || '',
      diagnosisName,
      resultLabel,
      answersStr,
      age,
      height,
      weight,
      manBudget,
      salonFreq,
      salonBudget,
      skinConcerns
    ];

    sheet.appendRow(row);

    return ContentService.createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * answersReadable オブジェクトを「質問: 回答」の複数行テキストに変換
 * {"手首テスト": "余裕で重なる", ...} → "手首テスト: 余裕で重なる\n..."
 */
function formatReadableAnswers(readable) {
  if (!readable || typeof readable !== 'object') return '';
  return Object.keys(readable)
    .map(q => `${q}：${readable[q]}`)
    .join('\n');
}

/**
 * 数値オブジェクトから特定のキーの値を抽出
 */
function extractNumber(obj, key) {
  if (!obj) return '';
  if (typeof obj === 'number') return obj;
  if (typeof obj === 'object' && obj[key] != null) return obj[key];
  return '';
}

/**
 * result オブジェクトからラベルを抽出（resultLabel未送信時のフォールバック）
 */
function extractResultLabel(result) {
  if (!result) return '';
  if (typeof result === 'string' || typeof result === 'number') return String(result);
  if (typeof result === 'object') {
    return result.typeName || result.type || result.category || result.faceShape || '';
  }
  return '';
}

/**
 * GET: 管理ダッシュボード用にデータを取得
 */
function doGet(e) {
  try {
    const action = (e.parameter && e.parameter.action) || 'list';
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet || sheet.getLastRow() < 2) {
      return jsonResponse({ status: 'ok', data: [] });
    }

    const values = sheet.getRange(2, 1, sheet.getLastRow() - 1, HEADERS.length).getValues();
    const records = values.map(row => {
      const obj = {};
      HEADERS.forEach((h, i) => { obj[h] = row[i]; });
      return obj;
    });

    if (action === 'search') {
      const q = (e.parameter.name || '').trim();
      const filtered = q ? records.filter(r => String(r['名前']).includes(q)) : records;
      return jsonResponse({ status: 'ok', data: filtered });
    }

    if (action === 'stats') {
      const stats = {
        total: records.length,
        uniqueUsers: new Set(records.map(r => r['名前'])).size,
        byDiagnosis: {},
        byResult: {},
        cta: getCtaStats()
      };
      records.forEach(r => {
        const dname = r['診断名'] || r['診断ID'] || '';
        stats.byDiagnosis[dname] = (stats.byDiagnosis[dname] || 0) + 1;
        const key = `${dname}:${r['診断結果']}`;
        stats.byResult[key] = (stats.byResult[key] || 0) + 1;
      });
      return jsonResponse({ status: 'ok', data: stats });
    }

    if (action === 'cta_list') {
      return jsonResponse({ status: 'ok', data: getCtaRecords() });
    }

    return jsonResponse({ status: 'ok', data: records });
  } catch (err) {
    return jsonResponse({ status: 'error', message: err.toString() });
  }
}

/**
 * CTAクリックシートの全レコードを取得
 */
function getCtaRecords() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(CTA_SHEET_NAME);
  if (!sheet || sheet.getLastRow() < 2) return [];
  const values = sheet.getRange(2, 1, sheet.getLastRow() - 1, CTA_HEADERS.length).getValues();
  return values.map(row => {
    const obj = {};
    CTA_HEADERS.forEach((h, i) => { obj[h] = row[i]; });
    return obj;
  });
}

/**
 * CTAクリック統計
 * - totalClicks: 総クリック数
 * - uniqueUsers: ユニークユーザー数（同名は1カウント）
 * - bySource: クリック元別（result/top）
 * - byDiagnosis: 診断別クリック数
 */
function getCtaStats() {
  const records = getCtaRecords();
  const stats = {
    totalClicks: records.length,
    uniqueUsers: new Set(records.map(r => String(r['名前'] || '').trim()).filter(Boolean)).size,
    bySource: {},
    byDiagnosis: {}
  };
  records.forEach(r => {
    const src = r['クリック元'] || 'unknown';
    stats.bySource[src] = (stats.bySource[src] || 0) + 1;
    const dname = r['診断名'] || r['診断ID'] || '(トップページ)';
    stats.byDiagnosis[dname] = (stats.byDiagnosis[dname] || 0) + 1;
  });
  return stats;
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
