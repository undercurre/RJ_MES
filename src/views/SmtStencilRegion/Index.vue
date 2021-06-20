<template>
  <d2-container>
    <template slot="header">
      <custom-container-header exportMehodsName="exportData"
                               importBtnName="SmtStencilRegionImport"
                               exportBtnName="SmtStencilRegionExport"
                               exportTplName="SmtStencilRegionExportTPL">
        <el-select v-model="formData.Key"
                   clearable
                   filterable
                   :placeholder="$t('SmtStencilRegion._8')">
          <el-option v-for="item in StencilTypeList"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value" />
        </el-select>
        <el-button type="primary"
                   icon="el-icon-search"
                   @click.prevent="searchClick">{{ $t('publics.btn.search') }}</el-button>
        <el-button type="success"
                   @click="insertEvent(null)"
                   v-if="$btnList.indexOf('SmtStencilRegionAdd') !== -1"
                   icon="el-icon-plus">{{ $t('publics.btn.add') }}</el-button>
        <el-button type="primary"
                   icon="el-icon-check"
                   @click.prevent="preserveClick()"
                   v-if="$btnList.indexOf('SmtStencilRegionEdit') !== -1">{{ $t('publics.btn.save') }}</el-button>
      </custom-container-header>
    </template>
    <div class="table-container">
      <vxe-table ref="xTable"
                 border
                 resizable
                 height="100%"
                 size="medium"
                 align="center"
                 highlight-hover-row
                 highlight-current-row
                 auto-resize
                 show-overflow
                 keep-source
                 :loading="loading"
                 :data="mainTable"
                 :edit-rules="validRules"
                 :mouse-config="{selected: true}"
                 :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
                 :radio-config="{labelField: 'name', trigger: 'row'}"
                 :checkbox-config="{checkField: 'checked', trigger: 'row'}">
        <vxe-table-column min-width="150"
                          field="STENCIL_ID"
                          :title="$t('SmtStencilRegion._1')"
                          :edit-render="{name: 'select', options: StencilTypeList}" />
        <vxe-table-column min-width="150"
                          field="BEGIN_COUNT"
                          :title="$t('SmtStencilRegion._2')"
                          :edit-render="{name:'$input',props:{type:'number',min: '0'}}"></vxe-table-column>
        <vxe-table-column min-width="150"
                          field="END_COUNT"
                          :title="$t('SmtStencilRegion._3')"
                          :edit-render="{name:'$input',props:{type:'number',min: '0'}, events: { blur: handleCheckEndCount }}"></vxe-table-column>
        <vxe-table-column min-width="180"
                          field="BETWEEN_STATUS"
                          :title="$t('SmtStencilRegion._4')"
                          :edit-render="{name: 'select', options: StatusList}" />
        <vxe-table-column min-width="180"
                          field="OUTSIDE_STATUS"
                          :title="$t('SmtStencilRegion._5')"
                          :edit-render="{name: 'select', options: StatusList}" />
        <vxe-table-column min-width="120"
                          field="ORDER_NO"
                          :title="$t('SmtStencilRegion._6')"
                          :edit-render="{name: 'input'}" />
        <vxe-table-column min-width="150"
                          field="DESCRIPTION"
                          :title="$t('SmtStencilRegion._7')"
                          :edit-render="{name: 'input'}" />
        <vxe-table-column :title="$t('publics.field.operate')"
                          min-width="120"
                          align="center"
                          fixed="right">
          <template v-slot="{ row }">
            <el-button type="danger"
                       @click="removeClick(row, row.$index)"
                       v-if="$btnList.indexOf('SmtStencilRegionRemove') !== -1">{{ $t('publics.btn.delete') }}</el-button>
          </template>
        </vxe-table-column>
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

<script>
import pagination from '@/views/mixin/page'
import helper from '@/api/Helper'
import customContainerHeader from '@/components/custom-container-header'
import CURD from '@/views/mixin/CURD'
const API = helper('SmtStencilRegion')
export default {
  name: 'SmtStencilRegion',
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
      validRules: {
        STENCIL_ID: [
          {
            required: true,
            message: this.$t('SmtStencilRegion._8')
          }
        ],
        BEGIN_COUNT: [
          {
            required: true,
            message: this.$t('SmtStencilRegion._9')
          }
        ],
        END_COUNT: [
          {
            required: true,
            message: this.$t('SmtStencilRegion._10')
          }
        ],
        BETWEEN_STATUS: [
          {
            required: true,
            message: this.$t('SmtStencilRegion._11')
          }
        ],
        OUTSIDE_STATUS: [
          {
            required: true,
            message: this.$t('SmtStencilRegion._12')
          }
        ]
      },
      StencilTypeList: [],
      StatusList: []
    }
  },
  methods: {
    async getIndex () {
      const res = await API.Index()
      if (res.Result) {
        const { StencilTypeList, StatusList } = res.Result
        this.StencilTypeList.push({
          label: '',
          value: '',
          disabled: false
        })
        StencilTypeList.map(item => {
          this.StencilTypeList.push({
            label: item.NAME,
            value: item.CODE ? item.CODE.toString() : '',
            disabled: false
          })
        })
        this.StatusList.push({
          label: '',
          value: '',
          disabled: false
        })
        StatusList.map(item => {
          this.StatusList.push({
            label: item.NAME,
            value: item.CODE ? item.CODE.toString() : '',
            disabled: false
          })
        })
        this.getLoadData()
      }
    },
    async getLoadData () {
      this.loading = true
      const res = await API.LoadData(this.formData)
      this.loading = false
      this.mainTable = res.Result
        ? res.Result.map(item => {
          item.STENCIL_ID = item.STENCIL_ID ? item.STENCIL_ID.toString() : ''
          item.BETWEEN_STATUS = item.BETWEEN_STATUS
            ? item.BETWEEN_STATUS.toString()
            : ''
          item.OUTSIDE_STATUS = item.OUTSIDE_STATUS
            ? item.OUTSIDE_STATUS.toString()
            : ''
          return item
        })
        : []
      this.totalPage = res.TotalCount || 0
    },
    async exportData () {
      this.loading = true
      const res = await API.ExportData(this.formData)
      this.loading = false
      this.mainTable = res.Result || []
      this.totalPage = res.TotalCount || 0
    },
    insertEvent (row) {
      const record = {
        ID: 0,
        STENCIL_ID: null,
        BEGIN_COUNT: null,
        END_COUNT: null,
        BETWEEN_STATUS: null,
        OUTSIDE_STATUS: null,
        ORDER_NO: null,
        DESCRIPTION: null
      }
      this.$refs.xTable.insertAt(record, row).then(({ row }) => {
        this.$refs.xTable.setActiveRow(row)
      })
    },
    searchClick () {
      this.formData.Page = 1
      this.getLoadData()
    },
    handleCheckEndCount (e) {
      if (e.row.END_COUNT < e.row.BEGIN_COUNT) {
        this.$message.error(this.$t('SmtStencilRegion._13'))
        e.row.END_COUNT = ''
        return false
      }
    }
  },
  created () {
    this.getIndex()
  }
}
</script>
