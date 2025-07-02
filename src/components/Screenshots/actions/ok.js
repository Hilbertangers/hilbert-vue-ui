export default class Ok {
  static title = '确定'

  static type = 'ok'

  static icon = 'screenshots-icon-ok'

  constructor ({ el, context, setContext, emit }) {
    emit('onOk', {
      viewer: { ...context.viewer },
      dataURL: el.toDataURL('image/png')
    })
    setContext({
      viewer: null,
      action: null,
      stack: [],
      state: {},
      cursor: null
    })
  }
}
