<template>
  <div class="AoiAndSpiReport">
    <div class="container-fluid">
      <div class="row kanban-title"
           ref="kanbanTitle">
        <div class="col-md-1"
             style="height: 100%;">
          &nbsp;
        </div>
        <div class="col-md-10"
             style="height: 100%;">
          <div class="kanban-title-panel">
            {{ $t("AoiAndSpiReport._1") }}
          </div>
        </div>
        <div class="col-md-1"
             style="text-align:center;height: 100%;line-height: 50px;">
          <span class="screen-span">
            <a href="javascript:void(0)"
               @click="$options.fs.fullScreen.handleFullScreen(this)"
               style="color:#00ffff;font-size:15px;">{{ $t("AoiAndSpiReport._2") }}</a>
          </span>
        </div>
      </div>
      <div class="row"
           id="contentDiv"
           style="width:100%">
        <div class="col-md-12"
             style="height:100%;padding:0px;margin:0px;">
          <div class="swiper-container"
               style="height:100%;padding:0px;margin:0px;"
               id="swiper1">
            <div id="mapswp-swiper1"
                 class="swiper-wrapper"
                 v-html="MapswpSwiper1">
              <div class="swiper-slide">
              </div>
              <div class="swiper-slide">
              </div>
            </div>
            <!-- Add Pagination -->
            <div class="swiper-pagination"
                 id="swiper_p1"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Swiper from 'swiper'
import 'swiper/css/swiper.css'
import echarts from 'echarts'
var objList = []
var page = {}
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
export default {
  fs,
  name: 'AoiAndSpiReport',
  data () {
    return {
      dataList: [
        {
          'STATION_NAME': 'SMT_2_1',
          'STATION_TYPE': 'AOI',
          'WO_NO': '5102-20200405020',
          'PART_NO': '200223540000',
          'LINE_NAME': '无',
          'PART_DESC': 'CM-DCL-G20-OLED显示板-RoHS',
          'FIRST_PASS_YIELD': 100,
          'PASS_QTY': 1195,
          'TOTAL_QTY': 1195,
          'DefectList': []
        },
        {
          'STATION_NAME': 'SMT_2_2',
          'STATION_TYPE': 'AOI',
          'WO_NO': '无',
          'PART_NO': '无',
          'LINE_NAME': '无',
          'PART_DESC': '无',
          'FIRST_PASS_YIELD': 0,
          'PASS_QTY': 0,
          'TOTAL_QTY': 0,
          'DefectList': null
        },
        {
          'STATION_NAME': 'SMT_2_3',
          'STATION_TYPE': 'AOI',
          'WO_NO': '5102-20191213029',
          'PART_NO': '201124180000',
          'LINE_NAME': '无',
          'PART_DESC': 'RD-IH-FB-K2C(CD)-电源板-RoHS',
          'FIRST_PASS_YIELD': 99.8,
          'PASS_QTY': 1971,
          'TOTAL_QTY': 1975,
          'DefectList': [
            {
              'DEFECT_NAME': '反向',
              'DEFECT_QTY': 2
            },
            {
              'DEFECT_NAME': '空焊',
              'DEFECT_QTY': 1
            },
            {
              'DEFECT_NAME': '错件',
              'DEFECT_QTY': 1
            }
          ]
        },
        {
          'STATION_NAME': 'SPI',
          'STATION_TYPE': 'SPI',
          'WO_NO': '5102-20200416018',
          'PART_NO': '205211060010',
          'LINE_NAME': '一部二楼SMT1号线',
          'PART_DESC': 'IBC-BRAVO1(RoHS)',
          'FIRST_PASS_YIELD': 83.77,
          'PASS_QTY': 475,
          'TOTAL_QTY': 567,
          'DefectList': [
            {
              'DEFECT_NAME': 'X偏移',
              'DEFECT_QTY': 276
            },
            {
              'DEFECT_NAME': '面积偏少',
              'DEFECT_QTY': 55
            },
            {
              'DEFECT_NAME': '短路',
              'DEFECT_QTY': 13
            }
          ]
        }
      ],
      MapswpSwiper1: '',
      screenHeight: window.innerHeight
    }
  },
  watch: {
    screenHeight (val) {
      console.log(val)
    }
  },
  mounted () {
    const that = this
    window.onresize = () => {
      return (() => {
        that.screenHeight = window.innerHeight
      })()
    }
  },
  created () {
    page.contentHeight = this.screenHeight - 70
    page.graphHeight = (((page.contentHeight - 185) * 0.5) - 8.18)
    this.LoadData()
  },
  methods: {
    // 初始化轮播
    InitSwiper () {
      var swiper1 = new Swiper('.swiper-container', {
        slidesPerView: 1,
        loop: false,
        autoplay: {
          delay: 30000,
          disableOnInteraction: false
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      })
      swiper1.el.onmouseover = function () {
        swiper1.autoplay.stop()
      }
      // 鼠标覆盖停止自动切换与隐藏前进后退按钮
      swiper1.el.onmouseout = function () {
        swiper1.autoplay.start()
      }
    },
    LoadData () {
      var that = this
      // 获取轮播HTML
      var data = this.dataList
      var html = ''

      data.forEach((v, i) => {
        if (i % 2 === 0) {
          html += '<div class="swiper-slide">'
          html += that.GetContent(v)
        } else {
          html += that.GetContent(v)
          html += '</div>'
        }
      })
      this.MapswpSwiper1 = html

      // 初始化图形
      data.forEach(function (v, i) {
        that.$nextTick(() => {
          that.InitPassRatePie(v)
          that.InitDefectBar(v)
        })
      })
      that.$nextTick(() => { that.InitSwiper() })
      // 初始化轮播
    },
    // 获取内容
    GetContent (v) {
      var that = this
      var spanStr = '<span class="top-left border-span-m"></span><span class="top-right border-span-m"></span><span class="bottom-left border-span-m"></span><span class="bottom-right border-span-m"></span>'

      var html = ''
      html += '<div class="col-md-6" style="height:100%;padding:0px;">'
      html += '<div class="row kanban-wo-info">'
      html += '<div class="kanban-wo-info-panel">'
      html += that.GetTableHtml(v)
      html += spanStr
      html += '</div>'
      html += '</div>'

      html += '<div class="col-md-12 graphContent" style = "height: calc(50% - 105px);padding-bottom:20px;">'
      html += '<div class="kanban-wo-site-panel kanban-panel-bg">'
      html += '<div id="WoPassRatePie' + v.STATION_NAME + '" style="height: 100%;"></div>'
      html += spanStr
      html += '</div>'
      html += '</div >'

      html += '<div class="col-md-12 graphContent" style="height: calc(50% - 105px);">'
      html += '<div class="kanban-top-defect-panel kanban-panel-bg">'
      html += '<div id="TopDefectBar' + v.STATION_NAME + '" style="height: 100%;"></div>'
      html += spanStr
      html += '</div>'
      html += '</div>'
      html += '</div>'
      return html
    },
    // 获取表格内容
    GetTableHtml (v) {
      var that = this
      var html = ''
      html += '<table class="titleTable">'
      html += '<tr>'
      html += '<td class="tdTitle">' + that.$t('AoiAndSpiReport._3') + '：</td>'
      html += '<td class="tdValueL">' + v.STATION_TYPE + '</td>'
      html += '<td class="tdTitle">' + that.$t('AoiAndSpiReport._4') + '：</td>'
      html += '<td class="tdValueR">' + v.WO_NO + '</td>'
      html += '</tr>'
      html += '<tr>'
      html += '<td class="tdTitle">' + that.$t('AoiAndSpiReport._5') + '：</td>'
      html += '<td class="tdValueL">' + v.PART_NO + '</td>'
      html += '<td class="tdTitle">' + that.$t('AoiAndSpiReport._6') + '：</td>'
      html += '<td class="tdValueR">' + v.PART_DESC + '</td>'
      html += '</tr>'
      html += '<tr style="border:0px">'
      if (v.STATION_TYPE === 'AOI') {
        html += '<td class="tdTitle">' + that.$t('AoiAndSpiReport._7') + '：</td>'
        html += '<td class="tdValueL" colspan="3">' + v.STATION_NAME + '</td>'
      } else {
        html += '<td class="tdTitle">' + that.$t('AoiAndSpiReport._8') + '：</td>'
        html += '<td class="tdValueR" colspan="3">' + v.LINE_NAME + '</td>'
      }
      html += '</tr>'
      html += '</table>'

      return html
    },
    // 初始化直通率
    InitPassRatePie (v) {
      var that = this
      this.WoPassRatePie = echarts.init(document.getElementById('WoPassRatePie' + v.STATION_NAME))
      var optionWoPassRate = {
        title: {
          text: that.$t('AoiAndSpiReport._9'),
          padding: [20, 0, 0, 10],
          textStyle: {
            color: '#fff'
          },
          subtext: v.PASS_QTY + ' / ' + v.TOTAL_QTY + that.$t('AoiAndSpiReport._10'),
          subtextStyle: {
            // 文字颜色
            color: '#00ffff',
            // 字体粗细 ‘normal‘,‘bold‘,‘bolder‘,‘lighter‘,100 | 200 | 300 | 400...
            fontWeight: 'bold',
            // 字体大小
            fontSize: 20
          }
        },
        tooltip: {
          formatter: that.$t('AoiAndSpiReport._11') + ' : {c}%'
        },
        series: [
          {
            type: 'gauge',
            center: ['50%', '60%'],
            radius: '110%',
            pointer: { // 指针样式
              length: '80%'
            },
            axisLine: {
              show: true, // 是否显示仪表盘轴线(轮廓线),默认 true。
              lineStyle: { // 属性lineStyle控制线条样式
                shadowBlur: 15, // (发光效果)图形阴影的模糊大小。该属性配合 shadowColor,shadowOffsetX, shadowOffsetY 一起设置图形的阴影效果。
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
              distance: 5 // 文字离表盘的距离
            },
            detail: {
              formatter: '{value}%',
              textStyle: {
                fontSize: 30
              }
            },
            data: [{ value: v.FIRST_PASS_YIELD }]
          }
        ]
      }
      this.WoPassRatePie.setOption(optionWoPassRate, true)

      objList.push({ name: 'WoPassRatePie' + v.STATION_NAME, obj: this.WoPassRatePie })
      window.onresize = () => {
        this.WoPassRatePie.resize()
      }
    },
    // 初始化不良现象
    InitDefectBar (v) {
      var that = this
      this.TopDefectBar = echarts.init(document.getElementById('TopDefectBar' + v.STATION_NAME))

      var legendData = []; var seriesData = []
      if (v.DefectList) {
        v.DefectList.forEach(function (d, i) {
          var name = d.DEFECT_NAME + '(' + d.DEFECT_QTY + ')'
          legendData.push(name)
          seriesData.push({ name: name, value: d.DEFECT_QTY })
        })
      }
      var optionTopDefect = {
        title: {
          padding: [20, 0, 0, 10],
          text: that.$t('AoiAndSpiReport._12'),
          textStyle: {
            color: '#FFF'
          }
        },
        color: ['#F4AA61', '#4EC7B8', '#90C9F6', '#FE8463', '#B5C334'],
        tooltip: {
          trigger: 'item',
          formatter: '{b}:占比{d}%'
        },
        legend: {
          orient: 'vertical',
          left: 'right',
          textStyle: {
            color: '#ffffff'// 字体颜色
          },
          data: legendData
        },
        series: [
          {
            name: that.$t('AoiAndSpiReport._13'),
            type: 'pie',
            radius: '75%',
            center: ['50%', '50%'],
            data: seriesData,
            label: {
              normal: {
                formatter: function (data) {
                  return data.name.split('(')[0] + ': ' + data.percent + '%'
                }
              }
            },
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      this.TopDefectBar.setOption(optionTopDefect, true)

      objList.push({ name: 'TopDefectBar' + v.STATION_NAME, obj: this.TopDefectBar })
      window.onresize = () => {
        // this.TopDefectBar.resize()
        objList.forEach((v, i) => {
          v.obj.resize()
        })
        // objList.each(function (i, v) {
        //   v.obj.resize()
        // })
      }
    }

  }

}
</script>
<style src="../../assets/style/bootstrap.min.css"></style>
<style type="text/css" scoped>
@import './AoiAndSpiReport/AoiAndSpiReport.css';
</style>
