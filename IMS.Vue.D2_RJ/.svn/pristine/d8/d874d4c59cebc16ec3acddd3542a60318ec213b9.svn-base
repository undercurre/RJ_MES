<template>
  <d2-container>
    <template slot="header">
      <custom-container-header :isExport="false" :isExportTpl="false" :isImport="false">
        <el-input
          v-model="SCRAPER_NO"
          :placeholder="$t('SmtStencilMaintain._1')"
          clearable
          style="width:200px"
          @keyup.enter.native="searchClick"
        />&nbsp;
        <el-button
          type="primary"
          icon="el-icon-search"
          @click.prevent="searchClick"
        >{{ $t('publics.btn.search') }}</el-button>
        <el-button
          type="danger"
          icon="el-icon-delete"
          @click.prevent="eliminateClick"
        >{{ $t('publics.btn.clear') }}</el-button>
        <el-button
          type="primary"
          icon="el-icon-check"
          @click.prevent="preserveClick"
          v-if="$btnList.indexOf('SmtStencilMaintainSave') !== -1"
        >{{ $t('publics.btn.save') }}</el-button>
      </custom-container-header>
    </template>
    <div>
      <el-form ref="form" :model="form" label-width="180px" size="mini">
        <el-form-item :label="$t('SmtStencilMaintain._2')">
          <el-input v-model="form.STENCIL_NO" @change="getLoadScraperData" />
        </el-form-item>
        <el-form-item :label="$t('SmtStencilMaintain._4')">
          <el-select
            v-model="form.Status"
            disabled
            :placeholder="$t('SmtStencilMaintain._5')"
            style="width: 100%"
          >
            <el-option
              v-for="item in StatusList"
              :key="item.ID"
              :label="item.NAME"
              :value="item.ID"
            />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('SmtStencilMaintain._6')">
          <el-radio-group v-model="form.ResultStatus">
            <el-radio label="1">{{ $t('SmtStencilMaintain._7') }}</el-radio>
            <el-radio label="2">{{ $t('SmtStencilMaintain._8') }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('SmtStencilMaintain._9')">
          <el-input
            v-model="form.Remark"
            type="textarea"
            resize="none"
            :autosize="{
              minRows: 3,
              maxRows: 6
            }"
          />
        </el-form-item>
      </el-form>
    </div>
    <div>
      <span
        class="demonstration"
        style="display: block;color: #606266;font-size: 14px;margin: 10px 0;"
      >{{ $t('SmtStencilMaintain._11') }}</span>
    </div>
    <div>
      <vxe-table
        ref="xTable"
        class="maintainTable"
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
      >
        <vxe-table-column field="STENCIL_NO" :title="$t('SmtStencilMaintain._12')" />
        <vxe-table-column field="PRINT_COUNT" :title="$t('SmtStencilMaintain._13')" />
        <vxe-table-column field="CURRENT_STATUS" :formatter="handleFormatterStatus" :title="$t('SmtStencilMaintain._14')" />
        <vxe-table-column field="MAINTAIN_STATUS" :formatter="handleFormatterStatus" :title="$t('SmtStencilMaintain._15')" />
        <vxe-table-column field="OPERATION_TIME" :title="$t('SmtStencilMaintain._16')" />
        <vxe-table-column field="OPERATOR" :title="$t('SmtStencilMaintain._17')" />
        <vxe-table-column field="MAINTAIN_DESCRIPTION" :title="$t('SmtStencilMaintain._18')" />
      </vxe-table>
    </div>
  </d2-container>
</template>

<script>
import customContainerHeader from '@/components/custom-container-header'
import { mapGetters } from 'vuex'
import {
  Index,
  GetStencilInfo,
  LoadData,
  SaveData
} from '@/api/SmtStencilMaintain'
export default {
  name: 'SmtStencilMaintain',
  computed: {
    ...mapGetters(['userinfo'])
  },
  components: {
    customContainerHeader
  },
  data () {
    return {
      loading: false,
      mainTable: [],
      form: {
        STENCIL_NO: '',
        Remark: '',
        UserName: '',
        ResultStatus: ''
      },
      StatusList: [],
      SCRAPER_NO: ''
    }
  },
  methods: {
    async getIndex () {
      const res = await Index()
      this.StatusList = res.Result.StatusList
    },
    // 搜索
    async searchClick () {
      console.log(1111)
      this.loading = true
      const res = await LoadData(this.SCRAPER_NO)
      console.log('============== ', res)
      this.loading = false
      if (res.Result) {
        this.mainTable = res.Result
        this.mainTable.map(res => {
          res.STENCIL_NO = this.SCRAPER_NO
        })
      } else {
        this.mainTable = []
      }
    },
    async getLoadScraperData () {
      if (this.form.STENCIL_NO) {
        const res = await GetStencilInfo(this.form.STENCIL_NO)
        if (res.Result) {
          this.form.Status = res.Result.STATUS
            ? res.Result.STATUS.toString()
            : ''
          this.form.Remark = res.Result.Remark
          this.SCRAPER_NO = this.form.STENCIL_NO
          this.searchClick()
        } else {
          this.form.STENCIL_NO = ''
        }
      }
    },
    // 清除
    eliminateClick () {
      this.form = {
        STENCIL_NO: '',
        Remark: '',
        UserName: this.userinfo.USER_NAME,
        ResultStatus: ''
      }
      this.disabled = false
    },
    preserveClick () {
      if (this.form.STENCIL_NO === '') {
        this.$message({
          showClose: true,
          message: this.$t('SmtStencilMaintain._19'),
          type: 'warning'
        })
        return
      }
      if (this.form.ResultStatus === '') {
        this.$message({
          showClose: true,
          message: this.$t('SmtStencilMaintain._20'),
          type: 'warning'
        })
        return
      }

      if (
        this.form.Remark === '' ||
        this.form.Remark === undefined
      ) {
        this.$message({
          showClose: true,
          message: this.$t('SmtStencilMaintain._21'),
          type: 'warning'
        })
        return
      }
      if (this.IsRun === false && this.form.ResultStatus === '2') {
        this.$confirm(
          this.$t('SmtStencilMaintain._22'),
          this.$t('publics.tips.tips'),
          {
            confirmButtonText: this.$t('publics.tips.confirm'),
            cancelButtonText: this.$t('publics.tips.cancel'),
            type: 'warning'
          }
        )
          .then(() => {
            this.service()
          })
          .catch(() => {
            this.eliminateClick()
          })
      } else {
        this.service()
      }
    },
    async service () {
      this.form.UserName = this.userinfo.USER_NAME
      const response = await SaveData(this.form)
      if (response.Result) {
        if (response.Result.Result) {
          this.eliminateClick()
          this.$notify({
            title: this.$t('publics.tips.success'),
            message: this.$t('publics.tips.submitSuccess'),
            type: 'success',
            duration: 2000
          })
        } else {
          this.$message.error(response.Result.PromptMessage)
        }
      }
    },
    handleFormatterStatus ({ cellValue }) {
      let obj = {}
      this.StatusList.map(item => {
        obj[item.ID] = item.NAME
      })
      return obj[cellValue] || ''
    }
  },
  created () {
    this.getIndex()
  }
}
</script>

<style lang="scss" scoped>
.maintainTable {
  height: calc(100vh - 60px - 21px - 74px - 73px - 178px);
}
</style>
