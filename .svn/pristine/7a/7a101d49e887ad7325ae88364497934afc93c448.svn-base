<template>
  <d2-container>
    <div>
      <d2-module-index-banner ref="topBlock" slot="header" v-bind="banner"/>
      <el-row :gutter="24" style="padding-top: 10px">
        <el-col :span="24">
          <el-tabs type="border-card" class="custom-index-tabs">
            <el-tab-pane :label="$t('homePage._2')" :style="{
              height: bottomHeight
            }">
              <div class="list">
                <!-- <div class="item-x" v-for="item in 40" :key="item">
                  <span class="title">通知公告标题...</span>
                  <span class="time">2020-02-01 10:02:11</span>
                </div> -->
                <div class="empty-page">
                  <img src="@/assets/images/empty-image-default.png" alt="">
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane :label="$t('homePage._3')" :style="{
              height: bottomHeight
            }">
              <!-- <div class="list">
                <div class="item-x" v-for="item in 40" :key="item">
                  <span class="title">预警信息标题...</span>
                  <span class="time">2020-02-01 10:02:11</span>
                </div>
              </div> -->
              <div class="empty-page">
                <img src="@/assets/images/empty-image-default.png" alt="">
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
    </div>
  </d2-container>
</template>

<script>
import d2ModuleIndexBanner from '@/components/d2-module-index-banner'
export default {
  components: {
    d2ModuleIndexBanner
  },
  data () {
    return {
      ProductionCapacity: null,
      OperatingStatus: null,
      PassRate: null,
      DefectiveRate: null,
      bottomHeight: '100px',
      banner: {
        title: 'IMS v2.1',
        subTitle: this.$t('homePage._1')
      }
    }
  },
  created () {

  },
  watch: {
    '$i18n.locale': {
      handler () {
        this.banner.subTitle = this.$t('homePage._1')
        this.$nextTick(() => {
          const topHeight = this.$refs.topBlock.$el.offsetHeight
          this.bottomHeight = `calc(100vh - 60px - 41px - 20px - ${topHeight}px - 50px - 30px)`
        })
      }
    }
  },
  methods: {

  },
  mounted () {
    this.$nextTick(() => {
      const topHeight = this.$refs.topBlock.$el.offsetHeight
      this.bottomHeight = `calc(100vh - 60px - 41px - 20px - ${topHeight}px - 50px - 30px)`
    })
  }
}
</script>

<style lang="scss" scoped>
.AlarmDetails {
  display: inline-block;
  margin: 10px 0;
  padding: 0 10px;
  color: rgb(119, 119, 119);
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
a:hover {
  color: #3398db;
}
.Yield {
  display: inline-block;
  width: 30px;
  height: 100px;
  // background-color: #727375;
  background: -webkit-gradient(
    linear,
    100% 0%,
    0% 0%,
    from(#bbb8b8),
    color-stop(0.5, #777676),
    to(#bbb8b8)
  );
  // margin-right: 10px;
  color: #fff;
  line-height: 100px;
  font-size: 28px;
  text-align: center;
}
</style>

<style lang="scss" scoped>
  .group {
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      font-size: 60px;
      &.end {
        width: 100%;
        text-align: center;
        padding: 0px 20px;
        border-radius: 4px;
        background-color: $color-success;
        color: #FFF;
      }
    }
  }

  .item-x {
    display: flex;
    align-items: center;
    font-size: 15px;
    color: #666;
    line-height: 2.5;
    justify-content: space-between;
    border-bottom: 1px dashed #e5e5e5;
    cursor: pointer;
  }

  .item-x:hover {
    color: #409EFF;
  }

  .x-1 {
    color: #409EFF;font-size: 16px;
  }

  .empty-page {
    display: flex;
    justify-content: center;
    img {
      display: block;
    }
  }

</style>

<style>
  .box-card .el-card__header {
    padding: 10px 20px!important;
  }

  .box-card .el-card__body {
    padding: 10px 20px!important;
  }

  .custom-index-tabs .el-tabs__content {
    overflow-y: auto;
  }
</style>
