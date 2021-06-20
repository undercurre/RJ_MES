<template>
<div>
<el-tabs type="card" v-model="activeName" class="controller" @tab-click="handelTabClick">
    <el-tab-pane label="品质信息" name="KanbanQualityReport">
      <div class="table-controller">
        <vxe-table
          ref="KanbanQualityReport"
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
            field="OPERATION_ID"
            title="工序"
            :params="{field:'OPERATION_ID',defaultVal:''}"
            :edit-render="{name: '$select', options: OperationList,optionProps:{label:'OPERATION_NAME',value:'Id'}}"
          />

          <vxe-table-column
            sortable
            min-width="150"
            show-overflow
            field="FAIL_QTY"
            title="不良数量"
            :params="{field:'FAIL_QTY',defaultVal:0}"
            :edit-render="{name: '$input', props: {type: 'number',min:0}}"
          />
          <vxe-table-column
            sortable
            min-width="150"
            show-overflow
            field="REPAIRED_QTY"
            title="已维修数"
            :params="{field:'REPAIRED_QTY',defaultVal:0}"
            :edit-render="{name: '$input', props: {type: 'number',min:0}}"
          />
          <vxe-table-column
            sortable
            min-width="150"
            show-overflow
            field="REPAIR_QTY"
            title="待维修数"
            :params="{field:'REPAIR_QTY',defaultVal:0}"
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
    <el-tab-pane label="品质详情" name="KanbanQualityDetail">
      <div class="table-controller">
        <vxe-table
          ref="KanbanQualityDetail"
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
            field="DEFECT_CODE"
            title="不良代码"
             :params="{field:'DEFECT_CODE',defaultVal:''}"
            :edit-render="{name: '$input', props: {readonly: true},events:{focus:SelectDefectCode}}"
          />
          <vxe-table-column
            sortable
            min-width="150"
            show-overflow
            field="DEFECT_LOC"
            title="不良位号"
            :params="{field:'DEFECT_LOC',defaultVal:''}"
            :edit-render="{name: 'input'}"
          />
          <vxe-table-column
            sortable
            min-width="150"
            show-overflow
            field="FAIL_QTY"
            title="不良数量"
            :params="{field:'FAIL_QTY',defaultVal:0}"
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
    <el-tab-pane label="首件检验" name="KanbanFirstCheckReport">
      <div class="table-controller">
        <vxe-table
          ref="KanbanFirstCheckReport"
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
            min-width="160"
            show-overflow
            field="WORK_TIME"
            title="时间"
            :params="{field:'WORK_TIME',defaultVal:''}"
          >
            <template slot-scope="scope">
              <el-date-picker
                v-model="scope.row.WORK_TIME"
                type="month"
                placeholder="选择日期时间"
                align="right"
                value-format="yyyy-MM-01 00:00:00">
              </el-date-picker>
            </template>
          </vxe-table-column>

          <vxe-table-column
            sortable
            min-width="150"
            show-overflow
            field="CHECK_QTY"
            title="检验次数"
            :params="{field:'CHECK_QTY',defaultVal:0}"
            :edit-render="{name: '$input', props: {type: 'number',min:0}}"
          />
          <vxe-table-column
            sortable
            min-width="150"
            show-overflow
            field="FAIL_QTY"
            title="不良次数"
            :params="{field:'FAIL_QTY',defaultVal:0}"
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
    <el-tab-pane label="OQC抽检" name="KanbanSampCheckReport">
      <div class="table-controller">
        <vxe-table
          ref="KanbanSampCheckReport"
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
                type="month"
                placeholder="选择日期时间"
                align="right"
                value-format="yyyy-MM-01 00:00:00">
              </el-date-picker>
            </template>
          </vxe-table-column>
          <vxe-table-column
            sortable
            min-width="150"
            show-overflow
            field="TOTAL_CHECK_QTY"
            title="送检数量"
            :params="{field:'TOTAL_CHECK_QTY',defaultVal:0}"
            :edit-render="{name: '$input', props: {type: 'number',min:0}}"
          />
          <vxe-table-column
            sortable
            min-width="150"
            show-overflow
            field="CHECK_QTY"
            title="检验数量"
            :params="{field:'CHECK_QTY',defaultVal:0}"
            :edit-render="{name: '$input', props: {type: 'number',min:0}}"
          />
          <vxe-table-column
            sortable
            min-width="150"
            show-overflow
            field="FAIL_QTY"
            title="不良数量"
            :params="{field:'FAIL_QTY',defaultVal:0}"
            :edit-render="{name: '$input', props: {type: 'number',min:0}}"
          />
          <vxe-table-column
            sortable
            min-width="150"
            show-overflow
            field="INSPECT_QTY"
            title="检验单数量"
            :params="{field:'INSPECT_QTY',defaultVal:0}"
            :edit-render="{name: '$input', props: {type: 'number',min:0}}"
          />
          <vxe-table-column
            sortable
            min-width="180"
            show-overflow
            field="HAS_INSPECT_QTY"
            title="已检验单数量"
            :params="{field:'HAS_INSPECT_QTY',defaultVal:0}"
            :edit-render="{name: '$input', props: {type: 'number',min:0}}"
          />
          <vxe-table-column
            sortable
            min-width="180"
            show-overflow
            field="UN_INSPECT_QTY"
            title="未检验单数量"
            :params="{field:'UN_INSPECT_QTY',defaultVal:0}"
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
    <el-tab-pane label="巡检信息" name="KanbanInspecReport">
      <div class="table-controller">
        <vxe-table
          ref="KanbanInspecReport"
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
          :edit-rules="fifthRules"
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
            min-width="150"
            show-overflow
            field="CHECK_QTY"
            title="检验次数"
            :params="{field:'CHECK_QTY',defaultVal:0}"
            :edit-render="{name: '$input', props: {type: 'number',min:0}}"
          />
          <vxe-table-column
            sortable
            min-width="150"
            show-overflow
            field="FAIL_QTY"
            title="不良次数"
            :params="{field:'FAIL_QTY',defaultVal:0}"
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
  <Badcode @badCodeVal="badCodeVal" ref="badCode"/>
</div>
</template>

<script>
import helper from '@/api/MesKanbanController'
import WoNo from '../components/WoNO/index'
import Badcode from '../components/Badcode/index'
const API = helper()
export default {
  name: 'Quality',
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
    WoNo,
    Badcode
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
      parentRefs: 'quality', // 组件名
      activeName: 'KanbanQualityReport', // 接口名
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
        OPERATION_ID: [
          { required: true, message: '请选择工序' }
        ],
        FAIL_QTY: [
          { required: true, message: '请输入不良数量' }
        ],
        REPAIRED_QTY: [
          { required: true, message: '请输入已维修数' }
        ],
        REPAIR_QTY: [
          { required: true, message: '请输入待维修数' }
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
        DEFECT_CODE: [
          { required: true, message: '请选择不良代码' }
        ],
        FAIL_QTY: [
          { required: true, message: '请输入不良数量' }
        ]
      },
      thirdRules: {
        LINE_ID: [
          { required: true, message: '请选择线体' }
        ],
        WORK_TIME: [
          { required: true, message: '请选择时间' }
        ],
        CHECK_QTY: [
          { required: true, message: '请输入检验次数' }
        ],
        FAIL_QTY: [
          { required: true, message: '请输入不良次数' }
        ]
      },
      fourthRules: {
        LINE_ID: [
          { required: true, message: '请选择线体' }
        ],
        WO_NO: [
          { required: true, message: '请输入工单' }
        ],
        WORK_TIME: [
          { required: true, message: '请选择时间' }
        ],
        TOTAL_CHECK_QTY: [
          { required: true, message: '请输入送检数量' }
        ],
        CHECK_QTY: [
          { required: true, message: '请输入检验数量' }
        ],
        FAIL_QTY: [
          { required: true, message: '请输入不良数量' }
        ],
        INSPECT_QTY: [
          { required: true, message: '请输入检验单数量' }
        ],
        HAS_INSPECT_QTY: [
          { required: true, message: '请输入已检验单数量' }
        ],
        UN_INSPECT_QTY: [
          { required: true, message: '请输入未检验单数量' }
        ]
      },
      fifthRules: {
        LINE_ID: [
          { required: true, message: '请选择线体' }
        ],
        WO_NO: [
          { required: true, message: '请输入工单' }
        ],
        CHECK_QTY: [
          { required: true, message: '请输入检验次数' }
        ],
        FAIL_QTY: [
          { required: true, message: '请输入不良次数' }
        ]
      },
      rowid: -1
    }
  },
  // created () {
  //   this.LoadData()
  // },
  methods: {
    wonoVal (e) {
      const $table = this.$refs[this.activeName]
      var getData = $table.getTableData()
      getData.fullData.map((item) => {
        if (item._XID === this.rowid) {
          item.WO_ID = e.ID
          item.WO_NO = e.NAME
        }
      })
    },
    badCodeVal (e) {
      const $table = this.$refs[this.activeName]
      var getData = $table.getTableData()
      getData.fullData.map((item) => {
        if (item._XID === this.rowid) {
          item.DEFECT_CODE = e.DEFECT_CODE
        }
      })
    },
    SelectWoNo (e) {
      this.rowid = e.rowid
      this.$refs.woNoTable.LoadData()
      this.$refs.woNoTable.dialogVisible = true
    },
    SelectDefectCode (e) {
      this.rowid = e.rowid
      this.$refs.badCode.LoadData()
      this.$refs.badCode.dialogVisible = true
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
