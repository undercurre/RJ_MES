<template>
  <d2-container>
    <template slot="header">
      <custom-container-header exportMehodsName="exportData"
                               importBtnName="SmtResourceCategoryImport"
                               exportBtnName="SmtResourceCategoryExport"
                               exportTplName="SmtResourceCategoryExportTpl">
        <el-select v-model="formData.OBJECT_ID"
                   clearable
                   style="width:200px"
                   :placeholder="$t('as_src.pk')">
          <el-option v-for="item in maneList"
                     :key="item.ID"
                     :label="item.NAME"
                     :value="item.ID" />
        </el-select>&nbsp;
        <el-input v-model="formData.Key"
                  :placeholder="$t('as_src.p_pk')"
                  clearable
                  style="width:200px"
                  @keyup.enter.native="searchClick" />&nbsp;
        <el-button type="primary"
                   icon="el-icon-search"
                   @click.prevent="searchClick">{{ $t('as_src.search') }}</el-button>
        <el-button type="success"
                   icon="el-icon-plus"
                   v-if="$btnList.indexOf('SmtResourceCategoryAdd') !== -1"
                   @click.prevent="addClick(null)">{{ $t('as_src.add') }}</el-button>
        <el-button type="primary"
                   icon="el-icon-check"
                   v-if="$btnList.indexOf('SmtResourceCategorySave') !== -1"
                   @click.prevent="preserveClick">{{ $t('as_src.save') }}</el-button>
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
                 @cell-click="cellClick">
        <vxe-table-column field="OBJECT_ID"
                          min-width="150"
                          :title="$t('as_src.tb_name')"
                          :edit-render="{name: 'select', options: NameList}" />
        <vxe-table-column field="CATEGORY_ID"
                          min-width="190"
                          :title="$t('as_src.tb_code')"
                          :edit-render="{autofocus: '.custom-input'}">
          <template v-slot:edit="{ row, $rowIndex }">
            <div>
              <vxe-input v-model="row.CATEGORY_ID"
                         :disabled="!disabled && $rowIndex === currentRowIndex" />
            </div>
          </template>
        </vxe-table-column>
        <vxe-table-column field="CATEGORY_NAME"
                          min-width="180"
                          :title="$t('as_src.tb_pn')"
                          :edit-render="{name: 'input'}" />
        <vxe-table-column field="VALID_TIME"
                          min-width="160"
                          :title="$t('as_src.tb_ie')"
                          :edit-render="{name: '$input', props: {type: 'number',min: '0'}, autoselect: true}" />
        <vxe-table-column field="EXPOSE_TIME"
                          min-width="180"
                          :title="$t('as_src.tb_ep')"
                          :edit-render="{name: '$input', props: {type: 'number',min: '0'}, autoselect: true}" />
        <vxe-table-column field="PROPERTY_FLAG"
                          min-width="170"
                          :title="$t('as_src.tb_de')"
                          :edit-render="{name: 'select', options: PropertyList}" />
        <vxe-table-column field="ENABLED"
                          min-width="150"
                          :title="$t('as_src.tb_an')"
                          :edit-render="{autofocus: '.custom-input', type: 'visible'}">
          <template v-slot:edit="{ row }">
            <div class="rddselect">
              <el-switch v-model="row.ENABLED"
                         :active-text="$t('as_src.sw_yes')"
                         :inactive-text="$t('as_src.sw_no')"
                         active-color="#13ce66"
                         inactive-color="#cccccc"
                         active-value="Y"
                         inactive-value="N" />
            </div>
          </template>
        </vxe-table-column>
        <vxe-table-column field="DESCRIPTION"
                          min-width="170"
                          :title="$t('as_src.tb_dn')"
                          :edit-render="{name: 'input'}" />

        <vxe-table-column :title="$t('as_src.tb_og')"
                          min-width="120"
                          align="center"
                          fixed="right">
          <template v-slot="{ row }">
            <el-button type="danger"
                       @click="removeClick(row, row.$index)"
                       v-if="$btnList.indexOf('SmtResourceCategoryRemove') !== -1">{{ $t('as_src.tb_rm') }}</el-button>
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
const API = helper('SmtResourceCategory')
export default {
  name: 'SmtResourceCategory',
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
      NameList: [],
      maneList: [],
      deviceStatus: [],
      PropertyList: [],
      loading: false,
      mainTable: [],
      form: {
        insertRecords: [],
        updateRecords: [],
        removeRecords: []
      },
      validRules: {
        OBJECT_ID: [
          {
            required: true,
            message: this.$t('as_src.fm_p_name')
          }
        ],

        CATEGORY_ID: [
          {
            required: true,
            message: this.$t('as_src.fm_p_code')
          }
        ],
        CATEGORY_NAME: [
          {
            required: true,
            message: this.$t('as_src.fm_p_pn')
          }
        ],
        VALID_TIME: [
          {
            required: true,
            message: this.$t('as_src.fm_p_ie')
          }
        ],
        EXPOSE_TIME: [
          {
            required: true,
            message: this.$t('as_src.fm_p_ep')
          }
        ],
        PROPERTY_FLAG: [
          {
            required: true,
            message: this.$t('as_src.fm_p_de')
          }
        ]
      },
      disabled: false,
      currentRowIndex: -1
    }
  },
  methods: {
    async getIndex () {
      const res = await API.Index()
      if (!res.Result) {
        return false
      }
      this.maneList = res.Result.NameList
      this.deviceStatus = res.Result.PropertyList
      this.NameList.push({
        label: '',
        value: '',
        disabled: false
      })
      this.maneList.map(item => {
        this.NameList.push({
          label: item.NAME,
          value: item.ID ? item.ID.toString() : '',
          disabled: false
        })
      })
      this.PropertyList.push({
        label: '',
        value: '',
        disabled: false
      })
      this.deviceStatus.map(item => {
        this.PropertyList.push({
          label: item.NAME,
          value: item.ID ? item.ID.toString() : '',
          disabled: false
        })
      })
      this.getLoadData()
    },
    // 获取表格
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
    searchClick () {
      this.getLoadData()
    },
    async cellClick (e) {
      const { $rowIndex, row, columnIndex } = e
      if (columnIndex === 8) {
        return false
      }
      if (this.currentRowIndex !== $rowIndex) {
        this.currentRowIndex = $rowIndex
        this.disabled = false
      } else {
        return false
      }
      if (!row.CATEGORY_ID) {
        this.disabled = true
        return false
      }
      const res = await API.ItemIsByUsed({ CATEGORY_ID: row.CATEGORY_ID })
      if (res.Result === true) {
        return false
      } else {
        this.disabled = true
        const set = [
          'OBJECT_ID',
          'CATEGORY_ID',
          'CATEGORY_NAME',
          'VALID_TIME',
          'EXPOSE_TIME',
          'PROPERTY_FLAG',
          'ENABLED',
          'DESCRIPTION'
        ]
        this.$nextTick(() => {
          this.$refs.xTable.setActiveCell(row, set[columnIndex])
        })
      }
    },
    addClick (row) {
      const record = {
        ID: 0,
        OBJECT_ID: '', // 辅料名称
        CATEGORY_ID: '', // 辅料种类代码
        CATEGORY_NAME: '', // 辅料料号
        VALID_TIME: '', // 有效期天数
        EXPOSE_TIME: '', // 暴露小时数
        PROPERTY_FLAG: '', // 设备状态
        ENABLED: 'N', // 是否激活
        DESCRIPTION: '' // 描述备注
      }
      this.$refs.xTable.insertAt(record, row).then(({ row }) => {
        this.$refs.xTable.setActiveRow(row)
      })
    },
    // 删除
    removeClick (row) {
      var postdata = this.$refs.xTable.getRecordset()
      this.$confirm(this.$t('as_src.cf_rm'), this.$t('as_src.cf_prompt'), {
        type: 'warning'
      }).then(async () => {
        if (row.ID === 0) {
          this.$refs.xTable.remove(row)
          this.$notify({
            title: this.$t('as_src.su'),
            message: this.$t('as_src.su_rm'),
            type: 'success',
            duration: 2000
          })
        } else {
          const resData = await API.ItemIsByUsed({
            CATEGORY_ID: row.CATEGORY_ID
          })
          if (resData.Result !== void 0) {
            if (resData.Result) {
              this.$message.error(this.$t('as_src._1'))
            } else {
              this.$refs.xTable.remove(row)
              this.form.removeRecords = postdata.removeRecords
              const response = await API.SaveData(this.form)
              if (response.Result) {
                this.form = {}
                this.getLoadData()
                this.$notify({
                  title: this.$t('as_src.su'),
                  message: this.$t('as_src.su_rm'),
                  type: 'success',
                  duration: 2000
                })
              }
            }
          }
        }
      })
    },
    preserveClick () {
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
                title: this.$t('publics.tips.success'),
                message: this.$t('publics.tips.submitSuccess'),
                type: 'success',
                duration: 2000
              })
            }
          }
        })
      }
    },
    handleDisabled (e) {
      console.log(e)
      return true
    }
  },
  created () {
    this.getIndex()
  }
}
</script>
