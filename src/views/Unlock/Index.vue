<template>
  <d2-container>
    <!-- 头部 -->
    <template slot="header">
      <custom-container-header :isImport="false">
        <el-select style="width:200px"
                   v-model="formData.CHECK_TYPE_NAME"
                   :placeholder="'请选择线体'">
          <el-option v-for="item in LineList"
                     :key="item.ID"
                     :label="item.NAME"
                     :value="item.ID" />
        </el-select>
        <el-button type="primary"
                   icon="el-icon-search"
                   @click.prevent="searchClick">{{$t('publics.btn.search')}}</el-button>&nbsp;
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
        <vxe-table-column width="180"
                          field="LOT_NO"
                          :title="'首件测试编号'"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column width="150"
                          field="WO_NO"
                          :title="'工单'"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column width="150"
                          field="LINE_NAME"
                          :title="'线别'"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column width="100"
                          field="STATUS"
                          :title="'状态'">
          <template slot-scope="scope">
            <span v-if="scope.row.STATUS === 'Y'"
                  class="green-txt">已解锁</span>
            <span v-else-if="scope.row.STATUS === 'N'"
                  class="red-txt">未解锁</span>
          </template>
        </vxe-table-column>
        <vxe-table-column width="100"
                          field="RESULT"
                          :title="'测试结果'">
          <template slot-scope="scope">
            <span :class="scope.row.RESULT === 'FAIL'?'red-txt':'green-txt'">{{scope.row.RESULT}}</span>
          </template>
        </vxe-table-column>
        <vxe-table-column width="230"
                          field="MESHINE"
                          :title="'产品规格'"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column width="150"
                          field="PRODUCT_DATE"
                          :title="'生产日期'"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column width="150"
                          field="CONTENT"
                          :title="'处理说明'"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column width="100"
                          field="TOTAL_ENTITY"
                          :title="'测试零件数'"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column width="100"
                          field="PASS_ENTITY"
                          :title="'通过零件数'"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column width="100"
                          field="NG_ENTITY"
                          :title="'不良零件数'"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column width="100"
                          field="UNCHECK_ENTITY"
                          :title="'未测零件数'"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column width="100"
                          field="PASS_RATE"
                          :title="'测试良率'"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column width="150"
                          field="CHECK_TYPE"
                          :title="'测试类型'"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column width="150"
                          field="CLASS_NAME"
                          :title="'班别'"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column width="150"
                          field="TEST_NO"
                          :title="'BOM版本'"
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
import helper from '@/api/Helper'
import customContainerHeader from '@/components/custom-container-header'
import pagination from '@/views/mixin/page'
import CURD from '@/views/mixin/CURD'
const API = helper('Unlock')
export default {
  name: 'Unlock',
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
      LineList: [], // 线体
      loading: false,
      mainTable: [
        //   {
        //     ID: 'cc7e981f-336d-4c28-9ef4-0fa32626f135',
        //     RESULT: 'FAIL',
        //     COMPANY: '苏泊尔',
        //     MESHINE: 'SY-50FH33Q-DL01(RoHS)-20-5-19',
        //     SCAN_TIME: '00:01:48',
        //     MAKE_TIME: '00:00:17',
        //     CHECK_TIME: '00:00:20',
        //     TOTAL_TIME: '00:02:25',
        //     GENERATE_CYCLE: null,
        //     CHECK_TYPE: '首件',
        //     CLASS_NAME: 'B班',
        //     BOARD_FACE: 'ALL',
        //     TEST_NO: null,
        //     WO_NO: '5102-20200409016',
        //     LINE_NO: 'SMT-1',
        //     PRODUCT_DATE: '2020-05-19 10:18:02',
        //     PRINT_DATE: '2020-05-19 10:18:02',
        //     BOM_VERSION: '181128-02G',
        //     TOTAL_ENTITY: 90,
        //     PASS_ENTITY: 85,
        //     NG_ENTITY: 5,
        //     UNCHECK_ENTITY: 0,
        //     PASS_RATE: 94,
        //     TESTER: '00001',
        //     LOT_AMOUNT: '5055',
        //     LOT_NO: 'SJ20200519101930040',
        //     CONTENT: 'M7与RS1M互换上错（已更换正确物料）',
        //     LINE_NAME: '一部2楼 SMT1号线',
        //     STATUS: 'Y'
        //   },
        //   {
        //     ID: '91575051-c414-4002-92fb-1c04661de8dc',
        //     RESULT: 'FAIL',
        //     COMPANY: '纯米',
        //     MESHINE: 'CM-DCL-G23-电源板54',
        //     SCAN_TIME: '00:01:24',
        //     MAKE_TIME: '00:00:26',
        //     CHECK_TIME: '00:02:48',
        //     TOTAL_TIME: '00:04:38',
        //     GENERATE_CYCLE: null,
        //     CHECK_TYPE: '首件',
        //     CLASS_NAME: 'A班',
        //     BOARD_FACE: 'ALL',
        //     TEST_NO: null,
        //     WO_NO: '5102-20200302023',
        //     LINE_NO: 'SMT4',
        //     PRODUCT_DATE: '2020-05-04 08:35:24',
        //     PRINT_DATE: '2020-05-04 08:35:24',
        //     BOM_VERSION: '191009-03G',
        //     TOTAL_ENTITY: 91,
        //     PASS_ENTITY: 90,
        //     NG_ENTITY: 1,
        //     UNCHECK_ENTITY: 0,
        //     PASS_RATE: 99,
        //     TESTER: '00001',
        //     LOT_AMOUNT: null,
        //     LOT_NO: 'SJ20200504083630030',
        //     CONTENT: 'ok',
        //     LINE_NAME: '一部2楼 SMT4号线',
        //     STATUS: 'Y'
        //   },
        //   {
        //     ID: 'a5aea2e6-6e8d-48fe-bcad-05a31b0aa90f',
        //     RESULT: 'FAIL',
        //     COMPANY: '纯米',
        //     MESHINE: 'RD-IH-FB-K2C(CD)-电源板-客供IGBT-RoHS+5',
        //     SCAN_TIME: '00:01:43',
        //     MAKE_TIME: '00:00:28',
        //     CHECK_TIME: '00:04:11',
        //     TOTAL_TIME: '00:06:22',
        //     GENERATE_CYCLE: null,
        //     CHECK_TYPE: '首件',
        //     CLASS_NAME: 'B班',
        //     BOARD_FACE: 'ALL',
        //     TEST_NO: null,
        //     WO_NO: '5102-20200303033',
        //     LINE_NO: 'SMT5',
        //     PRODUCT_DATE: '2020-04-30 09:38:30',
        //     PRINT_DATE: '2020-04-30 09:38:30',
        //     BOM_VERSION: '191227-03G',
        //     TOTAL_ENTITY: 113,
        //     PASS_ENTITY: 112,
        //     NG_ENTITY: 1,
        //     UNCHECK_ENTITY: 0,
        //     PASS_RATE: 99,
        //     TESTER: '00001',
        //     LOT_AMOUNT: '5005',
        //     LOT_NO: 'SJ20200430093930025',
        //     CONTENT: '更换物料',
        //     LINE_NAME: '一部2楼 SMT5号线',
        //     STATUS: 'Y'
        //   },
        //   {
        //     ID: 'c5d18890-ecb3-4797-9e98-f758ab82e728',
        //     RESULT: 'FAIL',
        //     COMPANY: '苏泊尔',
        //     MESHINE: 'DC-CB2013-Z2-A10405',
        //     SCAN_TIME: '00:02:03',
        //     MAKE_TIME: '00:00:23',
        //     CHECK_TIME: '00:02:22',
        //     TOTAL_TIME: '00:04:48',
        //     GENERATE_CYCLE: null,
        //     CHECK_TYPE: '首件',
        //     CLASS_NAME: 'A班',
        //     BOARD_FACE: 'ALL',
        //     TEST_NO: null,
        //     WO_NO: '5102-20200316028',
        //     LINE_NO: 'SMT-5',
        //     PRODUCT_DATE: '2020-04-05 09:37:41',
        //     PRINT_DATE: '2020-04-05 09:37:41',
        //     BOM_VERSION: '180925-03G',
        //     TOTAL_ENTITY: 102,
        //     PASS_ENTITY: 100,
        //     NG_ENTITY: 0,
        //     UNCHECK_ENTITY: 2,
        //     PASS_RATE: 98,
        //     TESTER: '00001',
        //     LOT_AMOUNT: null,
        //     LOT_NO: 'SJ20200405093830033',
        //     CONTENT: '首件无异常',
        //     LINE_NAME: '一部2楼 SMT5号线',
        //     STATUS: 'Y'
        //   },
        //   {
        //     ID: '615b47bf-a8e0-4ef2-9fee-3a9f11647dd7',
        //     RESULT: 'FAIL',
        //     COMPANY: '苏泊尔',
        //     MESHINE: 'DC-CB2013-Z2-A10403',
        //     SCAN_TIME: '00:01:42',
        //     MAKE_TIME: '00:00:16',
        //     CHECK_TIME: '00:02:29',
        //     TOTAL_TIME: '00:04:27',
        //     GENERATE_CYCLE: null,
        //     CHECK_TYPE: '首件',
        //     CLASS_NAME: 'A班',
        //     BOARD_FACE: 'ALL',
        //     TEST_NO: null,
        //     WO_NO: '5102-20200316028',
        //     LINE_NO: 'SMT-5',
        //     PRODUCT_DATE: '2020-04-03 13:44:40',
        //     PRINT_DATE: '2020-04-03 13:44:40',
        //     BOM_VERSION: '180925-03G',
        //     TOTAL_ENTITY: 102,
        //     PASS_ENTITY: 100,
        //     NG_ENTITY: 0,
        //     UNCHECK_ENTITY: 2,
        //     PASS_RATE: 98,
        //     TESTER: '00001',
        //     LOT_AMOUNT: null,
        //     LOT_NO: 'SJ20200403134600031',
        //     CONTENT: '首件无异常',
        //     LINE_NAME: '一部2楼 SMT5号线',
        //     STATUS: 'Y'
        //   },
        //   {
        //     ID: '8ea73b76-8e0d-4083-8b06-e6c5062d49fc',
        //     RESULT: 'FAIL',
        //     COMPANY: '艾美特',
        //     MESHINE: 'AMT-S30217RI-OEM-夏普-RoHS3021',
        //     SCAN_TIME: '00:02:41',
        //     MAKE_TIME: '00:00:30',
        //     CHECK_TIME: '00:01:00',
        //     TOTAL_TIME: '00:04:11',
        //     GENERATE_CYCLE: null,
        //     CHECK_TYPE: '首件',
        //     CLASS_NAME: 'A班',
        //     BOARD_FACE: 'ALL',
        //     TEST_NO: null,
        //     WO_NO: '5102-20191230043',
        //     LINE_NO: 'SMT-1',
        //     PRODUCT_DATE: '2020-03-22 02:32:00',
        //     PRINT_DATE: '2020-03-22 02:32:00',
        //     BOM_VERSION: '191213-08G',
        //     TOTAL_ENTITY: 80,
        //     PASS_ENTITY: 63,
        //     NG_ENTITY: 0,
        //     UNCHECK_ENTITY: 17,
        //     PASS_RATE: 79,
        //     TESTER: '00001',
        //     LOT_AMOUNT: null,
        //     LOT_NO: 'SJ20200322023300028',
        //     CONTENT: '首件正常',
        //     LINE_NAME: '一部2楼 SMT1号线',
        //     STATUS: 'Y'
        //   },
        //   {
        //     ID: 'f9895e24-0840-49ca-9fcd-344ba0d7d1a8',
        //     RESULT: 'FAIL',
        //     COMPANY: '艾美特',
        //     MESHINE: 'AMT-S30218RI-OEM-夏普-RoHS321',
        //     SCAN_TIME: '00:01:19',
        //     MAKE_TIME: '00:01:14',
        //     CHECK_TIME: '00:01:03',
        //     TOTAL_TIME: '00:03:36',
        //     GENERATE_CYCLE: null,
        //     CHECK_TYPE: '首件',
        //     CLASS_NAME: 'A班',
        //     BOARD_FACE: 'ALL',
        //     TEST_NO: null,
        //     WO_NO: '5102-20191230041',
        //     LINE_NO: 'SMT-1',
        //     PRODUCT_DATE: '2020-03-21 22:45:26',
        //     PRINT_DATE: '2020-03-21 22:45:26',
        //     BOM_VERSION: '191231-08G',
        //     TOTAL_ENTITY: 93,
        //     PASS_ENTITY: 69,
        //     NG_ENTITY: 0,
        //     UNCHECK_ENTITY: 24,
        //     PASS_RATE: 74,
        //     TESTER: '00001',
        //     LOT_AMOUNT: null,
        //     LOT_NO: 'SJ20200321224630016',
        //     CONTENT: '处理结果正常',
        //     LINE_NAME: '一部2楼 SMT1号线',
        //     STATUS: 'Y'
        //   },
        //   {
        //     ID: '60ce091f-2837-489a-86f1-99b3e3546e17',
        //     RESULT: 'FAIL',
        //     COMPANY: '纯米',
        //     MESHINE: 'CM-TK2L-DSPV3-RoHS30017',
        //     SCAN_TIME: '00:01:38',
        //     MAKE_TIME: '00:00:23',
        //     CHECK_TIME: '00:04:42',
        //     TOTAL_TIME: '00:06:43',
        //     GENERATE_CYCLE: null,
        //     CHECK_TYPE: '首件',
        //     CLASS_NAME: 'A班',
        //     BOARD_FACE: 'ALL',
        //     TEST_NO: null,
        //     WO_NO: '5102-20191231079',
        //     LINE_NO: 'SMT-1',
        //     PRODUCT_DATE: '2020-03-17 21:01:14',
        //     PRINT_DATE: '2020-03-17 21:01:14',
        //     BOM_VERSION: '190511-19G',
        //     TOTAL_ENTITY: 154,
        //     PASS_ENTITY: 144,
        //     NG_ENTITY: 0,
        //     UNCHECK_ENTITY: 10,
        //     PASS_RATE: 94,
        //     TESTER: '00001',
        //     LOT_AMOUNT: null,
        //     LOT_NO: 'SJ20200317210230018',
        //     CONTENT: '处理结果正常',
        //     LINE_NAME: '一部2楼 SMT1号线',
        //     STATUS: 'Y'
        //   },
        //   {
        //     ID: '36dcac28-3d31-4d1e-aef4-30a153a6c0f3',
        //     RESULT: 'FAIL',
        //     COMPANY: '苏泊尔',
        //     MESHINE: 'SUPOR-DJ13B-W20E-V02(RoHS)3-7',
        //     SCAN_TIME: '00:01:14',
        //     MAKE_TIME: '00:00:32',
        //     CHECK_TIME: '00:01:21',
        //     TOTAL_TIME: '00:03:07',
        //     GENERATE_CYCLE: null,
        //     CHECK_TYPE: '首件',
        //     CLASS_NAME: 'A班',
        //     BOARD_FACE: 'ALL',
        //     TEST_NO: null,
        //     WO_NO: '5102-20200110026',
        //     LINE_NO: 'SMT4',
        //     PRODUCT_DATE: '2020-03-07 13:45:21',
        //     PRINT_DATE: '2020-03-07 13:45:21',
        //     BOM_VERSION: '171104-10G',
        //     TOTAL_ENTITY: 59,
        //     PASS_ENTITY: 58,
        //     NG_ENTITY: 1,
        //     UNCHECK_ENTITY: 0,
        //     PASS_RATE: 98,
        //     TESTER: '00001',
        //     LOT_AMOUNT: null,
        //     LOT_NO: 'SJ20200307134630025',
        //     CONTENT: 'R501漏打',
        //     LINE_NAME: '一部2楼 SMT4号线',
        //     STATUS: 'Y'
        //   },
        //   {
        //     ID: 'a4bff991-7afe-4de3-afd7-79536397eaf4',
        //     RESULT: 'FAIL',
        //     COMPANY: '纯米',
        //     MESHINE: 'CM-IHFB-CCC-K2C-迭代版-显示板-RoHS3-4',
        //     SCAN_TIME: '00:02:29',
        //     MAKE_TIME: '00:00:46',
        //     CHECK_TIME: '00:05:22',
        //     TOTAL_TIME: '00:08:37',
        //     GENERATE_CYCLE: null,
        //     CHECK_TYPE: '首件',
        //     CLASS_NAME: 'A班',
        //     BOARD_FACE: 'ALL',
        //     TEST_NO: null,
        //     WO_NO: '5102-20191213047',
        //     LINE_NO: 'SMT1',
        //     PRODUCT_DATE: '2020-03-04 08:32:17',
        //     PRINT_DATE: '2020-03-04 08:32:17',
        //     BOM_VERSION: '191226-16G',
        //     TOTAL_ENTITY: 140,
        //     PASS_ENTITY: 139,
        //     NG_ENTITY: 0,
        //     UNCHECK_ENTITY: 1,
        //     PASS_RATE: 99,
        //     TESTER: '00001',
        //     LOT_AMOUNT: null,
        //     LOT_NO: 'SJ20200304083300029',
        //     CONTENT: '灯漏检',
        //     LINE_NAME: '一部2楼 SMT1号线',
        //     STATUS: 'Y'
        //   },
        //   {
        //     ID: 'b658f6ce-edea-4b68-8bf8-a3e3653d6a1c',
        //     RESULT: 'PASS',
        //     COMPANY: '美杨',
        //     MESHINE: 'MY-SW50S56AD(220V)-RoHS12-23',
        //     SCAN_TIME: '00:01:25',
        //     MAKE_TIME: '00:00:37',
        //     CHECK_TIME: '00:00:11',
        //     TOTAL_TIME: '00:02:13',
        //     GENERATE_CYCLE: null,
        //     CHECK_TYPE: '首件',
        //     CLASS_NAME: 'A班',
        //     BOARD_FACE: 'ALL',
        //     TEST_NO: null,
        //     WO_NO: '5102-20191104081',
        //     LINE_NO: 'SMT1',
        //     PRODUCT_DATE: '2019-12-23 16:51:38',
        //     PRINT_DATE: '2019-12-23 16:51:38',
        //     BOM_VERSION: '190909-03G',
        //     TOTAL_ENTITY: 37,
        //     PASS_ENTITY: 36,
        //     NG_ENTITY: 1,
        //     UNCHECK_ENTITY: 0,
        //     PASS_RATE: 97,
        //     TESTER: '00001',
        //     LOT_AMOUNT: null,
        //     LOT_NO: 'SJ20191223172830023',
        //     CONTENT: '处理结果正常',
        //     LINE_NAME: '一部2楼 SMT1号线',
        //     STATUS: 'Y'
        //   },
        //   {
        //     ID: '321df194-1d37-462e-bd73-3bcfb10883c2',
        //     RESULT: 'PASS',
        //     COMPANY: '苏泊尔',
        //     MESHINE: 'SY-50FH33Q-DL01(RoHS)12-22',
        //     SCAN_TIME: '00:01:45',
        //     MAKE_TIME: '00:00:38',
        //     CHECK_TIME: '00:09:24',
        //     TOTAL_TIME: '00:11:47',
        //     GENERATE_CYCLE: null,
        //     CHECK_TYPE: '首件',
        //     CLASS_NAME: 'A班',
        //     BOARD_FACE: 'ALL',
        //     TEST_NO: null,
        //     WO_NO: '5102-20191113050',
        //     LINE_NO: 'SMT4',
        //     PRODUCT_DATE: '2019-12-22 09:15:00',
        //     PRINT_DATE: '2019-12-22 09:15:00',
        //     BOM_VERSION: '181128-02G',
        //     TOTAL_ENTITY: 90,
        //     PASS_ENTITY: 88,
        //     NG_ENTITY: 2,
        //     UNCHECK_ENTITY: 0,
        //     PASS_RATE: 98,
        //     TESTER: '00001',
        //     LOT_AMOUNT: null,
        //     LOT_NO: 'SJ20191222091600025',
        //     CONTENT: 'OK',
        //     LINE_NAME: '一部2楼 SMT4号线',
        //     STATUS: 'Y'
        //   },
        //   {
        //     ID: '5bb08029-bc8d-40c0-aacc-11e405d0e769',
        //     RESULT: 'FAIL',
        //     COMPANY: '智米',
        //     MESHINE: 'ZMZ-S4-P-V2(RoHS)12-18',
        //     SCAN_TIME: '00:02:49',
        //     MAKE_TIME: '00:00:54',
        //     CHECK_TIME: '00:01:23',
        //     TOTAL_TIME: '00:05:06',
        //     GENERATE_CYCLE: null,
        //     CHECK_TYPE: '首件',
        //     CLASS_NAME: 'A班',
        //     BOARD_FACE: 'ALL',
        //     TEST_NO: null,
        //     WO_NO: '5102-20191126066',
        //     LINE_NO: 'SMT4',
        //     PRODUCT_DATE: '2019-12-18 13:40:19',
        //     PRINT_DATE: '2019-12-18 13:40:19',
        //     BOM_VERSION: '191021-05G',
        //     TOTAL_ENTITY: 107,
        //     PASS_ENTITY: 105,
        //     NG_ENTITY: 2,
        //     UNCHECK_ENTITY: 0,
        //     PASS_RATE: 98,
        //     TESTER: '00001',
        //     LOT_AMOUNT: null,
        //     LOT_NO: 'SJ20191218134130022',
        //     CONTENT: '处理结果正常',
        //     LINE_NAME: '一部2楼 SMT4号线',
        //     STATUS: 'Y'
        //   },
        //   {
        //     ID: '6ea77735-e354-4c46-8a1e-ae49261a1aa6',
        //     RESULT: 'FAIL',
        //     COMPANY: '苏泊尔',
        //     MESHINE: 'SY-50HC35Q-DL01(RoHS)1109',
        //     SCAN_TIME: '00:01:14',
        //     MAKE_TIME: '00:00:28',
        //     CHECK_TIME: '00:02:15',
        //     TOTAL_TIME: '00:03:57',
        //     GENERATE_CYCLE: null,
        //     CHECK_TYPE: '首件',
        //     CLASS_NAME: 'A班',
        //     BOARD_FACE: 'ALL',
        //     TEST_NO: '190419-06G',
        //     WO_NO: '20190826027',
        //     LINE_NO: 'SMT-5',
        //     PRODUCT_DATE: '2019-11-10 03:45:03',
        //     PRINT_DATE: '2019-11-10 03:45:03',
        //     BOM_VERSION: null,
        //     TOTAL_ENTITY: 90,
        //     PASS_ENTITY: 89,
        //     NG_ENTITY: 0,
        //     UNCHECK_ENTITY: 1,
        //     PASS_RATE: 99,
        //     TESTER: '00001',
        //     LOT_AMOUNT: null,
        //     LOT_NO: 'SJ20191110034600025',
        //     CONTENT: 'ok',
        //     LINE_NAME: '一部2楼 SMT5号线',
        //     STATUS: 'Y'
        //   },
        //   {
        //     ID: '59a7982e-89d6-4db4-b415-469383d5f0fb',
        //     RESULT: 'PASS',
        //     COMPANY: '苏泊尔',
        //     MESHINE: 'SUPOR-DJ13B-P80-V02(RoHS)11-2',
        //     SCAN_TIME: '00:01:53',
        //     MAKE_TIME: '00:00:58',
        //     CHECK_TIME: '00:01:44',
        //     TOTAL_TIME: '00:04:35',
        //     GENERATE_CYCLE: null,
        //     CHECK_TYPE: '首件',
        //     CLASS_NAME: 'A班',
        //     BOARD_FACE: 'ALL',
        //     TEST_NO: null,
        //     WO_NO: '20191021037',
        //     LINE_NO: 'SMT4',
        //     PRODUCT_DATE: '2019-11-02 22:58:04',
        //     PRINT_DATE: '2019-11-02 22:58:04',
        //     BOM_VERSION: '171104-11G',
        //     TOTAL_ENTITY: 59,
        //     PASS_ENTITY: 55,
        //     NG_ENTITY: 4,
        //     UNCHECK_ENTITY: 0,
        //     PASS_RATE: 93,
        //     TESTER: '00001',
        //     LOT_AMOUNT: null,
        //     LOT_NO: 'SJ20191102225900023',
        //     CONTENT: 'ok',
        //     LINE_NAME: '一部2楼 SMT4号线',
        //     STATUS: 'Y'
        //   }
      ]
    }
  }
}
</script>

<style>
</style>
