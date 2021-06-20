<template>
  <d2-container class="Unlockanalysis">
    <template slot="header">
      <custom-container-header>
        <el-input
          v-model="formData.ID"
          :placeholder="$t('ukas._1')"
          clearable
          style="width:200px"
          @keyup.enter.native="searchClick"
        />&nbsp;
        <el-input
          v-model="formData.ID"
          :placeholder="$t('ukas._2')"
          clearable
          style="width:200px"
          @keyup.enter.native="searchClick"
        />&nbsp;
        <el-input
          v-model="formData.ID"
          :placeholder="$t('ukas._3')"
          clearable
          style="width:200px"
          @keyup.enter.native="searchClick"
        />&nbsp;
        <el-select clearable style="width:200px" :placeholder="$t('ukas._14')">
          <!-- <el-option  v-model="formData.STATION_ID"
            v-for="item in LinesList"
            :key="item.ID"
            :label="item.LINE_NAME"
            :value="item.ID"
          />-->
        </el-select>
        <el-button
          type="primary"
          icon="el-icon-search"
          @click.prevent="searchClick"
        >{{ $t('ukas._4') }}</el-button>
        <el-button
          type="danger"
          icon="el-icon-delete"
          @click.prevent="eliminateClick"
        >{{ $t('ukas._5') }}</el-button>
        <el-button
          type="primary"
          icon="el-icon-circle-check"
          @click.prevent="preserveClick"
        >{{ $t('ukas._6') }}</el-button>
      </custom-container-header>
    </template>
    <div>
      <div class="form-title">{{ $t('ukas._24') }}</div>
      <el-form ref="form" :model="form" label-width="80px" class="xform1" size="small">
        <el-row :gutter="24">
          <el-col :span="8">
            <el-form-item :label="$t('ukas._7')">
              <el-input v-model="formDa.WO_NO" :placeholder="$t('ukas._16')" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('ukas._8')">
              <el-input v-model="formDa.WO_NO" :placeholder="$t('ukas._17')" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('ukas._9')">
              <el-input v-model="formDa.WO_NO" :placeholder="$t('ukas._18')" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item :label="$t('ukas._10')" class="item-textarea">
              <el-input v-model="formDa.LINE_NO" :placeholder="$t('ukas._19')" type="textarea" />
            </el-form-item>
            <el-form-item :label="$t('ukas._11')">
              <el-input v-model="formDa.LINE_NO" class="item-textarea" :placeholder="$t('ukas._19')" type="textarea" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('ukas._12')" class="item-textarea">
              <el-input v-model="formDa.RESULT" :placeholder="$t('ukas._21')" type="textarea" />
            </el-form-item>
            <el-form-item :label="$t('ukas._13')" class="item-textarea">
              <el-input v-model="formDa.BOM_VERSION" :placeholder="$t('ukas._22')" type="textarea" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div>
      <div class="form-title">{{ $t('ukas._25') }}</div>
      <div class="Unlockanalysis-table">
        <el-table
          v-loading="loading"
          stripe
          :data="annalTable"
          width="100%"
          height="100%"
          highlight-hover-row
          highlight-current-row
          show-overflow
          :header-cell-style="{background:'#eef1f6',color:'#606266'}"
          :radio-config="{labelField: 'name', trigger: 'row'}"
          @row-click="obtain_but"
        >
          <el-table-column :label="$t('ukas._27')" width="80" align="center">
            <template slot-scope="scope">
              <el-radio v-model="radio" class="radio" :label="scope.$index" />
            </template>
          </el-table-column>
          <el-table-column
            width="200"
            prop="LOT_NO"
            :label="$t('ukas._28')"
            align="center"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            width="200"
            prop="WO_NO"
            :label=" $t('ukas._29')"
            align="center"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            width="100"
            prop="LINE_NO"
            :label="$t('ukas._30')"
            align="center"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            width="100"
            prop="COMPANY"
            :label="$t('ukas._31')"
            align="center"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            width="250"
            prop="MESHINE"
            :label="$t('ukas._32')"
            align="center"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            width="100"
            prop="RESULT"
            :label="$t('ukas._33')"
            align="center"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            width="100"
            prop="CLASS_NAME"
            :label="$t('ukas._34')"
            align="center"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            width="100"
            prop="BOM_VERSION"
            :label="$t('ukas._35')"
            align="center"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            width="100"
            prop="TOTAL_ENTITY"
            :label="$t('ukas._36')"
            align="center"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            width="150"
            prop="PASS_ENTITY"
            :label="$t('ukas._37')"
            align="center"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            width="150"
            prop="NG_ENTITY"
            :label="$t('ukas._38')"
            align="center"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            width="150"
            prop="UNCHECK_ENTITY"
            :label="$t('ukas._39')"
            align="center"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            width="150"
            prop="PRODUCT_DATE"
            :label="$t('ukas._40')"
            align="center"
            :show-overflow-tooltip="true"
          />

          <el-table-column
            width="100"
            prop="CLASS_NAME"
            :label="$t('ukas._41')"
            align="center"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            width="100"
            prop="BOM_VERSION"
            :label="$t('ukas._42')"
            align="center"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            width="100"
            prop="TOTAL_ENTITY"
            :label="$t('ukas._43')"
            align="center"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            width="150"
            prop="PASS_ENTITY"
            :label="$t('ukas._44')"
            align="center"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            width="150"
            prop="NG_ENTITY"
            :label="$t('ukas._45')"
            align="center"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            width="150"
            prop="UNCHECK_ENTITY"
            :label="$t('ukas._46')"
            align="center"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            width="150"
            prop="PRODUCT_DATE"
            :label="$t('ukas._47')"
            align="center"
            :show-overflow-tooltip="true"
          />
        </el-table>
      </div>
      <el-pagination
        class="Unlockanalysis-pagination"
        :current-page="formData.Page"
        :page-size="formData.Limit"
        :page-sizes="[15, 25, 35, 45]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </d2-container>
</template>
<script>
import helper from '@/api/MesFirstCheckRecordHeader'
import customContainerHeader from '@/components/custom-container-header'
import { mapGetters } from 'vuex'
const API = helper('MesFirstCheckRecordHeader')
export default {
  name: 'Unlockanalysis',
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
        Limit: 10
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
    ...mapGetters(['userinfo'])
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
      this.total = res.TotalCount
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
        this.formData.Page = 1
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
        this.getRecordDetail()
      }
    },
    // 清空
    eliminateClick () {},
    // 分页
    handleSizeChange (val) {
      this.formData.Limit = val
      this.getRecordList()
    },
    handleCurrentChange (val) {
      this.formData.Page = val
      this.getRecordList()
    },
    //  保存
    async preserveClick () {
      this.seve.content = this.form.CONTENT
      this.seve.status = this.form.STATUS
      if (this.seve.headerId === '') {
        this.$message({
          showClose: true,
          message: this.$t('ukas._24'),
          type: 'warning'
        })
        return
      }
      if (this.seve.status === '') {
        this.$message({
          showClose: true,
          message: this.$t('ukas._25'),
          type: 'warning'
        })
        return
      }
      if (this.seve.content === '') {
        this.$message({
          showClose: true,
          message: this.$t('ukas._26'),
          type: 'warning'
        })
        return
      }
      await API.SaveData(this.seve).then(response => {
        if (response.Result) {
          this.$notify({
            title: this.$t('ukas._45'),
            message: this.$t('ukas._46'),
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
.Unlockanalysis {
  .form-title {
    // padding: 10px 0 10px 0;
    font-size: 14px;
    color: #333;
    font-weight: 600;
  }
  .Unlockanalysis-table {
    height: calc(100vh - 412px);
  }
}
</style>
<style>
.Unlockanalysis .el-tabs__header {
  margin: 0;
}
.Unlockanalysis .radio .el-radio__label {
  display: none;
}
.Unlockanalysis .Unlockanalysis-pagination {
  border: 1px solid #e6ebf5;
}
.item-textarea .el-textarea__inner{
  resize: none;
}
</style>
