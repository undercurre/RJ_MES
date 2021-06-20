<template>
  <d2-container>
    <!-- 头部 -->
    <template slot="header">
      <custom-container-header :isExport="false"
                               :isExportTpl="false"
                               :isImport="false">
        <el-input clearable
                  v-model="formData.BATCH_NO"
                  :placeholder="$t('MesFirstCheckInfo._1')"
                  style="width:220px"
                  @keyup.enter.native="searchClick" />&nbsp;
        <el-input clearable
                  v-model="formData.PART"
                  :placeholder="$t('MesFirstCheckInfo._2')"
                  style="width:320px"
                  @keyup.enter.native="searchClick" />&nbsp;
        <el-button type="primary"
                   icon="el-icon-search"
                   @click.prevent="searchClick">{{$t('publics.btn.search')}}</el-button>&nbsp;
        <el-button type="primary"
                   icon="el-icon-finished"
                   @click="drawer = true">{{ $t('SfcsPn._48') }}</el-button>

        <el-button type="success"
                   icon="el-icon-plus"
                   @click.prevent="addClick">{{$t('publics.btn.add')}}</el-button>&nbsp;
        <el-button type="warning"
                   icon="el-icon-check"
                   @click.prevent="AuditClick">{{$t('MesFirstCheckInfo._3')}}</el-button>&nbsp;
      </custom-container-header>
    </template>
    <!-- 表格 -->
    <div class="ConfirmTable-container">
      <vxe-table ref="xTable"
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
                 :mouse-config="{selected: true}"
                 :radio-config="{labelField: 'name', trigger: 'row'}"
                 :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
                 @cell-click="cellClick">
        <vxe-table-column show-overflow
                          :title="$t('ukas._27')"
                          type="radio"
                          min-width="80"
                          align="center"
                          fixed="left" />
        <vxe-table-column min-width="80"
                          :title="$t('se_cc.sn')"
                          fixed="left">
          <template v-slot="{$rowIndex}">{{$rowIndex +1}}</template>
        </vxe-table-column>
        <vxe-table-column min-width="150"
                          field="LINE_NAME"
                          :title="$t('MesFirstCheckInfo._4')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column min-width="150"
                          field="DEPARTMENT_NAME"
                          :title="$t('MesFirstCheckInfo._5')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column min-width="100"
                          field="STATUS"
                          :title="$t('MesFirstCheckInfo._5a')">
          <template slot-scope="scope">
            <span v-if="scope.row.STATUS === 0"
                  class="red-txt">{{$t('MesFirstCheckInfo._6')}}</span>
            <span v-else-if="scope.row.STATUS === 1"
                  class="green-txt">{{$t('MesFirstCheckInfo._7')}}</span>
          </template>
        </vxe-table-column>
        <vxe-table-column min-width="150"
                          field="PART_NO"
                          :title="$t('MesFirstCheckInfo._8')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column min-width="150"
                          field="PART_NAME"
                          :title="$t('MesFirstCheckInfo._9')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column min-width="200"
                          field="PART_DESC"
                          :title="$t('MesFirstCheckInfo._10')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column min-width="150"
                          field="BATCH_NO"
                          :title="$t('MesFirstCheckInfo._11')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column min-width="100"
                          field="BATCH_QTY"
                          :title="$t('MesFirstCheckInfo._12')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column min-width="120"
                          field="NEW_PART"
                          :title="$t('MesFirstCheckInfo._13')">
          <template slot-scope="scope">
            <span v-if="scope.row.NEW_PART === 'Y'">{{$t('MesFirstCheckInfo._14')}}</span>
            <span v-if="scope.row.NEW_PART === 'N'">{{$t('MesFirstCheckInfo._15')}}</span>
          </template>
        </vxe-table-column>
        <vxe-table-column min-width="150"
                          field="PRODUCT_DATE"
                          :title="$t('MesFirstCheckInfo._16')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column min-width="150"
                          field="RESULT_STATUS"
                          :title="$t('MesFirstCheckInfo._17')">
          <template slot-scope="scope">
            <span v-if="scope.row.RESULT_STATUS === 0"
                  style="color:orange">{{$t('MesFirstCheckInfo._18')}}</span>
            <span v-else-if="scope.row.RESULT_STATUS === 1"
                  class="green-txt">{{$t('MesFirstCheckInfo._19')}}</span>
            <span v-else-if="scope.row.RESULT_STATUS === 2"
                  class="red-txt">{{$t('MesFirstCheckInfo._20')}}</span>
          </template>
        </vxe-table-column>
        <vxe-table-column min-width="180"
                          field="RESULT_REMARK"
                          :title="$t('MesFirstCheckInfo._21')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column min-width="150"
                          field="CREATE_USER"
                          :title="$t('MesFirstCheckInfo._22')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column min-width="150"
                          field="CREATE_TIME"
                          :title="$t('MesFirstCheckInfo._23')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column min-width="150"
                          field="AUDIT_USER"
                          :title="$t('MesFirstCheckInfo._24')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column min-width="150"
                          field="AUDIT_TIME"
                          :title="$t('MesFirstCheckInfo._25')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column min-width="180"
                          field="UPDATE_USER"
                          :title="$t('MesFirstCheckInfo._26')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column min-width="160"
                          field="UPDATE_TIME"
                          :title="$t('MesFirstCheckInfo._27')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column :title="$t('plbd.tb_og')"
                          min-width="300"
                          align="center"
                          fixed="right">
          <template v-slot="{ row }">
            <el-button type="primary"
                       @click="editClick(row, row.$index)">{{ $t('publics.btn.edit') }}</el-button>
            <el-button type="danger"
                       @click="removeClick(row, row.$index)">{{ $t('publics.btn.delete') }}</el-button>
            <el-button type="success"
                       @click="checkClick(row, row.$index)">{{$t('MesFirstCheckInfo._28')}}</el-button>
          </template>
        </vxe-table-column>
      </vxe-table>
    </div>
    <!-- 分页 -->
    <div class="ConfirmPagination">
      <el-pagination :current-page="formData.Page"
                     :page-size="formData.Limit"
                     :page-sizes="[15, 25, 35, 45]"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="totalPage"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange" />
    </div>
    <!-- 下表格 -->
    <el-row>
      <el-col :span="16">
        <div>
          <span class="demonstration"
                style="display: block;color: #606266;font-size: 14px;margin: 10px 0;">{{$t('MesFirstCheckInfo._29')}}</span>
        </div>
        <div class="bottomTable-container">
          <vxe-table ref="lbTable"
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
                     :loading="lbloading"
                     :data="mainTable2"
                     :mouse-config="{selected: true}"
                     :radio-config="{labelField: 'name', trigger: 'row'}"
                     :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
                     @cell-click="cellClick2">
            <vxe-table-column show-overflow
                              :title="$t('ukas._27')"
                              type="radio"
                              min-width="80"
                              align="center"
                              fixed="left" />
            <vxe-table-column min-width="80"
                              :title="$t('se_cc.sn')"
                              fixed="left">
              <template v-slot="{$rowIndex}">{{$rowIndex +1}}</template>
            </vxe-table-column>
            <vxe-table-column min-width="150"
                              field="PART_SN"
                              :title="$t('MesFirstCheckInfo._30')"
                              :edit-render="{name: '$input', props: {readonly: true}}" />
            <vxe-table-column min-width="150"
                              field="RESULT_STATUS"
                              :title="$t('MesFirstCheckInfo._31')">
              <template slot-scope="scope">
                <span v-if="scope.row.RESULT_STATUS === 1"
                      class="green-txt">{{$t('MesFirstCheckInfo._32')}}</span>
                <span v-else
                      class="red-txt">{{$t('MesFirstCheckInfo._33')}}</span>
              </template>
            </vxe-table-column>
            <vxe-table-column min-width="150"
                              field="REMARK"
                              :title="$t('MesFirstCheckInfo._34')"
                              :edit-render="{name: '$input', props: {readonly: true}}" />
            <vxe-table-column min-width="150"
                              field="CHECK_USER"
                              :title="$t('MesFirstCheckInfo._35')"
                              :edit-render="{name: '$input', props: {readonly: true}}" />
            <vxe-table-column min-width="150"
                              field="CHECK_TIME"
                              :title="$t('MesFirstCheckInfo._36')"
                              :edit-render="{name: '$input', props: {readonly: true}}" />
            <vxe-table-column :title="$t('plbd.tb_og')"
                              min-width="150"
                              align="center"
                              fixed="right">
              <template slot-scope="scope">
                <el-button type="primary"
                           @click="editClick2(scope)">{{ $t('publics.btn.edit') }}</el-button>
                <el-button type="danger"
                           @click="removeClick2(scope)">{{ $t('publics.btn.delete') }}</el-button>
              </template>
            </vxe-table-column>
          </vxe-table>
        </div>
      </el-col>
      <el-col :span="8">
        <div>
          <span class="demonstration"
                style="display: block;color: #606266;font-size: 14px;margin: 10px 0;">{{$t('MesFirstCheckInfo._37')}}</span>
        </div>
        <div class="bottomTable-container">
          <vxe-table ref="rbTable"
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
                     :loading="rbloading"
                     :data="mainTable3"
                     :mouse-config="{selected: true}"
                     :edit-config="{trigger: 'click', mode: 'row', showStatus: true}">
            <vxe-table-column min-width="80"
                              :title="$t('se_cc.sn')"
                              fixed="left">
              <template v-slot="{$rowIndex}">{{$rowIndex +1}}</template>
            </vxe-table-column>
            <vxe-table-column min-width="150"
                              field="CHECK_TYPE_NAME"
                              :title="$t('MesFirstCheckInfo._38')"
                              :edit-render="{name: '$input', props: {readonly: true}}" />
            <vxe-table-column min-width="150"
                              field="CHECK_ITEM"
                              :title="$t('MesFirstCheckInfo._39')"
                              :edit-render="{name: '$input', props: {readonly: true}}" />
            <vxe-table-column min-width="150"
                              field="RESULT_VALUE"
                              :title="$t('MesFirstCheckInfo._40')"
                              :edit-render="{name: '$input', props: {readonly: true}}" />
          </vxe-table>
        </div>
      </el-col>
    </el-row>
    <!-- 抽屉 -->
    <el-drawer :title="$t('SfcsPn._48')"
               :visible.sync="drawer"
               direction="ltr">
      <div style="padding: 0 20px">
        <el-card class="box-card">
          <div slot="header"
               class="clearfix">
            <span>{{ $t('MesProductionPreMst._19') }}</span>
            <el-button style="float: right; padding: 3px 0"
                       type="text"
                       @click="searchClick">{{ $t('MesProductionPreMst._20') }}</el-button>
            <el-button style="float: right; padding: 3px 0;margin-right: 20px"
                       type="text"
                       @click="resetListQuery">{{ $t('MesProductionPreMst._21') }}</el-button>
          </div>
          <el-form class="custom-form"
                   ref="formData"
                   label-position="top"
                   label-width="80px"
                   :model="formData"
                   size="mini">
            <el-form-item :label="$t('MesFirstCheckInfo._41')">
              <el-select style="width:100%"
                         v-model="formData.LINE_ID"
                         :placeholder="$t('MesFirstCheckInfo._42')">
                <el-option v-for="item in LineList"
                           :key="item.LINE_ID"
                           :label="item.LINE_NAME"
                           :value="item.LINE_ID" />
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('MesFirstCheckInfo._43')">
              <el-select style="width:100%"
                         v-model="formData.DEPARTMENT"
                         :placeholder="$t('MesFirstCheckInfo._44')">
                <el-option v-for="item in DepartmentList"
                           :key="item.ID"
                           :label="item.CHINESE"
                           :value="item.ID" />
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('MesFirstCheckInfo._45')">
              <el-select style="width:100%"
                         v-model="formData.Status"
                         :placeholder="$t('MesFirstCheckInfo._46')">
                <el-option v-for="item in StatusList"
                           :key="item.ID"
                           :label="item.NAME"
                           :value="item.ID" />
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('MesFirstCheckInfo._47')">
              <el-select style="width:100%"
                         v-model="formData.RESULT_STATUS"
                         :placeholder="$t('MesFirstCheckInfo._48')">
                <el-option v-for="item in ResultList"
                           :key="item.ID"
                           :label="item.NAME"
                           :value="item.ID" />
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('MesFirstCheckInfo._49')">
              <el-input clearable
                        v-model="formData.BATCH_NO"
                        :placeholder="$t('MesFirstCheckInfo._50')"
                        style="width:100%"
                        @keyup.enter.native="searchClick" />&nbsp;
            </el-form-item>
            <el-form-item :label="$t('MesFirstCheckInfo._51')">
              <el-input clearable
                        v-model="formData.PART"
                        :placeholder="$t('MesFirstCheckInfo._52')"
                        style="width:100%"
                        @keyup.enter.native="searchClick" />&nbsp;
            </el-form-item>
            <el-form-item :label="$t('MesFirstCheckInfo._53')">
              <el-date-picker style="width:100%"
                              v-model="formData.BEGIN_TIME"
                              type="datetime"
                              value-format="yyyy-MM-dd"
                              format="yyyy-MM-dd"
                              :picker-options="pickerOptionsStart"
                              :placeholder="$t('MesFirstCheckInfo._53')" />
            </el-form-item>
            <el-form-item :label="$t('MesFirstCheckInfo._54')">
              <el-date-picker style="width:100%"
                              v-model="formData.END_TIME"
                              type="datetime"
                              value-format="yyyy-MM-dd"
                              format="yyyy-MM-dd"
                              :picker-options="pickerOptionsEnd"
                              :placeholder="$t('MesFirstCheckInfo._54')" />
            </el-form-item>
          </el-form>
        </el-card>
      </div>
    </el-drawer>
    <!-- 新增/编辑框 -->
    <el-dialog v-dialogDrag
               :visible.sync="dialogVisible"
               :title="dialogTitle"
               width="60%"
               :close-on-click-modal="false">
      <el-form ref="editForm"
               :model="editForm"
               label-width="100px"
               :rules="validRules"
               :show-message="false">
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('MesFirstCheckInfo._41')"
                          prop="LINE_NAME">
              <el-select @change="changeLine"
                         style="width:100%"
                         v-model="editForm.LINE_NAME"
                         :placeholder="$t('MesFirstCheckInfo._42')">
                <el-option v-for="item in LineList"
                           :key="item.LINE_ID"
                           :label="item.LINE_NAME"
                           :value="item.LINE_ID" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('MesFirstCheckInfo._43')"
                          prop="DEPARTMENT">
              <el-select style="width:100%"
                         v-model="editForm.DEPARTMENT"
                         :placeholder="$t('MesFirstCheckInfo._44')">
                <el-option v-for="item in DepartmentList"
                           :key="item.ID"
                           :label="item.CHINESE"
                           :value="item.ID" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('MesFirstCheckInfo._49')"
                          prop="BATCH_NO">
              <el-input readonly
                        v-model="editForm.BATCH_NO"
                        :placeholder="$t('MesFirstCheckInfo._55')" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('MesFirstCheckInfo._56')"
                          prop="BATCH_QTY">
              <el-input readonly
                        v-model="editForm.BATCH_QTY"
                        :placeholder="$t('MesFirstCheckInfo._57')" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('MesFirstCheckInfo._8')"
                          prop="PART_NO">
              <el-input readonly
                        v-model="editForm.PART_NO"
                        :placeholder="$t('MesFirstCheckInfo._58')" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('MesFirstCheckInfo._59')"
                          prop="PART_NAME">
              <el-input readonly
                        v-model="editForm.PART_NAME"
                        :placeholder="$t('MesFirstCheckInfo._60')" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item :label="$t('MesFirstCheckInfo._61')"
                        prop="PART_DESC">
            <el-input readonly
                      v-model="editForm.PART_DESC"
                      :placeholder="$t('MesFirstCheckInfo._62')" />
          </el-form-item>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('MesFirstCheckInfo._63')"
                          prop="PRODUCT_DATE">
              <el-input readonly
                        :placeholder="$t('MesFirstCheckInfo._64')"
                        v-model="editForm.PRODUCT_DATE" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('MesFirstCheckInfo._65')"
                          prop="NEW_PART">
              <el-radio v-model="editForm.NEW_PART"
                        label="Y">{{$t('MesFirstCheckInfo._66')}}</el-radio>
              <el-radio v-model="editForm.NEW_PART"
                        label="N">{{$t('MesFirstCheckInfo._67')}}</el-radio>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div style="text-align: center;margin-top:20px">
        <el-button type="primary"
                   @click.prevent="saveClick">{{$t('ssc_rd.sure')}}</el-button>&nbsp;
        <el-button @click.prevent="cleanClick">{{$t('MesFirstCheckInfo._68')}}</el-button>&nbsp;
      </div>
    </el-dialog>
    <!-- 首五件检验明细 -->
    <el-dialog v-dialogDrag
               :visible.sync="dialogVisible2"
               :title="dialogTitle2"
               width="60%"
               :close-on-click-modal="false">
      <el-form ref="checkForm"
               :model="checkForm"
               label-width="100px"
               :show-message="false">
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('MesFirstCheckInfo._69')"
                          prop="PART_SN">
              <el-input :placeholder="$t('MesFirstCheckInfo._70')"
                        v-model="checkForm.PART_SN" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('MesFirstCheckInfo._71')"
                          prop="radio">
              <el-radio v-model="checkForm.RESULT_STATUS"
                        label="1"
                        style="color: #67c23a;">{{$t('MesFirstCheckInfo._72')}}</el-radio>
              <el-radio v-model="checkForm.RESULT_STATUS"
                        label="2"
                        style="color: #f56c6c;">{{$t('MesFirstCheckInfo._73')}}</el-radio>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item :label="$t('MesFirstCheckInfo._74')">
            <el-input type="textarea"
                      :rows="3"
                      :placeholder="$t('MesFirstCheckInfo._75')"
                      v-model="checkForm.REMARK" />
          </el-form-item>
        </el-row>
      </el-form>
      <div class="ConfirmTable-container">
        <vxe-table ref="dTable"
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
                   :loading="DetailsLoading"
                   :data="mainTable4"
                   :mouse-config="{selected: true}"
                   :edit-config="{trigger: 'click', mode: 'row', showStatus: true}">
          <vxe-table-column field="CHECK_TYPE_NAME"
                            :title="$t('MesFirstCheckInfo._76')"
                            :edit-render="{name: '$input', props: {readonly: true}}" />
          <vxe-table-column field="QUANTIZE_TYPE"
                            :title="$t('MesFirstCheckInfo._77')"
                            :edit-render="{name: '$input', props: {readonly: true}}" />
          <vxe-table-column field="CHECK_GIST"
                            :title="$t('MesFirstCheckInfo._78')"
                            :edit-render="{name: '$input', props: {readonly: true}}" />
          <vxe-table-column field="RESULT_VALUE"
                            :title="$t('MesFirstCheckInfo._79')"
                            :edit-render="{name: 'input'}" />
        </vxe-table>
      </div>
      <div style="text-align: center;margin-top:20px">
        <el-button type="primary"
                   @click.prevent="saveClick2">{{$t('ssc_rd.sure')}}</el-button>&nbsp;
        <el-button @click.prevent="cleanClick">{{$t('MesFirstCheckInfo._68')}}</el-button>&nbsp;
      </div>
    </el-dialog>
    <!-- 审核 -->
    <el-dialog v-dialogDrag
               :visible.sync="dialogVisible3"
               :title="$t('MesFirstCheckInfo._80')"
               width="60%"
               :close-on-click-modal="false">
      <el-form ref="AuditForm"
               :model="AuditForm"
               label-width="100px"
               :show-message="false">
        <el-form-item :label="$t('MesFirstCheckInfo._81')"
                      prop="radio">
          <!-- <el-radio-group v-model="AuditForm.RESULT_STATUS" >
            <el-radio style="color: #67c23a;" label="1">合格</el-radio>
            <el-radio style="color: #f56c6c;" label="2">不合格</el-radio>
          </el-radio-group>-->
          <el-radio v-model="AuditForm.RESULT_STATUS"
                    label="1"
                    style="color: #67c23a;">{{$t('MesFirstCheckInfo._72')}}</el-radio>
          <el-radio v-model="AuditForm.RESULT_STATUS"
                    label="2"
                    style="color: #f56c6c;">{{$t('MesFirstCheckInfo._73')}}</el-radio>
        </el-form-item>
        <el-form-item :label="$t('MesFirstCheckInfo._82')">
          <el-input type="textarea"
                    :rows="5"
                    :placeholder="$t('MesFirstCheckInfo._83')"
                    v-model="AuditForm.RESULT_REMARK" />
        </el-form-item>
      </el-form>
      <div style="text-align: center;margin-top:20px">
        <el-button type="primary"
                   @click.prevent="determineClick">{{$t('ssc_rd.sure')}}</el-button>&nbsp;
        <el-button @click.prevent="cancelClick">{{$t('MesFirstCheckInfo._84')}}</el-button>&nbsp;
      </div>
    </el-dialog>
  </d2-container>
</template>

<script>
import customContainerHeader from '@/components/custom-container-header'
import pagination from '@/views/mixin/page'
import {
  LoadData,
  GetLinesListToType,
  GetDepartmentList,
  GetDetailData,
  GetDetailItemData,
  AddOrModifyAsyncSave,
  GetProductionInfo,
  GetItemsData,
  DeleteOneById,
  DeleteDetail,
  AddOrModifyDetailSave,
  AuditData
} from '@/api/MesFirstCheckInfo'
import { mapGetters } from 'vuex'
export default {
  name: 'MesFirstCheckInfo',
  components: {
    customContainerHeader
  },
  mixins: [pagination],
  computed: {
    ...mapGetters(['userinfo'])
  },
  data () {
    return {
      formData: {},
      LineList: [], // 线体
      DepartmentList: [], // 部门
      StatusList: [
        { ID: 0, NAME: '未审核' },
        { ID: 1, NAME: '已审核' }
      ], // 状态
      ResultList: [
        { ID: 0, NAME: '未判定' },
        { ID: 1, NAME: '合格' },
        { ID: 2, NAME: '不合格' }
      ], // 审核结果
      drawer: false,
      loading: false,
      mainTable: [],
      lbloading: false,
      rbloading: false,
      mainTable2: [],
      mainTable3: [],
      dialogVisible: false,
      editForm: {},
      dialogTitle: '',
      validRules: {
        LINE_NAME: [
          { required: true, message: this.$t('MesFirstCheckInfo._42') }
        ],
        DEPARTMENT: [
          { required: true, message: this.$t('MesFirstCheckInfo._44') }
        ],
        BATCH_NO: [
          { required: true, message: this.$t('MesFirstCheckInfo._85') }
        ],
        BATCH_QTY: [
          { required: true, message: this.$t('MesFirstCheckInfo._85') }
        ],
        PART_NO: [
          { required: true, message: this.$t('MesFirstCheckInfo._85') }
        ],
        PART_NAME: [
          { required: true, message: this.$t('MesFirstCheckInfo._85') }
        ],
        PART_DESC: [
          { required: true, message: this.$t('MesFirstCheckInfo._85') }
        ],
        PRODUCT_DATE: [
          { required: true, message: this.$t('MesFirstCheckInfo._85') }
        ],
        NEW_PART: [
          { required: true, message: this.$t('MesFirstCheckInfo._85') }
        ]
      },
      dialogVisible2: false,
      dialogTitle2: '',
      validRules2: {
        PART_SN: [
          {
            required: true,
            message: this.$t('MesFirstCheckInfo._70'),
            trigger: 'blur'
          }
        ],
        radio: [
          {
            required: true,
            message: this.$t('MesFirstCheckInfo._86'),
            trigger: 'blur'
          }
        ]
      },
      checkForm: {},
      DetailsLoading: false,
      mainTable4: [],
      startTime: '',
      endTime: '',
      pickerOptionsStart: {
        disabledDate: time => {
          if (this.formData.END_TIME) {
            return time.getTime() > new Date(this.formData.END_TIME).getTime()
          }
        }
      },
      pickerOptionsEnd: {
        disabledDate: time => {
          if (this.formData.BEGIN_TIME) {
            return (
              time.getTime() <
              new Date(this.formData.BEGIN_TIME).getTime() - 86400000
            )
          }
        }
      },
      AuditForm: {},
      dialogVisible3: false,
      rules: {
        radio: [{ required: true, message: this.$t('MesFirstCheckInfo._87') }]
      },
      rowSTATUS: null,
      isNew: undefined,
      ItemListLength: -1,
      MSTID: undefined,
      MSTID2: undefined,
      resultValue: [],
      needCell: true,
      isEdit: undefined,
      TestItemsId: []
    }
  },
  created () {
    this.getLoadData()
    this.getLinesList()
    this.getDepartmentList()
    this.getMainTable4()
    console.log('Window.location.href:', window.location.href)
  },
  methods: {
    async getDepartmentList () {
      const res = await GetDepartmentList()
      this.DepartmentList = res.Result ? res.Result : []
    },
    async getLinesList () {
      const res = await GetLinesListToType()
      this.LineList = res.Result ? res.Result : []
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
    cellClick (e) {
      console.log('cellClick:', e)
      const data = e.row
      this.MSTID = e.row.ID
      this.rowSTATUS = data.STATUS
      this.AuditForm = { ...data }
      this.checkForm = {
        ID: 0,
        MST_ID: data.ID,
        PART_SN: '',
        RESULT_STATUS: 0,
        REMARK: '',
        CHECK_USER: this.userinfo.USER_NAME
      }
      this.getDetailData(this.MSTID)
    },
    cellClick2 (e) {
      // console.log('cellClick2-----------------', e)
      this.MSTID2 = e.row.ID
      this.getDetailItemData(this.MSTID2)
    },
    // 获取检验明细列表
    async getDetailData (ID) {
      const res = await GetDetailData({ mstId: ID })
      this.mainTable2 = res.Result ? res.Result : []
    },
    // 获取检验项目列表
    async getDetailItemData (ID) {
      const res = await GetDetailItemData({ detailId: ID })
      const data = res.Result
      this.mainTable3 = res.Result ? res.Result : []
      this.TestItemsId = []
      data.map(item => {
        this.TestItemsId.push(item.ID)
      })
      console.log('TestItemsId:', this.TestItemsId)
      console.log('+++++++++++', res.Result)
    },
    searchClick () {
      this.formData.Page = 1
      this.drawer = false
      this.getLoadData()
    },
    handleSizeChange (val) {
      this.formData.Limit = val
      this.getLoadData()
    },
    handleCurrentChange (val) {
      this.formData.Page = val
      this.getLoadData()
    },
    // 搜索重置
    resetListQuery () {
      this.formData = {}
      this.formData.Limit = 15
    },
    // 编辑重置
    cleanClick () {
      this.editForm = {}
      this.checkForm = {}
    },
    addClick () {
      this.dialogVisible = true
      this.isNew = true
      this.editForm = {}
      this.dialogTitle = this.$t('MesFirstCheckInfo._88')
      const nowDate = this.getNowDate(new Date())
      this.editForm.CREATE_TIME = nowDate
      this.editForm.CREATE_USER = this.userinfo.USER_NAME
    },
    // 审核
    AuditClick () {
      if (this.rowSTATUS === null) {
        return this.$message.error(this.$t('MesTongsApply._96'))
      }
      if (this.rowSTATUS !== 0) {
        return this.$message.error(this.$t('MesFirstCheckInfo._89'))
      }
      this.dialogVisible3 = true
    },
    // 审核保存
    async determineClick () {
      console.log('this.AuditForm:', this.AuditForm)
      if (!this.AuditForm.RESULT_STATUS) {
        this.$message.error(this.$t('MesFirstCheckInfo._90'))
        return
      }
      const nowDate = this.getNowDate(new Date())
      this.AuditForm.UPDATE_TIME = nowDate
      this.AuditForm.UPDATE_USER = this.userinfo.USER_NAME
      const res = await AuditData(this.AuditForm)
      this.AuditForm = {}
      if (res.Result) {
        this.dialogVisible3 = false
        this.getLoadData()
        this.$notify({
          title: this.$t('cccn._24'),
          message: this.$t('cccn._25'),
          type: 'success',
          duration: 2000
        })
      } else {
        this.dialogVisible3 = false
        this.getLoadData()
      }
    },
    cancelClick () {
      this.dialogVisible3 = false
    },
    // 主表编辑
    editClick (row) {
      if (row.STATUS !== 0) {
        this.$message.error(this.$t('MesFirstCheckInfo._91'))
        return
      }
      this.dialogVisible = true
      this.isNew = false
      this.dialogTitle = this.$t('MesFirstCheckInfo._92')
      this.editForm = { ...row }
    },
    // 附表编辑
    async editClick2 (row) {
      console.log('编辑2', row.row)
      if (row.row.MST_STATUS !== 0) {
        this.$message.error(this.$t('MesFirstCheckInfo._93'))
        return
      }
      // this.cellClick2(row)
      this.getMainTable4()
      this.isEdit = true
      this.checkForm = { ...row.row }
      console.log('this.checkForm', this.checkForm.RESULT_STATUS)
      const res = await GetDetailItemData({ detailId: row.row.ID })
      res.Result.map((item, index) => {
        this.mainTable4.map((_item, _index) => {
          if (index === _index) {
            _item.RESULT_VALUE = item.RESULT_VALUE
          }
        })
      })
      console.log('this.mainTable4:', this.mainTable4)
      this.dialogTitle2 = this.$t('MesFirstCheckInfo._94')
      this.dialogVisible2 = true
    },
    removeClick (row) {
      if (row.STATUS !== 0) {
        this.$message.error(this.$t('MesFirstCheckInfo._95'))
        return
      }
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
    // 附表删除
    removeClick2 (row) {
      console.log('删除', row.row)
      if (row.row.MST_STATUS !== 0) {
        this.$message.error(this.$t('MesFirstCheckInfo._96'))
        return
      }
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
          const res = await DeleteDetail(row.row.ID)
          if (res.Result) {
            this.$message({
              type: 'success',
              message: this.$t('MesTongsApply._94')
            })
            this.getDetailData(this.MSTID)
            this.getDetailItemData(this.MSTID2)
          }
          this.getDetailData(this.MSTID)
          this.getDetailItemData(this.MSTID2)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('MesTongsApply._95')
          })
        })
    },
    async getMainTable4 () {
      this.mainTable4 = []
      const res = await GetItemsData()
      this.mainTable4 = res || []
    },
    async checkClick (row) {
      if (row.STATUS !== 0) {
        this.$message.error(this.$t('MesFirstCheckInfo._97'))
        return
      }
      this.getMainTable4()
      this.isEdit = false
      this.dialogVisible2 = true
      this.dialogTitle2 = this.$t('MesFirstCheckInfo._98')
    },
    changeLine (e) {
      this.getProductionInfo(e)
    },
    // 根据线别ID获取当前线别生产信息
    async getProductionInfo (ID) {
      const res = await GetProductionInfo({ lineId: ID })
      const data = res.Result
      if (data === null || data === '') {
        this.editForm.BATCH_NO = ''
        this.editForm.BATCH_QTY = ''
        this.editForm.PART_NO = ''
        this.editForm.PART_NAME = ''
        this.editForm.PART_DESC = ''
        this.editForm.PRODUCT_DATE = ''
        this.$message.error(this.$t('MesFirstCheckInfo._99'))
      } else {
        this.editForm.BATCH_NO = data.BATCH_NO
        this.editForm.BATCH_QTY = data.BATCH_QTY
        this.editForm.PART_NO = data.PART_NO
        this.editForm.PART_NAME = data.PART_NAME
        this.editForm.PART_DESC = data.PART_DESC
        this.editForm.PRODUCT_DATE = data.PRODUCT_DATE.split(' ')[0]
      }
      this.$forceUpdate()
      console.log('===============', data)
    },
    // 首五件检验明细保存
    async saveClick2 () {
      if (!this.checkForm.RESULT_STATUS) {
        this.$message.error(this.$t('MesFirstCheckInfo._100'))
        return
      }
      const nowDate = this.getNowDate(new Date())
      this.checkForm.CHECK_TIME = nowDate
      const List = this.$refs.dTable.getTableData().fullData
      this.ItemListLength = List.length
      this.checkForm.ItemList = []
      List.map(item => {
        if (item.RESULT_VALUE) {
          this.ItemListLength -= 1
        }
        this.checkForm.ItemList.push({
          ID: item.ID,
          DETAIL_ID: item.DETAIL_ID,
          ITEM_ID: item.ITEM_ID,
          CHECK_ITEM: item.CHECK_ITEM,
          RESULT_VALUE: item.RESULT_VALUE
        })
      })
      if (this.isEdit) {
        this.TestItemsId.map((item, index) => {
          this.checkForm.ItemList.map((_item, _index) => {
            if (index === _index) {
              _item.ID = item
            }
          })
        })
      }
      if (this.ItemListLength !== 0) {
        return this.$message.error(this.$t('MesFirstCheckInfo._101'))
      }
      const res = await AddOrModifyDetailSave(this.checkForm)
      if (res.Result) {
        this.dialogVisible2 = false
        this.getDetailData(this.MSTID)
        this.getDetailItemData(this.MSTID2)
        this.$notify({
          title: this.$t('cccn._24'),
          message: this.$t('cccn._25'),
          type: 'success',
          duration: 2000
        })
      } else {
        this.dialogVisible2 = false
        this.getDetailData(this.MSTID)
        this.getDetailItemData(this.MSTID2)
      }
    },
    // 编辑保存
    saveClick () {
      this.$refs.editForm.validate(async (valid, errInfo) => {
        if (valid) {
          const nowDate = this.getNowDate(new Date())
          if (this.isNew) {
            this.editForm.CREATE_TIME = nowDate
            this.editForm.CREATE_USER = this.userinfo.USER_NAME
            this.editForm.ORGANIZE_ID = '3'
          }
          this.editForm.UPDATE_TIME = nowDate
          this.editForm.UPDATE_USER = this.userinfo.USER_NAME
          AddOrModifyAsyncSave(this.editForm)
            .then(res => {
              if (res.Result) {
                this.dialogVisible = false
                this.dialogVisible2 = false
                this.getLoadData()
                this.$notify({
                  title: this.$t('crss._20'),
                  message: this.$t('crss._21'),
                  type: 'success',
                  duration: 2000
                })
              }
              this.dialogVisible = false
              this.dialogVisible2 = false
            })
            .catch(() => { })
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
.ConfirmTable-container {
  height: calc(100vh - 60px - 41px - 53px - 300px);
}
.ConfirmPagination {
  margin-top: 10px;
}
.bottomTable-container {
  height: calc(100vh - 60px - 41px - 53px - 300px - 42px - 65px);
}
</style>
<style>
</style>
