<script>
/**
 * Marquee
 * @desc 跑马灯组件，基于 react-fast-marquee 实现
 */
export default {
  name: 'Marquee',
  functional: false,
  props: {
    customStyle: { type: Object, default: () => ({}) },
    className: { type: String, default: '' },
    autoFill: { type: Boolean, default: false },
    play: { type: Boolean, default: true },
    pauseOnHover: { type: Boolean, default: false },
    pauseOnClick: { type: Boolean, default: false },
    direction: {
      type: String,
      default: 'left',
      validator: (v) => ['left', 'right'].includes(v),
    },
    speed: { type: Number, default: 50, validator: (v) => v > 0 },
    delay: { type: Number, default: 0, validator: (v) => v >= 0 },
    loop: { type: Number, default: 0, validator: (v) => v >= 0 },
    gradient: { type: Boolean, default: false },
    gradientColor: { type: String, default: 'white' },
    gradientWidth: { type: [Number, String], default: 200 },
    onFinish: { type: Function, default: null },
    onCycleComplete: { type: Function, default: null },
    onMount: { type: Function, default: null },
  },
  data() {
    return {
      containerWidth: 0,
      marqueeWidth: 0,
      multiplier: 1,
      isMounted: false,
      resizeObserver: null,
      styleKey: 0,
      isPausedByClick: false,
      isHovering: false,
    };
  },
  computed: {
    // 确保 duration 是一个稳定的值
    duration() {
      let totalWidth;
      if (this.autoFill) {
        totalWidth = this.marqueeWidth * this.multiplier;
      } else {
        // 如果内容宽度小于容器宽度，使用容器宽度；否则使用内容宽度
        totalWidth = this.marqueeWidth < this.containerWidth
          ? this.containerWidth
          : this.marqueeWidth;
      }
      const durationValue = totalWidth / this.speed;
      // 四舍五入到小数点后两位，避免浮点数精度问题
      return Math.round(durationValue * 100) / 100;
    },
    containerStyle() {
      return this.customStyle || {};
    },
    gradientStyle() {
      const gradientWidthStr =
        typeof this.gradientWidth === 'number'
          ? `${this.gradientWidth}px`
          : this.gradientWidth;
      return {
        '--gradient-color': this.gradientColor,
        '--gradient-width': gradientWidthStr,
      };
    },
    marqueeStyle() {
      const direction = this.direction === 'left' ? 'normal' : 'reverse';
      const minWidth = this.autoFill ? 'auto' : '100%';

      // 计算最终的播放状态
      let animationPlayState = 'running';
      if (!this.play) {
        animationPlayState = 'paused';
      } else if (this.pauseOnClick && this.isPausedByClick) {
        animationPlayState = 'paused';  // 点击暂停
      } else if (this.pauseOnHover && this.isHovering) {
        animationPlayState = 'paused';  // 鼠标悬停暂停
      }

      return {
        'animation-play-state': animationPlayState,
        '--direction': direction,
        '--duration': `${this.duration}s`,
        '--delay': `${this.delay}s`,
        '--iteration-count': !!this.loop ? `${this.loop}` : 'infinite',
        '--min-width': minWidth,
        key: this.styleKey, // 强制更新
      };
    },
  },
  mounted() {
    this.isMounted = true;
    this.$nextTick(() => {
      this.initResizeObserver();
      this.calculateWidth();
      this.styleKey++;
      if (typeof this.onMount === 'function') {
        this.onMount();
      }
    });
  },
  beforeDestroy() {
    this.cleanup();
  },
  watch: {
    autoFill() {
      this.$nextTick(() => {
        this.calculateWidth();
        this.styleKey++;
      });
    },
    direction() {
      this.$nextTick(() => {
        this.calculateWidth();
        this.styleKey++;
      });
    },
    speed() {
      this.styleKey++;
    },
    // 监听宽度变化，确保动画同步
    marqueeWidth() {
      this.styleKey++;
    },
    multiplier() {
      this.styleKey++;
    },
  },
  methods: {
    initResizeObserver() {
      if (typeof ResizeObserver !== 'undefined') {
        this.resizeObserver = new ResizeObserver(() => {
          this.calculateWidth();
        });

        if (this.$refs.container) {
          this.resizeObserver.observe(this.$refs.container);
        }
        if (this.$refs.marquee) {
          this.resizeObserver.observe(this.$refs.marquee);
        }
      }
    },
    calculateWidth() {
      if (this.$refs.marquee && this.$refs.container) {
        const containerRect = this.$refs.container.getBoundingClientRect();
        const marqueeRect = this.$refs.marquee.getBoundingClientRect();

        let containerWidth = containerRect.width;
        let marqueeWidth = marqueeRect.width;

        if (this.autoFill && containerWidth && marqueeWidth) {
          const newMultiplier =
            marqueeWidth < containerWidth
              ? Math.ceil(containerWidth / marqueeWidth)
              : 1;
          if (newMultiplier !== this.multiplier) {
            this.multiplier = newMultiplier;
          }
        } else {
          this.multiplier = 1;
        }

        this.containerWidth = containerWidth;
        this.marqueeWidth = marqueeWidth;
      }
    },
    handleCycleComplete(event) {
      if (typeof this.onCycleComplete === 'function') {
        this.onCycleComplete(event);
      }
    },
    handleFinish(event) {
      if (typeof this.onFinish === 'function') {
        this.onFinish(event);
      }
    },
    handleClick() {
      if (this.pauseOnClick) {
        this.isPausedByClick = !this.isPausedByClick;
      }
    },
    handleMouseEnter() {
      this.isHovering = true;
    },
    handleMouseLeave() {
      this.isHovering = false;
    },
    cleanup() {
      if (this.resizeObserver) {
        this.resizeObserver.disconnect();
        this.resizeObserver = null;
      }
    },
  },
  render(h) {
    if (!this.isMounted) return null;

    const children = this.$slots.default || [];
    if (children.length === 0) return null;

    const containerChildren = [];

    // 渐变遮罩
    if (this.gradient) {
      containerChildren.push(
        h('div', {
          style: this.gradientStyle,
          class: 'h-marquee-overlay',
        })
      );
    }

    // 创建包装子元素的函数
    const wrapChild = (child, key) => {
      return h(
        'div',
        {
          key,
          class: 'h-marquee-child',
        },
        [child]
      );
    };

    // 第一个 marquee: 原始内容
    const firstMarqueeChildren = [];
    
    // 初始容器
    const initialWrappedChildren = children.map((child, index) => {
      return wrapChild(child, `initial-${index}`);
    });
    firstMarqueeChildren.push(
      h('div', {
        ref: 'marquee',
        class: 'h-marquee-initial-child-container',
      }, initialWrappedChildren)
    );

    // 复制的内容 (multiplier - 1)
    for (let i = 0; i < this.multiplier - 1; i++) {
      children.forEach((child, index) => {
        firstMarqueeChildren.push(wrapChild(child, `first-${i}-${index}`));
      });
    }

    const firstMarquee = h(
      'div',
      {
        style: this.marqueeStyle,
        class: 'h-marquee',
        on: {
          animationiteration: this.handleCycleComplete,
          animationend: this.handleFinish,
        },
      },
      firstMarqueeChildren
    );
    containerChildren.push(firstMarquee);

    // 第二个 marquee: multiplier 个复制
    const secondMarqueeChildren = [];
    for (let i = 0; i < this.multiplier; i++) {
      children.forEach((child, index) => {
        secondMarqueeChildren.push(wrapChild(child, `second-${i}-${index}`));
      });
    }

    const secondMarquee = h(
      'div',
      {
        style: this.marqueeStyle,
        class: 'h-marquee',
      },
      secondMarqueeChildren
    );
    containerChildren.push(secondMarquee);

    return h(
      'div',
      {
        ref: 'container',
        style: this.containerStyle,
        class: ['h-marquee-container', this.className],
        on: {
          click: this.handleClick,
          mouseenter: this.handleMouseEnter,
          mouseleave: this.handleMouseLeave,
        },
      },
      containerChildren
    );
  },
};
</script>
