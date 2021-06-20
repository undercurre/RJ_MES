import { LoadData, SaveData } from '@/api/sys.home'
import util from '@/libs/util.js'
export default {
  namespaced: true,
  state: {
    idList: [],
    list: [],
    initFlag: false
  },
  mutations: {
    SET_ID_LIST: (state, ids) => {
      state.idList = ids
    },
    SET_LIST: (state, list) => {
      state.list = list
    },
    SET_INIT_FLAG: (state, v) => {
      state.initFlag = v
    }
  },
  actions: {
    writeData: ({ commit, state, rootState, dispatch }, route) => {
      return new Promise(async resolve => {
        const uid = rootState.d2admin.user.info.ID || 0
        const token = util.cookies.get('token')
        if (!token || !uid) {
          resolve()
          return false
        }
        if (!state.initFlag) {
          await dispatch('getData')
        }
        const { path = '', meta = {} } = route
        if (!path || path === '/index' || !meta.id || path === '/login') {
          resolve()
          return false
        }

        const commonFunctionsListMenuIds = state.idList
        const commonFunctionsList = state.list
        if (commonFunctionsListMenuIds.indexOf(meta.id) === -1) {
          commonFunctionsList.push({
            ID: 0,
            User_ID: uid || 0,
            MENU_ID: meta.id || 0,
            MENU_PATH: path || '',
            MENU_TITLE: meta.title || '',
            MENU_EN_TITLE: meta.en_title || '',
            MENU_ICON: meta.icon || '',
            NUM_OF_CLICK: 1
          })
          commonFunctionsListMenuIds.push(meta.id)
        } else {
          commonFunctionsList.map(i => {
            if (i.MENU_ID === meta.id) {
              i.MENU_ID = i.MENU_ID || 0
              i.MENU_PATH = i.MENU_PATH || ''
              i.MENU_TITLE = i.MENU_TITLE || ''
              i.MENU_EN_TITLE = i.MENU_EN_TITLE || ''
              i.MENU_ICON = i.MENU_ICON || ''
              i.NUM_OF_CLICK = i.NUM_OF_CLICK ? i.NUM_OF_CLICK + 1 : 1
            }
          })
        }
        commit('SET_INIT_FLAG', true)
        commit('SET_ID_LIST', commonFunctionsListMenuIds)
        commit('SET_LIST', commonFunctionsList)
        // TODO 判断缓存数据的长度 如果超过8则提交
        // if (commonFunctionsList.length > 8) {
        //   await dispatch('setData')
        //   await dispatch('getData')
        // }
        resolve()
      })
    },
    getData: ({ dispatch, rootState, commit, state }) => {
      return new Promise(async (resolve, reject) => {
        const uid = rootState.d2admin.user.info.ID || 0
        // eslint-disable-next-line prefer-promise-reject-errors
        if (!uid) reject()
        const res = await LoadData({
          User_ID: uid
        })
        commit('SET_INIT_FLAG', true)
        const list = res.Result || []
        const idsList = list.map(i => i.MENU_ID)
        commit('SET_ID_LIST', idsList)
        commit('SET_LIST', list)
        // await dispatch('writeData', res.Result)
        resolve()
      })
    },
    setData: ({ state }) => {
      return new Promise(async resolve => {
        const list = state.list
        // const InsertRecords = []
        // const UpdateRecords = []
        // list.map(item => {
        //   if (!item.ID) {
        //     InsertRecords.push(item)
        //   } else {
        //     UpdateRecords.push(item)
        //   }
        // })
        // const res = await SaveData({
        //   InsertRecords,
        //   UpdateRecords
        // })
        const res = await SaveData({ OperationRecords: list })
        if (res.Result) resolve()
      })
    },
    clearData: ({ commit }) => {
      return new Promise(resolve => {
        commit('SET_ID_LIST', [])
        commit('SET_LIST', [])
        // commit('SET_INIT_FLAG', false)
        resolve()
      })
    }
  }
}
