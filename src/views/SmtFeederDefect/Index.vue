<template>
  <d2-container>
    <template slot="header">
      <custom-container-header
        importBtnName="SmtFeederDefectImport"
        exportBtnName="SmtFeederDefectExport"
        exportTplName="SmtFeederDefectExportTPL"
      >
        <el-input
          v-model="formData.CODE"
          :placeholder="$t('SmtFeederDefect._4')"
          clearable
          style="width:200px"
          @keyup.enter.native="searchClick"
        />&nbsp;
        <el-input
          v-model="formData.DESCRIPTION"
          :placeholder="$t('SmtFeederDefect._5')"
          clearable
          style="width:200px"
          @keyup.enter.native="searchClick"
        />&nbsp;
        <el-select
          v-model="formData.ENABLED"
          clearable
          style="width:200px"
          :placeholder="$t('sdr_de.p_yn')"
        >
          <el-option :label="$t('sdr_de.no')" value="N" />
          <el-option :label="$t('sdr_de.yes')" value="Y" />
        </el-select>&nbsp;
        <el-button
          type="primary"
          icon="el-icon-search"
          @click.prevent="searchClick"
        >{{ $t('sdr_le.hd_sf') }}</el-button>
        <el-button
          type="success"
          @click.prevent="insertEvent(0)"
          icon="el-icon-plus"
          v-if="$btnList.indexOf('SmtFeederDefectAdd') !== -1"
        >{{ $t('publics.btn.add') }}</el-button>
        <el-button
          type="primary"
          icon="el-icon-check"
          @click.prevent="preserveClick()"
          v-if="$btnList.indexOf('SmtFeederDefectEdit') !== -1"
        >{{ $t('publics.btn.save') }}</el-button>
      </custom-container-header>
    </template>
    <div>
      <vxe-table
        ref="xTable"
        class="storageTable"
        border
        resizable
        height="100%"
        size="medium"
        align="center"
        highlight-hover-row
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
          min-width="180"
          field="CODE"
          :title="$t('SmtFeederDefect._1')"
          :edit-render="{autofocus: '.custom-input'}"
        >
          <template v-slot:edit="{ row, $rowIndex }">
            <el-input v-model="row.CODE" :disabled="!disabled && $rowIndex === currentRowIndex" />
          </template>
        </vxe-table-column>
        <vxe-table-column
          min-width="180"
          field="DESCRIPTION"
          :title="$t('SmtFeederDefect._2')"
          :edit-render="{name: 'input'}"
        />
        <vxe-table-column
          min-width="180"
          field="ENABLED"
          :title="$t('SmtFeederDefect._3')"
          :edit-render="{autofocus: '.custom-input', type: 'visible'}"
        >
          <template v-slot:edit="{ row }">
            <el-switch
              v-model="row.ENABLED"
              :active-text="$t('publics.btn.yes')"
              :inactive-text="$t('publics.btn.no')"
              active-color="#13ce66"
              inactive-color="#cccccc"
              active-value="Y"
              inactive-value="N"
            />
          </template>
        </vxe-table-column>
        <vxe-table-column
          :title="$t('publics.field.operate')"
          min-width="120"
          align="center"
          fixed="right"
        >
          <template v-slot="{ row }">
            <el-button
              type="danger"
              @click="removeClick(row, row.$index)"
              v-if="$btnList.indexOf('SmtFeederDefectRemove') !== -1"
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
import customContainerHeader from '@/components/custom-container-header'
import pagination from '@/views/mixin/page'
import CURD from '@/views/mixin/CURD'
import { Index, LoadData, SaveData } from '@/api/SmtFeederDefect'
export default {
  name: 'SmtFeederDefect',
  components: {
    customContainerHeader
  },
  mixins: [
    pagination,
    CURD({
      defaultSaveAPI: e => SaveData(e)
    })
  ],
  data () {
    return {
      formData: {
        CODE: '',
        DESCRIPTION: ''
      },
      validRules: {
        CODE: [
          {
            required: true,
            message: this.$t('SmtFeederDefect._4')
          }
        ]
      },
      disabled: false,
      currentRowIndex: -1
    }
  },
  created () {
    this.getIndex()
  },
  methods: {
    async getIndex () {
      const res = await Index()
      if (res.Result) {
        this.getLoadData()
      }
    },
    async getLoadData () {
      const res = await LoadData(this.formData)
      if (res.Result) {
        this.mainTable = res.Result
        this.totalPage = res.TotalCount
      } else {
        this.mainTable = []
        this.totalPage = 0
      }
    },
    // 搜索
    searchClick () {
      this.formData.Page = 1
      this.getLoadData()
    },
    // async cellClick (e) {
    //   this.disabled = false
    //   this.currentRowIndex = e.rowIndex
    //   const { row, columnIndex } = e
    //   if (columnIndex === 3) {
    //     return false
    //   }
    //   const res = await ItemIsByUsed(row.SCRAPER_NO)
    //   if (res.Result !== void 0) {
    //     if (res.Result) {
    //       return false
    //     } else {
    //       this.disabled = true
    //       const set = ['CODE', 'DESCRIPTION', 'ENABLED']
    //       this.$refs.xTable.setActiveCell(row, set[columnIndex])
    //     }
    //   }
    // },
    // 新增
    insertEvent (row) {
      const record = {
        ID: 0,
        CODE: null,
        DESCRIPTION: null,
        ENABLED: 'Y'
      }
      // 如果是 -1 则从最后新增一条数据
      this.$refs.xTable.insertAt(record, row).then(({ row }) => {
        this.$refs.xTable.setActiveRow(row)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.storageTable {
  height: calc(100vh - 60px - 21px - 74px - 20px - 41px - 22px);
}
</style>
