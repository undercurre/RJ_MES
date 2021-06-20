<template>
  <div>
    <SOPInfo v-if="userShow" @close="showUserInfo" />
    <AddOrModify v-else @close="showUserList" />
  </div>
</template>

<script>
import SOPInfo from './SOPInfo.vue'
import AddOrModify from './AddOrModify.vue'
export default {
  components: {
    SOPInfo,
    AddOrModify
  },
  data () {
    return {
      userShow: true
    }
  },
  methods: {
    showUserInfo () {
      this.userShow = !this.userShow
    },
    showUserList () {
      this.userShow = true
    }
  }
}
</script>
