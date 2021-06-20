<template>
  <d2-container>
    <template slot="header">
      <custom-container-header exportMehodsName="exportData"
                               importBtnName="SmtResourceRouteImport"
                               exportBtnName="SmtResourceRouteExport"
                               exportTplName="SmtResourceRouteExportTPL">
        <el-select v-model="formData.OBJECT_ID"
                   clearable
                   style="width:200px"
                   :placeholder="$t('as_srr.pk')">
          <el-option v-for="item in NameList"
                     :key="item.ID"
                     :label="item.NAME"
                     :value="item.ID" />
        </el-select>&nbsp;
        <el-button type="primary"
                   icon="el-icon-search"
                   @click.prevent="searchClick">{{ $t('as_srr.hd_sf') }}</el-button>
        <el-button type="success"
                   icon="el-icon-plus"
                   @click="insertEvent(null)"
                   v-if="$btnList.indexOf('SmtResourceRouteAdd') !== -1">{{ $t('as_srr.add') }}</el-button>
        <el-button type="primary"
                   icon="el-icon-check"
                   @click.prevent="preserveClick"
                   v-if="$btnList.indexOf('SmtResourceRouteEdit') !== -1">{{ $t('as_srr.save') }}</el-button>
      </custom-container-header>
    </template>
    <div class="table-container">
      <vxe-table ref="xTable"
                 border
                 resizable
                 height="100%"
                 size="medium"
                 align="center"
                 highlight-hover-row
                 highlight-current-row
                 show-overflow
                 auto-resize
                 keep-source
                 stripe
                 :loading="loading"
                 :data="mainTable"
                 :edit-rules="validRules"
                 :mouse-config="{selected: true}"
                 :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
                 :radio-config="{labelField: 'name', trigger: 'row'}"
                 :checkbox-config="{checkField: 'checked', trigger: 'row'}"
                 @edit-actived="editActivedEvent">
        <vxe-table-column :min-width="120"
                          type="seq"
                          :title=" $t('as_srr.tb_sb')" />
        <vxe-table-column field="ORDER_NO"
                          :title="$t('as_srr.tb_st')"
                          min-width="120"
                          :edit-render="{name: 'input'}"
                          sortable />
        <vxe-table-column min-width="150"
                          field="OBJECT_ID"
                          :title="$t('as_srr.tb_main')"
                          :edit-render="{name: 'select', options: typeList}" />
        <vxe-table-column min-width="150"
                          field="CURRENT_OPERATION"
                          :title="$t('as_srr.tb_co')"
                          :edit-render="{name: 'select', options: currentList}" />
        <vxe-table-column min-width="150"
                          field="NEXT_OPERATION"
                          :title="$t('as_srr.tb_np')"
                          :edit-render="{name: 'select', options: currentList}" />
        <vxe-table-column :title="$t('as_srr.tb_og')"
                          min-width="120"
                          align="center"
                          fixed="right">
          <template v-slot="{ row }">
            <el-button type="danger"
                       @click="removeClick(row, row.$index)"
                       v-if="$btnList.indexOf('SmtResourceRouteRemove') !== -1">{{ $t('as_srr.tb_rm') }}</el-button>
          </template>
        </vxe-table-column>
      </vxe-table>
    </div>
    <template slot="footer">
      <el-pagination :current-page="formData.Page"
                     :page-size="formData.Limit"
                     :page-sizes="[15, 25, 35, 45]"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="totalPage"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange" />
    </template>
  </d2-container>
</template>

<script>
import pagination from '@/views/mixin/page'
import helper from '@/api/Helper'
import customContainerHeader from '@/components/custom-container-header'
const API = helper('SmtResourceRoute')
export default {
  name: 'SmtResourceRoute',
  mixins: [pagination],
  components: {
    customContainerHeader
  },
  data () {
    return {
      formData: {
        OBJECT_ID: '',
        ...this.formData
      },
      loading: false,
      mainTable: [],
      NameList: [],
      typeList: [],
      currentList: [],
      validRules: {
        ORDER_NO: [
          {
            required: true,
            message: this.$t('as_srr.p_sort')
          }
        ],
        OBJECT_ID: [
          {
            required: true,
            message: this.$t('as_srr.p_name')
          }
        ],
        CURRENT_OPERATION: [
          {
            required: true,
            message: this.$t('as_srr.p_co')
          }
        ],
        NEXT_OPERATION: [
          {
            required: true,
            message: this.$t('as_srr.p_np')
          }
        ]
      },
      form: {
        insertRecords: [],
        updateRecords: [],
        removeRecords: []
      }
    }
  },
  methods: {
    async getIndex () {
      const res = await API.Index()
      if (res.Result) {
        this.NameList = res.Result.NameList
        this.typeList.push({
          label: '',
          value: '',
          disabled: false
        })
        this.NameList.map(item => {
          this.typeList.push({
            label: item.NAME,
            value: item.ID,
            disabled: false
          })
        })
        this.ProcessList = res.Result.ProcessList

        this.currentList.push({
          label: '',
          value: '',
          disabled: false
        })
        this.ProcessList.map(item => {
          this.currentList.push({
            label: item.NAME,
            value: item.ID,
            disabled: false
          })
        })
        this.getLoadData()
      }
    },
    async getLoadData () {
      this.loading = true
      const res = await API.LoadData(this.formData)
      this.loading = false
      this.mainTable = res.Result ? JSON.parse(res.Result) : []
      this.totalPage = res.TotalCount || 0
    },
    async exportData () {
      this.loading = true
      const res = await API.ExportData(this.formData)
      this.loading = false
      this.mainTable = res.Result || []
      this.totalPage = res.TotalCount || 0
    },
    insertEvent (row) {
      const index = this.$refs.xTable.getTableData().fullData.length
      const record = {
        ID: 0,
        ORDER_NO: index + 1,
        OBJECT_ID: null,
        CURRENT_OPERATION: null,
        NEXT_OPERATION: null
      }
      this.$refs.xTable.insertAt(record, row).then(({ row }) => {
        this.$refs.xTable.setActiveRow(row)
      })
    },
    // 搜索
    searchClick () {
      this.formData.Page = 1
      this.getLoadData()
    },
    preserveClick () {
      const nameList = []
      this.NameList.map(item => {
        nameList[parseInt(item.ID)] = item // 做映射 为了做提示
      })
      const processList = []
      this.ProcessList.map(item => {
        processList[parseInt(item.ID)] = item // 做映射 为了做提示
      })
      // eslint-disable-next-line camelcase
      const { ins_arr, up_arr } = this.updateRoleList()
      if (ins_arr.length || up_arr.length) {
        if (ins_arr[0]) {
          const row = ins_arr[0].row
          const OBJECT_ID = parseInt(row.OBJECT_ID)
          const CURRENT_OPERATION = parseInt(row.CURRENT_OPERATION)

          this.$message({
            type: 'error',
            message:
              ins_arr[0].type === 1
                ? this.$t('as_srr.p_sort') +
                `${ins_arr[0].index + 1}` +
                this.$t('as_srr.cf_name') +
                `[${nameList[OBJECT_ID].NAME}] ` +
                this.$t('as_srr.cf_con') +
                `[${processList[CURRENT_OPERATION].NAME}]` +
                this.$t('as_srr.cf_rt')
                : this.$t('as_srr.cf_addtb') +
                `${ins_arr[0].index + 1}` +
                this.$t('as_srr.cf_daname') +
                `[${nameList[OBJECT_ID].NAME}] ` +
                this.$t('as_srr.cf_wt') +
                `[${row.ORDER_NO}]` +
                this.$t('as_srr.cf_rt')
          })
          return false
        }
        if (up_arr[0]) {
          const row = up_arr[0].row
          const OBJECT_ID = parseInt(row.OBJECT_ID)
          const CURRENT_OPERATION = parseInt(row.CURRENT_OPERATION)
          console.log('up_arr[0]', up_arr[0])
          this.$message({
            type: 'error',
            message:
              up_arr[0].type === 1
                ? this.$t('as_srr.cf_my') +
                `${up_arr[0].index + 1}` +
                this.$t('as_srr.cf_daname') +
                `[${nameList[OBJECT_ID].NAME}] ` +
                this.$t('as_srr.cf_con') +
                `[${processList[CURRENT_OPERATION].NAME}] ` +
                this.$t('as_srr.cf_rt')
                : this.$t('as_srr.cf_my') +
                `${up_arr[0].index + 1}` +
                this.$t('as_srr.cf_daname') +
                `[${nameList[OBJECT_ID].NAME}] ` +
                this.$t('as_srr.cf_wt') +
                `[${row.ORDER_NO}] ` +
                this.$t('as_srr.cf_rt')
          })
          return false
        }
        return false
      }
      var postdata = this.$refs.xTable.getRecordset()
      if (
        postdata.insertRecords.length ||
        postdata.removeRecords.length ||
        postdata.updateRecords.length
      ) {
        this.$refs.xTable.validate(async valid => {
          if (valid) {
            this.form.insertRecords = postdata.insertRecords
            this.form.updateRecords = postdata.updateRecords
            // this.form.removeRecords = postdata.removeRecords
            const response = await API.SaveData(this.form)
            if (response.Result) {
              this.form = {}
              this.getLoadData()
              this.$notify({
                title: this.$t('as_srr.su'),
                message: this.$t('as_srr.subsu'),
                type: 'success',
                duration: 2000
              })
            }
          }
        })
      } else {
        this.$message({
          showClose: true,
          message: this.$t('as_srr.data'),
          type: 'warning'
        })
      }
    },
    removeClick (row) {
      var postdata = this.$refs.xTable.getRecordset()
      if (row) {
        this.$confirm(this.$t('as_srr.fidelete'), this.$t('as_srr.prompt'), {
          confirmButtonText: this.$t('as_srr.confirm'),
          cancelButtonText: this.$t('as_srr.cancel'),
          type: 'warning'
        }).then(async () => {
          if (row.ID === 0) {
            this.$refs.xTable.remove(row)
            this.$notify({
              title: this.$t('as_srr.success'),
              message: this.$t('as_srr.sudeleted'),
              type: 'success',
              duration: 2000
            })
          } else {
            this.$refs.xTable.remove(row)
            this.form.removeRecords = postdata.removeRecords
            this.form.insertRecords = []
            this.form.updateRecords = []
            const response = await API.SaveData(this.form)
            if (response.Result) {
              this.form = {}
              this.getLoadData()
              this.$notify({
                title: this.$t('as_srr.success'),
                message: this.$t('as_srr.sudeleted'),
                type: 'success',
                duration: 2000
              })
            }
          }
        })
      }
    },
    editActivedEvent ({ row }) {
      // 激活编辑时检查剩余选项是否可选择
      this.updateRoleList()
    },
    updateRoleList () {
      const { insertRecords, updateRecords } = this.$refs.xTable.getRecordset()
      const { fullData } = this.$refs.xTable.getTableData() // 包括 新增 和 修改
      // eslint-disable-next-line camelcase
      const up_arr = []
      // eslint-disable-next-line camelcase
      const ins_arr = []
      insertRecords.map((_item, _index) => {
        fullData.map((item, index) => {
          if (item._XID && item._XID !== _item._XID) {
            // x_ID 行 唯一 ID  排除 自己跟自己对比
            if (
              parseInt(item.OBJECT_ID) === parseInt(_item.OBJECT_ID) &&
              parseInt(item.CURRENT_OPERATION) ===
              parseInt(_item.CURRENT_OPERATION)
            ) {
              ins_arr.push({
                ID: item.ID,
                index: index,
                type: 1,
                row: item
              })
            }
            if (
              parseInt(item.OBJECT_ID) === parseInt(_item.OBJECT_ID) &&
              parseInt(item.ORDER_NO) === parseInt(_item.ORDER_NO)
            ) {
              ins_arr.push({
                ID: item.ID,
                index: index,
                type: 2,
                row: item
              })
            }
          }
        })
      })

      updateRecords.map((_item, _index) => {
        fullData.map((item, index) => {
          if (item._XID && item._XID !== _item._XID) {
            if (
              parseInt(item.OBJECT_ID) === parseInt(_item.OBJECT_ID) &&
              parseInt(item.CURRENT_OPERATION) ===
              parseInt(_item.CURRENT_OPERATION)
            ) {
              up_arr.push({
                ID: _item.ID,
                index: index,
                type: 1,
                row: _item
              })
            }
            if (
              parseInt(item.OBJECT_ID) === parseInt(_item.OBJECT_ID) &&
              parseInt(item.ORDER_NO) === parseInt(_item.ORDER_NO)
            ) {
              up_arr.push({
                ID: _item.ID,
                index: index,
                type: 2,
                row: _item
              })
            }
          }
        })
      })
      return {
        ins_arr,
        up_arr
      }
    }
  },
  created () {
    this.getIndex()
  }
}
</script>
