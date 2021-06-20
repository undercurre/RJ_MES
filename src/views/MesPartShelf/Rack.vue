<template>
  <div class="FileApplicationFile">
    <div style="margin-bottom: 15px;">
      <el-input v-model="formData.SHELF_CODE"
                :placeholder="$t('MesPartShelf._21')"
                clearable
                style="width: 200px"
                @input="searchClick"
                @keyup.enter.native="searchClick" />&nbsp;
      <el-input v-model="formData.SHELF_NAME"
                :placeholder="$t('MesPartShelf._3')"
                clearable
                style="width: 200px"
                @input="searchClick"
                @keyup.enter.native="searchClick" />&nbsp;
      <el-button type="primary"
                 icon="el-icon-search"
                 @click.prevent="searchClick">{{ $t('plbd.hd_sf') }}</el-button>
      <el-button type="success"
                 @click="addClick"
                 icon="el-icon-plus"
                 v-if="$btnList.indexOf('SavBurnFileManagerAdd') !== -1">{{ $t('plbd.add') }}</el-button>
    </div>
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
        <vxe-table-column min-width="150"
                          field="SHELF_CODE"
                          :title="$t('MesPartShelf._9')"
                          :edit-render="{name: '$input',props: {readonly: true}}" />
        <vxe-table-column min-width="150"
                          field="SHELF_NAME"
                          :title="$t('MesPartShelf._8')"
                          :edit-render="{name: '$input',props: {readonly: true}}" />
        <vxe-table-column min-width="150"
                          field="ORGANIZE_NAME"
                          :title="$t('MesPartShelf._22')"
                          :edit-render="{name: '$input',props: {readonly: true}}" />
        <vxe-table-column min-width="150"
                          field="CREATE_USER"
                          :title="$t('MesPartShelf._11')"
                          :edit-render="{name: '$input',props: {readonly: true}}" />
        <vxe-table-column min-width="150"
                          field="CREATE_TIME"
                          :title="$t('MesPartShelf._10')"
                          :edit-render="{name: '$input',props: {readonly: true}}" />
        <vxe-table-column min-width="150"
                          field="UPDATE_USER"
                          :title="$t('MesPartShelf._23')"
                          :edit-render="{name: '$input',props: {readonly: true}}" />
        <vxe-table-column min-width="150"
                          field="UPDATE_TIME"
                          :title="$t('MesPartShelf._24')"
                          :edit-render="{name: '$input',props: {readonly: true}}" />
        <vxe-table-column :title="$t('MesPartShelf._25')"
                          min-width="120"
                          align="center"
                          field="ENABLE"
                          fixed="right">
          <template v-slot="{ row }">
            <el-switch v-model="row.ENABLE"
                       disabled
                       :active-text="$t('publics.btn.yes')"
                       :inactive-text="$t('publics.btn.no')"
                       active-color="#13ce66"
                       inactive-color="#cccccc"
                       active-value="Y"
                       inactive-value="N" />
          </template>
        </vxe-table-column>
        <vxe-table-column :title="$t('sdr_le.tb_og')"
                          min-width="200"
                          align="center"
                          fixed="right">
          <template v-slot="{ row }">
            <el-button type="primary"
                       v-if="$btnList.indexOf('SavBurnFileManagerEdit') !== -1"
                       @click="editClick(row, row.$index)">{{ $t('publics.btn.edit') }}</el-button>
            <el-button type="danger"
                       @click="removeClick(row, row.$index)">{{ $t('sdr_le.tb_rm') }}</el-button>
          </template>
        </vxe-table-column>
      </vxe-table>
    </div>
    <el-pagination style="margin-top: 15px;"
                   :current-page="formData.Page"
                   :page-size="formData.Limit"
                   :page-sizes="[15, 25, 35, 45]"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="totalPage"
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange" />
    <!-- 新增 -->
    <el-dialog append-to-body
               :close-on-click-modal="false"
               v-dialogDrag
               :title="$t('BurnFile._9')"
               width="40%"
               :visible.sync="dialogTableVisible">
      <el-form ref="modifyForm"
               label-width="120px"
               :model="addForm"
               :rules="validRules"
               :show-message="false">
        <el-form-item :label="$t('MesPartShelf._26')">
          <el-input v-model="addForm.SHELF_CODE"
                    disabled />
        </el-form-item>
        <el-form-item :label="$t('MesPartShelf._8')"
                      prop="SHELF_NAME">
          <el-input v-model="addForm.SHELF_NAME" />
        </el-form-item>
        <el-form-item :label="$t('MesPartShelf._22')"
                      prop="ORGANIZE_ID">
          <el-cascader v-model="addForm.ORGANIZE_ID"
                       :options="organizeList"
                       style="width: 100%"
                       :show-all-levels="false"
                       placeholder=" "
                       :props="casProps"
                       @change="handleChangeCascader"></el-cascader>
        </el-form-item>
        <el-form-item :label="$t('MesPartShelf._25')">
          <el-switch v-model="addForm.ENABLE"
                     :active-text="$t('publics.btn.yes')"
                     :inactive-text="$t('publics.btn.no')"
                     active-color="#13ce66"
                     inactive-color="#cccccc"
                     active-value="Y"
                     inactive-value="N" />
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogTableVisible = false">{{$t('ssc_rd.cancel')}}</el-button>
        <el-button type="primary"
                   @click="saveClick">{{$t('ssc_rd.sure')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  // 直接抄
  LoadUserOrganize,
  LoadData as _LoadData
} from '@/api/SysOrganize'
import { cloneDeep } from 'lodash' // 直接抄
import pagination from '@/views/mixin/page'
import { mapGetters } from 'vuex'
import {
  LoadConfigData,
  SaveConfigData
} from '@/api/MesPartShelf'
export default {
  name: 'FileApplicationFile',
  mixins: [pagination],
  data () {
    return {
      formData: {
        Page: 1,
        Limit: 15
      },
      loading: false,
      mainTable: [],
      form: {
        InsertRecords: [],
        UpdateRecords: [],
        RemoveRecords: []
      },
      dialogTableVisible: false,
      addForm: {},
      validRules: {
        SHELF_NAME: [
          {
            required: true,
            message: this.$t('MesPartShelf._3')
          }
        ],
        ORGANIZE_ID: [
          {
            required: true,
            message: this.$t('MesPartShelf._27')
          }
        ]
      },
      organizeList: [],
      planData: [],
      casProps: {
        label: 'ORGANIZE_NAME',
        value: 'ID',
        children: 'children',
        checkStrictly: true
      }
    }
  },
  computed: {
    ...mapGetters(['userinfo', 'userId'])
  },
  created () {
    this.getLoadData()
    this.getOrganize()
  },
  methods: {
    handleChangeCascader (e) {
      // 直接抄
      if (e && e.length) {
        this.addForm.ORGANIZE_ID = e[e.length - 1]
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
    async getLoadData () {
      this.loading = true
      const res = await LoadConfigData(this.formData)
      if (res.Result) {
        this.mainTable = res.Result
        this.totalPage = res.TotalCount
      }
      this.loading = false
    },
    // 查询
    searchClick () {
      this.formData.Page = 1
      this.getLoadData()
    },
    // 新增
    async addClick () {
      this.addForm = {}
      this.addForm.ID = 0
      var date = new Date() // 年
      var month = date.getMonth() + 1 // 日
      var day = date.getDate() // 时
      var hh = date.getHours() // 分
      var mm = date.getMinutes() // 秒
      var ss = date.getSeconds()
      var YearZui = date.getYear()
      YearZui = YearZui < 2000 ? YearZui + 1900 : YearZui
      var yy = YearZui.toString()
      if (month <= 9) {
        month = '0' + month
      }
      if (ss <= 9) {
        ss = '0' + ss
      }
      if (hh <= 9) {
        hh = '0' + hh
      }
      this.addForm.SHELF_CODE = 'SFCE-' + yy + month + day + hh + mm + ss
      this.addForm.ID = 0
      this.addForm.ENABLE = 'Y'
      this.addForm.CREATE_TIME = this.getNowDate(new Date()) // 创建时间((创建必传))
      this.addForm.CREATE_USER = this.userinfo.USER_NAME// string创建人(创建必传)
      this.addForm.UPDATE_TIME = this.getNowDate(new Date()) // 修改时间(修改必传)
      this.addForm.UPDATE_USER = this.userinfo.USER_NAME// string更新人(修改必传)
      this.dialogTableVisible = true
    },
    // 编辑
    editClick (row) {
      console.log(row)
      // this.addForm = { ...row }
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
      this.addForm = form
      this.dialogTableVisible = true
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
    // 保存
    saveClick () {
      var that = this
      if (
        Object.prototype.toString.call(this.addForm.ORGANIZE_ID) ===
        '[object Array]'
      ) {
        this.addForm.ORGANIZE_ID = this.addForm.ORGANIZE_ID[this.addForm.ORGANIZE_ID.length - 1]
      }
      this.form = {
        InsertRecords: [],
        UpdateRecords: []
      }

      this.$refs.modifyForm.validate(async (valid, errInfo) => {
        if (valid) {
          this.addForm.ORGANIZE_NAME = undefined
          if (this.addForm.ID === 0) {
            this.form.InsertRecords.push(this.addForm)
          } else {
            this.addForm.CREATE_TIME = undefined
            this.form.UpdateRecords.push(this.addForm)
          }
          SaveConfigData(this.form).then((res) => {
            if (res.Result) {
              this.addForm = {}
              this.dialogTableVisible = false
              that.getLoadData()
              that.$notify({
                title: this.$t('crss._20'),
                message: this.$t('crss._21'),
                type: 'success',
                duration: 2000
              })
              this.$emit('Variety')
            }
          })
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
    // 删除
    removeClick (row) {
      this.form = {
        RemoveRecords: []
      }
      this.form.RemoveRecords.push(row)
      this.$confirm(
        this.$t('publics.tips.makeSureDelete'),
        this.$t('MesTongsApply._91'),
        {
          confirmButtonText: this.$t('MesTongsApply._92'),
          cancelButtonText: this.$t('MesTongsApply._93'),
          type: 'warning'
        }
      )
        .then(async () => {
          const res = await SaveConfigData(this.form)
          if (res.Result) {
            this.form = {}
            this.$emit('Variety')
            this.getLoadData()
            this.$notify({
              title: this.$t('crss._20'),
              message: this.$t('crss._21'),
              type: 'success',
              duration: 2000
            })
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('MesTongsApply._95')
          })
        })
    },
    // 获取当前时间
    getNowDate (date) {
      var y = date.getFullYear()
      var m = date.getMonth() + 1
      m = m < 10 ? '0' + m : m
      var d = date.getDate()
      d = d < 10 ? '0' + d : d
      var h = date.getHours()
      h = h < 10 ? '0' + h : h
      var minute = date.getMinutes()
      minute = minute < 10 ? '0' + minute : minute
      var second = date.getSeconds()
      second = second < 10 ? '0' + second : second
      return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
    }
  }
}
</script>
