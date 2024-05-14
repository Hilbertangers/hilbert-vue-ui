// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import hilbertVue from '../lib/hilbert-vue.min.js';
import * as utils from '../lib/utils.js';
import '../lib/styles/hilbert-vue.css';
import './index.less';

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
