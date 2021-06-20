<!--
 * @Author: your name
 * @Date: 2021-03-02 16:35:53
 * @LastEditTime: 2021-03-04 19:40:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /IMS.Vue.D2/src/views/RunCardReport/children/lib/SreeMesh.vue
-->
<template>
  <jz-grid v-model="value" :columns="columns"></jz-grid>
</template>

<script>
import JzGrid from '../../components/JzGrid'
export default {
  name: 'SteeMesh',
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
          field: 'STENCIL_NO',
          title: '钢网编号'
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
