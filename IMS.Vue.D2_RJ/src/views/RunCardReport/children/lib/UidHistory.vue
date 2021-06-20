<template>
  <jz-grid v-model="value" :columns="columns"></jz-grid>
</template>

<script>
import JzGrid from '../../components/JzGrid'
export default {
  name: 'UidHistory',
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
          field: 'UID_NAME',
          title: '类型'
        },
        {
          width: 210,
          field: 'UID_NUMBER',
          title: '数据'
        },
        {
          width: 210,
          field: 'PLANT',
          title: '厂部'
        },
        {
          width: 210,
          field: 'OPERATION_SITE_NAME',
          title: '采集站点'
        },
        {
          width: 210,
          field: 'COLLECT_TIME',
          title: '作业时间'
        },
        {
          width: 210,
          field: 'UID_QTY',
          title: '数量'
        },
        {
          width: 210,
          field: 'ORDER_NO',
          title: '作业顺序'
        },
        {
          width: 210,
          field: 'SERIALIZED',
          title: '是否序列'
        },
        {
          width: 210,
          field: 'REWORK_REMOVE_FLAG',
          title: '返工是否自动清除'
        },
        {
          width: 210,
          field: 'REPLACE_FLAG',
          title: '替换标识'
        },
        {
          width: 210,
          field: 'COLLECT_BY',
          title: '作业员'
        }
      ]
    }
  },
  methods: {}
}
</script>

<style scoped lang="less"></style>
