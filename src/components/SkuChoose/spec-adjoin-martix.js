import AdjoinMatrix from "./adjoin-martix";

// export type AdjoinType = Array<string>;

// export type CommoditySpecsType = {
//   title: string;
//   list: Array<string>;
// };

// export type SpecCategoryType = {
//   id: string;
//   specs: Array<string>;
// };

export default class SpecAdjoinMatrix extends AdjoinMatrix {
  // specList: Array<CommoditySpecsType>;
  // specCombinationList: Array<SpecCategoryType>;

  // specList: Array<CommoditySpecsType>, specCombinationList: Array<SpecCategoryType>
  constructor(specList, specCombinationList) {
    // total: AdjoinType
    super(specList.reduce((total, current) => [...total, ...current.list], []));
    this.specList = specList;
    this.specCombinationList = specCombinationList;
    // 根据可选规格列表矩阵创建
    this.initSpec();
    // 同级顶点创建
    this.initSameLevel();
  }

  /**
   * 根据可选规格组合填写邻接矩阵的值
   */
  initSpec() {
    this.specCombinationList.forEach((item, index) => {
      this.fillInSpec(item.specs, index + 2); // 0用于互不相连，1用于同级，权级就从2开始
    });
  }
  // 填写同级点
  initSameLevel() {
    // 获得初始所有可选项
    const specsOption = this.getCollection(this.vertex);
    this.specList.forEach((item) => {
      // params: AdjoinType
      const params = [];
      // 获取同级别顶点
      item.list.forEach((value) => {
        if (specsOption.includes(value)) params.push(value);
      });
      // 同级点位创建
      this.fillInSpec(params, 1);
    });
  }
  /*
   * @params
   * 传入顶点数组，查询出可选规格
   * params: AdjoinType
   */
  getSpecscOptions(params) {
    let specOptionCanchoose = []; // AdjoinType[]
    if (params.some(Boolean)) {
      // 获取可选项（交集）
      specOptionCanchoose = this.getUnions(params.filter(Boolean));
    } else {
      // 所有可选项
      specOptionCanchoose = this.getCollection(this.vertex);
    }
    return specOptionCanchoose;
  }

  /*
   * @params
   * 填写邻接矩阵的值
   * params: AdjoinType, weight: number
   */
  fillInSpec(params, weight) {
    params.forEach((param) => {
      this.setAdjoinVertexs(param, params, weight);
    });
  }
}
