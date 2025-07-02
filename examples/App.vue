<template>
  <div id="app">
    <SpotlightSearch></SpotlightSearch>
    <Tabs v-model="tab" @on-click="change">
      <TabPane
        v-for="item in componentsInfos"
        :label="item.title"
        :name="item.id"></TabPane>
    </Tabs>
    <spotlight ref="spotlight" :actions="componentsInfos" />
    <router-view/>
  </div>
</template>

<script>
  import Vue from 'vue'
  import SpotlightSearch from './view/spotlight.vue'

  export default {
    name: 'App',
    components: {SpotlightSearch},
    data() {
      return {
        tab: '',
        componentsInfos: [
          {
            id: 'flow',
            title: '与或逻辑图绘制器',
            description: 'flow, 一个通过canvas绘制与或流程图的组件，支持与逻辑，或逻辑，括号逻辑和节点设置',
            onTrigger: () => {
              this.$router.push('/flow')
            }
          },
          {
            id: 'sku-choose',
            title: '商品多规格选择组件',
            description: 'sku-choose, 一个使用加权图实现的商品多规格选择组件',
            onTrigger: () => {
              this.$router.push('/sku-choose')
            }
          },
          {
            id: 'brace-editor',
            title: '代码编辑器',
            description: 'brace-editor, 基于brace的代码编辑器封装',
            onTrigger: () => {
              this.$router.push('/brace-editor')
            }
          },
          {
            id: 'number-roll',
            title: '数字滚动',
            description: 'number-roll, 一个使用css perspective实现的数字滚动可视化组件',
            onTrigger: () => {
              this.$router.push('/number-roll')
            }
          },
          {
            id: 'bulb-switch',
            title: '灯泡开关',
            description: 'bulb-switch, 一个纯css实现的灯泡开关组件，可以应用项目暗黑模式的开关',
            onTrigger: () => {
              this.$router.push('/bulb-switch')
            }
          },
          {
            id: 'multi-donut-chart',
            title: '多层级环图',
            description: 'multi-donut-chart, 基于echarts实现的多层级环图，会根据数据量排序递减环宽度',
            onTrigger: () => {
              this.$router.push('/multi-donut-chart')
            }
          },
          {
            id: 'signature-pad',
            title: '笔锋签字板',
            description: 'signature-pad, 一个基于 Canvas 的手写签名组件，支持鼠标和触摸屏手写签名，具有笔锋效果（根据书写速度变化线条粗细）',
            onTrigger: () => {
              this.$router.push('/signature-pad')
            }
          },
          {
            id: 'spotlight',
            title: '全局搜索',
            description: 'spotlight, 一个基于Fuse.js的全局搜索组件，支持中英文模糊搜索、支持高亮、支持背景毛玻璃',
            onTrigger: () => {
              this.$router.push('/spotlight')
            }
          },
          {
            id: 'pin-input',
            title: 'PIN输入',
            description: 'pin-input, 一个验证码输入组件，支持数字、字母、密码、移动端输入，支持自动聚焦，粘贴，回退等功能',
            onTrigger: () => {
              this.$router.push('/pin-input')
            }
            },
            {
              id: 'angle-slider',
              title: '角度选择器',
              description: 'angle-slider, 一个角度选择器组件，支持点击拖拽设置角度值，支持指标器、环形进度条、刻度线等功能，并能由用户自定义样式',
              onTrigger: () => {
                this.$router.push('/angle-slider')
              }
            },
            {
              id: 'screenshot',
              title: '截图工具',
              description: 'screenshot, 一个界面截图组件，支持web、electron端使用，操作模式参照企业微信截图，支持各类路径的拖拽和编辑，支持放大镜、取色器、马赛克、文字绘制编辑等小组件，且所有操作均可回退，保存后会返回base64图片数据',
              onTrigger: () => {
                this.$router.push('/screenshot')
              }
            }
        ]
      }
    },
    watch: {
      $route: {
        immediate: true, // 一旦监听到路由的变化立即执行
        handler(to, from) {
          if (to.name) {
            this.tab = to.name
          }
        },
      },
    },
    mounted() {
      Vue.prototype.$spotlight = this.$refs.spotlight
    },
    methods: {
      change(name) {
        this.$router.push(`/${name}`)
      }
    }
  }
</script>

<style lang="less">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    padding: 20px;
    .demo-menu{
      text-align: left;
      margin-bottom: 20px;
      li{
        display: inline-block;
      }
    }
  }
</style>
