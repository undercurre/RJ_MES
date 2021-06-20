<template>
  <d2-container>
    <template slot="header">
      <custom-container-header :isExport="false"
                               :isExportTpl="false"
                               :isImport="false">
        <el-button icon="el-icon-back"
                   @click.prevent="back_but"
                   style="margin-right:10px">{{ $t('publics.btn.back') }}</el-button>
        <el-input style="width:170px"
                  v-model="formData.ROUTE_NAME"
                  :placeholder="$t('SfcsRoutes._20')"
                  @keyup.enter.native="search" />
        <el-select v-model="formData.ROUTE_CLASS"
                   style="width:130px"
                   :placeholder="$t('SfcsRoutes._27')">
          <el-option v-for="item in PlantList"
                     :key="item.LOOKUP_CODE"
                     :label="item.CHINESE"
                     :value="item.LOOKUP_CODE" />
        </el-select>&nbsp;
        <el-select v-model="formData.ROUTE_TYPE"
                   style="width:150px"
                   :placeholder="$t('SfcsRoutes._28')">
          <el-option v-for="item in TypeList"
                     :key="item.LOOKUP_CODE"
                     :label="item.CHINESE"
                     :value="item.LOOKUP_CODE" />
        </el-select>&nbsp;
        <el-input style="width:170px"
                  v-model="formData.DESCRIPTION"
                  :placeholder="$t('SfcsRoutes._20')"
                  @keyup.enter.native="search" />
        <el-select clearable
                   v-model="formData.ENABLED"
                   style="width:100px"
                   :placeholder="$t('SfcsRoutes._26')">
          <el-option v-for="item in options"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value" />
        </el-select>&nbsp;
        <el-button type="primary"
                   icon="el-icon-search"
                   @click.prevent="search">{{$t('publics.btn.search')}}</el-button>&nbsp;
        <el-button type="danger"
                   icon="el-icon-delete"
                   @click.prevent="cleanClick">{{$t('SfcsRoutes._29')}}</el-button>
        <el-button type="primary"
                   icon="el-icon-plus"
                   @click="rowAddClick(0)">{{$t('SfcsRoutes._30')}}</el-button>
        <el-button type="success"
                   icon="el-icon-check"
                   @click="save_but('ruleForm')">{{ $t('publics.btn.save') }}</el-button>
      </custom-container-header>
    </template>
    <!-- 表格 -->
    <div class="table-container">
      <vxe-table ref="_xTable"
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
                 :data="editTable"
                 :mouse-config="{selected: true}"
                 :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
                 :radio-config="{labelField: 'name', trigger: 'row'}"
                 :checkbox-config="{checkField: 'checked', trigger: 'row'}"
                 @cell-click="cellClick">
        <vxe-table-column field="ROUTE_NAME"
                          :title="$t('SfcsRoutes._2')"
                          :edit-render="{name: '$input', autoselect: true}" />
        <vxe-table-column field="ROUTE_CLASS"
                          :title="$t('SfcsRoutes._23')"
                          :edit-render="{autofocus: '.custom-input', type: 'visible'}">
          <template v-slot:edit="{row,$rowIndex}">
            <div>
              <span v-show="$rowIndex !== currentRowIndex">{{ getCollectName(row.ROUTE_CLASS, PlantList) }}</span>
              <el-select v-show="$rowIndex === currentRowIndex"
                         v-model="row.ROUTE_CLASS"
                         style="width: 100%">
                <div style="height: 34px;padding: 0 20px;display: flex;position: sticky;top: 0;background: #fff;z-index: 9;border-bottom: 1px solid rgb(229, 231, 237)">
                  <span style="width: 60%;box-size: border-box;padding-right: 10px;color: #606266;line-height: 34px;font-size: 14px">{{ $t('SfcsProductPallet._6') }}</span>
                  <span style="width: 40%;color: #606266;line-height: 34px;font-size: 14px;box-size: border-box;padding-left: 10px;border-left: 1px solid rgb(229, 231, 237)">{{ $t('SfcsProductPallet._7') }}</span>
                </div>
                <el-option style="width: 360px;display: flex"
                           v-for="item in PlantList"
                           :key="item.LOOKUP_CODE"
                           :value="item.LOOKUP_CODE"
                           :label="item.CHINESE">
                  <span style="width: 60%;box-size: border-box;padding-right: 10px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{ item.MEANING }}</span>
                  <span style="width: 40%;box-size: border-box;padding-left: 10px;border-left: 1px solid rgb(229, 231, 237)">{{ item.CHINESE }}</span>
                </el-option>
              </el-select>
            </div>
          </template>
        </vxe-table-column>
        <vxe-table-column field="ROUTE_TYPE"
                          :title="$t('SfcsRoutes._24')"
                          :edit-render="{autofocus: '.custom-input', type: 'visible'}">
          <template v-slot:edit="{row,$rowIndex}">
            <div>
              <span v-show="$rowIndex !== currentRowIndex">{{ getCollectName(row.ROUTE_TYPE, TypeList) }}</span>
              <el-select v-show="$rowIndex === currentRowIndex"
                         v-model="row.ROUTE_TYPE"
                         style="width: 100%">
                <div style="height: 34px;padding: 0 20px;display: flex;position: sticky;top: 0;background: #fff;z-index: 9;border-bottom: 1px solid rgb(229, 231, 237)">
                  <span style="width: 60%;box-size: border-box;padding-right: 10px;color: #606266;line-height: 34px;font-size: 14px">{{ $t('SfcsProductPallet._6') }}</span>
                  <span style="width: 40%;color: #606266;line-height: 34px;font-size: 14px;box-size: border-box;padding-left: 10px;border-left: 1px solid rgb(229, 231, 237)">{{ $t('SfcsProductPallet._7') }}</span>
                </div>
                <el-option style="width: 360px;display: flex"
                           v-for="item in TypeList"
                           :key="item.LOOKUP_CODE"
                           :value="item.LOOKUP_CODE"
                           :label="item.CHINESE">
                  <span style="width: 60%;box-size: border-box;padding-right: 10px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{ item.MEANING }}</span>
                  <span style="width: 40%;box-size: border-box;padding-left: 10px;border-left: 1px solid rgb(229, 231, 237)">{{ item.CHINESE }}</span>
                </el-option>
              </el-select>
            </div>
          </template>
        </vxe-table-column>
        <vxe-table-column field="DESCRIPTION"
                          :title="$t('SfcsRoutes._25')"
                          :edit-render="{name: '$input', autoselect: true}" />
        <vxe-table-column field="ENABLED"
                          :title="$t('SfcsRoutes._26')"
                          :edit-render="{autofocus: '.custom-input', type: 'visible'}">
          <template v-slot:edit="{ row}">
            <el-switch v-model="row.ENABLED"
                       :active-text="$t('cdc._19')"
                       :inactive-text="$t('cdc._20')"
                       active-color="#13ce66"
                       inactive-color="#cccccc"
                       active-value="Y"
                       inactive-value="N" />
          </template>
        </vxe-table-column>
      </vxe-table>
    </div>
    <!-- 分页 -->
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
import customContainerHeader from '@/components/custom-container-header'
import { Index, LoadData, SaveData } from '@/api/SfcsRoutes'
import pagination from '@/views/mixin/page'
export default {
  components: {
    customContainerHeader
  },
  mixins: [pagination],
  data () {
    return {
      formData: {
        PART_NO: '', // 料号
        ROUTE_NAME: '', // 制程名称
        ROUTE_CLASS: null, // 厂部
        ROUTE_TYPE: null, // 类型
        DESCRIPTION: '', // 描述
        ENABLED: '', // 是否
        Page: 1,
        Limit: null,
        Key: '',
        ...this.formData
      },
      loading: false,
      editTable: [], // 表格数据
      PlantList: [], // 工厂下拉
      TypeList: [], // 类型下拉
      currentRowIndex: -1,
      options: [
        {
          value: 'Y',
          label: this.$t('SfcsRoutes._33')
        },
        {
          value: 'N',
          label: this.$t('SfcsRoutes._34')
        }
      ],
      editForm: {
        InsertRecords: [],
        UpdateRecords: [],
        RemoveRecords: []
      }
    }
  },
  created () {
    this.getIndex()
    this.getLoadData()
  },
  methods: {
    async getIndex () {
      const res = await Index()
      if (res.Result) {
        this.PlantList = res.Result.PlantList
        this.TypeList = res.Result.TypeList
      }
    },
    async getLoadData () {
      this.loading = true
      const res = await LoadData(this.formData)
      this.loading = false
      this.editTable = res.Result ? res.Result : []
      this.totalPage = res.TotalCount ? res.TotalCount : 0
    },
    // 搜索
    search () {
      this.formData.Page = 1
      this.getLoadData()
    },
    // 清空
    cleanClick () {
      this.formData = {}
      this.formData.Limit = 15
      this.formData.Page = 1
      this.formData.Key = ''
      this.formData.PART_NO = null
      this.formData.ROUTE_NAME = null
      this.formData.DESCRIPTION = null
      this.formData.ENABLED = null
    },
    // 新增
    rowAddClick (row) {
      const record = {
        ID: 0,
        PART_NO: '',
        ROUTE_NAME: '',
        ROUTE_CLASS: null,
        ROUTE_TYPE: null,
        DESCRIPTION: '',
        ENABLED: ''
      }
      this.$refs._xTable.insertAt(record, row).then(({ row }) => {
        this.$refs._xTable.setActiveRow(row)
      })
    },
    // 保存
    save_but () {
      var that = this
      var postdata = this.$refs._xTable.getRecordset()
      if (
        postdata.insertRecords.length ||
        postdata.removeRecords.length ||
        postdata.updateRecords.length
      ) {
        this.$refs._xTable.validate((valid) => {
          if (valid) {
            this.editForm.InsertRecords = postdata.insertRecords
            this.editForm.UpdateRecords = postdata.updateRecords
            this.editForm.RemoveRecords = postdata.removeRecords
            SaveData(this.editForm).then((res) => {
              if (res.ErrorInfo.Status) {
                this.$message({
                  message: res.ErrorInfo.Message,
                  type: 'error'
                })
              } else if (res.Result === true) {
                that.editForm = {}
                that.$notify({
                  title: this.$t('crss._20'),
                  message: this.$t('crss._21'),
                  type: 'success',
                  duration: 2000
                })
                that.getLoadData()
              }
            })
          }
        })
      }
    },
    getCollectName (id, originData) {
      let res = ''
      originData.map((item) => {
        if (item.LOOKUP_CODE === id) {
          res = item.CHINESE
        }
      })
      return res
    },
    cellClick (e) {
      const { $rowIndex } = e
      if (this.currentRowIndex !== $rowIndex) {
        this.currentRowIndex = $rowIndex
      }
      this.currentIndex = $rowIndex
    },
    // 返回
    back_but () {
      this.$emit('close')
    }
  }
}
</script>

<style>
</style>
