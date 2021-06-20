<template>
  <div class="locking">
    <div class="step">Step{{ consIndex }}/4</div>
    <div class="locking-title">
      <span class="demonstration"
            v-if="consIndex == 1">{{
        $t("goods._11")
      }}</span>
      <span class="demonstration"
            v-else-if="consIndex == 2">{{
        $t("goods._12")
      }}</span>
      <span class="demonstration"
            v-else-if="consIndex == 3">{{
        $t("goods._13")
      }}</span>
      <span class="demonstration"
            v-else-if="consIndex == 4">{{
        $t("goods._14")
      }}</span>
    </div>
    <el-carousel ref="carousel"
                 :interval="5000"
                 arrow="always"
                 :autoplay="false"
                 :loop="false"
                 style="height: 293px;overflow: hidden;"
                 indicator-position="outside"
                 @change="carlClick">
      <el-carousel-item class="control">
        <el-form ref="formDate"
                 :show-message="false"
                 :rules="condiVal"
                 :model="formDate"
                 label-width="200px"
                 class="form">
          <el-form-item :label="$t('goods._16')"
                        prop="MainConditionRadioGroup">
            <el-radio-group v-model="formDate.MainConditionRadioGroup"
                            class="group">
              <el-radio ref="ref"
                        v-for="(itme, index) in MainCondition"
                        :key="index"
                        :label="itme.LOOKUP_CODE"
                        @change="groupClick(itme.LOOKUP_CODE, itme.MEANING)">{{ itme.LOOKUP_CODE + 1 }}、{{ itme.MEANING }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item :label="$t('goods._17')"
                        prop="SNvalue"
                        v-if="groupIndex == 0 || groupIndex == 9">
            <div style="display: flex;">
              <el-input v-model="formDate.SNvalue"
                        style="width: 100%;"
                        :placeholder="$t('goods._18')"></el-input>
              <el-upload ref="upload"
                         style="display: flex;"
                         class="upload-demo"
                         :headers="handleUploadHeader()"
                         :action="upload_url"
                         :on-success="handleAvatarSuccess"
                         :auto-upload="false"
                         multiple
                         :limit="1"
                         :on-exceed="handleExceed"
                         :before-upload="beforeUpload"
                         :data="formDate"
                         :on-remove="handleRemove"
                         :on-change="beforeUp"
                         accept="txt">
                <el-button icon="el-icon-more-outline"></el-button>
              </el-upload>
            </div>
          </el-form-item>
          <el-form-item :label="$t('goods._19')"
                        v-if="groupIndex == 1 || groupIndex == 6"
                        prop="DataInputValue">
            <el-input v-model="formDate.DataInputValue"
                      style="width: 100%;"
                      :placeholder="$t('goods._20')"></el-input>
          </el-form-item>
          <el-form-item :label="$t('goods._21')"
                        class="form-item"
                        v-if="groupIndex == 1 || groupIndex == 6"
                        prop="beginning">
            <el-input ref="beginning"
                      v-model="formDate.BeginSpinValue"
                      type="number"
                      style="width: 100%;"
                      :placeholder="$t('goods._22')"></el-input>
            <el-input ref="until"
                      v-model="formDate.EndSpinValue"
                      type="number"
                      style="width: 100%;"
                      :placeholder="$t('goods._23')"></el-input>
            <el-input ref="serial"
                      v-model="formDate.SNRangerValue"
                      style="width: 100%;"
                      :placeholder="$t('goods._24')"></el-input>
          </el-form-item>
          <el-form-item :label="$t('goods._25')"
                        v-if="groupIndex == 2"
                        prop="DataInputValue1">
            <el-input v-model="formDate.DataInputValue1"
                      style="width: 100%;"
                      :placeholder="$t('goods._26')"></el-input>
          </el-form-item>
          <el-form-item :label="$t('goods._27')"
                        v-if="groupIndex == 3"
                        prop="dataInputValue">
            <el-input v-model="formDate.dataInputValue"
                      style="width: 100%;"
                      :placeholder="$t('goods._28')"></el-input>
          </el-form-item>
          <el-form-item :label="$t('goods._29')"
                        v-if="groupIndex == 4"
                        prop="DataInputValue2">
            <el-input v-model="formDate.DataInputValue2"
                      style="width: 100%;"
                      :placeholder="$t('goods._30')"></el-input>
          </el-form-item>
          <el-form-item :label="$t('goods._31')"
                        v-if="groupIndex == 5"
                        prop="CompSNButtonValue">
            <div style="display: flex;">
              <el-input v-model="formDate.CompSNButtonValue"
                        style="width: 100%;"
                        :placeholder="$t('goods._32')"></el-input>
              <el-upload ref="reFpslc"
                         style="display: flex;"
                         class="upload-demo"
                         multiple
                         :headers="handleUploadHeader()"
                         :action="pslc_url"
                         :on-success="handleAvatarSuccess"
                         :limit="1"
                         :on-exceed="handleExceed"
                         :before-upload="beforeUpload"
                         accept="txt"
                         :auto-upload="false"
                         :data="formDate"
                         :on-remove="handleRemove"
                         :on-change="beforeUp">
                <el-button icon="el-icon-more-outline"></el-button>
              </el-upload>
            </div>
          </el-form-item>
          <el-form-item :label="$t('goods._19')"
                        v-if="groupIndex == 7"
                        prop="DataInputValue">
            <el-input v-model="formDate.DataInputValue"
                      style="width: 100%;"
                      :placeholder="$t('goods._20')"></el-input>
          </el-form-item>
          <el-form-item :label="$t('goods.docu._48')"
                        v-if="groupIndex == 7 || groupIndex == 8"
                        prop="OperationSiteID">
            <el-select v-model="formDate.OperationSiteID"
                       clearable
                       filterable
                       :placeholder="$t('goods._33')"
                       style="width:100%"
                       @change="OperatiChange">
              <el-option v-for="item in OperationSite"
                         :key="item.ID"
                         :label="item.OPERATION_SITE_NAME"
                         :value="item.ID" />
            </el-select>
          </el-form-item>
          <!-- OperationLine -->
          <el-form-item :label="$t('goods.docu._49')"
                        v-if="groupIndex == 9"
                        prop="OperationVale">

            <el-select v-model="formDate.OperationVale"
                       clearable
                       filterable
                       :placeholder="$t('goods._34')"
                       style="width:100%"
                       @change="ControlChange">
              <el-option v-for="item in OperationsList"
                         :key="item.ID"
                         :label="item.OPERATION_NAME"
                         :value="item.ID" />
            </el-select>
          </el-form-item>
        </el-form>
      </el-carousel-item>
      <el-carousel-item class="control">
        <el-form ref="business"
                 label-width="140px"
                 class="form">
          <el-form-item :label="$t('goods.docu._10')">
            <el-radio-group v-model="formDate.ActionRadioGroup"
                            class="group">
              <el-radio ref="ref"
                        v-for="(itme, index) in ControlAction"
                        :key="index"
                        :label="itme.LOOKUP_CODE"
                        :disabled="
                  itme.LOOKUP_CODE === 2
                    ? true
                    : false || itme.LOOKUP_CODE === 4
                    ? true
                    : false || itme.LOOKUP_CODE === 5
                    ? true
                    : false || itme.LOOKUP_CODE === 6
                    ? true
                    : false
                "
                        @change="businessClick(index, itme.MEANING)">{{ itme.MEANING }}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </el-carousel-item>
      <el-carousel-item class="control">
        <el-form ref="accessories"
                 label-width="140px"
                 class="form">
          <el-form-item :label="$t('goods._35')">
            <el-radio-group v-model="formDate.SubsidiaryRadioGroup"
                            class="group">
              <el-radio ref="ref"
                        v-for="(itme, index) in SubsidiaryCondition"
                        :key="index"
                        :label="itme.LOOKUP_CODE"
                        @change="accClick(index, itme.MEANING)">{{ itme.MEANING }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item :label="$t('goods._36')"
                        v-if="accIndex == 1 || accIndex == 2 || accIndex == 3">
            <el-date-picker style="width: 100%;"
                            v-model="formDate.BeginDate"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            type="datetime"
                            :placeholder="$t('goods.docu._3')"></el-date-picker>
          </el-form-item>
          <el-form-item :label="$t('goods._37')"
                        v-if="accIndex == 1 || accIndex == 2 || accIndex == 3">
            <el-date-picker style="width: 100%;"
                            v-model="formDate.EndDate"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            type="datetime"
                            :placeholder="$t('goods.docu._4')"></el-date-picker>
          </el-form-item>
          <el-form-item :label="$t('goods._38')"
                        v-if="accIndex == 4">
            <el-input v-model="formDate.InventoryVale"
                      style="width: 100%;"
                      :placeholder="$t('goods._39')"></el-input>
          </el-form-item>
        </el-form>
      </el-carousel-item>
      <el-carousel-item class="control">
        <el-form ref="lock"
                 :model="lock"
                 label-width="140px"
                 class="form">
          <el-form-item :label="$t('goods.docu._18')"
                        style="height: 230px">
            <el-input type="textarea"
                      v-model="formDate.HoldCause"
                      :autosize="{ minRows: 10, maxRows: 4 }"></el-input>
          </el-form-item>
          <el-button v-if="$btnList.indexOf('ProcessSingleMultiRuncardSave') !== -1"
                     style="width: 100%;font-weight: 600;color: red;"
                     @click="lockSave">{{$t('goods._55')}}</el-button>
        </el-form>
      </el-carousel-item>
    </el-carousel>
    <div style="display: flex;justify-content: space-between;">
      <div class="prev carousel-click"
           @click="prev">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="next carousel-click"
           @click="next">
        <i class="el-icon-arrow-right"></i>
      </div>
    </div>
  </div>
</template>
<script>
import helper from '@/api/SfcsUnLockProduct/SfcsLockProduct.js'
import { mapGetters } from 'vuex'
const API = helper('SfcsLockProduct')
export default {
  data () {
    var checkOvertime = (rule, value, callback) => {
      let beginning = this.$refs.beginning.value
      let until = this.$refs.until.value
      let serial = this.$refs.serial.value
      console.log(value, until, serial)
      if (beginning && until && serial) {
        callback()
      } else {
        if (!beginning) {
          callback(new Error(this.$t('goods._22')))
        }
        if (!until) {
          callback(new Error(this.$t('goods._23')))
        }
        if (!serial) {
          callback(new Error(this.$t('goods._24')))
        }
      }
    }
    return {
      upload_url:
        process.env.VUE_APP_API +
        'SfcsLockProduct/ProcessSingleOrMultiRuncardSave',
      pslc_url:
        process.env.VUE_APP_API +
        'SfcsLockProduct/ProcessSingleOrMultiComponentSave',
      ControlAction: [],
      MainCondition: [],
      SubsidiaryCondition: [],
      SubCondition: [],
      OperationLine: [],
      OperationSite: [],
      consIndex: 1,
      groupIndex: -1,
      formDate: {
        MainConditionRadioGroup: '', // 主管控条件
        SubsidiaryRadioGroup: '', // 辅助条件
        ActionRadioGroup: '', // 管控业务
        SNvalue: '', // 产品流水号
        BeginDate: '', // 开始时间
        EndDate: '', // 结束时间
        InventoryVale: '', // 库别
        OperationVale: '', // 管控工序
        HoldCause: '', // 锁定原因
        UserName: '', // 操作员(用户ID)
        DataInputValue: '', // 料号
        SNRangerValue: '', // 位序号
        BeginSpinValue: '', // 开始于
        EndSpinValue: '', // 结束于
        CompSNButtonValue: '', // 产品零件序号
        OperationSiteName: '', // 管控站点名字
        OperationSiteID: '', // 管控站点ID
        DataInputValue1: '',
        DataInputValue2: ''
      },
      disabled: true,
      contText: '',
      condiVal: {
        MainConditionRadioGroup: [
          {
            required: true,
            message: this.$t('goods._40'),
            trigger: 'change'
          }
        ],
        SNvalue: [
          {
            required: true,
            message: this.$t('goods._18'),
            trigger: 'blur'
          }
        ],
        DataInputValue1: [
          {
            required: true,
            message: this.$t('goods._26'),
            trigger: 'blur'
          }
        ],
        dataInputValue: [
          {
            required: true,
            message: this.$t('goods._28'),
            trigger: 'blur'
          }
        ],
        DataInputValue2: [
          {
            required: true,
            message: this.$t('goods._30'),
            trigger: 'blur'
          }
        ],
        CompSNButtonValue: [
          {
            required: true,
            message: this.$t('goods._32'),
            trigger: 'blur'
          }
        ],
        DataInputValue: [
          {
            required: true,
            message: this.$t('goods._20'),
            trigger: 'blur'
          }
        ],
        OperationSiteID: [
          {
            required: true,
            message: this.$t('goods._33'),
            trigger: 'change'
          }
        ],
        OperationVale: [
          {
            required: true,
            message: this.$t('goods._34'),
            trigger: 'change'
          }
        ],
        beginning: [
          { required: true, validator: checkOvertime, trigger: 'blur' }
        ]
      },
      businessIndex: 0,
      busText: '',
      controText: '',
      operatiext: '',
      accIndex: 0,
      accText: '',
      lock: {
        desc: ''
      },
      annal: [],
      flieSub: false,
      OperationsList: []
    }
  },
  computed: {
    ...mapGetters(['userinfo'])
  },
  created () {
    this.formDate.UserName = this.userinfo.USER_NAME
    this.getIndex()
  },
  methods: {
    // 获取下拉列表
    async getIndex () {
      const res = await API.Index()
      if (res.Result) {
        console.log(res.Result)
        this.ControlAction = res.Result.ControlAction
        this.MainCondition = res.Result.MainCondition
        this.SubsidiaryCondition = res.Result.SubsidiaryCondition
        this.SubCondition = res.Result.SubCondition
        this.OperationLine = res.Result.OperationLine
        this.OperationSite = res.Result.OperationSite
        this.OperationsList = res.Result.OperationsList
      }
    },
    beforeUpload (file) {
      console.log(file)
      var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
      const extension = testmsg === 'txt'
      if (!extension) {
        this.$message({
          message: 'goods._56',
          type: 'warning'
        })
      }
      return extension
    },
    handleExceed (files, fileList) {
      this.$message.warning(this.$t('goods._41'))
    },
    handleRemove () {
      this.flieSub = false
      this.formDate.SNvalue = ''
    },
    handleAvatarSuccess (res) {
      let data = res.Result
      if (res.ErrorInfo.Status === true) {
        this.$message.error(res.ErrorInfo.Message)
        if (this.groupIndex === 5) {
          this.$refs.reFpslc.clearFiles()
        } else {
          this.$refs.upload.clearFiles()
        }
      } else {
        if (data) {
          this.$notify({
            title: this.$t('goods._1'),
            message: this.$t('goods._15'),
            type: 'success',
            duration: 2000
          })
          var SNval = data.SNList + '>' + this.$t('goods._15')
          var lockTxt = this.$t('goods.docu._18') + ':' + this.formDate.HoldCause
          var BillNum = this.$t('goods.docu._7') + ':' + data.BillNumber
          this.annal.push(SNval, lockTxt, BillNum)
          this.$emit('event1', this.annal)
          this.empty()
          this.$refs.carousel.setActiveItem(0)
        } else {
          this.annal.push(res.message)
          this.$emit('event1', this.annal)
        }
        if (this.groupIndex === 5) {
          this.$refs.reFpslc.clearFiles()
        } else {
          this.$refs.upload.clearFiles()
        }
      }
    },
    beforeUp (file) {
      console.log(file)
      this.flieSub = true
      if (this.groupIndex === 0 || this.groupIndex === 9) {
        this.formDate.SNvalue = file.name
      } else {
        this.formDate.CompSNButtonValue = file.name
      }
    },
    // 产品零件序号上传文件
    handreFpslcSuccess (res) {
      let data = res.Result
      if (res.ErrorInfo.Status === true) {
        this.$message.error(res.ErrorInfo.Message)
        this.$refs.reFpslc.clearFiles()
      } else {
        if (data) {
          console.log(res.ErrorInfo.Status)
        }
      }
    },
    carlClick (e) {
      this.consIndex = e + 1
    },
    // 主管控项目选择
    groupClick (e, v) {
      this.groupIndex = e
      console.log(e, v)
      this.contText = this.$t('goods.docu._8') + ':' + v
    },
    // 管控业务选择
    businessClick (e, v) {
      this.businessIndex = e
      console.log(e, v)
      this.busText = this.$t('goods.docu._10') + ':' + v
    },
    // 管控工序选择
    ControlChange (e) {
      this.OperationLine.map(res => {
        if (res.ID === e) {
          console.log(res.OPERATION_LINE_NAME)
          this.controText = res.OPERATION_LINE_NAME
        }
      })
    },
    // 管控站点选择
    OperatiChange (e) {
      this.OperationSite.map(res => {
        if (res.ID === e) {
          console.log(res.OPERATION_SITE_NAME)
          this.operatiext = res.OPERATION_SITE_NAME
        }
      })
    },
    // 辅料条件选择
    accClick (e, v) {
      console.log(e)
      this.accIndex = e + 1
      console.log(this.accIndex)
      this.accText = this.$t('goods._42') + v
    },
    // 左
    prev () {
      this.$refs.carousel.prev()
    },
    // 右
    next () {
      console.log(this.formDate)
      if (this.consIndex === 1) {
        var serial = ''
        var seri = ''
        var mnu = ''
        var vali = true
        this.$refs.formDate.validate(async (valid, errInfo) => {
          vali = valid
          if (!valid) {
            try {
              Object.keys(errInfo).forEach(item => {
                this.$message.error(errInfo[item][0].message)
                throw new Error(new Date().toLocaleString())
              })
            } catch { }
          }
        })
        if (!vali) return

        if (this.groupIndex === 0) {
          serial = this.$t('goods._17') + ':' + this.formDate.SNvalue
        }
        if (this.groupIndex === 1 || this.groupIndex === 6) {
          console.log(this.groupIndex)
          var str =
            this.formDate.EndSpinValue - this.formDate.BeginSpinValue + 1
          console.log(str, 'str')
          console.log(this.formDate.SNRangerValue.toString().length)
          if (this.formDate.SNRangerValue.toString().length !== str) {
            this.$message.error(this.$t('goods._43'))
            return
          }
          seri = this.$t('goods._19') + ':' + this.formDate.DataInputValue
          mnu =
            this.$t('goods._44') +
            this.formDate.BeginSpinValue +
            this.$t('goods._45') +
            this.formDate.EndSpinValue +
            this.$t('goods._46') +
            this.formDate.SNRangerValue
        }
        if (this.groupIndex === 2) {
          this.formDate.DataInputValue = this.formDate.DataInputValue1
          serial = this.$t('goods._25') + ':' + this.formDate.DataInputValue
        }
        if (this.groupIndex === 3) {
          serial = this.$t('goods._27') + ':' + this.formDate.dataInputValue
        }
        if (this.groupIndex === 4) {
          this.formDate.DataInputValue = this.formDate.DataInputValue2
          serial = this.$t('goods._29') + ':' + this.formDate.DataInputValue
        }
        if (this.groupIndex === 5) {
          serial = this.$t('goods._31') + ':' + this.formDate.CompSNButtonValue
        }
        if (this.groupIndex === 7) {
          serial = this.$t('goods._19') + ':' + this.formDate.DataInputValue
          serial = this.$t('goods.docu._48') + ':' + this.operatiext
        }
        if (this.groupIndex === 8) {
          serial = this.$t('goods.docu._48') + ':' + this.operatiext
        }
        if (this.groupIndex === 9) {
          serial = this.$t('goods._17') + ':' + this.formDate.SNvalue
          serial = this.$t('goods.docu._49') + ':' + this.controText
        }
        this.annal.push(this.contText, serial, seri, mnu)
        this.$emit('event1', this.annal)
      }
      if (this.consIndex === 2) {
        if (this.formDate.ActionRadioGroup === '') {
          this.$message.error(this.$t('goods._47'))
          return
        }

        if (this.businessIndex === 3) {
          if (this.groupIndex !== 4 && this.groupIndex !== 5) {
            this.formDate.ActionRadioGroup = ''
            this.$message.error(this.$t('goods._48'))
            return
          }
        }
        if (this.businessIndex !== 0) {
          if (this.groupIndex === 9) {
            this.formDate.ActionRadioGroup = ''
            this.$message.error(this.$t('goods._49'))
            return
          }
        }

        this.annal.push(this.busText)
        this.$emit('event1', this.annal)
      }
      if (this.consIndex === 3) {
        if (this.formDate.SubsidiaryRadioGroup === '') {
          this.$message.error(this.$t('goods._50'))
          return
        }
        var seria = ''
        var ser = ''
        if (this.accIndex === 1 || this.accIndex === 2 || this.accIndex === 3) {
          if (
            this.formDate.BeginDate === '') {
            this.$message.error(this.$t('goods._51'))
            return
          }
          if (this.formDate.EndDate === '') {
            this.$message.error(this.$t('goods._52'))
            return
          }
          seria = this.$t('goods._36') + ':' + this.formDate.BeginDate
          ser = this.$t('goods._37') + ':' + this.formDate.EndDate
          if (
            this.formDate.EndDate.toString() <=
            this.formDate.BeginDate.toString()

          ) {
            this.$message.error(this.$t('goods._53'))
            return
          }
        }
        if (this.accIndex === 4) {
          if (
            this.formDate.InventoryVale === '' ||
            this.formDate.InventoryVale === ''
          ) {
            this.$message.error(this.$t('goods._39'))
            return
          }
          seria = this.$t('goods._38') + ':' + this.formDate.InventoryVale
        }
        this.annal.push(this.accText, seria, ser)
        this.$emit('event1', this.annal)
      }
      this.$refs.carousel.next()
    },
    // 保存
    lockSave () {
      if (this.formDate.HoldCause === '') {
        this.$message.error(this.$t('goods._54'))
      } else {
        if (this.flieSub) {
          this.formDate.CompSNButtonValue = ''
          if (this.groupIndex === 5) {
            this.$refs.reFpslc.submit()
          } else {
            this.formDate.SNvalue = ''
            this.$refs.upload.submit()
          }
        } else {
          if (this.groupIndex === 0 || this.groupIndex === 9) {
            API.ProcessSingleOrMultiRuncardSave(this.formDate).then(res => {
              if (res.Result) {
                this.$notify({
                  title: this.$t('goods._1'),
                  message: this.$t('goods._15'),
                  type: 'success',
                  duration: 2000
                })
                var SNval = res.Result.SNList + '>' + this.$t('goods._15')
                var lockTxt = this.$t('goods.docu._18') + ':' + this.formDate.HoldCause
                var BillNum = this.$t('goods.docu._7') + ':' + res.Result.BillNumber
                this.annal.push(SNval, lockTxt, BillNum)
                this.$emit('event1', this.annal)
                this.empty()
                this.$refs.carousel.setActiveItem(0)
              } else {
                this.annal.push(res.message)
                this.$emit('event1', this.annal)
              }
            })
          }
          if (this.groupIndex === 1 || this.groupIndex === 6) {
            API.ProcessDefineSerialNumberSave(this.formDate).then(res => {
              if (res.Result) {
                this.$notify({
                  title: this.$t('goods._1'),
                  message: this.$t('goods._15'),
                  type: 'success',
                  duration: 2000
                })
                var SNval = res.Result.SNList + '>' + this.$t('goods._15')
                var lockTxt = this.$t('goods.docu._18') + ':' + this.formDate.HoldCause
                var BillNum = this.$t('goods.docu._7') + ':' + res.Result.BillNumber
                this.annal.push(SNval, lockTxt, BillNum)
                this.$emit('event1', this.annal)
                this.empty()
                this.$refs.carousel.setActiveItem(0)
              } else {
                this.annal.push(res.message)
                this.$emit('event1', this.annal)
              }
            })
          }
          if (this.groupIndex === 2 || this.groupIndex === 3 || this.groupIndex === 4) {
            API.ProcessInputDataSave(this.formDate).then(res => {
              if (res.Result) {
                this.$notify({
                  title: this.$t('goods._1'),
                  message: this.$t('goods._15'),
                  type: 'success',
                  duration: 2000
                })
                var SNval = res.Result.SNList + '>' + this.$t('goods._15')
                var lockTxt = this.$t('goods.docu._18') + ':' + this.formDate.HoldCause
                var BillNum = this.$t('goods.docu._7') + ':' + res.Result.BillNumber
                this.annal.push(SNval, lockTxt, BillNum)
                this.$emit('event1', this.annal)
                this.empty()
                this.$refs.carousel.setActiveItem(0)
              } else {
                this.annal.push(res.message)
                this.$emit('event1', this.annal)
              }
            })
          }
          if (this.groupIndex === 5) {
            API.ProcessSingleOrMultiComponentSave(this.formDate).then(res => {
              if (res.Result) {
                this.$notify({
                  title: this.$t('goods._1'),
                  message: this.$t('goods._15'),
                  type: 'success',
                  duration: 2000
                })
                var SNval = res.Result.SNList + '>' + this.$t('goods._15')
                var lockTxt = this.$t('goods.docu._18') + ':' + this.formDate.HoldCause
                var BillNum = this.$t('goods.docu._7') + ':' + res.Result.BillNumber
                this.annal.push(SNval, lockTxt, BillNum)
                this.$emit('event1', this.annal)
                this.empty()
                this.$refs.carousel.setActiveItem(0)
              }
            })
          }
          if (this.groupIndex === 7 || this.groupIndex === 8) {
            API.ProcessProductOperationSiteSave(this.formDate).then(res => {
              if (res.Result) {
                this.$notify({
                  title: this.$t('goods._1'),
                  message: this.$t('goods._15'),
                  type: 'success',
                  duration: 2000
                })
                var SNval = res.Result.SNList + '>' + this.$t('goods._15')
                var lockTxt = this.$t('goods.docu._18') + ':' + this.formDate.HoldCause
                var BillNum = this.$t('goods.docu._7') + ':' + res.Result.BillNumber
                this.annal.push(SNval, lockTxt, BillNum)
                this.$emit('event1', this.annal)
                this.empty()
                this.$refs.carousel.setActiveItem(0)
              } else {
                this.annal.push(res.message)
                this.$emit('event1', this.annal)
              }
            })
          }
        }
      }
    },
    empty () {
      this.formDate = {
        MainConditionRadioGroup: '', // 主管控条件
        SubsidiaryRadioGroup: '', // 辅助条件
        ActionRadioGroup: '', // 管控业务
        SNvalue: '', // 产品流水号
        BeginDate: '', // 开始时间
        EndDate: '', // 结束时间
        InventoryVale: '', // 库别
        OperationVale: '', // 管控工序
        HoldCause: '', // 锁定原因
        UserName: this.userinfo.USER_NAME, // 操作员(用户ID)
        DataInputValue: '', // 料号
        SNRangerValue: '', // 位序号
        BeginSpinValue: '', // 开始于
        EndSpinValue: '', // 结束于
        CompSNButtonValue: '', // 产品零件序号
        OperationSiteName: '', // 管控站点名字
        OperationSiteID: '' // 管控站点ID
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.locking {
  .step {
    font-size: 14px;
    color: #606266;
    padding-left: 20px;
    border: 1px solid #dfe1e8;
    width: max-content;
    padding-right: 20px;
  }

  .locking-title {
    font-size: 14px;
    color: #606266;
    padding: 2px 20px;
    background: #dfe1e8;
  }
  .control {
    display: flex;
    align-items: center;
    .control-title {
      padding-left: 20px;
      width: 215px;
      height: 100%;
      display: flex;
      align-items: center;
      background: #dfe1e8;
      text-align: center;
    }
    .form {
      width: 100%;
      height: 100%;
      padding-top: 20px;
    }
  }
  .carousel-click {
    width: 49%;
    font-size: 20px;
    color: red;
    font-weight: 600;
    background: #dfe1e8;
    text-align: center;
  }
}
</style>
<style>
.locking .el-carousel__indicators--outside {
  display: none;
}
.locking .el-carousel__arrow {
  display: none;
}
.control .group .el-radio {
  width: 40%;
  margin-bottom: 20px;
}
.locking .el-carousel__arrow--left {
  left: 0;
}
.locking .el-carousel__arrow--right {
  right: 0;
}
.locking .el-icon-arrow-left,
.locking .el-icon-arrow-right {
  font-size: 20px;
  color: red;
  font-weight: 600;
}
.form .form-item .el-form-item__content {
  display: flex;
}
.textarea {
  height: 100%;
}
</style>
