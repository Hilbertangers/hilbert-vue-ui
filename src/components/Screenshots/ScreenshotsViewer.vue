<template>
  <div
    class="screenshots-viewer"
    :style="{ display: store.viewer ? 'block' : 'none' }"
  >
    <div
      ref="viewerRef"
      class="screenshots-viewer-body"
      :style="{
        left: size.x + 'px',
        top: size.y + 'px',
        width: size.width + 'px',
        height: size.height + 'px',
        overflow: store.action ? 'hidden' : 'inherit'
      }"
    >
      <canvas
        ref="canvasRef"
        :width="size.width * devicePixelRatio"
        :height="size.height * devicePixelRatio"
        :style="{
          width: size.width + 'px',
          height: size.height + 'px'
        }"
      />
      <div
        class="screenshots-viewer-border"
        :style="{ cursor: currentCursor }"
        @mousedown="e => onMousedown(e, 'move')"
      />
      <div
        v-for="pointer in pointers"
        :key="pointer"
        :class="`screenshots-viewer-pointer-${pointer}`"
        @mousedown="e => onMousedown(e, pointer)"
      />
      <screenshots-viewer-edit-point
        v-if="store.action"
        :pointers="store.editPointers"
      />
    </div>
    <screenshots-viewer-bar @action="onAction" :ctx="ctx" />
  </div>
</template>

<script>
import { store, mutations, watchStoreTop, getActionChangeRef } from './context'
import ScreenshotsViewerBar from './ScreenshotsViewerBar'
import ScreenshotsViewerEditPoint from './ScreenshotsViewerEditPoint'

export default {
  name: 'ScreenshotsViewer',

  components: {
    ScreenshotsViewerBar,
    ScreenshotsViewerEditPoint
  },

  data() {
    return {
      ctx: null,
      actionType: null,
      point: null,
      viewerData: null,
      devicePixelRatio: window.devicePixelRatio
    }
  },

  computed: {
    store() {
      return store
    },
    size() {
      if (!this.store.viewer) {
        return {
          x: 0,
          y: 0,
          width: 0,
          height: 0
        }
      }
      const { x1, y1, x2, y2 } = this.store.viewer
      return {
        x: x1,
        y: y1,
        width: x2 - x1,
        height: y2 - y1
      }
    },

    currentCursor() {
      if (this.store.cursor) {
        return this.store.cursor
      }
      if (this.store.action) {
        return 'default'
      }
      return 'grab'
    },

    pointers() {
      const pointers = [
        'top',
        'top-right',
        'right',
        'right-bottom',
        'bottom',
        'bottom-left',
        'left',
        'left-top'
      ]
      return this.store.action ? [] : pointers
    },

    actionArgs() {
      const context = this.store
      return {
        viewer: this.$refs.viewerRef,
        el: this.$refs.canvasRef,
        ctx: this.ctx,
        context: {
          image: context.image,
          viewer: context.viewer,
          width: context.width,
          height: context.height,
          stack: context.stack,
          action: context.action,
          actionRef: context.actionRef,
          actions: context.actions,
          border: context.border,
          font: context.font,
          color: context.color,
          cursor: context.cursor,
          editPointers: context.editPointers
        },
        setContext: mutations.setContext,
        emit: this.onEmit
      }
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
      const { image, width, height, stack } = this.store
      if (!image) return
      this.$nextTick(() => {
        const { x, y, width: w, height: h } = this.size
        const rx = image.width / width
        const ry = image.height / height

        this.ctx.setTransform(this.devicePixelRatio, 0, 0, this.devicePixelRatio, 0, 0)
        this.ctx.clearRect(0, 0, w, h)
        this.ctx.drawImage(image.el, x * rx, y * ry, w * rx, h * ry, 0, 0, w, h)
        stack.forEach(item => item.draw(this.ctx, item.history[0], item))
      })
    },

    async onMousedown(e, type) {
      const { viewer, action, actionRef } = this.store
      if (!viewer) return
      if (!action) {
        if (!type || e.button !== 0) return
        this.actionType = type
        this.point = { x: e.clientX, y: e.clientY }
        this.viewerData = { ...viewer }

        if (this.actionType === 'move') {
          mutations.setContext(state => ({
            viewer: { ...state.viewer, moving: true },
            cursor: 'grabbing'
          }))
        } else {
          mutations.setContext(state => ({
            viewer: { ...state.viewer, resizing: true }
          }))
        }
      } else {
        const current = this.handlePointInRecord(e)
        if (current.type && (current.type !== action.type)) {
          const Action = this.store.actions.find(t => t.key.type === current.type).key

          const { actionRef: nextActionRef } = await this.onAction(Action)

          this.$nextTick(() => {
            if (typeof nextActionRef?.mousemove === 'function') {
              nextActionRef?.mousemove(e, this.actionArgs, current)
            }
            if (typeof nextActionRef?.mousedown === 'function') {
              nextActionRef?.mousedown(e, this.actionArgs)
            }
          })
        } else {
          if (typeof actionRef?.mousedown === 'function') {
            actionRef?.mousedown(e, this.actionArgs)
          }
        }
      }
    },

    onMousemove(e) {
      const { viewer, action, actionRef } = this.store
      if (!viewer) return
      if (!action) {
        if (this.actionType === 'move') {
          this.move(e)
        } else if (this.actionType) {
          this.resize(e)
        }
      } else {
        if (typeof actionRef?.mousemove === 'function') {
          actionRef?.mousemove(e, this.actionArgs, this.handlePointInRecord(e))
        }
      }
    },

    onMouseup(e) {
      const { viewer, action, actionRef } = this.store
      if (!viewer) return
      if (!action) {
        if (this.actionType) {
          if (this.actionType === 'move') {
            mutations.setContext({ cursor: null })
          }
          mutations.setContext(state => ({
            viewer: { ...state.viewer, resizing: false, moving: false }
          }))
          this.actionType = null
          this.point = null
          this.viewerData = null
        }
      } else {
        if (typeof actionRef?.mouseup === 'function') {
          actionRef?.mouseup(e, this.actionArgs)
        }
      }
    },

    move(e) {
      if (!this.viewerData) return
      const x = e.clientX - this.point.x
      const y = e.clientY - this.point.y
      const { x1, y1, x2, y2 } = this.viewerData
      this.$emit('change', {
        x1: x1 + x,
        y1: y1 + y,
        x2: x2 + x,
        y2: y2 + y
      })
    },

    resize(e) {
      if (!this.viewerData) return
      const x = e.clientX - this.point.x
      const y = e.clientY - this.point.y
      let { x1, y1, x2, y2 } = this.viewerData

      switch (this.actionType) {
        case 'top':
          y1 += y
          break
        case 'top-right':
          x2 += x
          y1 += y
          break
        case 'right':
          x2 += x
          break
        case 'right-bottom':
          x2 += x
          y2 += y
          break
        case 'bottom':
          y2 += y
          break
        case 'bottom-left':
          x1 += x
          y2 += y
          break
        case 'left':
          x1 += x
          break
        case 'left-top':
          x1 += x
          y1 += y
          break
        default:
          return
      }
      this.$emit('change', { x1, y1, x2, y2 })
    },

    handlePointInRecord(e) {
      const { left, top } = this.$refs.canvasRef.getBoundingClientRect()
      const x = (e.clientX - left) * this.devicePixelRatio
      const y = (e.clientY - top) * this.devicePixelRatio

      let action = null
      let type = ''
      let index = -1

      this.store.stack.some((t, i) => {
        const recent = t.history[0]

        if (['rect', 'ellipse', 'brush'].includes(t.type)) {
          if (this.ctx.isPointInStroke(recent.path, x, y)) {
            action = recent
            type = t.type
            index = i
            return true
          }
        }

        if (['arrow'].includes(t.type)) {
          if (this.ctx.isPointInStroke(recent.path, x, y) ||
              this.ctx.isPointInPath(recent.path, x, y)) {
            action = recent
            type = t.type
            index = i
            return true
          }
        }

        if (t.type === 'text') {
          const textRect = recent.domClientRect
          const textX = textRect.left - left
          const textY = textRect.top - top
          const assertX = x >= textX && x <= (textX + textRect.width)
          const assertY = y >= textY && y <= (textY + textRect.height)
          if (assertX && assertY) {
            action = recent
            type = t.type
            index = i
            return true
          }
        }
      })
      return { action, index, type }
    },

    async onAction(Action) {
      const lastAction = this.store.action
      const lastActionRef = this.store.actionRef

      if (
        Action.type !== 'undo' &&
        lastAction &&
        (Action.type !== lastAction.type)
      ) {
        lastActionRef.beforeUnMount && lastActionRef.beforeUnMount()
      }

      // 特殊组件不作为vueIns，直接构造
      if (
        Action.type === 'undo' ||
        Action.type === 'ok' ||
        Action.type === 'cancel'
      ) {
        if (Action.type === 'ok') {
          setTimeout(() => { // 处理文本action时需要宏任务一下，优先text的blur事件
            this.$nextTick(() => {
              let _nextAction = new Action(this.actionArgs)
              Action = Object.keys(_nextAction).length ? _nextAction : null
            })
          }, 16)
        } else {
          let _nextAction = new Action(this.actionArgs)
          Action = Object.keys(_nextAction).length ? _nextAction : null
        }
      }

      mutations.setContext({
        action: Action
      })

      let actionRef = null
      if (Action) {
        actionRef = await getActionChangeRef()
      }
      return {
        action: Action,
        actionRef,
      }
    },

    onEmit(event, ...args) {
      this.$emit('emit', event, ...args)
    }
  }
}
</script>
