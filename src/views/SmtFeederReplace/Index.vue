<template>
  <d2-container>
    <template slot="header">
      <custom-container-header :isExport="false" :isExportTpl="false" :isImport="false">
        <el-button
          type="danger"
          @click.prevent="eliminateClick"
          icon="el-icon-delete-solid"
          v-if="$btnList.indexOf('SmtFeederReplaceSave') !== -1"
        >{{ $t('publics.btn.clear') }}</el-button>
        <el-button
          type="success"
          icon="el-icon-check"
          @click.prevent="preserveClick"
        >{{ $t('publics.btn.save') }}</el-button>
      </custom-container-header>
    </template>
    <el-form label-width="120px" size="small">
      <el-form-item :label="$t('sfr.rack')">
        <el-input v-model="formData.FEEDER" :placeholder="$t('sfr.p_rack')" @change="getLoadData"></el-input>
      </el-form-item>
      <el-form-item :label="$t('sfr.newcode')">
        <el-input v-model="updateRecords.FEEDER" :placeholder="$t('sfr.p_newcode')"></el-input>
      </el-form-item>
    </el-form>
    <div>
      <vxe-table
        ref="xTable"
        class="storageTable"
        border
        resizable
        size="medium"
        align="center"
        height="100%"
        highlight-hover-row
        auto-resize
        keep-source
        stripe
        :loading="loading"
        :data="mainTable"
        :mouse-config="{selected: true}"
        :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
        :radio-config="{labelField: 'name', trigger: 'row'}"
        :checkbox-config="{checkField: 'checked', trigger: 'row', reserve: false}"
      >
        <vxe-table-column field="FEEDER" width="120" :title="$t('sfr.ra')" />
        <vxe-table-column field="SUPPLIER" width="100" :title="$t('sfr.sr')" />
        <vxe-table-column field="FTYPE" width="100" :title="$t('sfr.ty')" />
        <vxe-table-column field="FSIZE" width="100" :title="$t('sfr.size')" />
        <vxe-table-column field="FBODYMARK" width="140" :title="$t('sfr.og')" />
        <vxe-table-column field="STATUS" width="100" :title="$t('sfr.ss')" />
        <vxe-table-column field="CHECK_USED_COUNT" width="140" :title="$t('sfr.cuc')" />
        <vxe-table-column field="EMEND_USED_COUNT" width="100" :title="$t('sfr.euc')" />
        <vxe-table-column field="TOTAL_USED_COUNT" width="110" :title="$t('sfr.tuc')" />
        <vxe-table-column field="LAST_CHECK_TIME" width="150" :title="$t('sfr.lct')" />
        <vxe-table-column field="LAST_EMEND_TIME" width="160" :title="$t('sfr.let')" />
        <vxe-table-column field="LAST_REPAIR_TIME" width="150" :title="$t('sfr.lrt')" />
        <vxe-table-column field="DESCRIPTION" width="100" :title="$t('sfr.dn')" />
        <vxe-table-column field="CREATE_BY" width="100" :title="$t('sfr.cby')" />
        <vxe-table-column field="CREATE_TIME" width="120" :title="$t('sfr.ct')" />
        <vxe-table-column field="UPDATE_BY" width="100" :title="$t('sfr.ut')" />
        <vxe-table-column field="UPDATE_TIME" width="110" :title="$t('sfr.uee')" />
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
  </d2-container>
</template>

<script>
import customContainerHeader from '@/components/custom-container-header'
import {
  Index,
  LoadData,
  QueryByNewFeeder,
  SaveData
} from '@/api/SmtFeederReplace'
import pagination from '@/views/mixin/page'
import { mapGetters } from 'vuex'
export default {
  name: 'SmtFeederReplace',
  components: {
    customContainerHeader
  },
  mixins: [pagination],
  computed: {
    ...mapGetters(['userId'])
  },
  data () {
    return {
      loading: false,
      mainTable: [],
      StatusList: [],
      formData: {
        FEEDER: '',
        Page: 1,
        Limit: 15
      },
      updateRecords: {
        ID: '',
        FEEDER: ''
        // ORGANIZE_ID: 1
      },
      totalPage: 0
    }
  },
  created () {
    this.getIndex()
  },
  methods: {
    async getIndex () {
      const res = await Index()
      if (res.Result) {
        this.StatusList = res.Result.StatusList
      }
    },
    // 查询原条码信息
    async getLoadData () {
      this.formData.USER_ID = this.userId
      this.loading = true
      const res = await LoadData(this.formData)
      if (res.Result) {
        this.mainTable = res.Result
        this.totalPage = res.TotalCount
        this.loading = false
        this.mainTable.map(item => {
          this.updateRecords.ID = item.ID
        })
      } else {
        this.formData.FEEDER = ''
        this.loading = false
      }
    },
    // 清除
    eliminateClick () {
      this.formData.FEEDER = ''
      this.updateRecords.FEEDER = ''
      this.mainTable = []
    },
    // 保存
    async preserveClick () {
      if (this.formData.FEEDER === '') {
        this.$message({
          showClose: true,
          message: this.$t('sfr.p_rack'),
          type: 'warning'
        })
        return
      }
      if (this.updateRecords.FEEDER === '') {
        this.$message({
          showClose: true,
          message: this.$t('sfr.newcode'),
          type: 'warning'
        })
        return
      }
      const res = await QueryByNewFeeder(this.updateRecords.FEEDER)
      if (res.Result !== void 0) {
        if (!res.Result) {
          const _res = await SaveData(this.updateRecords)
          if (_res.Result) {
            this.formData.FEEDER = this.updateRecords.FEEDER
            this.getLoadData()
            this.$notify({
              title: this.$t('sfr.su'),
              message: this.$t('sfr.ssuy'),
              type: 'success',
              duration: 2000
            })
          }
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.storageTable {
  height: calc(100vh - 60px - 41px - 54px - 20px - 76px - 62px);
}
</style>
