<template>
  <d2-container>
    <template slot="header">
      <custom-container-header>
        <el-input
          v-model="formData.Key"
          clearable
          style="width: 200px"
          class="filter-item"
          :placeholder="$t('ManagerRole.askRoleName')"
          @keyup.enter.native="handleFilter"
        />&nbsp;
        <el-button
          class="filter-item"
          type="primary"
          icon="el-icon-search"
          @click="handleFilter"
          >{{ $t("ManagerRole.search") }}</el-button
        >
        <el-button type="success" icon="el-icon-plus" @click="handleAddRole">
          {{ $t("ManagerRole.addRole") }}
        </el-button>
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
        <vxe-table-column
          field="Role_Name"
          :title="$t('ManagerRole.RoleName')"
        />
        <vxe-table-column :title="$t('ManagerRole.Roletype')">
          <template slot-scope="scope">
            <span v-if="scope.row.Role_Type == 1">
              {{ $t("ManagerRole.ultra") }}
            </span>
            <span v-else>{{ $t("ManagerRole.system") }}</span>
          </template>
        </vxe-table-column>
        <vxe-table-column :title="$t('ManagerRole.systemDefault')">
          <template slot-scope="scope">
            <span v-if="scope.row.Is_System == 'Y'">
              {{ $t("ManagerRole.yes") }}
            </span>
            <span v-else>{{ $t("ManagerRole.no") }}</span>
          </template>
        </vxe-table-column>
        <vxe-table-column
          field="Remark"
          :formatter="handleFormmateRemark"
          :title="$t('ManagerRole.remark')"
        />
        <vxe-table-column field="Add_Time" :title="$t('ManagerRole.addTime')" />
        <vxe-table-column
          :title="$t('as_src.tb_og')"
          width="180"
          align="center"
          fixed="right"
        >
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="handleEdit(scope)">
              {{ $t("ManagerRole.editPermission") }}
            </el-button>
            <el-button
              type="danger"
              size="small"
              @click="handleDelete(scope)"
              >{{ $t("ManagerRole.delete") }}</el-button
            >
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

    <el-drawer
      :title="titleText"
      :visible.sync="drawer"
      direction="rtl"
      size="55%"
    >
      <div class="drawer-content">
        <el-form
          ref="role"
          :show-message="false"
          :model="form"
          :rules="rules"
          label-width="120px"
          label-position="right"
        >
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item
                :label="$t('ManagerRole.RoleName')"
                prop="Role_Name"
              >
                <el-input
                  v-model="form.Role_Name"
                  :placeholder="$t('ManagerRole.askRoleName')"
                />
              </el-form-item>
              <el-form-item
                :label="$t('ManagerRole.Roletype')"
                prop="Role_Type"
              >
                <el-select
                  v-model="form.Role_Type"
                  :placeholder="$t('ManagerRole.askRoletype')"
                  style="width: 100%"
                >
                  <el-option
                    key="1"
                    :label="$t('ManagerRole.ultra')"
                    :value="1"
                  />
                  <el-option
                    key="2"
                    :label="$t('ManagerRole.system')"
                    :value="2"
                  />
                </el-select>
              </el-form-item>
              <el-form-item
                :label="$t('ManagerRole.systemDefault')"
                prop="Is_System"
              >
                <el-radio v-model="form.Is_System" label="N">
                  {{ $t("ManagerRole.no") }}
                </el-radio>
                <el-radio v-model="form.Is_System" label="Y">
                  {{ $t("ManagerRole.yes") }}
                </el-radio>
              </el-form-item>
              <el-form-item :label="$t('ManagerRole.remark')">
                <el-input
                  v-model="form.Remark"
                  :autosize="{ minRows: 3, maxRows: 5 }"
                  resize="none"
                  type="textarea"
                  :placeholder="$t('ManagerRole.skRemark')"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-tabs v-model="activeName">
                <el-tab-pane :label="$t('ManagerRole._1')" name="menu">
                  <el-input
                    v-model="filterText"
                    :placeholder="$t('ManagerRole.Enkeyfilter')"
                  />
                  <el-tree
                    ref="tree"
                    show-checkbox
                    node-key="Id"
                    :default-checked-keys="form.Menu_Ids"
                    :filter-node-method="filterNode"
                    :data="routesData"
                    :props="defaultProps"
                    :default-expand-all="false"
                    :expand-on-click-node="false"
                    :check-strictly="checkStrictly"
                    highlight-current
                    style="height: 70vh; overflow-x: hidden"
                  />
                </el-tab-pane>
                <el-tab-pane :label="$t('ManagerRole._2')" name="pdamenu">
                  <div class="pdamenu">
                    <el-checkbox
                      v-model="checkAll"
                      @change="handleCheckAllChange"
                      >{{ $t("ManagerRole._3") }}</el-checkbox
                    >
                    <div style="margin: 15px 0"></div>
                    <el-checkbox-group v-model="checkedCities">
                      <el-checkbox
                        v-for="(city, index) in cities"
                        :label="city.MST_ID"
                        :key="index"
                        style="display: block"
                        >{{ city.MENU_NAME }}</el-checkbox
                      >
                    </el-checkbox-group>
                  </div>
                  <!-- <el-pagination
                    :current-page="padform.Page"
                    :page-size="padform.Limit"
                    :page-sizes="[15, 25, 35, 45]"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="padtotal"
                    @size-change="handleSizePda"
                    @current-change="handleCurrentPda"
                  />-->
                </el-tab-pane>
                <el-tab-pane :label="'平板端菜单'" name="padmenu">
                  <!-- <el-checkbox v-model="checkAllPAD" @change="handleCheckAllChangePAD">
                    {{ $t("ManagerRole._3") }}
                  </el-checkbox>
                  <div style="margin: 15px 0"></div> -->
                  <el-tree
                    ref="treePAD"
                    show-checkbox
                    node-key="ID"
                    :default-checked-keys="PADMENUSIDS"
                    :filter-node-method="filterNodePAD"
                    :data="PADMainTable"
                    :props="defaultPropsPAD"
                    :default-expand-all="false"
                    :expand-on-click-node="false"
                    :check-strictly="checkStrictly"
                    highlight-current
                    style="height: 70vh; overflow-x: hidden"
                  />
                </el-tab-pane>
              </el-tabs>
            </el-col>
          </el-row>
          <div class="btn-bottom">
            <div style="padding: 20px 0">
              <el-button
                type="success"
                icon="el-icon-check"
                @click="onSubmit"
                style="width: 45%"
                >{{ $t("publics.btn.save") }}</el-button
              >
              <el-button
                type="danger"
                icon="el-icon-close"
                style="width: 45%"
                @click="cancel"
                >{{ $t("publics.btn.cancel") }}</el-button
              >
            </div>
          </div>
        </el-form>
      </div>
    </el-drawer>
  </d2-container>
</template>

<script>
import pagination from '@/views/mixin/page'
import customContainerHeader from '@/components/custom-container-header'
import {
  Index,
  getRoutes,
  AddOrModify,
  Delete,
  saveModifySave,
  LoadPdaMenusByRole,
  SaveData2Role
} from '@/api/sys.role'
import { cloneDeep } from 'lodash'
import {
  LoadData as _LoadData,
  LoadDataByRoleId as _LoadDataByRoleId,
  SavePadRoleData as _SavePadRoleData
} from '@/api/MesPadClientMenus'
export default {
  name: 'ManagerRole',
  mixins: [pagination],
  components: {
    customContainerHeader
  },
  data () {
    return {
      loading: false,
      titleText: '',
      drawer: false,
      form: {},
      mainTable: [],
      filterText: '',
      rules: {
        Role_Name: [
          {
            trigger: 'blur',
            required: true,
            message: this.$t('ManagerRole.askRoleName')
          }
        ],
        Role_Type: [
          {
            trigger: 'blur',
            required: true,
            message: this.$t('ManagerRole.askRoletype')
          }
        ]
      },
      defaultProps: {
        // 子级和显示的文字
        children: 'children',
        label: 'Menu_Name'
      },
      defaultPropsPAD: {
        children: 'children',
        label: 'MENU_NAME'
      },
      checkStrictly: false,
      routesData: [],
      activeName: 'menu',
      padform: {
        Page: 1,
        Limit: 1000000
      },
      padtotal: 0,
      checkAll: false,
      checkedCities: [],
      cities: [],
      citiesIds: [],
      PADMainTable: [],
      PADMENUSIDS: [],
      choosenPADMenuIDs: []
    }
  },
  methods: {
    async getIndex () {
      const res = await Index()
      if (res.Result) {
        this.getLoadData()
        this.loadAllPADMenuList()
      }
    },
    handleFilter () {
      this.formData.Page = 1
      this.getLoadData()
    },
    handleAddRole () {
      this.getOrModify()
      this.checkAll = false
      this.checkedCities = []
      this.form = {}
      this.activeName = 'menu'
      this.drawer = true
      this.checkStrictly = false
      this.titleText = this.$t('ManagerRole.addRole')
    },
    // 获取角色列表
    async getLoadData () {
      this.loading = true
      const res = await getRoutes(this.formData)
      console.log(JSON.parse(res.Result))
      this.loading = false
      if (res.Result) {
        this.mainTable = res.Result ? JSON.parse(res.Result) : []
        this.totalPage = res.TotalCount || 0
      } else {
        this.mainTable = []
        this.totalPage = 0
      }
    },
    // 获取路由
    async getOrModify (id) {
      if (!id) {
        id = 0
      }
      const res = await AddOrModify(id)
      if (res.Result) {
        this.routesData = res.Result.RoleTreeList || []
        const str = res.Result.MenuIds || ''
        // eslint-disable-next-line no-inner-declarations
        function strToIntArr (str) {
          if (str) {
            var strArr = str.split(',')
            var dataIntArr = [] // 保存转换后的整型字符串
            strArr.forEach(function (data) {
              dataIntArr.push(+data)
            })
            return dataIntArr
          }
        }
        this.form.Menu_Ids = strToIntArr(str)
        this.$nextTick(() => {
          this.checkStrictly = false
        })
      } else {
        this.routesData = []
        this.form.Menu_Ids = []
      }
    },
    // 菜单管理搜索
    filterNode (value, data) {
      if (!value) return true
      return data.Menu_Name.indexOf(value) !== -1
    },
    filterNodePAD (value, data) {
      if (!value) return true
      return data.MENU_NAME.indexOf(value) !== -1
    },
    cancel () {
      this.form = {}
      this.drawer = false
      this.routesData = []
    },
    handleEdit (scope) {
      this.form = scope.row
      this.form.Remark = this.form.Remark === 'null' ? '' : this.form.Remark
      this.drawer = true
      this.activeName = 'menu'
      this.checkAll = false
      this.checkedCities = []
      this.titleText = this.$t('ManagerRole.editRole')
      this.getOrModify(this.form.Id || 0)
      this.getLoadPdaMenusByRole(this.form.Id || 0)
      this.getLoadPadDataByRoleId(this.form.Id || 0)
      this.checkStrictly = true
    },
    onSubmit () {
      const isEdit = this.titleText === this.$t('ManagerRole.editRole')
      const form = cloneDeep(this.form)
      let checkedKeys = this.$refs.tree.getCheckedKeys()
      let halfCheckedKeys = this.$refs.tree.getHalfCheckedKeys()
      form.Menu_Ids = checkedKeys.concat(halfCheckedKeys)
      this.$refs.role.validate(async (valid) => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })

          const response = await saveModifySave(form).catch(() => {
            loading.close()
          })
          if (response.Result) {
            // TODO 保存PDA菜单
            let MenusList = []
            MenusList = this.cities.map((item) => {
              if (this.checkedCities.indexOf(item.MST_ID) !== -1) {
                item.IsAuth = 1
              } else {
                item.IsAuth = 0
              }
              return item
            })
            let _res = {}
            if (MenusList.length) {
              // 妈的，傻逼设计
              const RoleName = form.Role_Name || ''
              const _result = await getRoutes({
                Page: 1,
                Limit: 10,
                Key: RoleName
              })
              const _list = _result.Result ? JSON.parse(_result.Result) : []
              const formId = _list[0]?.Id || 0
              const _form = {
                ROLE_ID: formId,
                MenusList
              }
              _res = await SaveData2Role(_form).catch(() => {
                loading.close()
              })
            } else {
              _res.Result = true
            }

            // TODO 保存平板端菜单权限
            const padMenus = this.$refs.treePAD.getCheckedKeys()
            const padHalfMenus = this.$refs.treePAD.getHalfCheckedKeys()
            const submitApiForm = padMenus.concat(padHalfMenus)
            if (submitApiForm && submitApiForm.length) {
              // eslint-disable-next-line camelcase
              const x_RoleName = form.Role_Name || ''
              // eslint-disable-next-line camelcase
              const x_result = await getRoutes({
                Page: 1,
                Limit: 10,
                Key: x_RoleName
              })
              // eslint-disable-next-line camelcase
              const x_list = x_result.Result ? JSON.parse(x_result.Result) : []
              // eslint-disable-next-line camelcase
              const x_formId = x_list[0]?.Id || 0
              // eslint-disable-next-line camelcase
              const x_form = {
                ROLE_ID: x_formId,
                PAD_ID: submitApiForm
              }
              await _SavePadRoleData(x_form)
            }

            loading.close()
            if (_res.Result) {
              if (isEdit) {
                this.$notify({
                  title: this.$t('ManagerRole.success'),
                  message: this.$t('ManagerRole.EditedSuccess'),
                  type: 'success',
                  duration: 2000
                })
              } else {
                this.$notify({
                  title: this.$t('ManagerRole.success'),
                  message: this.$t('ManagerRole.addsuccess'),
                  type: 'success',
                  duration: 2000
                })
              }
              this.formData.Page = 1
              this.getLoadData()
              this.drawer = false
            }
          } else {
            loading.close()
          }
        }
      })
    },
    // 删除
    handleDelete ({ $index, row }) {
      this.$confirm(
        this.$t('ManagerRole.DeleteRole'),
        this.$t('ManagerRole.prompt'),
        {
          confirmButtonText: this.$t('ManagerRole.confirm'),
          cancelButtonText: this.$t('ManagerRole.cancel'),
          type: 'warning'
        }
      ).then(async () => {
        const response = await Delete(row.Id)
        if (response.Result) {
          this.$notify({
            title: this.$t('ManagerRole.success'),
            message: this.$t('ManagerRole.sudeleted'),
            type: 'success',
            duration: 2000
          })
          this.formData.Page = 1
          this.getLoadData()
        }
      })
    },
    handleFormmateRemark ({ cellValue }) {
      return cellValue !== 'null' && cellValue ? cellValue : ''
    },
    // 获取pda选中的角色
    async getLoadPdaMenusByRole (id) {
      const res = await LoadPdaMenusByRole(id)
      this.cities = res.Result || []
      this.citiesIds = []
      this.checkedCities = []
      this.cities.map((item) => {
        this.citiesIds.push(item.MST_ID)
        if (item.IsAuth === 1) {
          this.checkedCities.push(item.MST_ID)
        }
      })
    },
    // 获取平板选中的角色
    async getLoadPadDataByRoleId (id) {
      const res = await _LoadDataByRoleId(id)
      this.choosenPADMenuIDs = res.Result || []
      this.$refs.treePAD.setCheckedKeys(this.choosenPADMenuIDs.map(i => i.ID))
    },
    handleCheckAllChange (val) {
      this.checkedCities = val ? this.citiesIds : []
      this.isIndeterminate = false
    },
    // 获取全部平板端菜单数据
    async loadAllPADMenuList () {
      const res = await _LoadData({
        Page: 1,
        Limit: 100000
      })
      if (res.Result) {
        const data = res.Result || []
        this.PADMainTable = this.getTree(data)
      } else {
        this.PADMainTable = []
      }
    },
    getTree (arr, id = 0, level = 0) {
      let x = []
      for (let i = 0; i < arr.length; i++) {
        let item = cloneDeep(arr[i])
        item.children = null
        item.level = level
        if (item.P_ID === id) {
          item.children = this.getTree(arr, item.ID, level + 1)
          x.push(item)
        }
      }
      return x && x.length ? x : null
    }
  },
  created () {
    this.getIndex()
  },
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val)
    },
    checkedCities (val) {
      if (val.length === this.cities.length) {
        this.checkAll = true
      } else {
        this.checkAll = false
      }
    }
  }
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
  .pdamenu {
    overflow: auto;
    height: calc(100vh - 60px - 21px - 40px - 74px - 53px);
  }
}
</style>
