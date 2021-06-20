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
        <b style="font-size: 18px;color: #333;height: 44px;">{{ info.CALL_CONTENT }}</b>
      </el-col>
      <el-col :span="3">
        <el-button style="visibility: hidden">&nbsp;</el-button>
      </el-col>
    </el-row>
    <div class="content" style="padding-top: 44px">
      <div class="zuozhe">
        <i class="el-icon-user-solid" style="color:#409EFF"></i>
        <span style="margin-left: 5px">{{$t('homePage._56')}}：</span>
        <span>{{ info.OPERATOR}}</span>
        <i class="el-icon-message-solid" style="margin-left: 10px;color:#F56C6C"></i>
        <span style="margin-left: 5px">{{$t('homePage._42')}}：</span>
        <span>{{ info.CREATE_TIME || info.CHECKIN_TIME }}</span>
        <i class="el-icon-s-cooperation" style="margin-left: 10px;color:#67C23A"></i>
        <span style="margin-left: 5px">{{$t('homePage._48')}}：</span>
        <el-tag
          effect="dark"
          type="danger"
          size="mini"
          style="margin-right: 5px;"
          v-if="info.STATUS === 0"
        >{{ $t('homePage._9') }}</el-tag>
        <el-tag
          effect="dark"
          type="warning"
          size="mini"
          style="margin-right: 5px"
          v-if="info.STATUS === 1"
        >{{ $t('homePage._10') }}</el-tag>
        <el-tag
          effect="dark"
          type="success"
          size="mini"
          style="margin-right: 5px"
          v-if="info.STATUS === 2"
        >{{ $t('homePage._11') }}</el-tag>
        <el-tag
          effect="dark"
          type="info"
          size="mini"
          style="margin-right: 5px"
          v-if="info.STATUS === 3"
        >{{ $t('homePage._12') }}</el-tag>
        <div>
          <!-- <el-tag
            effect="dark"
            type="primary"
            v-if="info.TAG"
            style="margin-right: 10px;margin-top: 10px;margin-bottom: 10px;color: #fff"
          >{{ info.TAG }}</el-tag>-->
          <!-- <el-tag
            effect="dark"
            type="danger"
            v-if="info.IS_TOP"
            style="margin-top: 10px;margin-bottom: 10px"
          >{{$t('homePage._43')}}</el-tag>-->
        </div>
      </div>
      <div class="neirong">
        <el-form ref="wForm" :model="info" label-width="100px">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item :label="$t('homePage._13')+ ':'">
                <span>{{info.CALL_CODE}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('homePage._50')+ ':'">
                <span>{{info.CALL_NO}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('homePage._51')+ ':'">
                <span>{{info.CHECKIN_TIME}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item :label="$t('homePage._52')+ ':'">
                <span>{{info.END_OPERATOR}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('homePage._53')+ ':'">
                <span>{{info.END_TIME}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('homePage._57')+ ':'">
                <span>{{info.CHECKIN_OPERATOR}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item :label="$t('homePage._54')+ ':'">
                <span>{{info.LAST_NOTICE_TIME}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('homePage._14')+ ':'">
                <span>{{info.LINE_TYPE}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('homePage._55')+ ':'">
                <span>{{info.NOTICE_COUNT}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item :label="$t('homePage._19')+ ':'">
                <span>{{info.OPERATION_LINE_NAME}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('homePage._15')+ ':'">
                <span>{{info.OPERATION_NAME}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('homePage._20')+ ':'">
                <span>{{info.OPERATION_SITE_NAME}}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <el-divider class="mydivider" style="background: transparent">
        <span style="color: #e5e5e5;background: transparent">{{$t('homePage._25')}}</span>
      </el-divider>
    </div>
  </div>
</template>

<script>
import { LoadEarlyWarningData } from '@/api/AndonCallRecord'
import { mapGetters } from 'vuex'
export default {
  name: 'WarningInformation',
  computed: {
    ...mapGetters(['userinfo'])
  },
  components: {},
  data () {
    return {
      info: {},
      param: {},
      isShow: true
    }
  },
  created () {
    this.param = this.$route.query || {}
    this.getLoadEarlyWarningData()
    console.log('999', this.$router)
  },
  watch: {
    param (val) {
      if (val.STATUS !== null && val.STATUS) {
        this.isShow = true
      } else {
        this.isShow = false
      }
    }
  },
  methods: {
    async getLoadEarlyWarningData () {
      this.param.User_ID = this.userinfo.ID
      console.log('000', this.param)
      const res = await LoadEarlyWarningData(this.param)
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
