<template>
  <div class="AiAndRiReport">
    <div class="layui-container">
      <div class="layui-row kanban-title">
        <div class="layui-col-md1"
             style="height: 100%;">
          &nbsp;
        </div>
        <div class="layui-col-md10"
             style="height: 100%;">
          <div class="kanban-title-panel">
            {{ $t("AiAndRiReport._1") }}
          </div>
        </div>
        <div class="layui-col-md1"
             style="text-align:center;height: 100%;line-height: 50px;">
          <span class="screen-span">
            <a href="javascript:void(0)"
               @click="$options.fs.fullScreen.handleFullScreen(this)"
               style="color:#00ffff;font-size:16px;z-index:999">{{ $t("AiAndRiReport._2") }}</a>
          </span>
        </div>
      </div>
      <div class="kanban-content layui-row">
        <div class="swiper-container"
             style="height:100%;padding:0px;"
             id="swiper_mst">
          <div class="swiper-wrapper"
               id="mainSwiper"
               v-html="mainSwiper">

          </div>
          <!-- Add Pagination -->
          <div class="swiper-pagination"
               id="swiper_p_mst"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Swiper from 'swiper'
import 'swiper/css/swiper.css'
import echarts from 'echarts'
const fs = {
  // 全屏 类
  fullScreen: (function () {
    var isFullScreen = false
    var requestFullScreen = function () { // 全屏
      var de = document.documentElement
      if (de.requestFullscreen) {
        de.requestFullscreen()
      } else if (de.mozRequestFullScreen) {
        de.mozRequestFullScreen()
      } else if (de.webkitRequestFullScreen) {
        de.webkitRequestFullScreen()
      } else {
        alert(this.$t('pdl.ns'))
      }
    }
    // 退出全屏 判断浏览器种类
    var exitFull = function () {
      // 判断各种浏览器，找到正确的方法
      var exitMethod = document.exitFullscreen || // W3C
        document.mozCancelFullScreen || // Chrome等
        document.webkitExitFullscreen || // FireFox
        document.webkitExitFullscreen // IE11
      if (exitMethod) {
        exitMethod.call(document)
      } else if (typeof window.ActiveXObject !== 'undefined') { // for Internet Explorer
        // eslint-disable-next-line
        var wscript = new ActiveXObject('WScript.Shell')
        if (wscript !== null) {
          wscript.SendKeys('{F11}')
        }
      }
    }

    return {
      handleFullScreen: function ($this) {
        if (isFullScreen) {
          exitFull()
          isFullScreen = false
        } else {
          requestFullScreen()
          isFullScreen = true
        }
      }
    }
  }())
}
var page = {}
page.LINES = []
page.SwiperIndex = 0
page.NAMES = ['WoPassRate_', 'WorkPassRate_', 'FirstPassRate_', 'HourYieldBar_', 'ExLineDateBar_']
page.HourYieldList = {}
page.PicBarList = {}

export default {
  fs,
  name: 'AiAndRiReport',
  data () {
    return {
      dataList: [
        {
          'LINE_ID': 83,
          'LINE_NAME': '一部2楼 卧式2号线',
          'WO_NO': '5104-20200507060',
          'PART_NO': '211100421010',
          'PART_DESC': 'SUPOR-DJ12B-Y58E-A(R',
          'WO_PASS_RATE': 31.43,
          'WO_TOTAL_QTY': 19970,
          'WO_PASS_QTY': 6276,
          'WORK_PASS_RATE': 0,
          'WORK_PASS_QTY': 174,
          'WORK_TOTAL_QTY': 0,
          'FIRST_PASS_RATE': 100,
          'FIRST_PASS_QTY': 0,
          'FIRST_TOTAL_QTY': 0,
          'CHECK_RESULT': {
            'CHECK_QTY': 0,
            'FAIL_QTY': 0,
            'LINE_TYPE': null,
            'LINE_ID': 0,
            'WO_NO': null,
            'DetailData': null
          },
          'HOUR_YIDLD_RESULT': [
            {
              'ID': 29362,
              'LINE_TYPE': 'SMT',
              'OPERATION_LINE_ID': 83,
              'WO_NO': '5104-20200507060',
              'PCB_SIDE': 1,
              'PART_NO': '211100421010',
              'WORK_TIME': '2020-06-10 06:00:00',
              'OUTPUT_QTY': 363,
              'STANDARD_CAPACITY': 296,
              'STANDARD_CAPACITY_WORK': 296,
              'VALUE_MAX': 326,
              'VALUE_MIN': 266,
              'CURRENT_HOUR': 'N',
              'REPORT_ID': 26647,
              'REPORT_NO': '200610070025257515',
              'STANDARD_CAPACITY_MINUTE': 296,
              'DTL_ID': 847929,
              'DTL_TYPE': 0,
              'DTL_MINUTES': 60,
              'DTL_START_MINUTE': 0,
              'DTL_END_MINUTE': 60,
              'REPORT_CONTENT': '产能超标',
              'REASON': '无异常',
              'STATUS': 2
            },
            {
              'ID': 29401,
              'LINE_TYPE': 'SMT',
              'OPERATION_LINE_ID': 83,
              'WO_NO': '5104-20200507060',
              'PCB_SIDE': 1,
              'PART_NO': '211100421010',
              'WORK_TIME': '2020-06-10 07:00:00',
              'OUTPUT_QTY': 351,
              'STANDARD_CAPACITY': 296,
              'STANDARD_CAPACITY_WORK': 296,
              'VALUE_MAX': 326,
              'VALUE_MIN': 266,
              'CURRENT_HOUR': 'N',
              'REPORT_ID': 26686,
              'REPORT_NO': '200610080128860567',
              'STANDARD_CAPACITY_MINUTE': 296,
              'DTL_ID': 849237,
              'DTL_TYPE': 0,
              'DTL_MINUTES': 60,
              'DTL_START_MINUTE': 0,
              'DTL_END_MINUTE': 60,
              'REPORT_CONTENT': '产能超标',
              'REASON': '打扫卫生，转班',
              'STATUS': 2
            },
            {
              'ID': 29439,
              'LINE_TYPE': 'SMT',
              'OPERATION_LINE_ID': 83,
              'WO_NO': '5104-20200507060',
              'PCB_SIDE': 1,
              'PART_NO': '211100421010',
              'WORK_TIME': '2020-06-10 08:00:00',
              'OUTPUT_QTY': 96,
              'STANDARD_CAPACITY': 296,
              'STANDARD_CAPACITY_WORK': 296,
              'VALUE_MAX': 326,
              'VALUE_MIN': 266,
              'CURRENT_HOUR': 'N',
              'REPORT_ID': 26730,
              'REPORT_NO': '200610090132467179',
              'STANDARD_CAPACITY_MINUTE': 296,
              'DTL_ID': 850350,
              'DTL_TYPE': 0,
              'DTL_MINUTES': 60,
              'DTL_START_MINUTE': 0,
              'DTL_END_MINUTE': 60,
              'REPORT_CONTENT': '产能不达标',
              'REASON': '一个人开两台机，忙不过来',
              'STATUS': 2
            },
            {
              'ID': 29482,
              'LINE_TYPE': 'SMT',
              'OPERATION_LINE_ID': 83,
              'WO_NO': '5104-20200507060',
              'PCB_SIDE': 1,
              'PART_NO': '211100421010',
              'WORK_TIME': '2020-06-10 09:00:00',
              'OUTPUT_QTY': 39,
              'STANDARD_CAPACITY': 296,
              'STANDARD_CAPACITY_WORK': 296,
              'VALUE_MAX': 326,
              'VALUE_MIN': 266,
              'CURRENT_HOUR': 'N',
              'REPORT_ID': 26774,
              'REPORT_NO': '200610100136078158',
              'STANDARD_CAPACITY_MINUTE': 296,
              'DTL_ID': 851572,
              'DTL_TYPE': 0,
              'DTL_MINUTES': 60,
              'DTL_START_MINUTE': 0,
              'DTL_END_MINUTE': 60,
              'REPORT_CONTENT': '产能不达标',
              'REASON': null,
              'STATUS': 0
            },
            {
              'ID': 29550,
              'LINE_TYPE': 'SMT',
              'OPERATION_LINE_ID': 83,
              'WO_NO': '5104-20200507060',
              'PCB_SIDE': 1,
              'PART_NO': '211100421010',
              'WORK_TIME': '2020-06-10 10:00:00',
              'OUTPUT_QTY': 39,
              'STANDARD_CAPACITY': 296,
              'STANDARD_CAPACITY_WORK': 296,
              'VALUE_MAX': 326,
              'VALUE_MIN': 266,
              'CURRENT_HOUR': 'Y',
              'REPORT_ID': null,
              'REPORT_NO': null,
              'STANDARD_CAPACITY_MINUTE': 296,
              'DTL_ID': 852548,
              'DTL_TYPE': 0,
              'DTL_MINUTES': 60,
              'DTL_START_MINUTE': 0,
              'DTL_END_MINUTE': 60,
              'REPORT_CONTENT': null,
              'REASON': null,
              'STATUS': -2
            }
          ],
          'CHANGE_LINE_RESULT': [
            {
              'ID': 63736,
              'LINE_TYPE': 'SMT',
              'LINE_ID': 83,
              'LINE_NAME': null,
              'PRE_WO_NO': '5104-20200509056',
              'PRE_PCB_SIDE': 1,
              'PRE_START_TIME': '2020-06-04 19:57:53',
              'PRE_END_TIME': '2020-06-04 23:28:06',
              'NEXT_WO_NO': '5104-20200515076',
              'NEXT_PCB_SIDE': 1,
              'NEXT_START_TIME': '2020-06-05 01:11:12',
              'NEXT_END_TIME': '2020-06-05 05:12:01',
              'TAKING_TIME': 103,
              'VALUE_MIN': 20,
              'VALUE_MAX': 40,
              'REPORT_ID': null,
              'REPORT_NO': null,
              'ADD_TIME': '2020-06-05 01:11:12',
              'DESCRIPTION': null,
              'TimeValue': [
                [
                  0,
                  0,
                  71,
                  71,
                  1
                ],
                [
                  0,
                  71,
                  1440,
                  1369,
                  0
                ],
                [
                  0,
                  71,
                  312,
                  241,
                  0
                ],
                [
                  0,
                  312,
                  572,
                  260,
                  1
                ],
                [
                  1,
                  0,
                  1440,
                  1440,
                  0
                ],
                [
                  2,
                  1,
                  929,
                  928,
                  0
                ],
                [
                  2,
                  929,
                  968,
                  39,
                  1
                ],
                [
                  2,
                  968,
                  1440,
                  472,
                  0
                ],
                [
                  3,
                  0,
                  434,
                  434,
                  0
                ],
                [
                  3,
                  434,
                  649,
                  215,
                  1
                ],
                [
                  3,
                  649,
                  877,
                  228,
                  0
                ],
                [
                  3,
                  877,
                  1102,
                  225,
                  1
                ],
                [
                  3,
                  1102,
                  1440,
                  338,
                  0
                ],
                [
                  4,
                  0,
                  91,
                  91,
                  0
                ],
                [
                  4,
                  91,
                  113,
                  22,
                  1
                ],
                [
                  4,
                  113,
                  1440,
                  1327,
                  0
                ]
              ]
            },
            {
              'ID': 63746,
              'LINE_TYPE': 'SMT',
              'LINE_ID': 83,
              'LINE_NAME': null,
              'PRE_WO_NO': '5104-20200515076',
              'PRE_PCB_SIDE': 1,
              'PRE_START_TIME': '2020-06-05 01:11:12',
              'PRE_END_TIME': '2020-06-05 05:12:01',
              'NEXT_WO_NO': '5104-20200515086',
              'NEXT_PCB_SIDE': 1,
              'NEXT_START_TIME': '2020-06-05 09:32:18',
              'NEXT_END_TIME': '2020-06-05 19:41:31',
              'TAKING_TIME': 260,
              'VALUE_MIN': 20,
              'VALUE_MAX': 40,
              'REPORT_ID': null,
              'REPORT_NO': null,
              'ADD_TIME': '2020-06-05 09:32:18',
              'DESCRIPTION': '夜班没上mes',
              'TimeValue': null
            },
            {
              'ID': 63806,
              'LINE_TYPE': 'SMT',
              'LINE_ID': 83,
              'LINE_NAME': null,
              'PRE_WO_NO': '5104-20200515039',
              'PRE_PCB_SIDE': 1,
              'PRE_START_TIME': '2020-06-07 00:01:54',
              'PRE_END_TIME': '2020-06-07 15:29:22',
              'NEXT_WO_NO': '5104-20200515037',
              'NEXT_PCB_SIDE': 1,
              'NEXT_START_TIME': '2020-06-07 16:08:50',
              'NEXT_END_TIME': '2020-06-08 07:14:15',
              'TAKING_TIME': 39,
              'VALUE_MIN': 20,
              'VALUE_MAX': 40,
              'REPORT_ID': null,
              'REPORT_NO': null,
              'ADD_TIME': '2020-06-07 16:08:50',
              'DESCRIPTION': '监控与实际不符',
              'TimeValue': null
            },
            {
              'ID': 63818,
              'LINE_TYPE': 'SMT',
              'LINE_ID': 83,
              'LINE_NAME': null,
              'PRE_WO_NO': '5104-20200515037',
              'PRE_PCB_SIDE': 1,
              'PRE_START_TIME': '2020-06-07 16:08:50',
              'PRE_END_TIME': '2020-06-08 07:14:15',
              'NEXT_WO_NO': '5104-20200515077',
              'NEXT_PCB_SIDE': 1,
              'NEXT_START_TIME': '2020-06-08 10:49:53',
              'NEXT_END_TIME': '2020-06-08 14:37:43',
              'TAKING_TIME': 216,
              'VALUE_MIN': 20,
              'VALUE_MAX': 40,
              'REPORT_ID': null,
              'REPORT_NO': null,
              'ADD_TIME': '2020-06-08 10:49:53',
              'DESCRIPTION': '数据不符实际转机时间9点12分对9点27分，mes系统有条线经常松导致数据经常与实际不符已向工程多次反馈更换',
              'TimeValue': null
            },
            {
              'ID': 63828,
              'LINE_TYPE': 'SMT',
              'LINE_ID': 83,
              'LINE_NAME': null,
              'PRE_WO_NO': '5104-20200515077',
              'PRE_PCB_SIDE': 1,
              'PRE_START_TIME': '2020-06-08 10:49:53',
              'PRE_END_TIME': '2020-06-08 14:37:43',
              'NEXT_WO_NO': '5104-20200523074',
              'NEXT_PCB_SIDE': 1,
              'NEXT_START_TIME': '2020-06-08 18:22:43',
              'NEXT_END_TIME': '2020-06-09 01:31:50',
              'TAKING_TIME': 225,
              'VALUE_MIN': 20,
              'VALUE_MAX': 40,
              'REPORT_ID': null,
              'REPORT_NO': null,
              'ADD_TIME': '2020-06-08 18:22:43',
              'DESCRIPTION': '打了一款跳线板，打到18点07分转机',
              'TimeValue': null
            },
            {
              'ID': 63840,
              'LINE_TYPE': 'SMT',
              'LINE_ID': 83,
              'LINE_NAME': null,
              'PRE_WO_NO': '5104-20200523074',
              'PRE_PCB_SIDE': 1,
              'PRE_START_TIME': '2020-06-08 18:22:43',
              'PRE_END_TIME': '2020-06-09 01:31:50',
              'NEXT_WO_NO': '5104-20200507060',
              'NEXT_PCB_SIDE': 1,
              'NEXT_START_TIME': '2020-06-09 01:53:18',
              'NEXT_END_TIME': null,
              'TAKING_TIME': 21,
              'VALUE_MIN': 20,
              'VALUE_MAX': 40,
              'REPORT_ID': null,
              'REPORT_NO': null,
              'ADD_TIME': '2020-06-09 01:53:18',
              'DESCRIPTION': null,
              'TimeValue': null
            }
          ]
        },
        {
          'LINE_ID': 84,
          'LINE_NAME': '一部2楼 立式1号线',
          'WO_NO': '5104-20200515039',
          'PART_NO': '211100561000',
          'PART_DESC': 'SUPOR-DJ12B-P18E(RoH',
          'WO_PASS_RATE': 94.67,
          'WO_TOTAL_QTY': 5688,
          'WO_PASS_QTY': 5385,
          'WORK_PASS_RATE': 58.09,
          'WORK_PASS_QTY': 876,
          'WORK_TOTAL_QTY': 1508,
          'FIRST_PASS_RATE': 100,
          'FIRST_PASS_QTY': 0,
          'FIRST_TOTAL_QTY': 0,
          'CHECK_RESULT': {
            'CHECK_QTY': 0,
            'FAIL_QTY': 0,
            'LINE_TYPE': null,
            'LINE_ID': 0,
            'WO_NO': null,
            'DetailData': null
          },
          'HOUR_YIDLD_RESULT': [
            {
              'ID': 29384,
              'LINE_TYPE': 'SMT',
              'OPERATION_LINE_ID': 84,
              'WO_NO': '5104-20200515039',
              'PCB_SIDE': 1,
              'PART_NO': '211100561000',
              'WORK_TIME': '2020-06-10 06:00:00',
              'OUTPUT_QTY': 213,
              'STANDARD_CAPACITY': 374,
              'STANDARD_CAPACITY_WORK': 374,
              'VALUE_MAX': 411,
              'VALUE_MIN': 337,
              'CURRENT_HOUR': 'N',
              'REPORT_ID': 26648,
              'REPORT_NO': '200610070025257878',
              'STANDARD_CAPACITY_MINUTE': 374,
              'DTL_ID': 847931,
              'DTL_TYPE': 0,
              'DTL_MINUTES': 60,
              'DTL_START_MINUTE': 0,
              'DTL_END_MINUTE': 60,
              'REPORT_CONTENT': '产能不达标',
              'REASON': '搞卫生',
              'STATUS': 2
            },
            {
              'ID': 29402,
              'LINE_TYPE': 'SMT',
              'OPERATION_LINE_ID': 84,
              'WO_NO': '5104-20200515039',
              'PCB_SIDE': 1,
              'PART_NO': '211100561000',
              'WORK_TIME': '2020-06-10 07:00:00',
              'OUTPUT_QTY': 249,
              'STANDARD_CAPACITY': 374,
              'STANDARD_CAPACITY_WORK': 374,
              'VALUE_MAX': 411,
              'VALUE_MIN': 337,
              'CURRENT_HOUR': 'N',
              'REPORT_ID': 26687,
              'REPORT_NO': '200610080128861621',
              'STANDARD_CAPACITY_MINUTE': 374,
              'DTL_ID': 849239,
              'DTL_TYPE': 0,
              'DTL_MINUTES': 60,
              'DTL_START_MINUTE': 0,
              'DTL_END_MINUTE': 60,
              'REPORT_CONTENT': '产能不达标',
              'REASON': '交接班',
              'STATUS': 2
            },
            {
              'ID': 29454,
              'LINE_TYPE': 'SMT',
              'OPERATION_LINE_ID': 84,
              'WO_NO': '5104-20200515039',
              'PCB_SIDE': 1,
              'PART_NO': '211100561000',
              'WORK_TIME': '2020-06-10 08:00:00',
              'OUTPUT_QTY': 342,
              'STANDARD_CAPACITY': 374,
              'STANDARD_CAPACITY_WORK': 374,
              'VALUE_MAX': 411,
              'VALUE_MIN': 337,
              'CURRENT_HOUR': 'N',
              'REPORT_ID': 26731,
              'REPORT_NO': '200610090132468818',
              'STANDARD_CAPACITY_MINUTE': 374,
              'DTL_ID': 850352,
              'DTL_TYPE': 0,
              'DTL_MINUTES': 60,
              'DTL_START_MINUTE': 0,
              'DTL_END_MINUTE': 60,
              'REPORT_CONTENT': '产能正常',
              'REASON': null,
              'STATUS': -1
            },
            {
              'ID': 29483,
              'LINE_TYPE': 'SMT',
              'OPERATION_LINE_ID': 84,
              'WO_NO': '5104-20200515039',
              'PCB_SIDE': 1,
              'PART_NO': '211100561000',
              'WORK_TIME': '2020-06-10 09:00:00',
              'OUTPUT_QTY': 255,
              'STANDARD_CAPACITY': 374,
              'STANDARD_CAPACITY_WORK': 374,
              'VALUE_MAX': 411,
              'VALUE_MIN': 337,
              'CURRENT_HOUR': 'N',
              'REPORT_ID': 26775,
              'REPORT_NO': '200610100136078890',
              'STANDARD_CAPACITY_MINUTE': 374,
              'DTL_ID': 851573,
              'DTL_TYPE': 0,
              'DTL_MINUTES': 60,
              'DTL_START_MINUTE': 0,
              'DTL_END_MINUTE': 60,
              'REPORT_CONTENT': '产能不达标',
              'REASON': '报警未及时处理',
              'STATUS': 2
            },
            {
              'ID': 29529,
              'LINE_TYPE': 'SMT',
              'OPERATION_LINE_ID': 84,
              'WO_NO': '5104-20200515039',
              'PCB_SIDE': 1,
              'PART_NO': '211100561000',
              'WORK_TIME': '2020-06-10 10:00:00',
              'OUTPUT_QTY': 279,
              'STANDARD_CAPACITY': 374,
              'STANDARD_CAPACITY_WORK': 374,
              'VALUE_MAX': 411,
              'VALUE_MIN': 337,
              'CURRENT_HOUR': 'Y',
              'REPORT_ID': null,
              'REPORT_NO': null,
              'STANDARD_CAPACITY_MINUTE': 374,
              'DTL_ID': 852549,
              'DTL_TYPE': 0,
              'DTL_MINUTES': 60,
              'DTL_START_MINUTE': 0,
              'DTL_END_MINUTE': 60,
              'REPORT_CONTENT': null,
              'REASON': null,
              'STATUS': -2
            }
          ],
          'CHANGE_LINE_RESULT': [
            {
              'ID': 63734,
              'LINE_TYPE': 'SMT',
              'LINE_ID': 84,
              'LINE_NAME': null,
              'PRE_WO_NO': '5104-20200408012',
              'PRE_PCB_SIDE': 1,
              'PRE_START_TIME': '2020-06-04 14:56:32',
              'PRE_END_TIME': '2020-06-04 20:29:51',
              'NEXT_WO_NO': '5104-20200513003',
              'NEXT_PCB_SIDE': 1,
              'NEXT_START_TIME': '2020-06-04 22:15:06',
              'NEXT_END_TIME': '2020-06-05 08:10:22',
              'TAKING_TIME': 105,
              'VALUE_MIN': 20,
              'VALUE_MAX': 40,
              'REPORT_ID': null,
              'REPORT_NO': null,
              'ADD_TIME': '2020-06-04 22:15:06',
              'DESCRIPTION': null,
              'TimeValue': [
                [
                  0,
                  0,
                  490,
                  490,
                  0
                ],
                [
                  0,
                  490,
                  552,
                  62,
                  1
                ],
                [
                  0,
                  552,
                  1440,
                  888,
                  0
                ],
                [
                  1,
                  0,
                  1440,
                  1440,
                  0
                ],
                [
                  2,
                  0,
                  1093,
                  1093,
                  0
                ],
                [
                  2,
                  1093,
                  1421,
                  328,
                  1
                ],
                [
                  2,
                  1421,
                  1440,
                  19,
                  0
                ],
                [
                  3,
                  0,
                  1440,
                  1440,
                  0
                ],
                [
                  4,
                  0,
                  182,
                  182,
                  0
                ],
                [
                  4,
                  182,
                  197,
                  15,
                  1
                ],
                [
                  4,
                  197,
                  369,
                  172,
                  0
                ],
                [
                  4,
                  369,
                  373,
                  4,
                  1
                ],
                [
                  4,
                  373,
                  569,
                  196,
                  0
                ],
                [
                  4,
                  569,
                  588,
                  19,
                  1
                ],
                [
                  4,
                  588,
                  892,
                  304,
                  0
                ],
                [
                  4,
                  892,
                  919,
                  27,
                  1
                ],
                [
                  4,
                  919,
                  1440,
                  521,
                  0
                ]
              ]
            },
            {
              'ID': 63745,
              'LINE_TYPE': 'SMT',
              'LINE_ID': 84,
              'LINE_NAME': null,
              'PRE_WO_NO': '5104-20200513003',
              'PRE_PCB_SIDE': 1,
              'PRE_START_TIME': '2020-06-04 22:15:06',
              'PRE_END_TIME': '2020-06-05 08:10:22',
              'NEXT_WO_NO': '5104-20200520048',
              'NEXT_PCB_SIDE': 1,
              'NEXT_START_TIME': '2020-06-05 09:12:53',
              'NEXT_END_TIME': '2020-06-07 18:13:40',
              'TAKING_TIME': 63,
              'VALUE_MIN': 20,
              'VALUE_MAX': 40,
              'REPORT_ID': null,
              'REPORT_NO': null,
              'ADD_TIME': '2020-06-05 09:12:53',
              'DESCRIPTION': '调机46分钟',
              'TimeValue': null
            },
            {
              'ID': 63811,
              'LINE_TYPE': 'SMT',
              'LINE_ID': 84,
              'LINE_NAME': null,
              'PRE_WO_NO': '5104-20200520048',
              'PRE_PCB_SIDE': 1,
              'PRE_START_TIME': '2020-06-05 09:12:53',
              'PRE_END_TIME': '2020-06-07 18:13:40',
              'NEXT_WO_NO': '5104-20200515078',
              'NEXT_PCB_SIDE': 1,
              'NEXT_START_TIME': '2020-06-07 23:41:01',
              'NEXT_END_TIME': '2020-06-09 03:02:16',
              'TAKING_TIME': 327,
              'VALUE_MIN': 20,
              'VALUE_MAX': 40,
              'REPORT_ID': null,
              'REPORT_NO': null,
              'ADD_TIME': '2020-06-07 23:41:01',
              'DESCRIPTION': '系统异常，实际用时40分钟，出现卡机实际没有那么久',
              'TimeValue': null
            },
            {
              'ID': 63845,
              'LINE_TYPE': 'SMT',
              'LINE_ID': 84,
              'LINE_NAME': null,
              'PRE_WO_NO': '5104-20200515078',
              'PRE_PCB_SIDE': 1,
              'PRE_START_TIME': '2020-06-07 23:41:01',
              'PRE_END_TIME': '2020-06-09 03:02:16',
              'NEXT_WO_NO': '5104-20200515077',
              'NEXT_PCB_SIDE': 1,
              'NEXT_START_TIME': '2020-06-09 03:17:16',
              'NEXT_END_TIME': '2020-06-09 06:09:45',
              'TAKING_TIME': 15,
              'VALUE_MIN': 20,
              'VALUE_MAX': 40,
              'REPORT_ID': null,
              'REPORT_NO': null,
              'ADD_TIME': '2020-06-09 03:17:16',
              'DESCRIPTION': null,
              'TimeValue': null
            },
            {
              'ID': 63854,
              'LINE_TYPE': 'SMT',
              'LINE_ID': 84,
              'LINE_NAME': null,
              'PRE_WO_NO': '5104-20200515077',
              'PRE_PCB_SIDE': 1,
              'PRE_START_TIME': '2020-06-09 03:17:16',
              'PRE_END_TIME': '2020-06-09 06:09:45',
              'NEXT_WO_NO': '5104-20200515085',
              'NEXT_PCB_SIDE': 1,
              'NEXT_START_TIME': '2020-06-09 06:13:32',
              'NEXT_END_TIME': '2020-06-09 09:29:53',
              'TAKING_TIME': 4,
              'VALUE_MIN': 20,
              'VALUE_MAX': 40,
              'REPORT_ID': null,
              'REPORT_NO': null,
              'ADD_TIME': '2020-06-09 06:13:32',
              'DESCRIPTION': null,
              'TimeValue': null
            },
            {
              'ID': 63863,
              'LINE_TYPE': 'SMT',
              'LINE_ID': 84,
              'LINE_NAME': null,
              'PRE_WO_NO': '5104-20200515085',
              'PRE_PCB_SIDE': 1,
              'PRE_START_TIME': '2020-06-09 06:13:32',
              'PRE_END_TIME': '2020-06-09 09:29:53',
              'NEXT_WO_NO': '5104-20200601037',
              'NEXT_PCB_SIDE': 1,
              'NEXT_START_TIME': '2020-06-09 09:48:37',
              'NEXT_END_TIME': '2020-06-09 14:52:51',
              'TAKING_TIME': 19,
              'VALUE_MIN': 20,
              'VALUE_MAX': 40,
              'REPORT_ID': null,
              'REPORT_NO': null,
              'ADD_TIME': '2020-06-09 09:48:37',
              'DESCRIPTION': null,
              'TimeValue': null
            },
            {
              'ID': 63878,
              'LINE_TYPE': 'SMT',
              'LINE_ID': 84,
              'LINE_NAME': null,
              'PRE_WO_NO': '5104-20200601037',
              'PRE_PCB_SIDE': 1,
              'PRE_START_TIME': '2020-06-09 09:48:37',
              'PRE_END_TIME': '2020-06-09 14:52:51',
              'NEXT_WO_NO': '5104-20200515039',
              'NEXT_PCB_SIDE': 1,
              'NEXT_START_TIME': '2020-06-09 15:19:38',
              'NEXT_END_TIME': null,
              'TAKING_TIME': 27,
              'VALUE_MIN': 20,
              'VALUE_MAX': 40,
              'REPORT_ID': null,
              'REPORT_NO': null,
              'ADD_TIME': '2020-06-09 15:19:38',
              'DESCRIPTION': null,
              'TimeValue': null
            }
          ]
        },
        {
          'LINE_ID': 5589,
          'LINE_NAME': '一部2楼 立式2号线',
          'WO_NO': '5104-20200507094',
          'PART_NO': '266100371000',
          'PART_DESC': 'SUPOR-SP525-A(RoHS)',
          'WO_PASS_RATE': 79.31,
          'WO_TOTAL_QTY': 16130,
          'WO_PASS_QTY': 12792,
          'WORK_PASS_RATE': 7.55,
          'WORK_PASS_QTY': 765,
          'WORK_TOTAL_QTY': 10126,
          'FIRST_PASS_RATE': 100,
          'FIRST_PASS_QTY': 0,
          'FIRST_TOTAL_QTY': 0,
          'CHECK_RESULT': {
            'CHECK_QTY': 0,
            'FAIL_QTY': 0,
            'LINE_TYPE': null,
            'LINE_ID': 0,
            'WO_NO': null,
            'DetailData': null
          },
          'HOUR_YIDLD_RESULT': [
            {
              'ID': 29395,
              'LINE_TYPE': 'SMT',
              'OPERATION_LINE_ID': 5589,
              'WO_NO': '5104-20200507094',
              'PCB_SIDE': 1,
              'PART_NO': '266100371000',
              'WORK_TIME': '2020-06-10 06:00:00',
              'OUTPUT_QTY': 282,
              'STANDARD_CAPACITY': 323,
              'STANDARD_CAPACITY_WORK': 323,
              'VALUE_MAX': 355,
              'VALUE_MIN': 291,
              'CURRENT_HOUR': 'N',
              'REPORT_ID': 26655,
              'REPORT_NO': '200610070025257233',
              'STANDARD_CAPACITY_MINUTE': 38,
              'DTL_ID': 847946,
              'DTL_TYPE': 0,
              'DTL_MINUTES': 7,
              'DTL_START_MINUTE': 0,
              'DTL_END_MINUTE': 7,
              'REPORT_CONTENT': '产能不达标',
              'REASON': '打扫卫生',
              'STATUS': 2
            },
            {
              'ID': 29395,
              'LINE_TYPE': 'SMT',
              'OPERATION_LINE_ID': 5589,
              'WO_NO': '5104-20200507094',
              'PCB_SIDE': 1,
              'PART_NO': '266100371000',
              'WORK_TIME': '2020-06-10 06:00:00',
              'OUTPUT_QTY': 282,
              'STANDARD_CAPACITY': 323,
              'STANDARD_CAPACITY_WORK': 323,
              'VALUE_MAX': 355,
              'VALUE_MIN': 291,
              'CURRENT_HOUR': 'N',
              'REPORT_ID': 26655,
              'REPORT_NO': '200610070025257233',
              'STANDARD_CAPACITY_MINUTE': 59,
              'DTL_ID': 847948,
              'DTL_TYPE': 2,
              'DTL_MINUTES': 11,
              'DTL_START_MINUTE': 7,
              'DTL_END_MINUTE': 18,
              'REPORT_CONTENT': '产能不达标',
              'REASON': '打扫卫生',
              'STATUS': 2
            },
            {
              'ID': 29395,
              'LINE_TYPE': 'SMT',
              'OPERATION_LINE_ID': 5589,
              'WO_NO': '5104-20200507094',
              'PCB_SIDE': 1,
              'PART_NO': '266100371000',
              'WORK_TIME': '2020-06-10 06:00:00',
              'OUTPUT_QTY': 282,
              'STANDARD_CAPACITY': 323,
              'STANDARD_CAPACITY_WORK': 323,
              'VALUE_MAX': 355,
              'VALUE_MIN': 291,
              'CURRENT_HOUR': 'N',
              'REPORT_ID': 26655,
              'REPORT_NO': '200610070025257233',
              'STANDARD_CAPACITY_MINUTE': 226,
              'DTL_ID': 847947,
              'DTL_TYPE': 0,
              'DTL_MINUTES': 42,
              'DTL_START_MINUTE': 18,
              'DTL_END_MINUTE': 60,
              'REPORT_CONTENT': '产能不达标',
              'REASON': '打扫卫生',
              'STATUS': 2
            },
            {
              'ID': 29385,
              'LINE_TYPE': 'SMT',
              'OPERATION_LINE_ID': 5589,
              'WO_NO': '5104-20200521074',
              'PCB_SIDE': 1,
              'PART_NO': '266100461000',
              'WORK_TIME': '2020-06-10 06:00:00',
              'OUTPUT_QTY': 28,
              'STANDARD_CAPACITY': 360,
              'STANDARD_CAPACITY_WORK': 360,
              'VALUE_MAX': 396,
              'VALUE_MIN': 324,
              'CURRENT_HOUR': 'N',
              'REPORT_ID': 26656,
              'REPORT_NO': '200610070025257289',
              'STANDARD_CAPACITY_MINUTE': 42,
              'DTL_ID': 847949,
              'DTL_TYPE': 0,
              'DTL_MINUTES': 7,
              'DTL_START_MINUTE': 0,
              'DTL_END_MINUTE': 7,
              'REPORT_CONTENT': '产能不达标',
              'REASON': '转机',
              'STATUS': 2
            },
            {
              'ID': 29385,
              'LINE_TYPE': 'SMT',
              'OPERATION_LINE_ID': 5589,
              'WO_NO': '5104-20200521074',
              'PCB_SIDE': 1,
              'PART_NO': '266100461000',
              'WORK_TIME': '2020-06-10 06:00:00',
              'OUTPUT_QTY': 28,
              'STANDARD_CAPACITY': 360,
              'STANDARD_CAPACITY_WORK': 360,
              'VALUE_MAX': 396,
              'VALUE_MIN': 324,
              'CURRENT_HOUR': 'N',
              'REPORT_ID': 26656,
              'REPORT_NO': '200610070025257289',
              'STANDARD_CAPACITY_MINUTE': 66,
              'DTL_ID': 847951,
              'DTL_TYPE': 2,
              'DTL_MINUTES': 11,
              'DTL_START_MINUTE': 7,
              'DTL_END_MINUTE': 18,
              'REPORT_CONTENT': '产能不达标',
              'REASON': '转机',
              'STATUS': 2
            },
            {
              'ID': 29385,
              'LINE_TYPE': 'SMT',
              'OPERATION_LINE_ID': 5589,
              'WO_NO': '5104-20200521074',
              'PCB_SIDE': 1,
              'PART_NO': '266100461000',
              'WORK_TIME': '2020-06-10 06:00:00',
              'OUTPUT_QTY': 28,
              'STANDARD_CAPACITY': 360,
              'STANDARD_CAPACITY_WORK': 360,
              'VALUE_MAX': 396,
              'VALUE_MIN': 324,
              'CURRENT_HOUR': 'N',
              'REPORT_ID': 26656,
              'REPORT_NO': '200610070025257289',
              'STANDARD_CAPACITY_MINUTE': 252,
              'DTL_ID': 847950,
              'DTL_TYPE': 0,
              'DTL_MINUTES': 42,
              'DTL_START_MINUTE': 18,
              'DTL_END_MINUTE': 60,
              'REPORT_CONTENT': '产能不达标',
              'REASON': '转机',
              'STATUS': 2
            },
            {
              'ID': 29431,
              'LINE_TYPE': 'SMT',
              'OPERATION_LINE_ID': 5589,
              'WO_NO': '5104-20200507094',
              'PCB_SIDE': 1,
              'PART_NO': '266100371000',
              'WORK_TIME': '2020-06-10 07:00:00',
              'OUTPUT_QTY': 249,
              'STANDARD_CAPACITY': 323,
              'STANDARD_CAPACITY_WORK': 323,
              'VALUE_MAX': 355,
              'VALUE_MIN': 291,
              'CURRENT_HOUR': 'N',
              'REPORT_ID': 26693,
              'REPORT_NO': '200610080128861644',
              'STANDARD_CAPACITY_MINUTE': 323,
              'DTL_ID': 849247,
              'DTL_TYPE': 0,
              'DTL_MINUTES': 60,
              'DTL_START_MINUTE': 0,
              'DTL_END_MINUTE': 60,
              'REPORT_CONTENT': '产能不达标',
              'REASON': '打扫卫生',
              'STATUS': 2
            },
            {
              'ID': 29469,
              'LINE_TYPE': 'SMT',
              'OPERATION_LINE_ID': 5589,
              'WO_NO': '5104-20200507094',
              'PCB_SIDE': 1,
              'PART_NO': '266100371000',
              'WORK_TIME': '2020-06-10 08:00:00',
              'OUTPUT_QTY': 237,
              'STANDARD_CAPACITY': 323,
              'STANDARD_CAPACITY_WORK': 323,
              'VALUE_MAX': 355,
              'VALUE_MIN': 291,
              'CURRENT_HOUR': 'N',
              'REPORT_ID': 26737,
              'REPORT_NO': '200610090132468449',
              'STANDARD_CAPACITY_MINUTE': 323,
              'DTL_ID': 850361,
              'DTL_TYPE': 0,
              'DTL_MINUTES': 60,
              'DTL_START_MINUTE': 0,
              'DTL_END_MINUTE': 60,
              'REPORT_CONTENT': '产能不达标',
              'REASON': '扫码故障。',
              'STATUS': 2
            },
            {
              'ID': 29486,
              'LINE_TYPE': 'SMT',
              'OPERATION_LINE_ID': 5589,
              'WO_NO': '5104-20200507094',
              'PCB_SIDE': 1,
              'PART_NO': '266100371000',
              'WORK_TIME': '2020-06-10 09:00:00',
              'OUTPUT_QTY': 345,
              'STANDARD_CAPACITY': 323,
              'STANDARD_CAPACITY_WORK': 323,
              'VALUE_MAX': 355,
              'VALUE_MIN': 291,
              'CURRENT_HOUR': 'N',
              'REPORT_ID': 26780,
              'REPORT_NO': '200610100136078877',
              'STANDARD_CAPACITY_MINUTE': 323,
              'DTL_ID': 851583,
              'DTL_TYPE': 0,
              'DTL_MINUTES': 60,
              'DTL_START_MINUTE': 0,
              'DTL_END_MINUTE': 60,
              'REPORT_CONTENT': '产能正常',
              'REASON': null,
              'STATUS': -1
            },
            {
              'ID': 29551,
              'LINE_TYPE': 'SMT',
              'OPERATION_LINE_ID': 5589,
              'WO_NO': '5104-20200507094',
              'PCB_SIDE': 1,
              'PART_NO': '266100371000',
              'WORK_TIME': '2020-06-10 10:00:00',
              'OUTPUT_QTY': 183,
              'STANDARD_CAPACITY': 323,
              'STANDARD_CAPACITY_WORK': 323,
              'VALUE_MAX': 355,
              'VALUE_MIN': 291,
              'CURRENT_HOUR': 'Y',
              'REPORT_ID': null,
              'REPORT_NO': null,
              'STANDARD_CAPACITY_MINUTE': 323,
              'DTL_ID': 852556,
              'DTL_TYPE': 0,
              'DTL_MINUTES': 60,
              'DTL_START_MINUTE': 0,
              'DTL_END_MINUTE': 60,
              'REPORT_CONTENT': null,
              'REASON': null,
              'STATUS': -2
            }
          ],
          'CHANGE_LINE_RESULT': [
            {
              'ID': 63722,
              'LINE_TYPE': 'SMT',
              'LINE_ID': 5589,
              'LINE_NAME': null,
              'PRE_WO_NO': '5104-20200507061',
              'PRE_PCB_SIDE': 1,
              'PRE_START_TIME': '2020-06-03 08:59:42',
              'PRE_END_TIME': '2020-06-04 10:49:25',
              'NEXT_WO_NO': '5104-20200507094',
              'NEXT_PCB_SIDE': 1,
              'NEXT_START_TIME': '2020-06-04 11:02:38',
              'NEXT_END_TIME': '2020-06-06 04:57:42',
              'TAKING_TIME': 13,
              'VALUE_MIN': 20,
              'VALUE_MAX': 40,
              'REPORT_ID': null,
              'REPORT_NO': null,
              'ADD_TIME': '2020-06-04 11:02:38',
              'DESCRIPTION': null,
              'TimeValue': [
                [
                  0,
                  0,
                  1440,
                  1440,
                  0
                ],
                [
                  1,
                  0,
                  297,
                  297,
                  0
                ],
                [
                  1,
                  297,
                  349,
                  52,
                  1
                ],
                [
                  1,
                  349,
                  1440,
                  1091,
                  0
                ],
                [
                  2,
                  0,
                  492,
                  492,
                  0
                ],
                [
                  2,
                  492,
                  506,
                  14,
                  1
                ],
                [
                  2,
                  506,
                  1440,
                  934,
                  0
                ],
                [
                  3,
                  0,
                  670,
                  670,
                  0
                ],
                [
                  3,
                  670,
                  721,
                  51,
                  1
                ],
                [
                  3,
                  721,
                  1440,
                  719,
                  0
                ],
                [
                  4,
                  0,
                  1440,
                  1440,
                  0
                ]
              ]
            },
            {
              'ID': 63770,
              'LINE_TYPE': 'SMT',
              'LINE_ID': 5589,
              'LINE_NAME': null,
              'PRE_WO_NO': '5104-20200507094',
              'PRE_PCB_SIDE': 1,
              'PRE_START_TIME': '2020-06-04 11:02:38',
              'PRE_END_TIME': '2020-06-06 04:57:42',
              'NEXT_WO_NO': '5104-20200526031',
              'NEXT_PCB_SIDE': 1,
              'NEXT_START_TIME': '2020-06-06 05:49:34',
              'NEXT_END_TIME': '2020-06-07 08:12:58',
              'TAKING_TIME': 52,
              'VALUE_MIN': 20,
              'VALUE_MAX': 40,
              'REPORT_ID': null,
              'REPORT_NO': null,
              'ADD_TIME': '2020-06-06 05:49:34',
              'DESCRIPTION': '新员工第一次开机，教他转机扫码',
              'TimeValue': null
            },
            {
              'ID': 63796,
              'LINE_TYPE': 'SMT',
              'LINE_ID': 5589,
              'LINE_NAME': null,
              'PRE_WO_NO': '5104-20200526031',
              'PRE_PCB_SIDE': 1,
              'PRE_START_TIME': '2020-06-06 05:49:34',
              'PRE_END_TIME': '2020-06-07 08:12:58',
              'NEXT_WO_NO': '5104-20200514031',
              'NEXT_PCB_SIDE': 1,
              'NEXT_START_TIME': '2020-06-07 08:26:25',
              'NEXT_END_TIME': '2020-06-08 11:10:51',
              'TAKING_TIME': 13,
              'VALUE_MIN': 20,
              'VALUE_MAX': 40,
              'REPORT_ID': null,
              'REPORT_NO': null,
              'ADD_TIME': '2020-06-07 08:26:25',
              'DESCRIPTION': null,
              'TimeValue': null
            },
            {
              'ID': 63819,
              'LINE_TYPE': 'SMT',
              'LINE_ID': 5589,
              'LINE_NAME': null,
              'PRE_WO_NO': '5104-20200514031',
              'PRE_PCB_SIDE': 1,
              'PRE_START_TIME': '2020-06-07 08:26:25',
              'PRE_END_TIME': '2020-06-08 11:10:51',
              'NEXT_WO_NO': '5104-20200521074',
              'NEXT_PCB_SIDE': 1,
              'NEXT_START_TIME': '2020-06-08 12:01:38',
              'NEXT_END_TIME': '2020-06-10 06:07:49',
              'TAKING_TIME': 51,
              'VALUE_MIN': 20,
              'VALUE_MAX': 40,
              'REPORT_ID': null,
              'REPORT_NO': null,
              'ADD_TIME': '2020-06-08 12:01:38',
              'DESCRIPTION': '下班休息30分钟，换料站【FD2468】6分钟',
              'TimeValue': null
            },
            {
              'ID': 63908,
              'LINE_TYPE': 'SMT',
              'LINE_ID': 5589,
              'LINE_NAME': null,
              'PRE_WO_NO': '5104-20200521074',
              'PRE_PCB_SIDE': 1,
              'PRE_START_TIME': '2020-06-08 12:01:38',
              'PRE_END_TIME': '2020-06-10 06:07:49',
              'NEXT_WO_NO': '5104-20200507094',
              'NEXT_PCB_SIDE': 1,
              'NEXT_START_TIME': '2020-06-10 06:18:36',
              'NEXT_END_TIME': null,
              'TAKING_TIME': 11,
              'VALUE_MIN': 20,
              'VALUE_MAX': 40,
              'REPORT_ID': null,
              'REPORT_NO': null,
              'ADD_TIME': '2020-06-10 06:18:36',
              'DESCRIPTION': null,
              'TimeValue': null
            }
          ]
        },
        {
          'LINE_ID': 5590,
          'LINE_NAME': '一部2楼 立式3号线',
          'WO_NO': '5104-20200601041',
          'PART_NO': '226216211000',
          'PART_DESC': 'AH-HT10TBL-867(RoHS)',
          'WO_PASS_RATE': 54.13,
          'WO_TOTAL_QTY': 4240,
          'WO_PASS_QTY': 2295,
          'WORK_PASS_RATE': 13.04,
          'WORK_PASS_QTY': 1805,
          'WORK_TOTAL_QTY': 13837,
          'FIRST_PASS_RATE': 100,
          'FIRST_PASS_QTY': 0,
          'FIRST_TOTAL_QTY': 0,
          'CHECK_RESULT': {
            'CHECK_QTY': 0,
            'FAIL_QTY': 0,
            'LINE_TYPE': null,
            'LINE_ID': 0,
            'WO_NO': null,
            'DetailData': null
          },
          'HOUR_YIDLD_RESULT': [
            {
              'ID': 29386,
              'LINE_TYPE': 'SMT',
              'OPERATION_LINE_ID': 5590,
              'WO_NO': '5104-20200515086',
              'PCB_SIDE': 1,
              'PART_NO': '266700011000',
              'WORK_TIME': '2020-06-10 06:00:00',
              'OUTPUT_QTY': 105,
              'STANDARD_CAPACITY': 311,
              'STANDARD_CAPACITY_WORK': 311,
              'VALUE_MAX': 342,
              'VALUE_MIN': 280,
              'CURRENT_HOUR': 'N',
              'REPORT_ID': 26657,
              'REPORT_NO': '200610070025257994',
              'STANDARD_CAPACITY_MINUTE': 311,
              'DTL_ID': 847952,
              'DTL_TYPE': 0,
              'DTL_MINUTES': 60,
              'DTL_START_MINUTE': 0,
              'DTL_END_MINUTE': 60,
              'REPORT_CONTENT': '产能不达标',
              'REASON': '清尾， 转机',
              'STATUS': 2
            },
            {
              'ID': 29433,
              'LINE_TYPE': 'SMT',
              'OPERATION_LINE_ID': 5590,
              'WO_NO': '5104-20200601041',
              'PCB_SIDE': 1,
              'PART_NO': '226216211000',
              'WORK_TIME': '2020-06-10 07:00:00',
              'OUTPUT_QTY': 490,
              'STANDARD_CAPACITY': 1185,
              'STANDARD_CAPACITY_WORK': 1185,
              'VALUE_MAX': 1304,
              'VALUE_MIN': 1067,
              'CURRENT_HOUR': 'N',
              'REPORT_ID': 26695,
              'REPORT_NO': '200610080128861101',
              'STANDARD_CAPACITY_MINUTE': 1007,
              'DTL_ID': 849250,
              'DTL_TYPE': 0,
              'DTL_MINUTES': 51,
              'DTL_START_MINUTE': 9,
              'DTL_END_MINUTE': 60,
              'REPORT_CONTENT': '产能不达标',
              'REASON': '接班',
              'STATUS': 2
            },
            {
              'ID': 29433,
              'LINE_TYPE': 'SMT',
              'OPERATION_LINE_ID': 5590,
              'WO_NO': '5104-20200601041',
              'PCB_SIDE': 1,
              'PART_NO': '226216211000',
              'WORK_TIME': '2020-06-10 07:00:00',
              'OUTPUT_QTY': 490,
              'STANDARD_CAPACITY': 1185,
              'STANDARD_CAPACITY_WORK': 1185,
              'VALUE_MAX': 1304,
              'VALUE_MIN': 1067,
              'CURRENT_HOUR': 'N',
              'REPORT_ID': 26695,
              'REPORT_NO': '200610080128861101',
              'STANDARD_CAPACITY_MINUTE': 178,
              'DTL_ID': 849251,
              'DTL_TYPE': 2,
              'DTL_MINUTES': 9,
              'DTL_START_MINUTE': 0,
              'DTL_END_MINUTE': 9,
              'REPORT_CONTENT': '产能不达标',
              'REASON': '接班',
              'STATUS': 2
            },
            {
              'ID': 29406,
              'LINE_TYPE': 'SMT',
              'OPERATION_LINE_ID': 5590,
              'WO_NO': '5104-20200515086',
              'PCB_SIDE': 1,
              'PART_NO': '266700011000',
              'WORK_TIME': '2020-06-10 07:00:00',
              'OUTPUT_QTY': 3,
              'STANDARD_CAPACITY': 311,
              'STANDARD_CAPACITY_WORK': 311,
              'VALUE_MAX': 342,
              'VALUE_MIN': 280,
              'CURRENT_HOUR': 'N',
              'REPORT_ID': 26694,
              'REPORT_NO': '200610080128861266',
              'STANDARD_CAPACITY_MINUTE': 47,
              'DTL_ID': 849249,
              'DTL_TYPE': 2,
              'DTL_MINUTES': 9,
              'DTL_START_MINUTE': 0,
              'DTL_END_MINUTE': 9,
              'REPORT_CONTENT': '产能不达标',
              'REASON': ' 转机',
              'STATUS': 2
            },
            {
              'ID': 29406,
              'LINE_TYPE': 'SMT',
              'OPERATION_LINE_ID': 5590,
              'WO_NO': '5104-20200515086',
              'PCB_SIDE': 1,
              'PART_NO': '266700011000',
              'WORK_TIME': '2020-06-10 07:00:00',
              'OUTPUT_QTY': 3,
              'STANDARD_CAPACITY': 311,
              'STANDARD_CAPACITY_WORK': 311,
              'VALUE_MAX': 342,
              'VALUE_MIN': 280,
              'CURRENT_HOUR': 'N',
              'REPORT_ID': 26694,
              'REPORT_NO': '200610080128861266',
              'STANDARD_CAPACITY_MINUTE': 264,
              'DTL_ID': 849248,
              'DTL_TYPE': 0,
              'DTL_MINUTES': 51,
              'DTL_START_MINUTE': 9,
              'DTL_END_MINUTE': 60,
              'REPORT_CONTENT': '产能不达标',
              'REASON': ' 转机',
              'STATUS': 2
            },
            {
              'ID': 29441,
              'LINE_TYPE': 'SMT',
              'OPERATION_LINE_ID': 5590,
              'WO_NO': '5104-20200601041',
              'PCB_SIDE': 1,
              'PART_NO': '226216211000',
              'WORK_TIME': '2020-06-10 08:00:00',
              'OUTPUT_QTY': 555,
              'STANDARD_CAPACITY': 1185,
              'STANDARD_CAPACITY_WORK': 1185,
              'VALUE_MAX': 1304,
              'VALUE_MIN': 1067,
              'CURRENT_HOUR': 'N',
              'REPORT_ID': 26738,
              'REPORT_NO': '200610090132468967',
              'STANDARD_CAPACITY_MINUTE': 1185,
              'DTL_ID': 850363,
              'DTL_TYPE': 0,
              'DTL_MINUTES': 60,
              'DTL_START_MINUTE': 0,
              'DTL_END_MINUTE': 60,
              'REPORT_CONTENT': '产能不达标',
              'REASON': '没车去找车',
              'STATUS': 2
            },
            {
              'ID': 29487,
              'LINE_TYPE': 'SMT',
              'OPERATION_LINE_ID': 5590,
              'WO_NO': '5104-20200601041',
              'PCB_SIDE': 1,
              'PART_NO': '226216211000',
              'WORK_TIME': '2020-06-10 09:00:00',
              'OUTPUT_QTY': 780,
              'STANDARD_CAPACITY': 1185,
              'STANDARD_CAPACITY_WORK': 1185,
              'VALUE_MAX': 1304,
              'VALUE_MIN': 1067,
              'CURRENT_HOUR': 'N',
              'REPORT_ID': 26781,
              'REPORT_NO': '200610100136078810',
              'STANDARD_CAPACITY_MINUTE': 1185,
              'DTL_ID': 851584,
              'DTL_TYPE': 0,
              'DTL_MINUTES': 60,
              'DTL_START_MINUTE': 0,
              'DTL_END_MINUTE': 60,
              'REPORT_CONTENT': '产能不达标',
              'REASON': '去四楼拉板',
              'STATUS': 2
            },
            {
              'ID': 29534,
              'LINE_TYPE': 'SMT',
              'OPERATION_LINE_ID': 5590,
              'WO_NO': '5104-20200601041',
              'PCB_SIDE': 1,
              'PART_NO': '226216211000',
              'WORK_TIME': '2020-06-10 10:00:00',
              'OUTPUT_QTY': 470,
              'STANDARD_CAPACITY': 1185,
              'STANDARD_CAPACITY_WORK': 1185,
              'VALUE_MAX': 1304,
              'VALUE_MIN': 1067,
              'CURRENT_HOUR': 'Y',
              'REPORT_ID': null,
              'REPORT_NO': null,
              'STANDARD_CAPACITY_MINUTE': 1185,
              'DTL_ID': 852557,
              'DTL_TYPE': 0,
              'DTL_MINUTES': 60,
              'DTL_START_MINUTE': 0,
              'DTL_END_MINUTE': 60,
              'REPORT_CONTENT': null,
              'REASON': null,
              'STATUS': -2
            }
          ],
          'CHANGE_LINE_RESULT': [
            {
              'ID': 63730,
              'LINE_TYPE': 'SMT',
              'LINE_ID': 5590,
              'LINE_NAME': null,
              'PRE_WO_NO': '5104-20200507094',
              'PRE_PCB_SIDE': 1,
              'PRE_START_TIME': '2020-06-04 06:58:07',
              'PRE_END_TIME': '2020-06-04 14:24:04',
              'NEXT_WO_NO': '5104-20200420028',
              'NEXT_PCB_SIDE': 1,
              'NEXT_START_TIME': '2020-06-04 16:40:46',
              'NEXT_END_TIME': '2020-06-05 08:08:01',
              'TAKING_TIME': 137,
              'VALUE_MIN': 20,
              'VALUE_MAX': 40,
              'REPORT_ID': null,
              'REPORT_NO': null,
              'ADD_TIME': '2020-06-04 16:40:46',
              'DESCRIPTION': null,
              'TimeValue': [
                [
                  0,
                  0,
                  488,
                  488,
                  0
                ],
                [
                  0,
                  488,
                  579,
                  91,
                  1
                ],
                [
                  0,
                  579,
                  1440,
                  861,
                  0
                ],
                [
                  1,
                  0,
                  92,
                  92,
                  0
                ],
                [
                  1,
                  92,
                  290,
                  198,
                  1
                ],
                [
                  1,
                  290,
                  821,
                  531,
                  0
                ],
                [
                  1,
                  821,
                  837,
                  16,
                  1
                ],
                [
                  1,
                  837,
                  971,
                  134,
                  0
                ],
                [
                  1,
                  971,
                  1004,
                  33,
                  1
                ],
                [
                  1,
                  1004,
                  1261,
                  257,
                  0
                ],
                [
                  1,
                  1261,
                  1337,
                  76,
                  1
                ],
                [
                  1,
                  1337,
                  1440,
                  103,
                  0
                ],
                [
                  2,
                  0,
                  550,
                  550,
                  0
                ],
                [
                  2,
                  550,
                  588,
                  38,
                  1
                ],
                [
                  2,
                  588,
                  1361,
                  773,
                  0
                ],
                [
                  2,
                  1361,
                  1440,
                  79,
                  1
                ],
                [
                  3,
                  0,
                  81,
                  81,
                  1
                ],
                [
                  3,
                  81,
                  1440,
                  1359,
                  0
                ],
                [
                  4,
                  0,
                  1440,
                  1440,
                  0
                ]
              ]
            },
            {
              'ID': 63747,
              'LINE_TYPE': 'SMT',
              'LINE_ID': 5590,
              'LINE_NAME': null,
              'PRE_WO_NO': '5104-20200420028',
              'PRE_PCB_SIDE': 1,
              'PRE_START_TIME': '2020-06-04 16:40:46',
              'PRE_END_TIME': '2020-06-05 08:08:01',
              'NEXT_WO_NO': '5104-20200512030',
              'NEXT_PCB_SIDE': 1,
              'NEXT_START_TIME': '2020-06-05 09:39:11',
              'NEXT_END_TIME': '2020-06-06 01:32:14',
              'TAKING_TIME': 91,
              'VALUE_MIN': 20,
              'VALUE_MAX': 40,
              'REPORT_ID': null,
              'REPORT_NO': null,
              'ADD_TIME': '2020-06-05 09:39:11',
              'DESCRIPTION': '立式一三同时转先把一调好63分钟才转的三调机11分',
              'TimeValue': null
            },
            {
              'ID': 63769,
              'LINE_TYPE': 'SMT',
              'LINE_ID': 5590,
              'LINE_NAME': null,
              'PRE_WO_NO': '5104-20200512030',
              'PRE_PCB_SIDE': 1,
              'PRE_START_TIME': '2020-06-05 09:39:11',
              'PRE_END_TIME': '2020-06-06 01:32:14',
              'NEXT_WO_NO': '5104-20200519010',
              'NEXT_PCB_SIDE': 1,
              'NEXT_START_TIME': '2020-06-06 04:50:35',
              'NEXT_END_TIME': '2020-06-06 13:41:08',
              'TAKING_TIME': 198,
              'VALUE_MIN': 20,
              'VALUE_MAX': 40,
              'REPORT_ID': null,
              'REPORT_NO': null,
              'ADD_TIME': '2020-06-06 04:50:35',
              'DESCRIPTION': '休息半个小时',
              'TimeValue': null
            },
            {
              'ID': 63781,
              'LINE_TYPE': 'SMT',
              'LINE_ID': 5590,
              'LINE_NAME': null,
              'PRE_WO_NO': '5104-20200519010',
              'PRE_PCB_SIDE': 1,
              'PRE_START_TIME': '2020-06-06 04:50:35',
              'PRE_END_TIME': '2020-06-06 13:41:08',
              'NEXT_WO_NO': '5104-20200515080',
              'NEXT_PCB_SIDE': 1,
              'NEXT_START_TIME': '2020-06-06 13:57:26',
              'NEXT_END_TIME': '2020-06-06 16:11:58',
              'TAKING_TIME': 16,
              'VALUE_MIN': 20,
              'VALUE_MAX': 40,
              'REPORT_ID': null,
              'REPORT_NO': null,
              'ADD_TIME': '2020-06-06 13:57:26',
              'DESCRIPTION': null,
              'TimeValue': null
            },
            {
              'ID': 63786,
              'LINE_TYPE': 'SMT',
              'LINE_ID': 5590,
              'LINE_NAME': null,
              'PRE_WO_NO': '5104-20200515080',
              'PRE_PCB_SIDE': 1,
              'PRE_START_TIME': '2020-06-06 13:57:26',
              'PRE_END_TIME': '2020-06-06 16:11:58',
              'NEXT_WO_NO': '5104-20200521074',
              'NEXT_PCB_SIDE': 1,
              'NEXT_START_TIME': '2020-06-06 16:44:55',
              'NEXT_END_TIME': '2020-06-06 21:01:31',
              'TAKING_TIME': 33,
              'VALUE_MIN': 20,
              'VALUE_MAX': 40,
              'REPORT_ID': null,
              'REPORT_NO': null,
              'ADD_TIME': '2020-06-06 16:44:55',
              'DESCRIPTION': '人手不够，组长开机，没能提前准备料',
              'TimeValue': null
            },
            {
              'ID': 63793,
              'LINE_TYPE': 'SMT',
              'LINE_ID': 5590,
              'LINE_NAME': null,
              'PRE_WO_NO': '5104-20200521074',
              'PRE_PCB_SIDE': 1,
              'PRE_START_TIME': '2020-06-06 16:44:55',
              'PRE_END_TIME': '2020-06-06 21:01:31',
              'NEXT_WO_NO': '5104-20200515040',
              'NEXT_PCB_SIDE': 1,
              'NEXT_START_TIME': '2020-06-06 22:17:24',
              'NEXT_END_TIME': '2020-06-07 09:10:05',
              'TAKING_TIME': 76,
              'VALUE_MIN': 20,
              'VALUE_MAX': 40,
              'REPORT_ID': null,
              'REPORT_NO': null,
              'ADD_TIME': '2020-06-06 22:17:24',
              'DESCRIPTION': '刀断了技术员去找刀来换，调机30分钟',
              'TimeValue': null
            },
            {
              'ID': 63798,
              'LINE_TYPE': 'SMT',
              'LINE_ID': 5590,
              'LINE_NAME': null,
              'PRE_WO_NO': '5104-20200515040',
              'PRE_PCB_SIDE': 1,
              'PRE_START_TIME': '2020-06-06 22:17:24',
              'PRE_END_TIME': '2020-06-07 09:10:05',
              'NEXT_WO_NO': '5104-20200328022',
              'NEXT_PCB_SIDE': 1,
              'NEXT_START_TIME': '2020-06-07 09:48:22',
              'NEXT_END_TIME': '2020-06-07 22:41:59',
              'TAKING_TIME': 38,
              'VALUE_MIN': 20,
              'VALUE_MAX': 40,
              'REPORT_ID': null,
              'REPORT_NO': null,
              'ADD_TIME': '2020-06-07 09:48:22',
              'DESCRIPTION': '拿光板转好机等贴片出板20分钟',
              'TimeValue': null
            },
            {
              'ID': 63813,
              'LINE_TYPE': 'SMT',
              'LINE_ID': 5590,
              'LINE_NAME': null,
              'PRE_WO_NO': '5104-20200328022',
              'PRE_PCB_SIDE': 1,
              'PRE_START_TIME': '2020-06-07 09:48:22',
              'PRE_END_TIME': '2020-06-07 22:41:59',
              'NEXT_WO_NO': '5104-20200515086',
              'NEXT_PCB_SIDE': 1,
              'NEXT_START_TIME': '2020-06-08 01:21:24',
              'NEXT_END_TIME': '2020-06-10 07:00:20',
              'TAKING_TIME': 159,
              'VALUE_MIN': 20,
              'VALUE_MAX': 40,
              'REPORT_ID': null,
              'REPORT_NO': null,
              'ADD_TIME': '2020-06-08 01:21:24',
              'DESCRIPTION': '拿光板转好机等贴片出板，目前贴片供不上立式',
              'TimeValue': null
            },
            {
              'ID': 63915,
              'LINE_TYPE': 'SMT',
              'LINE_ID': 5590,
              'LINE_NAME': null,
              'PRE_WO_NO': '5104-20200515086',
              'PRE_PCB_SIDE': 1,
              'PRE_START_TIME': '2020-06-08 01:21:24',
              'PRE_END_TIME': '2020-06-10 07:00:20',
              'NEXT_WO_NO': '5104-20200601041',
              'NEXT_PCB_SIDE': 1,
              'NEXT_START_TIME': '2020-06-10 07:09:55',
              'NEXT_END_TIME': null,
              'TAKING_TIME': 10,
              'VALUE_MIN': 20,
              'VALUE_MAX': 40,
              'REPORT_ID': null,
              'REPORT_NO': null,
              'ADD_TIME': '2020-06-10 07:09:55',
              'DESCRIPTION': null,
              'TimeValue': null
            }
          ]
        },
        {
          'LINE_ID': 5591,
          'LINE_NAME': '一部2楼 卧式1号线',
          'WO_NO': '5104-20200415054',
          'PART_NO': '211100471000',
          'PART_DESC': 'SUPOR-DJ12B-P67(RoHS',
          'WO_PASS_RATE': 0.09,
          'WO_TOTAL_QTY': 2270,
          'WO_PASS_QTY': 2,
          'WORK_PASS_RATE': 56.42,
          'WORK_PASS_QTY': 1890,
          'WORK_TOTAL_QTY': 3350,
          'FIRST_PASS_RATE': 100,
          'FIRST_PASS_QTY': 0,
          'FIRST_TOTAL_QTY': 0,
          'CHECK_RESULT': {
            'CHECK_QTY': 0,
            'FAIL_QTY': 0,
            'LINE_TYPE': null,
            'LINE_ID': 0,
            'WO_NO': null,
            'DetailData': null
          },
          'HOUR_YIDLD_RESULT': [
            {
              'ID': 29391,
              'LINE_TYPE': 'SMT',
              'OPERATION_LINE_ID': 5591,
              'WO_NO': '5104-20200523056',
              'PCB_SIDE': 1,
              'PART_NO': '222236141000',
              'WORK_TIME': '2020-06-10 06:00:00',
              'OUTPUT_QTY': 400,
              'STANDARD_CAPACITY': 4444,
              'STANDARD_CAPACITY_WORK': 4444,
              'VALUE_MAX': 4888,
              'VALUE_MIN': 4000,
              'CURRENT_HOUR': 'N',
              'REPORT_ID': 26658,
              'REPORT_NO': '200610070025257354',
              'STANDARD_CAPACITY_MINUTE': 3629,
              'DTL_ID': 847954,
              'DTL_TYPE': 0,
              'DTL_MINUTES': 49,
              'DTL_START_MINUTE': 11,
              'DTL_END_MINUTE': 60,
              'REPORT_CONTENT': '产能不达标',
              'REASON': '监控值与实际不符',
              'STATUS': 2
            },
            {
              'ID': 29391,
              'LINE_TYPE': 'SMT',
              'OPERATION_LINE_ID': 5591,
              'WO_NO': '5104-20200523056',
              'PCB_SIDE': 1,
              'PART_NO': '222236141000',
              'WORK_TIME': '2020-06-10 06:00:00',
              'OUTPUT_QTY': 400,
              'STANDARD_CAPACITY': 4444,
              'STANDARD_CAPACITY_WORK': 4444,
              'VALUE_MAX': 4888,
              'VALUE_MIN': 4000,
              'CURRENT_HOUR': 'N',
              'REPORT_ID': 26658,
              'REPORT_NO': '200610070025257354',
              'STANDARD_CAPACITY_MINUTE': 815,
              'DTL_ID': 847955,
              'DTL_TYPE': 2,
              'DTL_MINUTES': 11,
              'DTL_START_MINUTE': 0,
              'DTL_END_MINUTE': 11,
              'REPORT_CONTENT': '产能不达标',
              'REASON': '监控值与实际不符',
              'STATUS': 2
            },
            {
              'ID': 29423,
              'LINE_TYPE': 'SMT',
              'OPERATION_LINE_ID': 5591,
              'WO_NO': '5104-20200523056',
              'PCB_SIDE': 1,
              'PART_NO': '222236141000',
              'WORK_TIME': '2020-06-10 07:00:00',
              'OUTPUT_QTY': 708,
              'STANDARD_CAPACITY': 4444,
              'STANDARD_CAPACITY_WORK': 4444,
              'VALUE_MAX': 4888,
              'VALUE_MIN': 4000,
              'CURRENT_HOUR': 'N',
              'REPORT_ID': 26696,
              'REPORT_NO': '200610080128861948',
              'STANDARD_CAPACITY_MINUTE': 4444,
              'DTL_ID': 849253,
              'DTL_TYPE': 0,
              'DTL_MINUTES': 60,
              'DTL_START_MINUTE': 0,
              'DTL_END_MINUTE': 60,
              'REPORT_CONTENT': '产能不达标',
              'REASON': null,
              'STATUS': 0
            },
            {
              'ID': 29442,
              'LINE_TYPE': 'SMT',
              'OPERATION_LINE_ID': 5591,
              'WO_NO': '5104-20200523056',
              'PCB_SIDE': 1,
              'PART_NO': '222236141000',
              'WORK_TIME': '2020-06-10 08:00:00',
              'OUTPUT_QTY': 948,
              'STANDARD_CAPACITY': 4444,
              'STANDARD_CAPACITY_WORK': 4444,
              'VALUE_MAX': 4888,
              'VALUE_MIN': 4000,
              'CURRENT_HOUR': 'N',
              'REPORT_ID': 26739,
              'REPORT_NO': '200610090132468810',
              'STANDARD_CAPACITY_MINUTE': 4444,
              'DTL_ID': 850365,
              'DTL_TYPE': 0,
              'DTL_MINUTES': 60,
              'DTL_START_MINUTE': 0,
              'DTL_END_MINUTE': 60,
              'REPORT_CONTENT': '产能不达标',
              'REASON': null,
              'STATUS': 0
            },
            {
              'ID': 29488,
              'LINE_TYPE': 'SMT',
              'OPERATION_LINE_ID': 5591,
              'WO_NO': '5104-20200523056',
              'PCB_SIDE': 1,
              'PART_NO': '222236141000',
              'WORK_TIME': '2020-06-10 09:00:00',
              'OUTPUT_QTY': 532,
              'STANDARD_CAPACITY': 4444,
              'STANDARD_CAPACITY_WORK': 4444,
              'VALUE_MAX': 4888,
              'VALUE_MIN': 4000,
              'CURRENT_HOUR': 'N',
              'REPORT_ID': 26782,
              'REPORT_NO': '200610100136078805',
              'STANDARD_CAPACITY_MINUTE': 4444,
              'DTL_ID': 851586,
              'DTL_TYPE': 0,
              'DTL_MINUTES': 60,
              'DTL_START_MINUTE': 0,
              'DTL_END_MINUTE': 60,
              'REPORT_CONTENT': '产能不达标',
              'REASON': null,
              'STATUS': 0
            },
            {
              'ID': 29535,
              'LINE_TYPE': 'SMT',
              'OPERATION_LINE_ID': 5591,
              'WO_NO': '5104-20200523056',
              'PCB_SIDE': 1,
              'PART_NO': '222236141000',
              'WORK_TIME': '2020-06-10 10:00:00',
              'OUTPUT_QTY': 408,
              'STANDARD_CAPACITY': 4444,
              'STANDARD_CAPACITY_WORK': 4444,
              'VALUE_MAX': 4888,
              'VALUE_MIN': 4000,
              'CURRENT_HOUR': 'Y',
              'REPORT_ID': null,
              'REPORT_NO': null,
              'STANDARD_CAPACITY_MINUTE': 518,
              'DTL_ID': 852563,
              'DTL_TYPE': 2,
              'DTL_MINUTES': 7,
              'DTL_START_MINUTE': 33,
              'DTL_END_MINUTE': 40,
              'REPORT_CONTENT': null,
              'REASON': null,
              'STATUS': -2
            },
            {
              'ID': 29535,
              'LINE_TYPE': 'SMT',
              'OPERATION_LINE_ID': 5591,
              'WO_NO': '5104-20200523056',
              'PCB_SIDE': 1,
              'PART_NO': '222236141000',
              'WORK_TIME': '2020-06-10 10:00:00',
              'OUTPUT_QTY': 408,
              'STANDARD_CAPACITY': 4444,
              'STANDARD_CAPACITY_WORK': 4444,
              'VALUE_MAX': 4888,
              'VALUE_MIN': 4000,
              'CURRENT_HOUR': 'Y',
              'REPORT_ID': null,
              'REPORT_NO': null,
              'STANDARD_CAPACITY_MINUTE': 2444,
              'DTL_ID': 852561,
              'DTL_TYPE': 0,
              'DTL_MINUTES': 33,
              'DTL_START_MINUTE': 0,
              'DTL_END_MINUTE': 33,
              'REPORT_CONTENT': null,
              'REASON': null,
              'STATUS': -2
            },
            {
              'ID': 29567,
              'LINE_TYPE': 'SMT',
              'OPERATION_LINE_ID': 5591,
              'WO_NO': '5104-20200415054',
              'PCB_SIDE': 1,
              'PART_NO': '211100471000',
              'WORK_TIME': '2020-06-10 10:00:00',
              'OUTPUT_QTY': 2,
              'STANDARD_CAPACITY': 404,
              'STANDARD_CAPACITY_WORK': 404,
              'VALUE_MAX': 444,
              'VALUE_MIN': 364,
              'CURRENT_HOUR': 'Y',
              'REPORT_ID': null,
              'REPORT_NO': null,
              'STANDARD_CAPACITY_MINUTE': 135,
              'DTL_ID': 852559,
              'DTL_TYPE': 0,
              'DTL_MINUTES': 20,
              'DTL_START_MINUTE': 40,
              'DTL_END_MINUTE': 60,
              'REPORT_CONTENT': null,
              'REASON': null,
              'STATUS': -2
            },
            {
              'ID': 29567,
              'LINE_TYPE': 'SMT',
              'OPERATION_LINE_ID': 5591,
              'WO_NO': '5104-20200415054',
              'PCB_SIDE': 1,
              'PART_NO': '211100471000',
              'WORK_TIME': '2020-06-10 10:00:00',
              'OUTPUT_QTY': 2,
              'STANDARD_CAPACITY': 404,
              'STANDARD_CAPACITY_WORK': 404,
              'VALUE_MAX': 444,
              'VALUE_MIN': 364,
              'CURRENT_HOUR': 'Y',
              'REPORT_ID': null,
              'REPORT_NO': null,
              'STANDARD_CAPACITY_MINUTE': 47,
              'DTL_ID': 852560,
              'DTL_TYPE': 2,
              'DTL_MINUTES': 7,
              'DTL_START_MINUTE': 33,
              'DTL_END_MINUTE': 40,
              'REPORT_CONTENT': null,
              'REASON': null,
              'STATUS': -2
            },
            {
              'ID': 29535,
              'LINE_TYPE': 'SMT',
              'OPERATION_LINE_ID': 5591,
              'WO_NO': '5104-20200523056',
              'PCB_SIDE': 1,
              'PART_NO': '222236141000',
              'WORK_TIME': '2020-06-10 10:00:00',
              'OUTPUT_QTY': 408,
              'STANDARD_CAPACITY': 4444,
              'STANDARD_CAPACITY_WORK': 4444,
              'VALUE_MAX': 4888,
              'VALUE_MIN': 4000,
              'CURRENT_HOUR': 'Y',
              'REPORT_ID': null,
              'REPORT_NO': null,
              'STANDARD_CAPACITY_MINUTE': 1481,
              'DTL_ID': 852562,
              'DTL_TYPE': 0,
              'DTL_MINUTES': 20,
              'DTL_START_MINUTE': 40,
              'DTL_END_MINUTE': 60,
              'REPORT_CONTENT': null,
              'REASON': null,
              'STATUS': -2
            },
            {
              'ID': 29567,
              'LINE_TYPE': 'SMT',
              'OPERATION_LINE_ID': 5591,
              'WO_NO': '5104-20200415054',
              'PCB_SIDE': 1,
              'PART_NO': '211100471000',
              'WORK_TIME': '2020-06-10 10:00:00',
              'OUTPUT_QTY': 2,
              'STANDARD_CAPACITY': 404,
              'STANDARD_CAPACITY_WORK': 404,
              'VALUE_MAX': 444,
              'VALUE_MIN': 364,
              'CURRENT_HOUR': 'Y',
              'REPORT_ID': null,
              'REPORT_NO': null,
              'STANDARD_CAPACITY_MINUTE': 222,
              'DTL_ID': 852558,
              'DTL_TYPE': 0,
              'DTL_MINUTES': 33,
              'DTL_START_MINUTE': 0,
              'DTL_END_MINUTE': 33,
              'REPORT_CONTENT': null,
              'REASON': null,
              'STATUS': -2
            }
          ],
          'CHANGE_LINE_RESULT': [
            {
              'ID': 63905,
              'LINE_TYPE': 'SMT',
              'LINE_ID': 5591,
              'LINE_NAME': null,
              'PRE_WO_NO': '5104-20200515008',
              'PRE_PCB_SIDE': 1,
              'PRE_START_TIME': '2020-06-09 22:05:28',
              'PRE_END_TIME': '2020-06-10 05:40:51',
              'NEXT_WO_NO': '5104-20200523056',
              'NEXT_PCB_SIDE': 1,
              'NEXT_START_TIME': '2020-06-10 06:11:12',
              'NEXT_END_TIME': '2020-06-10 10:33:45',
              'TAKING_TIME': 30,
              'VALUE_MIN': 20,
              'VALUE_MAX': 40,
              'REPORT_ID': null,
              'REPORT_NO': null,
              'ADD_TIME': '2020-06-10 06:11:12',
              'DESCRIPTION': null,
              'TimeValue': [
                [
                  0,
                  0,
                  1440,
                  1440,
                  0
                ],
                [
                  1,
                  0,
                  1440,
                  1440,
                  0
                ],
                [
                  2,
                  0,
                  1440,
                  1440,
                  0
                ],
                [
                  3,
                  0,
                  1440,
                  1440,
                  0
                ]
              ]
            },
            {
              'ID': 63925,
              'LINE_TYPE': 'SMT',
              'LINE_ID': 5591,
              'LINE_NAME': null,
              'PRE_WO_NO': '5104-20200523056',
              'PRE_PCB_SIDE': 1,
              'PRE_START_TIME': '2020-06-10 06:11:12',
              'PRE_END_TIME': '2020-06-10 10:33:45',
              'NEXT_WO_NO': '5104-20200415054',
              'NEXT_PCB_SIDE': 1,
              'NEXT_START_TIME': '2020-06-10 10:40:13',
              'NEXT_END_TIME': null,
              'TAKING_TIME': 6,
              'VALUE_MIN': 20,
              'VALUE_MAX': 40,
              'REPORT_ID': null,
              'REPORT_NO': null,
              'ADD_TIME': '2020-06-10 10:40:13',
              'DESCRIPTION': null,
              'TimeValue': null
            }
          ]
        }
      ],
      mainSwiper: '',
      swiperList: [
        {
          'LINE_ID': 5589,
          'LINE_NAME': '一部2楼 立式2号线',
          'WO_NO': '5104-20200507094',
          'PART_NO': '266100371000',
          'PART_DESC': 'SUPOR-SP525-A(RoHS)',
          'WO_PASS_RATE': 80.2,
          'WO_TOTAL_QTY': 16130,
          'WO_PASS_QTY': 12936,
          'WORK_PASS_RATE': 8.98,
          'WORK_PASS_QTY': 909,
          'WORK_TOTAL_QTY': 10126,
          'FIRST_PASS_RATE': 100,
          'FIRST_PASS_QTY': 0,
          'FIRST_TOTAL_QTY': 0,
          'CHECK_RESULT': {
            'CHECK_QTY': 0,
            'FAIL_QTY': 0,
            'LINE_TYPE': null,
            'LINE_ID': 0,
            'WO_NO': null,
            'DetailData': null
          },
          'HOUR_YIDLD_RESULT': [
            {
              'ID': 29431,
              'LINE_TYPE': 'SMT',
              'OPERATION_LINE_ID': 5589,
              'WO_NO': '5104-20200507094',
              'PCB_SIDE': 1,
              'PART_NO': '266100371000',
              'WORK_TIME': '2020-06-10 07:00:00',
              'OUTPUT_QTY': 249,
              'STANDARD_CAPACITY': 323,
              'STANDARD_CAPACITY_WORK': 323,
              'VALUE_MAX': 355,
              'VALUE_MIN': 291,
              'CURRENT_HOUR': 'N',
              'REPORT_ID': 26693,
              'REPORT_NO': '200610080128861644',
              'STANDARD_CAPACITY_MINUTE': 323,
              'DTL_ID': 849247,
              'DTL_TYPE': 0,
              'DTL_MINUTES': 60,
              'DTL_START_MINUTE': 0,
              'DTL_END_MINUTE': 60,
              'REPORT_CONTENT': '产能不达标',
              'REASON': '打扫卫生',
              'STATUS': 2
            },
            {
              'ID': 29469,
              'LINE_TYPE': 'SMT',
              'OPERATION_LINE_ID': 5589,
              'WO_NO': '5104-20200507094',
              'PCB_SIDE': 1,
              'PART_NO': '266100371000',
              'WORK_TIME': '2020-06-10 08:00:00',
              'OUTPUT_QTY': 237,
              'STANDARD_CAPACITY': 323,
              'STANDARD_CAPACITY_WORK': 323,
              'VALUE_MAX': 355,
              'VALUE_MIN': 291,
              'CURRENT_HOUR': 'N',
              'REPORT_ID': 26737,
              'REPORT_NO': '200610090132468449',
              'STANDARD_CAPACITY_MINUTE': 323,
              'DTL_ID': 850361,
              'DTL_TYPE': 0,
              'DTL_MINUTES': 60,
              'DTL_START_MINUTE': 0,
              'DTL_END_MINUTE': 60,
              'REPORT_CONTENT': '产能不达标',
              'REASON': '扫码故障。',
              'STATUS': 2
            },
            {
              'ID': 29486,
              'LINE_TYPE': 'SMT',
              'OPERATION_LINE_ID': 5589,
              'WO_NO': '5104-20200507094',
              'PCB_SIDE': 1,
              'PART_NO': '266100371000',
              'WORK_TIME': '2020-06-10 09:00:00',
              'OUTPUT_QTY': 345,
              'STANDARD_CAPACITY': 323,
              'STANDARD_CAPACITY_WORK': 323,
              'VALUE_MAX': 355,
              'VALUE_MIN': 291,
              'CURRENT_HOUR': 'N',
              'REPORT_ID': 26780,
              'REPORT_NO': '200610100136078877',
              'STANDARD_CAPACITY_MINUTE': 323,
              'DTL_ID': 851583,
              'DTL_TYPE': 0,
              'DTL_MINUTES': 60,
              'DTL_START_MINUTE': 0,
              'DTL_END_MINUTE': 60,
              'REPORT_CONTENT': '产能正常',
              'REASON': null,
              'STATUS': -1
            },
            {
              'ID': 29551,
              'LINE_TYPE': 'SMT',
              'OPERATION_LINE_ID': 5589,
              'WO_NO': '5104-20200507094',
              'PCB_SIDE': 1,
              'PART_NO': '266100371000',
              'WORK_TIME': '2020-06-10 10:00:00',
              'OUTPUT_QTY': 231,
              'STANDARD_CAPACITY': 323,
              'STANDARD_CAPACITY_WORK': 323,
              'VALUE_MAX': 355,
              'VALUE_MIN': 291,
              'CURRENT_HOUR': 'N',
              'REPORT_ID': 26826,
              'REPORT_NO': '200610110139680615',
              'STANDARD_CAPACITY_MINUTE': 323,
              'DTL_ID': 852811,
              'DTL_TYPE': 0,
              'DTL_MINUTES': 60,
              'DTL_START_MINUTE': 0,
              'DTL_END_MINUTE': 60,
              'REPORT_CONTENT': '产能不达标',
              'REASON': '灯跳料，补料',
              'STATUS': 2
            },
            {
              'ID': 29578,
              'LINE_TYPE': 'SMT',
              'OPERATION_LINE_ID': 5589,
              'WO_NO': '5104-20200507094',
              'PCB_SIDE': 1,
              'PART_NO': '266100371000',
              'WORK_TIME': '2020-06-10 11:00:00',
              'OUTPUT_QTY': 96,
              'STANDARD_CAPACITY': 323,
              'STANDARD_CAPACITY_WORK': 323,
              'VALUE_MAX': 355,
              'VALUE_MIN': 291,
              'CURRENT_HOUR': 'Y',
              'REPORT_ID': null,
              'REPORT_NO': null,
              'STANDARD_CAPACITY_MINUTE': 162,
              'DTL_ID': 853446,
              'DTL_TYPE': 0,
              'DTL_MINUTES': 30,
              'DTL_START_MINUTE': 0,
              'DTL_END_MINUTE': 30,
              'REPORT_CONTENT': null,
              'REASON': null,
              'STATUS': -2
            },
            {
              'ID': 29578,
              'LINE_TYPE': 'SMT',
              'OPERATION_LINE_ID': 5589,
              'WO_NO': '5104-20200507094',
              'PCB_SIDE': 1,
              'PART_NO': '266100371000',
              'WORK_TIME': '2020-06-10 11:00:00',
              'OUTPUT_QTY': 96,
              'STANDARD_CAPACITY': 323,
              'STANDARD_CAPACITY_WORK': 323,
              'VALUE_MAX': 355,
              'VALUE_MIN': 291,
              'CURRENT_HOUR': 'Y',
              'REPORT_ID': null,
              'REPORT_NO': null,
              'STANDARD_CAPACITY_MINUTE': 162,
              'DTL_ID': 853447,
              'DTL_TYPE': 0,
              'DTL_MINUTES': 30,
              'DTL_START_MINUTE': 30,
              'DTL_END_MINUTE': 60,
              'REPORT_CONTENT': null,
              'REASON': null,
              'STATUS': -2
            }
          ],
          'CHANGE_LINE_RESULT': [
            {
              'ID': 63722,
              'LINE_TYPE': 'SMT',
              'LINE_ID': 5589,
              'LINE_NAME': null,
              'PRE_WO_NO': '5104-20200507061',
              'PRE_PCB_SIDE': 1,
              'PRE_START_TIME': '2020-06-03 08:59:42',
              'PRE_END_TIME': '2020-06-04 10:49:25',
              'NEXT_WO_NO': '5104-20200507094',
              'NEXT_PCB_SIDE': 1,
              'NEXT_START_TIME': '2020-06-04 11:02:38',
              'NEXT_END_TIME': '2020-06-06 04:57:42',
              'TAKING_TIME': 13,
              'VALUE_MIN': 20,
              'VALUE_MAX': 40,
              'REPORT_ID': null,
              'REPORT_NO': null,
              'ADD_TIME': '2020-06-04 11:02:38',
              'DESCRIPTION': null,
              'TimeValue': [
                [
                  0,
                  0,
                  1440,
                  1440,
                  0
                ],
                [
                  1,
                  0,
                  297,
                  297,
                  0
                ],
                [
                  1,
                  297,
                  349,
                  52,
                  1
                ],
                [
                  1,
                  349,
                  1440,
                  1091,
                  0
                ],
                [
                  2,
                  0,
                  492,
                  492,
                  0
                ],
                [
                  2,
                  492,
                  506,
                  14,
                  1
                ],
                [
                  2,
                  506,
                  1440,
                  934,
                  0
                ],
                [
                  3,
                  0,
                  670,
                  670,
                  0
                ],
                [
                  3,
                  670,
                  721,
                  51,
                  1
                ],
                [
                  3,
                  721,
                  1440,
                  719,
                  0
                ],
                [
                  4,
                  0,
                  1440,
                  1440,
                  0
                ]
              ]
            },
            {
              'ID': 63770,
              'LINE_TYPE': 'SMT',
              'LINE_ID': 5589,
              'LINE_NAME': null,
              'PRE_WO_NO': '5104-20200507094',
              'PRE_PCB_SIDE': 1,
              'PRE_START_TIME': '2020-06-04 11:02:38',
              'PRE_END_TIME': '2020-06-06 04:57:42',
              'NEXT_WO_NO': '5104-20200526031',
              'NEXT_PCB_SIDE': 1,
              'NEXT_START_TIME': '2020-06-06 05:49:34',
              'NEXT_END_TIME': '2020-06-07 08:12:58',
              'TAKING_TIME': 52,
              'VALUE_MIN': 20,
              'VALUE_MAX': 40,
              'REPORT_ID': null,
              'REPORT_NO': null,
              'ADD_TIME': '2020-06-06 05:49:34',
              'DESCRIPTION': '新员工第一次开机，教他转机扫码',
              'TimeValue': null
            },
            {
              'ID': 63796,
              'LINE_TYPE': 'SMT',
              'LINE_ID': 5589,
              'LINE_NAME': null,
              'PRE_WO_NO': '5104-20200526031',
              'PRE_PCB_SIDE': 1,
              'PRE_START_TIME': '2020-06-06 05:49:34',
              'PRE_END_TIME': '2020-06-07 08:12:58',
              'NEXT_WO_NO': '5104-20200514031',
              'NEXT_PCB_SIDE': 1,
              'NEXT_START_TIME': '2020-06-07 08:26:25',
              'NEXT_END_TIME': '2020-06-08 11:10:51',
              'TAKING_TIME': 13,
              'VALUE_MIN': 20,
              'VALUE_MAX': 40,
              'REPORT_ID': null,
              'REPORT_NO': null,
              'ADD_TIME': '2020-06-07 08:26:25',
              'DESCRIPTION': null,
              'TimeValue': null
            },
            {
              'ID': 63819,
              'LINE_TYPE': 'SMT',
              'LINE_ID': 5589,
              'LINE_NAME': null,
              'PRE_WO_NO': '5104-20200514031',
              'PRE_PCB_SIDE': 1,
              'PRE_START_TIME': '2020-06-07 08:26:25',
              'PRE_END_TIME': '2020-06-08 11:10:51',
              'NEXT_WO_NO': '5104-20200521074',
              'NEXT_PCB_SIDE': 1,
              'NEXT_START_TIME': '2020-06-08 12:01:38',
              'NEXT_END_TIME': '2020-06-10 06:07:49',
              'TAKING_TIME': 51,
              'VALUE_MIN': 20,
              'VALUE_MAX': 40,
              'REPORT_ID': null,
              'REPORT_NO': null,
              'ADD_TIME': '2020-06-08 12:01:38',
              'DESCRIPTION': '下班休息30分钟，换料站【FD2468】6分钟',
              'TimeValue': null
            },
            {
              'ID': 63908,
              'LINE_TYPE': 'SMT',
              'LINE_ID': 5589,
              'LINE_NAME': null,
              'PRE_WO_NO': '5104-20200521074',
              'PRE_PCB_SIDE': 1,
              'PRE_START_TIME': '2020-06-08 12:01:38',
              'PRE_END_TIME': '2020-06-10 06:07:49',
              'NEXT_WO_NO': '5104-20200507094',
              'NEXT_PCB_SIDE': 1,
              'NEXT_START_TIME': '2020-06-10 06:18:36',
              'NEXT_END_TIME': null,
              'TAKING_TIME': 11,
              'VALUE_MIN': 20,
              'VALUE_MAX': 40,
              'REPORT_ID': null,
              'REPORT_NO': null,
              'ADD_TIME': '2020-06-10 06:18:36',
              'DESCRIPTION': null,
              'TimeValue': null
            }
          ]
        }
      ]
    }
  },
  created () {
    this.InitData()
  },
  mounted () {

  },
  methods: {
    InitData () {
      var html = ''; var spanhtml = '<span class="top-left border-span-m"></span><span class="top-right border-span-m"></span><span class="bottom-left border-span-m"></span><span class="bottom-right border-span-m"></span>'
      page.LINES = []
      var data = this.dataList
      var that = this
      data.forEach(function (v, i) {
        page.LINES.push(v.LINE_ID)

        if (i % 2 === 0) { html += '<div class="swiper-slide">' }

        html += '<div class="kanban-Content-main layui-col-md6" style="height:100%;">'

        //* ******************头部*****************************//
        html += '<div class="layui-col-md12 kanban-wo-info">'
        html += '<div class="kanban-wo-info-panel">'
        html += '<table class="titleTable"><tbody>'
        html += '<tr><td class="tdTitle">' + that.$t('AiAndRiReport._5') + '：</td><td class="tdValueL">' + v.LINE_NAME + '</td><td class="tdTitle">工单：</td><td class="tdValueR">' + v.WO_NO + '</td></tr>'
        html += '<tr><td class="tdTitle">' + that.$t('AiAndRiReport._6') + '：</td><td class="tdValueL">' + v.PART_NO + '</td><td class="tdTitle">机种：</td><td class="tdValueR">' + v.PART_DESC + '</td></tr>'
        html += '</tbody></table>'
        html += spanhtml
        html += '</div>'
        html += '</div>'
        //* ******************END 头部*************************//

        //* ******************内容*****************************//
        html += '<div class="bodyDiv layui-col-md12">'
        // ---------内容仪表盘-------------//
        html += '<div class="layui-col-md12" style="height:60%;">'
        html += '<div class="layui-col-md12 graphContent" style="height:50%;">'
        //= =====工单完成率======//
        html += '<div class="layui-col-md6" style="height:100%; padding: 0px 10px 10px 5px;">'
        html += '<div class="kanban-wo-yield-panel kanban-panel-bg" style="height:100%;">'
        html += '<div class="kanban-panel-title" style="max-height:50px;height: 15%;">' + that.$t('AiAndRiReport._7') + '</div>'
        html += '<div id="WoPassRate' + v.LINE_ID + '" style="height: 85%;"></div>'
        html += spanhtml
        html += '</div>'
        html += '</div>'
        //= =====END 工单完成率==//

        //= =====排产达成率======//
        html += '<div class="layui-col-md6" style="height:100%;padding: 0px 3px 10px 5px;">'
        html += '<div class="kanban-wo-yield-panel kanban-panel-bg" style="height:100%;">'
        html += '<div class="kanban-panel-title" style="max-height:50px;height: 15%;">' + that.$t('AiAndRiReport._8') + '</div>'
        html += '<div id="WorkPassRate' + v.LINE_ID + '" style="height: 85%;"></div>'
        html += spanhtml
        html += '</div>'
        html += '</div>'
        //= =====END 排产达成率==//
        html += '</div>'

        html += '<div class="layui-col-md12 graphContent" style="height:50%;">'
        //= =====首件合格率======//
        html += '<div class="layui-col-md6" style="height:100%; padding: 0px 10px 10px 5px;">'
        html += '<div class="kanban-wo-yield-panel kanban-panel-bg" style="height:100%;">'
        html += '<div class="kanban-panel-title" style="max-height:50px;height: 15%;">' + that.$t('AiAndRiReport._9') + '</div>'
        html += '<div id="FirstPassRate' + v.LINE_ID + '" style="height: 85%;"></div>'
        html += spanhtml
        html += '</div>'
        html += '</div>'
        //= =====END 首件合格率==//

        //= =====抽检情况======//
        html += '<div class="layui-col-md6" style="height:100%; padding: 0px 3px 10px 5px;">'
        html += '<div class="kanban-wo-yield-panel kanban-panel-bg" style="height:100%;">'
        html += '<div class="kanban-panel-title">'
        html += '<span style="float:left">' + that.$t('AiAndRiReport._10') + '</span>'
        html += '<span style="float:right;padding:0 10px;font-size:14px;">' + that.$t('AiAndRiReport._11') + '：' + v.CHECK_RESULT.FAIL_QTY + '</span>'
        html += '<span style="float:right;padding:0 10px;font-size:14px;">' + that.$t('AiAndRiReport._12') + '：' + v.CHECK_RESULT.CHECK_QTY + '</span>'
        html += '</div>'
        html += '<table id="SpotCheckTable' + v.LINE_ID + '" class="ListTable table table-striped" style="color:white;">'
        html += "<thead><tr><th style='width:20%'>" + that.$t('AiAndRiReport._13') + "</th><th style='width:17%'>" + that.$t('AiAndRiReport._14') + "</th><th style='width:14%'>" + that.$t('AiAndRiReport._15') + "</th><th style='width:18%'>" + that.$t('AiAndRiReport._16') + "</th><th style='width:31%'>" + that.$t('AiAndRiReport._17') + '</th></tr></thead>'
        html += '<tbody>'
        html += that.GetCheckTableHtml(v.CHECK_RESULT.DetailData)
        html += '</tbody>'
        html += '</table>'
        html += spanhtml
        html += '</div>'
        html += '</div>'
        //= =====END 抽检情况==//
        html += '</div>'
        html += '</div>'
        // ---------END 内容仪表盘---------//

        // ---------内容柱状图-------------//
        html += '<div class="layui-col-md12" style="height:40%; padding: 0px 3px 10px 5px;">'
        html += '<div class="kanban-hour-yield-panel kanban-panel-bg">'
        html += '<div class="swiper-container" style="height:100%; padding:0px;" id="swiper' + v.LINE_ID + '">'
        html += '<div class="swiper-wrapper">'
        html += '<div class="swiper-slide">'
        html += '<div id="HourYieldBar' + v.LINE_ID + '" style="height:100%"></div>'
        html += '</div>'
        html += '<div class="swiper-slide">'
        html += '<div id="ExLineDateBar' + v.LINE_ID + '" style="height:100%"></div>'
        html += '</div>'
        html += '</div>'
        html += '<div class="swiper-pagination" id="swiper_p' + v.LINE_ID + '"></div>'
        html += '</div>'
        html += spanhtml
        html += '</div>'
        html += '</div>'
        // ---------END 内容柱状图---------//
        html += '</div>'
        //* ******************END 内容*************************//

        html += '</div>'
        if (i % 2 === 1) { html += '</div>' }
      })
      if (data.length % 2 === 1) { html += '</div>' }
      this.mainSwiper = html

      this.$nextTick(() => {
        this.InitPicBar(data, true)
      })
    },
    // 初始化图表
    InitPicBar (data, isInit) {
      var jian = this.$t('AiAndRiReport._3')
      // 仪表盘配置参数
      var option = {
        title: {
          left: 'right',
          subtext: '0 / 0' + jian,
          subtextStyle: {
            color: '#FFF',
            fontStyle: 'normal',
            fontWeight: 'bold',
            fontSize: 16,
            padding: [50, 0, 0, 0]
          }
        },
        tooltip: {
          formatter: this.$t('AiAndRiReport._4') + ': {c}%'
        },
        legend: {
          selectedMode: false, // 取消图例上的点击事件
          textStyle: {
            fontSize: 20, // 字体大小
            color: '#ffffff'// 字体颜色
          }
        },
        series: [
          {
            type: 'gauge',
            label: {
              normal: {
                show: true,
                position: 'bottom'
              }
            },
            center: ['50%', '58%'],
            radius: '100%',
            title: { // 设置仪表盘中间显示文字样式
              textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                color: 'white'
              }
            },
            pointer: { // 指针样式
              length: '80%'
            },
            axisLine: {
              show: true, // 是否显示仪表盘轴线(轮廓线),默认 true。
              lineStyle: { // 属性lineStyle控制线条样式
                shadowBlur: 10, // (发光效果)图形阴影的模糊大小。该属性配合 shadowColor,shadowOffsetX, shadowOffsetY 一起设置图形的阴影效果。
                shadowColor: '#fff', // 阴影颜色。支持的格式同color。
                color: [ // 表盘颜色
                  [0.5, '#DA462C'], // 0-50%处的颜色
                  [0.7, '#FF9618'], // 51%-70%处的颜色
                  [0.9, '#FFED44'], // 70%-90%处的颜色
                  [1, '#20AE51']// 90%-100%处的颜色
                ],
                width: 15// 表盘宽度
              }
            },
            axisLabel: { // 文字样式（及“10”、“20”等文字样式）
              color: 'white',
              distance: 0 // 文字离表盘的距离
            },
            detail: {
              formatter: '{value}%',
              textStyle: {
                fontSize: 20
              }
            },
            data: [{ value: 100 }]
          }
        ]
      }

      var that = this
      data.forEach(function (v, i) {
        // 工单完成率
        that.WoPassRate = echarts.init(document.getElementById('WoPassRate' + v.LINE_ID))
        option.title.subtext = v.WO_PASS_QTY + ' / ' + v.WO_TOTAL_QTY + that.$t('AiAndRiReport._3')
        option.tooltip.formatter = that.$t('AiAndRiReport._18') + ' : {c}%'
        option.series[0].data = [{ value: v.WO_PASS_RATE }]
        that.WoPassRate.setOption(option, true)
        page.PicBarList['WoPassRate_' + v.LINE_ID] = that.WoPassRate

        // 排产达成率
        that.WorkPassRate = echarts.init(document.getElementById('WorkPassRate' + v.LINE_ID))
        option.title.subtext = v.WORK_PASS_QTY + ' / ' + v.WORK_TOTAL_QTY + that.$t('AiAndRiReport._3')
        option.tooltip.formatter = that.$t('AiAndRiReport._19') + ' : {c}%'
        option.series[0].data = [{ value: v.WORK_PASS_RATE }]
        that.WorkPassRate.setOption(option, true)
        page.PicBarList['WorkPassRate_' + v.LINE_ID] = that.WorkPassRate

        // 首件合格率
        that.FirstPassRate = echarts.init(document.getElementById('FirstPassRate' + v.LINE_ID))
        option.title.subtext = v.FIRST_PASS_QTY + ' / ' + v.FIRST_TOTAL_QTY + that.$t('AiAndRiReport._3')
        option.tooltip.formatter = that.$t('AiAndRiReport._20') + ' : {c}%'
        option.series[0].data = [{ value: v.FIRST_PASS_RATE }]
        that.FirstPassRate.setOption(option, true)
        page.PicBarList['FirstPassRate_' + v.LINE_ID] = that.FirstPassRate

        // 每小时产能
        that.HourYieldBar = echarts.init(document.getElementById('HourYieldBar' + v.LINE_ID))
        page.HourYieldList['HourYieldBar' + v.LINE_ID] = that.HourYieldBar
        var o = that.GetOptionHourYield(v.HOUR_YIDLD_RESULT)
        that.HourYieldBar.setOption(o, true)
        page.HourYieldList['HourYieldBar' + v.LINE_ID] = that.HourYieldBar
        page.PicBarList['HourYieldBar_' + v.LINE_ID] = that.HourYieldBar

        // 换线时间
        that.ExLineDateBar = echarts.init(document.getElementById('ExLineDateBar' + v.LINE_ID))
        var chang = that.GetOptionLineDate(v.CHANGE_LINE_RESULT)
        that.ExLineDateBar.setOption(chang, true)
        page.PicBarList['ExLineDateBar_' + v.LINE_ID] = that.ExLineDateBar

        if (isInit) {
          // 轮播
          var swiper = new Swiper('#swiper' + v.LINE_ID, {
            slidesPerView: 1,
            loop: false,
            observer: true,
            observeParents: true,
            autoplay: {
              delay: 15000,
              disableOnInteraction: false
            },
            pagination: {
              el: '#swiper_p' + v.LINE_ID,
              clickable: true
            }
          })
          // 鼠标离开开始自动切换
          swiper.el.onmouseover = function () {
            swiper.autoplay.stop()
          }
          // 鼠标覆盖停止自动切换
          swiper.el.onmouseout = function () {
            swiper.autoplay.start()
          }
        }
        that.resize()
      })

      if (isInit) {
        // 主轮播
        // eslint-disable-next-line camelcase
        var swiper_mst = new Swiper('#swiper_mst', {
          slidesPerView: 1,
          loop: false,
          observer: true,
          observeParents: true,
          autoplay: {
            delay: 10000,
            disableOnInteraction: false
          },
          pagination: {
            el: '#swiper_p_mst',
            clickable: true
          },
          on: {
            slideChangeTransitionStart: function () {
              page.SwiperIndex = this.activeIndex
              that.resize()
              var index = this.activeIndex * 2
              that.GetData(page.LINES[index])
              if (page.LINES.length > (index + 1)) { that.GetData(page.LINES[index + 1]) }
            }
          }

        })
        // 鼠标离开开始自动切换
        swiper_mst.el.onmouseover = function () {
          swiper_mst.autoplay.stop()
        }
        // 鼠标覆盖停止自动切换
        swiper_mst.el.onmouseout = function () {
          swiper_mst.autoplay.start()
        }
      }
      window.onresize = () => {
        this.resize()
      }
      // AutoPageSize()
    },
    // 获取抽检列表html
    GetCheckTableHtml (data) {
      var html = ''
      var list = []
      if (data) list = data
      list.forEach(function (v, i) {
        html += '<tr><td>' + v.BATCH_NO.substring(6) +
          '</td><td>' + this.IsNull(v.CHECKER) +
          '</td><td>' + this.IsNull(v.DEFECT_LOC) +
          '</td><td>' + this.IsNull(v.DEFECT_DESCRIPTION) +
          '</td><td>' + (this.IsNull(v.CREATE_TIME) === '' ? this.IsNull(v.CREATE_DATE) : v.CREATE_TIME) + '</td></tr>'
      })

      for (var i = 5; i > list.length; i--) {
        html += '<tr><td>&nbsp;</td><td></td><td></td><td></td><td></td></tr>'
      }

      return html
    },
    // 轮播时加载数据
    GetData (lineId) {
      var data = this.swiperList
      this.InitPicBar(data, false)
    },
    // 获取每小时产能配置
    GetOptionHourYield (data) {
      var that = this
      // 每小时产能配置参数
      var optionHourYield = {
        title: {
          text: this.$t('AiAndRiReport._21'),
          textStyle: {
            color: '#FFF'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          textStyle: {
            color: '#ffffff'// 字体颜色
          },
          data: [],
          top: 30
        },
        color: ['#081ae1'],
        grid: {
          top: 60,
          left: 10,
          right: 20,
          bottom: 20,
          containLabel: true
        },
        xAxis: {
          type: 'value',
          axisLabel: {
            rotate: 30,
            color: '#FFF'
          },
          axisLine: {
            lineStyle: {
              color: '#FFF',
              width: 1
            }
          }
        },
        yAxis: {
          type: 'category',
          axisLabel: {
            interval: 0,
            rotate: 30,
            color: '#FFF'
          },
          axisLine: {
            lineStyle: {
              color: '#FFF',
              width: 1
            }
          },
          data: []
        },
        series: []
      }
      var legend = []; var yAxis = []; var timeData = {}; var series = []; var _series = {}; var point = []
      var colors = ['#9da7f5', '#081ae1', '#819280', '#118d07', '#946e9d', '#80059d', '#c768ab', '#c1098a']
      // 构建类型列表 / Y轴列表
      data.forEach(function (v, i) {
        if (legend.indexOf(v.PART_NO) === -1) {
          legend.push(v.PART_NO + '_标准')
          legend.push(v.PART_NO)
        }

        var timeStr = that.getDateStr(v.WORK_TIME)
        if (yAxis.indexOf(timeStr) === -1) {
          yAxis.push(timeStr)

          // 获取到每个时间段数据
          timeData[timeStr] = {}
          timeData[timeStr][v.PART_NO] = v
        } else {
          timeData[timeStr][v.PART_NO] = v
        }
      })

      // 构建异常信息数据
      for (var time in timeData) {
        var outputQty = 0
        var index = 1
        for (var no in timeData[time]) {
          if (index > 1) break
          index++
          var v = timeData[time][no]
          outputQty += v.OUTPUT_QTY
          switch (v.STATUS) {
            case -2:
              point.push({ value: that.$t('AiAndRiReport._22'), xAxis: outputQty - (parseInt(v.OUTPUT_QTY / 6)), yAxis: yAxis.indexOf(that.getDateStr(v.WORK_TIME)), symbol: 'pin', itemStyle: { color: 'blue' }, WORK_TIME: v.WORK_TIME })
              break
            case -1:
              point.push({ value: that.$t('AiAndRiReport._23'), xAxis: outputQty - (parseInt(v.OUTPUT_QTY / 6)), yAxis: yAxis.indexOf(that.getDateStr(v.WORK_TIME)), symbol: 'pin', itemStyle: { color: 'green' }, WORK_TIME: v.WORK_TIME })
              break
            case 0:
            case 1:
            case 2:
              var str = that.$t('AiAndRiReport._24') + '：' + v.REPORT_CONTENT + '。'
              if (v.REASON !== '' && v.REASON !== undefined && v.REASON != null) { str += that.$t('AiAndRiReport._25') + '：' + v.REASON }
              point.push({ value: str, xAxis: outputQty - (parseInt(v.OUTPUT_QTY / 6)), yAxis: yAxis.indexOf(that.getDateStr(v.WORK_TIME)), symbol: 'pin', itemStyle: { color: 'red' }, WORK_TIME: v.WORK_TIME })
              break
            default:
          }
        }
      }

      // 构建数据列表
      data.forEach(function (v, i) {
        // Y轴下标
        var index = yAxis.indexOf(that.getDateStr(v.WORK_TIME))

        // 标准产能
        if (_series[v.PART_NO + '_标准'] === undefined) {
          _series[v.PART_NO + '_标准'] = []
        }

        // 标准产能数据列表
        var standardData = _series[v.PART_NO + '_标准']

        var isExist = false
        standardData.forEach(function (d, i2) {
          // 产品号相同、标准产能类型相同、时间不同
          if (d.PART_NO === v.PART_NO && d.DTL_TYPE === v.DTL_TYPE && d.WORK_TIME !== v.WORK_TIME) {
            if ((d.data[index] === 0 || d.data[index] === undefined) && !isExist) {
              d.data[index] = v.STANDARD_CAPACITY_MINUTE
              d.minuteData[index] = v.DTL_MINUTES
              isExist = true
            }
          }
        })

        // 当前数据不存在标准产能数据中----添加进去
        if (!isExist) {
          var _ser = {
            color: '',
            type: 'bar',
            stack: that.$t('AiAndRiReport._26'),
            barMaxWidth: 40,
            label: {
              normal: {
                show: true,
                formatter: function (p) { if (p.value > 0) return p.value; else return '' } // 当数值为0时不显示0
              }
            },
            data: [],
            minuteData: []
          }
          // 产品下标--用于取颜色
          var indexColor = legend.indexOf(v.PART_NO + '_标准')

          if (v.DTL_TYPE === 0) {
            _ser.color = colors[indexColor]
            _ser.name = v.PART_NO + '_' + that.GetDtlTypeName(v.DTL_TYPE)
          } else if (v.DTL_TYPE === 1) {
            _ser.color = 'orange'
          } else if (v.DTL_TYPE === 2) {
            _ser.color = 'red'
          }
          if (v.DTL_TYPE > 0) {
            _ser.STANDARD_CAPACITY = v.STANDARD_CAPACITY
            _ser.name = that.GetDtlTypeName(v.DTL_TYPE)
            _ser.label.normal.formatter = function (p) {
              if (p.value === 0) return ''
              // 得到分钟数
              var minute = page.HourYieldList['HourYieldBar' + v.OPERATION_LINE_ID].getOption().series[p.seriesIndex].minuteData[p.dataIndex]
              return p.seriesName + minute + that.$t('AiAndRiReport._27')
            }
          }

          _ser.PART_NO = v.PART_NO
          _ser.WORK_TIME = v.WORK_TIME
          _ser.DTL_TYPE = v.DTL_TYPE

          for (var k = 0; k < index; k++) {
            _ser.data[k] = 0
            _ser.minuteData[k] = 0
          }
          _ser.data[index] = v.STANDARD_CAPACITY_MINUTE
          _ser.minuteData[index] = v.DTL_MINUTES
          _series[v.PART_NO + '_标准'].push(_ser)
        }

        // 产能
        if (_series[v.PART_NO] === undefined) {
          _series[v.PART_NO] = {
            color: colors[legend.indexOf(v.PART_NO)],
            name: v.PART_NO,
            type: 'bar',
            stack: that.$t('AiAndRiReport._28'),
            barMaxWidth: 40,
            label: {
              normal: {
                show: true,
                formatter: function (p) { if (p.value > 0) { return p.value } else return '' } // 当数值为0时不显示0
              }
            },
            data: [],
            markPoint: {
              symbolRotate: -90, // 标注旋转度数
              symbolSize: [34, 55], // 气泡大小
              label: {
                normal: {
                  fontSize: 10,
                  show: true,
                  color: '#fff', // 字体颜色
                  position: 'insideLeft', // 字体相对定位
                  distance: 17 // 定位边距
                }
              },
              data: point
            }
          }
          _series[v.PART_NO].data[index] = v.OUTPUT_QTY
        } else {
          if (index > -1) { _series[v.PART_NO].data[index] = v.OUTPUT_QTY }
        }
      })

      // 添加到列表中
      for (var i in _series) {
        // eslint-disable-next-line no-redeclare
        var ind = _series[i.replace('_标准', '')].data.length
        if (i.indexOf('标准') > -1) {
          // eslint-disable-next-line no-redeclare
          var data = _series[i]
          data.forEach(function (d, k) {
            // eslint-disable-next-line no-redeclare
            for (var k = 0; k < ind; k++) {
              if (d.data[k] === undefined) d.data[k] = 0
            }
            series.push(d)
          })
        } else { series.push(_series[i]) }
      }
      // 配置信息
      legend.unshift(that.$t('AiAndRiReport._29'))
      legend.unshift(that.$t('AiAndRiReport._30'))

      optionHourYield.legend.data = legend
      optionHourYield.yAxis.data = yAxis
      optionHourYield.series = series

      return optionHourYield
    },
    // 获取换线时间配置
    GetOptionLineDate (data) {
      var that = this
      // 换线时间配置参数
      var optionLineDate = {
        tooltip: {
          formatter: function (params) {
            var str = params.marker + (params.name === '换线时间' ? params.name + ': ' : '')
            var v = params.value[3]
            var mm = parseInt(v % 60)
            str += parseInt(v) === 0 ? '' : parseInt(v / 60) + '小时'
            str += mm === 0 ? '' : mm + '分钟'
            return str
          }
        },
        color: ['red'],
        title: {
          text: '换线时间',
          textStyle: {
            color: '#FFF'
          }
        },
        legend: {
          type: 'plain',
          textStyle: {
            fontSize: 14, // 字体大小
            color: '#FFF'// 字体颜色
          },
          data: ['换线时间'],
          top: 30
        },
        grid: {
          top: 60,
          left: 1,
          right: 1,
          bottom: 20,
          containLabel: true
        },
        xAxis: {
          min: 0,
          max: 1440,
          minInterval: 1,
          maxInterval: 60,
          axisLabel: {
            formatter: function (val) {
              return Math.max(0, parseInt(val / 60)) + 'H'
            },
            rotate: 30,
            textStyle: {
              color: '#FFF'
            }
          }
        },
        yAxis: {
          data: [],
          axisLabel: {
            rotate: 30,
            textStyle: {
              color: '#FFF'
            }
          }
        },
        series: []
      }

      var seriesData = []
      var yAxis = this.GetDateList(5)

      if (data.length > 0) {
        var timeData = data[0].TimeValue
        timeData.forEach(function (v, i) {
          if (v[4] === 0) {
            seriesData.push({ name: that.$t('AiAndRiReport._31'), value: [v[0], v[1], v[2], v[3]], itemStyle: { normal: { color: 'green' } } })
          } else {
            seriesData.push({ name: that.$t('AiAndRiReport._32'), value: [v[0], v[1], v[2], v[3]], itemStyle: { normal: { color: 'red' } } })
          }
        })
      }

      // 如果存在当天没数据的则默认为工作时间
      for (var i = 0; i < 5; i++) {
        var isExist = false
        seriesData.forEach(function (v, j) {
          if (v.value[0] === i) { isExist = true }
        })

        if (!isExist) { seriesData.push({ name: that.$t('AiAndRiReport._31'), value: [i, 0, 1440, 1440], itemStyle: { normal: { color: 'green' } } }) }
      }

      optionLineDate.yAxis.data = yAxis
      optionLineDate.series = [
        { type: 'bar', name: that.$t('AiAndRiReport._32') },
        {
          type: 'custom',
          renderItem: function renderItem (params, api) {
            var categoryIndex = api.value(0)
            var start = api.coord([api.value(1), categoryIndex])
            var end = api.coord([api.value(2), categoryIndex])
            var height = api.size([0, 1])[1] * 0.6

            var rectShape = echarts.graphic.clipRectByRect({
              x: start[0],
              y: start[1] - height / 2,
              width: end[0] - start[0],
              height: height
            }, {
              x: params.coordSys.x,
              y: params.coordSys.y,
              width: params.coordSys.width,
              height: params.coordSys.height
            })

            return rectShape && {
              type: 'rect',
              shape: rectShape,
              style: api.style()
            }
          },
          itemStyle: {
            normal: {
              opacity: 0.9,
              label: {
                position: 'left',
                color: 'red',
                fontWeight: 900,
                fontSize: 14,
                // padding: [0, 0, 0, -14],
                show: true,
                formatter: function (p) {
                  if (p.name === '换线时间') { return (parseInt(p.data.value[3] / 60) === 0 ? '' : parseInt(p.data.value[3] / 60) + '时') + ((p.data.value[3] % 60) === 0 ? '' : ((p.data.value[3] % 60) + '分')) } else { return '' }
                }
              }
            }
          },
          data: seriesData
        }
      ]

      return optionLineDate
    },
    // 获取换线时间列表Y轴数据
    GetDateList (day) {
      var result = []
      for (var i = day; i > 0; i--) {
        var date = new Date()
        date.setDate(new Date().getDate() - (i))
        var y = date.getFullYear()
        var m = date.getMonth() + 1
        var d = date.getDate()
        result.push(y + '-' + m + '-' + d)
      }
      return result
    },

    // 看板图表自适应
    resize () {
      var index = page.SwiperIndex * 2
      page.NAMES.forEach((v, i) => {
        try {
          page.PicBarList[v + page.LINES[index]].resize()
          if (page.LINES.length > (index + 1)) { page.PicBarList[v + page.LINES[index + 1]].resize() }
        } catch (e) {

        }
      })
    },
    // 判断是否为空
    IsNull (str) {
      if (str == null || str === undefined || str === '') { return '' }
      return str
    },
    // 根据标准产能类型获取类型名称
    GetDtlTypeName (type) {
      switch (type) {
        case 0:
          return this.$t('AiAndRiReport._33')
        case 1:
          return this.$t('AiAndRiReport._30')
        case 2:
          return this.$t('AiAndRiReport._29')
        default:
          return ''
      }
    },
    // 根据时间转换时间字符串
    getDateStr (dateStr) {
      var date = new Date(Date.parse(dateStr))
      var day = (date.getDate()).toString()
      var hour = (date.getHours()).toString()
      return day + this.$t('AiAndRiReport._34') + hour + this.$t('AiAndRiReport._35')
    }
  }
}
</script>
<style type="text/css" scoped>
@import './AiAndRiReport/AiAndRiReport.css';
</style>
