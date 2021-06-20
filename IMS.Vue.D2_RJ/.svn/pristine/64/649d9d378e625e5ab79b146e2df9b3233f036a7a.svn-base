<template>
    <jz-grid v-model="value" :columns="columns"></jz-grid>
</template>

<script>
import JzGrid from '../../components/JzGrid'
export default {
  name: 'OperationHistory',
  components: {
    JzGrid
  },
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
      columns: [
        {
          width: 210,
          field: 'OPERATION_NAME',
          title: '工序名称'
        },
        {
          width: 210,
          field: 'OPERATION_SITE_NAME',
          title: '站点名称'
        },
        {
          width: 210,
          field: 'OPERATOR',
          title: '作业员'
        },
        {
          width: 210,
          field: 'DESCRIPTION',
          title: '状态'
        },
        {
          width: 210,
          field: 'OPERATION_TIME',
          title: '时间'
        }
      ],
      validRules: {}
    }
  },
  methods: {}
}
</script>

<style scoped lang="less"></style>
