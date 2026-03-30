<template>
  <span
    class="skeleton-container"
    :class="containerClassName"
    :aria-busy="enableAnimation"
  >
    <template v-for="(item, index) in skeletons">
      <span
        :key="index"
        class="skeleton"
        :class="[className, skeletonClass]"
        :style="item.style"
      >&#8203;</span>
      <br v-if="!inline && index < skeletons.length - 1" />
    </template>
  </span>
</template>

<script>
import '../../styles/Skeleton.less';

export default {
  name: 'Skeleton',
  props: {
    count: {
      type: Number,
      default: 1,
      validator: (value) => value > 0
    },
    baseColor: {
      type: String,
      default: '#ebebeb'
    },
    highlightColor: {
      type: String,
      default: '#f5f5f5'
    },
    width: {
      type: [String, Number],
      default: '100%'
    },
    height: {
      type: [String, Number],
      default: undefined
    },
    borderRadius: {
      type: [String, Number],
      default: '0.25rem'
    },
    circle: {
      type: Boolean,
      default: false
    },
    inline: {
      type: Boolean,
      default: false
    },
    duration: {
      type: Number,
      default: 1.5
    },
    direction: {
      type: String,
      default: 'ltr',
      validator: (value) => ['ltr', 'rtl'].includes(value)
    },
    enableAnimation: {
      type: Boolean,
      default: true
    },
    customHighlightBackground: {
      type: String,
      default: undefined
    },
    className: {
      type: String,
      default: ''
    },
    containerClassName: {
      type: String,
      default: ''
    }
  },
  computed: {
    skeletonClass() {
      return {
        'skeleton--disable-animation': !this.enableAnimation,
        'skeleton--rtl': this.direction === 'rtl'
      }
    },
    baseStyle() {
      const style = {}

      if (this.direction === 'rtl') {
        style['--animation-direction'] = 'reverse'
      }

      if (typeof this.duration === 'number') {
        style['--animation-duration'] = `${this.duration}s`
      }

      if (!this.enableAnimation) {
        style['--pseudo-element-display'] = 'none'
      }

      if (typeof this.width === 'string' || typeof this.width === 'number') {
        style.width = typeof this.width === 'number' ? `${this.width}px` : this.width
      }

      if (typeof this.height === 'string' || typeof this.height === 'number') {
        style.height = typeof this.height === 'number' ? `${this.height}px` : this.height
      }

      if (typeof this.borderRadius === 'string' || typeof this.borderRadius === 'number') {
        style.borderRadius = typeof this.borderRadius === 'number' ? `${this.borderRadius}px` : this.borderRadius
      }

      if (this.circle) {
        style.borderRadius = '50%'
      }

      if (this.baseColor) {
        style['--base-color'] = this.baseColor
      }

      if (this.highlightColor) {
        style['--highlight-color'] = this.highlightColor
      }

      if (this.customHighlightBackground) {
        style['--custom-highlight-background'] = this.customHighlightBackground
      }

      return style
    },
    skeletons() {
      const skeletons = []
      const countCeil = Math.ceil(this.count)

      for (let i = 0; i < countCeil; i++) {
        let style = { ...this.baseStyle }

        if (countCeil > this.count && i === countCeil - 1) {
          // Handle fractional count by adjusting the width of the last skeleton
          const fractionalPart = this.count % 1
          const currentWidth = style.width ?? '100%'

          const fractionalWidth =
            typeof currentWidth === 'number'
              ? currentWidth * fractionalPart
              : `calc(${currentWidth} * ${fractionalPart})`

          style.width = fractionalWidth
        }

        skeletons.push({ style })
      }

      return skeletons
    }
  }
}
</script>
