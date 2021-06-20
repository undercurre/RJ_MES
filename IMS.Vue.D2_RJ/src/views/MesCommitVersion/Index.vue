<template>
  <d2-container>
    <template slot="header">
      <custom-container-header :isExport="false" :isExportTpl="false" :isImport="false">
        <el-input
          clearable
          v-model="formData.Key"
          :placeholder="$t('mvc._1')"
          style="width:220px"
          @keyup.enter.native="searchClick"
        />
        <el-button
          type="primary"
          icon="el-icon-search"
          @click.prevent="searchClick"
        >{{$t('publics.btn.search')}}</el-button>
        <el-button
          type="success"
          icon="el-icon-plus"
          @click.prevent="addClick"
        >{{$t('publics.btn.add')}}</el-button>
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
        :radio-config="{labelField: 'name', trigger: 'row'}"
        :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
      >
        <vxe-table-column type="seq" width="60"></vxe-table-column>
        <vxe-table-column
          min-width="150"
          field="TITLE"
          :title="$t('mvc._2')"
          :edit-render="{name: '$input', props: {readonly: true}}"
        />
        <vxe-table-column
          min-width="200"
          field="CRATED_TIME"
          :title="$t('mvc._6')"
          :edit-render="{name: '$input', props: {readonly: true}}"
        />
        <vxe-table-column
          min-width="220"
          field="UPDATED_TIME"
          :title="$t('mvc._7')"
          :edit-render="{name: '$input', props: {readonly: true}}"
        />
        <vxe-table-column
          min-width="150"
          field="CREATED_BY"
          :title="$t('mvc._8')"
          :edit-render="{name: '$input', props: {readonly: true}}"
        />
        <vxe-table-column
          min-width="150"
          field="UPDATED_BY"
          :title="$t('mvc._9')"
          :edit-render="{name: '$input', props: {readonly: true}}"
        />
        <vxe-table-column :title="$t('plbd.tb_og')" width="220" align="center" fixed="right">
          <template v-slot="{ row }">
            <el-button>预览</el-button>
            <el-button
              type="primary"
              @click="editClick(row, row.$index)"
            >{{ $t('publics.btn.edit') }}</el-button>
            <el-button
              type="danger"
              @click="removeClick(row, row.$index)"
            >{{ $t('publics.btn.delete') }}</el-button>
          </template>
        </vxe-table-column>
      </vxe-table>
    </div>
    <template v-slot:footer>
      <div class="ConfirmPagination">
        <el-pagination
          :current-page="formData.Page"
          :page-size="formData.Limit"
          :page-sizes="[15, 25, 35, 45]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalPage"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </template>
    <el-dialog
      v-dialogDrag
      width="100%"
      :modal="false"
      :title="addorediText"
      :visible.sync="innerVisible"
      :close-on-click-modal="false"
      class="maxSizeDialog"
    >
      <el-form
        ref="callVal"
        :show-message="false"
        :model="callVal"
        :rules="rules"
        label-width="110px"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item :label="$t('mvc._2')" prop="TITLE">
              <el-input v-model="callVal.TITLE" placeholder style="width: 100%" />
            </el-form-item>
            <el-form-item :label="'更新人'">
              <el-input :disabled="!isEdit" v-model="callVal.UPDATED_BY" placeholder=" " style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="创建人" prop="CREATED_BY">
              <el-input :disabled="isEdit" v-model="callVal.CREATED_BY" placeholder=" " style="width: 100%"></el-input>
            </el-form-item>
            <el-form-item label="更新时间">
              <el-date-picker
                :disabled="!isEdit"
                v-model="callVal.UPDATED_TIME"
                type="datetime"
                style="width: 100%"
                format="yyyy-MM-dd HH:mm:ss"
                :default-value="new Date()"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder=" "
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="创建时间">
              <el-date-picker
                :disabled="isEdit"
                v-model="callVal.CRATED_TIME"
                style="width: 100%"
                type="datetime"
                format="yyyy-MM-dd HH:mm:ss"
                :default-value="new Date()"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder=" "
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="内容" prop="CONTENT">
          <customTinymce ref="editor" v-model="callVal.CONTENT"></customTinymce>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="innerVisible=false">&nbsp;{{$t('mvc._14')}}&nbsp;</el-button>
        <el-button type="primary" @click="shout_but('callVal')">&nbsp;{{$t('cccn._17')}}&nbsp;</el-button>
      </span>
    </el-dialog>
  </d2-container>
</template>
<script>
import { LoadData, SaveData } from '@/api/MesCommitVersion'
import customContainerHeader from '@/components/custom-container-header'
import pagination from '@/views/mixin/page'
import customTinymce from '@/components/custom-tinymce'
import { mapGetters } from 'vuex'
import dayjs from 'dayjs'
export default {
  name: 'MesCommitVersion',
  components: {
    customContainerHeader,
    customTinymce
  },
  mixins: [pagination],
  data () {
    return {
      loading: false,
      mainTable: [],
      totalPage: 0,
      formData: { Key: '' },
      innerVisible: false,
      addorediText: '',
      callVal: {
        ID: 0,
        TITLE: undefined, // 标题
        SORT_DESC: undefined, // 简评
        CONTENT: undefined, // 内容
        TAG: '', // 标签
        CREATED_BY: '', // 创建
        UPDATED_BY: '', // 更新
        CRATED_TIME: '', // 创建时间
        UPDATED_TIME: '', // 更新时间
        STATUS: 0, // 显示状态
        FLAG: '' // 软删除
      },
      rules: {
        TITLE: [
          {
            required: true,
            message: this.$t('mvc._15'),
            trigger: 'blur'
          }
        ],
        SORT_DESC: [
          {
            required: true,
            message: this.$t('mvc._16'),
            trigger: 'blur'
          }
        ],
        CONTENT: [
          {
            required: true,
            message: this.$t('mvc._17'),
            trigger: 'blur'
          }
        ],
        TAG: [
          {
            required: true,
            message: this.$t('mvc._18'),
            trigger: 'blur'
          }
        ],
        FLAG: [
          {
            required: true,
            message: this.$t('mvc._19'),
            trigger: 'change'
          }
        ]
      },
      form: {
        InsertRecords: [],
        UpdateRecords: [],
        RemoveRecords: []
      },
      timeData: '',
      isEdit: false
    }
  },
  computed: {
    ...mapGetters(['userinfo'])
  },
  created () {
    this.getLoadData()
  },
  methods: {
    async getLoadData () {
      this.loading = true
      const res = await LoadData(this.formData)
      this.loading = false
      this.mainTable = res.Result || []
      this.totalPage = res.TotalCount || 0
    },
    searchClick () {
      this.formData.Page = 1
      this.drawer = false
      this.getLoadData()
    },
    handleSizeChange (val) {
      this.formData.Limit = val
      this.getLoadData()
    },
    handleCurrentChange (val) {
      this.formData.Page = val
      this.getLoadData()
    },
    addClick () {
      this.Eliminate()
      this.isEdit = false
      this.addorediText = this.$t('cccn._27')
      this.callVal.CRATED_TIME = dayjs().format('YYYY-MM-DD HH:mm:ss')
      this.callVal.CREATED_BY = this.userinfo.USER_NAME
      this.$set(this.callVal, 'UPDATED_BY', this.userinfo.USER_NAME)
      this.$set(this.callVal, 'UPDATED_TIME', dayjs().format('YYYY-MM-DD HH:mm:ss'))
      this.innerVisible = true
    },
    // 主表编辑
    editClick (row) {
      this.isEdit = true
      this.$set(this, 'callVal', row)
      this.$set(this.callVal, 'UPDATED_BY', this.userinfo.USER_NAME)
      this.$set(this.callVal, 'UPDATED_TIME', dayjs().format('YYYY-MM-DD HH:mm:ss'))
      this.addorediText = this.$t('cccn._19')
      this.innerVisible = true
    },
    // 确定
    shout_but () {
      this.$refs.callVal.validate(async (valid, errInfo) => {
        if (valid) {
          this.formEliminate()
          console.log(this.callVal)
          if (this.callVal.ID === 0) {
            this.form.InsertRecords.push({
              ID: 0,
              TITLE: this.callVal.TITLE || '',
              SORT_DESC: 'SORT_DESC',
              CONTENT: this.callVal.CONTENT || '',
              TAG: 'SORT_DESC',
              CRATED_TIME: this.callVal.CRATED_TIME || '',
              UPDATED_TIME: this.callVal.UPDATED_TIME || '',
              CREATED_BY: this.callVal.CREATED_BY || '',
              UPDATED_BY: this.callVal.UPDATED_BY || '',
              STATUS: 1,
              FLAG: 1
            })
          } else {
            this.form.UpdateRecords.push({
              ID: this.callVal.ID || 0,
              TITLE: this.callVal.TITLE || '',
              SORT_DESC: 'SORT_DESC',
              CONTENT: this.callVal.CONTENT || '',
              TAG: 'SORT_DESC',
              CRATED_TIME: this.callVal.CRATED_TIME || '',
              UPDATED_TIME: this.callVal.UPDATED_TIME || '',
              CREATED_BY: this.callVal.CREATED_BY || '',
              UPDATED_BY: this.callVal.UPDATED_BY || '',
              STATUS: 1,
              FLAG: 1
            })
          }
          const res = await SaveData(this.form)
          if (res.Result) {
            this.innerVisible = false
            this.getLoadData()
            this.$notify({
              title: this.$t('cccn._24'),
              message: this.$t('cccn._25'),
              type: 'success',
              duration: 2000
            })
          }
        } else {
          try {
            Object.keys(errInfo).forEach((item) => {
              this.$message.error(errInfo[item][0].message)
              throw new Error(new Date().toLocaleString())
            })
          } catch {}
        }
      })
    },
    // 删除
    removeClick (row) {
      this.formEliminate()
      this.form.RemoveRecords.push(row)
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
          const res = await SaveData(this.form)
          if (res.Result) {
            this.$message({
              type: 'success',
              message: this.$t('MesTongsApply._94')
            })
            this.getLoadData()
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('MesTongsApply._95')
          })
        })
    },
    // 清空
    Eliminate () {
      this.callVal = {
        ID: 0,
        TITLE: undefined, // 标题
        SORT_DESC: undefined, // 简评
        CONTENT: undefined, // 内容
        TAG: undefined, // 标签
        CREATED_BY: '', // 创建
        UPDATED_BY: '', // 更新
        CRATED_TIME: '', // 创建时间
        UPDATED_TIME: '', // 更新时间
        STATUS: 0, // 显示状态
        FLAG: '' // 软删除
      }
    },
    formEliminate () {
      this.form = {
        InsertRecords: [],
        UpdateRecords: [],
        RemoveRecords: []
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
