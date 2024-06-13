<template>
  <div id="app">
    <ul class="demo-menu">
      <li>
        <router-link to="/flow">/flow</router-link>
        <router-link to="/brace-editor">/brace-editor</router-link>
        <router-link to="/sku-choose">/sku-choose</router-link>
      </li>
    </ul>
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App',
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
