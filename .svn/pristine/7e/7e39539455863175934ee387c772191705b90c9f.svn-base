<template>
  <d2-container class="SOPsimple-AddOrModify"
                style="pisition: relative;height: 100%;overflow-x: hidden;">
    <div ref="headerCon"
         class="compile-nav header-container">
      <el-button icon="el-icon-back"
                 @click="back_but">{{
        $t("SOPRoutes._52")
      }}</el-button>
      <el-button v-if="mainTable.STATUS == 0 && $btnList.indexOf('SimpleSOPRoutesSave') !== -1"
                 type="primary"
                 icon="el-icon-check"
                 @click="save_but">{{ $t("SOPRoutes._53") }}</el-button>
      <el-button v-if="mainTable.STATUS == 0 && $btnList.indexOf('SimpleSOPRoutesAddoperation') !== -1"
                 type="success"
                 icon="el-icon-plus"
                 @click="add_process_but">{{ $t("SOPRoutes._54") }}</el-button>
    </div>
    <el-row ref="elRow1"
            :gutter="24"
            style="display: flex;align-items: center;">
      <el-col :span="24">
        <el-col :span="12"
                class="compile-col">
          <span class="sp-tit">{{ $t("SOPRoutes._55") }}:</span>
          <el-input v-model="mainTable.PART_NO"
                    :readonly="readonly"
                    :placeholder="$t('SOPRoutes._56')"
                    class="select"
                    @keyup.enter.native="PartNoClick" />
        </el-col>
        <el-col :span="12"
                class="compile-col"
                style="padding-right: 3px;">
          <span class="sp-tit">{{ $t("SOPRoutes._57") }}:</span>
          <el-input v-model="mainTable.ROUTE_NAME"
                    :placeholder="$t('SOPRoutes._58')"
                    class="select" />
        </el-col>
        <el-col :span="24"
                class="compile-col">
          <span class="sp-tit">{{ $t("SOPRoutes._22") }}:</span>
          <el-input type="textarea"
                    v-model="mainTable.DESCRIPTION"
                    :placeholder="$t('SOPRoutes._59')"
                    class="select" />
        </el-col>
      </el-col>
      <!-- <el-col :span="7"
              class="compile-col"
              style="padding-left: 0px;">
        <el-col :span="15"
                style="padding-left: 0px;">
          <img :src="img_url + mainTable.m_RESOURCE_URL"
               :alt="$t('SOPRoutes._60')"
               style="display: grid;width: 100%;height: 100px;border:1px solid #F2F2F2"
               v-if="mainTable.m_RESOURCE_URL" />
          <span v-else
                style="text-align: center;display: block;">
            {{$t('SOPRoutes._181')}}
          </span>
        </el-col>
        <el-col :span="9"
                style="padding-left: 0px;text-align: center;">
          <el-button v-if="mainTable.STATUS == 0 && $btnList.indexOf('SimpleSOPRoutesUploadpicture') !== -1"
                     type="success"
                     size="mini"
                     style="margin-bottom: 8px;"
                     @click="head_upload_but">{{ $t("SOPRoutes._61") }}</el-button>
          <el-button v-if="mainTable.STATUS == 0 && $btnList.indexOf('SimpleSOPRoutesEditpicture') !== -1"
                     type="primary"
                     size="mini"
                     style="margin-bottom: 8px;"
                     @click="head_edit_but">{{ $t("SOPRoutes._62") }}</el-button>
          <el-button type="success"
                     size="mini"
                     @click="head_preview_but">{{
            $t("SOPRoutes._63")
          }}</el-button>
        </el-col>
      </el-col> -->
    </el-row>
    <!-- 表格 -->
    <el-row ref="elrow"
            :gutter="24"
            style="margin-top: 30px;">
      <el-col :span="12"
              style="padding-right:5px;height: 100%;">
        <div class="SOPRoutes-row-table">
          <vxe-table ref="xTable"
                     border
                     stripe
                     keep-source
                     highlight-hover-row
                     highlight-current-row
                     show-overflow
                     width="100%"
                     height="100%"
                     :auto-resize="true"
                     :radio-config="{ labelField: 'name', trigger: 'row' }"
                     :data="PrimaryTable"
                     :edit-config="{ trigger: 'click', mode: 'row', mode: 'cell' }"
                     @cell-click="primary_cell_click">
            <vxe-table-column :title="$t('SOPRoutes._64')"
                              type="radio"
                              min-width="70"
                              align="center" />
            <vxe-table-column field="ORDER_NO"
                              :title="$t('SOPRoutes._66')"
                              :edit-render="{name: '$input', props: {type: 'number',min: '1'}}"
                              min-width="70"
                              align="center" />
            <vxe-table-column field="OPERATION_NAME"
                              :title="$t('SOPRoutes._65')"
                              min-width="150"
                              align="center" />

            <vxe-table-column field="STANDARD_HUMAN"
                              :title="$t('SOPRoutes._67')"
                              :edit-render="{name: '$input', props: {type: 'number',min: '1'}}"
                              min-width="200"
                              align="center" />
            <vxe-table-column field="STANDARD_WORK_FORCE"
                              :title="$t('SOPRoutes._68')"
                              :edit-render="{name: '$input', props: {type: 'number',min: '1'}}"
                              min-width="210"
                              align="center" />
            <vxe-table-column field="STANDARD_CAPACITY"
                              :title="$t('SOPRoutes._69')"
                              :edit-render="{name: '$input', props: {type: 'number',min: '1'}}"
                              min-width="150"
                              align="center" />
            <vxe-table-column :title="$t('SOPRoutes._70')"
                              min-width="260"
                              align="center"
                              fixed="right">
              <template v-slot="{ row }">
                <el-button v-if="mainTable.STATUS == 0 && $btnList.indexOf('SimpleSOPRoutesUploadresources') !== -1"
                           type="primary"
                           @click="primary_upload_but(row)">{{
                  $t("SOPRoutes._179")
                }}</el-button>
                <el-button type="success"
                           @click="primary_preview_but(row)">{{
                  $t("SOPRoutes._72")
                }}</el-button>
                <el-button v-if="mainTable.STATUS == 0 && $btnList.indexOf('SimpleSOPRoutesDeleteoperation') !== -1"
                           type="danger"
                           @click="primary_remove_but(row, row.$index)">{{ $t("SOPRoutes._73") }}</el-button>
              </template>
            </vxe-table-column>
          </vxe-table>
        </div>
      </el-col>
      <el-col :span="12"
              class="el_col2x"
              style="padding-left:5px;height: 100%;position: relative;">
        <el-tabs v-model="activeName"
                 height="100%;"
                 @tab-click="handleClick">
          <el-tab-pane :label="$t('SOPRoutes._180')"
                       name="operation"
                       class="AddOrModify-row-tabs">
            <el-table v-if="activeName === 'operation'"
                      :data="operaTable"
                      border
                      class="xx-tab"
                      width="100%"
                      height="100%"
                      highlight-current-row
                      :header-cell-style="{ background: '#eef1f6', color: '#606266' }">
              <el-table-column min-width="100"
                               prop="ORDER_NO"
                               :label="$t('SOPRoutes._76')"
                               align="center" />
              <el-table-column min-width="150"
                               prop="RESOURCE_NAME"
                               :label="$t('SOPRoutes._77')"
                               align="center"
                               :show-overflow-tooltip="true" />
              <el-table-column min-width="150"
                               prop="RESOURCE_SIZE"
                               :label="$t('SOPRoutes._78')"
                               align="center">
                <template slot-scope="scope">{{ scope.row.RESOURCE_SIZE }} KB</template>
              </el-table-column>
              <el-table-column :label="$t('SOPRoutes._70')"
                               align="center"
                               min-width="220"
                               fixed="right">
                <template slot-scope="scope">
                  <el-button v-if="mainTable.STATUS == 0 && $btnList.indexOf('SimpleSOPRoutesResourcelistdelete') !== -1"
                             type="danger"
                             size="mini"
                             @click="opera_delete_but(scope.row, scope.$index, scope)">{{ $t("SOPRoutes._9") }}</el-button>
                  <el-button v-if="mainTable.STATUS == 0 && $btnList.indexOf('SimpleSOPRoutesEditresourcelist') !== -1"
                             type="primary"
                             size="mini"
                             @click="opera_edit_but(scope.row)">{{ $t("SOPRoutes._79") }}</el-button>
                  <el-button type="success"
                             size="mini"
                             @click="opera_preview_but(scope.row)">{{ $t("SOPRoutes._80") }}</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <!-- <el-tab-pane :label="$t('SOPRoutes._81')" name="components" class="AddOrModify-row-tabs">
            <el-table
              v-if="activeName === 'components'"
              :header-cell-style="{background:'#eef1f6',color:'#606266'}"
              :data="compoTable"
              border
              width="100%"
              height="100%"
              highlight-current-row
            >
              <el-table-column
                prop="ORDER_NO"
                :label="$t('SOPRoutes._76')"
                width="60"
                align="center"
              />
              <el-table-column
                prop="RESOURCE_NAME"
                :label="$t('SOPRoutes._77')"
                align="center"
                :show-overflow-tooltip="true"
              />
              <el-table-column
                prop="RESOURCE_SIZE"
                :label="$t('SOPRoutes._78')"
                align="center"
                :show-overflow-tooltip="true"
              >
                <template slot-scope="scope">{{ scope.row.RESOURCE_SIZE }} KB</template>
              </el-table-column>
              <el-table-column prop="KEEP_CODE" :label="$t('SOPRoutes._83')" align="center" />
              <el-table-column prop="KEEP_CODE" :label="$t('SOPRoutes._84')" align="center" />
              <el-table-column prop="KEEP_CODE" :label="$t('SOPRoutes._85')" align="center" />
              <el-table-column prop="KEEP_CODE" :label="$t('SOPRoutes._86')" align="center" />
              <el-table-column prop="KEEP_CODE" :label="$t('SOPRoutes._87')" align="center" />
              <el-table-column
                :label="$t('SOPRoutes._70')"
                align="center"
                width="230"
                fixed="right"
              >
                <template slot-scope="scope">
                  <el-button
                    type="danger"
                    size="mini"
                    @click="opera_delete_but(scope.row,scope.$index,scope)"
                  >{{$t('SOPRoutes._9')}}</el-button>
                  <el-button
                    type="success"
                    size="mini"
                    @click="compo_edit_but(scope.row)"
                  >{{$t('SOPRoutes._8')}}</el-button>
                  <el-button
                    type="success"
                    size="mini"
                    @click="compo_preview_but(scope.row)"
                  >{{$t('SOPRoutes._80')}}</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane> -->
        </el-tabs>
      </el-col>
    </el-row>
    <!-- 添加工序 -->
    <el-dialog v-dialogDrag
               :close-on-click-modal="false"
               :title="$t('SOPRoutes._88')"
               :visible.sync="processdialogVisible"
               width="40%"
               class="main-dlalog">
      <div class="process-header">
        <el-input v-model="OperationVal.Key"
                  :placeholder="$t('SOPRoutes._89')"
                  style="width:200px"
                  @click.native="search_but" />&nbsp;&nbsp;
        <el-button type="success"
                   icon="el-icon-search"
                   @click.native="search_but">{{ $t("SOPRoutes._6") }}</el-button>
        <el-button type="primary"
                   @click="process_det_but">{{
          $t("SOPRoutes._31")
        }}</el-button>
        <el-button @click="processdialogVisible = false">{{
          $t("SOPRoutes._48")
        }}</el-button>
      </div>
      <div class="process-table">
        <el-table ref="procesrefs"
                  :data="procesTable"
                  style="width: 100%;"
                  height="100%"
                  border
                  :header-cell-style="{ background: '#eef1f6', color: '#606266' }"
                  @selection-change="roceseSelectionChange">
          <el-table-column type="selection"
                           width="55" />
          <el-table-column prop="OPERATION_NAME"
                           align="center"
                           :label="$t('SOPRoutes._65')" />
          <el-table-column prop="DESCRIPTION"
                           align="center"
                           :label="$t('SOPRoutes._22')" />
        </el-table>
      </div>
    </el-dialog>
    <!-- 头部上传图片 -->
    <el-dialog v-dialogDrag
               :close-on-click-modal="false"
               :title="$t('SOPRoutes._90')"
               :visible.sync="mainFormVisible"
               width="40%"
               class="main-dlalog">
      <el-upload class="avatar-uploader"
                 :data="main_img"
                 :action="upload_url"
                 :show-file-list="false"
                 :on-success="handleAvatarSuccess"
                 :before-upload="beforeAvatarUpload"
                 :headers="head">
        <img :src="img_url + MainPic"
             alt
             width="100%"
             height="100%" />
      </el-upload>
      <div class="upload-button">
        <el-button type="success"
                   class="el-icon-upload"
                   @click="upload_img_but">{{ $t("SOPRoutes._71") }}</el-button>
        <el-button type="success"
                   @click="define_but">{{
          $t("SOPRoutes._91")
        }}</el-button>
      </div>
    </el-dialog>
    <!-- 图片预览编辑说明 -->
    <el-dialog v-dialogDrag
               top="0"
               :close-on-click-modal="false"
               :visible.sync="editFormVisible"
               :title="dialogStatus"
               width="100%"
               class="main-dlalog"
               @close="closedClick">
      <el-row :gutter="24"
              class="dialog-row">
        <el-col :span="12"
                class="dialog-row-div">
          <img :src="img_url + postForm.img"
               :alt="$t('SOPRoutes._60')"
               style="width: 100%;height: 100%;"
               v-if="ResType == 'image'" />
          <video id="video1"
                 v-if="ResType == 'video'"
                 v-bind:src="img_url + postForm.img"
                 style="width: 100%;height: 100%;"
                 controls="controls"></video>
          <iframe v-if="ResType == 'pdf'|| ResType == 'word'|| ResType == 'excel' || ResType == 'other'"
                  scrolling="auto"
                  :src="img_url + postForm.RESOUTCE_PDF_URL || postForm.img"
                  class="scrollStyle table_120_list"
                  frameborder="0"
                  width="100%"
                  height="100%">
          </iframe>
          <!-- <pdf v-if="ResType == 'pdf'" :src="img_url + postForm.img" ></pdf> -->
        </el-col>
        <el-col :span="12"
                style="position: relative;">
          <el-form v-if="formstust === 1"
                   label-width="70px">
            <el-form-item :label="$t('SOPRoutes._83')">
              <el-input v-model="compoEdittVal.PartInfo.PART_NO"
                        :placeholder="$t('SOPRoutes._92')"
                        @keyup.enter.native="PartPartClick" />
            </el-form-item>
            <el-form-item :label="$t('SOPRoutes._118')">
              <el-input v-model="partoninfo.PART_NAME"
                        :placeholder="$t('SOPRoutes._119')" />
            </el-form-item>
            <el-form-item :label="$t('SOPRoutes._120')">
              <el-input v-model="partoninfo.PART_DESC"
                        :placeholder="$t('SOPRoutes._121')" />
            </el-form-item>
            <el-form-item :label="$t('SOPRoutes._93')">
              <el-input v-model="compoEdittVal.PartInfo.PART_QTY"
                        type="number"
                        placeholder="$t('SOPRoutes._94')" />
            </el-form-item>
            <el-form-item :label="$t('SOPRoutes._95')">
              <el-input v-model="compoEdittVal.PartInfo.PART_LOCATION"
                        :placeholder="$t('SOPRoutes._96')" />
            </el-form-item>
            <el-form-item :label="$t('SOPRoutes._115')">
              <el-switch v-model="compoEdittVal.PartInfo.IS_SCAN"
                         :active-text="$t('SOPRoutes._116')"
                         :inactive-text="$t('SOPRoutes._117')"
                         active-color="#13ce66"
                         inactive-color="#cccccc"
                         active-value="Y"
                         inactive-value="N" />
            </el-form-item>
          </el-form>
          <!-- <div v-if="!ButStatus"
               class="dialog-cloth" /> -->
          <customTinymce ref="editor"
                         v-model="postForm.content"
                         :height="400" />
        </el-col>
      </el-row>
      <div class="upload-button">
        <el-button v-if="ButStatus"
                   type="primary"
                   @click="edit_save_but">{{
          $t("SOPRoutes._53")
        }}</el-button>
      </div>
    </el-dialog>

    <!-- 添加图片 -->
    <el-dialog v-dialogDrag
               :title="$t('SOPRoutes._97')"
               :close-on-click-modal="false"
               :visible.sync="PrimarydialogVisible"
               width="60%">
      <el-upload ref="upload"
                 multiple
                 :action="upload_url"
                 :data="imgPriVal"
                 list-type="picture-card"
                 :auto-upload="true"
                 :on-success="primaryAvatarSuccess"
                 :before-upload="beforeAvatarUpload"
                 :headers="head"
                 :before-close="handleClose">
        <i slot="default"
           class="el-icon-plus" />
        <div slot="file"
             slot-scope="{ file }"
             style="height: 100%;">
          <img class="el-upload-list__item-thumbnail"
               :src="file.url"
               alt />
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
    <!-- 预览作业 -->
    <el-dialog v-dialogDrag
               :title="$t('SOPRoutes._98')"
               :visible.sync="PrimaryOperation"
               :close-on-click-modal="false"
               width="100%"
               top="0"
               class="primary-operation">
      <iframe id="child"
              v-if="iframeUrl"
              width="100%"
              height="100%"
              :src="iframeUrl"></iframe>
    </el-dialog>
  </d2-container>
</template>
<script>
import {
  GetPartByPartNo,
  AddOrModify,
  GetOperationList,
  LoadDtlData,
  LoadResource,
  LoadResourceCmpData,
  AddOrModifySave,
  DeleteSub,
  PreviewSOP,
  UpdateMsgInfo,
  DeleteResource,
  IsExistsName
} from '@/api/SimpleSOPRoutes/index.js'
import customTinymce from '@/components/custom-tinymce'
import qs from 'qs'
import util from '@/libs/util'
import {
  mapGetters
} from 'vuex'
export default {
  components: {
    customTinymce
  },
  data () {
    return {
      elRowHeight: 0,
      xheight: 0,
      readonly: false,
      mainTable: {
        ID: 0,
        CREATER: '',
        PART_NO: '',
        UserName: '', // 用户名
        ROUTE_NAME: '',
        DESCRIPTION: '',
        STATUS: 0,
        m_RESOURCE_URL: null,
        m_ResourceID: 0,
        OperationList: []
      },
      // 是否相同料号名称
      IsExistsVal: {
        PART_NO: '',
        ID: 0
      },
      // 获取添加工序
      OperationVal: {
        Page: 1,
        Limit: 5000,
        Key: ''
      },
      // 添加工序
      processdialogVisible: false,
      procesTable: [],
      // 获取作业图、零件值
      ProductVal: {
        parentid: 0,
        Page: 1,
        Limit: 50000,
        Key: ''
      },
      procesArr: [],
      postForm: {
        img: '', // 图片
        content: '' // 文章内容
      },
      PrimaryTable: [],
      Primaryradio: '',
      PrimaryId: '', // 工序id
      radio: '',
      activeName: 'operation',
      operaTable: [], // 作业图列表
      compoTable: [], // 获取零件图:资源列表
      mainFormVisible: false,
      img_url: process.env.VUE_APP_BASE_IMG,
      // 主表上传图片
      main_img: {
        mst_id: 0,
        category: 0,
        resource_id: 0
      },
      MainPic: '',
      upload_url: process.env.VUE_APP_API + 'SOPRoutes/UploadFileToPDF', // 明细上传图片
      head: {},
      ButStatus: true, // 编辑预览按钮状态
      // 获取预览编辑的值
      PreviewOrEdit: {
        mst_id: '', // 主表ID
        id: '', // 资源图片ID
        operid: '', // 工序ID
        imgurl: '', // 图片URL
        isedit: 0, // 0"预览图片",1"编辑图片
        isPart: 0 // 是否零件 0否 1是
      },
      // 编辑提交的值
      imgrditVal: {
        Resource: {
          ID: '',
          RESOURCE_MSG: ''
        }
      },
      // 零件图编辑提交的值
      compoEdittVal: {
        Resource: {
          ID: '',
          RESOURCE_MSG: ''
        },
        PartInfo: {
          ID: 0,
          PART_NO: '', // 零件料号
          PART_QTY: 0, // 用量
          PART_LOCATION: '', // 位置
          CREATEUSER: '',
          IS_SCAN: 'Y'
        }
      },
      formstust: 0,
      editFormVisible: false,
      dialogStatus: '',
      // 添加图片
      PrimarydialogVisible: false,
      // 预览作业
      PrimaryOperation: false,
      iframeUrl: '',
      // 工序子表图片值
      imgPriVal: {
        mst_id: '',
        category: 1,
        resource_id: 0
      },
      partoninfo: {
        PART_NAME: '',
        PART_DESC: ''
      },
      ResType: '',
      flagShow: false
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.xheight = this.$refs.elrow.$el.offsetHeight
      console.log('xheight: ', this.xheight)
    })
    // this.Bus.on('Edit', val => {
    //   if (val > 0) {
    //     console.log(val)
    //     this.readonly = true
    //     this.getAddOrModify(val)
    //     this.getLoadDtlData(val)
    //     this.PrimaryId = val
    //   } else {
    //     console.log(val, 'val')
    //     this.getAddOrModify(0)
    //     this.getLoadDtlData(0)
    //     this.readonly = false
    //   }
    // })
    if (this.$route.query.mst_id > 0) {
      this.readonly = true
      this.getAddOrModify(this.$route.query.mst_id)
      this.getLoadDtlData(this.$route.query.mst_id)
      this.PrimaryId = this.$route.query.mst_id
    } else {
      this.getAddOrModify(0)
      this.getLoadDtlData(0)
      this.readonly = false
    }
    if (this.$route.query.mst_id === undefined) {
      this.$router.push('/SOPsimple/Index')
    }
  },
  computed: {
    ...mapGetters(['userinfo', 'language'])
  },
  watch: {
    '$i18n.locales' (mes) {
      this.head = {
        Authorization: 'Bearer ' + util.cookies.get('token'),
        'Accept-Language': mes === 'zh' ? 'zh-CN,zh;' : 'en-US,en;'
      }
    },
    PrimaryOperation (val) {
      if (!val) {
        this.iframeUrl = ''
      }
    }
  },
  created () {
    this.mainTable.UserName = this.userinfo.USER_NAME
    this.compoEdittVal.PartInfo.CREATEUSER = this.userinfo.USER_NAME
    this.getationList()
    this.head = {
      Authorization: 'Bearer ' + util.cookies.get('token'),
      'Accept-Language': this.$store.getters.language === 'zh' ? 'zh-CN,zh;' : 'en-US,en;'
    }
    this.$nextTick(() => {
      this.elRowHeight = this.$refs.elRow1.$el.offsetHeight
    })
    this.Bus.on('screenfull_toggle', () => {
      this.elRowHeight = this.$refs.elRow1.$el.offsetHeight
    })
  },
  methods: {
    // 关闭
    closedClick () {
      this.editFormVisible = false
      if (this.ResType === 'video') {
        document.getElementById('video1').pause()
      }
    },
    // 返回
    back_but () {
      this.$confirm(this.$t('SOPRoutes._103'), this.$t('SOPRoutes._40'), {
        confirmButtonText: this.$t('SOPRoutes._31'),
        cancelButtonText: this.$t('SOPRoutes._48'),
        type: 'warning'
      }).then(() => {
        // this.$emit('close')
        this.$router.push('/SOPsimple/Index')
      }).catch(() => {
        return false
      })
    },
    // 主表获取料号
    async PartNoClick () {
      if (this.mainTable.PART_NO) {
        const res = await GetPartByPartNo(this.mainTable.PART_NO)
        if (res.Result) {
          var data = JSON.parse(res.Result)
          if (data !== null) {
            this.mainTable.ROUTE_NAME = data.NAME
            this.mainTable.DESCRIPTION = data.DESCRIPTION
            console.log(res)
          } else {
            this.$message({
              showClose: true,
              message: this.$t('SOPRoutes._99'),
              type: 'warning'
            })
            this.mainTable.ROUTE_NAME = ''
            this.mainTable.DESCRIPTION = ''
          }
        }
      } else {
        this.$message({
          showClose: true,
          message: this.$t('SOPRoutes._2'),
          type: 'warning'
        })
      }
    },
    // 获取明细
    async getAddOrModify (ID) {
      const res = await AddOrModify(ID)
      console.log(res)
      const data = res.Result
      if (res.Result) {
        this.mainTable.PART_NO = data.PART_NO
        this.mainTable.ROUTE_NAME = data.ROUTE_NAME
        this.mainTable.DESCRIPTION = data.DESCRIPTION
        this.mainTable.ID = data.ID
        this.main_img.mst_id = data.ID
        this.main_img.resource_id = data.m_ResourceID
        this.mainTable.STATUS = data.STATUS
        this.mainTable.m_ResourceID = data.m_ResourceID
        this.mainTable.resource_id = data.resource_id
        this.mainTable.m_RESOURCE_URL = data.m_RESOURCE_URL
        // 主表图片预览编辑
        this.PreviewOrEdit.mst_id = data.ID
        this.PreviewOrEdit.id = data.m_ResourceID
        this.PreviewOrEdit.operid = data.ID
        this.PreviewOrEdit.imgurl = data.m_RESOURCE_URL
      }
    },
    // 获取添加工序
    async getationList () {
      const res = await GetOperationList(this.OperationVal)
      if (res.Result) {
        this.procesTable = JSON.parse(res.Result)
      }
    },
    // 获取工序子表
    async getLoadDtlData (val) {
      const res = await LoadDtlData(val)
      if (res.Result) {
        console.log(res, ' 获取工序子表')
        this.PrimaryTable = JSON.parse(res.Result)
        console.log(this.PrimaryTable)
      }
    },
    // 获取 预览编辑
    async getPreviewSOP () {
      const res = await PreviewSOP(this.PreviewOrEdit)
      console.log(res, '预览编辑')
      const data = res.Result
      if (!data) {
        this.postForm.img = ''
        this.postForm.content = ''
        console.log('res.Result  =null')
      } else {
        console.log('res.Result')
        console.log(data)
        this.ResType = this.matchType(data.imgurl)
        this.postForm.img = data.imgurl
        this.postForm.content = data.RESOURCE_MSG
        this.imgrditVal.Resource.ID = data.id
        console.log(this.ResType)
        if (data.PartInfo) {
          this.compoEdittVal.PartInfo.ID = data.PartInfo.ID
          this.compoEdittVal.PartInfo.PART_NO = data.PartInfo.PART_NO // 零件料号
          this.compoEdittVal.PartInfo.PART_QTY = data.PartInfo.PART_QTY // 用量
          this.compoEdittVal.PartInfo.PART_LOCATION = data.PartInfo.PART_LOCATION // 位置
          this.compoEdittVal.PartInfo.IS_SCAN = data.PartInfo.IS_SCAN
        }
      }
      // })
    },
    // 获取料号信息
    async PartPartClick () {
      if (this.compoEdittVal.PartInfo.PART_NO) {
        const res = await GetPartByPartNo(this.compoEdittVal.PartInfo.PART_NO)
        if (res.Result) {
          var data = JSON.parse(res.Result)
          console.log(data, 'datadata')
          if (data !== null) {
            this.partoninfo.PART_NAME = data.NAME
            this.partoninfo.PART_DESC = data.DESCRIPTION
            console.log(res)
          } else {
            this.compoEdittVal.PartInfo.PART_NO = ''
            this.partoninfo.PART_NAME = ''
            this.partoninfo.PART_DESC = ''
            this.$message({
              showClose: true,
              message: this.$t('SOPRoutes._99'),
              type: 'warning'
            })
          }
        }
      } else {
        this.$message({
          showClose: true,
          message: this.$t('SOPRoutes._2'),
          type: 'warning'
        })
      }
    },
    // 主表点击行获取
    primary_cell_click (row, rowIndex, $rowIndex, column) {
      // console.log(row.row)
      this.ProductVal.parentid = row.row.ID
      if (this.activeName === 'operation') {
        //  作业图
        this.getLoadResource()
      } else {
        this.getResourceCmp()
      }
    },
    // 右边表格top切换
    handleClick (tab, event) {
      console.log(tab, event)
      if (this.activeName === 'operation') {
        //  作业图
        this.imgPriVal.category = 1
        this.getLoadResource()
      } else {
        this.imgPriVal.category = 2
        this.getResourceCmp()
      }
    },
    // 获取产品图资源列表
    getLoadResource () {
      LoadResource(this.ProductVal).then(res => {
        console.log(res, '获取作业图')
        console.log(JSON.parse(res.Result))
        this.operaTable = JSON.parse(res.Result)
      })
    },
    /* 作业图 */
    // 产品图、零件图删除
    opera_delete_but (row, index, scope) {
      var Rowoindex = index
      // console.log(scope.store.table.data, Rowoindex)
      this.$confirm(this.$t('SOPRoutes._100'), this.$t('SOPRoutes._40'), {
        confirmButtonText: this.$t('SOPRoutes._31'),
        cancelButtonText: this.$t('SOPRoutes._48'),
        type: 'warning'
      }).then(() => {
        DeleteResource(row.ID)
          .then(res => {
            console.log(res)
            if (res.Result) {
              this.$notify({
                title: this.$t('SOPRoutes._41'),
                message: this.$t('SOPRoutes._42'),
                type: 'success',
                duration: 2000
              })
              scope.store.table.data.splice(Rowoindex, 1)
            }
          })
      }).catch(() => {
        return false
      })
    },
    // 产品图编辑
    opera_edit_but (row) {
      console.log(row)
      this.PreviewOrEdit.mst_id = row.MST_ID
      this.PreviewOrEdit.id = row.ID
      this.PreviewOrEdit.operid = row.ID
      this.PreviewOrEdit.imgurl = row.RESOURCE_URL
      this.PreviewOrEdit.isedit = 1 // 0"预览图片",1"编辑图片
      this.PreviewOrEdit.isPart = 0 // 是否零件 0否 1是
      this.dialogStatus = this.$t('SOPRoutes._101')
      this.editFormVisible = true
      this.formstust = 0
      this.ButStatus = true
      this.postForm.RESOUTCE_PDF_URL = row.RESOUTCE_PDF_URL || row.RESOURCE_URL
      this.getPreviewSOP()
      // this.$nextTick(function () {
      //   this.$refs.editor.formatClick()
      // })
    },
    // 产品图预览
    opera_preview_but (row) {
      this.PreviewOrEdit.mst_id = row.MST_ID
      this.PreviewOrEdit.id = row.ID
      this.PreviewOrEdit.operid = row.ID
      this.PreviewOrEdit.imgurl = row.RESOURCE_URL
      this.PreviewOrEdit.isedit = 0 // 0"预览图片",1"编辑图片
      this.PreviewOrEdit.isPart = 0 // 是否零件 0否 1是
      this.postForm.RESOUTCE_PDF_URL = row.RESOUTCE_PDF_URL || row.RESOURCE_URL
      this.dialogStatus = this.$t('SOPRoutes._102')
      this.editFormVisible = true
      this.ButStatus = false
      this.formstust = 0
      this.getPreviewSOP()
      // this.$nextTick(function () {
      //   this.$refs.editor.formatClick()
      // })
    },
    // 零件图
    // 零件图编辑
    compo_edit_but (row) {
      console.log(row)
      this.PreviewOrEdit.mst_id = row.MST_ID
      this.PreviewOrEdit.id = row.ID
      this.PreviewOrEdit.operid = row.ID
      this.PreviewOrEdit.imgurl = row.RESOURCE_URL
      this.PreviewOrEdit.isedit = 1 // 0"预览图片",1"编辑图片
      this.PreviewOrEdit.isPart = 1 // 是否零件 0否 1是

      this.dialogStatus = this.$t('SOPRoutes._101')
      this.editFormVisible = true
      this.ButStatus = true
      this.formstust = 1
      this.getPreviewSOP()
      // this.$nextTick(function () {
      //   this.$refs.editor.formatClick()
      // })
    },
    // 零件图预览
    compo_preview_but (row) {
      console.log(row)
      this.PreviewOrEdit.mst_id = row.MST_ID
      this.PreviewOrEdit.id = row.ID
      this.PreviewOrEdit.operid = row.ID
      this.PreviewOrEdit.imgurl = row.RESOURCE_URL
      this.PreviewOrEdit.isedit = 0 // 0"预览图片",1"编辑图片
      this.PreviewOrEdit.isPart = 1 // 是否零件 0否 1是

      this.dialogStatus = this.$t('SOPRoutes._102')
      this.editFormVisible = true
      this.ButStatus = false
      this.formstust = 0
      this.getPreviewSOP()
      // this.$nextTick(function () {
      //   this.$refs.editor.formatClick()
      // })
    },
    // 获取零件图:资源列表
    getResourceCmp () {
      LoadResourceCmpData(this.ProductVal).then(res => {
        console.log(res, ' 获取零件图:资源列表')
        console.log(JSON.parse(res.Result))
        this.compoTable = JSON.parse(res.Result)
      })
    },

    // 添加工序
    add_process_but () {
      this.processdialogVisible = true
    },
    // 添加工序搜索
    search_but () {
      this.getationList()
    },
    // 添加工序获取选中
    roceseSelectionChange (row) {
      console.log(row)
      this.procesArr = row
    },
    // 添加工序确定
    process_det_but () {
      this.processdialogVisible = false
      const arr1Ids = this.PrimaryTable.map(item => item.CURRENT_OPERATION_ID)
      const result = this.procesArr.filter(item => !arr1Ids.includes(item.Id))
      var maxid = 0
      if (this.PrimaryTable.length > 0) {
        maxid = Math.max.apply(null, this.PrimaryTable.map(function (d) {
          return d.ORDER_NO
        }))
      }
      var that = this
      result.forEach(function (item) {
        maxid++
        const record = {
          ID: 0,
          CURRENT_OPERATION_ID: item.Id,
          ORDER_NO: maxid,
          OPERATION_NAME: item.OPERATION_NAME,
          DESCRIPTION: item.DESCRIPTION,
          OPERATION_CLASS: item.OPERATION_CLASS,
          OPERATION_CLASS_NAME: item.OPERATION_CLASS_NAME,
          OPERATION_CATEGORY: item.OPERATION_CATEGORY,
          OPERATION_CATEGORY_NAME: item.OPERATION_CATEGORY_NAME,
          ENABLED: item.ENABLED,
          ROUTE_ID: 0
        }
        // 从最后插入
        that.PrimaryTable.push(record)
        // vm.$refs.xTable.insertAt(record, -1)
      })
      this.$refs.procesrefs.clearSelection()
      // console.log(this.PrimaryTable, 'console.log(this.PrimaryTable)')
      if (this.mainTable.ID !== 0) {
        this.save_but()
      }
    },
    // 主表保存
    save_but () {
      if (this.mainTable.PART_NO === '' || this.mainTable.PART_NO === null) {
        this.$message({
          showClose: true,
          message: this.$t('SOPRoutes._2'),
          type: 'warning'
        })
        return
      }
      if (this.mainTable.ROUTE_NAME == null || this.mainTable.ROUTE_NAME === '') {
        this.$message({
          showClose: true,
          message: this.$t('SOPRoutes._1'),
          type: 'warning'
        })
        return
      }
      this.IsExistsVal.PART_NO = this.mainTable.PART_NO
      this.mainTable.OperationList = this.PrimaryTable
      console.log(this.mainTable.OperationList, 'this.mainTable.OperationList ')
      if (this.readonly) {
        AddOrModifySave(this.mainTable).then(response => {
          if (response.Result) {
            this.getAddOrModify(response.Result)
            this.getLoadDtlData(response.Result)
            this.$notify({
              title: this.$t('SOPRoutes._41'),
              message: this.$t('SOPRoutes._104'),
              type: 'success',
              duration: 2000
            })
          }
        })
      } else {
        IsExistsName(this.IsExistsVal).then(res => {
          console.log(res)
          if (res.Result !== void (0)) {
            if (res.Result) {
              this.$message({
                showClose: true,
                message: this.$t('SOPRoutes._105'),
                type: 'warning'
              })
            } else {
              var postdata = this.$refs.xTable.getRecordset()
              console.log(postdata)
              AddOrModifySave(this.mainTable).then(response => {
                if (res.Result !== void (0)) {
                  this.getAddOrModify(response.Result)
                  this.getLoadDtlData(response.Result)
                  this.IsExistsVal.ID = response.Result
                  this.$notify({
                    title: this.$t('SOPRoutes._41'),
                    message: this.$t('SOPRoutes._104'),
                    type: 'success',
                    duration: 2000
                  })
                }
              })
            }
          }
        })
      }
    },
    // 主表显示上传图片
    head_upload_but () {
      if (this.mainTable.ID === 0) {
        this.$message({
          showClose: true,
          message: this.$t('SOPRoutes._106'),
          type: 'warning'
        })
        return
      }
      this.mainFormVisible = true
    },
    // 确定返回
    define_but () {
      this.mainFormVisible = false
    },
    // 上传图片前
    beforeAvatarUpload (file) {
      console.log(file, 'filefile')
      console.log(file.type)
      var fileType = file.name.endsWith('.xlsx') || file.name.endsWith('.xls')
      var DocType = file.name.endsWith('.doc') || file.name.endsWith('.docx') || file.name.endsWith('.word')
      var doc = ''
      if (DocType) {
        doc = 'docx'
      }
      var xlx = ''
      if (fileType) {
        xlx = 'xlsx'
      }
      var pptType = file.name.endsWith('.pptx') || file.name.endsWith('.ppt')
      var pptTy = ''
      if (pptType) {
        pptTy = 'pptx'
      }
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png' || file.type === 'image/gif' || file.type === 'video/mp4' || file.type === 'application/pdf' || file.type === 'video/avi' || file.type === 'application/vnd.rn-realmedia-vbr' || file.type === 'video/x-flv' || file.type === 'application/pdf' || xlx === 'xlsx' || doc === 'docx' || pptTy === 'pptx' || file.type === 'text/csv'
      const isLt2M = file.size / 1024 / 1024 < 50

      if (!isJPG) {
        this.$message.error(this.$t('SOPRoutes._188'))
      }
      if (!isLt2M) {
        this.$message.error(this.$t('SOPRoutes._189'))
      }
      return isJPG && isLt2M
    },
    // 主表上传图片后
    handleAvatarSuccess (response) {
      if (response.Result) {
        this.mainTable.m_RESOURCE_URL = response.Result.resource_url
        this.mainTable.m_ResourceID = response.Result.mst_id
        this.mainTable.resource_id = response.Result.resource_id
        this.MainPic = response.Result.resource_url
        this.$message({
          type: 'success',
          message: this.$t('SOPRoutes._110')
        })
      }
    },

    // 编辑说明
    head_edit_but () {
      if (this.mainTable.m_RESOURCE_URL === '' || this.mainTable.m_RESOURCE_URL === null) {
        this.$message({
          showClose: true,
          message: this.$t('SOPRoutes._111'),
          type: 'warning'
        })
        return
      }
      this.PreviewOrEdit.mst_id = this.PreviewOrEdit.mst_id
      if (this.mainTable.resource_id) {
        this.PreviewOrEdit.id = this.mainTable.resource_id
      } else {
        this.PreviewOrEdit.id = this.mainTable.m_ResourceID
      }
      this.PreviewOrEdit.operid = this.PreviewOrEdit.mst_id
      this.PreviewOrEdit.imgurl = this.mainTable.m_RESOURCE_URL

      this.PreviewOrEdit.isedit = 1 // 0"预览图片",1"编辑图片
      this.PreviewOrEdit.isPart = 0 // 是否零件 0否 1是
      this.dialogStatus = this.$t('SOPRoutes._101')
      this.ButStatus = true
      this.formstust = 0
      // 获取图片编辑id
      this.editFormVisible = true
      this.getPreviewSOP()
      this.$nextTick(function () {
        // this.$refs.editor.formatClick()
      })
    },
    // 预览图片
    head_preview_but () {
      if (this.mainTable.m_RESOURCE_URL === '' || this.mainTable.m_RESOURCE_URL === null) {
        this.$message({
          showClose: true,
          message: this.$t('SOPRoutes._111'),
          type: 'warning'
        })
        return
      }
      this.PreviewOrEdit.mst_id = this.mainTable.mst_id
      if (this.mainTable.resource_id) {
        this.PreviewOrEdit.id = this.mainTable.resource_id
      } else {
        this.PreviewOrEdit.id = this.mainTable.m_ResourceID
      }
      this.PreviewOrEdit.operid = this.mainTable.mst_id
      this.PreviewOrEdit.imgurl = this.mainTable.m_RESOURCE_URL

      this.PreviewOrEdit.isPart = 0 // 是否零件 0否 1是
      this.PreviewOrEdit.isedit = 1
      this.dialogStatus = this.$t('SOPRoutes._102')
      this.ButStatus = false
      this.formstust = 0
      this.editFormVisible = true
      this.getPreviewSOP()
      this.$nextTick(function () {
        // this.$refs.editor.formatClick()
      })
    },
    // 修改后保存
    edit_save_but () {
      var form = {}
      this.imgrditVal.Resource.RESOURCE_MSG = this.postForm.content
      if (this.formstust === 1) {
        this.compoEdittVal.Resource = this.imgrditVal.Resource
        form = this.compoEdittVal
      } else {
        form = this.imgrditVal
      }
      UpdateMsgInfo(form)
        .then(res => {
          if (res.Result) {
            this.$notify({
              title: this.$t('SOPRoutes._41'),
              message: this.$t('SOPRoutes._104'),
              type: 'success',
              duration: 2000
            })
          }
        })
    },
    // 主表点击上传图片
    upload_img_but () {
      document.querySelector('.avatar-uploader .el-upload__input').click()
    },
    // 上传图片
    primary_upload_but (row) {
      if (this.mainTable.ID === 0) {
        this.$message({
          showClose: true,
          message: this.$t('SOPRoutes._112'),
          type: 'warning'
        })
        return
      }
      this.imgPriVal.mst_id = row.ID
      console.log(row)
      this.PrimarydialogVisible = true
    },
    // 上传成功后
    primaryAvatarSuccess (response) {
      if (response.Result) {
        if (this.activeName === 'operation') {
          //  作业图
          this.getLoadResource()
        } else {
          this.getResourceCmp()
        }
        this.$message({
          type: 'success',
          message: this.$t('SOPRoutes._110')
        })
      }
    },
    confirm_but () {
      this.$refs.upload.clearFiles()
      this.PrimarydialogVisible = false
    },
    cancellation_but () {
      this.$refs.upload.clearFiles()
      this.PrimarydialogVisible = false
    },
    handleClose () {
      this.$refs.upload.clearFiles()
    },
    // 工序作业图预览
    primary_preview_but (row) {
      console.log(row)
      console.log(row.ID, this.mainTable.PART_NO, row.CURRENT_OPERATION_ID)
      if (this.mainTable.ID === 0) {
        this.$message({
          showClose: true,
          message: this.$t('SOPRoutes._113'),
          type: 'warning'
        })
        return
      }
      this.PrimaryOperation = true
      const query = {
        partNo: this.mainTable.PART_NO,
        operationId: row.CURRENT_OPERATION_ID,
        seif: 1
      }
      this.iframeUrl = window.location.origin + '/#/SOPsimple/SOP/index?' + qs.stringify(query)
      // this.$confirm(this.$t('SOPRoutes._187'), this.$t('SOPRoutes._40'), {
      //   confirmButtonText: this.$t('SOPRoutes._31'),
      //   cancelButtonText: this.$t('SOPRoutes._48'),
      //   type: 'warning'
      // })
      //   .then(() => {
      //     this.$router.push({
      //       path: '/SOPsimple/SOP/index',
      //       query: {
      //         partNo: this.mainTable.PART_NO,
      //         operationId: row.CURRENT_OPERATION_ID
      //       }
      //     })
      //   })
      //   .catch(() => {
      //     return false
      //   })
    },
    // 删除工序
    primary_remove_but (row, index) {
      this.$confirm(this.$t('SOPRoutes._114'), this.$t('SOPRoutes._40'), {
        confirmButtonText: this.$t('SOPRoutes._31'),
        cancelButtonText: this.$t('SOPRoutes._48'),
        type: 'warning'
      }).then(() => {
        if (row.ID === 0) {
          this.$refs.xTable.remove(row)
          this.$notify({
            title: this.$t('SOPRoutes._41'),
            message: this.$t('SOPRoutes._42'),
            type: 'success',
            duration: 2000
          })
        } else {
          DeleteSub(row.ID)
            .then(res => {
              if (res.Result) {
                this.$notify({
                  title: this.$t('SOPRoutes._41'),
                  message: this.$t('SOPRoutes._42'),
                  type: 'success',
                  duration: 2000
                })
                this.getLoadDtlData(this.PrimaryId)
              }
            })
        }
      }).catch(() => {
        return false
      })
    },
    matchType (fileName) {
      // 后缀获取
      var suffix = ''
      // 获取类型结果
      var result = ''
      try {
        var flieArr = fileName.split('.')
        suffix = flieArr[flieArr.length - 1]
      } catch (err) {
        suffix = ''
      }
      // fileName无后缀返回 false
      if (!suffix) {
        result = false
        return result
      }
      // 图片格式
      var imglist = ['png', 'jpg', 'jpeg', 'bmp', 'gif']
      // 进行图片匹配
      result = imglist.some(function (item) {
        return item === suffix
      })
      if (result) {
        result = 'image'
        return result
      };
      // 匹配txt
      var txtlist = ['txt']
      result = txtlist.some(function (item) {
        return item === suffix
      })
      if (result) {
        result = 'txt'
        return result
      };
      // 匹配 excel
      var excelist = ['xls', 'xlsx']
      result = excelist.some(function (item) {
        return item === suffix
      })
      if (result) {
        result = 'excel'
        return result
      };
      // 匹配 word
      var wordlist = ['doc', 'docx']
      result = wordlist.some(function (item) {
        return item === suffix
      })
      if (result) {
        result = 'word'
        return result
      };
      // 匹配 pdf
      var pdflist = ['pdf']
      result = pdflist.some(function (item) {
        return item === suffix
      })
      if (result) {
        result = 'pdf'
        return result
      };
      // 匹配 ppt
      var pptlist = ['ppt']
      result = pptlist.some(function (item) {
        return item === suffix
      })
      if (result) {
        result = 'ppt'
        return result
      };
      // 匹配 视频
      var videolist = ['mp4', 'avi', 'rmvb', 'flv']
      result = videolist.some(function (item) {
        return item === suffix
      })
      if (result) {
        result = 'video'
        return result
      };
      // 匹配 音频
      var radiolist = ['mp3', 'wav', 'wmv']
      result = radiolist.some(function (item) {
        return item === suffix
      })
      if (result) {
        result = 'radio'
        return result
      }
      // 其他 文件类型
      result = 'other'
      return result
    }
  }
}

</script>
<style lang="scss" scoped>
.SOPsimple-AddOrModify {
  padding: 0 15px 0;
  .compile-col {
    display: flex;
    align-items: center;
    margin-top: 10px;
    .select {
      flex: 1;
    }
    span {
      padding: 0 10px;
    }
    button {
      margin-left: 5px;
    }
  }
  .upload-button {
    display: flex;
    justify-content: center;
    margin-top: 15px;
  }
  .dialog-cloth {
    position: absolute;
    background: rgba(0, 0, 0, 0.1);
    width: 100%;
    height: 100%;
    z-index: 9;
  }
  .AddOrModify-row-tabs {
    height: calc(100vh - 240px);
  }
  .SOPRoutes-row-table {
    height: calc(100vh - 195px);
  }
}
</style>
<style>
.SOPsimple-AddOrModify .main-dlalog .el-dialog__body {
  padding: 0px 20px 15px;
}
.SOPsimple-AddOrModify .main-dlalog .el-dialog {
  margin: auto;
}
.SOPsimple-AddOrModify .main-dlalog .el-upload {
  width: 100%;
  height: 300px;
  border: 1px solid #ccc;
}
.SOPsimple-AddOrModify .vxe-button.type--button {
  padding: 0 5px;
}
.SOPsimple-AddOrModify .primary-operation {
  overflow: hidden;
}
.SOPsimple-AddOrModify .primary-operation .el-dialog {
  background: #040f3c;
}
.SOPsimple-AddOrModify .primary-operation .el-dialog__header {
  background: #ffffff;
  padding-top: 0;
  padding-bottom: 0;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.SOPsimple-AddOrModify .primary-operation .el-dialog__title {
  font-size: 14px;
  color: #303133;
}
.SOPsimple-AddOrModify .primary-operation .el-dialog__headerbtn {
  position: relative;
  top: 0;
  right: 0;
}
.SOPsimple-AddOrModify .primary-operation .el-dialog__body {
  padding: 0;
  height: calc(100vh - 42px);
}
.SOPsimple-AddOrModify .dialog-row {
  display: flex;
}
.SOPsimple-AddOrModify .dialog-row .dialog-row-div {
  height: calc(100vh - 115px);
  padding-left: 0px !important;
  padding-right: 0px !important;
}
.SOPsimple-AddOrModify .dialog-row .dialog-row-div img {
  display: flex;
  border: 1px solid #cccccc;
}
.SOPsimple-AddOrModify
  .el-upload-list--picture-card
  .el-upload-list__item-actions {
  display: none;
}
.SOPsimple-AddOrModify .header-container {
  position: sticky;
  top: 0;
  z-index: 99;
  margin-top: 15px;
}
.SOPsimple-AddOrModify .el_col2x {
  margin-top: -12px;
}
.SOPsimple-AddOrModify .process-header {
  padding: 10px 0;
}
.SOPsimple-AddOrModify .process-table {
  height: calc(100vh - 300px);
}
/* .SOPsimple-AddOrModify iframe {
  height: calc(100vh - 510px) !important;
} */
</style>
