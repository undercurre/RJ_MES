import {
  GetEquipCheckData,
  GetEquipKeepHeadData,
  GetEquipRepairHeadData,
  GetKanbanWoData,
  SfcsOperationLines,
  SmtLines
} from '@/api/EquipCheck'
import Screenfull from 'screenfull'
import { mapGetters } from 'vuex'
// 判断字符串是否为null
function IsNull (str) {
  if (str == null || str === undefined) { return '' }
  return str
}
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
var equipData = {}
// 构建点检保养数据
export default {
  fs,
  name: 'EquipCheck',
  components: { Screenfull },
  computed: {
    ...mapGetters([
      'userId'
    ])
  },
  data () {
    return {
      img_url: process.env.VUE_APP_BASE_IMG,
      active: 0,
      lineId: '',
      LineName: '',
      WoNo: '',
      PartNo: '',
      WoModel: '',
      mainStart: 0,
      EquipForm: {
        topCount: 5,
        LineId: 85
      },
      HeadForm: {
        topCount: 5,
        equipId: 0// 设备id
      },
      RepairHead: {
        topCount: 5,
        equipId: 0// 设备id
      },
      basicHtml: '',
      basicSTATUS: -1,
      imgListHtml: '',
      serviceHtml: '',
      tableId: '',
      dialogVisible: false,
      SMTlinesList: [],
      ProlinesList: [],
      proLinesId: '',
      list: []
    }
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
  async created () {
    await this.getSMTLines()
    await this.getProLines()
    this.list = []
    this.list = this.list.concat(this.SMTlinesList.map(item => {
      return {
        label: item.LINE_NAME,
        value: item.ID
      }
    }), this.ProlinesList.map(item => {
      return {
        label: item.OPERATION_LINE_NAME,
        value: item.ID
      }
    }))
    if (this.$route.query.lineId) {
      this.lineId = parseInt(this.$route.query.lineId)
    }
    if (!this.lineId) {
      this.dialogVisible = true
    } else {
      this.loadPageData()
    }
    this.loopData()
  },
  methods: {
    handleClose (done) {
      if (this.lineId) {
        done()
      } else {
        this.$message.error(this.$t('_kanban._6'))
      }
    },
    async getSMTLines () {
      const res = await SmtLines({
        USER_ID: this.userId,
        Page: 1,
        Limit: 10000000
      })
      this.SMTlinesList = res.Result || []
    },
    async getProLines () {
      const res = await SfcsOperationLines({
        USER_ID: this.userId,
        Page: 1,
        Limit: 10000000
      })
      if (res.Result) {
        this.ProlinesList = JSON.parse(res.Result) || []
      }
    },
    async loadPageData (isShowLoading = true) {
      this.EquipForm.LineId = this.lineId || this.proLinesId
      let loading = null
      if (isShowLoading) {
        loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
      }
      await this.GetSmtKanbanWo()
      await this.GetEquipCheck()
      if (isShowLoading) loading.close()
    },
    // 轮询
    loopData () {
      this.timer = setInterval(() => {
        if (!this.lineId || this.dialogVisible) {
          return false
        }
        this.loadPageData(false)
      }, 5000)
    },
    GetKeepType (type) {
      switch (type) {
        case 0:
          return this.$t('eck._14')
        case 1:
          return this.$t('eck._15')
        case 2:
          return this.$t('eck._16')
        default:
          return ''
      }
    },
    GetStatusName (status) {
      switch (status) {
        case 0:
          return this.$t('eck._17')
        case 1:
          return this.$t('eck._18')
        case 3:
          return this.$t('eck._19')
        case 4:
          return this.$t('eck._20')
        default:
          return ''
      }
    },
    getColorByStatus (status) {
      var color = '#00ffff'
      switch (status) {
        case 0:
          color = 'green'; break
        case 1:
          color = 'blue'; break
        case 2:
          color = 'orange'; break
        case 3:
          color = '#0dcdf8'; break
        case 4:
          color = 'red'; break
        default:
      }
      return color
    },
    async GetSmtKanbanWo () {
      const res = await GetKanbanWoData(this.lineId)
      if (res.Result) {
        const data = JSON.parse(res.Result)
        console.log(data, '获取产线的工单信息')
        if (data.length === 0) {
          return false
        }
        this.LineName = data[0].OPERATION_LINE_NAME ? data[0].OPERATION_LINE_NAME : ''
        this.WoNo = data[0].WO_NO ? data[0].WO_NO : ''
        this.PartNo = data[0].PART_NO ? data[0].PART_NO : ''
        this.WoModel = data[0].MODEL ? data[0].MODEL : ''
      }
    },
    // 初始化设备数据
    async GetEquipCheck () {
      const res = await GetEquipCheckData(this.EquipForm)
      if (res.Result) {
        const data = JSON.parse(res.Result)
        console.log(data, 'data获取设备点检信息')
        console.log(res, '获取设备点检信息')
        if (data.length === 0) {
          this.basicSTATUS = -1
          this.basicHtml = '' // 基本信息
          this.tableId = ''
          this.serviceHtml = ''
          this.imgListHtml = []
          return false
        }
        // 轮播图
        var equips = data
        // var imgCount = equips.length

        equips.forEach((v, i) => {
          equipData['ID' + v.ID] = v
        })
        this.imgListHtml = data
        console.log('============= ', this.imgListHtml)
        this.InitEquipBasicData(data[0].ID)
        this.GetEquipKeepHead(data[0].ID)
        this.GetEquipRepairHead(data[0].ID)

        this.$nextTick(() => {
          var dom = document.getElementsByClassName('CheckImg')
          var ImgCur = document.getElementsByClassName('img_cur')
          if (dom) {
            for (var i = 0, len = dom.length; i < len; i++) {
              console.log(dom[i])
              dom[i].style.color = 'red'
              dom[i].style.borderBottom = '6px solid ' + this.getColorByStatus(data[0].STATUS)
            }
          }
          if (ImgCur) {
            for (var v = 0, le = ImgCur.length; v < le; v++) {
              console.log(ImgCur[v])
              ImgCur[v].style.border = ''
              ImgCur[v].style.border = '6px solid ' + this.getColorByStatus(this.mainStart)
            }
          }
        })
        this.mainStart = data[0].STATUS
      }
    },
    imgoClick (index, id) {
      this.active = index
      this.InitEquipBasicData(id)
      this.GetEquipKeepHead(id)
      this.GetEquipRepairHead(id)
      var ImgCur = document.getElementsByClassName('img_cur')
      this.$nextTick(() => {
        var dom = document.getElementsByClassName('CheckImg')
        if (dom) {
          for (var i = 0, len = dom.length; i < len; i++) {
            console.log(dom[i])
            dom[i].style.color = 'red'
            dom[i].style.border = ''
            dom[i].style.borderBottom = '6px solid ' + this.getColorByStatus(this.mainStart)
          }
        }
        if (ImgCur) {
          for (var v = 0, le = ImgCur.length; v < le; v++) {
            console.log(ImgCur[v])
            ImgCur[v].style.border = ''
            ImgCur[v].style.border = '6px solid ' + this.getColorByStatus(this.mainStart)
          }
        }
      })
      // console.log(id)
    },
    // 初始化设备基本信息
    InitEquipBasicData (equipID) {
      var v = equipData['ID' + equipID]
      console.log(v, '初始化设备基本信息')
      console.log(v.STATUS)

      var html = ''
      html += '<tr><td class="table-title">' + this.$t('eck._21') + '：</td><td class="table-value">' + IsNull(v.NAME) + '</td><td class="table-title">' + this.$t('eck._37') + ':</td><td class="table-value">' + IsNull(v.CATEGORY_NAME) + '</td></tr>'
      html += '<tr><td class="table-title">' + this.$t('eck._22') + '：</td><td class="table-value">' + IsNull(v.PROPERTY_NO) + '</td><td class="table-title">' + this.$t('eck._38') + ':</td><td class="table-value">' + IsNull(v.PRODUCT_NO) + '</td></tr>'
      html += '<tr><td class="table-title">' + this.$t('eck._23') + '：</td><td class="table-value">' + IsNull(v.MODEL) + '</td><td class="table-title">' + this.$t('eck._39') + ':</td><td class="table-value">' + IsNull(v.USER_PART_NAME) + '</td></tr>'
      html += '<tr><td class="table-title">' + this.$t('eck._24') + '：</td><td class="table-value">' + IsNull(v.STATION_NAME) + '</td><td class="table-title">' + this.$t('eck._40') + ':</td><td class="table-value">' + IsNull(v.POWER) + '</td></tr>'
      html += '<tr><td class="table-title">' + this.$t('eck._25') + '：</td><td class="table-value">' + IsNull(v.VENDOR) + '</td><td class="table-title">' + this.$t('eck._41') + ':</td><td class="table-value">' + IsNull(v.BUY_TIME.split(' ')[0]) + '</td></tr>'
      html += '<tr><td class="table-title">' + this.$t('eck._26') + '：</td><td class="table-value">' + IsNull(v.USER_AGE) + '</td><td class="table-title">' + this.$t('eck._42') + ':</td><td class="table-value">' + IsNull(v.END_TIME.split(' ')[0]) + '</td></tr>'
      this.basicHtml = html
      this.basicSTATUS = v.STATUS
    },
    // 初始化设备 维修记录
    async GetEquipRepairHead (equipId) {
      this.RepairHead.equipId = equipId
      const res = await GetEquipRepairHeadData(this.RepairHead)
      if (res.Result) {
        const data = JSON.parse(res.Result)
        console.log(data)
        var list = data.RepairHeadList
        var html = '<tr><th style="width:15%;">' + this.$t('eck._27') + '</th><th style="width:25%;">' + this.$t('eck._28') + '</th><th style="width:25%;">' + this.$t('eck._29') + '</th><th style="width:20%;">' + this.$t('eck._30') + '</th><th style="width:15%;">' + this.$t('eck._31') + '</th></tr>'
        list.forEach((i, v) => {
          var statusStr = ''
          switch (i.REPAIR_STATUS) {
            case '0':
              statusStr = '<span style="font-weight:800;color:green">' + this.$t('eck._6') + '</span>'; break
            case '1':
              statusStr = '<span style="font-weight:800;color:blue">' + this.$t('eck._7') + '</span>'; break
            case '2':
              statusStr = '<span style="font-weight:800;color:orange">' + this.$t('eck._8') + '</span>'; break
            case '3':
              statusStr = '<span style="font-weight:800;color:#0dcdf8">' + this.$t('eck._9') + '</span>'; break
            case '4':
              statusStr = '<span style="font-weight:800;color:red">' + this.$t('eck._10') + '</span>'; break
            default:
          }

          html += '<tr><td>' + IsNull(i.REPAIR_USER) + '</td><td>' + IsNull(i.BEGINTIME) + '</td><td>' + IsNull(i.ENDTIME) + '</td><td>' + IsNull(i.REPAIR_CONTENT) + '</td><td>' + statusStr + '</td></tr>'
        })
        this.serviceHtml = html
        console.log(data, '获取设备维修信息')
      }
    },

    // 保养记录 初始化设备点检记录
    async GetEquipKeepHead (equipId) {
      this.HeadForm.equipId = equipId
      const res = await GetEquipKeepHeadData(this.HeadForm)
      if (res.Result) {
        const data = JSON.parse(res.Result)
        var listDay = data.DayKeepList
        var listMonth = data.MonthKeepList
        var listYear = data.YearKeepList

        if (listMonth.length > 0) { listDay.unshift(listMonth[0]) }

        if (listYear.length > 0) { listDay.unshift(listYear[0]) }

        var html = '<tr><th style="width:13%;">' + this.$t('eck._32') + '</th><th style="width:30%;">' + this.$t('eck._33') + '</th><th style="width:30%;">' + this.$t('eck._34') + '</th><th style="width:14%;">' + this.$t('eck._35') + '</th><th style="width:13%;">' + this.$t('eck._36') + '</th></tr>'
        listDay.forEach((v, i) => {
          html += '<tr><td>' + this.GetKeepType(IsNull(v.KEEP_TYPE)) + '</td><td>' + IsNull(v.KEEP_CODE) + '</td><td>' + IsNull(v.KEEP_TIME) + '</td><td>' + IsNull(v.KEEP_USER) + '</td><td>' + this.GetStatusName(v.KEEP_CHECK_STATUS) + '</td></tr>'
        })
        this.tableId = html
        console.log(data, '获取设备点检报表信息')
      }
    }
  },
  watch: {
    lineId (val) {
      if (val) {
        this.dialogVisible = false
        this.loadPageData()
      } else {
        Object.assign(this.$data, this.$options.data(), {
          SMTlinesList: this.SMTlinesList,
          ProlinesList: this.ProlinesList
        })
        this.dialogVisible = true
      }
    }
  }
}
