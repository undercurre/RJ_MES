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
          v-if="$btnList.indexOf('SfcsScraperUsrSave') !== -1"
        >{{ $t('publics.btn.save') }}</el-button>
      </custom-container-header>
    </template>
    <div>
      <el-form ref="ScraperInfo" :model="ScraperInfo" label-width="150px" size="mini">
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('ssu_use.ip_sn')">
              <el-input
                v-model="ScraperInfo.SCRAPER_NO"
                :placeholder="$t('ssu_use.ip_p_sn')"
                @change="getLoadData"
              />
            </el-form-item>
            <el-form-item :label="$t('ssu_use.ip_cs')">
              <el-select
                style="width:100%"
                v-model="ScraperInfo.Status"
                :disabled="disabled"
                :placeholder="$t('ssu_use.ip_p_cs')"
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

            <el-form-item :label="$t('ssu_use.ip_bl')">
              <el-input v-model="ScraperInfo.WorkerNo" :placeholder="$t('ssu_use.ip_p_bl')" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('ssu_use.ip_se')">
              <el-select
                style="width:100%"
                v-model="ScraperInfo.SiteID"
                :placeholder="$t('ssu_use.ip_p_se')"
                class="select"
                @change="handleChooseSiteID"
              >
                <el-option
                  v-for="item in SmtLineList"
                  :key="item.ID"
                  :label="item.NAME"
                  :value="item.ID"
                />
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('ssu_use.ip_op')">
              <el-input
                v-model="ScraperInfo.Collar"
                :disabled="true"
                :placeholder="$t('ssu_use.ip_p_op')"
              />
            </el-form-item>
            <el-form-item :label="$t('ssu_use.ip_ss')">
              <el-input v-model="ScraperInfo.LOCATION" :placeholder="$t('ssu_use.in_p_ss')" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div>
      <span
        class="demonstration"
        style="display: block;color: #606266;font-size: 14px;margin: 10px 0;"
      >{{ $t('ssu_use.sor') }}</span>
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
        <vxe-table-column field="SCRAPER_NO" :title="$t('ssu_use.tb_sn')" />
        <vxe-table-column
          field="SCRAPER_STATUS"
          :title="$t('ssu_use.tb_ss')"
          :edit-render="{name: 'select', options: ScraperStatusListBox}"
        />
        <vxe-table-column field="WORKER_NO" :title="$t('ssu_use.tb_ji')" />
        <vxe-table-column field="OPERATION_TIME" :title="$t('ssu_use.tb_oi')" />
        <vxe-table-column field="OPERATION_BY" :title="$t('ssu_use.tb_ot')" />
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
  name: 'SfcsScraperUsr',
  data () {
    return {
      SCRAPER_NO: '',
      loading: false,
      ScraperStatusList: [],
      ScraperStatusListBox: [],
      SmtLineList: [],
      disabled: false,
      user: [],
      ScraperInfo: {
        SCRAPER_NO: '',
        LOCATION: '',
        WorkerNo: '',
        SiteID: '',
        Status: '',
        Collar: this.$t('ssu_use.use')
      },
      ScraperOperatHistoryList: [],
      formData: {
        SCRAPER_NO: '',
        ActionType: 6,
        WorkerNo: '',
        SiteID: 0
      }
    }
  },
  components: {
    customContainerHeader
  },
  mixins: [pagination],
  computed: {
    ...mapGetters(['userinfo'])
  },
  created () {
    this.user = this.userinfo
    this.getIndex()
  },
  methods: {
    handleChooseSiteID (e) {
      this.ScraperInfo.SiteID = e
    },
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
      if (this.ScraperInfo.SCRAPER_NO) {
        this.loading = true
        const res = await LoadData(this.ScraperInfo.SCRAPER_NO)
        this.loading = false
        if (res.Result) {
          this.disabled = true
          this.ScraperOperatHistoryList = res.Result.ScraperOperatHistoryList
          const data = res.Result.ScraperInfo
          this.ScraperInfo.Status = data.Status ? data.Status.toString() : ''
          this.ScraperInfo.SiteID = data.SiteID ? data.SiteID.toString() : ''
          this.ScraperInfo.LOCATION = data.LOCATION
          this.ScraperInfo.WorkerNo = this.ScraperInfo.UserName = this.userinfo.USER_NAME
          this.formData.SiteID = data.SiteID
          this.totalPage = res.Result.ScraperOperatHistoryList.length
        } else {
          this.ScraperInfo.Status = ''
          this.ScraperOperatHistoryList = []
          this.ScraperInfo.SCRAPER_NO = ''
        }
      }
    },
    // 清除
    eliminateClick () {
      this.ScraperInfo = {
        SCRAPER_NO: '',
        LOCATION: '',
        SiteID: '',
        Status: '',
        WorkerNo: '',
        Collar: this.$t('ssu_use.use')
      }
      this.ScraperOperatHistoryList = []
      this.disabled = false
      this.totalPage = 0
    },
    // 保存
    async preserveClick () {
      this.formData.SCRAPER_NO = this.ScraperInfo.SCRAPER_NO
      if (this.ScraperInfo.SCRAPER_NO === '') {
        this.$message({
          showClose: true,
          message: this.$t('ssu_use.ip_p_sn'),
          type: 'warning'
        })
        return
      }
      if (this.ScraperInfo.WorkerNo === '') {
        this.$message({
          showClose: true,
          message: this.$t('ssu_use.ip_p_bl'),
          type: 'warning'
        })
        return
      }
      if (!this.ScraperInfo.SiteID) {
        this.$message({
          showClose: true,
          message: this.$t('ssu_use.ip_p_se'),
          type: 'warning'
        })
        return
      }
      this.ScraperInfo.UserName = this.userinfo.USER_NAME
      const response = await SaveData({
        SCRAPER_NO: this.ScraperInfo.SCRAPER_NO,
        ActionType: 6,
        WorkerNo: this.ScraperInfo.WorkerNo,
        UserName: this.ScraperInfo.UserName,
        SiteID: this.ScraperInfo.SiteID ? parseInt(this.ScraperInfo.SiteID) : 0
      })
      if (response.Result) {
        this.getLoadData()
        this.$notify({
          title: this.$t('ssu_use.su'),
          message: this.$t('ssu_use.ssfl'),
          type: 'success',
          duration: 2000
        })
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
