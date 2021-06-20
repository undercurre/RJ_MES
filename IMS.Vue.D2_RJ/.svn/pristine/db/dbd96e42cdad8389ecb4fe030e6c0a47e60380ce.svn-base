import {
  CheckBill, getlist, getselect,

  RejectBill, removes
} from '@/api/ipqaMst'
import customContainer from '@/components/custom-container'
import customContainerHeader from '@/components/custom-container-header'
import { mapGetters } from 'vuex'
export default {
  name: 'lpqaMstList',
  components: { customContainerHeader, customContainer },
  data () {
    return {
      listLoading: false,
      options: [],
      line: [],
      sort: [
        {
          ID: '0',
          SBU_CHINESE: this.$t('IpqaMst.IpqaMstList.smt')
        },
        {
          ID: '1',
          SBU_CHINESE: this.$t('IpqaMst.IpqaMstList.yield')
        }
      ],
      GetDepartmentList: [],
      DepartmentList: [],
      productval: '',
      pickerOptions: {
        shortcuts: [
          {
            text: this.$t('IpqaMst.IpqaMstList.lastweek'),
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: this.$t('IpqaMst.IpqaMstList.lastmonth'),
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: this.$t('IpqaMst.IpqaMstList.lastthree'),
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      value2: '',
      tableDataEnd: [],
      total: 0,
      listQuery: {
        Page: 1, // 当前页
        Limit: 15, // 分页大小
        BUSINESS_UNIT: '', // 选择经营
        DEPARTMENT: '', // 选择部门
        U_LINE: '', // 选择线级别
        Key: '', // 产品名称
        IPQA_TYPE: '', // 巡检分类
        create_begin: null,
        create_end: null
      },
      tableval: [],
      radio: '',
      // 编辑
      editObj: {
        id: 0,
        ipqa_type: ''
      },
      // 审核和拒绝
      checkBill: {
        ID: null,
        Operator: null
      }
    }
  },
  created () {
    this.getSelelist()
    this.getList()
  },
  // eslint-disable-next-line vue/order-in-components
  computed: {
    ...mapGetters(['userinfo'])
  },
  methods: {
    // 获取下拉菜单
    async getSelelist () {
      const res = await getselect()
      this.options = res.Result.BusinessUnitsList
      this.line = res.Result.LineList
      this.GetDepartmentList = res.Result.DepartmentList
      this.DepartmentList = res.Result.DepartmentList
      // console.log(response.Result, '下拉')
    },
    // 获取用户列表
    async getList () {
      this.listLoading = true
      const res = await getlist(this.listQuery)
      console.log(JSON.parse(res.Result))
      const data = JSON.parse(res.Result)
      this.tableDataEnd = data
      this.total = res.TotalCount
      this.listLoading = false
    },
    // 过滤部门
    business_but (val) {
      console.log(val)
      this.GetDepartmentList = []
      this.DepartmentList.forEach(v => {
        // console.log(v)
        if (v.SBU_ID !== val) {
          this.GetDepartmentList = []
          this.listQuery.DEPARTMENT = ''
        } else {
          this.GetDepartmentList.push(v)
        }
      })
    },
    // 删除
    remove_but () {
      console.log(this.tableval, 'this.tableval')
      if (this.tableval.length === 0) {
        this.$message({
          showClose: true,
          message: this.$t('IpqaMst.IpqaMstList.deleteline'),
          type: 'warning'
        })
      } else {
        this.$confirm(this.$t('IpqaMst.IpqaMstList.fidelete'), this.$t('IpqaMst.IpqaMstList.prompt'), {
          confirmButtonText: this.$t('IpqaMst.IpqaMstList.confirm'),
          cancelButtonText: this.$t('IpqaMst.IpqaMstList.cancel'),
          type: 'warning'
        })
          .then(() => {
            removes(this.tableval.ID)
              .then(response => {
                if (response.Result) {
                  this.getList()
                  this.$notify({
                    title: this.$t('IpqaMst.IpqaMstList.success'),
                    message: this.$t('IpqaMst.IpqaMstList.sudeleted'),
                    type: 'success',
                    duration: 2000
                  })
                }
              })
              .catch(res => {
                this.$message.error(this.$t('IpqaMst.IpqaMstList.faildelete'))
              })
          })
          .catch(() => {
            this.$message(this.$t('IpqaMst.IpqaMstList.opecanc'))
          })
      }
    },
    // 点击获取表格一行数据
    obtain_but (row) {
      console.log(row)
      this.editObj.id = row.ID
      this.editObj.ipqa_type = row.IPQA_TYPE
      this.tableval = row
      this.radio = this.tableDataEnd.indexOf(row)
    },
    // 搜索
    search_but () {
      this.listQuery.Page = 1
      console.log(this.value2)
      if (this.value2) {
        this.listQuery.create_begin = this.value2[0]
        this.listQuery.create_end = this.value2[1]
      } else {
        this.listQuery.create_begin = ''
        this.listQuery.create_end = ''
      }
      this.getList()
    },
    // 添加
    add_but () {
      if (this.listQuery.IPQA_TYPE) {
        this.editObj.id = 0
        this.editObj.ipqa_type = this.listQuery.IPQA_TYPE
        // console.log(this.listQuery.IPQA_TYPE)
        this.$emit('close')
        this.$nextTick(function () {
          this.Bus.emit('editObj', this.editObj)
        })
      } else {
        this.$message({
          showClose: true,
          message: this.$t('IpqaMst.IpqaMstList.inspectiontype'),
          type: 'warning'
        })
      }
    },
    // 编辑
    edit_but () {
      if (this.tableval.length === 0) {
        this.$message({
          showClose: true,
          message: this.$t('IpqaMst.IpqaMstList.editedlien'),
          type: 'warning'
        })
      } else {
        this.$emit('close')
        this.$nextTick(function () {
          this.Bus.emit('editObj', this.editObj)
        })
      }
    },
    // 审核
    review_but () {
      console.log(this.tableval, 'this.tableval')
      if (this.tableval.length === 0) {
        this.$message({
          showClose: true,
          message: this.$t('IpqaMst.IpqaMstList.recordreview'),
          type: 'warning'
        })
      } else {
        this.$confirm(this.$t('SOPRoutes._190'), this.$t('IpqaMst.IpqaMstList.prompt'), {
          confirmButtonText: this.$t('IpqaMst.IpqaMstList.confirm'),
          cancelButtonText: this.$t('IpqaMst.IpqaMstList.cancel'),
          type: 'warning'
        })
          .then(() => {
            this.checkBill.ID = this.tableval.ID
            this.checkBill.Operator = this.userinfo.USER_NAME
            CheckBill(this.checkBill)
              .then(response => {
                if (response.Result) {
                  this.getList()
                  this.$notify({
                    title: this.$t('IpqaMst.IpqaMstList.success'),
                    message: this.$t('IpqaMst.IpqaMstList.resucc'),
                    type: 'success',
                    duration: 2000
                  })
                }
              })
              .catch(res => {
                this.$message.error(this.$t('IpqaMst.IpqaMstList.auditfailure'))
              })
          })
          .catch(() => { })
      }
    },
    // 拒绝
    refuse_but () {
      if (this.tableval.length === 0) {
        this.$message({
          showClose: true,
          message: this.$t('IpqaMst.IpqaMstList.recordreject'),
          type: 'warning'
        })
      } else {
        this.$confirm(this.$t('IpqaMst.IpqaMstList.wantdecline'), this.$t('IpqaMst.IpqaMstList.prompt'), {
          confirmButtonText: this.$t('IpqaMst.IpqaMstList.confirm'),
          cancelButtonText: this.$t('IpqaMst.IpqaMstList.cancel'),
          type: 'warning'
        })
          .then(() => {
            this.checkBill.ID = this.tableval.ID
            this.checkBill.Operator = this.userinfo.USER_NAME
            RejectBill(this.checkBill)
              .then(response => {
                if (response.Result) {
                  this.getList()
                  this.$notify({
                    title: this.$t('IpqaMst.IpqaMstList.success'),
                    message: this.$t('IpqaMst.IpqaMstList.refusesucceed'),
                    type: 'success',
                    duration: 2000
                  })
                }
              })
              .catch(res => {
                this.$message.error(this.$t('IpqaMst.IpqaMstList.refusalfailed'))
              })
          })
          .catch(() => { })
      }
    },
    handleSizeChange (val) {
      this.listQuery.Limit = val
      this.getList()
    },
    handleCurrentChange (val) {
      this.listQuery.Page = val
      this.getList()
    }
  }
}
