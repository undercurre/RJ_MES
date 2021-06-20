<template>
  <custom-container>
    <!-- 头部 -->
    <template slot="header">
      <custom-container-header :isImport="false">
        <el-input
          clearable
          v-model="formData.SCRAPER_NO"
          :placeholder="$t('SfcsScraperUsed._1')"
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
          field="SCRAPER_NO"
          :title="$t('SfcsScraperUsed._1')"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          field="STATUS_NAME"
          :title="$t('SfcsScraperUsed._2')"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          field="PRINT_COUNT"
          :title="$t('SfcsScraperUsed._3')"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          field="OPERATION_TIME"
          :title="$t('SfcsScraperUsed._4')"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          field="NICK_NAME"
          :title="$t('SfcsScraperUsed._5')"
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
// import echarts from 'echarts'
import { GetScraperUseDataAsync } from '@/api/SfcsScraperUsed'
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
        SCRAPER_NO: ''
        // WO_NO:'',
      },
      LineList: [], // 线体/产线
      loading: false,
      mainTable: []
    }
  },
  created () {
    // this.getLines()
    this.getLoadData()
  },
  methods: {
    // async getLines () {
    //   const res = await GetLinesList()
    //   this.LineList = res.Result ? res.Result : []
    // },
    async getLoadData () {
      this.loading = true
      const res = await GetScraperUseDataAsync(this.formData)
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
        SCRAPER_NO: ''
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
