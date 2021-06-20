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
          field: 'OPERATION_NAME',
          title: '测试工位'
        },
        {
          width: 210,
          field: 'TEST_OPERATOR',
          title: '测试作业员'
        },
        {
          width: 210,
          field: 'STATUS',
          title: '测试结果'
        },
        {
          width: 210,
          field: 'TEST_TIME_COST',
          title: '测试耗时'
        },
        {
          width: 210,
          field: 'TEST_TIME_COST',
          title: '是否需要重测（不过站）'
        },
        {
          width: 210,
          field: 'FIRST_TEST',
          title: '首次测试标记(含假Fail)'
        },
        {
          width: 210,
          field: 'FIRST_PROCESS_OPERATION',
          title: '系统首次处理标记(不含假Fail)'
        },
        {
          width: 210,
          field: 'FIXTURE',
          title: '治具'
        },
        {
          width: 210,
          field: 'MACHINE',
          title: '机台'
        },
        {
          width: 210,
          field: 'STATUS',
          title: '测试结果'
        },
        {
          width: 210,
          field: 'STATUS',
          title: '测试结果'
        },
        {
          width: 210,
          field: 'TEST_PROGRAM',
          title: '测试程序名称'
        }
      ]
    }
  },
  methods: {}
}
</script>

<style scoped lang="less"></style>
