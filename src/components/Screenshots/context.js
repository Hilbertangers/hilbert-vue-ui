import Vue from 'vue'
import Ok from './actions/ok'
import Undo from './actions/undo.js'
// import Save from './actions/save'
import Rect from './actions/rect'
import Brush from './actions/brush'
import Arrow from './actions/arrow'
import Cancel from './actions/cancel'
import Ellipse from './actions/ellipse'
import Text from './actions/text'
import Mosaic from './actions/mosaic'
const storeTmp = {
  image: null,
  viewer: null,
  width: 0,
  height: 0,
  action: null,
  actionRef: null,
  actions: [
    {
      key: Ellipse,
      value: {}
    },
    {
      key: Rect,
      value: {}
    },
    {
      key: Arrow,
      value: {}
    },
    {
      key: Brush,
      value: {}
    },
    {
      key: Mosaic,
      value: {}
    },
    {
      key: Text,
      value: {}
    },
    { type: 'divider' },
    {
      key: Undo,
      value: {}
    },
    // {
    //   key: Save,
    //   value: {}
    // },
    { type: 'divider' },
    {
      key: Cancel,
      value: {}
    },
    {
      key: Ok,
      value: {}
    }
  ],
  stack: [],
  border: 6,
  font: 23,
  color: '#ee5126',
  cursor: null,
  magnifyPoint: {},
  editPointers: [],
  // 添加 Promise 相关状态
  _resolveActionChange: null,
  _actionChangePromise: null
}
// 创建一个响应式的 store
export const store = Vue.observable(storeTmp)

// 为了只watch,store.key，创建提供给实例watch的对象
export const watchStoreTop = (callback) => {
  return Object.keys(storeTmp).reduce((acc, key) => {
    acc['store.' + key] = callback
    return acc
  }, {})
}

export async function getActionChangeRef (){
  if (!store._actionChangePromise) {
    store._actionChangePromise = new Promise(resolve => {
      store._resolveActionChange = resolve;
    });
  }
  return store._actionChangePromise;
}

// 添加触发函数
export function triggerActionChange(value) {
  if (store._resolveActionChange) {
    store._resolveActionChange(value);
    store._actionChangePromise = null;
    store._resolveActionChange = null;
  }
}

// 创建 mutations 方法
export const mutations = {
  initContext(context) {
    Object.keys(context).forEach(key => {
      Vue.set(store, key, context[key])
    })
  },
  setContext(context, callback) {
    if (typeof context === 'function') {
      const newState = context(store)
      Object.keys(newState).forEach(key => {
        if (key !== 'image' && key !== 'width' && key !== 'height') {
          Vue.set(store, key, newState[key])
        }
      })
      if (callback) {
        callback()
      }
    } else if (typeof context === 'object') {
      Object.keys(context).forEach(key => {
        if (key !== 'image' && key !== 'width' && key !== 'height') {
          Vue.set(store, key, context[key])
        }
      })
      if (callback) {
        callback()
      }
    }
  },
}
