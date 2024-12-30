<template>
  <div id="app">
    <Tabs v-model="tab" @on-click="change">
      <TabPane
        v-for="item in components"
        :label="item"
        :name="item"></TabPane>
    </Tabs>
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        tab: '',
        components: [
          'flow',
          'brace-editor',
          'sku-choose',
          'number-roll',
          'bulb-switch',
          'multi-donut-chart',
          'signature-pad',
        ]
      }
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
