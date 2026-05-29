/**
 * AI数字员工价值感展示页面 - 合并脚本
 * 将所有模块合并到一个文件中，支持本地 file:// 协议直接打开
 */

// ==================== 配置 ====================
const CONFIG = {
  // 颜色配置（参考AI航海家俱乐部风格）
  colors: {
    background: '#0A2E3A',      // 深青蓝背景
    accent: '#00E5FF',           // 青绿强调色
    accentSecondary: '#00D4A0', // 辅助青绿色
    text: '#FFFFFF',             // 正文白色
    textSecondary: '#008080',    // 次要信息浅蓝
    border: 'rgba(0, 229, 255, 0.3)' // 边框色
  },

  // 文案配置
  content: {
    hero: {
      title: '让AI成为你团队中最懂业务的员工',
      subtitle: '三步训练法，把你的业务经验变成可复制的AI数字员工',
      cta: '开始体验'
    },
    concept: {
      card1: {
        title: '现状问题',
        items: [
          { icon: '❌', text: '招人难' },
          { icon: '❌', text: '培训慢' },
          { icon: '❌', text: '流失率高' },
          { icon: '❌', text: '经验难传承' }
        ]
      },
      card2: {
        title: 'AI数字员工',
        items: [
          { icon: '✅', text: '即时上岗' },
          { icon: '✅', text: '秒级学习' },
          { icon: '✅', text: '永不离职' },
          { icon: '✅', text: '经验固化' }
        ]
      },
      card3: {
        title: '市场机会',
        content: 'AI员工是新时代的"数字资产"，谁先掌握谁就获得效率红利'
      },
      card4: {
        title: '什么是AI数字员工？',
        content: '不是工具，是"懂业务的AI"，通过训练掌握你公司的业务逻辑和决策标准'
      }
    }
  },

  // 动效配置
  animation: {
    particleCount: 80,           // 粒子数量
    particleSpeed: 0.3,          // 粒子移动速度
    particleColor: 'rgba(0, 229, 255, 0.5)', // 粒子颜色
    fadeInDuration: 600,         // 淡入时长(ms)
    scrollOffset: 100            // 滚动触发偏移量(px)
  }
};

// ==================== 粒子系统 ====================
/**
 * 粒子背景动效系统
 * 创建缓慢流动的粒子，模拟数据传输感
 */
class Particle {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.reset(options);
  }

  reset(options = {}) {
    // 随机位置
    this.x = Math.random() * this.canvas.width;
    this.y = Math.random() * this.canvas.height;

    // 随机大小（1-3px）
    this.size = Math.random() * 2 + 1;

    // 随机速度
    const speed = options.speed || CONFIG.animation.particleSpeed;
    this.vx = (Math.random() - 0.5) * speed;
    this.vy = (Math.random() - 0.5) * speed;

    // 透明度
    this.alpha = Math.random() * 0.5 + 0.2;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    // 边界检测 - 超出则重置到对侧
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

    // 检测Canvas支持
    if (!this.canvas.getContext) {
      console.warn('Canvas not supported, particle animation disabled');
      return;
    }

    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.animationId = null;

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
    // 如果Canvas不支持，跳过
    if (!this.ctx) {
      console.warn('Particle system disabled (Canvas not supported)');
      return;
    }

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

    // 兼容性处理
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

// ==================== 主应用逻辑 ====================
/**
 * 主交互逻辑
 * 处理卡片展开、滚动触发等交互
 */
class App {
  constructor() {
    this.particleSystem = null;
    this.init();
  }

  init() {
    // 初始化粒子背景
    this.particleSystem = new ParticleSystem('particle-canvas');
    this.particleSystem.start();

    // 初始化卡片交互
    this.initCardInteractions();

    // 初始化滚动触发动画
    this.initScrollAnimations();

    // 初始化平滑滚动
    this.initSmoothScroll();
  }

  initCardInteractions() {
    // 为所有可展开的卡片添加交互
    const expandButtons = document.querySelectorAll('[data-expand]');
    expandButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const cardId = e.currentTarget.dataset.expand;
        this.toggleCard(cardId);
      });
    });
  }

  toggleCard(cardId) {
    const details = document.getElementById(cardId);
    if (!details) return;

    const isExpanded = details.classList.contains('expanded');

    // 切换当前卡片
    details.classList.toggle('expanded');
  }

  initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: `${CONFIG.animation.scrollOffset}px`
    });

    fadeElements.forEach(el => observer.observe(el));
  }

  initSmoothScroll() {
    const ctaButton = document.querySelector('[data-scroll-to]');
    if (!ctaButton) return;

    ctaButton.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = ctaButton.dataset.scrollTo;
      const target = document.getElementById(targetId);

      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  }

  destroy() {
    if (this.particleSystem) {
      this.particleSystem.destroy();
    }
  }
}

// ==================== 初始化 ====================
// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
  window.app = new App();
});

// 页面卸载时清理
window.addEventListener('beforeunload', () => {
  if (window.app) {
    window.app.destroy();
  }
});
