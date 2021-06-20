<!--
 * @Author: your name
 * @Date: 2020-03-31 08:45:15
 * @LastEditTime: 2020-04-01 09:15:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \IMS.Vue.D2\src\views\SfcsLookups\Index.vue
 -->
<template>
  <d2-container class="SfcsLookups">
    <template slot="header">
      <custom-container-header
        exportMehodsName="exportData"
        importBtnName="SfcsLookupsImport"
        exportBtnName="SfcsLookupsExport"
        exportTplName="SfcsLookupsExportTPL"
      >
        <el-input
          v-model="formData.Key"
          :placeholder="$t('skl._1')"
          clearable
          style="width:200px"
          @keyup.enter.native="searchClick"
        />&nbsp;
        <el-select
          clearable
          style="width:200px"
          v-model="formData.KIND"
          :placeholder="$t('skl._20')"
        >
          <!-- 占位元素 -->
          <div
            style="position: absolute;width: 100%;height: 6px;background: #fff;background: #fff;top: 0;z-index: 99"
          ></div>
          <div
            style="position: absolute;width: 100%;height: 6px;background: #fff;background: #fff;bottom: 0;z-index: 99"
          ></div>
          <div
            style="width: 600px;display: flex;padding: 0 20px 0 10px;position: sticky;top: 6px;background: #fff;z-index: 90"
          >
            <el-input
              v-model="sptData.MEANING"
              @input="searchQueryList"
              @keyup.enter.native="searchQueryList"
              :placeholder="this.$t('publics.tips.enterKeyWord')"
            />
            <el-button
              type="primary"
              icon="el-icon-search"
              @click.prevent="searchQueryList"
            >{{ $t('publics.btn.search') }}</el-button>
          </div>
          <el-option
            style="width: 600px"
            v-for="item in sptList"
            @keyup.enter.native="searchQueryList"
            :key="item.ID"
            :label="item.MEANING"
            :value="item.LOOKUP_CODE"
          >
            <!-- <span style="float: left">{{ item.CUSTOMER }}</span>
            <span style="float: right;">{{ item.NATIONALITY }}</span>-->
          </el-option>
          <div
            style="width: 600px;position: sticky;bottom: 6px;background: #fff;z-index: 90;padding-left: 15px"
          >
            <el-pagination
              :pager-count="5"
              :current-page="sptData.Page"
              :page-size="sptData.Limit"
              :page-sizes="[10, 20, 30, 40]"
              layout="total, sizes, prev, pager, next, jumper"
              :total="sptLisTtotal"
              @size-change="listQuerySizeChange"
              @current-change="listQueryCurrentChange"
            />
          </div>
        </el-select>
        <el-button
          type="primary"
          icon="el-icon-search"
          @click.prevent="searchClick"
        >{{ $t('skl._2') }}</el-button>
        <el-button
          type="success"
          @click="addClick"
          icon="el-icon-plus"
          v-if="$btnList.indexOf('SfcsLookupsAdd') !== -1"
        >{{ $t('skl._3') }}</el-button>
        <!-- <el-button
          type="primary"
          icon="el-icon-check"
          @click.prevent="preserveClick"
          v-if="$btnList.indexOf('SfcsLookupsEdit') !== -1"
        >{{ $t('skl._4') }}</el-button>-->
      </custom-container-header>
    </template>
    <div class="table-container">
      <vxe-table
        ref="xTable"
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
        :mouse-config="{selected: true}"
        :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
        :radio-config="{labelField: 'name', trigger: 'row'}"
        :checkbox-config="{checkField: 'checked', trigger: 'row'}"
      >
        <vxe-table-column
          min-width="180"
          field="TYPENAME"
          :title="$t('skl._5')"
          :edit-render="{name: '$input',props:{readonly: true}}"
        />
        <vxe-table-column
          min-width="150"
          field="CODE"
          :title="$t('skl._6')"
          :edit-render="{name: '$input', props: {readonly: true}}"
        />

        <vxe-table-column
          min-width="150"
          field="DESCRIPTION"
          :title="$t('skl._7')"
          :edit-render="{name: '$input', props: {readonly: true}}"
        />
        <vxe-table-column
          min-width="150"
          field="CHINESE"
          :title="$t('skl._in')"
          :edit-render="{name: '$input', props: {readonly: true}}"
        />
        <vxe-table-column
          min-width="150"
          field="CATEGORY"
          :title="$t('skl._8')"
          :edit-render="{name: '$input', props: {readonly: true}}"
        />
        <vxe-table-column
          min-width="120"
          field="ENABLED"
          :title="$t('skl._9')"
          :edit-render="{autofocus: '.custom-input', type: 'visible'}"
        >
          <template v-slot:edit="{ row}">
            <span v-if="row.ENABLED === 'Y'">{{$t('publics.btn.yes')}}</span>
            <span v-if="row.ENABLED === 'N'">{{$t('publics.btn.no')}}</span>
          </template>
        </vxe-table-column>
        <vxe-table-column :title="$t('plbd.tb_og')" min-width="120" align="center" fixed="right">
          <template v-slot="{ row }">
            <el-button
              type="primary"
              v-if="$btnList.indexOf('SfcsLookupsEdit') !== -1"
              @click="editClick(row, row.$index)"
            >{{$t('publics.btn.edit')}}</el-button>
          </template>
        </vxe-table-column>
      </vxe-table>
    </div>
    <template slot="footer">
      <el-pagination
        :current-page="formData.Page"
        :page-size="formData.Limit"
        :page-sizes="[15, 25, 35, 45]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </template>
    <!-- 编辑 -->
    <el-dialog
      :close-on-click-modal="false"
      v-dialogDrag
      :title="editTitle"
      width="60%"
      :visible.sync="editVisible"
    >
      <el-form
        ref="editForm"
        label-width="100px"
        :model="editForm"
        :rules="validRules"
        :show-message="false"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('skl._5')" prop="KIND">
              <el-select
                clearable
                style="width:100%"
                v-model="editForm.KIND"
                :placeholder="$t('skl._20')"
              >
                <!-- 占位元素 -->
                <div
                  style="position: absolute;width: 100%;height: 6px;background: #fff;background: #fff;top: 0;z-index: 99"
                ></div>
                <div
                  style="position: absolute;width: 100%;height: 6px;background: #fff;background: #fff;bottom: 0;z-index: 99"
                ></div>
                <div
                  style="width: 600px;display: flex;padding: 0 20px 0 10px;position: sticky;top: 6px;background: #fff;z-index: 90"
                >
                  <el-input
                    v-model="sptData2.MEANING"
                    @input="searchQueryList2"
                    @keyup.enter.native="searchQueryList2"
                    :placeholder="this.$t('publics.tips.enterKeyWord')"
                  />
                  <el-button
                    type="primary"
                    icon="el-icon-search"
                    @click.prevent="searchQueryList2"
                  >{{ $t('publics.btn.search') }}</el-button>
                </div>
                <el-option
                  style="width: 600px"
                  v-for="item in sptList"
                  @keyup.enter.native="searchQueryList2"
                  :key="item.ID"
                  :label="item.MEANING"
                  :value="item.LOOKUP_CODE"
                />
                <div
                  style="width: 600px;position: sticky;bottom: 6px;background: #fff;z-index: 90;padding-left: 15px"
                >
                  <el-pagination
                    :pager-count="5"
                    :current-page="sptData2.Page"
                    :page-size="sptData2.Limit"
                    :page-sizes="[10, 20, 30, 40]"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="sptLisTtotal2"
                    @size-change="listQuerySizeChange2"
                    @current-change="listQueryCurrentChange2"
                  />
                </div>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('skl._6')" prop="CODE">
              <el-input v-model="editForm.CODE" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('skl._7')">
              <el-input v-model="editForm.DESCRIPTION" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('skl._in')">
              <el-input v-model="editForm.CHINESE" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('skl._8')">
              <el-input v-model="editForm.CATEGORY" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('skl._9')">
              <el-switch
                v-model="editForm.ENABLED"
                :active-text="$t('skl._10')"
                :inactive-text="$t('skl._11')"
                active-color="#13ce66"
                inactive-color="#cccccc"
                active-value="Y"
                inactive-value="N"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">{{$t('ssc_rd.cancel')}}</el-button>
        <el-button type="primary" @click="preserveClick">{{$t('ssc_rd.sure')}}</el-button>
      </span>
    </el-dialog>
  </d2-container>
</template>
<script>
import helper from '@/api/Helper'
import customContainerHeader from '@/components/custom-container-header'
import { sptLoadData } from '@/api/SfcsParameters'
const API = helper('SfcsLookups')
export default {
  name: 'SfcsLookups',
  components: {
    customContainerHeader
  },
  data () {
    return {
      ProductKind: [],
      ProductKindbox: [],
      loading: false,
      mainTable: [],
      total: 0,
      formData: {
        KIND: '',
        Key: '',
        Page: 1,
        Limit: 15
      },
      validRules: {
        KIND: [
          {
            required: true,
            message: this.$t('skl._20')
          }
        ],
        TYPE: [
          {
            required: true,
            message: this.$t('skl._2')
          }
        ],
        CODE: [
          {
            required: true,
            message: this.$t('skl._21')
          }
        ]
      },
      form: {
        insertRecords: [],
        updateRecords: [],
        removeRecords: []
      },
      sptData: {
        MEANING: '',
        LOOKUP_TYPE: 'VARIOUS_DATA_TYPE',
        Page: 1,
        Limit: 10
      },
      sptData2: {
        MEANING: '',
        LOOKUP_TYPE: 'VARIOUS_DATA_TYPE',
        Page: 1,
        Limit: 10
      },
      sptList: [],
      sptLisTtotal: 0,
      sptLisTtotal2: 0,
      editVisible: false,
      editForm: {},
      editTitle: ''
    }
  },
  created () {
    this.getIndex()
    this.getsptLoadData()
  },
  methods: {
    async getsptLoadData (num) {
      var form = {}
      if (num === 2) {
        form = this.sptData2
      } else {
        form = this.sptData
      }
      const res = await sptLoadData(form)
      if (res.Result) {
        this.sptList = res.Result
        console.log(' this.sptList:', this.sptList)
        this.sptLisTtotal = res.TotalCount
        this.sptLisTtotal2 = res.TotalCount
        if (!this.sptList.length) {
          this.sptList.push({
            LOOKUP_TYPE: '',
            LOOKUP_CODE: ''
          })
        }
      }
    },
    listQuerySizeChange (Limit) {
      this.sptData.Page = 1
      this.listQuery.Limit = Limit
      this.getsptLoadData()
    },
    listQueryCurrentChange (Page) {
      this.sptData.Page = Page
      this.getsptLoadData()
    },
    searchQueryList () {
      this.sptData.Page = 1
      this.getsptLoadData()
    },
    listQuerySizeChange2 (Limit) {
      this.sptData2.Page = 1
      this.sptData2.Limit = Limit
      this.getsptLoadData(2)
    },
    listQueryCurrentChange2 (Page) {
      this.sptData2.Page = Page
      this.getsptLoadData(2)
    },
    searchQueryList2 () {
      this.sptData2.Page = 1
      this.getsptLoadData(2)
    },
    async getIndex () {
      const res = await API.Index()
      if (res.Result) {
        this.ProductKind = res.Result.ProductKind
        console.log(res, 'resresres')
        this.getLoadData()
        // this.ProductKindbox.push({
        //   label: '',
        //   value: '',
        //   disabled: false
        // })
        this.ProductKind.map((item) => {
          this.ProductKindbox.push({
            label: item.NAME,
            value: Number(item.CODE),
            disabled: false
          })
        })
      }
    },
    async getLoadData () {
      this.loading = true
      const res = await API.LoadData(this.formData)
      if (res.Result) {
        this.mainTable = res.Result
        console.log(this.mainTable, '获取表格')
        this.total = res.TotalCount
      }
      this.loading = false
    },
    async exportData () {
      this.loading = true
      const res = await API.ExportData(this.formData)
      this.loading = false
      this.mainTable = res.Result || []
      this.totalPage = res.TotalCount || 0
    },
    addClick () {
      this.editTitle = this.$t('crss._3')
      this.editForm = {}
      this.editForm.ID = 0
      this.editVisible = true
    },
    editClick (row) {
      console.log(row)
      this.getsptLoadData(2)
      this.editTitle = this.$t('publics.btn.edit')
      this.editForm = row
      this.editVisible = true
    },
    // 搜索
    searchClick () {
      this.formData.Page = 1
      this.getLoadData()
    },
    handleSizeChange (val) {
      this.formData.Limit = val
      this.getLoadData()
    },
    handleCurrentChange (val) {
      this.formData.Page = val
      this.getLoadData()
    },
    //  保存
    preserveClick () {
      var that = this
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          this.form = {
            insertRecords: [],
            updateRecords: [],
            removeRecords: []
          }
          if (this.editTitle === this.$t('crss._3')) {
            this.form.insertRecords.push(this.editForm)
          } else {
            this.form.updateRecords.push(this.editForm)
          }
          API.SaveData(this.form).then((response) => {
            if (response.Result) {
              that.editVisible = false
              that.getLoadData()
              that.$notify({
                title: this.$t('skl._12'),
                message: this.$t('skl._13'),
                type: 'success',
                duration: 2000
              })
            }
          })
        }
      })
    },
    // 新增
    async insertEvent (row) {
      const record = {
        ID: 0,
        KIND: '',
        CODE: '',
        DESCRIPTION: '',
        CHINESE: '',
        CATEGORY: '',
        ENABLED: 'N'
      }
      this.$refs.xTable.insertAt(record, row).then(({ row }) => {
        this.$refs.xTable.setActiveRow(row)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
