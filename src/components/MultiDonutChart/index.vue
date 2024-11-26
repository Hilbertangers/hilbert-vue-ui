<template>
  <div :class="className" :style="{height, width}" />
</template>

<script>
  import resize from './mixins/resize'
  import echarts from './echarts'

  export default {
    mixins: [resize],
    props: {
      className: {
        type: String,
        default: 'chart'
      },
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '300px'
      },
      chartParam: {
        type: Object,
        required: true
      },
      color: {
        type: Array,
        default: () => ['#0055FE', '#88DDFF', '#FF749D', '#FCDD69']
      }
    },
    data() {
      return {
        chart: null
      }
    },
    watch: {
      chartParam: {
        deep: true,
        handler(val) {
          this.setOptions(val)
        }
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.initChart()
      })
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      this.chart.dispose()
      this.chart = null
    },
    methods: {
      initChart() {
        this.chart = echarts.init(this.$el);
        this.setOptions(this.chartParam)
      },
      setOptions(option) {
        if (!this.chart) {
          return
        }
        this.chart.clear();
        this.chart.setOption({
          tooltip: {
            trigger: 'item',
            extraCssText: 'box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.15);border-radius: 4px;',
            formatter: '{b}: {c}, 占比{d}%',
            borderWidth: 0,
          },
          legend: {
            left: '10',
            bottom: '40',
            itemGap: 16,
            itemWidth: 16,
            itemHeight: 8,
            icon: 'rect',
            orient: 'vertical',
            formatter: function (key) {
              let obj = {}
              obj = option.data.find(el => el.name === key)
              if (obj) {
                return [
                  '{a|' + obj.name + ':' +'}',
                  '{b|' + obj.tips +'}',
                  `{c|共${obj.value}人}`
                ].join('')
              }
            },
            data: this.setLegendData(option.data),
            textStyle: {
              padding: [0, 0, 0],
              rich: {
                a: {
                  color: 'rgba(0,0,0,0.85)',
                  fontSize: 12,
                  fontWeight: 600,
                  width: 70,
                },
                b: {
                  color: 'rgba(0,0,0,0.85)',
                  fontSize: 12,
                  fontWeight: 400,
                  width: 180,
                  padding: [0, 0, 0, 20]
                },
                c: {
                  color: 'rgba(0,0,0,0.85)',
                  fontSize: 12,
                  fontWeight: 400
                },
              }
            },
          },
          series: this.setSeries(option.data),
        })
      },
      setLegendData(data) {
        return data
          .map((t, i) => {
            const { name, color } = t
            return {
              name,
              itemStyle: {
                color
              }
            }
          })
      },
      setSeries(data) {
        const common = {
          type: "pie",
          center: ["50%", "40%"],
          startAngle: -120,
          itemStyle: {
            borderRadius: 0,
          },
          selectedMode: 'series',
          selectedOffset: 1,
          label: {
            show: false
          },
        }
        const res = data
          // 排序来保证数据越大，圆弧宽度越大
          .toSorted((a, b) => b.value - a.value)
          .map((item, i, sortArr) => {
            const index = i + 1
            let dataSeries = sortArr.map((_t, _i) => {
              let {name, value, color} = _t
              return {
                name,
                value,
                itemStyle: {
                  color: (_i === i) ? color : 'rgba(0, 0, 0, 0)',
                },
                emphasis: {
                  disabled: true
                }
              }
            })

            return {
              ...common,
              radius: [50 + index * 3, 90 - index * 3],
              data: dataSeries
            }
          })
        return res
      }
    }
  }
</script>
