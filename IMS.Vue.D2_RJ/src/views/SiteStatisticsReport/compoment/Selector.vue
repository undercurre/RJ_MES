<template>
  <div class="selector-root">
    <el-select ref="selector"
               v-model="myValue"
               class="root"
               popper-class="my-selector-popup"
               default-first-option
               clearable
               :placeholder="placeholder"
               @visible-change="doOpen"
               @clear="doClear"
               @change="doChange">
      <template #empty>

      </template>
    </el-select>
    <el-dialog :show-close="false"
               width="540px"
               class="selector-dialog"
               :visible.sync="visible"
               ref="dialog"
               >
      <template #title>
        <div class="draggable-header"
             @mousedown="dragStart"></div>
      </template>
      <div class="global-search">
        <el-input size="mini"
                  v-model="key"
                  clearable
                  placeholder="请输入关键字"
                  @input="search"></el-input>
        <el-button class="search-button"
                   @click.stop="search(false)">搜索</el-button>
      </div>
      <el-table :data="datasource"
                class="data-item-table"
                size="mini"
                height="383"
                highlight-current-row
                @current-change="selectRow">
        <el-table-column v-for="field in fields"
                         sortable
                         :key="field.prop"
                         :prop="field.prop"
                         :label="field.label"
                         :width="field.width || 180"></el-table-column>
      </el-table>
      <template #footer>
        <el-pagination layout="total , prev, pager, next , jumper"
                       class="data-item-pager"
                       :pager-count="5"
                       :page-size="limit"
                       :current-page.sync="page"
                       :total="total"
                       @current-change="pageTo">
        </el-pagination>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { getVendorList, getImsPartList } from '@/api/MaterialBarcode'
export default {
  props: {
    name: {
      type: String,
      required: true,
      default: 'vendor'
    },
    value: {
      type: String,
      required: true,
      default: ''
    },
    placeholder: {
      type: String,
      required: false,
      default: '请选择'
    }
  },
  data () {
    return {
      myValue: '',
      datasource: [{}],
      page: 1,
      limit: 10,
      fields: [],
      loading: false,
      total: 0,
      key: '',
      searchTimer: null,
      valueKey: '',
      labelKey: '',
      visible: false
    }
  },
  mounted () {
    switch (this.name) {
      case 'vendor':
        this.fields = [
          {
            prop: 'CODE',
            label: '供应商',
            width: 80
          },
          {
            prop: 'DESCRIPTION',
            label: '供应商名称',
            width: 230
          },
          {
            prop: 'VENDOR_INFO',
            label: '供应商信息',
            width: 310
          }
        ]
        this.valueKey = 'ID'
        this.labelKey = 'CODE'
        break
      case 'part':
        this.fields = [
          {
            prop: 'CODE',
            label: '料号',
            width: 120
          },
          {
            prop: 'NAME',
            label: '名称',
            width: 320
          },
          {
            prop: 'DESCRIPTION',
            label: '品名描述',
            width: 400
          }
        ]
        this.valueKey = 'ID'
        this.labelKey = 'CODE'
        break
      default:
        break
    }
  },
  watch: {
    value (newVal, oldVal) {
      if (!newVal) {
        this.myValue = ''
      }
    }
  },
  methods: {
    getVendorList () {
      getVendorList({
        Page: this.page,
        limit: this.limit,
        CODE: this.key,
        DESCRIPTION: this.key
      })
        .then((res) => {
          const result = res.Result
          if (result) {
            const vendors = JSON.parse(result)
            this.datasource = vendors
            this.total = res.TotalCount
          }
          this.loading = false
        })
        .catch((err) => {
          console.log(err)
          this.loading = false
        })
    },
    getImsPartList () {
      getImsPartList({
        Page: this.page,
        limit: this.limit,
        CODE: this.key,
        DESCRIPTION: this.key
      })
        .then((res) => {
          const result = res.Result
          if (result) {
            const parts = JSON.parse(result)
            this.datasource = parts
            this.total = res.TotalCount
          }
          this.loading = false
        })
        .catch((err) => {
          console.log(err)
          this.loading = false
        })
    },
    doOpen (visible) {
      if (!visible) {
        this.page = 1
        this.key = ''
        return
      }
      this.$refs.selector.blur()
      let dialog = this.$refs.dialog.$refs.dialog
      dialog.style.left = 'calc(50% - 270px)'
      dialog.style.top = 'calc(50% - 250px)'
      this.visible = true
    },
    getData () {
      this.loading = true
      if (this.name === 'vendor') {
        this.getVendorList()
      } else {
        this.getImsPartList()
      }
    },
    doClear () {},
    doChange () {},
    search (wait) {
      this.page = 1
      const timing = wait ? 800 : 0
      if (this.searchTimer) {
        clearTimeout(this.searchTimer)
      }
      this.searchTimer = setTimeout(() => {
        this.getData()
      }, timing)
    },
    pageTo () {
      this.getData()
    },
    selectRow (currentRow) {
      if (!currentRow) {
        return
      }
      this.myValue = currentRow[this.labelKey]
      this.$emit('input', currentRow[this.valueKey])
      this.$refs.selector.blur()
    },
    dragStart (e) {
      let dialog = this.$refs.dialog.$refs.dialog
      // 算出鼠标相对元素的位置
      let disX = e.clientX - dialog.offsetLeft
      let disY = e.clientY - dialog.offsetTop
      document.onmousemove = (e) => {
        // 用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
        let left = e.clientX - disX
        let top = e.clientY - disY
        // 移动当前元素
        dialog.style.left = `${left}px`
        dialog.style.top = `${top}px`
      }
      document.onmouseup = (e) => {
        document.onmousemove = null
        document.onmouseup = null
      }
    }
  }
}
</script>

<style scoped lang="scss">
.root {
  width: 100%;
}
.selector-dialog {
  border-radius: 8px;
  ::v-deep .el-dialog {
    height: 500px;
    display: flex;
    flex-flow: column;
    position: absolute;
    margin: 0!important;
    left: calc(50% - 270px);
    top: calc(50% - 250px);
    background: none;
  }
  ::v-deep .el-dialog__header {
    border-radius: 4px;
    padding:0;
  }
  ::v-deep .el-dialog__body {
    padding: 2px;
    overflow: hidden;
  }
  ::v-deep .el-dialog__footer {
    padding: 0;
    background: #606266;
    border-radius: 0px 0px 4px 4p;
  }
  .draggable-header {
    height: 2rem;
    background: #E6A23C;
    border-radius: 4px 4px 0 0;
  }
  .global-search {
    padding: 1px;
    display: flex;
    .el-input {
      flex: 1;
      margin: 0;
      ::v-deep .el-input__inner {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        border: none;
        background: #fefefe;
      }
      ::v-deep .el-input__validateIcon {
        display: none;
      }
    }
    .el-button {
      border: none;
      background: #c0c4cc;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      height: 100%;
    }
  }
  .data-item-table {
    //padding: 0px 5px 0px 5px;
    background: #f2f6fc;
    ::v-deep .el-table__header-wrapper {
      th {
        background: #f2f6fc;
        color: #303133;
      }
    }
    ::v-deep .el-table__body-wrapper {

    }
  }
  .data-item-pager {
    padding: 2px 5px 5px 5px;
    display: flex;
    justify-content: space-between;
  }
  ::v-deep .el-dialog__body {
    background: #f2f6fc;
    ::-webkit-scrollbar {
      width: 10px;
      height: 10px;
      background: transparent;
    }
  }
}
</style>
