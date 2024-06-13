<style lang="less">
</style>

<template>
  <div style="display: flex;">
    <div>
      <div>
        规格：specListStr:
        <BraceEditor
          v-model="specListStr"
          lang="javascript"
          theme="eclipse"
          disabled
          style="min-width: 300px;width:400px;min-height: 220px;"
        />
      </div>
      <div>
        规格组合：specCombinationList
        <BraceEditor
          v-model="specCombinationListStr"
          lang="javascript"
          theme="eclipse"
          disabled
          style="min-width: 300px;width:400px;min-height: 220px;"
        />
      </div>
    </div>
    <sku-choose
      :specList="specList"
      :specCombinationList="specCombinationList"
    />
  </div>
</template>

<script>
  import 'brace/mode/javascript';
  import 'brace/theme/eclipse';

  export default {
    name: 'sku-choose-demo',
    components: { },
    data() {
      return {
        specListStr: JSON.stringify([
          {title: "颜色", list: ["白色", "粉色"]},
          {title: "尺寸", list: ["1寸", "2寸"]},
          {title: "体重", list: ["G", "KG", "PG"]}
        ],null,2),
        specCombinationListStr: JSON.stringify([
          // {id: "1", specs: ["白色", "1寸", "G"]},
          {id: "2", specs: ["白色", "1寸", "KG"]},
          {id: "3", specs: ["白色", "1寸", "PG"]},
          {id: "4", specs: ["白色", "2寸", "G"]},
          // {id: "5", specs: ["白色", "2寸", "KG"]},
          // {id: "6", specs: ["白色", "2寸", "PG"]},
          // {id: "7", specs: ["粉色", "1寸", "G"]},
          {id: "8", specs: ["粉色", "1寸", "KG"]},
          {id: "9", specs: ["粉色", "1寸", "PG"]},
          {id: "10", specs: ["粉色", "2寸", "G"]},
          {id: "11", specs: ["粉色", "2寸", "KG"]},
          {id: "12", specs: ["粉色", "2寸", "PG"]},
        ], null, 2),
      };
    },
    computed: {
      specList() {
        try {
          return JSON.parse(this.specListStr)
        } catch (error) {
          console.log("🚀 ~ nodeMap ~ error:", error)
          return []
        }
      },
      specCombinationList() {
        try {
          return JSON.parse(this.specCombinationListStr)
        } catch (error) {
          console.log("🚀 ~ nodeMap ~ error:", error)
          return []
        }
      },
    }
  };
</script>
