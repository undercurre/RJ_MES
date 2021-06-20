<template>
  <d2-container class="SfcsEquipment">
    <template slot="header">
      <custom-container-header exportMehodsName="exportData"
                               exportBtnName="SfcsEquipmentExport"
                               importBtnName="SfcsEquipmentImport"
                               exportTplName="SfcsEquipmentExportTpl">
        <el-input v-model="formData.NAME"
                  :placeholder="$t('se.e_dn')"
                  style="width:150px"
                  @keyup.enter.native="search_but" />&nbsp;
        <el-select v-model="formData.CATEGORY"
                   clearable
                   style="width:150px"
                   :placeholder="$t('se.a_sc')">
          <el-option v-for="item in CategoryList"
                     :key="item.LOOKUP_CODE"
                     :label="item.CHINESE"
                     :value="item.LOOKUP_CODE" />
        </el-select>&nbsp;
        <el-select v-model="formData.STATION_ID"
                   clearable
                   style="width:150px"
                   :placeholder="$t('se.a_ql')">
          <el-option v-for="item in LinesList"
                     :key="item.ID"
                     :label="item.LINE_NAME"
                     :value="item.ID" />
        </el-select>&nbsp;
        <el-select v-model="formData.STATUS"
                   clearable
                   style="width:150px"
                   :placeholder="$t('se.a_ds')">
          <el-option v-for="item in typeOptions"
                     :key="item.STATUS"
                     :label="item.display_name"
                     :value="item.STATUS" />
        </el-select>&nbsp;

        <el-button type="primary"
                   icon="el-icon-search"
                   @click="search_but">{{ $t('se.search') }}</el-button>
        <el-button v-if="$btnList.indexOf('SfcsEquipmentAdd') !== -1"
                   type="success"
                   icon="el-icon-plus"
                   @click="add_but">{{ $t('se.add') }}</el-button>
      </custom-container-header>
    </template>
    <!-- 表格内容 -->
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
                 :edit-config="{trigger: 'click', mode: 'row', showStatus: true}">
        <vxe-table-column min-width="120"
                          :title="$t('se.sn')">
          <template v-slot="{$rowIndex}">{{ $rowIndex + 1 }}</template>
        </vxe-table-column>
        <vxe-table-column field="NAME"
                          min-width="150"
                          :title="$t('se.n')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column field="STATUS"
                          width="100"
                          :title="$t('se.ds')">
          <template v-slot="{row}">
            <span v-if="row.STATUS == 0">{{$t('se.nm')}}</span>
            <span v-else-if="row.STATUS == 1">{{$t('se.Idle')}}</span>
            <span v-else-if="row.STATUS == 2">{{$t('se.tbr')}}</span>
            <span v-else-if="row.STATUS == 3">{{$t('se.im')}}</span>
            <span v-else>{{$t('se.scrapped')}}</span>
          </template>
        </vxe-table-column>
        <vxe-table-column field="CATEGORY_NAME"
                          width="140"
                          :title="$t('se.ec')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column field="STATION_NAME"
                          width="160"
                          :title="$t('se.sl')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column field="PRODUCT_NO"
                          width="170"
                          :title="$t('se.pn')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column field="PROPERTY_NO"
                          width="150"
                          :title="$t('se.ac')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column field="MODEL"
                          width="160"
                          :title="$t('se.em')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column field="USER_PART_NAME"
                          width="150"
                          :title="$t('se.ud')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column field="POWER"
                          width="150"
                          :title="$t('se.vp')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column field="VENDOR"
                          width="130"
                          :title="$t('se.p')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column field="BUY_TIME"
                          width="130"
                          :title="$t('se.doe')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column field="USER_AGE"
                          width="130"
                          :title="$t('se.ul')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column field="END_TIME"
                          min-width="120"
                          :title="$t('se.st')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column field="ImgUrl"
                          width="80"
                          :title="$t('se.img')">
          <template slot-scope="scope">
            <!-- <el-popover
              v-if="scope.row.ImgUrl"
              width="1000"
              placement="left-start"
              title
              trigger="hover"
            >
              <img
                :src="img_url + scope.row.ImgUrl"
                style="height: 100%;width: 100%"
                :alt="$t('se.ftl')"
              />
              <img
                slot="reference"
                :src="img_url + scope.row.ImgUrl"
                :alt="$t('se.ftl')"
                style="max-height: 35px;max-width: 100%"
              />
            </el-popover>-->
            <el-image v-if="scope.row.ImgUrl"
                      style="max-height: 35px;max-width: 100%"
                      :src="img_url +scope.row.ImgUrl"
                      :preview-src-list="[img_url +scope.row.ImgUrl]"></el-image>
            <span v-else>{{$t('se.np')}}</span>
          </template>
        </vxe-table-column>
        <vxe-table-column field="ENABLE"
                          width="100"
                          fixed="right"
                          :title="$t('se.e')"
                          :edit-render="{autofocus: '.custom-input', type: 'visible'}">
          <template v-slot:edit="{ row }">
            <el-switch :disabled="$btnList.indexOf('SfcsEquipmentstatus') == -1"
                       v-model="row.ENABLE"
                       :active-text="$t('se.yes')"
                       :inactive-text="$t('se.no')"
                       active-color="#13ce66"
                       inactive-color="#cccccc"
                       active-value="Y"
                       inactive-value="N"
                       @change="change(row.$index,row)" />
          </template>
        </vxe-table-column>
        <vxe-table-column field="ENABLED"
                          width="180"
                          fixed="right"
                          :title="$t('se.o')">
          <template slot-scope="scope">
            <el-button v-if="$btnList.indexOf('SfcsEquipmentedit') !== -1"
                       type="primary"
                       size="small"
                       @click="edit_but(scope.row)">{{$t('se.edit')}}</el-button>
            <el-button v-if="$btnList.indexOf('SfcsEquipmentdelete') !== -1"
                       type="danger"
                       size="small"
                       @click="remove_but(scope.row)">{{$t('se.delete')}}</el-button>
          </template>
        </vxe-table-column>
      </vxe-table>
    </div>
    <!-- 编辑页面 -->
    <el-dialog :close-on-click-modal="false"
               v-dialogDrag
               :title="textMap[dialogStatus]"
               :visible.sync="dialogFormVisible"
               width="70%">
      <el-form ref="form"
               label-position="top"
               :show-message="false"
               :model="form"
               :rules="rules"
               label-width="85px">
        <el-row :gutter="24">
          <el-col :span="16"
                  style="margin-top:20px">
            <!-- 左边 -->
            <el-col :span="12">
              <el-form-item :label="$t('se.n')"
                            prop="NAME">
                <el-input v-model="form.NAME"
                          disabled
                          :placeholder="$t('se.p_etdn')" />
              </el-form-item>
              <!-- prop="PROPERTY_NO" -->
              <el-form-item :label="$t('se.ac')">
                <el-input v-model="form.PROPERTY_NO"
                          :placeholder="$t('se.p-eac')" />
              </el-form-item>
              <el-form-item :label="$t('se.em')"
                            prop="MODEL">
                <el-input v-model="form.MODEL"
                          :placeholder="$t('se.p_etdm')" />
              </el-form-item>
              <el-form-item :label="$t('se.sl')"
                            prop="STATION_ID">
                <el-select v-model="form.STATION_ID"
                           clearable
                           class="filter-item"
                           style="width: 100%"
                           :placeholder="$t('se.p_esl')">
                  <el-option v-for="item in LinesList"
                             :key="item.ID"
                             :label="item.LINE_NAME"
                             :value="item.ID" />
                </el-select>
              </el-form-item>
              <el-form-item :label="$t('se.p')"
                            prop="VENDOR">
                <el-input v-model="form.VENDOR"
                          :placeholder="$t('se.p_etp')" />
              </el-form-item>
              <el-form-item :label="$t('se.ul')"
                            prop="USER_AGE">
                <el-input v-model="form.USER_AGE"
                          :placeholder="$t('se.p_etul')" />
              </el-form-item>
              <el-form-item :label="$t('se.ds')"
                            prop="STATUS">
                <el-select v-model="form.STATUS"
                           clearable
                           class="filter-item"
                           style="width: 100%"
                           :placeholder="$t('se.p_sds')">
                  <el-option v-for="item in typeOptions"
                             :key="item.STATUS"
                             :label="item.display_name"
                             :value="item.STATUS" />
                </el-select>
              </el-form-item>
            </el-col>
            <!-- 右边 -->
            <el-col :span="12">
              <el-form-item :label="$t('se.ec')"
                            prop="CATEGORY">
                <el-select v-model="form.CATEGORY"
                           clearable
                           class="filter-item"
                           style="width: 100%"
                           :placeholder="$t('se.p_sqc')">
                  <el-option v-for="item in CategoryList"
                             :key="item.LOOKUP_CODE"
                             :label="item.CHINESE"
                             :value="item.LOOKUP_CODE" />
                </el-select>
              </el-form-item>
              <!--  prop="PRODUCT_NO" -->
              <el-form-item :label="$t('se.pn')">
                <el-input v-model="form.PRODUCT_NO"
                          :placeholder="$t('se.p_etpn')" />
              </el-form-item>
              <el-form-item :label="$t('se.ud')"
                            prop="USER_PART">
                <el-cascader v-model="form.USER_PART"
                             :options="organizeList"
                             style="width: 100%"
                             :show-all-levels="false"
                             placeholder=" "
                             :props="casProps"
                             @change="handleChangeCascader"></el-cascader>
                <!-- <el-select v-model="form.USER_PART"
                           clearable
                           class="filter-item"
                           style="width: 100%"
                           :placeholder="$t('se.p_std')">
                  <el-option v-for="item in DepartmentList"
                             :key="item.ID"
                             :label="item.CHINESE"
                             :value="item.ID" />
                </el-select> -->
              </el-form-item>
              <el-form-item :label="$t('se.vp')"
                            prop="POWER">
                <el-input v-model="form.POWER"
                          :placeholder="$t('se.p_evp')" />
              </el-form-item>
              <el-form-item :label="$t('se.doe')"
                            prop="BUY_TIME">
                <el-date-picker style="width: 100%"
                                v-model="form.BUY_TIME"
                                type="date"
                                :placeholder="$t('se.p_safd')"
                                value-format="yyyy-MM-dd" />
              </el-form-item>
              <el-form-item :label="$t('se.st')"
                            prop="END_TIME">
                <el-date-picker style="width: 100%"
                                v-model="form.END_TIME"
                                type="date"
                                :placeholder="$t('se.p_sast')"
                                value-format="yyyy-MM-dd"
                                @change="endtimeClick" />
              </el-form-item>
              <el-form-item :label="$t('se.e')">
                <el-switch v-model="form.ENABLE"
                           :active-text="$t('publics.btn.yes')"
                           :inactive-text="$t('publics.btn.no')"
                           active-color="#13ce66"
                           inactive-color="#cccccc"
                           active-value="Y"
                           inactive-value="N" />
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="8">
            <el-upload ref="upload"
                       class="avatar-uploader"
                       :action="upload_url"
                       :show-file-list="false"
                       :on-success="handleAvatarSuccess"
                       :before-upload="beforeAvatarUpload"
                       :data="img"
                       :headers="handleUploadHeader()">
              <img v-if="form.ImgUrl"
                   :src="img_url + form.ImgUrl"
                   :alt="$t('se.ftl')"
                   width="100%" />
              <span v-else>{{$t('se.np')}}</span>
            </el-upload>
            <div class="upload-button">
              <el-button type="success"
                         class="el-icon-upload"
                         @click="uploadClick">{{$t('se.udm')}}</el-button>
              <el-button type="success"
                         @click="clear_but">{{$t('se.cdp')}}</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="cancel('form')">{{ $t('se.cancel') }}</el-button>
        <el-button v-if="dialogStatus=='create'"
                   type="primary"
                   @click="create('form')">{{ $t('se.confirm') }}</el-button>
        <el-button v-else
                   type="primary"
                   @click="update('form')">{{ $t('se.confirm') }}</el-button>
      </div>
    </el-dialog>
    <!-- 底部翻页 -->
    <template slot="footer">
      <el-pagination :current-page="formData.Page"
                     :page-size="formData.Limit"
                     :page-sizes="[15, 25, 35, 45]"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="totalPage"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange" />
    </template>
  </d2-container>
</template>
<script>
import {
  // 直接抄
  LoadUserOrganize,
  LoadData as _LoadData
} from '@/api/SysOrganize'
import { cloneDeep } from 'lodash' // 直接抄
import customContainerHeader from '@/components/custom-container-header'
import {
  Index,
  LoadData,
  ChangeEnabled,
  AddOrModify,
  DeleteOneById,
  AddOrModifySave,
  ExportData
} from '@/api/SfcsEquipment'
import pagination from '@/views/mixin/page'
import { mapGetters } from 'vuex'
export default {
  name: 'SfcsEquipment',
  components: {
    customContainerHeader
  },
  mixins: [pagination],
  data () {
    return {
      formData: {
        NAME: '',
        STATUS: '',
        STATION_ID: '',
        CATEGORY: '',
        ...this.formData
      },
      CategoryList: [],
      LinesList: [],
      typeOptions: [
        {
          STATUS: 0,
          display_name: this.$t('se.nm')
        },
        {
          STATUS: 1,
          display_name: this.$t('se.Idle')
        },
        {
          STATUS: 2,
          display_name: this.$t('se.tbr')
        },
        {
          STATUS: 3,
          display_name: this.$t('se.im')
        },
        {
          STATUS: 4,
          display_name: this.$t('se.scrapped')
        }
      ],
      loading: false,
      mainTable: [],
      img_url: process.env.VUE_APP_BASE_IMG,
      textMap: {
        update: this.$t('se.editPermission'),
        create: this.$t('se.create')
      },
      dialogStatus: '',
      dialogFormVisible: false,
      form: {
        ID: undefined,
        NAME: undefined,
        CATEGORY: undefined,
        PROPERTY_NO: undefined,
        PRODUCT_NO: undefined,
        MODEL: undefined,
        STATION_ID: undefined,
        POWER: undefined,
        VENDOR: undefined,
        USER_PART: undefined,
        BUY_TIME: undefined,
        USER_AGE: undefined,
        END_TIME: undefined,
        STATUS: undefined,
        ENABLE: undefined,
        Img_Resource_id: undefined,
        ImgUrl: undefined,
        ImgName: undefined,
        ImgSize: undefined
      },
      // 验证
      rules: {
        NAME: [
          {
            required: true,
            message: this.$t('se.p_etdn'),
            trigger: 'blur'
          }
        ],
        CATEGORY: [
          {
            required: true,
            message: this.$t('se.p_sqc'),
            trigger: 'blur'
          }
        ],
        PROPERTY_NO: [
          {
            required: true,
            message: this.$t('se.p-eac'),
            trigger: 'blur'
          }
        ],
        PRODUCT_NO: [
          {
            required: true,
            message: this.$t('se.p_etpn'),
            trigger: 'blur'
          }
        ],
        MODEL: [
          {
            required: true,
            message: this.$t('se.p_etdm'),
            trigger: 'blur'
          }
        ],
        STATION_ID: [
          {
            required: true,
            message: this.$t('se.p_stqlt'),
            trigger: 'blur'
          }
        ],

        POWER: [
          {
            required: true,
            message: this.$t('se.p_evp'),
            trigger: 'blur'
          }
        ],
        VENDOR: [
          {
            required: true,
            message: this.$t('se.p_etp'),
            trigger: 'blur'
          }
        ],
        BUY_TIME: [
          {
            required: true,
            message: this.$t('se.p_safd'),
            trigger: 'blur'
          }
        ],

        USER_AGE: [
          {
            required: true,
            message: this.$t('se.p_etul'),
            trigger: 'blur'
          }
        ],
        USER_PART: [
          {
            required: true,
            message: this.$t('se.p_std'),
            trigger: 'blur'
          }
        ],
        END_TIME: [
          {
            required: true,
            message: this.$t('se.p_sast'),
            trigger: 'blur'
          }
        ],
        STATUS: [
          {
            required: true,
            message: this.$t('se.p_sds'),
            trigger: 'blur'
          }
        ]
      },
      DepartmentList: [],
      effect: {
        Id: '',
        Status: '',
        Operator: ''
      },
      img: {
        mst_id: 0,
        resource_id: 0
      },
      upload_url: process.env.VUE_APP_API + 'SfcsEquipment/UploadImage',
      organizeList: [],
      planData: [],
      casProps: {
        label: 'ORGANIZE_NAME',
        value: 'ID',
        children: 'children',
        checkStrictly: true
      }
    }
  },
  created () {
    this.getIndex()
    this.getOrganize()
    this.effect.Operator = this.userinfo.USER_NAME
  },
  computed: {
    ...mapGetters(['userinfo', 'userId'])
  },
  methods: {
    handleChangeCascader (e) {
      // 直接抄
      if (e && e.length) {
        this.form.USER_PART = e[e.length - 1]
      }
    },
    // 获取组织架构
    async getOrganize () {
      // 直接抄
      const res = await LoadUserOrganize({
        MANAGER_ID: this.userId,
        STATUS: 'Y',
        Page: 1,
        Limit: 1000
      })
      let manager = res.Result || []
      const _res = await _LoadData({
        Page: 1,
        Limit: 10000
      })
      let ORGANIZE = _res.Result || []
      this.planData = ORGANIZE
      this.organizeList = []
      manager.map(item => {
        let tmp = []
        tmp = this.getTree(ORGANIZE, item.ORGANIZE_ID)
        this.organizeList.push(...[tmp[tmp.length - 1]].filter(_i => _i && _i))
      })
    },
    // 递归
    getTree (data, pid = 0, level = 1) {
      // 直接抄
      let arr = []
      data.map(item => {
        if (item.PARENT_ORGANIZE_ID === pid) {
          item.level = level
          item.children = this.getTree(data, item.ID, level + 1)
          item.disabled = item.ENABLED === 'N'
          arr.push(item)
        } else if (item.ID === pid && level === 1) {
          item.level = level
          item.children = this.getTree(data, item.ID, level + 1)
          item.disabled = item.ENABLED === 'N'
          arr.push(item)
        }
      })
      return arr
    },
    // 获取下拉菜单
    async getIndex () {
      const res = await Index()
      if (res.Result) {
        this.CategoryList = res.Result.CategoryList
        this.LinesList = res.Result.LinesList
        this.getLoadData()
      }
    },
    async exportData () {
      this.loading = true
      const res = await ExportData(this.formData)
      this.loading = false
      this.mainTable = res.Result || []
      this.totalPage = res.TotalCount || 0
    },
    async getLoadData () {
      this.loading = true
      const res = await LoadData(this.formData)
      this.loading = false
      this.mainTable = res.Result ? JSON.parse(res.Result) : []
      this.totalPage = res.TotalCount || 0
      console.log(JSON.parse(res.Result), 'JSON.parse(res.Result)')
    },
    // 搜索
    search_but () {
      this.getLoadData()
    },
    // 是否有效
    change (index, row) {
      console.log(row)
      if (row.ENABLE === 'Y') {
        this.effect.Status = true
      } else {
        this.effect.Status = false
      }
      this.effect.Id = row.ID
      this.$confirm(this.$t('se.ftcuc'), this.$t('se.prompt'), {
        confirmButtonText: this.$t('se.confirm'),
        cancelButtonText: this.$t('se.cancel'),
        type: 'warning'
      })
        .then(() => {
          ChangeEnabled(this.effect).then((res) => {
            if (res.ErrorInfo.Status) {
              this.getLoadData()
              this.$message({
                type: 'error',
                message: res.ErrorInfo.Message
              })
            } else if (res.Result) {
              this.getLoadData()
              this.$message({
                type: 'success',
                message: this.$t('se.Succfied')
              })
            }
          })
        })
        .catch(() => {
          this.getLoadData()
        })
    },
    // 添加
    add_but () {
      this.img.mst_id = 0
      this.img.resource_id = 0
      this.resetTemp()
      this.dialogFormVisible = true
      this.dialogStatus = 'create'
      var date = new Date() // 年
      // var year = date.getFullYear() // 月
      var month = date.getMonth() + 1 // 日
      var day = date.getDate() // 时
      var hh = date.getHours() // 分
      var mm = date.getMinutes() // 秒
      var ss = date.getSeconds()
      var YearZui = date.getYear()
      YearZui = YearZui < 2000 ? YearZui + 1900 : YearZui
      var yy = YearZui.toString().substr(2, 2)
      // var yy = year.toString().substr(2, 2);
      if (month <= 9) {
        month = '0' + month
      }
      if (ss <= 9) {
        ss = '0' + ss
      }
      this.form.NAME = 'HJA' + yy + month + day + hh + mm + ss
      this.getAddOrModify()
    },
    // 添加时清空表格
    resetTemp () {
      this.form = {
        ID: undefined,
        NAME: undefined,
        CATEGORY: undefined,
        PROPERTY_NO: undefined,
        PRODUCT_NO: undefined,
        MODEL: undefined,
        STATION_ID: undefined,
        POWER: undefined,
        VENDOR: undefined,
        BUY_TIME: undefined,
        USER_AGE: undefined,
        END_TIME: undefined,
        STATUS: undefined,
        ENABLE: 'N',
        USER_PART: undefined,
        Img_Resource_id: undefined,
        ImgUrl: undefined,
        ImgName: undefined,
        ImgSize: undefined
      }
    },
    getAddOrModify () {
      AddOrModify().then((res) => {
        this.DepartmentList = res.Result ? res.Result.DepartmentList : []
      })
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
        this.$message.error(this.$t('se._1'))
      }
      if (!isLt2M) {
        this.$message.error(this.$t('se.uisce'))
      }
      return isJPG && isLt2M
    },
    // 上传图片后
    handleAvatarSuccess (response) {
      if (response.ErrorInfo.Status) {
        this.$message({
          message: response.ErrorInfo.Message,
          type: 'error'
        })
      } else {
        this.form.ImgUrl = response.Result.ImgUrl
        this.form.ImgName = response.Result.ImgName
        this.form.ImgSize = response.Result.ImgSize
        this.$message({
          type: 'success',
          message: this.$t('se.picsucc')
        })
      }
      console.log(this.form)
    },
    // 上传图片按钮
    uploadClick () {
      document.querySelector('.avatar-uploader .el-upload__input').click()
    },
    // 清除图片
    clear_but () {
      this.form.ImgUrl = ''
      this.form.img_url = undefined
      this.form.Img_Resource_id = 0
      this.form.ImgName = undefined
      this.form.ImgSize = undefined
    },
    // 编辑
    edit_but (row) {
      // this.modifyForm = JSON.parse(JSON.stringify(row))
      let form = cloneDeep(row)
      let stop = this.organizeList.map(item => item.ID)
      stop = stop.sort((current, next) => (current > next ? 1 : -1))
      stop = stop[0] || 0
      const O_ID = form.O_ID || form.USER_PART
      if (!O_ID) {
        return false
      }
      form.USER_PART = this.reverseGetTree(
        this.planData,
        O_ID && parseInt(O_ID),
        stop
      )
      this.form = form
      // this.form.ImgUrl = row.ImgUrl
      this.img.mst_id = row.ID
      this.img.resource_id = row.Img_Resource_id
      // this.form.Img_Resource_id = row.Img_Resource_id
      // this.form.ID = row.ID
      // this.form.NAME = row.NAME
      // this.form.CATEGORY = row.CATEGORY
      // this.form.PROPERTY_NO = row.PROPERTY_NO
      // this.form.PRODUCT_NO = row.PRODUCT_NO
      // this.form.MODEL = row.MODEL
      // this.form.STATION_ID = row.STATION_ID
      // this.form.POWER = row.POWER
      // this.form.VENDOR = row.VENDOR
      // this.form.BUY_TIME = row.BUY_TIME
      // this.form.USER_AGE = row.USER_AGE
      // this.form.END_TIME = row.END_TIME
      // this.form.STATUS = row.STATUS
      // this.form.ENABLE = row.ENABLE
      // this.form.USER_PART = row.USER_PART
      this.dialogFormVisible = true
      this.dialogStatus = 'update'
    },
    // 递归
    reverseGetTree (data, id, stop) {
      let arr = []
      data.map(item => {
        if (item.ID === id) {
          if (item.PARENT_ORGANIZE_ID && item.ID !== stop) {
            arr.push(
              ...this.reverseGetTree(data, item.PARENT_ORGANIZE_ID, stop)
            )
          }
          arr.push(item.ID)
        }
      })
      return arr
    },
    // 删除
    remove_but (row) {
      if (row) {
        this.$confirm(this.$t('se.fidelete'), this.$t('se.prompt'), {
          confirmButtonText: this.$t('se.confirm'),
          cancelButtonText: this.$t('se.cancel'),
          type: 'warning'
        }).then(() => {
          DeleteOneById(row.ID).then((res) => {
            if (res.Result) {
              this.getLoadData()
              this.$notify({
                title: this.$t('se.success'),
                message: this.$t('se.sudeleted'),
                type: 'success',
                duration: 2000
              })
            }
          })
        })
      }
    },
    // 取消
    cancel (formName) {
      this.dialogFormVisible = false
      this.$refs[formName].resetFields()
    },
    // 确认
    create (formName) {
      this.submit_but(formName)
    },
    // 编辑
    update (formName) {
      this.submit_but(formName)
    },
    endtimeClick () {
      if (this.form.END_TIME <= this.form.BUY_TIME) {
        this.form.END_TIME = ''
        this.$message({
          showClose: true,
          message: this.$t('se._2'),
          type: 'warning'
        })
      }
    },
    // 确认提交
    submit_but (formName) {
      if (
        Object.prototype.toString.call(this.form.USER_PART) ===
        '[object Array]'
      ) {
        this.form.USER_PART = this.form.USER_PART[this.form.USER_PART.length - 1]
      }
      if (this.form.END_TIME <= this.form.BUY_TIME) {
        this.form.END_TIME = ''
        this.$message({
          showClose: true,
          message: this.$t('se._2'),
          type: 'warning'
        })
        return
      }
      this.$refs.form.validate(async (valid, errInfo) => {
        if (valid) {
          const res = await AddOrModifySave(this.form)
          if (res.Result) {
            this.dialogFormVisible = false
            this.getLoadData()
            this.$notify({
              title: this.$t('se.success'),
              message: this.$t('se.savedsus'),
              type: 'success',
              duration: 2000
            })
          }
        } else {
          try {
            Object.keys(errInfo).forEach((item) => {
              this.$message.error(errInfo[item][0].message)
              throw new Error(errInfo[item][0].message)
            })
          } catch (e) { }
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.avatar-uploader {
  height: 350px;
  line-height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
  img {
    height: 100%;
  }
}
.upload-button {
  text-align: center;
}
</style>
<style>
.avatar-uploader .el-upload {
  /* width: 100%; */
  height: 100%;
}
.SfcsEquipment .el-form-item--small .el-form-item__label {
  line-height: 24px;
  padding-bottom: 0px;
}
</style>
