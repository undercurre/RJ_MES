<template>
  <d2-container class="WorkInProgressReport">
    <!-- 上 -->
    <el-row :gutter="20" style="height: 40%">
      <el-col :span="16" style="height: 100%">
        <el-tabs @tab-click="ChangeTab" type="border-card" ref="allTransfer">
          <el-tab-pane
            name="0"
            class="allTransfer"
            :label="$t('_kanban._17')"
          />
          <!-- <el-tab-pane name="1" :label="$t('_kanban._18')">
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
                  style="width: 100%;  "
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
                      :placeholder="$t('SmtStencilPart._16')"
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
          </el-tab-pane> -->
          <el-tab-pane name="2" :label="$t('_kanban._20')">
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
          <el-tab-pane name="3" :label="$t('_kanban._22')">
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
          <el-tab-pane name="4" :label="$t('_kanban._24')">
            <el-form
              ref="form"
              :model="formData"
              label-width="80px"
              :show-message="false"
            >
              <el-form-item :label="$t('_kanban._24')">
                <el-select
                  multiple
                  @change="changeModel"
                  v-model="formData.LINE_ID"
                  style="width: 100%"
                  :placeholder="$t('_kanban._25')"
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
                    :value="item.ID"
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
      </el-col>
      <el-col :span="8">
        <div style="height: 100%">
          <el-card>
            <el-checkbox-group v-model="checkList" @change="changeBox">
              <el-checkbox label="0" disabled>{{
                $t("_kanban._26")
              }}</el-checkbox>
              <el-checkbox label="1" v-show="formData.TYPE == 2">{{
                $t("_kanban._27")
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
                  v-model="echartForm.BEGIN_TIME"
                  type="datetime"
                  :placeholder="$t('_kanban._29')"
                  value-format="yyyy-MM-dd HH:mm:ss"
                />
              </el-form-item>
              <el-form-item :label="$t('_kanban._30')">
                <el-date-picker
                  style="width: 100%"
                  v-model="echartForm.END_TIME"
                  type="datetime"
                  :placeholder="$t('_kanban._31')"
                  value-format="yyyy-MM-dd HH:mm:ss"
                />
              </el-form-item>
              <el-button
                style="width: 100%"
                type="primary"
                icon="el-icon-search"
                @click.prevent="getWipStatisticsList"
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
          </el-card>
        </div>
      </el-col>
    </el-row>
    <!-- 下 -->
    <el-row style="height: 58%; margin-top: 10px">
      <el-tabs
        v-model="eIndex"
        @tab-click="handleClick"
        class="tabHeight"
        type="border-card"
        ref="tableTransfer"
      >
        <el-tab-pane :label="$t('_kanban._32')">
          <div
            ref="Histogram"
            id="Histogram"
            :style="{ height: tableHeight2 }"
          />
        </el-tab-pane>
        <el-tab-pane :label="$t('_kanban._33')">
          <div ref="PieChart" id="PieChart" :style="{ height: tableHeight2 }" />
        </el-tab-pane>
        <el-tab-pane :label="$t('_kanban._34')">
          <div style="height: 100%">
            <el-table
              ref="xTableData"
              id="xTableData"
              border
              resizable
              :height="tableHeight2"
              size="medium"
              align="center"
              show-overflow
              auto-resize
              keep-source
              :data="mainTable1"
            >
              <el-table-column
                min-width="150"
                prop="OPERATION_NAME"
                :label="$t('_kanban._35')"
              />
              <el-table-column
                min-width="150"
                prop="QTY"
                :label="$t('_kanban._36')"
              />
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="$t('_kanban._37')">
          <vxe-table
            ref="xTable2"
            border
            resizable
            :height="tableHeight2"
            size="medium"
            align="center"
            highlight-current-row
            highlight-hover-row
            show-overflow
            auto-resize
            keep-source
            :data="mainTable2"
            :mouse-config="{ selected: true }"
            :edit-config="{ trigger: 'click', mode: 'row', showStatus: true }"
            :radio-config="{ labelField: 'name', trigger: 'row' }"
            :checkbox-config="{ checkField: 'checked', trigger: 'row' }"
          >
            <vxe-table-column
              min-width="150"
              field="MODEL"
              :title="$t('_kanban._18')"
              :edit-render="{ name: '$input', props: { readonly: true } }"
            />
            <vxe-table-column
              min-width="150"
              field="PART_NO"
              :title="$t('_kanban._20')"
              :edit-render="{ name: '$input', props: { readonly: true } }"
            />
            <vxe-table-column
              min-width="150"
              field="OPERATION_NAME"
              :title="$t('_kanban._38')"
              :edit-render="{ name: '$input', props: { readonly: true } }"
            />
            <vxe-table-column
              min-width="150"
              field="QTY"
              :title="$t('_kanban._36')"
              :edit-render="{ name: '$input', props: { readonly: true } }"
            />
          </vxe-table>
        </el-tab-pane>
        <el-tab-pane :label="$t('_kanban._39')">
          <el-card class="box-card" :style="{ height: tableHeight2 }">
            <div slot="header" class="clearfix">
              <el-radio-group
                v-model="radioTime"
                @change="changeTime"
                style="
                  display: flex;
                  justify-content: space-between;
                  padding: 0 20px;
                "
              >
                <el-radio :label="0">&lt;24H</el-radio>
                <el-radio :label="1">24-48H</el-radio>
                <el-radio :label="2">48-72H</el-radio>
                <el-radio :label="3">&gt;72H</el-radio>
              </el-radio-group>
            </div>
            <div id="TimeoutStatistics"></div>
          </el-card>
        </el-tab-pane>
        <el-tab-pane :label="$t('_kanban._40')">
          <vxe-table
            ref="xTable3"
            border
            resizable
            :height="tableHeight2"
            size="medium"
            align="center"
            highlight-current-row
            highlight-hover-row
            show-overflow
            auto-resize
            keep-source
            :data="mainTable3"
            :mouse-config="{ selected: true }"
            :edit-config="{ trigger: 'click', mode: 'row', showStatus: true }"
            :radio-config="{ labelField: 'name', trigger: 'row' }"
            :checkbox-config="{ checkField: 'checked', trigger: 'row' }"
          >
            <vxe-table-column
              min-width="60"
              field="SN"
              :title="$t('_kanban._41')"
              :edit-render="{ name: '$input', props: { readonly: true } }"
            />
            <vxe-table-column
              min-width="120"
              field="WO_NO"
              :title="$t('_kanban._42')"
              :edit-render="{ name: '$input', props: { readonly: true } }"
            />
            <vxe-table-column
              min-width="120"
              field="PART_NO"
              :title="$t('_kanban._20')"
              :edit-render="{ name: '$input', props: { readonly: true } }"
            />
            <vxe-table-column
              min-width="120"
              field="OPERATION_NAME"
              :title="$t('_kanban._43')"
              :edit-render="{ name: '$input', props: { readonly: true } }"
            />
            <vxe-table-column
              min-width="120"
              field="MODEL"
              :title="$t('_kanban._18')"
              :edit-render="{ name: '$input', props: { readonly: true } }"
            />
            <vxe-table-column
              min-width="120"
              field="CARTON_NO"
              :title="$t('_kanban._44')"
              :edit-render="{ name: '$input', props: { readonly: true } }"
            />
            <vxe-table-column
              min-width="120"
              field="PALLET_NO"
              :title="$t('_kanban._45')"
              :edit-render="{ name: '$input', props: { readonly: true } }"
            />
            <vxe-table-column
              min-width="120"
              field="OPERATION_TIME"
              :title="$t('_kanban._46')"
              :edit-render="{ name: '$input', props: { readonly: true } }"
            />
            <vxe-table-column
              min-width="120"
              field="STATUS"
              :title="$t('_kanban._47')"
              :edit-render="{ name: '$input', props: { readonly: true } }"
            />
          </vxe-table>
        </el-tab-pane>
      </el-tabs>
    </el-row>
    <!-- 弹框 -->
    <el-dialog
      v-dialogDrag
      :title="$t('_kanban._48')"
      :visible.sync="dialogFormVisible"
      width="70%"
      class="Dialog"
      :close-on-click-modal="false"
    >
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <el-radio-group
            v-model="radioDetailOptions"
            @change="changeDetailOptions"
            style="
              display: flex;
              justify-content: space-between;
              padding: 20px;
              flex-wrap: wrap;
            "
          >
            <el-radio :label="0">ALL</el-radio>
            <el-radio :label="1">Group by Model</el-radio>
            <el-radio :label="2">Group by PN</el-radio>
            <el-radio :label="12">Group by Carton</el-radio>
            <el-radio :label="13">Group by Pallet</el-radio>
            <el-radio :label="3">Group by WO</el-radio>
          </el-radio-group>
          <el-button
            type="primary"
            icon="el-icon-s-order"
            @click.prevent="exportClick"
            >{{ $t("publics.btn.export") }}</el-button
          >
        </div>
        <el-table
          ref="xTablex"
          id="xTablex"
          border
          resizable
          :height="tableHeight2"
          size="medium"
          align="center"
          show-overflow
          auto-resize
          keep-source
          :data="DetailData"
        >
          <el-table-column
            min-width="120"
            prop="SN"
            :label="$t('_kanban._49')"
          />
          <el-table-column
            min-width="120"
            prop="STATUS"
            :label="$t('_kanban._47')"
          />
          <el-table-column
            min-width="120"
            prop="OPERATION_NAME"
            :label="$t('_kanban._38')"
          />
          <el-table-column
            min-width="120"
            prop="CARTON_NO"
            :label="$t('_kanban._50')"
          />
          <el-table-column
            min-width="120"
            prop="WO_NO"
            :label="$t('_kanban._42')"
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
            prop="WORK_TIME"
            :label="$t('_kanban._51')"
          />
        </el-table>
      </el-card>
    </el-dialog>
  </d2-container>
</template>

<script>
import {
  GetSiteStatisticsConditionList,
  GetWipStatisticsList,
  GetWipStatisticsReportDetail
} from '@/api/WorkInProgressReport'
import dayjs from 'dayjs'
import echarts from 'echarts'
import XLSX from 'xlsx'
import downloadjs from 'downloadjs'
export default {
  name: 'WorkInProgressReport',
  data () {
    return {
      formData: {
        Limit: 10,
        Page: 1,
        TYPE: 0,
        MODEL: [],
        PART_NO: [],
        WO_NO: [],
        LINE_ID: []
      },
      echartForm: {
        ALL: false,
        MODEL: [],
        PART_NO: [],
        WO_NO: [],
        LINE_ID: [],
        ROUTE_ID: [],
        BEGIN_TIME: '',
        END_TIME: '',
        WITHOUTRMAWO: false,
        HOURDETAIL: false,
        ISPRODUCT: true,
        ISLAGTIME: false
      },
      checked: true,
      tableHeight2: '300px',
      screenHeight: document.body.clientHeight,
      // timer: undefined,
      modelData: [],
      formDataPage: 0,
      mainTable1: [],
      mainTable2: [],
      mainTable3: [],
      eIndex: 0,
      radioTime: null,
      radioDetailOptions: 0,
      tableImport: {
        // 自定义类型
        types: ['xlsx']
      },
      tableExport: {
        // 默认选中类型
        type: 'xlsx',
        // 自定义类型
        types: ['xlsx', 'csv', 'html', 'xml', 'txt']
      },
      dialogFormVisible: false,
      DetailData: [],
      DetailForm: {
        CONDITION: 0,
        // OPERATION_NAME: '',
        ALL: true,
        MODEL: [],
        PART_NO: [],
        WITHOUTRMAWO: true,
        WO_NO: [],
        LINE_ID: [],
        BEGIN_TIME: '',
        END_TIME: '',
        ISLAGTIME: false
      },
      checkList: ['0'],
      printName: ''
    }
  },
  watch: {
    screenHeight (val) {
      // console.log('val', val)
      // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
      if (!this.timer) {
        // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
        this.screenHeight = val
        this.tableHeight2 =
          this.$refs.tableTransfer.$el.offsetHeight - 70 + 'px'
        this.timer = true
        let that = this
        setTimeout(function () {
          console.log(that.screenHeight)
          that.timer = false
        }, 400)
      }
    },
    modelData (val) {
      if (val.length === 0) {
        this.modelData.push({
          ID: '',
          NAME: '',
          DESCRIPTION: '',
          PART_NO: '',
          disabled: true
        })
      }
    }
  },
  created () {
    // this.echartForm.BEGIN_TIME = dayjs().format('YYYY-MM-DD HH:mm:ss ')
    // this.echartForm.END_TIME = dayjs().format('YYYY-MM-DD HH:mm:ss ')
    this.echartForm.BEGIN_TIME = dayjs().subtract(24, 'hour')
    this.echartForm.END_TIME = dayjs().add(24, 'hour')
    this.echartForm.BEGIN_TIME = this.echartForm.BEGIN_TIME.$d
    this.echartForm.END_TIME = this.echartForm.END_TIME.$d
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
      this.tableHeight2 = this.$refs.tableTransfer.$el.offsetHeight - 70 + 'px'
    })
  },
  methods: {
    changDownTabs (e) {
      console.log('e:', e)
    },
    changeBox (e) {
      this.echartForm.WITHOUTRMAWO = this.checkList.length === 2
      this.DetailForm.WITHOUTRMAWO = this.checkList.length === 2
    },
    ChangeTab (e) {
      this.cleanClick()
      this.formData.TYPE = parseInt(e.name)
      console.log('this.formData.TYPE:', this.formData.TYPE)

      if (this.formData.TYPE === 0) return
      this.getSiteStatisticsConditionList()
    },
    searchClick () {
      this.formData.Page = 1
      this.getSiteStatisticsConditionList()
    },
    async getSiteStatisticsConditionList () {
      const res = await GetSiteStatisticsConditionList(this.formData)
      this.modelData = res.Result.data ? res.Result.data : []
      this.formDataPage = res.Result.count ? res.Result.count : 0
    },
    // 清除
    cleanClick () {
      this.formData = {
        Page: 1,
        Limit: 10,
        TYPE: 0
      }
      // const now = new Date()
      this.echartForm = {
        ALL: false,
        MODEL: [],
        PART_NO: [],
        WO_NO: [],
        LINE_ID: [],
        ROUTE_ID: [],
        BEGIN_TIME: this.echartForm.BEGIN_TIME,
        END_TIME: this.echartForm.END_TIME,
        WITHOUTRMAWO: false,
        HOURDETAIL: false,
        ISPRODUCT: true,
        ISLAGTIME: false
      }
      this.DetailForm = {
        CONDITION: 0,
        // OPERATION_NAME: '',
        ALL: true,
        MODEL: [],
        PART_NO: [],
        WITHOUTRMAWO: true,
        WO_NO: [],
        LINE_ID: [],
        BEGIN_TIME: '',
        END_TIME: '',
        ISLAGTIME: false
      }
      this.checkList = ['0']
      this.echartForm.WITHOUTRMAWO = this.checkList.length === 2
      this.DetailForm.WITHOUTRMAWO = this.checkList.length === 2
    },
    handleClick (e) {
      // console.log(e)
      this.eIndex = e.index
      this.getWipStatisticsList()
    },
    // 查询
    async getWipStatisticsList () {
      var that = this
      if (this.radioTime || this.radioTime === 0) {
        this.echartForm.ISLAGTIME = true
        this.echartForm.LAGTIME = parseInt(this.radioTime)
      }
      if (this.formData.TYPE === 0) {
        this.echartForm.ALL = true
      } else {
        this.echartForm.ALL = false
        if (that.formData.TYPE === 1) {
          that.echartForm.MODEL = that.formData.MODEL
            ? that.formData.MODEL
            : []
          if (that.echartForm.MODEL.length === 0) {
            return this.$message.error(this.$t('_kanban._51'))
          }
        } else if (that.formData.TYPE === 2) {
          that.echartForm.PART_NO = that.formData.PART_NO
            ? that.formData.PART_NO
            : []
          if (that.echartForm.PART_NO.length === 0) {
            return this.$message.error(this.$t('_kanban._52'))
          }
        } else if (that.formData.TYPE === 3) {
          that.echartForm.WO_NO = that.formData.WO_NO
            ? that.formData.WO_NO
            : []
          if (that.echartForm.WO_NO.length === 0) {
            return this.$message.error(this.$t('_kanban._52'))
          }
        } else if (that.formData.TYPE === 4) {
          that.echartForm.LINE_ID = that.formData.LINE_ID
            ? that.formData.LINE_ID
            : []
          if (that.echartForm.LINE_ID.length === 0) {
            return this.$message.error(this.$t('_kanban._52'))
          }
        }
      }
      const res = await GetWipStatisticsList(this.echartForm)
      if (res.Result) {
        that.mainTable1 = res.Result.DATATABLE
        that.mainTable2 = res.Result.DATAPRODUCT
        that.mainTable3 = res.Result.DATADETAILS
        if (that.eIndex === '0') {
          // 柱状图
          that.getHistogram(that.mainTable1)
        } else if (that.eIndex === '1') {
          // 饼状图
          that.getPieChart(that.mainTable1)
        } else if (that.eIndex === '4') {
          // 超时
          that.getTimeoutStatistics(that.mainTable3)
        }
      }
    },
    // 弹框查询
    async getDetailReport (e) {
      this.DetailForm.BEGIN_TIME = this.echartForm.BEGIN_TIME
      this.DetailForm.END_TIME = this.echartForm.END_TIME
      this.DetailForm.ALL = this.formData.TYPE === 0
      if (this.radioTime || this.radioTime === 0) {
        this.DetailForm.ISLAGTIME = true
        this.DetailForm.LAGTIME = parseInt(this.radioTime)
      }
      this.DetailForm.ALL = this.formData.TYPE === 0
      if (this.formData.TYPE === 1) {
        this.DetailForm.MODEL = this.formData.MODEL ? this.formData.MODEL : []
      } else if (this.formData.TYPE === 2) {
        this.DetailForm.PART_NO = this.formData.PART_NO
          ? this.formData.PART_NO
          : []
      } else if (this.formData.TYPE === 3) {
        this.DetailForm.WO_NO = this.formData.WO_NO ? this.formData.WO_NO : []
      } else if (this.formData.TYPE === 4) {
        this.DetailForm.LINE_ID = this.formData.LINE_ID
          ? this.formData.LINE_ID
          : []
      }
      const res = await GetWipStatisticsReportDetail(this.DetailForm)
      this.DetailData = res.Result ? res.Result : []
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
    },
    // 明细导出
    exportClick () {
      let wb = XLSX.utils.table_to_book(document.querySelector('#xTablex')) //
      /* get binary string as output */
      let wbout = XLSX.write(wb, {
        bookType: 'xlsx',
        bookSST: true,
        type: 'array'
      })
      downloadjs(wbout, `${this.printName}${this.$t('_kanban._48')}.xlsx`)
    },
    // 柱状图
    async getHistogram (data) {
      if (data.length !== 0) {
        let arrX = []
        let arrY = []
        await data.map((item, index) => {
          arrX.push(item.OPERATION_NAME)
          arrY.push(item.QTY)
        })
        this.HistogramCheart = echarts.init(
          document.getElementById('Histogram')
        )
        var optionHistogram = null
        optionHistogram = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          dataZoom: [
            {
              show: true,
              realtime: true,
              start: 0,
              end: 100
            },
            {
              type: 'inside',
              realtime: true,
              start: 0,
              end: 100
            }
          ],
          xAxis: {
            type: 'category',
            axisLabel: {
              interval: 0,
              rotate: 40
            },
            data: arrX
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              data: arrY,
              type: 'bar',
              itemStyle: {
                normal: {
                  label: {
                    show: true, // 开启显示
                    position: 'top', // 在上方显示
                    textStyle: {
                      // 数值样式
                      color: '#606266',
                      fontSize: 14
                    }
                  }
                }
              }
            }
          ]
        }
        this.HistogramCheart.hideLoading() // 隐藏加载动画
        this.HistogramCheart.setOption(optionHistogram, true)
        this.HistogramCheart.resize()
        this.HistogramCheart.on('click', (params) => {
          // console.log(params)
          console.log(this.mainTable1[params.dataIndex].OPERATION_ID)

          this.DetailForm.OPERATION_ID = this.mainTable1[
            params.dataIndex
          ].OPERATION_ID

          this.printName = params.name
          // this.DetailForm.OPERATION_NAME = 'ICT'
          this.getDetailReport(params)
          this.dialogFormVisible = true
        })
        window.onresize = () => {
          this.HistogramCheart.resize()
        }
      } else {
        this.HistogramCheart.clear()
      }
    },
    // 饼状图
    async getPieChart (data) {
      if (data.length !== 0) {
        let arrX = []
        let arrY = []
        await data.map((item, index) => {
          arrX.push(item.OPERATION_NAME)
          arrY.push({ value: item.QTY + index, name: item.OPERATION_NAME })
        })
        this.PieChartChart = echarts.init(document.getElementById('PieChart'))
        var optionPieChart = null
        optionPieChart = {
          title: {
            // text: '某站点用户访问来源',
            // subtext: '纯属虚构',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b} : {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: arrX,
            formatter: (name) => {
              const res = arrY.find((i) => i && i.name === name)
              return res.name + '     ' + res.value
            }
          },
          series: [
            {
              // name: '访问来源',
              type: 'pie',
              radius: '80%',
              center: ['50%', '60%'],
              data: arrY,
              label: {
                formatter: '{b} : {c} ({d}%)'
              },
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }
        this.PieChartChart.hideLoading() // 隐藏加载动画
        this.PieChartChart.setOption(optionPieChart, true)
        this.PieChartChart.resize()

        window.onresize = () => {
          this.PieChartChart.resize()
        }
      } else {
        this.PieChartChart.clear()
      }
    },
    async getTimeoutStatistics (data) {
      if (data.length !== 0) {
        let arrX = []
        let arrY = []
        await data.map((item, index) => {
          arrX.push(item.OPERATION_NAME)
          arrY.push(item.QTY)
        })

        this.TimeoutStatisticsCheart = echarts.init(
          document.getElementById('TimeoutStatistics')
        )
        var optionTimeoutStatistics = null
        optionTimeoutStatistics = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          dataZoom: [
            {
              show: true,
              realtime: true,
              start: 0,
              end: 100
            },
            {
              type: 'inside',
              realtime: true,
              start: 0,
              end: 100
            }
          ],
          xAxis: {
            type: 'category',
            axisLabel: {
              interval: 0,
              rotate: 40
            },
            data: arrX
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              data: arrY,
              type: 'bar'
            }
          ]
        }
        this.TimeoutStatisticsCheart.hideLoading() // 隐藏加载动画
        this.TimeoutStatisticsCheart.setOption(optionTimeoutStatistics, true)
        this.TimeoutStatisticsCheart.resize()
        window.onresize = () => {
          this.TimeoutStatisticsCheart.resize()
        }
      } else {
        this.TimeoutStatisticsCheart.clear()
      }
    },
    // 超时时间
    changeTime (e) {
      console.log('单选', e)
      this.radioTime = e
      // this.getTimeoutStatistics(e)
    },
    changeDetailOptions (e) {
      this.DetailForm.CONDITION = e || 0
      this.getDetailReport()
    },
    changeModel (e) {
      // console.log(e)
    },
    modelSizeChange (Limit) {
      this.formData.Limit = Limit
      this.getSiteStatisticsConditionList()
    },
    modelCurrentChange (Page) {
      this.formData.Page = Page
      this.getSiteStatisticsConditionList()
    }
  }
}
</script>

<style lang="scss" scoped>
.tabHeight {
  height: 100%;
}
// ::v-deep .el-transfer-panel {
//   height: 100%;
//   width: 41.5%;
// }
.WorkInProgressReport .el-radio {
  margin: 0;
}
</style>
<style>
.WorkInProgressReport .el-tabs--border-card {
  height: 100%;
}
.WorkInProgressReport .el-card.is-always-shadow {
  height: 100%;
}
.WorkInProgressReport .el-col-8 {
  height: 100%;
}
</style>
