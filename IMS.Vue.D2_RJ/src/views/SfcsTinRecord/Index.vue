<template>
  <d2-container>
    <!-- 头部 -->
    <template slot="header">
      <custom-container-header :isExport="false" :isExportTpl="false" :isImport="false">
        <el-select clearable style="width:200px" v-model="formData.LINE_ID" :placeholder="$t('SfcsTinRecord._1')">
          <el-option
            v-for="item in LineList"
            :key="item.ID"
            :label="item.LINE_NAME"
            :value="item.ID"
          />
        </el-select>
        <el-select clearable style="width:200px" v-model="formData.RESULT" :placeholder="$t('SfcsTinRecord._2')">
          <el-option v-for="(item,ID) in ResultList" :key="ID" :label="item" :value="item" />
        </el-select>
        <el-date-picker
          style="width:200px"
          v-model="formData.BEGIN_TIME"
          type="datetime"
          value-format="yyyy-MM-dd"
          format="yyyy-MM-dd"
          :picker-options="pickerOptionsStart"
          :placeholder="$t('SfcsTinRecord._3')"
        />
        <el-date-picker
          style="width:200px"
          v-model="formData.END_TIME"
          type="datetime"
          value-format="yyyy-MM-dd"
          format="yyyy-MM-dd"
          :picker-options="pickerOptionsEnd"
          :placeholder="$t('SfcsTinRecord._4')"
        />
        <el-button
          type="primary"
          icon="el-icon-search"
          @click.prevent="searchClick"
        >{{$t('publics.btn.search')}}</el-button>&nbsp;
        <el-button
          type="success"
          icon="el-icon-plus"
          @click.prevent="addClick"
        >{{$t('publics.btn.add')}}</el-button>&nbsp;
      </custom-container-header>
    </template>
    <div class="table-container">
      <vxe-table
        ref="xTable"
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
        :loading="loading"
        :data="mainTable"
        :mouse-config="{selected: true}"
        :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
      >
        <vxe-table-column
          min-width="150"
          field="OPERATION_LINE_NAME"
          :title="$t('SfcsTinRecord._5')"
          :edit-render="{name: '$input', props: {readonly: true}}"
        />
        <vxe-table-column
          min-width="150"
          field="OUTPUT_DAY"
          :title="$t('SfcsTinRecord._6')"
          :edit-render="{name: '$input', props: {readonly: true}}"
        />
        <vxe-table-column
          min-width="160"
          field="OUTPUT_NUM"
          :title="$t('SfcsTinRecord._7')"
          :edit-render="{name: '$input', props: {readonly: true}}"
        />
        <vxe-table-column
          min-width="150"
          field="ADD_TIN"
          :title="$t('SfcsTinRecord._8')"
          :edit-render="{name: '$input', props: {readonly: true}}"
        />
        <vxe-table-column
          min-width="150"
          field="RESULT"
          :title="$t('SfcsTinRecord._9')"
          :edit-render="{name: '$input', props: {readonly: true}}"
        />
        <vxe-table-column
          min-width="160"
          field="DESCRIPTION"
          :title="$t('SfcsTinRecord._10')"
          :edit-render="{name: '$input', props: {readonly: true}}"
        />
        <vxe-table-column
          min-width="160"
          field="AUDITOR"
          :title="$t('SfcsTinRecord._11')"
          :edit-render="{name: '$input', props: {readonly: true}}"
        />
        <vxe-table-column
          min-width="150"
          field="AUDIT_TIME"
          :title="$t('SfcsTinRecord._12')"
          :edit-render="{name: '$input', props: {readonly: true}}"
        />
        <vxe-table-column
          min-width="150"
          field="CREATER"
          :title="$t('SfcsTinRecord._13')"
          :edit-render="{name: '$input', props: {readonly: true}}"
        />
        <vxe-table-column
          min-width="150"
          field="CREATE_TIME"
          :title="$t('SfcsTinRecord._14')"
          :edit-render="{name: '$input', props: {readonly: true}}"
        />
        <vxe-table-column :title="$t('plbd.tb_og')" min-width="300" align="center" fixed="right">
          <template v-slot="{ row }">
            <el-button type="success" size="mini" @click="AddAnalysisClick(row, row.$index)">{{$t('SfcsTinRecord._15')}}</el-button>
            <el-button
              type="primary"
              size="mini"
              @click="editClick(row, row.$index)"
            >{{ $t('publics.btn.edit') }}</el-button>
            <el-button
              type="danger"
              size="mini"
              @click="removeClick(row, row.$index)"
            >{{ $t('publics.btn.delete') }}</el-button>
          </template>
        </vxe-table-column>
      </vxe-table>
    </div>
    <!-- 分页 -->
    <template slot="footer">
      <el-pagination
        :current-page="formData.Page"
        :page-size="formData.Limit"
        :page-sizes="[15, 25, 35, 45]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalPage"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </template>
    <!-- 编辑/新增框 -->
    <el-dialog
      v-dialogDrag
      :visible.sync="dialogVisible"
      :title="dialogTitle"
      width="50%"
      :close-on-click-modal="false"
    >
      <el-form ref="editForm" :model="editForm" label-width="100px" :show-message="false">
        <el-form-item :label="$t('SfcsTinRecord._5')">
          <el-select
            :disabled="isNew?false:true"
            style="width:100%"
            v-model="editForm.LINE_ID"
            :placeholder="$t('SfcsTinRecord._1')"
          >
            <el-option
              v-for="item in LineList"
              :key="item.ID"
              :label="item.LINE_NAME"
              :value="item.ID"
            />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('SfcsTinRecord._6')">
          <el-date-picker
            value-format="yyyy-MM-dd"
            :disabled="isNew?false:true"
            v-model="editForm.OUTPUT_DAY"
            type="date"
            :placeholder="$t('SfcsTinRecord._16')"
            style="width:100%"
          />
        </el-form-item>
        <el-form-item :label="$t('SfcsTinRecord._7')">
          <el-input disabled v-model="editForm.OUTPUT_NUM" style="width:80%" />
          <el-button
            :disabled="isNew?false:true"
            type="success"
            @click="getClick()"
            style="float:right;width:15%"
          >{{$t('SfcsTinRecord._17')}}</el-button>
        </el-form-item>
        <el-form-item :label="$t('SfcsTinRecord._8')">
          <el-input v-model="editForm.ADD_TIN" :placeholder="$t('SfcsTinRecord._18')" />
        </el-form-item>
      </el-form>
      <div style="text-align: center;margin-top:20px">
        <el-button type="primary" @click.prevent="saveClick(1)">{{$t('ssc_rd.sure')}}</el-button>&nbsp;
        <el-button @click.prevent="resetClick(1)">{{$t('SfcsTinRecord._19')}}</el-button>&nbsp;
      </div>
    </el-dialog>
    <!-- 分析结果 -->
    <el-dialog
      v-dialogDrag
      :visible.sync="dialogVisible2"
      :title="dialogTitle2"
      width="50%"
      :close-on-click-modal="false"
    >
      <el-form ref="resultForm" :model="resultForm" label-width="100px" :show-message="false">
        <el-form-item :label="$t('SfcsTinRecord._20')">
          <el-select style="width:100%" v-model="resultForm.RESULT" :placeholder="$t('SfcsTinRecord._21')">
            <el-option v-for="(item,ID) in ResultList" :key="ID" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('SfcsTinRecord._10')">
          <el-input
            type="textarea"
            :rows="5"
            :placeholder="$t('SfcsTinRecord._22')"
            v-model="resultForm.DESCRIPTION"
          />
        </el-form-item>
        <div style="text-align: center;margin-top:20px">
          <el-button type="primary" @click.prevent="saveClick(2)">{{$t('ssc_rd.sure')}}</el-button>&nbsp;
          <el-button @click.prevent="resetClick(2)">{{$t('SfcsTinRecord._19')}}</el-button>&nbsp;
        </div>
      </el-form>
    </el-dialog>
  </d2-container>
</template>

<script>
import customContainerHeader from '@/components/custom-container-header'
import pagination from '@/views/mixin/page'
import {
  Index,
  LoadData,
  GetApsOutput,
  AddOrModifySave,
  AddResultSave,
  DeleteOneById
} from '@/api/SfcsTinRecord'
export default {
  name: 'SfcsTinRecord',
  components: {
    customContainerHeader
  },
  mixins: [pagination],
  data () {
    return {
      formData: {},
      LineList: [], // 线体
      ResultList: ['正常', '用量过多', '用量过少'], // 分析结果
      startTime: '',
      endTime: '',
      pickerOptionsStart: {
        disabledDate: time => {
          if (this.formData.END_TIME) {
            return time.getTime() > new Date(this.formData.END_TIME).getTime()
          }
        }
      },
      pickerOptionsEnd: {
        disabledDate: time => {
          if (this.formData.BEGIN_TIME) {
            return (
              time.getTime() <
              new Date(this.formData.BEGIN_TIME).getTime() - 86400000
            )
          }
        }
      },
      loading: false,
      mainTable: [],
      dialogVisible: false,
      dialogVisible2: false,
      editForm: { ID: 0 },
      dialogTitle: '',
      dialogTitle2: '',
      resultForm: {},
      isNew: undefined
    }
  },
  created () {
    this.getIndex()
    this.getLoadData()
  },
  methods: {
    async getIndex () {
      const res = await Index()
      this.LineList = res.Result ? res.Result : []
    },
    // 搜索
    searchClick () {
      this.formData.Page = 1
      this.getLoadData()
    },
    async getLoadData () {
      this.loading = true
      const res = await LoadData(this.formData)
      if (res.Result.code === 0) {
        this.mainTable = res.Result.data
        console.log(this.mainTable, '获取表格')
        this.totalPage = res.Result.count
        this.loading = false
      } else {
        this.loading = false
      }
    },
    addClick () {
      this.editForm = {}
      this.dialogTitle = this.$t('SfcsTinRecord._23')
      this.dialogVisible = true
      this.isNew = true
    },
    editClick (row) {
      this.editForm = { ...row }
      this.dialogTitle = this.$t('SfcsTinRecord._24')
      this.dialogVisible = true
      this.isNew = false
    },
    // 获取产能
    async getClick () {
      const res = await GetApsOutput(this.editForm)
      const data = JSON.parse(res.Result)
      this.editForm.OUTPUT_NUM = data ? data.ResultData : ''
      if (data.ResultCode !== 0) {
        this.$message({
          message: data.ResultMsg,
          type: 'error'
        })
      }
      console.log('====================', this.editForm.OUTPUT_NUM)
    },
    AddAnalysisClick (row) {
      this.dialogTitle2 = this.$t('SfcsTinRecord._25')
      this.resultForm = { ...row }
      this.dialogVisible2 = true
    },
    // 重置
    resetClick (num) {
      if (num === 1) {
        this.editForm = { ID: 0 }
      } else {
        this.resultForm = {}
      }
    },
    // 删除
    removeClick (row) {
      this.$confirm(this.$t('SfcsTinRecord._26'), this.$t('SfcsTinRecord._27'), {
        confirmButtonText: this.$t('SfcsTinRecord._28'),
        cancelButtonText: this.$t('SfcsTinRecord._29'),
        type: 'warning'
      })
        .then(async () => {
          const res = await DeleteOneById(row.ID)
          const data = JSON.parse(res.Result)
          if (data.ResultCode === 0) {
            this.getLoadData()
            this.$notify({
              title: this.$t('ssc._12'),
              message: this.$t('ssc._19'),
              type: 'success',
              duration: 2000
            })
          } else {
            return this.$message.error(data.ResultMsg)
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('SfcsTinRecord._30')
          })
        })
    },
    // 保存
    saveClick (num) {
      if (num === 1) {
        if (
          this.editForm.OUTPUT_NUM === null ||
          this.editForm.OUTPUT_NUM === '' ||
          this.editForm.OUTPUT_NUM === undefined
        ) {
          return this.$message.error(this.$t('SfcsTinRecord._31'))
        }
        AddOrModifySave(this.editForm)
          .then(res => {
            if (res.Result) {
              this.getLoadData()
              this.dialogVisible = false
              this.$notify({
                title: this.$t('crss._20'),
                message: this.$t('crss._21'),
                type: 'success',
                duration: 2000
              })
              this.dialogVisible = false
            }
          })
          .catch(() => {})
      } else if (num === 2) {
        if (
          this.resultForm.RESULT === null ||
          this.resultForm.RESULT === '' ||
          this.resultForm.RESULT === undefined
        ) {
          return this.$message.error(this.$t('SfcsTinRecord._31'))
        }
        AddResultSave(this.resultForm)
          .then(res => {
            if (res.Result) {
              this.getLoadData()
              this.dialogVisible = false
              this.$notify({
                title: this.$t('crss._20'),
                message: this.$t('crss._21'),
                type: 'success',
                duration: 2000
              })
            }
            this.dialogVisible2 = false
          })
          .catch(() => {})
      }
    }
    //
  }
}
</script>

<style>
</style>
