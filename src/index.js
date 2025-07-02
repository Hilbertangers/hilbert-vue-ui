import Flow from './components/Flow';
import BraceEditor from './components/BraceEditor';
import SkuChoose from './components/SkuChoose';
import NumberRoll from './components/NumberRoll';
import BulbSwitch from './components/BulbSwitch';
import MultiDonutChart from './components/MultiDonutChart';
import SignaturePad from './components/SignaturePad';
import Spotlight from './components/Spotlight';
import PinInput from './components/PinInput';
import AngleSlider from './components/AngleSlider';
import Screenshots from './components/Screenshots';

const components = {
  Flow,
  BraceEditor,
  SkuChoose,
  NumberRoll,
  BulbSwitch,
  MultiDonutChart,
  SignaturePad,
  Spotlight,
  PinInput,
  AngleSlider,
  Screenshots
}

const install = function(Vue, opts = {}) {
  Object.keys(components).forEach(key => {
    Vue.component(key, components[key]);
  });
};

export default install
