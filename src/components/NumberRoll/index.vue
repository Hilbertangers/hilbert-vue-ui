<template>
  <div class="number-roll">
    <input
      :disabled="disableInput"
      type="text"
      :value="value"
      @change="inputChange"
    />
    <div
      class="number-roll-stage"
      v-for="(item, index) in renderValue"
      :style="{
        width: renderWidth,
        height: renderHeight,
        lineHeight: renderHeight,
        perspective: `calc(${renderHeight} * 2)`
      }"
    >
      <div
        class="number-roll-stage-wrapper"
        :style="{
          transform: `rotateX(${rotateFlagUpdate(+item, index)}deg)`
        }"
      >
        <div
          class="number-roll-stage-wrapper-content"
          v-for="(_item, _index) in numbersConfig"
          :style="{
            transform: `rotateX(${_item.rotateX}deg) translateZ(${renderHeight}) translateX(-50%)`,
            fontSize: `calc(${renderHeight} / 2)`
          }"
        >
          {{ _item.label }}
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  /**
  * numberRoll
  * @desc 数字翻滚动效
  * @example 调用示例
  *   <number-roll v-model="num" :font="{width: `${height}px`, height: `${height}px`}"></number-roll>
  **/

  export default {
    name: 'NumberRoll',
    props: {
      value: {
        type: Number,
        default: 0,
      },
      disableInput: {
        type: Boolean,
        default: true,
      },
      font: {
        type: Object,
        default: () => ({
          width: '40px',
          height: '40px',
        }),
      }
    },
    data() {
      return {
        wrapperRotateFlag: []
      };
    },
    computed: {
      renderValue() {
        return String(this.value).split('')
      },
      renderWidth() {
        return this.font.width || '40px'
      },
      renderHeight() {
        return this.font.height || '40px'
      },
      numbersConfig() {
        let arr = []
        for (let i = 0; i < 10; i++) {
            arr.push({
                label: i,
                rotateX: 360 / 10 * i
            })
        }
        return arr
      }
    },
    watch: {
      renderValue(v) {
        if (v.length > this.wrapperRotateFlag.length) {
            for (let i = this.wrapperRotateFlag.length; i < v.length; i++) {
                this.wrapperRotateFlag.push({
                    index: Number(v[i]),
                    rotate: 0
                })
            }
        }
      }
    },
    created() {
      this.init()
    },
    methods: {
      init() {
        this.wrapperRotateFlag = this.renderValue.map(t => ({
          index: +t,
          rotate: 0
        }))
      },
      rotateFlagUpdate(item, index) {
        let lastIndex = this.wrapperRotateFlag[index].index
        let lastRotate = this.wrapperRotateFlag[index].rotate
        let targeRotate;
        let abs
        let direct
        // 在一个循环中依据先后两数的大小，判断圆环旋转方向
        if (item >= lastIndex) {
            if (Math.abs(item - lastIndex) === Math.abs(lastIndex - item + 10)) {
                direct = true
                abs = Math.abs(item - lastIndex)
            } else if (Math.abs(item - lastIndex) < Math.abs(lastIndex - item + 10)) {
                direct = true
                abs = Math.abs(item - lastIndex)
            } else {
                direct = false
                abs = Math.abs(lastIndex - item + 10)
            }
        } else {
            if (Math.abs(item - lastIndex) === Math.abs(lastIndex - item + 10)) {
                direct = true
                abs = Math.abs(item - lastIndex)
            } else if (Math.abs(lastIndex - item) < Math.abs(item + 10 - lastIndex)) {
                direct = false
                abs = Math.abs(lastIndex - item)
            } else {
                direct = true
                abs = Math.abs(item + 10 - lastIndex)
            }
        }
        if (lastIndex === item) {
            if (lastRotate === 0) {
                targeRotate = item * (-36)
            } else {
                targeRotate = lastRotate
            }
        } else if (direct) {
            // 加
            targeRotate = lastRotate - abs * 36
        } else if (!direct) {
            // 减
            targeRotate = lastRotate + abs * 36
        }
        this.wrapperRotateFlag[index].index = item
        this.wrapperRotateFlag[index].rotate = targeRotate
        return targeRotate
      },
      inputChange(e) {
        if (!this.disableInput) {
          this.$emit('input', e.target.value)
        }
      }
    },
  };
</script>
