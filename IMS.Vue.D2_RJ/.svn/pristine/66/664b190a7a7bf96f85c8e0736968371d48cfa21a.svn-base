<!--
 * @Author: your name
 * @Date: 2020-04-02 19:09:32
 * @LastEditTime: 2020-04-17 08:40:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \IMS.Vue.D2\src\views\SfcsAllObjects\Index.vue
 -->
<template>
  <d2-container class="SfcsAllObjects">
    <template slot="header">
      <custom-container-header exportMehodsName="exportData"
                               tableName="SFCS_ALL_OBJECTS"
                               importBtnName="SfcsAllObjectsImport"
                               exportBtnName="SfcsAllObjectsExport"
                               exportTplName="SfcsAllObjectsExportTPL">
        <el-input v-model="formData.Key"
                  :placeholder="$t('sao._1')"
                  clearable
                  style="width:200px"
                  @keyup.enter.native="searchClick" />&nbsp;
        <el-select v-model="formData.OBJECT_CATEGORY"
                   clearable
                   :placeholder="$t('sao._16')">
          <el-option v-for="item in BjectCategoryList"
                     :key="item.CODE"
                     :label="item.NAME"
                     :value="item.CODE" />
        </el-select>&nbsp;
        <el-button type="primary"
                   icon="el-icon-search"
                   @click.prevent="searchClick">{{ $t('sao._2') }}</el-button>
        <el-button type="success"
                   @click="insertEvent(0)"
                   icon="el-icon-plus"
                   v-if="$btnList.indexOf('SfcsAllObjectsAdd') !== -1">{{ $t('sao._3') }}</el-button>
        <el-button type="primary"
                   icon="el-icon-check"
                   @click.prevent="preserveClick"
                   v-if="$btnList.indexOf('SfcsAllObjectsEdit') !== -1">{{ $t('sao._4') }}</el-button>
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
        <vxe-table-column field="OBJECT_NAME"
                          :title="$t('sao._5')"
                          :edit-render="{name: 'input'}" />

        <vxe-table-column field="OBJECT_MARK"
                          :title="$t('sao._6')"
                          :edit-render="{name: 'input'}" />
        <vxe-table-column field="OBJECT_CATEGORY"
                          :title="$t('sao._7')"
                          :edit-render="{name: 'select', options: BjectCategoryListbox}" />
        <vxe-table-column field="ISACTIVE"
                          :title="$t('sao._8')"
                          :edit-render="{autofocus: '.custom-input', type: 'visible'}">
          <template v-slot:edit="{ row}">
            <div class="rddselect">
              <el-switch v-model="row.ISACTIVE"
                         :active-text="$t('sao._10')"
                         :inactive-text="$t('sao._11')"
                         active-color="#13ce66"
                         inactive-color="#cccccc"
                         active-value="Y"
                         inactive-value="N" />
            </div>
          </template>
        </vxe-table-column>
        <vxe-table-column field="DESCRIPTION"
                          :title="$t('sao._9')"
                          :edit-render="{name: 'input'}" />
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
import helper from '@/api/Helper'
import customContainerHeader from '@/components/custom-container-header'
const API = helper('SfcsAllObjects')
export default {
  name: 'SfcsAllObjects',
  components: {
    customContainerHeader
  },
  data () {
    return {
      BjectCategoryList: [],
      BjectCategoryListbox: [],

      loading: false,
      mainTable: [],
      total: 0,
      formData: {
        OBJECT_CATEGORY: '',
        Key: '',
        Page: 1,
        Limit: 15
      },
      validRules: {
        OBJECT_NAME: [
          {
            required: true,
            message: this.$t('sao._1')
          }
        ],
        OBJECT_MARK: [
          {
            required: true,
            message: this.$t('sao._15')
          }
        ],
        OBJECT_CATEGORY: [
          {
            required: true,
            message: this.$t('sao._16')
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
        this.BjectCategoryList = res.Result.BjectCategoryList
        this.getLoadData()
        this.BjectCategoryListbox.push({
          label: '',
          value: '',
          disabled: false
        })
        this.BjectCategoryList.map(item => {
          this.BjectCategoryListbox.push({
            label: item.NAME,
            value: Number(item.CODE),
            disabled: false
          })
        })
      }
    },
    async getLoadData () {
      this.loading = true
      const res = await API.LoadData(this.formData)
      this.loading = false
      if (res.Result) {
        this.mainTable = res.Result
        this.total = res.TotalCount
      }
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
                this.getLoadData()
                this.$notify({
                  title: this.$t('sao._12'),
                  message: this.$t('sao._13'),
                  type: 'success',
                  duration: 2000
                })
              }
            })
          }
        })
      } else {
        this.$message({
          showClose: true,
          message: this.$t('sao._14'),
          type: 'warning'
        })
      }
    },
    // 新增
    async insertEvent (row) {
      const record = {
        ID: 0,
        OBJECT_NAME: '',
        OBJECT_MARK: '',
        OBJECT_CATEGORY: 0,
        ISACTIVE: 'N',
        DESCRIPTION: ''
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
