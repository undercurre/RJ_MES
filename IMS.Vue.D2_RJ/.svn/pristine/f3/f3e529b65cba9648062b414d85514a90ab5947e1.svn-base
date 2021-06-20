<template>
  <jz-grid v-model="value" :columns="columns"></jz-grid>
</template>

<script>
import JzGrid from '../../components/JzGrid'
export default {
  name: 'ReplaceruncardHistory',
  components: { JzGrid },
  props: {
    value: {
      required: true,
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      loading: false,
      validRules: {},
      columns: [
        {
          width: 210,
          field: 'OLD_SN',
          title: '旧流水号'
        },
        {
          width: 210,
          field: 'NEW_SN',
          title: '新流水号'
        },
        {
          width: 210,
          field: 'OPERATION_SITE_NAME',
          title: '替换站点'
        },
        {
          width: 210,
          field: 'REPLACE_REASON',
          title: '替换原因'
        },
        {
          width: 210,
          field: 'REPLACE_REMARK',
          title: '备注'
        },
        {
          width: 210,
          field: 'REPLACE_BY',
          title: '替换操作员'
        },
        {
          width: 210,
          field: 'REPLACE_TIME',
          title: '替换时间'
        }
      ]
    }
  },
  methods: {}
}
</script>

<style scoped lang="less"></style>
