const methods = {};

/**
 * 复制文本到粘贴板
 */
methods.copyToClipBoard = (text) => {
  const input = document.createElement('input');
  input.setAttribute('readonly', 'readonly');
  input.setAttribute('value', value);
  document.body.appendChild(input);
  input.focus();
  input.setSelectionRange(0, 9999);
  if (document.execCommand('copy')) {
    document.execCommand('copy');
  }
  document.body.removeChild(input);
};

/**
 * 过滤 <script>
 * 防止用户输入一些恶意的内容，比如说输入一个<script>这样的一个标签，注入脚本
 * @param str
 * @return str
 */
methods.preventXSS = (str) => {
  return str.replace(/</ig, '&lt;').replace(/>/ig, '&gt;');
}

/**
 * 解析 preventXSS 处理过的内容。
 * 非DOM元素解析方式，可以直接插入, 例如模版语法 {{}}
 * @param str
 * @return str
 */
methods.parseXSS = (str) => {
  return (str || '').replace(/&lt;/ig, '<').replace(/&gt;/ig, '>');
}

export { methods };
