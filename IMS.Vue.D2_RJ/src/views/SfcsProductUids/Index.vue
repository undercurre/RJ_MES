<!--
 * @Author: your name
 * @Date: 2020-04-02 09:29:48
 * @LastEditTime: 2020-04-02 09:29:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \IMS.Vue.D2\src\views\SfcsProductUids\Index.vue
 -->
<template>
  <d2-container class="SfcsProductUids">
    <template slot="header">
      <custom-container-header :isExport="false"
                               :isExportTpl="false"
                               :isImport="false">
        <el-input v-model="formData.Key"
                  :placeholder="$t('spdu._1')"
                  clearable
                  style="width:200px"
                  @keyup.enter.native="searchClick" />&nbsp;
        <el-select v-model="formData.UID_ID"
                   clearable
                   :placeholder="$t('spdu._2')">
          <el-option v-for="item in UIDCategory"
                     :key="item.ID"
                     :label="item.OBJECT_NAME"
                     :value="item.ID" />
        </el-select>&nbsp;
        <el-select v-model="formData.COLLECT_OPERATION_ID"
                   clearable
                   :placeholder="$t('spdu._6')">
          <el-option v-for="item in Operation"
                     :key="item.ID"
                     :label="item.OPERATION_NAME"
                     :value="item.ID" />
        </el-select>&nbsp;
        <el-button type="primary"
                   icon="el-icon-search"
                   @click.prevent="searchClick">{{ $t('spdu._3') }}</el-button>
        <el-button type="success"
                   @click="insertEvent(0)"
                   icon="el-icon-plus"
                   v-if="$btnList.indexOf('SfcsProductUidsAdd') !== -1">{{ $t('spdu._4') }}</el-button>
        <el-button type="primary"
                   icon="el-icon-check"
                   @click.prevent="preserveClick"
                   v-if="$btnList.indexOf('SfcsProductUidsEdit') !== -1">{{ $t('spdu._5') }}</el-button>
      </custom-container-header>
    </template>
    <div class="SfcsProductUids-table">
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
        <vxe-table-column min-width="110"
                          field="PART_NO"
                          :title="$t('spdu._7')"
                          :edit-render="{name: 'input'}" />
        <vxe-table-column min-width="110"
                          field="UID_ID"
                          :title="$t('spdu._8')"
                          :edit-render="{name: 'select', options: UIDCategorybox}" />
        <vxe-table-column min-width="170"
                          field="DATA_FORMAT"
                          :title="$t('spdu._9')"
                          :edit-render="{name: 'input'}" />
        <vxe-table-column min-width="200"
                          field="UID_QTY"
                          :title="$t('spdu._10')"
                          :edit-render="{name: '$input', props: {type: 'number',min: '1'}}" />

        <vxe-table-column min-width="230"
                          field="SERIALIZED"
                          :title="$t('spdu._11')"
                          :edit-render="{autofocus: '.custom-input', type: 'visible'}">
          <template v-slot:edit="{ row}">
            <div class="rddselect">
              <el-switch v-model="row.SERIALIZED"
                         :active-text="$t('spdu._12')"
                         :inactive-text="$t('spdu._13')"
                         active-color="#13ce66"
                         inactive-color="#cccccc"
                         active-value="Y"
                         inactive-value="N" />
            </div>
          </template>
        </vxe-table-column>
        <vxe-table-column min-width="130"
                          field="ENABLED"
                          :title="$t('spdu._14')"
                          :edit-render="{autofocus: '.custom-input', type: 'visible'}">
          <template v-slot:edit="{ row}">
            <div class="rddselect">
              <el-switch v-model="row.ENABLED"
                         :active-text="$t('spdu._12')"
                         :inactive-text="$t('spdu._13')"
                         active-color="#13ce66"
                         inactive-color="#cccccc"
                         active-value="Y"
                         inactive-value="N" />
            </div>
          </template>
        </vxe-table-column>
        <vxe-table-column min-width="210"
                          field="REWORK_REMOVE_FLAG"
                          :title="$t('spdu._15')"
                          :edit-render="{autofocus: '.custom-input', type: 'visible'}">
          <template v-slot:edit="{ row}">
            <div class="rddselect">
              <el-switch v-model="row.REWORK_REMOVE_FLAG"
                         :active-text="$t('spdu._12')"
                         :inactive-text="$t('spdu._13')"
                         active-color="#13ce66"
                         inactive-color="#cccccc"
                         active-value="Y"
                         inactive-value="N" />
            </div>
          </template>
        </vxe-table-column>
        <vxe-table-column min-width="170"
                          field="ORDERED"
                          :title="$t('spdu._16')"
                          :edit-render="{autofocus: '.custom-input', type: 'visible'}">
          <template v-slot:edit="{ row}">
            <div class="rddselect">
              <el-switch v-model="row.ORDERED"
                         :active-text="$t('spdu._12')"
                         :inactive-text="$t('spdu._13')"
                         active-color="#13ce66"
                         inactive-color="#cccccc"
                         active-value="Y"
                         inactive-value="N" />
            </div>
          </template>
        </vxe-table-column>
        <vxe-table-column min-width="180"
                          field="COLLECT_OPERATION_ID"
                          :title="$t('spdu._17')"
                          :edit-render="{name: 'select', options: Operationbox}" />
        <!-- <vxe-table-column :title="$t('publics.field.operate')"
                          width="150"
                          align="center"
                          fixed="right">
          <template v-slot="{ row }">
            <el-button type="danger"
                       @click="removeClick(row, row.$index)"
                       v-if="$btnList.indexOf('SfcsProductUidsSaveDataDelete') !== -1">{{ $t('publics.btn.delete') }}</el-button>
          </template>
        </vxe-table-column>-->
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
        {{$t('spdu._30')}}
        <el-button type="success"
                   @click="annexEvent(0)"
                   icon="el-icon-plus"
                   v-if="$btnList.indexOf('SfcsProductUidsAdd2') !== -1">{{ $t('spdu._4') }}</el-button>
        <el-button type="primary"
                   icon="el-icon-check"
                   @click.prevent="annexserveClick"
                   v-if="$btnList.indexOf('SfcsProductUidsEdit2') !== -1">{{ $t('spdu._5') }}</el-button>
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
                          :title="$t('spdu._24')"
                          :edit-render="{name: 'select', options: Attachmentbox}" />
        <vxe-table-column field="DATA_FORMAT"
                          :title="$t('spdu._25')"
                          :edit-render="{name: 'input'}" />
        <vxe-table-column field="FIX_VALUE"
                          :title="$t('spdu._26')"
                          :edit-render="{name: 'input'}" />
        <vxe-table-column field="ATTACHMENT_QTY"
                          :title="$t('spdu._27')"
                          :edit-render="{name: '$input', props: {type: 'number',min: '1'}}" />

        <vxe-table-column field="ENABLED"
                          :title="$t('spdu._28')"
                          :edit-render="{autofocus: '.custom-input', type: 'visible'}">
          <template v-slot:edit="{ row}">
            <div class="rddselect">
              <el-switch v-model="row.ENABLED"
                         :active-text="$t('spdu._12')"
                         :inactive-text="$t('spdu._13')"
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
                       v-if="$btnList.indexOf('SfcsProductUidsSaveAttachmentDataDelete') !== -1">{{ $t('publics.btn.delete') }}</el-button>
          </template>
        </vxe-table-column>
      </vxe-table>
    </div>
  </d2-container>
</template>
<script>
import helper from '@/api/SfcsProductUids'
import customContainerHeader from '@/components/custom-container-header'
const API = helper('SfcsProductUids')
export default {
  name: 'SfcsProductUids',
  components: {
    customContainerHeader
  },
  data () {
    return {
      Attachment: [],
      Attachmentbox: [],
      Operation: [],
      Operationbox: [],
      UIDCategory: [],
      UIDCategorybox: [],

      loading: false,
      mainTable: [],
      total: 0,
      formData: {
        COLLECT_OPERATION_ID: '',
        UID_ID: '',
        Key: '',
        Page: 1,
        Limit: 15
      },
      validRules: {
        PART_NO: [
          {
            required: true,
            message: this.$t('spdu._1')
          }
        ],
        UID_ID: [
          {
            required: true,
            message: this.$t('spdu._2')
          }
        ],
        DATA_FORMAT: [
          {
            required: true,
            message: this.$t('spdu._21')
          }
        ],
        COLLECT_OPERATION_ID: [
          {
            required: true,
            message: this.$t('spdu._6')
          }
        ],
        UID_QTY: [
          {
            required: true,
            message: this.$t('spdu._31')
          }
        ]
      },
      form: {
        insertRecords: [],
        updateRecords: []
      },
      formAnnex: {
        InsertRecords: [],
        UpdateRecords: []
      },
      annexRules: {
        ATTACHMENT_ID: [
          {
            required: true,
            message: this.$t('spdu._29')
          }
        ],
        ATTACHMENT_QTY: [
          { required: true, message: this.$t('SfcsProductPallet._40') }
        ]
        // DATA_FORMAT: [
        //   {
        //     required: true,
        //     message: this.$t('spdu._21')
        //   }
        // ]
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
            message: this.$t('spdu._22'),
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
        this.mstid = e.row.ID
        this.annexserve()
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
        this.UIDCategory = res.Result.UIDCategory
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

        this.UIDCategorybox.push({
          label: '',
          value: '',
          disabled: false
        })
        this.UIDCategory.map((item) => {
          this.UIDCategorybox.push({
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
            API.SaveData(this.form).then((response) => {
              if (response.Result) {
                this.form = {}
                that.$notify({
                  title: this.$t('spdu._18'),
                  message: this.$t('spdu._19'),
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
          message: this.$t('spdu._20'),
          type: 'warning'
        })
      }
    },
    // 新增
    async insertEvent (row) {
      const record = {
        ID: 0,
        PART_NO: '', // 料号
        UID_ID: '', // UID种类
        DATA_FORMAT: '', // 格式限定
        UID_QTY: 1, // 收集数量
        SERIALIZED: 'Y', // 是否唯一序列
        ENABLED: 'Y', // 是否激活
        REWORK_REMOVE_FLAG: 'Y', // 是否返工清除
        ORDERED: 'Y', // 是否排序
        EDI_FLAG: '', // 是否EDI
        COLLECT_OPERATION_ID: '' // 采集工序
      }
      this.$refs.xTable.insertAt(record, row).then(({ row }) => {
        this.$refs.xTable.setActiveRow(row)
      })
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
    //  附件保存
    annexserveClick () {
      if (this.mstid === 0) {
        this.$message({
          showClose: true,
          message: this.$t('spdu._23'),
          type: 'warning'
        })
        return
      }
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
          return true
        } else {
          isRES = false
        }
      })
      if (isRES) {
        return
      }
      var that = this
      var postdata = this.$refs.annexxTable.getRecordset()
      if (
        postdata.insertRecords.length ||
        postdata.removeRecords.length ||
        postdata.updateRecords.length
      ) {
        this.$refs.annexxTable.validate((valid) => {
          if (valid) {
            this.formAnnex.InsertRecords = postdata.insertRecords
            this.formAnnex.UpdateRecords = postdata.updateRecords
            API.SaveAttachmentData(this.formAnnex).then((response) => {
              if (response.Result) {
                that.formAnnex = {}
                that.$notify({
                  title: this.$t('spdu._18'),
                  message: this.$t('spdu._19'),
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
          message: this.$t('spdu._20'),
          type: 'warning'
        })
      }
    },
    // 附件新增新增
    async annexEvent (row) {
      if (this.mstid === 0) {
        this.$message({
          showClose: true,
          message: this.$t('spdu._23'),
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
                this.formAnnex = {
                  RemoveRecords: postdata.removeRecords
                }
                const res = await API.SaveAttachmentData(this.formAnnex)
                if (res.Result) {
                  this.formAnnex = {}
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
    }
  }
}
</script>
<style lang="scss" scoped>
.SfcsProductUids {
  .SfcsProductUids-table {
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
