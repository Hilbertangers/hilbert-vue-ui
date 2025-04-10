import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/flow'
    },
    {
      path: '/flow',
      name: 'flow',
      component: () => import('../view/flow'),
    },
    {
      path: '/brace-editor',
      name: 'brace-editor',
      component: () => import('../view/brace-editor'),
    },
    {
      path: '/sku-choose',
      name: 'sku-choose',
      component: () => import('../view/sku-choose'),
    },
    {
      path: '/number-roll',
      name: 'number-roll',
      component: () => import('../view/number-roll'),
    },
    {
      path: '/bulb-switch',
      name: 'bulb-switch',
      component: () => import('../view/bulb-switch'),
    },
    {
      path: '/multi-donut-chart',
      name: 'multi-donut-chart',
      component: () => import('../view/multi-donut-chart'),
    },
    {
      path: '/signature-pad',
      name: 'signature-pad',
      component: () => import('../view/signature-pad'),
    },
    {
      path: '/spotlight',
      name: 'spotlight',
      component: () => import('../view/spotlight'),
    },
    {
      path: '/pin-input',
      name: 'pin-input',
      component: () => import('../view/pin-input'),
    },
  ]
})
