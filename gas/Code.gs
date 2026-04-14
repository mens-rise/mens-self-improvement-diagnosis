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

// シートのヘッダー（列の順番）
const HEADERS = [
  '日時',
  '名前',
  '診断ID',
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
}

/**
 * POST: 診断結果を受信してスプレッドシートに保存
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      setupSheet();
      sheet = ss.getSheetByName(SHEET_NAME);
    }

    const answers = data.answers || {};
    const result = data.result || {};

    // 診断結果のタイプ名を抽出
    let resultType = '';
    if (typeof result === 'object') {
      resultType = result.type || result.category || result.faceShape || JSON.stringify(result);
    } else {
      resultType = String(result);
    }

    // 回答詳細をJSON文字列で保存（人間可読なインデント付き）
    const answersStr = JSON.stringify(answers, null, 2);

    // 定量データの抽出
    const age = answers.age?.age || '';
    const height = answers.body?.height || answers.height || '';
    const weight = answers.body?.weight || '';
    const manBudget = answers.budget || answers.salonBudget || '';
    const salonFreq = answers.salonFreq || '';
    const salonBudget = answers.salonBudget || '';
    const skinConcerns = Array.isArray(answers.skinConcerns) ? answers.skinConcerns.join(', ') : '';

    const row = [
      new Date(data.timestamp || Date.now()),
      data.name || '',
      data.diagnosisId || '',
      resultType,
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
 * GET: 管理ダッシュボード用にデータを取得
 * URL例: ?action=list / ?action=search&name=山田 / ?action=stats
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
        byResult: {}
      };
      records.forEach(r => {
        const did = r['診断ID'];
        stats.byDiagnosis[did] = (stats.byDiagnosis[did] || 0) + 1;
        const key = `${did}:${r['診断結果']}`;
        stats.byResult[key] = (stats.byResult[key] || 0) + 1;
      });
      return jsonResponse({ status: 'ok', data: stats });
    }

    // action === 'list'
    return jsonResponse({ status: 'ok', data: records });
  } catch (err) {
    return jsonResponse({ status: 'error', message: err.toString() });
  }
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
