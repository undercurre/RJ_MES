<template>
  <custom-container>
    <template slot="header">
      <custom-container-header :isExport="false" :isExportTpl="false" :isImport="false">
        <el-button
          type="primary"
          icon="el-icon-finished"
          @click.prevent="filterFlag = true"
        >{{ $t('SmtPlacementHeader._1') }}</el-button>
        <el-button
          type="warning"
          icon="el-icon-edit"
          @click="editMaterials"
          v-if="$btnList.indexOf('EditView') !== -1"
        >{{ $t('SmtPlacementHeader._2') }}</el-button>
        <el-button
          type="primary"
          icon="el-icon-upload2"
          @click="upLoadAIMaterials"
          v-if="$btnList.indexOf('ImportAIPlacementView') !== -1"
        >{{ $t('SmtPlacementHeader._3') }}</el-button>
        <el-button
          type="primary"
          icon="el-icon-upload2"
          @click="upLoadTxtMaterials"
          v-if="$btnList.indexOf('ImportAIPlacementView2') !== -1"
        >{{$t('SmtPlacementHeader._113')}}</el-button>
        <el-button
          type="primary"
          icon="el-icon-upload2"
          @click="upLoadTxtMaterialsV2"
          v-if="$btnList.indexOf('ImportAIPlacementView2V2') !== -1"
        >{{$t('SmtPlacementHeader._113')}}&nbsp;-&nbsp;V2</el-button>
        <el-button
          type="primary"
          icon="el-icon-upload2"
          @click="upLoadRIMaterials"
          v-if="$btnList.indexOf('ImportAIPlacementView3') !== -1"
        >{{$t('SmtPlacementHeader._114')}}</el-button>
        <el-button
          type="primary"
          icon="el-icon-upload2"
          @click="upLoadSimensMaterials"
          v-if="$btnList.indexOf('ImportAIPlacementView4') !== -1"
        >{{$t('SmtPlacementHeader._115')}}</el-button>
      </custom-container-header>
    </template>
    <div class="block-one">
      <div>
        <vxe-table
          ref="xTable"
          class="table-container1"
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
          :edit-rules="validRules"
          :mouse-config="{selected: true}"
          :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
          :radio-config="{labelField: 'name', trigger: 'row'}"
          :checkbox-config="{checkField: 'checked', trigger: 'row'}"
          @cell-click="cellClick"
        >
          <vxe-table-column
            field="PLACEMENT"
            min-width="180"
            :title="$t('SmtPlacementHeader._4')"
            :edit-render="{name: '$input', props: {readonly: true}}"
          />
          <vxe-table-column
            field="PART_NO"
            min-width="180"
            :title="$t('SmtPlacementHeader._5')"
            :edit-render="{name: '$input', props: {readonly: true}}"
          />
          <vxe-table-column
            field="PCB_SIDE"
            width="120"
            :title="$t('SmtPlacementHeader._6')"
            :edit-render="{name: '$input', props: {readonly: true}}"
          />
          <vxe-table-column
            field="DESCRIPTION"
            min-width="180"
            :title="$t('SmtPlacementHeader._7')"
            :edit-render="{name: '$input', props: {readonly: true}}"
          />
          <vxe-table-column
            field="SMT_NAME"
            min-width="180"
            :title="$t('SmtPlacementHeader._8')"
            :edit-render="{name: '$input', props: {readonly: true}}"
          />
          <vxe-table-column
            field="CREATE_BY"
            width="150"
            :title="$t('SmtPlacementHeader._9')"
            :edit-render="{name: '$input', props: {readonly: true}}"
          />
          <vxe-table-column
            field="CREATE_TIME"
            width="180"
            :title="$t('SmtPlacementHeader._10')"
            :edit-render="{name: '$input', props: {readonly: true}}"
          />
          <vxe-table-column
            field="UPDATE_BY"
            width="150"
            :title="$t('SmtPlacementHeader._11')"
            :edit-render="{name: '$input', props: {readonly: true}}"
          />
          <vxe-table-column
            field="UPDATE_TIME"
            width="180"
            :title="$t('SmtPlacementHeader._12')"
            :edit-render="{name: '$input', props: {readonly: true}}"
          />
          <vxe-table-column
            field="ENABLED"
            width="150"
            :title="$t('as_src.tb_an')"
            :edit-render="{autofocus: '.custom-input', type: 'visible'}"
          >
            <template v-slot:edit="{ row }">
              <div>
                <el-switch
                  v-model="row.ENABLED"
                  :active-text="$t('publics.btn.yes')"
                  :inactive-text="$t('publics.btn.no')"
                  active-color="#13ce66"
                  inactive-color="#cccccc"
                  active-value="Y"
                  inactive-value="N"
                />
              </div>
            </template>
          </vxe-table-column>
        </vxe-table>
      </div>
      <div class="foot-page">
        <el-pagination
          :current-page="formData.Page"
          :page-size="formData.Limit"
          :page-sizes="[10, 20, 30, 40]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalPage"
          @size-change="_handleSizeChange"
          @current-change="_handleCurrentChange"
        />
      </div>
    </div>
    <div class="block-two">
      <div style="border-top: 1px solid rgb(229, 231, 237)">
        <span
          style="display: block;color: #8492a6;font-size: 14px;margin: 10px 0;"
        >{{ $t('SmtPlacementHeader._13') }}</span>
      </div>
      <div>
        <vxe-table
          ref="_xTable"
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
          :data="mainTable2"
          :edit-rules="validRules2"
          :mouse-config="{selected: true}"
          :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
          :radio-config="{labelField: 'name', trigger: 'row'}"
          :checkbox-config="{checkField: 'checked', trigger: 'row'}"
        >
          <vxe-table-column
            field="LOCATION"
            min-width="150"
            :title="$t('SmtPlacementHeader._14')"
            :edit-render="{name: '$input', props: {readonly: true}}"
          />
          <vxe-table-column
            field="PART_NO"
            min-width="180"
            :title="$t('SmtPlacementHeader._15')"
            :edit-render="{name: '$input', props: {readonly: true}}"
          />
          <vxe-table-column
            field="UNITQTY"
            width="120"
            :title="$t('SmtPlacementHeader._16')"
            :edit-render="{name: '$input', props: {readonly: true}}"
          />
          <vxe-table-column
            field="PNDESC"
            min-width="180"
            :title="$t('SmtPlacementHeader._17')"
            :edit-render="{name: '$input', props: {readonly: true}}"
          />
          <vxe-table-column
            field="FEEDERTYPE"
            min-width="200"
            :title="$t('SmtPlacementHeader._18')"
            :edit-render="{name: '$input', props: {readonly: true}}"
          />
          <vxe-table-column
            field="REFDESIGNATOR"
            width="150"
            :title="$t('SmtPlacementHeader._19')"
            :edit-render="{name: '$input', props: {readonly: true}}"
          />
          <vxe-table-column
            field="ENABLED"
            width="150"
            :title="$t('as_src.tb_an')"
            :edit-render="{autofocus: '.custom-input', type: 'visible'}"
          >
            <template v-slot:edit="{ row }">
              <div>
                <el-switch
                  v-model="row.ENABLED"
                  :active-text="$t('publics.btn.yes')"
                  :inactive-text="$t('publics.btn.no')"
                  active-color="#13ce66"
                  inactive-color="#cccccc"
                  active-value="Y"
                  inactive-value="N"
                />
              </div>
            </template>
          </vxe-table-column>
          <vxe-table-column
            field="CREATE_TIME"
            min-width="180"
            :title="$t('SmtPlacementHeader._20')"
            :edit-render="{name: '$input', props: {readonly: true}}"
          />
          <vxe-table-column
            field="CREATE_BY"
            width="150"
            :title="$t('SmtPlacementHeader._21')"
            :edit-render="{name: '$input', props: {readonly: true}}"
          />
          <vxe-table-column
            field="UPDATE_TIME"
            min-width="180"
            :title="$t('SmtPlacementHeader._22')"
            :edit-render="{name: '$input', props: {readonly: true}}"
          />
          <vxe-table-column
            field="UPDATE_BY"
            width="150"
            :title="$t('SmtPlacementHeader._23')"
            :edit-render="{name: '$input', props: {readonly: true}}"
          />
        </vxe-table>
      </div>
    </div>

    <!-- 筛选 -->
    <el-drawer
      :title="$t('SmtPlacementHeader._24')"
      :visible.sync="filterFlag"
      direction="ltr"
      size="25%"
    >
      <el-card class="box-card" style="margin: 0 10px">
        <div slot="header" class="clearfix">
          <span>{{ $t('SmtPlacementHeader._25') }}</span>
          <el-button
            style="float: right; padding: 3px 0"
            type="text"
            @click="() => {
              formData.PART_NO = '';
              formData.PLACEMENT = '';
              formData.STATION_ID = '';
              searchClick()
            }"
          >{{ $t('SmtPlacementHeader._26') }}</el-button>
          <el-button
            style="float: right; padding: 3px 0;margin-right:20px"
            type="text"
            @click="searchClick"
          >{{ $t('SmtPlacementHeader._27') }}</el-button>
        </div>
        <div>
          <el-form
            class="custom-form"
            label-position="top"
            label-width="80px"
            :model="formData"
            size="mini"
          >
            <el-form-item :label="$t('SmtPlacementHeader._28')">
              <el-input v-model="formData.PART_NO" clearable></el-input>
            </el-form-item>
            <el-form-item :label="$t('SmtPlacementHeader._29')">
              <el-input v-model="formData.PLACEMENT" clearable></el-input>
            </el-form-item>
            <el-form-item :label="$t('SmtPlacementHeader._30')">
              <el-select
                v-model="formData.STATION_ID"
                filterable
                clearable
                placeholder=" "
                style="width: 100%"
              >
                <el-option
                  v-for="item in SmtStation"
                  :key="item.ID"
                  :label="item.SMT_NAME"
                  :value="item.ID"
                />
              </el-select>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
      <!-- 筛选料单明细 -->
      <el-card class="box-card" style="margin: 32px 10px 0">
        <div slot="header" class="clearfix">
          <span>{{ $t('SmtPlacementHeader._31') }}</span>
          <el-button
            style="float: right; padding: 3px 0"
            type="text"
            @click="() => {
              queryData = {};
              filterDetailList()
            }"
          >{{ $t('SmtPlacementHeader._32') }}</el-button>
          <el-button
            style="float: right; padding: 3px 0;margin-right:20px"
            type="text"
            @click="filterDetailList"
          >{{ $t('publics.btn.makeSure') }}</el-button>
        </div>
        <div>
          <el-form
            class="custom-form"
            label-position="top"
            label-width="80px"
            :model="queryData"
            size="mini"
          >
            <el-form-item :label="$t('SmtPlacementHeader._33')">
              <el-input v-model="queryData.LOCATION" clearable></el-input>
            </el-form-item>
            <el-form-item :label="$t('SmtPlacementHeader._34')">
              <el-input v-model="queryData.PART_NO" clearable></el-input>
            </el-form-item>
            <el-form-item :label="$t('SmtPlacementHeader._35')">
              <el-input v-model="queryData.PNDESC" clearable></el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </el-drawer>
  </custom-container>
</template>

<script>
import { Index, LoadData, GetDetailData } from '@/api/SmtPlacementHeader'
import pagination from '@/views/mixin/page'
import { mapMutations } from 'vuex'
export default {
  name: 'List',
  components: {
    customContainer: () => import('@/components/custom-container'),
    customContainerHeader: () => import('@/components/custom-container-header')
  },
  mixins: [pagination],
  data () {
    return {
      formData: {
        PART_NO: '',
        PLACEMENT: '',
        STATION_ID: '',
        Page: 1,
        Limit: 10,
        Key: ''
      },
      loading: false,
      mainTable: [],
      validRules: {},
      loading2: false,
      mainTable2: [],
      validRules2: {},
      currentMstId: 0,
      filterFlag: false,
      queryData: {
        LOCATION: '',
        PART_NO: '',
        PNDESC: ''
      },
      defaultTableList: [],
      SmtStation: []
    }
  },
  methods: {
    ...mapMutations({
      SET_MST_ID: 'custom/materials/SET_MST_ID',
      SET_AI_FLAG: 'custom/materials/SET_AI_FLAG',
      SET_TXT_FLAG: 'custom/materials/SET_TXT_FLAG',
      SET_TXT_V2_FLAG: 'custom/materials/SET_TXT_V2_FLAG',
      SET_MACHINELIST: 'custom/materials/SET_MACHINELIST',
      SET_RI_FLAG: 'custom/materials/SET_RI_FLAG',
      SET_SIMENS_FLAG: 'custom/materials/SET_SIMENS_FLAG'
    }),
    async getIndex () {
      const res = await Index()
      if (res.Result) {
        this.SmtStation = res.Result.SmtStation
        const machineList = {}
        res.Result.machineList.map(item => {
          machineList[item] = item
        })
        this.SET_MACHINELIST(machineList)
        await this.getLoadData()
        this.getDetailData()
      }
    },
    async getLoadData () {
      this.loading = true
      const res = await LoadData(this.formData)
      this.loading = false
      this.mainTable = res.Result || []
      this.totalPage = res.TotalCount || 0
    },
    // 编辑料单
    editMaterials () {
      const row = this.$refs.xTable.getCurrentRecord()
      if (!row || !row.ID) {
        this.$message.error(this.$t('SmtPlacementHeader._36'))
        return false
      }
      this.SET_MST_ID(row.ID)
    },
    // AI料单上传
    upLoadAIMaterials () {
      this.SET_AI_FLAG(true)
    },
    // 三星料单上传
    upLoadTxtMaterials () {
      this.SET_TXT_FLAG(true)
    },
    // 三星料单上传 - V2
    upLoadTxtMaterialsV2 () {
      this.SET_TXT_V2_FLAG(true)
    },
    // RI料单上传
    upLoadRIMaterials () {
      this.SET_RI_FLAG(true)
    },
    // 西门子料单上传
    upLoadSimensMaterials () {
      this.SET_SIMENS_FLAG(true)
    },
    async getDetailData () {
      this.currentMstId = this.currentMstId || this.mainTable[0]?.ID || 0
      if (!this.currentMstId) return false
      this.loading2 = true
      const res = await GetDetailData(this.currentMstId)
      this.loading2 = false
      this.mainTable2 = res.Result || []
      this.defaultTableList = res.Result || []
      this.totalPage2 = res.TotalCount || 0
    },
    // 搜索筛选料单
    searchClick () {
      this.formData.Page = 1
      this.getLoadData()
    },
    // 筛选料单明细
    filterDetailList () {
      this.mainTable2 = this.defaultTableList.filter(val => {
        let flag = true
        Object.keys(this.queryData).forEach(item => {
          if (this.queryData[item]) {
            flag = val[item].indexOf(this.queryData[item]) > -1
          }
        })
        return flag
      })
    },
    // 点击料单列表
    cellClick ({ row }) {
      this.currentMstId = row.ID
      this.getDetailData()
    },
    async _handleSizeChange (Limit) {
      this.currentMstId = 0
      this.formData.Limit = Limit
      this.formData.Page = 1
      await this.getLoadData()
      this.getDetailData()
    },
    async _handleCurrentChange (Page) {
      this.currentIndex = 0
      this.formData.Page = Page
      await this.getLoadData()
      this.getDetailData()
    }
  },
  created () {
    this.getIndex()
  }
}
</script>

<style lang="scss" scoped>
.table-container1 {
  height: 350px;
}
.foot-page {
  padding: 5px 0;
}
.table-container2 {
  height: calc(100vh - 54px - 20px - 350px - 42px - 41px);
}
</style>
