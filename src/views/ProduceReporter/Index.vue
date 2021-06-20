<template>
  <d2-container>
    <template slot="header">
      <custom-container-header
        :isFull="true"
        :isExportTpl="false"
        :isExport="false"
        :isImport="false"
      >
        <el-input
          v-model="formData.so_order"
          :placeholder="'请输入订单号'"
          clearable
          style="width: 200px"
          @keyup.enter.native="searchClick"
        ></el-input>
        <el-input
          v-model="formData.wo_no"
          :placeholder="'请输入工单号'"
          clearable
          style="width: 200px"
          @keyup.enter.native="searchClick"
        ></el-input>
        <el-input
          v-model="formData.carton_no"
          :placeholder="'请输入箱号'"
          clearable
          style="width: 200px"
          @keyup.enter.native="searchClick"
        ></el-input>
        <el-button type="primary" @click="searchClick">查询</el-button>
        <el-button type="danger" @click="CancelReport">取消报工</el-button>
      </custom-container-header>
    </template>
    <div class="table-container">
      <vxe-table
        ref="xTable"
        border
        resizable
        height="100%"
        size="medium"
        align="center"
        highlight-current-row
        highlight-hover-row
        show-overflow
        auto-resize
        keep-source
        :loading="loading"
        :data="mainTable"
        :span-method="mergeRowMethod"

      >
        <vxe-table-column type="checkbox" width="60" />
        <vxe-table-column
          field="ORDER_NO"
          min-width="180"
          :title="'订单号'"
        />
        <vxe-table-column
          field="WO_NO"
          min-width="200"
          :title="'工单号'"
        />
        <vxe-table-column
          field="ZS"
          min-width="100"
          :title="'总报工数'"
        />
        <vxe-table-column
          field="CARTON_NO"
          min-width="240"
          :title="'箱号'"
        />
        <vxe-table-column
          field="OPERATION_SITE_NAME"
          min-width="240"
          :title="'线体'"
        />
        <vxe-table-column
          field="QTY"
          min-width="100"
          :title="'报工数量'"
        />
        <vxe-table-column
          field="CREATE_TIME"
          min-width="200"
          :title="'报工时间'"
        />
        <vxe-table-column
          field="RETURN_CONF_NO"
          min-width="180"
          :title="'ERP返回编号'"
        />
        <vxe-table-column
          field="RETURN_CONF_CNT"
          min-width="160"
          :title="'ERP返回CNT'"
        />
      </vxe-table>
    </div>
    <template slot="footer">
      <el-pagination
        :current-page="formData.Page"
        :page-size="formData.Limit"
        :page-sizes="[100]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="TotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </template>
  </d2-container>
</template>

<script src="./ProduceReporter.js"></script>

<style lang="scss" scoped>
.total-count {
}
</style>
