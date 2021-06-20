import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

/**
 * 在主框架内显示
 */
const frameIn = [
  {
    path: '/',
    redirect: { name: 'index' },
    component: layoutHeaderAside,
    children: [
      // 首页
      {
        path: 'index',
        name: 'index',
        meta: {
          title: '首页',
          en_title: 'Home',
          auth: true
        },
        component: _import('system/index')
      },
      // 简化版sop
      // {
      //   path: '/SOP/index',
      //   name: 'SOP',
      //   meta: {
      //     auth: true
      //   },
      //   component: _import('SOPsimple/SOP/index')
      // },
      // 系统 前端日志
      {
        path: 'log',
        name: 'log',
        meta: {
          title: '前端日志',
          en_title: 'Front-end log',
          auth: true
        },
        component: _import('system/log')
      },
      // 刷新页面 必须保留
      {
        path: 'refresh',
        name: 'refresh',
        hidden: true,
        meta: {
          title: 'loading...'
        },
        component: _import('system/function/refresh')
      },
      // 页面重定向 必须保留
      {
        path: 'redirect/:route*',
        name: 'redirect',
        meta: {
          title: 'loading...'
        },
        hidden: true,
        component: _import('system/function/redirect')
      }
    ]
  }
]

/**
 * 在主框架之外显示
 */
var frameOut = [
  // 登录
  {
    path: '/login',
    name: 'login',
    component: _import('system/login')
  },
  {
    path: '/SOPsimple/SOP/index',
    name: 'SOPsimple',
    component: _import('SOPsimple/SOP/index')
  },
  {
    path: '/SOPbrowse/Index',
    name: 'SOPbrowse',
    component: _import('SOPbrowse/Index')
  },
  {
    path: '/PreviewArticle/index',
    name: 'PreviewArticle',
    component: _import('PreviewArticle/index')
  },
  {
    path: '/PreviewArticleList/index',
    name: 'PreviewArticleList',
    component: _import('PreviewArticleList/index')
  },
  {
    path: '/VersionInformation/index',
    name: 'VersionInformation',
    component: _import('VersionInformation/index')
  },
  {
    path: '/VersionInformationList/index',
    name: 'VersionInformationList',
    component: _import('VersionInformationList/index')
  },
  {
    path: '/WarningInformation/index',
    name: 'WarningInformation',
    component: _import('WarningInformation/index')
  },
  {
    path: '/WarningInformationList/index',
    name: 'WarningInformationList',
    component: _import('WarningInformationList/index')
  },
  {
    path: '/ToDo/index',
    name: 'ToDo',
    component: _import('ToDo/index')
  },
  {
    path: '/Todolist/index',
    name: 'Todolist',
    component: _import('Todolist/Index')
  }

]
/**
 * 错误页面
 */
const errorPage = [
  {
    path: '*',
    name: '404',
    component: _import('system/error/404')
  }
]

// 导出需要显示菜单的
export const frameInRoutes = frameIn

// 重新组织后导出
export default [
  ...frameIn,
  ...frameOut,
  ...errorPage
]
