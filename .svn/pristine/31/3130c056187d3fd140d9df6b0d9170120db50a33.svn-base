<template>
  <jz-grid v-model="value" :columns="columns"></jz-grid>
</template>

<script>
import JzGrid from '../../components/JzGrid'
export default {
  name: 'TestHistory',
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
          title: 'SN'
        },{
          width: 210,
          field: 'TEST_OPERATOR',
          title: '测试作业员'
        },{
          width: 210,
          field: 'CREATE_TIME',
          title: '测试时间'
        },{
          width: 210,
          field: 'OPERATION_SITE_NAME',
          title: '测试站点'
        },{
          width: 210,
          field: 'ITEAM',
          title: '测试项'
        },{
          width: 210,
          field: 'VALUE',
          title: '测试值'
        },{
          width: 210,
          field: 'STATUS',
          title: '测试结果'
        }
      ]
    }
  },
  methods: {}
}
</script>

<style scoped lang="less"></style>
