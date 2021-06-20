<template>
  <div>
    <transition name="el-fade-in-linear">
      <List v-if="!showModify"/>
      <Modify v-else/>
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'MesProductionPreMst',
  components: {
    List: () => import('./List.vue'),
    Modify: () => import('./Modify.vue')
  },
  computed: {
    ...mapState({
      showModify: (state) => state.custom.productionPreMst.showModify
    })
  }
}
</script>
