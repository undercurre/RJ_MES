<template>
  <d2-container>
    <!-- 头部 -->
    <template slot="header">
      <custom-container-header>
        <el-select v-model="formData.APPLY_NO"
                   :placeholder="$t('FileApplication._1')"
                   clearable>
          <el-option v-for="item in ManagementNumberList"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value" />
        </el-select>
        <el-select v-model="formData.PART_CODE"
                   :placeholder="$t('FileApplication._2')"
                   clearable>
          <el-option v-for="item in FinishedProductList"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value" />
        </el-select>
        <el-select v-model="formData.WO_NO"
                   :placeholder="$t('FileApplication._3')"
                   clearable>
          <el-option v-for="item in WorkOrderList"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value" />
        </el-select>
        <el-button type="primary"
                   icon="el-icon-search"
                   @click.prevent="searchClick">{{ $t("plbd.hd_sf") }}</el-button>
        <el-button type="success"
                   @click="addClick"
                   icon="el-icon-plus"
                   v-if="$btnList.indexOf('SaveBurnFileApplyAndRelationAdd') !== -1">{{ $t("plbd.add") }}</el-button>
        <el-button type="primary"
                   v-if="$btnList.indexOf('FileManagement') !== -1"
                   @click="dialogFileVisible = true">{{ $t("BurnFile._14") }}</el-button>
      </custom-container-header>
    </template>
    <!-- 上表 -->
    <div class="ConfirmTable-container">
      <vxe-table ref="xTable"
                 border
                 resizable
                 height="100%"
                 size="medium"
                 align="center"
                 highlight-hover-row
                 auto-resize
                 keep-source
                 stripe
                 :loading="loading"
                 :data="mainTable"
                 :mouse-config="{ selected: true }"
                 :edit-config="{ trigger: 'click', mode: 'row', showStatus: true }"
                 :radio-config="{ labelField: 'name', trigger: 'row' }"
                 :checkbox-config="{ checkField: 'checked', trigger: 'row' }"
                 @cell-click="cellClick">
        <vxe-table-column show-overflow
                          :title="$t('ukas._27')"
                          type="radio"
                          min-width="60"
                          align="center"
                          fixed="left" />
        <vxe-table-column min-width="160"
                          field="APPLY_NO"
                          :title="$t('FileApplication._4')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
        <vxe-table-column min-width="200"
                          field="PART_CODE"
                          :title="$t('FileApplication._5')"
                          :edit-render="{ name: 'input' }" />
        <vxe-table-column min-width="150"
                          field="WO_NO"
                          :title="$t('FileApplication._6')"
                          :edit-render="{ name: 'input' }" />
        <vxe-table-column min-width="150"
                          field="USER_NAME"
                          :title="$t('FileApplication._7')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
        <vxe-table-column min-width="150"
                          field="CREATE_TIME"
                          :title="$t('FileApplication._8')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
        <vxe-table-column min-width="150"
                          field="MODIFY_TIME"
                          :title="$t('FileApplication._9')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
        <vxe-table-column :title="$t('sdr_le.tb_og')"
                          min-width="100"
                          align="center"
                          fixed="right">
          <template v-slot="{ row }">
            <el-button type="primary"
                       @click="editClick(row, row.$index)"
                       v-if="$btnList.indexOf('SaveBurnFileApplyAndRelationEdit') !== -1">{{ $t("FileApplication._10") }}</el-button>
          </template>
        </vxe-table-column>
      </vxe-table>
    </div>
    <!-- 分页 -->
    <div class="ConfirmPagination">
      <el-pagination :current-page="formData.Page"
                     :page-size="formData.Limit"
                     :page-sizes="[15, 25, 35, 45]"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="totalPage"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange" />
    </div>
    <!-- 下表 -->
    <div class="bottomTable-container">
      <vxe-table ref="bTable"
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
                 :data="mainTable2"
                 :mouse-config="{ selected: true }"
                 :radio-config="{ labelField: 'name', trigger: 'row' }"
                 :edit-config="{ trigger: 'click', mode: 'row', showStatus: true }">
        <vxe-table-column min-width="150"
                          field="CODE"
                          :title="$t('FileApplication._11')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
        <vxe-table-column min-width="150"
                          field="TPYE"
                          :title="$t('FileApplication._12')"
                          :edit-render="{ autofocus: '.custom-input', type: 'visible' }">
          <template v-slot:edit="{ row }">
            <span v-if="row === 1">{{ $t("FileApplication._13") }}</span>
            <span v-else>{{ $t("FileApplication._14") }}</span>
          </template>
        </vxe-table-column>
        <vxe-table-column min-width="150"
                          field="PATH"
                          :title="$t('FileApplication._15')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
        <vxe-table-column min-width="150"
                          field="FILENAME"
                          :title="$t('FileApplication._16')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
        <vxe-table-column min-width="150"
                          field="CREATE_TIME"
                          :title="$t('FileApplication._8')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
      </vxe-table>
    </div>
    <!-- 新增/编辑 -->
    <el-dialog :close-on-click-modal="false"
               v-dialogDrag
               :title="$t('FileApplication._17')"
               width="80%"
               :visible.sync="dialogTableVisible">
      <el-form :model="addForm"
               ref="ruleForm"
               :show-message="false"
               :rules="addRules"
               label-width="190px">
        <el-row>
          <el-col :span="8">
            <el-form-item :label="$t('FileApplication._4')">
              <el-input v-model="addForm.APPLY_ID"
                        disabled />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('FileApplication._5')"
                          prop="PART_CODE">
              <el-input v-model="addForm.PART_CODE"
                        :disabled="!isNew" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('FileApplication._6')"
                          prop="WO_NO">
              <el-input v-model="addForm.WO_NO"
                        :disabled="!isNew" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-row :gutter="20">
        <el-col :span="11">
          <div style="height: 350px">
            <vxe-table ref="_xTable"
                       border
                       resizable
                       height="100%"
                       size="medium"
                       align="center"
                       highlight-current-row
                       highlight-hover-row
                       show-overflow
                       auto-resize
                       keep-source
                       :data="peopleList">
              <vxe-table-column type="checkbox"
                                width="55" />
              <vxe-table-column :title="$t('FileApplication._18')"
                                align="center"
                                field="CODE" />
              <vxe-table-column :title="$t('FileApplication._15')"
                                align="center"
                                field="PATH" />
              <vxe-table-column :title="$t('FileApplication._12')"
                                align="center"
                                field="TYPE">
                <template slot-scope="{ row }">
                  <span v-if="row === 1">{{ $t("FileApplication._13") }}</span>
                  <span v-else>{{ $t("FileApplication._14") }}</span>
                </template>
              </vxe-table-column>
              <vxe-table-column :title="$t('FileApplication._16')"
                                align="center"
                                field="FILENAME" />
            </vxe-table>
          </div>
          <div style="margin-top: 10px">
            <el-pagination :pager-count="5"
                           :current-page="formData2.Page"
                           :page-size="formData2.Limit"
                           :page-sizes="[10, 20, 30, 40]"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="formData2.totalPage"
                           @size-change="listQuerySizeChange"
                           @current-change="listQueryCurrentChange" />
          </div>
        </el-col>
        <el-col :span="2"
                style="text-align: center; padding: 0">
          <div style="
                display: flex;
                justify-content: center;
                align-items: center;
              ">
            <el-button type="primary"
                       icon="el-icon-arrow-left"
                       @click="removeChecked"></el-button>
            <el-button type="primary"
                       icon="el-icon-arrow-right"
                       @click="makeSureChecked"></el-button>
          </div>
        </el-col>
        <el-col :span="11">
          <div style="height: 350px">
            <vxe-table ref="_xTable2"
                       border
                       resizable
                       height="100%"
                       size="medium"
                       align="center"
                       highlight-current-row
                       highlight-hover-row
                       show-overflow
                       auto-resize
                       keep-source
                       :data="checkedUserList">
              <vxe-table-column type="checkbox"
                                width="55" />
              <vxe-table-column :title="$t('FileApplication._18')"
                                align="center"
                                field="CODE" />
              <vxe-table-column :title="$t('FileApplication._15')"
                                align="center"
                                field="PATH" />
              <vxe-table-column :title="$t('FileApplication._16')"
                                align="center"
                                field="FILENAME" />
            </vxe-table>
          </div>
        </el-col>
      </el-row>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogTableVisible = false">{{
          $t("ssc_rd.cancel")
        }}</el-button>
        <el-button type="primary"
                   @click="submitModifyForm">{{
          $t("ssc_rd.sure")
        }}</el-button>
      </span>
    </el-dialog>
    <el-dialog :close-on-click-modal="false"
               v-dialogDrag
               top="0"
               :title="$t('文件管理')"
               width="100%"
               style="width: 100%;height: 100%;"
               :visible.sync="dialogFileVisible">
      <File style="width: 100%;height: 100%;" />
    </el-dialog>

  </d2-container>
</template>

<script>
import pagination from '@/views/mixin/page'
import customContainerHeader from '@/components/custom-container-header'
import { mapGetters } from 'vuex'
import {
  FileApplyLoadData,
  SaveBurnFileApplyAndRelation,
  Index,
  ApplyRelationLoadData,
  GetApplyNo,
  FileManagerLoadData
} from '@/api/FileApplication'
export default {
  name: 'FileApplication',
  components: {
    customContainerHeader,
    File: () => import('./File.vue')
  },
  mixins: [pagination],
  computed: {
    ...mapGetters(['userinfo'])
  },
  data () {
    return {
      formData: {
        Page: 1,
        Limit: 15
      },
      formData2: {
        Page: 1,
        Limit: 10,
        totalPage: 0
      },
      loading: false,
      mainTable: [],
      mainTable2: [],
      form: {
        ApplyModel: { InsertRecords: [], UpdateRecords: [], RemoveRecords: [] },
        RelationArrary: []
      },
      dialogTableVisible: false,
      ListParams: [],
      ListParamsBox: [],
      isReplace: undefined,
      ManagementNumberList: [],
      FinishedProductList: [],
      WorkOrderList: [],
      staffTemp: {
        phone: '',
        nickName: '',
        staffTypeId: ''
      },
      peopleList: [],
      checkedUserList: [], // 右列表
      options: [],
      nowSelectData: [], // 左边选中列表数据
      nowSelectRightData: [], // 右边选中列表数据
      staffData: [],
      selectedStaffData: [],
      tableKey: 0,
      rowKey: 'rowKey',
      addForm: {},
      addRules: {
        PART_CODE: [
          {
            required: true,
            message: this.$t('FileApplication._21'),
            trigger: 'blur'
          }
        ],
        WO_NO: [
          {
            required: true,
            message: this.$t('FileApplication._22'),
            trigger: 'blur'
          }
        ]
      },
      isNew: undefined,
      APPLY_NO: -1,
      checkedIds: [],
      havdCheckUsersList: [],
      defaultCheckedUserList: [],
      dialogFileVisible: false

    }
  },
  created () {
    this.getLoadData(1)
  },
  methods: {
    makeSureChecked () {
      console.log('往右this.checkedIds', this.checkedIds)
      // 获取选中的数据
      const arr = this.$refs._xTable.getCheckboxRecords()
      console.log('选中的数据arr:', arr)
      arr.map((item) => {
        if (this.checkedIds.indexOf(item.ID) === -1) {
          this.checkedIds.push(item.ID)
          this.defaultCheckedUserList.push(item)
        }
      })
      this.checkedUserList = this.checkedUserList.length > 0 ? this.checkedUserList.concat(this.defaultCheckedUserList) : this.defaultCheckedUserList
      this.defaultCheckedUserList = []
      // 清空所有行的选中状态
      this.$refs._xTable.setAllCheckboxRow(false)
    },
    removeChecked () {
      this.$refs._xTable2.getCheckboxRecords().map((item, index) => {
        this.$refs._xTable2.remove(item)
      })
      this.checkedIds = []
      this.$refs._xTable2.getTableData().tableData.map(item => {
        this.checkedIds.push(item.ID)
      })
      console.log('往左this.checkedIds', this.checkedIds)
      this.checkedUserList = this.$refs._xTable2.getTableData().tableData
    },
    listQuerySizeChange (Limit) {
      this.formData2.Page = 1
      this.formData2.Limit = Limit
      this.getFileManagerLoadData()
    },
    listQueryCurrentChange (Page) {
      this.formData2.Page = Page
      this.getFileManagerLoadData()
    },
    // 从后台获取左边表格的数据
    async getFileManagerLoadData () {
      const res = await FileManagerLoadData(this.formData2)
      this.peopleList = res.Result ? res.Result : []
      this.formData2.totalPage = res.TotalCount || 0

      // if (!this.isNew) {
      //   // console.log(this.checkedUserList)
      //   const AlreadyArr = []
      //   this.checkedUserList.map((item) => {
      //     AlreadyArr.push(item.CODE)
      //   })
      //   // console.log(AlreadyArr)
      //   let newArr = this.peopleList.filter((item, index, arr) => {
      //     return AlreadyArr.indexOf(item.CODE) === -1
      //   })
      //   this.peopleList = newArr
      //   console.log('newArr', newArr)
      // }
    },
    async getLoadData (num) {
      this.loading = true
      const res = await FileApplyLoadData(this.formData)
      if (res.Result) {
        const data = res.Result
        if (num === 1) {
          data.map((item) => {
            this.ManagementNumberList.push({
              label: item.APPLY_NO,
              value: item.APPLY_NO,
              disabled: false
            })
            this.FinishedProductList.push({
              label: item.PART_CODE,
              value: item.PART_CODE,
              disabled: false
            })
            this.WorkOrderList.push({
              label: item.WO_NO,
              value: item.WO_NO,
              disabled: false
            })
          })
        }
        this.mainTable = data
        this.totalPage = res.TotalCount
        this.loading = false
      }
      this.loading = false
    },
    async getIndex () {
      const res = await Index()
      const data = res.Result.ListParams
      this.ListParams = data || []
      data.map((item) => {
        this.ListParamsBox.push({
          label: item.VALUE,
          value: item.CODE,
          disabled: false
        })
      })
    },
    cellClick (e) {
      console.log(e)
      this.APPLY_NO = e.row.APPLY_NO
      this.getApplyRelationLoadData(this.APPLY_NO)
    },
    async getApplyRelationLoadData (e) {
      const res = await ApplyRelationLoadData({ APPLY_NO: e })
      if (!this.isNew) {
        this.checkedUserList = res.Result ? res.Result : []
        res.Result.map(item => {
          this.checkedIds.push(item.BFMANAGER_ID)
        })
      }
      this.mainTable2 = res.Result ? res.Result : []
    },
    // 提交
    submitModifyForm () {
      this.$refs.ruleForm.validate(async (valid, errInfo) => {
        if (valid) {
          this.form = {
            ApplyModel: {
              InsertRecords: [],
              UpdateRecords: [],
              RemoveRecords: []
            },
            RelationArrary: [
              { InsertRecords: [], UpdateRecords: [], RemoveRecords: [] }
            ]
          }
          if (this.isNew) {
            this.addForm.APPLY_NO = this.addForm.APPLY_ID
            delete this.addForm.APPLY_ID
            console.log(this.addForm)
            this.form.ApplyModel.InsertRecords.push(this.addForm)
            this.form.RelationArrary[0].InsertRecords = []
            this.checkedUserList.map((item) => {
              delete item.CODE
              delete item.FILENAME
              delete item.PATH
              delete item.REMARK
              delete item.TYPE
              delete item.STATUS
              delete item.WO_NO
              delete item.B_CREATE_TIME
              item.BURN_FILE_ID =
                item.BFMANAGER_ID === undefined ? item.ID : item.BFMANAGER_ID
              item.ID = 0
              delete item.BFMANAGER_ID
              delete item.CREATE_TIME
              item.APPLY_ID = this.addForm.ID
              delete item.BFAPPLY_ID
              item.STATUS = 0
              delete item.PART_CODE
              delete item.ROWNO
              delete item.APPLY_NO
              this.form.RelationArrary[0].InsertRecords.push(item)
            })
            delete this.form.ApplyModel.UpdateRecords
            delete this.form.ApplyModel.RemoveRecords
          } else {
            this.addForm.APPLY_NO = this.addForm.APPLY_ID
            delete this.addForm.APPLY_ID
            this.form.ApplyModel.UpdateRecords.push(this.addForm)
            this.form.RelationArrary[0].UpdateRecords = []
            this.checkedUserList.map((item) => {
              item.USER_NAME = this.userinfo.USER_NAME
              delete item.CODE
              delete item.FILENAME
              delete item.PATH
              delete item.REMARK
              delete item.TYPE
              delete item.STATUS
              delete item.WO_NO
              delete item.B_CREATE_TIME
              item.BURN_FILE_ID =
                item.BFMANAGER_ID === undefined ? item.ID : item.BFMANAGER_ID
              // item.ID = 0
              delete item.BFMANAGER_ID
              delete item.CREATE_TIME
              item.APPLY_ID = this.addForm.ID
              delete item.BFAPPLY_ID
              item.STATUS = 0
              delete item.PART_CODE
              delete item.ROWNO
              delete item.APPLY_NO
              this.form.RelationArrary[0].UpdateRecords.push(item)
            })
            delete this.form.ApplyModel.InsertRecords
            delete this.form.ApplyModel.RemoveRecords
          }
          console.log(JSON.stringify(this.form))
          // console.log(this.form)
          SaveBurnFileApplyAndRelation(this.form).then((res) => {
            if (res.Result === true) {
              this.dialogTableVisible = false
              this.getLoadData()
              this.getApplyRelationLoadData(this.APPLY_NO)
              this.$notify({
                title: this.$t('crss._20'),
                message: this.$t('crss._21'),
                type: 'success',
                duration: 2000
              })
            }
            this.dialogTableVisible = false
          })
        } else {
          try {
            Object.keys(errInfo).forEach(item => {
              this.$message.error(errInfo[item][0].message)
              throw new Error(new Date().toLocaleString())
            })
          } catch { }
        }
      })
    },
    // 查询
    searchClick () {
      this.formData.Page = 1
      this.getLoadData()
    },
    // 新增
    async addClick () {
      this.formData2 = {
        Page: 1,
        Limit: 10,
        totalPage: 0
      }
      this.getFileManagerLoadData()
      this.isNew = true
      this.addForm = {}
      this.addForm.USER_NAME = this.userinfo.USER_NAME
      const res = await GetApplyNo()
      this.addForm.ID = res.Result ? res.Result.ID : 0
      this.addForm.APPLY_ID = res.Result ? res.Result.No : ''
      this.checkedUserList = []
      this.defaultCheckedUserList = []
      this.checkedIds = []
      this.dialogTableVisible = true
    },
    // 编辑
    async editClick (row) {
      // console.log(row)
      this.isNew = false
      this.checkedIds = []
      await this.getApplyRelationLoadData(row.APPLY_NO)
      this.getFileManagerLoadData()
      this.$set(this.addForm, 'ID', row.ID)
      this.$set(this.addForm, 'APPLY_ID', row.APPLY_ID)
      this.$set(this.addForm, 'PART_CODE', row.PART_CODE)
      this.$set(this.addForm, 'WO_NO', row.WO_NO)
      this.$set(this.addForm, 'USER_NAME', this.userinfo.USER_NAME)
      // this.addForm.ID = row.ID
      // this.addForm.APPLY_ID = row.APPLY_NO
      // this.addForm.PART_CODE = row.PART_CODE
      // this.addForm.WO_NO = row.WO_NO
      // this.addForm.USER_NAME = this.userinfo.USER_NAME
      this.dialogTableVisible = true
      console.log('dwsa', this.checkedIds)
    }
    // 保存
    // saveClick () {
    //   var that = this
    //   var postdata = this.$refs.xTable.getRecordset()
    //   if (
    //     postdata.insertRecords.length ||
    //     postdata.updateRecords.length ||
    //     postdata.removeRecords.length
    //   ) {
    //     this.$refs.xTable.validate((valid) => {
    //       if (valid) {
    //         this.form.InsertRecords = postdata.insertRecords
    //         this.form.UpdateRecords = postdata.updateRecords
    //         this.form.RemoveRecords = postdata.removeRecords
    //         // const data = this.form
    //         this.form.UpdateRecords.map((item) => {
    //           delete item.CREATE_TIME
    //           delete item.MODIFY_TIME
    //         })
    //         this.form.RemoveRecords.map((item) => {
    //           delete item.CREATE_TIME
    //           delete item.MODIFY_TIME
    //         })
    //         SaveBurnFileApplyAndRelation(this.form).then((res) => {
    //           if (res.Result === true) {
    //             that.getLoadData()
    //             that.$notify({
    //               title: this.$t('crss._20'),
    //               message: this.$t('crss._21'),
    //               type: 'success',
    //               duration: 2000
    //             })
    //           }
    //         })
    //       }
    //     })
    //   }
    // },
    // 删除
    // removeClick (row) {
    //   this.$confirm(
    //     this.$t('publics.tips.makeSureDelete'),
    //     this.$t('MesTongsApply._91'),
    //     {
    //       confirmButtonText: this.$t('MesTongsApply._92'),
    //       cancelButtonText: this.$t('MesTongsApply._93'),
    //       type: 'warning'
    //     }
    //   )
    //     .then(async () => {
    //       this.form = {
    //         ApplyModel: {
    //           InsertRecords: [],
    //           UpdateRecords: [],
    //           RemoveRecords: []
    //         },
    //         RelationArrary: {
    //           InsertRecords: [],
    //           UpdateRecords: [],
    //           RemoveRecords: []
    //         }
    //       }
    //       this.$refs.xTable.remove(row)
    //       // this.submitModifyForm()
    //       let postdata = this.$refs.xTable.getRecordset()
    //       if (postdata.removeRecords.length) {
    //         this.form.ApplyModel.RemoveRecords = postdata.removeRecords
    //         SaveBurnFileApplyAndRelation(this.form).then((res) => {
    //           if (res.Result === true) {
    //             this.dialogTableVisible = false
    //             this.getLoadData()
    //             this.$notify({
    //               title: this.$t('crss._20'),
    //               message: this.$t('crss._21'),
    //               type: 'success',
    //               duration: 2000
    //             })
    //           }
    //           this.dialogTableVisible = false
    //         })
    //       }
    //     })
    //     .catch(() => {
    //       this.$message({
    //         type: 'info',
    //         message: this.$t('MesTongsApply._95')
    //       })
    //     })
    // },
  }
}
</script>
<style lang="scss" scoped>
.ConfirmTable-container {
  height: calc(100vh - 60px - 41px - 53px - 300px);
}
.ConfirmPagination {
  margin: 10px 0;
}
.bottomTable-container {
  height: calc(100vh - 60px - 41px - 53px - 300px - 42px - 45px);
}
.opSetting {
  // text-align: center;
  // margin-top: 30px;
}
.spacing {
  margin-top: 10px;
}
</style>
