<template>
  <d2-container>
    <!-- 头部 -->
    <template slot="header">
      <custom-container-header :isExport="false"
                               :isExportTpl="false"
                               :isImport="false">
        <el-select v-model="formData.OPERATION_LINE_ID"
                   clearable
                   style="width:150px"
                   :placeholder="$t('cne.s_1')">
          <el-option v-for="item in LinesList"
                     :key="item.Id"
                     :label="item.OPERATION_LINE_NAME"
                     :value="item.Id" />
        </el-select>&nbsp;
        <el-select v-model="formData.CALL_TYPE_CODE"
                   clearable
                   style="width:150px"
                   :placeholder="$t('cne.s_2')">
          <el-option v-for="item in CallTypeList"
                     :key="item.LOOKUP_CODE"
                     :label="item.CHINESE"
                     :value="item.LOOKUP_CODE" />
        </el-select>&nbsp;
        <el-select v-model="formData.STATUS"
                   style="width:150px"
                   clearable
                   :placeholder="$t('cne.s_3')">
          <!-- <el-option v-for="item in section"
                     :key="item.ID"
                     :label="item.CHINESE"
          :value="item.ID" />-->
          <el-option :label="$t('cne.t_9')"
                     :value="0" />
          <el-option :label="$t('cne.t_10')"
                     :value="1" />
        </el-select>
        <el-date-picker v-model="calldate"
                        clearable
                        type="daterange"
                        style="width:230px;margin-right: 10px;"
                        :start-placeholder="$t('cne.s_4')"
                        :end-placeholder="$t('cne.s_5')"
                        align="right"
                        value-format="yyyy-MM-dd" />&nbsp;
        <el-input v-model="formData.Key"
                  :placeholder="$t('cne.s_6')"
                  clearable
                  style="width:150px"
                  @keyup.enter.native="search_but" />&nbsp;
        <el-button type="primary"
                   icon="el-icon-search"
                   @click.prevent="search_but">{{$t('cne.s_7')}}</el-button>
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
        <vxe-table-column min-width="80"
                          :title="$t('cne.t_1')">
          <template slot-scope="scope">
            <el-radio-group v-model="radio">
              <el-radio class="custom-radio"
                        :label="scope.$rowIndex" />
            </el-radio-group>
          </template>
        </vxe-table-column>
        <vxe-table-column min-width="120"
                          field="CALL_NO"
                          :title="$t('cne.t_2')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column min-width="100"
                          field="OPERATION_LINE_NAME"
                          :title="$t('cne.t_3')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column min-width="100"
                          field="CALL_TYPE_NAME"
                          :title="$t('cne.t_4')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column min-width="130"
                          field="NOTICE_TYPE"
                          :title="$t('cne.t_5')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column min-width="150"
                          field="NOTICE_CONTENT"
                          :title="$t('cne.t_6')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column min-width="100"
                          field="NOTICT_TIME"
                          :title="$t('cne.t_7')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column min-width="100"
                          field="STATUS"
                          :title="$t('cne.t_8')">
          <template slot-scope="scope">
            <span v-if="scope.row.STATUS === 0"
                  style="color:#FF5722;">{{ $t('cne.t_9') }}</span>
            <span v-else-if="scope.row.STATUS === 1"
                  style="color:#FFB800;">{{ $t('cne.t_10') }}</span>
            <span v-else
                  style="color:#1E9FFF;">{{ $t('cne.t_11') }}</span>
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
    <!-- 下表格 -->
    <div class="SfcsEquipRepairHead-MainTable">
      <vxe-table ref="callTable"
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
                 :loading="ReceiveLoading"
                 :data="dayTable"
                 :mouse-config="{selected: true}"
                 :edit-config="{trigger: 'click', mode: 'row', showStatus: true}">
        <vxe-table-column field="USER_NAME"
                          :title="$t('cne.t2_1')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column field="NOTICE_TYPE"
                          :title="$t('cne.t2_2')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column field="NOTICE_ACCOUNT"
                          :title="$t('cne.t2_3')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
      </vxe-table>
    </div>
  </d2-container>
</template>
<script>
import customContainerHeader from '@/components/custom-container-header'
import { Index, LoadData, LoadDataReceiver } from '@/api/CallNotice'
export default {
  name: 'CallNotice',
  components: {
    customContainerHeader
  },
  data () {
    return {
      formData: {
        Page: 1, // 当前页
        Limit: 15, // 分页大小
        OPERATION_LINE_ID: '', // 线体
        CALL_TYPE_CODE: '', //  呼叫类型
        STATUS: '', // 设备状态
        BEGIN_TIME: '',
        END_TIME: '',
        Key: ''
      },
      LinesList: [],
      CallTypeList: [],
      section: [],
      calldate: '',
      loading: false,
      mainTable: [],
      radio: '',
      totalPage: 0,
      dayTable: [],
      ReceiveLoading: false
    }
  },
  created () {
    this.getIndex()
    this.getLoadData()
  },
  methods: {
    // 获取下拉列表选项
    async getIndex () {
      const res = await Index()
      this.CallTypeList = res.Result.CallTypeList
      this.LinesList = res.Result.LinesList
    },
    // 表格数据
    async getLoadData () {
      this.loading = true
      const res = await LoadData(this.formData)
      this.loading = false
      this.mainTable = res.Result ? JSON.parse(res.Result) : []
      this.totalPage = res.TotalCount ? res.TotalCount : 0
    },
    // 搜索
    search_but () {
      if (this.calldate[0]) {
        this.formData.BEGIN_TIME = this.calldate[0]
        this.formData.END_TIME = this.calldate[1]
      } else {
        this.formData.BEGIN_TIME = ''
        this.formData.END_TIME = ''
      }
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
    openDetails (row) {
      const data = row.row
      console.log(data)
      this.radio = this.mainTable.indexOf(data)
      this.getLoadDataReceiver(data.Id)
    },
    // 信息集
    async getLoadDataReceiver (id) {
      this.ReceiveLoading = true
      const res = await LoadDataReceiver(id)
      this.ReceiveLoading = false
      this.dayTable = res.Result ? JSON.parse(res.Result) : []
    }
  }
}
</script>
<style lang="scss" scoped>
.SfcsEquipRepairHead-MainTable {
  height: calc(100vh - 500px);
}
.pagination {
  margin: 10px 0;
}
</style>
<style>
.custom-radio .el-radio__label {
  display: none;
}
</style>
