<template>
  <d2-container class="NewProductEdit"
                style="pisition: relative;height: 100%;overflow-x: hidden;">
    <div class="compile-nav header-container">
      <el-button icon="el-icon-back"
                 @click="back_but">{{$t('SOPRoutes._52')}}</el-button>
    </div>
    <el-row ref="elRow1"
            :gutter="24"
            style="display: flex;align-items: center;">
      <el-col :span="22">
        <el-col :span="6"
                class="compile-col">
          <span class="sp-tit">{{$t('SOPRoutes._55')}}:</span>
          <el-input v-model="mainTable.PART_NO"
                    :readonly="readonly"
                    :placeholder="$t('SOPRoutes._56')"
                    class="select"
                    @keyup.enter.native="PartNoClick" />
        </el-col>
        <el-col :span="6"
                class="compile-col"
                style="padding-right: 3px;">
          <span class="sp-tit">{{$t('SOPRoutes._57')}}:</span>
          <el-input v-model="mainTable.ROUTE_NAME"
                    :placeholder="$t('SOPRoutes._58')"
                    class="select" />
        </el-col>
        <el-col :span="12"
                class="compile-col"
                style="padding-right: 3px;">
          <span class="sp-tit">{{$t('SfcsProductConfig._11')}}:</span>
          <el-select @change="SystemChange"
                     @visible-change="getSfcsRoutesLoadData"
                     v-model="SystemSave.CONFIG_VALUE"
                     style="width: 30%;"
                     placeholder=" ">
            <!-- 占位元素 -->
            <div style="position: absolute;width: 100%;height: 6px;background: #fff;background: #fff;top: 0;z-index: 99"></div>
            <div style="position: absolute;width: 100%;height: 6px;background: #fff;background: #fff;bottom: 0;z-index: 99"></div>
            <div style="width: 600px;display: flex;padding: 0 20px 0 10px;position: sticky;top: 6px;background: #fff;z-index: 90">
              <el-input v-model="SystemFrom.ROUTE_NAME"
                        @input="SystemClick"
                        @keyup.enter.native="SystemClick"
                        :placeholder="this.$t('publics.tips.enterKeyWord')"></el-input>
              <el-button type="primary"
                         icon="el-icon-search"
                         @click.prevent="SystemClick">{{ $t('publics.btn.search') }}</el-button>
            </div>
            <el-option style="width: 600px"
                       v-for="(item,index) in SystemList"
                       :key="index"
                       :label="item.ROUTE_NAME"
                       :value="item.ID">
              <!-- <span style="float: left">{{ item.ROUTE_NAME }}</span> -->
              <!-- <span style="float: right;">{{ item.NATIONALITY }}</span> -->
            </el-option>
            <div style="width: 600px;position: sticky;bottom: 6px;background: #fff;z-index: 90;padding-left: 15px">
              <el-pagination :pager-count="5"
                             :current-page="SystemFrom.Page"
                             :page-size="SystemFrom.Limit"
                             :page-sizes="[15, 25, 35, 45]"
                             layout="total, sizes, prev, pager, next, jumper"
                             :total="SystemTotal"
                             @size-change="SystemSizeChange"
                             @current-change="SystemCurrentChange" />
            </div>
          </el-select>
          <el-button @click="SysfineClick"
                     type="primary">{{$t('SfcsProductConfig._12')}}</el-button>
          <el-button @click="Edited"
                     v-if="mainTable.STATUS == 0 && $btnList.indexOf('EditProcess') !== -1"
                     type="primary">{{$t('SOPRoutes._192')}}</el-button>
          <el-button type="primary"
                     v-if="mainTable.STATUS == 0 && $btnList.indexOf('SfcsProductMultiSaveData') !== -1"
                     @click="ConPlate">{{$t('spmr._30')}}</el-button>
        </el-col>
        <el-col :span="24"
                class="compile-col">
          <span class="sp-tit">{{$t('SOPRoutes._22')}}:</span>
          <el-input type="textarea"
                    :rows="5"
                    v-model="mainTable.DESCRIPTION"
                    :placeholder="$t('SOPRoutes._59')"
                    class="select" />
        </el-col>
      </el-col>
      <el-col :span="2"
              style="padding-left: 0px;  display: flex;flex-direction: column;justify-content: space-between;align-items: center;">
        <el-button type="primary"
                   style="margin: 0 0 10px 0; width: 100%;"
                   v-if="mainTable.STATUS == 0 && $btnList.indexOf('NewProductEditConfiguration') !== -1"
                   @click="Configuration">{{$t('ProductSetting._1')}}</el-button>
        <!-- v-if="mainTable.STATUS == 0 && $btnList.indexOf('NewProductEditConfiguration') !== -1"-->

        <el-button type="success"
                   style="margin: 0 0 10px 0;width: 100%;"
                   v-if="mainTable.STATUS == 0 && $btnList.indexOf('NewProductEditProcess') !== -1"
                   @click="add_process_but">{{$t('SOPRoutes._54')}}</el-button>
        <el-button type="danger"
                   style="margin: 0 0 10px 0;width: 100%;"
                   v-if="mainTable.STATUS == 0 && $btnList.indexOf('NewProductEditDeleteProcess') !== -1"
                   @click="primary_remove_but">{{$t('ProductSetting._2')}}</el-button>
        <el-button type="primary"
                   style="margin: 0 ;width: 100%;"
                   v-if="mainTable.STATUS == 0 && $btnList.indexOf('NewProductEditSave') !== -1"
                   @click="save_but">{{$t('SOPRoutes._53')}}</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-row ref="elrow"
            :gutter="24"
            style="margin-top: 30px;">
      <!-- 工序 -->
      <el-col :span="12"
              style="padding-right:5px;height: 100%;">
        <div class="SOPRoutes-row-table">
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
                     :radio-config="{labelField: 'name', trigger: 'row'}"
                     :data="PrimaryTable"
                     :edit-config="{trigger: 'click', mode: 'row', mode: 'cell'}"
                     @cell-click="primary_cell_click">
            <vxe-table-column show-overflow
                              :title="$t('SOPRoutes._64')"
                              type="radio"
                              min-width="70"
                              align="center" />
            <vxe-table-column show-overflow
                              field="ORDER_NO"
                              :title="$t('SOPRoutes._66')"
                              :edit-render="{name: '$input', props: {type: 'number',min: '1'}}"
                              min-width="70"
                              align="center" />
            <vxe-table-column show-overflow
                              field="OPERATION_NAME"
                              :title="$t('SOPRoutes._65')"
                              min-width="120"
                              align="center" />

            <vxe-table-column show-overflow
                              field="STANDARD_HUMAN"
                              :title="$t('SOPRoutes._67')"
                              :edit-render="{name: '$input', props: {type: 'number',min: '1'}}"
                              min-width="200"
                              align="center" />
            <vxe-table-column show-overflow
                              field="STANDARD_WORK_FORCE"
                              :title="$t('SOPRoutes._68')"
                              :edit-render="{name: '$input', props: {type: 'number',min: '1'}}"
                              min-width="210"
                              align="center" />
            <vxe-table-column show-overflow
                              field="STANDARD_CAPACITY"
                              :title="$t('SOPRoutes._69')"
                              :edit-render="{name: '$input', props: {type: 'number',min: '1'}}"
                              min-width="150"
                              align="center" />
          </vxe-table>
        </div>
      </el-col>
      <el-col :span="12"
              class="el_col2x"
              style="padding-left:5px;height: 100%;position: relative;">
        <el-tabs v-model="activeName"
                 height="100%;"
                 @tab-click="handleClick">
          <!-- 作业图  SOP维护-->
          <el-tab-pane :label="$t('ProductSetting._3')"
                       name="operation">
            <div style="margin-bottom: 15px;">
              <el-input :placeholder="$t('ProductSetting._4')"
                        style="width:150px"
                        v-model="ProductVal.Name" />
              <el-button type="primary"
                         @click="searchSOP">{{$t('publics.btn.search')}}</el-button>
              <el-button type="primary"
                         v-if="mainTable.STATUS == 0 && $btnList.indexOf('NewProductEditUploadResources') !== -1"
                         @click="primary_upload_but()">{{$t('ProductSetting._5')}}</el-button>
              <!-- mainTable.STATUS == 0 &&  -->
              <el-button type="success"
                         v-if="$btnList.indexOf('NewProductEditPreview') !== -1"
                         @click="primary_preview_but()">{{$t('SOPRoutes._72')}}</el-button>
              <el-button type="success"
                         v-if="mainTable.STATUS == 0 && $btnList.indexOf('SOPRoutestFileSystem') !== -1"
                         @click="FileSystem()">{{$t('SfcsProductPallet._42')}}</el-button>
            </div>

            <div class="AddOrModify-row-tabs">
              <el-table :data="operaTable"
                        border
                        class="xx-tab"
                        width="100%"
                        height="100%"
                        highlight-current-row
                        :header-cell-style="{background:'#eef1f6',color:'#606266'}">
                <el-table-column min-width="80"
                                 prop="ORDER_NO"
                                 :label="$t('SOPRoutes._76')"
                                 align="center" />
                <el-table-column prop="RESOURCE_NAME"
                                 :label="$t('SOPRoutes._77')"
                                 align="center"
                                 :show-overflow-tooltip="true" />
                <el-table-column prop="RESOURCE_SIZE"
                                 :label="$t('SOPRoutes._78')"
                                 align="center">
                  <template slot-scope="scope">{{ scope.row.RESOURCE_SIZE }} KB</template>
                </el-table-column>
                <el-table-column :label="$t('SOPRoutes._70')"
                                 align="center"
                                 min-width="150"
                                 fixed="right">
                  <template slot-scope="scope">
                    <el-button type="danger"
                               size="mini"
                               v-if="mainTable.STATUS == 0"
                               @click="opera_delete_but(scope.row,scope.$index,scope)">{{$t('SOPRoutes._9')}}</el-button>
                    <el-button type="primary"
                               size="mini"
                               v-if="mainTable.STATUS == 0"
                               @click="opera_edit_but(scope.row)">{{$t('SOPRoutes._79')}}</el-button>
                    <el-button type="success"
                               size="mini"
                               @click="opera_preview_but(scope.row)">{{$t('SOPRoutes._80')}}</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
          <!-- 采集零件维护 -->
          <el-tab-pane v-if="$btnList.indexOf('CollectionPartsMaintenance') !== -1"
                       :label="$t('ProductSetting._6')"
                       name="Components">
            <div style="margin-bottom: 15px;">
              <el-select v-model="CollectPartsForm.COMPONENT_ID"
                         clearable
                         style="width:150px"
                         :placeholder="$t('ProductSetting._7')">
                <el-option v-for="item in ComponentName"
                           :key="item.ID"
                           :label="item.OBJECT_NAME"
                           :value="item.ID" />
              </el-select>
              <el-input :placeholder="$t('ProductSetting._8')"
                        style="width:150px"
                        clearable
                        v-model="CollectPartsForm.ODM_COMPONENT_PN" />
              <el-button type="primary"
                         @click="CollectPartsSearch">{{$t('publics.btn.search')}}</el-button>
              <!-- && $btnList.indexOf('collectionSfcsProductComponentsAdd') !== -1 -->
              <el-button type="success"
                         v-if="mainTable.STATUS == 0"
                         @click.prevent="addCollectPart(0)">{{$t('publics.btn.add')}}</el-button>
              <el-button type="primary"
                         v-if="mainTable.STATUS == 0 && $btnList.indexOf('collectionSfcsProductComponentsSave') !== -1"
                         @click="SaveCollectPart()">{{$t('publics.btn.save')}}</el-button>
              <el-button type="danger"
                         v-if="mainTable.STATUS == 0 && $btnList.indexOf('collectionSfcsProductComponentsdelete') !== -1"
                         @click="removeCollectPart()">{{$t('publics.btn.delete')}}</el-button>
              <el-button type="primary"
                         v-if="mainTable.STATUS == 0 && $btnList.indexOf('annexSaveData') !== -1"
                         @click="annexClick()">{{$t('ProductSetting._50')}}</el-button>
            </div>
            <div class="tab-row-tabs">
              <vxe-table ref="Components"
                         border
                         stripe
                         keep-source
                         highlight-hover-row
                         highlight-current-row
                         show-overflow
                         auto-resize
                         width="100%"
                         height="100%"
                         :edit-rules="CollectPartsRules"
                         @cell-click="cellCollectPart"
                         :radio-config="{labelField: 'name', trigger: 'row'}"
                         :data="CollectPartsData"
                         :edit-config="{trigger: 'click', mode: 'row', showStatus: true}">
                <vxe-table-column show-overflow
                                  :title="$t('SOPRoutes._64')"
                                  type="radio"
                                  min-width="70"
                                  align="center" />
                <vxe-table-column show-overflow
                                  field="COMPONENT_ID"
                                  :title="$t('ProductSetting._9')"
                                  :edit-render="{name:'select', options: ComponentNameBox}"
                                  min-width="120"
                                  align="center" />
                <!-- <vxe-table-column min-width="140"
                                  :title="$t('ProductSetting._10')"
                                  field="ODM_COMPONENT_PN"
                                  :edit-render="{name: 'EditPopupModal'}"></vxe-table-column> -->
                <!-- <vxe-table-column show-overflow
                                  field="ODM_COMPONENT_PN"
                                  :title="$t('ProductSetting._10')"
                                  min-width="140"
                                  :edit-render="{name: 'select', options: ComponentList}"
                                  align="center" /> -->
                <!-- <vxe-table-column field="sex" title="ElSelect" width="140" :edit-render="{}">
            <template v-slot:edit="scope">
              <el-select v-model="scope.row.sex" @change="$refs.xTable.updateStatus(scope)">
                <el-option v-for="item in sexList" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </template>
            <template v-slot="{ row }">{{ getSelectLabel(row.sex, sexList) }}</template>
          </vxe-table-column> -->

                <vxe-table-column width="160"
                                  align="center"
                                  field="ODM_COMPONENT_PN"
                                  :title="$t('ProductSetting._10')"
                                  :edit-render="{}">
                  <template v-slot:edit="scope">
                    <div style="position: relative;">
                      <vxe-select v-model="scope.row.ODM_COMPONENT_PN">
                        <vxe-option v-for="(item, index) in ComponentList"
                                    :key="index"
                                    :value="item"
                                    :label="item"></vxe-option>
                        <div style="width: 600px;position: sticky;bottom: 6px;background: #fff;z-index: 90;padding-left: 15px">
                          <el-pagination :pager-count="5"
                                         :current-page="COMPONENTFrom.Page"
                                         :page-size="COMPONENTFrom.Limit"
                                         :page-sizes="[15, 25, 35, 45]"
                                         layout="total, sizes, prev, pager, next, jumper"
                                         :total="COMPONENTTotal"
                                         @size-change="COMPONENTSizeChange"
                                         @current-change="COMPONENTCurrentChange" />
                        </div>
                      </vxe-select>
                      <vxe-input style="position: absolute;top: 0;left: 0;width: 83%;"
                                 v-model="scope.row.ODM_COMPONENT_PN"
                                ></vxe-input>
                    </div>
                  </template>
                  <template v-slot="{ row }">{{row.ODM_COMPONENT_PN}}</template>
                </vxe-table-column>

                <vxe-table-column show-overflow
                                  field="DATA_FORMAT"
                                  :title="$t('ProductSetting._11')"
                                  :edit-render="{name: 'input'}"
                                  min-width="200"
                                  align="center" />
                <vxe-table-column show-overflow
                                  field="COMPONENT_QTY"
                                  :title="$t('ProductSetting._12')"
                                  :edit-render="{name: '$input', props: {type: 'number',min: '1'}}"
                                  min-width="210"
                                  align="center" />
                <vxe-table-column width="180"
                                  align="center"
                                  field="SERIALIZED"
                                  :title="$t('ProductSetting._13')">
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
                <vxe-table-column width="160"
                                  field="ENABLED"
                                  align="center"
                                  fixed="right"
                                  :title="$t('ProductSetting._14')">
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
                <vxe-table-column show-overflow
                                  field="ATTRIBUTE2"
                                  :title="$t('ProductSetting._15')"
                                  :edit-render="{name: 'input'}"
                                  min-width="150"
                                  align="center" />
                <vxe-table-column show-overflow
                                  field="CUSTOMER_COMPONENT_PN"
                                  :title="$t('ProductSetting._16')"
                                  :edit-render="{name: 'input'}"
                                  min-width="200"
                                  align="center" />
              </vxe-table>
            </div>
            <el-pagination style="margin-top:5px"
                           :current-page="CollectPartsForm.Page"
                           :page-size="CollectPartsForm.Limit"
                           :page-sizes="[15, 25, 35, 45]"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="CollectPartstotal"
                           @size-change="CollectPartsSizeChange"
                           @current-change="CollectPartsCurrentChange" />
          </el-tab-pane>
          <!-- 采集箱号维护 -->
          <el-tab-pane v-if="$btnList.indexOf('CollectionBoxNumberMaintenance') !== -1"
                       :label="$t('ProductSetting._17')"
                       name="CaseNumber">
            <div style="margin-bottom: 15px;">

              <el-input :placeholder="$t('ProductSetting._18')"
                        style="width:150px"
                        clearable
                        v-model="CaseForm.FORMAT" />
              <el-button type="primary"
                         v-if="mainTable.STATUS == 0"
                         @click="CaseSearch">{{$t('publics.btn.search')}}</el-button>
              <!--  && $btnList.indexOf('collectionSfcsProductComponentsdelete') !== -1 -->
              <!--  -->
              <el-button type="success"
                         v-if="mainTable.STATUS == 0"
                         @click.prevent="addCase(0)">{{$t('publics.btn.add')}}</el-button>
              <el-button type="primary"
                         v-if="mainTable.STATUS == 0 && $btnList.indexOf('CaseSfcsProductCartonSave') !== -1"
                         @click="SaveCase()">{{$t('publics.btn.save')}}</el-button>
              <el-button type="danger"
                         v-if="mainTable.STATUS == 0 && $btnList.indexOf('CaseSfcsProductCartondelete') !== -1"
                         @click="removeCase()">{{$t('publics.btn.delete')}}</el-button>
              <el-button type="primary"
                         v-if="mainTable.STATUS == 0 && $btnList.indexOf('annexSaveData') !== -1"
                         @click="annexClick()">{{$t('ProductSetting._50')}}</el-button>
            </div>
            <div class="tab-row-tabs">
              <vxe-table ref="CaseNumber"
                         border
                         stripe
                         keep-source
                         highlight-hover-row
                         highlight-current-row
                         show-overflow
                         auto-resize
                         width="100%"
                         height="100%"
                         :edit-rules="Caserules"
                         @cell-click="cellCase"
                         :radio-config="{labelField: 'name', trigger: 'row'}"
                         :data="CaseData"
                         :edit-config="{trigger: 'click', mode: 'row',showStatus: true}">
                <vxe-table-column show-overflow
                                  :title="$t('SOPRoutes._64')"
                                  type="radio"
                                  min-width="70"
                                  align="center" />
                <vxe-table-column show-overflow
                                  field="FORMAT"
                                  :title="$t('ProductSetting._11')"
                                  :edit-render="{name: 'input'}"
                                  min-width="140"
                                  align="center" />
                <vxe-table-column show-overflow
                                  field="STANDARD_QUANTITY"
                                  :title="$t('ProductSetting._19')"
                                  min-width="170"
                                  :edit-render="{name: '$input', props: {type: 'number',min: '1'}}"
                                  align="center" />
                <vxe-table-column show-overflow
                                  field="MAX_QUANTITY"
                                  :title="$t('ProductSetting._20')"
                                  :edit-render="{name: '$input', props: {type: 'number',min: '0'}}"
                                  min-width="200"
                                  align="center" />
                <vxe-table-column show-overflow
                                  field="MIN_QUANTITY"
                                  :title="$t('ProductSetting._21')"
                                  :edit-render="{name: '$input', props: {type: 'number',min: '0'}}"
                                  min-width="210"
                                  align="center" />
                <vxe-table-column show-overflow
                                  field="STANDARD_WEIGHT"
                                  :title="$t('ProductSetting._22')"
                                  :edit-render="{name: '$input', props: {type: 'number',min: '0'}}"
                                  min-width="170"
                                  align="center" />
                <vxe-table-column show-overflow
                                  field="MAX_WEIGHT"
                                  :title="$t('ProductSetting._23')"
                                  :edit-render="{name: '$input', props: {type: 'number',min: '0'}}"
                                  min-width="160"
                                  align="center" />
                <vxe-table-column show-overflow
                                  field="MIN_WEIGHT"
                                  :title="$t('ProductSetting._24')"
                                  :edit-render="{name: '$input', props: {type: 'number',min: '0'}}"
                                  min-width="160"
                                  align="center" />
                <vxe-table-column show-overflow
                                  field="LENGTH"
                                  :title="$t('ProductSetting._25')"
                                  :edit-render="{name: '$input', props: {type: 'number',min: '0'}}"
                                  min-width="150"
                                  align="center" />
                <vxe-table-column show-overflow
                                  field="WIDTH"
                                  :title="$t('ProductSetting._26')"
                                  :edit-render="{name: '$input', props: {type: 'number',min: '0'}}"
                                  min-width="150"
                                  align="center" />
                <vxe-table-column show-overflow
                                  field="HEIGHT"
                                  :title="$t('ProductSetting._27')"
                                  :edit-render="{name: '$input', props: {type: 'number',min: '0'}}"
                                  min-width="150"
                                  align="center" />
                <vxe-table-column width="130"
                                  field="AUTO_CREATE_FLAG"
                                  align="center"
                                  fixed="right"
                                  :title="$t('ProductSetting._28')">
                  <template v-slot="{ row}">
                    <el-switch v-model="row.AUTO_CREATE_FLAG"
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
                                  align="center"
                                  fixed="right"
                                  :title="$t('ProductSetting._14')">
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
            <el-pagination style="margin-top:5px"
                           :current-page="CaseForm.Page"
                           :page-size="CaseForm.Limit"
                           :page-sizes="[15, 25, 35, 45]"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="Casetotal"
                           @size-change="CaseSizeChange"
                           @current-change="CaseCurrentChange" />
          </el-tab-pane>
          <!-- 采集资料维护 -->
          <el-tab-pane v-if="$btnList.indexOf('CollectionDataMaintenance') !== -1"
                       :label="$t('ProductSetting._29')"
                       name="CollectData">
            <div style="margin-bottom: 15px;">
              <el-select v-model="CollectForm.RESOURCE_ID"
                         clearable
                         style="width:150px"
                         :placeholder="$t('ProductSetting._29')">
                <el-option v-for="item in SourceList"
                           :key="item.ID"
                           :label="item.OBJECT_NAME"
                           :value="item.ID" />
              </el-select>
              <el-button type="primary"
                         @click="CollectSearch">{{$t('publics.btn.search')}}</el-button>
              <el-button type="success"
                         v-if="mainTable.STATUS == 0"
                         @click.prevent="addCollect(0)">{{$t('publics.btn.add')}}</el-button>
              <el-button type="primary"
                         v-if="mainTable.STATUS == 0 && $btnList.indexOf('dataSfcsProductResourcesSave') !== -1"
                         @click="SaveCollect()">{{$t('publics.btn.save')}}</el-button>
              <el-button type="danger"
                         v-if="mainTable.STATUS == 0 && $btnList.indexOf('dataSfcsProductResourcesdelete') !== -1"
                         @click="removeCollect()">{{$t('publics.btn.delete')}}</el-button>
              <el-button type="primary"
                         v-if="mainTable.STATUS == 0 && $btnList.indexOf('annexSaveData') !== -1"
                         @click="annexClick()">{{$t('ProductSetting._50')}}</el-button>
            </div>
            <div class="tab-row-tabs">
              <vxe-table ref="CollectData"
                         border
                         stripe
                         keep-source
                         highlight-hover-row
                         highlight-current-row
                         show-overflow
                         auto-resize
                         width="100%"
                         height="100%"
                         :edit-rules="CollectRules"
                         @cell-click="cellCollect"
                         :radio-config="{labelField: 'name', trigger: 'row'}"
                         :data="CollectData"
                         :edit-config="{trigger: 'click', mode: 'row', showStatus: true}">
                <vxe-table-column show-overflow
                                  :title="$t('SOPRoutes._64')"
                                  type="radio"
                                  min-width="70"
                                  align="center" />
                <vxe-table-column show-overflow
                                  field="RESOURCE_ID"
                                  :title="$t('ProductSetting._31')"
                                  :edit-render="{name:'select', options: SourceListBox}"
                                  min-width="170"
                                  align="center" />
                <vxe-table-column show-overflow
                                  field="DATA_FORMAT"
                                  :title="$t('ProductSetting._11')"
                                  :edit-render="{name: 'input'}"
                                  min-width="170"
                                  align="center" />
                <vxe-table-column show-overflow
                                  field="FIXED_VALUE"
                                  :title="$t('ProductSetting._32')"
                                  :edit-render="{name: 'input'}"
                                  min-width="200"
                                  align="center" />
                <vxe-table-column show-overflow
                                  field="RESOURCE_QTY"
                                  :title="$t('ProductSetting._12')"
                                  :edit-render="{name: '$input', props: {type: 'number',min: '1'}}"
                                  min-width="210"
                                  align="center" />

                <vxe-table-column width="170"
                                  field="ENABLED"
                                  align="center"
                                  fixed="right"
                                  :title="$t('ProductSetting._14')">
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
            <el-pagination style="margin-top:5px"
                           :current-page="CollectForm.Page"
                           :page-size="CollectForm.Limit"
                           :page-sizes="[15, 25, 35, 45]"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="Collecttotal"
                           @size-change="CollectSizeChange"
                           @current-change="CollectCurrentChange" />
          </el-tab-pane>
          <!-- 采集UID维护 -->
          <el-tab-pane v-if="$btnList.indexOf('CollectUIDMaintenance') !== -1"
                       :label="$t('ProductSetting._33')"
                       name="CollectUID">
            <div style="margin-bottom: 15px;">
              <el-select v-model="CollectUIDForm.UID_ID"
                         clearable
                         style="width:150px"
                         :placeholder="$t('ProductSetting._34')">
                <el-option v-for="item in UIDCategory"
                           :key="item.ID"
                           :label="item.OBJECT_NAME"
                           :value="item.ID" />
              </el-select>
              <el-button type="primary"
                         @click="CollectUIDSearch">{{$t('publics.btn.search')}}</el-button>

              <el-button type="success"
                         v-if="mainTable.STATUS == 0"
                         @click.prevent="addCollectUID(0)">{{$t('publics.btn.add')}}</el-button>
              <el-button type="primary"
                         v-if="mainTable.STATUS == 0 && $btnList.indexOf('UIDSfcsProductUidsSave') !== -1"
                         @click="SaveCollectUID()">{{$t('publics.btn.save')}}</el-button>
              <el-button type="danger"
                         v-if="mainTable.STATUS == 0  && $btnList.indexOf('UIDSfcsProductUidsdelete') !== -1"
                         @click="removeCollectUID()">{{$t('publics.btn.delete')}}</el-button>
              <el-button type="primary"
                         v-if="mainTable.STATUS == 0 && $btnList.indexOf('annexSaveData') !== -1"
                         @click="annexClick()">{{$t('ProductSetting._50')}}</el-button>
            </div>
            <div class="tab-row-tabs">
              <vxe-table ref="CollectUID"
                         border
                         stripe
                         keep-source
                         highlight-hover-row
                         highlight-current-row
                         show-overflow
                         auto-resize
                         width="100%"
                         height="100%"
                         :edit-rules="CollectUIDRules"
                         @cell-click="cellCollectUID"
                         :radio-config="{labelField: 'name', trigger: 'row'}"
                         :data="CollectUIDDate"
                         :edit-config="{trigger: 'click', mode: 'row', showStatus: true}">
                <vxe-table-column show-overflow
                                  :title="$t('SOPRoutes._64')"
                                  type="radio"
                                  min-width="70"
                                  align="center" />
                <vxe-table-column show-overflow
                                  field="UID_ID"
                                  :title="$t('ProductSetting._35')"
                                  :edit-render="{name:'select', options: UIDCategoryBox}"
                                  min-width="120"
                                  align="center" />

                <vxe-table-column show-overflow
                                  field="DATA_FORMAT"
                                  :title="$t('ProductSetting._11')"
                                  min-width="170"
                                  :edit-render="{name: 'input'}"
                                  align="center" />
                <vxe-table-column show-overflow
                                  field="UID_QTY"
                                  :title="$t('ProductSetting._36')"
                                  :edit-render="{name: '$input', props: {type: 'number',min: '0'}}"
                                  min-width="200"
                                  align="center" />
                <vxe-table-column show-overflow
                                  field="BREAK_OPERATION_ID"
                                  :title="$t('ProductSetting._49')"
                                  :edit-render="{name: '$select', options: BREAKLIST, props: { clearable: true }}"
                                  min-width="120"
                                  align="center" />
                <vxe-table-column width="180"
                                  field="SERIALIZED"
                                  align="center"
                                  :title="$t('ProductSetting._13')">
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
                <vxe-table-column width="170"
                                  field="ENABLED"
                                  align="center"
                                  fixed="right"
                                  :title="$t('ProductSetting._14')">
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
            <el-pagination style="margin-top:5px"
                           :current-page="CollectUIDForm.Page"
                           :page-size="CollectUIDForm.Limit"
                           :page-sizes="[15, 25, 35, 45]"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="CollectUIDtotal"
                           @size-change="CollectUIDSizeChange"
                           @current-change="CollectUIDCurrentChange" />
          </el-tab-pane>
          <!-- 采集栈板维护 -->
          <el-tab-pane v-if="$btnList.indexOf('CollectionPalletMaintenance') !== -1"
                       :label="$t('ProductSetting._37')"
                       name="CollectionPallet">
            <div style="margin-bottom: 15px;">
              <el-input :placeholder="$t('ProductSetting._18')"
                        v-model="PalletFrom.FORMAT"
                        style="width:150px" />
              <el-button type="primary"
                         @click.prevent="PalletSearch">{{$t('publics.btn.search')}}</el-button>
              <el-button type="success"
                         v-if="mainTable.STATUS == 0"
                         @click.prevent="addPallet(0)">{{$t('publics.btn.add')}}</el-button>
              <el-button type="primary"
                         v-if="mainTable.STATUS == 0 && $btnList.indexOf('PalletSfcsProductPalletSave') !== -1"
                         @click="SavePallet()">{{$t('publics.btn.save')}}</el-button>
              <el-button type="danger"
                         v-if="mainTable.STATUS == 0 && $btnList.indexOf('PalletSfcsProductPalletdelete') !== -1"
                         @click="removePallet()">{{$t('publics.btn.delete')}}</el-button>
              <el-button type="primary"
                         v-if="mainTable.STATUS == 0 && $btnList.indexOf('annexSaveData') !== -1"
                         @click="annexClick()">{{$t('ProductSetting._50')}}</el-button>
            </div>
            <div class="tab-row-tabs">
              <vxe-table ref="CollectionPallet"
                         border
                         stripe
                         keep-source
                         highlight-hover-row
                         highlight-current-row
                         show-overflow
                         auto-resize
                         width="100%"
                         height="100%"
                         @cell-click="cellPallet"
                         :radio-config="{labelField: 'name', trigger: 'row'}"
                         :edit-rules="PalletRules"
                         :data="PalletData"
                         :edit-config="{trigger: 'click', mode: 'row', showStatus: true}">
                <vxe-table-column show-overflow
                                  :title="$t('SOPRoutes._64')"
                                  type="radio"
                                  min-width="70"
                                  align="center" />
                <vxe-table-column show-overflow
                                  field="FORMAT"
                                  :title="$t('ProductSetting._11')"
                                  :edit-render="{name: 'input'}"
                                  min-width="170"
                                  align="center" />
                <vxe-table-column show-overflow
                                  field="STANDARD_QUANTITY"
                                  :title="$t('ProductSetting._19')"
                                  :edit-render="{name: '$input', props: {type: 'number',min: '0'}}"
                                  min-width="170"
                                  align="center" />
                <vxe-table-column show-overflow
                                  field="MAX_QUANTITY"
                                  :title="$t('ProductSetting._20')"
                                  :edit-render="{name: '$input', props: {type: 'number',min: '0'}}"
                                  min-width="200"
                                  align="center" />
                <vxe-table-column show-overflow
                                  field="MIN_QUANTITY"
                                  :title="$t('ProductSetting._21')"
                                  :edit-render="{name: '$input', props: {type: 'number',min: '0'}}"
                                  min-width="200"
                                  align="center" />
                <vxe-table-column show-overflow
                                  field="STANDARD_WEIGHT"
                                  :title="$t('ProductSetting._22')"
                                  :edit-render="{name: '$input', props: {type: 'number',min: '0'}}"
                                  min-width="200"
                                  align="center" />
                <vxe-table-column show-overflow
                                  field="MAX_WEIGHT"
                                  :title="$t('ProductSetting._23')"
                                  :edit-render="{name: '$input', props: {type: 'number',min: '0'}}"
                                  min-width="200"
                                  align="center" />
                <vxe-table-column show-overflow
                                  field="MIN_WEIGHT"
                                  :title="$t('ProductSetting._24')"
                                  :edit-render="{name: '$input', props: {type: 'number',min: '0'}}"
                                  min-width="200"
                                  align="center" />
                <vxe-table-column show-overflow
                                  field="STANDARD_CUBAGE"
                                  :title="$t('ProductSetting._38')"
                                  :edit-render="{name: '$input', props: {type: 'number',min: '0'}}"
                                  min-width="200"
                                  align="center" />
                <vxe-table-column show-overflow
                                  field="MAX_CUBAGE"
                                  :title="$t('ProductSetting._39')"
                                  :edit-render="{name: '$input', props: {type: 'number',min: '0'}}"
                                  min-width="200"
                                  align="center" />
                <vxe-table-column show-overflow
                                  field="MIN_CUBAGE"
                                  :title="$t('ProductSetting._40')"
                                  :edit-render="{name: '$input', props: {type: 'number',min: '0'}}"
                                  min-width="200"
                                  align="center" />
                <vxe-table-column show-overflow
                                  field="LENGTH"
                                  :title="$t('ProductSetting._41')"
                                  :edit-render="{name: '$input', props: {type: 'number',min: '0'}}"
                                  min-width="200"
                                  align="center" />
                <vxe-table-column show-overflow
                                  field="WIDTH"
                                  :title="$t('ProductSetting._42')"
                                  :edit-render="{name: '$input', props: {type: 'number',min: '0'}}"
                                  min-width="200"
                                  align="center" />
                <vxe-table-column show-overflow
                                  field="HEIGHT"
                                  :title="$t('ProductSetting._43')"
                                  :edit-render="{name: '$input', props: {type: 'number',min: '0'}}"
                                  min-width="200"
                                  align="center" />
                <vxe-table-column width="170"
                                  fixed="right"
                                  field="ENABLED"
                                  align="center"
                                  :title="$t('ProductSetting._14')">
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
            <el-pagination style="margin-top:5px"
                           :current-page="PalletFrom.Page"
                           :page-size="PalletFrom.Limit"
                           :page-sizes="[15, 25, 35, 45]"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="Pallettotal"
                           @size-change="PalletSizeChange"
                           @current-change="PalletCurrentChange" />
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
    <!-- 添加工序 -->
    <el-dialog v-dialogDrag
               :close-on-click-modal="false"
               :title="$t('SOPRoutes._88')"
               :visible.sync="processdialogVisible"
               width="40%"
               class="main-dlalog">
      <div class="process-header">
        <el-input v-model="OperationVal.Key"
                  :placeholder="$t('SOPRoutes._89')"
                  style="width:200px"
                  @click.native="search_but" />&nbsp;&nbsp;
        <el-button type="success"
                   icon="el-icon-search"
                   @click.native="search_but">{{$t('SOPRoutes._6')}}</el-button>
        <el-button type="primary"
                   @click="process_det_but">{{$t('SOPRoutes._31')}}</el-button>
        <el-button @click="processdialogVisible = false">{{$t('SOPRoutes._48')}}</el-button>
      </div>
      <div class="process-table">
        <el-table ref="procesrefs"
                  :data="procesTable"
                  style="width: 100%;"
                  height="100%"
                  border
                  :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                  @selection-change="roceseSelectionChange">
          <el-table-column type="selection"
                           width="55" />
          <el-table-column prop="OPERATION_NAME"
                           align="center"
                           :label="$t('SOPRoutes._65')" />
          <el-table-column prop="DESCRIPTION"
                           align="center"
                           :label="$t('SOPRoutes._22')" />
        </el-table>
      </div>
    </el-dialog>
    <!-- 图片预览编辑说明 -->
    <el-dialog v-dialogDrag
               top="0"
               :close-on-click-modal="false"
               :visible.sync="editFormVisible"
               :title="dialogStatus"
               width="100%"
               @close="closedClick"
               class="main-dlalog">

      <el-row :gutter="24"
              class="dialog-row">

        <el-col :span="12"
                class="dialog-row-div">
          <img :src="img_url + postForm.img"
               :alt="$t('SOPRoutes._60')"
               style="width: 100%;height: 100%;"
               v-if="ResType == 'image'" />
          <video id="video1"
                 v-if="ResType == 'video'"
                 v-bind:src="img_url + postForm.img"
                 style="width: 100%;height: 100%;"
                 controls="controls"></video>
          <!-- {{ResType}}
          {{postForm.RESOUTCE_PDF_URL}} ++ {{postForm.img}} -->
          <iframe v-if="ResType == 'pdf'|| ResType == 'word'|| ResType == 'excel' || ResType == 'other'"
                  scrolling="auto"
                  :src="img_url + postForm.RESOUTCE_PDF_URL || postForm.img"
                  class="scrollStyle table_120_list"
                  frameborder="0"
                  width="100%"
                  height="100%">
          </iframe>
        </el-col>
        <el-col :span="12"
                style="position: relative;">
          <customTinymce ref="editor"
                         v-model="postForm.content"
                         :height="400" />
        </el-col>
      </el-row>
      <div class="upload-button">
        <el-button type="primary"
                   v-if="ButStatus"
                   @click="edit_save_but">{{$t('SOPRoutes._53')}}</el-button>
      </div>
    </el-dialog>
    <!-- 添加图片 -->
    <el-dialog v-dialogDrag
               :title="$t('SOPRoutes._97')"
               :close-on-click-modal="false"
               :visible.sync="PrimarydialogVisible"
               width="60%">
      <el-upload ref="upload"
                 multiple
                 :action="upload_url"
                 :data="imgPriVal"
                 list-type="picture-card"
                 :auto-upload="true"
                 :on-success="primaryAvatarSuccess"
                 :before-upload="beforeAvatarUpload"
                 :headers="head"
                 :before-close="handleClose">
        <i slot="default"
           class="el-icon-plus" />
        <div slot="file"
             slot-scope="{file}"
             style="height: 100%;">
          <img :src="file.url"
               :onerror="errorImg"
               style="width: 100%;height: 100%;"
               alt />
        </div>
      </el-upload>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="cancellation_but">{{$t('SOPRoutes._48')}}</el-button>
        <el-button type="primary"
                   @click="confirm_but">{{$t('SOPRoutes._31')}}</el-button>
      </span>
    </el-dialog>
    <!-- 预览作业 -->
    <el-dialog v-dialogDrag
               :title="$t('SOPRoutes._98')"
               :visible.sync="PrimaryOperation"
               :close-on-click-modal="false"
               width="100%"
               top="0"
               class="primary-operation">
      <iframe id="child"
              v-if="iframeUrl"
              width="100%"
              height="100%"
              :src="iframeUrl"></iframe>
    </el-dialog>
    <!-- 显示配产品配置 -->
    <el-dialog v-dialogDrag
               top="0"
               :title="$t('ProductSetting._48')"
               :close-on-click-modal="false"
               :visible.sync="ConfigurationVisible"
               width="100%">
      <div style="margin-bottom: 15px;">
        <el-select clearable
                   style="width:200px"
                   v-model="ProductConFrom.CONFIG_TYPE"
                   :placeholder="$t('SfcsProductConfig._2')">
          <!-- 占位元素 -->
          <div style="position: absolute;width: 100%;height: 6px;background: #fff;background: #fff;top: 0;z-index: 99"></div>
          <div style="position: absolute;width: 100%;height: 6px;background: #fff;background: #fff;bottom: 0;z-index: 99"></div>
          <div style="width: 600px;display: flex;padding: 0 20px 0 10px;position: sticky;top: 6px;background: #fff;z-index: 90">
            <el-input v-model="listQuery.ChineseName"
                      @keyup.enter.native="searchQueryList"
                      @input="searchQueryList"
                      :placeholder="$t('SfcsProductConfig._2')"></el-input>
            <el-button type="primary"
                       icon="el-icon-search"
                       @click.prevent="searchQueryList">{{ $t('publics.btn.search') }}</el-button>
          </div>
          <el-option style="width: 600px"
                     v-for="item in customerList"
                     :key="item.LOOKUP_CODE"
                     :label="item.CHINESE"
                     :value="item.LOOKUP_CODE"></el-option>
          <div style="width: 600px;position: sticky;bottom: 6px;background: #fff;z-index: 90;padding-left: 15px">
            <el-pagination :pager-count="5"
                           :current-page="listQuery.Page"
                           :page-size="listQuery.Limit"
                           :page-sizes="[10, 20, 30, 40]"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="listQuery.totalPage"
                           @size-change="listQuerySizeChange"
                           @current-change="listQueryCurrentChange" />
          </div>
        </el-select>
        <el-button type="primary"
                   icon="el-icon-search"
                   @click.prevent="searchClick">{{ $t('publics.btn.search') }}</el-button>
        <el-button type="success"
                   icon="el-icon-plus"
                   @click="insertEvent">{{ $t('publics.btn.add') }}</el-button>
      </div>
      <div class="table-container">
        <vxe-table ref="ConfxTable"
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
                   :data="ProductConTable"
                   :mouse-config="{selected: true}"
                   :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
                   :radio-config="{labelField: 'name', trigger: 'row'}"
                   :checkbox-config="{checkField: 'checked', trigger: 'row'}">
          <vxe-table-column field="CHINESE"
                            min-width="200"
                            :title="$t('SfcsProductConfig._4')"
                            :edit-render="{name:'$input', props: {readonly: true}}" />
          <vxe-table-column field="CONFIG_VALUE"
                            min-width="200"
                            :title="$t('SfcsProductConfig._5')"
                            :edit-render="{name: '$input', props: {readonly: true}}" />
          <vxe-table-column field="DESCRIPTION"
                            min-width="200"
                            :title="$t('SfcsProductConfig._6')"
                            :edit-render="{name: '$input', props: {readonly: true}}" />
          <vxe-table-column field="ENABLED"
                            width="130"
                            :title="$t('as_src.tb_an')"
                            :edit-render="{autofocus: '.custom-input', type: 'visible'}">
            <template v-slot:edit="{ row }">
              <div>
                <span class="green-txt"
                      v-if="row.ENABLED === 'Y'">{{$t('publics.btn.yes')}}</span>
                <span v-else
                      class="red-txt">{{$t('publics.btn.no')}}</span>
              </div>
            </template>
          </vxe-table-column>
          <vxe-table-column :title="$t('as_cfe.tb_og')"
                            min-width="180"
                            align="center"
                            fixed="right">
            <template v-slot="{ row }">
              <el-button type="primary"
                         @click="editRow(row, row.$index)">{{ $t('publics.btn.edit') }}</el-button>
              <el-button type="danger"
                         @click="removeClick(row, row.$index)">{{ $t('as_cfe.tb_rm') }}</el-button>
            </template>
          </vxe-table-column>
        </vxe-table>
      </div>
      <template slot="footer">
        <el-pagination :current-page="ProductConFrom.Page"
                       :page-size="ProductConFrom.Limit"
                       :page-sizes="[15, 25, 35, 45]"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="ProductConTotal"
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange" />
      </template>
    </el-dialog>
    <el-dialog v-dialogDrag
               :title="dialogTxt"
               :visible.sync="dialogVisible"
               :close-on-click-modal="false"
               width="30%">
      <el-form class="custom-form"
               label-position="top"
               label-width="80px"
               ref="modifyForm"
               :model="modifyForm"
               :show-message="false"
               :rules="validRules"
               size="small">
        <el-form-item :label="$t('SfcsProductConfig._4')"
                      prop="CONFIG_TYPE">
          <el-select clearable
                     style="width:100%"
                     v-model="modifyForm.CHINESE"
                     @change="handleChangeConfigType"
                     :placeholder="''">
            <!-- 占位元素 -->
            <div style="position: absolute;width: 100%;height: 6px;background: #fff;background: #fff;top: 0;z-index: 99"></div>
            <div style="position: absolute;width: 100%;height: 6px;background: #fff;background: #fff;bottom: 0;z-index: 99"></div>
            <div style="width: 600px;display: flex;padding: 0 20px 0 10px;position: sticky;top: 6px;background: #fff;z-index: 90">
              <el-input v-model="listQuery2.ChineseName"
                        @keyup.enter.native="searchQueryList2"
                        :placeholder="this.$t('publics.tips.enterKeyWord')"></el-input>
              <el-button type="primary"
                         icon="el-icon-search"
                         @click.prevent="searchQueryList2">{{ $t('publics.btn.search') }}</el-button>
            </div>
            <el-option style="width: 600px"
                       v-for="item in customerList2"
                       :key="item.LOOKUP_CODE"
                       :label="item.CHINESE"
                       :value="item.LOOKUP_CODE"></el-option>
            <div style="width: 600px;position: sticky;bottom: 6px;background: #fff;z-index: 90;padding-left: 15px">
              <el-pagination :pager-count="5"
                             :current-page="listQuery2.Page"
                             :page-size="listQuery2.Limit"
                             :page-sizes="[10, 20, 30, 40]"
                             layout="total, sizes, prev, pager, next, jumper"
                             :total="listQuery2.totalPage"
                             @size-change="listQuerySizeChange2"
                             @current-change="listQueryCurrentChange2" />
            </div>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('SfcsProductConfig._5')"
                      prop="CONFIG_VALUE">
          <el-input v-model="modifyForm.CONFIG_VALUE"
                    clearable></el-input>
        </el-form-item>
        <el-form-item :label="$t('SfcsProductConfig._6')"
                      prop="DESCRIPTION">
          <el-input v-model="modifyForm.DESCRIPTION"
                    clearable></el-input>
        </el-form-item>
        <el-form-item :label="$t('as_src.tb_an')"
                      prop="ENABLED">
          <el-switch v-model="modifyForm.ENABLED"
                     :active-text="$t('publics.btn.yes')"
                     :inactive-text="$t('publics.btn.no')"
                     active-color="#13ce66"
                     inactive-color="#cccccc"
                     active-value="Y"
                     inactive-value="N"></el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">{{ $t('publics.btn.cancel') }}</el-button>
        <el-button type="primary"
                   @click="handleSubmitForm">{{$t('publics.btn.makeSure') }}</el-button>
      </span>
    </el-dialog>
    <!-- 显示制程详细 -->
    <el-dialog v-dialogDrag
               :title="$t('SfcsProductConfig._12')"
               :visible.sync="stsyVisible"
               :close-on-click-modal="false"
               width="60%">
      <div class="Routetable">
        <vxe-table ref="RoutexTable"
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
                   :data="RouteTable"
                   :mouse-config="{selected: true}"
                   :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
                   :radio-config="{labelField: 'name', trigger: 'row'}"
                   :checkbox-config="{checkField: 'checked', trigger: 'row'}">
          <vxe-table-column min-width="150"
                            field="CURRENT_OPERATION_ID"
                            :title="$t('SfcsRoutes._6')"
                            :edit-render="{name:'select',options: currentBox,attrs: {disabled: true}}" />
          <vxe-table-column min-width="150"
                            field="REPAIR_OPERATION_ID"
                            :title="$t('SfcsRoutes._8')"
                            :edit-render="{name:'select', options: repairBox,attrs: {disabled: true}}" />
          <vxe-table-column min-width="150"
                            field="REWORK_OPERATION_ID"
                            :title="$t('SfcsRoutes._9')"
                            :edit-render="{name:'select', options: reworkBox,attrs: {disabled: true}}" />
        </vxe-table>
      </div>
      <!-- 分页 -->
      <div style="margin-top: 15px;">
        <el-pagination :current-page="Systemfine.Page"
                       :page-size="Systemfine.Limit"
                       :page-sizes="[15, 25, 35, 45]"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="Routetotal"
                       @size-change="RouteSizeChange"
                       @current-change="RouteCurrentChange" />
      </div>
    </el-dialog>
    <!-- 文件系统 -->
    <el-dialog :close-on-click-modal="false"
               :title="$t('SfcsProductPallet._42')"
               width="600px"
               :visible.sync="dialogFileSystem"
               :append-to-body="true">
      <div style="height: 300px">
        <vxe-table ref="xTableFlie"
                   border
                   stripe
                   keep-source
                   highlight-hover-row
                   show-overflow
                   auto-resize
                   width="100%"
                   height="100%"
                   :edit-config="{ mode: 'row', showStatus: true }"
                   :radio-config="{ labelField: 'name', trigger: 'row' }"
                   :data="FileSystemTable">
          <vxe-table-column type="checkbox"
                            align="center"
                            width="60"></vxe-table-column>
          <vxe-table-column show-overflow
                            :title="$t('SfcsProductPallet._43')"
                            min-width="150"
                            align="center"
                            field="filname" />
          <vxe-table-column show-overflow
                            :title="$t('SfcsProductPallet._44')"
                            min-width="150"
                            align="center"
                            field="spath" />
        </vxe-table>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogFileSystem = false">
          {{ $t("_kanban._4") }}
        </el-button>
        <el-button type="primary"
                   @click="FileSystemSubmit">
          {{ $t("SfcsProductPallet._45") }}
        </el-button>
      </span>
    </el-dialog>
    <!-- 拆板配置 -->
    <el-dialog v-dialogDrag
               :close-on-click-modal="false"
               :title="$t('spmr._30')"
               :visible.sync="EvenPlateVisible"
               width="30%">
      <el-form :model="formAdd"
               :show-message="false"
               ref="formAdd"
               label-width="0px">
        <el-form-item>
          <el-input v-model="formAdd.part_no"
                    :placeholder="$t('spmr._1')"
                    clearable
                    style="width:100%"
                    disabled />
        </el-form-item>
        <el-form-item>
          <el-select v-model="formAdd.route_id"
                     style="width:100%"
                     @change="ChangeRoute"
                     placeholder=" ">
            <!-- 占位元素 -->
            <div style="position: absolute;width: 100%;height: 6px;background: #fff;background: #fff;top: 0;z-index: 99"></div>
            <div style="position: absolute;width: 100%;height: 6px;background: #fff;background: #fff;bottom: 0;z-index: 99"></div>
            <div style="width: 600px;display: flex;padding: 0 20px 0 10px;position: sticky;top: 6px;background: #fff;z-index: 90">
              <el-input v-model="SystemFrom.ROUTE_NAME"
                        @input="SystemClick"
                        @keyup.enter.native="SystemClick"
                        :placeholder="this.$t('publics.tips.enterKeyWord')"></el-input>
              <el-button type="primary"
                         icon="el-icon-search"
                         @click.prevent="SystemClick">{{ $t('publics.btn.search') }}</el-button>
            </div>
            <el-option style="width: 600px"
                       v-for="(item,index) in SystemList"
                       :key="index"
                       :label="item.ROUTE_NAME"
                       :value="item.ID">
            </el-option>
            <div style="width: 600px;position: sticky;bottom: 6px;background: #fff;z-index: 90;padding-left: 15px">
              <el-pagination :pager-count="5"
                             :current-page="SystemFrom.Page"
                             :page-size="SystemFrom.Limit"
                             :page-sizes="[15, 25, 35, 45]"
                             layout="total, sizes, prev, pager, next, jumper"
                             :total="SystemTotal"
                             @size-change="SystemSizeChange"
                             @current-change="SystemCurrentChange" />
            </div>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="formAdd.BREAK_OPERATION_CODE"
                     :placeholder="$t('spmr._9')"
                     style="width:100%">
            <el-option v-for="(item,index) in AddSfcsOperations"
                       :key="index"
                       :label="item.OPERATION_NAME"
                       :value="item.PRODUCT_OPERATION_CODE" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <span style="display: inline-block;
    padding-right: 10px;">{{ $t("spmr._8") }}</span>
          <el-switch v-model="formAdd.ENABLED"
                     :active-text="$t('spmr._18')"
                     :inactive-text="$t('spmr._19')"
                     active-color="#13ce66"
                     inactive-color="#cccccc"
                     active-value="Y"
                     inactive-value="N" />
        </el-form-item>
        <el-form-item>
          <span class="dialog-footer"
                style="display: inline-block;width: 100%;text-align: center;">
            <el-button @click="EvenPlateVisible = false">{{$t('spmr._28')}}</el-button>
            <el-button type="primary"
                       @click="addVisible">{{$t('spmr._29')}}</el-button>
          </span>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 附件 -->
    <el-dialog v-dialogDrag
               :close-on-click-modal="false"
               :title="$t('ProductSetting._50')"
               :visible.sync="annexVisible"
               width="60%">
      <div style="margin-bottom: 10px;">
        <!-- <el-input v-model="ComponentsAattachmentsForm.Key"
                  :placeholder="$t('请输入关键字')"
                  clearable
                  style="width: 200px"
                  @keyup.enter.native="annexsearch" />&nbsp;
        <el-button type="primary"
                   icon="el-icon-search"
                   @click.prevent="annexsearch">{{ $t("publics.btn.search") }}</el-button>&nbsp; -->
        <el-button type="success"
                   icon="el-icon-plus"
                   @click.prevent="addPartsAndAccessoriesClick(0)">{{$t('publics.btn.add')}}</el-button>&nbsp;
        <el-button type="primary"
                   icon="el-icon-check"
                   @click="annexSave">{{$t('publics.btn.save')}}</el-button>
      </div>

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
          <vxe-table-column width="180"
                            field="ATTACHMENT_ID"
                            :title="$t('SfcsProductComponents._18')"
                            :edit-render="{name:'select', options: Attachment}" />
          <vxe-table-column width="180"
                            field="DATA_FORMAT"
                            :title="$t('SfcsProductComponents._19')"
                            :edit-render="{name:'input'}" />
          <vxe-table-column width="180"
                            field="FIX_VALUE"
                            :title="$t('SfcsProductComponents._20')"
                            :edit-render="{name:'input'}" />
          <vxe-table-column width="180"
                            field="ATTACHMENT_QTY"
                            :title="$t('SfcsProductComponents._12')"
                            :edit-render="{name:'$input', props: {type: 'number',min: '1'}}" />
          <vxe-table-column width="110"
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
      <div style="margin-top: 10px;">
        <el-pagination :current-page="ComponentsAattachmentsForm.Page"
                       :page-size="ComponentsAattachmentsForm.Limit"
                       :page-sizes="[15, 25, 35, 45]"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="ComponentsAattachmentsPage"
                       @size-change="CA_handleSizeChange"
                       @current-change="CA_handleCurrentChange" />
      </div>
      <!-- <div style="margin-top: 10px;text-align: center;">
        <el-button @click="annexVisible = false">{{$t('取消')}}</el-button>
        <el-button type="primary"
                   @click="annexSave">{{$t('保存')}}</el-button>
      </div> -->
    </el-dialog>
  </d2-container>
</template>
<script>
import {
  ComIndex,
  ComLoadData,
  LoadResourceByIDandName,
  ComSaveData,
  CaseLoadData,
  CaseSaveData,
  CollectIndex,
  CollectLoadData,
  CollectSaveData,
  CollectUIDIndex,
  CollectUIDLoadData,
  CollectUIDSaveData,
  PalletLoadData,
  PalletSaveData,
  ConfigTypeIsExistByPartNo,
  SfcsRoutesLoadData,
  LoadRouteConfig,
  SfcsRoutesIndex
} from '@/api/ProductSetting/index.js'
import {
  GetPartByPartNo,
  AddOrModify,
  GetOperationList,
  LoadDtlData,
  AddOrModifySave,
  DeleteSub,
  PreviewSOP,
  UpdateMsgInfo,
  DeleteResource,
  IsExistsName,
  LoadDataByPartNo
} from '@/api/SimpleSOPRoutes/index.js'
import {
  GetDocumentSystemData,
  UploadDocumentSystem
} from '@/api/SOPRoutes/index.js'
import {
  GetRouteOperationByRouteID
} from '@/api/SfcsOperations/index.js'
import {
  Index,
  GetComponentsAattachments,
  SaveData
} from '@/api/SfcsProductComponents'
import util from '@/libs/util'
import qs from 'qs'
import { mapGetters } from 'vuex'
import helper from '@/api/Helper'
import { GetConfigTypeList } from '@/api/SfcsProductConfig'
import CURD from '@/views/mixin/CURD'
import helpe from '@/api/SfcsProductMultiRuncard'
import Voice from '@/libs/voice'
import XEUtils from 'xe-utils'
const API = helper('SfcsProductConfig')
const MESAPI = helpe('SfcsProductMultiRuncard')
const voice = Voice()
export default {
  name: 'NewProductEdit',
  mixins: [
    CURD({
      defaultSaveAPI: (e) => API.SaveData(e)
    })
  ],
  components: {
    customTinymce: () => import('@/components/custom-tinymce')
  },
  data () {
    return {
      compoTable: [], // 获取零件图:资源列表
      readonly: false,
      mainTable: {
        ID: 0,
        CREATER: '',
        PART_NO: '',
        UserName: '', // 用户名
        ROUTE_NAME: '',
        DESCRIPTION: '',
        STATUS: 0,
        m_RESOURCE_URL: null,
        m_ResourceID: 0,
        OperationList: []
      },
      // 是否相同料号名称
      IsExistsVal: {
        PART_NO: '',
        ID: 0
      },
      upload_url: process.env.VUE_APP_API + 'SOPRoutes/UploadFileToPDF', // 明细上传图片
      head: {},

      // 工序
      PrimaryData: null, // 工序id
      PrimaryTable: [],
      radio: '',
      // 获取、添加工序
      OperationVal: {
        Page: 1,
        Limit: 5000,
        Key: ''
      },
      processdialogVisible: false,
      procesTable: [],
      // 产品配置
      ConfigurationVisible: false,
      ProductConTable: [],
      ProductConTotal: 0,
      ProductConFrom: {
        PART_NO: '',
        CONFIG_TYPE: '',
        Page: 1,
        Limit: 10
      },
      customerList: [],
      listQuery: {
        Page: 1,
        Limit: 10,
        ChineseName: '',
        totalPage: 0
      },
      customerList2: [],
      listQuery2: {
        Page: 1,
        Limit: 10,
        ChineseName: '',
        totalPage: 0
      },
      validRules: {
        CONFIG_TYPE: [
          {
            required: true,
            message: this.$t('SfcsProductConfig._8')
          }
        ],
        CONFIG_VALUE: [
          {
            required: true,
            message: this.$t('SfcsProductConfig._9')
          }
        ]
      },
      form: {},
      dialogTxt: '',
      dialogVisible: false,
      modifyForm: {
        ENABLED: 'Y'
      },

      // 获取作业图、零件值
      ProductVal: {
        parentid: 0,
        Page: 1,
        Limit: 50000,
        Name: ''
      },
      procesArr: [],
      postForm: {
        img: '', // 图片
        content: '', // 文章内容
        RESOUTCE_PDF_URL: ''
      },

      activeName: 'operation',
      operaTable: [], // 作业图列表

      mainFormVisible: false,
      img_url: process.env.VUE_APP_BASE_IMG,
      ButStatus: true, // 编辑预览按钮状态
      // 获取预览编辑的值
      PreviewOrEdit: {
        mst_id: '', // 主表ID
        id: '', // 资源图片ID
        operid: '', // 工序ID
        imgurl: '', // 图片URL
        isedit: 0, // 0"预览图片",1"编辑图片
        isPart: 0, // 是否零件 0否 1是
        RESOUTCE_PDF_URL: ''
      },
      // sop维护编辑提交的值
      imgrditVal: {
        Resource: {
          ID: '',
          RESOURCE_MSG: ''
        }
      },
      editFormVisible: false,
      dialogStatus: '',
      // 添加图片
      PrimarydialogVisible: false,
      // 预览作业
      PrimaryOperation: false,
      // 工序子表图片值
      imgPriVal: {
        mst_id: '',
        category: 1,
        resource_id: 0
      },
      iframeUrl: '',
      // 采集零件维护
      CollectPartsForm: {
        COLLECT_OPERATION_ID: '',
        PART_NO: '',
        COMPONENT_ID: undefined, // 零件名称
        ODM_COMPONENT_PN: undefined, // 零件料号
        Page: 1,
        Limit: 15
      },
      ComponentName: [],
      ComponentNameBox: [],
      CollectPartsData: [],
      CollectPartstotal: 0,
      CollectPartsSave: {},
      CollectPartsRules: {
        COMPONENT_ID: [
          {
            required: true,
            message: this.$t('ProductSetting._7')
          }
        ],
        ODM_COMPONENT_PN: [
          {
            required: true,
            message: this.$t('SfcsProductComponents._2')
          }
        ],
        // DATA_FORMAT: [
        //   {
        //     required: true,
        //     message: this.$t('spc._33')
        //   }
        // ],
        COMPONENT_QTY: [
          {
            required: true,
            message: this.$t('SmtPlacementHeader._64')
          }
        ]
        // CUSTOMER_COMPONENT_PN: [
        //   {
        //     required: true,
        //     message: this.$t('SfcsPn._44')
        //   }
        // ]
      },
      // 附件
      annexVisible: false,
      AattachmentsData: [], // 附件数据
      ComponentsAattachmentsForm: {
        PRODUCT_OBJECT_ID: 0, // 产品零件ID
        Page: 1,
        Limit: 15,
        Key: ''
      },
      ComponentsAattachmentsPage: 0,
      Attachment: [],
      annexform: {},
      // 采集箱号维护
      CaseForm: {
        COLLECT_OPERATION_ID: '',
        PART_NO: '', // 料号
        FORMAT: '', // 格式限定
        Page: 1,
        Limit: 15
      },
      CaseData: [],
      Casetotal: 0,
      CaseSave: {},
      Caserules: {
        // FORMAT: [
        //   {
        //     required: true,
        //     message: this.$t('spc._33')
        //   }
        // ],
        COLLECT_OPERATION_ID: [
          {
            required: true,
            message: this.$t('spc._6')
          }
        ],
        STANDARD_QUANTITY: [
          {
            required: true,
            message: this.$t('spc._40')
          }
        ]
      },
      // 采集资料维护
      CollectForm: {
        COLLECT_OPERATION_ID: '',
        PART_NO: '', // 料号
        RESOURCE_ID: '',
        Page: 1,
        Limit: 15
      },
      CollectData: [],
      Collecttotal: 0,
      CollectSave: {},
      SourceList: [],
      SourceListBox: [],
      CollectRules: {
        RESOURCE_QTY: [
          {
            required: true,
            message: this.$t('sprs._31')
          }
        ]
      },
      // 采集UID维护
      CollectUIDForm: {
        COLLECT_OPERATION_ID: '',
        Key: '', // 料号
        UID_ID: '',
        Page: 1,
        Limit: 15
      },
      CollectUIDDate: [],
      CollectUIDtotal: 0,
      CollectUIDSave: {},
      UIDCategory: [],
      UIDCategoryBox: [],
      CollectUIDRules: {
        UID_ID: [
          {
            required: true,
            message: this.$t('spdu._2')
          }
        ],
        DATA_FORMAT: [
          {
            required: true,
            message: this.$t('spdu._21')
          }
        ],
        COLLECT_OPERATION_ID: [
          {
            required: true,
            message: this.$t('spdu._6')
          }
        ],
        UID_QTY: [
          {
            required: true,
            message: this.$t('spdu._31')
          }
        ]
      },
      BREAKLIST: [],
      // 采集栈板维护
      PalletFrom: {
        COLLECT_OPERATION_ID: '',
        PART_NO: '', // 料号
        FORMAT: '',
        Page: 1,
        Limit: 15
      },
      PalletData: [],
      Pallettotal: 0,
      PalletSave: {},
      PalletRules: {
        FORMAT: [{ required: true, message: this.$t('SfcsProductPallet._26') }],
        COLLECT_OPERATION_ID: [
          { required: true, message: this.$t('SfcsProductPallet._27') }
        ],
        STANDARD_QUANTITY: [
          { required: true, message: this.$t('SfcsProductPallet._38') }
        ]
      },
      ResType: '',
      // 制程
      SystemFrom: {
        Page: 1,
        Limit: 15,
        ENABLED: 'Y',
        ROUTE_NAME: ''
      },
      SystemList: [],
      SystemTotal: 0,
      SystemSave: {
        // CHINESE: '产品管控制程代码',
        CONFIG_TYPE: 147,
        CONFIG_VALUE: '', // 制成ID
        DESCRIPTION: '', // 制成名称/描述
        ENABLED: 'Y',
        ID: 0,
        PART_NO: '' // 料号
        // ROWNO: 1
      },
      // 管控制程明细
      currentBox: [],
      repairBox: [],
      reworkBox: [],
      stsyVisible: false,
      Systemfine: {
        ROUTE_ID: 0,
        Page: 1,
        Limit: 15
      },
      RouteTable: [],
      Routetotal: 0,
      // 文件系统
      dialogFileSystem: false,
      FileSystemTable: [],
      // 连板配置
      EvenPlateVisible: false,
      AddParentCustom: [],
      AddParentCustombox: [],
      AddSfcsOperations: [],
      formAdd: {
        ID: 0,
        part_no: '',
        route_id: '',
        LINK_OPERATION_CODE: '', // 连板工序
        BREAK_OPERATION_CODE: '', // 拆板工序
        ENABLED: 'Y'
      },
      NaturaLloading: null,
      errorImg: 'this.src="' + require('../../assets/images/folder.png') + '"',
      ComponentList: [],
      COMPONENTFrom: {
        PART_NO: '',
        Page: 1,
        Limit: 15
      },
      COMPONENTTotal: 0
    }
  },
  mounted () {
    this.Bus.on('mstData', val => {
      if (val) {
        this.mainTable.ID = val.ID
        this.readonly = true
        this.getAddOrModify(val.ID)
        this.getLoadDtlData(val.ID)
      } else {
        this.getAddOrModify(0)
        this.getLoadDtlData(0)
        this.readonly = false
      }
    })
  },
  computed: {
    ...mapGetters(['userinfo', 'language'])
  },
  watch: {
    '$i18n.locales' (mes) {
      this.head = {
        Authorization: 'Bearer ' + util.cookies.get('token'),
        'Accept-Language': mes === 'zh' ? 'zh-CN,zh;' : 'en-US,en;'
      }
    },
    PrimaryOperation (val) {
      if (!val) {
        this.iframeUrl = ''
      }
    }
  },
  created () {
    this.mainTable.UserName = this.userinfo.USER_NAME
    this.getationList()
    this.getSfcsRoutesIndex()
    this.getSfcsRoutesLoadData()
    this.head = {
      Authorization: 'Bearer ' + util.cookies.get('token'),
      'Accept-Language':
        this.$store.getters.language === 'zh' ? 'zh-CN,zh;' : 'en-US,en;'
    }
    this.getConfigTypeList()
    this.getComIndex()
    this.getCollectIndex()
    this.getCollectUIDIndex()
    this.getIndex()
  },
  methods: {
    COMPONENTSizeChange (Limit) {
      this.COMPONENTFrom.Limit = Limit
      this.getLoadDataByPartNo()
    },
    COMPONENTCurrentChange (Page) {
      this.COMPONENTFrom.Page = Page
      this.getLoadDataByPartNo()
    },
    async getLoadDataByPartNo () {
      this.COMPONENTFrom.PART_NO = this.mainTable.PART_NO
      const res = await LoadDataByPartNo(this.COMPONENTFrom)
      if (res.Result) {
        const data = res.Result || []
        this.COMPONENTTotal = res.TotalCount || []
        this.ComponentList = data
        // this.ComponentList.push({
        //   label: '',
        //   value: '',
        //   disabled: false
        // })
        // data.map(item => {
        //   this.ComponentList.push({
        //     label: item,
        //     value: item,
        //     disabled: false
        //   })
        // })
        console.log(res.Result, 'res.Result======')
      }
    },
    /* 拆板配置 */
    ConPlate () {
      if (this.customClick()) {
        this.EvenPlateVisible = true
      }
    },
    // 选择制程
    ChangeRoute () {
      this.formAdd.BREAK_OPERATION_CODE = ''
      this.customClick()
    },
    // 获取拆板工序数据
    customClick () {
      if (this.formAdd.part_no === '' || this.formAdd.part_no === null) {
        this.$message({
          showClose: true,
          message: this.$t('spmr._1'),
          type: 'warning'
        })
        return false
      }
      if (this.formAdd.route_id === '') {
        this.$message({
          showClose: true,
          message: this.$t('spmr._5'),
          type: 'warning'
        })
        return false
      }
      GetRouteOperationByRouteID({ 'route_id': this.formAdd.route_id }).then(res => {
        if (res.Result) {
          this.AddSfcsOperations = res.Result || []
          this.AddSfcsOperations.map((v, i) => {
            if (i === 0) {
              this.formAdd.LINK_OPERATION_CODE = v.PRODUCT_OPERATION_CODE
            }
          })
          this.LoadDataRuncard()
        }
      })
      return true
    },
    // 获取数据
    LoadDataRuncard () {
      MESAPI.LoadData(this.formAdd).then(res => {
        if (res.Result) {
          const data = res.Result.MultiRuncard
          if (data) {
            this.formAdd.ID = data.ID
            this.formAdd.LINK_OPERATION_CODE = data.LINK_OPERATION_CODE
            this.formAdd.BREAK_OPERATION_CODE = data.BREAK_OPERATION_CODE
            this.formAdd.ENABLED = data.ENABLED
          } else {
            this.formAdd.ID = 0
            this.formAdd.ENABLED = 'Y'
          }
        }
      })
    },
    // 拆板工序保存
    addVisible () {
      if (!this.formAdd.BREAK_OPERATION_CODE) {
        this.$message({
          showClose: true,
          message: this.$t('spmr._9'),
          type: 'warning'
        })
        return
      }
      MESAPI.SaveData(this.formAdd).then(response => {
        if (response.Result) {
          this.$notify({
            title: this.$t('spmr._20'),
            message: this.$t('spmr._21'),
            type: 'success',
            duration: 2000
          })
          this.EvenPlateVisible = false
          this.formAdd = {
            ID: 0,
            part_no: this.mainTable.PART_NO,
            route_id: this.Systemfine.ROUTE_ID,
            LINK_OPERATION_CODE: '', // 连板工序
            BREAK_OPERATION_CODE: '', // 拆板工序
            ENABLED: 'Y'
          }
        }
      })
    },
    // 文件系统
    async FileSystem () {
      if (!this.PrimaryData.ID) {
        this.$message({
          showClose: true,
          message: this.$t('ProductSetting._44'),
          type: 'warning'
        })
        return
      }
      if (!this.mainTable.DESCRIPTION) {
        this.$message({
          showClose: true,
          message: this.$t('SfcsProductPallet._47'),
          type: 'warning'
        })
        return
      }
      this.dialogFileSystem = true
      const res = await GetDocumentSystemData({ 'description': this.mainTable.DESCRIPTION })
      if (res.Result) {
        this.FileSystemTable = res.Result || []
      }
    },
    async FileSystemSubmit () {
      let selectRecords = this.$refs.xTableFlie.getCheckboxRecords()
      if (selectRecords.length === 0) {
        this.$message({
          showClose: true,
          message: this.$t('SfcsProductPallet._46'),
          type: 'warning'
        })
        return
      }
      var obj = {}
      var fileArr = []
      var that = this
      selectRecords.forEach(v => {
        obj = {
          mst_id: that.PrimaryData.ID,
          category: 1,
          resource_id: 0,
          fileid: v.fileid,
          filname: v.filname,
          spath: v.spath
        }
        fileArr.push(obj)
      })
      // return
      const res = await UploadDocumentSystem(fileArr)
      if (res.Result) {
        this.dialogFileSystem = false
        this.$notify({
          title: this.$t('SOPRoutes._41'),
          message: this.$t('SOPRoutes._104'),
          type: 'success',
          duration: 2000
        })
      }
    },
    async getSfcsRoutesLoadData () {
      const res = await SfcsRoutesLoadData(this.SystemFrom)
      if (res.Result) {
        this.SystemList = res.Result || []
        // this.SystemList = []ENABLED
        // data.map(v => {
        //   if (v.ENABLED === 'Y') {
        //     this.SystemList.push(v)
        //   }
        // })
        this.SystemTotal = res.TotalCount
        if (!this.SystemList.length) {
          this.SystemList.push({
            ROUTE_NAME: '',
            ID: ''
          })
        }
      }
    },
    SystemSizeChange (Limit) {
      this.SystemFrom.Limit = Limit
      this.getSfcsRoutesLoadData()
    },
    SystemCurrentChange (Page) {
      this.SystemFrom.Page = Page
      this.getSfcsRoutesLoadData()
    },
    SystemClick () {
      this.SystemFrom.Page = 1
      this.getSfcsRoutesLoadData()
    },
    SystemChange (e) {
      this.Systemfine.ROUTE_ID = e
      this.formAdd.route_id = e
      this.SystemList.map(v => {
        if (v.ID === e) {
          this.SystemSave.DESCRIPTION = v.ROUTE_NAME
        }
      })
      this.getLoadAddRoute()
    },
    // 获取产品制程
    async getSystem () {
      if (!this.mainTable.PART_NO) {
        return
      }
      const res = await API.LoadData({ PART_NO: this.mainTable.PART_NO, CONFIG_TYPE: 147 })
      if (res.Result) {
        var data = res.Result || []
        if (data.length !== 0) {
          var SysArr = this.SystemList.filter(item => item.ID === Number(data[0].CONFIG_VALUE))
          console.log(SysArr, 'SysArr')
          if (!SysArr.length) {
            this.SystemList.push({
              ID: Number(data[0].CONFIG_VALUE),
              ROUTE_NAME: data[0].DESCRIPTION
            })
          }
          // console.log(data[0], 'data[0]')
          // console.log(this.SystemList, 'this.SystemList')
          this.SystemSave.ID = data[0].ID
          this.SystemSave.CONFIG_VALUE = Number(data[0].CONFIG_VALUE)
          this.formAdd.route_id = Number(data[0].CONFIG_VALUE)
          this.Systemfine.ROUTE_ID = Number(data[0].CONFIG_VALUE)
          if (this.Systemfine.ROUTE_ID) {
            this.getLoadRoute()
          }
        }
      }
    },
    // 获取下拉框
    async getSfcsRoutesIndex () {
      const res = await SfcsRoutesIndex()
      if (res.Result) {
        const data = res.Result
        data.CurrentOperationList.map((item) => {
          this.currentBox.push({
            label: item.OPERATION_NAME,
            value: Number(item.ID),
            disabled: true
          })
        })
        data.RepairOperationList.map((item) => {
          this.repairBox.push({
            label: item.DESCRIPTION,
            value: Number(item.ID),
            disabled: true
          })
        })
        data.CurrentOperationList.map((item) => {
          this.reworkBox.push({
            label: item.DESCRIPTION,
            value: Number(item.ID),
            disabled: true
          })
        })
      }
    },
    // 跳转制成页面
    Edited () {
      this.$router.push({
        path: '/SfcsRoutes/Index'
      })
    },
    // 查看明细
    SysfineClick () {
      if (!this.Systemfine.ROUTE_ID) {
        this.$message({
          showClose: true,
          message: this.$t('SfcsProductConfig._13'),
          type: 'warning'
        })
        return
      }
      this.getLoadRouteConfig()
      this.stsyVisible = true
    },
    async getLoadRoute () {
      var that = this
      const res = await LoadRouteConfig(this.Systemfine)
      const data = res.Result || []
      if (data) {
        data.map(v => {
          if (v.REWORK_OPERATION_ID === 1) {
            v.REWORK_OPERATION_ID = ''
          }
        })
        if (!data.length) {
          return
        }
        that.BREAKLIST = []
        data.forEach(item => {
          that.currentBox.map(function (v) {
            if (item.CURRENT_OPERATION_ID === v.value) {
              that.BREAKLIST.push(
                {
                  label: v.label,
                  value: Number(v.value),
                  disabled: false
                })
            }
          })
        })
      }
    },
    async getLoadAddRoute () {
      var that = this
      const res = await LoadRouteConfig(this.Systemfine)
      const data = res.Result || []
      if (data) {
        data.map(v => {
          if (v.REWORK_OPERATION_ID === 1) {
            v.REWORK_OPERATION_ID = ''
          }
        })
        this.RouteTable = data
        this.Routetotal = res.TotalCount ? res.TotalCount : 0
        // if (this.mainTable.ID !== 0) { return }// 新增执行
        if (!data.length) {
          return
        } // 空不执行
        // this.PrimaryTable = []
        // 解绑下拉数组
        that.BREAKLIST = []
        data.forEach(item => {
          that.currentBox.map(function (v) {
            if (item.CURRENT_OPERATION_ID === v.value) {
              that.BREAKLIST.push({
                label: v.label,
                value: Number(v.value),
                disabled: false
              })
            }
          })
        })
        const arr1Ids = this.PrimaryTable.map(item => item.CURRENT_OPERATION_ID)
        const result = this.RouteTable.filter(item => !arr1Ids.includes(item.CURRENT_OPERATION_ID))
        var maxid = 0
        if (this.PrimaryTable.length > 0) {
          maxid = Math.max.apply(
            null,
            this.PrimaryTable.map(function (d) {
              return d.ORDER_NO
            })
          )
        }

        var CURRENT_OPERATION_NAME = ''
        result.forEach(function (item) {
          maxid++
          that.currentBox.map(function (v) {
            if (item.CURRENT_OPERATION_ID === v.value) {
              CURRENT_OPERATION_NAME = v.label
            }
          })
          const record = {
            ID: 0,
            CURRENT_OPERATION_ID: item.CURRENT_OPERATION_ID, // 工序ID
            ORDER_NO: maxid, // 序号
            OPERATION_NAME: CURRENT_OPERATION_NAME, // 工序名称
            DESCRIPTION: '',
            OPERATION_CLASS: '',
            OPERATION_CLASS_NAME: '',
            OPERATION_CATEGORY: '',
            OPERATION_CATEGORY_NAME: '',
            ENABLED: '',
            ROUTE_ID: 0
          }
          // 从最后插入
          that.PrimaryTable.push(record)
          // vm.$refs.xTable.insertAt(record, -1)
        })
        if (this.activeName === 'CollectUID') {
          // 采集UID维护
          this.getCollectUIDLoadData()
        }
      }
    },
    async getLoadRouteConfig () {
      const res = await LoadRouteConfig(this.Systemfine)
      const data = res.Result || []
      if (data) {
        data.map(v => {
          if (v.REWORK_OPERATION_ID === 1) {
            v.REWORK_OPERATION_ID = ''
          }
        })
        this.RouteTable = data
        this.Routetotal = res.TotalCount ? res.TotalCount : 0
      }
    },
    RouteSizeChange (val) {
      this.Systemfine.Limit = val
      this.getLoadRouteConfig()
    },
    RouteCurrentChange (val) {
      this.Systemfine.Page = val
      this.getLoadRouteConfig()
    },
    // 关闭
    closedClick () {
      this.editFormVisible = false
      if (this.ResType === 'video') {
        document.getElementById('video1').pause()
      }
    },

    // 返回
    back_but () {
      this.$confirm(this.$t('SOPRoutes._103'), this.$t('SOPRoutes._40'), {
        confirmButtonText: this.$t('SOPRoutes._31'),
        cancelButtonText: this.$t('SOPRoutes._48'),
        type: 'warning'
      })
        .then(() => {
          this.$emit('close')
        })
        .catch(() => {
          return false
        })
    },
    // 主表获取料号
    PartNoClick () {
      if (!this.mainTable.PART_NO || this.mainTable.PART_NO === '') {
        return this.$message({
          showClose: true,
          message: this.$t('SOPRoutes._2'),
          type: 'warning'
        })
      }
      IsExistsName({ PART_NO: this.mainTable.PART_NO }).then(async res => {
        if (res.Result !== void 0) {
          if (res.Result) {
            return this.$message({
              showClose: true,
              message: this.$t('SOPRoutes._105'),
              type: 'warning'
            })
          } else {
            const respone = await GetPartByPartNo(this.mainTable.PART_NO)
            if (respone.Result) {
              var data = JSON.parse(respone.Result)
              if (data !== null) {
                this.mainTable.ROUTE_NAME = data.NAME
                this.mainTable.DESCRIPTION = data.DESCRIPTION
                this.formAdd.part_no = this.mainTable.PART_NO
              } else {
                this.$message({
                  showClose: true,
                  message: this.$t('SOPRoutes._99'),
                  type: 'warning'
                })
                this.mainTable.ROUTE_NAME = ''
                this.mainTable.DESCRIPTION = ''
              }
            }
          }
        }
      })
    },
    // 获取明细
    async getAddOrModify (ID) {
      const res = await AddOrModify(ID)
      const data = res.Result
      if (res.Result) {
        this.mainTable.PART_NO = data.PART_NO
        this.formAdd.part_no = data.PART_NO
        this.mainTable.ROUTE_NAME = data.ROUTE_NAME
        this.mainTable.DESCRIPTION = data.DESCRIPTION
        this.mainTable.ID = data.ID
        this.mainTable.STATUS = data.STATUS
        this.mainTable.m_ResourceID = data.m_ResourceID
        this.mainTable.resource_id = data.resource_id
        this.mainTable.m_RESOURCE_URL = data.m_RESOURCE_URL
        // 主表图片预览编辑
        this.PreviewOrEdit.mst_id = data.ID
        this.PreviewOrEdit.id = data.m_ResourceID
        this.PreviewOrEdit.operid = data.ID
        this.PreviewOrEdit.imgurl = data.m_RESOURCE_URL

        this.ProductConFrom.PART_NO = data.PART_NO
        this.CollectPartsForm.PART_NO = data.PART_NO
        this.CaseForm.PART_NO = data.PART_NO
        this.CollectForm.PART_NO = data.PART_NO
        this.CollectUIDForm.Key = data.PART_NO
        this.PalletFrom.PART_NO = data.PART_NO
        this.getLoadDataByPartNo()
        this.getSystem()
      }
    },
    // 获取添加工序
    async getationList () {
      const res = await GetOperationList(this.OperationVal)
      if (res.Result) {
        this.procesTable = JSON.parse(res.Result)
      }
    },
    // 获取工序表格
    async getLoadDtlData (val) {
      const res = await LoadDtlData(val)
      if (res.Result) {
        this.PrimaryTable = JSON.parse(res.Result)
      }
    },
    // 获取 预览编辑
    async getPreviewSOP () {
      const res = await PreviewSOP(this.PreviewOrEdit)
      const data = res.Result
      if (data) {
        this.ResType = this.matchType(data.imgurl)
        this.postForm.img = data.imgurl
        this.postForm.content = data.RESOURCE_MSG
        this.imgrditVal.Resource.ID = data.id
      } else {
        this.postForm.img = ''
        this.postForm.content = ''
        console.log('res.Result  =null')
      }
    },
    // 主表点击行获取
    primary_cell_click (row, rowIndex, $rowIndex, column) {
      console.log(row, 'rowrow')
      this.PrimaryData = row.row
      this.ProductVal.parentid = row.row.ID

      this.CollectPartsForm.COLLECT_OPERATION_ID = row.row.CURRENT_OPERATION_ID
      this.CaseForm.COLLECT_OPERATION_ID = row.row.CURRENT_OPERATION_ID
      this.CollectForm.COLLECT_OPERATION_ID = row.row.CURRENT_OPERATION_ID
      this.CollectUIDForm.COLLECT_OPERATION_ID = row.row.CURRENT_OPERATION_ID
      this.PalletFrom.COLLECT_OPERATION_ID = row.row.CURRENT_OPERATION_ID
      if (this.activeName === 'operation') {
        //  作业图
        this.imgPriVal.category = 1
        this.getLoadResource()
      }
      if (this.activeName === 'Components') {
        // 采集零件维护
        this.getComLoadData()
      }
      if (this.activeName === 'CaseNumber') {
        // 采集箱号维护
        this.getCaseLoadData()
      }
      if (this.activeName === 'CollectData') {
        // 采集资料维护
        this.getCollectLoadData()
      }
      if (this.activeName === 'CollectUID') {
        // 采集UID维护
        this.getCollectUIDLoadData()
      }
      if (this.activeName === 'CollectionPallet') {
        // 采集栈板维护
        this.getPalletLoadData()
      }
    },
    // 右边表格top切换
    handleClick (tab, event) {
      console.log(tab, event)

      if (this.PrimaryData.ID) {
        if (this.activeName === 'operation') {
          //  作业图
          this.imgPriVal.category = 1
          this.getLoadResource()
        }
        if (this.activeName === 'Components') {
          // 采集零件维护

          this.getComLoadData()
        }
        if (this.activeName === 'CaseNumber') {
          // 采集箱号维护
          this.getCaseLoadData()
        }
        if (this.activeName === 'CollectData') {
          // 采集资料维护

          this.getCollectLoadData()
        }
        if (this.activeName === 'CollectUID') {
          // 采集UID维护

          this.getCollectUIDLoadData()
        }
        if (this.activeName === 'CollectionPallet') {
          // 采集栈板维护
          this.getPalletLoadData()
        }
      }
      // 清空附件
      this.ComponentsAattachmentsForm.PRODUCT_OBJECT_ID = 0
    },
    // 获取产品图资源列表
    getLoadResource () {
      LoadResourceByIDandName(this.ProductVal).then(res => {
        this.operaTable = JSON.parse(res.Result)
      })
    },
    searchSOP () {
      if (!this.PrimaryData.ID) {
        this.$message({
          showClose: true,
          message: this.$t('ProductSetting._44'),
          type: 'warning'
        })
        return
      }
      this.getLoadResource()
    },
    /* 作业图 */
    // 产品图、零件图删除
    opera_delete_but (row, index, scope) {
      var Rowoindex = index
      this.$confirm(this.$t('SOPRoutes._100'), this.$t('SOPRoutes._40'), {
        confirmButtonText: this.$t('SOPRoutes._31'),
        cancelButtonText: this.$t('SOPRoutes._48'),
        type: 'warning'
      })
        .then(() => {
          DeleteResource(row.ID).then(res => {
            console.log(res)
            if (res.Result) {
              this.$notify({
                title: this.$t('SOPRoutes._41'),
                message: this.$t('SOPRoutes._42'),
                type: 'success',
                duration: 2000
              })
              scope.store.table.data.splice(Rowoindex, 1)
            }
          })
        })
        .catch(() => {
          return false
        })
    },
    // 产品图编辑
    opera_edit_but (row) {
      console.log(row)
      this.PreviewOrEdit.mst_id = row.MST_ID
      this.PreviewOrEdit.id = row.ID
      this.PreviewOrEdit.operid = row.ID
      this.PreviewOrEdit.imgurl = row.RESOURCE_URL
      this.PreviewOrEdit.isedit = 1 // 0"预览图片",1"编辑图片
      this.PreviewOrEdit.isPart = 0 // 是否零件 0否 1是
      this.dialogStatus = this.$t('SOPRoutes._101')
      this.editFormVisible = true
      this.ButStatus = true
      this.postForm.RESOUTCE_PDF_URL = row.RESOUTCE_PDF_URL || row.RESOURCE_URL
      this.getPreviewSOP()
    },
    // 产品图预览
    opera_preview_but (row) {
      this.PreviewOrEdit.mst_id = row.MST_ID
      this.PreviewOrEdit.id = row.ID
      this.PreviewOrEdit.operid = row.ID
      this.PreviewOrEdit.imgurl = row.RESOURCE_URL
      this.PreviewOrEdit.isedit = 0 // 0"预览图片",1"编辑图片
      this.PreviewOrEdit.isPart = 0 // 是否零件 0否 1是
      this.dialogStatus = this.$t('SOPRoutes._102')
      this.editFormVisible = true
      this.ButStatus = false
      this.postForm.RESOUTCE_PDF_URL = row.RESOUTCE_PDF_URL || row.RESOURCE_URL

      this.getPreviewSOP()
    },
    // 产品配置
    Configuration () {
      if (this.mainTable.ID === 0) {
        this.$message({
          showClose: true,
          message: this.$t('ProductSetting._45'),
          type: 'warning'
        })
        return
      }
      this.getLoadData()
      this.ConfigurationVisible = true
    },
    // 获取表格
    async getLoadData () {
      const res = await API.LoadData(this.ProductConFrom)
      this.ProductConTable = res.Result || []
      this.ProductConTotal = res.TotalCount || 0
    },
    // 搜索
    searchClick () {
      this.ProductConFrom.Page = 1
      this.getLoadData()
    },
    handleSizeChange (val) {
      this.ProductConFrom.Limit = val
      this.getLoadData()
    },
    handleCurrentChange (val) {
      this.ProductConFrom.Page = val
      this.getLoadData()
    },
    // 获取下拉框
    async getConfigTypeList () {
      const res = await GetConfigTypeList(this.listQuery)
      if (res.Result) {
        this.customerList = res.Result || []
        this.listQuery.totalPage = res.TotalCount || 0
        if (!this.customerList.length) {
          this.customerList.push({
            LOOKUP_CODE: '',
            ENABLED: 'Y',
            CHINESE: ''
          })
        }
      }
    },
    searchQueryList () {
      this.listQuery.Page = 1
      this.getConfigTypeList()
    },
    listQuerySizeChange (Limit) {
      this.listQuery.Page = 1
      this.listQuery.Limit = Limit
      this.getConfigTypeList()
    },
    listQueryCurrentChange (Page) {
      this.listQuery.Page = Page
      this.getConfigTypeList()
    },
    // 新增
    insertEvent () {
      this.listQuery2 = {
        Page: 1,
        Limit: 10,
        ChineseName: '',
        totalPage: 0
      }
      this.modifyForm = { ID: 0 }
      this.modifyForm.ENABLED = 'Y'
      this.customerList2 = []
      this.getConfigTypeList2()
      this.dialogVisible = true
      this.dialogTxt = this.$t('publics.btn.add')
    },
    // 编辑
    editRow (row) {
      this.modifyForm = JSON.parse(JSON.stringify(row))
      this.listQuery2 = {
        Page: 1,
        Limit: 10,
        ChineseName: '',
        totalPage: 0
      }
      this.customerList2 = []
      this.getConfigTypeList2()
      this.dialogVisible = true
      this.dialogTxt = this.$t('publics.btn.edit')
    },
    handleChangeConfigType (e) {
      this.customerList2.map((item) => {
        if (item.LOOKUP_CODE === e) {
          this.modifyForm.CONFIG_TYPE = item.LOOKUP_CODE
          this.modifyForm.CHINESE = item.CHINESE
        }
      })
    },
    async getConfigTypeList2 () {
      const res = await GetConfigTypeList(this.listQuery2)
      if (res.Result) {
        this.customerList2 = res.Result || []
        this.listQuery2.totalPage = res.TotalCount || 0
        if (!this.customerList2.length) {
          this.customerList2.push({
            LOOKUP_CODE: '',
            ENABLED: 'Y',
            CHINESE: ''
          })
        }
      }
    },
    searchQueryList2 () {
      this.listQuery2.Page = 1
      this.getConfigTypeList2()
    },
    listQuerySizeChange2 (Limit) {
      this.listQuery2.Page = 1
      this.listQuery2.Limit = Limit
      this.getConfigTypeList2()
    },
    listQueryCurrentChange2 (Page) {
      this.listQuery2.Page = Page
      this.getConfigTypeList2()
    },
    // 确定
    handleSubmitForm () {
      if (this.modifyForm.ID) {
        // 修改
        this.form = {
          updateRecords: [this.modifyForm]
        }
      } else {
        // 新增
        this.form = {
          insertRecords: [this.modifyForm]
        }
      }
      this.submitForm()
    },
    // 提交
    submitForm () {
      this.$refs.modifyForm.validate(async (valid, errInfo) => {
        if (valid) {
          this.modifyForm.PART_NO = this.mainTable.PART_NO
          var ExisForm = {
            partno: this.mainTable.PART_NO,
            configtype: this.modifyForm.CONFIG_TYPE
          }
          if (this.modifyForm.ID === 0) {
            const data = await ConfigTypeIsExistByPartNo(ExisForm)
            if (data.Result) {
              this.$message({
                showClose: true,
                message: this.$t('ProductSetting._46'),
                type: 'warning'
              })
              return
            }
          }

          const res = await API.SaveData(this.form)
          if (res.Result) {
            this.form = {}
            this.getLoadData()
            this.dialogVisible = false
            this.$notify({
              title: this.$t('ssc._12'),
              message: this.$t('ssc._13'),
              type: 'success',
              duration: 2000
            })
          }
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
    // 管控制程保存
    async Manufacturing () {
      var syssubim = {
        insertRecords: [], // 新增
        updateRecords: [] // 修改
      }
      this.SystemSave.PART_NO = this.mainTable.PART_NO
      if (this.SystemSave.ID === 0) {
        syssubim.insertRecords.push(this.SystemSave)
      } else {
        syssubim.updateRecords.push(this.SystemSave)
      }
      await API.SaveData(syssubim)
    },
    // 添加工序
    add_process_but () {
      this.processdialogVisible = true
    },
    // 添加工序搜索
    search_but () {
      this.getationList()
    },
    // 添加工序获取选中
    roceseSelectionChange (row) {
      console.log(row)
      this.procesArr = row
    },
    // 添加工序确定
    process_det_but () {
      this.processdialogVisible = false
      const arr1Ids = this.PrimaryTable.map(item => item.CURRENT_OPERATION_ID)
      const result = this.procesArr.filter(item => !arr1Ids.includes(item.Id))
      var maxid = 0
      if (this.PrimaryTable.length > 0) {
        maxid = Math.max.apply(
          null,
          this.PrimaryTable.map(function (d) {
            return d.ORDER_NO
          })
        )
      }
      var that = this
      result.forEach(function (item) {
        maxid++
        const record = {
          ID: 0,
          CURRENT_OPERATION_ID: item.Id,
          ORDER_NO: maxid,
          OPERATION_NAME: item.OPERATION_NAME,
          DESCRIPTION: item.DESCRIPTION,
          OPERATION_CLASS: item.OPERATION_CLASS,
          OPERATION_CLASS_NAME: item.OPERATION_CLASS_NAME,
          OPERATION_CATEGORY: item.OPERATION_CATEGORY,
          OPERATION_CATEGORY_NAME: item.OPERATION_CATEGORY_NAME,
          ENABLED: item.ENABLED,
          ROUTE_ID: 0
        }
        // 从最后插入
        that.PrimaryTable.push(record)
        // vm.$refs.xTable.insertAt(record, -1)
      })
      this.$refs.procesrefs.clearSelection()
      console.log(this.PrimaryTable, 'console.log(this.PrimaryTable)')
      if (this.mainTable.ID !== 0) {
        this.save_but()
      }
    },
    // 主表保存
    save_but () {
      if (this.mainTable.PART_NO === '' || this.mainTable.PART_NO === null) {
        this.$message({
          showClose: true,
          message: this.$t('SOPRoutes._2'),
          type: 'warning'
        })
        return
      }
      if (
        this.mainTable.ROUTE_NAME == null ||
        this.mainTable.ROUTE_NAME === ''
      ) {
        this.$message({
          showClose: true,
          message: this.$t('SOPRoutes._1'),
          type: 'warning'
        })
        return
      }
      if (
        this.SystemSave.CONFIG_VALUE == null ||
        this.SystemSave.CONFIG_VALUE === ''
      ) {
        this.$message({
          showClose: true,
          message: this.$t('SOPRoutes._191'),
          type: 'warning'
        })
        return
      }

      this.IsExistsVal.PART_NO = this.mainTable.PART_NO
      this.mainTable.OperationList = this.PrimaryTable
      console.log(
        this.mainTable.OperationList,
        'this.mainTable.OperationList '
      )
      // 编辑保存
      if (this.readonly) {
        AddOrModifySave(this.mainTable).then(response => {
          if (response.Result) {
            this.Manufacturing()// 保存制成
            this.getAddOrModify(response.Result)
            this.getLoadDtlData(response.Result)
            this.mainTable.ID = response.Result
            this.$notify({
              title: this.$t('SOPRoutes._41'),
              message: this.$t('SOPRoutes._104'),
              type: 'success',
              duration: 2000
            })
          }
        })
      } else {
        // 新增保存
        IsExistsName({ PART_NO: this.mainTable.PART_NO }).then(res => {
          console.log(res)
          if (res.Result !== void 0) {
            if (res.Result) {
              this.$message({
                showClose: true,
                message: this.$t('SOPRoutes._105'),
                type: 'warning'
              })
            } else {
              var postdata = this.$refs.xTable.getRecordset()
              console.log(postdata)
              AddOrModifySave(this.mainTable).then(response => {
                if (res.Result !== void 0) {
                  this.Manufacturing()// 保存制成
                  this.getAddOrModify(response.Result)
                  this.getLoadDtlData(response.Result)
                  this.IsExistsVal.ID = response.Result
                  this.$notify({
                    title: this.$t('SOPRoutes._41'),
                    message: this.$t('SOPRoutes._104'),
                    type: 'success',
                    duration: 2000
                  })
                }
              })
            }
          }
        })
      }
    },
    // 删除工序
    primary_remove_but (row, index) {
      console.log(this.PrimaryData, 'this.PrimaryData')
      if (this.PrimaryData === null) {
        this.$message({
          showClose: true,
          message: this.$t('ProductSetting._44'),
          type: 'warning'
        })
        return
      }
      this.$confirm(this.$t('SOPRoutes._114'), this.$t('SOPRoutes._40'), {
        confirmButtonText: this.$t('SOPRoutes._31'),
        cancelButtonText: this.$t('SOPRoutes._48'),
        type: 'warning'
      })
        .then(() => {
          // this.$refs.xGrid.remove(row)
          if (this.PrimaryData.ID === 0) {
            this.$refs.xTable.remove(this.PrimaryData)
            this.PrimaryData = null
          } else {
            DeleteSub(this.PrimaryData.ID).then(res => {
              if (res.Result) {
                this.$notify({
                  title: this.$t('SOPRoutes._41'),
                  message: this.$t('SOPRoutes._42'),
                  type: 'success',
                  duration: 2000
                })
                this.PrimaryData = null
                this.getLoadDtlData(this.mainTable.ID)
              }
            })
          }
        })
        .catch(() => {
          return false
        })
    },
    // 上传图片前
    beforeAvatarUpload (file) {
      var fileType = file.name.endsWith('.xlsx') || file.name.endsWith('.xls')
      var DocType = file.name.endsWith('.doc') || file.name.endsWith('.docx') || file.name.endsWith('.word')
      var doc = ''
      if (DocType) {
        doc = 'docx'
      }
      var xlx = ''
      if (fileType) {
        xlx = 'xlsx'
      }
      var pptType = file.name.endsWith('.pptx') || file.name.endsWith('.ppt')
      var pptTy = ''
      if (pptType) {
        pptTy = 'pptx'
      }
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png' || file.type === 'image/gif' || file.type === 'video/mp4' || file.type === 'application/pdf' || file.type === 'video/avi' || file.type === 'application/vnd.rn-realmedia-vbr' || file.type === 'video/x-flv' || file.type === 'application/pdf' || xlx === 'xlsx' || doc === 'docx' || pptTy === 'pptx' || file.type === 'text/csv'
      const isLt2M = file.size / 1024 / 1024 < 50

      if (!isJPG) {
        this.$message.error(this.$t('SOPRoutes._188'))
      }
      if (!isLt2M) {
        this.$message.error(this.$t('SOPRoutes._189'))
      }
      this.NaturaLloading = this.$loading({
        lock: true, // 同v-loading的修饰符
        text: this.$t('正在上传中...'), // 加载文案
        backgroundColor: 'rgba(55,55,55,0.4)', // 背景色
        spinner: 'el-icon-loading' // 加载图标
      })
      return isJPG && isLt2M
    },
    // 修改后保存
    edit_save_but () {
      var form = {}
      this.imgrditVal.Resource.RESOURCE_MSG = this.postForm.content
      form = this.imgrditVal
      UpdateMsgInfo(form).then(res => {
        if (res.Result) {
          this.$notify({
            title: this.$t('SOPRoutes._41'),
            message: this.$t('SOPRoutes._104'),
            type: 'success',
            duration: 2000
          })
        }
      })
    },
    // 上传图片
    primary_upload_but () {
      if (!this.PrimaryData.ID) {
        this.$message({
          showClose: true,
          message: this.$t('ProductSetting._44'),
          type: 'warning'
        })
        return
      }
      if (this.mainTable.ID === 0) {
        this.$message({
          showClose: true,
          message: this.$t('SOPRoutes._112'),
          type: 'warning'
        })
        return
      }

      this.imgPriVal.mst_id = this.PrimaryData.ID
      this.PrimarydialogVisible = true
    },
    // 上传成功后
    primaryAvatarSuccess (res) {
      if (res.Result) {
        //  作业图
        this.getLoadResource()
        this.$message({
          type: 'success',
          message: this.$t('SOPRoutes._110')
        })
        voice.success()
      }
      this.NaturaLloading.close()
    },
    // 添加图片确定
    confirm_but () {
      this.$refs.upload.clearFiles()
      this.PrimarydialogVisible = false
    },
    // 添加图片取消
    cancellation_but () {
      this.$refs.upload.clearFiles()
      this.PrimarydialogVisible = false
    },
    handleClose () {
      this.$refs.upload.clearFiles()
    },
    // 工序作业图预览
    primary_preview_but () {
      // console.log(row)
      if (!this.PrimaryData.ID) {
        this.$message({
          showClose: true,
          message: this.$t('ProductSetting._44'),
          type: 'warning'
        })
        return
      }
      if (this.mainTable.ID === 0) {
        this.$message({
          showClose: true,
          message: this.$t('SOPRoutes._113'),
          type: 'warning'
        })
        return
      }
      this.PrimaryOperation = true
      const query = {
        partNo: this.mainTable.PART_NO,
        operationId: this.PrimaryData.CURRENT_OPERATION_ID,
        seif: 1
      }
      this.iframeUrl = window.location.origin + '/#/SOPsimple/SOP/index?' + qs.stringify(query)
      // this.iframeUrl = window.location.origin + '/#/SOPbrowse/Index?' + qs.stringify(query)
    },
    // 采集零件维护
    async getComIndex () {
      const res = await ComIndex()
      if (res.Result) {
        this.ComponentName = []
        this.ComponentNameBox = []
        this.ComponentName = res.Result.ComponentName

        this.ComponentNameBox.push({
          label: '',
          value: '',
          disabled: false
        })
        this.ComponentName.map((item) => {
          this.ComponentNameBox.push({
            label: item.OBJECT_NAME,
            value: Number(item.ID),
            disabled: false
          })
        })

        console.log(res.Result, '采集零件维护')
      }
    },
    async getComLoadData () {
      const res = await ComLoadData(this.CollectPartsForm)
      if (res.Result) {
        this.CollectPartsData = res.Result ? res.Result : []
        this.CollectPartstotal = res.TotalCount || 0
        console.log(res.Result, '采集零件维护')
      }
    },
    CollectPartsSearch () {
      if (!this.PrimaryData.ID) {
        this.$message({
          showClose: true,
          message: this.$t('ProductSetting._44'),
          type: 'warning'
        })
        return
      }
      this.CollectPartsForm.Page = 1
      this.getComLoadData()
    },

    CollectPartsSizeChange (val) {
      this.CollectPartsForm.Limit = val
      this.getComLoadData()
    },
    CollectPartsCurrentChange (val) {
      this.CollectPartsForm.Page = val
      this.getComLoadData()
    },
    // 新增
    addCollectPart (row) {
      if (!this.PrimaryData.ID) {
        this.$message({
          showClose: true,
          message: this.$t('ProductSetting._44'),
          type: 'warning'
        })
        return
      }
      const record = {
        ID: 0,
        PART_NO: this.mainTable.PART_NO,
        COMPONENT_ID: 0,
        ODM_COMPONENT_PN: '',
        CUSTOMER_COMPONENT_PN: '',
        DATA_FORMAT: '',
        COMPONENT_QTY: 1,
        SERIALIZED: '',
        ENABLED: 'Y',
        REWORK_REMOVE_FLAG: '',
        EDI_FLAG: '',
        DEVICE_FLAG: '',
        STANDARD_USE_COUNT: 0,
        CHECK_DEFECT_FLAG: '',
        COMPONENT_LOCATIONS: '',
        COLLECT_OPERATION_ID: this.PrimaryData.CURRENT_OPERATION_ID,
        ATTRIBUTE1: '',
        ATTRIBUTE2: ''
      }
      this.defaultAdd = 1
      // 如果是 -1 则从最后新增一条数据
      this.$refs.Components.insertAt(record, row).then(({ row }) => {
        this.$refs.Components.setActiveRow(row)
      })
    },
    SaveCollectPart () {
      var postdata = this.$refs.Components.getRecordset()
      if (
        postdata.insertRecords.length ||
        postdata.removeRecords.length ||
        postdata.updateRecords.length
      ) {
        this.$refs.Components.validate(valid => {
          if (valid) {
            this.CollectPartsSave.InsertComponents = postdata.insertRecords
            this.CollectPartsSave.UpdateComponents = postdata.updateRecords
            this.CollectPartsSave.RemoveRecords = []
            ComSaveData(this.CollectPartsSave).then(res => {
              if (res.Result) {
                this.getComLoadData()
                this.$notify({
                  title: this.$t('cdc._21'),
                  message: this.$t('cdc._22'),
                  type: 'success',
                  duration: 2000
                })
              }
              this.CollectPartsSave = {}
            })
          }
        })
      } else {
        this.$message({
          showClose: true,
          message: this.$t('cdc._26'),
          type: 'warning'
        })
      }
    },
    cellCollectPart (e) {
      this.CollectPartsSave.RemoveRecords = []
      this.CollectPartsSave.RemoveRecords.push(e.row)
      this.ComponentsAattachmentsForm.PRODUCT_OBJECT_ID = e.row.ID
    },
    async removeCollectPart () {
      if (!this.CollectPartsSave.RemoveRecords) {
        this.$message({
          showClose: true,
          message: this.$t('ProductSetting._47'),
          type: 'warning'
        })
        return
      }

      this.$confirm(this.$t('ssn._15'), this.$t('ssn._16'), {
        confirmButtonText: this.$t('ssn._17'),
        cancelButtonText: this.$t('ssn._18'),
        type: 'warning'
      })
        .then(async () => {
          if (this.CollectPartsSave.RemoveRecords[0].ID === 0) {
            this.$refs.Components.remove(this.CollectPartsSave.RemoveRecords)
            this.$notify({
              title: this.$t('ssn._12'),
              message: this.$t('ssn._19'),
              type: 'success',
              duration: 2000
            })
          } else {
            this.CollectPartsSave.insertRecords = []
            this.CollectPartsSave.updateRecords = []
            ComSaveData(this.CollectPartsSave).then(res => {
              if (res.Result) {
                this.$notify({
                  title: this.$t('ssn._12'),
                  message: this.$t('ssn._19'),
                  type: 'success',
                  duration: 2000
                })
                this.getComLoadData()
              }
              this.CollectPartsSave = {}
            })
          }
        })
        .catch(() => { })
    },
    // 附件
    async getIndex () {
      const res = await Index()
      if (res.Result) {
        const data = res.Result
        const Attachment = data.Attachment
        this.Attachment.push({
          label: '',
          value: '',
          disabled: false
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
    async annexClick () {
      if (this.ComponentsAattachmentsForm.PRODUCT_OBJECT_ID === 0) {
        this.$message({
          showClose: true,
          message: this.$t('ProductSetting._51'),
          type: 'warning'
        })
        return
      }

      this.geComponentLoadData()
      this.annexVisible = true
    },
    async geComponentLoadData () {
      const res = await GetComponentsAattachments(this.ComponentsAattachmentsForm)
      if (res.Result) {
        this.AattachmentsData = res.Result
        this.ComponentsAattachmentsPage = res.TotalCount
      }
    },
    annexsearch () {
      this.ComponentsAattachmentsForm.Page = 1
      this.geComponentLoadData()
    },
    CA_handleSizeChange (val) {
      this.ComponentsAattachmentsForm.Limit = val
      this.geComponentLoadData()
    },
    CA_handleCurrentChange (val) {
      this.ComponentsAattachmentsForm.Page = val
      this.geComponentLoadData()
    },
    // 新增
    addPartsAndAccessoriesClick (row) {
      const record = {
        ID: 0,
        PRODUCT_OBJECT_ID: this.ComponentsAattachmentsForm.PRODUCT_OBJECT_ID,
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
    // 附件保存
    annexSave () {
      var that = this
      var postAattachmentsData = that.$refs.rightTopTable.getRecordset()
      that.annexform.InsertAttachments = postAattachmentsData.insertRecords.concat()
      that.annexform.UpdateAttachments = postAattachmentsData.updateRecords.concat()
      if (postAattachmentsData.insertRecords.length || postAattachmentsData.updateRecords.length) {
        SaveData(that.annexform).then((res) => {
          if (res.Result) {
            that.annexform = {}
            that.$notify({
              title: that.$t('ssc_rd.me_su'),
              message: that.$t('ssc_rd.me_suf'),
              type: 'success',
              duration: 2000
            })
            this.geComponentLoadData()
          } else {
            that.$message({
              message: res.ErrorInfo.Message,
              type: 'error'
            })
          }
        })
      }
    },
    // 采集箱号维护
    async getCaseLoadData () {
      const res = await CaseLoadData(this.CaseForm)
      if (res.Result) {
        this.CaseData = res.Result ? res.Result : []
        this.Casetotal = res.TotalCount || 0
        console.log(res.Result, '采集箱号维护')
      }
    },
    CaseSearch () {
      if (!this.PrimaryData.ID) {
        this.$message({
          showClose: true,
          message: this.$t('ProductSetting._44'),
          type: 'warning'
        })
        return
      }
      this.CaseForm.Page = 1
      this.getCaseLoadData()
    },

    CaseSizeChange (val) {
      this.CaseForm.Limit = val
      this.getCaseLoadData()
    },
    CaseCurrentChange (val) {
      this.CaseForm.Page = val
      this.getCaseLoadData()
    },
    // 新增
    addCase (row) {
      if (!this.PrimaryData.ID) {
        this.$message({
          showClose: true,
          message: this.$t('ProductSetting._44'),
          type: 'warning'
        })
        return
      }
      const record = {
        ID: 0,
        PART_NO: this.mainTable.PART_NO,
        FORMAT: '',
        STANDARD_QUANTITY: 0,
        MAX_QUANTITY: 0,
        MIN_QUANTITY: 0,
        STANDARD_WEIGHT: '',
        MAX_WEIGHT: '',
        MIN_WEIGHT: '',
        CUBAGE: '',
        LENGTH: '',
        WIDTH: '',
        HEIGHT: '',
        AUTO_CREATE_FLAG: '',
        COLLECT_OPERATION_ID: this.PrimaryData.CURRENT_OPERATION_ID,
        ENABLED: 'Y'
      }
      this.defaultAdd = 1
      // 如果是 -1 则从最后新增一条数据
      this.$refs.CaseNumber.insertAt(record, row).then(({ row }) => {
        this.$refs.CaseNumber.setActiveRow(row)
      })
    },
    SaveCase () {
      var postdata = this.$refs.CaseNumber.getRecordset()
      if (
        postdata.insertRecords.length ||
        postdata.removeRecords.length ||
        postdata.updateRecords.length
      ) {
        this.$refs.CaseNumber.validate(valid => {
          if (valid) {
            this.CollectPartsSave.InsertRecords = postdata.insertRecords
            this.CollectPartsSave.UpdateRecords = postdata.updateRecords
            this.CollectPartsSave.RemoveRecords = []
            var Status = false
            this.CollectPartsSave.InsertRecords.map(v => {
              if (v.MIN_QUANTITY > v.MAX_QUANTITY) {
                Status = true
                return this.$message.error(this.$t('SfcsProductPallet._35'))
              }
              if (v.MIN_WEIGHT > v.MAX_WEIGHT) {
                Status = true
                return this.$message.error(this.$t('SfcsProductPallet._33'))
              }
              if (v.AUTO_CREATE_FLAG === 'N') {
                if (!v.FORMAT) {
                  Status = true
                  return this.$message.error(this.$t('spc._33'))
                }
              }
            })
            this.CollectPartsSave.UpdateRecords.map(v => {
              if (v.MIN_QUANTITY > v.MAX_QUANTITY) {
                Status = true
                return this.$message.error(this.$t('SfcsProductPallet._35'))
              }
              if (v.MIN_WEIGHT > v.MAX_WEIGHT) {
                Status = true
                return this.$message.error(this.$t('SfcsProductPallet._33'))
              }
              if (v.AUTO_CREATE_FLAG === 'N') {
                if (!v.FORMAT) {
                  Status = true
                  return this.$message.error(this.$t('spc._33'))
                }
              }
            })
            if (Status) {
              return
            }
            CaseSaveData(this.CollectPartsSave).then(res => {
              if (res.Result) {
                this.getCaseLoadData()
                this.$notify({
                  title: this.$t('cdc._21'),
                  message: this.$t('cdc._22'),
                  type: 'success',
                  duration: 2000
                })
              }
              this.CollectPartsSave = {}
            })
          }
        })
      } else {
        this.$message({
          showClose: true,
          message: this.$t('cdc._26'),
          type: 'warning'
        })
      }
    },
    cellCase (e) {
      this.CaseSave.RemoveRecords = []
      this.CaseSave.RemoveRecords.push(e.row)
      this.ComponentsAattachmentsForm.PRODUCT_OBJECT_ID = e.row.ID
    },
    async removeCase (row) {
      console.log(row)
      if (!this.CaseSave.RemoveRecords) {
        this.$message({
          showClose: true,
          message: this.$t('ProductSetting._47'),
          type: 'warning'
        })
        return
      }

      this.$confirm(this.$t('ssn._15'), this.$t('ssn._16'), {
        confirmButtonText: this.$t('ssn._17'),
        cancelButtonText: this.$t('ssn._18'),
        type: 'warning'
      })
        .then(async () => {
          if (this.CaseSave.RemoveRecords[0].ID === 0) {
            this.$refs.CaseNumber.remove(this.CaseSave.RemoveRecords)
            this.$notify({
              title: this.$t('ssn._12'),
              message: this.$t('ssn._19'),
              type: 'success',
              duration: 2000
            })
          } else {
            this.CaseSave.insertRecords = []
            this.CaseSave.updateRecords = []
            CaseSaveData(this.CaseSave).then(res => {
              if (res.Result) {
                this.$notify({
                  title: this.$t('ssn._12'),
                  message: this.$t('ssn._19'),
                  type: 'success',
                  duration: 2000
                })
              }
              this.CaseSave = {}
              this.getCaseLoadData()
            })
          }
        })
        .catch(() => { })
    },
    // 采集资料维护
    async getCollectIndex () {
      const res = await CollectIndex()
      if (res.Result) {
        this.SourceList = []
        this.SourceListBox = []
        this.SourceList = res.Result.SourceList

        this.SourceListBox.push({
          label: '',
          value: '',
          disabled: false
        })
        this.SourceList.map((item) => {
          this.SourceListBox.push({
            label: item.OBJECT_NAME,
            value: Number(item.ID),
            disabled: false
          })
        })
        console.log(res.Result, '采集资料维护')
      }
    },
    async getCollectLoadData () {
      const res = await CollectLoadData(this.CollectForm)
      if (res.Result) {
        this.CollectData = res.Result ? res.Result : []
        this.Collecttotal = res.TotalCount || 0
        console.log(res.Result, '采集资料维护')
      }
    },
    CollectSearch () {
      if (!this.PrimaryData.ID) {
        this.$message({
          showClose: true,
          message: this.$t('ProductSetting._44'),
          type: 'warning'
        })
        return
      }
      this.CollectForm.Page = 1
      this.getCollectLoadData()
    },

    CollectSizeChange (val) {
      this.CollectForm.Limit = val
      this.getCollectLoadData()
    },
    CollectCurrentChange (val) {
      this.CollectForm.Page = val
      this.getCollectLoadData()
    },
    // 新增
    addCollect (row) {
      if (!this.PrimaryData.ID) {
        this.$message({
          showClose: true,
          message: this.$t('ProductSetting._44'),
          type: 'warning'
        })
        return
      }
      const record = {
        ID: 0,
        PART_NO: this.mainTable.PART_NO,
        RESOURCE_ID: 0,
        DATA_FORMAT: '',
        FIXED_VALUE: '',
        RESOURCE_QTY: 1,
        ENABLED: 'Y',
        REWORK_REMOVE_FLAG: '',
        EDI_FLAG: '',
        COLLECT_OPERATION_ID: this.PrimaryData.CURRENT_OPERATION_ID

      }
      this.defaultAdd = 1
      // 如果是 -1 则从最后新增一条数据
      this.$refs.CollectData.insertAt(record, row).then(({ row }) => {
        this.$refs.CollectData.setActiveRow(row)
      })
    },
    SaveCollect () {
      var postdata = this.$refs.CollectData.getRecordset()
      if (
        postdata.insertRecords.length ||
        postdata.removeRecords.length ||
        postdata.updateRecords.length
      ) {
        this.$refs.CollectData.validate(valid => {
          if (valid) {
            this.CollectSave.InsertRecords = postdata.insertRecords
            this.CollectSave.UpdateRecords = postdata.updateRecords
            this.CollectSave.RemoveRecords = []
            var statr = false
            this.CollectSave.InsertRecords.map(item => {
              if (!item.DATA_FORMAT && !item.FIXED_VALUE) {
                statr = true
                return this.$message.error(this.$t('sprs._34'))
              }
            })
            this.CollectSave.UpdateRecords.map(item => {
              if (!item.DATA_FORMAT && !item.FIXED_VALUE) {
                statr = true
                return this.$message.error(this.$t('sprs._34'))
              }
            })
            if (statr) {
              return
            }
            CollectSaveData(this.CollectSave).then(res => {
              if (res.Result) {
                this.getCollectLoadData()
                this.$notify({
                  title: this.$t('cdc._21'),
                  message: this.$t('cdc._22'),
                  type: 'success',
                  duration: 2000
                })
              }
              this.CollectSave = {}
            })
          }
        })
      } else {
        this.$message({
          showClose: true,
          message: this.$t('cdc._26'),
          type: 'warning'
        })
      }
    },
    cellCollect (e) {
      this.CollectSave.RemoveRecords = []
      this.CollectSave.RemoveRecords.push(e.row)
      this.ComponentsAattachmentsForm.PRODUCT_OBJECT_ID = e.row.ID
    },
    async removeCollect (row) {
      console.log(row)
      if (!this.CollectSave.RemoveRecords) {
        this.$message({
          showClose: true,
          message: this.$t('ProductSetting._47'),
          type: 'warning'
        })
        return
      }

      this.$confirm(this.$t('ssn._15'), this.$t('ssn._16'), {
        confirmButtonText: this.$t('ssn._17'),
        cancelButtonText: this.$t('ssn._18'),
        type: 'warning'
      })
        .then(async () => {
          if (this.CollectSave.RemoveRecords[0].ID === 0) {
            this.$refs.CollectData.remove(this.CollectSave.RemoveRecords)
            this.$notify({
              title: this.$t('ssn._12'),
              message: this.$t('ssn._19'),
              type: 'success',
              duration: 2000
            })
          } else {
            this.CollectSave.insertRecords = []
            this.CollectSave.updateRecords = []
            CollectSaveData(this.CollectSave).then(res => {
              if (res.Result) {
                this.$notify({
                  title: this.$t('ssn._12'),
                  message: this.$t('ssn._19'),
                  type: 'success',
                  duration: 2000
                })
                this.getCollectLoadData()
              }
              this.CollectSave = {}
            })
          }
        })
        .catch(() => { })
    },
    // 采集UID维护
    async getCollectUIDIndex () {
      const res = await CollectUIDIndex()
      if (res.Result) {
        this.UIDCategory = []
        this.UIDCategoryBox = []
        this.UIDCategory = res.Result.UIDCategory

        this.UIDCategoryBox.push({
          label: '',
          value: '',
          disabled: false
        })
        this.UIDCategory.map((item) => {
          this.UIDCategoryBox.push({
            label: item.OBJECT_NAME,
            value: Number(item.ID),
            disabled: false
          })
        })

        console.log(res.Result, '采集资料维护')
      }
    },
    async getCollectUIDLoadData () {
      const res = await CollectUIDLoadData(this.CollectUIDForm)
      if (res.Result) {
        this.CollectUIDDate = res.Result ? res.Result : []
        this.CollectUIDtotal = res.TotalCount || 0
        const arr1Ids = this.BREAKLIST.map(item => item.value)
        this.CollectUIDDate.filter(item => {
          if (!arr1Ids.includes(item.BREAK_OPERATION_ID)) {
            item.BREAK_OPERATION_ID = ''
          }
          console.log(arr1Ids.includes(item.BREAK_OPERATION_ID))
        })
      }
    },
    CollectUIDSearch () {
      if (!this.PrimaryData.ID) {
        this.$message({
          showClose: true,
          message: this.$t('ProductSetting._44'),
          type: 'warning'
        })
        return
      }
      this.CollectForm.Page = 1
      this.getCollectUIDLoadData()
    },

    CollectUIDSizeChange (val) {
      this.CollectForm.Limit = val
      this.getCollectUIDLoadData()
    },
    CollectUIDCurrentChange (val) {
      this.CollectForm.Page = val
      this.getCollectUIDLoadData()
    },
    // 新增
    addCollectUID (row) {
      if (!this.PrimaryData.ID) {
        this.$message({
          showClose: true,
          message: this.$t('ProductSetting._44'),
          type: 'warning'
        })
        return
      }
      const record = {
        ID: 0,
        PART_NO: this.mainTable.PART_NO,
        RESOURCE_ID: 0,
        DATA_FORMAT: '',
        FIXED_VALUE: '',
        RESOURCE_QTY: 0,
        ENABLED: 'Y',
        REWORK_REMOVE_FLAG: '',
        EDI_FLAG: '',
        BREAK_OPERATION_ID: '',
        COLLECT_OPERATION_ID: this.PrimaryData.CURRENT_OPERATION_ID

      }
      this.defaultAdd = 1
      // 如果是 -1 则从最后新增一条数据
      this.$refs.CollectUID.insertAt(record, row).then(({ row }) => {
        this.$refs.CollectUID.setActiveRow(row)
      })
    },
    SaveCollectUID () {
      var postdata = this.$refs.CollectUID.getRecordset()
      if (
        postdata.insertRecords.length ||
        postdata.removeRecords.length ||
        postdata.updateRecords.length
      ) {
        this.$refs.CollectUID.validate(valid => {
          if (valid) {
            this.CollectUIDSave.InsertRecords = postdata.insertRecords
            this.CollectUIDSave.UpdateRecords = postdata.updateRecords
            this.CollectUIDSave.removeRecords = []
            this.CollectUIDSave.InsertRecords.map(v => {
              v.BREAK_OPERATION_ID = Number(v.BREAK_OPERATION_ID)
              if (v.BREAK_OPERATION_ID === 0) {
                v.BREAK_OPERATION_ID = null
              }
            })
            this.CollectUIDSave.UpdateRecords.map(v => {
              v.BREAK_OPERATION_ID = Number(v.BREAK_OPERATION_ID)
              if (v.BREAK_OPERATION_ID === 0) {
                v.BREAK_OPERATION_ID = null
              }
            })
            CollectUIDSaveData(this.CollectUIDSave).then(res => {
              if (res.Result) {
                this.getCollectUIDLoadData()
                this.$notify({
                  title: this.$t('cdc._21'),
                  message: this.$t('cdc._22'),
                  type: 'success',
                  duration: 2000
                })
              }
              this.CollectUIDSave = {}
            })
          }
        })
      } else {
        this.$message({
          showClose: true,
          message: this.$t('cdc._26'),
          type: 'warning'
        })
      }
    },
    cellCollectUID (e) {
      this.CollectUIDSave.removeRecords = []
      this.CollectUIDSave.removeRecords.push(e.row)
      this.ComponentsAattachmentsForm.PRODUCT_OBJECT_ID = e.row.ID
    },
    async removeCollectUID (row) {
      console.log(row)
      if (!this.CollectUIDSave.removeRecords) {
        this.$message({
          showClose: true,
          message: this.$t('ProductSetting._47'),
          type: 'warning'
        })
        return
      }

      this.$confirm(this.$t('ssn._15'), this.$t('ssn._16'), {
        confirmButtonText: this.$t('ssn._17'),
        cancelButtonText: this.$t('ssn._18'),
        type: 'warning'
      })
        .then(async () => {
          if (this.CollectUIDSave.removeRecords[0].ID === 0) {
            this.$refs.CollectUID.remove(this.CollectUIDSave.removeRecords)
            this.$notify({
              title: this.$t('ssn._12'),
              message: this.$t('ssn._19'),
              type: 'success',
              duration: 2000
            })
          } else {
            this.CollectUIDSave.insertRecords = []
            this.CollectUIDSave.updateRecords = []
            CollectUIDSaveData(this.CollectUIDSave).then(res => {
              if (res.Result) {
                this.$notify({
                  title: this.$t('ssn._12'),
                  message: this.$t('ssn._19'),
                  type: 'success',
                  duration: 2000
                })
                this.getCollectUIDLoadData()
              }
              this.CollectUIDSave = {}
            })
          }
        })
        .catch(() => { })
    },
    // 采集栈板维护
    async getPalletLoadData () {
      const res = await PalletLoadData(this.PalletFrom)
      if (res.Result) {
        this.PalletData = res.Result ? res.Result : []
        this.Pallettotal = res.TotalCount || 0
        console.log(res.Result, '采集资料维护')
      }
    },
    PalletSearch () {
      if (!this.PrimaryData.ID) {
        this.$message({
          showClose: true,
          message: this.$t('ProductSetting._44'),
          type: 'warning'
        })
        return
      }
      this.PalletFrom.Page = 1
      this.getPalletLoadData()
    },

    PalletSizeChange (val) {
      this.PalletFrom.Limit = val
      this.getPalletLoadData()
    },
    PalletCurrentChange (val) {
      this.PalletFrom.Page = val
      this.getPalletLoadData()
    },
    // 新增
    addPallet (row) {
      if (!this.PrimaryData.ID) {
        this.$message({
          showClose: true,
          message: this.$t('ProductSetting._44'),
          type: 'warning'
        })
        return
      }
      const record = {
        ID: 0,
        PART_NO: this.mainTable.PART_NO,
        FORMAT: '',
        STANDARD_QUANTITY: 0,
        MAX_QUANTITY: 0,
        MIN_QUANTITY: 0,
        STANDARD_WEIGHT: '',
        MAX_WEIGHT: '',
        MIN_WEIGHT: '',
        STANDARD_CUBAGE: '',
        MAX_CUBAGE: '',
        MIN_CUBAGE: '',
        LENGTH: '',
        WIDTH: '',
        HEIGHT: '',
        COLLECT_OPERATION_ID: this.PrimaryData.CURRENT_OPERATION_ID,
        ENABLED: 'Y'
      }

      this.defaultAdd = 1
      // 如果是 -1 则从最后新增一条数据
      this.$refs.CollectionPallet.insertAt(record, row).then(({ row }) => {
        this.$refs.CollectionPallet.setActiveRow(row)
      })
    },
    SavePallet () {
      var postdata = this.$refs.CollectionPallet.getRecordset()
      if (
        postdata.insertRecords.length ||
        postdata.removeRecords.length ||
        postdata.updateRecords.length
      ) {
        this.$refs.CollectionPallet.validate(valid => {
          if (valid) {
            this.PalletSave.InsertProductPallet = postdata.insertRecords
            this.PalletSave.UpdateProductPallet = postdata.updateRecords
            this.PalletSave.RemoveRecords = []
            var Status = false
            this.PalletSave.InsertProductPallet.map(v => {
              if (v.MIN_QUANTITY > v.MAX_QUANTITY) {
                Status = true
                return this.$message.error(this.$t('SfcsProductPallet._35'))
              }
              if (v.MIN_WEIGHT > v.MAX_WEIGHT) {
                Status = true
                return this.$message.error(this.$t('SfcsProductPallet._33'))
              }
            })
            this.PalletSave.UpdateProductPallet.map(v => {
              if (v.MIN_QUANTITY > v.MAX_QUANTITY) {
                Status = true
                return this.$message.error(this.$t('SfcsProductPallet._35'))
              }
              if (v.MIN_WEIGHT > v.MAX_WEIGHT) {
                Status = true
                return this.$message.error(this.$t('SfcsProductPallet._33'))
              }
            })
            if (Status) {
              return
            }
            PalletSaveData(this.PalletSave).then(res => {
              if (res.Result) {
                this.getPalletLoadData()
                this.$notify({
                  title: this.$t('cdc._21'),
                  message: this.$t('cdc._22'),
                  type: 'success',
                  duration: 2000
                })
              }
              this.PalletSave = {}
            })
          }
        })
      } else {
        this.$message({
          showClose: true,
          message: this.$t('cdc._26'),
          type: 'warning'
        })
      }
    },
    cellPallet (e) {
      console.log(e, 'eeeeee')
      this.PalletSave.RemoveRecords = []
      this.PalletSave.RemoveRecords.push(e.row)
      this.ComponentsAattachmentsForm.PRODUCT_OBJECT_ID = e.row.ID
    },
    async removePallet (row) {
      console.log(row)
      if (!this.PalletSave.RemoveRecords) {
        this.$message({
          showClose: true,
          message: this.$t('ProductSetting._47'),
          type: 'warning'
        })
        return
      }

      this.$confirm(this.$t('ssn._15'), this.$t('ssn._16'), {
        confirmButtonText: this.$t('ssn._17'),
        cancelButtonText: this.$t('ssn._18'),
        type: 'warning'
      })
        .then(async () => {
          if (this.PalletSave.RemoveRecords[0].ID === 0) {
            this.$refs.CollectionPallet.remove(this.PalletSave.RemoveRecords)
            this.$notify({
              title: this.$t('ssn._12'),
              message: this.$t('ssn._19'),
              type: 'success',
              duration: 2000
            })
          } else {
            this.PalletSave.InsertProductPallet = []
            this.PalletSave.UpdateProductPallet = []
            PalletSaveData(this.PalletSave).then(res => {
              if (res.Result) {
                this.$notify({
                  title: this.$t('ssn._12'),
                  message: this.$t('ssn._19'),
                  type: 'success',
                  duration: 2000
                })
                this.PalletSave = {}
                this.getPalletLoadData()
              }
            })
          }
        })
        .catch(() => { })
    },
    matchType (fileName) {
      // 后缀获取
      var suffix = ''
      // 获取类型结果
      var result = ''
      try {
        var flieArr = fileName.split('.')
        suffix = flieArr[flieArr.length - 1]
      } catch (err) {
        suffix = ''
      }
      // fileName无后缀返回 false
      if (!suffix) {
        result = false
        return result
      }
      // 图片格式
      var imglist = ['png', 'jpg', 'jpeg', 'bmp', 'gif']
      // 进行图片匹配
      result = imglist.some(function (item) {
        return item === suffix
      })
      if (result) {
        result = 'image'
        return result
      };
      // 匹配txt
      var txtlist = ['txt']
      result = txtlist.some(function (item) {
        return item === suffix
      })
      if (result) {
        result = 'txt'
        return result
      };
      // 匹配 excel
      var excelist = ['xls', 'xlsx']
      result = excelist.some(function (item) {
        return item === suffix
      })
      if (result) {
        result = 'excel'
        return result
      };
      // 匹配 word
      var wordlist = ['doc', 'docx']
      result = wordlist.some(function (item) {
        return item === suffix
      })
      if (result) {
        result = 'word'
        return result
      };
      // 匹配 pdf
      var pdflist = ['pdf']
      result = pdflist.some(function (item) {
        return item === suffix
      })
      if (result) {
        result = 'pdf'
        return result
      };
      // 匹配 ppt
      var pptlist = ['ppt']
      result = pptlist.some(function (item) {
        return item === suffix
      })
      if (result) {
        result = 'ppt'
        return result
      };
      // 匹配 视频
      var videolist = ['mp4', 'avi', 'rmvb', 'flv']
      result = videolist.some(function (item) {
        return item === suffix
      })
      if (result) {
        result = 'video'
        return result
      };
      // 匹配 音频
      var radiolist = ['mp3', 'wav', 'wmv']
      result = radiolist.some(function (item) {
        return item === suffix
      })
      if (result) {
        result = 'radio'
        return result
      }
      // 其他 文件类型
      result = 'other'
      return result
    }
  }
}
</script>
<style lang="scss" scoped>
.NewProductEdit {
  padding: 0 15px 0;
  .compile-col {
    display: flex;
    align-items: center;
    margin-top: 10px;
    .select {
      flex: 1;
    }
    span {
      padding: 0 10px;
    }
    button {
      margin-left: 5px;
    }
  }
  .upload-button {
    display: flex;
    justify-content: center;
    margin-top: 15px;
  }
  .dialog-cloth {
    position: absolute;
    background: rgba(0, 0, 0, 0.1);
    width: 100%;
    height: 100%;
    z-index: 9;
  }
  .tab-row-tabs {
    height: calc(100vh - 483px);
  }
  .AddOrModify-row-tabs {
    height: calc(100vh - 449px);
  }
  .SOPRoutes-row-table {
    height: calc(100vh - 360px);
  }
}
.Routetable {
  height: calc(100vh - 60px - 40px - 53px - 130px - 42px);
}
.SfcsProductComponentsHead {
  height: calc(100vh - 450px);
}
</style>
<style>
.NewProductEdit .main-dlalog .el-dialog__body {
  padding: 0px 20px 15px;
}
.NewProductEdit .main-dlalog .el-upload {
  width: 100%;
  height: 300px;
  border: 1px solid #ccc;
}
.NewProductEdit .vxe-button.type--button {
  padding: 0 5px;
}
.NewProductEdit .primary-operation {
  overflow: hidden;
}
.NewProductEdit .primary-operation .el-dialog {
  background: #040f3c;
}
.NewProductEdit .primary-operation .el-dialog__header {
  background: #ffffff;
  padding-top: 0;
  padding-bottom: 0;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.NewProductEdit .primary-operation .el-dialog__title {
  font-size: 14px;
  color: #303133;
}
.NewProductEdit .primary-operation .el-dialog__headerbtn {
  position: relative;
  top: 0;
  right: 0;
}
.NewProductEdit .primary-operation .el-dialog__body {
  padding: 0;
  height: calc(100vh - 42px);
}
.NewProductEdit .dialog-row {
  display: flex;
}
.NewProductEdit .dialog-row .dialog-row-div {
  height: calc(100vh - 115px);
  padding-left: 0px !important;
  padding-right: 0px !important;
}
.NewProductEdit .NewProductEdit .dialog-row .dialog-row-div img {
  display: flex;
  border: 1px solid #cccccc;
}
.NewProductEdit .el-upload-list--picture-card .el-upload-list__item-actions {
  display: none;
}
.NewProductEdit .header-container {
  position: sticky;
  top: 0px;
  z-index: 99;
  margin-top: 15px;
}
.NewProductEdit .el_col2x {
  margin-top: -12px;
}
.NewProductEdit .process-header {
  padding: 10px 0;
}
.NewProductEdit .process-table {
  height: calc(100vh - 300px);
}
.NewProductEdit .el-tabs__item {
  padding: 0 10px;
}
</style>
