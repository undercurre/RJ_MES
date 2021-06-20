<template>
  <d2-container>
    <template slot="header">
      <custom-container-header :isExport="false" :isExportTpl="false" :isImport="false">
        <el-button type="danger" @click.prevent="eliminateClick">
          <i class="el-icon-delete-solid" />
          &nbsp;{{ $t('publics.btn.clear') }}
        </el-button>
        <el-button
          type="success"
          icon="el-icon-check"
          @click.prevent="preserveClick"
          v-if="$btnList.indexOf('SfcsScraperReturnSave') !== -1"
        >{{ $t('publics.btn.save') }}</el-button>
      </custom-container-header>
    </template>
    <div>
      <el-form ref="ScraperInfo" :model="ScraperInfo" label-width="170px" size="mini">
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('ssr_rn.tb_sn')">
              <el-input
                v-model="ScraperInfo.SCRAPER_NO"
                :placeholder="$t('ssu_use.ip_p_sn')"
                @change="getLoadData"
              />
            </el-form-item>

            <el-form-item :label="$t('ssr_rn.ip_op')">
              <el-input v-model="ScraperInfo.Collar" :disabled="true" />
            </el-form-item>
            <el-form-item :label="$t('ssr_rn.ip_ro')">
              <el-input v-model="ScraperInfo.WorkerNo" :placeholder="$t('ssr_rn.ip_p_ro')" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('ssr_rn.ip_se')">
              <el-select
                style="width:100%"
                v-model="ScraperInfo.SiteID"
                :disabled="true"
                :placeholder="$t('ssr_rn.ip_p_se')"
              >
                <el-option
                  v-for="item in SmtLineList"
                  :key="item.ID"
                  :label="item.NAME"
                  :value="item.ID"
                />
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('ssr_rn.tb_cs')">
              <el-select
                style="width:100%"
                v-model="ScraperInfo.Status"
                :disabled="disabled"
                :placeholder="$t('ssr_rn.ip_p_cs')"
                class="select"
              >
                <el-option
                  v-for="item in ScraperStatusList"
                  :key="item.ID"
                  :label="item.NAME"
                  :value="item.ID"
                />
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('ssr_rn.ip_ss')">
              <el-input v-model="ScraperInfo.LOCATION" :placeholder="$t('ssr_rn.in_p_ss')" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div>
      <span
        class="demonstration"
        style="display: block;color: #606266;font-size: 14px;margin: 10px 0;"
      >{{ $t('ssr_rn.sor') }}</span>
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
        :data="ScraperOperatHistoryList"
      >
        <vxe-table-column field="SCRAPER_NO" :title="$t('ssr_rn.tb_sn')" />
        <vxe-table-column
          field="SCRAPER_STATUS"
          :title="$t('ssr_rn.tb_ss')"
          :edit-render="{name: 'select', options: ScraperStatusListBox}"
        />
        <vxe-table-column field="WORKER_NO" :title="$t('ssr_rn.tb_ji')" />

        <vxe-table-column field="OPERATION_TIME" :title="$t('ssr_rn.tb_oi')" />
        <vxe-table-column field="OPERATION_BY" :title="$t('ssr_rn.tb_ot')" />
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
import { Index, LoadData, SaveData } from '@/api/SfcsScraperOperat/'
import { mapGetters } from 'vuex'
import pagination from '@/views/mixin/page'
export default {
  name: 'SfcsScraperReturn',
  components: {
    customContainerHeader
  },
  mixins: [pagination],
  computed: {
    ...mapGetters(['userinfo'])
  },
  created () {
    this.user = this.userinfo
    this.formData.UserName = this.user.USER_NAME
    this.ScraperInfo.WorkerNo = this.user.USER_NAME
    this.formData.WorkerNo = this.user.USER_NAME
    this.getIndex()
  },
  data () {
    return {
      ScraperInfo: {
        SCRAPER_NO: '', // 刮刀号
        LOCATION: '',
        WorkerNo: '',
        SiteID: '',
        Status: '',
        Collar: this.$t('ssr_rn.ret')
      },
      disabled: false,
      loading: false,
      ScraperStatusList: [],
      ScraperStatusListBox: [],
      SmtLineList: [],
      user: [],
      formData: {
        SCRAPER_NO: '', // 刮刀号
        ActionType: 7, // 操作类型
        WorkerNo: '', // 作业工号
        UserName: '', // 操作人
        SiteID: 0 // 站点ID
      },
      ScraperOperatHistoryList: []
    }
  },
  methods: {
    async getIndex () {
      const res = await Index()
      if (res.Result) {
        this.SmtLineList = res.Result.SmtLineList
        this.ScraperStatusList = res.Result.ScraperStatusList
        this.ScraperStatusListBox.push({
          label: '',
          value: '',
          disabled: false
        })
        this.ScraperStatusList.map(item => {
          this.ScraperStatusListBox.push({
            label: item.NAME,
            value: Number(item.ID),
            disabled: false
          })
        })
      }
    },
    async getLoadData () {
      this.loading = true
      await LoadData(this.ScraperInfo.SCRAPER_NO)
        .then(res => {
          if (res.Result) {
            this.disabled = true
            this.ScraperOperatHistoryList = res.Result.ScraperOperatHistoryList
            const data = res.Result.ScraperInfo
            this.ScraperInfo.Status = data.Status ? data.Status.toString() : ''
            this.ScraperInfo.SiteID = data.SiteID ? data.SiteID.toString() : ''
            this.ScraperInfo.LOCATION = data.LOCATION
            this.formData.SiteID = data.SiteID
            this.totalPage = res.Result.ScraperOperatHistoryList.length
          } else {
            this.ScraperInfo.Status = ''
            this.ScraperOperatHistoryList = []
            this.ScraperInfo.SCRAPER_NO = ''
          }
        })
        .catch(_ => {
          this.ScraperInfo.Status = ''
          this.ScraperOperatHistoryList = []
          this.ScraperInfo.SCRAPER_NO = ''
        })
      this.loading = false
    },
    // 清除
    eliminateClick () {
      this.ScraperInfo = {
        SCRAPER_NO: '',
        LOCATION: '',
        SiteID: '',
        Status: '',
        WorkerNo: this.user.USER_NAME,
        Collar: this.$t('ssr_rn.ret')
      }
      this.totalPage = 0
      this.ScraperOperatHistoryList = []
      this.disabled = false
    },
    async preserveClick () {
      var that = this
      this.formData.SCRAPER_NO = this.ScraperInfo.SCRAPER_NO
      this.formData.WorkerNo = this.ScraperInfo.WorkerNo
      if (this.formData.SCRAPER_NO === '') {
        this.$message({
          showClose: true,
          message: this.$t('ssr_rn.ip_p_sn'),
          type: 'warning'
        })
        return
      }
      if (this.formData.WorkerNo === '') {
        this.$message({
          showClose: true,
          message: this.$t('ssr_rn.ip_p_ro'),
          type: 'warning'
        })
        return
      }
      const response = await SaveData(this.formData)
      if (response.Result) {
        this.getLoadData()
        this.ScraperInfo = {
          SCRAPER_NO: '',
          LOCATION: '',
          SiteID: '',
          Status: '',
          WorkerNo: '',
          Collar: this.$t('ssr_rn.ret')
        }
        that.$notify({
          title: this.$t('ssr_rn.su'),
          message: this.$t('ssr_rn.ssfl'),
          type: 'success',
          duration: 2000
        })
      } else {
        this.ScraperInfo.SCRAPER_NO = ''
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.storageTable {
  height: calc(100vh - 60px - 21px - 74px - 20px - 41px - 114px - 53px);
}
</style>
