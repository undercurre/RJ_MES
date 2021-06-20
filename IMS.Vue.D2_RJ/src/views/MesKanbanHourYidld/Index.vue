<template>
  <d2-container>
    <!-- 头部 -->
    <template slot="header">
      <custom-container-header :isImport="false">
        <el-select style="width:150px"
                   v-model="formData.LINE_ID"
                   :placeholder="$t('MesKanbanHourYidld._1')">
          <el-option v-for="item in LineList"
                     :key="item.LINE_ID"
                     :label="item.LINE_NAME"
                     :value="item.LINE_ID" />
        </el-select>
        <el-input clearable
                  v-model="formData.WO_NO"
                  :placeholder="$t('MesKanbanHourYidld._2')"
                  style="width:150px"
                  @keyup.enter.native="searchClick" />
        <el-input clearable
                  v-model="formData.PART_NO"
                  :placeholder="$t('MesKanbanHourYidld._3')"
                  style="width:150px"
                  @keyup.enter.native="searchClick" />
        <el-select style="width:150px"
                   v-model="formData.REPORT_CONTENT"
                   :placeholder="$t('MesKanbanHourYidld._4')">
          <el-option v-for="(item,ID) in ReportList"
                     :key="ID"
                     :label="item"
                     :value="item" />
        </el-select>
        <el-date-picker style="width:150px"
                        v-model="formData.BEGIN_TIME"
                        type="datetime"
                        :placeholder="$t('MesKanbanHourYidld._5')"
                        value-format="yyyy-MM-dd"
                        format="yyyy-MM-dd"
                        :picker-options="pickerOptionsStart" />
        <el-date-picker style="width:150px"
                        v-model="formData.END_TIME"
                        type="datetime"
                        :placeholder="$t('MesKanbanHourYidld._6')"
                        value-format="yyyy-MM-dd"
                        format="yyyy-MM-dd"
                        :picker-options="pickerOptionsEnd" />
        <el-button type="primary"
                   icon="el-icon-search"
                   @click.prevent="searchClick">{{$t('publics.btn.search')}}</el-button>&nbsp;
        <el-button type="danger"
                   icon="el-icon-delete"
                   @click.prevent="cleanClick">{{$t('publics.btn.clear')}}</el-button>&nbsp;
      </custom-container-header>
    </template>
    <!-- 表格 -->
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
                 :edit-config="{trigger: 'click', mode: 'row', showStatus: true}">
        <vxe-table-column min-width="160"
                          field="LINE_NAME"
                          :title="$t('MesKanbanHourYidld._7')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column min-width="140"
                          field="WO_NO"
                          :title="$t('MesKanbanHourYidld._8')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column min-width="120"
                          field="CN_DESC"
                          :title="$t('MesKanbanHourYidld._9')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column min-width="150"
                          field="PART_NO"
                          :title="$t('MesKanbanHourYidld._10')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column min-width="150"
                          field="REPORT_CONTENT"
                          :title="$t('MesKanbanHourYidld._18')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column min-width="140"
                          field="WORK_TIME"
                          :title="$t('MesKanbanHourYidld._11')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column min-width="200"
                          field="OUTPUT_QTY"
                          :title="$t('MesKanbanHourYidld._12')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column min-width="200"
                          field="STANDARD_CAPACITY"
                          :title="$t('MesKanbanHourYidld._13')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column min-width="220"
                          field="OUTPUT_TIVITY"
                          :title="$t('MesKanbanHourYidld._14')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column min-width="220"
                          field="VALUE_MAX"
                          :title="$t('MesKanbanHourYidld._15')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column min-width="210"
                          field="VALUE_MIN"
                          :title="$t('MesKanbanHourYidld._16')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column width="180"
                          field="REPORT_NO"
                          :title="$t('MesKanbanHourYidld._17')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
      </vxe-table>
    </div>
    <!-- 分页 -->
    <template slot="footer">
      <el-pagination :current-page="formData.Page"
                     :page-size="formData.Limit"
                     :page-sizes="[15, 25, 35, 45]"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="totalPage"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange" />
    </template>
  </d2-container>
</template>

<script>
import customContainerHeader from '@/components/custom-container-header'
import pagination from '@/views/mixin/page'
import { LoadData, GetLinesList } from '@/api/MesKanbanHourYidld'
export default {
  name: 'MesKanbanHourYidld',
  components: {
    customContainerHeader
  },
  mixins: [pagination],
  data () {
    return {
      formData: { Page: 1, Limit: 15 },
      ReportList: ['产能正常', '产能不达标', '产能超标'], // 报告内容
      LineList: [], // 线体
      loading: false,
      mainTable: [],
      startTime: '',
      endTime: '',
      pickerOptionsStart: {
        disabledDate: time => {
          if (this.formData.END_TIME) {
            return time.getTime() > new Date(this.formData.END_TIME).getTime()
          }
        }
      },
      pickerOptionsEnd: {
        disabledDate: time => {
          if (this.formData.BEGIN_TIME) {
            return (
              time.getTime() <
              new Date(this.formData.BEGIN_TIME).getTime() - 86400000
            )
          }
        }
      }
    }
  },
  created () {
    this.getLines()
    this.getLoadData()
  },
  methods: {
    async getLines () {
      const res = await GetLinesList()
      this.LineList = res.Result ? res.Result : []
    },
    async getLoadData () {
      this.loading = true
      const res = await LoadData(this.formData)
      if (res.Result) {
        this.mainTable = res.Result
        console.log(this.mainTable, '获取表格')
        this.totalPage = res.TotalCount
        this.loading = false
      } else {
        this.loading = false
      }
    },
    // 搜索
    searchClick () {
      this.formData.Page = 1
      this.getLoadData()
    },
    cleanClick () {
      this.formData = {}
      this.formData = {
        Page: 1,
        Limit: 15
      }
      this.getLoadData()
    }
  }
}
</script>

<style>
</style>
