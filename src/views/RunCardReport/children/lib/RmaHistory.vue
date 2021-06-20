<template>
  <jz-grid v-model="value" :columns="columns"></jz-grid>
</template>

<script>
import JzGrid from '../../components/JzGrid'
export default {
  name: 'RmaHistory',
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
          field: 'COUNT',
          title: '第N次RMA'
        },
        {
          width: 210,
          field: 'RMA_NO',
          title: 'RMA号'
        },
        {
          width: 210,
          field: 'RETURNED_SITE',
          title: '站点'
        },
        {
          width: 210,
          field: 'RMA_TYPE',
          title: '类型'
        },
        {
          width: 210,
          field: 'OWNER',
          title: '供应商'
        },
        {
          width: 210,
          field: 'MIC_RMA_NO',
          title: 'MIC RMA号'
        },
        {
          width: 210,
          field: 'PCB_DATECODE',
          title: '日期代码'
        }, {
          width: 210,
          field: 'PCB_VENDER',
          title: 'Vendor'
        },
        {
          width: 210,
          field: 'CUSTOMER_SYMPTOM',
          title: '客户不良描述'
        }, {
          width: 210,
          field: 'ON_SITE_VERIFICATION',
          title: 'OSV'
        },
        {
          width: 210,
          field: 'ODM_SYMPTOM',
          title: '本厂不良描述'
        },

        {
          width: 210,
          field: 'STATUS',
          title: '状态'
        },
        {
          width: 210,
          field: 'LEVEL_FLAG',
          title: 'LEVEL FLAG'
        },
        {
          width: 210,
          field: 'IS_WARRANTY',
          title: '是否保修'
        },
        {
          width: 210,
          field: 'IS_DAMAGE',
          title: '是否损坏'
        },
        {
          width: 210,
          field: 'IS_CND',
          title: 'IS CND'
        },
        {
          width: 210,
          field: 'LAST_SHIP_TIME',
          title: '出货时间'
        },
        {
          width: 210,
          field: 'COLLECT_TIME',
          title: '收料时间'
        },
        {
          width: 210,
          field: 'COLLECT_BY',
          title: '收料作业员'
        },
        {
          width: 210,
          field: 'INPUT_TIME',
          title: '投产时间'
        },
        {
          width: 210,
          field: 'PACKING_TIME',
          title: '包装时间'
        },
        {
          width: 210,
          field: 'ENABLED',
          title: 'ENABLED'
        }
      ]
    }
  },
  methods: {}
}
</script>

<style scoped lang="less"></style>
