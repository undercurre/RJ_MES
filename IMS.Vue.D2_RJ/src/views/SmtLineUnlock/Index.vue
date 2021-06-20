<template>
  <d2-container class="SmtLineUnlock">
    <template slot="header">
      <custom-container-header :isExport="false"
                               :isExportTpl="false"
                               :isImport="false">
        <el-input v-model="formData.ID"
                  :placeholder="$t('slu.p_1')"
                  clearable
                  style="width:200px"
                  @keyup.enter.native="searchClick" />
        &nbsp;
        <el-button type="primary"
                   icon="el-icon-search"
                   @click.prevent="searchClick">{{ $t('slu.hd_sf') }}</el-button>
        <el-button v-if="$btnList.indexOf('MesFirstCheckRecordHeaderSave') !== -1"
                   type="success"
                   icon="el-icon-check"
                   @click.prevent="preserveClick">{{ $t('slu.save') }}</el-button>
      </custom-container-header>
    </template>
    <div>
      <el-form ref="form"
               :model="form"
               label-width="150px"
               class="xform1"
               size="small">
        <div class="form-title">{{ $t('slu.f_tit') }}</div>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('slu.f_1')">
              <el-input v-model="formDa.WO_NO"
                        disabled />
            </el-form-item>
            <el-form-item :label="$t('slu.f_2')">
              <el-input v-model="formDa.MESHINE"
                        disabled />
            </el-form-item>
            <el-form-item :label="$t('slu.f_3')">
              <el-input v-model="formDa.LINE_NO"
                        disabled />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('slu.f_4')">
              <el-input v-model="formDa.LOT_NO"
                        disabled />
            </el-form-item>
            <el-form-item :label="$t('slu.f_5')">
              <el-input v-model="formDa.RESULT"
                        disabled />
            </el-form-item>
            <el-form-item :label="$t('slu.f_6')">
              <el-input v-model="formDa.BOM_VERSION"
                        disabled />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item :label="$t('slu.f_7')">
              <el-radio-group v-model="form.STATUS"
                              size="medium">
                <el-radio label="Y">{{ $t('slu.f_8') }}</el-radio>
                <el-radio label="N">{{ $t('slu.f_9') }}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item :label="$t('slu._27')">
              <el-input v-model="form.CONTENT"
                        type="textarea"
                        :placeholder="$t('slu._26')" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div>
      <div class="form-title">{{ $t('slu.t_1') }}</div>
      <el-tabs v-model="activeName"
               @tab-click="handleClick">
        <el-tab-pane :label="$t('slu.t_2')"
                     name="annal">
          <div class="SmtLineUnlock-table">
            <el-table v-loading="loading"
                      stripe
                      :data="annalTable"
                      width="100%"
                      height="100%"
                      highlight-hover-row
                      highlight-current-row
                      show-overflow
                      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                      @row-click="obtain_but">
              <el-table-column :label="$t('slu.t_4')"
                               min-width="80"
                               align="center">
                <template slot-scope="scope">
                  <el-radio v-model="radio"
                            class="radio"
                            :label="scope.$index" />
                </template>
              </el-table-column>
              <el-table-column min-width="130"
                               prop="LOT_NO"
                               :label="$t('slu.t_5')"
                               align="center"
                               :show-overflow-tooltip="true" />
              <el-table-column min-width="140"
                               prop="WO_NO"
                               :label=" $t('slu.t_6')"
                               align="center"
                               :show-overflow-tooltip="true" />
              <el-table-column min-width="80"
                               prop="LINE_NO"
                               :label="$t('slu.t_7')"
                               align="center"
                               :show-overflow-tooltip="true" />
              <el-table-column min-width="120"
                               prop="COMPANY"
                               :label="$t('slu.t_8')"
                               align="center"
                               :show-overflow-tooltip="true" />
              <el-table-column min-width="140"
                               prop="MESHINE"
                               :label="$t('slu.t_9')"
                               align="center"
                               :show-overflow-tooltip="true" />
              <el-table-column min-width="130"
                               prop="RESULT"
                               :label="$t('slu.t_10')"
                               align="center"
                               :show-overflow-tooltip="true" />
              <el-table-column min-width="110"
                               prop="CLASS_NAME"
                               :label="$t('slu.t_11')"
                               align="center"
                               :show-overflow-tooltip="true" />
              <el-table-column min-width="130"
                               prop="BOM_VERSION"
                               :label="$t('slu.t_12')"
                               align="center"
                               :show-overflow-tooltip="true" />
              <el-table-column min-width="150"
                               prop="TOTAL_ENTITY"
                               :label="$t('slu.t_13')"
                               align="center"
                               :show-overflow-tooltip="true" />
              <el-table-column min-width="150"
                               prop="PASS_ENTITY"
                               :label="$t('slu.t_14')"
                               align="center"
                               :show-overflow-tooltip="true" />
              <el-table-column min-width="80"
                               prop="NG_ENTITY"
                               :label="$t('slu.t_15')"
                               align="center"
                               :show-overflow-tooltip="true" />
              <el-table-column min-width="80"
                               prop="UNCHECK_ENTITY"
                               :label="$t('slu.t_16')"
                               align="center"
                               :show-overflow-tooltip="true" />
              <el-table-column min-width="130"
                               prop="PRODUCT_DATE"
                               :label="$t('slu.t_17')"
                               align="center"
                               :show-overflow-tooltip="true" />
              <el-table-column min-width="130"
                               prop="PASS_RATE"
                               :label="$t('slu.t_18')"
                               align="center"
                               :show-overflow-tooltip="true" />
            </el-table>
          </div>
          <el-pagination class="SmtLineUnlock-pagination"
                         :current-page="formData.Page"
                         :page-size="formData.Limit"
                         :page-sizes="[15, 25, 35, 45]"
                         layout="total, sizes, prev, pager, next, jumper"
                         :total="total"
                         @size-change="handleSizeChange"
                         @current-change="handleCurrentChange" />
        </el-tab-pane>
        <el-tab-pane :label="$t('slu.t_3')"
                     name="Detail"
                     class="SmtLineUnlock-table">
          <div class="SmtLineUnlock-table">
            <el-table v-loading="Detailloading"
                      stripe
                      :data="DetailTable"
                      width="100%"
                      height="100%"
                      highlight-hover-row
                      highlight-current-row
                      show-overflow
                      :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                      @row-click="DetailClick">
              <el-table-column :label="$t('slu.t_4')"
                               width="80"
                               align="center">
                <template slot-scope="scope">
                  <el-radio v-model="Detailradio"
                            class="radio"
                            :label="scope.$index" /></template>
              </el-table-column>

              <el-table-column prop="POSITION"
                               :label="$t('slu.t_19')"
                               align="center"
                               :show-overflow-tooltip="true" />
              <el-table-column prop="PART_NO"
                               :label="$t('slu.t_20')"
                               align="center"
                               :show-overflow-tooltip="true" />
              <el-table-column prop="RESULT"
                               :label="$t('slu.t_21')"
                               align="center"
                               :show-overflow-tooltip="true" />
            </el-table>
          </div>
          <!-- <template slot="footer"> -->
          <el-pagination class="SmtLineUnlock-pagination"
                         :current-page="DetailData.Page"
                         :page-size="DetailData.Limit"
                         :page-sizes="[15, 25, 35, 45]"
                         layout="total, sizes, prev, pager, next, jumper"
                         :total="Detailtotal"
                         @size-change="DetailhandleSizeChange"
                         @current-change="DetailhandleCurrentChange" />
          <!-- </template> -->
        </el-tab-pane>
      </el-tabs>
    </div>
  </d2-container>
</template>
<script>
import helper from '@/api/MesFirstCheckRecordHeader'
import customContainerHeader from '@/components/custom-container-header'
import {
  mapGetters
} from 'vuex'
const API = helper('MesFirstCheckRecordHeader')

export default {
  name: 'SmtLineUnlock',
  components: { customContainerHeader },
  data () {
    return {
      activeName: 'annal',
      radio: '',
      Detailradio: '',
      loading: false,
      annalTable: [],
      Detailloading: false,
      DetailTable: [],
      total: 0,
      formData: {
        ID: '',
        Key: '',
        Page: 1,
        Limit: 15
      },
      DetailData: {
        ID: '',
        Key: '',
        Page: 1,
        Limit: 15
      },
      Record: {
        id: 0
      },
      Detailtotal: 0,
      formDa: {},
      form: {
        CONTENT: '',
        STATUS: ''
      },
      seve: {
        headerId: '',
        user: '',
        status: '',
        content: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'userinfo'
    ])
  },
  created () {
    this.seve.user = this.userinfo.USER_NAME
    this.getIndex()
  },
  methods: {
    async getIndex () {
      const res = await API.Index()
      if (res.Result) {
        this.getRecordList()
        console.log(res, 'resresres')
      }
    },
    // 首件测试记录
    async getRecordList () {
      this.loading = true
      const res = await API.LoadFirstCheckRecordList(this.formData)
      this.loading = false
      if (res.Result) {
        this.annalTable = res.Result
        console.log(this.annalTable, '获取表格')
        this.total = res.TotalCount
      }
    },
    // 首件测试明细
    async getRecordDetail () {
      this.Detailloading = true
      const res = await API.LoadFirstCheckRecordDetail(this.DetailData)
      this.DetailTable = res.Result
      console.log(this.annalTable, '获取表格')
      this.Detailtotal = res.TotalCount
      this.Detailloading = false
    },
    // 获取解锁状态
    async getContent () {
      const res = await API.GetStatusContent(this.Record)
      console.log(res, '获取解锁状态')
      this.form.CONTENT = ''
      this.form.STATUS = ''
      if (res.Result.length !== 0) {
        this.form.CONTENT = res.Result[0].CONTENT
        this.form.STATUS = res.Result[0].STATUS
      }
    },
    handleClick (tab, event) {
      if (this.activeName === 'annal') {
        this.getRecordList()
      }
      if (this.activeName === 'Detail' && this.DetailData.ID) {
        this.getRecordDetail()
      }
    },
    // 点击获取表格一行数据
    obtain_but (row) {
      this.radio = this.annalTable.indexOf(row)
      this.seve.headerId = row.ID
      this.formDa = row
      this.Record.id = row.ID
      this.DetailData.ID = row.ID
      this.getContent()
      console.log(row, '点击获取表格一行数据')
    },
    DetailClick (row) {
      this.Detailradio = this.DetailTable.indexOf(row)
    },
    // 搜索
    searchClick () {
      this.formData.Page = 1
      this.getRecordList()
      if (this.activeName === 'Detail' && this.DetailData.ID) {
        this.DetailData.Page = 1
        this.getRecordDetail()
      }
    },
    // 分页
    handleSizeChange (val) {
      this.formData.Limit = val
      this.getRecordList()
    },
    handleCurrentChange (val) {
      this.formData.Page = val
      this.getRecordList()
    },
    // 分页
    DetailhandleSizeChange (val) {
      this.DetailData.Limit = val
      this.getRecordDetail()
    },
    DetailhandleCurrentChange (val) {
      this.DetailData.Page = val
      this.getRecordDetail()
    },
    //  保存
    async preserveClick () {
      this.seve.content = this.form.CONTENT
      this.seve.status = this.form.STATUS
      if (this.seve.headerId === '') {
        this.$message({
          showClose: true,
          message: this.$t('slu._24'),
          type: 'warning'
        })
        return
      }
      if (this.seve.status === '') {
        this.$message({
          showClose: true,
          message: this.$t('slu._25'),
          type: 'warning'
        })
        return
      }
      if (this.seve.content === '') {
        this.$message({
          showClose: true,
          message: this.$t('slu._26'),
          type: 'warning'
        })
        return
      }
      await API.SaveData(this.seve).then(response => {
        if (response.Result) {
          this.$notify({
            title: this.$t('slu._22'),
            message: this.$t('slu._23'),
            type: 'success',
            duration: 2000
          })
        }
        this.getRecordList()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.SmtLineUnlock {
  .form-title {
    padding: 5px 0 5px 0;
    font-size: 14px;
    color: #333;
    font-weight: 600;
  }
  .SmtLineUnlock-table {
    height: calc(100vh - 537px);
  }
}
</style>
<style>
.SmtLineUnlock .el-tabs__header {
  margin: 0;
}
.SmtLineUnlock .radio .el-radio__label {
  display: none;
}
.SmtLineUnlock .SmtLineUnlock-pagination {
  border: 1px solid #e6ebf5;
}
</style>
