import util from '@/libs/util.js'

export default {
  namespaced: true,
  mutations: {
    /**
     * @description 显示版本信息
     * @param {Object} state state
     */
    versionShow () {
      util.log.capsule('ccb blog', `v${process.env.VUE_APP_VERSION}`)
      console.log('ccb blog  http://ccb.vcloudshop.com/')
      console.log('由嘉志技术团队倾情提供 ~')
    }
  }
}
