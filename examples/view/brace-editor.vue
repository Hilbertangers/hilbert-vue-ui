<style lang="less">
</style>

<template>
  <div>
    <BraceEditor v-model="code" lang="javascript" theme="eclipse" />
  </div>
</template>

<script>
  import 'brace/mode/javascript';
  import 'brace/theme/eclipse';
  export default {
    name: 'brace-editor-demo',
    components: { },
    data() {
      return {
        code: JSON.stringify([
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
  };
</script>
