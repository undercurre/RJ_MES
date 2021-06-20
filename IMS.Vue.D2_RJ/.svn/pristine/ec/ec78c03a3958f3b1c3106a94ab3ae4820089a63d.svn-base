<template>
  <d2-container>
    <template slot="header">
      <custom-container-header :isExport="false" :isExportTpl="false" :isImport="false">
        <el-button
          type="success"
          icon="el-icon-refresh"
          @click.prevent="searchClick"
        >{{ $t('publics.btn.refresh') }}</el-button>
        <el-button
          type="danger"
          icon="el-icon-delete"
          @click.prevent="clearAll"
        >{{ $t('publics.btn.clear') }}</el-button>
      </custom-container-header>
    </template>
    <div class="zuoyequ">
      <span
        class="demonstration"
        style="display: block;color: #8492a6;font-size: 14px;margin: 0 0 10px 0;"
      >{{ $t('SmtResourceProess._1') }}</span>
      <div class="block-one">
        <el-form ref="form" :model="zForm" label-width="180px" class="one-item" size="mini">
          <el-form-item :label="$t('SmtResourceProess._2')">
            <el-input v-model="zForm.resourceNo" @keyup.native.enter="handleCheckReelID2" />
          </el-form-item>
          <el-form-item :label="$t('SmtResourceProess._3')">
            <el-select
              v-model="zForm.nextOperationId"
              style="width: 100%"
              :disabled="zForm.nextOperationId ? true : false"
              :placeholder="$t('SmtResourceProess._4')"
            >
              <!-- <el-option 原本这样写的
                v-for="item in zhichengList"
                :key="item.CURRENT_OPERATION"
                :value="item.CURRENT_OPERATION"
                :label="item.MEANING"
              /> -->
              <el-option
                v-for="item in zhichengList"
                :key="item.NEXT_OPERATION.toString()"
                :value="item.NEXT_OPERATION.toString()"
                :label="item.NEXT_ROUTE"
              />
            </el-select>
          </el-form-item>
        </el-form>
        <div class="two-item">
          <div class="x">
            <el-button
              size="mini"
              type="warning"
              icon="el-icon-bell"
              @click="useFinished"
              v-if="$btnList.indexOf('ProcessResourceFinish') !== -1"
            >{{ $t('SmtResourceProess._5') }}</el-button>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-toilet-paper"
              @click="scrapped"
              v-if="$btnList.indexOf('ProcessResourceGiveOut') !== -1"
            >{{ $t('SmtResourceProess._6') }}</el-button>
          </div>
          <div class="x">
            <el-button
              size="mini"
              type="success"
              icon="el-icon-document-checked"
              @click="handleToNext"
              v-if="$btnList.indexOf('ProcessResourceRuncard') !== -1"
            >{{ $t('SmtResourceProess._7') }}</el-button>
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-document-copy"
              @click="openDrawFlag"
              v-if="$btnList.indexOf('GetBatchNo') !== -1"
            >{{ $t('SmtResourceProess._8') }}</el-button>
          </div>
        </div>
      </div>
    </div>
    <div>
      <span
        class="demonstration"
        style="display: block;color: #8492a6;font-size: 14px;margin: 10px 0;"
      >{{ $t('SmtResourceProess._9') }}</span>
    </div>
    <div>
      <vxe-table
        ref="xTable1"
        class="table-container2"
        border
        resizable
        height="100%"
        size="medium"
        align="center"
        show-overflow
        highlight-hover-row
        highlight-current-row
        auto-resize
        keep-source
        stripe
        :loading="loading"
        :data="jobList"
      >
        <vxe-table-column :title="$t('SmtResourceProess._10')" min-width="150" field="OBJECT_NAME" />
        <vxe-table-column :title="$t('SmtResourceProess._11')" min-width="165" field="CATEGORY_NAME" />
        <vxe-table-column :title="$t('SmtResourceProess._12')" min-width="150" field="RESOURCE_NO" />
        <vxe-table-column field="CURRENT_ROUTE" :title="$t('SmtResourceProess._13')" min-width="160" />
        <vxe-table-column field="NEXT_ROUTE" :title="$t('SmtResourceProess._14')" min-width="160" />
        <vxe-table-column :title="$t('SmtResourceProess._15')" min-width="150" field="STATUS" />
        <vxe-table-column
          field="BEGIN_OPERATION_TIME"
          :title="$t('SmtResourceProess._16')"
          min-width="150"
        />
        <vxe-table-column field="STANDARD_TIME" :title="$t('SmtResourceProess._17')" min-width="180" />
      </vxe-table>
    </div>
    <div>
      <span
        class="demonstration"
        style="display: block;color: #8492a6;font-size: 14px;margin: 10px 0;"
      >{{ $t('SmtResourceProess._18') }}</span>
    </div>
    <div>
      <vxe-table
        ref="xTable1"
        class="table-container3"
        border
        resizable
        height="100%"
        size="medium"
        align="center"
        show-overflow
        highlight-hover-row
        highlight-current-row
        auto-resize
        keep-source
        stripe
        :loading="loading"
        :data="historyList"
      >
        <vxe-table-column field="OBJECT_NAME" :title="$t('SmtResourceProess._19')" min-width="150" />
        <vxe-table-column field="CATEGORY_NAME" :title="$t('SmtResourceProess._20')" min-width="150" />
        <vxe-table-column field="RESOURCE_NO" :title="$t('SmtResourceProess._21')" min-width="180" />
        <vxe-table-column field="CURRENT_ROUTE" :title="$t('SmtResourceProess._22')" min-width="180" />
        <vxe-table-column
          field="BEGIN_OPERATION_TIME"
          :title="$t('SmtResourceProess._23')"
          min-width="180"
        />
        <vxe-table-column
          field="END_OPERATION_TIME"
          :title="$t('SmtResourceProess._24')"
          min-width="180"
        />
        <vxe-table-column field="OPERATOR" :title="$t('SmtResourceProess._25')" min-width="150" />
      </vxe-table>
    </div>

    <!-- modal 批量冷藏 -->
    <el-drawer
      custom-class="d-class"
      :title="$t('SmtResourceProess._26')"
      :visible.sync="drawFlag"
      direction="rtl"
      size="80%"
    >
      <el-row style="padding: 0 20px">
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <el-col :span="15">
              <el-form
                ref="form"
                :model="form"
                size="small"
                label-width="100px"
                class="my-el-form-x"
              >
                <el-form-item :label="$t('SmtResourceProess._28')">
                  <el-input v-model="form.CN_DESC" readonly />
                </el-form-item>
                <el-form-item :label="$t('SmtResourceProess._27')">
                  <el-input v-model="form.BATCH_NO" class="myInputx" readonly>
                    <template slot="append">
                      <i class="el-icon-more" @click="openInnerDrawer(1)" />
                    </template>
                  </el-input>
                </el-form-item>
                <el-form-item :label="$t('SmtResourceProess._29')">
                  <el-input v-model="form.REEL_NO" @keyup.enter.native="handleCheckReedID" />
                </el-form-item>
                <el-form-item :label="$t('SmtResourceProess._30')">
                  <el-input v-model="form.OPERATOR" disabled />
                </el-form-item>
                <el-form-item :label="$t('SmtResourceProess._31')">
                  <el-input readonly v-model="reelInfo.PART_NO" />
                </el-form-item>
                <el-form-item :label="$t('SmtResourceProess._32')">
                  <el-input readonly v-model="reelInfo.PART_NAME" />
                </el-form-item>
                <el-form-item :label="$t('SmtResourceProess._33')">
                  <el-input readonly type="textarea" resize="none" v-model="reelInfo.PART_DESC" />
                </el-form-item>
                <el-form-item :label="$t('SmtResourceProess._34')">
                  <el-input v-model="form.REMARK" type="textarea" resize="none" />
                </el-form-item>
                <!-- <el-form-item label="作业时间">
                  <el-input v-model="form.time" />
                </el-form-item>-->
                <el-form-item style="margin-top: 20px">
                  <el-button
                    icon="el-icon-error"
                    type="danger"
                    size="small"
                    @click="drawFlag = false"
                  >{{ $t('publics.btn.cancel') }}</el-button>
                  <el-button
                    style="margin-left: 20px"
                    icon="el-icon-success"
                    type="primary"
                    size="small"
                    @click="refrigerationSubmit"
                  >{{ $t('publics.btn.save') }}</el-button>
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :span="9">
              <div class="shuzhe">
                <div>
                  <div style="margin-bottom: 10px">
                    <el-button
                      style="width: 90%"
                      icon="el-icon-circle-plus-outline"
                      size="small"
                      @click="chooseLocation"
                    >{{ $t('SmtResourceProess._36') }}</el-button>
                  </div>
                  <div>
                    <el-button
                      style="width: 90%"
                      icon="el-icon-refresh-left"
                      type="success"
                      size="small"
                      @click="updateBathNo"
                    >{{ $t('SmtResourceProess._35') }}</el-button>
                  </div>
                </div>
                <!-- <div style="margin-top: 10px">
                  <el-checkbox v-model="isContinuous">{{ $t('SmtResourceProess._37') }}</el-checkbox>
                </div>-->
              </div>
            </el-col>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">
            <div>
              <span
                class="titx"
                style="font-size: 14px;color: #606266;"
              >{{ $t('SmtResourceProess._38') }}</span>
              <div style="display: flex;margin-top: 10px;align-items: center;">
                <span
                  class="titx"
                  style="font-size: 14px;color: #606266;margin-right: 10px"
                >{{ $t('SmtResourceProess._39') }}</span>
                <el-input
                  v-model="PCDetailData.bathNo"
                  size="small"
                  style="width: 40%"
                  class="myInputx"
                >
                  <template slot="append">
                    <i class="el-icon-more" @click="openInnerDrawer(2)" />
                  </template>
                </el-input>
                <el-button
                  type="primary"
                  size="small"
                  icon="el-icon-search"
                  @click="searchBathDetail"
                >{{ $t('SmtResourceProess.search') }}</el-button>
              </div>
            </div>
            <div style="margin-top: 10px;margin-bottom: 10px">
              <vxe-table
                ref="xTable"
                class="table-container4"
                border
                resizable
                height="100%"
                size="medium"
                align="center"
                highlight-hover-row
                show-overflow
                auto-resize
                keep-source
                stripe
                :loading="loading"
                :data="mainTable"
              >
                <vxe-table-column
                  :title="$t('SmtResourceProess._40')"
                  field="BATCH_NO"
                  min-width="150px"
                />
                <vxe-table-column
                  field="REEL_NO"
                  :title="$t('SmtResourceProess._41')"
                  min-width="180px"
                />
                <vxe-table-column
                  field="FRIDGE_LOC"
                  :title="$t('SmtResourceProess._42')"
                  min-width="180px"
                />
                <vxe-table-column
                  field="OPERATOR"
                  :title="$t('SmtResourceProess._43')"
                  min-width="120px"
                />
                <vxe-table-column
                  field="OPERATION_TIME"
                  :title="$t('SmtResourceProess._44')"
                  min-width="130px"
                />
                <vxe-table-column
                  :title="$t('SmtResourceProess._45')"
                  field="PART_NO"
                  min-width="150px"
                />
              </vxe-table>
            </div>
            <div style="padding: 10px 0;border-top: 1px solid rgb(233, 234, 236)">
              <el-pagination
                :current-page="mainTablePag.Page"
                :page-sizes="[20, 30, 40]"
                :page-size="mainTablePag.Limit"
                layout="total, sizes, prev, pager, next, jumper"
                :total="mainTableTotal"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
              />
            </div>
          </div>
        </el-col>
      </el-row>
      <div>
        <el-drawer
          custom-class="d-class"
          :title="$t('SmtResourceProess._46')"
          :modal="false"
          direction="rtl"
          size="60%"
          :visible.sync="innerDrawer"
        >
          <div style="padding-left: 20px;padding-right: 20px">
            <div style="display: flex;align-items: center;">
              <span
                class="titx"
                style="font-size: 14px;color: #606266;margin-right: 10px"
              >{{ $t('SmtResourceProess._47') }}</span>
              <el-input v-model="PCNUMBER" size="small" style="width: 40%">
                <template slot="append">
                  <i class="el-icon-close" @click="PCNUMBER = ''" />
                </template>
              </el-input>
              <!-- <el-button
                type="primary"
                size="small"
                icon="el-icon-search"
                @click="searchPC"
              >查询</el-button>-->
            </div>
            <div style="padding-top: 10px">
              <vxe-table
                ref="_xTable"
                class="table-container5"
                border
                resizable
                height="100%"
                size="medium"
                align="center"
                highlight-hover-row
                show-overflow
                auto-resize
                keep-source
                stripe
                :loading="loading"
                :data="PCmainTable"
                :radio-config="{highlight: true}"
                @radio-change="radioChangeEvent"
              >
                <vxe-table-column type="radio" width="60" />
                <vxe-table-column :title="$t('SmtResourceProess._48')" field="NAME" />
              </vxe-table>
            </div>
            <!-- <el-pagination
              :current-page="PCmainTablePag.Page"
              :page-sizes="[20, 30, 40]"
              :page-size="PCmainTablePag.Limit"
              layout="total, sizes, prev, pager, next, jumper"
              :total="PCmainTableTotal"
              @size-change="handleSizeChange1"
              @current-change="handleCurrentChange1"
            />-->
            <div style="padding-top: 10px;text-align: right;">
              <el-button
                type="success"
                size="small"
                icon="el-icon-check"
                @click="handleMakeSureX"
              >{{ $t('publics.btn.makeSure') }}</el-button>
              <el-button
                type="danger"
                size="small"
                icon="el-icon-close"
                @click="innerDrawer = false"
              >{{ $t('publics.btn.cancel') }}</el-button>
            </div>
          </div>
        </el-drawer>

        <el-drawer
          custom-class="d-class"
          :title="$t('SmtResourceProess._49')"
          :modal="false"
          direction="rtl"
          size="60%"
          :visible.sync="innerDrawer2"
        >
          <div style="padding-left: 10px;padding-right: 20px">
            <div style="display: flex;align-items: center;">
              <span
                class="titx"
                style="font-size: 14px;color: #606266;margin-right: 10px"
              >{{ $t('SmtResourceProess._50') }}</span>
              <el-input v-model="CHUWEI" size="small" style="width: 40%">
                <template slot="append">
                  <i class="el-icon-close" @click="CHUWEI = ''" />
                </template>
              </el-input>
            </div>
            <div style="padding-top: 10px">
              <vxe-table
                ref="__xTable"
                class="table-container5"
                border
                resizable
                height="100%"
                size="medium"
                align="center"
                show-overflow
                highlight-hover-row
                auto-resize
                keep-source
                stripe
                :loading="loading"
                :data="PCmainTable"
                :radio-config="{highlight: true}"
                @radio-change="radioChangeEvent"
              >
                <vxe-table-column type="radio" width="60" />
                <vxe-table-column :title="$t('SmtResourceProess._51')" field="CODE" />
                <vxe-table-column :title="$t('SmtResourceProess._52')" field="VALUE" />
                <vxe-table-column :title="$t('SmtResourceProess._53')" field="CN_DESC" />
              </vxe-table>
            </div>
            <div style="padding-top: 10px;text-align: right;">
              <el-button
                type="success"
                size="small"
                icon="el-icon-check"
                @click="makeSureChooseLocation"
              >{{ $t('publics.btn.makeSure') }}</el-button>
              <el-button
                type="danger"
                size="small"
                icon="el-icon-close"
                @click="innerDrawer2 = false"
              >{{ $t('publics.btn.cancel') }}</el-button>
            </div>
          </div>
        </el-drawer>
      </div>
    </el-drawer>
  </d2-container>
</template>

<script>
import {
  GetBatchNo,
  GetLoction,
  GetBatchDeatil,
  AddResource,
  GetResourceRuncardView,
  GetResourceRouteOperationView,
  GetResourceRuncardLogView,
  // eslint-disable-next-line no-unused-vars
  ProcessResourceRuncard,
  ProcessResourceGiveOut,
  ProcessResourceFinish,
  GetReelCode,
  GetBatchByLoc,
  GetReelInfoViewModel
} from '@/api/SmtResourceProess'
import customContainerHeader from '@/components/custom-container-header'
import { mapGetters } from 'vuex'
export default {
  name: 'SmtResourceProess',
  components: {
    customContainerHeader
  },
  computed: {
    ...mapGetters(['userinfo'])
  },
  data () {
    return {
      form: {
        BATCH_NO: '',
        REEL_NO: '',
        FRIDGE_LOC: '',
        OPERATOR: '',
        REMARK: ''
      },
      PCNUMBER: '',
      CHUWEI: '',
      drawFlag: false, // 批量冷藏flag
      isContinuous: true,
      mainTable: [],
      validRules: [],
      loading: false,
      innerDrawer: false, // 选择批次号flag
      PCmainTable: [],
      innerDrawer2: false, // 选择冰箱储位flag
      jobList: [], // 当前资源作业状态list
      historyList: [], // 历史作业记录明细list
      PCDetailData: {
        // 批次明细信息
        bathNo: ''
      },
      zForm: {
        resourceNo: '', // 辅料条码编号
        nextOperationId: '',
        user: ''
      },
      chuweiData: {},
      mainTablePag: {
        Page: 1,
        Limit: 20
      },
      mainTableTotal: 0,
      PCmainTablePag: {
        Page: 1,
        Limit: 20
      },
      PCmainTableTotal: 0,
      zhichengList: [],
      reelInfo: {}
    }
  },
  methods: {
    clearAll () {
      this.zForm = {}
      this.PCmainTable = []
      this.form = {}
      this.jobList = []
      this.historyList = []
    },
    searchClick () {
      this.getFuliaoList()
      this.getFuliaoList()
    },
    async openDrawFlag () {
      this.drawFlag = true
      const result = await GetBatchNo()
      this.form = {
        BATCH_NO: result.Result,
        REEL_NO: '',
        FRIDGE_LOC: '',
        OPERATOR: this.userinfo.USER_NAME,
        REMARK: ''
      }
      this.reelInfo = {}
    },
    async openInnerDrawer (type) {
      this.currentPCType = type
      if (!this.form.FRIDGE_LOC) {
        this.$confirm(
          this.$t('SmtResourceProess._54'),
          this.$t('publics.tips.tips'),
          {
            confirmButtonText: this.$t('publics.btn.makeSure'),
            cancelButtonText: this.$t('publics.btn.cancel')
          }
        ).then(_ => {
          this.chooseLocation()
        })
      } else {
        this.innerDrawer = true
        this.getPiCi()
      }
    },
    async searchBathDetail () {
      if (!this.PCDetailData.bathNo) {
        this.$message.error(this.$t('SmtResourceProess._55'))
        return false
      }
      const result = await GetBatchDeatil(this.PCDetailData.bathNo)
      if (result.Result) {
        this.mainTable = result.Result
      }
    },
    async updateBathNo () {
      if (
        await this.$confirm(
          this.$t('SmtResourceProess._56'),
          this.$t('publics.tips.tips'),
          {
            confirmButtonText: this.$t('publics.btn.makeSure'),
            cancelButtonText: this.$t('publics.btn.cancel'),
            type: 'warning'
          }
        ).catch(_ => {})
      ) {
        const result = await GetBatchNo()
        this.form = {
          BATCH_NO: result.Result,
          REEL_NO: '',
          FRIDGE_LOC: '',
          OPERATOR: this.userinfo.USER_NAME,
          REMARK: ''
        }
      }
    },
    async handleCheckReedID () {
      const result = await GetReelCode(this.form.REEL_NO).catch(_ => {
        this.form.REEL_NO = ''
      })
      if (result.Result) {
        this.form.REEL_NO = result.Result
        // TODO 查询物料条码详细信息
        const res = await GetReelInfoViewModel(this.form.REEL_NO)
        if (res.Result) {
          this.reelInfo = res.Result
          this.refrigerationSubmit()
        } else {
          this.reelInfo = {}
        }
      }
    },
    async refrigerationSubmit () {
      // 冷藏保存
      const result = await AddResource({
        BATCH_NO: this.form.BATCH_NO,
        REEL_NO: this.form.REEL_NO,
        FRIDGE_LOC: this.form.FRIDGE_LOC,
        OPERATOR: this.form.OPERATOR,
        REMARK: this.form.REMARK
      })
      if (result.Result) {
        this.form.REEL_NO = ''
        this.PCDetailData.bathNo = this.form.BATCH_NO
        this.searchBathDetail()
        this.$message.success(this.$t('publics.tips.handleSuccess'))
      }
    },
    async chooseLocation () {
      // 选择储位
      this.innerDrawer2 = true
      const result = await GetLoction()
      this.PCmainTable = result.Result || []
    },
    makeSureChooseLocation () {
      this.form.FRIDGE_LOC = this.chuweiData.VALUE
      this.form.CN_DESC = this.chuweiData.CN_DESC
      this.innerDrawer2 = false
    },
    radioChangeEvent (e) {
      const item = e.row
      this.chuweiData = item.NAME || item
    },
    async useFinished () {
      // 用完
      if (!this.zForm.resourceNo) {
        this.$message.error(this.$t('SmtResourceProess._57'))
        return false
      }
      if (
        await this.$confirm(
          this.$t('SmtResourceProess._58'),
          this.$t('publics.tips.tips'),
          {
            confirmButtonText: this.$t('publics.btn.makeSure'),
            cancelButtonText: this.$t('publics.btn.cancel')
          }
        ).catch(_ => {})
      ) {
        const result = await ProcessResourceFinish({
          resourceNo: this.zForm.resourceNo,
          user: this.userinfo.USER_NAME
        })
        if (result.Result) {
          this.zForm = {}
          this.zhichengList = []
          this.jobList = []
          this.historyList = []
          this.$message.success(this.$t('publics.tips.handleSuccess'))
        }
      }
    },
    async handleCheckReelID () {
      // 检查辅料条码
      const result = await GetReelCode(this.zForm.resourceNo).catch(_ => {})
      if (result.Result) {
        this.zForm.resourceNo = result.Result
      }
    },
    async scrapped () {
      // 报废
      if (!this.zForm.resourceNo) {
        this.$message.error(this.$t('SmtResourceProess._59'))
        return false
      }
      if (
        await this.$confirm(
          this.$t('SmtResourceProess._60'),
          this.$t('publics.tips.tips'),
          {
            confirmButtonText: this.$t('publics.btn.makeSure'),
            cancelButtonText: this.$t('publics.btn.cancel')
          }
        ).catch(_ => {})
      ) {
        const result = await ProcessResourceGiveOut({
          resourceNo: this.zForm.resourceNo,
          user: this.userinfo.USER_NAME
        })
        if (result.Result) {
          this.zForm = {}
          this.zhichengList = []
          this.jobList = []
          this.historyList = []
          this.$message.success(this.$t('publics.tips.handleSuccess'))
        }
      }
    },
    async handleToNext () {
      // 进入下一流程作业
      if (!this.zForm.resourceNo) {
        this.$message.error(this.$t('SmtResourceProess._61'))
        return false
      }
      this.zForm.user = this.userinfo.USER_NAME
      if (!this.zForm.nextOperationId) {
        this.$message.error(this.$t('SmtResourceProess._199'))
        return false
      }
      const res = await ProcessResourceRuncard(this.zForm)
      if (res.Result) {
        if (res.Result.ResultInfo) {
          this.this.$message({
            type: 'info',
            message: res.Result.ResultInfo
          })
        }
        this.$message.success(this.$t('publics.tips.handleSuccess'))
        this.zForm = {}
        this.zhichengList = []
        this.jobList = []
        this.historyList = []
      }
    },
    async getZhiCheng (RESOURCE_ID) {
      // 获取制程
      if (!this.zForm.resourceNo) return false
      // eslint-disable-next-line no-unused-vars
      const result = await GetResourceRouteOperationView(RESOURCE_ID)
      this.zhichengList = result.Result || []
    },
    async getHistoryList () {
      // 获取辅料历史作业记录
      if (!this.zForm.resourceNo) return false
      // eslint-disable-next-line no-unused-vars
      const result = await GetResourceRuncardLogView(this.zForm.resourceNo)
      this.historyList = result.Result || []
    },
    handleSizeChange (Limit) {
      this.mainTablePag.Limit = Limit
      this.mainTablePag.Page = 1
      this.getPiCi(0)
    },
    handleCurrentChange (Page) {
      this.mainTablePag.Page = Page
      this.getPiCi(0)
    },
    handleSizeChange1 (Limit) {
      this.PCmainTablePag.Limit = Limit
      this.PCmainTablePag.Page = 1
      this.getPiCi(1)
    },
    handleCurrentChange1 (Page) {
      this.PCmainTablePag.Page = Page
      this.getPiCi(1)
    },
    async handleCheckReelID2 () {
      // 检查辅料条码
      const result = await GetReelCode(this.zForm.resourceNo).catch(_ => {
        this.zForm.resourceNo = ''
      })
      if (result.Result) {
        this.zForm.resourceNo = result.Result
        this.getFuliaoList()
        this.getHistoryList()
      }
    },
    // 获取辅料的当前作业
    async getFuliaoList () {
      // eslint-disable-next-line no-unused-vars
      const result = await GetResourceRuncardView(this.zForm.resourceNo)
      if (result.Result) {
        this.jobList = [result.Result]
        this.zForm.nextOperationId = result.Result.NEXT_OPERATION.toString()
        this.getZhiCheng(result.Result.RESOURCE_ID)
      } else {
        this.jobList = []
      }
    },
    // 获取批次
    async getPiCi () {
      if (!this.form.FRIDGE_LOC) return false
      const result = await GetBatchByLoc(this.form.FRIDGE_LOC)
      if (result.Result) {
        const data = result.Result || []
        this.PCmainTable = []
        data.map((item, index) => {
          this.PCmainTable.push({
            ID: index + 1,
            NAME: item
          })
        })
        this.PCmainTableTotal = result.TotalCount
      } else {
        this.PCmainTable = []
        this.PCmainTableTotal = 0
      }
    },
    handleMakeSureX () {
      this.innerDrawer = false
      if (this.currentPCType === 1) {
        this.form.BATCH_NO = this.chuweiData
      }
      this.PCDetailData.bathNo = this.chuweiData
      this.searchBathDetail()
    }
  },
  watch: {
    PCNUMBER (val, oldVal) {
      if (val) {
        let temp = []
        this.PCmainTable.map(item => {
          if (item.NAME.indexOf(val) !== -1) {
            temp.push(item)
          }
        })
        this.PCmainTable = temp
      } else if (oldVal && !val) {
        this.getPiCi()
      }
    },
    CHUWEI (val, oldVal) {
      if (val) {
        let temp = []
        this.PCmainTable.map(item => {
          if (item.VALUE.indexOf(val) !== -1) {
            temp.push(item)
          }
        })
        this.PCmainTable = temp
      } else if (oldVal && !val) {
        this.chooseLocation()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.block-one {
  display: flex;
  justify-content: space-between;
  border: 1px solid #e5e5e5;
  border-top: none;
  border-right: none;
  .one-item {
    flex: 1;
  }
  .two-item {
    flex: 1;
    margin-left: 40px;
    .x {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
      button {
        flex: 1;
      }
    }
  }
}

.table-container2 {
  height: 200px;
}

.table-container3 {
  height: calc(
    100vh - 60px - 41px - 54px - 20px - 31px - 111px - 31px - 200px - 20px
  );
}

.shuzhe {
  height: 100%;
  margin-left: 10px;
}

.table-container4 {
  height: calc(100vh - 66px - 32px - 66px - 10px - 64px);
}

.table-container5 {
  height: calc(100vh - 66px - 32px - 32px - 10px - 10px - 42px);
}

.el-input-group__append {
  padding: 0 0 !important;
  .el-icon-more {
    padding: 0 20px;
    line-height: 30px;
  }
}
</style>
