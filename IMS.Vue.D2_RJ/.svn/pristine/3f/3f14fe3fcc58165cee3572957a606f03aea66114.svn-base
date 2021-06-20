import {
  mapState,
  mapActions
} from 'vuex'
import menuMixin from '../mixin/menu'
import {
  elMenuItem,
  elSubmenu
} from '../libs/util.menu'
import BScroll from 'better-scroll'

export default {
  name: 'd2-layout-header-aside-menu-side',
  mixins: [
    menuMixin
  ],
  render (createElement) {
    return createElement('div', {
      attrs: {
        class: 'd2-layout-header-aside-menu-side'
      }
    }, [
      createElement('el-menu', {
        props: {
          collapse: this.asideCollapse,
          uniqueOpened: true,
          defaultActive: this.active
        },
        ref: 'menu',
        on: {
          select: (index, indexPath) => this.handleMenuSelect(index, indexPath, this.frameOut)
        }
      }, [
        ...this.$route.path === '/index' && !this.asideCollapse ? [createElement('div', {
          attrs: {
            class: 'd2-layout-header-aside-menu-empty custom-collec-tit',
            flex: 'dir:top main:center cross:center'
          }
        }, [
          createElement('d2-icon', {
            props: {
              name: 'inbox'
            }
          }),
          createElement('span', {}, this.$t('menu_side._2'))
        ])] : [],
        ...this.aside.map(menu => (menu.children === undefined ? elMenuItem : elSubmenu).call(this, createElement, menu, false, true, true))]),
      ...this.aside.length === 0 && !this.asideCollapse ? [
        createElement('div', {
          attrs: {
            class: 'd2-layout-header-aside-menu-empty',
            flex: 'dir:top main:center cross:center'
          }
        }, [
          createElement('d2-icon', {
            props: {
              name: 'inbox'
            }
          }),
          createElement('span', {}, this.$t('menu_side._1'))
        ])
      ] : [],
      createElement('d2-contextmenu', {
        props: {
          visible: this.contextmenuFlag,
          x: this.contentmenuX,
          y: this.contentmenuY
        }
      }, [
        createElement('d2-contextmenu-list', {
          props: {
            menulist: this.contextmenuList
          },
          on: {
            rowClick: this.contextmenuClick
          }
        })
      ])
    ])
  },
  data () {
    return {
      active: '',
      asideHeight: 300,
      BS: null,
      contextmenuFlag: false,
      contentmenuX: 0,
      contentmenuY: 0,
      contextmenuList: [{
        title: this.$t('menu_side._3'),
        value: 'handleCollection'
      }],
      currentMenu: {}
    }
  },
  components: {
    D2Contextmenu: () => import('@/layout/header-aside/components/contextmenu'),
    D2ContextmenuList: () =>
      import(
        '@/layout/header-aside/components/contextmenu/components/contentmenuList'
      )
  },
  computed: {
    ...mapState('d2admin/menu', [
      'aside',
      'asideCollapse'
    ]),
    ...mapState({
      collectionList: state => state.custom.collection.collectionList,
      collectionRoutes: state => state.custom.collection.collectionRoutes,
      frameOut: state => {
        return (state.custom.permission.frameOut || []).map(item => item.path)
      }
    })
  },
  watch: {
    // 折叠和展开菜单的时候销毁 better scroll
    asideCollapse (val) {
      this.scrollDestroy()
      setTimeout(() => {
        this.scrollInit()
      }, 500)
    },
    // 监听路由 控制侧边栏激活状态
    '$route.fullPath': {
      handler (value) {
        this.$root.$nextTick(() => {
          this.active = value
        })
      },
      immediate: true
    }
  },
  mounted () {
    this.scrollInit()
    document.addEventListener('click', () => { // 监听文档点击事件
      this.contextmenuFlag = false
    })
  },
  beforeDestroy () {
    this.scrollDestroy()
  },
  methods: {
    ...mapActions({
      modifyCollection: 'custom/collection/modifyCollection'
    }),
    // 右击
    async handleCollectionRightClick (event, menu) {
      let index = this.collectionList.indexOf(menu.path)
      if (index === -1) {
        this.contextmenuList = [{
          title: this.$t('menu_side._3'),
          value: 'handleCollection'
        }]
      } else {
        this.contextmenuList = [{
          title: this.$t('menu_side._4'),
          value: 'handleCollection'
        }]
      }
      event.preventDefault() // 组织事件冒泡
      event.stopPropagation()
      this.contentmenuX = event.clientX
      this.contentmenuY = event.clientY
      this.contextmenuFlag = true
      this.currentMenu = menu
    },
    async contextmenuClick () {
      const res = await this.modifyCollection(this.currentMenu)
      if (this.$route.matched && this.$route.matched[1]?.path === '/index') {
        this.$store.commit('d2admin/menu/asideSet', this.collectionRoutes)
      }
      let msg = ''
      if (res === 1) {
        msg = this.$t('menu_side._5')
      } else if (res === 2) {
        msg = this.$t('menu_side._6')
      }
      this.$message.success(msg)
      this.contextmenuFlag = false
    },
    scrollInit () {
      this.BS = new BScroll(this.$el, {
        mouseWheel: true,
        click: true
        // 如果你愿意可以打开显示滚动条
        // scrollbar: {
        //   fade: true,
        //   interactive: false
        // }
      })
    },
    scrollDestroy () {
      // https://github.com/d2-projects/d2-admin/issues/75
      try {
        this.BS.destroy()
      } catch (e) {
        delete this.BS
        this.BS = null
      }
    }
  }
}
