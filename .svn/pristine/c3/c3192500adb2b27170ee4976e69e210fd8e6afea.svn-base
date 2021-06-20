<template>
  <d2-container class="SfcsRuncardRanger">
    <template slot="header">
      <custom-container-header :isExport="false"
                               :isExportTpl="false"
                               :isImport="false">
        <el-input v-model.trim="formData.WO_NO"
                  :placeholder="$t('srr._2')"
                  clearable
                  style="width: 150px"
                  @keyup.enter.native="searchClick" />&nbsp;
        <el-input v-model.trim="formData.PART_NO"
                  :placeholder="$t('srr._52')"
                  clearable
                  style="width: 150px"
                  @keyup.enter.native="searchClick" />&nbsp;
        <!-- <el-input v-model="formData.SN_BEGIN"
                  :placeholder="$t('srr._1')"
                  clearable
                  style="width: 150px"
                  @keyup.enter.native="searchClick" />&nbsp;

        <el-input v-model.trim="formData.SN_END"
                  :placeholder="$t('srr._53')"
                  clearable
                  style="width: 150px"
                  @keyup.enter.native="searchClick" />&nbsp;
        <el-input v-model.trim="formData.FIX_HEADER"
                  :placeholder="$t('srr._54')"
                  clearable
                  style="width: 150px"
                  @keyup.enter.native="searchClick" />&nbsp;
        <el-input v-model.trim="formData.FIX_TAIL"
                  :placeholder="$t('srr._55')"
                  clearable
                  style="width: 150px"
                  @keyup.enter.native="searchClick" />&nbsp; -->
        <el-button type="primary"
                   icon="el-icon-search"
                   @click.prevent="searchClick">{{ $t("srr._4") }}</el-button>
        <el-button type="primary"
                   icon="el-icon-finished"
                   @click.prevent="filterFlag = true">{{ $t("SmtPlacementHeader._1") }}</el-button>
        <el-button type="danger"
                   icon="el-icon-delete"
                   @click.prevent="eliminateClick">{{ $t("srr._5") }}</el-button>
        <el-button type="success"
                   icon="el-icon-check"
                   @click.prevent="preserveClick"
                   v-if="$btnList.indexOf('SfcsRuncardRangerSave') !== -1">{{ $t("srr._6") }}</el-button>
        <el-button type="warning"
                   icon="el-icon-printer"
                   @click.prevent="printClick(1)"
                   v-if="$btnList.indexOf('SfcsRuncardRangerPrintSnRanger') !== -1">
          {{ $t("srr._40") }}
        </el-button>
        <el-button v-if="
            $btnList.indexOf('SfcsRuncardRangerLaserTaskReleaseByType') !== -1
          "
                   type="warning"
                   icon="el-icon-thumb"
                   @click.prevent="handleTask">任务下达</el-button>
        <el-button v-if="$btnList.indexOf('SfcsRuncardRangerLoadLaserTaskData') !== -1"
                   icon="el-icon-tickets"
                   @click.prevent="handleOpenTaskList">任务列表</el-button>
        <!-- 下面的导入SN数据按钮停用 -->
        <!-- <el-upload
          style="margin: 0 10px"
          ref="upload"
          accept=".xls, .xlsx"
          class="avatar-uploader"
          :action="uploadUrl"
          :data="importData"
          :show-file-list="false"
          :headers="handleUploadHeader()"
          :on-success="handleSnSuccess"
          v-if="$btnList.indexOf('SfcsRuncardRangerSaveExcelData') !== -1"
        >
          <el-button type="primary" icon="el-icon-cloudy">
            {{ $t("srr._42") }}
          </el-button>
        </el-upload> -->
        <el-button type="primary"
                   icon="el-icon-cloudy"
                   @click="openImportInfoList"
                   v-if="$btnList.indexOf('LoadImportRuncardSnData') !== -1">导入信息列表</el-button>
        <el-button type="info"
                   icon="el-icon-s-order"
                   @click.prevent="ExportSnClick"
                   v-if="$btnList.indexOf('SfcsRuncardRangerExportSNRangerData') !== -1">
          {{ $t("srr._43") }}
        </el-button>
        <el-button type="primary"
                   v-if="$btnList.indexOf('PrintPuzzleSingleCode') !== -1"
                   @click="JigsawClick(1)"
                   icon="el-icon-printer">
          {{ $t("srr._44") }}
        </el-button>
        <el-button type="primary"
                   v-if="$btnList.indexOf('PrintPuzzleRemainingCodeBySN') !== -1"
                   @click="JigsawClick(2)"
                   icon="el-icon-printer">
          {{ $t("srr._45") }}
        </el-button>
      </custom-container-header>
    </template>
    <el-form ref="form"
             :show-message="false"
             :model="form"
             label-width="160px"
             :rules="rules">
      <el-row>
        <el-col :span="12">
          <el-form-item :label="$t('srr._3')"
                        prop="WO_NO">
            <el-input v-model.trim="form.WO_NO"
                      :placeholder="$t('srr._2')"
                      :disabled="wonoEdit"
                      @change="ProcessClick" />
          </el-form-item>
          <el-form-item :label="$t('srr._7')"
                        prop="RANGE">
            <el-input v-model.trim="form.RANGE"
                      :placeholder="$t('srr._17')"
                      type="number"
                      min="1"
                      :disabled="formEdit"
                      @change="GetCalculate" />
          </el-form-item>
          <el-form-item :label="$t('srr._8')"
                        prop="TAIL_LENGTH">
            <el-input v-model.trim="form.TAIL_LENGTH"
                      :placeholder="$t('srr._18')"
                      type="number"
                      min="0"
                      :disabled="formEdit"
                      @change="GetCalculate" />
          </el-form-item>
          <el-form-item :label="$t('srr._9')"
                        prop="HEADER_LENGTH">
            <el-input v-model.trim="form.HEADER_LENGTH"
                      :placeholder="$t('srr._19')"
                      type="number"
                      :disabled="disabfixed" />
          </el-form-item>
          <el-form-item :label="$t('srr._10')"
                        prop="SN_BEGIN">
            <el-input v-model.trim="form.SN_BEGIN"
                      :placeholder="$t('srr._20')"
                      :disabled="formnum"
                      @change="GetCalculate" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('srr._11')"
                        prop="DIGITAL">
            <el-select style="width: 100%"
                       v-model.trim="form.DIGITAL"
                       :placeholder="$t('srr._21')"
                       :disabled="formEdit"
                       @change="GetCalculate">
              <el-option v-for="item in DigitalList"
                         :key="item.LOOKUP_CODE"
                         :label="item.MEANING"
                         :value="item.LOOKUP_CODE" />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('srr._12')"
                        prop="QUANTITY">
            <el-input v-model.trim="form.QUANTITY"
                      :placeholder="$t('srr._22')"
                      :disabled="formnum"
                      type="number"
                      @change="GetCalculate" />
          </el-form-item>
          <el-form-item :label="$t('srr._13')"
                        prop="FIX_TAIL">
            <el-input v-model.trim="form.FIX_TAIL"
                      :placeholder="$t('srr._23')"
                      :disabled="disabfixed" />
          </el-form-item>
          <el-form-item :label="$t('srr._14')"
                        prop="FIX_HEADER">
            <el-input v-model.trim="form.FIX_HEADER"
                      :placeholder="$t('srr._24')"
                      :disabled="disabfixed" />
          </el-form-item>
          <el-form-item :label="$t('srr._15')"
                        prop="SN_END">
            <el-input v-model.trim="form.SN_END"
                      :placeholder="$t('srr._25')"
                      :disabled="disabfixed" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-tabs v-model="activeName"
             type="card">
      <el-tab-pane :label="$t('srr._35')"
                   name="annal">
        <div class="SfcsRuncardRanger-table">
          <vxe-table v-loading="loading"
                     ref="xTable"
                     border
                     stripe
                     keep-source
                     highlight-hover-row
                     highlight-current-row
                     show-overflow
                     auto-resize
                     width="100%"
                     height="100%"
                     :edit-config="{ mode: 'row', showStatus: true }"
                     :radio-config="{ labelField: 'name', trigger: 'row' }"
                     :data="annalTable"
                     @cell-click="obtain_but"
                     @radio-change="radioChangeEvent"
                     @checkbox-change="checkboxChangeEvent">
            <vxe-table-column show-overflow
                              :title="$t('srr._38')"
                              type="checkbox"
                              width="96"
                              align="center" />

            <vxe-table-column show-overflow
                              field="WO_NO"
                              :edit-render="{ name: 'input' }"
                              :title="$t('srr._3')"
                              align="center"
                              width="200" />
            <vxe-table-column show-overflow
                              field="PART_NO"
                              :edit-render="{ name: 'input' }"
                              :title="$t('slw.t_2')"
                              align="center"
                              width="215" />

            <vxe-table-column show-overflow
                              field="SN_BEGIN"
                              :title="$t('srr._10')"
                              :edit-render="{ name: 'input' }"
                              align="center"
                              min-width="170" />
            <vxe-table-column show-overflow
                              field="SN_END"
                              :title="$t('srr._15')"
                              :edit-render="{ name: 'input' }"
                              align="center"
                              min-width="170" />
            <vxe-table-column show-overflow
                              field="QUANTITY"
                              :title="$t('srr._12')"
                              :edit-render="{ name: 'input' }"
                              align="center"
                              width="150" />
            <vxe-table-column show-overflow
                              field="DIGITAL"
                              :title="$t('srr._11')"
                              :edit-render="{ name: 'select', options: DigitalListBox }"
                              align="center"
                              width="150" />
            <vxe-table-column show-overflow
                              field="RANGE"
                              :title="$t('srr._7')"
                              :edit-render="{ name: 'input' }"
                              align="center"
                              min-width="180" />

            <vxe-table-column show-overflow
                              field="FIX_HEADER"
                              :title="$t('srr._14')"
                              :edit-render="{ name: 'input' }"
                              align="center"
                              width="150" />
            <vxe-table-column show-overflow
                              field="FIX_TAIL"
                              :title="$t('srr._13')"
                              :edit-render="{ name: 'input' }"
                              align="center"
                              min-width="170" />
            <vxe-table-column show-overflow
                              field="HEADER_LENGTH"
                              :title="$t('srr._9')"
                              :edit-render="{ name: 'input' }"
                              align="center"
                              min-width="200" />
            <vxe-table-column width="150"
                              show-overflow
                              field="TAIL_LENGTH"
                              :title="$t('srr._8')"
                              :edit-render="{ name: 'input' }"
                              align="center" />
            <vxe-table-column width="230"
                              show-overflow
                              field="DESCRIPTION"
                              :title="$t('srr._50')"
                              :edit-render="{ name: 'input' }"
                              align="center" />
            <vxe-table-column width="150"
                              show-overflow
                              field="NAME"
                              :title="$t('srr._51')"
                              :edit-render="{ name: 'input' }"
                              align="center" />
            <vxe-table-column width="150"
                              show-overflow
                              field="STATUS"
                              :title="$t('srr._26')"
                              :edit-render="{ name: 'select', options: StatusListBox }"
                              align="center" />
            <vxe-table-column min-width="170"
                              show-overflow
                              field="EXCLUSIVE_CHAR"
                              :title="$t('srr._27')"
                              :edit-render="{ name: 'input' }"
                              align="center" />

            <vxe-table-column field="PRINTED"
                              fixed="right"
                              :title="$t('srr._28')"
                              :edit-render="{ autofocus: '.custom-input', type: 'visible' }"
                              min-width="160"
                              align="center">
              <template v-slot:edit="{ row }">
                <div class="rddselect">
                  <el-switch disabled
                             v-model="row.PRINTED"
                             :active-text="$t('srr._33')"
                             :inactive-text="$t('srr._34')"
                             active-color="#13ce66"
                             inactive-color="#cccccc"
                             active-value="Y"
                             inactive-value="N" />
                </div>
              </template>
            </vxe-table-column>
          </vxe-table>
        </div>
        <el-pagination class="SfcsRuncardRanger-pagination"
                       :current-page="formData.Page"
                       :page-size="formData.Limit"
                       :page-sizes="[15, 25, 35, 45]"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="total"
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange" />
      </el-tab-pane>
    </el-tabs>
    <!-- 选择打印机 -->
    <el-dialog class="my-dialog"
               :title="$t('MesBatchManager._56')"
               :visible.sync="PrintoShow"
               width="30%"
               ref="PrintDialog"
               :close-on-click-modal="false">
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
    <!-- 选择打印机 -->
    <el-dialog class="my-dialog"
               :title="JigsawType === 1 ? $t('srr._44') : $t('srr._45')"
               :visible.sync="JigsawoShow"
               width="30%"
               ref="JigsawDialog"
               :close-on-click-modal="false">
      <el-form ref="JigsawForm"
               label-width="80px"
               :model="JigsawForm"
               :rules="JigsawRules"
               :show-message="false"
               label-position="top">
        <el-form-item :label="$t('srr._49')"
                      prop="BoardQty"
                      v-if="JigsawType === 1">
          <el-input v-model="JigsawForm.BoardQty"
                    placeholder=" "
                    clearable
                    min="0"
                    type="number" />&nbsp;
        </el-form-item>
        <el-form-item label="SN"
                      prop="SN"
                      v-else>
          <el-input v-model="JigsawForm.SN"
                    placeholder=" "
                    clearable
                    type="text" />&nbsp;
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="JigsawoShow = false">
          {{ $t("_kanban._4") }}
        </el-button>
        <el-button type="primary"
                   @click="JigsawSubmit">
          {{ $t("_kanban._5") }}
        </el-button>
      </span>
    </el-dialog>
    <!-- 高级筛选 -->
    <el-drawer :title="'高级筛选'"
               :visible.sync="filterFlag"
               direction="ltr"
               size="30%">
      <el-card class="box-card"
               style="margin: 0 10px">
        <div slot="header"
             class="clearfix">
          <span>{{ "工单流水号范围筛选" }}</span>
          <el-button style="float: right; padding: 3px 0"
                     type="text">{{
            $t("SmtPlacementHeader._26")
          }}</el-button>
          <el-button style="float: right; padding: 3px 0; margin-right: 20px"
                     type="text"
                     @click="searchClick">{{ $t("SmtPlacementHeader._27") }}</el-button>
        </div>
        <div>
          <el-form class="custom-form"
                   label-position="top"
                   label-width="80px"
                   :model="formData"
                   size="mini">
            <el-form-item :label="'工单号'">
              <el-input v-model.trim="formData.WO_NO"
                        clearable></el-input>
            </el-form-item>
            <el-form-item :label="$t('SmtPlacementHeader._28')">
              <el-input v-model.trim="formData.PART_NO"
                        clearable></el-input>
            </el-form-item>
            <el-form-item :label="'开始流水号'">
              <el-input v-model.trim="formData.SN_BEGIN"
                        clearable />
            </el-form-item>
            <el-form-item :label="'结束流水号'">
              <el-input v-model.trim="formData.SN_END"
                        clearable></el-input>
            </el-form-item>
            <el-form-item :label="'固定头码'">
              <el-input v-model.trim="formData.FIX_HEADER"
                        clearable></el-input>
            </el-form-item>
            <el-form-item :label="'固定尾码'">
              <el-input v-model.trim="formData.FIX_TAIL"
                        clearable></el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </el-drawer>

    <!-- 下达任务列表 -->
    <el-dialog class="my-dialog"
               :title="'任务下达列表'"
               :visible.sync="TaskListFlag"
               width="100%"
               ref="TaskList"
               :close-on-click-modal="false">
      <div>
        <div>
          <el-input style="width: 150px"
                    v-model.trim="taskQuery.WO_NO"
                    placeholder="请输入工单号"></el-input>
          <el-input style="width: 150px"
                    v-model.trim="taskQuery.PART_NO"
                    placeholder="请输入料号"></el-input>
          <el-input style="width: 150px"
                    v-model.trim="taskQuery.PART_NO"
                    placeholder="请输入规格"></el-input>
          <el-select style="width: 150px"
                     v-model="taskQuery.TASK_TYPE"
                     placeholder="请选择任务类型"
                     clearable
                     filterable>
            <el-option label="工单流水号范围"
                       :value="1"></el-option>
            <el-option label="导入SN"
                       :value="2"></el-option>
            <el-option label="中转码"
                       :value="3"></el-option>
          </el-select>
          <el-select style="width: 150px"
                     v-model="taskQuery.MACHINE_CODE"
                     placeholder="请选择镭雕机栏位"
                     clearable
                     filterable>
            <div style="position: absolute;width: 100%;height: 6px;background: #fff;background: #fff;top: 0;z-index: 99"></div>
            <div style="position: absolute;width: 100%;height: 6px;background: #fff;background: #fff;bottom: 0;z-index: 99"></div>
            <div style="width: 300px;display: flex;padding: 0 20px 0 10px;position: sticky;top: 6px;background: #fff;z-index: 90">
              <el-input v-model="handleTaskform.MEANING"
                        @input="handleTasksearc"
                        @keyup.enter.native="handleTasksearc"
                        :placeholder="this.$t('请输入名称')" />
              <el-button type="primary"
                         icon="el-icon-search"
                         @click.prevent="handleTasksearc">{{ $t('publics.btn.search') }}</el-button>
            </div>

            <el-option v-for="(item,index) in handleTaskList"
                       :key="index"
                       :label="item.MEANING"
                       :value="item.MEANING">
            </el-option>
            <div style="width: 300px;position: sticky;bottom: 6px;background: #fff;z-index: 90;padding-left: 15px">
              <el-pagination :pager-count="5"
                             :current-page="handleTaskform.Page"
                             :page-size="handleTaskform.Limit"
                             :page-sizes="[15, 25, 35, 45]"
                             layout="total, sizes, prev, pager, next, jumper"
                             :total="handleTaskCount"
                             @size-change="handleTasksizeChange"
                             @current-change="handleTaskcurrentChange" />
            </div>
          </el-select>
          <el-select style="width: 150px"
                     v-model="taskQuery.ENABLED"
                     placeholder="请选择是否启用"
                     clearable
                     filterable>
            <el-option label="是"
                       value="Y"></el-option>
            <el-option label="否"
                       value="N"></el-option>
          </el-select>
          <el-button type="primary"
                     @click="searchTask">搜索</el-button>
          <!-- <div style="margin-top: 10px"> -->
          <el-button type="danger"
                     @click="batchCancel">批量取消任务</el-button>
          <el-button type="success"
                     @click="batchGoon">批量开始任务</el-button>
          <el-button type="danger"
                     @click="batchDelete">批量删除任务</el-button>
          <!-- </div> -->
        </div>
        <div>
          <vxe-table ref="xTableTask"
                     border
                     class="taskTable"
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
                     :loading="taskLoading"
                     :data="taskList">
            <vxe-table-column show-overflow
                              :title="$t('srr._38')"
                              type="checkbox"
                              width="96"
                              align="center"></vxe-table-column>
            <vxe-table-column show-overflow
                              :title="'任务类型'"
                              min-width="150"
                              align="center"
                              field="TASK_TYPE"
                              :formatter="formatterTaskType"></vxe-table-column>
            <vxe-table-column show-overflow
                              :title="'是否启用'"
                              min-width="100"
                              align="center"
                              field="ENABLED"
                              :formatter="formatterEnabled"></vxe-table-column>
            <vxe-table-column show-overflow
                              :title="'工单号'"
                              min-width="180"
                              :edit-render="{ name: '$input', props: { readonly: true } }"
                              align="center"
                              field="WO_NO" />
            <vxe-table-column show-overflow
                              :title="'镭雕机栏位'"
                              min-width="180"
                              :edit-render="{ name: '$input', props: { readonly: true } }"
                              align="center"
                              field="MACHINE_CODE" />
            <vxe-table-column show-overflow
                              :title="'料号'"
                              min-width="200"
                              :edit-render="{ name: '$input', props: { readonly: true } }"
                              align="center"
                              field="PART_NO"></vxe-table-column>
            <vxe-table-column show-overflow
                              :title="'规格'"
                              min-width="200"
                              align="center"
                              field="PART_DESC"
                              :edit-render="{ name: '$input', props: { readonly: true } }"></vxe-table-column>

            <vxe-table-column show-overflow
                              :title="'打印总数'"
                              min-width="100"
                              align="center"
                              field="PRINT_TOTAL"
                              :edit-render="{ name: '$input', props: { readonly: true } }"></vxe-table-column>
            <vxe-table-column show-overflow
                              :title="'已打印数量'"
                              min-width="100"
                              align="center"
                              field="PRINT_QTY"
                              :edit-render="{ name: '$input', props: { readonly: true } }"></vxe-table-column>
            <vxe-table-column show-overflow
                              :title="'打印状态'"
                              min-width="100"
                              align="center"
                              field="PRINT_STATUS"
                              :formatter="formatterPrintStatus"></vxe-table-column>
            <vxe-table-column show-overflow
                              :title="'创建人'"
                              min-width="150"
                              align="center"
                              field="CREATE_USER"
                              :edit-render="{ name: '$input', props: { readonly: true } }"></vxe-table-column>
            <vxe-table-column show-overflow
                              :title="'创建时间'"
                              min-width="180"
                              align="center"
                              field="CREATE_TIME"
                              :edit-render="{ name: '$input', props: { readonly: true } }"></vxe-table-column>
            <vxe-table-column show-overflow
                              :title="'修改人'"
                              min-width="150"
                              align="center"
                              field="UPDATE_USER"
                              :edit-render="{ name: '$input', props: { readonly: true } }"></vxe-table-column>
            <vxe-table-column show-overflow
                              :title="'修改时间'"
                              min-width="180"
                              align="center"
                              field="UPDATE_TIME"
                              :edit-render="{ name: '$input', props: { readonly: true } }"></vxe-table-column>
            <vxe-table-column fixed="right"
                              :title="'操作'"
                              min-width="290"
                              align="center">
              <template v-slot="{ row }">
                <div>
                  <el-button type="danger"
                             @click="cancelTask(row)">取消任务</el-button>
                  <el-button type="success"
                             @click="goonTask(row)">开始任务</el-button>
                  <el-button type="danger"
                             @click="DeletelTask(row)">删除任务</el-button>
                </div>
              </template>
            </vxe-table-column>
          </vxe-table>
        </div>
        <div style="padding-top: 10px; padding-bottom: 10px">
          <el-pagination :current-page="taskQuery.Page"
                         :page-size="taskQuery.Limit"
                         :page-sizes="[10, 20, 30, 40]"
                         layout="total, sizes, prev, pager, next, jumper"
                         :total="taskTotal"
                         @size-change="_handleSizeChange"
                         @current-change="_handleCurrentChange" />
        </div>
      </div>
    </el-dialog>

    <!-- 导入信息列表 -->
    <el-dialog class="my-dialog"
               :title="'导入信息列表'"
               :visible.sync="importInfoFlag"
               width="90%"
               top="10vh"
               ref="importInfo"
               :close-on-click-modal="false">
      <div>
        <div style="display: flex">
          <el-input style="width: 150px"
                    v-model.trim="importInfoQuery.WO_NO"
                    :placeholder="'请输入工单号'"></el-input>
          <el-input style="width: 150px"
                    v-model.trim="importInfoQuery.USER_NAME"
                    :placeholder="'请输入用户名'"></el-input>
          <el-button type="primary"
                     @click="handleSearchImportInfo">搜索</el-button>
          <el-button type="warning"
                     @click="handleTaskOther">任务下达</el-button>
          <el-button type="danger"
                     @click="batchDeleteImportInfo">批量删除</el-button>
          <el-button type="warning"
                     icon="el-icon-printer"
                     @click.prevent="printClick(2)"
                     v-if="$btnList.indexOf('SfcsRuncardRangerPrintSnRanger') !== -1">
            {{ $t("srr._40") }}
          </el-button>
          <!-- 批量导入 -->
          <!-- <el-upload style="margin: 0 10px"
                     ref="upload"
                     accept=".xls, .xlsx"
                     class="avatar-uploader"
                     :action="uploadUrl"
                     :data="importData"
                     :show-file-list="false"
                     :headers="handleUploadHeader()"
                     :on-success="handleSnSuccess"
                     v-if="$btnList.indexOf('SfcsRuncardRangerSaveExcelData') !== -1">
            <el-button type="primary"
                       icon="el-icon-cloudy">
              批量导入
            </el-button>
          </el-upload> -->
          <el-button type="primary"
                     @click="BatchVisible =true">批量导入</el-button>
        </div>
        <div>
          <vxe-table ref="xTableImportInfo"
                     border
                     class="ImprotInfoTable"
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
                     :loading="importInfoLoading"
                     :data="importInfoList">
            <vxe-table-column show-overflow
                              :title="$t('srr._38')"
                              type="checkbox"
                              width="96"
                              align="center" />
            <vxe-table-column show-overflow
                              :title="'工单号'"
                              min-width="180"
                              :edit-render="{ name: '$input', props: { readonly: true } }"
                              align="center"
                              field="WO_NO"></vxe-table-column>
            <vxe-table-column show-overflow
                              :title="'SN数量'"
                              min-width="200"
                              :edit-render="{ name: '$input', props: { readonly: true } }"
                              align="center"
                              field="SN_QTY"></vxe-table-column>
            <vxe-table-column show-overflow
                              :title="'导入日期'"
                              min-width="180"
                              :edit-render="{ name: '$input', props: { readonly: true } }"
                              align="center"
                              field="CREATE_TIME"></vxe-table-column>
            <vxe-table-column show-overflow
                              :title="'导入人员'"
                              min-width="150"
                              :edit-render="{ name: '$input', props: { readonly: true } }"
                              align="center"
                              field="CREATE_BY"></vxe-table-column>
            <vxe-table-column fixed="right"
                              :title="'操作'"
                              min-width="160"
                              align="center">
              <template v-slot="{ row }">
                <div>
                  <el-button type="info"
                             @click="handleOpenDetails(row)">详细</el-button>
                  <el-button type="danger"
                             @click="handleDeleteImportInfo(row)">删除</el-button>
                </div>
              </template>
            </vxe-table-column>
          </vxe-table>
        </div>
        <div style="padding-top: 10px; padding-bottom: 10px">
          <el-pagination :current-page="importInfoQuery.Page"
                         :page-size="importInfoQuery.Limit"
                         :page-sizes="[10, 20, 30, 40]"
                         layout="total, sizes, prev, pager, next, jumper"
                         :total="importInfoTotal"
                         @size-change="__handleSizeChange"
                         @current-change="__handleCurrentChange" />
        </div>
      </div>
    </el-dialog>

    <!-- 子表数据列表 -->
    <el-dialog class="my-dialog"
               :title="'导入信息列表'"
               :visible.sync="RuncardSnDataFlag"
               width="100%"
               top="9vh"
               ref="importInfoSon"
               :close-on-click-modal="false">
      <div>
        <div style="display: flex">
          <!-- <el-input
            style="width: 150px"
            v-model.trim="RuncardSnDataQuery.WO_NO"
            :placeholder="'请输入工单号'"
          ></el-input>
          <el-input
            style="width: 150px"
            v-model.trim="RuncardSnDataQuery.USER_NAME"
            :placeholder="'请输入用户名'"
          ></el-input>
          <el-button type="primary" @click="_handleSearchImportInfo"
            >搜索</el-button
          > -->
          <el-button type="success"
                     @click="handleAddImportInfo">新增</el-button>
          <el-button type="danger"
                     @click="_batchDeleteImportInfo">批量删除</el-button>

        </div>
        <div>
          <vxe-table ref="xTableImportInfoSon"
                     border
                     class="ImprotInfoTable"
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
                     :loading="RuncardSnDataLoading"
                     :data="RuncardSnDataList">
            <vxe-table-column show-overflow
                              :title="$t('srr._38')"
                              type="checkbox"
                              width="96"
                              align="center" />
            <vxe-table-column show-overflow
                              :title="'工单号'"
                              min-width="180"
                              :edit-render="{ name: '$input', props: { readonly: true } }"
                              align="center"
                              field="WO_NO"></vxe-table-column>

            <vxe-table-column show-overflow
                              :title="'产品类别'"
                              min-width="180"
                              :edit-render="{ name: '$input', props: { readonly: true } }"
                              align="center"
                              field="PART_TYPE" />
            <vxe-table-column show-overflow
                              :title="'产品代码（PN）'"
                              min-width="180"
                              :edit-render="{ name: '$input', props: { readonly: true } }"
                              align="center"
                              field="PART_PN" />
            <vxe-table-column show-overflow
                              :title="'商品代码(EAN)'"
                              min-width="180"
                              :edit-render="{ name: '$input', props: { readonly: true } }"
                              align="center"
                              field="PART_EAN" />
            <vxe-table-column show-overflow
                              :title="'客户'"
                              min-width="180"
                              :edit-render="{ name: '$input', props: { readonly: true } }"
                              align="center"
                              field="CUSTOMER" />
            <vxe-table-column show-overflow
                              :title="'客户机型'"
                              min-width="180"
                              :edit-render="{ name: '$input', props: { readonly: true } }"
                              align="center"
                              field="CUSTOMER_MODEL" />
            <vxe-table-column show-overflow
                              :title="'客户代码'"
                              min-width="180"
                              :edit-render="{ name: '$input', props: { readonly: true } }"
                              align="center"
                              field="CUSTOMER_CODE" />
            <vxe-table-column show-overflow
                              :title="'发货地'"
                              min-width="180"
                              :edit-render="{ name: '$input', props: { readonly: true } }"
                              align="center"
                              field="SUPPLY_LOCATION" />
            <vxe-table-column show-overflow
                              :title="'交货地'"
                              min-width="180"
                              :edit-render="{ name: '$input', props: { readonly: true } }"
                              align="center"
                              field="DELIVERY_LOCATION" />
            <vxe-table-column show-overflow
                              :title="'硬件版本'"
                              min-width="180"
                              :edit-render="{ name: '$input', props: { readonly: true } }"
                              align="center"
                              field="HARDWARE_VERSION" />
            <vxe-table-column show-overflow
                              :title="'软件版本'"
                              min-width="180"
                              :edit-render="{ name: '$input', props: { readonly: true } }"
                              align="center"
                              field="SOFTWARE_VERSION" />
            <vxe-table-column show-overflow
                              :title="'颜色'"
                              min-width="180"
                              :edit-render="{ name: '$input', props: { readonly: true } }"
                              align="center"
                              field="COLOUR" />
            <vxe-table-column show-overflow
                              :title="'客户批次号'"
                              min-width="180"
                              :edit-render="{ name: '$input', props: { readonly: true } }"
                              align="center"
                              field="CUSTOMER_BATCH_NO" />
            <vxe-table-column show-overflow
                              :title="'SN'"
                              min-width="200"
                              :edit-render="{ name: '$input', props: { readonly: true } }"
                              align="center"
                              field="SN"></vxe-table-column>
            <vxe-table-column show-overflow
                              :title="'SN2'"
                              min-width="180"
                              :edit-render="{ name: '$input', props: { readonly: true } }"
                              align="center"
                              field="SN2" />
            <vxe-table-column show-overflow
                              :title="'IMEI1'"
                              min-width="180"
                              :edit-render="{ name: '$input', props: { readonly: true } }"
                              align="center"
                              field="MAIN_CARD_IMEI" />
            <vxe-table-column show-overflow
                              :title="'IMEI2'"
                              min-width="180"
                              :edit-render="{ name: '$input', props: { readonly: true } }"
                              align="center"
                              field="MINOR_CARD_IMEI" />
            <vxe-table-column show-overflow
                              :title="'MEID'"
                              min-width="180"
                              :edit-render="{ name: '$input', props: { readonly: true } }"
                              align="center"
                              field="MEID" />
            <vxe-table-column show-overflow
                              :title="'MAC_ADD'"
                              min-width="180"
                              :edit-render="{ name: '$input', props: { readonly: true } }"
                              align="center"
                              field="MAC" />
            <vxe-table-column show-overflow
                              :title="'BT_ADD'"
                              min-width="180"
                              :edit-render="{ name: '$input', props: { readonly: true } }"
                              align="center"
                              field="BT" />

            <vxe-table-column show-overflow
                              :title="'导入日期'"
                              min-width="180"
                              :edit-render="{ name: '$input', props: { readonly: true } }"
                              align="center"
                              field="CREATE_TIME"></vxe-table-column>
            <vxe-table-column show-overflow
                              :title="'导入人员'"
                              min-width="150"
                              :edit-render="{ name: '$input', props: { readonly: true } }"
                              align="center"
                              field="CREATE_BY"></vxe-table-column>
            <vxe-table-column fixed="right"
                              :title="'操作'"
                              min-width="160"
                              align="center">
              <template v-slot="{ row }">
                <div>
                  <el-button type="primary"
                             @click="handleEditImportInfo(row)">修改</el-button>
                  <el-button type="danger"
                             @click="_handleDeleteImportInfo(row)">删除</el-button>
                </div>
              </template>
            </vxe-table-column>
          </vxe-table>
        </div>
        <div style="padding-top: 10px; padding-bottom: 10px">
          <el-pagination :current-page="RuncardSnDataQuery.Page"
                         :page-size="RuncardSnDataQuery.Limit"
                         :page-sizes="[10, 20, 30, 40]"
                         layout="total, sizes, prev, pager, next, jumper"
                         :total="RuncardSnDataTotalCount"
                         @size-change="___handleSizeChange"
                         @current-change="___handleCurrentChange" />
        </div>
      </div>
    </el-dialog>

    <!-- 新增\修改 导入信息 -->
    <el-dialog class="my-dialog"
               :title="'新增/修改信息'"
               :visible.sync="importInfoModifyFlag"
               width="70%"
               ref="importInfoModify"
               :close-on-click-modal="false">
      <div>
        <el-form ref="importInfoForm"
                 :show-message="false"
                 :model="importInfoForm"
                 label-width="120px"
                 size="mini"
                 class="importInfoFormClass"
                 :rules="importInfoFormRules">
          <el-form-item class="importInfoFormClass-item"
                        :label="'工单号'"
                        prop="WO_NO">
            <el-input v-model.trim="importInfoForm.WO_NO"
                      readonly
                      clearable></el-input>
          </el-form-item>
          <el-form-item class="importInfoFormClass-item"
                        :label="'产品类别'">
            <el-input v-model.trim="importInfoForm.PART_TYPE"
                      clearable></el-input>
          </el-form-item>
          <el-form-item class="importInfoFormClass-item"
                        :label="'产品代码（PN）'">
            <el-input v-model.trim="importInfoForm.PART_PN"
                      clearable></el-input>
          </el-form-item>
          <el-form-item class="importInfoFormClass-item"
                        :label="'商品代码(EAN)'">
            <el-input v-model.trim="importInfoForm.PART_EAN"
                      clearable></el-input>
          </el-form-item>
          <el-form-item class="importInfoFormClass-item"
                        :label="'客户'">
            <el-input v-model.trim="importInfoForm.CUSTOMER"
                      clearable></el-input>
          </el-form-item>
          <el-form-item class="importInfoFormClass-item"
                        :label="'客户机型'">
            <el-input v-model.trim="importInfoForm.CUSTOMER_MODEL"
                      clearable></el-input>
          </el-form-item>
          <el-form-item class="importInfoFormClass-item"
                        :label="'客户代码'">
            <el-input v-model.trim="importInfoForm.CUSTOMER_CODE"
                      clearable></el-input>
          </el-form-item>
          <el-form-item class="importInfoFormClass-item"
                        :label="'发货地'">
            <el-input v-model.trim="importInfoForm.SUPPLY_LOCATION"
                      clearable></el-input>
          </el-form-item>
          <el-form-item class="importInfoFormClass-item"
                        :label="'交货地'">
            <el-input v-model.trim="importInfoForm.DELIVERY_LOCATION"
                      clearable></el-input>
          </el-form-item>
          <el-form-item class="importInfoFormClass-item"
                        :label="'硬件版本'">
            <el-input v-model.trim="importInfoForm.HARDWARE_VERSION"
                      clearable></el-input>
          </el-form-item>
          <el-form-item class="importInfoFormClass-item"
                        :label="'软件版本'">
            <el-input v-model.trim="importInfoForm.SOFTWARE_VERSION"
                      clearable></el-input>
          </el-form-item>
          <el-form-item class="importInfoFormClass-item"
                        :label="'颜色'">
            <el-input v-model.trim="importInfoForm.COLOUR"
                      clearable></el-input>
          </el-form-item>
          <el-form-item class="importInfoFormClass-item"
                        :label="'客户批次号'">
            <el-input v-model.trim="importInfoForm.CUSTOMER_BATCH_NO"
                      clearable></el-input>
          </el-form-item>
          <el-form-item class="importInfoFormClass-item"
                        prop="SN"
                        :label="'SN'">
            <el-input v-model.trim="importInfoForm.SN"
                      clearable></el-input>
          </el-form-item>
          <el-form-item class="importInfoFormClass-item"
                        :label="'SN2'">
            <el-input v-model.trim="importInfoForm.SN2"
                      clearable></el-input>
          </el-form-item>
          <el-form-item class="importInfoFormClass-item"
                        :label="'主卡IMEI'"
                        prop="MAIN_CARD_IMEI">
            <el-input v-model.trim="importInfoForm.MAIN_CARD_IMEI"
                      clearable></el-input>
          </el-form-item>
          <el-form-item class="importInfoFormClass-item"
                        :label="'副卡IMEI'"
                        prop="MINOR_CARD_IMEI">
            <el-input v-model.trim="importInfoForm.MINOR_CARD_IMEI"
                      clearable></el-input>
          </el-form-item>
          <el-form-item class="importInfoFormClass-item"
                        :label="'BT'"
                        prop="BT">
            <el-input v-model.trim="importInfoForm.BT"
                      clearable></el-input>
          </el-form-item>
          <el-form-item class="importInfoFormClass-item"
                        :label="'MAC'"
                        prop="MAC">
            <el-input v-model.trim="importInfoForm.MAC"
                      clearable></el-input>
          </el-form-item>
          <el-form-item class="importInfoFormClass-item"
                        :label="'MEID'"
                        prop="MEID">
            <el-input v-model.trim="importInfoForm.MEID"
                      clearable></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="importInfoModifyFlag = false">取 消</el-button>
        <el-button type="primary"
                   @click="handleMakeSureModifyImportInfo">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 任务下达 -->
    <el-dialog class="my-dialog"
               :title="'镭雕机'"
               :visible.sync="handleTaskShow"
               width="30%"
               @close="closeTasl"
               ref="importInfoModify"
               :close-on-click-modal="false">
      <el-form ref="form"
               label-width="110px">
        <el-form-item :label="$t('镭雕机编号')">
          <el-select v-model="MACHINE_CODE"
                     style="width:100%"
                     placeholder=" ">
            <div style="position: absolute;width: 100%;height: 6px;background: #fff;background: #fff;top: 0;z-index: 99"></div>
            <div style="position: absolute;width: 100%;height: 6px;background: #fff;background: #fff;bottom: 0;z-index: 99"></div>
            <div style="width: 600px;display: flex;padding: 0 20px 0 10px;position: sticky;top: 6px;background: #fff;z-index: 90">
              <el-input v-model="handleTaskform.MEANING"
                        @input="handleTasksearc"
                        @keyup.enter.native="handleTasksearc"
                        :placeholder="this.$t('请输入名称')" />
              <el-button type="primary"
                         icon="el-icon-search"
                         @click.prevent="handleTasksearc">{{ $t('publics.btn.search') }}</el-button>
            </div>

            <el-option v-for="(item,index) in handleTaskList"
                       :key="index"
                       :disabled="!item.MEANING"
                       :label="item.MEANING"
                       :value="item.MEANING">
              <!-- <span style="float: left">{{ item.MEANING }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px"
                    v-if="item.ENABLED == 'N'">未激活</span> -->
            </el-option>
            <div style="width: 600px;position: sticky;bottom: 6px;background: #fff;z-index: 90;padding-left: 15px">
              <el-pagination :pager-count="5"
                             :current-page="handleTaskform.Page"
                             :page-size="handleTaskform.Limit"
                             :page-sizes="[15, 25, 35, 45]"
                             layout="total, sizes, prev, pager, next, jumper"
                             :total="handleTaskCount"
                             @size-change="handleTasksizeChange"
                             @current-change="handleTaskcurrentChange" />
            </div>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="handleTaskShow = false">取 消</el-button>
        <el-button type="primary"
                   @click="handleTasksubmin">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 批量导入 -->
    <el-dialog v-dialogDrag
               width="60%"
               title="批量导入"
               :visible.sync="BatchVisible"
               :close-on-click-modal="false"
               append-to-body>
      <el-form ref="BatchRef"
               :show-message="false"
               :model="Batchform"
               :rules="BatchRules"
               label-width="110px"
               style="display: flex;flex-wrap: wrap">
        <el-form-item :label="$t('流水号')"
                      prop="SN_CONFIG_VALUE"
                      style="flex: 0 0 50%;">
          <el-input v-model="Batchform.sn"
                    placeholder=" " />
        </el-form-item>
        <el-form-item :label="$t('流水号2')"
                      prop="SN2_CONFIG_VALUE"
                      style="flex: 0 0 50%;">
          <el-input v-model="Batchform.sn2"
                    placeholder=" " />
        </el-form-item>
        <el-form-item label="IMEI1"
                      prop="BatchRules"
                      style="flex: 0 0 50%;">
          <el-input v-model="Batchform.imei1"
                    placeholder=" " />
        </el-form-item>

        <el-form-item label="IMEI2"
                      prop="IMEI2_CONFIG_VALUE"
                      style="flex: 0 0 50%;">
          <el-input v-model="Batchform.imei2"
                    placeholder=" " />
        </el-form-item>
        <el-form-item label="MEID"
                      prop="MEID_CONFIG_VALUE"
                      style="flex: 0 0 50%;">
          <el-input v-model="Batchform.meid"
                    placeholder=" " />
        </el-form-item>
        <el-form-item label="MAC"
                      prop="MAC_CONFIG_VALUE"
                      style="flex: 0 0 50%;">
          <el-input v-model="Batchform.mac"
                    placeholder=" " />
        </el-form-item>
        <el-form-item label="BT"
                      prop="BT_CONFIG_VALUE"
                      style="flex: 0 0 50%;">
          <el-input v-model="Batchform.bt"
                    placeholder=" " />
        </el-form-item>
        <!--  <el-form-item label="文件"
                      prop="File"
                      style="flex: 0 0 50%;">
         <div style="display: flex;">
            <el-upload style="margin: 0 10px"
                       ref="upload"
                       accept=".xls, .xlsx"
                       class="avatar-uploader"
                       :action="uploadUrl"
                       :data="Batchform"
                       :show-file-list="false"
                       :headers="handleUploadHeader()"
                       :on-success="handleSnSuccess"
                       v-if="$btnList.indexOf('SfcsRuncardRangerSaveExcelData') !== -1">
              <el-button type="primary"
                         icon="el-icon-cloudy">
                批量导入
              </el-button>
            </el-upload>
            <span v-if="Batchform.File">已上传</span>
            <span v-else>未上传</span>
          </div>
        </el-form-item>-->
      </el-form>
      <div slot="footer"
           style="text-align: center;display: flex;justify-content: center;">
        <el-upload style="margin: 0 10px"
                   ref="upload"
                   accept=".xls, .xlsx"
                   class="avatar-uploader"
                   :action="uploadUrl"
                   :data="Batchform"
                   :show-file-list="false"
                   :headers="handleUploadHeader()"
                   :on-success="handleSnSuccess"
                   v-if="$btnList.indexOf('SfcsRuncardRangerSaveExcelData') !== -1">
          <el-button type="success">
            {{ $t("publics.btn.makeSure") }}
          </el-button>
        </el-upload>
        <!-- <el-button type="success"
                   @click="BatchSubmit('callVal')">&nbsp;{{ $t("publics.btn.makeSure") }}&nbsp;</el-button> -->
        <el-button @click="BatchVisible = false">&nbsp;{{ $t("publics.btn.cancel") }}&nbsp;</el-button>
      </div>
    </el-dialog>
  </d2-container>
</template>
<script>
import helper from '@/api/SfcsRuncardRanger'
import {
  LoadImportRuncardSnData, // 加载导入特殊SN数据
  SaveImportRuncardSnDataByTrans, // 保存导入特殊SN数据
  LoadLaserTaskData, // 镭雕任务下达数据列表
  LaserTaskReleaseByType, // 镭雕任务下达
  UpdateLaserTaskStatus, // 更新镭雕任务状态(批量)
  DelectLaserTask,
  LoadImportRuncardHeaderData,
  SaveImportRuncardHeaderByTrans, // 根据主表批量删除导入SN数据
  SaveExcelDataEx
} from '@/api/SfcsRuncardRangerEx'
import {
  sptLoadData // 镭雕任务下达编号
} from '@/api/SfcsParameters'

import customContainerHeader from '@/components/custom-container-header'
import request from '@/plugin/axios'
import { mapGetters } from 'vuex'
import { cloneDeep } from 'lodash'
const API = helper('SfcsRuncardRanger')
export default {
  name: 'SfcsRuncardRanger',
  components: {
    customContainerHeader
  },
  computed: {
    ...mapGetters(['userinfo'])
  },
  data () {
    return {
      rules: {
        WO_NO: [
          {
            required: true,
            message: this.$t('srr._2'),
            trigger: 'blur'
          }
        ],
        QUANTITY: [
          {
            required: true,
            message: this.$t('srr._22'),
            trigger: 'blur'
          }
        ],
        DIGITAL: [
          {
            required: true,
            message: this.$t('srr._21'),
            trigger: 'change'
          }
        ],
        RANGE: [
          {
            required: true,
            message: this.$t('srr._17'),
            trigger: 'blur'
          }
        ],
        TAIL_LENGTH: [
          {
            required: true,
            message: this.$t('srr._18'),
            trigger: 'blur'
          }
        ],
        SN_BEGIN: [
          {
            required: true,
            message: this.$t('srr._20'),
            trigger: 'blur'
          }
        ]
      },
      DigitalList: [],
      DigitalListBox: [],
      StatusList: [],
      StatusListBox: [],
      activeName: 'annal',
      radio: '',
      loading: false,
      annalTable: [],
      total: 0,
      formData: {
        WO_NO: '',
        SN_BEGIN: '',
        SN_END: '', // 结束流水号
        PART_NO: '', // 成品料号
        FIX_HEADER: '', // 固定头
        FIX_TAIL: '', // 固定尾
        Page: 1,
        Limit: 15
      },
      form: {
        ID: 0,
        WO_ID: 0,
        WO_NO: '', // 工单号
        SN_BEGIN: '', // 开始流水号
        QUANTITY: '', // 数量
        DIGITAL: '', // 进制
        RANGE: '', // 变化位数
        FIX_HEADER: '', // 固定头码
        TAIL_LENGTH: '', // 固定尾位数
        PRINTED: '',
        STATUS: 0, // 状态
        EXCLUSIVE_CHAR: '',
        RANGER_RULE_ID: 0,
        SN_END: '', // 结束流水号
        FIX_TAIL: '', // 固定尾码
        HEADER_LENGTH: '' // 固定头位
      },
      wonoEdit: false,
      formEdit: true,
      formnum: true,
      disabfixed: true,
      route: {
        wo_no: ''
      },
      selectRow: null,
      PrintParameters: {},
      // 打印
      PrintoShow: false,
      PrintList: [],
      PrintName: '',
      printId: '',
      uploadUrl: process.env.VUE_APP_API + 'SfcsRuncardRanger/SaveExcelData',
      importData: {},
      JigsawType: 1,
      JigsawoShow: false,
      JigsawForm: {
        Id: '',
        BoardQty: '',
        UserName: '',
        SN: ''
      },
      JigsawRules: {
        BoardQty: [
          {
            required: true,
            message: this.$t('srr._47'),
            trigger: 'blur'
          }
        ],
        SN: [
          {
            required: true,
            message: this.$t('srr._48'),
            trigger: 'blur'
          }
        ]
      },
      filterFlag: false,
      TaskListFlag: false,
      taskQuery: {
        Page: 1,
        Limit: 10,
        Key: ''
      },
      taskLoading: false,
      taskList: [],
      taskTotal: 0,
      importInfoList: [],
      importInfoFlag: false,
      importInfoQuery: {
        Page: 1,
        Limit: 10,
        Key: ''
      },
      importInfoLoading: false,
      importInfoTotal: 0,
      importInfoModifyFlag: false,
      importInfoForm: {},
      importInfoFormRules: {
        WO_NO: [
          {
            required: true,
            message: '请输入工单号',
            trigger: 'blur'
          }
        ],
        SN: [
          {
            required: true,
            message: '请输入SN',
            trigger: 'blur'
          }
        ]
      },
      RuncardSnDataFlag: false,
      RuncardSnDataList: [],
      RuncardSnDataQuery: {
        Page: 1,
        HEADER_ID: 0,
        WO_NO: '',
        USER_NAME: '',
        BEGIN_TIME: '',
        END_TIME: '',
        Limit: 10,
        Key: ''
      },
      RuncardSnDataTotalCount: 0,
      RuncardSnDataLoading: false,
      currentHeadRowInfo: {},
      // 任务下达
      handleTaskShow: false,
      handleTaskList: [],
      handleTaskCount: 0,
      handleTaskform: {
        Page: 1,
        Limit: 15,
        ENABLED: 'Y',
        NAME: '镭雕设备编号'
      },
      MACHINE_CODE: '',
      handleTaskStart: 1,
      // 批量导入
      BatchVisible: false,
      Batchform: {
        File: null,
        userName: '', // string操作用户
        sn: '', // string流水号校验配置值
        sn2: '', // string流水号2校验配置值
        imei1: '', // stringIMEI1校验配置值
        imei2: '', // stringIMEI2校验配置值
        meid: '', // stringMEID校验配置值
        mac: '', // stringMAC校验配置值
        bt: ''// stringBT校验配置值
      },
      BatchRules: {
        File: [
          {
            required: true,
            message: this.$t('请上传文件'),
            trigger: 'change'
          }
        ]
      }
    }
  },
  created () {
    this.Batchform.userName = this.userinfo.USER_NAME
    this.importData.userName = this.userinfo.USER_NAME
    this.JigsawForm.UserName = this.userinfo.USER_NAME
    this.getIndex()
    this.sptLoadData()
  },
  methods: {
    handleSnSuccess (response) {
      if (response.ErrorInfo.Status === true) {
        this.$message({
          message: response.ErrorInfo.Message,
          type: 'error'
        })
      } else {
        if (response.Result) {
          // this.Batchform.File = response.Result.Code
          this.Batchform = {}
          this.BatchVisible = false
        }
        // this.getLoadData() // 原逻辑
        this.handleLoadImportRuncardSnData() // 新逻辑
        this.$message({
          type: 'success',
          message: this.$t('se.picsucc')
        })
      }
    },
    // 导入
    ImportSnClick () {
      this.userName = this.userinfo.USER_NAME
    },
    // 导出
    async ExportSnClick () {
      if (this.form.WO_NO === '' || !this.form.WO_NO) {
        return this.$message.error(this.$t('srr._41'))
      }
      const res = await API.ExportSNRangerData({
        WO_NO: this.form.WO_NO,
        SN_BEGIN: this.form.SN_BEGIN
      })
      if (res.Result) {
        const data = res.Result.toString().replace(/,/g, ';\n')
        this.download(`${this.form.WO_NO}.txt`, data)
      }
    },
    download (filename, content, contentType) {
      if (!contentType) contentType = 'application/octet-stream'
      var a = document.createElement('a')
      var blob = new Blob([content], { type: contentType })
      a.href = window.URL.createObjectURL(blob)
      a.download = filename
      a.click()
    },
    // 打印（打印单个）
    async _printClick () {
      if (Object.keys(this.PrintParameters).length === 0) {
        return this.$message.error(this.$t('srr._41'))
      }
      const form = {
        ID: this.PrintParameters.ID,
        WO_ID: this.PrintParameters.WO_ID,
        SN_BEGIN: this.PrintParameters.SN_BEGIN,
        SN_END: this.PrintParameters.SN_END,
        QUANTITY: this.PrintParameters.QUANTITY,
        DIGITAL: this.PrintParameters.DIGITAL,
        RANGE: this.PrintParameters.RANGE,
        FIX_HEADER: this.PrintParameters.FIX_HEADER,
        FIX_TAIL: this.PrintParameters.FIX_TAIL,
        HEADER_LENGTH: this.PrintParameters.HEADER_LENGTH,
        TAIL_LENGTH: this.PrintParameters.TAIL_LENGTH,
        PRINTED: this.PrintParameters.PRINTED,
        EXCLUSIVE_CHAR: this.PrintParameters.EXCLUSIVE_CHAR,
        STATUS: this.PrintParameters.STATUS,
        RANGER_RULE_ID: this.PrintParameters.RANGER_RULE_ID
      }
      console.log(JSON.stringify(form))

      const res = await API.PrintSnRanger(form)
      if (res.Result) {
        this.printId = res.Result
        this.downSomething({
          PrintTaskId: res.Result,
          Printer: this.userinfo.USER_NAME
        })
      }
    },
    // 打印（打印多个）
    async printClick (row) {
      // const obj = []
      const form = []
      let ImportInfoTable = null
      if (row === 1) {
        this.selectRow = this.$refs.xTable.getCheckboxRecords() || []
        if (!this.selectRow || !this.selectRow.length) {
          return this.$message.error(this.$t('srr._41'))
        }
        this.selectRow.map((i) => {
          if (i.ID) {
            form.push({
              ID: i.ID,
              WO_ID: i.WO_ID,
              SN_BEGIN: i.SN_BEGIN,
              SN_END: i.SN_END,
              QUANTITY: i.QUANTITY,
              DIGITAL: i.DIGITAL,
              RANGE: i.RANGE,
              FIX_HEADER: i.FIX_HEADER,
              FIX_TAIL: i.FIX_TAIL,
              HEADER_LENGTH: i.HEADER_LENGTH,
              TAIL_LENGTH: i.TAIL_LENGTH,
              PRINTED: i.PRINTED,
              EXCLUSIVE_CHAR: i.EXCLUSIVE_CHAR,
              STATUS: i.STATUS,
              RANGER_RULE_ID: i.RANGER_RULE_ID
            })
          }
        })
        if (!form.length) {
          return this.$message.error(this.$t('srr._41'))
        }
      } else {
        ImportInfoTable = this.$refs.xTableImportInfo.getCheckboxRecords() || []
        if (!ImportInfoTable.length) {
          return this.$message.error(this.$t('SfcsPrintTasks._13'))
        }
        console.log(ImportInfoTable, 'ImportInfoTable')
        // ImportInfoTable.map(v => {
        //   obj.push({
        //     PrintTaskId: v.ID,
        //     Printer: this.userinfo.USER_NAME
        //   })
        // })
      }
      this.$confirm(
        this.$t('SfcsPrintTasks._25'),
        this.$t('MesTongsApply._91'),
        {
          confirmButtonText: this.$t('MesTongsApply._92'),
          cancelButtonText: this.$t('MesTongsApply._93'),
          type: 'warning'
        }
      )
        .then(async () => {
          var res = null
          if (row === 1) {
            res = await API.PrintSnRangerEx({
              modelList: form,
              UserName: this.userinfo.USER_NAME
            })
          } else {
            res = await API.PrintImportRuncardSN({
              modelList: ImportInfoTable,
              UserName: this.userinfo.USER_NAME
            })
          }
          if (res.Result) {
            const { MsgList = [], TaskIdList = [] } = res.Result
            if (MsgList.length) {
              const msg = MsgList.join('\r\n')
              this.$message.error(msg)
            }
            if (TaskIdList.length) {
              const query = []
              TaskIdList.map((i) => {
                query.push({
                  PrintTaskId: i,
                  Printer: this.userinfo.USER_NAME
                })
                console.log({ PrintTaskId: i, Printer: this.userinfo.USER_NAME })
              })
              this.TaskIdList = TaskIdList
              this.downSomething(query)
            }
          }
        })
        .catch(() => {

        })
    },

    async downSomething (query) {
      var that = this
      request({
        url: 'http://localhost:42737/Printer/GetCurrentPrint',
        method: 'get'
      })
        .then((res) => {
          if (res.Code === 1) {
            this.print(query)
          } else {
            this.GetPrintList()
          }
        })
        .catch(function () {
          that.$message({
            type: 'error',
            message: that.$t('MesBatchManager._55')
          })
        })
    },
    // 开始打印
    print (query) {
      var that = this
      const not = this.$notify({
        dangerouslyUseHTMLString: true,
        message:
          '<i class="el-icon-loading" style="font-size: 14px;color: #409EFF"></i> <strong style="color: #409EFF;font-size: 14px;margin-left: 5px">' +
          this.$t('MesBatchManager._54') +
          '</strong>',
        duration: 0,
        position: 'bottom-right'
      })

      request({
        url: 'http://localhost:42737/Printer/BasePrinterEx',
        method: 'post',
        data: query
      })
        .then((res) => {
          // loading.close()
          not.close()
          if (res.Code === 1) {
            if (res.Data) {
              this.$notify({
                title: this.$t('publics.tips.success'),
                message: this.$t('MesBatchManager._52'),
                type: 'success',
                duration: 2000
              })
              this.getLoadData()
            } else {
              this.GetPrintList()
              this.$notify({
                title: this.$t('publics.tips.handleFail'),
                message: res.Msg,
                type: 'error',
                duration: 2000
              })
            }
          } else {
            this.$notify({
              title: this.$t('publics.tips.handleFail'),
              message: res.Msg,
              type: 'error',
              duration: 2000
            })
          }
        })
        .catch(function () {
          not.close()
          that.$message({
            type: 'error',
            message: that.$t('MesBatchManager._55')
          })
        })
    },
    // 获取打印机列表
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
        const query = []
        this.TaskIdList.map((i) => {
          query.push({
            PrintTaskId: i,
            Printer: this.userinfo.USER_NAME
          })
        })
        // 重新打印
        this.print(query)
      } else {
        this.$notify({
          title: this.$t('publics.tips.handleFail'),
          message: res.Msg,
          type: 'error',
          duration: 2000
        })
      }
    },
    // async downSomething (query) {
    //   var that = this
    //   const loading = this.$loading({
    //     lock: true, // 同v-loading的修饰符
    //     text: this.$t('MesBatchManager._54'), // 加载文案
    //     backgroundColor: 'rgba(55,55,55,0.4)', // 背景色
    //     spinner: 'el-icon-loading' // 加载图标
    //   })
    //   request({
    //     url: 'http://localhost:42737/Printer/BasePrinter',
    //     method: 'post',
    //     data: query
    //   }).then(res => {
    //     loading.close()
    //     console.log(res, 'res.Resultres.Resultres.Result')
    //     if (res.Code === 1) {
    //       this.$notify({
    //         title: this.$t('publics.tips.success'),
    //         message: this.$t('MesBatchManager._52'),
    //         type: 'success',
    //         duration: 2000
    //       })
    //       this.getLoadData()
    //     } else {
    //       this.$notify({
    //         title: this.$t('publics.tips.handleFail'),
    //         message: this.$t('MesBatchManager._53'),
    //         type: 'error',
    //         duration: 2000
    //       })
    //     }
    //   }).catch(function () {
    //     loading.close()
    //     that.$message({
    //       type: 'error',
    //       message: that.$t('MesBatchManager._55')
    //     })
    //   })
    // },
    async getIndex () {
      const res = await API.Index()
      if (res.Result) {
        console.log(res)
        this.DigitalList = res.Result.DigitalList
        this.StatusList = res.Result.StatusList

        this.DigitalListBox.push({
          label: '',
          value: '',
          disabled: false
        })
        this.DigitalList.map((item) => {
          this.DigitalListBox.push({
            label: item.MEANING,
            value: Number(item.LOOKUP_CODE) ? Number(item.LOOKUP_CODE) : '',
            disabled: false
          })
        })
        this.StatusListBox.push({
          label: '',
          value: '',
          disabled: false
        })
        this.StatusList.map((item) => {
          this.StatusListBox.push({
            label: item.MEANING,
            value: Number(item.LOOKUP_CODE) ? Number(item.LOOKUP_CODE) : '',
            disabled: false
          })
        })

        this.getLoadData()
      }
    },
    // 单号查询
    async getLoadData () {
      this.loading = true
      const res = await API.LoadData(this.formData)
      this.loading = false
      if (res.Result) {
        this.annalTable = res.Result
        console.log(this.annalTable, '获取表格')
        this.total = res.TotalCount
      }
    },
    // 点击获取表格一行数据
    async obtain_but (e) {
      var data = e.row
      // console.log(data)
      this.radio = this.annalTable.indexOf(e)
      this.form.ID = data.ID
      this.form.WO_ID = data.WO_ID
      this.form.WO_NO = data.WO_NO
      this.form.STATUS = data.STATUS
      this.form.SN_BEGIN = data.SN_BEGIN
      this.form.SN_END = data.SN_END
      this.form.QUANTITY = data.QUANTITY ? data.QUANTITY : ''
      this.form.DIGITAL = data.DIGITAL ? data.DIGITAL : ''
      this.form.RANGE = data.RANGE
      this.form.FIX_HEADER = data.FIX_HEADER
      this.form.FIX_TAIL = data.FIX_TAIL
      this.form.HEADER_LENGTH = data.HEADER_LENGTH
      this.form.TAIL_LENGTH = data.TAIL_LENGTH
      this.form.RANGER_RULE_ID = data.RANGER_RULE_ID
      this.formEdit = true
      this.wonoEdit = true
      this.PrintParameters = data
      console.log(data, 'row.STATUSrow.STATUS')
      if (data.STATUS === 1) {
        this.formnum = false
      } else {
        this.formnum = true
      }
      this.JigsawForm.Id = data.ID
    },
    radioChangeEvent ({ row }) {
      this.selectRow = row
    },
    checkboxChangeEvent ({ records }) {
      this.selectRow = records
    },

    // 搜索
    async searchClick () {
      this.formData.Page = 1
      this.getLoadData()
    },
    // 回车获取工单号信息
    async ProcessClick (e) {
      this.route.wo_no = e
      this.getProcess()
    },
    async getProcess () {
      const res = await API.GetRuncardRangerData(this.route)
      if (res.Result !== void 0) {
        if (res.Result) {
          var row = res.Result
          this.form.ID = row.ID
          this.form.WO_ID = row.WO_ID
          this.form.STATUS = row.STATUS
          this.form.SN_BEGIN = row.SN_BEGIN
          this.form.SN_END = row.SN_END
          this.form.QUANTITY = row.QUANTITY ? row.QUANTITY : ''
          this.form.DIGITAL = row.DIGITAL ? row.DIGITAL : ''
          this.form.RANGE = row.RANGE
          this.form.FIX_HEADER = row.FIX_HEADER
          this.form.FIX_TAIL = row.FIX_TAIL
          this.form.HEADER_LENGTH = row.HEADER_LENGTH
          this.form.TAIL_LENGTH = row.TAIL_LENGTH
          this.form.RANGER_RULE_ID = row.RANGER_RULE_ID
          this.formEdit = true
          this.wonoEdit = true
          if (row.STATUS === 1) {
            this.formnum = false
          } else {
            this.formnum = true
          }
          if (row.STATUS === 1) {
            this.formnum = false
          } else {
            this.formnum = true
          }
          if (this.form.ID === 0) {
            this.formEdit = false
            this.wonoEdit = true
            this.formnum = false
          }
        } else {
          this.route.wo_no = ''
          this.form.WO_NO = ''
        }
      }

      console.log(res)
    },
    // 清空
    async eliminateClick () {
      this.formEdit = true
      this.wonoEdit = false
      this.formnum = true
      this.$refs.form.resetFields()
      this.selectRow = null
      this.$refs.xTable.clearCheckboxRow()
      this.$refs.xTable.clearRadioRow()
    },
    // 分页
    async handleSizeChange (val) {
      this.formData.Limit = val
      this.getLoadData()
    },
    async handleCurrentChange (val) {
      this.formData.Page = val
      this.getLoadData()
    },
    async GetCalculate () {
      this.$refs.form.validate((valid, errInfo) => {
        if (valid) {
          if (this.form.RANGE <= 0) {
            this.form.RANGE = ''
            this.$message.error(this.$t('srr._39'))
            return
          }
          API.GetCalculateRanger(this.form).then((res) => {
            if (res.Result) {
              this.form.SN_END = res.Result.SN_END
              this.form.FIX_HEADER = res.Result.FIX_HEADER
              this.form.FIX_TAIL = res.Result.FIX_TAIL
              this.form.HEADER_LENGTH = res.Result.HEADER_LENGTH
            } else {
              this.form.SN_END = ''
              this.form.FIX_HEADER = ''
              this.form.FIX_TAIL = ''
              this.form.HEADER_LENGTH = ''
            }
          })
        } else {
          try {
            Object.keys(errInfo).forEach((item) => {
              this.$message.error(errInfo[item][0].message)
              throw Error(errInfo[item][0].message)
            })
          } catch (e) { }
        }
      })
    },
    //  保存
    async preserveClick () {
      this.$refs.form.validate((valid, errInfo) => {
        if (valid) {
          this.saveData()
        } else {
          try {
            Object.keys(errInfo).forEach((item) => {
              this.$message.error(errInfo[item][0].message)
              throw Error(errInfo[item][0].message)
            })
          } catch (e) { }
        }
      })
    },
    async saveData () {
      const response = await API.SaveData(this.form)
      if (response.Result) {
        this.$notify({
          title: this.$t('srr._36'),
          message: this.$t('srr._37'),
          type: 'success',
          duration: 2000
        })
        this.eliminateClick()
        this.getLoadData()
      }
    },
    // 拼板打印
    JigsawClick (row) {
      this.JigsawType = row
      if (this.JigsawType === 1) {
        if (this.JigsawForm.Id === '') {
          this.$message.error(this.$t('srr._46'))
          return
        }
      }
      this.JigsawoShow = true
    },
    JigsawSubmit () {
      this.$refs.JigsawForm.validate(async (valid, errInfo) => {
        if (valid) {
          if (this.JigsawType === 1) {
            const res = await API.PrintPuzzleSingleCode(this.JigsawForm)
            if (res.Result) {
              this.downSomething({
                PrintTaskId: res.Result,
                Printer: this.userinfo.USER_NAME
              })
            }
          } else {
            var obj = {
              sn: this.JigsawForm.SN,
              UserName: this.userinfo.USER_NAME
            }
            const res = await API.PrintPuzzleRemainingCodeBySN(obj)
            if (res.Result) {
              this.downSomething({
                PrintTaskId: res.Result,
                Printer: this.userinfo.USER_NAME
              })
            }
          }
          this.JigsawoShow = false
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
    // TODO 任务下达
    async handleTask () {
      const selectRow = this.$refs.xTable.getCheckboxRecords() || []
      if (!selectRow || !selectRow.length) {
        return this.$message.error('请选择数据')
      }
      this.handleTaskStart = 1
      this.handleTaskShow = true
    },
    async handleTasksubmin () {
      if (this.handleTaskStart === 1) {
        this.handleTasksu()
      } else {
        this.handleTaskOthersunbmit()
      }
    },
    async handleTasksu () {
      if (this.MACHINE_CODE === '') {
        return this.$message.error('请选择镭雕机编号')
      }
      const selectRow = this.$refs.xTable.getCheckboxRecords() || []
      console.log(selectRow, 'selectRow===')
      const form = {
        USER_NAME: this.userinfo.USER_NAME,
        TASK_TYPE: 1, // 类型是工单流水号范围
        MACHINE_CODE: this.MACHINE_CODE,
        ID_LIST: selectRow.map((i) => i.ID)
      }
      const res = await LaserTaskReleaseByType(form)
      if (res.Result) {
        this.$notify({
          type: 'success',
          title: '成功',
          message: '任务下达成功'
        })
        this.$refs.xTable.clearCheckboxRow()
        this.MACHINE_CODE = ''
        this.handleTaskShow = false
      }
    },
    // 任务下拉
    async sptLoadData () {
      const res = await sptLoadData(this.handleTaskform)
      this.loading = false
      if (res.Result) {
        this.handleTaskList = res.Result || []
        // this.handleTaskList = []
        // data.map(v => {
        //   if (v.ENABLED === 'Y') {
        //     this.handleTaskList.push(v)
        //   }
        // })

        if (!this.handleTaskList.length) {
          this.handleTaskList.push({
            MEANING: '',
            ENABLED: 'Y'
          })
        }
        console.log(this.annalTable, '获取表格')
        this.handleTaskCount = res.TotalCount || 0
      }
    },
    handleTasksizeChange (Limit) {
      this.handleTaskform.Page = 1
      this.handleTaskform.Limit = Limit
      this.sptLoadData()
    },
    handleTaskcurrentChange (Page) {
      this.handleTaskform.Page = Page
      this.sptLoadData()
    },
    handleTasksearc () {
      this.handleTaskform.Page = 1
      this.sptLoadData()
    },

    // 打开任务列表
    handleOpenTaskList () {
      this.TaskListFlag = true
      this.getLaserTaskData()
    },
    // 获取任务列表
    async getLaserTaskData () {
      this.taskLoading = true
      const res = await LoadLaserTaskData(this.taskQuery).catch((_) => {
        this.taskLoading = false
      })
      this.taskLoading = false
      this.taskList = res.Result || []
      this.taskTotal = res.TotalCount || 0
    },
    // 搜索Task
    searchTask () {
      this.taskQuery.Page = 1
      this.getLaserTaskData()
    },
    // 批量取消
    batchCancel () {
      const rows = this.$refs.xTableTask.getCheckboxRecords()
      if (!rows || !rows.length) {
        return this.$message.error('请选择行记录')
      }
      this.$confirm('确定要批量取消任务么？', this.$t('cccn._21'), {
        confirmButtonText: this.$t('cccn._22'),
        cancelButtonText: this.$t('cccn._23'),
        type: 'warning'
      }).then(async (_) => {
        try {
          const data = rows.map((i, k) => {
            const { ID = 0, PRINT_STATUS = 0 } = i
            if (!ID) {
              throw Error(`第${k + 1}行，行数据信息缺失ID`)
            }
            if (PRINT_STATUS === '2') {
              throw Error(`第${k + 1}行，已打印记录无法更改状态`)
            }
            return {
              ID,
              ENABLED: 'N'
            }
          })
          const res = await UpdateLaserTaskStatus({
            USER_NAME: this.userinfo.USER_NAME,
            STATUS_LIST: data
          })
          if (res.Result) {
            this.$notify({
              title: '成功',
              message: '批量取消成功',
              type: 'success'
            })
            this.getLaserTaskData()
            this.$refs.xTableTask.clearCheckboxRow()
          }
        } catch (e) {
          this.$message.error(e.message)
        }
      })
    },
    // 格式化显示任务类型
    formatterTaskType ({ cellValue }) {
      if (!cellValue) {
        return ''
      }
      if (cellValue === '1') {
        return '工单流水号范围'
      } else if (cellValue === '2') {
        return '导入SN'
      } else if (cellValue === '3') {
        return '中转码'
      } else {
        return ''
      }
    },
    // 格式化打印状态
    formatterPrintStatus ({ cellValue }) {
      if (cellValue === '1') {
        return '未打印'
      } else if (cellValue === '2') {
        return '已打印'
      } else if (cellValue === '3') {
        return '打印完'
      } else {
        return ''
      }
    },
    // 取消任务
    cancelTask (row) {
      this.$confirm('确定要取消任务么？', this.$t('cccn._21'), {
        confirmButtonText: this.$t('cccn._22'),
        cancelButtonText: this.$t('cccn._23'),
        type: 'warning'
      }).then(async (_) => {
        const { ID = 0, ENABLED = '', PRINT_STATUS = 0 } = row
        if (!ID) {
          return this.$message.error('行数据信息缺失ID')
        }
        if (ENABLED !== 'Y') {
          return this.$message.error('行记录不是启用状态')
        }
        if (PRINT_STATUS === '2') {
          return this.$message.error('已打印记录无法更改状态')
        }
        const res = await UpdateLaserTaskStatus({
          USER_NAME: this.userinfo.USER_NAME,
          STATUS_LIST: [
            {
              ID: row.ID || 0,
              ENABLED: 'N'
            }
          ]
        })
        if (res.Result) {
          this.$notify({
            title: '成功',
            message: '取消成功',
            type: 'success'
          })
          this.getLaserTaskData()
        }
      })
    },
    _handleSizeChange (Limit) {
      this.taskQuery.Limit = Limit
      this.getLaserTaskData()
    },
    _handleCurrentChange (Page) {
      this.taskQuery.Page = Page
      this.getLaserTaskData()
    },
    // 批量开始任务
    batchGoon () {
      const rows = this.$refs.xTableTask.getCheckboxRecords()
      if (!rows || !rows.length) {
        return this.$message.error('请选择行记录')
      }
      this.$confirm('确定要批量开始任务么？', this.$t('cccn._21'), {
        confirmButtonText: this.$t('cccn._22'),
        cancelButtonText: this.$t('cccn._23'),
        type: 'warning'
      }).then(async (_) => {
        try {
          const data = rows.map((i, k) => {
            const { ID = 0, PRINT_STATUS = 0 } = i
            if (!ID) {
              throw Error(`第${k + 1}行，行数据信息缺失ID`)
            }
            if (PRINT_STATUS === '2') {
              throw Error(`第${k + 1}行，已打印记录无法更改状态`)
            }
            return {
              ID,
              ENABLED: 'Y'
            }
          })
          const res = await UpdateLaserTaskStatus({
            USER_NAME: this.userinfo.USER_NAME,
            STATUS_LIST: data
          })
          if (res.Result) {
            this.$notify({
              title: '成功',
              message: '批量启用成功',
              type: 'success'
            })
            this.getLaserTaskData()
            this.$refs.xTableTask.clearCheckboxRow()
          }
        } catch (e) {
          this.$message.error(e.message)
        }
      })
    },
    // 批量删除任务
    batchDelete () {
      const rows = this.$refs.xTableTask.getCheckboxRecords()
      if (!rows || !rows.length) {
        return this.$message.error('请选择行记录')
      }
      this.$confirm('确定要批量删除任务么？', this.$t('cccn._21'), {
        confirmButtonText: this.$t('cccn._22'),
        cancelButtonText: this.$t('cccn._23'),
        type: 'warning'
      }).then(async (_) => {
        try {
          const data = rows.map((i, k) => {
            console.log(i, k)
            const { ID = 0, ENABLED = '' } = i
            if (!ID) {
              throw Error(`第${i.R}行，行数据信息缺失ID`)
            }
            if (ENABLED === 'Y') {
              throw Error(`第${i.R}行，行记录激活状态不能删除`)
            }
            // PRINT_STATUS = 0
            return {
              ID,
              ENABLED: 'N'
            }
          })
          const res = await DelectLaserTask({
            USER_NAME: this.userinfo.USER_NAME,
            STATUS_LIST: data
          })
          if (res.Result) {
            this.$notify({
              title: '成功',
              message: '批量删除成功',
              type: 'success'
            })
            this.getLaserTaskData()
            this.$refs.xTableTask.clearCheckboxRow()
          }
        } catch (e) {
          this.$message.error(e.message)
        }
      })
    },
    // 开始任务
    goonTask (row) {
      this.$confirm('确定要开始任务么？', this.$t('cccn._21'), {
        confirmButtonText: this.$t('cccn._22'),
        cancelButtonText: this.$t('cccn._23'),
        type: 'warning'
      }).then(async (_) => {
        const { ID = 0, ENABLED = '', PRINT_STATUS = 0 } = row
        if (!ID) {
          return this.$message.error('行数据信息缺失ID')
        }
        if (ENABLED !== 'N') {
          return this.$message.error('行记录不是取消状态')
        }
        if (PRINT_STATUS === '2') {
          return this.$message.error('已打印记录无法更改状态')
        }
        const res = await UpdateLaserTaskStatus({
          USER_NAME: this.userinfo.USER_NAME,
          STATUS_LIST: [
            {
              ID: row.ID || 0,
              ENABLED: 'Y'
            }
          ]
        })
        if (res.Result) {
          this.$notify({
            title: '成功',
            message: '启用成功',
            type: 'success'
          })
          this.getLaserTaskData()
        }
      })
    },
    // 删除任务
    DeletelTask (row) {
      this.$confirm('确定要删除任务么？', this.$t('cccn._21'), {
        confirmButtonText: this.$t('cccn._22'),
        cancelButtonText: this.$t('cccn._23'),
        type: 'warning'
      }).then(async (_) => {
        const { ID = 0, ENABLED = '' } = row
        if (!ID) {
          return this.$message.error('行数据信息缺失ID')
        }
        if (ENABLED !== 'N') {
          return this.$message.error('行记录激活状态不能删除')
        }
        // PRINT_STATUS = 0
        // if (PRINT_STATUS === '2') {
        //   return this.$message.error('已打印记录无法更改状态')
        // }
        const res = await DelectLaserTask({
          USER_NAME: this.userinfo.USER_NAME,
          STATUS_LIST: [
            {
              ID: row.ID || 0,
              ENABLED: 'N'
            }
          ]
        })
        if (res.Result) {
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success'
          })
          this.getLaserTaskData()
        }
      })
    },
    formatterEnabled ({ cellValue }) {
      if (cellValue === 'Y') {
        return '是'
      } else if (cellValue === 'N') {
        return '否'
      } else {
        return ''
      }
    },
    // 打开导入信息列表
    openImportInfoList () {
      this.importInfoFlag = true
      this.handleLoadImportRuncardSnData()
    },
    // 导入信息列表搜索
    handleSearchImportInfo () {
      this.importInfoQuery.Page = 1
      this.handleLoadImportRuncardSnData()
    },
    // TODO 获取导入信息列表数据
    async handleLoadImportRuncardSnData () {
      this.importInfoLoading = true
      const res = await LoadImportRuncardHeaderData(this.importInfoQuery).catch(
        (_) => {
          this.importInfoLoading = false
        }
      )
      this.importInfoLoading = false
      this.importInfoList = res.Result || []
      this.importInfoTotal = res.TotalCount || 0
    },
    __handleSizeChange (Limit) {
      this.importInfoQuery.Limit = Limit
      this.handleLoadImportRuncardSnData()
    },
    __handleCurrentChange (Page) {
      this.importInfoQuery.Page = Page
      this.handleLoadImportRuncardSnData()
    },

    // 打开详情
    async handleOpenDetails (row) {
      this.RuncardSnDataLoading = true
      const res = await LoadImportRuncardSnData({
        HEADER_ID: row.ID || 0,
        Page: 1,
        Limit: 10
      }).catch(_ => {
        this.RuncardSnDataLoading = false
      })
      this.RuncardSnDataLoading = false
      if (res.Result) {
        this.currentHeadRowInfo = cloneDeep(row) || {}
        this.RuncardSnDataFlag = true
        this.RuncardSnDataQuery.HEADER_ID = row.ID
        this.RuncardSnDataQuery.Page = 1
        this.RuncardSnDataList = res.Result || []
        this.RuncardSnDataTotalCount = res.TotalCount || 0
      } else {
        this.currentHeadRowInfo = {}
        this.RuncardSnDataFlag = false
        this.RuncardSnDataQuery = {
          Page: 1,
          HEADER_ID: 0,
          WO_NO: '',
          USER_NAME: '',
          BEGIN_TIME: '',
          END_TIME: '',
          Limit: 10,
          Key: ''
        }
        this.RuncardSnDataList = []
        this.RuncardSnDataTotalCount = 0
      }
    },

    // 获取子表数据详情
    async getSonData () {
      if (!this.RuncardSnDataQuery.HEADER_ID) {
        this.RuncardSnDataFlag = false
        return this.$message.error('缺少ID')
      }
      this.RuncardSnDataLoading = true
      const res = await LoadImportRuncardSnData(this.RuncardSnDataQuery).catch(_ => {
        this.RuncardSnDataLoading = false
      })

      this.RuncardSnDataLoading = false
      this.RuncardSnDataList = res.Result || []
      this.RuncardSnDataTotalCount = res.TotalCount || 0
    },

    ___handleSizeChange (Limit) {
      this.RuncardSnDataQuery.Limit = Limit
      this.getSonData()
    },
    ___handleCurrentChange (Page) {
      this.RuncardSnDataQuery.Page = Page
      this.getSonData()
    },
    _handleSearchImportInfo () {
      this.RuncardSnDataQuery.Page = 1
      this.getSonData()
    },
    _batchDeleteImportInfo () {
      const rows = this.$refs.xTableImportInfoSon.getCheckboxRecords()
      if (!rows || !rows.length) {
        return this.$message.error('请选择要删除的数据')
      }
      this.$confirm('确定要批量删除吗？', this.$t('cccn._21'), {
        confirmButtonText: this.$t('cccn._22'),
        cancelButtonText: this.$t('cccn._23'),
        type: 'warning'
      }).then(async (_) => {
        const res = await SaveImportRuncardSnDataByTrans({
          RemoveRecords: rows
        })
        if (res.Result) {
          this.$notify({
            title: '成功',
            message: '批量删除成功',
            type: 'success'
          })
          this.$refs.xTableImportInfoSon.clearCheckboxRow()
          this.getSonData()
        }
      })
    },
    _handleDeleteImportInfo (row) {
      this.$confirm('确定要删除该记录吗？', this.$t('cccn._21'), {
        confirmButtonText: this.$t('cccn._22'),
        cancelButtonText: this.$t('cccn._23'),
        type: 'warning'
      }).then(async (_) => {
        const form = {
          RemoveRecords: [row]
        }
        const res = await SaveImportRuncardSnDataByTrans(form)
        if (res.Result) {
          this.$notify({
            type: 'success',
            message: '删除成功',
            title: '成功'
          })
          this.getSonData()
        }
      })
    },

    // 新增
    handleAddImportInfo () {
      this.importInfoForm = {
        HEADER_ID: this.RuncardSnDataQuery.HEADER_ID || 0,
        WO_NO: this.currentHeadRowInfo.WO_NO || ''
      }
      this.importInfoModifyFlag = true
    },
    // 修改
    handleEditImportInfo (row) {
      this.importInfoForm = cloneDeep(row)
      this.importInfoModifyFlag = true
    },
    // 删除
    handleDeleteImportInfo (row) {
      this.$confirm('确定要删除该记录吗？', this.$t('cccn._21'), {
        confirmButtonText: this.$t('cccn._22'),
        cancelButtonText: this.$t('cccn._23'),
        type: 'warning'
      }).then(async (_) => {
        const form = {
          RemoveRecords: [row]
        }
        const res = await SaveImportRuncardHeaderByTrans(form)
        if (res.Result) {
          this.$notify({
            type: 'success',
            message: '删除成功',
            title: '成功'
          })
          this.handleLoadImportRuncardSnData()
        }
      })
    },
    // 批量删除
    batchDeleteImportInfo () {
      const rows = this.$refs.xTableImportInfo.getCheckboxRecords()
      if (!rows || !rows.length) {
        return this.$message.error('请选择要删除的数据')
      }
      this.$confirm('确定要批量删除吗？', this.$t('cccn._21'), {
        confirmButtonText: this.$t('cccn._22'),
        cancelButtonText: this.$t('cccn._23'),
        type: 'warning'
      }).then(async (_) => {
        const res = await SaveImportRuncardHeaderByTrans({
          RemoveRecords: rows
        })
        if (res.Result) {
          this.$notify({
            title: '成功',
            message: '批量删除成功',
            type: 'success'
          })
          this.$refs.xTableImportInfo.clearCheckboxRow()
          this.handleLoadImportRuncardSnData()
        }
      })
    },
    handleMakeSureModifyImportInfo () {
      this.$refs.importInfoForm.validate(async (valid) => {
        if (valid) {
          const form = {}
          if (this.importInfoForm.ID) {
            form.UpdateRecords = [this.importInfoForm]
          } else {
            form.InsertRecords = [this.importInfoForm]
          }
          const res = await SaveImportRuncardSnDataByTrans(form)
          if (res.Result) {
            this.$notify({
              title: '成功',
              message: '操作成功',
              type: 'success'
            })
            this.importInfoModifyFlag = false
            this.importInfoForm = {}
            this.currentHeadRowInfo = {}
            this.getSonData()
          }
        }
      })
    },
    // 任务下达
    async handleTaskOther () {
      const rows = this.$refs.xTableImportInfo.getCheckboxRecords()
      if (!rows || !rows.length) {
        return this.$message.error('请选择记录数据')
      }
      this.handleTaskStart = 2
      this.handleTaskShow = true
    },
    async handleTaskOthersunbmit () {
      if (this.MACHINE_CODE === '') {
        return this.$message.error('请选择镭雕机编号')
      }
      const rows = this.$refs.xTableImportInfo.getCheckboxRecords()
      const form = {
        USER_NAME: this.userinfo.USER_NAME,
        TASK_TYPE: 2, // 类型是SN
        MACHINE_CODE: this.MACHINE_CODE,
        ID_LIST: rows.map((i) => i.ID)
      }
      const res = await LaserTaskReleaseByType(form)
      if (res.Result) {
        this.$notify({
          type: 'success',
          title: '成功',
          message: '任务下达成功'
        })
        this.$refs.xTable.clearCheckboxRow()
        this.MACHINE_CODE = ''
        this.handleTaskShow = false
      }
    },
    closeTasl () {
      this.MACHINE_CODE = ''
    },
    // 批量导入
    BatchSubmit () {
      this.Batchform.USER_NAME = this.userinfo.USER_NAME
      this.$refs.BatchRef.validate(async (valid, errInfo) => {
        if (valid) {
          const res = await SaveExcelDataEx(this.Batchform)
          if (res.Result) {
            this.Batchform = {}
            this.BatchVisible = false
            this.$notify({
              title: this.$t('cccn._24'),
              message: this.$t('cccn._25'),
              type: 'success',
              duration: 2000
            })
          }
        } else {
          try {
            Object.keys(errInfo).forEach((item) => {
              this.$message.error(errInfo[item][0].message)
              throw new Error(new Date().toLocaleString())
            })
          } catch { }
        }
      })
    }

  }
}
</script>
<style lang="scss" scoped>
.SfcsRuncardRanger {
  .form-title {
    font-size: 14px;
    color: #333;
    font-weight: 600;
  }

  .SfcsRuncardRanger-table {
    height: calc(100vh - 460px);
  }
}
.taskTable {
  height: 400px;
  margin-top: 10px;
}

.ImprotInfoTable {
  margin-top: 10px;
  height: 500px;
}
.importInfoFormClass {
  display: flex;
  flex-wrap: wrap;
}
.importInfoFormClass-item {
  flex: 0 0 50%;
}
</style>
<style>
.SfcsRuncardRanger .el-tabs__header {
  margin: 0;
}

.SfcsRuncardRanger .radio .el-radio__label {
  display: none;
}

.SfcsRuncardRanger .SfcsRuncardRanger-pagination {
  border: 1px solid #e6ebf5;
}

.SfcsRuncardRanger .el-dialog__body {
  padding: 10px 20px 10px;
}
</style>
