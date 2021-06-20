<template>
  <d2-container class="BOMchangeRecord">
    <template slot="header">
      <custom-container-header
        importBtnName="MesProductionPreConfImport"
        exportBtnName="MesProductionPreConfExport"
        exportTplName="MesProductionPreConfExportTPL"
      >
        <el-input
          v-model="formData.SUPERCODE"
          style="width: 200px"
          clearable
          :placeholder="$t('BOMchangeRecord._1')"
        ></el-input>
        <el-input
          v-model="formData.BCITEMCODE"
          style="width: 200px"
          clearable
          :placeholder="$t('BOMchangeRecord._2')"
        ></el-input>
        <el-button
          type="primary"
          icon="el-icon-search"
          @click.prevent="searchClick"
        >{{ $t("publics.btn.search") }}</el-button>
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
        :mouse-config="{ selected: true }"
        :edit-config="{ trigger: 'click', mode: 'row', showStatus: true }"
        :radio-config="{ labelField: 'name', trigger: 'row' }"
        :checkbox-config="{ checkField: 'checked', trigger: 'row' }"
      >
        <vxe-table-column
          field="SUPERCODE"
          min-width="210"
          disabled
          :title="$t('BOMchangeRecord._3')"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          field="SUPERDESC"
          min-width="180"
          :title="$t('BOMchangeRecord._4')"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          field="PROJCODE"
          min-width="220"
          :title="$t('BOMchangeRecord._5')"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          field="STAT"
          min-width="180"
          :title="$t('BOMchangeRecord._6')"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          field="BOMOPERATION"
          min-width="180"
          :title="$t('BOMchangeRecord._7')"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          field="BCITEMCODE"
          min-width="180"
          :title="$t('BOMchangeRecord._8')"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          field="BCLOCATION"
          min-width="180"
          :title="$t('BOMchangeRecord._9')"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          field="BCNAME"
          min-width="180"
          :title="$t('BOMchangeRecord._10')"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          field="BCSPEC"
          min-width="190"
          :title="$t('BOMchangeRecord._11')"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          field="BCQTY"
          min-width="200"
          :title="$t('BOMchangeRecord._12')"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          field="BCUNIT"
          min-width="180"
          :title="$t('BOMchangeRecord._13')"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          field="ACBOMDDEF1"
          min-width="200"
          :title="$t('BOMchangeRecord._14')"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          field="ACBOMDDEF4"
          min-width="230"
          :title="$t('BOMchangeRecord._15')"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          field="ACNOTE"
          min-width="190"
          :title="$t('BOMchangeRecord._16')"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          field="NTCODE"
          min-width="190"
          :title="$t('BOMchangeRecord._17')"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          field="CDATA"
          min-width="180"
          :title="$t('BOMchangeRecord._18')"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          field="ECNNAME"
          min-width="180"
          :title="$t('BOMchangeRecord._19')"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
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
import { LoadData } from '@/api/MesCpcecnBomline'
import customContainerHeader from '@/components/custom-container-header'
export default {
  name: 'BOMchangeRecord',
  components: {
    customContainerHeader
  },
  data () {
    return {
      loading: false,
      mainTable: [],
      formData: {
        SUPERCODE: '',
        BCITEMCODE: '',
        Page: 1,
        Limit: 15
      },
      totalPage: 0
    }
  },
  methods: {
    async getLoadData () {
      this.loading = true
      const res = await LoadData(this.formData)
      this.loading = false
      this.mainTable = res.Result
      console.log(res.Result, 'res.Resultres.Result')
      this.totalPage = res.TotalCount || 0
    },
    // 搜索
    searchClick () {
      this.formData.Page = 1
      this.getLoadData()
    },
    // 分页
    handleSizeChange (val) {
      this.formData.Limit = val
      this.getLoadData()
    },
    handleCurrentChange (val) {
      this.formData.Page = val
      this.getLoadData()
    }
  },
  created () {
    this.getLoadData()
  }
}
</script>
