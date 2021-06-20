<template>
  <d2-container>
    <template slot="header">
      <custom-container-header>
        <el-input v-model="formData.Key" style="width: 200px" clearable :placeholder="''" />
        <el-button
          type="primary"
          icon="el-icon-search"
          @click.prevent="searchClick"
        >{{ $t('plbd.hd_sf') }}</el-button>
        <el-button type="success" @click="insertEvent(null)" icon="el-icon-plus">{{ $t('plbd.add') }}</el-button>
        <!-- <el-button
          type="success"
          icon="el-icon-check"
          @click.prevent="saveClick"
        >{{ $t('publics.btn.save') }}</el-button> -->
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
        highlight-current-row
        highlight-hover-row
        show-overflow
        auto-resize
        keep-source
        stripe
        :loading="loading"
        :data="mainTable"
        :mouse-config="{selected: true}"
        :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
        :radio-config="{labelField: 'name', trigger: 'row'}"
        :checkbox-config="{checkField: 'checked', trigger: 'row'}"
      >
        <!-- <vxe-table-column
          min-width="150"
          field="SQL"
          :title="'sql语句'"
          :edit-render="{name: '$input', props: {readonly: true}}"
        />
        <vxe-table-column
          min-width="150"
          field="COLUMN_CONFIG"
          :title="'字段配置 JSON'"
          :edit-render="{name: 'input'}"
        />
        <vxe-table-column
          min-width="150"
          field="TOOLBAR_CONFIG"
          :title="'工具栏配置 JSON'"
          :edit-render="{name: 'input'}"
        /> -->
        <vxe-table-column
          min-width="150"
          field="ACTION_NAME"
          :title="'报表名称'"
          :edit-render="{name: 'input', props: {readonly: true}}"
        />
        <vxe-table-column
          min-width="150"
          field="CREATE_DATE"
          :title="'创建日期'"
          :edit-render="{name: 'input', props: {readonly: true}}"
        />
        <vxe-table-column
          min-width="150"
          field="LAST_EDIT_DATE"
          :title="'最后修改日期'"
          :edit-render="{name: 'input', props: {readonly: true}}"
        />
        <vxe-table-column
          min-width="150"
          field="REMARK"
          :title="'备注'"
          :edit-render="{name: 'input', props: {readonly: true}}"
        />
        <vxe-table-column :title="$t('as_cfe.tb_og')" min-width="150" align="center" fixed="right">
          <template v-slot="{ row }">
            <el-button type="primary" @click="editRow(row, row.$index)">{{ $t('publics.btn.edit') }}</el-button>
            <el-button type="danger" @click="removeClick({RemoveRecords: [row]})">{{ $t('as_cfe.tb_rm') }}</el-button>
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
    <!-- modal -->
    <el-dialog
      class="x-xdia"
      v-dialogDrag
      :title="dialogText"
      :visible.sync="dialogVisible"
      width="40%"
      :close-on-click-modal="false"
    >
      <div>
        <el-form
          ref="modifyForm"
          :model="modifyForm"
          :rules="validRules"
          :show-message="false"
          class="custom-form"
          label-position="top"
        >
          <el-form-item :label="'报表名称'" prop="ACTION_NAME">
            <el-input v-model="modifyForm.ACTION_NAME" clearable placeholder=" "></el-input>
          </el-form-item>
          <el-form-item :label="'sql语句配置'" prop="SQL">
            <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 5}" v-model="modifyForm.SQL" placeholder=" " clearable></el-input>
          </el-form-item>
          <el-form-item :label="'字段配置'" prop="COLUMN_CONFIG">
            <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 5}" v-model="modifyForm.COLUMN_CONFIG" placeholder=" " clearable></el-input>
          </el-form-item>
          <el-form-item :label="'工具栏配置'" prop="TOOLBAR_CONFIG">
            <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 5}" v-model="modifyForm.TOOLBAR_CONFIG" placeholder=" " clearable></el-input>
          </el-form-item>
          <el-form-item :label="'备注'" prop="REMARK">
            <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 5}" v-model="modifyForm.REMARK" placeholder=" " clearable></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">{{$t('ssc_rd.cancel')}}</el-button>
        <el-button type="primary" @click="submitModifyForm">{{$t('ssc_rd.sure')}}</el-button>
      </span>
    </el-dialog>
  </d2-container>
</template>

<script>
import pagination from '@/views/mixin/page'
import customContainerHeader from '@/components/custom-container-header'
import CURD from '@/views/mixin/CURD'
import helper from '@/api/Helper'
import { cloneDeep } from 'lodash'
const API = helper('ReportMst')
export default {
  name: 'ReportMst',
  data () {
    return {
      formData: {
        Page: 1,
        Limit: 15
      },
      loading: false,
      mainTable: [
        {
          ID: 1,
          SQL: 'string',
          COLUMN_CONFIG: 'string',
          TOOLBAR_CONFIG: 'string',
          CREATE_DATE: '2020-08-05T08:18:31.133Z',
          LAST_EDIT_DATE: '2020-08-05T08:18:31.133Z',
          ACTION_NAME: 'string',
          REMARK: 'string',
          ENABLED: 'string'
        }
      ],
      dialogVisible: false,
      dialogText: '',
      modifyForm: {},
      validRules: {
        ACTION_NAME: [{ required: true,
          message: '请输入报表名称' }],
        SQL: [{ required: true, message: '请输入sql语句配置' }],
        COLUMN_CONFIG: [{ required: true, message: '请输入字段配置' }],
        TOOLBAR_CONFIG: [{ required: true, message: '请输入工具栏配置' }]
      }
    }
  },
  methods: {
    async getLoadData () {
      this.loading = true
      const res = await API.LoadData(this.formData)
      if (res.Result) {
        // this.mainTable = res.Result
        console.log(this.mainTable, '获取表格')
        this.TotalCount = res.TotalCount
      }
      this.loading = false
    },
    // 搜索
    searchClick () {
      this.formData.Page = 1
      this.getLoadData()
    },
    // 新增
    insertEvent (row) {
      // const record = {
      //   ID: 0,
      //   SQL: '',
      //   COLUMN_CONFIG: '',
      //   TOOLBAR_CONFIG: 'tring',
      //   CREATE_DATE: '',
      //   LAST_EDIT_DATE: '',
      //   ACTION_NAME: 'string',
      //   REMARK: '',
      //   ENABLED: ''
      // }
      // this.$refs.xTable.insertAt(record, row).then(({ row }) => {
      //   this.$refs.xTable.setActiveRow(row)
      // })
      this.dialogVisible = true
      this.modifyForm = {
        ENABLED: 'Y'
      }
      this.dialogText = this.$t('publics.btn.add')
    },
    // 提交
    submitModifyForm () {
      // 直接抄
      this.$refs.modifyForm.validate(async (valid, errInfo) => {
        if (valid) {
          let form = {}
          if (this.modifyForm.ID) {
            form = {
              UpdateRecords: [this.modifyForm]
            }
          } else {
            this.modifyForm.ID = 0
            form = {
              InsertRecords: [this.modifyForm]
            }
          }
          console.log(JSON.stringify(form))
          const res = await API.SaveData(form)
          if (res.Result) {
            this.$notify({
              title: this.$t('ssc._12'),
              message: this.$t('ssc._13'),
              type: 'success',
              duration: 2000
            })
            this.resetForm()
          }
        } else {
          try {
            Object.keys(errInfo).forEach((item) => {
              this.$message.error(errInfo[item][0].message)
              throw Error(errInfo[item][0].message)
            })
          } catch (e) {
            console.log(e.message)
          }
        }
      })
    },
    editRow (row) {
      const modifyForm = cloneDeep(row)
      modifyForm.ENABLED = 'Y'
      this.$set(this, 'modifyForm', modifyForm)
      this.dialogVisible = true
      this.dialogText = this.$t('publics.btn.edit')
    }
  },
  components: {
    customContainerHeader
  },
  mixins: [
    pagination,
    CURD({
      defaultSaveAPI: (e) => API.SaveData(e)
    })
  ],
  created () {
    this.getLoadData()
  }
}
</script>

<style lang="scss" scoped>
</style>

<style>
  .x-xdia .el-dialog {
    margin-top: 5vh!important;
  }
</style>
