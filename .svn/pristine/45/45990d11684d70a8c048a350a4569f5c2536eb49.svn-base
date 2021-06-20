export default {
  userinfo: (state) => {
    return state.d2admin.user.info
  },
  // 用户id
  userId: (state) => {
    return state.d2admin.user.info.ID || 0
  },
  // 用户角色id
  roleId: (state) => {
    return state.d2admin.user.info.ROLE_ID || 0
  },
  // 用户名称
  username: (state) => {
    return state.d2admin.user.info.USER_NAME || ''
  },
  // 昵称
  nickname: (state) => {
    return state.d2admin.user.info.NICK_NAME || ''
  },
  // 路由
  roleMenu: (state) => {
    return state.custom.permission.listMenu || []
  },
  // 基础侧边栏菜单
  menuAside: (state) => {
    return state.d2admin.menu.baseAside || []
  },
  // 路由 id-parentId 映射
  parentIdMatch: (state) => {
    return state.custom.permission.parentIdMatch || {}
  },
  // defaultOpened
  defaultOpenedIndex: (state) => {
    return state.d2admin.menu.defaultOpenedIndex || -1
  },
  sortType: (state) => {
    return state.custom.sop.sortType
  },
  // 按钮列表
  btnList: state => state.custom.permission.btnList || [],
  // 常用功能列表
  commonFunctionsList: state => state.custom.commonFunctions.list || [],
  // 常用功能initFlag
  initFlag: state => state.custom.commonFunctions.initFlag || false
}
