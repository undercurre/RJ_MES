<template>
  <d2-container-frame :src="frameUrl" />
</template>

<script>
import d2ContainerFrame from '@/components/d2-container-frame'
export default {
  name: 'FineReport',
  components: {
    d2ContainerFrame
  },
  data () {
    return {
      frameUrl: ''
    }
  },
  methods: {

  },
  created () {
    this.frameUrl = this.$route.meta.query.frameUrl || ''
  },
  mounted () {

  },
  watch: {
    '$route.matched' (val) {
      this.frameUrl = this.$route.meta.query.frameUrl || ''
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
