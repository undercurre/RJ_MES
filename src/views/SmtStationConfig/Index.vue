<template>
  <d2-container>
    <template slot="header">
      <custom-container-header
        exportMehodsName="exportData"
        importBtnName="SmtStationConfigImport"
        exportBtnName="SmtStationConfigExport"
        exportTplName="SmtStationConfigExportTPL"
      >
        <el-select v-model="formData.STATION_ID" clearable :placeholder="$t('ssc._1')">
          <el-option
            v-for="item in GetMachineList"
            :key="item.ID"
            :label="item.NAME"
            :value="item.ID"
          />
        </el-select>&nbsp;
        <el-select v-model="formData.CONFIG_TYPE" clearable :placeholder="$t('ssc._2')">
          <el-option
            v-for="item in StatusList"
            :key="item.CODE"
            :label="item.CN_DESC"
            :value="item.CODE"
          />
        </el-select>&nbsp;
        <el-button
          type="primary"
          icon="el-icon-search"
          @click.prevent="searchClick"
        >{{ $t('ssc._3') }}</el-button>
        <el-button
          type="success"
          @click="insertEvent(null)"
          icon="el-icon-plus"
          v-if="$btnList.indexOf('SmtStationConfigAdd') !== -1"
        >{{ $t('ssc._4') }}</el-button>
        <el-button
          type="primary"
          icon="el-icon-check"
          @click.prevent="preserveClick()"
          v-if="$btnList.indexOf('SmtStationConfigEdit') !== -1"
        >{{ $t('ssc._5') }}</el-button>
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
        stripe
        :loading="loading"
        :data="mainTable"
        :edit-rules="validRules"
        :mouse-config="{selected: true}"
        :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
        :radio-config="{labelField: 'name', trigger: 'row'}"
        :checkbox-config="{checkField: 'checked', trigger: 'row'}"
      >
        <vxe-table-column
          field="STATION_ID"
          :title="$t('ssc._6')"
          :edit-render="{name: 'select', options: GetMachinebox}"
        />
        <vxe-table-column
          field="CONFIG_TYPE"
          :title="$t('ssc._7')"
          :edit-render="{name: 'select', options: Statusbox}"
        />

        <vxe-table-column field="VALUE" :title="$t('ssc._8')" :edit-render="{name: 'input'}" />
        <vxe-table-column
          field="DESCRIPTION"
          :title="$t('ssc._20')"
          :edit-render="{name: 'input'}"
        />
        <vxe-table-column
          field="ENABLED"
          :title="$t('ssc._9')"
          :edit-render="{autofocus: '.custom-input', type: 'visible'}"
        >
          <template v-slot:edit="{ row}">
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
        <vxe-table-column :title="$t('plbd.tb_og')" width="120" align="center" fixed="right">
          <template v-slot="{ row }">
            <el-button
              type="danger"
              @click="removeClick(row, row.$index)"
              v-if="$btnList.indexOf('SmtStationConfigRemove') !== -1"
            >{{ $t('plbd.tb_rm') }}</el-button>
          </template>
        </vxe-table-column>
      </vxe-table>
    </div>
    <template slot="footer">
      <el-pagination
        class="SmtLineSubstitute-pagination"
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
import helper from '@/api/Helper'
import pagination from '@/views/mixin/page'
import customContainerHeader from '@/components/custom-container-header'
import CURD from '@/views/mixin/CURD'
const API = helper('SmtStationConfig')
export default {
  name: 'SmtStationConfig',
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
      GetMachineList: [],
      GetMachinebox: [],
      StatusList: [],
      Statusbox: [],
      formData: {
        STATION_ID: '',
        CONFIG_TYPE: '',
        ...this.formData
      },
      validRules: {
        STATION_ID: [
          {
            required: true,
            message: this.$t('ssc._1')
          }
        ],
        CONFIG_TYPE: [
          {
            required: true,
            message: this.$t('ssc._2')
          }
        ]
      }
    }
  },
  created () {
    this.getIndex()
  },
  methods: {
    async getIndex () {
      const res = await API.Index()
      if (res.Result) {
        this.GetMachineList = res.Result.GetMachineList
        this.StatusList = res.Result.StatusList
        this.getLoadData()
        this.GetMachinebox.push({
          label: '',
          value: '',
          disabled: false
        })
        this.GetMachineList.map(item => {
          this.GetMachinebox.push({
            label: item.NAME,
            value: Number(item.ID),
            disabled: false
          })
        })
        this.Statusbox.push({
          label: '',
          value: '',
          disabled: false
        })
        this.StatusList.map(item => {
          this.Statusbox.push({
            label: item.CN_DESC,
            value: Number(item.CODE),
            disabled: false
          })
        })
      }
    },
    async getLoadData () {
      this.loading = true
      const res = await API.LoadData(this.formData)
      this.loading = false
      this.mainTable = res.Result || []
      this.totalPage = res.TotalCount || 0
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
        STATION_ID: '',
        CONFIG_TYPE: '',
        VALUE: '',
        DESCRIPTION: '',
        ENABLED: 'N'
      }
      this.$refs.xTable.insertAt(record, row).then(({ row }) => {
        this.$refs.xTable.setActiveRow(row)
      })
    }
  }
}
</script>
