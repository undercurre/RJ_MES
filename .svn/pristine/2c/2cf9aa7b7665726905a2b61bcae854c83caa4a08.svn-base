<template>
  <d2-container>
    <template slot="header">
      <custom-container-header :isExportTpl="false"
                               :isExport="false"
                               :isImport="false">
        <el-button type="primary"
                   icon="el-icon-setting"
                   style="background: rgb(54, 126, 127); border: rgb(54, 126, 127)"
                   @click="handleChoseSite">{{ $t("SfcsCollectDefects._1") }}</el-button>
      </custom-container-header>
    </template>
    <div class="Process">
      {{ currentSite.SITE_NAME || $t("SfcsCollectDefects._2") }}
    </div>
    <div class="out-container">
      <el-row>
        <el-col :span="12">
          <div class="left-container">
            <div class="tips-txt">
              {{ $t("SfcsCollectDefects._3") }} = {{ refreshUnrepairedQty }}
            </div>
            <el-form ref="form"
                     label-position="left"
                     :model="form"
                     label-width="110px"
                     class="cmY-form">
              <el-form-item :label="$t('SfcsCollectDefects._4')">
                <div class="x-flex">
                  <div style="flex: 1; margin-right: 10px">
                    <el-input v-model="form.SN"
                              placeholder=" "
                              ref="sn"
                              :disabled="!currentSite.SITE_ID"
                              @keyup.native.enter="handleEnterSN">
                      <i slot="append"
                         class="el-icon-search"
                         @click="handleOpenLiuShui"
                         style="display: flex; align-items: center; height: 30px"></i>
                    </el-input>
                  </div>
                  <el-button type="primary"
                             icon="el-icon-refresh"
                             style="
                      background: rgb(54, 126, 127);
                      border: rgb(54, 126, 127);
                    "
                             @click="clearForm">{{ $t("SfcsCollectDefects._5") }}</el-button>
                </div>
              </el-form-item>
              <el-row>
                <el-col :span="12">
                  <div style="margin-right: 5px">
                    <el-form-item :label="$t('SfcsCollectDefects._6')">
                      <el-input v-model="form.DEFECTSITE"
                                placeholder=" "
                                disabled></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('SfcsCollectDefects._7')">
                      <el-input v-model="form.MODEL"
                                placeholder=" "
                                disabled></el-input>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div style="margin-left: 5px">
                    <el-form-item :label="$t('SfcsCollectDefects._8')">
                      <el-input v-model="form.PART_NO"
                                placeholder=" "
                                disabled></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('SfcsCollectDefects._9')">
                      <el-input v-model="form.WO_WO"
                                placeholder=" "
                                disabled></el-input>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
            </el-form>
            <el-form ref="form2"
                     label-position="top"
                     :model="form"
                     class="custom-form cmY-form no-margin">
              <el-row>
                <el-col :span="12">
                  <div style="margin-right: 5px">
                    <el-form-item :label="$t('SfcsCollectDefects._10')">
                      <div class="small-list">
                        <div class="small-item xhand"
                             :class="{
                            xActive:
                              v.DEFECT_DESCRIPTION ===
                              currentInfo.DEFECT_DESCRIPTION,
                          }"
                             v-for="(v, k) in form.DEFECT_CODE || []"
                             :key="k"
                             @click="handelChoseDefectCode(v)">
                          {{v.DEFECT_DESCRIPTION}}~{{ v.DEFECT_CODE }}
                        </div>
                      </div>
                    </el-form-item>
                    <el-form-item :label="$t('SfcsCollectDefects._11')">
                      <div class="small-list">
                        <div class="small-item"
                             :class="{
                            yellow: k % 2 === 0,
                            gray: k % 2 !== 0,
                          }"
                             v-for="(v, k) in form.REPAIRED_DEFECTS || []"
                             :key="k">
                          {{ v }}
                        </div>
                      </div>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div style="margin-left: 5px">
                    <el-form-item :label="$t('SfcsCollectDefects._12')">
                      <div class="small-list">
                        <div class="small-item">
                          {{ currentInfo.DEFECT_DETAIL }}
                        </div>
                      </div>
                    </el-form-item>
                    <el-form-item :label="$t('SfcsCollectDefects._13')">
                      <div class="small-list">
                        <div class="small-item"
                             :class="{
                            yellow: k % 2 === 0,
                            gray: k % 2 !== 0,
                          }"
                             v-for="(v, k) in form.REPAIRED_CODE || []"
                             :key="k">
                          {{ v }}
                        </div>
                      </div>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
            </el-form>
            <div class="charts">
              <div class="charts-txt">{{ $t("SfcsCollectDefects._14") }}</div>
              <div id="echarts"></div>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="right-container">
            <el-form ref="rightForm"
                     :model="submitForm"
                     label-width="110px"
                     label-position="left"
                     class="cmY-form">
              <el-form-item :label="$t('SfcsCollectDefects._15')">
                <el-input v-model="submitForm.REASON_CODE"
                          placeholder=" ">
                  <i slot="append"
                     class="el-icon-search"
                     style="display: flex; align-items: center; height: 30px"
                     @click="handleOpenReasonCode"></i>
                </el-input>
              </el-form-item>
              <el-form-item :label="$t('SfcsCollectDefects._16')">
                <el-input v-model="submitForm.RESPONSER"
                          placeholder=" ">
                  <i slot="append"
                     class="el-icon-search"
                     style="display: flex; align-items: center; height: 30px"
                     @click="handleOpenResponser"></i>
                </el-input>
              </el-form-item>
              <el-form-item :label="$t('SfcsCollectDefects._17')">
                <el-input v-model="submitForm.LOCATION"
                          placeholder=" "
                          clearable></el-input>
              </el-form-item>
              <el-form-item :label="$t('SfcsCollectDefects._18')">
                <el-input v-model="submitForm.BAD_PART_NO"
                          placeholder=" "
                          clearable></el-input>
              </el-form-item>
            </el-form>
            <el-form ref="rightForm2"
                     :model="submitForm"
                     label-position="top"
                     class="cmY-form no-margin custom-form">
              <el-form-item :label="$t('SfcsCollectDefects._19')">
                <el-input type="textarea"
                          placeholder=" "
                          v-model="submitForm.REMARK"
                          :rows="3"
                          resize="none"></el-input>
              </el-form-item>
              <el-form-item :label="'操作区'">
                <el-tabs type="border-card">
                  <el-tab-pane label="零件">
                    <vxe-table v-loading="loading"
                               ref="xTable3"
                               class="xtables"
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
                               :data="mainTable3">
                      <vxe-table-column show-overflow
                                        min-width="120"
                                        field="COMPONENT_NAME"
                                        :title="'零件名称'"
                                        :edit-render="{
                          name: '$input',
                          // options: ComponentNameBox,
                          props: { readonly: true },
                        }"
                                        align="center"></vxe-table-column>
                      <vxe-table-column field="CUSTOMER_COMPONENT_SN"
                                        min-width="210"
                                        :title="'客户序号'"
                                        show-overflow
                                        :edit-render="{
                          name: '$input',
                          props: { readonly: true },
                        }"
                                        align="center" />
                      <vxe-table-column field="ODM_COMPONENT_PN"
                                        :title="'本厂料号'"
                                        :edit-render="{
                          name: '$input',
                          props: { readonly: true },
                        }"
                                        min-width="200"
                                        align="center"
                                        show-overflow></vxe-table-column>
                      <vxe-table-column show-overflow
                                        field="COMPONENT_QTY"
                                        :title="'零件数量'"
                                        :edit-render="{
                          name: '$input',
                          props: { readonly: true },
                        }"
                                        min-width="210"
                                        align="center"></vxe-table-column>
                      <vxe-table-column width="180"
                                        align="center"
                                        field="SERIALIZED"
                                        :title="'是否唯一序列'">
                        <template v-slot="{ row }">
                          <el-switch v-model="row.SERIALIZED"
                                     disabled
                                     :active-text="$t('publics.btn.yes')"
                                     :inactive-text="$t('publics.btn.no')"
                                     active-color="#13ce66"
                                     inactive-color="#cccccc"
                                     active-value="Y"
                                     inactive-value="N" />
                        </template>
                      </vxe-table-column>
                      <vxe-table-column show-overflow
                                        field="OPERATION_SITE_NAME"
                                        :title="'收集站点'"
                                        :edit-render="{
                          name: '$input',
                          props: { readonly: true },
                        }"
                                        min-width="150"
                                        align="center"></vxe-table-column>
                      <vxe-table-column show-overflow
                                        field="COLLECT_TIME"
                                        :title="'收集时间'"
                                        :edit-render="{
                          name: '$input',
                          props: { readonly: true },
                        }"
                                        min-width="200"
                                        align="center" />
                      <vxe-table-column show-overflow
                                        field="COLLECT_BY"
                                        :title="'操作员'"
                                        :edit-render="{
                          name: '$input',
                          props: { readonly: true },
                        }"
                                        min-width="200"
                                        align="center" />
                      <vxe-table-column width="180"
                                        align="center"
                                        field="REWORK_REMOVE_FLAG"
                                        :title="'返工是否清除'">
                        <template v-slot="{ row }">
                          <el-switch v-model="row.REWORK_REMOVE_FLAG"
                                     disabled
                                     :active-text="$t('publics.btn.yes')"
                                     :inactive-text="$t('publics.btn.no')"
                                     active-color="#13ce66"
                                     inactive-color="#cccccc"
                                     active-value="Y"
                                     inactive-value="N" />
                        </template>
                      </vxe-table-column>
                      <vxe-table-column width="180"
                                        align="center"
                                        field="REPLACE_FLAG"
                                        :title="'是否发生替换'">
                        <template v-slot="{ row }">
                          <el-switch v-model="row.REPLACE_FLAG"
                                     disabled
                                     :active-text="$t('publics.btn.yes')"
                                     :inactive-text="$t('publics.btn.no')"
                                     active-color="#13ce66"
                                     inactive-color="#cccccc"
                                     active-value="Y"
                                     inactive-value="N" />
                        </template>
                      </vxe-table-column>
                      <vxe-table-column width="180"
                                        align="center"
                                        field="EDI_FLAG"
                                        :title="'是否EDI数据'">
                        <template v-slot="{ row }">
                          <el-switch v-model="row.EDI_FLAG"
                                     disabled
                                     :active-text="$t('publics.btn.yes')"
                                     :inactive-text="$t('publics.btn.no')"
                                     active-color="#13ce66"
                                     inactive-color="#cccccc"
                                     active-value="Y"
                                     inactive-value="N" />
                        </template>
                      </vxe-table-column>
                      <!-- <vxe-table-column
                        width="160"
                        field="ENABLED"
                        align="center"
                        :title="'是否激活'"
                      >
                        <template v-slot="{ row }">
                          <el-switch
                            v-model="row.ENABLED"
                            disabled
                            :active-text="$t('publics.btn.yes')"
                            :inactive-text="$t('publics.btn.no')"
                            active-color="#13ce66"
                            inactive-color="#cccccc"
                            active-value="Y"
                            inactive-value="N"
                          />
                        </template>
                      </vxe-table-column> -->
                      <vxe-table-column width="100"
                                        align="center"
                                        fixed="right"
                                        :title="'操作'">
                        <template v-slot="{ row }">
                          <el-button type="warning"
                                     @click="handleReplace(row, 3)">替换</el-button>
                        </template>
                      </vxe-table-column>
                    </vxe-table>
                  </el-tab-pane>
                  <el-tab-pane label="UID">
                    <vxe-table v-loading="loading"
                               ref="xTable2"
                               class="xtables"
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
                               :data="mainTable2">
                      <!-- <vxe-table-column
                        show-overflow
                        field="UID_ID"
                        :title="$t('ProductSetting._35')"
                        :edit-render="{
                          name: '$select',
                          options: UIDCategoryBox,
                          props: {
                            disabled: true,
                          },
                        }"
                        min-width="120"
                        align="center"
                      /> -->
                      <vxe-table-column show-overflow
                                        field="WO_NO"
                                        :title="'工单'"
                                        :edit-render="{
                          name: '$input',
                          // options: UIDCategoryBox,
                          props: {
                            readonly: true,
                          },
                        }"
                                        min-width="210"
                                        align="center" />
                      <vxe-table-column show-overflow
                                        field="UID_NAME"
                                        :title="'类型'"
                                        min-width="170"
                                        :edit-render="{
                          name: '$input',
                          props: { readonly: true },
                        }"
                                        align="center" />
                      <vxe-table-column show-overflow
                                        field="UID_NUMBER"
                                        :title="'数据'"
                                        :edit-render="{
                          name: '$input',
                          props: { readonly: true },
                        }"
                                        min-width="200"
                                        align="center" />
                      <vxe-table-column show-overflow
                                        field="PLANT"
                                        :title="'厂部'"
                                        :edit-render="{
                          name: '$input',
                          // options: BREAKLIST,
                          props: {
                            readonly: true,
                          },
                        }"
                                        min-width="200"
                                        align="center" />
                      <vxe-table-column show-overflow
                                        field="OPERATION_SITE_NAME"
                                        :title="'采集站点'"
                                        :edit-render="{
                          name: '$input',
                          props: {
                            readonly: true,
                          },
                        }"
                                        min-width="200"
                                        align="center" />
                      <vxe-table-column show-overflow
                                        field="COLLECT_TIME"
                                        :title="'作业时间'"
                                        :edit-render="{
                          name: '$input',
                          props: {
                            readonly: true,
                          },
                        }"
                                        min-width="200"
                                        align="center" />
                      <vxe-table-column show-overflow
                                        field="UID_QTY"
                                        :title="'数量'"
                                        :edit-render="{
                          name: '$input',
                          props: {
                            readonly: true,
                          },
                        }"
                                        min-width="100"
                                        align="center" />
                      <vxe-table-column show-overflow
                                        field="ORDER_NO"
                                        :title="'作业顺序'"
                                        :edit-render="{
                          name: '$input',
                          props: {
                            readonly: true,
                          },
                        }"
                                        min-width="200"
                                        align="center" />
                      <vxe-table-column width="180"
                                        field="SERIALIZED"
                                        align="center"
                                        :title="'是否序列'">
                        <template v-slot="{ row }">
                          <el-switch v-model="row.SERIALIZED"
                                     disabled
                                     :active-text="$t('publics.btn.yes')"
                                     :inactive-text="$t('publics.btn.no')"
                                     active-color="#13ce66"
                                     inactive-color="#cccccc"
                                     active-value="Y"
                                     inactive-value="N" />
                        </template>
                      </vxe-table-column>
                      <vxe-table-column width="170"
                                        field="REWORK_REMOVE_FLAG"
                                        align="center"
                                        :title="'返工是否自动清除'">
                        <template v-slot="{ row }">
                          <el-switch v-model="row.REWORK_REMOVE_FLAG"
                                     disabled
                                     :active-text="$t('publics.btn.yes')"
                                     :inactive-text="$t('publics.btn.no')"
                                     active-color="#13ce66"
                                     inactive-color="#cccccc"
                                     active-value="Y"
                                     inactive-value="N" />
                        </template>
                      </vxe-table-column>
                      <vxe-table-column width="170"
                                        field="REPLACE_FLAG"
                                        align="center"
                                        :title="'替换标识'">
                        <template v-slot="{ row }">
                          <el-switch v-model="row.REPLACE_FLAG"
                                     disabled
                                     :active-text="$t('publics.btn.yes')"
                                     :inactive-text="$t('publics.btn.no')"
                                     active-color="#13ce66"
                                     inactive-color="#cccccc"
                                     active-value="Y"
                                     inactive-value="N" />
                        </template>
                      </vxe-table-column>
                      <vxe-table-column show-overflow
                                        field="COLLECT_BY"
                                        :title="'作业员'"
                                        :edit-render="{
                          name: '$input',
                          props: {
                            readonly: true,
                          },
                        }"
                                        min-width="150"
                                        align="center" />
                      <vxe-table-column :title="'操作'"
                                        align="center"
                                        fixed="right"
                                        width="100">
                        <template v-slot="{ row }">
                          <el-button type="warning"
                                     @click="handleReplace(row, 2)">操作</el-button>
                        </template>
                      </vxe-table-column>
                    </vxe-table>
                  </el-tab-pane>
                  <el-tab-pane label="资源">
                    <vxe-table v-loading="loading"
                               ref="xTable1"
                               class="xtables"
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
                               :data="mainTable1">
                      <!-- <vxe-table-column show-overflow
                                  field="RESOURCE_ID"
                                  :title="$t('ProductSetting._31')"
                                  :edit-render="{name:'$select', options: SourceListBox, props: {disabled: true}}"
                                  min-width="170"
                                  align="center" /> -->
                      <vxe-table-column show-overflow
                                        field="WO_NO"
                                        :title="'工单'"
                                        :edit-render="{name: '$input', props: {readonly: true}}"
                                        min-width="180"
                                        align="center" />
                      <vxe-table-column show-overflow
                                        field="OPERATION_NAME"
                                        :title="'工位'"
                                        :edit-render="{name: '$input', props: {readonly: true}}"
                                        min-width="170"
                                        align="center" />
                      <vxe-table-column show-overflow
                                        field="RESOURCE_NAME"
                                        :title="'资源名称'"
                                        :edit-render="{name: '$input', props: {
                                    readonly: true
                                  }}"
                                        min-width="200"
                                        align="center" />
                      <vxe-table-column show-overflow
                                        field="RESOURCE_NO"
                                        :title="'资源数据'"
                                        :edit-render="{name: '$input', props: {readonly: true}}"
                                        min-width="210"
                                        align="center" />
                      <vxe-table-column show-overflow
                                        field="RESOURCE_QTY"
                                        :title="'数量'"
                                        :edit-render="{name: '$input', props: {readonly: true}}"
                                        min-width="100"
                                        align="center" />
                      <vxe-table-column show-overflow
                                        field="COLLECT_TIME"
                                        :title="'作业时间'"
                                        :edit-render="{name: '$input', props: {readonly: true}}"
                                        min-width="200"
                                        align="center" />
                      <vxe-table-column show-overflow
                                        field="OPERATION_SITE_NAME"
                                        :title="'采集站点'"
                                        :edit-render="{name: '$input', props: {readonly: true}}"
                                        min-width="200"
                                        align="center" />
                      <vxe-table-column show-overflow
                                        field="COLLECT_BY"
                                        :title="'作业员'"
                                        :edit-render="{name: '$input', props: {readonly: true}}"
                                        min-width="150"
                                        align="center" />
                      <vxe-table-column width="170"
                                        field="REWORK_REMOVE_FLAG"
                                        align="center"
                                        :title="'返工是否自动清除'">
                        <template v-slot="{ row}">
                          <el-switch v-model="row.REWORK_REMOVE_FLAG"
                                     disabled
                                     :active-text="$t('publics.btn.yes')"
                                     :inactive-text="$t('publics.btn.no')"
                                     active-color="#13ce66"
                                     inactive-color="#cccccc"
                                     active-value="Y"
                                     inactive-value="N" />
                        </template>
                      </vxe-table-column>
                      <vxe-table-column width="170"
                                        field="REPLACE_FLAG"
                                        align="center"
                                        :title="'是否替换'">
                        <template v-slot="{ row}">
                          <el-switch v-model="row.REPLACE_FLAG"
                                     disabled
                                     :active-text="$t('publics.btn.yes')"
                                     :inactive-text="$t('publics.btn.no')"
                                     active-color="#13ce66"
                                     inactive-color="#cccccc"
                                     active-value="Y"
                                     inactive-value="N" />
                        </template>
                      </vxe-table-column>

                      <vxe-table-column width="100"
                                        align="center"
                                        fixed="right"
                                        :title="'操作'">
                        <template v-slot="{ row }">
                          <el-button type="warning"
                                     @click="handleReplace(row, 1)">替换</el-button>
                        </template>
                      </vxe-table-column>
                    </vxe-table>
                  </el-tab-pane>
                </el-tabs>
              </el-form-item>
            </el-form>
          </div>
          <el-button icon="el-icon-success"
                     type="success"
                     style="
              margin-left: 5px;
              width: calc(100% - 5px);
              margin-top: 10px;
              background: rgb(54, 126, 127);
              border: rgb(54, 126, 127);
            "
                     size="medium"
                     @click="handleSubmitRepairData">{{ $t("SfcsCollectDefects._20") }}</el-button>
          <el-button icon="el-icon-error"
                     type="danger"
                     style="margin-left: 5px; width: calc(100% - 5px); margin-top: 10px"
                     size="medium"
                     @click="handleScrap">报废</el-button>
        </el-col>
      </el-row>
    </div>
    <!-- 选择站点 -->
    <el-dialog :title="$t('SfcsCollectDefects._21')"
               :visible.sync="dialogVisible"
               width="50%"
               :close-on-click-modal="false"
               class="ccb-dia">
      <div>
        <el-row>
          <el-col :span="18">
            <el-form ref="siteForm"
                     :model="siteForm"
                     label-width="110px"
                     label-position="left"
                     class="cmY-form">
              <el-form-item :label="$t('SfcsCollectDefects._22')">
                <el-select style="width: 100%"
                           placeholder=" "
                           clearable
                           filterable
                           v-model="siteForm.LINE_ID">
                  <el-option v-for="item in lineNameList"
                             :key="item.ID"
                             :label="item.LINE_NAME"
                             :value="item.ID"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item :label="$t('SfcsCollectDefects._23')">
                <el-input v-model="siteForm.Key"
                          placeholder=" "
                          clearable></el-input>
              </el-form-item>
              <el-form-item :label="$t('SfcsCollectDefects._24')">
                <el-select style="width: 100%"
                           placeholder=" "
                           clearable
                           filterable
                           v-model="siteForm.OPER_ID">
                  <el-option v-for="item in operNameList"
                             :key="item.ID"
                             :label="item.OPERATION_NAME"
                             :value="item.ID"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="6">
            <div class="l-flex">
              <el-button icon="el-icon-search"
                         type="primary"
                         style="
                  background: rgb(54, 126, 127);
                  border: rgb(54, 126, 127);
                  width: 100%;
                "
                         @click="searchSite">{{ $t("SfcsCollectDefects._25") }}</el-button>
              <el-button icon="el-icon-refresh"
                         style="margin-left: 0; margin-top: 10px; width: 100%"
                         @click="clearSiteForm">{{ $t("SfcsCollectDefects._26") }}</el-button>
            </div>
          </el-col>
        </el-row>
        <div class="tips-txt-x">{{ $t("SfcsCollectDefects._27") }}</div>
        <div style="height: 350px">
          <vxe-table ref="refTable"
                     border
                     stripe
                     keep-source
                     highlight-hover-row
                     highlight-current-row
                     show-overflow
                     auto-resize
                     width="100%"
                     height="100%"
                     @cell-click="cellClickSite"
                     :radio-config="{ labelField: 'name', trigger: 'row' }"
                     :data="siteList"
                     :edit-config="{ trigger: 'click', mode: 'row', showStatus: true }">
            <vxe-table-column show-overflow
                              :title="$t('SOPRoutes._64')"
                              type="radio"
                              min-width="60"
                              align="center" />
            <vxe-table-column show-overflow
                              field="SITE_NAME"
                              :title="$t('SfcsCollectDefects._28')"
                              :edit-render="{ name: '$input', props: { readonly: true } }"
                              :min-width="200"
                              align="center" />
            <vxe-table-column show-overflow
                              field="LINE_NAME"
                              :title="$t('SfcsCollectDefects._29')"
                              :edit-render="{ name: '$input', props: { readonly: true } }"
                              :min-width="150"
                              align="center" />
            <vxe-table-column show-overflow
                              field="OPER_NAME"
                              :title="$t('SfcsCollectDefects._30')"
                              :edit-render="{ name: '$input', props: { readonly: true } }"
                              :min-width="150"
                              align="center" />
            <vxe-table-column show-overflow
                              field="DESCRIPTION"
                              :title="$t('SfcsCollectDefects._31')"
                              :edit-render="{ name: '$input', props: { readonly: true } }"
                              :min-width="200"
                              align="center" />
          </vxe-table>
        </div>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false"
                   style="width: 120px">{{
          $t("SfcsCollectDefects.cancel")
        }}</el-button>
        <el-button type="primary"
                   style="
            background: rgb(54, 126, 127);
            border: rgb(54, 126, 127);
            width: 120px;
          "
                   @click="handleMakeSureSite">{{ $t("SfcsCollectDefects.makeSure") }}</el-button>
      </span>
    </el-dialog>
    <!-- 未维修的流水号 -->
    <el-dialog :title="$t('SfcsCollectDefects._32')"
               :visible.sync="dialogVisible2"
               width="50%"
               :close-on-click-modal="false"
               class="ccb-dia">
      <div>
        <el-form ref="SnForm"
                 label-width="80px"
                 label-position="left"
                 class="cmY-form">
          <el-form-item :label="$t('SfcsCollectDefects._33')">
            <div class="x-flex">
              <el-input v-model="SnListQuery.Key"
                        placeholder=" "
                        @input="SerialSearch"
                        suffix-icon="el-icon-search"></el-input>
              <el-button @click="SerialSearch"
                         type="primary"
                         style="
                  background: rgb(54, 126, 127);
                  border: rgb(54, 126, 127);
                  width: 120px;
                ">{{ $t("SfcsCollectDefects._34") }}</el-button>
            </div>
          </el-form-item>
        </el-form>
        <div style="height: 350px; padding-top: 5px">
          <vxe-table ref="refTable2"
                     border
                     stripe
                     keep-source
                     highlight-hover-row
                     highlight-current-row
                     show-overflow
                     auto-resize
                     width="100%"
                     height="100%"
                     @cell-click="cellClickSN"
                     :radio-config="{ labelField: 'name', trigger: 'row' }"
                     :data="SnList"
                     :edit-config="{ trigger: 'click', mode: 'row', showStatus: true }">
            <vxe-table-column show-overflow
                              :title="$t('SOPRoutes._64')"
                              type="radio"
                              width="80"
                              align="center" />
            <vxe-table-column show-overflow
                              field="SN"
                              title="SN"
                              :edit-render="{ name: '$input', props: { readonly: true } }"
                              :min-width="250"
                              align="center" />
          </vxe-table>
        </div>
        <div style="margin-top: 15px">
          <el-pagination :pager-count="5"
                         :current-page="SnListQuery.Page"
                         :page-size="SnListQuery.Limit"
                         :page-sizes="[10, 20, 30, 40]"
                         layout="total, sizes, prev, pager, next, jumper"
                         :total="SnTotalCount"
                         @size-change="handleSizeChangeSN"
                         @current-change="handleCurrentChangeSN" />
        </div>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible2 = false"
                   style="width: 120px">{{
          $t("SfcsCollectDefects.cancel")
        }}</el-button>
        <el-button type="primary"
                   style="
            background: rgb(54, 126, 127);
            border: rgb(54, 126, 127);
            width: 120px;
          "
                   @click="handleMakeSureSn">{{ $t("SfcsCollectDefects.makeSure") }}</el-button>
      </span>
    </el-dialog>
    <!-- 原因代码 -->
    <el-dialog :title="$t('SfcsCollectDefects._35')"
               :visible.sync="dialogVisible3"
               width="50%"
               :close-on-click-modal="false"
               class="ccb-dia">
      <div>
        <el-form ref="SnForm"
                 label-width="80px"
                 label-position="left"
                 class="cmY-form">
          <el-form-item :label="$t('SfcsCollectDefects._36')">
            <div class="x-flex">
              <el-input v-model="REASON_CODE_LIST_QUERY.Key"
                        clearable
                        placeholder=" "
                        suffix-icon="el-icon-search"></el-input>
              <el-button type="primary"
                         style="
                  background: rgb(54, 126, 127);
                  border: rgb(54, 126, 127);
                  width: 120px;
                "
                         @click="handleSearchReasonCodeList">{{ $t("SfcsCollectDefects._37") }}</el-button>
            </div>
          </el-form-item>
        </el-form>
        <div style="height: 350px; padding-top: 5px">
          <vxe-table ref="refTable2"
                     border
                     stripe
                     keep-source
                     highlight-hover-row
                     highlight-current-row
                     show-overflow
                     auto-resize
                     width="100%"
                     height="100%"
                     @cell-click="cellClickReasonCode"
                     :radio-config="{ labelField: 'name', trigger: 'row' }"
                     :data="REASON_CODE_LIST"
                     :edit-config="{ trigger: 'click', mode: 'row', showStatus: true }">
            <vxe-table-column show-overflow
                              :title="$t('SOPRoutes._64')"
                              type="radio"
                              width="80"
                              align="center" />
            <vxe-table-column show-overflow
                              field="REASON_CODE"
                              :title="$t('SfcsCollectDefects._38')"
                              :edit-render="{ name: '$input', props: { readonly: true } }"
                              :min-width="250"
                              align="center" />
            <vxe-table-column show-overflow
                              field="CHINESE_DESCRIPTION"
                              :title="$t('SfcsCollectDefects._39')"
                              :edit-render="{ name: '$input', props: { readonly: true } }"
                              :min-width="250"
                              align="center" />
          </vxe-table>
        </div>
        <div style="margin-top: 15px">
          <el-pagination :pager-count="5"
                         :current-page="REASON_CODE_LIST_QUERY.Page"
                         :page-size="REASON_CODE_LIST_QUERY.Limit"
                         :page-sizes="[10, 20, 30, 40]"
                         layout="total, sizes, prev, pager, next, jumper"
                         :total="REASON_CODE_TOTAL_COUNT"
                         @size-change="handleSizeChangeReasonCode"
                         @current-change="handleCurrentChangeReasonCode" />
        </div>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible3 = false"
                   style="width: 120px">{{
          $t("SfcsCollectDefects.cancel")
        }}</el-button>
        <el-button type="primary"
                   style="
            background: rgb(54, 126, 127);
            border: rgb(54, 126, 127);
            width: 120px;
          "
                   @click="handleMakeSureReasonCode">{{ $t("SfcsCollectDefects.makeSure") }}</el-button>
      </span>
    </el-dialog>
    <!-- 排除故障 -->
    <el-dialog :title="$t('SfcsCollectDefects._40')"
               :visible.sync="dialogVisible4"
               width="50%"
               :close-on-click-modal="false"
               class="ccb-dia">
      <div>
        <el-form ref="SnForm"
                 label-width="80px"
                 label-position="left"
                 class="cmY-form">
          <el-form-item :label="$t('SfcsCollectDefects._41')">
            <div class="x-flex">
              <el-input v-model="RESPONSER_LIST_QUERY.Key"
                        placeholder=" "
                        suffix-icon="el-icon-search"></el-input>
              <el-button type="primary"
                         style="
                  background: rgb(54, 126, 127);
                  border: rgb(54, 126, 127);
                  width: 120px;
                "
                         @click="handleSearchResponser">{{ $t("SfcsCollectDefects._42") }}</el-button>
            </div>
          </el-form-item>
        </el-form>
        <div style="height: 350px; padding-top: 5px">
          <vxe-table ref="refTable2"
                     border
                     stripe
                     keep-source
                     highlight-hover-row
                     highlight-current-row
                     show-overflow
                     auto-resize
                     width="100%"
                     height="100%"
                     @cell-click="cellClickResponser"
                     :radio-config="{ labelField: 'name', trigger: 'row' }"
                     :data="RESPONSER_LIST"
                     :edit-config="{ trigger: 'click', mode: 'row', showStatus: true }">
            <vxe-table-column show-overflow
                              :title="$t('SOPRoutes._64')"
                              type="radio"
                              width="80"
                              align="center" />
            <vxe-table-column show-overflow
                              field="CODE"
                              :title="$t('SfcsCollectDefects._43')"
                              :edit-render="{ name: '$input', props: { readonly: true } }"
                              :min-width="250"
                              align="center" />
            <vxe-table-column show-overflow
                              :field="$i18n.locale === 'zh-chs' ? 'CHINESE' : 'DESCRIPTION'"
                              :title="$t('SfcsCollectDefects._44')"
                              :edit-render="{ name: '$input', props: { readonly: true } }"
                              :min-width="250"
                              align="center" />
          </vxe-table>
        </div>
        <div style="margin-top: 15px">
          <el-pagination :pager-count="5"
                         :current-page="RESPONSER_LIST_QUERY.Page"
                         :page-size="RESPONSER_LIST_QUERY.Limit"
                         :page-sizes="[10, 20, 30, 40]"
                         layout="total, sizes, prev, pager, next, jumper"
                         :total="RESPONSER_TOTAL_COUNT"
                         @size-change="handleSizeChangeResponser"
                         @current-change="handleCurrentChangeResponser" />
        </div>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible4 = false"
                   style="width: 120px">{{
          $t("SfcsCollectDefects.cancel")
        }}</el-button>
        <el-button type="primary"
                   style="
            background: rgb(54, 126, 127);
            border: rgb(54, 126, 127);
            width: 120px;
          "
                   @click="handleMakeSureResponser">{{ $t("SfcsCollectDefects.makeSure") }}</el-button>
      </span>
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
                 :model="replaceForm"
                 :rules="replacFormRules"
                 :show-message="false">
          <el-form-item :label="'原零件料号'"
                        prop="OldPartNo">
            <el-input v-model="replaceForm.OldODMComponentPn"
                      readonly
                      clearable></el-input>
          </el-form-item>
          <el-form-item :label="'原零件规格'">
            <el-input v-model="replaceForm.OldDescription"
                      clearable></el-input>
          </el-form-item>
          <el-form-item :label="'原零件编号'">
            <el-input v-model="replaceForm.OldODMComponentSn"
                      clearable></el-input>
          </el-form-item>
          <el-form-item :label="'新零件料号'"
                        prop="NewPartNo">
            <el-input v-model="replaceForm.NewODMComponentPn"
                      clearable
                      @keyup.enter.native="handleGetComponentInfomation"></el-input>
          </el-form-item>
          <!-- <el-form-item :label="'新零件规格'">
            <el-input v-model="replaceForm.NewDescription" clearable></el-input>
          </el-form-item> -->
          <el-form-item :label="'新零件编号'">
            <el-input v-model="replaceForm.NewODMComponentSn"
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
                   @click="handleSubmitReplace(3)">{{ $t("SfcsCollectDefects.makeSure") }}</el-button>
      </span>
    </el-dialog>

    <!-- 替换UID -->
    <el-dialog :title="dialogTitle"
               :visible.sync="dialogVisibleX2"
               width="50%"
               :close-on-click-modal="false"
               class="ccb-dia">
      <div>
        <el-form ref="replaceForm"
                 label-width="80px"
                 label-position="left"
                 class="cmY-form"
                 :model="replaceForm"
                 :rules="replacFormRules"
                 :show-message="false">
          <el-form-item :label="'原料号'"
                        prop="OldPartNo">
            <el-input v-model="replaceForm.OldNo"
                      readonly
                      clearable></el-input>
          </el-form-item>
          <el-form-item :label="'新料号'"
                        prop="NewPartNo">
            <el-input v-model="replaceForm.NewNo"
                      clearable></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisibleX2 = false"
                   style="width: 120px">{{
          $t("SfcsCollectDefects.cancel")
        }}</el-button>
        <el-button type="primary"
                   style="
            background: rgb(54, 126, 127);
            border: rgb(54, 126, 127);
            width: 120px;
          "
                   @click="handleSubmitReplace(2)">{{ $t("SfcsCollectDefects.makeSure") }}</el-button>
      </span>
    </el-dialog>

    <!-- 替换资料 -->
    <el-dialog :title="dialogTitle"
               :visible.sync="dialogVisibleX3"
               width="50%"
               :close-on-click-modal="false"
               class="ccb-dia">
      <div>
        <el-form ref="replaceForm"
                 label-width="80px"
                 label-position="left"
                 class="cmY-form"
                 :model="replaceForm"
                 :rules="replacFormRules"
                 :show-message="false">
          <el-form-item :label="'原料号'"
                        prop="OldPartNo">
            <el-input v-model="replaceForm.OldNo"
                      readonly
                      clearable></el-input>
          </el-form-item>
          <el-form-item :label="'新料号'"
                        prop="NewPartNo">
            <el-input v-model="replaceForm.NewNo"
                      clearable></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisibleX3 = false"
                   style="width: 120px">{{
          $t("SfcsCollectDefects.cancel")
        }}</el-button>
        <el-button type="primary"
                   style="
            background: rgb(54, 126, 127);
            border: rgb(54, 126, 127);
            width: 120px;
          "
                   @click="handleSubmitReplace(1)">{{ $t("SfcsCollectDefects.makeSure") }}</el-button>
      </span>
    </el-dialog>
  </d2-container>
</template>

<script src="./SfcsCollectDefects.js"></script>

<style lang="scss" scoped>
.Process {
  background: rgb(54, 126, 127);
  color: #fff;
  font-weight: bold;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 44px;
}
.out-container {
  margin-top: 5px;
}
.x-flex {
  display: flex;
  align-items: center;
}
.left-container {
  margin-right: 5px;
  padding: 5px 10px;
  border-radius: 2px;
  background: #fafafa;
  border: 1px solid rgb(218, 220, 224);
  .tips-txt {
    color: rgb(175, 35, 25);
    font-size: 14px;
  }
}
.small-list {
  height: 100px;
  border: 1px solid rgb(218, 220, 224);
  border-radius: 2px;
  background: #fff;
  overflow: auto;
  .small-item {
    font-size: 13px;
    color: #444;
    padding: 0 5px;
  }
  .yellow {
    background: rgb(255, 255, 192);
  }
  .gray {
    background: #fafafa;
  }
}
.right-container {
  margin-left: 5px;
  padding: 5px 10px;
  border-radius: 2px;
  background: #fafafa;
  border: 1px solid rgb(218, 220, 224);
}
.charts {
  padding: 5px 10px;
  border-radius: 2px;
  background: #fafafa;
  border: 1px solid rgb(218, 220, 224);
  margin-top: 10px;
  .charts-txt {
    font-size: 14px;
    color: #606266;
  }
  #echarts {
    width: 100%;
    height: 300px;
    background: #fff;
    margin-top: 10px;
  }
}
.l-flex {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  margin-left: 10px;
}
.tips-txt-x {
  padding-left: 10px;
  font-size: 14px;
  color: #888;
  line-height: 24px;
  position: relative;
  margin-top: 5px;
  margin-bottom: 10px;
}
.tips-txt-x:before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 4px;
  height: 100%;
  background: rgb(54, 126, 127);
}
</style>

<style>
.left-container .el-icon-search,
.right-container .el-icon-search {
  color: rgb(54, 126, 127) !important;
  cursor: pointer;
}
/* .left-container .el-input__prefix,
.el-input__suffix:active, .right-container .el-input__prefix,
.el-input__suffix:active {
  background: rgb(218, 220, 224);
} */
.cmY-form .el-form-item {
  margin-bottom: 5px !important;
}
.no-margin .el-form-item {
  margin-bottom: 0 !important;
}
.ccb-dia .el-dialog {
  margin-top: 5vh !important;
}
.cmY-form .el-input__icon,
.el-icon-search {
  color: rgb(54, 126, 127) !important;
}
.xhand {
  cursor: pointer;
}
.xhand:hover {
  color: #409eff;
  background: rgb(255, 255, 192);
}
.xActive {
  background: #e6a23c !important;
}

.xtables {
  height: 250px;
}
</style>
