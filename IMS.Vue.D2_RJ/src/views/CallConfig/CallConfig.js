
import {
  getIndex,
  LoadData,
  ChangeEnabled,
  DeleteOneById
} from '@/api/CallConfig'
import pagination from '@/views/mixin/page'
import customContainerHeader from '@/components/custom-container-header'
export default {
  name: 'CallConfig',
  mixins: [pagination],
  components: {
    customContainerHeader
  },
  data () {
    return {
      loading: false,
      LinesList: [],
      OperationsList: [],
      AndonCallTypeList: [],
      formData: {
        Page: 1, // 当前页
        Limit: 10, // 分页大小
        OPERATION_LINE_ID: '', // 线体
        OPERATION_SITE_ID: '', // 设备状态
        CALL_TYPE_CODE: '' // 类型
        // BEGIN_TIME: '',
        // END_TIME: ''
      },
      mainTable: [],
      editObj: {
        ID: ''
      },
      excite: {
        Id: null,
        Status: null
      }
    }
  },
  created () {
    this.getInd()
  },
  methods: {
    // 获取下拉列表
    async getInd () {
      const res = await getIndex()
      if (res.Result) {
        this.LinesList = res.Result.LinesList
        this.OperationsList = res.Result.OperationsList
        this.AndonCallTypeList = res.Result.AndonCallTypeList
        this.getLoadData()
      }
    },
    // 获取列表
    async getLoadData () {
      this.loading = true
      const res = await LoadData(this.formData)
      this.loading = false
      this.mainTable = res.Result ? JSON.parse(res.Result) : []
      this.totalPage = res.TotalCount || 0
    },
    // 搜索
    search_but () {
      this.formData.Page = 1
      this.getLoadData()
    },
    // 是否启动有效
    change: function (index, row) {
      console.log(row)
      this.excite.Id = row.ID
      if (row.ENABLED === 'Y') {
        this.excite.Status = true
      } else {
        this.excite.Status = false
      }
      this.$confirm(this.$t('CallConfig._15'), this.$t('CallConfig._16'), {
        confirmButtonText: this.$t('CallConfig._17'),
        cancelButtonText: this.$t('CallConfig._18'),
        type: 'warning'
      })
        .then(() => {
          ChangeEnabled(this.excite).then(response => {
            if (response.Result) {
              this.$notify({
                title: this.$t('CallConfig._19'),
                message: this.$t('CallConfig._20'),
                type: 'success',
                duration: 2000
              })
              this.getLoadData()
            } else {
              this.getLoadData()
            }
          })
        })
        .catch(() => {
          this.getLoadData()
        })
    },
    // 编辑
    edit_but (row) {
      console.log(row)
      this.$emit('close')
      this.$nextTick(function () {
        this.Bus.emit('id', row.ID)
      })
    },
    // 删除
    remove_but (row) {
      this.$confirm(this.$t('CallConfig._21'), this.$t('CallConfig._16'), {
        confirmButtonText: this.$t('CallConfig._17'),
        cancelButtonText: this.$t('CallConfig._18'),
        type: 'warning'
      })
        .then(async () => {
          DeleteOneById(row.ID).then(response => {
            if (response.Result) {
              this.$notify({
                title: this.$t('CallConfig._19'),
                message: this.$t('CallConfig._20'),
                type: 'success',
                duration: 2000
              })
              this.getLoadData()
            } else {
              this.getLoadData()
            }
          })
        })
        .catch(() => {})
    },
    // 添加
    add_but () {
      this.$emit('close')
    }
  }
}
