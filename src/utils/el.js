const el = {};

/**
 * 判断元素是否为另一个元素的子元素
 * @param $el obj 元素
 * @param $parent obj 父元素
 * @returns {*}
 */
el.isChildOf = function ($el, $parent) {
  while ($el && $el.tagName.toUpperCase() !== 'BODY' && $el.tagName.toUpperCase() !== 'HTML') {
    if ($el === $parent) return true;
    $el = $el.parentNode;
  }

  return false;
};

/**
 * 判断元素是否为另一个元素的子元素
 * @param $el obj 元素
 * @param className str 类名
 * @returns {*}
 */
el.getClosestByClassName = function ($el, className) {
  while ($el && !('' + $el.className).split(' ').includes(className)) {
    $el = $el.parentNode;
  }

  return $el;
};

export { el };
