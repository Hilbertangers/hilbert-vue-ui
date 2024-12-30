<template>
  <div class="signature-pad-wrapper">
    <canvas
      ref="backgroundCanvas"
      class="background-canvas"
    ></canvas>
    <canvas
      ref="signaturePad"
      class="signature-pad"
      @mousedown="startDrawing"
      @mousemove="draw"
      @mouseup="stopDrawing"
      @mouseleave="stopDrawing"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
    ></canvas>
    <div class="signature-actions">
      <button @click="clear">清除</button>
      <button @click="save">保存</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'signature-pad',
  props: {
    // 添加背景配置属性
    background: {
      type: Object,
      default: () => ({
        type: 'line', // 'line' | 'grid' | 'image'
        color: '#e5e5e5',
        lineHeight: 40,
        gridSize: 40,
        imageSrc: '',
        opacity: 0.2 // 背景透明度
      })
    }
  },
  data() {
    return {
      isDrawing: false,
      ctx: null,
      lastX: 0,
      lastY: 0,
      lastTime: 0,
      lastWidth: 0,
      maxWidth: 4,
      minWidth: 0.5,
      velocity: 0,
      // 添加点集合用于存储路径
      points: [],
      // 添加requestAnimationFrame的ID
      animationFrameId: null,
      clickStartTime: 0,  // 添加点击开始时间
      clickThreshold: 200,  // 点击判定阈值（毫秒）
      pointSize: 3,  // 圆点大小（半径）
      bgCtx: null,
    }
  },
  mounted() {
    // 初始化背景 canvas
    const bgCanvas = this.$refs.backgroundCanvas
    this.bgCtx = bgCanvas.getContext('2d')

    // 初始化签名 canvas
    const canvas = this.$refs.signaturePad
    this.ctx = canvas.getContext('2d', {
      desynchronized: true
    })

    // 设置画布大小
    const dpr = window.devicePixelRatio || 1
    const width = canvas.offsetWidth
    const height = canvas.offsetHeight

    // 设置背景 canvas 大小
    bgCanvas.width = width * dpr
    bgCanvas.height = height * dpr
    bgCanvas.style.width = width + 'px'
    bgCanvas.style.height = height + 'px'
    this.bgCtx.scale(dpr, dpr)

    // 设置签名 canvas 大小
    canvas.width = width * dpr
    canvas.height = height * dpr
    canvas.style.width = width + 'px'
    canvas.style.height = height + 'px'
    this.ctx.scale(dpr, dpr)

    // 初始化签名 canvas
    this.ctx.strokeStyle = '#000'
    this.ctx.lineJoin = 'round'
    this.ctx.lineCap = 'round'
    this.ctx.miterLimit = 1

    // 绘制背景
    this.drawBackground()
  },
  methods: {
    // 计算笔画宽度
    calculateLineWidth(velocity) {
      // 根据速度计算线条宽度
      const width = Math.max(this.maxWidth / (velocity + 1), this.minWidth)
      // 平滑过渡
      this.lastWidth = this.lastWidth ? (width + this.lastWidth) / 2 : width
      return this.lastWidth
    },
    // 计算速度
    calculateVelocity(x, y, time) {
      if (this.lastTime) {
        const dx = x - this.lastX
        const dy = y - this.lastY
        const dt = time - this.lastTime
        return Math.sqrt(dx * dx + dy * dy) / dt
      }
      return 0
    },
    startDrawing(event) {
      event.preventDefault()
      this.isDrawing = true
      const { offsetX, offsetY } = event
      this.lastX = offsetX
      this.lastY = offsetY
      this.lastTime = Date.now()
      this.clickStartTime = Date.now()  // 记录点击开始时间
      this.lastWidth = 0
      this.points = [[offsetX, offsetY]]

      this.animateDrawing()
    },

    draw(event) {
      event.preventDefault()
      if (!this.isDrawing) return

      const { offsetX, offsetY } = event
      // 只存储点位置
      this.points.push([offsetX, offsetY])
    },

        // 新增动画方法
        animateDrawing() {
      if (!this.isDrawing) return

      if (this.points.length > 1) {
        const currentPoint = this.points[this.points.length - 1]
        const prevPoint = this.points[this.points.length - 2]

        const currentTime = Date.now()
        this.velocity = this.calculateVelocity(currentPoint[0], currentPoint[1], currentTime)
        const lineWidth = this.calculateLineWidth(this.velocity)

        this.ctx.beginPath()
        this.ctx.lineWidth = lineWidth

        if (this.points.length === 2) {
          this.ctx.moveTo(prevPoint[0], prevPoint[1])
          this.ctx.lineTo(currentPoint[0], currentPoint[1])
        } else {
          const beforePrevPoint = this.points[this.points.length - 3]
          const ctrl = this.getControlPoint(beforePrevPoint, prevPoint, currentPoint)
          this.ctx.moveTo(beforePrevPoint[0], beforePrevPoint[1])
          this.ctx.quadraticCurveTo(ctrl.x, ctrl.y, currentPoint[0], currentPoint[1])
        }

        this.ctx.stroke()

        // 只保留最后三个点
        if (this.points.length > 3) {
          this.points = this.points.slice(-3)
        }

        this.lastX = currentPoint[0]
        this.lastY = currentPoint[1]
        this.lastTime = currentTime
      }

      this.animationFrameId = requestAnimationFrame(() => this.animateDrawing())
    },

    // 获取控制点
    getControlPoint(p0, p1, p2) {
      const x = p1[0]
      const y = p1[1]
      return { x, y }
    },

    handleTouchStart(event) {
      event.preventDefault()
      const touch = event.touches[0]
      const rect = this.$refs.signaturePad.getBoundingClientRect()
      const x = touch.clientX - rect.left
      const y = touch.clientY - rect.top

      this.lastX = x
      this.lastY = y
      this.lastTime = Date.now()
      this.clickStartTime = Date.now()  // 记录点击开始时间
      this.lastWidth = 0
      this.isDrawing = true
      this.points = [[x, y]]

      this.animateDrawing()
    },

    handleTouchMove(event) {
      event.preventDefault()
      if (!this.isDrawing) return

      const touch = event.touches[0]
      const rect = this.$refs.signaturePad.getBoundingClientRect()
      const x = touch.clientX - rect.left
      const y = touch.clientY - rect.top

      this.points.push([x, y])
    },

    stopDrawing() {
      if (!this.isDrawing) return

      // 检查是否是快速点击
      const clickDuration = Date.now() - this.clickStartTime
      if (clickDuration < this.clickThreshold && this.points.length <= 1) {
        this.drawPoint(this.lastX, this.lastY)
      }

      this.isDrawing = false
      this.points = []
      if (this.animationFrameId) {
        cancelAnimationFrame(this.animationFrameId)
      }
    },

    // 添加绘制圆点的方法
    drawPoint(x, y) {
      const radius = this.pointSize

      // 保存当前的绘图状态
      this.ctx.save()

      // 设置绘制属性
      this.ctx.fillStyle = this.ctx.strokeStyle // 使用与线条相同的颜色

      // 绘制实心圆
      this.ctx.beginPath()
      this.ctx.arc(x, y, radius, 0, Math.PI * 2, true)
      this.ctx.fill()

      // 恢复绘图状态
      this.ctx.restore()
    },

    drawBackground() {
      const { type, color, lineHeight, gridSize, imageSrc, opacity } = this.background
      const canvas = this.$refs.backgroundCanvas
      const ctx = this.bgCtx

      // 清除旧背景
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // 设置透明度
      ctx.globalAlpha = opacity

      switch(type) {
        case 'line':
          this.drawLineBackground(ctx, color, lineHeight)
          break
        case 'grid':
          this.drawGridBackground(ctx, color, gridSize)
          break
        case 'image':
          this.drawImageBackground(ctx, imageSrc)
          break
      }

      // 重置透明度
      ctx.globalAlpha = 1
    },

    drawLineBackground(ctx, color, lineHeight) {
      const canvas = this.$refs.backgroundCanvas
      ctx.strokeStyle = color
      ctx.lineWidth = 1

      ctx.beginPath()
      for (let y = lineHeight; y < canvas.height; y += lineHeight) {
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
      }
      ctx.stroke()
    },

    drawGridBackground(ctx, color, gridSize) {
      const canvas = this.$refs.backgroundCanvas
      ctx.strokeStyle = color
      ctx.lineWidth = 1

      // 绘制横线
      ctx.beginPath()
      for (let y = gridSize; y < canvas.height; y += gridSize) {
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
      }

      // 绘制竖线
      for (let x = gridSize; x < canvas.width; x += gridSize) {
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
      }
      ctx.stroke()
    },

    async drawImageBackground(ctx, imageSrc) {
      if (!imageSrc) return

      try {
        const image = await this.loadImage(imageSrc)
        const canvas = this.$refs.backgroundCanvas
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
      } catch (error) {
        console.error('Failed to load background image:', error)
      }
    },

    loadImage(src) {
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = () => resolve(img)
        img.onerror = reject
        img.src = src
      })
    },

    clear() {
      const canvas = this.$refs.signaturePad
      this.ctx.clearRect(0, 0, canvas.width, canvas.height)
    },

    save() {
      const canvas = this.$refs.signaturePad
      const dataUrl = canvas.toDataURL('image/png')
      this.$emit('save', dataUrl)
    },
    handleTouchEnd(event) {
      event.preventDefault()

      // 检查是否是快速点击
      const clickDuration = Date.now() - this.clickStartTime
      if (clickDuration < this.clickThreshold && this.points.length <= 1) {
        this.drawPoint(this.lastX, this.lastY)
      }

      this.stopDrawing()
    }
  },
  beforeDestroy() {
    // 清理动画
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId)
    }
  }
}
</script>
