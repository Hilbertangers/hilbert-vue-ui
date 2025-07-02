<template>
  <Size
    :isFont="false"
    :value="store.border"
    @onChange="onSizeChange"
  />
</template>

<script>
import ActionMixin from './action'
import Size from '../Size'

export default {
  name: 'mosaicVue',
  title: '马赛克',
  type: 'mosaic',
  icon: 'screenshots-icon-mosaic',

  mixins: [ActionMixin],

  components: {
    Size
  },


  data() {
    return {
      mosaic: null,
      tileWidth: 10,
      tileHeight: 10,
      tiles: [],
    }
  },

  computed: {
    EditPointersResize() {
      return {
        start: (x, y, x1, y1, x2, y2) => ({ x1: x, y1: y, x2, y2 }),
        end: (x, y, x1, y1, x2, y2) => ({ x1, y1, x2: x, y2: y })
      }
    }
  },

  created() {
    const { width, height } = this.store
    this.imageData = this.ctx.getImageData(0, 0, width, height).data
    this.tileColumnSize = Math.ceil(width / this.tileWidth)
    this.tileRowSize = Math.ceil(height / this.tileHeight)

    for (let i = 0; i < this.tileRowSize; i++) {
      for (let j = 0; j < this.tileColumnSize; j++) {
        const tile = {
          row: i,
          column: j,
          pixelWidth: this.tileWidth,
          pixelHeight: this.tileHeight
        }

        if (j === tile.column - 1) { // Last column
          tile.pixelWidth = width - (j * this.tileWidth)
        }

        if (i === tile.row - 1) { // Last row
          tile.pixelHeight = height - (i * this.tileHeight)
        }

        const data = []
        const pixelPosition = width * 4 * this.tileHeight * tile.row + tile.column * this.tileWidth * 4
        for (let i = 0, j = tile.pixelHeight; i < j; i++) {
          const position = pixelPosition + width * 4 * i
          data.push.apply(data, this.imageData.slice(position, position + tile.pixelWidth * 4))
        };
        tile.data = data

        this.tiles.push(tile)
      }
    }

    this.initAction()
  },

  methods: {
    draw(ctx, action) {
      const { tiles } = action
          tiles.forEach(tile => {
            if (!tile.color) {
              const dataLen = tile.data.length
              let r = 0; let g = 0; let b = 0; let a = 0
              for (let i = 0; i < dataLen; i += 4) {
                r += tile.data[i]
                g += tile.data[i + 1]
                b += tile.data[i + 2]
                a += tile.data[i + 3]
              }

              // Set tile color.
              const pixelLen = dataLen / 4
              tile.color = {
                r: parseInt(r / pixelLen, 10),
                g: parseInt(g / pixelLen, 10),
                b: parseInt(b / pixelLen, 10),
                a: parseInt(a / pixelLen, 10)
              }
            }

            const color = tile.color
            ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a / 255})`

            const x = tile.column * this.tileWidth
            const y = tile.row * this.tileHeight
            const w = tile.pixelWidth
            const h = tile.pixelHeight

            ctx.fillRect(x, y, w, h)
          })
    },

    mousedown(e, { el, ctx, context }) {
      const { border } = context

      this.mosaic = {
        type: 'mosaic',
        history: [
          {
            size: border,
            tiles: []
          }
        ],
        draw: this.draw,
        ready: true
      }
    },

    mousemove(e, { el, ctx, context }) {
      const { left, top } = el.getBoundingClientRect()
      const x = e.clientX - left
      const y = e.clientY - top

      if (this.mosaic) {
        // 开始move以后再推进栈
        if (this.mosaic.ready) {
          delete this.mosaic.ready
          this.mosaic.history[0].undoPriority = this.setUndoPriority(context)
          context.stack.push(this.mosaic)
        }

        const tiles = []
        const size = this.mosaic.history[0].size / 3
        let startRow = Math.max(0, Math.floor(y / this.tileHeight) - Math.floor(size / 2))
        const startColumn = Math.max(0, Math.floor(x / this.tileWidth) - Math.floor(size / 2))

        const endRow = Math.min(this.tileRowSize, startRow + size)
        const endColumn = Math.min(this.tileColumnSize, startColumn + size)

        // Get tiles.
        while (startRow < endRow) {
          let column = startColumn
          while (column < endColumn) {
            tiles.push(this.tiles[startRow * this.tileColumnSize + column])
            column += 1
          }
          startRow += 1
        }
        this.mosaic.history[0].tiles = this.mosaic.history[0].tiles.concat(tiles)
        this.setContext({ stack: [...context.stack] })
      }
    },

    mouseup(e, { el, ctx, context }) {
      if (this.mosaic) {
        this.mosaic = null
      }
    },

    onSizeChange(size) {
      this.setContext({ border: size })
    },
  }
}
</script>
