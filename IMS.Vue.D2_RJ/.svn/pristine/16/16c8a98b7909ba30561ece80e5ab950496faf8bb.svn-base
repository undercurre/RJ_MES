<template>
  <div class="page-login">
    <div class="page-login--layer page-login--layer-area">
      <ul class="circles">
        <li v-for="n in 10"
            :key="n"></li>
      </ul>
    </div>
    <div class="page-login--layer page-login--layer-time"
         flex="main:center cross:center">
      {{time}}
    </div>
    <div class="page-login--layer">
      <div class="page-login--content"
           flex="dir:top main:justify cross:stretch box:justify">
        <div class="page-login--content-header">
          <p class="page-login--content-header-motto">
            {{ $t('sologen') }}&nbsp;{{ '  v' + Version }}
          </p>
        </div>
        <div class="page-login--content-main"
             flex="dir:top main:center cross:center">
          <!-- logo -->
          <img class="page-login--logo"
               src="./image/logo.png">
          <!-- form -->
          <div class="page-login--form">
            <el-card shadow="never">
              <el-form ref="loginForm"
                       label-position="top"
                       :rules="rules"
                       :model="formLogin"
                       size="default">
                <el-form-item prop="username">
                  <el-input type="text"
                            v-model="formLogin.username"
                            :placeholder="$t('page.login.placeholder.username')">
                    <i slot="prepend"
                       class="fa fa-user-circle-o"></i>
                  </el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <el-input type="password"
                            v-model="formLogin.password"
                            @keyup.enter.native="submit"
                            :placeholder="$t('page.login.placeholder.password')">
                    <i slot="prepend"
                       class="fa fa-keyboard-o"></i>
                  </el-input>
                </el-form-item>
                <!--                <el-form-item prop="code">-->
                <!--                  <el-input-->
                <!--                    type="text"-->
                <!--                    v-model="formLogin.code"-->
                <!--                    placeholder="验证码">-->
                <!--                    <template slot="append">-->
                <!--                      <img class="login-code" src="./image/login-code.png">-->
                <!--                    </template>-->
                <!--                  </el-input>-->
                <!--                </el-form-item>-->
                <el-button :loading="loading"
                           size="default"
                           @click="submit"
                           type="primary"
                           class="button-login">
                  {{ $t('page.login.button.login') }}
                </el-button>
              </el-form>
            </el-card>
            <p class="page-login--options"
               flex="main:justify cross:center">
              <!-- <span><d2-icon name="question-circle"/> {{ $t('page.login.button.forgetPwd') }}</span> -->
              <!--              <span>注册用户</span>-->
            </p>
            <!-- quick login -->
          </div>
        </div>
        <div class="page-login--content-footer">
          <p class="page-login--content-footer-locales">
            <a v-for="language in $languages"
               :key="language.value"
               @click="onChangeLocale(language.value)">
              {{ language.label }}
            </a>
          </p>
          <!--          <p class="page-login&#45;&#45;content-footer-options">-->
          <!--            <a href="#">帮助</a>-->
          <!--            <a href="#">隐私</a>-->
          <!--            <a href="#">条款</a>-->
          <!--          </p>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import '@/components/d2-icon/font-awesome-4.7.0/css/font-awesome.min.css'
import dayjs from 'dayjs'
import { mapActions } from 'vuex'
import localeMixin from '@/locales/mixin.js'
import qs from 'qs'
import util from '@/libs/util'
export default {
  mixins: [
    localeMixin
  ],
  data () {
    return {
      timeInterval: null,
      time: dayjs().format('HH:mm:ss'),
      // 表单
      formLogin: {
        username: '',
        password: ''
      },
      loading: false,
      Version: process.env.VUE_APP_VERSION
    }
  },
  created () {
    let url = window.location.hash
    if (!url) return false
    const query = qs.parse(url.split('?')[1])
    // eslint-disable-next-line no-constant-condition
    if (parseInt(process.env.VUE_APP_URL_LOGIN) === 1) { // TODO 通过env配置来打开这个开关 VUE_APP_URL_LOGIN
      if (query.userName && query.password) { // TODO 检测到url上面有账号密码信息自动登录
        this.formLogin = {
          username: query.userName,
          password: query.password
        }
        this.$nextTick(() => {
          this.submit()
        })
      }
    }
    // TODO 通过env配置开关来执行 VUE_APP_STRONG_REDIRECT
    if (parseInt(process.env.VUE_APP_STRONG_REDIRECT) === 1) { // TODO 强制重定向flag
      Object.keys(query).forEach(item => {
        if (item.indexOf('redirect') !== -1) {
          util.cookies.set('redirect', query[item]) // TODO 因为路由是后面生成的，所以无法一下重定向到这个位置，所以要错开
        }
      })
    }
  },
  mounted () {
    this.timeInterval = setInterval(() => {
      this.refreshTime()
    }, 1000)
  },
  beforeDestroy () {
    clearInterval(this.timeInterval)
  },
  methods: {
    ...mapActions('d2admin/account', [
      'login'
    ]),
    refreshTime () {
      this.time = dayjs().format('HH:mm:ss')
    },
    /**
     * @description 提交表单
     */
    // 提交登录信息
    submit () {
      this.loading = true
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.login({
            username: this.formLogin.username,
            password: this.formLogin.password
          })
            .then(() => {
              this.loading = false
              // 重定向对象不存在则返回顶层路径
              this.$router.replace(this.$route.query.redirect || '/')
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          this.loading = false
          // 登录表单校验失败
          this.$message.error(this.formValidateError)
        }
      })
    }
  },
  computed: {
    rules () {
      return {
        username: [
          {
            required: true,
            message: this.$t('page.login.tips.username'),
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: this.$t('page.login.tips.password'),
            trigger: 'blur'
          }
        ]
      }
    },
    formValidateError () {
      return this.$t('page.login.tips.formValidateError')
    }
  }
}
</script>

<style lang="scss">
.page-login--form .el-form-item__content {
  width: 100%;
}
.page-login {
  @extend %unable-select;
  $backgroundColor: #f0f2f5;
  // ---
  background-color: $backgroundColor;
  height: 100%;
  position: relative;
  // 层
  .page-login--layer {
    @extend %full;
    overflow: auto;
  }
  .page-login--layer-area {
    overflow: hidden;
  }
  // 时间
  .page-login--layer-time {
    font-size: 24em;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.03);
    overflow: hidden;
  }
  // 登陆页面控件的容器
  .page-login--content {
    height: 100%;
    min-height: 500px;
  }
  // header
  .page-login--content-header {
    padding: 1em 0;
    .page-login--content-header-motto {
      margin: 0px;
      padding: 0px;
      color: $color-text-normal;
      text-align: center;
      font-size: 12px;
    }
  }
  // main
  .page-login--logo {
    width: 240px;
    margin-bottom: 2em;
    margin-top: -2em;
  }
  // 登录表单
  .page-login--form {
    width: 280px;
    // 卡片
    .el-card {
      margin-bottom: 15px;
    }
    // 登录按钮
    .button-login {
      width: 100%;
    }
    // 输入框左边的图表区域缩窄
    .el-input-group__prepend {
      padding: 0px 14px;
    }
    .login-code {
      height: 40px - 2px;
      display: block;
      margin: 0px -20px;
      border-top-right-radius: 2px;
      border-bottom-right-radius: 2px;
    }
    // 登陆选项
    .page-login--options {
      margin: 0px;
      padding: 0px;
      font-size: 14px;
      color: $color-primary;
      margin-bottom: 15px;
      font-weight: bold;
    }
    .page-login--quick {
      width: 100%;
    }
  }
  // 快速选择用户面板
  .page-login--quick-user {
    @extend %flex-center-col;
    padding: 10px 0px;
    border-radius: 4px;
    &:hover {
      background-color: $color-bg;
      i {
        color: $color-text-normal;
      }
      span {
        color: $color-text-normal;
      }
    }
    i {
      font-size: 36px;
      color: $color-text-sub;
    }
    span {
      font-size: 12px;
      margin-top: 10px;
      color: $color-text-sub;
    }
  }
  // footer
  .page-login--content-footer {
    padding: 1em 0;
    .page-login--content-footer-locales {
      padding: 0px;
      margin: 0px;
      margin-bottom: 15px;
      font-size: 12px;
      line-height: 12px;
      text-align: center;
      color: $color-text-normal;
      a {
        color: $color-text-normal;
        margin: 0 0.5em;
        &:hover {
          color: $color-text-main;
        }
      }
    }
    .page-login--content-footer-copyright {
      padding: 0px;
      margin: 0px;
      margin-bottom: 10px;
      font-size: 12px;
      line-height: 12px;
      text-align: center;
      color: $color-text-normal;
      a {
        color: $color-text-normal;
      }
    }
    .page-login--content-footer-options {
      padding: 0px;
      margin: 0px;
      font-size: 12px;
      line-height: 12px;
      text-align: center;
      a {
        color: $color-text-normal;
        margin: 0 1em;
      }
    }
  }
  // 背景
  .circles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin: 0px;
    padding: 0px;
    li {
      position: absolute;
      display: block;
      list-style: none;
      width: 20px;
      height: 20px;
      background: #fff;
      animation: animate 25s linear infinite;
      bottom: -200px;
      @keyframes animate {
        0% {
          transform: translateY(0) rotate(0deg);
          opacity: 1;
          border-radius: 0;
        }
        100% {
          transform: translateY(-1000px) rotate(720deg);
          opacity: 0;
          border-radius: 50%;
        }
      }
      &:nth-child(1) {
        left: 15%;
        width: 80px;
        height: 80px;
        animation-delay: 0s;
      }
      &:nth-child(2) {
        left: 5%;
        width: 20px;
        height: 20px;
        animation-delay: 2s;
        animation-duration: 12s;
      }
      &:nth-child(3) {
        left: 70%;
        width: 20px;
        height: 20px;
        animation-delay: 4s;
      }
      &:nth-child(4) {
        left: 40%;
        width: 60px;
        height: 60px;
        animation-delay: 0s;
        animation-duration: 18s;
      }
      &:nth-child(5) {
        left: 65%;
        width: 20px;
        height: 20px;
        animation-delay: 0s;
      }
      &:nth-child(6) {
        left: 75%;
        width: 150px;
        height: 150px;
        animation-delay: 3s;
      }
      &:nth-child(7) {
        left: 35%;
        width: 200px;
        height: 200px;
        animation-delay: 7s;
      }
      &:nth-child(8) {
        left: 50%;
        width: 25px;
        height: 25px;
        animation-delay: 15s;
        animation-duration: 45s;
      }
      &:nth-child(9) {
        left: 20%;
        width: 15px;
        height: 15px;
        animation-delay: 2s;
        animation-duration: 35s;
      }
      &:nth-child(10) {
        left: 85%;
        width: 150px;
        height: 150px;
        animation-delay: 0s;
        animation-duration: 11s;
      }
    }
  }
}
</style>
