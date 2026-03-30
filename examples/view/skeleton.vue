<template>
  <div class="skeleton-demo">
    <div class="demo-header">
      <h2>Skeleton 骨架屏组件</h2>
      <p class="subtitle">各种真实场景的加载占位效果演示</p>
    </div>

    <div class="demo-tabs">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        :class="['tab-btn', { active: activeTab === tab.id }]"
        @click="activeTab = tab.id"
      >
        <span class="tab-icon">{{ tab.icon }}</span>
        {{ tab.name }}
      </button>
    </div>

    <!-- ========== 电商App ========== -->
    <div v-show="activeTab === 'ecommerce'" class="demo-section">
      <div class="demo-title">
        <h3>📱 电商App首页</h3>
        <p class="demo-desc">完整页面级骨架屏，模拟真实电商加载场景</p>
        <div class="demo-tags">
          <span class="tag">响应式宽度</span>
          <span class="tag">复杂布局</span>
          <span class="tag">多元素组合</span>
        </div>
      </div>
      <div class="demo-content">
        <div class="phone-mockup">
          <div class="phone-screen">
            <!-- 状态栏 -->
            <div class="status-bar">
              <Skeleton class="status-time" :width="50" :height="16" />
              <div class="status-icons">
                <Skeleton :width="16" :height="16" :circle="true" />
                <Skeleton :width="16" :height="16" :circle="true" />
                <Skeleton :width="16" :height="16" :circle="true" />
              </div>
            </div>

            <!-- 搜索栏 -->
            <div class="search-bar">
              <Skeleton :width="20" :height="20" />
              <Skeleton class="search-input" :height="36" :border-radius="18" />
            </div>

            <!-- 分类导航 -->
            <div class="category-nav">
              <div class="category-item" v-for="i in 5" :key="i">
                <Skeleton :width="44" :height="44" :circle="true" />
                <Skeleton :height="12" :width="40" />
              </div>
            </div>

            <!-- 轮播图 -->
            <div class="banner-section">
              <Skeleton class="banner-skeleton" :height="140" :border-radius="8" />
              <div class="banner-dots">
                <Skeleton v-for="j in 3" :key="j" :width="6" :height="6" :circle="true" />
              </div>
            </div>

            <!-- 秒杀活动 -->
            <div class="flash-sale-section">
              <div class="section-header">
                <Skeleton class="section-title" :height="22" :width="80" />
                <div class="countdown">
                  <Skeleton :height="22" :width="20" />
                  <Skeleton :height="22" :width="20" />
                  <Skeleton :height="22" :width="20" />
                </div>
                <Skeleton class="more-btn" :height="20" :width="40" />
              </div>
              <div class="flash-products">
                <div class="flash-item" v-for="i in 4" :key="i">
                  <Skeleton :width="90" :height="90" :border-radius="4" />
                  <Skeleton class="flash-price" :height="18" :width="50" />
                </div>
              </div>
            </div>

            <!-- 推荐商品 -->
            <div class="recommend-section">
              <Skeleton :height="24" :width="60" />
            </div>

            <!-- 商品列表 -->
            <div class="product-grid">
              <div class="product-card" v-for="i in 4" :key="i">
                <Skeleton width="100%" :height="100" :border-radius="8" />
                <div class="product-info">
                  <Skeleton class="product-title" :height="14" :width="85" />
                  <Skeleton class="product-title" :height="14" :width="60" />
                  <Skeleton class="product-tags" :height="16" :width="45" />
                  <div class="product-price-row">
                    <Skeleton class="price" :height="20" :width="50" />
                    <Skeleton class="sales" :height="14" :width="40" />
                  </div>
                </div>
              </div>
            </div>

            <!-- 加载更多 -->
            <div class="loading-more">
              <Skeleton :height="14" :width="80" />
            </div>

            <!-- 底部导航 -->
            <div class="bottom-nav">
              <div class="nav-item" v-for="i in 5" :key="i">
                <Skeleton :width="24" :height="24" :circle="true" />
                <Skeleton :height="10" :width="30" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ========== 文章加载 ========== -->
    <div v-show="activeTab === 'article'" class="demo-section">
      <div class="demo-title">
        <h3>📄 文章/博客加载</h3>
        <p class="demo-desc">模拟博客文章、新闻资讯的内容加载</p>
        <div class="demo-tags">
          <span class="tag">标题+段落</span>
          <span class="tag">作者信息</span>
          <span class="tag">响应式宽度</span>
        </div>
      </div>
      <div class="demo-content">
        <div class="article-container">
          <!-- 文章卡片1 -->
          <div class="article-card">
            <div class="article-header">
              <div class="author-info">
                <Skeleton :width="40" :height="40" :circle="true" />
                <div class="author-meta">
                  <Skeleton :height="16" :width="120" />
                  <Skeleton :height="12" :width="80" />
                </div>
              </div>
              <div class="article-actions">
                <Skeleton :width="24" :height="24" :circle="true" />
              </div>
            </div>
            <div class="article-content">
              <Skeleton :height="24" :width="90" :border-radius="4" />
              <Skeleton :height="14" :width="100" />
              <Skeleton :height="14" :width="95" />
              <Skeleton :height="14" :width="70" />
              <Skeleton :height="14" :width="85" />
              <br />
              <Skeleton :height="14" :width="98" />
              <Skeleton :height="14" :width="75" />
              <Skeleton :height="14" :width="92" />
              <Skeleton :height="14" :width="88" />
            </div>
            <div class="article-footer">
              <Skeleton :height="20" :width="60" />
              <div class="article-stats">
                <Skeleton :height="16" :width="50" />
                <Skeleton :height="16" :width="40" />
              </div>
            </div>
          </div>

          <!-- 文章卡片2 -->
          <div class="article-card">
            <div class="article-header">
              <div class="author-info">
                <Skeleton :width="40" :height="40" :circle="true" />
                <div class="author-meta">
                  <Skeleton :height="16" :width="100" />
                  <Skeleton :height="12" :width="70" />
                </div>
              </div>
            </div>
            <div class="article-content">
              <Skeleton :height="24" :width="80" :border-radius="4" />
              <Skeleton :height="14" :width="100" />
              <Skeleton :height="14" :width="88" />
              <Skeleton :height="14" :width="65" />
            </div>
            <div class="article-footer">
              <div class="article-stats">
                <Skeleton :height="16" :width="45" />
                <Skeleton :height="16" :width="38" />
              </div>
            </div>
          </div>

          <!-- 文章卡片3 - 带缩略图 -->
          <div class="article-card article-with-image">
            <div class="article-main">
              <div class="article-header">
                <Skeleton :height="22" :width="85" />
              </div>
              <div class="article-content">
                <Skeleton :height="14" :width="100" />
                <Skeleton :height="14" :width="92" />
              </div>
              <div class="article-footer">
                <Skeleton :height="12" :width="60" />
                <div class="article-stats">
                  <Skeleton :height="14" :width="35" />
                  <Skeleton :height="14" :width="30" />
                </div>
              </div>
            </div>
            <div class="article-thumb">
              <Skeleton :width="120" :height="80" :border-radius="8" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ========== 用户卡片 ========== -->
    <div v-show="activeTab === 'cards'" class="demo-section">
      <div class="demo-title">
        <h3>👤 用户资料卡片</h3>
        <p class="demo-desc">用户列表、成员展示、社交资料卡片</p>
        <div class="demo-tags">
          <span class="tag">头像</span>
          <span class="tag">按钮占位</span>
          <span class="tag">社交元素</span>
        </div>
      </div>
      <div class="demo-content">
        <div class="cards-container">
          <!-- 用户卡片1 - 完整版 -->
          <div class="user-card full-card">
            <div class="user-banner">
              <Skeleton width="100%" :height="100" />
            </div>
            <div class="user-avatar-wrapper">
              <Skeleton class="user-avatar" :width="80" :height="80" :circle="true" :border-radius="4" />
            </div>
            <div class="user-info">
              <Skeleton class="user-name" :height="24" :width="140" />
              <Skeleton class="user-bio" :height="14" :width="180" />
              <Skeleton class="user-bio" :height="14" :width="160" />
            </div>
            <div class="user-stats">
              <div class="stat-item">
                <Skeleton :height="28" :width="30" />
                <Skeleton :height="12" :width="50" />
              </div>
              <div class="stat-item">
                <Skeleton :height="28" :width="40" />
                <Skeleton :height="12" :width="45" />
              </div>
              <div class="stat-item">
                <Skeleton :height="28" :width="35" />
                <Skeleton :height="12" :width="55" />
              </div>
            </div>
            <div class="user-actions">
              <Skeleton class="action-btn" :height="36" :width="100" :border-radius="18" />
              <Skeleton class="action-btn secondary" :height="36" :width="100" :border-radius="18" />
            </div>
          </div>

          <!-- 用户卡片列表 -->
          <div class="user-list">
            <div class="user-list-item" v-for="i in 4" :key="i">
              <Skeleton :width="48" :height="48" :circle="true" :border-radius="4" />
              <div class="user-list-info">
                <Skeleton :height="18" :width="100" />
                <Skeleton :height="14" :width="70" />
              </div>
              <div class="user-list-actions">
                <Skeleton :height="32" :width="32" :circle="true" />
                <Skeleton :height="32" :width="32" :circle="true" />
              </div>
            </div>
          </div>

          <!-- 简约卡片网格 -->
          <div class="mini-cards-grid">
            <div class="mini-card" v-for="i in 4" :key="i">
              <Skeleton :width="60" :height="60" :circle="true" :border-radius="4" />
              <Skeleton :height="18" :width="80" />
              <Skeleton :height="12" :width="50" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ========== 图片列表 ========== -->
    <div v-show="activeTab === 'gallery'" class="demo-section">
      <div class="demo-title">
        <h3>🖼️ 图片/媒体列表</h3>
        <p class="demo-desc">图库、相册、媒体中心的加载占位</p>
        <div class="demo-tags">
          <span class="tag">网格布局</span>
          <span class="tag">瀑布流</span>
          <span class="tag">列表视图</span>
        </div>
      </div>
      <div class="demo-content">
        <div class="gallery-container">
          <!-- 瀑布流布局 -->
          <div class="masonry-grid">
            <div class="masonry-item" v-for="i in 8" :key="i">
              <Skeleton
                width="100%"
                :height="heights[i - 1]"
                :border-radius="8"
              />
              <div class="masonry-meta">
                <Skeleton :height="14" :width="85" />
                <Skeleton :height="12" :width="60" />
              </div>
            </div>
          </div>

          <!-- 列表视图 -->
          <div class="gallery-list">
            <div class="gallery-list-item" v-for="i in 3" :key="i">
              <Skeleton :width="80" :height="60" :border-radius="6" />
              <div class="gallery-list-info">
                <Skeleton :height="16" :width="90" />
                <Skeleton :height="14" :width="75" />
                <div class="gallery-list-meta">
                  <Skeleton :height="12" :width="40" />
                  <Skeleton :height="12" :width="35" />
                  <Skeleton :height="12" :width="30" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ========== 仪表板 ========== -->
    <div v-show="activeTab === 'dashboard'" class="demo-section">
      <div class="demo-title">
        <h3>📊 数据仪表板</h3>
        <p class="demo-desc">后台管理系统、数据大屏、统计报表</p>
        <div class="demo-tags">
          <span class="tag">数据卡片</span>
          <span class="tag">图表占位</span>
          <span class="tag">表格加载</span>
        </div>
      </div>
      <div class="demo-content">
        <div class="dashboard-container">
          <!-- 顶部统计卡片 -->
          <div class="stats-grid">
            <div class="stat-card" v-for="i in 4" :key="i">
              <div class="stat-header">
                <Skeleton :height="14" :width="80" />
                <Skeleton :width="20" :height="20" :circle="true" />
              </div>
              <div class="stat-value">
                <Skeleton :height="32" :width="100" />
              </div>
              <div class="stat-footer">
                <Skeleton :height="12" :width="60" />
              </div>
            </div>
          </div>

          <!-- 图表区域 -->
          <div class="charts-section">
            <div class="chart-card">
              <div class="chart-header">
                <Skeleton :height="18" :width="120" />
                <Skeleton :height="24" :width="80" :border-radius="12" />
              </div>
              <div class="chart-body">
                <Skeleton width="100%" :height="250" :border-radius="8" />
              </div>
            </div>

            <div class="chart-card">
              <div class="chart-header">
                <Skeleton :height="18" :width="100" />
              </div>
              <div class="chart-body">
                <Skeleton width="100%" :height="200" :border-radius="8" />
              </div>
            </div>
          </div>

          <!-- 数据表格 -->
          <div class="table-card">
            <div class="table-header">
              <Skeleton :height="20" :width="150" />
              <div class="table-actions">
                <Skeleton :height="32" :width="32" :border-radius="6" />
                <Skeleton :height="32" :width="32" :border-radius="6" />
              </div>
            </div>
            <div class="table-skeleton">
              <div class="table-row">
                <Skeleton :height="16" width="15%" />
                <Skeleton :height="16" width="20%" />
                <Skeleton :height="16" width="15%" />
                <Skeleton :height="16" width="18%" />
                <Skeleton :height="16" width="15%" />
                <Skeleton :height="16" width="17%" />
              </div>
              <div class="table-row" v-for="i in 5" :key="i">
                <Skeleton :height="16" width="15%" />
                <Skeleton :height="16" width="20%" />
                <Skeleton :height="16" width="15%" />
                <Skeleton :height="16" width="18%" />
                <Skeleton :height="16" width="15%" />
                <Skeleton :height="16" width="17%" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'SkeletonDemo',
    data() {
      return {
        activeTab: 'ecommerce',
        tabs: [
          { id: 'ecommerce', name: '电商App', icon: '📱' },
          { id: 'article', name: '文章加载', icon: '📄' },
          { id: 'cards', name: '用户卡片', icon: '👤' },
          { id: 'gallery', name: '媒体列表', icon: '🖼️' },
          { id: 'dashboard', name: '仪表板', icon: '📊' }
        ],
        heights: [180, 220, 160, 200, 190, 170, 210, 175]
      }
    }
  }
</script>

<style lang="less" scoped>
.skeleton-demo {
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
}

.demo-header {
  text-align: center;
  margin-bottom: 30px;

  h2 {
    font-size: 32px;
    margin-bottom: 8px;
    color: #333;
  }

  .subtitle {
    font-size: 16px;
    color: #666;
    margin: 0;
  }
}

.demo-tabs {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.tab-btn {
  padding: 10px 20px;
  border: 2px solid #e0e0e0;
  background: #fff;
  border-radius: 24px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: #666;
  transition: all 0.3s;

  .tab-icon {
    margin-right: 6px;
    font-size: 16px;
  }

  &:hover {
    border-color: #1890ff;
    color: #1890ff;
  }

  &.active {
    border-color: #1890ff;
    background: #1890ff;
    color: #fff;
  }
}

.demo-section {
  animation: fadeIn 0.3s;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.demo-title {
  text-align: center;
  margin-bottom: 30px;

  h3 {
    font-size: 24px;
    margin-bottom: 8px;
    color: #333;
  }

  .demo-desc {
    font-size: 14px;
    color: #999;
    margin-bottom: 12px;
  }

  .demo-tags {
    display: flex;
    justify-content: center;
    gap: 8px;
  }

  .tag {
    padding: 4px 12px;
    background: #f0f0f0;
    border-radius: 12px;
    font-size: 12px;
    color: #666;
  }
}

.demo-content {
  background: #f5f5f5;
  border-radius: 12px;
  padding: 30px;
}

/* ========== 手机模拟器样式 ========== */
.phone-mockup {
  width: 100%;
  max-width: 375px;
  margin: 0 auto;
  background: #000;
  border-radius: 40px;
  padding: 12px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.phone-screen {
  background: #f5f5f5;
  min-height: 667px;
  border-radius: 32px;
  overflow: hidden;
}

.status-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 20px 0;
  background: #fff;
  position: sticky;
  top: 0;
  z-index: 10;
}

.search-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 20px 10px;
  background: #fff;
  position: sticky;
  top: 32px;
  z-index: 9;
}

.category-nav {
  display: flex;
  justify-content: space-around;
  padding: 12px 10px 10px;
  background: #fff;
  margin-bottom: 6px;
}

.category-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.banner-section {
  position: relative;
  padding: 12px 20px;
  background: #fff;
  margin-bottom: 6px;
}

.banner-dots {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 8px;
}

.flash-sale-section {
  padding: 12px 20px;
  background: #fff;
  margin-bottom: 6px;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.flash-products {
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding-bottom: 0;
}

.flash-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
}

.recommend-section {
  padding: 12px 20px 8px;
  background: #fff;
  margin-bottom: 6px;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  padding: 8px 20px;
  background: #fff;
}

.product-card {
  padding: 8px;
  background: #fff;
  border-radius: 8px;
  border: 1px solid #f5f5f5;
}

.product-info {
  margin-top: 8px;
}

.product-title {
  margin-bottom: 4px;
}

.product-price-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.loading-more {
  padding: 15px;
  background: #fff;
  text-align: center;
}

.bottom-nav {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 6px 0 8px;
  background: #fff;
  border-top: 1px solid #f5f5f5;
  position: sticky;
  bottom: 0;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

/* ========== 文章卡片样式 ========== */
.article-container {
  max-width: 800px;
  margin: 0 auto;
}

.article-card {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.article-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.author-info {
  display: flex;
  gap: 12px;
  align-items: center;
}

.author-meta {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.article-content {
  margin-bottom: 16px;
}

.article-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.article-stats {
  display: flex;
  gap: 16px;
}

.article-with-image {
  display: flex;
  gap: 16px;
  padding: 16px;
}

.article-main {
  flex: 1;
}

.article-main .article-header {
  margin-bottom: 12px;
}

.article-thumb {
  flex-shrink: 0;
}

/* ========== 用户卡片样式 ========== */
.cards-container {
  max-width: 1000px;
  margin: 0 auto;
}

.full-card {
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.user-banner {
  height: 100px;
}

.user-avatar-wrapper {
  display: flex;
  justify-content: center;
  margin-top: -50px;
}

.user-avatar {
  border: 4px solid #fff;
  background: #fff;
  z-index: 1;
}

.user-info {
  text-align: center;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.user-stats {
  display: flex;
  justify-content: center;
  gap: 32px;
  padding: 16px 0;
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.user-actions {
  display: flex;
  justify-content: center;
  gap: 12px;
  padding: 20px 0 24px;
}

.action-btn {
  &.secondary {
    opacity: 0.6;
  }
}

.user-list {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 24px;
}

.user-list-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }
}

.user-list-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.user-list-actions {
  display: flex;
  gap: 8px;
}

.mini-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 12px;
}

.mini-card {
  background: #fff;
  padding: 16px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
}

/* ========== 图片列表样式 ========== */
.gallery-container {
  max-width: 1000px;
  margin: 0 auto;
}

.masonry-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 32px;
}

.masonry-item {
  break-inside: avoid;
  margin-bottom: 0;
}

.masonry-meta {
  padding: 12px 0 4px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.gallery-list-item {
  display: flex;
  gap: 16px;
  padding: 16px;
  background: #fff;
  border-radius: 12px;
  margin-bottom: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
}

.gallery-list-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.gallery-list-meta {
  display: flex;
  gap: 12px;
}

/* ========== 仪表板样式 ========== */
.dashboard-container {
  max-width: 1200px;
  margin: 0 auto;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.stat-card {
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
}

.stat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.stat-value {
  margin-bottom: 12px;
}

.charts-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.chart-card {
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.chart-body {
  display: flex;
  align-items: center;
  justify-content: center;
}

.table-card {
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.table-actions {
  display: flex;
  gap: 8px;
}

.table-row {
  display: flex;
  gap: 16px;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;

  &:first-child {
    border-bottom: 2px solid #e0e0e0;
    padding-bottom: 16px;
    margin-bottom: 8px;
  }
}

@media (max-width: 1200px) {
  .charts-section {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .demo-header h2 {
    font-size: 24px;
  }

  .phone-mockup {
    border-radius: 20px;
    padding: 8px;
  }

  .phone-screen {
    border-radius: 16px;
    min-height: 600px;
  }

  .article-with-image {
    flex-direction: column;
  }

  .article-thumb {
    width: 100%;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .table-row {
    flex-wrap: wrap;
  }
}
</style>
