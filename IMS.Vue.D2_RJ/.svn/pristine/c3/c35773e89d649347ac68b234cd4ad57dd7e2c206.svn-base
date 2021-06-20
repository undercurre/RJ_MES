import {
  getIndex,
  LoadData,
  AddOrModify,
  AddOrModifyServer,
  ChangeEnabled,
  DeleteOneById,
  ExportData
} from '@/api/CallContentConfig'
import {
  mapGetters
} from 'vuex'
import customContainerHeader from '@/components/custom-container-header'
export default {
  name: 'CallContentConfig',
  components: {
    customContainerHeader
  },
  data () {
    return {
      listLoading: false,
      CallTypeList: [],
      listQuery: {
        Page: 1, // 当前页
        Limit: 15, // 分页大小
        CALL_TYPE_CODE: '', // 类型
        Key: ''
      },
      total: 0,
      mainTable: [],
      innerVisible: false,
      CallType: [],
      callVal: {
        Id: '',
        CALL_CODE: '',
        Call_Type_Code: undefined,
        Chinese: '',
        Enabled: 'N'
      },
      addorediText: '',
      rules: {
        Call_Type_Code: [{
          required: true,
          message: this.$t('cccn._14'),
          trigger: 'change'
        }],
        CALL_CODE: [{
          required: true,
          message: this.$t('cccn._15'),
          trigger: 'blur'
        }],
        Chinese: [{
          required: true,
          message: this.$t('cccn._16'),
          trigger: 'blur'
        }]
      },
      effect: {
        Id: '',
        Status: '',
        Operator: ''
      }
    }
  },
  computed: {
    ...mapGetters(['userinfo'])
  },
  created () {
    this.getdown()

    this.effect.Operator = this.userinfo.USER_NAME
  },
  methods: {
    // 获取下拉列表
    async getdown () {
      const res = await getIndex()
      if (res.Result) {
        this.CallTypeList = res.Result.CallTypeList
        this.getList()
        this.getAddOrModify()
      }
    },
    // 获取表格列表
    async getList () {
      this.listLoading = true
      const res = await LoadData(this.listQuery)
      const data = JSON.parse(res.Result)
      console.log(data, '获取表格列表')
      this.mainTable = data
      this.total = res.TotalCount
      this.listLoading = false
    },
    async exportData () {
      this.listLoading = true
      const res = await ExportData(this.listQuery)
      this.listLoading = false
      this.mainTable = res.Result || []
      this.total = res.TotalCount || 0
    },
    // 获取下拉列表
    async getAddOrModify () {
      const res = await AddOrModify()
      this.CallType = res.Result.CallTypeList
    },
    // 搜索
    search_but () {
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
    // 编辑
    edit_but (row) {
      this.addorediText = this.$t('cccn._19')
      this.callVal.Id = row.Id
      this.callVal.Call_Type_Code = Number(row.Call_Type_Code)
      this.callVal.CALL_CODE = row.CALL_CODE
      this.callVal.Chinese = row.Chinese
      this.callVal.Enabled = row.Enabled
      this.innerVisible = true
    },
    // 是否激活
    change (index, row) {
      console.log(row)
      if (row.Enabled === 'Y') {
        this.effect.Status = true
      } else {
        this.effect.Status = false
      }
      this.effect.Id = row.Id
      this.$confirm(this.$t('cccn._20'), this.$t('cccn._21'), {
        confirmButtonText: this.$t('cccn._22'),
        cancelButtonText: this.$t('cccn._23'),
        type: 'warning'
      })
        .then(() => {
          ChangeEnabled(this.effect).then(response => {
            if (response.Result) {
              this.getList()
              this.$notify({
                title: this.$t('cccn._24'),
                message: this.$t('cccn._25'),
                type: 'success',
                duration: 2000
              })
            } else {
              this.getList()
            }
          })
        })
        .catch(() => {
          this.getList()
        })
    },
    // 删除
    remove_but (row) {
      this.$confirm(this.$t('cccn._26'), this.$t('cccn._21'), {
        confirmButtonText: this.$t('cccn._22'),
        cancelButtonText: this.$t('cccn._23'),
        type: 'warning'
      }).then(response => {
        DeleteOneById(row.Id).then(response => {
          if (response.Result) {
            this.$notify({
              title: this.$t('cccn._24'),
              message: this.$t('cccn._25'),
              type: 'success',
              duration: 2000
            })
            this.getList()
          } else {
            this.getList()
          }
        })
      })
    },
    // 添加
    add_but () {
      this.Eliminate()
      this.addorediText = this.$t('cccn._27')
      this.innerVisible = true
    },
    // 确定
    shout_but (formName) {
      this.$refs.callVal.validate(
        async (valid, errInfo) => {
          if (valid) {
            const res = await AddOrModifyServer(this.callVal)
            if (res.Result) {
              this.innerVisible = false
              this.getList()
              this.$notify({
                title: this.$t('cccn._24'),
                message: this.$t('cccn._25'),
                type: 'success',
                duration: 2000
              })
            } else {
              this.innerVisible = false
              this.getList()
            }
          } else {
            try {
              Object.keys(errInfo).forEach(item => {
                this.$message.error(errInfo[item][0].message)
                throw new Error(new Date().toLocaleString())
              })
            } catch {}
          }
        })
    },
    // 重置
    reset_but () {
      this.callVal.CALL_CODE = ''
      this.callVal.Chinese = ''
    },
    // 清空
    Eliminate () {
      this.callVal = {
        Id: 0,
        CALL_CODE: undefined,
        CALL_TYPE_CODE: undefined,
        Chinese: undefined,
        Enabled: 'N'
      }
    }
  }
}
