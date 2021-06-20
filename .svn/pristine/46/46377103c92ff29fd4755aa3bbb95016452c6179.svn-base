<template>
  <d2-container>
    <template slot="header">
      <custom-container-header :isExport="false"
                               :isExportTpl="false"
                               :isImport="false">
        <el-select v-model="formData.LINE_ID"
                   v-if="activeName === 'SMT'"
                   @clear="clearLINE_ID"
                   style="width: 200px"
                   clearable
                   :placeholder="$t('CallConfig._34')"
                   class="common-top">
          <el-option v-for="item in LinesList"
                     :key="item.ID"
                     :label="item.LINE_NAME"
                     :value="item.ID" />
        </el-select>
        <el-select v-model="formData.LINE_ID"
                   v-if="activeName === 'DIP'"
                   @clear="clearLINE_ID"
                   style="width: 200px"
                   clearable
                   :placeholder="$t('CallConfig._34')"
                   class="common-top">
          <el-option v-for="item in DipLines"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value" />
        </el-select>
        <el-date-picker v-model="formData.PLAN_DATE_BEGIN"
                        align="right"
                        value-format="yyyy-MM-dd"
                        type="date"
                        style="width: 200px; margin-right: 10px"
                        :placeholder="$t('cne.s_4')"
                        :picker-options="pickerOptions"
                        @change="handleChangeDatePicker"></el-date-picker>
        <el-button type="primary"
                   icon="el-icon-search"
                   @click.prevent="handleSearch">{{ $t("publics.btn.search") }}</el-button>

        <el-button v-if="$btnList.indexOf('SmtProducePlanAdd') !== -1"
                   type="success"
                   icon="el-icon-plus"
                   @click.prevent="AddClick">{{ $t("publics.btn.add") }}</el-button>
        <el-button v-if="$btnList.indexOf('SmtProducePlanSave') !== -1"
                   type="primary"
                   icon="el-icon-edit"
                   @click.prevent="editClick">{{ $t("publics.btn.edit") }}</el-button>
        <el-button v-if="$btnList.indexOf('SmtProducePlandelete') !== -1"
                   type="danger"
                   icon="el-icon-delete"
                   @click="RemoveClick">{{ $t("publics.btn.delete") }}</el-button>
        <el-upload v-if="$btnList.indexOf('SmtProducePlanFileUpload') !== -1"
                   ref="reFpslc"
                   style="margin-left: 10px"
                   :action="'#'"
                   :http-request="handleRequest"
                   :show-file-list="false"
                   :limit="20"
                   accept="txt">
          <el-button type="primary"
                     icon="el-icon-cloudy">
            SMT-{{ $t("SmtProducePlan._1") }}
          </el-button>
        </el-upload>

        <el-button v-if="$btnList.indexOf('ExportPlanDataToExcel') !== -1"
                   style="margin-left: 10px"
                   icon="el-icon-tickets"
                   @click="exportDataEvent"
                   type="info">
          SMT-{{ $t("SmtProducePlan._2") }}
        </el-button>
        <el-upload v-if="$btnList.indexOf('SmtProducePlanFileUpload') !== -1"
                   ref="reFpslc"
                   style="margin-left: 10px"
                   :action="'#'"
                   :http-request="handleRequest3"
                   :show-file-list="false"
                   :limit="20"
                   accept="txt">
          <el-button type="primary"
                     icon="el-icon-cloudy">
            DIP-{{ $t("SmtProducePlan._1") }}
          </el-button>
        </el-upload>
        <el-button v-if="$btnList.indexOf('ExportPlanDataToExcel') !== -1"
                   style="margin-left: 10px"
                   icon="el-icon-tickets"
                   @click="exportDataEvent2"
                   type="info">
          DIP-{{ $t("SmtProducePlan._2") }}
        </el-button>
        <el-upload v-if="$btnList.indexOf('ImportExcelDemoFile') !== -1"
                   ref="reFpslc"
                   style="margin-left: 10px"
                   :action="'#'"
                   :http-request="handleRequest2"
                   :show-file-list="false"
                   :limit="20"
                   accept="txt">
          <el-button icon="el-icon-upload2">SMT-{{
            $t("SmtProducePlan._26")
          }}</el-button>
        </el-upload>
        <el-upload v-if="$btnList.indexOf('ImportExcelDemoFile') !== -1"
                   ref="reFpslc"
                   style="margin-left: 10px"
                   :action="'#'"
                   :http-request="handleRequestDIP"
                   :show-file-list="false"
                   :limit="20"
                   accept="txt">
          <el-button icon="el-icon-upload2">DIP-{{
            $t("SmtProducePlan._26")
          }}</el-button>
        </el-upload>
        <el-button type="success"
                   style="margin-left: 10px"
                   icon="el-icon-download"
                   v-if="$btnList.indexOf('ExportTPL') !== -1"
                   @click="exportTmp(0)">SMT-{{ $t("SmtProducePlan._3") }}</el-button>
        <el-button type="success"
                   style="margin-left: 10px"
                   icon="el-icon-download"
                   v-if="$btnList.indexOf('ExportTPL') !== -1"
                   @click="exportTmp(1)">DIP-{{ $t("SmtProducePlan._3") }}</el-button>
      </custom-container-header>
    </template>
    <el-tabs v-model="activeName"
             type="card"
             @tab-click="handleClickTabs">
      <el-tab-pane label="SMT"
                   name="SMT">
        <div class="table-container1">
          <vxe-table ref="refTable"
                     border
                     stripe
                     keep-source
                     highlight-hover-row
                     highlight-current-row
                     show-overflow
                     auto-resize
                     width="100%"
                     height="100%"
                     @cell-click="cellClick"
                     :radio-config="{ labelField: 'name', trigger: 'row' }"
                     :data="tableData"
                     >
            <vxe-table-column show-overflow
                              :title="$t('SOPRoutes._64')"
                              type="radio"
                              min-width="70"
                              align="center" />
            <vxe-table-column show-overflow
                              v-for="(item, index) in column"
                              :key="index"
                              :field="item.field"
                              :title="item.title"
                              :formatter="item.formatter || null"
                              :edit-render="item['edit-render'] || {}"
                              :min-width="item['min-width']"
                              align="center"
                              :fixed="item.fixed" />
          </vxe-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="DIP"
                   name="DIP">
        <div class="table-container1">
          <vxe-table ref="refTable2"
                     border
                     stripe
                     keep-source
                     highlight-hover-row
                     highlight-current-row
                     show-overflow
                     auto-resize
                     width="100%"
                     height="100%"
                     @cell-click="cellClick"
                     :radio-config="{ labelField: 'name', trigger: 'row' }"
                     :data="tableData"
                     >
            <vxe-table-column show-overflow
                              :title="$t('SOPRoutes._64')"
                              type="radio"
                              min-width="70"
                              align="center" />
            <vxe-table-column show-overflow
                              v-for="(item, index) in column"
                              :key="index"
                              :field="item.field"
                              :title="item.title"
                              :edit-render="item['edit-render']"
                              :min-width="item['min-width']"
                              align="center"
                              :fixed="item.fixed" />
          </vxe-table>
        </div>
      </el-tab-pane>
    </el-tabs>

    <!-- 新增/编辑 Modal -->
    <el-dialog :title="$t('SmtProducePlan._4')"
               :visible.sync="dialogVisible"
               width="50%"
               :close-on-click-modal="false"
               class="xxxw2">
      <div>
        <el-form ref="form"
                 :model="form"
                 label-width="80px"
                 :show-message="false"
                 :rules="EditRules">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('ProductionSchedule._10')"
                            prop="ORDER_NO">
                <el-input v-model="form.ORDER_NO"
                          placeholder=" "></el-input>
              </el-form-item>
              <el-form-item :label="$t('ProductionSchedule._3')"
                            prop="WO_NO">
                <el-input v-model="form.WO_NO"
                          placeholder=" "></el-input>
              </el-form-item>
              <el-form-item :label="$t('ProductionSchedule._7')"
                            prop="MOVEMENT">
                <el-input v-model="form.MOVEMENT"
                          placeholder=" "></el-input>
              </el-form-item>
              <el-form-item :label="$t('ProductionSchedule._11')"
                            prop="ORDER_QUANTITY">
                <el-input v-model="form.ORDER_QUANTITY"
                          placeholder=" "
                          type="number"></el-input>
              </el-form-item>
              <el-form-item :label="$t('ProductionSchedule._16')"
                            prop="DESCRIPTION">
                <el-input v-model="form.DESCRIPTION"
                          placeholder=" "></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="'计划类型'"
                            prop="PLAN_TYPE">
                <el-radio v-model="form.PLAN_TYPE"
                          :label="0">SMT</el-radio>
                <el-radio v-model="form.PLAN_TYPE"
                          :label="1">DIP</el-radio>
              </el-form-item>
              <el-form-item :label="$t('ProductionSchedule._2')"
                            prop="LINE_ID">
                <el-select v-if="!form.PLAN_TYPE"
                           v-model="form.LINE_ID"
                           clearable
                           filterable
                           placeholder=" "
                           style="width: 100%">
                  <el-option v-for="item in LinesListbox"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
                <el-select v-if="form.PLAN_TYPE === 1 || form.PLAN_TYPE === '1'"
                           v-model="form.LINE_ID"
                           clearable
                           filterable
                           placeholder=" "
                           style="width: 100%">
                  <el-option v-for="item in DipLines"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item :label="$t('ProductionSchedule._6')"
                            prop="MACHINE_TYPE">
                <el-input placeholder=" "
                          v-model="form.MACHINE_TYPE"></el-input>
              </el-form-item>
              <el-form-item :label="$t('ProductionSchedule._9')"
                            prop="NATIONALITY">
                <el-input v-model="form.NATIONALITY"
                          placeholder=" "></el-input>
              </el-form-item>

            </el-col>
          </el-row>
        </el-form>
        <el-button style="margin-bottom: 10px"
                   type="primary"
                   @click="addPlan">{{ $t("SmtProducePlan._5") }}</el-button>
        <vxe-table ref="_refTable"
                   border
                   stripe
                   keep-source
                   highlight-hover-row
                   highlight-current-row
                   show-overflow
                   auto-resize
                   width="100%"
                   height="300px"
                   :edit-rules="EditRules2"
                   :radio-config="{ labelField: 'name', trigger: 'row' }"
                   :data="tableData2"
                   :edit-config="{ trigger: 'click', mode: 'row', showStatus: true }">
          <vxe-table-column show-overflow
                            field="PLAN_DATE"
                            :title="$t('SmtProducePlan._6')"
                            :edit-render="{ name: '$input', props: { type: 'date' } }"
                            :min-width="180"
                            align="center" />
          <vxe-table-column show-overflow
                            field="PLAN_QUANTITY"
                            :title="$t('SmtProducePlan._7')"
                            :edit-render="{ name: '$input', props: { type: 'number', min: 0 } }"
                            :min-width="180"
                            align="center" />
          <vxe-table-column :title="$t('as_src.tb_og')"
                            min-width="120"
                            align="center"
                            fixed="right">
            <template v-slot="{ row }">
              <el-button type="danger"
                         @click="_removeClick(row, row.$index)">{{
                $t("as_src.tb_rm")
              }}</el-button>
            </template>
          </vxe-table-column>
        </vxe-table>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">{{
          $t("SmtProducePlan._8")
        }}</el-button>
        <el-button type="primary"
                   @click="handleSubmitForm">{{
          $t("SmtProducePlan._9")
        }}</el-button>
      </span>
    </el-dialog>
  </d2-container>
</template>

<script>
import {
  LoadData,
  SaveData,
  SmtLinesLoadData,
  ExportTPL,
  ExportPlanDataToExcel,
  SfcsOperationLinesLoadData
} from '@/api/SmtProducePlan/index.js'
import customContainerHeader from '@/components/custom-container-header'
import { mapGetters } from 'vuex'
import dayjs from 'dayjs'
import request from '@/plugin/axios'
import { cloneDeep } from 'lodash'
export default {
  name: 'SmtProducePlan',
  // import引入的组件需要注入到对象中才能使用
  components: { customContainerHeader },
  data () {
    // 这里存放数据
    return {
      LinesList: [],
      LinesListbox: [],
      EditRules: {
        LINE_ID: [
          {
            required: true,
            message: this.$t('CallConfig._34')
          }
        ],
        PLAN_QUANTITY: [
          {
            required: true,
            message: this.$t('ProductionSchedule._27')
          }
        ],
        WO_NO: [
          {
            required: true,
            message: this.$t('ProductionSchedule._28')
          }
        ],
        ORDER_NO: [
          {
            required: true,
            message: this.$t('SmtProducePlan._10')
          }
        ],
        ORDER_QUANTITY: [
          {
            required: true,
            message: this.$t('SmtProducePlan._11')
          }
        ]
      },
      EditRules2: {
        PLAN_QUANTITY: [
          {
            required: true,
            message: this.$t('ProductionSchedule._27')
          }
        ],
        PLAN_DATE: [
          {
            required: true,
            message: this.$t('SmtProducePlan._12')
          }
        ]
      },
      tableData: [],
      tableData2: [],
      formData: {
        Page: 1,
        Limit: 100000000,
        LINE_ID: undefined,
        PLAN_DATE_BEGIN: '',
        PLAN_DATE_END: '',
        PLAN_TYPE: 0
      },
      Sedata: '',
      totalPage: 0,
      SaveFrom: {},
      drawer: false,
      upload_url: process.env.VUE_APP_API + 'SmtProducePlan/ImportSMTPlanFile',
      SmtLines: {
        Page: 1,
        USER_ID: '',
        Limit: 1000000000
      },
      pickerOptions: {
        shortcuts: [
          {
            text: this.$t('SmtProducePlan._13'),
            onClick (picker) {
              picker.$emit('pick', new Date())
            }
          },
          {
            text: this.$t('SmtProducePlan._14'),
            onClick (picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          },
          {
            text: this.$t('SmtProducePlan._15'),
            onClick (picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }
        ]
      },
      column: [
        {
          title: this.$t('ProductionSchedule._10'),
          field: 'ORDER_NO',
          'edit-render': {
            name: '$input',
            props: { readonly: true }
          },
          'min-width': 150
        },
        {
          title: this.$t('ProductionSchedule._11'),
          field: 'ORDER_QUANTITY',
          'edit-render': {
            name: '$input',
            props: { readonly: true }
          },
          'min-width': 150
        },
        {
          title: this.$t('ProductionSchedule._3'),
          field: 'WO_NO',
          'edit-render': {
            name: '$input',
            props: { readonly: true }
          },
          'min-width': 200
        },
        {
          title: this.$t('ProductionSchedule._2'),
          field: 'LINE_ID',
          // 'edit-render': {
          //   name: '$select',
          //   options: this.LinesListbox,
          //   props: { readonly: true }
          // },
          // 'edit-render': {
          //   name: '$input',
          //   props: { readonly: true }
          // },
          formatter: this.handleFormatterLineId,
          'min-width': 160
        },
        {
          title: this.$t('ProductionSchedule._6'),
          field: 'MACHINE_TYPE',
          'edit-render': {
            name: '$input',
            props: { readonly: true }
          },
          'min-width': 170
        },
        {
          title: this.$t('ProductionSchedule._7'),
          field: 'MOVEMENT',
          'edit-render': {
            name: '$input',
            props: { readonly: true }
          },
          'min-width': 160
        },
        {
          title: this.$t('ProductionSchedule._9'),
          field: 'NATIONALITY',
          'edit-render': {
            name: '$input',
            props: { readonly: true }
          },
          'min-width': 150
        },
        {
          title: this.$t('ProductionSchedule._16'),
          field: 'DESCRIPTION',
          'edit-render': {
            name: '$input',
            props: { readonly: true }
          },
          'min-width': 150
        }
        // {
        //   title: this.$t('SmtProducePlan._16'),
        //   field: 'TOTAL_PLAN_QUANTITY',
        //   'edit-render': {
        //     name: '$input',
        //     props: { readonly: true }
        //   },
        //   'min-width': 150,
        //   fixed: 'right'
        // }
      ],
      dataMap: {},
      dialogVisible: false,
      form: {},
      ImportExcelDemoFile:
        process.env.VUE_APP_API + 'SmtProducePlan/ImportExcelDemoFile',
      DipPlanFileUpload:
        process.env.VUE_APP_API + 'SmtProducePlan/ImportDIPPlanFile',
      activeName: 'SMT',
      DipLines: [],
      modifyForm: {}
    }
  },
  // 监听属性 类似于data概念
  computed: {
    ...mapGetters(['userId'])
  },

  // 监控data中的数据变化
  watch: {
    activeName (val, oldVal) {
      if (val !== oldVal) {
        switch (val) {
          case 'SMT':
            this.formData.PLAN_TYPE = 0
            break
          case 'DIP':
            this.formData.PLAN_TYPE = 1
            break
        }
        this.clearLINE_ID()
        this.getLoadData()
      }
    }
  },

  // 方法集合
  methods: {
    handleFormatterLineId ({ cellValue }) {
      let res = ''
      if (!this.formData.PLAN_TYPE) {
        this.LinesList.map(i => {
          if (i.ID === cellValue) {
            res = i.LINE_NAME
          }
        })
      } else {
        this.DipLines.map(i => {
          if (i.ID === cellValue) {
            res = i.OPERATION_LINE_NAME
          }
        })
      }
      return res
    },
    // 获取下拉列表
    async getInd () {
      this.SmtLines.USER_ID = this.userId
      const res = await SmtLinesLoadData(this.SmtLines)
      if (res.Result) {
        this.LinesList = res.Result

        this.LinesList.map((item) => {
          this.LinesListbox.push({
            label: item.LINE_NAME,
            value: item.ID.toString(),
            disabled: false
          })
        })
      }
    },
    async getInd2 () {
      const res = await SfcsOperationLinesLoadData({
        USER_ID: this.userId,
        Page: 1,
        Limit: 10000
      })
      const data = res.Result ? JSON.parse(res.Result) : []
      this.DipLines = data.map(i => {
        return {
          label: i.OPERATION_LINE_NAME,
          value: i.ID.toString(),
          disabled: false
        }
      })
    },
    async getLoadData () {
      if (!this.formData.PLAN_DATE_BEGIN) {
        const Sedata = [
          dayjs().format('YYYY-MM-DD'),
          dayjs().add(3, 'day').format('YYYY-MM-DD')
        ]
        this.formData.PLAN_DATE_BEGIN = Sedata[0]
        this.formData.PLAN_DATE_END = Sedata[1]
      }
      const res = await LoadData(this.formData)
      if (res.Result) {
        // TODO 数据整理
        const data = res.Result || []
        const tmpMap = {}
        data.map((i) => {
          if (!tmpMap[i.WO_NO]) {
            tmpMap[i.WO_NO] = []
          }
          tmpMap[i.WO_NO].push(i)
        })
        this.dataMap = tmpMap // ! 元数据
        let dates = []
        this.column = [
          {
            title: this.$t('ProductionSchedule._10'),
            field: 'ORDER_NO',
            'edit-render': {
              name: '$input',
              props: { readonly: true }
            },
            'min-width': 150
          },
          {
            title: this.$t('ProductionSchedule._11'),
            field: 'ORDER_QUANTITY',
            'edit-render': {
              name: '$input',
              props: { readonly: true }
            },
            'min-width': 150
          },
          {
            title: this.$t('ProductionSchedule._3'),
            field: 'WO_NO',
            'edit-render': {
              name: '$input',
              props: { readonly: true }
            },
            'min-width': 200
          },
          {
            title: this.$t('ProductionSchedule._2'),
            field: 'LINE_ID',
            // 'edit-render': {
            //   name: '$select',
            //   options: this.formData.PLAN_TYPE === 0 ? this.LinesListbox : this.DipLines,
            //   props: { disabled: true }
            // },
            formatter: this.handleFormatterLineId,
            'min-width': 160
          },
          {
            title: this.$t('ProductionSchedule._6'),
            field: 'MACHINE_TYPE',
            'edit-render': {
              name: '$input',
              props: { readonly: true }
            },
            'min-width': 170
          },
          {
            title: this.$t('ProductionSchedule._7'),
            field: 'MOVEMENT',
            'edit-render': {
              name: '$input',
              props: { readonly: true }
            },
            'min-width': 160
          },
          {
            title: this.$t('ProductionSchedule._9'),
            field: 'NATIONALITY',
            'edit-render': {
              name: '$input',
              props: { readonly: true }
            },
            'min-width': 150
          },
          {
            title: this.$t('ProductionSchedule._16'),
            field: 'DESCRIPTION',
            'edit-render': {
              name: '$input',
              props: { readonly: true }
            },
            'min-width': 150
          }
          // {
          //   title: this.$t('SmtProducePlan._16'),
          //   field: 'TOTAL_PLAN_QUANTITY',
          //   'edit-render': {
          //     name: '$input',
          //     props: { readonly: true }
          //   },
          //   'min-width': 150,
          //   fixed: 'right'
          // }
        ]
        for (let i = 0; i < 4; i++) {
          const day = dayjs(this.formData.PLAN_DATE_BEGIN)
            .add(i, 'day')
            .format('YYYY-MM-DD')
          dates.push(day)
          // TODO 动态改变 column
          this.column.push({
            title: day,
            field: `DATE_${i + 1}`,
            'edit-render': {
              name: '$input',
              props: { readonly: true }
            },
            'min-width': 150,
            fixed: 'right'
          })
        }

        const FinalData = [] // 最终数据
        Object.values(tmpMap).forEach((i) => {
          const item = i[0]
          item.TOTAL_PLAN_QUANTITY = 0
          // 备用字段
          item.DATE_1 = 0
          item.DATE_2 = 0
          item.DATE_3 = 0
          item.DATE_4 = 0
          i.map((j) => {
            item.TOTAL_PLAN_QUANTITY += j.PLAN_QUANTITY
            dates.map((k, index) => {
              if (
                j.PLAN_DATE &&
                dayjs(j.PLAN_DATE).format('YYYY-MM-DD') === k
              ) {
                item[`DATE_${index + 1}`] += j.PLAN_QUANTITY
              }
            })
          })
          FinalData.push(item)
        })
        this.tableData = FinalData
      }
    },
    handleChangeDatePicker () {
      if (!this.formData.PLAN_DATE_BEGIN) {
        this.formData.PLAN_DATE_BEGIN = dayjs().format('YYYY-MM-DD')
        this.formData.PLAN_DATE_END = dayjs()
          .add(3, 'day')
          .format('YYYY-MM-DD')
      } else {
        this.formData.PLAN_DATE_END = dayjs(this.formData.PLAN_DATE_BEGIN)
          .add(3, 'day')
          .format('YYYY-MM-DD')
      }
    },
    handleSearch () {
      this.SaveFrom = {}
      this.formData.Page = 1
      this.getLoadData()
    },
    cellClick (e) {
      this.SaveFrom = cloneDeep(e.row)
    },
    clearLINE_ID () {
      this.formData.LINE_ID = undefined
    },
    search_but () {
      if (this.Sedata) {
        this.formData.PLAN_DATE_BEGIN = this.Sedata[0]
        this.formData.PLAN_DATE_END = this.Sedata[1]
      } else {
        this.formData.PLAN_DATE_BEGIN = ''
        this.formData.PLAN_DATE_END = ''
      }
      this.formData.Page = 1
      this.getLoadData()
    },
    // 重置
    resetListQuery () {
      this.formData = {
        Page: 1,
        Limit: 15
      }
    },
    AddClick () {
      this.form = {
        PLAN_TYPE: 0
      }
      this.tableData2 = []
      this.dialogVisible = true
    },
    editClick () {
      if (!this.SaveFrom.ID) {
        this.$message({
          showClose: true,
          message: this.$t('SmtProducePlan._17'),
          type: 'warning'
        })
        return false
      }
      const { WO_NO } = this.SaveFrom
      const UpdateRecords = cloneDeep(this.dataMap[WO_NO])
      this.form = cloneDeep(UpdateRecords[0])
      this.modifyForm = cloneDeep(this.form)
      this.tableData2 = UpdateRecords
      this.dialogVisible = true
    },
    RemoveClick () {
      if (!this.SaveFrom.ID) {
        this.$message({
          showClose: true,
          message: this.$t('ProductionSchedule._24'),
          type: 'warning'
        })
        return
      }
      this.$confirm(this.$t('ssn._15'), this.$t('ssn._16'), {
        confirmButtonText: this.$t('ssn._17'),
        cancelButtonText: this.$t('ssn._18'),
        type: 'warning'
      })
        .then(() => {
          const { WO_NO } = this.SaveFrom
          const RemoveRecords = this.dataMap[WO_NO]
          SaveData({
            RemoveRecords
          }).then((res) => {
            if (res.Result) {
              this.$notify({
                title: this.$t('ssn._12'),
                message: this.$t('ssn._19'),
                type: 'success',
                duration: 2000
              })
              this.SaveFrom = {}
              this.getLoadData()
            }
          })
        })
        .catch(() => { })
    },
    async exportDataEvent () {
      const res = await ExportPlanDataToExcel({
        Page: 1,
        Limit: 10000000,
        LINE_ID: this.formData.LINE_ID,
        PLAN_DATE_BEGIN: this.formData.PLAN_DATE_BEGIN,
        PLAN_DATE_END: this.formData.PLAN_DATE_END,
        PLAN_TYPE: 0
      })
      if (res.Result) {
        window.open(process.env.VUE_APP_BASE_IMG + res.Result)
      }
    },
    async exportDataEvent2 () {
      const res = await ExportPlanDataToExcel({
        Page: 1,
        Limit: 10000000,
        LINE_ID: this.formData.LINE_ID,
        PLAN_DATE_BEGIN: this.formData.PLAN_DATE_BEGIN,
        PLAN_DATE_END: this.formData.PLAN_DATE_END,
        PLAN_TYPE: 1
      })
      if (res.Result) {
        window.open(process.env.VUE_APP_BASE_IMG + res.Result)
      }
    },
    // 删除
    _removeClick (row, index) {
      this.$confirm(this.$t('ssn._15'), this.$t('ssn._16'), {
        confirmButtonText: this.$t('ssn._17'),
        cancelButtonText: this.$t('ssn._18'),
        type: 'warning'
      }).then(() => {
        this.$refs._refTable.remove(row)
      })
    },
    addPlan () {
      const record = {
        PLAN_DATE: '',
        PLAN_QUANTITY: 0
      }
      this.$refs._refTable.insertAt(record, null).then(({ row }) => {
        this.$refs._refTable.setActiveRow(row)
      })
    },
    handleSubmitForm () {
      // TODO 区分是新增还是编辑
      // TODO 编辑需要比对form有没有被修改
      this.$refs.form.validate((valid) => {
        if (valid) {
          const { fullData } = this.$refs._refTable.getTableData()
          if (!fullData.length) {
            this.$message.error(this.$t('SmtProducePlan._18'))
            return false
          }
          this.$refs._refTable.validate(async (valid) => {
            if (valid) {
              const {
                insertRecords,
                removeRecords,
                updateRecords
              } = this.$refs._refTable.getRecordset()
              const RemoveRecords = []
              removeRecords.map((i) => {
                if (i.ID) {
                  RemoveRecords.push(i)
                }
              })
              // TODO 这里可以区分出哪些是新增的
              const InsertRecords = []
              insertRecords.map((i) => {
                i.ID = this.form.ID || 0
                i.LINE_ID = this.form.LINE_ID || 0
                i.ORDER_NO = this.form.ORDER_NO || ''
                i.MOVEMENT = this.form.MOVEMENT || ''
                i.MACHINE_TYPE = this.form.MACHINE_TYPE || ''
                i.PLAN_TYPE = this.form.PLAN_TYPE || 0
                i.ORDER_QUANTITY = this.form.ORDER_QUANTITY || 0
                i.NATIONALITY = this.form.NATIONALITY || ''
                i.WO_NO = this.form.WO_NO || ''
                i.DESCRIPTION = this.form.DESCRIPTION || ''
                InsertRecords.push(i)
              })
              let UpdateRecords = updateRecords // TODO 修改的先不用管
              // TODO 关键是要处理修改的情况
              const Faker = cloneDeep(this.dataMap[this.modifyForm.WO_NO]?.[0] || {})
              console.log('Faker: ', Faker)
              if (Faker.ID) { // TODO 这里来个大判断
                if (
                  Faker.LINE_ID !== this.form.LINE_ID ||
                  Faker.ORDER_NO !== this.form.ORDER_NO ||
                  Faker.MOVEMENT !== this.form.MOVEMENT ||
                  Faker.MACHINE_TYPE !== this.form.MACHINE_TYPE ||
                  Faker.PLAN_TYPE !== this.form.PLAN_TYPE ||
                  Faker.ORDER_QUANTITY !== this.form.ORDER_QUANTITY ||
                  Faker.NATIONALITY !== this.form.NATIONALITY ||
                  Faker.WO_NO !== this.form.WO_NO ||
                  Faker.DESCRIPTION !== this.form.DESCRIPTION
                ) {
                  UpdateRecords = this.dataMap[this.modifyForm.WO_NO].map(item => {
                    let i = cloneDeep(item)
                    const merge = { // TODO 采取对象融合方法合并
                      LINE_ID: this.form.LINE_ID || 0,
                      ORDER_NO: this.form.ORDER_NO || '',
                      MOVEMENT: this.form.MOVEMENT || '',
                      MACHINE_TYPE: this.form.MACHINE_TYPE || '',
                      PLAN_TYPE: this.form.PLAN_TYPE || 0,
                      ORDER_QUANTITY: this.form.ORDER_QUANTITY || 0,
                      NATIONALITY: this.form.NATIONALITY || '',
                      WO_NO: this.form.WO_NO || '',
                      DESCRIPTION: this.form.DESCRIPTION || ''
                    }
                    let flag = false
                    UpdateRecords.map(j => {
                      if (i.ID === j.ID) { // TODO 如果相等证明：除了要更新头部字段还需要更新尾部字段
                        flag = true
                        i = Object.assign(j, merge)
                      }
                    })
                    if (!flag) {
                      i = Object.assign(i, merge)
                    }
                    return i
                  })
                }
              }

              console.log('数据： ', {
                InsertRecords,
                UpdateRecords,
                RemoveRecords
              })

              const res = await SaveData({
                InsertRecords,
                UpdateRecords,
                RemoveRecords
              })
              if (res.Result) {
                this.tableData = []
                this.tableData2 = []
                this.SaveFrom = {}
                this.modifyForm = {}
                this.form = {}
                this.getLoadData()
                this.dialogVisible = false
                this.$notify.success({
                  title: this.$t('SmtProducePlan._19'),
                  message: this.$t('SmtProducePlan._20')
                })
              }
            }
          })
        }
      })
    },
    async handleRequest (data) {
      let formdata = new FormData()
      formdata.append('file', data.file)
      const infoNotify = this.$notify.info({
        title: this.$t('SmtProducePlan._21'),
        dangerouslyUseHTMLString: true,
        duration: 0,
        message:
          '<i class="el-icon-loading"></i>' + this.$t('SmtProducePlan._22')
      })
      const res = await request
        .post(this.upload_url, formdata, {
          headers: this.handleUploadHeader(),
          timeout: 60000 * 5 // 请求超时时间
        })
        .catch((_) => {
          infoNotify.close()
          this.$notify.error({
            title: this.$t('SmtProducePlan._23'),
            message: this.$t('SmtProducePlan._24')
          })
        })
      infoNotify.close()
      if (res.Result) {
        this.$notify.success({
          title: this.$t('SmtProducePlan._19'),
          message: this.$t('SmtProducePlan._25')
        })
        this.tableData = []
        this.tableData2 = []
        this.SaveFrom = {}
        this.form = {}
        this.formData.PLAN_TYPE = 0
        this.activeName = 'SMT'
        this.getLoadData()
      } else {
        this.$notify.error({
          title: this.$t('SmtProducePlan._23'),
          message: this.$t('SmtProducePlan._24')
        })
      }
    },
    async handleRequest3 (data) {
      let formdata = new FormData()
      formdata.append('file', data.file)
      const infoNotify = this.$notify.info({
        title: this.$t('SmtProducePlan._21'),
        dangerouslyUseHTMLString: true,
        duration: 0,
        message:
          '<i class="el-icon-loading"></i>' + this.$t('SmtProducePlan._22')
      })
      const res = await request
        .post(this.DipPlanFileUpload, formdata, {
          headers: this.handleUploadHeader(),
          timeout: 60000 * 5 // 请求超时时间
        })
        .catch((_) => {
          infoNotify.close()
          this.$notify.error({
            title: this.$t('SmtProducePlan._23'),
            message: this.$t('SmtProducePlan._24')
          })
        })
      infoNotify.close()
      if (res.Result) {
        this.$notify.success({
          title: this.$t('SmtProducePlan._19'),
          message: this.$t('SmtProducePlan._25')
        })
        this.tableData = []
        this.tableData2 = []
        this.SaveFrom = {}
        this.form = {}
        this.formData.PLAN_TYPE = 1
        this.activeName = 'DIP'
        this.getLoadData()
      } else {
        this.$notify.error({
          title: this.$t('SmtProducePlan._23'),
          message: this.$t('SmtProducePlan._24')
        })
      }
    },
    async handleRequest2 (data) { // SMT 导入模板
      let formdata = new FormData()
      formdata.append('file', data.file)
      formdata.append('plan_type', 0)
      const infoNotify = this.$notify.info({
        title: this.$t('SmtProducePlan._21'),
        dangerouslyUseHTMLString: true,
        duration: 0,
        message:
          '<i class="el-icon-loading"></i>' + this.$t('SmtProducePlan._22')
      })
      const res = await request
        .post(this.ImportExcelDemoFile, formdata, {
          headers: this.handleUploadHeader(),
          timeout: 60000 * 5 // 请求超时时间
        })
        .catch((_) => {
          infoNotify.close()
          this.$notify.error({
            title: this.$t('SmtProducePlan._23'),
            message: this.$t('SmtProducePlan._24')
          })
        })
      infoNotify.close()
      if (res.Result) {
        this.$notify.success({
          title: this.$t('SmtProducePlan._19'),
          message: this.$t('SmtProducePlan._25')
        })
        // this.tableData = []
        // this.tableData2 = []
        // this.SaveFrom = {}
        // this.form = {}
        // this.getLoadData()
      } else {
        this.$notify.error({
          title: this.$t('SmtProducePlan._23'),
          message: this.$t('SmtProducePlan._24')
        })
      }
    },
    async handleRequestDIP (data) { // DIP 导入模板
      let formdata = new FormData()
      formdata.append('file', data.file)
      formdata.append('plan_type', 1)
      const infoNotify = this.$notify.info({
        title: this.$t('SmtProducePlan._21'),
        dangerouslyUseHTMLString: true,
        duration: 0,
        message:
          '<i class="el-icon-loading"></i>' + this.$t('SmtProducePlan._22')
      })
      const res = await request
        .post(this.ImportExcelDemoFile, formdata, {
          headers: this.handleUploadHeader(),
          timeout: 60000 * 5 // 请求超时时间
        })
        .catch((_) => {
          infoNotify.close()
          this.$notify.error({
            title: this.$t('SmtProducePlan._23'),
            message: this.$t('SmtProducePlan._24')
          })
        })
      infoNotify.close()
      if (res.Result) {
        this.$notify.success({
          title: this.$t('SmtProducePlan._19'),
          message: this.$t('SmtProducePlan._25')
        })
        // this.tableData = []
        // this.tableData2 = []
        // this.SaveFrom = {}
        // this.form = {}
        // this.getLoadData()
      } else {
        this.$notify.error({
          title: this.$t('SmtProducePlan._23'),
          message: this.$t('SmtProducePlan._24')
        })
      }
    },
    async exportTmp (planType) {
      const res = await ExportTPL(planType)
      if (res.Result) {
        window.open(process.env.VUE_APP_BASE_IMG + res.Result)
      }
    },
    handleClickTabs (e) {

    }
  },
  async created () {
    await this.getInd()
    await this.getInd2()
    this.getLoadData()
  }
}
</script>
<style lang="scss" scoped>
.table-container1 {
  height: calc(100vh - 60px - 21px - 74px - 20px - 56px) !important;
}
</style>

<style>
.xxxw2 .el-dialog {
  margin-top: 20px !important;
}
</style>
