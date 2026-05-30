/**
 * AI数字员工 V5.1 - Canvas双曲线图表与优化布局版本
 * 核心功能：Canvas双曲线绘制、圈数显示优化、二维码修复
 */

// ==================== 指数计算函数 ====================
function calculateEfficiency(loops) {
  // y = 1 + 2^(x/3)
  // 0圈 = 1x, 3圈 = 2x, 10圈 ≈ 10x
  return 1 + Math.pow(2, loops / 3);
}

// ==================== 配置 ====================
const CONFIG = {
  colors: {
    background: '#0A2E3A',
    accent: '#00E5FF',
    accentSecondary: '#00D4A0',
    text: '#FFFFFF',
    textSecondary: '#008080'
  },
  animation: {
    particleCount: 50,
    particleSpeed: 0.3
  },
  growth: {
    stages: [
      { loops: 0, efficiency: 1, speed: 1.0, accuracy: 85, fit: 70 },
      { loops: 1, efficiency: 2, speed: 1.2, accuracy: 88, fit: 75 },
      { loops: 2, efficiency: 3.4, speed: 1.5, accuracy: 91, fit: 82 },
      { loops: 3, efficiency: 6.8, speed: 2.0, accuracy: 95, fit: 88 },
      { loops: 4, efficiency: 10, speed: 2.8, accuracy: 97, fit: 93 },
      { loops: 5, efficiency: 20, speed: 4.0, accuracy: 99, fit: 96 },
      { loops: 10, efficiency: 40, speed: 8.0, accuracy: 99.5, fit: 98 }
    ]
  }
};

// ==================== 步骤详情数据 ====================
const STEP_DETAILS = {
  1: {
    title: '场景触发',
    badge: '起点',
    content: `
      <p>当你在工作中遇到重复性任务或需要决策的场景时，就是培养AI员工的起点。</p>

      <div class="detail-highlight">
        <div class="detail-highlight-title">典型场景示例</div>
        <div class="detail-highlight-text">
          周报生成、数据分析、客户邮件回复、会议纪要整理、文档撰写、代码审查等
        </div>
      </div>

      <p><strong>场景识别原则：</strong></p>
      <ul>
        <li>高频重复：每周或每天都要做的任务</li>
        <li>规则明确：有清晰的操作流程和标准</li>
        <li>可文档化：能够用文字描述完整上下文</li>
      </ul>
    `
  },
  2: {
    title: '提给AI',
    badge: '输入',
    content: `
      <p>将场景和需求完整地描述给AI，这是培养成功的关键第一步。</p>

      <div class="detail-highlight">
        <div class="detail-highlight-title">关键：给AI完整上下文</div>
        <div class="detail-highlight-text">
          ❌ 错误示例："帮我写个周报"<br>
          ✓ 正确示例："请帮我写周报，格式参考之前发送的文件，本周完成了X项目，跟进Y客户..."
        </div>
      </div>

      <p><strong>有效的提示包含：</strong></p>
      <ul>
        <li>任务目标：明确要达成什么结果</li>
        <li>参考Example：提供1-2个历史优秀案例</li>
        <li>约束条件：格式、长度、风格等要求</li>
        <li>背景信息：项目背景、受众、使用场景</li>
      </ul>
    `
  },
  3: {
    title: '设计方案',
    badge: 'AI思考',
    content: `
      <p>AI基于你提供的上下文，生成完整的解决方案或执行方案。</p>

      <div class="detail-highlight">
        <div class="detail-highlight-title">AI的方案质量取决于</div>
        <div class="detail-highlight-text">
          上下文的完整性 + Example的质量 + 任务的明确性
        </div>
      </div>

      <p><strong>方案形式：</strong></p>
      <ul>
        <li>结构化输出：大纲、框架、步骤清单</li>
        <li>内容草稿：文档初稿、邮件正文、报告内容</li>
        <li>执行计划：命令序列、操作步骤、配置文件</li>
      </ul>
    `
  },
  4: {
    title: '确认',
    badge: '人工审核',
    content: `
      <p>人工审核AI生成的方案，确认无误后进入执行阶段。</p>

      <div class="detail-highlight">
        <div class="detail-highlight-title">为什么需要人工确认？</div>
        <div class="detail-highlight-text">
          AI可能产生幻觉，理解偏差，或遗漏关键信息。人工确认是质量保证的关键环节。
        </div>
      </div>

      <p><strong>审核要点：</strong></p>
      <ul>
        <li>准确性：信息是否正确，逻辑是否完整</li>
        <li>完整性：是否覆盖了所有需求点</li>
        <li>适配性：是否符合目标受众和使用场景</li>
        <li>风险性：是否存在敏感信息或错误表述</li>
      </ul>
    `
  },
  5: {
    title: '执行',
    badge: 'AI行动',
    content: `
      <p>AI根据确认的方案，执行具体的任务操作。</p>

      <div class="detail-highlight">
        <div class="detail-highlight-title">执行形式</div>
        <div class="detail-highlight-text">
          内容生成、数据处理、文件操作、命令执行、API调用等
        </div>
      </div>

      <p><strong>执行能力：</strong></p>
      <ul>
        <li>文本处理：撰写、编辑、翻译、摘要</li>
        <li>数据分析：处理表格、生成图表、计算指标</li>
        <li>文件操作：读取、解析、格式转换</li>
        <li>系统集成：调用API、执行命令、自动化流程</li>
      </ul>
    `
  },
  6: {
    title: '数据反馈',
    badge: '结果收集',
    content: `
      <p>收集执行结果，包括成功数据和失败案例，形成反馈闭环。</p>

      <div class="detail-highlight">
        <div class="detail-highlight-title">反馈数据类型</div>
        <div class="detail-highlight-text">
          执行成功率、用户满意度、修正次数、错误类型、耗时统计
        </div>
      </div>

      <p><strong>成功数据：</strong></p>
      <ul>
        <li>采纳率：方案被直接采纳的比例</li>
        <li>满意度：用户对结果的主观评价</li>
        <li>效率：从生成到完成的时间</li>
      </ul>

      <p><strong>反馈的价值：</strong></p>
      <ul>
        <li>指导AI优化：告诉AI哪些方案更有效</li>
        <li>知识库更新：将成功案例沉淀为模板</li>
        <li>流程改进：发现系统性问题并优化</li>
      </ul>
    `
  },
  7: {
    title: '认知沉淀',
    badge: '知识积累',
    content: `
      <p>将成功经验固化到知识库，形成可复用的方案模板。</p>

      <div class="detail-highlight">
        <div class="detail-highlight-title">沉淀的内容</div>
        <div class="detail-highlight-text">
          优秀提示词、成功方案模板、错误案例库、最佳实践、上下文模式
        </div>
      </div>

      <p><strong>知识库结构：</strong></p>
      <ul>
        <li>场景模板：针对特定场景的标准方案</li>
        <li>提示词库：经过验证的有效提示词</li>
        <li>案例库：历史成功和失败案例</li>
        <li>上下文库：常见的上下文信息模板</li>
      </ul>

      <p><strong>下次复用机制：</strong></p>
      <ul>
        <li>下次遇到相同场景时，AI自动调用知识库</li>
        <li>提示词匹配：根据当前提示词匹配历史成功案例</li>
        <li>上下文补全：自动补充相关的上下文信息</li>
      </ul>
    `
  }
};

// ==================== 粒子系统 ====================
class Particle {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.reset(options);
  }

  reset(options = {}) {
    this.x = Math.random() * this.canvas.width;
    this.y = Math.random() * this.canvas.height;
    this.size = Math.random() * 2 + 1;
    const speed = options.speed || CONFIG.animation.particleSpeed;
    this.vx = (Math.random() - 0.5) * speed;
    this.vy = (Math.random() - 0.5) * speed;
    this.alpha = Math.random() * 0.5 + 0.2;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0) this.x = this.canvas.width;
    if (this.x > this.canvas.width) this.x = 0;
    if (this.y < 0) this.y = this.canvas.height;
    if (this.y > this.canvas.height) this.y = 0;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    this.ctx.fillStyle = `rgba(0, 229, 255, ${this.alpha})`;
    this.ctx.fill();
  }
}

class ParticleSystem {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) {
      console.error(`Canvas #${canvasId} not found`);
      return;
    }

    if (!this.canvas.getContext) {
      console.warn('Canvas not supported');
      return;
    }

    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.animationId = null;

    const isMobile = window.innerWidth < 768;
    CONFIG.animation.particleCount = isMobile ? 30 : 50;

    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  init() {
    const count = CONFIG.animation.particleCount;
    for (let i = 0; i < count; i++) {
      this.particles.push(new Particle(this.canvas));
    }
  }

  start() {
    if (!this.ctx) return;
    if (!this.particles.length) {
      this.init();
    }
    this.animate();
  }

  stop() {
    if (this.animationId) {
      const cRAF = window.cancelAnimationFrame ||
                   window.webkitCancelAnimationFrame ||
                   window.mozCancelAnimationFrame ||
                   clearTimeout;
      cRAF.call(window, this.animationId);
      this.animationId = null;
    }
  }

  animate() {
    if (!this.ctx) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.particles.forEach(particle => {
      particle.update();
      particle.draw();
    });

    const rAF = window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                function(callback) { setTimeout(callback, 16); };

    this.animationId = rAF(() => this.animate());
  }

  destroy() {
    this.stop();
    window.removeEventListener('resize', this.resize);
  }
}

// ==================== 滚动触发动画 ====================
function initScrollAnimations() {
  const sections = document.querySelectorAll('section');

  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    observer.observe(section);
  });

  return observer;
}

// ==================== 数字动画 ====================
function animateNumbers() {
  const stats = document.querySelectorAll('.stat-value');

  stats.forEach(stat => {
    const target = parseInt(stat.getAttribute('data-target'));
    if (!target) return;

    const duration = 2000;
    const startTime = performance.now();
    const startValue = 0;

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(startValue + (target - startValue) * easeOut);

      stat.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  });
}

// ==================== 转盘控制器 ====================
class TurntableController {
  constructor() {
    this.ring = document.getElementById('turntable-ring');
    this.center = document.querySelector('.turntable-center');
    this.efficiencyValue = document.getElementById('efficiency-value');
    this.loopCountDisplay = document.querySelector('.loop-count');
    this.spinBtn = document.getElementById('spin-btn');
    this.resetBtn = document.getElementById('reset-btn');

    this.currentRotation = 0;
    this.loopCount = 0;
    this.currentStep = 0;
    this.isSpinning = false;

    // 初始化节点位置
    this.initNodePositions();
    this.bindEvents();
  }

  initNodePositions() {
    const nodes = this.ring.querySelectorAll('.turntable-node');
    const radius = this.ring.offsetWidth / 2 - 40;

    nodes.forEach(node => {
      const angle = parseInt(node.getAttribute('data-angle'));
      const radians = (angle - 90) * Math.PI / 180;
      const x = Math.cos(radians) * radius;
      const y = Math.sin(radians) * radius;

      node.style.transform = `translate(${x}px, ${y}px)`;
    });
  }

  bindEvents() {
    this.spinBtn.addEventListener('click', () => this.spin());
    this.resetBtn.addEventListener('click', () => this.reset());

    // 节点点击事件
    const nodes = this.ring.querySelectorAll('.turntable-node');
    nodes.forEach(node => {
      node.addEventListener('click', () => {
        const step = parseInt(node.getAttribute('data-step'));
        this.showStepDetail(step);
      });
    });

    // 添加拖动旋转功能
    this.initDragRotation();

    // 窗口大小变化时重新计算节点位置
    window.addEventListener('resize', () => {
      setTimeout(() => this.initNodePositions(), 100);
    });
  }

  initDragRotation() {
    const ring = this.ring;
    let isDragging = false;
    let startAngle = 0;
    let currentRotation = 0;

    // 计算从中心点的角度
    const getAngle = (clientX, clientY) => {
      const rect = ring.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      return Math.atan2(clientY - centerY, clientX - centerX) * 180 / Math.PI;
    };

    // 鼠标事件
    ring.addEventListener('mousedown', (e) => {
      isDragging = true;
      startAngle = getAngle(e.clientX, e.clientY);
      currentRotation = this.currentRotation;
      ring.style.transition = 'none';
    });

    // 触摸事件
    ring.addEventListener('touchstart', (e) => {
      isDragging = true;
      const touch = e.touches[0];
      startAngle = getAngle(touch.clientX, touch.clientY);
      currentRotation = this.currentRotation;
      ring.style.transition = 'none';
      e.preventDefault();
    }, { passive: false });

    const handleMove = (clientX, clientY) => {
      if (!isDragging) return;

      const angle = getAngle(clientX, clientY);
      const deltaAngle = angle - startAngle;

      this.currentRotation = currentRotation + deltaAngle;
      ring.style.transform = `rotate(${this.currentRotation}deg)`;
    };

    const handleEnd = () => {
      if (!isDragging) return;
      isDragging = false;

      // 计算转动了多少圈
      const rotationDiff = this.currentRotation - currentRotation;
      const additionalLoops = Math.floor(Math.abs(rotationDiff) / 360);

      if (additionalLoops > 0) {
        this.loopCount += additionalLoops;
        this.updateDisplay();
      }

      ring.style.transition = 'transform 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
    };

    // 鼠标移动
    document.addEventListener('mousemove', (e) => {
      handleMove(e.clientX, e.clientY);
    });

    document.addEventListener('mouseup', handleEnd);

    // 触摸移动
    document.addEventListener('touchmove', (e) => {
      if (isDragging) {
        const touch = e.touches[0];
        handleMove(touch.clientX, touch.clientY);
        e.preventDefault();
      }
    }, { passive: false });

    document.addEventListener('touchend', handleEnd);
  }

  spin() {
    if (this.isSpinning) return;

    this.isSpinning = true;
    this.spinBtn.disabled = true;

    // 每次转动一圈（360度）
    const rotation = 360;
    this.currentRotation += rotation;
    this.loopCount++;

    // 更新转盘旋转
    this.ring.style.transform = `rotate(${this.currentRotation}deg)`;

    // 延迟更新显示，让动画更流畅
    setTimeout(() => {
      this.updateDisplay();
      // 移除自动显示步骤详情，只在用户点击具体步骤时显示
      // this.highlightCurrentStep();
      this.isSpinning = false;
      this.spinBtn.disabled = false;
    }, 1500);
  }

  reset() {
    this.loopCount = 0;
    this.currentRotation = 0;
    this.currentStep = 0;

    this.ring.style.transition = 'transform 1s ease';
    this.ring.style.transform = 'rotate(0deg)';

    setTimeout(() => {
      this.ring.style.transition = 'transform 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
      this.updateDisplay();
      this.resetStepDetail();
    }, 1000);

    // 重置指标
    updateMetrics(0);
    updateChart(0);
  }

  updateDisplay() {
    // 根据圈数计算效率
    const efficiency = this.calculateEfficiency(this.loopCount);
    this.efficiencyValue.textContent = efficiency;
    this.loopCountDisplay.textContent = this.loopCount;

    // 更新指标
    updateMetrics(this.loopCount);

    // 更新图表
    updateChart(this.loopCount);
  }

  calculateEfficiency(loops) {
    if (loops === 0) return 1;
    if (loops === 1) return 2; // 第1次转动：成长1倍（1→2）
    if (loops === 2) return 3.4; // 第2次转动：1.7倍增长
    if (loops === 3) return 6.8; // 第3次转动：2倍增长
    if (loops === 4) return 10; // 第4次转动：达到10倍目标
    if (loops === 5) return 20; // 第5次转动：继续指数增长
    return Math.min(50, 10 * Math.pow(2, loops - 4)); // 之后继续指数增长
  }

  highlightCurrentStep() {
    // 移除所有高亮
    const nodes = this.ring.querySelectorAll('.turntable-node');
    nodes.forEach(node => node.classList.remove('active'));

    // 高亮当前步骤（循环显示1-7）
    this.currentStep = (this.currentStep % 7) + 1;
    const currentNode = this.ring.querySelector(`[data-step="${this.currentStep}"]`);
    if (currentNode) {
      currentNode.classList.add('active');
    }

    // 不再自动显示步骤详情，只在用户点击具体步骤时显示
  }

  showStepDetail(stepNumber) {
    const detail = STEP_DETAILS[stepNumber];
    if (!detail) return;

    const panel = document.getElementById('step-detail');
    const content = panel.querySelector('.detail-content');

    panel.classList.add('active');

    content.innerHTML = `
      <div class="detail-header">
        <div class="detail-number">${stepNumber}</div>
        <div class="detail-title">${detail.title}</div>
        <div class="detail-badge">${detail.badge}</div>
      </div>
      <div class="detail-body">
        ${detail.content}
      </div>
    `;

    // 平滑滚动到详情面板
    panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  resetStepDetail() {
    const panel = document.getElementById('step-detail');
    const content = panel.querySelector('.detail-content');

    panel.classList.remove('active');

    content.innerHTML = `
      <div class="detail-placeholder">
        <div class="placeholder-icon">👆</div>
        <div class="placeholder-text">点击"转动一圈"开始培养</div>
      </div>
    `;

    // 移除所有节点高亮
    const nodes = this.ring.querySelectorAll('.turntable-node');
    nodes.forEach(node => node.classList.remove('active'));
  }
}

// ==================== 指标计算（指数型） ====================
function calculateExponentialMetric(loops, baseValue, maxValue, growthRate) {
  if (loops === 0) return baseValue;
  if (loops === 1) return baseValue + (maxValue - baseValue) * 0.1;
  if (loops === 2) return baseValue + (maxValue - baseValue) * 0.25;
  if (loops === 3) return baseValue + (maxValue - baseValue) * 0.5;
  if (loops === 4) return baseValue + (maxValue - baseValue) * 0.75;
  if (loops === 5) return maxValue;
  // 指数增长
  const growth = Math.pow(growthRate, loops - 5);
  return Math.min(maxValue * 1.5, maxValue * growth);
}

// ==================== 指标更新 ====================
function updateMetrics(loops) {
  // 使用指数型计算
  const speed = calculateExponentialMetric(loops, 1.0, 10.0, 1.3);
  const accuracy = calculateExponentialMetric(loops, 85, 99.9, 1.1);
  const fit = calculateExponentialMetric(loops, 70, 99, 1.15);

  // 更新速度指标
  const speedElement = document.querySelector('[data-metric="speed"]');
  const speedFill = document.querySelector('[data-fill="speed"]');
  if (speedElement && speedFill) {
    animateValue(speedElement, parseFloat(speedElement.textContent), speed, 1000);
    speedFill.style.width = `${(speed / 12) * 100}%`;
  }

  // 更新准确率指标
  const accuracyElement = document.querySelector('[data-metric="accuracy"]');
  const accuracyFill = document.querySelector('[data-fill="accuracy"]');
  if (accuracyElement && accuracyFill) {
    animateValue(accuracyElement, parseInt(accuracyElement.textContent), accuracy, 1000);
    accuracyFill.style.width = `${accuracy}%`;
  }

  // 更新贴合度指标
  const fitElement = document.querySelector('[data-metric="fit"]');
  const fitFill = document.querySelector('[data-fill="fit"]');
  if (fitElement && fitFill) {
    animateValue(fitElement, parseInt(fitElement.textContent), fit, 1000);
    fitFill.style.width = `${fit}%`;
  }
}

function animateValue(element, start, end, duration) {
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    const easeOut = 1 - Math.pow(1 - progress, 3);
    const current = start + (end - start) * easeOut;

    if (Number.isInteger(end)) {
      element.textContent = Math.round(current);
    } else {
      element.textContent = current.toFixed(1);
    }

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

// ==================== 图表更新 ====================
function updateChart(loops) {
  const dataItems = document.querySelectorAll('.data-item');

  dataItems.forEach(item => {
    const itemLoops = parseInt(item.getAttribute('data-loop'));

    // 根据当前圈数高亮对应的数据项
    if (loops >= itemLoops) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
}

// ==================== 成长图表配置常量 ====================
const CHART_CONFIG = {
  MAX_Y: 12,
  CURVE_STEP: 0.1,
  CURRENT_POINT_RADIUS: 8,
  LEGEND_OFFSET_X: 150,
  LEGEND_OFFSET_Y: 20,
  COLORS: {
    TRADITIONAL_LINE: 'rgba(255, 255, 255, 0.3)',
    DIGITAL_GRADIENT_START: '#00E5FF',
    DIGITAL_GRADIENT_END: '#00D4A0',
    CURRENT_POINT: '#00E5FF'
  },
  FONTS: {
    LABEL: '12px sans-serif',
    VALUE: 'bold 14px sans-serif'
  }
};

// ==================== 成长曲线图表绘制 ====================
class GrowthChart {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) {
      console.error(`Canvas #${canvasId} not found`);
      return;
    }

    this.ctx = this.canvas.getContext('2d');
    this.padding = { top: 40, right: 40, bottom: 60, left: 60 };
    this.currentLoops = 0;

    // 存储resize处理器以便后续清理
    this.resizeHandler = () => {
      this.resize();
      this.draw(this.currentLoops);
    };

    // 设置Canvas尺寸
    this.resize();
    window.addEventListener('resize', this.resizeHandler);
  }

  resize() {
    const container = this.canvas.parentElement;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const width = rect.width - 40; // 减去padding
    const height = 400; // 固定高度
    const dpr = window.devicePixelRatio || 1;

    // 设置实际像素尺寸
    this.canvas.width = width * dpr;
    this.canvas.height = height * dpr;

    // 设置CSS尺寸
    this.canvas.style.width = width + 'px';
    this.canvas.style.height = height + 'px';

    // 重置变换矩阵并设置缩放（仅执行一次）
    this.ctx.setTransform(1, 0, 0, 1, 0, 0); // 重置
    this.ctx.scale(dpr, dpr);

    this.width = width;
    this.height = height;
  }

  // 将圈数映射到X坐标
  getX(loops) {
    const chartWidth = this.width - this.padding.left - this.padding.right;
    return this.padding.left + (loops / 10) * chartWidth;
  }

  // 将效率值映射到Y坐标
  getY(efficiency) {
    const chartHeight = this.height - this.padding.top - this.padding.bottom;
    return this.height - this.padding.bottom - (efficiency / CHART_CONFIG.MAX_Y) * chartHeight;
  }

  drawAxes() {
    const ctx = this.ctx;
    const chartWidth = this.width - this.padding.left - this.padding.right;
    const chartHeight = this.height - this.padding.top - this.padding.bottom;

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 1;

    // 绘制网格线（Y轴）
    for (let i = 0; i <= CHART_CONFIG.MAX_Y; i += 2) {
      const y = this.getY(i);

      ctx.beginPath();
      ctx.moveTo(this.padding.left, y);
      ctx.lineTo(this.width - this.padding.right, y);
      ctx.stroke();

      // Y轴标签
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.font = CHART_CONFIG.FONTS.LABEL;
      ctx.textAlign = 'right';
      ctx.fillText(i + 'x', this.padding.left - 10, y + 4);
    }

    // 绘制网格线（X轴）
    for (let i = 0; i <= 10; i += 2) {
      const x = this.getX(i);

      ctx.beginPath();
      ctx.moveTo(x, this.padding.top);
      ctx.lineTo(x, this.height - this.padding.bottom);
      ctx.stroke();

      // X轴标签
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.font = CHART_CONFIG.FONTS.LABEL;
      ctx.textAlign = 'center';
      ctx.fillText(i + '圈', x, this.height - this.padding.bottom + 20);
    }

    // 坐标轴
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.lineWidth = 2;

    // Y轴
    ctx.beginPath();
    ctx.moveTo(this.padding.left, this.padding.top);
    ctx.lineTo(this.padding.left, this.height - this.padding.bottom);
    ctx.stroke();

    // X轴
    ctx.beginPath();
    ctx.moveTo(this.padding.left, this.height - this.padding.bottom);
    ctx.lineTo(this.width - this.padding.right, this.height - this.padding.bottom);
    ctx.stroke();
  }

  drawTraditionalLine() {
    const ctx = this.ctx;

    ctx.strokeStyle = CHART_CONFIG.COLORS.TRADITIONAL_LINE;
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]); // 虚线

    ctx.beginPath();
    ctx.moveTo(this.getX(0), this.getY(1));
    ctx.lineTo(this.getX(10), this.getY(1));
    ctx.stroke();

    ctx.setLineDash([]); // 重置虚线
  }

  drawDigitalEmployeeCurve(currentLoops) {
    const ctx = this.ctx;

    // 创建渐变
    const gradient = ctx.createLinearGradient(
      this.padding.left,
      this.height - this.padding.bottom,
      this.width - this.padding.right,
      this.padding.top
    );
    gradient.addColorStop(0, CHART_CONFIG.COLORS.DIGITAL_GRADIENT_START);
    gradient.addColorStop(1, CHART_CONFIG.COLORS.DIGITAL_GRADIENT_END);

    ctx.strokeStyle = gradient;
    ctx.lineWidth = 3;
    ctx.shadowColor = 'rgba(0, 229, 255, 0.5)';
    ctx.shadowBlur = 10;

    ctx.beginPath();

    // 绘制曲线（从0到当前圈数）
    const step = CHART_CONFIG.CURVE_STEP;
    for (let x = 0; x <= currentLoops; x += step) {
      const y = calculateEfficiency(x);
      const canvasX = this.getX(x);
      const canvasY = this.getY(y);

      if (x === 0) {
        ctx.moveTo(canvasX, canvasY);
      } else {
        ctx.lineTo(canvasX, canvasY);
      }
    }

    ctx.stroke();

    // 绘制当前点
    const currentEfficiency = calculateEfficiency(currentLoops);
    const pointX = this.getX(currentLoops);
    const pointY = this.getY(currentEfficiency);

    ctx.fillStyle = CHART_CONFIG.COLORS.CURRENT_POINT;
    ctx.shadowColor = 'rgba(0, 229, 255, 0.8)';
    ctx.shadowBlur = 15;

    ctx.beginPath();
    ctx.arc(pointX, pointY, CHART_CONFIG.CURRENT_POINT_RADIUS, 0, Math.PI * 2);
    ctx.fill();

    // 重置阴影
    ctx.shadowBlur = 0;

    // 显示数值
    ctx.fillStyle = '#FFFFFF';
    ctx.font = CHART_CONFIG.FONTS.VALUE;
    ctx.textAlign = 'center';
    ctx.fillText(
      currentEfficiency.toFixed(1) + 'x',
      pointX,
      pointY - 15
    );
  }

  drawLegend() {
    const ctx = this.ctx;
    const legendX = this.width - this.padding.right - CHART_CONFIG.LEGEND_OFFSET_X;
    const legendY = this.padding.top + CHART_CONFIG.LEGEND_OFFSET_Y;

    // 传统AI图例
    ctx.strokeStyle = CHART_CONFIG.COLORS.TRADITIONAL_LINE;
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);

    ctx.beginPath();
    ctx.moveTo(legendX, legendY);
    ctx.lineTo(legendX + 30, legendY);
    ctx.stroke();

    ctx.setLineDash([]);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.font = CHART_CONFIG.FONTS.LABEL;
    ctx.textAlign = 'left';
    ctx.fillText('传统AI工具', legendX + 40, legendY + 4);

    // AI数字员工图例
    const gradient = ctx.createLinearGradient(legendX, legendY + 25, legendX + 30, legendY + 25);
    gradient.addColorStop(0, CHART_CONFIG.COLORS.DIGITAL_GRADIENT_START);
    gradient.addColorStop(1, CHART_CONFIG.COLORS.DIGITAL_GRADIENT_END);

    ctx.strokeStyle = gradient;
    ctx.lineWidth = 3;

    ctx.beginPath();
    ctx.moveTo(legendX, legendY + 25);
    ctx.lineTo(legendX + 30, legendY + 25);
    ctx.stroke();

    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.font = CHART_CONFIG.FONTS.LABEL;
    ctx.textAlign = 'left';
    ctx.fillText('AI数字员工', legendX + 40, legendY + 29);
  }

  draw(loops) {
    // 验证canvas和context存在
    if (!this.canvas || !this.ctx) return;

    // 验证输入
    if (typeof loops !== 'number' || loops < 0 || loops > 10) {
      console.warn('Invalid loops value:', loops);
      loops = Math.max(0, Math.min(10, loops));
    }

    this.currentLoops = loops;

    // 清除画布
    this.ctx.clearRect(0, 0, this.width, this.height);

    // 绘制各元素
    this.drawAxes();
    this.drawTraditionalLine();
    this.drawDigitalEmployeeCurve(loops);
    this.drawLegend();
  }

  destroy() {
    if (this.resizeHandler) {
      window.removeEventListener('resize', this.resizeHandler);
      this.resizeHandler = null;
    }
  }
}

// ==================== 成长图表初始化 ====================
function initGrowthChart() {
  let growthChart = null;

  function init() {
    growthChart = new GrowthChart('growth-chart-canvas');
    growthChart.draw(0);
  }

  function update(loops) {
    if (growthChart) {
      growthChart.draw(loops);
    }
  }

  function destroy() {
    if (growthChart) {
      growthChart.destroy();
      growthChart = null;
    }
  }

  // 暴露更新函数和清理函数
  window.updateGrowthChart = update;
  window.destroyGrowthChart = destroy;

  init();
}

// ==================== 图表控制器 ====================
let chartLoopCount = 0;

function initChartControls() {
  const chartSpinOnce = document.getElementById('chart-spin-once');
  const chartSpinFive = document.getElementById('chart-spin-five');
  const chartDecrease = document.getElementById('chart-decrease');
  const chartIncrease = document.getElementById('chart-increase');
  const loopCountDisplay = document.getElementById('chart-loop-count');

  if (chartSpinOnce) {
    chartSpinOnce.addEventListener('click', () => {
      chartLoopCount++;
      updateChartControls(chartLoopCount);
      updateMetrics(chartLoopCount);
      window.updateGrowthChart(chartLoopCount);
    });
  }

  if (chartSpinFive) {
    chartSpinFive.addEventListener('click', () => {
      chartLoopCount += 5;
      updateChartControls(chartLoopCount);
      updateMetrics(chartLoopCount);
      window.updateGrowthChart(chartLoopCount);
    });
  }

  if (chartDecrease) {
    chartDecrease.addEventListener('click', () => {
      if (chartLoopCount > 0) {
        chartLoopCount--;
        updateChartControls(chartLoopCount);
        updateMetrics(chartLoopCount);
        window.updateGrowthChart(chartLoopCount);
      }
    });
  }

  if (chartIncrease) {
    chartIncrease.addEventListener('click', () => {
      chartLoopCount++;
      updateChartControls(chartLoopCount);
      updateMetrics(chartLoopCount);
      window.updateGrowthChart(chartLoopCount);
    });
  }

  function updateChartControls(count) {
    if (loopCountDisplay) {
      loopCountDisplay.textContent = count;
    }
  }
}

// ==================== 二维码弹窗 ====================
function initQRCodeModal() {
  const modal = document.getElementById('qrcode-modal');
  const openBtn = document.getElementById('qrcode-btn');
  const closeBtn = document.getElementById('modal-close');
  const overlay = modal.querySelector('.modal-overlay');
  const qrcodeImg = document.getElementById('qrcode-img');
  const qrcodeLoading = modal.querySelector('.qrcode-loading');

  // Image load handlers
  if (qrcodeImg && qrcodeLoading) {
    qrcodeImg.addEventListener('load', () => {
      qrcodeImg.style.opacity = '1';
      qrcodeLoading.style.display = 'none';
    });

    qrcodeImg.addEventListener('error', () => {
      qrcodeImg.style.display = 'none';
      qrcodeLoading.innerHTML = '二维码加载失败<br><span style="font-size: 0.875rem; color: rgba(255,255,255,0.5);">请访问: github.com/long-kun01/ai-digital-employee-showcase</span>';
    });
  }

  openBtn.addEventListener('click', () => {
    modal.classList.add('active');
  });

  closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
  });

  overlay.addEventListener('click', () => {
    modal.classList.remove('active');
  });

  // ESC键关闭
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      modal.classList.remove('active');
    }
  });
}

// ==================== 初始化 ====================
let particleSystem = null;
let scrollObserver = null;
let turntableController = null;

function init() {
  try {
    particleSystem = new ParticleSystem('particle-canvas');
    particleSystem.start();
  } catch (e) {
    console.warn('Particle system initialization failed:', e);
  }

  // 初始化滚动动画
  scrollObserver = initScrollAnimations();

  // 初始化转盘控制器
  turntableController = new TurntableController();

  // 初始化成长图表
  initGrowthChart();

  // 初始化图表控制按钮
  initChartControls();

  // 初始化二维码弹窗
  initQRCodeModal();

  // CTA按钮平滑滚动
  const ctaButtons = document.querySelectorAll('.cta-button');
  ctaButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const target = document.getElementById(targetId);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // 隐藏加载屏幕
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    loadingScreen.classList.add('hidden');
    setTimeout(() => {
      loadingScreen.style.display = 'none';
    }, 500);
  }
}

// 页面加载完成后初始化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// 页面卸载时清理
window.addEventListener('beforeunload', () => {
  if (particleSystem) {
    particleSystem.destroy();
  }
  if (scrollObserver) {
    scrollObserver.disconnect();
  }
  if (window.destroyGrowthChart) {
    window.destroyGrowthChart();
  }
});
