import customContainerHeader from '@/components/custom-container-header'
import {
  GetCancelReportData,
  CancelReport
} from '@/api/ProduceReporter'
import XEUtils from 'xe-utils'
import {
  mapGetters
} from 'vuex'
import { debounce } from 'throttle-debounce'
export default {
  name: 'ProduceReporter',
  components: {
    customContainerHeader
  },
  computed: {
    ...mapGetters([
      'username'
    ])
  },
  data () {
    return {
      formData: {
        so_order: '',
        wo_no: '',
        carton_no: '',
        Page: 1,
        Limit: 100
      },
      loading: false,
      mainTable: [],
      TotalCount: 0,
      mergeCells: []
    }
  },
  methods: {
    searchClick () {
      this.formData.Page = 1
      this.getCancelReportData()
    },
    // 点击行方法
    cellClick (e) {
      this.$refs.xTable.setCheckboxRow(e.row, this.$refs.xTable.isCheckedByCheckboxRow(e.row))
      // const { row } = e
      // const res = this.$refs.xTable.isCheckedByCheckboxRow(row)
      // // 判断是否有其他选中
      // const ORDER_NO = row.ORDER_NO
      // const checkeds = this.$refs.xTable.getCheckboxRecords()
      // let count = 0
      // checkeds.map(j => {
      //   if (j.ORDER_NO === ORDER_NO) {
      //     count++
      //   }
      // })
      // if (res && count === 1) {
      //   // 全选
      //   const rows = []
      //   this.mainTable.map(i => {
      //     if (i.ORDER_NO === ORDER_NO) {
      //       rows.push(i)
      //     }
      //   })
      //   this.$refs.xTable.setCheckboxRow(rows, true)
      // }
    },
    async getCancelReportData () {
      this.loading = true
      const res = await GetCancelReportData(this.formData).catch(_ => {
        this.loading = false
      })
      this.loading = false
      if (res.Code === 1) {
        this.mainTable = res.Data || []
        this.TotalCount = res.TotalCount || 0
        // let map = {}
        // this.mainTable.map((currentVal, currentIndex) => {
        //   console.log('ORDER_NO: ', currentVal.ORDER_NO)
        //   const data = map[`_${currentVal.ORDER_NO}`]
        //   console.log('data: ', data)
        //   if (data) {
        //     data.rowspan++
        //     map[`_${currentVal.ORDER_NO}`] = data
        //   } else {
        //     map[`_${currentVal.ORDER_NO}`] = {
        //       row: currentIndex, col: 1, rowspan: 1, colspan: 1
        //     }
        //   }
        // })
        // console.log('map:', map)
        // this.mergeCells = Object.values(map).map(i => i)
        // console.log(this.mergeCells)
      } else {
        this.$message.error(res.Msg || '数据获取失败')
        this.mainTable = []
        this.TotalCount = 0
      }
    },
    async CancelReport () {
      const rows = this.$refs.xTable.getCheckboxRecords()
      if (!rows || !rows.length) {
        this.$message.error('请选择要取消的报工')
        return false
      }
      const res = await CancelReport({
        user: this.username,
        list: rows
      })
      if (res.Code === 1) {
        this.$refs.xTable.clearCheckboxRow()
        this.getCancelReportData()
        this.$message.success('取消报工成功')
      } else {
        this.$message.error(res.Msg || '取消报工失败')
      }
    },
    mergeRowMethod (e) {
      const { row, rowIndex, column } = e
      const data = e.$table.afterFullData
      const fields = ['ORDER_NO', 'WO_NO', 'ZS']
      const cellValue = XEUtils.get(row, column.property)
      if (cellValue && fields.includes(column.property)) {
        const prevRow = data[rowIndex - 1]
        let nextRow = data[rowIndex + 1]
        if (prevRow && XEUtils.get(prevRow, column.property) === cellValue) {
          return { rowspan: 0, colspan: 0 }
        } else {
          let countRowspan = 1
          while (nextRow && XEUtils.get(nextRow, column.property) === cellValue) {
            nextRow = data[++countRowspan + rowIndex]
          }
          if (countRowspan > 1) {
            return { rowspan: countRowspan, colspan: 1 }
          }
        }
      }
    },
    handleSizeChange (Limit) {
      return debounce(() => {
        this.formData.Page = 1
        this.formData.Limit = Limit
        this.getCancelReportData()
      }, 500)
    },
    handleCurrentChange (Page) {
      this.formData.Page = Page
      this.getCancelReportData()
    },
    async test () {
      await [1, 2, 3, 4, 5].map(async i => {
        console.log('-------' + i)
        const p = () => {
          return new Promise(resolve => {
            setTimeout(() => {
              console.log('你好： ', i)
              resolve(true)
            }, 2000)
          })
        }
        await p()
      })
      console.log('end')
    }
  },
  created () {
    this.getCancelReportData()
    this.test()
  }
}
