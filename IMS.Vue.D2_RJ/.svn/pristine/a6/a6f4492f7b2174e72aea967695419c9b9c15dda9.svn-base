<template>
  <custom-container>
    <template slot="header">
      <custom-container-header :isExport="false"
                               :isExportTpl="false"
                               :isImport="false">
        <el-button icon="el-icon-back"
                   @click="goBack(true)">{{ $t('SmtPlacementHeader._37') }}</el-button>
        <el-button icon="el-icon-upload2"
                   type="primary"
                   @click="openUploadModal">{{ $t('SmtPlacementHeader._74') }}</el-button>
        <el-button icon="el-icon-delete"
                   type="danger"
                   @click="resetPage">{{ $t('publics.btn.clear') }}</el-button>
        <el-button icon="el-icon-finished"
                   type="warning"
                   @click="compareByBom">{{ $t('SmtPlacementHeader._75') }}</el-button>
        <el-button icon="el-icon-check"
                   type="primary"
                   @click="saveData">{{ $t('SmtPlacementHeader._76') }}</el-button>
        <el-button icon="el-icon-plus"
                   type="success"
                   @click="addFE"
                   :disabled="!isComparison">{{ $t('publics.btn.add') }}</el-button>
      </custom-container-header>
    </template>
    <!-- 上传抽屉modal -->
    <el-drawer :title="$t('SmtPlacementHeader._77')"
               :visible.sync="drawer"
               :modal="false"
               direction="ltr"
               size="30%">
      <div style="padding: 0 20px">
        <el-form :model="uploadForm"
                 :rules="rules"
                 ref="uploadForm"
                 :show-message="false"
                 label-width="110px"
                 size="mini">
          <el-form-item :label="$t('SmtPlacementHeader._78')"
                        prop="PATH">
            <div class="upload-block">
              <el-input v-model="uploadForm.PATH" />
              <el-upload ref="uploadfile"
                         style="height: 28px;display: flex;align-items: center;"
                         class="custom-upload"
                         :action="'#'"
                         :show-file-list="false"
                         :limit="1"
                         :http-request="handleUploadRequest">
                <svg t="1586843077482"
                     class="icon x-dir"
                     viewBox="0 0 1024 1024"
                     version="1.1"
                     xmlns="http://www.w3.org/2000/svg"
                     p-id="4459"
                     width="200"
                     height="200">
                  <path d="M390.4 200.8l-8-8c-10.4-10.4-24-16-38.4-16H180.8c-29.6 0-54.4 24-54.4 54.4v562.4c0 29.6 24 54.4 54.4 54.4h757.6c29.6 0 54.4-24 54.4-54.4V270.4c0-29.6-24-54.4-54.4-54.4H428.8c-14.4 0.8-28-4.8-38.4-15.2z"
                        fill="#F1ED7B"
                        p-id="4460" />
                  <path d="M390.4 200.8l-8-8c-10.4-10.4-24-16-38.4-16H180.8c-29.6 0-54.4 24-54.4 54.4v562.4c0 29.6 24 54.4 54.4 54.4h757.6c29.6 0 54.4-24 54.4-54.4V270.4c0-29.6-24-54.4-54.4-54.4H428.8c-14.4 0.8-28-4.8-38.4-15.2z"
                        fill="#0E1115"
                        p-id="4461" />
                  <path d="M937.6 855.2H180.8c-34.4 0-62.4-28-62.4-62.4V230.4c0-34.4 28-62.4 62.4-62.4H344c16.8 0 32 6.4 44 18.4l8 8c8.8 8.8 20 13.6 32.8 13.6h509.6c34.4 0 62.4 28 62.4 62.4v522.4c-0.8 34.4-28.8 62.4-63.2 62.4zM180.8 184.8c-25.6 0-46.4 20.8-46.4 46.4v562.4c0 25.6 20.8 46.4 46.4 46.4h757.6c25.6 0 46.4-20.8 46.4-46.4V270.4c0-25.6-20.8-46.4-46.4-46.4H428.8c-16.8 0-32-6.4-44-18.4l-8-8C368 188.8 356.8 184 344 184H180.8z"
                        fill="#6A576D"
                        p-id="4462" />
                  <path d="M208 256.8h703.2c29.6 0 54.4 24 54.4 54.4v449.6c0 29.6-24 54.4-54.4 54.4H208c-29.6 0-54.4-24-54.4-54.4V311.2c0-29.6 24-54.4 54.4-54.4z"
                        fill="#FFFFFF"
                        p-id="4463" />
                  <path d="M911.2 823.2H208c-34.4 0-62.4-28-62.4-62.4V311.2c0-34.4 28-62.4 62.4-62.4h703.2c34.4 0 62.4 28 62.4 62.4v449.6c-0.8 34.4-28.8 62.4-62.4 62.4zM208 264.8c-25.6 0-46.4 20.8-46.4 46.4v449.6c0 25.6 20.8 46.4 46.4 46.4h703.2c25.6 0 46.4-20.8 46.4-46.4V311.2c0-25.6-20.8-46.4-46.4-46.4H208z"
                        fill="#6A576D"
                        p-id="4464" />
                  <path d="M153.6 836.8l-38.4-477.6c-2.4-31.2 22.4-58.4 53.6-58.4H872c28 0 52 21.6 53.6 49.6l39.2 486.4"
                        fill="#FFFFFF"
                        p-id="4465" />
                  <path d="M964.8 844.8c-4 0-8-3.2-8-7.2l-39.2-486.4c-1.6-24-22.4-42.4-45.6-42.4H168.8c-12.8 0-24.8 5.6-33.6 15.2s-12.8 21.6-12 35.2l38.4 477.6c0 4-3.2 8-7.2 8.8-4 0-8-3.2-8.8-7.2l-38.4-477.6c-1.6-17.6 4.8-34.4 16-47.2 12-12.8 28-20 45.6-20H872c32 0 59.2 24.8 61.6 56.8l39.2 486.4c0.8 3.2-3.2 7.2-8 8 0.8 0 0 0 0 0z"
                        fill="#6A576D"
                        p-id="4466" />
                  <path d="M153.6 847.2l-64.8-524.8"
                        fill="#0E1115"
                        p-id="4467" />
                  <path d="M153.6 836.8L68.8 408c-6.4-33.6 19.2-64 53.6-64h700.8c25.6 0 48 18.4 52.8 44l88.8 449.6"
                        fill="#FFFFFF"
                        p-id="4468" />
                  <path d="M964.8 844.8c-4 0-7.2-2.4-8-6.4l-88.8-449.6c-4-21.6-23.2-36.8-45.6-36.8H122.4c-13.6 0-27.2 6.4-36 16.8s-12 24.8-9.6 38.4l84.8 428c0.8 4-1.6 8.8-6.4 9.6-4 0.8-8.8-1.6-9.6-6.4L60.8 409.6c-4-18.4 0.8-36.8 12.8-51.2 12-14.4 29.6-22.4 48-22.4h700.8c29.6 0 55.2 20.8 60.8 50.4l88.8 449.6c0.8 4-1.6 8.8-6.4 9.6 0-0.8 0-0.8-0.8-0.8z"
                        fill="#6A576D"
                        p-id="4469" />
                  <path d="M86.4 371.2h768c25.6 0 47.2 17.6 52.8 42.4l83.2 368c8 33.6-18.4 66.4-52.8 66.4h-768c-25.6 0-47.2-17.6-52.8-42.4l-83.2-368c-8-34.4 17.6-66.4 52.8-66.4z"
                        fill="#F1ED7B"
                        p-id="4470" />
                  <path d="M937.6 855.2h-768c-28.8 0-54.4-20-60.8-48l-83.2-368c-4-18.4 0-37.6 12-52.8 12-15.2 29.6-23.2 48.8-23.2h768c28.8 0 54.4 20 60.8 48l83.2 368c4 18.4 0 37.6-12 52.8-12 15.2-29.6 23.2-48.8 23.2zM86.4 379.2c-14.4 0-27.2 6.4-36 17.6-8.8 11.2-12 25.6-8.8 39.2l83.2 368c4.8 20.8 23.2 36 44.8 36h768c14.4 0 27.2-6.4 36-17.6 8.8-11.2 12-25.6 8.8-39.2l-83.2-368c-4.8-20.8-23.2-36-44.8-36h-768z"
                        fill="#6A576D"
                        p-id="4471" />
                </svg>
              </el-upload>
            </div>
          </el-form-item>
          <el-form-item :label="$t('SmtPlacementHeader._79')"
                        prop="Placement">
            <el-input v-model="uploadForm.Placement"></el-input>
          </el-form-item>
          <el-form-item :label="$t('SmtPlacementHeader._80')"
                        prop="Part_NO">
            <el-input v-model="uploadForm.Part_NO"></el-input>
          </el-form-item>
          <el-form-item :label="$t('SmtPlacementHeader._81')"
                        prop="PCB_SIDE">
            <el-select v-model="uploadForm.PCB_SIDE"
                       style="width: 100%"
                       placeholder=" ">
              <el-option v-for="item in PcbSide"
                         :key="item.ID"
                         :label="item.NAME"
                         :value="item.ID"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('SmtPlacementHeader._82')"
                        prop="Stations">
            <el-checkbox-group v-model="choosenSMTStationList"
                               @change="handleChangeSMTStation"
                               style="border: 1px solid rgb(221, 223, 230);padding: 5px 10px;height: calc(100vh * 0.6);overflow: auto;box-sizing: border-box">
              <el-checkbox :label="item.NAME"
                           v-for="item in SmtStation"
                           :key="item.ID"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item>
            <div style="display: flex;align-items: center;justify-content: flex-end">
              <el-button style="width: 150px"
                         type="danger"
                         icon="el-icon-delete"
                         @click="clearUploadForm"
                         size="small">{{ $t('publics.btn.clear') }}</el-button>
              <el-button style="width: 150px"
                         type="success"
                         icon="el-icon-thumb"
                         @click="onSubmitUploadForm"
                         size="small">{{ $t('SmtPlacementHeader._76') }}</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>
    <!-- 正文 -->
    <div>
      <el-row>
        <el-col :span="12"
                style="padding-right: 5px;box-sizing: border-box">
          <div>
            <span style="display: block;color: #8492a6;font-size: 14px;margin: 0 0 10px 0;">BOM</span>
          </div>
          <div>
            <vxe-table ref="_xTable"
                       class="table-container2"
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
                       :loading="loading2"
                       :data="BomList"
                       :mouse-config="{ selected: true }"
                       :edit-config="{ trigger: 'click', mode: 'row', showStatus: true }"
                       :radio-config="{ labelField: 'name', trigger: 'row' }"
                       :checkbox-config="{ checkField: 'checked', trigger: 'row' }">
              <vxe-table-column field="CATEGORY"
                                width="150"
                                :title="$t('SmtPlacementHeader._83')"
                                :class-name="comparisonIsOk"
                                :edit-render="{ name: '$input', props: { readonly: true } }" />
              <vxe-table-column field="PART_CODE"
                                width="180"
                                :title="$t('SmtPlacementHeader._84')"
                                :class-name="comparisonIsOk"
                                :edit-render="{ name: '$input', props: { readonly: true } }" />
              <vxe-table-column field="UNIT_QTY"
                                width="150"
                                :title="$t('SmtPlacementHeader._85')"
                                :class-name="comparisonIsOk"
                                :edit-render="{ name: '$input', props: { readonly: true } }" />
              <vxe-table-column field="UNIT_CODE"
                                width="150"
                                :title="$t('SmtPlacementHeader._86')"
                                :class-name="comparisonIsOk"
                                :edit-render="{ name: '$input', props: { readonly: true } }" />
              <vxe-table-column field="COMPONENT_LOCATION"
                                width="180"
                                :title="$t('SmtPlacementHeader._87')"
                                :class-name="comparisonIsOk"
                                :edit-render="{ name: '$input', props: { readonly: true } }" />
              <vxe-table-column field="PART_NAME"
                                width="180"
                                :title="$t('SmtPlacementHeader._88')"
                                :class-name="comparisonIsOk"
                                :edit-render="{ name: '$input', props: { readonly: true } }" />
              <vxe-table-column field="PART_MODEL"
                                width="180"
                                :title="$t('SmtPlacementHeader._89')"
                                :class-name="comparisonIsOk"
                                :edit-render="{ name: '$input', props: { readonly: true } }" />
            </vxe-table>
          </div>
        </el-col>
        <el-col :span="12">
          <div>
            <span style="display: block;color: #8492a6;font-size: 14px;margin: 0 0 10px 0;">{{ $t('SmtPlacementHeader._90') }}</span>
          </div>
          <div>
            <vxe-table ref="xTable"
                       class="table-container2"
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
                       :data="DataList"
                       :edit-rules="validRules"
                       :mouse-config="{ selected: true }"
                       :edit-config="{ trigger: 'click', mode: 'row', showStatus: true }"
                       :radio-config="{ labelField: 'name', trigger: 'row' }"
                       :checkbox-config="{ checkField: 'checked', trigger: 'row' }">
              <vxe-table-column v-for="(item, index) in TitleList"
                                :key="index"
                                :field="item.field"
                                min-width="160"
                                :title="item.fileName"
                                :class-name="comparisonIsOkRight"
                                :edit-render="{ name: 'input' }" />
              <vxe-table-column v-if="TitleList.length"
                                :class-name="comparisonIsOkRight"
                                :title="$t('publics.field.operate')"
                                width="120"
                                align="center"
                                fixed="right">
                <template v-slot="{ row }">
                  <el-button type="danger"
                             :class="comparisonIsOkRight({row})"
                             @click="removeClick(row, row.$index)">{{ $t("publics.btn.delete") }}</el-button>
                </template>
              </vxe-table-column>
            </vxe-table>
          </div>
        </el-col>
      </el-row>
    </div>
    <div>
      <div>
        <span style="display: block;color: #8492a6;font-size: 14px;margin: 10px 0 10px 0;">{{ $t('SmtPlacementHeader._91') }}</span>
      </div>
      <div class="comparison-block">
        <div class="comparison-result"
             v-if="isComparison"
             :class="{
            faild: !comparisonResult,
            successfuly: comparisonResult
          }">{{ comparisonResult ? $t('SmtPlacementHeader._92') : $t('SmtPlacementHeader._93') }}</div>
        <div v-if="isComparison && !comparisonResult">
          <div class="faild-detail"
               v-for="(item, index) in faildDetails"
               :key="index">{{ item }}</div>
        </div>
      </div>
    </div>
    <transition name="el-fade-in-linear"
                v-if="isProgress">
      <div class="el-dialog__wrapper"
           style="z-index: 999999">
        <div style="display: flex;align-items: center;justify-content: center;height: 100%">
          <el-progress type="circle"
                       :percentage="progressPercent"
                       :status="uploadStatus"></el-progress>
        </div>
      </div>
    </transition>
  </custom-container>
</template>

<script>
import {
  ImportAIPlacementView,
  AIPlacementCompareByBom,
  AIPlacementSaveData
} from '@/api/SmtPlacementHeader'
import { mapMutations, mapGetters, mapState } from 'vuex'
import request from 'axios'
import util from '@/libs/util'
export default {
  name: 'AIupload',
  components: {
    customContainer: () => import('@/components/custom-container'),
    customContainerHeader: () => import('@/components/custom-container-header')
  },
  computed: {
    ...mapGetters(['userinfo']),
    ...mapState({
      machineList: (state) => state.custom.materials.machineList
    })
  },
  data () {
    return {
      drawer: false,
      uploadForm: {
        PATH: '',
        Placement: '',
        Part_NO: '',
        PCB_SIDE: '',
        Stations: []
      },
      rules: {
        PATH: [
          {
            required: true,
            message: this.$t('SmtPlacementHeader._94'),
            trigger: 'blur'
          }
        ],
        Placement: [
          {
            required: true,
            message: this.$t('SmtPlacementHeader._95'),
            trigger: 'blur'
          }
        ],
        Part_NO: [
          {
            required: true,
            message: this.$t('SmtPlacementHeader._96'),
            trigger: 'blur'
          }
        ],
        PCB_SIDE: [
          {
            required: true,
            message: this.$t('SmtPlacementHeader._97'),
            trigger: 'blur'
          }
        ],
        Stations: [
          {
            required: true,
            message: this.$t('SmtPlacementHeader._98'),
            trigger: 'blur'
          }
        ]
      },
      actionUrl: `${process.env.VUE_APP_API}SmtPlacementHeader/ImportAIPlacementFile`,
      SmtStation: [],
      PcbSide: [],
      choosenSMTStationList: [],
      TitleList: [],
      DataList: [],
      loading: false,
      validRules: {
        SLOT: [{ required: true, message: this.$t('SmtPlacementHeader._99') }],
        PART_NO: [
          { required: true, message: this.$t('SmtPlacementHeader._100') }
        ],
        REFDESIGNATOR: [
          { required: true, message: this.$t('SmtPlacementHeader._101') }
        ],
        UNITQTY: [
          { required: true, message: this.$t('SmtPlacementHeader._102') }
        ]
      },
      BomList: [],
      loading2: false,
      timer: null,
      isComparison: false,
      comparisonResult: false,
      faildDetails: [],
      // 上传相关
      progressPercent: 0,
      uploadStatus: 'warning',
      isProgress: false
    }
  },
  methods: {
    ...mapMutations({
      SET_AI_FLAG: 'custom/materials/SET_AI_FLAG'
    }),
    goBack (isPopState = false) {
      this.SET_AI_FLAG(false)
      if (isPopState) {
        window.history.go(-1)
      }
    },
    // 添加监听页面返回事件
    addEventListener () {
      window.history.pushState(null, null, window.location.href)
      window.addEventListener(
        'popstate',
        (e) => {
          this.goBack(false)
        },
        false
      )
    },
    // 打开上传modal
    openUploadModal () {
      this.drawer = true
      this.uploadForm = {
        PATH: '',
        Placement: '',
        Part_NO: '',
        PCB_SIDE: '',
        Stations: []
      }
      this.choosenSMTStationList = []
    },
    // 上传文件成功回调
    handleSuccessUploadFile (response, file) {
      this.$refs.uploadfile.clearFiles()
      let filename = file.name
      if (filename.indexOf('.') !== -1) {
        filename = filename.split('.')[0]
      }
      this.uploadForm.PATH = filename
      const res = response.Result || {}
      const { BomList = [], AIRIPlacement = {} } = res
      this.uploadForm.Placement = AIRIPlacement?.PlacementName || filename
      // eslint-disable-next-line camelcase
      this.uploadForm.Part_NO = AIRIPlacement?.Part_NO || ''
      this.TitleList = AIRIPlacement?.TitleList || ''
      this.DataList = AIRIPlacement?.DataList || ''
      this.BomList = BomList || []
      if (response.ErrorInfo.Status) {
        this.$message.error(response.ErrorInfo.Message)
      } else {
        if (response.Result) {
          // this.$notify({
          //   title: this.$t('SmtPlacementHeader._103'),
          //   message: this.$t('SmtPlacementHeader._104'),
          //   type: 'success'
          // })
        } else {
          this.$notify.error({
            title: this.$t('SmtPlacementHeader._105'),
            message: this.$t('SmtPlacementHeader._106')
          })
        }
      }
    },
    // 自定义上传
    handleUploadRequest (data) {
      let formdata = new FormData()
      formdata.append('file', data.file)
      formdata.append('fileName', data.file.name)
      this.isProgress = true
      this.uploadStatus = 'warning'
      this.$refs.uploadfile.clearFiles()
      const token = util.cookies.get('token')
      const lang = {
        'zh-chs': 'zh-CN,zh;',
        en: 'en-US,en;'
      }
      request
        .post(this.actionUrl, formdata, {
          onUploadProgress: (progressEvent) => {
            // progressEvent.loaded:已上传文件大小
            // progressEvent.total:被上传文件的总大小
            this.progressPercent = Number(
              ((progressEvent.loaded / progressEvent.total) * 100).toFixed(2)
            )
          },
          headers: {
            Authorization: `Bearer ${token}`,
            'Accept-Language': lang[util.cookies.get('lang')]
          },
          timeout: 60000 * 5 // 请求超时时间
        })
        .then((res) => {
          if (res.data.ErrorInfo.Status) {
            this.$message.error(res.data.ErrorInfo.Message)
          }
          this.uploadForm.PATH = data.file.name
          const result = res.data.Result || {}
          const { BomList = [], AIRIPlacement = {} } = result
          this.uploadForm.Placement = AIRIPlacement?.PlacementName || data.file.name
          // eslint-disable-next-line camelcase
          this.uploadForm.Part_NO = AIRIPlacement?.Part_NO || ''
          this.TitleList = AIRIPlacement?.TitleList || ''
          this.DataList = AIRIPlacement?.DataList || ''
          this.BomList = BomList || []
          if (res.data.Result) {
            this.uploadStatus = 'success'
          } else {
            this.uploadStatus = 'exception'
            this.$notify.error({
              title: this.$t('SmtPlacementHeader._105'),
              message: this.$t('SmtPlacementHeader._106')
            })
          }
          this.timer = setTimeout(() => {
            this.isProgress = false
            clearTimeout(this.timer)
          }, 1000)
        })
    },
    // BOM比对完之后提交保存入库操作
    async saveData () {
      // await this.compareByBom()
      const { fullData = [] } = this.$refs.xTable.getTableData()
      const res = await AIPlacementSaveData({
        Part_NO: this.uploadForm.Part_NO,
        Placement: this.uploadForm.Placement,
        PCB_SIDE: this.uploadForm.PCB_SIDE,
        Stations: this.uploadForm.Stations,
        User_name: this.userinfo.USER_NAME,
        PlacementList: fullData,
        DataList: this.DataList
      })
      if (res.Result) {
        this.$notify.success({
          title: this.$t('SmtPlacementHeader._103'),
          message: this.$t('SmtPlacementHeader._107')
        })
        this.resetPage()
      } else {
        this.$notify.error({
          title: this.$t('SmtPlacementHeader._105'),
          message: this.$t('SmtPlacementHeader._108')
        })
      }
    },
    // 获取视图
    async initPage () {
      const res = await ImportAIPlacementView(this.machineList['AI'] || '')
      if (res.Result) {
        const data = res.Result
        this.SmtStation = data.SmtStation
        this.PcbSide = data.PcbSide
      }
    },
    handleChangeSMTStation (e) {
      // SmtStation NAME transform ID
      let tmp = []
      this.SmtStation.map((item) => {
        if (e.indexOf(item.NAME) !== -1) {
          tmp.push(item.ID)
        }
      })
      this.uploadForm.Stations = tmp
    },
    clearUploadForm () {
      this.uploadForm = {
        PATH: '',
        Placement: '',
        Part_NO: '',
        PCB_SIDE: '',
        Stations: []
      }
      this.choosenSMTStationList = []
    },
    // 上传表单提交 --- 进入BOM比对流程
    onSubmitUploadForm () {
      this.$refs.uploadForm.validate((valid, errInfo) => {
        if (valid) {
          // 进入BOM比对流程
          this.drawer = false
          this.compareByBom()
        } else {
          try {
            Object.keys(errInfo).forEach((item) => {
              this.$message.error(errInfo[item][0].message)
              throw Error(errInfo[item][0].message)
            })
          } catch (e) {
            console.log(e.message)
          }
        }
      })
    },
    comparisonIsOk ({ row }) {
      let className = 'white-txt '
      if (row.IS_OK || !row.COMPONENT_LOCATION) {
        return className + 'green'
      } else {
        return className + 'red'
      }
    },
    comparisonIsOkRight ({ row }) {
      let tmpArr = {}
      this.faildDetails.map((item) => {
        const tmp = item.replace(/[^0-9]/gi, '')
        if (!tmpArr[tmp]) {
          tmpArr[tmp] = tmp
        }
      })
      let flag = false
      Object.values(row).forEach((_item) => {
        if (tmpArr[_item]) {
          flag = true
        }
      })
      if (flag) {
        return 'white-txt red btn-ref'
      }
      return ''
    },
    // BOM比对操作
    async compareByBom () {
      this.$refs.xTable.validate(async (valid) => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: `${this.$t('SmtPlacementHeader._109')}...`,
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
          const { fullData = [] } = this.$refs.xTable.getTableData()
          const res = await AIPlacementCompareByBom({
            Part_NO: this.uploadForm.Part_NO,
            Placement: this.uploadForm.Placement,
            PlacementList: fullData,
            Type: this.machineList['AI'] || ''
          })
          // loading.close()
          // this.isComparison = true
          this.timer = setTimeout(() => {
            loading.close()
            this.isComparison = true
            if (res.Result) {
              this.comparisonResult = res.Result.Result
              if (res.Result.Result) {
                this.$notify.success({
                  title: this.$t('SmtPlacementHeader._103'),
                  message: this.$t('SmtPlacementHeader._110')
                })
                this.BomList = this.BomList.map((item) => {
                  item.IS_OK = true
                  return item
                })
              } else {
                this.$notify.error({
                  title: this.$t('SmtPlacementHeader._105'),
                  message: this.$t('SmtPlacementHeader._111')
                })
                // 处理消息区
                this.faildDetails = res.Result.ResultMsg || []
                // 处理BomList 字段 IS_OK
                this.BomList = this.BomList.map((item) => {
                  if (!item.COMPONENT_LOCATION) {
                    item.IS_OK = true
                  } else {
                    item.IS_OK = false
                    let flag = true
                    this.faildDetails.map((_item) => {
                      if (_item.indexOf(item.PART_CODE) !== -1) {
                        flag = false
                      }
                    })
                    item.IS_OK = flag
                  }
                  return item
                })
              }
            }
            clearTimeout(this.timer)
          }, 700)
        }
      })
    },
    // 新增FE料单栏位
    addFE () {
      // 动态新增
      const record = {}
      if (!this.DataList[0]) {
        this.$message.error(this.$t('SmtPlacementHeader._112'))
        return false
      }
      Object.keys(this.DataList[0]).forEach((item) => {
        record[item] = null
      })
      this.$refs.xTable
        .insertAt(record, -1) // 插入到最后一行
        .then(({ row }) => {
          this.$refs.xTable.setActiveRow(row)
        })
    },
    // 删除FE料单栏位
    async removeClick (row) {
      if (
        row &&
        (await this.$confirm(
          this.$t('publics.tips.makeSureDelete'),
          this.$t('publics.tips.tips'),
          {
            confirmButtonText: this.$t('publics.tips.confirm'),
            cancelButtonText: this.$t('publics.tips.cancel'),
            type: 'warning'
          }
        ).catch((_) => {
          /** 取消 */
        }))
      ) {
        this.$refs.xTable.remove(row)
        this.$notify({
          title: this.$t('ssc._12'),
          message: this.$t('ssc._19'),
          type: 'success'
        })
      }
    },
    // 重置页面
    resetPage () {
      this.uploadForm = {
        PATH: '',
        Placement: '',
        Part_NO: '',
        PCB_SIDE: '',
        Stations: []
      }
      this.choosenSMTStationList = []
      this.TitleList = []
      this.DataList = []
      this.BomList = []
      this.isComparison = false
      this.comparisonResult = false
      this.faildDetails = []
    }
  },
  mounted () {
    this.addEventListener()
    this.initPage()
  },
  beforeDestroy () {
    clearTimeout(this.timer)
    this.SET_AI_FLAG(false)
    window.removeEventListener('popstate', () => { })
  }
}
</script>

<style lang="scss" scoped>
.upload-block {
  display: flex;
  align-items: center;
  .x-dir {
    width: 28px;
    height: 28px;
  }
  .el-upload {
    height: 28px;
    display: flex;
    align-items: center;
  }
}

.table-container2 {
  height: calc(100vh - 54px - 20px - 31px - 250px);
}

.comparison-block {
  border: 1px solid rgb(229, 231, 237);
  box-sizing: border-box;
  padding: 10px;
  overflow-x: hidden;
  overflow-y: auto;
  height: calc(250px - 41px);
  .comparison-result {
    font-size: 16px;
    color: #606266;
    padding-bottom: 10px;
  }
  .faild-detail {
    font-size: 14px;
    color: #f56c6c;
  }
  .faild {
    color: #f56c6c;
  }
  .successfuly {
    color: #67c23a;
  }
}
</style>
