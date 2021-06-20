<template>
  <d2-container class="MesSpotcheckHeader">
    <template slot="header">
      <custom-container-header :isExport="false"
                               :isExportTpl="false"
                               :isImport="false">
        <el-select v-model="listQuery.LINE_ID"
                   class="filter-item"
                   style="width:150px">
          &nbsp;
          <el-option :value="0"
                     :label="$t('msh._1')" />
          <el-option v-for="item in Categ"
                     :key="item.ID"
                     :label="item.LINE_NAME"
                     :value="item.ID" />
        </el-select>&nbsp;
        <el-select v-model="listQuery.STATUS"
                   class="filter-item"
                   style="width:150px">
          <el-option v-for="item in statusList"
                     :key="item.ID"
                     :label="item.LINE_NAME"
                     :value="item.ID" />
        </el-select>&nbsp;
        <el-input clearable
                  v-model="listQuery.WO_NO"
                  :placeholder="$t('msh._3')"
                  style="width:150px"
                  @keyup.enter.native="search_but" />&nbsp;
        <el-select v-model="listQuery.RESULT"
                   class="filter-item"
                   style="width:150px">
          <el-option v-for="item in typeOptions"
                     :key="item.STATUS"
                     :label="item.display_name"
                     :value="item.STATUS" />
        </el-select>&nbsp;
        <el-button type="primary"
                   icon="el-icon-search"
                   @click="search_but">
          {{
          $t("msh._5")
          }}
        </el-button>
        <el-button v-if="$btnList.indexOf('MesSpotcheckHeaderAdd') !== -1"
                   type="success"
                   icon="el-icon-plus"
                   @click="add_but">{{ $t("msh._6") }}</el-button>
        <el-button v-if="$btnList.indexOf('MesSpotcheckHeaderAudit') !== -1"
                   type="warning"
                   icon="el-icon-check"
                   @click="reviewClick">{{ $t("msh._7") }}</el-button>
      </custom-container-header>
    </template>
    <!-- 主表格 -->
    <div class="MesSpotcheckHeader-table-dev">
      <el-table v-loading="Loading"
                :data="mainTable"
                width="100%"
                height="100%"
                highlight-current-row
                border
                :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
                @row-click="openDetails">
        >
        <el-table-column :label="$t('msh._8')"
                         min-width="80"
                         align="center"
                         fixed="left">
          <template slot-scope="scope">
            <el-radio v-model="radio"
                      class="hideradio"
                      :label="scope.$index" />
          </template>
        </el-table-column>

        <el-table-column :label="$t('msh._9')"
                         align="center"
                         min-width="120"
                         fixed="left">
          <template slot-scope="scope">{{ (listQuery.Page - 1) * listQuery.Limit + scope.$index + 1 }}</template>
        </el-table-column>

        <el-table-column prop="WO_QTY"
                         :label="$t('msh._124')"
                         align="center"
                         min-width="150"
                         :show-overflow-tooltip="true" />
        <el-table-column prop="ORDER_NO"
                         :label="$t('msh._125')"
                         align="center"
                         min-width="150"
                         :show-overflow-tooltip="true" />
        <el-table-column prop="BATCH_NO"
                         :label="$t('msh._10')"
                         align="center"
                         min-width="150"
                         :show-overflow-tooltip="true" />
        <el-table-column prop="LINE_NAME"
                         :label="$t('msh._11')"
                         align="center"
                         min-width="150"
                         :show-overflow-tooltip="true" />
        <el-table-column prop="WO_NO"
                         :label="$t('msh._12')"
                         align="center"
                         min-width="150"
                         :show-overflow-tooltip="true" />
        <el-table-column prop="STATUS"
                         :label="$t('msh._13')"
                         align="center"
                         min-width="100"
                         :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span v-if="scope.row.STATUS == 0"
                  style="font-weight:800;color:orange">{{ $t("msh._14") }}</span>
            <span v-if="scope.row.STATUS == 3"
                  style="font-weight:800;color:blue">{{ $t("msh._15") }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="PART_NO"
                         :label="$t('msh._16')"
                         align="center"
                         min-width="100"
                         :show-overflow-tooltip="true" />
        <el-table-column prop="PART_NAME"
                         :label="$t('msh._17')"
                         align="center"
                         min-width="150"
                         :show-overflow-tooltip="true" />
        <el-table-column prop="PART_DESC"
                         :label="$t('msh._18')"
                         align="center"
                         min-width="200"
                         :show-overflow-tooltip="true" />
        <el-table-column prop="ALL_QTY"
                         :label="$t('msh._19')"
                         align="center"
                         min-width="160"
                         :show-overflow-tooltip="true" />

        <el-table-column prop="CHECK_QTY"
                         :label="$t('msh._20')"
                         align="center"
                         min-width="130"
                         :show-overflow-tooltip="true" />
        <el-table-column prop="FAIL_QTY"
                         :label="$t('msh._21')"
                         align="center"
                         min-width="130"
                         :show-overflow-tooltip="true" />

        <el-table-column prop="OUTER_CHECK_QTY"
                         :label="$t('msh._126')"
                         align="center"
                         min-width="200"
                         :show-overflow-tooltip="true" />
        <el-table-column prop="OUTER_FAIL_QTY"
                         :label="$t('msh._127')"
                         align="center"
                         min-width="200"
                         :show-overflow-tooltip="true" />

        <el-table-column prop="CHECKER"
                         :label="$t('msh._22')"
                         align="center"
                         min-width="100"
                         :show-overflow-tooltip="true" />
        <el-table-column prop="AUDITOR"
                         :label="$t('msh._23')"
                         align="center"
                         min-width="100"
                         :show-overflow-tooltip="true" />

        <el-table-column prop="RESULT"
                         :label="$t('msh._24')"
                         align="center"
                         fixed="right"
                         min-width="130"
                         :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span v-if="scope.row.RESULT == 0"
                  style="font-weight:800;color:green">{{ $t("msh._25") }}</span>
            <span v-if="scope.row.RESULT == 1"
                  style="font-weight:800;color:blue">{{ $t("msh._26") }}</span>
            <span v-if="scope.row.RESULT == 2"
                  style="font-weight:800;color:orange">{{ $t("msh._27") }}</span>
            <span v-if="scope.row.RESULT == 3"
                  style="font-weight:800;color:red">{{ $t("msh._28") }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="WO_CLASS"
                         :label="$t('msh._122')"
                         align="center"
                         min-width="100"
                         :show-overflow-tooltip="true" />
        <el-table-column prop="REMARK"
                         :label="$t('msh._123')"
                         align="center"
                         min-width="100"
                         :show-overflow-tooltip="true" />
        <el-table-column prop="ENABLED"
                         :label="$t('msh._29')"
                         align="center"
                         fixed="right"
                         min-width="300">
          <template slot-scope="scope">
            <el-button v-if="$btnList.indexOf('MesSpotcheckHeaderedit') !== -1"
                       type="primary"
                       size="small"
                       @click="edit_but(scope.row)">{{ $t("msh._30") }}</el-button>
            <el-button v-if="$btnList.indexOf('MesSpotcheckHeaderdelete') !== -1"
                       type="danger"
                       size="small"
                       @click="remove_but(scope.row)">{{ $t("msh._31") }}</el-button>
            <el-button v-if="$btnList.indexOf('MesSpotcheckHeaderSpotcheck') !== -1"
                       type="success"
                       size="small"
                       @click="Spotcheck_but(scope.row)">{{ $t("msh._32") }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <el-pagination style="padding:20px 0"
                   :current-page="listQuery.Page"
                   :page-sizes="[15, 25, 35, 45]"
                   :page-size="listQuery.Limit"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="total"
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange" />
    <!-- 子表格 -->
    <div class="chilDtable">
      <el-table v-loading="childLoading"
                :data="childTable"
                width="100%"
                height="100%"
                highlight-current-row
                border
                :header-cell-style="{ background: '#eef1f6', color: '#606266' }">
        <el-table-column :label="$t('msh._9')"
                         class="hideradio"
                         align="center"
                         min-width="110"
                         fixed="left">
          <template slot-scope="scope">{{ scope.$index + 1 }}</template>
        </el-table-column>

        <el-table-column prop="SN"
                         :label="$t('msh._33')"
                         align="center"
                         min-width="150"
                         :show-overflow-tooltip="true" />

        <el-table-column prop="STATUS"
                         :label="$t('msh._34')"
                         align="center"
                         min-width="130"
                         :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span v-if="scope.row.STATUS == 'FAIL'"
                  style="font-weight:800;color:red">{{ $t("msh._35") }}</span>
            <span v-if="scope.row.STATUS == 'PASS'"
                  style="font-weight:800;color:green">{{ $t("msh._36") }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="DEFECT_CODE"
                         :label="$t('msh._37')"
                         align="center"
                         min-width="150"
                         :show-overflow-tooltip="true" />
        <el-table-column prop="DEFECT_LOC"
                         :label="$t('msh._38')"
                         align="center"
                         min-width="150"
                         :show-overflow-tooltip="true" />
        <el-table-column prop="DEFECT_DESCRIPTION"
                         :label="$t('msh._39')"
                         align="center"
                         min-width="150"
                         :show-overflow-tooltip="true" />
        <el-table-column prop="DEFECT_MSG"
                         :label="$t('msh._40')"
                         align="center"
                         min-width="150"
                         :show-overflow-tooltip="true" />

        <el-table-column prop="CREATE_TIME"
                         :label="$t('msh._41')"
                         align="center"
                         min-width="200"
                         :show-overflow-tooltip="true" />

        <el-table-column prop="CREATOR"
                         :label="$t('msh._42')"
                         align="center"
                         min-width="130"
                         :show-overflow-tooltip="true" />
        <el-table-column prop="ENABLED"
                         :label="$t('msh._43')"
                         align="center"
                         fixed="right"
                         min-width="200">
          <template slot-scope="scope">
            <el-button v-if="$btnList.indexOf('MesSpotcheckHeaderDetailsedit') !== -1"
                       type="success"
                       size="small"
                       @click="child_edit_but(scope.row)">{{ $t("msh._44") }}</el-button>
            <el-button v-if="$btnList.indexOf('MesSpotcheckHeaderDetailsdelete') !== -1"
                       type="danger"
                       size="small"
                       @click="child_remove_but(scope.row)">{{ $t("msh._45") }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 主表添加、编辑 -->
    <el-dialog v-dialogDrag
               width="50%"
               :title="addorediText"
               :visible.sync="innerVisible"
               append-to-body
               class="MesSpotcheckHeader-dialog"
               :close-on-click-modal="false">
      <el-form ref="form"
               :show-message="false"
               :model="form"
               :rules="rules"
               label-position="top"
               label-width="100px"
               class="MesSpotcheckHeader-form">
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item :label="$t('msh._46')"
                          prop="LINE_ID">
              <el-select v-model="form.LINE_ID"
                         style="width:100%">
                <el-option :value="''"
                           :label="$t('msh._47')" />
                <el-option v-for="item in Categ"
                           :key="item.ID"
                           :label="item.LINE_NAME"
                           :value="item.ID" />
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('msh._48')"
                          prop="PART_NO">
              <el-input v-model="form.PART_NO"
                        :placeholder="$t('msh._49')" />
            </el-form-item>
            <el-form-item :label="$t('msh._54')"
                          prop="PART_DESC">
              <el-input v-model="form.PART_DESC"
                        :placeholder="$t('msh._55')" />
            </el-form-item>
            <el-form-item :label="$t('msh._122')"
                          prop="WO_CLASS">
              <el-select v-model="form.WO_CLASS"
                         :placeholder="$t('msh._138')"
                         class="filter-item"
                         style="width:100%">
                <el-option :value="1"
                           :label="$t('msh._136')" />
                <el-option :value="2"
                           :label="$t('msh._137')" />
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('msh._58')"
                          prop="CHECK_QTY">
              <el-input v-model="form.CHECK_QTY"
                        min="1"
                        type="number"
                        :disabled="read"
                        :placeholder="$t('msh._59')" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('msh._50')"
                          prop="WO_NO">
              <el-input v-model="form.WO_NO"
                        :placeholder="$t('msh._51')"
                        @change="WorkOrder" />
            </el-form-item>
            <el-form-item :label="$t('msh._52')"
                          prop="PART_NAME">
              <el-input v-model="form.PART_NAME"
                        :placeholder="$t('msh._53')" />
            </el-form-item>
            <el-form-item :label="$t('msh._124')"
                          prop="WO_QTY">
              <el-input v-model="form.WO_QTY"
                        :placeholder="$t('msh._134')" />
            </el-form-item>
            <el-form-item :label="$t('msh._56')"
                          prop="ALL_QTY">
              <el-input v-model="form.ALL_QTY"
                        min="1"
                        type="number"
                        :placeholder="$t('msh._57')" />
            </el-form-item>

            <el-form-item :label="$t('msh._126')"
                          prop="OUTER_CHECK_QTY">
              <el-input v-model="form.OUTER_CHECK_QTY"
                        :placeholder="$t('msh._139')" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item :label="$t('msh._123')">
              <el-input v-model="form.REMARK"
                        type="textarea"
                        :placeholder="$t('msh._135')" />
            </el-form-item>
          </el-col>
        </el-row>
        <div class="MesSpotcheckHeader-dialog-button">
          <el-button type="primary"
                     @click="shout_but('form')">&nbsp;{{ $t("msh._60") }}&nbsp;</el-button>
          <el-button @click="reset_but">&nbsp;{{ $t("msh._61") }}&nbsp;</el-button>
        </div>
      </el-form>
    </el-dialog>
    <!-- 审核 -->
    <el-dialog v-dialogDrag
               :title="$t('msh._62')"
               width="40%"
               :visible.sync="reviewVisible"
               :close-on-click-modal="false">
      <el-form>
        <el-form-item :label="$t('msh._63')">
          <el-radio-group v-model="reviewForm.ResultStatus">
            <el-radio v-model="reviewForm.ResultStatus"
                      :label="0">
              <span style="font-weight:800;color:green">
                {{
                $t("msh._64")
                }}
              </span>
            </el-radio>
            <el-radio v-model="reviewForm.ResultStatus"
                      :label="1">
              <span style="font-weight:800;color:blue">
                {{
                $t("msh._65")
                }}
              </span>
            </el-radio>
            <el-radio v-model="reviewForm.ResultStatus"
                      :label="2">
              <span style="font-weight:800;color:orange">
                {{
                $t("msh._66")
                }}
              </span>
            </el-radio>
            <el-radio v-model="reviewForm.ResultStatus"
                      :label="3">
              <span style="font-weight:800;color:red">{{ $t("msh._67") }}</span>
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item align="center">
          <el-button type="primary"
                     @click="ReviewSubmit">
            {{
            $t("msh._60")
            }}
          </el-button>
          <el-button @click="reviewVisible = false">
            {{
            $t("msh._68")
            }}
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 抽检记录 -->
    <el-dialog v-dialogDrag
               width="40%"
               :title="checkText"
               :visible.sync="checkVisible"
               append-to-body
               class="MesSpotcheckHeader-dialog"
               :close-on-click-modal="false"
               @close="check_reset_but">
      <el-form label-width="90px">
        <el-form-item :label="$t('msh._69')">
          <el-input v-model="checkform.SN"
                    :placeholder="$t('msh._70')" />
        </el-form-item>
        <el-form-item :label="$t('msh._71')">
          <el-radio v-model="checkform.STATUS"
                    :value="checkform.STATUS"
                    label="PASS">{{ $t("msh._72") }}</el-radio>
          <el-radio v-model="checkform.STATUS"
                    :value="checkform.STATUS"
                    label="FAIL">{{ $t("msh._73") }}</el-radio>
        </el-form-item>
        <div v-if="checkform.STATUS == 'FAIL'">
          <el-form-item :label="$t('msh._74')">
            <el-input v-model="checkform.DEFECT_CODE"
                      readonly
                      :placeholder="$t('msh._75')"
                      @focus="defect_but" />
          </el-form-item>
          <el-form-item :label="$t('msh._76')">
            <el-input v-model="checkform.DEFECT_LOC"
                      :placeholder="$t('msh._77')" />
          </el-form-item>
          <el-form-item :label="$t('msh._78')">
            <el-input v-model="checkform.DEFECT_DESCRIPTION"
                      readonly
                      :placeholder="$t('msh._79')" />
          </el-form-item>
          <el-form-item :label="$t('msh._80')">
            <el-input v-model="checkform.DEFECT_MSG"
                      :placeholder="$t('msh._81')" />
          </el-form-item>
        </div>
        <div class="MesSpotcheckHeader-dialog-button">
          <el-button type="primary"
                     @click="check_shout_but">&nbsp;{{ $t("msh._60") }}&nbsp;</el-button>
          <el-button @click="check_reset_but">&nbsp;{{ $t("msh._61") }}&nbsp;</el-button>
        </div>
      </el-form>
      <el-dialog v-dialogDrag
                 width="60%"
                 :title="$t('msh._82')"
                 :visible.sync="badVisible"
                 append-to-body
                 class="MesSpotcheckHeader-dialog"
                 :close-on-click-modal="false">
        <div class="header-container"
             style="padding-bottom: 10px;">
          <el-select v-model="fectVal.DEFECT_TYPE"
                     class="filter-item"
                     style="width:150px"
                     :placeholder="$t('msh._83')">
            <el-option :value="0"
                       :label="$t('msh._83')" />
            <el-option v-for="item in TypeList"
                       :key="item.LOOKUP_CODE"
                       :label="item.CHINESE"
                       :value="item.LOOKUP_CODE" />
          </el-select>&nbsp;
          <el-select v-model="fectVal.DEFECT_CLASS"
                     class="filter-item"
                     style="width:150px"
                     :placeholder="$t('msh._84')">
            <el-option :value="0"
                       :label="$t('msh._84')" />
            <el-option v-for="item in ClassList"
                       :key="item.LOOKUP_CODE"
                       :label="item.CHINESE"
                       :value="item.LOOKUP_CODE" />
          </el-select>&nbsp;
          <el-select v-model="fectVal.DEFECT_CATEGORY"
                     class="filter-item"
                     style="width:150px"
                     :placeholder="$t('msh._85')">
            <el-option :value="0"
                       :label="$t('msh._85')" />
            <el-option v-for="item in CategoryList"
                       :key="item.LOOKUP_CODE"
                       :label="item.CHINESE"
                       :value="item.LOOKUP_CODE" />
          </el-select>&nbsp;
          <el-select v-model="fectVal.DEFECT_LEVEL_CODE"
                     class="filter-item"
                     style="width:150px"
                     :placeholder="$t('msh._86')">
            <el-option :value="0"
                       :label="$t('msh._86')" />
            <el-option v-for="item in LevelList"
                       :key="item.LOOKUP_CODE"
                       :label="item.CHINESE"
                       :value="item.LOOKUP_CODE" />
          </el-select>&nbsp;
          <el-button type="primary"
                     icon="el-icon-search"
                     @click="badTable_search">{{ $t("msh._5") }}</el-button>
          <el-button type="success"
                     @click="badClick">
            {{
            $t("msh._60")
            }}
          </el-button>
        </div>
        <div class="container-table">
          <vxe-table v-loading="badLoading"
                     :data="badTable"
                     width="100%"
                     height="100%"
                     highlight-current-row
                     keep-source
                     highlight-hover-row
                     show-overflow
                     border
                     class="bad-table"
                     :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
                     :edit-config="{ mode: 'row', showStatus: true}"
                     :radio-config="{labelField: 'name', trigger: 'row'}"
                     @cell-click="badDetails">
            <!--  @cell-dblclick="baddblclick" -->
            <vxe-table-column show-overflow
                              :title="$t('spf._38')"
                              type="radio"
                              width="80"
                              align="center" />
            <vxe-table-column align="center"
                              :title="$t('SamplingBadDetails._6')">
              <template slot-scope="scope">
                <span>{{scope.$rowIndex+1}}</span>
              </template>
            </vxe-table-column>
            <vxe-table-column field="DEFECT_TYPE"
                              :label="$t('msh._128')"
                              align="center"
                              :edit-render="{name: 'select', options: TypeListbox}" />
            <vxe-table-column field="DEFECT_CLASS"
                              :label="$t('msh._130')"
                              align="center"
                              :edit-render="{name: 'select', options: ClassListbox}" />

            <vxe-table-column field="DEFECT_CATEGORY"
                              :label="$t('msh._129')"
                              align="center"
                              :edit-render="{name: 'select', options: CategoryListbox}" />
            <vxe-table-column field="LEVEL_CODE"
                              :title="$t('msh._131')"
                              :edit-render="{name: 'select', options: LevelListbox}"
                              align="center" />
            <vxe-table-column field="DEFECT_CODE"
                              :label="$t('msh._132')"
                              align="center" />
            <vxe-table-column field="CHINESE_DESCRIPTION"
                              :label="$t('msh._133')"
                              align="center" />
          </vxe-table>
        </div>
      </el-dialog>
    </el-dialog>
  </d2-container>
</template>
<script>
import helper from '@/api/MesSpotcheckHeader'
import customContainerHeader from '@/components/custom-container-header'
import { mapGetters } from 'vuex'
const API = helper('MesSpotcheckHeader')
export default {
  name: 'MesSpotcheckHeader',
  components: {
    customContainerHeader
  },
  data () {
    return {
      Loading: false,
      childLoading: false,
      addorediText: '',
      listQuery: {
        Page: 1,
        Limit: 15,
        LINE_ID: 0, // 线
        STATUS: -1, // 状态
        WO_NO: '', // 工单号
        RESULT: -1 // 结果
      },
      mainSTATUS: 0,
      total: 0, // 总页
      radio: '',
      Categ: [],
      statusList: [
        {
          ID: -1,
          LINE_NAME: this.$t('msh._860')
        },
        {
          ID: 0,
          LINE_NAME: this.$t('msh._87')
        },
        {
          ID: 3,
          LINE_NAME: this.$t('msh._15')
        }
      ],
      typeOptions: [
        {
          STATUS: -1,
          display_name: this.$t('msh._89')
        },
        {
          STATUS: 0,
          display_name: this.$t('msh._64')
        },
        {
          STATUS: 1,
          display_name: this.$t('msh._65')
        },
        {
          STATUS: 2,
          display_name: this.$t('msh._66')
        },
        {
          STATUS: 3,
          display_name: this.$t('msh._67')
        }
      ],
      mainTable: [],
      childTable: [],
      // 主表编辑和添加下拉
      innerVisible: false,
      form: {
        LINE_ID: 0,
        WO_NO: '',
        PART_NO: '',
        PART_NAME: '',
        PART_DESC: '',
        ALL_QTY: '',
        CHECK_QTY: '',
        LINE_TYPE: 'PCBA',
        WO_QTY: '',
        REMARK: '',
        WO_CLASS: '',
        OUTER_CHECK_QTY: ''
      },
      read: false,
      rules: {
        LINE_ID: [
          { required: true, message: this.$t('msh._90'), trigger: 'change' }
        ],
        WO_NO: [
          { required: true, message: this.$t('msh._91'), trigger: 'blur' }
        ],
        PART_NO: [
          { required: true, message: this.$t('msh._92'), trigger: 'blur' }
        ],
        PART_NAME: [
          { required: true, message: this.$t('msh._93'), trigger: 'blur' }
        ],
        PART_DESC: [
          { required: true, message: this.$t('msh._94'), trigger: 'blur' }
        ],

        ALL_QTY: [
          { required: true, message: this.$t('msh._95'), trigger: 'blur' }
        ],
        CHECK_QTY: [
          { required: true, message: this.$t('msh._96'), trigger: 'blur' }
        ],
        WO_QTY: [
          { required: true, message: this.$t('msh._134'), trigger: 'blur' }
        ],
        WO_CLASS: [
          { required: true, message: this.$t('msh._138'), trigger: 'change' }
        ],
        OUTER_CHECK_QTY: [
          { required: true, message: this.$t('msh._139'), trigger: 'blur' }
        ]
      },
      // 抽检记录
      checkText: '',
      checkVisible: false,
      checkform: {
        ID: 0,
        BATCH_NO: '', // 抽检批次号
        SN: '', // 流水号
        STATUS: 'PASS', // 状态
        DEFECT_CODE: '', // 不良代码
        DEFECT_LOC: '', // 不良位号
        DEFECT_DESCRIPTION: '', // 不良描述
        DEFECT_MSG: '', // 不良想象
        CREATOR: ''
      },
      // 不良信息
      badLoading: false,
      badVisible: false,
      badradio: '',
      badTable: [],
      TypeList: [],
      ClassList: [],
      CategoryList: [],
      LevelList: [],
      CategoryListbox: [],
      LevelListbox: [],
      ClassListbox: [],
      TypeListbox: [],
      fectVal: {
        Page: 1,
        Limit: 10,
        DEFECT_TYPE: 0,
        DEFECT_CLASS: 0,
        DEFECT_CATEGORY: 0,
        DEFECT_LEVEL_CODE: 0
      },
      fectValtotal: 0,
      reviewForm: {
        ResultStatus: 0,
        Batch: '',
        AuditUser: ''
      },
      reviewVisible: false,
      badArr: []
    }
  },
  computed: {
    ...mapGetters(['userinfo'])
  },
  created () {
    this.getInd()
    this.getList()
    this.SelectDefect()
    this.reviewForm.AuditUser = this.userinfo.USER_NAME
    this.checkform.CREATOR = this.userinfo.USER_NAME
  },
  methods: {
    // 获取下拉列表
    async getInd () {
      const res = await API.Index()
      console.log(res, '获取下拉列表')
      this.Categ = res.Result
    },
    // 获取主表
    async getList () {
      this.Loading = true
      const res = await API.LoadData(this.listQuery)
      if (res.Result) {
        const data = JSON.parse(res.Result)
        console.log(data, '获取列表----------')
        this.mainTable = data
        this.total = res.TotalCount
      }
      this.Loading = false
    },
    // 主表搜索
    search_but () {
      this.listQuery.Page = 1
      this.getList()
    },
    // 主表点击获取表格一行数据
    openDetails (row, column, event) {
      this.mainSTATUS = row.STATUS
      this.reviewForm.Batch = row.BATCH_NO
      console.log(row, 'rowrowrow')
      this.radio = this.mainTable.indexOf(row)
      this.getDatail(row.BATCH_NO)
    },

    // 获取明细数据
    async getDatail (id) {
      const res = await API.GetDatailData(id)
      const data = JSON.parse(res.Result)
      console.log(data, '获取列表')
      this.childTable = data
    },
    // 主表分页
    handleSizeChange (val) {
      this.listQuery.Limit = val
      this.getList()
    },
    handleCurrentChange (val) {
      this.listQuery.Page = val
      this.getList()
    },
    // 输入工单回车
    async WorkOrder () {
      if (this.form.WO_NO !== '') {
        console.log(this.form.WO_NO, '输入工单回车值')
        const res = await API.GetPartDataByWoNo(this.form.WO_NO)
        const data = JSON.parse(res.Result)
        if (data) {
          this.form.PART_NO = data.PART_NO
          this.form.WO_NO = data.WO_NO
          this.form.PART_NAME = data.PART_NAME
          this.form.PART_DESC = data.PART_DESC
        } else {
          this.form.WO_NO = ''
          this.$message({
            showClose: true,
            type: 'warning',
            message: this.$t('msh._120')
          })
        }
      }
    },
    // 主表编辑
    edit_but (row) {
      this.form.LINE_ID = row.LINE_ID
      this.form.WO_NO = row.WO_NO
      this.form.PART_NO = row.PART_NO
      this.form.PART_NAME = row.PART_NAME
      this.form.PART_DESC = row.PART_DESC
      this.form.ALL_QTY = row.ALL_QTY
      this.form.CHECK_QTY = row.CHECK_QTY
      this.form.LINE_TYPE = row.LINE_TYPE
      this.form.WO_QTY = row.WO_QTY
      this.form.WO_CLASS = row.WO_CLASS
      this.form.REMARK = row.REMARK
      this.form.OUTER_CHECK_QTY = row.OUTER_CHECK_QTY
      if (row.LINE_TYPE === 'SMT') {
        this.read = true
      } else {
        this.read = false
      }
      if (row.STATUS !== 0) {
        this.$message({
          showClose: true,
          type: 'warning',
          message: this.$t('msh._97')
        })
        return
      }
      this.addorediText = this.$t('msh._30')
      this.innerVisible = true
    },
    // 主表添加
    add_but () {
      this.Eliminate()
      this.addorediText = this.$t('msh._98')
      this.innerVisible = true
    },
    // 主表删除
    remove_but (row) {
      if (row.STATUS !== 0) {
        this.$message({
          showClose: true,
          type: 'warning',
          message: this.$t('msh._99')
        })
        return
      }
      this.$confirm(
        this.$t('msh._100') + row.BATCH_NO + this.$t('msh._101'),
        this.$t('msh._102'),
        {
          type: 'warning'
        }
      )
        .then(() => {
          API.DeleteOneById(row.BATCH_NO).then((res) => {
            if (res.Result) {
              this.$notify({
                title: this.$t('msh._103'),
                message: this.$t('msh._104'),
                type: 'success',
                duration: 2000
              })
              this.getList()
            }
          })
        })
        .catch(() => { })
    },
    // 审核
    reviewClick () {
      console.log(this.reviewForm)
      if (this.reviewForm.Batch === '') {
        this.$message({
          showClose: true,
          type: 'warning',
          message: this.$t('msh._105')
        })
        return
      }
      if (this.mainSTATUS !== 0) {
        this.$message({
          showClose: true,
          type: 'warning',
          message: this.$t('msh._106')
        })
        return
      }
      this.reviewVisible = true
    },
    // 审核提交
    ReviewSubmit () {
      this.$confirm(
        this.$t('msh._107') + this.reviewForm.Batch + this.$t('msh._108'),
        this.$t('msh._102'),
        {
          type: 'warning'
        }
      )
        .then(() => {
          API.AuditSpotCheck(this.reviewForm)
            .then((res) => {
              if (res.Result) {
                this.$notify({
                  title: this.$t('msh._103'),
                  message: this.$t('msh._109'),
                  type: 'success',
                  duration: 2000
                })
                this.getList()
              }
              this.reviewVisible = false
            })
            .catch((res) => {
              console.log('======= catch')
              this.reviewVisible = false
              this.getList()
              // this.$message.error('审核失败')
            })
        })
        .catch(() => { })
    },
    // 主表确定
    shout_but (formName) {
      if (this.form.ALL_QTY <= 0) {
        this.$message({
          showClose: true,
          message: this.$t('msh._110'),
          type: 'warning'
        })
        return false
      }
      if (this.form.CHECK_QTY <= 0) {
        this.$message({
          showClose: true,
          message: this.$t('msh._111'),
          type: 'warning'
        })
        return false
      }
      var Textsuccess = ''
      if (this.form.LINE_ID === '') {
        Textsuccess = this.$t('msh._112')
      } else {
        Textsuccess = this.$t('msh._113')
      }
      // this.$refs[formName].validate(valid => {
      console.log(JSON.stringify(this.form), 'this.form')
      this.$refs.form.validate(async (valid, errInfo) => {
        if (valid) {
          const res = await API.ChangeEnabled(this.form)
          if (res.Result) {
            this.innerVisible = false
            this.getList()
            this.$notify({
              title: this.$t('msh._103'),
              message: Textsuccess,
              type: 'success',
              duration: 2000
            })
          }
        } else {
          console.log('errInfo: ', errInfo) // rules
          try {
            Object.keys(errInfo).forEach((item) => {
              this.$message.error(errInfo[item][0].message)
              throw new Error(new Date().toLocaleString())
            })
          } catch { }
        }
      })
    },
    // 主表重置
    reset_but () {
      this.form.WO_NO = ''
      this.form.PART_NO = ''
      this.form.PART_NAME = ''
      this.form.PART_DESC = ''
      this.form.ALL_QTY = ''
      this.form.CHECK_QTY = ''
      this.form.LINE_TYPE = ''
      this.form.WO_QTY = ''
      this.form.REMARK = ''
      this.form.WO_CLASS = ''
      this.form.OUTER_CHECK_QTY = ''
    },

    // 抽检记录
    Spotcheck_but (row) {
      if (row.STATUS !== 0) {
        this.$message({
          showClose: true,
          type: 'warning',
          message: this.$t('msh._114')
        })
        return
      }
      console.log(row, 'row抽检记录')
      this.clear()
      // this.checkform.ID = row.LINE_ID
      this.checkform.BATCH_NO = row.BATCH_NO
      this.checkText = this.$t('msh._115')
      this.checkVisible = true
    },
    // 获取下拉列表
    async SelectDefect () {
      const res = await API.SelectDefectIndex()
      const data = res.Result
      this.TypeList = data.TypeList
      this.ClassList = data.ClassList
      this.CategoryList = data.CategoryList
      this.LevelList = data.LevelList
      this.LevelListbox.push({
        label: '',
        value: '',
        disabled: false
      })
      this.LevelList.map((item) => {
        this.LevelListbox.push({
          label: item.CHINESE,
          value: Number(item.LOOKUP_CODE),
          disabled: false
        })
      })
      this.CategoryListbox.push({
        label: '',
        value: '',
        disabled: false
      })
      this.CategoryList.map((item) => {
        this.CategoryListbox.push({
          label: item.CHINESE,
          value: Number(item.LOOKUP_CODE),
          disabled: false
        })
      })
      this.ClassListbox.push({
        label: '',
        value: '',
        disabled: false
      })
      this.ClassList.map((item) => {
        this.ClassListbox.push({
          label: item.CHINESE,
          value: Number(item.LOOKUP_CODE),
          disabled: false
        })
      })

      this.TypeListbox.push({
        label: '',
        value: '',
        disabled: false
      })
      this.TypeList.map((item) => {
        this.TypeListbox.push({
          label: item.CHINESE,
          value: Number(item.LOOKUP_CODE),
          disabled: false
        })
      })

      console.log(res, '获取下拉列表')
    },
    // 不良代码触发事件并获取
    async defect_but () {
      this.getLoadDefectData()
      this.badVisible = true
      console.log('不良代码触发事件')
    },
    // 获取不良table
    async getLoadDefectData () {
      const res = await API.LoadDefectData(this.fectVal)
      this.badTable = JSON.parse(res.Result)
      console.log('==========xxxxx', this.badTable)
      this.fectValtotal = res.TotalCount
    },
    fectValhandleSizeChange (row) {
      this.fectVal.Limit = row
      this.getLoadDefectData()
    },
    fectValhandleCurrentChange (val) {
      this.fectVal.Page = val
      this.getLoadDefectData()
    },
    // 关闭
    // closeClick () {
    //   this.checkform.STATUS = 'FAIL'
    // },
    // 抽筋记录和子表编辑提交
    check_shout_but () {
      console.log(this.checkform, 'this.checkformthis.checkform')
      if (this.checkform.STATUS === 'FAIL') {
        if (
          this.checkform.DEFECT_CODE === '' ||
          this.checkform.DEFECT_CODE === null
        ) {
          this.$message({
            showClose: true,
            type: 'warning',
            message: this.$t('msh._116')
          })
          return
        }
      }
      API.AddOrEditDetail(this.checkform)
        .then((res) => {
          if (res.Result) {
            this.checkVisible = false
            this.$notify({
              title: this.$t('msh._103'),
              message: this.$t('msh._117'),
              type: 'success',
              duration: 2000
            })
            this.getList()
            if (this.reviewForm.Batch) {
              this.getDatail(this.reviewForm.Batch)
            }
          }
        })
        .catch((res) => {
          this.checkVisible = false
          this.getList()
        })
    },
    // 重置
    check_reset_but () {
      this.checkform.SN = '' // 流水号
      this.checkform.STATUS = 'PASS' // 状态
      this.checkform.DEFECT_CODE = '' // 不良代码
      this.checkform.DEFECT_LOC = '' // 不良位号
      this.checkform.DEFECT_DESCRIPTION = '' // 不良描述
      this.checkform.DEFECT_MSG = '' // 不良想象
    },
    //  点击选中不良项
    badDetails (e) {
      this.badradio = this.badTable.indexOf(e.row)
      this.badArr = e.row
    },
    radioChangeEvent (row) { },
    badClick () {
      if (this.badArr.length !== 0) {
        this.checkform.DEFECT_CODE = this.badArr.DEFECT_CODE
        this.checkform.DEFECT_DESCRIPTION = this.badArr.DEFECT_DESCRIPTION
        this.badVisible = false
        this.badradio = ''
      } else {
        this.$message({
          showClose: true,
          type: 'warning',
          message: this.$t('msh._121')
        })
      }
    },
    //  双击事件选中
    // baddblclick (row) {
    //   this.checkform.DEFECT_CODE = row.DEFECT_CODE
    //   this.checkform.DEFECT_DESCRIPTION = row.DEFECT_DESCRIPTION
    //   console.log(row, '双击事件选中')
    //   this.badVisible = false
    //   this.badradio = ''
    // },
    //  搜索
    badTable_search () {
      this.fectVal.Page = 1
      this.getLoadDefectData()
    },
    // 子表编辑
    child_edit_but (row) {
      this.checkform.ID = row.ID
      this.checkform.SN = row.SN
      this.checkform.STATUS = row.STATUS
      this.checkform.DEFECT_CODE = row.DEFECT_CODE
      this.checkform.DEFECT_LOC = row.DEFECT_LOC
      this.checkform.DEFECT_DESCRIPTION = row.DEFECT_DESCRIPTION
      this.checkform.DEFECT_MSG = row.DEFECT_MSG
      console.log(row)
      this.checkText = this.$t('msh._119')
      this.checkVisible = true
    },
    // 子表删除
    child_remove_but (row) {
      var clidVal = {
        ID: row.ID,
        Batch: row.BATCH_NO
      }
      this.$confirm(this.$t('msh._118'), this.$t('msh._102'), {
        type: 'warning'
      })
        .then(() => {
          API.DeleteDetail(clidVal)
            .then((res) => {
              if (res.Result) {
                this.$notify({
                  title: this.$t('msh._103'),
                  message: this.$t('msh._104'),
                  type: 'success',
                  duration: 2000
                })
                this.getDatail(this.reviewForm.Batch)
              }
            })
            .catch((res) => {
              this.getDatail(this.reviewForm.Batch)
            })
        })
        .catch(() => { })
    },
    // 主表清空
    Eliminate () {
      this.form = {
        LINE_ID: '',
        WO_NO: '',
        PART_NO: '',
        PART_NAME: '',
        PART_DESC: '',
        ALL_QTY: '',
        CHECK_QTY: '',
        LINE_TYPE: 'PCBA',
        WO_QTY: '',
        REMARK: '',
        WO_CLASS: '',
        OUTER_CHECK_QTY: ''
      }
      this.read = false
    },
    clear () {
      this.fectVal = {
        Page: 1,
        Limit: 10,
        DEFECT_TYPE: 0,
        DEFECT_CLASS: 0,
        DEFECT_CATEGORY: 0,
        DEFECT_LEVEL_CODE: 0
      }
    }
  }
}
</script>
<style>
.MesSpotcheckHeader .hideradio .el-radio__label {
  display: none;
}
.MesSpotcheckHeader-dialog .el-dialog__body {
  padding: 10px 20px;
  padding-bottom: 15px;
}
.MesSpotcheckHeader-dialog-title {
  background-color: #3e9ce2;
  width: 70px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  color: #fff;
  margin-bottom: 10px;
}
.MesSpotcheckHeader-dialog-area label {
  display: flex;
  align-items: center;
  font-weight: 500;
  margin-bottom: 10px;
}
.MesSpotcheckHeader-dialog-area label span {
  width: 115px;
}
.MesSpotcheckHeader-dialog-button {
  color: #fff;
  text-align: center;
}
/* 隐藏单选文字 */
.MesSpotcheckHeader-table-dev .el-radio__label {
  display: none;
}
.bad-table .el-radio__label {
  display: none;
}
.MesSpotcheckHeader-table-dev {
  height: calc(100vh - 465px);
}
.MesSpotcheckHeader .chilDtable {
  /* height: calc(100vh - 545px); */
  height: calc(100vh - 60px - 41px - 53px - 221px - 68px - 20px);
}
.container-table {
  height: calc(100vh - 490px);
}
.MesSpotcheckHeader .header-container {
  padding-bottom: 10px;
}
.MesSpotcheckHeader-dialog .MesSpotcheckHeader-form .el-form-item__label {
  padding: 0;
}
</style>
