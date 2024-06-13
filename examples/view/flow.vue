<style lang="less">
</style>

<template>
  <div>
    <BraceEditor
      v-model="value"
      lang="javascript"
      theme="eclipse"
      style="min-width: 300px;width:400px;min-height: 50px;margin-bottom: 20px;"
    />

    <BraceEditor
      v-model="nodeMapStr"
      lang="javascript"
      theme="eclipse"
      style="min-width: 300px;width:400px;min-height: 200px;"
    />

    <Flow :value="value" :nodeMap="nodeMap" />
  </div>
</template>

<script>
  import 'brace/mode/javascript';
  import 'brace/theme/eclipse';

  export default {
    name: 'flow-demo',
    components: { },
    data() {
      return {
        value: '1&2&(3|(4|5)) & 6 & 7',
        nodeMapStr: JSON.stringify([
          { value: '1', label: '进入收银台', status: true },
          { value: '2', label: '输入金额', status: false },
          { value: '3', label: '不验券' },
          { value: '4', label: '验美团券' },
          { value: '5', label: '验抖音券' },
          { value: '6', label: '支付' },
          { value: '7', label: '订单完成', status: true },
        ], null, 2),
      };
    },
    computed: {
      nodeMap() {
        try {
          return JSON.parse(this.nodeMapStr)
        } catch (error) {
          console.log("🚀 ~ nodeMap ~ error:", error)
          return []
        }
      }
    }
  };
</script>
