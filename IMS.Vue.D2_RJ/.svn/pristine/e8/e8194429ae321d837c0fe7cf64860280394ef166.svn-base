<template>
  <jz-grid v-model="value" :columns="columns"></jz-grid>
</template>

<script>
import JzGrid from '../../components/JzGrid'
export default {
  name: 'ReworkcompHistory',
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
          field: 'SN',
          title: '流水号'
        },
        {
          width: 210,
          field: 'WO_NO',
          title: '工单'
        },
        {
          width: 210,
          field: 'OPERATION_NAME',
          title: '工位名称'
        },
        {
          width: 210,
          field: 'COMPONENT_NAME',
          title: '零件名称'
        },
        {
          width: 210,
          field: 'CUSTOMER_COMPONENT_SN',
          title: '客户流水号'
        },
        {
          width: 210,
          field: 'CUSTOMER_COMPONENT_PN',
          title: '客户料号'
        },
        {
          width: 210,
          field: 'ODM_COMPONENT_PN',
          title: '本厂料号'
        },
        {
          width: 210,
          field: 'COMPONENT_QTY',
          title: '零件数量'
        },
        {
          width: 210,
          field: 'SERIALIZED',
          title: '是否系列'
        },
        {
          width: 210,
          field: 'OPERATION_SITE_NAME',
          title: '作业站点'
        },
        {
          width: 210,
          field: 'COLLECT_TIME',
          title: '采集时间'
        },
        {
          width: 210,
          field: 'COLLECT_BY',
          title: '作业员'
        },
        {
          width: 210,
          field: 'REWORK_REMOVE_FLAG',
          title: '返工是否清除'
        },
        {
          width: 210,
          field: 'REPLACE_FLAG',
          title: '是否发生替换'
        },
        {
          width: 210,
          field: 'EDI_FLAG',
          title: '数据交换标识'
        }
      ]
    }
  },
  methods: {}
}
</script>

<style scoped lang="less"></style>
