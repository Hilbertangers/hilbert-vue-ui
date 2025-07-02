<template>
  <div
    class="screenshots-viewer-bar"
    ref="barRef"
    :style="{
      display: store.viewer && !store.viewer.resizing && !store.viewer.moving ? 'block' : 'none',
      left: x + 'px',
      top: y + 'px'
    }"
  >
    <div class="screenshots-viewer-bar-container">
      <div class="screenshots-viewer-bar-icons">
        <template v-for="(item, index) in store.actions">
          <!-- 分隔线 -->
          <div
            v-if="item.type === 'divider'"
            :key="index"
            class="screenshots-viewer-bar-divider"
          />
          <!-- 按钮 -->
          <div
            v-else
            :class="[
              'screenshots-viewer-bar-button',
              (store.action && store.action.name === item.key.name) && 'screenshots-viewer-bar-button-active',
              item.key.title === '撤销' && !store.stack.length && 'screenshots-viewer-bar-button-disabled'
            ]"
            :title="item.key.title"
            @click="onClick(item.key)"
          >
            <i :class="item.key.icon" />
          </div>
        </template>
      </div>
    </div>
    <div class="screenshots-viewer-bar-container">
      <div
        v-if="option"
        class="screenshots-viewer-bar-options"
      >
        <component ref="actionRef" :is="option" :ctx="ctx" />
      </div>
    </div>
  </div>
</template>

<script>
import { store, mutations, triggerActionChange } from './context'

export default {
  name: 'ScreenshotsViewerBar',

  props: {
    ctx: {
      type: CanvasRenderingContext2D,
      default: () => null
    }
  },

  data() {
    return {
      x: 0,
      y: 0
    }
  },

  computed: {
    store() {
      return store
    },

    option() {
      if (!this.store.action) return null
      if (typeof this.store.action.render !== 'function') return null
      return this.store.action
    }
  },

  watch: {
    'store.viewer': {
      handler: 'setPosition',
      deep: true
    },
    'store.action': {
      handler: 'setActionRef',
      deep: true
    }
  },

  mounted() {
    this.setPosition()
  },

  updated() {
    this.setPosition()
  },

  methods: {
    setPosition() {
      const { store } = this;
      if (!store.viewer) return
      const { x2, y2 } = store.viewer
      const { offsetWidth, offsetHeight } = this.$refs.barRef

      let x1 = x2 - offsetWidth
      let y1 = y2 + 10

      if (x1 < 0) {
        x1 = 0
      }

      if (y1 > this.height - offsetHeight) {
        y1 = y2 - offsetHeight - 10
      }

      if (this.x === x1 && this.y === y1) return

      this.x = x1
      this.y = y1
    },

    setActionRef() {
      this.$nextTick(() => {
        mutations.setContext({
          actionRef: this.$refs.actionRef
        }, () => {
          triggerActionChange(this.$refs.actionRef)
        })
      })
    },

    onClick(Action) {
      if (!Action) return
      this.$emit('action', Action)
    }
  }
}
</script>
