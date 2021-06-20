<template>
  <customContainer>
    <!-- 头部 -->
    <!-- <template slot="header">
      <custom-container-header
        :isExport="false"
        :isExportTpl="false"
        :isImport="false"
      >
        <el-button type="danger" icon="el-icon-delete" @click="cleanClick">{{
          $t("publics.btn.clear")
        }}</el-button>
        <el-button
          type="success"
          icon="el-icon-check"
          @click="saveClick"
          v-if="$btnList.indexOf('SfcsReworkSave') !== -1"
          >{{ $t("publics.btn.save") }}</el-button
        >
      </custom-container-header>
    </template> -->
    <!-- 上表 -->
    <el-row :gutter="20"
            style="height: 35%">
      <!-- 左上角 -->
      <el-col :span="10">
        <el-card shadow="always">
          <div slot="header"
               class="clearfix">
            <span>{{ $t("SfcsRework._9") }}</span>
          </div>
          <el-form style="height: 180px"
                   ref="rightTopForm"
                   :model="leftTopForm"
                   status-icon
                   :show-message="false"
                   label-width="60px">
            <el-form-item :label="$t('SfcsRework._10') + '：'">
              <el-input v-model="rightTopForm.MODEL"
                        disabled />
            </el-form-item>
            <el-form-item :label="$t('SfcsRework._11') + '：'">
              <el-input v-model="rightTopForm.PART_NO"
                        disabled />
            </el-form-item>
            <el-form-item :label="$t('SfcsRework._12') + '：'">
              <el-input v-model="rightTopForm.WO_NO"
                        disabled />
            </el-form-item>
            <el-form-item :label="$t('SfcsRework._13') + '：'">
              <el-input v-model="rightTopForm.ROUTENAME"
                        disabled />
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
      <!-- 右上表 -->
      <el-col :span="14">
        <el-card shadow="always">
          <div slot="header"
               class="clearfix">
            <span>{{ $t("SfcsRework._1") }}</span>
          </div>
          <el-form style="height: 180px"
                   ref="leftTopForm"
                   :model="leftTopForm"
                   status-icon
                   :show-message="false"
                   label-width="90px">
            <el-form-item :label="$t('SfcsRework._2') + '：'">
              <el-radio-group v-model="leftTopForm.RETYPE"
                              @change="changeRadio">
                <el-radio :disabled="isShow"
                          :label="0">{{
                  $t("SfcsRework._3")
                }}</el-radio>
                <el-radio :disabled="isShow"
                          :label="1">{{
                  $t("SfcsRework._4")
                }}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item :label="$t('SfcsRework._5') + '：'">
              <el-input v-model="leftTopForm.NEW_WORKNO"
                        :disabled="leftTopForm.RETYPE == 0 || isShow"
                        :placeholder="$t('SfcsRework._6')"
                        @input="changNEW_WORKNO"
                        @keyup.enter.native="addNew">
                <el-button v-show="leftTopForm.RETYPE != 0"
                           slot="append"
                           icon="el-icon-more"
                           @click="openDialogVisible"
                           :disabled="leftTopForm.RETYPE == 0 || isShow" />
              </el-input>
            </el-form-item>
            <el-form-item :label="$t('SfcsRework._7') + '：'">
              <el-input :disabled="isShow"
                        v-model="leftTopForm.SN"
                        @keyup.enter.native="addSN"
                        :placeholder="$t('SfcsRework._8')" />
            </el-form-item>
            <el-form-item style="float: right">
              <el-button type="danger"
                         icon="el-icon-delete"
                         @click="cleanClick">{{ $t("publics.btn.clear") }}</el-button>
              <el-button type="success"
                         icon="el-icon-check"
                         @click="saveClick"
                         v-if="$btnList.indexOf('SfcsReworkSave') !== -1">{{ $t("publics.btn.save") }}</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
    <!-- 下表 -->
    <el-row :gutter="20"
            style="height: 60%; margin-top: 20px">
      <el-col :span="6">
        <el-card shadow="always">
          <div slot="header">
            <span>{{ $t("SfcsRework._16") }}</span>
          </div>
          <div class="leftBottom">
            <span>{{ $t("SfcsRework._15") + "："
              }}{{ PrestoreData.ROUTENAME }}</span>
            <!-- eslint-disable-next-line vue/require-v-for-key -->
            <div v-show="!isShow"
                 v-for="(item, index) in ProcessList"
                 @click="changeLeftBottom(item.value, index)"
                 class="radioBox">
              <el-radio style="margin-bottom: 20px"
                        v-model="leftBottom.CHOOSEINDEX"
                        :label="item.value"
                        :disabled="disabledIndex <= index">{{ item.label }}</el-radio>
            </div>
            <!-- eslint-disable-next-line vue/require-v-for-key -->
            <div v-show="isShow"
                 v-for="item in ProcessList"
                 class="radioBox">
              <el-radio style="margin-bottom: 20px"
                        v-model="leftBottom.CHOOSEINDEX"
                        :label="item.value"
                        disabled>{{ item.label }}</el-radio>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <div v-show="!isShow"
             style="color: #fff">&nbsp;123</div>
        <el-card shadow="always"
                 v-show="isShow">
          <div slot="header">
            <span>{{ $t("SfcsRework._14") }}</span>
          </div>
          <div class="leftBottom">
            <span>{{ $t("SfcsRework._15") + "："
              }}{{ rightTopForm.ROUTENAME }}</span>
            <div v-for="(item, index) in OldProcessData"
                 :key="index"
                 @click="changeOldBottom(item.value, index)"
                 class="radioBox">
              <el-radio style="margin-bottom: 20px"
                        v-model="OldBottom.CHOOSEINDEX"
                        :label="item.value">{{ item.label }}</el-radio>
            </div>
          </div>
        </el-card>
      </el-col>
      <!-- <el-col :span="6" :style="isShow ? '' : 'float:right'"> -->
      <el-col :span="6">
        <el-card class="checkBottom">
          <el-checkbox style="display: block; margin-bottom: 20px"
                       v-model="submitForm.ISDELRESOURE">{{ $t("SfcsRework._17") }}</el-checkbox>
          <el-checkbox v-model="submitForm.ISDELUID">{{
            $t("SfcsRework._18")
          }}</el-checkbox>
        </el-card>
      </el-col>
      <!-- <el-col :span="18" id="bottomBox" >
        <el-card shadow="always">
          <div slot="header">
            <span>清除数据复选区</span>
            <el-button
              :disabled="!isShow"
              style="float: right;"
              type="primary"
              @click="nextClick"
            >下一张</el-button>
          </div>
          <el-row :gutter="10">
            <el-col :span="8" >
              <el-card shadow="always">
                <div slot="header">
                  <span>新产品制程区</span>
                </div>
                <div class="leftBottom">
                  <span>制程名称：{{PrestoreData.ROUTENAME}}</span>
                  <div
                    v-show="!isShow"
                    v-for="(item,index) in ProcessList"
                    :key="item.value"
                    @click="changeLeftBottom(item.value,index)"
                    class="radioBox"
                  >
                    <el-radio
                      style="margin-bottom:20px"
                      v-model="leftBottom.CHOOSEINDEX"
                      :label="item.value"
                      :disabled="index>disabledIndex"
                    >{{item.label}}</el-radio>
                  </div>
                  <div
                    v-show="isShow"
                    v-for="(item,index) in ProcessList"
                    :key="index"
                    class="radioBox"
                  >
                    <el-radio
                      style="margin-bottom:20px"
                      v-model="leftBottom.CHOOSEINDEX"
                      :label="item.value"
                      disabled
                    >{{item.label}}</el-radio>
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="always" v-show="isShow">
                <div slot="header">
                  <span>旧制程区（A返B 删除数据）</span>
                </div>
                <div class="leftBottom">
                  <span>制程名称：{{rightTopForm.ROUTENAME}}</span>
                  <div
                    v-for="(item,index) in OldProcessData"
                    :key="item.value"
                    @click="changeOldBottom(item.value,index)"
                    class="radioBox"
                  >
                    <el-radio
                      style="margin-bottom:20px"
                      v-model="OldBottom.CHOOSEINDEX"
                      :label="item.value"
                    >{{item.label}}</el-radio>
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="8" :style="isShow?'':'float:right'">
              <el-checkbox
                style="display: block;margin-bottom:20px"
                v-model="submitForm.ISDELRESOURE"
              >删除资源</el-checkbox>
              <el-checkbox v-model="submitForm.ISDELUID">删除UID</el-checkbox>
            </el-col>
          </el-row>
        </el-card>
      </el-col> -->
      <el-col :span="6">
        <el-tabs type="border-card"
                 class="bgc">
          <el-tab-pane :label="$t('SfcsRework._19')"
                       class="rightBottom">
            <div class="list"
                 v-for="(item, index) in detailList"
                 :key="index">
              {{ item }}
            </div>
          </el-tab-pane>
          <el-tab-pane :label="$t('SfcsRework._20')"
                       class="rightBottom">
            <div class="list"
                 v-for="(item, index) in historyList"
                 :key="index">
              {{ item }}
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
    <!-- 编辑 -->
    <el-dialog :close-on-click-modal="false"
               v-dialogDrag
               :title="$t('SfcsRework._21')"
               width="60%"
               :visible.sync="dialogVisible">
      <el-form ref="editForm"
               label-width="80px"
               :model="editForm">
        <el-form-item :label="$t('SfcsRework._22')">
          <el-input clearable
                    v-model="formData.Key"
                    style="width: 200px"
                    @keyup.enter.native="searchClick"
                    :placeholder="$t('SfcsRework._23')" />
          <el-button type="primary"
                     icon="el-icon-search"
                     @click.prevent="searchClick">{{ $t("publics.btn.search") }}</el-button>
        </el-form-item>
      </el-form>
      <div style="height: 500px; margin-bottom: 10px">
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
                   :loading="loading"
                   :data="mainTable"
                   :mouse-config="{ selected: true }"
                   :radio-config="{ labelField: 'name', trigger: 'row' }"
                   :edit-config="{ trigger: 'click', mode: 'row', showStatus: true }"
                   @cell-click="cellClick">
          <vxe-table-column type="radio"
                            width="60" />
          <vxe-table-column min-width="150"
                            field="WO_NO"
                            :title="$t('SfcsRework._24')"
                            :edit-render="{ name: '$input', props: { readonly: true } }" />
          <vxe-table-column min-width="150"
                            field="PART_NO"
                            :title="$t('SfcsRework._25')"
                            :edit-render="{ name: '$input', props: { readonly: true } }" />
          <vxe-table-column min-width="150"
                            field="INPUT_QTY"
                            :title="$t('SfcsRework._26')"
                            :edit-render="{ name: '$input', props: { readonly: true } }" />
          <vxe-table-column min-width="150"
                            field="OUTPUT_QTY"
                            :title="$t('SfcsRework._27')"
                            :edit-render="{ name: '$input', props: { readonly: true } }" />
        </vxe-table>
      </div>
      <el-pagination :current-page="formData.Page"
                     :page-size="formData.Limit"
                     :page-sizes="[15, 25, 35, 45]"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="totalPage"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange" />
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">{{
          $t("ssc_rd.cancel")
        }}</el-button>
        <el-button type="primary"
                   @click="addNew">{{
          $t("ssc_rd.sure")
        }}</el-button>
      </span>
    </el-dialog>
  </customContainer>
</template>

<script>
import customContainer from '@/components/custom-container'
// import customContainerHeader from '@/components/custom-container-header'
import { mapGetters } from 'vuex'
import {
  GetNewWorkNoData,
  GetNewReworkDataByNewNo,
  GetReworkDataBySN,
  SaveData
} from '@/api/SfcsRework'
export default {
  name: 'SfcsRework',
  components: {
    // customContainerHeader,
    customContainer
  },
  computed: {
    ...mapGetters(['userinfo'])
  },
  data () {
    return {
      leftTopForm: {},
      rightTopForm: {},
      leftBottom: {},
      submitForm: {
        ISDELRESOURE: true,
        ISDELUID: true
      },
      dialogVisible: false,
      editForm: {},
      loading: false,
      mainTable: [],
      totalPage: 0,
      formData: {
        Page: 1,
        Limit: 15
      },
      detailList: [],
      historyList: [],
      isShow: false,
      ProcessList: [],
      saveForm: { SNLIST: [], SaveRecords: [] },
      disabledIndex: -1,
      chooseIndex: 0,
      oldIndex: 0,
      PrestoreData: {},
      OldBottom: {},
      OldProcessData: [],
      haveNext: false,
      haveChoose: true,
      showLoading: false
    }
  },
  created () { },
  methods: {
    // 选择列表
    async getNewWorkNoData () {
      this.loading = true
      const res = await GetNewWorkNoData(this.formData)
      this.loading = false
      this.mainTable = res.Result ? res.Result : []
      this.totalPage = res.TotalCount ? res.TotalCount : 0
    },
    searchClick () {
      this.formData.Page = 1
      this.getNewWorkNoData()
    },
    // 仓库返查
    async getNewReworkDataByNewNo () {
      const res = await GetNewReworkDataByNewNo(this.leftTopForm)
      const data = res.Result
      this.PrestoreData = data
      if (!this.haveNext) {
        this.historyList = []
        this.historyList.push(data.OPERATIONHISTORY)
        this.detailList = data.SNLIST || []
      }
      const ProcessList = data.CURRENTOPERATIONLIST || []
      this.ProcessList = []
      ProcessList.map((i) => {
        Object.keys(i).map((j) => {
          this.ProcessList.push({
            label: j,
            value: i[j]
          })
        })
      })
      this.disabledIndex = 99999999
      this.chooseIndex = data.CHOOSEINDEX || 0
      // this.leftBottom.CHOOSEINDEX =
      //   Object.values(data.CURRENTOPERATIONLIST[data.CHOOSEINDEX])[0] || 0
    },
    // 返工数据查
    async getReworkDataBySN () {
      const res = await GetReworkDataBySN(this.leftTopForm)
      const data = res.Result
      this.rightTopForm = data || {}
      // 制程返工模式
      if (this.leftTopForm.RETYPE === 0) {
        this.historyList = []
        this.historyList.push(data.OPERATIONHISTORY)
        this.detailList = data.SNLIST || []
        const ProcessList = data.CURRENTOPERATIONLIST || []
        this.ProcessList = []
        ProcessList.map((i) => {
          Object.keys(i).map((j) => {
            this.ProcessList.push({
              label: j,
              value: i[j]
            })
          })
        })
        this.disabledIndex = parseInt(data.CHOOSEINDEX) || -1
        this.chooseIndex = data.CHOOSEINDEX || 0
        // this.leftBottom.CHOOSEINDEX =
        //   Object.values(data.CURRENTOPERATIONLIST[data.CHOOSEINDEX])[0] || 0
      } else if (this.leftTopForm.RETYPE === 1) {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)',
          target: document.querySelector('#bottomBox')
        })
        // 仓库模式
        const OldProcessData = data.CURRENTOPERATIONLIST || []
        this.OldProcessData = []
        OldProcessData.map((i) => {
          Object.keys(i).map((j) => {
            this.OldProcessData.push({
              label: j,
              value: i[j]
            })
          })
        })
        this.OldBottom.CHOOSEINDEX =
          Object.values(data.CURRENTOPERATIONLIST[data.CHOOSEINDEX])[0] || 0
        this.detailList.push(this.leftTopForm.NEW_WORKNO)
        this.isShow = true
        loading.close()
      }
    },
    // 单选返工类型
    changeRadio (row) {
      this.leftTopForm.RETYPE = row
      if (row === 0) {
        this.leftTopForm.NEW_WORKNO = null
      }
      this.$forceUpdate()
    },
    // 制程选中
    changeLeftBottom (row, index) {
      if (index > this.disabledIndex) {
        return false
      }
      // this.leftBottom.CHOOSEINDEX = row
      console.log(this.leftBottom.CHOOSEINDEX)
      this.ProcessList.map((item, index) => {
        if (Object.values(item).indexOf(row) !== -1) {
          this.chooseIndex = index
        }
      })
      console.log('this.chooseIndex:', this.chooseIndex)
      this.$forceUpdate()
    },
    // 旧制程区选中
    changeOldBottom (row, index) {
      this.OldBottom.CHOOSEINDEX = row
      this.OldProcessData.map((item, index) => {
        if (Object.values(item).indexOf(row) !== -1) {
          this.oldIndex = index
        }
      })
      this.haveChoose = true
      this.$forceUpdate()
    },
    cellClick (row) {
      this.leftTopForm.NEW_WORKNO = row.row.WO_NO
    },
    openDialogVisible () {
      if (this.leftTopForm.RETYPE === undefined) {
        return this.$message.error(this.$t('SfcsRework._28'))
      }
      this.getNewWorkNoData()
      this.dialogVisible = true
    },
    addNew () {
      if (this.leftTopForm.RETYPE === undefined) {
        return this.$message.error(this.$t('SfcsRework._28'))
      }
      this.getNewReworkDataByNewNo()
      this.dialogVisible = false
    },
    addSN () {
      if (this.leftTopForm.RETYPE === undefined) {
        return this.$message.error(this.$t('SfcsRework._28'))
      }
      if (this.leftTopForm.RETYPE === 1) {
        if (!this.leftTopForm.NEW_WORKNO) {
          return this.$message.error(this.$t('SfcsRework._29'))
        }
        if (!this.leftBottom.CHOOSEINDEX) {
          return this.$message.error(this.$t('SfcsRework._30'))
        }
        this.leftTopForm.CHOOSEINDEXVALUE = this.leftBottom.CHOOSEINDEX
      }
      this.getReworkDataBySN()
    },
    nextClick () {
      this.haveNext = true
      if (this.leftTopForm.SN) {
        this.saveForm.SNLIST.push(this.leftTopForm.SN.toString())
      }
      this.saveForm.SaveRecords.push({
        SN: this.leftTopForm.SN ? this.leftTopForm.SN.toString() : '',
        NEW_WORKNO: this.leftTopForm.NEW_WORKNO,
        RETYPE: this.leftTopForm.RETYPE,
        ISDELRESOURE: this.submitForm.ISDELRESOURE,
        ISDELUID: this.submitForm.ISDELUID,
        CHOOSEINDEX: this.chooseIndex,
        CHOOSEINDEXVALUE: this.leftBottom.CHOOSEINDEX,
        OLDCHOOSEINDEX: this.oldIndex,
        PLANT_CODE: this.rightTopForm.PLANT_CODE,
        CLASSIFICATION: this.rightTopForm.CLASSIFICATION,
        ROUTE_ID: this.PrestoreData.ROUTE_ID,
        ORIGINALROUTEID: this.rightTopForm.ORIGINALROUTEID,
        ORDERNOLIST: this.PrestoreData.ORDERNOLIST,
        ORIGINALORDERNOLIST: this.rightTopForm.ORIGINALORDERNOLIST,
        REPAIRER: this.userinfo.USER_NAME,
        WORKORDERID: this.rightTopForm.WORKORDERID,
        RUNCARDFORMAT: this.PrestoreData.RUNCARDFORMAT
      })
      if (this.detailList.length !== 1) {
        this.detailList.push(this.leftTopForm.NEW_WORKNO)
      }
      delete this.leftTopForm.SN
      // this.leftTopForm = {}
      this.rightTopForm = {}
      this.leftBottom = {}
      this.submitForm = { ISDELRESOURE: true, ISDELUID: true }
      this.isShow = false
      // this.ProcessList = []
      this.disabledIndex = 99999999
      this.chooseIndex = 0
      this.oldIndex = 0
      this.PrestoreData = {}
      this.OldBottom = {}
      this.OldProcessData = []
      this.haveChoose = false
    },
    saveClick () {
      if (this.leftTopForm.RETYPE === undefined) {
        return this.$message.error(this.$t('SfcsRework._28'))
      }
      if (!this.leftBottom.CHOOSEINDEX) {
        return this.$message.error(this.$t('SfcsRework._31'))
      }
      if (this.leftTopForm.RETYPE === 0) {
        this.saveForm = { SNLIST: [], SaveRecords: [] }
        if (this.leftTopForm.SN) {
          this.saveForm.SNLIST.push(this.leftTopForm.SN.toString())
        }
        this.saveForm.SaveRecords.push({
          SN: this.leftTopForm.SN ? this.leftTopForm.SN.toString() : '',
          RETYPE: this.leftTopForm.RETYPE,
          ISDELRESOURE: this.submitForm.ISDELRESOURE,
          ISDELUID: this.submitForm.ISDELUID,
          CHOOSEINDEX: this.chooseIndex,
          CHOOSEINDEXVALUE: this.leftBottom.CHOOSEINDEX,
          PLANT_CODE: this.rightTopForm.PLANT_CODE,
          CLASSIFICATION: this.rightTopForm.CLASSIFICATION,
          ROUTE_ID: this.rightTopForm.ROUTE_ID,
          ORIGINALROUTEID: this.rightTopForm.ORIGINALROUTEID,
          ORDERNOLIST: this.rightTopForm.ORDERNOLIST,
          ORIGINALORDERNOLIST: this.rightTopForm.ORIGINALORDERNOLIST,
          REPAIRER: this.userinfo.USER_NAME,
          WORKORDERID: this.rightTopForm.WORKORDERID,
          RUNCARDFORMAT: this.rightTopForm.RUNCARDFORMAT
        })
      } else {
        if (this.haveChoose) {
          this.nextClick()
        }
      }
      SaveData(this.saveForm).then((res) => {
        if (res.Result) {
          this.$notify({
            title: this.$t('cdc._21'),
            message: this.$t('cdc._22'),
            type: 'success',
            duration: 5000
          })
          this.cleanClick()
          // if (this.leftTopForm.RETYPE === 0) {
          //   this.cleanClick()
          // }
        }
      })
    },
    cleanClick () {
      this.leftTopForm = {}
      this.rightTopForm = {}
      this.leftBottom = {}
      this.submitForm = { ISDELRESOURE: true, ISDELUID: true }
      this.detailList = []
      this.historyList = []
      this.isShow = false
      this.ProcessList = []
      this.saveForm = { SNLIST: [], SaveRecords: [] }
      this.disabledIndex = -1
      this.chooseIndex = 0
      this.oldIndex = 0
      this.PrestoreData = {}
      this.OldBottom = {}
      this.OldProcessData = []
      this.haveNext = false
      this.haveChoose = false
    },
    handleSizeChange (val) {
      this.formData.Limit = val
      this.getNewWorkNoData()
    },
    handleCurrentChange (val) {
      this.formData.Page = val
      this.getNewWorkNoData()
    },
    handleGetLabel (item) {
      return Object.values(item)[0]
    },
    changNEW_WORKNO (e) {
      this.$forceUpdate()
    }
  }
}
</script>
<style lang="scss" scoped>
.leftBottom {
  height: calc(100vh - 40px - 283px - 62px - 40px);
  overflow: auto;
}
.rightBottom {
  height: calc(100vh - 40px - 283px - 40px);
}
.checkBottom {
  height: calc(100vh - 40px - 283px);
}
.bgc {
  background-color: rgb(243, 214, 159);
}
.list {
  background-color: #fff;
  border-bottom: 1px solid #dcdfe6;
  height: 40px;
  line-height: 40px;
  padding: 0 5px;
  color: #606266;
}
.radioBox {
  border: 1px solid #dcdfe6;
  height: 40px;
  line-height: 40px;
  padding-left: 10px;
}
</style>
<style >
.el-tabs--border-card > .el-tabs__content {
  padding: 0;
}
</style>
