import util from '@/libs/util.js'
import menuHeader from '@/menu/header'
import store from '@/store/index'
import {
  cloneDeep
} from 'lodash'
// 进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// import asyncRouter from '@/router/asyncRouter'
// qs库
import qs from 'qs'
import Vue from 'vue'
import VueRouter from 'vue-router'
// 路由数据
import routes from './routes'

// 目前测试中，启用懒加载
// const _import = require('@/libs/util.import.' + process.env.NODE_ENV)
const _import = require('@/libs/util.import.production')

// fix vue-router NavigationDuplicated
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return VueRouterPush.call(this, location).catch(err => err)
}
const VueRouterReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace (location) {
  return VueRouterReplace.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const createRouter = (routes) => new VueRouter({
  routes
})

// 导出路由 在 main.js 里使用
const router = createRouter(routes)

let frameIn = []
let frameOut = []
let _menuHeader = []
let parentIdMatch = {}
let planRoutes = {}

const resetRouter = () => {
  frameIn = []
  frameOut = []
  _menuHeader = []
  parentIdMatch = {}
  planRoutes = {}
  const newRouter = createRouter([])
  router.matcher = newRouter.matcher
}

/**
 * 递归处理路由数据
 * @param data
 * @param level
 * @returns {*}
 */
function handleHoldOnData (data, level = 1) {
  return data.map(item => {
    // if (!item.ENABLED || item.ENABLED === 'N') return null
    /**
     * 系统变量
     */
    // const FINE_REPORT_URL = process.env.VUE_APP_FINE_REPORT_URL

    /**
     * 路由匹配字典
     */
    parentIdMatch[item.Id] = item.Parent_Id
    /**
     * menu 菜单
     */
    let _item = {
      title: item.Menu_Name,
      en_title: item.MENU_EN
    }
    if (item.children && item.children.length) {
      if (level === 2) {
        _item.icon = item.Icon_Url || 'folder'
      } else {
        _item.icon = item.Icon_Url || ''
      }
      _item.children = []
    } else {
      _item.path = item.Link_Url
      _item.icon = item.Icon_Url || ''
    }
    _item.id = item.Id
    _item.parent_id = item.Parent_Id
    _item.level = level // 添加当前 tree 层级
    _item.target = item.Target
    _item.columns = item.COLUMNS || 0

    // if (_item.path && !/^http:\/\//.test(_item.path)) { planRoutes[_item.path] = _item }
    if (_item.path) {
      if (/^http:\/\/|https:\/\//.test(_item.path) && item.Target === '_self') {
        // 替换菜单路径
        _item.path = `/FineReport/${item.Menu_Code}`
      }
      planRoutes[_item.path] = _item
    }

    /**
     * router 路由 数据
     */
    if (/^\/.*$/.test(item.Link_Url)) {
      item.Link_Url = item.Link_Url.substr(1, item.Link_Url.length)
      // 处理路由参数
      const arr = item.Link_Url.split('?')
      item.Link_Url = arr[0]
      const query = qs.parse(arr[1] || '')
      // 对 Link_Url 处理 得出 name
      let name = item.Link_Url?.split('/')
      const whitelist = [ // ============= 名称白名单
        'SOPsimple',
        'Kanban',
        'SfcsEquipKeepData'
      ]
      if (whitelist.indexOf(name[0]) !== -1) {
        name = name[1]
      } else {
        name = name[0]
      }
      const pushItem = {
        path: `/${item.Link_Url}`,
        name: name || item.Menu_Code,
        meta: {
          title: item.Menu_Name,
          en_title: item.MENU_EN,
          auth: true,
          id: item.Id,
          parent_id: item.Parent_Id,
          level: level,
          cache: item.Link_Url.indexOf('FineReport') === -1,
          query,
          target: item.Target,
          icon: item.Icon_Url || ''
        },
        component: _import(item.Link_Url)
      }
      if (parseInt(process.env.VUE_APP_SINGLE_SHOW) === 1) {
        frameOut.push(pushItem)
      } else if (!item.Target || item.Target === '_self') {
        frameIn.push(pushItem)
      } else if (item.Target === '_blank') {
        frameOut.push(pushItem)
      }
    }
    // 处理报表的逻辑
    if (/^http:\/\/|https:\/\//.test(item.Link_Url) && item.Target === '_self') {
      // 处理url
      const userInfo = store.getters.userinfo || {}
      if (item.Link_Url.indexOf('?') !== -1) {
        item.Link_Url = `${item.Link_Url}&`
      } else {
        item.Link_Url = `${item.Link_Url}?`
      }
      item.Link_Url = `${item.Link_Url}user_name=${userInfo.USER_NAME}&user_id=${userInfo.ID}`
      const pushItem = {
        path: `/FineReport/${item.Menu_Code}`,
        name: item.Menu_Code,
        meta: {
          title: item.Menu_Name,
          en_title: item.MENU_EN,
          auth: true,
          id: item.Id,
          parent_id: item.Parent_Id,
          level: level,
          cache: true,
          query: {
            frameUrl: item.Link_Url
          },
          target: item.Target,
          icon: item.Icon_Url || ''
        },
        component: _import('FineReport/index')
      }
      frameIn.push(pushItem)
    }
    if (item.children && item.children.length > 0) {
      _item.children = handleHoldOnData(item.children, level + 1)
    }
    return item.ENABLED === 'Y' ? _item : null
  }).filter(v => v && v)
}

/**
 * 路由拦截
 * 权限验证
 */
router.beforeEach(async (to, from, next) => {
  // 确认已经加载多标签页数据 https://github.com/d2-projects/d2-admin/issues/201
  await store.dispatch('d2admin/page/isLoaded')
  // 确认已经加载组件尺寸设置 https://github.com/d2-projects/d2-admin/issues/198
  await store.dispatch('d2admin/size/isLoaded')
  // 进度条
  NProgress.start()
  // 关闭搜索面板
  store.commit('d2admin/search/set', false)
  const AuthWhiteList = [
    '/SOPbrowse/Index',
    '/SOPbrowse/index',
    '/SOPsimple/SOP/index',
    '/SOPsimple/SOP/Index'
  ]
  // 验证当前路由所有的匹配中是否需要有登录验证的
  if (AuthWhiteList.indexOf(to.path) === -1 && (to.meta.auth || to.matched.some(r => {
    return to.path !== r.path
  }))) {
    // 将cookie里是否存有token作为验证是否登录的条件
    let token = util.cookies.get('token')
    if (!token) {
      token = util.cookies.get('mes2_token') // 这个token是MVC登录过来的
    }
    if (token && token !== 'undefined') {
      // 配置动态路由
      const roleMenu = store.getters.roleMenu
      if (roleMenu.length) {
        next()
      } else {
        try {
          // 重置路由
          resetRouter()
          // getUserInfo
          await store.dispatch('d2admin/user/getUserInfo')
          // API 获取路由
          const accessRoutes = await store.dispatch('custom/permission/generateRoutes', store.getters.roleId)
          // API 获取按钮权限
          await store.dispatch('custom/permission/getBtnList')
          _menuHeader = handleHoldOnData(accessRoutes)
          // API 获取收藏夹
          await store.dispatch('custom/collection/getCollections', planRoutes)
          _menuHeader.unshift(...menuHeader)
          _menuHeader = [...new Set(_menuHeader)] // 去重
          let menuAside = [..._menuHeader]
          let _routes = cloneDeep(routes)
          _routes[0].children = _routes[0].children.concat(frameIn)
          frameOut.map(item => {
            _routes.push(item)
          })
          const map = new Map() // 去重
          _routes.map(item => {
            if (!map.has(item.path)) {
              map.set(item.path, item)
            }
          })
          const __routes = []
          map.forEach(item => {
            __routes.push(item)
          })
          _routes = __routes
          router.addRoutes(_routes)
          store.commit('custom/permission/SET_MENU', {
            listMenu: _routes,
            frameOut: frameOut
          })
          store.commit('custom/permission/SET_PARENT_ID_MATCH', parentIdMatch)
          // 处理路由 得到每一级的路由设置
          store.commit('d2admin/page/init', [_routes[0]])
          // 设置顶栏菜单
          store.commit('d2admin/menu/headerSet', _menuHeader)
          // 设置基础侧边栏菜单
          store.commit('d2admin/menu/setBaseAside', menuAside)
          // 初始化菜单搜索功能
          store.commit('d2admin/search/init', _menuHeader)

          const redirect = util.cookies.get('redirect')

          if (redirect && parseInt(process.env.VUE_APP_STRONG_REDIRECT) === 1) {
            util.cookies.remove('redirect') // 删掉 redirect-cookie
            next({
              redirect
            })
          } else {
            next({
              ...{
                path: to.path
              }
            })
          }
        } catch (e) {
          // 删除cookie
          util.cookies.remove('token')
          // 清空 vuex 用户信息
          await store.dispatch('d2admin/user/set', {}, {
            root: true
          })
          next(`/login?redirect=${to.path}`)
        }
      }
    } else {
      // 没有登录的时候跳转到登录界面
      // 携带上登陆成功之后需要跳转的页面完整路径
      next({
        name: 'login',
        query: {
          redirect: to.fullPath
        }
      })
      // https://github.com/d2-projects/d2-admin/issues/138
      NProgress.done()
    }
  } else {
    // 不需要身份校验 直接通过
    next()
  }
})

router.afterEach(to => {
  // 进度条
  NProgress.done()
  // 多页控制 打开新的页面
  store.dispatch('d2admin/page/open', to)
  // 更改标题
  util.title(to.meta.title)
})

export default router
