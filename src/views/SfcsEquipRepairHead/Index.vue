<template>
  <d2-container>
    <!-- 头部 -->
    <template slot="header">
      <custom-container-header :isExport="false"
                               :isExportTpl="false"
                               :isImport="false">
        <el-select v-model="formData.CATEGORY"
                   clearable
                   style="width:190px"
                   :placeholder="$t('serh.p_sec')">
          <el-option v-for="item in CategoryList"
                     :key="item.LOOKUP_CODE"
                     :label="item.CHINESE"
                     :value="item.LOOKUP_CODE" />
        </el-select>&nbsp;
        <el-select v-model="formData.STATION_ID"
                   clearable
                   style="width:180px"
                   :placeholder="$t('serh.p_sat')">
          <el-option v-for="item in LinesList"
                     :key="item.ID"
                     :label="item.LINE_NAME"
                     :value="item.ID" />
        </el-select>&nbsp;
        <el-select v-model="formData.STATUS"
                   style="width:200px"
                   clearable
                   :placeholder="$t('serh.a_ds')">
          <el-option v-for="item in EquipStatusList"
                     :key="item.Value"
                     :label="item.Text"
                     :value="item.Value" />
        </el-select>&nbsp;
        <el-input v-model="formData.NAME"
                  :placeholder="$t('serh.p_etdn')"
                  clearable
                  style="width:200px"
                  @keyup.enter.native="doFilter" />&nbsp;
        <el-button type="success"
                   icon="el-icon-search"
                   @click.prevent="doFilter">{{$t('publics.btn.search')}}</el-button>
      </custom-container-header>
    </template>
    <!-- 上表格 -->
    <div class="SfcsEquipRepairHead-MainTable">
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
                 @cell-click="openDetails">
        <vxe-table-column width="80"
                          :title="$t('serh.select')">
          <template slot-scope="scope">
            <el-radio-group v-model="radio">
              <el-radio class="custom-radio"
                        :label="scope.$rowIndex" />
            </el-radio-group>
          </template>
        </vxe-table-column>
        <vxe-table-column field="NAME"
                          :title="$t('serh.dn')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column field="STATUS"
                          :title="$t('serh.ds')">
          <template slot-scope="scope">
            <span v-if="scope.row.STATUS == 0"
                  class="normal">{{$t('serh.nm')}}</span>
            <span v-if="scope.row.STATUS == 1"
                  class="Idle">{{$t('serh.Idle')}}</span>
            <span v-if="scope.row.STATUS == 2"
                  class="repaired">{{$t('serh.tbr')}}</span>
            <span v-if="scope.row.STATUS == 3"
                  class="maintenance">{{$t('serh.im')}}</span>
            <span v-if="scope.row.STATUS == 4"
                  class="scrapped">{{$t('serh.scrapped')}}</span>
          </template>
        </vxe-table-column>
        <vxe-table-column field="CATEGORY_NAME"
                          :title="$t('serh.ec')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column field="MODEL"
                          :title="$t('serh.em')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column field="STATION_NAME"
                          :title="$t('serh.sl')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column field="ENABLE"
                          :title="$t('serh.operate')">
          <template slot-scope="scope">
            <span v-if="scope.row.STATUS == 0"
                  class="scrapped"
                  @click="sa(scope.row)">{{$t('serh.nmr')}}</span>
            <span v-if="scope.row.STATUS == 1"
                  class="scrapped">{{$t('serh.nmr')}}</span>
            <span v-if="scope.row.STATUS == 2">
              <el-button type="success"
                         icon="el-icon-edit"
                         @click="service_but(scope.row)">{{$t('serh.me')}}</el-button>
            </span>
            <span v-if="scope.row.STATUS == 3">
              <el-button type="success"
                         icon="el-icon-edit"
                         @click="service_but(scope.row)">{{$t('serh.me')}}</el-button>
            </span>
            <span v-if="scope.row.STATUS == 4"
                  class="scrapped">{{$t('serh.nmr')}}</span>
          </template>
        </vxe-table-column>
      </vxe-table>
    </div>
    <!-- 第一个分页 -->
    <div class="pagination">
      <el-pagination :current-page="formData.Page"
                     :page-size="formData.Limit"
                     :page-sizes="[15, 25, 35, 45]"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="totalPage"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange" />
    </div>
    <!-- 下表格 -->
    <el-row>
      <!-- 设备维修记录列表 -->
      <el-col :span="14">
        <div>
          <span style="display: block;color: #606266;font-size: 14px;margin: 5px 0;">{{ $t('serh.emrl') }}</span>
        </div>
        <div class="col-teble">
          <vxe-table ref="__xTable"
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
                     :data="tableData"
                     :mouse-config="{selected: true}"
                     :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
                     @cell-click="selected_but">
            <vxe-table-column min-width="80"
                              :title="$t('serh.select')">
              <template slot-scope="scope">
                <el-radio class="custom-radio"
                          v-model="radioVal"
                          :label="scope.$rowIndex" />&nbsp;
              </template>
            </vxe-table-column>
            <vxe-table-column min-width="180"
                              field="REPAIR_CODE"
                              :title="$t('serh.rn')"
                              :edit-render="{name: '$input', props: {readonly: true}}" />
            <vxe-table-column min-width="180"
                              field="REPAIR_USER"
                              :title="$t('serh.ms')"
                              :edit-render="{name: '$input', props: {readonly: true}}" />
            <vxe-table-column min-width="200"
                              field="BEGINTIME"
                              :title="$t('serh.mst')"
                              :edit-render="{name: '$input', props: {readonly: true}}" />
            <vxe-table-column min-width="200"
                              field="BEGINTIME"
                              :title="$t('serh.mc')"
                              :edit-render="{name: '$input', props: {readonly: true}}" />
            <vxe-table-column min-width="180"
                              field="BEGINTIME"
                              :title="$t('serh.mr')">
              <template slot-scope="scope">
                <span v-if="scope.row.REPAIR_STATUS == 0"
                      class="normal">{{$t('serh.nm')}}</span>
                <span v-if="scope.row.REPAIR_STATUS == 1"
                      class="Idle">{{$t('serh.Idle')}}</span>
                <span v-if="scope.row.REPAIR_STATUS == 2"
                      class="repaired">{{$t('serh.tbr')}}</span>
                <span v-if="scope.row.REPAIR_STATUS == 3"
                      class="maintenance">{{$t('serh.im')}}</span>
                <span v-if="scope.row.REPAIR_STATUS == 4"
                      class="scrapped">{{$t('serh.s')}}</span>
              </template>
            </vxe-table-column>
          </vxe-table>
        </div>
      </el-col>
      <!-- 维修配件列表 -->
      <el-col :span="10">
        <div>
          <span style="display: block;color: #606266;font-size: 14px;margin: 5px 0;">{{ $t('serh.rpl') }}</span>
        </div>
        <div class="col-teble">
          <vxe-table ref="_xTable"
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
                     :data="tableDetail"
                     :mouse-config="{selected: true}"
                     :edit-config="{trigger: 'click', mode: 'row', showStatus: true}">
            <vxe-table-column field="COMPONENT_NAME"
                              :title="$t('serh.an')"
                              :edit-render="{name: '$input', props: {readonly: true}}" />
            <vxe-table-column field="COMPONENT_MODEL"
                              :title="$t('serh.as')"
                              :edit-render="{name: '$input', props: {readonly: true}}" />
          </vxe-table>
        </div>
      </el-col>
    </el-row>
    <!-- 底部分页 -->
    <div class="pagination">
      <el-pagination :current-page="day_listQuery.Page"
                     :page-size="day_listQuery.Limit"
                     :page-sizes="[15, 25, 35, 45]"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="day_total"
                     @size-change="_handleSizeChange"
                     @current-change="_handleCurrentChange" />
    </div>
    <!-- 编辑框 -->
    <el-dialog :close-on-click-modal="false"
               v-dialogDrag
               :title="$t('serh.edit')"
               :visible.sync="dialogTableVisible">
      <el-form ref="form"
               :model="form"
               label-width="80px">
        <el-form-item :label="$t('serh.mr')">
          <el-radio-group v-model="form.REPAIR_STATUS">
            <el-radio :label="0">{{$t('serh.nm')}}</el-radio>
            <el-radio :label="4">{{$t('serh.scrapped')}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('serh.mc')">
          <el-input v-model="form.REPAIR_CONTENT"
                    type="textarea"
                    :placeholder="$t('serh.p_erc')" />
        </el-form-item>
        <el-form-item :label="$t('serh.rp')"
                      prop="USER_AGE">
          <el-row :gutter="24"
                  style="margin-left:0;margin-right:0">
            <el-col :span="3"
                    style="padding-left: 0px;padding-right: 0px;">
              <span>{{$t('serh.an')}}</span>
            </el-col>
            <el-col :span="7"
                    style="padding-left: 0px;padding-right: 0px;">
              <el-input v-model="add.accessoryName"
                        :placeholder="$t('serh.an')" />
            </el-col>
            <el-col :span="3"
                    style="padding-left: 10px;padding-right: 0px;">
              <span>{{$t('serh.as')}}</span>
            </el-col>
            <el-col :span="7"
                    style="padding-left: 0px;padding-right: 0px;">
              <el-input v-model="add.accessoryNorm"
                        :placeholder="$t('serh.as')" />
            </el-col>
            <el-col :span="4"
                    style="padding-left: 10px;padding-right: 0px;">
              <el-button style="width:100%"
                         @click.prevent="Add_but">{{$t('publics.btn.add')}}</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <vxe-table ref="___xTable"
                 border
                 resizable
                 size="medium"
                 align="center"
                 highlight-hover-row
                 highlight-current-row
                 show-overflow
                 auto-resize
                 keep-source
                 stripe
                 :loading="loading"
                 :data="DetailList"
                 :mouse-config="{selected: true}"
                 :edit-config="{trigger: 'click', mode: 'row', showStatus: true}">
        <vxe-table-column field="COMPONENT_NAME"
                          :title="$t('serh.an')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column field="COMPONENT_MODEL"
                          :title="$t('serh.as')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column field="ENABLE"
                          :title="$t('serh.operate')">
          <template slot-scope="scope">
            <el-button type="dangerous"
                       icon="el-icon-edit"
                       @click="remove_but(scope.$index,scope.row)">{{$t('publics.btn.delete')}}</el-button>
          </template>
        </vxe-table-column>
      </vxe-table>
      <div style="text-align: center;margin: 0px 0;padding: 15px 0;">
        <el-button type="primary"
                   @click="define_but">{{$t('publics.btn.makeSure')}}</el-button>
        <el-button @click="reset_but">{{$t('publics.btn.reset')}}</el-button>
      </div>
    </el-dialog>
  </d2-container>
</template>

<script>
import customContainerHeader from '@/components/custom-container-header'
import {
  Index,
  GetEquipmentList,
  LoadData,
  GetEquipRepairDetail,
  AddOrModify,
  AddOrModifySave
} from '@/api/SfcsEquipRepairHead'
import { mapGetters } from 'vuex'
export default {
  name: 'SfcsEquipRepairHead',
  components: {
    customContainerHeader
  },
  computed: {
    ...mapGetters(['userinfo'])
  },
  data () {
    return {
      formData: {
        Page: 1, // 当前页
        Limit: 15, // 分页大小
        Key: '',
        STATUS: '',
        CATEGORY: '',
        STATION_ID: ''
      },
      CategoryList: [],
      LinesList: [],
      EquipStatusList: [],
      loading: false,
      mainTable: [],
      radio: '',
      day_listQuery: {
        Page: 1, // 当前页
        Limit: 15, // 分页大小
        EQUIP_ID: '',
        Key: ''
      },
      radioVal: '',
      day_total: 0,
      tableData: [],
      tableDetail: [],
      totalPage: 0,
      dialogTableVisible: false,
      form: {
        ID: '',
        REPAIR_STATUS: 0, // 状态
        // REPAIR_CODE: '', // 维修代码
        EQUIP_ID: 0,
        REPAIR_USER: '', // 维修用户
        REPAIR_CONTENT: '', // 维修内容
        DetailList: []
      },
      DetailList: [],
      add: {
        accessoryName: '',
        accessoryNorm: ''
      },
      serviceVal: {
        ID: '',
        UserName: ''
      }
    }
  },
  created () {
    this.geIndex()
    this.getList()
    this.serviceVal.UserName = this.userinfo.USER_NAME
    this.form.REPAIR_USER = this.userinfo.USER_NAME
  },
  methods: {
    async geIndex () {
      this.listLoading = true
      const res = await Index()
      this.listLoading = false
      this.CategoryList = res.Result.CategoryList
        ? res.Result.CategoryList
        : []
      this.LinesList = res.Result.LinesList ? res.Result.LinesList : []
      this.EquipStatusList = res.Result.EquipStatusList
        ? res.Result.EquipStatusList
        : []
    },
    // 获取列表
    async getList () {
      this.listLoading = true
      const res = await GetEquipmentList(this.formData)
      this.listLoading = false
      this.mainTable = res.Result ? JSON.parse(res.Result) : []
      this.totalPage = res.TotalCount ? res.TotalCount : 0
      console.log(JSON.parse(res.Result), 'JSON.parse(res.Result)')
    },
    // 根据设备ID查询对应的维修记录
    async getLoadData () {
      const res = await LoadData(this.day_listQuery)
      this.tableData = res.Result ? JSON.parse(res.Result) : []
      this.day_total = res.TotalCount
    },
    // 点击获取表格一行数据
    openDetails (row, column, event, cell) {
      this.radioVal = ''
      this.tableDetail = []
      this.radio = this.mainTable.indexOf(row.row)
      this.day_listQuery.EQUIP_ID = row.row.ID
      this.getLoadData()
    },
    // 点击获取表格一行数据
    selected_but (row, column, event) {
      this.radioVal = this.tableData.indexOf(row.row)
      this.RepairlID = row.row.ID
      this.GetEquipRepairData(row.row.ID)
    },
    // 获取维修记录获取维修配件信息
    async GetEquipRepairData (val) {
      const res = await GetEquipRepairDetail(val)
      const data = JSON.parse(res.Result)
      this.tableDetail = data.data
    },
    // 搜索
    doFilter () {
      this.formData.Page = 1
      this.getList()
    },
    handleSizeChange (val) {
      this.formData.Limit = val
      this.getList()
    },
    handleCurrentChange (val) {
      this.formData.Page = val
      this.tableData = []
      this.tableDetail = []
      this.radio = ''
      this.radioVal = ''
      this.getList()
    },
    _handleSizeChange (val) {
      this.day_listQuery.Limit = val
      this.getList()
    },
    _handleCurrentChange (val) {
      this.day_listQuery.Page = val
      this.getList()
    },
    // 获取维修
    async service_but (row) {
      console.log(row)
      this.dialogTableVisible = true
      this.serviceVal.ID = row.ID
      this.form.EQUIP_ID = row.ID
      const res = await AddOrModify(this.serviceVal)
      this.form.ID = res.Result
    },
    // 添加
    Add_but () {
      if (this.add.accessoryName === '') {
        this.$message({
          showClose: true,
          message: this.$t('serh.p_etan'),
          type: 'warning'
        })
        return
      }
      if (this.add.accessoryNorm === '') {
        this.$message({
          showClose: true,
          message: this.$t('serh.p_eas'),
          type: 'warning'
        })
        return
      }
      let list = {
        ID: 0,
        EQUIP_REPAIR_HEAD_ID: this.form.ID,
        COMPONENT_NAME: this.add.accessoryName,
        COMPONENT_MODEL: this.add.accessoryNorm
      }
      this.DetailList.unshift(list)
      this.form.DetailList = this.DetailList
    },
    // 删除
    remove_but (index, row) {
      this.DetailList.splice(index, 1)
      this.form.DetailList = this.DetailList
    },
    // 重置
    reset_but () {
      this.form.REPAIR_CONTENT = ''
      this.add.accessoryName = ''
      this.add.accessoryNorm = ''
    },
    // 确认提交
    define_but () {
      AddOrModifySave(this.form).then(res => {
        if (res.ErrorInfo.Status) {
          this.$message({
            type: 'error',
            message: res.ErrorInfo.Message
          })
        } else if (res.Result) {
          this.getList()
          this.$notify({
            title: this.$t('IpqaConfig.AddOrModify.success'),
            message: this.$t('serh.subsu'),
            type: 'success',
            duration: 2000
          })
          this.dialogTableVisible = false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.SfcsEquipRepairHead-MainTable {
  height: calc(100vh - 500px);
}
.col-teble {
  height: calc(100vh - 515px);
}
.pagination {
  margin: 5px 0;
}
.normal {
  font-weight: 800;
  color: green;
}
.Idle {
  font-weight: 800;
  color: blue;
}
.repaired {
  font-weight: 800;
  color: orange;
}
.maintenance {
  font-weight: 800;
  color: #0dcdf8;
}
.scrapped {
  font-weight: 800;
  color: red;
}
</style>

<style>
.custom-radio .el-radio__label {
  display: none;
}
</style>
