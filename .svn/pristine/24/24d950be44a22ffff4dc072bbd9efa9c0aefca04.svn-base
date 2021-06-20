<template>
  <d2-container>
    <template slot="header">
      <custom-container-header tableName="SMT_LOOKUP"
                               importBtnName="SmtLineDictionaryImport"
                               exportBtnName="SmtLineDictionaryExport"
                               exportTplName="SmtLineDictionaryExportTPL">
        <el-select v-model="formData.TYPE"
                   filterable
                   clearable
                   style="width:180px"
                   :placeholder="$t('sld.p_line')">
          <el-option v-for="item in StatusList"
                     :key="item.TYPE"
                     :value="item.TYPE"
                     :label="item.TYPE" />
        </el-select>&nbsp;
        <el-input v-model="formData.VALUE"
                  :placeholder="$t('sld.val')"
                  clearable
                  style="width:180px"
                  @keyup.enter.native="searchClick" />&nbsp;
        <el-input v-model="formData.EN_DESC"
                  :placeholder="$t('sld.p_dn')"
                  clearable
                  style="width:180px"
                  @keyup.enter.native="searchClick" />&nbsp;
        <el-button type="primary"
                   icon="el-icon-search"
                   @click.prevent="searchClick">{{ $t('sld.hd_sf') }}</el-button>
        <el-button type="success"
                   @click="insertEvent(null)"
                   icon="el-icon-plus"
                   v-if="$btnList.indexOf('SmtLookupAdd') !== -1">{{ $t('sld.add') }}</el-button>
        <el-button type="primary"
                   icon="el-icon-check"
                   @click.prevent="preserveClick"
                   v-if="$btnList.indexOf('SmtLookupEdit') !== -1">{{ $t('sld.save') }}</el-button>
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
                 :checkbox-config="{checkField: 'checked', trigger: 'row'}">
        <vxe-table-column field="TYPE"
                          :title="$t('sld.t_1')"
                          :edit-render="{name: 'input'}" />
        <vxe-table-column field="CODE"
                          :title="$t('sld.t_2')"
                          :edit-render="{name:'$input',props:{type:'number',min: '0'}}" />
        <vxe-table-column field="VALUE"
                          :title="$t('sld.t_3')"
                          :edit-render="{name: 'input'}" />
        <vxe-table-column field="EN_DESC"
                          :title="$t('sld.t_4')"
                          :edit-render="{name: 'input'}" />
        <vxe-table-column field="CN_DESC"
                          :title="$t('sld.t_5')"
                          :edit-render="{name: 'input'}" />
        <vxe-table-column field="ENABLED"
                          :title="$t('sld.yn')"
                          :edit-render="{autofocus: '.custom-input', type: 'visible'}">
          <template v-slot:edit="{ row }">
            <div class="rddselect">
              <el-switch v-model="row.ENABLED"
                         :active-text="$t('publics.btn.yes')"
                         :inactive-text="$t('publics.btn.no')"
                         active-color="#13ce66"
                         inactive-color="#cccccc"
                         active-value="Y"
                         inactive-value="N" />
            </div>
          </template>
        </vxe-table-column>
        <vxe-table-column :title="$t('sld.tb_og')"
                          width="120"
                          align="center"
                          fixed="right">
          <template v-slot="{ row }">
            <el-button type="danger"
                       @click="removeClick(row, row.$index)"
                       v-if="$btnList.indexOf('SmtLookupRemove') !== -1">{{ $t('sld.tb_rm') }}</el-button>
          </template>
        </vxe-table-column>
      </vxe-table>
    </div>
    <template slot="footer">
      <el-pagination class="SmtLineDictionary-pagination"
                     :current-page="formData.Page"
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
import helper from '@/api/SmtLookup'
import pagination from '@/views/mixin/page'
import customContainerHeader from '@/components/custom-container-header'
const API = helper('SmtLookup')
export default {
  name: 'SmtLineDictionary',
  mixins: [pagination],
  components: {
    customContainerHeader
  },
  data () {
    return {
      StatusList: [],
      formData: {
        TYPE: '',
        VALUE: '',
        ...this.formData
      },
      LineBox: [],
      loading: false,
      mainTable: [],
      validRules: {
        TYPE: [
          {
            required: true,
            message: this.$t('sld.p_line')
          }
        ],
        CODE: [
          {
            required: true,
            message: this.$t('sld.val')
          }
        ],
        VALUE: [
          {
            required: true,
            message: this.$t('sld.val')
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
        this.getLoadData()
        this.LineBox.push({
          label: '',
          value: '',
          disabled: false
        })
        this.StatusList.map(item => {
          this.LineBox.push({
            label: item.TYPE,
            value: item.TYPE,
            disabled: false
          })
        })
      }
    },
    async getLoadData () {
      this.loading = true
      const res = await API.LoadData(this.formData)
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
      let postdata = this.$refs.xTable.getRecordset()
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
                  title: this.$t('sld.success'),
                  message: this.$t('sld.subsu'),
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
          message: this.$t('sld.data'),
          type: 'warning'
        })
      }
    },
    // 新增
    async insertEvent (row) {
      const record = {
        ID: 0,
        TYPE: '',
        CODE: '',
        VALUE: '',
        EN_DESC: '',
        CN_DESC: '',
        ENABLED: 'N'
      }
      this.$refs.xTable.insertAt(record, row).then(({ row }) => {
        this.$refs.xTable.setActiveRow(row)
      })
    },
    // 删除
    async removeClick (row) {
      let postdata = this.$refs.xTable.getRecordset()
      if (row) {
        this.$confirm(this.$t('sld.fidelete'), this.$t('sld.prompt'), {
          confirmButtonText: this.$t('sld.confirm'),
          cancelButtonText: this.$t('sld.cancel'),
          type: 'warning'
        }).then(() => {
          this.$refs.xTable.remove(row)
          if (row.ID === 0) {
            this.$notify({
              title: this.$t('sld.success'),
              message: this.$t('sld.sudeleted'),
              type: 'success',
              duration: 2000
            })
          } else {
            this.form.insertRecords = []
            this.form.updateRecords = []
            this.form.removeRecords = postdata.removeRecords
            API.SaveData(this.form).then(response => {
              if (response.Result) {
                this.form = {}
                this.getLoadData()
                this.$notify({
                  title: this.$t('sld.success'),
                  message: this.$t('sld.subsu'),
                  type: 'success',
                  duration: 2000
                })
              }
            })
          }
        })
      }
    }
  }
}
</script>
