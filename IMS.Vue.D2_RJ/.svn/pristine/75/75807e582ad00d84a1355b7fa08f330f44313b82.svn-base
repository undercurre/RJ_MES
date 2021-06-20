import setting from '@/setting.js'

export default {
  namespaced: true,
  state: {
    // 搜索面板激活状态
    active: false,
    // 快捷键
    hotkey: {
      open: setting.hotkey.search.open,
      close: setting.hotkey.search.close
    },
    // 所有可以搜索的页面
    pool: []
  },
  mutations: {
    /**
     * @description 切换激活状态
     * @param {Object} state state
     */
    toggle (state) {
      state.active = !state.active
    },
    /**
     * @description 设置激活模式
     * @param {Object} state state
     * @param {Boolean} active active
     */
    set (state, active) {
      state.active = active
    },
    /**
     * @description 初始化
     * @param {Object} state state
     * @param {Array} menu menu
     */
    init (state, menu) {
      const pool = []
      const push = function (menu, titlePrefix = { cn: [], en: [] }) {
        menu.forEach(m => {
          if (m.children) {
            push(m.children, { cn: [...titlePrefix.cn, m.title], en: [...titlePrefix.en, m.en_title] })
          } else {
            pool.push({
              ...m,
              fullTitle: [...titlePrefix.cn, m.title].join(' / '),
              en_fullTitle: [...titlePrefix.en, m.en_title].join(' / ')
            })
          }
        })
      }
      push(menu)
      state.pool = pool
    }
  }
}
