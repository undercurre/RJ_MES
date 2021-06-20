<template>
  <d2-container class="MesTongsInfo">
    <template slot="header">
      <custom-container-header importBtnName="MesTongsInfoImport"
                               exportBtnName="MesTongsInfoExport"
                               exportTplName="MesTongsInfoExportTpl"
                               defaultLoadDataMethodsName="exportData"
                               exportMehodsName="exportData"
                               defaultTotalPage="searchtotal"
                               defaultMainTable="MainTable"
                               defaultLoadingFlag="Mainloading"
                               defaultFormData="searchVal">
        <el-input v-model="searchVal.CODE"
                  :placeholder="$t('mtf.s_1')"
                  clearable
                  style="width: 200px"
                  class="MesTongsInfo-marginTop"
                  @keyup.enter.native="searchClick" />&nbsp;
        <el-button type="primary"
                   class="MesTongsInfo-marginTop"
                   icon="el-icon-search"
                   @click="searchClick">{{ $t("MesQualityInfo._18") }}</el-button>
        <el-button type="primary"
                   icon="el-icon-finished"
                   class="MesTongsInfo-marginTop"
                   @click="drawer = true">{{ $t("SfcsPn._48") }}</el-button>
        <el-button v-if="$btnList.indexOf('MesTongsInfoApplyGoStoreByModel') !== -1"
                   type="warning"
                   icon="el-icon-plus"
                   class="MesTongsInfo-marginTop"
                   @click.prevent="registerClick">{{ $t("mtf.s_88") }}</el-button>
        <el-button v-if="$btnList.indexOf('MesTongsInfoAdd') !== -1"
                   type="success"
                   icon="el-icon-plus"
                   class="MesTongsInfo-marginTop"
                   @click.prevent="registeredClick">{{ $t("mtf.s_8") }}</el-button>
        <el-button v-if="$btnList.indexOf('MesTongsInfoWarehousing') !== -1"
                   type="primary"
                   icon="el-icon-date"
                   class="MesTongsInfo-marginTop"
                   @click.prevent="warehouseClick">{{ $t("mtf.s_9") }}</el-button>

        <el-button v-if="$btnList.indexOf('MesTongsInfoUse') !== -1"
                   type="warning"
                   icon="el-icon-share"
                   class="MesTongsInfo-marginTop"
                   @click.prevent="useClick">{{ $t("mtf.s_11") }}</el-button>
        <el-button v-if="$btnList.indexOf('MesTongsInfomaintenance') !== -1"
                   type="primary"
                   icon="el-icon-caret-bottom"
                   class="MesTongsInfo-marginTop"
                   @click.prevent="maintainClick">{{ $t("mtf.s_12") }}</el-button>
        <el-button v-if="$btnList.indexOf('MesTongsInfoservice') !== -1"
                   type="warning"
                   icon="el-icon-setting"
                   class="MesTongsInfo-marginTop"
                   @click.prevent="serviceClick">{{ $t("mtf.s_13") }}</el-button>
        <el-button v-if="$btnList.indexOf('MesTonChangeStorage') !== -1"
                   type="warning"
                   icon="el-icon-sort"
                   class="MesTongsInfo-marginTop"
                   @click.prevent="changeClick">{{ $t("mtf.s_10") }}</el-button>
        <el-button type="danger"
                   icon="el-icon-s-claim"
                   class="MesTongsInfo-marginTop"
                   @click.prevent="foreverClick">{{ $t("mtf._110") }}</el-button>
      </custom-container-header>
    </template>
    <div class="MesTongsInfo-table-dev">
      <el-table v-loading="Mainloading"
                stripe
                :data="MainTable"
                width="100%"
                height="100%"
                highlight-current-row
                border
                :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
                @row-click="DetailsClick">
        <el-table-column :label="$t('mtf.t_1')"
                         width="80"
                         align="center"
                         :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <el-radio v-model="Mainradio"
                      class="main-radio"
                      :label="scope.$index" />
          </template>
        </el-table-column>
        <el-table-column :label="$t('mtf.t_2')"
                         align="center"
                         width="110"
                         :show-overflow-tooltip="true">
          <template slot-scope="scope">{{ scope.$index + 1 }}</template>
        </el-table-column>
        <el-table-column prop="CODE"
                         :label="$t('mtf.s_1')"
                         align="center"
                         width="150"
                         :show-overflow-tooltip="true" />
        <el-table-column prop="MES_TONGS_TYPE"
                         :label="$t('mtf.t_4')"
                         align="center"
                         width="150"
                         :show-overflow-tooltip="true">
          <!-- <template slot-scope="scope">
            <span v-if="scope.row.TONGS_TYPE === 1">{{
              $t("MesTongsApply._13")
            }}</span>
            <span v-else-if="scope.row.TONGS_TYPE === 2">{{
              $t("MesTongsApply._14")
            }}</span>
            <span v-else-if="scope.row.TONGS_TYPE === 3">{{
              $t("MesTongsApply._15a")
            }}</span>
            <span v-else-if="scope.row.TONGS_TYPE === 4">{{
              $t("MesTongsApply._15b")
            }}</span>
            <span v-else-if="scope.row.TONGS_TYPE === 5">{{
              $t("MesTongsApply._15c")
            }}</span>
            <span v-else-if="scope.row.TONGS_TYPE === 6">{{
              $t("MesTongsApply._15d")
            }}</span>
            <span v-else-if="scope.row.TONGS_TYPE === 7">{{
              $t("MesTongsApply._15e")
            }}</span>
            <span v-else-if="scope.row.TONGS_TYPE === 8">{{
              $t("MesTongsApply._15f")
            }}</span>
            <span v-else-if="scope.row.TONGS_TYPE === 9">{{
              $t("MesTongsApply._15g")
            }}</span>
            <span v-else>{{ $t("MesTongsApply._16") }}</span>
          </template> -->
        </el-table-column>
        <el-table-column prop="TONGS_MODEL"
                         :label="$t('mtf._133')"
                         align="center"
                         width="150"
                         :show-overflow-tooltip="true" />
        <el-table-column prop="SOURCES"
                         :label="$t('mtf.t_10')"
                         align="center"
                         width="150"
                         :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span v-if="scope.row.SOURCES == 0">{{ $t("mtf.t_11") }}</span>
            <span v-else-if="scope.row.SOURCES == 1">{{ $t("mtf.t_12") }}</span>
            <span v-else-if="scope.row.SOURCES == 2">{{ $t("mtf.t_13") }}</span>
            <span v-else>{{ $t("mtf.t_14") }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="PRINCIPAL"
                         :label="$t('mtf._134')"
                         align="center"
                         width="180"
                         :show-overflow-tooltip="true" />
        <el-table-column prop="STORE_CODE"
                         :label="$t('mtf.t_27')"
                         align="center"
                         width="150"
                         :show-overflow-tooltip="true" />
        <el-table-column prop="STATUS"
                         :label="$t('mtf.t_15')"
                         align="center"
                         width="150"
                         :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span v-if="scope.row.STATUS == -1">{{ $t("mtf.t_16") }}</span>
            <span v-else-if="scope.row.STATUS == 0"
                  style="color: gray; font-weight: 600">{{ $t("mtf.t_17") }}</span>
            <span v-else-if="scope.row.STATUS == 1"
                  style="color: green; font-weight: 600">{{ $t("mtf.t_18") }}</span>
            <span v-else-if="scope.row.STATUS == 2"
                  style="color: purple; font-weight: 600">{{ $t("mtf.t_19") }}</span>
            <span v-else-if="scope.row.STATUS == 3"
                  style="color: green; font-weight: 600">{{ $t("mtf.t_20") }}</span>
            <span v-else-if="scope.row.STATUS == 4"
                  style="color: blue; font-weight: 600">{{ $t("mtf.t_21") }}</span>
            <span v-else-if="scope.row.STATUS == 5"
                  style="color: orange; font-weight: 600">{{ $t("mtf.t_22") }}</span>
            <span v-else-if="scope.row.STATUS == 6"
                  style="color: red; font-weight: 600">{{ $t("mtf.t_23") }}</span>
            <span v-else-if="scope.row.STATUS == 7"
                  style="color: #a15151; font-weight: 600">{{ $t("mtf.t_233") }}</span>
            <span v-else>{{ $t("mtf.t_24") }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="ORGANIZE_NAME"
                         :label="$t('plbd._2')"
                         align="center"
                         width="180"
                         :show-overflow-tooltip="true" />

        <el-table-column prop="CREATE_USER"
                         :label="$t('mtf.t_25')"
                         align="center"
                         width="150"
                         :show-overflow-tooltip="true" />
        <el-table-column prop="CREATE_DATE"
                         :label="$t('mtf.t_26')"
                         align="center"
                         width="180"
                         :show-overflow-tooltip="true" />

        <el-table-column prop="UPDATE_USER"
                         :label="$t('mtf.t_28')"
                         align="center"
                         width="150"
                         :show-overflow-tooltip="true" />
        <el-table-column prop="UPDATE_DATE"
                         :label="$t('mtf.t_29')"
                         align="center"
                         width="180"
                         :show-overflow-tooltip="true" />

        <el-table-column prop="ACTIVE"
                         :label="$t('mtf.t_30')"
                         align="center"
                         fixed="right"
                         width="130"
                         :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <el-switch v-if="scope.row.ACTIVE === 'Y'"
                       v-model="scope.row.ACTIVE"
                       disabled
                       :active-text="$t('mtf.t_31')"
                       :inactive-text="$t('mtf.t_32')"
                       active-color="#13ce66"
                       inactive-color="#cccccc"
                       active-value="Y"
                       inactive-value="N" />
            <el-switch v-if="
                scope.row.ACTIVE === 'N' &&
                $btnList.indexOf('MesTongsInfoactivation') !== -1
              "
                       v-model="scope.row.ACTIVE"
                       :active-text="$t('mtf.t_31')"
                       :inactive-text="$t('mtf.t_32')"
                       active-color="#13ce66"
                       inactive-color="#cccccc"
                       active-value="Y"
                       inactive-value="N"
                       @change="change(scope.$index, scope.row)" />
          </template>
        </el-table-column>
        <el-table-column prop="ENABLED"
                         :label="$t('mtf.t_33')"
                         align="center"
                         fixed="right"
                         width="100"
                         :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <el-button v-if="$btnList.indexOf('MesTongsInfoedit') !== -1"
                       type="primary"
                       size="small"
                       @click="edit_but(scope.row)">{{ $t("mtf.t_34") }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination style="padding-top: 10px"
                   :current-page="searchVal.Page"
                   :page-size="searchVal.Limit"
                   :page-sizes="[15, 25, 35, 45]"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="searchtotal"
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange" />
    <!-- 子表 -->
    <el-tabs v-model="activeName"
             @tab-click="handleClick">
      <el-tab-pane :label="$t('mtf.t2_1')"
                   name="product"
                   class="MesTongsInfo-table-pane">
        <el-table v-if="activeName === 'product'"
                  stripe
                  :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
                  border
                  :data="goodsTable"
                  width="100%"
                  height="100%"
                  highlight-current-row>
          <el-table-column :label="$t('mtf.t_2')"
                           align="center"
                           width="110"
                           fixed="left"
                           :show-overflow-tooltip="true">
            <template slot-scope="scope">{{ scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column prop="PART_NO"
                           :label="$t('mtf.t2_3')"
                           align="center"
                           :show-overflow-tooltip="true" />
          <el-table-column prop="PART_NAME"
                           :label="$t('mtf.t2_4')"
                           align="center"
                           :show-overflow-tooltip="true" />
          <el-table-column prop="PART_DESC"
                           :label="$t('mtf.t2_5')"
                           align="center"
                           :show-overflow-tooltip="true" />
          <el-table-column prop="VERSION"
                           :label="$t('mtf.t2_6')"
                           align="center"
                           :show-overflow-tooltip="true" />
        </el-table>
      </el-tab-pane>
      <el-tab-pane :label="$t('mtf.t3_1')"
                   name="operation"
                   class="MesTongsInfo-table-pane">
        <el-table v-if="activeName === 'operation'"
                  :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
                  border
                  :data="operateTable"
                  width="100%"
                  height="100%"
                  highlight-current-row>
          <el-table-column :label="$t('mtf.t_2')"
                           align="center"
                           width="80"
                           fixed="left"
                           :show-overflow-tooltip="true">
            <template slot-scope="scope">{{ scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column prop="OPERATION_TYPE"
                           :label="$t('mtf.t3_3')"
                           align="center"
                           :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span v-if="scope.row.OPERATION_TYPE == 0"
                    style="color: gray; font-weight: 600">{{ $t("mtf.s_8") }}</span>
              <span v-else-if="scope.row.OPERATION_TYPE == 1"
                    style="color: green; font-weight: 600">{{ $t("mtf.t3_5") }}</span>
              <span v-else-if="scope.row.OPERATION_TYPE == 2"
                    style="color: purple; font-weight: 600">{{ $t("mtf.t3_6") }}</span>
              <span v-else-if="scope.row.OPERATION_TYPE == 3"
                    style="color: powder; font-weight: 600">{{ $t("mtf.t3_7") }}</span>
              <span v-else-if="scope.row.OPERATION_TYPE == 4"
                    style="color: orange; font-weight: 600">{{ $t("mtf.t3_8") }}</span>
              <span v-else-if="scope.row.OPERATION_TYPE == 5"
                    style="color: cyan; font-weight: 600">{{ $t("mtf.t3_9") }}</span>
              <span v-else-if="scope.row.OPERATION_TYPE == 6"
                    style="color: blue; font-weight: 600">{{ $t("mtf.t3_10") }}</span>
              <span v-else-if="scope.row.OPERATION_TYPE == 7"
                    style="color: blue; font-weight: 600">{{ $t("mtf.t3_11") }}</span>
              <span v-else-if="scope.row.OPERATION_TYPE == 8"
                    style="color: #c8a107; font-weight: 600">{{ $t("mtf.t3_12") }}</span>
              <span v-else>{{ $t("mtf.t3_13") }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="PRE_STATUS"
                           :label="$t('mtf.t3_14')"
                           align="center"
                           :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span v-if="scope.row.PRE_STATUS == -1">{{
                $t("mtf.t_16")
              }}</span>
              <span v-else-if="scope.row.PRE_STATUS == 0"
                    style="color: gray; font-weight: 600">{{ $t("mtf.t_17") }}</span>
              <span v-else-if="scope.row.PRE_STATUS == 1"
                    style="color: green; font-weight: 600">{{ $t("mtf.t_18") }}</span>
              <span v-else-if="scope.row.PRE_STATUS == 2"
                    style="color: purple; font-weight: 600">{{ $t("mtf.t_19") }}</span>
              <span v-else-if="scope.row.PRE_STATUS == 3"
                    style="color: green; font-weight: 600">{{ $t("mtf.t3_7") }}</span>
              <span v-else-if="scope.row.PRE_STATUS == 4"
                    style="color: blue; font-weight: 600">{{ $t("mtf.t_21") }}</span>
              <span v-else-if="scope.row.PRE_STATUS == 5"
                    style="color: orange; font-weight: 600">{{ $t("mtf.t_22") }}</span>
              <span v-else-if="scope.row.PRE_STATUS == 6"
                    style="color: red; font-weight: 600">{{ $t("mtf.t_23") }}</span>
              <span v-else-if="scope.row.STATUS == 7"
                    style="color: #a15151; font-weight: 600">{{ $t("mtf.t_233") }}</span>
              <span v-else>{{ $t("mtf.t3_13") }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="LAST_STATUS"
                           :label="$t('mtf.t3_24')"
                           align="center"
                           :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span v-if="scope.row.LAST_STATUS == -1">{{
                $t("mtf.t3_25")
              }}</span>
              <span v-else-if="scope.row.LAST_STATUS == 0"
                    style="color: green; font-weight: 600">{{ $t("mtf.t_17") }}</span>
              <span v-else-if="scope.row.LAST_STATUS == 1"
                    style="color: green; font-weight: 600">{{ $t("mtf.t_18") }}</span>
              <span v-else-if="scope.row.LAST_STATUS == 2"
                    style="color: purple; font-weight: 600">{{ $t("mtf.t_19") }}</span>
              <span v-else-if="scope.row.LAST_STATUS == 3"
                    style="color: green; font-weight: 600">{{ $t("mtf.t3_7") }}</span>
              <span v-else-if="scope.row.LAST_STATUS == 4"
                    style="color: blue; font-weight: 600">{{ $t("mtf.t_21") }}</span>
              <span v-else-if="scope.row.LAST_STATUS == 5"
                    style="color: orange; font-weight: 600">{{ $t("mtf.t_22") }}</span>
              <span v-else-if="scope.row.LAST_STATUS == 6"
                    style="color: red; font-weight: 600">{{ $t("mtf.t_23") }}</span>
              <span v-else-if="scope.row.STATUS == 7"
                    style="color: #a15151; font-weight: 600">{{ $t("mtf.t_233") }}</span>
              <span v-else>{{ $t("mtf.t3_13") }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="STORE_CODE"
                           :label="$t('mtf.t3_15')"
                           align="center"
                           :show-overflow-tooltip="true" />
          <el-table-column prop="CREATE_USER"
                           :label="$t('mtf.t3_16')"
                           align="center"
                           :show-overflow-tooltip="true" />
          <el-table-column prop="CREATE_DATE"
                           :label="$t('mtf.t3_17')"
                           align="center"
                           :show-overflow-tooltip="true" />
          <el-table-column prop="REMARK"
                           :label="$t('mtf.t3_18')"
                           align="center"
                           :show-overflow-tooltip="true" />
        </el-table>
      </el-tab-pane>
      <el-tab-pane :label="$t('mtf.t4_1')"
                   name="activation">
        <el-row :gutter="24">
          <el-col :span="12"
                  style="padding-right: 0px">
            <span class="nav-common">{{ $t("mtf.t4_2") }}：</span>
            <div class="MesTongsInfo-table-panege">
              <el-table v-if="activeName === 'activation'"
                        :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
                        border
                        :data="activatingTable"
                        width="100%"
                        height="100%"
                        highlight-current-row
                        @row-click="activationClick">
                <el-table-column :label="$t('mtf.t_1')"
                                 fixed="left"
                                 width="100"
                                 align="center"
                                 :show-overflow-tooltip="true">
                  <template slot-scope="scope">
                    <el-radio v-model="arouseRadio"
                              class="KeepRadio"
                              :label="scope.$index">
                      <span></span>
                    </el-radio>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('mtf.t_2')"
                                 align="center"
                                 width="100"
                                 :show-overflow-tooltip="true">
                  <template slot-scope="scope">{{ scope.$index + 1 }}</template>
                </el-table-column>
                <el-table-column prop="TYPE"
                                 :label="$t('mtf.t4_3')"
                                 width="200"
                                 align="center"
                                 :show-overflow-tooltip="true">
                  <template slot-scope="scope">
                    <span v-if="scope.row.TYPE == 1"
                          style="font-weight: 600; color: green">{{ $t("mtf.t4_4") }}</span>
                    <span v-else
                          style="font-weight: 600; color: blue">{{
                      $t("mtf.t4_5")
                    }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="TYPE"
                                 :label="$t('mtf.t_15')"
                                 width="200"
                                 align="center"
                                 :show-overflow-tooltip="true">
                  <template slot-scope="scope">
                    <div v-if="scope.row.TYPE == 1">
                      <span v-if="scope.row.STATUS == 1"
                            style="font-weight: 600; color: green">{{ $t("mtf.t4_6") }}</span>
                      <span v-if="scope.row.STATUS == 2"
                            style="font-weight: 600; color: red">{{ $t("mtf.t4_7") }}</span>
                    </div>
                    <div v-else>
                      <span v-if="scope.row.STATUS == 1"
                            style="font-weight: 600; color: green">{{ $t("mtf.t4_8") }}</span>
                      <span v-if="scope.row.STATUS == 2"
                            style="font-weight: 600; color: red">{{ $t("mtf.t4_9") }}</span>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="START_DATE"
                                 width="200"
                                 :label="$t('mtf.t4_10')"
                                 align="center"
                                 :show-overflow-tooltip="true" />
                <el-table-column prop="MAINTAIN_USER"
                                 width="200"
                                 :label="$t('mtf.t4_11')"
                                 align="center"
                                 :show-overflow-tooltip="true" />
                <el-table-column prop="END_DATE"
                                 width="200"
                                 :label="$t('mtf.t4_12')"
                                 align="center"
                                 :show-overflow-tooltip="true" />
              </el-table>
            </div>
          </el-col>
          <el-col :span="12"
                  style="padding-left: 0px">
            <span class="nav-right nav-common">{{ $t("mtf.t4_13") }}：</span>
            <div class="MesTongsInfo-table-panege">
              <el-table v-if="activeName === 'activation'"
                        :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
                        border
                        :data="AcceTable"
                        width="100%"
                        height="100%">
                <el-table-column :label="$t('mtf.t_2')"
                                 align="center"
                                 width="80"
                                 :show-overflow-tooltip="true">
                  <template slot-scope="scope">{{ scope.$index + 1 }}</template>
                </el-table-column>
                <el-table-column prop="ITEM_NAME"
                                 :label="$t('mtf.t4_14')"
                                 align="center"
                                 :show-overflow-tooltip="true" />
                <el-table-column prop="ITEM_DESC"
                                 :label="$t('mtf.t4_15')"
                                 align="center"
                                 :show-overflow-tooltip="true" />
                <el-table-column prop="ITEM_STATUS"
                                 :label="$t('mtf.t4_16')"
                                 align="center"
                                 :show-overflow-tooltip="true">
                  <template slot-scope="scope">
                    <span v-if="scope.row.ITEM_STATUS == 1"
                          style="font-weight: 800; color: green">{{ $t("mtf.t4_8") }}</span>
                    <span v-else
                          style="font-weight: 800; color: red">{{
                      $t("mtf.t4_9")
                    }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="REMARK"
                                 :label="$t('mtf.t4_17')"
                                 align="center"
                                 :show-overflow-tooltip="true" />
              </el-table>
            </div>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane :label="$t('mtf.t5_1')"
                   name="service"
                   class="MesTongsInfo-table-pane">
        <el-table v-if="activeName === 'service'"
                  :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
                  border
                  :data="serviceTable"
                  width="100%"
                  height="100%"
                  highlight-current-row>
          <el-table-column :label="$t('mtf.t_2')"
                           align="center"
                           width="80"
                           fixed="left"
                           :show-overflow-tooltip="true">
            <template slot-scope="scope">{{ scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column prop="REPAIR_RESULT"
                           :label="$t('mtf.t5_2')"
                           align="center"
                           :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span v-if="scope.row.REPAIR_RESULT == 1"
                    style="color: green; font-weight: 600">{{ $t("mtf.t5_3") }}</span>
              <span v-if="scope.row.REPAIR_RESULT == 2"
                    style="color: red; font-weight: 600">{{ $t("mtf.t5_4") }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="REPAIRER"
                           :label="$t('mtf.t5_5')"
                           align="center"
                           :show-overflow-tooltip="true" />

          <el-table-column prop="BEGIN_TIME"
                           :label="$t('mtf.t5_9')"
                           align="center"
                           :show-overflow-tooltip="true" />
          <el-table-column prop="END_TIME"
                           :label="$t('mtf.t5_6')"
                           align="center"
                           :show-overflow-tooltip="true" />
          <el-table-column prop="CREATE_USER"
                           :label="$t('mtf.t5_7')"
                           align="center"
                           :show-overflow-tooltip="true" />
          <el-table-column prop="REMARK"
                           :label="$t('mtf.t5_8')"
                           align="center"
                           :show-overflow-tooltip="true" />
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <!-- 申请入库 -->
    <el-dialog :close-on-click-modal="false"
               v-dialogDrag
               :title="$t('mtf._1')"
               :visible.sync="dialogTableVisible"
               width="70%">
      <el-form ref="form"
               :model="form"
               label-width="90px">
        <el-row :gutter="24">
          <el-col :span="8">
            <el-form-item :label="$t('mtf._2')">
              <el-input v-model="form.APPLY_ID"
                        readonly />
            </el-form-item>
            <el-form-item :label="$t('mtf._6')">
              <el-input v-model="FixtureCategory"
                        readonly></el-input>
            </el-form-item>
            <el-form-item :label="$t('mtf._87')">
              <el-input v-model="form.STORE_CODE"
                        readonly />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('mtf._89')">
              <el-input v-model="form.APPLY_QTY"
                        readonly />
            </el-form-item>
            <!-- <el-form-item :label="$t('mtf._91')">
              <el-input v-model="form.APPLY_DEPARTMENT_NAME" readonly />
            </el-form-item> -->
            <el-form-item :label="$t('mtf._94')">
              <!-- <el-input v-model="form.APPLY_SOURCES" readonly /> -->
              <el-input v-model="Source"
                        readonly />
            </el-form-item>
            <el-form-item :label="$t('mtf._92')">
              <el-input v-model="form.STORE_NAME"
                        readonly />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('mtf._93')">
              <el-input v-model="form.APPLY_SURPLUS_QTY"
                        readonly />
            </el-form-item>
            <el-form-item :label="$t('plbd._2')"
                          prop="ORGANIZE_ID">
              <el-cascader v-model="form.ORGANIZE_ID"
                           :options="organizeList2"
                           style="width: 100%"
                           :show-all-levels="false"
                           placeholder=" "
                           :props="casProps2"
                           @change="handleChangeCascader2"></el-cascader>
            </el-form-item>

            <el-form-item style="margin-left: 0"
                          class="MesTongsInfo-dialog-formItem">
              <el-button type="primary"
                         size="mini"
                         @click="SelectFixtureClick">{{ $t("mtf._97") }}</el-button>
              <el-button type="primary"
                         size="mini"
                         @click="StorageSelectionClick">{{ $t("mtf._96") }}</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <span class="info">{{ $t("mtf._10") }}</span>
        <el-row :gutter="24">
          <el-col :span="24"
                  style="margin-bottom: 10px">
            <el-input clearable
                      v-model="form2.code"
                      :placeholder="$t('mtf._95')"
                      @keyup.enter.native="IsExistCodeClick" />
          </el-col>
        </el-row>
        <div class="dialog-table">
          <el-table :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
                    border
                    :data="infoTable"
                    width="100%"
                    height="100%"
                    highlight-current-row>
            <el-table-column :label="$t('mtf.t_2')"
                             align="center"
                             width="80"
                             fixed="left">
              <template slot-scope="scope">{{ scope.$index + 1 }}</template>
            </el-table-column>
            <el-table-column prop="PART_NO"
                             :label="$t('mtf.s_1')"
                             align="center"
                             :show-overflow-tooltip="true" />
            <el-table-column :label="$t('mtf.t_33')"
                             width="200"
                             align="center">
              <template slot-scope="scope">
                <el-button type="danger"
                           @click="removeClick(scope.row, scope.$index)">{{ $t("mtf._16") }}</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-form>
      <div slot="footer"
           style="text-align: center;">
        <el-button type="primary"
                   @click="define_but">{{
            $t("mtf._17")
            }}</el-button>
        <el-button @click="reset_but">{{ $t("mtf._18") }}</el-button>
      </div>
    </el-dialog>
    <!-- 激活夹具 -->
    <el-dialog v-dialogDrag
               :close-on-click-modal="false"
               :title="$t('mtf._19')"
               :visible.sync="activatingVisible"
               :before-close="beforeClick"
               width="60%"
               class="fixture-dialog">
      <el-form :model="fixtureform"
               label-width="80px">
        <el-form-item :label="$t('mtf.t_30')">
          <el-radio-group v-model="fixtureform.STATUS">
            <el-radio :label="1">{{ $t("mtf.t4_6") }}</el-radio>
            <el-radio :label="2">{{ $t("mtf.t4_7") }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('mtf.t4_17')">
          <el-input v-model="fixtureform.REMARK" />
        </el-form-item>
      </el-form>
      <div class="fixture-table">
        <el-table :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
                  border
                  :data="fixtureTable"
                  height="100%"
                  style="width: 100%">
          <el-table-column :label="$t('mtf.t_2')"
                           align="center"
                           width="80"
                           :show-overflow-tooltip="true">
            <template slot-scope="scope">{{ scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column prop="ITEM_NAME"
                           :label="$t('mtf.t4_14')"
                           align="center"
                           :show-overflow-tooltip="true" />
          <el-table-column prop="REMARK"
                           :label="$t('mtf.t4_15')"
                           align="center"
                           :show-overflow-tooltip="true" />
          <el-table-column prop="ACTIVE"
                           :label="$t('mtf._22')"
                           align="center"
                           :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.ACTIVE"
                         :active-text="$t('mtf.t4_8')"
                         :inactive-text="$t('mtf.t4_9')"
                         active-color="#13ce66"
                         inactive-color="#cccccc"
                         active-value="Y"
                         inactive-value="N" />
            </template>
          </el-table-column>
          <!-- <el-table-column prop="DESC" :label="$t('mtf.t3_18')" align="center" :show-overflow-tooltip="true" /> -->
          <el-table-column prop="DESC"
                           :label="$t('mtf.t3_18')"
                           align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.DESC"
                        :placeholder="$t('mtf.t3_18')" />
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div slot="footer"
           style="text-align: center;">
        <el-button type="primary"
                   @click="fixture_defineClick">{{
          $t("mtf._17")
          }}</el-button>
        <el-button @click="fixture_cancelClick">{{ $t("mtf._23") }}</el-button>
      </div>
    </el-dialog>
    <!-- 夹具入库 变更储位-->
    <el-dialog v-dialogDrag
               :close-on-click-modal="false"
               :title="fixss"
               :visible.sync="warehouseVisible"
               width="60%"
               class="fixture-dialog warehouse">
      <div class="header-container">
        <el-input v-model="warehouseForm.CODE"
                  :placeholder="$t('mtf._25')"
                  clearable
                  style="width: 150px" />
        <el-input v-model="warehouseForm.NAME"
                  :placeholder="$t('mtf._26')"
                  clearable
                  style="width: 150px" />
        <el-button type="success"
                   icon="el-icon-search"
                   @click.prevent="WarSearchClick">{{ $t("mtf.s_7") }}</el-button>
      </div>
      <el-table :data="warehouseTable"
                width="100%"
                highlight-current-row
                border
                :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
                @row-click="warehouseRowClick">
        <el-table-column :label="$t('mtf.t_1')"
                         width="50"
                         align="center"
                         :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <el-radio v-model="warehouseRadio"
                      class="radio"
                      :label="scope.$index" />
          </template>
        </el-table-column>
        <el-table-column :label="$t('mtf.t_2')"
                         align="center"
                         width="80"
                         :show-overflow-tooltip="true">
          <template slot-scope="scope">{{ scope.$index + 1 }}</template>
        </el-table-column>
        <el-table-column prop="CODE"
                         :label="$t('mtf._27')"
                         align="center"
                         :show-overflow-tooltip="true" />
        <el-table-column prop="NAME"
                         :label="$t('mtf._28')"
                         align="center"
                         :show-overflow-tooltip="true" />
        <el-table-column prop="REMARK"
                         :label="$t('mtf._29')"
                         align="center"
                         :show-overflow-tooltip="true" />
      </el-table>
      <el-pagination style="margin-top: 10px;"
                     :current-page="warehouseForm.Page"
                     :page-size="warehouseForm.Limit"
                     :page-sizes="[10, 20, 30, 50]"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="warehousetotal"
                     @size-change="handleSizeClick"
                     @current-change="handleCurrentClick" />
      <div slot="footer"
           style="text-align: center;">
        <el-button type="primary"
                   @click="warehouse_defineClick">{{
          $t("mtf._17")
          }}</el-button>
        <el-button @click="warehouseVisible = false">{{
          $t("mtf._23")
          }}</el-button>
      </div>
    </el-dialog>
    <!-- 保养夹具 -->
    <el-dialog v-dialogDrag
               :close-on-click-modal="false"
               :title="$t('mtf._30') + fixtureform.TONGS_ID"
               :visible.sync="maintainVisible"
               width="60%"
               class="fixture-dialog">
      <el-form :model="fixtureform"
               label-width="80px">
        <el-form-item :label="$t('mtf._144')">
          <el-radio-group v-model="maintainform.STATUS">
            <el-radio :label="1">{{ $t("mtf.t5_3") }}</el-radio>
            <el-radio :label="2">{{ $t("mtf._32") }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('mtf.t4_17')">
          <el-input v-model="maintainform.REMARK" />
        </el-form-item>
      </el-form>
      <el-table :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
                border
                :data="maintainTable"
                style="width: 100%">
        <el-table-column :label="$t('mtf.t_2')"
                         align="center"
                         width="80"
                         :show-overflow-tooltip="true">
          <template slot-scope="scope">{{ scope.$index + 1 }}</template>
        </el-table-column>
        <el-table-column prop="ITEM_NAME"
                         :label="$t('mtf.t4_14')"
                         align="center"
                         :show-overflow-tooltip="true" />
        <el-table-column prop="REMARK"
                         :label="$t('mtf.t4_15')"
                         align="center"
                         :show-overflow-tooltip="true" />
        <el-table-column prop="ACTIVE"
                         :label="$t('mtf._22')"
                         align="center"
                         :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.ACTIVE"
                       :active-text="$t('mtf.t5_3')"
                       :inactive-text="$t('mtf._32')"
                       active-color="#13ce66"
                       inactive-color="#cccccc"
                       active-value="Y"
                       inactive-value="N" />
          </template>
        </el-table-column>
        <el-table-column prop="DESC"
                         :label="$t('mtf.t5_9')"
                         align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.DESC" />
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer"
           style="text-align: center;">
        <el-button type="primary"
                   @click="maintain_defineClick">{{
          $t("mtf._17")
          }}</el-button>
        <el-button @click="maintainVisible = false">{{
          $t("mtf._23")
          }}</el-button>
      </div>
    </el-dialog>
    <el-dialog :close-on-click-modal="false"
               v-dialogDrag
               :title="$t('mtf._34') + fixtureform.TONGS_ID"
               :visible.sync="serviceVisible"
               width="60%"
               class="fixture-dialog">
      <el-form :model="fixtureform"
               label-width="80px">
        <el-form-item :label="$t('mtf.t_30')">
          <el-radio-group v-model="serviceform.REPAIR_RESULT">
            <el-radio :label="1">{{ $t("mtf.t5_3") }}</el-radio>
            <el-radio :label="2">{{ $t("mtf._32") }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('mtf.t4_17')">
          <el-input v-model="serviceform.REMARK"
                    type="textarea" />
        </el-form-item>
      </el-form>
      <div slot="footer"
           style="text-align: center;">
        <el-button type="primary"
                   @click="service_defineClick">{{
          $t("mtf._17")
          }}</el-button>
        <el-button @click="serviceVisible = false">{{
          $t("mtf._23")
          }}</el-button>
      </div>
    </el-dialog>
    <!-- 抽屉 -->
    <el-drawer :title="$t('SfcsPn._48')"
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
                   ref="searchVal"
                   label-position="top"
                   label-width="80px"
                   :model="searchVal"
                   size="mini">
            <el-form-item :label="$t('mtf.s_1')">
              <el-input class="MesTongsInfo-marginTop"
                        v-model="searchVal.CODE"
                        :placeholder="$t('mtf.s_1')"
                        clearable
                        style="width: 100%" />&nbsp;
            </el-form-item>
            <el-form-item :label="$t('mtf.s_2')">
              <el-select class="MesTongsInfo-marginTop"
                         v-model="searchVal.TONGS_TYPE"
                         clearable
                         style="width: 100%"
                         :placeholder="$t('mtf.s_2')">
                <el-option v-for="item in fixture"
                           :key="item.LOOKUP_CODE"
                           :label="item.CHINESE"
                           :value="item.LOOKUP_CODE" />
              </el-select>&nbsp;
            </el-form-item>
            <el-form-item :label="$t('mtf.s_3')">
              <el-select class="MesTongsInfo-marginTop"
                         v-model="searchVal.DEPARTMENT"
                         clearable
                         style="width: 100%"
                         :placeholder="$t('mtf.s_3')">
                <el-option v-for="item in section"
                           :key="item.ID"
                           :label="item.CHINESE"
                           :value="item.ID" />
              </el-select>&nbsp;
            </el-form-item>
            <el-form-item :label="$t('mtf.s_4')">
              <el-select class="MesTongsInfo-marginTop"
                         v-model="searchVal.SOURCES"
                         clearable
                         style="width: 100%"
                         :placeholder="$t('mtf.s_4')">
                <el-option v-for="item in source"
                           :key="item.LOOKUP_CODE"
                           :label="item.CHINESE"
                           :value="item.LOOKUP_CODE" />
              </el-select>&nbsp;
            </el-form-item>
            <el-form-item :label="$t('mtf.s_5')">
              <el-select class="MesTongsInfo-marginTop"
                         v-model="searchVal.STATUS"
                         clearable
                         style="width: 100%"
                         :placeholder="$t('mtf.s_5')">
                <el-option v-for="item in status"
                           :key="item.LOOKUP_CODE"
                           :label="item.CHINESE"
                           :value="item.LOOKUP_CODE" />
              </el-select>&nbsp;
            </el-form-item>
            <el-form-item :label="$t('mtf.s_6')">
              <el-select class="MesTongsInfo-marginTop"
                         v-model="searchVal.ACTIVE"
                         clearable
                         style="width: 100%"
                         :placeholder="$t('mtf.s_6')">
                <el-option v-for="item in CategoryList"
                           :key="item.LOOKUP_CODE"
                           :label="item.CHINESE"
                           :value="item.LOOKUP_CODE" />
              </el-select>&nbsp;
            </el-form-item>
          </el-form>
        </el-card>
      </div>
    </el-drawer>
    <!-- 选择储位 -->
    <el-dialog v-dialogDrag
               :visible.sync="dialogVisible"
               :title="$t('mtf._96')"
               width="50%"
               :close-on-click-modal="false">
      <el-input clearable
                v-model="StorageSpacesForm.CODE"
                :placeholder="$t('mtf._88')"
                style="width: 200px"
                @keyup.enter.native="WarSearchClick" />
      <el-input clearable
                v-model="StorageSpacesForm.NAME"
                :placeholder="$t('mtf._98')"
                style="width: 200px"
                @keyup.enter.native="WarSearchClick" />
      <el-button type="primary"
                 icon="el-icon-search"
                 @click.prevent="WarSearchClick">{{ $t("mtf.s_7") }}</el-button>
      <div class="StorageSpacesForm-Table">
        <vxe-table ref="StorageSpacesFormTable"
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
                   :mouse-config="{ selected: true }"
                   :edit-config="{ trigger: 'click', mode: 'row', showStatus: true }"
                   :radio-config="{ labelField: 'name', trigger: 'row' }"
                   @cell-click="cellClick">
          <vxe-table-column show-overflow
                            :title="$t('srr._38')"
                            type="radio"
                            width="96"
                            align="center" />
          <vxe-table-column width="80"
                            :title="$t('se_cc.sn')"
                            fixed="left">
            <template v-slot="{ $rowIndex }">{{ $rowIndex + 1 }}</template>
          </vxe-table-column>
          <vxe-table-column field="CODE"
                            :title="$t('mtf._99')"
                            :edit-render="{ name: '$input', props: { readonly: true } }" />
          <vxe-table-column field="NAME"
                            :title="$t('mtf._92')"
                            :edit-render="{ name: '$input', props: { readonly: true } }" />
          <vxe-table-column field="REMARK"
                            :title="$t('mtf._100')"
                            :edit-render="{ name: '$input', props: { readonly: true } }" />
        </vxe-table>
      </div>
      <div class="StorageSpacesForm-pagination">
        <el-pagination :current-page="StorageSpacesForm.Page"
                       :page-size="StorageSpacesForm.Limit"
                       :page-sizes="[15, 25, 35, 45]"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="StorageSpacesFormTotalPage"
                       @size-change="StorageSpacesFormhandleSizeChange"
                       @current-change="StorageSpacesFormhandleCurrentChange" />
      </div>
      <div style="text-align: right">
        <el-button @click="closeClick(1)">{{ $t("mtf._111") }}</el-button>
        <el-button type="primary"
                   @click="StorageLocationDetermination">{{
          $t("mtf._112")
          }}</el-button>
      </div>
    </el-dialog>
    <!-- 选择夹具申请信息 -->
    <el-dialog v-dialogDrag
               :visible.sync="dialogVisible2"
               :title="$t('mtf._97')"
               width="60%"
               :close-on-click-modal="false">
      <el-select v-model="SelectFixtureForm.TONGS_TYPE"
                 clearable
                 style="width: 150px"
                 :placeholder="$t('mtf.s_2')"
                 class="MesTongsInfo-marginTop">
        <el-option v-for="item in fixture"
                   :key="item.LOOKUP_CODE"
                   :label="item.CHINESE"
                   :value="item.LOOKUP_CODE" />
      </el-select>
      <el-select v-model="SelectFixtureForm.DEPARTMENT"
                 clearable
                 style="width: 150px"
                 :placeholder="$t('mtf.s_3')"
                 class="MesTongsInfo-marginTop">
        <el-option v-for="item in section"
                   :key="item.ID"
                   :label="item.CHINESE"
                   :value="item.ID" />
      </el-select>&nbsp;
      <el-select v-model="SelectFixtureForm.SOURCES"
                 clearable
                 style="width: 150px"
                 :placeholder="$t('mtf.s_4')"
                 class="MesTongsInfo-marginTop">
        <el-option v-for="item in source"
                   :key="item.LOOKUP_CODE"
                   :label="item.CHINESE"
                   :value="item.LOOKUP_CODE" />
      </el-select>
      <el-button type="primary"
                 icon="el-icon-search"
                 @click.prevent="SelectFixtureFormhClick">{{ $t("mtf.s_7") }}</el-button>
      <div class="StorageSpacesForm-Table">
        <vxe-table ref="SelectFixtureFormTable"
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
                   :mouse-config="{ selected: true }"
                   :edit-config="{ trigger: 'click', mode: 'row', showStatus: true }"
                   :radio-config="{ labelField: 'name', trigger: 'row' }"
                   @cell-click="cellClick2">
          <vxe-table-column show-overflow
                            :title="$t('srr._38')"
                            type="radio"
                            width="80"
                            align="center" />
          <vxe-table-column width="80"
                            field="ID"
                            :title="$t('mtf._101')"
                            :edit-render="{ name: '$input', props: { readonly: true } }" />
          <vxe-table-column width="150"
                            field="QTY"
                            :title="$t('mtf._102')"
                            :edit-render="{ name: '$input', props: { readonly: true } }" />
          <vxe-table-column width="150"
                            field="SURPLUS_QTY"
                            :title="$t('mtf._103')"
                            :edit-render="{ name: '$input', props: { readonly: true } }" />
          <vxe-table-column width="150"
                            field="PART_NO"
                            :title="$t('mtf._104')"
                            :edit-render="{ name: '$input', props: { readonly: true } }" />
          <vxe-table-column width="150"
                            field="PART_NAME"
                            :title="$t('mtf._105')"
                            :edit-render="{ name: '$input', props: { readonly: true } }" />
          <vxe-table-column width="150"
                            field="PART_DESC"
                            :title="$t('mtf._106')"
                            :edit-render="{ name: '$input', props: { readonly: true } }" />
          <vxe-table-column width="150"
                            field="TONGS_TYPE"
                            :title="$t('mtf._107')"
                            :edit-render="{
              autofocus: '.custom-input',
              type: 'visible',
              props: { readonly: true },
            }">
            <template v-slot:edit="{ row }">
              <span v-if="row.TONGS_TYPE === 1">{{
                $t("MesTongsApply._13")
              }}</span>
              <span v-else-if="row.TONGS_TYPE === 2">{{
                $t("MesTongsApply._14")
              }}</span>
              <span v-else-if="row.TONGS_TYPE === 3">{{
                $t("MesTongsApply._15a")
              }}</span>
              <span v-else-if="row.TONGS_TYPE === 4">{{
                $t("MesTongsApply._15b")
              }}</span>
              <span v-else-if="row.TONGS_TYPE === 5">{{
                $t("MesTongsApply._15c")
              }}</span>
              <span v-else-if="row.TONGS_TYPE === 6">{{
                $t("MesTongsApply._15d")
              }}</span>
              <span v-else-if="row.TONGS_TYPE === 7">{{
                $t("MesTongsApply._15e")
              }}</span>
              <span v-else-if="row.TONGS_TYPE === 8">{{
                $t("MesTongsApply._15f")
              }}</span>
              <span v-else-if="row.TONGS_TYPE === 9">{{
                $t("MesTongsApply._15g")
              }}</span>
              <span v-else>{{ $t("MesTongsApply._16") }}</span>
            </template>
          </vxe-table-column>
          <vxe-table-column width="150"
                            field="DEPARTMENT_NAME"
                            :title="$t('mtf._108')"
                            :edit-render="{ name: '$input', props: { readonly: true } }" />
          <vxe-table-column width="150"
                            field="SOURCES"
                            :title="$t('mtf._109')"
                            :edit-render="{
              autofocus: '.custom-input',
              type: 'visible',
              props: { readonly: true },
            }">
            <template v-slot:edit="{ row }">
              <span v-if="row.SOURCES == 0">{{ $t("mtf.t_11") }}</span>
              <span v-else-if="row.SOURCES == 1">{{ $t("mtf.t_12") }}</span>
              <span v-else-if="row.SOURCES == 2">{{ $t("mtf.t_13") }}</span>
              <span v-else>{{ $t("mtf.t_14") }}</span>
            </template>
          </vxe-table-column>
        </vxe-table>
      </div>
      <div class="StorageSpacesForm-pagination">
        <el-pagination :current-page="SelectFixtureForm.Page"
                       :page-size="SelectFixtureForm.Limit"
                       :page-sizes="[15, 25, 35, 45]"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="SelectFixtureFormTotalPage"
                       @size-change="SelectFixtureFormhandleSizeChange"
                       @current-change="SelectFixtureFormhandleCurrentChange" />
      </div>
      <div style="text-align: right">
        <el-button @click="closeClick(2)">{{ $t("mtf._111") }}</el-button>
        <el-button type="primary"
                   @click="DetermineFixtureApplication">{{
          $t("mtf._112")
          }}</el-button>
      </div>
    </el-dialog>
    <!-- 领用夹具 -->
    <el-dialog v-dialogDrag
               :visible.sync="dialogVisible3"
               :title="CollarFixtureTitle"
               width="60%"
               :close-on-click-modal="false">
      <el-form ref="CollarFixtureForm"
               :model="CollarFixtureForm"
               label-width="80px"
               :show-message="false">
        <el-form-item :label="$t('mtf._114')">
          <el-input v-model="CollarFixtureForm.UserName" />
        </el-form-item>
        <el-form-item :label="$t('mtf._115')">
          <el-input v-model="CollarFixtureForm.remark"
                    type="textarea"
                    :rows="5"
                    :placeholder="$t('mtf._116')" />
        </el-form-item>
      </el-form>
      <div slot="footer"
           style="text-align: center">
        <el-button @click="closeClick(3)">{{ $t("mtf._111") }}</el-button>
        <el-button type="primary"
                   @click="
            isForever
              ? CollarFixtureDetermination(2)
              : CollarFixtureDetermination(1)
          ">{{ $t("mtf._112") }}</el-button>
      </div>
    </el-dialog>
    <!--注册 编辑 -->
    <el-dialog :close-on-click-modal="false"
               v-dialogDrag
               top
               :title="tit"
               :visible.sync="dialogVisible4"
               width="70%">
      <el-form ref="editForm"
               :model="editForm"
               label-width="100px"
               :rules="editFormRules"
               :show-message="false">
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item :label="$t('mtf.s_1')"
                          prop="CODE">
              <el-input v-model="editForm.CODE"
                        :disabled="tit === $t('publics.btn.edit')"
                        :placeholder="$t('mtf._3')" />
            </el-form-item>
            <el-form-item :label="$t('mtf._133')">
              <el-input type="text"
                        v-model="editForm.TONGS_MODEL" />
            </el-form-item>
            <el-form-item :label="$t('mtf._134')">
              <el-input type="text"
                        v-model="editForm.PRINCIPAL" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('mtf._6')"
                          prop="TONGS_TYPE">
              <!-- <el-select v-model="editForm.TONGS_TYPE"
                         style="width: 100%"
                         :placeholder="$t('mtm._2')"
                         @change="changeTONGS_TYPE">
                <el-option v-for="item in fixture"
                           :key="item.LOOKUP_CODE"
                           :label="item.CHINESE"
                           :value="item.LOOKUP_CODE" />
              </el-select> -->
              <el-select v-model="editForm.TONGS_TYPE"
                         filterable
                         @change="changeTONGS_TYPE"
                         :placeholder="$t('mtm._2')"
                         style="width: 100%">
                <div style="position: absolute;width: 100%;height: 6px;background: #fff;background: #fff;top: 0;z-index: 99"></div>
                <div style="position: absolute;width: 100%;height: 6px;background: #fff;background: #fff;bottom: 0;z-index: 99"></div>
                <div style="width: 600px;display: flex;padding: 0 20px 0 10px;position: sticky;top: 6px;background: #fff;z-index: 90">
                  <el-input v-model="NameForm.MEANING"
                            clearable
                            @input="sptLoadData"
                            @keyup.enter.native="sptLoadData"
                            :placeholder="$t('SysOrganize._26')"></el-input>
                  <el-button type="primary"
                             icon="el-icon-search"
                             @click.prevent="sptLoadData">{{ $t('publics.btn.search') }}</el-button>
                  <el-button @click="AddName"
                             type="success"
                             icon="el-icon-plus"></el-button>
                </div>
                <el-option v-for="(item,index) in NameList"
                           :disabled="!item.CHINESE"
                           :label="item.CHINESE"
                           :value="item.LOOKUP_CODE"
                           :key="index">
                  <span style="float: left">{{ item.CHINESE }}</span>
                  <span v-if="item.CHINESE"
                        @click="DeleteName(item)"
                        style="float: right; font-size: 16px">
                    <i class="el-icon-close"></i></span>
                </el-option>
                <div style="width: 600px;position: sticky;bottom: 6px;background: #fff;z-index: 90;padding-left: 15px">
                  <el-pagination :pager-count="5"
                                 :current-page="NameForm.Page"
                                 :page-size="NameForm.Limit"
                                 :page-sizes="[15, 25, 35, 45]"
                                 layout="total, sizes, prev, pager, next, jumper"
                                 :total="Namettal"
                                 @size-change="NameSizeChange"
                                 @current-change="NameCurrentChange" />
                </div>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('mtf.t_10')"
                          prop="SOURCES">
              <el-select v-model="editForm.SOURCES"
                         style="width: 100%"
                         :placeholder="$t('mtf._85')"
                         @change="changeSOURCES">
                <el-option v-for="item in source"
                           :key="item.LOOKUP_CODE"
                           :label="item.CHINESE"
                           :value="item.LOOKUP_CODE" />
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('plbd._2')"
                          prop="ORGANIZE_ID">
              <el-cascader v-model="editForm.ORGANIZE_ID"
                           :options="organizeList"
                           style="width: 100%"
                           :show-all-levels="false"
                           :placeholder="$t('plbd._1')"
                           :props="casProps"
                           @change="handleChangeCascader"></el-cascader>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <span class="info">{{ $t("mtf._118") }}</span> -->
        <el-tabs v-model="ProductName">
          <el-tab-pane :label="$t('mtf._137')"
                       name="series">
            <el-row :gutter="24">
              <el-col :span="10">
                <el-form-item :label="$t('mtf._138')">
                  <el-input v-model="info3.FAMILY_NAME"
                            placeholder=" "
                            @change="GetProduct" />
                </el-form-item>
                <el-form-item :label="$t('mtf._139')">
                  <el-input v-model="info3.DESCRIPTION"
                            readonly
                            placeholder=" " />
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item :label="$t('mtf._140')">
                  <el-input v-model="info3.CUSTOMER"
                            readonly
                            placeholder=" " />
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-button type="success"
                           icon="el-icon-circle-plus-outline"
                           @click="Productadd">{{ $t("mtf._15") }}</el-button>
              </el-col>
            </el-row>
            <div class="dialog-table">
              <el-table :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
                        border
                        :data="infoTable3"
                        width="100%"
                        height="100%"
                        highlight-current-row>
                <el-table-column :label="$t('mtf.t_2')"
                                 align="center"
                                 width="80"
                                 fixed="left">
                  <template slot-scope="scope">{{ scope.$index + 1 }}</template>
                </el-table-column>
                <el-table-column prop="CUSTOMER"
                                 :label="$t('mtf._140')"
                                 align="center"
                                 :show-overflow-tooltip="true" />
                <el-table-column prop="FAMILY_NAME"
                                 :label="$t('mtf._138')"
                                 align="center"
                                 :show-overflow-tooltip="true" />
                <el-table-column prop="DESCRIPTION"
                                 :label="$t('mtf._139')"
                                 align="center"
                                 :show-overflow-tooltip="true" />
                <el-table-column prop="ENABLED"
                                 :label="$t('mtf._141')"
                                 width="100"
                                 align="center">
                  <template slot-scope="scope">
                    <el-switch v-model="scope.row.ACTIVE"
                               disabled
                               :active-text="$t('mtf._142')"
                               :inactive-text="$t('mtf._143')"
                               active-color="#13ce66"
                               inactive-color="#cccccc"
                               active-value="Y"
                               inactive-value="N" />
                  </template>
                </el-table-column>

                <el-table-column prop="REPAIR_STATUS"
                                 :label="$t('mtf.t_33')"
                                 width="100"
                                 align="center">
                  <template slot-scope="scope">
                    <el-button type="danger"
                               @click="ProductRemove(scope.row, scope.$index)">{{ $t("mtf._16") }}</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="产品料号关联信息"
                       name="partno">
            <el-row :gutter="24">
              <el-col :span="10">
                <el-form-item :label="$t('mtf.t2_3')">
                  <el-input v-model="info2.PART_NO"
                            :placeholder="$t('mtf._11')"
                            @change="partClick" />
                </el-form-item>
                <el-form-item :label="$t('mtf.t2_5')">
                  <el-input v-model="info2.PART_DESC"
                            readonly
                            :placeholder="$t('mtf._12a')" />
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item :label="$t('mtf.t2_4')">
                  <el-input v-model="info2.PART_NAME"
                            readonly
                            :placeholder="$t('mtf._12a')" />
                </el-form-item>
                <el-form-item :label="$t('mtf.t2_6')">
                  <el-input v-model="info2.VERSION"
                            :placeholder="$t('mtf._14')" />
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-button type="success"
                           icon="el-icon-circle-plus-outline"
                           @click="addClick">{{ $t("mtf._15") }}</el-button>
              </el-col>
            </el-row>
            <div class="dialog-table">
              <el-table :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
                        border
                        :data="infoTable2"
                        width="100%"
                        height="100%"
                        highlight-current-row>
                <el-table-column :label="$t('mtf.t_2')"
                                 align="center"
                                 width="80"
                                 fixed="left">
                  <template slot-scope="scope">{{ scope.$index + 1 }}</template>
                </el-table-column>
                <el-table-column prop="PART_NO"
                                 :label="$t('mtf.t2_3')"
                                 align="center"
                                 :show-overflow-tooltip="true" />
                <el-table-column prop="PART_NAME"
                                 :label="$t('mtf.t2_4')"
                                 align="center"
                                 :show-overflow-tooltip="true" />
                <el-table-column prop="PART_DESC"
                                 :label="$t('mtf.t2_5')"
                                 align="center"
                                 :show-overflow-tooltip="true" />
                <el-table-column prop="VERSION"
                                 :label="$t('mtf.t2_6')"
                                 align="center"
                                 :show-overflow-tooltip="true" />

                <el-table-column prop="REPAIR_STATUS"
                                 :label="$t('mtf.t_33')"
                                 width="100"
                                 align="center">
                  <template slot-scope="scope">
                    <el-button type="danger"
                               @click="removeClick2(scope.row, scope.$index)">{{ $t("mtf._16") }}</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
        </el-tabs>

      </el-form>
      <div slot="footer"
           style="text-align: center;">
        <el-button type="primary"
                   @click="define_but2">{{
            $t("mtf._17")
            }}</el-button>
        <el-button @click="reset_but2">{{ $t("mtf._18") }}</el-button>
      </div>
    </el-dialog>
  </d2-container>
</template>
<script src="./MesTongsInfo.js"></script>
<style lang="scss" scoped>
.con {
  position: relative;
  text-align: left;
  height: 40px;
}
.con i {
  display: block;
  height: 1px;
  background: #eee;
  position: absolute;
  top: 0.9rem;
  width: 100%;
}
.con p {
  display: inline-block;
  background-color: #fff;
  padding: 0 1.875rem;
  text-align: left;
  margin: 0 auto;
  position: absolute;
  left: 50px;
  z-index: 2;
}
.Application-Table {
  height: 300px;
}
</style>
<style>
.MesTongsInfo .MesTongsInfo-marginTop {
  margin-top: 8px;
}
.MesTongsInfo .MesTongsInfo-table-dev .el-switch__core {
  width: 70px !important;
}
.MesTongsInfo-table-dev {
  height: calc(100vh - 500px);
}
.MesTongsInfo-table-pane {
  height: calc(100vh - 560px);
}
.MesTongsInfo-table-panege {
  height: calc(100vh - 585px);
}
/* 隐藏单选文字 */
.MesTongsInfo-table-dev .el-radio__label,
.MesTongsInfo-table-pane .el-radio__label,
.warehouse .el-radio__label {
  display: none;
}
.MesTongsInfo .info {
  padding-left: 15px;
  padding-bottom: 20px;
  display: inherit;
  font-weight: 600;
}
.fixture-dialog .el-dialog__body {
  padding: 0px 15px 15px !important;
}
.MesTongsInfo .dialog-table {
  height: calc(100vh - 500px);
}
.MesTongsInfo .fixture-table {
  height: calc(100vh - 400px);
}
/* .MesTongsInfo .el-dialog__body {
    padding: 0rem 0.25rem;
  } */
.MesTongsInfo .main-radio .el-radio__label {
  display: none;
}
.MesTongsInfo .header-container {
  padding: 10px 0;
}
.StorageSpacesForm-Table {
  margin-top: 10px;
  height: 300px;
}
.StorageSpacesForm-pagination {
  margin: 10px 0;
}
/*.MesTongsInfo .MesTongsInfo-marginTop {*/
/*  margin-top: 8px;*/
/*}*/
.MesTongsInfo .el-switch__core {
  width: 70px !important;
}
.MesTongsInfo-table-dev {
  height: calc(100vh - 500px);
}
.MesTongsInfo-table-pane {
  height: calc(100vh - 560px);
}
.MesTongsInfo-table-panege {
  height: calc(100vh - 585px);
}
/* 隐藏单选文字 */
.MesTongsInfo-table-dev .el-radio__label,
.MesTongsInfo-table-pane .el-radio__label,
.warehouse .el-radio__label {
  display: none;
}
.MesTongsInfo .info {
  padding-left: 15px;
  padding-bottom: 20px;
  display: inherit;
  font-weight: 600;
}
.fixture-dialog .el-dialog__body {
  padding: 0px 15px 15px !important;
}
.fixture-button {
  margin-top: 15px;
  text-align: center;
}
.MesTongsInfo .dialog-table {
  height: calc(100vh - 500px);
}
.MesTongsInfo .fixture-table {
  height: calc(100vh - 400px);
}
/* .MesTongsInfo .el-dialog__body {
      padding: 0rem 0.25rem;
    } */
.MesTongsInfo .main-radio .el-radio__label {
  display: none;
}
.MesTongsInfo .header-container {
  padding: 10px 0;
}
.StorageSpacesForm-Table {
  margin-top: 10px;
  height: 300px;
}
.StorageSpacesForm-pagination {
  margin: 10px 0;
}
</style>
<style>
.MesTongsInfo-dialog-formItem .el-form-item__content {
  margin-left: 0 !important;
  display: flex;
  justify-content: flex-end;
}
</style>
