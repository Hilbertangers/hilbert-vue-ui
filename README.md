# vue2.0组件库

### Demo
[Demo](https://hilbertangers.github.io/hilbert-vue-ui/#/flow)

### 安装

`$ npm i -S hilbert-vue-ui`

### 使用

```javascript
import hilbertVue from 'hilbert-vue-ui'
import 'hilbert-vue-ui/lib/styles/hilbert-vue.css';

Vue.use(hilbertVue);
```

##### 按需加载

1.手动引入

```javascript
import Flow from 'hilbert-vue-ui/lib/Flow'; // 加载 JS
import 'hilbert-vue-ui/lib/styles/Flow.css'; // 加载 CSS
```

2.使用`babel-plugin-component`

```javascript
// .babelrc or babel-loader option
{
  "plugins": [
    ['component', {
      'libraryName': 'hilbert-vue-ui',
      'libDir': 'lib',
      'camel2Dash': false,
      'styleLibrary': {
        'name': 'styles',
        'base': false,
        'path': '[module].css',
      },
    }],
  ]
}
```

然后只需引入模块即可，无需单独引入样式。等同于上面手动引入的方式。

```javascript
// babel-plugin-component 会帮助你加载 JS 和 CSS
import { Flow } from 'hilbert-vue-ui'

Vue.use(Flow);
```

### 资源

###### 组件

- `Flow` 与或逻辑图绘制器
  - [案例参考](https://github.com/Hilbertangers/hilbert-vue-ui/blob/main/examples/view/flow.vue)

- `SkuChoose` 商品多规格选择
  - [案例参考](https://github.com/Hilbertangers/hilbert-vue-ui/blob/main/examples/view/sku-choose.vue)


- `BraceEditor` 基于brace的代码编辑器封装
  - [案例参考](https://github.com/Hilbertangers/hilbert-vue-ui/blob/main/examples/view/brace-editor.vue)

- `number-roll` 数字滚动特效
  - [案例参考](https://github.com/Hilbertangers/hilbert-vue-ui/blob/main/examples/view/number-roll.vue)

- `bulb-switch` 灯泡开关
  - [案例参考](https://github.com/Hilbertangers/hilbert-vue-ui/blob/main/examples/view/bulb-switch.vue)

- `multi-donut-chart` 多级环图
  - [案例参考](https://github.com/Hilbertangers/hilbert-vue-ui/blob/main/examples/view/multi-donut-chart.vue)

- `signature-pad` 笔锋签字板
  - [案例参考](https://github.com/Hilbertangers/hilbert-vue-ui/blob/main/examples/view/signature-pad.vue)

- `spotlight` 全局搜索
  - [案例参考](https://github.com/Hilbertangers/hilbert-vue-ui/blob/main/examples/App.vue)

- `pin-input` 验证码输入
  - [案例参考](https://github.com/Hilbertangers/hilbert-vue-ui/blob/main/examples/view/pin-input.vue)
