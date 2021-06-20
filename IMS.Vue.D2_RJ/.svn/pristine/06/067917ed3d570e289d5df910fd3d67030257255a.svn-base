import {
  GetTongsTypeList
} from '@/api/MesTongsApply'
import {
  AddOrModify,
  AddOrModifySave,
  ApplyGoStore,
  ApplyGoStoreByModel,
  BeginActive,
  BeginMaintain,
  BorrowTongs,
  ChangeStore,
  EndActive,
  EndMaintain,
  EnterStore,
  ExportData,
  GetActiveItemsData,
  GetMaintainData,
  GetMaintainDetailData,
  GetMaintainItemsData,
  GetPartByPartNo,
  GetRepairByTongsId,
  GetRepairData,
  GetTongsById,
  GetTongsOperationData, GetTongsPrint, GetTongsRepairData,
  Index,
  IsExistCode,
  ListData,
  LoadData,
  LoadDataAndPart,
  PermanentLendTongs,
  RepairTongs
} from '@/api/MesTongsInfo'
import {
  LoadMESLineType
} from '@/api/SfcsOperationLines' // 直接抄
import {
  sptLoadData,
  sptSaveData
} from '@/api/SfcsParameters'
import request from '@/plugin/axios'
import {
  GetProduct
} from '@/api/SfcsPn'
import {
  LoadData as OrganizeL,
  // 直接抄
  LoadUserOrganize
} from '@/api/SysOrganize'
import customContainerHeader from '@/components/custom-container-header'
import PnNoSelect from '@/components/PnNoSelect/index'
import {
  removeSpace
} from '@/libs/validate'
import {
  cloneDeep
} from 'lodash'
import {
  mapGetters
} from 'vuex'
import helper from '@/api/Helper'
import { print } from '@/api/MaterialBarcode'
const API = helper('SfcsProductFamily')
export default {
  name: 'MesTongsInfo',
  components: {
    customContainerHeader,
    PnNoSelect
  },
  data () {
    return {
      Mainloading: false,
      Mainradio: '',
      searchVal: {
        Page: 1, // 当前页
        Limit: 15, // 分页大小
        CODE: '',
        ISESD: '',
        TONGS_TYPE: '',
        DEPARTMENT: '',
        SOURCES: '',
        STATUS: '',
        ACTIVE: ''
      },
      searchtotal: 0,
      fixture: [{
        LOOKUP_CODE: 0,
        CHINESE: this.$t('mtf._35')
      }, {
        LOOKUP_CODE: 1,
        CHINESE: this.$t('mtf._36')
      }, {
        LOOKUP_CODE: 2,
        CHINESE: this.$t('mtf._37')
      }],
      section: [],
      source: [{
        LOOKUP_CODE: 0,
        CHINESE: this.$t('mtf._38')
      }, {
        LOOKUP_CODE: 1,
        CHINESE: this.$t('mtf._39')
      }, {
        LOOKUP_CODE: 2,
        CHINESE: this.$t('mtf._40')
      }],
      status: [{
        LOOKUP_CODE: 0,
        CHINESE: this.$t('mtf._41')
      }, {
        LOOKUP_CODE: 1,
        CHINESE: this.$t('mtf._42')
      }, {
        LOOKUP_CODE: 2,
        CHINESE: this.$t('mtf._43')
      },
      {
        LOOKUP_CODE: 3,
        CHINESE: this.$t('mtf._44')
      }, {
        LOOKUP_CODE: 4,
        CHINESE: this.$t('mtf._45')
      }, {
        LOOKUP_CODE: 5,
        CHINESE: this.$t('mtf._46')
      },
      {
        LOOKUP_CODE: 6,
        CHINESE: this.$t('mtf._47')
      }
      ],
      CategoryList: [{
        LOOKUP_CODE: 'Y',
        CHINESE: this.$t('mtf._48')
      },
      {
        LOOKUP_CODE: 'N',
        CHINESE: this.$t('mtf._49')
      }
      ],
      MainTable: [],
      activeName: 'product',

      dialogTableVisible: false,
      form: {
        ID: 0,
        CODE: ' ', // 夹具编码
        SOURCES: 0, // 来源
        CREATE_USER: '',
        UPDATE_USER: '',
        STORE_CODE: '',
        PartList: [],
        TONGS_MODEL: ''
      },
      form2: {},
      info: {
        ID: 0,
        PART_NO: '', // '料号'
        PART_NAME: '', // 品名
        PART_DESC: '', // :规格
        VERSION: '' // 版本号
      },
      info2: {
        ID: 0,
        PART_NO: '', // '料号'
        PART_NAME: '', // 品名
        PART_DESC: '', // :规格
        VERSION: '' // 版本号
      },
      infoTable: [],
      infoTable2: [],
      infoTable3: [],

      branch: [],
      MainId: '',
      MainCODE: '',
      MainACTIVE: '',
      MainSTATUS: '',
      MainTONGSTYPE: '',
      // 子表
      goodsTable: [],
      productTable: [],
      operateTable: [],
      activatingTable: [],
      AcceTable: [],
      arouseRadio: '',
      serviceTable: [],
      // 激活夹具
      fixtureText: '',
      activatingVisible: false,
      fixtureTable: [],
      fixtureform: {
        ID: 0,
        TONGS_ID: '',
        STATUS: 2,
        REMARK: '',
        UserName: '',
        DetailList: []
      },
      // 入库
      fixss: '',
      warehouseVisible: false,
      warehouseForm: {
        Page: 1,
        Limit: 10,
        CODE: '',
        NAME: ''
      },
      warehouseRadio: '',
      warehouseTable: [],
      warehousetotal: 0,
      ErrorForm: {
        TongsID: 0,
        StoreID: 0
      },
      WarStatus: true,
      // 保养
      maintainVisible: false,
      maintainTable: [],
      maintainform: {
        ID: 0,
        TONGS_ID: '',
        STATUS: 2,
        REMARK: '',
        DetailList: []
      },
      // 维修
      serviceVisible: false,
      serviceform: {
        ID: 0,
        TONGS_ID: 0,
        REPAIR_RESULT: 1,
        DEFECT_MSG: '',
        REMARK: ''
      },
      drawer: false,
      dialogVisible: false,
      dialogVisible2: false,
      dialogVisible3: false,
      dialogVisible4: false,
      StorageSpacesForm: {
        Page: 1,
        Limit: 15,
        CODE: '',
        NAME: ''
      },
      loading2: false,
      loading3: false,
      loading4: false,
      mainTable2: [],
      mainTable3: [],
      StorageSpacesFormTotalPage: 0,
      SelectFixtureFormTotalPage: 0,
      SelectFixtureForm: {
        Page: 1,
        Limit: 15
      },
      CollarFixtureTitle: '',
      CollarFixtureForm: {},
      isForever: undefined,
      // 注册编辑
      editForm: {},
      FixtureCategory: '',
      DataChanges: false,
      Source: '',
      DataChanges2: false,
      tit: '',
      organizeList: [],
      organizeList2: [],
      casProps: {
        label: 'ORGANIZE_NAME',
        value: 'ID',
        children: 'children',
        checkStrictly: true
      },
      casProps2: {
        label: 'ORGANIZE_NAME',
        value: 'ID',
        children: 'children',
        checkStrictly: true
      },
      planData: [],
      planData2: [],
      LineTypeList: [],
      LineTypeList2: [],
      editFormRules: {
        CODE: [{ required: true, message: this.$t('mtf._955'), trigger: 'blur' }],
        DEPARTMENT: [{ required: true, message: this.$t('mtf._5'), trigger: 'blur' }],
        TONGS_TYPE: [{ required: true, message: this.$t('mtm._2'), trigger: 'blur' }],
        SOURCES: [{ required: true, message: this.$t('mtf._85'), trigger: 'change' }],
        ORGANIZE_ID: [{ required: true, message: this.$t('plbd._1'), trigger: 'change' }]
      },
      ProductName: 'series',
      info3: {},
      // 工装自身状态
      statesTongsList: [
        {
          LOOKUP_CODE: 0,
          CHINESE: this.$t('mtf._151')
        }, {
          LOOKUP_CODE: 1,
          CHINESE: this.$t('mtf._152')
        }, {
          LOOKUP_CODE: 2,
          CHINESE: this.$t('mtf._153')
        }, {
          LOOKUP_CODE: 3,
          CHINESE: this.$t('mtf._154')
        }, {
          LOOKUP_CODE: 4,
          CHINESE: this.$t('mtf._155')
        }, {
          LOOKUP_CODE: 5,
          CHINESE: this.$t('mtf._156')
        }
      ],
      // registereVisible: false,
      // registereForm: {},
      statusList: [
        {
          value: 0,
          text: this.$t('mtf._41')
        }, {
          value: 1,
          text: this.$t('mtf._42')
        }, {
          value: 2,
          text: this.$t('mtf._43')
        },
        {
          value: 3,
          text: this.$t('mtf._44')
        }, {
          value: 4,
          text: this.$t('mtf._45')
        }, {
          value: 5,
          text: this.$t('mtf._46')
        },
        {
          value: 6,
          text: this.$t('mtf._47')
        }
      ],
      // sourceList: [{
      //   LOOKUP_CODE: 0,
      //   CHINESE: this.$t('mtf._38')
      // }, {
      //   LOOKUP_CODE: 1,
      //   CHINESE: this.$t('mtf._39')
      // }, {
      //   LOOKUP_CODE: 2,
      //   CHINESE: this.$t('mtf._40')
      // }],
      // mainTable4: []
      NameList: [],
      NameForm: {
        NAME: '夹具类型',
        Page: 1,
        Limit: 999999,
        MEANING: ''
      },
      Namettal: 0,
      FamilyNameList: [],
      FamilyNameQuery: {
        Page: 1,
        Limit: 15,
        FAMILY_NAME: ''
      },
      FamilyNametotalPage: 0,
      selectMainData: [],
      // 工装打印
      taskList: [],
      task: {
        ID: null,
        index: 0
      },
      code: null,
      // 打印
      PrintoShow: false,
      PrintList: [],
      PrintName: ''
    }
  },
  computed: {
    ...mapGetters(['userinfo', 'userId'])
  },
  created () {
    this.geIndex()
    this.getList()
    this.getTongsTypeList()
    this.sptLoadData()
    this.getFamilyNameList()
    this.form.UPDATE_USER = this.userinfo.USER_NAME
    this.editForm.UPDATE_USER = this.userinfo.USER_NAME
    this.form.CREATE_USER = this.userinfo.USER_NAME
    this.editForm.CREATE_USER = this.userinfo.USER_NAME
    this.fixtureform.UserName = this.userinfo.USER_NAME
    this.maintainform.MAINTAIN_USER = this.userinfo.USER_NAME
    this.CollarFixtureForm.UserName = this.userinfo.USER_NAME
    this.CollarFixtureForm.LoginName = this.userinfo.USER_NAME
    this.UserMane = this.userinfo.USER_NAME
  },
  watch: {
    DataChanges (val) {
      if (val) {
        if (this.form.APPLY_TONGS_TYPE === 1) {
          this.FixtureCategory = this.$t('MesTongsApply._13')
        } else if (this.form.APPLY_TONGS_TYPE === 2) {
          this.FixtureCategory = this.$t('MesTongsApply._14')
        } else if (this.form.APPLY_TONGS_TYPE === 3) {
          this.FixtureCategory = this.$t('MesTongsApply._15a')
        } else if (this.form.APPLY_TONGS_TYPE === 4) {
          this.FixtureCategory = this.$t('MesTongsApply._15b')
        } else if (this.form.APPLY_TONGS_TYPE === 5) {
          this.FixtureCategory = this.$t('MesTongsApply._15c')
        } else if (this.form.APPLY_TONGS_TYPE === 6) {
          this.FixtureCategory = this.$t('MesTongsApply._15d')
        } else if (this.form.APPLY_TONGS_TYPE === 7) {
          this.FixtureCategory = this.$t('MesTongsApply._15e')
        } else if (this.form.APPLY_TONGS_TYPE === 8) {
          this.FixtureCategory = this.$t('MesTongsApply._15f')
        } else if (this.form.APPLY_TONGS_TYPE === 9) {
          this.FixtureCategory = this.$t('MesTongsApply._15g')
        } else {
          this.FixtureCategory = this.$t('MesTongsApply._16')
        }
        this.$forceUpdate()
      }
    },
    DataChanges2 (val) {
      if (val) {
        if (this.form.APPLY_SOURCES === 0) {
          this.Source = this.$t('mtf.t_11')
        } else if (this.form.APPLY_SOURCES === 1) {
          this.Source = this.$t('mtf.t_12')
        } else if (this.form.APPLY_TONGS_TYPE === 3) {
          this.Source = this.$t('mtf.t_13')
        } else {
          this.Source = this.$t('mtf.t_14')
        }
        this.$forceUpdate()
      }
    }
  },
  methods: {
    filterTag (value, row) {
      return row.STATUS === value
    },
    cellclass (row) {
      if (row.columnIndex === 0) {
        return 'DisabledSelection'
      }
    },
    // 维修导出
    async exportService (type) {
      if (this.selectMainData && this.selectMainData.length <= 0) {
        return this.$message({
          message: '请选择需要导出维修记录的工装信息',
          type: 'warning'
        })
      } else {
        let query = {
          ids: ''
        }
        let idsArr = []
        this.selectMainData.forEach(item => {
          idsArr.push(item.ID)
          query.ids = idsArr.join(',')
        })
        let fileName = ''
        let date = new Date()
        let month = date.getMonth() + 1
        switch (type) {
          case 'curMonth':
            query.timeStatus = 'SameMonth'
            fileName = '本月维修'
            month = month + '月份'
            break
          case 'upMonth':
            query.timeStatus = 'LastMonth'
            fileName = '上月维修'
            month = (month - 1) + '月份'
            break
          case 'allMonth':
            query.timeStatus = 'AllMonth'
            fileName = '全年维修'
            month = '全年'
            break
        }
        const data = await GetTongsRepairData(query)
        console.log(data)
        await this.outExcel(data.Result, fileName, month)
      }
    },
    // 生成并导出Excel
    async outExcel (dataList, fileName, month) {
      // 动态表头
      // const res = await request.get('ImportExcel/LoadData', {
      //   params: {
      //     table_name: 'MES_TONGS_REPAIR'
      //   }
      // })
      // if (res.Result && res.Result.ImportDtlList && res.Result.ImportDtlList.length) {
      //   const T = res.Result.ImportDtlList

      const excel = await import('@/vender/Export2Excel')
      let multiHeaderStr = month + '工装维修一览表'
      const multiHeader =
          [
            // 第一行
            [multiHeaderStr, '', '', '', '', '', '', '']
          ]
      // const tHeader = T.sort((currentItem, nextItem) => currentItem.EXCEL_ITEM > nextItem.EXCEL_ITEM ? 1 : -1).map(item => item.COLUMN_CAPTION)
      const tHeader = ['序号', '工装名称', '工装编号', '实际完成日期', '接口人', '录入人', '故障现象', '维修记录']
      const merges = ['A1:H1']
      // const fileList = T.map(item => item.COLUMN_NAME)
      const fileList = ['rowno', 'MES_TONGS_TYPE', 'CODE', 'END_TIME', 'INTERFACE_USER', 'CREATE_USER', 'TRREMARK', 'TMHREMARK']
      const data = []
      dataList.map(item => {
        const tmpArr = []
        fileList.map(_item => {
          tmpArr.push(item[_item])
        })
        data.push(tmpArr)
      })
      excel.export_json_to_excel({
        multiHeader: multiHeader,
        header: tHeader,
        data,
        merges,
        filename: fileName,
        autoWidth: true,
        bookType: 'xlsx'
      })
      this.$notify.success({
        title: this.$t('SmtPlacementHeader._103'),
        message: this.$t('SmtPlacementHeader._119')
      })
      // }
    },
    // 工装打印
    async toolPrint () {
      if (this.selectMainData && this.selectMainData.length <= 0) {
        return this.$message({
          message: '请选择需要打印的工装信息',
          type: 'warning'
        })
      }
      let query = {
        ids: '',
        userName: this.userinfo.USER_NAME
      }
      let idsArr = []
      this.selectMainData.forEach(item => {
        idsArr.push(item.ID)
        query.ids = idsArr.join(',')
      })
      await GetTongsPrint(query).then((res) => {
        if (!res.Result) {
          this.$message.error(res.ErrorInfo.Message)
        } else {
          this.downSomething(res.Result)
        }
      })
    },
    async downSomething (query) {
      console.log(query)
      var that = this
      request({
        url: 'http://localhost:42737/Printer/GetCurrentPrint',
        method: 'get'
      })
        .then((res) => {
          if (res.Code === 1) {
            if (this.selectMainData && this.selectMainData.length === 1) {
              this.doPrint(query)
            } else {
              this.print(query)
            }
          }
        })
        .catch(function () {
          that.$message({
            type: 'error',
            message: that.$t('MesBatchManager._55')
          })
        })
    },
    // 多个开始打印
    print (query) {
      var that = this
      const not = this.$notify({
        dangerouslyUseHTMLString: true,
        message:
          '<i class="el-icon-loading" style="font-size: 14px;color: #409EFF"></i> <strong style="color: #409EFF;font-size: 14px;margin-left: 5px">' +
          this.$t('MesBatchManager._54') +
          '</strong>',
        duration: 0,
        position: 'bottom-right'
      })
      if (!(query instanceof Array)) {
        query = [{ PrintTaskId: query, Printer: this.userinfo.USER_NAME }]
      }
      request({
        url: 'http://localhost:42737/Printer/BasePrinterEx',
        method: 'post',
        data: query
      })
        .then((res) => {
          not.close()
          if (res.Code === 1) {
            if (res.Data) {
              this.$notify({
                title: this.$t('publics.tips.success'),
                message: this.$t('MesBatchManager._52'),
                type: 'success',
                duration: 2000
              })
            } else {
              this.GetPrintList()
              this.$notify({
                title: this.$t('publics.tips.handleFail'),
                message: res.Msg,
                type: 'error',
                duration: 2000
              })
            }
          } else {
            this.$notify({
              title: this.$t('publics.tips.handleFail'),
              message: res.Msg,
              type: 'error',
              duration: 2000
            })
          }
        })
        .catch(function () {
          not.close()
          that.$message({
            type: 'error',
            message: that.$t('MesBatchManager._55')
          })
        })
    },
    // 单个打印
    doPrint (query) {
      var that = this
      const not = this.$notify({
        dangerouslyUseHTMLString: true,
        message:
          '<i class="el-icon-loading" style="font-size: 14px;color: #409EFF"></i> <strong style="color: #409EFF;font-size: 14px;margin-left: 5px">' +
          this.$t('MesBatchManager._54') +
          '</strong>',
        duration: 0,
        position: 'bottom-right'
      })
      print({
        PrintTaskId: query,
        Printer: this.userinfo.USER_NAME
      }).then((res) => {
        this.$nextTick(() => {
          not.close()
        })
        if (res.data.Code === 1) {
          if (res.data.Data) {
            this.$notify({
              title: this.$t('publics.tips.success'),
              message: this.$t('MesBatchManager._52'),
              type: 'success',
              duration: 2000
            })
          } else {
            this.$notify({
              title: this.$t('publics.tips.handleFail'),
              message: res.data.Msg,
              type: 'error',
              duration: 2000
            })
          }
        } else {
          this.GetPrintList()
          this.$notify({
            title: this.$t('publics.tips.handleFail'),
            message: res.data.Msg,
            type: 'error',
            duration: 2000
          })
        }
      }).catch(function () {
        not.close()
        that.$message({
          type: 'error',
          message: that.$t('MesBatchManager._55')
        })
      })
    },
    // 获取打印机列表
    async GetPrintList () {
      this.PrintoShow = true
      const res = await request({
        url: 'http://localhost:42737/Printer/GetPrintList',
        method: 'get'
      })
      if (res.Code === 1) {
        this.PrintList = res.Data
      }
    },
    // 选择名称
    async SetPrinName () {
      const res = await request({
        url: 'http://localhost:42737/Printer/SetPrintName',
        method: 'post',
        data: {
          PrintName: this.PrintName
        }
      })
      if (res.Code === 1) {
        const query = []
        this.TaskIdList.map((i) => {
          query.push({
            PrintTaskId: i,
            Printer: this.userinfo.USER_NAME
          })
        })
        // 重新打印
        this.print(query)
      } else {
        this.$notify({
          title: this.$t('publics.tips.handleFail'),
          message: res.Msg,
          type: 'error',
          duration: 2000
        })
      }
    },
    // PnNoSelect 数据交互
    setBindData (val) {
      this.info2.PART_NO = val
      this.partClick(true)
    },
    removeFamilyName (e) {
      if (e === false) {
        this.FamilyNameQuery.FAMILY_NAME = ''
        this.getStatusList()
      }
    },
    async getFamilyNameList () {
      this.loading4 = true
      const res = await API.LoadData(this.FamilyNameQuery)
      this.loading4 = false
      this.FamilyNameList = res.Result || []
      this.FamilyNametotalPage = res.TotalCount || 0
    },
    async getStatusList () {
      const res = await API.LoadData(this.FamilyNameQuery)
      console.log(res)
      this.FamilyNametotalPage = res.TotalCount || 0
      this.FamilyNameList = res.Result || []
      if (!this.FamilyNameList.length) {
        this.FamilyNameList.push({
          FAMILY_NAME: '',
          DESCRIPTION: ''
        })
      }
    },
    selectBind (item) {
      const obj = {
        label: item.FAMILY_NAME,
        value: item.ID
      }
      return obj
    },
    FamilyNameSizeChange (Limit) {
      this.FamilyNameQuery.Page = 1
      this.FamilyNameQuery.Limit = Limit
      this.getStatusList()
    },
    FamilyNameCurrentChange (Page) {
      this.FamilyNameQuery.Page = Page
      this.getStatusList()
    },
    infoFamilyNameChange (e) {
      this.FamilyNameList.map((item) => {
        if (item.ID === e) {
          this.info3.PRODUCT_FAMILY_ID = item.ID
          this.info3.FAMILY_NAME = item.FAMILY_NAME
          this.info3.DESCRIPTION = item.DESCRIPTION
        }
      })
      this.$forceUpdate()
    },
    async sptLoadData () {
      const res = await sptLoadData(this.NameForm)
      console.log(res)
      this.NameList = res.Result || []
      if (!this.NameList.length) {
        this.NameList.push(
          {
            CHINESE: '',
            LOOKUP_CODE: ''
          }
        )
      }
      this.Namettal = res.TotalCount || 0
    },
    NameSizeChange (Limit) {
      this.NameForm.Page = 1
      this.NameForm.Limit = Limit
      this.sptLoadData()
    },
    NameCurrentChange (Page) {
      this.NameForm.Page = Page
      this.sptLoadData()
    },
    async getLineTypeList () {
      const res = await LoadMESLineType()
      const data = res.Result || []
      this.LineTypeList = []
      data.map((item) => {
        this.LineTypeList.push({
          label: item.CHINESE,
          value: item.LOOKUP_CODE
        })
        this.LineTypeList2.push({
          label: item.CHINESE,
          value: item.LOOKUP_CODE
        })
      })
    },
    handleChangeCascader (e) {
      // 直接抄
      if (e && e.length) {
        this.editForm.ORGANIZE_ID = e[e.length - 1]
      }
    },
    handleChangeCascader2 (e) {
      // 直接抄
      if (e && e.length) {
        this.form.ORGANIZE_ID = e[e.length - 1]
      }
    },
    // 获取组织架构
    async getOrganize () {
      // 直接抄
      const res = await LoadUserOrganize({
        MANAGER_ID: this.userId,
        STATUS: 'Y',
        Page: 1,
        Limit: 1000
      })
      let manager = res.Result || []
      const _res = await OrganizeL({
        Page: 1,
        Limit: 10000
      })
      let ORGANIZE = _res.Result || []
      this.planData = ORGANIZE
      this.planData2 = ORGANIZE
      this.organizeList = []
      this.organizeList2 = []
      manager = this.unique(manager)
      manager.map((item) => {
        let tmp = []
        tmp = this.getTree(ORGANIZE, item.ORGANIZE_ID)
        this.organizeList.push(...[tmp[tmp.length - 1]].filter(_i => _i && _i))
        this.organizeList2.push(...[tmp[tmp.length - 1]].filter(_i => _i && _i))
      })
    },
    unique (obj) {
      const res = new Map()
      return obj.filter((a) => !res.has(a.ORGANIZE_ID) && res.set(a.ORGANIZE_ID, 1))
    },
    // 递归
    getTree (data, pid = 0, level = 1) {
      // 直接抄
      let arr = []
      data.map((item) => {
        if (item.PARENT_ORGANIZE_ID === pid) {
          item.level = level
          item.children = this.getTree(data, item.ID, level + 1)
          item.disabled = item.ENABLED === 'N'
          arr.push(item)
        } else if (item.ID === pid && level === 1) {
          item.level = level
          item.children = this.getTree(data, item.ID, level + 1)
          item.disabled = item.ENABLED === 'N'
          arr.push(item)
        }
      })
      return arr
    },
    registerClick () {
      this.tit = this.$t('mtf.s_88')
      this.editForm = { TONGS_STATUS: 3, // 默认合格.
        ISESD: 'Y' }
      this.infoTable2 = []
      this.infoTable3 = []
      this.dialogVisible4 = true
    },
    // 借用/永久借出确定按钮
    async CollarFixtureDetermination (num) {
      if (num === 1) {
        this.CollarFixtureForm.TongsID = this.MainId
        delete this.CollarFixtureForm.LoginName
        const res = await BorrowTongs(this.CollarFixtureForm)
        if (res.Result) {
          this.$notify({
            title: this.$t('mtf._55'),
            message: this.$t('mtf._64'),
            type: 'success',
            duration: 2000
          })
          this.CollarFixtureForm = {}
          this.CollarFixtureForm.UserName = this.userinfo.USER_NAME
          this.CollarFixtureForm.LoginName = this.userinfo.USER_NAME
          this.getList()
        }
        this.dialogVisible3 = false
      } else {
        this.$confirm(`${this.$t('mtf._122')}${this.MainCODE}${this.$t('mtf._123')}`, this.$t('mtf._124'), {
          confirmButtonText: this.$t('mtf._125'),
          cancelButtonText: this.$t('mtf._126'),
          type: 'warning'
        }).then(async () => {
          this.CollarFixtureForm.tongsId = this.MainId
          delete this.CollarFixtureForm.UserName
          const result = await PermanentLendTongs(this.CollarFixtureForm)
          if (result.Result) {
            this.$message({
              type: 'success',
              message: this.$t('mtf._127')
            })
          }
          this.dialogVisible3 = false
          this.getList()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('mtf._128')
          })
        })
        this.dialogVisible3 = false
      }
      this.dialogVisible3 = false
    },
    async IsExistCodeClick () {
      if (!this.form2.code) {
        this.$message.error(this.$t('mtf._955'))
        return
      }
      const res = await IsExistCode({
        code: this.form2.code
      })
      if (res === true) {
        this.$message.error(`${this.$t('mtf._120')}${this.form2.code}${this.$t('mtf._121')}`)
      } else {
        const nowDate = this.getNowDate(new Date())
        const record = {
          TONGS_APPLY_ID: 0,
          TONGS_ID: 0,
          PART_NO: this.form2.code.toString(),
          PART_NAME: '',
          PART_DESC: '',
          CREATE_USER: this.userinfo.USER_NAME,
          CREATE_DATE: nowDate
        }
        this.form.CODE = record.PART_NO
        this.infoTable.push(record)
        this.form2.code = ''
      }
    },
    // 选择夹具申请信息
    async SelectFixtureClick () {
      this.dialogVisible2 = true
      this.loading3 = true
      const res = await LoadDataAndPart(this.SelectFixtureForm)
      this.loading3 = false
      const data = JSON.parse(res.Result)
      if (data.code === 0) {
        this.mainTable3 = data.data
        this.SelectFixtureFormTotalPage = res.TotalCount
      }
      console.log('选择夹具申请信息:', this.mainTable3)
    },
    // 选择储位
    async StorageSelectionClick () {
      this.dialogVisible = true
      this.loading2 = true
      const res = await ListData(this.StorageSpacesForm)
      this.loading2 = false
      this.mainTable2 = res.Result ? JSON.parse(res.Result) : []
      this.StorageSpacesFormTotalPage = res.TotalCount ? res.TotalCount : 0
    },
    cellClick (row) {
      // console.log('cell', row)
      this.form.STORE_CODE = row.row.CODE
      this.form.STORE_NAME = row.row.NAME
    },
    cellClick2 (row) {
      // console.log('cell', row)
      this.form.APPLY_ID = row.row.ID
      this.form.APPLY_TONGS_TYPE = row.row.TONGS_TYPE
      this.form.APPLY_QTY = row.row.QTY
      this.form.APPLY_SURPLUS_QTY = row.row.SURPLUS_QTY
      this.form.APPLY_SOURCES = row.row.SOURCES
      this.form.APPLY_DEPARTMENT_NAME = row.row.DEPARTMENT_NAME
      this.form.DEPARTMENT_NAME = this.form.DEPARTMENT_NAME = row.row.DEPARTMENT
    },
    closeClick (num) {
      if (num === 1) {
        this.dialogVisible = false
      } else if (num === 2) {
        this.dialogVisible2 = false
      } else if (num === 3) {
        this.dialogVisible3 = false
      }
    },
    // 储位确定
    StorageLocationDetermination () {
      this.dialogVisible = false
    },
    // 夹具申请信息
    DetermineFixtureApplication () {
      this.dialogVisible2 = false
      this.DataChanges = !this.DataChanges
      this.DataChanges2 = !this.DataChanges2
    },
    // 重置
    resetListQuery () {
      this.searchVal = {}
      this.searchVal.Limit = 15
    },
    // 获取下拉列表
    async geIndex () {
      this.listLoading = true
      const res = await Index()
      if (res.Result) {
        this.section = res.Result
        this.getOrganize()
        this.getLineTypeList()
      }

      console.log(res, '获取下拉列表')
    },
    // 获取列表
    async getList () {
      this.Mainloading = true
      const res = await LoadData(this.searchVal)
      console.log(res, '获取列表')
      const data = JSON.parse(res.Result)
      // const data = res.Result
      console.log(data)
      this.MainTable = data
      this.searchtotal = res.TotalCount
      this.Mainloading = false
      this.MainSTATUS = ''
      this.Mainradio = ''
    },
    async exportData () {
      this.Mainloading = true
      const res = await ExportData(this.searchVal)
      this.Mainloading = false
      const data = res.Result || []
      this.MainTable = data
      this.searchtotal = res.TotalCount
      this.MainSTATUS = ''
      this.Mainradio = ''
    },
    // 搜索
    searchClick () {
      this.drawer = false
      this.searchVal.Page = 1
      this.getList()
    },

    handleSizeChange (val) {
      this.searchVal.Limit = val
      this.productTable = []
      this.getList()
    },
    handleCurrentChange (val) {
      this.searchVal.Page = val
      this.productTable = []
      this.getList()
    },
    StorageSpacesFormhandleSizeChange (val) {
      this.StorageSpacesForm.Limit = val
      this.StorageSelectionClick()
    },
    StorageSpacesFormhandleCurrentChange (val) {
      this.StorageSpacesForm.Page = val
      this.StorageSelectionClick()
    },
    SelectFixtureFormhandleSizeChange (val) {
      this.SelectFixtureForm.Limit = val
      this.SelectFixtureClick()
    },
    SelectFixtureFormhandleCurrentChange (val) {
      this.SelectFixtureForm.Page = val
      this.SelectFixtureClick()
    },
    // 申请入库按钮
    registeredClick () {
      this.clear()
      this.dialogTableVisible = true
      this.form2 = {}
      this.infoTable = []
    },
    // 申请入库确定
    ApplicationClick () {

    },
    // 入库
    warehouseClick () {
      this.WarStatus = true
      this.StatusClick()
    },
    // 变更储位
    changeClick () {
      this.WarStatus = false
      this.StatusClick()
    },
    StatusClick () {
      if (this.WarStatus) {
        this.fixss = this.$t('mtf._24')
        if (this.MainId === '') {
          this.$message({
            showClose: true,
            message: this.$t('mtf._50'),
            type: 'warning'
          })
          return
        }
        if (this.MainSTATUS !== 0) {
          this.$message({
            showClose: true,
            message: this.$t('mtf._51'),
            type: 'warning'
          })
          return
        }
      } else {
        this.fixss = this.$t('mtf._33')
        if (this.MainId === '') {
          this.$message({
            showClose: true,
            message: this.$t('mtf._52'),
            type: 'warning'
          })
          return
        }
        if (this.MainSTATUS !== 1) {
          this.$message({
            showClose: true,
            message: this.$t('mtf._53'),
            type: 'warning'
          })
          return
        }
      }
      this.getListData()
      this.warehouseVisible = true
    },
    // 选择储位
    async getListData () {
      const res = await ListData(this.warehouseForm)
      const data = JSON.parse(res.Result)
      console.log(data, '入库')
      this.warehouseTable = data
      this.warehousetotal = res.TotalCount
      console.log(res, '入库')
    },
    warehouseRowClick (row) {
      this.ErrorForm.StoreID = row.ID
      this.warehouseRadio = this.warehouseTable.indexOf(row)
    },
    handleSizeClick (val) {
      this.warehouseForm.Limit = val
      this.getListData()
    },
    handleCurrentClick (val) {
      this.warehouseForm.Page = val
      this.getListData()
    },
    // 搜索
    WarSearchClick () {
      this.warehouseForm.Page = 1
      this.StorageSelectionClick()
    },
    SelectFixtureFormhClick () {
      this.SelectFixtureForm.Page = 1
      this.SelectFixtureClick()
    },
    // 确定入库
    warehouse_defineClick () {
      this.ErrorForm.TongsID = this.MainId
      if (this.ErrorForm.StoreID === 0) {
        this.$message({
          showClose: true,
          message: this.$t('mtf._54'),
          type: 'warning'
        })
        return
      }
      if (this.WarStatus) {
        this.ErrorForm.UserName = this.userinfo.USER_NAME
        EnterStore(this.ErrorForm).then(res => {
          if (res.Result) {
            this.$notify({
              title: this.$t('mtf._55'),
              message: this.$t('mtf._56'),
              type: 'success',
              duration: 2000
            })
            this.getList()
            this.warehouseVisible = false
            this.MainId = ''
            this.Mainradio = ''
          }
        })
      } else {
        ChangeStore(this.ErrorForm).then(res => {
          if (res.Result) {
            this.$notify({
              title: this.$t('mtf._55'),
              message: this.$t('mtf._57'),
              type: 'success',
              duration: 2000
            })
            this.getList()
            this.warehouseVisible = false
            this.MainId = ''
            this.Mainradio = ''
          }
        })
      }
    },
    // 打开领用框
    useClick () {
      console.log('this.MainID:', this.MainId)
      if (!this.MainId) {
        this.$message({
          showClose: true,
          message: this.$t('mtf._58'),
          type: 'warning'
        })
        return
      }
      if (this.MainACTIVE === 'N') {
        this.$message({
          showClose: true,
          message: this.$t('mtf._59'),
          type: 'warning'
        })
        return
      }
      if (this.MainSTATUS !== 1 && this.MainSTATUS !== 0) {
        this.$message({
          showClose: true,
          message: this.$t('mtf._60'),
          type: 'warning'
        })
        return
      } else if (this.MainSTATUS === 7) {
        this.$message({
          showClose: true,
          message: this.$t('mtf._119'),
          type: 'warning'
        })
        return
      } else if (this.maintainform.TONGS_STATUS !== 0) {
        this.$message({
          showClose: true,
          message: '工装状态【合格】才能借出',
          type: 'warning'
        })
        return
      }
      this.dialogVisible3 = true
      this.CollarFixtureTitle = `${this.$t('mtf._113')}【${this.MainCODE}】`
      this.isForever = false
      // this.$confirm(this.$t('mtf._61') + this.MainCODE + this.$t('mtf._62'), this.$t('mtf._63'), {
      //   confirmButtonText: this.$t('mtf._17'),
      //   cancelButtonText: this.$t('mtf._23'),
      //   type: 'warning'
      // }).then(() => {
      // BorrowTongs(this.MainId).then(res => {
      //   if (res.Result) {
      //     this.$notify({
      //       title: this.$t('mtf._55'),
      //       message: this.$t('mtf._64'),
      //       type: 'success',
      //       duration: 2000
      //     })
      //     this.getList()
      //   }
      // })
      // }).catch(() => { })
    },
    // 保养
    maintainClick () {
      if (this.MainCODE === '') {
        this.$message({
          showClose: true,
          message: this.$t('mtf._65'),
          type: 'warning'
        })
        return
      }
      if (this.MainACTIVE === 'N') {
        this.$message({
          showClose: true,
          message: this.$t('mtf._66'),
          type: 'warning'
        })
        return
      }
      if (this.MainSTATUS !== 1 && this.MainSTATUS !== 4 && this.MainSTATUS !== 2) {
        this.$message({
          showClose: true,
          message: this.$t('mtf._67'),
          type: 'warning'
        })
        return
      }
      this.$confirm(this.$t('mtf._68') + this.MainCODE + this.$t('mtf._69'), this.$t('mtf._63'), {
        confirmButtonText: this.$t('mtf._17'),
        cancelButtonText: this.$t('mtf._23'),
        type: 'warning'
      }).then(() => {
        console.log(this.MainId)
        this.maintainform.UserName = this.userinfo.USER_NAME
        BeginMaintain(this.MainId, this.maintainform.UserName).then(res => {
          if (res.Result) {
            console.log(res.Result)
            this.maintainform.ID = res.Result
            this.GetMaintainItems()
          }
        })
      }).catch(() => { })
    },
    GetMaintainItems () {
      GetMaintainItemsData(this.MainTONGSTYPE).then(res => {
        if (res.Result) {
          this.maintainTable = JSON.parse(res.Result)
          console.log(this.maintainTable)
          this.maintainVisible = true
          console.log(res.Result)
        }
      })
        .catch(() => { })
    },
    maintain_defineClick () {
      this.maintainform.DetailList = this.maintainTable
      var Text = ''
      if (this.maintainform.STATUS === 1) {
        Text = this.$t('mtf.t5_3')
      } else {
        Text = this.$t('mtf._32')
      }
      this.$confirm(this.$t('mtf._70') + '：' + Text + '，' + this.$t('mtf._71'), this.$t('mtf._63'), {
        confirmButtonText: this.$t('mtf._17'),
        cancelButtonText: this.$t('mtf._23'),
        type: 'warning'
      })
        .then(() => {
          console.log('this.maintainform:', this.maintainform)
          EndMaintain(this.maintainform).then(res => {
            if (res.Result !== void (0)) {
              this.$notify({
                title: this.$t('mtf._55'),
                message: this.$t('mtf._72'),
                type: 'success',
                duration: 2000
              })
              this.maintainform = {
                ID: 0,
                TONGS_ID: '',
                STATUS: 2,
                REMARK: '',
                DetailList: []
              }
            }
            this.getList()
            this.activatingVisible = false
            this.maintainVisible = false
          })
        })
        .catch(() => { })
    },
    // 维修
    serviceClick () {
      if (this.MainCODE === '') {
        this.$message({
          showClose: true,
          message: this.$t('mtf._73'),
          type: 'warning'
        })
        return
      }
      if (this.MainACTIVE === 'N') {
        this.$message({
          showClose: true,
          message: this.$t('mtf._74'),
          type: 'warning'
        })
        return
      }
      if (this.MainSTATUS !== 5) {
        this.$message({
          showClose: true,
          message: this.$t('mtf._75'),
          type: 'warning'
        })
        return
      }
      GetRepairByTongsId(this.MainId).then(res => {
        if (res.Result) {
          const data = JSON.parse(res.Result)
          console.log(data)
          if (data == null) {
            return this.$message({
              showClose: true,
              message: '维修记录没有数据',
              type: 'warning'
            })
          }
          console.log(data, '维修维修')
          this.serviceform.ID = data.ID
          this.serviceform.TONGS_ID = data.TONGS_ID
          this.serviceform.DEFECT_MSG = data.DEFECT_MSG
          this.serviceform.REPAIRER = data.CREATE_USER
          if (data.REPAIR_RESULT) {
            this.serviceform.REPAIR_RESULT = data.REPAIR_RESULT
          }
          this.serviceform.REMARK = data.REMARK
          this.serviceVisible = true
        }
      })
    },
    // 确定维修
    service_defineClick () {
      var textTongs = ''
      if (this.serviceform.REPAIR_RESULT === 1) {
        textTongs = this.$t('mtf.t5_3')
      } else {
        textTongs = this.$t('mtf._76')
      }
      this.$confirm(this.$t('mtf._77') + '：' + textTongs + this.$t('mtf._78'), this.$t('mtf._63'), {
        confirmButtonText: this.$t('mtf._17'),
        cancelButtonText: this.$t('mtf._23'),
        type: 'warning'
      })
        .then(() => {
          RepairTongs(this.serviceform).then(res => {
            if (res.Result) {
              this.serviceVisible = false
              this.$notify({
                title: this.$t('mtf._55'),
                message: this.$t('mtf._72'),
                type: 'success',
                duration: 2000
              })
              this.getList()
            }
          })
        })
        .catch(() => {
          this.getList()
        })
    },
    // 编辑
    async edit_but (row) {
      console.log('row:', row)
      if (row.STATUS !== 0 && row.STATUS !== 1) {
        this.$message.error(this.$t('mtf._132'))
        return
      }
      // 直接抄 【】
      let editForm = cloneDeep(row)
      let stop = this.organizeList.map((item) => item.ID)
      stop = stop.sort((current, next) => (current > next ? 1 : -1))
      stop = stop[0] || 0
      let O_ID = editForm.O_ID || editForm.ORGANIZE_ID
      if (!O_ID) {
        O_ID = 0
      }
      console.log(this.planData, stop)
      editForm.ORGANIZE_ID = this.reverseGetTree(
        this.planData,
        O_ID && parseInt(O_ID),
        stop
      )
      console.log('你好： ', editForm)
      this.editForm = editForm
      //
      this.info2.PART_NO = ''
      this.info2.PART_DESC = ''
      this.info2.PART_NAME = ''
      this.info2.VERSION = ''
      const res = await AddOrModify(row.ID)
      this.branch = res.Result
      const edit = await GetTongsById(row.ID)
      const data = JSON.parse(edit.Result)
      console.log(data)
      this.editForm.ID = data.ID
      this.editForm.TONGS_STATUS = data.TONGS_STATUS ? parseInt(data.TONGS_STATUS) : 3
      this.editForm.ISESD = data.ISESD ? data.ISESD : 'Y'
      this.editForm.CODE = data.CODE
      this.editForm.TONGS_TYPE = data.TONGS_TYPE
      this.editForm.DEPARTMENT = data.DEPARTMENT
      this.editForm.SOURCES = data.SOURCES
      this.editForm.ORGANIZE_ID = Number(data.ORGANIZE_ID)
      this.editForm.TONGS_MODEL = data.TONGS_MODEL

      this.infoTable3 = data.FamilyList || []
      this.infoTable2 = data.PartList || []
      console.log(data, '编辑')
      this.tit = this.$t('publics.btn.edit')
      this.dialogVisible4 = true
    },
    // 递归
    reverseGetTree (data, id, stop) {
      let arr = []
      data.map((item) => {
        if (item.ID === id) {
          if (item.PARENT_ORGANIZE_ID && item.ID !== stop) {
            arr.push(
              ...this.reverseGetTree(data, item.PARENT_ORGANIZE_ID, stop)
            )
          }
          arr.push(item.ID)
        }
      })
      return arr
    },
    // 是否激活
    change (index, row) {
      console.log(row)
      var tongsType = ''
      GetTongsById(row.ID).then(res => {
        const data = JSON.parse(res.Result)
        this.fixtureform.TONGS_ID = row.ID
        // this.fixtureText = data.CODE
        tongsType = data.TONGS_TYPE
        console.log(data, '是否激活')
      })
      this.$confirm(this.$t('mtf._79'), this.$t('mtf._63'), {
        confirmButtonText: this.$t('mtf._17'),
        cancelButtonText: this.$t('mtf._23'),
        type: 'warning'
      })
        .then(() => {
          BeginActive(row.ID, this.UserMane).then(res => {
            if (res.Result) {
              console.log(res.Result)
              this.fixtureform.ID = Number(res.Result)
              this.GetActiveItems(tongsType)
            }
          })
        })
        .catch(() => {
          this.getList()
        })
    },
    // 获取激活事项列表
    GetActiveItems (val) {
      GetActiveItemsData(val).then(res => {
        if (res.Result) {
          this.fixtureTable = JSON.parse(res.Result)
          console.log(this.fixtureTable)
          this.activatingVisible = true
        }
      })
    },
    // 确定是否激活
    fixture_defineClick () {
      this.fixtureform.DetailList = this.fixtureTable
      var Text = ''
      if (this.fixtureform.STATUS === 1) {
        Text = this.$t('mtf.t4_6')
      } else {
        Text = this.$t('mtf.t4_7')
      }
      this.$confirm(this.$t('mtf._80') + '：' + Text + this.$t('mtf._81'), this.$t('mtf._63'), {
        confirmButtonText: this.$t('mtf._17'),
        cancelButtonText: this.$t('mtf._23'),
        type: 'warning'
      })
        .then(() => {
          EndActive(this.fixtureform).then(res => {
            if (res.Result) {
              this.$notify({
                title: this.$t('mtf._63'),
                message: this.$t('mtf._72'),
                type: 'success',
                duration: 2000
              })
              this.fixtureform = {
                ID: 0,
                TONGS_ID: '',
                STATUS: 2,
                REMARK: '',
                UserName: this.userinfo.USER_NAME,
                DetailList: []
              }
            }
            this.getList()
            this.activatingVisible = false
          })
            .catch(() => { })
        })
        .catch(() => { })
    },
    fixture_cancelClick () {
      this.getList()
      this.activatingVisible = false
    },
    beforeClick () {
      this.activatingVisible = false
      console.log('beforeClick')
      this.getList()
    },
    // 确定保存
    define_but () {
      if (!this.form.CODE) {
        this.$message({
          showClose: true,
          message: this.$t('mtf._822'),
          type: 'warning'
        })
        return
      }
      if (!this.form.STORE_CODE) {
        this.$message({
          showClose: true,
          message: this.$t('mtf._84'),
          type: 'warning'
        })
        return
      }
      const nowDate = this.getNowDate(new Date())
      this.form.CREATE_DATE = nowDate
      this.form.UPDATE_DATE = nowDate
      this.form.ORGANIZE_ID = this.form.ORGANIZE_ID ? this.form.ORGANIZE_ID.toString() : ''
      const BigList = []
      this.infoTable.map((item, index) => {
        this.form.PartList = [item]
        this.form.CODE = item.PART_NO
        BigList.push(cloneDeep(this.form))
      })
      console.log(BigList)
      // console.log('申请入库form:', JSON.stringify(this.form))
      console.log(JSON.stringify({
        List: BigList,
        LoginName: this.userinfo.USER_NAME,
        ORGANIZE_ID: this.form.ORGANIZE_ID
      }))
      ApplyGoStore({
        List: BigList,
        LoginName: this.userinfo.USER_NAME,
        ORGANIZE_ID: this.form.ORGANIZE_ID
      })
        .then(res => {
          if (res.Result) {
            this.dialogTableVisible = false
            this.getList()
            this.$notify({
              title: this.$t('mtf._63'),
              message: this.$t('mtf._72'),
              type: 'success',
              duration: 2000
            })
          }
        })
        .catch(() => { })
    },
    define_but2 () {
      this.$refs.editForm.validate(async (valid, errInfo) => {
        if (valid) {
          if (
            Object.prototype.toString.call(this.editForm.ORGANIZE_ID) ===
            '[object Array]'
          ) {
            this.editForm.ORGANIZE_ID = this.editForm.ORGANIZE_ID[this.editForm.ORGANIZE_ID.length - 1]
          }
          this.infoTable3.map(res => {
            res.TONGS_ID = this.editForm.ID
          })
          this.editForm.PartList = this.infoTable2
          this.editForm.FamilyList = this.infoTable3
          console.log(this.editForm, 'this.editForm==')
          if (this.tit === this.$t('mtf.s_88')) {
            this.editForm.CREATE_USER = this.userinfo.USER_NAME
            this.editForm.CREATE_DATE = this.getNowDate(new Date())
            this.editForm.ORGANIZE_ID = this.editForm.ORGANIZE_ID ? this.editForm.ORGANIZE_ID : ''
            let form = {}
            form = this.editForm
            form.LoginName = this.userinfo.USER_NAME
            form.ORGANIZE_ID = this.editForm.ORGANIZE_ID
            // console.log(JSON.stringify(form))
            ApplyGoStoreByModel(this.editForm, form).then(res => {
              const data = JSON.parse(res.Result)
              if (data.ResultCode !== 0) {
                this.dialogVisible4 = false
                this.$message.error(data.ResultMsg)
              } else {
                this.dialogVisible4 = false
                this.getList()
                this.$notify({
                  title: this.$t('mtf._63'),
                  message: this.$t('mtf._72'),
                  type: 'success',
                  duration: 2000
                })
              }
              this.dialogVisible4 = false
            })
          } else if (this.tit === this.$t('publics.btn.edit')) {
            this.editForm.UPDATE_USER = this.userinfo.USER_NAME
            this.editForm.UPDATE_DATE = this.getNowDate(new Date())
            this.editForm.STORE_ID = 0
            this.editForm.ORGANIZE_ID = this.editForm.ORGANIZE_ID ? this.editForm.ORGANIZE_ID.toString() : ''
            console.log(JSON.stringify(this.editForm))
            AddOrModifySave(this.editForm)
              .then(res => {
                if (res.Result) {
                  this.dialogVisible4 = false
                  this.handleClick()
                  this.getList()
                  this.$notify({
                    title: this.$t('mtf._63'),
                    message: this.$t('mtf._72'),
                    type: 'success',
                    duration: 2000
                  })
                }
                this.dialogVisible4 = false
              })
              .catch(() => { })
          }
        } else {
          try {
            Object.keys(errInfo).forEach((item) => {
              this.$message.error(errInfo[item][0].message)
              throw new Error(new Date().toLocaleString())
            })
          } catch { }
        }
      })
    },
    reset_but () {
      this.form = {}
      // this.info.PART_NO = ''
      // this.info.PART_DESC = ''
      // this.info.PART_NAME = ''
      // this.info.VERSION = ''
    },
    reset_but2 () {
      this.info2.PART_NO = ''
      this.info2.PART_DESC = ''
      this.info2.PART_NAME = ''
      this.info2.VERSION = ''
    },
    // 移除
    removeClick (row, index) {
      this.infoTable.splice(index, 1)
    },
    removeClick2 (row, index) {
      this.infoTable2.splice(index, 1)
    },
    //  回车获取料号获取产品信息
    async partClick (e) {
      if (!e) return
      const res = await GetPartByPartNo(this.info2.PART_NO)
      const data = JSON.parse(res.Result)
      console.log(data, '回车获取料号获取产品信息')
      if (data !== null) {
        this.info2.PART_DESC = data.DESCRIPTION
        this.info2.PART_NAME = data.NAME
      } else {
        this.info2.PART_DESC = ''
        this.info2.PART_NAME = ''
        this.info2.PART_NO = ''
        this.$message({
          showClose: true,
          message: this.$t('ssc._21'),
          type: 'warning'
        })
      }
      this.$forceUpdate()
    },
    // 产品系列移除
    async ProductRemove (row, index) {
      this.infoTable3.splice(index, 1)
    },
    // 产品系列回车
    async GetProduct (e) {
      if (!e) return
      const res = await GetProduct({ 'FAMILY_NAME': this.info3.FAMILY_NAME, 'IS_LIKE': 0 })
      const data = res.Result || []
      if (data.length) {
        this.info3 = data[0]
      } else {
        this.$message({
          showClose: true,
          message: this.$t('mtf._135'),
          type: 'warning'
        })
        this.info3 = {}
        this.info3.FAMILY_NAME = ''
      }
    },
    // 添加
    addClick () {
      if (this.info2.PART_NO === '') {
        this.$message({
          showClose: true,
          message: this.$t('mtf._86'),
          type: 'warning'
        })
        return
      }
      var obj = {
        PART_NO: this.info2.PART_NO,
        PART_DESC: this.info2.PART_DESC,
        PART_NAME: this.info2.PART_NAME,
        VERSION: this.info2.VERSION
      }
      if (this.tit === this.$t('mtf.s_88')) {
        obj.CREATE_USER = this.userinfo.USER_NAME
        obj.CREATE_DATE = this.getNowDate(new Date())
      } else if (this.tit === this.$t('publics.btn.edit')) {
        obj.UPDATE_USER = this.userinfo.USER_NAME
        obj.UPDATE_DATE = this.getNowDate(new Date())
      }
      this.infoTable2.push(obj)
      this.reset_but2()
    },
    // 注册 产品系列添加
    Productadd () {
      if (!this.info3.FAMILY_NAME) {
        this.$message({
          showClose: true,
          message: this.$t('mtf._136'),
          type: 'warning'
        })
        return
      }

      this.infoTable3.push(this.info3)
      this.info3 = {}
      console.log(this.infoTable3, 'this.infoTable3')
    },
    MainRowClick (row, column, event) {
      this.$refs.multipleTable.toggleRowSelection(row)
    },
    // 主表点击获取一行
    DetailsClick (row) {
      this.selectMainData = row
      if (row && row.length <= 0) return
      // 获取最后一个数组元素
      let prop = row.slice(-1)[0]
      console.log(prop)
      this.MainId = prop.ID
      console.log('=============', this.MainId)
      this.MainCODE = prop.CODE
      this.MainACTIVE = prop.ACTIVE
      this.MainSTATUS = prop.STATUS
      this.maintainform.TONGS_ID = prop.ID
      this.maintainform.MAINTAIN_USER = this.userinfo.USER_NAME
      this.maintainform.TONGS_STATUS = prop.TONGS_STATUS
      this.MainTONGSTYPE = prop.TONGS_TYPE
      this.Mainradio = this.MainTable.indexOf(prop)
      if (this.activeName === 'product') {
        this.GetTongsData(prop.ID)
      }
      if (this.activeName === 'productlist') {
        this.GetTongsData(prop.ID)
      }
      if (this.activeName === 'operation') {
        this.GetTongsOperation(prop.ID)
      }
      if (this.activeName === 'activation') {
        this.GetMaintain(prop.ID)
      }
      if (this.activeName === 'service') {
        this.GetRepair(prop.ID)
      }
    },
    // 根据ID获取夹具信息
    async GetTongsData (id) {
      const res = await GetTongsById(id)
      this.goodsTable = JSON.parse(res.Result).PartList
      this.productTable = JSON.parse(res.Result).FamilyList
      console.log(JSON.parse(res.Result), '根据ID获取夹具信息')
    },
    //  根据夹具ID获取夹具操作记录
    async GetTongsOperation (id) {
      const res = await GetTongsOperationData(id)
      this.operateTable = JSON.parse(res.Result)
      console.log(JSON.parse(res.Result), '根据夹具ID获取夹具操作记录')
    },
    //  根据夹具ID获取保养/激活记录
    async GetMaintain (id) {
      const res = await GetMaintainData(id)
      this.activatingTable = JSON.parse(res.Result)
      console.log(JSON.parse(res.Result), '根据夹具ID获取保养/激活记录')
    },
    // 激活/保养点击获取一行
    activationClick (row) {
      this.arouseRadio = this.activatingTable.indexOf(row)
      this.GetMaintainDetail(row.ID)
    },
    // 根据保养主表ID获取保养明细数据
    async GetMaintainDetail (id) {
      const res = await GetMaintainDetailData(id)
      this.AcceTable = JSON.parse(res.Result)
      console.log(JSON.parse(res.Result), '根据保养主表ID获取保养明细数据')
    },
    // 根据夹具ID获取维修记录
    async GetRepair (id) {
      const res = await GetRepairData(id)
      this.serviceTable = JSON.parse(res.Result)
      console.log(JSON.parse(res.Result, '根据夹具ID获取维修记录'))
    },
    // 子表点击切换
    handleClick () {
      if (this.MainId) {
        if (this.activeName === 'product') {
          this.GetTongsData(this.MainId)
        }
        if (this.activeName === 'productlist') {
          this.GetTongsData(this.MainId)
        }
        if (this.activeName === 'operation') {
          this.GetTongsOperation(this.MainId)
        }
        if (this.activeName === 'activation') {
          this.GetMaintain(this.MainId)
        }
        if (this.activeName === 'service') {
          this.GetRepair(this.MainId)
        }
      }
    },
    clear () {
      this.FixtureCategory = null
      this.Source = null
      this.form = {
        ID: 0,
        CODE: '', // 夹具编码
        SOURCES: 0, // 来源
        UPDATE_USER: this.userinfo.USER_NAME,
        CREATE_USER: this.userinfo.USER_NAME,
        PartList: []
      }
    },
    removeSpace (value) {
      return removeSpace(value)
    },
    // 永久借出
    foreverClick () {
      if (!this.MainACTIVE) return this.$message.error(this.$t('mtf._131'))
      if (this.MainACTIVE === 'N') return this.$message.error(this.$t('mtf._129'))
      if (this.MainSTATUS !== 0 && this.MainSTATUS !== 1 && this.MainSTATUS !== 2) {
        this.$message.error(this.$t('mtf._130'))
        return
      }
      this.dialogVisible3 = true
      this.CollarFixtureTitle = `${this.$t('mtf._117')}【${this.MainCODE}】`
      this.isForever = true
    },
    changeDEPARTMENT () {
      // 强刷数据
      this.$forceUpdate()
    },
    removeMeangin (e) {
      console.log(e)
      if (e === false) {
        this.NameForm.MEANING = ''
      }
    },
    changeTONGS_TYPE () {
      this.$forceUpdate()
    },
    changeSOURCES () {
      this.$forceUpdate()
    },
    // 获取夹具类别
    async getTongsTypeList () {
      const res = await GetTongsTypeList()
      this.fixture = res.Result ? res.Result : []
    },
    // 添加名称
    async AddName () {
      if (!this.NameForm.MEANING) {
        return this.$message.error(this.$t('SysOrganize._26'))
      }
      var inde = 0
      var NameObj = {
        NAME: '夹具类型',
        Page: 1,
        Limit: 15,
        MEANING: ''
      }
      const data = await sptLoadData(NameObj)
      if (data.Result) {
        inde = data.Result[0].LOOKUP_CODE || 0
      }
      var NameMode = {
        insertRecords: [
          {
            CHINESE: this.NameForm.MEANING,
            DESCRIPTION: this.NameForm.MEANING,
            ENABLED: 'Y',
            ID: 0,
            LOOKUP_CODE: inde + 1,
            LOOKUP_TYPE: 'MES_TONGS_TYPE',
            MEANING: this.NameForm.MEANING,
            NAME: '夹具类型'
          }
        ]
      }

      this.$confirm(
        this.$t('确定要添加？'),
        this.$t('publics.tips.tips'),
        {
          confirmButtonText: this.$t('publics.tips.confirm'),
          cancelButtonText: this.$t('publics.tips.cancel'),
          type: 'warning'
        }
      )
        .then(async () => {
          const res = await sptSaveData(NameMode)
          if (res.Result) {
            this.sptLoadData()
            this.editForm.TONGS_TYPE = this.NameForm.MEANING
            this.NameForm.MEANING = ''
            this.$notify({
              title: this.$t('mtf._63'),
              message: this.$t('mtf._72'),
              type: 'success',
              duration: 2000
            })
          }
        })
        .catch(() => { })
    },
    DeleteName (row) {
      var NameMode = {
        removeRecords: [row]
      }
      this.$confirm(
        this.$t('publics.tips.makeSureDelete'),
        this.$t('publics.tips.tips'),
        {
          confirmButtonText: this.$t('publics.tips.confirm'),
          cancelButtonText: this.$t('publics.tips.cancel'),
          type: 'warning'
        }
      )
        .then(async () => {
          const res = await sptSaveData(NameMode)
          if (res.Result) {
            this.editForm.TONGS_TYPE = ''
            this.sptLoadData()
            this.$notify({
              title: this.$t('mtf._63'),
              message: this.$t('mtf._72'),
              type: 'success',
              duration: 2000
            })
          }
        })
        .catch(() => { })
    },
    // 获取当前时间
    getNowDate (date) {
      var y = date.getFullYear()
      var m = date.getMonth() + 1
      m = m < 10 ? '0' + m : m
      var d = date.getDate()
      d = d < 10 ? '0' + d : d
      var h = date.getHours()
      h = h < 10 ? '0' + h : h
      var minute = date.getMinutes()
      minute = minute < 10 ? '0' + minute : minute
      var second = date.getSeconds()
      second = second < 10 ? '0' + second : second
      return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
    }
  }
}
