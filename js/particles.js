/**
 * 粒子背景动效系统
 * 创建缓慢流动的粒子，模拟数据传输感
 */

import { CONFIG } from './config.js';

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

export class ParticleSystem {
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
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.particles.forEach(particle => {
      particle.update();
      particle.draw();
    });

    this.animationId = requestAnimationFrame(() => this.animate());
  }

  destroy() {
    this.stop();
    window.removeEventListener('resize', this.resize);
  }
}
