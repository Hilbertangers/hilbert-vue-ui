// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import hilbertVue from '@';
import * as utils from '@/utils';
import '@/styles/index.less';
import './index.less';
import 'view-design/dist/styles/iview.css';
import ViewUI from 'view-design';
Vue.use(ViewUI);

Vue.use(hilbertVue);
Vue.config.productionTip = false

Vue.prototype.$utils = utils;

/* eslint-disable no-new */
// 根组件
new Vue({
  el: '#app',
  router,
  render: h => h(App),
});
