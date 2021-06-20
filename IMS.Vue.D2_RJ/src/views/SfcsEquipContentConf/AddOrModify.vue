<template>
  <d2-container>
    <template slot="header">
      <custom-container-header :isExport="false" :isExportTpl="false" :isImport="false" :isFull="true">
        <el-button icon="el-icon-back" @click.prevent="back_but">{{ $t('publics.btn.back') }}</el-button>
        <el-button
          type="success"
          icon="el-icon-circle-check"
          @click="save_but('ruleForm')"
        >{{ $t('publics.btn.save') }}</el-button>
      </custom-container-header>
    </template>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules">
          <el-form-item :label="$t('se_cc.ec')" prop="CATEGORY_ID">
            <el-select
              v-model="ruleForm.CATEGORY_ID"
              style="width:100%"
              class="filter-item"
              :placeholder="$t('se_cc.p_sec')"
            >
              <el-option
                v-for="item in deviceList"
                :key="item.LOOKUP_CODE"
                :label="item.CHINESE"
                :value="item.LOOKUP_CODE"
              />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('se_cc.mt')" prop="KEEP_TYPE">
            <el-select
              v-model="ruleForm.KEEP_TYPE"
              :placeholder="$t('se_cc.p_smt')"
              style="width:100%"
            >
              <el-option
                v-for="item in maintainList"
                :key="item.ID"
                :label="item.label"
                :value="item.ID"
                @keyup.enter.native="search_but"
              />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('se_cc.Mm')" prop="KEEP_CONTENT">
            <el-input v-model="ruleForm.KEEP_CONTENT" :placeholder="$t('se_cc.p_emd')" />
          </el-form-item>
          <el-form-item :label="$t('se_cc.mta')" prop="KEEP_TOOLS">
            <el-input v-model="ruleForm.KEEP_TOOLS" :placeholder="$t('se_cc.p_emta')" />
          </el-form-item>
          <el-form-item :label="$t('se_cc.Sn')" prop="ORDER_NO">
            <el-input v-model="ruleForm.ORDER_NO" :placeholder="$t('se_cc.p_easn')" />
          </el-form-item>
          <el-form-item :label="$t('se_cc.e')" align="center" style="text-align: left;">
            <el-switch
              v-model="ruleForm.ENABLE"
              :active-text="$t('publics.btn.yes')"
              :inactive-text="$t('publics.btn.no')"
              active-color="#13ce66"
              inactive-color="#cccccc"
              active-value="Y"
              inactive-value="N"
            />
          </el-form-item>
          <el-form-item label>
            <el-button
              type="primary"
              icon="el-icon-circle-plus-outline"
              @click="add_img_but"
            >{{$t('se_cc.ap')}}</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="12" class="SfcsEquipContentConf-table">
        <vxe-table
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
          :loading="loading"
          :data="mainTable"
          :mouse-config="{selected: true}"
          :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
        >
          <vxe-table-column field="ORDER_NO" :title="$t('se_cc.sn')" />
          <vxe-table-column field="RESOURCE_NAME" :title="$t('se_cc.rn')" />
          <vxe-table-column field="RESOURCE_SIZE" :title="$t('se_cc.rs')">
            <template v-slot="{row}">{{row.RESOURCE_SIZE}}KB</template>
          </vxe-table-column>
          <vxe-table-column  field="RESOURCE_SIZE" :title="$t('se_cc.operate')">
            <template slot-scope="scope">
              <el-button
                type="danger"
                size="mini"
                @click="remove_but(scope, scope.$index)"
              >{{$t('se_cc.delete')}}</el-button>
              <el-button
                type="success"
                size="mini"
                @click="setCurrent(scope.row)"
              >{{$t('se_cc.preview')}}</el-button>
            </template>
          </vxe-table-column>
        </vxe-table>
        <el-dialog
          :close-on-click-modal="false"
          v-dialogDrag
          top="0"
          :visible.sync="centerDialogVisible"
          width="60%"
          :title="$t('se_cc.pp')"
        >
          <img :src="img_url + img" alt="加载失败" style="width:100%" />
        </el-dialog>
      </el-col>
    </el-row>
    <el-dialog :close-on-click-modal="false" v-dialogDrag :title="$t('se_cc.ap')" :visible.sync="dialogVisible" width="60%"  :before-close="closeMyself">
      <el-upload
        ref="upload"
        multiple
        :file-list="fileList"
        :headers="handleUploadHeader()"
        :action="upload_url"
        list-type="picture-card"
        :auto-upload="true"
        :on-remove="handleRemove"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"

      >
        <i slot="default" class="el-icon-plus" />

      </el-upload>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancellation_but">{{$t('publics.btn.cancel')}}</el-button>
        <el-button type="primary" @click="confirm_but">{{$t('publics.btn.makeSure')}}</el-button>
      </span>
    </el-dialog>
    <!-- 预览图片 -->
    <el-dialog :close-on-click-modal="false" v-dialogDrag :visible.sync="dialogVisibleimg" width="60%" top="0">
      <img width="100%" :src="img_url + dialogImageUrl" alt />
    </el-dialog>
  </d2-container>
</template>

<script>
import customContainerHeader from '@/components/custom-container-header'
import {
  AddOrModify,
  LoadEditData,
  AddOrModifySave,
  LoadImgList
} from '@/api/SfcsEquipContentConf'
import Bus from '@/plugin/bus'
export default {
  components: {
    customContainerHeader
  },
  data () {
    return {
      ruleForm: {
        ID: 0,
        KEEP_TYPE: undefined,
        CATEGORY_ID: undefined,
        KEEP_CONTENT: undefined,
        KEEP_TOOLS: undefined,
        ORDER_NO: undefined,
        ENABLE: undefined,
        RESOURCE_LIST: []
      },
      remove: {
        RESOURCE_LIST: []
      },
      rules: {
        KEEP_TYPE: [
          {
            required: true,
            message: this.$t('se_cc.p_smt'),
            trigger: 'blur'
          }
        ],
        CATEGORY_ID: [
          {
            required: true,
            message: this.$t('se_cc.p_sec'),
            trigger: 'blur'
          }
        ],
        KEEP_CONTENT: [
          {
            required: true,
            message: this.$t('se_cc.p_emd'),
            trigger: 'blur'
          }
        ],
        KEEP_TOOLS: [
          {
            required: true,
            message: this.$t('se_cc.p_emta'),
            trigger: 'blur'
          }
        ],
        ORDER_NO: [
          {
            required: true,
            message: this.$t('se_cc.p_easn'),
            trigger: 'blur'
          }
        ]
      },
      deviceList: [],
      maintainList: [
        {
          ID: 0,
          label: this.$t('se_cc.dm')
        },
        {
          ID: 1,
          label: this.$t('se_cc.mm')
        },
        {
          ID: 2,
          label: this.$t('se_cc.am')
        },
        {
          ID: 3,
          label: this.$t('se_cc.wm')
        },
        {
          ID: 4,
          label: this.$t('se_cc.sm')
        }
      ],
      mainTable: [],
      loading: false,
      dialogVisible: false,
      upload_url:
        process.env.VUE_APP_API + 'SfcsEquipContentConf/UploadImage',
      centerDialogVisible: false,
      img: '',
      img_url: process.env.VUE_APP_BASE_IMG,
      dialogVisibleimg: false,
      dialogImageUrl: '',
      disabled: false,
      fileList: []
    }
  },
  created () {
    Bus.$on('EditID', val => {
      if (val > 0) {
        this.getLoadEditData(val)
        this.getLoadImgList(val)
      } else {
        this.clear()
      }
      this.getAddOrModify()
    })
    this.getAddOrModify()
    console.log('ruleForm.KEEP_TYP', this.ruleForm.KEEP_TYP)
  },
  methods: {
    getAddOrModify () {
      AddOrModify().then(res => {
        this.deviceList = res.Result ? res.Result : []
      })
    },
    getLoadEditData (id) {
      LoadEditData(id).then(res => {
        const data = JSON.parse(res.Result)
        console.log(data, '获取信息')
        this.ruleForm.ID = data.Result.ID
        this.ruleForm.KEEP_TYPE = data.Result.KEEP_TYPE
        this.ruleForm.CATEGORY_ID = data.Result.CATEGORY_ID
        this.ruleForm.KEEP_CONTENT = data.Result.KEEP_CONTENT
        this.ruleForm.KEEP_TOOLS = data.Result.KEEP_TOOLS
        this.ruleForm.ORDER_NO = data.Result.ORDER_NO
        this.ruleForm.ENABLE = data.Result.ENABLE
      })
    },
    // 获取图片资源列表
    getLoadImgList (id) {
      LoadImgList(id).then(res => {
        this.mainTable = JSON.parse(res.Result)
      })
    },
    save_but (formName) {
      console.log(this.ruleForm)
      this.$refs[formName].validate(valid => {
        if (valid) {
          AddOrModifySave(this.ruleForm)
            .then(res => {
              if (res.Result) {
                this.$notify({
                  title: this.$t('se_cc._3'),
                  message: this.$t('se_cc._2'),
                  type: 'success',
                  duration: 2000
                })
                this.$emit('close')
              }
            })
        } else {
          return false
        }
      })
    },
    // 添加图片
    add_img_but () {
      this.dialogVisible = true
    },
    // 上传图片前
    beforeAvatarUpload (file) {
      const isJPG =
        file.type === 'image/jpeg' ||
        file.type === 'image/jpg' ||
        file.type === 'image/png' ||
        file.type === 'image/gif'
      const isLt2M = file.size / 1024 / 1024 < 20
      if (!isJPG) {
        this.$message.error(this.$t('se_cc._4'))
      }
      if (!isLt2M) {
        this.$message.error(this.$t('se_cc._5'))
      }
      return isJPG && isLt2M
    },
    // 上传成功后
    handleAvatarSuccess (response) {
      if (response.ErrorInfo.Status) {
        this.$message({
          type: 'error',
          message: response.ErrorInfo.Message
        })
      } else if (response.Result) {
        this.mainTable.push(response.Result)
        this.ruleForm.RESOURCE_LIST = this.mainTable
        console.log(response.Result)
        this.$message({
          type: 'success',
          message: this.$t('se_cc._1')
        })
      }
    },
    // 上传图片后是否删除
    handleRemove (file, fileList) {
      this.ruleForm.RESOURCE_LIST.splice(file.index, 1)
    },
    closeMyself () {
      this.$refs.upload.clearFiles()
      this.dialogVisible = false
    },
    // 确定
    confirm_but () {
      this.$refs.upload.clearFiles()
      this.dialogVisible = false
    },
    // 取消
    cancellation_but () {
      this.$refs.upload.clearFiles()
      this.dialogVisible = false
    },
    // 图片预览
    handlePictureCardPreview (file) {
      console.log(file)
      this.dialogImageUrl = file.response.Result.RESOURCE_URL
      this.dialogVisibleimg = true
    },
    // 预览
    setCurrent (row) {
      console.log(row)
      this.img = row.RESOURCE_URL
      this.centerDialogVisible = true
    },
    remove_but (scope, index) {
      if (scope) {
        console.log(scope)
        this.$confirm(
          this.$t('se_cc.a_ysywtdtrod'),
          this.$t('IpqaMst.IpqaMstList.prompt'),
          {
            confirmButtonText: this.$t('IpqaMst.IpqaMstList.confirm'),
            cancelButtonText: this.$t('IpqaMst.IpqaMstList.cancel'),
            type: 'warning'
          }
        ).then(() => {
          //  this.remove.RESOURCE_LIST
          this.mainTable.splice(index, 1)
          this.$notify({
            title: this.$t('IpqaMst.IpqaMstList.success'),
            message: this.$t('IpqaMst.IpqaMstList.sudeleted'),
            type: 'success',
            duration: 2000
          })
        })
      } else {
        return false
      }
    },
    // 清空
    clear () {
      this.ruleForm = {
        ID: 0,
        KEEP_TYPE: undefined,
        CATEGORY_ID: undefined,
        KEEP_CONTENT: undefined,
        KEEP_TOOLS: undefined,
        ORDER_NO: undefined,
        ENABLE: 'N'
      }
    },
    // 返回
    back_but () {
      this.$emit('close')
    }
  }
}
</script>

<style>
.SfcsEquipContentConf-table{
  height: calc(100vh - 175px);
}
</style>
