/**
 * Men's Rise 診断クイズエンジン
 * MBTI風のポチポチ診断UIを実現する共通エンジン
 */

const HEADER_HTML = `
  <header class="header">
    <div class="container header-inner">
      <a href="index.html" style="display:inline-flex;text-decoration:none;">
        <img src="images/logo-white.png" alt="Men's Rise" class="header-logo-img" onerror="this.parentElement.innerHTML='<span class=header-logo>Men\\'s Rise</span>'">
      </a>
    </div>
  </header>`;

class QuizEngine {
  constructor(config) {
    this.diagnosisId = config.diagnosisId || 'unknown';
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
    // 名前が未登録ならまず名前入力、登録済みならスタート画面
    if (!MRDB.getName()) {
      this.renderNameInput();
    } else {
      this.renderStart();
    }
  }

  // ==================== 名前入力画面 ====================
  renderNameInput() {
    this.root.innerHTML = `
      <div class="page-wrapper">
        ${HEADER_HTML}
        <main class="container start-section">
          <div class="start-icon-svg">${this.iconSvg || this.icon}</div>
          <h1 class="start-title">${this.title}</h1>
          <p class="start-desc">診断をはじめる前に、<br>お名前を教えてください。</p>
          <div style="width:100%; max-width:320px; margin:24px auto 0;">
            <input type="text" id="nameInput" placeholder="例：山田 太郎"
              style="width:100%; padding:14px 16px; background:var(--bg-card); border:1px solid var(--border); border-radius:var(--radius-md); color:var(--text); font-family:inherit; font-size:0.95rem; text-align:center; margin-bottom:16px;"
              autocomplete="name">
            <button class="start-btn" id="nameSubmitBtn" style="width:100%;" disabled>
              診断をはじめる →
            </button>
            <p style="font-size:0.65rem; color:var(--text-muted); line-height:1.6; margin-top:16px; text-align:center;">
              ${CONFIG.PRIVACY_NOTICE}
            </p>
          </div>
        </main>
        <footer class="footer">© Men's Rise</footer>
      </div>
    `;

    const input = document.getElementById('nameInput');
    const btn = document.getElementById('nameSubmitBtn');

    // 入力があれば有効化
    input.addEventListener('input', () => {
      const trimmed = input.value.trim();
      btn.disabled = trimmed.length < 1;
      btn.style.opacity = trimmed.length < 1 ? '0.4' : '1';
    });

    // Enterキーでも送信
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !btn.disabled) btn.click();
    });

    btn.addEventListener('click', () => {
      const name = input.value.trim();
      if (!name) return;
      MRDB.saveName(name);
      this.renderStart();
    });

    input.focus();
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

    // 共有キー付きの質問：前回の回答をプレフィル（スキップはしない）
    let prefillValue = null;
    if (q.sharedKey) {
      prefillValue = MRDB.getShared(q.sharedKey);
    }

    const progress = ((this.currentQ) / this.questions.length) * 100;
    const canGoBack = this.currentQ > 0;

    let inputHTML = '';

    if (q.type === 'sub-questions') {
      inputHTML = this.renderSubQuestions(q);
    } else if (q.type === 'number') {
      inputHTML = this.renderNumberInput(q, prefillValue);
    } else if (q.type === 'multi-select') {
      inputHTML = this.renderMultiSelect(q);
    } else if (q.type === 'icon-choice') {
      inputHTML = `<div class="options-list icon-choice-list">
        ${q.options.map((opt, i) => `
          <button class="option-btn icon-choice-btn" data-value="${opt.value}" data-index="${i}">
            <span class="option-choice-icon">${opt.icon || ''}</span>
            <span class="option-choice-label">
              <span class="option-choice-title">${opt.label}</span>
              ${opt.desc ? `<span class="option-choice-desc">${opt.desc}</span>` : ''}
            </span>
          </button>
        `).join('')}
      </div>`;
    } else if (q.type === 'image-choice') {
      inputHTML = `<div class="image-choice-grid">
        ${q.options.map((opt, i) => `
          <button class="image-choice-btn" data-value="${opt.value}" data-index="${i}">
            <div class="image-choice-img" style="background-image:url('${opt.image}')"></div>
            <div class="image-choice-label">${opt.label}</div>
            ${opt.desc ? `<div class="image-choice-desc">${opt.desc}</div>` : ''}
          </button>
        `).join('')}
      </div>`;
    } else {
      inputHTML = `<div class="options-list">
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
            ${q.illustration ? `<div class="question-illustration">${q.illustration}</div>` : ''}
            ${inputHTML}
            ${canGoBack ? '<div style="margin-top:24px;"><button class="back-btn" id="backBtn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg> 前の質問に戻る</button></div>' : ''}
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
      // フォーカスリセット（選択肢が自動的に光るのを防ぐ）
      if (document.activeElement && document.activeElement.blur) {
        document.activeElement.blur();
      }
    });

    // 戻るボタン
    const backBtn = document.getElementById('backBtn');
    if (backBtn) {
      backBtn.addEventListener('click', () => this.prevQuestion());
    }

    // イベントリスナー（入力タイプ別）
    if (q.type === 'sub-questions') {
      this.attachSubQuestionListeners(q);
    } else if (q.type === 'number') {
      this.attachNumberInputListeners(q);
    } else if (q.type === 'multi-select') {
      this.attachMultiSelectListeners(q);
    } else if (q.type === 'image-choice') {
      this.root.querySelectorAll('.image-choice-btn').forEach(btn => {
        btn.addEventListener('click', () => this.selectImageOption(q.id, btn.dataset.value));
      });
    } else {
      this.root.querySelectorAll('.option-btn').forEach(btn => {
        btn.addEventListener('click', () => this.selectOption(q.id, btn.dataset.value));
      });
    }
  }

  selectImageOption(qId, value) {
    this.answers[qId] = value;
    const q = this.questions.find(x => x.id === qId);
    if (q) this.saveSharedIfNeeded(q, value);
    const btns = this.root.querySelectorAll('.image-choice-btn');
    btns.forEach(b => {
      if (b.dataset.value === value) b.classList.add('selected');
      else { b.style.opacity = '0.4'; b.style.pointerEvents = 'none'; }
    });
    setTimeout(() => this.nextQuestion(), 400);
  }

  // ==================== 数値入力 ====================
  renderNumberInput(q, prefill) {
    const fields = q.fields || [{ key: 'value', label: '', suffix: q.suffix || '' }];
    return `
      <div style="display:flex; flex-direction:column; gap:16px; max-width:320px; margin:0 auto;">
        ${fields.map(f => {
          // プレフィル値を取得
          let val = '';
          if (prefill !== null && prefill !== undefined) {
            if (typeof prefill === 'object') val = prefill[f.key] ?? '';
            else val = prefill;
          }
          return `
          <div>
            ${f.label ? `<label style="display:block; font-size:0.78rem; color:var(--text-secondary); margin-bottom:8px;">${f.label}</label>` : ''}
            <div style="display:flex; align-items:center; gap:8px;">
              <input type="number" inputmode="numeric" data-key="${f.key}" placeholder="${f.placeholder || ''}" value="${val}"
                style="flex:1; padding:14px 16px; background:var(--bg-card); border:1px solid var(--border); border-radius:var(--radius-md); color:var(--text); font-family:inherit; font-size:1rem; text-align:center;">
              ${f.suffix ? `<span style="color:var(--text-muted); font-size:0.85rem;">${f.suffix}</span>` : ''}
            </div>
          </div>
          `;
        }).join('')}
        <button class="start-btn" id="numNextBtn" style="width:100%; margin-top:8px;">
          次へ →
        </button>
      </div>
    `;
  }

  attachNumberInputListeners(q) {
    const inputs = this.root.querySelectorAll('input[type="number"]');
    const btn = document.getElementById('numNextBtn');

    const check = () => {
      const allFilled = Array.from(inputs).every(i => i.value.trim() !== '');
      btn.disabled = !allFilled;
      btn.style.opacity = allFilled ? '1' : '0.4';
    };
    check(); // 初期状態（プレフィルされていれば有効化される）

    inputs.forEach(input => {
      input.addEventListener('input', check);
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !btn.disabled) btn.click();
      });
    });

    btn.addEventListener('click', () => {
      if (btn.disabled) return;
      const values = {};
      inputs.forEach(input => {
        values[input.dataset.key] = parseInt(input.value, 10);
      });
      this.answers[q.id] = values;
      this.saveSharedIfNeeded(q, values);
      this.nextQuestion();
    });
  }

  // ==================== 複数選択 ====================
  renderMultiSelect(q) {
    return `
      <div class="options-list">
        ${q.options.map((opt, i) => `
          <button class="option-btn multi" data-value="${opt.value}" data-index="${i}">
            <span class="option-icon">✓</span>
            <span>${opt.label}</span>
          </button>
        `).join('')}
      </div>
      <button class="start-btn mt-24" id="multiNextBtn" style="width:100%;" disabled>
        次へ →
      </button>
    `;
  }

  attachMultiSelectListeners(q) {
    const selected = new Set();
    const btn = document.getElementById('multiNextBtn');
    const max = q.maxSelect || 3;

    this.root.querySelectorAll('.option-btn.multi').forEach(b => {
      b.addEventListener('click', () => {
        const val = b.dataset.value;
        if (selected.has(val)) {
          selected.delete(val);
          b.classList.remove('selected');
        } else if (selected.size < max) {
          selected.add(val);
          b.classList.add('selected');
        }
        btn.disabled = selected.size === 0;
        btn.style.opacity = selected.size === 0 ? '0.4' : '1';
      });
    });

    btn.addEventListener('click', () => {
      const arr = Array.from(selected);
      this.answers[q.id] = arr;
      this.saveSharedIfNeeded(q, arr);
      this.nextQuestion();
    });
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

  // ==================== 共有保存ヘルパー ====================
  saveSharedIfNeeded(q, value) {
    if (q.sharedKey) {
      MRDB.saveShared(q.sharedKey, value);
    }
  }

  // ==================== 選択処理 ====================
  selectOption(qId, value) {
    this.answers[qId] = value;
    const q = this.questions.find(x => x.id === qId);
    if (q) this.saveSharedIfNeeded(q, value);

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

  // ==================== 前の質問に戻る ====================
  prevQuestion() {
    if (this.currentQ <= 0) return;

    const currentQ = this.questions[this.currentQ];
    delete this.answers[currentQ.id];
    delete this.subAnswers[currentQ.id];

    const prevQ = this.questions[this.currentQ - 1];
    delete this.answers[prevQ.id];
    delete this.subAnswers[prevQ.id];

    const card = document.getElementById('questionCard');
    if (card) {
      card.style.animation = 'none';
      card.offsetHeight;
      card.style.animation = 'fadeOutDown 0.3s ease forwards';
    }

    setTimeout(() => {
      this.currentQ--;
      this.renderQuestion();
    }, 250);
  }

  // ==================== 結果表示 ====================
  // 回答を人間可読なテキストに変換（シート保存用）
  buildReadableAnswers() {
    const readable = {};
    this.questions.forEach(q => {
      const ans = this.answers[q.id];
      if (ans === undefined || ans === null) return;

      let label;
      if (q.type === 'sub-questions' && Array.isArray(ans)) {
        // 顔型診断のA/B選択配列：各サブ質問の回答ラベルに変換
        label = ans.map((v, i) => {
          const sub = q.subQuestions?.[i];
          const opt = sub?.options?.find(o => o.value === v);
          return opt ? opt.label : v;
        }).join(' / ');
      } else if (q.type === 'number' && typeof ans === 'object') {
        // 数値入力：身長175cm、体重68kg のような形式
        label = (q.fields || []).map(f => {
          const v = ans[f.key];
          if (v === undefined || v === null || v === '') return null;
          return `${f.label || ''}${v}${f.suffix || ''}`;
        }).filter(Boolean).join('、');
      } else if (q.type === 'multi-select' && Array.isArray(ans)) {
        label = ans.map(v => {
          const o = (q.options || []).find(o => o.value === v);
          return o ? o.label : v;
        }).join('、');
      } else {
        // single-choice / icon-choice / image-choice
        const o = (q.options || []).find(o => o.value === ans);
        label = o ? o.label : ans;
      }

      const questionText = (q.text || '').replace(/<br\s*\/?>/gi, ' ');
      readable[questionText] = label;
    });
    return readable;
  }

  showResult() {
    const result = this.calcResult(this.answers);
    const resultHTML = this.renderResult(result, this.answers);
    const answersReadable = this.buildReadableAnswers();

    // ランダムCTA
    const cta = getRandomCTA();

    this.root.innerHTML = `
      <div class="page-wrapper">
        ${HEADER_HTML}
        <main class="container result-section">
          <a href="#mainCta" class="result-peek-cta">
            <span class="result-peek-accent"></span>
            <svg class="result-peek-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 2L14 10L22 12L14 14L12 22L10 14L2 12L10 10L12 2Z"/>
            </svg>
            <div class="result-peek-text">
              <div class="result-peek-title">この結果を踏まえた個別アドバイスあり</div>
              <div class="result-peek-sub">下までスクロールしてチェック</div>
            </div>
            <svg class="result-peek-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 5v14M19 12l-7 7-7-7"/>
            </svg>
          </a>

          ${resultHTML}

          <div class="cta-section" id="mainCta">
            <div class="cta-card">
              <div class="cta-card-glow"></div>
              <div class="cta-card-inner">
                <div class="cta-card-eyebrow">${cta.title}</div>
                <h3 class="cta-card-title">
                  あなた専用の男磨きロードマップが<br>
                  <span class="cta-card-accent">明確になる無料の個別説明会</span>
                </h3>
                <p class="cta-card-body">${cta.body}</p>
                <a href="${CONFIG.CTA_URL}" class="cta-btn cta-btn-large" id="ctaBtnMain" target="_blank" rel="noopener">
                  <span class="cta-btn-arrow">▶</span>
                  タップして詳細を確認する
                </a>
              </div>
            </div>
            <a href="index.html" class="cta-btn-secondary">
              他の診断もやってみる
            </a>
          </div>
        </main>
        <footer class="footer">© Men's Rise</footer>
      </div>
      <a href="${CONFIG.CTA_URL}" class="cta-fab" id="ctaSticky" target="_blank" rel="noopener" aria-label="無料の個別説明会の詳細を見る">
        <span class="cta-fab-badge">無料</span>
        <span class="cta-fab-ring"></span>
        <svg class="cta-fab-icon" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      </a>
    `;

    // DOM描画後に結果タイプ名を抽出してデータベース保存
    const resultTypeEl = this.root.querySelector('.result-type');
    const resultLabel = resultTypeEl ? resultTypeEl.textContent.replace(/\s+/g, ' ').trim() : '';

    MRDB.saveResult({
      diagnosisId: this.diagnosisId,
      diagnosisName: this.title.replace(/<br\s*\/?>/gi, ' '),
      answers: this.answers,
      answersReadable: answersReadable,
      result: result,
      resultLabel: resultLabel
    });

    // CTAボタン（説明会ページへのリンク）クリック計測
    const self = this;
    const ctaBtn = document.getElementById('ctaBtnMain');
    if (ctaBtn) {
      ctaBtn.addEventListener('click', () => {
        MRDB.trackCtaClick({
          source: 'result',
          diagnosisId: self.diagnosisId,
          diagnosisName: self.title.replace(/<br\s*\/?>/gi, ' '),
          url: CONFIG.CTA_URL
        });
      });
    }

    // スティッキーCTAの表示制御＋クリック計測
    const sticky = document.getElementById('ctaSticky');
    const mainCtaEl = document.getElementById('mainCta');
    if (sticky && mainCtaEl) {
      let shown = false;
      const onScroll = () => {
        if (!shown && window.scrollY > 200) {
          sticky.classList.add('is-visible');
          shown = true;
        }
      };
      window.addEventListener('scroll', onScroll, { passive: true });

      const io = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) sticky.classList.add('is-hidden');
          else sticky.classList.remove('is-hidden');
        });
      }, { threshold: 0.3 });
      io.observe(mainCtaEl);

      sticky.addEventListener('click', () => {
        MRDB.trackCtaClick({
          source: 'sticky',
          diagnosisId: self.diagnosisId,
          diagnosisName: self.title.replace(/<br\s*\/?>/gi, ' '),
          url: CONFIG.CTA_URL
        });
      });
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ==================== ユーティリティ ====================
  static resultCard(title, body) {
    return `
      <div class="result-card">
        <div class="result-card-title">${title}</div>
        <div class="result-card-body">${body}</div>
      </div>
    `;
  }

  // 後方互換：既存コードが呼ぶgatedBlockを通常のresultCardに変換（ゲーティング廃止）
  static gatedBlock(title, contentHTML) {
    // ゲーティング廃止につき、普通のresultCardとして表示
    return '';  // 完全非表示
  }
}

window.QuizEngine = QuizEngine;
