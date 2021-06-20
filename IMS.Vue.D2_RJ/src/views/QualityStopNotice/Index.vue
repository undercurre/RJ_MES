<template>
  <custom-container class='QualityStopNotice'>
    <template slot="header">
      <custom-container-header :isExport="false"
                               :isExportTpl="false"
                               :isImport="false">
        <el-select v-model="listQuery.LINE_ID"
                   clearable
                   style="width:200px"
                   :placeholder="$t('QualityStopNotice._1')">
          <el-option v-for="item in CallTypeList"
                     :key="item.LINE_ID"
                     :label="item.LINE_NAME"
                     :value="item.LINE_ID" />
        </el-select>&nbsp;
        <el-input v-model="listQuery.PCB_PN"
                  :placeholder="$t('QualityStopNotice._2')"
                  clearable
                  style="width:200px"
                  @keyup.enter.native="search_but" />&nbsp;
        <el-button type="primary"
                   @click="search_but"
                   icon="el-icon-search">{{ $t("publics.btn.search") }}</el-button>
        <el-button @click="AddClick"
                   type="success"
                   v-if="$btnList.indexOf('MesIpqaStopNoticeAdd') !== -1">{{ $t("publics.btn.add") }}</el-button>
        <el-button type="warning"
                   v-if="$btnList.indexOf('MesIpqaStopNoticeAuditBill') !== -1"
                   @click="AuditClick">{{ $t("QualityStopNotice._3") }}</el-button>
        <el-button type="warning"
                   v-if="$btnList.indexOf('MesIpqaStopNoticeApprovalBill') !== -1"
                   @click="Approved">{{ $t("QualityStopNotice._4") }}</el-button>
      </custom-container-header>
    </template>
    <div style="height:100%">
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
                 :edit-config="{trigger: 'click', mode: 'row', mode: 'cell'}"
                 :loading="listLoading"
                 :data="mainTable"
                 @cell-click="MesCellClick">
        <vxe-table-column show-overflow
                          :title="$t('MesMessageReceiverGroup._4')"
                          min-width="70"
                          type="radio"
                          align="center" />
        <vxe-table-column field="LINE_NAME"
                          :title="$t('QualityStopNotice._5')"
                          align="center"
                          min-width="200" />
        <vxe-table-column field="WO_NO"
                          :title="$t('QualityStopNotice._6')"
                          align="center"
                          min-width="200" />
        <vxe-table-column field="PCB_PN"
                          :title="$t('QualityStopNotice._7')"
                          align="center"
                          min-width="200" />
        <vxe-table-column field="MODEL"
                          :title="$t('QualityStopNotice._8')"
                          align="center"
                          min-width="200" />
        <vxe-table-column field="DESCRIPTION"
                          :title="$t('QualityStopNotice._9')"
                          align="center"
                          min-width="200" />
        <vxe-table-column field="TOTAL_QTY"
                          :title="$t('QualityStopNotice._10')"
                          align="center"
                          min-width="140" />
        <vxe-table-column field="TOTAL_QTY"
                          :title="$t('QualityStopNotice._11')"
                          align="center"
                          min-width="160" />
        <vxe-table-column field="CREATE_DEP_NAME"
                          :title="$t('QualityStopNotice._12')"
                          align="center"
                          min-width="180" />
        <vxe-table-column field="CREATE_USER"
                          :title="$t('QualityStopNotice._13')"
                          align="center"
                          min-width="100" />
        <vxe-table-column field="STATUS"
                          fixed="right"
                          :title="$t('QualityStopNotice._14')"
                          align="center"
                          min-width="140">
          <template slot-scope="scope">
            <span v-if="scope.row.STATUS == 0">{{ $t('QualityStopNotice._15') }}</span>
            <span v-if="scope.row.STATUS == 1">{{ $t('QualityStopNotice._16') }}</span>
            <span v-if="scope.row.STATUS == 2">{{ $t('QualityStopNotice._17') }}</span>
            <span v-else></span>
          </template>
        </vxe-table-column>

        <vxe-table-column field="AUDIT_USER"
                          :title="$t('QualityStopNotice._18')"
                          align="center"
                          min-width="100" />
        <vxe-table-column field="AUDIT_CONTENT"
                          :title="$t('QualityStopNotice._44')"
                          align="center"
                          min-width="200" />
        <vxe-table-column field="AUDIT_TIME"
                          :title="$t('QualityStopNotice._19')"
                          align="center"
                          min-width="200" />
        <vxe-table-column field="APPROVAL_USER"
                          min-width="140"
                          :title="$t('QualityStopNotice._20')"
                          align="center" />
        <vxe-table-column field="APPROVAL_CONTENT"
                          :title="$t('QualityStopNotice._45')"
                          align="center"
                          min-width="200" />
        <vxe-table-column field="APPROVAL_TIME"
                          min-width="200"
                          :title="$t('QualityStopNotice._21')"
                          align="center" />
        <vxe-table-column min-width="200"
                          :title="$t('cccn._11')"
                          align="center"
                          fixed="right">
          <template slot-scope="scope">
            <el-button type="success"
                       v-if="$btnList.indexOf('MesIpqaStopNoticeSaveData') !== -1"
                       @click.prevent="edit_but(scope.row)">{{$t('cccn._12')}}</el-button>
            <el-button type="danger"
                       v-if="$btnList.indexOf('MesIpqaStopNoticeDeleteOneById') !== -1"
                       @click.prevent="remove_but(scope.row)">{{$t('cccn._13')}}</el-button>
          </template>
        </vxe-table-column>
      </vxe-table>
    </div>
    <template slot="footer">
      <el-pagination :current-page="listQuery.Page"
                     :page-size="listQuery.Limit"
                     :page-sizes="[15,25,35,45]"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange" />
    </template>
    <!-- 添加和编辑 -->
    <el-dialog v-dialogDrag
               width="90%"
               top="0"
               :title="addorediText"
               :visible.sync="innerVisible"
               :close-on-click-modal="false"
               append-to-body
               class="call-dialog">
      <el-form ref="callVal"
               :show-message="false"
               :model="callVal"
               :rules="rules"
               class="callVal-form"
               label-width="150px">
        <el-form-item :label="$t('QualityStopNotice._22')+'：'"
                      prop="PRODUCTION_DATE"
                      style="flex: 0 0 33.3333%">
          <el-date-picker style="width:100%"
                          v-model="callVal.PRODUCTION_DATE"
                          type="datetime"
                          :disabled="MstStatus"
                          value-format="yyyy-MM-dd"
                          format="yyyy-MM-dd"
                          placeholder=" " />
        </el-form-item>
        <el-form-item :label="$t('QualityStopNotice._5')+'：'"
                      prop="LINE_ID"
                      style="flex: 0 0 33.3333%">
          <el-select v-model="callVal.LINE_ID"
                     style="width:100%"
                     :disabled="MstStatus"
                     @change="lineChang"
                     placeholder=" ">
            <el-option v-for="item in CallTypeList"
                       :key="item.LINE_ID"
                       :label="item.LINE_NAME"
                       :value="item.LINE_ID" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('QualityStopNotice._6')+'：'"
                      prop="WO_NO"
                      style="flex: 0 0 33.3333%;">
          <div style="display: flex;">
            <el-input v-model="callVal.WO_NO"
                      style="width:100%"
                      :disabled="MstStatus"
                      @keyup.enter.native="WONOClick"
                      placeholder=" " />
            <el-button type="primary"
                       icon="el-icon-search"
                       @click="WONOClick"></el-button>
          </div>
        </el-form-item>
        <el-form-item :label="$t('QualityStopNotice._7')+'：'"
                      style="flex: 0 0 33.3333%">
          <el-input v-model="callVal.PCB_PN"
                    disabled
                    placeholder=" " />
        </el-form-item>
        <el-form-item :label="$t('QualityStopNotice._8')+'：'"
                      style="flex: 0 0 33.3333%">
          <el-input v-model="callVal.MODEL"
                    disabled
                    placeholder=" " />
        </el-form-item>
        <el-form-item :label="$t('QualityStopNotice._9')+'：'"
                      style="flex: 0 0 33.3333%">
          <el-input v-model="callVal.DESCRIPTION"
                    disabled
                    placeholder=" " />
        </el-form-item>
        <el-form-item :label="$t('QualityStopNotice._10')+'：'"
                      prop="TOTAL_QTY"
                      style="flex: 0 0 33.3333%">
          <el-input v-model="callVal.TOTAL_QTY"
                    type="number"
                    :disabled="MstStatus"
                    placeholder=" " />
        </el-form-item>
        <el-form-item :label="$t('QualityStopNotice._11')+'：'"
                      prop="FINISHED_QTY"
                      style="flex: 0 0 33.3333%">
          <el-input v-model="callVal.FINISHED_QTY"
                    type="number"
                    :disabled="MstStatus"
                    placeholder=" " />
        </el-form-item>
        <el-form-item :label="$t('QualityStopNotice._12')+'：'"
                      prop="CREATE_DEP_ID"
                      style="flex: 0 0 33.3333%">
          <el-select v-model="callVal.CREATE_DEP_ID"
                     style="width:100%"
                     :disabled="MstStatus"
                     placeholder=" ">
            <el-option v-for="item in DepartmentList"
                       :key="item.ID"
                       :label="item.DEP_NAME"
                       :value="item.ID" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('QualityStopNotice._13')+'：'"
                      prop="CREATE_USER"
                      style="flex: 0 0 33.3333%">
          <div style="display: flex;">
            <el-input v-model="callVal.CREATE_USER"
                      disabled
                      placeholder=" " />
            <el-button type="primary"
                       :disabled="MstStatus"
                       @click="CrateClick(1)">{{$t('QualityStopNotice._23')}}</el-button>
          </div>
        </el-form-item>
        <el-form-item :label="$t('QualityStopNotice._24')+'：'"
                      style="flex: 0 0 33.3333%">
          <el-select v-model="callVal.RECEIPT_DEP_ID"
                     style="width:100%"
                     :disabled="MstStatus"
                     placeholder=" ">
            <el-option v-for="item in DepartmentList"
                       :key="item.ID"
                       :label="item.DEP_NAME"
                       :value="item.ID" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('QualityStopNotice._25')+'：'"
                      style="flex: 0 0 33.3333%">

          <div style="display: flex;">
            <el-input v-model="callVal.RECEIPT_USER"
                      disabled
                      placeholder=" " />
            <el-button type="primary"
                       :disabled="MstStatus"
                       @click="CrateClick(2)">{{$t('QualityStopNotice._23')}}</el-button>
          </div>
        </el-form-item>
        <el-form-item :label="$t('QualityStopNotice._26')+'：'"
                      prop="FEEDBACK_TIME"
                      style="flex: 0 0 33.3333%">
          <el-date-picker v-model="callVal.FEEDBACK_TIME"
                          style="width: 100%"
                          :disabled="MstStatus"
                          type="datetime"
                          format="yyyy-MM-dd HH:mm:ss"
                          :default-value="new Date()"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          placeholder=" "></el-date-picker>
        </el-form-item>
        <el-form-item :label="$t('QualityStopNotice._27')+'：'"
                      style="flex: 0 0 33.3333%">
          <el-date-picker v-model="callVal.PRACTICAL_TIME"
                          style="width: 100%"
                          :disabled="MstStatus"
                          type="datetime"
                          format="yyyy-MM-dd HH:mm:ss"
                          :default-value="new Date()"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          placeholder=" "></el-date-picker>
        </el-form-item>

        <el-form-item :label="$t('QualityStopNotice._28')+'：'"
                      prop="EXCEPTION_DESCRIPTION"
                      style="flex: 0 0 100%;border-top: 2px solid #DCDFE6;padding-top: 10px;">
          <el-input v-model="callVal.EXCEPTION_DESCRIPTION"
                    :disabled="MstStatus"
                    type="textarea"
                    placeholder=" " />
        </el-form-item>
        <el-form-item :label="$t('QualityStopNotice._29')+'：'"
                      style="flex: 0 0 100%;">
          <el-input v-model="callVal.EXCEPTION_FAIL_INFO"
                    :disabled="MstStatus"
                    type="textarea"
                    placeholder=" " />
        </el-form-item>
        <el-form-item :label="$t('QualityStopNotice._30')+'：'"
                      style="flex: 0 0 100%;">
          <el-input v-model="callVal.EXCEPTION_FAIL_RATE"
                    :disabled="MstStatus"
                    type="textarea"
                    placeholder=" " />
        </el-form-item>

        <el-form-item label="IPQA："
                      style="flex: 0 0 50%">
          <div style="display: flex;">
            <el-input v-model="callVal.EXCEPTION_IPQA"
                      disabled
                      placeholder=" " />
            <el-button type="primary"
                       :disabled="MstStatus"
                       @click="CrateClick(3)">{{$t('QualityStopNotice._23')}}</el-button>
          </div>
        </el-form-item>
        <el-form-item :label="$t('QualityStopNotice._31')+'：'"
                      style="flex: 0 0 50%">
          <div style="display: flex;">
            <el-input v-model="callVal.EXCEPTION_IPQA_HEAD"
                      disabled
                      placeholder=" " />
            <el-button type="primary"
                       :disabled="MstStatus"
                       @click="CrateClick(4)">{{$t('QualityStopNotice._23')}}</el-button>
          </div>
        </el-form-item>
        <el-form-item :label="$t('QualityStopNotice._32')+'：'"
                      style="flex: 0 0 100%;border-top: 2px solid #DCDFE6;padding-top: 10px;">
          <el-input v-model="callVal.ANALYSIS_OPINION"
                    :disabled="MstStatus"
                    type="textarea"
                    placeholder=" " />
        </el-form-item>

        <el-form-item :label="$t('QualityStopNotice._33')+'：'"
                      style="flex: 0 0 100%;">
          <el-checkbox-group v-model="callVal.ANALYSIS_REASON">
            <el-checkbox :label="item.LOOKUP_CODE"
                         :disabled="MstStatus"
                         v-for="item in CauseAnalysisList"
                         :value="item.LOOKUP_CODE"
                         :key="item.LOOKUP_CODE">{{item.CHINESE}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item :label="$t('QualityStopNotice._34')+'：'"
                      style="flex: 0 0 50%;">
          <div style="display: flex;">
            <el-input v-model="callVal.ANALYSIS_QE"
                      disabled
                      placeholder=" " />
            <el-button type="primary"
                       :disabled="MstStatus"
                       @click="CrateClick(5)">{{$t('QualityStopNotice._23')}}</el-button>
          </div>
        </el-form-item>
        <el-form-item :label="$t('QualityStopNotice._35')+'：'"
                      style="flex: 0 0 50%;">
          <div style="display: flex;">
            <el-input v-model="callVal.ANALYSIS_QE_HEAD"
                      disabled
                      placeholder=" " />
            <el-button type="primary"
                       :disabled="MstStatus"
                       @click="CrateClick(6)">{{$t('QualityStopNotice._23')}}</el-button>
          </div>
        </el-form-item>
        <el-form-item :label="$t('QualityStopNotice._36')+'：'"
                      style="flex: 0 0 100%;border-top: 2px solid rgb(220, 223, 230);
    padding-top: 10px;">
          <el-input v-model="callVal.SOLUTION_METHOD"
                    type="textarea"
                    :disabled="MstStatus"
                    placeholder=" " />
        </el-form-item>
        <el-form-item :label="$t('QualityStopNotice._37')+'：'"
                      style="flex: 0 0 30%;">
          <!-- <el-input v-model="callVal.SOLUTION_SIGN"
                    placeholder=" " /> -->
          <div style="display: flex;">
            <el-input v-model="callVal.SOLUTION_SIGN"
                      disabled
                      placeholder=" " />
            <el-button type="primary"
                       :disabled="MstStatus"
                       @click="CrateClick(7)">{{$t('QualityStopNotice._23')}}</el-button>
          </div>
        </el-form-item>
        <el-form-item :label="$t('QualityStopNotice._38')+'：'"
                      style="flex: 0 0 30%;">
          <el-date-picker style="width:100%"
                          :disabled="MstStatus"
                          v-model="callVal.SOLUTION_DATE"
                          type="datetime"
                          value-format="yyyy-MM-dd"
                          format="yyyy-MM-dd"
                          placeholder=" " />
        </el-form-item>
        <el-form-item :label="$t('QualityStopNotice._39')+'：'"
                      style="flex: 0 0 100%;border-top: 2px solid rgb(220, 223, 230);
    padding-top: 10px;">
          <el-input v-model="callVal.EFFECT_TRACKING"
                    type="textarea"
                    :disabled="MstStatus"
                    placeholder=" " />
        </el-form-item>
        <el-form-item label="IPQA："
                      style="flex: 0 0 30%;">
          <div style="display: flex;">
            <el-input v-model="callVal.EFFECT_IPQA"
                      disabled
                      placeholder=" " />
            <el-button type="primary"
                       :disabled="MstStatus"
                       @click="CrateClick(8)">{{$t('QualityStopNotice._23')}}</el-button>
          </div>
        </el-form-item>
        <el-form-item :label="$t('QualityStopNotice._38')+'：'"
                      style="flex: 0 0 30%;">
          <el-date-picker style="width:100%"
                          :disabled="MstStatus"
                          v-model="callVal.EFFECT_DATE"
                          type="datetime"
                          value-format="yyyy-MM-dd"
                          format="yyyy-MM-dd"
                          placeholder=" " />
        </el-form-item>

        <el-form-item :label="$t('QualityStopNotice._40')+'：'"
                      style="flex: 0 0 100%;border-top: 2px solid rgb(220, 223, 230);
    padding-top: 10px;">
          <el-input v-model="callVal.RESUME_NOTICE"
                    type="textarea"
                    placeholder=" " />
        </el-form-item>
        <el-form-item :label="$t('QualityStopNotice._41')+'：'"
                      prop="FILE_CODE"
                      style="flex: 0 0 100%;border-top: 2px solid rgb(220, 223, 230);
    padding-top: 10px;">
          <el-input v-model="callVal.FILE_CODE"
                    :disabled="MstStatus"
                    placeholder=" " />
        </el-form-item>
      </el-form>
      <div style="text-align: center;width: 100%;">
        <el-button type="success"
                   @click="shout_but('callVal')">&nbsp;{{$t('cccn._17')}}&nbsp;</el-button>
        <el-button @click="innerVisible=false">&nbsp;{{$t('publics.tips.cancel')}}&nbsp;</el-button>
      </div>
    </el-dialog>
    <!-- 审核和批准 -->
    <el-dialog v-dialogDrag
               width="40%"
               :title="AuditText"
               :visible.sync="AuditVisible"
               :close-on-click-modal="false"
               append-to-body
               class="call-dialog">
      <el-form ref="AuditForm"
               :show-message="false"
               :model="AuditForm"
               label-width="120px">
        <el-form-item :label="$t('QualityStopNotice._44')+'：'"
                      prop="Chinese"
                      style="width:100%;"
                      v-if="AuditForm.STAT == 1">
          <el-input v-model="AuditForm.AUDIT_CONTENT"
                    type="textarea"
                    placeholder=" " />
        </el-form-item>
        <el-form-item :label="$t('QualityStopNotice._45')+'：'"
                      prop="Chinese"
                      style="width:100%;"
                      v-else>
          <el-input v-model="AuditForm.APPROVAL_CONTENT"
                    type="textarea"
                    placeholder=" " />
        </el-form-item>
        <div style="text-align: center;width: 100%;">
          <el-button type="success"
                     @click="AuditShout('callVal')">&nbsp;{{$t('cccn._17')}}&nbsp;</el-button>
          <el-button @click="AuditVisible=false">&nbsp;{{$t('publics.tips.cancel')}}&nbsp;</el-button>
        </div>
      </el-form>
    </el-dialog>
    <!-- 选择用户 -->
    <el-dialog v-dialogDrag
               width="60%"
               :title="$t('QualityStopNotice._42')"
               :visible.sync="ManagVisible"
               :close-on-click-modal="false"
               append-to-body
               class="call-dialog">
      <el-input v-model="ManagForm.Key"
                :placeholder="$t('QualityStopNotice._43')"
                clearable
                style="width:200px"
                @keyup.enter.native="Managsearch" />&nbsp;
      <el-button type="primary"
                 @click="Managsearch"
                 icon="el-icon-search">{{  $t("publics.btn.search") }}</el-button>
      <div class="Manag-table-container">
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
                   :edit-config="{trigger: 'click', mode: 'row', mode: 'cell'}"
                   :data="ManagTable"
                   @cell-click="ManagCellClick">
          <vxe-table-column show-overflow
                            :title="$t('MesMessageReceiverGroup._4')"
                            min-width="60"
                            type="radio"
                            align="center" />
          <vxe-table-column prop="User_Name"
                            :label="$t('QualityStopNotice._46')"
                            align="center" />
          <vxe-table-column prop="Nick_Name"
                            :label="$t('QualityStopNotice._47')"
                            align="center" />
          <vxe-table-column prop="Mobile"
                            :label="$t('QualityStopNotice._48')"
                            align="center" />
          <vxe-table-column prop="Work_Wechat_Id"
                            :label="$t('QualityStopNotice._49')"
                            align="center" />
        </vxe-table>
      </div>
      <el-pagination :current-page="ManagForm.Page"
                     :page-size="ManagForm.Limit"
                     :page-sizes="[15,25,35,45]"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="Managtotal"
                     @size-change="ManagSizeChange"
                     @current-change="ManagCurrentChange" />
      <div style="text-align: center;width: 100%;">
        <el-button type="success"
                   @click="ManagShout('callVal')">&nbsp;{{$t('cccn._17')}}&nbsp;</el-button>
        <el-button @click="ManagVisible=false">&nbsp;{{$t('publics.tips.cancel')}}&nbsp;</el-button>
      </div>
    </el-dialog>
  </custom-container>
</template>

<script>
import {
  LoadData,
  GetLinesList,
  AuditBill,
  ApprovalBill,
  DeleteOneById,
  SaveData,
  GetDepartmentList,
  GetAnalysisOpinionList,
  GetPartDataByWoNo,
  GetWoNoByLineId,
  ManagLoadData
} from '@/api/MesIpqaStopNotice'
import {
  mapGetters
} from 'vuex'
import customContainerHeader from '@/components/custom-container-header'
import customContainer from '@/components/custom-container'
export default {
  name: 'QualityStopNotice',
  components: {
    customContainerHeader,
    customContainer
  },
  data () {
    return {
      listLoading: false,
      CallTypeList: [],
      listQuery: {
        Page: 1, // 当前页
        Limit: 15, // 分页大小
        LINE_ID: '', // 线别
        PCB_PN: '' // 料号
      },
      total: 0,
      mainTable: [],
      innerVisible: false,
      // 审核批准
      AuditText: '',
      AuditVisible: false,
      AuditForm: {
        ID: 0,
        APPROVAL_USER: '',
        AUDIT_USER: '', /// 批准人(必填)
        AUDIT_CONTENT: undefined,
        APPROVAL_CONTENT: undefined, // 批准内容
        STAT: 1,
        STATU: 0
      },
      DepartmentList: [],
      CauseAnalysisList: [],
      callVal: {
      },
      addorediText: '',
      // 选择用户
      ManagForm: {
        Page: 1,
        Limit: 15,
        Key: ''
      },
      Managtotal: 0,
      ManagTable: [],
      ManagVisible: false,
      ManagSTATUS: 0,
      ManagObj: null,
      rules: {
        PRODUCTION_DATE: [{
          required: true,
          message: this.$t('QualityStopNotice._50'),
          trigger: 'change'
        }],
        LINE_ID: [{
          required: true,
          message: this.$t('QualityStopNotice._1'),
          trigger: 'change'
        }],
        WO_NO: [{
          required: true,
          message: this.$t('QualityStopNotice._51'),
          trigger: 'change'
        }],
        TOTAL_QTY: [{
          required: true,
          message: this.$t('QualityStopNotice._52'),
          trigger: 'change'
        }],
        FINISHED_QTY: [{
          required: true,
          message: this.$t('QualityStopNotice._53'),
          trigger: 'change'
        }],
        EXCEPTION_DESCRIPTION: [{
          required: true,
          message: this.$t('QualityStopNotice._54'),
          trigger: 'change'
        }],
        CREATE_USER: [{
          required: true,
          message: this.$t('QualityStopNotice._55'),
          trigger: 'change'
        }],
        CREATE_DEP_ID: [{
          required: true,
          message: this.$t('QualityStopNotice._56'),
          trigger: 'change'
        }],
        FEEDBACK_TIME: [{
          required: true,
          message: this.$t('QualityStopNotice._57'),
          trigger: 'change'
        }],
        FILE_CODE: [{
          required: true,
          message: this.$t('QualityStopNotice._58'),
          trigger: 'change'
        }]
      },
      MstStatus: false
    }
  },
  computed: {
    ...mapGetters(['userinfo'])
  },
  created () {
    this.GetLinesList()
    this.GetDepartmentList()
    this.GetAnalysisOpinionList()
    this.getManagLoadData()
    this.getLoadData()
    this.AuditForm.AUDIT_USER = this.userinfo.USER_NAME
    this.AuditForm.APPROVAL_USER = this.userinfo.USER_NAME
  },
  methods: {
    // 获取下拉列表
    async GetLinesList () {
      const res = await GetLinesList({ ORGANIZE_ID: this.userinfo.ORGANIZE_ID })
      if (res.Result) {
        console.log(res.Result)
        this.CallTypeList = res.Result
      }
    },
    // 获取部门
    async GetDepartmentList () {
      const res = await GetDepartmentList()
      if (res.Result) {
        console.log(res.Result)
        this.DepartmentList = res.Result
      }
    },
    // 获取分析原因
    async GetAnalysisOpinionList () {
      const res = await GetAnalysisOpinionList()
      if (res.Result) {
        console.log(res.Result, '获取分析原因')
        this.CauseAnalysisList = res.Result
      }
    },

    // 获取表格列表
    async getLoadData () {
      this.listLoading = true
      const res = await LoadData(this.listQuery)
      const data = res.Result
      // console.log(data, '获取表格列表')
      if (data) {
        this.mainTable = data
        this.total = res.TotalCount
      }
      this.listLoading = false
    },
    // 搜索
    search_but () {
      this.listQuery.Page = 1
      this.getLoadData()
    },
    handleSizeChange (val) {
      this.listQuery.Limit = val
      this.getLoadData()
    },
    handleCurrentChange (val) {
      this.listQuery.Page = val
      this.getLoadData()
    },
    // 选中
    MesCellClick (e) {
      console.log(e, '选中')
      this.AuditForm.ID = e.row.ID
      this.AuditForm.STATU = e.row.STATUS
    },
    // 审核
    AuditClick () {
      console.log(this.AuditForm, '(this.AuditForm')
      if (this.AuditForm.ID === 0) {
        this.$message.error(this.$t('QualityStopNotice._59'))
        return
      }
      if (this.AuditForm.STATU === 2) {
        this.$message.error(this.$t('QualityStopNotice._60'))
        return
      }
      this.AuditText = this.$t('QualityStopNotice._3')
      this.AuditForm.STAT = 1
      this.AuditForm.APPROVAL_CONTENT = ''
      this.AuditVisible = true
    },
    // 批准
    Approved () {
      if (this.AuditForm.ID === 0) {
        this.$message.error(this.$t('QualityStopNotice._61'))
        return
      }
      if (this.AuditForm.STATU !== 1) {
        this.$message.error(this.$t('QualityStopNotice._69'))
        return
      }
      this.AuditText = this.$t('QualityStopNotice._4')
      this.AuditForm.STAT = 2
      this.AuditForm.APPROVAL_CONTENT = ''
      this.AuditVisible = true
    },
    // 审核批准确定
    async AuditShout () {
      var contit = ''
      if (this.AuditForm.STAT === 1) {
        contit = this.$t('QualityStopNotice._63')
      } else {
        contit = this.$t('QualityStopNotice._64')
      }
      this.$confirm(contit, this.$t('cccn._21'), {
        confirmButtonText: this.$t('cccn._22'),
        cancelButtonText: this.$t('cccn._23'),
        type: 'warning'
      }).then(async () => {
        var response = null
        if (this.AuditForm.STAT === 1) {
          response = await AuditBill(this.AuditForm)
        } else {
          response = await ApprovalBill(this.AuditForm)
        }
        if (response.Result) {
          this.$notify({
            title: this.$t('cccn._24'),
            message: this.$t('cccn._25'),
            type: 'success',
            duration: 2000
          })
          this.AuditVisible = false
          this.getLoadData()
        } else {
          this.getLoadData()
        }
      })
    },
    // 删除
    remove_but (row) {
      if (row.STATUS !== 0) {
        this.$message.error(this.$t('QualityStopNotice._65'))
        return
      }
      this.$confirm(this.$t('cccn._26'), this.$t('cccn._21'), {
        confirmButtonText: this.$t('cccn._22'),
        cancelButtonText: this.$t('cccn._23'),
        type: 'warning'
      }).then(response => {
        DeleteOneById(row.ID).then(response => {
          if (response.Result) {
            this.$notify({
              title: this.$t('cccn._24'),
              message: this.$t('cccn._25'),
              type: 'success',
              duration: 2000
            })
            this.getLoadData()
          } else {
            this.getLoadData()
          }
        })
      })
    },
    // 编辑
    edit_but (row) {
      if (row.STATUS !== 0) {
        this.MstStatus = true
      } else {
        this.MstStatus = false
      }
      this.addorediText = this.$t('QualityStopNotice._66')
      this.callVal = {}
      this.callVal = row
      if (!this.callVal.ANALYSIS_REASON) {
        this.callVal.ANALYSIS_REASON = []
      } else {
        // console.log(typeof (row.ANALYSIS_REASON), 'row.ANALYSIS_REASON')
        if (typeof row.ANALYSIS_REASON === 'string') {
          this.callVal.ANALYSIS_REASON = row.ANALYSIS_REASON.split(',').map(Number)
        }
      }
      console.log(this.callVal.ANALYSIS_REASON, 'this.callVal.ANALYSIS_REASON')
      this.innerVisible = true
    },
    // 添加
    AddClick () {
      this.MstStatus = false
      this.callVal = {
        ID: 0,
        ORGANIZE_ID: ' ',
        LINE_ID: '',
        PRODUCTION_DATE: '',
        WO_NO: '',
        PCB_PN: '',
        MODEL: '',
        DESCRIPTION: ' ',
        TOTAL_QTY: '',
        FINISHED_QTY: '',
        CREATE_DEP_ID: '',
        CREATE_USER: '',
        // CREATE_TIME: '',
        RECEIPT_DEP_ID: '',
        RECEIPT_USER: '',
        FEEDBACK_TIME: '',
        PRACTICAL_TIME: '',
        EXCEPTION_DESCRIPTION: '',
        EXCEPTION_FAIL_INFO: '',
        EXCEPTION_FAIL_RATE: '',
        EXCEPTION_IPQA: '',
        EXCEPTION_IPQA_HEAD: '',
        ANALYSIS_OPINION: '',
        ANALYSIS_REASON: '',
        ANALYSIS_QE: '',
        ANALYSIS_QE_HEAD: '',
        SOLUTION_METHOD: '',
        SOLUTION_SIGN: '',
        SOLUTION_DATE: '',
        EFFECT_TRACKING: '',
        EFFECT_IPQA: '',
        EFFECT_DATE: '',
        RESUME_NOTICE: '',
        FILE_CODE: '',
        STATUS: 0,
        AUDIT_USER: '',
        AUDIT_TIME: '',
        AUDIT_CONTENT: '',
        APPROVAL_USER: '',
        APPROVAL_TIME: '',
        APPROVAL_CONTENT: '',
        UPDATE_USER: this.userinfo.USER_NAME
        // UPDATE_TIME: ''
      }
      this.callVal.ID = 0
      this.callVal.ANALYSIS_REASON = []
      this.addorediText = this.$t('publics.btn.add')
      this.innerVisible = true
    },
    // 搜索工单号
    async WONOClick () {
      if (!this.callVal.WO_NO) {
        this.$message.error(this.$t('QualityStopNotice._51'))
        return
      }
      const res = await GetPartDataByWoNo(this.callVal.WO_NO)
      var data = res.Result
      if (data) {
        this.callVal.PCB_PN = data.PART_NO
        this.callVal.MODEL = data.PART_NAME
        this.callVal.DESCRIPTION = data.PART_DESC
        console.log(data, '搜索工单号')
      } else {
        this.callVal.WO_NO = ''
        this.callVal.PCB_PN = ''
        this.callVal.MODEL = ''
        this.callVal.DESCRIPTION = ''
        this.$message.error(this.$t('QualityStopNotice._67'))
      }
    },
    // 选择线体获取工单
    async lineChang () {
      const res = await GetWoNoByLineId(this.callVal.LINE_ID)
      var data = res.Result
      if (data) {
        this.callVal.WO_NO = data
        this.WONOClick()
        console.log(res.Result, '搜索工单号')
      } else {
        this.callVal.WO_NO = ''
        this.callVal.PCB_PN = ''
        this.callVal.MODEL = ''
        this.callVal.DESCRIPTION = ''
        this.$message.error(this.$t('QualityStopNotice._68'))
      }
    },
    // 选择用户
    async getManagLoadData () {
      const res = await ManagLoadData(this.ManagForm)
      var data = res.Result
      if (data) {
        this.ManagTable = data || []
        this.Managtotal = res.TotalCount
        console.log(res.Result, 'res.Result')
      }
    },
    // 搜索
    Managsearch () {
      this.ManagForm.Page = 1
      this.getManagLoadData()
    },
    ManagSizeChange (val) {
      this.ManagForm.Limit = val
      this.getManagLoadData()
    },
    ManagCurrentChange (val) {
      this.ManagForm.Page = val
      this.getManagLoadData()
    },
    // 选中
    ManagCellClick (e) {
      this.ManagObj = e.row
    },
    // 确定
    ManagShout () {
      if (this.ManagSTATUS === 1) {
        this.callVal.CREATE_USER = this.ManagObj.Nick_Name
      }
      if (this.ManagSTATUS === 2) {
        this.callVal.RECEIPT_USER = this.ManagObj.Nick_Name
      }
      if (this.ManagSTATUS === 3) {
        this.callVal.EXCEPTION_IPQA = this.ManagObj.Nick_Name
      }
      if (this.ManagSTATUS === 4) {
        this.callVal.EXCEPTION_IPQA_HEAD = this.ManagObj.Nick_Name
      }
      if (this.ManagSTATUS === 5) {
        this.callVal.ANALYSIS_QE = this.ManagObj.Nick_Name
      }
      if (this.ManagSTATUS === 6) {
        this.callVal.ANALYSIS_QE_HEAD = this.ManagObj.Nick_Name
      }
      if (this.ManagSTATUS === 7) {
        this.callVal.SOLUTION_SIGN = this.ManagObj.Nick_Name
      }
      if (this.ManagSTATUS === 8) {
        this.callVal.EFFECT_IPQA = this.ManagObj.Nick_Name
      }

      this.ManagVisible = false
    },
    //
    CrateClick (e) {
      this.ManagSTATUS = e
      this.ManagVisible = true
    },
    // 确定
    shout_but (formName) {
      // console.log(this.CauseAnaList, 'CauseAnaList')
      // console.log(this.callVal, 'this.callVal')

      // return
      this.$refs.callVal.validate(
        async (valid, errInfo) => {
          if (valid) {
            var FormData = {
              InsertRecords: [],
              UpdateRecords: [],
              RemoveRecords: []
            }
            this.callVal.ANALYSIS_REASON = this.callVal.ANALYSIS_REASON.toString()
            console.log(JSON.stringify(this.callVal))
            if (this.callVal.ID === 0) {
              FormData.InsertRecords.push(this.callVal)
            } else {
              FormData.UpdateRecords.push(this.callVal)
            }
            const res = await SaveData(FormData)
            if (res.Result) {
              this.innerVisible = false
              this.getLoadData()
              this.$notify({
                title: this.$t('cccn._24'),
                message: this.$t('cccn._25'),
                type: 'success',
                duration: 2000
              })
            } else {
              this.innerVisible = false
              this.getLoadData()
            }
          } else {
            try {
              Object.keys(errInfo).forEach(item => {
                this.$message.error(errInfo[item][0].message)
                throw new Error(new Date().toLocaleString())
              })
            } catch { }
          }
        })
    }
    // 重置
    // reset_but () {
    //   this.callVal.CALL_CODE = ''
    //   this.callVal.Chinese = ''
    // }
  }
}

</script>
<style lang='scss' scoped>
//@import url(''); 引入公共css类
.callVal-form {
  display: flex;
  flex-wrap: wrap;
  height: calc(100vh - 55px - 40px - 55px);
  overflow-x: hidden;
}
.Manag-table-container {
  margin-top: 15px;
  height: calc(100vh - 55px - 220px - 55px);
}
</style>
