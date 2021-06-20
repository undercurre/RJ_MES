<template>
  <jz-grid v-model="value" :columns="columns"></jz-grid>
</template>

<script>
import JzGrid from '../../components/JzGrid'
export default {
  name: 'WoHistory',
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
          field: 'WO_NO',
          title: '原工单号'
        },
        {
          width: 210,
          field: 'PART_NO',
          title: '原料号'
        },
        {
          width: 210,
          field: 'NEW_WO_NO',
          title: '新工单号'
        },
        {
          width: 210,
          field: 'NEW_PART_NO',
          title: '新料号'
        },
        {
          width: 210,
          field: 'WO_REPLACE_TYPE',
          title: '工单替换类型'
        },
        {
          width: 210,
          field: 'OPERATION_SITE_NAME',
          title: '操作站点'
        },
        {
          width: 210,
          field: 'REPLACE_TIME',
          title: '替换时间'
        },
        {
          width: 210,
          field: 'REPLACE_TIMES',
          title: '替换次数'
        }
      ]
    }
  },
  methods: {}
}
</script>

<style scoped lang="less"></style>
