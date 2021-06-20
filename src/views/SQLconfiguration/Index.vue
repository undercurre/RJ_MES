<template>
  <d2-container>
    <template slot="header">
      <custom-container-header exportMehodsName="getLoadData"
                               :isExport="false"
                               :isExportTpl="false"
                               :isImport="false">
        <el-input v-model="formData.TOTABLE_NAME"
                  :placeholder="$t('sql._11')"
                  clearable
                  style="width:180px"
                  @keyup.enter.native="searchClick" />&nbsp;
        <el-input v-model="formData.DESC_CN"
                  :placeholder="$t('sql._12')"
                  clearable
                  style="width:180px"
                  @keyup.enter.native="searchClick" />&nbsp;
        <el-input v-model="formData.DESC_EN"
                  :placeholder="$t('sql._13')"
                  clearable
                  style="width:180px"
                  @keyup.enter.native="searchClick" />&nbsp;
        <el-button type="primary"
                   icon="el-icon-search"
                   @click.prevent="searchClick">{{ $t("sql._2") }}</el-button>
        <el-button v-if="$btnList.indexOf('SQLconfigurationAdd') !== -1"
                   type="success"
                   icon="el-icon-plus"
                   @click="addClick">
          {{ $t("sql._9") }}
        </el-button>
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
                 :mouse-config="{ selected: true }"
                 :edit-config="{ trigger: 'click', mode: 'row', showStatus: true }">
        <vxe-table-column field="TOTABLE_NAME"
                          :title="$t('sql._3')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column field="DESC_CN"
                          :title="$t('sql._4')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column field="DESC_EN"
                          :title="$t('sql._5')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column field="USED_SEQUENCE"
                          :title="$t('sql._6')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column field="PART_NO"
                          :title="$t('sql._10')">
          <template v-slot="{ row }">
            <el-button v-if="$btnList.indexOf('SQLconfigurationEdit') !== -1"
                       type="primary"
                       size="small"
                       @click="edit_but(row, row.$index)">{{ $t("sql._7") }}</el-button>
            <el-button v-if="$btnList.indexOf('SQLconfigurationDelete') !== -1"
                       type="danger"
                       size="small"
                       @click="remove_but(row, row.$index)">{{ $t("sql._8") }}</el-button>
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
    <el-dialog v-dialogDrag
               :title="textMap[dialogStatus]"
               :visible.sync="dialogFormVisible"
               width="50%"
               :close-on-click-modal="false">
      <el-form label-position="top"
               ref="TableData"
               :show-message="false"
               :model="TableData"
               :rules="rules"
               label-width="85px">
        <el-form-item prop="TOTABLE_NAME">
          <span>{{ $t("sql._3") }}</span>
          <el-input v-model="TableData.TOTABLE_NAME"
                    :placeholder="$t('sql._11')" />
        </el-form-item>
        <el-form-item prop="DESC_CN">
          <span>{{ $t("sql._4") }}</span>
          <el-input v-model="TableData.DESC_CN"
                    :placeholder="$t('sql._12')" />
        </el-form-item>
        <el-form-item prop="DESC_EN">
          <span>{{ $t("sql._5") }}</span>
          <el-input v-model="TableData.DESC_EN"
                    :placeholder="$t('sql._13')" />
        </el-form-item>
        <el-form-item prop="USED_SEQUENCE">
          <span>{{ $t("sql._14") }}</span>
          <el-input v-model="TableData.USED_SEQUENCE"
                    :placeholder="$t('sls.p_8')" />
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="cancel('form')">{{ $t("se.cancel") }}</el-button>
        <el-button v-if="dialogStatus == 'create'"
                   type="primary"
                   @click="create('form')">{{ $t("se.confirm") }}</el-button>
        <el-button v-else
                   type="primary"
                   @click="update('form')">{{
          $t("se.confirm")
        }}</el-button>
      </div>
    </el-dialog>
  </d2-container>
</template>

<script>
import helper from '@/api/SQLconfiguration'
import customContainerHeader from '@/components/custom-container-header'
import pagination from '@/views/mixin/page'
const API = helper('ImportExcel')
export default {
  name: 'SQLconfiguration',
  mixins: [pagination],
  components: {
    customContainerHeader
  },
  data () {
    return {
      currentIndex: 0,
      formData: {
        Page: 1,
        Limit: 15,
        TOTABLE_NAME: '', // 目标表名
        DESC_CN: '', // 中文说明
        DESC_EN: '' // 英文说明
      },
      loading: false,
      mainTable: [],
      totalPage: 0,
      rules: {
        TOTABLE_NAME: [
          {
            required: true,
            message: this.$t('sql._11')
          }
        ],
        DESC_CN: [
          {
            required: true,
            message: this.$t('sql._12')
          }
        ],
        USED_SEQUENCE: [
          {
            required: true,
            message: this.$t('sql._14')
          }
        ]
      },
      TableData: {
        ID: 0,
        TOTABLE_NAME: '', // 目标表名
        DESC_CN: '', // 中文说明
        DESC_EN: '', // 英文说明
        USED_SEQUENCE: '' // 使用的序列
      },
      form: {
        insertRecords: [],
        updateRecords: [],
        removeRecords: []
      },
      defaultForm: {
        table_name: ''
      },
      formRemove: {
        RemoveRecords: []
      },
      textMap: {
        update: this.$t('se.editPermission'),
        create: this.$t('se.create')
      },
      dialogFormVisible: false,
      dialogStatus: ''
    }
  },
  created () {
    this.getLoadData()
  },
  methods: {
    async getLoadData () {
      this.loading = true
      const res = await API.LoadMainData(this.formData)
      this.loading = false
      if (res.Result) {
        console.log(res)
        this.mainTable = res.Result
        this.totalPage = res.TotalCount
      }
    },
    // 查询
    searchClick () {
      this.formData.Page = 1
      this.getLoadData()
    },
    addClick () {
      this.empty()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
    },
    edit_but (row, index) {
      this.empty()
      this.TableData.ID = row.ID
      this.TableData.TOTABLE_NAME = row.TOTABLE_NAME
      this.TableData.DESC_CN = row.DESC_CN
      this.TableData.DESC_EN = row.DESC_EN
      this.TableData.USED_SEQUENCE = row.USED_SEQUENCE
      this.dialogFormVisible = true
      this.dialogStatus = 'update'
    },
    // 取消
    cancel (formName) {
      this.dialogFormVisible = false
      this.$refs.TableData.resetFields()
    },
    // 确认
    create (formName) {
      this.submit_but(formName)
    },
    // 编辑
    update (formName) {
      this.submit_but(formName)
    },
    // 确认提交
    async submit_but (formName) {
      this.form.insertRecords = []
      this.form.updateRecords = []
      if (this.TableData.ID === 0) {
        this.form.insertRecords.push(this.TableData)
      } else {
        this.form.updateRecords.push(this.TableData)
      }
      this.$refs.TableData.validate(async (valid, errInfo) => {
        if (valid) {
          const res = await API.SaveMainData(this.form)
          if (res.Result) {
            this.dialogFormVisible = false
            this.getLoadData()
            this.$notify({
              title: this.$t('se.success'),
              message: this.$t('se.savedsus'),
              type: 'success',
              duration: 2000
            })
          }
        } else {
          try {
            Object.keys(errInfo).forEach(item => {
              this.$message.error(errInfo[item][0].message)
              throw new Error(errInfo[item][0].message)
            })
          } catch (e) { }
        }
      })
    },
    empty () {
      this.TableData = {
        ID: 0,
        TOTABLE_NAME: '', // 目标表名
        DESC_CN: '', // 中文说明
        DESC_EN: '', // 英文说明
        USED_SEQUENCE: '' // 使用的序列
      }
    },
    // 删除
    async remove_but (row, index) {
      var postdata = this.$refs.xTable.getRecordset()
      if (row) {
        this.$confirm(
          this.$t('publics.tips.makeSureDelete'),
          this.$t('publics.tips.tips'),
          {
            confirmButtonText: this.$t('publics.tips.confirm'),
            cancelButtonText: this.$t('publics.tips.cancel'),
            type: 'warning'
          }
        ).then(() => {
          this.$refs.xTable.remove(row)
          // this.$refs.xTable.remove(row)
          this.formRemove.removeRecords = postdata.removeRecords
          API.SaveMainData(this.formRemove).then(response => {
            if (response.Result) {
              this.formRemove = {}
              this.getLoadData()
              this.$notify({
                title: this.$t('as_cfe.success'),
                message: this.$t('as_cfe.sudeleted'),
                type: 'success',
                duration: 2000
              })
            }
          })
        })
      } else {
        return false
      }
    }
  }
}
</script>
