<template>
  <jz-grid v-model="value" :columns="columns"></jz-grid>
</template>

<script>
import JzGrid from '../../components/JzGrid'
export default {
  name: 'DefectHistory',
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
          field: 'DEFECT_CODE',
          title: '不良代码'
        },
        {
          width: 210,
          field: 'DEFECT_DESCRIPTION',
          title: '不良描述'
        },
        {
          width: 210,
          field: 'DEFECT_SITE',
          title: '发生不良站点'
        },
        {
          width: 210,
          field: 'DEFECT_TIME',
          title: '发生不良时间'
        },
        {
          width: 210,
          field: 'DEFECT_OPERATOR',
          title: '刷入不良作业员'
        },
        {
          width: 210,
          field: 'ROOT_CAUSE_CATEGORY',
          title: '根本原因分类'
        },
        {
          width: 210,
          field: 'REASON_CODE',
          title: '原因代码'
        },
        {
          width: 210,
          field: 'REASON_DESCRIPTION',
          title: '原因描述'
        },
        {
          width: 210,
          field: 'DEFECT_DETAIL_DESCRIPTION',
          title: '不良详细描述'
        },
        {
          width: 210,
          field: 'REPAIR_SITE',
          title: '维修站点'
        },
        {
          width: 210,
          field: 'REPAIRER',
          title: '维修作业员'
        },
        {
          width: 210,
          field: 'CHECK_OPERATOR',
          title: '检验作业员'
        },
        {
          width: 210,
          field: 'REPAIR_TIME',
          title: '维修时间'
        },
        {
          width: 210,
          field: 'REPAIR_IN_TIME',
          title: '进维修室时间'
        },
        {
          width: 210,
          field: 'REPAIR_IN_OPERATOR',
          title: '刷进维修室作业员'
        },
        {
          width: 210,
          field: 'REPAIR_OUT_TIME',
          title: '出维修室时间'
        },
        {
          width: 210,
          field: 'REPAIR_OUT_OPERATOR',
          title: '刷出维修室作业员'
        },
        {
          width: 210,
          field: 'LOCATION',
          title: '维修位置'
        },
        {
          width: 210,
          field: 'NDF_FLAG',
          title: 'NDF标识'
        },
        {
          width: 210,
          field: 'REPAIR_FLAG',
          title: '是否已维修'
        },
        {
          width: 210,
          field: 'RESPONSER',
          title: 'Debug'
        },
        {
          width: 210,
          field: 'ACTION_CODE',
          title: '执行动作'
        },
        {
          width: 210,
          field: 'TTF',
          title: 'TTF'
        },
        {
          width: 210,
          field: 'BAD_PART_NO',
          title: '坏件料号'
        },
        {
          width: 210,
          field: 'BAD_PART_VENDOR',
          title: '坏件供应商'
        },
        {
          width: 210,
          field: 'REEL_ID',
          title: '料卷'
        }
      ]
    }
  },
  methods: {}
}
</script>

<style scoped lang="less"></style>
