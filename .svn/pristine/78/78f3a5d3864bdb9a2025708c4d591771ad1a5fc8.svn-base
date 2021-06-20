<template>
  <d2-container class="MesQualityInfo">
    <template slot="header">
      <custom-container-header :isExport="false"
                               :isExportTpl="false"
                               :isImport="false">
        <el-input v-model="listQuery.BATCH_NO"
                  :placeholder="$t('MesQualityInfo._1')"
                  style="width: 150px"
                  @keyup.enter.native="search_but" />
        <el-button type="primary"
                   icon="el-icon-search"
                   @click="search_but">{{
          $t("MesQualityInfo._18")
        }}</el-button>
        <el-button type="primary"
                   icon="el-icon-finished"
                   class="MesTongsInfo-marginTop"
                   @click="drawer = true">
          {{ $t("SfcsPn._48") }}</el-button>
        <el-button v-if="$btnList.indexOf('MesQualityInfoAdd') !== -1"
                   type="success"
                   icon="el-icon-plus"
                   @click="add_but">{{ $t("MesQualityInfo._19") }}</el-button>
        <el-button v-if="$btnList.indexOf('MesQualityInfoAuditData') !== -1"
                   type="warning"
                   icon="el-icon-check"
                   @click="reviewClick">{{ $t("MesQualityInfo._20") }}</el-button>
      </custom-container-header>
    </template>
    <!-- 主表格 -->
    <div class="MesQualityInfo-table-dev">
      <el-table v-loading="Loading"
                :data="mainTable"
                width="100%"
                height="100%"
                highlight-current-row
                border
                :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
                @row-click="openDetails">
        >
        <el-table-column :label="$t('MesQualityInfo._91')"
                         min-width="80"
                         align="center"
                         fixed="left">
          <template slot-scope="scope">
            <el-radio v-model="radio"
                      class="hideradio"
                      :label="scope.$index" />
          </template>
        </el-table-column>
        <el-table-column :label="$t('MesQualityInfo._21')"
                         align="center"
                         min-width="110"
                         fixed="left">
          <template slot-scope="scope">{{ scope.$index + 1 }}</template>
        </el-table-column>
        <el-table-column prop="CHECK_TYPE_NAME"
                         :label="$t('MesQualityInfo._22')"
                         align="center"
                         min-width="160"
                         :show-overflow-tooltip="true" />
        <el-table-column prop="LINE_NAME"
                         :label="$t('MesQualityInfo._23')"
                         align="center"
                         min-width="150"
                         :show-overflow-tooltip="true" />
        <el-table-column prop="PRODUCT_DATE"
                         :label="$t('MesQualityInfo._24')"
                         align="center"
                         min-width="120"
                         :show-overflow-tooltip="true">
          <template slot-scope="scope">{{
            scope.row.PRODUCT_DATE.split(" ")[0]
          }}</template>
        </el-table-column>
        <!--        <el-table-column prop="DEPARTMENT_NAME"-->
        <!--                         :label="$t('MesQualityInfo._25')"-->
        <!--                         align="center"-->
        <!--                         min-width="150"-->
        <!--                         :show-overflow-tooltip="true" />-->
        <el-table-column prop="FIRST_ITEM_TYPE"
                         :label="'首件类型'"
                         min-width="150"
                         align="center"
                         :show-overflow-tooltip="true"
                         :formatter="handleFormatterFirstItemType"></el-table-column>
        <el-table-column prop="EP_STATUS"
                         :label="'环保状态'"
                         min-width="150"
                         align="center"
                         :show-overflow-tooltip="true"
                         :formatter="handleFormatterEpStatus"></el-table-column>
        <el-table-column prop="STATUS"
                         :label="$t('MesQualityInfo._26')"
                         align="center"
                         min-width="150"
                         :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span style="color: orange"
                  v-if="scope.row.STATUS == 0">{{
              $t("MesQualityInfo._9")
            }}</span>
            <span style="color: blue"
                  v-else-if="scope.row.STATUS == 1">{{
              $t("MesQualityInfo._10")
            }}</span>
            <span v-else></span>
          </template>
        </el-table-column>
        <el-table-column prop="BATCH_NO"
                         :label="$t('MesQualityInfo._27')"
                         align="center"
                         min-width="160"
                         :show-overflow-tooltip="true" />
        <el-table-column prop="PCB_SIDE"
                         :label="$t('MesQualityInfo._28')"
                         align="center"
                         min-width="100"
                         :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span style="color: black"
                  v-if="scope.row.PCB_SIDE == 0"></span>
            <span style="color: black"
                  v-else-if="scope.row.PCB_SIDE == 1">{{
              $t("MesQualityInfo._29")
            }}</span>
            <span style="color: black"
                  v-else-if="scope.row.PCB_SIDE == 2">{{
              $t("MesQualityInfo._30")
            }}</span>
            <span style="color: black"
                  v-else-if="scope.row.PCB_SIDE == 3">{{
              $t("MesQualityInfo._31")
            }}</span>
            <span v-else></span>
          </template>
        </el-table-column>
        <el-table-column prop="PART_NO"
                         :label="$t('MesQualityInfo._32')"
                         align="center"
                         min-width="130"
                         :show-overflow-tooltip="true" />
        <el-table-column prop="PART_NAME"
                         :label="$t('MesQualityInfo._33')"
                         align="center"
                         min-width="200"
                         :show-overflow-tooltip="true" />

        <el-table-column prop="PART_DESC"
                         :label="$t('MesQualityInfo._34')"
                         align="center"
                         min-width="160"
                         :show-overflow-tooltip="true" />
        <el-table-column prop="BATCH_QTY"
                         :label="$t('MesQualityInfo._35')"
                         align="center"
                         min-width="90"
                         :show-overflow-tooltip="true" />

        <el-table-column prop="WORK_CLASS"
                         :label="$t('MesQualityInfo._36')"
                         align="center"
                         min-width="100"
                         :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span v-if="scope.row.WORK_CLASS == 1"
                  style="color: black">{{
              $t("MesQualityInfo._37")
            }}</span>
            <span style="color: black"
                  v-else-if="scope.row.WORK_CLASS == 2">{{
              $t("MesQualityInfo._38")
            }}</span>
            <span v-else></span>
          </template>
        </el-table-column>
        <el-table-column prop="WORK_SHIFTS"
                         :label="$t('MesQualityInfo._39')"
                         align="center"
                         min-width="80"
                         :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span v-if="scope.row.WORK_SHIFTS == 1"
                  style="color: black">{{
              $t("MesQualityInfo._40")
            }}</span>
            <span style="color: black"
                  v-else-if="scope.row.WORK_SHIFTS == 2">{{
              $t("MesQualityInfo._41")
            }}</span>
            <span v-else></span>
          </template>
        </el-table-column>
        <el-table-column prop="RESULT_REMARK"
                         :label="$t('MesQualityInfo._42')"
                         align="center"
                         min-width="260"
                         :show-overflow-tooltip="true" />
        <el-table-column prop="CREATE_USER"
                         :label="$t('MesQualityInfo._43')"
                         align="center"
                         min-width="170"
                         :show-overflow-tooltip="true" />

        <el-table-column prop="CREATE_TIME"
                         :label="$t('MesQualityInfo._44')"
                         align="center"
                         min-width="170"
                         :show-overflow-tooltip="true" />
        <el-table-column prop="AUDIT_USER"
                         :label="$t('MesQualityInfo._45')"
                         align="center"
                         min-width="160"
                         :show-overflow-tooltip="true" />

        <el-table-column prop="AUDIT_TIME"
                         :label="$t('MesQualityInfo._46')"
                         align="center"
                         min-width="160"
                         :show-overflow-tooltip="true" />
        <el-table-column prop="UPDATE_USER"
                         :label="$t('MesQualityInfo._47')"
                         align="center"
                         min-width="160"
                         :show-overflow-tooltip="true" />
        <el-table-column prop="UPDATE_TIME"
                         :label="$t('MesQualityInfo._48')"
                         align="center"
                         min-width="160"
                         :show-overflow-tooltip="true" />
        <!--        <el-table-column prop="ORGANIZE_NAME"-->
        <!--                         :label="$t('MesQualityInfo._49')"-->
        <!--                         align="center"-->
        <!--                         min-width="160"-->
        <!--                         :show-overflow-tooltip="true" />-->

        <el-table-column prop="RESULT_STATUS"
                         :label="$t('MesQualityInfo._50')"
                         align="center"
                         fixed="right"
                         min-width="160"
                         :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span v-if="scope.row.RESULT_STATUS == 0"
                  style="color: orange">{{
              $t("MesQualityInfo._13")
            }}</span>
            <span v-if="scope.row.RESULT_STATUS == 1"
                  style="color: green">{{
              $t("MesQualityInfo._14")
            }}</span>
            <span v-if="scope.row.RESULT_STATUS == 2"
                  style="color: red">{{
              $t("MesQualityInfo._15")
            }}</span>
            <span v-else></span>
          </template>
        </el-table-column>
        <el-table-column prop="ENABLED"
                         :label="$t('MesQualityInfo._51')"
                         align="center"
                         fixed="right"
                         min-width="330">
          <template slot-scope="scope">
            <el-button v-if="$btnList.indexOf('MesQualityInfoEdit') !== -1"
                       type="primary"
                       size="small"
                       @click="edit_but(scope.row)">{{ $t("MesQualityInfo._52") }}</el-button>
            <el-button v-if="$btnList.indexOf('MesQualityInfoDelete') !== -1"
                       type="danger"
                       size="small"
                       @click="remove_but(scope.row)">{{ $t("MesQualityInfo._53") }}</el-button>
            <el-button v-if="$btnList.indexOf('MesQualityInfoAddOrDetail') !== -1"
                       type="success"
                       size="small"
                       @click="Spotcheck_but(scope.row)">{{ $t("MesQualityInfo._54") }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <el-pagination :current-page="listQuery.Page"
                   style="margin-top: 15px"
                   :page-sizes="[15, 25, 35, 45]"
                   :page-size="listQuery.Limit"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="totalPage"
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange" />
    <!-- 子表格 -->
    <el-tabs v-model="TorikoName"
             @tab-click="ChiltabsClick"
             class="MesQualityInfo-tabs">
      <el-tab-pane :label="$t('MesQualityInfo._107')"
                   class="chilDtable"
                   name="Examination">
        <el-table v-loading="childLoading"
                  :data="childTable"
                  width="100%"
                  height="100%"
                  highlight-current-row
                  border
                  :header-cell-style="{ background: '#eef1f6', color: '#606266' }">
          <el-table-column :label="$t('MesQualityInfo._21')"
                           class="hideradio"
                           align="center"
                           min-width="80"
                           fixed="left">
            <template slot-scope="scope">{{ scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column prop="CHECK_ITEM"
                           min-width="150"
                           :label="$t('MesQualityInfo._56')"
                           align="center"
                           :show-overflow-tooltip="true" />
          <el-table-column prop="CHECK_DESC"
                           min-width="150"
                           :label="$t('MesQualityInfo._57')"
                           align="center"
                           :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="QUANTIZE_TYPE"
                           min-width="150"
                           :label="$t('MesQualityInfo._58')"
                           align="center"
                           :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span v-if="scope.row.QUANTIZE_TYPE == '1'"
                    style="color: blue">{{
                $t("MesQualityInfo._59")
              }}</span>
              <span v-else
                    style="color: green">{{
                $t("MesQualityInfo._60")
              }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="ISEMPTY"
                           min-width="150"
                           :label="$t('MesQualityInfo._61')"
                           align="center"
                           :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span v-if="scope.row.ISEMPTY == 'Y'"
                    style="color: green">{{
                $t("MesQualityInfo._62")
              }}</span>
              <span v-else
                    style="color: blue">{{
                $t("MesQualityInfo._63")
              }}</span>
            </template>
          </el-table-column>

          <el-table-column prop="RESULT_VALUE"
                           min-width="150"
                           :label="$t('MesQualityInfo._64')"
                           align="center"
                           :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <div v-if="scope.row.QUANTIZE_TYPE == '1'">
                <span style="color: blue">{{
                  scope.row.RESULT_VALUE ? scope.row.RESULT_VALUE : ""
                }}</span>
              </div>
              <div v-else>
                <span style="color: green"
                      v-if="scope.row.RESULT_VALUE == 'Y'">{{ $t("MesQualityInfo._14") }}</span>
                <span style="color: red"
                      v-else>{{
                  $t("MesQualityInfo._15")
                }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="RESULT_TYPE"
                           min-width="150"
                           fixed="right"
                           :label="$t('MesQualityInfo._111')"
                           align="center"
                           :show-overflow-tooltip="true">

            <template slot-scope="scope">
              <span style="color: green"
                    v-if="scope.row.RESULT_TYPE == 'Y'">{{
                $t("MesQualityInfo._14")
              }}</span>
              <span style="color: red"
                    v-else>{{
                $t("MesQualityInfo._15")
              }}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane :label="$t('MesQualityInfo._108')"
                   class="chilDtable"
                   name="Materials">
        <!-- <div style="display: flex;height: 100%;"> -->
          <el-table :data="MaterialsTable"
                    width="100%"
                    height="100%"
                    highlight-current-row
                    border
                    :header-cell-style="{ background: '#eef1f6', color: '#606266' }">
            <el-table-column :label="$t('MesQualityInfo._21')"
                             class="hideradio"
                             align="center"
                             min-width="80"
                             fixed="left">
              <template slot-scope="scope">{{ scope.$index + 1 }}</template>
            </el-table-column>
            <el-table-column prop="POSITION"
                             min-width="200"
                             :label="$t('MesQualityInfo._110')"
                             align="center"
                             :show-overflow-tooltip="true" />
            <el-table-column :label="$t('MesQualityInfo._109')"
                             prop="PART_NO"
                             :show-overflow-tooltip="true"
                             align="center"
                             min-width="300">
            </el-table-column>
            <el-table-column prop="PART_NAME"
                             min-width="180"
                             :label="'物料名称'"
                             align="center"
                             :show-overflow-tooltip="true" />
            <el-table-column prop="PART_DESC"
                             min-width="200"
                             :label="'物料规格'"
                             align="center"
                             :show-overflow-tooltip="true" />
            <!-- <el-table-column prop="VENDOR_NAME"
                           min-width="200"
                           :label="'品牌供应商'"
                           align="center"
                           :show-overflow-tooltip="true" /> -->
            <el-table-column prop="TEST_VALUE"
                             min-width="150"
                             :label="'测试值'"
                             align="center"
                             :show-overflow-tooltip="true" />

            <el-table-column prop="BRAND_NAME"
                             min-width="200"
                             :label="$t('MesQualityInfo._119')"
                             align="center"
                             :show-overflow-tooltip="true" />
            <el-table-column prop="VENDOR_NAME"
                             min-width="200"
                             :label="$t('MesQualityInfo._120')"
                             align="center"
                             :show-overflow-tooltip="true" />
            <el-table-column prop="TENSION_VALUE"
                             min-width="150"
                             :label="'拉力值'"
                             align="center"
                             :show-overflow-tooltip="true" />
            <el-table-column prop="RESULT"
                             fixed="right"
                             min-width="200"
                             :label="$t('MesQualityInfo._111')"
                             align="center"
                             :show-overflow-tooltip="true">

              <template slot-scope="scope">
                <span style="color: green"
                      v-if="scope.row.RESULT == 'Y'">{{
                $t("MesQualityInfo._14")
              }}</span>
                <span style="color: red"
                      v-else>{{
                $t("MesQualityInfo._15")
              }}</span>
              </template>
            </el-table-column>
          </el-table>&nbsp;
          <!-- <el-table :data="MaterialsTable2"
                    width="100%"
                    height="100%"
                    highlight-current-row
                    border
                    :header-cell-style="{ background: '#eef1f6', color: '#606266' }">
            <el-table-column :label="$t('MesQualityInfo._21')"
                             class="hideradio"
                             align="center"
                             min-width="80"
                             fixed="left">
              <template slot-scope="scope">{{ scope.$index + 1 }}</template>
            </el-table-column>
            <el-table-column :label="$t('MesQualityInfo._109')"
                             prop="PART_NO"
                             :show-overflow-tooltip="true"
                             align="center"
                             min-width="300">
            </el-table-column>
            <el-table-column prop="PART_NAME"
                             min-width="180"
                             :label="'物料名称'"
                             align="center"
                             :show-overflow-tooltip="true" />
            <el-table-column prop="PART_DESC"
                             min-width="200"
                             :label="'物料规格'"
                             align="center"
                             :show-overflow-tooltip="true" />
            <el-table-column prop="TEST_VALUE"
                             min-width="150"
                             :label="'测试值'"
                             align="center"
                             :show-overflow-tooltip="true" />

            <el-table-column prop="BRAND_NAME"
                             min-width="200"
                             :label="$t('MesQualityInfo._119')"
                             align="center"
                             :show-overflow-tooltip="true" />
            <el-table-column prop="VENDOR_NAME"
                             min-width="200"
                             :label="$t('MesQualityInfo._120')"
                             align="center"
                             :show-overflow-tooltip="true" />
            <el-table-column prop="TENSION_VALUE"
                             min-width="150"
                             :label="'拉力值'"
                             align="center"
                             :show-overflow-tooltip="true" />
            <el-table-column prop="RESULT"
                             fixed="right"
                             min-width="200"
                             :label="$t('MesQualityInfo._111')"
                             align="center"
                             :show-overflow-tooltip="true">

              <template slot-scope="scope">
                <span style="color: green"
                      v-if="scope.row.RESULT == 'Y'">{{
                $t("MesQualityInfo._14")
              }}</span>
                <span style="color: red"
                      v-else>{{
                $t("MesQualityInfo._15")
              }}</span>
              </template>
            </el-table-column>
          </el-table> -->
        <!-- </div> -->
      </el-tab-pane>
    </el-tabs>
    <!-- 主表添加、编辑 -->
    <el-dialog v-dialogDrag
               width="50%"
               :title="addorediText"
               :visible.sync="innerVisible"
               append-to-body
               class="MesQualityInfo-dialog"
               :close-on-click-modal="false">
      <el-form ref="form"
               :show-message="false"
               :model="form"
               :rules="rules"
               label-position="top"
               class="MesQualityInfo-form">
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item :label="$t('MesQualityInfo._22')"
                          prop="CHECK_TYPE">
              <el-select v-model="form.CHECK_TYPE"
                         style="width: 100%"
                         :placeholder="$t('MesQualityInfo._74')">
                <el-option v-for="item in SfcsParameters"
                           :key="item.LOOKUP_CODE"
                           :label="item.MEANING"
                           :value="item.LOOKUP_CODE" />
              </el-select>
            </el-form-item>
            <el-form-item :label="'环保类型'"
                          prop="EP_STATUS">
              <el-select v-model="form.EP_STATUS"
                         clearable
                         filterable
                         style="width: 100%">
                <el-option v-for="(item, index) in FirstEPStatusList"
                           :key="index"
                           :label="item.CHINESE"
                           :value="item.LOOKUP_CODE" />
                <!-- <el-option :value="0"
                           :label="'ROHS'"></el-option>
                <el-option :value="1"
                           :label="'HF'"></el-option> -->
              </el-select>
            </el-form-item>
            <!--            <el-form-item :label="$t('MesQualityInfo._25')"-->
            <!--                          prop="DEPARTMENT">-->
            <!--              <el-select v-model="form.DEPARTMENT"-->
            <!--                         :placeholder="$t('MesQualityInfo._5')"-->
            <!--                         class="filter-item"-->
            <!--                         style="width:100%">-->
            <!--                <el-option v-for="item in SfcsDepartment"-->
            <!--                           :key="item.ID"-->
            <!--                           :label="item.CHINESE"-->
            <!--                           :value="item.ID" />-->
            <!--              </el-select>-->
            <!--            </el-form-item>-->
            <el-form-item :label="$t('MesQualityInfo._35')"
                          prop="BATCH_QTY">
              <el-input v-model="form.BATCH_QTY"
                        disabled
                        :placeholder="$t('MesQualityInfo._65')" />
            </el-form-item>
            <el-form-item :label="$t('MesQualityInfo._66')"
                          prop="PART_NAME">
              <el-input v-model="form.PART_NAME"
                        disabled
                        :placeholder="$t('MesQualityInfo._67')" />
            </el-form-item>
            <el-form-item :label="$t('MesQualityInfo._24')"
                          prop="PRODUCT_DATE">
              <el-date-picker v-model="form.PRODUCT_DATE"
                              style="width: 100%"
                              type="date"
                              disabled
                              value-format="yyyy-MM-dd"
                              :placeholder="$t('MesQualityInfo._68')"></el-date-picker>
            </el-form-item>
            <el-form-item :label="$t('MesQualityInfo._39')"
                          prop="WORK_SHIFTS">
              <el-select v-model="form.WORK_SHIFTS"
                         :placeholder="$t('MesQualityInfo._69')"
                         class="filter-item"
                         style="width: 100%">
                <el-option value="1"
                           :label="$t('MesQualityInfo._40')" />
                <el-option value="2"
                           :label="$t('MesQualityInfo._41')" />
              </el-select>
            </el-form-item>
            <!--            <el-form-item :label="$t('MesQualityInfo._70')"-->
            <!--                          prop="ORGANIZE_ID">-->
            <!--              <el-cascader v-model="form.ORGANIZE_ID"-->
            <!--                           :options="organizeList"-->
            <!--                           style="width: 100%"-->
            <!--                           :show-all-levels="false"-->
            <!--                           :placeholder="$t('MesQualityInfo._71')"-->
            <!--                           :props="casProps"-->
            <!--                           @change="handleChangeCascader"></el-cascader>-->
            <!--            </el-form-item>-->
            <el-form-item :label="'首件类型'"
                          prop="FIRST_ITEM_TYPE">
              <el-select v-model="form.FIRST_ITEM_TYPE"
                         clearable
                         filterable
                         style="width: 100%">
                <el-option v-for="(item, index) in FirstItemTypeList"
                           :key="index"
                           :label="item.CHINESE"
                           :value="item.LOOKUP_CODE" />
                <!-- <el-option :label="'每班首件'"
                           :value="0"></el-option>
                <el-option :label="'新机型试产'"
                           :value="1"></el-option>
                <el-option :label="'转线'"
                           :value="2"></el-option>
                <el-option :label="'物料变更'"
                           :value="3"></el-option>
                <el-option :label="'程序变更'"
                           :value="4"></el-option>
                <el-option :label="'设计变更'"
                           :value="5"></el-option>
                <el-option :label="'重大工艺变更'"
                           :value="6"></el-option>
                <el-option :label="'返工'"
                           :value="7"></el-option> -->
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('MesQualityInfo._93')"
                          prop="LINE_ID">
              <el-select v-model="form.LINE_ID"
                         :placeholder="$t('MesQualityInfo._94')"
                         class="filter-item"
                         style="width: 100%"
                         @change="getInfo">
                <el-option v-for="(item, index) in AllLinesModel"
                           :key="index"
                           :label="item.LINE_NAME"
                           :value="item.LINE_ID" />
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('MesQualityInfo._27')"
                          prop="BATCH_NO">
              <el-input v-model="form.BATCH_NO"
                        disabled
                        :placeholder="$t('MesQualityInfo._95')" />
            </el-form-item>
            <el-form-item :label="$t('MesQualityInfo._32')"
                          prop="PART_NO">
              <el-input v-model="form.PART_NO"
                        disabled
                        :placeholder="$t('MesQualityInfo._96')" />
            </el-form-item>
            <el-form-item :label="$t('MesQualityInfo._97')"
                          prop="PART_DESC">
              <el-input v-model="form.PART_DESC"
                        disabled
                        :placeholder="$t('MesQualityInfo._98')" />
            </el-form-item>
            <el-form-item :label="$t('MesQualityInfo._36')"
                          prop="WORK_CLASS">
              <el-select v-model="form.WORK_CLASS"
                         :placeholder="$t('MesQualityInfo._76')"
                         class="filter-item"
                         style="width: 100%">
                <el-option value="1"
                           :label="$t('MesQualityInfo._37')" />
                <el-option value="2"
                           :label="$t('MesQualityInfo._38')" />
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('MesQualityInfo._28')"
                          prop="PCB_SIDE">
              <el-select v-model="form.PCB_SIDE"
                         :placeholder="$t('MesQualityInfo._77')"
                         style="width: 100%">
                <el-option v-for="(item, index) in SmtLookupList"
                           :key="index"
                           :label="item.MEANING"
                           :value="item.LOOKUP_CODE" />
              </el-select>
              <!-- <el-input v-model="form.PCB_SIDE"
              :placeholder="$t('请选择板型')" />-->
            </el-form-item>
          </el-col>
        </el-row>
        <div class="MesQualityInfo-dialog-button">
          <el-button type="success"
                     @click="shout_but('form')">&nbsp;{{ $t("MesQualityInfo._72") }}&nbsp;</el-button>
          <el-button @click="reset_but">&nbsp;{{ $t("MesQualityInfo._73") }}&nbsp;</el-button>
        </div>
      </el-form>
    </el-dialog>
    <!-- 抽检记录-->
    <el-dialog width="75%"
               v-dialogDrag
               :title="$t('MesQualityInfo._92')"
               :visible.sync="checkVisible"
               top="5vh"
               append-to-body
               class="MesQualityInfo-dialog"
               :close-on-click-modal="false">
      <div style="width: 100%">
        <el-form label-position="top">
          <el-form-item :label="$t('MesQualityInfo._50')">
            <el-radio v-model="checkform.RESULT_STATUS"
                      :value="checkform.RESULT_STATUS"
                      :label="1">
              <span style="color: green">{{ $t("MesQualityInfo._14") }}</span>
            </el-radio>
            <el-radio v-model="checkform.RESULT_STATUS"
                      :value="checkform.RESULT_STATUS"
                      :label="2">
              <span style="color: red">{{ $t("MesQualityInfo._15") }}</span>
            </el-radio>
          </el-form-item>
          <el-form-item :label="$t('MesQualityInfo._42')">
            <el-input v-model="checkform.REMARK"
                      type="textarea"
                      :placeholder="$t('MesQualityInfo._103')" />
          </el-form-item>
        </el-form>
        <el-tabs v-model="activeName"
                 style="width: 100%">
          <el-tab-pane :label="$t('MesQualityInfo._107')"
                       name="first">
            <div class="check-table">
              <vxe-table ref="xTable"
                         :data="checktable"
                         height="365px"
                         align="center"
                         size="medium"
                         highlight-hover-row
                         highlight-current-row
                         show-overflow
                         keep-source
                         border
                         resizable
                         @edit-closed="editClick"
                         :edit-config="{
                  trigger: 'click',
                  mode: 'row',
                  showStatus: true,
                }"
                         :header-cell-style="{ background: '#eef1f6', color: '#606266' }">
                <vxe-table-column field="CHECK_ITEM"
                                  min-width="200"
                                  :title="$t('MesQualityInfo._56')"
                                  align="center" />
                <vxe-table-column field="QUANTIZE_TYPE"
                                  min-width="200"
                                  :title="$t('MesQualityInfo._58')"
                                  align="center">
                  <template slot-scope="scope">
                    <span v-if="scope.row.QUANTIZE_TYPE == '1'"
                          style="color: blue">{{ $t("MesQualityInfo._59") }}</span>
                    <span v-else
                          style="color: green">{{
                      $t("MesQualityInfo._60")
                    }}</span>
                  </template>
                </vxe-table-column>
                <vxe-table-column field="ISEMPTY"
                                  min-width="200"
                                  :title="$t('MesQualityInfo._61')"
                                  align="center">
                  <template slot-scope="scope">
                    <span v-if="scope.row.ISEMPTY == 'Y'"
                          style="color: green">{{ $t("MesQualityInfo._62") }}</span>
                    <span v-else
                          style="color: blue">{{
                      $t("MesQualityInfo._63")
                    }}</span>
                  </template>
                </vxe-table-column>

                <vxe-table-column field="RESULT_VALUE"
                                  min-width="200"
                                  align="center"
                                  :label="$t('MesQualityInfo._64')"
                                  :edit-render="{ autofocus: '.custom-input', type: 'visible' }">
                  <template v-slot:edit="{ row }">
                    <template v-if="row.QUANTIZE_TYPE == '1'">
                      <vxe-input v-model="row.RESULT_VALUE"
                                 :placeholder="$t('MesQualityInfo._78')" />
                    </template>
                    <div class="check-switch"
                         v-else>
                      <el-switch v-model="row.RESULT_VALUE"
                                 :active-text="$t('MesQualityInfo._14')"
                                 :inactive-text="$t('MesQualityInfo._15')"
                                 active-color="#13ce66"
                                 inactive-color="#cccccc"
                                 active-value="Y"
                                 inactive-value="N" />
                    </div>
                  </template>
                </vxe-table-column>
                <vxe-table-column min-width="200"
                                  field="RESULT_TYPE"
                                  align="center"
                                  :label="$t('MesQualityInfo._115')"
                                  :edit-render="{ autofocus: '.custom-input', type: 'visible' }">
                  <template v-slot:edit="{ row }">
                    <div class="check-switch">
                      <el-switch v-model="row.RESULT_TYPE"
                                 :active-text="$t('MesQualityInfo._14')"
                                 :inactive-text="$t('MesQualityInfo._15')"
                                 active-color="#13ce66"
                                 inactive-color="#cccccc"
                                 active-value="Y"
                                 inactive-value="N" />
                    </div>
                  </template>
                </vxe-table-column>
              </vxe-table>
            </div>
          </el-tab-pane>
          <el-tab-pane :label="$t('MesQualityInfo._108')"
                       name="second">
            <div class="check-table">
              <vxe-table ref="xTable2"
                         :data="MaterTable"
                         height="365px"
                         align="center"
                         size="medium"
                         highlight-hover-row
                         highlight-current-row
                         show-overflow
                         keep-source
                         border
                         resizable
                         :edit-config="{
                  trigger: 'click',
                  mode: 'row',
                  showStatus: true,
                }"
                         :header-cell-style="{ background: '#eef1f6', color: '#606266' }">
                <!-- COMPONENT_LOCATION（位号） PART_CODE(物料编号) PART_NAME(物料名称) -->
                <vxe-table-column field="COMPONENT_LOCATION"
                                  min-width="200"
                                  :title="$t('MesQualityInfo._112')"
                                  align="center" />
                <vxe-table-column field="PART_CODE"
                                  min-width="200"
                                  :title="$t('MesQualityInfo._109')"
                                  align="center" />
                <vxe-table-column field="PART_NAME"
                                  min-width="200"
                                  :title="$t('MesQualityInfo._114')"
                                  align="center" />

                <vxe-table-column field="PART_MODEL"
                                  min-width="200"
                                  :title="$t('MesQualityInfo._116')"
                                  align="center" />
                <vxe-table-column field="UNIT_QTY"
                                  min-width="105"
                                  :title="$t('MesQualityInfo._117')"
                                  align="center" />

                <vxe-table-column field="TEST_VALUE"
                                  min-width="130"
                                  :title="$t('测试值')"
                                  align="center"
                                  :edit-render="{ autofocus: '.custom-input', type: 'visible' }">
                  <template v-slot:edit="{ row }">
                    <vxe-input type="text"
                               v-model="row.TEST_VALUE"
                               placeholder=" " />
                  </template>
                </vxe-table-column>

                <vxe-table-column field="BRAND_NAME"
                                  min-width="130"
                                  :title="$t('MesQualityInfo._119')"
                                  align="center"
                                  :edit-render="{ autofocus: '.custom-input', type: 'visible' }">
                  <template v-slot:edit="{ row }">
                    <vxe-input type="text"
                               v-model="row.BRAND_NAME"
                               placeholder=" " />
                  </template>
                </vxe-table-column>
                <vxe-table-column field="VENDOR_NAME"
                                  min-width="130"
                                  :title="$t('MesQualityInfo._120')"
                                  align="center"
                                  :edit-render="{ autofocus: '.custom-input', type: 'visible' }">
                  <template v-slot:edit="{ row }">
                    <vxe-input type="text"
                               v-model="row.VENDOR_NAME"
                               placeholder=" " />
                  </template>
                </vxe-table-column>
                <vxe-table-column field="TENSION_VALUE"
                                  min-width="100"
                                  :title="$t('MesQualityInfo._118')"
                                  align="center"
                                  :edit-render="{ autofocus: '.custom-input', type: 'visible' }">
                  <template v-slot:edit="{ row }">
                    <vxe-input type="text"
                               v-model="row.TENSION_VALUE"
                               placeholder=" " />
                  </template>
                </vxe-table-column>
                <vxe-table-column min-width="200"
                                  field="RESULT"
                                  align="center"
                                  :label="$t('MesQualityInfo._115')"
                                  :edit-render="{ autofocus: '.custom-input', type: 'visible' }">
                  <template v-slot:edit="{ row }">
                    <div class="check-switch">
                      <el-switch v-model="row.RESULT"
                                 :active-text="$t('MesQualityInfo._14')"
                                 :inactive-text="$t('MesQualityInfo._15')"
                                 active-color="#13ce66"
                                 inactive-color="#cccccc"
                                 active-value="Y"
                                 inactive-value="N" />
                    </div>
                  </template>
                </vxe-table-column>
              </vxe-table>
            </div>
            <!-- <div class="check-table2"
                 style="margin-top: 15px;">
              <vxe-table ref="xTable3"
                         :data="AlternateItems"
                         height="200"
                         align="center"
                         size="medium"
                         highlight-hover-row
                         highlight-current-row
                         show-overflow
                         keep-source
                         border
                         resizable
                         :edit-config="{
                  trigger: 'click',
                  mode: 'row',
                  showStatus: true,
                }"
                         :header-cell-style="{ background: '#eef1f6', color: '#606266' }">
                <vxe-table-column field="PART_CODE"
                                  min-width="200"
                                  :title="$t('MesQualityInfo._109')"
                                  align="center" />
                <vxe-table-column field="PART_NAME"
                                  min-width="200"
                                  :title="$t('MesQualityInfo._114')"
                                  align="center" />

                <vxe-table-column field="PART_MODEL"
                                  min-width="200"
                                  :title="$t('MesQualityInfo._116')"
                                  align="center" />
                <vxe-table-column field="UNIT_QTY"
                                  min-width="105"
                                  :title="$t('MesQualityInfo._117')"
                                  align="center" />

                <vxe-table-column field="TEST_VALUE"
                                  min-width="130"
                                  :title="$t('测试值')"
                                  align="center"
                                  :edit-render="{ autofocus: '.custom-input', type: 'visible' }">
                  <template v-slot:edit="{ row }">
                    <vxe-input type="text"
                               v-model="row.TEST_VALUE"
                               placeholder=" " />
                  </template>
                </vxe-table-column>

                <vxe-table-column field="BRAND_NAME"
                                  min-width="130"
                                  :title="$t('MesQualityInfo._119')"
                                  align="center"
                                  :edit-render="{ autofocus: '.custom-input', type: 'visible' }">
                  <template v-slot:edit="{ row }">
                    <vxe-input type="text"
                               v-model="row.BRAND_NAME"
                               placeholder=" " />
                  </template>
                </vxe-table-column>
                <vxe-table-column field="VENDOR_NAME"
                                  min-width="130"
                                  :title="$t('MesQualityInfo._120')"
                                  align="center"
                                  :edit-render="{ autofocus: '.custom-input', type: 'visible' }">
                  <template v-slot:edit="{ row }">
                    <vxe-input type="text"
                               v-model="row.VENDOR_NAME"
                               placeholder=" " />
                  </template>
                </vxe-table-column>
                <vxe-table-column field="TENSION_VALUE"
                                  min-width="100"
                                  :title="$t('MesQualityInfo._118')"
                                  align="center"
                                  :edit-render="{ autofocus: '.custom-input', type: 'visible' }">
                  <template v-slot:edit="{ row }">
                    <vxe-input type="text"
                               v-model="row.TENSION_VALUE"
                               placeholder=" " />
                  </template>
                </vxe-table-column>
                <vxe-table-column min-width="200"
                                  field="RESULT"
                                  align="center"
                                  :label="$t('MesQualityInfo._115')"
                                  :edit-render="{ autofocus: '.custom-input', type: 'visible' }">
                  <template v-slot:edit="{ row }">
                    <div class="check-switch">
                      <el-switch v-model="row.RESULT"
                                 :active-text="$t('MesQualityInfo._14')"
                                 :inactive-text="$t('MesQualityInfo._15')"
                                 active-color="#13ce66"
                                 inactive-color="#cccccc"
                                 active-value="Y"
                                 inactive-value="N" />
                    </div>
                  </template>
                </vxe-table-column>
              </vxe-table>
            </div> -->
          </el-tab-pane>
        </el-tabs>
        <div class="MesQualityInfo-dialog-button">
          <el-button type="success"
                     @click="check_shout_but">&nbsp;{{ $t("msh._60") }}&nbsp;</el-button>
          <el-button @click="check_reset_but">&nbsp;{{ $t("msh._61") }}&nbsp;</el-button>
        </div>
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
                       @click="search_but">
              {{ $t("MesProductionPreMst._20") }}</el-button>
            <el-button style="float: right; padding: 3px 0; margin-right: 20px"
                       type="text"
                       @click="resetListQuery">
              {{ $t("MesProductionPreMst._21") }}</el-button>
          </div>

          <el-form class="custom-form"
                   ref="searchVal"
                   label-position="top"
                   label-width="80px"
                   :model="listQuery"
                   size="mini">
            <el-form-item :label="'检验类别'">
              <el-select v-model="listQuery.CHECK_TYPE"
                         style="width: 100%"
                         :placeholder="''">
                <el-option v-for="(item, index) in SfcsParameters"
                           :key="index"
                           :label="item.MEANING"
                           :value="item.LOOKUP_CODE" />
              </el-select>
            </el-form-item>
            <el-form-item :label="'线别'">
              <el-select v-model="listQuery.LINE_ID"
                         :placeholder="''"
                         class="filter-item"
                         style="width: 100%">
                <el-option v-for="(item, index) in AllLinesModel"
                           :key="index"
                           :label="item.LINE_NAME"
                           :value="item.LINE_ID" />
              </el-select>
            </el-form-item>
            <!-- <el-form-item>
              <el-select
                v-model="listQuery.DEPARTMENT"
                :placeholder="$t('MesQualityInfo._5')"
                class="filter-item"
                style="width: 100%"
              >
                <el-option
                  v-for="item in SfcsDepartment"
                  :key="item.ID"
                  :label="item.CHINESE"
                  :value="item.ID"
                /> </el-select
              >&nbsp;
            </el-form-item> -->
            <el-form-item :label="'首件类型'">
              <el-select v-model="listQuery.FIRST_ITEM_TYPE"
                         style="width: 100%"
                         clearable
                         filterable
                         placeholder="">
                <el-option :value="0"
                           :label="'每班首件'"></el-option>
                <el-option :value="1"
                           :label="'新机型试产'"></el-option>
                <el-option :value="2"
                           :label="'转线'"></el-option>
                <el-option :value="3"
                           :label="'物料变更'"></el-option>
                <el-option :value="4"
                           :label="'程序变更'"></el-option>
                <el-option :value="5"
                           :label="'设计变更'"></el-option>
                <el-option :value="6"
                           :label="'重大工艺变更'"></el-option>
                <el-option :value="7"
                           :label="'返工'"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="'环保类型'">
              <el-select v-model="listQuery.EP_STATUS"
                         style="width: 100%"
                         clearable
                         filterable
                         placeholder="">
                <el-option :value="0"
                           :label="'ROHS'"></el-option>
                <el-option :value="1"
                           :label="'HF'"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="'状态'">
              <el-select v-model="listQuery.STATUS"
                         :placeholder="''"
                         class="filter-item"
                         style="width: 100%">
                <el-option value="0"
                           :label="$t('MesQualityInfo._9')"></el-option>
                <el-option value="1"
                           :label="$t('MesQualityInfo._10')"></el-option>
              </el-select>&nbsp;
            </el-form-item>

            <el-form-item :label="'结果'">
              <el-select v-model="listQuery.RESULT_STATUS"
                         :placeholder="''"
                         class="filter-item"
                         style="width: 100%">
                <el-option value="0"
                           :label="$t('MesQualityInfo._13')"></el-option>
                <el-option value="1"
                           :label="$t('MesQualityInfo._14')"></el-option>
                <el-option value="2"
                           :label="$t('MesQualityInfo._15')"></el-option>
              </el-select>&nbsp;
            </el-form-item>
            <el-form-item :label="'生产日期'">
              <el-date-picker v-model="Day"
                              clearable
                              type="daterange"
                              style="width: 100%; margin-right: 10px"
                              :start-placeholder="$t('MesQualityInfo._16')"
                              :end-placeholder="$t('MesQualityInfo._17')"
                              align="right"
                              value-format="yyyy-MM-dd" />
            </el-form-item>
          </el-form>
        </el-card>
      </div>
    </el-drawer>
  </d2-container>
</template>
<script>
import {
  Index,
  LoadData,
  GetProductionInfo,
  AddOrModifyAsync,
  DeleteOneById,
  GetDetailItemData,
  AuditData,
  AddOrModifyDetailSave,
  AddOrModifyDetail,
  GetDetailBOMData,
  AddOrModifyBomDetail,
  AddOrModifyBomDetailSave
} from '@/api/MesQualityInfo'
import {
  // 直接抄
  LoadUserOrganize,
  LoadData as _LoadData
} from '@/api/SysOrganize'
import {
  cloneDeep
} from 'lodash' // 直接抄
import customContainerHeader from '@/components/custom-container-header'
import {
  mapGetters
} from 'vuex'
export default {
  name: 'MesQualityInfo',
  components: {
    customContainerHeader
  },
  data () {
    return {
      SfcsParameters: [],
      AllLinesModel: [],
      SfcsDepartment: [],
      SmtLookupList: [],
      FirstItemTypeList: [],
      FirstEPStatusList: [],
      Loading: false,
      childLoading: false,
      addorediText: '',
      listQuery: {
        Page: 1,
        Limit: 15,
        BATCH_NO: '', // 批号(工单号)
        CHECK_TYPE: '', // 全部检验类别
        LINE_ID: '', // 全部线别
        DEPARTMENT: '', // 全部部门
        STATUS: '', // 全部状态
        RESULT_STATUS: '', // 全部结果
        BEGIN_TIME: '',
        END_TIME: ''
      },
      Day: '',
      mainSTATUS: 0,
      totalPage: 0, // 总页
      radio: '',
      Categ: [],
      mainTable: [],
      childTable: [],
      // 主表编辑
      innerVisible: false,
      form: {
        ID: 0,
        CHECK_TYPE: '', // 检验类别
        LINE_ID: '', // 线体
        DEPARTMENT: 0, // 部门
        BATCH_NO: '', // 批号
        BATCH_QTY: 0, // 批量
        PART_NO: '', // 料号
        PART_NAME: '', // 品名
        PART_DESC: '', // 规格
        PRODUCT_DATE: '0001-1-1', // 生产日期
        WORK_CLASS: '', // 班别
        WORK_SHIFTS: '', // 班次
        PCB_SIDE: '', // 板型
        ORGANIZE_ID: 0,
        CREATE_USER: '',
        AUDIT_USER: '',
        UPDATE_USER: ''
      },
      rules: {
        CHECK_TYPE: [{
          required: true,
          message: this.$t('MesQualityInfo._74'),
          trigger: 'change'
        }],
        DEPARTMENT: [{
          required: true,
          message: this.$t('MesQualityInfo._5'),
          trigger: 'change'
        }],
        LINE_ID: [{
          required: true,
          message: this.$t('MesQualityInfo._75'),
          trigger: 'change'
        }],
        WORK_CLASS: [{
          required: true,
          message: this.$t('MesQualityInfo._76'),
          trigger: 'change'
        }],
        WORK_SHIFTS: [{
          required: true,
          message: this.$t('MesQualityInfo._69'),
          trigger: 'change'
        }],
        PCB_SIDE: [{
          required: true,
          message: this.$t('MesQualityInfo._67'),
          trigger: 'change'
        }],
        ORGANIZE_ID: [{
          required: true,
          message: this.$t('MesQualityInfo._71'),
          trigger: 'change'
        }]
      },
      // 抽检记录
      checkText: '',
      checkVisible: false,
      checkform: {
        // ID: 0,
        MST_ID: 0,
        RESULT_STATUS: 1,
        REMARK: '',
        ItemList: []
      },
      checktable: [],
      // 审核
      reviewForm: null,
      // 组织架构
      organizeList: [],
      planData: [],
      casProps: {
        label: 'ORGANIZE_NAME',
        value: 'ID',
        children: 'children',
        checkStrictly: true
      },
      drawer: false,
      TorikoName: 'Examination',
      MaterialsTable: [],
      MaterialsTable2: [],
      activeName: 'first',
      MaterTable: [],
      BomForm: {
        MST_ID: 0,
        RESULT_STATUS: 0,
        REMARK: '',
        ItemList: []
      },
      AlternateItems: []
    }
  },
  computed: {
    ...mapGetters(['userinfo', 'userId'])
  },
  created () {
    this.getInd()
    this.getList()
    // this.getOrganize()
  },
  methods: {
    editClick (e) {
      console.log(e)
    },
    handleChangeCascader (e) {
      // 直接抄
      if (e && e.length) {
        this.form.ORGANIZE_ID = e[e.length - 1]
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
      const _res = await _LoadData({
        Page: 1,
        Limit: 10000
      })
      let ORGANIZE = _res.Result || []
      this.planData = ORGANIZE
      this.organizeList = []
      manager.map((item) => {
        let tmp = []
        tmp = this.getTree(ORGANIZE, item.ORGANIZE_ID)
        this.organizeList.push(
          ...[tmp[tmp.length - 1]].filter((_i) => _i && _i)
        )
      })
    },
    // 递归
    getTree (data, pid = 0, level = 1) {
      // 直接抄
      let arr = []
      data.map((item) => {
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
    // 获取下拉列表
    async getInd () {
      const res = await Index()
      this.SfcsParameters = res.Result.SfcsParameters
      this.AllLinesModel = res.Result.AllLinesModel
      this.SfcsDepartment = res.Result.SfcsDepartment
      this.SmtLookupList = res.Result.SmtLookupList

      this.FirstItemTypeList = res.Result.FirstItemTypeList
      this.FirstEPStatusList = res.Result.FirstEPStatusList
      console.log(res, '获取下拉列表')
    },
    // 获取主表
    async getList () {
      this.Loading = true
      const res = await LoadData(this.listQuery)
      if (res.Result) {
        const data = res.Result
        console.log(data, '获取列表----------')
        this.mainTable = data
        this.totalPage = res.TotalCount
      }
      this.Loading = false
    },
    // 主表搜索
    search_but () {
      this.drawer = false
      if (this.Day[0]) {
        this.listQuery.BEGIN_TIME = this.Day[0]
        this.listQuery.END_TIME = this.Day[1]
      } else {
        this.listQuery.BEGIN_TIME = ''
        this.listQuery.END_TIME = ''
      }
      this.listQuery.Page = 1
      this.getList()
    },
    // 重置
    resetListQuery () {
      this.listQuery = {}
      this.listQuery.Limit = 15
      this.Day = ''
      this.listQuery.BEGIN_TIME = ''
      this.listQuery.END_TIME = ''
    },
    // 主表点击获取表格一行数据
    async openDetails (row, column, event) {
      this.mainSTATUS = row.STATUS
      this.reviewForm = row
      this.radio = this.mainTable.indexOf(row)
      if (this.TorikoName === 'Examination') {
        this.getDatail(row.ID)
      } else {
        this.GetDetailBOM(row.ID)
        this.GetDetailBOM2(row.ID)
      }
    },
    ChiltabsClick () {
      console.log(this.reviewForm, 'this.reviewForm')
      if (this.reviewForm === null) {
        return
      }
      if (this.TorikoName === 'Examination') {
        this.getDatail(this.reviewForm.ID)
      } else {
        this.GetDetailBOM(this.reviewForm.ID)
        this.GetDetailBOM2(this.reviewForm.ID)
      }
    },
    // 获取明细数据
    async getDatail (id) {
      const res = await GetDetailItemData(id)
      if (res.Result) {
        this.childTable = res.Result
      }
      console.log(this.childTable, '获取列表11111')
    },
    // 获取物料确认
    async GetDetailBOM (id) {
      const res = await GetDetailBOMData({ mst_id: id })
      if (res.Result) {
        console.log(res.Result, '获取物料确认')
        this.MaterialsTable = res.Result
      }
    },
    async GetDetailBOM2 (id) {
      const res = await GetDetailBOMData({ mst_id: id, type: 1 })
      if (res.Result) {
        console.log(res.Result, '获取物料确认')
        this.MaterialsTable2 = res.Result
      }
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
    // 获取当前生产信息
    async getInfo (row) {
      const res = await GetProductionInfo(row)
      if (res.Result) {
        this.form.BATCH_NO = res.Result.BATCH_NO // 批号
        this.form.PART_NO = res.Result.PART_NO // 料号
        this.form.BATCH_QTY = res.Result.BATCH_QTY // 批量
        this.form.PART_NAME = res.Result.PART_NAME // 品名
        this.form.PART_DESC = res.Result.PART_DESC // 规格
        this.form.PRODUCT_DATE = res.Result.PRODUCT_DATE // 生产日期
      } else {
        this.form.BATCH_NO = '' // 批号
        this.form.PART_NO = '' // 料号
        this.form.BATCH_QTY = 0 // 批量
        this.form.PART_NAME = '' // 品名
        this.form.PART_DESC = '' // 规格
        this.form.PRODUCT_DATE = '0001-1-1' // 生产日期
      }
    },
    // 主表编辑
    edit_but (row) {
      if (row.STATUS !== 0) {
        this.$message({
          showClose: true,
          type: 'warning',
          message: this.$t('MesQualityInfo._104')
        })
        return
      }
      let form = cloneDeep(row)
      let stop = this.organizeList.map((item) => item.ID)
      stop = stop.sort((current, next) => (current > next ? 1 : -1))
      stop = stop[0] || 0
      const O_ID = form.O_ID || form.ORGANIZE_ID
      if (!O_ID) {
        return false
      }
      form.ORGANIZE_ID = this.reverseGetTree(
        this.planData,
        O_ID && parseInt(O_ID),
        stop
      )
      this.form = form
      console.log('21', this.form)
      this.addorediText = this.$t('MesQualityInfo._52')
      this.innerVisible = true
      this.getInfo(this.form.LINE_ID)
    },
    // 递归
    reverseGetTree (data, id, stop) {
      let arr = []
      data.map((item) => {
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
    // 主表添加
    add_but () {
      this.Eliminate()
      this.addorediText = this.$t('MesQualityInfo._89')
      this.innerVisible = true
    },
    // 主表删除
    remove_but (row) {
      this.$confirm(
        this.$t('publics.tips.makeSureDelete'),
        this.$t('publics.tips.tips'), {
          type: 'warning'
        }
      )
        .then(() => {
          DeleteOneById(row.ID).then((res) => {
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
      if (this.reviewForm === null) {
        this.$message({
          showClose: true,
          type: 'warning',
          message: this.$t('MesQualityInfo._79')
        })
        return
      }
      if (this.mainSTATUS !== 0) {
        this.$message({
          showClose: true,
          type: 'warning',
          message: this.$t('MesQualityInfo._80')
        })
        return
      }
      this.$confirm(
        this.$t('MesQualityInfo._81') +
        this.GetResultStatusStr(this.reviewForm.RESULT_STATUS) +
        this.$t('MesQualityInfo._82') +
        this.reviewForm.BATCH_NO +
        this.$t('MesQualityInfo._83'),
        this.$t('MesQualityInfo._84'), {
          type: 'warning'
        }
      )
        .then(() => {
          this.reviewForm.AuditUser = this.userinfo.USER_NAME
          AuditData(this.reviewForm)
            .then((res) => {
              if (res.Result) {
                this.$notify({
                  title: this.$t('MesQualityInfo._85'),
                  message: this.$t('MesQualityInfo._86'),
                  type: 'success',
                  duration: 2000
                })
                this.getList()
              }
            })
            .catch((res) => {
              this.getList()
            })
        })
        .catch(() => { })
    },
    GetResultStatusStr (status) {
      switch (status) {
        case 0:
          return this.$t('MesQualityInfo._13')
        case 1:
          return this.$t('MesQualityInfo._14')
        case 2:
          return this.$t('MesQualityInfo._15')
        default:
          return ''
      }
    },
    // 主表确定
    shout_but (formName) {
      if (
        Object.prototype.toString.call(this.form.ORGANIZE_ID) ===
        '[object Array]'
      ) {
        this.form.ORGANIZE_ID = this.form.ORGANIZE_ID[this.form.ORGANIZE_ID.length - 1]
      }

      this.$refs.form.validate(async (valid, errInfo) => {
        if (valid) {
          this.form.CREATE_USER = this.userinfo.USER_NAME
          this.form.AUDIT_USER = this.userinfo.USER_NAME
          this.form.UPDATE_USER = this.userinfo.USER_NAME
          const res = await AddOrModifyAsync(this.form)
          if (res.Result) {
            this.innerVisible = false
            this.getList()
            this.$notify({
              title: this.$t('MesQualityInfo._85'),
              message: this.$t('MesQualityInfo._90'),
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
      this.form = {
        CHECK_TYPE: '', // 检验类别
        LINE_ID: '', // 线体
        DEPARTMENT: 0, // 部门
        BATCH_NO: '', // 批号
        BATCH_QTY: 0, // 批量
        PART_NO: '', // 料号
        PART_NAME: '', // 品名
        PART_DESC: '', // 规格
        PRODUCT_DATE: '0001-1-1', // 生产日期
        WORK_CLASS: '', // 班别
        WORK_SHIFTS: '', // 班次
        PCB_SIDE: '', // 板型
        ORGANIZE_ID: 0
      }
    },
    // 抽检记录
    async Spotcheck_but (row) {
      this.clear()
      console.log(this.$refs.xTable, 'this.$refs.xTable')
      if (row.STATUS !== 0) {
        this.$message({
          showClose: true,
          type: 'warning',
          message: this.$t('MesQualityInfo._87')
        })
        return
      }
      this.checkform.MST_ID = row.ID
      this.getAddOrModifyDetail(row.ID)
      this.getAddOrModifyBomDetail(row.ID)
      this.checkText = this.$t('MesQualityInfo._89')
      this.activeName = 'first'
      this.checkVisible = true
    },
    async getAddOrModifyDetail (id) {
      const res = await AddOrModifyDetail(id)
      if (res.Result) {
        this.checktable = res.Result.CheckItems
        this.checktable.map(v => {
          v.RESULT_TYPE = v.RESULT_TYPE || 'N'
        })
        this.checkform.REMARK = res.Result.RESULT_REMARK || ''
        this.checkform.RESULT_STATUS = res.Result.RESULT_STATUS || 1
      }
    },
    async getAddOrModifyBomDetail (id) {
      const res = await AddOrModifyBomDetail(id)
      if (res.Result) {
        var data = res.Result
        console.log(data, 'res.Resultres.Resultres.Result')
        this.MaterTable = data.CheckItems || []
        this.AlternateItems = data.AlternateItems || []
        this.BomForm.MST_ID = data.MST_ID
        this.BomForm.RESULT_STATUS = data.RESULT_STATUS
        this.BomForm.REMARK = data.RESULT_REMARK
      }
    },
    handleFormatterFirstItemType (row, column, cellValue, index) {
      if (!cellValue && cellValue !== 0 && cellValue !== '0') return ''
      const val = parseInt(cellValue)
      if (val === 0) {
        return '每班首件'
      } else if (val === 1) {
        return '新机型试产'
      } else if (val === 2) {
        return '转线'
      } else if (val === 3) {
        return '物料变更'
      } else if (val === 4) {
        return '程序变更'
      } else if (val === 5) {
        return '设计变更'
      } else if (val === 6) {
        return '重大工艺变更'
      } else if (val === 7) {
        return '返工'
      } else {
        return ''
      }
    },
    handleFormatterEpStatus (row, column, cellValue, index) {
      if (!cellValue && cellValue !== 0 && cellValue !== '0') return ''
      const val = parseInt(cellValue)
      if (val === 0) {
        return 'ROHS'
      } else if (val === 1) {
        return 'HF'
      } else {
        return ''
      }
    },
    // 抽检提交
    check_shout_but () {
      var cheDate = []
      cheDate = this.$refs.xTable.getTableData().tableData
      var isRES = false
      cheDate.some((v, i) => {
        if (
          (v.ISEMPTY !== 'Y' && v.RESULT_VALUE === null) ||
          (v.ISEMPTY !== 'Y' && v.RESULT_VALUE === undefined) ||
          (v.ISEMPTY !== 'Y' && v.RESULT_VALUE === '')
        ) {
          console.log(v, 'v.CHECK_ITEM')
          this.$message({
            showClose: true,
            type: 'warning',
            message: this.$t('MesQualityInfo._105') +
              v.CHECK_ITEM +
              this.$t('MesQualityInfo._106')
          })
          isRES = true
          return true
        } else {
          isRES = false
        }
      })
      if (isRES) {
        return
      }
      console.log(this.checkform, cheDate, '777')
      console.log(JSON.stringify(this.checkform), 'this.checkform')
      this.$refs.xTable.validate((valid) => {
        if (valid) {
          this.checkform.ItemList = cheDate
          console.log(this.checkform, 'this.checkformthis.checkform')
          AddOrModifyDetailSave(this.checkform)
            .then((res) => {
              if (res.Result) {
                this.BomDetailSave()
                this.checkVisible = false
                this.$notify({
                  title: this.$t('MesQualityInfo._85'),
                  message: this.$t('MesQualityInfo._90'),
                  type: 'success',
                  duration: 2000
                })
                this.getList()
                if (this.reviewForm.ID) {
                  if (this.TorikoName === 'Examination') {
                    this.getDatail(this.reviewForm.ID)
                  } else {
                    this.GetDetailBOM(this.reviewForm.ID)
                    // this.GetDetailBOM2(this.reviewForm.ID)
                  }
                  // this.getDatail(this.reviewForm.Batch)
                }
              }
            })
            .catch((res) => {
              this.checkVisible = false
              this.getList()
            })
        }
      })
    },
    async BomDetailSave () {
      var cheDate = this.$refs.xTable2.getTableData().tableData
      // var AltDate = this.$refs.xTable3.getTableData().tableData
      // if (cheDate.length === 0 && AltDate.length === 0) {
      //   return
      // }
      if (cheDate.length === 0) {
        return
      }
      this.BomForm.MST_ID = this.checkform.MST_ID
      this.BomForm.RESULT_STATUS = this.checkform.RESULT_STATUS
      this.BomForm.REMARK = this.checkform.REMARK
      cheDate.forEach((v) => {
        v.POSITION = v.COMPONENT_LOCATION
        v.PART_NO = v.PART_CODE
        v.HID = this.BomForm.MST_ID
      })
      // AltDate.forEach((v) => {
      //   // v.POSITION = v.COMPONENT_LOCATION
      //   v.PART_NO = v.PART_CODE
      //   v.HID = this.BomForm.MST_ID
      // })
      var concatData = cheDate // .concat(AltDate)
      this.BomForm.ItemList = concatData
      await AddOrModifyBomDetailSave(this.BomForm)
    },
    // 重置
    check_reset_but () { },
    // 主表清空
    Eliminate () {
      this.form = {
        ID: 0,
        CHECK_TYPE: '', // 检验类别
        LINE_ID: '', // 线体
        DEPARTMENT: 0, // 部门
        BATCH_NO: '', // 批号
        BATCH_QTY: 0, // 批量
        PART_NO: '', // 料号
        PART_NAME: '', // 品名
        PART_DESC: '', // 规格
        PRODUCT_DATE: '0001-1-1', // 生产日期
        WORK_CLASS: '', // 班别
        WORK_SHIFTS: '', // 班次
        PCB_SIDE: '', // 板型
        ORGANIZE_ID: 0,
        CREATE_USER: this.userinfo.USER_NAME,
        AUDIT_USER: this.userinfo.USER_NAME,
        UPDATE_USER: this.userinfo.USER_NAME
      }
    },
    clear () {
      this.checkform.REMARK = ''
    }
  }
}

</script>
<style lang="scss">
.MesQualityInfo .hideradio .el-radio__label {
  display: none;
}

.MesQualityInfo-dialog .el-dialog__body {
  padding: 10px 20px;
  padding-bottom: 15px;
}

.MesQualityInfo-dialog-title {
  background-color: #3e9ce2;
  width: 70px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  color: #fff;
  margin-bottom: 10px;
}

.MesQualityInfo-dialog-area label {
  display: flex;
  align-items: center;
  font-weight: 500;
  margin-bottom: 10px;
}

.MesQualityInfo-dialog-area label span {
  width: 115px;
}

.MesQualityInfo-dialog-button {
  margin-top: 10px;
  color: #fff;
  text-align: center;
}

/* 隐藏单选文字 */
.MesQualityInfo-table-dev .el-radio__label {
  display: none;
}

.bad-table .el-radio__label {
  display: none;
}

.MesQualityInfo-table-dev {
  height: calc(100vh - 465px);
}

.MesQualityInfo-tabs .el-tabs__header {
  margin: 0;
}

.chilDtable {
  height: calc(100vh - 590px);
}

.MesQualityInfo .header-container {
  padding-bottom: 10px;
}

.MesQualityInfo-dialog .MesQualityInfo-form .el-form-item__label {
  padding: 0;
}

.MesQualityInfo-dialog .check-table2 {
  // height: calc(100vh - 575px);
  // height: 365px;
}

.check-switch .el-switch__core {
  width: 70px !important;
}

.check-switch .el-switch__label * {
  font-size: 12px !important;
}

.vxe-table .vxe-table--empty-content {
  display: none !important;
}
</style>
