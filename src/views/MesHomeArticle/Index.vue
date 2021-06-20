<template>
  <d2-container>
    <template slot="header">
      <custom-container-header :isExport="false"
                               :isExportTpl="false"
                               :isImport="false">
        <el-input clearable
                  v-model="formData.Key"
                  :placeholder="'请输入文章标题'"
                  style="width: 200px"></el-input>
        <el-button type="primary"
                   icon="el-icon-search"
                   @click.prevent="searchClick">{{$t('publics.btn.search')}}</el-button>&nbsp;
        <el-button type="success"
                   icon="el-icon-plus"
                   @click.prevent="addClick">{{$t('publics.btn.add')}}</el-button>&nbsp;
      </custom-container-header>
    </template>
    <div class="table-container">
      <vxe-table ref="xTable"
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
                 :seq-config="{startIndex: (formData.Page - 1) * formData.Limit}"
                 :mouse-config="{selected: true}"
                 :edit-config="{trigger: 'click', mode: 'row', showStatus: true}">
        <vxe-table-column type="seq"
                          width="60"></vxe-table-column>
        <vxe-table-column min-width="200"
                          field="TITLE"
                          :title="'标题'"
                          :edit-render="{name: '$input', props: {readonly: true}}">
          <template slot-scope="scope">
            <div>
              <el-tag effect="dark"
                      v-if="scope.row.IS_TOP"
                      style="margin-right: 10px"
                      size="mini"
                      type="danger">
                置顶
              </el-tag>
              <span>{{ scope.row.TITLE }}</span>
            </div>
          </template>
        </vxe-table-column>
        <vxe-table-column min-width="150"
                          field="SORT_DESC"
                          :title="'简评'"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column min-width="150"
                          field="TAG"
                          :title="'标签'"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column min-width="180"
                          field="CRATED_TIME"
                          :title="'创建时间'"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column min-width="180"
                          field="UPDATED_TIME"
                          :title="'更新时间'"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column min-width="150"
                          field="CREATED_BY"
                          :title="'创建人'"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column min-width="150"
                          field="UPDATED_BY"
                          :title="'更新人'"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column :title="$t('as_cfe.tb_og')"
                          min-width="220"
                          align="center"
                          fixed="right">
          <template v-slot="{ row }">
            <el-button @click="PreviewInfo(row, row.$index)">预览</el-button>
            <el-button type="primary"
                       @click="editClick(row, row.$index)">{{ $t('publics.btn.edit') }}</el-button>
            <el-button type="danger"
                       @click="removeClick(row, row.$index)">{{ $t('as_cfe.tb_rm') }}</el-button>
          </template>
        </vxe-table-column>
      </vxe-table>
    </div>
    <template slot="footer">
      <el-pagination :current-page="formData.Page"
                     :page-size="formData.Limit"
                     :page-sizes="[15, 25, 35, 45]"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="totalPage"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange" />
    </template>
    <!-- 编辑 -->
    <el-dialog class="custom-x-x-x-dialog"
               v-dialogDrag
               :modal="false"
               :visible.sync="dialogVisible"
               :title="dialogTitle"
               width="100%"
               :close-on-click-modal="false">
      <el-form ref="editForm"
               :model="editForm"
               label-width="120px"
               :show-message="false"
               style="height:100%"
               :rules="rules">
        <el-row>
          <el-col :span="8">
            <el-form-item :label="'标题'"
                          prop="TITLE">
              <el-input v-model="editForm.TITLE"
                        :placeholder="'请输入标题'" />
            </el-form-item>
            <el-form-item label="是否置顶">
              <el-switch v-model="editForm.IS_TOP"
                         active-color="#13ce66"
                         :active-value="1"
                         :inactive-valu="0"
                         inactive-color="#ff4949">
              </el-switch>
            </el-form-item>
            <el-form-item :label="'创建人'"
                          prop="CREATED_BY">
              <el-input v-model="editForm.CREATED_BY"
                        :placeholder="'请输入创建人'"
                        :disabled="!isNew" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="'简评'"
                          prop="SORT_DESC">
              <el-input v-model="editForm.SORT_DESC"
                        placeholder=" " />
            </el-form-item>
            <el-form-item label="排序">
              <el-input type="number"
                        v-model="editForm.SORT"
                        placeholder=" "></el-input>
            </el-form-item>
            <el-form-item :label="'更新时间'"
                          prop="UPDATED_TIME">
              <el-date-picker :disabled="isNew"
                              v-model="editForm.UPDATED_TIME"
                              type="datetime"
                              placeholder="选择日期时间"
                              value-format="yyyy-MM-dd"
                              style="width:100%" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="'标签'"
                          prop="TAG">
              <el-input v-model="editForm.TAG"
                        :placeholder="' '" />
            </el-form-item>
            <el-form-item :label="'创建时间'"
                          prop="CRATED_TIME">
              <el-date-picker :disabled="!isNew"
                              v-model="editForm.CRATED_TIME"
                              type="datetime"
                              placeholder="选择日期时间"
                              value-format="yyyy-MM-dd"
                              style="width:100%" />
            </el-form-item>
            <el-form-item :label="'更新人'">
              <el-input v-model="editForm.UPDATED_BY"
                        :placeholder="'请输入更新人'"
                        :disabled="isNew" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item :label="'内容（副文本）'"
                          prop="CONTENT">
              <customTinymce ref="editor"
                             v-model="editForm.CONTENT"></customTinymce>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">{{$t('ssc_rd.cancel')}}</el-button>
        <el-button type="primary"
                   @click="saveClick">{{$t('ssc_rd.sure')}}</el-button>
      </span>
    </el-dialog>
  </d2-container>
</template>

<script>
import customContainerHeader from '@/components/custom-container-header'
import pagination from '@/views/mixin/page'
import { mapGetters } from 'vuex'
import { Index, MesHomeArticleLoadData, SaveData } from '@/api/MesHomeArticle'
import customTinymce from '@/components/custom-tinymce'
export default {
  name: 'MesHomeArticle',
  components: {
    customContainerHeader,
    customTinymce
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
      typeList: [
        { label: '默认值', value: 0 },
        { label: '通知公告', value: 1 },
        { label: '预警信息', value: 2 },
        { label: '代办事项', value: 3 }
      ],
      ttList: [
        { label: '默认值', value: 0 },
        { label: '个人', value: 1 }
      ],
      loading: false,
      mainTable: [],
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
      dialogVisible: false,
      form: {
        InsertRecords: [],
        UpdateRecords: [],
        RemoveRecords: []
      },
      rules: {
        TYPE: [
          {
            required: true,
            message: '请填写必填项',
            trigger: 'blur'
          }
        ],
        TARGET_TYPE: [
          {
            required: true,
            message: '请填写必填项',
            trigger: 'blur'
          }
        ],
        TARGET: [
          {
            required: true,
            message: '请填写必填项',
            trigger: 'blur'
          }
        ],
        TITLE: [
          {
            required: true,
            message: '请填写必填项',
            trigger: 'blur'
          }
        ],
        SORT_DESC: [
          {
            required: true,
            message: '请填写必填项',
            trigger: 'blur'
          }
        ],
        CONTENT: [
          {
            required: true,
            message: '请填写必填项',
            trigger: 'blur'
          }
        ],
        TAG: [
          {
            required: true,
            message: '请填写必填项',
            trigger: 'blur'
          }
        ],
        CRATED_TIME: [
          {
            required: true,
            message: '请填写必填项',
            trigger: 'blur'
          }
        ],
        UPDATED_TIME: [
          {
            required: true,
            message: '请填写必填项',
            trigger: 'blur'
          }
        ],
        CREATED_BY: [
          {
            required: true,
            message: '请填写必填项',
            trigger: 'blur'
          }
        ],
        STATUS: [
          {
            required: true,
            message: '请填写必填项',
            trigger: 'blur'
          }
        ],
        FLAG: [
          {
            required: true,
            message: '请填写必填项',
            trigger: 'blur'
          }
        ]
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
      const res = await MesHomeArticleLoadData(this.formData)
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
      delete this.rules.UPDATED_TIME
      this.editForm.CREATED_BY = this.userinfo.USER_NAME
      this.editForm.UPDATED_BY = this.userinfo.USER_NAME
      this.editForm.UPDATED_TIME = nowDate
      this.isNew = true
      this.dialogVisible = true
    },
    editClick (row) {
      this.dialogTitle = '编辑'
      this.editForm = row
      const nowDate = this.getNowDate(new Date())
      this.rules.UPDATED_TIME = [
        {
          required: true,
          message: '请填写必填项',
          trigger: 'blur'
        }
      ]
      this.editForm.UPDATED_TIME = nowDate
      this.editForm.UPDATED_BY = this.userinfo.USER_NAME
      this.isNew = false
      this.dialogVisible = true
    },
    saveClick () {
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          this.form = {
            InsertRecords: [],
            UpdateRecords: [],
            RemoveRecords: []
          }
          if (this.isNew) {
            this.form.InsertRecords.push({
              ID: 0,
              TYPE: 1,
              TARGET_TYPE: 1,
              TARGET: 'x',
              TITLE: this.editForm.TITLE || '',
              SORT_DESC: this.editForm.SORT_DESC || '',
              CONTENT: this.editForm.CONTENT || '',
              TAG: this.editForm.TAG || '',
              CRATED_TIME: this.editForm.CRATED_TIME || '',
              UPDATED_TIME: this.editForm.UPDATED_TIME || '',
              CREATED_BY: this.editForm.CREATED_BY || '',
              UPDATED_BY: this.editForm.UPDATED_BY || '',
              IS_TOP: this.editForm.IS_TOP || 0,
              SORT: this.editForm.SORT || 0,
              STATUS: 1,
              FLAG: 1
            })
          } else {
            this.form.UpdateRecords.push({
              ID: this.editForm.ID,
              TYPE: 1,
              TARGET_TYPE: 1,
              TARGET: 'x',
              TITLE: this.editForm.TITLE || '',
              SORT_DESC: this.editForm.SORT_DESC || '',
              CONTENT: this.editForm.CONTENT || '',
              TAG: this.editForm.TAG || '',
              CRATED_TIME: this.editForm.CRATED_TIME || '',
              UPDATED_TIME: this.editForm.UPDATED_TIME || '',
              CREATED_BY: this.editForm.CREATED_BY || '',
              UPDATED_BY: this.editForm.UPDATED_BY || '',
              IS_TOP: this.editForm.IS_TOP || 0,
              SORT: this.editForm.SORT || 0,
              STATUS: 1,
              FLAG: 1
            })
          }
          SaveData(this.form).then((res) => {
            if (res.Result) {
              this.formData.Page = 1
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
        }
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
    },
    removeClick (row, index) {
      this.$confirm('确定要删除该记录吗？', '提示', {
        confirmButtonText: this.$t('sld.confirm'),
        cancelButtonText: this.$t('sld.cancel'),
        type: 'warning'
      }).then(async _ => {
        const RemoveRecords = [row]
        const res = await SaveData({ RemoveRecords })
        if (res.Result) {
          this.$notify.success({
            title: '成功',
            message: '删除成功'
          })
          this.mainTable.splice(index, 1)
        }
      })
    },
    PreviewInfo (row, index) {
      this.$router.push({
        path: '/PreviewArticle/index',
        query: row
      })
    }
  }
}
</script>

<style>
.custom-x-x-x-dialog {
  z-index: 9 !important;
}
.custom-x-x-x-dialog .el-dialog {
  margin-top: 0 !important;
  margin-bottom: 0 !important;
  min-height: 100vh;
}
</style>
