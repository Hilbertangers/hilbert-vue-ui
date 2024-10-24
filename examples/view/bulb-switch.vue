
<style lang="less">
.BulbSwitchWrapper {
    width: 500px;
    height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #514878;
}
</style>
<template>
  <div class="BulbSwitchWrapper">
    <bulb-switch :width="200" v-model="light"></bulb-switch>
  </div>
</template>

<script>

  export default {
    name: 'bulb-switch-demo',
    components: { },
    data() {
      return {
        light: false
      };
    },
    watch: {
      light(v) {
      console.log("🚀 ~ light ~ v:", v)
      }
    },
    computed: {
    }
  };
</script>
