<template>
  <custom-container class="AddOrModify">
    <template slot="header">
      <custom-container-header :isFull="true"
                               :isExport="false"
                               :isExportTpl="false"
                               :isImport="false">
        <el-button icon="el-icon-back"
                   @click="backtrack">{{
          $t("IpqaMst.AddOrModify.back")
        }}</el-button>
        <el-button v-if="check_status == 4"
                   type="primary"
                   icon="el-icon-circle-check"
                   @click="savedata_but">{{ $t("IpqaMst.AddOrModify.save") }}</el-button>
        <el-button v-if="check_status == 4 && $btnList.indexOf('IpqaMstPostToCheck') !== -1"
                   type="success"
                   icon="el-icon-circle-check"
                   @click="submit_but">{{ $t("IpqaMst.AddOrModify.submitreview") }}</el-button>
      </custom-container-header>
    </template>
    <el-row :gutter="20"
            class="AddOrModify-row">
      <el-col :span="6"
              class="AddOrModify-col">
        <span class="sp-tit">{{ $t("IpqaMst.AddOrModify.business") }}:</span>
        <el-select v-model="form.BUSINESS_UNIT"
                   :placeholder="$t('IpqaMst.AddOrModify.busunit')"
                   class="select"
                   :disabled="check_status == 4 ? false : true"
                   @change="business_but(form.BUSINESS_UNIT)">
          <el-option v-for="item in options"
                     :key="item.ID"
                     :label="item.CHINESE"
                     :value="item.ID" />
        </el-select>
      </el-col>
      <el-col :span="6"
              class="AddOrModify-col">
        <span class="sp-tit">{{ $t("IpqaMst.AddOrModify.branch") }}:</span>
        <el-select v-model="form.DEPARTMENT"
                   :placeholder="$t('IpqaMst.AddOrModify.department')"
                   class="select"
                   :disabled="check_status == 4 ? false : true">
          <el-option v-for="item in GetDepartmentList"
                     :key="item.ID"
                     :label="item.CHINESE"
                     :value="item.ID" />
        </el-select>
      </el-col>
      <el-col :span="6"
              class="AddOrModify-col">
        <span class="sp-tit">{{ $t("IpqaMst.AddOrModify.lin") }}:</span>
        <el-select v-model="form.U_LINE"
                   :placeholder="$t('IpqaMst.AddOrModify.selectlin')"
                   class="select"
                   :disabled="check_status == 4 ? false : true">
          <el-option v-for="item in line"
                     :key="item.ID"
                     :label="item.LINE_NAME"
                     :value="item.ID" />
        </el-select>
      </el-col>
      <el-col :span="6"
              class="AddOrModify-col">
        <span class="sp-tit">{{ $t("IpqaMst.AddOrModify.time") }}:</span>
        <el-time-picker v-model="form.CREATETIME"
                        :disabled="check_status == 4 ? false : true"
                        class="select"
                        :placeholder="$t('IpqaMst.AddOrModify.selectime')"
                        format="HH:mm"
                        value-format="HH:mm"
                        type="date"
                        :default-value="form.CREATETIME" />
      </el-col>
    </el-row>
    <el-row :gutter="20"
            class="AddOrModify-row">
      <el-col :span="6"
              class="AddOrModify-col">
        <span class="sp-tit">{{ $t("IpqaMst.AddOrModify.production") }}:</span>
        <el-input v-model="form.PRODUCT_BILLNO"
                  :placeholder="$t('IpqaMst.AddOrModify.selecproduction')"
                  :readonly="true"
                  :disabled="banStatus"
                  class="select" />
        <el-button v-if="check_status == 4"
                   style="width: 20%"
                   type="primary"
                   :disabled="banStatus"
                   @click="dialogTableVisible = true">{{ $t("IpqaMst.AddOrModify.select") }}</el-button>
      </el-col>
      <el-col :span="6"
              class="AddOrModify-col">
        <span class="sp-tit">{{ $t("IpqaMst.AddOrModify.proname") }}:</span>
        <el-input v-model="form.PRODUCT_NAME"
                  :placeholder="$t('IpqaMst.AddOrModify.selecproname')"
                  :readonly="true"
                  :disabled="banStatus"
                  class="select" />
      </el-col>
      <el-col :span="6"
              class="AddOrModify-col">
        <span class="sp-tit">{{ $t("IpqaMst.AddOrModify.proddate") }}:</span>
        <el-input v-model="form.PRODUCT_DATE"
                  :placeholder="$t('IpqaMst.AddOrModify.selecdate')"
                  :readonly="true"
                  :disabled="banStatus"
                  class="select" />
      </el-col>
      <el-col :span="6"
              class="AddOrModify-col">
        <span class="sp-tit">{{ $t("IpqaMst.AddOrModify.prodqua") }}:</span>
        <el-input v-model="form.PRODUCT_QTY"
                  :placeholder="$t('IpqaMst.AddOrModify.selecproduct')"
                  :readonly="true"
                  :disabled="banStatus"
                  class="select" />
      </el-col>
    </el-row>
    <el-row :gutter="20"
            class="AddOrModify-row">
      <el-col :span="6"
              class="AddOrModify-col">
        <span class="sp-tit">{{ $t("IpqaMst.AddOrModify.product") }}:</span>
        <el-input v-model="form.PRODUCT_MODEL"
                  :placeholder="$t('IpqaMst.AddOrModify.selecpro')"
                  :readonly="true"
                  :disabled="banStatus"
                  class="select" />
      </el-col>
      <el-col :span="6"
              class="AddOrModify-col">
        <span class="sp-tit">{{ $t("IpqaMst.AddOrModify.inspection") }}:</span>
        <el-input v-model="IPQA_TYPE_Sele"
                  :placeholder="$t('IpqaMst.AddOrModify.slsinspection')"
                  :readonly="true"
                  :disabled="banStatus"
                  class="select" />
      </el-col>
      <!-- <el-col :span="6" class="AddOrModify-col">
        <span class="sp-tit">{{ $t("IpqaMst.AddOrModify.sinber") }}:</span>
        <el-input
          v-model="form.BILL_CODE"
          :placeholder="$t('IpqaMst.AddOrModify.inpsinber')"
          :disabled="banStatus"
          class="select"
        />
      </el-col>
      <el-col :span="6" class="AddOrModify-col">
        <span class="sp-tit"
          >{{ $t("IpqaMst.AddOrModify.inspectiontime") }}:</span
        >
        <el-date-picker v-model="form.CREATEDATE" type="date"> </el-date-picker>
      </el-col> -->
    </el-row>
    <!-- 表格 -->
    <div class="IpqaMst-AddOrModify-tanble">
      <vxe-table class="x-vxe-table"
                 ref="xTable"
                 stripe
                 border
                 resizable
                 size="medium"
                 align="center"
                 highlight-current-row
                 highlight-hover-row
                 show-overflow
                 max-height="100%"
                 auto-resize
                 sync-resize
                 keep-source
                 :data="tableData"
                 :edit-rules="validRules"
                 :mouse-config="{ selected: true }"
                 :edit-config="{ trigger: 'click', mode: 'row' }"
                 :radio-config="{ labelField: 'name', trigger: 'row' }"
                 :checkbox-config="{ checkField: 'checked', trigger: 'row' }">
        <vxe-table-column show-overflow
                          field="ORDER_ID"
                          :title="$t('IpqaMst.AddOrModify.sort')"
                          width="60" />
        <vxe-table-column show-overflow
                          field="CATEGORY"
                          :title="$t('IpqaMst.AddOrModify.systematics')"
                          width="80"
                          :filters="[
            {
              label: $t('IpqaMst.AddOrModify.people'),
              value: $t('IpqaMst.AddOrModify.people')
            },
            {
              label: $t('IpqaMst.AddOrModify.machine'),
              value: $t('IpqaMst.AddOrModify.machine')
            },
            {
              label: $t('IpqaMst.AddOrModify.material'),
              value: $t('IpqaMst.AddOrModify.material')
            },
            {
              label: $t('IpqaMst.AddOrModify.law'),
              value: $t('IpqaMst.AddOrModify.law')
            },
            {
              label: $t('IpqaMst.AddOrModify.ring'),
              value: $t('IpqaMst.AddOrModify.ring')
            }
          ]" />
        <vxe-table-column show-overflow
                          field="ITEM_NAME"
                          :title="$t('IpqaMst.AddOrModify.items')" />
        <vxe-table-column show-overflow
                          field="PROCESS_REQUIRE"
                          :title="$t('IpqaMst.AddOrModify.quality')">
          <template slot="header">
            <span v-if="ipqa_type == '0'">
              <span>{{ $t("IpqaMst.AddOrModify.content") }}</span>
            </span>
            <span v-else>
              <span>{{ $t("IpqaMst.AddOrModify.quality") }}</span>
            </span>
          </template>
        </vxe-table-column>
        <vxe-table-column show-overflow
                          field="REFERENCE_STANDARD"
                          :title="$t('IpqaMst.AddOrModify.guideline')" />
        <vxe-table-column show-overflow
                          field="QUANTIZE_TYPE_CAPTION"
                          :title="$t('IpqaMst.AddOrModify.standard')" />
        <vxe-table-column show-overflow
                          field="QUANTIZE_VAL"
                          :title="$t('IpqaMst.AddOrModify.norm')" />

        <vxe-table-column show-overflow
                          field="IPQA_RESULT"
                          :title="$t('IpqaMst.AddOrModify.results')"
                          :edit-render="{ autofocus: '.custom-input', type: 'visible' }">
          <template v-slot:edit="{ row }">
            <template v-if="row.QUANTIZE_TYPE == 1 && check_status == 4">
              <vxe-input v-model="row.IPQA_RESULT"
                         :placeholder="$t('IpqaMst.AddOrModify.pleaseval')" />
            </template>
            <template v-else-if="row.QUANTIZE_TYPE == 0">
              <div class="rddselect">
                <el-switch v-model="row.IPQA_RESULT"
                           :active-text="$t('IpqaMst.AddOrModify.qualified')"
                           :inactive-text="$t('IpqaMst.AddOrModify.noqualified')"
                           active-color="#13ce66"
                           inactive-color="#cccccc"
                           active-value="1"
                           inactive-value="0" />
              </div>
            </template>
            <template v-else>
              <div v-if="row.QUANTIZE_TYPE == 0 && row.IPQA_RESULT == 1">
                {{ $t("IpqaMst.AddOrModify.qualified") }}
              </div>
              <div v-else-if="row.QUANTIZE_TYPE == 0 && row.IPQA_RESULT == 0">
                {{ $t("IpqaMst.AddOrModify.noqualified") }}
              </div>
              <div v-else>{{ row.IPQA_RESULT }}</div>
            </template>
          </template>
          <template v-slot="{ row }">
            <div v-if="row.QUANTIZE_TYPE == 0 && row.IPQA_RESULT == 1">
              {{ $t("IpqaMst.AddOrModify.qualified") }}
            </div>
            <div v-else-if="row.QUANTIZE_TYPE == 0 && row.IPQA_RESULT == 0">
              {{ $t("IpqaMst.AddOrModify.noqualified") }}
            </div>
            <div v-else>{{ row.IPQA_RESULT }}</div>
          </template>
        </vxe-table-column>

        <vxe-table-column show-overflow
                          field="IPQA_EXPLAIN"
                          :title="$t('IpqaMst.AddOrModify.abnormal')"
                          :edit-render="{ autofocus: '.custom-input' }">
          <template v-slot:edit="{ row }">
            <template v-if="check_status == 4">
              <vxe-input v-model="row.IPQA_EXPLAIN" />
            </template>
            <template v-else>{{ row.IPQA_EXPLAIN }}</template>
          </template>
          <template v-slot="{ row }">{{ row.IPQA_EXPLAIN }}</template>
        </vxe-table-column>
      </vxe-table>
    </div>
    <!-- 弹窗表单 -->
    <el-dialog class="x-el-dialog"
               v-dialogDrag
               :close-on-click-modal="false"
               :title="$t('IpqaMst.AddOrModify.seleticket')"
               :visible.sync="dialogTableVisible">
      <div class="dialog-head">
        <el-input v-model="gridQuery.Key"
                  :placeholder="$t('IpqaMst.AddOrModify.keywords')"
                  clearable
                  style="width:200px"
                  @keyup.enter.native="search_but" />&nbsp;
        <el-button type="success"
                   icon="el-icon-search"
                   @click.prevent="search_but">{{ $t("IpqaMst.AddOrModify.search") }}</el-button>
        <el-button type="success"
                   @click.prevent="confirm_but">{{
          $t("IpqaMst.AddOrModify.confirm")
        }}</el-button>
      </div>
      <el-table stripe
                :data="gridData"
                border
                align="center"
                :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
                @row-click="openDetails">
        <el-table-column :label="$t('IpqaMst.AddOrModify.select')"
                         width="50"
                         align="center"
                         :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <el-radio v-model="radio"
                      class="gridRadio"
                      :label="scope.$index">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column property="WO_NO"
                         :label="$t('IpqaMst.AddOrModify.ordernumber')"
                         align="center"
                         :show-overflow-tooltip="true" />
        <el-table-column property="PRODUCT_NAME"
                         :label="$t('IpqaMst.AddOrModify.proname')"
                         align="center"
                         :show-overflow-tooltip="true" />
        <el-table-column property="PART_NO"
                         :label="$t('IpqaMst.AddOrModify.partno')"
                         align="center"
                         :show-overflow-tooltip="true" />
        <el-table-column property="MODEL"
                         :label="$t('IpqaMst.AddOrModify.product')"
                         align="center"
                         :show-overflow-tooltip="true" />
        <el-table-column property="TARGET_QTY"
                         :label="$t('IpqaMst.AddOrModify.total')"
                         align="center"
                         :show-overflow-tooltip="true" />
        <el-table-column property="START_DATE"
                         :label="$t('IpqaMst.AddOrModify.start')"
                         align="center"
                         :show-overflow-tooltip="true" />
      </el-table>
      <el-pagination :current-page="gridQuery.Page"
                     :page-sizes="[10, 20, 30, 50]"
                     :page-size="gridQuery.Limit"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="gridtotal"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange" />
    </el-dialog>
  </custom-container>
</template>
<script src="./js/IpqaMstedit.js"></script>
<style lang="scss" scoped>
.IpqaMst-AddOrModify-tanble {
  height: calc(100vh - 215px);
}
.AddOrModify {
  .AddOrModify-row {
    margin-top: 10px;
  }
  .AddOrModify-col {
    display: flex;
    align-items: center;
    .select {
      flex: 1;
    }
    span {
      padding: 0 10px;
      width: 90px;
    }
    button {
      margin-left: 5px;
    }
  }
  .dialog-head {
    padding: 10px 0;
  }
}
</style>
<style>
.x-el-dialog .el-dialog__body {
  padding-top: 0;
}
.x-vxe-table.vxe-table {
  margin-top: 15px;
}

.AddOrModify .el-switch__label--left {
  position: absolute;
  left: 5px;
  font-size: 12px;
  color: #fff;
  z-index: -1111;
}
.AddOrModify .el-switch__label--right {
  position: absolute;
  right: 5px;
  font-size: 12px;
  color: #fff;
  z-index: -1111;
}
.AddOrModify .el-switch__label.is-active {
  z-index: 1111;
  font-size: 12px;
  color: #fff;
}
.AddOrModify .el-switch .el-switch__core,
.AddOrModify .el-switch .el-switch__label {
  width: 65px !important;
}
.gridRadio .el-radio__label {
  display: none;
}
</style>
