export default class Cancel {
  static title = '取消'

  static type = 'cancel'

  static icon = 'screenshots-icon-cancel'

  constructor ({ el, context, setContext, emit }) {
    emit('onCancel')
    setContext({
      viewer: null,
      action: null,
      stack: [],
      state: {},
      cursor: null
    })
  }
}
