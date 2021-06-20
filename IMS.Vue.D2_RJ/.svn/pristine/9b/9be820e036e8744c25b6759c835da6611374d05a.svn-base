<template>
  <d2-container>
    <template slot="header">
      <custom-container-header
        importBtnName="SmtLinesImport"
        exportBtnName="SmtLinesExport"
        exportTplName="SmtLinesExportTPL"
      >
        <el-input
          v-model="formData.Key"
          :placeholder="$t('plbd.Keywords')"
          clearable
          style="width:200px"
          @keyup.enter.native="searchClick"
        />&nbsp;
        <el-button
          type="primary"
          icon="el-icon-search"
          @click.prevent="searchClick"
        >{{ $t('plbd.hd_sf') }}</el-button>
        <el-button
          type="success"
          @click="insertEvent(null)"
          icon="el-icon-plus"
          v-if="$btnList.indexOf('SmtLinesAdd') !== -1"
        >{{ $t('plbd.add') }}</el-button>
      </custom-container-header>
    </template>
    <div class="table-container">
      <vxe-table
        ref="xTable"
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
        :checkbox-config="{checkField: 'checked', trigger: 'row'}"
      >
        <vxe-table-column
          field="LINE_NAME"
          :title="$t('plbd.line')"
          :edit-render="{name: '$input', props: {readonly: true}}"
        />
        <vxe-table-column
          field="LOCATION"
          :title="$t('plbd.position')"
          :edit-render="{name: '$input', props: {readonly: true}}"
        />
        <vxe-table-column
          field="ORGANIZE_ID"
          :title="$t('plbd._2')"
          :edit-render="{name: '$input', props: {readonly: true}}"
        />
        <vxe-table-column
          field="PLANT"
          :title="$t('plbd.factory')"
          :edit-render="{name: '$select', options: LineTypeList, props: {disabled: true}}"
        />
        <vxe-table-column :title="$t('plbd.tb_og')" width="180" align="center" fixed="right">
          <template v-slot="{ row }">
            <el-button
              type="primary"
              @click="editClick(row, row.$index)"
              v-if="$btnList.indexOf('SmtLinesEdit') !== -1"
            >{{ $t('publics.btn.edit') }}</el-button>
            <el-button
              type="danger"
              @click="removeClick({ID: row.ID})"
              v-if="$btnList.indexOf('SmtLinesRemove') !== -1"
            >{{ $t('plbd.tb_rm') }}</el-button>
          </template>
        </vxe-table-column>
      </vxe-table>
    </div>

    <template slot="footer">
      <el-pagination
        :current-page="formData.Page"
        :page-size="formData.Limit"
        :page-sizes="[15, 25, 35, 45]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalPage"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </template>
    <!-- modal -->
    <el-dialog
      v-dialogDrag
      :title="dialogText"
      :visible.sync="dialogVisible"
      width="30%"
      :close-on-click-modal="false"
    >
      <div>
        <el-form
          ref="modifyForm"
          :model="modifyForm"
          :rules="validRules"
          :show-message="false"
          class="custom-form"
          label-position="top"
        >
          <el-form-item :label="$t('plbd.line')" prop="LINE_NAME">
            <el-input v-model="modifyForm.LINE_NAME" clearable placeholder=" "></el-input>
          </el-form-item>
          <el-form-item :label="$t('plbd.position')" prop="LOCATION">
            <el-input v-model="modifyForm.LOCATION" placeholder=" " clearable></el-input>
          </el-form-item>
          <el-form-item :label="$t('plbd.factory')" prop="PLANT">
            <el-select
              style="width: 100%"
              clearable
              filterable
              v-model="modifyForm.PLANT"
              placeholder=" "
            >
              <el-option
                v-for="item in LineTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value.toString()"
              ></el-option>
            </el-select>
            <!-- <el-input v-model="modifyForm.PLANT" placeholder=" " clearable></el-input> -->
          </el-form-item>
          <el-form-item :label="$t('plbd._2')" prop="ORGANIZE_ID">
            <el-cascader
              v-model="modifyForm.ORGANIZE_ID"
              :options="organizeList"
              style="width: 100%"
              :show-all-levels="false"
              placeholder=" "
              :props="casProps"
              @change="handleChangeCascader"
            ></el-cascader>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">{{$t('ssc_rd.cancel')}}</el-button>
        <el-button type="primary" @click="submitModifyForm">{{$t('ssc_rd.sure')}}</el-button>
      </span>
    </el-dialog>
  </d2-container>
</template>
<script>
import pagination from '@/views/mixin/page'
import customContainerHeader from '@/components/custom-container-header'
import CURD from '@/views/mixin/CURD'
import helper from '@/api/SmtLines'
import {
  // 直接抄
  LoadUserOrganize,
  LoadData
} from '@/api/SysOrganize'
import {
  // 直接抄
  mapGetters
} from 'vuex'
import { cloneDeep } from 'lodash'
import { LoadMESLineType } from '@/api/SfcsOperationLines' // 直接抄
const API = helper('SmtLines')
export default {
  name: 'SmtLines',
  mixins: [
    pagination,
    CURD({
      defaultSaveAPI: (e) => API.SaveData(e)
    })
  ],
  components: {
    customContainerHeader
  },
  computed: {
    ...mapGetters(['userId'])
  },
  data () {
    return {
      validRules: {
        LINE_NAME: [
          {
            required: true,
            message: this.$t('plbd.p_line')
          }
        ],
        LOCATION: [
          {
            required: true,
            message: this.$t('plbd.p_position')
          }
        ],
        PLANT: [
          {
            required: true,
            message: this.$t('plbd.p_factory')
          }
        ],
        ORGANIZE_ID: [
          {
            required: true,
            message: this.$t('plbd._1')
          }
        ]
      },
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
      planData: [],
      LineTypeList: []
    }
  },
  created () {
    this.getIndex()
  },
  methods: {
    async getLineTypeList () {
      const res = await LoadMESLineType()
      const data = res.Result || []
      this.LineTypeList = []
      data.map((item) => {
        this.LineTypeList.push({
          label: item.CHINESE,
          value: item.LOOKUP_CODE
        })
      })
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
      this.planData = ORGANIZE
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
      let modifyForm = cloneDeep(row)
      let stop = this.organizeList.map((item) => item.ID)
      stop = stop.sort((current, next) => (current > next ? 1 : -1))
      stop = stop[0] || 0
      const O_ID = modifyForm.O_ID || modifyForm.ORGANIZE_ID
      if (!O_ID) {
        return false
      }
      modifyForm.ORGANIZE_ID = this.reverseGetTree(
        this.planData,
        O_ID && parseInt(O_ID),
        stop
      )
      this.modifyForm = modifyForm
      this.dialogVisible = true
      this.dialogText = this.$t('publics.btn.edit')
    },
    // 递归
    reverseGetTree (data, id, stop) {
      let arr = []
      data.map((item) => {
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
    // 新增
    insertEvent () {
      // 直接抄 【】
      this.dialogVisible = true
      this.modifyForm = {}
      this.dialogText = this.$t('publics.btn.add')
    },
    // 提交
    submitModifyForm () {
      // 直接抄
      this.$refs.modifyForm.validate(async (valid, errInfo) => {
        if (valid) {
          if (
            Object.prototype.toString.call(this.modifyForm.ORGANIZE_ID) ===
            '[object Array]'
          ) {
            this.modifyForm.ORGANIZE_ID = this.modifyForm.ORGANIZE_ID[this.modifyForm.ORGANIZE_ID.length - 1]
          }
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
          const res = await API.SaveData(form)
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
      const res = await API.Index()
      if (res.Result) {
        this.getOrganize()
        this.getLoadData()
        this.getLineTypeList()
      }
    },
    async getLoadData () {
      this.loading = true
      this.formData.USER_ID = this.userId
      const res = await API.LoadData(this.formData)
      this.loading = false
      this.mainTable = res.Result || []
      this.totalPage = res.TotalCount || 0
    },
    // 搜索
    searchClick () {
      this.formData.Page = 1
      this.getLoadData()
    }
    // 新增
    // async insertEvent (row) {
    //   const record = {
    //     ID: 0,
    //     LINE_NAME: '',
    //     LOCATION: '',
    //     PLANT: ''
    //   }
    //   this.$refs.xTable.insertAt(record, row).then(({ row }) => {
    //     this.$refs.xTable.setActiveRow(row)
    //   })
    // }
  }
}
</script>
