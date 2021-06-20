<template>
  <div class="ProductSetting">
    <transition name="slide-fade">
      <ProductPage v-if="userShow"
                   @close="showUserInfo" />
      <NewProductEdit v-else
                      @close="showUserList" />
    </transition>
  </div>
</template>
<script>
import ProductPage from './ProductPage.vue'
import NewProductEdit from './NewProductEdit.vue'
export default {
  name: 'ProductSetting',
  components: {
    ProductPage,
    NewProductEdit
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
<style lang="scss" scoped>
.v-enter,
.v-leave-to {
  opacity: 0;
  transform: translateX(150px);
}

.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
