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
               :data="value"
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
  props: {
    value: {
      required: true,
      type: Array
    }
  },
  data () {
    return {
      loading: false,
      columns: [
        {
          width: 210,
          field: 'OPERATION_NAME',
          title: '工序'
        },
        {
          width: 210,
          field: 'WORK_TIME',
          title: '作业时间'
        },
        {
          width: 210,
          field: 'OPERATION_SITE_NAME',
          title: '作业站点'
        },
        {
          width: 210,
          field: 'MODEL',
          title: '机种'
        },
        {
          width: 210,
          field: 'WO_NO',
          title: '工单'
        },
        {
          width: 210,
          field: 'PASS',
          title: 'PASS'
        },
        {
          width: 210,
          field: 'FAIL',
          title: 'FAIL'
        },
        {
          width: 210,
          field: 'REPASS',
          title: 'REPASS'
        },
        {
          width: 210,
          field: 'REPASS',
          title: 'REPASS'
        },
        {
          width: 210,
          field: 'YIELD',
          title: 'YIELD'
        }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
.jz-detail-grid-root {
  flex: 1;
}
</style>
