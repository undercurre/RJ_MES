<template>
  <custom-container class="CheckMarker">
    <template slot="header">
      <custom-container-header :isFull="true"
                               :isExport="false"
                               :isExportTpl="false"
                               :isImport="false">
        <el-select v-model="listQuery.CATEGORY"
                   style="width:150px"
                   clearable
                   :placeholder="$t('SfcsEquipKeep._1')"
                   class="common-top">
          <el-option v-for="item in deviceType"
                     :key="item.LOOKUP_CODE"
                     :label="item.CHINESE"
                     :value="item.LOOKUP_CODE" />
        </el-select>
        <el-select v-model="listQuery.STATION_ID"
                   style="width:150px"
                   clearable
                   :placeholder="$t('SfcsEquipKeep._2')"
                   class="common-top">
          <el-option v-for="item in LinesList"
                     :key="item.ID"
                     :label="item.LINE_NAME"
                     :value="item.ID" />
        </el-select>
        <el-select v-model="listQuery.KEEP_TYPE"
                   style="width:150px"
                   clearable
                   :placeholder="$t('SfcsEquipKeep._3')"
                   class="common-top">
          <el-option v-for="item in section"
                     :key="item.KEEP_TYPE"
                     :label="item.label"
                     :value="item.KEEP_TYPE" />
        </el-select>
        <el-select v-model="listQuery.KEEP_CHECK_STATUS"
                   style="width:150px"
                   clearable
                   :placeholder="$t('SfcsEquipKeep._4')"
                   class="common-top">
          <el-option v-for="item in sort"
                     :key="item.ID"
                     :label="item.SBU_CHINESE"
                     :value="item.ID" />
        </el-select>
        <el-input v-model="listQuery.KEEP_USER"
                  style="width:150px"
                  :placeholder="$t('SfcsEquipKeep._5')"
                  clearable
                  class="common-top"
                  @keyup.enter.native="search_but" />
        <el-date-picker v-model="value2"
                        type="datetimerange"
                        :picker-options="pickerOptions"
                        style="width:230px;margin-right: 9px;"
                        :start-placeholder="$t('SfcsEquipKeep._6')"
                        :end-placeholder="$t('SfcsEquipKeep._7')"
                        align="right"
                        class="common-top"
                        value-format="yyyy-MM-dd" />
        <el-button type="primary"
                   icon="el-icon-search"
                   class="common-top"
                   @click.prevent="search_but">{{$t('SfcsEquipKeep._8')}}</el-button>
        <el-button v-if="$btnList.indexOf('SfcsEquipKeepAdd') !== -1"
                   type="success"
                   icon="el-icon-plus"
                   class="common-top"
                   @click.prevent="add_but">{{$t('SfcsEquipKeep._9')}}</el-button>
        <el-button v-if="$btnList.indexOf('SfcsEquipKeepedit') !== -1"
                   type="primary"
                   icon="el-icon-edit"
                   class="common-top"
                   @click.prevent="edit_but">{{$t('SfcsEquipKeep._10')}}</el-button>
        <el-button v-if="$btnList.indexOf('SfcsEquipKeepdelete') !== -1"
                   type="danger"
                   icon="el-icon-delete"
                   class="common-top"
                   @click="remove_but()">{{$t('SfcsEquipKeep._11')}}</el-button>
        <el-button v-if="$btnList.indexOf('SfcsEquipKeepAudit') !== -1"
                   type="primary"
                   icon="el-icon-circle-check"
                   class="common-top"
                   @click.prevent="review_but">{{$t('SfcsEquipKeep._12')}}</el-button>
        <el-button v-if="$btnList.indexOf('SfcsEquipKeepRefuse') !== -1"
                   type="danger"
                   icon="el-icon-close"
                   class="common-top"
                   @click.prevent="refuse_but">{{$t('SfcsEquipKeep._13')}}</el-button>
      </custom-container-header>
    </template>
    <div class="out-table-container">
      <el-table v-loading="listLoading"
                border
                stripe
                highlight-current-row
                auto-resize
                :data="LoadData"
                style="width: 100%;border-bottom: 1px solid #dfe6ec;"
                :header-cell-style="{background:'#eef1f6',color:'#606266'}"
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

        <el-table-column min-width="100"
                         prop="KEEP_CODE"
                         :label="$t('SfcsEquipKeep._14')"
                         align="center"
                         :show-overflow-tooltip="true" />
        <el-table-column min-width="80"
                         prop="Line_Name"
                         :label="$t('SfcsEquipKeep._15')"
                         align="center"
                         :show-overflow-tooltip="true" />
        <el-table-column min-width="150"
                         prop="CATEGORY_Name"
                         :label="$t('SfcsEquipKeep._83')"
                         align="center"
                         :show-overflow-tooltip="true" />
        <el-table-column min-width="100"
                         prop="EQUIP_Name"
                         :label="$t('SfcsEquipKeep._84')"
                         align="center"
                         :show-overflow-tooltip="true" />
        <el-table-column min-width="120"
                         prop="KEEP_TYPE"
                         :label="$t('SfcsEquipKeep._18')"
                         align="center"
                         :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span v-if="scope.row.KEEP_TYPE == 0">{{$t('SfcsEquipKeep._20')}}</span>
            <span v-if="scope.row.KEEP_TYPE == 1">{{$t('SfcsEquipKeep._21')}}</span>
            <span v-if="scope.row.KEEP_TYPE == 2">{{$t('SfcsEquipKeep._22')}}</span>
            <span v-if="scope.row.KEEP_TYPE == 3">{{$t('se_cc.wm')}}</span>
            <span v-if="scope.row.KEEP_TYPE == 4">{{$t('se_cc.sm')}}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="100"
                         prop="KEEP_TIME"
                         :label="$t('SfcsEquipKeep._19')"
                         align="center"
                         :show-overflow-tooltip="true" />
        <el-table-column min-width="100"
                         prop="KEEP_CHECKER"
                         :label="$t('SfcsEquipKeep._23')"
                         align="center"
                         :show-overflow-tooltip="true" />
        <el-table-column min-width="100"
                         prop="KEEP_CHECK_STATUS"
                         :label="$t('SfcsEquipKeep._24')"
                         align="center"
                         :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span v-if="scope.row.KEEP_CHECK_STATUS == 0">{{$t('SfcsEquipKeep._25')}}</span>
            <span v-if="scope.row.KEEP_CHECK_STATUS == 1">{{$t('SfcsEquipKeep._26')}}</span>
            <span v-if="scope.row.KEEP_CHECK_STATUS == 3">{{$t('SfcsEquipKeep._27')}}</span>
            <span v-if="scope.row.KEEP_CHECK_STATUS == 4">{{$t('SfcsEquipKeep._28')}}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="100"
                         prop="KEEP_CHECK_TIME"
                         :label="$t('SfcsEquipKeep._29')"
                         align="center"
                         :show-overflow-tooltip="true" />
      </el-table>
    </div>
    <template slot="footer">
      <el-pagination ref="pagi"
                     class="SfcsEquipKeep-pagination"
                     :current-page="listQuery.Page"
                     :page-sizes="[15, 25, 35, 45]"
                     :page-size="listQuery.Limit"
                     :total="total"
                     layout="total, sizes, prev, pager, next, jumper"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange" />
    </template>
  </custom-container>
</template>
<style>
.CheckMarker .radio .el-radio__label {
  display: none;
}
</style>
<script>
import {
  Index,
  LoadData,
  Delete,
  CheckBill,
  RejectBill
} from '@/api/SfcsEquipKeep'
import customContainer from '@/components/custom-container'
import customContainerHeader from '@/components/custom-container-header'
import { mapGetters } from 'vuex'
export default {
  name: 'CheckMarker',
  components: { customContainerHeader, customContainer },
  computed: {
    ...mapGetters(['userinfo'])
  },
  created () {
    this.getIndex()
    this.getLoadData()
  },
  data () {
    return {
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
      LoadData: [],
      selected: '',
      tableval: [],
      radio: '',
      reviewVal: {
        ID: '',
        Operator: ''
      },
      passing: {
        ID: 0,
        KEEP_CHECK_STATUS: 4
      }
    }
  },
  methods: {
    // 获取下拉菜单
    async getIndex () {
      const res = await Index()
      const data = res.Result
      // console.log(response.Result, '下拉')
      this.deviceType = data.CategoryList
      this.LinesList = data.LinesList
    },
    // 获取用户列表
    async getLoadData () {
      this.listLoading = true
      const res = await LoadData(this.listQuery)

      if (res.Result) {
        const data = JSON.parse(res.Result)
        this.LoadData = data
        this.total = res.TotalCount
        console.log(data, 'datadatadata')
      }
      this.listLoading = false
    },
    // 点击获取表格一行数据
    openDetails (row, column, event) {
      // console.log(row)
      this.tableval = row
      this.radio = this.LoadData.indexOf(row)
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
        this.$confirm(this.$t('SfcsEquipKeep._78'), this.$t('SfcsEquipKeep._70'), {
          type: 'warning'
        })
          .then(() => {
            Delete(this.tableval.ID)
              .then(res => {
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
        this.passing.KEEP_CHECK_STATUS = this.tableval.KEEP_CHECK_STATUS
        this.$emit('close')
        this.$nextTick(function () {
          this.Bus.emit('Edit', this.passing)
        })
      }
    },
    // 审核
    review_but () {
      if (this.tableval.length === 0) {
        this.$message({
          showClose: true,
          message: this.$t('SfcsEquipKeep._80'),
          type: 'warning'
        })
      } else {
        this.reviewVal.ID = this.tableval.ID
        this.reviewVal.Operator = this.userinfo.USER_NAME
        CheckBill(this.reviewVal).then(response => {
          if (response.ErrorInfo.Status) {
            this.$message({
              type: 'error',
              message: response.ErrorInfo.Message
            })
          } else {
            this.getLoadData()
            this.$notify({
              title: this.$t('IpqaMst.IpqaMstList.success'),
              message: this.$t('IpqaMst.IpqaMstList.resucc'),
              type: 'success',
              duration: 2000
            })
          }
        })
      }
    },
    // 拒绝
    refuse_but () {
      if (this.tableval.length === 0) {
        this.$message({
          showClose: true,
          message: this.$t('SfcsEquipKeep._81'),
          type: 'warning'
        })
      } else {
        this.$confirm(
          this.$t('IpqaMst.IpqaMstList.wantdecline'),
          this.$t('IpqaMst.IpqaMstList.prompt'),
          {
            confirmButtonText: this.$t('IpqaMst.IpqaMstList.confirm'),
            cancelButtonText: this.$t('IpqaMst.IpqaMstList.cancel'),
            type: 'warning'
          }
        ).then(() => {
          this.reviewVal.ID = this.tableval.ID
          this.reviewVal.Operator = this.userinfo.USER_NAME
          RejectBill(this.reviewVal).then(response => {
            if (response.ErrorInfo.Status) {
              this.$message({
                type: 'error',
                message: response.ErrorInfo.Message
              })
            } else {
              this.getLoadData()
              this.$notify({
                title: this.$t('IpqaMst.IpqaMstList.success'),
                message: this.$t('IpqaMst.IpqaMstList.refusesucceed'),
                type: 'success',
                duration: 2000
              })
            }
          })
        })
      }
    },
    handleSizeChange (val) {
      this.listQuery.Limit = val
      this.getLoadData()
    },
    handleCurrentChange (val) {
      this.listQuery.Page = val
      this.getLoadData()
    }
  }
}
</script>
