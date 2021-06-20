<template>
  <d2-container>
    <!-- 头部 -->
    <template slot="header">
      <custom-container-header :isExport="false"
                               :isExportTpl="false"
                               :isImport="false">
        <el-input v-model="formData.BATCH_NO"
                  clearable
                  style="width: 200px"
                  :placeholder="$t('QualityInspectionList._13')"
                  @keyup.enter.native="searchClick" />
        <el-button type="primary"
                   icon="el-icon-search"
                   @click.prevent="searchClick">{{ $t("plbd.hd_sf") }}</el-button>
        <el-button type="primary"
                   icon="el-icon-finished"
                   @click="drawer = true">{{ $t("SfcsPn._48") }}</el-button>
        <el-button @click="Review"
                   v-if="$btnList.indexOf('VerifySpotcheckHeaderReview') !== -1"
                   type="primary">{{ $t("QualityInspectionList._6") }}</el-button>

        <el-button @click="CancelReview"
                   v-if="$btnList.indexOf('VerifySpotcheckCancelReview') !== -1"
                   type="warning">{{ $t("QualityInspectionList._7") }}</el-button>
      </custom-container-header>
    </template>
    <!-- 主表 -->
    <div class="QualityInspectionList-container">
      <vxe-table ref="xTable"
                 border
                 resizable
                 height="100%"
                 size="small"
                 align="center"
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
                 @cell-click="cellClick">
        <vxe-table-column type="radio"
                          :title="$t('ukas._27')"
                          min-width="60" />
        <vxe-table-column :label="$t('QualityInspectionList._8')"
                          type="seq"
                          align="center"
                          min-width="100">
        </vxe-table-column>
        <!-- <vxe-table-column min-width="80"
                          :title="$t('se_cc.sn')"
                          fixed="left">
          <template v-slot="{$rowIndex}">{{$rowIndex +1}}</template>
        </vxe-table-column> -->
        <vxe-table-column min-width="160"
                          field="BATCH_NO"
                          :title="$t('QualityInspectionList._9')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
        <vxe-table-column min-width="190"
                          field="QC_TYPE"
                          :title="$t('QualityInspectionList._10')"
                          :edit-render="{
            autofocus: '.custom-input',
            type: 'visible',
            props: { readonly: true },
          }">">
          <template v-slot:edit="{ row }">
            <span v-if="row.QC_TYPE == 0">{{
              $t("QualityInspectionList._11")
            }}</span>
            <span v-else-if="row.QC_TYPE == 1">{{
              $t("QualityInspectionList._12")
            }}</span>
            <span v-else-if="row.QC_TYPE == 2">{{
              $t("QualityInspectionList._75")
            }}</span>
            <span v-else></span>
          </template>
        </vxe-table-column>
        <vxe-table-column min-width="170"
                          field="LINE_ID"
                          :title="$t('QualityInspectionList._14')"
                          :edit-render="{ name: '$select', options: lineListbox,props: {readonly: true} }" />
        <vxe-table-column min-width="150"
                          field="STATUS"
                          :title="$t('QualityInspectionList._15')"
                          :edit-render="{autofocus: '.custom-input', type: 'visible',props: {readonly: true}}">
          <template v-slot:edit="{ row }">
            <!-- <span v-if="row.STATUS == 0">{{$t('QualityInspectionList._16')}}</span>
            <span v-else-if="row.STATUS == 2">{{$t('QualityInspectionList._17')}}</span>
            <span v-else-if="row.STATUS == 3">{{$t('QualityInspectionList._18')}}</span> -->
            <span v-if="row.STATUS == 0"
                  style="font-weight: 800; color: orange">{{ $t("msh._14") }}</span>
            <span v-if="row.STATUS == 3"
                  style="font-weight: 800; color: blue">{{ $t("msh._15") }}</span>
            <span v-else></span>
          </template>
        </vxe-table-column>
        <vxe-table-column min-width="180"
                          field="PART_NO"
                          :title="$t('QualityInspectionList._19')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
        <vxe-table-column min-width="180"
                          field="WO_NO"
                          :title="$t('QualityInspectionList._20')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
        <vxe-table-column min-width="150"
                          field="PART_NAME"
                          :title="$t('QualityInspectionList._21')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
        <vxe-table-column min-width="170"
                          field="PART_DESC"
                          :title="$t('QualityInspectionList._22')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
        <vxe-table-column min-width="170"
                          field="ALL_QTY"
                          :title="$t('QualityInspectionList._23')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
        <vxe-table-column min-width="170"
                          field="CHECK_QTY"
                          :title="$t('QualityInspectionList._24')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
        <vxe-table-column min-width="170"
                          field="FAIL_QTY"
                          :title="$t('QualityInspectionList._25')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
        <vxe-table-column min-width="170"
                          field="CHECKER"
                          :title="$t('QualityInspectionList._26')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
        <vxe-table-column min-width="170"
                          field="AUDITOR"
                          :title="$t('QualityInspectionList._27')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
        <vxe-table-column min-width="170"
                          field="CREATE_DATE"
                          :title="$t('QualityInspectionList._28')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
        <vxe-table-column min-width="170"
                          field="AUDIT_TIME"
                          :title="$t('QualityInspectionList._29')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
        <vxe-table-column min-width="170"
                          field="REMARK"
                          :title="$t('msh._123')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
        <vxe-table-column min-width="170"
                          field="RESULT"
                          fixed="right"
                          :title="$t('QualityInspectionList._30')"
                          :edit-render="{ name: '$input', props: { readonly: true } }">
          <template v-slot="{ row }">
            <!-- <span v-if="row.RESULT == 0"
                  style="color: #179415;">{{$t('QualityInspectionList._31')}}</span>
            <span v-if="row.RESULT == 1">{{$t('QualityInspectionList._32')}}</span>
            <span v-else-if="row.RESULT == 2">{{$t('QualityInspectionList._33')}}</span>
            <span v-else-if="row.RESULT == 3">{{$t('QualityInspectionList._34')}}</span>
            <span v-else></span> -->
            <span v-if="row.RESULT == 0"
                  style="font-weight: 800; color: green">{{ $t("msh._25") }}</span>
            <span v-if="row.RESULT == 1"
                  style="font-weight: 800; color: blue">{{ $t("msh._26") }}</span>
            <span v-if="row.RESULT == 2"
                  style="font-weight: 800; color: orange">{{ $t("msh._27") }}</span>
            <span v-if="row.RESULT == 3"
                  style="font-weight: 800; color: red">{{
              $t("msh._28")
            }}</span>
          </template>
        </vxe-table-column>
        <vxe-table-column v-if="$btnList.indexOf('MesBatchManagerEdit') !== -1"
                          :title="$t('sdr_le.tb_og')"
                          min-width="120"
                          align="center"
                          fixed="right">
          <template v-slot="{ row }">
            <div v-if="row.QC_TYPE === 1 || row.QC_TYPE === 2">
              <el-button size="mini"
                         type="success"
                         v-if="$btnList.indexOf('UpdateSpotCheckIteamsData') !== -1"
                         @click="editClick(row, row.$index)">{{ $t("QualityInspectionList._35") }}</el-button>
            </div>
            <div v-else>-</div>
          </template>
        </vxe-table-column>
      </vxe-table>
    </div>
    <!-- 分页 -->
    <div class="QualityInspectionList-page"
         style="margin: 13px 0">
      <el-pagination :current-page="formData.Page"
                     :page-size="formData.Limit"
                     :page-sizes="[15, 25, 35, 45]"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="totalPage"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange" />
    </div>
    <!-- tab -->
    <el-tabs v-model="activeName"
             @tab-click="handleClick"
             class="bottomTable-container">
      <el-tab-pane :label="$t('QualityInspectionList._36')"
                   name="first"
                   style="height: 100%">
        <el-form ref="materialsTable"
                 :model="materialsTable"
                 label-width="150px"
                 class="QualityInspectionList-tabs-form">
          <el-form-item :label="$t('QualityInspectionList._37') + '：'">
            <div>
              <span v-if="materialsTable.QC_TYPE == 0">{{
                $t("QualityInspectionList._11")
              }}</span>
              <span v-else-if="materialsTable.QC_TYPE == 1">{{
                $t("QualityInspectionList._12")
              }}</span>
              <span v-else-if="materialsTable.QC_TYPE == 2">{{
              $t("QualityInspectionList._75")
            }}</span>
              <span v-else></span>
            </div>
          </el-form-item>
          <el-form-item :label="$t('QualityInspectionList._38') + '：'">
            <div>{{ materialsTable.WO_NO }}</div>
          </el-form-item>
          <el-form-item :label="$t('QualityInspectionList._19') + '：'">
            <div>{{ materialsTable.PART_NO }}</div>
          </el-form-item>
          <el-form-item :label="$t('QualityInspectionList._72') + '：'">
            <div>{{ materialsTable.PARENT_BATCH_NO }}</div>
          </el-form-item>
          <el-form-item :label="$t('QualityInspectionList._21') + '：'">
            <div>{{ materialsTable.PART_NAME }}</div>
          </el-form-item>
          <el-form-item :label="$t('QualityInspectionList._20') + '：'">
            <div>{{ materialsTable.WO_NO }}</div>
          </el-form-item>
          <el-form-item :label="$t('QualityInspectionList._23') + '：'">
            <div>{{ materialsTable.ALL_QTY }}</div>
          </el-form-item>
          <el-form-item :label="$t('QualityInspectionList._39') + '：'">
            <div>{{ materialsTable.CHECK_QTY }}</div>
          </el-form-item>
          <el-form-item :label="$t('QualityInspectionList._40') + '：'">
            <div>{{ materialsTable.QCSCHEMANAME }}</div>
          </el-form-item>
          <el-form-item :label="$t('QualityInspectionList._41') + '：'">
            <div>{{ materialsTable.QCSCHEMAVERSION }}</div>
          </el-form-item>
          <el-form-item :label="$t('QualityInspectionList._42') + '：'">
            <div>{{ materialsTable.OPERATION_SITE_ID }}</div>
          </el-form-item>
          <el-form-item :label="$t('QualityInspectionList._15') + '：'">
            <div>
              <!-- <span v-if="materialsTable.STATUS==0">{{$t('QualityInspectionList._16')}}</span>
              <span v-if="materialsTable.STATUS==2">{{$t('QualityInspectionList._17')}}</span>
              <span v-if="materialsTable.STATUS==3">{{$t('QualityInspectionList._18')}}</span> -->
              <span v-if="materialsTable.STATUS == 0"
                    style="font-weight: 800; color: orange">{{ $t("msh._14") }}</span>
              <span v-if="materialsTable.STATUS == 3"
                    style="font-weight: 800; color: blue">{{ $t("msh._15") }}</span>
              <span v-else></span>
            </div>
          </el-form-item>
          <el-form-item :label="$t('QualityInspectionList._43') + '：'">
            <div>
              <span v-if="materialsTable.RESULT == 0">{{
                $t("QualityInspectionList._31")
              }}</span>
              <span v-if="materialsTable.RESULT == 1">{{
                $t("QualityInspectionList._32")
              }}</span>
              <span v-else-if="materialsTable.RESULT == 2">{{
                $t("QualityInspectionList._33")
              }}</span>
              <span v-else-if="materialsTable.RESULT == 3">{{
                $t("QualityInspectionList._34")
              }}</span>
              <span v-else></span>
            </div>
          </el-form-item>
          <el-form-item :label="$t('QualityInspectionList._22') + '：'">
            <div>{{ materialsTable.PART_DESC }}</div>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane :label="$t('QualityInspectionList._44')"
                   name="second"
                   style="height: 100%">
        <vxe-table ref="aTable"
                   border
                   resizable
                   height="100%"
                   size="small"
                   align="center"
                   highlight-hover-row
                   auto-resize
                   keep-source
                   show-overflow
                   stripe
                   :data="annexTable"
                   :mouse-config="{ selected: true }"
                   :edit-config="{ trigger: 'click', mode: 'row', showStatus: true }"
                   :radio-config="{ labelField: 'name', trigger: 'row' }"
                   :checkbox-config="{ checkField: 'checked', trigger: 'row' }">
          <!-- <vxe-table-column min-width="80"
                            field="ORDER_NO"
                            :title="$t('QualityInspectionList._8')" /> -->
          <vxe-table-column :label="$t('QualityInspectionList._8')"
                            type="seq"
                            align="center"
                            min-width="80" />
          <vxe-table-column min-width="150"
                            field="STANDARD"
                            :title="$t('QualityInspectionList._45')"
                            :edit-render="{ name: '$input', props: { readonly: true } }" />
          <vxe-table-column min-width="150"
                            field="CHECK_QTY"
                            :title="$t('QualityInspectionList._24')"
                            :edit-render="{ name: '$input', props: { readonly: true } }" />
          <vxe-table-column min-width="150"
                            field="PASS"
                            :title="$t('QualityInspectionList._46')"
                            :edit-render="{ name: '$input', props: { readonly: true } }" />
          <vxe-table-column min-width="150"
                            field="FAIL"
                            :title="$t('QualityInspectionList._47')"
                            :edit-render="{ name: '$input', props: { readonly: true } }" />
          <vxe-table-column min-width="150"
                            field="GUIDERANGER"
                            :title="$t('QualityInspectionList._48')"
                            :edit-render="{ name: '$input', props: { readonly: true } }" />
          <vxe-table-column min-width="150"
                            field="GUIDELINEVALUE1"
                            :title="$t('QualityInspectionList._49')"
                            :edit-render="{ name: '$input', props: { readonly: true } }" />
          <vxe-table-column min-width="150"
                            field="RESULT"
                            :title="$t('QualityInspectionList._50')"
                            :edit-render="{ name: '$input', props: { readonly: true } }">
            <template v-slot="{ row }">
              <span v-if="row.RESULT == 0"
                    style="color: #179415">{{
                $t("QualityInspectionList._31")
              }}</span>
              <span v-if="row.RESULT == 1">{{
                $t("QualityInspectionList._33")
              }}</span>
              <span v-else-if="row.RESULT == 2"
                    style="color: red">{{
                $t("QualityInspectionList._51")
              }}</span>
              <span v-else></span>
            </template>
          </vxe-table-column>
        </vxe-table>
      </el-tab-pane>
      <el-tab-pane :label="$t('QualityInspectionList._52')"
                   name="third"
                   style="height: 97%">
        <vxe-table ref="tTable"
                   border
                   resizable
                   height="89%"
                   size="small"
                   align="center"
                   highlight-hover-row
                   auto-resize
                   keep-source
                   show-overflow
                   stripe
                   :data="turnoverTable"
                   :mouse-config="{ selected: true }"
                   :edit-config="{ trigger: 'click', mode: 'row', showStatus: true }"
                   :radio-config="{ labelField: 'name', trigger: 'row' }"
                   :checkbox-config="{ checkField: 'checked', trigger: 'row' }">
          <vxe-table-column min-width="80"
                            type="seq"
                            :title="$t('QualityInspectionList._8')" />>
          <vxe-table-column min-width="150"
                            field="SN"
                            :title="$t('QualityInspectionList._53')"
                            :edit-render="{ name: '$input', props: { readonly: true } }" />
          <vxe-table-column min-width="150"
                            field="STATUS"
                            :title="$t('QualityInspectionList._54')"
                            :edit-render="{ name: '$input', props: { readonly: true } }">
            <template v-slot="{ row }">
              <span v-if="row.STATUS == 'PASS'"
                    style="color: #179415">{{
                $t("QualityInspectionList._31")
              }}</span>
              <span v-else-if="row.STATUS == 'FAIL'"
                    style="color: red">{{
                $t("QualityInspectionList._51")
              }}</span>
              <span v-else></span>
            </template>
          </vxe-table-column>

          <vxe-table-column min-width="150"
                            field="DEFECT_CODE"
                            :title="$t('QualityInspectionList._55')"
                            :edit-render="{ name: '$input', props: { readonly: true } }" />
          <vxe-table-column min-width="150"
                            field="DEFECT_LOC"
                            :title="$t('QualityInspectionList._56')"
                            :edit-render="{ name: '$input', props: { readonly: true } }" />
          <vxe-table-column min-width="150"
                            field="DEFECT_DESCRIPTION"
                            :title="$t('QualityInspectionList._57')"
                            :edit-render="{ name: '$input', props: { readonly: true } }" />
          <vxe-table-column min-width="150"
                            field="DEFECT_MSG"
                            :title="$t('QualityInspectionList._58')"
                            :edit-render="{ name: '$input', props: { readonly: true } }" />
          <vxe-table-column min-width="150"
                            field="SITE_NAME"
                            :title="$t('QualityInspectionList._74')"
                            :edit-render="{ name: '$input', props: { readonly: true } }" />

        </vxe-table>
        <!-- 分页 -->
        <div class="QualityInspectionList-page">
          <el-pagination :current-page="formData2.Page"
                         :page-size="formData2.Limit"
                         :page-sizes="[15, 25, 35, 45]"
                         layout="total, sizes, prev, pager, next, jumper"
                         :total="totalPage2"
                         @size-change="handleSizeChange2"
                         @current-change="handleCurrentChange2" />
        </div>
      </el-tab-pane>
    </el-tabs>
    <!-- 编辑 -->
    <el-dialog v-dialogDrag
               width="80%"
               :title="$t('QualityInspectionList._35')"
               :visible.sync="innerVisible">
      <div class="basic-form">
        <el-form ref="editForm"
                 :model="editForm"
                 label-width="160px"
                 :rules="editRule"
                 :show-message="false"
                 style="display: flex;flex-wrap: wrap;">
          <el-form-item :label="$t('QualityInspectionList._53') + '：'"
                        prop="SN"
                        style="flex: 0 0 50%;">
            <el-input style="width: 100%"
                      v-model="editForm.SN" />
          </el-form-item>
          <el-form-item :label="$t('crp.tb_4') + '：'"
                        style="flex: 0 0 50%;"
                        prop="SITE_ID">
            <el-button type="primary"
                       @click="StationClick">{{$t('CollectProducts._34')}}</el-button>
            <span> {{StationName}}</span>
          </el-form-item>
          <el-form-item :label="$t('QualityInspectionList._24') + '：'">
            <el-radio-group v-model="editForm.STATUS"
                            style="flex: 0 0 100%;">
              <el-radio label="PASS">{{
                $t("QualityInspectionList._59")
              }}</el-radio>
              <el-radio label="FAIL">{{
                $t("QualityInspectionList._60")
              }}</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item :label="$t('QualityInspectionList._55') + '：'"
                        v-if="editForm.STATUS == 'FAIL'"
                        prop="DEFECT_CODE">
            <el-input @keyup.enter.native="defectChange"
                      v-model="editForm.DEFECT_CODE"
                      style="width: 43%" />
            <el-button type="primary"
                       @click="defectClick">{{
              $t("msh._5")
            }}</el-button>
          </el-form-item>
          <el-form-item :label="$t('QualityInspectionList._58') + '：'"
                        v-if="editForm.STATUS == 'FAIL'"
                        prop="DEFECT_MSG">
            <el-input v-model="editForm.DEFECT_MSG"
                      style="width: 50%" />
          </el-form-item>
          <el-form-item :label="$t('QualityInspectionList._57') + '：'"
                        v-if="editForm.STATUS == 'FAIL'"
                        prop="DEFECT_DESCRIPTION">
            <el-input v-model="editForm.DEFECT_DESCRIPTION"
                      disabled
                      style="width: 50%" />
          </el-form-item>
        </el-form>
      </div>
      <div style="margin-top: 10px; height: 200px">
        <vxe-table ref="projects"
                   border
                   resizable
                   height="100%"
                   size="small"
                   align="center"
                   highlight-hover-row
                   auto-resize
                   keep-source
                   show-overflow
                   stripe
                   @edit-closed="editClosed"
                   :data="annexTable"
                   :mouse-config="{ selected: true }"
                   :edit-config="{ trigger: 'click', mode: 'row', showStatus: true }"
                   :radio-config="{ labelField: 'name', trigger: 'row' }"
                   :checkbox-config="{ checkField: 'checked', trigger: 'row' }">
          <vxe-table-column min-width="80"
                            field="ORDER_NO"
                            :title="$t('QualityInspectionList._8')" />
          <vxe-table-column min-width="150"
                            field="STANDARD"
                            :title="$t('QualityInspectionList._45')"
                            :edit-render="{ name: '$input', props: { readonly: true } }" />
          <vxe-table-column min-width="150"
                            field="CHECK_QTY"
                            :title="$t('QualityInspectionList._24')"
                            :edit-render="{ name: '$input', props: { readonly: true } }" />
          <vxe-table-column min-width="150"
                            field="PASS"
                            :title="$t('QualityInspectionList._46')"
                            :edit-render="{ name: '$input', props: { readonly: true } }" />
          <vxe-table-column min-width="150"
                            field="FAIL"
                            :title="$t('QualityInspectionList._47')"
                            :edit-render="{
              name: '$input',
              props: { type: 'number', min: '0' },
            }" />
          <vxe-table-column min-width="150"
                            field="GUIDERANGER"
                            :title="$t('QualityInspectionList._48')"
                            :edit-render="{ name: '$input', props: { readonly: true } }" />
          <vxe-table-column min-width="150"
                            field="GUIDELINEVALUE1"
                            :title="$t('QualityInspectionList._49')"
                            :edit-render="{ name: '$input', props: { readonly: true } }" />
          <vxe-table-column min-width="150"
                            field="RESULT"
                            :title="$t('QualityInspectionList._50')"
                            :edit-render="{ name: '$input', props: { readonly: true } }">
            <template v-slot="{ row }">
              <span v-if="row.RESULT == 0"
                    style="color: #179415">{{
                $t("QualityInspectionList._31")
              }}</span>
              <span v-if="row.RESULT == 1">{{
                $t("QualityInspectionList._33")
              }}</span>
              <span v-else-if="row.RESULT == 2"
                    style="color: red">{{
                $t("QualityInspectionList._51")
              }}</span>
              <span v-else></span>
            </template>
          </vxe-table-column>
        </vxe-table>
      </div>
      <div style="margin-top: 10px; margin-bottom: 10px; height: 200px"
           v-show="editForm.STATUS == 'PASS'">
        <vxe-table ref="eTable"
                   border
                   resizable
                   height="100%"
                   size="small"
                   align="center"
                   highlight-hover-row
                   auto-resize
                   keep-source
                   show-overflow
                   stripe
                   :data="turnoverTable"
                   :mouse-config="{ selected: true }"
                   :edit-config="{ trigger: 'click', mode: 'row', showStatus: true }"
                   :radio-config="{ labelField: 'name', trigger: 'row' }"
                   :checkbox-config="{ checkField: 'checked', trigger: 'row' }">
          <vxe-table-column min-width="80"
                            type="seq"
                            :title="$t('QualityInspectionList._8')" />>
          <vxe-table-column min-width="150"
                            field="SN"
                            :title="$t('QualityInspectionList._53')"
                            :edit-render="{ name: '$input', props: { readonly: true } }" />
          <vxe-table-column min-width="150"
                            field="STATUS"
                            :title="$t('QualityInspectionList._54')"
                            :edit-render="{ name: '$input', props: { readonly: true } }">
            <template v-slot="{ row }">
              <span v-if="row.STATUS == 'PASS'"
                    style="color: #179415">{{
                $t("QualityInspectionList._31")
              }}</span>
              <span v-else-if="row.STATUS == 'FAIL'"
                    style="color: red">{{
                $t("QualityInspectionList._51")
              }}</span>
              <span v-else></span>
            </template>
          </vxe-table-column>

          <vxe-table-column min-width="150"
                            field="DEFECT_CODE"
                            :title="$t('QualityInspectionList._55')"
                            :edit-render="{ name: '$input', props: { readonly: true } }" />
          <vxe-table-column min-width="150"
                            field="DEFECT_LOC"
                            :title="$t('QualityInspectionList._56')"
                            :edit-render="{ name: '$input', props: { readonly: true } }" />
          <vxe-table-column min-width="150"
                            field="DEFECT_DESCRIPTION"
                            :title="$t('QualityInspectionList._57')"
                            :edit-render="{ name: '$input', props: { readonly: true } }" />
          <vxe-table-column min-width="150"
                            field="DEFECT_MSG"
                            :title="$t('QualityInspectionList._58')"
                            :edit-render="{ name: '$input', props: { readonly: true } }" />
          <vxe-table-column min-width="150"
                            field="SITE_NAME"
                            :title="$t('QualityInspectionList._74')"
                            :edit-render="{ name: '$input', props: { readonly: true } }" />

          <vxe-table-column :title="$t('QualityInspectionList._61')"
                            min-width="120"
                            align="center">
            <template v-slot="{ row }">
              <el-button type="danger"
                         @click="removeClick(row, row.$index)">{{
                $t("publics.btn.delete")
              }}</el-button>
            </template>
          </vxe-table-column>
        </vxe-table>
        <!-- 分页 -->
        <div class="QualityInspectionList-page">
          <el-pagination :current-page="formData2.Page"
                         :page-size="formData2.Limit"
                         :page-sizes="[15, 25, 35, 45]"
                         layout="total, sizes, prev, pager, next, jumper"
                         :total="totalPage2"
                         @size-change="handleSizeChange2"
                         @current-change="handleCurrentChange2" />
        </div>
      </div>
      <div slot="footer"
           style="text-align: center">
        <el-button type="primary"
                   @click="submitModifyForm">{{
          $t("ssc_rd.sure")
        }}</el-button>
        <el-button @click="Reset">{{ $t("navbar.reset") }}</el-button>
      </div>
    </el-dialog>
    <!-- 抽屉 筛选 -->
    <el-drawer :title="$t('MesProductionPreMst._18')"
               :visible.sync="drawer"
               direction="ltr">
      <div style="padding: 0 20px">
        <el-card class="box-card">
          <div slot="header"
               class="clearfix">
            <span>{{ $t("MesProductionPreMst._19") }}</span>
            <el-button style="float: right; padding: 3px 0"
                       type="text"
                       @click="searchClick">{{ $t("MesProductionPreMst._20") }}</el-button>
            <el-button style="float: right; padding: 3px 0; margin-right: 20px"
                       type="text"
                       @click="resetListQuery">{{ $t("MesProductionPreMst._21") }}</el-button>
          </div>
          <el-form class="custom-form"
                   ref="formData"
                   label-position="top"
                   label-width="80px"
                   :model="formData"
                   size="mini">
            <el-form-item label="">
              <el-select v-model="formData.LINE_ID"
                         clearable
                         style="width: 100%"
                         @clear="clearLine"
                         :placeholder="$t('QualityInspectionList._1')">
                <el-option v-for="item in lineList"
                           :key="item.ID"
                           :label="item.LINE_NAME"
                           :value="item.ID" />
              </el-select>
            </el-form-item>
            <el-form-item label="">
              <el-select v-model="formData.QC_TYPE"
                         clearable
                         style="width: 100%"
                         @clear="clearQctype"
                         :placeholder="$t('QualityInspectionList._2')">
                <el-option v-for="item in QctypeList"
                           :key="item.ID"
                           :label="item.LINE_NAME"
                           :value="item.ID" />
              </el-select>
            </el-form-item>
            <el-form-item label="">
              <el-input v-model="formData.BATCH_NO"
                        clearable
                        style="width: 100%"
                        :placeholder="$t('QualityInspectionList._13')"
                        @keyup.enter.native="searchClick" />
            </el-form-item>
            <el-form-item label="">
              <el-input v-model="formData.PART_NO"
                        clearable
                        style="width: 100%"
                        :placeholder="$t('QualityInspectionList._3')"
                        @keyup.enter.native="searchClick" />
            </el-form-item>
            <el-form-item label="">
              <el-input v-model="formData.WO_NO"
                        clearable
                        style="width: 100%"
                        :placeholder="$t('QualityInspectionList._4')"
                        @keyup.enter.native="searchClick" />
            </el-form-item>
            <el-form-item label="">
              <el-select v-model="formData.STATUS"
                         clearable
                         style="width: 100%"
                         @clear="clearSTATUS"
                         :placeholder="$t('QualityInspectionList._5')">
                <el-option v-for="item in statusList"
                           :key="item.ID"
                           :label="item.LINE_NAME"
                           :value="item.ID" />
              </el-select>
            </el-form-item>
            <el-form-item label="">
              <el-date-picker clearable
                              style="width: 100%; margin-right: 10px"
                              v-model="DateVal"
                              type="datetimerange"
                              range-separator="-"
                              :start-placeholder="$t('MesBatchManager._3')"
                              :end-placeholder="$t('MesBatchManager._4')" />
            </el-form-item>
          </el-form>
        </el-card>
      </div>
    </el-drawer>
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
              <span style="font-weight: 800; color: green">
                {{ $t("msh._64") }}
              </span>
            </el-radio>
            <!-- <el-radio v-model="reviewForm.ResultStatus"
                      :label="1">
              <span style="font-weight: 800; color: blue">
                {{ $t("msh._65") }}
              </span>
            </el-radio> -->
            <el-radio v-model="reviewForm.ResultStatus"
                      :label="2">
              <span style="font-weight: 800; color: orange">
                {{ $t("msh._66") }}
              </span>
            </el-radio>
            <!-- <el-radio v-model="reviewForm.ResultStatus"
                      :label="3">
              <span style="font-weight: 800; color: red">{{
                $t("msh._67")
              }}</span>
            </el-radio> -->
          </el-radio-group>
        </el-form-item>
        <el-form-item align="center">
          <el-button type="primary"
                     @click="ReviewSubmit">
            {{ $t("msh._60") }}
          </el-button>
          <el-button @click="reviewVisible = false">
            {{ $t("msh._68") }}
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 不良选择 -->
    <el-dialog v-dialogDrag
               width="80%"
               :title="$t('msh._82')"
               :visible.sync="badVisible"
               append-to-body
               class="MesSpotcheckHeader-dialog"
               :close-on-click-modal="false">
      <div class="header-container"
           style="padding-bottom: 10px">
        <el-select v-model="fectVal.DEFECT_TYPE"
                   class="filter-item"
                   style="width: 150px"
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
                   style="width: 150px"
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
                   style="width: 150px"
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
                   style="width: 150px"
                   :placeholder="$t('msh._86')">
          <el-option :value="0"
                     :label="$t('msh._86')" />
          <el-option v-for="item in LevelList"
                     :key="item.LOOKUP_CODE"
                     :label="item.CHINESE"
                     :value="item.LOOKUP_CODE" />
        </el-select>&nbsp;
        <el-input v-model="fectVal.DEFECT_CODE"
                  clearable
                  style="width: 200px"
                  :placeholder="$t('msh._75')"
                  @keyup.enter.native="badTable_search" />
        <el-button type="primary"
                   icon="el-icon-search"
                   @click="badTable_search">{{ $t("msh._5") }}</el-button>
        <el-button type="success"
                   @click="badClick">
          {{ $t("msh._60") }}
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
                   :edit-config="{ mode: 'row', showStatus: true }"
                   :radio-config="{ labelField: 'name', trigger: 'row' }"
                   @cell-click="badDetails">
          <vxe-table-column show-overflow
                            :title="$t('spf._38')"
                            type="radio"
                            width="80"
                            align="center" />
          <vxe-table-column align="center"
                            :title="$t('SamplingBadDetails._6')">
            <template slot-scope="scope">
              <span>{{ scope.$rowIndex + 1 }}</span>
            </template>
          </vxe-table-column>
          <vxe-table-column field="DEFECT_TYPE"
                            :label="$t('msh._128')"
                            align="center"
                            :edit-render="{ name: 'select', options: TypeListbox }" />
          <vxe-table-column field="DEFECT_CLASS"
                            :label="$t('msh._130')"
                            align="center"
                            :edit-render="{ name: 'select', options: ClassListbox }" />

          <vxe-table-column field="DEFECT_CATEGORY"
                            :label="$t('msh._129')"
                            align="center"
                            :edit-render="{ name: 'select', options: CategoryListbox }" />
          <vxe-table-column field="LEVEL_CODE"
                            :title="$t('msh._131')"
                            :edit-render="{ name: 'select', options: LevelListbox }"
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
    <!-- 选择工位 -->
    <el-dialog class="my-dialog"
               :title="$t('CollectProducts._34')"
               :visible.sync="dialogStation"
               width="30%"
               ref="myDialog"
               :close-on-click-modal="false"
               :before-close="handleClose">
      <el-form ref="form"
               label-width="80px"
               size="small"
               label-position="top">
        <el-form-item :label="$t('SfcsOperationSites._8')"
                      prop="OPERATION_LINE_ID">
          <el-select v-model="StationFrom.OPERATION_LINE_ID"
                     style="width:100%"
                     @change="operationCjange"
                     :placeholder="$t('SfcsOperationSites._9')">
            <el-option v-for="item in LineList"
                       :key="item.Id"
                       :label="item.OPERATION_LINE_NAME"
                       :value="item.Id" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('CollectProducts._35')">
          <el-select v-model="editForm.SITE_ID"
                     filterable
                     :placeholder="$t('CollectProducts._36')"
                     style="width: 100%"
                     @change="StationChange">
            <div style="position: absolute;width: 100%;height: 6px;background: #fff;background: #fff;top: 0;z-index: 99"></div>
            <div style="position: absolute;width: 100%;height: 6px;background: #fff;background: #fff;bottom: 0;z-index: 99"></div>
            <div style="width: 600px;display: flex;padding: 0 20px 0 10px;position: sticky;top: 6px;background: #fff;z-index: 90">
              <el-input v-model="StationFrom.OPERATION_SITE_NAME"
                        @input="getStatusList"
                        @keyup.enter.native="getStatusList"
                        :placeholder="$t('CollectProducts._37')"></el-input>
              <el-button type="primary"
                         icon="el-icon-search"
                         @click.prevent="getStatusList">{{ $t('publics.btn.search') }}</el-button>
            </div>
            <el-option v-for="(item,index) in StationtoList"
                       :key="index"
                       :disabled="!item.ID"
                       :label="item.OPERATION_SITE_NAME"
                       :value="item.ID"></el-option>
            <div style="width: 600px;position: sticky;bottom: 6px;background: #fff;z-index: 90;padding-left: 15px">
              <el-pagination :pager-count="5"
                             :current-page="StationFrom.Page"
                             :page-size="StationFrom.Limit"
                             :page-sizes="[15, 25, 35, 45]"
                             layout="total, sizes, prev, pager, next, jumper"
                             :total="StationtotalPage"
                             @size-change="StationSizeChange"
                             @current-change="StationCurrentChange" />
            </div>
          </el-select>
        </el-form-item>
      </el-form>
      <!-- <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogStation = false">
          {{
          $t("_kanban._4")
          }}
        </el-button>
        <el-button type="primary"
                   @click="dialogStation = false">
          {{
          $t("_kanban._5")
          }}
        </el-button>
      </span> -->
    </el-dialog>
  </d2-container>
</template>
<script>
import customContainerHeader from '@/components/custom-container-header'
import { mapGetters } from 'vuex'
import {
  LoadData,
  GetSpotcheckDetailByBatchNo,
  GetSpotcheckIteamsByBatchNo,
  GetSpotcheckFailDetail,
  VerifySpotcheckHeader,
  SaveFailDetailData,
  UpdateSpotCheckIteamsData,
  DeleteSpotCheckDetailByBatchNo
} from '@api/QualityInspectionList'
import {
  AddOrModify
} from '@/api/SfcsOperationSites'
import {
  Station
} from '@/api/CollectProducts'
import helper from '@/api/MesSpotcheckHeader'
const API = helper('MesSpotcheckHeader')
export default {
  name: 'QualityInspectionList',
  components: {
    customContainerHeader
  },
  computed: {
    ...mapGetters(['userinfo'])
  },
  data () {
    return {
      formData: {
        Page: 1,
        Limit: 15,
        LINE_ID: undefined, // 线别ID
        QC_TYPE: undefined, // 检验类型0：过程检验，1：完工检验
        PART_NO: '', // 产品料号
        BATCH_NO: '', // 抽检批次号
        WO_NO: '', // 工单
        STATUS: undefined, // 状态
        RESULT: undefined, // 结果
        BEGIN_DATE: '', // 开始时间
        END_DATE: '', // 结束时间
        WO_CLASS: '' // 班次
      },
      DateVal: '',
      QctypeList: [
        {
          ID: 0,
          LINE_NAME: '过程检验'
        },
        {
          ID: 1,
          LINE_NAME: '完工检验'
        }
      ],
      statusList: [
        {
          ID: 0,
          LINE_NAME: '新增'
        },
        {
          ID: 2,
          LINE_NAME: '确认'
        },
        {
          ID: 3,
          LINE_NAME: '审核'
        }
      ],
      formData2: {
        Page: 1,
        Limit: 15,
        Key: ''
      },
      lineList: [],
      lineListbox: [],
      loading: false,
      mainTable: [],
      totalPage: 0,

      // ---
      totalPage2: 0,
      activeName: 'first',
      // 基本信息
      materialsTable: {},
      // 质检数量
      annexTable: [],
      // 质检明细
      turnoverTable: [],
      turnoverForm: {
        Page: 1,
        Limit: 15,
        Key: ''
      },
      BarchNo: null,

      innerVisible: false,
      editForm: {
        SITE_ID: '',
        BATCH_NO: '', // 抽检批次号
        WO_NO: '', // 工单号
        USER_NAME: '', // 操作人
        SN: '', // 产品流水号
        STATUS: 'PASS', // 抽检状态：PASS ，FAIL
        DEFECT_CODE: '', // 不良代码
        DEFECT_LOC: '', // 不良位号
        DEFECT_DESCRIPTION: '', // 不良描述
        DEFECT_MSG: '' // 不良现象
      },
      editTable: [],
      editRule: {
        SN: [
          {
            required: true,
            message: '请输入产品流水号',
            trigger: 'blur'
          }
        ],
        SITE_ID: [
          {
            required: true,
            message: '请选择工位',
            trigger: 'blur'
          }
        ],
        DEFECT_CODE: [
          {
            required: true,
            message: '请输入不良代码',
            trigger: 'blur'
          }
        ],
        DEFECT_DESCRIPTION: [
          {
            required: true,
            message: '请输入不良描述',
            trigger: 'blur'
          }
        ],
        DEFECT_MSG: [
          {
            required: true,
            message: '请输入不良现象',
            trigger: 'blur'
          }
        ]
      },
      CurrentIndex: 0,
      MsaData: null,
      projectsForm: {
        BATCH_NO: '',
        ITEAMS: []
      },
      drawer: false,
      reviewVisible: false,
      reviewForm: {
        ResultStatus: 0
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
        DEFECT_LEVEL_CODE: 0,
        DEFECT_CODE: ''
      },
      fectValtotal: 0,
      badArr: [],
      LineList: [],
      // 工位
      StationName: '',
      dialogStation: false,
      StationtoList: [],
      StationtotalPage: 0,
      StationFrom: {
        OPERATION_LINE_ID: undefined,
        OPERATION_SITE_NAME: '',
        OPERATION_CATEGORY: 6,
        ENABLED: 'Y',
        Page: 1,
        Limit: 15
      }
    }
  },
  created () {
    this.getAddOrModify()
    this.getIndex()
    this.getLoadData()
    this.SelectDefect()
  },
  methods: {
    async getAddOrModify () {
      const res = await AddOrModify()
      if (res.Result) {
        this.LineList = res.Result.LineList
      }
    },
    handleClose (done) {
      this.innerVisible = false
      this.dialogStation = false
      // if (!this.editForm.SITE_ID) {
      //   this.$message.error(this.$t('CollectProducts._36'))
      // } else {
      //   done()
      // }
    },
    operationCjange (e) {
      this.editForm.SITE_ID = ''
      this.getStatusList()
    },
    // 工位
    StationClick () {
      this.dialogStation = true
    },
    StationChange (e) {
      if (!this.StationFrom.OPERATION_LINE_ID) {
        this.$message.error(this.$t('SfcsOperationSites._9'))
        return
      }
      this.StationtoList.map(v => {
        if (e === v.ID) {
          this.StationName = v.OPERATION_SITE_NAME
        }
      })
      this.dialogStation = false
    },
    async getStatusList () {
      const res = await Station(this.StationFrom)
      this.StationtotalPage = res.TotalCount
      const data = JSON.parse(res.Result)
      this.StationtoList = data || []
      if (this.StationtotalPage === 0) {
        this.StationtoList.push({
          OPERATION_SITE_NAME: '',
          ID: ''
        })
      }
    },
    StationSizeChange (Limit) {
      this.StationFrom.Page = 1
      this.StationFrom.Limit = Limit
      this.getStatusList()
    },
    StationCurrentChange (Page) {
      this.StationFrom.Page = Page
      this.getStatusList()
    },

    clearLine () {
      this.formData.LINE_ID = undefined
    },
    clearQctype () {
      this.formData.QC_TYPE = undefined
    },
    clearSTATUS () {
      this.formData.STATUS = undefined
    },
    async getIndex () {
      const res = await API.Index()
      this.lineList = res.Result ? res.Result : []
      this.lineListbox.push({
        label: '',
        value: '',
        disabled: false
      })
      this.lineList.map((item) => {
        this.lineListbox.push({
          label: item.LINE_NAME,
          value: item.ID,
          disabled: false
        })
      })
    },
    async getLoadData () {
      this.loading = true
      const res = await LoadData(this.formData)
      this.loading = false
      if (res.Result) {
        this.mainTable = JSON.parse(res.Result)
        this.totalPage = res.TotalCount
      }
      console.log('this.mainTable:', this.mainTable)
    },
    // tab切换
    handleClick (tab, event) {
      this.CurrentIndex = parseInt(tab.index)
      if (this.CurrentIndex === 0) {
        this.getMesMaterialInfoList(this.BarchNo)
      } else if (this.CurrentIndex === 1) {
        this.getMesBatchResourcesList(this.BarchNo)
      } else if (this.CurrentIndex === 2) {
        this.getMesBatchPrintList(this.BarchNo)
      }
    },
    // 审核
    Review () {
      console.log('this.MsaData', this.MsaData)
      if (this.MsaData === null) {
        this.$message.error(this.$t('QualityInspectionList._62'))
        return
      }
      if (this.MsaData.STATUS === 3) {
        this.$message.error(this.$t('QualityInspectionList._63'))
        return
      }
      this.reviewVisible = true
    },
    ReviewSubmit () {
      var ReviewObj = {
        BATCH_NO: this.MsaData.BATCH_NO, // 抽检批次号
        STATUS: 3, // 状态：0 新增； 2 确认；3审核；
        RESULT: this.reviewForm.ResultStatus, // 抽检判断结果0：合格，1：特采，2：返工，3：报废
        USER_NAME: this.userinfo.USER_NAME // 审核人
      }
      VerifySpotcheckHeader(ReviewObj).then((res) => {
        if (res.Result) {
          this.getLoadData()
          this.$notify({
            title: this.$t('se.success'),
            message: this.$t('publics.tips.submitSuccess'),
            type: 'success',
            duration: 2000
          })
          this.reviewVisible = false
        }
      })
    },
    // 取消审核
    CancelReview () {
      if (this.MsaData === null) {
        this.$message.error(this.$t('QualityInspectionList._64'))
        return
      }
      if (this.MsaData.STATUS !== 3) {
        this.$message.error(this.$t('QualityInspectionList._65'))
        return
      }
      var ReviewObj = {
        BATCH_NO: this.MsaData.BATCH_NO, // 抽检批次号
        STATUS: 0, // 状态：0 新增； 2 确认；3审核；
        // RESULT: this.reviewForm.ResultStatus, // 抽检判断结果0：合格，1：特采，2：返工，3：报废
        USER_NAME: this.userinfo.USER_NAME // 审核人
        // REMARK: '' // 备注
      }
      this.$confirm(
        this.$t('QualityInspectionList._67'),
        this.$t('QualityInspectionList._68'),
        {
          confirmButtonText: this.$t('se.confirm'),
          cancelButtonText: this.$t('se.cancel'),
          type: 'warning'
        }
      ).then(() => {
        VerifySpotcheckHeader(ReviewObj).then((res) => {
          if (res.Result) {
            this.getLoadData()
            this.$notify({
              title: this.$t('se.success'),
              message: this.$t('publics.tips.submitSuccess'),
              type: 'success',
              duration: 2000
            })
          }
        })
      })
    },
    // 选中
    cellClick (e) {
      console.log(this.CurrentIndex)
      // console.log(e)
      this.MsaData = e.row
      this.BarchNo = e.row.BATCH_NO
      if (this.CurrentIndex === 0) {
        this.getMesMaterialInfoList(e.row.BATCH_NO)
      } else if (this.CurrentIndex === 1) {
        this.getMesBatchResourcesList(e.row.BATCH_NO)
      } else if (this.CurrentIndex === 2) {
        this.getMesBatchPrintList(e.row.BATCH_NO)
      }
    },
    // 基本信息
    async getMesMaterialInfoList (e) {
      if (!this.BarchNo) return
      // this.formData2.LOC_NO = e 'QC2010150001ZG'
      const res = await GetSpotcheckDetailByBatchNo({ batchNo: e })
      console.log(res, '基本信息')
      this.materialsTable = res.Result ? res.Result : {}
    },
    // 质检项目
    async getMesBatchResourcesList (e) {
      if (!this.BarchNo) return
      // this.formData2.BT_MANAGER_ID = e  'QC2010150001ZG'
      const res = await GetSpotcheckIteamsByBatchNo({ batchNo: e })
      console.log(res, '质检项目')
      this.annexTable = res.Result ? res.Result : []
    },
    // 明细数据
    async getMesBatchPrintList (e) {
      if (!this.BarchNo) return
      this.turnoverForm.Key = this.BarchNo
      const res = await GetSpotcheckFailDetail(this.turnoverForm)
      var data = JSON.parse(res.Result)
      console.log(data, '明细数据')
      this.turnoverTable = data || []
      this.totalPage2 = res.TotalCount ? res.TotalCount : 0
    },
    // 检验
    async editClick (row) {
      // if (row.STATUS !== 0) {
      //   this.$message.error(this.$t('QualityInspectionList._69'))
      //   return
      // }
      this.editForm.BATCH_NO = row.BATCH_NO
      this.editForm.WO_NO = row.WO_NO
      this.editForm.USER_NAME = this.userinfo.USER_NAME
      this.editTable = []
      this.innerVisible = true
      this.MsaData = row
      this.BarchNo = row.BATCH_NO
      if (!this.editForm.SITE_ID) {
        this.dialogStation = true
      }
      this.getMesBatchResourcesList(row.BATCH_NO)
      this.getMesBatchPrintList(row.BATCH_NO)
    },
    async editClosed (e) {
      if (e.row.CHECK_QTY < e.row.FAIL + e.row.PASS) {
        // console.log('合格数量+不合格数量不能大于抽检数量')
        e.row.FAIL = 0
        this.$message.error(this.$t('QualityInspectionList._71'))
      }
    },
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
    },
    // 回车
    async defectChange () {
      if (!this.editForm.DEFECT_CODE) {
        this.$message.error(this.$t('msh._75'))
        return
      }
      this.fectVal.DEFECT_CODE = this.editForm.DEFECT_CODE
      const res = await API.LoadDefectData(this.fectVal)
      if (res.Result) {
        var data = JSON.parse(res.Result)
        if (data.length !== 0) {
          this.editForm.DEFECT_CODE = data[0].DEFECT_CODE
          this.editForm.DEFECT_DESCRIPTION = data[0].DEFECT_DESCRIPTION
        } else {
          this.$message.error(this.$t('QualityInspectionList._73'))
        }
      }
    },
    async getLoadDefectData () {
      const res = await API.LoadDefectData(this.fectVal)
      this.badTable = JSON.parse(res.Result)
      this.fectValtotal = res.TotalCount
    },
    // 搜索不良
    async defectClick () {
      this.fectVal.DEFECT_CODE = this.editForm.DEFECT_CODE
      this.getLoadDefectData()
      this.badVisible = true
    },
    //  点击选中不良项
    badDetails (e) {
      this.badradio = this.badTable.indexOf(e.row)
      this.badArr = e.row
    },
    // 确定不良
    badClick () {
      if (this.badArr.length !== 0) {
        this.editForm.DEFECT_CODE = this.badArr.DEFECT_CODE
        this.editForm.DEFECT_DESCRIPTION = this.badArr.DEFECT_DESCRIPTION
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
    //  搜索
    badTable_search () {
      this.fectVal.Page = 1
      this.getLoadDefectData()
    },
    // 保存
    submitModifyForm () {
      this.$refs.editForm.validate(async (valid, errInfo) => {
        if (valid) {
          var postdata = this.$refs.projects.getRecordset()
          if (
            postdata.insertRecords.length ||
            postdata.removeRecords.length ||
            postdata.updateRecords.length
          ) {
            this.$refs.projects.validate(async (valid) => {
              if (valid) {
                this.projectsForm.BATCH_NO = this.BarchNo
                this.projectsForm.ITEAMS = postdata.updateRecords
                UpdateSpotCheckIteamsData(this.projectsForm).then((resdata) => {
                  if (resdata.Result) {
                  }
                })
              }
            })
          }
          SaveFailDetailData(this.editForm).then((res) => {
            if (res.Result) {
              this.getLoadData()
              this.$notify({
                title: this.$t('publics.tips.success'),
                message: this.$t('publics.tips.submitSuccess'),
                type: 'success',
                duration: 2000
              })
              if (this.CurrentIndex === 0) {
                this.getMesMaterialInfoList(this.BarchNo)
              }
              this.getMesBatchResourcesList(this.BarchNo)
              this.getMesBatchPrintList(this.BarchNo)
            }
          })
        } else {
          try {
            Object.keys(errInfo).forEach(item => {
              this.$message.error(errInfo[item][0].message)
              throw new Error(new Date().toLocaleString())
            })
          } catch { }
        }
      })
    },
    // 删除
    async removeClick (row) {
      this.$confirm(
        this.$t('QualityInspectionList._70'),
        this.$t('QualityInspectionList._68'),
        {
          confirmButtonText: this.$t('se.confirm'),
          cancelButtonText: this.$t('se.cancel'),
          type: 'warning'
        }
      ).then(() => {
        DeleteSpotCheckDetailByBatchNo({
          batch_no: this.BarchNo,
          sn: row.SN
        }).then((res) => {
          if (res.Result) {
            this.getLoadData()
            this.getMesBatchPrintList(this.BarchNo)
            this.$notify({
              title: this.$t('se.success'),
              message: this.$t('se.sudeleted'),
              type: 'success',
              duration: 2000
            })
          }
        })
      })
    },
    // 重置
    Reset () {
      this.editForm.SN = ''
      this.editForm.DEFECT_CODE = ''
      this.editForm.DEFECT_DESCRIPTION = ''
      this.editForm.DEFECT_MSG = ''
    },
    // 查询
    searchClick () {
      this.formData.BEGIN_DATE = this.DateVal ? this.DateVal[0] : ''
      this.formData.END_DATE = this.DateVal ? this.DateVal[1] : ''
      this.formData.Page = 1
      this.getLoadData()
      this.drawer = false
    },
    // 查询重置
    resetListQuery () {
      this.formData = {}
      this.formData.Limit = 15
      this.formData.Page = 1
      this.DateVal = ''
    },
    // 分页
    handleSizeChange (val) {
      this.formData.Limit = val
      this.getLoadData()
    },
    handleCurrentChange (val) {
      this.formData.Page = val
      this.getLoadData()
    },
    handleSizeChange2 (val) {
      this.formData2.Limit = val
      this.getMesBatchPrintList()
    },
    handleCurrentChange2 (val) {
      this.formData2.Page = val
      this.getMesBatchPrintList()
    }
  }
}
</script>

<style lang="scss" scoped>
.QualityInspectionList-container {
  // height: calc(100vh - 60px - 41px - 53px - 300px);
  height: 35%;
}
.QualityInspectionList-page {
  height: 5%;
  margin-top: 10px;
}
.bottomTable-container {
  height: 55%;
}
.QualityInspectionList-tabs-form {
  display: flex;
  flex-wrap: wrap;
}
.container-table {
  height: calc(100vh - 390px);
}
</style>
<style lang="scss" >
.el-tabs__content {
  height: 85%;
}
.QualityInspectionList-item .el-form-item__content {
  display: flex;
}
.QualityInspectionList-tabs-form .el-form-item--mini.el-form-item,
.QualityInspectionList-tabs-form .el-form-item--small.el-form-item {
  flex: 0 0 33.3333%;
}
.basic-form {
  display: grid;
}
</style>
