// import pagination from '@/views/mixin/page'
// import helper from '@/api/Helper'
import customContainerHeader from '@/components/custom-container-header'
import {
  mapGetters
} from 'vuex'
import {
  delet, GetIpqaConfigIsByUsed, getlist,
  savedata
} from '../../../api/IpqaConfig'
export default {
  name: 'AddOrModify',
  // mixins: [pagination],
  components: {
    customContainerHeader
  },
  data () {
    return {
      loading: false,
      sexList: [
        // {
        //   label: "",
        //   value: "",
        //   disabled: false
        // },
        {
          label: this.$t('IpqaConfig.AddOrModify.available'),
          value: '1',
          disabled: false
        },
        {
          label: this.$t('IpqaConfig.AddOrModify.disable'),
          value: '0',
          disabled: false
        }
      ],
      formData: {
        Page: 1, // 当前页
        Limit: 10, // 分页大小
        Key: '', // 搜索关键字
        IPQA_TYPE: ''
      },
      totalPage: null,
      // 保存
      saveArr: {
        IPQA_TYPE: '',
        UserName: '',
        insertRecords: [],
        updateRecords: [],
        removeRecords: []
      },
      insertRecords: [],
      tableData: [],
      ipqa_type: '1',
      typeList: [{
        label: '',
        value: '',
        disabled: false
      }, {
        label: this.$t('IpqaConfig.AddOrModify.people'),
        value: this.$t('IpqaConfig.AddOrModify.people'),
        disabled: false
      }, {
        label: this.$t('IpqaConfig.AddOrModify.machine'),
        value: this.$t('IpqaConfig.AddOrModify.machine'),
        disabled: false
      }, {
        label: this.$t('IpqaConfig.AddOrModify.material'),
        value: this.$t('IpqaConfig.AddOrModify.material'),
        disabled: false
      }, {
        label: this.$t('IpqaConfig.AddOrModify.law'),
        value: this.$t('IpqaConfig.AddOrModify.law'),
        disabled: false
      }, {
        label: this.$t('IpqaConfig.AddOrModify.ring'),
        value: this.$t('IpqaConfig.AddOrModify.ring'),
        disabled: false
      }],
      quantizeList: [{
        label: this.$t('IpqaConfig.AddOrModify.noquan'),
        value: 0,
        disabled: false
      }, {
        label: this.$t('IpqaConfig.AddOrModify.Quantified'),
        value: 1,
        disabled: false
      }],
      enabledList: [{
        label: this.$t('IpqaConfig.AddOrModify.available'),
        value: 1,
        disabled: false
      }, {
        label: this.$t('IpqaConfig.AddOrModify.disable'),
        value: 0,
        disabled: false
      }],
      validRules: {
        ORDER_ID: [{
          required: true,
          message: this.$t('IpqaConfig.AddOrModify.mustsort')
        }],
        CATEGORY: [{
          required: true,
          message: this.$t('IpqaConfig.AddOrModify.mustclass')
        }],
        ITEM_NAME: [{
          required: true,
          message: this.$t('IpqaConfig.AddOrModify.mustInspection')
        }],
        PROCESS_REQUIRE: [{
          required: true,
          message: this.$t('IpqaConfig.AddOrModify.mustcontent')
        }],
        REFERENCE_STANDARD: [{
          required: true,
          message: this.$t('IpqaConfig.AddOrModify.mustrefer')
        }]
        // trigger: "change",
      },
      filterName: '' // 搜索
    }
  },
  computed: {
    ...mapGetters(['userinfo'])
  },
  created () {
    this.saveArr.UserName = this.userinfo.USER_NAME
    // this.formData.IPQA_TYPE = this.$store.getters.sortType
    // this.saveArr.IPQA_TYPE = this.$store.getters.sortType
    // this.getList()
    // this.ipqa_type = this.$store.getters.sortType
  },

  mounted () {
    // this.$nextTick(() => {
    this.Bus.on('close', val => {
      console.log(val, 'valvalval')
      this.saveArr.UserName = this.userinfo.USER_NAME
      this.formData.IPQA_TYPE = val
      this.saveArr.IPQA_TYPE = val
      this.ipqa_type = val
      this.getList()
      if (val === '0') {
        this.$refs.xTable.getColumnByField('CATEGORY').visible = false
        this.$refs.xTable.getColumnByField('REFERENCE_STANDARD').visible = false
        this.$refs.xTable.getColumnByField('QUANTIZE_TYPE').visible = false
        this.$refs.xTable.getColumnByField('QUANTIZE_VAL').visible = false
        this.$refs.xTable.refreshColumn()
      }
    })
    // })
  },
  methods: {
    // 获取列表
    async getList () {
      this.loading = true
      const res = await getlist(this.formData)
      this.loading = false
      this.tableData = res.Result ? JSON.parse(res.Result) : []
      this.totalPage = res.TotalCount || 0
    },
    handleSizeChange (val) {
      this.formData.Limit = val
      this.getList()
    },
    handleCurrentChange (val) {
      this.formData.Page = val
      this.getList()
    },
    // 新增
    async insertEvent (row) {
      // debugger
      const index = this.$refs.xTable.getTableData().fullData.length

      var type0 = {
        ID: 0,
        ORDER_ID: index + 1,
        CATEGORY: '-',
        IPQA_TYPE: this.ipqa_type,
        ITEM_NAME: '',
        PROCESS_REQUIRE: '',
        QUANTIZE_TYPE: 0,
        QUANTIZE_VAL: null,
        ENABLED: 1,
        CREATOR: this.userinfo.USER_NAME
      }
      var type1 = {
        ID: 0,
        ORDER_ID: index + 1,
        CATEGORY: '',
        IPQA_TYPE: this.ipqa_type,
        ITEM_NAME: '',
        PROCESS_REQUIRE: '',
        REFERENCE_STANDARD: '',
        QUANTIZE_TYPE: 0,
        QUANTIZE_VAL: null,
        ENABLED: 1,
        CREATOR: this.userinfo.USER_NAME
      }
      var record = {}
      if (this.ipqa_type === '0') {
        record = type0
      } else {
        record = type1
      }
      // 从最后插入
      this.$refs.xTable.insertAt(record, row).then(({ row }) => {
        this.$refs.xTable.setActiveRow(row)
      })
    },
    // 保存
    getInsertEvent () {
      var postdata = this.$refs.xTable.getRecordset()
      console.log(postdata)
      if (postdata.insertRecords.length || postdata.removeRecords.length || postdata.updateRecords.length) {
        this.$refs.xTable.validate(valid => {
          if (valid) {
            this.saveArr.insertRecords = postdata.insertRecords
            this.saveArr.updateRecords = postdata.updateRecords
            this.saveArr.removeRecords = postdata.removeRecords
            savedata(this.saveArr).then(response => {
              if (response.Result) {
                this.saveArr = {}
                this.getList()
                this.$notify({
                  title: this.$t('IpqaConfig.AddOrModify.success'),
                  message: this.$t('IpqaConfig.AddOrModify.savedsus'),
                  type: 'success',
                  duration: 2000
                })
              }
            })
          }
        })
      } else {
        this.$message({
          showClose: true,
          message: this.$t('IpqaConfig.AddOrModify.noUpdateData'),
          type: 'warning'
        })
      }
    },
    // 删除
    remove_but () {
      var currow = this.$refs.xTable.getRadioRecord()
      console.log(currow)
      if (currow) {
        this.$confirm(this.$t('IpqaConfig.AddOrModify.fidelete'), this.$t('IpqaConfig.AddOrModify.prompt'), {
          confirmButtonText: this.$t('IpqaConfig.AddOrModify.confirm'),
          cancelButtonText: this.$t('IpqaConfig.AddOrModify.cancel'),
          type: 'warning'
        })
          .then(async () => {
            if (currow.ID === 0) {
              this.$refs.xTable.remove(currow)
            } else {
              var result = await GetIpqaConfigIsByUsed(currow.ID)
              if (result.Result !== void (0)) {
                if (result.Result) {
                  this.$message({
                    showClose: true,
                    message: this.$t('IpqaConfig.AddOrModify.cant'),
                    type: 'warning'
                  })
                } else {
                  delet(currow.ID).then(response => {
                    if (response.Result) {
                      this.getList()
                      this.$notify({
                        title: this.$t('IpqaConfig.AddOrModify.success'),
                        message: this.$t('IpqaConfig.AddOrModify.sudeleted'),
                        type: 'success',
                        duration: 2000
                      })
                      this.$refs.xTable.remove(currow)
                    }
                  })
                }
              }
            }
          })
      } else {
        this.$message({
          showClose: true,
          message: this.$t('IpqaConfig.AddOrModify.pleaseChoose'),
          type: 'warning'
        })
      }
    },
    // 返回
    Return_but () {
      this.$confirm(
        this.$t('IpqaConfig.AddOrModify.determineback'),
        this.$t('IpqaConfig.AddOrModify.prompt'), {
        confirmButtonText: this.$t('IpqaConfig.AddOrModify.determine'),
        cancelButtonText: this.$t('IpqaConfig.AddOrModify.cancel'),
        type: 'warning'
      }
      ).then(() => {
        this.$emit('close')
      })
    },
    quantizeChangeEvent ({
      row
    }, evnt) {
      // 由于重写了内部的 model 事件，所以需要自行处理赋值相关的逻辑
      // 数据类型要一致
      row.QUANTIZE_TYPE = Number(evnt.target.value)
    },
    enabledChangeEvent ({
      row
    }, evnt) {
      // 由于重写了内部的 model 事件，所以需要自行处理赋值相关的逻辑
      // 数据类型要一致
      row.ENABLED = Number(evnt.target.value)
    }
  }
}
