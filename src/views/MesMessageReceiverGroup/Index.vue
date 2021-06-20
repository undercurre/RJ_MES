<template>
  <d2-container class="MesMessageReceiverGroup">
    <template slot="header">
      <custom-container-header defaultTotalPage="total"
                               defaultLoadingFlag="listLoading"
                               defaultFormData="listQuery"
                               exportMehodsName="exportData">
        <el-cascader v-model="MstQuery.Organize_ID"
                     :options="organizeList"
                     clearable
                     style="width: 200px;margin-right: 10px;"
                     :show-all-levels="false"
                     :placeholder="$t('MesMessageReceiverGroup._1')"
                     :props="casProps"
                     @change="handleChangeCascader"></el-cascader>&nbsp;
        <el-input v-model="MstQuery.Key"
                  :placeholder="$t('MesMessageReceiverGroup._2')"
                  clearable
                  style="width:200px"
                  @input="MstSearch"
                  @keyup.enter.native="MstSearch" />&nbsp;
        <el-button type="primary"
                   icon="el-icon-search"
                   @click.prevent="MstSearch">{{$t('publics.btn.search')}}</el-button>
        <el-button type="success"
                   style="margin-right: 30px;"
                   icon="el-icon-plus"
                   v-if="$btnList.indexOf('MesMessageReceiverGroupAdd') !== -1"
                   @click.prevent="MstAdd">{{$t('publics.btn.add')}}</el-button>
        <span>{{$t('MesMessageReceiverGroup._3')}}：</span>
        <el-input v-model="ChidQuery.Key"
                  :placeholder="$t('MesMessageReceiverGroup._12')"
                  clearable
                  style="width:200px"
                  @input="MstSearch"
                  @keyup.enter.native="ChidSearch" />
        <el-button type="primary"
                   icon="el-icon-search"
                   @click.prevent="ChidSearch">{{$t('publics.btn.search')}}</el-button>

      </custom-container-header>
    </template>
    <div class="msttable">
      <vxe-table ref="xTable"
                 border
                 stripe
                 keep-source
                 highlight-hover-row
                 highlight-current-row
                 show-overflow
                 auto-resize
                 width="100%"
                 height="100%"
                 :radio-config="{labelField: 'name', trigger: 'row'}"
                 :data="MstTable"
                 :edit-config="{trigger: 'click', mode: 'row', mode: 'cell'}"
                 @cell-click="MSTcellClick">
        <vxe-table-column show-overflow
                          :title="$t('MesMessageReceiverGroup._4')"
                          min-width="60"
                          type="radio"
                          align="center" />
        <vxe-table-column show-overflow
                          field="ROWNO"
                          :title="$t('MesMessageReceiverGroup._5')"
                          :edit-render="{name: '$input', props: {readonly: true}}"
                          min-width="60"
                          align="center" />
        <vxe-table-column show-overflow
                          min-width="200"
                          field="ORGANIZE_NAME"
                          :title="$t('MesMessageReceiverGroup._6')"
                          :edit-render="{name: '$input', props: {readonly: true}}"
                          align="center" />

        <vxe-table-column show-overflow
                          min-width="100"
                          field="GROUP_NAME"
                          :title="$t('MesMessageReceiverGroup._7')"
                          :edit-render="{name: '$input', props: {readonly: true}}"
                          align="center" />
        <vxe-table-column show-overflow
                          min-width="120"
                          field="DESCRIPTION"
                          :title="$t('MesMessageReceiverGroup._8')"
                          :edit-render="{name: '$input', props: {readonly: true}}"
                          align="center" />
        <vxe-table-column field="ENABLED"
                          min-width="100"
                          fixed="right"
                          align="center"
                          :title="$t('MesMessageReceiverGroup._9')">
          <template v-slot="{ row }">
            <el-switch v-model="row.ENABLED"
                       :active-text="$t('publics.btn.yes')"
                       :inactive-text="$t('publics.btn.no')"
                       active-color="#13ce66"
                       inactive-color="#cccccc"
                       active-value="Y"
                       inactive-value="N"
                       @change="Mstchange(row)" />
          </template>
        </vxe-table-column>
        <vxe-table-column :title="$t('MesMessageReceiverGroup._10')"
                          align="center"
                          min-width="250"
                          fixed="right">
          <template v-slot="{ row }">
            <el-button type="primary"
                       v-if="$btnList.indexOf('MesMessageReceiverGroupEdit') !== -1"
                       @click="MSTeditClick(row)">{{$t('publics.btn.edit')}}</el-button>
            <el-button type="danger"
                       v-if="$btnList.indexOf('MesMessageReceiverGroupdelete') !== -1"
                       @click="MSTdeleteClick(row)">{{$t('publics.btn.delete')}}</el-button>
            <el-button type="success"
                       v-if="$btnList.indexOf('MesMessageReceiverGroupAdduser') !== -1"
                       @click="MSTuserClick(row, row.$index)">{{$t('MesMessageReceiverGroup._11')}}</el-button>
          </template>
        </vxe-table-column>
      </vxe-table>
    </div>
    <el-pagination :current-page="MstQuery.Page"
                   style="margin: 10px 0;"
                   :page-size="MstQuery.Limit"
                   :page-sizes="[15,25,35,45]"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="Msttotal"
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange" />
    <div class="chidtable">
      <vxe-table ref="xTable2"
                 border
                 stripe
                 keep-source
                 highlight-hover-row
                 highlight-current-row
                 show-overflow
                 auto-resize
                 width="100%"
                 height="100%"
                 :radio-config="{labelField: 'name', trigger: 'row'}"
                 :data="ChildTable"
                 :edit-config="{trigger: 'click', mode: 'row', mode: 'cell'}">

        <vxe-table-column show-overflow
                          field="USER_NAME"
                          :title="$t('MesMessageReceiverGroup._13')"
                          :edit-render="{name: '$input', props: {readonly: true}}"
                          align="center" />

        <vxe-table-column show-overflow
                          field="NICK_NAME"
                          :title="$t('MesMessageReceiverGroup._14')"
                          :edit-render="{name: '$input', props: {readonly: true}}"
                          align="center" />
        <vxe-table-column show-overflow
                          field="MOBILE"
                          :title="$t('MesMessageReceiverGroup._15')"
                          :edit-render="{name: '$input', props: {readonly: true}}"
                          align="center" />
        <vxe-table-column :title="$t('MesMessageReceiverGroup._10')"
                          align="center"
                          fixed="right">
          <template v-slot="{ row }">
            <el-button type="danger"
                       v-if="$btnList.indexOf('MesMessageReceiverGroupDtldelete') !== -1"
                       @click="ChilddeleteClick(row)">{{$t('publics.btn.delete')}}</el-button>
          </template>
        </vxe-table-column>
      </vxe-table>
    </div>
    <el-pagination :current-page="ChidQuery.Page"
                   style="margin-top: 10px;"
                   :page-size="ChidQuery.Limit"
                   :page-sizes="[15,25,35,45]"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="Chidtotal"
                   @size-change="ChidSizeChange"
                   @current-change="ChidCurrentChange" />
    <!--新增/编辑 -->
    <el-dialog v-dialogDrag
               width="40%"
               :title="addorediText"
               :visible.sync="innerVisible"
               :close-on-click-modal="false"
               append-to-body
               class="call-dialog">
      <el-form ref="callVal"
               label-position="top"
               :show-message="false"
               :model="MstForm"
               :rules="rules"
               label-width="110px">
        <el-form-item :label="$t('MesMessageReceiverGroup._6')"
                      prop="ORGANIZE_ID">
          <el-cascader v-model="MstForm.ORGANIZE_ID"
                       :options="organizeList"
                       style="width: 100%;"
                       :show-all-levels="false"
                       placeholder=" "
                       :props="casProps"
                       @change="Formascader"></el-cascader>

        </el-form-item>
        <el-form-item :label="$t('MesMessageReceiverGroup._7')"
                      prop="GROUP_NAME">
          <el-input v-model="MstForm.GROUP_NAME"
                    placeholder=" " />
        </el-form-item>
        <el-form-item :label="$t('MesMessageReceiverGroup._18')"
                      prop="DESCRIPTION">
          <el-input v-model="MstForm.DESCRIPTION"
                    type="textarea"
                    placeholder=" " />
        </el-form-item>
        <el-form-item :label="$t('MesMessageReceiverGroup._9')">
          <el-switch v-model="MstForm.ENABLED"
                     :active-text="$t('publics.btn.yes')"
                     :inactive-text="$t('publics.btn.no')"
                     active-color="#13ce66"
                     inactive-color="#cccccc"
                     active-value="Y"
                     inactive-value="N" />
        </el-form-item>
        <div style="text-align: center;">
          <el-button type="success"
                     @click="MSTdefine('callVal')">&nbsp;{{$t('publics.btn.makeSure')}}&nbsp;</el-button>
          <el-button @click="innerVisible=false">&nbsp;{{$t('publics.btn.cancel')}}&nbsp;</el-button>
        </div>
      </el-form>
    </el-dialog>
    <!-- 添加用户 -->
    <el-dialog v-dialogDrag
               :close-on-click-modal="false"
               :title="$t('MesMessageReceiverGroup._11')"
               :visible.sync="dialogVisible"
               width="50%"
               class="main-dlalog">
      <div style="margin-bottom: 15px;">
        <el-input v-model="SelectQuery.Key"
                  :placeholder="$t('MesMessageReceiverGroup._12')"
                  style="width:200px"
                  @input="Usersearch"
                  @click.native="Usersearch" />&nbsp;&nbsp;
        <el-button type="success"
                   icon="el-icon-search"
                   @click.native="Usersearch">{{$t('SOPRoutes._6')}}</el-button>
        <el-button type="primary"
                   @click="UserdetClick">{{$t('SOPRoutes._31')}}</el-button>
        <el-button @click="dialogVisible = false">{{$t('SOPRoutes._48')}}</el-button>
      </div>
      <div class="usertable">
        <el-table ref="procesrefs"
                  :data="SelectTable"
                  style="width: 100%;"
                  height="100%"
                  border
                  :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                  @selection-change="UserSelectionChange">
          <el-table-column type="selection"
                           align="center"
                           width="55" />
          <el-table-column prop="ROWNO"
                           align="center"
                           :label="$t('MesMessageReceiverGroup._16')" />
          <el-table-column prop="USER_NAME"
                           align="center"
                           :label="$t('MesMessageReceiverGroup._13')" />
          <el-table-column prop="NICK_NAME"
                           align="center"
                           :label="$t('MesMessageReceiverGroup._14')" />
          <el-table-column prop="MOBILE"
                           align="center"
                           :label="$t('MesMessageReceiverGroup._15')" />
        </el-table>
      </div>
      <el-pagination :current-page="SelectQuery.Page"
                     style="margin-top: 10px;"
                     :page-size="SelectQuery.Limit"
                     :page-sizes="[15,25,35,45]"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="Selecttotal"
                     @size-change="SelectSizeChange"
                     @current-change="SelectChange" />
    </el-dialog>
  </d2-container>
</template>
<script>
import {
  // 直接抄
  LoadUserOrganize,
  LoadData as _LoadData
} from '@/api/SysOrganize'
import { cloneDeep } from 'lodash' // 直接抄
import {
  LoadData,
  ChangeEnabled,
  DeleteOneById,
  SaveData
} from '@/api/MesMessageReceiverGroup'
import {
  DtlLoadData,
  DtlSaveData,
  DtlDeleteOneById
} from '@/api/MesMessageReceiverGroupDtl'
import { mapGetters } from 'vuex'
import customContainerHeader from '@/components/custom-container-header'
export default {
  name: 'MesMessageReceiverGroup',
  components: {
    customContainerHeader
  },
  data () {
    return {
      casProps: {
        label: 'ORGANIZE_NAME',
        value: 'ID',
        children: 'children',
        checkStrictly: true
      },
      organizeList: [],
      planData: [],
      MstQuery: {
        Page: 1, // 当前页
        Limit: 15, // 分页大小
        Organize_ID: undefined,
        Key: ''
      },
      MstLoading: false,
      MstTable: [],
      Msttotal: 0,
      effect: {
        Id: 0,
        Status: false,
        Operator: ''
      },
      innerVisible: false,
      addorediText: '',
      MstForm: {
        ID: 0,
        ORGANIZE_ID: '', // 组织ID
        DEP_ID: 0, // 部门ID（默认为0 已无用）
        GROUP_NAME: '', // 分组名称
        DESCRIPTION: '', // 描述
        ENABLED: 'Y', // 是否激活
        CREATE_USER: '', // 创建人
        CREATE_TIME: '', // 创建时间
        UPDATE_USER: '', // 最后修改人
        UPDATE_TIME: '' // 最后修改时间
      },
      rules: {
        ORGANIZE_ID: [{
          required: true,
          message: this.$t('MesMessageReceiverGroup._1'),
          trigger: 'change'
        }],
        GROUP_NAME: [{
          required: true,
          message: this.$t('MesMessageReceiverGroup._17'),
          trigger: 'blur'
        }]
      },

      ChildTable: [],
      Chidtotal: 0,
      ChidQuery: {
        Group_ID: undefined,
        Key: '',
        Page: 1, // 当前页
        Limit: 15 // 分页大小
      },
      dialogVisible: false,
      SelectTable: [],
      Selecttotal: 0,
      SelectQuery: {
        Key: '',
        Page: 1, // 当前页
        Limit: 15 // 分页大小
      },
      UserForm: {
        InsertRecords: []
      }
    }
  },
  computed: {
    ...mapGetters(['userinfo', 'userId'])
  },
  created () {
    this.getOrganize()
    this.getLoadData()
    this.effect.Operator = this.userinfo.USER_NAME
  },
  methods: {
    handleChangeCascader (e) {
      // 直接抄
      if (e && e.length) {
        this.MstQuery.Organize_ID = e[e.length - 1]
      }
    },
    Formascader (e) {
      // 直接抄
      if (e && e.length) {
        this.MstForm.ORGANIZE_ID = e[e.length - 1]
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
    // 获取数据
    async getLoadData () {
      const res = await LoadData(this.MstQuery)
      console.log(res, '获取表格列表')
      this.MstTable = res.Result
      this.Msttotal = res.TotalCount
      this.MstLoading = false
    },
    MstSearch () {
      this.MstQuery.Page = 1
      this.getLoadData()
    },
    handleSizeChange (val) {
      this.MstQuery.Limit = val
      this.getLoadData()
    },
    handleCurrentChange (val) {
      this.MstQuery.Page = val
      this.getLoadData()
    },
    // 主表选择
    MSTcellClick (e) {
      this.ChidQuery.Group_ID = e.row.ID
      this.getDtlLoadData()
    },
    async getDtlLoadData () {
      const res = await DtlLoadData(this.ChidQuery)
      if (res.Result) {
        this.ChildTable = res.Result ? res.Result : []
        this.Chidtotal = res.TotalCount ? res.TotalCount : 0
      }
    },
    ChidSearch () {
      if (!this.ChidQuery.Group_ID) {
        this.$message({
          showClose: true,
          message: this.$t('MesMessageReceiverGroup._18'),
          type: 'warning'
        })
        return
      }
      this.ChidQuery.Page = 1
      this.getDtlLoadData()
    },
    ChidSizeChange (val) {
      this.ChidQuery.Limit = val
      this.getDtlLoadData()
    },
    ChidCurrentChange (val) {
      this.ChidQuery.Page = val
      this.getDtlLoadData()
    },
    MstAdd () {
      this.Eliminate()
      this.addorediText = this.$t('publics.btn.add')
      this.innerVisible = true
    },

    Mstchange (row) {
      if (row.ENABLED === 'Y') {
        this.effect.Status = true
      } else {
        this.effect.Status = false
      }
      this.effect.Id = row.ID
      this.$confirm(this.$t('cccn._20'), this.$t('cccn._21'), {
        confirmButtonText: this.$t('cccn._22'),
        cancelButtonText: this.$t('cccn._23'),
        type: 'warning'
      })
        .then(() => {
          ChangeEnabled(this.effect).then(res => {
            if (res.Result) {
              this.$notify({
                title: this.$t('cccn._24'),
                message: this.$t('cccn._25'),
                type: 'success',
                duration: 2000
              })
            }
            this.getLoadData()
          })
        })
        .catch(() => {
          this.getLoadData()
        })
    },
    // 编辑
    MSTeditClick (row) {
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
      this.addorediText = this.$t('publics.btn.edit')
      this.MstForm = form
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
    // 主表删除
    MSTdeleteClick (row) {
      this.$confirm(this.$t('cccn._26'), this.$t('cccn._21'), {
        confirmButtonText: this.$t('cccn._22'),
        cancelButtonText: this.$t('cccn._23'),
        type: 'warning'
      }).then(response => {
        DeleteOneById(row.ID).then(response => {
          if (response.Result) {
            this.$notify({
              title: this.$t('cccn._24'),
              message: this.$t('cccn._25'),
              type: 'success',
              duration: 2000
            })
            this.getLoadData()
          } else {
            this.getLoadData()
          }
        })
      })
    },
    // 确定
    MSTdefine () {
      if (
        Object.prototype.toString.call(this.MstForm.ORGANIZE_ID) ===
        '[object Array]'
      ) {
        this.MstForm.ORGANIZE_ID = this.MstForm.ORGANIZE_ID[this.MstForm.ORGANIZE_ID.length - 1]
      }
      var date = new Date() // 年
      var year = date.getFullYear() // 月
      var month = date.getMonth() + 1 // 日
      var day = date.getDate() // 时
      var hh = date.getHours() // 分
      var mm = date.getMinutes() // 秒
      var ss = date.getSeconds()
      if (ss <= 9) {
        ss = '0' + ss
      }
      var gettime = year + '-' + month + '-' + day + ' ' + hh + ':' + mm + ':' + ss
      this.$refs.callVal.validate(
        async (valid, errInfo) => {
          if (valid) {
            var obj = {
              InsertRecords: [], // 新
              UpdateRecords: [],
              RemoveRecords: []
            }
            if (this.MstForm.ID === 0) {
              this.MstForm.CREATE_USER = this.userinfo.USER_NAME
              this.MstForm.CREATE_TIME = gettime
              this.MstForm.UPDATE_USER = this.userinfo.USER_NAME
              this.MstForm.UPDATE_TIME = gettime
              obj.InsertRecords.push(this.MstForm)
            } else {
              this.MstForm.UPDATE_USER = this.userinfo.USER_NAME
              this.MstForm.UPDATE_TIME = gettime
              obj.UpdateRecords.push(this.MstForm)
            }
            const res = await SaveData(obj)
            if (res.Result) {
              this.innerVisible = false
              this.getLoadData()
              this.$notify({
                title: this.$t('cccn._24'),
                message: this.$t('cccn._25'),
                type: 'success',
                duration: 2000
              })
            }
          } else {
            try {
              Object.keys(errInfo).forEach(item => {
                this.$message.error(errInfo[item][0].message)
                throw new Error(new Date().toLocaleString())
              })
            } catch { }
          }
        })
    },
    MSTuserClick () {
      this.dialogVisible = true
      this.SeleDtlLoadData()
    },
    async SeleDtlLoadData () {
      const res = await DtlLoadData(this.SelectQuery)
      if (res.Result) {
        this.SelectTable = res.Result
        this.Selecttotal = res.TotalCount
      }
    },
    Usersearch () {
      this.SelectQuery.Page = 1
      this.SeleDtlLoadData()
    },

    SelectSizeChange (val) {
      this.SelectQuery.Limit = val
      this.SeleDtlLoadData()
    },
    SelectChange (val) {
      this.SelectQuery.Page = val
      this.SeleDtlLoadData()
    },
    // 选择用户
    UserSelectionChange (row) {
      var PrimaryTable = row
      const arr1Ids = this.ChildTable.map(item => item.ID)
      const result = PrimaryTable.filter(item => !arr1Ids.includes(item.ID))
      result.forEach(v => {
        v.GROUP_ID = this.ChidQuery.Group_ID
      })
      this.UserForm.InsertRecords = result
      console.log(result, 'result')
    },
    // 选中用户确定
    async UserdetClick () {
      if (this.UserForm.InsertRecords.length === 0) {
        this.$message({
          showClose: true,
          message: this.$t('请选择用户'),
          type: 'warning'
        })
        return
      }
      const res = await DtlSaveData(this.UserForm)
      if (res.Result) {
        this.dialogVisible = false
        this.$notify({
          title: this.$t('cccn._24'),
          message: this.$t('cccn._25'),
          type: 'success',
          duration: 2000
        })
        this.getDtlLoadData()
      }
    },
    // 子表删除
    async ChilddeleteClick (row) {
      this.$confirm(this.$t('cccn._26'), this.$t('cccn._21'), {
        confirmButtonText: this.$t('cccn._22'),
        cancelButtonText: this.$t('cccn._23'),
        type: 'warning'
      }).then(v => {
        DtlDeleteOneById(row.ID).then(res => {
          if (res.Result) {
            this.$notify({
              title: this.$t('cccn._24'),
              message: this.$t('cccn._25'),
              type: 'success',
              duration: 2000
            })
            this.getDtlLoadData()
          } else {
            this.getDtlLoadData()
          }
        })
      })
    },
    // 清空
    Eliminate () {
      this.MstForm = {
        ID: 0,
        ENABLED: 'Y'
      }
    }

  }
}
</script>
<style lang="scss">
.msttable,
.chidtable,
.usertable {
  height: calc(100vh - 530px);
}
</style>
