<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import util from '@/libs/util'
export default {
  name: 'app',
  watch: {
    '$i18n.locale': 'i18nHandle'
  },
  created () {
    this.i18nHandle(this.$i18n.locale)
  },
  methods: {
    i18nHandle (val, oldVal) {
      util.cookies.set('lang', val)
      document.querySelector('html').setAttribute('lang', val)
    }
  }
}
</script>

<style lang="scss">
@import '~@/assets/style/public-class.scss';

/* 修改开关 */
.el-switch__label--left {
  position: absolute;
  left: 20px;
  font-size: 12px;
  color: #fff;
  z-index: -1111;
}
.el-switch__label--right {
  position: absolute;
  right: 20px;
  font-size: 12px;
  color: #fff;
  z-index: -1111;
}
.el-switch__label.is-active {
  z-index: 1;
  font-size: 12px;
  color: #fff !important;
}

/* 框架内 table 高度 */
.table-container {
  height: calc(100vh - 60px - 21px - 74px - 73px) !important;
}

/** 框架外 table 高度 */
.out-table-container {
  height: calc(100vh - 57px - 54px - 20px);
}

/** element form item margin bottom  */
.el-form-item--mini.el-form-item,
.el-form-item--small.el-form-item {
  margin-bottom: 10px !important;
}

/** 全局 dialog header 样式  */
.el-dialog__header {
  background: rgb(236, 241, 246);
}
.el-dialog__header .el-dialog__title {
  color: #606266;
}

.el-drawer__header {
  background: rgb(236, 241, 246);
  margin-bottom: 12px;
  padding: 20px !important;
}
.el-drawer__header span {
  outline: none;
}

/** el-select el-input */
.el-select,
.el-input {
  margin-right: 10px;
}

.custom-radio .el-radio__label {
  display: none;
}

.el-input-group__append {
  padding: 0 0 !important;
  cursor: pointer;
}

.el-input-group__append i {
  padding: 0 20px;
}

.custom-select input {
  height: 38px !important;
}

.custom-form .el-form-item__label {
  padding: 0 0 0 0 !important;
}

.custom-upload .el-upload {
  height: 100%;
}

/** 料单管理控制页面颜色  */
.red {
  background: #f56c6c;
}

.red-txt {
  color: #f56c6c;
}

.white-txt .vxe-cell {
  color: #fff !important;
}

button.btn-ref {
  color: #f56c6c !important;
  background: #fff !important;
}

.green {
  background: #67c23a;
}

.oragin {
  background: #e6a23c;
}

.green-txt {
  color: #67c23a;
}

::-webkit-scrollbar {
  width: 10px;
  height: 10px;
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: transparent;
  border-radius: 4px;
}

:hover::-webkit-scrollbar-thumb {
  background: hsla(0, 0%, 53%, 0.4);
}

:hover::-webkit-scrollbar-track {
  background: hsla(0, 0%, 53%, 0.1);
}

.x-flex-center {
  display: flex;
  align-items: center;
}

.custom-span-x {
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: space-between;
}

.star-yes {
  color: #409eff !important;
}

.custom-collec-tit {
  height: 50px !important;
  flex-direction: row !important;
  width: 180px;
}

.custom-collec-tit i {
  margin-bottom: 3px !important;
  margin-right: 10px;
}

.el-notification__group {
  width: 100%;
}

/** 自定义菜单 **/
.el-menu--popup {
  padding: 0 0 0 0 !important;
}

.custom-header-menu-list {
  /*position: absolute;*/
  padding: 5px 0 5px 0;
  z-index: 999;
  background: #fff;
  box-shadow: 0 0 4px #e5e5e5;
  border-radius: 4px;
}

.custom-header-menu-list-noShadow {
  box-shadow: none !important;
}

.custom-header-menu-item {
  min-width: 200px;
  padding: 5px 0 5px 10px;
  color: #909399;
  font-size: 14px;
  position: relative;
}

.custom-header-menu-item-noFloat {
  display: block;
}

/*.custom-header-menu-item:before {*/
/*  content: '';*/
/*  position: absolute;*/
/*  height: 80%;*/
/*  top: 10%;*/
/*  border-left: 4px solid #409EFF;*/
/*}*/

.custom-header-menu-item-noBorder:before {
  border-left: 4px solid transparent !important;
}

.custom-header-menu-item:hover {
  color: #293849;
  /*background: #ecf5ff;*/
}

.cur {
  cursor: pointer;
  padding-right: 10px;
}
.cur:hover {
  background: #ecf5ff;
}

.custom-header-menu-span {
  padding-left: 10px;
}

.maxSizeDialog .el-dialog {
  margin-top: 0 !important;
  margin-bottom: 0 !important;
  min-height: 100vh;
}

.vxe-input--panel.type--date,
.vxe-input--panel.type--month,
.vxe-input--panel.type--week,
.vxe-input--panel.type--year {
  z-index: 99999999 !important;
}
</style>
