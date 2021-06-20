<template>
  <d2-container class="CallRecord">
    <template slot="header">
      <custom-container-header :isExport="false"
                               :isExportTpl="false"
                               :isImport="false"
                               :isFull="true">
        <el-select v-model="listQuery.OPERATION_LINE_ID"
                   clearable
                   style="width:150px"
                   :placeholder="$t('crp.p_tb')"
                   class="common-top">
          <el-option v-for="item in LinesList"
                     :key="item.Id"
                     :label="item.OPERATION_LINE_NAME"
                     :value="item.Id" />
        </el-select>&nbsp;
        <el-select v-model="listQuery.STATUS"
                   clearable
                   style="width:150px"
                   :placeholder="$t('crp.p_ss')"
                   class="common-top">
          <el-option v-for="item in StatusList"
                     :key="item.Value"
                     :label="item.Text"
                     :value="item.Value" />
        </el-select>&nbsp;
        <el-select v-model="listQuery.CALL_TYPE_CODE"
                   clearable
                   style="width:150px"
                   :placeholder="$t('crp.p_sus')"
                   class="common-top">
          <el-option v-for="item in CallTypeList"
                     :key="item.LOOKUP_CODE"
                     :label="item.CHINESE"
                     :value="item.LOOKUP_CODE" />
        </el-select>&nbsp;
        <el-date-picker v-model="calldate"
                        v-loading="loading"
                        type="daterange"
                        style="width:230px;margin-right:10px"
                        :start-placeholder="$t('crp.stdt')"
                        :end-placeholder="$t('crp.eddt')"
                        align="right"
                        class="common-top"
                        value-format="yyyy-MM-dd" />&nbsp;
        <el-input v-model="listQuery.Key"
                  :placeholder="$t('crp.p_ng')"
                  clearable
                  style="width:190px"
                  class="common-top" />&nbsp;
        <el-button type="success"
                   icon="el-icon-search"
                   class="common-top"
                   @click.prevent="doFilter">{{ $t('crp.sea') }}</el-button>
      </custom-container-header>
    </template>
    <div class="CallRecord-tanble">
      <el-table stripe
                :data="mainTable"
                style="width: 100%"
                highlight-current-row
                height="100%"
                border
                :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                @row-click="DetailsClick">
        <el-table-column :label="$t('crp.tb_1')"
                         width="80"
                         align="center"
                         fixed>
          <template slot-scope="scope">
            <el-radio v-model="radio"
                      class="radio CallRecord-tanble-radio"
                      :label="scope.$index" />
          </template>
        </el-table-column>
        <el-table-column prop="CALL_NO"
                         :label="$t('crp.tb_2')"
                         align="center"
                         width="150"
                         :show-overflow-tooltip="true" />
        <el-table-column prop="OPERATION_LINE_NAME"
                         :label="$t('crp.tb_3')"
                         align="center"
                         width="150"
                         :show-overflow-tooltip="true" />
        <el-table-column prop="OPERATION_NAME"
                         :label="$t('crp.tb_4')"
                         align="center"
                         width="150"
                         :show-overflow-tooltip="true" />
        <el-table-column prop="CREATE_TIME"
                         :label="$t('crp.tb_5')"
                         align="center"
                         width="200"
                         :show-overflow-tooltip="true" />
        <el-table-column prop="STATUS"
                         :label="$t('crp.tb_6')"
                         align="center"
                         width="150"
                         :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span v-if="scope.row.STATUS === 0"
                  style="color:#FF5722;">{{ $t('crp.tb_7') }}</span>
            <span v-else-if="scope.row.STATUS === 1"
                  style="color:#FFB800;">{{ $t('crp.tb_8') }}</span>
            <span v-else-if="scope.row.STATUS === 2"
                  style="color:#009688;">{{ $t('crp.tb_9') }}</span>
            <span v-else
                  style="color:#1E9FFF;">{{ $t('crp.tb_10') }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="CALL_TYPE_NAME"
                         :label="$t('crp.tb_11')"
                         align="center"
                         width="150"
                         :show-overflow-tooltip="true" />
        <el-table-column prop="CALL_CONTENT"
                         :label="$t('crp.tb_12')"
                         align="center"
                         width="200"
                         :show-overflow-tooltip="true" />
        <el-table-column prop="CHECKIN_TIME"
                         :label="$t('crp.tb_13')"
                         align="center"
                         width="200"
                         :show-overflow-tooltip="true" />
        <el-table-column prop="CHECKIN_OPERATOR"
                         :label="$t('crp.tb_14')"
                         align="center"
                         width="150"
                         :show-overflow-tooltip="true" />
        <el-table-column prop="END_TIME"
                         :label="$t('crp.tb_15')"
                         align="center"
                         width="200"
                         :show-overflow-tooltip="true" />
        <el-table-column prop="END_OPERATOR"
                         :label="$t('crp.tb_16')"
                         align="center"
                         width="150"
                         :show-overflow-tooltip="true" />
        <el-table-column prop="OPERATOR"
                         :label="$t('crp.tb_17')"
                         align="center"
                         width="150"
                         :show-overflow-tooltip="true" />
        <el-table-column prop="OPERATION_SITE_NAME"
                         :label="$t('crp.tb_18')"
                         align="center"
                         width="150"
                         :show-overflow-tooltip="true" />
        <el-table-column :label="$t('crp.tb_19')"
                         align="center"
                         width="150"
                         fixed="right">
          <template slot-scope="scope"
                    prop="STATUS">
            <!-- AddCallRecordHandle v-if="$btnList.indexOf('ImsMsdRSave') !== -1"-->
            <el-button v-if=" $btnList.indexOf('AddCallRecordHandle') !== -1 && scope.row.STATUS === 1"
                       type="success"
                       size="mini"
                       @click="day_view_but(scope.row)">{{ $t('crp.tb_20') }}</el-button>
            <span v-else>-</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination :current-page="listQuery.Page"
                   :page-size="listQuery.Limit"
                   :page-sizes="[10, 20, 30, 50]"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="total"
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange" />
    <div class="CallRecord-tanble-com">
      <el-table :data="dealWithTable"
                stripe
                border
                style="width: 100%"
                height="100%"
                :header-cell-style="{background:'#eef1f6',color:'#606266'}">
        <el-table-column prop="HANDLER"
                         :label="$t('crp.p_1')"
                         align="center"
                         :show-overflow-tooltip="true" />
        <el-table-column prop="HANDLE_TIME"
                         :label="$t('crp.p_2')"
                         align="center"
                         :show-overflow-tooltip="true" />
        <el-table-column prop="HANDLE_CONTENT"
                         :label="$t('crp.p_3')"
                         align="center"
                         :show-overflow-tooltip="true" />
        <el-table-column prop="HANDLE_STATUS"
                         :label="$t('crp.p_4')"
                         align="center"
                         :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span v-if="scope.row.HANDLE_STATUS == 0"
                  style="color:#FF5722;">{{ $t('crp.p_5') }}</span>
            <span v-if="scope.row.HANDLE_STATUS == 1"
                  style="color:#009688;">{{ $t('crp.p_6') }}</span>
            <span v-if="scope.row.HANDLE_STATUS == 2"
                  style="color:#1E9FFF;">{{ $t('crp.p_7') }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="CallRecord-tanble-com">
      <el-table :data="NoticeTable"
                stripe
                border
                style="width: 100%"
                height="100%"
                :header-cell-style="{background:'#eef1f6',color:'#606266'}">
        <el-table-column prop="NOTICE_TYPE"
                         :label="$t('crp.p_8')"
                         align="center"
                         :show-overflow-tooltip="true" />
        <el-table-column prop="NOTICE_RECEIVER"
                         :label="$t('crp.p_9')"
                         align="center"
                         :show-overflow-tooltip="true" />
        <el-table-column prop="NOTICE_CONTENT"
                         :label="$t('crp.p_10')"
                         align="center"
                         :show-overflow-tooltip="true" />
        <el-table-column prop="NOTICT_TIME"
                         :label="$t('crp.p_11')"
                         align="center"
                         :show-overflow-tooltip="true" />
        <el-table-column prop="STATUS"
                         :label="$t('crp.p_12')"
                         align="center"
                         :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span v-if="scope.row.STATUS == 0">{{ $t('crp.p_13') }}</span>
            <span v-if="scope.row.STATUS == 1">{{ $t('crp.p_14') }}</span>
            <span v-if="scope.row.STATUS == 2">{{ $t('crp.p_15') }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog :close-on-click-modal="false"
               v-dialogDrag
               :title="$t('crp.tb_20')"
               width="40%"
               :visible.sync="dialogTableVisible">
      <el-form>
        <el-form-item :label="$t('crp.d_1')">
          <el-radio-group v-model="ruleForm.HANDLE_STATUS">
            <el-radio v-model="ruleForm.HANDLE_STATUS"
                      :value="ruleForm.HANDLE_STATU"
                      label="0">{{ $t('crp.d_2') }}</el-radio>
            <el-radio v-model="ruleForm.HANDLE_STATUS"
                      :value="ruleForm.HANDLE_STATU"
                      label="1">{{ $t('crp.d_3') }}</el-radio>
            <el-radio v-model="ruleForm.HANDLE_STATUS"
                      :value="ruleForm.HANDLE_STATU"
                      label="2">{{ $t('crp.d_4') }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('crp.d_5')">
          <el-input v-model="ruleForm.HANDLE_CONTENT"
                    type="textarea"
                    :placeholder="$t('crp.d_6')" />
        </el-form-item>
        <el-form-item align="center">
          <el-button type="primary"
                     @click="submitForm">{{ $t('crp.d_7') }}</el-button>
          <el-button @click="resetForm">{{ $t('crp.d_8') }}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </d2-container>
</template>
<script src="./CallRecord.js"></script>
<style lang="scss" scoped>
.CallRecord-tanble {
  height: calc(100vh - 490px);
}
.CallRecord-tanble-com {
  height: calc(100vh - 651px);
}
.CallRecord {
  .list-table {
    border: 1px solid #dfe6ec;
    margin: 20px 0;
  }
}
.tab-nav {
  display: flex;
  justify-content: space-between;
  height: 40px;
  line-height: 40px;
  .nav-right {
    width: 500px;
    border-left: 1px solid #dfe6ec;
    padding-left: 5px;
  }
}
</style>
<style>
.CallRecord .el-dialog__body {
  padding: 0px 20px;
  padding-bottom: 20px;
}
.CallRecord .el-table--medium td {
  padding: 5px 0;
}
.CallRecord .el-tabs__header {
  margin: 0;
}
/* 隐藏单选文字 */
.CallRecord-tanble-radio .el-radio__label {
  display: none;
}
</style>
