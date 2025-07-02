import { store, mutations } from '../context'

export default {
  props: {
    ctx: {
      type: CanvasRenderingContext2D,
      default: () => null
    }
  },
  computed: {
    store() {
      return store
    },
  },
  methods: {
    setUndoPriority(context) {
      return Math.max.apply(null, [...context.stack.map(t => t.history[0].undoPriority), 0]) + 1
    },

    emit(event, ...args) {
      this.$emit(event, ...args)
    },

    // 添加一些通用的方法
    initAction(cursor = 'crosshair') {
      mutations.setContext({ cursor })
    },

    clearEditPointers() {
      mutations.setContext({ editPointers: [] })
    },
    setContext(...args) {
      mutations.setContext(...args)
    }
  },
}
