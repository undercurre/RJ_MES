<template>
  <d2-container>
    <template slot="header">
      <custom-container-header
        :isExport="false"
        :isExportTpl="false"
        :isImport="false"
      >
        <el-input
          clearable
          v-model="formData.ROUTE_NAME"
          :placeholder="$t('SfcsRoutes._20')"
          @keyup.enter.native="searchClick"
        />
        <el-button
          type="primary"
          icon="el-icon-search"
          @click.prevent="searchClick"
          >{{ $t("publics.btn.search") }}</el-button
        >&nbsp;
        <el-button
          type="primary"
          icon="el-icon-edit"
          @click.prevent="editClick"
          v-if="$btnList.indexOf('SfcsRoutesSave') !== -1"
          >{{ $t("SfcsRoutes._32") }}</el-button
        >
        <el-button
          type="success"
          icon="el-icon-check"
          @click.prevent="saveClick()"
          v-if="$btnList.indexOf('SfcsRoutesEdit') !== -1"
          >{{ $t("publics.btn.save") }}</el-button
        >
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="AddNew"
          v-show="isShow"
          v-if="$btnList.indexOf('SfcsRoutesAdd') !== -1"
          >{{ $t("SfcsRoutes._31") }}</el-button
        >
      </custom-container-header>
    </template>
    <el-row>
      <!-- 编程列表（左） -->
      <el-col :span="6" class="Programming-list">
        <el-collapse v-model="activeNames">
          <el-collapse-item
            v-for="(item, index) in ProgrammingData"
            :key="item.ID"
            :name="item.ID"
            :title="$t('SfcsRoutes._1')"
            @click.native="handleClickCollapse(item, index)"
            :class="index === gIndex ? '' : ''"
            style="position: relative"
          >
            <div>{{ $t("SfcsRoutes._2") }}{{ item.ROUTE_NAME }}</div>
            <div>{{ $t("SfcsRoutes._3") }}{{ item.DESCRIPTION }}</div>
            <div>{{ $t("SfcsRoutes._4") }}{{ item.ENABLED }}</div>
            <img
              class="selectedImg"
              v-show="index === gIndex"
              src="@/assets/images/Check.jpg"
              alt
            />
          </el-collapse-item>
        </el-collapse>
      </el-col>
      <!-- 制程配置设定（右） -->
      <el-col :span="18">
        <div class="Process-configuration-settings">
          <vxe-table
            ref="xTable"
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
            :data="mainTable"
            :edit-rules="validRules"
            :mouse-config="{ selected: true }"
            :edit-config="{ trigger: 'click', mode: 'row', showStatus: true }"
            :radio-config="{ labelField: 'name', trigger: 'row' }"
            :checkbox-config="{ checkField: 'checked', trigger: 'row' }"
            @cell-click="cellClick"
          >
            <vxe-table-column
              min-width="150"
              field="PREVIOUS_OPERATION_ID"
              :title="$t('SfcsRoutes._5')"
              :edit-render="{
                name: 'select',
                options: previousBox,
                attrs: { disabled: true },
              }"
            />
            <vxe-table-column
              min-width="170"
              field="CURRENT_OPERATION_ID"
              :title="$t('SfcsRoutes._6')"
              :edit-render="{ autofocus: '.custom-input', type: 'visible' }"
            >
              <template v-slot:edit="{ row, $rowIndex }">
                <div>
                  <span v-show="$rowIndex !== currentRowIndex">{{
                    getCollectName(row.CURRENT_OPERATION_ID, currentBox)
                  }}</span>
                  <el-select
                    @change="handleChangeCurrentOperation(row, $rowIndex)"
                    v-show="$rowIndex === currentRowIndex"
                    v-model="row.CURRENT_OPERATION_ID"
                    style="width: 100%"
                  >
                    <div
                      style="
                        height: 34px;
                        padding: 0 20px;
                        display: flex;
                        position: sticky;
                        top: 0;
                        background: #fff;
                        z-index: 9;
                        border-bottom: 1px solid rgb(229, 231, 237);
                      "
                    >
                      <span
                        style="
                          width: 60%;
                          box-size: border-box;
                          padding-right: 10px;
                          color: #606266;
                          line-height: 34px;
                          font-size: 14px;
                        "
                        >{{ $t("SfcsProductPallet._6") }}</span
                      >
                      <span
                        style="
                          width: 40%;
                          color: #606266;
                          line-height: 34px;
                          font-size: 14px;
                          box-size: border-box;
                          padding-left: 10px;
                          border-left: 1px solid rgb(229, 231, 237);
                        "
                        >{{ $t("SfcsProductPallet._7") }}</span
                      >
                    </div>
                    <el-option
                      style="width: 360px; display: flex"
                      v-for="item in currentBox"
                      :key="item.ID"
                      :value="item.ID"
                      :label="item.DESCRIPTION"
                    >
                      <span
                        style="
                          width: 60%;
                          box-size: border-box;
                          padding-right: 10px;
                          overflow: hidden;
                          white-space: nowrap;
                          text-overflow: ellipsis;
                        "
                        >{{ item.OPERATION_NAME }}</span
                      >
                      <span
                        style="
                          width: 40%;
                          box-size: border-box;
                          padding-left: 10px;
                          border-left: 1px solid rgb(229, 231, 237);
                        "
                        >{{ item.DESCRIPTION }}</span
                      >
                    </el-option>
                  </el-select>
                </div>
              </template>
            </vxe-table-column>
            <vxe-table-column
              min-width="150"
              field="NEXT_OPERATION_ID"
              :title="$t('SfcsRoutes._7')"
              :edit-render="{
                name: 'select',
                options: nextBox,
                attrs: { disabled: true },
              }"
            />
            <vxe-table-column
              min-width="150"
              field="REPAIR_OPERATION_ID"
              :title="$t('SfcsRoutes._8')"
              :edit-render="{ autofocus: '.custom-input', type: 'visible' }"
            >
              <template v-slot:edit="{ row, $rowIndex }">
                <div>
                  <span v-show="$rowIndex !== currentRowIndex">{{
                    getCollectName(row.REPAIR_OPERATION_ID, repairBox)
                  }}</span>
                  <el-select
                    @change="handleChangeRepairOperation(row, $rowIndex)"
                    v-show="$rowIndex === currentRowIndex"
                    v-model="row.REPAIR_OPERATION_ID"
                    style="width: 100%"
                  >
                    <div
                      style="
                        height: 34px;
                        padding: 0 20px;
                        display: flex;
                        position: sticky;
                        top: 0;
                        background: #fff;
                        z-index: 9;
                        border-bottom: 1px solid rgb(229, 231, 237);
                      "
                    >
                      <span
                        style="
                          width: 55%;
                          box-size: border-box;
                          padding-right: 10px;
                          color: #606266;
                          line-height: 34px;
                          font-size: 14px;
                        "
                        >{{ $t("SfcsProductPallet._6") }}</span
                      >
                      <span
                        style="
                          width: 45%;
                          color: #606266;
                          line-height: 34px;
                          font-size: 14px;
                          box-size: border-box;
                          padding-left: 10px;
                          border-left: 1px solid rgb(229, 231, 237);
                        "
                        >{{ $t("SfcsProductPallet._7") }}</span
                      >
                    </div>
                    <el-option
                      style="width: 360px; display: flex"
                      v-for="item in repairBox"
                      :key="item.ID"
                      :value="item.ID"
                      :label="item.DESCRIPTION"
                    >
                      <span
                        style="
                          width: 55%;
                          box-size: border-box;
                          padding-right: 10px;
                          overflow: hidden;
                          white-space: nowrap;
                          text-overflow: ellipsis;
                        "
                        >{{ item.OPERATION_NAME }}</span
                      >
                      <span
                        style="
                          width: 45%;
                          box-size: border-box;
                          padding-left: 10px;
                          border-left: 1px solid rgb(229, 231, 237);
                        "
                        >{{ item.DESCRIPTION }}</span
                      >
                    </el-option>
                  </el-select>
                </div>
              </template>
            </vxe-table-column>
            <vxe-table-column
              min-width="160"
              field="REWORK_OPERATION_ID"
              :title="$t('SfcsRoutes._9')"
              :edit-render="{ autofocus: '.custom-input', type: 'visible' }"
            >
              <template v-slot:edit="{ row, $rowIndex }">
                <div>
                  <span v-show="$rowIndex !== currentRowIndex">{{
                    getCollectName(row.REWORK_OPERATION_ID, reworkBox)
                  }}</span>
                  <el-select
                    @change="handleChangeReworkOperation(row, $rowIndex)"
                    v-show="$rowIndex === currentRowIndex"
                    v-model="row.REWORK_OPERATION_ID"
                    style="width: 100%"
                  >
                    <div
                      style="
                        height: 34px;
                        padding: 0 20px;
                        display: flex;
                        position: sticky;
                        top: 0;
                        background: #fff;
                        z-index: 9;
                        border-bottom: 1px solid rgb(229, 231, 237);
                      "
                    >
                      <span
                        style="
                          min-width: 50%;
                          box-size: border-box;
                          padding-right: 10px;
                          color: #606266;
                          line-height: 34px;
                          font-size: 14px;
                        "
                        >{{ $t("SfcsProductPallet._6") }}</span
                      >
                      <span
                        style="
                          width: 50%;
                          color: #606266;
                          line-height: 34px;
                          font-size: 14px;
                          box-size: border-box;
                          padding-left: 10px;
                          border-left: 1px solid rgb(229, 231, 237);
                        "
                        >{{ $t("SfcsProductPallet._7") }}</span
                      >
                    </div>
                    <el-option
                      style="width: 360px; display: flex"
                      v-for="item in reworkBox"
                      :key="item.ID"
                      :value="item.ID"
                      :label="item.DESCRIPTION"
                    >
                      <span
                        style="
                          width: 50%;
                          box-size: border-box;
                          padding-right: 10px;
                          overflow: hidden;
                          white-space: nowrap;
                          text-overflow: ellipsis;
                        "
                        >{{ item.OPERATION_NAME }}</span
                      >
                      <span
                        style="
                          width: 50%;
                          box-size: border-box;
                          padding-left: 10px;
                          border-left: 1px solid rgb(229, 231, 237);
                        "
                        >{{ item.DESCRIPTION }}</span
                      >
                    </el-option>
                  </el-select>
                </div>
              </template>
            </vxe-table-column>
            <vxe-table-column
              :title="$t('SfcsRoutes._10')"
              min-width="180"
              fixed="right"
            >
              <template v-slot="{ row, $rowIndex }">
                <el-button
                  type="primary"
                  v-if="$btnList.indexOf('SfcsRoutesEdit') !== -1"
                  @click="rowAddClick(row, $rowIndex)"
                  >{{ $t("SfcsRoutes._11") }}</el-button
                >
                <el-button
                  type="danger"
                  @click="removeClick(row)"
                  v-if="$btnList.indexOf('SfcsRoutesRemove') !== -1"
                  >{{ $t("publics.btn.delete") }}</el-button
                >
              </template>
            </vxe-table-column>
          </vxe-table>
        </div>
        <!-- 分页 -->
        <div class="pagination">
          <el-pagination
            :current-page="formData.Page"
            :page-size="formData.Limit"
            :page-sizes="[15, 25, 35, 45]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalPage"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </el-col>
    </el-row>
  </d2-container>
</template>

<script>
import pagination from '@/views/mixin/page'
import customContainerHeader from '@/components/custom-container-header'
import {
  Index,
  LoadData,
  LoadRouteConfig,
  CheckWIPExistedAPI,
  RoutesConfigSaveData
} from '@/api/SfcsRoutes'
export default {
  name: 'SfcsRoutes',
  mixins: [pagination],
  components: {
    customContainerHeader
  },
  data () {
    return {
      formData: {
        PART_NO: '', // 料号
        ROUTE_NAME: '', // 制程名称
        ROUTE_CLASS: null, // 厂部
        ROUTE_TYPE: null, // 类型
        DESCRIPTION: '', // 描述
        ENABLED: '', // 是否
        Page: 1,
        Limit: null,
        Key: '',
        ...this.formData
      },
      activeNames: [],
      mainTable: [],
      loading: false,
      totalPage: 0,
      ProgrammingData: [], // 编程列表数据
      ProgrammingForm: {
        ROUTE_ID: null,
        Page: 1,
        Limit: 15,
        Key: '',
        ...this.ProgrammingForm
      },
      previousBox: [], // 前一道工序
      currentBox: [], // 当前工序
      nextBox: [], // 下一道工序
      repairBox: [], // 维修工序
      reworkBox: [], // 返工工序
      defaultIndex: 0,
      form: {
        InsertRecords: [],
        UpdateRecords: [],
        RemoveRecords: []
      },
      defaultLength: -1, // 默认长度
      checkForm: {
        operationCode: 0, // 工序ID
        routeID: 0 // 制程ID
      },
      mainTableCurrentID: [],
      defaultReworkBox: [],
      validRules: {
        CURRENT_OPERATION_ID: [
          { required: true, message: this.$t('SfcsRoutes._12') }
        ],
        REPAIR_OPERATION_ID: [
          { required: true, message: this.$t('SfcsRoutes._13') }
        ],
        REWORK_OPERATION_ID: [
          { required: true, message: this.$t('SfcsRoutes._14') }
        ]
      },
      currentRowIndex: -1,
      isSave: true,
      GetNoSetNoRoute: [],
      dialogTableVisible: false,
      isShow: false,
      defaulNewRouteId: 0,
      GetStartEnd: [], // 开始和结束
      gIndex: -1
    }
  },
  created () {
    this.getIndex()
    this.getLoadData()
  },
  watch: {
    mainTable () {
      if (this.mainTable.length === 0) {
        this.isShow = true
      } else {
        this.isShow = false
      }
    }
  },
  methods: {
    AddNew () {
      const record = {
        ID: 0,
        ROUTE_ID: this.defaulNewRouteId,
        PRODUCT_OPERATION_CODE: 0,
        CURRENT_OPERATION_ID: null,
        PREVIOUS_OPERATION_ID: 100, // 前一道工序
        NEXT_OPERATION_ID: 999, // 下一道工序
        REPAIR_OPERATION_ID: 748, // 维修工序
        REWORK_OPERATION_ID: 1, // 返工工序
        ORDER_NO: 0,
        rowIndex: -2
      }
      this.$refs.xTable.insertAt(record, null)
    },
    async getIndex (newData) {
      const res = await Index()
      if (res.Result) {
        const data = res.Result
        this.currentBox = data.CurrentOperationList
        this.repairBox = data.RepairOperationList
        this.reworkBox = data.CurrentOperationList
        this.defaultReworkBox = this.reworkBox
        this.GetNoSetNoRoute = data.GetNoSetNoRoute[0] || []
        this.GetStartEnd = data.GetStartEnd
        // 下拉数据
        data.CurrentOperationList.map((item) => {
          this.previousBox.push({
            label: item.DESCRIPTION,
            value: Number(item.ID),
            disabled: true
          })
          this.nextBox.push({
            label: item.DESCRIPTION,
            value: Number(item.ID),
            disabled: true
          })
        })
        data.GetStartEnd.map((item) => {
          this.previousBox.push({
            label: item.DESCRIPTION,
            value: Number(item.ID),
            disabled: true
          })
          this.nextBox.push({
            label: item.DESCRIPTION,
            value: Number(item.ID),
            disabled: true
          })
        })
      }
    },
    // 获取编程列表（左）
    async getLoadData () {
      this.ProgrammingData = []
      const res = await LoadData(this.formData)
      this.ProgrammingData = res.Result ? res.Result : []
      Object.values(this.ProgrammingData).map((item) => {
        this.activeNames.push(item.ID)
      })
      this.defaulNewRouteId = this.ProgrammingData[0].ID
      this.getLoadRouteConfig()
    },
    // 获取制程配置设定（右）
    async getLoadRouteConfig (ID, index) {
      this.loading = true
      this.ProgrammingForm.ROUTE_ID =
        ID || this.ProgrammingData[this.defaultIndex].ID
      const res = await LoadRouteConfig(this.ProgrammingForm)
      const data = res.Result
      this.defaultLength = data.length - 1
      this.loading = false
      this.mainTable = data || []
      this.totalPage = res.TotalCount ? res.TotalCount : 0
      this.currentRowIndex = -1
      this.mainTableCurrentID = []
      Object.values(data).map((item) => {
        this.mainTableCurrentID.push(item['CURRENT_OPERATION_ID'])
      })
      this.filterReworkBox()
    },
    handleClickCollapse (item, index) {
      console.log('左边列表index:', index)
      console.log(item)
      this.gIndex = index
      this.isSave = true
      this.defaulNewRouteId = item.ID
      this.getLoadRouteConfig(item.ID, index)
    },
    // 增加
    async addClick (row) {
      console.log('新增:', row)
      if (this.isSave === true) {
        const record = {
          ID: 0,
          ROUTE_ID: this.mainTable[this.defaultLength].ROUTE_ID,
          PRODUCT_OPERATION_CODE: 0,
          CURRENT_OPERATION_ID: null,
          PREVIOUS_OPERATION_ID: this.mainTable[this.defaultLength]
            .CURRENT_OPERATION_ID, // 前一道工序
          NEXT_OPERATION_ID: this.mainTable[this.defaultLength]
            .NEXT_OPERATION_ID, // 下一道工序
          REPAIR_OPERATION_ID: this.mainTable[this.defaultLength]
            .REPAIR_OPERATION_ID, // 维修工序
          REWORK_OPERATION_ID: this.mainTable[this.defaultLength]
            .REWORK_OPERATION_ID, // 返工工序
          ORDER_NO: (this.defaultLength + 1) * 10,
          rowIndex: -1
        }
        console.log('新增数据', record)
        this.$refs.xTable.insertAt(record, row).then(({ row }) => {
          this.$refs.xTable.setActiveRow(row)
        })
        this.isSave = false
      } else {
        this.$message({
          message: this.$t('SfcsRoutes._15'),
          type: 'error'
        })
      }
    },
    // 插入
    rowAddClick (row, rowIndex) {
      console.log('插入:', row)
      if (this.isSave === true) {
        this.$refs.xTable.validate((valid) => {
          if (valid) {
            const addIndex = rowIndex + 1
            if (addIndex === this.mainTable.length) {
              this.addClick(-1)
            } else {
              const record = {
                ID: 0,
                ROUTE_ID: row.ROUTE_ID,
                PRODUCT_OPERATION_CODE: 0,
                CURRENT_OPERATION_ID: null,
                PREVIOUS_OPERATION_ID: this.mainTable[rowIndex]
                  .CURRENT_OPERATION_ID, // 前一道工序
                NEXT_OPERATION_ID: this.mainTable[addIndex]
                  .CURRENT_OPERATION_ID, // 下一道工序
                REPAIR_OPERATION_ID: null, // 维修工序
                REWORK_OPERATION_ID: null, // 返工工序
                ORDER_NO: addIndex * 10,
                rowIndex: -1
              }
              console.log('插入数据：', record)
              this.$refs.xTable
                .insertAt(record, this.mainTable[rowIndex + 1])
                .then(({ row }) => {
                  this.$refs.xTable.setActiveRow(row)
                  this.mainTable.map((item) => {
                    if (item['ORDER_NO'] >= record.ORDER_NO) {
                      item['ORDER_NO'] += 10
                    }
                  })
                  console.log(this.mainTable)
                })
              this.isSave = false
            }
          }
        })
      } else {
        this.saveClick2((e) => {
          if (e) {
            this.$refs.xTable.validate((valid) => {
              if (valid) {
                const addIndex = rowIndex + 1
                if (addIndex === this.mainTable.length) {
                  this.addClick(-1)
                } else {
                  const record = {
                    ID: 0,
                    ROUTE_ID: row.ROUTE_ID,
                    PRODUCT_OPERATION_CODE: 0,
                    CURRENT_OPERATION_ID: null,
                    PREVIOUS_OPERATION_ID: this.mainTable[rowIndex]
                      .CURRENT_OPERATION_ID, // 前一道工序
                    NEXT_OPERATION_ID: this.mainTable[addIndex]
                      .CURRENT_OPERATION_ID, // 下一道工序
                    REPAIR_OPERATION_ID: null, // 维修工序
                    REWORK_OPERATION_ID: null, // 返工工序
                    ORDER_NO: addIndex * 10,
                    rowIndex: -1
                  }
                  console.log('插入数据：', record)
                  this.$refs.xTable
                    .insertAt(record, this.mainTable[rowIndex + 1])
                    .then(({ row }) => {
                      this.$refs.xTable.setActiveRow(row)
                      this.mainTable.map((item) => {
                        if (item['ORDER_NO'] >= record.ORDER_NO) {
                          item['ORDER_NO'] += 10
                        }
                      })
                      console.log(this.mainTable)
                    })
                  this.isSave = false
                }
              }
            })
          }
        })
      }
    },
    async saveClick2 (backCall) {
      var that = this
      var postdata = this.$refs.xTable.getRecordset()
      if (
        postdata.insertRecords.length ||
        postdata.updateRecords.length ||
        postdata.removeRecords.length
      ) {
        this.$refs.xTable.validate((valid) => {
          if (valid) {
            this.form.InsertRecords = postdata.insertRecords
            this.form.UpdateRecords = postdata.updateRecords
            this.form.RemoveRecords = postdata.removeRecords
            RoutesConfigSaveData(this.form).then(async (res) => {
              if (res.ErrorInfo.Status) {
                this.$message({
                  message: res.ErrorInfo.Message,
                  type: 'error'
                })
              } else if (res.Result === true) {
                await that.getLoadRouteConfig(this.defaulNewRouteId)
                that.isSave = true
                backCall(true)
              }
            })
          }
        })
      }
    },
    // 删除
    removeClick (row) {
      if (!row) return false
      if (this.mainTable.length === 1) {
        this.$message({
          message: this.$t('SfcsRoutes._21'),
          type: 'error'
        })
        return false
      } else {
        var that = this
        this.$confirm(
          this.$t('publics.tips.makeSureDelete'),
          this.$t('publics.tips.tips'),
          {
            confirmButtonText: this.$t('publics.tips.confirm'),
            cancelButtonText: this.$t('publics.tips.cancel'),
            type: 'warning'
          }
        )
          .then(() => {
            if (row.rowIndex === -1) {
              that.isSave = true
            }
            this.form = {}
            this.$refs.xTable.remove(row)
            var postdata = this.$refs.xTable.getRecordset()
            this.form.RemoveRecords = postdata.removeRecords
            var tableData = this.$refs.xTable.getTableData().tableData
            var numBer = 0
            tableData.map((item) => {
              item.ORDER_NO = numBer
              numBer += 10
            })
            this.form.UpdateRecords = tableData
            console.log(tableData)
            RoutesConfigSaveData(this.form).then((res) => {
              if (res.ErrorInfo.Status) {
                this.$message({
                  message: res.ErrorInfo.Message,
                  type: 'error'
                })
              } else if (res.Result === true) {
                that.getLoadRouteConfig(this.defaulNewRouteId)
                that.$notify({
                  title: this.$t('crss._20'),
                  message: this.$t('crss._21'),
                  type: 'success',
                  duration: 2000
                })
                that.isSave = true
              }
            })
            // this.saveClick()
            // that.$notify({
            //   title: this.$t('publics.tips.success'),
            //   message: this.$t('publics.tips.deleteSuccess'),
            //   type: 'success',
            //   duration: 2000
            // })
          })
          .catch(() => {})
      }
    },
    async handleChangeCurrentOperation (row, index) {
      console.log(row, '下标值：', index)
      const previousIndex = index - 1
      const nextIndex = index + 1
      this.checkForm.operationCode = row.CURRENT_OPERATION_ID
      this.checkForm.routeID = row.ROUTE_ID
      const res = await CheckWIPExistedAPI(this.checkForm)
      if (res.Result === true) {
        this.$message({
          message: this.$t('SfcsRoutes._16'),
          type: 'error'
        })
      } else if (res.Result === false) {
        // console.log(this.mainTableCurrentID)
        if (
          this.mainTableCurrentID.indexOf(this.checkForm.operationCode) !==
            -1 &&
          this.checkForm.operationCode !== this.mainTableCurrentID[index]
        ) {
          this.$message({
            message: this.$t('SfcsRoutes._17'),
            type: 'error'
          })
          if (row.rowIndex !== -1) {
            this.mainTable[index].CURRENT_OPERATION_ID = null
          } else {
            row.CURRENT_OPERATION_ID = null
          }
        } else if (
          this.mainTableCurrentID.indexOf(this.checkForm.operationCode) !==
            -1 &&
          row.rowIndex === -1
        ) {
          this.$message({
            message: this.$t('SfcsRoutes._17'),
            type: 'error'
          })
          row.CURRENT_OPERATION_ID = null
        } else {
          if (index === 0 && row.rowIndex !== -2) {
            this.mainTable[nextIndex].PREVIOUS_OPERATION_ID = this.checkForm.operationCode
          } else if (
            index === this.mainTable.length - 1 &&
            row.rowIndex !== -1
          ) {
            this.mainTable[previousIndex].NEXT_OPERATION_ID = this.checkForm.operationCode
          } else if (row.rowIndex === -1) {
            if (
              nextIndex !== this.mainTable.length &&
              index !== this.mainTable.length
            ) {
              this.mainTable[index].PREVIOUS_OPERATION_ID = this.checkForm.operationCode
              this.mainTable[previousIndex].NEXT_OPERATION_ID = this.checkForm.operationCode
            } else if (index === this.mainTable.length) {
              this.mainTable[previousIndex].NEXT_OPERATION_ID = this.checkForm.operationCode
            } else {
              this.mainTable[index].PREVIOUS_OPERATION_ID = this.checkForm.operationCode
              this.mainTable[previousIndex].NEXT_OPERATION_ID = this.checkForm.operationCode
            }
          } else if (row.rowIndex !== -2) {
            this.mainTable[nextIndex].PREVIOUS_OPERATION_ID = this.checkForm.operationCode
            this.mainTable[previousIndex].NEXT_OPERATION_ID = this.checkForm.operationCode
          }
          this.filterReworkBox()
        }
      }
    },
    async handleChangeRepairOperation (row, index) {
      // console.log('维修工序:', row, index)
      this.checkForm.operationCode = row.REPAIR_OPERATION_ID
      this.checkForm.routeID = row.ROUTE_ID
      const res = await CheckWIPExistedAPI(this.checkForm)
      if (res.Result === true) {
        this.$message({
          message: this.$t('SfcsRoutes._18'),
          type: 'error'
        })
        this.mainTable[index].REPAIR_OPERATION_ID = null
      } else if (res.Result === false) {
        if (row.REPAIR_OPERATION_ID === 748) {
          if (row.rowIndex === -1) {
            row.REWORK_OPERATION_ID = 1
          } else {
            this.mainTable[index].REWORK_OPERATION_ID = 1
          }
        }
      }
    },
    async handleChangeReworkOperation (row, index) {
      console.log('返工row', row)
      console.log('返工index:', index)
      this.checkForm.operationCode = row.REWORK_OPERATION_ID
      this.checkForm.routeID = row.ROUTE_ID
      const res = await CheckWIPExistedAPI(this.checkForm)
      if (res.Result === true) {
        this.$message({
          message: this.$t('SfcsRoutes._18'),
          type: 'error'
        })
      } else if (res.Result === false) {
        console.log(this.mainTableCurrentID)
        console.log(this.mainTableCurrentID.indexOf(row.REWORK_OPERATION_ID))
        if (this.mainTableCurrentID.indexOf(row.REWORK_OPERATION_ID) >= index) {
          this.$message({
            message: this.$t('SfcsRoutes._19'),
            type: 'error'
          })
          if (row.rowIndex !== -1) {
            this.mainTable[index].REWORK_OPERATION_ID = null
          } else {
            row.REWORK_OPERATION_ID = null
          }
        } else if (
          row.REPAIR_OPERATION_ID !== 748 &&
          row.REWORK_OPERATION_ID === 1
        ) {
          this.$message({
            message: this.$t('SfcsRoutes._22'),
            type: 'error'
          })
        }
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
        this.$refs.xTable.validate((valid) => {
          if (valid) {
            this.form.InsertRecords = postdata.insertRecords
            this.form.UpdateRecords = postdata.updateRecords
            this.form.RemoveRecords = postdata.removeRecords
            RoutesConfigSaveData(this.form).then((res) => {
              if (res.ErrorInfo.Status) {
                this.$message({
                  message: res.ErrorInfo.Message,
                  type: 'error'
                })
              } else if (res.Result === true) {
                that.getLoadRouteConfig(this.defaulNewRouteId)
                that.$notify({
                  title: this.$t('crss._20'),
                  message: this.$t('crss._21'),
                  type: 'success',
                  duration: 2000
                })
                that.isSave = true
              }
            })
          }
        })
      }
    },
    handleSizeChange (val) {
      this.formData.Limit = val
      this.getLoadData()
    },
    handleCurrentChange (val) {
      this.formData.Page = val
      this.getLoadData()
    },
    // 过滤返工工序数据
    filterReworkBox () {
      this.$nextTick(() => {
        const { fullData } = this.$refs.xTable.getTableData()
        const tmpList = []
        fullData.map((item) => {
          tmpList.push(item.CURRENT_OPERATION_ID)
        })
        const res = this.defaultReworkBox.filter((val) => {
          return tmpList.indexOf(val.ID) !== -1
        })
        this.reworkBox = res
        this.reworkBox.push(this.GetNoSetNoRoute)
      })
    },
    getCollectName (id, originData) {
      let res = ''
      originData = (originData || []).filter((item) => !!item)
      originData.map((item) => {
        if (item.ID === id) {
          res = item.DESCRIPTION
        }
      })
      return res
    },
    cellClick (e) {
      const { $rowIndex } = e
      if (this.currentRowIndex !== $rowIndex) {
        this.currentRowIndex = $rowIndex
      }
      this.currentIndex = $rowIndex
    },
    // 搜索
    searchClick () {
      this.getLoadData()
    },
    // 编辑
    editClick () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
.Programming-list {
  height: calc(100vh - 60px - 40px - 53px - 30px);
  border: 1px solid #cfd7e5;
  padding: 0 10px 10px 10px;
  color: #606266;
  overflow-y: scroll;
}
/*隐藏滚轮*/
::-webkit-scrollbar {
  display: none;
}
.Process-configuration-settings {
  width: 98%;
  margin-left: 20px;
  height: calc(100vh - 60px - 40px - 53px - 30px - 42px);
}
.pagination {
  margin: 10px 0 0 20px;
}
.el-collapse {
  border: 0;
}
.selectedImg {
  width: 30px;
  height: 30px;
  position: absolute;
  right: 5%;
  top: 50%;
}
</style>
<style >
.el-collapse-item__header {
  background-color: #fff;
  padding-left: 10px;
  height: 30px;
  border-bottom: 0;
}
.el-collapse-item__header.is-active {
  background-color: rgb(208, 229, 253);
}
.grr {
  background: green;
}
.el-collapse-item {
  border: 1px solid #cfd7e5;
  margin: 5px 0;
  box-sizing: border-box;
}
.el-collapse-item__content {
  margin-left: 10px;
  padding: 0;
}
.el-collapse-item__wrap {
  border: 0;
}
</style>
