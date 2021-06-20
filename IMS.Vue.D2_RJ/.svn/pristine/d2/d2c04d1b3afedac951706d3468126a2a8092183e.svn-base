<template>
  <d2-container>
    <template slot="header">
      <custom-container-header :isExportTpl="false" :isExport="false" :isImport="false">
        <el-input v-model="formData.Key" clearable :placeholder="$t('SfcsEcndoc._1')" style="width: 200px"></el-input>
        <el-select :placeholder="$t('SfcsEcndoc._2')" v-model="formData.CHANGEREASON" clearable filterable style="width: 200px">
          <el-option v-for="item in CHANGEREASON_LIST" :key="item.CODES" :label="item.TEXTS" :value="item.CODES"></el-option>
        </el-select>
        <el-select :placeholder="$t('SfcsEcndoc._3')" v-model="formData.ECNDOCTYPE" clearable filterable style="width: 200px">
          <el-option v-for="item in ECNDOCTYPE_LIST" :key="item.CODES" :label="item.TEXTS" :value="item.CODES"></el-option>
        </el-select>
        <el-select :placeholder="$t('SfcsEcndoc._4')" v-model="formData.CHANGETYPE" clearable filterable style="width: 200px">
          <el-option v-for="item in CHANGETYPE_LIST" :key="item.CODES" :label="item.TEXTS" :value="item.CODES"></el-option>
        </el-select>
        <el-select :placeholder="$t('SfcsEcndoc._5')" v-model="formData.STATUS" clearable filterable style="width: 200px">
          <el-option v-for="item in STATUS_LIST" :key="item.CODES" :label="item.TEXTS" :value="item.CODES"></el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">{{ $t('SfcsEcndoc._6') }}</el-button>
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
          :mouse-config="{selected: true}"
          :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
          :radio-config="{labelField: 'name', trigger: 'row'}"
          :checkbox-config="{checkField: 'checked', trigger: 'row'}"
          @cell-click="cellClick"
        >
          <vxe-table-column
            field="DOCNO"
            min-width="180"
            :title="$t('SfcsEcndoc._7')"
            :edit-render="{name: '$input', props: {readonly: true}}"
          />
          <vxe-table-column
            field="CHANGEREASONDETAIL"
            min-width="180"
            :title="$t('SfcsEcndoc._8')"
            :edit-render="{name: '$input', props: {readonly: true}}"
          />
          <vxe-table-column
            field="PRIORITY"
            min-width="150"
            :title="$t('SfcsEcndoc._9')"
            :edit-render="{name: '$input', props: {readonly: true}}"
          />
          <vxe-table-column
            field="CHANGETYPEDETAIL"
            min-width="180"
            :title="$t('SfcsEcndoc._10')"
            :edit-render="{name: '$input', props: {readonly: true}}"
          />
          <vxe-table-column
            field="ISCOSTROLLUP"
            min-width="150"
            :title="$t('SfcsEcndoc._11')"
            :formatter="handleForMatterIscostrollup"
            :edit-render="{name: '$input', props: {readonly: true}}"
          />
          <vxe-table-column
            field="ECNDOCTYPEDETAIL"
            min-width="150"
            :title="$t('SfcsEcndoc._12')"
            :edit-render="{name: '$input', props: {readonly: true}}"
          />
          <vxe-table-column
            field="ISBATCHCHANGE"
            min-width="150"
            :title="$t('SfcsEcndoc._13')"
            :formatter="handleForMatterIsBatchChange"
            :edit-render="{name: '$input', props: {readonly: true}}"
          />
          <vxe-table-column
            field="BATCHCHANGETYPEEXPLAIN"
            min-width="150"
            :title="$t('SfcsEcndoc._14')"
            :edit-render="{name: '$input', props: {readonly: true}}"
          />
          <vxe-table-column
            field="BATCHCHANGEOBJEXPLAIN"
            min-width="150"
            :title="$t('SfcsEcndoc._15')"
            :edit-render="{name: '$input', props: {readonly: true}}"
          />
          <vxe-table-column
            field="PROPOSERNAME"
            min-width="150"
            :title="$t('SfcsEcndoc._16')"
            :edit-render="{name: '$input', props: {readonly: true}}"
          />
          <vxe-table-column
            field="DEPARTMENTNAME"
            min-width="180"
            :title="$t('SfcsEcndoc._17')"
            :edit-render="{name: '$input', props: {readonly: true}}"
          />
          <vxe-table-column
            field="PROPOSEDATE"
            min-width="180"
            :title="$t('SfcsEcndoc._18')"
            :edit-render="{name: '$input', props: {readonly: true}}"
          />
          <vxe-table-column
            field="ISUPDATEREALTIME"
            min-width="150"
            :title="$t('SfcsEcndoc._19')"
            :formatter="handleForMatterIsUpdaterealtime"
            :edit-render="{name: '$input', props: {readonly: true}}"
          />
          <vxe-table-column
            field="BUSINESSCREATEDNAME"
            min-width="150"
            :title="$t('SfcsEcndoc._20')"
            :edit-render="{name: '$input', props: {readonly: true}}"
          />
          <vxe-table-column
            field="BUSINESSCREATEDON"
            min-width="180"
            :title="$t('SfcsEcndoc._21')"
            :edit-render="{name: '$input', props: {readonly: true}}"
          />
          <vxe-table-column
            field="APPROVEUSERNAME"
            min-width="150"
            :title="$t('SfcsEcndoc._22')"
            :edit-render="{name: '$input', props: {readonly: true}}"
          />
          <vxe-table-column
            field="APPROVEDATE"
            min-width="180"
            :title="$t('SfcsEcndoc._23')"
            :edit-render="{name: '$input', props: {readonly: true}}"
          />
          <vxe-table-column
            field="STATUSEXPLAIN"
            min-width="150"
            :title="$t('SfcsEcndoc._24')"
            :edit-render="{name: '$input', props: {readonly: true}}"
          />
          <vxe-table-column
            field="ISADDNEWVERSION"
            min-width="150"
            :title="$t('SfcsEcndoc._25')"
            :formatter="handleForMatterIsAddNewVersion"
            :edit-render="{name: '$input', props: {readonly: true}}"
          />
        </vxe-table>
      </div>
      <div class="foot-page">
        <el-pagination
          :current-page="formData.Page"
          :page-size="formData.Limit"
          :page-sizes="[10, 20, 30, 40]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
    <div class="block-two">
      <div style="border-top: 1px solid rgb(229, 231, 237)">
        <span
          style="display: block;color: #8492a6;font-size: 14px;margin: 10px 0;"
        >{{ $t('SfcsEcndoc._26') }}</span>
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
          :mouse-config="{selected: true}"
          :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
          :radio-config="{labelField: 'name', trigger: 'row'}"
          :checkbox-config="{checkField: 'checked', trigger: 'row'}"
        >
          <vxe-table-column
            field="LINENUM"
            min-width="150"
            :title="$t('SfcsEcndoc._27')"
            :edit-render="{name: '$input', props: {readonly: true}}"
          />
          <vxe-table-column
            field="ACDTYPEEXPLAIN"
            min-width="150"
            :title="$t('SfcsEcndoc._28')"
            :edit-render="{name: '$input', props: {readonly: true}}"
          />
          <vxe-table-column
            field="CHANGETYPEEXPLAIN"
            min-width="150"
            :title="$t('SfcsEcndoc._29')"
            :edit-render="{name: '$input', props: {readonly: true}}"
          />
          <vxe-table-column
            field="CHGOBJCODE"
            min-width="200"
            :title="$t('SfcsEcndoc._30')"
            :edit-render="{name: '$input', props: {readonly: true}}"
          />
          <vxe-table-column
            field="CHGOBJNAME"
            min-width="200"
            :title="$t('SfcsEcndoc._31')"
            :edit-render="{name: '$input', props: {readonly: true}}"
          />
          <vxe-table-column
            field="ITEMMASTER"
            min-width="200"
            :title="$t('SfcsEcndoc._32')"
            :edit-render="{name: '$input', props: {readonly: true}}"
          />
          <vxe-table-column
            field="ORIGINALVERSION"
            min-width="150"
            :title="$t('SfcsEcndoc._33')"
            :edit-render="{name: '$input', props: {readonly: true}}"
          />
          <vxe-table-column
            field="VERSION"
            min-width="150"
            :title="$t('SfcsEcndoc._34')"
            :edit-render="{name: '$input', props: {readonly: true}}"
          />
          <vxe-table-column
            field="OWNERORGNAME"
            min-width="150"
            :title="$t('SfcsEcndoc._35')"
            :edit-render="{name: '$input', props: {readonly: true}}"
          />
          <vxe-table-column
            field="ALTERNATETYPEEXPLAIN"
            min-width="150"
            :title="$t('SfcsEcndoc._36')"
            :edit-render="{name: '$input', props: {readonly: true}}"
          />
          <vxe-table-column
            field="PRODUCTLINE"
            min-width="150"
            :title="$t('SfcsEcndoc._37')"
            :edit-render="{name: '$input', props: {readonly: true}}"
          />
          <vxe-table-column
            field="LOT"
            min-width="150"
            :title="$t('SfcsEcndoc._38')"
            :edit-render="{name: '$input', props: {readonly: true}}"
          />
          <vxe-table-column
            field="PRODUCTUOMNAME"
            min-width="150"
            :title="$t('SfcsEcndoc._39')"
            :edit-render="{name: '$input', props: {readonly: true}}"
          />
          <vxe-table-column
            field="DISABLEDATE"
            min-width="150"
            :title="$t('SfcsEcndoc._40')"
            :edit-render="{name: '$input', props: {readonly: true}}"
          />
          <vxe-table-column
            field="ORIGINALDISABLEDATE"
            min-width="150"
            :title="$t('SfcsEcndoc._41')"
            :edit-render="{name: '$input', props: {readonly: true}}"
          />
          <vxe-table-column
            field="STATUSEXPLAIN"
            min-width="150"
            :title="$t('SfcsEcndoc._42')"
            :edit-render="{name: '$input', props: {readonly: true}}"
          />
          <vxe-table-column
            field="AUDITORNAME"
            min-width="150"
            :title="$t('SfcsEcndoc._43')"
            :edit-render="{name: '$input', props: {readonly: true}}"
          />
          <vxe-table-column
            field="AUDITDATE"
            min-width="180"
            :title="$t('SfcsEcndoc._44')"
            :edit-render="{name: '$input', props: {readonly: true}}"
          />
          <vxe-table-column
            field="ISCANCELED"
            min-width="150"
            :title="$t('SfcsEcndoc._45')"
            :formatter="handleForMatterIsCanceled"
            :edit-render="{name: '$input', props: {readonly: true}}"
          />
          <vxe-table-column
            field="BOMTYPEEXPLAIN"
            min-width="150"
            :title="$t('SfcsEcndoc._46')"
            :edit-render="{name: '$input', props: {readonly: true}}"
          />
          <vxe-table-column
            field="ISCONSIDERMRP"
            min-width="150"
            :title="$t('SfcsEcndoc._47')"
            :formatter="handleForMatterIsConsidermrp"
            :edit-render="{name: '$input', props: {readonly: true}}"
          />
          <vxe-table-column
            field="DETAILCREATEDBY"
            min-width="150"
            :title="$t('SfcsEcndoc._48')"
            :edit-render="{name: '$input', props: {readonly: true}}"
          />
          <vxe-table-column
            field="DETIALCREATEDON"
            min-width="180"
            :title="$t('SfcsEcndoc._49')"
            :edit-render="{name: '$input', props: {readonly: true}}"
          />
          <vxe-table-column
            field="PLANRELEASEDATE"
            min-width="180"
            :title="$t('SfcsEcndoc._50')"
            :edit-render="{name: '$input', props: {readonly: true}}"
          />
          <vxe-table-column
            field="ACTUALRELEASEDATE"
            min-width="180"
            :title="$t('SfcsEcndoc._51')"
            :edit-render="{name: '$input', props: {readonly: true}}"
          />
        </vxe-table>
      </div>
      <div class="foot-page">
        <el-pagination
          :current-page="listQuery.Page"
          :page-size="listQuery.Limit"
          :page-sizes="[10, 20, 30, 40]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount2"
          @size-change="_handleSizeChange"
          @current-change="_handleCurrentChange"
        />
      </div>
    </div>
  </d2-container>
</template>

<script>
import customContainerHeader from '@/components/custom-container-header'
import {
  Index,
  LoadEcnDocData,
  LoadEcnDocDetailData
} from '@/api/SfcsEcndoc'
export default {
  name: 'SfcsEcndoc',
  data () {
    return {
      formData: {
        ECNDOCTYPE: '',
        CHANGEREASON: '',
        CHANGETYPE: '',
        STATUS: '',
        Page: 1,
        Limit: 10,
        Key: ''
      },
      totalCount: 0,
      CHANGEREASON_LIST: [],
      CHANGETYPE_LIST: [],
      ECNDOCTYPE_LIST: [],
      STATUS_LIST: [],
      mainTable: [],
      loading: false,
      loading2: false,
      mainTable2: [],
      listQuery: {
        ECNDOC: 0,
        Page: 1,
        Limit: 10,
        Key: ''
      },
      totalCount2: 0
    }
  },
  methods: {
    async getIndex () {
      const res = await Index()
      const { CHANGEREASON_LIST = [], CHANGETYPE_LIST = [], ECNDOCTYPE_LIST = [], STATUS_LIST = [] } = res.Result || {}
      this.CHANGEREASON_LIST = CHANGEREASON_LIST
      this.CHANGETYPE_LIST = CHANGETYPE_LIST
      this.ECNDOCTYPE_LIST = ECNDOCTYPE_LIST
      this.STATUS_LIST = STATUS_LIST
      this.getLoadData()
    },
    async handleSearch () {
      this.formData.Page = 1
      await this.getLoadData()
      this.mainTable2 = []
      this.listQuery.Page = 1
      this.listQuery.ECNDOC = this.mainTable2?.[0].ECNDOC || 0
      if (this.listQuery.ECNDOC) {
        this.getDetailsList()
      }
    },
    cellClick ({ row }) {
      this.listQuery.Page = 1
      this.listQuery.ECNDOC = row.ECNDOC
      this.getDetailsList()
    },
    async getLoadData () {
      this.loading = true
      const res = await LoadEcnDocData(this.formData)
      this.loading = false
      this.mainTable = res.Result || []
      this.totalCount = res.TotalCount || 0
    },
    handleForMatterIscostrollup ({ cellValue }) {
      if (cellValue === 1) {
        return this.$t('SfcsEcndoc._52')
      } else {
        return this.$t('SfcsEcndoc._53')
      }
    },
    handleForMatterIsBatchChange ({ cellValue }) {
      if (cellValue === 1) {
        return this.$t('SfcsEcndoc._52')
      } else {
        return this.$t('SfcsEcndoc._53')
      }
    },
    handleForMatterIsUpdaterealtime ({ cellValue }) {
      if (cellValue === 1) {
        return this.$t('SfcsEcndoc._52')
      } else {
        return this.$t('SfcsEcndoc._53')
      }
    },
    handleSizeChange (Limit) {
      this.formData.Page = 1
      this.formData.Limit = Limit
      this.getLoadData()
    },
    handleCurrentChange (Page) {
      this.formData.Page = Page
      this.getLoadData()
    },
    handleForMatterIsCanceled ({ cellValue }) {
      if (cellValue === 1) {
        return this.$t('SfcsEcndoc._52')
      } else {
        return this.$t('SfcsEcndoc._53')
      }
    },
    handleForMatterIsConsidermrp ({ cellValue }) {
      if (cellValue === 1) {
        return this.$t('SfcsEcndoc._52')
      } else {
        return this.$t('SfcsEcndoc._53')
      }
    },
    async getDetailsList () {
      this.loading2 = true
      const res = await LoadEcnDocDetailData(this.listQuery)
      this.loading2 = false
      this.mainTable2 = res.Result || []
      this.totalCount2 = res.TotalCount || 0
    },
    handleForMatterIsAddNewVersion ({ cellValue }) {
      if (cellValue === 1) {
        return this.$t('SfcsEcndoc._52')
      } else {
        return this.$t('SfcsEcndoc._53')
      }
    },
    _handleSizeChange (Limit) {
      this.listQuery.Page = 1
      this.listQuery.Limit = Limit
      this.getDetailsList()
    },
    _handleCurrentChange (Page) {
      this.listQuery.Page = Page
      this.getDetailsList()
    }
  },
  created () {
    this.getIndex()
  },
  components: {
    customContainerHeader
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
