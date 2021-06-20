<template>
  <custom-container>
    <!-- 头部 -->
    <template slot="header">
      <custom-container-header :isImport="false">
        <el-date-picker
          v-model="formData.startTime"
          type="date"
          placeholder="选择解冻开始日期"
        >
        </el-date-picker>
        <el-input
          clearable
          v-model="formData.resourceNo"
          :placeholder="$t('SmtResourceReport._100')"
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
        <el-button
          type="primary"
          icon="el-icon-receiving"
          @click.prevent="exportAllData"
          >{{ $t("publics.btn.export") }}</el-button
        >&nbsp;
      </custom-container-header>
    </template>
    <!-- 表格 -->

    <div class="container">
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
            field="RESOURCE_NAME"
            :title="$t('SmtResourceReport._1')"
            min-width="80"
            :edit-render="{ name: '$input', props: { readonly: true } }"
          />
          <vxe-table-column
            field="RESOURCE_NO"
            :title="$t('SmtResourceReport._2')"
            min-width="160"
            :edit-render="{ name: '$input', props: { readonly: true } }"
          />
          <vxe-table-column
            field="WARM_BEGIN"
            :title="$t('SmtResourceReport._3')"
            width="160"
          >
            <template v-slot="{ row }">
              <span>{{ formatDate(row.WARM_BEGIN) }}</span>
            </template>
          </vxe-table-column>
          <vxe-table-column
            field="WARM_END"
            :title="$t('SmtResourceReport._4')"
            width="160"
          >
            <template v-slot="{ row }">
              <span>{{ formatDate(row.WARM_END) }}</span>
            </template>
          </vxe-table-column>
          <vxe-table-column
            field="MIX_BEGIN"
            :title="$t('SmtResourceReport._5')"
            width="160"
          >
            <template v-slot="{ row }">
              <span>{{ formatDate(row.MIX_BEGIN) }}</span>
            </template>
          </vxe-table-column>
          <vxe-table-column
            field="MIX_END"
            :title="$t('SmtResourceReport._6')"
            width="160"
          >
            <template v-slot="{ row }">
              <span>{{ formatDate(row.MIX_END) }}</span>
            </template>
          </vxe-table-column>
          <vxe-table-column
            field="ICE_BEGIN"
            :title="$t('SmtResourceReport._7')"
            width="160"
          >
            <template v-slot="{ row }">
              <span>{{ formatDate(row.ICE_BEGIN) }}</span>
            </template>
          </vxe-table-column>
          <vxe-table-column
            field="STATUS"
            :title="$t('SmtResourceReport._8')"
            min-width="80"
            :edit-render="{ name: '$input', props: { readonly: true } }"
          />
          <vxe-table-column
            field="NICK_NAME"
            :title="$t('SmtResourceReport._9')"
            width="120"
            :edit-render="{ name: '$input', props: { readonly: true } }"
          />
          <vxe-table-column
            field="DESCRIPTION"
            :title="$t('SmtResourceReport._10')"
            min-width="120"
            :edit-render="{ name: '$input', props: { readonly: true } }"
          />
        </vxe-table>
      </div>
      <!-- 分页 -->
      <div style="padding: 10px 10px; border-left: 1px solid #eee">
        <el-pagination
          :current-page="formData.Page"
          :page-size="formData.Limit"
          :page-sizes="[15, 25, 35, 45]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalPage"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </custom-container>
</template>

<script>
import customContainerHeader from '@/components/custom-container-header'
import customContainer from '@/components/custom-container'
import pagination from '@/views/mixin/page'
// import echarts from 'echarts'
import { mapGetters } from 'vuex'
import { GetResourceRuncardReport } from '@/api/Kanban'
export default {
  name: 'SmtResourceReport',
  components: {
    customContainerHeader,
    customContainer
  },
  mixins: [pagination],
  computed: {
    ...mapGetters(['userinfo', 'userId'])
  },
  data () {
    return {
      formData: {
        Page: 1,
        Limit: 15,
        resourceNo: '',
        startTime: ''
      },
      dialogVisible: false,
      loading: false,
      mainTable: []
    }
  },
  created () {
    this.getLoadData()
  },
  methods: {
    // 获取下拉菜单
    async getIndex () {},
    async getLoadData () {
      this.loading = true
      const res = await GetResourceRuncardReport(this.formData)
      if (res.Result) {
        var data = JSON.parse(res.Result)
        this.mainTable = data
        this.totalPage = res.TotalCount
        this.loading = false
      } else {
        this.loading = false
      }
    },
    // 搜索
    searchClick () {
      this.formData.Page = 1
      this.getLoadData()
    },
    cleanClick () {
      this.formData = {
        Page: 1,
        Limit: 15
      }
      this.getLoadData()
    },
    formatDate (value) {
      if (value) return value.substr(0, value.length - 3)
      return ''
    },
    async exportAllData () {
      var form = Object.assign({}, this.formData)
      form.Limit = 10000
      const res = await GetResourceRuncardReport(form)
      this.$refs.xTable.exportData({
        filename: '辅料作业',
        type: 'csv',
        isHeader: true,
        isFooter: true,
        data: JSON.parse(res.Result)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.table-container {
  height: calc(100vh - 60px - 74px - 23px) !important;
}

.container {
  box-shadow: 3px 5px 5px #eee;
  margin-bottom: 15px;
}

.child-container {
  border: 1px solid #eee;
  padding: 10px;
}
</style>
