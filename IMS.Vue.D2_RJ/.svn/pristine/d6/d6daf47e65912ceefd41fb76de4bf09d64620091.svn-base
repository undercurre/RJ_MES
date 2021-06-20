<template>
  <d2-container>
    <template slot="header">
      <custom-container-header :isExport="false" :isExportTpl="false" :isImport="false">
        <el-input
          v-model="SCRAPER_NO"
          :placeholder="$t('ssu_cn.ip_p_sn')"
          clearable
          style="width:200px"
          @keyup.enter.native="searchClick"
        />&nbsp;
        <el-button
          type="primary"
          icon="el-icon-search"
          @click.prevent="searchClick"
        >{{ $t('ssu_cn.search') }}</el-button>
        <el-button
          type="danger"
          icon="el-icon-delete"
          @click.prevent="eliminateClick"
        >{{ $t('ssu_cn.clear') }}</el-button>
        <el-button
          type="success"
          icon="el-icon-check"
          @click.prevent="preserveClick"
          v-if="$btnList.indexOf('SfcsScraperCleanSave') !== -1"
        >{{ $t('ssu_cn.save') }}</el-button>
      </custom-container-header>
    </template>
    <div>
      <el-form ref="form" :model="form" label-width="130px" size="mini">
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('ssu_use.ip_sn')">
              <el-input
                v-model="form.SCRAPER_NO"
                :disabled="disabled"
                :placeholder="$t('ssu_cn.ip_p_sn')"
                @change="getLoadData"
              />
            </el-form-item>
            <el-form-item :label="$t('ssu_cn.tb_cs')">
              <el-select
                style="width:100%"
                v-model="form.Status"
                :disabled="disabled"
                :placeholder="$t('ssu_cn.ip_p_cs')"
              >
                <el-option
                  v-for="item in ScraperStatusList"
                  :key="item.ID"
                  :label="item.NAME"
                  :value="item.ID"
                />
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('ssu_cn.tb_no')">
              <el-input
                v-model="form.ProductCount"
                :disabled="disabled"
                :placeholder="$t('ssu_cn.ip_p_no')"
              />
            </el-form-item>
            <el-form-item :label="$t('ssu_cn.tb_su')">
              <el-input
                v-model="form.SiteName"
                :disabled="disabled"
                :placeholder="$t('ssu_cn.ip_p_su')"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('ssu_cn.tb_ut')">
              <el-input
                v-model="form.PrintCount"
                :disabled="disabled"
                :placeholder="$t('ssu_cn.ip_p_su')"
              />
            </el-form-item>
            <el-form-item :label="$t('ssu_cn.tb_cp')">
              <el-input
                v-model="form.CLEAN_USER"
                :disabled="true"
                :placeholder="$t('ssu_cn.ip_p_cp')"
              />
            </el-form-item>
            <el-form-item :label="$t('ssu_cn.tb_lc')">
              <el-input
                v-model="form.LastCleanTime"
                :disabled="disabled"
                :placeholder="$t('ssu_cn.ip_p_lc')"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item :label="$t('ssu_cn.tb_tr')">
              <el-checkbox-group v-model="INSPECT_RESULT">
                <el-checkbox :label="$t('ssu_cn.tb_bn')" />
                <el-checkbox :label="$t('ssu_cn.tb_gap')" />
                <el-checkbox :label="$t('ssu_cn.tb_dd')" />
                <el-checkbox label="OK" />
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div>
      <vxe-table
        ref="xTable"
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
        stripe
        :loading="loading"
        :data="CleanHistoryList"
      >
        <vxe-table-column field="SCRAPER_NO" :title="$t('ssu_cn.tb_sn')" />
        <vxe-table-column field="PRINT_COUNT" :title="$t('ssu_cn.tb_uc')" />
        <vxe-table-column field="CLEAN_USER" :title="$t('ssu_cn.tb_cp')" />
        <vxe-table-column field="INSPECT_RESULT" :title="$t('ssu_cn.tb_rt')" />
        <vxe-table-column field="CLEAN_TIME" :title="$t('ssu_cn.tb_ct')" />
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
  </d2-container>
</template>

<script>
import customContainerHeader from '@/components/custom-container-header'
import {
  Index,
  LoadScraperData,
  LoadGetScraperCleanHistory,
  SaveData
} from '@/api/SfcsScraperClean'
import { mapGetters } from 'vuex'
import pagination from '@/views/mixin/page'
export default {
  name: 'SfcsScraperClean',
  components: {
    customContainerHeader
  },
  mixins: [pagination],
  computed: {
    ...mapGetters(['userinfo'])
  },
  created () {
    this.user = this.userinfo
    this.form.CLEAN_USER = this.user.USER_NAME
    this.formData.CLEAN_USER = this.user.USER_NAME
    this.getIndex()
  },
  data () {
    return {
      loading: false,
      ScraperStatusList: [],
      SCRAPER_NO: '',
      form: {
        SCRAPER_NO: '', // 刮刀号
        PrintCount: '',
        Status: '',
        ProductCount: '',
        SiteName: '',
        LastCleanTime: '',
        CLEAN_USER: '',
        INSPECT_RESULT: []
      },
      disabled: false,
      CleanHistoryList: [],
      user: [],
      formData: {
        SCRAPER_NO: '', // 刮刀号
        PRINT_COUNT: '', // 使用次数
        CLEAN_USER: '',
        INSPECT_RESULT: '', // 检查结果
        SiteID: '' // 站点ID
      },
      INSPECT_RESULT: []
    }
  },
  methods: {
    async getIndex () {
      const res = await Index()
      if (res.Result) {
        this.ScraperStatusList = res.Result.ScraperStatusList
      }
    },
    // 搜索
    async searchClick () {
      if (this.SCRAPER_NO === '') {
        this.$message({
          showClose: true,
          message: this.$t('ssu_cn.ip_p_sn'),
          type: 'warning'
        })
      } else {
        this.loading = true
        const res = await LoadGetScraperCleanHistory(this.SCRAPER_NO)
        this.loading = false
        if (res.Result) {
          this.CleanHistoryList = res.Result
        }
      }
    },
    // 回车或者刮刀信息
    async getLoadData () {
      if (this.form.SCRAPER_NO) {
        this.loading = true
        const res = await LoadScraperData(this.form.SCRAPER_NO).catch(_ => {
          this.formData.SCRAPER_NO = ''
          this.formData.SiteID = ''
          this.form.SCRAPER_NO = ''
        })
        this.loading = false
        if (res.Result) {
          const data = res.Result.RuncardInfo
          this.form.PrintCount = data.PrintCount
          this.form.Status = String(data.Status)
          this.form.ProductCount = data.ProductCount
          this.form.SiteName = data.SiteName
          this.form.LastCleanTime = data.LastCleanTime
          this.formData.SCRAPER_NO = this.form.SCRAPER_NO
          this.formData.SiteID = data.SiteID
          this.disabled = true
          this.CleanHistoryList = res.Result.CleanHistoryList
        } else {
          this.formData.SCRAPER_NO = ''
          this.formData.SiteID = ''
          this.form.SCRAPER_NO = ''
        }
      }
    },
    // 清除
    eliminateClick () {
      this.form = {
        SCRAPER_NO: '',
        PrintCount: '',
        Status: '',
        ProductCount: '',
        SiteName: '',
        LastCleanTime: '',
        INSPECT_RESULT: []
      }
      this.INSPECT_RESULT = []
      this.form.CLEAN_USER = this.user.USER_NAME
      this.formData.CLEAN_USER = this.user.USER_NAME
      this.CleanHistoryList = []
      this.disabled = false
    },
    // 保存
    preserveClick () {
      var that = this
      this.formData.PRINT_COUNT = this.form.PrintCount
      if (this.formData.SCRAPER_NO === '') {
        this.$message({
          showClose: true,
          message: this.$t('ssu_cn.ip_p_sn'),
          type: 'warning'
        })
        return
      }
      this.formData.INSPECT_RESULT = this.form.INSPECT_RESULT.join('，')
      console.log(this.formData, 'this.formDatathis.formData')
      if (this.formData.INSPECT_RESULT.length === 0) {
        this.$message({
          showClose: true,
          message: this.$t('ssu_cn.me_pt'),
          type: 'warning'
        })
        return
      }

      SaveData(this.formData).then(response => {
        if (response.Result === true) {
          that.$notify({
            title: this.$t('ssu_cn.su'),
            message: this.$t('ssu_cn.ssfl'),
            type: 'success',
            duration: 2000
          })
        }
        that.eliminateClick()
      })
    }
  },
  watch: {
    INSPECT_RESULT: {
      handler (val, oldVal) {
        console.log(val, oldVal)
        if (oldVal.indexOf('OK') === -1 && val.indexOf('OK') !== -1) {
          // 原数组没有ok 新数组有 ok
          this.INSPECT_RESULT = ['OK']
        } else if (oldVal.indexOf('OK') !== -1 && val.length > 1) {
          const arr = []
          val.map(item => {
            if (item !== 'OK') arr.push(item)
          })
          this.INSPECT_RESULT = arr
        }
        this.form.INSPECT_RESULT = this.INSPECT_RESULT
      },
      deep: false
    }
  }
}
</script>
<style lang="scss" scoped>
.storageTable {
  height: calc(100vh - 60px - 40px - 74px - 20px - 185px - 53px);
}
</style>
