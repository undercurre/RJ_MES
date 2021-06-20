<!--
 * @Author: your name
 * @Date: 2020-03-31 08:45:15
 * @LastEditTime: 2020-03-31 08:54:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \IMS.Vue.D2\src\views\SfcsLookups\Index.vue
 -->
<template>
  <d2-container class="SfcsModel">
    <template slot="header">
      <custom-container-header importBtnName="SfcsModelImport"
                               exportBtnName="SfcsModelExport"
                               exportTplName="SfcsModelExportTPL">
        <el-input v-model="formData.Key"
                  :placeholder="$t('sml._1')"
                  clearable
                  style="width:200px"
                  @keyup.enter.native="searchClick" />&nbsp;
        <el-button type="primary"
                   icon="el-icon-search"
                   @click.prevent="searchClick">{{ $t('sml._2') }}</el-button>
        <el-button type="success"
                   @click="insertEvent(0)"
                   icon="el-icon-plus"
                   v-if="$btnList.indexOf('SfcsModelAdd') !== -1">{{ $t('sml._3') }}</el-button>
        <el-button type="primary"
                   icon="el-icon-check"
                   @click.prevent="preserveClick"
                   v-if="$btnList.indexOf('SfcsModelEdit') !== -1">{{ $t('sml._4') }}</el-button>
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
        <vxe-table-column field="MODEL"
                          :title="$t('sml._5')"
                          :edit-render="{name: 'input'}" />
        <vxe-table-column field="DESCRIPTION"
                          :title="$t('sml._6')"
                          :edit-render="{name: 'input'}" />
        <vxe-table-column field="ENABLED"
                          :title="$t('sml._9')"
                          :edit-render="{autofocus: '.custom-input', type: 'visible'}">
          <template v-slot:edit="{ row}">
            <div class="rddselect">
              <el-switch v-model="row.ENABLED"
                         :active-text="$t('sml._10')"
                         :inactive-text="$t('sml._11')"
                         active-color="#13ce66"
                         inactive-color="#cccccc"
                         active-value="Y"
                         inactive-value="N" />
            </div>
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
import helper from '@/api/SfcsModel'
import customContainerHeader from '@/components/custom-container-header'
const API = helper('SfcsModel')
export default {
  name: 'SfcsModel',
  components: {
    customContainerHeader
  },
  data () {
    return {
      loading: false,
      mainTable: [],
      total: 0,
      formData: {
        KIND: '',
        Key: '',
        Page: 1,
        Limit: 10
      },
      validRules: {
        MODEL: [
          {
            required: true,
            message: this.$t('sml._20')
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
        this.getLoadData()
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
    // 搜索
    searchClick () {
      this.formData.Page = 1
      this.getLoadData()
    },
    handleSizeChange (val) {
      this.formData.Limit = val
      this.getLoadData()
    },
    handleCurrentChange (val) {
      this.formData.Page = val
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
                this.form = {}
                that.$notify({
                  title: this.$t('sml._12'),
                  message: this.$t('sml._13'),
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
          message: this.$t('sml._14'),
          type: 'warning'
        })
      }
    },
    // 新增
    async insertEvent (row) {
      const record = {
        ID: 0,
        MODEL: '',
        DESCRIPTION: '',
        ENABLED: 'N'
      }
      this.$refs.xTable.insertAt(record, row).then(({ row }) => {
        this.$refs.xTable.setActiveRow(row)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
