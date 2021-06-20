<template>
  <d2-container class="defectMaintainenceReport">
    <!-- 上 -->
    <el-row :gutter="20" style="height: 40%">
      <el-col :span="17" style="height: 100%">
        <el-tabs type="border-card" ref="bigTabs" @tab-click="ChangeBigTab">
          <el-tab-pane :label="$t('_kanban._54')">
            <el-tabs
              @tab-click="ChangeTab"
              type="card"
              ref="allTransfer"
              :style="{
                height: tableHeight,
              }"
            >
              <el-tab-pane
                class="allTransfer"
                :label="$t('_kanban._17')"
              ></el-tab-pane>
              <el-tab-pane :label="$t('_kanban._18')">
                <el-form
                  ref="form"
                  :model="formData"
                  label-width="80px"
                  :show-message="false"
                >
                  <el-form-item :label="$t('_kanban._18')">
                    <el-select
                      multiple
                      @change="changeModel"
                      v-model="formData.MODEL"
                      style="width: 100%"
                      :placeholder="$t('_kanban._19')"
                    >
                      <div
                        style="
                          position: absolute;
                          width: 100%;
                          height: 6px;
                          background: #fff;
                          background: #fff;
                          top: 0;
                          z-index: 99;
                        "
                      ></div>
                      <div
                        style="
                          position: absolute;
                          width: 100%;
                          height: 6px;
                          background: #fff;
                          background: #fff;
                          bottom: 0;
                          z-index: 99;
                        "
                      ></div>
                      <div
                        style="
                          width: 600px;
                          display: flex;
                          padding: 0 20px 0 10px;
                          position: sticky;
                          top: 6px;
                          background: #fff;
                          z-index: 90;
                        "
                      >
                        <el-input
                          v-model="formData.Key"
                          @input="searchClick"
                          @keyup.enter.native="searchClick"
                        ></el-input>
                        <el-button
                          type="primary"
                          icon="el-icon-search"
                          @click.prevent="searchClick"
                          >{{ $t("publics.btn.search") }}</el-button
                        >
                      </div>
                      <el-option
                        v-for="item in modelData"
                        :key="item.R"
                        :label="item.NAME"
                        :value="item.NAME"
                        :disabled="item.disabled"
                      >
                        <span style="float: left">{{ item.NAME }}</span>
                      </el-option>
                      <div
                        style="
                          width: 600px;
                          position: sticky;
                          bottom: 6px;
                          background: #fff;
                          z-index: 90;
                          padding-left: 15px;
                        "
                      >
                        <el-pagination
                          :pager-count="5"
                          :current-page="formData.Page"
                          :page-size="formData.Limit"
                          :page-sizes="[10, 20, 30, 40]"
                          layout="total, sizes, prev, pager, next, jumper"
                          :total="formDataPage"
                          @size-change="modelSizeChange"
                          @current-change="modelCurrentChange"
                        />
                      </div>
                    </el-select>
                  </el-form-item>
                </el-form>
              </el-tab-pane>
              <el-tab-pane :label="$t('_kanban._20')">
                <el-form
                  ref="form"
                  :model="formData"
                  label-width="80px"
                  :show-message="false"
                >
                  <el-form-item :label="$t('_kanban._20')">
                    <el-select
                      multiple
                      @change="changeModel"
                      v-model="formData.PART_NO"
                      style="width: 100%"
                      :placeholder="$t('_kanban._21')"
                    >
                      <div
                        style="
                          position: absolute;
                          width: 100%;
                          height: 6px;
                          background: #fff;
                          background: #fff;
                          top: 0;
                          z-index: 99;
                        "
                      ></div>
                      <div
                        style="
                          position: absolute;
                          width: 100%;
                          height: 6px;
                          background: #fff;
                          background: #fff;
                          bottom: 0;
                          z-index: 99;
                        "
                      ></div>
                      <div
                        style="
                          width: 600px;
                          display: flex;
                          padding: 0 20px 0 10px;
                          position: sticky;
                          top: 6px;
                          background: #fff;
                          z-index: 90;
                        "
                      >
                        <el-input
                          v-model="formData.Key"
                          @input="searchClick"
                          @keyup.enter.native="searchClick"
                        ></el-input>
                        <el-button
                          type="primary"
                          icon="el-icon-search"
                          @click.prevent="searchClick"
                          >{{ $t("publics.btn.search") }}</el-button
                        >
                      </div>
                      <el-option
                        v-for="item in modelData"
                        :key="item.ID"
                        :label="item.NAME"
                        :value="item.NAME"
                        :disabled="item.disabled"
                      >
                        <span style="float: left">{{ item.NAME }}</span>
                        <span style="float: right">{{ item.DESCRIPTION }}</span>
                      </el-option>
                      <div
                        style="
                          width: 600px;
                          position: sticky;
                          bottom: 6px;
                          background: #fff;
                          z-index: 90;
                          padding-left: 15px;
                        "
                      >
                        <el-pagination
                          :pager-count="5"
                          :current-page="formData.Page"
                          :page-size="formData.Limit"
                          :page-sizes="[10, 20, 30, 40]"
                          layout="total, sizes, prev, pager, next, jumper"
                          :total="formDataPage"
                          @size-change="modelSizeChange"
                          @current-change="modelCurrentChange"
                        />
                      </div>
                    </el-select>
                  </el-form-item>
                </el-form>
              </el-tab-pane>
              <el-tab-pane :label="$t('_kanban._22')">
                <el-form
                  ref="form"
                  :model="formData"
                  label-width="80px"
                  :show-message="false"
                >
                  <el-form-item :label="$t('_kanban._22')">
                    <el-select
                      multiple
                      @change="changeModel"
                      v-model="formData.WO_NO"
                      style="width: 100%"
                      :placeholder="$t('_kanban._23')"
                    >
                      <div
                        style="
                          position: absolute;
                          width: 100%;
                          height: 6px;
                          background: #fff;
                          background: #fff;
                          top: 0;
                          z-index: 99;
                        "
                      ></div>
                      <div
                        style="
                          position: absolute;
                          width: 100%;
                          height: 6px;
                          background: #fff;
                          background: #fff;
                          bottom: 0;
                          z-index: 99;
                        "
                      ></div>
                      <div
                        style="
                          width: 600px;
                          display: flex;
                          padding: 0 20px 0 10px;
                          position: sticky;
                          top: 6px;
                          background: #fff;
                          z-index: 90;
                        "
                      >
                        <el-input
                          v-model="formData.Key"
                          @input="searchClick"
                          @keyup.enter.native="searchClick"
                        ></el-input>
                        <el-button
                          type="primary"
                          icon="el-icon-search"
                          @click.prevent="searchClick"
                          >{{ $t("publics.btn.search") }}</el-button
                        >
                      </div>
                      <el-option
                        v-for="item in modelData"
                        :key="item.ID"
                        :label="item.NAME"
                        :value="item.NAME"
                        :disabled="item.disabled"
                      >
                        <span style="float: left">{{ item.NAME }}</span>
                        <span style="float: right">{{ item.PART_NO }}</span>
                      </el-option>
                      <div
                        style="
                          width: 600px;
                          position: sticky;
                          bottom: 6px;
                          background: #fff;
                          z-index: 90;
                          padding-left: 15px;
                        "
                      >
                        <el-pagination
                          :pager-count="5"
                          :current-page="formData.Page"
                          :page-size="formData.Limit"
                          :page-sizes="[10, 20, 30, 40]"
                          layout="total, sizes, prev, pager, next, jumper"
                          :total="formDataPage"
                          @size-change="modelSizeChange"
                          @current-change="modelCurrentChange"
                        />
                      </div>
                    </el-select>
                  </el-form-item>
                </el-form>
              </el-tab-pane>
              <el-tab-pane :label="$t('_kanban._66')">
                <el-form
                  ref="form"
                  :model="formData"
                  label-width="80px"
                  :show-message="false"
                >
                  <el-form-item :label="$t('_kanban._66')">
                    <el-select
                      multiple
                      @change="changeModel"
                      v-model="formData.USERS"
                      style="width: 100%"
                      :placeholder="$t('_kanban._67')"
                    >
                      <div
                        style="
                          position: absolute;
                          width: 100%;
                          height: 6px;
                          background: #fff;
                          background: #fff;
                          top: 0;
                          z-index: 99;
                        "
                      ></div>
                      <div
                        style="
                          position: absolute;
                          width: 100%;
                          height: 6px;
                          background: #fff;
                          background: #fff;
                          bottom: 0;
                          z-index: 99;
                        "
                      ></div>
                      <div
                        style="
                          width: 600px;
                          display: flex;
                          padding: 0 20px 0 10px;
                          position: sticky;
                          top: 6px;
                          background: #fff;
                          z-index: 90;
                        "
                      >
                        <el-input
                          v-model="formData.Key"
                          @input="searchClick"
                          @keyup.enter.native="searchClick"
                        ></el-input>
                        <el-button
                          type="primary"
                          icon="el-icon-search"
                          @click.prevent="searchClick"
                          >{{ $t("publics.btn.search") }}</el-button
                        >
                      </div>
                      <el-option
                        v-for="item in modelData"
                        :key="item.R"
                        :label="item.NAME"
                        :value="item.NAME"
                        :disabled="item.disabled"
                      >
                        <span style="float: left">{{ item.NAME }}</span>
                      </el-option>
                      <div
                        style="
                          width: 600px;
                          position: sticky;
                          bottom: 6px;
                          background: #fff;
                          z-index: 90;
                          padding-left: 15px;
                        "
                      >
                        <el-pagination
                          :pager-count="5"
                          :current-page="formData.Page"
                          :page-size="formData.Limit"
                          :page-sizes="[10, 20, 30, 40]"
                          layout="total, sizes, prev, pager, next, jumper"
                          :total="formDataPage"
                          @size-change="modelSizeChange"
                          @current-change="modelCurrentChange"
                        />
                      </div>
                    </el-select>
                  </el-form-item>
                </el-form>
              </el-tab-pane>
              <el-tab-pane :label="$t('_kanban._68')">
                <el-form
                  ref="form"
                  :model="formData"
                  label-width="80px"
                  :show-message="false"
                >
                  <el-form-item :label="$t('_kanban._68')">
                    <el-select
                      multiple
                      @change="changeModel"
                      v-model="formData.SN"
                      style="width: 100%"
                      :placeholder="$t('_kanban._69')"
                    >
                      <div
                        style="
                          position: absolute;
                          width: 100%;
                          height: 6px;
                          background: #fff;
                          background: #fff;
                          top: 0;
                          z-index: 99;
                        "
                      ></div>
                      <div
                        style="
                          position: absolute;
                          width: 100%;
                          height: 6px;
                          background: #fff;
                          background: #fff;
                          bottom: 0;
                          z-index: 99;
                        "
                      ></div>
                      <div
                        style="
                          width: 600px;
                          display: flex;
                          padding: 0 20px 0 10px;
                          position: sticky;
                          top: 6px;
                          background: #fff;
                          z-index: 90;
                        "
                      >
                        <el-input
                          v-model="formData.Key"
                          @input="searchClick"
                          @keyup.enter.native="searchClick"
                        ></el-input>
                        <el-button
                          type="primary"
                          icon="el-icon-search"
                          @click.prevent="searchClick"
                          >{{ $t("publics.btn.search") }}</el-button
                        >
                      </div>
                      <el-option
                        v-for="item in modelData"
                        :key="item.ID"
                        :label="item.NAME"
                        :value="item.NAME"
                        :disabled="item.disabled"
                      >
                        <span style="float: left">{{ item.NAME }}</span>
                      </el-option>
                      <div
                        style="
                          width: 600px;
                          position: sticky;
                          bottom: 6px;
                          background: #fff;
                          z-index: 90;
                          padding-left: 15px;
                        "
                      >
                        <el-pagination
                          :pager-count="5"
                          :current-page="formData.Page"
                          :page-size="formData.Limit"
                          :page-sizes="[10, 20, 30, 40]"
                          layout="total, sizes, prev, pager, next, jumper"
                          :total="formDataPage"
                          @size-change="modelSizeChange"
                          @current-change="modelCurrentChange"
                        />
                      </div>
                    </el-select>
                  </el-form-item>
                </el-form>
              </el-tab-pane>
            </el-tabs>
          </el-tab-pane>
          <el-tab-pane :label="$t('_kanban._70')">
            <el-form :model="formData" label-width="80px" :show-message="false">
              <el-form-item :label="$t('_kanban._71')">
                <el-select
                  multiple
                  @change="changeModel"
                  v-model="formData.FLOOR"
                  style="width: 100%"
                  :placeholder="$t('_kanban._72')"
                >
                  <div
                    style="
                      position: absolute;
                      width: 100%;
                      height: 6px;
                      background: #fff;
                      background: #fff;
                      top: 0;
                      z-index: 99;
                    "
                  ></div>
                  <div
                    style="
                      position: absolute;
                      width: 100%;
                      height: 6px;
                      background: #fff;
                      background: #fff;
                      bottom: 0;
                      z-index: 99;
                    "
                  ></div>
                  <div
                    style="
                      width: 600px;
                      display: flex;
                      padding: 0 20px 0 10px;
                      position: sticky;
                      top: 6px;
                      background: #fff;
                      z-index: 90;
                    "
                  >
                    <el-input
                      v-model="formData.Key"
                      @input="searchFloor"
                      @keyup.enter.native="searchFloor"
                    ></el-input>
                    <el-button
                      type="primary"
                      icon="el-icon-search"
                      @click.prevent="searchFloor"
                      >{{ $t("publics.btn.search") }}</el-button
                    >
                  </div>
                  <el-option
                    v-for="item in floorData"
                    :key="item.ID"
                    :label="item.NAME"
                    :value="item.ID"
                  >
                    <span style="float: left">{{ item.NAME }}</span>
                  </el-option>
                  <div
                    style="
                      width: 600px;
                      position: sticky;
                      bottom: 6px;
                      background: #fff;
                      z-index: 90;
                      padding-left: 15px;
                    "
                  >
                    <el-pagination
                      :pager-count="5"
                      :current-page="formData.Page"
                      :page-size="formData.Limit"
                      :page-sizes="[10, 20, 30, 40]"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="formDataPage"
                      @size-change="modelSizeChange"
                      @current-change="modelCurrentChange"
                    />
                  </div>
                </el-select>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="7" style="height: 100%">
        <el-card style="height: 100%">
          <div slot="header">
            <el-radio-group v-model="DetailForm.PLANTTYPE">
              <el-radio :label="1">{{ $t("_kanban._73") }}</el-radio>
              <el-radio :label="2">{{ $t("_kanban._74") }}</el-radio>
            </el-radio-group>
          </div>
          <el-checkbox-group v-model="checkList">
            <el-checkbox label="0" disabled>{{
              $t("_kanban._26")
            }}</el-checkbox>
          </el-checkbox-group>
          <el-form
            ref="formData"
            :model="formData"
            label-position="left"
            label-width="80px"
          >
            <el-form-item :label="$t('_kanban._28')">
              <el-date-picker
                style="width: 100%"
                v-model="DetailForm.BEGIN_TIME"
                type="datetime"
                :placeholder="$t('_kanban._29')"
                value-format="yyyy-MM-dd HH:mm:ss"
              />
            </el-form-item>
            <el-form-item :label="$t('_kanban._30')">
              <el-date-picker
                style="width: 100%"
                v-model="DetailForm.END_TIME"
                type="datetime"
                :placeholder="$t('_kanban._31')"
                value-format="yyyy-MM-dd HH:mm:ss"
              />
            </el-form-item>
            <el-button
              style="width: 100%"
              type="primary"
              icon="el-icon-search"
              @click.prevent="getDefectReportList"
              >{{ $t("srr._4") }}</el-button
            >
            <el-button
              style="width: 100%; margin: 10px 0 0 0"
              type="info"
              icon="el-icon-s-order"
              @click.prevent="exportEvent"
              >{{ $t("publics.btn.export") }}</el-button
            >
          </el-form>
          <el-radio-group
            v-model="DetailForm.REPORTTYPE"
            style="margin-top: 10px"
          >
            <el-radio :label="1">{{ $t("_kanban._75") }}</el-radio>
            <el-radio :label="2">{{ $t("_kanban._76") }}</el-radio>
            <el-radio :label="3">{{ $t("_kanban._77") }}</el-radio>
          </el-radio-group>
        </el-card>
      </el-col>
    </el-row>
    <!-- 下 -->
    <el-card style="height: 57%; margin-top: 10px" ref="tableTransfer">
      <el-table
        ref="xTableData"
        id="xTableData"
        border
        resizable
        :height="tableHeight"
        size="medium"
        align="center"
        show-overflow
        auto-resize
        keep-source
        :data="mainTable"
      >
        <el-table-column min-width="120" prop="SN" :label="$t('_kanban._68')" />
        <el-table-column min-width="120" prop="PSN" :label="'PSN'" />
        <el-table-column
          min-width="120"
          prop="STATUS"
          :label="$t('_kanban._47')"
        />
        <el-table-column
          min-width="120"
          prop="CURRENT_SITE"
          :label="$t('_kanban._78')"
        />
        <el-table-column
          min-width="120"
          prop="WO_NO"
          :label="$t('_kanban._22')"
        />
        <el-table-column
          min-width="120"
          prop="PART_NO"
          :label="$t('_kanban._20')"
        />
        <el-table-column
          min-width="120"
          prop="MODEL"
          :label="$t('_kanban._18')"
        />
        <el-table-column
          min-width="120"
          prop="INPUT_TIME"
          :label="$t('_kanban._79')"
        />
        <el-table-column
          min-width="120"
          prop="REPAIR_SITE"
          :label="$t('_kanban._80')"
        />
      </el-table>
    </el-card>
  </d2-container>
</template>

<script>
import {
  GetSiteStatisticsConditionList,
  GetDefectReportList
} from '@/api/DefectMaintainenceReport'
import XLSX from 'xlsx'
import downloadjs from 'downloadjs'
import dayjs from 'dayjs'
export default {
  name: 'DefectMaintainenceReport',
  data () {
    return {
      formData: {
        Limit: 10,
        Page: 1,
        TYPE: 0
      },
      tableHeight: '200px',
      modelData: [],
      formDataPage: 0,
      DetailForm: {
        ALL: true,
        MODEL: [],
        PART_NO: [],
        WO_NO: [],
        LINE_ID: [],
        USERS: [],
        SN: [],
        FLOOR: [],
        BEGIN_TIME: '',
        END_TIME: '',
        PLANTTYPE: 0,
        REPORTTYPE: 0
      },
      checkList: ['0'],
      floorData: [],
      mainTable: []
    }
  },
  watch: {
    modelData (val) {
      if (val.length === 0) {
        this.modelData.push({
          ID: '',
          NAME: '',
          R: '',
          disabled: true
        })
      }
    }
  },
  methods: {
    async ChangeBigTab (e) {
      if (e.index === '1') {
        this.formData.TYPE = 8
        this.formData.bigTYPE = 2
        const res = await GetSiteStatisticsConditionList(this.formData)
        this.formDataPage = res.Result.count ? res.Result.count : 0
        this.floorData = res.Result.data ? res.Result.data : []
      } else {
        this.formData.bigTYPE = 1
      }
    },
    ChangeTab (e) {
      this.cleanClick()
      if (e.index > 3) {
        this.formData.TYPE = parseInt(e.index) + 2
      } else {
        this.formData.TYPE = parseInt(e.index)
      }
      if (this.formData.TYPE === 0) return
      this.getSiteStatisticsConditionList()
    },
    async getSiteStatisticsConditionList () {
      const res = await GetSiteStatisticsConditionList(this.formData)
      this.modelData = res.Result.data ? res.Result.data : []
      this.formDataPage = res.Result.count ? res.Result.count : 0
    },
    async getDefectReportList () {
      if (this.formData.TYPE === 0) {
        this.DetailForm.ALL = true
      } else {
        this.DetailForm.ALL = false
        if (this.formData.TYPE === 1) {
          this.DetailForm.MODEL = this.formData.MODEL
        } else if (this.formData.TYPE === 2) {
          this.DetailForm.PART_NO = this.formData.PART_NO
        } else if (this.formData.TYPE === 3) {
          this.DetailForm.WO_NO = this.formData.WO_NO
        } else if (this.formData.TYPE === 6) {
          this.DetailForm.USERS = this.formData.USERS
        } else if (this.formData.TYPE === 7) {
          this.DetailForm.SN = this.formData.SN
        }
      }

      if (this.formData.TYPE === 8) {
        this.DetailForm.FLOOR = this.formData.FLOOR
      }
      const res = await GetDefectReportList(this.DetailForm)
      this.mainTable = res.Result ? res.Result : []
    },
    searchFloor () {
      this.formData.Page = 1
      this.getSiteStatisticsConditionList()
    },
    // 清除
    cleanClick () {
      this.formData = {
        Page: 1,
        Limit: 10,
        TYPE: 0
      }
      this.DetailForm = {
        ALL: true,
        MODEL: [],
        PART_NO: [],
        WO_NO: [],
        LINE_ID: [],
        USERS: [],
        SN: [],
        FLOOR: [],
        // BEGIN_TIME: dayjs().format('YYYY-MM-DD HH:mm:ss '),
        // END_TIME: dayjs().format('YYYY-MM-DD HH:mm:ss '),
        BEGIN_TIME: this.DetailForm.BEGIN_TIME,
        END_TIME: this.DetailForm.END_TIME,
        PLANTTYPE: 0,
        REPORTTYPE: 0
      }
      this.checkList = ['0']
    },
    searchClick () {
      this.formData.Page = 1
      this.getSiteStatisticsConditionList()
    },
    modelSizeChange (Limit) {
      this.formData.Limit = Limit
      this.getSiteStatisticsConditionList()
    },
    modelCurrentChange (Page) {
      this.formData.Page = Page
      this.getSiteStatisticsConditionList()
    },
    changeModel (e) {
      // console.log(e)
    },
    // 导出数据
    exportEvent () {
      let wb = XLSX.utils.table_to_book(document.querySelector('#xTableData'))
      /* get binary string as output */
      let wbout = XLSX.write(wb, {
        bookType: 'xlsx',
        bookSST: true,
        type: 'array'
      })
      downloadjs(wbout, `${this.$t('_kanban._53')}.xlsx`)
    }
  },
  created () {
    // this.DetailForm.BEGIN_TIME = dayjs().format('YYYY-MM-DD HH:mm:ss ')
    // this.DetailForm.END_TIME = dayjs().format('YYYY-MM-DD HH:mm:ss ')
    this.DetailForm.BEGIN_TIME = dayjs().subtract(24, 'hour')
    this.DetailForm.END_TIME = dayjs().add(24, 'hour')
    this.DetailForm.BEGIN_TIME = this.DetailForm.BEGIN_TIME.$d
    this.DetailForm.END_TIME = this.DetailForm.END_TIME.$d
  },
  mounted () {
    const that = this
    window.onresize = () => {
      return (() => {
        window.screenHeight = document.body.clientHeight
        that.screenHeight = window.screenHeight
      })()
    }
    this.$nextTick(() => {
      this.tableHeight = this.$refs.tableTransfer.$el.offsetHeight - 50 + 'px'
    })
  }
}
</script>

<style lang="scss" scoped>
.tabHeight {
  height: 100%;
}
.defectMaintainenceReport .el-radio {
  margin: 0;
}
</style>
<style>
.defectMaintainenceReport .el-tabs--border-card {
  height: 100%;
}
.defectMaintainenceReport .el-card.is-always-shadow {
  height: 100%;
}
.defectMaintainenceReport .el-col-8 {
  height: 100%;
}
.defectMaintainenceReport .el-radio {
  width: 25%;
}
.defectMaintainenceReport .el-tabs--border-card > .el-tabs__content {
  padding: 10px;
}
.defectMaintainenceReport .el-card__header {
  padding: 8px 10px;
}
.defectMaintainenceReport .el-radio-button__inner,
.el-radio-group {
  display: block;
}
</style>
