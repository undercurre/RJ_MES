<template>
    <vxe-table
      ref="xTableBad"
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
      :edit-rules="validRules"
      :mouse-config="{ selected: true }"
      :edit-config="{ trigger: 'click', mode: 'row', showStatus: true }"
      :radio-config="{ labelField: 'name', trigger: 'row' }"
      :checkbox-config="{ checkField: 'checked', trigger: 'row' }"
    >
      <vxe-table-column
        :min-width="column.width || 120"
        v-for="(column, index) in columns"
        :key="index"
        :field="column.field"
        :title="column.title"
        :edit-render="{ name: '$input', props: { readonly: true } }"
      />
    </vxe-table>
</template>

<script>
export default {
  name: 'RunCardHistory',
  props: {
    value: {
      required: true,
      type: Array,
      default () {
        return []
      }
    },
    validRules: {
      type: Object
    },
    columns: {
      required: true,
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      loading: false
    }
  }
}
</script>

<style scoped lang="scss"></style>
