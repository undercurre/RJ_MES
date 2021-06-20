<template>
  <d2-container>
    <!-- 头部 -->
    <template slot="header">
      <custom-container-header :isExport="false" :isExportTpl="false" :isImport="false">
        <el-button
          type="success"
          icon="el-icon-check"
          @click.prevent="save"
          v-if="$btnList.indexOf('SmtFeederRepairSave') !== -1"
        >{{ $t('publics.btn.save') }}</el-button>
        <el-button
          type="danger"
          icon="el-icon-delete"
          @click.prevent="clearAll"
        >{{ $t('publics.btn.clear') }}</el-button>
      </custom-container-header>
    </template>
    <div>
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="120px"
        class="xform1"
        size="mini"
        :show-message="false"
      >
        <el-row>
          <el-col :span="19">
            <div class="grid-content bg-purple">
              <el-form-item :label="$t('SmtFeederRepair._1')" prop="feeder">
                <el-input v-model="form.feeder" class="myInputx" @keyup.native.enter="getLoadData">
                  <template slot="append">
                    <i class="el-icon-search" style="cursor: pointer;" @click="openLj" />
                  </template>
                </el-input>
              </el-form-item>
              <el-col :span="8">
                <div
                  style="margin-right: 5px;border: 1px solid #e5e5e5; ovreflow: auto; height: 188px;padding: 0 5px"
                >
                  <el-checkbox-group v-model="checkList">
                    <div v-for="item in netData.DefectList" :key="item.CODE" class="items-x">
                      <el-checkbox :label="item.NAME" />
                    </div>
                  </el-checkbox-group>
                </div>
              </el-col>
              <el-col :span="16">
                <el-form-item :label="$t('SmtFeederRepair._2')" prop="REASON_CODE">
                  <el-input v-model="form.REASON_CODE" class="myInputx">
                    <template slot="append">
                      <i class="el-icon-search" style="cursor: pointer;" @click="openYY" />
                    </template>
                  </el-input>
                </el-form-item>
                <el-form-item :label="$t('SmtFeederRepair._3')" prop="DAMAGE_PART">
                  <el-input v-model="form.DAMAGE_PART" class="myInputx">
                    <template slot="append">
                      <i class="el-icon-search" style="cursor: pointer;" @click="openSHBJ" />
                    </template>
                  </el-input>
                </el-form-item>
                <!-- <el-form-item :label="$t('SmtFeederRepair._4')" prop="REPAIR_ITEM">
                  <el-input v-model="form.REPAIR_ITEM" class="myInputx">
                    <template slot="append">
                      <i class="el-icon-search" style="cursor: pointer;" @click="openJCXM" />
                    </template>
                  </el-input>
                </el-form-item>-->
                <el-form-item :label="$t('SmtFeederRepair._5')" prop="METHOD">
                  <el-input v-model="form.METHOD" />
                </el-form-item>
                <el-form-item :label="$t('SmtFeederRepair._6')" prop="RESULT">
                  <el-select v-model="form.RESULT" style="width: 100%" placeholder=" ">
                    <el-option
                      v-for="item in resultList"
                      :key="item.ID"
                      :label="item.NAME"
                      :value="item.ID"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </div>
          </el-col>
          <el-col :span="5">
            <div class="grid-content bg-purple-light">
              <div
                style="margin-left: 5px;margin-right: 5px;border: 1px solid #e5e5e5;height: 226px;padding: 0 5px;display: flex;align-items: center;"
              >
                <div
                  style="display: flex;flex-direction: column;justify-content: space-between;height: 30%"
                >
                  <div
                    style="font-size: 16px;font-weight: blod;color: rgb(100, 236, 72);background: rgb(54, 123, 33)"
                  >{{ $t('SmtFeederRepair._7') }}{{ netData.RepairCountByMonth }}</div>
                  <div
                    style="font-size: 16px;font-weight: blod;color: rgb(100, 236, 72);background: rgb(54, 123, 33)"
                  >{{ $t('SmtFeederRepair._8') }}{{ netData.RepairTotalCount }}</div>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div>
      <span
        class="demonstration"
        style="display: block;color: #8492a6;font-size: 14px;margin: 10px 0;"
      >{{ $t('SmtFeederRepair._9') }}</span>
    </div>
    <!-- 维修记录表格 -->
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
        :data="netData.RepairList"
      >
        <vxe-table-column min-width="150" field="CHECKER_BY" :title="$t('SmtFeederRepair._10')"  />
        <vxe-table-column min-width="150" field="REPAIRER_BY" :title="$t('SmtFeederRepair._11')"  />
        <vxe-table-column min-width="150" field="DEFECT_CODE" width="120" :title="$t('SmtFeederRepair._12')" />
        <vxe-table-column min-width="150" field="REASON_CODE" width="150" :title="$t('SmtFeederRepair._13')" />
        <vxe-table-column min-width="150" field="DAMAGE_PART" width="120" :title="$t('SmtFeederRepair._14')" />
        <vxe-table-column min-width="150" field="REPAIR_ITEM" width="120" :title="$t('SmtFeederRepair._15')" />
        <vxe-table-column min-width="150" field="METHOD" width="120" :title="$t('SmtFeederRepair._16')" />
        <vxe-table-column min-width="150" field="DEFECT_TIME" width="150" :title="$t('SmtFeederRepair._17')" />
        <vxe-table-column min-width="150" field="REPAIR_TIME" width="150" :title="$t('SmtFeederRepair._18')" />
        <vxe-table-column min-width="150" field="RESULT" width="100" :title="$t('SmtFeederRepair._19')" />
        <vxe-table-column min-width="150" field="FEEDER" width="120" :title="$t('SmtFeederRepair._20')" />
        <vxe-table-column min-width="150" field="LINE_NAME" width="150" :title="$t('SmtFeederRepair._21')" />
      </vxe-table>
    </div>

    <el-drawer
      custom-class="d-class"
      :title="$t('SmtFeederRepair._1')"
      :visible.sync="drawFlag1"
      direction="rtl"
      size="60%"
    >
      <div style="padding-left: 20px;padding-right: 20px">
        <div style="display: flex;margin-top: 10px;align-items: center;">
          <span
            class="titx"
            style="font-size: 14px;color: #606266;margin-right: 10px"
          >{{ $t('SmtFeederRepair._22') }}</span>
          <el-input v-model="listPag.Key" size="small" style="width: 40%" class="myInputx">
            <template slot="append">
              <i class="el-icon-close" style="cursor: pointer;" @click="listPag.Key = ''" />
            </template>
          </el-input>
          <el-button
            type="primary"
            size="small"
            icon="el-icon-search"
            style="margin-left: 10px"
            @click="() => {
              listPag.Page = 1;getFeederRepairList()
            }"
          >{{ $t('publics.btn.search') }}</el-button>
        </div>
        <div style="padding-top: 10px">
          <vxe-table
            ref="xTable"
            class="table-container1"
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
            :data="list"
            :radio-config="{highlight: true}"
            @radio-change="radioChangeEvent($event, 1)"
          >
            <vxe-table-column type="radio" width="60" />
            <vxe-table-column :title="$t('SmtFeederRepair._1')" field="NAME" />
          </vxe-table>
        </div>
        <el-pagination
          style="margin-top: 20px"
          :current-page="listPag.Page"
          :page-sizes="[20, 30, 40]"
          :page-size="listPag.Limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="listTotal"
          @size-change="handleSizeChange($event, 1)"
          @current-change="handleCurrentChange($event, 1)"
        />
        <div style="padding-top: 20px;text-align: right;">
          <el-button
            type="success"
            icon="el-icon-check"
            @click="() => {
              form.feeder = currentData.NAME;
              drawFlag1 = false;
              getLoadData();
            }"
          >{{ $t('publics.btn.makeSure') }}</el-button>
          <el-button
            type="danger"
            icon="el-icon-close"
            @click="drawFlag1 = false"
          >{{ $t('publics.btn.cancel') }}</el-button>
        </div>
      </div>
    </el-drawer>
    <!-- 损坏部件 -->
    <el-drawer
      custom-class="d-class"
      :title="$t('SmtFeederRepair._3')"
      :visible.sync="drawFlag2"
      direction="rtl"
      size="60%"
    >
      <div style="padding-left: 20px;padding-right: 20px">
        <div style="display: flex;margin-top: 10px;align-items: center;">
          <span
            class="titx"
            style="font-size: 14px;color: #606266;margin-right: 10px"
          >{{ $t('SmtFeederRepair._22') }}</span>
          <el-input v-model="listPag.Key" size="small" style="width: 40%" class="myInputx">
            <template slot="append">
              <i class="el-icon-close" style="cursor: pointer;" @click="listPag.Key = ''" />
            </template>
          </el-input>
          <el-button
            type="primary"
            size="small"
            icon="el-icon-search"
            style="margin-left: 10px"
            @click="() => {
              listPag.Page = 1;getDamagePartList()
            }"
          >{{ $t('publics.btn.search') }}</el-button>
        </div>
        <div style="padding-top: 10px">
          <vxe-table
            ref="xTable"
            class="table-container1"
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
            :data="list"
            :radio-config="{highlight: true}"
            @radio-change="radioChangeEvent($event, 2)"
          >
            <vxe-table-column type="radio" width="60" />
            <vxe-table-column :title="$t('SmtFeederRepair._23')" field="CODE" />
            <vxe-table-column :title="$t('SmtFeederRepair._24')" field="NAME" />
          </vxe-table>
        </div>
        <el-pagination
          style="margin-top: 20px"
          :current-page="listPag.Page"
          :page-sizes="[20, 30, 40]"
          :page-size="listPag.Limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="listTotal"
          @size-change="handleSizeChange($event, 2)"
          @current-change="handleCurrentChange($event, 2)"
        />
        <div style="padding-top: 20px;text-align: right;">
          <el-button
            type="success"
            icon="el-icon-check"
            @click="() => {
              form.DAMAGE_PART = currentData.NAME;
              form.DAMAGE_PART_CODE = currentData.CODE;
              drawFlag2 = false;
            }"
          >{{ $t('publics.btn.makeSure') }}</el-button>
          <el-button
            type="danger"
            icon="el-icon-close"
            @click="drawFlag2 = false"
          >{{ $t('publics.btn.cancel') }}</el-button>
        </div>
      </div>
    </el-drawer>
    <!-- 检查项目 -->
    <el-drawer
      custom-class="d-class"
      :title="$t('SmtFeederRepair._4')"
      :visible.sync="drawFlag3"
      direction="rtl"
      size="60%"
    >
      <div style="padding-left: 20px;padding-right: 20px">
        <div style="display: flex;margin-top: 10px;align-items: center;">
          <span
            class="titx"
            style="font-size: 14px;color: #606266;margin-right: 10px"
          >{{ $t('SmtFeederRepair._22') }}</span>
          <el-input v-model="listPag.Key" size="small" style="width: 40%" class="myInputx">
            <template slot="append">
              <i class="el-icon-close" style="cursor: pointer;" @click="listPag.Key = ''" />
            </template>
          </el-input>
          <el-button
            type="primary"
            size="small"
            icon="el-icon-search"
            style="margin-left: 10px"
            @click="() => {
              listPag.Page = 1;getRepairItemsList()
            }"
          >{{ $t('publics.btn.search') }}</el-button>
        </div>
        <div style="padding-top: 10px">
          <vxe-table
            ref="xTable"
            class="table-container1"
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
            :data="list"
            :radio-config="{highlight: true}"
            @radio-change="radioChangeEvent($event, 3)"
          >
            <vxe-table-column type="radio" width="60" />
            <vxe-table-column :title="$t('SmtFeederRepair._23')" field="CODE" />
            <vxe-table-column :title="$t('SmtFeederRepair._24')" field="NAME" />
          </vxe-table>
        </div>
        <el-pagination
          style="margin-top: 20px"
          :current-page="listPag.Page"
          :page-sizes="[20, 30, 40]"
          :page-size="listPag.Limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="listTotal"
          @size-change="handleSizeChange($event, 3)"
          @current-change="handleCurrentChange($event, 3)"
        />
        <div style="padding-top: 20px;text-align: right;">
          <el-button
            type="success"
            icon="el-icon-check"
            @click="() => {
              form.REPAIR_ITEM = currentData.NAME;
              form.REPAIR_ITEM_CODE = currentData.CODE;
              drawFlag3 = false;
            }"
          >{{ $t('publics.btn.makeSure') }}</el-button>
          <el-button
            type="danger"
            icon="el-icon-close"
            @click="drawFlag3 = false"
          >{{ $t('publics.btn.cancel') }}</el-button>
        </div>
      </div>
    </el-drawer>
    <!-- 根本原因 -->
    <el-drawer
      custom-class="d-class"
      :title="$t('SmtFeederRepair._2')"
      :visible.sync="drawFlag4"
      direction="rtl"
      size="60%"
    >
      <div style="padding-left: 20px;padding-right: 20px">
        <div style="display: flex;margin-top: 10px;align-items: center;">
          <span
            class="titx"
            style="font-size: 14px;color: #606266;margin-right: 10px"
          >{{ $t('SmtFeederRepair._22') }}</span>
          <el-input v-model="listPag.Key" size="small" style="width: 40%" class="myInputx">
            <template slot="append">
              <i class="el-icon-close" style="cursor: pointer;" @click="listPag.Key = ''" />
            </template>
          </el-input>
          <el-button
            type="primary"
            size="small"
            icon="el-icon-search"
            style="margin-left: 10px"
            @click="() => {
              listPag.Page = 1;
              getReasonList()
            }"
          >{{ $t('publics.btn.search') }}</el-button>
        </div>
        <div style="padding-top: 10px">
          <vxe-table
            ref="xTable"
            class="table-container1"
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
            :data="list"
            :radio-config="{highlight: true}"
            @radio-change="radioChangeEvent($event, 4)"
          >
            <vxe-table-column type="radio" width="60" />
            <vxe-table-column :title="$t('SmtFeederRepair._23')" field="CODE" />
            <vxe-table-column :title="$t('SmtFeederRepair._24')" field="NAME" />
          </vxe-table>
        </div>
        <el-pagination
          style="margin-top: 20px"
          :current-page="listPag.Page"
          :page-sizes="[20, 30, 40]"
          :page-size="listPag.Limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="listTotal"
          @size-change="handleSizeChange($event, 4)"
          @current-change="handleCurrentChange($event, 4)"
        />
        <div style="padding-top: 20px;text-align: right;">
          <el-button
            type="success"
            icon="el-icon-check"
            @click="() => {
              form.REASON_CODE = currentData.NAME;
              form.REASON_CODE_CODE = currentData.CODE;
              drawFlag4 = false;
            }"
          >{{ $t('publics.btn.makeSure') }}</el-button>
          <el-button
            type="danger"
            icon="el-icon-close"
            @click="drawFlag4 = false"
          >{{ $t('publics.btn.cancel') }}</el-button>
        </div>
      </div>
    </el-drawer>
  </d2-container>
</template>

<script>
import {
  LoadData,
  GetFeeder2RepairList,
  GetReasonList,
  GetDamagePartList,
  GetRepairItemsList,
  GetResultList,
  SaveData
} from '@/api/SmtFeederRepair'
import customContainerHeader from '@/components/custom-container-header'
import { mapGetters } from 'vuex'
export default {
  name: 'SmtFeederRepair',
  components: {
    customContainerHeader
  },
  computed: {
    ...mapGetters(['userinfo'])
  },
  data () {
    return {
      form: {
        feeder: '',
        REASON_CODE: '',
        REASON_CODE_CODE: '',
        UserName: '',
        DEFECT_CODE: '',
        DAMAGE_PART: '',
        DAMAGE_PART_CODE: '',
        REPAIR_ITEM: '',
        REPAIR_ITEM_CODE: '',
        METHOD: '',
        RESULT: ''
      },
      checkList: [],
      mainTable: [],
      loading: false,
      drawFlag1: false,
      drawFlag2: false,
      drawFlag3: false,
      drawFlag4: false,
      list: [],
      listPag: {
        Page: 1,
        Limit: 20,
        Key: ''
      },
      listTotal: 0,
      currentData: {},
      currentType: 0,
      resultList: [],
      netData: {
        FEEDER_MUST_SCRAP_COUNT: 0,
        FEEDER_ID: 0,
        RepairCountByMonth: 0,
        RepairTotalCount: 0,
        DefectList: [],
        RepairList: []
      },
      rules: {
        feeder: [
          {
            required: true,
            message: '请输入料架',
            trigger: 'blur'
          }
        ],
        REASON_CODE: [
          {
            required: true,
            message: '请输入根本原因',
            trigger: 'blur'
          }
        ],
        DAMAGE_PART: [
          {
            required: true,
            message: '请输入损坏部件',
            trigger: 'blur'
          }
        ],
        // REPAIR_ITEM: [{
        //   required: true,
        //   message: '请输入检查项目',
        //   trigger: 'blur'
        // }],
        METHOD: [
          {
            required: true,
            message: '请输入维修方法',
            trigger: 'blur'
          }
        ],
        RESULT: [
          {
            required: true,
            message: '请输入维修结果',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    handleSizeChange (Limit, type) {
      this.listPag.Page = 1
      this.listPag.Limit = Limit
      this.handleChangePage(type)
    },
    handleCurrentChange (Page, type) {
      this.listPag.Page = Page
      this.handleChangePage(type)
    },
    handleChangePage (type) {
      switch (type) {
        case 1:
          this.getLoadData()
          break
        case 2:
          this.getDamagePartList()
          break
        case 3:
          this.getRepairItemsList()
          break
        case 4:
          this.getReasonList()
          break
      }
    },
    // 查询飞达维修信息
    async getLoadData (isTips = true) {
      if (!this.form.feeder) {
        this.$message.error(this.$t('SmtFeederRepair._25'))
        return false
      }
      const result = await LoadData(this.form.feeder)
      if (result.Result) {
        this.netData = result.Result
        if (
          isTips &&
          result.Result.RepairCountByMonth >
            result.Result.FEEDER_MUST_SCRAP_COUNT
        ) {
          if (
            await this.$confirm(
              this.$t('SmtFeederRepair._26'),
              this.$t('publics.tips.tips'),
              {
                confirmButtonText: this.$t('publics.tips.confirm'),
                cancelButtonText: this.$t('publics.tips.cancel')
              }
            ).catch(_ => {})
          ) {
            // 报废
            this.form.RESULT = '4'
          }
        }
      } else {
        this.form.feeder = ''
        this.$message.error(this.$t('SmtFeederRepair._27'))
      }
    },
    // 打开料架
    openLj () {
      this.drawFlag1 = true
      this.listPag = {
        Page: 1,
        Limit: 20,
        Key: ''
      }
      this.getFeederRepairList()
    },
    // 获取维修料架
    async getFeederRepairList () {
      const result = await GetFeeder2RepairList(this.listPag)
      if (result.Result) {
        this.list = result.Result
        this.listTotal = result.TotalCount
      } else {
        this.list = []
        this.listTotal = 0
      }
    },
    radioChangeEvent (e, type) {
      console.log(e)
      this.currentData = e.row
      this.currentType = type
    },
    // 获取维修结果列表
    async getResultList () {
      const result = await GetResultList()
      if (result.Result) {
        this.resultList = result.Result
      } else {
        this.resultList = []
      }
    },
    // 打开损坏部件
    openSHBJ () {
      this.drawFlag2 = true
      this.listPag = {
        Page: 1,
        Limit: 20,
        Key: ''
      }
      this.getDamagePartList()
    },
    // 获取损坏部件列表
    async getDamagePartList () {
      const result = await GetDamagePartList(this.listPag)
      if (result.Result) {
        this.list = result.Result
        this.listTotal = result.TotalCount
      } else {
        this.list = []
        this.listTotal = 0
      }
    },
    // 打开检查项目
    openJCXM () {
      this.drawFlag3 = true
      this.listPag = {
        Page: 1,
        Limit: 20,
        Key: ''
      }
      this.getDamagePartList()
    },
    // 获取检查項目列表
    async getRepairItemsList () {
      const result = await GetRepairItemsList(this.listPag)
      if (result.Result) {
        this.list = result.Result
        this.listTotal = result.TotalCount
      } else {
        this.list = []
        this.listTotal = 0
      }
    },
    // 打开根本原因
    openYY () {
      this.drawFlag4 = true
      this.listPag = {
        Page: 1,
        Limit: 20,
        Key: ''
      }
      this.getReasonList()
    },
    // 获取根本原因列表
    async getReasonList () {
      const result = await GetReasonList(this.listPag)
      if (result.Result) {
        this.list = result.Result
        this.listTotal = result.TotalCount
      } else {
        this.list = []
        this.listTotal = 0
      }
    },
    // 清空
    clearAll () {
      this.netData = {
        FEEDER_MUST_SCRAP_COUNT: 0,
        FEEDER_ID: 0,
        RepairCountByMonth: 0,
        RepairTotalCount: 0,
        DefectList: [],
        RepairList: []
      }
      this.form = {
        feeder: '',
        REASON_CODE: '',
        REASON_CODE_CODE: '',
        UserName: '',
        DEFECT_CODE: '',
        DAMAGE_PART: '',
        DAMAGE_PART_CODE: '',
        REPAIR_ITEM: '',
        REPAIR_ITEM_CODE: '',
        METHOD: '',
        RESULT: ''
      }
      this.checkList = []
      this.mainTable = []
      this.loading = false
      this.drawFlag1 = false
      this.drawFlag2 = false
      this.drawFlag3 = false
      this.drawFlag4 = false
      this.list = []
      this.listPag = {
        Page: 1,
        Limit: 20,
        Key: ''
      }
      this.listTotal = 0
      this.currentData = {}
      this.currentType = 0
      // this.resultList = []
    },
    // 保存数据
    save () {
      this.$refs.form.validate(async (valid, errInfo) => {
        if (valid) {
          const DEFECT_CODE = []
          this.netData.DefectList.map(item => {
            if (this.checkList.indexOf(item.NAME) !== -1) {
              DEFECT_CODE.push(item.CODE)
              this.form.REPAIR_ITEM = item.NAME
            }
          })
          const formData = {
            UserName: this.userinfo.USER_NAME,
            FEEDER: this.form.feeder,
            DEFECT_CODE: DEFECT_CODE.join(','),
            REASON_CODE: this.form.REASON_CODE || this.form.REASON_CODE_CODE,
            DAMAGE_PART: this.form.DAMAGE_PART || this.form.DAMAGE_PART_CODE,
            REPAIR_ITEM: this.form.REPAIR_ITEM || this.form.REPAIR_ITEM_CODE,
            METHOD: this.form.METHOD,
            RESULT: this.form.RESULT ? parseInt(this.form.RESULT) : ''
          }
          console.log('===============>', this.form)
          const result = await SaveData(formData)
          if (result.Result) {
            this.$message.success(this.$t('publics.tips.handleSuccess'))
            this.clearAll()
          }
        } else {
          try {
            Object.keys(errInfo).forEach(item => {
              this.$message.error(errInfo[item][0].message)
              throw Error(errInfo[item][0].message)
            })
          } catch (e) {
            console.log(e.message)
          }
        }
      })
    }
  },
  created () {
    this.getResultList()
  }
}
</script>

<style lang="scss" scoped>
.table-container1 {
  height: calc(100vh - 66px - 32px - 32px - 52px - 52px - 40px);
}

.table-container2 {
  height: calc(100vh - 60px - 41px - 53px - 20px - 230px - 41px);
}
</style>
