<template>
  <custom-container class="CheckMarker">
    <template slot="header">
      <custom-container-header :isExport="false"
                               :isExportTpl="false"
                               :isImport="false">
        <el-select v-model="listQuery.LINE_ID"
                   style="width: 150px"
                   clearable
                   :placeholder="$t('SfcsEquipKeep._2')"
                   class="common-top">
          <el-option v-for="item in LinesList"
                     :key="item.ID"
                     :label="item.LINE_NAME"
                     :value="item.ID" />
        </el-select>
        <el-input v-model="listQuery.WO_NO"
                  style="width: 150px"
                  :placeholder="$t('CutomersComplaint.WO_NO')"
                  clearable
                  class="common-top"
                  @keyup.enter.native="search_but" />
        <el-input v-model="listQuery.PART_NO"
                  style="width: 150px"
                  :placeholder="$t('CutomersComplaint.PART_NO')"
                  clearable
                  class="common-top"
                  @keyup.enter.native="search_but" />
        <el-button type="primary"
                   icon="el-icon-search"
                   class="common-top"
                   @click.prevent="search_but">{{ $t("SfcsEquipKeep._8") }}</el-button>
        <el-button type="success"
                   icon="el-icon-plus"
                   class="common-top"
                   @click.prevent="add_but">{{ $t("SfcsEquipKeep._9") }}</el-button>
        <el-button type="primary"
                   icon="el-icon-edit"
                   class="common-top"
                   @click.prevent="edit_but">{{ $t("SfcsEquipKeep._10") }}</el-button>
        <el-button v-if="$btnList.indexOf('SfcsEquipKeepdelete') == -1"
                   type="danger"
                   icon="el-icon-delete"
                   class="common-top"
                   @click="remove_but()">{{ $t("SfcsEquipKeep._11") }}</el-button>
        <el-button v-if="$btnList.indexOf('SfcsEquipKeepAudit') !== -1"
                   type="primary"
                   icon="el-icon-circle-check"
                   class="common-top"
                   @click.prevent="review_but">{{ $t("SfcsEquipKeep._12") }}</el-button>
        <el-button v-if="$btnList.indexOf('SfcsEquipKeepRefuse') !== -1"
                   type="danger"
                   icon="el-icon-close"
                   class="common-top"
                   @click.prevent="refuse_but">{{ $t("SfcsEquipKeep._13") }}</el-button>
        <el-button type="primary"
                   icon="el-icon-upload2"
                   class="common-top"
                   @click="head_upload_but">附件管理</el-button>
      </custom-container-header>
    </template>
    <div class="out-table-container">
      <el-table v-loading="listLoading"
                border
                stripe
                highlight-current-row
                auto-resize
                :data="LoadData"
                style="width: 100%; border-bottom: 1px solid #dfe6ec"
                :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
                @row-click="openDetails">
        <el-table-column :label="$t('SfcsEquipKeep._82')"
                         min-width="80"
                         align="center">
          <template slot-scope="scope">
            <el-radio v-model="radio"
                      class="radio"
                      :label="scope.$index" />
          </template>
        </el-table-column>

        <el-table-column min-width="130"
                         prop="LINE_NAME"
                         :label="$t('CutomersComplaint.LINE_NAME')"
                         align="center"
                         :show-overflow-tooltip="true" />
        <el-table-column min-width="130"
                         prop="WO_NO"
                         :label="$t('CutomersComplaint.WO_NO')"
                         align="center"
                         :show-overflow-tooltip="true" />
        <el-table-column min-width="130"
                         prop="CUSTOMER"
                         :label="$t('CutomersComplaint.CUSTOMERS')"
                         align="center"
                         :show-overflow-tooltip="true" />
        <el-table-column min-width="130"
                         prop="PART_NO"
                         :label="$t('CutomersComplaint.PART_NO')"
                         align="center"
                         :show-overflow-tooltip="true" />
        <el-table-column min-width="130"
                         prop="MODEL"
                         :label="$t('CutomersComplaint.MODEL')"
                         align="center"
                         :show-overflow-tooltip="true" />
        <el-table-column min-width="140"
                         prop="PRODUCT_DATE"
                         :label="$t('CutomersComplaint.PRODUCT_DATE')"
                         align="center"
                         :show-overflow-tooltip="true" />
        <el-table-column min-width="80"
                         prop="REWORK_QTY"
                         :label="$t('CutomersComplaint.REWORK_QTY')"
                         align="center"
                         :show-overflow-tooltip="true" />
        <el-table-column min-width="80"
                         prop="RETURN_QTY"
                         :label="$t('CutomersComplaint.RETURN_QTY')"
                         align="center"
                         :show-overflow-tooltip="true" />
        <el-table-column min-width="120"
                         prop="CONTENT"
                         :label="$t('CutomersComplaint.CONTENT')"
                         align="center"
                         :show-overflow-tooltip="true" />
        <el-table-column min-width="120"
                         prop="CAUSE"
                         :label="$t('CutomersComplaint.CAUSE')"
                         align="center"
                         :show-overflow-tooltip="true" />
        <el-table-column min-width="120"
                         prop="INTERIM_MEASURES"
                         :label="$t('CutomersComplaint.INTERIM_MEASURES')"
                         align="center"
                         :show-overflow-tooltip="true" />
        <el-table-column min-width="120"
                         prop="LONG_MEASURES"
                         :label="$t('CutomersComplaint.LONG_MEASURES')"
                         align="center"
                         :show-overflow-tooltip="true" />
        <el-table-column min-width="120"
                         prop="REMARKS"
                         :label="$t('CutomersComplaint.REMARKS')"
                         align="center"
                         :show-overflow-tooltip="true" />
        <el-table-column min-width="140"
                         prop="COMPLAINT_DATE"
                         :label="$t('CutomersComplaint.COMPLAINT_DATE')"
                         align="center"
                         :show-overflow-tooltip="true" />
        <el-table-column min-width="140"
                         prop="CREATE_TIME"
                         :label="$t('CutomersComplaint.CREATE_TIME')"
                         align="center"
                         :show-overflow-tooltip="true" />
        <el-table-column min-width="120"
                         prop="CREATE_USER"
                         :label="$t('CutomersComplaint.CREATE_USER')"
                         align="center"
                         :show-overflow-tooltip="true">
        </el-table-column>
      </el-table>
    </div>
    <div style="padding: 10px 10px; border-left: 1px solid #eee">
      <el-pagination ref="pagi"
                     class="SfcsEquipKeep-pagination"
                     :current-page="listQuery.Page"
                     :page-sizes="[15, 25, 35, 45]"
                     :page-size="listQuery.Limit"
                     :total="total"
                     layout="total, sizes, prev, pager, next, jumper"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange" />
    </div>
    <!-- 添加图片 -->
    <el-dialog v-dialogDrag
               :title="$t('SOPRoutes._97')"
               :close-on-click-modal="false"
               :visible.sync="PrimarydialogVisible"
               width="60%">
      <el-upload ref="upload"
                 multiple
                 :action="upload_url"
                 list-type="picture-card"
                 :auto-upload="true"
                 :on-success="primaryAvatarSuccess"
                 :before-upload="beforeAvatarUpload"
                 :on-preview="handlePictureCardPreview"
                 :headers="head"
                 :on-remove="handleRemove"
                 :file-list="fileList"
                 :before-close="handleClose">
        <i slot="default"
           class="el-icon-plus" />
        <div slot="file"
             style="height: 100%"
             slot-scope="{ file }">
          <img class="el-upload-list__item-thumbnail"
               :src="'data:image/png;base64,' + file.url"
               alt />
          <span class="el-upload-list__item-actions">
            <span class="el-upload-list__item-preview"
                  @click="handlePictureCardPreview(file)">
              <i class="el-icon-zoom-in"></i>
            </span>
            <!--        <span
          class="el-upload-list__item-delete"
          @click="handleDownload(file)"
        >
          <i class="el-icon-download"></i>
        </span> -->
            <span class="el-upload-list__item-delete"
                  @click="handleRemove(file)">
              <i class="el-icon-delete"></i>
            </span>
          </span>
        </div>
      </el-upload>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="cancellation_but">{{
          $t("SOPRoutes._48")
        }}</el-button>
        <el-button type="primary"
                   @click="confirm_but">{{
          $t("SOPRoutes._31")
        }}</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible"
               title="图片预览"
               width="80%">
      <img width="100%"
           :src="'data:image/png;base64,' + dialogImageUrl"
           alt="" />
    </el-dialog>
  </custom-container>
</template>
<style>
.CheckMarker .radio .el-radio__label {
  display: none;
}
</style>
<script>
import {
  LoadData,
  Delete,
  GetPhotoList,
  Index,
  DeleteFile
} from '@/api/SfcsCutomersComplaint'
import customContainer from '@/components/custom-container'
import customContainerHeader from '@/components/custom-container-header'
import { mapGetters } from 'vuex'
export default {
  name: 'CheckMarker',
  components: {
    customContainerHeader,
    customContainer
  },
  computed: {
    ...mapGetters(['userinfo'])
  },
  created () {
    this.getIndex()
    this.getLoadData()
  },
  data () {
    return {
      // 添加图片
      PrimarydialogVisible: false,
      listLoading: false,
      deviceType: [],
      section: [
        {
          KEEP_TYPE: 0,
          label: this.$t('SfcsEquipKeep._20')
        },
        {
          KEEP_TYPE: 1,
          label: this.$t('SfcsEquipKeep._21')
        },
        {
          KEEP_TYPE: 2,
          label: this.$t('SfcsEquipKeep._22')
        }
      ],
      LinesList: [],
      sort: [
        {
          ID: '0',
          SBU_CHINESE: this.$t('SfcsEquipKeep._25')
        },
        {
          ID: '1',
          SBU_CHINESE: this.$t('SfcsEquipKeep._26')
        },
        {
          ID: '3',
          SBU_CHINESE: this.$t('SfcsEquipKeep._27')
        },
        {
          ID: '4',
          SBU_CHINESE: this.$t('SfcsEquipKeep._28')
        }
      ],
      sectionval: '',
      lineval: '',
      sortval: '',
      productval: '',
      pickerOptions: {
        shortcuts: [
          {
            text: this.$t('SfcsEquipKeep._74'),
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: this.$t('SfcsEquipKeep._75'),
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: this.$t('SfcsEquipKeep._76'),
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      value2: '',
      total: 0,
      listQuery: {
        Page: 1, // 当前页
        Limit: 15, // 分页大小
        Key: null, // 搜索关键字
        KEEP_USER: '',
        CATEGORY: '',
        STATION_ID: '',
        KEEP_TYPE: '',
        KEEP_CHECK_STATUS: '',
        create_begin: '',
        create_end: ''
      },
      dialogImageUrl: '',
      dialogVisible: false,
      LoadData: [],
      selected: '',
      tableval: [],
      fileList: [],
      radio: '',
      reviewVal: {
        ID: '',
        Operator: ''
      },
      passing: {
        ID: 0
      },
      upload_url: '',
      // 工序子表图片值
      imgPriVal: {
        mst_id: '',
        category: 1,
        resource_id: 0
      },
      head: {}
    }
  },
  methods: {
    // 获取下拉菜单
    async getIndex () {
      const res = await Index()
      const data = res.Result
      this.deviceType = data.CategoryList
      this.LinesList = data.LinesList
    },
    // 获取信息列表
    async getLoadData () {
      this.listLoading = true
      const res = await LoadData(this.listQuery)
      if (res.Result) {
        const data = JSON.parse(res.Result)
        this.LoadData = data
        this.total = res.TotalCount
      }
      this.listLoading = false
    },
    // 点击获取表格一行数据
    openDetails (row, column, event) {
      this.tableval = row
      this.radio = this.LoadData.indexOf(row)
      this.getPhtotData(this.tableval.ID)
    },
    async getPhtotData (ID) {
      const res = await GetPhotoList(ID)
      if (res.Result) {
        const data = JSON.parse(res.Result)
        this.fileList = data
      }
    },
    // 删除
    remove_but () {
      if (this.tableval.length === 0) {
        this.$message({
          showClose: true,
          message: this.$t('SfcsEquipKeep._77'),
          type: 'warning'
        })
      } else {
        this.$confirm(
          this.$t('SfcsEquipKeep._78'),
          this.$t('SfcsEquipKeep._70'),
          {
            type: 'warning'
          }
        )
          .then(() => {
            Delete(this.tableval.ID).then((res) => {
              if (res.Result) {
                this.getLoadData()
                this.$notify({
                  title: this.$t('IpqaMst.IpqaMstList.success'),
                  message: this.$t('IpqaMst.IpqaMstList.sudeleted'),
                  type: 'success',
                  duration: 2000
                })
              }
            })
          })
          .catch(() => {
            // this.$message(this.$t('IpqaMst.IpqaMstList.opecanc'))
          })
      }
    },

    // 搜索
    search_but () {
      this.listQuery.create_begin = this.value2[0]
      this.listQuery.create_end = this.value2[1]
      this.listQuery.Page = 1
      this.getLoadData()
    },
    // 添加
    add_but () {
      this.$emit('close')
      this.$nextTick(function () {
        this.Bus.emit('Edit', -1, 4)
      })
    },
    // 编辑
    edit_but () {
      if (this.tableval.length === 0) {
        this.$message({
          showClose: true,
          message: this.$t('SfcsEquipKeep._79'),
          type: 'warning'
        })
      } else {
        this.passing.ID = this.tableval.ID
        this.$emit('close')
        this.$nextTick(function () {
          this.Bus.emit('Edit', this.tableval)
        })
      }
    },
    // 上传图片
    primary_upload_but (row) {
      if (this.tableval.length === 0) {
        this.$message({
          showClose: true,
          message: this.$t('SfcsEquipKeep._79'),
          type: 'warning'
        })
      }
      this.PrimarydialogVisible = true
    },
    // 文件列表移除文件时的钩子
    async handleRemove (file) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          ac()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })

      var ac = async () => {
        await DeleteFile(file.ID)
        this.fileList.splice(
          this.fileList.findIndex((p) => p.ID === file.ID),
          1
        )
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }
    },
    confirm_but () {
      this.PrimarydialogVisible = false
    },
    cancellation_but () {
      this.PrimarydialogVisible = false
    },
    handleSizeChange (val) {
      this.listQuery.Limit = val
      this.getLoadData()
    },
    handleCurrentChange (val) {
      this.listQuery.Page = val
      this.getLoadData()
    },
    // 主表显示上传图片
    head_upload_but () {
      if (this.tableval.length === 0) {
        this.$message({
          showClose: true,
          message: this.$t('SfcsEquipKeep._79'),
          type: 'warning'
        })
      }
      this.PrimarydialogVisible = true
      this.upload_url =
        process.env.VUE_APP_API +
        'SfcsCustomersComplaint/UploadImage?ID=' +
        this.tableval.ID // 明细上传图片
    },
    // 上传成功后
    primaryAvatarSuccess (response, file, fileList) {
      if (response.Result) {
        this.$message({
          type: 'success',
          message: this.$t('SOPRoutes._110')
        })
        fileList.splice(fileList.length - 1, 1)
        var obj = JSON.parse(response.Result)
        this.fileList.push(obj.data[0])
      }
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
        this.$message.error(this.$t('SOPRoutes._108'))
      }
      if (!isLt2M) {
        this.$message.error(this.$t('SOPRoutes._109'))
      }
      return isJPG && isLt2M
    },
    handleClose () {
      this.$refs.upload.clearFiles()
    },
    // 点击文件列表中已上传的文件时的钩子
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.table-container {
  height: calc(100vh - 60px - 74px - 30px) !important;
}
</style>
