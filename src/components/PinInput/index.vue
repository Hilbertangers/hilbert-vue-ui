<template>
  <div class="h-pin-input" :class="{ 'is-disabled': disabled }">
    <input
      v-for="(value, index) in values"
      :key="index"
      :ref="`input-${index}`"
      v-model="values[index]"
      class="h-pin-input__field"
      :type="inputType"
      :inputmode="inputMode"
      :pattern="inputPattern"
      :disabled="disabled"
      :maxlength="1"
      @input="handleInput($event, index)"
      @keydown="handleKeyDown($event, index)"
      @compositionstart="handleCompositionStart"
      @compositionend="handleCompositionEnd($event, index)"
      @paste="handlePaste"
      @focus="handleFocus(index)"
    />
  </div>
</template>

<script>
export default {
  name: 'HPinInput',

  props: {
    length: {
      type: Number,
      default: 4
    },
    type: {
      type: String,
      default: 'text',
      validator: value => ['text', 'number', 'password'].includes(value)
    },
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      values: Array(this.length).fill(''),
      isComposing: false // 用于处理中文输入
    }
  },

  computed: {
    // 根据type确定实际的input type
    inputType() {
      return this.type === 'number' ? 'tel' : this.type
    },

    // 移动端键盘类型
    inputMode() {
      return this.type === 'number' ? 'numeric' : 'text'
    },

    // 输入模式限制
    inputPattern() {
      return this.type === 'number' ? '[0-9]*' : '[a-zA-Z0-9]*'
    }
  },

  watch: {
    value: {
      immediate: true,
      handler(newValue) {
        if (newValue) {
          const chars = newValue.split('')
          this.values = Array(this.length).fill('').map((_, i) => chars[i] || '')
        }
      }
    },
    values: {
      deep: true,
      handler(newValues) {
        this.$emit('input', newValues.join(''))
        if (newValues.every(v => v !== '')) {
          this.$emit('complete', newValues.join(''))
        }
      }
    }
  },

  methods: {
    getInput(index) {
      return this.$refs[`input-${index}`]
    },

    // 验证输入值是否合法
    validateInput(value) {
      if (!value) return ''

      if (this.type === 'number') {
        return /^\d*$/.test(value) ? value.slice(-1) : ''
      } else {
        // text 和 password 类型只允许数字和字母
        return /^[a-zA-Z0-9]*$/.test(value) ? value.slice(-1) : ''
      }
    },

    handleCompositionStart() {
      this.isComposing = true
    },

    handleCompositionEnd(event, index) {
      this.isComposing = false
      // 中文输入完成后处理输入值
      const value = this.validateInput(event.target.value)
      if (value) {
        this.$set(this.values, index, value)
        if (index < this.length - 1) {
          const nextInput = this.getInput(index + 1)
          if (nextInput) {
            nextInput.focus()
          }
        }
      }
    },

    handleInput(event, index) {
      // 如果是中文输入过程中，不处理
      if (this.isComposing) return

      const value = this.validateInput(event.target.value)
      this.$set(this.values, index, value)

      if (value && index < this.length - 1) {
        const nextInput = this.getInput(index + 1)
        if (nextInput) {
          nextInput.focus()
        }
      }
    },

    handleKeyDown(event, index) {
      if (event.key === 'Backspace') {
        if (this.values[index]) {
          event.preventDefault()
          this.$set(this.values, index, '')
        } else if (index > 0) {
          event.preventDefault()
          this.$set(this.values, index - 1, '')
          const prevInput = this.getInput(index - 1)
          if (prevInput) {
            prevInput.focus()
          }
        }
      } else if (event.key === 'ArrowLeft' && index > 0) {
        event.preventDefault()
        const prevInput = this.getInput(index - 1)
        if (prevInput) {
          prevInput.focus()
        }
      } else if (event.key === 'ArrowRight' && index < this.length - 1) {
        event.preventDefault()
        const nextInput = this.getInput(index + 1)
        if (nextInput) {
          nextInput.focus()
        }
      }
    },

    handlePaste(event) {
      event.preventDefault()
      const pastedData = event.clipboardData.getData('text')

      // 根据类型过滤粘贴的内容
      let validChars
      if (this.type === 'number') {
        validChars = pastedData.replace(/[^0-9]/g, '').split('')
      } else {
        validChars = pastedData.replace(/[^a-zA-Z0-9]/g, '').split('')
      }

      // 更新值
      validChars.slice(0, this.length).forEach((char, i) => {
        this.$set(this.values, i, char)
      })

      // 聚焦到下一个空输入框
      this.$nextTick(() => {
        const nextEmptyIndex = this.values.findIndex(v => !v)
        if (nextEmptyIndex !== -1 && nextEmptyIndex < this.length) {
          const nextInput = this.getInput(nextEmptyIndex)
          if (nextInput) {
            nextInput.focus()
          }
        }
      })
    },

    handleFocus(index) {
      if (this.disabled) return

      // 找到第一个空的输入框索引
      const firstEmptyIndex = this.values.findIndex(v => !v)

      // 如果存在空输入框，且当前聚焦的输入框在空输入框之后
      if (firstEmptyIndex !== -1 && index > firstEmptyIndex) {
        this.$nextTick(() => {
          const firstEmptyInput = this.getInput(firstEmptyIndex)
          if (firstEmptyInput) {
            firstEmptyInput.focus()
            firstEmptyInput.select()
          }
        })
        return
      }

      // 如果是正常聚焦，则选中当前输入框的内容
      this.$nextTick(() => {
        const input = this.getInput(index)
        if (input) {
          input.select()
        }
      })
    }
  }
}
</script>
