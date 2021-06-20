<template>
  <d2-container>
    <template slot="header">
      <custom-container-header tableName="SMT_WO"
                               importBtnName="SmtLineWorkorderImport"
                               exportBtnName="SmtLineWorkorderExport"
                               exportTplName="SmtLineWorkorderExportTPL">
        <el-input v-model="formData.WO_NO"
                  :placeholder="$t('slw.p_1')"
                  clearable
                  style="width:200px"
                  @keyup.enter.native="searchClick" />&nbsp;
        <el-input v-model="formData.PART_NO"
                  :placeholder="$t('slw.p_2')"
                  clearable
                  style="width:200px"
                  @keyup.enter.native="searchClick" />&nbsp;
        <el-input v-model="formData.MODEL1"
                  :placeholder="$t('slw.p_3')"
                  clearable
                  style="width:200px"
                  @keyup.enter.native="searchClick" />&nbsp;
        <el-button type="primary"
                   icon="el-icon-search"
                   @click.prevent="searchClick">{{ $t('slw.hd_psf') }}</el-button>
      </custom-container-header>
    </template>
    <div class="table-container">
      <vxe-table ref="xTable"
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
                 :checkbox-config="{checkField: 'checked', trigger: 'row'}">
        <vxe-table-column field="WO_NO"
                          :title="$t('slw.t_1')"
                          :edit-render="{name: '$input', props: {readonly:true}}" />
        <vxe-table-column field="PART_NO"
                          :title="$t('slw.t_2')"
                          :edit-render="{name: '$input', props: {readonly:true}}" />
        <vxe-table-column field="MODEL"
                          :title="$t('slw.t_3')"
                          :edit-render="{name: '$input', props: {readonly:true}}" />
        <vxe-table-column field="PROJECT_NAME"
                          :title="$t('slw.t_5')"
                          :edit-render="{name: '$input', props: {readonly:true}}" />
        <vxe-table-column field="PACKET_MARKING"
                          :title="$t('slw.t_6')"
                          :edit-render="{name: '$input', props: {readonly:true}}" />

        <vxe-table-column field="DESCRIPTION"
                          :title="$t('slw.t_4')"
                          :edit-render="{name: '$input', props: {readonly:true}}" />
      </vxe-table>
    </div>

    <template slot="footer">
      <el-pagination class="SmtLineWorkorder-pagination"
                     :current-page="formData.Page"
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
import helper from '@/api/SmtLineWorkorder'
import pagination from '@/views/mixin/page'
import customContainerHeader from '@/components/custom-container-header'
const API = helper('SmtWo')
export default {
  name: 'SmtLineWorkorder',
  mixins: [pagination],
  components: {
    customContainerHeader
  },
  data () {
    return {
      formData: {
        WO_NO: '',
        PART_NO: '',
        MODEL1: '',
        ...this.formData
      },
      loading: false,
      mainTable: []
    }
  },
  created () {
    this.getIndex()
  },
  methods: {
    async getIndex () {
      const res = await API.Index()
      if (res.Result) {
        this.getLoadData()
      }
    },
    async getLoadData () {
      this.loading = true
      const res = await API.LoadData(this.formData)
      this.loading = false
      if (res.Result) {
        this.mainTable = res.Result || []
        this.totalPage = res.TotalCount || 0
      }
    },
    // 搜索
    searchClick () {
      this.getLoadData()
    }
  }
}
</script>
