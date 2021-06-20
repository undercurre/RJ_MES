<template>
  <custom-container>
    <!-- 头部 -->
    <template slot="header">
      <custom-container-header :isFull="true"
                               :isExport="false"
                               :isExportTpl="false"
                               :isImport="false">
        <el-input style="width:200px"
                  clearable
                  :placeholder="$t('SfcsProductOperationMonitor._30')"
                  v-model="formData.PART_NO" />
        <el-select @change="changeDetails"
                   v-model="formData.ROUTE_ID"
                   :placeholder="$t('SfcsProductOperationMonitor._31')"
                   style="width:200px">
          <div style="height: 34px;padding: 0 20px;display: flex;position: sticky;top: 0;background: #fff;z-index: 9;border-bottom: 1px solid rgb(229, 231, 237)">
            <span style="width: 60%;box-size: border-box;padding-right: 10px;color: #606266;line-height: 34px;font-size: 14px">{{$t('SfcsProductOperationMonitor._5')}}</span>
            <span style="width: 40%;color: #606266;line-height: 34px;font-size: 14px;box-size: border-box;padding-left: 10px;border-left: 1px solid rgb(229, 231, 237)">{{$t('SfcsProductOperationMonitor._6')}}</span>
          </div>
          <el-option style="width: 100%;display: flex"
                     v-for="item in ProcessList"
                     :key="item.ID"
                     :value="item.ID"
                     :label="item.ROUTE_NAME">
            <span style="width: 60%;box-size: border-box;padding-right: 10px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{ item.ROUTE_NAME }}</span>
            <span style="width: 40%;box-size: border-box;padding-left: 10px;border-left: 1px solid rgb(229, 231, 237)">{{ item.ENABLED }}</span>
          </el-option>
        </el-select>
        <el-button type="primary"
                   icon="el-icon-search"
                   @click.prevent="searchClick">{{$t('publics.btn.search')}}</el-button>&nbsp;
        <el-button v-if="$btnList.indexOf('SfcsProductOperationMonitorAdd') !== -1"
                   type="success"
                   icon="el-icon-plus"
                   @click.prevent="addClick(-1)">{{$t('publics.btn.add')}}</el-button>&nbsp;
        <el-button v-if="$btnList.indexOf('SfcsProductOperationMonitorSave') !== -1"
                   type="primary"
                   icon="el-icon-check"
                   @click.prevent="saveClick">{{$t('publics.btn.save')}}</el-button>&nbsp;
        <el-button type="danger"
                   icon="el-icon-delete"
                   @click.prevent="cleanClick()">{{$t('SfcsProductOperationMonitor._1')}}</el-button>
      </custom-container-header>
    </template>
    <el-row>
      <!-- 产品料号及制程（左） -->
      <el-col :span="5">
        <div class="ProductAndProcessList">
          <div>
            <span style="display: block;color: #606266;font-size: 16px;padding: 10px 10px;background-color:#e8eaec;">{{$t('SfcsProductOperationMonitor._7')}}</span>
          </div>
          <!-- 制程详情表格 -->
          <div class="ProductAndProcessTable">
            <vxe-table ref="pTable"
                       border
                       resizable
                       height="100%"
                       size="medium"
                       align="center"
                       highlight-current-row
                       highlight-hover-row
                       show-overflow
                       auto-resize
                       keep-source
                       stripe
                       :loading="loading"
                       :data="pnapTable"
                       :mouse-config="{selected: true}"
                       :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
                       :radio-config="{labelField: 'name', trigger: 'row'}"
                       :checkbox-config="{checkField: 'checked', trigger: 'row'}">
              <vxe-table-column field="DESCRIPTION"
                                :title="$t('SfcsProductOperationMonitor._8')" />
            </vxe-table>
          </div>
        </div>
      </el-col>
      <!-- 右 -->
      <el-col :span="19">
        <div class="mainBox">
          <!-- 监控模式选择 -->
          <div class="mainBoxHeader">
            <el-form label-width="100px">
              <el-form-item :label="$t('SfcsProductOperationMonitor._9')">
                <el-select @change="changeMonitorMode"
                           v-model="formData.MONITOR_MODE"
                           style="width:100%">
                  <div style="height: 34px;padding: 0 20px;display: flex;position: sticky;top: 0;background: #fff;z-index: 9;border-bottom: 1px solid rgb(229, 231, 237)">
                    <span style="width: 30%;box-size: border-box;padding-right: 10px;color: #606266;line-height: 34px;font-size: 14px">{{$t('SfcsProductOperationMonitor._9')}}</span>
                    <span style="width: 30%;color: #606266;line-height: 34px;font-size: 14px;box-size: border-box;padding-left: 10px;border-left: 1px solid rgb(229, 231, 237)">{{$t('SfcsProductOperationMonitor._10')}}</span>
                    <span style="width: 40%;color: #606266;line-height: 34px;font-size: 14px;box-size: border-box;padding-left: 10px;border-left: 1px solid rgb(229, 231, 237)">{{$t('SfcsProductOperationMonitor._11')}}</span>
                  </div>
                  <el-option style="width: 100%;display: flex"
                             v-for="(item,index) in MonitorModeList"
                             :key="index"
                             :value="item.LOOKUP_CODE"
                             :label="item.MEANING">
                    <span style="width: 30%;box-size: border-box;padding-right: 10px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{ item.MEANING }}</span>
                    <span style="width: 30%;box-size: border-box;padding-left: 10px;border-left: 1px solid rgb(229, 231, 237);overflow: hidden;">{{ item.DESCRIPTION }}</span>
                    <span style="width: 40%;box-size: border-box;padding-left: 10px;border-left: 1px solid rgb(229, 231, 237);overflow: hidden;">{{ item.CHINESE }}</span>
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-input disabled
                          type="textarea"
                          :autosize="{ minRows: 2, maxRows: 4}"
                          v-model="txt" />
              </el-form-item>
            </el-form>
          </div>
          <!-- 产品流程监控 -->
          <div class="mainBoxFooter">
            <div>
              <span style="display: block;color: #606266;font-size: 16px;padding: 10px 10px;background-color:#e8eaec;">{{$t('SfcsProductOperationMonitor._12')}}</span>
            </div>
            <div class="ProductProcessMonitoring">
              <vxe-table ref="xTable"
                         border
                         resizable
                         height="100%"
                         size="medium"
                         align="center"
                         highlight-current-row
                         highlight-hover-row
                         show-overflow
                         auto-resize
                         keep-source
                         stripe
                         :loading="loading"
                         :data="mianTable"
                         :mouse-config="{selected: true}"
                         :edit-rules="validRules"
                         :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
                         :radio-config="{labelField: 'name', trigger: 'row'}"
                         :checkbox-config="{checkField: 'checked', trigger: 'row'}"
                         @cell-click="cellClick">
                <vxe-table-column min-width="190px"
                                  field="BEGIN_OPERATION_CODE"
                                  :title="firstName"
                                  :edit-render="{name: '$select', options: LimitInputList}" />
                <vxe-table-column min-width="280px"
                                  field="END_OPERATION_CODE"
                                  :title="secondName"
                                  :edit-render="{autofocus: '.custom-input', type: 'visible'}">
                  <template v-slot:edit="{row,$rowIndex}">
                    <div>
                      <span v-show="$rowIndex !== currentRowIndex">{{ getOperationProcessName(row.END_OPERATION_CODE, operatingList) }}</span>
                      <el-select v-show="$rowIndex === currentRowIndex"
                                 v-model="row.END_OPERATION_CODE"
                                 style="width: 100%">
                        <el-option style="width: 200px;display: flex"
                                   v-for="item in operatingList"
                                   :key="item.PRODUCT_OPERATION_CODE"
                                   :value="item.PRODUCT_OPERATION_CODE"
                                   :label="item.CURRENT_OPERATION" />
                      </el-select>
                    </div>
                  </template>
                </vxe-table-column>
                <vxe-table-column min-width="200px"
                                  v-if="this.formData.MONITOR_MODE === 1 || this.formData.MONITOR_MODE === 2"
                                  field="END_OPERATION_CODE"
                                  :title="$t('SfcsProductOperationMonitor._13')"
                                  :edit-render="{name: '$select', options: actualList,props: {disabled: true}}" />
                <vxe-table-column min-width="180px"
                                  field="ALARM_CRITERIA"
                                  :title="$t('SfcsProductOperationMonitor._14')"
                                  :edit-render="{name:'$input',props:{type:'number',min: '0'}}" />
                <vxe-table-column min-width="200px"
                                  field="STOP_CRITERIA"
                                  :title="$t('SfcsProductOperationMonitor._15')"
                                  :edit-render="{name:'$input',props:{type:'number',min: '0'}}" />
                <vxe-table-column min-width="180px"
                                  field="CRITERIA_UNIT"
                                  :title="$t('SfcsProductOperationMonitor._16')"
                                  :edit-render="{autofocus: '.custom-input', type: 'visible'}">
                  <template v-slot:edit="{row}">
                    <div>
                      <span>{{ getMonitorUnitName(row.CRITERIA_UNIT, MonitorUnitList) }}</span>
                      <el-select :disabled="selectDisabled"
                                 v-show="false"
                                 v-model="row.CHINESE"
                                 style="width: 100%">
                        <el-option style="width: 360px;display: flex"
                                   v-for="item in MonitorUnitList"
                                   :key="item.ID"
                                   :value="item.ID"
                                   :label="item.CHINESE" />
                      </el-select>
                    </div>
                  </template>
                </vxe-table-column>
                <vxe-table-column min-width="200px"
                                  field="COMPARE_MODE"
                                  :title="$t('SfcsProductOperationMonitor._17')"
                                  :edit-render="{autofocus: '.custom-input', type: 'visible'}">
                  <template v-slot:edit="{row,$rowIndex}">
                    <div>
                      <span v-show="$rowIndex !== currentRowIndex">{{ getCollectName(row.COMPARE_MODE, CompareModeList) }}</span>
                      <el-select v-show="$rowIndex === currentRowIndex"
                                 v-model="row.COMPARE_MODE"
                                 style="width: 100%">
                        <div style="height: 34px;padding: 0 20px;display: flex;position: sticky;top: 0;background: #fff;z-index: 9;border-bottom: 1px solid rgb(229, 231, 237)">
                          <span style="width: 20%;box-size: border-box;padding-right: 10px;color: #606266;line-height: 34px;font-size: 14px">{{$t('SfcsProductOperationMonitor._17')}}</span>
                          <span style="width: 40%;color: #606266;line-height: 34px;font-size: 14px;box-size: border-box;padding-left: 10px;border-left: 1px solid rgb(229, 231, 237)">{{$t('SfcsProductOperationMonitor._10')}}</span>
                          <span style="width: 40%;color: #606266;line-height: 34px;font-size: 14px;box-size: border-box;padding-left: 10px;border-left: 1px solid rgb(229, 231, 237)">{{$t('SfcsProductOperationMonitor._11')}}</span>
                        </div>
                        <el-option style="width: 360px;display: flex"
                                   v-for="item in CompareModeList"
                                   :key="item.LOOKUP_CODE"
                                   :value="item.LOOKUP_CODE"
                                   :label="item.MEANING">
                          <span style="width: 20%;box-size: border-box;padding-right: 10px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{ item.MEANING }}</span>
                          <span style="width: 40%;box-size: border-box;padding-left: 10px;border-left: 1px solid rgb(229, 231, 237);overflow: hidden;">{{ item.DESCRIPTION }}</span>
                          <span style="width: 40%;box-size: border-box;padding-left: 10px;border-left: 1px solid rgb(229, 231, 237);overflow: hidden;">{{ item.CHINESE }}</span>
                        </el-option>
                      </el-select>
                    </div>
                  </template>
                </vxe-table-column>
                <vxe-table-column min-width="240px"
                                  field="STOP_AND_HOLD"
                                  :title="$t('SfcsProductOperationMonitor._18')">
                  <template slot-scope="scope">
                    <el-switch v-model="scope.row.STOP_AND_HOLD"
                               :active-text="$t('cccn._9')"
                               :inactive-text="$t('cccn._10')"
                               active-color="#13ce66"
                               inactive-color="#cccccc"
                               active-value="Y"
                               inactive-value="N" />
                  </template>
                </vxe-table-column>
                <vxe-table-column min-width="150px"
                                  field="ENABLED"
                                  :title="$t('SfcsProductOperationMonitor._6')">
                  <template slot-scope="scope">
                    <el-switch v-model="scope.row.ENABLED"
                               :active-text="$t('cccn._9')"
                               :inactive-text="$t('cccn._10')"
                               active-color="#13ce66"
                               inactive-color="#cccccc"
                               active-value="Y"
                               inactive-value="N" />
                  </template>
                </vxe-table-column>
              </vxe-table>
            </div>
            <!-- 分页 -->
            <div class="pagination">
              <el-pagination :current-page="formData.Page"
                             :page-size="formData.Limit"
                             :page-sizes="[15, 25, 35, 45]"
                             layout="total, sizes, prev, pager, next, jumper"
                             :total="totalPage"
                             @size-change="handleSizeChange"
                             @current-change="handleCurrentChange" />
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </custom-container>
</template>

<script>
import customContainer from '@/components/custom-container'
import customContainerHeader from '@/components/custom-container-header'
import {
  SfcsPnLoadData,
  SfcsRoutesLoadData,
  Index,
  GetCurrentReworkOption,
  LoadMonitorData,
  SaveData
} from '@/api/SfcsProductOperationMonitor'
export default {
  name: 'SfcsProductOperationMonitor',
  components: {
    customContainer,
    customContainerHeader
  },
  data () {
    return {
      formData: {
        PART_NO: null, // 料号
        MONITOR_MODE: null, // 监控模式
        ROUTECONFIGCOUNT: 0, // 制程配置总数
        COMPARE_MODE: null // 对比模式
      },
      pnapTable: [], // 产品料号及制程列表数据
      loading: false,
      ProcessList: [], // 制程列表
      // ProcessFormData: {}, // 制程表单
      // disabled: false,
      MonitorModeList: [], // 监控模式列表
      monitorFormData: {}, // 监控表单
      txt: '',
      mianTable: [],
      totalPage: 0,
      form: {
        InsertRecords: [],
        UpdateRecords: [],
        RemoveRecords: []
      },
      CompareModeList: [], // 对比模式
      currentRowIndex: -1,
      MonitorUnitList: [], // 单位
      selectDisabled: true,
      monitorModeIndex: -1, // 监控模式
      firstName: '',
      secondName: '',
      actualList: [], // 实际工序下拉框
      LimitInputList: [], // 工序
      operatingList: [], // 执行操作工序
      ProcessData: [], // 制程数据
      ProcessID: 0, // 制程ID
      validRules: {
        BEGIN_OPERATION_CODE: [
          {
            required: true,
            message: this.$t('SfcsProductOperationMonitor._29')
          }
        ],
        END_OPERATION_CODE: [
          {
            required: true,
            message: this.$t('SfcsProductOperationMonitor._29')
          }
        ],
        ALARM_CRITERIA: [
          {
            required: true,
            message: this.$t('SfcsProductOperationMonitor._29')
          }
        ],
        STOP_CRITERIA: [
          {
            required: true,
            message: this.$t('SfcsProductOperationMonitor._29')
          }
        ],
        CRITERIA_UNIT: [
          {
            required: true,
            message: this.$t('SfcsProductOperationMonitor._29')
          }
        ],
        COMPARE_MODE: [
          {
            required: true,
            message: this.$t('SfcsProductOperationMonitor._29')
          }
        ],
        STOP_AND_HOLD: [
          {
            required: true,
            message: this.$t('SfcsProductOperationMonitor._29')
          }
        ],
        ENABLED: [
          {
            required: true,
            message: this.$t('SfcsProductOperationMonitor._29')
          }
        ]
      }
    }
  },
  created () {
    this.getSfcsPn()
  },
  methods: {
    async getSfcsPn () {
      const res = await SfcsPnLoadData(this.formData)
      if (res.Result.length !== 0) {
        this.getSfcsRoutes()
        // this.disabled = true
        this.getIndex()
      } else {
        // this.disabled = false
        this.$message({
          message: this.$t('SfcsProductOperationMonitor._19'),
          type: 'error'
        })
      }
    },
    // 获取制程下拉列表
    async getSfcsRoutes () {
      const res = await SfcsRoutesLoadData()
      this.ProcessList = res.Result ? res.Result : []
    },
    // 检查料号
    searchClick () {
      if (this.formData.PART_NO === null) {
        this.$message({
          message: this.$t('SfcsProductOperationMonitor._20'),
          type: 'error'
        })
      } else {
        this.getSfcsPn()
      }
    },
    // 制程
    changeDetails (e) {
      this.ProcessID = e
      GetCurrentReworkOption({ roundid: e }).then(res => {
        if (res.Result) {
          const data = res.Result
          this.ProcessData = data
          this.pnapTable = data.CurrentOperationidList
          this.formData.ROUTECONFIGCOUNT = this.pnapTable.length
          this.actualList.push({
            label: '',
            value: '',
            disabled: false
          })
          this.LimitInputList = []
          data.CurrentOperationidList.map(item => {
            this.LimitInputList.push({
              label: item.DESCRIPTION,
              value: item.PRODUCT_OPERATION_CODE,
              disabled: false
            })
          })
          this.operatingList = data.CurrentReworkList
          if (this.formData.MONITOR_MODE !== null) {
            LoadMonitorData(this.formData).then(result => {
              this.loading = true
              this.mianTable = result.Result ? result.Result : []
              this.loading = false
              this.currentRowIndex = -1
            })
          }
        }
      })
    },
    // 获取监控模式
    async getIndex () {
      const res = await Index()
      if (res.Result) {
        const data = res.Result
        this.MonitorModeList = data.MonitorModeList
        this.CompareModeList = data.CompareModeList
        this.MonitorUnitList = data.MonitorUnitList
      }
    },
    // 切换监控模式,刷新主表格
    async changeMonitorMode (e) {
      // this.LimitInputList = [...new Set(this.LimitInputList)]
      this.actualList = []
      // this.monitorModeIndex = e
      if (e === 1) {
        this.txt = this.$t('SfcsProductOperationMonitor._21')
        this.firstName = this.$t('SfcsProductOperationMonitor._22')
        this.secondName = this.$t('SfcsProductOperationMonitor._23')
        this.operatingList = this.ProcessData.NextOptionskList
        if (!this.ProcessData.NextOptionskList) {
          return
        }
        this.ProcessData.NextOptionskList.map(item => {
          this.actualList.push({
            label: item.NEXT_OPERATION,
            value: item.PRODUCT_OPERATION_CODE,
            disabled: true
          })
        })
      } else if (e === 2) {
        this.txt = this.$t('SfcsProductOperationMonitor._21')
        this.firstName = this.$t('SfcsProductOperationMonitor._22')
        this.secondName = this.$t('SfcsProductOperationMonitor._23')
        if (!this.ProcessData.CurrentReworkList) {
          return
        }
        this.ProcessData.CurrentReworkList.map(item => {
          this.actualList.push({
            label: item.REPAIR_OPERATION,
            value: item.PRODUCT_OPERATION_CODE,
            disabled: true
          })
        })
      } else if (e === 3) {
        this.txt = this.$t('SfcsProductOperationMonitor._24')
        this.firstName = this.$t('SfcsProductOperationMonitor._25')
        this.secondName = this.$t('SfcsProductOperationMonitor._26')
      } else if (e === 5) {
        this.txt = this.$t('SfcsProductOperationMonitor._27')
        this.firstName = this.$t('SfcsProductOperationMonitor._28')
        this.secondName = this.$t('SfcsProductOperationMonitor._26')
      }
      const res = await LoadMonitorData(this.formData)
      this.loading = true
      this.mianTable = res.Result ? res.Result : []
      this.loading = false
      this.currentRowIndex = -1
    },
    handleSizeChange (val) {
      this.formData.Limit = val
      LoadMonitorData(this.formData).then(res => {
        this.mianTable = res.Result
      })
    },
    handleCurrentChange (val) {
      this.formData.Page = val
      LoadMonitorData(this.formData).then(res => {
        this.mianTable = res.Result
      })
    },
    // 清空
    cleanClick () {
      this.formData = {}
      this.formData.ROUTE_ID = ''
      this.pnapTable = []
      this.txt = ''
      this.mianTable = []
      this.disabled = false
      this.formData.ROUTECONFIGCOUNT = 0
    },
    // 新增
    async addClick (row) {
      if (
        this.formData.MONITOR_MODE === 1 ||
        this.formData.MONITOR_MODE === 2
      ) {
        const record = {
          ID: 0,
          PART_NO: this.formData.PART_NO,
          MONITOR_MODE: this.formData.MONITOR_MODE,
          BEGIN_OPERATION_CODE: null,
          END_OPERATION_CODE: null,
          ALARM_CRITERIA: null,
          STOP_CRITERIA: null,
          CRITERIA_UNIT: 1,
          COMPARE_MODE: null,
          STOP_AND_HOLD: '',
          ENABLED: '',
          ROUTE_ID: this.ProcessID
        }
        this.$refs.xTable.insertAt(record, row).then(({ row }) => {
          this.$refs.xTable.setActiveRow(row)
        })
      } else if (
        this.formData.MONITOR_MODE === 3 ||
        this.formData.MONITOR_MODE === 5
      ) {
        const record = {
          ID: 0,
          PART_NO: this.formData.PART_NO,
          MONITOR_MODE: this.formData.MONITOR_MODE,
          BEGIN_OPERATION_CODE: null,
          END_OPERATION_CODE: null,
          ALARM_CRITERIA: null,
          STOP_CRITERIA: null,
          CRITERIA_UNIT: 2,
          COMPARE_MODE: null,
          STOP_AND_HOLD: '',
          ENABLED: '',
          ROUTE_ID: this.ProcessID
        }
        this.$refs.xTable.insertAt(record, row).then(({ row }) => {
          this.$refs.xTable.setActiveRow(row)
        })
      }
    },
    // 保存
    async saveClick () {
      var that = this
      var postdata = this.$refs.xTable.getRecordset()
      if (
        postdata.insertRecords.length ||
        postdata.updateRecords.length ||
        postdata.removeRecords.length
      ) {
        this.$refs.xTable.validate(valid => {
          if (valid) {
            this.form.InsertRecords = postdata.insertRecords
            this.form.UpdateRecords = postdata.updateRecords
            this.form.RemoveRecords = postdata.removeRecords
            SaveData(this.form).then(res => {
              if (res.Result) {
                this.form = {}
                LoadMonitorData(this.formData).then(res => {
                  this.loading = true
                  this.mianTable = res.Result ? res.Result : []
                  this.loading = false
                  this.currentRowIndex = -1
                })

                that.$notify({
                  title: this.$t('crss._20'),
                  message: this.$t('crss._21'),
                  type: 'success',
                  duration: 2000
                })
                console.log('保存成功')
              }
            })
          }
        })
      }
    },
    cellClick (e) {
      const { $rowIndex } = e
      if (this.currentRowIndex !== $rowIndex) {
        this.currentRowIndex = $rowIndex
      }
      this.currentIndex = $rowIndex
    },
    getCollectName (index, originData) {
      let res = originData[index - 1]?.MEANING
      return res
    },
    getMonitorUnitName (index, originData) {
      let res = originData[index - 1]?.CHINESE
      console.log(res)
      return res
    },
    getOperationProcessName (id, originData) {
      let res = ''
      originData.map(item => {
        if (item.PRODUCT_OPERATION_CODE === id) {
          res = item.CURRENT_OPERATION
        }
      })
      return res
    }
  }
}
</script>

<style lang="scss" scoped>
.ProductAndProcessList {
  height: calc(100vh - 80px);
  border: 1px solid #cfd7e5;
  overflow: hidden;
}
.ProductAndProcessTable {
  height: 100%;
  // overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
}
.mainBox {
  margin-left: 10px;
  height: calc(100vh - 80px);
  border: 1px solid #cfd7e5;
}
.mainBoxHeader {
  margin-top: 10px;
  box-sizing: border-box;
  padding-right: 10px;
}
.mainBoxFooter {
  //   height: calc(100vh - 57px - 242px - 10px - 30px);
  box-sizing: border-box;
  padding: 0 10px;
}
.ProductProcessMonitoring {
  height: calc(100vh - 57px - 94px - 30px - 30px - 44px - 32px);
}
.pagination {
  margin-top: 10px;
}
</style>
