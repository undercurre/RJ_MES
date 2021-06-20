<template>
  <div>
    <el-row
      style="padding: 0;box-shadow: 0 0 4px #e5e5e5;height: 44px;line-height:44px;background: #fff;width: 100%;position: fixed;top: 0"
    >
      <el-col :span="3">
        <el-button
          icon="el-icon-back"
          style="margin-left:20px"
          @click="goback"
          v-if="isShow"
        >{{$t('publics.btn.back')}}</el-button>
        <el-button style="visibility: hidden" v-else>&nbsp;</el-button>
      </el-col>
      <el-col :span="18" style="text-align: center;">
        <b style="font-size: 18px;color: #333;height: 44px;">{{ info.TITLE }}</b>
      </el-col>
      <el-col :span="3">
        <el-button style="visibility: hidden">&nbsp;</el-button>
      </el-col>
    </el-row>
    <div class="content" style="padding-top: 44px">
      <div class="zuozhe">
        <i class="el-icon-user-solid" style="color:#409EFF"></i>
        <span style="margin-left: 5px">{{$t('homePage._41')}}：</span>
        <span>{{ info.UPDATED_BY || info.CREATED_BY }}</span>
        <i class="el-icon-message-solid" style="margin-left: 10px;color:#F56C6C"></i>
        <span style="margin-left: 5px">{{$t('homePage._42')}}：</span>
        <span>{{ info.UPDATED_TIME || info.CRATED_TIME }}</span>
        <div>
          <el-tag
            effect="dark"
            type="primary"
            v-if="info.TAG"
            style="margin-right: 10px;margin-top: 10px;margin-bottom: 10px;color: #fff"
          >{{ info.TAG }}</el-tag>
          <el-tag
            effect="dark"
            type="danger"
            v-if="info.IS_TOP"
            style="margin-top: 10px;margin-bottom: 10px"
          >{{$t('homePage._43')}}</el-tag>
        </div>
      </div>
      <div class="neirong" v-html="info.CONTENT"></div>
      <el-divider class="mydivider" style="background: transparent">
        <span style="color: #e5e5e5;background: transparent">{{$t('homePage._25')}}</span>
      </el-divider>
    </div>
  </div>
</template>

<script>
import { MesHomeArticleLoadData } from '@/api/MesHomeArticle'
export default {
  name: 'PreviewArticle',
  components: {},
  data () {
    return {
      info: {},
      param: {},
      isShow: false
    }
  },
  created () {
    this.param = this.$route.query || {}
    this.getMesHomeArticleLoadData()
  },
  watch: {
    param (val) {
      if (val.FLAG != null) {
        this.isShow = true
      } else {
        this.isShow = false
      }
    }
  },
  methods: {
    async getMesHomeArticleLoadData () {
      const res = await MesHomeArticleLoadData(this.param)
      this.info = res.Result ? res.Result[0] : {}
    },
    goback () {
      this.$router.back(-1)
    }
  },
  mounted () {
    this.$nextTick((_) => {
      document.getElementById('app').style.background = '#fafafa'
    })
  }
}
</script>

<style scoped>
.content {
  width: 1200px;
  margin: 0 auto;
  /*background: #fff;*/
  box-sizing: border-box;
  padding: 0 20px;
}
.zuozhe {
  padding: 10px 0;
  font-size: 14px;
  margin-bottom: 20px;
}
.neirong {
  padding-bottom: 10px;
}
</style>
<style>
.mydivider .el-divider__text {
  background: #fafafa !important;
}
</style>
