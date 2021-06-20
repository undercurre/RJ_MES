<template>
  <custom-container>
    <!-- 头部 -->
    <template slot="header">
      <custom-container-header :isImport="false">
        <el-select style="width:140px"
                   clearable
                   @clear="clearLINE"
                   v-model="formData.LINE_ID"
                   :placeholder="$t('KanbanHourReport._101')">
          <el-option v-for="item in LinesList"
                     :key="item.LINE_ID"
                     :label="item.LINE_NAME"
                     :value="item.LINE_ID" />
        </el-select>
        <el-input v-model="formData.WO_NO"
                  :placeholder="$t('KanbanHourReport._102')"
                  clearable
                  style="width:140px"
                  @keyup.enter.native="MstSearch" />&nbsp;
        <el-date-picker v-model="datarange"
                        type="daterange"
                        clearable
                        style="width:220px;margin-right: 10px;"
                        :start-placeholder="$t('SOPRoutes._4')"
                        :end-placeholder="$t('SOPRoutes._5')"
                        align="right"
                        value-format="yyyy-MM-dd" />
        <el-button type="primary"
                   icon="el-icon-search"
                   @click.prevent="searchClick">{{ $t("publics.btn.search") }}</el-button>&nbsp;
        <el-button type="danger"
                   icon="el-icon-delete"
                   @click.prevent="cleanClick">{{ $t("publics.btn.clear") }}</el-button>&nbsp;
        <el-button type="primary"
                   icon="el-icon-receiving"
                   @click.prevent="exportAllData">{{ $t("publics.btn.export") }}</el-button>&nbsp;
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
                 :data="mainTable">
        <vxe-table-column field="LINE_NAME"
                          :title="$t('KanbanHourReport._1')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
        <vxe-table-column field="WO_NO"
                          :title="$t('KanbanHourReport._2')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
        <vxe-table-column field="PART_NO"
                          :title="$t('KanbanHourReport._8')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
        <vxe-table-column field="WORK_TIME"
                          :title="$t('KanbanHourReport._3')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
        <vxe-table-column field="OUTPUT_QTY"
                          :title="$t('KanbanHourReport._4')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
        <vxe-table-column field="value"
                          :title="$t('KanbanHourReport._5')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
        <vxe-table-column field="LINE_TYPE"
                          :title="$t('KanbanHourReport._6')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
        <vxe-table-column field="REPORT_NO"
                          :title="$t('KanbanHourReport._7')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
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
  </custom-container>
</template>

<script>
import customContainerHeader from '@/components/custom-container-header'
import { mapGetters } from 'vuex'
import customContainer from '@/components/custom-container'
import pagination from '@/views/mixin/page'
// import echarts from 'echarts'
import { Index, GetKanbanHourReportAsync } from '@/api/Kanban'
export default {
  name: 'KanbanHourReport',
  components: {
    customContainerHeader,
    customContainer
  },
  mixins: [pagination],
  data () {
    return {
      formData: {
        Page: 1,
        Limit: 15,
        WO_NO: ''
      },
      datarange: '',
      LinesList: [],
      loading: false,
      mainTable: []
    }
  },
  computed: {
    ...mapGetters(['userinfo', 'userId'])
  },
  created () {
    this.getLines()
    this.getLoadData()
    this.formData.ORGANIZE_ID = this.userinfo.ORGANIZE_ID
  },
  methods: {
    clearLINE () {
      this.formData.LINE_ID = undefined
    },
    async getLines () {
      const res = await Index()
      if (res.Result) {
        var data = JSON.parse(res.Result)
        this.LinesList = data.LineList
      }
    },
    async getLoadData () {
      this.loading = true

      const res = await GetKanbanHourReportAsync(this.formData)

      if (res.Result) {
        var data = JSON.parse(res.Result)
        this.mainTable = data.data
        data.data.forEach(e => {
          e.value = e.VALUE_MIN + '~' + e.VALUE_MAX
        })
        this.totalPage = data.count
        this.loading = false
      } else {
        this.loading = false
        this.mainTable = []
        this.totalPage = 0
      }
    },
    // 搜索
    searchClick () {
      if (this.datarange) {
        this.formData.START_TIME = this.datarange[0]
        this.formData.END_TIME = this.datarange[1]
      } else {
        this.formData.START_TIME = ''
        this.formData.END_TIME = ''
      }
      this.formData.Page = 1
      this.getLoadData()
    },
    cleanClick () {
      this.formData = {
        Page: 1,
        Limit: 15,
        STENCIL_NO: ''
      }
      this.getLoadData()
    },
    async exportAllData () {
      this.loading = true
      var Limit = this.formData.Limit
      var Page = this.formData.Page
      this.formData.Limit = 3000
      this.formData.Page = 1
      const res = await GetKanbanHourReportAsync(this.formData)
      this.formData.Limit = Limit
      this.formData.Page = Page

      if (res.Result) {
        var data = JSON.parse(res.Result)
        this.mainTable = data.data
        data.data.forEach(e => {
          e.value = e.VALUE_MIN + '~' + e.VALUE_MAX
        })
        this.totalPage = data.count
        this.$refs.xTable.exportData({
          filename: '每小时产能报表',
          type: 'csv',
          isHeader: true,
          isFooter: true,
          data: this.mainTable
        })
        this.loading = false
      } else {
        this.loading = false
        this.mainTable = []
        this.totalPage = 0
      }
    }
  }
}
</script>

<style scoped="scoped">
.table-container {
  height: calc(100vh - 60px - 74px - 73px - 30px) !important;
}
</style>
