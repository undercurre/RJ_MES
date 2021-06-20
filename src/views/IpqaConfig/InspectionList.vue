<template>
  <d2-container class="InspectionList">
    <template slot="header">
      <custom-container-header defaultTotalPage="total"
                               defaultLoadingFlag="listLoading"
                               defaultFormData="listQuery"
                               exportMehodsName="exportData"
                               defaultMainTable="inspectionList"
                               tableName="IPQA_CONFIG"
                               exportBtnName="IpqaConfigExport"
                               importBtnName="IpqaConfigImport"
                               exportTplName="IpqaConfigExportTPL">
        <!-- 搜索框 -->
        <el-input v-model="listQuery.Key"
                  :placeholder="$t('IpqaConfig.InspectionList.name')"
                  style="width:200px"
                  @keyup.enter.native="searchClick"
                  clearable />&nbsp;
        <!-- 搜索按钮 -->
        <el-select v-model="listQuery.IPQA_TYPE"
                   clearable
                   class="filter-item"
                   style="width:200px"
                   :placeholder="$t('IpqaConfig.InspectionList.classification')">
          &nbsp;
          <el-option v-for="item in typeOptions"
                     :key="item.key"
                     :label="item.display_name"
                     :value="item.key" />
        </el-select>&nbsp;
        <el-button type="success"
                   icon="el-icon-search"
                   @click="searchClick">{{ $t('IpqaConfig.InspectionList.search') }}</el-button>
        <el-button type="primary"
                   @click="modifyClick"
                   icon="el-icon-edit">{{ $t('IpqaConfig.InspectionList.modify') }}</el-button>
      </custom-container-header>
    </template>
    <!-- 表格 -->
    <div class="table-container">
      <el-table v-loading="listLoading"
                highlight-current-row
                :data="inspectionList"
                border
                :header-cell-style="{background:'#eef1f6',color:'#606266'}">
        <el-table-column prop="ORDER_ID"
                         :label="$t('IpqaConfig.InspectionList.sort')"
                         align="center" />
        <el-table-column prop="IPQA_TYPE"
                         :label="$t('IpqaConfig.InspectionList.inspection')"
                         align="center"
                         :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span v-if="scope.row.IPQA_TYPE == '0'">{{ $t('IpqaConfig.InspectionList.smt') }}</span>
            <span v-else>{{ $t('IpqaConfig.InspectionList.yield') }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="CATEGORY"
                         :label="$t('IpqaConfig.InspectionList.systematics')"
                         align="center" />
        <el-table-column prop="ITEM_NAME"
                         :label="$t('IpqaConfig.InspectionList.items')"
                         align="center"
                         :show-overflow-tooltip="true" />
        <el-table-column prop="PROCESS_REQUIRE"
                         :label="$t('IpqaConfig.InspectionList.quality')"
                         align="center"
                         :show-overflow-tooltip="true" />
        <el-table-column prop="REFERENCE_STANDARD"
                         :label="$t('IpqaConfig.InspectionList.guideline')"
                         align="center"
                         :show-overflow-tooltip="true" />
        <el-table-column prop="QUANTIZE_TYPE"
                         :label="$t('IpqaConfig.InspectionList.standardization')"
                         align="center"
                         :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span v-if="scope.row.QUANTIZE_TYPE == '0'">{{ $t('IpqaConfig.InspectionList.noamount') }}</span>
            <span v-else>{{ $t('IpqaConfig.InspectionList.haveamount') }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="CREATETIME"
                         :label="$t('IpqaConfig.InspectionList.creationtime')"
                         align="center"
                         :show-overflow-tooltip="true" />
        <el-table-column prop="CREATOR"
                         :label="$t('IpqaConfig.InspectionList.founder')"
                         align="center"
                         :show-overflow-tooltip="true" />
        <el-table-column prop="ENABLED"
                         :label="$t('IpqaConfig.InspectionList.whether')"
                         align="center"
                         :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span v-if="scope.row.ENABLED == '0'">{{ $t('IpqaConfig.InspectionList.disable') }}</span>
            <span v-else>{{ $t('IpqaConfig.InspectionList.available') }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <template slot="footer">
      <el-pagination ref="pagi"
                     class="InspectionList-pagination"
                     border
                     :current-page.sync="listQuery.Page"
                     :page-sizes="[15,25,35, 45]"
                     :page-size="listQuery.limit"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange" />
    </template>
  </d2-container>
</template>
<script src="./js/InspectionList.js"></script>
<style lang="scss" scoped>
.app-main {
  position: relative;
}
.app-main > div {
  height: 100%;
  position: relative;
}
.header-container {
  padding: 2px 0;
  height: auto !important;
}
.navbar {
  height: 45px !important;
}
.navbar .right-menu .avatar-container .avatar-wrapper {
  margin-top: 0 !important;
  display: flex;
  align-items: center;
  height: 100%;
}
.navbar .right-menu .avatar-container .avatar-wrapper .el-icon-caret-bottom {
  top: auto !important;
}
</style>
