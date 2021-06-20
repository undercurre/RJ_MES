<template>
  <d2-container class="SfcsProductCarton">
    <template slot="header">
      <custom-container-header :isExport="false"
                               :isImport="false"
                               :isExportTpl="false">
        <el-input v-model="formData.Key"
                  :placeholder="$t('spc._1')"
                  clearable
                  style="width:200px"
                  @keyup.enter.native="searchClick" />&nbsp;
        <el-select v-model="formData.COLLECT_OPERATION_ID"
                   clearable
                   :placeholder="$t('spc._6')">
          <el-option v-for="item in Operation"
                     :key="item.ID"
                     :label="item.DESCRIPTION"
                     :value="item.ID" />
        </el-select>&nbsp;
        <el-button type="primary"
                   icon="el-icon-search"
                   @click.prevent="searchClick">{{ $t('spc._3') }}</el-button>
        <el-button type="success"
                   @click="insertEvent(0)"
                   icon="el-icon-plus"
                   v-if="$btnList.indexOf('SfcsProductCartonAdd') !== -1">{{ $t('spc._4') }}</el-button>
        <el-button type="primary"
                   icon="el-icon-check"
                   @click.prevent="preserveClick"
                   v-if="$btnList.indexOf('SfcsProductCartonEdit') !== -1">{{ $t('spc._5') }}</el-button>
      </custom-container-header>
    </template>
    <div class="SfcsProductCarton-table">
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
                 @cell-click="cellClick"
                 @edit-closed="editClick"
                 :loading="loading"
                 :data="mainTable"
                 :edit-rules="validRules"
                 :mouse-config="{selected: true}"
                 :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
                 :radio-config="{labelField: 'name', trigger: 'row'}"
                 :checkbox-config="{checkField: 'checked', trigger: 'row'}">
        <vxe-table-column field="PART_NO"
                          width="150"
                          :title="$t('spc._7')"
                          :edit-render="{name: 'input'}" />
        <vxe-table-column field="FORMAT"
                          min-width="170"
                          :title="$t('spc._9')"
                          :edit-render="{name: 'input'}" />
        <vxe-table-column field="COLLECT_OPERATION_ID"
                          :title="$t('spc._23')"
                          min-width="180"
                          :edit-render="{name: 'select', options: Operationbox}" />
        <vxe-table-column field="AUTO_CREATE_FLAG"
                          :title="$t('spc._22')"
                          min-width="350"
                          :edit-render="{autofocus: '.custom-input', type: 'visible'}">
          <template v-slot:edit="{ row}">
            <div>
              <el-switch v-model="row.AUTO_CREATE_FLAG"
                         :active-text="$t('spc._12')"
                         :inactive-text="$t('spc._13')"
                         active-color="#13ce66"
                         inactive-color="#cccccc"
                         active-value="Y"
                         inactive-value="N" />
            </div>
          </template>
        </vxe-table-column>
        <vxe-table-column field="ENABLED"
                          width="150"
                          :title="$t('spc._24')"
                          :edit-render="{autofocus: '.custom-input', type: 'visible'}">
          <template v-slot:edit="{ row}">
            <div class="rddselect">
              <el-switch v-model="row.ENABLED"
                         :active-text="$t('spc._12')"
                         :inactive-text="$t('spc._13')"
                         active-color="#13ce66"
                         inactive-color="#cccccc"
                         active-value="Y"
                         inactive-value="N" />
            </div>
          </template>
        </vxe-table-column>
        <vxe-table-column field="STANDARD_QUANTITY"
                          :title="$t('spc._10')"
                          width="150"
                          :edit-render="{name: '$input', props: {type: 'number',min: '1'}}" />

        <vxe-table-column field="MAX_QUANTITY"
                          min-width="170"
                          :title="$t('spc._11')"
                          :edit-render="{name: '$input', props: {type: 'number',min: '1'}, events: {input: blurCheckMaxQ}}"></vxe-table-column>
        <vxe-table-column field="MIN_QUANTITY"
                          :title="$t('spc._14')"
                          min-width="170"
                          :edit-render="{name: '$input', props: {type: 'number',min: '1'}, events: { input: blurCheckMinQ }}"></vxe-table-column>
        <vxe-table-column field="STANDARD_WEIGHT"
                          :title="$t('spc._15')"
                          min-width="170"
                          :edit-render="{name: '$input', props: {type: 'number',min: '1'}}"></vxe-table-column>
        <vxe-table-column field="MAX_WEIGHT"
                          min-width="170"
                          :title="$t('spc._16')"
                          :edit-render="{name: '$input', props: {type: 'number',min: '1'}, events: { input: blurCheckMaxW }}"></vxe-table-column>
        <vxe-table-column field="MIN_WEIGHT"
                          min-width="170"
                          :title="$t('spc._17')"
                          :edit-render="{name: '$input', props: {type: 'number',min: '1'}, events: { input: blurCheckMinW }}"></vxe-table-column>
        <vxe-table-column field="CUBAGE"
                          min-width="270"
                          :title="$t('spc._18')"
                          :edit-render="{name: 'input'}"></vxe-table-column>
        <vxe-table-column field="LENGTH"
                          width="150"
                          :title="$t('spc._19')"
                          :edit-render="{name: 'input'}"></vxe-table-column>
        <vxe-table-column field="WIDTH"
                          width="200"
                          :title="$t('spc._20')"
                          :edit-render="{name: 'input'}" />
        <vxe-table-column field="HEIGHT"
                          min-width="150"
                          :title="$t('spc._21')"
                          :edit-render="{name: 'input'}" />
        <vxe-table-column :title="$t('publics.field.operate')"
                          width="150"
                          align="center"
                          fixed="right">
          <template v-slot="{ row }">
            <el-button type="danger"
                       @click="removeClick(row, row.$index)"
                       v-if="$btnList.indexOf('SfcsProductCartonDelete') !== -1">{{ $t('publics.btn.delete') }}</el-button>
          </template>
        </vxe-table-column>
      </vxe-table>
    </div>
    <el-pagination ref="pagi"
                   :current-page="formData.Page"
                   :page-size="formData.Limit"
                   :page-sizes="[15, 25, 35, 45]"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="total"
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange" />
    <div class="annex-table">
      <div class="annex-header">
        {{$t('spc._37')}}
        <el-button type="success"
                   @click="annexEvent(0)"
                   icon="el-icon-plus"
                   v-if="$btnList.indexOf('SfcsProductCartonAdd2') !== -1">{{ $t('spc._4') }}</el-button>
        <el-button type="primary"
                   icon="el-icon-check"
                   @click.prevent="annexserveClick"
                   v-if="$btnList.indexOf('SfcsProductCartonEdit2') !== -1">{{ $t('spc._5') }}</el-button>
      </div>
      <vxe-table ref="annexxTable"
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
                 :loading="annexloading"
                 :data="annexTable"
                 :edit-rules="annexRules"
                 :mouse-config="{selected: true}"
                 :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
                 :radio-config="{labelField: 'name', trigger: 'row'}"
                 :checkbox-config="{checkField: 'checked', trigger: 'row'}">
        <vxe-table-column field="ATTACHMENT_ID"
                          :title="$t('spc._25')"
                          :edit-render="{name: 'select', options: Attachmentbox}" />
        <vxe-table-column field="DATA_FORMAT"
                          :title="$t('spc._26')"
                          :edit-render="{name: 'input'}" />
        <vxe-table-column field="FIX_VALUE"
                          :title="$t('spc._27')"
                          :edit-render="{name: 'input'}" />
        <vxe-table-column field="ATTACHMENT_QTY"
                          :title="$t('spc._28')"
                          :edit-render="{name: '$input', props: {type: 'number',min: '1'}}" />

        <vxe-table-column field="ENABLED"
                          :title="$t('spc._29')"
                          :edit-render="{autofocus: '.custom-input', type: 'visible'}">
          <template v-slot:edit="{ row}">
            <div class="rddselect">
              <el-switch v-model="row.ENABLED"
                         :active-text="$t('spc._12')"
                         :inactive-text="$t('spc._13')"
                         active-color="#13ce66"
                         inactive-color="#cccccc"
                         active-value="Y"
                         inactive-value="N" />
            </div>
          </template>
        </vxe-table-column>
        <vxe-table-column :title="$t('publics.field.operate')"
                          width="150"
                          align="center"
                          fixed="right">
          <template v-slot="{ row }">
            <el-button type="danger"
                       @click="removeClick2(row, row.$index)"
                       v-if="$btnList.indexOf('SaveAttachmentDataDelete') !== -1">{{ $t('publics.btn.delete') }}</el-button>
          </template>
        </vxe-table-column>
      </vxe-table>
    </div>
  </d2-container>
</template>
<script>
import helper from '@/api/SfcsProductCarton'
import customContainerHeader from '@/components/custom-container-header'
const API = helper('SfcsProductCarton')
export default {
  name: 'SfcsProductCarton',
  components: {
    customContainerHeader
  },
  data () {
    return {
      Attachment: [],
      Attachmentbox: [],
      Operation: [],
      Operationbox: [],
      loading: false,
      mainTable: [],
      total: 0,
      formData: {
        COLLECT_OPERATION_ID: '',
        Key: '',
        Page: 1,
        Limit: 15
      },
      validRules: {
        PART_NO: [
          {
            required: true,
            message: this.$t('spc._1')
          }
        ],
        FORMAT: [
          {
            required: true,
            message: this.$t('spc._33')
          }
        ],
        COLLECT_OPERATION_ID: [
          {
            required: true,
            message: this.$t('spc._6')
          }
        ],
        STANDARD_QUANTITY: [
          {
            required: true,
            message: this.$t('spc._40')
          }
        ]
      },
      form: {
        insertRecords: [],
        updateRecords: [],
        removeRecords: []
      },
      annexRules: {
        ATTACHMENT_ID: [
          {
            required: true,
            message: this.$t('spc._35')
          }
        ],
        ATTACHMENT_QTY: [
          {
            required: true,
            message: this.$t('spc._41')
          }
        ]
      },
      annexloading: false,
      annexTable: [],
      mstid: 0
    }
  },
  created () {
    this.getIndex()
  },
  methods: {
    // 判断料号是否存在
    async editClick (e) {
      if (e.row.PART_NO) {
        const res = await API.PartNOIsExist(e.row.PART_NO)
        if (!res.Result) {
          this.$message({
            showClose: true,
            message: this.$t('spc._34'),
            type: 'warning'
          })
          e.row.PART_NO = ''
        }
      }
    },
    // 获取附件数据
    async cellClick (e) {
      if (e.row.ID !== 0) {
        this.mstid = e.row.ID
        const res = await API.GetAttachmentList(e.row.ID)
        this.annexTable = res.Result
      } else {
        this.mstid = 0
        this.annexTable = []
      }
    },
    // 获取权限、下拉框
    async getIndex () {
      const res = await API.Index()
      if (res.Result) {
        console.log(res, 'resresres')
        this.Attachment = res.Result.Attachment
        this.Operation = res.Result.Operation
        this.getLoadData()
        this.Attachmentbox.push({
          label: '',
          value: '',
          disabled: false
        })
        this.Attachment.map((item) => {
          this.Attachmentbox.push({
            label: item.OBJECT_NAME,
            value: Number(item.ID),
            disabled: false
          })
        })
        this.Operationbox.push({
          label: '',
          value: '',
          disabled: false
        })
        this.Operation.map((item) => {
          this.Operationbox.push({
            label: item.DESCRIPTION,
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
        this.$refs.xTable.validate((valid) => {
          if (valid) {
            this.form.insertRecords = postdata.insertRecords
            this.form.updateRecords = postdata.updateRecords
            this.form.removeRecords = postdata.removeRecords
            API.SaveData(this.form).then((response) => {
              if (response.Result) {
                this.form = {}
                that.$notify({
                  title: this.$t('spc._30'),
                  message: this.$t('spc._31'),
                  type: 'success',
                  duration: 2000
                })
                that.formData = {
                  COLLECT_OPERATION_ID: '',
                  Key: '',
                  Page: 1,
                  Limit: 15
                }
                that.getLoadData()
              }
            })
          }
        })
      } else {
        this.$message({
          showClose: true,
          message: this.$t('spc._32'),
          type: 'warning'
        })
      }
    },
    // 新增
    async insertEvent (row) {
      const record = {
        ID: 0,
        PART_NO: '',
        FORMAT: '',
        STANDARD_QUANTITY: 1,
        MAX_QUANTITY: '',
        MIN_QUANTITY: '',
        STANDARD_WEIGHT: '',
        MAX_WEIGHT: '',
        MIN_WEIGHT: '',
        CUBAGE: '',
        LENGTH: '',
        WIDTH: '',
        HEIGHT: '',
        AUTO_CREATE_FLAG: 'Y',
        COLLECT_OPERATION_ID: '',
        ENABLED: 'Y'
      }
      this.$refs.xTable.insertAt(record, row).then(({ row }) => {
        this.$refs.xTable.setActiveRow(row)
      })
    },
    async removeClick (row) {
      this.$confirm(
        this.$t('publics.tips.makeSureDelete'),
        this.$t('publics.tips.tips'),
        {
          confirmButtonText: this.$t('publics.tips.confirm'),
          cancelButtonText: this.$t('publics.tips.cancel'),
          type: 'warning'
        }
      )
        .then(() => {
          this.$refs.xTable.remove(row)
          const postdata = this.$refs.xTable.getRecordset()
          if (postdata.removeRecords.length) {
            this.$refs.xTable.validate(async (valid) => {
              if (valid) {
                this.form = {
                  RemoveRecords: postdata.removeRecords
                }
                const res = await API.SaveData(this.form)
                if (res.Result) {
                  this.form = {}
                  this.getLoadData()
                  this.$notify({
                    title: this.$t('ssc._12'),
                    message: this.$t('ssc._19'),
                    type: 'success',
                    duration: 2000
                  })
                }
              }
            })
          }
        })
        .catch(() => { })
    },
    //  附件保存
    annexserveClick () {
      var that = this
      if (this.mstid === 0) {
        this.$message({
          showClose: true,
          message: this.$t('spc._36'),
          type: 'warning'
        })
        return
      }
      var postdata = this.$refs.annexxTable.getRecordset()
      if (
        postdata.insertRecords.length ||
        postdata.removeRecords.length ||
        postdata.updateRecords.length
      ) {
        this.$refs.annexxTable.validate((valid) => {
          if (valid) {
            var tabdata = this.$refs.annexxTable.getTableData().tableData
            var isRES = false
            tabdata.some((v, i) => {
              if (
                (v.DATA_FORMAT === '' || v.DATA_FORMAT === null) &&
                (v.FIX_VALUE === '' || v.FIX_VALUE === null)
              ) {
                this.$message({
                  showClose: true,
                  message: this.$t('spc._42'),
                  type: 'warning'
                })
                isRES = true
              } else {
                isRES = false
              }
            })
            if (isRES) {
              return
            }
            this.form.insertRecords = postdata.insertRecords
            this.form.updateRecords = postdata.updateRecords
            this.form.removeRecords = postdata.removeRecords
            API.SaveAttachmentData(this.form).then((response) => {
              if (response.Result) {
                this.form = {}
                that.$notify({
                  title: this.$t('spc._30'),
                  message: this.$t('spc._31'),
                  type: 'success',
                  duration: 2000
                })
              }
              this.annexserve()
            })
          }
        })
      } else {
        this.$message({
          showClose: true,
          message: this.$t('spc._32'),
          type: 'warning'
        })
      }
    },
    // 附件新增新增
    async annexEvent (row) {
      if (this.mstid === 0) {
        this.$message({
          showClose: true,
          message: this.$t('spc._36'),
          type: 'warning'
        })
        return
      }
      const record = {
        ID: 0,
        PRODUCT_OBJECT_ID: Number(this.mstid), // 主表ID
        ATTACHMENT_ID: '', // 附件名称
        DATA_FORMAT: '', // 格式限定
        FIX_VALUE: '', // 固定值
        ATTACHMENT_QTY: 1, // 附件数量
        ENABLED: 'Y' // 是否激活
      }
      this.$refs.annexxTable.insertAt(record, row).then(({ row }) => {
        this.$refs.annexxTable.setActiveRow(row)
      })
    },
    async removeClick2 (row) {
      this.$confirm(
        this.$t('publics.tips.makeSureDelete'),
        this.$t('publics.tips.tips'),
        {
          confirmButtonText: this.$t('publics.tips.confirm'),
          cancelButtonText: this.$t('publics.tips.cancel'),
          type: 'warning'
        }
      )
        .then(() => {
          this.$refs.annexxTable.remove(row)
          const postdata = this.$refs.annexxTable.getRecordset()
          if (postdata.removeRecords.length) {
            this.$refs.annexxTable.validate(async (valid) => {
              if (valid) {
                this.form = {
                  RemoveRecords: postdata.removeRecords
                }
                const res = await API.SaveAttachmentData(this.form)
                if (res.Result) {
                  this.form = {}
                  this.annexserve()
                  this.$notify({
                    title: this.$t('ssc._12'),
                    message: this.$t('ssc._19'),
                    type: 'success',
                    duration: 2000
                  })
                }
              }
            })
          }
        })
        .catch(() => { })
    },
    async annexserve () {
      if (this.mstid !== 0) {
        this.annexloading = true
        const res = await API.GetAttachmentList(this.mstid)
        this.annexloading = false
        this.annexTable = res.Result
      } else {
        this.mstid = 0
        this.annexTable = []
      }
    },
    blurCheckMinQ (e) {
      const { row } = e
      if (row.MIN_QUANTITY > row.MAX_QUANTITY) {
        this.$message.error(this.$t('SfcsProductPallet._32'))
        e.row.MIN_QUANTITY = ''
      }
    },
    blurCheckMaxQ (e) {
      const { row } = e
      if (row.MIN_QUANTITY > row.MAX_QUANTITY) {
        this.$message.error(this.$t('SfcsProductPallet._35'))
        e.row.MAX_QUANTITY = ''
      }
    },
    blurCheckMinW (e) {
      const { row } = e
      if (row.MIN_WEIGHT > row.MAX_WEIGHT) {
        this.$message.error(this.$t('SfcsProductPallet._33'))
        e.row.MIN_WEIGHT = ''
      }
    },
    blurCheckMaxW (e) {
      const { row } = e
      if (row.MIN_WEIGHT > row.MAX_WEIGHT) {
        e.row.MAX_WEIGHT = ''
        console.log(e.row.MAX_WEIGHT)
        this.$message.error(this.$t('SfcsProductPallet._36'))
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.SfcsProductCarton {
  .SfcsProductCarton-table {
    height: calc(100vh - 490px);
  }
  .annex-table {
    height: calc(100vh - 560px);
  }
  .annex-header {
    padding: 10px 0;
  }
}
</style>
