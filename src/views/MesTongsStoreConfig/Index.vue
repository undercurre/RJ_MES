<template>
  <d2-container class="MesTongsStoreConfig" style="height: 100%;position: relative">
    <template slot="header">
      <custom-container-header
        exportBtnName="MesTongsStoreConfigExport"
        importBtnName="MesTongsStoreConfigImport"
        exportTplName="MesTongsStoreConfigExportTpl"
      >
        <el-input
          v-model="listQuery.CODE"
          :placeholder="$t('mtsc._1')"
          clearable
          style="width:220px"
          @keyup.enter.native="search_but"
        />&nbsp;
        <el-input
          v-model="listQuery.NAME"
          :placeholder="$t('mtsc._2')"
          clearable
          style="width:220px"
          @keyup.enter.native="search_but"
        />
        <el-button
          type="primary"
          icon="el-icon-search"
          @click.prevent="search_but"
        >{{ $t('mtsc._3') }}</el-button>
        <el-button v-if="$btnList.indexOf('MesTongsStoreConfigAdd') !== -1" type="success" icon="el-icon-plus" @click.prevent="add_but">{{ $t('mtsc._4') }}</el-button>
      </custom-container-header>
    </template>
    <div class="table-container">
      <el-table
        v-loading="listLoading"
        :data="mainTable"
        height="100%"
        style="width: 100%"
        highlight-current-row
        stripe
        border
        :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      >
        <!-- <el-table-column
          prop="ID"
          :label="$t('mtsc._5')"
          align="center"
          :show-overflow-tooltip="true"
        /> -->
        <el-table-column
          prop="CODE"
          :label="$t('mtsc._6')"
          align="center"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="NAME"
          :label="$t('mtsc._7')"
          align="center"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="REMARK"
          :label="$t('mtsc._8')"
          align="center"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="ENABLED"
          :label="$t('mtsc._9')"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <el-switch
            :disabled="$btnList.indexOf('MesTongsStoreConfigstatus') == -1"
              v-model="scope.row.ENABLED"
              :active-text="$t('mtsc._10')"
              :inactive-text="$t('mtsc._11')"
              active-color="#13ce66"
              inactive-color="#cccccc"
              active-value="Y"
              inactive-value="N"
              @change="change(scope.$index,scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column
          prop="STATUS"
          :label="$t('mtsc._12')"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <el-button
              v-if="$btnList.indexOf('MesTongsStoreConfigedit') !== -1"
              type="primary"
              @click.prevent="edit_but(scope.row)"
            >{{ $t('mtsc._13') }}</el-button>
            <el-button
              v-if="$btnList.indexOf('MesTongsStoreConfigdelete') !== -1"
              type="danger"
              @click.prevent="del_but(scope.row)"
            >{{ $t('mtsc._14') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <template slot="footer">
      <el-pagination
        ref="pagi"
        :current-page="listQuery.Page"
        :page-size="listQuery.Limit"
        :page-sizes="[10, 20, 30, 50]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </template>
    <el-dialog
      v-dialogDrag
      :close-on-click-modal="false"
      width="40%"
      :title="addorediText"
      :visible.sync="innerVisible"
      append-to-body
      class="call-dialog"
    >
      <el-form ref="callVal" show-message="false" :model="formData" :rules="rules" label-width="110px">
        <el-form-item :label="$t('mtsc._15')" prop="CODE" style="padding-top:10px">
          <el-input v-model="formData.CODE" :placeholder="$t('mtsc._16')" />
        </el-form-item>
        <el-form-item :label="$t('mtsc._17')" prop="NAME">
          <el-input v-model="formData.NAME" :placeholder="$t('mtsc._18')" />
        </el-form-item>
        <el-form-item :label="$t('mtsc._19')">
          <el-input
            v-model="formData.REMARK"
            :rows="4"
            type="textarea"
            :placeholder="$t('mtsc._20')"
          />
        </el-form-item>
        <el-form-item :label="$t('mtsc._21')">
          <el-switch
            v-model="formData.ENABLED"
            :active-text="$t('mtsc._10')"
            :inactive-text="$t('mtsc._11')"
            active-color="#13ce66"
            inactive-color="#cccccc"
            active-value="Y"
            inactive-value="N"
          />
        </el-form-item>
        <div class="call-dialog-button">
          <el-button type="success" @click="shout_but('callVal')">&nbsp;{{ $t('mtsc._25') }}&nbsp;</el-button>
          <el-button @click="reset_but">&nbsp;{{ $t('mtsc._26') }}&nbsp;</el-button>
        </div>
      </el-form>
    </el-dialog>
  </d2-container>
</template>

<script src="./MesTongsStoreConfig.js"></script>

<style lang="scss">
@import "./MesTongsStoreConfig.scss";
</style>
