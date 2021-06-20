<template>
  <d2-container>
    <!-- 头部 -->
    <template slot="header">
      <custom-container-header :isExport="false" :isExportTpl="false" :isImport="false">
        <el-input
          clearable
          v-model="formData.Key"
          :placeholder="'请输入关键词'"
          style="width:200px"
          @keyup.enter.native="searchClick"
        />&nbsp;
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
          field="TAR_DATE"
          :title="'日期'"
          :edit-render="{name: '$input', props: {readonly: true}}"
        />
        <vxe-table-column
          min-width="150"
          field="TITLE"
          :title="'标题'"
          :edit-render="{name: '$input', props: {readonly: true}}"
        />
        <vxe-table-column
          min-width="150"
          field="TAG"
          :title="'标签'"
          :edit-render="{name: '$input', props: {readonly: true}}"
        />
        <vxe-table-column
          min-width="150"
          field="REMARK"
          :title="'备注'"
          :edit-render="{name: '$input', props: {readonly: true}}"
        />
        <vxe-table-column
          min-width="150"
          field="CRATED_TIME"
          :title="'创建时间'"
          :edit-render="{name: '$input', props: {readonly: true}}"
        />
        <vxe-table-column
          min-width="150"
          field="CREATED_BY"
          :title="'创建人'"
          :edit-render="{name: '$input', props: {readonly: true}}"
        />
        <!-- <vxe-table-column min-width="150" field="STATUS" :title="'显示状态'">
          <template v-slot="{ row }">
            <span v-if="row.STATUS === 0">隐藏</span>
            <span v-else-if="row.STATUS === 1">显示</span>
          </template>
        </vxe-table-column>
        <vxe-table-column min-width="150" field="FLAG" :title="'软删除标记'">
          <template v-slot="{ row }">
            <span v-if="row.FLAG === 0">已删除</span>
            <span v-else-if="row.FLAG === 1">正常</span>
          </template>
        </vxe-table-column> -->
        <vxe-table-column :title="$t('as_cfe.tb_og')" min-width="150" align="center" fixed="right">
          <template v-slot="{ row }">
            <el-button
              type="primary"
              @click="editClick(row, row.$index)"
            >{{ $t('publics.btn.edit') }}</el-button>
            <el-button type="danger" @click="removeClick(row, row.$index)">{{ $t('as_cfe.tb_rm') }}</el-button>
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
      v-dialogDrag
      :visible.sync="dialogVisible"
      :title="dialogTitle"
      width="60%"
      :close-on-click-modal="false"
    >
      <el-form
        ref="editForm"
        :model="editForm"
        label-width="120px"
        :show-message="false"
        style="height:100%"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item :label="'日期'">
              <el-date-picker
                v-model="editForm.TAR_DATE"
                type="date"
                placeholder="选择日期时间"
                value-format="yyyy-MM-dd"
                style="width:100%"
              />
              <!-- <el-input v-model="editForm.TAR_DATE" :placeholder="'请输入日期'" /> -->
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'标题'">
              <el-input v-model="editForm.TITLE" :placeholder="'请输入标题'" maxlength='6' show-word-limit />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="'标签'">
              <el-input v-model="editForm.TAG" :placeholder="'请输入标签'" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'备注'">
              <el-input v-model="editForm.REMARK" :placeholder="'请输入备注'" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="'创建时间'">
              <el-date-picker
                v-model="editForm.CRATED_TIME"
                type="date"
                placeholder="选择日期时间"
                value-format="yyyy-MM-dd"
                style="width:100%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'创建人'">
              <el-input v-model="editForm.CREATED_BY" :placeholder="'请输入创建人'" disabled />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-row>
          <el-col :span="12">
            <el-form-item :label="'显示状态'">
              <el-select style="width:100%" v-model="editForm.STATUS" :placeholder="'请选择显示状态'">
                <el-option
                  v-for="item in statusList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'软删除标记'">
              <el-select style="width:100%" v-model="editForm.FLAG" :placeholder="'请选择软删除标记'">
                <el-option
                  v-for="item in flagList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row> -->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">{{$t('ssc_rd.cancel')}}</el-button>
        <el-button type="primary" @click="saveClick">{{$t('ssc_rd.sure')}}</el-button>
      </span>
    </el-dialog>
  </d2-container>
</template>

<script>
import customContainerHeader from '@/components/custom-container-header'
import pagination from '@/views/mixin/page'
import {
  Index,
  MesHomeMemorandumLoadData,
  SaveData,
  DeleteOneById
} from '@/api/MesHomeMemorandum'
import { mapGetters } from 'vuex'
export default {
  name: 'MesHomeMemorandum',
  components: {
    customContainerHeader
  },
  mixins: [pagination],
  computed: {
    ...mapGetters(['userinfo'])
  },
  data () {
    return {
      formData: {
        Page: 1,
        Limit: 15
      },
      loading: false,
      mainTable: [],
      dialogVisible: false,
      statusList: [
        { label: '隐藏', value: 0 },
        { label: '显示', value: 1 }
      ],
      flagList: [
        { label: '已删除', value: 0 },
        { label: '正常', value: 1 }
      ],
      editForm: {},
      dialogTitle: '',
      isNew: undefined,
      form: {
        InsertRecords: [],
        UpdateRecords: [],
        RemoveRecords: []
      }
    }
  },
  created () {
    this.getIndex()
  },
  methods: {
    async getIndex () {
      const res = await Index()
      if (res.Result) {
        this.getLoadData()
      }
    },
    async getLoadData () {
      this.loading = true
      const res = await MesHomeMemorandumLoadData(this.formData)
      if (res.Result) {
        this.mainTable = res.Result
        this.totalPage = res.TotalCount
        this.loading = false
      } else {
        this.loading = false
      }
    },
    searchClick () {
      this.formData.Page = 1
      this.getLoadData()
    },
    addClick () {
      this.dialogTitle = '新增'
      this.editForm = {}
      const nowDate = this.getNowDate(new Date())
      this.editForm.CRATED_TIME = nowDate
      this.editForm.CREATED_BY = this.userinfo.USER_NAME
      this.dialogVisible = true
      this.isNew = true
    },
    // 编辑
    editClick (row) {
      this.dialogTitle = '编辑'
      this.editForm = row
      this.editForm.TITLE = row.TITLE.trim()
      this.dialogVisible = true
      this.isNew = false
    },
    // 提交
    saveClick () {
      this.form = {
        InsertRecords: [],
        UpdateRecords: [],
        RemoveRecords: []
      }
      if (this.isNew) {
        this.form.InsertRecords.push(this.editForm)
      } else {
        this.form.UpdateRecords.push(this.editForm)
      }
      console.log(JSON.stringify(this.form))
      SaveData(this.form).then((res) => {
        if (res.Result) {
          this.getLoadData()
          this.$notify({
            title: this.$t('sao._12'),
            message: this.$t('sao._13'),
            type: 'success',
            duration: 2000
          })
          this.dialogVisible = false
        }
        this.dialogVisible = false
      })
    },
    // 删除
    removeClick (row) {
      console.log(row.ID)
      this.$confirm(
        this.$t('publics.tips.makeSureDelete'),
        this.$t('MesTongsApply._91'),
        {
          confirmButtonText: this.$t('MesTongsApply._92'),
          cancelButtonText: this.$t('MesTongsApply._93'),
          type: 'warning'
        }
      )
        .then(async () => {
          // this.$refs.xTable.remove(row)
          // this.saveClick()
          DeleteOneById(row.ID).then(res => {
            if (res.Result) {
              this.getLoadData()
              this.$notify({
                title: this.$t('as_src.su'),
                message: this.$t('as_src.su_rm'),
                type: 'success',
                duration: 2000
              })
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('MesTongsApply._95')
          })
        })
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
