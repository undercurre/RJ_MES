<template>
  <d2-container class="MSDControlOperations">
    <el-form label-position="left"
             label-width="140px">
      <el-form-item :label="$t('MSDControlOperations._1')">
        <div style="display: flex;">
          <el-input v-model="SubmitForm.ReelCode"
                    :placeholder="$t('MSDControlOperations._2')"
                    clearable
                    @change="WOClick" />
          <el-button type="danger"
                     icon="el-icon-delete"
                     @click.prevent="eliminateClick">{{ $t("ukas._5") }}</el-button>
        </div>
      </el-form-item>
    </el-form>
    <el-row :gutter="24">
      <el-col :span="12">
        <el-form ref="InfoForm"
                 label-position="left"
                 :model="InfoForm"
                 label-width="140px">
          <el-form-item :label="$t('MSDControlOperations._3')"
                        style="background: #f8f8f9;"></el-form-item>
          <el-form-item :label="$t('MSDControlOperations._4')">
            <el-input v-model="InfoForm.ReelPartNO"
                      disabled></el-input>
          </el-form-item>
          <el-form-item :label="$t('MSDControlOperations._5')">
            <el-input v-model="InfoForm.PartThickness"
                      disabled></el-input>
          </el-form-item>
          <el-form-item :label="$t('MSDControlOperations._6')">
            <el-input v-model="InfoForm.PartLevelCode"
                      disabled></el-input>
          </el-form-item>
          <el-form-item :label="$t('MSDControlOperations._7')">
            <el-select v-model="InfoForm.CurrentAction"
                       style="width:100%"
                       placeholder=""
                       disabled>
              <el-option v-for="item in MSDAction"
                         :key="item.CODE"
                         :label="item.MSG_CN_DESC"
                         :value="item.CODE" />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('MSDControlOperations._8')">
            <el-input v-model="InfoForm.BeginTime"
                      disabled></el-input>
          </el-form-item>
          <el-form-item :label="$t('MSDControlOperations._9')">
            <el-input v-model="InfoForm.PassedTime"
                      disabled></el-input>
          </el-form-item>
          <el-form-item :label="$t('MSDControlOperations._10')">
            <el-input v-model="InfoForm.RatedControlTime"
                      disabled></el-input>
          </el-form-item>
          <el-form-item :label="$t('MSDControlOperations._11')">
            <el-input v-model="InfoForm.TotalOpenTimeAfterBake"
                      disabled></el-input>
          </el-form-item>
          <el-form-item :label="$t('MSDControlOperations._12')">
            <!-- <el-input v-model="InfoForm.CurrentArea"
                      disabled></el-input> -->
            <el-select style="width:100%"
                       placeholder=" "
                       v-model="InfoForm.CurrentArea"
                       disabled>
              <el-option v-for="item in MSDLOCAL"
                         :key="item.CODE"
                         :label="item.DESCRIPTION"
                         :value="item.CODE" />
            </el-select>
          </el-form-item>
        </el-form>
        <div class="MSDControlOperations-InfoText">
          <div>
            <span>{{$t('MSDControlOperations._13')}}</span>
            <span>{{customer.CUSTOMER_NAME}}</span>
          </div>
          <div>
            <span>{{$t('MSDControlOperations._14')}}</span>
            <span>{{customer.CUSTOMER_CODE}}</span>
          </div>
          <div>
            <span>{{$t('MSDControlOperations._15')}}</span>
            <span>{{customer.VENDOR_CODE}}</span>
          </div>
          <div>
            <span>{{$t('MSDControlOperations._16')}}</span>
            <span>{{customer.VENDOR_NAME}}</span>
          </div>
          <div>
            <span>{{$t('MSDControlOperations._17')}}</span>
            <span>{{customer.BU}}</span>
          </div>
          <div>
            <span>{{$t('MSDControlOperations._18')}}</span>
            <span>{{customer.PART_NO}}</span>
          </div>
          <div>
            <span>{{$t('MSDControlOperations._19')}}</span>
            <span>{{customer.PART_DESC}}</span>
          </div>
          <div>
            <span>{{$t('MSDControlOperations._20')}}</span>
            <span>{{customer.ORIGINAL_QUANTITY}}</span>
          </div>
          <div>
            <span>BCD_KIT</span>
            <span>{{customer.BCD_KIT}}</span>
          </div>
          <div>
            <span>{{$t('MSDControlOperations._21')}}</span>
            <span>{{customer.BCD_ID}}</span>
          </div>
          <div>
            <span>{{$t('MSDControlOperations._22')}}</span>
            <span>{{customer.DATE_CODE}}</span>
          </div>
          <div>
            <span>{{$t('MSDControlOperations._23')}}</span>
            <span>{{customer.REEL_STATUS}}</span>
          </div>
          <div>
            <span>{{$t('MSDControlOperations._24')}}</span>
            <span>{{customer.LOT_CODE }}</span>
          </div>
          <div>
            <span>{{$t('MSDControlOperations._25')}}</span>
            <span>{{customer.QVL_DESC}}</span>
          </div>
          <div>
            <span>{{$t('MSDControlOperations._26')}}</span>
            <span>{{customer.REVISION}}</span>
          </div>
          <div>
            <span>{{$t('MSDControlOperations._27')}}</span>
            <span>{{customer.ORIGINAL_REEL_CODE}}</span>
          </div>
          <div>
            <span>{{$t('MSDControlOperations._28')}}</span>
            <span>{{customer.MAKER_CODE}}</span>
          </div>
          <div>
            <span>{{$t('MSDControlOperations._29')}}</span>
            <span>{{customer.MAKER_NAME}}</span>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <el-form ref="OperaForm"
                 label-position="top"
                 :model="SubmitForm">

          <el-form-item style="background: #f8f8f9;color: #606266;">{{$t('MSDControlOperations._30')}}</el-form-item>
          <el-form-item :label="$t('MSDControlOperations._32')">
            <el-select v-model="SubmitForm.ActionArea"
                       style="width:100%"
                       :placeholder="$t('MSDControlOperations._33')"
                       @change="actionChenge">
              <el-option v-for="item in MSDLOCAL"
                         :key="item.ID"
                         :label="item.DESCRIPTION"
                         :value="item.ID" />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('MSDControlOperations._34')">
            <el-select v-model="SubmitForm.NewAction"
                       :disabled="MsdactionShow"
                       style="width:100%"
                       :placeholder="$t('MSDControlOperations._35')"
                       :visible-change="true"
                       @change="MsdactionChenge">
              <el-option v-for="item in MSDAction"
                         :key="item.CODE"
                         :label="item.MSG_CN_DESC"
                         :value="item.CODE"
                         :disabled="InfoForm.CurrentAction !== 100&& item.CODE===103 || InfoForm.CurrentAction === 102 && item.CODE===101" />
            </el-select>
          </el-form-item>
          <el-form-item v-if="ShowBake"
                        class="form-itme-table">
            <vxe-table ref="xTable"
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
                       stripe
                       :data="bakeTable"
                       :mouse-config="{selected: true}"
                       :radio-config="{labelField: 'name', trigger: 'row'}"
                       @cell-click="bakeCell">
              <vxe-table-column show-overflow
                                :title="$t('MSDControlOperations._36')"
                                type="radio"
                                width="80"
                                align="center" />
              <vxe-table-column field="BAKE_TEMPERATURE"
                                :title="$t('MSDControlOperations._37')"
                                :edit-render="{name: '$input', props: {readonly: true}}" />
              <vxe-table-column field="BAKE_HUMIDITY"
                                :title="$t('MSDControlOperations._38')"
                                :edit-render="{name: '$input', props: {readonly: true}}" />
              <vxe-table-column field="BAKE_TIME"
                                :title="$t('MSDControlOperations._39')"
                                :edit-render="{name: '$input', props: {readonly: true}}" />
            </vxe-table>
          </el-form-item>
          <el-form-item>
            <el-button style="width:100%;color:red;"
                       @click="determine">{{$t('MSDControlOperations._40')}}</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </d2-container>
</template>
<script>
import {
  Index,
  GetMSDInfo,
  MsdActionLookUpChanged,
  TakeAction
} from '@/api/MSDControlOperations'
import { mapGetters } from 'vuex'
export default {
  name: 'MSDControlOperations',
  data () {
    return {
      MSDArea: [],
      MSDLOCAL: [],
      MSDAction: [],
      // 執行動作 传如下参数 ActionArea(作业区域传ID) ActionAreaType(作业区域传CODE) NewAction(执行动作CODE) MSDBakeRuleID(烘烤标准ID) ReelCode(料卷编号) UserName(用户名字
      SubmitForm: {
        ReelCode: '', // 料卷编号
        ActionArea: '', // 作业区域传ID
        ActionAreaType: '', // 作业区域传CODE
        NewAction: '', // 执行动作CODE
        MSDBakeRuleID: '', // 烘烤标准ID
        UserName: '' // 用户名字
      },
      InfoForm: {},
      customer: {},
      OperaForm: {
        name: ''
      },
      MsdactionShow: true,
      changeForm: {
        newActionID: '',
        partThickness: '', // 元件厚度
        partLevelCode: '', // 元件等級
        reelCode: '' // 料卷条码
      },
      ShowBake: false,
      bakeTable: []
    }
  },
  computed: {
    ...mapGetters(['userinfo'])
  },
  created () {
    this.getIndex()
    this.SubmitForm.UserName = this.userinfo.USER_NAME
  },
  methods: {
    async getIndex () {
      const res = await Index()
      if (res.Result) {
        const data = res.Result
        this.MSDLOCAL = data.MSDLOCAL
        this.MSDAction = data.MSDAction
        this.MSDArea = data.MSDArea

        console.log(data, 'datadatadata')
      }
    },
    async WOClick () {
      console.log(this.SubmitForm.WO, 'this.SubmitForm.WO')
      const res = await GetMSDInfo(this.SubmitForm.ReelCode)
      console.log(res.Result, 'res.Result')
      if (res.Result) {
        if (res.Result[0]) {
          this.customer = res.Result[0]
        }
        if (res.Result[1]) {
          this.InfoForm = res.Result[1]
          this.InfoForm.CurrentAction = res.Result[1].CurrentAction ? res.Result[1].CurrentAction : ''
        }

        this.MsdactionShow = false
      } else {
        this.MsdactionShow = true
        this.SubmitForm.ReelCode = ''
        this.SubmitForm.NewAction = ''
      }
    },
    // 选择执行动作
    async MsdactionChenge (id) {
      this.ShowBake = true
      this.changeForm.newActionID = id
      this.changeForm.partThickness = this.InfoForm.PartThickness// 元件厚度
      this.changeForm.partLevelCode = this.InfoForm.PartLevelCode // 元件等級
      this.changeForm.reelCode = this.SubmitForm.ReelCode// 料卷条码
      const res = await MsdActionLookUpChanged(this.changeForm)
      if (res.Result) {
        this.bakeTable = res.Result
        this.ShowBake = true
      }
      if (res.Result == null) {
        this.ShowBake = false
        this.bakeTable = []
        this.SubmitForm.MSDBakeRuleID = ''
      } else {
        this.ShowBake = true
        this.bakeTable = res.Result
      }
    },
    actionChenge (e) {
      this.MSDLOCAL.map(res => {
        if (res.ID === e) {
          this.SubmitForm.ActionAreaType = res.CODE
        }
      })
    },
    // 选择烘烤
    bakeCell (e) {
      console.log(e, 'eeeeee')
      this.SubmitForm.MSDBakeRuleID = e.row.ID
    },
    // 确定
    async determine () {
      if (!this.SubmitForm.ReelCode) {
        this.$message({
          showClose: true,
          message: this.$t('MSDControlOperations._2'),
          type: 'warning'
        })
        return false
      }
      if (!this.SubmitForm.ActionArea) {
        this.$message({
          showClose: true,
          message: this.$t('MSDControlOperations._33'),
          type: 'warning'
        })
        return false
      }
      if (!this.SubmitForm.NewAction) {
        this.$message({
          showClose: true,
          message: this.$t('MSDControlOperations._35'),
          type: 'warning'
        })
        return false
      }
      if (!this.SubmitForm.MSDBakeRuleID && this.ShowBake) {
        this.$message({
          showClose: true,
          message: this.$t('MSDControlOperations._41'),
          type: 'warning'
        })
        return false
      }
      const res = await TakeAction(this.SubmitForm)
      if (res.Result) {
        this.$notify({
          title: this.$t('MSDControlOperations._42'),
          message: this.$t('MSDControlOperations._43'),
          type: 'success',
          duration: 2000
        })
        this.eliminateClick()
      }
      console.log(this.SubmitForm, 'SubmitForm')
    },
    eliminateClick () {
      this.SubmitForm = {
        ReelCode: '', // 料卷编号
        ActionArea: '', // 作业区域传ID
        ActionAreaType: '', // 作业区域传CODE
        NewAction: '', // 执行动作CODE
        MSDBakeRuleID: '' // 烘烤标准ID
      }
      this.ShowBake = false
      this.bakeTable = []
      this.InfoForm = {}
      this.customer = {}
      this.MsdactionShow = true
    }
  }
}
</script>
<style lang="scss" scoped>
.MSDControlOperations-InfoText {
  overflow: auto;
  font-size: 14px;
  border-top: 1px solid #e8eaec;
  border-right: 1px solid #e8eaec;
  border-bottom: 1px solid #e8eaec;
  height: calc(100vh - 310px - 21px - 23px - 73px - 41px - 31px - 107px);
}
.MSDControlOperations-InfoText div {
  display: flex;
  justify-content: space-between;
  color: #606266;
  border: 1px solid #e8eaec;
  border-top: none !important;
}
.MSDControlOperations-InfoText div span {
  width: 50%;
  display: inline-block;
  padding: 5px;
}
.MSDControlOperations-InfoText div span:first-child {
  background: #f8f8f9;
}
.MSDControlOperations-InfoText div:hover {
  color: #333333;
}
.form-itme-table {
  height: calc(100vh - 134px - 21px - 23px - 73px - 41px - 31px - 107px);
}
</style>
<style>
.form-itme-table .el-form-item__content {
  height: 100%;
}
</style>
