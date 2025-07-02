<template>
  <div
    :class="['screenshots', className]"
    ref="bodyRef"
    :style="{
      width: width + 'px',
      height: height + 'px'
    }"
  >
    <screenshots-canvas
      @change="onCanvasChange"
      @magnify="onMagnifyChange"
    />
    <screenshots-magnifier
      v-if="!store.viewer || (store.viewer && store.viewer.resizing)"
    />
    <screenshots-viewer
      @change="onViewerChange"
      @emit="onEmit"
    />
  </div>
</template>

<script>
  import { store, mutations } from './context'
  import ScreenshotsViewer from './ScreenshotsViewer'
  import ScreenshotsCanvas from './ScreenshotsCanvas'
  import ScreenshotsMagnifier from './ScreenshotsMagnifier'

  export default {
    name: 'screenshots',
    components: {
      ScreenshotsViewer,
      ScreenshotsCanvas,
      ScreenshotsMagnifier
    },
    props: {
      className: String,
      width: [Number, String],
      height: [Number, String],
      image: String
    },
    computed: {
      store() {
        return store
      }
    },
    mounted() {
      this.getImage().then(image => {
        mutations.initContext({ image, width: this.width, height: this.height })
      })
    },
    methods: {
      onEmit(event, ...args) {
        this.$emit(event, ...args)
      },
      getImage() {
        return new Promise((resolve) => {
          if (!this.image) {
            return resolve({
              el: null,
              width: 0,
              height: 0
            })
          }
          const $image = new Image()
          $image.src = this.image
          $image.addEventListener('load', () => {
            resolve({
              el: $image,
              width: $image.width,
              height: $image.height
            })
          })
          $image.addEventListener('error', () => {
            resolve({
              el: null,
              width: 0,
              height: 0
            })
          })
        })
      },
      onCanvasChange({ x1, y1, x2, y2 }) {
        const { left, top } = this.$refs.bodyRef.getBoundingClientRect()
        x1 = x1 - left
        y1 = y1 - top
        x2 = x2 - left
        y2 = y2 - top
        this.setViewer({ x1, y1, x2, y2 })
      },
      onMagnifyChange({ x, y }) {
        const { left, top, width, height } = this.$refs.bodyRef.getBoundingClientRect()
        if (x >= left && x <= left + width && y >= top && y <= top + height) {
          mutations.setContext({
            magnifyPoint: {
              x: x - left,
              y: y - top,
              right: left + width,
              bottom: top + height
            }
          })
        }
      },
      onViewerChange({ x1, y1, x2, y2 }) {
        this.setViewer({ x1, y1, x2, y2 })
      },
      setViewer({ x1, y1, x2, y2 }) {
        const x = x1
        const y = y1

        // 交换值
        if (x1 > x2) {
          x1 = x2
          x2 = x
        }

        if (y1 > y2) {
          y1 = y2
          y2 = y
        }

        // 把图形限制在元素里面
        if (x1 < 0) {
          x1 = 0
          x2 = this.store.viewer.x2
        }

        if (x2 > this.width) {
          x2 = this.width
          x1 = this.store.viewer.x1
        }

        if (y1 < 0) {
          y1 = 0
          y2 = this.store.viewer.y2
        }

        if (y2 > this.height) {
          y2 = this.height
          y1 = this.store.viewer.y1
        }

        mutations.setContext(state => ({
          viewer: { ...state.viewer, x1, y1, x2, y2 }
        }))
      },
    },
  };
</script>
