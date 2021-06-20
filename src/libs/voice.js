const successUrl = require('@/voice/ringin.wav')// 点解要写require()
const errorUrl = require('@/voice/error.wav')
const warningUrl = require('@/voice/warning.wav')
class Voice { // class 的特性
  constructor () { // 这个是什么意思
    this.successUrl = successUrl
    this.errorUrl = errorUrl
    this.warningUrl = warningUrl
    this.DOM = null
    this.createElement()
  }
  createElement () {
    const DOM = document.createElement('audio') // 这是啥的api 你回答引入标签（回答错误）
    DOM.id = 'wavFileId' // 设置id
    this.DOM = DOM
  }
  success () {
    const atr = document.createAttribute('src') // 这个api是做啥的 回答：获取属性（回答错误）
    atr.nodeValue = this.successUrl
    this.DOM.setAttributeNode(atr) // 这个api做什么的
    this.DOM.play()
  }
  error () {
    const atr = document.createAttribute('src')
    atr.nodeValue = this.errorUrl
    this.DOM.setAttributeNode(atr)
    this.DOM.play()
  }
  warning () {
    const atr = document.createAttribute('src')
    atr.nodeValue = this.warningUrl
    this.DOM.setAttributeNode(atr)
    this.DOM.play()
  }
}

/**
 * es6导出方式有咩
 *
 * COMMOM js导出方式
 */

export default function () { // export default
  const voice = new Voice()
  return voice
}

/**
 * prototype
 *
 * constructor
 *
 * __proto__
 */

/**
 * function -> Object.protype.toString.call(function() {}) == [Object object]
 */
