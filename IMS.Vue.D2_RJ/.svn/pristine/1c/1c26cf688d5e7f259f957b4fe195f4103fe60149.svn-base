<!--
 * @Author: your name
 * @Date: 2021-03-04 19:37:01
 * @LastEditTime: 2021-03-04 19:42:27
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /IMS.Vue.D2/src/views/RunCardReport/children/lib/ResOurce.vue
-->
<template>
  <jz-grid v-model="value" :columns="columns"></jz-grid>
</template>

<script>
import JzGrid from '../../components/JzGrid'
export default {
  name: 'ResOurce',
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
      // 钢网编号，线别名称，绑定时间（创建日期）,作业员(CREATE_BY)
      columns: [
        {
          width: 210,
          field: 'RESOURCE_NO',
          title: '辅料编号'
        },
        {
          width: 210,
          field: 'LINE_NAME',
          title: '线别名称'
        },
        {
          width: 210,
          field: 'CREATE_TIME',
          title: '绑定时间'
        },
        {
          width: 210,
          field: 'CREATE_BY',
          title: '作业员'
        }
      ]
    }
  },
  methods: {}
}
</script>

<style scoped lang="less"></style>
