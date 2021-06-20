 <template>
  <d2-container>
    <template slot="header">
      <custom-container-header :isExport="false"
                               :isExportTpl="false"
                               :isImport="false">

        <el-input v-model="formData.PART_NO"
                  style="width:150px"
                  :placeholder="$t('SOPRoutes._2')"
                  clearable
                  @input="search_but"
                  @keyup.enter.native="search_but" />
        <el-input v-model="formData.ROUTE_NAME"
                  style="width:150px"
                  :placeholder="$t('SOPRoutes._1')"
                  clearable
                  @input="search_but"
                  @keyup.enter.native="search_but" />
        <el-input v-model="formData.DESCRIPTION"
                  style="width:150px"
                  :placeholder="$t('SOPRoutes._196')"
                  clearable
                  @input="search_but"
                  @keyup.enter.native="search_but" />
        <el-select v-model="formData.STATUS"
                   style="width:150px"
                   clearable
                   :placeholder="$t('SOPRoutes._3')">
          <el-option v-for="item in sort"
                     :key="item.ID"
                     :label="item.SBU_CHINESE"
                     :value="item.ID" />
        </el-select>
        <el-date-picker v-model="value2"
                        type="daterange"
                        :picker-options="pickerOptions"
                        style="width:230px;margin-right: 10px"
                        :start-placeholder="$t('SOPRoutes._4')"
                        :end-placeholder="$t('SOPRoutes._5')"
                        align="right"
                        value-format="yyyy-MM-dd" />
        <el-button type="success"
                   icon="el-icon-search"
                   @click.prevent="search_but">{{$t('SOPRoutes._6')}}</el-button>
        <el-button type="primary"
                   icon="el-icon-plus"
                   @click.prevent="add_but"
                   v-if="$btnList.indexOf('ProductPageAdd') !== -1">{{$t('SOPRoutes._7')}}</el-button>
        <!-- v-if="$btnList.indexOf('ProductPageSave') !== -1" -->
        <el-button type="primary"
                   icon="el-icon-edit"
                   @click.prevent="edit_but">{{$t('SOPRoutes._8')}}</el-button>
        <el-button type="danger"
                   icon="el-icon-delete"
                   @click="remove_but()"
                   v-if="$btnList.indexOf('ProductPageDelete') !== -1">{{$t('SOPRoutes._9')}}</el-button>
        <el-button type="primary"
                   icon="el-icon-check"
                   @click.prevent="review_but"
                   v-if="$btnList.indexOf('ProductPageReview') !== -1">{{$t('SOPRoutes._10')}}</el-button>
        <el-button type="warning"
                   icon="el-icon-magic-stick"
                   @click.prevent="CancelReview_but"
                   v-if="$btnList.indexOf('ProductPageCancelReview') !== -1">{{$t('SOPRoutes._11')}}</el-button>
        <el-button type="success"
                   icon="el-icon-share"
                   @click.prevent="copy_but(1)"
                   v-if="$btnList.indexOf('ProductPageCopy') !== -1">{{$t('SOPRoutes._12')}}</el-button>
        <el-button type="success"
                   icon="el-icon-share"
                   @click.prevent="copy_but(2)"
                   v-if="$btnList.indexOf('BatchSOPCopySaveNewBulkcopy') !== -1">{{$t('批量复制')}}</el-button>
      </custom-container-header>
    </template>
    <div class="table-container">
      <el-table v-loading="listLoading"
                border
                stripe
                :data="TableList"
                height="100%"
                highlight-current-row
                :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                @row-click="handleChangeCurrent">
        <el-table-column :show-overflow-tooltip="true"
                         :label="$t('SOPRoutes._64')"
                         width="60"
                         align="center">
          <template slot-scope="scope">
            <el-radio class="custom-radio"
                      v-model="radio"
                      :label="scope.$index" />
          </template>
        </el-table-column>
        <el-table-column min-width="100"
                         :show-overflow-tooltip="true"
                         prop="PART_NO"
                         :label="$t('SOPRoutes._26')"
                         align="center" />
        <el-table-column min-width="100"
                         :show-overflow-tooltip="true"
                         prop="ROUTE_NAME"
                         :label="$t('SOPRoutes._13')"
                         align="center" />
        <el-table-column min-width="150"
                         :show-overflow-tooltip="true"
                         prop="STATUS"
                         :label="$t('SOPRoutes._14')"
                         align="center">
          <template slot-scope="scope">
            <span style="color: red;" v-if="scope.row.STATUS === 0">{{$t('SOPRoutes._15')}}</span>
            <span style="color: green;" v-if="scope.row.STATUS === 1">{{$t('SOPRoutes._16')}}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="100"
                         :show-overflow-tooltip="true"
                         prop="CREATER"
                         :label="$t('SOPRoutes._17')"
                         align="center" />
        <el-table-column min-width="100"
                         :show-overflow-tooltip="true"
                         prop="CREATE_TIME"
                         :label="$t('SOPRoutes._18')"
                         align="center">
          <template slot-scope="scope">{{ scope.row.CREATE_TIME|formatdate }}</template>
        </el-table-column>
        <el-table-column min-width="100"
                         :show-overflow-tooltip="true"
                         prop="AUDITOR"
                         :label="$t('SOPRoutes._19')"
                         align="center" />
        <el-table-column min-width="100"
                         :show-overflow-tooltip="true"
                         prop="AUDIT_TIME"
                         :label="$t('SOPRoutes._20')"
                         align="center">
          <template slot-scope="scope">{{ scope.row.AUDIT_TIME|formatdate }}</template>
        </el-table-column>
        <el-table-column min-width="160"
                         :show-overflow-tooltip="true"
                         prop="LAST_UPDATE_TIME"
                         :label="$t('SOPRoutes._21')"
                         align="center">
          <template slot-scope="scope">{{ scope.row.LAST_UPDATE_TIME|formatdate }}</template>
        </el-table-column>
        <el-table-column min-width="100"
                         :show-overflow-tooltip="true"
                         prop="ROUTE_NAME_ALIS"
                         :label="$t('SOPRoutes._195')"
                         align="center" />
        <el-table-column min-width="100"
                         :show-overflow-tooltip="true"
                         prop="DESCRIPTION"
                         :label="$t('SOPRoutes._22')"
                         align="center" />
      </el-table>
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
    <!-- 复制--批量复制 -->
    <el-dialog v-dialogDrag
               width="50%"
               :title="copyType === 1 ?$t('SOPRoutes._23'): $t('SOPRoutes._194')"
               :visible.sync="copyVisible"
               :close-on-click-modal="false"
               append-to-body
               class="call-dialog">
      <el-form ref="form"
               label-width="110px">
        <el-form-item :label="$t('SOPRoutes._24')">
          <el-input v-model="PART_NO"
                    disabled />
        </el-form-item>
        <el-form-item :label="$t('SOPRoutes._25')">
          <el-input v-model="ROUTE_NAME"
                    disabled />
        </el-form-item>
        <el-form-item :label="$t('SOPRoutes._26')"
                      v-if="copyType === 1">
          <el-input v-model="copyVal.PART_NO_NEW"
                    @change="partClick"
                    :placeholder="$t('SOPRoutes._27')" />
        </el-form-item>
        <el-form-item :label="$t('SOPRoutes._26')"
                      v-if="copyType === 2">
          <el-button type="success"
                     style="margin-bottom: 10px;"
                     @click.prevent="AddPart">{{$t('SOPRoutes._7')}}</el-button>
          <el-button type="danger"
                     style="margin-bottom: 10px;"
                     @click="RemovePart">{{$t('SOPRoutes._9')}}</el-button>
          <div style="height: 300px">
            <!--
              ref="xTablePART"
                       border
                       stripe
                       highlight-hover-row
                       highlight-current-row
                       show-overflow
                       auto-resize
                       keep-source
                       width="100%"
                       height="100%"
                       :edit-config="{ mode: 'row', showStatus: true }"
                       :radio-config="{ labelField: 'name', trigger: 'row' }"
                       :data="NewPartBox"
             -->
            <vxe-table ref="xTablePART"
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
                       :data="NewPartBox"
                       :mouse-config="{selected: true}"
                       :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
                       :radio-config="{labelField: 'name', trigger: 'row'}">
              <vxe-table-column type="checkbox"
                                align="center"
                                width="60"></vxe-table-column>
              <vxe-table-column show-overflow
                                :title="$t('料号')"
                                min-width="150"
                                align="center"
                                field="CODE" />
              <vxe-table-column show-overflow
                                :title="$t('名称')"
                                min-width="150"
                                align="center"
                                field="NAME" />
              <vxe-table-column show-overflow
                                :title="$t('描述')"
                                min-width="150"
                                align="center"
                                field="DESCRIPTION" />

            </vxe-table>
          </div>
        </el-form-item>

        <el-form-item :label="$t('SOPRoutes._28')"
                      v-if="copyType === 1">
          <el-input v-model="copyVal.ROUTE_NAME_NEW"
                    :placeholder="$t('SOPRoutes._29')" />
        </el-form-item>
        <el-form-item :label="$t('SOPRoutes._22')"
                      v-if="copyType === 1">
          <el-input v-model="copyVal.DESCRIPTION_NEW"
                    type="textarea"
                    :Lplaceholder="$t('SOPRoutes._30')" />
        </el-form-item>
        <div class="call-dialog-button"
             style="text-align: center">
          <el-button type="success"
                     @click="CopyShout_but">&nbsp;{{$t('SOPRoutes._31')}}&nbsp;</el-button>
          <el-button @click="CopyReset_but">&nbsp;{{$t('SOPRoutes._32')}}&nbsp;</el-button>
        </div>
      </el-form>
    </el-dialog>
    <!-- 选择料号 -->
    <el-dialog :close-on-click-modal="false"
               :title="$t('选择料号')"
               width="60%"
               :visible.sync="dialogPartNo"
               :append-to-body="true">
      <div style="margin-bottom: 10px;">
        <el-input v-model="Partform.partNo"
                  style="width:200px"
                  :placeholder="$t('mtf._86')"
                  clearable
                  @input="PartSearch"
                  @keyup.enter.native="PartSearch" />
        <el-button type="success"
                   icon="el-icon-search"
                   @click.prevent="PartSearch">{{$t('SOPRoutes._6')}}</el-button>
      </div>
      <div style="height: 300px">

        <vxe-table ref="xTableFlie"
                   border
                   stripe
                   highlight-hover-row
                   highlight-current-row
                   show-overflow
                   auto-resize
                   keep-source
                   width="100%"
                   height="100%"
                   :edit-config="{ mode: 'row', showStatus: true }"
                   :radio-config="{ labelField: 'name', trigger: 'row' }"
                   :data="NewPartList">
          <vxe-table-column type="checkbox"
                            align="center"
                            width="60"></vxe-table-column>
          <vxe-table-column show-overflow
                            :title="$t('料号')"
                            min-width="150"
                            align="center"
                            field="CODE" />
          <vxe-table-column show-overflow
                            :title="$t('名称')"
                            min-width="150"
                            align="center"
                            field="NAME" />
          <vxe-table-column show-overflow
                            :title="$t('描述')"
                            min-width="150"
                            align="center"
                            field="DESCRIPTION" />

        </vxe-table>
      </div>
      <el-pagination :pager-count="5"
                     style="margin-top: 10px;"
                     :current-page="Partform.Page"
                     :page-size="Partform.Limit"
                     :page-sizes="[15, 25, 35, 45]"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="NewPartCount"
                     @size-change="NewPartSizeChange"
                     @current-change="NewPartCurrentChange" />
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogPartNo = false">
          {{ $t("_kanban._4") }}
        </el-button>
        <el-button type="primary"
                   @click="FileSystemSubmit">
          {{ $t("SfcsProductPallet._45") }}
        </el-button>
      </span>
    </el-dialog>
  </d2-container>
</template>

<script>
// import {
//   LoadData,
//   AuditByIdAsync,
//   UnAuditByIdAsync,
//   SOPCopySave,
//   Delete
// } from '@/api/SOPRoutes/index.js'
import {
  LoadData,
  AuditByIdAsync,
  UnAuditByIdAsync,
  SOPCopySaveNew,
  Delete,
  GetPartByPartNo,
  IsExistsName,
  GetNewPart,
  BatchSOPCopySaveNew
} from '@/api/SimpleSOPRoutes/index.js'
import pagination from '@/views/mixin/page'
import customContainerHeader from '@/components/custom-container-header'
import { mapGetters } from 'vuex'
function IsNullOrEmpty (obj) {
  if (obj === null || obj === undefined || obj.length === 0) {
    return true
  } else {
    return false
  }
}
export default {
  name: 'ProductPage',
  mixins: [pagination],
  components: {
    customContainerHeader
  },
  computed: {
    ...mapGetters(['userinfo'])
  },
  filters: {
    formatdate: function (dateStr) {
      let value = dateStr
      if (!IsNullOrEmpty(dateStr) && dateStr === '0001-01-01') {
        value = ''
      }
      return value
    }
  },
  data () {
    return {
      listLoading: true,
      mainheight: 0,
      sort: [
        {
          ID: 0,
          SBU_CHINESE: this.$t('SOPRoutes._33')
        },
        {
          ID: 1,
          SBU_CHINESE: this.$t('SOPRoutes._34')
        }
      ],
      pickerOptions: {
        shortcuts: [
          {
            text: this.$t('SOPRoutes._35'),
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: this.$t('SOPRoutes._36'),
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: this.$t('SOPRoutes._37'),
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
      formData: {
        Page: 1, // 当前页
        Limit: 15, // 分页大小
        Key: null, // 搜索关键字
        PART_NO: '', // 料号
        ROUTE_NAME: '', // 路线名称
        STATUS: '', // 状态
        create_begin: '',
        create_end: ''
      },
      TableList: [],
      tableval: [], // 点击获取的数据
      radio: '',
      // 删除
      Delete: {
        id: ''
      },
      // 取消审核和审核
      reviewVal: {
        Id: '',
        Operator: ''
      },
      // 复制
      copyVisible: false,
      PART_NO: '',
      ROUTE_NAME: '',
      copyVal: {
        ID: '',
        PART_NO_NEW: '', // 新的料号
        ROUTE_NAME_NEW: '',
        DESCRIPTION_NEW: '',
        CREATER: ''
      },
      // Part
      NewPartBox: [],
      NewPartList: [],
      copyType: 1,
      Partform: {
        pageIndex: 1,
        pageSize: 15,
        partNo: ''
      },
      dialogPartNo: false,
      NewPartCount: 0,
      IsExistsVal: {
        ID: 0,
        PART_NO: ''
      }
    }
  },
  methods: {
    // 获取列表
    async getLoadData () {
      const res = await LoadData(this.formData)
      const data = JSON.parse(res.Result)
      if (data) {
        this.TableList = data || []
        this.totalPage = res.TotalCount || 0
      }
      this.listLoading = false
    },
    PartSearch () {
      this.Partform.pageIndex = 1
      this.GetPart()
    },
    // 批量复制
    async GetPart () {
      const res = await GetNewPart(this.Partform)
      const data = res.Result.data
      this.NewPartList = data || []
      this.NewPartCount = res.Result.count || 0
      // if (!this.NewPartList.length) {
      //   this.NewPartList.push({
      //     CODE: ''
      //   })
      // }
    },
    NewPartSizeChange (Limit) {
      this.Partform.pageIndex = 1
      this.listQuery.Limit = Limit
      this.GetPart()
    },
    NewPartCurrentChange (Page) {
      this.Partform.pageIndex = Page
      this.GetPart()
    },
    partsearc () {
      this.Partform.pageIndex = 1
      this.GetPart()
    },
    AddPart () {
      this.dialogPartNo = true
    },
    RemovePart () {
      let selectRecords = this.$refs.xTablePART.getCheckboxRecords()
      if (!selectRecords.length) {
        return this.$message.error(this.$t('请选择要删除一行'))
      }
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
          this.$refs.xTablePART.remove(selectRecords)
          this.$notify({
            title: this.$t('SOPRoutes._41'),
            message: this.$t('SOPRoutes._42'),
            type: 'success',
            duration: 2000
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('MesTongsApply._95')
          })
        })
    },
    FileSystemSubmit () {
      let selectRecords = this.$refs.xTableFlie.getCheckboxRecords()
      if (!selectRecords.length) {
        return this.$message.error(this.$t('请选择料号'))
      }
      const arr1Ids = this.NewPartBox.map(item => item.CODE)
      const result = selectRecords.filter(item => !arr1Ids.includes(item.CODE))
      console.log(this.selectRecords, '----NewPartList')
      var that = this
      result.forEach(function (item) {
        const record = {
          CODE: item.CODE,
          NAME: item.NAME,
          DESCRIPTION: item.DESCRIPTION
        }
        // 从最后插入
        that.NewPartBox.push(record)
        // vm.$refs.xTable.insertAt(record, -1)
      })
      this.GetPart()
      this.dialogPartNo = false
    },
    // 选中
    handleChangeCurrent (row, rowIndex) {
      this.tableval = row
      this.radio = this.TableList.indexOf(row)
    },
    // 删除
    remove_but () {
      if (this.tableval.length === 0) {
        this.$message({
          showClose: true,
          message: this.$t('SOPRoutes._38'),
          type: 'warning'
        })
      } else {
        this.$confirm(this.$t('SOPRoutes._39'), this.$t('SOPRoutes._40'), {
          type: 'warning'
        }).then(() => {
          this.Delete.id = this.tableval.ID
          Delete(this.Delete.id).then(res => {
            if (res.Result) {
              this.getLoadData()
              this.$notify({
                title: this.$t('SOPRoutes._41'),
                message: this.$t('SOPRoutes._42'),
                type: 'success',
                duration: 2000
              })
            }
          })
        })
      }
    },
    // 搜索
    search_but () {
      this.formData.Page = 1
      this.formData.create_begin = this.value2[0]
      this.formData.create_end = this.value2[1]
      this.getLoadData()
    },
    // 添加
    add_but () {
      this.$emit('close')
      this.$nextTick(function () {
        this.Bus.emit('mstData', '')
      })
    },
    // 编辑
    edit_but () {
      if (this.tableval.length === 0) {
        this.$message({
          showClose: true,
          message: this.$t('SOPRoutes._43'),
          type: 'warning'
        })
      } else {
        this.$emit('close')
        this.$nextTick(function () {
          this.Bus.emit('mstData', this.tableval)
        })
      }
    },
    // 审核
    async review_but () {
      if (this.tableval.length === 0) {
        this.$message({
          showClose: true,
          message: this.$t('SOPRoutes._44'),
          type: 'warning'
        })
      } else {
        this.$confirm(this.$t('SOPRoutes._190'), this.$t('SOPRoutes._40'), {
          confirmButtonText: this.$t('SOPRoutes._31'),
          cancelButtonText: this.$t('SOPRoutes._48'),
          type: 'warning'
        }).then(() => {
          this.reviewVal.Id = this.tableval.ID
          this.reviewVal.Operator = this.userinfo.USER_NAME
          AuditByIdAsync(this.reviewVal).then(response => {
            if (response.Result) {
              this.getLoadData()
              this.$notify({
                title: this.$t('SOPRoutes._41'),
                message: this.$t('SOPRoutes._45'),
                type: 'success',
                duration: 2000
              })
            }
          })
        })
      }
    },
    // 取消审核
    CancelReview_but () {
      if (this.tableval.length === 0) {
        this.$message({
          showClose: true,
          message: this.$t('SOPRoutes._46'),
          type: 'warning'
        })
      } else {
        this.$confirm(this.$t('SOPRoutes._47'), this.$t('SOPRoutes._40'), {
          confirmButtonText: this.$t('SOPRoutes._31'),
          cancelButtonText: this.$t('SOPRoutes._48'),
          type: 'warning'
        }).then(() => {
          this.reviewVal.Id = this.tableval.ID
          this.reviewVal.Operator = this.userinfo.USER_NAME
          UnAuditByIdAsync(this.reviewVal).then(response => {
            if (response.Result) {
              this.getLoadData()
              this.$notify({
                title: this.$t('SOPRoutes._41'),
                message: this.$t('SOPRoutes._49'),
                type: 'success',
                duration: 2000
              })
            }
          })
        })
      }
    },
    // 复制--批量复制
    copy_but (e) {
      this.CopyReset_but()
      this.copyType = e
      if (this.tableval.length === 0) {
        this.$message({
          showClose: true,
          message: this.$t('SOPRoutes._50'),
          type: 'warning'
        })
      } else {
        this.copyVal.ID = this.tableval.ID
        this.PART_NO = this.tableval.PART_NO
        this.ROUTE_NAME = this.tableval.ROUTE_NAME
        this.copyVisible = true
        this.copyVal.CREATER = this.userinfo.USER_NAME
      }
    },
    async partClick (e) {
      console.log(e, 'eeeee')
      const res = await GetPartByPartNo(e)
      const data = JSON.parse(res.Result)
      if (data !== null) {
        this.copyVal.ROUTE_NAME_NEW = data.NAME
        this.copyVal.DESCRIPTION_NEW = data.DESCRIPTION
        this.IsExistsVal.ID = data.ID
        this.IsExistsVal.PART_NO = this.copyVal.PART_NO_NEW
      } else {
        this.$message({
          showClose: true,
          message: this.$t('SOPRoutes._99'),
          type: 'warning'
        })
        this.copyVal.PART_NO_NEW = ''
        this.copyVal.ROUTE_NAME_NEW = ''
        this.copyVal.DESCRIPTION_NEW = ''
      }
    },
    //  复制提交
    CopyShout_but () {
      if (this.copyType === 1) {
        if (this.copyVal.PART_NO_NEW === '') {
          this.$message({
            showClose: true,
            message: this.$t('SOPRoutes._27'),
            type: 'warning'
          })
          return
        }
        if (this.copyVal.ROUTE_NAME_NEW === '') {
          this.$message({
            showClose: true,
            message: this.$t('SOPRoutes._29'),
            type: 'warning'
          })
          return
        }
      } else {
        if (this.NewPartBox.length === 0) {
          this.$message({
            showClose: true,
            message: this.$t('SOPRoutes._193'),
            type: 'warning'
          })
          return
        }
      }

      // 单个复制
      if (this.copyType === 1) {
        IsExistsName(this.IsExistsVal).then(res => {
          console.log(res)
          if (res.Result !== void 0) {
            if (res.Result) {
              this.$message({
                showClose: true,
                message: this.$t('SOPRoutes._105'),
                type: 'warning'
              })
            } else {
              SOPCopySaveNew(this.copyVal).then(response => {
                if (response.Result) {
                  this.copyVisible = false
                  this.getLoadData()
                  this.CopyReset_but()
                  this.$notify({
                    title: this.$t('SOPRoutes._41'),
                    message: this.$t('SOPRoutes._51'),
                    type: 'success',
                    duration: 2000
                  })
                }
              })
            }
          }
        })
      } else {
        // 批量复制
        var modelList = []
        this.NewPartBox.map(v => {
          var copyVal = {
            ID: this.copyVal.ID,
            PART_NO_NEW: v.CODE, // 新的料号
            ROUTE_NAME_NEW: v.NAME,
            DESCRIPTION_NEW: v.DESCRIPTION,
            CREATER: this.copyVal.CREATER
          }
          modelList.push(copyVal)
        })
        console.log(modelList)
        console.log(JSON.stringify(modelList))
        BatchSOPCopySaveNew({ 'modelList': modelList }).then(response => {
          if (response.Result) {
            this.copyVisible = false
            this.getLoadData()
            this.CopyReset_but()
            this.$notify({
              title: this.$t('SOPRoutes._41'),
              message: this.$t('SOPRoutes._51'),
              type: 'success',
              duration: 2000
            })
          }
        })
      }
    },
    //  复制重置
    CopyReset_but () {
      this.copyVal.PART_NO_NEW = ''
      this.copyVal.ROUTE_NAME_NEW = ''
      this.copyVal.DESCRIPTION_NEW = ''
      this.NewPartBox = []
    },
    handleSizeChange (val) {
      this.formData.Limit = val
      this.getLoadData()
    },
    handleCurrentChange (val) {
      this.formData.Page = val
      this.getLoadData()
    }
  },
  created () {
    this.getLoadData()
    this.GetPart()
  }
}
</script>
