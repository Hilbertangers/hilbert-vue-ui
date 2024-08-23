import Flow from './components/Flow';
import BraceEditor from './components/BraceEditor';
import SkuChoose from './components/SkuChoose';
import NumberRoll from './components/NumberRoll';

const components = {
  Flow,
  BraceEditor,
  SkuChoose,
  NumberRoll,
}

const install = function(Vue, opts = {}) {
  Object.keys(components).forEach(key => {
    Vue.component(key, components[key]);
  });
};

export default install
