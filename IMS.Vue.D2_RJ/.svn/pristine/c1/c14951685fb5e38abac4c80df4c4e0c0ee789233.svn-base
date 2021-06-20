<template>
  <custom-container>
    <!-- 头部 -->
    <template slot="header">
      <custom-container-header :isImport="false">
        <el-input
          clearable
          v-model="formData.WO_NO"
          :placeholder="$t('SfcsDefectReportWork._1')"
          style="width: 200px"
          @keyup.enter.native="searchClick"
        />
        <el-button
          type="primary"
          icon="el-icon-search"
          @click.prevent="searchClick"
          >{{ $t("publics.btn.search") }}</el-button
        >
        <el-button
          type="danger"
          icon="el-icon-delete"
          @click.prevent="cleanClick"
          >{{ $t("publics.btn.clear") }}</el-button
        >
      </custom-container-header>
    </template>
    <!-- 表格 -->

    <div class="table-container-zhujiang">
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
        :mouse-config="{ selected: true }"
      >
        <vxe-table-column
          field="PART_NO"
          :title="$t('SpiReport._0')"
          min-width="180"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          field="Area"
          :title="$t('SpiReport._1')"
          min-width="180"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          field="HEIGHT"
          :title="$t('SpiReport._2')"
          min-width="180"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          field="VOLUME"
          :title="$t('SpiReport._3')"
          min-width="180"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          field="AREA_PEC"
          :title="$t('SpiReport._4')"
          min-width="180"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          field="HEIGHT_PEC"
          :title="$t('SpiReport._5')"
          min-width="180"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          field="VOLUME_PEC"
          :title="$t('SpiReport._6')"
          min-width="180"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          field="X_OFFSET"
          :title="$t('SpiReport._7')"
          min-width="180"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          field="Y_OFFSET"
          :title="$t('SpiReport._8')"
          min-width="180"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          field="X_PADSIZE"
          :title="$t('SpiReport._9')"
          min-width="180"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          field="Y_PADSIZE"
          :title="$t('SpiReport._10')"
          min-width="180"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          field="RESULT"
          :title="$t('SpiReport._11')"
          min-width="180"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          field="ERRCODE"
          :title="$t('SpiReport._12')"
          min-width="180"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          field="PIN_NUM"
          :title="$t('SpiReport._13')"
          min-width="180"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
      </vxe-table>
    </div>
    <!-- 分页 -->
    <div style="padding: 10px 0">
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
    <div class="report">
      <div style="font-weight: 600; padding: 10px 20px 0 20px">错误码统计</div>
      <div id="errorCount"></div>
    </div>
  </custom-container>
</template>

<script>
import customContainerHeader from '@/components/custom-container-header'
import customContainer from '@/components/custom-container'
import pagination from '@/views/mixin/page'
import echarts from 'echarts'
import { GetSpiDataAsync } from '@/api/Kanban'
export default {
  name: 'SpiReportOut',
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
        WO_NO: '5102-20190803055'
      },
      LineList: [], // 线体/产线
      loading: false,
      mainTable: []
    }
  },
  created () {},
  methods: {
    async getLoadData () {
      this.loading = true
      const res = await GetSpiDataAsync(this.formData)

      if (res.Result) {
        console.log(JSON.parse(res.Result).data)
        this.mainTable = JSON.parse(res.Result).data
        this.totalPage = res.TotalCount
        this.loading = false
        var errorCount = JSON.parse(res.Result).errorCount
        var titles = []
        var nums = []
        errorCount.forEach((e) => {
          titles.push(e.ERRCODE)
          nums.push(e.NUM)
        })
        while (titles.length < 5) {
          titles.push('')
          nums.push(0)
        }
        this.setReport(titles, nums)
      } else {
        this.loading = false
      }
    },
    setReport (titles, nums) {
      var data = []
      nums.forEach((e) => {
        data.push({ value: e, label: { show: e !== 0 } })
      })
      var option = {
        grid: [
          {
            top: 40
          },
          {
            top: 40
          }
        ],
        legend: {
          show: false
        },
        tooltip: {
          trigger: 'axis',
          formatter: (comp, value) => {
            const [serie] = comp

            return `${serie.seriesName} ${serie.name}: ${Math.round(
              serie.value
            )} `
          },
          axisPointer: {
            show: true,
            status: 'shadow',
            z: -1,
            shadowStyle: {
              color: '#E6F7FF'
            },
            type: 'shadow'
          }
        },
        xAxis: [
          {
            position: 'bottom',
            type: 'category',
            axisLine: {
              show: true,
              lineStyle: {
                color: '#ECF1F6'
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: true,
              rotate: 0,
              fontSize: 12,
              color: '#3A3A3C'
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: ['#ECF1F6', '#ECF1F6'],
                width: 0,
                type: 'dashed'
              }
            },
            gridIndex: 0,
            data: titles
          },
          {
            type: 'category',
            gridIndex: 1,
            show: false
          }
        ],
        yAxis: [
          {
            type: 'value',
            position: 'left',
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: true,
              rotate: 0,
              fontSize: 12,
              color: '#6E7D9C',
              formatter: (value, index) => `${value} `
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: ['#ECF1F6', '#ECF1F6'],
                width: 1,
                type: 'solid'
              }
            },
            min: 0,
            gridIndex: 0
          },
          {
            gridIndex: 1,
            min: 0,

            show: false
          }
        ],
        series: [
          {
            name: '错误码',
            label: {
              show: true,
              position: 'top',
              fontSize: 14,
              color: '#3D8BF0',
              fontWeight: 'bold'
            },
            xAxisIndex: 0,
            yAxisIndex: 0,
            itemStyle: {
              color: '#43A7FF'
            },
            type: 'bar',
            data: data,
            barMaxWidth: '20%',
            z: 3
          }
        ]
      }
      var report = echarts.init(document.getElementById('errorCount'))
      report.clear()
      report.setOption(option)
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
        Limit: 15
      }
      this.getLoadData()
    }
  }
}
</script>

<style>
.table-container-zhujiang {
  height: calc(60vh - 60px - 74px - 73px) !important;
}

.report {
  background: white;
  border-top: 1px solid #cfd7e5;
}

#errorCount {
  height: calc(
    100vh - 53px - 20px - calc(60vh - 60px - 74px - 73px) - 52px - 36px
  );
}
</style>
