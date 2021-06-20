import {
  CollectIndex,
  CollectUIDIndex, GetBadDataBySN,

  GetComponentInfomation,
  GetComponentsReplace, GetLineNameList,
  GetOperNameList,

  GetReasonCodeList,

  GetRefreshUnrepairedQty, GetRepairSiteData,

  GetResourcesReplace, GetResponserList,

  // TODO 采用新接口
  GetRuncardInfoBySn, GetSnDataList,

  GetUIDSReplace,
  LoadRouteConfig,
  SaveComponentReplace, SaveRepairData,

  SaveResourcesReplace // 产品资源替换保存
  ,

  SaveScrappedData,

  SaveUIDReplace,
  SfcsProductComponentsIndex,
  SfcsProductComponentsLoadData,
  SfcsProductResourcesLoadData,
  SfcsProductUidsLoadData,

  SfcsRoutesIndex
} from '@/api/SfcsCollectDefects'
import customContainerHeader from '@/components/custom-container-header'
import echarts from 'echarts'
import {
  cloneDeep
} from 'lodash'
import {
  mapGetters
} from 'vuex'
export default {
  name: 'SfcsCollectDefects',
  components: {
    customContainerHeader
  },
  computed: {
    ...mapGetters([
      'userId',
      'username'
    ])
  },
  data () {
    return {
      form: {},
      submitForm: {},
      charts: null,
      dialogVisible: true, // 站点查询
      siteList: [],
      siteForm: {},
      dialogVisible2: false, // 查询流水号
      SnList: [],
      SnTotalCount: 0,
      SnListQuery: {
        Page: 1,
        Limit: 10,
        Key: ''
      },
      dialogVisible3: false, // 查询原因代码
      REASON_CODE_LIST: [],
      REASON_CODE_TOTAL_COUNT: 0,
      REASON_CODE_LIST_QUERY: {
        Page: 1,
        Limit: 10,
        Key: ''
      },
      dialogVisible4: false, // 查询排除故障
      RESPONSER_LIST: [],
      RESPONSER_TOTAL_COUNT: 0,
      RESPONSER_LIST_QUERY: {
        Page: 1,
        Limit: 10,
        Key: ''
      },

      lineNameList: [],
      operNameList: [],
      chosenSite: {},
      chosenReasonCode: {},
      chosenResponser: {},
      refreshUnrepairedQty: 0,
      currentSite: {},
      chosenSN: {},
      currentInfo: {},
      count: 0,
      mainTable1: [],
      mainTable2: [],
      mainTable3: [],
      loading: false,
      ComponentNameBox: [],
      rowInfos: {},
      dialogTitle: '',
      dialogVisibleX: false,
      replaceForm: {},
      replacFormRules: {
        OldPartNo: [
          { required: true, message: '请输入原零件料号', trigger: 'blur' }
        ],
        NewPartNo: [{
          required: true, message: '请输入新零件料号', trigger: 'blur'
        }]
      },
      BREAKLIST: [],
      currentBox: [],
      dialogVisibleX2: false,
      dialogVisibleX3: false,
      SourceListBox: [],
      UIDCategoryBox: [],
      PART_NO: ''
    }
  },
  methods: {
    initPage () {
      this.GetLineNameList()
      this.GetOperNameList()
      // this.GetRepairSiteData()
    },
    // 初始化echarts
    initEcharts () {
      this.$nextTick(() => {
        this.charts = echarts.init(document.getElementById('echarts'))
        window.onresize = () => {
          this.charts.resize()
        }
        this.charts.setOption({
          xAxis: {
            type: 'category',
            data: []
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [],
            type: 'bar',
            itemStyle: {
              color: 'rgb(54, 126, 127)'
            }
          }]
        })
      })
    },
    cellClickSite ({
      row
    }) { // 选择站点触发
      this.chosenSite = row
    },
    handleMakeSureSite () {
      if (!this.chosenSite.SITE_ID) {
        this.$message.warning(this.$t('SfcsCollectDefects._45'))
      } else {
        this.currentSite = cloneDeep(this.chosenSite)
        this.GetRefreshUnrepairedQty()
      }
      this.dialogVisible = false
    },
    // 根据工序ID获取未维修数量
    async GetRefreshUnrepairedQty () {
      const res = await GetRefreshUnrepairedQty(this.currentSite.OPER_ID)
      this.refreshUnrepairedQty = res.Result || 0
    },
    cellClickSN ({
      row
    }) { // 选择SN触发
      this.chosenSN = row
    },
    handleMakeSureSn () {
      if (!this.chosenSN.SN) {
        this.$message.error(this.$t('SfcsCollectDefects._46'))
        return false
      }
      this.dialogVisible2 = false
      // TODO 根据sn获取数据
      this.GetBadDataBySN(this.chosenSN.SN)
    },
    handleEnterSN () {
      if (!this.currentSite.SITE_ID) {
        this.$message.warning(this.$t('SfcsCollectDefects._48'))
        return false
      }
      this.GetBadDataBySN(this.form.SN)
      this.handleGetRuncardInfoBySn(this.form.SN)
    },
    async GetBadDataBySN (SN) {
      const res = await GetBadDataBySN({
        SN
      })
      this.form = res.Result?.[0] || {}
      this.count = 0
      // TODO 前 15 不良原因排名
      const TOPROOTCAUSES = this.form.TOPROOTCAUSES || []
      this.setEchartsOption(TOPROOTCAUSES)
      this.currentInfo = {}
      this.currentInfo = this.form?.DEFECT_CODE?.[0] || {} || {}
      this.DEFECT_DETAILLIST = this.form?.DEFECT_DETAIL?.[0] || {} || {}

      var that = this;
      (this.form.DEFECT_DETAIL || []).map(res => {
        if (that.currentInfo.DEFECT_CODE === res.DEFECT_CODE) {
          that.currentInfo.DEFECT_DETAIL = res.DEFECT_DETAIL
        }
      })
    },
    setEchartsOption (TOPROOTCAUSES) {
      const xAxisData = TOPROOTCAUSES.map(i => i.REASON_CODE) || []
      const seriesData = TOPROOTCAUSES.map(i => i.QTY) || []
      const option = {
        xAxis: {
          type: 'category',
          data: xAxisData
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: seriesData,
          type: 'bar',
          itemStyle: {
            color: 'rgb(54, 126, 127)'
          }
        }]
      }
      this.charts.setOption(option)
    },
    handleSizeChangeSN (Limit) {
      this.SnListQuery.Page = 1
      this.SnListQuery.Limit = Limit
      this.GetSnDataList()
    },
    handleCurrentChangeSN (Page) {
      this.SnListQuery.Page = Page
      this.GetSnDataList()
    },
    SerialSearch () {
      this.SnListQuery.Page = 1
      this.GetSnDataList()
    },
    cellClickReasonCode ({
      row
    }) { // 选择原因代码触发
      this.chosenReasonCode = row
    },
    handleSizeChangeReasonCode (Limit) {
      this.REASON_CODE_LIST_QUERY.Page = 1
      this.REASON_CODE_LIST_QUERY.Limit = Limit
      this.GetReasonCodeList()
    },
    handleCurrentChangeReasonCode (Page) {
      this.REASON_CODE_LIST_QUERY.Page = Page
      this.GetReasonCodeList()
    },
    cellClickResponser ({
      row
    }) { // 选择排除故障触发
      this.chosenResponser = row
    },
    handleSizeChangeResponser (Limit) {
      this.RESPONSER_LIST_QUERY.Page = 1
      this.RESPONSER_LIST_QUERY.Limit = Limit
      this.GetResponserList()
    },
    handleCurrentChangeResponser (Page) {
      this.RESPONSER_LIST_QUERY.Page = Page
      this.GetResponserList()
    },
    // 获取线体下拉框数据
    async GetLineNameList () {
      const res = await GetLineNameList({
        Page: 1,
        Limit: 100000,
        USERID: this.userId
      })
      this.lineNameList = res.Result || []
    },
    // 获取工序
    async GetOperNameList () {
      const res = await GetOperNameList({
        Page: 1,
        Limit: 10000
      })
      this.operNameList = res.Result || []
    },
    // 查询站点
    searchSite () {
      this.GetRepairSiteData()
    },
    // 获取站点
    async GetRepairSiteData () {
      const res = await GetRepairSiteData({
        ...this.siteForm,
        Page: 1,
        Limit: 100000
      })
      this.siteList = res.Result || []
    },
    // 清除选择站点框的数据
    clearSiteForm () {
      this.siteForm = {}
      this.siteList = []
      this.chosenSite = {}
    },
    // 打开选择站点
    handleChoseSite () {
      this.dialogVisible = true
      this.clearSiteForm()
      this.GetRepairSiteData()
    },
    handleOpenLiuShui () {
      if (!this.currentSite.SITE_ID) {
        this.$message.warning(this.$t('SfcsCollectDefects._48'))
        return false
      }
      this.dialogVisible2 = true
      this.SnListQuery = {
        Page: 1,
        Limit: 10,
        Key: ''
      }
      this.chosenSN = {}
      this.GetSnDataList()
    },
    async GetSnDataList () {
      const res = await GetSnDataList({
        ...this.SnListQuery,
        USERID: this.userId
      })
      this.SnList = res.Result || []
      this.SnTotalCount = res.TotalCount || 0
    },
    clearForm () {
      this.form = {}
      this.$nextTick(() => {
        this.$refs.sn.focus()
      })
    },
    handleOpenReasonCode () {
      if (!this.currentSite.SITE_ID) {
        this.$message.warning(this.$t('SfcsCollectDefects._48'))
        return false
      }
      this.dialogVisible3 = true
      this.REASON_CODE_LIST_QUERY = {
        Page: 1,
        Limit: 10,
        Key: ''
      }
      this.chosenReasonCode = {}
      this.GetReasonCodeList()
    },
    handleOpenResponser () {
      if (!this.currentSite.SITE_ID) {
        this.$message.warning(this.$t('SfcsCollectDefects._48'))
        return false
      }
      this.dialogVisible4 = true
      this.RESPONSER_LIST_QUERY = {
        Page: 1,
        Limit: 10,
        Key: ''
      }
      this.chosenResponser = {}
      this.GetResponserList()
    },
    handleSearchReasonCodeList () {
      this.REASON_CODE_LIST_QUERY.Page = 1
      this.GetReasonCodeList()
    },
    async GetReasonCodeList () {
      const res = await GetReasonCodeList(this.REASON_CODE_LIST_QUERY)
      this.REASON_CODE_LIST = res.Result || []
      this.REASON_CODE_TOTAL_COUNT = res.TotalCount || 0
    },
    handleMakeSureReasonCode () {
      if (!this.chosenReasonCode.REASON_CODE) {
        this.$message.error(this.$t('SfcsCollectDefects._49'))
        return false
      }
      this.submitForm.REASON_CODE = this.chosenReasonCode.REASON_CODE
      this.dialogVisible3 = false
    },
    // 获取排除故障
    async GetResponserList () {
      const res = await GetResponserList(this.RESPONSER_LIST_QUERY)
      this.RESPONSER_LIST = res.Result || []
      this.RESPONSER_TOTAL_COUNT = res.TotalCount || 0
    },
    handleSearchResponser () {
      this.RESPONSER_LIST_QUERY.Page = 1
      this.GetResponserList()
    },
    handleMakeSureResponser () {
      if (!this.chosenResponser.CODE) {
        this.$message.error(this.$t('SfcsCollectDefects._50'))
        return false
      }
      this.submitForm.RESPONSER = this.chosenResponser.CODE
      this.dialogVisible4 = false
    },
    async handleSubmitRepairData () {
      if (!this.form.SN) {
        this.$message.error(this.$t('SfcsCollectDefects._59'))
        return false
      }
      const arrMap = [{
        field: 'REASON_CODE',
        msg: this.$t('SfcsCollectDefects._51')
      }
        // {
        //   field: 'RESPONSER',
        //   msg: this.$t('SfcsCollectDefects._52')
        // },
        // {
        //   field: 'LOCATION',
        //   msg: this.$t('SfcsCollectDefects._53')
        // },
        // {
        //   field: 'BAD_PART_NO',
        //   msg: this.$t('SfcsCollectDefects._54')
        // },
        // {
        //   field: 'REMARK',
        //   msg: this.$t('SfcsCollectDefects._55')
        // }
      ]
      try {
        arrMap.forEach(i => {
          if (!this.submitForm[i.field]) {
            throw Error(i.msg)
          }
        })
        if (!this.currentInfo.COLLECT_DEFECT_ID) {
          throw Error('请选择不良代码列表')
        }
        const res = await SaveRepairData({
          ...this.submitForm,
          SN: this.form.SN,
          REPAIRER: this.username,
          COLLECT_DEFECT_ID: this.currentInfo.COLLECT_DEFECT_ID || 0,
          REPAIRSITEROW_ID: this.form.REPAIRSITEROW_ID || 0,
          OPERATION_ID: this.form.OPERATION_ID || 0,
          FAILOPERATIONID: this.form.FAILOPERATIONID || 0,
          RUNCARDROW_ID: this.form.RUNCARDROW_ID || 0
        })
        if (res.Result) {
          this.$notify.success({
            title: this.$t('SfcsCollectDefects._56'),
            message: res.Result || this.$t('SfcsCollectDefects._57')
          })
          this.submitForm = {}
          this.currentInfo = {}
          this.GetRefreshUnrepairedQty() // 重新获取未维修数量
          this.count++
          if (this.count < this.form.DEFECT_CODE) {
            this.GetBadDataBySN(this.form.SN)
          }
        }
      } catch (e) {
        this.$message.error(e.message)
      }
    },
    // 报废功能
    handleScrap () {
      if (!this.form.SN) {
        this.$message.error(this.$t('SfcsCollectDefects._59'))
        return false
      }
      this.$confirm('确定要报废吗？', this.$t('cccn._21'), {
        confirmButtonText: this.$t('cccn._22'),
        cancelButtonText: this.$t('cccn._23'),
        type: 'warning'
      }).then(async _ => {
        const res = await SaveScrappedData(this.form.SN)
        if (res.Result) {
          this.$notify.success({
            title: '成功',
            message: '报废成功'
          })
          this.submitForm = {}
          this.currentInfo = {}
          this.GetRefreshUnrepairedQty() // 重新获取未维修数量
          this.count++
          if (this.count < this.form.DEFECT_CODE) {
            this.GetBadDataBySN(this.form.SN)
          }
        }
      })
    },
    resetPage () {
      this.form = {}
      this.submitForm = {}
      this.charts = null
      this.dialogVisible = false
      this.dialogVisible2 = false
      this.dialogVisible3 = false
      this.dialogVisible4 = false
      this.siteList = []
      this.siteForm = {}
      this.SnList = []
      this.SnTotalCount = 0
      this.SnListQuery = {
        Page: 1,
        Limit: 10,
        Key: ''
      }
      this.REASON_CODE_LIST = []
      this.REASON_CODE_TOTAL_COUNT = 0
      this.REASON_CODE_LIST_QUERY = {
        Page: 1,
        Limit: 10,
        Key: ''
      }
      this.RESPONSER_LIST = []
      this.RESPONSER_TOTAL_COUNT = 0
      this.RESPONSER_LIST_QUERY = {
        Page: 1,
        Limit: 10,
        Key: ''
      }
      this.chosenSite = {}
      this.chosenReasonCode = {}
      this.chosenResponser = {}
      this.refreshUnrepairedQty = 0
      this.chosenSN = {}
      this.initEcharts()
      this.currentInfo = {}
    },
    handelChoseDefectCode (item) {
      this.currentInfo = {}
      this.currentInfo = item
      var that = this
      this.form.DEFECT_DETAIL.map(res => {
        if (item.DEFECT_CODE === res.DEFECT_CODE) {
          that.currentInfo.DEFECT_DETAIL = res.DEFECT_DETAIL
        }
      })
      console.log(this.currentInfo, ' ===')
    },
    // TODO 获取资源、UID、零件
    async getSomthing (type) {
      this.loading = true
      const res = await Promise.all([
        !type || type === 1 ? await SfcsProductResourcesLoadData({
          Page: 1,
          Limit: 100000
        }) : null,
        !type || type === 2 ? await SfcsProductUidsLoadData({
          Page: 1,
          Limit: 100000
        }) : null,
        !type || type === 3 ? await SfcsProductComponentsLoadData({
          Page: 1,
          Limit: 100000
        }) : null
      ]).catch(_ => {
        this.loading = false
      })
      this.loading = false
      if (!type) {
        res.map((item, index) => {
          this[`mainTable${index + 1}`] = item.Result || []
        })
      } else {
        this[`mainTable${type}`] = res[0]?.Result || []
      }
    },
    // ! 上面的逻辑废弃
    // ! 新逻辑
    async handleGetRuncardInfoBySn (sn) {
      const res = await GetRuncardInfoBySn(sn)
      if (res.Result) {
        this.runCardInfo = res.Result || {}
        const { COMPONENTHISTORY = [], UIDHISTORY = [], RESOURCEHISTORY = [], PART_NO = '' } = res.Result || {}
        this.mainTable3 = COMPONENTHISTORY
        this.mainTable2 = UIDHISTORY
        this.mainTable1 = RESOURCEHISTORY
        this.PART_NO = PART_NO
      }
    },
    async getSfcsProductComponentsIndex () {
      const res = await SfcsProductComponentsIndex()
      const { ComponentName = [] } = res.Result || {}
      this.ComponentNameBox = ComponentName.map(i => {
        return {
          label: i.OBJECT_NAME,
          value: i.ID?.toString() || '',
          disabled: false
        }
      })
    },
    // TODO 替换
    async handleReplace (row, type) {
      let res = {}
      if (type === 3) {
        if (!row.ODM_COMPONENT_PN) {
          this.$message.error('数据错误，缺少ODM_COMPONENT_PN')
          return false
        }
        console.log(row)
        this.rowInfos = cloneDeep(row || {})
        res = await GetComponentInfomation(row.ODM_COMPONENT_PN)
        const data = res.Result?.[0] || {}
        this.dialogTitle = '替换零件'
        this.dialogVisibleX = true
        this.dialogVisibleX2 = false
        this.dialogVisibleX3 = false
        this.replaceForm = {
          OldODMComponentPn: data.ODM_COMPONENT_PN || '',
          OldDescription: data.DESCRIPTION || '',
          OldODMComponentSn: data.ODM_COMPONENT_SN || '',
          NewODMComponentPn: '',
          NewDescription: '',
          NewODMComponentSn: ''
        }
      } else if (type === 2) {
        if (!row.UID_NUMBER) {
          this.$message.error('数据错误，缺少UID_NUMBER')
          return false
        }
        this.rowInfos = cloneDeep(row || {})
        this.dialogTitle = '替换UID'
        this.dialogVisibleX = false
        this.dialogVisibleX2 = true
        this.dialogVisibleX3 = false
        this.replaceForm = {
          NewNo: '',
          OldNo: row.UID_NUMBER || ''
        }
      } else if (type === 1) {
        if (!row.PART_NO) {
          this.$message.error('数据错误，缺少PART_NO')
          return false
        }
        this.rowInfos = cloneDeep(row || {})
        this.dialogTitle = '替换资料'
        this.dialogVisibleX = false
        this.dialogVisibleX2 = false
        this.dialogVisibleX3 = true
        this.replaceForm = {
          NewNo: '',
          OldNo: row.PART_NO || ''
        }
      } else {
        return false
      }
    },
    // TODO 保存替换
    async handleSubmitReplace (type) {
      if (type === 3) {
        // TODO 先获取替换零件信息
        const res = await GetComponentsReplace(this.rowInfos.PART_NO)
        let form = {

        }
        if (res.Result) {
          this.replaceForm.CollectOperationID = this.chosenSite.OPER_ID || 0
          this.replaceForm.PartNo = this.PART_NO
          if (res.Result.length) {
            form.UpdateRecords = [this.replaceForm]
          } else {
            form.InsertRecords = [this.replaceForm]
          }
          form.UserName = this.username
          const result = await SaveComponentReplace(form)
          if (result.Result) {
            this.$notify({
              type: 'success',
              title: '成功',
              message: '替换零件成功'
            })
            this.rowInfos = {}
            this.replaceForm = {}
            this.dialogVisibleX = false
            this.dialogTitle = ''
            // this.getSomthing(type)
            this.handleGetRuncardInfoBySn(this.form.SN)
          }
        }
      } else if (type === 2) {
        // TODO 先获取UIDS替换信息
        const _res = await GetUIDSReplace(this.rowInfos.UID_NUMBER)
        let form = {

        }
        if (_res.Result) {
          this.replaceForm.CollectOperationID = this.chosenSite.OPER_ID || 0
          this.replaceForm.PartNo = this.PART_NO
          if (_res.Result.length) {
            form.UpdateRecords = [this.replaceForm]
          } else {
            form.InsertRecords = [this.replaceForm]
          }
          form.UserName = this.username
          const _result = await SaveUIDReplace(form)
          if (_result.Result) {
            this.$notify({
              type: 'success',
              title: '成功',
              message: '替换UID成功'
            })
            this.rowInfos = {}
            this.replaceForm = {}
            this.dialogVisibleX2 = false
            this.dialogTitle = ''
            // this.getSomthing(type)
            this.handleGetRuncardInfoBySn(this.form.SN)
          }
        }
      } else if (type === 1) {
        const __res = await GetResourcesReplace(this.rowInfos.PART_NO)
        let form = {}
        if (__res.Result) {
          this.replaceForm.CollectOperationID = this.chosenSite.OPER_ID || 0
          this.replaceForm.PartNo = this.PART_NO
          if (__res.Result.length) {
            form.UpdateRecords = [this.replaceForm]
          } else {
            form.InsertRecords = [this.replaceForm]
          }
          form.UserName = this.username
          const __result = await SaveResourcesReplace(form)
          if (__result.Result) {
            this.$notify({
              type: 'success',
              title: '成功',
              message: '替换资料成功'
            })
            this.rowInfos = {}
            this.replaceForm = {}
            this.dialogVisibleX3 = false
            this.dialogTitle = ''
            // this.getSomthing(type)
            this.handleGetRuncardInfoBySn(this.form.SN)
          }
        }
      } else {
        return false
      }
    },
    async handleGetComponentInfomation () {
      if (!this.replaceForm.NewODMComponentPn) {
        this.$message.error('请输入零件料号')
        return false
      }
      const res = await GetComponentInfomation(this.replaceForm.NewODMComponentPn)
      const data = res.Result?.[0] || {}
      this.replaceForm.NewODMComponentPn = data.ODM_COMPONENT_PN || ''
      // this.replaceForm.NewDescription = data.DESCRIPTION || ''
      this.replaceForm.NewODMComponentSn = data.ODM_COMPONENT_SN || ''// 这里填什么我蒙蔽
    },
    // 获取采集UID首页视图数据
    async getCollectUIDIndex () {
      const res = await CollectUIDIndex()
      const data = res.Result || {}
      const { UIDCategory = [] } = data
      this.UIDCategoryBox = UIDCategory.map(i => {
        return {
          label: i.OBJECT_NAME,
          value: i.ID?.toString(),
          disabled: false
        }
      })
    },
    // 获取产品制程明细
    async getLoadRoute () {
      const res = await LoadRouteConfig({
        Page: 1,
        Limit: 100000
      })
      const data = res.Result || []
      this.BREAKLIST = []
      data.map(i => {
        if (i.REWORK_OPERATION_ID === 1) {
          i.REWORK_OPERATION_ID = ''
        }
        this.currentBox.map(v => {
          if (i.CURRENT_OPERATION_ID === parseInt(v.value)) {
            this.BREAKLIST.push({
              label: v.label,
              value: v.value,
              disabled: false
            })
          }
        })
      })
    },
    async getSfcsRoutesIndex () {
      const res = await SfcsRoutesIndex()
      const data = res.Result || {}
      const { CurrentOperationList = [] } = data
      this.currentBox = CurrentOperationList.map(i => {
        return {
          label: i.OPERATION_NAME,
          value: i.ID?.toString(),
          disabled: true
        }
      })
      this.getLoadRoute()
    },
    // 采集资料维护
    async getCollectIndex () {
      const res = await CollectIndex()
      const data = res.Result || {}
      const { SourceList = [] } = data
      this.SourceListBox = SourceList.map(i => {
        return {
          label: i.OBJECT_NAME,
          value: i.ID?.toString() || '',
          disabled: false
        }
      })
    }
  },
  mounted () {
    this.initEcharts()
  },
  created () {
    this.initPage()
    // this.getSomthing()
    this.getSfcsProductComponentsIndex()
    this.getCollectUIDIndex()
    this.getSfcsRoutesIndex()
    this.getCollectIndex()
  },
  watch: {
    'currentSite.SITE_ID' (val) {
      if (val) {
        this.$nextTick(() => {
          this.$refs.sn.focus()
        })
      } else {
        this.$nextTick(() => {
          this.$refs.sn.blur()
        })
      }
    }
  }
}
