<template>
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
                height="400"
                highlight-current-row
                @current-change="selectRow">
        <el-table-column v-for="(field,index) in fields"
                         sortable
                         :key="index"
                         :prop="field.prop"
                         :label="field.label"
                         :width="field.width || 180"></el-table-column>
      </el-table>
      <el-pagination layout="total , prev, pager, next , jumper"
                     class="data-item-pager"
                     :pager-count="5"
                     :page-size="limit"
                     :current-page.sync="page"
                     :total="total"
                     @current-change="pageTo"></el-pagination>
    </template>
  </el-select>
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
      labelKey: ''
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
      if (this.loading) {
        return
      }
      this.getData()
    },
    getData () {
      this.loading = true
      if (this.name === 'vendor') {
        this.getVendorList()
      } else {
        this.getImsPartList()
      }
    },
    doClear () { },
    doChange () { },
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
    }
  }
}
</script>

<style scoped lang="scss">
.root {
  width: 100%;
}
.global-search {
  padding: 5px 5px 0px 5px;
  width: calc(100% - 10px);
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
    height: 28px;
  }
}
.data-item-table {
  width: 540px;
  padding: 0px 5px 0px 5px;
  background: #f2f6fc;
  ::v-deep .el-table__header-wrapper {
    th {
      background: #f2f6fc;
      color: #303133;
    }
  }
  ::v-deep .el-table__body-wrapper {
    padding-right: 5px;
    overflow: auto;
    height: 354px !important;
  }
}
.data-item-pager {
  padding: 2px 5px 5px 5px;
  display: flex;
  justify-content: space-between;
}
</style>
<style lang="scss">
.my-selector-popup {
  background: #f2f6fc;
  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
    background: transparent;
  }
}
</style>
