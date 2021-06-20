<template>
  <d2-container class="AddOrModify">
    <div class="header-container">
      <el-button icon="el-icon-back" @click.prevent="return_but">{{$t('CallConfig._22')}}</el-button>
      <el-button type="primary" icon="el-icon-circle-check" @click.prevent="save_but">{{$t('CallConfig._23')}}</el-button>
      <el-button type="success" icon="el-icon-plus" @click.prevent="add_but">{{$t('CallConfig._24')}}</el-button>
    </div>
    <el-form class="AddOrModify-select" label-width="115px">
      <el-row>
        <el-col :span="24">
          <el-form-item :label="$t('CallConfig._33')">
            <el-select
              v-model="listQuery.OPERATION_LINE_ID"
              style="width:100%"
              :placeholder="$t('CallConfig._34')"
              class="common-top"
            >
              <el-option
                v-for="item in LinesList"
                :key="item.Id"
                :label="item.OPERATION_LINE_NAME"
                :value="item.Id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item :label="$t('CallConfig._35')">
            <el-select
              v-model="listQuery.OPERATION_SITE_ID"
              clearable
              style="width:100%"
              :placeholder="$t('CallConfig._36')"
              class="common-top"
            >
              <el-option
                v-for="item in OperationsList"
                :key="item.Id"
                :label="item.DESCRIPTION"
                :value="item.Id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item :label="$t('CallConfig._37')">
            <el-select
              v-model="listQuery.CALL_TYPE_CODE"
              style="width:100%"
              :placeholder="$t('CallConfig._38')"
              class="common-top"
            >
              <el-option
                v-for="item in AndonCallTypeList"
                :key="item.LOOKUP_CODE"
                :label="item.CHINESE"
                :value="item.LOOKUP_CODE"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item :label="$t('CallConfig._9')">
            <el-switch
              v-model="listQuery.ENABLED"
              :active-text="$t('CallConfig._10')"
              :inactive-text="$t('CallConfig._11')"
              active-color="#13ce66"
              inactive-color="#cccccc"
              active-value="Y"
              inactive-value="N"
              @change="change(listQuery.ENABLED)"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="AddOrModify-table">
      <el-table
        :data="mainTable"
        style="width: 80%"
        height="100%"
        class="AddOrModify-select"
        highlight-current-row
        border
        :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      >
        <el-table-column
          prop="USER_NAME"
          :label="$t('CallConfig._25')"
          align="center"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="NICK_NAME"
          :label="$t('CallConfig._26')"
          align="center"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="MOBILE"
          :label="$t('CallConfig._27')"
          align="center"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="WORK_WECHAT_ID"
          :label="$t('CallConfig._28')"
          align="center"
          :show-overflow-tooltip="true"
        />
         <el-table-column show-overflow-tooltip :label="$t('CallConfig._12')" align="center">
          <template slot-scope="scope">
            <el-button type="danger" icon="el-icon-delete" @click.prevent="remove_but(scope.$index, mainTable)">{{$t('CallConfig._14')}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      v-dialogDrag
      top="0"
      :title="$t('CallConfig._24')"
      :visible.sync="adddialogVisible"
      :close-on-click-modal="false"
      width="60%"
      class="main-dlalog"
    >
      <div class="dlalog-header">
        <el-input
        v-model="addQuery.USER_NAME"
        :placeholder="$t('CallConfig._29')"
        style="width:200px"
        @keyup.enter.native="search_but"
      />&nbsp;&nbsp;
      <el-input
        v-model="addQuery.MOBILE"
        :placeholder="$t('CallConfig._30')"
        style="width:200px"
        @keyup.enter.native="search_but"
      />&nbsp;&nbsp;
      <el-button type="success" icon="el-icon-search" @click.native="search_but">{{$t('CallConfig._4')}}</el-button>
      <el-button type="primary" @click="determine_but">{{$t('CallConfig._17')}}</el-button>
      <el-button @click="cancel_but">{{$t('CallConfig._18')}}</el-button>
      </div>
      <el-table
        ref="multipleTable"
        :data="addTable"
        style="width: 100%"
        height="100%"
        border
        class="table-container1"
        :header-cell-style="{background:'#eef1f6',color:'#606266'}"
        @selection-change="addSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center" :show-overflow-tooltip="true" />
        <el-table-column prop="USER_NAME" label="用户名" align="center" :show-overflow-tooltip="true" />
        <el-table-column
          prop="NICK_NAME"
          :label="$t('CallConfig._26')"
          align="center"
          :show-overflow-tooltip="true"
        />
        <el-table-column prop="MOBILE" :label="$t('CallConfig._27')" align="center" :show-overflow-tooltip="true" />
        <el-table-column
          prop="WORK_WECHAT_ID"
          :label="$t('CallConfig._28')"
          align="center"
          :show-overflow-tooltip="true"
        />
      </el-table>
      <el-pagination
        :current-page="addQuery.Page"
        :page-size="addQuery.Limit"
        :page-sizes="[10, 20, 30, 50]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-dialog>
  </d2-container>
</template>
<script src="./AddOrModify.js"></script>
<style lang="scss" scoped>
.table-container1 {
  height: calc(100vh - 60px - 21px - 74px - 73px) !important;
}
.AddOrModify-table{
  height: calc(100vh - 355px);
}
.AddOrModify-select {
  width: 80%;
  margin: 0 auto;
  margin-top: 15px;
}
.header-container {
  position: sticky;
  top: 0;
  z-index: 99;
}
.AddOrModify .screenfull-comm {
  float: right;
  margin: 0;
}
.dlalog-header{
  padding-bottom: 10px;
}
</style>
<style>
.AddOrModify .el-dialog__body{
  padding: 10px 20px;
}
</style>
