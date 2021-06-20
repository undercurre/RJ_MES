import {
  AddOrModifList,
  getIpqaConfig,

  GetWoList,
  LoadDtlData,
  PostToCheck, savedata
} from '@/api/ipqaMst'
import customContainer from '@/components/custom-container'
import customContainerHeader from '@/components/custom-container-header'
import { mapGetters } from 'vuex'
export default {
  components: {
    customContainer, customContainerHeader
  },
  data () {
    return {
      listQuery: {
        id: '',
        ipqa_type: ''
      },
      tableData: [],
      typeList: [{
        label: '',
        value: '',
        disabled: false
      }, {
        label: this.$t('IpqaMst.AddOrModify.people'),
        value: this.$t('IpqaMst.AddOrModify.people'),
        disabled: false
      }, {
        label: this.$t('IpqaMst.AddOrModify.machine'),
        value: this.$t('IpqaMst.AddOrModify.machine'),
        disabled: false
      }, {
        label: this.$t('IpqaMst.AddOrModify.material'),
        value: this.$t('IpqaMst.AddOrModify.material'),
        disabled: false
      }, {
        label: this.$t('IpqaMst.AddOrModify.law'),
        value: this.$t('IpqaMst.AddOrModify.law'),
        disabled: false
      }, {
        label: this.$t('IpqaMst.AddOrModify.ring'),
        value: this.$t('IpqaMst.AddOrModify.ring'),
        disabled: false
      }],
      ipqa_type: null,
      check_status: '4',
      validRules: {
        IPQA_RESULT: [{
          required: true,
          message: this.$t('IpqaMst.AddOrModify.befilled')
        }]
      },

      options: [],
      line: [],
      GetDepartmentList: [],
      DepartmentList: [],
      banStatus: false,
      value: '',
      form: {
        ID: '', // 主键
        BUSINESS_UNIT: '', // 经营
        DEPARTMENT: '', // 部门
        U_LINE: '', // 线别
        PRODUCT_NAME: '', // 产品名称
        PRODUCT_MODEL: '', // 产品型号
        PRODUCT_BILLNO: '', // 生产单号:
        PRODUCT_QTY: '', // 生产数量:
        CREATETIME: '', // 巡检时间
        BILL_CODE: '', // 单  号
        IPQA_TYPE: '', // 巡检分类
        insertRecords: [],
        updateRecords: [],
        CREATEDATE: '', //  开始日期
        PRODUCT_DATE: '', //  生产日期

        CREATOR: '', // 创作者
        CHECK_STATUS: '', // 检查状态
        UserName: '' // 用户名
      },
      IPQA_TYPE_Sele: '',
      // 弹窗表格
      gridData: [],
      dialogTableVisible: false,
      radio: '',
      gridQuery: {
        Page: 1, // 当前页
        Limit: 10, // 分页大小
        Key: '' // 搜索关键字
      },
      gridtotal: 0,
      orderArr: [],
      // 提交审核
      submit: {
        ID: null,
        Operator: null
      }
    }
  },
  mounted () {
    this.Bus.on('editObj', val => {
      console.log(val)
      this.listQuery.id = val.id
      this.listQuery.ipqa_type = val.ipqa_type
      this.ipqa_type = val.ipqa_type
      this.form.ID = val.id
      this.getAddRrList()
      this.getWoList()
      this.getLoadDtlData()
      console.log('========== ', this.ipqa_type)
    })

    //     this.$nextTick(()=>{
    //     this.$refs.wechatBind.reloadWxLogin();
    // });
    this.$nextTick(function () {
      if (this.ipqa_type === '0') {
        this.$refs.xTable.getColumnByField('CATEGORY').visible = false
        this.$refs.xTable.getColumnByField('REFERENCE_STANDARD').visible = false
        this.$refs.xTable.getColumnByField('QUANTIZE_TYPE_CAPTION').visible = false
        this.$refs.xTable.getColumnByField('QUANTIZE_VAL').visible = false
        this.$refs.xTable.refreshColumn()
      }
    })
    setTimeout(this.adddetail(this), 200)
  },
  // eslint-disable-next-line vue/order-in-components
  computed: {
    ...mapGetters(['userinfo'])
  },
  created () {
    this.form.UserName = this.userinfo.USER_NAME
    this.Bus.on('editObj', val => {
      console.log(val)
      this.listQuery.id = val.id
      this.listQuery.ipqa_type = val.ipqa_type
      this.ipqa_type = val.ipqa_type
      this.form.ID = val.id
    })
  },
  methods: {
    // 获取下拉菜单和编辑的值
    async getAddRrList () {
      const response = await AddOrModifList(this.listQuery)
      const data = response.Result
      this.check_status = data.CHECK_STATUS
      console.log(data, '获取下拉菜单和编辑的值')
      this.options = data.BusinessUnitsList
      this.line = data.LineList
      this.GetDepartmentList = data.DepartmentList
      this.DepartmentList = data.DepartmentList
      this.form.ID = data.ID
      this.form.CHECK_STATUS = data.CHECK_STATUS
      this.form.PRODUCT_NAME = data.PRODUCT_NAME
      this.form.PRODUCT_MODEL = data.PRODUCT_MODEL
      this.form.PRODUCT_DATE = data.PRODUCT_DATE
      this.form.PRODUCT_BILLNO = data.PRODUCT_BILLNO
      this.form.CREATOR = data.CREATOR
      this.form.IPQA_TYPE = data.IPQA_TYPE

      this.form.BILL_CODE = data.BILL_CODE
      if (data.CREATEDATE) {
        this.form.CREATEDATE = data.CREATEDATE
      } else {
        var day2 = new Date()
        day2.setTime(day2.getTime())
        this.form.CREATEDATE = day2.getFullYear() + '-' + (day2.getMonth() + 1) + '-' + day2.getDate()
      }
      this.form.CREATETIME = data.CREATETIME
      if (data.PRODUCT_QTY) {
        this.form.PRODUCT_QTY = data.PRODUCT_QTY
      }
      if (data.DEPARTMENT_ID) {
        this.form.DEPARTMENT = data.DEPARTMENT_ID
      }
      if (data.BUSINESS_UNIT_ID) {
        this.form.BUSINESS_UNIT = data.BUSINESS_UNIT_ID
      }
      if (data.U_LINE_ID) {
        this.form.U_LINE = data.U_LINE_ID
      }
      if (data.ID === 0) {
        this.form.CREATOR = this.userinfo.USER_NAME
      }
    },
    // 获取查询明细数据
    getLoadDtlData () {
      console.log(this.listQuery.id, 'this.listQuery.id')
      LoadDtlData(this.listQuery.id).then(response => {
        // console.log(response, '获取查询明细数据')
        const data = JSON.parse(response.Result)
        console.log(data)
        if (data != null && data.length === 0) {
          // this.getConfig()
        } else {
          this.tableData = data
          if (this.ipqa_type === '0') {
            this.IPQA_TYPE_Sele = this.$t('IpqaMst.AddOrModify.smt')
          } else {
            this.IPQA_TYPE_Sele = this.$t('IpqaMst.AddOrModify.yield')
          }
        }
      })
    },
    // 过滤部门
    business_but (val) {
      this.GetDepartmentList = []
      this.DepartmentList.forEach(v => {
        if (v.SBU_ID !== val) {
          this.GetDepartmentList = []
          this.form.DEPARTMENT = ''
        } else {
          this.GetDepartmentList.push(v)
        }
      })
    },
    // 获取表格配置
    getConfig (vm) {
      getIpqaConfig(vm.listQuery).then(response => {
        // debugger
        const ipqaConfig = JSON.parse(response.Result)
        if (ipqaConfig != null && ipqaConfig.length > 0) {
          // eslint-disable-next-line camelcase
          const mst_id = vm.listQuery.id
          ipqaConfig.forEach(function (item) {
            const record = {
              ID: 0,
              ORDER_ID: item.ORDER_ID,
              MST_ID: mst_id,
              IPQA_CONFIG_ID: item.ID,
              CATEGORY: item.CATEGORY,
              ITEM_NAME: item.ITEM_NAME,
              PROCESS_REQUIRE: item.PROCESS_REQUIRE,
              REFERENCE_STANDARD: item.REFERENCE_STANDARD,
              QUANTIZE_TYPE: item.QUANTIZE_TYPE,
              QUANTIZE_TYPE_CAPTION: item.QUANTIZE_TYPE_CAPTION,
              QUANTIZE_VAL: item.QUANTIZE_VAL,
              IPQA_RESULT: null,
              IPQA_EXPLAIN: null
            }
            // 从最后插入
            vm.$refs.xTable.insertAt(record, -1)
          })
        }
        console.log(ipqaConfig, '获取表格配置')
      })
    },
    adddetail (vm) {
      // debugger
      if (this.tableData == null || this.tableData.length === 0) {
        this.getConfig(vm)
      }
    },
    // 获取工单列表
    async getWoList () {
      const response = await GetWoList(this.gridQuery)
      const data = JSON.parse(response.Result)
      // console.log(data, 'data')
      this.gridData = data
      this.gridtotal = response.TotalCount
      // console.log(this.gridData, 'datadata')
    },
    // 保存
    savedata_but () {
      var that = this
      var postdata = this.$refs.xTable.getRecordset()
      console.log(this.$refs.xTable)
      console.log(this.$refs.xTable.getRecordset())
      if (postdata.insertRecords.length || postdata.removeRecords.length || postdata.updateRecords.length) {
        this.$refs.xTable.validate(valid => {
          console.log(valid)
          if (valid) {
            this.form.insertRecords = postdata.insertRecords
            this.form.updateRecords = postdata.updateRecords
            if (this.form.BUSINESS_UNIT === '') {
              this.$message({
                showClose: true,
                message: this.$t('IpqaMst.AddOrModify.busunit'),
                type: 'warning'
              })
              return
            }
            if (this.form.DEPARTMENT === '') {
              this.$message({
                showClose: true,
                message: this.$t('IpqaMst.AddOrModify.department'),
                type: 'warning'
              })
              return
            }
            if (this.form.U_LINE === '') {
              this.$message({
                showClose: true,
                message: this.$t('IpqaMst.AddOrModify.selectlin'),
                type: 'warning'
              })
              return
            }

            if (this.form.CREATETIME === '' || this.form.CREATETIME === null) {
              this.$message({
                showClose: true,
                message: this.$t('IpqaMst.AddOrModify.selectime'),
                type: 'warning'
              })
              return
            }
            if (this.form.PRODUCT_NAME == null || this.form.PRODUCT_NAME.length === 0) {
              this.$message({
                showClose: true,
                message: this.$t('IpqaMst.AddOrModify.goodsname'),
                type: 'warning'
              })
              return
            }
            savedata(this.form).then(response => {
              if (response.Result) {
                // that.getLoadDtlData()
                this.form = {}
                that.$notify({
                  title: this.$t('IpqaMst.AddOrModify.success'),
                  message: this.$t('IpqaMst.AddOrModify.savedsus'),
                  type: 'success',
                  duration: 2000
                })
                this.$emit('close')
              }
            })
          }
        })
      } else {
        this.$message({
          showClose: true,
          message: this.$t('ssn._14'),
          type: 'warning'
        })
      }
    },
    // 提交审核
    submit_but () {
      this.submit.ID = this.listQuery.id
      this.submit.Operator = this.form.UserName
      if (this.submit.ID <= 0) {
        this.$message({
          showClose: true,
          message: this.$t('IpqaMst.AddOrModify.datafirst'),
          type: 'warning'
        })
      } else {
        this.$confirm(this.$t('IpqaMst.AddOrModify._1'), this.$t('IpqaMst.IpqaMstList.prompt'), {
          confirmButtonText: this.$t('IpqaMst.IpqaMstList.confirm'),
          cancelButtonText: this.$t('IpqaMst.IpqaMstList.cancel'),
          type: 'warning'
        })
          .then(() => {
            PostToCheck(this.submit).then(response => {
              if (response.Result) {
                this.$emit('close')
                this.$notify({
                  title: this.$t('IpqaMst.AddOrModify.success'),
                  message: this.$t('IpqaMst.AddOrModify.reviewsuc'),
                  type: 'success',
                  duration: 2000
                })
              }
            })
          })
          .catch(() => { })
      }
    },
    // 返回
    backtrack () {
      this.$confirm(this.$t('IpqaMst.AddOrModify.wantreturn'), this.$t('IpqaMst.AddOrModify.prompt'), {
        confirmButtonText: this.$t('IpqaMst.AddOrModify.determine'),
        cancelButtonText: this.$t('IpqaMst.AddOrModify.cancel'),
        type: 'warning'
      }).then(() => {
        this.$emit('close')
      })
    },

    handleSizeChange (val) {
      this.gridQuery.Limit = val
      this.getWoList()
    },
    handleCurrentChange (val) {
      this.gridQuery.Page = val
      this.getWoList()
    },
    // 点击获取表格一行数据
    openDetails (row, column, event) {
      this.orderArr = row
      this.radio = this.gridData.indexOf(row)
    },
    // 搜索
    search_but () {
      this.getWoList()
    },
    // 确认
    confirm_but () {
      if (this.orderArr.length !== 0) {
        console.log(this.orderArr)
        this.form.PRODUCT_BILLNO = this.orderArr.WO_NO
        this.form.PRODUCT_NAME = this.orderArr.PRODUCT_NAME
        this.form.PRODUCT_MODEL = this.orderArr.MODEL
        this.form.PRODUCT_QTY = this.orderArr.TARGET_QTY
        this.form.PRODUCT_DATE = this.orderArr.START_DATE
        // this.form.PRODUCT_DATE = START_DATE
        if (this.ipqa_type === '0') {
          this.IPQA_TYPE_Sele = this.$t('IpqaMst.AddOrModify.smt')
        } else {
          this.IPQA_TYPE_Sele = this.$t('IpqaMst.AddOrModify.yield')
        }
        this.dialogTableVisible = false
      } else {
        this.$message({
          showClose: true,
          message: this.$t('IpqaMst.AddOrModify.order'),
          type: 'warning'
        })
      }
    }
  }
}
