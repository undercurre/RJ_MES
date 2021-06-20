import { ExportData, getlist } from '@/api/IpqaConfig'
// import helper from '@/api/Helper'
import customContainerHeader from '@/components/custom-container-header'
import pagination from '@/views/mixin/page'
export default {
  name: 'InspectionList',
  mixins: [pagination],
  components: {
    customContainerHeader
  },
  data () {
    return {
      typeOptions: [{
        key: '0',
        display_name: this.$t('IpqaConfig.InspectionList.smt')
      },
      {
        key: '1',
        display_name: this.$t('IpqaConfig.InspectionList.yield')
      }
      ],
      listLoading: false, // 分页加载
      listQuery: {
        Page: 1, // 当前页
        Limit: 15, // 分页大小
        Key: '', // 搜索关键字
        IPQA_TYPE: ''
      },
      total: null, // 总页数
      inspectionList: []
    }
  },
  created () {
    this.getList()
  },
  methods: {
    // 获取列表
    async getList () {
      this.listLoading = true
      const res = await getlist(this.listQuery)
      const data = JSON.parse(res.Result)
      this.inspectionList = data
      this.total = res.TotalCount
      this.listLoading = false
    },
    async exportData () {
      this.listLoading = true
      const res = await ExportData(this.listQuery)
      this.listLoading = false
      this.inspectionList = res.Result || []
      this.total = res.TotalCount || 0
    },
    // 搜索
    searchClick () {
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
    // 修改配置
    modifyClick () {
      if (this.listQuery.IPQA_TYPE === undefined || this.listQuery.IPQA_TYPE === '') {
        this.$message({
          showClose: true,
          message: this.$t('IpqaConfig.InspectionList.select'),
          type: 'warning'
        })
      } else {
        // 调父页面方法
        // this.$store.dispatch('else/sorTType', this.listQuery.IPQA_TYPE)
        this.$emit('close')
        this.$nextTick(function () {
          this.Bus.emit('close', this.listQuery.IPQA_TYPE)
        })
      }
    }
  }
}
