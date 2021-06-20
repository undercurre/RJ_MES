import {
  LoadMenusByRoleId,
  GetAllButtonByRoleId
} from '@/api/sys.menu'
export default {
  namespaced: true,
  state: {
    listMenu: [],
    parentIdMatch: [],
    frameOut: [],
    btnList: []
  },
  mutations: {
    SET_MENU: (state, value) => {
      const {
        listMenu = [],
        frameOut = []
      } = value
      state.listMenu = listMenu
      state.frameOut = frameOut
    },
    SET_PARENT_ID_MATCH: (state, value) => {
      state.parentIdMatch = value
    },
    SET_BTN_LIST: (state, value) => {
      state.btnList = value
    }
  },
  actions: {
    generateRoutes: (_, roleId) => {
      return new Promise(async resolve => {
        const result = await LoadMenusByRoleId(roleId)
        resolve(result.Result || [])
      })
    },
    removeRoutes: ({ commit }) => {
      return new Promise(resolve => {
        commit('SET_PARENT_ID_MATCH', [])
        commit('SET_MENU', [])
        resolve()
      })
    },
    getBtnList: ({ commit, rootState }) => {
      return new Promise(async resolve => {
        const roleId = rootState.d2admin.user.info.ROLE_ID || ''
        const res = await GetAllButtonByRoleId(roleId)
        const data = res.Result || []
        const btnList = data.map(item => item.Menu_Code)
        commit('SET_BTN_LIST', btnList)
        resolve(btnList)
      })
    }
  }
}
