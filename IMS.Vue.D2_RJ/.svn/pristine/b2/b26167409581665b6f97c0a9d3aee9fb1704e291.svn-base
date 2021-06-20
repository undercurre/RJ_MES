<!--
 * @Author: your name
 * @Date: 2020-04-10 16:36:06
 * @LastEditTime: 2020-04-15 11:08:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \IMS.Vue.D2\src\views\SfcsUnLockProduct\Index.vue
 -->
<template>
  <d2-container>
    <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
      <el-tab-pane :label="this.$t('goods._6')" name="locking">
        <locking @event1="change($event)" />
      </el-tab-pane>
      <el-tab-pane :label="this.$t('goods._7')" name="document">
        <document />
      </el-tab-pane>
      <el-tab-pane  :label="this.$t('goods._8')" name="unlock">
        <unlock @product="change($event)" />
      </el-tab-pane>
    </el-tabs>
    <div v-if="activeName == 'locking' || activeName == 'unlock'" class="step">
      <div class="step-title">{{$t('goods._9')}}</div>
      <div class="step-center">
        <div v-for="(itme,index) in annal" :key="index">
          <p style="padding: 0; margin: 0;font-size: 14px;color: #333333;">{{itme}}</p>
        </div>
      </div>
      <el-button style="width: 100%;font-weight: 600;color: #333333;" @click="emptyClicl">{{$t('goods._10')}}</el-button>
    </div>
  </d2-container>
</template>
<script>
import locking from './locking'
import document from './document'
import unlock from './unlock'
export default {
  components: {
    locking,
    document,
    unlock
  },
  data () {
    return {
      activeName: 'locking',
      annal: []
    }
  },
  methods: {
    handleClick (tab, event) {
      // console.log(tab, event)
    },
    change (data) {
      // console.log(data, 'data')
      this.annal = data
    },
    emptyClicl () {
      this.annal = []
    }
  }
}

</script>
<style lang="scss" scoped>
.step {
  .step-title {
    font-size: 14px;
    color: #606266;
    margin-top: 10px;
    padding:0px 20px;
    border: 1px solid #dfe1e8;
    width: max-content;
  }
  .step-center {
    padding: 5px;
    height: calc(100vh - 570px - 55px);
    background: #ffe0c0;
    overflow-x: hidden;
  }
}
</style>
