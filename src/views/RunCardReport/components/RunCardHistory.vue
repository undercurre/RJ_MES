<!--
 * @Author: your name
 * @Date: 2020-11-23 17:25:49
 * @LastEditTime: 2021-03-05 16:58:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /IMS.Vue.D2/src/views/RunCardReport/components/RunCardHistory.vue
-->
<template>
  <div class="">
    <operation-history v-if="namespace === 'OPERATIONHISTORY'"
                       v-model="value" />
    <defect-history v-else-if="namespace === 'DEFECTHISTORY'"
                    v-model="value" />
    <test-history v-else-if="namespace === 'TESTHISTORY'"
                  v-model="value" />
    <component-history v-else-if="namespace === 'COMPONENTHISTORY'"
                       v-model="value" />
    <compreplace-history v-else-if="namespace === 'COMPREPLACEHISTORY'"
                         v-model="value" />
    <route-history v-else-if="namespace === 'ROUTEHISTORY'"
                   v-model="value" />
    <reworkcomp-history v-else-if="namespace === 'REWORKCOMPHISTORY'"
                        v-model="value" />
    <uid-history v-else-if="namespace === 'UIDHISTORY'"
                 v-model="value" />
    <replaceruncard-history v-else-if="namespace === 'REPLACERUNCARDHISTORY'"
                            v-model="value" />
    <resource-history v-else-if="namespace === 'RESOURCEHISTORY'"
                      v-model="value" />
    <rma-history v-else-if="namespace === 'RMAHISTORY'"
                 v-model="value" />
    <wo-history v-else-if="namespace === 'WOHISTORY'"
                v-model="value" />
    <st-eemesh v-else-if="namespace === 'STENCIL'"
               v-model="value" />
    <sc-raper v-else-if="namespace === 'SCRAPER'"
              v-model="value" />
    <re-source v-else-if="namespace === 'RESOURCE'"
               v-model="value" />
    <sm-tsnreel v-else-if="namespace === 'SMTSNREEL'"
                v-model="value" />

  </div>
</template>

<script>
import children from '../children'
export default {
  name: 'RunCardHistory',
  components: {
    ...children
  },
  props: {
    value: {
      required: true,
      type: Array,
      default () {
        return []
      }
    },
    namespace: {
      required: true,
      type: String,
      default: 'OPERATIONHISTORY'
    },
    title: {
      required: true,
      type: String,
      default: 'OPERATIONHISTORY'
    }
  },
  methods: {
    getSheet (excel) {
      const history = this.$children[0]
      const header = []
      const filterVal = []
      history.columns.map(column => {
        header.push(column.title)
        filterVal.push(column.field)
      })
      const name = this.title
      const value = excel.generateSheet({
        header,
        filterVal,
        data: this.value
      })
      return {
        name, value
      }
    }
  }
}
</script>

<style scoped lang="scss"></style>
