<template>
  <div
    class="screenshots-canvas"
    @mousedown="onMousedown"
  >
    <canvas
      ref="canvasRef"
      :width="store.width * devicePixelRatio"
      :height="store.height * devicePixelRatio"
      :style="{
        width: store.width + 'px',
        height: store.height + 'px'
      }"
    />
    <div class="screenshots-canvas-mask" />
  </div>
</template>

<script>
import { store, mutations,watchStoreTop } from './context'

export default {
  name: 'ScreenshotsCanvas',

  data() {
    return {
      ctx: null,
      is: false,
      point: null,
      devicePixelRatio: window.devicePixelRatio
    }
  },

  computed: {
    store() {
      return store
    },
  },

  watch: {
    ...watchStoreTop(function(newVal) {
      this.handleUpdate()
    }),
  },

  mounted() {
    this.ctx = this.$refs.canvasRef.getContext('2d')
    this.draw()
    window.addEventListener('mousemove', this.onMousemove)
    window.addEventListener('mouseup', this.onMouseup)
  },

  beforeDestroy() {
    window.removeEventListener('mousemove', this.onMousemove)
    window.removeEventListener('mouseup', this.onMouseup)
  },

  methods: {
    handleUpdate() {
      this.draw()
    },
    draw() {
      if (!this.store.image) return
      this.$nextTick(() => {
        this.ctx.setTransform(this.devicePixelRatio, 0, 0, this.devicePixelRatio, 0, 0)

        this.ctx.clearRect(0, 0, this.store.width, this.store.height)
        this.ctx.drawImage(
          this.store.image.el,
          0,
          0,
          this.store.image.width,
          this.store.image.height,
          0,
          0,
          this.store.width,
          this.store.height
        )
      })
    },

    onMousedown(e) {
      // 初始viewer框
      if (this.store.viewer || e.button !== 0) return // e.button 鼠标左键

      mutations.setContext({
        viewer: null,
        action: null,
        actionRef: null,
        stack: [],
        state: {},
        cursor: null
      })

      this.is = true
      this.point = { x: e.clientX, y: e.clientY }

      mutations.setContext(state => ({
        viewer: { ...state.viewer, resizing: true }
      }))

      this.update(e)
    },

    onMousemove(e) {
      if (!this.store.viewer || (this.store.viewer && this.store.viewer.resizing)) {
        this.$emit('magnify', {
          x: e.clientX,
          y: e.clientY
        })
      }

      if (!this.is) return
      this.update(e)
    },

    onMouseup(e) {
      if (this.is) {
        this.update(e)
        this.is = false
        mutations.setContext(state => ({
          viewer: { ...state.viewer, resizing: false }
        }))
      }
    },

    update(e) {
      const { x, y } = this.point
      this.$emit('change', {
        x1: x,
        y1: y,
        x2: e.clientX,
        y2: e.clientY
      })
    }
  }
}
</script>
