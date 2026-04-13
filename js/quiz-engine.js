/**
 * Men's Rise 診断クイズエンジン
 * MBTI風のポチポチ診断UIを実現する共通エンジン
 */

const HEADER_HTML = `
  <header class="header">
    <div class="container header-inner">
      <img src="images/logo-white.png" alt="Men's Rise" class="header-logo-img" onerror="this.parentElement.innerHTML='<span class=header-logo>Men\\'s Rise</span>'">
    </div>
  </header>`;

const CTA_URL = 'https://info.opt--in.com/page/OenZEyCyYPQH?ftid=tD53IsLSjGP9';

class QuizEngine {
  constructor(config) {
    this.title = config.title;
    this.description = config.description;
    this.icon = config.icon || '';
    this.iconSvg = config.iconSvg || '';
    this.questions = config.questions;
    this.calcResult = config.calcResult;
    this.renderResult = config.renderResult;
    this.meta = config.meta || '所要時間：約2分';

    this.currentQ = 0;
    this.answers = {};
    this.subAnswers = {};

    this.root = document.getElementById('app');
    this.init();
  }

  init() {
    this.renderStart();
  }

  // ==================== スタート画面 ====================
  renderStart() {
    this.root.innerHTML = `
      <div class="page-wrapper">
        ${HEADER_HTML}
        <main class="container start-section">
          <div class="start-icon-svg">${this.iconSvg || this.icon}</div>
          <h1 class="start-title">${this.title}</h1>
          <p class="start-desc">${this.description}</p>
          <p class="start-meta">${this.meta}</p>
          <button class="start-btn" id="startBtn">
            診断スタート →
          </button>
        </main>
        <footer class="footer">© Men's Rise</footer>
      </div>
    `;
    document.getElementById('startBtn').addEventListener('click', () => this.startQuiz());
  }

  // ==================== クイズ開始 ====================
  startQuiz() {
    this.currentQ = 0;
    this.answers = {};
    this.subAnswers = {};
    this.renderQuestion();
  }

  // ==================== 質問レンダリング ====================
  renderQuestion() {
    const q = this.questions[this.currentQ];
    const progress = ((this.currentQ) / this.questions.length) * 100;

    let optionsHTML = '';

    if (q.type === 'sub-questions') {
      optionsHTML = this.renderSubQuestions(q);
    } else {
      optionsHTML = `<div class="options-list">
        ${q.options.map((opt, i) => `
          <button class="option-btn" data-value="${opt.value}" data-index="${i}">
            <span class="option-icon">${String.fromCharCode(65 + i)}</span>
            <span>${opt.label}</span>
          </button>
        `).join('')}
      </div>`;
    }

    this.root.innerHTML = `
      <div class="page-wrapper">
        ${HEADER_HTML}
        <div class="progress-wrapper">
          <div class="container">
            <div class="progress-info">
              <span class="progress-label">回答中...</span>
              <span class="progress-count">${this.currentQ + 1} / ${this.questions.length}</span>
            </div>
            <div class="progress-bar">
              <div class="progress-fill" style="width: ${progress}%"></div>
            </div>
          </div>
        </div>
        <main class="container quiz-section">
          <div class="question-card" id="questionCard">
            <span class="question-number">${this.currentQ + 1}</span>
            <h2 class="question-text">${q.text}</h2>
            ${q.hint ? `<p class="question-hint">${q.hint}</p>` : ''}
            ${optionsHTML}
          </div>
        </main>
        <footer class="footer">© Men's Rise</footer>
      </div>
    `;

    // プログレスバーアニメーション
    requestAnimationFrame(() => {
      const fill = this.root.querySelector('.progress-fill');
      if (fill) {
        fill.style.width = `${((this.currentQ + 1) / this.questions.length) * 100}%`;
      }
    });

    // イベントリスナー
    if (q.type === 'sub-questions') {
      this.attachSubQuestionListeners(q);
    } else {
      this.root.querySelectorAll('.option-btn').forEach(btn => {
        btn.addEventListener('click', () => this.selectOption(q.id, btn.dataset.value));
      });
    }
  }

  // ==================== サブ質問（顔型診断用） ====================
  renderSubQuestions(q) {
    return `
      <div class="sub-questions">
        ${q.subQuestions.map((sq, si) => `
          <div class="sub-question" data-sub-index="${si}">
            <div class="sub-question-label">${sq.label}</div>
            <div class="sub-options">
              ${sq.options.map((opt, oi) => `
                <button class="sub-option-btn" data-sub="${si}" data-value="${opt.value}">
                  ${opt.label}
                </button>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
      <button class="start-btn mt-24" id="subNextBtn" style="display:none; width:100%;">
        次へ →
      </button>
    `;
  }

  attachSubQuestionListeners(q) {
    if (!this.subAnswers[q.id]) this.subAnswers[q.id] = {};

    this.root.querySelectorAll('.sub-option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const subIdx = btn.dataset.sub;
        const value = btn.dataset.value;
        this.subAnswers[q.id][subIdx] = value;

        btn.parentElement.querySelectorAll('.sub-option-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');

        const total = q.subQuestions.length;
        const answered = Object.keys(this.subAnswers[q.id]).length;
        if (answered >= total) {
          const nextBtn = document.getElementById('subNextBtn');
          if (nextBtn) {
            nextBtn.style.display = 'flex';
            nextBtn.onclick = () => {
              const values = Object.values(this.subAnswers[q.id]);
              this.answers[q.id] = values;
              this.nextQuestion();
            };
          }
        }
      });
    });
  }

  // ==================== 選択処理 ====================
  selectOption(qId, value) {
    this.answers[qId] = value;

    const btns = this.root.querySelectorAll('.option-btn');
    btns.forEach(b => {
      if (b.dataset.value === value) {
        b.classList.add('selected');
      } else {
        b.style.opacity = '0.4';
        b.style.pointerEvents = 'none';
      }
    });

    setTimeout(() => this.nextQuestion(), 400);
  }

  // ==================== 次の質問 or 結果 ====================
  nextQuestion() {
    const card = document.getElementById('questionCard');
    if (card) card.classList.add('slide-out');

    setTimeout(() => {
      this.currentQ++;
      if (this.currentQ >= this.questions.length) {
        this.showResult();
      } else {
        this.renderQuestion();
      }
    }, 300);
  }

  // ==================== 結果表示 ====================
  showResult() {
    const result = this.calcResult(this.answers);
    const resultHTML = this.renderResult(result, this.answers);

    this.root.innerHTML = `
      <div class="page-wrapper">
        ${HEADER_HTML}
        <main class="container result-section">
          ${resultHTML}
          <div class="cta-section">
            <a href="${CTA_URL}" class="cta-btn" target="_blank" rel="noopener">
              完全版を受け取る（無料）
            </a>
            <a href="index.html" class="cta-btn-secondary">
              他の診断もやってみる
            </a>
          </div>
        </main>
        <footer class="footer">© Men's Rise</footer>
      </div>
    `;

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ==================== ユーティリティ ====================
  static gatedBlock(title, contentHTML) {
    return `
      <div class="gated-section">
        <div class="gated-content">
          <div class="result-card">
            <div class="result-card-title">${title}</div>
            <div class="result-card-body">${contentHTML}</div>
          </div>
        </div>
        <div class="gated-overlay">
          <div class="gated-icon-svg">${typeof MR_ICONS !== 'undefined' ? MR_ICONS.lock : '🔒'}</div>
          <div class="gated-title">完全版はこちら</div>
          <div class="gated-desc">個別説明会に参加すると<br>あなた専用の完全版が受け取れます</div>
          <a href="${CTA_URL}" class="cta-btn" target="_blank" rel="noopener" style="width: auto; padding: 12px 32px; font-size: 0.85rem;">
            完全版を受け取る →
          </a>
        </div>
      </div>
    `;
  }

  static resultCard(title, body) {
    return `
      <div class="result-card">
        <div class="result-card-title">${title}</div>
        <div class="result-card-body">${body}</div>
      </div>
    `;
  }
}

window.QuizEngine = QuizEngine;
