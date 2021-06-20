<template>
  <jz-grid v-model="value" :columns="columns"></jz-grid>
</template>

<script>
import JzGrid from '../../components/JzGrid'
export default {
  name: 'CompreplaceHistory',
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
          field: 'COMPONENT_NAME',
          title: '零件名称'
        },
        {
          width: 210,
          field: 'NEW_CUSTOMER_COMPONENT_SN',
          title: '新零件序号'
        },
        {
          width: 210,
          field: 'OLD_CUSTOMER_COMPONENT_SN',
          title: '旧零件序号'
        },
        {
          width: 210,
          field: 'OPERATION_SITE_NAME',
          title: '替换站点'
        },
        {
          width: 210,
          field: 'SERIALIZED',
          title: '序号是否唯一'
        },
        {
          width: 210,
          field: 'COMPONENT_QTY',
          title: '零件数量'
        },
        {
          width: 210,
          field: 'NEW_CUSTOMER_COMPONENT_PN',
          title: '零件新客户料号'
        },
        {
          width: 210,
          field: 'OLD_CUSTOMER_COMPONENT_PN',
          title: '零件旧客户料号'
        },
        {
          width: 210,
          field: 'REPLACE_TIME',
          title: '替换时间'
        },
        {
          width: 210,
          field: 'NEW_ODM_COMPONENT_PN',
          title: '零件新本厂料号'
        },
        {
          width: 210,
          field: 'OLD_ODM_COMPONENT_PN',
          title: '零件旧本厂料号'
        },
        {
          width: 210,
          field: 'REPLACE_BY',
          title: '替换作业员'
        }
      ]
    }
  },
  methods: {}
}
</script>

<style scoped lang="less"></style>
