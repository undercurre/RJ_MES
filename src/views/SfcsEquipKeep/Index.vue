<template>
  <div>
    <transition name="slide-fade">
      <CheckMarker v-if="userShow" @close="showUserInfo" />
      <Addedit v-else @close="showUserList" />
    </transition>
  </div>
</template>

<script>
import CheckMarker from './CheckMarker.vue'
import Addedit from './Addedit.vue'
export default {
  name: 'SfcsEquipKeep',
  components: {
    CheckMarker,
    Addedit
  },
  data () {
    return {
      userShow: true
    }
  },
  methods: {
    // 此方法，子组件会调用，调用返回父页面：隐藏子组件，显示父组件
    showUserInfo () {
      this.userShow = !this.userShow
    },
    showUserList () {
      this.userShow = true
    }
  }
}
</script>
