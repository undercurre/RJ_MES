<template>
  <d2-container>
    <!-- 头部 -->
    <template slot="header">
      <custom-container-header :isExport="false" :isExportTpl="false" :isImport="false">
        <el-select clearable style="width:150px" v-model="formData.LINE_ID" :placeholder="$t('AndonCallRecord._1')">
          <el-option
            v-for="item in lineList"
            :key="item.ID"
            :label="item.LINE_NAME"
            :value="item.ID"
          />
        </el-select>
        <el-select clearable style="width:150px" v-model="formData.STATUS" :placeholder="$t('AndonCallRecord._2')">
          <el-option
            v-for="item in statusList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <!-- <el-select
          clearable
          style="width:150px"
          v-model="formData.CALL_TITLE"
          :placeholder="'请选择标题'"
        >
          <el-option
            v-for="item in titleList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>-->
        <el-date-picker
          v-model="time"
          type="datetimerange"
          style="width:300px;margin-right:10px"
          range-separator="~"
          :start-placeholder="$t('AndonCallRecord._3')"
          :end-placeholder="$t('AndonCallRecord._4')"
        />
        <el-input
          clearable
          v-model="formData.Key"
          :placeholder="$t('AndonCallRecord._5')"
          style="width:150px"
          @keyup.enter.native="searchClick"
        />&nbsp;
        <el-button
          type="primary"
          icon="el-icon-search"
          @click.prevent="searchClick"
        >{{$t('publics.btn.search')}}</el-button>&nbsp;
        <!-- <el-button
          type="success"
          icon="el-icon-plus"
          @click.prevent="addClick"
        >{{$t('publics.btn.add')}}</el-button>&nbsp;-->
      </custom-container-header>
    </template>
    <!-- 表格 -->
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
          min-width="190"
          field="CALL_NO"
          :title="$t('AndonCallRecord._6')"
          :edit-render="{name: '$input', props: {readonly: true}}"
        />
        <vxe-table-column
          min-width="150"
          field="OPERATION_LINE_NAME"
          :title="$t('AndonCallRecord._7')"
          :edit-render="{name: '$input', props: {readonly: true}}"
        />
        <vxe-table-column
          min-width="150"
          field="SITE_NAME"
          :title="$t('AndonCallRecord._8')"
          :edit-render="{name: '$input', props: {readonly: true}}"
        />
        <vxe-table-column
          min-width="150"
          field="STATUS"
          :title="$t('AndonCallRecord._9')"
          :edit-render="{autofocus: '.custom-input', type: 'visible', props: {readonly: true}}"
        >
          <template v-slot:edit="{ row }">
            <span v-if="row.STATUS === 0">{{$t('AndonCallRecord._10')}}</span>
            <span v-if="row.STATUS === 1">{{$t('AndonCallRecord._11')}}</span>
            <span v-if="row.STATUS === 2">{{$t('AndonCallRecord._12')}}</span>
            <span v-if="row.STATUS === 3">{{$t('AndonCallRecord._13')}}</span>
          </template>
        </vxe-table-column>
        <vxe-table-column
          min-width="150"
          field="CALL_TYPE_CODE"
          :title="$t('AndonCallRecord._14')"
          :edit-render="{autofocus: '.custom-input', type: 'visible', props: {readonly: true}}"
        >
          <template v-slot:edit="{ row }">
            <span v-if="row.CALL_TYPE_CODE=== '0' || row.CALL_TYPE_CODE=== 0">{{$t('AndonCallRecord._15')}}</span>
            <span v-else-if="row.CALL_TYPE_CODE=== '1'|| row.CALL_TYPE_CODE=== 1">{{$t('AndonCallRecord._16')}}</span>
            <span v-else>{{row.CALL_TYPE_CODE}}</span>
          </template>
        </vxe-table-column>
        <vxe-table-column
          min-width="150"
          field="CALL_CONTENT"
          :title="$t('AndonCallRecord._17')"
          :edit-render="{name: '$input', props: {readonly: true}}"
        />
        <vxe-table-column
          min-width="150"
          field="CHECKIN_TIME"
          :title="$t('AndonCallRecord._18')"
          :edit-render="{name: '$input', props: {readonly: true}}"
        />
        <vxe-table-column
          min-width="150"
          field="CHECKIN_OPERATOR"
          :title="$t('AndonCallRecord._19')"
          :edit-render="{name: '$input', props: {readonly: true}}"
        />
        <vxe-table-column
          min-width="150"
          field="END_TIME"
          :title="$t('AndonCallRecord._20')"
          :edit-render="{name: '$input', props: {readonly: true}}"
        />
        <vxe-table-column
          :title="$t('plbd.tb_og')"
          min-width="170"
          align="center"
          fixed="right"
          v-if="$btnList.indexOf('AndonCallRecordEdit') !== -1 || $btnList.indexOf('AndonCallRecordAdd') !== -1"
        >
          <template v-slot="{ row }">
            <el-button type="primary" @click="editClick(row, row.$index)">{{$t('AndonCallRecord._21')}}</el-button>
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
    <!-- 编辑 -->
    <el-dialog
      :close-on-click-modal="false"
      v-dialogDrag
      :title="$t('AndonCallRecord._22')"
      width="60%"
      :visible.sync="dialogTableVisible"
    >
      <el-form ref="editForm" label-width="170px" :model="editForm">
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('AndonCallRecord._6')">
              <el-input disabled v-model="editForm.CALL_NO" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('AndonCallRecord._23')">
              <el-input disabled v-model="editForm.OPERATION_LINE_NAME" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('AndonCallRecord._24')">
              <el-input disabled v-model="editForm.Part_NO" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('AndonCallRecord._25')">
              <el-input disabled v-model="editForm.Part_Size" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('AndonCallRecord._26')">
              <el-input disabled v-model="editForm.WO_NO" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('AndonCallRecord._27')">
              <el-input v-model="editForm.TO_USER" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('AndonCallRecord._28')">
              <el-input
                type="textarea"
                :autosize="{ minRows: 3, maxRows:6 }"
                disabled
                v-model="editForm.CALL_CONTENT"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('AndonCallRecord._29')" prop="HANDLE_CONTENT">
              <el-input
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 6}"
                v-model="editForm.HANDLE_CONTENT"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item :label="$t('AndonCallRecord._30')">
            <el-input
              type="textarea"
              :autosize="{ minRows: 3, maxRows: 6}"
              v-model="editForm.SOLUTION"
            />
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item :label="$t('AndonCallRecord._31')">
            <el-radio-group v-model="editForm.HANDLE_STATUS">
              <el-radio :label="0">{{$t('AndonCallRecord._32')}}</el-radio>
              <el-radio :label="1">{{$t('AndonCallRecord._33')}}</el-radio>
              <el-radio :label="2">{{$t('AndonCallRecord._34')}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">{{$t('ssc_rd.cancel')}}</el-button>
        <el-button type="primary" @click="submitaddForm">{{$t('ssc_rd.sure')}}</el-button>
      </span>
    </el-dialog>
  </d2-container>
</template>

<script>
import customContainerHeader from '@/components/custom-container-header'
import pagination from '@/views/mixin/page'
import { mapGetters } from 'vuex'
import {
  Index,
  RuleConfigIndex,
  LoadData,
  LoadEditData,
  InsertRecordHandleData,
  SaveRecordHandleData
} from '@/api/AndonCallRecord'
export default {
  name: 'AndonCallRecord',
  components: {
    customContainerHeader
  },
  mixins: [pagination],
  data () {
    return {
      formData: {
        Page: 1,
        Limit: 15
      },
      time: {},
      lineList: [],
      statusList: [
        { value: 0, label: this.$t('AndonCallRecord._35') },
        { value: 1, label: this.$t('AndonCallRecord._36') },
        { value: 2, label: this.$t('AndonCallRecord._37') },
        { value: 3, label: this.$t('AndonCallRecord._38') }
      ],
      titleList: [],
      loading: false,
      mainTable: [],
      dialogTableVisible: false,
      editForm: {},
      HANDLE_ID: -1
    }
  },
  computed: {
    ...mapGetters(['userinfo'])
  },
  created () {
    this.getIndex()
  },
  methods: {
    async getIndex () {
      const res = await Index()
      if (res.Result) {
        this.getLoadData()
        this.getRuleConfigIndex()
      }
    },
    async getRuleConfigIndex () {
      const res = await RuleConfigIndex()
      if (res.Result) {
        this.lineList = res.Result.LINE_NAME
      }
    },
    async getLoadData () {
      this.loading = true
      const res = await LoadData(this.formData)
      if (res.Result) {
        this.mainTable = res.Result
        this.totalPage = res.TotalCount
        this.loading = false
      } else {
        this.loading = false
      }
    },
    // 搜索
    searchClick () {
      // console.log(this.time)
      this.formData.STARTDATE = ''
      this.formData.ENDDATE = ''
      if (this.time || this.time !== null) {
        this.formData.STARTDATE = this.time[0]
        this.formData.ENDDATE = this.time[1]
      }
      this.formData.Page = 1
      this.getLoadData()
    },
    // 添加结果
    editClick (row) {
      // console.log(row)
      this.getLoadEditData(row.ID)
      this.dialogTableVisible = true
    },
    async getLoadEditData (e) {
      const res = await LoadEditData({ ID: e })
      this.editForm = res.Result ? res.Result[0] : []
      this.HANDLE_ID = res.Result ? res.Result[0].HANDLE_ID : -1
    },
    // 保存
    submitaddForm () {
      if (!this.editForm.HANDLE_CONTENT) return this.$message.error('请输入原因分析')
      const nowDate = this.getNowDate(new Date())
      this.saveForm = {
        MST_ID: this.editForm.ID,
        HANDLER: this.userinfo.USER_NAME,
        HANDLE_TIME: nowDate,
        HANDLE_CONTENT: this.editForm.HANDLE_CONTENT,
        HANDLE_STATUS: this.editForm.HANDLE_STATUS,
        TO_USER: this.editForm.TO_USER,
        SOLUTION: this.editForm.SOLUTION
      }
      console.log('保存资料：', JSON.stringify(this.saveForm))
      if (this.HANDLE_ID <= 0) {
        InsertRecordHandleData(this.saveForm).then((res) => {
          if (res.Result) {
            this.getLoadData()
            this.$notify({
              title: this.$t('cdc._21'),
              message: this.$t('cdc._22'),
              type: 'success',
              duration: 2000
            })
          }
          this.dialogTableVisible = false
        })
      } else {
        SaveRecordHandleData(this.saveForm).then((res) => {
          if (res.Result) {
            this.getLoadData()
            this.$notify({
              title: this.$t('cdc._21'),
              message: this.$t('cdc._22'),
              type: 'success',
              duration: 2000
            })
          }
          this.dialogTableVisible = false
        })
      }
    },
    // 获取当前时间
    getNowDate (date) {
      var y = date.getFullYear()
      var m = date.getMonth() + 1
      m = m < 10 ? '0' + m : m
      var d = date.getDate()
      d = d < 10 ? '0' + d : d
      var h = date.getHours()
      h = h < 10 ? '0' + h : h
      var minute = date.getMinutes()
      minute = minute < 10 ? '0' + minute : minute
      var second = date.getSeconds()
      second = second < 10 ? '0' + second : second
      return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
    }
  }
}
</script>

<style>
</style>
