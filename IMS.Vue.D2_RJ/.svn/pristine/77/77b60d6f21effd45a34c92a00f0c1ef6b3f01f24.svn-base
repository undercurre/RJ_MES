<template>
  <custom-container>
    <!-- 头部 -->
    <template slot="header">
      <custom-container-header :isExport="false"
                               :isExportTpl="false"
                               :isImport="false">
        <el-input v-model="formData.PART_NO"
                  :placeholder="$t('SfcsProductComponents._1')"
                  clearable
                  style="width:150px"
                  @keyup.enter.native="searchClick" />&nbsp;
        <el-input v-model="formData.ODM_COMPONENT_PN"
                  :placeholder="$t('SfcsProductComponents._2')"
                  clearable
                  style="width:150px"
                  @keyup.enter.native="searchClick" />&nbsp;
        <el-input v-model="formData.CUSTOMER_COMPONENT_PN"
                  :placeholder="$t('SfcsProductComponents._3')"
                  clearable
                  style="width:150px"
                  @keyup.enter.native="sClick" />&nbsp;
        <el-button type="primary"
                   icon="el-icon-search"
                   @click.prevent="searchClick">{{$t('publics.btn.search')}}</el-button>&nbsp;
        <el-button type="success"
                   icon="el-icon-check"
                   @click.prevent="saveClick"
                   v-if="$btnList.indexOf('SfcsProductComponentsSave') !== -1">{{$t('publics.btn.save')}}</el-button>&nbsp;
        <!-- <el-button
          type="danger"
          icon="el-icon-delete"
          @click="remove_but()"
        >{{ $t('SfcsProductComponents._28') }}</el-button> -->
        <el-button type="primary"
                   icon="el-icon-plus"
                   @click.prevent="addPartsAssemblyClick(0)"
                   v-if="$btnList.indexOf('SfcsProductComponentsSave') !== -1">{{$t('SfcsProductComponents._4')}}</el-button>&nbsp;
        <el-button type="success"
                   icon="el-icon-plus"
                   @click.prevent="addPartsAndAccessoriesClick(0)"
                   v-if="$btnList.indexOf('SfcsProductComponentsSave') !== -1">{{$t('SfcsProductComponents._5')}}</el-button>&nbsp;
        <el-button type="primary"
                   icon="el-icon-plus"
                   @click.prevent="addAlternativeMaterialsClick(0)"
                   v-if="$btnList.indexOf('SfcsProductComponentsSave') !== -1">{{$t('SfcsProductComponents._6')}}</el-button>&nbsp;
        <el-button type="success"
                   icon="el-icon-plus"
                   @click.prevent="addSubstituteAccessoriesClick(0)"
                   v-if="$btnList.indexOf('SfcsProductComponentsSave') !== -1">{{$t('SfcsProductComponents._7')}}</el-button>&nbsp;
      </custom-container-header>
    </template>
    <!-- 上表格 -->
    <el-row>
      <!-- 左上表格 -->
      <el-col :span="16">
        <div class="SfcsProductComponentsHead">
          <vxe-table ref="leftTopTable"
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
                     :edit-rules="validRules"
                     :data="mainTable"
                     :mouse-config="{selected: true}"
                     :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
                     @cell-click="cellClick">
            <vxe-table-column width="150"
                              field="PART_NO"
                              prop="PART_NO"
                              :title="$t('SfcsProductComponents._1')"
                              :edit-render="{name:'input'}" />
            <vxe-table-column width="110"
                              field="COMPONENT_ID"
                              prop="COMPONENT_ID"
                              :title="$t('SfcsProductComponents._8')"
                              :edit-render="{name:'select', options: ComponentName}" />
            <vxe-table-column width="130"
                              field="ODM_COMPONENT_PN"
                              :title="$t('SfcsProductComponents._9')"
                              :edit-render="{autofoucs:'.custom-input'}"
                              prop="ODM_COMPONENT_PN">
              <template v-slot:edit="{row}">
                <el-input v-model="row.ODM_COMPONENT_PN"
                          @input="handleCheckInput(row)" />
              </template>
            </vxe-table-column>
            <vxe-table-column min-width="200"
                              prop="CUSTOMER_COMPONENT_PN"
                              field="CUSTOMER_COMPONENT_PN"
                              :title="$t('SfcsProductComponents._10')"
                              :edit-render="{name:'input'}" />
            <vxe-table-column width="160"
                              field="DATA_FORMAT"
                              prop="DATA_FORMAT"
                              :title="$t('SfcsProductComponents._11')"
                              :edit-render="{name:'input'}" />
            <vxe-table-column width="100"
                              field="COMPONENT_QTY"
                              :title="$t('SfcsProductComponents._12')"
                              :edit-render="{name:'$input', props: {type: 'number',min: '1'}}" />
            <vxe-table-column width="130"
                              fixed="right"
                              field="SERIALIZED"
                              :title="$t('SfcsProductComponents._13')">
              <template v-slot="{ row}">
                <el-switch v-model="row.SERIALIZED"
                           :active-text="$t('publics.btn.yes')"
                           :inactive-text="$t('publics.btn.no')"
                           active-color="#13ce66"
                           inactive-color="#cccccc"
                           active-value="Y"
                           inactive-value="N" />
              </template>
            </vxe-table-column>
            <vxe-table-column width="180"
                              field="COLLECT_OPERATION_ID"
                              prop="COLLECT_OPERATION_ID"
                              :title="$t('SfcsProductComponents._14')"
                              :edit-render="{name:'select', options: Operation}" />
            <vxe-table-column width="100"
                              field="ENABLED"
                              :title="$t('SfcsProductComponents._15')"
                              fixed="right">
              <template v-slot="{ row}">
                <el-switch v-model="row.ENABLED"
                           :active-text="$t('publics.btn.yes')"
                           :inactive-text="$t('publics.btn.no')"
                           active-color="#13ce66"
                           inactive-color="#cccccc"
                           active-value="Y"
                           inactive-value="N" />
              </template>
            </vxe-table-column>
            <vxe-table-column fixed="right"
                              min-width="200"
                              field="REWORK_REMOVE_FLAG"
                              :title="$t('SfcsProductComponents._16')">
              <template v-slot="{ row}">
                <el-switch v-model="row.REWORK_REMOVE_FLAG"
                           :active-text="$t('publics.btn.yes')"
                           :inactive-text="$t('publics.btn.no')"
                           active-color="#13ce66"
                           inactive-color="#cccccc"
                           active-value="Y"
                           inactive-value="N" />
              </template>
            </vxe-table-column>
            <vxe-table-column width="150"
                              field="ATTRIBUTE2"
                              :title="$t('SfcsProductComponents._17')"
                              :edit-render="{name:'input'}" />
          </vxe-table>
        </div>
        <!-- 第一个分页 -->
        <div class="pagination">
          <el-pagination :current-page="formData.Page"
                         :page-size="formData.Limit"
                         :page-sizes="[15, 25, 35, 45]"
                         layout="total, sizes, prev, pager, next, jumper"
                         :total="totalPage"
                         @size-change="handleSizeChange"
                         @current-change="handleCurrentChange" />
        </div>
      </el-col>
      <!-- 右上表格 -->
      <el-col :span="8">
        <div class="SfcsProductComponentsHead">
          <vxe-table ref="rightTopTable"
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
                     :data="AattachmentsData"
                     :mouse-config="{selected: true}"
                     :edit-config="{trigger: 'click', mode: 'row', showStatus: true}">
            <vxe-table-column width="150"
                              field="ATTACHMENT_ID"
                              :title="$t('SfcsProductComponents._18')"
                              :edit-render="{name:'select', options: Attachment}" />
            <vxe-table-column width="160"
                              field="DATA_FORMAT"
                              :title="$t('SfcsProductComponents._19')"
                              :edit-render="{name:'input'}" />
            <vxe-table-column width="130"
                              field="FIX_VALUE"
                              :title="$t('SfcsProductComponents._20')"
                              :edit-render="{name:'input'}" />
            <vxe-table-column width="100"
                              field="ATTACHMENT_QTY"
                              :title="$t('SfcsProductComponents._12')"
                              :edit-render="{name:'$input', props: {type: 'number',min: '1'}}" />
            <vxe-table-column width="100"
                              field="ENABLED"
                              :title="$t('SfcsProductComponents._15')"
                              fixed="right">
              <template v-slot="{ row}">
                <el-switch v-model="row.ENABLED"
                           :active-text="$t('publics.btn.yes')"
                           :inactive-text="$t('publics.btn.no')"
                           active-color="#13ce66"
                           inactive-color="#cccccc"
                           active-value="Y"
                           inactive-value="N" />
              </template>
            </vxe-table-column>
          </vxe-table>
        </div>
        <!-- 第二个分页 -->
        <div class="pagination">
          <el-pagination :current-page="ComponentsAattachmentsForm.Page"
                         :page-size="ComponentsAattachmentsForm.Limit"
                         :page-sizes="[15, 25, 35, 45]"
                         layout="total, sizes, prev, pager, next, jumper"
                         :total="ComponentsAattachmentsPage"
                         @size-change="CA_handleSizeChange"
                         @current-change="CA_handleCurrentChange" />
        </div>
      </el-col>
    </el-row>
    <!-- 下表格 -->
    <el-row>
      <div>
        <span style="display: block;color: #606266;font-size: 14px;margin:10px 0">{{$t('SfcsProductComponents._21')}}</span>
      </div>
      <el-col :span="16">
        <div class="SfcsProductComponentsfooter">
          <vxe-table ref="leftBottomTable"
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
                     :edit-rules="leftBottomTableRules"
                     :data="SubstituteData"
                     :mouse-config="{selected: true}"
                     :edit-config="{trigger: 'click', mode: 'row', showStatus: true, activeMethod: handleactiveMethod}"
                     @cell-click="cellClick2">
            <vxe-table-column min-width="290"
                              field="SUBSTITUTE_COMP_PN"
                              prop="SUBSTITUTE_COMP_PN"
                              :title="$t('SfcsProductComponents._22')"
                              :edit-render="{name:'input'}" />
            <vxe-table-column width="280"
                              field="CUSTOMER_COMPONENT_PN"
                              prop="CUSTOMER_COMPONENT_PN"
                              :title="$t('SfcsProductComponents._23')"
                              :edit-render="{name:'input'}" />
            <vxe-table-column width="160"
                              field="DATA_FORMAT"
                              :title="$t('SfcsProductComponents._11')"
                              :edit-render="{name:'input'}" />
            <vxe-table-column width="100"
                              field="COMPONENT_QTY"
                              :title="$t('SfcsProductComponents._12')"
                              :edit-render="{name:'$input', props: {type: 'number',min: '1'}}" />
            <vxe-table-column width="220"
                              field="BEGIN_DATE"
                              :title="$t('SfcsProductComponents._24')"
                              :edit-render="{autofocus: '.custom-input', type: 'visible'}">
              <template v-slot:edit="{ row }">
                <div>
                  <!-- <span v-show="$rowIndex !== currentRowIndex">{{ row.BEGIN_DATE }}</span> -->
                  <el-date-picker value-format="yyyy-MM-dd"
                                  style="width: 190px"
                                  v-model="row.BEGIN_DATE"
                                  type="date"></el-date-picker>
                </div>
              </template>
            </vxe-table-column>
            <vxe-table-column width="220"
                              field="END_DATE"
                              :title="$t('SfcsProductComponents._25')"
                              :edit-render="{autofocus: '.custom-input', type: 'visible'}">
              <template v-slot:edit="{ row}">
                <div>
                  <!-- <span v-show="$rowIndex !== currentRowIndex">{{ row.END_DATE }}</span> -->
                  <el-date-picker value-format="yyyy-MM-dd"
                                  style="width: 190px"
                                  v-model="row.END_DATE"
                                  type="date"></el-date-picker>
                </div>
              </template>
            </vxe-table-column>
            <vxe-table-column fixed="right"
                              min-width="130"
                              field="SERIALIZED"
                              :title="$t('SfcsProductComponents._26')">
              <template v-slot="{ row}">
                <el-switch v-model="row.SERIALIZED"
                           :active-text="$t('publics.btn.yes')"
                           :inactive-text="$t('publics.btn.no')"
                           active-color="#13ce66"
                           inactive-color="#cccccc"
                           active-value="Y"
                           inactive-value="N" />
              </template>
            </vxe-table-column>
            <vxe-table-column width="100"
                              field="ENABLED"
                              :title="$t('SfcsProductComponents._15')"
                              fixed="right">
              <template v-slot="{ row}">
                <el-switch v-model="row.ENABLED"
                           :active-text="$t('publics.btn.yes')"
                           :inactive-text="$t('publics.btn.no')"
                           active-color="#13ce66"
                           inactive-color="#cccccc"
                           active-value="Y"
                           inactive-value="N" />
              </template>
            </vxe-table-column>
            <vxe-table-column min-width="200"
                              fixed="right"
                              field="REWORK_REMOVE_FLAG"
                              :title="$t('SfcsProductComponents._16')">
              <template v-slot="{ row}">
                <el-switch v-model="row.REWORK_REMOVE_FLAG"
                           :active-text="$t('publics.btn.yes')"
                           :inactive-text="$t('publics.btn.no')"
                           active-color="#13ce66"
                           inactive-color="#cccccc"
                           active-value="Y"
                           inactive-value="N" />
              </template>
            </vxe-table-column>
            <vxe-table-column width="150"
                              field="ATTRIBUTE2"
                              :title="$t('SfcsProductComponents._17')"
                              :edit-render="{name:'input'}" />
            <!-- <vxe-table-column
              width="110"
              field="EDI_FLAG"
              :title="$t('SfcsProductComponents._27')"
              fixed="right"
            >
              <template v-slot="{ row}">
                <el-switch
                  v-model="row.EDI_FLAG"
                  :active-text="$t('publics.btn.yes')"
                  :inactive-text="$t('publics.btn.no')"
                  active-color="#13ce66"
                  inactive-color="#cccccc"
                  active-value="Y"
                  inactive-value="N"
                />
              </template>
            </vxe-table-column> -->
          </vxe-table>
        </div>
        <!-- 第三个分页 -->
        <div class="pagination">
          <el-pagination :current-page="SubstituteForm.Page"
                         :page-size="SubstituteForm.Limit"
                         :page-sizes="[15, 25, 35, 45]"
                         layout="total, sizes, prev, pager, next, jumper"
                         :total="SubstitutePage"
                         @size-change="S_handleSizeChange"
                         @current-change="S_handleCurrentChange" />
        </div>
      </el-col>
      <el-col :span="8">
        <div class="SfcsProductComponentsfooter">
          <vxe-table ref="rightBottomTable"
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
                     :data="AnnexData"
                     :mouse-config="{selected: true}"
                     :edit-config="{trigger: 'click', mode: 'row', showStatus: true}">
            <vxe-table-column width="150"
                              field="ATTACHMENT_ID"
                              :title="$t('SfcsProductComponents._18')"
                              :edit-render="{name:'select', options: Attachment}" />
            <vxe-table-column width="160"
                              field="DATA_FORMAT"
                              :title="$t('SfcsProductComponents._19')"
                              :edit-render="{name:'input'}" />
            <vxe-table-column width="130"
                              field="FIX_VALUE"
                              :title="$t('SfcsProductComponents._20')"
                              :edit-render="{name:'input'}" />
            <vxe-table-column width="100"
                              field="ATTACHMENT_QTY"
                              :title="$t('SfcsProductComponents._12')"
                              :edit-render="{name:'$input',props:{type:'number',min: '1'}}" />
            <vxe-table-column width="100"
                              field="ENABLED"
                              :title="$t('SfcsProductComponents._15')"
                              fixed="right">
              <template v-slot="{ row}">
                <el-switch v-model="row.ENABLED"
                           :active-text="$t('publics.btn.yes')"
                           :inactive-text="$t('publics.btn.no')"
                           active-color="#13ce66"
                           inactive-color="#cccccc"
                           active-value="Y"
                           inactive-value="N" />
              </template>
            </vxe-table-column>
          </vxe-table>
        </div>
        <!-- 第四个分页 -->
        <div class="pagination">
          <el-pagination :current-page="AnnexForm.Page"
                         :page-size="AnnexForm.Limit"
                         :page-sizes="[15, 25, 35, 45]"
                         layout="total, sizes, prev, pager, next, jumper"
                         :total="AnnexPage"
                         @size-change="A_handleSizeChange"
                         @current-change="A_handleCurrentChange" />
        </div>
      </el-col>
    </el-row>
  </custom-container>
</template>

<script>
import customContainerHeader from '@/components/custom-container-header'
import {
  Index,
  LoadData,
  GetComponentsAattachments,
  GetSubstituteComponents,
  SaveData
} from '@/api/SfcsProductComponents'
import customContainer from '@/components/custom-container'
export default {
  name: 'SfcsProductComponents',
  components: {
    customContainerHeader,
    customContainer
  },
  data () {
    return {
      formData: {
        PART_NO: '', // 料号
        COMPONENT_ID: null, // 零件ID
        ODM_COMPONENT_PN: '', // 本厂料号(零件料号)
        CUSTOMER_COMPONENT_PN: '', // 客户零件料号
        DATA_FORMAT: '', // 格式限定
        COMPONENT_QTY: null, // 数量
        COLLECT_OPERATION_ID: null, // 采集工序ID
        Page: 1,
        Limit: 15,
        Key: '',
        ...this.formData
      },
      mainTable: [],
      loading: false,
      totalPage: 0,
      AattachmentsData: [], // 附件数据
      ComponentName: [], // 零件名称
      Operation: [], // 采集工序
      Attachment: [], // 附件名称
      ComponentsAattachmentsForm: {
        PRODUCT_OBJECT_ID: '', // 产品零件ID
        Page: 1,
        Limit: 15,
        Key: '',
        ...this.ComponentsAattachmentsForm
      },
      Aattachmentsloading: false,
      ComponentsAattachments_OBJECT_ID: 0, // 新增附件必传ID
      ComponentsAattachmentsPage: 0,
      SubstituteData: [], // 替代料维护
      SubstituteForm: {
        PRODUCT_COMPONENT_ID: '', // 零件组件ID
        Page: 1,
        Limit: 15,
        Key: '',
        ...this.SubstituteForm
      },
      Substituteloading: false,
      Substitute_COMPONENT_ID: 0, // 新增替代必传ID
      SubstitutePage: 0,
      AnnexData: [], // 替代附件数据
      AnnexForm: {
        PRODUCT_OBJECT_ID: '', // 产品零件ID
        Page: 1,
        Limit: 15,
        Key: '',
        ...this.AnnexForm
      },
      Annexloading: false,
      Annex_OBJECT_ID: 0, // 新增替代附件必传ID
      AnnexPage: 0,
      form: {
        InsertComponents: [], // 零件
        UpdateComponents: [],
        InsertAttachments: [], // 附件
        UpdateAttachments: [],
        InsertSubstitute: [], // 替代
        UpdateSubstitute: []
      },
      defaultIndex: 0, // 上表index
      defaultIndex2: 0, // 下表index
      currentRowIndex: -1,
      defaultAdd: 0,
      mstID: '',
      validRules: {
        PART_NO: [
          {
            required: true,
            message: this.$t('SfcsProductComponents._a1'),
            trigger: 'blur'
          }
        ],
        COMPONENT_ID: [
          {
            required: true,
            message: this.$t('SfcsProductComponents._a8'),
            trigger: 'blur,change'
          }
        ],
        ODM_COMPONENT_PN: [
          {
            required: true,
            message: this.$t('SfcsProductComponents._29'),
            trigger: 'blur'
          }
        ],
        // CUSTOMER_COMPONENT_PN: [
        //   {
        //     required: true,
        //     message: this.$t('SfcsProductComponents._30'),
        //     trigger: 'blur'
        //   }
        // ],
        COLLECT_OPERATION_ID: [
          {
            required: true,
            message: this.$t('SfcsProductComponents._32'),
            trigger: 'blur'
          }
        ]
      },
      leftBottomTableRules: {
        SUBSTITUTE_COMP_PN: [
          {
            required: true,
            message: this.$t('SfcsProductComponents._a22'),
            trigger: 'blur'
          }
        ],
        CUSTOMER_COMPONENT_PN: [
          {
            required: true,
            message: this.$t('SfcsProductComponents._a23'),
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created () {
    this.getIndex()
    this.getLoadData()
  },
  methods: {
    async handleactiveMethod (e) {
      this.getLoadData(1)
      this.defaultIndex2 = e.$rowIndex
      return e
    },
    cellClick2 (e) { },
    cellClick (e) {
      if (this.defaultIndex === e.$rowIndex) {
        return false
      }
      if (this.defaultAdd === 1) {
        return false
      }
      this.defaultIndex = e.$rowIndex
      this.defaultIndex2 = 0
      this.getComponentsAattachments(this.mstID)
      this.getSubstituteComponents(this.mstID)
      // this.getLoadData()
    },
    handleCheckInput (row) {
      const { ODM_COMPONENT_PN } = row
      if (ODM_COMPONENT_PN > 10) {
      }
    },
    async getIndex () {
      const res = await Index()
      if (res.Result) {
        const data = res.Result
        const ComponentName = data.ComponentName
        const Operation = data.Operation
        const Attachment = data.Attachment
        this.ComponentName.push({
          label: '',
          value: '',
          disabled: false
        })
        this.Operation.push({
          label: '',
          value: '',
          disabled: false
        })
        this.Attachment.push({
          label: '',
          value: '',
          disabled: false
        })
        ComponentName.map((item) => {
          this.ComponentName.push({
            label: item.OBJECT_NAME,
            value: item.ID ? Number(item.ID) : 0,
            disabled: false
          })
        })
        Operation.map((item) => {
          this.Operation.push({
            label: item.OPERATION_NAME,
            value: item.ID ? Number(item.ID) : 0,
            disabled: false
          })
        })
        Attachment.map((item) => {
          this.Attachment.push({
            label: item.OBJECT_NAME,
            value: item.ID ? Number(item.ID) : 0,
            disabled: false
          })
        })
        console.log('=============', this.Attachment)
      }
    },
    async getLoadData (num) {
      if (num === 1) return false
      this.loading = true
      const res = await LoadData(this.formData)
      this.loading = false
      this.defaultAdd = 0
      if (res.Result) {
        this.mainTable = res.Result
        this.totalPage = res.TotalCount
        this.mstID = res.Result.map((item) => {
          return item.ID
        })
        // console.log('++++++++++++++++', this.mstID)

        this.getComponentsAattachments(this.mstID)
        this.getSubstituteComponents(this.mstID)
      }
    },
    // 获取上附件表格
    async getComponentsAattachments (ID) {
      this.ComponentsAattachmentsForm.PRODUCT_OBJECT_ID = ID[this.defaultIndex]
      this.Aattachmentsloading = true
      const res = await GetComponentsAattachments(
        this.ComponentsAattachmentsForm
      )
      this.Aattachmentsloading = false
      if (res.Result) {
        this.AattachmentsData = res.Result
        this.ComponentsAattachmentsPage = res.TotalCount
        this.ComponentsAattachments_OBJECT_ID = ID[this.defaultIndex]
      }
    },
    // 获取替代料维护表格
    async getSubstituteComponents (ID) {
      this.SubstituteForm.PRODUCT_COMPONENT_ID = ID[this.defaultIndex]
      console.log(
        '替代料维护表格ID:',
        this.SubstituteForm.PRODUCT_COMPONENT_ID
      )
      this.Substituteloading = true
      const res = await GetSubstituteComponents(this.SubstituteForm)
      this.Substituteloading = false
      this.SubstituteData = res.Result ? res.Result : []
      console.log('-------------------', this.SubstituteData)
      this.SubstitutePage = res.TotalCount ? res.TotalCount : 0
      this.Substitute_COMPONENT_ID = ID[this.defaultIndex]
      this.getAnnexData(ID)
    },
    // 获取下附件表格
    async getAnnexData (ID) {
      this.AnnexForm.PRODUCT_OBJECT_ID =
        this.SubstituteData.length !== 0
          ? this.SubstituteData[this.defaultIndex2]['ID']
          : 0
      console.log('下附件表格id:', this.AnnexForm.PRODUCT_OBJECT_ID)
      console.log('this.defaultIndex2:', this.defaultIndex2)
      this.Annexloading = true
      const res = await GetComponentsAattachments(this.AnnexForm)
      this.Annexloading = false
      this.AnnexData = res.Result ? res.Result : []
      this.AnnexPage = res.TotalCount ? res.TotalCount : 0
      this.Annex_OBJECT_ID = this.SubstituteData[this.defaultIndex2]['ID']
    },
    // 搜索
    searchClick () {
      this.formData.Page = 1
      this.ComponentsAattachmentsForm.Page = 1
      this.SubstituteForm.Page = 1
      this.AnnexForm.Page = 1
      this.getLoadData()
    },
    // 保存
    async saveClick () {
      var that = this
      this.$refs.leftTopTable.validate((valid) => {
        if (valid) {
          var postmainTable = that.$refs.leftTopTable.getRecordset()
          var postAattachmentsData = that.$refs.rightTopTable.getRecordset()
          var postSubstituteData = that.$refs.leftBottomTable.getRecordset()
          var postAnnexData = that.$refs.rightBottomTable.getRecordset()
          if (
            postmainTable.insertRecords.length ||
            postmainTable.updateRecords.length ||
            postAattachmentsData.insertRecords.length ||
            postAattachmentsData.updateRecords.length ||
            postSubstituteData.insertRecords.length ||
            postSubstituteData.updateRecords.length ||
            postAnnexData.insertRecords.length ||
            postAnnexData.updateRecords.length
          ) {
            try {
              Object.keys(that.$refs).forEach((ctx) => {
                console.log(ctx)
                that.$refs[ctx].validate((valid) => {
                  if (valid) {
                    that.form.InsertComponents = postmainTable.insertRecords
                    that.form.UpdateComponents = postmainTable.updateRecords
                    that.form.InsertAttachments = postAattachmentsData.insertRecords.concat(
                      postAnnexData.insertRecords
                    )
                    that.form.UpdateAttachments = postAattachmentsData.updateRecords.concat(
                      postAnnexData.updateRecords
                    )

                    that.form.InsertSubstitute =
                      postSubstituteData.insertRecords
                    that.form.UpdateSubstitute =
                      postSubstituteData.updateRecords
                  }
                })
              })
              SaveData(that.form).then((res) => {
                if (res.Result) {
                  that.form = {}
                  that.$notify({
                    title: that.$t('ssc_rd.me_su'),
                    message: that.$t('ssc_rd.me_suf'),
                    type: 'success',
                    duration: 2000
                  })
                  that.getLoadData()
                } else {
                  that.$message({
                    message: res.ErrorInfo.Message,
                    type: 'error'
                  })
                }
              })
            } catch (e) {
              console.log(e.message)
            }
          }
        }
      })
    },
    handleSizeChange (val) {
      this.formData.Limit = val
      this.getLoadData()
    },
    handleCurrentChange (val) {
      this.formData.Page = val
      this.getLoadData()
    },
    CA_handleSizeChange (val) {
      this.ComponentsAattachmentsForm.Limit = val
      this.getLoadData()
    },
    CA_handleCurrentChange (val) {
      this.ComponentsAattachmentsForm.Page = val
      this.getLoadData()
    },
    S_handleSizeChange (val) {
      this.SubstituteForm.Limit = val
      this.getLoadData()
    },
    S_handleCurrentChange (val) {
      this.SubstituteForm.Page = val
      this.getLoadData()
    },
    A_handleSizeChange (val) {
      this.AnnexForm.Limit = val
      this.getLoadData()
    },
    A_handleCurrentChange (val) {
      this.AnnexForm.Page = val
      this.getLoadData()
    },
    // 新增零件
    addPartsAssemblyClick (row) {
      const record = {
        ID: 0,
        PART_NO: '',
        COMPONENT_ID: undefined,
        ODM_COMPONENT_PN: '',
        CUSTOMER_COMPONENT_PN: '',
        DATA_FORMAT: '',
        COMPONENT_QTY: 1,
        SERIALIZED: 'Y',
        ENABLED: 'Y',
        REWORK_REMOVE_FLAG: 'Y',
        EDI_FLAG: '',
        DEVICE_FLAG: '',
        STANDARD_USE_COUNT: 0,
        CHECK_DEFECT_FLAG: '',
        COMPONENT_LOCATIONS: '',
        COLLECT_OPERATION_ID: undefined,
        ATTRIBUTE1: '',
        ATTRIBUTE2: ''
      }
      this.defaultAdd = 1
      // 如果是 -1 则从最后新增一条数据
      this.$refs.leftTopTable.insertAt(record, row).then(({ row }) => {
        this.$refs.leftTopTable.setActiveRow(row)
      })
    },
    // 新增零件附件
    addPartsAndAccessoriesClick (row) {
      const record = {
        ID: 0,
        PRODUCT_OBJECT_ID: this.ComponentsAattachments_OBJECT_ID,
        ATTACHMENT_ID: 0,
        DATA_FORMAT: '',
        FIX_VALUE: '',
        ATTACHMENT_QTY: 0,
        ENABLED: 'Y'
      }
      this.defaultAdd = 1
      this.$refs.rightTopTable.insertAt(record, row).then(({ row }) => {
        this.$refs.rightTopTable.setActiveRow(row)
      })
    },
    // 新增替换
    addAlternativeMaterialsClick (row) {
      const record = {
        ID: 0,
        PRODUCT_COMPONENT_ID: this.Substitute_COMPONENT_ID,
        SUBSTITUTE_COMP_PN: '',
        CUSTOMER_COMPONENT_PN: '',
        DATA_FORMAT: '',
        COMPONENT_QTY: 0,
        BEGIN_DATE: '',
        END_DATE: '',
        SERIALIZED: 'Y',
        REWORK_REMOVE_FLAG: 'Y',
        EDI_FLAG: '',
        ENABLED: 'Y',
        DEVICE_FLAG: '',
        STANDARD_USE_COUNT: 0
      }
      this.defaultAdd = 1
      this.$refs.leftBottomTable.insertAt(record, row).then(({ row }) => {
        this.$refs.leftBottomTable.setActiveRow(row)
      })
    },
    // 新增替换附件
    addSubstituteAccessoriesClick (row) {
      const record = {
        ID: 0,
        PRODUCT_OBJECT_ID: this.Annex_OBJECT_ID,
        ATTACHMENT_ID: 0,
        DATA_FORMAT: '',
        FIX_VALUE: '',
        ATTACHMENT_QTY: 0,
        ENABLED: 'Y'
      }
      this.defaultAdd = 1
      this.$refs.rightBottomTable.insertAt(record, row).then(({ row }) => {
        this.$refs.rightBottomTable.setActiveRow(row)
      })
    },
    // 清空
    remove_but () {
      this.mainTable = []
      this.AattachmentsData = []
      this.SubstituteData = []
      this.AnnexData = []
      this.formData.PART_NO = ''
      this.formData.ODM_COMPONENT_PN = ''
      this.formData.CUSTOMER_COMPONENT_PN = ''
    }
    // handleEditClosed () {
    //   console.log('============ handleEditClosed')
    //   let timer = setTimeout(() => {
    //     this.currentRowIndex = -1
    //     clearTimeout(timer)
    //   }, 300)
    // }
  }
}
</script>

<style lang="scss" scoped>
.SfcsProductComponentsHead {
  height: calc(100vh - 450px);
}
.SfcsProductComponentsfooter {
  height: calc(100vh - 500px);
}
.pagination {
  margin-top: 5px;
}
</style>
