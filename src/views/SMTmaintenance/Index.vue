<template>
  <custom-container class="SMTmaintenance">
    <template slot="header">
      <custom-container-header defaultTotalPage="total"
                               defaultLoadingFlag="listLoading"
                               defaultFormData="listQuery"
                               exportMehodsName="exportData">
        <el-select style="width: 140px"
                   clearable
                   @clear="clearLINE"
                   v-model="MstQuery.LINE_ID"
                   :placeholder="$t('SMTmaintenance._1')">
          <el-option v-for="item in LinesList"
                     :key="item.ID"
                     :label="item.LINE_NAME"
                     :value="item.ID" />
        </el-select>
        <el-select style="width: 140px"
                   clearable
                   v-model="MstQuery.WORK_CLASS"
                   :placeholder="$t('SMTmaintenance._2')">
          <el-option :label="$t('SMTmaintenance._3')"
                     :value="1" />
          <el-option :label="$t('SMTmaintenance._4')"
                     :value="2" />
        </el-select>
        <el-input v-model="MstQuery.WO_NO"
                  :placeholder="$t('SMTmaintenance._6')"
                  clearable
                  style="width: 140px"
                  @input="MstSearch"
                  @keyup.enter.native="MstSearch" />&nbsp;
        <el-input v-model="MstQuery.PART_NO"
                  :placeholder="$t('SMTmaintenance._5')"
                  clearable
                  style="width: 140px"
                  @input="MstSearch"
                  @keyup.enter.native="MstSearch" />&nbsp;
        <el-select style="width: 140px"
                   clearable
                   v-model="MstQuery.STATUS"
                   :placeholder="$t('SMTmaintenance._7')">
          <el-option v-for="item in STATUSList"
                     :key="item.ID"
                     :label="item.NAME"
                     :value="item.ID" />
        </el-select>
        <el-date-picker v-model="datarange"
                        type="daterange"
                        clearable
                        style="width: 220px; margin-right: 10px"
                        :start-placeholder="$t('SOPRoutes._4')"
                        :end-placeholder="$t('SOPRoutes._5')"
                        align="right"
                        value-format="yyyy-MM-dd" />
        <el-button type="primary"
                   icon="el-icon-search"
                   @click.prevent="MstSearch">{{ $t("publics.btn.search") }}</el-button>
        <el-button type="success"
                   v-if="$btnList.indexOf('SmtDefectsRecordsAdd') !== -1"
                   icon="el-icon-plus"
                   @click.prevent="MstAdd">{{ $t("publics.btn.add") }}</el-button>
        <el-button type="danger"
                   v-if="$btnList.indexOf('SmtDefectsRecordsDelete') !== -1"
                   @click.prevent="MstDelete">{{ $t("SMTmaintenance._8") }}</el-button>
        <el-button type="primary"
                   v-if="$btnList.indexOf('SmtDefectsRecordsCheck') !== -1"
                   @click.prevent="AuditClick">{{ $t("SMTmaintenance._9") }}</el-button>
        <el-button type="warning"
                   v-if="$btnList.indexOf('SmtDefectsRecordsCancelCheck') !== -1"
                   @click.prevent="CancelAudit">{{ $t("SMTmaintenance._10") }}</el-button>
      </custom-container-header>
    </template>
    <div class="msttable">
      <vxe-table ref="xTable"
                 border
                 stripe
                 keep-source
                 highlight-hover-row
                 highlight-current-row
                 show-overflow
                 auto-resize
                 width="100%"
                 height="100%"
                 :seq-config="{ startIndex: (MstQuery.Page - 1) * MstQuery.Limit }"
                 :radio-config="{ labelField: 'name', trigger: 'row' }"
                 :data="MstTable"
                 :edit-config="{ trigger: 'click', mode: 'row', mode: 'cell' }"
                 @cell-click="MSTcellClick">
        <vxe-table-column show-overflow
                          :title="$t('MesMessageReceiverGroup._4')"
                          min-width="70"
                          type="radio"
                          align="center" />
        <vxe-table-column type="seq"
                          min-width="70"
                          :title="$t('se_cc.sn')"
                          :edit-render="{ name: 'input' }"
                          align="center" />
        <vxe-table-column show-overflow
                          min-width="200"
                          field="REPAIR_NO"
                          :title="$t('SMTmaintenance._11')"
                          :edit-render="{ name: '$input', props: { readonly: true } }"
                          align="center" />
        <vxe-table-column show-overflow
                          min-width="200"
                          field="LINE_ID"
                          :title="$t('SMTmaintenance._12')"
                          :edit-render="{ name: 'select', options: Linesbox }"
                          align="center" />

        <vxe-table-column show-overflow
                          min-width="100"
                          field="WORK_CLASS"
                          :title="$t('SMTmaintenance._13')"
                          :edit-render="{ name: '$input', props: { readonly: true } }"
                          align="center">
          <template v-slot="{ row }">
            <span v-if="row.WORK_CLASS == 1">{{
              $t("SMTmaintenance._3")
            }}</span>
            <span v-if="row.WORK_CLASS == 2">{{
              $t("SMTmaintenance._4")
            }}</span>
          </template>
        </vxe-table-column>
        <vxe-table-column show-overflow
                          min-width="180"
                          field="ORDER_NO"
                          :title="$t('SMTmaintenance._14')"
                          :edit-render="{ name: '$input', props: { readonly: true } }"
                          align="center" />
        <vxe-table-column show-overflow
                          min-width="180"
                          field="WO_NO"
                          :title="$t('SMTmaintenance._15')"
                          :edit-render="{ name: '$input', props: { readonly: true } }"
                          align="center" />
        <vxe-table-column show-overflow
                          min-width="170"
                          field="PART_NO"
                          :title="$t('SMTmaintenance._16')"
                          :edit-render="{ name: '$input', props: { readonly: true } }"
                          align="center" />
        <vxe-table-column show-overflow
                          min-width="160"
                          field="MODEL"
                          :title="$t('SMTmaintenance._17')"
                          :edit-render="{ name: '$input', props: { readonly: true } }"
                          align="center" />
        <vxe-table-column show-overflow
                          min-width="180"
                          field="REPAIR_USER"
                          :title="$t('SMTmaintenance._18')"
                          :edit-render="{ name: '$input', props: { readonly: true } }"
                          align="center" />
        <vxe-table-column show-overflow
                          min-width="120"
                          field="REPAIR_TIME"
                          :title="$t('SMTmaintenance._19')"
                          :edit-render="{ name: '$input', props: { readonly: true } }"
                          align="center" />
        <vxe-table-column show-overflow
                          min-width="120"
                          field="EXAMINE_USER"
                          :title="$t('SMTmaintenance._20')"
                          :edit-render="{ name: '$input', props: { readonly: true } }"
                          align="center" />
        <vxe-table-column show-overflow
                          min-width="120"
                          field="EXAMINE_TIME"
                          :title="$t('SMTmaintenance._21')"
                          :edit-render="{ name: '$input', props: { readonly: true } }"
                          align="center" />
        <vxe-table-column show-overflow
                          fixed="right"
                          min-width="120"
                          field="STATUS"
                          :title="$t('SMTmaintenance._22')"
                          :edit-render="{ name: '$input', props: { readonly: true } }"
                          align="center">
          <template v-slot="{ row }">
            <span v-if="row.STATUS == 1">{{ $t("SMTmaintenance._23") }}</span>
            <span v-if="row.STATUS == 2">{{ $t("SMTmaintenance._24") }}</span>
          </template>
        </vxe-table-column>
        <vxe-table-column :title="$t('MesMessageReceiverGroup._10')"
                          align="center"
                          min-width="90"
                          fixed="right">
          <template v-slot="{ row }">
            <el-button type="success"
                       v-if="$btnList.indexOf('SmtDefectsRecordsSaveData') !== -1"
                       @click="MSTeditClick(row)">{{ $t("SMTmaintenance._25") }}</el-button>
          </template>
        </vxe-table-column>
      </vxe-table>
    </div>
    <el-pagination :current-page="MstQuery.Page"
                   style="margin: 10px 0"
                   :page-size="MstQuery.Limit"
                   :page-sizes="[15, 25, 35, 45]"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="Msttotal"
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange" />
    <div class="chidtable">
      <vxe-table ref="xTable2"
                 border
                 stripe
                 keep-source
                 highlight-hover-row
                 highlight-current-row
                 show-overflow
                 auto-resize
                 width="100%"
                 height="100%"
                 :radio-config="{ labelField: 'name', trigger: 'row' }"
                 :data="ChildTable"
                 :edit-config="{ trigger: 'click', mode: 'row', mode: 'cell' }">
        <vxe-table-column type="seq"
                          min-width="70"
                          :title="$t('se_cc.sn')"
                          :edit-render="{ name: 'input' }"
                          align="center" />
        <vxe-table-column show-overflow
                          min-width="190"
                          field="SN"
                          :title="$t('SMTmaintenance._26')"
                          :edit-render="{ name: '$input', props: { readonly: true } }"
                          align="center" />
        <vxe-table-column show-overflow
                          field="IS_OK"
                          :title="$t('SMTmaintenance._27')"
                          min-width="180"
                          :edit-render="{ name: '$input', props: { readonly: true } }"
                          align="center">
          <template v-slot="{ row }">
            <span v-if="row.IS_OK == 'Y'">{{ $t("SMTmaintenance._28") }}</span>
            <span v-if="row.IS_OK == 'N'">{{ $t("SMTmaintenance._29") }}</span>
          </template>
        </vxe-table-column>
        <vxe-table-column show-overflow
                          field="DEFECT_CODE"
                          min-width="160"
                          :title="$t('SMTmaintenance._30')"
                          :edit-render="{ name: '$input', props: { readonly: true } }"
                          align="center" />
        <vxe-table-column show-overflow
                          field="DEFECT_DES"
                          min-width="160"
                          :title="$t('SMTmaintenance._31')"
                          :edit-render="{ name: '$input', props: { readonly: true } }"
                          align="center" />
        <vxe-table-column show-overflow
                          field="QUANTITY"
                          min-width="160"
                          :title="$t('SMTmaintenance._52')"
                          :edit-render="{ name: '$input', props: { readonly: true } }"
                          align="center" />
        <vxe-table-column show-overflow
                          field="LOCATION"
                          min-width="160"
                          :title="$t('SMTmaintenance._32')"
                          :edit-render="{ name: '$input', props: { readonly: true } }"
                          align="center" />
        <vxe-table-column show-overflow
                          field="DEFECT_REMARK"
                          min-width="160"
                          :title="$t('SMTmaintenance._33')"
                          :edit-render="{ name: '$input', props: { readonly: true } }"
                          align="center" />
        <vxe-table-column show-overflow
                          field="REPAIR_TIME"
                          min-width="160"
                          :title="$t('SMTmaintenance._19')"
                          :edit-render="{ name: '$input', props: { readonly: true } }"
                          align="center" />
        <vxe-table-column show-overflow
                          field="REPAIR_USER"
                          min-width="180"
                          :title="$t('SMTmaintenance._18')"
                          :edit-render="{ name: '$input', props: { readonly: true } }"
                          align="center" />
        <vxe-table-column :title="$t('MesMessageReceiverGroup._10')"
                          align="center"
                          min-width="90"
                          fixed="right">
          <template v-slot="{ row }">
            <el-button type="danger"
                       v-if="$btnList.indexOf('SmtDefectsRecordsSavDTL') !== -1"
                       @click="ChilddeleteClick(row)">{{ $t("publics.btn.delete") }}</el-button>
          </template>
        </vxe-table-column>
      </vxe-table>
    </div>
    <!--新增/编辑 -->
    <el-dialog v-dialogDrag
               width="80%"
               :title="addorediText"
               :visible.sync="innerVisible"
               :close-on-click-modal="false"
               append-to-body>
      <el-form ref="callVal"
               :show-message="false"
               :model="MstForm"
               :rules="rules"
               class="call-dialog-form"
               label-width="110px">
        <el-form-item :label="$t('SMTmaintenance._11') + '：'"
                      prop="GROUP_NAME"
                      class="dialog-form-item">
          <el-input v-model="MstForm.REPAIR_NO"
                    disabled
                    type="text"
                    placeholder=" " />
        </el-form-item>
        <el-form-item :label="$t('SMTmaintenance._13') + '：'"
                      prop="WORK_CLASS"
                      class="dialog-form-item">
          <el-select style="width: 100%"
                     v-model="MstForm.WORK_CLASS"
                     clearable
                     placeholder=" ">
            <el-option label="A班"
                       :value="1" />
            <el-option label="B班"
                       :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('SMTmaintenance._12') + '：'"
                      prop="LINE_ID"
                      class="dialog-form-item">
          <el-select style="width: 100%"
                     v-model="MstForm.LINE_ID"
                     clearable
                     @change="LineChange"
                     placeholder=" ">
            <el-option v-for="item in LinesList"
                       :key="item.ID"
                       :label="item.LINE_NAME"
                       :value="item.ID" />
          </el-select>
        </el-form-item>
        <!-- prop="ORDER_NO" -->
        <el-form-item :label="$t('SMTmaintenance._14') + '：'"
                      class="dialog-form-item form-itme-border">
          <el-input v-model="MstForm.ORDER_NO"
                    type="text"
                    clearable
                    placeholder=" " />
        </el-form-item>
        <el-form-item :label="$t('SMTmaintenance._15') + '：'"
                      prop="WO_NO"
                      class="dialog-form-item form-itme-border">
          <el-input v-model="MstForm.WO_NO"
                    clearable
                    type="text"
                    placeholder=" " />
        </el-form-item>
        <el-form-item :label="$t('SMTmaintenance._34') + '：'"
                      prop="MODEL"
                      class="dialog-form-item form-itme-border">
          <el-input v-model="MstForm.MODEL"
                    clearable
                    type="text"
                    placeholder=" " />
        </el-form-item>
      </el-form>
      <el-form ref="ChildRef"
               :show-message="false"
               :model="ChidForm"
               :rules="Chidrules"
               class="call-dialog-form"
               label-width="110px">
        <el-form-item :label="$t('SMTmaintenance._26') + '：'"
                      class="dialog-form-item"
                      style="padding-top: 15px">
          <el-input v-model="ChidForm.SN"
                    type="text"
                    clearable
                    placeholder=" " />
        </el-form-item>
        <el-form-item :label="$t('SMTmaintenance._30') + '：'"
                      prop="DEFECT_CODE"
                      class="dialog-form-item"
                      style="padding-top: 15px">
          <div style="display: flex">
            <el-input v-model="ChidForm.DEFECT_CODE"
                      type="text"
                      clearable
                      @keyup.enter.native="DefSearch"
                      placeholder=" " />
            <el-button type="primary"
                       @click="DefectSearch">{{
              $t("publics.btn.search")
            }}</el-button>
          </div>
        </el-form-item>
        <el-form-item :label="$t('SMTmaintenance._31') + '：'"
                      prop="DEFECT_DES"
                      class="dialog-form-item"
                      style="padding-top: 15px">
          <el-input v-model="ChidForm.DEFECT_DES"
                    type="text"
                    clearable
                    placeholder=" " />
        </el-form-item>
        <el-form-item :label="$t('SMTmaintenance._52') + '：'"
                      prop="QUANTITY"
                      class="dialog-form-item">
          <el-input v-model="ChidForm.QUANTITY"
                    type="number"
                    min="0"
                    clearable
                    placeholder=" " />
        </el-form-item>
        <el-form-item :label="$t('SMTmaintenance._32') + '：'"
                      prop="LOCATION"
                      class="dialog-form-item">
          <el-input v-model="ChidForm.LOCATION"
                    type="text"
                    clearable
                    placeholder=" " />
        </el-form-item>
        <el-form-item :label="$t('SMTmaintenance._33') + '：'"
                      prop="DEFECT_REMARK"
                      class="dialog-form-item">
          <el-input v-model="ChidForm.DEFECT_REMARK"
                    type="text"
                    clearable
                    placeholder=" " />
        </el-form-item>
        <el-form-item :label="$t('SMTmaintenance._27') + '：'"
                      class="dialog-form-item">
          <div class="display: flex;">
            <el-radio-group v-model="ChidForm.IS_OK">
              <el-radio label="Y">{{ $t("SMTmaintenance._28") }}</el-radio>
              <el-radio label="N">{{ $t("SMTmaintenance._29") }}</el-radio>
            </el-radio-group>
            <el-button style="margin-left: 20px"
                       @click="AddChild('ChildRef')"
                       type="primary">{{ $t("SMTmaintenance._35") }}</el-button>
          </div>
        </el-form-item>
      </el-form>
      <div class="chidtable"
           style="margin: 15px 0">
        <vxe-table ref="xTable3"
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
                   :data="AddChildTable"
                   :edit-rules="Chidrules"
                   :mouse-config="{ selected: true }"
                   :edit-config="{ trigger: 'click', mode: 'row', showStatus: true }"
                   :radio-config="{ labelField: 'name', trigger: 'row' }"
                   :checkbox-config="{ checkField: 'checked', trigger: 'row' }"
                   @cell-click="ChildCell">
          <vxe-table-column show-overflow
                            :title="$t('MesMessageReceiverGroup._4')"
                            min-width="70"
                            type="radio"
                            align="center" />
          <vxe-table-column type="seq"
                            min-width="60"
                            :title="$t('se_cc.sn')"
                            :edit-render="{ name: 'input' }"
                            align="center" />
          <vxe-table-column show-overflow
                            min-width="190"
                            field="SN"
                            :title="$t('SMTmaintenance._26')"
                            :edit-render="{ name: '$input', props: { readonly: true } }"
                            align="center" />
          <vxe-table-column show-overflow
                            field="IS_OK"
                            disabled
                            :title="$t('SMTmaintenance._27')"
                            min-width="180"
                            :edit-render="{
              name: '$select',
              options: STATUSbox,
              props: { disabled: true },
            }"
                            align="center">
            <!-- <template v-slot="{ row }">
              <span v-if="row.IS_OK == 'Y'">{{$t('SMTmaintenance._28')}}</span>
              <span v-if="row.IS_OK == 'N'">{{$t('SMTmaintenance._29')}}</span>
            </template> -->
          </vxe-table-column>
          <vxe-table-column show-overflow
                            field="DEFECT_CODE"
                            min-width="160"
                            :title="$t('SMTmaintenance._30')"
                            :edit-render="{ name: '$input', props: { readonly: true } }"
                            align="center" />
          <vxe-table-column show-overflow
                            field="DEFECT_DES"
                            min-width="160"
                            :title="$t('SMTmaintenance._31')"
                            :edit-render="{ name: '$input', props: { readonly: true } }"
                            align="center" />
          <vxe-table-column show-overflow
                            field="QUANTITY"
                            min-width="160"
                            :title="$t('SMTmaintenance._52')"
                            :edit-render="{ name: '$input', props: { readonly: true } }"
                            align="center" />
          <vxe-table-column show-overflow
                            field="LOCATION"
                            min-width="160"
                            :title="$t('SMTmaintenance._32')"
                            :edit-render="{ name: '$input', props: { readonly: true } }"
                            align="center" />
          <vxe-table-column show-overflow
                            field="DEFECT_REMARK"
                            min-width="160"
                            :title="$t('SMTmaintenance._33')"
                            :edit-render="{ name: '$input', props: { readonly: true } }"
                            align="center" />
          <vxe-table-column show-overflow
                            field="REPAIR_TIME"
                            min-width="160"
                            :title="$t('SMTmaintenance._19')"
                            :edit-render="{ name: '$input', props: { readonly: true } }"
                            align="center" />
          <vxe-table-column show-overflow
                            field="REPAIR_USER"
                            min-width="180"
                            :title="$t('SMTmaintenance._18')"
                            :edit-render="{ name: '$input', props: { readonly: true } }"
                            align="center" />
          <vxe-table-column :title="$t('MesMessageReceiverGroup._10')"
                            align="center"
                            min-width="160"
                            fixed="right">
            <template v-slot="{ row }">
              <el-button type="danger"
                         @click="TorikodelClick(row)">{{
                $t("publics.btn.delete")
              }}</el-button>
              <el-button type="warning"
                         @click="handleOpenReplace(row)">替换</el-button>
            </template>
          </vxe-table-column>
        </vxe-table>
      </div>
      <div style="text-align: center">
        <el-button type="success"
                   @click="MSTdefine('callVal')">&nbsp;{{ $t("publics.btn.makeSure") }}&nbsp;</el-button>
        <el-button @click="innerVisible = false">&nbsp;{{ $t("publics.btn.cancel") }}&nbsp;</el-button>
      </div>
    </el-dialog>
    <!-- 不良代码选择 -->
    <el-dialog v-dialogDrag
               width="50%"
               :title="$t('msh._82')"
               :visible.sync="badVisible"
               append-to-body
               :close-on-click-modal="false">
      <!-- <div class="header-container"
           style="padding-bottom: 10px;">
        <el-input v-model="filterName"
                  clearable
                  style="width: 200px;"
                  :placeholder="$t('msh._75')"
                  @keyup.enter.native="badTable_search" />
        <el-button type="primary"
                   icon="el-icon-search"
                   @click="badTable_search">{{ $t("msh._5") }}</el-button>
        <el-button type="success"
                   @click="DefectCertain">
          {{
            $t("msh._60")
            }}
        </el-button>
      </div> -->
      <div class="container-table">
        <vxe-table :data="DefectConfigList"
                   width="100%"
                   height="100%"
                   highlight-current-row
                   keep-source
                   highlight-hover-row
                   show-overflow
                   border
                   class="bad-table"
                   :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
                   :edit-config="{ mode: 'row', showStatus: true }"
                   @cell-click="badDetails"
                   :radio-config="{ labelField: 'name', trigger: 'row' }">
          <vxe-table-column show-overflow
                            :title="$t('spf._38')"
                            type="radio"
                            width="80"
                            align="center" />
          <vxe-table-column type="seq"
                            min-width="60"
                            :title="$t('se_cc.sn')"
                            :edit-render="{ name: 'input' }"
                            align="center" />
          <vxe-table-column field="DEFECT_CODE"
                            min-width="200"
                            :label="$t('SMTmaintenance._30')"
                            align="center" />
          <vxe-table-column field="DEFECT_DESCRIPTION"
                            min-width="200"
                            :label="$t('SMTmaintenance._31')"
                            align="center" />
        </vxe-table>
      </div>
      <div style="text-align: center; margin-top: 25px">
        <el-button type="success"
                   @click="DefectCertain">&nbsp;{{ $t("publics.btn.makeSure") }}&nbsp;</el-button>
        <el-button @click="badVisible = false">&nbsp;{{ $t("publics.btn.cancel") }}&nbsp;</el-button>
      </div>
    </el-dialog>

    <!-- 替换零件 -->
    <el-dialog :title="dialogTitle"
               :visible.sync="dialogVisibleX"
               width="50%"
               :close-on-click-modal="false"
               class="ccb-dia">
      <div>
        <el-form ref="replaceForm"
                 label-width="100px"
                 label-position="left"
                 class="cmY-form"
                 :rules="replacFormRules">
          <el-form-item :label="'原零件料号'"
                        prop="OldPartNo">
            <el-input v-model="replaceForm.OldPartNo"
                      @keyup.enter.native="handleGetComponentInfomation(1)"
                      clearable></el-input>
          </el-form-item>
          <el-form-item :label="'原零件规格'">
            <el-input v-model="replaceForm.OldDescription"
                      clearable></el-input>
          </el-form-item>
          <el-form-item :label="'原零件编号'">
            <el-input v-model="replaceForm.OldODMComponentPn"
                      clearable></el-input>
          </el-form-item>
          <el-form-item :label="'新零件料号'"
                        prop="NewPartNo">
            <el-input v-model="replaceForm.NewPartNo"
                      clearable
                      @keyup.enter.native="handleGetComponentInfomation(2)"></el-input>
          </el-form-item>
          <el-form-item :label="'新零件规格'">
            <el-input v-model="replaceForm.NewDescription"
                      clearable></el-input>
          </el-form-item>
          <el-form-item :label="'新零件编号'">
            <el-input v-model="replaceForm.NewODMComponentPn"
                      clearable></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisibleX = false"
                   style="width: 120px">{{
          $t("SfcsCollectDefects.cancel")
        }}</el-button>
        <el-button type="primary"
                   style="
            background: rgb(54, 126, 127);
            border: rgb(54, 126, 127);
            width: 120px;
          "
                   @click="handleSubmitReplace">{{ $t("SfcsCollectDefects.makeSure") }}</el-button>
      </span>
    </el-dialog>
  </custom-container>
</template>
<script>
import {
  Index,
  LoadData,
  GetReportDefectsRecordDtlList,
  Check,
  SaveDataDTL,
  GetWoInfoByLine,
  SaveData,
  CancelCheck
} from '@/api/SMTmaintenance'
import {
  GetComponentInfomation, // 获取零件信息
  GetComponentsReplace, // 获取零件替换信息
  SaveComponentReplace // 零件替换保存
} from '@/api/SfcsCollectDefects'
import { mapGetters } from 'vuex'
import customContainerHeader from '@/components/custom-container-header'
import customContainer from '@/components/custom-container'
import {
  cloneDeep
} from 'lodash'
export default {
  name: 'SMTmaintenance',
  components: {
    customContainer,
    customContainerHeader
  },
  data () {
    return {
      datarange: '',
      LinesList: [],
      Linesbox: [],
      DefectConfigList: [],
      STATUSList: [
        {
          ID: 0,
          NAME: '待维修'
        },
        {
          ID: 1,
          NAME: '已维修'
        },
        {
          ID: 3,
          NAME: '已审核'
        }
      ],
      STATUSbox: [
        {
          label: '可用',
          value: 'Y',
          disabled: false
        },
        {
          label: '报废',
          value: 'N',
          disabled: false
        }
      ],
      MstQuery: {
        Page: 1, // 当前页
        Limit: 15, // 分页大小
        LINE_ID: undefined, // 线体
        WORK_CLASS: '', // 班别
        PART_NO: '', // 产品料号
        WO_NO: '', // 工单号
        STATUS: '', // 状态
        START_TIME: '', // 开始时间
        END_TIME: '' // 结束时间
      },
      MstLoading: false,
      MstTable: [],
      Msttotal: 0,
      MstDate: null,
      innerVisible: false,
      addorediText: '',
      MstForm: {
        ID: 0,
        ORGANIZE_ID: 0,
        WORK_CLASS: '', // 班别

        LINE_ID: '', // 线体ID
        MODEL: '', // 机种
        CREATE_USER: '', /// 创建人
        REPAIR_NO: '', // 维修编号
        ORDER_NO: '', // 订单号
        WO_NO: '', // 工单号
        PART_NO: '', // 料号
        REPAIR_USER: '' // 维修人
      },
      rules: {
        WORK_CLASS: [
          {
            required: true,
            message: this.$t('SMTmaintenance._2'),
            trigger: 'change'
          }
        ],
        LINE_ID: [
          {
            required: true,
            message: this.$t('SMTmaintenance._1'),
            trigger: 'change'
          }
        ],
        ORDER_NO: [
          {
            required: true,
            message: this.$t('SMTmaintenance._36'),
            trigger: 'blur'
          }
        ],
        WO_NO: [
          {
            required: true,
            message: this.$t('SMTmaintenance._6'),
            trigger: 'blur'
          }
        ],
        MODEL: [
          {
            required: true,
            message: this.$t('SMTmaintenance._37'),
            trigger: 'blur'
          }
        ]
      },
      ChildTable: [],
      // 新增或者编辑
      ChidForm: {
        ID: 0,
        SN: '', // 产品流水号
        LOCATION: '', // 不良位号
        DEFECT_CODE: '', // 不良代码
        DEFECT_DES: '', // 不良现象
        DEFECT_REMARK: '', // 不良描述
        IS_OK: 'Y', // 维修状态Y/N
        REPAIR_USER: '', // 维修人员
        REPAIR_TIME: '', // 维修时间
        CREATE_USER: '' // 创建人
      },
      Chidrules: {
        DEFECT_CODE: [
          {
            required: true,
            message: this.$t('SMTmaintenance._38')
          }
        ],
        DEFECT_DES: [
          {
            required: true,
            message: this.$t('SMTmaintenance._39')
          }
        ],
        QUANTITY: [
          {
            required: true,
            message: this.$t('请输入数量')
          }
        ],
        LOCATION: [
          {
            required: true,
            message: this.$t('SMTmaintenance._40')
          }
        ],
        DEFECT_REMARK: [
          {
            required: true,
            message: this.$t('SMTmaintenance._41')
          }
        ]
      },
      AddChildTable: [],
      // 审核
      Checkform: {
        id: '',
        examineUser: ''
      },
      MstSaveData: {
        InsertRecords: [],
        UpdateRecords: [],
        RemoveRecords: []
      },
      badVisible: false,
      DefectSele: null,
      filterName: '',
      ChidRow: null,
      dialogVisibleX: false,
      dialogTitle: '',
      replacFormRules: {
        OldPartNo: [
          { required: true, message: '请输入原零件料号', trigger: 'blur' }
        ],
        NewPartNo: [{
          required: true, message: '请输入新零件料号', trigger: 'blur'
        }]
      },
      replaceForm: {},
      rowInfos: {}
    }
  },
  computed: {
    ...mapGetters(['userinfo', 'userId'])
  },
  created () {
    this.getIndex()
    this.getLoadData()
    this.Checkform.examineUser = this.userinfo.USER_NAME
    this.MstForm.ORGANIZE_ID = this.userinfo.ORGANIZE_ID
    this.MstForm.CREATE_USER = this.userinfo.USER_NAME
    this.MstForm.REPAIR_USER = this.userinfo.USER_NAME
    this.ChidForm.CREATE_USER = this.userinfo.USER_NAME
    this.ChidForm.REPAIR_USER = this.userinfo.USER_NAME
  },
  methods: {
    clearLINE () {
      this.MstQuery.LINE_ID = undefined
    },
    async getIndex () {
      const res = await Index()
      if (res.Result) {
        var data = res.Result
        this.LinesList = data.LinesList
        this.DefectConfigList = data.DefectConfigList
        this.Linesbox.push({
          label: '',
          value: '',
          disabled: false
        })
        this.LinesList.map((item) => {
          this.Linesbox.push({
            label: item.LINE_NAME,
            value: item.ID,
            disabled: false
          })
        })
      }
    },
    // 获取数据
    async getLoadData () {
      this.MstLoading = true
      const res = await LoadData(this.MstQuery)
      if (res.Result) {
        this.MstTable = res.Result
        this.Msttotal = res.TotalCount
      }
      this.MstLoading = false
    },
    MstSearch () {
      if (this.datarange) {
        this.MstQuery.START_TIME = this.datarange[0]
        this.MstQuery.END_TIME = this.datarange[1]
      } else {
        this.MstQuery.START_TIME = ''
        this.MstQuery.END_TIME = ''
      }
      this.MstQuery.Page = 1
      this.getLoadData()
    },
    handleSizeChange (val) {
      this.MstQuery.Limit = val
      this.getLoadData()
    },
    handleCurrentChange (val) {
      this.MstQuery.Page = val
      this.getLoadData()
    },
    // 主表选择
    MSTcellClick (e) {
      this.MstDate = e.row
      this.getDtlLoadData(e.row.ID)
    },
    async getDtlLoadData (e) {
      const res = await GetReportDefectsRecordDtlList({ MST_ID: e })
      if (res.Result) {
        this.ChildTable = res.Result || []
        this.AddChildTable = res.Result || []
      }
    },
    // 主表删除
    async MstDelete (row) {
      if (this.MstDate === null) {
        this.$message({
          showClose: true,
          type: 'warning',
          message: this.$t('SMTmaintenance._42')
        })
        return
      }
      if (Number(this.MstDate.STATUS) !== 1) {
        this.$message({
          showClose: true,
          type: 'warning',
          message: this.$t('SMTmaintenance._43')
        })
        return
      }
      this.MstSaveData = {
        InsertRecords: [],
        UpdateRecords: [],
        RemoveRecords: []
      }
      this.MstSaveData.RemoveRecords.push(this.MstDate)
      this.$confirm(this.$t('cccn._26'), this.$t('cccn._21'), {
        confirmButtonText: this.$t('cccn._22'),
        cancelButtonText: this.$t('cccn._23'),
        type: 'warning'
      }).then((v) => {
        SaveData(this.MstSaveData).then((res) => {
          if (res.Result) {
            this.$notify({
              title: this.$t('cccn._24'),
              message: this.$t('cccn._25'),
              type: 'success',
              duration: 2000
            })
            this.getLoadData()
          } else {
            this.getLoadData()
          }
        })
      })
    },
    // 审核
    AuditClick () {
      if (this.MstDate === null) {
        this.$message({
          showClose: true,
          type: 'warning',
          message: this.$t('SMTmaintenance._44')
        })
        return
      }
      if (Number(this.MstDate.STATUS) !== 1) {
        this.$message({
          showClose: true,
          type: 'warning',
          message: this.$t('SMTmaintenance._45')
        })
        return
      }
      this.Checkform.id = this.MstDate.ID
      this.$confirm(this.$t('SMTmaintenance._46'), this.$t('cccn._21'), {
        confirmButtonText: this.$t('cccn._22'),
        cancelButtonText: this.$t('cccn._23'),
        type: 'warning'
      }).then((v) => {
        Check(this.Checkform).then((res) => {
          if (res.Result) {
            this.$notify({
              title: this.$t('cccn._24'),
              message: this.$t('cccn._25'),
              type: 'success',
              duration: 2000
            })
            this.getLoadData()
          } else {
            this.getLoadData()
          }
        })
      })
    },
    // 取消审核
    CancelAudit (row) {
      if (this.MstDate === null) {
        this.$message({
          showClose: true,
          type: 'warning',
          message: this.$t('SMTmaintenance._47')
        })
        return
      }
      if (Number(this.MstDate.STATUS) !== 2) {
        this.$message({
          showClose: true,
          type: 'warning',
          message: this.$t('SMTmaintenance._48')
        })
        return
      }
      this.Checkform.id = this.MstDate.ID
      this.$confirm(this.$t('SMTmaintenance._49'), this.$t('cccn._21'), {
        confirmButtonText: this.$t('cccn._22'),
        cancelButtonText: this.$t('cccn._23'),
        type: 'warning'
      }).then((v) => {
        CancelCheck(this.Checkform).then((res) => {
          if (res.Result) {
            this.$notify({
              title: this.$t('cccn._24'),
              message: this.$t('cccn._25'),
              type: 'success',
              duration: 2000
            })
            this.getLoadData()
          } else {
            this.getLoadData()
          }
        })
      })
    },
    // 添加
    MstAdd () {
      this.AddChildTable = []
      this.Eliminate()
      this.addorediText = this.$t('publics.btn.add')
      this.innerVisible = true
      // 自动产生维修编号
      var date = new Date()
      var year = date.getYear()
      // eslint-disable-next-line no-redeclare
      var year = year < 2000 ? year + 1900 : year
      var yy = year.toString().substr(2, 2)
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
      this.MstForm.REPAIR_NO = 'WX' + yy + m + d + h + minute + second
    },
    // 维修
    MSTeditClick (row) {
      this.Eliminate()
      console.log(row, 'rowrow')
      if (Number(row.STATUS) !== 1) {
        this.$message({
          showClose: true,
          type: 'warning',
          message: this.$t('SMTmaintenance._50')
        })
        return
      }
      this.addorediText = this.$t('SMTmaintenance._25')
      this.MstForm = row
      this.innerVisible = true
    },
    // 获取线别信息
    async LineChange (e) {
      const res = await GetWoInfoByLine({ lineId: e })
      var data = res.Result
      if (data) {
        this.MstForm.PART_NO = data.PART_NO
        this.MstForm.WO_NO = data.WO_NO
        this.MstForm.MODEL = data.DESCRIPTION
      }
    },
    DefSearch (e) {
      console.log(this.ChidForm.DEFECT_CODE, 'eeee')
      if (this.DefectConfigList.length) {
        var data = this.DefectConfigList
        var start = false
        for (var i = 0; i < data.length; i++) {
          if (this.ChidForm.DEFECT_CODE === data[i].DEFECT_CODE) {
            this.ChidForm.DEFECT_DES = data[i].DEFECT_DESCRIPTION
            start = true
            break
          } else {
            start = false
          }
        }
        if (start) {
        } else {
          this.ChidForm.DEFECT_DES = ''
          this.$message({
            showClose: true,
            type: 'warning',
            message: this.$t('SMTmaintenance._51')
          })
        }
      }
      // if (this.DefectConfigList.length) {
      //   this.DefectConfigList.some(v => {
      //     if (this.ChidForm.DEFECT_CODE === v.DEFECT_CODE) {
      //       console.log(v.DEFECT_DESCRIPTION, 'v.DEFECT_DESCRIPTION')
      //       this.ChidForm.DEFECT_DES = v.DEFECT_DESCRIPTION
      //       return true
      //       // var aa = 1
      //     } else {
      //       this.ChidForm.DEFECT_DES = ''
      //       this.$message({
      //         showClose: true,
      //         type: 'warning',
      //         message: this.$t('SMTmaintenance._51')
      //       })
      //       return true
      //     }
      //   })
      // }
    },
    DefectSearch () {
      this.badVisible = true
    },
    badDetails (e) {
      this.DefectSele = e.row
    },
    DefectCertain () {
      if (this.DefectSele) {
        this.ChidForm.DEFECT_CODE = this.DefectSele.DEFECT_CODE
        this.ChidForm.DEFECT_DES = this.DefectSele.DEFECT_DESCRIPTION
      }
      this.badVisible = false
    },
    ChildCell (e) {
      console.log(e)
      this.ChidForm = {
        ID: e.row.ID,
        SN: e.row.SN, // 产品流水号
        LOCATION: e.row.LOCATION, // 不良位号
        DEFECT_CODE: e.row.DEFECT_CODE, // 不良代码
        DEFECT_DES: e.row.DEFECT_DES, // 不良现象
        DEFECT_REMARK: e.row.DEFECT_REMARK, // 不良描述
        IS_OK: e.row.IS_OK, // 维修状态Y/N
        REPAIR_USER: this.userinfo.USER_NAME, // 维修人员
        REPAIR_TIME: e.row.REPAIR_TIME, // 维修时间
        CREATE_USER: this.userinfo.USER_NAME, // 创建人
        QUANTITY: e.row.QUANTITY,
        Add: e.row.Add
      }
      this.ChidRow = e.row
    },
    // 子表新增或者编辑添加子表确认
    AddChild () {
      this.$refs.ChildRef.validate(async (valid, errInfo) => {
        if (valid) {
          if (this.ChidForm.ID !== 0) {
            // this.$refs.xTable3.remove(this.ChidRow)
            Object.assign(this.ChidRow, this.ChidForm)
          } else {
            this.ChidForm.REPAIR_TIME = this.getNowDate(new Date())
            if (this.ChidForm.Add) {
              this.$refs.xTable3.remove(this.ChidRow)
            }
            this.ChidForm.Add = 1
            this.$refs.xTable3.insertAt(this.ChidForm, 0).then(({ row }) => {
              this.$refs.xTable3.setActiveRow(0)
            })
          }
          this.ChildEliminate()
        } else {
          try {
            Object.keys(errInfo).forEach((item) => {
              this.$message.error(errInfo[item][0].message)
              throw new Error(new Date().toLocaleString())
            })
          } catch { }
        }
      })
    },
    // 子表新增或者编辑是删除
    TorikodelClick (row) {
      this.$refs.xTable3.remove(row)
    },
    // 确定
    MSTdefine () {
      this.$refs.callVal.validate(async (valid, errInfo) => {
        if (valid) {
          this.$refs.xTable3.validate(async (vol) => {
            if (vol) {
              this.MstSaveData = {
                InsertRecords: [],
                UpdateRecords: [],
                RemoveRecords: []
              }
              if (this.MstForm.ID === 0) {
                this.MstSaveData.InsertRecords.push(this.MstForm)
              } else {
                this.MstSaveData.UpdateRecords.push(this.MstForm)
              }
              const res = await SaveData(this.MstSaveData)
              if (res.Result) {
                this.DTLSaveData(res.Result)
                this.innerVisible = false
                this.getLoadData()
                this.$notify({
                  title: this.$t('cccn._24'),
                  message: this.$t('cccn._25'),
                  type: 'success',
                  duration: 2000
                })
              }
            }
          })
        } else {
          try {
            Object.keys(errInfo).forEach((item) => {
              this.$message.error(errInfo[item][0].message)
              throw new Error(new Date().toLocaleString())
            })
          } catch { }
        }
      })
    },
    // 子表提交
    async DTLSaveData (MstId) {
      var postdata = this.$refs.xTable3.getRecordset()
      console.log(postdata, 'postdata')
      var form = {
        InsertRecords: [],
        UpdateRecords: [],
        RemoveRecords: []
      }
      var insertArr = postdata.insertRecords
      insertArr.map((v) => {
        v.MST_ID = MstId
      })
      form.InsertRecords = insertArr
      form.UpdateRecords = postdata.updateRecords
      form.RemoveRecords = postdata.removeRecords
      // MST_ID
      if (
        form.InsertRecords.length !== 0 ||
        form.UpdateRecords.length !== 0 ||
        form.RemoveRecords.length !== 0
      ) {
        await SaveDataDTL(form)
      }
    },
    // 子表删除
    async ChilddeleteClick (row) {
      var obj = {
        InsertRecords: [],
        UpdateRecords: [],
        RemoveRecords: []
      }
      obj.RemoveRecords.push(row)
      this.$confirm(this.$t('cccn._26'), this.$t('cccn._21'), {
        confirmButtonText: this.$t('cccn._22'),
        cancelButtonText: this.$t('cccn._23'),
        type: 'warning'
      }).then((v) => {
        SaveDataDTL(obj).then((res) => {
          if (res.Result) {
            this.$notify({
              title: this.$t('cccn._24'),
              message: this.$t('cccn._25'),
              type: 'success',
              duration: 2000
            })
            this.getDtlLoadData(this.MstDate.ID)
          }
        })
      })
    },
    // 清空
    Eliminate () {
      this.MstForm = {
        ID: 0,
        ORGANIZE_ID: this.userinfo.ORGANIZE_ID,
        WORK_CLASS: '', // 班别
        LINE_ID: '', // 线体ID
        MODEL: '', // 机种
        CREATE_USER: this.userinfo.USER_NAME, /// 创建人
        REPAIR_NO: '', // 维修编号
        ORDER_NO: '', // 订单号
        WO_NO: '', // 工单号
        PART_NO: '', // 料号
        REPAIR_USER: this.userinfo.USER_NAME // 维修人
      }
      this.ChidForm = {
        ID: 0,
        SN: '', // 产品流水号
        LOCATION: '', // 不良位号
        DEFECT_CODE: '', // 不良代码
        DEFECT_DES: '', // 不良现象
        DEFECT_REMARK: '', // 不良描述
        IS_OK: 'Y', // 维修状态Y/N
        REPAIR_USER: this.userinfo.USER_NAME, // 维修人员
        REPAIR_TIME: '', // 维修时间
        CREATE_USER: this.userinfo.USER_NAME // 创建人
      }
    },
    ChildEliminate () {
      this.ChidForm = {
        ID: 0,
        SN: '', // 产品流水号
        LOCATION: '', // 不良位号
        DEFECT_CODE: '', // 不良代码
        DEFECT_DES: '', // 不良现象
        DEFECT_REMARK: '', // 不良描述
        IS_OK: 'Y', // 维修状态Y/N
        REPAIR_USER: this.userinfo.USER_NAME, // 维修人员
        REPAIR_TIME: '', // 维修时间
        CREATE_USER: this.userinfo.USER_NAME // 创建人
      }
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
    },
    async handleOpenReplace (row) {
      this.rowInfos = cloneDeep(row || {})
      this.dialogTitle = '替换零件'
      this.dialogVisibleX = true
      this.replaceForm = {
        OldPartNo: '',
        OldDescription: '',
        OldODMComponentPn: '',
        NewPartNo: '',
        NewDescription: '',
        NewODMComponentPn: ''
      }
    },
    async handleGetComponentInfomation (type) {
      if (type === 1) {
        if (!this.replaceForm.OldPartNo) {
          this.$message.error('请输入料号')
          return false
        }
        const res = await GetComponentInfomation(this.replaceForm.OldPartNo)
        const data = res.Result?.[0] || {}
        this.replaceForm.OldPartNo = data.PART_NO || ''
        this.replaceForm.OldDescription = data.DESCRIPTION || ''
        this.replaceForm.OldODMComponentPn = data.ODM_COMPONENT_PN || ''
      } else if (type === 2) {
        if (!this.replaceForm.NewPartNo) {
          this.$message.error('请输入料号')
          return false
        }
        const res = await GetComponentInfomation(this.replaceForm.NewPartNo)
        const data = res.Result?.[0] || {}
        this.replaceForm.NewPartNo = data.PART_NO || ''
        this.replaceForm.NewDescription = data.DESCRIPTION || ''
        this.replaceForm.NewODMComponentPn = data.ODM_COMPONENT_PN || ''
      }
    },
    async handleSubmitReplace () {
      if (!this.replaceForm.OldPartNo) {
        this.$message.error('请输入原料号')
        return false
      }
      if (!this.replaceForm.NewPartNo) {
        this.$message.error('请输入新料号')
        return false
      }
      const res = await GetComponentsReplace(this.replaceForm.OldPartNo)
      let form = {

      }
      if (res.Result) {
        if (res.Result.length) {
          form.UpdateRecords = [this.replaceForm]
        } else {
          form.InsertRecords = [this.replaceForm]
        }
        const result = await SaveComponentReplace(form)
        if (result.Result) {
          this.$notify({
            type: 'success',
            title: '成功',
            message: '替换零件成功'
          })
          this.rowInfos = {}
          this.replaceForm = {}
          this.dialogVisibleX = false
          this.dialogTitle = ''
        }
      }
    }
  }
}
</script>
<style lang="scss">
.msttable,
.chidtable,
.usertable {
  height: calc(100vh - 510px);
}
.call-dialog-form {
  display: flex;
  flex-wrap: wrap;
}
.dialog-form-item {
  flex: 0 0 33.3333%;
}
.form-itme-border {
  border-bottom: 1px solid #dcdfe6;
  padding-bottom: 25px;
}
.container-table {
  height: calc(100vh - 390px);
}
</style>
