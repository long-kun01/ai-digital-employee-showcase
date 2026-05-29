/**
 * 主交互逻辑
 * 处理卡片展开、滚动触发等交互
 */

import { CONFIG } from './config.js';
import { ParticleSystem } from './particles.js';

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

    // 关闭所有其他展开的卡片（可选）
    // document.querySelectorAll('.card-details.expanded').forEach(el => {
    //   if (el.id !== cardId) {
    //     el.classList.remove('expanded');
    //   }
    // });

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
