<template>
  <d2-container class="SfcsContainerList">
    <el-form ref="form"
             :model="formData"
             :show-message="false"
             label-width="150px">
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item :label="$t('SfcsContainerList._1')+'：'"
                        prop="FIX_HEADER">
            <div style="display: flex;">
              <el-input v-model="formData.Date"
                        :placeholder="$t('SfcsContainerList._2')"
                        clearable
                        @keyup.enter.native="DataChange"
                        type="text" />
              <el-button type="primary"
                         @click="Clear">{{ $t("srr._5") }}</el-button>
            </div>
          </el-form-item>
          <el-form-item :label="$t('SfcsContainerList._3')+'：'">
            <el-input v-model="formData.DEFINEDQTY"
                      disabled
                      placeholder=" "
                      type="text" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('SfcsContainerList._4')+'：'">
            <div style="display: flex;">
              <el-input v-model="formData.CARTON_NO"
                        placeholder=" "
                        disabled
                        type="text" />
              <el-button @click="FillupClick"
                         type="primary">{{ $t("CollectProducts._45") }}</el-button>
            </div>
          </el-form-item>

          <el-form-item :label="$t('SfcsContainerList._5')+'：'">
            <el-input v-model="formData.CURRENTQTY"
                      placeholder=" "
                      disabled
                      type="text" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="SfcsContainerList-table">
      <vxe-table v-loading="loading"
                 ref="xTable"
                 border
                 stripe
                 keep-source
                 highlight-hover-row
                 highlight-current-row
                 show-overflow
                 auto-resize
                 width="100%"
                 height="100%"
                 :seq-config="{startIndex: (formData.Page - 1) * formData.Limit}"
                 :edit-config="{ mode: 'row', showStatus: true }"
                 :radio-config="{ labelField: 'name', trigger: 'row' }"
                 :data="annalTable">
        <vxe-table-column type="seq"
                          min-width="80"
                          :title="$t('se_cc.sn')"
                          :edit-render="{ name: 'input' }"
                          align="center" />
        <vxe-table-column min-width="200"
                          field="SN"
                          :title="$t('SfcsContainerList._6')"
                          :edit-render="{ name: 'input' }"
                          align="center"></vxe-table-column>
        <vxe-table-column min-width="200"
                          field="CARTON_NO"
                          :title="$t('SfcsContainerList._4')"
                          :edit-render="{ name: 'input' }"
                          align="center" />
        <vxe-table-column min-width="200"
                          field="WO_NO"
                          :title="$t('SfcsContainerList._7')"
                          :edit-render="{ name: 'input' }"
                          align="center" />
        <vxe-table-column min-width="200"
                          field="PART_NO"
                          :title="$t('SfcsContainerList._8')"
                          :edit-render="{ name: 'input' }"
                          align="center" />
        <vxe-table-column min-width="200"
                          field="DESCRIPTION"
                          :title="$t('SfcsContainerList._9')"
                          :edit-render="{ name: 'input' }"
                          align="center" />
      </vxe-table>
    </div>
    <template slot="footer">
      <el-pagination class="SfcsRuncardRangerRules-pagination"
                     :current-page="formData.Page"
                     :page-size="formData.Limit"
                     :page-sizes="[15, 25, 35, 45]"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange" />
    </template>
    <!-- 选择打印机 -->
    <el-dialog class="my-dialog"
               :title="$t('MesBatchManager._56')"
               :visible.sync="PrintoShow"
               width="30%"
               ref="PrintDialog"
               :close-on-click-modal="false">
      <el-form ref="Printform"
               label-width="80px"
               size="small"
               label-position="top">
        <el-form-item :label="$t('MesBatchManager._57')">
          <el-select v-model="PrintName"
                     style="width:100%"
                     @change="SetPrinName"
                     placeholder=" ">
            <el-option v-for="(item, index) in PrintList"
                       :key="index"
                       :label="item"
                       :value="item" />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="PrintoShow = false">
          {{
          $t("_kanban._4")
          }}
        </el-button>
        <el-button type="primary"
                   @click="PrintoShow = false">
          {{
          $t("_kanban._5")
          }}
        </el-button>
      </span>
    </el-dialog>
  </d2-container>

</template>
<script>
import {
  UpdateCarton,
  UpdateCartonNoBySN,
  SetCatonFullByCaton
} from '@/api/SfcsContainerList'
import { mapGetters } from 'vuex'
import request from '@/plugin/axios'
export default {
  name: 'SfcsContainerList',
  data () {
    return {
      loading: false,
      annalTable: [],
      total: 0,
      formData: {
        Date: '',
        CARTON_NO: '', // 卡通号（箱号）
        DEFINEDQTY: '', // 容量
        CURRENTQTY: '', // 已刷数量
        Page: 1,
        Limit: 15
      },
      Fillupform: {
        CARTON_NO: '',
        USER_NAME: ''
      },
      // 打印
      PrintoShow: false,
      PrintList: [],
      PrintName: '',
      printId: ''
    }
  },
  computed: {
    ...mapGetters(['userinfo'])
  },
  created () {
    this.Fillupform.USER_NAME = this.userinfo.USER_NAME
  },
  methods: {
    // 输入数据回车
    DataChange (e) {
      if (!this.formData.Date) {
        return
      }
      if (!this.formData.CARTON_NO) {
        this.UpdateCarton()
      } else {
        this.getLoadData()
      }
    },
    // 置满
    async FillupClick () {
      if (!this.formData.CARTON_NO) {
        this.$message.error(this.$t('SfcsContainerList._10'))
        return
      }
      this.Fillupform.CARTON_NO = this.formData.CARTON_NO
      const res = await SetCatonFullByCaton(this.Fillupform)
      if (res.Result) {
        this.printId = res.Result
        this.downSomething({ PrintTaskId: res.Result, Printer: this.userinfo.USER_NAME })
      }
    },
    // 打印
    async downSomething (query) {
      var that = this
      request({
        url: 'http://localhost:42737/Printer/GetCurrentPrint',
        method: 'get'
      }).then(res => {
        console.log(res, 'res.Resultres.Resultres.Result')
        if (res.Code === 1) {
          this.print(query)
        } else {
          this.GetPrintList()
        }
      }).catch(function () {
        that.$message({
          type: 'error',
          message: that.$t('MesBatchManager._55')
        })
      })
    },
    // 开始打印
    print (query) {
      var that = this
      const loading = this.$loading({
        lock: true, // 同v-loading的修饰符
        text: this.$t('MesBatchManager._54'), // 加载文案
        backgroundColor: 'rgba(55,55,55,0.4)', // 背景色
        spinner: 'el-icon-loading' // 加载图标
      })
      request({
        url: 'http://localhost:42737/Printer/BasePrinter',
        method: 'post',
        data: query
      }).then(res => {
        loading.close()
        console.log(res, 'res.Resultres.Resultres.Result')
        if (res.Code === 1) {
          if (res.Data) {
            this.$notify({
              title: this.$t('publics.tips.success'),
              message: this.$t('MesBatchManager._52'),
              type: 'success',
              duration: 2000
            })
          } else {
            this.GetPrintList()
            this.$notify({
              title: this.$t('publics.tips.handleFail'),
              message: res.Msg,
              type: 'error',
              duration: 2000
            })
          }
        } else {
          this.$notify({
            title: this.$t('publics.tips.handleFail'),
            message: res.Msg,
            type: 'error',
            duration: 2000
          })
        }
      }).catch(function () {
        loading.close()
        that.$message({
          type: 'error',
          message: that.$t('MesBatchManager._55')
        })
      })
    },
    // 获取打印机列表
    async GetPrintList () {
      this.PrintoShow = true
      const res = await request({
        url: 'http://localhost:42737/Printer/GetPrintList',
        method: 'get'
      })
      if (res.Code === 1) {
        this.PrintList = res.Data
      }
    },
    // 选择名称
    async SetPrinName () {
      const res = await request({
        url: 'http://localhost:42737/Printer/SetPrintName',
        method: 'post',
        data: {
          PrintName: this.PrintName
        }
      })
      if (res.Code === 1) {
        // 重新打印
        this.print({ PrintTaskId: this.printId, Printer: this.userinfo.USER_NAME })
      } else {
        this.$notify({
          title: this.$t('publics.tips.handleFail'),
          message: res.Msg,
          type: 'error',
          duration: 2000
        })
      }
    },

    async UpdateCarton () {
      const res = await UpdateCarton(this.formData.Date)
      var data = res.Result
      if (data) {
        this.formData.CARTON_NO = data.CARTON_NO // 卡通号（箱号）
        this.formData.CURRENTQTY = data.CURRENTQTY // 已刷数量
        this.formData.DEFINEDQTY = data.DEFINEDQTY // 容量
        this.annalTable = data.PRODUCT
        this.total = res.TotalCount
      }
    },
    async getLoadData () {
      this.loading = true
      const res = await UpdateCartonNoBySN(this.formData)
      this.loading = false
      var data = res.Result
      if (data) {
        this.annalTable = res.Result.PRODUCT
        this.total = res.TotalCount
        this.$notify({
          title: this.$t('cccn._24'),
          message: this.$t('publics.tips.handleSuccess'),
          type: 'success',
          duration: 2000
        })
      }
    },
    // 分页
    handleSizeChange (val) {
      this.formData.Limit = val
      this.getLoadData()
    },
    handleCurrentChange (val) {
      this.formData.Page = val
      this.getLoadData()
    },
    // 清空
    Clear () {
      this.formData = {
        Page: 1,
        Limit: 15
      }
      this.annalTable = []
    }
  }
}
</script>
<style lang="scss" scoped>
.SfcsContainerList-table {
  height: calc(100vh - 260px);
}
</style>
