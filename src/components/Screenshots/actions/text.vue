<template>
  <size-color
    :isFont="true"
    :size="store.font"
    :color="store.color"
    @onSizeChange="onSizeChange"
    @onColorChange="onColorChange"
  />
</template>

<script>
import Vue from 'vue'
import ActionMixin from './action'
import SizeColor from '../SizeColor'
import RenderTextarea from './renderTextArea'

export default {
  name: 'TextVue',
  title: '文本',
  type: 'text',
  icon: 'screenshots-icon-text',

  mixins: [ActionMixin],

  components: {
    SizeColor
  },


  data() {
    return {
      text: null,
      $textarea: null,
      textareaVm: null, // 存储Vue实例的引用
      textareaProps: null, // 响应式的textarea属性
      isFocus: false,
      isNew: false,
      isEdit: false,
      canBlur: false,
      mouseDownTimer: null,

      inStroke: {
        is: false,
        index: -1
      },
      drag: {
        isDown: false,
        done: false, // 用于mouseup判断 是否移动了
        point: null,
        textWrap: null
      },
    }
  },

  created() {
    this.initAction('default')
  },

  methods: {
    beforeUnMount() {
      if (this.$textarea && !this.isFocus) {
        this.drag.textWrap.removeChild(this.drag.textWrap.firstChild)

        this.$textarea = null

        if (this.text.canDraw === false) {
          this.text.canDraw = true
          this.draw(this.ctx, this.text.history[0], this.text) // 针对ok和save重新绘制一下
        }
        this.text = null
      } else if (this.$textarea && this.isFocus) {
        this.canBlur = true
        this.$textarea.firstChild.blur()
      }
    },
    draw(ctx, { size, color, x, y, value }, { canDraw }) {
      if (canDraw === false) {
        return
      }
      const textArr = value.split('')
      let textRender = ''
      let _y = y - 2
      let line = 1
      const textDraw = (ctx, value, x, y) => {
        ctx.lineWidth = 5
        ctx.strokeStyle = '#ccc'
        ctx.strokeText(value, x, y)
        ctx.lineWidth = 4
        ctx.strokeStyle = '#fff'
        ctx.strokeText(value, x, y)
        ctx.fillText(value, x, y)
      }
      const areaWidth = 300 - 20

      ctx.fillStyle = color
      ctx.textBaseline = 'top'
      ctx.font = `${size}px Microsoft YaHei`

      textArr.forEach(t => {
        const cur = textRender + t
        const metricsWidth = ctx.measureText(cur).width
        if (metricsWidth >= areaWidth) {
          textDraw(ctx, textRender, x, _y)
          textRender = t
          _y += size // 先粗糙处理，行高计算参考https://stackoverflow.com/questions/1134586/how-can-you-find-the-height-of-text-on-an-html-canvas
          line = line + 1
        } else {
          textRender = cur
        }
      })
      textDraw(ctx, textRender, x, _y)
    },

    mousedown(e, { el, viewer, ctx, context, setContext }) {
      const { left, top, width, height } = el.getBoundingClientRect()
      const { font, color } = context
      const x = e.clientX - left
      const y = e.clientY - top

      if (!this.text) {
        if (!this.inStroke.is) {
          this.isNew = true
          this.text = {
            type: 'text',
            history: [
              {
                size: font,
                color,
                x,
                y,
                value: ''
              }
            ],
            undoCB: this.undoCB,
            canDraw: true,
            draw: this.draw
          }

          this.renderTextarea(this.text.history[0], { el, viewer, ctx, context, setContext })
        } else {
          this.text = context.stack[this.inStroke.index]
          this.text.canDraw = false

          this.renderTextarea({
            cursor: 'grabbing',
            ...this.text.history[0]
          }, { el, viewer, ctx, context, setContext })

          const record = { ...this.text.history[0], ready: true } // 新增一条待进栈的记录
          this.text.history.unshift(record)

          this.drag.isDown = true
          this.drag.textWrap = this.$textarea
          this.drag.point = { x, y }

          this.setContext({ stack: [...context.stack] })
        }
      } else {
        if (this.isFocus === false) {
          this.canBlur = true
          this.$textarea.firstChild.focus() // fuck???
        } else {
          if (x > 0 && x < width && y > 0 && y < height) {
            this.canBlur = true
          }
        }
      }
    },

    mousemove(e, { el, viewer, ctx, context, setContext }, pointInStroke) {
      const { left, top } = el.getBoundingClientRect()
      const x = e.clientX - left
      const y = e.clientY - top

      const { action, index } = pointInStroke

      if (this.drag.isDown) { // 拖拽text
        const last = this.text.history[1]
        const now = this.text.history[0]
        const translateX = x - this.drag.point.x
        const translateY = y - this.drag.point.y
        delete now.ready // 使用记录
        now.x = last.x + translateX
        now.y = last.y + translateY

        const { left, top, width, height } = e.target.getBoundingClientRect()
        now.domClientRect = { left, top, width, height }

        // 更新现有组件
        this.updateTextarea({
          cursor: 'grabbing',
          ...now
        }, { el, viewer, ctx, context, setContext })

        this.drag.done = true
        return
      }

      if (action) {
        this.inStroke.is = true
        this.inStroke.index = index
        this.setContext({ cursor: 'grab' })
      } else {
        this.inStroke.is = false
        this.setContext({ cursor: 'default' })
      }
    },

    mouseup(e, { el, viewer, ctx, context, setContext }) {
      if (this.text) {
        if (this.text.history[0].ready) { // 框未拖动
          this.text.history.shift()
        }
        if (this.drag.isDown) {
          this.drag.isDown = false
          if (this.drag.done) {
            this.drag.done = false
            this.text.history[0].undoPriority = this.setUndoPriority(context)
          }

          // 更新现有组件的属性
          this.updateTextarea({
            cursor: 'grab',
            ...this.text.history[0]
          }, { el, viewer, ctx, context, setContext })
        }
      }
    },

    onFocus(e) {
      this.isFocus = true
    },

    onBlur(e, { el, viewer, ctx, context, setContext }) {
      const dom = e.target

      if (!this.canBlur) { // canBlur由mousedown控制
        dom.focus()
        return
      }
      const { left, top, width, height } = dom.getBoundingClientRect()

      this.isFocus = false
      if (this.isNew === true) {
        // 新增
        if (e.target.innerText) {
          this.text.history[0].value = e.target.innerText
          this.text.history[0].domClientRect = { left, top, width, height }
          this.text.history[0].undoPriority = this.setUndoPriority(this.store)

          const { stack } = this.store
          stack.push(this.text)
          this.setContext({ stack: [...stack] })
        }
        this.isNew = false
      } else {
        // 编辑
        if (e.target.innerText) {
          this.text.canDraw = true
          const record = { ...this.text.history[0] } // 新增一条待进栈的记录
          if (record.value !== e.target.innerText) { // 值改变了
            this.text.history.unshift(record)
          }

          this.text.history[0].value = e.target.innerText
          this.text.history[0].domClientRect = { left, top, width, height }
          this.text.history[0].undoPriority = this.setUndoPriority(this.store)
        } else {
          this.store.stack.splice(this.inStroke.index, 1)
        }
        const { stack } = this.store
        this.setContext({ stack: [...stack] })
      }
      viewer.removeChild(dom.parentNode)
      this.$textarea = null
      this.text = null
      this.canBlur = false
    },

    onTextMouseDown(e, { el, viewer, ctx, context, setContext }) {
      if (!this.isFocus) {
        if (!this.mouseDownTimer) {
          this.mouseDownTimer = setTimeout(() => {
            this.mouseDownTimer = null
          }, 300)
          const { left, top } = el.getBoundingClientRect()
          const x = e.clientX - left
          const y = e.clientY - top
          const record = { ...this.text.history[0], ready: true } // 新增一条待进栈的记录
          this.text.history.unshift(record)

          this.drag.isDown = true
          this.drag.point = { x, y }
          e.preventDefault()
        } else {
          this.mouseDownTimer = null
          e.preventDefault()

          // 直接更新现有组件而不是创建新的
          this.updateTextarea(this.text.history[0], { el, viewer, ctx, context, setContext })

          const dom = e.target
          var range = document.createRange()
          var sel = window.getSelection()
          range.setStart(dom.childNodes[0], dom.innerText.length)
          range.collapse(true)
          sel.removeAllRanges()
          sel.addRange(range)
          dom.focus()
        }
      }
    },

    undoCB(priority, action, actionRef, { el, viewer, ctx, context, setContext }) {
      console.log("🚀 ~ undoCB ~ actionRef:", actionRef)
      if (actionRef.$textarea && !actionRef.isFocus && actionRef.text === priority) {
        if (priority.history.length) {
          // 直接更新现有组件而不是重新创建
          actionRef.updateTextarea({
            cursor: 'grabbing',
            ...priority.history[0]
          }, { el, viewer, ctx, context, setContext })
        } else {
          viewer.removeChild(actionRef.$textarea)
          actionRef.$textarea = null
          actionRef.text = null
        }
      }
    },

    onSizeChange(size) {
      this.setContext({ font: +size })
      this.sizeColorEdit('size', +size)
    },

    onColorChange(color) {
      this.setContext({ color })
      this.sizeColorEdit('color', color)
    },

    sizeColorEdit(type, value) {
      if (this.$textarea) {
        if (this.text.history[0][type] === value) return
        const cursor = this.isFocus ? 'text' : 'grab'
        if (this.text.history[0].value) {
          const record = {
            ...this.text.history[0],
            undoPriority: this.setUndoPriority(this.store)
          }
          record[type] = value
          this.text.history.unshift(record)
        } else {
          this.text.history[0][type] = value
        }

        // 直接更新当前的textarea组件
        if (this.textareaVm) {
          this.textareaVm.dynamicProps = {
            cursor,
            ...this.text.history[0]
          }
        }
      }
    },

    renderTextarea(props, { el, viewer, ctx, context, setContext }) {
      const textWrap = document.createElement('div')
      viewer.appendChild(textWrap)

      // 创建响应式的props数据
      const self = this
      const vm = new Vue({
        data() {
          return {
            dynamicProps: props
          }
        },
        render(h) {
          return h(RenderTextarea, {
            props: this.dynamicProps,
            on: {
              blur: (e) => self.onBlur(e, { el, viewer, ctx, context, setContext }),
              focus: self.onFocus,
              mousedown: (e) => self.onTextMouseDown(e, { el, viewer, ctx, context, setContext })
            }
          })
        }
      }).$mount()

      textWrap.appendChild(vm.$el)
      this.$textarea = textWrap
      this.textareaVm = vm // 保存Vue实例引用
    },

    updateTextarea(props, { el, viewer, ctx, context, setContext }) {
      if (this.textareaVm && this.drag.textWrap) {
        // 直接更新响应式数据，Vue会自动重新渲染
        this.textareaVm.dynamicProps = { ...props }
      }
    }
  }
}
</script>
