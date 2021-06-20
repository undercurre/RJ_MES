<template>
  <d2-container>
    <template slot="header">
      <custom-container-header :isExport="false" :isExportTpl="false" :isImport="false">
        <el-button
          type="danger"
          icon="el-icon-delete"
          @click.prevent="eliminateClick"
        >{{ $t('publics.btn.clear') }}</el-button>
        <el-button
          type="primary"
          icon="el-icon-check"
          @click.prevent="preserveClick"
          v-if="$btnList.indexOf('SmtStencilCollaruseSave') !== -1"
        >{{ $t('SmtStencilCollaruse2._1') }}</el-button>
      </custom-container-header>
    </template>
    <el-form ref="form" :model="form" label-width="120px" size="mini">
      <el-row>
        <el-col :span="12">
          <el-form-item :label="$t('SmtStencilCollaruse2._2')">
            <el-input v-model="form.STENCIL_NO" @change="getLoadScraperData" />
          </el-form-item>
          <el-form-item :label="$t('SmtStencilCollaruse2._4')">
            <el-input v-model="form.WorkNo" readonly />
          </el-form-item>
          <el-form-item :label="$t('SmtStencilCollaruse2._12')">
            <el-input v-model="form.TENSION_A" type="number" />
          </el-form-item>
          <el-form-item :label="$t('SmtStencilCollaruse2._13')">
            <el-input v-model="form.TENSION_B" type="number" />
          </el-form-item>
          <el-form-item :label="$t('SmtStencilCollaruse2._14')">
            <el-input v-model="form.TENSION_C" type="number" />
          </el-form-item>
          <el-form-item :label="$t('SmtStencilCollaruse2._15')">
            <el-input v-model="form.TENSION_D" type="number" />
          </el-form-item>
          <el-form-item :label="$t('SmtStencilCollaruse2._16')">
            <el-input v-model="form.TENSION_E" type="number" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <div style="border: 1px solid #e5e5e5;padding: 10px;margin-left: 20px">
            <el-checkbox-group v-model="INSPECT_RESULT">
              <el-checkbox :label="$t('SmtStencilCollaruse2._6')" :disabled="isNG" />
              <el-checkbox :label="$t('SmtStencilCollaruse2._7')" :disabled="isNG" />
              <el-checkbox :label="$t('SmtStencilCollaruse2._8')" :disabled="isNG" />
              <el-checkbox :label="$t('SmtStencilCollaruse2._9')" :disabled="isNG" />
              <el-checkbox :label="$t('SmtStencilCollaruse2._10')" :disabled="isNG" />
              <el-checkbox :label="$t('SmtStencilCollaruse2._11')" :disabled="!isNG" />
              <el-checkbox label="OK" :disabled="isNG" />
            </el-checkbox-group>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <div>
      <span
        class="demonstration"
        style="display: block;color: #606266;font-size: 14px;margin: 10px 0;"
      >{{ $t('SmtStencilCollaruse2._17')}}</span>
    </div>
    <div class="content-block">
      <div
        class="item"
        v-for="item in mainTable"
        :key="item.id"
        :style="{
        background: item.type === 1 ? '#67C23A' : '#F56C6C'
      }"
      >{{ item.info }}</div>
    </div>
  </d2-container>
</template>

<script>
import customContainerHeader from '@/components/custom-container-header'
import { mapGetters } from 'vuex'
import helper from '@/api/Helper'
const API = helper('SmtStencilTake')
export default {
  name: 'SmtStencilCollaruse',
  computed: {
    ...mapGetters(['userinfo'])
  },
  components: { customContainerHeader },
  data () {
    return {
      checkList: [],
      form: {
        STENCIL_NO: '', // 刮刀号
        WorkNo: '', // 领用者工号
        UserName: '',
        PrintCount: '',
        TENSION_A: '',
        TENSION_B: '',
        TENSION_C: '',
        TENSION_D: '',
        TENSION_E: '',
        InspectResult: ''
      },
      INSPECT_RESULT: [],
      isNG: false,
      mainTable: [],
      indexFlag: false
    }
  },
  methods: {
    async getIndex () {
      const res = await API.Index()
      if (res.Result) {
        this.indexFlag = true
      } else {
        this.indexFlag = false
      }
    },
    // 回车获取刮刀信息
    async getLoadScraperData () {
      if (this.form.STENCIL_NO) {
        this.loading = true
        const res = await API.LoadData({ stencil_no: this.form.STENCIL_NO })
        if (res.Result) {
          const data = res.Result
          this.form.PrintCount = data.PrintCount
          this.form.TENSION_A = data.TENSION_A
          this.form.TENSION_B = data.TENSION_B
          this.form.TENSION_C = data.TENSION_C
          this.form.TENSION_D = data.TENSION_D
          this.form.TENSION_E = data.TENSION_E
          this.form.TENSION_CONTROL_FLAG = data.TENSION_CONTROL_FLAG
          this.form.TENSION_CONTROL_VALUE = data.TENSION_CONTROL_VALUE
        } else {
          this.form.STENCIL_NO = ''
        }
      }
    },
    // 清除
    eliminateClick () {
      this.form = {
        STENCIL_NO: '',
        PrintCount: 0,
        TENSION_A: 0,
        TENSION_B: 0,
        TENSION_C: 0,
        TENSION_D: 0,
        TENSION_E: 0,
        InspectResult: []
      }
      this.INSPECT_RESULT = [this.$t('SmtStencilCollaruse2._11')]
      this.form.WorkNo = this.userinfo.USER_NAME
      this.form.UserName = this.userinfo.USER_NAME
    },
    // 保存
    preserveClick () {
      if (this.form.STENCIL_NO === '') {
        this.$message({
          showClose: true,
          message: this.$t('SmtStencilCollaruse2._3'),
          type: 'warning'
        })
        return
      }
      this.form.InspectResult = this.INSPECT_RESULT.join(',')
      this.form.TENSION_A = this.form.TENSION_A
        ? parseInt(this.form.TENSION_A)
        : ''
      this.form.TENSION_B = this.form.TENSION_B
        ? parseInt(this.form.TENSION_B)
        : ''
      this.form.TENSION_C = this.form.TENSION_C
        ? parseInt(this.form.TENSION_C)
        : ''
      this.form.TENSION_D = this.form.TENSION_D
        ? parseInt(this.form.TENSION_D)
        : ''
      this.form.TENSION_E = this.form.TENSION_E
        ? parseInt(this.form.TENSION_E)
        : ''

      API.SaveData({
        STENCIL_NO: this.form.STENCIL_NO,
        InspectResult: this.form.InspectResult,
        WorkNo: this.form.WorkNo,
        UserName: this.form.UserName,
        PrintCount: this.form.PrintCount,
        TENSION_A: this.form.TENSION_A,
        TENSION_B: this.form.TENSION_B,
        TENSION_C: this.form.TENSION_C,
        TENSION_D: this.form.TENSION_D,
        TENSION_E: this.form.TENSION_E
      }).then(res => {
        if (res.Result) {
          this.mainTable.push({
            type: 1,
            info: this.$t('SmtStencilCollaruse2._22').replace(
              '%TIME%',
              new Date().toLocaleString()
            )
          })
          this.eliminateClick()
          this.$message.success(this.$t('SmtStencilCollaruse2._23'))
        } else {
          this.mainTable.push({
            type: -1,
            info: this.$t('SmtStencilCollaruse2._24').replace(
              '%TIME%',
              new Date().toLocaleString()
            )
          })
          this.$message.error(this.$t('SmtStencilCollaruse2._25'))
        }
      })
    }
  },
  created () {
    this.form.WorkNo = this.userinfo.USER_NAME
    this.form.UserName = this.userinfo.USER_NAME
    this.getIndex()
  },
  watch: {
    INSPECT_RESULT: {
      handler (val, oldVal) {
        if (oldVal.indexOf('OK') === -1 && val.indexOf('OK') !== -1) {
          // 原数组没有ok 新数组有 ok
          this.INSPECT_RESULT = ['OK']
        } else if (oldVal.indexOf('OK') !== -1 && val.length > 1) {
          const arr = []
          val.map(item => {
            if (item !== 'OK') arr.push(item)
          })
          this.INSPECT_RESULT = arr
        }
        this.INSPECT_RESULT = this.INSPECT_RESULT
      },
      deep: false
    },
    isNG: {
      handler (val, oldVal) {
        if (val) {
          this.INSPECT_RESULT = [this.$t('SmtStencilCollaruse2._11')]
        } else {
          this.INSPECT_RESULT = []
        }
      }
    },
    form: {
      handler (val, oldVal) {
        const {
          TENSION_A,
          TENSION_B,
          TENSION_C,
          TENSION_D,
          TENSION_E
        } = this.form
        let max = TENSION_A
        let min = TENSION_A
        const arr = [TENSION_A, TENSION_B, TENSION_C, TENSION_D, TENSION_E]
        try {
          arr.forEach(item => {
            if (item > max) {
              max = item
            }
            if (item < min) {
              min = item
            }
            if (item > 50 || item < 30) {
              this.isNG = true
              // 抛出错误终止foreach
              throw new Error(new Date().toLocaleString())
            } else {
              this.isNG = false
            }
            if (this.form.TENSION_CONTROL_FLAG === 'Y') {
              if (item < this.form.TENSION_CONTROL_VALUE) {
                this.isNG = true
                // 抛出错误终止foreach
                throw new Error(new Date().toLocaleString())
              } else {
                this.isNG = false
              }
            }
          })
          if (max - min > 10) {
            this.isNG = true
          }
        } catch (e) {
          console.log(e.message)
        }
      },
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped>
.el-checkbox {
  display: block;
}
.content-block {
  border: 1px solid rgb(233, 234, 236);
  box-sizing: border-box;
  height: calc(100vh - 60px - 21px - 21px - 73px - 41px - 273px);
  overflow: auto;
  background: rgb(249, 219, 189);
}
.item {
  padding: 5px 5px;
  color: #fff;
  font-size: 14px;
  border-bottom: 1px dashed #fff;
}
</style>
