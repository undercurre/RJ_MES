<template>
  <d2-container class="SfcsProductResources">
    <template slot="header">
      <custom-container-header :isExport="false"
                               :isExportTpl="false"
                               :isImport="false">
        <el-input v-model="formData.PART_NO"
                  :placeholder="$t('sprs._1')"
                  clearable
                  style="width:200px"
                  @keyup.enter.native="searchClick" />&nbsp;
        <!-- <el-select v-model="formData.UID_ID" clearable :placeholder="$t('sprs._2')">
          <el-option
            v-for="item in SourceList"
            :key="item.ID"
            :label="item.OBJECT_NAME"
            :value="item.ID"
          />
        </el-select>&nbsp;
        <el-select v-model="formData.COLLECT_OPERATION_ID" clearable :placeholder="$t('sprs._6')">
          <el-option
            v-for="item in Operation"
            :key="item.ID"
            :label="item.OPERATION_NAME"
            :value="item.ID"
          />
        </el-select>&nbsp;-->
        <el-button type="primary"
                   icon="el-icon-search"
                   @click.prevent="searchClick">{{ $t('sprs._3') }}</el-button>
        <el-button type="success"
                   @click="insertEvent(0)"
                   icon="el-icon-plus"
                   v-if="$btnList.indexOf('SfcsProductResourcesAdd') !== -1">{{ $t('sprs._4') }}</el-button>
        <el-button type="primary"
                   icon="el-icon-check"
                   @click.prevent="preserveClick"
                   v-if="$btnList.indexOf('SfcsProductResourcesEdit') !== -1">{{ $t('sprs._5') }}</el-button>
      </custom-container-header>
    </template>
    <div class="SfcsProductResources-table">
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
        <vxe-table-column min-width="150"
                          field="PART_NO"
                          :title="$t('sprs._7')"
                          :edit-render="{name: 'input'}" />
        <vxe-table-column min-width="190"
                          field="COLLECT_OPERATION_ID"
                          :title="$t('sprs._17')"
                          :edit-render="{name: 'select', options: Operationbox}" />
        <vxe-table-column field="RESOURCE_ID"
                          min-width="180"
                          :title="$t('sprs._8')"
                          :edit-render="{name: 'select', options: SourceListbox}" />
        <vxe-table-column field="DATA_FORMAT"
                          min-width="180"
                          :title="$t('sprs._9')"
                          :edit-render="{name: 'input'}" />
        <vxe-table-column field="FIXED_VALUE"
                          min-width="150"
                          :title="$t('sprs._10')"
                          :edit-render="{name: 'input'}" />

        <vxe-table-column field="RESOURCE_QTY"
                          min-width="150"
                          :title="$t('sprs._11')"
                          :edit-render="{name: '$input', props: {type: 'number',min: '0'}}" />
        <vxe-table-column field="ENABLED"
                          min-width="180"
                          :title="$t('sprs._14')"
                          :edit-render="{autofocus: '.custom-input', type: 'visible'}">
          <template v-slot:edit="{ row}">
            <div class="rddselect">
              <el-switch v-model="row.ENABLED"
                         :active-text="$t('sprs._12')"
                         :inactive-text="$t('sprs._13')"
                         active-color="#13ce66"
                         inactive-color="#cccccc"
                         active-value="Y"
                         inactive-value="N" />
            </div>
          </template>
        </vxe-table-column>
        <vxe-table-column field="REWORK_REMOVE_FLAG"
                          min-width="240"
                          :title="$t('sprs._15')"
                          :edit-render="{autofocus: '.custom-input', type: 'visible'}">
          <template v-slot:edit="{ row}">
            <div>
              <el-switch v-model="row.REWORK_REMOVE_FLAG"
                         :active-text="$t('sprs._12')"
                         :inactive-text="$t('sprs._13')"
                         active-color="#13ce66"
                         inactive-color="#cccccc"
                         active-value="Y"
                         inactive-value="N" />
            </div>
          </template>
        </vxe-table-column>
        <vxe-table-column field="EDI_FLAG"
                          min-width="150"
                          :title="$t('sprs._16')"
                          :edit-render="{autofocus: '.custom-input', type: 'visible'}">
          <template v-slot:edit="{ row}">
            <div class="rddselect">
              <el-switch v-model="row.EDI_FLAG"
                         :active-text="$t('sprs._12')"
                         :inactive-text="$t('sprs._13')"
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
                       @click="removeClick(row, row.$index)"
                       v-if="$btnList.indexOf('SfcsProductResourcesDelete') !== -1">{{ $t('publics.btn.delete') }}</el-button>
          </template>
        </vxe-table-column>
      </vxe-table>
    </div>
    <!-- <template slot="footer"> -->
    <el-pagination ref="pagi"
                   :current-page="formData.Page"
                   :page-size="formData.Limit"
                   :page-sizes="[15, 25, 35, 45]"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="total"
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange" />
    <!-- </template> -->
    <div class="annex-table">
      <div class="annex-header">
        {{$t('sprs._30')}}
        <el-button type="success"
                   @click="annexEvent(0)"
                   icon="el-icon-plus"
                   v-if="$btnList.indexOf('SfcsProductResourcesAdd2') !== -1">{{ $t('sprs._4') }}</el-button>
        <el-button type="primary"
                   icon="el-icon-check"
                   @click.prevent="annexserveClick"
                   v-if="$btnList.indexOf('SfcsProductResourcesEdit2') !== -1">{{ $t('sprs._5') }}</el-button>
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
                          :title="$t('sprs._24')"
                          :edit-render="{name: 'select', options: Attachmentbox}" />
        <vxe-table-column field="DATA_FORMAT"
                          :title="$t('sprs._25')"
                          :edit-render="{name: 'input'}" />
        <vxe-table-column field="FIX_VALUE"
                          :title="$t('sprs._26')"
                          :edit-render="{name: 'input'}" />
        <vxe-table-column field="ATTACHMENT_QTY"
                          :title="$t('sprs._27')"
                          :edit-render="{name: '$input', props: {type: 'number',min: '1'}}" />

        <vxe-table-column field="ENABLED"
                          :title="$t('sprs._28')"
                          :edit-render="{autofocus: '.custom-input', type: 'visible'}">
          <template v-slot:edit="{ row}">
            <div class="rddselect">
              <el-switch v-model="row.ENABLED"
                         :active-text="$t('sprs._12')"
                         :inactive-text="$t('sprs._13')"
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
                       v-if="$btnList.indexOf('SaveDataDelete') !== -1">{{ $t('publics.btn.delete') }}</el-button>
          </template>
        </vxe-table-column>
      </vxe-table>
      <el-pagination ref="pagi"
                     :current-page="Aattac.Page"
                     :page-size="Aattac.Limit"
                     :page-sizes="[15, 25, 35, 45]"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="attactotal"
                     @size-change="AttachandleSizeChange"
                     @current-change="AttachandleCurrentChange" />
    </div>
  </d2-container>
</template>
<script>
import helper from '@/api/SfcsProductResources'
import helperUids from '@/api/SfcsProductUids'
import customContainerHeader from '@/components/custom-container-header'
const API = helper('SfcsProductResources')
const APIUids = helperUids('SfcsProductUids')
export default {
  name: 'SfcsProductResources',
  components: {
    customContainerHeader
  },
  data () {
    return {
      Attachment: [],
      Attachmentbox: [],
      Operation: [],
      Operationbox: [],
      SourceList: [],
      SourceListbox: [],

      loading: false,
      mainTable: [],
      total: 0,
      formData: {
        PART_NO: '',
        Page: 1,
        Limit: 15
      },
      validRules: {
        PART_NO: [
          {
            required: true,
            message: this.$t('sprs._1')
          }
        ],
        RESOURCE_ID: [
          {
            required: true,
            message: this.$t('sprs._2')
          }
        ],
        // DATA_FORMAT: [
        //   {
        //     required: true,
        //     message: this.$t('sprs._21')
        //   }
        // ],
        COLLECT_OPERATION_ID: [
          {
            required: true,
            message: this.$t('sprs._6')
          }
        ],
        RESOURCE_QTY: [
          {
            required: true,
            message: this.$t('sprs._31')
          }
        ]
      },
      form: {
        InsertRecords: [],
        UpdateRecords: []
      },
      annexRules: {
        ATTACHMENT_ID: [
          {
            required: true,
            message: this.$t('sprs._29')
          }
        ],
        // DATA_FORMAT: [
        //   {
        //     required: true,
        //     message: this.$t('sprs._21')
        //   }
        // ],
        // FIX_VALUE: [
        //   {
        //     required: true,
        //     message: this.$t('sprs._32')
        //   }
        // ],
        ATTACHMENT_QTY: [
          {
            required: true,
            message: this.$t('sprs._33')
          }
        ]
      },
      annexloading: false,
      annexTable: [],
      Aattac: {
        PRODUCT_OBJECT_ID: 0,
        Page: 1,
        Limit: 15
      },
      formAattac: {
        InsertAttachments: [],
        UpdateAttachments: []
      },
      attactotal: 0
    }
  },
  created () {
    this.getIndex()
  },
  methods: {
    // 判断料号是否存在
    async editClick (e) {
      if (e.row.PART_NO) {
        const res = await APIUids.PartNOIsExist(e.row.PART_NO)
        if (!res.Result) {
          this.$message({
            showClose: true,
            message: this.$t('sprs._22'),
            type: 'warning'
          })
          e.row.PART_NO = ''
        }
        console.log(res)
      }
    },
    // 获取附件数据
    async cellClick (e) {
      if (e.row.ID !== 0) {
        this.Aattac.PRODUCT_OBJECT_ID = e.row.ID
        this.annexserve()
      } else {
        this.Aattac.PRODUCT_OBJECT_ID = 0
        this.annexTable = []
      }
    },
    // 获取权限、下拉框
    async getIndex () {
      const res = await API.Index()
      if (res.Result) {
        this.Attachment = res.Result.Attachment
        this.Operation = res.Result.Operation
        this.SourceList = res.Result.SourceList
        this.getLoadData()
        this.Attachmentbox.push({
          label: '',
          value: '',
          disabled: false
        })
        this.Attachment.map((item) => {
          this.Attachmentbox.push({
            label: item.DESCRIPTION,
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

        this.SourceListbox.push({
          label: '',
          value: '',
          disabled: false
        })
        this.SourceList.map((item) => {
          this.SourceListbox.push({
            label: item.OBJECT_NAME,
            value: Number(item.ID),
            disabled: false
          })
        })
      }
    },
    async getLoadData () {
      this.loading = true
      const res = await API.LoadData(this.formData)
      this.loading = false
      this.mainTable = res.Result
      console.log(this.mainTable, '获取表格')
      this.total = res.TotalCount
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
    // 新增
    async insertEvent (row) {
      const record = {
        ID: 0,
        PART_NO: '', // 料号
        RESOURCE_ID: '', // 资源名称
        DATA_FORMAT: '', // 格式限定
        FIXED_VALUE: '', // 固定值
        RESOURCE_QTY: 1, // 数量
        ENABLED: 'Y', // 是否激活
        REWORK_REMOVE_FLAG: 'Y', // 返工是否自动清除
        EDI_FLAG: 'Y', // 是否EDI
        COLLECT_OPERATION_ID: '' // 采集工序
      }
      this.$refs.xTable.insertAt(record, row).then(({ row }) => {
        this.$refs.xTable.setActiveRow(row)
      })
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
        this.$refs.xTable.validate((valid) => {
          if (valid) {
            this.form.InsertRecords = postdata.insertRecords
            this.form.UpdateRecords = postdata.updateRecords
            var statr = false
            this.form.InsertRecords.map((item) => {
              if (!item.DATA_FORMAT && !item.FIXED_VALUE) {
                statr = true
                return this.$message.error(this.$t('sprs._34'))
              }
              if (item.RESOURCE_QTY <= 0) {
                statr = true
                return this.$message.error(this.$t('sprs._35'))
              }
            })
            this.form.UpdateRecords.map((item) => {
              if (!item.DATA_FORMAT && !item.FIXED_VALUE) {
                statr = true
                return this.$message.error(this.$t('sprs._34'))
              }
              if (item.RESOURCE_QTY <= 0) {
                statr = true
                return this.$message.error(this.$t('sprs._35'))
              }
            })
            if (statr) {
              return
            }
            console.log(JSON.stringify(this.form))
            API.SaveData(this.form).then((response) => {
              if (response.Result) {
                that.form = {}
                that.$notify({
                  title: this.$t('sprs._18'),
                  message: this.$t('sprs._19'),
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
          message: this.$t('sprs._20'),
          type: 'warning'
        })
      }
    },
    // 删除
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
    // 获取附件
    async annexserve () {
      if (this.Aattac.PRODUCT_OBJECT_ID !== 0) {
        this.annexloading = true
        const res = await API.GetAattachments(this.Aattac)
        this.annexloading = false
        this.annexTable = res.Result
        this.attactotal = res.TotalCount
      } else {
        this.Aattac.PRODUCT_OBJECT_ID = 0
        this.annexTable = []
      }
    },
    //  附件保存
    annexserveClick () {
      var that = this
      if (this.Aattac.PRODUCT_OBJECT_ID === 0) {
        this.$message({
          showClose: true,
          message: this.$t('sprs._23'),
          type: 'warning'
        })
        return
      }
      var tabdata = this.$refs.annexxTable.getTableData().tableData
      var postdata = this.$refs.annexxTable.getRecordset()
      if (
        postdata.insertRecords.length ||
        postdata.removeRecords.length ||
        postdata.updateRecords.length
      ) {
        this.$refs.annexxTable.validate((valid) => {
          if (valid) {
            var isRES = false
            tabdata.some((v, i) => {
              if (
                (v.DATA_FORMAT === '' || v.DATA_FORMAT === null) &&
                (v.FIX_VALUE === '' || v.FIX_VALUE === null)
              ) {
                this.$message.error(this.$t('sprs._34'))
                isRES = true
                return true
              } else {
                isRES = false
              }
            })
            if (isRES) {
              return
            }
            this.formAattac.InsertAttachments = postdata.insertRecords
            this.formAattac.UpdateAttachments = postdata.updateRecords
            API.SaveData(this.formAattac).then((response) => {
              if (response.Result) {
                this.formAattac = {}
                that.$notify({
                  title: this.$t('sprs._18'),
                  message: this.$t('sprs._19'),
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
          message: this.$t('sprs._20'),
          type: 'warning'
        })
      }
    },
    // 附件新增新增
    async annexEvent (row) {
      if (this.Aattac.PRODUCT_OBJECT_ID === 0) {
        this.$message({
          showClose: true,
          message: this.$t('sprs._23'),
          type: 'warning'
        })
        return
      }
      const record = {
        ID: 0,
        PRODUCT_OBJECT_ID: Number(this.Aattac.PRODUCT_OBJECT_ID), // 主表ID
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
                this.formAattac = {
                  RemoveAttachments: postdata.removeRecords
                }
                const res = await API.SaveData(this.formAattac)
                if (res.Result) {
                  this.formAattac = {}
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
    AttachandleSizeChange (val) {
      if (this.Aattac.PRODUCT_OBJECT_ID) {
        this.Aattac.Limit = val
        this.annexserve()
      }
    },
    AttachandleCurrentChange (val) {
      if (this.Aattac.PRODUCT_OBJECT_ID) {
        this.Aattac.Page = val
        this.annexserve()
      }
    },
    // 正则校验 要求只要输入 0-9 E e
    handleInputFixedValue (e) {
      const { row } = e
      if (!/(^[1-9]+[0-9]*]*$)|E|e/.test(row.FIXED_VALUE)) {
        e.row.FIXED_VALUE = row.FIXED_VALUE.substr(
          0,
          row.FIXED_VALUE.length - 1
        )
      }
    },
    handleInputQ (e) {
      const { row } = e
      if (!/(^[1-9]+[0-9]*]*$)|E|e/.test(row.RESOURCE_QTY)) {
        e.row.RESOURCE_QTY = row.RESOURCE_QTY.substr(
          0,
          row.RESOURCE_QTY.length - 1
        )
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.SfcsProductResources {
  .SfcsProductResources-table {
    height: calc(100vh - 490px);
  }
  .annex-table {
    height: calc(100vh - 580px);
  }
  .annex-header {
    padding: 10px 0;
  }
}
</style>
