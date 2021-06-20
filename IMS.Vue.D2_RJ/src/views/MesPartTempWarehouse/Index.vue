<template>
  <d2-container>
    <!-- 头部 -->
    <template slot="header">
      <custom-container-header :isExport="false" :isExportTpl="false" :isImport="false">
        <el-select
          clearable
          style="width:200px"
          v-model="formData.PART_TYPE"
          :placeholder="$t('MesPartTempWarehouse._1')"
        >
          <el-option
            v-for="item in materialsList"
            :key="item.LOOKUP_CODE"
            :label="item.DESCRIPTION"
            :value="item.LOOKUP_CODE"
          />
        </el-select>
        <el-input
          clearable
          v-model="formData.PART_NO"
          :placeholder="$t('MesPartTempWarehouse._2')"
          style="width:200px"
          @keyup.enter.native="searchClick"
        />&nbsp;
        <el-select
          clearable
          style="width:200px"
          v-model="formData.ENABLED"
          :placeholder="$t('MesPartTempWarehouse._3')"
        >
          <el-option
            v-for="item in startUpList"
            :key="item.ID"
            :label="item.NAME"
            :value="item.ID"
          />
        </el-select>
        <el-checkbox
          v-model="formData.IsInventory"
          checked
          style="margin-right:10px"
        >{{$t('MesPartTempWarehouse._4')}}</el-checkbox>
        <el-button
          type="primary"
          icon="el-icon-search"
          @click.prevent="searchClick"
        >{{$t('publics.btn.search')}}</el-button>&nbsp;
        <el-button
          type="success"
          icon="el-icon-date"
          @click.prevent="WarehousingClick"
        >{{$t('MesPartTempWarehouse._5')}}</el-button>&nbsp;
        <el-button
          type="warning"
          icon="el-icon-share"
          @click.prevent="OutClick"
        >{{$t('MesPartTempWarehouse._6')}}</el-button>&nbsp;
      </custom-container-header>
    </template>
    <div class="MesPartTempWarehouseTable-container">
      <vxe-table
        ref="xTable"
        border
        resizable
        height="100%"
        size="medium"
        align="center"
        highlight-hover-row
        highlight-current-row
        show-overflow
        auto-resize
        keep-source
        stripe
        :loading="loading"
        :data="mainTable"
        :mouse-config="{selected: true}"
        :radio-config="{labelField: 'name', trigger: 'row'}"
        :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
        @cell-click="cellClick"
      >
        <vxe-table-column
          show-overflow
          :title="$t('ukas._27')"
          type="radio"
          min-width="80"
          align="center"
          fixed="left"
        />
        <vxe-table-column min-width="80" :title="$t('se_cc.sn')" fixed="left">
          <template v-slot="{$rowIndex}">{{$rowIndex +1}}</template>
        </vxe-table-column>
        <vxe-table-column
          min-width="150"
          field="PART_TYPE_NAME"
          :title="$t('MesPartTempWarehouse._7')"
          :edit-render="{name: '$input', props: {readonly: true}}"
        />
        <vxe-table-column
          min-width="150"
          field="PART_NO"
          :title="$t('MesPartTempWarehouse._8')"
          :edit-render="{name: '$input', props: {readonly: true}}"
        />
        <vxe-table-column
          min-width="150"
          field="PART_NAME"
          :title="$t('MesPartTempWarehouse._9')"
          :edit-render="{name: '$input', props: {readonly: true}}"
        />
        <vxe-table-column
          min-width="200"
          field="PART_DESC"
          :title="$t('MesPartTempWarehouse._10')"
          :edit-render="{name: '$input', props: {readonly: true}}"
        />
        <vxe-table-column
          min-width="80"
          field="UNIT"
          :title="$t('MesPartTempWarehouse._11')"
          :edit-render="{name: '$input', props: {readonly: true}}"
        />
        <vxe-table-column
          min-width="100"
          field="QTY"
          :title="$t('MesPartTempWarehouse._12')"
          :edit-render="{name: '$input', props: {readonly: true}}"
        />
        <vxe-table-column
          field="ENABLED"
          fixed="right"
          min-width="120"
          :title="$t('MesPartTempWarehouse._13')"
        >
          <template v-slot="{ row }">
            <el-switch
              v-model="row.ENABLED"
              :active-text="$t('publics.btn.yes')"
              :inactive-text="$t('publics.btn.no')"
              active-color="#13ce66"
              inactive-color="#cccccc"
              active-value="Y"
              inactive-value="N"
              @change="changeENABLED(row)"
            />
          </template>
        </vxe-table-column>
        <vxe-table-column
          min-width="150"
          field="CREATE_USER"
          :title="$t('MesPartTempWarehouse._14')"
          :edit-render="{name: '$input', props: {readonly: true}}"
        />
        <vxe-table-column
          min-width="150"
          field="CREATE_TIME"
          :title="$t('MesPartTempWarehouse._15')"
          :edit-render="{name: '$input', props: {readonly: true}}"
        />
      </vxe-table>
    </div>
    <!-- 分页 -->
    <div class="MesPartTempWarehouse-pagination">
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
    <el-tabs type="card" class="MesPartTempWarehouse-tab">
      <el-tab-pane :label="$t('MesPartTempWarehouse._16')">
        <div class="bottomTable">
          <vxe-table
            ref="LBTable"
            border
            resizable
            height="100%"
            size="medium"
            align="center"
            highlight-hover-row
            highlight-current-row
            show-overflow
            auto-resize
            keep-source
            stripe
            :loading="loading2"
            :data="mainTable2"
            :mouse-config="{selected: true}"
            :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
          >
            <vxe-table-column min-width="80" :title="$t('se_cc.sn')" fixed="left">
              <template v-slot="{$rowIndex}">{{$rowIndex +1}}</template>
            </vxe-table-column>
            <vxe-table-column
              min-width="150"
              field="REEL_ID"
              :title="$t('MesPartTempWarehouse._17')"
              :edit-render="{name: '$input', props: {readonly: true}}"
            />
            <vxe-table-column
              min-width="150"
              field="TOTAL_QTY"
              :title="$t('MesPartTempWarehouse._18')"
              :edit-render="{name: '$input', props: {readonly: true}}"
            />
            <vxe-table-column
              min-width="150"
              field="USE_QTY"
              :title="$t('MesPartTempWarehouse._19')"
              :edit-render="{name: '$input', props: {readonly: true}}"
            />
            <vxe-table-column
              min-width="160"
              field="USABLE_QTY"
              :title="$t('MesPartTempWarehouse._20')"
              :edit-render="{name: '$input', props: {readonly: true}}"
            />
            <vxe-table-column
              min-width="150"
              field="STATUS"
              :title="$t('MesPartTempWarehouse._21')"
              :edit-render="{autofocus: '.custom-input', type: 'visible', props: {readonly: true}}"
            >
              <template v-slot:edit="{ row }">
                <span v-if="row.STATUS === 1" class="green-txt">{{$t('MesPartTempWarehouse._22')}}</span>
                <span
                  v-else-if="row.STATUS === 2"
                  style="color:orange"
                >{{$t('MesPartTempWarehouse._23')}}</span>
                <span
                  v-else-if="row.STATUS === 3"
                  class="red-txt"
                >{{$t('MesPartTempWarehouse._24')}}</span>
              </template>
            </vxe-table-column>
            <vxe-table-column
              min-width="150"
              field="DATE_CODE"
              :title="$t('MesPartTempWarehouse._25')"
              :edit-render="{name: '$input', props: {readonly: true}}"
            >
              <template slot-scope="scope">{{scope.row.DATE_CODE.split(' ')[0]}}</template>
            </vxe-table-column>
            <vxe-table-column
              min-width="150"
              field="EXP_DATE"
              :title="$t('MesPartTempWarehouse._26')"
              :edit-render="{name: '$input', props: {readonly: true}}"
            >
              <template slot-scope="scope">
                <span v-if="scope.row.EXP_DATE > 0">{{scope.row.EXP_DATE}}</span>
                <span v-else>{{$t('MesPartTempWarehouse._27')}}</span>
              </template>
            </vxe-table-column>
            <vxe-table-column
              min-width="150"
              field="DUE_DATE"
              :title="$t('MesPartTempWarehouse._28')"
              :edit-render="{name: '$input', props: {readonly: true}}"
            >
              <template slot-scope="scope">
                <span>{{scope.row.DUE_DATE}}</span>
                <!-- <span v-else>{{$t('MesPartTempWarehouse._29')}}</span> -->
              </template>
            </vxe-table-column>
          </vxe-table>
        </div>
      </el-tab-pane>
      <el-tab-pane :label="$t('MesPartTempWarehouse._30')">
        <div class="bottomTable">
          <vxe-table
            ref="RBTable"
            border
            resizable
            height="100%"
            size="medium"
            align="center"
            highlight-hover-row
            highlight-current-row
            show-overflow
            auto-resize
            keep-source
            stripe
            :loading="loading3"
            :data="mainTable3"
            :mouse-config="{selected: true}"
            :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
          >
            <vxe-table-column min-width="80" :title="$t('se_cc.sn')" fixed="left">
              <template v-slot="{$rowIndex}">{{$rowIndex +1}}</template>
            </vxe-table-column>
            <vxe-table-column
              min-width="150"
              field="REEL_ID"
              :title="$t('MesPartTempWarehouse._17')"
              :edit-render="{name: '$input', props: {readonly: true}}"
            />
            <vxe-table-column
              min-width="150"
              field="OPERATION_TYPE"
              :title="$t('MesPartTempWarehouse._31')"
              :edit-render="{autofocus: '.custom-input', type: 'visible', props: {readonly: true}}"
            >
              <template v-slot:edit="{ row }">
                <span
                  v-if="row.OPERATION_TYPE === 1"
                  class="green-txt"
                >{{$t('MesPartTempWarehouse._5')}}</span>
                <span
                  v-else-if="row.OPERATION_TYPE === 2"
                  class="red-txt"
                >{{$t('MesPartTempWarehouse._6')}}</span>
                <span v-else>{{$t('MesPartTempWarehouse._32')}}</span>
              </template>
            </vxe-table-column>
            <vxe-table-column
              min-width="190"
              field="BEFORE_QTY"
              :title="$t('MesPartTempWarehouse._33')"
              :edit-render="{name: '$input', props: {readonly: true}}"
            />
            <vxe-table-column
              min-width="190"
              field="QTY"
              :title="$t('MesPartTempWarehouse._34')"
              :edit-render="{name: '$input', props: {readonly: true}}"
            />
            <vxe-table-column
              min-width="210"
              field="LATER_QTY"
              :title="$t('MesPartTempWarehouse._35')"
              :edit-render="{name: '$input', props: {readonly: true}}"
            />
            <vxe-table-column
              min-width="150"
              field="LINE_NAME"
              :title="$t('MesPartTempWarehouse._36')"
              :edit-render="{name: '$input', props: {readonly: true}}"
            />
            <vxe-table-column
              min-width="150"
              field="REMARK"
              :title="$t('MesPartTempWarehouse._37')"
              :edit-render="{name: '$input', props: {readonly: true}}"
            />
            <vxe-table-column
              min-width="150"
              field="CREATE_USER"
              :title="$t('MesPartTempWarehouse._38')"
              :edit-render="{name: '$input', props: {readonly: true}}"
            />
            <vxe-table-column
              min-width="150"
              field="CREATE_TIME"
              :title="$t('MesPartTempWarehouse._39')"
              :edit-render="{name: '$input', props: {readonly: true}}"
            />
          </vxe-table>
        </div>
      </el-tab-pane>
    </el-tabs>
    <!-- 入库 -->
    <el-dialog
      v-dialogDrag
      :visible.sync="dialogVisible"
      :title="MesPartTempWarehouseTitle"
      width="60%"
      :close-on-click-modal="false"
    >
      <el-form
        ref="editForm"
        :model="editForm"
        label-width="100px"
        :rules="isWarehousing?validRules:validRules2"
        :show-message="false"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('MesPartTempWarehouse._17')" prop="REEL_ID">
              <el-input
                v-model="editForm.REEL_ID"
                :placeholder="$t('MesPartTempWarehouse._40')"
                @keyup.enter.native="searchClick2"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('MesPartTempWarehouse._7')" prop="PART_TYPE">
              <el-select
                :disabled="isPART_TYPE"
                v-model="editForm.PART_TYPE"
                filterable
                :placeholder="$t('MesPartTempWarehouse._41')"
                style="width:100%"
              >
                <el-option
                  v-for="item in materialsList"
                  :key="item.LOOKUP_CODE"
                  :label="item.DESCRIPTION"
                  :value="item.LOOKUP_CODE"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('MesPartTempWarehouse._8')" prop="PART_NO">
              <el-input
                v-model="editForm.PART_NO"
                :placeholder="$t('MesPartTempWarehouse._42')"
                readonly
                disabled
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('MesPartTempWarehouse._9')" prop="PART_NAME">
              <el-input
                v-model="editForm.PART_NAME"
                :placeholder="$t('MesPartTempWarehouse._42')"
                readonly
                disabled
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item :label="$t('MesPartTempWarehouse._43')" prop="PART_NAME">
            <el-input
              v-model="editForm.PART_DESC"
              :placeholder="$t('MesPartTempWarehouse._42')"
              readonly
              disabled
            />
          </el-form-item>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              :label="isWarehousing?$t('MesPartTempWarehouse._44'):$t('MesPartTempWarehouse._45')"
              prop="DATE_CODE"
            >
              <el-input
                v-if="isWarehousing"
                v-model="editForm.DATE_CODE"
                :placeholder="$t('MesPartTempWarehouse._42')"
                readonly
                disabled
              />
              <el-input
                v-else
                v-model="editForm.USABLE_QTY"
                :placeholder="$t('MesPartTempWarehouse._42')"
                readonly
                disabled
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              v-if="isWarehousing"
              :label="$t('MesPartTempWarehouse._26')"
              prop="EXP_DATE"
            >
              <el-input
                v-model="editForm.EXP_DATE"
                @input="inputEXP_DATE"
                :placeholder="$t('MesPartTempWarehouse._46')"
              />
            </el-form-item>
            <el-form-item v-else :label="$t('MesPartTempWarehouse._47')">
              <el-input
                v-model="editForm.QTY"
                @input="inputEXP_DATEQTY"
                :placeholder="$t('MesPartTempWarehouse._48')"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('MesPartTempWarehouse._49')" prop="UNIT">
              <el-input
                v-model="editForm.UNIT"
                :disabled="isExistPartNo"
                :placeholder="isWarehousing?$t('MesPartTempWarehouse._50'):$t('MesPartTempWarehouse._42')"
                :readonly="!isWarehousing"
                @input="inputUNIT"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              :label="isWarehousing?$t('MesPartTempWarehouse._12'):$t('MesPartTempWarehouse._51')"
              prop="QTY"
            >
              <el-input
                @input="inputQTY"
                v-if="isWarehousing"
                v-model="editForm.QTY"
                :placeholder="$t('MesPartTempWarehouse._52')"
                min="1"
              />
              <el-select
                v-if="!isWarehousing"
                v-model="editForm.LINE_ID"
                filterable
                :placeholder="$t('MesPartTempWarehouse._53')"
                style="width:100%"
              >
                <el-option
                  v-for="item in linesList"
                  :key="item.ID"
                  :label="item.LINE_NAME"
                  :value="item.ID"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item :label="$t('MesPartTempWarehouse._54')">
            <el-input
              type="textarea"
              :rows="4"
              :placeholder="$t('MesPartTempWarehouse._55')"
              v-model="editForm.REMARK"
            />
          </el-form-item>
        </el-row>
      </el-form>
      <div style="text-align: center;margin-top:20px">
        <el-button
          v-if="isWarehousing"
          type="primary"
          @click.prevent="WarehousingSave"
        >{{$t('MesPartTempWarehouse._5')}}</el-button>&nbsp;
        <el-button v-else type="primary" @click.prevent="OutSave">{{$t('MesPartTempWarehouse._6')}}</el-button>&nbsp;
        <el-button @click.prevent="resetClick">{{$t('publics.btn.reset')}}</el-button>&nbsp;
      </div>
    </el-dialog>
  </d2-container>
</template>

<script>
import customContainerHeader from '@/components/custom-container-header'
import pagination from '@/views/mixin/page'
import { mapGetters } from 'vuex'
import {
  Index,
  LoadData,
  GetDetailData,
  GetRecordData,
  ChangeEnabled,
  IsExistReelDetail,
  IsExistPartNo,
  GetReelDataInput,
  GetReelDataOutput,
  GetNextReelId,
  OutputWarehouse,
  InputWarehouseData,
  OutputWarehouseData
} from '@/api/MesPartTempWarehouse'
export default {
  name: 'MesPartTempWarehouse',
  components: {
    customContainerHeader
  },
  mixins: [pagination],
  computed: {
    ...mapGetters(['userinfo'])
  },
  data () {
    return {
      formData: {
        Page: 1,
        Limit: 15
      },
      materialsList: [], // 物料
      startUpList: [
        { ID: 'Y', NAME: '启用' },
        { ID: 'N', NAME: '禁用' }
      ], // 启动
      linesList: [], // 线别
      loading: false,
      loading2: false,
      loading3: false,
      mainTable: [],
      mainTable2: [],
      mainTable3: [],
      dialogVisible: false,
      editForm: {},
      MesPartTempWarehouseTitle: '',
      validRules: {
        REEL_ID: [
          { required: true, message: this.$t('MesPartTempWarehouse._40') }
        ],
        PART_TYPE: [
          { required: true, message: this.$t('MesPartTempWarehouse._41') }
        ],
        EXP_DATE: [
          { required: true, message: this.$t('MesPartTempWarehouse._46') }
        ],
        UNIT: [
          { required: true, message: this.$t('MesPartTempWarehouse._50') }
        ],
        QTY: [{ required: true, message: this.$t('MesPartTempWarehouse._50') }]
      },
      validRules2: {
        REEL_ID: [
          { required: true, message: this.$t('MesPartTempWarehouse._40') }
        ],
        EXP_DATE: [
          { required: true, message: this.$t('MesPartTempWarehouse._48') }
        ],
        QTY: [{ required: true, message: this.$t('MesPartTempWarehouse._52') }]
      },
      isWarehousing: undefined,
      EnabledForm: {},
      isExistPartNo: undefined,
      isPART_TYPE: undefined
    }
  },
  created () {
    this.getIndex()
    this.getLoadData()
    this.EnabledForm.Operator = this.userinfo.USER_NAME
    this.editForm.CREATE_USER = this.userinfo.USER_NAME
  },
  methods: {
    async getIndex () {
      const res = await Index()
      this.materialsList = res.Result ? res.Result : []
    },
    async getLoadData () {
      this.loading = true
      const res = await LoadData(this.formData)
      this.loading = false
      const data = JSON.parse(res.Result)
      this.mainTable = data ? data.data : []
      console.log(this.mainTable, '获取表格')
      this.totalPage = data.count ? data.count : 0
    },
    // 获取明细数据
    async getDetailData (ID) {
      // this.loading2 = true
      const res = await GetDetailData({ mstId: ID })
      if (res.Result) {
        const data = JSON.parse(res.Result)
        this.mainTable2 = data
        console.log(this.mainTable2, '获取表格2')
        // this.loading2 = false
      } else {
        // this.loading2 = false
      }
    },
    // 获取操作记录数据
    async getRecordData (ID) {
      // this.loading3 = true
      const res = await GetRecordData({ mstId: ID })
      if (res.Result) {
        const data = JSON.parse(res.Result)
        this.mainTable3 = data
        console.log(this.mainTable3, '获取表格3')
        // this.loading3 = false
      } else {
        // this.loading3 = false
      }
    },
    // 搜索
    searchClick () {
      this.formData.Page = 1
      this.getLoadData()
    },
    // 启动
    changeENABLED (row) {
      console.log(row)
      if (row.ENABLED === 'Y') {
        this.EnabledForm.Status = true
      } else {
        this.EnabledForm.Status = false
      }
      this.$confirm(
        this.$t('MesPartTempWarehouse._56'),
        this.$t('MesPartTempWarehouse._57'),
        {
          confirmButtonText: this.$t('MesPartTempWarehouse._58'),
          cancelButtonText: this.$t('MesPartTempWarehouse._59'),
          type: 'warning'
        }
      )
        .then(async () => {
          const nowDate = this.getNowDate(new Date())
          this.EnabledForm.OperatorDatetime = nowDate
          // console.log('=====================', this.EnabledForm)
          const res = await ChangeEnabled(this.EnabledForm)
          if (res.Result.ResultCode === 0) {
            this.$message({
              type: 'success',
              message: this.$t('MesPartTempWarehouse._60')
            })
          }
          this.getLoadData()
        })
        .catch(() => {
          this.getLoadData()
          this.$message({
            type: 'info',
            message: this.$t('MesPartTempWarehouse._61')
          })
        })
    },
    // 入库
    WarehousingClick () {
      this.editForm = {}
      this.editForm.CREATE_USER = this.userinfo.USER_NAME
      this.MesPartTempWarehouseTitle = this.$t('MesPartTempWarehouse._62')
      this.dialogVisible = true
      this.isWarehousing = true
      this.isPART_TYPE = undefined
      this.isExistPartNo = undefined
    },
    // 出库
    OutClick () {
      this.editForm = {}
      this.editForm.CREATE_USER = this.userinfo.USER_NAME
      this.MesPartTempWarehouseTitle = this.$t('MesPartTempWarehouse._63')
      this.dialogVisible = true
      this.isWarehousing = false
      this.isPART_TYPE = true
      this.isExistPartNo = true
      this.getLineList()
    },
    async getLineList () {
      const res = await OutputWarehouse()
      this.linesList = res.Result.LineList ? res.Result.LineList : []
    },
    // 根据物料唯一标识查询物料信息（入库）
    async searchClick2 () {
      // 入库查
      console.log(this.isWarehousing)
      if (this.isWarehousing) {
        const res = await GetReelDataInput({ reelId: this.editForm.REEL_ID })
        if (res.Result.ENABLED === 'N') {
          this.$message.error(
            `${this.$t('MesPartTempWarehouse._64')}${
              res.Result.PART_NO
            }${this.$t('MesPartTempWarehouse._65')}`
          )
        } else {
          this.checkIsExistReelDetail()
        }
      } else {
        // 出库查
        const res = await GetReelDataOutput({ reelId: this.editForm.REEL_ID })
        const data = JSON.parse(res.Result)
        console.log(data)
        if (data === null) {
          this.$message.error(
            `${this.$t('MesPartTempWarehouse._72')}${
              this.editForm.REEL_ID
            }${this.$t('MesPartTempWarehouse._73')}`
          )
          return
        }
        if (data.ENABLED === 'N') {
          this.$message.error(
            `${this.$t('MesPartTempWarehouse._64')}${data.PART_NO}${this.$t(
              'MesPartTempWarehouse._66'
            )}`
          )
        } else {
          GetNextReelId({ partNo: data.PART_NO })
            .then(result => {
              if (result.Result !== this.editForm.REEL_ID) {
                this.$message.error(
                  `${this.$t('MesPartTempWarehouse._67')}'${
                    data.PART_NAME
                  }'【 ${data.PART_DESC}】${this.$t(
                    'MesPartTempWarehouse._67'
                  )}【${this.editForm.REEL_ID}】`
                )
              } else {
                this.editForm.MST_ID = data.MST_ID
                this.editForm.DETAIL_ID = data.DETAIL_ID
                this.editForm.PART_TYPE =
                  data.PART_TYPE === '' ? 0 : data.PART_TYPE
                this.editForm.PART_NO = data.PART_NO
                this.editForm.PART_NAME = data.PART_NAME
                this.editForm.PART_DESC = data.PART_DESC
                this.editForm.UNIT = data.UNIT
                this.editForm.USABLE_QTY = data.USABLE_QTY
                this.editForm.QTY = data.USABLE_QTY
                this.$forceUpdate()
              }
            })
            .catch(() => {})
        }
      }
    },
    // 判断物料条码是否在库存明细中存在
    async checkIsExistReelDetail () {
      const res = await IsExistReelDetail({ reelId: this.editForm.REEL_ID })
      if (res.Result === 'true') {
        this.$message.error(
          `${this.$t('MesPartTempWarehouse._69')}${
            this.editForm.REEL_ID
          }${this.$t('MesPartTempWarehouse._70')}`
        )
      } else {
        GetReelDataInput({ reelId: this.editForm.REEL_ID })
          .then(res => {
            if (res.Result === 'null') {
              this.$message.error(
                `${this.$t('MesPartTempWarehouse._69')}${
                  this.editForm.REEL_ID
                }${this.$t('MesPartTempWarehouse._71')}`
              )
            } else {
              const data = JSON.parse(res.Result)
              console.log('++++++++++++++++++', data)
              this.editForm.MST_ID = data.MST_ID
              this.editForm.DETAIL_ID = data.DETAIL_ID
              this.editForm.PART_TYPE =
                data.PART_TYPE === '' ? 0 : data.PART_TYPE
              this.editForm.PART_NO = data.PART_NO
              this.editForm.PART_NAME = data.PART_NAME
              this.editForm.PART_DESC = data.PART_DESC
              this.editForm.UNIT = data.UNIT
              this.editForm.QTY = data.QTY
              this.editForm.DATE_CODE = data.DATE_CODE.split(' ')[0]
              this.$forceUpdate()
              this.checkIsExistPartNo()
            }
          })
          .catch(() => {})
      }
    },
    // 判断物料编码是否在库存中存在
    async checkIsExistPartNo () {
      const res = await IsExistPartNo({ partNo: this.editForm.PART_NO })
      if (res.result === 'false') {
        this.isExistPartNo = false
        this.isPART_TYPE = false
      } else {
        // this.isExistPartNo = true
        this.isPART_TYPE = true
      }
    },
    // 入库保存
    WarehousingSave () {
      console.log('入库保存:', this.editForm)
      console.log('入库保存:', JSON.stringify(this.editForm))
      this.$refs.editForm.validate(async (valid, errInfo) => {
        if (valid) {
          const nowDate = this.getNowDate(new Date())
          this.editForm.CREATE_TIME = nowDate
          InputWarehouseData(this.editForm)
            .then(res => {
              const data = JSON.parse(res.Result)
              // console.log('================', data)
              if (data.ResultCode === 0) {
                this.getLoadData()
                this.dialogVisible = false
                this.$notify({
                  title: this.$t('crss._20'),
                  message: this.$t('crss._21'),
                  type: 'success',
                  duration: 2000
                })
              } else {
                this.$message.error(data.ResultMsg)
                return
              }
              this.dialogVisible = false
            })
            .catch(() => {})
        } else {
          try {
            Object.keys(errInfo).forEach(item => {
              this.$message.error(errInfo[item][0].message)
              throw new Error(new Date().toLocaleString())
            })
          } catch {}
        }
      })
    },
    // 出库保存
    OutSave () {
      this.$refs.editForm.validate(async (valid, errInfo) => {
        if (valid) {
          const nowDate = this.getNowDate(new Date())
          this.editForm.CREATE_TIME = nowDate
          OutputWarehouseData(this.editForm)
            .then(res => {
              const data = JSON.parse(res.Result)
              // console.log('================', data)
              if (data.ResultCode === 0) {
                this.getLoadData()
                this.dialogVisible = false
                this.$notify({
                  title: this.$t('crss._20'),
                  message: this.$t('crss._21'),
                  type: 'success',
                  duration: 2000
                })
              } else {
                this.$message.error(data.ResultMsg)
                return
              }
              this.dialogVisible = false
            })
            .catch(() => {})
        } else {
          try {
            Object.keys(errInfo).forEach(item => {
              this.$message.error(errInfo[item][0].message)
              throw new Error(new Date().toLocaleString())
            })
          } catch {}
        }
      })
    },
    // 重置
    resetClick () {
      this.editForm = {}
    },
    cellClick (row, column, event) {
      // console.log(row)
      this.EnabledForm.Id = row.row.ID
      this.getDetailData(row.row.ID)
      this.getRecordData(row.row.ID)
      // this.rowID = row.row.ID
      // this.rowSTATUS = row.row.STATUS
    },
    inputEXP_DATE (e) {
      this.$forceUpdate()
    },
    inputEXP_DATEQTY () {
      this.$forceUpdate()
    },
    inputUNIT () {
      this.$forceUpdate()
    },
    inputQTY () {
      this.$forceUpdate()
    },
    // 获取当前时间
    getNowDate (date) {
      var y = date.getFullYear()
      var m = date.getMonth() + 1
      m = m < 10 ? '0' + m : m
      var d = date.getDate()
      d = d < 10 ? '0' + d : d
      var h = date.getHours()
      h = h < 10 ? '0' + h : h
      var minute = date.getMinutes()
      minute = minute < 10 ? '0' + minute : minute
      var second = date.getSeconds()
      second = second < 10 ? '0' + second : second
      return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
    }
  }
}
</script>

<style lang="scss" scoped>
.MesPartTempWarehouseTable-container {
  height: calc(100vh - 60px - 41px - 53px - 320px);
}
.MesPartTempWarehouse-pagination {
  margin: 10px 0;
}
.MesPartTempWarehouse-tab {
  height: calc(100vh - 60px - 41px - 53px - 320px - 35px);
}
.bottomTable {
  height: calc(100vh - 60px - 41px - 53px - 320px - 35px - 40px - 30px);
}
</style>
