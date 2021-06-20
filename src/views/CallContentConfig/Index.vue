<template>
  <d2-container class="CallContentConfig">
    <template slot="header">
      <custom-container-header defaultTotalPage="total"
                               defaultLoadingFlag="listLoading"
                               defaultFormData="listQuery"
                               exportMehodsName="exportData"
                               tableName="Andon_Call_Content_Config"
                               exportBtnName="CallContentConfigExport"
                               importBtnName="CallContentConfigImport"
                               exportTplName="CallContentConfigExportTpl">
        <el-select v-model="listQuery.CALL_TYPE_CODE"
                   clearable
                   style="width:200px"
                   :placeholder="$t('cccn._1')">
          <el-option v-for="item in CallTypeList"
                     :key="item.LOOKUP_CODE"
                     :label="item.CHINESE"
                     :value="item.LOOKUP_CODE" />
        </el-select>&nbsp;
        <el-input v-model="listQuery.Key"
                  :placeholder="$t('cccn._2')"
                  clearable
                  style="width:200px"
                  @keyup.enter.native="search_but" />&nbsp;
        <el-button type="primary"
                   icon="el-icon-search"
                   @click.prevent="search_but">{{$t('cccn._3')}}</el-button>
        <el-button v-if="$btnList.indexOf('CallContentConfigAdd') !== -1"
                   type="success"
                   icon="el-icon-plus"
                   @click.prevent="add_but">{{$t('cccn._4')}}</el-button>
      </custom-container-header>
    </template>
    <div class="table-container">
      <el-table v-loading="listLoading"
                stripe
                :data="mainTable"
                width="100%"
                height="100%"
                highlight-current-row
                border
                :header-cell-style="{background:'#eef1f6',color:'#606266'}">
        <el-table-column prop="Type_Code_inCN"
                         :label="$t('cccn._5')"
                         align="center"
                         :show-overflow-tooltip="true" />
        <el-table-column prop="CALL_CODE"
                         :label="$t('cccn._6')"
                         align="center"
                         :show-overflow-tooltip="true" />
        <el-table-column prop="Chinese"
                         :label="$t('cccn._7')"
                         align="center"
                         :show-overflow-tooltip="true" />
        <el-table-column prop="Enabled"
                         :label="$t('cccn._8')"
                         align="center"
                         :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <el-switch :disabled="$btnList.indexOf('CallContentConfigstatus') == -1"
                       v-model="scope.row.Enabled"
                       :active-text="$t('cccn._9')"
                       :inactive-text="$t('cccn._10')"
                       active-color="#13ce66"
                       inactive-color="#cccccc"
                       active-value="Y"
                       inactive-value="N"
                       @change="change(scope.$index,scope.row)" />
          </template>
        </el-table-column>
        <el-table-column prop="STATUS"
                         :label="$t('cccn._11')"
                         align="center"
                         :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <el-button v-if="$btnList.indexOf('CallContentConfigedit') !== -1"
                       type="success"
                       @click.prevent="edit_but(scope.row)">{{$t('cccn._12')}}</el-button>
            <el-button v-if="$btnList.indexOf('CallContentConfigdelete') !== -1"
                       type="danger"
                       @click.prevent="remove_but(scope.row)">{{$t('cccn._13')}}</el-button>
          </template>
        </el-table-column>
      </el-table>
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
    <el-dialog v-dialogDrag
               width="30%"
               :title="addorediText"
               :visible.sync="innerVisible"
               :close-on-click-modal="false"
               append-to-body
               class="call-dialog">
      <el-form ref="callVal"
               :show-message="false"
               :model="callVal"
               :rules="rules"
               label-width="110px">
        <el-form-item :label="$t('cccn._5')"
                      prop="Call_Type_Code">
          <el-select v-model="callVal.Call_Type_Code"
                     style="width:100%"
                     :placeholder="$t('cccn._14')">
            <el-option v-for="item in CallType"
                       :key="item.LOOKUP_CODE"
                       :label="item.CHINESE"
                       :value="item.LOOKUP_CODE" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('cccn._6')"
                      prop="CALL_CODE">
          <el-input v-model="callVal.CALL_CODE"
                    :placeholder="$t('cccn._15')" />
        </el-form-item>
        <el-form-item :label="$t('cccn._7')"
                      prop="Chinese">
          <el-input v-model="callVal.Chinese"
                    type="textarea"
                    :placeholder="$t('cccn._16')" />
        </el-form-item>
        <el-form-item :label="$t('cccn._8')">
          <el-switch v-model="callVal.Enabled"
                     :active-text="$t('cccn._9')"
                     :inactive-text="$t('cccn._10')"
                     active-color="#13ce66"
                     inactive-color="#cccccc"
                     active-value="Y"
                     inactive-value="N" />
        </el-form-item>
        <div class="call-dialog-button">
          <el-button type="success"
                     @click="shout_but('callVal')">&nbsp;{{$t('cccn._17')}}&nbsp;</el-button>
          <el-button @click="reset_but">&nbsp;{{$t('cccn._18')}}&nbsp;</el-button>
        </div>
      </el-form>
    </el-dialog>
  </d2-container>
</template>
<script src="./CallContentConfig.js"></script>
<style lang="scss" scoped>
.CallContentConfig {
  .list-table {
    border: 1px solid #dfe6ec;
    margin: 20px 0;
  }

  .CallContentConfig-table-div {
    height: 100%;
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
<style scoped>
.CallContentConfig .el-dialog__body {
  padding: 0px 20px;
  padding-bottom: 20px;
}

.CallContentConfig .el-table--medium td {
  padding: 5px 0;
}

.CallContentConfig .el-tabs__header {
  margin: 0;
}

.call-dialog .el-dialog__body {
  padding: 0px 20px;
  padding-bottom: 15px;
}

.call-dialog-title {
  background-color: #3e9ce2;
  width: 70px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  color: #fff;
  margin-bottom: 10px;
}

.call-dialog-area label {
  display: flex;
  align-items: center;
  font-weight: 500;
  margin-bottom: 10px;
}

.call-dialog-area label span {
  width: 115px;
}

.call-dialog-button {
  padding-top: 15px;
  color: #fff;
  text-align: center;
}

/* 全局的分页样式 */
.CallContentConfig .CallContentConfig-pagination {
  position: static;
  /* bottom: 3px; */
  margin-top: 5px;
  padding: 5px !important;
  width: 100%;
  border: 1px solid #e6ebf5;
}
</style>
