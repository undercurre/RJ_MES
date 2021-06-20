// Vue
import Vue from 'vue'
import i18n from './i18n'
import App from './App'
// 核心插件
import d2Admin from '@/plugin/d2admin'
// store
import store from '@/store/index'

// 菜单和路由设置
import router from './router'
import menuHeader from '@/menu/header'
import { frameInRoutes } from '@/router/routes'

import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/index.css'
// 拖拽
import './libs/directives'
// 全局bus
import Bus from '@/libs/bus'
import util from '@/libs/util'
// import VXETablePluginExportXLSX from 'vxe-table-plugin-export-xlsx'
// 导出
Vue.use(Bus)
// 核心插件
Vue.use(d2Admin)
Vue.use(VXETable)

// VXETable.use(VXETablePluginExportXLSX)

// 父组件向下广播
Vue.prototype.$dispath = function (event, value) {
  if (this.$children) {
    this.$children.forEach(item => {
      item.$emit(event, value)
      item.$dispath(event, value)
    })
  }
}

const handleUploadHeader = function () {
  const config = {}
  const token = util.cookies.get('token')
  // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
  config['Authorization'] = `Bearer ${token}`
  const lang = {
    'zh-chs': 'zh-CN,zh;',
    en: 'en-US,en;'
  }
  config['Accept-Language'] = lang[util.cookies.get('lang')]
  return config
}

Vue.prototype.handleUploadHeader = handleUploadHeader

Vue.mixin({
  computed: {
    $btnList () {
      return store.state.custom.permission.btnList || []
    }
  }
})

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
  created () {
    // 处理路由 得到每一级的路由设置
    this.$store.commit('d2admin/page/init', frameInRoutes)
    // 设置顶栏菜单
    this.$store.commit('d2admin/menu/headerSet', menuHeader)
    // 初始化菜单搜索功能
    this.$store.commit('d2admin/search/init', menuHeader)
  },
  mounted () {
    // 展示系统信息
    this.$store.commit('d2admin/releases/versionShow')
    // 用户登录后从数据库加载一系列的设置
    this.$store.dispatch('d2admin/account/load')
    // 获取并记录用户 UA
    this.$store.commit('d2admin/ua/get')
    // 初始化全屏监听
    this.$store.dispatch('d2admin/fullscreen/listen')
  },
  watch: {
    // 检测路由变化切换侧边栏内容
    '$route.matched': {
      handler (matched) {
        const route = this.$route
        this.$store.dispatch('custom/commonFunctions/writeData', route)
        function getParent (id, match, endIds) {
          // 加一层判断，如果进来就有的话直接返回
          if (endIds.indexOf(id) !== -1) {
            return endIds.indexOf(id)
          }
          let index = -1
          let pid = match[id]
          if (pid) {
            // 找到了pid
            index = endIds.indexOf(pid)
            if (index === -1) {
              return getParent(pid, match, endIds)
            }
          }
          return index
        }
        this.$root.$nextTick(() => {
          const parentIdMatch = this.$store.getters.parentIdMatch
          const menuAside = this.$store.getters.menuAside
          if (!menuAside.length) {
            return false
          }
          if (matched.length > 0) {
            if (!matched[1] || matched[1]?.path === '/index') {
              const asideValue = this.$store.state.custom.collection.collectionRoutes
              this.$store.commit('d2admin/menu/asideSet', asideValue)
            } else {
              const endIds = menuAside.map(item => {
                return item.id
              })
              const ID = matched[1] && matched[1].meta ? matched[1].meta.parent_id : 0
              const index = getParent(ID, parentIdMatch, endIds)
              const asideValue = menuAside[index] && menuAside[index].children ? menuAside[index].children : []
              this.$store.commit('d2admin/menu/asideSet', asideValue)
            }
          }
        })
      },
      immediate: true // watch中首次绑定的时候，是否执行handler
    }
  }
}).$mount('#app')
