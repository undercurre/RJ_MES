<template>
  <d2-container class="MaterialChangeRecord">
    <template slot="header">

      <custom-container-header exportMehodsName="getLoadData"
                               importBtnName="SmtResourceCategoryImport"
                               exportBtnName="SmtResourceCategoryExport"
                               exportTplName="SmtResourceCategoryExportTpl">
        <el-input v-model="formData.ITEMCODE"
                  style="width: 200px"
                  clearable
                  :placeholder="$t('MaterialChangeRecord._1')"></el-input>
        <el-button type="primary"
                   icon="el-icon-search"
                   @click.prevent="searchClick">{{ $t("publics.btn.search") }}</el-button>
      </custom-container-header>
    </template>
    <div class="table-container">
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
                 :loading="loading"
                 :data="mainTable"
                 :mouse-config="{ selected: true }"
                 :edit-config="{ trigger: 'click', mode: 'row', showStatus: true }"
                 :radio-config="{ labelField: 'name', trigger: 'row' }"
                 :checkbox-config="{ checkField: 'checked', trigger: 'row' }">
        <vxe-table-column field="ITEMCODE"
                          min-width="180"
                          :title="$t('MaterialChangeRecord._2')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
        <vxe-table-column field="PROJCODE"
                          min-width="220"
                          :title="$t('MaterialChangeRecord._3')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
        <vxe-table-column field="STAT"
                          min-width="180"
                          :title="$t('MaterialChangeRecord._4')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
        <vxe-table-column field="CDATA"
                          min-width="180"
                          :title="$t('MaterialChangeRecord._5')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
        <vxe-table-column field="DCNAME"
                          min-width="180"
                          :title="$t('MaterialChangeRecord._6')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
        <vxe-table-column field="BCCLAS"
                          min-width="180"
                          :title="$t('MaterialChangeRecord._7')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
        <vxe-table-column field="BCSPEC"
                          min-width="180"
                          :title="$t('MaterialChangeRecord._8')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
        <vxe-table-column field="BCMATERIAL"
                          min-width="180"
                          :title="$t('MaterialChangeRecord._9')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
        <vxe-table-column field="BCEXPANDS"
                          min-width="180"
                          :title="$t('MaterialChangeRecord._10')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
        <vxe-table-column field="BCSTRDEF15"
                          min-width="180"
                          :title="$t('MaterialChangeRecord._11')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
        <vxe-table-column field="BCSTRDEF18"
                          min-width="180"
                          :title="$t('MaterialChangeRecord._12')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
        <vxe-table-column field="BCSTRDEF19"
                          min-width="180"
                          :title="$t('MaterialChangeRecord._13')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
        <vxe-table-column field="ACNAME"
                          min-width="180"
                          :title="$t('MaterialChangeRecord._14')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
        <vxe-table-column field="ACCLAS"
                          min-width="180"
                          :title="$t('MaterialChangeRecord._15')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
        <vxe-table-column field="ACSPEC"
                          min-width="180"
                          :title="$t('MaterialChangeRecord._16')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
        <vxe-table-column field="ACMATERIAL"
                          min-width="180"
                          :title="$t('MaterialChangeRecord._17')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
        <vxe-table-column field="ACEXPANDS"
                          min-width="180"
                          :title="$t('MaterialChangeRecord._18')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
        <vxe-table-column field="ACSTRDEF15"
                          min-width="180"
                          :title="$t('MaterialChangeRecord._19')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
        <vxe-table-column field="ACSTRDEF18"
                          min-width="200"
                          :title="$t('MaterialChangeRecord._20')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
        <vxe-table-column field="ACSTRDEF19"
                          min-width="200"
                          :title="$t('MaterialChangeRecord._21')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
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
import { LoadData } from '@/api/MesCpcecnItemline'
import customContainerHeader from '@/components/custom-container-header'
export default {
  name: 'MaterialChangeRecord',
  components: {
    customContainerHeader
  },
  data () {
    return {
      loading: false,
      mainTable: [],
      formData: {
        ITEMCODE: '',
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
