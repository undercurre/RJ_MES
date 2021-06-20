import {
  Index,
  LoadData,
  LoadDataHandle,
  LoadDataNotice,
  AddOrModifyHandleSave
} from '@/api/CallRecord'
import customContainerHeader from '@/components/custom-container-header'
import {
  mapGetters
} from 'vuex'
export default {
  name: 'CallRecord',
  components: {
    customContainerHeader
  },
  data () {
    return {
      loading: false,
      CallTypeList: [],
      LinesList: [],
      StatusList: [],
      img_url: process.env.VUE_APP_BASE_IMG,
      // 呼叫日期
      calldate: '',
      listQuery: {
        Page: 1, // 当前页
        Limit: 10, // 分页大小
        OPERATION_LINE_ID: '', // 线体
        STATUS: '', // 设备状态
        CALL_TYPE_CODE: '', // 类型
        BEGIN_TIME: '',
        END_TIME: '',
        Key: ''
      },
      total: 0,
      mainTable: [],
      dealWithTable: [],
      NoticeTable: [],
      radio: '',
      dialogTableVisible: false,
      day_total: 1,
      ruleForm: {
        MST_ID: 0,
        HANDLE_STATUS: '1',
        HANDLE_CONTENT: '',
        HANDLER: ''
      }
    }
  },
  computed: {
    ...mapGetters(['userinfo'])
  },
  created () {
    this.getIndex()
    this.getList()
    this.ruleForm.HANDLER = this.userinfo.USER_NAME
  },
  methods: {
    // 获取下拉列表
    async getIndex () {
      const res = await Index()
      console.log(res, '获取下拉列表')
      this.CallTypeList = res.Result.CallTypeList
      this.LinesList = res.Result.LinesList
      this.StatusList = res.Result.StatusList
    },
    // 获取列表
    async getList () {
      this.loading = true
      const res = await LoadData(this.listQuery)
      this.mainTable = JSON.parse(res.Result)
      this.total = res.TotalCount
      this.loading = false
    },
    // 搜索
    doFilter () {
      if (this.calldate !== '' && this.calldate !== null) {
        this.listQuery.BEGIN_TIME = this.calldate[0]
        this.listQuery.END_TIME = this.calldate[1]
      } else {
        this.listQuery.BEGIN_TIME = ''
        this.listQuery.END_TIME = ''
      }
      this.listQuery.Page = 1
      this.getList()
    },
    handleSizeChange (val) {
      this.listQuery.Limit = val
      this.getList()
    },
    handleCurrentChange (val) {
      this.listQuery.Page = val
      this.getList()
    },
    // 点击获取表格一行数据
    DetailsClick (row) {
      console.log(row)
      this.radio = this.mainTable.indexOf(row)
      this.getLoadDataHandle(row.Id)
      this.getLoadDataNotice(row.Id)
    },
    // 获取处理记录
    async getLoadDataHandle (id) {
      const res = await LoadDataHandle(id)
      this.dealWithTable = JSON.parse(res.Result)
      this.NoticeTable = JSON.parse(res.Result)
      console.log(res, '获取处理记录')
    },
    async getLoadDataNotice (id) {
      const res = await LoadDataNotice(id)
      this.NoticeTable = JSON.parse(res.Result)
      console.log(this.NoticeTable, '获取通知列表')
    },
    // 添加处理结果
    day_view_but (val) {
      console.log(val)
      this.ruleForm.MST_ID = val.Id
      this.dialogTableVisible = true
    },
    // 添加处理结果确定
    submitForm () {
      if (this.ruleForm.HANDLE_CONTENT === '') {
        this.$message({
          showClose: true,
          message: this.$t('crp.m_1'),
          type: 'warning'
        })
        return
      }
      AddOrModifyHandleSave(this.ruleForm).then(res => {
        if (res.Result) {
          this.$notify({
            title: this.$t('crp.m_3'),
            message: this.$t('crp.m_3'),
            type: 'success',
            duration: 2000
          })
          this.dialogTableVisible = false
          this.getList()
        } else {
          this.dialogTableVisible = false
          this.getList()
        }
      })
    },
    // 重置
    resetForm () {
      this.ruleForm.HANDLE_CONTENT = ''
    }
  }
}
