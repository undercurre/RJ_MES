<template>
  <d2-container>
    <template slot="header">
      <custom-container-header
        exportMehodsName="exportData"
        tableName="SMT_LINE_CONFIG"
        importBtnName="SmtLineConfigImport"
        exportBtnName="SmtLineConfigExport"
        exportTplName="SmtLineConfigExportTPL"
      >
        <el-select
          v-model="formData.LINE_ID"
          clearable
          style="width:200px"
          :placeholder="$t('ltc.p_line')"
        >
          <el-option v-for="item in LineList" :key="item.ID" :value="item.ID" :label="item.NAME" />
        </el-select>&nbsp;
        <el-select
          v-model="formData.CONFIG_TYPE"
          clearable
          style="width:200px"
          :placeholder="$t('ltc.p_cf')"
        >
          <el-option
            v-for="item in ConfigTypeList"
            :key="item.ID"
            :value="item.ID"
            :label="item.NAME"
          />
        </el-select>&nbsp;
        <el-button
          type="primary"
          icon="el-icon-search"
          @click.prevent="searchClick"
        >{{ $t('publics.btn.search') }}</el-button>
        <el-button
          type="success"
          @click="insertEvent(null)"
          icon="el-icon-plus"
          v-if="$btnList.indexOf('SmtLineConfigAdd') !== -1"
        >{{ $t('publics.btn.add') }}</el-button>
        <el-button
          type="primary"
          icon="el-icon-check"
          @click.prevent="preserveClick()"
          v-if="$btnList.indexOf('SmtLineConfigEdit') !== -1"
        >{{ $t('publics.btn.save') }}</el-button>
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
        highlight-hover-row
        highlight-current-row
        show-overflow
        auto-resize
        keep-source
        :loading="loading"
        :data="mainTable"
        :edit-rules="validRules"
        :mouse-config="{selected: true}"
        :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
        :radio-config="{labelField: 'name', trigger: 'row'}"
        :checkbox-config="{checkField: 'checked', trigger: 'row'}"
      >
        <vxe-table-column
          field="LINE_ID"
          :title="$t('ltc.line')"
          :edit-render="{name: 'select', options: LineBox}"
        />
        <vxe-table-column
          field="CONFIG_TYPE"
          :title="$t('ltc.cf')"
          :edit-render="{name: 'select', options: ConfigTypeBox}"
        />
        <vxe-table-column field="VALUE" :title="$t('ltc.cfval')" :edit-render="{name: 'input'}" />
        <vxe-table-column field="DESCRIPTION" :title="$t('ltc.dn')" :edit-render="{name: 'input'}" />
        <vxe-table-column
          field="ENABLED"
          :title="$t('ltc.yn')"
          :edit-render="{autofocus: '.custom-input', type: 'visible'}"
        >
          <template v-slot:edit="{ row }">
            <div class="rddselect">
              <el-switch
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
          :title="$t('publics.field.operate')"
          width="120"
          align="center"
          fixed="right"
        >
          <template v-slot="{ row }">
            <el-button
              type="danger"
              @click="removeClick(row, row.$index)"
              v-if="$btnList.indexOf('SmtLineConfigRemove') !== -1"
            >{{ $t('publics.btn.delete') }}</el-button>
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
const API = helper('SmtLineConfig')
export default {
  name: 'SmtLineConfig',
  mixins: [
    pagination,
    CURD({
      defaultSaveAPI: e => API.SaveData(e)
    })
  ],
  components: {
    customContainerHeader
  },
  data () {
    return {
      formData: {
        LINE_ID: '',
        CONFIG_TYPE: '',
        ...this.formData
      },
      LINE_ID: [
        {
          required: true,
          message: this.$t('ltc.p_line')
        }
      ],
      CONFIG_TYPE: [
        {
          required: true,
          message: this.$t('ltc.p_cf')
        }
      ],
      LineBox: [],
      ConfigTypeBox: [],
      ConfigTypeList: [],
      LineList: [],
      CodeList: '',
      validRules: {
        LINE_ID: [
          {
            required: true,
            message: this.$t('ltc.p_line')
          }
        ],
        CONFIG_TYPE: [
          {
            required: true,
            message: this.$t('ltc.p_cf')
          }
        ]
      }
    }
  },
  methods: {
    async getIndex () {
      const res = await API.Index()
      if (res.Result) {
        this.ConfigTypeList = res.Result.ConfigTypeList
        this.LineList = res.Result.LineList
        this.LineBox.push({
          label: '',
          value: '',
          disabled: false
        })
        this.LineList.map(item => {
          this.LineBox.push({
            label: item.NAME,
            value: Number(item.ID),
            disabled: false
          })
        })
        this.ConfigTypeBox.push({
          label: '',
          value: '',
          disabled: false
        })
        this.ConfigTypeList.map(item => {
          this.ConfigTypeBox.push({
            label: item.NAME,
            value: Number(item.ID),
            disabled: false
          })
        })
        this.getLoadData()
      }
    },
    async getLoadData () {
      this.loading = true
      const res = await API.LoadData(this.formData)
      if (res.Result) {
        this.mainTable = res.Result
        this.totalPage = res.TotalCount
        this.loading = false
      }
    },
    async exportData () {
      this.loading = true
      const res = await API.ExportData(this.formData)
      this.loading = false
      this.mainTable = res.Result || []
      this.totalPage = res.TotalCount || 0
    },
    // 搜索
    searchClick () {
      this.formData.Page = 1
      this.getLoadData()
    },
    // 新增
    async insertEvent (row) {
      const record = {
        ID: 0,
        LINE_ID: '',
        CONFIG_TYPE: '',
        VALUE: '',
        DESCRIPTION: '',
        ENABLED: 'N'
      }
      const e = await this.$refs.xTable.insertAt(record, row)
      this.$refs.xTable.setActiveCell(e.row, 'LINE_ID')
    }
  },
  created () {
    this.getIndex()
  }
}
</script>
