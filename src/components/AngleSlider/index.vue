<template>
  <div
    class="angle-slider"
    :style="{
      width: size+'px',
      height: size+'px',
      '--bg-color': backgroundColor,
      '--progress-color': progressColor,
      '--end-mark-color': endMarkColor
    }"
    ref="container"
    @mousedown="handleMouseDown"
    @touchstart="handleTouchStart"
  >
    <div class="angle-slider__circle">
      <!-- 进度圆环 -->
      <svg v-if="showProgress" class="angle-slider__progress" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="48"
          fill="none"
          :stroke="progressColor"
          stroke-width="4"
          :stroke-dasharray="circumference"
          :stroke-dashoffset="dashOffset"
          transform="rotate(-90 50 50)"
        />
      </svg>
      <!-- 步进刻度线 -->
      <div v-if="useStep && showUseStep" class="angle-slider__step-ticks">
        <div
          v-for="tick in stepTicks"
          :key="tick"
          class="angle-slider__step-tick"
          :style="{ transform: `rotate(${tick - 90}deg)`}"
          :class="{ 'angle-slider__step-tick--active': tick <= value }"
        ></div>
      </div>
      <!-- 其他部分保持不变 -->
      <div
        v-if="showEndMark"
        class="angle-slider__end-mark"
        :style="{ transform: `rotate(${value - 90}deg)` }"
      >
        <div class="angle-slider__end-mark-line"></div>
      </div>
      <div class="angle-slider__ticks">
        <div
          v-for="tick in ticks"
          :key="tick"
          class="angle-slider__tick"
          :style="{ transform: `rotate(${tick}deg)` }"
          :class="{ 'angle-slider__tick--active': tick <= value }"
        ></div>
      </div>
    </div>
    <div class="value-display">{{ value }}°</div>
  </div>
</template>

<script>
export default {
  name: 'AngleSlider',
  props: {
    value: {
      type: Number,
      default: 0
    },
    size: {
      type: Number,
      default: 100
    },
    // 添加新的 props
    step: {
      type: Number,
      default: 5 // 默认5度一步
    },
    useStep: {
      type: Boolean,
      default: false // 默认不启用步进
    },
    showUseStep: {
      type: Boolean,
      default: true // 默认不启用步进
    },
    backgroundColor: {
      type: String,
      default: '#f1f3f5'
    },
    // 修改为进度圆环的控制属性
    progressColor: {
      type: String,
      default: '#228be6'
    },
    showProgress: {
      type: Boolean,
      default: true
    },
    // 终点标记的控制属性
    endMarkColor: {
      type: String,
      default: '#228be6'
    },
    showEndMark: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isDragging: false,
      ticks: Array.from({ length: 72 }, (_, i) => i * 5),
      circumference: 2 * Math.PI * 48,
    }
  },
  computed: {
    dashOffset() {
      return this.circumference * (1 - this.value / 360)
    },
    getEndPointX() {
      const angle = (this.value - 90) * (Math.PI / 180)
      return 50 + 48 * Math.cos(angle)
    },
    getEndPointY() {
      const angle = (this.value - 90) * (Math.PI / 180)
      return 50 + 48 * Math.sin(angle)
    },
    stepTicks() {
      // 根据步进值生成刻度
      const ticks = []
      for (let i = 0; i <= 360; i += this.step) {
        ticks.push(i)
      }
      return ticks
    }
  },
  watch: {
    // 确保初始值也符合步进
    useStep: {
      immediate: true,
      handler(newVal) {
        if (newVal && this.value % this.step !== 0) {
          const snappedValue = Math.round(this.value / this.step) * this.step
          this.$emit('input', snappedValue)
        }
      }
    }
  },
  methods: {
    handleMouseDown(event) {
      event.preventDefault()
      this.isDragging = true
      // 立即更新角度
      this.updateAngle(event)
      document.addEventListener('mousemove', this.handleMouseMove)
      document.addEventListener('mouseup', this.handleMouseUp)
    },
    handleMouseMove(event) {
      if (!this.isDragging) return
      this.updateAngle(event)
    },
    handleMouseUp() {
      this.isDragging = false
      document.removeEventListener('mousemove', this.handleMouseMove)
      document.removeEventListener('mouseup', this.handleMouseUp)
    },
    handleTouchStart(event) {
      event.preventDefault()
      this.isDragging = true
      // 立即更新角度
      this.updateAngle(event.touches[0])
      document.addEventListener('touchmove', this.handleTouchMove)
      document.addEventListener('touchend', this.handleTouchEnd)
    },
    handleTouchMove(event) {
      if (!this.isDragging) return
      this.updateAngle(event.touches[0])
    },
    handleTouchEnd() {
      this.isDragging = false
      document.removeEventListener('touchmove', this.handleTouchMove)
      document.removeEventListener('touchend', this.handleTouchEnd)
    },
    updateAngle(event) {
      const container = this.$refs.container
      const rect = container.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const x = event.clientX - centerX
      const y = event.clientY - centerY

      // 计算角度
      let angle = Math.atan2(y, x) * (180 / Math.PI)
      // 调整角度，使0度从正上方开始
      angle = (angle + 450) % 360

      // 如果启用步进，将角度吸附到最近的步进值
      if (this.useStep) {
        angle = Math.round(angle / this.step) * this.step
      }

      this.$emit('input', Math.round(angle))
    }
  }
}
</script>
