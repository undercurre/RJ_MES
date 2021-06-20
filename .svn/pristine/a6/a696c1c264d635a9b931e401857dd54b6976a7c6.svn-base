<template>
  <d2-container>
    <template slot="header">
      <custom-container-header exportMehodsName="getLoad"
                               :tableName="formData.table_name"
                               :isExport="false"
                               :isExportTpl="false"
                               :isImport="false">
        <el-select v-model="formData.table_name"
                   filterable
                   clearable
                   style="width:200px"
                   :placeholder="$t('IE.bin')"
                   @change="handleChangeSelect">
          <el-option v-for="item in TableList"
                     :key="item.ID"
                     :label="item.DESC_CN"
                     :value="item.TOTABLE_NAME" />
        </el-select>
        <el-button v-if="$btnList.indexOf('ImportExcelAdd') !== -1"
                   type="primary"
                   icon="el-icon-plus"
                   @click.prevent="addClick">{{$t('publics.btn.add')}}</el-button>
        <el-button v-if="$btnList.indexOf('ImportExcelSave') !== -1"
                   type="success"
                   icon="el-icon-check"
                   @click.prevent="saveClick">{{$t('publics.btn.save')}}</el-button>
        <el-button v-if="$btnList.indexOf('ImportExcelSave') !== -1"
                   style="margin-right:10px"
                   v-show="isShow === 1?true:false"
                   icon="el-icon-cloudy"
                   type="primary"
                   @click="beforeUpload">{{$t('publics.btn.click_Import')}}</el-button>
        <el-upload v-show="isShow === 0?true:false"
                   accept=".xls, .xlsx"
                   style="margin:0 10px"
                   ref="upload"
                   :show-file-list="false"
                   :headers="handleUploadHeader()"
                   :action="uploadUrl"
                   :auto-upload="true"
                   :on-success="handleAvatarSuccess"
                   :data="excelSaveName">
          <el-button icon="el-icon-cloudy"
                     type="primary">{{$t('publics.btn.click_Import')}}</el-button>
        </el-upload>
        <el-button type="danger"
                   icon="el-icon-delete"
                   @click.prevent="removeClick">{{$t('IE._a4')}}</el-button>
      </custom-container-header>
    </template>
    <div class="table-container">
      <vxe-table row-key
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
                 stripe
                 :edit-rules="validRules"
                 :loading="loading"
                 :data="mainTable"
                 :mouse-config="{ selected: true }"
                 :edit-config="{ trigger: 'click', mode: 'row', showStatus: true }">
        <vxe-table-column width="60">
          <template>
            <span class="drag-btn">
              <i class="vxe-icon--menu"></i>
            </span>
          </template>
          <template v-slot:header>
            <vxe-tooltip v-model="showHelpTip1"
                         :content="$t('IE._a5')"
                         enterable>
              <i class="vxe-icon--question"
                 @click="showHelpTip1 = !showHelpTip1"></i>
            </vxe-tooltip>
          </template>
        </vxe-table-column>
        <vxe-table-column field="COLUMN_NAME"
                          :title="$t('IE.pn')" />
        <vxe-table-column field="EXCEL_ITEM"
                          :title="$t('IE.ef')" />
        <vxe-table-column field="COLUMN_CAPTION"
                          :title="$t('IE.pt')"
                          :edit-render="{name: 'input'}" />
        <vxe-table-column field="IS_UNIQUE"
                          :title="$t('IE.only')"
                          :edit-render="{ autofocus: '.custom-input', type: 'visible' }">
          <template v-slot:edit="{ row }">
            <div>
              <el-switch v-model="row.IS_UNIQUE"
                         :active-text="$t('publics.btn.yes')"
                         :inactive-text="$t('publics.btn.no')"
                         active-color="#13ce66"
                         inactive-color="#cccccc"
                         :active-value="1"
                         :inactive-value="0" />
            </div>
          </template>
        </vxe-table-column>
        <vxe-table-column field="ISNULL_ABLE"
                          :title="$t('IE.ae')"
                          :edit-render="{ autofocus: '.custom-input', type: 'visible' }">
          <template v-slot:edit="{ row }">
            <div>
              <el-switch v-model="row.ISNULL_ABLE"
                         :active-text="$t('publics.btn.yes')"
                         :inactive-text="$t('publics.btn.no')"
                         active-color="#13ce66"
                         inactive-color="#cccccc"
                         :active-value="1"
                         :inactive-value="0" />
            </div>
          </template>
        </vxe-table-column>
        <vxe-table-column field="PART_NO"
                          :title="$t('IE.operating')">
          <template v-slot="{ row }">
            <el-button type="primary"
                       size="small"
                       @click="edit_but(row, row.$index)">{{ $t("sql._7") }}</el-button>
            <el-button type="danger"
                       size="small"
                       @click="remove_but(row, row.$index)">{{ $t("se.delete") }}</el-button>
          </template>
        </vxe-table-column>
      </vxe-table>
    </div>
    <!-- 编辑 -->
    <el-dialog v-dialogDrag
               :title="$t('sql._7')"
               :visible.sync="dialogFormVisible"
               width="50%"
               :close-on-click-modal="false">
      <el-form label-position="top"
               ref="TableData"
               :show-message="false"
               :model="TableData"
               label-width="85px">
        <!-- <el-form-item>
          <span>{{ $t("IE.pt") }}</span>
          <el-input v-model="TableData.COLUMN_CAPTION" :placeholder="$t('IE._1')" />
        </el-form-item>
        <el-form-item prop="IS_UNIQUE">
          <span>{{ $t("IE.only") }}</span>
          <el-switch
            v-model="TableData.IS_UNIQUE"
            :active-text="$t('publics.btn.yes')"
            :inactive-text="$t('publics.btn.no')"
            active-color="#13ce66"
            inactive-color="#cccccc"
            :active-value="1"
            :inactive-value="0"
          />
        </el-form-item>
        <el-form-item prop="ISNULL_ABLE">
          <span>{{ $t("IE.ae") }}</span>
          <el-switch
            v-model="TableData.ISNULL_ABLE"
            :active-text="$t('publics.btn.yes')"
            :inactive-text="$t('publics.btn.no')"
            active-color="#13ce66"
            inactive-color="#cccccc"
            :active-value="1"
            :inactive-value="0"
          />
        </el-form-item>-->
        <el-form-item prop="REFERENCE_SQL">
          <span>{{ $t("IE._2") }}</span>
          <el-input type="textarea"
                    v-model="TableData.REFERENCE_SQL"
                    :placeholder="$t('IE._3')"
                    :rows="5" />
        </el-form-item>
        <el-form-item prop="LISTVALIDATION_SQL">
          <span>{{$t('IE._a6')}}</span>
          <el-input type="textarea"
                    :value="TableData.LISTVALIDATION_SQL"
                    @input="handleLISTVALIDATION_SQL"
                    :placeholder="$t('IE._a7')"
                    :rows="5" />
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="cancel('form')">{{ $t("se.cancel") }}</el-button>
        <el-button type="primary"
                   @click="submit_but('form')">{{$t("se.confirm")}}</el-button>
      </div>
    </el-dialog>
  </d2-container>
</template>

<script>
import Sortable from 'sortablejs'
import customContainerHeader from '@/components/custom-container-header'
import { mapGetters } from 'vuex'
import {
  Index,
  LoadData,
  GetMstTableList,
  SaveData,
  GetIntiTableColumnList,
  DelExcel
} from '@/api/ImportExcel'
export default {
  name: 'ImportExcel',
  components: {
    customContainerHeader
  },
  data () {
    return {
      currentIndex: 0,
      formData: {
        table_name: ''
      },
      loading: false,
      mainTable: [],
      totalPage: 0,
      TableList: [],
      form: {
        insertRecords: [],
        updateRecords: [],
        removeRecords: []
      },
      defaultForm: {
        table_name: ''
      },
      validRules: {
        COLUMN_CAPTION: [
          {
            required: true,
            message: this.$t('IE._1')
          }
        ]
        // REFERENCE_SQL: [
        //   {
        //     required: true,
        //     message: this.$t('IE._3')
        //   }
        // ]
      },
      TableData: {
        ID: 0,
        MST_ID: 0, // 主表id
        COLUMN_NAME: '', // 项目名称
        COLUMN_CAPTION: '', // 项目标题
        IS_UNIQUE: 'N', // 是否唯一(1,0)
        ISNULL_ABLE: 'N', // 是否可空值(1,0)
        UPDATE_BY: '', // 修改人
        EXCEL_ITEM: '', // Excel栏位
        REFERENCE_SQL: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      CurrentMainID: null, // 当前主表ID
      // PrimaryKey: null, // 当前主键ID
      UnsavedData: [], // 原始表对应的字段信息集数据
      defaultLength: 0,
      isSave: true,
      loadTable: [],
      showHelpTip1: false,
      excelSaveName: {},
      uploadUrl:
        process.env.VUE_APP_API + 'ImportExcel/ImportExcelDemoFile',
      isShow: 0
    }
  },
  computed: {
    ...mapGetters(['userinfo'])
  },
  created () {
    this.getIndex()
    this.rowDrop()
  },
  beforeDestroy () {
    if (this.sortable) {
      this.sortable.destroy()
    }
  },
  methods: {
    // 删除模板
    removeClick () {
      DelExcel({
        Table_Name: this.defaultForm.table_name[this.currentIndex]
      }).then(res => {
        if (res.Result === true) {
          this.getLoad()
          this.$notify({
            title: this.$t('IE._a7'),
            message: this.$t('IE._a8'),
            type: 'success',
            duration: 2000
          })
        } else {
          this.$message.error(this.$t('IE._a9'))
        }
      })
    },
    handleLISTVALIDATION_SQL (e) {
      this.$set(this.TableData, 'LISTVALIDATION_SQL', e)
      this.$forceUpdate()
    },
    // 导入成功
    handleAvatarSuccess (response) {
      if (response.ErrorInfo.Status === true) {
        this.$message({
          message: response.ErrorInfo.Message,
          type: 'error'
        })
      } else {
        this.getLoad()
        this.$message({
          type: 'success',
          message: this.$t('se.picsucc')
        })
      }
    },
    // 导入前
    beforeUpload (file) {
      this.$confirm('已经存在excel模板，请问是否继续上传?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          document.querySelector('.el-upload__input').click()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消上传'
          })
          return false
        })
    },
    rowDrop () {
      this.$nextTick(() => {
        let xTable = this.$refs.xTable
        this.sortable = Sortable.create(
          xTable.$el.querySelector('.body--wrapper>.vxe-table--body tbody'),
          {
            handle: '.drag-btn',
            onSort: async ({ newIndex, oldIndex }) => {
              // const tableData = this.$refs.xTable.getTableData()['tableData']
              // let currRow = this.mainTable.splice(oldIndex, 1)[0]
              // this.mainTable.splice(newIndex, 0, currRow)
              // for (let i = 0; i < this.mainTable.length; i++) {
              //   this.mainTable[i].EXCEL_ITEM = String.fromCharCode(('A'.charCodeAt() + i))
              // }
              // console.log('=========== ', this.mainTable)
              // this.$refs.xTable.updateData(this.mainTable)
              const tableData = this.$refs.xTable.getTableData()['tableData']
              let currRow = tableData.splice(oldIndex, 1)[0]
              tableData.splice(newIndex, 0, currRow)
              for (let i = 0; i < tableData.length; i++) {
                tableData[i].EXCEL_ITEM = String.fromCharCode(
                  'A'.charCodeAt() + i
                )
              }
              console.log('=========== ', tableData)
              await this.saveClick(false)
              this.rowDrop()
            }
          }
        )
      })
    },
    async getIndex () {
      const res = await Index()
      if (res.Result === true) {
        this.getMstTableList()
      }
    },
    // 获取下拉导入表信息表
    async getMstTableList () {
      const res = await GetMstTableList()
      this.TableList = res.Result ? res.Result : []
      // this.PrimaryKey = this.TableList[0].ID
      this.defaultForm.table_name = this.TableList.map(item => {
        return item.TOTABLE_NAME
      })
      console.log('table_name:', this.defaultForm)
      this.excelSaveName.table_name = this.defaultForm.table_name[this.currentIndex]
      this.getLoad()
    },
    async getLoad () {
      // 必须返回Promise
      this.mainTable = []
      const res = await LoadData(
        this.defaultForm.table_name[this.currentIndex]
      )
      this.loadTable = res.Result ? res.Result.ImportDtlList : []
      this.mainTable = res.Result ? res.Result.ImportDtlList : []
      if (res.Result.IsExistDemo === true) {
        this.isShow = 1
      } else {
        this.isShow = 0
      }
      // this.mainTable = (res.Result ? res.Result.ImportDtlList : []).sort(
      //   (currItem, nextItem) => {
      //     return currItem.EXCEL_ITEM > nextItem.EXCEL_ITEM ? 1 : -1
      //   }
      // )
      this.defaultLength = this.mainTable.length
      // 主表ID
      this.CurrentMainID = res.Result.ID
      // this.getIntiTableColumnList()
    },
    // 获取原始表对应的字段信息集
    async getIntiTableColumnList () {
      const res = await GetIntiTableColumnList(
        this.defaultForm.table_name[this.currentIndex]
      )
      this.UnsavedData = res.Result ? res.Result : []

      console.log('原始表:', this.UnsavedData)
      console.log('this.mainTable:', this.mainTable)
      if (this.mainTable.length === 0) {
        // this.mainTable = this.UnsavedData
        this.$refs.xTable.insertAt(this.UnsavedData, -1)
        this.isSave = false
        return
      }
      const tmp = this.$refs.xTable.getTableData()['fullData'].map(item => item.EXCEL_ITEM)
      const list = this.UnsavedData.filter(
        item => tmp.indexOf(item.EXCEL_ITEM) === -1
      )
      if (list.length === 0) {
        this.$message.error(this.$t('IE._a10'))
        this.isSave = true
        return false
      }
      // this.mainTable = this.mainTable.concat(list)
      this.$refs.xTable.insertAt(list, -1)
      this.isSave = false
    },
    // 新增
    addClick () {
      this.getIntiTableColumnList()
    },
    // 删除
    remove_but (row, index) {
      console.log(row, ' ------')
      if (row) {
        this.$confirm(
          this.$t('publics.tips.makeSureDelete'),
          this.$t('publics.tips.tips'),
          {
            confirmButtonText: this.$t('publics.tips.confirm'),
            cancelButtonText: this.$t('publics.tips.cancel'),
            type: 'warning'
          }
        ).then(() => {
          this.$refs.xTable.remove(row)
          let postdata = this.$refs.xTable.getRecordset()
          if (postdata.removeRecords.length) {
            this.$refs.xTable.validate(valid => {
              if (valid) {
                this.form = {}
                this.form.ID = this.CurrentMainID
                this.form.UserName = this.userinfo.USER_NAME
                // this.form.removeRecords.push(row)
                this.form.removeRecords = postdata.removeRecords
                // this.form.removeRecords = postdata.removeRecords
                SaveData(this.form).then(res => {
                  if (res.Result) {
                    // this.form = {}
                    this.form.removeRecords = []
                    this.getLoad()
                    this.$notify({
                      title: this.$t('publics.tips.success'),
                      message: this.$t('publics.tips.deleteSuccess'),
                      type: 'success',
                      duration: 2000
                    })
                  }
                })
              }
            })
          }
        })
      } else {
        return false
      }
    },
    //  编辑
    edit_but (row) {
      this.TableData.ID = row.ID
      this.TableData.MST_ID = row.MST_ID // 主表id
      this.TableData.COLUMN_NAME = row.COLUMN_NAME // 项目名称
      this.TableData.COLUMN_CAPTION = row.COLUMN_CAPTION // 项目标题
      this.TableData.IS_UNIQUE = row.IS_UNIQUE // 是否唯一(1,0)
      this.TableData.ISNULL_ABLE = row.ISNULL_ABLE // 是否可空值(1,0)
      this.TableData.UPDATE_BY = this.userinfo.USER_NAME // 修改人
      this.TableData.EXCEL_ITEM = row.EXCEL_ITEM // Excel栏位
      this.TableData.REFERENCE_SQL = row.REFERENCE_SQL
      this.TableData.LISTVALIDATION_SQL = row.LISTVALIDATION_SQL
      this.dialogFormVisible = true
    },
    // 取消
    cancel (formName) {
      this.dialogFormVisible = false
      this.$refs.TableData.resetFields()
    },
    // 确认提交
    async submit_but (formName) {
      this.form.insertRecords = []
      this.form.updateRecords = []
      if (this.TableData.ID === 0) {
        this.form.insertRecords.push(this.TableData)
      } else {
        this.form.updateRecords.push(this.TableData)
      }
      this.$refs.TableData.validate(async (valid, errInfo) => {
        if (valid) {
          const res = await SaveData(this.form)
          if (res.Result) {
            this.dialogFormVisible = false
            this.getLoad()
            this.$notify({
              title: this.$t('se.success'),
              message: this.$t('se.savedsus'),
              type: 'success',
              duration: 2000
            })
          }
        } else {
          try {
            Object.keys(errInfo).forEach(item => {
              this.$message.error(errInfo[item][0].message)
              throw new Error(errInfo[item][0].message)
            })
          } catch (e) { }
        }
      })
    },
    handleChangeSelect (e) {
      this.defaultForm.table_name.map((item, index) => {
        if (item === e) {
          this.currentIndex = index
        }
      })
      this.excelSaveName.table_name = e
      // this.TableList.map(item => {
      //   if (item.TOTABLE_NAME === e) {
      //     this.PrimaryKey = item.ID
      //   }
      // })
    },
    // 保存
    saveClick (isTips = true) {
      var that = this
      var postdata = this.$refs.xTable.getRecordset() // 获取改动的数据 === 没有
      console.log('postData: ', postdata)
      if (
        postdata.insertRecords.length ||
        postdata.updateRecords.length ||
        postdata.removeRecords.length
      ) {
        this.$refs.xTable.validate(valid => {
          if (valid) {
            // Object.keys(postdata).forEach(item => {
            //   postdata[item] = (postdata[item] || []).map(_item => {
            //     _item.COLUMN_NAME = _item.COLUMN_NAME.trim()
            //     return _item
            //   })
            // })
            console.log(this.isSave)
            // if (this.loadTable.length === 0 || this.loadTable.length !== this.mainTable.length) {
            //   this.form.insertRecords = postdata.updateRecords
            // } else {
            //   this.form.updateRecords = postdata.updateRecords
            //   this.form.removeRecords = postdata.removeRecords
            // }

            if (this.isSave === false) {
              this.form.insertRecords = postdata.insertRecords
            } else {
              this.form.updateRecords = postdata.updateRecords
              // this.form.removeRecords = postdata.removeRecords
            }

            // this.form.insertRecords = postdata.insertRecords
            // this.form.updateRecords = postdata.updateRecords
            // this.form.removeRecords = postdata.removeRecords
            // if (this.UnsavedData.length !== 0) {
            //   Object.values(this.form).map(item => {
            //     if (item.length !== 0) {
            //       (item &&
            //       Object.prototype.toString.call(item) === '[object Array]'
            //         ? item
            //         : []
            //       ).map(_item => {
            //         _item.MST_ID = this.CurrentMainID
            //       })
            //     }
            //   })
            // }
            this.form.ID = this.CurrentMainID
            this.form.UserName = this.userinfo.USER_NAME
            // console.log(this.form)
            SaveData(this.form).then(async res => {
              if (res.Result) {
                this.isSave = true
                await this.getLoad()
                if (isTips) {
                  this.form = {}
                  that.$notify({
                    title: this.$t('crss._20'),
                    message: this.$t('crss._21'),
                    type: 'success',
                    duration: 2000
                  })
                }
              }
            })
          }
        })
      } else {
        this.$message({
          showClose: true,
          message: this.$t('publics.tips.noUpdateData'),
          type: 'warning'
        })
      }
    }
    // saveClick2 (backCall) {
    //   var postdata = this.$refs.xTable.getRecordset()
    //   if (
    //     postdata.insertRecords.length ||
    //     postdata.updateRecords.length ||
    //     postdata.removeRecords.length
    //   ) {
    //     this.$refs.xTable.validate(valid => {
    //       if (valid) {
    //         this.form.insertRecords = postdata.insertRecords
    //         this.form.updateRecords = postdata.updateRecords
    //         this.form.removeRecords = postdata.removeRecords
    //         if (this.UnsavedData.length !== 0) {
    //           Object.values(this.form).map(item => {
    //             if (item.length !== 0) {
    //               item.map(_item => {
    //                 _item.MST_ID = this.CurrentMainID
    //               })
    //             }
    //           })
    //         }
    //         this.form.ID = this.CurrentMainID
    //         this.form.UserName = this.userinfo.USER_NAME
    //         SaveData(this.form).then(async res => {
    //           if (res.Result) {
    //             this.isSave = true
    //             await this.getLoad()
    //             backCall(true)
    //           }
    //         })
    //       }
    //     })
    //   }
    // }
    // 新增
    // addClick (row) {
    //   console.log('===========>', this.UnsavedData)
    //   if (this.defaultLength > this.UnsavedData.length) return false
    //   if (this.isSave === true) {
    //     const tmp = this.$refs.xTable.getTableData()['fullData'].map(item => item.EXCEL_ITEM) // 换成 $refs.xTable.getFullData()
    //     const list = this.UnsavedData.filter(
    //       item => tmp.indexOf(item.EXCEL_ITEM) === -1
    //     )
    //     if (list.length) {
    //       const record = {
    //         ID: 0,
    //         MST_ID: this.CurrentMainID,
    //         COLUMN_NAME: list[0].COLUMN_NAME,
    //         COLUMN_CAPTION: list[0].COLUMN_CAPTION,
    //         IS_UNIQUE: list[0].IS_UNIQUE,
    //         ISNULL_ABLE: list[0].ISNULL_ABLE,
    //         UPDATE_BY: this.userinfo.USER_NAME,
    //         EXCEL_ITEM: list[0].EXCEL_ITEM,
    //         REFERENCE_SQL: ''
    //       }
    //       this.$refs.xTable.insertAt(record, row).then(({ row }) => {
    //         this.$refs.xTable.setActiveRow(row)
    //       })
    //       this.isSave = false
    //     } else {
    //       this.$message.error('已经没有字段信息，不能继续添加')
    //     }
    //   } else {
    //     this.saveClick2(e => {
    //       if (e) {
    //         const record = {
    //           ID: 0,
    //           MST_ID: this.CurrentMainID,
    //           COLUMN_NAME: this.UnsavedData[this.defaultLength].COLUMN_NAME,
    //           COLUMN_CAPTION: this.UnsavedData[this.defaultLength]
    //             .COLUMN_CAPTION,
    //           IS_UNIQUE: this.UnsavedData[this.defaultLength].IS_UNIQUE,
    //           ISNULL_ABLE: this.UnsavedData[this.defaultLength].ISNULL_ABLE,
    //           UPDATE_BY: this.userinfo.USER_NAME,
    //           EXCEL_ITEM: this.UnsavedData[this.defaultLength].EXCEL_ITEM,
    //           REFERENCE_SQL: ''
    //         }
    //         this.$refs.xTable.insertAt(record, row).then(({ row }) => {
    //           this.$refs.xTable.setActiveRow(row)
    //         })
    //         this.isSave = false
    //       }
    //     })
    //   }
    // },
  },
  watch: {
    currentIndex () {
      this.getLoad()
    }
  }
}
</script>
