<template>
  <d2-container>
    <template slot="header">
      <custom-container-header>
        <el-select v-model="formData.CODE"
                   :placeholder="$t('BurnFile._1')"
                   clearable>
          <el-option v-for="item in ManagementNumberList"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value" />
        </el-select>
        <el-select v-model="formData.FILENAME"
                   :placeholder="$t('BurnFile._2')"
                   clearable>
          <el-option v-for="item in FileNameList"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value" />
        </el-select>
        <el-select v-model="formData.TYPE"
                   clearable
                   :placeholder="$t('BurnFile._3')">
          <el-option v-for="item in ListParams"
                     :key="item.CODE"
                     :label="item.VALUE"
                     :value="item.CODE" />
        </el-select>&nbsp;
        <el-button type="primary"
                   icon="el-icon-search"
                   @click.prevent="searchClick">{{ $t('plbd.hd_sf') }}</el-button>
        <el-button type="success"
                   @click="addClick"
                   icon="el-icon-plus"
                   v-if="$btnList.indexOf('SavBurnFileManagerAdd') !== -1">{{ $t('plbd.add') }}</el-button>
      </custom-container-header>
    </template>
    <div class="table-container">
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
                 :mouse-config="{selected: true}"
                 :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
                 :radio-config="{labelField: 'name', trigger: 'row'}"
                 :checkbox-config="{checkField: 'checked', trigger: 'row'}">
        <!-- <vxe-table-column
          show-overflow
          :title="$t('ukas._27')"
          type="radio"
          min-width="80"
          align="center"
          fixed="left"
        />-->
        <vxe-table-column min-width="150"
                          field="CODE"
                          :title="$t('BurnFile._4')"
                          :edit-render="{name: '$input',props: {readonly: true}}" />
        <vxe-table-column min-width="150"
                          field="TYPE"
                          :title="$t('BurnFile._5')"
                          :edit-render="{name: '$select', options: ListParamsBox, props: {disabled: true}}" />
        <vxe-table-column min-width="150"
                          field="PATH"
                          :title="$t('BurnFile._6')"
                          :edit-render="{name: '$input',props: {readonly: true}}" />
        <vxe-table-column min-width="150"
                          field="FILENAME"
                          :title="$t('BurnFile._7')"
                          :edit-render="{name: '$input',props: {readonly: true}}" />
        <vxe-table-column min-width="150"
                          field="CREATE_TIME"
                          :title="$t('BurnFile._8')"
                          :edit-render="{name: '$input',props: {readonly: true}}" />
        <vxe-table-column :title="$t('sdr_le.tb_og')"
                          min-width="120"
                          align="center"
                          fixed="right">
          <template v-slot="{ row }">
            <el-button type="primary"
                       v-if="$btnList.indexOf('SavBurnFileManagerEdit') !== -1"
                       @click="editClick(row, row.$index)">{{ $t('publics.btn.edit') }}</el-button>
            <!-- <el-button type="danger" @click="removeClick(row, row.$index)">{{ $t('sdr_le.tb_rm') }}</el-button> -->
          </template>
        </vxe-table-column>
      </vxe-table>
    </div>
    <template slot="footer">
      <el-pagination :current-page="formData.Page"
                     :page-size="formData.Limit"
                     :page-sizes="[15, 25, 35, 45]"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="totalPage"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange" />
    </template>
    <!-- 新增 -->
    <el-dialog :close-on-click-modal="false"
               v-dialogDrag
               :title="$t('BurnFile._9')"
               width="40%"
               :visible.sync="dialogTableVisible">
      <el-form label-width="120px">
        <el-form-item :label="$t('BurnFile._10')">
          <el-input v-model="addForm.CODE"
                    disabled />
        </el-form-item>
        <el-form-item :label="$t('BurnFile._11')">
          <el-col :span="18">
            <el-select v-model="addForm.TYPE"
                       style="width:80%"
                       :placeholder="$t('BurnFile._12')"
                       @change="changeUpload">
              <el-option v-for="item in ListParams"
                         :key="item.CODE"
                         :label="item.VALUE"
                         :value="item.CODE" />
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-upload :disabled="!addForm.TYPE"
                       style="width:20%"
                       ref="upload"
                       class="avatar-uploader"
                       :action="uploadUrl"
                       :data="addForm"
                       :auto-upload="addForm.TYPE === 2?true:false"
                       :show-file-list="false"
                       :on-success="addForm.TYPE === 2?handleAvatarSuccess:''"
                       :headers="handleUploadHeader()"
                       :on-change="handleChange">
              <el-button :disabled="!addForm.TYPE"
                         icon="el-icon-upload"
                         slot="trigger"
                         type="primary">{{$t('BurnFile._13')}}</el-button>
            </el-upload>
          </el-col>
        </el-form-item>
        <el-form-item :label="$t('BurnFile._6')"
                      v-show="isUploadFiles">
          <el-input v-model="addForm.PATH"
                    :disabled="!isUploadFiles" />
        </el-form-item>
        <el-form-item :label="$t('BurnFile._7')">
          <el-input v-model="addForm.FILENAME"
                    :placeholder="$t('BurnFile._2')"
                    :disabled="!isUploadFiles" />
        </el-form-item>
      </el-form>
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
import {
  Index,
  FileManagerLoadData,
  SaveBurnFileManager,
  GetCodeNo,
  UploadImageAndSave
} from '@/api/BurnFile'
export default {
  name: 'BurnFile',
  components: {
    customContainerHeader
  },
  mixins: [pagination],
  data () {
    return {
      formData: {
        Page: 1,
        Limit: 15
      },
      loading: false,
      mainTable: [],
      ListParams: [],
      ListParamsBox: [],
      ManagementNumberList: [],
      FileNameList: [],
      form: {
        InsertRecords: [],
        UpdateRecords: [],
        RemoveRecords: []
      },
      uploadUrl:
        process.env.VUE_APP_API + 'MesBurnFileApply/UploadImageAndSave',
      dialogTableVisible: false,
      addForm: {},
      isUploadFiles: true,
      isNew: undefined,
      upLoad: false
    }
  },
  created () {
    this.getIndex()
    this.getLoadData(1)
  },
  methods: {
    async getIndex () {
      const res = await Index()
      this.ListParams = res.Result.ListParams || []
      const data = res.Result.ListParams
      data.map((item) => {
        this.ListParamsBox.push({
          label: item.VALUE,
          value: item.CODE,
          disabled: false
        })
      })
    },
    async getLoadData (num) {
      this.loading = true
      const res = await FileManagerLoadData(this.formData)
      if (res.Result) {
        if (num === 1) {
          const data = res.Result
          data.map((item) => {
            this.ManagementNumberList.push({
              label: item.CODE,
              value: item.CODE,
              disabled: false
            })
            this.FileNameList.push({
              label: item.FILENAME,
              value: item.FILENAME,
              disabled: false
            })
          })
        }
        this.mainTable = res.Result
        this.totalPage = res.TotalCount
        this.loading = false
      }
      this.loading = false
    },
    // 查询
    searchClick () {
      this.formData.Page = 1
      this.getLoadData()
    },
    // 新增
    async addClick () {
      this.addForm = {
        PATH: '',
        FILENAME: '',
        REMARK: '',
        CREATE_TIME: this.getNowDate(new Date())
      }
      this.isUploadFiles = true
      const res = await GetCodeNo()
      this.addForm.CODE = res.Result ? res.Result.No : ''
      this.addForm.ID = res.Result ? res.Result.ID : ''
      this.isNew = true
      this.dialogTableVisible = true
    },
    // 编辑
    editClick (row) {
      console.log(row)
      this.addForm = { ...row }
      this.isUploadFiles = row.TYPE === 1
      this.isNew = false
      this.dialogTableVisible = true
    },
    // 选择上传方式
    changeUpload (e) {
      this.isUploadFiles = e === 1
    },
    handleChange (file) {
      console.log('file:', file)
      // this.addForm.file = file.raw
      delete this.addForm.PATH
      delete this.addForm.REMARK
      delete this.addForm.CREATE_TIME
      delete this.addForm.FILENAME
      delete this.addForm._XID
      delete this.addForm.checked
      if (this.addForm.TYPE === 1) {
        this.addForm.FILENAME = file.name
      }
    },
    // 上传成功
    handleAvatarSuccess (response) {
      console.log(response)
      this.upLoad = true
      this.dialogTableVisible = false
      this.getLoadData()
      this.$notify({
        title: this.$t('crss._20'),
        message: this.$t('crss._21'),
        type: 'success',
        duration: 2000
      })
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
    //         SaveBurnFileManager(this.form).then((res) => {
    //           if (res.ErrorInfo.Status) {
    //             this.$message({
    //               message: res.ErrorInfo.Message,
    //               type: 'error'
    //             })
    //           } else if (res.Result === true) {
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
    //       this.$refs.xTable.remove(row)
    //       this.saveClick()
    //     })
    //     .catch(() => {
    //       this.$message({
    //         type: 'info',
    //         message: this.$t('MesTongsApply._95')
    //       })
    //     })
    // },
    submitModifyForm () {
      this.form = { InsertRecords: [], UpdateRecords: [], RemoveRecords: [] }
      if (this.addForm.TYPE === 1) {
        if (this.isNew) {
          this.form.InsertRecords.push(this.addForm)
        } else {
          this.form.UpdateRecords.push(this.addForm)
        }
        console.log(JSON.stringify(this.form))
        SaveBurnFileManager(this.form).then((res) => {
          this.upLoad = false
          this.dialogTableVisible = false
          this.getLoadData()
          this.$notify({
            title: this.$t('crss._20'),
            message: this.$t('crss._21'),
            type: 'success',
            duration: 2000
          })
        })
      } else if (this.addForm.TYPE === 2) {
        const upForm = {}
        // delete upForm.PATH
        // console.log(upForm)
        upForm.ID = this.addForm.ID
        upForm.CODE = this.addForm.CODE
        upForm.TYPE = this.addForm.TYPE
        upForm.file = this.addForm.file
        console.log(this.addForm.file)
        UploadImageAndSave(upForm).then((res) => {
          this.upLoad = false
          this.dialogTableVisible = false
          this.getLoadData()
          this.$notify({
            title: this.$t('crss._20'),
            message: this.$t('crss._21'),
            type: 'success',
            duration: 2000
          })
        })
      }
    },
    // 获取当前时间
    getNowDate (date) {
      var y = date.getFullYear()
      var m = date.getMonth() + 1
      m = m < 10 ? '0' + m : m
      var d = date.getDate()
      d = d < 10 ? '0' + d : d
      var h = date.getHours()
      h = h < 10 ? '0' + h : h
      var minute = date.getMinutes()
      minute = minute < 10 ? '0' + minute : minute
      var second = date.getSeconds()
      second = second < 10 ? '0' + second : second
      return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
    }
  }
}
</script>
