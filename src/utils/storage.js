const storage = {
  /**
   * 获取（字符串）
   * @param key str
   * @return str
   */
  getStr(key) {
    return window.localStorage.getItem(key);
  },

  /**
   * 设置（字符串值）
   * @param key str
   * @param value str
   * @return undefined
   */
  setStr(key, value) {
    return window.localStorage.setItem(key, value);
  },

  /**
   * 获取对象
   * @param key string
   * @return obj
   */
  getObj(key) {
    return JSON.parse(window.localStorage.getItem(key)) || {};
  },

  /**
   * 设置对象
   * @param key str
   * @param value obj
   * @return undefined
   */
  setObj(key, value) {
    return window.localStorage.setItem(key, JSON.stringify(value));
  },

  /**
   * 获取数组
   * @param key string
   * @return arr
   */
  getArr(key) {
    return JSON.parse(window.localStorage.getItem(key)) || [];
  },

  /**
   * 设置数组
   * @param key str
   * @param value arr
   * @return undefined
   */
  setArr(key, value) {
    return window.localStorage.setItem(key, JSON.stringify(value));
  },

  /**
   * 删除
   * @param key str
   * @return undefined
   */
  remove(key) {
    return window.localStorage.removeItem(key);
  },
  /**
   * 获取（字符串）
   * @param key str
   * @return str
   */
  getStrFromSession(key) {
    return window.sessionStorage.getItem(key);
  },

  /**
   * 设置（字符串值）
   * @param key str
   * @param value str
   * @return undefined
   */
  setStrToSession(key, value) {
    return window.sessionStorage.setItem(key, value);
  },

  /**
   * 获取对象
   * @param key string
   * @return obj
   */
  getObjFromSession(key) {
    return JSON.parse(window.sessionStorage.getItem(key)) || {};
  },

  /**
   * 设置对象
   * @param key str
   * @param value obj
   * @return undefined
   */
  setObjFromSession(key, value) {
    return window.sessionStorage.setItem(key, JSON.stringify(value));
  },

  /**
   * 获取数组
   * @param key string
   * @return arr
   */
  getArrFromSession(key) {
    return JSON.parse(window.sessionStorage.getItem(key)) || [];
  },

  /**
   * 设置数组
   * @param key str
   * @param value arr
   * @return undefined
   */
  setArrToSession(key, value) {
    return window.sessionStorage.setItem(key, JSON.stringify(value));
  },

  /**
   * 删除
   * @param key str
   * @return undefined
   */
  removeSession(key) {
    return window.sessionStorage.removeItem(key);
  },
};

export { storage };
