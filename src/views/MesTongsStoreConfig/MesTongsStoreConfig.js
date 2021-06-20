import helper from '@/api/MesTongsStoreConfig'
import pagination from '@/views/mixin/page'
import customContainerHeader from '@/components/custom-container-header'
import { mapGetters } from 'vuex'
const API = helper('MesTongsStoreConfig')
export default {
  name: 'MesTongsStoreConfig',
  mixins: [pagination],
  components: {
    customContainerHeader
  },
  data () {
    return {
      listQuery: {
        CODE: '',
        NAME: '',
        Page: 1,
        Limit: 10
      },
      listLoading: false,
      mainTable: [],
      total: 0,
      addorediText: '',
      innerVisible: false,
      formData: {
        ID: '',
        CODE: '',
        NAME: '',
        REMARK: '',
        ENABLED: 'Y'
      },
      rules: {
        CODE: [
          { required: true, message: this.$t('mtsc._16'), trigger: 'blur' }
        ],
        NAME: [
          { required: true, message: this.$t('mtsc._18'), trigger: 'blur' }
        ]
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
    this.getListData()
    this.effect.Operator = this.userinfo.USER_NAME
  },
  methods: {
    async getListData () {
      this.listLoading = true
      const res = await API.LoadData(this.listQuery)
      const data = JSON.parse(res.Result)
      this.mainTable = data
      this.total = res.TotalCount
      this.listLoading = false
    },

    handleSizeChange (val) {
      this.listQuery.Limit = val
      this.getListData()
    },
    handleCurrentChange (val) {
      this.listQuery.Page = val
      this.getListData()
    },
    search_but () {
      this.getListData()
    },
    // 添加
    add_but () {
      this.clear()
      this.addorediText = this.$t('mtsc._27')
      this.innerVisible = true
    },
    // 编辑
    edit_but (row) {
      console.log(row)
      this.formData.ID = row.ID
      this.formData.CODE = row.CODE
      this.formData.NAME = row.NAME
      this.formData.REMARK = row.REMARK
      this.formData.ENABLED = row.ENABLED
      this.addorediText = this.$t('mtsc._28')
      this.innerVisible = true
    },
    // 确定
    shout_but (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          API.AddOrModifySave(this.formData)
            .then(response => {
              if (response.Result) {
                this.$notify({
                  title: this.$t('mtsc._29'),
                  message: this.$t('mtsc._30'),
                  type: 'success',
                  duration: 2000
                })
              }
              this.innerVisible = false
              this.getListData()
            })
            .catch(() => {})
        } else {
          return false
        }
      })
    },
    clear () {
      this.formData = {
        ID: 0,
        CODE: '',
        NAME: '',
        REMARK: '',
        ENABLED: 'N'
      }
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
      this.$confirm(this.$t('mtsc._31'), this.$t('mtsc._32'),
        {
          confirmButtonText: this.$t('mtsc._33'),
          cancelButtonText: this.$t('mtsc._34'),
          type: 'warning'
        })
        .then(() => {
          API.ChangeEnabled(this.effect).then(response => {
            if (response.Result) {
              this.getListData()
              this.$message({
                type: 'success',
                message: this.$t('mtsc._35')
              })
            }
          })
            .catch(() => {
              this.getListData()
            })
        })
        .catch(() => {
          this.getListData()
        })
    },
    del_but (row) {
      this.$confirm(this.$t('mtsc._36'), this.$t('mtsc._32'), {
        type: 'warning'
      })
        .then(() => {
          API.DeleteOneById(row.ID).then(res => {
            if (res.Result) {
              this.getListData()
              this.$notify({
                title: this.$t('mtsc._29'),
                message: this.$t('mtsc._37'),
                type: 'success',
                duration: 2000
              })
            }
          })
        })
    },

    reset_but () {
      this.formData.CODE = ''
      this.formData.NAME = ''
      this.formData.REMARK = ''
      this.formData.ENABLED = ''
    }
  }
}
