<template>
  <custom-container>
    <!-- 头部 -->
    <template slot="header">
      <custom-container-header
        :isExport="false"
        :isExportTpl="false"
        :isImport="false"
      >
        <el-input
          v-model="formData.PART_NO"
          :placeholder="$t('SfcsProductSample._1')"
          clearable
          style="width: 200px"
          @keyup.enter.native="searchClick"
        />&nbsp;
        <el-button
          type="primary"
          icon="el-icon-search"
          @click.prevent="searchClick"
          >{{ $t("publics.btn.search") }}</el-button
        >&nbsp;
        <el-button
          type="danger"
          icon="el-icon-delete"
          @click.prevent="cleanClick()"
          >{{ $t("SfcsProductSample._24") }}</el-button
        >
        <el-button
          v-if="$btnList.indexOf('SfcsProductSampleSave') !== -1"
          type="success"
          icon="el-icon-check"
          @click.prevent="saveClick"
          >{{ $t("publics.btn.save") }}</el-button
        >&nbsp;
      </custom-container-header>
    </template>
    <!-- 表单 -->
    <div class="SfcsProductSampleHeader">
      <el-form label-width="220px">
        <el-row>
          <el-col :span="23">
            <el-form-item :label="$t('SfcsProductSample._2')">
              <el-input v-model="newform.PART_NO" :disabled="PART_NODisabled" />
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <el-button
              icon="el-icon-more"
              @click="addClick"
              style="width: 100%"
            />
          </el-col>
        </el-row>
        <el-form-item :label="$t('SfcsProductSample._3')">
          <el-select
            v-model="newform.ROUTE_NAME"
            style="width: 100%"
            :disabled="newDisabled"
            @change="changeROUTE_NAME"
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
                >{{ $t("SfcsProductSample._4") }}</span
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
                >{{ $t("SfcsProductSample._5") }}</span
              >
            </div>
            <el-option
              style="width: 100%; display: flex"
              v-for="item in RouteList"
              :key="item.ID"
              :value="item.ID"
              :label="item.ROUTE_NAME"
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
                >{{ item.ROUTE_NAME }}</span
              >
              <span
                style="
                  width: 40%;
                  box-size: border-box;
                  padding-left: 10px;
                  border-left: 1px solid rgb(229, 231, 237);
                "
                >{{ item.ENABLED }}</span
              >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('SfcsProductSample._6')">
          <el-select
            :disabled="newDisabled"
            v-model="newform.SAMPLE_MODE"
            style="width: 100%"
            :placeholder="$t('SfcsProductSample._7')"
            @change="change"
          >
            <el-option
              v-for="item in SampleModeList"
              :key="item.LOOKUP_CODE"
              :label="item.CHINESE"
              :value="item.LOOKUP_CODE"
            />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('SfcsProductSample._8')">
          <el-select
            v-model="newform.PROJECT_ID"
            style="width: 100%"
            :placeholder="$t('SfcsProductSample._9')"
            :disabled="spotCheckDisabled"
            @change="changePROJECT_ID"
          >
            <el-option
              v-for="item in ProjectNameList"
              :key="item.ID"
              :label="item.PROJECT_NAME"
              :value="item.ID"
            />
          </el-select>
        </el-form-item>
        <el-row>
          <!-- 左 -->
          <el-col :span="12">
            <el-form-item :label="$t('SfcsProductSample._10')">
              <el-select
                @change="changeSamplingProcess"
                v-model="newform.DELIVER_OPERATION_CODE"
                style="width: 100%"
                :disabled="newDisabled"
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
                    >{{ $t("SfcsProductSample._11") }}</span
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
                    >{{ $t("SfcsProductSample._12") }}</span
                  >
                </div>
                <el-option
                  style="width: 100%; display: flex"
                  v-for="item in markList"
                  :key="item.PRODUCT_OPERATION_CODE"
                  :value="item.PRODUCT_OPERATION_CODE"
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
            </el-form-item>
          </el-col>
          <!-- 右 -->
          <el-col :span="12">
            <el-form-item :label="$t('SfcsProductSample._13')">
              <el-select
                :disabled="disabled"
                v-model="newform.SAMPLE_OPERATION_CODE"
                style="width: 100%"
                :placeholder="$t('SfcsProductSample._14')"
              >
                <el-option
                  v-for="item in markList2"
                  :key="item.PRODUCT_OPERATION_CODE"
                  :value="item.PRODUCT_OPERATION_CODE"
                  :label="item.DESCRIPTION"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item :label="$t('SfcsProductSample._15')">
          <el-select
            :disabled="newDisabled"
            v-model="newform.MUST_SIGN_WITH_FAIL"
            style="width: 100%"
            :placeholder="$t('SfcsProductSample._16')"
            @change="changeROUTE_NAME"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('SfcsProductSample._17')">
          <el-select
            :disabled="spotCheckDisabled"
            v-model="newform.CURRENT_SAMPLE_RATIO"
            style="width: 100%"
            :placeholder="$t('SfcsProductSample._18')"
            @change="changeSampleList"
          >
            <el-option
              v-for="item in SampleList"
              :key="item.SAMPLE_RATIO"
              :label="`${item.SAMPLE_COUNT}:${item.SAMPLE_RATIO_COUNT}`"
              :value="item.SAMPLE_RATIO"
            />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('SfcsProductSample._19')">
          <el-input
            type="number"
            v-model="newform.SAMPLE_OPERATION_COUNT"
            :disabled="newDisabled"
            min=1
          />
        </el-form-item>
        <el-form-item :label="$t('SfcsProductSample._5')">
          <el-select
            v-model="newform.ENABLED"
            style="width: 100%"
            :placeholder="$t('SfcsProductSample._20')"
            :disabled="newDisabled"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <!-- 查询结果表格 -->
    <div class="SfcsProductSampleFoot">
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
        :mouse-config="{ selected: true }"
        :edit-config="{ trigger: 'click', mode: 'row', showStatus: true }"
        :radio-config="{ labelField: 'name', trigger: 'row' }"
        :checkbox-config="{ checkField: 'checked', trigger: 'row' }"
        @cell-click="cellClick"
      >
        <vxe-table-column
          field="PART_NO"
          :title="$t('SfcsProductSample._2')"
          width="100"
        />
        <vxe-table-column
          field="ROUTE_NAME"
          :title="$t('SfcsProductSample._4')"
          width="130"
        />
        <vxe-table-column
          width="150"
          field="SAMPLE_MODE"
          :title="$t('SfcsProductSample._6')"
          :edit-render="{
            name: '$select',
            options: showSampleMode,
            props: { disabled: true },
          }"
        />
        <vxe-table-column
          width="160"
          field="PROJECT_ID"
          :title="$t('SfcsProductSample._8')"
          :edit-render="{
            name: '$select',
            options: showProjectName,
            props: { disabled: true },
          }"
        />
        <vxe-table-column
          width="160"
          field="DELIVER_OPERATION_CODE"
          :title="$t('SfcsProductSample._10')"
          :edit-render="{
            name: '$select',
            options: showMarkList,
            props: { disabled: true },
          }"
        />
        <vxe-table-column
          width="160"
          field="SAMPLE_OPERATION_CODE"
          :title="$t('SfcsProductSample._13')"
          :edit-render="{
            name: '$select',
            options: showMarkList,
            props: { disabled: true },
          }"
        />
        <vxe-table-column
          min-width="190"
          field="CURRENT_SAMPLE_RATIO"
          :title="$t('SfcsProductSample._21')"
          :edit-render="{
            name: '$select',
            options: showSample,
            props: { disabled: true },
          }"
        />
        <vxe-table-column
          min-width="180"
          field="SAMPLE_OPERATION_COUNT"
          :title="$t('SfcsProductSample._22')"
        />
        <vxe-table-column
          min-width="280"
          field="MUST_SIGN_WITH_FAIL"
          :title="$t('SfcsProductSample._23')"
        >
          <template slot-scope="scope">
            <el-switch
              :disabled="disabled"
              v-model="scope.row.MUST_SIGN_WITH_FAIL"
              :active-text="$t('cccn._9')"
              :inactive-text="$t('cccn._10')"
              active-color="#13ce66"
              inactive-color="#cccccc"
              active-value="Y"
              inactive-value="N"
            />
          </template>
        </vxe-table-column>
        <vxe-table-column
          min-width="100"
          field="ENABLED"
          :title="$t('SfcsProductSample._5')"
        >
          <template slot-scope="scope">
            <el-switch
              :disabled="disabled"
              v-model="scope.row.ENABLED"
              :active-text="$t('cccn._9')"
              :inactive-text="$t('cccn._10')"
              active-color="#13ce66"
              inactive-color="#cccccc"
              active-value="Y"
              inactive-value="N"
            />
          </template>
        </vxe-table-column>
      </vxe-table>
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
    </div>
    <!-- 新增 -->
    <el-dialog
      :close-on-click-modal="false"
      v-dialogDrag
      :title="$t('SfcsProductSample._27')"
      :visible.sync="dialogTableVisible"
    >
      <div class="dialog-head">
        <el-input
          v-model="addformData.PART_NO"
          :placeholder="$t('SfcsProductSample._1')"
          clearable
          style="width: 220px"
          @keyup.enter.native="search_but"
        />&nbsp;
        <el-button
          type="primary"
          icon="el-icon-search"
          @click.prevent="search_but"
          >{{ $t("IpqaMst.AddOrModify.search") }}</el-button
        >
        <el-button type="primary"
                   @click="submitModifyForm">{{$t('ssc_rd.sure')}}</el-button>
      </div>
      <div class="addForm">
        <vxe-table
          ref="_xTable"
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
          :data="addTable"
          :mouse-config="{ selected: true }"
          :edit-config="{ trigger: 'click', mode: 'row', showStatus: true }"
          :radio-config="{ labelField: 'name', trigger: 'row' }"
          :checkbox-config="{ checkField: 'checked', trigger: 'row' }"
          @cell-dblclick="cellDblclick"
          @cell-click="ceClick"
        >
          <vxe-table-column type="radio" :title="''" min-width="30"/>
          <vxe-table-column
            field="PART_NO"
            :title="$t('SfcsProductSample._2')"
            min-width="100"
          />
          <vxe-table-column
            field="DESCRIPTION"
            :title="$t('SfcsProductSample._12')"
            min-width="100"
          />
          <vxe-table-column
            field="FAMILY_NAME"
            :title="$t('SfcsProductSample._25')"
            min-width="100"
          />
          <vxe-table-column
            field="MODEL"
            :title="$t('SfcsProductSample._26')"
            min-width="100"
          />
        </vxe-table>
      </div>
      <div class="pagination">
        <el-pagination
          :current-page="addformData.Page"
          :page-size="addformData.Limit"
          :page-sizes="[15, 25, 35, 45]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="addtotalPage"
          @size-change="addhandleSizeChange"
          @current-change="addhandleCurrentChange"
        />
      </div>
    </el-dialog>
  </custom-container>
</template>
<script>
import customContainer from '@/components/custom-container'
import customContainerHeader from '@/components/custom-container-header'
import {
  PartNoLoadData,
  Index,
  LoadData,
  GetOperationList,
  SaveData,
  LoadSampleProjectConfigData
} from '@/api/SfcsProductSample'
export default {
  name: 'SfcsProductSample',
  components: {
    customContainer,
    customContainerHeader
  },
  data () {
    return {
      formData: {
        PART_NO: '',
        Page: 1,
        Limit: 15,
        ...this.formData
      },
      loading: false,
      mainTable: [],
      disabled: true,
      totalPage: 0,
      newform: { SAMPLE_OPERATION_COUNT: 1 },
      RouteList: [], // 制程名称
      SampleModeList: [], // 抽检模式
      showSampleMode: [],
      ProjectNameList: [], // 抽检方案
      showProjectName: [],
      markList: [], // 标记工序
      markList2: [],
      showMarkList: [],
      options: [
        {
          value: 'Y',
          label: 'Y'
        },
        {
          value: 'N',
          label: 'N'
        }
      ],
      SampleList: [], // 抽检比例
      showSample: [],
      newDisabled: true,
      spotCheckDisabled: true,
      PART_NODisabled: true,
      dialogTableVisible: false,
      addformData: {
        PART_NO: ''
      },
      addTable: [],
      addtotalPage: 0,
      Updateform: {
        UpdateRecords: [
          {
            ID: null,
            PART_NO: null,
            SAMPLE_MODE: null,
            PROJECT_ID: null,
            DELIVER_OPERATION_CODE: null,
            SAMPLE_OPERATION_CODE: null,
            CURRENT_SAMPLE_RATIO: null,
            SAMPLE_OPERATION_COUNT: null,
            DELIVER_COUNT: null,
            SAMPLE_PASS_COUNT: null,
            SAMPLE_FAIL_COUNT: null,
            ENABLED: null,
            MUST_SIGN_WITH_FAIL: null
          }
        ]
      },
      insertform: {
        InsertRecords: [
          {
            ID: 0,
            PART_NO: '',
            SAMPLE_MODE: 0,
            PROJECT_ID: 0,
            DELIVER_OPERATION_CODE: 0,
            SAMPLE_OPERATION_CODE: 0,
            CURRENT_SAMPLE_RATIO: 0,
            SAMPLE_OPERATION_COUNT: 0,
            DELIVER_COUNT: 0,
            SAMPLE_PASS_COUNT: 0,
            SAMPLE_FAIL_COUNT: 0,
            ENABLED: '',
            MUST_SIGN_WITH_FAIL: ''
          }
        ]
      },
      uploadStatus: null
    }
  },
  created () {
    this.getIndex()
    this.getPartNo()
  },
  methods: {
    // 获取料号
    async getPartNo () {
      const res = await PartNoLoadData(this.addformData)
      if (res.Result) {
        this.addTable = res.Result
        this.addtotalPage = res.TotalCount
      }
      console.log('==============', this.addTable)
    },
    async getIndex () {
      const res = await Index()
      if (res.Result) {
        const data = res.Result
        this.RouteList = data.RouteList
        this.SampleModeList = data.SampleModeList
        data['SampleModeList'].map((item) => {
          this.showSampleMode.push({
            value: item.LOOKUP_CODE,
            label: item.CHINESE
          })
        })
        this.ProjectNameList = data.ProjectNameList
        data['ProjectNameList'].map((item) => {
          this.showProjectName.push({
            value: item.ID,
            label: item.PROJECT_NAME
          })
        })
        // this.SampleList = data.SampleList
        data['SampleList'].map((item) => {
          this.showSample.push({
            value: item.LOOKUP_CODE,
            label: item.MEANING
          })
        })
      }
      console.log(res.Result)
    },
    async getLoadData () {
      if (this.formData.PART_NO === '') return false
      const res = await LoadData(this.formData)
      this.mainTable = res.Result ? res.Result : []
      this.totalPage = res.Result ? res.TotalCount : 0
    },
    // 获取标记工序
    async getOperationList (ID) {
      const res = await GetOperationList({ ROUTE_ID: ID })
      if (res.Result) {
        const data = res.Result
        this.markList = data
        this.markList2 = data
        Object.values(data).map((item) => {
          this.showMarkList.push({
            value: item.PRODUCT_OPERATION_CODE,
            label: item.DESCRIPTION
          })
        })
      }
    },
    // 查询
    searchClick () {
      this.formData.Page = 1
      this.getLoadData()
    },
    handleSizeChange (val) {
      this.formData.Limit = val
      this.getLoadData()
    },
    handleCurrentChange (val) {
      this.formData.Page = val
      this.getLoadData()
    },
    addhandleSizeChange (val) {
      this.addformData.Limit = val
      this.getPartNo()
    },
    addhandleCurrentChange (val) {
      this.addformData.Page = val
      this.getPartNo()
    },
    cellClick (e) {
      console.log('点击此行表格数据：', e)
      this.newDisabled = false
      const rowData = e.row
      if (rowData.SAMPLE_MODE === 2) {
        this.spotCheckDisabled = true
      } else {
        this.spotCheckDisabled = false
      }
      this.getOperationList(rowData.ROUTE_ID)
      this.newform = { ...rowData }
      this.uploadStatus = 'update'
    },
    // 清空
    cleanClick () {
      this.formData.PART_NO = ''
      this.newform = {}
      this.newform.SAMPLE_OPERATION_COUNT = 1
      this.newDisabled = true
      this.getLoadData()
      this.mainTable = []
    },
    change (e) {
      if (e === 2) {
        this.spotCheckDisabled = true
        this.newform.PROJECT_ID = null
        this.newform.CURRENT_SAMPLE_RATIO = null
      } else if (e === 1) {
        this.spotCheckDisabled = false
      }
      this.$forceUpdate()
    },
    changeSamplingProcess (e) {
      const newArray = []
      this.markList.map((item) => {
        newArray.push(item['PRODUCT_OPERATION_CODE'])
      })
      if (newArray.indexOf(e) === newArray.length - 1) {
        this.$message({
          message:
            this.$t('SfcsProductSample._28'),
          type: 'error'
        })
      } else {
        this.newform.SAMPLE_OPERATION_CODE = newArray[newArray.indexOf(e) + 1]
      }
    },
    addClick () {
      this.dialogTableVisible = true
    },
    // 新增搜索
    search_but () {
      this.addformData.Page = 1
      this.getPartNo()
    },
    submitModifyForm () {
      this.dialogTableVisible = false
    },
    ceClick (e) {
      const rowData = e.row
      this.newform.PART_NO = rowData.PART_NO
      this.newform.ROUTE_NAME = ''
      this.newform.MUST_SIGN_WITH_FAIL = 'N'
      this.newform.ENABLED = 'Y'
      this.newDisabled = false
      this.uploadStatus = 'insert'
    },
    // 双击
    cellDblclick (e) {
      this.dialogTableVisible = false
      const rowData = e.row
      this.newform.PART_NO = rowData.PART_NO
      this.newform.ROUTE_NAME = 64203
      this.newform.MUST_SIGN_WITH_FAIL = 'N'
      this.newform.ENABLED = 'Y'
      this.newDisabled = false
      this.uploadStatus = 'insert'
      this.getOperationList(64203)
    },
    changeROUTE_NAME (e) {
      if (e) {
        this.getOperationList(this.newform.ROUTE_NAME)
        this.$forceUpdate()
      }
    },
    async changePROJECT_ID (e) {
      const res = await LoadSampleProjectConfigData({ PROJECT_ID: e })
      this.SampleList = res.Result ? res.Result : []
    },
    changeSampleList (e) {
      if (e) {
        this.$forceUpdate()
      }
    },
    // 保存
    saveClick () {
      if (this.uploadStatus === 'update') {
        this.Updateform.UpdateRecords[0].ID = this.newform.ID
        this.Updateform.UpdateRecords[0].PART_NO = this.newform.PART_NO
        this.Updateform.UpdateRecords[0].SAMPLE_MODE = this.newform.SAMPLE_MODE
        this.Updateform.UpdateRecords[0].PROJECT_ID = this.newform.PROJECT_ID
        this.Updateform.UpdateRecords[0].DELIVER_OPERATION_CODE = this.newform.DELIVER_OPERATION_CODE
        this.Updateform.UpdateRecords[0].SAMPLE_OPERATION_CODE = this.newform.SAMPLE_OPERATION_CODE
        this.Updateform.UpdateRecords[0].CURRENT_SAMPLE_RATIO = this.newform.CURRENT_SAMPLE_RATIO
        this.Updateform.UpdateRecords[0].SAMPLE_OPERATION_COUNT = this.newform.SAMPLE_OPERATION_COUNT
        this.Updateform.UpdateRecords[0].DELIVER_COUNT = this.newform.DELIVER_COUNT
        this.Updateform.UpdateRecords[0].SAMPLE_PASS_COUNT = this.newform.SAMPLE_PASS_COUNT
        this.Updateform.UpdateRecords[0].ENABLED = this.newform.ENABLED
        this.Updateform.UpdateRecords[0].MUST_SIGN_WITH_FAIL = this.newform.MUST_SIGN_WITH_FAIL
        SaveData(this.Updateform).then((res) => {
          if (res.Result) {
            this.$notify({
              title: this.$t('spdu._18'),
              message: this.$t('spdu._19'),
              type: 'success',
              duration: 2000
            })
            this.mainTable = []
            this.getLoadData()
          } else {
            this.$message({
              message: res.ErrorInfo.Message,
              type: 'error'
            })
          }
        })
      } else if (this.uploadStatus === 'insert') {
        this.insertform.InsertRecords[0].PART_NO = this.newform.PART_NO
        this.insertform.InsertRecords[0].SAMPLE_MODE = this.newform.SAMPLE_MODE
        this.insertform.InsertRecords[0].PROJECT_ID = this.newform.PROJECT_ID
        this.insertform.InsertRecords[0].DELIVER_OPERATION_CODE = this.newform.DELIVER_OPERATION_CODE
        this.insertform.InsertRecords[0].SAMPLE_OPERATION_CODE = this.newform.SAMPLE_OPERATION_CODE
        this.insertform.InsertRecords[0].CURRENT_SAMPLE_RATIO = this.newform.CURRENT_SAMPLE_RATIO
        this.insertform.InsertRecords[0].SAMPLE_OPERATION_COUNT = this.newform.SAMPLE_OPERATION_COUNT
        this.insertform.InsertRecords[0].DELIVER_COUNT = this.newform.DELIVER_COUNT
        this.insertform.InsertRecords[0].SAMPLE_PASS_COUNT = this.newform.SAMPLE_PASS_COUNT
        this.insertform.InsertRecords[0].ENABLED = this.newform.ENABLED
        this.insertform.InsertRecords[0].MUST_SIGN_WITH_FAIL = this.newform.MUST_SIGN_WITH_FAIL
        SaveData(this.insertform).then((res) => {
          if (res.Result) {
            this.$notify({
              title: this.$t('spdu._18'),
              message: this.$t('spdu._19'),
              type: 'success',
              duration: 2000
            })
            this.mainTable = []
            this.getLoadData()
          } else {
            this.$message({
              message: res.ErrorInfo.Message,
              type: 'error'
            })
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.SfcsProductSampleHeader {
  height: calc(100vh - 300px);
  border: 1px solid #cfd7e5;
  margin-bottom: 10px;
  box-sizing: border-box;
  padding: 10px 5px 0;
}
.SfcsProductSampleFoot {
  height: calc(100vh - 550px);
}
.pagination {
  margin-top: 10px;
}
.addForm {
  height: calc(100vh - 400px);
  margin-top: 10px;
}
</style>
