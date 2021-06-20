<template>
  <jz-grid v-model="value" :columns="columns"></jz-grid>
</template>

<script>
import JzGrid from '../../components/JzGrid'
export default {
  name: 'RouteHistory',
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
          field: 'CURRENT_OPERATION',
          title: '当前工位'
        },
        {
          width: 210,
          field: 'REPAIR_OPERATION',
          title: '对应维修工位'
        },
        {
          width: 210,
          field: 'REWORK_OPERATION',
          title: '维修后返回工位'
        }
      ]
    }
  },
  methods: {}
}
</script>

<style scoped lang="less"></style>
