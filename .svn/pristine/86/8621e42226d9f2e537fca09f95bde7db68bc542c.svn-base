<template>
  <el-tabs
    type="card"
    v-model="activeName"
    class="controller"
    @tab-click="handelTabClick"
  >
    <el-tab-pane label="设备点检" name="KanbanMachineCheck">
      <div class="table-controller">
        <vxe-table
          ref="KanbanMachineCheck"
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
            show-overflow
            field="CHECK_TYPE"
            title="点检类型"
            :params="{ field: 'CHECK_TYPE', defaultVal: '' }"
            :edit-render="{
              name: '$select',
              options: CHECK_TYPE,
            }"
          />
          <vxe-table-column
            sortable
            min-width="240"
            show-overflow
            field="WORK_TIME"
            title="时间"
            :params="{field:'WORK_TIME',defaultVal:''}"
            :edit-render="{ name: '$input', props: { type: 'date' } }"
          />
          <vxe-table-column
            sortable
            min-width="150"
            show-overflow
            field="HASCHECK_QTY"
            title="已检验数量"
            :params="{ field: 'HASCHECK_QTY', defaultVal: 0 }"
            :edit-render="{ name: '$input', props: { type: 'number', min: 0 } }"
          />
          <vxe-table-column
            sortable
            min-width="150"
            show-overflow
            field="UNCHECK_QTY"
            title="待检验数量"
            :params="{ field: 'UNCHECK_QTY', defaultVal: 0 }"
            :edit-render="{ name: '$input', props: { type: 'number', min: 0 } }"
          />
          <vxe-table-column
            sortable
            min-width="180"
            show-overflow
            field="OVERDUE_UNCHECK_QTY"
            title="超期未检验数量"
            :params="{ field: 'OVERDUE_UNCHECK_QTY', defaultVal: 0 }"
            :edit-render="{ name: '$input', props: { type: 'number', min: 0 } }"
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
    <el-tab-pane label="设备保养" name="KanbanMachineMaintain">
      <div class="table-controller">
        <vxe-table
          ref="KanbanMachineMaintain"
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
          :edit-rules="secondRules"
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
            show-overflow
            field="MAINTAIN_TYPE"
            title="保养类型"
            :params="{ field: 'MAINTAIN_TYPE', defaultVal: '' }"
            :edit-render="{
              name: '$select',
              options: CHECK_TYPE,
            }"
          />
          <vxe-table-column
            sortable
            min-width="240"
            show-overflow
            field="WORK_TIME"
            title="时间"
            :params="{field:'WORK_TIME',defaultVal:''}"
          >
            <template slot-scope="scope">
              <el-date-picker
                v-model="scope.row.WORK_TIME"
                type="datetime"
                placeholder="选择日期时间"
                value-format="yyyy-MM-dd HH:mm:ss"
                align="right"
                :picker-options="pickerOptions">
              </el-date-picker>
            </template>
          </vxe-table-column>

          <vxe-table-column
            sortable
            min-width="150"
            show-overflow
            field="MACHINE_NO"
            title="设备编号"
            :params="{ field: 'MACHINE_NO', defaultVal: '' }"
            :edit-render="{ name: 'input' }"
          />
          <vxe-table-column
            sortable
            min-width="150"
            show-overflow
            field="MACHINE_NAME"
            title="设备名称"
            :params="{ field: 'MACHINE_NAME', defaultVal: '' }"
            :edit-render="{ name: 'input'}"
          />
          <vxe-table-column
            sortable
            min-width="150"
            show-overflow
            field="MAINTAIN_STATUS"
            title="保养状态"
            :params="{ field: 'MAINTAIN_STATUS', defaultVal: null }"
            :edit-render="{
              name: '$select',
              options: MAINTAIN_STATUS,
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
    <el-tab-pane label="设备数量" name="KanbanMachineReport">
      <div class="table-controller">
        <vxe-table
          ref="KanbanMachineReport"
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
          :edit-rules="thirdRules"
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
            min-width="240"
            show-overflow
            field="WORK_TIME"
            title="时间"
            :params="{field:'WORK_TIME',defaultVal:''}"
          >
            <template slot-scope="scope">
              <el-date-picker
                v-model="scope.row.WORK_TIME"
                type="datetime"
                placeholder="选择日期时间"
                align="right"
                value-format="yyyy-MM-dd HH:00:00"
                :picker-options="pickerOptions">
              </el-date-picker>
            </template>
          </vxe-table-column>
          <vxe-table-column
            sortable
            min-width="150"
            show-overflow
            field="MACHINE_QTY"
            title="设备数"
            :params="{ field: 'MACHINE_QTY', defaultVal: 0 }"
            :edit-render="{ name: '$input', props: { type: 'number', min: 0 } }"
          />
          <vxe-table-column
            sortable
            min-width="150"
            show-overflow
            field="IDLE_MACHINE_QTY"
            title="闲置设备数"
            :params="{ field: 'IDLE_MACHINE_QTY', defaultVal: 0 }"
            :edit-render="{ name: '$input', props: { type: 'number', min: 0 } }"
          />
          <vxe-table-column
            sortable
            min-width="150"
            show-overflow
            field="REPAIR_MACHINE_QTY"
            title="维修设备数"
            :params="{ field: 'REPAIR_MACHINE_QTY', defaultVal: 0 }"
            :edit-render="{ name: '$input', props: { type: 'number', min: 0 } }"
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
    <el-tab-pane label="设备明细" name="KanbanMachineDetail">
      <div class="table-controller">
        <vxe-table
          ref="KanbanMachineDetail"
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
          :edit-rules="fourthRules"
          :sort-config="{ trigger: 'cell' }"
          :edit-config="{ trigger: 'click', mode: 'row', showStatus: true }"
          :loading="loading"
          :data="mainTable"
        >
          <vxe-table-column
            sortable
            min-width="150"
            show-overflow
            field="MACHINE_NO"
            title="设备编号"
            :params="{ field: 'MACHINE_NO', defaultVal: '' }"
            :edit-render="{ name: 'input' }"
          />
          <vxe-table-column
            sortable
            min-width="240"
            show-overflow
            field="WORK_TIME"
            title="时间"
            :params="{field:'WORK_TIME',defaultVal:''}"
          >
            <template slot-scope="scope">
              <el-date-picker
                v-model="scope.row.WORK_TIME"
                type="datetime"
                placeholder="选择日期时间"
                align="right"
                value-format="yyyy-MM-dd HH:00:00"
                :picker-options="pickerOptions">
              </el-date-picker>
            </template>
          </vxe-table-column>
          <vxe-table-column
            sortable
            min-width="150"
            show-overflow
            field="UTILIZATION_RATE"
            title="设备稼动率"
            :params="{ field: 'UTILIZATION_RATE', defaultVal: 0 }"
            :edit-render="{
              name: '$input',
              props: { type: 'number',step: '0.01', min: 0, max: 100 },
            }"
          />
          <vxe-table-column
            sortable
            min-width="150"
            show-overflow
            field="ATTRITION_RATE"
            title="抛料率"
            :params="{ field: 'ATTRITION_RATE', defaultVal: 0 }"
            :edit-render="{
              name: '$input',
              props: { type: 'number', step: '0.01',min: 0, max: 100 },
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
</template>

<script>
import helper from '@/api/MesKanbanController'
const API = helper()
export default {
  name: 'Equipment',
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
  data () {
    return {
      pickerOptions: {
        shortcuts: [{
          text: '今天',
          onClick (picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      },
      CHECK_TYPE: [
        {
          label: '日保养',
          value: 1
        },
        {
          label: '周保养',
          value: 2
        },
        {
          label: '月保养',
          value: 3
        },
        {
          label: '年保养',
          value: 4
        }
      ],
      MAINTAIN_STATUS: [
        {
          label: '未保养',
          value: 0
        },
        {
          label: '已保养',
          value: 1
        }
      ],
      parentRefs: 'equipment',
      activeName: 'KanbanMachineCheck',
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
        WORK_TIME: [{ required: true, message: '请选择时间' }],
        CHECK_TYPE: [{ required: true, message: '请选择点检类型' }],
        HASCHECK_QTY: [{ required: true, message: '请输入已检验数量' }],
        UNCHECK_QTY: [{ required: true, message: '请输入待检验数量' }],
        OVERDUE_UNCHECK_QTY: [{ required: true, message: '请输入超期未检验数量' }]
      },
      secondRules: {
        LINE_ID: [{ required: true, message: '请选择线体' }],
        WORK_TIME: [{ required: true, message: '请选择时间' }],
        MAINTAIN_TYPE: [{ required: true, message: '请选择保养类型' }],
        MACHINE_NO: [{ required: true, message: '请输入设备编号' }],
        MACHINE_NAME: [{ required: true, message: '请输入设备名称' }],
        MAINTAIN_STATUS: [{ required: true, message: '请选择保养状态' }]
      },
      thirdRules: {
        LINE_ID: [{ required: true, message: '请选择线体' }],
        WORK_TIME: [{ required: true, message: '请选择时间' }],
        MACHINE_QTY: [{ required: true, message: '请输入设备数' }],
        IDLE_MACHINE_QTY: [{ required: true, message: '请输入闲置设备数' }],
        REPAIR_MACHINE_QTY: [{ required: true, message: '请输入维修设备数' }]
      },
      fourthRules: {
        MACHINE_NO: [{ required: true, message: '请输入设备编号' }],
        WORK_TIME: [{ required: true, message: '请选择时间' }],
        UTILIZATION_RATE: [{ required: true, message: '请输入设备稼动率' }],
        ATTRITION_RATE: [{ required: true, message: '请输入抛料率' }]
      },
      rowid: -1
    }
  },
  created () {
    this.LoadData()
  },
  methods: {
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
