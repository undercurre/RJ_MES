<template>
  <d2-container>
    <template slot="header">
      <custom-container-header importBtnName="SmtFeederDamagePartImport"
                               exportBtnName="SmtFeederDamagePartExport"
                               exportTplName="SmtFeederDamagePartExportTPL">
        <el-input v-model="formData.CODE"
                  clearable
                  style="width:180px"
                  :placeholder="$t('sdr_de.ld_code')" />&nbsp;
        <el-input v-model="formData.DESCRIPTION"
                  clearable
                  style="width:180px"
                  :placeholder="$t('sdr_de.p_dns')" />&nbsp;
        <el-select v-model="formData.ENABLED"
                   clearable
                   style="width:180px"
                   :placeholder="$t('sdr_de.p_yn')">
          <el-option :label="$t('sdr_de.no')"
                     value="N" />
          <el-option :label="$t('sdr_de.yes')"
                     value="Y" />
        </el-select>&nbsp;
        <el-button type="primary"
                   icon="el-icon-search"
                   @click.prevent="searchClick">{{ $t('sdr_de.hd_sf') }}</el-button>
        <el-button type="success"
                   @click="insertEvent(0)"
                   icon="el-icon-plus"
                   v-if="$btnList.indexOf('SmtFeederDamagePartAdd') !== -1">{{ $t('sdr_de.add') }}</el-button>
        <el-button type="primary"
                   icon="el-icon-check"
                   v-if="$btnList.indexOf('SmtFeederDamagePartEdit') !== -1"
                   @click.prevent="preserveClick">{{ $t('sdr_de.save') }}</el-button>
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
        <vxe-table-column min-width="180"
                          field="CODE"
                          :title="$t('sdr_de.code')"
                          :edit-render="{name: 'input'}" />
        <vxe-table-column min-width="180"
                          field="DESCRIPTION"
                          :title="$t('sdr_de.dns')"
                          :edit-render="{name: 'input'}" />
        <vxe-table-column min-width="180"
                          field="ENABLED"
                          :title="$t('sdr_de.yn')"
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
        <vxe-table-column :title="$t('sdr_de.tb_og')"
                          min-width="120"
                          align="center"
                          fixed="right">
          <template v-slot="{ row }">
            <el-button type="danger"
                       @click="removeClick(row, row.$index)"
                       v-if="$btnList.indexOf('SmtFeederDamagePartRemove') !== -1">{{ $t('sdr_de.tb_rm') }}</el-button>
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
import customContainerHeader from '@/components/custom-container-header'
import pagination from '@/views/mixin/page'
import {
  Index,
  LoadData,
  ItemIsByUsed,
  SaveData
} from '@/api/SmtFeederDamagePart'
export default {
  name: 'SmtFeederDamagePart',
  components: {
    customContainerHeader
  },
  mixins: [pagination],
  data () {
    return {
      formData: {
        CODE: '',
        DESCRIPTION: '',
        ENABLED: '',
        Key: '',
        Page: 1,
        Limit: 15
      },
      loading: false,
      mainTable: [],
      validRules: {
        CODE: [
          {
            required: true,
            message: this.$t('sdr_de.ld_code')
          }
        ]
      },
      CodeList: [],
      totalPage: 0,
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
      const res = await Index()
      if (res.Result) {
        this.CodeList = res.Result.CodeList
        this.StatusList = res.Result.StatusList
        this.getLoadData()
      }
    },
    async getLoadData () {
      this.loading = true
      const res = await LoadData(this.formData)
      if (res.Result) {
        this.mainTable = res.Result
        this.totalPage = res.TotalCount
        this.loading = false
      }
      this.loading = false
    },
    // 搜索
    searchClick () {
      this.formData.Page = 1
      this.getLoadData()
    },
    // 添加
    async insertEvent (row) {
      const record = {
        ID: 0,
        CODE: '',
        DESCRIPTION: '',
        ENABLED: ''
      }
      this.$refs.xTable.insertAt(record, row).then(({ row }) => {
        this.$refs.xTable.setActiveRow(row)
      })
    },
    // 删除
    async removeClick (row) {
      console.log(row)
      if (row) {
        this.$confirm(this.$t('sdr_de.fidelete'), this.$t('sdr_de.prompt'), {
          confirmButtonText: this.$t('sdr_de.confirm'),
          cancelButtonText: this.$t('sdr_de.cancel'),
          type: 'warning'
        })
          .then(async () => {
            if (row.ID === 0) {
              this.$refs.xTable.remove(row)
              this.$notify({
                title: this.$t('sdr_de.success'),
                message: this.$t('sdr_de.sudeleted'),
                type: 'success',
                duration: 2000
              })
            } else {
              var result = await ItemIsByUsed(row.ID)
              console.log(result)
              if (result.Result !== void 0) {
                if (result.Result) {
                  this.$message({
                    message: result.ErrorInfo.Message || this.$t('sdr_de.the'),
                    type: 'error'
                  })
                } else {
                  this.$refs.xTable.remove(row)
                  var postdata = this.$refs.xTable.getRecordset()
                  this.formData.insertRecords = postdata.insertRecords
                  this.formData.updateRecords = postdata.updateRecords
                  this.formData.removeRecords = postdata.removeRecords
                  SaveData(this.formData).then(res => {
                    if (res.Result) {
                      this.formData = {}
                      this.$notify({
                        title: this.$t('sdr_de.success'),
                        message: this.$t('sdr_de.sudeleted'),
                        type: 'success',
                        duration: 2000
                      })
                    }
                    this.getLoadData()
                  })
                }
              }
            }
          })
          .catch(() => { })
      }
    },
    // 保存
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
            SaveData(this.form).then(res => {
              if (res.Result) {
                that.form = {}
                that.getLoadData()
                that.$notify({
                  title: this.$t('sdr_de.success'),
                  message: this.$t('sdr_de.subsu'),
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
          message: this.$t('sdr_de.data'),
          type: 'warning'
        })
      }
    }
  }
}
</script>
