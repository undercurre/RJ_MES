<template>
  <d2-container>
    <!-- 头部 -->
    <template slot="header">
      <custom-container-header>
        <el-select v-model="formData.APPLY_NO"
                   :placeholder="'请选择申请编号'"
                   clearable>
          <el-option v-for="item in ManagementNumberList"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value" />
        </el-select>
        <el-select v-model="formData.PART_CODE"
                   :placeholder="'请选择成品料号'"
                   clearable>
          <el-option v-for="item in FinishedProductList"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value" />
        </el-select>
        <el-select v-model="formData.WO_NO"
                   :placeholder="'请选择工单'"
                   clearable>
          <el-option v-for="item in WorkOrderList"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value" />
        </el-select>
        <el-button type="primary"
                   icon="el-icon-search"
                   @click.prevent="searchClick">{{ $t('plbd.hd_sf') }}</el-button>
        <el-button type="success"
                   @click="addClick"
                   icon="el-icon-plus">{{ $t('plbd.add') }}</el-button>
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
                 :mouse-config="{selected: true}"
                 :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
                 :radio-config="{labelField: 'name', trigger: 'row'}"
                 :checkbox-config="{checkField: 'checked', trigger: 'row'}"
                 @cell-click="cellClick">
        <vxe-table-column show-overflow
                          :title="$t('ukas._27')"
                          type="radio"
                          min-width="80"
                          align="center"
                          fixed="left" />
        <vxe-table-column min-width="150"
                          field="APPLY_NO"
                          :title="'申请编号'"
                          :edit-render="{name: '$input',props: {readonly: true}}" />
        <vxe-table-column min-width="150"
                          field="PART_CODE"
                          :title="'成品料号'"
                          :edit-render="{name: 'input'}" />
        <vxe-table-column min-width="150"
                          field="WO_NO"
                          :title="'工单'"
                          :edit-render="{name: 'input'}" />
        <vxe-table-column min-width="150"
                          field="USER_NAME"
                          :title="'操作员'"
                          :edit-render="{name: '$input',props: {readonly: true}}" />
        <vxe-table-column min-width="150"
                          field="CREATE_TIME"
                          :title="'创建时间'"
                          :edit-render="{name: '$input',props: {readonly: true}}" />
        <vxe-table-column min-width="150"
                          field="MODIFY_TIME"
                          :title="'修改时间'"
                          :edit-render="{name: '$input',props: {readonly: true}}" />
        <vxe-table-column :title="$t('sdr_le.tb_og')"
                          min-width="150"
                          align="center"
                          fixed="right">
          <template v-slot="{ row }">
            <el-button type="primary"
                       @click="editClick(row, row.$index)">编辑</el-button>
            <el-button type="danger"
                       @click="removeClick(row, row.$index)">{{ $t('sdr_le.tb_rm') }}</el-button>
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
                 :mouse-config="{selected: true}"
                 :radio-config="{labelField: 'name', trigger: 'row'}"
                 :edit-config="{trigger: 'click', mode: 'row', showStatus: true}">
        <vxe-table-column min-width="150"
                          field="APPLY_NO"
                          :title="'文件编号'"
                          :edit-render="{name: '$input',props: {readonly: true}}" />
        <vxe-table-column min-width="150"
                          field="TPYE"
                          :title="'文件类型'"
                          :edit-render="{autofocus: '.custom-input', type: 'visible'}">
          <template v-slot:edit="{ row }">
            <span v-if="row === 1">上传路径</span>
            <span v-else>上传文件</span>
          </template>
        </vxe-table-column>
        <vxe-table-column min-width="150"
                          field="PATH"
                          :title="'路径'"
                          :edit-render="{name: '$input',props: {readonly: true}}" />
        <vxe-table-column min-width="150"
                          field="FILENAME"
                          :title="'文件名'"
                          :edit-render="{name: '$input',props: {readonly: true}}" />
        <vxe-table-column min-width="150"
                          field="CREATE_TIME"
                          :title="'创建时间'"
                          :edit-render="{name: '$input',props: {readonly: true}}" />
      </vxe-table>
    </div>
    <!-- 新增/编辑 -->
    <el-dialog :close-on-click-modal="false"
               v-dialogDrag
               :title="'新增/编辑'"
               width="75%"
               :visible.sync="dialogTableVisible">
      <el-form :model="addForm"
               ref="ruleForm"
               :rules="addRules"
               label-width="80px">
        <el-row>
          <el-col :span="8">
            <el-form-item :label="'申请编号'">
              <el-input v-model="addForm.APPLY_ID"
                        disabled />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="'成品料号'"
                          prop="PART_CODE">
              <el-input v-model="addForm.PART_CODE"
                        :disabled="!isNew" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="'工单'"
                          prop="WO_NO">
              <el-input v-model="addForm.WO_NO"
                        :disabled="!isNew" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-row :gutter="20">
        <el-col :span="11">
          <div style="height:350px">
            <el-table height="100%"
                      :row-key="getRowKey"
                      ref="staffTable"
                      :key="tableKey"
                      :data="staffList"
                      border
                      fit
                      highlight-current-row
                      @selection-change="handleStaffChange">
              <el-table-column type="selection"
                               :reserve-selection="true"
                               width="55"></el-table-column>
              <el-table-column label="文件编号"
                               align="center"
                               prop="CODE"></el-table-column>
              <el-table-column label="路径"
                               align="center"
                               prop="PATH"></el-table-column>
              <el-table-column label="文件类型"
                               align="center"
                               prop="TYPE">
                <template slot-scope="{row}">
                  <span v-if="row === 1">上传路径</span>
                  <span v-else>上传文件</span>
                </template>
              </el-table-column>
              <el-table-column label="文件名"
                               align="center"
                               prop="FILENAME"></el-table-column>
            </el-table>
          </div>
        </el-col>
        <el-col :span="2"
                style="text-align:center;">
          <el-button @click="removeStaff"
                     type="primary"
                     :disabled="!selectedStaffData.length"
                     icon="el-icon-arrow-left"
                     circle
                     style="margin-right: 5px;"></el-button>
          <el-button style="margin-left:5px"
                     @click="addStaff"
                     type="primary"
                     :disabled="!staffData.length"
                     icon="el-icon-arrow-right"
                     circle></el-button>
        </el-col>
        <el-col :span="11">
          <div style="height:350px">
            <el-table height="100%"
                      :row-key="getRowKey"
                      ref="selectedStaffTable"
                      :key="tableKey"
                      :data="selectedStaffList"
                      border
                      fit
                      highlight-current-row
                      @selection-change="handleSelectedStaffChange">
              <el-table-column type="selection"
                               :reserve-selection="true"
                               width="55"></el-table-column>
              <el-table-column label="文件编号"
                               align="center"
                               prop="CODE" />
              <el-table-column label="路径"
                               align="center"
                               prop="PATH" />
              <el-table-column label="文件名"
                               align="center"
                               prop="FILENAME" />
            </el-table>
          </div>
        </el-col>
      </el-row>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogTableVisible = false">{{$t('ssc_rd.cancel')}}</el-button>
        <el-button type="primary"
                   @click="submitModifyForm">{{$t('ssc_rd.sure')}}</el-button>
      </span>
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
    customContainerHeader
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
        Limit: 15
      },
      loading: false,
      mainTable: [],
      mainTable2: [],
      form: {
        ApplyModel: { InsertRecords: [], UpdateRecords: [], RemoveRecords: [] },
        RelationArrary: {
          InsertRecords: [],
          UpdateRecords: [],
          RemoveRecords: []
        }
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
      staffList: [],
      selectedStaffList: [],
      staffData: [],
      selectedStaffData: [],
      tableKey: 0,
      rowKey: 'rowKey',
      addForm: {},
      addRules: {
        PART_CODE: [
          { required: true, message: '请输入成品料号', trigger: 'blur' }
        ],
        WO_NO: [{ required: true, message: '请输入工单', trigger: 'blur' }]
      },
      isNew: undefined
    }
  },
  created () {
    this.getLoadData(1)
  },
  methods: {
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
      ApplyRelationLoadData({ APPLY_NO: e.row.APPLY_NO }).then((res) => {
        this.mainTable2 = res.Result ? res.Result : []
      })
    },
    // 提交
    submitModifyForm () {
      var postdata = this.$refs.xTable.getRecordset()
      if (
        postdata.insertRecords.length ||
        postdata.removeRecords.length ||
        postdata.updateRecords.length
      ) {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            this.form.ApplyModel.InsertRecords = postdata.insertRecords
            this.form.ApplyModel.UpdateRecords = postdata.updateRecords
            this.form.ApplyModel.RemoveRecords = postdata.removeRecords
            console.log(this.form)
            // SaveBurnFileApplyAndRelation(this.form).then((res) => {
            //   if (res.Result === true) {
            //     this.form.ApplyModel = {}
            //     this.dialogTableVisible = false
            //     this.getLoadData()
            //     this.$notify({
            //       title: this.$t('crss._20'),
            //       message: this.$t('crss._21'),
            //       type: 'success',
            //       duration: 2000
            //     })
            //   }
            //   this.dialogTableVisible = false
            // })
          }
        })
      } else {
        this.$message({
          showClose: true,
          message: this.$t('cdc._26'),
          type: 'warning'
        })
      }
    },
    // 查询
    searchClick () {
      this.formData.Page = 1
      // this.replaceForm = {
      //   ID: 0,
      //   APPLY_ID: 0,
      //   BURN_FILE_ID: 0,
      //   USER_NAME: ''
      // }
      this.getLoadData()
    },
    // 新增
    async addClick () {
      this.getFileManagerLoadData()
      this.isNew = true
      this.addForm = {}
      const res = await GetApplyNo()
      this.addForm.APPLY_ID = res.Result ? res.Result.No : ''
      this.dialogTableVisible = true
    },
    // insertEvent (row) {
    //   const record = {
    //     ID: 0,
    //     APPLY_NO: '',
    //     PART_CODE: '',
    //     WO_NO: '',
    //     USER_NAME: this.userinfo.USER_NAME
    //   }
    //   this.$refs.xTable.insertAt(record, row).then(({ row }) => {
    //     this.$refs.xTable.setActiveRow(row)
    //   })
    // },
    // 编辑
    editClick (row) {
      this.getFileManagerLoadData()
      this.isNew = false
      this.addForm.ID = row.ID
      this.addForm.APPLY_ID = row.APPLY_NO
      this.addForm.PART_CODE = row.PART_CODE
      this.addForm.WO_NO = row.WO_NO
      this.addForm.USER_NAME = this.userinfo.USER_NAME
      this.dialogTableVisible = true
    },
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
    //             this.form.ApplyModel = {}
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
    removeClick (row) {
      this.$confirm(
        this.$t('publics.tips.makeSureDelete'),
        this.$t('MesTongsApply._91'),
        {
          confirmButtonText: this.$t('MesTongsApply._92'),
          cancelButtonText: this.$t('MesTongsApply._93'),
          type: 'warning'
        }
      )
        .then(async () => {
          this.form = {
            ApplyModel: {
              InsertRecords: [],
              UpdateRecords: [],
              RemoveRecords: []
            },
            RelationArrary: {
              InsertRecords: [],
              UpdateRecords: [],
              RemoveRecords: []
            }
          }
          this.$refs.xTable.remove(row)
          // this.submitModifyForm()
          let postdata = this.$refs.xTable.getRecordset()
          if (postdata.removeRecords.length) {
            this.form.ApplyModel.RemoveRecords = postdata.removeRecords
            SaveBurnFileApplyAndRelation(this.form).then((res) => {
              if (res.Result === true) {
                this.form.ApplyModel = {}
                this.dialogTableVisible = false
                this.getLoadData()
                this.$notify({
                  title: this.$t('crss._20'),
                  message: this.$t('crss._21'),
                  type: 'success',
                  duration: 2000
                })
              }
              this.dialogTableVisible = false
            })
          }

          this.submitModifyForm()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('MesTongsApply._95')
          })
        })
    },
    // 从后台获取左边表格的数据
    async getFileManagerLoadData () {
      this.selectedStaffList = []
      const res = await FileManagerLoadData(this.formData2)
      this.staffList = res.Result ? res.Result : []
    },
    // getStaffList () {
    //   fetchStaffList(this.staffTemp).then((res) => {
    //     if (res.value.staff.length === 0) {
    //       alert('查无此人')
    //     }
    //     this.staffList = res.value.staff
    //   })
    // },
    // 将左边表格选择项存入staffData中
    handleStaffChange (rows) {
      this.staffData = []
      if (rows) {
        rows.forEach((row) => {
          if (row) {
            this.staffData.push(row)
          }
        })
      }
    },
    // 左边表格选择项移到右边
    addStaff () {
      setTimeout(() => {
        this.$refs['staffTable'].clearSelection()
        this.$refs['selectedStaffTable'].clearSelection()
      }, 0)
      this.staffData.forEach((item) => {
        this.selectedStaffList.push(item)
      })
      for (let i = 0; i < this.staffList.length; i++) {
        for (let j = 0; j < this.staffData.length; j++) {
          if (
            this.staffList[i] &&
            this.staffData[j] &&
            this.staffList[i].CODE === this.staffData[j].CODE
          ) {
            this.staffList.splice(i, 1)
          }
        }
      }
      if (this.isNew) {
        this.addForm.CODE = this.selectedStaffList.CODE
        this.addForm.ID = this.selectedStaffList.ID
        this.addForm.USER_NAME = this.userinfo.USER_NAME
        console.log('selectedStaffList:', this.addForm)
      } else {
      }
      // let repeat = false
      // this.selectedStaffList.forEach((item) => {
      //   if (this.staffData[0] && item.phone === this.staffData[0].phone) {
      //     repeat = true
      //     alert('此员工已添加')
      //   }
      // })
      // if (repeat === false) {
      //   this.staffData.forEach((item) => {
      //     this.selectedStaffList.push(item)
      //   })
      //   for (let i = 0; i < this.staffList.length; i++) {
      //     for (let j = 0; j < this.staffData.length; j++) {
      //       if (
      //         this.staffList[i] &&
      //         this.staffData[j] &&
      //         this.staffList[i].phone === this.staffData[j].phone
      //       ) {
      //         this.staffList.splice(i, 1)
      //       }
      //     }
      //   }
      // }
    },
    // 右边表格选择项移到左边
    removeStaff () {
      setTimeout(() => {
        this.$refs['staffTable'].clearSelection()
        this.$refs['selectedStaffTable'].clearSelection()
      }, 0)
      this.selectedStaffData.forEach((item) => {
        this.staffList.push(item)
      })
      for (let i = 0; i < this.selectedStaffList.length; i++) {
        for (let j = 0; j < this.selectedStaffData.length; j++) {
          if (
            this.selectedStaffList[i] &&
            this.selectedStaffData[j] &&
            this.selectedStaffList[i].CODE === this.selectedStaffData[j].CODE
          ) {
            this.selectedStaffList.splice(i, 1)
          }
        }
      }
    },
    // 将右边表格选择项存入selectedStaffData中
    handleSelectedStaffChange (rows) {
      this.selectedStaffData = []
      if (rows) {
        rows.forEach((row) => {
          if (row) {
            this.selectedStaffData.push(row)
          }
        })
      }
      // console.log('保存数据', this.selectedStaffData)
    },
    getRowKey (row) {
      return row.id
    }
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
</style>
