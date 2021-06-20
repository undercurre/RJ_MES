<template>
  <d2-container>
    <template slot="header">
      <custom-container-header :isExport="false"
                               :isExportTpl="false"
                               :isImport="false">
        <el-input v-model="formData.PART_NO"
                  clearable
                  style="width:200px"
                  :placeholder="$t('SfcsProductPallet._1')"
                  @keyup.enter.native="searchClick" />
        <el-button type="primary"
                   icon="el-icon-search"
                   @click.prevent="searchClick">{{ $t('publics.btn.search') }}</el-button>
        <el-button type="warning"
                   icon="el-icon-refresh"
                   @click.prevent="refresh">{{ $t('publics.btn.refresh') }}</el-button>
        <el-button type="success"
                   icon="el-icon-plus"
                   @click.prevent="addData(0)"
                   v-if="$btnList.indexOf('SfcsProductPalletAdd') !== -1">{{ $t('publics.btn.add') }}</el-button>
        <el-button type="primary"
                   icon="el-icon-check"
                   @click.prevent="saveData"
                   v-if="$btnList.indexOf('SfcsProductPalletEdit') !== -1">{{ $t('publics.btn.save') }}</el-button>
      </custom-container-header>
    </template>
    <div class="block-one">
      <div>
        <vxe-table ref="xTable"
                   class="table-container1"
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
                   @cell-click="cellClick"
                   @edit-closed="handleClosedEdit">
          <vxe-table-column field="PART_NO"
                            width="180"
                            :title="$t('SfcsProductPallet._3')"
                            :edit-render="{autofocus: '.custom-input'}">
            <template v-slot:edit="{row, $rowIndex}">
              <div>
                <vxe-input v-model="row.PART_NO"
                           @blur="handleCheckPartID(row, $rowIndex)"></vxe-input>
              </div>
            </template>
          </vxe-table-column>
          <vxe-table-column field="FORMAT"
                            width="170"
                            :title="$t('SfcsProductPallet._4')"
                            :edit-render="{name: 'input'}" />
          <vxe-table-column field="COLLECT_OPERATION_ID"
                            width="200"
                            :title="$t('SfcsProductPallet._5')"
                            :edit-render="{autofocus: '.custom-input', type: 'visible', autoselect: true}">
            <template v-slot:edit="{row, $rowIndex}">
              <div>
                <span v-show="$rowIndex !== currentRowIndex">{{ getCollectName(row.COLLECT_OPERATION_ID) }}</span>
                <el-select class="custom-select"
                           v-show="$rowIndex === currentRowIndex"
                           v-model="row.COLLECT_OPERATION_ID"
                           style="width: 100%">
                  <div style="height: 34px;padding: 0 20px;display: flex;position: sticky;top: 0;background: #fff;z-index: 9;border-bottom: 1px solid rgb(229, 231, 237)">
                    <span style="width: 60%;box-size: border-box;padding-right: 10px;color: #606266;line-height: 34px;font-size: 14px">{{ $t('SfcsProductPallet._6') }}</span>
                    <span style="width: 40%;color: #606266;line-height: 34px;font-size: 14px;box-size: border-box;padding-left: 10px;border-left: 1px solid rgb(229, 231, 237)">{{ $t('SfcsProductPallet._7') }}</span>
                  </div>
                  <el-option style="width: 360px;display: flex"
                             v-for="item in Operation"
                             :key="item.ID"
                             :value="item.ID"
                             :label="item.OPERATION_NAME">
                    <span style="width: 60%;box-size: border-box;padding-right: 10px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{ item.OPERATION_NAME }}</span>
                    <span style="width: 40%;box-size: border-box;padding-left: 10px;border-left: 1px solid rgb(229, 231, 237)">{{ item.DESCRIPTION }}</span>
                  </el-option>
                </el-select>
              </div>
            </template>
          </vxe-table-column>
          <vxe-table-column field="STANDARD_QUANTITY"
                            width="170"
                            :title="$t('SfcsProductPallet._8')"
                            :edit-render="{name: '$input', props: {type: 'number',min:'1'}}" />
          <vxe-table-column field="MAX_QUANTITY"
                            width="170"
                            :title="$t('SfcsProductPallet._9')"
                            :edit-render="{name: '$input', props: {type: 'number'}, events: {input: blurCheckMaxQ}}"></vxe-table-column>
          <vxe-table-column field="MIN_QUANTITY"
                            width="170"
                            :title="$t('SfcsProductPallet._10')"
                            :edit-render="{name: '$input', props: {type: 'number'}, events: {input: blurCheckMinQ}}" />
          <vxe-table-column field="STANDARD_WEIGHT"
                            width="150"
                            :title="$t('SfcsProductPallet._11')"
                            :edit-render="{name: 'input'}" />
          <vxe-table-column field="MAX_WEIGHT"
                            width="160"
                            :title="$t('SfcsProductPallet._12')"
                            :edit-render="{name: '$input', props: { type: 'number' }, events: { input: blurCheckMaxW}}" />
          <vxe-table-column field="MIN_WEIGHT"
                            width="160"
                            :title="$t('SfcsProductPallet._13')"
                            :edit-render="{name: '$input', props: { type: 'number' }, events: {input: blurCheckMinW}}" />
          <vxe-table-column field="STANDARD_CUBAGE"
                            width="150"
                            :title="$t('SfcsProductPallet._14')"
                            :edit-render="{name: 'input'}" />
          <vxe-table-column field="MAX_CUBAGE"
                            width="160"
                            :title="$t('SfcsProductPallet._15')"
                            :edit-render="{name: '$input', props: {type: 'number'}, events: {input: blurCheckMaxC}}" />
          <vxe-table-column field="MIN_CUBAGE"
                            width="160"
                            :title="$t('SfcsProductPallet._16')"
                            :edit-render="{name: '$input', props: {type: 'number'}, events: {input: blurCheckMinC}}" />
          <vxe-table-column field="LENGTH"
                            width="150"
                            :title="$t('SfcsProductPallet._17')"
                            :edit-render="{name: '$input', props: {type: 'number'}}" />
          <vxe-table-column field="WIDTH"
                            width="150"
                            :title="$t('SfcsProductPallet._18')"
                            :edit-render="{name: '$input', props: {type: 'number'}}" />
          <vxe-table-column field="HEIGHT"
                            width="150"
                            :title="$t('SfcsProductPallet._19')"
                            :edit-render="{name: '$input', props: {type: 'number'}}" />
          <vxe-table-column field="ENABLED"
                            fixed="right"
                            width="150"
                            :title="$t('as_src.tb_an')"
                            :edit-render="{autofocus: '.custom-input', type: 'visible'}">
            <template v-slot:edit="{ row, $rowIndex }">
              <div>
                <el-switch :disabled="$rowIndex !== currentRowIndex"
                           v-model="row.ENABLED"
                           :active-text="$t('as_src.sw_yes')"
                           :inactive-text="$t('as_src.sw_no')"
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
                         v-if="$btnList.indexOf('SfcsProductPalletRemove') !== -1">{{ $t('publics.btn.delete') }}</el-button>
            </template>
          </vxe-table-column>
        </vxe-table>
      </div>
      <div class="foot-page">
        <el-pagination :current-page="formData.Page"
                       :page-size="formData.Limit"
                       :page-sizes="[10, 20, 30, 40]"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="totalPage"
                       @size-change="_handleSizeChange"
                       @current-change="_handleCurrentChange" />
      </div>
    </div>
    <div class="block-two">
      <div style="display: flex;align-items: center">
        <div style="border-top: 1px solid rgb(229, 231, 237);">
          <span style="display: block;color: #8492a6;font-size: 14px;margin: 10px 0;">{{ $t('SfcsProductPallet._20') }}</span>
        </div>
        <el-button type="success"
                   style="margin-left: 10px"
                   :disabled="attrDisabled"
                   icon="el-icon-plus"
                   size="small"
                   @click.prevent="addSubData(0)"
                   v-if="$btnList.indexOf('SfcsProductPalletAdd2') !== -1">{{ $t('sprs._4') }}</el-button>
        <el-button type="primary"
                   icon="el-icon-check"
                   @click.prevent="annexserveClick"
                   v-if="$btnList.indexOf('SfcsProductResourcesEdit2') !== -1">{{ $t('sprs._5') }}</el-button>
      </div>

      <div>
        <vxe-table ref="_xTable"
                   class="table-container2"
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
                   :loading="loading2"
                   :data="mainTable2"
                   :edit-rules="validRules2"
                   :mouse-config="{selected: true}"
                   :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
                   :radio-config="{labelField: 'name', trigger: 'row'}"
                   :checkbox-config="{checkField: 'checked', trigger: 'row'}"
                   @cell-click="cellClick2"
                   @edit-closed="handleClosedEdit2">
          <vxe-table-column field="ATTACHMENT_ID"
                            width="200"
                            :title="$t('SfcsProductPallet._21')"
                            :edit-render="{autofocus: '.custom-input', type: 'visible', autoselect: true}">
            <template v-slot:edit="{row, $rowIndex}">
              <div>
                <span v-show="$rowIndex !== currentRowIndex2">{{ getObjectName(row.ATTACHMENT_ID) }}</span>
                <el-select class="custom-select"
                           v-show="$rowIndex === currentRowIndex2"
                           v-model="row.ATTACHMENT_ID"
                           style="width: 100%">
                  <div style="height: 34px;padding: 0 20px;display: flex;position: sticky;top: 0;background: #fff;z-index: 9;border-bottom: 1px solid rgb(229, 231, 237)">
                    <span style="width: 60%;box-size: border-box;padding-right: 10px;color: #606266;line-height: 34px;font-size: 14px">{{ $t('SfcsProductPallet._6') }}</span>
                    <span style="width: 40%;color: #606266;line-height: 34px;font-size: 14px;box-size: border-box;padding-left: 10px;border-left: 1px solid rgb(229, 231, 237)">{{ $t('SfcsProductPallet._7') }}</span>
                  </div>
                  <el-option style="width: 360px;display: flex"
                             v-for="item in Attachment"
                             :key="item.ID"
                             :value="item.ID"
                             :label="item.OBJECT_NAME">
                    <span style="width: 60%;box-size: border-box;padding-right: 10px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{ item.OBJECT_NAME }}</span>
                    <span style="width: 40%;box-size: border-box;padding-left: 10px;border-left: 1px solid rgb(229, 231, 237)">{{ item.DESCRIPTION }}</span>
                  </el-option>
                </el-select>
              </div>
            </template>
          </vxe-table-column>
          <vxe-table-column field="DATA_FORMAT"
                            min-width="150"
                            :title="$t('SfcsProductPallet._22')"
                            :edit-render="{name: 'input'}" />
          <vxe-table-column field="FIX_VALUE"
                            min-width="150"
                            :title="$t('SfcsProductPallet._23')"
                            :edit-render="{name: 'input'}" />
          <vxe-table-column field="ATTACHMENT_QTY"
                            min-width="150"
                            :title="$t('SfcsProductPallet._24')"
                            :edit-render="{name: '$input', props: {type: 'number',min: '1'}}" />
          <vxe-table-column field="ENABLED"
                            width="150"
                            :title="$t('as_src.tb_an')"
                            :edit-render="{autofocus: '.custom-input', type: 'visible'}">
            <template v-slot:edit="{ row, $rowIndex }">
              <div>
                <el-switch :disabled="$rowIndex !== currentRowIndex2"
                           v-model="row.ENABLED"
                           :active-text="$t('publics.btn.yes')"
                           :inactive-text="$t('publics.btn.no')"
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
                         @click="removeClick2(row, row.$index)">{{ $t('publics.btn.delete') }}</el-button>
            </template>
          </vxe-table-column>
        </vxe-table>
      </div>
      <div class="foot-page"
           style="padding-bottom: 0px">
        <el-pagination :current-page="queryData.Page"
                       :page-size="queryData.Limit"
                       :page-sizes="[10, 20, 30, 40]"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="totalPage2"
                       @size-change="handleSizeChange2"
                       @current-change="handleCurrentChange2" />
      </div>
    </div>
  </d2-container>
</template>

<script>
import pagination from '@/views/mixin/page'
import customContainerHeader from '@/components/custom-container-header'
import {
  Index,
  LoadData,
  GetAattachments,
  SaveData,
  checkPn
} from '@/api/SfcsProductPallet'
export default {
  name: 'SfcsProductPallet',
  mixins: [pagination],
  components: {
    customContainerHeader
  },
  data () {
    return {
      formData: {
        PART_NO: '',
        Page: 1,
        Limit: 10,
        Key: ''
      },
      loading: false,
      mainTable: [],
      validRules: {
        PART_NO: [
          { required: true, message: this.$t('SfcsProductPallet._25') }
        ],
        FORMAT: [{ required: true, message: this.$t('SfcsProductPallet._26') }],
        COLLECT_OPERATION_ID: [
          { required: true, message: this.$t('SfcsProductPallet._27') }
        ],
        STANDARD_QUANTITY: [
          { required: true, message: this.$t('SfcsProductPallet._38') }
        ]
      },
      Operation: [],
      Attachment: [],
      currentRowIndex: -1,
      currentIndex: 0,
      loading2: false,
      mainTable2: [],
      validRules2: {
        ATTACHMENT_ID: [
          { required: true, message: this.$t('SfcsProductPallet._28') }
        ],
        DATA_FORMAT: [
          { required: true, message: this.$t('SfcsProductPallet._29') }
        ],
        FIX_VALUE: [
          { required: true, message: this.$t('SfcsProductPallet._39') }
        ],
        ATTACHMENT_QTY: [
          { required: true, message: this.$t('SfcsProductPallet._40') }
        ]
      },
      totalPage2: 0,
      queryData: {
        PRODUCT_OBJECT_ID: '',
        Page: 1,
        Limit: 10,
        Key: ''
      },
      currentRowIndex2: -1,
      form: {},
      attrDisabled: false
    }
  },
  methods: {
    annexserveClick () {
      var that = this
      var postdata = this.$refs._xTable.getRecordset()
      if (
        postdata.insertRecords.length ||
        postdata.removeRecords.length ||
        postdata.updateRecords.length
      ) {
        this.$refs._xTable.validate((valid) => {
          if (valid) {
            this.form = {}
            this.form.InsertAttachments = postdata.insertRecords
            this.form.UpdateAttachments = postdata.updateRecords
            SaveData(this.form).then((response) => {
              if (response.Result) {
                that.$notify({
                  title: this.$t('sprs._18'),
                  message: this.$t('sprs._19'),
                  type: 'success',
                  duration: 2000
                })
              }
              this.getAattachments()
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
    refresh () {
      this.currentRowIndex = -1
      this.currentRowIndex2 = -1
      this.currentIndex = 0
      this.queryData = {
        PRODUCT_OBJECT_ID: '',
        Page: 1,
        Limit: 10,
        Key: ''
      }
      this.formData = {
        PART_NO: '',
        Page: 1,
        Limit: 10,
        Key: ''
      }
      this.mainTable = []
      this.mainTable2 = []
      this.getIndex()
    },
    clearAll () { },
    // 保存方法
    async saveData () {
      let postdata = this.$refs.xTable.getRecordset()
      let _postdata = this.$refs._xTable.getRecordset()
      if (
        postdata.insertRecords.length ||
        postdata.removeRecords.length ||
        postdata.updateRecords.length ||
        _postdata.insertRecords.length ||
        _postdata.removeRecords.length ||
        _postdata.updateRecords.length
      ) {
        this.form.InsertProductPallet = postdata.insertRecords
        this.form.UpdateProductPallet = postdata.updateRecords
        this.form.RemoveRecords = postdata.removeRecords
        this.form.InsertAttachments = _postdata.insertRecords
        this.form.UpdateAttachments = _postdata.updateRecords
        this.form.RemoveAttachments = _postdata.removeRecords
        const valids = await Promise.all([
          new Promise((resolve) => {
            this.$refs.xTable.validate((valid) => {
              resolve(valid)
            })
          }),
          new Promise((resolve) => {
            this.$refs._xTable.validate((valid) => {
              resolve(valid)
            })
          })
        ])
        if (valids[0] && valids[1]) {
          const res = await SaveData(this.form)
          if (res.Result) {
            this.form = {}
            this.resetForm()
            this.getLoadData()
            this.$notify({
              title: this.$t('ssc._12'),
              message: this.$t('ssc._13'),
              type: 'success',
              duration: 2000
            })
          }
        }
      }
    },
    searchClick () {
      this.formData.Page = 1
      this.mainTable = []
      this.mainTable2 = []
      this.currentRowIndex = -1
      this.currentRowIndex2 = -1
      this.currentIndex = 0
      this.queryData = {
        PRODUCT_OBJECT_ID: '',
        Page: 1,
        Limit: 10,
        Key: ''
      }
      this.getIndex()
    },
    async getIndex () {
      const res = await Index()
      if (res.Result) {
        this.Operation = res.Result.Operation || []
        this.Attachment = res.Result.Attachment || []
        this.getLoadData()
      }
    },
    async getLoadData () {
      this.loading = true
      const res = await LoadData(this.formData)
      this.loading = false
      this.mainTable = res.Result || []
      this.totalPage = res.TotalCount || 0
      if (res.Result && res.Result.length) {
        this.currentIndex = 0
        this.queryData.PRODUCT_OBJECT_ID = this.mainTable[this.currentIndex].ID
        this.getAattachments()
      }
    },
    async handleCheckPartID (row, rowIndex) {
      const res = await checkPn(row.PART_NO)
      if (res.Result && res.Result.length > 0) {
      } else {
        row.PART_NO = ''
        this.$message.error(this.$t('SfcsProductPallet._30'))
      }
    },
    _handleSizeChange (Limit) {
      this.handleSizeChange(Limit)
    },
    _handleCurrentChange (Page) {
      this.currentIndex = 0
      this.handleCurrentChange(Page)
    },
    getCollectName (id) {
      let res = ''
      this.Operation.map((item) => {
        if (item.ID === id) {
          res = item.OPERATION_NAME
        }
      })
      return res
    },
    getObjectName (id) {
      let res = ''
      this.Attachment.map((item) => {
        if (item.ID === id) {
          res = item.OBJECT_NAME
        }
      })
      return res
    },
    cellClick (e) {
      const { $rowIndex } = e
      if (this.currentRowIndex !== $rowIndex) {
        this.currentRowIndex = $rowIndex
      }
      this.currentIndex = $rowIndex
    },
    cellClick2 (e) {
      const { $rowIndex } = e
      if (this.currentRowIndex2 !== $rowIndex) {
        this.currentRowIndex2 = $rowIndex
      }
    },
    handleClosedEdit () {
      this.$nextTick(() => {
        this.currentRowIndex = -1
      })
    },
    handleClosedEdit2 () {
      this.$nextTick(() => {
        this.currentRowIndex2 = -1
      })
    },
    async getAattachments () {
      this.loading2 = true
      const res = await GetAattachments(this.queryData)
      this.loading2 = false
      this.mainTable2 = res.Result || []
      this.totalPage2 = res.TotalCount || 0
    },
    handleSizeChange2 (Limit) {
      this.queryData.Limit = Limit
      this.queryData.Page = 1
      this.getAattachments()
    },
    handleCurrentChange2 (Page) {
      this.queryData.Page = Page
      this.getAattachments()
    },
    // 新增
    async addData (row) {
      const record = {
        ID: 0,
        PART_NO: null,
        FORMAT: null,
        STANDARD_QUANTITY: 1,
        MAX_QUANTITY: null,
        MIN_QUANTITY: null,
        STANDARD_WEIGHT: null,
        MAX_WEIGHT: null,
        MIN_WEIGHT: null,
        STANDARD_CUBAGE: null,
        MAX_CUBAGE: null,
        MIN_CUBAGE: null,
        LENGTH: null,
        WIDTH: null,
        HEIGHT: null,
        COLLECT_OPERATION_ID: '',
        ENABLED: 'Y'
      }
      const e = await this.$refs.xTable.insertAt(record, row)
      this.currentRowIndex = 0
      this.currentIndex = 0
      this.$refs.xTable.setActiveCell(e.row, 'PART_NO')
    },
    // 新增附件
    async addSubData (row) {
      if (
        !this.mainTable[this.currentIndex] ||
        !this.mainTable[this.currentIndex].ID
      ) {
        this.$message.warning(this.$t('SfcsProductPallet._31'))
        return false
      }
      const record = {
        ID: 0,
        PRODUCT_OBJECT_ID: this.mainTable[this.currentIndex].ID,
        ATTACHMENT_ID: '',
        DATA_FORMAT: null,
        FIX_VALUE: null,
        ATTACHMENT_QTY: 1,
        ENABLED: 'Y'
      }
      const e = await this.$refs._xTable.insertAt(record, row)
      this.currentRowIndex2 = 0
      this.$refs.xTable.setActiveCell(e.row, 'ATTACHMENT_ID')
    },
    async removeClick (row) {
      if (
        row &&
        (await this.$confirm(
          this.$t('publics.tips.makeSureDelete'),
          this.$t('publics.tips.tips'),
          {
            confirmButtonText: this.$t('publics.tips.confirm'),
            cancelButtonText: this.$t('publics.tips.cancel'),
            type: 'warning'
          }
        ).catch())
      ) {
        this.$refs.xTable.remove(row)
        const postdata = this.$refs.xTable.getRecordset()
        if (postdata.removeRecords.length) {
          this.$refs.xTable.validate(async (valid) => {
            if (valid) {
              this.form = {
                RemoveRecords: postdata.removeRecords
              }
              const res = await SaveData(this.form)
              if (res.Result) {
                this.form = {}
                this.resetForm()
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
      }
    },
    async removeClick2 (row) {
      if (
        row &&
        (await this.$confirm(
          this.$t('publics.tips.makeSureDelete'),
          this.$t('publics.tips.tips'),
          {
            confirmButtonText: this.$t('publics.tips.confirm'),
            cancelButtonText: this.$t('publics.tips.cancel'),
            type: 'warning'
          }
        ).catch())
      ) {
        this.$refs._xTable.remove(row)
        const postdata = this.$refs._xTable.getRecordset()
        if (postdata.removeRecords.length) {
          this.$refs._xTable.validate(async (valid) => {
            if (valid) {
              this.form = {
                RemoveAttachments: postdata.removeRecords
              }
              const res = await SaveData(this.form)
              if (res.Result) {
                this.form = {}
                this.getAattachments()
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
      }
    },
    resetForm (currentIndex = 0) {
      Object.assign(this.$data, {
        formData: {
          PART_NO: '',
          Page: 1,
          Limit: 10,
          Key: ''
        },
        loading: false,
        mainTable: [],
        validRules: {
          PART_NO: [
            { required: true, message: this.$t('SfcsProductPallet._25') }
          ],
          FORMAT: [
            { required: true, message: this.$t('SfcsProductPallet._26') }
          ],
          COLLECT_OPERATION_ID: [
            { required: true, message: this.$t('SfcsProductPallet._27') }
          ],
          STANDARD_QUANTITY: [
            { required: true, message: this.$t('SfcsProductPallet._38') }
          ]
        },
        currentRowIndex: -1,
        currentIndex: currentIndex,
        loading2: false,
        mainTable2: [],
        totalPage2: 0,
        queryData: {
          PRODUCT_OBJECT_ID: '',
          Page: 1,
          Limit: 10,
          Key: ''
        },
        currentRowIndex2: -1,
        form: {},
        attrDisabled: false
      })
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
      if (row.MAX_QUANTITY < 0) {
        e.row.MAX_QUANTITY = ''
      }
    },
    blurCheckMinW (e) {
      const { row } = e
      if (row.MIN_WEIGHT > row.MAX_WEIGHT) {
        this.$message.error(this.$t('SfcsProductPallet._33'))
        e.row.MIN_WEIGHT = ''
      }
      if (row.MAX_WEIGHT < 0) e.row.MAX_WEIGHT = ''
    },
    blurCheckMaxW (e) {
      const { row } = e
      if (row.MAX_WEIGHT < 0) {
        e.row.MAX_WEIGHT = ''
        return false
      }
      if (row.MIN_WEIGHT > row.MAX_WEIGHT) {
        e.row.MAX_WEIGHT = ''
        this.$message.error(this.$t('SfcsProductPallet._36'))
      }
    },
    blurCheckMinC (e) {
      const { row } = e
      if (row.MIN_CUBAGE > row.MAX_CUBAGE) {
        this.$message.error(this.$t('SfcsProductPallet._34'))
        e.row.MIN_CUBAGE = ''
      }
      if (row.MIN_CUBAGE < 0) e.row.MIN_CUBAGE = ''
    },
    blurCheckMaxC (e) {
      const { row } = e
      if (row.MIN_CUBAGE > row.MAX_CUBAGE) {
        this.$message.error(this.$t('SfcsProductPallet._37'))
        e.row.MAX_CUBAGE = ''
      }
      if (row.MAX_CUBAGE < 0) e.row.MAX_CUBAGE = ''
    }
  },
  created () {
    this.getIndex()
  },
  watch: {
    currentIndex (val, oldVal) {
      if (val !== oldVal) {
        if (!this.mainTable[val]) {
          this.currentRowIndex2 = -1
          this.mainTable2 = []
          this.totalPage2 = 0
          this.attrDisabled = true
        } else {
          this.queryData.PRODUCT_OBJECT_ID = this.mainTable[val].ID
          this.getAattachments()
          this.attrDisabled = false
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.table-container1 {
  height: 250px;
}
.foot-page {
  padding: 5px 0;
}
.table-container2 {
  height: calc(
    100vh - 60px - 41px - 54px - 20px - 43px - 41px - 42px - 250px + 5px
  );
}
</style>
