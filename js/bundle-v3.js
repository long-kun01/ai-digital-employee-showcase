/**
 * AI数字员工 V3 - 越用越强版本
 * 简化交互逻辑
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

// ==================== 平滑滚动 ====================
function smoothScroll(targetId) {
  const target = document.getElementById(targetId);
  if (!target) return;

  const targetPosition = target.offsetTop - 60;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  const duration = 800;
  let start = null;

  function animation(currentTime) {
    if (start === null) start = currentTime;
    const timeElapsed = currentTime - start;
    const progress = Math.min(timeElapsed / duration, 1);

    const easeInOutCubic = progress < 0.5
      ? 4 * progress * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 3) / 2;

    window.scrollTo(0, startPosition + distance * easeInOutCubic);

    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  }

  requestAnimationFrame(animation);
}

// ==================== 交互高亮 ====================
function highlightStep(stepNumber) {
  // 移除所有高亮
  document.querySelectorAll('.loop-step').forEach(step => {
    step.classList.remove('active');
  });

  // 添加当前高亮
  const currentStep = document.querySelector(`.loop-step[data-step="${stepNumber}"]`);
  if (currentStep) {
    currentStep.classList.add('active');
  }
}

// ==================== 初始化 ====================
let particleSystem = null;

function init() {
  try {
    particleSystem = new ParticleSystem('particle-canvas');
    particleSystem.start();
  } catch (e) {
    console.warn('Particle system initialization failed:', e);
  }

  // CTA按钮平滑滚动
  const ctaButton = document.querySelector('.cta-button');
  if (ctaButton) {
    ctaButton.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      smoothScroll(targetId);
    });
  }

  // 步骤卡片点击交互
  const loopSteps = document.querySelectorAll('.loop-step');
  loopSteps.forEach(step => {
    step.addEventListener('click', function() {
      const stepNum = this.getAttribute('data-step');
      if (stepNum && stepNum !== 'next') {
        highlightStep(stepNum);
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
});
