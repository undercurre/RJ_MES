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
          icon="el-icon-plus"
          @click.prevent="addProductProcessClick"
          >{{ $t("SfcsRoutes._32") }}</el-button
        >
        <el-button
          type="primary"
          icon="el-icon-edit"
          @click.prevent="editClick"
          >{{ $t("SfcsRoutes._32a") }}</el-button
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
          v-if="$btnList.indexOf('SfcsRoutesAdd') !== -1"
          >{{ $t("SfcsRoutes._31") }}</el-button
        >
      </custom-container-header>
    </template>
    <el-row>
      <!-- 编程列表（左） -->
      <el-col :span="6">
        <div class="Programming-list">
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
        </div>

        <!-- 分页 -->
        <div class="pagination">
          <el-pagination
            layout="prev, pager, next"
            :total="ProgrammingPage"
            :current-page="currentminiPage"
            :page-size="5"
            @current-change="currentChange"
            @prev-click="prevClick"
            @next-click="nextClick"
          >
          </el-pagination>
        </div>
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
                  @click="removeClick(row, $rowIndex)"
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
    <!-- 编辑 -->
    <el-dialog
      v-dialogDrag
      :visible.sync="editVisible"
      :title="editTitle"
      width="60%"
      :close-on-click-modal="false"
    >
      <el-form ref="editForm" label-width="100px" :model="editForm">
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('SfcsRoutes._2a')">
              <el-input
                v-model="editForm.ROUTE_NAME"
                :placeholder="$t('SfcsRoutes._35')"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('SfcsRoutes._23')">
              <el-select
                @change="changeSomething"
                v-model="editForm.ROUTE_CLASS"
                style="width: 100%"
                :placeholder="$t('SfcsRoutes._27')"
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
                  v-for="item in PlantList"
                  :key="item.LOOKUP_CODE"
                  :value="item.LOOKUP_CODE"
                  :label="item.CHINESE"
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
                    >{{ item.MEANING }}</span
                  >
                  <span
                    style="
                      width: 40%;
                      box-size: border-box;
                      padding-left: 10px;
                      border-left: 1px solid rgb(229, 231, 237);
                    "
                    >{{ item.CHINESE }}</span
                  >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('SfcsRoutes._24')">
              <el-select
                @change="changeSomething2"
                v-model="editForm.ROUTE_TYPE"
                style="width: 100%"
                :placeholder="$t('SfcsRoutes._28')"
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
                  v-for="item in TypeList"
                  :key="item.LOOKUP_CODE"
                  :value="item.LOOKUP_CODE"
                  :label="item.CHINESE"
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
                    >{{ item.MEANING }}</span
                  >
                  <span
                    style="
                      width: 40%;
                      box-size: border-box;
                      padding-left: 10px;
                      border-left: 1px solid rgb(229, 231, 237);
                    "
                    >{{ item.CHINESE }}</span
                  >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('SfcsRoutes._25')">
              <el-input
                v-model="editForm.DESCRIPTION"
                :placeholder="$t('SfcsRoutes._36')"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-col :span="12">
          <el-form-item :label="$t('SfcsRoutes._26')">
            <el-switch
              v-model="editForm.ENABLED"
              :active-text="$t('cdc._19')"
              :inactive-text="$t('cdc._20')"
              active-color="#13ce66"
              inactive-color="#cccccc"
              active-value="Y"
              inactive-value="N"
            />
          </el-form-item>
        </el-col>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">{{
          $t("ssc_rd.cancel")
        }}</el-button>
        <el-button type="primary" @click="submitForm">{{
          $t("ssc_rd.sure")
        }}</el-button>
      </span>
    </el-dialog>
  </d2-container>
</template>

<script>
import pagination from '@/views/mixin/page'
import customContainerHeader from '@/components/custom-container-header'
import {
  Index,
  LoadData,
  SaveData,
  LoadRouteConfig,
  CheckWIPExistedAPI,
  RoutesConfigSaveData,
  RoutesConfigSaveDataOfNew
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
        Limit: 5,
        Key: '',
        ...this.formData
      },
      ProgrammingPage: 0,
      currentminiPage: 1,
      formData2: {
        PART_NO: '', // 料号
        ROUTE_NAME: '', // 制程名称
        ROUTE_CLASS: null, // 厂部
        ROUTE_TYPE: null, // 类型
        DESCRIPTION: '', // 描述
        ENABLED: '', // 是否
        Page: 1,
        Limit: 15,
        Key: ''
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
      // isShow: false,
      defaulNewRouteId: 0,
      GetStartEnd: [], // 开始和结束
      gIndex: 0,
      editVisible: false,
      editTitle: '',
      PlantList: [], // 工厂下拉
      TypeList: [], // 类型下拉
      options: [
        {
          value: 'Y',
          label: this.$t('SfcsRoutes._33')
        },
        {
          value: 'N',
          label: this.$t('SfcsRoutes._34')
        }
      ],
      editForm: {},
      TopInsert: false,
      CURRENT_OPERATION_ID: null,
      REPAIR_OPERATION_ID: null,
      REWORK_OPERATION_ID: null,
      noCheck: false
    }
  },
  created () {
    this.getIndex()
    this.getLoadData()
  },
  watch: {},
  methods: {
    changeSomething (e) {
      this.$forceUpdate()
    },
    changeSomething2 (e) {
      this.$forceUpdate()
    },
    addProductProcessClick () {
      this.editTitle = this.$t('SfcsRoutes._30')
      this.editForm = {}
      this.editForm.ENABLED = 'Y'
      this.editForm.PART_NO = 'COMMON'
      this.editVisible = true
    },
    // 产品制程保存
    submitForm () {
      if (!this.editForm.ROUTE_NAME || this.editForm.ROUTE_NAME === '') {
        return this.$message.error(this.$t('SfcsRoutes._35'))
      }
      let form = {
        InsertRecords: [],
        UpdateRecords: [],
        RemoveRecords: []
      }
      if (this.editTitle === this.$t('SfcsRoutes._30')) {
        form.InsertRecords.push(this.editForm)
      } else {
        form.UpdateRecords.push(this.editForm)
      }
      SaveData(form).then((res) => {
        if (res.Result) {
          this.$notify({
            title: this.$t('crss._20'),
            message: this.$t('crss._21'),
            type: 'success',
            duration: 2000
          })
          this.getLoadData()
          this.editVisible = false
        }
      })
    },
    async AddNew () {
      this.noCheck = true
      if (this.$refs.xTable.getTableData().tableData.length === 0) {
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
      } else {
        await this.saveClick((e) => {
          if (e) {
            if (this.isSave) {
              // this.mainTable[0] = {
              //   ID: this.mainTable[0].ID,
              //   ROUTE_ID: this.defaulNewRouteId,
              //   PRODUCT_OPERATION_CODE: 0,
              //   CURRENT_OPERATION_ID: null,
              //   PREVIOUS_OPERATION_ID: null, // 前一道工序
              //   NEXT_OPERATION_ID: 999, // 下一道工序
              //   REPAIR_OPERATION_ID: 748, // 维修工序
              //   REWORK_OPERATION_ID: 1, // 返工工序
              //   ORDER_NO: 0,
              //   rowIndex: -2
              // }
              const record = {
                ID: 0,
                ROUTE_ID: this.defaulNewRouteId,
                PRODUCT_OPERATION_CODE: 0,
                CURRENT_OPERATION_ID: null,
                PREVIOUS_OPERATION_ID: 100, // 前一道工序
                NEXT_OPERATION_ID: this.$refs.xTable.getTableData().tableData[0]
                  .CURRENT_OPERATION_ID, // 下一道工序
                REPAIR_OPERATION_ID: 748, // 维修工序
                REWORK_OPERATION_ID: 1, // 返工工序
                ORDER_NO: 0,
                rowIndex: -2
              }
              this.$refs.xTable.insertAt(record, null)
              this.TopInsert = true
            }
          }
        })
      }
      // this.isShow = false
    },
    async getIndex (newData) {
      const res = await Index()
      if (res.Result) {
        const data = res.Result
        this.PlantList = data.PlantList
        this.TypeList = data.TypeList
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
    async currentChange (e) {
      this.currentminiPage = e
      const res = await LoadData({ Page: e, Limit: 5 })
      this.ProgrammingData = res.Result ? res.Result : []
      this.ProgrammingPage = res.TotalCount ? res.TotalCount : 0
      Object.values(this.ProgrammingData).map((item) => {
        this.activeNames.push(item.ID)
      })
      this.gIndex = -1
      this.mainTable = []
    },
    async prevClick (e) {
      const res = await LoadData({ Page: e, Limit: 5 })
      this.ProgrammingData = res.Result ? res.Result : []
      this.ProgrammingPage = res.TotalCount ? res.TotalCount : 0
      Object.values(this.ProgrammingData).map((item) => {
        this.activeNames.push(item.ID)
      })
      this.gIndex = -1
      this.mainTable = []
    },
    async nextClick (e) {
      const res = await LoadData({ Page: e, Limit: 5 })
      this.ProgrammingData = res.Result ? res.Result : []
      this.ProgrammingPage = res.TotalCount ? res.TotalCount : 0
      Object.values(this.ProgrammingData).map((item) => {
        this.activeNames.push(item.ID)
      })
      this.gIndex = -1
      this.mainTable = []
    },
    // 获取编程列表（左）
    async getLoadData (num) {
      this.currentminiPage = 1

      if (num === 2) {
        const res = await LoadData(this.formData2)
        this.editForm = res.Result ? res.Result[0] : []
      } else {
        this.ProgrammingData = []
        const res = await LoadData(this.formData)
        this.ProgrammingData = res.Result ? res.Result : []
        this.ProgrammingPage = res.TotalCount ? res.TotalCount : 0

        Object.values(this.ProgrammingData).map((item) => {
          this.activeNames.push(item.ID)
        })
        this.defaulNewRouteId = this.ProgrammingData[0].ID
        this.getLoadRouteConfig()
      }
    },
    // 获取制程配置设定（右）
    async getLoadRouteConfig (ID, index) {
      this.noCheck = false
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
      // this.isShow = this.mainTable.length === 0
      Object.values(data).map((item) => {
        this.mainTableCurrentID.push(item['CURRENT_OPERATION_ID'])
      })
      this.filterReworkBox()
    },
    handleClickCollapse (item, index) {
      this.gIndex = index
      this.isSave = true
      this.defaulNewRouteId = item.ID
      // this.formData2.ROUTE_NAME = item.ROUTE_NAME
      // this.formData2.DESCRIPTION = item.DESCRIPTION
      this.formData2 = item
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
          NEXT_OPERATION_ID: 999, // 下一道工序
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
        this.noCheck = true
      } else {
        this.$message({
          message: this.$t('SfcsRoutes._15'),
          type: 'error'
        })
      }
    },
    // 插入
    rowAddClick (row, rowIndex) {
      this.noCheck = true
      console.log('被点击的row:', row, rowIndex)
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
      // var postdata = this.$refs.xTable.getRecordset()
      // if (
      //   postdata.insertRecords.length ||
      //   postdata.updateRecords.length ||
      //   postdata.removeRecords.length
      // ) {
      this.$refs.xTable.validate((valid) => {
        if (valid) {
          // this.form.InsertRecords = postdata.insertRecords
          // this.form.UpdateRecords = postdata.updateRecords
          // this.form.InsertRecords = postdata.insertRecords
          this.form.InsertRecords = this.$refs.xTable.getTableData().tableData
          // RoutesConfigSaveData(this.form).then(async (res) => {
          RoutesConfigSaveDataOfNew(this.form).then(async (res) => {
            if (res.ErrorInfo.Status) {
              this.$message({
                message: res.ErrorInfo.Message,
                type: 'error'
              })
            } else if (res.Result === true) {
              that.form = {}
              await that.getLoadRouteConfig(this.defaulNewRouteId)
              that.isSave = true
              backCall(true)
            }
          })
        }
      })
      // }
    },
    // 删除
    removeClick (row, index) {
      console.log(row, '删除rowIndex', row.rowIndex)
      this.checkForm.operationCode = row.CURRENT_OPERATION_ID
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
        .then(async () => {
          const res = await CheckWIPExistedAPI(this.checkForm)
          if (!res.Result) {
            if (that.isSave) {
              that.form = {}
              that.$refs.xTable.remove(row)
              var postdata = that.$refs.xTable.getRecordset()
              that.form.RemoveRecords = postdata.removeRecords
              let tableData = that.$refs.xTable.getTableData().tableData
              if (tableData.length > 0) {
                let numBer = 0
                tableData.map((item) => {
                  item.ORDER_NO = numBer
                  numBer += 10
                })
                if (index === 0) {
                  tableData[index].PREVIOUS_OPERATION_ID = 100
                }
                if (index + 1 === that.mainTable.length) {
                  console.log(tableData[index - 1])
                  tableData[index - 1].NEXT_OPERATION_ID = 999
                  tableData[index - 1].REPAIR_OPERATION_ID = 748
                  tableData[index - 1].REWORK_OPERATION_ID = 1
                }
                that.form.UpdateRecords = tableData
              }
              // RoutesConfigSaveData(that.form).then((res) => {
              RoutesConfigSaveDataOfNew(that.form).then((res) => {
                if (res.Result) {
                  that.form = {}
                  that.getLoadRouteConfig(that.defaulNewRouteId)
                  that.$notify({
                    title: that.$t('crss._20'),
                    message: that.$t('crss._21'),
                    type: 'success',
                    duration: 2000
                  })
                  that.isSave = true
                }
              })
            } else {
              that.$refs.xTable.remove(row)
              that.isSave = true
            }
          } else {
            this.$message.error(this.$t('IpqaMst.IpqaMstList.faildelete'))
          }
          // if (row.rowIndex === -1) {
          //   that.isSave = true
          // }
        })
        .catch(() => {})
    },
    async handleChangeCurrentOperation (row, index) {
      // console.log('noCheck', this.noCheck)
      if (this.noCheck) {
        this.checkForm.operationCode = row.CURRENT_OPERATION_ID
      } else {
        this.checkForm.operationCode = this.CURRENT_OPERATION_ID
      }
      console.log(row, '下标值：', index)
      const previousIndex = index - 1
      const nextIndex = index + 1
      // console.log('this.cellData:', this.cellData)
      // const res = !this.noCheck ? await CheckWIPExistedAPI(this.checkForm) : { Result: false }
      const res = await CheckWIPExistedAPI(this.checkForm)
      if (res.Result === true) {
        this.$message({
          message: this.$t('SfcsRoutes._16'),
          type: 'error'
        })
        if (row.rowIndex !== -1) {
          this.mainTable[index].CURRENT_OPERATION_ID = null
        } else {
          row.CURRENT_OPERATION_ID = null
        }
      } else if (res.Result === false) {
        if (
          this.mainTableCurrentID.indexOf(row.CURRENT_OPERATION_ID) !==
            -1 &&
          row.CURRENT_OPERATION_ID !== this.mainTableCurrentID[index]
        ) {
          this.$message({
            message: this.$t('SfcsRoutes._17'),
            type: 'error'
          })
          if (row.rowIndex !== -1) {
            if (this.TopInsert) {
              this.$refs.xTable.getTableData().tableData[0].CURRENT_OPERATION_ID = null
            } else {
              this.mainTable[index].CURRENT_OPERATION_ID = null
            }
          } else {
            row.CURRENT_OPERATION_ID = null
          }
        } else if (
          this.mainTableCurrentID.indexOf(this.checkForm.operationCode) !==
            -1 &&
          row.rowIndex === -1
        ) {
          console.log('1111111')

          this.$message({
            message: this.$t('SfcsRoutes._17'),
            type: 'error'
          })
          row.CURRENT_OPERATION_ID = null
        } else {
          console.log('22222')

          if (index === 0 && row.rowIndex !== -2) {
            console.log('33333')

            this.mainTable[
              nextIndex
            ].PREVIOUS_OPERATION_ID = row.CURRENT_OPERATION_ID
          } else if (
            index === this.mainTable.length - 1 &&
            row.rowIndex !== -1 &&
            !this.TopInsert
          ) {
            console.log('4444')

            this.mainTable[
              previousIndex
            ].NEXT_OPERATION_ID = row.CURRENT_OPERATION_ID
          } else if (row.rowIndex === -1) {
            if (

              nextIndex !== this.mainTable.length &&
              index !== this.mainTable.length
            ) {
              console.log('5555')

              this.mainTable[
                index
              ].PREVIOUS_OPERATION_ID = this.checkForm.operationCode
              this.mainTable[
                previousIndex
              ].NEXT_OPERATION_ID = this.checkForm.operationCode
            } else if (index === this.mainTable.length) {
              this.mainTable[
                previousIndex
              ].NEXT_OPERATION_ID = this.checkForm.operationCode
            } else {
              this.mainTable[
                index
              ].PREVIOUS_OPERATION_ID = this.checkForm.operationCode
              this.mainTable[
                previousIndex
              ].NEXT_OPERATION_ID = this.checkForm.operationCode
            }
          } else if (row.rowIndex !== -2) {
            console.log('666')

            // this.mainTable[
            //   nextIndex
            // ].PREVIOUS_OPERATION_ID = this.checkForm.operationCode
            this.mainTable[
              nextIndex
            ].PREVIOUS_OPERATION_ID = row.CURRENT_OPERATION_ID
            // this.mainTable[
            //   previousIndex
            // ].NEXT_OPERATION_ID = this.checkForm.operationCode
            this.mainTable[
              previousIndex
            ].NEXT_OPERATION_ID = row.CURRENT_OPERATION_ID
          } else if (this.TopInsert) {
            console.log(this.mainTable)
            console.log(
              'this.$refs.xTable.getTableData():',
              this.$refs.xTable.getTableData().tableData
            )
            this.mainTable[
              index
            ].PREVIOUS_OPERATION_ID = this.$refs.xTable.getTableData().tableData[0].CURRENT_OPERATION_ID
            console.log(
              this.mainTable[index].PREVIOUS_OPERATION_ID,
              this.$refs.xTable.getTableData().tableData[0].CURRENT_OPERATION_ID
            )
            this.$forceUpdate()
          }
          this.filterReworkBox()
        }
      }
    },
    async handleChangeRepairOperation (row, index) {
      if (this.noCheck) {
        this.checkForm.operationCode = row.REPAIR_OPERATION_ID
      } else {
        this.checkForm.operationCode = this.REPAIR_OPERATION_ID
      }
      // this.checkForm.routeID = this.cellData.ROUTE_ID
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
      if (this.noCheck) {
        this.checkForm.operationCode = row.REWORK_OPERATION_ID
      } else {
        this.checkForm.operationCode = this.REWORK_OPERATION_ID
      }
      // this.checkForm.routeID = this.cellData.ROUTE_ID
      const res = await CheckWIPExistedAPI(this.checkForm)
      if (res.Result === true) {
        this.$message({
          message: this.$t('SfcsRoutes._18'),
          type: 'error'
        })
      } else if (res.Result === false) {
        console.log(this.mainTableCurrentID)
        console.log(this.mainTableCurrentID.indexOf(row.REWORK_OPERATION_ID))
        if (this.mainTableCurrentID.indexOf(row.REWORK_OPERATION_ID) > index) {
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
    async saveClick (backcall) {
      var that = this
      var postdata = this.$refs.xTable.getRecordset()
      if (
        postdata.insertRecords.length ||
        postdata.updateRecords.length ||
        postdata.removeRecords.length
      ) {
        this.$refs.xTable.validate((valid) => {
          if (valid) {
            // this.form.InsertRecords = postdata.insertRecords
            // this.form.UpdateRecords = postdata.updateRecords
            // this.form.RemoveRecords = postdata.removeRecords
            this.form.InsertRecords = this.$refs.xTable.getTableData().tableData
            if (this.TopInsert) {
              this.form.UpdateRecords = this.mainTable
              this.form.UpdateRecords.map((item) => {
                item.ORDER_NO += 10
              })
              this.isSave = false
            }
            console.log(JSON.stringify(this.form))
            // RoutesConfigSaveData(this.form).then((res) => {
            RoutesConfigSaveDataOfNew(this.form).then((res) => {
              if (res.Result === true) {
                that.form = {}
                that.getLoadRouteConfig(this.defaulNewRouteId)
                that.$notify({
                  title: this.$t('crss._20'),
                  message: this.$t('crss._21'),
                  type: 'success',
                  duration: 2000
                })
                that.isSave = true
                that.TopInsert = false
                backcall(true)
              } else {
                that.isSave = false
              }
              that.TopInsert = false
            })
          } else {
            this.isSave = false
          }
        })
      } else {
        if (
          this.$refs.xTable.getTableData().tableData.length ===
          this.mainTable.length
        ) {
          console.log('222')
          this.isSave = true
          backcall(true)
        } else {
          console.log('3333')
          this.isSave = false
        }
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
    getCollectName2 (id, originData) {
      let res = ''
      originData.map((item) => {
        if (item.LOOKUP_CODE === id) {
          res = item.CHINESE
        }
      })
      return res
    },
    cellClick (e) {
      const { $rowIndex } = e
      this.CURRENT_OPERATION_ID = e.row.CURRENT_OPERATION_ID
      this.REPAIR_OPERATION_ID = e.row.REPAIR_OPERATION_ID
      this.REWORK_OPERATION_ID = e.row.REWORK_OPERATION_ID
      if (this.currentRowIndex !== $rowIndex) {
        this.currentRowIndex = $rowIndex
      }
      this.currentIndex = $rowIndex
      console.log('e.row.CURRENT_OPERATION_ID', e.row.CURRENT_OPERATION_ID)
      this.checkForm.routeID = e.row.ROUTE_ID
    },
    // 搜索
    searchClick () {
      this.getLoadData()
      this.gIndex = 0
      this.isSave = true
      this.CURRENT_OPERATION_ID = null
      this.REPAIR_OPERATION_ID = null
      this.REWORK_OPERATION_ID = null
    },
    // 编辑
    editClick () {
      if (this.gIndex === -1) {
        return this.$message.error('请选择产品制程')
      }
      this.formData2.Page = 1
      this.formData2.Limit = 1
      this.getLoadData(2)
      this.editTitle = this.$t('sql._7')
      this.editVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.Programming-list {
  height: calc(100vh - 60px - 40px - 53px - 30px - 52px);
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
