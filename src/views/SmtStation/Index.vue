<template>
  <d2-container class="SmtStation">
    <template slot="header">
      <custom-container-header exportMehodsName="exportData"
                               importBtnName="SmtStationImport"
                               exportBtnName="SmtStationExport"
                               exportTplName="SmtStationExportTPL">
        <el-input v-model="formData.SMT_NAME"
                  :placeholder="$t('ssn._1')"
                  clearable
                  style="width:200px"
                  @keyup.enter.native="searchClick" />&nbsp;
        <el-select v-model="formData.TYPE"
                   clearable
                   :placeholder="$t('ssn._2')">
          <el-option v-for="item in StatusList"
                     :key="item.ID"
                     :label="item.NAME"
                     :value="item.ID" />
        </el-select>&nbsp;
        <el-button type="primary"
                   icon="el-icon-search"
                   @click.prevent="searchClick">{{ $t('ssn._3') }}</el-button>
        <el-button type="success"
                   @click="insertEvent(0)"
                   icon="el-icon-plus"
                   v-if="$btnList.indexOf('SmtStationAdd') !== -1">{{ $t('ssn._4') }}</el-button>
        <el-button type="primary"
                   icon="el-icon-check"
                   v-if="$btnList.indexOf('SmtStationEdit') !== -1"
                   @click.prevent="preserveClick">{{ $t('ssn._5') }}</el-button>
      </custom-container-header>
    </template>
    <div class="table-container">
      <vxe-table ref="xTable"
                 border
                 resizable
                 height="100%"
                 size="medium"
                 align="center"
                 highlight-current-row
                 highlight-hover-row
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
                 :checkbox-config="{checkField: 'checked', trigger: 'row'}">
        <vxe-table-column field="SMT_NAME"
                          :title="$t('ssn._6')"
                          :edit-render="{name: 'input'}" />
        <vxe-table-column field="TYPE"
                          :title="$t('ssn._7')"
                          :edit-render="{name: 'select', options: Statusbox}" />

        <vxe-table-column field="DESCRIPTION"
                          :title="$t('ssn._8')"
                          :edit-render="{name: 'input'}" />
        <vxe-table-column field="ENABLED"
                          :title="$t('ssn._9')"
                          :edit-render="{autofocus: '.custom-input', type: 'visible'}">
          <template v-slot:edit="{ row}">
            <div class="rddselect">
              <el-switch v-model="row.ENABLED"
                         :active-text="$t('ssn._10')"
                         :inactive-text="$t('ssn._11')"
                         active-color="#13ce66"
                         inactive-color="#cccccc"
                         active-value="Y"
                         inactive-value="N" />
            </div>
          </template>
        </vxe-table-column>
        <vxe-table-column :title="$t('plbd.tb_og')"
                          width="120"
                          align="center"
                          fixed="right">
          <template v-slot="{ row }">
            <el-button type="danger"
                       @click="removeClick(row, row.$index)"
                       v-if="$btnList.indexOf('SmtStationRemove') !== -1">{{ $t('plbd.tb_rm') }}</el-button>
          </template>
        </vxe-table-column>
      </vxe-table>
    </div>
    <template slot="footer">
      <el-pagination :current-page="formData.Page"
                     :page-size="formData.Limit"
                     :page-sizes="[15, 25, 35, 45]"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange" />
    </template>
  </d2-container>
</template>
<script>
import helper from '@/api/SmtStation'
import pagination from '@/views/mixin/page'
import customContainerHeader from '@/components/custom-container-header'
const API = helper('SmtStation')
export default {
  name: 'SmtStation',
  mixins: [pagination],
  components: {
    customContainerHeader
  },
  data () {
    return {
      StatusList: [],
      Statusbox: [],

      loading: false,
      mainTable: [],
      total: 0,
      formData: {
        SMT_NAME: '',
        TYPE: '',
        Key: '',
        Page: 1,
        Limit: 15
      },
      validRules: {
        SMT_NAME: [
          {
            required: true,
            message: this.$t('ssn._1')
          }
        ],
        TYPE: [
          {
            required: true,
            message: this.$t('ssn._2')
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
  created () {
    this.getIndex()
  },
  methods: {
    async getIndex () {
      const res = await API.Index()
      if (res.Result) {
        this.StatusList = res.Result.StatusList
        console.log(res, 'resresres')
        this.getLoadData()
        this.Statusbox.push({
          label: '',
          value: '',
          disabled: false
        })
        this.StatusList.map(item => {
          this.Statusbox.push({
            label: item.NAME,
            value: Number(item.ID),
            disabled: false
          })
        })
      }
    },
    async getLoadData () {
      this.loading = true
      const res = await API.LoadData(this.formData)
      this.mainTable = res.Result
      console.log(this.mainTable, '获取表格')
      this.total = res.TotalCount
      this.loading = false
    },
    async exportData () {
      this.loading = true
      const res = await API.ExportData(this.formData)
      this.loading = false
      this.mainTable = res.Result || []
      this.totalPage = res.TotalCount || 0
    },
    // 搜索
    searchClick () {
      this.getLoadData()
    },
    //  保存
    preserveClick () {
      var that = this
      var postdata = this.$refs.xTable.getRecordset()
      if (
        postdata.insertRecords.length ||
        postdata.removeRecords.length ||
        postdata.updateRecords.length
      ) {
        this.$refs.xTable.validate(valid => {
          if (valid) {
            this.form.insertRecords = postdata.insertRecords
            this.form.updateRecords = postdata.updateRecords
            this.form.removeRecords = postdata.removeRecords
            API.SaveData(this.form).then(response => {
              if (response.Result) {
                that.form = {}
                that.$notify({
                  title: this.$t('ssn._12'),
                  message: this.$t('ssn._13'),
                  type: 'success',
                  duration: 2000
                })
              }
              that.getLoadData()
            })
          }
        })
      } else {
        this.$message({
          showClose: true,
          message: this.$t('ssn._14'),
          type: 'warning'
        })
      }
    },
    // 新增
    async insertEvent (row) {
      const record = {
        ID: 0,
        SMT_NAME: '',
        TYPE: '',
        DESCRIPTION: '',
        ENABLED: 'N'
      }
      this.$refs.xTable.insertAt(record, row).then(({ row }) => {
        this.$refs.xTable.setActiveRow(row)
      })
    },
    // 删除
    async removeClick (row) {
      console.log(row)
      if (row) {
        this.$confirm(this.$t('ssn._15'), this.$t('ssn._16'), {
          confirmButtonText: this.$t('ssn._17'),
          cancelButtonText: this.$t('ssn._18'),
          type: 'warning'
        })
          .then(async () => {
            if (row.ID === 0) {
              this.$refs.xTable.remove(row)
              this.$notify({
                title: this.$t('ssn._12'),
                message: this.$t('ssn._19'),
                type: 'success',
                duration: 2000
              })
            } else {
              this.$refs.xTable.remove(row)
              var postdata = this.$refs.xTable.getRecordset()
              this.form.insertRecords = []
              this.form.updateRecords = []
              this.form.removeRecords = postdata.removeRecords
              API.SaveData(this.form).then(response => {
                if (response.Result) {
                  this.form = {}
                  this.$notify({
                    title: this.$t('ssn._12'),
                    message: this.$t('ssn._19'),
                    type: 'success',
                    duration: 2000
                  })
                }
                this.getLoadData()
              })
            }
          })
          .catch(() => { })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
