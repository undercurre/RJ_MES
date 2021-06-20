<template>
<div>
  <el-tabs type="card" v-model="activeName" class="controller" @tab-click="handelTabClick">
    <el-tab-pane label="人员信息" name="KanbanOperatorReport">
      <div class="table-controller">
        <vxe-table
          ref="KanbanOperatorReport"
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
            field="OPERATOR"
            title="工号"
            :params="{field:'OPERATOR',defaultVal:''}"
            :edit-render="{name: '$input', props: {readonly: true},events:{focus:SelectPerson}}"
          />
          <vxe-table-column
            sortable
            min-width="150"
            show-overflow
            field="QTY"
            title="数量"
            :params="{field:'QTY',defaultVal:0}"
            :edit-render="{name: '$input', props: {type: 'number',min:0}}"
          />
          <vxe-table-column
              sortable
              min-width="150"
              show-overflow
              field="PASS_RATE"
              title="达成率"
              :params="{ field: 'PASS_RATE', defaultVal: 0 }"
              :edit-render="{
                name: '$input',
                props: { type: 'number', min: 0, max: 100 },
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
  <Person @personVal="personVal" ref="personTable"/>
</div>
</template>

<script>
import helper from '@/api/MesKanbanController'
import WoNo from '../components/WoNO/index'
import Person from '../components/Person/index'
const API = helper()
export default {
  name: 'Personnel',
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
    Person
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
      parentRefs: 'personnel',
      activeName: 'KanbanOperatorReport',
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
        OPERATION_ID: [
          { required: true, message: '请选择工序' }
        ],
        OPERATOR: [{ required: true, message: '请输入工号' }],
        QTY: [{ required: true, message: '请输入数量' }],
        PASS_RATE: [{ required: true, message: '请输入达成率' }]
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
    personVal (e) {
      const $table = this.$refs[this.activeName]
      var getData = $table.getTableData()
      getData.fullData.map((item) => {
        if (item._XID === this.rowid) {
          item.OPERATOR = e.User_Name
        }
      })
    },
    SelectPerson (e) {
      this.rowid = e.rowid
      this.$refs.personTable.LoadData()
      this.$refs.personTable.dialogVisible = true
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
