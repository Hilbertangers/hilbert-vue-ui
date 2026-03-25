<style lang="less">
.marquee-demo {
  padding: 30px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;

  h2 {
    text-align: center;
    font-size: 32px;
    color: #2c3e50;
    margin-bottom: 40px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  }

  .demo-section {
    margin-bottom: 40px;
    padding: 30px;
    background: white;
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
    }

    .demo-title {
      font-size: 22px;
      font-weight: bold;
      margin-bottom: 15px;
      color: #34495e;
      display: flex;
      align-items: center;

      &::before {
        content: '';
        width: 4px;
        height: 24px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        margin-right: 12px;
        border-radius: 2px;
      }
    }

    .demo-desc {
      margin-bottom: 20px;
      color: #7f8c8d;
      font-size: 14px;
      line-height: 1.6;

      p {
        margin: 5px 0;
      }

      code {
        background: #f1f2f6;
        padding: 2px 6px;
        border-radius: 4px;
        font-family: 'Courier New', monospace;
        color: #2c3e50;
      }
    }

    .demo-content {
      padding: 25px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 12px;
      overflow: hidden;
      box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .demo-content-light {
      padding: 25px;
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      border-radius: 12px;
      overflow: hidden;
      box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .demo-content-blue {
      padding: 25px;
      background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
      border-radius: 12px;
      overflow: hidden;
      box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .demo-content-green {
      padding: 25px;
      background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
      border-radius: 12px;
      overflow: hidden;
      box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .demo-content-yellow {
      padding: 25px;
      background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
      border-radius: 12px;
      overflow: hidden;
      box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .demo-content-dark {
      padding: 25px;
      background: linear-gradient(135deg, #232526 0%, #414345 100%);
      border-radius: 12px;
      overflow: hidden;
      box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .marquee-item {
      margin: 0 20px;
      padding: 12px 24px;
      background: rgba(255, 255, 255, 0.95);
      color: #2c3e50;
      border-radius: 8px;
      font-weight: 500;
      font-size: 15px;
      white-space: nowrap;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(10px);
    }

    .marquee-item-dark {
      margin: 0 20px;
      padding: 12px 24px;
      background: rgba(255, 255, 255, 0.1);
      color: white;
      border-radius: 8px;
      font-weight: 500;
      font-size: 15px;
      white-space: nowrap;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .marquee-logo {
      margin: 0 25px;
      padding: 15px 30px;
      background: rgba(255, 255, 255, 0.95);
      color: #2c3e50;
      border-radius: 10px;
      font-weight: bold;
      font-size: 18px;
      white-space: nowrap;
      box-shadow: 0 6px 8px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(10px);
    }

    .controls {
      margin-top: 20px;
      display: flex;
      gap: 15px;
      flex-wrap: wrap;
    }
  }
}
</style>

<template>
  <div class="marquee-demo">
    <h2>🎠 Marquee 跑马灯组件</h2>

    <!-- 基础用法 -->
    <div class="demo-section">
      <div class="demo-title">基础用法</div>
      <div class="demo-desc">
        <p>默认向左滚动，速度 50px/s</p>
        <p>支持无缝循环，平滑流畅</p>
      </div>
      <div class="demo-content">
        <Marquee>
          <div class="marquee-item">🚀 欢迎使用 hilbert-vue-ui</div>
          <div class="marquee-item">✨ 这是一个跑马灯组件</div>
          <div class="marquee-item">🎨 基于 CSS 动画实现</div>
          <div class="marquee-item">💫 平滑流畅</div>
          <div class="marquee-item">🚀 欢迎使用 hilbert-vue-ui</div>
          <div class="marquee-item">✨ 这是一个跑马灯组件</div>
        </Marquee>
      </div>
    </div>

    <!-- 自定义速度和方向 -->
    <div class="demo-section">
      <div class="demo-title">自定义速度和方向</div>
      <div class="demo-desc">
        <p>👉 向右滚动，速度 100px/s</p>
      </div>
      <div class="demo-content-light">
        <Marquee :speed="100" direction="right">
          <div class="marquee-item">向右滚动 →</div>
          <div class="marquee-item">速度更快 🚀</div>
          <div class="marquee-item">向右滚动 →</div>
          <div class="marquee-item">速度更快 🚀</div>
        </Marquee>
      </div>
    </div>

    <!-- 暂停控制 -->
    <div class="demo-section">
      <div class="demo-title">暂停控制</div>
      <div class="demo-desc">
        <p>🖱️ 鼠标悬停暂停</p>
      </div>
      <div class="demo-content">
        <Marquee :pauseOnHover="true" :speed="50">
          <div class="marquee-item">鼠标悬停会暂停 ⏸️</div>
          <div class="marquee-item">试试把鼠标放上来 👆</div>
          <div class="marquee-item">鼠标悬停会暂停 ⏸️</div>
          <div class="marquee-item">试试把鼠标放上来 👆</div>
        </Marquee>
      </div>

      <div class="demo-desc" style="margin-top: 20px;">
        <p>👆 点击暂停/继续</p>
      </div>
      <div class="demo-content-light">
        <Marquee :pauseOnClick="true" :speed="50">
          <div class="marquee-item">点击可以暂停 ⏸️</div>
          <div class="marquee-item">再点击继续 ▶️</div>
          <div class="marquee-item">点击可以暂停 ⏸️</div>
          <div class="marquee-item">再点击继续 ▶️</div>
        </Marquee>
      </div>

      <div class="demo-desc" style="margin-top: 20px;">
        <p>🎛️ 手动控制播放/暂停</p>
        <p>当前: {{ isPlaying ? '▶️ 播放中' : '⏸️ 已暂停' }}</p>
      </div>
      <div class="demo-content">
        <div class="controls">
          <Button
            :type="isPlaying ? 'error' : 'primary'"
            size="large"
            @click="isPlaying = !isPlaying"
            style="border-radius: 8px; padding: 8px 24px;"
          >
            {{ isPlaying ? '暂停' : '播放' }}
          </Button>
        </div>
        <div style="margin-top: 15px;">
          <Marquee :play="isPlaying" :speed="60">
            <div class="marquee-item">手动控制播放状态 🎛️</div>
            <div class="marquee-item">当前: {{ isPlaying ? '▶️ 播放中' : '⏸️ 已暂停' }}</div>
            <div class="marquee-item">手动控制播放状态 🎛️</div>
            <div class="marquee-item">当前: {{ isPlaying ? '▶️ 播放中' : '⏸️ 已暂停' }}</div>
          </Marquee>
        </div>
      </div>
    </div>

    <!-- 渐变效果 -->
    <div class="demo-section">
      <div class="demo-title">渐变效果 ✨</div>
      <div class="demo-desc">
        <p>🌈 <code>gradient=true</code> 添加左右渐变遮罩，让内容在边缘处自然淡出</p>
        <p>💡 <strong>关键提示：</strong>渐变颜色要和容器背景色匹配，才能看到自然的效果！</p>
      </div>

      <div class="demo-desc" style="margin-top: 20px; padding-top: 20px; border-top: 1px dashed #ddd;">
        <p>🟣 紫色渐变背景 + 紫色渐变遮罩</p>
        <p><code>gradientColor="#f093fb"</code> - 从紫色渐变到透明</p>
      </div>
      <div class="demo-content-light">
        <Marquee
          :gradient="true"
          :gradientWidth="200"
          gradientColor="#f093fb"
          :speed="50"
        >
          <div class="marquee-item">带渐变遮罩 🌈</div>
          <div class="marquee-item">边缘有渐变效果 ✨</div>
          <div class="marquee-item">带渐变遮罩 🌈</div>
          <div class="marquee-item">边缘有渐变效果 ✨</div>
        </Marquee>
      </div>

      <div class="demo-desc" style="margin-top: 20px;">
        <p>💚 绿色渐变背景 + 绿色渐变遮罩</p>
        <p><code>gradientColor="#43e97b"</code></p>
      </div>
      <div class="demo-content-green">
        <Marquee
          :gradient="true"
          gradientColor="#43e97b"
          :gradientWidth="150"
          :speed="50"
        >
          <div class="marquee-item">自定义渐变颜色 🎨</div>
          <div class="marquee-item">可以匹配页面背景 💚</div>
          <div class="marquee-item">自定义渐变颜色 🎨</div>
          <div class="marquee-item">可以匹配页面背景 💚</div>
        </Marquee>
      </div>

      <div class="demo-desc" style="margin-top: 20px;">
        <p>🟡 黄色渐变背景 + 黄色渐变遮罩</p>
        <p><code>gradientColor="#f6d365"</code></p>
      </div>
      <div class="demo-content-yellow">
        <Marquee
          :gradient="true"
          gradientColor="#f6d365"
          :gradientWidth="180"
          :speed="50"
        >
          <div class="marquee-item">黄色渐变效果 🌟</div>
          <div class="marquee-item">温暖柔和 🌅</div>
          <div class="marquee-item">黄色渐变效果 🌟</div>
          <div class="marquee-item">温暖柔和 🌅</div>
        </Marquee>
      </div>

      <div class="demo-desc" style="margin-top: 20px;">
        <p>⬛ 深色背景 + 深色渐变遮罩</p>
        <p><code>gradientColor="#232526"</code></p>
      </div>
      <div class="demo-content-dark">
        <Marquee
          :gradient="true"
          gradientColor="#232526"
          :gradientWidth="200"
          :speed="50"
        >
          <div class="marquee-item-dark">深色模式 🌙</div>
          <div class="marquee-item-dark">优雅深色 🌑</div>
          <div class="marquee-item-dark">深色模式 🌙</div>
          <div class="marquee-item-dark">优雅深色 🌑</div>
        </Marquee>
      </div>
    </div>

    <!-- 自动填充 -->
    <div class="demo-section">
      <div class="demo-title">自动填充</div>
      <div class="demo-desc">
        <p>🔄 autoFill: true 会自动填充内容以覆盖整个容器，实现无缝循环</p>
      </div>
      <div class="demo-content">
        <Marquee :autoFill="true" :speed="50">
          <div class="marquee-logo">🏷️ LOGO</div>
        </Marquee>
      </div>

      <div class="demo-desc" style="margin-top: 20px;">
        <p>📦 少量内容自动填充</p>
      </div>
      <div class="demo-content-blue">
        <Marquee :autoFill="true" :speed="60" :pauseOnHover="true">
          <div class="marquee-logo">品牌 1 🏢</div>
          <div class="marquee-logo">品牌 2 🏭</div>
        </Marquee>
      </div>
    </div>

    <!-- 慢速效果 -->
    <div class="demo-section">
      <div class="demo-title">慢速效果</div>
      <div class="demo-desc">
        <p>🐢 速度: 20px/s，适合公告栏等场景</p>
      </div>
      <div class="demo-content">
        <Marquee :speed="20" :pauseOnHover="true" :gradient="true" gradientColor="#667eea">
          <div class="marquee-item">📢 这是一条重要公告</div>
          <div class="marquee-item">📋 请仔细阅读</div>
          <div class="marquee-item">📢 这是一条重要公告</div>
          <div class="marquee-item">📋 请仔细阅读</div>
        </Marquee>
      </div>
    </div>

    <!-- 循环次数 -->
    <div class="demo-section">
      <div class="demo-title">循环次数控制</div>
      <div class="demo-desc">
        <p>🔢 loop: 3 - 只循环 3 次后停止</p>
        <p>📊 已完成循环: <strong>{{ cycleCount }}</strong> 次</p>
        <p>⏱️ 状态: <strong>{{ isFinished ? '✅ 已完成' : '🔄 运行中' }}</strong></p>
      </div>
      <div class="demo-content-light">
        <Marquee
          :loop="3"
          :speed="80"
          :onCycleComplete="handleCycleComplete"
          :onFinish="handleFinish"
          :key="resetKey"
        >
          <div class="marquee-item">循环 3 次 🔄</div>
          <div class="marquee-item">然后停止 🛑</div>
          <div class="marquee-item">循环 3 次 🔄</div>
          <div class="marquee-item">然后停止 🛑</div>
        </Marquee>
        <div class="controls" style="margin-top: 15px;">
          <Button type="primary" size="large" @click="resetLoop" style="border-radius: 8px;">
            🔄 重新开始
          </Button>
        </div>
      </div>
    </div>

    <!-- 延迟启动 -->
    <div class="demo-section">
      <div class="demo-title">延迟启动</div>
      <div class="demo-desc">
        <p>⏰ delay: 2 - 延迟 2 秒后开始滚动</p>
      </div>
      <div class="demo-content-green">
        <Marquee :delay="2" :speed="60">
          <div class="marquee-item">延迟启动 ⏰</div>
          <div class="marquee-item">2 秒后开始 🚀</div>
          <div class="marquee-item">延迟启动 ⏰</div>
          <div class="marquee-item">2 秒后开始 🚀</div>
        </Marquee>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'marquee-demo',
  data() {
    return {
      isPlaying: true,
      cycleCount: 0,
      isFinished: false,
      resetKey: 0,
    };
  },
  methods: {
    handleCycleComplete() {
      this.cycleCount++;
      console.log(`Cycle ${this.cycleCount} completed`);
    },
    handleFinish() {
      this.isFinished = true;
      console.log('Marquee animation finished!');
    },
    resetLoop() {
      this.cycleCount = 0;
      this.isFinished = false;
      this.resetKey++;
    },
  },
};
</script>
