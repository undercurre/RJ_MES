import {
  LoadData,
  SaveData
} from '@/api/SysFavorites'
export default {
  namespaced: true,
  state: {
    collectionList: [],
    collectionRoutes: [],
    originData: [],
    planRoutes: {}
  },
  mutations: {
    SET_COLLECTION_LIST: (state, value) => {
      state.collectionList = value
    },
    SET_ORIGIN_DATA: (state, value) => {
      state.originData = value
    },
    SET_PLAN_ROUTES: (state, value) => {
      state.planRoutes = value
    },
    SET_COLLECTION_ROUTES: (state, value) => {
      state.collectionRoutes = value
    }
  },
  actions: {
    // 获取收藏夹内容
    getCollections ({ commit, rootState, state }, planRoutes) {
      return new Promise(async resolve => {
        if (planRoutes) {
          commit('SET_PLAN_ROUTES', planRoutes)
        }
        const USER_ID = rootState.d2admin.user.info.ID
        const res = await LoadData({
          USER_ID
        })
        const data = res.Result || []
        commit('SET_ORIGIN_DATA', data)
        const collectionList = []
        const collectionRoutes = []
        data.map(item => {
          if (item.MENUM_PATH) {
            collectionList.push(item.MENUM_PATH)
            if (state.planRoutes[item.MENUM_PATH]) {
              collectionRoutes.push(state.planRoutes[item.MENUM_PATH])
            }
          }
        })
        commit('SET_COLLECTION_LIST', collectionList)
        commit('SET_COLLECTION_ROUTES', collectionRoutes)
        resolve(true)
      })
    },
    // 新增删除收藏夹
    modifyCollection ({ rootState, state, dispatch, commit }, ROW_DATA) {
      return new Promise(async resolve => {
        const USER_ID = rootState.d2admin.user.info.ID
        const PATH = ROW_DATA.path
        const index = state.collectionList.indexOf(PATH)
        if (index === -1) { // 新增
          const saveData = {
            InsertRecords: [
              {
                ID: 0,
                MENUM_ID: 0, // 不需要这个id
                MENUM_PATH: PATH,
                USER_ID,
                ENABLE: 'Y',
                SORT_NUM: 0
              }
            ]
          }
          const res = await SaveData(saveData)
          if (res.Result) {
            await dispatch('getCollections')
            // await commit('d2admin/menu/asideSet', state.collectionRoutes, { root: true })
            resolve(1)
          }
        } else { // 删除
          const originData = state.originData
          let id = 0
          originData.map(item => {
            if (PATH === item.MENUM_PATH) {
              id = item.ID
            }
          })
          if (id) {
            const saveData = {
              RemoveRecords: [
                {
                  ID: id,
                  MENUM_ID: 0, // 不需要这个id
                  MENUM_PATH: PATH,
                  USER_ID,
                  ENABLE: 'Y',
                  SORT_NUM: 0
                }
              ]
            }
            const res = await SaveData(saveData)
            if (res.Result) {
              await dispatch('getCollections')
              // await commit('d2admin/menu/asideSet', state.collectionRoutes, { root: true })
              resolve(2)
            }
          }
        }
      })
    }
  }
}
