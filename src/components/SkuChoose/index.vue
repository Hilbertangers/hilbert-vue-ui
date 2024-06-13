<template>
  <div class="sku-choose">
    <div
      v-for="(spec,index) in specList"
      :key="index"
    >
      <p class="sku-choose-title">{{spec.title}}</p>

      <div class="sku-choose-spec">
        <span
          v-for="(value,_index) in spec.list"
          :class="{
            'sku-choose-spec-option': isOption(value),
            'sku-choose-spec-active': isActive(value),
            'sku-choose-spec-disabled': !isOption(value),
          }"
          :key="_index"
          @click="() => handleChoose(isOption(value), value, index)"
        >{{ value }}</span>
      </div>
    </div>
  </div>
</template>

<script>
  /**
  * sku-choose
  * @desc 商品多规格选择组件--加权图实现
  * @example 调用示例
  *   <sku-choose
  *      :specList="specList"
  *     :specCombinationList="specCombinationList"
  *    />
  **/

  import SpecAdjoinMatrix from './spec-adjoin-martix'
  export default {
    name: 'SkuChoose',
    props: {
      specList: {
        type: Array,
        default: () => ([])
      },
      specCombinationList: {
        type: Array,
        default: () => ([])
      },
    },
    data() {
      return {
        specsS: []
      };
    },
    computed: {
      specAdjoinMatrix() {
        console.log('change')
        return new SpecAdjoinMatrix(this.specList, this.specCombinationList)
      },
      optionSpecs() {
        return this.specAdjoinMatrix.getSpecscOptions(this.specsS)
      }
    },
    mounted() {
    },
    methods: {
      handleChoose(bool, text, index) {
        // 排除可选规格里面没有的规格
        if (this.specsS[index] !== text && !bool) return;
        // 根据text判断是否已经被选中了
        this.specsS[index] = this.specsS[index] === text ? "" : text;
        this.specsS = this.specsS.slice()
      },
      isOption(v) {
         // 当前规格是否可选
        return this.optionSpecs.includes(v)
      },
      isActive(v) {
        // 当前规格是否被选
        return this.specsS.includes(v);
      }
    },
  };
</script>
