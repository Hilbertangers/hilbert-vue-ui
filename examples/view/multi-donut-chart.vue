<style lang="less">
</style>

<template>
  <div style="display: flex;">
    <multi-donut-chart
      :chartParam="chartParam"
      width="500px"
      height="500px"
      v-if="chartParam"
    ></multi-donut-chart>
  </div>
</template>

<script>
  export default {
    name: 'multi-donut-chart-demo',
    data() {
      return {
        chartParam: null,
      };
    },
    mounted() {
      this.$nextTick(() => {
              this.chartParam = {
                data: [
                  // color需要指定（做了排序，不指定颜色就乱了）
                  {
                    name: '高消费会员',
                    color: '#0055FE',
                    tips: '单均金额>25.8/单',
                    value: 300,
                  },
                  {
                    name: '中高消费会员',
                    color: '#88DDFF',
                    tips: '21.5元/单<单均金额<25.8元/单',
                    value: 200,
                  },
                  {
                    name: '中消费会员',
                    color: '#FF749D',
                    tips: '17.2元/单<单均金额<21.5元/单',
                    value: 100,
                  },
                  {
                    name: '低消费会员',
                    color: '#FCDD69',
                    tips: '单均金额<17.2元/单',
                    value: 50,
                  },
                ]
              }
      })
    }
  };
</script>
