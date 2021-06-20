<template>
  <d2-container>
    <template slot="header">
      <custom-container-header :isExport="false"
                               :isExportTpl="false"
                               :isImport="false">
        <el-input v-model="formData.STENCIL_NO"
                  :placeholder="$t('SmtStencilStorage._14')"
                  clearable
                  style="width:200px"
                  @keyup.enter.native="searchClick" />&nbsp;
        <el-input v-model="formData.LOCATION"
                  :placeholder="$t('SmtStencilStorage._15')"
                  clearable
                  style="width:200px"
                  @keyup.enter.native="searchClick" />&nbsp;
        <el-button type="primary"
                   icon="el-icon-search"
                   @click.prevent="searchClick">{{ $t('publics.btn.search') }}</el-button>
        <el-button type="success"
                   icon="el-icon-check"
                   @click.prevent="save"
                   v-if="$btnList.indexOf('SmtStencilStoreSave') !== -1">{{ $t('publics.btn.save') }}</el-button>
        <el-button type="warning"
                   icon="el-icon-minus"
                   @click.prevent="baofei"
                   v-if="$btnList.indexOf('ScrapStencilStore') !== -1">{{ $t('publics.btn.scrappedOut') }}</el-button>
        <el-button type="danger"
                   icon="el-icon-delete"
                   @click.prevent="clearAll">{{ $t('publics.btn.clear') }}</el-button>
      </custom-container-header>
    </template>
    <div>
      <el-form ref="form"
               :model="form"
               label-width="150px"
               size="small">
        <el-form-item :label="$t('SmtStencilStorage._1')">
          <el-input v-model="form.STENCIL_NO"
                    :disabled="disabled" />
        </el-form-item>
        <el-form-item :label="$t('SmtStencilStorage._2')">
          <el-input v-model="form.LOCATION"
                    :disabled="disabled" />
        </el-form-item>
        <el-form-item :label="$t('SmtStencilStorage._3')">
          <el-date-picker v-model="form.MANUFACTURE_TIME"
                          type="date"
                          :placeholder="$t('SmtStencilStorage._4')" />
        </el-form-item>
        <el-form-item :label="$t('SmtStencilStorage._5')">
          <el-input v-model="form.REMARK"
                    type="textarea"
                    resize="none"
                    :autosize="{
              minRows: 3,
              maxRows: 6
            }" />
        </el-form-item>
      </el-form>
    </div>
    <div>
      <span class="demonstration"
            style="display: block;color: #606266;font-size: 14px;margin: 10px 0;">{{ $t('SmtStencilStorage._6') }}</span>
    </div>
    <div>
      <vxe-table ref="xTable"
                 class="storageTable"
                 border
                 resizable
                 height="100%"
                 size="medium"
                 align="center"
                 highlight-hover-row
                 highlight-current-row
                 auto-resize
                 show-overflow
                 keep-source
                 :loading="loading"
                 :data="mainTable"
                 @cell-click="cellClick">
        <vxe-table-column min-width="100"
                          field="STENCIL_NO"
                          :title="$t('SmtStencilStorage._7')" />
        <vxe-table-column min-width="100"
                          field="LOCATION"
                          :title="$t('SmtStencilStorage._8')" />
        <vxe-table-column min-width="100"
                          field="STATUS"
                          :title="$t('SmtStencilStorage._9')" />
        <vxe-table-column min-width="140"
                          field="MANUFACTURE_TIME"
                          :title="$t('SmtStencilStorage._10')" />
        <vxe-table-column min-width="100"
                          field="CREATE_TIME"
                          :title="$t('SmtStencilStorage._11')" />
        <vxe-table-column min-width="100"
                          field="UPDATE_TIME"
                          :title="$t('SmtStencilStorage._12')" />
        <vxe-table-column min-width="100"
                          field="REMARK"
                          :title="$t('SmtStencilStorage._13')" />
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
  </d2-container>
</template>

<script>
import pagination from '@/views/mixin/page'
import customContainerHeader from '@/components/custom-container-header'
import {
  Index,
  LoadData,
  SaveData,
  ScrapStencilStore
} from '@/api/SmtStencilStorage'
import { cloneDeep } from 'lodash'
import { mapGetters } from 'vuex'
export default {
  name: 'SmtStencilStorage',
  mixins: [pagination],
  computed: {
    ...mapGetters(['userinfo'])
  },
  components: {
    customContainerHeader
  },
  data () {
    return {
      formData: {
        STENCIL_NO: '',
        LOCATION: '',
        ...this.formData
      },
      form: {
        STENCIL_NO: '',
        LOCATION: '',
        MANUFACTURE_TIME: '',
        REMARK: ''
      },
      mainTable: [],
      loading: false,
      tableHeight: 0,
      disabled: false
    }
  },
  methods: {
    async getIndex () {
      const result = await Index()
      if (result.Result) {
        this.getLoadData()
      }
    },
    async getLoadData () {
      this.loading = true
      const result = await LoadData(this.formData)
      this.loading = false
      this.mainTable = result.Result
      this.totalPage = result.TotalCount
    },
    searchClick () {
      this.formData.Page = 1
      this.getLoadData()
    },
    cellClick (e) {
      const { row } = e
      this.form = cloneDeep(row)
      this.disabled = true
    },
    clearAll () {
      this.form = {}
      this.disabled = false
    },
    async save () {
      const result = await SaveData({
        STENCIL_NO: this.form.STENCIL_NO,
        LOCATION: this.form.LOCATION,
        UserName: JSON.stringify(this.userinfo).USER_NAME,
        MANUFACTURE_TIME: this.form.MANUFACTURE_TIME,
        REMARK: this.form.REMARK
      })
      if (result.Result) {
        this.$message.success(this.$t('publics.tips.saveSuccess'))
        this.form = {}
        this.getLoadData()
      } else {
        this.$message.error(
          result.ErrorInfo.Message || this.$t('publics.tips.saveFail')
        )
      }
    },
    async baofei () {
      if (!this.form.STENCIL_NO) {
        this.$message.error(this.$t('SmtStencilStorage._16'))
        return false
      }
      if (
        await this.$confirm(
          this.$t('SmtStencilStorage._17'),
          this.$t('publics.tips.tips'),
          {
            confirmButtonText: this.$t('publics.tips.confirm'),
            cancelButtonText: this.$t('publics.tips.cancel'),
            type: 'warning'
          }
        ).catch(_ => {
          /** 取消 */
        })
      ) {
        const result = await ScrapStencilStore({
          STENCIL_NO: this.form.STENCIL_NO,
          UserName: this.userinfo.USER_NAME
        })
        if (result.Result) {
          this.$message.success(this.$t('publics.tips.processSuccess'))
          this.form = {}
          this.getLoadData()
        } else {
          this.$message.error(
            result.ErrorInfo.Message || this.$t('publics.tips.processFail')
          )
        }
      }
    }
  },
  created () {
    this.getIndex()
  }
}
</script>

<style lang="scss" scoped>
.storageTable {
  height: calc(100vh - 60px - 21px - 74px - 73px - 198px - 41px);
}
</style>
