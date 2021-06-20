<template>
  <d2-container class="SfcsEquipReport">
    <!-- 头部 -->
    <template slot="header">
      <custom-container-header :isExport="false"
                               :isExportTpl="false"
                               :isImport="false">
        <el-select v-model="formData.CATEGORY"
                   clearable
                   style="width:190px"
                   :placeholder="$t('ser.p_select')">
          <el-option v-for="item in CategoryList"
                     :key="item.LOOKUP_CODE"
                     :label="item.CHINESE"
                     :value="item.LOOKUP_CODE" />
        </el-select>&nbsp;
        <el-select v-model="formData.STATION_ID"
                   clearable
                   style="width:180px"
                   :placeholder="$t('ser.p_sat')">
          <el-option v-for="item in LinesList"
                     :key="item.ID"
                     :label="item.LINE_NAME"
                     :value="item.ID" />
        </el-select>&nbsp;
        <el-select v-model="formData.STATUS"
                   style="width:200px"
                   clearable
                   :placeholder="$t('ser.p_sds')">
          <el-option v-for="item in StatusList"
                     :key="item.Value"
                     :label="item.Text"
                     :value="item.Value" />
        </el-select>&nbsp;
        <el-input v-model="formData.NAME"
                  :placeholder="$t('ser.p_itpn')"
                  clearable
                  style="width:200px"
                  @keyup.enter.native="doFilter" />&nbsp;
        <el-button type="primary"
                   icon="el-icon-search"
                   @click.prevent="doFilter">{{$t('publics.btn.search')}}</el-button>
      </custom-container-header>
    </template>
    <!-- 表格 -->
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
                          :title="$t('ser.select')">
          <template slot-scope="scope">
            <el-radio-group v-model="radio">
              <el-radio class="custom-radio"
                        :label="scope.$rowIndex" />
            </el-radio-group>
          </template>
        </vxe-table-column>
        <vxe-table-column field="NAME"
                          :title="$t('ser.dn')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column field="STATUS"
                          :title="$t('ser.ds')">
          <template slot-scope="scope">
            <span v-if="scope.row.STATUS == 0"
                  style="font-weight:800;color:green">{{$t('ser.nm')}}</span>
            <span v-if="scope.row.STATUS == 1"
                  style="font-weight:800;color:blue">{{$t('ser.Idle')}}</span>
            <span v-if="scope.row.STATUS == 2"
                  style="font-weight:800;color:orange">{{$t('ser.tbr')}}</span>
            <span v-if="scope.row.STATUS == 3"
                  style="font-weight:800;color:#0dcdf8">{{$t('ser.im')}}</span>
            <span v-if="scope.row.STATUS == 4"
                  style="font-weight:800;color:red">{{$t('ser.scrapped')}}</span>
          </template>
        </vxe-table-column>
        <vxe-table-column field="CATEGORY_NAME"
                          :title="$t('ser.ec')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column field="STATION_NAME"
                          :title="$t('ser.sl')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column field="USER_PART_NAME"
                          :title="$t('ser.ud')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column field="ENABLE"
                          :title="$t('ser.Sort')">
          <template slot-scope="scope">
            <span v-if="scope.row.ENABLE == 'Y'"
                  style="font-weight:800;color:green">{{$t('ser.yes')}}</span>
            <span v-else
                  style="font-weight:800;color:red">{{$t('ser.no')}}</span>
          </template>
        </vxe-table-column>
      </vxe-table>
    </div>
    <!-- 分页 -->
    <div class="pagination">
      <el-pagination :current-page="formData.Page"
                     :page-size="formData.Limit"
                     :page-sizes="[15, 25, 35, 45]"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="totalPage"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange" />
    </div>
    <!-- 底部 -->
    <el-tabs v-model="activeName"
             @tab-click="handleClick">
      <!-- 基本信息 -->
      <el-tab-pane name="first"
                   :label="$t('ser.bi')">
        <div class="col-teble">
          <el-table stripe
                    :data="basic"
                    width="100%"
                    height="100%"
                    highlight-current-row
                    :show-header="false">
            <el-table-column label
                             width="400">
              <template slot-scope="scope">
                <div>{{$t('ser.n')}}：{{ scope.row.NAME }}</div>
                <div>{{$t('ser.ac')}}：{{ scope.row.PROPERTY_NO }}</div>
                <div>{{$t('ser.em')}}：{{ scope.row.MODEL }}</div>
                <div>{{$t('ser.sl')}}：{{ scope.row.STATION_NAME }}</div>
                <div>{{$t('ser.Producer')}}：{{ scope.row.VENDOR }}</div>
                <div>{{$t('ser.ul')}}：{{ scope.row.USER_AGE }}</div>
              </template>
            </el-table-column>
            <el-table-column label
                             width="400">
              <template slot-scope="scope">
                <div>{{$t('ser.ec')}}：{{ scope.row.NAME }}</div>
                <div>{{$t('ser.pn')}}：{{ scope.row.PROPERTY_NO }}</div>
                <div>{{$t('ser.ud')}}：{{ scope.row.MODEL }}</div>
                <div>{{$t('ser.vp')}}：{{ scope.row.STATION_NAME }}</div>
                <div>{{$t('ser.doe')}}：{{ scope.row.VENDOR }}</div>
                <div>{{$t('ser.st')}}：{{ scope.row.USER_AGE }}</div>
              </template>
            </el-table-column>
            <el-table-column align="center">
              <template slot-scope="scope">
                <img :src="img_url + scope.row.ImgUrl"
                     :alt="$t('spf._30')"
                     style="width: 100%;height: 250px"
                     v-if="scope.row.ImgUrl" />
                <span>{{$t('spf._31')}}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <!-- 保养 -->
      <el-tab-pane v-for="item in dataTab"
                   :key="item.val"
                   :name="item.name"
                   :label="item.label">
        <div class="col-teble">
          <vxe-table v-if="activeName === 'nippon' ||activeName === 'yuebao' || activeName === 'guarantee'"
                     ref="mTable"
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
                     :data="dataTable"
                     :mouse-config="{selected: true}"
                     :edit-config="{trigger: 'click', mode: 'row', showStatus: true}">
            <vxe-table-column min-width="150"
                              field="KEEP_CODE"
                              :title="$t('ser.cn')"
                              :edit-render="{name: '$input', props: {readonly: true}}" />
            <vxe-table-column min-width="140"
                              field="CATEGORY_Name"
                              :title="$t('ser.ec')"
                              :edit-render="{name: '$input', props: {readonly: true}}" />
            <vxe-table-column min-width="130"
                              field="EQUIP_Name"
                              :title="$t('ser.dn')"
                              :edit-render="{name: '$input', props: {readonly: true}}" />
            <vxe-table-column min-width="150"
                              field="KEEP_TYPE"
                              :title="$t('ser.mt')">
              <template slot-scope="scope">
                <span v-if="scope.row.KEEP_TYPE == 0">{{$t('ser.dm')}}</span>
                <span v-if="scope.row.KEEP_TYPE == 1">{{$t('ser.mm')}}</span>
                <span v-if="scope.row.KEEP_TYPE == 2">{{$t('ser.am')}}</span>
              </template>
            </vxe-table-column>
            <vxe-table-column min-width="140"
                              field="KEEP_TIME"
                              :title="$t('ser.ct')"
                              :edit-render="{name: '$input', props: {readonly: true}}" />
            <vxe-table-column min-width="140"
                              field="KEEP_USER"
                              :title="$t('ser.cb')"
                              :edit-render="{name: '$input', props: {readonly: true}}" />
            <vxe-table-column min-width="120"
                              field="KEEP_CHECK_STATUS"
                              :title="$t('ser.cs')">
              <template slot-scope="scope">
                <span v-if="scope.row.KEEP_CHECK_STATUS == 0">{{$t('ser.pending')}}</span>
                <span v-if="scope.row.KEEP_CHECK_STATUS == 1">{{$t('ser.audited')}}</span>
                <span v-if="scope.row.KEEP_CHECK_STATUS == 3">{{$t('ser.Refuse')}}</span>
                <span v-if="scope.row.KEEP_CHECK_STATUS == 4">{{$t('ser.xinadd')}}</span>
              </template>
            </vxe-table-column>
            <vxe-table-column min-width="130"
                              field="KEEP_CHECK_TIME"
                              :title="$t('ser.rt')"
                              :edit-render="{name: '$input', props: {readonly: true}}" />
            <vxe-table-column min-width="110"
                              field="KEEP_CHECK_TIME"
                              :title="$t('ser.rt')">
              <template slot-scope="scope">
                <el-button type="primary"
                           icon="el-icon-search"
                           size="mini"
                           @click.native="day_view_but(scope.row)">{{$t('ser.vd')}}</el-button>
              </template>
            </vxe-table-column>
          </vxe-table>
        </div>
        <div class="pagination">
          <el-pagination :current-page="dataVal.Page"
                         :page-size="dataVal.Limit"
                         :page-sizes="[15, 25, 35, 45]"
                         layout="total, sizes, prev, pager, next, jumper"
                         :total="dataTotal"
                         @size-change="day_handleSizeChange"
                         @current-change="day_handleCurrentChange" />
        </div>
      </el-tab-pane>
      <!-- 维修记录和维修配件 -->
      <el-tab-pane :label="$t('ser.mtr')"
                   name="service">
        <el-row>
          <!-- 设备维修记录列表 -->
          <el-col :span="14">
            <div>
              <span style="display: block;color: #606266;font-size: 14px;margin: 5px 0;">{{ $t('ser.emrl') }}</span>
            </div>
            <div class="col-teble">
              <vxe-table ref="serviceTable"
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
                         :data="keepList"
                         :mouse-config="{selected: true}"
                         :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
                         @cell-click="Keeprad_but">
                <vxe-table-column min-width="80"
                                  :title="$t('ser.select')">
                  <template slot-scope="scope">
                    <el-radio-group v-model="KeepRadio">
                      <el-radio class="custom-radio"
                                :label="scope.$rowIndex" />
                    </el-radio-group>
                  </template>
                </vxe-table-column>
                <vxe-table-column min-width="150"
                                  field="REPAIR_CODE"
                                  :title="$t('ser.rn')"
                                  :edit-render="{name: '$input', props: {readonly: true}}" />
                <vxe-table-column min-width="170"
                                  field="REPAIR_USER"
                                  :title="$t('ser.ms')"
                                  :edit-render="{name: '$input', props: {readonly: true}}" />
                <vxe-table-column min-width="200"
                                  field="BEGINTIME"
                                  :title="$t('ser.mst')"
                                  :edit-render="{name: '$input', props: {readonly: true}}" />
                <vxe-table-column min-width="170"
                                  field="ENDTIME"
                                  :title="$t('ser.eort')"
                                  :edit-render="{name: '$input', props: {readonly: true}}" />
                <vxe-table-column min-width="190"
                                  field="REPAIR_CONTENT"
                                  :title="$t('ser.mc')"
                                  :edit-render="{name: '$input', props: {readonly: true}}" />
                <vxe-table-column min-width="170"
                                  field="REPAIR_STATUS"
                                  :title="$t('ser.mr')">
                  <template slot-scope="scope">
                    <span v-if="scope.row.REPAIR_STATUS == 0"
                          style="font-weight:800;color:green">{{$t('ser.nm')}}</span>
                    <span v-else-if="scope.row.REPAIR_STATUS == 3"
                          style="font-weight:800;color:#0dcdf8">{{$t('ser.im')}}</span>
                    <span v-else-if="scope.row.REPAIR_STATUS == 4"
                          style="font-weight:800;color:red">{{$t('ser.scrapped')}}</span>
                    <span v-else>{{$t('ser.s')}}</span>
                  </template>
                </vxe-table-column>
              </vxe-table>
            </div>
          </el-col>
          <!-- 维修配件列表 -->
          <el-col :span="10">
            <div>
              <span style="display: block;color: #606266;font-size: 14px;margin: 5px 0;">{{ $t('ser.rpl') }}</span>
            </div>
            <div class="col-teble">
              <vxe-table ref="accessoriesTable"
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
                         :data="AcceTable"
                         :mouse-config="{selected: true}"
                         :edit-config="{trigger: 'click', mode: 'row', showStatus: true}">
                <vxe-table-column field="COMPONENT_NAME"
                                  :title="$t('ser.an')"
                                  :edit-render="{name: '$input', props: {readonly: true}}" />
                <vxe-table-column field="COMPONENT_MODEL"
                                  :title="$t('ser.as')"
                                  :edit-render="{name: '$input', props: {readonly: true}}" />
              </vxe-table>
            </div>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
    <!-- 保养内容明细 -->
    <el-dialog :close-on-click-modal="false"
               v-dialogDrag
               :title="$t('ser.md')"
               width="70%"
               :visible.sync="dialogTableVisible">
      <div class="maintenance-details">
        <vxe-table v-if="activeName === 'nippon' ||activeName === 'yuebao' || activeName === 'guarantee'"
                   ref="_mTable"
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
                   :data="gridData"
                   :mouse-config="{selected: true}"
                   :edit-config="{trigger: 'click', mode: 'row', showStatus: true}">
          <vxe-table-column field="KEEP_CONTENT"
                            :title="$t('ser._1')"
                            :edit-render="{name: '$input', props: {readonly: true}}" />
          <vxe-table-column field="KEEP_TOOLS"
                            :title="$t('ser._2')"
                            :edit-render="{name: '$input', props: {readonly: true}}" />
          <vxe-table-column field="STATUS"
                            :title="$t('ser._3')">
            <template slot-scope="scope">
              <span v-if="scope.row.STATUS == 0"
                    style="color:red;font-weight:900;">{{$t('ser.qualified')}}</span>
              <span v-if="scope.row.STATUS == 1"
                    style="color:green;font-weight:900;">{{$t('ser.noqualified')}}</span>
            </template>
          </vxe-table-column>
          <vxe-table-column field="MESSAGE"
                            :title="$t('ser._4')"
                            :edit-render="{name: '$input', props: {readonly: true}}" />
        </vxe-table>
      </div>
    </el-dialog>
  </d2-container>
</template>

<script>
import customContainerHeader from '@/components/custom-container-header'
import pagination from '@/views/mixin/page'
import {
  Index,
  LoadData,
  LoadRepairHeadData,
  GetEquipRepairDetail,
  LoadEquipKeepData,
  GetEquipKeepDetail
} from '@/api/SfcsEquipReport'
export default {
  name: 'SfcsEquipReport',
  components: {
    customContainerHeader
  },
  mixins: [pagination],
  data () {
    return {
      formData: {
        Page: 1, // 当前页
        Limit: 15, // 分页大小
        CATEGORY: '',
        STATION_ID: '',
        STATUS: '',
        NAME: ''
      },
      CategoryList: [],
      LinesList: [],
      StatusList: [],
      mainTable: [],
      loading: false,
      radio: '',
      activeName: 'first',
      basic: [],
      dataTab: [
        {
          val: 0,
          name: 'nippon',
          label: this.$t('ser.dm')
        },
        {
          val: 1,
          name: 'yuebao',
          label: this.$t('ser.mm')
        },
        {
          val: 2,
          name: 'guarantee',
          label: this.$t('ser.am')
        }
      ],
      dataVal: {
        Page: 1,
        Limit: 10,
        CATEGORY: '',
        EQUIP_ID: '',
        KEEP_TYPE: ''
      },
      dataTable: [],
      dataTotal: 0,
      dialogTableVisible: false,
      gridData: [], // 保养明细
      keepListVal: {
        EQUIP_ID: '',
        Page: 1,
        Limit: 10
      },
      img_url: process.env.VUE_APP_BASE_IMG,
      keepList: [], // 设备维修记录列表
      AcceTable: [], // 维修配件列表
      KeepRadio: '',
      totalPage: 0
    }
  },
  created () {
    this.geIndex()
    this.getLoadData()
  },
  methods: {
    async geIndex () {
      const res = await Index()
      this.CategoryList = res.Result ? res.Result.CategoryList : []
      this.LinesList = res.Result ? res.Result.LinesList : []
      this.StatusList = res.Result ? res.Result.StatusList : []
    },
    async getLoadData () {
      this.loading = true
      const res = await LoadData(this.formData)
      this.loading = false
      this.mainTable = res.Result ? JSON.parse(res.Result) : []
      this.totalPage = res.TotalCount ? res.TotalCount : 0
    },
    // 搜索
    doFilter () {
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
    day_handleSizeChange (val) {
      this.dataVal.Limit = val
      if (this.dataVal.EQUIP_ID) {
        this.getLoadEquipKeepData()
      }
    },
    day_handleCurrentChange (val) {
      this.dataVal.Page = val
      if (this.dataVal.EQUIP_ID) {
        this.getLoadEquipKeepData()
      }
    },
    // 点击获取表格
    openDetails (row, column, event) {
      const data = row.row
      this.dataVal.CATEGORY = data.CATEGORY
      this.dataVal.EQUIP_ID = data.ID
      // 日保养
      if (this.activeName === 'nippon') {
        this.dataVal.KEEP_TYPE = 0
        this.getLoadEquipKeepData()
      }
      // 月保养
      if (this.activeName === 'yuebao') {
        this.dataVal.KEEP_TYPE = 1
        this.getLoadEquipKeepData()
      }
      // 年保养
      if (this.activeName === 'guarantee') {
        this.dataVal.KEEP_TYPE = 2
        this.getLoadEquipKeepData()
      }
      // 维修
      this.keepListVal.EQUIP_ID = data.ID
      this.basic = Array(data)
      this.radio = this.mainTable.indexOf(data)
      if (this.activeName === 'service') {
        this.getLoadRepairHeadData()
      }
    },
    // 获取维修记录
    async getLoadRepairHeadData () {
      const res = await LoadRepairHeadData(this.keepListVal)
      this.keepList = res.Result ? JSON.parse(res.Result) : []
    },
    // 点击获取维修配件
    Keeprad_but (row) {
      const data = row.row
      this.KeepRadio = this.keepList.indexOf(data)
      if (data.ID) {
        this.GetEquipRepairData(data.ID)
      }
    },
    // 获取维修配件
    async GetEquipRepairData (id) {
      const res = await GetEquipRepairDetail(id)
      this.AcceTable = res.Result ? JSON.parse(res.Result) : []
    },
    // 获取年月日报表信息
    async getLoadEquipKeepData () {
      const res = await LoadEquipKeepData(this.dataVal)
      this.dataTable = res.Result ? JSON.parse(res.Result) : []
      this.dataTotal = res.TotalCount ? res.TotalCount : 0
    },
    // 滑动切换
    handleClick () {
      // 日保养
      if (this.activeName === 'nippon') {
        if (this.dataVal.EQUIP_ID) {
          this.dataVal.KEEP_TYPE = 0
          this.getLoadEquipKeepData()
        }
      }
      // 月保养
      if (this.activeName === 'yuebao') {
        if (this.dataVal.EQUIP_ID) {
          this.dataVal.KEEP_TYPE = 1
          this.getLoadEquipKeepData()
        }
      }
      // 年保养
      if (this.activeName === 'guarantee') {
        if (this.dataVal.EQUIP_ID) {
          this.dataVal.KEEP_TYPE = 2
          this.getLoadEquipKeepData()
        }
      }
      // 维修记录
      if (this.activeName === 'service') {
        if (this.keepListVal.EQUIP_ID) {
          this.getLoadRepairHeadData()
        }
      }
    },
    // 查看明细
    async day_view_but (val) {
      this.dialogTableVisible = true
      const res = await GetEquipKeepDetail(val.ID)
      this.gridData = res.Result ? JSON.parse(res.Result) : []
    }
  }
}
</script>

<style lang="scss" scoped>
.SfcsEquipRepairHead-MainTable {
  height: calc(100vh - 530px);
}
.pagination {
  margin-top: 10px;
}
.maintenance-details {
  height: 400px;
}
</style>
<style>
.custom-radio .el-radio__label {
  display: none;
}
.col-teble {
  height: calc(100vh - 575px);
}
</style>
