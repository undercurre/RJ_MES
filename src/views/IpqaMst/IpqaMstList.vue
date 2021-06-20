<template>
  <custom-container class="IpqaMstList">
    <template slot="header">
      <custom-container-header :isFull="true" :isExport="false" :isExportTpl="false" :isImport="false">
        <el-select
          v-model="listQuery.BUSINESS_UNIT"
          style="width:150px"
          clearable
          :placeholder="$t('IpqaMst.IpqaMstList.manage')"
          @change="business_but(listQuery.BUSINESS_UNIT)"
        >
          <el-option v-for="item in options" :key="item.ID" :label="item.CHINESE" :value="item.ID" />
        </el-select>
        <el-select
          v-model="listQuery.DEPARTMENT"
          style="width:150px"
          clearable
          :placeholder="$t('IpqaMst.IpqaMstList.department')"
        >
          <el-option
            v-for="item in GetDepartmentList"
            :key="item.ID"
            :label="item.CHINESE"
            :value="item.ID"
          />
        </el-select>&nbsp;
        <el-select
          v-model="listQuery.U_LINE"
          style="width:150px"
          clearable
          :placeholder="$t('IpqaMst.IpqaMstList.line')"
        >
          <el-option v-for="item in line" :key="item.ID" :label="item.LINE_NAME" :value="item.ID" />
        </el-select>&nbsp;
        <el-select
          v-model="listQuery.IPQA_TYPE"
          clearable
          :placeholder="$t('IpqaMst.IpqaMstList.sort')"
          class="common-top"
        >
          <el-option
            v-for="item in sort"
            :key="item.ID"
            :label="item.SBU_CHINESE"
            :value="item.ID"
          />
        </el-select>&nbsp;
        <el-input
          v-model="listQuery.Key"
          :placeholder="$t('IpqaMst.IpqaMstList.name')"
          clearable
          style="width:150px"
          @keyup.enter.native="search_but"
        />&nbsp;
        <el-date-picker
          v-model="value2"
          style="width:200px;margin-right: 10px;"
          type="daterange"
          align="right"
          unlink-panels
          :start-placeholder="$t('IpqaMst.IpqaMstList.start')"
          :end-placeholder="$t('IpqaMst.IpqaMstList.end')"
          value-format="yyyy-MM-dd"
          :picker-options="pickerOptions"
        />&nbsp;
        <el-button
          type="primary"
          icon="el-icon-search"
          @click.prevent="search_but"
        >{{ $t('IpqaMst.IpqaMstList.search') }}</el-button>
        <el-button
          v-if="$btnList.indexOf('IpqaMstSave') !== -1"
          type="success"
          icon="el-icon-plus"
          @click.prevent="add_but"
        >{{ $t('IpqaMst.IpqaMstList.add') }}</el-button>
        <el-button
          v-if="$btnList.indexOf('IpqaMstedit') !== -1"
          type="primary"
          icon="el-icon-edit"
          @click.prevent="edit_but"
        >{{ $t('IpqaMst.IpqaMstList.edit') }}</el-button>
        <el-button
          v-if="$btnList.indexOf('IpqaMstdelete') !== -1"
          type="danger"
          icon="el-icon-delete"
          @click="remove_but()"
        >{{ $t('IpqaMst.IpqaMstList.delete') }}</el-button>
        <el-button
          v-if="$btnList.indexOf('IpqaMstAudit') !== -1"
          type="primary"
          icon="el-icon-circle-check"
          @click.prevent="review_but"
        >{{ $t('IpqaMst.IpqaMstList.review') }}</el-button>
        <el-button
          v-if="$btnList.indexOf('IpqaMstRefuse') !== -1"
          type="danger"
          icon="el-icon-close"
          @click.prevent="refuse_but"
        >{{ $t('IpqaMst.IpqaMstList.refuse') }}</el-button>
      </custom-container-header>
    </template>
    <div class="out-table-container">
    <el-table
      highlight-current-row
      highlight-hover-row
      show-overflow
      v-loading="listLoading"
      stripe
      :data="tableDataEnd"
      width="100%"
      height="100%"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      @row-click="obtain_but"
    >
      <el-table-column :label="$t('IpqaMst.IpqaMstList.select')" width="60" align="center" class="table-radio">
        <template slot-scope="scope">
          <el-radio v-model="radio" class="radio" :label="scope.$index" />
        </template>
      </el-table-column>
      <el-table-column
        prop="BILL_CODE"
        :label="$t('IpqaMst.IpqaMstList.document')"
        align="center"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        prop="ORDER_ID"
        :label="$t('IpqaMst.IpqaMstList.check')"
        align="center"
        :show-overflow-tooltip="true"
      >
        <template
          slot-scope="scope"
        >{{ scope.row.IPQA_TYPE === 1 ? $t('IpqaMst.IpqaMstList.smt') : $t('IpqaMst.IpqaMstList.yield') }}</template>
      </el-table-column>
      <el-table-column
        prop="BUSINESS_UNIT"
        :label=" $t('IpqaMst.IpqaMstList.business')"
        align="center"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        prop="DEPARTMENT"
        :label="$t('IpqaMst.IpqaMstList.branch')"
        align="center"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        prop="U_LINE"
        :label="$t('IpqaMst.IpqaMstList.lin')"
        align="center"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        prop="PRODUCT_NAME"
        :label="$t('IpqaMst.IpqaMstList.proname')"
        align="center"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        prop="PRODUCT_MODEL"
        :label="$t('IpqaMst.IpqaMstList.product')"
        align="center"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        prop="CREATETIME"
        :label="$t('IpqaMst.IpqaMstList.time')"
        align="center"
        :show-overflow-tooltip="true"
      />
      <el-table-column prop="CHECK_STATUS" :label="$t('IpqaMst.IpqaMstList.status')" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.CHECK_STATUS == 0">{{ $t('IpqaMst.IpqaMstList.pending') }}</span>
          <span v-if="scope.row.CHECK_STATUS == 1">{{ $t('IpqaMst.IpqaMstList.audited') }}</span>
          <span v-if="scope.row.CHECK_STATUS == 3">{{ $t('IpqaMst.IpqaMstList.refuse') }}</span>
          <span v-if="scope.row.CHECK_STATUS == 4">{{ $t('IpqaMst.IpqaMstList.xinadd') }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="CREATEDATE"
        :label="$t('IpqaMst.IpqaMstList.creation')"
        align="center"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        prop="PRODUCT_DATE"
        :label="$t('IpqaMst.IpqaMstList.reviewtime')"
        align="center"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        prop="CREATOR"
        :label="$t('IpqaMst.IpqaMstList.founder')"
        align="center"
        :show-overflow-tooltip="true"
      />
    </el-table>
    </div>
    <template slot="footer">
      <el-pagination
        ref="pagi"
        :current-page="listQuery.Page"
        :page-sizes="[15, 25, 35, 45]"
        :page-size="listQuery.Limit"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </template>
  </custom-container>
</template>
<script src="./js/IpqaMstList.js"></script>
<style>
.IpqaMstList .radio .el-radio__label{
   display: none;
}
</style>
