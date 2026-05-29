# AI数字员工价值感展示页面 - MVP原型

## 本地运行

直接用浏览器打开 `index.html` 即可

## 技术栈

- HTML5
- Tailwind CSS (CDN)
- Vanilla JavaScript
- Canvas API (粒子动效)

## MVP功能清单

### 已实现
- ✅ HERO区（主标题、副标题、CTA按钮）
- ✅ 粒子背景动效
- ✅ 概念认知区（4张卡片）
- ✅ 卡片悬停效果
- ✅ 卡片展开功能
- ✅ 滚动触发动画
- ✅ 平滑滚动
- ✅ 响应式布局

### 待实现（后续阶段）
- ⏳ 方法论总览区（流程图交互）
- ⏳ 效果证据区（案例卡片、ROI计算器）
- ⏳ CTA区

## 技术说明

- 粒子系统使用Canvas API，约80个粒子
- 动画使用requestAnimationFrame实现平滑效果
- 响应式断点：768px（移动端/桌面端）

## 浏览器兼容性

- Chrome/Edge: ✅ 完全支持
- Safari: ✅ 完全支持
- Firefox: ✅ 完全支持
- IE11: ⚠️ 不支持（需要polyfills）

## 已知问题

- 移动端粒子数量可能需要减少以优化性能
