<template>
  <div class="jz-detail-grid-root">
    <vxe-table ref="xTableBad"
               border
               resizable
               height="100%"
               size="mini"
               align="left"
               highlight-hover-row
               highlight-current-row
               show-overflow
               auto-resize
               keep-source
               stripe
               :loading="loading"
               :data="mainTable"
               :mouse-config="{ selected: true }"
               :edit-config="{ trigger: 'click', mode: 'row', showStatus: true }"
               :radio-config="{ labelField: 'name', trigger: 'row' }"
               :checkbox-config="{ checkField: 'checked', trigger: 'row' }">
      <vxe-table-column v-for="(column, index) in columns"
                        :key="index"
                        :min-width="column.width || 120"
                        :field="column.field"
                        :title="column.title"
                        :edit-render="{ name: '$input', props: { readonly: true } }" />
    </vxe-table>
  </div>
</template>

<script>
export default {
  name: 'JzDetailGrid',
  data () {
    return {
      loading: false,
      mainTable: [],
      columns: [
        {
          width: 210,
          field: 'Step',
          title: '流水号'
        },
        {
          width: 210,
          field: 'Pass',
          title: 'PSN'
        },
        {
          width: 210,
          field: 'Fail',
          title: '状态'
        },
        {
          width: 210,
          field: 'Repass',
          title: '当前站点'
        },
        {
          width: 210,
          field: 'Refail',
          title: '工单'
        },
        {
          width: 210,
          field: 'Pass',
          title: '料号'
        },
        {
          width: 210,
          field: 'Fail',
          title: '机种'
        },
        {
          width: 210,
          field: 'Repass',
          title: '投产时间'
        },
        {
          width: 210,
          field: 'Refail',
          title: '维修站点'
        },
        {
          width: 210,
          field: 'Yield',
          title: '维修工序'
        },
        {
          width: 210,
          field: 'Yield',
          title: '不良代码'
        },
        {
          width: 210,
          field: 'Yield',
          title: '不良代码英文秒描述'
        },
        {
          width: 210,
          field: 'Yield',
          title: '不良代码中文描述'
        },
        {
          width: 210,
          field: 'Yield',
          title: '不良站点'
        },
        {
          width: 210,
          field: 'Yield',
          title: '不良发生时间'
        },
        {
          width: 210,
          field: 'Yield',
          title: '维修时间'
        },
        {
          width: 210,
          field: 'Yield',
          title: 'Lead Time（单位：天）'
        },
        {
          width: 210,
          field: 'Yield',
          title: '维修员'
        },
        {
          width: 210,
          field: 'Yield',
          title: '产线刷不良人员'
        },
        {
          width: 210,
          field: 'Yield',
          title: 'Defect Description'
        },
        {
          width: 210,
          field: 'Yield',
          title: '维修代码'
        },
        {
          width: 210,
          field: 'Yield',
          title: '维修代码英文描述'
        },
        {
          width: 210,
          field: 'Yield',
          title: '维修代码中文描述'
        },
        {
          width: 210,
          field: 'Yield',
          title: 'Debug'
        },
        {
          width: 210,
          field: 'Yield',
          title: 'Debug Description'
        },
        {
          width: 210,
          field: 'Yield',
          title: '不良位置'
        },
        {
          width: 210,
          field: 'Yield',
          title: 'Owner'
        },
        {
          width: 210,
          field: 'Yield',
          title: 'Remark'
        },
        {
          width: 210,
          field: 'Yield',
          title: '根本原因分类'
        },
        {
          width: 210,
          field: 'Yield',
          title: '根本原因分类描述'
        },
        {
          width: 210,
          field: 'Yield',
          title: '坏料'
        },
        {
          width: 210,
          field: 'Yield',
          title: '替换料device数据值'
        },
        {
          width: 210,
          field: 'Yield',
          title: '更换物料料卷'
        },
        {
          width: 210,
          field: 'Yield',
          title: '进维修室时间'
        },
        {
          width: 210,
          field: 'Yield',
          title: '刷进维修室作业员'
        },
        {
          width: 210,
          field: 'Yield',
          title: '出维修室时间'
        },

        {
          width: 210,
          field: 'Yield',
          title: '刷出维修室作业员'
        },
        {
          width: 210,
          field: 'Yield',
          title: 'Action Code'
        },
        {
          width: 210,
          field: 'Yield',
          title: 'Action Code Description'
        },
        {
          width: 210,
          field: 'Yield',
          title: 'TTF'
        },
        {
          width: 210,
          field: 'Yield',
          title: '日期代码'
        },
        {
          width: 210,
          field: 'Yield',
          title: '采集不良详细信息'
        },
        {
          width: 210,
          field: 'Yield',
          title: '测试治具'
        },

        {
          width: 210,
          field: 'Yield',
          title: '测试机台'
        },
        {
          width: 210,
          field: 'Yield',
          title: '测试用时'
        },
        {
          width: 210,
          field: 'Yield',
          title: '测试时间'
        },
        {
          width: 210,
          field: 'Yield',
          title: '工单Lead Time（单位：天）'
        },
        {
          width: 210,
          field: 'Yield',
          title: '二次返修分析'
        },
        {
          width: 210,
          field: 'Yield',
          title: 'PCB DATE CODE'
        },
        {
          width: 210,
          field: 'Yield',
          title: 'PCB VENDOR'
        },
        {
          width: 210,
          field: 'Yield',
          title: '更换物料 LOT CODE'
        },
        {
          width: 210,
          field: 'Yield',
          title: 'Collect Defect Detail ID'
        },
        {
          width: 210,
          field: 'Yield',
          title: 'SMT 或已替换料卷编号'
        },
        {
          width: 210,
          field: 'Yield',
          title: '更换物料MAKER'
        }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
.jz-detail-grid-root {
  width: 100%;
  height: 100%;
}
</style>
