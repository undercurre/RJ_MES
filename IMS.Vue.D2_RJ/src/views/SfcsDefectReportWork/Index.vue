<template>
  <d2-container>
    <!-- 头部 -->
    <template slot="header">
      <custom-container-header :isImport="false">
        <el-input
          clearable
          v-model="formData.WO_NO"
          :placeholder="$t('SfcsDefectReportWork._1')"
          style="width:200px"
          @keyup.enter.native="searchClick"
        />
        <el-select
          style="width:200px"
          v-model="formData.LINE_ID"
          :placeholder="$t('SfcsDefectReportWork._2')"
        >
          <el-option
            v-for="item in LineList"
            :key="item.LINE_ID"
            :label="item.LINE_NAME"
            :value="item.LINE_ID"
          />
        </el-select>
        <el-input
          clearable
          v-model="formData.COM_CONDITION"
          :placeholder="$t('SfcsDefectReportWork._3')"
          style="width:200px"
          @keyup.enter.native="searchClick"
        />
        <el-button
          type="primary"
          icon="el-icon-search"
          @click.prevent="searchClick"
        >{{$t('publics.btn.search')}}</el-button>&nbsp;
        <el-button
          type="danger"
          icon="el-icon-delete"
          @click.prevent="cleanClick"
        >{{$t('publics.btn.clear')}}</el-button>&nbsp;
      </custom-container-header>
    </template>
    <!-- 表格 -->
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
      >
        <vxe-table-column
          field="WO_NO"
          :title="$t('SfcsDefectReportWork._4')"
          :edit-render="{name: '$input', props: {readonly: true}}"
        />
        <vxe-table-column
          field="LINE_NAME"
          :title="$t('SfcsDefectReportWork._5')"
          :edit-render="{name: '$input', props: {readonly: true}}"
        />
        <vxe-table-column
          field="DEFECT_CODE"
          :title="$t('SfcsDefectReportWork._6')"
          :edit-render="{name: '$input', props: {readonly: true}}"
        />
        <vxe-table-column
          field="DEFECT_NAME"
          :title="$t('SfcsDefectReportWork._7')"
          :edit-render="{name: '$input', props: {readonly: true}}"
        />
        <vxe-table-column
          field="LOC"
          :title="$t('SfcsDefectReportWork._8')"
          :edit-render="{name: '$input', props: {readonly: true}}"
        />
        <vxe-table-column
          field="QTY"
          :title="$t('SfcsDefectReportWork._9')"
          :edit-render="{name: '$input', props: {readonly: true}}"
        />
      </vxe-table>
    </div>
    <!-- 分页 -->
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
  </d2-container>
</template>

<script>
import helper from '@/api/Helper'
import customContainerHeader from '@/components/custom-container-header'
import pagination from '@/views/mixin/page'
import { GetLinesList } from '@/api/SfcsDefectReportWork'
const API = helper('SfcsDefectReportWork')
export default {
  name: 'SfcsDefectReportWork',
  components: {
    customContainerHeader
  },
  mixins: [pagination],
  data () {
    return {
      formData: {
        Page: 1,
        Limit: 15
      },
      LineList: [], // 线体/产线
      loading: false,
      mainTable: []
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
      const res = await API.LoadData(this.formData)
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
