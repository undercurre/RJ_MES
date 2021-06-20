<template>
  <el-dropdown size="small" class="d2-mr">
    <span class="btn-text">{{info.NICK_NAME ? `${$t('localePage._3')} ${info.NICK_NAME}` : $t('localePage._4')}}</span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item @click.native="dialogVisible = true">
        <!-- <i class="el-icon-key" style="font-weight: 600;"></i> -->
        <d2-icon name="key" class="d2-mr-5"/>
        {{$t("navbar.change")}}
      </el-dropdown-item>
      <el-dropdown-item @click.native="logOff">
        <d2-icon name="power-off" class="d2-mr-5"/>
        {{$t("navbar._4")}}
      </el-dropdown-item>
    </el-dropdown-menu>
       <!-- 修改密码 -->
    <el-dialog :close-on-click-modal="false" v-dialogDrag center :title="$t('navbar.change')" :visible.sync="dialogVisible" width="40%">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        status-icon
        :rules="rules"
        :show-message="false"
        label-width="125px"
        class="demo-ruleForm"
      >
        <el-form-item :label="$t('navbar.oldpassword')" prop="OldPassword">
          <el-input v-model.number="ruleForm.OldPassword" type="password" />
        </el-form-item>
        <el-form-item :label="$t('navbar.newpassword')" prop="NewPassword">
          <el-input v-model="ruleForm.NewPassword" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item :label="$t('navbar.confirmpassword')" prop="NewPasswordRe">
          <el-input v-model="ruleForm.NewPasswordRe" type="password" autocomplete="off" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('ruleForm')">{{ $t('navbar.submit') }}</el-button>
        <el-button @click="resetForm('ruleForm')">{{ $t('navbar.reset') }}</el-button>
      </span>
    </el-dialog>
  </el-dropdown>
</template>

<script>
import util from '@/libs/util.js'
import { mapState, mapActions, mapGetters } from 'vuex'
import { ChangePassword } from '@/api/User'
export default {
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('navbar.sakpassword')))
      } else {
        if (this.ruleForm.NewPasswordRe !== '') {
          this.$refs.ruleForm.validateField('NewPasswordRe')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('navbar.again')))
      } else if (value !== this.ruleForm.NewPassword) {
        callback(new Error(this.$t('navbar.Inconsistent')))
      } else {
        callback()
      }
    }
    return {
      dialogVisible: false,
      ruleForm: {
        Id: '',
        User_Name: '',
        OldPassword: '',
        NewPassword: '',
        NewPasswordRe: ''
      },
      rules: {
        OldPassword: [
          {
            trigger: 'blur',
            required: true,
            message: this.$t('navbar.sakoldpad')
          }
        ],
        NewPassword: [{ validator: validatePass, trigger: 'blur' }],
        NewPasswordRe: [{ validator: validatePass2, trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapState('d2admin/user', [
      'info'
    ]),
    ...mapGetters([
      'userinfo'
    ])
  },
  created () {
    this.ruleForm.Id = this.userinfo.ID
    this.ruleForm.User_Name = this.userinfo.USER_NAME
  },
  methods: {
    ...mapActions('d2admin/account', [
      'logout'
    ]),
    /**
     * @description 登出
     */
    logOff () {
      this.logout({
        confirm: true
      })
    },
    // 修改密码
    submitForm (formName) {
      console.log(JSON.stringify(this.ruleForm))
      this.$refs.ruleForm.validate(async (valid, errInfo) => {
        if (valid) {
          const res = await ChangePassword(this.ruleForm)
          if (res.Result) {
            this.$notify({
              title: this.$t('navbar.success'),
              message: this.$t('navbar.modifysuc'),
              type: 'success',
              duration: 4000
            })
            util.cookies.remove('token')
            util.cookies.remove('uuid')
            this.$store.dispatch('d2admin/user/set', {}, { root: true })
            this.$router.push({
              name: 'login'
            })
          }
        } else {
          try {
            Object.keys(errInfo).forEach(item => {
              this.$message.error(errInfo[item][0].message)
              throw new Error(errInfo[item][0].message)
            })
          } catch (e) {}
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.ruleForm.Id = this.userinfo.ID
      this.ruleForm.User_Name = this.userinfo.USER_NAME
    }
  }
}
</script>
