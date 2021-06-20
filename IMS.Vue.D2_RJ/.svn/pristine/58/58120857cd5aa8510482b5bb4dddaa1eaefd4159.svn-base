
import {
  AddOrModify,

  AddOrModifyServer, LoadEditPageData,
  LoadPersonData,
  LoadPersonListByIDAsync
} from '@/api/CallConfig'
import customContainerHeader from '@/components/custom-container-header'
import pagination from '@/views/mixin/page'
export default {
  name: 'AddOrModify',
  mixins: [pagination],
  components: {
    customContainerHeader
  },
  data () {
    return {
      LinesList: [],
      OperationsList: [],
      AndonCallTypeList: [],
      listQuery: {
        ID: 0,
        OPERATION_LINE_ID: '',
        OPERATION_SITE_ID: '',
        CALL_TYPE_CODE: '',
        ENABLED: 'N',
        USER_ID: ''
      },
      mainTable: [],
      adddialogVisible: false,
      addTable: [],
      addArr: [],
      addQuery: {
        USER_NAME: '',
        MOBILE: '',
        Page: 1,
        Limit: 10
      },
      total: 0
    }
  },
  mounted () {
    this.Bus.on('id', val => {
      console.log(val)
      this.getLoadEditPageData(val)
      this.getLoadPersonListByIDAsync(val)
    })
  },
  created () {
    this.getInd()
  },
  methods: {
    // 获取下拉列表
    async getInd () {
      const res = await AddOrModify()
      if (res.Result) {
        console.log(res)
        this.LinesList = res.Result.LinesList
        this.OperationsList = res.Result.OperationsList
        this.AndonCallTypeList = res.Result.AndonCallTypeList
        this.getLoadPersonData()
      }
    },
    // 获取编辑个人资料
    async getLoadEditPageData (id) {
      const res = await LoadEditPageData(id)
      const data = JSON.parse(res.Result)
      console.log(data, 'datadata')
      this.listQuery.OPERATION_LINE_ID = data.OPERATION_LINE_ID
      this.listQuery.OPERATION_SITE_ID = data.OPERATION_SITE_ID ? data.OPERATION_SITE_ID : ''
      this.listQuery.CALL_TYPE_CODE = Number(data.CALL_TYPE_CODE)
      this.listQuery.ENABLED = data.ENABLED
      this.listQuery.ID = data.ID
      // this.listQuery.USER_ID = data.USER_ID
    },
    // 获取表格
    async getLoadPersonListByIDAsync (id) {
      const res = await LoadPersonListByIDAsync(id)
      const data = JSON.parse(res.Result)
      this.mainTable = data
      const joinid = this.mainTable.map(item => item.ID)
      this.listQuery.USER_ID = joinid.join('|')
    },
    // 获取所有人员
    async getLoadPersonData () {
      const res = await LoadPersonData(this.addQuery)
      const data = JSON.parse(res.Result)
      const start = (this.addQuery.Page - 1) * this.addQuery.Limit
      const end = this.addQuery.Page * this.addQuery.Limit
      this.addTable = data.slice(start, end)
      this.total = res.TotalCount
    },
    // 返回
    return_but () {
      this.$emit('close')
    },
    // 保存
    save_but () {
      if (this.listQuery.OPERATION_LINE_ID === '' || this.listQuery.OPERATION_LINE_ID === null) {
        this.$message({
          showClose: true,
          message: this.$t('CallConfig._31'),
          type: 'warning'
        })
        return
      }
      if (this.listQuery.CALL_TYPE_CODE === '' || this.listQuery.CALL_TYPE_CODE === null) {
        this.$message({
          showClose: true,
          message: this.$t(''),
          type: 'warning'
        })
        return
      }

      if (this.listQuery.USER_ID === '') {
        this.$message({
          showClose: true,
          message: this.$t('CallConfig._39'),
          type: 'warning'
        })
        return
      }
      AddOrModifyServer(this.listQuery)
        .then(response => {
          if (response.Result) {
            this.$notify({
              title: this.$t('CallConfig._19'),
              message: this.$t('CallConfig._20'),
              type: 'success',
              duration: 2000
            })
            this.$emit('close')
          }
        })
        .catch(() => {
        })
    },
    remove_but (index, rows) {
      rows.splice(index, 1)
      const joinid = this.mainTable.map(item => item.ID)
      this.listQuery.USER_ID = joinid.join('|')
    },
    // 添加人员
    add_but () {
      this.adddialogVisible = true
    },
    // 是否有
    change (row) {
    },
    // 搜索
    search_but () {
      this.getLoadPersonData()
    },
    // 选中
    addSelectionChange (row) {
      this.addArr = row
    },
    // 确定
    determine_but () {
      this.adddialogVisible = false
      console.log(this.addArr, 'this.addArr')
      console.log(this.mainTable, 'mainTable')
      var that = this
      const arr1Ids = this.mainTable.map(item => item.ID)
      const result = this.addArr.filter(item => !arr1Ids.includes(item.ID))
      result.forEach(function (item) {
        const record = {
          ID: item.ID,
          USER_NAME: item.USER_NAME,
          NICK_NAME: item.NICK_NAME,
          MOBILE: item.MOBILE,
          WORK_WECHAT_ID: item.WORK_WECHAT_ID
        }
        that.mainTable.push(record)
      })
      // 删除后清空之前选择的数据
      this.$refs.multipleTable.clearSelection()
      this.addArr = []
      const joinid = this.mainTable.map(item => item.ID)
      this.listQuery.USER_ID = joinid.join('|')
      console.log(this.listQuery.USER_ID)
    },
    // 取消
    cancel_but () {
      this.addArr = []
      this.adddialogVisible = false
      // 删除后清空之前选择的数据
      this.$refs.multipleTable.clearSelection()
    },
    // 分页
    handleSizeChange (val) {
      this.addQuery.Limit = val
      this.getLoadPersonData()
    },
    handleCurrentChange (val) {
      this.addQuery.Page = val
      this.getLoadPersonData()
    }
  }
}
