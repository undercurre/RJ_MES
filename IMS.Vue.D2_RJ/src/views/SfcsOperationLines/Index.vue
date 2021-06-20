<template>
  <d2-container>
    <template slot="header">
      <custom-container-header exportMehodsName="exportData"
                               tableName="SFCS_OPERATION_LINES"
                               importBtnName="SfcsOperationLinesImport"
                               exportBtnName="SfcsOperationLinesExport"
                               exportTplName="SfcsOperationLinesExportTPL">
        <el-input v-model="formData.OPERATION_LINE_NAME"
                  :placeholder="$t('SfcsOperationLines._1')"
                  clearable
                  style="width:200px"
                  @keyup.enter.native="search_but" />&nbsp;
        <el-button type="primary"
                   icon="el-icon-search"
                   @click.prevent="search_but">{{ $t('publics.btn.search') }}</el-button>
        <el-button type="success"
                   icon="el-icon-plus"
                   @click.prevent="add_but"
                   v-if="$btnList.indexOf('SfcsOperationLinesAdd') !== -1">{{ $t('publics.btn.add') }}</el-button>
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
                 :mouse-config="{selected: true}"
                 :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
                 :radio-config="{labelField: 'name', trigger: 'row'}"
                 :checkbox-config="{checkField: 'checked', trigger: 'row'}">
        <vxe-table-column field="LINE_NAME_INCN"
                          :title="$t('SfcsOperationLines._2')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column field="LINE"
                          :title="$t('SfcsOperationLines._3')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column field="OPERATION_LINE_NAME"
                          :title="$t('SfcsOperationLines._4')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column field="PLANT_CODE"
                          :title="$t('SfcsOperationLines._5')"
                          :edit-render="{name: '$select', options: LineTypeList, props: {disabled: true}}" />
        <vxe-table-column field="ENABLED"
                          :title="$t('SfcsOperationLines._6')">
          <template slot-scope="scope">
            <div>
              <el-switch :disabled="$btnList.indexOf('SfcsOperationLinesChangeEnabled') === -1"
                         v-model="scope.row.ENABLED"
                         :active-text="$t('publics.btn.yes')"
                         :inactive-text="$t('publics.btn.no')"
                         active-color="#13ce66"
                         inactive-color="#cccccc"
                         active-value="Y"
                         inactive-value="N"
                         @change="change(scope.$index, scope.row)" />
            </div>
          </template>
        </vxe-table-column>
        <vxe-table-column width="150"
                          field="ORGANIZE_NAME"
                          :title="$t('plbd._2')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column :title="$t('publics.field.operate')"
                          align="center"
                          fixed="right"
                          width="140">
          <template slot-scope="scope">
            <el-button type="primary"
                       @click.prevent="edit_but(scope.row)"
                       v-if="$btnList.indexOf('SfcsOperationLinesEdit') !== -1">{{ $t('publics.btn.edit') }}</el-button>
            <!-- <el-button type="danger" @click="removeClick({ID: row.ID})">{{ $t('plbd.tb_rm') }}</el-button> -->
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
    <el-dialog :close-on-click-modal="false"
               v-dialogDrag
               width="40%"
               :title="titleText"
               :visible.sync="innerVisible"
               append-to-body
               class="call-dialog">
      <el-form ref="callVal"
               :show-message="false"
               :model="form"
               :rules="rules"
               label-width="140px">

        <el-form-item :label="$t('SfcsOperationLines._7')"
                      prop="PHYSICAL_LOCATION">
          <el-select v-model="form.PHYSICAL_LOCATION"
                     @change="PhysicalChange"
                     style="width:100%"
                     :placeholder="$t('SfcsOperationLines._8')">
            <el-option v-for="item in PhyLocList"
                       :key="item.LOOKUP_CODE"
                       :label="item.CHINESE"
                       :value="item.LOOKUP_CODE" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('SfcsOperationLines._9')"
                      prop="LINE">
          <el-input v-model="form.LINE"
                    @change="LineBlur"
                    :placeholder="$t('SfcsOperationLines._10')" />
        </el-form-item>
        <el-form-item :label="$t('SfcsOperationLines._11')"
                      type="text"
                      prop="OPERATION_LINE_NAME">
          <el-input v-model="form.OPERATION_LINE_NAME"
                    :placeholder="$t('SfcsOperationLines._12')" />
        </el-form-item>
        <el-form-item :label="$t('SfcsOperationLines._13')"
                      prop="PLANT_CODE">
          <el-select v-model="form.PLANT_CODE"
                     style="width:100%"
                     :placeholder="$t('SfcsOperationLines._14')">
            <el-option v-for="item in LineTypeList"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('plbd._2')"
                      prop="ORGANIZE_ID">
          <el-cascader v-model="form.ORGANIZE_ID"
                       :options="organizeList"
                       style="width: 100%"
                       :show-all-levels="false"
                       placeholder=" "
                       :props="casProps"
                       @change="handleChangeCascader"></el-cascader>
        </el-form-item>
        <el-form-item :label="$t('SfcsOperationLines._15')">
          <el-switch v-model="form.ENABLED"
                     :active-text="$t('publics.btn.yes')"
                     :inactive-text="$t('publics.btn.no')"
                     active-color="#13ce66"
                     inactive-color="#cccccc"
                     active-value="Y"
                     inactive-value="N" />
        </el-form-item>
        <div class="call-dialog-button">
          <el-button type="success"
                     icon="el-icon-check"
                     @click="shout_but">&nbsp;{{ $t('publics.btn.makeSure') }}&nbsp;</el-button>
          <el-button type="danger"
                     icon="el-icon-close"
                     @click="close_btn">&nbsp;{{ $t('publics.btn.cancel') }}&nbsp;</el-button>
        </div>
      </el-form>
    </el-dialog>
  </d2-container>
</template>

<script>
import pagination from '@/views/mixin/page'
import customContainerHeader from '@/components/custom-container-header'
import {
  Index,
  LoadData,
  AddOrModify,
  AddOrModifySave,
  ChangeEnabled,
  ExportData,
  LoadMESLineType
} from '@/api/SfcsOperationLines'
import {
  // 直接抄
  LoadUserOrganize,
  LoadData as _LoadData
} from '@/api/SysOrganize'
import { cloneDeep } from 'lodash' // 直接抄
import { mapGetters } from 'vuex'
export default {
  name: 'SfcsOperationLines',
  mixins: [pagination],
  components: {
    customContainerHeader
  },
  computed: {
    ...mapGetters(['userinfo', 'userId'])
  },
  data () {
    return {
      formData: {
        OPERATION_LINE_NAME: '',
        ...this.formData
      },
      loading: false,
      mainTable: [],
      PhyLocList: [],
      PlantCodeList: [],
      excite: {
        Id: null,
        Status: null,
        Operator: ''
      },
      titleText: '',
      form: {
        ID: 0,
        PHYSICAL_LOCATION: '',
        LINE: '',
        OPERATION_LINE_NAME: '',
        PLANT_CODE: '',
        ENABLED: 'N'
      },
      rules: {
        PHYSICAL_LOCATION: [
          {
            required: true,
            message: this.$t('SfcsOperationLines._16')
          }
        ],
        LINE: [
          {
            required: true,
            message: this.$t('SfcsOperationLines._17')
          }
        ],
        OPERATION_LINE_NAME: [
          {
            required: true,
            message: this.$t('SfcsOperationLines._18')
          }
        ],
        PLANT_CODE: [
          {
            required: true,
            message: this.$t('SfcsOperationLines._19')
          }
        ],
        ORGANIZE_ID: [
          {
            required: true,
            message: this.$t('plbd._1')
          }
        ]
      },
      innerVisible: false,
      modifyForm: {},
      dialogText: '',
      organizeList: [],
      casProps: {
        label: 'ORGANIZE_NAME',
        value: 'ID',
        children: 'children',
        checkStrictly: true
      },
      planData: [],
      LineTypeList: [],
      PhysicalName: '',
      LINEName: ''
    }
  },
  methods: {
    PhysicalChange (row) {
      console.log(row, 'PhysicalChange')
      this.PhysicalName = ''
      this.PhyLocList.map(v => {
        if (row === v.LOOKUP_CODE) {
          this.PhysicalName = v.CHINESE
        }
      })
      if (!this.form.OPERATION_LINE_NAME || this.form.ID === 0) {
        if (this.LINEName) {
          this.form.OPERATION_LINE_NAME = this.PhysicalName + '的' + this.LINEName
        }
      }
    },
    LineBlur (row) {
      console.log(this.form.LINE, 'this.form.LINE')
      this.LINEName = ''
      this.LINEName = this.form.LINE
      if ((!this.form.OPERATION_LINE_NAME || this.form.ID === 0) && this.LINEName) {
        if (this.PhysicalName) {
          this.form.OPERATION_LINE_NAME = this.PhysicalName + '的' + this.LINEName
        }
      }
    },
    async getLineTypeList () {
      const res = await LoadMESLineType()
      const data = res.Result || []
      this.LineTypeList = []
      data.map(item => {
        this.LineTypeList.push({
          label: item.CHINESE,
          value: item.LOOKUP_CODE
        })
      })
      console.log(this.LineTypeList, 'this.LineTypeList')
    },
    handleChangeCascader (e) {
      // 直接抄
      if (e && e.length) {
        this.form.ORGANIZE_ID = e[e.length - 1]
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
      const _res = await _LoadData({
        Page: 1,
        Limit: 10000
      })
      let ORGANIZE = _res.Result || []
      this.planData = ORGANIZE
      this.organizeList = []
      manager.map(item => {
        let tmp = []
        tmp = this.getTree(ORGANIZE, item.ORGANIZE_ID)
        this.organizeList.push(...[tmp[tmp.length - 1]].filter(_i => _i && _i))
      })
    },
    // 递归
    getTree (data, pid = 0, level = 1) {
      // 直接抄
      let arr = []
      data.map(item => {
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
    async getIndex () {
      const res = await Index()
      if (res.Result) {
        this.getLoadData()
        this.getAddOrModify()
        this.getOrganize()
        this.getLineTypeList()
      }
    },
    // 获取表格
    async getLoadData () {
      this.loading = true
      this.formData.USER_ID = this.userinfo.ID
      const res = await LoadData(this.formData)
      this.loading = false
      this.mainTable = res.Result ? JSON.parse(res.Result) : []
      this.totalPage = res.TotalCount || 0
    },
    async exportData () {
      this.loading = true
      const res = await ExportData(this.formData)
      this.loading = false
      this.mainTable = res.Result || []
      this.totalPage = res.TotalCount || 0
    },
    // 获取添加编辑下拉
    async getAddOrModify () {
      const res = await AddOrModify()
      if (res.Result) {
        this.PhyLocList = res.Result.PhyLocList || []
        this.PlantCodeList = res.Result.PlantCodeList || []
      } else {
        this.PhyLocList = []
        this.PlantCodeList = []
      }
    },
    search_but () {
      this.formData.Page = 1
      this.getLoadData()
    },
    change (index, row) {
      this.excite.Id = row.ID
      if (row.ENABLED === 'Y') {
        this.excite.Status = true
      } else {
        this.excite.Status = false
      }
      this.$confirm(
        this.$t('SfcsOperationLines._20'),
        this.$t('Manager.prompt'),
        {
          confirmButtonText: this.$t('Manager.confirm'),
          cancelButtonText: this.$t('Manager.cancel'),
          type: 'warning'
        }
      )
        .then(async () => {
          const response = await ChangeEnabled(this.excite)
          if (response.Result) {
            this.getLoadData()
            this.$message({
              type: 'success',
              message: this.$t('Manager.Succfied')
            })
          }
        })
        .catch(() => {
          this.getLoadData()
        })
    },
    // 新增按钮
    add_but () {
      // this.form.ID = 0
      // this.form.PHYSICAL_LOCATION = ''
      // this.form.LINE = ''
      // this.form.OPERATION_LINE_NAME = ''
      // this.form.PLANT_CODE = ''
      // this.form.ENABLED = 'N'
      // this.form.ORGANIZE_ID = null
      // 上面写法有问题
      this.PhysicalName = ''
      this.LINEName = ''
      this.form = {
        ID: 0,
        OPERATION_LINE_NAME: '',
        ENABLED: 'Y'
      }
      this.titleText = '新增线体'
      this.innerVisible = true
    },
    // 编辑按钮
    edit_but (row) {
      let form = cloneDeep(row)
      let stop = this.organizeList.map(item => item.ID)
      stop = stop.sort((current, next) => (current > next ? 1 : -1))
      stop = stop[0] || 0
      const O_ID = form.O_ID || form.ORGANIZE_ID
      if (!O_ID) {
        return false
      }
      form.ORGANIZE_ID = this.reverseGetTree(
        this.planData,
        O_ID && parseInt(O_ID),
        stop
      )
      this.form = form
      this.titleText = '编辑线体'
      this.innerVisible = true
    },
    // 递归
    reverseGetTree (data, id, stop) {
      let arr = []
      data.map(item => {
        if (item.ID === id) {
          if (item.PARENT_ORGANIZE_ID && item.ID !== stop) {
            arr.push(
              ...this.reverseGetTree(data, item.PARENT_ORGANIZE_ID, stop)
            )
          }
          arr.push(item.ID)
        }
      })
      return arr
    },
    shout_but () {
      this.$forceUpdate()
      this.$nextTick(() => {
        this.$refs.callVal.validate(async (valid, errInfo) => {
          if (valid) {
            if (
              Object.prototype.toString.call(this.form.ORGANIZE_ID) ===
              '[object Array]'
            ) {
              this.form.ORGANIZE_ID = this.form.ORGANIZE_ID[this.form.ORGANIZE_ID.length - 1]
            }
            const response = await AddOrModifySave(this.form)
            if (response.Result) {
              this.$notify({
                title: this.$t('IpqaConfig.AddOrModify.success'),
                message: this.$t('publics.tips.submitSuccess'),
                type: 'success',
                duration: 2000
              })
              this.getLoadData()
              this.innerVisible = false
            }
          } else {
            try {
              Object.keys(errInfo).forEach(item => {
                this.$message.error(errInfo[item][0].message)
                // throw new Error(errInfo[item][0].message)
                throw Error(errInfo[item][0].message)
              })
            } catch (e) {
              console.log(e.message)
            }
          }
        })
      })
    },
    close_btn () {
      // this.form = {}
      this.form.ID = 0
      this.form.PHYSICAL_LOCATION = ''
      this.form.LINE = ''
      this.form.OPERATION_LINE_NAME = ''
      this.form.PLANT_CODE = ''
      this.form.ENABLED = 'Y'
      this.form.ORGANIZE_ID = ''
      this.innerVisible = false
      this.PhysicalName = ''
      this.LINEName = ''
    }
  },
  created () {
    this.excite.Operator = this.userinfo.USER_NAME
    this.getIndex()
  }
}
</script>

<style lang="scss" scoped>
.call-dialog-button {
  text-align: right;
}
</style>
