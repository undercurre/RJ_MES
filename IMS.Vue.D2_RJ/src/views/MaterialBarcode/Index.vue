<template>
  <d2-container class="material-barcode">
    <template #header>
      <!-- <custom-container-header class="header">

      </custom-container-header> -->
    </template>
    <el-container class="material-barcode-body">
      <el-main>
        <el-form :model="formData"
                 ref="form"
                 label-position="left"
                 label-width="6em"
                 size="mini"
                 :rules="rules">
          <div class="row">
            <el-form-item label="料号"
                          required
                          prop="PART_ID">
              <selector name="part"
                        v-model="formData.PART_ID"
                        placeholder="请选择物料(必填)" />
            </el-form-item>
            <el-form-item label="数量"
                          required
                          prop="REEL_QTY">
              <el-input v-model="formData.REEL_QTY"
                        type="number"
                        clearable
                        placeholder="必填" />
            </el-form-item>
          </div>
          <div class="row">
            <el-form-item label="供应商"
                          required
                          prop="VENDOR_ID">
              <selector name="vendor"
                        v-model="formData.VENDOR_ID"
                        placeholder="请选择供应商" />
            </el-form-item>
            <el-form-item label="生产批次"
                          prop="LOT_CODE">
              <el-input v-model="formData.LOT_CODE"
                        placeholder="可不填"
                        clearable />
            </el-form-item>
          </div>
          <div class="row">
            <el-form-item label="生产日期"
                          required
                          prop="DATE_CODE">
              <el-date-picker class="date-code-picker"
                              format="yyyy-MM-dd"
                              value-format="yyyyMMdd"
                              v-model="formData.DATE_CODE"
                              type="date"
                              placeholder="选择日期（必填）">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="条码张数"
                          required
                          prop="PRINT_QTY">
              <el-input v-model="formData.PRINT_QTY"
                        type="number"
                        clearable
                        placeholder="必填" />
            </el-form-item>
          </div>
          <div class="op-row">
            <el-button type="info"
                       plain
                       size="medium"
                       class="reset-button"
                       @click.stop="resetForm">重置</el-button>
            <el-button type="primary"
                       plain
                       size="medium"
                       icon="fa fa-file-excel-o"
                       class="export-button"
                       @click.stop="saveReelPrintInfo">保存并打印</el-button>
          </div>
          <div class="end-row">
            <el-card shadow="never"
                     :class="{ 'save-state-error': errorMsg }">
              {{ errorMsg }}
            </el-card>
          </div>
        </el-form>
      </el-main>
    </el-container>
    <el-dialog title="可选打印机"
               custom-class="printers-dialog"
               :show-close="false"
               :visible.sync="printVisible">
      <div class="item-container">
        <div v-for="(print,index) in printList"
             :key="index">
          <el-radio v-model="printSelected"
                    :label="print">{{
            print
          }}</el-radio>
        </div>
      </div>
      <template #footer>
        <el-button size="medium"
                   @click.stop="printVisible = false">取消</el-button>
        <el-button size="medium"
                   type="primary"
                   @click.stop="doPrintByPrinter">确定</el-button>
      </template>
    </el-dialog>
  </d2-container>
</template>

<script>
import {
  saveReelPrintInfo,
  getCurrentPrint,
  getPrintList,
  print,
  setPrintName
} from '@/api/MaterialBarcode'
import Selector from './compoment/Selector'
import { mapGetters } from 'vuex'
export default {
  name: 'MaterialBarcode',
  components: {
    Selector
  },
  data () {
    return {
      formData: {
        PART_ID: '',
        PART_CODE: '',
        REEL_QTY: 1,
        VENDOR_ID: '',
        VENDOR_NAME: '',
        LOT_CODE: '',
        DATE_CODE: '',
        PRINT_QTY: 1
      },
      rules: {
        PART_ID: [{ required: true, message: '请选择物料', trigger: 'change' }],
        REEL_QTY: [
          { required: true, message: '请输入数量', trigger: 'change' }
        ],
        VENDOR_ID: [
          {
            required: true,
            message: '请选择供应商',
            trigger: 'change'
          }
        ],
        DATE_CODE: [
          {
            required: true,
            message: '请选择时间',
            trigger: 'change'
          }
        ],
        PRINT_QTY: [
          {
            required: true,
            message: '请输入打印数量',
            trigger: 'change'
          }
        ]
      },
      printVisible: false,
      printList: [],
      printSelected: '',
      errorMsg: null,
      task: {
        ID: null
      },
      reelCode: []
    }
  },
  computed: {
    ...mapGetters(['userinfo']),
    user () {
      return this.userinfo.USER_NAME
    }
  },
  created () {
    var date = new Date()
    var seperator1 = ''
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var strDate = date.getDate()
    if (month >= 1 && month <= 9) {
      month = '0' + month
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = '0' + strDate
    }
    this.formData.DATE_CODE = year + seperator1 + month + seperator1 + strDate
  },
  methods: {
    saveReelPrintInfo () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          saveReelPrintInfo({
            ...this.formData,
            USER_NAME: this.user
          }).then((res) => {
            if (!res.Result) {
              this.errorMsg = res.message
            } else {
              this.task.ID = res.Result.PRINT_ID
              this.reelCode = res.Result.REEL_CODE
              this.getCurrentPrinter()
            }
          })
        }
      })
    },
    getCurrentPrinter () {
      getCurrentPrint().then((res) => {
        if (res.data.Code === 1) {
          this.doPrint()
        } else {
          this.getPrinters()
        }
      })
    },
    setCurrentPrinter () {
      setPrintName({
        PrintName: this.printSelected
      }).then((res) => {
        if (res.data.Code === 1) {
          this.doPrint()
        } else {
          this.errorMsg = res.data.Msg
        }
      })
    },
    getPrinters () {
      if (this.printList.length > 0) {
        this.printVisible = true
        return
      }
      getPrintList().then((res) => {
        if (res.data.Code === 1) {
          this.printList = res.data.Data
          this.printVisible = true
        }
      })
    },
    doPrint () {
      const loading = this.$loading({
        lock: true, // 同v-loading的修饰符
        text: this.$t('MesBatchManager._54'), // 加载文案
        backgroundColor: 'rgba(55,55,55,0.4)', // 背景色
        spinner: 'el-icon-loading', // 加载图标
        target: document.querySelector('.BarCodeForm')
      })
      print({
        PrintTaskId: this.task.ID,
        Printer: this.user
      }).then((res) => {
        loading.close()
        if (res.data.Code === 1) {
          if (res.data.Data) {
            this.printVisible = false
            this.$notify({
              title: this.$t('publics.tips.success'),
              message: this.$t('MesBatchManager._52'),
              type: 'success',
              duration: 2000
            })
          } else {
            this.printVisible = false
            this.getPrinters()
            this.errorMsg = res.data.Msg
            this.$notify({
              title: this.$t('publics.tips.handleFail'),
              message: res.data.Msg,
              type: 'error',
              duration: 2000
            })
          }
        } else {
          this.printVisible = false
          this.errorMsg = res.data.Msg
          this.$notify({
            title: this.$t('publics.tips.handleFail'),
            message: res.data.Msg,
            type: 'error',
            duration: 2000
          })
        }
      })
    },
    printOnly () {
      if (!this.task || !this.task.ID) {
        this.$notify({
          type: 'warning',
          message: '暂无需要打印的物料条码'
        })
        return
      }
      this.doPrint()
    },
    doPrintByPrinter () {
      this.printVisible = false
      this.setCurrentPrinter()
    },
    resetForm () {
      this.formData = {
        PART_ID: '',
        PART_CODE: '',
        REEL_QTY: null,
        VENDOR_ID: '',
        VENDOR_NAME: '',
        LOT_CODE: '',
        DATE_CODE: '',
        PRINT_QTY: null
      }
    }
  }
}
</script>

<style scoped lang="scss">
.material-barcode {
  ::v-deep .d2-container-full__body {
    background: #f1f1f1 !important;
    .printers-dialog {
      width: 500px;
      height: 400px;
      border-radius: 5px;
      display: flex;
      flex-flow: column;
      .el-dialog__header {
        border-radius: 5px 5px 0 0;
      }
      .el-dialog__body {
        flex: 1;
        padding: 5px;
        background: #f2f6fc;
        .item-container {
          height: calc(100% - 30px);
          padding: 15px 5px;
          background: #fcfcfc;
          border-radius: 5px;
          display: flex;
          flex-flow: column;
          justify-content: space-between;
          .el-radio {
            width: 100%;
          }
        }
      }
      .el-dialog__footer {
        padding: 0;
        display: flex;
        .el-button {
          flex: 1;
          margin: 0;
          border: none;
          border-radius: 0;
          padding-top: 15px;
          padding-bottom: 15px;
          &:first-child {
            border-bottom-left-radius: 5px;
          }
          &:last-child {
            border-bottom-right-radius: 5px;
          }
        }
      }
    }
  }
  .header {
    padding-left: 15%;
  }
  .material-barcode-body {
    height: 100%;
    .el-main {
      padding: 0 15%;
      .el-form {
        height: 100%;
        display: flex;
        flex-flow: column;
        .row {
          width: 100%;
          display: flex;
          .el-form-item {
            flex: 1;
            &:not(:last-child) {
              margin-right: 10px;
            }
            .date-code-picker {
              width: 100%;
            }
            ::v-deep .el-input__inner {
              padding-right: 0;
            }
          }
        }
        .end-row {
          flex: 1;
          .el-card {
            height: 100%;
            border-radius: 8px;
            border: none;
            font-size: 20px;
            font-weight: bolder;
            color: #67c23a;
            &.save-state-error {
              color: #f56c6c;
            }
            ::v-deep .el-card__body {
              &::before {
                content: '打印结果：';
              }
            }
          }
        }
        .op-row {
          text-align: right;
          margin-bottom: 10px;
        }
      }
    }
  }
}
</style>
