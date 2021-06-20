import cookies from './util.cookies'
import db from './util.db'
import log from './util.log'

const util = {
  cookies,
  db,
  log
}

/**
 * @description 更新标题
 * @param {String} title 标题
 */
util.title = function (titleText) {
  const processTitle = process.env.VUE_APP_TITLE || 'D2Admin'
  window.document.title = `${processTitle}${titleText ? ` | ${titleText}` : ''}`
}

/**
 * @description 打开新页面
 * @param {String} url 地址
 */
util.open = function (url) {
  var a = document.createElement('a')
  a.setAttribute('href', url)
  a.setAttribute('target', '_blank')
  a.setAttribute('id', 'd2admin-link-temp')
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(document.getElementById('d2admin-link-temp'))
}

/**
 * new
 * @returns {*}
 * @private
 */
util._new = function () {
  // 创建一个空对象
  let obj = Object.create({})
  // 获取构造函数
  let Constructor = [].shift.call(arguments)
  // 链接到原型
  // eslint-disable-next-line no-proto
  obj.__proto__ = Constructor.prototype
  // 绑定this值
  let result = Constructor.apply(obj, arguments) // 使用apply，将构造函数中的this指向新对象，这样新对象就可以访问构造函数中的属性和方法
  // 返回新对象
  return typeof result === 'object' ? result : obj // 如果返回值是一个对象就返回该对象，否则返回构造函数的一个实例对象
}

export default util
