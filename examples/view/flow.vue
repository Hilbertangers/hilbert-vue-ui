<style lang="less">
</style>

<template>
  <div>
    <Flow :value="value" :nodeMap="nodeMap" />
  </div>
</template>

<script>
  export default {
    name: 'flow-demo',
    components: { },
    data() {
      return {
        value: '1&2&(3|4)',
        nodeMap: [
          { value: '1', label: '执行条件1', status: true },
          { value: '2', label: '执行条件2', status: false },
          { value: '3', label: '执行条件3' },
          { value: '4', label: '执行条件4' },
        ]
      };
    },
  };
</script>
