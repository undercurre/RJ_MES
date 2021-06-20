import { SfcsOperationLines } from '@/api/EquipCheck'
import { CheckLine, GetKanbanWoData } from '@/api/Kanban'
import {
  GetMesAddMaterialListModels, GetMesHiMaterialListenReelsModels,

  GetWarnValueByLineId
} from '@/api/MesHiMaterialListen'
import echarts from 'echarts'
import { mapGetters } from 'vuex'
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
        alert(this.$t('HiMaterial._33'))
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
  name: 'HiMaterial',
  data () {
    return {
      activeName: 'charging',
      lineId: '',
      info: {},
      MULTI_NO: 1, // 连板数
      HIPTS_ALARM: 50, // 剩余X大板的余料时预警
      page: {},
      list: [],
      dialogVisible: false,
      HiMaterialBar: null,
      listOne: [],
      listTwo: []
    }
  },
  computed: {
    ...mapGetters([
      'userId'
    ])
  },
  created () {
    if (localStorage.getItem('lineId')) {
      this.lineId = localStorage.getItem('lineId')
    }
    if (this.$route.query.lineId) {
      this.lineId = parseInt(this.$route.query.lineId)
    }
    this.getProLines()
    this.$nextTick(() => {
      this.getWoYidldPie()
    })
    if (!this.lineId) {
      this.dialogVisible = true
    } else {
      this.initPageData()
    }
    this.loopData()
  },
  beforeDestroy () {
    clearInterval(this.timer)
  },
  deactivated () {
    clearInterval(this.timer)
  },
  destroyed () {
    clearInterval(this.timer)
  },
  mounted () { localStorage.removeItem('lineId') },
  methods: {
    lineChange (e) {
      this.lineId = e
    },
    async getProLines () {
      const res = await SfcsOperationLines({
        USER_ID: this.userId,
        Page: 1,
        Limit: 10000000
      })
      if (res.Result) {
        this.list = JSON.parse(res.Result) || []
      }
    },
    handleClose (done) {
      if (this.lineId) {
        done()
      } else {
        this.$message.error(this.$t('HiMaterial._30'))
      }
    },
    async initPageData (isShowLoading = true) {
      let loading = null
      if (isShowLoading) {
        loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
      }
      await this.getCheckLine()
      if (isShowLoading) loading.close()
    },
    // 轮询
    loopData () {
      this.timer = setInterval(() => {
        if (!this.timer || this.dialogVisible) {
          return false
        }
        this.initPageData(false)
      }, 5000)
    },
    handleClick (tab, event) {
      console.log(tab, event)
    },
    /* 检测线体是否存在 */
    async getCheckLine () {
      const res = await CheckLine(this.lineId)
      if (res.Result) {
        await this.GetKanbanWo()
        await this.getMesHiMaterialListenReelsModels()
        await this.checkLine_()
        await this.getMesAddMaterialListModels()
      }
    },
    // 工单信息
    async GetKanbanWo () {
      const res = await GetKanbanWoData(this.lineId)
      if (res.Result) {
        let data = JSON.parse(res.Result)
        console.log(data, '获取产线的工单信息')
        if (data.length === 0) {
          data = [{
            HIPTS_ALARM: 0,
            MODEL: '',
            MULTI_NO: 0,
            OPERATION_LINE_ID: 0,
            OPERATION_LINE_NAME: '',
            OUTPUT_QTY: 0,
            PART_NO: '',
            ROUTE_ID: 0,
            TARGET_QTY: 0,
            UPDATE_TIME: '',
            WO_ID: 0,
            WO_NO: '',
            YIELD: 0
          }]
        }
        this.info = data[0] || {}
        this.MULTI_NO = this.info.MULTI_NO
        this.HIPTS_ALARM = this.info.HIPTS_ALARM

        this.WoYidldPie.hideLoading() // 隐藏加载动画
        this.WoYidldPie.setOption({ // 加载数据图表
          title: {
            left: 'center',
            top: 'middle',
            subtext: this.info.OUTPUT_QTY + ' / ' + this.info.TARGET_QTY + this.$t('smt.ps')
          },
          series: [{
            data: [{
              value: (parseFloat(this.info.YIELD) * 100).toFixed(2),
              name: this.$t('HiMaterial._31')
            }]
          }]
        })
      }
    },
    // 低水位信息
    async getMesHiMaterialListenReelsModels () {
      const res = await GetMesHiMaterialListenReelsModels(this.lineId)
      if (res.Result) {
        const data = JSON.parse(res.Result)
        this.listOne = data || []
        // this.listOne = [
        //   {
        //     'ID': 13039,
        //     'BATCH_NO': '404af789-678d-4279-8a29-06ebbb75b7f7',
        //     'WO_NO': '501000249246',
        //     'CURR_REEL_ID': '3798A9409BAB4EF2B6C86B549D6D39E4',
        //     'OPERATION_LINE_ID': 554003,
        //     'PART_NO': '483W-022510-70M0',
        //     'UNITY_QTY': 1,
        //     'PRE_QTY': 462,
        //     'USED_QTY': 0,
        //     'STATUS': 0,
        //     'OPERATION_ID': null,
        //     'OPERATION_NAME': null,
        //     'PN_NAME': '483W-022510-70M0',
        //     'PCB_QTY': 462,
        //     'DATE_CODE': '20200910',
        //     'LOT_CODE': '202007015',
        //     'CODE': 'SKY-9999',
        //     'NAME': '深圳创维',
        //     'REEL_ID': '3798A9409BAB4EF2B6C86B549D6D39E4',
        //     'REEL_PN': '483W-022510-70M0',
        //     'OPERTOR': 'chengg',
        //     'CREATE_TIME': '2020-09-21 22:26:05',
        //     'MES_USER': null,
        //     'QTY': 462
        //   },
        //   {
        //     'ID': 13028,
        //     'BATCH_NO': '404af789-678d-4279-8a29-06ebbb75b7f7',
        //     'WO_NO': '501000249246',
        //     'CURR_REEL_ID': 'HC00120200729084841GC10000000103',
        //     'OPERATION_LINE_ID': 554003,
        //     'PART_NO': '4348-S24700-7Z20',
        //     'UNITY_QTY': 2,
        //     'PRE_QTY': 1000,
        //     'USED_QTY': 0,
        //     'STATUS': 0,
        //     'OPERATION_ID': null,
        //     'OPERATION_NAME': null,
        //     'PN_NAME': '4348-S24700-7Z20',
        //     'PCB_QTY': 500,
        //     'DATE_CODE': '20200729',
        //     'LOT_CODE': 'N03-0558A',
        //     'CODE': 'SKY-9999',
        //     'NAME': '深圳创维',
        //     'REEL_ID': 'HC00120200729084841GC10000000103',
        //     'REEL_PN': '4348-S24700-7Z20',
        //     'OPERTOR': 'chengg',
        //     'CREATE_TIME': '2020-09-21 22:27:57',
        //     'MES_USER': null,
        //     'QTY': 1000
        //   },
        //   {
        //     'ID': 13044,
        //     'BATCH_NO': '404af789-678d-4279-8a29-06ebbb75b7f7',
        //     'WO_NO': '501000249246',
        //     'CURR_REEL_ID': 'EC7B85A3255242CEA17427B01A96C762',
        //     'OPERATION_LINE_ID': 554003,
        //     'PART_NO': '483W-061030-Z040',
        //     'UNITY_QTY': 2,
        //     'PRE_QTY': 1920,
        //     'USED_QTY': 0,
        //     'STATUS': 0,
        //     'OPERATION_ID': null,
        //     'OPERATION_NAME': null,
        //     'PN_NAME': '483W-061030-Z040',
        //     'PCB_QTY': 960,
        //     'DATE_CODE': '20200910',
        //     'LOT_CODE': '202007014',
        //     'CODE': 'SKY-9999',
        //     'NAME': '深圳创维',
        //     'REEL_ID': 'EC7B85A3255242CEA17427B01A96C762',
        //     'REEL_PN': '483W-061030-Z040',
        //     'OPERTOR': 'chengg',
        //     'CREATE_TIME': '2020-09-21 22:28:06',
        //     'MES_USER': null,
        //     'QTY': 1920
        //   }
        // ]
        console.log(data, '自动化线看板-低水位预警')
        // if (data) {
        //   if (data.length > 0) {
        var arr = [] // new Array[]; 数组
        for (var i in data) {
          var obj = {} // 对象
          obj.PART_NO = data[i].PART_NO
          obj.PCB_QTY = data[i].PCB_QTY
          arr.push(obj)
          console.log('obj: ', obj)
        }
        console.log(this.HiMaterialBar)
        this.HiMaterialBar.hideLoading() // 隐藏加载动画
        this.HiMaterialBar.setOption({ // 加载数据图表
          dataset: {
            source: arr
          }
        })
        //   }
        // }
      }
    },
    // 低水位刻线
    async checkLine_ () {
      const res = await GetWarnValueByLineId(this.lineId)
      if (res.Result) {
        // eslint-disable-next-line no-unused-vars
        const data = res.Result || []
        this.HiMaterialBar.setOption({
          yAxis: [
            {
              splitLine: {
                show: false
              }
            }
          ],
          series: [
            {
              name: this.$t('HiMaterial._34'),
              markLine: {
                lineStyle: {
                  type: 'solid',
                  color: 'red'
                },
                data: [
                  { yAxis: data, name: this.$t('HiMaterial._35') }
                ]
              }
            }
          ]
        })
      }
    },
    // 获取上料记录
    async getMesAddMaterialListModels () {
      const res = await GetMesAddMaterialListModels(this.lineId)
      if (res.Result) {
        const data = JSON.parse(res.Result) || []
        console.log('获取上料记录: ', data)
        this.listTwo = data
        // this.listTwo = [
        //   {
        //     'OPERATION_SITE_NAME': null,
        //     'PART_NAME': '483W-061030-Z040',
        //     'PART_NO': '483W-061030-Z040',
        //     'REEL_ID': 'EC7B85A3255242CEA17427B01A96C762',
        //     'QTY': 1920,
        //     'ORG_QTY': 1920,
        //     'USED_QTY': 0,
        //     'STATUS': '在用',
        //     'CREATE_TIME': '2020-09-21 22:28:06',
        //     'OPERTOR': 'chengg',
        //     'MES_USER': null,
        //     'LOT_CODE': '202007014',
        //     'DATE_CODE': '20200910',
        //     'V_NAME': '深圳创维'
        //   },
        //   {
        //     'OPERATION_SITE_NAME': null,
        //     'PART_NAME': '4348-S24700-7Z20',
        //     'PART_NO': '4348-S24700-7Z20',
        //     'REEL_ID': 'HC00120200729084841GC10000000103',
        //     'QTY': 1000,
        //     'ORG_QTY': 1000,
        //     'USED_QTY': 0,
        //     'STATUS': '在用',
        //     'CREATE_TIME': '2020-09-21 22:27:57',
        //     'OPERTOR': 'chengg',
        //     'MES_USER': null,
        //     'LOT_CODE': 'N03-0558A',
        //     'DATE_CODE': '20200729',
        //     'V_NAME': '深圳创维'
        //   },
        //   {
        //     'OPERATION_SITE_NAME': null,
        //     'PART_NAME': '483W-022510-70M0',
        //     'PART_NO': '483W-022510-70M0',
        //     'REEL_ID': '3798A9409BAB4EF2B6C86B549D6D39E4',
        //     'QTY': 462,
        //     'ORG_QTY': 462,
        //     'USED_QTY': 0,
        //     'STATUS': '在用',
        //     'CREATE_TIME': '2020-09-21 22:26:05',
        //     'OPERTOR': 'chengg',
        //     'MES_USER': null,
        //     'LOT_CODE': '202007015',
        //     'DATE_CODE': '20200910',
        //     'V_NAME': '深圳创维'
        //   },
        //   {
        //     'OPERATION_SITE_NAME': null,
        //     'PART_NAME': '483W-022510-70M0',
        //     'PART_NO': '483W-022510-70M0',
        //     'REEL_ID': '3798A9409BAB4EF2B6C86B549D6D39E4',
        //     'QTY': 462,
        //     'ORG_QTY': 462,
        //     'USED_QTY': 0,
        //     'STATUS': '在用',
        //     'CREATE_TIME': '2020-09-21 22:26:05',
        //     'OPERTOR': 'chengg',
        //     'MES_USER': null,
        //     'LOT_CODE': '202007015',
        //     'DATE_CODE': '20200910',
        //     'V_NAME': '深圳创维'
        //   },
        //   {
        //     'OPERATION_SITE_NAME': null,
        //     'PART_NAME': '483W-022510-70M0',
        //     'PART_NO': '483W-022510-70M0',
        //     'REEL_ID': '3798A9409BAB4EF2B6C86B549D6D39E4',
        //     'QTY': 462,
        //     'ORG_QTY': 462,
        //     'USED_QTY': 0,
        //     'STATUS': '在用',
        //     'CREATE_TIME': '2020-09-21 22:26:05',
        //     'OPERTOR': 'chengg',
        //     'MES_USER': null,
        //     'LOT_CODE': '202007015',
        //     'DATE_CODE': '20200910',
        //     'V_NAME': '深圳创维'
        //   },
        //   {
        //     'OPERATION_SITE_NAME': null,
        //     'PART_NAME': '483W-022510-70M0',
        //     'PART_NO': '483W-022510-70M0',
        //     'REEL_ID': '3798A9409BAB4EF2B6C86B549D6D39E4',
        //     'QTY': 462,
        //     'ORG_QTY': 462,
        //     'USED_QTY': 0,
        //     'STATUS': '在用',
        //     'CREATE_TIME': '2020-09-21 22:26:05',
        //     'OPERTOR': 'chengg',
        //     'MES_USER': null,
        //     'LOT_CODE': '202007015',
        //     'DATE_CODE': '20200910',
        //     'V_NAME': '深圳创维'
        //   },
        //   {
        //     'OPERATION_SITE_NAME': null,
        //     'PART_NAME': '483W-022510-70M0',
        //     'PART_NO': '483W-022510-70M0',
        //     'REEL_ID': '3798A9409BAB4EF2B6C86B549D6D39E4',
        //     'QTY': 462,
        //     'ORG_QTY': 462,
        //     'USED_QTY': 0,
        //     'STATUS': '在用',
        //     'CREATE_TIME': '2020-09-21 22:26:05',
        //     'OPERTOR': 'chengg',
        //     'MES_USER': null,
        //     'LOT_CODE': '202007015',
        //     'DATE_CODE': '20200910',
        //     'V_NAME': '深圳创维'
        //   }, {
        //     'OPERATION_SITE_NAME': null,
        //     'PART_NAME': '483W-022510-70M0',
        //     'PART_NO': '483W-022510-70M0',
        //     'REEL_ID': '3798A9409BAB4EF2B6C86B549D6D39E4',
        //     'QTY': 462,
        //     'ORG_QTY': 462,
        //     'USED_QTY': 0,
        //     'STATUS': '在用',
        //     'CREATE_TIME': '2020-09-21 22:26:05',
        //     'OPERTOR': 'chengg',
        //     'MES_USER': null,
        //     'LOT_CODE': '202007015',
        //     'DATE_CODE': '20200910',
        //     'V_NAME': '深圳创维'
        //   },
        //   {
        //     'OPERATION_SITE_NAME': null,
        //     'PART_NAME': '483W-022510-70M0',
        //     'PART_NO': '483W-022510-70M0',
        //     'REEL_ID': '3798A9409BAB4EF2B6C86B549D6D39E4',
        //     'QTY': 462,
        //     'ORG_QTY': 462,
        //     'USED_QTY': 0,
        //     'STATUS': '在用',
        //     'CREATE_TIME': '2020-09-21 22:26:05',
        //     'OPERTOR': 'chengg',
        //     'MES_USER': null,
        //     'LOT_CODE': '202007015',
        //     'DATE_CODE': '20200910',
        //     'V_NAME': '深圳创维'
        //   },
        //   {
        //     'OPERATION_SITE_NAME': null,
        //     'PART_NAME': '483W-061030-Z040',
        //     'PART_NO': '483W-061030-Z040',
        //     'REEL_ID': 'EC7B85A3255242CEA17427B01A96C762',
        //     'QTY': 1920,
        //     'ORG_QTY': 1920,
        //     'USED_QTY': 0,
        //     'STATUS': '在用',
        //     'CREATE_TIME': '2020-09-21 22:28:06',
        //     'OPERTOR': 'chengg',
        //     'MES_USER': null,
        //     'LOT_CODE': '202007014',
        //     'DATE_CODE': '20200910',
        //     'V_NAME': '深圳创维'
        //   },
        //   {
        //     'OPERATION_SITE_NAME': null,
        //     'PART_NAME': '4348-S24700-7Z20',
        //     'PART_NO': '4348-S24700-7Z20',
        //     'REEL_ID': 'HC00120200729084841GC10000000103',
        //     'QTY': 1000,
        //     'ORG_QTY': 1000,
        //     'USED_QTY': 0,
        //     'STATUS': '在用',
        //     'CREATE_TIME': '2020-09-21 22:27:57',
        //     'OPERTOR': 'chengg',
        //     'MES_USER': null,
        //     'LOT_CODE': 'N03-0558A',
        //     'DATE_CODE': '20200729',
        //     'V_NAME': '深圳创维'
        //   },
        //   {
        //     'OPERATION_SITE_NAME': null,
        //     'PART_NAME': '483W-022510-70M0',
        //     'PART_NO': '483W-022510-70M0',
        //     'REEL_ID': '3798A9409BAB4EF2B6C86B549D6D39E4',
        //     'QTY': 462,
        //     'ORG_QTY': 462,
        //     'USED_QTY': 0,
        //     'STATUS': '在用',
        //     'CREATE_TIME': '2020-09-21 22:26:05',
        //     'OPERTOR': 'chengg',
        //     'MES_USER': null,
        //     'LOT_CODE': '202007015',
        //     'DATE_CODE': '20200910',
        //     'V_NAME': '深圳创维'
        //   },
        //   {
        //     'OPERATION_SITE_NAME': null,
        //     'PART_NAME': '483W-022510-70M0',
        //     'PART_NO': '483W-022510-70M0',
        //     'REEL_ID': '3798A9409BAB4EF2B6C86B549D6D39E4',
        //     'QTY': 462,
        //     'ORG_QTY': 462,
        //     'USED_QTY': 0,
        //     'STATUS': '在用',
        //     'CREATE_TIME': '2020-09-21 22:26:05',
        //     'OPERTOR': 'chengg',
        //     'MES_USER': null,
        //     'LOT_CODE': '202007015',
        //     'DATE_CODE': '20200910',
        //     'V_NAME': '深圳创维'
        //   },
        //   {
        //     'OPERATION_SITE_NAME': null,
        //     'PART_NAME': '483W-022510-70M0',
        //     'PART_NO': '483W-022510-70M0',
        //     'REEL_ID': '3798A9409BAB4EF2B6C86B549D6D39E4',
        //     'QTY': 462,
        //     'ORG_QTY': 462,
        //     'USED_QTY': 0,
        //     'STATUS': '在用',
        //     'CREATE_TIME': '2020-09-21 22:26:05',
        //     'OPERTOR': 'chengg',
        //     'MES_USER': null,
        //     'LOT_CODE': '202007015',
        //     'DATE_CODE': '20200910',
        //     'V_NAME': '深圳创维'
        //   },
        //   {
        //     'OPERATION_SITE_NAME': null,
        //     'PART_NAME': '483W-022510-70M0',
        //     'PART_NO': '483W-022510-70M0',
        //     'REEL_ID': '3798A9409BAB4EF2B6C86B549D6D39E4',
        //     'QTY': 462,
        //     'ORG_QTY': 462,
        //     'USED_QTY': 0,
        //     'STATUS': '在用',
        //     'CREATE_TIME': '2020-09-21 22:26:05',
        //     'OPERTOR': 'chengg',
        //     'MES_USER': null,
        //     'LOT_CODE': '202007015',
        //     'DATE_CODE': '20200910',
        //     'V_NAME': '深圳创维'
        //   },
        //   {
        //     'OPERATION_SITE_NAME': null,
        //     'PART_NAME': '483W-022510-70M0',
        //     'PART_NO': '483W-022510-70M0',
        //     'REEL_ID': '3798A9409BAB4EF2B6C86B549D6D39E4',
        //     'QTY': 462,
        //     'ORG_QTY': 462,
        //     'USED_QTY': 0,
        //     'STATUS': '在用',
        //     'CREATE_TIME': '2020-09-21 22:26:05',
        //     'OPERTOR': 'chengg',
        //     'MES_USER': null,
        //     'LOT_CODE': '202007015',
        //     'DATE_CODE': '20200910',
        //     'V_NAME': '深圳创维'
        //   }, {
        //     'OPERATION_SITE_NAME': null,
        //     'PART_NAME': '483W-022510-70M0',
        //     'PART_NO': '483W-022510-70M0',
        //     'REEL_ID': '3798A9409BAB4EF2B6C86B549D6D39E4',
        //     'QTY': 462,
        //     'ORG_QTY': 462,
        //     'USED_QTY': 0,
        //     'STATUS': '在用',
        //     'CREATE_TIME': '2020-09-21 22:26:05',
        //     'OPERTOR': 'chengg',
        //     'MES_USER': null,
        //     'LOT_CODE': '202007015',
        //     'DATE_CODE': '20200910',
        //     'V_NAME': '深圳创维'
        //   },
        //   {
        //     'OPERATION_SITE_NAME': null,
        //     'PART_NAME': '483W-022510-70M0',
        //     'PART_NO': '483W-022510-70M0',
        //     'REEL_ID': '3798A9409BAB4EF2B6C86B549D6D39E4',
        //     'QTY': 462,
        //     'ORG_QTY': 462,
        //     'USED_QTY': 0,
        //     'STATUS': '在用',
        //     'CREATE_TIME': '2020-09-21 22:26:05',
        //     'OPERTOR': 'chengg',
        //     'MES_USER': null,
        //     'LOT_CODE': '202007015',
        //     'DATE_CODE': '20200910',
        //     'V_NAME': '深圳创维'
        //   }
        // ]
      }
    },
    getWoYidldPie () {
      /* =====================工单完成率 仪表盘 init=========================== */
      this.WoYidldPie = echarts.init(document.getElementById('WoYieldPie'))
      var optionWo = null
      optionWo = {
        title: {
          left: 'center',
          top: 'middle',
          subtextStyle: {
            // 文字颜色
            color: '#FFF',
            // 字体风格,‘normal‘,‘italic‘,‘oblique‘
            fontStyle: 'normal',
            // 字体粗细 ‘normal‘,‘bold‘,‘bolder‘,‘lighter‘,100 | 200 | 300 | 400...
            fontWeight: 'bold',
            // 字体系列
            // fontFamily: 'sans-serif',
            // 字体大小
            fontSize: 14,
            padding: [50, 0, 0, 0]
          }
        },
        grid: {
          top: 50,
          left: 40,
          right: 40,
          bottom: 30,
          containLabel: true
        },
        tooltip: {
          // formatter: "{a} <br/>{b} : {c}%"
          formatter: '{b} : {c}%'
        },
        legend: {
          // top: 30,                // 上距离
          selectedMode: false, // 取消图例上的点击事件
          textStyle: {
            fontSize: 20, // 字体大小
            color: '#ffffff' // 字体颜色
          }
        },
        series: [{
          type: 'gauge',
          label: {
            normal: {
              show: true,
              position: 'bottom'
            }
          },
          title: { // 设置仪表盘中间显示文字样式
            textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
              color: 'white'
            }
          },
          center: ['50%', '60%'],
          radius: '90%',
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
                [1, '#20AE51'] // 90%-100%处的颜色
              ],
              width: 15 // 表盘宽度
            }
          },
          axisLabel: { // 文字样式（及“10”、“20”等文字样式）
            color: 'white',
            distance: 0 // 文字离表盘的距离
          },
          detail: {
            formatter: '{value}%'
          },
          data: [{
            value: 0,
            name: this.$t('HiMaterial._31')
          }]
        }]
      }
      this.WoYidldPie.setOption(optionWo, true)
      /* =====================低水位警报 柱状图 init============================== */
      this.HiMaterialBar = echarts.init(document.getElementById('HiMaterialBar'))
      var optionHiMaterial = null
      optionHiMaterial = {
        title: {
          id: 2,
          text: this.$t('HiMaterial._32'),
          padding: [20, 0, 0, 10],
          textStyle: {
            color: '#FFF'
          }
        },
        // 蓝、橙、绿、青、黄、紫、粉、棕、灰、红
        color: ['#B96666', 'orange', 'green', 'cyan', 'yellow', 'purple', 'pink', 'brown', 'gray', 'red'],
        // legend: {
        //   textStyle: {
        //     // fontSize: 18,//字体大小
        //     color: '#ffffff' // 字体颜色
        //   }
        // },
        grid: {
          top: 50,
          left: 10,
          right: 50,
          bottom: 10,
          containLabel: true
        },
        dataset: {
          // dimensions: ['site', 'PASS', 'FAIL', 'REPASS', 'REFAIL'],
          dimensions: ['PART_NO', 'PCB_QTY'],
          source: []
        },
        xAxis: {
          type: 'category',
          axisLabel: {
            interval: 0,
            rotate: 30,
            color: '#FFF'
          },
          axisLine: {
            lineStyle: {
              shadowBlur: 10, // (发光效果)图形阴影的模糊大小。该属性配合 shadowColor,shadowOffsetX, shadowOffsetY 一起设置图形的阴影效果。
              shadowColor: '#fff', // 阴影颜色。支持的格式同color。
              color: '#FFF',
              width: 1
            }
          }
        },
        yAxis: {
          type: 'value',
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
          }
        },
        series: [{
          type: 'bar',
          label: {
            normal: {
              show: true,
              position: 'top'
              // color: '#FFF'
            }
          },
          barMaxWidth: 35 // 最大宽度
        }]
      }
      this.HiMaterialBar.setOption(optionHiMaterial, true)
      window.onresize = () => {
        this.WoYidldPie.resize()
        this.HiMaterialBar.resize()
      }
    }
  },
  watch: {
    lineId (val) {
      if (val) {
        this.dialogVisible = false
        this.initPageData()
      } else {
        Object.assign(this.$data, this.$options.data(), {
          list: this.list
        })
        this.dialogVisible = true
      }
    }
  }
}
