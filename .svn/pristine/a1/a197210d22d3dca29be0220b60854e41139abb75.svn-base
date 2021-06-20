<template>
<div>
<el-tabs type="card" v-model="activeName" class="controller" @tab-click="handelTabClick">
    <el-tab-pane label="产能信息" name="KanbanCapReport">
      <div class="table-controller">
        <vxe-table
          ref="KanbanCapReport"
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
          :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
          :loading="loading"
          :data="mainTable"
        >
          <vxe-table-column
            sortable
            min-width="150"
            show-overflow
            field="LINE_ID"
            title="线体"
            :params="{field:'LINE_ID',defaultVal:''}"
            :edit-render="{name: '$select', options: LineList,optionProps:{label:'OPERATION_LINE_NAME',value:'Id'}}"
          />
          <vxe-table-column
            sortable
            min-width="150"
            field="WO_NO"
            show-overflow
            title="工单"
            :params="{field:'WO_NO',defaultVal:''}"
            :edit-render="{name: '$input', props: {readonly: true},events:{focus:SelectWoNo}}"
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
            field="QTY"
            title="数量"
            :params="{field:'QTY',defaultVal:0}"
            :edit-render="{name: '$input', props: {type: 'number',min:0}}"
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
    <el-tab-pane label="产能明细" name="KanbanCapDetailReport">
      <div class="table-controller">
        <vxe-table
          ref="KanbanCapDetailReport"
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
          :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
          :loading="loading"
          :data="mainTable"
        >
         <vxe-table-column
            sortable
            min-width="150"
            show-overflow
            field="LINE_ID"
            title="线体"
            :params="{field:'LINE_ID',defaultVal:''}"
            :edit-render="{name: '$select', options: LineList,optionProps:{label:'OPERATION_LINE_NAME',value:'Id'}}"
          />

          <vxe-table-column
            sortable
            min-width="150"
            field="WO_NO"
            show-overflow
            title="工单"
            :params="{field:'WO_NO',defaultVal:''}"
            :edit-render="{name: '$input', props: {readonly: true},events:{focus:SelectWoNo}}"
          />

          <!-- :edit-render="{name: '$input', props: {type: 'datetime',transfer}}" -->
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
            field="OPERATION_ID"
            title="工序"
            :params="{field:'OPERATION_ID',defaultVal:''}"
            :edit-render="{name: '$select', options: OperationList,optionProps:{label:'OPERATION_NAME',value:'Id'}}"
          />
          <vxe-table-column
            sortable
            min-width="150"
            show-overflow
            field="PASS_QTY"
            title="PASS数"
            :params="{field:'PASS_QTY',defaultVal:0}"
            :edit-render="{name: '$input', props: {type: 'number',min:0}}"
          />
          <vxe-table-column
            sortable
            min-width="150"
            show-overflow
            field="FAIL_QTY"
            title="FAIL数"
            :params="{field:'FAIL_QTY',defaultVal:0}"
            :edit-render="{name: '$input', props: {type: 'number',min:0}}"
          />
          <vxe-table-column
            sortable
            min-width="150"
            show-overflow
            field="WIP_QTY"
            title="WIP数"
            :params="{field:'WIP_QTY',defaultVal:0}"
            :edit-render="{name: '$input', props: {type: 'number',min:0}}"
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
  <WoNo @wonoVal="wonoVal" ref="woNoTable"/>
</div>

</template>

<script>
import helper from '@/api/MesKanbanController'
import WoNo from '../components/WoNO/index'
const API = helper()
export default {
  name: 'Capacity',
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
      parentRefs: 'capatcity',
      activeName: 'KanbanCapReport',
      loading: false,
      mainTable: [],
      formData: {
        Page: 1,
        Limit: 15,
        Key: ''
      },
      TotalCount: 0,
      firstRules: {
        LINE_ID: [
          { required: true, message: '请选择线体' }
        ],
        WO_NO: [
          { required: true, message: '请输入工单' }
        ],
        WORK_TIME: [
          { required: true, message: '请选择时间' }
        ],
        QTY: [
          { required: true, message: '请输入数量' }
        ]
      },
      secondRules: {
        LINE_ID: [
          { required: true, message: '请选择线体' }
        ],
        WO_NO: [
          { required: true, message: '请输入工单' }
        ],
        WORK_TIME: [
          { required: true, message: '请选择时间' }
        ],
        OPERATION_ID: [
          { required: true, message: '请选择工序' }
        ],
        PASS_QTY: [
          { required: true, message: '请输入PASS数' }
        ],
        FAIL_QTY: [
          { required: true, message: '请输入FAIL数' }
        ],
        WIP_QTY: [
          { required: true, message: '请输入WIP数' }
        ]
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
      const res = await API.LoadData('Load' + this.activeName, this.formData)
        .catch(() => {
          this.loading = false
        })
      this.loading = false
      if (res.Result) {
        this.mainTable = res.Result || []
        this.TotalCount = res.TotalCount
        this.$emit('parentVal',
          {
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
