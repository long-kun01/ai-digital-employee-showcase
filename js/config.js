/**
 * 配置文件 - 颜色、文案等可配置项
 */
export const CONFIG = {
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
