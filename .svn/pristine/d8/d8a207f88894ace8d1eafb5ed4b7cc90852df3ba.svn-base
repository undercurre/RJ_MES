<!--
 * @Author: your name
 * @Date: 2020-04-01 09:13:48
 * @LastEditTime: 2020-04-01 09:16:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \IMS.Vue.D2\src\views\Badcode\Index.vue
 -->
<template>
  <d2-container class="Badcode">
    <template slot="header">
      <custom-container-header exportMehodsName="exportData"
                               tableName="SFCS_DEFECT_CONFIG"
                               exportBtnName="SfcsDefectConfigExport"
                               importBtnName="SfcsDefectConfigImport"
                               exportTplName="SfcsDefectConfigExportTpl">
        <el-input v-model="formData.Key"
                  :placeholder="$t('cdc._1')"
                  clearable
                  style="width:200px"
                  @keyup.enter.native="searchClick" />&nbsp;
        <el-button type="primary"
                   icon="el-icon-search"
                   @click.prevent="searchClick">{{ $t('cdc._2') }}</el-button>
        <el-button type="primary"
                   icon="el-icon-finished"
                   @click="drawer = true">{{ $t("SfcsPn._48") }}</el-button>
        <el-button type="warning"
                   icon="el-icon-refresh"
                   @click.prevent="cleanClick">{{ $t("publics.btn.reset") }}</el-button>
        <el-button v-if="$btnList.indexOf('SfcsDefectConfigAdd') !== -1"
                   type="success"
                   @click="insertEvent(0)">
          <i class="el-icon-plus" />
          &nbsp;{{ $t("cdc._3") }}
        </el-button>
        <el-button v-if="$btnList.indexOf('SfcsDefectConfigSave') !== -1"
                   type="primary"
                   icon="el-icon-check"
                   @click.prevent="preserveClick">{{ $t("cdc._4") }}</el-button>
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
                 :mouse-config="{ selected: true }"
                 :edit-config="{ trigger: 'click', mode: 'row', showStatus: true }"
                 :radio-config="{ labelField: 'name', trigger: 'row' }"
                 :checkbox-config="{ checkField: 'checked', trigger: 'row' }">
        <vxe-table-column field="DEFECT_CODE"
                          :title="$t('cdc._10')"
                          min-width="130"
                          :edit-render="{ name: 'input' }" />
        <vxe-table-column field="DEFECT_TYPE"
                          min-width="130"
                          :title="$t('cdc._11')"
                          :edit-render="{ name: 'select', options: DefectTypebox }" />
        <vxe-table-column field="DEFECT_CLASS"
                          min-width="130"
                          :title="$t('cdc._12')"
                          :edit-render="{ name: 'select', options:DefectClassbox  }" />
        <vxe-table-column field="DEFECT_CATEGORY"
                          min-width="150"
                          :title="$t('cdc._13')"
                          :edit-render="{ name: 'select', options:DefectCategorybox  }" />
        <vxe-table-column field="LEVEL_CODE"
                          min-width="150"
                          :title="$t('cdc._14')"
                          :edit-render="{ name: 'select', options: DefectLevelCodebox }" />
        <vxe-table-column field="SOURCE"
                          min-width="150"
                          :title="$t('cdc._15')"
                          :edit-render="{ name: 'select', options: DefectSourcebox }" />
        <vxe-table-column field="DEFECT_DESCRIPTION"
                          :title="$t('cdc._16')"
                          min-width="190"
                          :edit-render="{ name: 'input' }" />
        <vxe-table-column field="CHINESE_DESCRIPTION"
                          :title="$t('cdc._17')"
                          min-width="190"
                          :edit-render="{ name: 'input' }" />

        <vxe-table-column field="ENABLED"
                          :title="$t('cdc._18')"
                          min-width="150"
                          :edit-render="{ autofocus: '.custom-input', type: 'visible' }">
          <template v-slot:edit="{ row }">
            <div class="rddselect">
              <el-switch v-model="row.ENABLED"
                         :active-text="$t('cdc._19')"
                         :inactive-text="$t('cdc._20')"
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
    <!-- 抽屉 筛选 -->
    <el-drawer :title="$t('MesProductionPreMst._18')"
               :visible.sync="drawer"
               direction="ltr">
      <div style="padding: 0 20px">
        <el-card class="box-card">
          <div slot="header"
               class="clearfix">
            <span>{{ $t("MesProductionPreMst._19") }}</span>
            <el-button style="float: right; padding: 3px 0"
                       type="text"
                       @click="searchClick">{{ $t("MesProductionPreMst._20") }}</el-button>
            <el-button style="float: right; padding: 3px 0;margin-right: 20px"
                       type="text"
                       @click="resetListQuery">{{ $t("MesProductionPreMst._21") }}</el-button>
          </div>
          <el-form class="custom-form"
                   ref="formData"
                   label-position="top"
                   label-width="80px"
                   :model="formData"
                   size="mini">
            <el-form-item :label="$t('cdc._10')"
                          prop="DEFECT_CODE">
              <el-input v-model="formData.Key"
                        placeholder=" "
                        clearable></el-input>
            </el-form-item>
            <el-form-item :label="$t('cdc._11')"
                          prop="DEFECT_TYPE">
              <el-select v-model="formData.DEFECT_TYPE"
                         placeholder=" "
                         style="width: 100%"
                         clearable
                         filterable>
                <el-option v-for="item in DefectTypebox.slice(1, DefectTypebox.length)"
                           :label="item.label"
                           :key="item.value"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('cdc._12')"
                          prop="DEFECT_CLASS">
              <el-select v-model="formData.DEFECT_CLASS"
                         placeholder=" "
                         style="width: 100%"
                         clearable
                         filterable>
                <el-option v-for="item in DefectCategorybox.slice(
                    1,
                    DefectCategorybox.length
                  )"
                           :label="item.label"
                           :key="item.value"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('cdc._13')"
                          prop="DEFECT_CATEGORY">
              <el-select v-model="formData.DEFECT_CATEGORY"
                         placeholder=" "
                         style="width: 100%"
                         clearable
                         filterable>
                <el-option v-for="item in DefectClassbox.slice(1, DefectClassbox.length)"
                           :label="item.label"
                           :key="item.value"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('cdc._14')"
                          prop="LEVEL_CODE">
              <el-select v-model="formData.LEVEL_CODE"
                         placeholder=" "
                         style="width: 100%"
                         clearable
                         filterable>
                <el-option v-for="item in DefectLevelCodebox.slice(
                    1,
                    DefectLevelCodebox.length
                  )"
                           :label="item.label"
                           :key="item.value"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('cdc._15')"
                          prop="SOURCE">
              <el-select v-model="formData.SOURCE"
                         placeholder=" "
                         style="width: 100%"
                         clearable
                         filterable>
                <el-option v-for="item in DefectSourcebox.slice(
                    1,
                    DefectSourcebox.length
                  )"
                           :label="item.label"
                           :key="item.value"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-card>
      </div>
    </el-drawer>
  </d2-container>
</template>
<script>
import helper from '@/api/Helper'
import customContainerHeader from '@/components/custom-container-header'
const API = helper('SfcsDefectConfig')
export default {
  name: 'Badcodesetting',
  components: {
    customContainerHeader
  },
  data () {
    return {
      drawer: false,
      DefectCategory: [],
      DefectCategorybox: [],
      DefectClass: [],
      DefectClassbox: [],
      DefectLevelCode: [],
      DefectLevelCodebox: [],
      DefectSource: [],
      DefectSourcebox: [],
      DefectType: [],
      DefectTypebox: [],

      loading: false,
      mainTable: [],
      total: 0,
      formData: {
        DEFECT_TYPE: null, // 不良类型
        DEFECT_CLASS: null, // 不良种类
        DEFECT_CATEGORY: null, // 不良类别
        DEFECT_LEVEL_CODE: null, // 不良等级
        DEFECT_SOURCE: '', // 不良来源
        Key: '',
        Page: 1,
        Limit: 15
      },
      validRules: {
        DEFECT_CODE: [
          {
            required: true,
            message: this.$t('cdc._23')
          }
        ],
        DEFECT_TYPE: [
          {
            required: true,
            message: this.$t('cdc._5')
          }
        ],
        DEFECT_CLASS: [
          {
            required: true,
            message: this.$t('cdc._6')
          }
        ],
        DEFECT_CATEGORY: [
          {
            required: true,
            message: this.$t('cdc._7')
          }
        ],
        LEVEL_CODE: [
          {
            required: true,
            message: this.$t('cdc._8')
          }
        ],
        SOURCE: [
          {
            required: true,
            message: this.$t('cdc._9')
          }
        ],
        DEFECT_DESCRIPTION: [
          {
            required: true,
            message: this.$t('cdc._24')
          }
        ],
        CHINESE_DESCRIPTION: [
          {
            required: true,
            message: this.$t('cdc._25')
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
    cleanClick () {
      this.formData = {}
      this.formData.Limit = 15
      this.formData.Page = 1
      this.getLoadData()
    },
    // 重置
    resetListQuery () {
      this.formData = {}
      this.formData.Limit = 15
      this.formData.Page = 1
    },
    async getIndex () {
      const res = await API.Index()
      if (res.Result) {
        this.getLoadData()
        this.DefectCategory = res.Result.DefectCategory
        this.DefectClass = res.Result.DefectClass
        this.DefectLevelCode = res.Result.DefectLevelCode
        this.DefectSource = res.Result.DefectSource
        this.DefectType = res.Result.DefectType
        this.DefectCategorybox.push({
          label: '',
          value: '',
          disabled: false
        })
        this.DefectCategory.map(item => {
          this.DefectCategorybox.push({
            label: item.NAME,
            value: Number(item.CODE),
            disabled: false
          })
        })
        this.DefectClassbox.push({
          label: '',
          value: '',
          disabled: false
        })
        this.DefectClass.map(item => {
          this.DefectClassbox.push({
            label: item.NAME,
            value: Number(item.CODE),
            disabled: false
          })
        })
        this.DefectLevelCodebox.push({
          label: '',
          value: '',
          disabled: false
        })
        this.DefectLevelCode.map(item => {
          this.DefectLevelCodebox.push({
            label: item.NAME,
            value: Number(item.CODE),
            disabled: false
          })
        })

        this.DefectTypebox.push({
          label: '',
          value: '',
          disabled: false
        })
        this.DefectType.map(item => {
          this.DefectTypebox.push({
            label: item.NAME,
            value: Number(item.CODE),
            disabled: false
          })
        })

        this.DefectSourcebox.push({
          label: '',
          value: '',
          disabled: false
        })
        this.DefectSource.map(item => {
          this.DefectSourcebox.push({
            label: item,
            value: item,
            disabled: false
          })
        })
      }
    },
    async getLoadData () {
      this.loading = true
      const res = await API.LoadData(this.formData)
      if (res.Result) {
        this.mainTable = res.Result
        console.log(this.mainTable, '获取表格')
        this.total = res.TotalCount
        this.loading = false
      } else {
        this.loading = false
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
      this.drawer = false
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
                that.getLoadData()
                that.$notify({
                  title: this.$t('cdc._21'),
                  message: this.$t('cdc._22'),
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
          message: this.$t('cdc._26'),
          type: 'warning'
        })
      }
    },
    // 新增
    async insertEvent (row) {
      const record = {
        ID: 0,
        DEFECT_CODE: '', // 不良代码
        DEFECT_TYPE: '', // 不良类型
        DEFECT_CLASS: '', // 不良种类
        DEFECT_CATEGORY: '', // 不良类别
        LEVEL_CODE: '', // 不良等级
        SOURCE: '', // 不良来源
        DEFECT_DESCRIPTION: '', // 英文描述
        CHINESE_DESCRIPTION: '', // 中文描述
        ENABLED: 'N' // 是否激活
      }
      this.$refs.xTable.insertAt(record, row).then(({ row }) => {
        this.$refs.xTable.setActiveRow(row)
      })
    }
  }
}
</script>
<style lang="scss" scoped></style>
