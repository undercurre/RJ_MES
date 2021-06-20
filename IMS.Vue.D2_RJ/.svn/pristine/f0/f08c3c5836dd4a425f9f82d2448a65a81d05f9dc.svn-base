<template>
  <d2-container>
    <template slot="header">
      <custom-container-header
        exportBtnName="SysOrganizeTypeExport"
        importBtnName="SysOrganizeTypeImport"
        exportTplName="SysOrganizeTypeExportTPL"
      >
        <el-input
          v-model="formData.ORGANIZE_TYPE_NAME"
          :placeholder="$t('SysOrganizeType._1')"
          style="width: 200px"
          clearable
        ></el-input>
        <el-input
          v-model="formData.ORGANIZE_TYPE_CODE"
          :placeholder="$t('SysOrganizeType._2')"
          style="width: 200px"
          clearable
        ></el-input>
        <el-button
          type="primary"
          icon="el-icon-search"
          @click.prevent="searchClick"
          >{{ $t("publics.btn.search") }}</el-button
        >
        <el-button
          v-if="$btnList.indexOf('SysOrganizeTypeAdd') !== -1"
          type="success"
          icon="el-icon-plus"
          @click="insertEvent(null)"
          >{{ $t("publics.btn.add") }}</el-button
        >
        <el-button
          v-if="$btnList.indexOf('SysOrganizeTypeSave') !== -1"
          type="primary"
          icon="el-icon-check"
          @click.prevent="preserveClick()"
          >{{ $t("publics.btn.save") }}</el-button
        >
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
        :edit-rules="validRules"
        :mouse-config="{ selected: true }"
        :edit-config="{ trigger: 'click', mode: 'row', showStatus: true }"
        :radio-config="{ labelField: 'name', trigger: 'row' }"
        :checkbox-config="{ checkField: 'checked', trigger: 'row' }"
      >
        <vxe-table-column
          field="ORDER_ID"
          min-width="150"
          :title="$t('SysOrganizeType._5')"
          :edit-render="{ name: '$input', props: { type: 'number', min: '1' } }"
        />
        <vxe-table-column
          field="ORGANIZE_TYPE_NAME"
          min-width="190"
          :title="$t('SysOrganizeType._3')"
          :edit-render="{ name: 'input' }"
        />
        <vxe-table-column
          field="ORGANIZE_TYPE_CODE"
          min-width="180"
          :title="$t('SysOrganizeType._4')"
          :edit-render="{ name: 'input' }"
        />

        <vxe-table-column
          field="ENABLED"
          min-width="150"
          :title="$t('SysOrganizeType._6')"
          :edit-render="{ autofocus: '.custom-input', type: 'visible' }"
        >
          <template v-slot:edit="{ row }">
            <div>
              <el-switch
                :disabled="$btnList.indexOf('SysOrganizeTypestate') == -1"
                v-model="row.ENABLED"
                :active-text="$t('publics.btn.yes')"
                :inactive-text="$t('publics.btn.no')"
                active-color="#13ce66"
                inactive-color="#cccccc"
                active-value="Y"
                inactive-value="N"
              />
            </div>
          </template>
        </vxe-table-column>
        <vxe-table-column
          field="REMARK"
          min-width="180"
          :title="$t('SysOrganizeType._7')"
          :edit-render="{ name: 'input' }"
        />
        <vxe-table-column
          :title="$t('publics.field.operate')"
          width="120"
          align="center"
          fixed="right"
        >
          <template v-slot="{ row }">
            <el-button
              v-if="$btnList.indexOf('SysOrganizeTypedelete') !== -1"
              type="danger"
              @click="
                removeClick(row, {
                  id: row.ID
                })
              "
              >{{ $t("publics.btn.delete") }}</el-button
            >
          </template>
        </vxe-table-column>
      </vxe-table>
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

<script>
import pagination from '@/views/mixin/page'
import helper from '@/api/Helper'
import customContainerHeader from '@/components/custom-container-header'
import CURD from '@/views/mixin/CURD'
const API = helper('SysOrganizeType')
export default {
  name: 'SysOrganizeType',
  mixins: [
    pagination,
    CURD({
      defaultSaveAPI: e => API.SaveData(e),
      defaultCheckIsUsedAPI: e => API.ItemIsByUsed(e),
      isNeedDeleteCheck: true
    })
  ],
  components: {
    customContainerHeader
  },
  data () {
    return {
      validRules: {
        ORGANIZE_TYPE_NAME: [
          {
            required: true,
            message: this.$t('SysOrganizeType._1')
          }
        ],
        ORGANIZE_TYPE_CODE: [
          {
            required: true,
            message: this.$t('SysOrganizeType._2')
          }
        ],
        ORDER_ID: [
          {
            required: true,
            message: this.$t('SysOrganizeType._8')
          }
        ]
      }
    }
  },
  methods: {
    searchClick () {
      this.formData.Page = 1
      this.getLoadData()
    },
    async getIndex () {
      const res = await API.Index()
      if (res.Result) {
        this.getLoadData()
      }
    },
    async getLoadData () {
      this.loading = true
      const res = await API.LoadData(this.formData)
      this.loading = false
      this.mainTable = res.Result || []
      this.totalPage = res.TotalCount || 0
    },
    async insertEvent (row) {
      const record = {
        ID: 0,
        ORGANIZE_TYPE_NAME: '',
        ORGANIZE_TYPE_CODE: '',
        ORDER_ID: '',
        ENABLED: 'N',
        REMARK: ''
      }
      const e = await this.$refs.xTable.insertAt(record, row)
      this.$refs.xTable.setActiveCell(e.row, 'ORGANIZE_TYPE_NAME')
    }
  },
  created () {
    this.getIndex()
  }
}
</script>
