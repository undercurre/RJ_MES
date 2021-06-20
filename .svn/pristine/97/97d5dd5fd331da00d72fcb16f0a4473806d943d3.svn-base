<template>
  <d2-container>
    <template slot="header">
      <custom-container-header :isExport="false" :isExportTpl="false" :isImport="false">
        <el-button
          type="danger"
          @click.prevent="eliminateClick"
          icon="el-icon-delete-solid"
        >{{ $t('publics.btn.clear') }}</el-button>
        <el-button
          type="success"
          icon="el-icon-check"
          @click.prevent="preserveClick"
          v-if="$btnList.indexOf('SmtFeederScrapSave') !== -1"
        >{{ $t('publics.btn.save') }}</el-button>
      </custom-container-header>
    </template>
    <el-form label-width="170px" size="small">
      <el-form-item :label="$t('sfs.rack')">
        <el-input v-model="feeder" :placeholder="$t('sfs.p_rack')" @change="getLoadData"></el-input>
      </el-form-item>
      <el-form-item :label="$t('sfs.dn')">
        <el-input v-model="form.SCRAP_REASON" :placeholder="$t('sfs.p_dn')"></el-input>
      </el-form-item>
    </el-form>
    <div>
      <vxe-table
        ref="xTable"
        class="storageTable"
        border
        resizable
        height="100%"
        size="medium"
        align="center"
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
        <vxe-table-column field="FEEDER" width="120" :title="$t('sfs.rack')" />
        <vxe-table-column field="LINE_NAME" width="180" :title="$t('sfs.uc')" />
        <vxe-table-column field="CHECKER_BY" width="100" :title="$t('sfs.my')" />
        <vxe-table-column field="REPAIRER_BY" width="140" :title="$t('sfs.mm')" />
        <vxe-table-column field="DEFECT_CODE" width="140" :title="$t('sfs.code')" />
        <vxe-table-column field="REASON_CODE" width="140" :title="$t('sfs.rff')" />
        <vxe-table-column field="DAMAGE_PART" width="130" :title="$t('sfs.dp')" />
        <vxe-table-column field="REPAIR_ITEM" width="160" :title="$t('sfs.mp')" />
        <vxe-table-column field="METHOD" width="130" :title="$t('sfs.rm')" />
        <vxe-table-column field="DEFECT_TIME" width="180" :title="$t('sfs.wt')" />
        <vxe-table-column field="REPAIR_TIME" width="180" :title="$t('sfs.mt')" />
        <vxe-table-column field="RESULT" width="100" :title="$t('sfs.rt')">
          <template v-slot="{ row }">
            <div v-for="itme in RepairResultList" :key="itme.ID">
              <span v-if="itme.ID == row.RESULT">{{ itme.NAME }}</span>
            </div>
          </template>
        </vxe-table-column>
        <vxe-table-column field="FEEDER_LOCATION" width="100" :title="$t('sfs.sn')" />
      </vxe-table>
    </div>
    <!-- 分页 -->
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
import { Index, GetFeederInfo, SaveData } from '@/api/SmtFeederScrap'
import { mapGetters } from 'vuex'
import pagination from '@/views/mixin/page'
export default {
  name: 'SmtFeederScrap',
  components: {
    customContainerHeader
  },
  mixins: [pagination],
  data () {
    return {
      feeder: '',
      form: {
        FEEDER: '', // 型号
        UserName: '', // 用户
        SCRAP_REASON: '' // 报废原因
      },
      loading: false,
      mainTable: [],
      RepairResultList: [] // 结果列表
    }
  },
  computed: {
    ...mapGetters(['userinfo'])
  },
  created () {
    this.form.UserName = this.userinfo.USER_NAME
    this.getIndex()
  },
  methods: {
    async getIndex () {
      const res = await Index()
      if (res.Result) {
        this.RepairResultList = res.Result.RepairResultList
        console.log(res.Result)
      }
    },
    async getLoadData () {
      if (this.feeder) {
        this.loading = true
        const res = await GetFeederInfo(this.feeder)
        if (res.Result) {
          this.mainTable = res.Result ? res.Result : []
        } else {
          this.feeder = ''
          this.mainTable = []
        }
        this.loading = false
        console.log(res)
      }
    },
    // 清除
    eliminateClick () {
      this.form.FEEDER = ''
      this.feeder = ''
      this.form.SCRAP_REASON = ''
      this.mainTable = []
    },
    // 保存
    preserveClick () {
      if (this.feeder === '') {
        this.$message({
          showClose: true,
          message: this.$t('sfs.p_rack'),
          type: 'warning'
        })
        return
      }
      if (this.form.SCRAP_REASON === '') {
        this.$message({
          showClose: true,
          message: this.$t('sfs.p_dn'),
          type: 'warning'
        })
        return
      }
      var that = this
      this.form.FEEDER = this.feeder
      this.$refs.xTable.validate(valid => {
        if (valid) {
          SaveData(this.form).then(res => {
            if (res.Result) {
              that.$notify({
                title: this.$t('sfs.su'),
                message: this.$t('sfs.ssuy'),
                type: 'success',
                duration: 2000
              })
            }
            that.getLoadData()
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.storageTable {
  height: calc(100vh - 60px - 21px - 74px - 41px - 74px - 53px);
}
</style>
