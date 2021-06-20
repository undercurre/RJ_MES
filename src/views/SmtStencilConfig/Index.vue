<template>
  <d2-container>
    <template slot="header">
      <custom-container-header importBtnName="SmtStencilConfigImport"
                               exportBtnName="SmtStencilConfigExport"
                               exportTplName="SmtStencilConfigExportTPL">
        <el-input v-model="formData.Key"
                  :placeholder="$t('SmtStencilConfig._1')"
                  clearable
                  style="width: 200px"
                  @keyup.enter.native="searchClick" />&nbsp;
        <el-input v-model="formData.CODE"
                  :placeholder="$t('SmtFeederConfig2._12')"
                  clearable
                  style="width: 200px"
                  @keyup.enter.native="searchClick" />&nbsp;
        <el-button type="primary"
                   icon="el-icon-search"
                   @click.prevent="searchClick">{{ $t("publics.btn.search") }}</el-button>
        <el-button type="success"
                   icon="el-icon-plus"
                   @click="insertEvent(null)"
                   v-if="$btnList.indexOf('SmtStencilConfigAdd') !== -1">{{ $t("publics.btn.add") }}</el-button>
        <el-upload v-if="$btnList.indexOf('StencilSaveExcelData') !== -1"
                   ref="reFpslc"
                   style="margin-left: 10px;margin-right: 10px"
                   :action="'#'"
                   :http-request="handleRequestFull"
                   :show-file-list="false"
                   :limit="20"
                   accept="txt">
          <el-button type="warning"
                     icon="el-icon-cloudy">{{ $t('SmtStencilConfig._15') }}</el-button>
        </el-upload>
        <el-button v-if="$btnList.indexOf('StencilSaveExcelData') !== -1"
                   type="success"
                   icon="el-icon-download"
                   @click="exportFullTpl">{{ $t('SmtStencilConfig._16') }}</el-button>
      </custom-container-header>
    </template>
    <div class="SmtStencilConfig-center">
      <vxe-table ref="xTable"
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
                 :loading="loading"
                 :data="mainTable"
                 :radio-config="{ labelField: 'name', trigger: 'row' }"
                 :mouse-config="{ selected: true }"
                 :edit-config="{ trigger: 'click', mode: 'row', showStatus: true }"
                 :checkbox-config="{ checkField: 'checked', trigger: 'row' }"
                 @cell-click="cellClick">
        <!-- <vxe-table-column type="checkbox" width="60" /> -->
        <vxe-table-column type="radio"
                          width="80"
                          :title="$t('cne.t_1')">
          <!-- <template slot-scope="scope">
            <el-radio-group v-model="radio">
              <el-radio class="custom-radio"
                        :label="scope.$rowIndex" />
            </el-radio-group>
          </template> -->
        </vxe-table-column>

        <vxe-table-column field="STENCIL_NO"
                          width="200"
                          :title="$t('SmtStencilConfig._2')"
                          :edit-render="{ name: '$input', props: { readonly: true } }">
          <!-- <template v-slot:edit="{ row, $rowIndex }">
            <div>
              <vxe-input
                v-model="row.STENCIL_NO"
                :disabled="!disabled && $rowIndex === currentRowIndex"
              />
            </div>
          </template>-->
        </vxe-table-column>
        <vxe-table-column field="CUSTOM_MAX_USED_COUNT"
                          min-width="210"
                          :title="$t('SmtStencilConfig._3')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
        <vxe-table-column field="MAX_USED_FLAG"
                          min-width="180"
                          :title="$t('SmtStencilConfig._4')"
                          :edit-render="{ autofocus: '.custom-input', type: 'visible' }">
          <template v-slot:edit="{ row }">
            <span v-show="row.MAX_USED_FLAG === 'Y'"
                  class="green-txt">{{
              $t("SfcsPn._41")
            }}</span>
            <span v-show="row.MAX_USED_FLAG === 'N'"
                  class="red-txt">{{
              $t("SfcsPn._42")
            }}</span>
          </template>
          <!-- <template v-slot:edit="{ row, $rowIndex }">
            <div class="rddselect">
              <el-switch
                v-model="row.MAX_USED_FLAG"
                :disabled="$rowIndex !== currentRowIndex || !disabled"
                :active-text="$t('publics.btn.yes')"
                :inactive-text="$t('publics.btn.no')"
                active-color="#13ce66"
                inactive-color="#cccccc"
                active-value="Y"
                inactive-value="N"
              />
            </div>
          </template>-->
        </vxe-table-column>
        <vxe-table-column field="DESCRIPTION"
                          width="180"
                          :title="$t('SmtStencilConfig._5')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
        <vxe-table-column field="ENABLED"
                          width="180"
                          :title="$t('SmtStencilConfig._6')"
                          :edit-render="{ autofocus: '.custom-input', type: 'visible' }">
          <template v-slot:edit="{ row }">
            <span v-show="row.ENABLED === 'Y'"
                  class="green-txt">{{
              $t("SfcsPn._41")
            }}</span>
            <span v-show="row.ENABLED === 'N'"
                  class="red-txt">{{
              $t("SfcsPn._42")
            }}</span>
          </template>
          <!-- <template v-slot:edit="{ row, $rowIndex }">
            <div class="rddselect">
              <el-switch
                v-model="row.ENABLED"
                :disabled="$rowIndex !== currentRowIndex || !disabled"
                :active-text="$t('publics.btn.yes')"
                :inactive-text="$t('publics.btn.no')"
                active-color="#13ce66"
                inactive-color="#cccccc"
                active-value="Y"
                inactive-value="N"
              />
            </div>
          </template>-->
        </vxe-table-column>
        <vxe-table-column min-width="150"
                          field="CODE"
                          :title="$t('SmtFeederConfig2._6')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
        <vxe-table-column field="INTERVAL"
                          width="180"
                          :title="$t('SmtStencilConfig._7')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
        <vxe-table-column field="YEARS_CONTROL"
                          width="180"
                          :title="$t('SmtStencilConfig.x1')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
        <vxe-table-column field="PRODUCT_UNITAGE"
                          width="180"
                          :title="$t('SmtStencilConfig._8')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
        <vxe-table-column field="ALARM_HOURS"
                          width="180"
                          :title="$t('SmtStencilConfig._9')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
        <vxe-table-column field="STOP_HOURS"
                          width="180"
                          :title="$t('SmtStencilConfig._10')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />

        <!-- <vxe-table-column field="TENSION_CONTROL_FLAG" :title="'张力值管控'" :edit-render="{name: 'input'}" /> -->
        <vxe-table-column field="TENSION_CONTROL_FLAG"
                          width="180"
                          :title="$t('SmtStencilConfig._11')"
                          :edit-render="{ autofocus: '.custom-input', type: 'visible' }">
          <template v-slot:edit="{ row }">
            <span v-show="row.TENSION_CONTROL_FLAG === 'Y'"
                  class="green-txt">{{
              $t("SfcsPn._41")
            }}</span>
            <span v-show="row.TENSION_CONTROL_FLAG === 'N'"
                  class="red-txt">{{
              $t("SfcsPn._42")
            }}</span>
          </template>
          <!-- <template v-slot:edit="{ row, $rowIndex }">
            <div class="rddselect">
              <el-switch
                v-model="row.TENSION_CONTROL_FLAG"
                :disabled="$rowIndex !== currentRowIndex || !disabled"
                :active-text="$t('publics.btn.yes')"
                :inactive-text="$t('publics.btn.no')"
                active-color="#13ce66"
                inactive-color="#cccccc"
                active-value="Y"
                inactive-value="N"
              />
            </div>
          </template>-->
        </vxe-table-column>
        <vxe-table-column field="TENSION_CONTROL_VALUE"
                          min-width="190"
                          :title="$t('SmtStencilConfig._12')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />

        <vxe-table-column width="150"
                          field="LENGTH"
                          :title="$t('plbd._3')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
        <vxe-table-column width="150"
                          field="WIDTH"
                          :title="$t('plbd._4')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
        <vxe-table-column width="150"
                          field="THICHNESS"
                          :title="$t('plbd._5')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />

        <vxe-table-column width="150"
                          field="ORGANIZE_ID"
                          :title="$t('plbd._2')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
        <vxe-table-column :title="$t('publics.field.operate')"
                          width="180"
                          align="center"
                          fixed="right">
          <template v-slot="{ row }">
            <el-button type="primary"
                       @click="editClick(row, row.$index)"
                       v-if="$btnList.indexOf('SmtStencilConfigEdit') !== -1">{{ $t("publics.btn.edit") }}</el-button>
            <el-button v-if="$btnList.indexOf('SmtStencilConfigRemove') !== -1"
                       type="danger"
                       @click="
                removeClick(
                  {
                    ID: row.ID,
                  },
                  {
                    STENCIL_ID: row.ID,
                    STENCIL_NO: row.STENCIL_NO,
                  }
                )
              ">{{ $t("publics.btn.delete") }}</el-button>
          </template>
        </vxe-table-column>
      </vxe-table>
    </div>
    <el-pagination style="margin-top: 10px;"
                   :current-page="formData.Page"
                   :page-size="formData.Limit"
                   :page-sizes="[15, 25, 35, 45]"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="totalPage"
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange" />
    <el-dialog v-dialogDrag
               :title="dialogText"
               :visible.sync="dialogVisible"
               width="60%"
               top="0"
               :close-on-click-modal="false">
      <div>
        <el-form ref="modifyForm"
                 :model="modifyForm"
                 :rules="validRules"
                 :show-message="false"
                 class="custom-form custom-form-x"
                 label-position="top">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('SmtStencilConfig._2')"
                            prop="LINE_NAME">
                <el-input v-model="modifyForm.STENCIL_NO"
                          :disabled="isNew" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SmtStencilConfig._3')"
                            prop="LINE_NAME">
                <el-input v-model="modifyForm.CUSTOM_MAX_USED_COUNT"
                          type="number"
                          min="0" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('SmtStencilConfig._4')"
                            prop="LINE_NAME">
                <el-select v-model="modifyForm.MAX_USED_FLAG"
                           style="width: 100%">
                  <el-option v-for="item in DoubleSided"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SmtStencilConfig._5')"
                            prop="LINE_NAME">
                <el-input v-model="modifyForm.DESCRIPTION" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('SmtStencilConfig._6')"
                            prop="LINE_NAME">
                <el-select v-model="modifyForm.ENABLED"
                           style="width: 100%">
                  <el-option v-for="item in DoubleSided"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SmtStencilConfig._7')"
                            prop="LINE_NAME">
                <el-input v-model="modifyForm.INTERVAL"
                          type="number"
                          min="0" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('SmtStencilConfig._8')"
                            prop="LINE_NAME">
                <el-input v-model="modifyForm.PRODUCT_UNITAGE"
                          type="number"
                          min="0" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SmtStencilConfig._9')"
                            prop="LINE_NAME">
                <el-input v-model="modifyForm.ALARM_HOURS"
                          type="number"
                          min="0" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('SmtStencilConfig._10')"
                            prop="LINE_NAME">
                <el-input v-model="modifyForm.STOP_HOURS"
                          type="number"
                          min="0" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SmtStencilConfig._11')"
                            prop="LINE_NAME">
                <el-select v-model="modifyForm.TENSION_CONTROL_FLAG"
                           style="width: 100%">
                  <el-option v-for="item in DoubleSided"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('SmtStencilConfig._12')"
                            prop="LINE_NAME">
                <el-input v-model="modifyForm.TENSION_CONTROL_VALUE"
                          type="number"
                          min="0" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('plbd._3')">
                <el-input v-model="modifyForm.ATTRIBUTE1"
                          type="number"
                          min="0" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('plbd._4')">
                <el-input v-model="modifyForm.ATTRIBUTE2"
                          type="number"
                          min="0" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('plbd._5')">
                <el-input v-model="modifyForm.ATTRIBUTE3"
                          type="number"
                          min="0" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('SmtFeederConfig2._6')"
                            prop="LINE_NAME">
                <el-input v-model="modifyForm.ATTRIBUTE4" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('plbd._2')"
                            prop="ORGANIZE_ID">
                <el-cascader v-model="modifyForm.ORGANIZE_ID"
                             :options="organizeList"
                             style="width: 100%"
                             :show-all-levels="false"
                             placeholder=" "
                             :props="casProps"
                             @change="handleChangeCascader" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('SmtStencilConfig.x1')"
                            prop="YEARS_CONTROL">
                <el-input v-model="modifyForm.YEARS_CONTROL"
                          style="width: 100%"
                          clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12"></el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">{{
          $t("ssc_rd.cancel")
        }}</el-button>
        <el-button type="primary"
                   @click="submitModifyForm">{{
          $t("ssc_rd.sure")
        }}</el-button>
      </span>
    </el-dialog>
    <!-- 产品对照 -->
    <custom-container-header style="margin: 10px 0;">
      {{$t('SmtStencilPart._24')}}：
      <el-select v-model="formData2.PART_NO"
                 filterable
                 clearable
                 style="width:200px"
                 :placeholder="$t('SmtStencilPart._22')">
        <div style="position: absolute;width: 100%;height: 6px;background: #fff;background: #fff;top: 0;z-index: 99"></div>
        <div style="position: absolute;width: 100%;height: 6px;background: #fff;background: #fff;bottom: 0;z-index: 99"></div>
        <div style="width: 600px;display: flex;padding: 0 20px 0 10px;position: sticky;top: 6px;background: #fff;z-index: 90">
          <el-input v-model="ProductForm.CODE"
                    @input="Productsearch"
                    @keyup.enter.native="Productsearch"
                    :placeholder="$t('SmtStencilPart._16')"></el-input>
          <el-button type="primary"
                     icon="el-icon-search"
                     @click.prevent="Productsearch">{{ $t('publics.btn.search') }}</el-button>
        </div>
        <el-option v-for="item in ProductList"
                   :key="item.CODE"
                   :label="item.CODE"
                   :value="item.CODE">
          <span style="float: left">{{ item.CODE }}</span>
          <span style="float: right;">{{ item.NAME}}</span>
        </el-option>
        <div style="width: 600px;position: sticky;bottom: 6px;background: #fff;z-index: 90;padding-left: 15px">
          <el-pagination :pager-count="5"
                         :current-page="ProductForm.Page"
                         :page-size="ProductForm.Limit"
                         :page-sizes="[15, 25, 35, 45]"
                         layout="total, sizes, prev, pager, next, jumper"
                         :total="ProductPage"
                         @size-change="ProductSizeChange"
                         @current-change="ProductCurrentChange" />
        </div>
      </el-select>
      <el-select clearable
                 v-model="formData2.PCB_SIDE"
                 filterable
                 :placeholder="$t('SmtStencilPart._8')">
        <el-option v-for="item in PCBSideList"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value" />
      </el-select>&nbsp;
      <el-button type="primary"
                 icon="el-icon-search"
                 @click.prevent="searchClick2">{{ $t('publics.btn.search') }}</el-button>
      <el-button type="success"
                 @click="insertEvent2"
                 icon="el-icon-plus"
                 v-if="$btnList.indexOf('SmtStencilPartAdd') !== -1">&nbsp;{{ $t('publics.btn.add') }}</el-button>
      <el-upload style="margin: 0 10px;"
                 ref="upload"
                 class="avatar-uploader"
                 :action="uploadUrl"
                 :data="ImportForm"
                 :show-file-list="false"
                 :before-upload="handleAvatarUpload"
                 :on-success="handleAvatarSuccess"
                 :headers="handleUploadHeader()">
        <el-button slot="trigger"
                   type="primary">{{$t('点击导入')}}</el-button>
      </el-upload>
      <el-button type="info"
                 @click.prevent="exportData2">{{ $t('publics.btn.export_document') }}</el-button>&nbsp;
      <el-button type="success"
                 @click.prevent="handleExportTpl">{{ $t('publics.btn.export_template') }}</el-button>&nbsp;
    </custom-container-header>
    <div class="SmtStencilConfig-center">
      <vxe-table ref="xTable2"
                 id="xTable2"
                 border
                 resizable
                 height="100%"
                 size="medium"
                 align="center"
                 highlight-hover-row
                 highlight-current-row
                 auto-resize
                 show-overflow
                 keep-source
                 :data="mainTable2"
                 :mouse-config="{selected: true}"
                 :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
                 :radio-config="{labelField: 'name', trigger: 'row'}"
                 :checkbox-config="{checkField: 'checked', trigger: 'row'}">
        <vxe-table-column field="STENCIL_NO"
                          min-width="160"
                          :title="$t('SmtStencilPart._1')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column field="PART_NO"
                          min-width="150"
                          :title="$t('SmtStencilPart._2')"
                          :edit-render="{name: '$input', events: {blur: getPNModel},props: {readonly: true}}" />
        <vxe-table-column field="PN_MODEL"
                          width="250px"
                          :title="$t('SmtStencilPart._3')"
                          :edit-render="{name: '$input', props: {readonly: true}}">
        </vxe-table-column>
        <vxe-table-column field="PCB_SIDE"
                          width="150px"
                          :title="$t('SmtStencilPart._4')"
                          :edit-render="{name: '$select', options: PCBSideList, props: {disabled: true}}" />
        <vxe-table-column field="CREATE_BY"
                          min-width="150"
                          :title="$t('SmtStencilPart._5')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />

        <vxe-table-column field="DESCRIPTION"
                          min-width="150"
                          :title="$t('SmtStencilPart._17')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />

        <vxe-table-column :title="$t('publics.field.operate')"
                          min-width="160"
                          align="center"
                          fixed="right">
          <template v-slot="{ row }">
            <el-button type="primary"
                       @click="editClick2(row, row.$index)">{{ $t('publics.btn.edit') }}</el-button>
            <el-button type="danger"
                       @click="removeClick2(row, row.$index)"
                       v-if="$btnList.indexOf('SmtStencilPartRemove') !== -1">{{ $t('publics.btn.delete') }}</el-button>
          </template>
        </vxe-table-column>
      </vxe-table>
    </div>
    <el-pagination style="margin-top: 10px;"
                   :current-page="formData2.Page"
                   :page-size="formData2.Limit"
                   :page-sizes="[15, 25, 35, 45]"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="totalPage2"
                   @size-change="handleSizeChange2"
                   @current-change="handleCurrentChange2" />
    <!-- 编辑框 -->
    <el-dialog v-dialogDrag
               :visible.sync="dialogVisible2"
               :title="$t('SfcsPn._43')"
               width="60%"
               :close-on-click-modal="false">
      <el-form ref="editForm"
               :model="editForm"
               label-width="120px"
               :rules="validRules2"
               :show-message="false">
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('SmtStencilPart._1')"
                          prop="STENCIL_NO">
              <el-input @change="StencilChange"
                        disabled
                        v-model="editForm.STENCIL_NO" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('SmtStencilPart._2')"
                          prop="PART_NO">
              <el-select v-model="editForm.PART_NO"
                         filterable
                         style="width:100%"
                         @change="PartChang"
                         placeholder=" ">
                <div style="position: absolute;width: 100%;height: 6px;background: #fff;background: #fff;top: 0;z-index: 99"></div>
                <div style="position: absolute;width: 100%;height: 6px;background: #fff;background: #fff;bottom: 0;z-index: 99"></div>
                <div style="width: 600px;display: flex;padding: 0 20px 0 10px;position: sticky;top: 6px;background: #fff;z-index: 90">
                  <el-input v-model="ProductForm.CODE"
                            @input="Productsearch"
                            @keyup.enter.native="Productsearch"
                            :placeholder="$t('SmtStencilPart._16')"></el-input>
                  <el-button type="primary"
                             icon="el-icon-search"
                             @click.prevent="Productsearch">{{ $t('publics.btn.search') }}</el-button>
                </div>
                <el-option v-for="item in ProductList"
                           :key="item.CODE"
                           :label="item.CODE"
                           :value="item.CODE">
                  <span style="float: left">{{ item.CODE }}</span>
                  <span style="float: right;">{{ item.NAME}}</span>
                </el-option>
                <div style="width: 600px;position: sticky;bottom: 6px;background: #fff;z-index: 90;padding-left: 15px">
                  <el-pagination :pager-count="5"
                                 :current-page="ProductForm.Page"
                                 :page-size="ProductForm.Limit"
                                 :page-sizes="[15, 25, 35, 45]"
                                 layout="total, sizes, prev, pager, next, jumper"
                                 :total="ProductPage"
                                 @size-change="ProductSizeChange"
                                 @current-change="ProductCurrentChange" />
                </div>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('SmtStencilPart._4')"
                          prop="PCB_SIDE">
              <el-select clearable
                         v-model="editForm.PCB_SIDE"
                         filterable
                         style="width:100%">
                <el-option v-for="item in PCBSideList"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('SmtStencilPart._5')"
                          prop="CREATE_BY">
              <el-input v-model="editForm.CREATE_BY" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item :label="$t('SmtStencilPart._3')">
          <el-input v-model="editForm.PN_MODEL" />
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('SmtStencilPart._17')"
                          class="tagitem">
              <el-input type="textarea"
                        v-model="editForm.DESCRIPTION" />
            </el-form-item>

          </el-col>
        </el-row>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible2 = false">{{$t('ssc_rd.cancel')}}</el-button>
        <el-button type="primary"
                   @click="submitModifyForm2">{{$t('ssc_rd.sure')}}</el-button>
      </span>
    </el-dialog>
  </d2-container>
</template>

<script>
import pagination from '@/views/mixin/page'
import helper from '@/api/Helper'
import customContainerHeader from '@/components/custom-container-header'
import CURD from '@/views/mixin/CURD'
import request from '@/plugin/axios'
import {
  // 直接抄
  LoadUserOrganize,
  LoadData
} from '@/api/SysOrganize'
import {
  // 直接抄
  mapGetters
} from 'vuex'
import { cloneDeep } from 'lodash'
import util from '@/libs/util'
// 直接抄
import { GetPNModel, SaveData, PartNoLoadData } from '@/api/SmtStencilPart'
import { ExportTPL } from '@/api/ImportExcel'
const API = helper('SmtStencilPart')
const ConAPI = helper('SmtStencilConfig')
export default {
  name: 'SmtStencilConfig',
  mixins: [
    pagination,
    CURD({
      defaultSaveAPI: e => ConAPI.SaveData(e),
      defaultCheckIsUsedAPI: e => ConAPI.ItemIsByUsed(e),
      isNeedDeleteCheck: true
    })
  ],
  components: {
    customContainerHeader
  },
  data () {
    return {
      validRules: {
        STENCIL_NO: [
          {
            required: true,
            message: this.$t('SmtStencilConfig._13')
          }
        ]
      },
      currentRowIndex: -1,
      disabled: false,
      isNew: false,
      dialogVisible: false,
      modifyForm: {},
      dialogText: '',
      organizeList: [],
      casProps: {
        label: 'ORGANIZE_NAME',
        value: 'ID',
        children: 'children',
        checkStrictly: true
      },
      DoubleSided: [
        {
          value: 'Y',
          label: 'Y'
        },
        {
          value: 'N',
          label: 'N'
        }
      ],
      uploadFullUrl: process.env.VUE_APP_API + 'SmtStencilConfig/SaveExcelData',
      host: process.env.VUE_APP_BASE_IMG,
      // 产品对照
      mainTable2: [],
      totalPage2: 0,
      formData2: {
        Page: 1,
        Limit: 15,
        STENCIL_NO: '',
        PART_NO: '',
        PCB_SIDE: ''
        // ...this.formData2
      },
      validRules2: {
        STENCIL_NO: [
          {
            required: true,
            message: this.$t('SmtStencilPart._9')
          }
        ],
        PART_NO: [
          {
            required: true,
            message: this.$t('SmtStencilPart._22')
          }
        ],
        PCB_SIDE: [
          {
            required: true,
            message: this.$t('SmtStencilPart._11')
          }
        ],
        CREATE_BY: [
          {
            required: true,
            message: this.$t('SmtStencilPart._12')
          }
        ]
      },
      PCBSideList: [],
      PartList: [],
      dialogVisible2: false,
      editForm: {},
      isNew2: undefined,
      form: {},
      ProductForm: {
        NAME: '', // 产品名称
        Page: 1,
        Limit: 15,
        CODE: '' // CODE
      },
      ProductList: [],
      ProductPage: 0,
      ImportForm: {
        fileName: '',
        table_name: 'SMT_STENCIL_PART'
      },
      uploadUrl:
        process.env.VUE_APP_API + 'ImportExcel/ImportExcelFile'
      // 导入
      // ImportExcel/ImportExcelFile
    }
  },
  computed: {
    ...mapGetters(['userId', 'username', 'userinfo'])
  },
  methods: {
    async cellClick (e) {
      this.formData2.STENCIL_NO = e.row.STENCIL_NO
      this.editForm.STENCIL_NO = e.row.STENCIL_NO
      this.getLoadData2()
      const { $rowIndex, row, columnIndex } = e
      if (columnIndex === 11) {
        return false
      }
      if (this.currentRowIndex !== $rowIndex) {
        this.currentRowIndex = $rowIndex
        this.disabled = false
      }
      const res = await ConAPI.ItemIsByUsed({
        STENCIL_ID: row.ID,
        STENCIL_NO: row.STENCIL_NO
      })
      if (res.Result === true) {
        return false
      } else {
        this.disabled = true
        const set = [
          'STENCIL_NO',
          'CUSTOM_MAX_USED_COUNT',
          'MAX_USED_FLAG',
          'DESCRIPTION',
          'ENABLED',
          'INTERVAL',
          'PRODUCT_UNITAGE',
          'ALARM_HOURS',
          'STOP_HOURS',
          'TENSION_CONTROL_FLAG',
          'TENSION_CONTROL_VALUE',
          'LENGTH',
          'WIDTH',
          'CODE',
          'THICHNESS'
        ]
        this.$nextTick(() => {
          this.$refs.xTable.setActiveCell(row, set[columnIndex])
        })
      }
    },
    async getIndex () {
      const res = await ConAPI.Index()
      if (res.Result) {
        this.getLoadData()
        this.getOrganize()
      }
    },
    async getLoadData () {
      this.loading = true
      this.formData.USER_ID = this.userId
      const res = await ConAPI.LoadData(this.formData)
      this.loading = false
      this.mainTable = res.Result || []
      this.totalPage = res.TotalCount || 0
    },
    // 搜索
    searchClick () {
      this.mainTable2 = []
      this.formData2.STENCIL_NO = ''
      this.formData.Page = 1
      this.getLoadData()
    },
    resetForm () {
      this.mainTable = []
      this.formData.Page = 1
      this.dialogVisible = false
      this.getLoadData()
    },
    handleChangeCascader (e) {
      // 直接抄
      if (e && e.length) {
        this.modifyForm.ORGANIZE_ID = e[e.length - 1]
      }
    },
    // 获取组织架构
    async getOrganize () {
      // 直接抄
      const res = await LoadUserOrganize({
        MANAGER_ID: this.userId,
        STATUS: 'Y',
        Page: 1,
        Limit: 1000
      })
      let manager = res.Result || []
      const _res = await LoadData({
        Page: 1,
        Limit: 10000
      })
      let ORGANIZE = _res.Result || []
      this.planData = ORGANIZE
      this.organizeList = []
      manager.map(item => {
        let tmp = []
        tmp = this.getTree(ORGANIZE, item.ORGANIZE_ID)
        this.organizeList.push(...[tmp[tmp.length - 1]].filter(_i => _i && _i))
      })
    },
    // 递归
    getTree (data, pid = 0, level = 1) {
      // 直接抄
      let arr = []
      data.map(item => {
        if (item.PARENT_ORGANIZE_ID === pid) {
          item.level = level
          item.children = this.getTree(data, item.ID, level + 1)
          item.disabled = item.ENABLED === 'N'
          arr.push(item)
        } else if (item.ID === pid && level === 1) {
          item.level = level
          item.children = this.getTree(data, item.ID, level + 1)
          item.disabled = item.ENABLED === 'N'
          arr.push(item)
        }
      })
      return arr
    },
    // 新增
    insertEvent () {
      this.isNew = false
      this.dialogVisible = true
      this.modifyForm = {}
      this.dialogText = this.$t('publics.btn.add')
    },
    // 编辑
    editClick (row) {
      this.isNew = true
      let modifyForm = cloneDeep(row)
      let stop = this.organizeList.map(item => item.ID)
      stop = stop.sort((current, next) => (current > next ? 1 : -1))
      stop = stop[0] || 0
      let O_ID = modifyForm.O_ID || modifyForm.ORGANIZE_ID
      if (!O_ID) {
        return false
      }
      modifyForm.ORGANIZE_ID = this.reverseGetTree(
        this.planData,
        O_ID && parseInt(O_ID),
        stop
      )
      this.modifyForm = modifyForm
      this.dialogVisible = true
      this.$set(this.modifyForm, 'ATTRIBUTE1', Number(row.LENGTH))
      this.$set(this.modifyForm, 'ATTRIBUTE2', Number(row.WIDTH))
      this.$set(this.modifyForm, 'ATTRIBUTE3', Number(row.THICHNESS))
      this.$set(this.modifyForm, 'ATTRIBUTE4', row.CODE)
      this.dialogText = this.$t('publics.btn.edit')
    },
    // 递归
    reverseGetTree (data, id, stop) {
      let arr = []
      data.map(item => {
        if (item.ID === id) {
          if (item.PARENT_ORGANIZE_ID && item.ID !== stop) {
            arr.push(
              ...this.reverseGetTree(data, item.PARENT_ORGANIZE_ID, stop)
            )
          }
          arr.push(item.ID)
        }
      })
      return arr
    },
    // 提交
    submitModifyForm () {
      if (!this.modifyForm.ORGANIZE_ID) {
        this.$message.error(this.$t('plbd._1'))
        return
      }
      // 直接抄
      this.$refs.modifyForm.validate(async (valid, errInfo) => {
        if (valid) {
          if (
            Object.prototype.toString.call(this.modifyForm.ORGANIZE_ID) ===
            '[object Array]'
          ) {
            this.modifyForm.ORGANIZE_ID = this.modifyForm.ORGANIZE_ID[this.modifyForm.ORGANIZE_ID.length - 1]
          }
          let form = {}
          if (this.modifyForm.ID) {
            form = {
              updateRecords: [this.modifyForm]
            }
          } else {
            this.modifyForm.ID = 0
            form = {
              insertRecords: [this.modifyForm]
            }
          }
          const res = await ConAPI.SaveData(form)
          if (res.Result) {
            this.$notify({
              title: this.$t('ssc._12'),
              message: this.$t('ssc._13'),
              type: 'success',
              duration: 2000
            })
            this.resetForm()
          }
        } else {
          try {
            Object.keys(errInfo).forEach(item => {
              this.$message.error(errInfo[item][0].message)
              throw Error(errInfo[item][0].message)
            })
          } catch (e) {
          }
        }
      })
    },
    async handleRequestFull (data) {
      let formdata = new FormData()
      formdata.append('file', data.file)
      formdata.append('userName', this.username)
      const infoNotify = this.$notify.info({
        title: this.$t('SmtProducePlan._21'),
        dangerouslyUseHTMLString: true,
        duration: 0,
        message:
          '<i class="el-icon-loading"></i>' + this.$t('SmtProducePlan._22')
      })
      const res = await request.post(this.uploadFullUrl, formdata, {
        headers: this.handleUploadHeader(),
        timeout: 60000 * 5 // 请求超时时间
      })
        .catch(_ => {
          infoNotify.close()
          this.$notify.error({
            title: this.$t('SmtProducePlan._23'),
            message: this.$t('SmtProducePlan._24')
          })
        })
      infoNotify.close()
      if (res.Result) {
        this.$notify.success({
          title: this.$t('SmtProducePlan._19'),
          message: this.$t('SmtProducePlan._25')
        })
        this.formData.CODE = ''
        this.formData.Key = ''
        this.getLoadData()
      } else {
        this.$notify.error({
          title: this.$t('SmtProducePlan._23'),
          message: this.$t('SmtProducePlan._24')
        })
      }
    },
    exportFullTpl () {
      util.open(`${this.host}/upload/excelstencil/cw钢网完整导入模板.xlsx`)
    },

    PartChang (e) {
      var obj = {}
      obj = this.ProductList.find(v => { return v.CODE === e })
      this.editForm.PN_MODEL = obj.DESCRIPTION || ''
    },
    tagSelection (row) {
      var data = row
      var str = []
      data.map(v => { str.push(v.VALUE) })
      this.lqcjo = str
    },
    Tagmacke () {
      if (this.lqcjo === '') {
        this.$message({
          showClose: true,
          message: this.$t('SmtStencilPart._21'),
          type: 'warning'
        })
      } else {
        if (this.editForm.DESCRIPTION) {
          var arr1 = this.editForm.DESCRIPTION
          var arr2 = this.lqcjo
          var arr3 = [...arr1, ...arr2]
          console.log(arr3, 'arr3arr3')
          var arr4 = new Set(arr3)
          this.editForm.DESCRIPTION = Array.from(arr4)
        } else {
          this.editForm.DESCRIPTION = this.lqcjo
        }

        this.TaginnerVisible = false
      }
    },
    // 产品对照
    async StencilChange (e) {
      if (e) {
        this.formData.Key = e
        this.formData.USER_ID = this.userId
        const res = await ConAPI.LoadData(this.formData)
        if (res.Result) {
          const data = res.Result || []
          if (data.length === 0) {
            this.$message({
              showClose: true,
              message: this.$t('SmtStencilPart._23'),
              type: 'warning'
            })
            this.editForm.STENCIL_NO = ''
          }
        }
      }
    },
    async getPartNoLoadData () {
      const res = await PartNoLoadData(this.ProductForm)
      if (res.Result) {
        this.ProductList = res.Result || []
        this.ProductPage = res.TotalCount || 0
        if (!this.ProductList.length) {
          this.ProductList.push({
            CODE: '',
            NAME: '',
            DESCRIPTION: ''
          })
        }
      }
    },
    Productsearch () {
      this.ProductForm.Page = 1
      this.getPartNoLoadData()
    },
    ProductSizeChange (Limit) {
      this.ProductForm.Limit = Limit
      this.getPartNoLoadData()
    },
    ProductCurrentChange (Page) {
      this.ProductForm.Page = Page
      this.getPartNoLoadData()
    },
    async getIndex2 () {
      const res = await API.Index()
      if (!res.Result) return false
      const { PCBSideList, PartList } = res.Result
      this.PCBSideList.push({
        label: '',
        value: '',
        disabled: false
      })
      PCBSideList.map((item) => {
        this.PCBSideList.push({
          label: item.NAME,
          value: item.CODE,
          disabled: false
        })
      })
      this.PartList.push({
        label: '',
        value: '',
        disabled: false
      })
      PartList.map((item) => {
        this.PartList.push({
          label: item.NAME,
          value: item.CODE,
          disabled: false
        })
      })
    },
    async getLoadData2 () {
      const res = await API.LoadData(this.formData2)
      this.mainTable2 = res.Result || []
      this.totalPage2 = res.TotalCount || 0
    },
    handleSizeChange2 (Limit) {
      this.formData2.Limit = Limit
      this.getLoadData2()
    },
    handleCurrentChange2 (Page) {
      this.formData2.Page = Page
      this.getLoadData2()
    },
    async exportData2 () {
      const loading = this.$loading({
        lock: true, // 同v-loading的修饰符
        text: this.$t('正在导出...'), // 加载文案
        backgroundColor: 'rgba(55,55,55,0.4)', // 背景色
        spinner: 'el-icon-loading' // 加载图标
      })
      var obj = {
        Page: 1,
        Limit: 100000
      }
      const res = await API.LoadData(obj)
      if (res.Result) {
        loading.close()
      } else {
        loading.close()
      }
      this.$refs.xTable2.exportData({
        filename: '钢网产品对照维护',
        type: 'csv',
        isHeader: true,
        isFooter: true,
        data: res.Result
      })
    },
    // 新增
    async insertEvent2 () {
      if (!this.formData2.STENCIL_NO) {
        this.$message({
          showClose: true,
          message: this.$t('请选择钢网一行'),
          type: 'warning'
        })
        return
      }
      this.editForm = {
        ID: 0,
        STENCIL_NO: this.formData2.STENCIL_NO,
        PART_NO: null,
        PCB_SIDE: null,
        CREATE_TIME: null,
        CREATE_BY: this.userinfo.USER_NAME,
        PN_MODEL: null
      }
      this.isNew2 = true
      this.dialogVisible2 = true
    },
    // 编辑
    editClick2 (row) {
      console.log(row)
      this.editForm = { ...row }
      this.isNew2 = false
      this.dialogVisible2 = true
    },
    // 保存
    submitModifyForm2 () {
      this.$refs.editForm.validate(async (valid, errInfo) => {
        if (valid) {
          this.form = { insertRecords: [], updateRecords: [], removeRecords: [] }
          if (this.isNew2) {
            this.form.insertRecords.push(this.editForm)
          } else {
            this.form.updateRecords.push(this.editForm)
          }
          SaveData(this.form).then((res) => {
            if (res.Result) {
              this.form = {}
              this.dialogVisible2 = false
              this.getLoadData2()
              this.$notify({
                title: this.$t('crss._20'),
                message: this.$t('crss._21'),
                type: 'success',
                duration: 2000
              })
            }
          })
        } else {
          try {
            Object.keys(errInfo).forEach((item) => {
              this.$message.error(errInfo[item][0].message)
              throw Error(errInfo[item][0].message)
            })
          } catch (e) {
            console.log(e.message)
          }
        }
      })
    },
    // 搜索
    searchClick2 () {
      if (!this.formData2.STENCIL_NO) {
        return
      }
      this.formData2.Page = 1
      this.getLoadData2()
    },
    async getPNModel (e) {
      const PART_NO = e.row.PART_NO
      const PN_MODEL = e.row.PN_MODEL
      if (!PART_NO) return false
      // this.$refs.xTable.updateData(e.row)
      if (PN_MODEL) {
        return false
      }
      if (!PN_MODEL) {
        const res = await GetPNModel(PART_NO)
        if (res.Result) {
          e.row.PN_MODEL = res.Result
        }
      }
    },
    // 删除
    removeClick2 (row) {
      let postdata = this.$refs.xTable2.getRecordset()
      if (row) {
        this.$confirm(this.$t('sld.fidelete'), this.$t('sld.prompt'), {
          confirmButtonText: this.$t('sld.confirm'),
          cancelButtonText: this.$t('sld.cancel'),
          type: 'warning'
        }).then(() => {
          this.$refs.xTable2.remove(row)
          this.form.updateRecords = []
          this.form.insertRecords = []
          this.form.removeRecords = postdata.removeRecords
          console.log(this.form, 'this.formthis.form')
          SaveData(this.form).then((response) => {
            if (response.Result) {
              this.form = {}
              this.getLoadData2()
              this.$notify({
                title: this.$t('sld.success'),
                message: this.$t('sld.subsu'),
                type: 'success',
                duration: 2000
              })
            }
          })
        })
      }
    },
    handleAvatarUpload (row) {
      this.ImportForm.fileName = row.name
    },
    handleAvatarSuccess (response) {
      console.log(response, 'response')
      if (response.ErrorInfo.Status) {
        this.$message({
          message: response.ErrorInfo.Message,
          type: 'error'
        })
      } else {
        this.$notify({
          title: this.$t('crss._20'),
          message: this.$t('crss._21'),
          type: 'success',
          duration: 2000
        })
      }
    },
    // d导出模版
    async handleExportTpl () {
      const res = await ExportTPL('SMT_STENCIL_PART')
      if (res.Result) {
        window.open(this.host + res.Result)
        this.$notify.success({
          title: this.$t('publics.tips.success'),
          message: this.$t('publics.tips.successExportTpl')
        })
      }
    }
  },
  created () {
    this.getIndex()
    this.getIndex2()
    this.getPartNoLoadData()
  }
}
</script>

<style>
.custom-form-x .el-col-12 {
  padding: 0 5px;
}

.SmtStencilConfig-center {
  height: calc(100vh - 550px);
}
</style>
