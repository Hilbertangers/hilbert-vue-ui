import Flow from './components/Flow';
import BraceEditor from './components/BraceEditor';
import SkuChoose from './components/SkuChoose';

const components = {
  Flow,
  BraceEditor,
  SkuChoose,
}

const install = function(Vue, opts = {}) {
  Object.keys(components).forEach(key => {
    Vue.component(key, components[key]);
  });
};

export default install
