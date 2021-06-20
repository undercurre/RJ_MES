<template>
  <div>
    <el-tabs
      type="card"
      v-model="activeName"
      class="controller"
      @tab-click="handelTabClick"
    >
      <el-tab-pane label="效率信息" name="KanbanEfficiencyReport">
        <div class="table-controller">
          <vxe-table
            ref="KanbanEfficiencyReport"
            border
            resizable
            height="100%"
            size="medium"
            align="center"
            highlight-hover-row
            highlight-current-row
            show-overflow
            auto-resize
            keep-source
            stripe
            :edit-rules="firstRules"
            :sort-config="{ trigger: 'cell' }"
            :edit-config="{ trigger: 'click', mode: 'row', showStatus: true }"
            :loading="loading"
            :data="mainTable"
          >
            <vxe-table-column
              sortable
              min-width="150"
              show-overflow
              field="LINE_ID"
              title="线体"
              :params="{ field: 'LINE_ID', defaultVal: '' }"
              :edit-render="{
                name: '$select',
                options: LineList,
                optionProps: { label: 'OPERATION_LINE_NAME', value: 'Id' },
              }"
            />
            <vxe-table-column
              sortable
              min-width="150"
              field="WO_NO"
              show-overflow
              title="工单"
              :params="{ field: 'WO_NO', defaultVal: '' }"
              :edit-render="{
                name: '$input',
                props: { readonly: true },
                events: { focus: SelectWoNo },
              }"
            />

            <vxe-table-column
              sortable
              min-width="150"
              show-overflow
              field="WORK_TIME"
              title="时间"
              :params="{ field: 'WORK_TIME', defaultVal: '' }"
              :edit-render="{ name: '$input', props: { type: 'date' } }"
            />
            <vxe-table-column
              sortable
              min-width="150"
              show-overflow
              field="INPUT_QTY"
              title="投入数量"
              :params="{ field: 'INPUT_QTY', defaultVal: 0 }"
            >
              <template slot-scope="scope">
                <el-input-number v-model="scope.row.INPUT_QTY" @change="handleChange(scope.row)"></el-input-number>
              </template>
            </vxe-table-column>
            <vxe-table-column
              sortable
              min-width="150"
              show-overflow
              field="WIP_QTY"
              title="在制数量"
              :params="{ field: 'WIP_QTY', defaultVal: 0 }"
              :edit-render="{
                name: '$input',
                props: { type: 'number', min: 0 },
              }"
            />
            <vxe-table-column
              sortable
              min-width="150"
              show-overflow
              field="OUTPUT_QTY"
              title="产出量"
              :params="{ field: 'OUTPUT_QTY', defaultVal: 0 }"
            >
            <template slot-scope="scope">
                <el-input-number v-model="scope.row.OUTPUT_QTY" @change="handleChange(scope.row)"></el-input-number>
              </template>
            </vxe-table-column>
            <vxe-table-column
              sortable
              min-width="150"
              show-overflow
              field="PASS_RATE"
              title="达成率"
              :params="{ field: 'PASS_RATE', defaultVal: 0 }"
              :edit-render="{
                name: '$input',
                props: {readonly: true}
              }"
            />
            <vxe-table-column title="操作" fixed="right" width="120">
              <template slot-scope="scope">
                <el-button type="danger" @click="handleDelete(scope)">{{
                  $t("ManagerRole.delete")
                }}</el-button>
              </template>
            </vxe-table-column>
          </vxe-table>
        </div>
      </el-tab-pane>
    </el-tabs>
    <WoNo @wonoVal="wonoVal" ref="woNoTable" />
  </div>
</template>

<script>
import helper from '@/api/MesKanbanController'
import WoNo from '../components/WoNO/index'
const API = helper()
export default {
  name: 'Efficiency',
  props: {
    LineList: {
      type: Array,
      default: function () {
        return []
      }
    },
    OperationList: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  components: {
    WoNo
  },
  data () {
    return {
      parentRefs: 'efficiency',
      activeName: 'KanbanEfficiencyReport',
      loading: false,
      mainTable: [],
      formData: {
        Page: 1,
        Limit: 15,
        Key: ''
      },
      TotalCount: 0,
      firstRules: {
        LINE_ID: [{ required: true, message: '请选择线体' }],
        WO_NO: [{ required: true, message: '请输入工单' }],
        WORK_TIME: [{ required: true, message: '请选择时间' }],
        INPUT_QTY: [{ required: true, message: '请输入投入数量' }],
        WIP_QTY: [{ required: true, message: '请输入再制数量' }],
        OUTPUT_QTY: [{ required: true, message: '请输入产出量' }],
        PASS_RATE: [{ required: true, message: '请输入达成率' }]
      },
      rowid: -1
    }
  },
  // created () {
  //   this.LoadData()
  // },
  methods: {
    /**
 * 求百分比
 * @param  num 当前数
 * @param  total 总数
 */
    getPercent (num, total) {
      num = parseFloat(num)
      total = parseFloat(total)
      if (isNaN(num) || isNaN(total)) {
        return '-'
      }
      return total <= 0 ? '0' : Math.ceil(Math.round((num / total) * 10000) / 100.0)
    },
    handleChange (row) {
      row.PASS_RATE = this.getPercent(row.OUTPUT_QTY, row.INPUT_QTY)
    },
    wonoVal (e) {
      const $table = this.$refs[this.activeName]
      var getData = $table.getTableData()
      console.log(getData)
      getData.fullData.map((item) => {
        if (item._XID === this.rowid) {
          item.WO_ID = e.ID
          item.WO_NO = e.NAME
        }
      })
    },
    SelectWoNo (e) {
      this.rowid = e.rowid
      this.$refs.woNoTable.LoadData()
      this.$refs.woNoTable.dialogVisible = true
    },
    async LoadData () {
      this.loading = true
      const res = await API.LoadData(
        'Load' + this.activeName,
        this.formData
      ).catch(() => {
        this.loading = false
      })
      this.loading = false
      if (res.Result) {
        this.mainTable = res.Result || []
        this.TotalCount = res.TotalCount
        this.$emit('parentVal', {
          parentRefs: this.parentRefs,
          Page: this.formData.Page,
          Limit: this.formData.Limit,
          totalPage: this.TotalCount
        })
      }
    },
    // 删除
    handleDelete ({ row }) {
      console.log(row)
      this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const $table = this.$refs[this.activeName]
        $table.remove(row)
        const { removeRecords } = $table.getRecordset()
        this.SaveInfor({
          RemoveRecords: removeRecords
        })
      })
    },
    handleSizeChange (Limit) {
      console.log(Limit)
      this.formData.Limit = Limit
      this.LoadData()
    },
    handleCurrentChange (Page) {
      this.formData.Page = Page
      this.LoadData()
    },
    // 产能信息保存
    async SaveInfor (formData) {
      const res = await API.SaveData('Save' + this.activeName, formData)
      if (res.Result) {
        this.$notify({
          title: '成功',
          message: '操作成功',
          type: 'success'
        })
        this.LoadData()
      }
    },
    handelTabClick (e) {
      this.formData.Page = 1
      this.mainTable = []
      this.LoadData()
    }
  }
}
</script>

<style>
</style>
