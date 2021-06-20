<template>
  <d2-container class="CallConfig">
    <template slot="header">
      <custom-container-header
        exportBtnName="CallConfigExport"
        importBtnName="CallConfigImport"
        exportTplName="CallConfigExportTPL"
      >
        <el-select
          v-model="formData.OPERATION_LINE_ID"
          clearable
          style="width:150px"
          :placeholder="$t('CallConfig._1')"
          class="common-top"
        >
          <el-option
            v-for="item in LinesList"
            :key="item.Id"
            :label="item.OPERATION_LINE_NAME"
            :value="item.Id"
          />
        </el-select>&nbsp;
        <el-select
          v-model="formData.OPERATION_SITE_ID"
          clearable
          style="width:150px"
          :placeholder="$t('CallConfig._2')"
          class="common-top"
        >
          <el-option
            v-for="item in OperationsList"
            :key="item.Id"
            :label="item.DESCRIPTION"
            :value="item.Id"
          />
        </el-select>&nbsp;
        <el-select
          v-model="formData.CALL_TYPE_CODE"
          clearable
          style="width:150px"
           :placeholder="$t('CallConfig._3')"
          class="common-top"
        >
          <el-option
            v-for="item in AndonCallTypeList"
            :key="item.LOOKUP_CODE"
            :label="item.CHINESE"
            :value="item.LOOKUP_CODE"
          />
        </el-select>&nbsp;
        <el-button
          type="primary"
          icon="el-icon-search"
          class="common-top"
          @click.prevent="search_but"
        >{{$t('CallConfig._4')}}</el-button>
        <el-button
        v-if="$btnList.indexOf('CallConfigAdd') !== -1"
        type="success"
        icon="el-icon-plus"
        class="common-top"
        @click.prevent="add_but">{{$t('CallConfig._5')}}</el-button>
      </custom-container-header>
    </template>
    <div class="table-container">
      <el-table
        v-loading="loading"
        stripe
        :data="mainTable"
        width="100%"
        height="100%"
        highlight-current-row
        border
        :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      >
        <el-table-column show-overflow-tooltip prop="LINE_ID_INCN" :label="$t('CallConfig._6')" align="center" />
        <el-table-column show-overflow-tooltip prop="SITE_ID_INCN" :label="$t('CallConfig._7')" align="center" />
        <el-table-column
          show-overflow-tooltip
          prop="TYPE_CODE_INCN"
          :label="$t('CallConfig._8')"
          align="center"
        />
        <el-table-column show-overflow-tooltip prop="ENABLED" :label="$t('CallConfig._9')" align="center">
          <template slot-scope="scope">
            <el-switch
              :disabled="$btnList.indexOf('CallConfigstate') == -1"
              v-model="scope.row.ENABLED"
              :active-text="$t('CallConfig._10')"
              :inactive-text="$t('CallConfig._11')"
              active-color="#13ce66"
              inactive-color="#cccccc"
              active-value="Y"
              inactive-value="N"
              @change="change(scope.$index,scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="STATUS" :label="$t('CallConfig._12')" align="center">
          <template slot-scope="scope">
            <el-button
            v-if="$btnList.indexOf('CallConfigedit') !== -1"
            type="success"
            @click.prevent="edit_but(scope.row)"
            >{{$t('CallConfig._13')}}</el-button>
            <el-button v-if="$btnList.indexOf('CallConfigdelete') !== -1" type="danger" @click.prevent="remove_but(scope.row)">{{$t('CallConfig._14')}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
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
  </d2-container>
</template>

<script src="./CallConfig.js"></script>
<style lang="scss" scoped>
.CallConfig-tanble-dev {
  height: 100%;
}
.CallConfig {
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
<style scoped>
.CallConfig .el-dialog__body {
  padding: 0px 20px;
  padding-bottom: 20px;
}
.CallConfig .el-table--medium td {
  padding: 5px 0;
}
.CallConfig .el-tabs__header {
  margin: 0;
}
</style>
