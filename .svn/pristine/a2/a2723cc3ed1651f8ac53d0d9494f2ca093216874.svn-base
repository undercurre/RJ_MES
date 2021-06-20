<template>
  <d2-container class="SfcsPrintFiles">
    <!-- 头部 -->
    <template slot="header">
      <custom-container-header :isExport="false"
                               :isExportTpl="false"
                               :isImport="false">
        <el-input v-model="formData.FILE_NAME"
                  :placeholder="$t('SfcsPrintFiles._1')"
                  clearable
                  style="width: 200px"
                  @keyup.enter.native="searchClick" />&nbsp;
        <el-select v-model="formData.LABEL_TYPE"
                   clearable
                   :placeholder="$t('SfcsPrintFiles._2')">
          <div style="
              height: 34px;
              padding: 0 20px;
              display: flex;
              position: sticky;
              top: 0;
              background: #fff;
              z-index: 9;
              border-bottom: 1px solid rgb(229, 231, 237);
            ">
            <span style="
                width: 60%;
                box-size: border-box;
                padding-right: 10px;
                color: #606266;
                line-height: 34px;
                font-size: 14px;
              ">{{ $t("SfcsProductPallet._6") }}</span>
            <span style="
                width: 40%;
                color: #606266;
                line-height: 34px;
                font-size: 14px;
                box-size: border-box;
                padding-left: 10px;
                border-left: 1px solid rgb(229, 231, 237);
              ">{{ $t("SfcsProductPallet._7") }}</span>
          </div>
          <el-option style="width: 360px; display: flex"
                     v-for="item in LableTypeList"
                     :key="item.LOOKUP_CODE"
                     :value="item.LOOKUP_CODE"
                     :label="item.CHINESE">
            <span style="
                width: 60%;
                box-size: border-box;
                padding-right: 10px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              ">{{ item.DESCRIPTION }}</span>
            <span style="
                width: 40%;
                box-size: border-box;
                padding-left: 10px;
                border-left: 1px solid rgb(229, 231, 237);
              ">{{ item.CHINESE }}</span>
          </el-option>
        </el-select>&nbsp;
        <el-button type="primary"
                   icon="el-icon-search"
                   @click.prevent="searchClick">{{ $t("publics.btn.search") }}</el-button>&nbsp;
        <el-button type="success"
                   icon="el-icon-check"
                   @click.prevent="saveClick"
                   v-if="$btnList.indexOf('SfcsPrintFilesSave') !== -1">{{ $t("publics.btn.save") }}</el-button>&nbsp;
        <el-button type="danger"
                   icon="el-icon-delete"
                   @click.prevent="removeClick()">{{ $t("SfcsProductPallet.clean") }}</el-button>
        <el-button type="primary"
                   v-if="$btnList.indexOf('TemplateData') !== -1"
                   @click.prevent="Template">{{ $t("SfcsPrintFiles._21") }}</el-button>&nbsp;
      </custom-container-header>
    </template>
    <div class="UploadBox">
      <div>
        <span style="
            display: block;
            color: #606266;
            font-size: 14px;
            border-bottom: 1px solid #cfd7e5;
            padding: 5px 0 5px 10px;
            background-color: #f8f8f9;
          ">{{ $t("SfcsPrintFiles._3") }}</span>
      </div>
      <el-form ref="newData"
               :model="newData"
               size="mini"
               class="cusyom-x-form">
        <el-row>
          <!-- 左边 -->
          <el-col :span="12">
            <el-form-item :label="$t('SfcsPrintFiles._4')"
                          style="margin-top: 10px">
              <el-input size="mini"
                        :disabled="disabledName"
                        v-model="newData.FILE_NAME"
                        :placeholder="$t('SfcsPrintFiles._5')"
                        @keyup.enter.native="checkClick" />
            </el-form-item>
            <el-form-item :label="$t('SfcsPrintFiles._6')">
              <el-select size="mini"
                         style="width: 100%"
                         v-model="newData.LABEL_TYPE"
                         :placeholder="$t('SfcsPrintFiles._7')"
                         :disabled="disabled">
                <el-option v-for="item in typeBox"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('SfcsPrintFiles._8')"
                          class="clearfix">
              <el-select size="mini"
                         style="width: 100%"
                         v-model="newData.ENABLED"
                         :placeholder="$t('SfcsPrintFiles._9')"
                         :disabled="disabled">
                <el-option v-for="item in activationBox"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('SfcsPrintFiles._10')"
                          class="clearfix">
              <el-input type="textarea"
                        :rows="3"
                        :placeholder="$t('SfcsPrintFiles._11')"
                        v-model="newData.DESCRIPTION"
                        :disabled="disabled" />
            </el-form-item>
            <el-form-item :label="$t('SfcsPrintFiles._12')">
              <el-input v-model="getPathform.fileUrl"
                        :disabled="true" />
            </el-form-item>
            <el-form-item style="margin-left: 20%">
              <template>
                <el-upload :disabled="disabled"
                           ref="upload"
                           :action="uploadPhoto_url"
                           :before-upload="beforeUploadFile"
                           :on-success="handleFileSuccess"
                           :show-file-list="false"
                           :headers="handleUploadHeader()"
                           :data="FileID"
                           name="File">
                  <el-button size="small"
                             type="primary"
                             :disabled="disabled">{{
                    $t("SfcsPrintFiles._13")
                  }}</el-button>
                </el-upload>
              </template>
            </el-form-item>
          </el-col>
          <!-- 右边 -->
          <el-col :span="12">
            <div>
              <span style="
                  display: block;
                  color: #606266;
                  font-size: 14px;
                  padding: 10px 0 5px 0;
                ">{{ $t("SfcsPrintFiles._14") }}</span>
            </div>
            <el-form-item>
              <template>
                <el-upload :disabled="disabled"
                           ref="uploadPhoto"
                           class="avatar-uploader"
                           :action="uploadPhoto_url"
                           :show-file-list="false"
                           :before-upload="beforeUploadPhoto"
                           :on-success="handlePhotoSuccess"
                           :data="photoID"
                           :headers="handleUploadHeader()"
                           name="Photo">
                  <img v-if="getPathform.photoUrl"
                       :src="getPathform.photoUrl"
                       :alt="$t('se.ftl')"
                       width="250px" />
                  <span v-else>{{ $t("se.np") }}</span>
                </el-upload>
                <div class="upload-button">
                  <el-button :disabled="disabled"
                             type="primary"
                             size="small"
                             style="width: 128%"
                             @click="uploadPhotoClick">{{ $t("SfcsPrintFiles._15") }}</el-button>
                </div>
              </template>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!-- 表格 -->
    <div class="SfcsPrintFiles-content">
      <vxe-table ref="xTable"
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
                          min-width="80"
                          align="center"
                          fixed="left" />
        <vxe-table-column width="254"
                          field="FILE_NAME"
                          :title="$t('SfcsPrintFiles._4')" />
        <vxe-table-column width="254"
                          field="LABEL_TYPE"
                          :title="$t('SfcsPrintFiles._16')"
                          :edit-render="{
            name: 'select',
            options: typeBox,
            attrs: { disabled: true },
          }" />
        <!-- <vxe-table-column width="255"
                          field="DESCRIPTION"
                          :title="$t('SfcsPrintFiles._10')" /> -->
        <vxe-table-column width="255"
                          field="DESCRIPTION"
                          :title="$t('SfcsPrintFiles._10')">
          <template v-slot="{ row }">
            <span v-if="row.DESCRIPTION == 'undefined'"></span>
            <span v-else>{{row.DESCRIPTION}}</span>
          </template>
        </vxe-table-column>

        <vxe-table-column width="254"
                          :title="$t('SfcsPrintFiles._17')">
          <template v-slot="{ row }">
            <a @click="downloadClick(row)"
               target="_blank">{{
              $t("SfcsPrintFiles._19")
            }}</a>
          </template>
        </vxe-table-column>
        <vxe-table-column width="254"
                          field="ENABLED"
                          :title="$t('SfcsPrintFiles._8')" />
      </vxe-table>
      <div class="pagination">
        <el-pagination :current-page="formData.Page"
                       :page-size="formData.Limit"
                       :page-sizes="[15, 25, 35, 45]"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="totalPage"
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange" />
      </div>
    </div>
    <el-dialog :title="$t('SfcsPrintFiles._21')"
               :visible.sync="TemplateShow"
               width="60%"
               ref="TemplateRef"
               :close-on-click-modal="false">
      <el-form ref="TemRefForm"
               label-width="140px"
               :model="TemplateForm"
               :show-message="false"
               :rules="validRules">
        <el-form-item :label="$t('SfcsPrintFiles._22')"
                      prop="FILE_CONTENT">
          <el-input type="textarea"
                    :rows="20"
                    height=400px
                    v-model="TemplateForm.FILE_CONTENT"
                    placeholder=" "></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           style="text-align: center;">
        <el-button @click="TemplateShow = false">
          {{
          $t("_kanban._4")
          }}
        </el-button>
        <el-button type="primary"
                   @click="TemplateSubmit">
          {{
          $t("_kanban._5")
          }}
        </el-button>
      </div>
    </el-dialog>
  </d2-container>
</template>

<script>
import customContainerHeader from '@/components/custom-container-header'
import {
  Index,
  LoadData,
  GetPathByType,
  IsExistFileNmae,
  UploadImageAndSave,
  GetPrintFilesDetail,
  SavePrintFilesDetail
} from '@/api/SfcsPrintFiles'
import { mapGetters } from 'vuex'
import downloadjs from 'downloadjs'
export default {
  name: 'SfcsPrintFiles',
  components: {
    customContainerHeader
  },
  data () {
    return {
      formData: {
        FILE_NAME: '', // 文件名
        LABEL_TYPE: null, // 标签类选
        Page: 1,
        Limit: 15,
        Key: '',
        ...this.formData
      },
      LableTypeList: [], // 标签类选
      newData: {
        ID: 0,
        FILE_NAME: '', // 文件名
        LABEL_TYPE: null, // 标签类选
        DESCRIPTION: '', // 描述
        ENABLED: 'Y',
        ...this.newData
      },
      disabled: true,
      loading: false,
      mainTable: [],
      totalPage: 0,
      typeBox: [],
      activationBox: [
        { value: 'Y', label: 'Y' },
        { value: 'N', label: 'N' }
      ],
      getPathform: {
        fileUrl: undefined,
        photoUrl: undefined
      },
      uploadPhoto_url:
        process.env.VUE_APP_API + 'SfcsPrintFiles/UploadImageAndSave',
      getPhoto_url: process.env.VUE_APP_BASE_IMG,
      getUrlForm: {
        type: '',
        id: ''
      },
      disabledName: false,
      photoID: {
        // FILE_NAME: '', // 文件名
        // LABEL_TYPE: null, // 标签类选
        // DESCRIPTION: '', // 描述
        // ENABLED: '',
        // id: null
      },
      FileID: {
        // FILE_NAME: '', // 文件名
        // LABEL_TYPE: null, // 标签类选
        // DESCRIPTION: '', // 描述
        // ENABLED: '',
        // id: null
      },
      TemplateShow: false,
      TemplateForm: {
        CREATE_USER: '',
        FILE_CONTENT: '',
        ID: 0,
        PRINT_FILES_ID: 0
      },
      TemData: null,
      validRules: {
        FILE_CONTENT: [{
          required: true,
          message: this.$t('SfcsPrintFiles._23'),
          trigger: 'blur'
        }]
      }
    }
  },
  computed: {
    ...mapGetters(['userinfo'])
  },
  created () {
    this.TemplateForm.CREATE_USER = this.userinfo.USER_NAME
    this.getIndex()
  },
  methods: {
    async Template () {
      console.log(this.TemData, '==this.TemData')
      if (this.TemData === null) {
        this.$message.error(this.$t('SfcsPrintFiles._24'))
        return
      }
      // 1 流水号标签 4 周转箱标签
      if (this.TemData.LABEL_TYPE === 1 || this.TemData.LABEL_TYPE === 4) {
        this.$message.error(this.$t('SfcsPrintFiles._25'))
        return
      }
      this.TemplateForm.PRINT_FILES_ID = this.TemData.ID
      const res = await GetPrintFilesDetail({ PRINT_FILES_ID: this.TemData.ID })
      const data = res.Result
      if (data) {
        this.TemplateForm.FILE_CONTENT = data.FILE_CONTENT || ''
        this.TemplateForm.ID = data.ID
        // this.TemplateForm.PRINT_FILES_ID = data.PRINT_FILES_ID
      }
      this.TemplateShow = true
    },
    async TemplateSubmit () {
      this.TemplateForm.CREATE_TIME = this.getNowDate(new Date())
      this.$refs.TemRefForm.validate((valid, errInfo) => {
        if (valid) {
          SavePrintFilesDetail(this.TemplateForm).then(res => {
            if (res.Result) {
              this.$notify({
                title: this.$t('ssc_rd.me_su'),
                message: this.$t('ssc_rd.me_suf'),
                type: 'success',
                duration: 2000
              })
              this.TemData = null
              this.TemplateForm = {
                CREATE_USER: this.userinfo.USER_NAME,
                FILE_CONTENT: '',
                ID: 0,
                PRINT_FILES_ID: 0
              }
              // this.formData.Page = 1
              this.getLoadData()
              this.TemplateShow = false
            }
          })
        } else {
          try {
            Object.keys(errInfo).forEach(item => {
              this.$message.error(errInfo[item][0].message)
              throw Error(errInfo[item][0].message)
            })
          } catch (e) { }
        }
      })
    },
    async getIndex () {
      const res = await Index()
      this.LableTypeList = res.Result ? res.Result.LableTypeList : []
    },
    async getLoadData (num) {
      if (num === 2) {
        // 新增
        this.typeBox = []
        this.LableTypeList.map((item) => {
          this.typeBox.push({
            value: item.LOOKUP_CODE,
            label: item.CHINESE
          })
        })
      } else {
        this.loading = true
        const res = await LoadData(this.formData)
        this.loading = false
        const data = res.Result
        this.mainTable = data || []
        this.totalPage = res.TotalCount
        this.typeBox = []
        this.LableTypeList.map((item) => {
          this.typeBox.push({
            value: item.LOOKUP_CODE,
            label: item.CHINESE
          })
        })
        if (num === 1) {
          const mainTableData = this.mainTable[0]
          this.newData.DESCRIPTION = mainTableData.DESCRIPTION
          this.newData.LABEL_TYPE = mainTableData.LABEL_TYPE
          this.newData.ENABLED = mainTableData.ENABLED
          this.newData.ID = mainTableData.ID
          this.getPathByType(mainTableData.ID)
        }
      }
    },
    // 查询
    searchClick () {
      this.formData.Page = 1
      this.TemData = null
      this.getLoadData()
    },
    // 检查文件名是否重复
    async checkClick (row) {
      if (row.target.value === '') {
        this.$message({
          message: this.$t('SfcsPrintFiles._1'),
          type: 'error'
        })
        this.disabled = true
      } else {
        const res = await IsExistFileNmae({ FileNmae: row.target.value })
        console.log('检查结果', res.Result)
        this.disabledName = true
        if (res.Result === true) {
          this.disabled = false
          this.formData.FILE_NAME = row.target.value
          this.getLoadData(1)
        } else if (res.Result === false) {
          // 新增
          this.disabled = false
          this.newData = {}
          this.newData.ENABLED = 'Y'
          this.newData.FILE_NAME = row.target.value
          this.newData.ID = 0
          this.photoID.FILE_NAME = row.target.value
          this.FileID = {}
          this.FileID.FILE_NAME = row.target.value
          this.getLoadData(2)
        }
      }
    },
    // 保存
    async saveClick () {
      // if (!this.newData.FILE_VERSION_DATE) return this.$message.error(this.$t('SfcsPrintFiles._20'))
      console.log('this.newData', this.newData)
      const res = await UploadImageAndSave(this.newData)
      if (res.Result) {
        this.$notify({
          title: this.$t('ssc_rd.me_su'),
          message: this.$t('ssc_rd.me_suf'),
          type: 'success',
          duration: 2000
        })
        this.removeClick()
        this.getLoadData()
      }
    },
    // 清除
    removeClick () {
      this.formData = {}
      this.mainTable = []
      this.newData = {}
      this.getPathform.photoUrl = undefined
      this.disabled = true
      this.disabledName = false
      this.getPathform.fileUrl = ''
      this.TemData = null
    },
    handleSizeChange (val) {
      this.formData.Limit = val
      this.getLoadData()
    },
    handleCurrentChange (val) {
      this.formData.Page = val
      this.getLoadData()
    },
    uploadPhotoClick () {
      document.querySelector('.avatar-uploader .el-upload__input').click()
    },
    // 上传文件前
    beforeUploadFile (file) {
      console.log('22222222222', file)
      let fileName = file.name.lastIndexOf('.')
      let fileNameLength = file.name.length
      let fileFormat = file.name.substring(fileName + 1, fileNameLength)
      console.log('格式：', fileFormat)
      this.FileID.LABEL_TYPE = this.newData.LABEL_TYPE
      this.FileID.DESCRIPTION = this.newData.DESCRIPTION
      this.FileID.ENABLED = this.newData.ENABLED
      return true
      // if (fileFormat !== 'btw' ) {
      //   this.$message.error(this.$t('SfcsPrintFiles._20'))
      //   return false
      // } else {
      //   this.FileID.LABEL_TYPE = this.newData.LABEL_TYPE
      //   this.FileID.DESCRIPTION = this.newData.DESCRIPTION
      //   this.FileID.ENABLED = this.newData.ENABLED
      //   return true
      // }
    },
    // 上传文件成功
    handleFileSuccess (response) {
      if (response.ErrorInfo.Status) {
        this.$message({
          message: response.ErrorInfo.Message,
          type: 'error'
        })
      } else {
        this.$message({
          type: 'success',
          message: this.$t('se.picsucc')
        })
        console.log(response)
        this.newData.ID = response.Result.ID
        this.getPathform.fileUrl = response.Result.FileName
        this.newData.FILE_VERSION_DATE = this.getNowDate(new Date())
        // console.log('=========== ', this.getPathform.fileUrl)
        this.getPathByType(this.FileID.ID)
      }
    },
    // 上传图片前
    beforeUploadPhoto (file) {
      this.photoID.LABEL_TYPE = this.newData.LABEL_TYPE
      this.photoID.DESCRIPTION = this.newData.DESCRIPTION
      this.photoID.ENABLED = this.newData.ENABLED
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/jpg'
      if (!isJPG) {
        this.$message.error(this.$t('SfcsPrintFiles._18'))
      }
      return isJPG
    },
    // 上传图片成功
    handlePhotoSuccess (response) {
      if (response.ErrorInfo.Status === true) {
        this.$message({
          message: response.ErrorInfo.Message,
          type: 'error'
        })
      } else {
        this.$message({
          type: 'success',
          message: this.$t('se.picsucc')
        })
        this.$refs.uploadPhoto.clearFiles()
        this.$set(
          this.getPathform,
          'photoUrl',
          response.Result.ImgUrl + '?' + this.createHash(6)
        ) // url 一样 数据不变 视图不刷新 所以加个哈希
        // this.getPathByType(this.photoID.ID)
      }
    },
    createHash (hashLength) {
      // 默认长度 24
      return Array.from(Array(Number(hashLength) || 24), () =>
        Math.floor(Math.random() * 36).toString(36)
      ).join('')
    },
    cellClick (e) {
      this.TemData = e.row
      console.log(this.TemData, 'this.TemData')
      const row = e.row
      this.getPathform.fileUrl = row.ORIGINAL_FILE_NAME
      console.log('e=================', e)
      this.disabled = false
      this.newData = { ...row }
      this.photoID = { ...row }
      this.FileID = { ...row }
      this.disabledName = true
      this.getPathByType(row.ID)
    },
    // 获取地址信息
    async getPathByType (ID) {
      this.getUrlForm.type = 'Photo'
      this.getUrlForm.id = ID
      const res = await GetPathByType(this.getUrlForm)
      if (res.Result) {
        this.getPathform.photoUrl = res.Result.Base64
        console.log('图片地址', this.getPathform.photoUrl)
        this.getPathByType2(this.getUrlForm.id)
      } else {
        this.getPathform.photoUrl = ''
      }
    },
    async getPathByType2 (ID) {
      this.getUrlForm.type = 'File'
      this.getUrlForm.id = ID
      const res = await GetPathByType(this.getUrlForm)
      this.getPathform.fileUrl = res.Result
      // console.log('文件地址', this.getPhoto_url + this.getPathform.fileUrl)
    },
    // 下载
    downloadClick (row) {
      console.log('row,', row)
      // const aObj = document.createElement('a')
      this.getUrlForm.type = 'File'
      this.getUrlForm.id = row.ID
      GetPathByType(this.getUrlForm).then((res) => {
        if (res.Result) {
          // aObj.href = this.getPhoto_url + res.Result
          // window.open(aObj.href)
          downloadjs(res.Result.Base64, row.FILE_NAME + res.Result.FileType)
          console.log(res.Result)
        }
      })
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
<style lang="scss" scoped>
.UploadBox {
  height: calc(100vh - 480px);
  border: 1px solid #cfd7e5;
}
.SfcsPrintFiles-content {
  height: calc(100vh - 550px);
  margin-top: 20px;
}
.pagination {
  margin-top: 20px;
}
.avatar-uploader {
  width: 128%;
  height: 189px;
  margin-bottom: 10px;
  border: 1px solid #cfd7e5;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
a {
  cursor: pointer;
}
</style>
<style>
.SfcsPrintFiles .el-form-item--mini .el-form-item__content,
.SfcsPrintFiles .el-form-item--mini .el-form-item__label {
  display: inline-block;
}
.SfcsPrintFiles .el-form-item__label {
  width: 20%;
}
.SfcsPrintFiles .el-form-item__content {
  width: 77%;
}

.SfcsPrintFiles .el-input--mini .el-input__inner {
  height: 28px !important;
}
</style>
