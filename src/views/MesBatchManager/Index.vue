<template>
  <d2-container>
    <!-- 头部 -->
    <template slot="header">
      <custom-container-header :isExport="false"
                               :isExportTpl="false"
                               :isImport="false">
        <el-select v-model="formData.LINE_ID"
                   clearable
                   style="width: 200px"
                   :placeholder="$t('MesBatchManager._1')">
          <el-option v-for="(item,index) in lineList"
                     :key="index"
                     :label="item.LINE_NAME"
                     :value="item.ID" />
        </el-select>
        <el-input v-model="formData.Key"
                  clearable
                  style="width: 200px"
                  :placeholder="$t('MesBatchManager._2')"
                  @keyup.enter.native="searchClick" />
        <el-date-picker clearable
                        style="width: 300px; margin-right: 10px"
                        v-model="formData.time"
                        type="datetimerange"
                        range-separator="至"
                        :start-placeholder="$t('MesBatchManager._3')"
                        :end-placeholder="$t('MesBatchManager._4')" />
        <el-button type="primary"
                   icon="el-icon-search"
                   @click.prevent="searchClick">{{ $t("plbd.hd_sf") }}</el-button>
        <el-button type="success"
                   @click="addClick"
                   icon="el-icon-plus"
                   v-if="$btnList.indexOf('MesBatchManagerAdd') !== -1">{{ $t("plbd.add") }}</el-button>
      </custom-container-header>
    </template>
    <!-- 主表 -->
    <div class="ConfirmTable-container">
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
                          min-width="60" />
        <vxe-table-column min-width="140"
                          field="LINE_NAME"
                          :title="$t('MesBatchManager._5')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
        <vxe-table-column min-width="190"
                          field="LOC_NO"
                          :title="$t('MesBatchManager._6')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
        <vxe-table-column min-width="170"
                          field="WO_NO"
                          :title="$t('MesBatchManager._7')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
        <vxe-table-column min-width="150"
                          field="PART_NO"
                          :title="$t('MesBatchManager._8')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
        <vxe-table-column min-width="180"
                          field="DESCRIPTION"
                          :title="$t('MesBatchManager._9')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
        <vxe-table-column min-width="150"
                          field="PRODUCTION_TIME"
                          :title="$t('MesBatchManager._10')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
        <vxe-table-column min-width="170"
                          field="PRODUCTION_QTY"
                          :title="$t('MesBatchManager._11')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
        <vxe-table-column v-if="$btnList.indexOf('MesBatchManagerEdit') !== -1"
                          :title="$t('sdr_le.tb_og')"
                          min-width="120"
                          align="center"
                          fixed="right">
          <template v-slot="{ row }">
            <el-button size="mini"
                       type="primary"
                       @click="editClick(row, row.$index)">{{ $t("publics.btn.edit") }}</el-button>
          </template>
        </vxe-table-column>
      </vxe-table>
    </div>
    <!-- 分页 -->
    <div class="ConfirmPagination"
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
             type="card"
             @tab-click="handleClick"
             class="bottomTable-container">
      <el-tab-pane :label="$t('MesBatchManager._12')"
                   name="first"
                   style="height: 100%">
        <vxe-table ref="mTable"
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
                   :data="materialsTable"
                   :mouse-config="{ selected: true }"
                   :edit-config="{ trigger: 'click', mode: 'row', showStatus: true }"
                   :radio-config="{ labelField: 'name', trigger: 'row' }"
                   :checkbox-config="{ checkField: 'checked', trigger: 'row' }">
          <vxe-table-column min-width="80"
                            type="seq"
                            :title="$t('MesBatchManager._29')" />
          <vxe-table-column min-width="150"
                            field="REEL_ID"
                            :title="$t('MesBatchManager._13')"
                            :edit-render="{ name: '$input', props: { readonly: true } }" />
          <vxe-table-column min-width="150"
                            field="CODE"
                            :title="$t('MesBatchManager._14')"
                            :edit-render="{ name: '$input', props: { readonly: true } }" />
          <vxe-table-column min-width="150"
                            field="DESCRIPTION"
                            :title="$t('MesBatchManager._15')"
                            :edit-render="{ name: '$input', props: { readonly: true } }" />
          <vxe-table-column min-width="150"
                            field="USED_QTY"
                            :title="$t('MesBatchManager._16')"
                            :edit-render="{ name: '$input', props: { readonly: true } }" />
          <vxe-table-column min-width="150"
                            field="SUPPLY_BY"
                            :title="$t('MesBatchManager._17')"
                            :edit-render="{ name: '$input', props: { readonly: true } }" />
          <vxe-table-column min-width="150"
                            field="SUPPLY_TIME"
                            :title="$t('MesBatchManager._18')"
                            :edit-render="{ name: '$input', props: { readonly: true } }" />
          <vxe-table-column min-width="150"
                            field="STATION_ID"
                            :title="$t('MesBatchManager._19')"
                            :edit-render="{ name: '$input', props: { readonly: true } }" />
          <vxe-table-column min-width="150"
                            field="VENDOR_CODE"
                            :title="$t('MesBatchManager._20')"
                            :edit-render="{ name: '$input', props: { readonly: true } }" />
          <vxe-table-column min-width="150"
                            field="VENDOR_NAME"
                            :title="$t('MesBatchManager._21')"
                            :edit-render="{ name: '$input', props: { readonly: true } }" />
          <vxe-table-column min-width="150"
                            field="LOT_CODE"
                            :title="$t('MesBatchManager._6')"
                            :edit-render="{ name: '$input', props: { readonly: true } }" />
        </vxe-table>
      </el-tab-pane>
      <el-tab-pane :label="$t('MesBatchManager._22')"
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
          <vxe-table-column min-width="80"
                            type="seq"
                            :title="$t('MesBatchManager._29')" />
          <vxe-table-column min-width="300"
                            field="RESOURCE_NAME"
                            :title="$t('MesBatchManager._23')"
                            :edit-render="{ name: '$input', props: { readonly: true } }" />
          <vxe-table-column min-width="150"
                            field="RESOURCE_SIZE"
                            :title="$t('MesBatchManager._24')"
                            :edit-render="{ name: '$input', props: { readonly: true } }" />
          <vxe-table-column :title="$t('sdr_le.tb_og')"
                            min-width="120"
                            align="center">
            <template v-slot="{ row }">
              <el-button type="primary"
                         @click="downClick(row, row.$index)">{{
                $t("MesBatchManager._25")
              }}</el-button>
            </template>
          </vxe-table-column>
        </vxe-table>
      </el-tab-pane>
      <el-tab-pane :label="$t('MesBatchManager._26')"
                   name="third"
                   style="height: 100%">
        <el-form ref="turnoverForm"
                 :model="turnoverForm"
                 label-width="80px"
                 style="height: 20%">
          <el-form-item :label="$t('MesBatchManager._27')">
            <el-date-picker style="width: 300px; margin-right: 10px"
                            v-model="turnoverForm.time"
                            type="datetimerange"
                            range-separator="~"
                            :start-placeholder="$t('MesBatchManager._3')"
                            :end-placeholder="$t('MesBatchManager._4')" />
            <el-button type="primary"
                       @click.prevent="searchPrint">{{
              $t("plbd.hd_sf")
            }}</el-button>
            <el-button type="primary"
                       @click.prevent="openPrint"
                       v-if="$btnList.indexOf('SaveMesBatchPring') !== -1">{{ $t("MesBatchManager._28") }}</el-button>
          </el-form-item>
        </el-form>
        <vxe-table ref="tTable"
                   border
                   resizable
                   height="80%"
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
                            :title="$t('MesBatchManager._29')" />>
          <vxe-table-column min-width="150"
                            field="CODE"
                            :title="$t('MesBatchManager._30')"
                            :edit-render="{ name: '$input', props: { readonly: true } }" />
          <vxe-table-column min-width="150"
                            field="QTY"
                            :title="$t('MesBatchManager._31')"
                            :edit-render="{ name: '$input', props: { readonly: true } }" />
          <vxe-table-column min-width="150"
                            field="CARTON_NO"
                            :title="$t('MesBatchManager._32')"
                            :edit-render="{ name: '$input', props: { readonly: true } }" />
          <vxe-table-column min-width="150"
                            field="CREATE_TIME"
                            :title="$t('MesBatchManager._33')"
                            :edit-render="{ name: '$input', props: { readonly: true } }" />
          <vxe-table-column min-width="150"
                            field="CREATOR"
                            :title="$t('MesBatchManager._34')"
                            :edit-render="{ name: '$input', props: { readonly: true } }" />
        </vxe-table>
      </el-tab-pane>
    </el-tabs>
    <!-- 分页 -->
    <div class="ConfirmPagination">
      <el-pagination :current-page="formData2.Page"
                     :page-size="formData2.Limit"
                     :page-sizes="[15, 25, 35, 45]"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="totalPage2"
                     @size-change="handleSizeChange2"
                     @current-change="handleCurrentChange2" />
    </div>
    <!-- 编辑 -->
    <el-dialog v-dialogDrag
               width="70%"
               :title="dialogText"
               :visible.sync="innerVisible">
      <div style="display: grid">
        <el-form ref="editForm"
                 :model="editForm"
                 label-width="160px"
                 :rules="editRule"
                 :show-message="false">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('MesBatchManager._6')"
                            prop="LOC_NO">
                <el-input style="width: 75%"
                          v-model="editForm.LOC_NO" />
                <el-button type="primary"
                           style="float: right"
                           @click="openAdd">{{ $t("MesBatchManager._35") }}</el-button>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('MesBatchManager._36')">
                <el-input v-model="editForm.LINE_NAME"
                          style="width: 100%"
                          disabled />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('MesBatchManager._37')">
                <el-input v-model="editForm.WO_NO"
                          style="width: 100%"
                          disabled />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('MesBatchManager._10')">
                <el-date-picker style="width: 100%"
                                disabled
                                v-model="editForm.PRODUCTION_TIME"
                                type="datetime"
                                :placeholder="$t('MesBatchManager._38')" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-col :span="12">
            <el-form-item :label="$t('MesBatchManager._11')"
                          class="MesBatchManager-item">
              <el-input v-model="editForm.PRODUCTION_QTY"
                        style="width: 75%" />
              <el-upload :disabled="!editForm.LOC_NO"
                         ref="uploadfile"
                         :action="'#'"
                         :show-file-list="false"
                         :limit="1"
                         :http-request="handleUploadRequest">
                <el-button :disabled="!editForm.LOC_NO"
                           type="primary"
                           style="margin-left: 10px">{{ $t("MesBatchManager._39") }}</el-button>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-form>
      </div>
      <div style="margin-top: 10px; height: 300px">
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
                   :data="editTable"
                   :mouse-config="{ selected: true }"
                   :edit-config="{ trigger: 'click', mode: 'row', showStatus: true }"
                   :radio-config="{ labelField: 'name', trigger: 'row' }"
                   :checkbox-config="{ checkField: 'checked', trigger: 'row' }">
          <vxe-table-column min-width="80"
                            type="seq"
                            :title="$t('MesBatchManager._29')" />
          <vxe-table-column min-width="300"
                            field="RESOURCE_NAME"
                            :title="$t('MesBatchManager._23')"
                            :edit-render="{ name: '$input', props: { readonly: true } }" />
          <vxe-table-column min-width="150"
                            field="RESOURCE_SIZE"
                            :title="$t('MesBatchManager._24')"
                            :edit-render="{ name: '$input', props: { readonly: true } }" />
          <vxe-table-column :title="$t('sdr_le.tb_og')"
                            min-width="120"
                            align="center">
            <template v-slot="{ row }">
              <el-button type="primary"
                         @click="downClick(row, row.$index)">{{
                $t("MesBatchManager._25")
              }}</el-button>
              <el-button v-if="$btnList.indexOf('DeleteMesBatchResourcesById') !== -1"
                         type="danger"
                         @click="removeClick(row, row.$index)">{{ $t("publics.btn.delete") }}</el-button>
            </template>
          </vxe-table-column>
        </vxe-table>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="innerVisible = false">{{
          $t("ssc_rd.cancel")
        }}</el-button>
        <el-button type="primary"
                   @click="submitModifyForm">{{
          $t("ssc_rd.sure")
        }}</el-button>
      </span>
    </el-dialog>
    <!-- 查询新增 -->
    <el-dialog v-dialogDrag
               width="60%"
               :title="$t('MesBatchManager._35')"
               :visible.sync="addVisible">
      <el-row>
        <el-select v-model="addForm.LINE_ID"
                   clearable
                   style="width: 200px"
                   :placeholder="$t('MesBatchManager._40')">
          <el-option v-for="item in lineList"
                     :key="item.ID"
                     :label="item.LINE_NAME"
                     :value="item.ID" />
        </el-select>
        <el-input v-model="addForm.Key"
                  clearable
                  style="width: 200px"
                  :placeholder="$t('MesBatchManager._2')"
                  @keyup.enter.native="searchAddClick" />
        <el-date-picker clearable
                        style="width: 300px; margin-right: 10px"
                        v-model="addForm.time"
                        type="datetimerange"
                        range-separator="~"
                        :start-placeholder="$t('MesBatchManager._3')"
                        :end-placeholder="$t('MesBatchManager._4')" />
        <el-button type="primary"
                   icon="el-icon-search"
                   @click.prevent="searchAddClick">{{ $t("plbd.hd_sf") }}</el-button>
      </el-row>
      <el-row style="margin: 20px 0 10px 0; height: 300px">
        <vxe-table ref="addTable"
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
                   :data="addTable"
                   :mouse-config="{ selected: true }"
                   :edit-config="{ trigger: 'click', mode: 'row', showStatus: true }"
                   :radio-config="{ labelField: 'name', trigger: 'row' }"
                   :checkbox-config="{ checkField: 'checked', trigger: 'row' }">
          <vxe-table-column type="radio"
                            min-width="40" />
          <vxe-table-column min-width="150"
                            field="LINE_NAME"
                            :title="$t('MesBatchManager._5')"
                            :edit-render="{ name: '$input', props: { readonly: true } }" />
          <vxe-table-column min-width="180"
                            field="LOC_NO"
                            :title="$t('MesBatchManager._6')"
                            :edit-render="{ name: '$input', props: { readonly: true } }" />
          <vxe-table-column min-width="170"
                            field="WO_NO"
                            :title="$t('MesBatchManager._7')"
                            :edit-render="{ name: '$input', props: { readonly: true } }" />
          <vxe-table-column min-width="150"
                            field="PART_NO"
                            :title="$t('MesBatchManager._8')"
                            :edit-render="{ name: '$input', props: { readonly: true } }" />
          <vxe-table-column min-width="180"
                            field="DESCRIPTION"
                            :title="$t('MesBatchManager._9')"
                            :edit-render="{ name: '$input', props: { readonly: true } }" />
          <vxe-table-column min-width="150"
                            field="PRODUCTION_TIME"
                            :title="$t('MesBatchManager._10')"
                            :edit-render="{ name: '$input', props: { readonly: true } }" />
        </vxe-table>
      </el-row>
      <div>
        <el-pagination :current-page="addForm.Page"
                       :page-size="addForm.Limit"
                       :page-sizes="[15, 25, 35, 45]"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="addPage"
                       @size-change="handleSizeChangeAddForm"
                       @current-change="handleCurrentChangeAddForm" />
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="addVisible = false">{{
          $t("ssc_rd.cancel")
        }}</el-button>
        <el-button type="primary"
                   @click="makeSureAdd">{{
          $t("ssc_rd.sure")
        }}</el-button>
      </span>
    </el-dialog>
    <!-- 条码 -->
    <el-dialog v-dialogDrag
               width="60%"
               :title="$t('MesBatchManager._41')"
               :visible.sync="printVisible">
      <el-form ref="BarCodeForm"
               class="BarCodeForm"
               :model="BarCodeForm"
               label-width="170px"
               :show-message="false"
               :rules="codeRules">
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('MesBatchManager._6')">
              <el-input v-model="BarCodeForm.LOC_NO"
                        disabled />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('MesBatchManager._7')">
              <el-input v-model="BarCodeForm.WO_NO"
                        disabled />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('MesBatchManager._8')">
              <el-input v-model="BarCodeForm.PART_NO"
                        disabled />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('MesBatchManager._42')">
              <el-input v-model="BarCodeForm.CODE"
                        disabled />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item :label="$t('MesBatchManager._43')">
            <el-input v-model="BarCodeForm.DESCRIPTION"
                      disabled />
          </el-form-item>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('MesBatchManager._44')">
              <el-input v-model="BarCodeForm.CARTON_NO" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('MesBatchManager._45')"
                          prop="QTY">
              <el-input v-model="BarCodeForm.QTY"
                        type="number"
                        min="0" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="printVisible = false">{{
          $t("ssc_rd.cancel")
        }}</el-button>
        <el-button type="primary"
                   @click="PrintClick">{{
          $t("ssc_rd.sure")
        }}</el-button>
      </span>
    </el-dialog>
    <!-- 选择打印机  :before-close="WONOleClose"-->
    <el-dialog class="my-dialog"
               :title="$t('MesBatchManager._56')"
               :visible.sync="PrintoShow"
               width="30%"
               ref="PrintDialog"
               :close-on-click-modal="false">
      <!--  :before-close="handleClose"  SetPrinName  @change="operationCjange" -->
      <el-form ref="Printform"
               label-width="80px"
               size="small"
               label-position="top">
        <el-form-item :label="$t('MesBatchManager._57')">
          <el-select v-model="PrintName"
                     style="width: 100%"
                     @change="SetPrinName"
                     placeholder=" ">
            <el-option v-for="(item, index) in PrintList"
                       :key="index"
                       :label="item"
                       :value="item" />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="PrintoShow = false">
          {{ $t("_kanban._4") }}
        </el-button>
        <el-button type="primary"
                   @click="PrintoShow = false">
          {{ $t("_kanban._5") }}
        </el-button>
      </span>
    </el-dialog>
  </d2-container>
</template>

<script>
import util from '@/libs/util'
import customContainerHeader from '@/components/custom-container-header'
import { mapGetters } from 'vuex'
import request from '@/plugin/axios'
import {
  Index,
  LoadData,
  GetMesMaterialInfoList,
  GetMesBatchResourcesList,
  GetMesBatchPrintList,
  SaveData,
  GetMesBatchDataByLOCNO,
  JudgeLocNoIsExistByLocNo,
  DeleteMesBatchResourcesById,
  GetMesBatchPring,
  SaveMesBatchPring,
  // eslint-disable-next-line
  BackStageToPagePrintFile
} from '@api/MesBatchManager'
export default {
  name: 'MesBatchManager',
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
        Key: ''
      },
      formData2: {
        Page: 1,
        Limit: 15,
        Key: ''
      },
      lineList: [],
      loading: false,
      mainTable: [],
      totalPage: 0,
      totalPage2: 0,
      activeName: 'first',
      materialsTable: [],
      annexTable: [],
      turnoverTable: [],
      turnoverForm: {
        Page: 1,
        Limit: 999999,
        Key: ''
      },
      dialogText: '',
      innerVisible: false,
      editForm: {},
      editTable: [],
      uploadUrl: process.env.VUE_APP_API + 'File/UploadImage',
      annexAddData: {
        InsertRecords: [],
        UpdateRecords: [],
        InsertFileRecords: [],
        EditInsertFileRecords: []
      },
      addVisible: false,
      addForm: { Page: 1, Limit: 15 },
      addTable: [],
      addPage: 0,
      editRule: {
        LOC_NO: [
          {
            required: true,
            message: this.$t('MesBatchManager._46'),
            trigger: 'blur'
          }
        ]
      },
      timer: null,
      PrimaryTableID: null,
      printVisible: false,
      CurrentIndex: 0,
      PrimaryTableLocNo: null,
      BarCodeForm: {},
      codeRules: {
        QTY: [
          {
            required: true,
            message: this.$t('MesBatchManager._48'),
            trigger: 'blur'
          }
        ]
      },
      BarfCode: null,
      // 打印
      PrintoShow: false,
      PrintList: [],
      PrintName: '',
      printId: ''
    }
  },
  created () {
    this.getIndex()
    this.getLoadData()
  },
  methods: {
    async getIndex () {
      const res = await Index()
      this.lineList = res.Result ? res.Result.LINE_NAME : []
    },
    async getLoadData () {
      this.loading = true
      const res = await LoadData(this.formData)
      this.loading = false
      if (res.Result) {
        this.mainTable = res.Result
        this.totalPage = res.TotalCount
      }
    },
    handleClick (tab, event) {
      this.CurrentIndex = parseInt(tab.index)
      if (this.CurrentIndex === 0) {
        this.getMesMaterialInfoList(this.PrimaryTableLocNo)
      } else if (this.CurrentIndex === 1) {
        this.getMesBatchResourcesList(this.PrimaryTableID)
      } else if (this.CurrentIndex === 2) {
        this.getMesBatchPrintList(this.PrimaryTableID)
      }
    },
    cellClick (e) {
      console.log(this.CurrentIndex)
      // console.log(e)
      this.PrimaryTableID = e.row.ID
      this.PrimaryTableLocNo = e.row.LOC_NO
      if (this.CurrentIndex === 0) {
        this.getMesMaterialInfoList(e.row.LOC_NO)
      } else if (this.CurrentIndex === 1) {
        this.getMesBatchResourcesList(e.row.ID)
      } else if (this.CurrentIndex === 2) {
        this.getMesBatchPrintList(e.row.ID)
      }
    },
    // 物料信息
    async getMesMaterialInfoList (e) {
      if (!this.PrimaryTableID) return
      this.formData2.LOC_NO = e
      const res = await GetMesMaterialInfoList(this.formData2)
      this.materialsTable = res.Result ? res.Result : []
      this.totalPage2 = res.TotalCount ? res.TotalCount : 0
    },
    // 附件信息
    async getMesBatchResourcesList (e) {
      if (!this.PrimaryTableID) return
      this.formData2.BT_MANAGER_ID = e
      const res = await GetMesBatchResourcesList(this.formData2)
      this.annexTable = res.Result ? res.Result : []
      this.totalPage2 = res.TotalCount ? res.TotalCount : 0
    },
    // 周转条码
    async getMesBatchPrintList (e) {
      if (!this.PrimaryTableID) return
      this.turnoverForm.BT_MANAGER_ID = e
      const res = await GetMesBatchPrintList(this.turnoverForm)
      this.turnoverTable = res.Result ? res.Result : []
      this.totalPage2 = res.TotalCount ? res.TotalCount : 0
    },
    addClick () {
      this.dialogText = this.$t('plbd.add')
      this.editForm = {}
      this.editTable = []
      this.innerVisible = true
    },
    async editClick (row) {
      this.dialogText = this.$t('publics.btn.edit')
      this.editForm = row
      const res = await GetMesBatchResourcesList({
        BT_MANAGER_ID: this.editForm.ID
      })
      this.editTable = res.Result ? res.Result : []
      this.innerVisible = true
    },
    // 上传附件
    handleUploadRequest (data) {
      console.log(data)
      let formdata = new FormData()
      formdata.append('file', data.file)
      const token = util.cookies.get('token')
      const lang = {
        'zh-chs': 'zh-CN',
        en: 'en-US'
      }
      request
        .post(this.uploadUrl, formdata, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Accept-Language': lang[util.cookies.get('lang')]
          },
          timeout: 60000 * 5 // 请求超时时间}).then((res) => {
        })
        .then((res) => {
          if (res.data.Result) {
            const url = res.data.Result
            const nowDate = this.getNowDate(new Date())
            const record = {
              ID: 0,
              BT_MANAGER_ID: this.editForm.ID ? this.editForm.ID : 0,
              LINE_NAME: this.editForm.LINE_NAME ? this.editForm.LINE_NAME : '',
              RESOURCE_TYPE: 1,
              RESOURCES_URL: url,
              RESOURCE_NAME: data.file.name,
              RESOURCE_SIZE: (data.file.size / 1024).toFixed(),
              UPLOAD_USER: this.userinfo.USER_NAME,
              CREATE_TIME: nowDate
            }
            this.$refs.eTable.insertAt(record, 0).then(({ row }) => {
              this.$refs.eTable.setActiveRow(0)
            })
          }
        })
    },
    // 保存
    submitModifyForm () {
      this.$refs.editForm.validate(async (valid) => {
        if (valid) {
          this.annexAddData = {
            InsertRecords: [],
            UpdateRecords: [],
            InsertFileRecords: [],
            EditInsertFileRecords: []
          }
          const res = await JudgeLocNoIsExistByLocNo({
            locno: this.editForm.LOC_NO
          })
          var postdata = this.$refs.eTable.getRecordset()
          // var postdata = this.$refs.eTable.getTableData().tableData;
          console.log(postdata)
          if (this.dialogText === this.$t('plbd.add')) {
            if (res.Result) {
              return this.$message.error(this.$t('MesBatchManager._49'))
            }
            this.annexAddData.InsertFileRecords = postdata.insertRecords
            this.annexAddData.InsertRecords.push(this.editForm)
          } else if (this.dialogText === this.$t('publics.btn.edit')) {
            this.annexAddData.UpdateRecords.push(this.editForm)
            this.annexAddData.EditInsertFileRecords = postdata.insertRecords
          }
          SaveData(this.annexAddData).then((res) => {
            if (res.Result) {
              this.annexAddData = {}
              this.getLoadData()
              this.$notify({
                title: this.$t('publics.tips.success'),
                message: this.$t('publics.tips.submitSuccess'),
                type: 'success',
                duration: 2000
              })
              if (this.CurrentIndex === 0) {
                this.getMesMaterialInfoList(this.PrimaryTableLocNo)
              } else if (this.CurrentIndex === 1) {
                this.getMesBatchResourcesList(this.PrimaryTableID)
              } else if (this.CurrentIndex === 2) {
                this.getMesBatchPrintList(this.PrimaryTableID)
              }
            }
            this.innerVisible = false
          })
        }
      })
    },
    openAdd () {
      this.getMesBatchDataByLOCNO()
      this.addVisible = true
    },
    // 选择
    async getMesBatchDataByLOCNO () {
      // this.addForm.locno = this.editForm.LOC_NO
      const res = await GetMesBatchDataByLOCNO(this.addForm)
      this.addTable = res.Result ? res.Result : []
      this.addPage = res.TotalCount ? res.TotalCount : 0
    },
    // 选中
    makeSureAdd () {
      this.editForm = this.$refs.addTable.getRadioRecord()
      this.addVisible = false
    },
    // 删除附件
    removeClick (row) {
      console.log(row)
      this.$confirm(
        this.$t('publics.tips.makeSureDelete'),
        this.$t('MesTongsApply._91'),
        {
          confirmButtonText: this.$t('MesTongsApply._92'),
          cancelButtonText: this.$t('MesTongsApply._93'),
          type: 'warning'
        }
      )
        .then(async () => {
          const res = await DeleteMesBatchResourcesById(row.ID)
          if (res.Result) {
            this.$refs.eTable.remove(row)
            this.$message({
              type: 'success',
              message: this.$t('MesTongsApply._94')
            })
            this.getMesBatchResourcesList(this.editForm.ID)
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('MesTongsApply._95')
          })
        })
    },
    // 下载
    downClick (row) {
      window.open(process.env.VUE_APP_BASE_IMG + row.RESOURCES_URL.substr(1))
    },
    // 新增打印按钮
    async openPrint () {
      if (this.PrimaryTableID === null) {
        return this.$message.error(this.$t('MesBatchManager._50'))
      }
      const res = await GetMesBatchPring({ id: this.PrimaryTableID })
      const data = res.Result[0]
      this.BarCodeForm = data
      this.BarfCode = this.getCode(new Date())
      this.BarCodeForm.CODE = `ZZB${this.BarfCode}`
      this.printVisible = true
    },
    // 打印
    PrintClick () {
      this.$refs.BarCodeForm.validate(async (valid) => {
        if (valid) {
          const nowDate = this.getNowDate(new Date())
          const form = {
            InsertRecords: [
              {
                ID: 0,
                BT_MANAGER_ID: this.PrimaryTableID,
                CODE: this.BarfCode,
                QTY: parseInt(this.BarCodeForm.QTY),
                CARTON_NO: this.BarCodeForm.CARTON_NO || '',
                CREATE_TIME: nowDate,
                CREATOR: this.userinfo.USER_NAME
              }
            ]
          }
          const res = await SaveMesBatchPring(form)
          if (res.Result) {
            console.log(res.Result)
            this.printId = res.Result
            this.downSomething({
              PrintTaskId: res.Result,
              Printer: this.userinfo.USER_NAME
            })
            this.getMesBatchPrintList(this.PrimaryTableID)
            // this.backStageToPagePrintFile()
            // this.printVisible = false
            // this.$notify({
            //   title: this.$t('publics.tips.success'),
            //   message: this.$t('publics.tips.submitSuccess'),
            //   type: 'success',
            //   duration: 2000
            // })
          }
        }
      })
    },
    async downSomething (query) {
      var that = this
      request({
        url: 'http://localhost:42737/Printer/GetCurrentPrint',
        method: 'get'
      })
        .then((res) => {
          // loading.close()
          console.log(res, 'res.Resultres.Resultres.Result')
          if (res.Code === 1) {
            this.print(query)
          } else {
            this.GetPrintList()
          }
        })
        .catch(function () {
          // loading.close()
          that.$message({
            type: 'error',
            message: that.$t('MesBatchManager._55')
          })
        })
      // var that = this
      // const loading = this.$loading({
      //   lock: true, // 同v-loading的修饰符
      //   text: this.$t('MesBatchManager._54'), // 加载文案
      //   backgroundColor: 'rgba(55,55,55,0.4)', // 背景色
      //   spinner: 'el-icon-loading', // 加载图标
      //   target: document.querySelector('.BarCodeForm')// loading需要覆盖的DOM节点，默认为body
      // })
      // request({
      //   url: 'http://localhost:42737/Printer/BasePrinter',
      //   method: 'post',
      //   data: query
      // }).then(res => {
      //   loading.close()
      //   if (res.Code === 1) {
      //     this.printVisible = false
      //     this.$notify({
      //       title: this.$t('publics.tips.success'),
      //       message: this.$t('MesBatchManager._52'),
      //       type: 'success',
      //       duration: 2000
      //     })
      //   } else {
      //     this.printVisible = false
      //     this.$notify({
      //       title: this.$t('publics.tips.handleFail'),
      //       message: res.Msg,
      //       type: 'error',
      //       duration: 2000
      //     })
      //   }
      // }).catch(function () {
      //   loading.close()
      //   that.$message({
      //     type: 'error',
      //     message: that.$t('MesBatchManager._55')
      //   })
      // })
    },
    // 正在打印
    print (query) {
      var that = this
      const loading = this.$loading({
        lock: true, // 同v-loading的修饰符
        text: this.$t('MesBatchManager._54'), // 加载文案
        backgroundColor: 'rgba(55,55,55,0.4)', // 背景色
        spinner: 'el-icon-loading', // 加载图标
        target: document.querySelector('.BarCodeForm')
      })
      request({
        url: 'http://localhost:42737/Printer/BasePrinter',
        method: 'post',
        data: query
      })
        .then((res) => {
          loading.close()
          console.log(res, 'res.Resultres.Resultres.Result')
          if (res.Code === 1) {
            if (res.Data) {
              this.printVisible = false
              this.$notify({
                title: this.$t('publics.tips.success'),
                message: this.$t('MesBatchManager._52'),
                type: 'success',
                duration: 2000
              })
            } else {
              this.printVisible = false
              this.GetPrintList()
              this.$notify({
                title: this.$t('publics.tips.handleFail'),
                message: res.Msg,
                type: 'error',
                duration: 2000
              })
            }
          } else {
            this.printVisible = false
            this.$notify({
              title: this.$t('publics.tips.handleFail'),
              message: res.Msg,
              type: 'error',
              duration: 2000
            })
          }
        })
        .catch(function () {
          loading.close()
          that.$message({
            type: 'error',
            message: that.$t('MesBatchManager._55')
          })
        })
    },
    // 获取打印机
    async GetPrintList () {
      this.PrintoShow = true
      const res = await request({
        url: 'http://localhost:42737/Printer/GetPrintList',
        method: 'get'
      })
      if (res.Code === 1) {
        this.PrintList = res.Data
      }
    },
    // 选择名称
    async SetPrinName () {
      const res = await request({
        url: 'http://localhost:42737/Printer/SetPrintName',
        method: 'post',
        data: {
          PrintName: this.PrintName
        }
      })
      if (res.Code === 1) {
        this.print({
          PrintTaskId: this.printId,
          Printer: this.userinfo.USER_NAME
        })
      } else {
        this.$notify({
          title: this.$t('publics.tips.handleFail'),
          message: res.Msg,
          type: 'error',
          duration: 2000
        })
      }
    },
    // async backStageToPagePrintFile () {
    //   const res = await BackStageToPagePrintFile()
    //   if (res.Result) {
    //     console.log('000000000000', res.Result[0])
    //     const name = res.Result[0].FILE_NAME
    //     const txt = `${this.BarCodeForm.LOC_NO},${this.BarCodeForm.CODE},${this.BarCodeForm.WO_NO},${this.BarCodeForm.PART_NO},${this.BarCodeForm.DESCRIPTION},${this.BarCodeForm.CARTON_NO},${this.BarCodeForm.QTY}`
    //     this.download(name, txt)
    //   }
    //   console.log(res.Result)
    // },
    // download (filename, text) {
    //   var element = document.createElement('a')
    //   element.setAttribute(
    //     'href',
    //     'data:text/plain;charset=utf-8,' + encodeURIComponent(text)
    //   )
    //   element.setAttribute('download', filename)
    //   element.style.display = 'none'
    //   document.body.appendChild(element)
    //   element.click()
    //   document.body.removeChild(element)
    // },
    // 查询
    searchClick () {
      this.formData.StartDate = this.formData.time ? this.formData.time[0] : ''
      this.formData.EndDate = this.formData.time ? this.formData.time[1] : ''
      this.formData.Page = 1
      this.getLoadData()
    },
    searchAddClick () {
      this.addForm.StartDate = this.addForm.time ? this.addForm.time[0] : ''
      this.addForm.EndDate = this.addForm.time ? this.addForm.time[1] : ''
      this.addForm.Page = 1
      this.getMesBatchDataByLOCNO()
    },
    searchPrint () {
      if (!this.PrimaryTableID) {
        return this.$message.error(this.$t('MesBatchManager._51'))
      }
      console.log(this.turnoverForm.time)
      this.turnoverForm.StartDate = this.turnoverForm.time
        ? this.turnoverForm.time[0]
        : ''
      this.turnoverForm.EndDate = this.turnoverForm.time
        ? this.turnoverForm.time[1]
        : ''
      this.turnoverForm.Page = 1
      this.getMesBatchPrintList(this.PrimaryTableID)
    },
    handleSizeChange (val) {
      this.formData.Limit = val
      this.getLoadData()
    },
    handleCurrentChange (val) {
      this.formData.Page = val
      this.getLoadData()
    },
    handleSizeChange2 (val) {
      if (this.CurrentIndex === 0) {
        this.formData2 = { Page: 1, Limit: val, Key: '' }
        this.getMesMaterialInfoList(this.PrimaryTableLocNo)
      } else if (this.CurrentIndex === 1) {
        this.formData2 = { Page: 1, Limit: val, Key: '' }
        this.getMesBatchResourcesList(this.PrimaryTableID)
      } else if (this.CurrentIndex === 2) {
        this.getMesBatchPrintList(this.PrimaryTableID)
      }
    },
    handleCurrentChange2 (val) {
      if (this.CurrentIndex === 0) {
        this.formData2 = { Page: val, Limit: 15, Key: '' }
        this.getMesMaterialInfoList(this.PrimaryTableLocNo)
      } else if (this.CurrentIndex === 1) {
        this.formData2 = { Page: val, Limit: 15, Key: '' }
        this.getMesBatchResourcesList(this.PrimaryTableID)
      } else if (this.CurrentIndex === 2) {
        this.getMesBatchPrintList(this.PrimaryTableID)
      }
    },
    handleSizeChangeAddForm (val) {
      this.addForm.Limit = val
      this.getMesBatchDataByLOCNO()
    },
    handleCurrentChangeAddForm (val) {
      this.addForm.Page = val
      this.getMesBatchDataByLOCNO()
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
    // 获取条码编号
    getCode (date) {
      var y = date.getFullYear()
      y.toString().substr(2, 2)
      parseInt(y)
      var m = date.getMonth() + 1
      m = m < 10 ? '0' + m : m
      m.toString().substr(2, 2)
      parseInt(m)
      var d = date.getDate()
      d = d < 10 ? '0' + d : d
      var h = date.getHours()
      h = h < 10 ? '0' + h : h
      var minute = date.getMinutes()
      minute = minute < 10 ? '0' + minute : minute
      var second = date.getSeconds()
      second = second < 10 ? '0' + second : second
      return y + m + d + h + minute + second
    }
  }
}
</script>

<style lang="scss" scoped>
.ConfirmTable-container {
  // height: calc(100vh - 60px - 41px - 53px - 300px);
  height: 35%;
}
.ConfirmPagination {
  height: 5%;
}
.bottomTable-container {
  height: 50%;
}
</style>
<style lang="scss" >
.el-tabs__content {
  height: 80%;
}
.MesBatchManager-item .el-form-item__content {
  display: flex;
}
</style>
