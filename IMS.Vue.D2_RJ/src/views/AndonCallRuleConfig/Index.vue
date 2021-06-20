<template>
  <d2-container>
    <!-- 头部 -->
    <template slot="header">
      <custom-container-header
        :isExport="false"
        :isExportTpl="false"
        :isImport="false"
      >
        <el-select
          clearable
          style="width: 200px"
          v-model="formData.LINE_ID"
          :placeholder="$t('AndonCallRuleConfig._1')"
        >
          <el-option
            v-for="item in lineList"
            :key="item.ID"
            :label="item.LINE_NAME"
            :value="item.ID"
          />
        </el-select>
        <el-select
          clearable
          style="width: 200px"
          v-model="formData.CALL_CATEGORY_CODE"
          :placeholder="$t('AndonCallRuleConfig._2')"
        >
          <el-option
            v-for="item in kindList"
            :key="item.LOOKUP_CODE"
            :label="item.DESCRIPTION"
            :value="item.LOOKUP_CODE"
          />
        </el-select>
        <el-select
          clearable
          style="width: 200px"
          v-model="formData.CALL_TYPE_CODE"
          :placeholder="$t('AndonCallRuleConfig._3')"
        >
          <el-option
            v-for="item in typeBox"
            :key="item.LOOKUP_CODE"
            :label="item.DESCRIPTION"
            :value="item.LOOKUP_CODE.toString()"
          />
        </el-select>
        <el-input
          clearable
          v-model="formData.Key"
          :placeholder="$t('AndonCallRuleConfig._4')"
          style="width: 200px"
          @keyup.enter.native="searchClick"
        />&nbsp;
        <el-select
          clearable
          style="width: 200px"
          v-model="formData.ENABLED"
          :placeholder="$t('AndonCallRuleConfig._5')"
        >
          <el-option
            v-for="item in statusList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-button
          type="primary"
          icon="el-icon-search"
          @click.prevent="searchClick"
          >{{ $t("publics.btn.search") }}</el-button
        >&nbsp;
        <el-button
          type="success"
          icon="el-icon-plus"
          @click.prevent="addClick"
          v-if="$btnList.indexOf('AndonCallRuleConfigAdd') !== -1"
          >{{ $t("publics.btn.add") }}</el-button
        >&nbsp;
      </custom-container-header>
    </template>
    <!-- 表格 -->
    <div class="table-container">
      <vxe-table
        ref="xTable"
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
        :loading="loading"
        :data="mainTable"
        :mouse-config="{ selected: true }"
        :edit-config="{ trigger: 'click', mode: 'row', showStatus: true }"
      >
        <vxe-table-column
          min-width="150"
          field="LINE_NAME"
          :title="$t('AndonCallRuleConfig._6')"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          min-width="150"
          field="CALL_CATEGORY_NAME"
          :title="$t('AndonCallRuleConfig._7')"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          min-width="150"
          field="CALL_TYPE_NAME"
          :title="$t('AndonCallRuleConfig._10')"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          min-width="150"
          field="CALL_TITLE"
          :title="$t('AndonCallRuleConfig._13')"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          field="ENABLED"
          :title="$t('spf._16')"
          :edit-render="{ autofocus: '.custom-input', type: 'visible' }"
          min-width="100"
          align="center"
        >
          <template v-slot:edit="{ row }">
            <div class="rddselect">
              <el-switch
                disabled
                v-model="row.ENABLED"
                :active-text="$t('spf._25')"
                :inactive-text="$t('spf._26')"
                active-color="#13ce66"
                inactive-color="#cccccc"
                active-value="Y"
                inactive-value="N"
              />
            </div>
          </template>
        </vxe-table-column>
        <vxe-table-column
          :title="$t('plbd.tb_og')"
          min-width="150"
          align="center"
          fixed="right"
        >
          <template v-slot="{ row }">
            <el-button
              type="primary"
              v-if="$btnList.indexOf('AndonCallRuleConfigEdit') !== -1"
              @click="editClick(row, row.$index)"
              >{{ $t("publics.btn.edit") }}</el-button
            >
            <el-button
              type="danger"
              v-if="$btnList.indexOf('AndonCallRuleConfigDelete') !== -1"
              @click="removeClick(row, row.$index)"
              >{{ $t("publics.btn.delete") }}</el-button
            >
          </template>
        </vxe-table-column>
      </vxe-table>
    </div>
    <!-- 分页 -->
    <template slot="footer">
      <el-pagination
        :current-page="formData.Page"
        :page-size="formData.Limit"
        :page-sizes="[15, 25, 35, 45]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalPage"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </template>
    <!-- 编辑 -->
    <el-dialog
      :close-on-click-modal="false"
      v-dialogDrag
      :title="$t('AndonCallRuleConfig._14')"
      width="80%"
      :visible.sync="dialogTableVisible"
    >
      <el-form ref="editForm" label-width="120px" :model="editForm">
        <el-row>
          <el-col :span="8">
            <el-form-item :label="$t('AndonCallRuleConfig._15')">
              <el-select
                clearable
                style="width: 100%"
                v-model="editForm.LINE_ID"
                :placeholder="$t('AndonCallRuleConfig._1')"
              >
                <el-option
                  v-for="item in lineList"
                  :key="item.ID"
                  :label="item.LINE_NAME"
                  :value="item.ID"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('AndonCallRuleConfig._7')">
              <el-select
                @change="changeCALL_CATEGORY_CODE"
                clearable
                style="width: 100%"
                v-model="editForm.CALL_CATEGORY_CODE"
                :placeholder="$t('AndonCallRuleConfig._2')"
              >
                <el-option
                  v-for="item in kindList"
                  :key="item.LOOKUP_CODE"
                  :label="item.DESCRIPTION"
                  :value="item.LOOKUP_CODE.toString()"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('AndonCallRuleConfig._10')">
              <el-select
                :disabled="!editForm.CALL_CATEGORY_CODE"
                clearable
                style="width: 100%"
                v-model="editForm.CALL_TYPE_CODE"
                :placeholder="$t('AndonCallRuleConfig._3')"
                @change="changeCALL_TYPE_CODE"
              >
                <el-option
                  v-for="item in typeList"
                  :key="item.ID"
                  :label="item.CALL_TYPE_NAME"
                  :value="item.CALL_TYPE_CODE"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item :label="$t('AndonCallRuleConfig._13')">
              <el-select
                :disabled="
                  !editForm.CALL_CATEGORY_CODE || !editForm.CALL_TYPE_CODE
                "
                clearable
                style="width: 100%"
                v-model="editForm.CALL_TITLE"
                :placeholder="$t('AndonCallRuleConfig._4')"
                @change="changeCALL_TITLE"
              >
                <el-option
                  v-for="(item, index) in titleList"
                  :key="index"
                  :label="item.CALL_TITLE"
                  :value="item.CALL_TITLE"
                />
              </el-select>
              <!-- <el-input
                clearable
                v-model="editForm.CALL_TITLE"
                :placeholder="$t('AndonCallRuleConfig._4')"
                style="width: 100%"
                @keyup.enter.native="searchClick"
              />&nbsp; -->
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('AndonCallRuleConfig._16')">
              <el-switch
                v-model="editForm.ENABLED"
                :active-text="$t('spf._25')"
                :inactive-text="$t('spf._26')"
                active-color="#13ce66"
                inactive-color="#cccccc"
                active-value="Y"
                inactive-value="N"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <div style="float: right">
              <el-button
                type="success"
                @click="saveClick"
                v-if="$btnList.indexOf('AndonCallRuleConfigEdit') !== -1"
                >{{ $t("AndonCallRuleConfig._17") }}</el-button
              >
              <el-button @click="dialogTableVisible = false">{{
                $t("AndonCallRuleConfig._18")
              }}</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <!-- tab -->
      <el-tabs
        v-model="activeName"
        type="border-card"
        @tab-click="handleClick"
        style="margin-top: 20px"
      >
        <!-- 第一个 -->
        <el-tab-pane label="一级" name="0">
          <el-row>
            <el-form ref="tabForm1" label-width="90px" :model="tabForm1">
              <el-col :span="6">
                <el-form-item :label="$t('AndonCallRuleConfig._19')">
                  <el-select
                    clearable
                    style="width: 200px"
                    v-model="tabForm1.RULE_TYPE"
                    :placeholder="$t('AndonCallRuleConfig._20')"
                  >
                    <el-option
                      v-for="item in ruleList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-input
                type="number"
                min="0"
                clearable
                style="width: 200px; margin-left: 10px"
                v-model="tabForm1.RULE"
                :placeholder="$t('AndonCallRuleConfig._21')"
              />
              <el-select
                clearable
                style="width: 200px"
                v-model="tabForm1.RULE_UNIT"
                :placeholder="$t('AndonCallRuleConfig._22')"
              >
                <el-option
                  v-for="item in unitList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <el-button
                type="primary"
                :disabled="disabled"
                @click="addReceivePacket"
                v-if="$btnList.indexOf('AndonCallGroupRuleReSaveData') !== -1"
                >{{ $t("AndonCallRuleConfig._23") }}</el-button
              >
            </el-form>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="15" style="height: 300px">
              <vxe-table
                ref="lTable1"
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
                :data="leftTable1"
                :mouse-config="{ selected: true }"
                :edit-config="{
                  trigger: 'click',
                  mode: 'row',
                  showStatus: true,
                }"
              >
                <!-- <vxe-table-column type="checkbox" min-width="60" /> -->
                <vxe-table-column
                  min-width="60"
                  type="seq"
                  :title="$t('AndonCallRuleConfig._24')"
                />
                <vxe-table-column
                  min-width="120"
                  field="ORGANIZE_Name"
                  :title="$t('AndonCallRuleConfig._25')"
                  :edit-render="{ name: '$input', props: { readonly: true } }"
                />
                <vxe-table-column
                  min-width="120"
                  field="GROUP_NAME"
                  :title="$t('AndonCallRuleConfig._26')"
                  :edit-render="{ name: '$input', props: { readonly: true } }"
                />
                <vxe-table-column
                  min-width="120"
                  field="DESCRIPTION"
                  :title="$t('AndonCallRuleConfig._27')"
                  :edit-render="{ name: '$input', props: { readonly: true } }"
                />
                <vxe-table-column
                  min-width="100"
                  field="ENABLED"
                  :title="$t('AndonCallRuleConfig._28')"
                >
                  <template>
                    <el-switch
                      v-model="AvailableForm.Status"
                      :active-text="$t('spf._25')"
                      :inactive-text="$t('spf._26')"
                      active-color="#13ce66"
                      inactive-color="#cccccc"
                      active-value="Y"
                      inactive-value="N"
                    />
                  </template>
                </vxe-table-column>
                <vxe-table-column
                  :title="$t('plbd.tb_og')"
                  min-width="120"
                  align="center"
                  fixed="right"
                >
                  <template v-slot="{ row }">
                    <el-button
                      type="danger"
                      v-if="
                        $btnList.indexOf(
                          'AndonCallGroupRuleReDeleteOneById'
                        ) !== -1
                      "
                      @click="delOperate(row, row.$index)"
                      >{{ $t("publics.btn.delete") }}</el-button
                    >
                  </template>
                </vxe-table-column>
              </vxe-table>
            </el-col>
            <el-col :span="9" style="height: 258px">
              <div class="flexTest" style="height: 32px">
                <span>{{ $t("AndonCallRuleConfig._29") }}：</span>
                <el-input
                  clearable
                  style="width: 60%"
                  v-model="formData.Key"
                  :placeholder="$t('AndonCallRuleConfig._30')"
                  @keyup.enter.native="searchUser"
                />
                <el-button type="primary">{{
                  $t("publics.btn.search")
                }}</el-button>
              </div>
              <vxe-table
                ref="rTable1"
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
                :data="rightTable1"
                :mouse-config="{ selected: true }"
                :edit-config="{
                  trigger: 'click',
                  mode: 'row',
                  showStatus: true,
                }"
              >
                <vxe-table-column
                  min-width="120"
                  field="USER_NAME"
                  :title="$t('AndonCallRuleConfig._31')"
                  :edit-render="{ name: '$input', props: { readonly: true } }"
                />
                <vxe-table-column
                  min-width="120"
                  field="ROLE_NAME"
                  :title="$t('AndonCallRuleConfig._32')"
                  :edit-render="{ name: '$input', props: { readonly: true } }"
                />
                <vxe-table-column
                  min-width="150"
                  field="MOBILE"
                  :title="$t('AndonCallRuleConfig._33')"
                  :edit-render="{ name: '$input', props: { readonly: true } }"
                />
              </vxe-table>
            </el-col>
          </el-row>
        </el-tab-pane>
        <!-- 第二个 -->
        <el-tab-pane :label="$t('AndonCallRuleConfig._34')" name="1">
          <el-row>
            <el-form ref="tabForm2" label-width="90px" :model="tabForm2">
              <el-col :span="6">
                <el-form-item :label="$t('AndonCallRuleConfig._19')">
                  <el-select
                    clearable
                    style="width: 200px"
                    v-model="tabForm2.RULE_TYPE"
                    :placeholder="$t('AndonCallRuleConfig._20')"
                  >
                    <el-option
                      v-for="item in ruleList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-input
                clearable
                style="width: 200px; margin-left: 10px"
                v-model="tabForm2.RULE"
                :placeholder="$t('AndonCallRuleConfig._21')"
              />
              <el-select
                clearable
                style="width: 200px"
                v-model="tabForm2.RULE_UNIT"
                :placeholder="$t('AndonCallRuleConfig._22')"
              >
                <el-option
                  v-for="item in unitList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <el-button
                type="primary"
                :disabled="disabled"
                @click="addReceivePacket"
                v-if="$btnList.indexOf('AndonCallGroupRuleReSaveData') !== -1"
                >{{ $t("AndonCallRuleConfig._23") }}</el-button
              >
            </el-form>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="15" style="height: 300px">
              <vxe-table
                ref="lTable2"
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
                :data="leftTable2"
                :mouse-config="{ selected: true }"
                :edit-config="{
                  trigger: 'click',
                  mode: 'row',
                  showStatus: true,
                }"
              >
                <!-- <vxe-table-column type="checkbox" min-width="60" /> -->
                <vxe-table-column
                  min-width="60"
                  type="seq"
                  :title="$t('AndonCallRuleConfig._24')"
                />
                <vxe-table-column
                  min-width="120"
                  field="ORGANIZE_Name"
                  :title="$t('AndonCallRuleConfig._25')"
                  :edit-render="{ name: '$input', props: { readonly: true } }"
                />
                <vxe-table-column
                  min-width="120"
                  field="GROUP_NAME"
                  :title="$t('AndonCallRuleConfig._26')"
                  :edit-render="{ name: '$input', props: { readonly: true } }"
                />
                <vxe-table-column
                  min-width="120"
                  field="DESCRIPTION"
                  :title="$t('AndonCallRuleConfig._27')"
                  :edit-render="{ name: '$input', props: { readonly: true } }"
                />
                <vxe-table-column
                  min-width="100"
                  field="ENABLED"
                  :title="$t('AndonCallRuleConfig._28')"
                >
                  <template>
                    <el-switch
                      v-model="AvailableForm.Status"
                      :active-text="$t('spf._25')"
                      :inactive-text="$t('spf._26')"
                      active-color="#13ce66"
                      inactive-color="#cccccc"
                      active-value="Y"
                      inactive-value="N"
                    />
                  </template>
                </vxe-table-column>
                <vxe-table-column
                  :title="$t('plbd.tb_og')"
                  min-width="120"
                  align="center"
                  fixed="right"
                >
                  <template v-slot="{ row }">
                    <el-button
                      type="danger"
                      v-if="
                        $btnList.indexOf(
                          'AndonCallGroupRuleReDeleteOneById'
                        ) !== -1
                      "
                      @click="delOperate(row, row.$index)"
                      >{{ $t("publics.btn.delete") }}</el-button
                    >
                  </template>
                </vxe-table-column>
              </vxe-table>
            </el-col>
            <el-col :span="9" style="height: 258px">
              <div class="flexTest" style="height: 32px">
                <span>{{ $t("AndonCallRuleConfig._29") }}：</span>
                <el-input
                  clearable
                  style="width: 60%"
                  v-model="formData.Key"
                  :placeholder="$t('AndonCallRuleConfig._30')"
                  @keyup.enter.native="searchUser"
                />
                <el-button type="primary">{{
                  $t("publics.btn.search")
                }}</el-button>
              </div>
              <div>
                <vxe-table
                  ref="rTable2"
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
                  :data="rightTable2"
                  :mouse-config="{ selected: true }"
                  :edit-config="{
                    trigger: 'click',
                    mode: 'row',
                    showStatus: true,
                  }"
                >
                  <vxe-table-column
                    min-width="120"
                    field="USER_NAME"
                    :title="$t('AndonCallRuleConfig._31')"
                    :edit-render="{ name: '$input', props: { readonly: true } }"
                  />
                  <vxe-table-column
                    min-width="120"
                    field="ROLE_NAME"
                    :title="$t('AndonCallRuleConfig._32')"
                    :edit-render="{ name: '$input', props: { readonly: true } }"
                  />
                  <vxe-table-column
                    min-width="150"
                    field="MOBILE"
                    :title="$t('AndonCallRuleConfig._33')"
                    :edit-render="{ name: '$input', props: { readonly: true } }"
                  />
                </vxe-table>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
        <!-- 第三个 -->
        <el-tab-pane :label="$t('AndonCallRuleConfig._35')" name="2">
          <el-row>
            <el-form ref="tabForm3" label-width="90px" :model="tabForm3">
              <el-col :span="6">
                <el-form-item :label="$t('AndonCallRuleConfig._19')">
                  <el-select
                    clearable
                    style="width: 200px"
                    v-model="tabForm3.RULE_TYPE"
                    :placeholder="$t('AndonCallRuleConfig._20')"
                  >
                    <el-option
                      v-for="item in ruleList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-input
                clearable
                style="width: 200px; margin-left: 10px"
                v-model="tabForm3.RULE"
                :placeholder="$t('AndonCallRuleConfig._21')"
              />
              <el-select
                clearable
                style="width: 200px"
                v-model="tabForm3.RULE_UNIT"
                :placeholder="$t('AndonCallRuleConfig._22')"
              >
                <el-option
                  v-for="item in unitList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <el-button
                type="primary"
                :disabled="disabled"
                @click="addReceivePacket"
                v-if="$btnList.indexOf('AndonCallGroupRuleReSaveData') !== -1"
                >{{ $t("AndonCallRuleConfig._23") }}</el-button
              >
            </el-form>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="15" style="height: 300px">
              <vxe-table
                ref="lTable3"
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
                :data="leftTable3"
                :mouse-config="{ selected: true }"
                :edit-config="{
                  trigger: 'click',
                  mode: 'row',
                  showStatus: true,
                }"
              >
                <!-- <vxe-table-column type="checkbox" min-width="60" /> -->
                <vxe-table-column
                  min-width="60"
                  type="seq"
                  :title="$t('AndonCallRuleConfig._24')"
                />
                <vxe-table-column
                  min-width="120"
                  field="ORGANIZE_Name"
                  :title="$t('AndonCallRuleConfig._25')"
                  :edit-render="{ name: '$input', props: { readonly: true } }"
                />
                <vxe-table-column
                  min-width="120"
                  field="GROUP_NAME"
                  :title="$t('AndonCallRuleConfig._26')"
                  :edit-render="{ name: '$input', props: { readonly: true } }"
                />
                <vxe-table-column
                  min-width="120"
                  field="DESCRIPTION"
                  :title="$t('AndonCallRuleConfig._27')"
                  :edit-render="{ name: '$input', props: { readonly: true } }"
                />
                <vxe-table-column
                  min-width="100"
                  field="ENABLED"
                  :title="$t('AndonCallRuleConfig._28')"
                >
                  <template>
                    <el-switch
                      v-model="AvailableForm.Status"
                      :active-text="$t('spf._25')"
                      :inactive-text="$t('spf._26')"
                      active-color="#13ce66"
                      inactive-color="#cccccc"
                      active-value="Y"
                      inactive-value="N"
                    />
                  </template>
                </vxe-table-column>
                <vxe-table-column
                  :title="$t('plbd.tb_og')"
                  min-width="120"
                  align="center"
                  fixed="right"
                >
                  <template v-slot="{ row }">
                    <el-button
                      type="danger"
                      v-if="
                        $btnList.indexOf(
                          'AndonCallGroupRuleReDeleteOneById'
                        ) !== -1
                      "
                      @click="delOperate(row, row.$index)"
                      >{{ $t("publics.btn.delete") }}</el-button
                    >
                  </template>
                </vxe-table-column>
              </vxe-table>
            </el-col>
            <el-col :span="9" style="height: 258px">
              <div class="flexTest" style="height: 32px">
                <span>{{ $t("AndonCallRuleConfig._29") }}：</span>
                <el-input
                  clearable
                  style="width: 60%"
                  v-model="formData.Key"
                  :placeholder="$t('AndonCallRuleConfig._30')"
                  @keyup.enter.native="searchUser"
                />
                <el-button type="primary">{{
                  $t("publics.btn.search")
                }}</el-button>
              </div>
              <vxe-table
                ref="rTable3"
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
                :data="rightTable3"
                :mouse-config="{ selected: true }"
                :edit-config="{
                  trigger: 'click',
                  mode: 'row',
                  showStatus: true,
                }"
              >
                <vxe-table-column
                  min-width="120"
                  field="USER_NAME"
                  :title="$t('AndonCallRuleConfig._31')"
                  :edit-render="{ name: '$input', props: { readonly: true } }"
                />
                <vxe-table-column
                  min-width="120"
                  field="ROLE_NAME"
                  :title="$t('AndonCallRuleConfig._32')"
                  :edit-render="{ name: '$input', props: { readonly: true } }"
                />
                <vxe-table-column
                  min-width="150"
                  field="MOBILE"
                  :title="$t('AndonCallRuleConfig._33')"
                  :edit-render="{ name: '$input', props: { readonly: true } }"
                />
              </vxe-table>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">{{$t('ssc_rd.cancel')}}</el-button>
        <el-button type="primary" @click="submitModifyForm">{{$t('ssc_rd.sure')}}</el-button>
      </span>-->
    </el-dialog>
    <!-- 新增 -->
    <el-dialog
      :close-on-click-modal="false"
      v-dialogDrag
      :title="$t('AndonCallRuleConfig._36')"
      width="75%"
      :visible.sync="ReceivePacketVisible"
    >
      <div>
        <el-row :gutter="50">
          <el-col :span="16" style="height: 258px">
            <div class="Grouping">
              <span>{{ $t("AndonCallRuleConfig._37") }}：</span>
              <!-- <el-select
                clearable
                style="width:200px"
                v-model="addForm.Key"
                :placeholder="'请选择组织架构'"
              >
                <el-option
                  v-for="item in typeList"
                  :key="item.LOOKUP_CODE"
                  :label="item.DESCRIPTION"
                  :value="item.LOOKUP_CODE"
                />
              </el-select>-->
              <el-input
                clearable
                style="width: 200px"
                v-model="addForm.Key"
                :placeholder="$t('AndonCallRuleConfig._38')"
                @keyup.enter.native="searchRPleft"
              />
              <el-button type="primary" @click="searchRPleft">{{
                $t("publics.btn.search")
              }}</el-button>
            </div>
            <vxe-table
              ref="addleftTable"
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
              :data="addTable"
              :mouse-config="{ selected: true }"
              :edit-config="{ trigger: 'click', mode: 'row', showStatus: true }"
            >
              <vxe-table-column type="checkbox" min-width="40" />
              <vxe-table-column
                min-width="90"
                type="seq"
                :title="$t('AndonCallRuleConfig._24')"
                :edit-render="{ name: '$input', props: { readonly: true } }"
              />
              <vxe-table-column
                min-width="180"
                field="ORGANIZE_Name"
                :title="$t('AndonCallRuleConfig._25')"
                :edit-render="{ name: '$input', props: { readonly: true } }"
              />
              <vxe-table-column
                min-width="140"
                field="GROUP_NAME"
                :title="$t('AndonCallRuleConfig._26')"
                :edit-render="{ name: '$input', props: { readonly: true } }"
              />
              <vxe-table-column
                min-width="140"
                field="DESCRIPTION"
                :title="$t('AndonCallRuleConfig._27')"
                :edit-render="{ name: '$input', props: { readonly: true } }"
              />
            </vxe-table>
          </el-col>
          <el-col :span="8" style="height: 300px">
            <vxe-table
              ref="addrightTable"
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
              :data="useTable"
              :mouse-config="{ selected: true }"
              :edit-config="{ trigger: 'click', mode: 'row', showStatus: true }"
            >
              <vxe-table-column
                min-width="130"
                field="USER_NAME"
                :title="$t('AndonCallRuleConfig._31')"
                :edit-render="{ name: '$input', props: { readonly: true } }"
              />
              <vxe-table-column
                min-width="120"
                field="ROLE_NAME"
                :title="$t('AndonCallRuleConfig._32')"
                :edit-render="{ name: '$input', props: { readonly: true } }"
              />
              <vxe-table-column
                min-width="150"
                field="MOBILE"
                :title="$t('AndonCallRuleConfig._33')"
                :edit-render="{ name: '$input', props: { readonly: true } }"
              />
            </vxe-table>
          </el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="ReceivePacketVisible = false">{{
          $t("ssc_rd.cancel")
        }}</el-button>
        <el-button type="primary" @click="submitaddForm">{{
          $t("ssc_rd.sure")
        }}</el-button>
      </span>
    </el-dialog>
  </d2-container>
</template>

<script>
import customContainerHeader from '@/components/custom-container-header'
import pagination from '@/views/mixin/page'
import { mapGetters } from 'vuex'
import {
  Index,
  LoadData,
  DeleteOneById,
  PersonRuleLoadData,
  GroupRuleReLoadData,
  ManagerLoadData,
  MesMessageReceiverGroupLoadData,
  SaveAndonCallGroupRuleRe,
  DeleteGroupRuleRe,
  SaveData,
  AndonCallContentConfigLoadData
} from '@/api/AndonCallRuleConfig'
export default {
  name: 'AndonCallRuleConfig',
  components: {
    customContainerHeader
  },
  mixins: [pagination],
  data () {
    return {
      formData: {
        Page: 1,
        Limit: 15
      },
      lineList: [],
      typeList: [],
      typeBox: [],
      kindList: [],
      titleList: [],
      statusList: [
        { value: 'Y', label: this.$t('AndonCallRuleConfig._39') },
        { value: 'N', label: this.$t('AndonCallRuleConfig._40') }
      ],
      loading: false,
      mainTable: [],
      dialogTableVisible: false,
      editForm: {},
      activeName: '0',
      tabForm1: {},
      tabForm2: {},
      tabForm3: {},
      leftTable1: [],
      leftTable2: [],
      leftTable3: [],
      rightTable1: [],
      rightTable2: [],
      rightTable3: [],
      ReceivePacketVisible: false,
      ruleList: [{ value: 0, label: this.$t('AndonCallRuleConfig._41') }],
      unitList: [
        { value: 0, label: this.$t('AndonCallRuleConfig._42') },
        { value: 1, label: this.$t('AndonCallRuleConfig._43') },
        { value: 2, label: this.$t('AndonCallRuleConfig._44') }
      ],
      addTable: [],
      useTable: [],
      FatherArr: [],
      FatherID: -1,
      addForm: {},
      ruleData: [],
      form: {
        InsertRecords: [],
        UpdateRecords: [],
        RemoveRecords: []
      },
      AvailableForm: {}, // 状态
      saveForm: {
        InsertRecords: [],
        UpdateRecords: [],
        RemoveRecords: [],
        UpdateRecordsRule: []
      },
      isAdd: false, // 是否新增
      disabled: true,
      selectCALL_CATEGORY_CODE: '',
      selectCALL_TYPE_CODE: '',
      selectCALL_CONTENT_ID: null
    }
  },
  created () {
    this.getIndex()
    this.getLoadData()
    this.getManagerLoadData()
  },
  computed: {
    ...mapGetters(['userinfo'])
  },
  methods: {

    async getIndex () {
      const res = await Index()
      if (res.Result) {
        this.kindList = res.Result.CALL_CATEGORY_CODE
        // this.kindList.unshift({
        //   LOOKUP_CODE: 0,
        //   DESCRIPTION: ''
        // })
        this.typeBox = res.Result.CALL_TYPE_CODE
        // this.typeList.unshift({
        //   LOOKUP_CODE: 0,
        //   DESCRIPTION: ''
        // })
        this.lineList = res.Result.LINE_NAME
      }
    },
    async getLoadData () {
      this.loading = true
      const res = await LoadData(this.formData)
      if (res.Result) {
        this.mainTable = res.Result
        this.totalPage = res.TotalCount
        this.loading = false
      } else {
        this.loading = false
      }
    },
    // 搜索
    searchClick () {
      this.formData.Page = 1
      this.getLoadData()
    },
    // 新增
    addClick () {
      const nowDate = this.getNowDate(new Date())
      this.editForm = {
        ID: 0,
        LINE_ID: null,
        CALL_CONTENT_ID: 0,
        ENABLED: '',
        CREATOR: this.userinfo.USER_NAME,
        CREATE_TIME: nowDate
      }
      this.tabForm1 = {}
      this.tabForm2 = {}
      this.tabForm3 = {}
      this.leftTable1 = []
      this.leftTable2 = []
      this.leftTable3 = []
      this.isAdd = true
      this.disabled = true
      this.FatherID = 0
      // this.getPersonRule(0)
      this.dialogTableVisible = true
    },
    // 编辑
    async editClick (row) {
      console.log(row)
      this.isAdd = false
      this.disabled = false
      this.editForm = row
      this.editForm.CALL_CATEGORY_CODE = row.CALL_CATEGORY_CODE
      this.editForm.CALL_TYPE_CODE = row.CALL_TYPE_CODE
      this.activeName = '0'
      this.getPersonRule(row.ID)
      const res = await AndonCallContentConfigLoadData({
        CALL_CATEGORY_CODE: row.CALL_CATEGORY_CODE,
        Limit: 999999
      })
      this.typeList = res.Result ? res.Result : []
      this.dialogTableVisible = true
    },
    async changeCALL_CATEGORY_CODE (e) {
      this.editForm.CALL_TYPE_CODE = ''
      this.selectCALL_CATEGORY_CODE = e

      const res = await AndonCallContentConfigLoadData({
        CALL_CATEGORY_CODE: this.selectCALL_CATEGORY_CODE,
        Limit: 999999
      })
      this.typeList = res.Result ? res.Result : []
    },
    async changeCALL_TYPE_CODE (e) {
      console.log(e)
      this.editForm.CALL_TITLE = ''
      this.selectCALL_TYPE_CODE = e
      this.$forceUpdate()
      const res = await AndonCallContentConfigLoadData({
        CALL_CATEGORY_CODE: this.selectCALL_CATEGORY_CODE,
        CALL_TYPE_CODE: this.selectCALL_TYPE_CODE,
        Limit: 999999
      })
      this.titleList = res.Result ? res.Result : []
    },
    async changeCALL_TITLE (e) {
      this.$forceUpdate()
      const res = await AndonCallContentConfigLoadData({
        CALL_CATEGORY_CODE: this.selectCALL_CATEGORY_CODE,
        CALL_TYPE_CODE: this.selectCALL_TYPE_CODE,
        CALL_TITLE: e,
        Limit: 999999
      })
      this.editForm.CALL_CONTENT_ID = res.Result[0].ID
      this.selectCALL_CONTENT_ID = res.Result[0].ID
    },
    // 获取推送规则
    async getPersonRule (e) {
      this.FatherArr = []
      this.tabForm1 = {}
      this.tabForm2 = {}
      this.tabForm3 = {}
      const res = await PersonRuleLoadData({ CALL_RULE_ID: e })
      // this.ruleData = res.Result
      res.Result.map((item) => {
        this.FatherArr.push(item.ID)
        if (item.CALL_LEVEL === 2) {
          this.tabForm1 = item
        }
        if (item.CALL_LEVEL === 1) {
          this.tabForm2 = item
        }
        if (item.CALL_LEVEL === 0) {
          this.tabForm3 = item
        }
      })
      this.FatherID = this.FatherArr[0]

      console.log(this.FatherArr)

      this.getGroupRuleReLoadData()
      this.$forceUpdate()
    },
    // 获取推送组织
    async getGroupRuleReLoadData () {
      const res = await GroupRuleReLoadData({ PERSON_RULE_ID: this.FatherID })
      if (this.activeName === '0') {
        this.leftTable1 = res.Result ? res.Result : []
      } else if (this.activeName === '1') {
        this.leftTable2 = res.Result ? res.Result : []
      } else if (this.activeName === '2') {
        this.leftTable3 = res.Result ? res.Result : []
      }
    },
    handleClick (tab, event) {
      if (!this.isAdd) {
        this.FatherID = this.FatherArr[tab.name]
        this.getGroupRuleReLoadData()
      }
      // console.log(tab.name)

      // console.log('改变后', this.FatherID)
    },
    // 提交新增
    async submitaddForm () {
      this.form = {
        InsertRecords: [],
        UpdateRecords: [],
        RemoveRecords: []
      }
      let selectRecords = this.$refs.addleftTable.getCheckboxRecords()
      selectRecords.map((item) => {
        this.form.InsertRecords.push({
          ID: 0,
          PERSON_RULE_ID: this.FatherID,
          GROUP_ID: item.ID,
          CREATE_USER: item.CREATE_USER,
          CREATE_TIME: item.CREATE_TIME,
          UPDATE_USER: item.UPDATE_USER,
          UPDATE_TIME: item.UPDATE_TIME,
          ENABLED: item.ENABLED
        })
      })
      console.log(this.form)
      const res = await SaveAndonCallGroupRuleRe(this.form)
      if (res.Result) {
        this.getGroupRuleReLoadData()
        this.$notify({
          title: this.$t('cdc._21'),
          message: this.$t('cdc._22'),
          type: 'success',
          duration: 2000
        })
      }
      this.ReceivePacketVisible = false
    },
    // 保存
    saveClick () {
      this.saveForm = {
        InsertRecords: [],
        UpdateRecords: [],
        RemoveRecords: [],
        UpdateRecordsRule: []
      }
      var postdata = this.$refs.xTable.getRecordset()
      this.saveForm.InsertRecords = postdata.insertRecords
      this.saveForm.UpdateRecords = postdata.updateRecords
      this.saveForm.RemoveRecords = postdata.removeRecords
      this.saveForm.UpdateRecordsRule.push(this.tabForm1)
      this.saveForm.UpdateRecordsRule.push(this.tabForm2)
      this.saveForm.UpdateRecordsRule.push(this.tabForm3)
      if (this.isAdd === true) {
        this.saveForm.InsertRecords.push(this.editForm)
      } else {
        // this.saveForm.UpdateRecords[0].CALL_CONTENT_ID = this.selectCALL_CONTENT_ID
      }
      console.log(JSON.stringify(this.saveForm))
      SaveData(this.saveForm).then((res) => {
        if (res.Result) {
          this.saveForm = {}
          this.getLoadData()
          this.$notify({
            title: this.$t('cdc._21'),
            message: this.$t('cdc._22'),
            type: 'success',
            duration: 2000
          })
        }
        this.dialogTableVisible = false
      })
      this.dialogTableVisible = false
    },
    // 删除新增
    delOperate (row) {
      // console.log(row)
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
          const res = await DeleteGroupRuleRe(row.ID)
          if (res.Result) {
            this.$message({
              type: 'success',
              message: this.$t('MesTongsApply._94')
            })
            this.getGroupRuleReLoadData()
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('MesTongsApply._95')
          })
        })
    },
    // 删除
    removeClick (row) {
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
          const res = await DeleteOneById(row.ID)
          if (res.Result) {
            this.$message({
              type: 'success',
              message: this.$t('MesTongsApply._94')
            })
            this.getLoadData()
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('MesTongsApply._95')
          })
        })
    },
    // 新增推送人员
    addReceivePacket () {
      this.getMesMessageReceiverGroupLoadData()
      this.ReceivePacketVisible = true
    },
    // 获取接收者
    async getMesMessageReceiverGroupLoadData () {
      const res = await MesMessageReceiverGroupLoadData(this.addForm)
      this.addTable = res.Result ? res.Result : []
    },
    // 推送用户、人员
    async getManagerLoadData () {
      const res = await ManagerLoadData()
      this.rightTable1 = res.Result ? res.Result : []
      this.rightTable2 = res.Result ? res.Result : []
      this.rightTable3 = res.Result ? res.Result : []
      this.useTable = res.Result ? res.Result : []
    },
    searchRPleft () {
      this.addForm.Page = 1
      this.getMesMessageReceiverGroupLoadData()
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
    }
  }
}
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.flexTest {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.Grouping {
  display: flex;
  justify-content: left;
  align-items: center;
  margin-bottom: 10px;
  height: 32px;
}
</style>
