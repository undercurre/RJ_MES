<template>
  <custom-container>
    <template slot="header">
      <custom-container-header
        :isExport="false"
        :isExportTpl="false"
        :isImport="false"
        :isFull="true"
      >
        <el-select
          v-model="formData.LINE_ID"
          :placeholder="$t('MesProductionPreMst._1')"
          style="width: 200px"
          filterable
          clearable
        >
          <el-option
            v-for="item in linesList"
            :key="item.value"
            :value="item.value"
            :label="item.label"
          ></el-option>
        </el-select>
        <el-input
          v-model="formData.WO_NO"
          style="width: 200px"
          clearable
          :placeholder="$t('MesProductionPreMst._2')"
        ></el-input>
        <el-input
          v-model="formData.PART_NO"
          style="width: 200px"
          clearable
          :placeholder="$t('MesProductionPreMst._3')"
        ></el-input>
        <el-button
          type="primary"
          icon="el-icon-search"
          @click.prevent="searchClick"
        >{{ $t('publics.btn.search') }}</el-button>
        <el-button
          type="warning"
          icon="el-icon-finished"
          @click="drawer = true"
        >{{ $t('SfcsPn._48') }}</el-button>
        <el-button
          type="success"
          icon="el-icon-plus"
          @click="insertEvent"
          v-if="$btnList.indexOf('MesProductionPreMstAdd') !== -1"
        >{{ $t('publics.btn.add') }}</el-button>
        <!-- <el-button
          type="primary"
          icon="el-icon-circle-check"
          @click.prevent="preserveClick()"
        >{{ $t('publics.btn.save') }}</el-button>-->
      </custom-container-header>
    </template>
    <div class="out-table-container">
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
        :radio-config="{labelField: 'name', trigger: 'row'}"
        :checkbox-config="{checkField: 'checked', trigger: 'row'}"
      >
        <vxe-table-column
          field="MST_NO"
          min-width="180"
          :title="$t('MesProductionPreMst._5')"
          :edit-render="{name: '$input', props: { readonly: true }}"
        />
        <vxe-table-column
          field="LINE_NAME"
          min-width="180"
          :title="$t('MesProductionPreMst._6')"
          :edit-render="{name: '$input', props: { readonly: true }}"
        />
        <vxe-table-column
          field="WO_NO"
          min-width="180"
          :title="$t('MesProductionPreMst._7')"
          :edit-render="{name: '$input', props: { readonly: true }}"
        />
        <vxe-table-column
          field="PART_NO"
          min-width="180"
          :title="$t('MesProductionPreMst._8')"
          :edit-render="{name: '$input', props: { readonly: true }}"
        />
        <vxe-table-column
          field="PART_NAME"
          min-width="180"
          :title="$t('MesProductionPreMst._9')"
          :edit-render="{name: '$input', props: { readonly: true }}"
        />
        <vxe-table-column
          field="CUSTOMER_NAME"
          min-width="180"
          :title="$t('MesProductionPreMst._10')"
          :edit-render="{name: '$input', props: { readonly: true }}"
        />
        <vxe-table-column
          field="MODEL_NAME"
          min-width="180"
          :title="$t('MesProductionPreMst._11')"
          :edit-render="{name: '$input', props: { readonly: true }}"
        />
        <!-- <vxe-table-column
          field="ORAGE_NAME"
          min-width="180"
          :title="'组织'"
          :edit-render="{name: '$input', props: { readonly: true }}"
        />-->
        <vxe-table-column
          field="PRODUCTION_TIME"
          min-width="180"
          :title="$t('MesProductionPreMst._12')"
          :edit-render="{name: '$input', props: { readonly: true }}"
        />
        <vxe-table-column
          field="END_STATUS"
          min-width="160"
          :title="$t('MesProductionPreMst._13')"
          :edit-render="{autofocus: '.custom-input', type: 'visible'}"
        >
          <template v-slot:edit="{ row }">
            <div>
              <span
                style="color: green"
                v-if="row.END_STATUS === 'Y'"
              >{{ $t('MesProductionPreMst._14') }}</span>
              <span
                style="color: blur"
                v-if="row.END_STATUS === 'N'"
              >{{ $t('MesProductionPreMst._15') }}</span>
            </div>
          </template>
        </vxe-table-column>
        <vxe-table-column
          field="CREATOR"
          min-width="150"
          :title="$t('MesProductionPreMst._16')"
          :edit-render="{name: '$input', props: { readonly: true }}"
        />
        <vxe-table-column
          field="CREATIME"
          min-width="180"
          :title="$t('MesProductionPreMst._17')"
          :edit-render="{name: '$input', props: { readonly: true }}"
        />
        <vxe-table-column
          :title="$t('publics.field.operate')"
          min-width="180"
          align="center"
          fixed="right"
        >
          <template v-slot="{ row }">
            <el-button
              type="primary"
              @click="editRow(row)"
              v-if="$btnList.indexOf('MesProductionPreMstEdit') !== -1"
            >{{ $t('publics.btn.edit') }}</el-button>
            <el-button
              type="danger"
              @click="removeClick(row)"
              v-if="$btnList.indexOf('MesProductionPreMstDeleteBill') !== -1"
            >{{ $t('publics.btn.delete') }}</el-button>
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
        :total="totalPage"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </template>
    <!-- 抽屉 筛选 -->
    <el-drawer :title="$t('MesProductionPreMst._18')" :visible.sync="drawer" direction="ltr">
      <div style="padding: 0 20px">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{ $t('MesProductionPreMst._19') }}</span>
            <el-button
              style="float: right; padding: 3px 0"
              type="text"
              @click="searchClick"
            >{{ $t('MesProductionPreMst._20') }}</el-button>
            <el-button
              style="float: right; padding: 3px 0;margin-right: 20px"
              type="text"
              @click="resetListQuery"
            >{{ $t('MesProductionPreMst._21') }}</el-button>
          </div>
          <el-form
            class="custom-form"
            ref="formData"
            label-position="top"
            label-width="80px"
            :model="formData"
            size="mini"
          >
            <el-form-item :label="$t('MesProductionPreMst._22')" prop="LINE_ID">
              <el-select
                v-model="formData.LINE_ID"
                style="width: 100%"
                clearable
                filterable
                placeholder="  "
              >
                <el-option
                  v-for="item in linesList"
                  :key="item.value"
                  :value="item.value"
                  :label="item.label"
                />
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('MesProductionPreMst._23')" prop="WO_NO">
              <el-input v-model="formData.WO_NO" clearable></el-input>
            </el-form-item>
            <el-form-item :label="$t('MesProductionPreMst._24')" prop="PART_NO">
              <el-input v-model="formData.PART_NO" clearable></el-input>
            </el-form-item>
            <el-form-item :label="$t('MesProductionPreMst._25')" prop="PART_NAME">
              <el-input v-model="formData.PART_NAME" clearable></el-input>
            </el-form-item>
            <el-form-item :label="$t('MesProductionPreMst._26')" prop="MODEL_ID">
              <el-select clearable style="width:100%" v-model="formData.MODEL_ID" placeholder=" ">
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
                    v-model="listQuery2.Key"
                    :placeholder="this.$t('publics.tips.enterKeyWord')"
                  ></el-input>
                  <el-button
                    type="primary"
                    icon="el-icon-search"
                    @click.prevent="searchQueryList2"
                  >{{ $t('publics.btn.search') }}</el-button>
                </div>
                <el-option
                  style="width: 600px"
                  v-for="item in customerModelList"
                  :key="item.ID"
                  :label="item.MODEL"
                  :value="item.ID"
                ></el-option>
                <div
                  style="width: 600px;position: sticky;bottom: 6px;background: #fff;z-index: 90;padding-left: 15px"
                >
                  <el-pagination
                    :pager-count="5"
                    :current-page="listQuery2.Page"
                    :page-size="listQuery2.Limit"
                    :page-sizes="[10, 20, 30, 40]"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="listQuery2.totalPage"
                    @size-change="listQuerySizeChange2"
                    @current-change="listQueryCurrentChange2"
                  />
                </div>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('MesProductionPreMst._27')" prop="CUSTOMER_ID">
              <el-select
                clearable
                style="width:100%"
                v-model="formData.CUSTOMER_ID"
                placeholder=" "
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
                    v-model="listQuery.Key"
                    :placeholder="this.$t('publics.tips.enterKeyWord')"
                  ></el-input>
                  <el-button
                    type="primary"
                    icon="el-icon-search"
                    @click.prevent="searchQueryList"
                  >{{ $t('publics.btn.search') }}</el-button>
                </div>
                <el-option
                  style="width: 600px"
                  v-for="item in customerList"
                  :key="item.ID"
                  :label="item.CUSTOMER"
                  :value="item.ID"
                >
                  <span style="float: left">{{ item.CUSTOMER }}</span>
                  <span style="float: right;">{{ item.NATIONALITY }}</span>
                </el-option>
                <div
                  style="width: 600px;position: sticky;bottom: 6px;background: #fff;z-index: 90;padding-left: 15px"
                >
                  <el-pagination
                    :pager-count="5"
                    :current-page="listQuery.Page"
                    :page-size="listQuery.Limit"
                    :page-sizes="[10, 20, 30, 40]"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="listQuery.totalPage"
                    @size-change="listQuerySizeChange"
                    @current-change="listQueryCurrentChange"
                  />
                </div>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('MesProductionPreMst._28')" prop="CREATIME">
              <el-date-picker
                style="width: 100%"
                v-model="formData.CREATIME"
                type="daterange"
                value-format="yyyy-MM-dd"
                :range-separator="$t('MesProductionPreMst._29')"
                :start-placeholder="$t('MesProductionPreMst._30')"
                :end-placeholder="$t('MesProductionPreMst._31')"
              ></el-date-picker>
            </el-form-item>
          </el-form>
        </el-card>
      </div>
    </el-drawer>
  </custom-container>
</template>

<script>
import {
  Index,
  LoadData,
  SfcsModelLoadData,
  SmtLinesLoadData,
  SfcsOperationLinesLoadData,
  DeleteBill
} from '@/api/MesProductionPreMst'
import pagination from '@/views/mixin/page'
import { GetcustomerList } from '@/api/SfcsProductFamily'
import { mapMutations, mapGetters } from 'vuex'
export default {
  name: 'List',
  components: {
    customContainer: () => import('@/components/custom-container'),
    customContainerHeader: () => import('@/components/custom-container-header')
  },
  computed: {
    ...mapGetters(['userId'])
  },
  mixins: [pagination],
  data () {
    return {
      LineList: [],
      formData: {
        PART_NO: '',
        WO_NO: '',
        LINE_ID: '',
        CREATIME: '',
        ...this.formData
      },
      mainTable: [],
      drawer: false,
      loading: false,
      listQuery: {
        // 客户
        Key: '',
        Page: 1,
        Limit: 10,
        totalPage: 0
      },
      customerList: [], // 客户
      customerModelList: [], // 机台
      listQuery2: {
        // 机台
        Key: '',
        Page: 1,
        Limit: 10,
        totalPage: 0
      },
      linesList: []
    }
  },
  methods: {
    ...mapMutations({
      SET_ID: 'custom/productionPreMst/SET_ID',
      SET_SHOW_MODIFY: 'custom/productionPreMst/SET_SHOW_MODIFY'
    }),
    async getIndex () {
      const res = await Index()
      this.LineList = (res.Result?.LineList || []).map(item => {
        return {
          label: item.NAME,
          value: item.ID,
          disabled: false
        }
      })
      if (res.Result) {
        this.getLoadData()
        this.getcustomerList()
        this.getModelList()
        this.getLines()
      }
    },
    async getLoadData () {
      this.loading = true
      const res = await LoadData(this.formData)
      this.loading = false
      this.mainTable = res.Result || []
      this.totalPage = res.TotalCount || 0
    },
    async getcustomerList () {
      const res = await GetcustomerList(this.listQuery)
      if (res.Result) {
        this.customerList = res.Result || []
        this.listQuery.totalPage = res.TotalCount || 0
        if (!this.customerList.length) {
          this.customerList.push({
            CUSTOMER: '',
            ID: ''
          })
        }
      }
    },
    async getModelList () {
      const res = await SfcsModelLoadData(this.listQuery2)
      if (res.Result) {
        this.customerModelList = res.Result || []
        this.listQuery2.totalPage = res.TotalCount || 0
        if (!this.customerModelList.length) {
          this.customerModelList.push({
            MODEL: '',
            ID: ''
          })
        }
      }
    },
    // 获取自动化线体和生产线体
    async getLines () {
      const res = await Promise.all([
        await SmtLinesLoadData({
          USER_ID: this.userId
        }),
        await SfcsOperationLinesLoadData({
          USER_ID: this.userId
        })
      ])
      if (res) {
        this.linesList = []
        res.map(item => {
          this.linesList = this.linesList.concat(
            (item.Result
              ? typeof item.Result === 'string'
                ? JSON.parse(item.Result)
                : item.Result
              : []
            ).map(_item => {
              return {
                label: _item.LINE_NAME || _item.OPERATION_LINE_NAME,
                value: _item.ID.toString()
              }
            })
          )
        })
      }
    },
    // 客户 ----------
    listQuerySizeChange (Limit) {
      this.listQuery.Limit = Limit
      this.listQuery.Page = 1
      this.getcustomerList()
    },
    listQueryCurrentChange (Page) {
      this.listQuery.Page = Page
      this.getcustomerList()
    },
    searchQueryList () {
      this.listQuery.Page = 1
      this.getcustomerList()
    },
    // 客户 ----------
    // 机台 ----------
    listQuerySizeChange2 (Limit) {
      this.listQuery2.Limit = Limit
      this.listQuery2.Page = 1
      this.getModelList()
    },
    listQueryCurrentChange2 (Page) {
      this.listQuery2.Page = Page
      this.getModelList()
    },
    searchQueryList2 () {
      this.listQuery2.Page = 1
      this.getModelList()
    },
    // 机台 ----------
    resetListQuery () {
      Object.assign(this.$data, {
        listQuery: {
          // 客户
          Key: '',
          Page: 1,
          Limit: 10,
          totalPage: 0
        },
        customerList: [], // 客户
        customerModelList: [], // 机台
        listQuery2: {
          // 机台
          Key: '',
          Page: 1,
          Limit: 10,
          totalPage: 0
        },
        formData: {
          Page: this.formData.Page,
          Limit: this.formData.Limit,
          Key: this.formData.Key
        }
      })
      this.getcustomerList()
      this.getModelList()
    },
    searchClick () {
      this.formData.Page = 1
      this.getLoadData()
      this.drawer = false
    },
    // 删除
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
        ).catch(_ => {
          /** 取消 */
        }))
      ) {
        const res = await DeleteBill(row.ID)
        if (res.Result) {
          this.$refs.xTable.remove(row)
          this.$notify({
            title: this.$t('ssc._12'),
            message: this.$t('ssc._19'),
            type: 'success',
            duration: 2000
          })
        }
      }
    },
    // 编辑
    editRow (row) {
      this.SET_ID(row.ID)
      this.SET_SHOW_MODIFY(true)
    },
    // 新增
    insertEvent () {
      this.SET_ID(0)
      this.SET_SHOW_MODIFY(true)
    }
  },
  created () {
    this.getIndex()
  }
}
</script>
