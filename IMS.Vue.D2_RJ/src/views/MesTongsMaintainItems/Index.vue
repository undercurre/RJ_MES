<template>
  <d2-container class="MesTongsMaintainItems"
                style="height: 100%;position: relative">
    <template slot="header">
      <custom-container-header defaultTableType="el"
                               :isExport="false"
                               :isExportTpl="false"
                               :isImport="false">
        <el-select v-model="listQuery.ITEM_TYPE"
                   clearable
                   :placeholder="$t('mtm._1')">
          <el-option v-for="item in typeList"
                     :key="item.id"
                     :label="item.label"
                     :value="item.id" />
        </el-select>&nbsp;
        <el-select v-model="listQuery.TONGS_TYPE"
                   clearable
                   :placeholder="$t('mtm._2')">
          <el-option v-for="item in fixture"
                     :key="item.LOOKUP_CODE"
                     :label="item.CHINESE"
                     :value="item.LOOKUP_CODE" />
        </el-select>&nbsp;
        <el-input v-model="listQuery.ITEM_NAME"
                  :placeholder="$t('mtm._3')"
                  clearable
                  style="width:200px"
                  @keyup.enter.native="search_but" />&nbsp;
        <el-input v-model="listQuery.REMARK"
                  :placeholder="$t('mtm._4')"
                  clearable
                  style="width:200px"
                  @keyup.enter.native="search_but" />&nbsp;
        <el-button type="primary"
                   icon="el-icon-search"
                   @click.prevent="search_but">{{ $t('mtm._5') }}</el-button>
        <el-button v-if="$btnList.indexOf('MesTongsMaintainItemsAdd') !== -1"
                   type="success"
                   icon="el-icon-plus"
                   @click.prevent="add_but">{{ $t('mtm._6') }}</el-button>
      </custom-container-header>
    </template>
    <div class="table-container">
      <el-table v-loading="listLoading"
                :data="mainTable"
                height="100%"
                style="width: 100%"
                highlight-current-row
                stripe
                border
                :header-cell-style="{background:'#eef1f6',color:'#606266'}">
        <el-table-column prop="ID"
                         width="150"
                         :label="$t('mtm._7')"
                         align="center"
                         :show-overflow-tooltip="true" />
        <el-table-column width="100"
                         prop="ITEM_TYPE"
                         :label="$t('mtm._8')"
                         align="center"
                         :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span v-if="scope.row.ITEM_TYPE === 0"
                  style="color: blue">{{ $t('mtm._9') }}</span>
            <span v-if="scope.row.ITEM_TYPE === 1"
                  style="color: green">{{ $t('mtm._10') }}</span>
          </template>
        </el-table-column>
        <el-table-column width="200"
                         prop="TONGS_TYPE"
                         :label="$t('mtm._11')"
                         align="center"
                         :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span v-if="scope.row.TONGS_TYPE === 1">{{$t('MesTongsApply._13')}}</span>
            <span v-else-if="scope.row.TONGS_TYPE === 2">{{$t('MesTongsApply._14')}}</span>
            <span v-else-if="scope.row.TONGS_TYPE === 3">{{$t('MesTongsApply._15a')}}</span>
            <span v-else-if="scope.row.TONGS_TYPE === 4">{{$t('MesTongsApply._15b')}}</span>
            <span v-else-if="scope.row.TONGS_TYPE === 5">{{$t('MesTongsApply._15c')}}</span>
            <span v-else-if="scope.row.TONGS_TYPE === 6">{{$t('MesTongsApply._15d')}}</span>
            <span v-else-if="scope.row.TONGS_TYPE === 7">{{$t('MesTongsApply._15e')}}</span>
            <span v-else-if="scope.row.TONGS_TYPE === 8">{{$t('MesTongsApply._15f')}}</span>
            <span v-else-if="scope.row.TONGS_TYPE === 9">{{$t('MesTongsApply._15g')}}</span>
            <span v-else>{{$t('MesTongsApply._16')}}</span>
          </template>
        </el-table-column>
        <el-table-column width="300"
                         prop="ITEM_NAME"
                         :label="$t('mtm._16')"
                         align="center"
                         :show-overflow-tooltip="true" />
        <el-table-column width="400"
                         prop="REMARK"
                         :label="$t('mtm._17')"
                         align="center"
                         :show-overflow-tooltip="true" />
        <el-table-column width="120"
                         prop="CREATE_USER"
                         :label="$t('mtm._18')"
                         align="center"
                         :show-overflow-tooltip="true" />
        <el-table-column width="200"
                         prop="CREATE_DATE"
                         :label="$t('mtm._19')"
                         align="center"
                         :show-overflow-tooltip="true" />
        <el-table-column width="120"
                         prop="UPDATE_USER"
                         :label="$t('mtm._20')"
                         align="center"
                         :show-overflow-tooltip="true" />
        <el-table-column width="200"
                         prop="UPDATE_DATE"
                         :label="$t('mtm._21')"
                         align="center"
                         :show-overflow-tooltip="true" />
        <el-table-column width="120"
                         prop="ENABLED"
                         :label="$t('mtm._22')"
                         :fixed="'right'"
                         align="center"
                         :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <el-switch :disabled="$btnList.indexOf('MesTongsMaintainItemsstatus') == -1"
                       v-model="scope.row.ENABLED"
                       :active-text="$t('mtm._23')"
                       :inactive-text="$t('mtm._24')"
                       active-color="#13ce66"
                       inactive-color="#cccccc"
                       active-value="Y"
                       inactive-value="N"
                       @change="change(scope.$index,scope.row)" />
          </template>
        </el-table-column>
        <el-table-column width="200"
                         prop="ACTIVE"
                         :label="$t('mtm._25')"
                         :fixed="'right'"
                         align="center"
                         :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <el-button v-if="$btnList.indexOf('MesTongsMaintainItemsedit') !== -1"
                       type="primary"
                       @click.prevent="edit_but(scope.row)">{{ $t('mtm._26') }}</el-button>
            <el-button v-if="$btnList.indexOf('MesTongsMaintainItemsdelete') !== -1"
                       type="danger"
                       @click.prevent="del_but(scope.row)">{{ $t('mtm._27') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <template slot="footer">
      <el-pagination ref="pagi"
                     :current-page="listQuery.Page"
                     :page-size="listQuery.Limit"
                     :page-sizes="[15, 25, 35, 45]"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange" />
    </template>
    <el-dialog :close-on-click-modal="false"
               v-dialogDrag
               width="40%"
               :title="addorediText"
               :visible.sync="innerVisible"
               append-to-body
               class="call-dialog">
      <el-form ref="callVal"
               :model="formData"
               :rules="rules"
               :show-message="false"
               label-width="110px">
        <el-form-item :label="$t('mtm._8')"
                      prop="ITEM_TYPE">
          <el-radio-group v-model="formData.ITEM_TYPE">
            <el-radio :label="0">{{ $t('mtm._28') }}</el-radio>
            <el-radio :label="1">{{ $t('mtm._29') }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('mtm._30')"
                      prop="TONGS_TYPE">
          <el-select v-model="formData.TONGS_TYPE"
                     style="width:100%"
                     :placeholder="$t('mtm._45')"
                     @change="changefixture">
            <el-option v-for="item in fixture"
                       :key="item.LOOKUP_CODE"
                       :label="item.CHINESE"
                       :value="item.LOOKUP_CODE" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('mtm._32')"
                      prop="ITEM_NAME">
          <el-input v-model="formData.ITEM_NAME"
                    :placeholder="$t('mtm._33')" />
        </el-form-item>
        <el-form-item :label="$t('mtm._34')"
                      prop="REMARK">
          <el-input v-model="formData.REMARK"
                    maxlength="199"
                    :rows="4"
                    type="textarea"
                    :placeholder="$t('mtm._35')" />
        </el-form-item>
        <el-form-item :label="$t('mtm._36')">
          <el-switch v-model="formData.ENABLED"
                     :active-text="$t('mtm._23')"
                     :inactive-text="$t('mtm._24')"
                     active-color="#13ce66"
                     inactive-color="#cccccc"
                     active-value="Y"
                     inactive-value="N" />
        </el-form-item>
        <div class="call-dialog-button">
          <el-button type="success"
                     @click="shout_but('callVal')">&nbsp;{{ $t('mtm._37') }}&nbsp;</el-button>
          <el-button @click="reset_but">&nbsp;{{ $t('mtm._38') }}&nbsp;</el-button>
        </div>
      </el-form>
    </el-dialog>
  </d2-container>
</template>

<script src="./MesTongsMaintainItems.js"></script>

<style lang="scss">
@import './MesTongsInfo.scss';
</style>
