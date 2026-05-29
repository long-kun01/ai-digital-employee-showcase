/**
 * AI数字员工 V4 - 环状闭环与成长可视化版本
 * 核心功能：环状交互、步骤详情、循环计数器、成长图表
 */

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
    `,
    actions: ['下一步：提给AI', '查看更多场景']
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
    `,
    actions: ['下一步：设计方案', '学习提示词技巧']
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

      <p><strong>首次使用 vs 第100次使用：</strong></p>
      <ul>
        <li>首次：AI理解上下文，生成基础方案</li>
        <li>第100次：AI直接调用知识库中的成熟方案，准确率90%+</li>
      </ul>
    `,
    actions: ['下一步：确认方案', '查看方案示例']
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

      <p><strong>反馈机制：</strong></p>
      <ul>
        <li>直接采纳：方案符合要求，进入执行</li>
        <li>修改建议：指出问题，让AI调整</li>
        <li>拒绝重做：方案偏差太大，重新生成</li>
      </ul>
    `,
    actions: ['下一步：执行', '跳过执行']
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

      <p><strong>执行记录：</strong></p>
      <ul>
        <li>完整日志：记录每一步操作和中间结果</li>
        <li>可追溯：能够回溯到具体的方案和上下文</li>
        <li>可审计：便于后续检查和优化</li>
      </ul>
    `,
    actions: ['下一步：数据反馈', '查看执行日志']
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

      <p><strong>失败案例：</strong></p>
      <ul>
        <li>错误类型：理解错误、执行错误、格式错误</li>
        <li>修正记录：如何被修正的</li>
        <li>根本原因：提示词不足、上下文缺失、方案缺陷</li>
      </ul>

      <p><strong>反馈的价值：</strong></p>
      <ul>
        <li>指导AI优化：告诉AI哪些方案更有效</li>
        <li>知识库更新：将成功案例沉淀为模板</li>
        <li>流程改进：发现系统性问题并优化</li>
      </ul>
    `,
    actions: ['下一步：认知沉淀', '查看反馈数据']
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

      <p><strong>自动沉淀机制：</strong></p>
      <ul>
        <li>成功案例：当方案被采纳且满意度高时自动保存</li>
        <li>提示词优化：记录导致成功的提示词模式</li>
        <li>上下文关联：将上下文与方案结果关联存储</li>
        <li>定期整理：定期review和优化知识库内容</li>
      </ul>

      <p><strong>复用机制：</strong></p>
      <ul>
        <li>下次遇到相同场景时，AI自动调用知识库</li>
        <li>提示词匹配：根据当前提示词匹配历史成功案例</li>
        <li>上下文补全：自动补充相关的上下文信息</li>
      </ul>
    `,
    actions: ['完成闭环', '查看知识库', '重新开始']
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

// ==================== 环状闭环交互 ====================
function initCircularLoop() {
  const nodes = document.querySelectorAll('.loop-node');
  const detailPanel = document.getElementById('step-detail');
  const detailContent = detailPanel.querySelector('.detail-content');
  const loopCenter = document.querySelector('.loop-center');

  nodes.forEach(node => {
    node.addEventListener('click', function() {
      const stepNum = this.getAttribute('data-step');
      showStepDetail(stepNum);
      highlightNode(this);
    });
  });

  function highlightNode(activeNode) {
    nodes.forEach(node => {
      node.classList.remove('active');
    });
    activeNode.classList.add('active');

    // 更新中心提示
    if (loopCenter) {
      const centerSubtitle = loopCenter.querySelector('.center-subtitle');
      if (centerSubtitle) {
        centerSubtitle.textContent = `正在查看：${activeNode.querySelector('.node-label').textContent}`;
      }
    }
  }

  function showStepDetail(stepNum) {
    const detail = STEP_DETAILS[stepNum];
    if (!detail) return;

    detailPanel.classList.add('active');

    let actionsHTML = '';
    if (detail.actions && detail.actions.length > 0) {
      actionsHTML = '<div class="detail-actions">';
      detail.actions.forEach((action, index) => {
        const className = index === 0 ? 'primary' : 'secondary';
        const nextStep = index === 0 ? parseInt(stepNum) + 1 : null;
        const onClick = nextStep ? `onclick="navigateToStep(${nextStep})"` : '';
        actionsHTML += `<button class="detail-action-btn ${className}" ${onClick}>${action}</button>`;
      });
      actionsHTML += '</div>';
    }

    detailContent.innerHTML = `
      <div class="detail-header">
        <div class="detail-number">${stepNum}</div>
        <div class="detail-title">${detail.title}</div>
        <div class="detail-badge">${detail.badge}</div>
      </div>
      <div class="detail-body">
        ${detail.content}
      </div>
      ${actionsHTML}
    `;

    // 平滑滚动到详情面板
    detailPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // 全局函数：导航到指定步骤
  window.navigateToStep = function(stepNum) {
    if (stepNum > 7) {
      stepNum = 1; // 回到第一步
    }
    const targetNode = document.querySelector(`.loop-node[data-step="${stepNum}"]`);
    if (targetNode) {
      targetNode.click();
    }
  };
}

// ==================== 循环计数器 ====================
function initLoopCounter() {
  const counterDisplay = document.getElementById('loop-count');
  const decreaseBtn = document.getElementById('counter-decrease');
  const increaseBtn = document.getElementById('counter-increase');

  let currentCount = 1;
  const minCount = 1;
  const maxCount = 100;

  function updateCount(newCount) {
    if (newCount < minCount) newCount = minCount;
    if (newCount > maxCount) newCount = maxCount;

    currentCount = newCount;
    counterDisplay.textContent = currentCount;

    // 触发动画效果
    counterDisplay.style.transform = 'scale(1.1)';
    setTimeout(() => {
      counterDisplay.style.transform = 'scale(1)';
    }, 150);

    // 更新成长指标
    updateGrowthMetrics(currentCount);
  }

  decreaseBtn.addEventListener('click', () => {
    updateCount(currentCount - 1);
  });

  increaseBtn.addEventListener('click', () => {
    updateCount(currentCount + 1);
  });

  // 初始化
  updateCount(1);
}

// ==================== 成长指标更新 ====================
function updateGrowthMetrics(loopCount) {
  // 计算效率提升倍数（模拟数据）
  const efficiencyMultiplier = calculateEfficiency(loopCount);

  // 计算准确率
  const accuracyRate = calculateAccuracy(loopCount);

  // 更新中心区域显示
  const loopCenter = document.querySelector('.loop-center');
  if (loopCenter) {
    const centerTitle = loopCenter.querySelector('.center-title');
    const centerSubtitle = loopCenter.querySelector('.center-subtitle');

    if (centerTitle) {
      centerTitle.textContent = `效率 ${efficiencyMultiplier}x`;
    }

    if (centerSubtitle) {
      if (loopCount === 1) {
        centerSubtitle.textContent = '首次使用，正在积累经验';
      } else if (loopCount < 10) {
        centerSubtitle.textContent = `已循环 ${loopCount} 次，效率持续提升`;
      } else if (loopCount < 50) {
        centerSubtitle.textContent = `已循环 ${loopCount} 次，AI能力显著增强`;
      } else {
        centerSubtitle.textContent = `已循环 ${loopCount} 次，AI已成为熟练员工`;
      }
    }
  }

  // 更新步骤详情（如果有选中的）
  const activeNode = document.querySelector('.loop-node.active');
  if (activeNode) {
    const stepNum = activeNode.getAttribute('data-step');
    updateStepDetailWithGrowth(stepNum, loopCount, efficiencyMultiplier, accuracyRate);
  }
}

function calculateEfficiency(loopCount) {
  // 简化的效率计算模型
  if (loopCount <= 1) return 1;
  if (loopCount <= 10) return (1 + (loopCount - 1) * 0.2).toFixed(1); // 1-3x
  if (loopCount <= 50) return (3 + (loopCount - 10) * 0.1).toFixed(1); // 3-7x
  return (7 + (loopCount - 50) * 0.06).toFixed(1); // 7-10x
}

function calculateAccuracy(loopCount) {
  // 简化的准确率计算模型
  if (loopCount <= 1) return 85;
  if (loopCount <= 10) return 85 + (loopCount - 1) * 1; // 85-94%
  if (loopCount <= 50) return 94 + (loopCount - 10) * 0.1; // 94-98%
  return Math.min(98 + (loopCount - 50) * 0.02, 99); // 98-99%
}

function updateStepDetailWithGrowth(stepNum, loopCount, efficiency, accuracy) {
  // 这里可以在步骤详情中加入成长数据的动态展示
  // 当前版本简化处理，可以后续扩展
}

// ==================== 成长图表 ====================
function initGrowthChart() {
  const canvas = document.getElementById('growth-chart-canvas');
  if (!canvas || !canvas.getContext) return;

  const ctx = canvas.getContext('2d');
  const container = canvas.parentElement;

  // 设置canvas尺寸
  function resizeCanvas() {
    canvas.width = container.offsetWidth;
    canvas.height = 300;
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // 绘制图表
  function drawChart() {
    const width = canvas.width;
    const height = canvas.height;
    const padding = { top: 20, right: 20, bottom: 40, left: 50 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    // 清空画布
    ctx.clearRect(0, 0, width, height);

    // 绘制坐标轴
    ctx.strokeStyle = 'rgba(0, 229, 255, 0.3)';
    ctx.lineWidth = 1;

    // Y轴
    ctx.beginPath();
    ctx.moveTo(padding.left, padding.top);
    ctx.lineTo(padding.left, height - padding.bottom);
    ctx.stroke();

    // X轴
    ctx.beginPath();
    ctx.moveTo(padding.left, height - padding.bottom);
    ctx.lineTo(width - padding.right, height - padding.bottom);
    ctx.stroke();

    // 绘制网格线
    ctx.strokeStyle = 'rgba(0, 229, 255, 0.1)';
    for (let i = 0; i <= 5; i++) {
      const y = padding.top + (chartHeight / 5) * i;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
      ctx.stroke();

      // Y轴标签
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText((10 - i * 2) + 'x', padding.left - 10, y + 4);
    }

    // 数据点
    const traditionalData = [1, 1, 1, 1]; // 传统AI工具：始终1x
    const digitalData = [1, 3, 6, 10]; // AI数字员工：1x, 3x, 6x, 10x
    const labels = ['1', '10', '50', '100'];

    // 绘制传统AI线
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    traditionalData.forEach((value, index) => {
      const x = padding.left + (chartWidth / (traditionalData.length - 1)) * index;
      const y = padding.top + chartHeight - (value / 10) * chartHeight;
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();
    ctx.setLineDash([]);

    // 绘制AI数字员工线
    ctx.strokeStyle = '#00D4A0';
    ctx.lineWidth = 3;
    ctx.beginPath();
    digitalData.forEach((value, index) => {
      const x = padding.left + (chartWidth / (digitalData.length - 1)) * index;
      const y = padding.top + chartHeight - (value / 10) * chartHeight;
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();

    // 绘制数据点
    digitalData.forEach((value, index) => {
      const x = padding.left + (chartWidth / (digitalData.length - 1)) * index;
      const y = padding.top + chartHeight - (value / 10) * chartHeight;

      ctx.beginPath();
      ctx.arc(x, y, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#00D4A0';
      ctx.fill();
      ctx.strokeStyle = '#0A2E3A';
      ctx.lineWidth = 2;
      ctx.stroke();
    });

    // X轴标签
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    labels.forEach((label, index) => {
      const x = padding.left + (chartWidth / (labels.length - 1)) * index;
      ctx.fillText(label, x, height - padding.bottom + 20);
    });
  }

  // 初始绘制
  drawChart();

  // 监听窗口大小变化
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      resizeCanvas();
      drawChart();
    }, 250);
  });
}

// ==================== 初始化 ====================
let particleSystem = null;
let scrollObserver = null;

function init() {
  try {
    particleSystem = new ParticleSystem('particle-canvas');
    particleSystem.start();
  } catch (e) {
    console.warn('Particle system initialization failed:', e);
  }

  // 初始化滚动动画
  scrollObserver = initScrollAnimations();

  // 初始化数字动画
  setTimeout(() => {
    animateNumbers();
  }, 500);

  // 初始化环状闭环交互
  initCircularLoop();

  // 初始化循环计数器
  initLoopCounter();

  // 初始化成长图表
  initGrowthChart();

  // CTA按钮平滑滚动
  const ctaButtons = document.querySelectorAll('.cta-button, .cta-button-secondary');
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
});
