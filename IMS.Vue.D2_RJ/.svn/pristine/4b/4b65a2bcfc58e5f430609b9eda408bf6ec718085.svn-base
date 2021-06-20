<template>
  <d2-container>
    <template slot="header">
      <custom-container-header
        importBtnName="SmtFeederDefectReasonImport"
        exportBtnName="SmtFeederDefectReasonExport"
        exportTplName="SmtFeederDefectReasonExportTPL"
      >
        <el-input
          v-model="formData.CODE"
          :placeholder="$t('sdr_le.ld_code')"
          clearable
          style="width:200px"
          @keyup.enter.native="searchClick"
        />&nbsp;
        <el-input
          v-model="formData.DESCRIPTION"
          :placeholder="$t('sld.p_dn')"
          clearable
          style="width:200px"
          @keyup.enter.native="searchClick"
        />&nbsp;
        <el-select
          v-model="formData.ENABLED"
          clearable
          style="width:200px"
          :placeholder="$t('sdr_le.p_yn')"
        >
          <el-option :label="$t('sdr_le.no')" value="N" />
          <el-option :label="$t('sdr_le.yes')" value="Y" />
        </el-select>
        <el-button
          type="primary"
          icon="el-icon-search"
          @click.prevent="searchClick"
        >{{ $t('sdr_le.hd_sf') }}</el-button>
        <el-button
          type="success"
          icon="el-icon-plus"
          v-if="$btnList.indexOf('SmtFeederDefectReasonAdd') !== -1"
          @click="insertEvent(0)"
        >{{ $t('sdr_le.add') }}</el-button>
        <el-button
          type="primary"
          icon="el-icon-check"
          v-if="$btnList.indexOf('SmtFeederDefectReasonEdit') !== -1"
          @click.prevent="preserveClick()"
        >{{ $t('sdr_le.save') }}</el-button>
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
          :title="$t('sdr_le.code')"
          :edit-render="{name: 'input'}"
        />
        <vxe-table-column
          min-width="180"
          field="DESCRIPTION"
          :title="$t('sdr_le.dn')"
          :edit-render="{name: 'input'}"
        />
        <vxe-table-column
          min-width="180"
          field="ENABLED"
          :title="$t('sdr_le.yn')"
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
        <vxe-table-column :title="$t('sdr_le.tb_og')" min-width="120" align="center" fixed="right">
          <template v-slot="{ row }">
            <el-button
              type="danger"
              @click="removeClick(row, row.$index)"
              v-if="$btnList.indexOf('SmtFeederDefectReasonRemove') !== -1"
            >{{ $t('sdr_le.tb_rm') }}</el-button>
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
import { Index, LoadData, SaveData } from '@/api/SmtFeederDefectReason'
import pagination from '@/views/mixin/page'
import CURD from '@/views/mixin/CURD'
export default {
  name: 'SmtFeederDefectReason',
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
        ENABLED: '',
        Key: '',
        Page: 1,
        Limit: 15
      },
      CodeList: [],
      validRules: {
        CODE: [
          {
            required: true,
            message: this.$t('sdr_le.ld_code')
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
      const res = await Index()
      if (res.Result) {
        this.CodeList = res.Result.CodeList
        this.StatusList = res.Result.StatusList
        this.getLoadData()
      }
    },
    async getLoadData () {
      this.loading = true
      const res = await LoadData(this.formData)
      if (res.Result) {
        this.mainTable = res.Result
        this.totalPage = res.TotalCount
        this.loading = false
      }
      this.loading = false
    },
    // 搜索
    searchClick () {
      this.formData.Page = 1
      this.getLoadData()
    },
    // 添加
    insertEvent (row) {
      const record = {
        ID: 0,
        CODE: '', // 失效代码
        DESCRIPTION: '',
        ENABLED: '' // 是否可用
      }
      this.$refs.xTable.insertAt(record, row).then(({ row }) => {
        this.$refs.xTable.setActiveRow(row)
      })
    }
  }
}
</script>

<style>
</style>
