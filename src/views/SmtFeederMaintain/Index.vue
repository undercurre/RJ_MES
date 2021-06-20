<template>
  <d2-container>
    <template slot="header">
      <custom-container-header :isExport="false" :isExportTpl="false" :isImport="false">
        <el-button type="danger" @click.prevent="eliminateClick">
          <i class="el-icon-delete-solid" />
          &nbsp;{{ $t('publics.btn.clear') }}
        </el-button>
        <el-button
          type="success"
          icon="el-icon-check"
          @click.prevent="preserveClick"
          v-if="$btnList.indexOf('SmtFeederMaintainSave') !== -1"
        >{{ $t('publics.btn.save') }}</el-button>
      </custom-container-header>
    </template>
    <el-form ref="form" :model="form" label-width="140px" size="small">
      <el-row>
        <el-form-item :label="$t('sfm.ma')">
          <el-radio-group v-model="form.MAINTAIN_KIND">
            <el-radio :label="1">{{ $t('sfm.md') }}</el-radio>
            <el-radio :label="2">{{ $t('sfm.cd') }}</el-radio>
            <el-radio :label="3">{{ $t('sfm.mdcd') }}</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item :label="$t('sfm.rack')">
          <el-input
            v-model="formData.FEEDER"
            :placeholder="$t('sfm.p_rack')"
            @change="getfeederData"
          />
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item :label="$t('sfm.dn')">
          <el-input v-model="form.DESCRIPTION" :placeholder="$t('sfm.p_dn')" />
        </el-form-item>
      </el-row>
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
        :checkbox-config="{checkField: 'checked', trigger: 'row', reserve: false}"
      >
        <vxe-table-column min-width="150" field="FEEDER_NAME" :title="$t('sfm.rack')" />
        <vxe-table-column min-width="150" field="USED_COUNT" :title="$t('sfm.uc')" />
        <vxe-table-column min-width="150" field="MAINTAIN_KIND" :title="$t('sfm.my')" />
        <vxe-table-column min-width="150" field="MAINTAIN_BY" :title="$t('sfm.mm')" />
        <vxe-table-column min-width="150" field="DESCRIPTION" :title="$t('sfm.dn')" />
        <vxe-table-column min-width="150" field="MAINTAIN_TIME" :title="$t('sfm.mt')" />
        <!-- <vxe-table-column field="FEEDER_NAME" :title="$t('sfm.sn')" /> -->
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
import pagination from '@/views/mixin/page'
import {
  Index,
  GetFeederInfo,
  QueryByNewFeeder,
  SaveData
} from '@/api/SmtFeederMaintain'
import { mapGetters } from 'vuex'
export default {
  name: 'SmtFeederMaintain',
  components: {
    customContainerHeader
  },
  mixins: [pagination],
  computed: {
    ...mapGetters(['userinfo'])
  },
  data () {
    return {
      form: {
        FEEDER_ID: '', // 料架编号
        MAINTAIN_KIND: '', // 维护类型(已保养、已校正、已保养+校正 分别对应数字1,2,3):
        MAINTAIN_BY: '', // 维护人对应用户名:
        DESCRIPTION: '' // 描述:
      },
      formData: {
        FEEDER: ''
      },
      loading: false,
      mainTable: [],
      totalPage: 0,
      user: []
    }
  },
  created () {
    this.user = this.userinfo
    this.form.MAINTAIN_BY = this.user.USER_NAME
    this.getIndex()
  },
  methods: {
    async getIndex () {
      const res = await Index()
      if (res.Result) {
      }
    },
    async getfeederData () {
      const row = await QueryByNewFeeder(this.formData.FEEDER)
      if (row.Result) {
        console.log(row.Result, 'row.Result')
        this.form.FEEDER_ID = row.Result.ID
        this.getLoadData()
      } else {
        this.formData.FEEDER = ''
      }
    },
    async getLoadData () {
      this.loading = true
      const res = await GetFeederInfo(this.formData)
      this.loading = false
      if (res.Result) {
        console.log(res.Result, 'res.Result')
        const MainTable = res.Result
        if (MainTable.length !== 0 && MainTable !== null) {
          this.mainTable = []
          MainTable.map(item => {
            if (item.FEEDER_ID) {
              this.form.FEEDER_ID = item.FEEDER_ID
            }
            this.mainTable.push(item)
          })
          this.totalPage = res.TotalCount
        } else {
        }
      } else {
        this.formData.FEEDER = ''
      }
    },
    // 清空
    eliminateClick () {
      this.form.FEEDER_ID = ''
      this.form.MAINTAIN_KIND = ''
      this.form.DESCRIPTION = ''
      this.formData.FEEDER = ''
      this.mainTable = []
    },
    // 保存
    preserveClick () {
      if (this.formData.FEEDER === '') {
        this.$message({
          showClose: true,
          message: this.$t('sfm.p_rack'),
          type: 'warning'
        })
        return
      }
      if (this.form.MAINTAIN_KIND === '') {
        this.$message({
          showClose: true,
          message: this.$t('sfm.psy'),
          type: 'warning'
        })
        return
      }
      var that = this
      this.$refs.xTable.validate(valid => {
        if (valid) {
          SaveData(this.form).then(res => {
            if (res.Result) {
              that.$notify({
                title: this.$t('sfm.su'),
                message: this.$t('sfm.ssuy'),
                type: 'success',
                duration: 2000
              })
            }
            that.getfeederData()
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.storageTable {
  height: calc(100vh - 60px - 21px - 74px - 20px - 41px - 170px);
}
</style>
