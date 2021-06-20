<template>
  <d2-container>
    <!-- 头部 -->
    <template slot="header">
      <custom-container-header :isImport="false">
        <el-input
          clearable
          v-model="formData.WO_NO"
          :placeholder="'请输入工单号'"
          style="width:200px"
          @keyup.enter.native="searchClick"
        />
        <el-select style="width:200px" v-model="formData.LINE_NAME" :placeholder="'请选择线体'">
          <el-option v-for="item in LineList" :key="item.ID" :label="item.NAME" :value="item.ID" />
        </el-select>
        <el-input
          clearable
          v-model="formData.DEFECT_CODE"
          :placeholder="'请输入不良代码/描述/位号'"
          style="width:200px"
          @keyup.enter.native="searchClick"
        />
        <el-button
          type="primary"
          icon="el-icon-search"
          @click.prevent="searchClick"
        >{{$t('publics.btn.search')}}</el-button>&nbsp;
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
          :title="'工单'"
          :edit-render="{name: '$input', props: {readonly: true}}"
        />
        <vxe-table-column
          field="LINE_NAME"
          :title="'产线'"
          :edit-render="{name: '$input', props: {readonly: true}}"
        />
        <vxe-table-column
          field="DEFECT_CODE"
          :title="'不良代号'"
          :edit-render="{name: '$input', props: {readonly: true}}"
        />
        <vxe-table-column
          field="DEFECT_NAME"
          :title="'不良描述'"
          :edit-render="{name: '$input', props: {readonly: true}}"
        />
        <vxe-table-column
          field="LOC"
          :title="'不良位号'"
          :edit-render="{name: '$input', props: {readonly: true}}"
        />
        <vxe-table-column
          field="QTY"
          :title="'不良数量'"
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
import CURD from '@/views/mixin/CURD'
const API = helper('BadStatistics')
export default {
  name: 'BadStatistics',
  components: {
    customContainerHeader
  },
  mixins: [
    pagination,
    CURD({
      defaultSaveAPI: e => API.SaveData(e)
    })
  ],
  data () {
    return {
      formData: {},
      LineList: [], // 线体/产线
      loading: false,
      mainTable: [
        {
          ID: 0,
          LOC: 'R6',
          DEFECT_CODE: 'WG08',
          WO_ID: 0,
          OPERATION_SITE_ID: 0,
          OPERATOR: null,
          QTY: 1,
          REPORT_TIME: '0001-01-01 00:00:00',
          CREATE_TIME: '0001-01-01 00:00:00',
          LINE_NAME: '一部2楼 RoHS Line R2',
          WO_NO: '5101-20190705005',
          DEFECT_NAME: '包焊'
        },
        {
          ID: 0,
          LOC: 'R5',
          DEFECT_CODE: 'WG02',
          WO_ID: 0,
          OPERATION_SITE_ID: 0,
          OPERATOR: null,
          QTY: 1,
          REPORT_TIME: '0001-01-01 00:00:00',
          CREATE_TIME: '0001-01-01 00:00:00',
          LINE_NAME: '一部2楼 RoHS Line R2',
          WO_NO: '5101-20190705005',
          DEFECT_NAME: '错件'
        },
        {
          ID: 0,
          LOC: 'R11',
          DEFECT_CODE: 'WG06',
          WO_ID: 0,
          OPERATION_SITE_ID: 0,
          OPERATOR: null,
          QTY: 1,
          REPORT_TIME: '0001-01-01 00:00:00',
          CREATE_TIME: '0001-01-01 00:00:00',
          LINE_NAME: '一部2楼 RoHS Line R2',
          WO_NO: '5101-20190705005',
          DEFECT_NAME: '飞脚'
        },
        {
          ID: 0,
          LOC: 'SD',
          DEFECT_CODE: 'WG09',
          WO_ID: 0,
          OPERATION_SITE_ID: 0,
          OPERATOR: null,
          QTY: 1,
          REPORT_TIME: '0001-01-01 00:00:00',
          CREATE_TIME: '0001-01-01 00:00:00',
          LINE_NAME: '一部2楼 RoHS Line R2',
          WO_NO: '5101-20190705005',
          DEFECT_NAME: '虚焊'
        },
        {
          ID: 0,
          LOC: 'R45',
          DEFECT_CODE: 'WG06',
          WO_ID: 0,
          OPERATION_SITE_ID: 0,
          OPERATOR: null,
          QTY: 1,
          REPORT_TIME: '0001-01-01 00:00:00',
          CREATE_TIME: '0001-01-01 00:00:00',
          LINE_NAME: '一部2楼 RoHS Line R2',
          WO_NO: '5101-20190705005',
          DEFECT_NAME: '飞脚'
        },
        {
          ID: 0,
          LOC: 'DE',
          DEFECT_CODE: 'WG09',
          WO_ID: 0,
          OPERATION_SITE_ID: 0,
          OPERATOR: null,
          QTY: 1,
          REPORT_TIME: '0001-01-01 00:00:00',
          CREATE_TIME: '0001-01-01 00:00:00',
          LINE_NAME: '一部2楼 RoHS Line R2',
          WO_NO: '5101-20190705005',
          DEFECT_NAME: '虚焊'
        },
        {
          ID: 0,
          LOC: '3EEE',
          DEFECT_CODE: 'WG08',
          WO_ID: 0,
          OPERATION_SITE_ID: 0,
          OPERATOR: null,
          QTY: 1,
          REPORT_TIME: '0001-01-01 00:00:00',
          CREATE_TIME: '0001-01-01 00:00:00',
          LINE_NAME: '一部2楼 RoHS Line R2',
          WO_NO: '5101-20190705005',
          DEFECT_NAME: '包焊'
        },
        {
          ID: 0,
          LOC: 'DEE',
          DEFECT_CODE: 'WG06',
          WO_ID: 0,
          OPERATION_SITE_ID: 0,
          OPERATOR: null,
          QTY: 1,
          REPORT_TIME: '0001-01-01 00:00:00',
          CREATE_TIME: '0001-01-01 00:00:00',
          LINE_NAME: '一部2楼 RoHS Line R2',
          WO_NO: '5101-20190705005',
          DEFECT_NAME: '飞脚'
        },
        {
          ID: 0,
          LOC: 'ED',
          DEFECT_CODE: 'WG03',
          WO_ID: 0,
          OPERATION_SITE_ID: 0,
          OPERATOR: null,
          QTY: 1,
          REPORT_TIME: '0001-01-01 00:00:00',
          CREATE_TIME: '0001-01-01 00:00:00',
          LINE_NAME: '一部2楼 RoHS Line R2',
          WO_NO: '5101-20190705005',
          DEFECT_NAME: '高件'
        },
        {
          ID: 0,
          LOC: 'RE',
          DEFECT_CODE: 'WG04',
          WO_ID: 0,
          OPERATION_SITE_ID: 0,
          OPERATOR: null,
          QTY: 1,
          REPORT_TIME: '0001-01-01 00:00:00',
          CREATE_TIME: '0001-01-01 00:00:00',
          LINE_NAME: '一部2楼 RoHS Line R2',
          WO_NO: '5101-20190705005',
          DEFECT_NAME: '反件'
        },
        {
          ID: 0,
          LOC: 'SSS',
          DEFECT_CODE: 'WG11',
          WO_ID: 0,
          OPERATION_SITE_ID: 0,
          OPERATOR: null,
          QTY: 1,
          REPORT_TIME: '0001-01-01 00:00:00',
          CREATE_TIME: '0001-01-01 00:00:00',
          LINE_NAME: '一部2楼 RoHS Line R2',
          WO_NO: '5101-20190705005',
          DEFECT_NAME: '移位'
        },
        {
          ID: 0,
          LOC: 'R56',
          DEFECT_CODE: 'WG04',
          WO_ID: 0,
          OPERATION_SITE_ID: 0,
          OPERATOR: null,
          QTY: 1,
          REPORT_TIME: '0001-01-01 00:00:00',
          CREATE_TIME: '0001-01-01 00:00:00',
          LINE_NAME: '一部2楼 RoHS Line R2',
          WO_NO: '5101-20190705005',
          DEFECT_NAME: '反件'
        },
        {
          ID: 0,
          LOC: 'EE',
          DEFECT_CODE: 'WG05',
          WO_ID: 0,
          OPERATION_SITE_ID: 0,
          OPERATOR: null,
          QTY: 1,
          REPORT_TIME: '0001-01-01 00:00:00',
          CREATE_TIME: '0001-01-01 00:00:00',
          LINE_NAME: '一部2楼 RoHS Line R2',
          WO_NO: '5101-20190705005',
          DEFECT_NAME: '多件'
        },
        {
          ID: 0,
          LOC: 'R45',
          DEFECT_CODE: 'WG09',
          WO_ID: 0,
          OPERATION_SITE_ID: 0,
          OPERATOR: null,
          QTY: 1,
          REPORT_TIME: '0001-01-01 00:00:00',
          CREATE_TIME: '0001-01-01 00:00:00',
          LINE_NAME: '一部2楼 RoHS Line R2',
          WO_NO: '5101-20190705005',
          DEFECT_NAME: '虚焊'
        },
        {
          ID: 0,
          LOC: 'L01',
          DEFECT_CODE: 'WG15',
          WO_ID: 0,
          OPERATION_SITE_ID: 0,
          OPERATOR: null,
          QTY: 2,
          REPORT_TIME: '0001-01-01 00:00:00',
          CREATE_TIME: '0001-01-01 00:00:00',
          LINE_NAME: '一部2楼 RoHS Line R2',
          WO_NO: '5101-20190731016',
          DEFECT_NAME: '错位'
        },
        {
          ID: 0,
          LOC: 'SE',
          DEFECT_CODE: 'WG04',
          WO_ID: 0,
          OPERATION_SITE_ID: 0,
          OPERATOR: null,
          QTY: 1,
          REPORT_TIME: '0001-01-01 00:00:00',
          CREATE_TIME: '0001-01-01 00:00:00',
          LINE_NAME: '一部2楼 RoHS Line R2',
          WO_NO: '5101-20190731016',
          DEFECT_NAME: '反件'
        },
        {
          ID: 0,
          LOC: 'EG',
          DEFECT_CODE: 'WG08',
          WO_ID: 0,
          OPERATION_SITE_ID: 0,
          OPERATOR: null,
          QTY: 1,
          REPORT_TIME: '0001-01-01 00:00:00',
          CREATE_TIME: '0001-01-01 00:00:00',
          LINE_NAME: '一部2楼 RoHS Line R2',
          WO_NO: '5101-20190731016',
          DEFECT_NAME: '包焊'
        },
        {
          ID: 0,
          LOC: 'WE',
          DEFECT_CODE: 'WG03',
          WO_ID: 0,
          OPERATION_SITE_ID: 0,
          OPERATOR: null,
          QTY: 1,
          REPORT_TIME: '0001-01-01 00:00:00',
          CREATE_TIME: '0001-01-01 00:00:00',
          LINE_NAME: '一部2楼 RoHS Line R2',
          WO_NO: '5101-20190731016',
          DEFECT_NAME: '高件'
        },
        {
          ID: 0,
          LOC: 'J',
          DEFECT_CODE: 'WG02',
          WO_ID: 0,
          OPERATION_SITE_ID: 0,
          OPERATOR: null,
          QTY: 1,
          REPORT_TIME: '0001-01-01 00:00:00',
          CREATE_TIME: '0001-01-01 00:00:00',
          LINE_NAME: '一部2楼 RoHS Line R2',
          WO_NO: '5101-20190907015',
          DEFECT_NAME: '错件'
        },
        {
          ID: 0,
          LOC: '5',
          DEFECT_CODE: 'WG03',
          WO_ID: 0,
          OPERATION_SITE_ID: 0,
          OPERATOR: null,
          QTY: 1,
          REPORT_TIME: '0001-01-01 00:00:00',
          CREATE_TIME: '0001-01-01 00:00:00',
          LINE_NAME: '一部2楼 RoHS Line R2',
          WO_NO: '5101-20190907015',
          DEFECT_NAME: '高件'
        }
      ]
    }
  },
  created () {
    this.getLoadData()
  },
  methods: {
    getLoadData () {},
    // 搜索
    searchClick () {
      this.formData.Page = 1
      this.getLoadData()
    }
  }
}
</script>

<style>
</style>
