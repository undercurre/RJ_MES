<template>
  <d2-container class="SmtFeederConfig">
    <template slot="header">
      <custom-container-header exportMehodsName="exportData"
                               tableName="SMT_FEEDER"
                               importBtnName="SmtFeederConfigImport"
                               exportBtnName="SmtFeederConfigExport"
                               exportTplName="SmtFeederConfigExportTPL">
        <el-input v-model="formData.FEEDER"
                  :placeholder="$t('SmtFeederConfig2._1')"
                  clearable
                  style="width:200px"
                  @keyup.enter.native="searchClick" />&nbsp;
        <el-input v-model="formData.FBODYMARK"
                  :placeholder="$t('SmtFeederConfig2._12')"
                  clearable
                  style="width:200px"
                  @keyup.enter.native="searchClick" />&nbsp;
        <el-button type="primary"
                   icon="el-icon-search"
                   @click.prevent="searchClick">{{ $t('publics.btn.search') }}
        </el-button>
        <el-button type="success"
                   icon="el-icon-plus"
                   v-if="$btnList.indexOf('SmtFeederAdd') !== -1"
                   @click="insertEvent(null)">{{ $t('publics.btn.add') }}</el-button>
        <el-button type="primary"
        v-if="$btnList.indexOf('FeedeSaveFeederRegionData') !== -1"
                   @click.prevent="Useinterval">{{ $t('SmtFeederConfig2._14') }}
        </el-button>
      </custom-container-header>
    </template>
    <div>
      <vxe-table ref="xTable"
                 class="storageTable"
                 border
                 resizable
                 height="100%"
                 size="medium"
                 align="center"
                 highlight-hover-row
                 show-overflow
                 auto-resize
                 keep-source
                 stripe
                 :loading="loading"
                 :data="mainTable"
                 :mouse-config="{selected: true}"
                 :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
                 :radio-config="{labelField: 'name', trigger: 'row'}"
                 :checkbox-config="{checkField: 'checked', trigger: 'row'}">
        <vxe-table-column min-width="150"
                          field="FEEDER"
                          :title="$t('SmtFeederConfig2._2')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column min-width="150"
                          field="SUPPLIER"
                          :title="$t('SmtFeederConfig2._3')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column min-width="150"
                          field="FTYPE"
                          :title="$t('SmtFeederConfig2._4')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column min-width="150"
                          field="FSIZE"
                          :title="$t('SmtFeederConfig2._5')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column min-width="150"
                          field="FBODYMARK"
                          :title="$t('SmtFeederConfig2._6')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column min-width="150"
                          field="STATUS"
                          :title="$t('SmtFeederConfig2._7')"
                          :edit-render="{name: '$select', options: statusList,props: {disabled:true}}" />
        <vxe-table-column min-width="150"
                          field="DESCRIPTION"
                          :title="$t('SmtFeederConfig2._8')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column min-width="150"
                          field="ORGANIZE_NAME"
                          :title="$t('plbd._2')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column :title="$t('publics.field.operate')"
                          min-width="180"
                          align="center"
                          fixed="right">
          <template v-slot="{ row }">
            <el-button type="primary"
                       @click="editClick(row, row.$index)"
                       v-if="$btnList.indexOf('SmtFeederEdit') !== -1">{{ $t('publics.btn.edit') }}</el-button>
            <el-button type="danger"
                       @click="removeClick(row, row.$index)"
                       v-if="$btnList.indexOf('SmtFeederRemove') !== -1">{{ $t('publics.btn.delete') }}</el-button>
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
    <!-- modal -->
    <el-dialog v-dialogDrag
               :title="dialogText"
               :visible.sync="dialogVisible"
               width="60%"
               :close-on-click-modal="false">
      <div>
        <el-form ref="modifyForm"
                 :model="modifyForm"
                 :rules="validRules"
                 :show-message="false"
                 class="custom-form custom-form-x"
                 label-position="top">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('SmtFeederConfig2._2')"
                            prop="ENABLED">
                <el-input v-model="modifyForm.FEEDER"
                          clearable
                          :disabled="isNew" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SmtFeederConfig2._3')"
                            prop="SUPPLIER">
                <el-input v-model="modifyForm.SUPPLIER"
                          clearable
                          type="text" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('SmtFeederConfig2._4')"
                            prop="FTYPE">
                <el-input v-model="modifyForm.FTYPE"
                          clearable />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SmtFeederConfig2._5')"
                            prop="FSIZE">
                <el-input v-model="modifyForm.FSIZE"
                          clearable />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('SmtFeederConfig2._6')"
                            prop="FBODYMARK">
                <el-input v-model="modifyForm.FBODYMARK"
                          clearable />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SmtFeederConfig2._7')"
                            prop="STATUS">
                <el-select v-model="modifyForm.STATUSDATA"
                           style="width:100%"
                           @change="changeStatus">
                  <el-option v-for="item in statusList"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('SmtFeederConfig2._8')"
                            prop="DESCRIPTION">
                <el-input v-model="modifyForm.DESCRIPTION"
                          clearable />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('plbd._2')"
                            prop="ORGANIZE_ID">
                <el-cascader v-model="modifyForm.ORGANIZE_ID"
                             :options="organizeList"
                             style="width: 100%"
                             :show-all-levels="false"
                             placeholder=" "
                             :props="casProps"
                             @change="handleChangeCascader" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">{{$t('ssc_rd.cancel')}}</el-button>
        <el-button type="primary"
                   @click="submitModifyForm">{{$t('ssc_rd.sure')}}</el-button>
      </span>
    </el-dialog>
    <el-dialog v-dialogDrag
               top="0"
               :title="$t('SmtFeederConfig2._14')"
               :close-on-click-modal="false"
               :visible.sync="UseintervalVisible"
               height="100%"
               width="100%">
      <div style="margin-bottom: 15px;">
        <el-select v-model="formData2.FEEDER_TYPE"
                   clearable
                   filterable
                   @clear="clear2"
                   :placeholder="$t('SmtFeederConfig2._15')">
          <el-option v-for="(item,index) in FeederTypeListbox"
                     :key="index"
                     :label="item.NAME"
                     :value="Number(item.CODE)" />
        </el-select>&nbsp;
        <el-select v-model="formData2.BETWEEN_STATUS"
                   clearable
                   filterable
                   @clear="clear2"
                   :placeholder="$t('SmtFeederConfig2._16')">
          <el-option v-for="(item,index) in statusListbox"
                     :key="index"
                     :label="item.NAME"
                     :value="Number(item.ID)" />
        </el-select>&nbsp;
        <el-select v-model="formData2.OUTSIDE_STATUS"
                   clearable
                   filterable
                   @clear="clear2"
                   :placeholder="$t('SmtFeederConfig2._17')">
          <el-option v-for="(item,index) in statusListbox"
                     :key="index"
                     :label="item.NAME"
                     :value="Number(item.ID)" />
        </el-select>&nbsp;
        <el-button type="primary"
                   icon="el-icon-search"
                   @click.prevent="searchClick2">{{ $t('publics.btn.search') }}</el-button>
        <el-button type="success"
                   @click="insertEvent2(null)"
                   v-if="$btnList.indexOf('SmtStencilRegionAdd') !== -1"
                   icon="el-icon-plus">{{ $t('publics.btn.add') }}</el-button>
        <el-button type="primary"
                   icon="el-icon-check"
                   @click.prevent="preserveClick2()"
                   v-if="$btnList.indexOf('SmtStencilRegionEdit') !== -1">{{ $t('publics.btn.save') }}</el-button>
      </div>
      <div style="height: calc(100vh - 60px - 21px - 74px - 43px)">
        <vxe-table ref="xTable2"
                   border
                   resizable
                   height="100%"
                   size="medium"
                   align="center"
                   highlight-hover-row
                   highlight-current-row
                   auto-resize
                   show-overflow
                   keep-source
                   :data="mainTable2"
                   :edit-rules="validRules2"
                   :mouse-config="{selected: true}"
                   :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
                   :radio-config="{labelField: 'name', trigger: 'row'}"
                   :checkbox-config="{checkField: 'checked', trigger: 'row'}">
          <vxe-table-column min-width="150"
                            field="FEEDER_TYPE"
                            :title="$t('SmtFeederConfig2._18')"
                            :edit-render="{name: 'select', options: FeederTypeList}" />
          <vxe-table-column min-width="180"
                            field="BETWEEN_STATUS"
                            :title="$t('SmtStencilRegion._4')"
                            :edit-render="{name: 'select', options: statusList}" />
          <vxe-table-column min-width="180"
                            field="OUTSIDE_STATUS"
                            :title="$t('SmtStencilRegion._5')"
                            :edit-render="{name: 'select', options: statusList}" />
          <vxe-table-column min-width="150"
                            field="BEGIN_COUNT"
                            :title="$t('SmtStencilRegion._2')"
                            :edit-render="{name:'$input',props:{type:'number',min: '0'}}"></vxe-table-column>
          <vxe-table-column min-width="150"
                            field="END_COUNT"
                            :title="$t('SmtStencilRegion._3')"
                            :edit-render="{name:'$input',props:{type:'number',min: '0'}, events: { blur: handleCheckEndCount }}"></vxe-table-column>

          <vxe-table-column min-width="120"
                            field="ORDER_NO"
                            :title="$t('SmtStencilRegion._6')"
                            :edit-render="{name: 'input'}" />
          <vxe-table-column min-width="150"
                            field="DESCRIPTION"
                            :title="$t('SmtStencilRegion._7')"
                            :edit-render="{name: 'input'}" />
          <vxe-table-column :title="$t('publics.field.operate')"
                            min-width="120"
                            align="center"
                            fixed="right">
            <template v-slot="{ row }">
              <el-button type="danger"
                         @click="removeClick2(row, row.$index)">{{ $t('publics.btn.delete') }}</el-button>
            </template>
          </vxe-table-column>
        </vxe-table>
      </div>
      <template slot="footer">
        <el-pagination style="text-align: left;"
                       :current-page="formData2.Page"
                       :page-size="formData2.Limit"
                       :page-sizes="[15, 25, 35, 45]"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="totalPage2"
                       @size-change="handleSizeChange2"
                       @current-change="handleCurrentChange2" />
      </template>
    </el-dialog>
  </d2-container>
</template>
<script>
import customContainerHeader from '@/components/custom-container-header'
import pagination from '@/views/mixin/page'
import CURD from '@/views/mixin/CURD'
import {
  Index,
  SmtFeederLoadData,
  SaveData,
  ExportData,
  LoadeFeederRegionData,
  SaveFeederRegionData
} from '@/api/SmtFeeder'
import {
  mapGetters
} from 'vuex'
import {
  // 直接抄
  LoadUserOrganize,
  LoadData
} from '@/api/SysOrganize'
import {
  cloneDeep
} from 'lodash'
export default {
  name: 'SmtFeederConfig',
  components: {
    customContainerHeader
  },
  mixins: [
    pagination,
    CURD({
      defaultSaveAPI: (e) => SaveData(e)
    })
  ],
  computed: {
    ...mapGetters(['userId'])
  },
  data () {
    return {
      formData: {
        FEEDER: '',
        FBODYMARK: '', // 本体编码:
        SUPPLIER: '', // 供应商:
        Page: 1,
        Limit: 15
      },
      validRules: {
        FEEDER: [{
          required: true,
          message: this.$t('SmtFeederConfig2._9')
        }],
        FTYPE: [{
          required: true,
          message: this.$t('SmtFeederConfig2._10')
        }],
        STATUS: [{
          required: true,
          message: this.$t('SmtFeederConfig2._11')
        }]
      },
      statusList: [],
      isNew: false,
      // -----------
      dialogVisible: false,
      modifyForm: {},
      dialogText: '',
      organizeList: [],
      casProps: {
        label: 'ORGANIZE_NAME',
        value: 'ID',
        children: 'children',
        checkStrictly: true
      },
      // 使用区间
      UseintervalVisible: false,
      formData2: {
        Page: 1,
        Limit: 15
      },
      mainTable2: [],
      totalPage2: 0,
      validRules2: {
        STENCIL_ID: [
          {
            required: true,
            message: this.$t('SmtStencilRegion._8')
          }
        ],
        BEGIN_COUNT: [
          {
            required: true,
            message: this.$t('SmtStencilRegion._9')
          }
        ],
        END_COUNT: [
          {
            required: true,
            message: this.$t('SmtStencilRegion._10')
          }
        ],
        BETWEEN_STATUS: [
          {
            required: true,
            message: this.$t('SmtStencilRegion._11')
          }
        ],
        OUTSIDE_STATUS: [
          {
            required: true,
            message: this.$t('SmtStencilRegion._12')
          }
        ]
      },
      FeederTypeList: [],
      FeederTypeListbox: [],
      statusListbox: []
    }
  },
  created () {
    this.getIndex()
  },
  methods: {
    clear2 () {
      if (!this.formData2.FEEDER_TYPE) {
        this.formData2.FEEDER_TYPE = undefined
      }
      if (!this.formData2.BETWEEN_STATUS) {
        this.formData2.BETWEEN_STATUS = undefined
      }
      if (!this.formData2.OUTSIDE_STATUS) {
        this.formData2.OUTSIDE_STATUS = undefined
      }
    },
    changeStatus (e) {
      this.modifyForm.STATUS = e
      this.statusList.map((item) => {
        if (e === item.value) {
          this.modifyForm.STATUSDATA = item.label
        }
      })
      console.log('this.modifyForm.STATUSDATA:', this.modifyForm.STATUSDATA)
      this.$forceUpdate()
    },
    resetForm () {
      this.mainTable = []
      this.formData.Page = 1
      this.dialogVisible = false
      this.getLoadData()
    },
    handleChangeCascader (e) {
      // 直接抄
      if (e && e.length) {
        this.modifyForm.ORGANIZE_ID = e[e.length - 1]
      }
    },
    // 获取组织架构
    async getOrganize () {
      // 直接抄
      const res = await LoadUserOrganize({
        MANAGER_ID: this.userId,
        STATUS: 'Y',
        Page: 1,
        Limit: 1000
      })
      let manager = res.Result || []
      const _res = await LoadData({
        Page: 1,
        Limit: 10000
      })
      let ORGANIZE = _res.Result || []
      this.organizeList = []
      manager.map((item) => {
        let tmp = []
        tmp = this.getTree(ORGANIZE, item.ORGANIZE_ID)
        this.organizeList.push(...[tmp[tmp.length - 1]].filter(_i => _i && _i))
      })
    },
    // 递归
    getTree (data, pid = 0, level = 1) {
      // 直接抄
      let arr = []
      data.map((item) => {
        if (item.PARENT_ORGANIZE_ID === pid) {
          item.level = level
          item.children = this.getTree(data, item.ID, level + 1)
          item.disabled = item.ENABLED === 'N'
          arr.push(item)
        } else if (item.ID === pid && level === 1) {
          item.level = level
          item.children = this.getTree(data, item.ID, level + 1)
          item.disabled = item.ENABLED === 'N'
          arr.push(item)
        }
      })
      return arr
    },
    // 修改
    editClick (row) {
      // 直接抄 【】
      this.isNew = true
      this.modifyForm = cloneDeep(row)
      this.statusList.map((item) => {
        if (item.value === Number(this.modifyForm.STATUS)) {
          this.modifyForm.STATUSDATA = item.label
        }
      })
      this.dialogVisible = true
      this.dialogText = this.$t('publics.btn.edit')
    },
    // 新增
    insertEvent () {
      // 直接抄 【】
      this.isNew = false
      this.dialogVisible = true
      this.modifyForm = {}
      this.dialogText = this.$t('publics.btn.add')
    },
    // 提交
    submitModifyForm () {
      if (!this.modifyForm.ORGANIZE_ID) {
        this.$message.error(this.$t('plbd._1'))
        return
      }
      // 直接抄
      this.$refs.modifyForm.validate(async (valid, errInfo) => {
        if (valid) {
          let form = {}
          if (this.modifyForm.ID) {
            form = {
              updateRecords: [this.modifyForm]
            }
          } else {
            this.modifyForm.ID = 0
            form = {
              insertRecords: [this.modifyForm]
            }
          }
          const res = await SaveData(form)
          if (res.Result) {
            this.$notify({
              title: this.$t('ssc._12'),
              message: this.$t('ssc._13'),
              type: 'success',
              duration: 2000
            })
            this.resetForm()
          }
        } else {
          try {
            Object.keys(errInfo).forEach((item) => {
              this.$message.error(errInfo[item][0].message)
              throw Error(errInfo[item][0].message)
            })
          } catch (e) {
            console.log(e.message)
          }
        }
      })
    },
    async getIndex () {
      const res = await Index()
      if (res.Result) {
        this.getOrganize()
        const {
          StatusList = [],
          FeederTypeList = []
        } = res.Result
        this.FeederTypeListbox = res.Result.FeederTypeList
        this.statusListbox = res.Result.StatusList
        this.statusList.push({
          label: '',
          value: '',
          disabled: false
        })
        StatusList.map((item) => {
          this.statusList.push({
            label: item.NAME,
            value: Number(item.ID),
            disabled: false
          })
        })
        this.FeederTypeList.push({
          label: '',
          value: '',
          disabled: false
        })
        FeederTypeList.map(item => {
          this.FeederTypeList.push({
            label: item.NAME,
            value: item.CODE ? item.CODE.toString() : '',
            disabled: false
          })
        })
      }
      this.getLoadData()
    },
    // 查询数据
    async getLoadData () {
      this.formData.USER_ID = this.userId
      const res = await SmtFeederLoadData(this.formData)
      if (res.Result) {
        this.totalPage = res.TotalCount || 0
        const MainTable = JSON.parse(res.Result)
        this.mainTable = []
        MainTable.map((item) => {
          item.STATUS = item.STATUS ? item.STATUS.toString() : ''
          this.mainTable.push(item)
        })
      } else {
        this.totalPage = 0
        this.mainTable = []
      }
    },
    async exportData () {
      this.loading = true
      const res = await ExportData(this.formData)
      this.loading = false
      this.mainTable = res.Result || []
      this.totalPage = res.TotalCount || 0
    },
    // 搜索
    searchClick () {
      this.formData.Page = 1
      this.getLoadData()
    },
    // 添加
    // insertEvent (row) {
    //   const record = {
    //     ID: 0,
    //     FEEDER: null,
    //     SUPPLIER: null,
    //     FTYPE: null,
    //     FSIZE: null,
    //     FBODYMARK: null,
    //     STATUS: null,
    //     DESCRIPTION: null
    //   }
    //   this.$refs.xTable.insertAt(record, row).then(({ row }) => {
    //     this.$refs.xTable.setActiveRow(row)
    //   })
    // }
    // 使用区间
    Useinterval () {
      this.LoadeFeederRegionData()
      this.UseintervalVisible = true
    },
    async LoadeFeederRegionData () {
      const res = await LoadeFeederRegionData(this.formData2)
      this.mainTable2 = JSON.parse(res.Result) || []
      this.totalPage2 = res.TotalCount || 0
    },
    insertEvent2 (row) {
      const record = {
        ID: 0,
        FEEDER_TYPE: null,
        BEGIN_COUNT: null,
        END_COUNT: null,
        BETWEEN_STATUS: null,
        OUTSIDE_STATUS: null,
        ORDER_NO: null,
        DESCRIPTION: null
      }
      this.$refs.xTable2.insertAt(record, row).then(({ row }) => {
        this.$refs.xTable2.setActiveRow(row)
      })
    },
    async preserveClick2 () {
      let postdata = this.$refs.xTable2.getRecordset()
      if (
        postdata.insertRecords.length ||
        postdata.removeRecords.length ||
        postdata.updateRecords.length
      ) {
        this.$refs.xTable2.validate(valid => {
          if (valid) {
            SaveFeederRegionData(postdata).then(response => {
              if (response.Result) {
                this.LoadeFeederRegionData()
                this.$notify({
                  title: this.$t('ssc._12'),
                  message: this.$t('ssc._13'),
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
          message: this.$t('ssc._14'),
          type: 'warning'
        })
      }
    },
    // 删除
    removeClick2 (row) {
      let postdata = this.$refs.xTable2.getRecordset()
      if (row) {
        this.$confirm(this.$t('sld.fidelete'), this.$t('sld.prompt'), {
          confirmButtonText: this.$t('sld.confirm'),
          cancelButtonText: this.$t('sld.cancel'),
          type: 'warning'
        }).then(() => {
          this.$refs.xTable2.remove(row)
          var formdata = {}
          formdata.removeRecords = postdata.removeRecords
          SaveFeederRegionData(formdata).then((response) => {
            if (response.Result) {
              this.formData2.Page = 1
              this.LoadeFeederRegionData()
              this.$notify({
                title: this.$t('sld.success'),
                message: this.$t('sld.subsu'),
                type: 'success',
                duration: 2000
              })
            }
          })
        })
      }
    },
    searchClick2 () {
      this.formData2.Page = 1
      this.LoadeFeederRegionData()
    },
    handleSizeChange2 (val) {
      this.formData2.Limit = val
      this.LoadeFeederRegionData()
    },
    handleCurrentChange2 (val) {
      this.formData2.Page = val
      this.LoadeFeederRegionData()
    },
    handleCheckEndCount (e) {
      if (e.row.END_COUNT < e.row.BEGIN_COUNT) {
        this.$message.error(this.$t('SmtStencilRegion._13'))
        e.row.END_COUNT = ''
        return false
      }
    }
  }
}

</script>
<style lang="scss" scoped>
.storageTable {
  height: calc(100vh - 60px - 21px - 74px - 20px - 41px - 22px);
}
</style>
<style>
.custom-form-x .el-col-12 {
  padding: 0 5px;
}
.SmtFeederConfig .el-dialog__body {
  padding: 15px;
}
</style>
