<template>
  <d2-container>
    <template slot="header">
      <custom-container-header :isExport="false" :isExportTpl="false" :isImport="false">
        <el-input
          v-model="formData.STENCIL_NO"
          :placeholder="$t('SmtStencilClean._1')"
          clearable
          style="width:200px"
          @keyup.enter.native="getLoadData"
        />&nbsp;
        <el-button
          type="primary"
          icon="el-icon-search"
          @click.prevent="getLoadData"
        >{{ $t('publics.btn.search') }}</el-button>
        <el-button
          type="success"
          icon="el-icon-check"
          @click.prevent="save"
          v-if="$btnList.indexOf('SmtStencilCleanSave') !== -1"
        >{{ $t('publics.btn.save') }}</el-button>
        <el-button
          type="danger"
          icon="el-icon-delete"
          @click.prevent="clearAll"
        >{{ $t('publics.btn.clear') }}</el-button>
      </custom-container-header>
    </template>
    <div>
      <el-form ref="form" :model="sizeForm" label-width="120px" size="mini">
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('SmtStencilClean._2')">
              <el-input v-model="sizeForm.STENCIL_NO" @change="getStencilInfo" />
            </el-form-item>
            <el-form-item :label="$t('SmtStencilClean._3')">
              <el-input v-model="sizeForm.LAST_CLEAN_TIME" readonly />
            </el-form-item>
            <el-form-item :label="$t('SmtStencilClean._4')">
              <el-input v-model="sizeForm.TENSION_A" type="number" />
            </el-form-item>
            <el-form-item :label="$t('SmtStencilClean._5')">
              <el-input v-model="sizeForm.TENSION_B" type="number" />
            </el-form-item>
            <el-form-item :label="$t('SmtStencilClean._6')">
              <el-input v-model="sizeForm.TENSION_C" type="number" />
            </el-form-item>
            <el-form-item :label="$t('SmtStencilClean._7')">
              <el-input v-model="sizeForm.TENSION_D" type="number" />
            </el-form-item>
            <el-form-item :label="$t('SmtStencilClean._8')">
              <el-input v-model="sizeForm.TENSION_E" type="number" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('SmtStencilClean._9')">
              <el-input v-model="sizeForm.PrintCount" readonly type="number" />
            </el-form-item>
            <el-form-item :label="$t('SmtStencilClean._10')">
              <el-input v-model="sizeForm.WorkNo" readonly />
            </el-form-item>
            <el-form-item label=" ">
              <div style="border: 1px solid #e5e5e5;padding: 10px;overflow: hidden">
                <el-checkbox-group v-model="checkList">
                  <el-checkbox :label="$t('SmtStencilClean._11')" :disabled="isNG" />
                  <el-checkbox :label="$t('SmtStencilClean._12')" :disabled="isNG" />
                  <el-checkbox :label="$t('SmtStencilClean._13')" :disabled="isNG" />
                  <el-checkbox :label="$t('SmtStencilClean._14')" :disabled="isNG" />
                  <el-checkbox :label="$t('SmtStencilClean._15')" :disabled="isNG" />
                  <el-checkbox :label="$t('SmtStencilClean._16')" :disabled="!isNG" />
                  <el-checkbox label="OK" :disabled="isNG" />
                </el-checkbox-group>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div>
      <span
        class="demonstration"
        style="display: block;color: #606266;font-size: 14px;margin: 10px 0;"
      >{{ $t('SmtStencilClean._27') }}</span>
    </div>
    <div
      :style="{
      height: `calc(100vh - 60px - 21px - 74px - 20px - 41px - ${formHeight}px)`
    }"
    >
      <vxe-table
        ref="xTable"
        border
        resizable
        height="100%"
        size="medium"
        align="center"
        highlight-hover-row
        highlight-current-row
        show-overflow
        auto-resize
        keep-source
        :loading="loading"
        :data="mainTable"
      >
        <vxe-table-column width="180" field="STENCIL_NO" :title="$t('SmtStencilClean._18')" />
        <vxe-table-column width="100" field="PRINT_COUNT" :title="$t('SmtStencilClean._19')" />
        <vxe-table-column width="120" field="CLEAN_USER" :title="$t('SmtStencilClean._20')" />
        <vxe-table-column width="120" field="INSPECT_USER" :title="$t('SmtStencilClean._21')" />
        <vxe-table-column width="120" field="INSPECT_RESULT" :title="$t('SmtStencilClean._22')" />
        <vxe-table-column width="180" field="CLEAN_TIME" :title="$t('SmtStencilClean._23')" />
        <vxe-table-column width="180" field="NEXT_CLEAN_TIME" :title="$t('SmtStencilClean._24')" />
        <vxe-table-column width="100" field="TENSION_A" :title="$t('SmtStencilClean._4')" />
        <vxe-table-column width="100" field="TENSION_B" :title="$t('SmtStencilClean._5')" />
        <vxe-table-column width="100" field="TENSION_C" :title="$t('SmtStencilClean._6')" />
        <vxe-table-column width="100" field="TENSION_D" :title="$t('SmtStencilClean._7')" />
        <vxe-table-column width="100" field="TENSION_E" :title="$t('SmtStencilClean._8')" />
      </vxe-table>
    </div>
  </d2-container>
</template>

<script>
import customContainerHeader from '@/components/custom-container-header'
import { mapGetters } from 'vuex'
import helper from '@/api/Helper'
import { GetStencilInfo } from '@/api/SmtStencilClean'
const API = helper('SmtStencilClean')
export default {
  data () {
    return {
      formData: {
        STENCIL_NO: '',
        ...this.formData
      },
      sizeForm: {
        STENCIL_NO: '',
        InspectResult: '',
        WorkNo: '',
        UserName: '',
        PrintCount: '',
        TENSION_A: '',
        TENSION_B: '',
        TENSION_C: '',
        TENSION_D: '',
        TENSION_E: '',
        type: true
      },
      checkList: [],
      loading: false,
      mainTable: [],
      tableHeight: 0,
      indexFlag: false,
      netData: {},
      isNG: false,
      formHeight: 0
    }
  },
  computed: {
    ...mapGetters(['userinfo'])
  },
  components: {
    customContainerHeader
  },
  methods: {
    async getIndex () {
      const result = await API.Index()
      if (result.Result) {
        this.indexFlag = true
      } else {
        this.indexFlag = false
      }
    },
    async getStencilInfo () {
      if (this.sizeForm.STENCIL_NO) {
        this.loading = true
        const result = await GetStencilInfo(this.sizeForm.STENCIL_NO)
        this.loading = false
        if (result.Result) {
          this.netData = result.Result
          if (this.netData.UnUsed) {
            this.$confirm(
              this.$t('SmtStencilClean._25'),
              this.$t('publics.tips.tips'),
              {
                confirmButtonText: this.$t('publics.tips.confirm'),
                cancelButtonText: this.$t('publics.tips.cancel'),
                type: 'warning'
              }
            )
              .then(_ => {
                this.sizeForm = {
                  ...this.netData,
                  UserName: this.userinfo.USER_NAME,
                  InspectResult: '',
                  WorkNo: this.userinfo.USER_NAME,
                  type: true,
                  STENCIL_NO: this.sizeForm.STENCIL_NO
                }
              })
              .catch(() => {
                this.clearAll()
              })
          } else {
            this.sizeForm = {
              ...this.netData,
              UserName: this.userinfo.USER_NAME,
              InspectResult: '',
              WorkNo: this.userinfo.USER_NAME,
              type: true,
              STENCIL_NO: this.sizeForm.STENCIL_NO
            }
          }
        } else {
          this.sizeForm.STENCIL_NO = ''
          // this.$message.error(this.$t('SmtStencilClean._26'))
        }
      }
    },
    clearAll () {
      this.sizeForm = {
        STENCIL_NO: '',
        InspectResult: '',
        WorkNo: '',
        UserName: '',
        PrintCount: '',
        TENSION_A: '',
        TENSION_B: '',
        TENSION_C: '',
        TENSION_D: '',
        TENSION_E: '',
        type: true
      }
    },
    async getLoadData () {
      if (!this.formData.STENCIL_NO) {
        this.$message.error(this.$t('SmtStencilClean._1'))
        return false
      }
      this.loading = true
      const result = await API.LoadData({
        stencil_no: this.formData.STENCIL_NO
      })
      this.loading = false
      this.mainTable = result.Result || []
    },
    async save () {
      if (!this.sizeForm.STENCIL_NO) {
        this.$message.error(this.$t('SmtStencilClean._1'))
        return false
      }
      this.sizeForm.InspectResult = this.checkList.join(',')
      const formData = JSON.parse(JSON.stringify(this.sizeForm))
      delete formData.type
      delete formData.UnUsed
      delete formData.LAST_CLEAN_TIME
      formData.PrintCount = parseFloat(formData.PrintCount)
      formData.TENSION_A = parseFloat(formData.TENSION_A)
      formData.TENSION_B = parseFloat(formData.TENSION_B)
      formData.TENSION_C = parseFloat(formData.TENSION_C)
      formData.TENSION_D = parseFloat(formData.TENSION_D)
      formData.TENSION_E = parseFloat(formData.TENSION_E)
      const result = await API.SaveData(formData)
      if (result.Result) {
        this.$message.success(this.$t('publics.tips.saveSuccess'))
        this.clearAll()
      }
    },
    checkFormSize () {
      this.$nextTick(() => {
        const formHeight = this.$refs.form.$el.offsetHeight
        this.formHeight = formHeight
      })
    }
  },
  created () {
    this.checkFormSize()
    window.addEventListener('load', this.checkFormSize)
    window.addEventListener('resize', this.checkFormSize)
    this.getIndex()
  },
  beforeDestroy () {
    // 取消监听
    window.removeEventListener('resize', this.checkFormSize)
    window.removeEventListener('load', this.checkFormSize)
  },
  watch: {
    checkList: {
      handler (val, oldVal) {
        if (oldVal.indexOf('OK') === -1 && val.indexOf('OK') !== -1) {
          // 原数组没有ok 新数组有 ok
          this.checkList = ['OK']
        } else if (oldVal.indexOf('OK') !== -1 && val.length > 1) {
          const arr = []
          val.map(item => {
            if (item !== 'OK') arr.push(item)
          })
          this.checkList = arr
        }
        this.checkList = this.checkList
      },
      deep: false
    },
    isNG: {
      handler (val, oldVal) {
        if (val) {
          this.checkList = [this.$t('SmtStencilClean._16')]
        } else {
          this.checkList = []
        }
      }
    },
    sizeForm: {
      handler (val, oldVal) {
        const {
          TENSION_A,
          TENSION_B,
          TENSION_C,
          TENSION_D,
          TENSION_E
        } = this.sizeForm
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
            if (this.sizeForm.TENSION_CONTROL_FLAG === 'Y') {
              if (item < this.sizeForm.TENSION_CONTROL_VALUE) {
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
