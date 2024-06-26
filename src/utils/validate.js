const valid = {}

// 允许中文、数字、大小写英文；
// 字数限制最长30字
valid.text = (text,
  {
    maxLen = 30,
    // 传即为验证这个类型， 默认不验证，可以将错误信息赋值一起传进来
    chinese = false,
    number = false,
    english = false,
  }) => {
  // eslint-disable-next-line
  const EngLishChar = 'A-Za-z';
  const ChineseChar = '\u4e00-\u9fa5';
  const NumberChar = '0-9';
  let regStr = '';
  let regError = '只允许输入';

  if (text === undefined || text === null || text === '') {
    return '不能为空';
  }

  if (text.length >  maxLen) {
    return `字数不能超过${maxLen}`;
  }

  if (chinese !== false) {
    regStr += ChineseChar;
    regError += (`${chinese || '中文'}、`);
  }
  if (number !== false) {
    regStr += NumberChar;
    regError += (`${number || '数字'}、`);
  }
  if (english !== false) {
    regStr += EngLishChar;
    regError += (`${english || '大小写英文'}、`);
  }
  if (regStr) {
    let reg = new RegExp(`[^${regStr}]`);
    if (reg.test(text)) {
      return regError.slice(0, -1);
    }
  }
}

// 验证姓名
// 只允许填写中文或符号【·】；最长12个字
valid.peopleName = (text) => {
  if (text === undefined || text === null || text === '') {
    return '请输入姓名';
  }
  // eslint-disable-next-line
  if (/[^\u4e00-\u9fa5\.]/g.test(text) || text.length > 12) {
    return '只允许填写中文或符号【·】；最长12个字';
  }
}

// 验证身份证号码
// 只允许输入数字和大写字母；18位，超出无法填写；
valid.idCard = (text) => {
  if (text === undefined || text === null || text === '') {
    return '身份证号码不能为空';
  }
  // eslint-disable-next-line
  if (/[^0-9A-Z]/g.test(text) || text.length !== 18) {
    return '只允许输入数字和大写字母；18位';
  }
}

// 验证统一社会信用代码
valid.socialCreditCode = (text) => {
  if (text === undefined || text === null || text === '') {
    return '统一社会信用代码不能为空';
  }
  // eslint-disable-next-line
  if (!/^(91|93){1}[\dA-Z]{16}$/.test(text)) {
    return '请输入91或者93开头的18位阿拉伯数字或大写英文字母';
  }
}

valid.eamil = (text) => {
  if (text === undefined || text === null || text === '') {
    return '邮箱地址不能为空';
  }
  // eslint-disable-next-line
  if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(text)) {
    return '请输入正确的邮箱地址';
  }
}

valid.phone = (text) => {
  if (text === undefined || text === null || text === '') {
    return '手机号码不能为空';
  }
  if (!/^[1][0-9]{10}$/.test(text)) {
    return '请输入正确的手机号';
  }
}

/**
 * 判断是否是移动端
 * @return {Boolean}
 */
valid.isMobile = () => {
  return /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent);
}


/**
 * 判断是否为android设备
 * @return boolean
 */
valid.isAndroid = () => {
  return /Android|Adr|MuMu/i.test(navigator.userAgent);
}

/**
 * [isMacOs 是否是mac]
 * @return {Boolean}
 */
valid.isMacOS = () => {
  return /macintosh|mac os x/i.test(navigator.userAgent);
}

/**
 * [isWin32 windows 32位系统]
 * @return {Boolean}
 */
valid.isWin32 = () => {
  return /win32|wow32/i.test(navigator.userAgent);
}

/**
 * [isWin64 windows 64位系统]
 * @return {Boolean}
 */
valid.isWin64 = () => {
  return /win64|wow64/i.test(navigator.userAgent);
}

export { valid };
