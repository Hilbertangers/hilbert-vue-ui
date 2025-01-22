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
        ]
      }
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
