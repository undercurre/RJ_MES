<template>
  <d2-container>
    <template slot="header">
      <custom-container-header :isExport="false"
                               :isExportTpl="false"
                               :isImport="false">
        <el-input v-model="formData.ROUTE_NAME"
                  style="width:150px"
                  :placeholder="$t('SOPRoutes._1')"
                  clearable
                  @keyup.enter.native="search_but" />
        <el-input v-model="formData.PART_NO"
                  style="width:150px"
                  :placeholder="$t('SOPRoutes._2')"
                  clearable
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
        <el-button v-if="$btnList.indexOf('SimpleSOPRoutesAdd') !== -1"
                   type="primary"
                   icon="el-icon-plus"
                   @click.prevent="add_but">{{$t('SOPRoutes._7')}}</el-button>
        <el-button v-if="$btnList.indexOf('SimpleSOPRoutesEdit') !== -1"
                   type="primary"
                   icon="el-icon-edit"
                   @click.prevent="edit_but">{{$t('SOPRoutes._8')}}</el-button>
        <el-button v-if="$btnList.indexOf('SimpleSOPRoutesDelete') !== -1"
                   type="danger"
                   icon="el-icon-delete"
                   @click="remove_but()">{{$t('SOPRoutes._9')}}</el-button>
        <el-button v-if="$btnList.indexOf('SimpleSOPRoutesAuditByIdAsync') !== -1"
                   type="primary"
                   icon="el-icon-check"
                   @click.prevent="review_but">{{$t('SOPRoutes._10')}}</el-button>
        <el-button v-if="$btnList.indexOf('SimpleSOPRoutesUnAuditByIdAsync') !== -1"
                   type="warning"
                   icon="el-icon-check"
                   @click.prevent="CancelReview_but">
          <i class="el-icon-magic-stick" />{{$t('SOPRoutes._11')}}
        </el-button>
        <el-button v-if="$btnList.indexOf('SimpleSOPRoutesCopy') !== -1"
                   type="success"
                   icon="el-icon-share"
                   @click.prevent="copy_but">{{$t('SOPRoutes._12')}}</el-button>
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
        <el-table-column :show-overflow-tooltip="true"
                         prop="PART_NO"
                         :label="$t('SOPRoutes._26')"
                         align="center" />
        <el-table-column :show-overflow-tooltip="true"
                         prop="ROUTE_NAME"
                         :label="$t('SOPRoutes._13')"
                         align="center" />
        <el-table-column :show-overflow-tooltip="true"
                         prop="STATUS"
                         :label="$t('SOPRoutes._14')"
                         align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.STATUS === 0">{{$t('SOPRoutes._15')}}</span>
            <span v-if="scope.row.STATUS === 1">{{$t('SOPRoutes._16')}}</span>
          </template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true"
                         prop="CREATER"
                         :label="$t('SOPRoutes._17')"
                         align="center" />
        <el-table-column :show-overflow-tooltip="true"
                         prop="CREATE_TIME"
                         :label="$t('SOPRoutes._18')"
                         align="center">
          <template slot-scope="scope">{{ scope.row.CREATE_TIME|formatdate }}</template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true"
                         prop="AUDITOR"
                         :label="$t('SOPRoutes._19')"
                         align="center" />
        <el-table-column :show-overflow-tooltip="true"
                         prop="AUDIT_TIME"
                         :label="$t('SOPRoutes._20')"
                         align="center">
          <template slot-scope="scope">{{ scope.row.AUDIT_TIME|formatdate }}</template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true"
                         prop="LAST_UPDATE_TIME"
                         :label="$t('SOPRoutes._21')"
                         align="center">
          <template slot-scope="scope">{{ scope.row.LAST_UPDATE_TIME|formatdate }}</template>
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true"
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

    <!-- 复制 -->
    <el-dialog v-dialogDrag
               width="50%"
               :title="$t('SOPRoutes._23')"
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
        <el-form-item :label="$t('SOPRoutes._26')">
          <el-input v-model="copyVal.PART_NO_NEW"
                    @change="partClick"
                    :placeholder="$t('SOPRoutes._27')" />
        </el-form-item>
        <el-form-item :label="$t('SOPRoutes._28')">
          <el-input v-model="copyVal.ROUTE_NAME_NEW"
                    :placeholder="$t('SOPRoutes._29')" />
        </el-form-item>
        <el-form-item :label="$t('SOPRoutes._22')">
          <el-input v-model="copyVal.DESCRIPTION_NEW"
                    type="textarea"
                    :Lplaceholder="$t('SOPRoutes._30')" />
        </el-form-item>
        <div style="text-align: center;">
          <el-button type="success"
                     @click="CopyShout_but">&nbsp;{{$t('SOPRoutes._31')}}&nbsp;</el-button>
          <el-button @click="CopyReset_but">&nbsp;{{$t('SOPRoutes._32')}}&nbsp;</el-button>
        </div>
      </el-form>
    </el-dialog>
  </d2-container>
</template>
<script>
import {
  LoadData,
  AuditByIdAsync,
  UnAuditByIdAsync,
  SOPCopySave,
  IsExistsName,
  Delete,
  GetPartByPartNo
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
  name: 'Page',
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
      listLoading: false,
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
        PART_NO_NEW: '',
        ROUTE_NAME_NEW: '',
        DESCRIPTION_NEW: '',
        CREATER: ''
      },
      IsExistsVal: {
        PART_NO: ''
      }
    }
  },
  methods: {
    // 获取列表
    async getLoadData () {
      this.listLoading = true
      const res = await LoadData(this.formData)
      const data = JSON.parse(res.Result)
      this.listLoading = false
      this.TableList = data
      this.totalPage = res.TotalCount || 0
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
          Delete(this.Delete.id)
            .then(res => {
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
      if (this.value2) {
        this.formData.create_begin = this.value2[0]
        this.formData.create_end = this.value2[1]
      } else {
        this.formData.create_begin = ''
        this.formData.create_end = ''
      }

      this.getLoadData()
    },
    // 添加
    add_but () {
      this.$router.push({
        path: '/SOPsimple/AddOrModify/Index',
        query: {
          mst_id: -1
        }
      })
      // this.$emit('close')
      // this.$nextTick(function () {
      //   this.Bus.emit('Edit', -1)
      // })
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
        // window.open('/SOPsimple/AddOrModify/Index/?mst_id' + this.tableval.ID)
        this.$router.push({
          path: '/SOPsimple/AddOrModify/Index',
          query: {
            mst_id: this.tableval.ID
          }
        })
        // this.$emit('close')
        // this.$nextTick(function () {
        //   this.Bus.emit('Edit', this.tableval.ID)
        // })
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
        this.$confirm(
          this.$t('SOPRoutes._47'),
          this.$t('SOPRoutes._40'),
          {
            confirmButtonText: this.$t('SOPRoutes._31'),
            cancelButtonText: this.$t('SOPRoutes._48'),
            type: 'warning'
          }
        ).then(() => {
          this.reviewVal.Id = this.tableval.ID
          this.reviewVal.Operator = this.userinfo.USER_NAME
          UnAuditByIdAsync(this.reviewVal)
            .then(response => {
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
    // 复制
    copy_but () {
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
      this.IsExistsVal.PART_NO = this.copyVal.PART_NO_NEW
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
            SOPCopySave(this.copyVal).then(response => {
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
      // SOPCopySaveNew(this.copyVal).then(response => {
      //   if (response.Result) {
      //     this.copyVisible = false
      //     this.getLoadData()
      //     this.CopyReset_but()
      //     this.$notify({
      //       title: this.$t('SOPRoutes._41'),
      //       message: this.$t('SOPRoutes._51'),
      //       type: 'success',
      //       duration: 2000
      //     })
      //   }
      // })
    },
    //  复制重置
    CopyReset_but () {
      this.copyVal.PART_NO_NEW = ''
      this.copyVal.ROUTE_NAME_NEW = ''
      this.copyVal.DESCRIPTION_NEW = ''
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
  }
}
</script>
