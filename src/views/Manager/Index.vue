<template>
  <d2-container>
    <template slot="header">
      <custom-container-header
        exportMehodsName="exportData"
        exportBtnName="ManagerExport"
        importBtnName="ManagerImport"
        exportTplName="ManagerExportTpl"
        :uploadURl="uploadURl"
      >
        <el-input
          clearable
          v-model="formData.Key"
          style="width: 200px;"
          class="filter-item"
          :placeholder="$t('Manager.PleaseAccount')"
          @keyup.enter.native="handleFilter"
        />&nbsp;
        <el-button
          class="filter-item"
          type="primary"
          icon="el-icon-search"
          @click="handleFilter"
        >{{ $t('Manager.search') }}</el-button>
        <el-button
          v-if="$btnList.indexOf('ManagerAdd') !== -1"
          class="filter-item"
          style="margin-left: 10px;"
          type="success"
          icon="el-icon-plus"
          @click="handleCreate"
        >{{ $t('Manager.add') }}</el-button>
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
      >
        <vxe-table-column field="User_Name" :title="$t('Manager.userAccount')" min-width="120" />
        <vxe-table-column field="Nick_Name" :title="$t('Manager.UserNic')" min-width="150" />
        <vxe-table-column field="Mobile" :title="$t('Manager.phone')" min-width="150" />
        <vxe-table-column field="Work_Wechat_Id" :title="$t('Manager.WeChat')" min-width="150" />
        <vxe-table-column field="Role_Name" :title="$t('Manager.roles')" min-width="120" />
        <vxe-table-column field="Remark" :title="$t('Manager.remark')" min-width="150" />
        <vxe-table-column
          width="150"
          field="IsEnabled"
          :title="$t('Manager.available')"
          :edit-render="{autofocus: '.custom-input', type: 'visible'}"
        >
          <template slot-scope="scope">
            <div>
              <el-switch
                :disabled="$btnList.indexOf('Managerstate') == -1"
                @change="change(scope)"
                v-model="scope.row.IsEnabled"
                :active-text="$t('publics.btn.yes')"
                :inactive-text="$t('publics.btn.no')"
                active-color="#13ce66"
                inactive-color="#cccccc"
                :active-value="true"
                :inactive-value="false"
              />
            </div>
          </template>
        </vxe-table-column>
        <vxe-table-column :title="$t('as_src.tb_og')" align="center" fixed="right" width="180">
          <template slot-scope="scope">
            <el-button
              v-if="$btnList.indexOf('Manageredit') !== -1"
              type="primary"
              @click="handleEdit(scope)"
            >{{ $t('ManagerRole.editPermission') }}</el-button>
            <el-button
              v-if="$btnList.indexOf('Managerdelete') !== -1"
              type="danger"
              @click="handleDelete(scope)"
            >{{ $t('ManagerRole.delete') }}</el-button>
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
      :title="titleText"
      :visible.sync="drawer"
      width="40%"
      :close-on-click-modal="false"
    >
      <div>
        <el-form
          ref="xuser"
          :show-message="false"
          :model="form"
          :rules="rules"
          label-width="120px"
          label-position="right"
        >
          <el-form-item :label="$t('Manager.userAccount')" prop="USER_NAME">
            <el-input
              :value="form.USER_NAME"
              :placeholder="$t('Manager.PleaseAccount')"
              @input="e => {form.USER_NAME = e;$forceUpdate()}"
            />
          </el-form-item>
          <el-form-item :label="$t('Manager.roles')" prop="ROLE_ID">
            <el-select
              v-model="form.ROLE_ID"
              style="width: 100%"
              :placeholder="$t('Manager.pleaseRoles')"
              @change="$forceUpdate()"
            >
              <el-option
                v-for="item in roleList"
                :key="item.Id"
                :label="item.Role_Name"
                :value="item.Id"
              />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('Manager.UserNic')" prop="NICK_NAME">
            <el-input
              v-model="form.NICK_NAME"
              :placeholder="$t('Manager.pleaseUserNic')"
              @input="$forceUpdate()"
            />
          </el-form-item>
          <el-form-item :label="$t('Manager._3')" prop="ORGANIZE_ID_STRING">
            <el-cascader
              v-show="isFhow"
              v-model="form.ORGANIZE_IDS"
              :options="parentTreeList"
              style="width: 100%"
              :show-all-levels="false"
              :props="casProps"
              @change="handleChangeCascader"
            ></el-cascader>
          </el-form-item>
          <el-form-item :label="$t('Manager.phone')">
            <el-input
              v-model="form.MOBILE"
              type="text"
              :placeholder="$t('Manager.pleasePhone')"
              @input="$forceUpdate()"
            />
          </el-form-item>
          <el-form-item :label="$t('Manager.WeChat')">
            <el-input
              v-model="form.WORK_WECHAT_ID"
              type="text"
              :placeholder="$t('Manager.pleaseWeChat')"
              @input="$forceUpdate()"
            />
          </el-form-item>
          <el-form-item :label="$t('Manager.available')">
            <el-switch
              v-model="form.ENABLED"
              :active-text="$t('publics.btn.yes')"
              :inactive-text="$t('publics.btn.no')"
              active-color="#13ce66"
              inactive-color="#cccccc"
              @change="$forceUpdate()"
            />
          </el-form-item>
          <el-form-item :label="$t('Manager.remark')">
            <el-input
              v-model="form.REMARK"
              type="textarea"
              :autosize="{ minRows: 3, maxRows: 5}"
              resize="none"
              placeholder=" "
              @input="$forceUpdate()"
            />
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button
          @click="resetPwd"
          type="warning"
          v-if="$btnList.indexOf('ManagerResetPwd') !== -1"
        >{{$t('publics.btn.resetPWD')}}</el-button>
        <el-button @click="cancel">{{$t('publics.btn.cancel')}}</el-button>
        <el-button type="primary" @click="onSubmit">{{ $t('publics.btn.makeSure') }}</el-button>
      </span>
    </el-dialog>
  </d2-container>
</template>

<script>
import pagination from '@/views/mixin/page'
import customContainerHeader from '@/components/custom-container-header'
import {
  Index,
  page,
  rolelist,
  putObj,
  Status,
  Delete,
  IsExistsName,
  ResetPassword,
  ExportData
} from '@/api/sys.user'
import { LoadData as _LoadData, LoadUserOrganize } from '@/api/SysOrganize'
export default {
  name: 'Manager',
  mixins: [pagination],
  components: {
    customContainerHeader
  },
  data () {
    return {
      mainTable: [],
      loading: false,
      titleText: '',
      drawer: false,
      form: {},
      roleList: [],
      // 验证
      rules: {
        USER_NAME: [
          {
            required: true,
            message: this.$t('Manager.PleaseAccount'),
            trigger: 'blur'
          }
        ],
        NICK_NAME: [
          {
            required: true,
            message: this.$t('Manager.pleaseUserNic'),
            trigger: 'blur'
          }
        ],
        ROLE_ID: [
          {
            required: true,
            message: this.$t('Manager.pleaseRoles'),
            trigger: 'blur'
          }
        ],
        ORGANIZE_ID_STRING: [
          {
            required: true,
            message: this.$t('Manager._3'),
            trigger: 'blur'
          }
        ]
      },
      parentTreeList: [],
      casProps: {
        label: 'ORGANIZE_NAME',
        value: 'ID',
        children: 'children',
        checkStrictly: true,
        multiple: true,
        emitPath: true
      },
      planData: [],
      isFhow: true,
      uploadURl: process.env.VUE_APP_BASE_IMG + 'api/Manager/SaveExcelData'
    }
  },
  methods: {

    changeUSER_NAME (e) {
      // this.$forceUpdate()
    },
    changeROLE_ID (e) {
      // this.$forceUpdate()
    },
    changeNICK_NAME (e) {
      // this.$forceUpdate()
    },
    changeMOBILE (e) {
      // this.$forceUpdate()
    },
    changeWORK_WECHAT_ID (e) {
      // this.$forceUpdate()
    },
    changeENABLED (e) {
      // this.$forceUpdate()
    },
    changeREMARK (e) {
      // this.$forceUpdate()
    },
    async getIndex () {
      const res = await Index()
      if (res.Result) {
        this.getLoadData()
        this.getRole()
        this.getTreeData()
      }
    },
    handleChangeCascader (e) {
      this.form.ORGANIZE_ID_STRING = []
      if (e && e.length) {
        e.map((item) => {
          if (item && item.length) {
            this.form.ORGANIZE_ID_STRING.push(item[item.length - 1])
          }
        })
      }
      this.form.ORGANIZE_ID_STRING = this.form.ORGANIZE_ID_STRING.join(',')
      this.$forceUpdate()
    },
    async getTreeData () {
      const res = await _LoadData({
        Page: 1,
        Limit: 100000000
      })
      this.planData = res.Result || []
      this.parentTreeList = res.Result ? this.getTree(res.Result) : []
    },
    // 递归
    getTree (data, pid = 0, level = 1) {
      let arr = []
      data.map((item) => {
        if (item.PARENT_ORGANIZE_ID === pid) {
          item.level = level
          item.children = this.getTree(data, item.ID, level + 1)
          item.disabled = item.ENABLED === 'N'
          arr.push(item)
        }
      })
      return arr
    },
    async exportData () {
      this.loading = true
      const res = await ExportData(this.formData)
      this.loading = false
      this.mainTable = res.Result || []
      this.totalPage = res.TotalCount || 0
    },
    // 获取用户列表
    async getLoadData () {
      this.loading = true
      const response = await page(this.formData)
      this.loading = false
      this.mainTable = response.Result || []
      this.totalPage = response.TotalCount || []
    },
    handleFilter () {
      this.formData.Page = 1
      this.getLoadData()
    },
    handleCreate () {
      this.form = {}
      this.drawer = true
      this.titleText = this.$t('Manager._2')
    },
    // 获取角色列表
    async getRole () {
      const response = await rolelist()
      if (response.Result) {
        this.roleList = response.Result || []
      } else {
        this.roleList = []
      }
    },
    change ({ $index, row }) {
      this.statusArr.Id = row.Id
      this.statusArr.Status = row.IsEnabled
      this.$confirm(
        this.$t('Manager.Modifystatus'),
        this.$t('Manager.prompt'),
        {
          confirmButtonText: this.$t('Manager.confirm'),
          cancelButtonText: this.$t('Manager.cancel'),
          type: 'warning'
        }
      )
        .then(async () => {
          const response = await Status(this.statusArr)
          if (response.Result) {
            this.getLoadData()
            this.$message({
              type: 'success',
              message: this.$t('Manager.Succfied')
            })
          } else {
            this.getLoadData()
          }
        })
        .catch(() => {
          this.getLoadData()
          this.$message({
            type: 'info',
            message: this.$t('Manager.edit')
          })
        })
    },
    async handleEdit ({ row }) {
      this.$set(this.form, 'ID', row.Id)
      this.$set(this.form, 'ROLE_ID', row.Role_Id)
      this.$set(this.form, 'USER_NAME', row.User_Name)
      this.$set(this.form, 'NICK_NAME', row.Nick_Name)
      this.$set(this.form, 'MOBILE', row.Mobile || '')
      this.$set(this.form, 'WORK_WECHAT_ID', row.Work_Wechat_Id || '')
      this.$set(this.form, 'ENABLED', row.IsEnabled)
      this.$set(this.form, 'REMARK', row.Remark || '')
      this.$set(this.form, 'ORGANIZE_IDS', [])
      await this.getPeopleList(row.Id)
      // this.form.ORGANIZE_ID_STRING = this.form.ORGANIZE_IDS.join(',')
      this.$set(
        this.form,
        'ORGANIZE_ID_STRING',
        this.form.ORGANIZE_IDS.join(',')
      )
      this.drawer = true
      this.titleText = this.$t('Manager._1')
    },
    onSubmit () {
      this.$refs.xuser.validate(async (valid, errInfo) => {
        if (valid) {
          const response = await IsExistsName(this.form)
          if (response.Result !== void 0) {
            if (response.Result) {
              this.$message.error(this.$t('Manager.userExcite'))
              return false
            }
            const result = await putObj(this.form)
            if (result.Result) {
              this.form = {}
              this.drawer = false
              this.getLoadData()
              this.$notify({
                title: this.$t('Manager.success'),
                message: this.$t('publics.tips.handleSuccess'),
                type: 'success',
                duration: 2000
              })
            }
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
    cancel () {
      this.form = {}
      this.drawer = false
    },
    handleDelete ({ row }) {
      this.$confirm(this.$t('Manager.deleteUser'), this.$t('Manager.prompt'), {
        confirmButtonText: this.$t('Manager.confirm'),
        cancelButtonText: this.$t('Manager.cancel'),
        type: 'warning'
      }).then(async () => {
        const _response = await Delete(row.Id)
        if (_response.Result) {
          this.$notify({
            title: this.$t('Manager.success'),
            message: this.$t('Manager.succDeleted'),
            type: 'success',
            duration: 2000
          })
          this.getLoadData()
        }
      })
    },
    async getPeopleList (MANAGER_ID) {
      const res = await LoadUserOrganize({
        MANAGER_ID,
        Page: 1,
        Limit: 100000
      })
      const data = res.Result || []
      this.form.ORGANIZE_IDS = []
      data.map((item) => {
        if (item.STATUS === 'Y') {
          this.form.ORGANIZE_IDS.push(item.ORGANIZE_ID)
        }
      })
      this.form.ORGANIZE_IDS = [...new Set(this.form.ORGANIZE_IDS)]
      this.form.ORGANIZE_IDS = this.form.ORGANIZE_IDS.map((item) =>
        this.reverseGetTree(this.planData, item)
      )
      this.isFhow = false
      this.$nextTick(() => {
        this.isFhow = true
      })
    },
    // 递归
    reverseGetTree (data, id) {
      let arr = []
      data.map((item) => {
        if (item.ID === id) {
          if (item.PARENT_ORGANIZE_ID) {
            arr.push(...this.reverseGetTree(data, item.PARENT_ORGANIZE_ID))
          }
          arr.push(item.ID)
        }
      })
      return arr
    },
    // 重置密码
    resetPwd () {
      this.$confirm(this.$t('Manager._5'), this.$t('Manager._6'), {
        confirmButtonText: this.$t('Manager.confirm'),
        cancelButtonText: this.$t('Manager.cancel'),
        type: 'warning'
      }).then(async () => {
        const res = await ResetPassword(this.form)
        if (res.Result) {
          this.$notify({
            title: this.$t('Manager.success'),
            message: this.$t('Manager._7'),
            type: 'success'
          })
        }
      })
    }
  },
  created () {
    this.getIndex()
  }
  // watch: {
  //   form: {
  //     handler () {
  //       this.$forceUpdate()
  //     },
  //     deep: true
  //   }
  // }
}
</script>

<style lang="scss" scoped>
.drawer-content {
  padding: 0 20px;
  position: relative;
  height: calc(100vh - 46px - 32px);
  box-sizing: border-box;
  .el-form {
    height: 100%;
  }
  .btn-bottom {
    position: absolute;
    bottom: 20px;
    width: calc(100% - 40px);
    div {
      border-top: 1px solid rgb(236, 241, 246);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}
</style>
