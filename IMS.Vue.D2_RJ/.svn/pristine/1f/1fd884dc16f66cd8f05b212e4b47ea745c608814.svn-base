<template>
  <div>
    <Ontology v-if="userShow" @close="showUserInfo" />
    <Edit v-else @close="showUserList" />
  </div>
</template>

<script>
import Ontology from './Ontology.vue'
import Edit from './Edit.vue'
export default {
  components: {
    Ontology,
    Edit
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
