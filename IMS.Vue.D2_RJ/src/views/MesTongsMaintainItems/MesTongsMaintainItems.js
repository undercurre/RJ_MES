import { GetTongsTypeList } from '@/api/MesTongsApply'
import helper from '@/api/MesTongsMaintainItems'
import customContainerHeader from '@/components/custom-container-header'
import pagination from '@/views/mixin/page'
import {
  mapGetters
} from 'vuex'
const API = helper('MesTongsMaintainItems')
export default {
  name: 'MesTongsMaintainItems',
  components: { customContainerHeader },
  mixins: [pagination],
  data () {
    return {
      typeList: [
        {
          id: 0,
          label: this.$t('mtm._39')
        },
        {
          id: 1,
          label: this.$t('mtm._40')
        }
      ],
      fixture: [
        // {
        //   LOOKUP_CODE: -1,
        //   CHINESE: this.$t('mtm._41')
        // },
        // {
        //   LOOKUP_CODE: 0,
        //   CHINESE: this.$t('mtm._42')
        // }, {
        //   LOOKUP_CODE: 1,
        //   CHINESE: this.$t('mtm._43')
        // }, {
        //   LOOKUP_CODE: 2,
        //   CHINESE: this.$t('mtm._43')
        // }
      ],
      typeListIndex: 0,
      listQuery: {
        ITEM_TYPE: '',
        TONGS_TYPE: '',
        ITEM_NAME: '',
        REMARK: '',
        Page: 1,
        Limit: 15
      },
      listLoading: false,
      mainTable: [],
      total: 0,
      addorediText: '',
      formData: {
        ID: 0,
        ITEM_TYPE: 0,
        ITEM_NAME: '',
        REMARK: '',
        ENABLED: 'Y',
        CREATE_USER: '',
        UPDATE_USER: ''
      },
      rules: {
        ITEM_NAME: [
          { required: true, message: this.$t('mtm._33'), trigger: 'blur' }
        ],
        TONGS_TYPE: [
          { required: true, message: this.$t('mtm._45'), trigger: 'blur' }
        ]
      },
      innerVisible: false,
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
    this.getLoadData()
    this.getTongsTypeList()
    this.effect.Operator = this.userinfo.USER_NAME
    this.formData.CREATE_USER = this.userinfo.USER_NAME
    this.formData.UPDATE_USER = this.userinfo.USER_NAME
  },
  methods: {
    changefixture (e) {
      this.$forceUpdate()
    },
    // 获取夹具类别
    async getTongsTypeList () {
      const res = await GetTongsTypeList()
      this.fixture = res.Result ? res.Result : []
    },
    async getLoadData () {
      this.listLoading = true
      const res = await API.LoadData(this.listQuery)
      if (res.Result) {
        const data = JSON.parse(res.Result)
        console.log(data, '获取表格')
        this.mainTable = data
        this.total = res.TotalCount
      }
      this.listLoading = false
    },
    handleSizeChange (val) {
      this.listQuery.Limit = val
      this.getLoadData()
    },
    handleCurrentChange (val) {
      this.listQuery.Page = val
      this.getLoadData()
    },
    edit_but (row) {
      console.log(row)
      this.formData.ID = row.ID
      this.formData.ITEM_TYPE = row.ITEM_TYPE
      this.formData.ITEM_NAME = row.ITEM_NAME
      this.formData.REMARK = row.REMARK
      this.formData.ENABLED = row.ENABLED
      this.formData.TONGS_TYPE = row.TONGS_TYPE
      this.addorediText = this.$t('mtm._46')
      this.innerVisible = true
    },
    del_but (row) {
      console.log(row.ITEM_NAME)
      this.$confirm(this.$t('mtm._47') + row.ITEM_NAME + this.$t('mtm._48'), this.$t('mtm._49'), {
        type: 'warning'
      })
        .then(() => {
          API.DeleteOneById(row.ID).then(res => {
            if (res.ResultCode !== 0) {
              this.$message({
                type: 'error',
                message: res.ErrorInfo.Message
              })
            } else {
              this.getLoadData()
              this.$notify({
                title: this.$t('mtm._50'),
                message: this.$t('mtm._51'),
                type: 'success',
                duration: 2000
              })
            }
          })
            .catch(res => {
              this.$message.error(this.$t('mtm._52'))
            })
        })
        .catch(() => {
        })
    },
    add_but () {
      this.clear()
      this.addorediText = this.$t('mtm._53')
      this.innerVisible = true
    },
    search_but () {
      this.listQuery.Page = 1
      this.getLoadData()
    },
    shout_but () {
      this.$refs.callVal.validate(async (valid, errInfo) => {
        if (valid) {
          API.AddOrModifySave(this.formData)
            .then(response => {
              if (response.Result) {
                this.$notify({
                  title: this.$t('mtm._50'),
                  message: this.$t('mtm._51'),
                  type: 'success',
                  duration: 2000
                })
              }
              this.innerVisible = false
              this.getLoadData()
            })
            .catch(() => { })
        } else {
          try {
            Object.keys(errInfo).forEach(item => {
              this.$message.error(errInfo[item][0].message)
              throw new Error(new Date().toLocaleString())
            })
          } catch { }
        }
      })
    },
    // 是否有效
    change (index, row) {
      console.log(row)
      if (row.ENABLED === 'Y') {
        this.effect.Status = true
      } else {
        this.effect.Status = false
      }
      this.effect.Id = row.ID
      this.$confirm(this.$t('mtm._54'), this.$t('mtm._49'),
        {
          confirmButtonText: this.$t('mtm._37'),
          cancelButtonText: this.$t('mtm._55'),
          type: 'warning'
        })
        .then(() => {
          API.ChangeEnabled(this.effect).then(response => {
            if (response.Result) {
              this.$message({
                type: 'success',
                message: this.$t('mtm._56')
              })
            }
            this.getLoadData()
          })
            .catch(() => {
              this.getLoadData()
            })
        })
        .catch(() => {
          this.getLoadData()
        })
    },
    reset_but () {
      this.formData.ITEM_NAME = ''
      this.formData.REMARK = ''
      this.formData.ENABLED = ''
      this.formData.TONGS_TYPE = ''
    },
    clear () {
      this.formData = {
        ID: 0,
        ITEM_TYPE: 0,
        ITEM_NAME: '',
        TONGS_TYPE: '',
        CREATE_USER: this.userinfo.USER_NAME,
        REMARK: '',
        ENABLED: 'Y'
      }
    }
  }
}
