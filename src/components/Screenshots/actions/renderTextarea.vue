<template>
  <div
    ref="renderTextarea"
    class="screenshots-textarea"
    contentEditable="true"
    spellCheck="false"
    suppressContentEditableWarning
    :style="{
      transform: [`translate(${x - 12}px, ${y - 11}px)`], // 12, 11是试出来的~~，64字体以上有一点点偏移
      fontSize: size + 'px',
      color: color,
      cursor: cursor
    }"
    @mousedown="onMousedown"
    @focus="onFocus"
    @blur="onBlur"
  >{{value}}</div>
</template>

<script>
export default {
  name: 'RenderTextarea',
  props: {
    x: Number,
    y: Number,
    size: Number,
    color: String,
    value: String,
    cursor: String,
  },
  mounted() {
    this.$nextTick(() => {
      if (!this.value) {
        this.setCaretToEnd(this.$refs.renderTextarea)
      }
    })
  },
  methods: {
    setCaretToEnd(element) {
      if (!element.firstChild) {
        const textNode = document.createTextNode('')
        element.appendChild(textNode)
      }

      const range = document.createRange()
      const selection = window.getSelection()

      // 创建一个范围
      range.setStart(element.firstChild, 0)
      range.collapse(true) // false 表示折叠到末尾

      // 清除现有选区并应用新的选区
      selection.removeAllRanges()
      selection.addRange(range)

      // 设置焦点
      element.focus()
    },
    onMousedown(e) {
      this.$emit('mousedown', e)
    },
    onFocus(e) {
      this.$emit('focus', e)
    },
    onBlur(e) {
      this.$emit('blur', e)
    }
  }
}
</script>
