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
      name: 'Flow',
      component: () => import('../view/flow'),
    },
    {
      path: '/brace-editor',
      name: 'BraceEditor',
      component: () => import('../view/brace-editor'),
    },
    {
      path: '/sku-choose',
      name: 'SkuChoose',
      component: () => import('../view/sku-choose'),
    },
    {
      path: '/number-roll',
      name: 'NumberRoll',
      component: () => import('../view/number-roll'),
    },
    {
      path: '/bulb-switch',
      name: 'BulbSwitch',
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
  ]
})
