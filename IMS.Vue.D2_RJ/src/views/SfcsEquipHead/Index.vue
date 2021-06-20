<template>
  <custom-container>
    <!-- 头部 -->
    <template slot="header">
      <custom-container-header :isImport="false">
        <el-input
          clearable
          v-model="formData.WO_NO"
          :placeholder="$t('SfcsEquipHead.WO_NO')"
          style="width: 200px"
          @keyup.enter.native="searchClick"
        />
        <el-button
          type="primary"
          icon="el-icon-search"
          @click.prevent="searchClick"
          >{{ $t("publics.btn.search") }}</el-button
        >&nbsp;
        <el-button
          type="danger"
          icon="el-icon-delete"
          @click.prevent="cleanClick"
          >{{ $t("publics.btn.clear") }}</el-button
        >&nbsp;
      </custom-container-header>
    </template>
    <!-- 表格 -->

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
      >
        <vxe-table-column
          field="OPERATION_LINE_NAME"
          :title="$t('SfcsEquipHead.LINE_NAME')"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          field="WO_NO"
          :title="$t('SfcsEquipHead.WO_NO')"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          field="OPERATION_SITE_NAME"
          :title="$t('SfcsEquipHead.OPERATION_SITE_NAME')"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          field="DEFECT_CODE"
          :title="$t('SfcsEquipHead.DEFECT_CODE')"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          field="DEFECT_NAME"
          :title="$t('SfcsEquipHead.DEFECT_NAME')"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          field="LOC"
          :title="$t('SfcsEquipHead.LOC')"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
      </vxe-table>
    </div>
    <!-- 分页 -->
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
  </custom-container>
</template>

<script>
import customContainerHeader from '@/components/custom-container-header'
import customContainer from '@/components/custom-container'
import pagination from '@/views/mixin/page'
import { GetSfscEquipHeadDataAsync } from '@/api/SfcsEquipHead'
export default {
  name: 'ScraperUsed',
  components: {
    customContainerHeader,
    customContainer
  },
  mixins: [pagination],
  data () {
    return {
      formData: {
        Page: 1,
        Limit: 15,
        WO_NO: ''
      },
      LineList: [], // 线体/产线
      loading: false,
      mainTable: []
    }
  },
  created () {
    this.getLoadData()
  },
  methods: {
    async getLoadData () {
      this.loading = true
      const res = await GetSfscEquipHeadDataAsync(this.formData)
      console.log(JSON.parse(res.Result))
      if (res.Result) {
        this.mainTable = JSON.parse(res.Result)
        this.totalPage = res.TotalCount
        this.loading = false
      } else {
        this.loading = false
        this.mainTable = []
        this.totalPage = 0
      }
    },
    // 搜索
    searchClick () {
      this.formData.Page = 1
      this.getLoadData()
    },
    cleanClick () {
      this.formData = {}
      this.formData = {
        Page: 1,
        Limit: 15,
        WO_NO: ''
      }
      this.getLoadData()
    }
  }
}
</script>

<style scoped="scoped">
.table-container {
  height: calc(100vh - 60px - 74px - 73px - 30px) !important;
}
</style>
