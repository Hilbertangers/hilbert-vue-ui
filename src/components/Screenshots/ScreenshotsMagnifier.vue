<template>
  <div
    class="screenshots-magnifier"
    :style="{
      transform: `translate(${left}px, ${top}px)`
    }"
  >
    <div class="screenshots-magnifier-canvas">
      <canvas
        ref="magnifierRef"
        :width="width"
        :height="height"
      />
      <div class="screenshots-magnifier-canvas-crosshair" />
    </div>
    <div class="screenshots-magnifier-explain">
      <div class="screenshots-magnifier-explain-rgb">RGB：{{ rgb }}</div>
      <div class="screenshots-magnifier-explain-site">坐标：({{ store.magnifyPoint.x }},{{ store.magnifyPoint.y }})</div>
    </div>
  </div>
</template>

<script>
import { store, mutations } from './context'

export default {
  name: 'ScreenshotsMagnifier',

  data() {
    return {
      width: 120,
      height: 90,
      rgb: '',
      explain: {
        width: 120,
        height: 40
      },
      ctx: null,
      magnifyRate: 3
    }
  },

  computed: {
    store() {
      return store
    },
    left() {
      const { x, right } = this.store.magnifyPoint
      const bias = 5
      return x + this.width + bias >= right
        ? x - this.width - bias
        : x + bias
    },
    top() {
      const { y, bottom } = this.store.magnifyPoint
      const bias = 5
      return y + this.height + this.explain.height + bias >= bottom
        ? y - this.height - this.explain.height - bias
        : y + bias
    }
  },

  watch: {
    'store': {
      handler(newVal) {
        this.handleUpdate()
      },
      deep: true
    }
  },

  mounted() {
    this.ctx = this.$refs.magnifierRef.getContext('2d')
    this.draw()
  },

  methods: {
    handleUpdate() {
      this.draw()
    },
    draw() {
      const { image, viewer, magnifyPoint, width, height } = this.store
      const { x, y } = magnifyPoint

      if (!image || x < 0 || y < 0 || (viewer && !viewer.resizing)) return

      const magnifyX = image.width * x / width
      const magnifyY = image.height * y / height
      const magnifyW = this.width
      const magnifyH = this.height

      // 获取颜色数据
      const colorData = this.ctx.getImageData(magnifyW / 2, magnifyH / 2, 1, 1).data
      this.rgb = `(${colorData[0]},${colorData[1]},${colorData[2]})`

      // 清除并重绘放大区域
      this.ctx.clearRect(0, 0, magnifyW, magnifyH)
      this.ctx.drawImage(
        image.el,
        magnifyX - magnifyW / this.magnifyRate / 2,
        magnifyY - magnifyH / this.magnifyRate / 2,
        magnifyW / this.magnifyRate,
        magnifyH / this.magnifyRate,
        0,
        0,
        magnifyW,
        magnifyH
      )
    }
  }
}
</script>
