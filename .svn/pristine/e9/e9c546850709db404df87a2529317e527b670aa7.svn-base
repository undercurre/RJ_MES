
<template>
  <d2-container class="SamplingBadDetails">
    <template slot="header">
      <custom-container-header :isImport="false"
                               exportBtnName="GetCheckFailReportData"
                               :isExportTpl="false" >
        <el-select
          v-model="listQuery.WO_CLASS"
          clearable
          style="width: 200px"
          :placeholder="$t('SamplingBadDetails._1')"
          class="common-top"
        >
          <el-option
            v-for="item in Shiftlist"
            :key="item.Id"
            :label="item.val"
            :value="item.Id"
          /> </el-select
        >&nbsp;
        <!-- <el-select
          v-model="listQuery.LINE_TYPE"
          clearable
          style="width:150px"
          :placeholder="$t('SamplingBadDetails._2')"
          class="common-top"
        >
          <el-option v-for="item in Bodyline" :key="item.Id" :label="item.val" :value="item.Id" />
        </el-select>&nbsp;-->

        <el-date-picker
          v-model="calldate"
          type="daterange"
          style="width: 240px"
          :start-placeholder="$t('SamplingBadDetails._3')"
          :end-placeholder="$t('SamplingBadDetails._4')"
          align="right"
          value-format="yyyy-MM-dd"
        />
        <el-button
          style="margin-left: 10px"
          type="primary"
          icon="el-icon-search"
          @click.prevent="doFilter"
          >{{ $t("SamplingBadDetails._5") }}</el-button
        >
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
          fixed="left"
          min-width="120"
          :title="$t('SamplingBadDetails._6')"
        >
          <template slot-scope="scope">
            <span>{{ scope.$rowIndex + 1 }}</span>
          </template>
        </vxe-table-column>
        <vxe-table-column
          field="PART_NO"
          min-width="140"
          :title="$t('SamplingBadDetails._7')"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          field="PART_NAME"
          min-width="200"
          :title="$t('SamplingBadDetails._8')"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          field="PART_DESC"
          min-width="200"
          :title="$t('SamplingBadDetails._9')"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          field="WO_QTY"
          min-width="100"
          :title="$t('SamplingBadDetails._10')"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          field="ALL_QTY"
          min-width="200"
          :title="$t('SamplingBadDetails._11')"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          field="CHECK_QTY"
          min-width="170"
          :title="$t('SamplingBadDetails._12')"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          field="FAIL_QTY"
          min-width="180"
          :title="$t('SamplingBadDetails._13')"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          field="FAIL_RATE"
          min-width="180"
          :title="$t('SamplingBadDetails._14')"
          :edit-render="{ type: 'visible', props: { readonly: true } }"
        >
          <template v-slot:edit="{ row }">
            <span>{{ row.FAIL_RATE }}%</span>
          </template>
        </vxe-table-column>

        <vxe-table-column
          field="DEFECT_DESCRIPTION"
          min-width="180"
          :title="$t('SamplingBadDetails._15')"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          field="STATUS"
          min-width="150"
          :title="$t('SamplingBadDetails._16')"
          :edit-render="{ type: 'visible', props: { readonly: true } }"
        >
          <template v-slot:edit="{ row }">
            <span
              v-if="row.STATUS == 'PASS'"
              style="font-weight: 800; color: green"
              >{{ $t("SamplingBadDetails._17") }}</span
            >
            <span v-else style="font-weight: 800; color: red">{{
              $t("SamplingBadDetails._18")
            }}</span>
          </template>
        </vxe-table-column>
        <vxe-table-column
          field="WO_CLASS"
          min-width="100"
          :title="$t('SamplingBadDetails._19')"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          field="CHECK_DATE"
          min-width="140"
          :title="$t('SamplingBadDetails._20')"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          field="CHECKER"
          min-width="160"
          :title="$t('SamplingBadDetails._21')"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          field="AUDITOR"
          min-width="160"
          :title="$t('SamplingBadDetails._22')"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          field="REMARK"
          min-width="170"
          :title="$t('SamplingBadDetails._23')"
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
import { GetCheckFailReportData } from '@/api/MesSpotCheckReport'
import customContainerHeader from '@/components/custom-container-header'
import pagination from '@/views/mixin/page'
export default {
  name: 'SamplingBadDetails',
  components: {
    customContainerHeader
  },
  mixins: [pagination],
  data () {
    return {
      calldate: [],
      Shiftlist: [
        {
          Id: this.$t('SamplingBadDetails._24'),
          val: this.$t('SamplingBadDetails._24')
        },
        {
          Id: this.$t('SamplingBadDetails._25'),
          val: this.$t('SamplingBadDetails._25')
        }
      ],
      Bodyline: [
        {
          Id: 'SMT',
          val: 'SMT'
        },
        {
          Id: 'AIRI',
          val: 'AI&RI'
        },
        {
          Id: 'PCBA',
          val: this.$t('SamplingBadDetails._26')
        }
      ],
      listQuery: {
        WO_CLASS: '',
        LINE_TYPE: '',
        BEGIN_TIME: '',
        END_TIME: ''
      },
      loading: false,
      mainTable: []
    }
  },
  mounted () {},
  created () {
    var date = new Date()
    var seperator1 = '-'
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var strDate = date.getDate()
    if (month >= 1 && month <= 9) {
      month = '0' + month
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = '0' + strDate
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate
    this.calldate[0] = currentdate
    this.calldate[1] = currentdate
    if (this.calldate !== '' && this.calldate !== null) {
      this.listQuery.BEGIN_TIME = this.calldate[0]
      this.listQuery.END_TIME = this.calldate[1]
    } else {
      this.listQuery.BEGIN_TIME = ''
      this.listQuery.END_TIME = ''
    }
    this.getLoadData()
  },
  methods: {
    doFilter () {
      if (this.calldate !== '' && this.calldate !== null) {
        this.listQuery.BEGIN_TIME = this.calldate[0]
        this.listQuery.END_TIME = this.calldate[1]
      } else {
        this.listQuery.BEGIN_TIME = ''
        this.listQuery.END_TIME = ''
      }
      this.getLoadData()
    },
    // 获取列表
    async getLoadData () {
      this.loading = true
      const res = await GetCheckFailReportData(this.listQuery)
      console.log(res, 'resresres')
      this.mainTable = res.Result.data || []
      this.loading = false
      // console.log(JSON.parse(res.Result), 'JSON.parse(res.Result)')
      this.totalPage = this.mainTable.length
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
