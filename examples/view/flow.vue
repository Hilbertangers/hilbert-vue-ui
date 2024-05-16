<style lang="less">
</style>

<template>
  <div>
    <input type="text" :value="value" >
    <Flow :value="value" :nodeMap="nodeMap" />
  </div>
</template>

<script>
  export default {
    name: 'flow-demo',
    components: { },
    data() {
      return {
        value: '1&2&(3|(4|5)) & 6 & 7',
        nodeMap: [
          { value: '1', label: '进入收银台', status: true },
          { value: '2', label: '输入金额', status: false },
          { value: '3', label: '不验券' },
          { value: '4', label: '验美团券' },
          { value: '5', label: '验抖音券' },
          { value: '6', label: '支付' },
          { value: '7', label: '订单完成', status: true },
        ]
      };
    },
  };
</script>
