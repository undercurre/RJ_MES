// 创建 el-menu-item
export function elMenuItem (createElement, menu, showStart, isRight, isSide) {
  const VNode = createElement('el-menu-item', {
    props: {
      index: menu.path
    },
    on: {
      select: () => false
    }
  }, [
    createElement('div', {
      attrs: {
        class: 'x-flex-center'
      },
      slot: 'title',
      on: isRight ? {
        contextmenu: ($event) => {
          this.handleCollectionRightClick($event, menu)
        },
        click: () => {
          this.handleMenuSelect(menu.path, menu, this.frameOut, true)
          event.stopPropagation() // 阻止事件冒泡
        }
      } : {}
    }, [
      ...menu.icon ? [
        createElement('i', {
          attrs: {
            class: `fa fa-${menu.icon}`
          }
        })
      ] : [],
      ...menu.icon === undefined & !menu.iconSvg ? [
        createElement('i', {
          attrs: {
            class: 'fa fa-file-o'
          }
        })
      ] : [],
      ...menu.iconSvg ? [
        createElement('d2-icon-svg', {
          props: {
            name: menu.iconSvg
          }
        })
      ] : [],
      ...showStart && menu.path !== '/index' ? [
        createElement('span', {
          attrs: {
            class: 'custom-span-x'
          },
          slot: 'title'
        }, [
          (this.$i18n.locale === 'zh-chs' ? menu.title : menu.en_title) || this.$t('tabPage._7'),
          createElement('i', {
            attrs: {
              class: this.collectionList.indexOf(menu.path) === -1 ? 'fa fa-star-o' : 'fa fa-star star-yes'
            },
            on: {
              'click': () => {
                this.handleCollection(menu)
                event.stopPropagation() // 阻止事件冒泡
              }
            }
          })
        ])
      ] : [createElement('span', {
        slot: 'title',
        on: {

        }
      }, (this.$i18n.locale === 'zh-chs' ? menu.title : menu.en_title) || this.$t('tabPage._7'))]
    ])
  ])
  return VNode
}

// 创建 el-submenu
export function elSubmenu (createElement, menu, showStart, isRight, isSide) {
  const res = createElement('el-submenu', {
    props: {
      index: menu.path
    },
    class: {
      'custom-menu': showStart
    }
  }, [
    ...menu.icon ? [
      createElement('i', {
        slot: 'title',
        attrs: {
          class: `fa fa-${menu.icon}`
        }
      })
    ] : [],
    ...menu.icon === undefined & !menu.iconSvg ? [
      createElement('i', {
        slot: 'title',
        attrs: {
          class: 'fa fa-folder-o'
        }
      })
    ] : [],
    ...menu.iconSvg ? [
      createElement('d2-icon-svg', {
        slot: 'title',
        props: {
          name: menu.iconSvg
        }
      })
    ] : [],
    createElement('span', {
      slot: 'title'
    }, (this.$i18n.locale === 'zh-chs' ? menu.title : menu.en_title) || this.$t('tabPage._7')),

    !showStart && (() => { return menu.children.map((child, childIndex) => (child.children === undefined ? elMenuItem : elSubmenu).call(this, createElement, child, showStart, isRight, isSide)) })(),
    showStart && (() => {
      return createElement('div', {
        style: {
          maxHeight: '80vh',
          overflowY: 'auto'
        }
      }, [createCustomMenu.call(this, createElement, menu, showStart, isRight, isSide)])
    })()
  ])
  return res
}

/**
 * 自定义菜单显示【纯手绘】
 * @param createElement
 * @param menu
 * @param showStart
 * @param isRight
 * @param isSide
 * @param level
 * @returns {*}
 */
function createCustomMenu (createElement, menu, showStart, isRight, isSide, level = 1) {
  let count = 1
  if (level === 1) {
    menu.children.map(child => {
      if (child.children && child.children.length) {
        count++
      }
    })
    if (count) {
      if (count > 3) {
        count = 3
      }
    } else {
      count = 1
    }
  }
  const item = menu.children.map((child, childIndex) => {
    return createElement('div', {
      class: {
        'custom-header-menu-item': true,
        'custom-header-menu-item-noBorder': level > 1,
        'custom-header-menu-item-noFloat': level > 1,
        'cur': !child.children || !child.children.length
      },
      style: {
        marginLeft: `${(level - 1) * 10}px`,
        position: 'relative'
      },
      props: {
        COLUMNS: child.columns
      },
      on: {
        click: () => this.handleMenuSelect(child.path, child, this.frameOut, true)
      }
    }, [
      ...child.icon && level === 1 ? [
        createElement('i', {
          slot: 'title',
          attrs: {
            class: `fa fa-${child.icon}`
          }
        })
      ] : [],
      ...child.icon === undefined && !child.iconSvg ? [
        createElement('i', {
          slot: 'title',
          attrs: {
            class: 'fa fa-folder-o'
          }
        })
      ] : [],
      ...child.iconSvg && level === 1 ? [
        createElement('d2-icon-svg', {
          slot: 'title',
          props: {
            name: child.iconSvg
          }
        })
      ] : [],
      createElement('span', {
        style: {
          width: '100%'
        }
      }, [
        createElement('span', {
          class: ['custom-header-menu-span']
        }, (this.$i18n.locale === 'zh-chs' ? child.title : child.en_title) || this.$t('tabPage._7')),
        createElement('span', {
          style: {
            paddingLeft: '20px'
          }
        }),
        !child.children || !child.children.length ? createElement('i', {
          attrs: {
            class: this.collectionList.indexOf(child.path) === -1 ? 'fa fa-star-o' : 'fa fa-star star-yes'
          },
          style: {
            position: 'absolute',
            right: '10px',
            top: '9px'
          },
          on: {
            'click': () => {
              this.handleCollection(child)
              event.stopPropagation() // 阻止事件冒泡
            }
          }
        }) : null
      ]),
      (child.children && child.children.length ? createCustomMenu.call(this, createElement, child, showStart, isRight, isSide, level + 1) : [])
    ])
  })
  let res = null
  if (level === 1) {
    const arr1 = []
    const arr2 = []
    const arr3 = []
    item.map((subitem, subindex) => {
      const data = subitem.data || {}
      const _props = data.props || {}
      if (_props.COLUMNS) {
        let i = _props.COLUMNS % 3
        i = i || 3
        if (i === 1) {
          arr1.push(subitem)
        } else if (i === 2) {
          arr2.push(subitem)
        } else {
          arr3.push(subitem)
        }
      } else {
        if (subindex % count === 0) {
          arr1.push(subitem)
        } else if (subindex % count === 1) {
          arr2.push(subitem)
        } else {
          arr3.push(subitem)
        }
      }
    })
    res = createElement('div', {
      class: {
        'custom-header-menu-list': true,
        'custom-header-menu-list-noShadow': level > 1
      }
    }, [createElement('div', {
      style: {
        display: 'flex'
      }
    }, [
      arr1.length ? createElement('div', {}, arr1) : null,
      arr2.length ? createElement('div', {}, arr2) : null,
      arr3.length ? createElement('div', {}, arr3) : null
    ])])
  } else {
    res = createElement('div', {
      class: {
        'custom-header-menu-list': true,
        'custom-header-menu-list-noShadow': level > 1
      }
    }, item)
  }

  return res
}
