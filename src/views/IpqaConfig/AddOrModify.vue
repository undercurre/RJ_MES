<template>
  <d2-container class="AddOrModify"
                style="height: 100%;">
    <template slot="header">
      <custom-container-header :isExport="false"
                               :isExportTpl="false"
                               :isImport="false"
                               :isFull="true">
        <vxe-toolbar ref="headerCon"
                     class="header-container">
          <template v-slot:buttons>
            <div style="display: flex;align-items: center;">
              <el-button @click="Return_but">
                <i class="el-icon-back" />
                &nbsp;{{ $t('IpqaConfig.AddOrModify.return') }}
              </el-button>
              <span v-if="$store.getters.sortType == 0"
                    class="x-span">{{ $t('IpqaConfig.AddOrModify.inspection') }}：{{ $t('IpqaConfig.AddOrModify.smt') }}</span>
              <span v-else
                    class="x-span">{{ $t('IpqaConfig.AddOrModify.inspection') }}：{{ $t('IpqaConfig.AddOrModify.yield') }}</span>
              <el-button v-if="$btnList.indexOf('IpqaConfigAdd') !== -1"
                         type="success"
                         @click="insertEvent(-1)">
                {{ $t('IpqaConfig.AddOrModify.add') }}&nbsp;
                <i class="el-icon-circle-plus-outline" />
              </el-button>
              <el-button v-if="$btnList.indexOf('IpqaConfigSave') !== -1"
                         type="primary"
                         @click="getInsertEvent">
                <i class="el-icon-circle-check" />
                &nbsp;{{ $t('IpqaConfig.AddOrModify.save') }}
              </el-button>
              <el-button v-if="$btnList.indexOf('IpqaConfigdelete') !== -1"
                         type="danger"
                         @click="remove_but">
                {{ $t('IpqaConfig.AddOrModify.deleteselected') }}&nbsp;
                <i class="el-icon-delete" />
              </el-button>
            </div>
          </template>
        </vxe-toolbar>
      </custom-container-header>
    </template>
    <div class="table-container1">
      <vxe-table ref="xTable"
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
                 :data="tableData"
                 :edit-rules="validRules"
                 :mouse-config="{selected: true}"
                 :edit-config="{trigger: 'click', mode: 'row',showStatus: true}"
                 :radio-config="{labelField: 'name', trigger: 'row'}"
                 :checkbox-config="{checkField: 'checked', trigger: 'row'}">
        <!-- <vxe-table-column type="checkbox" width="60" /> -->
        <vxe-table-column type="radio"
                          width="50" />
        <vxe-table-column field="ORDER_ID"
                          :title="$t('IpqaConfig.AddOrModify.sort')"
                          width="80"
                          :edit-render="{name: 'input'}" />
        <vxe-table-column width="100"
                          field="CATEGORY"
                          :title="$t('IpqaConfig.AddOrModify.classify')"
                          :edit-render="{name: 'select', options: typeList}"
                          :filters="[{label: $t('IpqaConfig.AddOrModify.people'), value: $t('IpqaConfig.AddOrModify.people')}, {label:$t('IpqaConfig.AddOrModify.machine'), value: $t('IpqaConfig.AddOrModify.machine')}, {label: $t('IpqaConfig.AddOrModify.material'), value: $t('IpqaConfig.AddOrModify.material')}, {label: $t('IpqaConfig.AddOrModify.law'), value: $t('IpqaConfig.AddOrModify.law')}, {label:$t('IpqaConfig.AddOrModify.ring'), value: $t('IpqaConfig.AddOrModify.ring')}]" />
        <vxe-table-column field="ITEM_NAME"
                          :title="$t('IpqaConfig.AddOrModify.items')"
                          min-width="160"
                          :edit-render="{name: 'textarea'}" />
        <vxe-table-column min-width="200"
                          field="PROCESS_REQUIRE"
                          :title="$t('IpqaConfig.AddOrModify.quality')"
                          :edit-render="{name: 'textarea'}">
          <template v-slot:header="{ column }">
            <span v-if="ipqa_type == '0'">
              <span>{{ $t('IpqaConfig.AddOrModify.content') }}</span>
            </span>
            <span v-else>
              <span>{{ $t('IpqaConfig.AddOrModify.quality') }}</span>
            </span>
          </template>
        </vxe-table-column>
        <vxe-table-column width="200"
                          field="REFERENCE_STANDARD"
                          :title="$t('IpqaConfig.AddOrModify.guideline')"
                          :edit-render="{name: 'textarea'}" />
        <vxe-table-column width="200"
                          field="QUANTIZE_TYPE"
                          :title="$t('IpqaConfig.AddOrModify.standard')"
                          :edit-render="{name: 'select', options: quantizeList, events: {change: quantizeChangeEvent}}" />
        <vxe-table-column width="200"
                          field="QUANTIZE_VAL"
                          :title="$t('IpqaConfig.AddOrModify.norm')"
                          :edit-render="{name: 'textarea'}" />
        <vxe-table-column width="150"
                          field="ENABLED"
                          :title="$t('IpqaConfig.AddOrModify.usable')"
                          :edit-render="{name: 'select', options: enabledList, events: {change: enabledChangeEvent}}" />
      </vxe-table>
    </div>
    <template slot="footer">
      <el-pagination :current-page="formData.Page"
                     :page-size="formData.Limit"
                     :page-sizes="[15, 25, 35, 45]"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="totalPage"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange" />
    </template>
  </d2-container>
</template>
<script src="./js/AddOrModify.js"></script>
<style lang="scss" scoped>
.table-container1 {
  overflow: auto;
  height: calc(100vh - 60px - 21px - 40px - 74px - 53px) !important;
}
.x-span {
  margin-left: 20px;
  margin-right: 20px;
}
.table-dev {
  overflow: auto;
  padding-bottom: none;
}
</style>
