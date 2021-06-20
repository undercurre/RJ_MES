<template>
  <div class="data-grid-root">
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
  name: 'JzDataGrid',
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
          field: 'Pass',
          title: 'PASS'
        },
        {
          width: 210,
          field: 'Fail',
          title: 'FAIL'
        },
        {
          width: 210,
          field: 'Repass',
          title: 'REPASS'
        },
        {
          width: 210,
          field: 'Refail',
          title: 'REFAIL'
        },
        {
          width: 210,
          field: 'Yield',
          title: 'YIELD'
        }
      ]
    }
  },
  methods: {

  },
  mounted () {
  }
}
</script>

<style scoped lang='scss'>
.data-grid-root {
  flex: 1;
}
</style>
