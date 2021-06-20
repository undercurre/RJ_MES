<template>
  <d2-container class='WorkOrderInput'>
    <template slot="header">
      <custom-container-header>
        <el-input v-model="formData.WoNo"
                  :placeholder="$t('WorkOrderInput._1')"
                  clearable
                  style="width: 200px"
                  @keyup.enter.native="getLoadData" />&nbsp;
        <el-button type="primary"
                   icon="el-icon-search"
                   @click.prevent="getLoadData">{{ $t("publics.btn.search") }}</el-button>
        <el-button type="primary"
                   @click.prevent="InvestedEvent">{{ $t("WorkOrderInput._7") }}</el-button>
        <el-button type="primary"
                   @click.prevent="uncommittedEvent">{{ $t("WorkOrderInput._8") }}</el-button>
      </custom-container-header>
    </template>
    <el-row :gutter="24">
      <el-col :span="12">
        {{ $t('WorkOrderInput._5')}}
        <div class="WorkOrderInput-center">
          <vxe-table ref="xTable"
                     id="xTable"
                     border
                     resizable
                     height="100%"
                     size="medium"
                     align="center"
                     highlight-hover-row
                     highlight-current-row
                     auto-resize
                     show-overflow
                     keep-source
                     esizable
                     show-footer
                     :footer-method="footerMethod"
                     :data="AlreadyTable"
                     :mouse-config="{selected: true}"
                     :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
                     :radio-config="{labelField: 'name', trigger: 'row'}"
                     :checkbox-config="{checkField: 'checked', trigger: 'row'}">
            <vxe-table-column field="WoNo"
                              :resizable="false"
                              show-overflow
                              :title="$t('WorkOrderInput._2')"
                              :edit-render="{name: '$input', props: {readonly: true}}">

              <template v-slot:footer="{ items }">
                {{ $t('WorkOrderInput._3')}}：{{items[0]}}
              </template>
            </vxe-table-column>

          </vxe-table>
        </div>
      </el-col>
      <el-col :span="12">
        {{ $t('WorkOrderInput._6')}}
        <div class="WorkOrderInput-center">
          <vxe-table ref="xTable2"
                     id="xTable2"
                     :data="NotTable"
                     :footer-method="footerMethod2"
                     border
                     resizable
                     height="100%"
                     size="medium"
                     align="center"
                     highlight-hover-row
                     highlight-current-row
                     auto-resize
                     show-overflow
                     keep-source
                     esizable
                     show-footer
                     :mouse-config="{selected: true}"
                     :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
                     :radio-config="{labelField: 'name', trigger: 'row'}"
                     :checkbox-config="{checkField: 'checked', trigger: 'row'}">
            <vxe-table-column field="WoNo"
                              :resizable="false"
                              show-overflow
                              :title="$t('WorkOrderInput._2')"
                              :edit-render="{name: '$input', props: {readonly: true}}">
              <template v-slot:footer="{ items }">
                {{ $t('WorkOrderInput._4')}}：{{items[0]}}
              </template>
            </vxe-table-column>
          </vxe-table>
        </div>
      </el-col>
    </el-row>
  </d2-container>
</template>

<script>
import {
  LoadInputSNDataByWoNo
} from '@/api/SfcsRuncardRangerEx'
import customContainerHeader from '@/components/custom-container-header'
import XLSX from 'xlsx'
import downloadjs from 'downloadjs'
export default {
  name: 'WorkOrderInput',
  components: {
    customContainerHeader
  },
  data () {
    // 这里存放数据
    return {
      formData: {
        WoNo: ''
      },
      AlreadyTable: [],
      NotTable: []
    }
  },
  methods: {
    footerMethod ({ columns, data }) {
      return [
        columns.map(column => {
          if (['WoNo'].includes(column.property)) {
            return data.length
          }
          return null
        })
      ]
    },
    footerMethod2 ({ columns, data }) {
      return [
        columns.map(column => {
          if (['WoNo'].includes(column.property)) {
            return data.length
          }
          return null
        })
      ]
    },
    // 单号查询
    async getLoadData () {
      if (!this.formData.WoNo) {
        this.$message({
          showClose: true,
          message: this.$t('WorkOrderInput._1'),
          type: 'warning'
        })
        return
      }
      const res = await LoadInputSNDataByWoNo(this.formData)
      if (res.Result) {
        console.log(res.Result, '获取表格')
        var IsNotSNList = res.Result.IsNotSNList || []
        var IsSNList = res.Result.IsSNList || []
        var that = this
        that.AlreadyTable = []
        that.NotTable = []
        res.Result.IsSNList.map(res => {
          that.AlreadyTable.push({ WoNo: res, Num: IsSNList.length })
        })
        IsNotSNList.map(res => {
          that.NotTable.push({ WoNo: res, Num: IsNotSNList.length })
        })
      }
    },
    // 导出数据
    InvestedEvent () {
      let wb = XLSX.utils.table_to_book(document.querySelector('#xTable'))
      let wbout = XLSX.write(wb, {
        bookType: 'xlsx',
        bookSST: true,
        type: 'array'
      })
      downloadjs(wbout, `${this.$t('_kanban._53')}.xlsx`)
    },
    uncommittedEvent () {
      let wb = XLSX.utils.table_to_book(document.querySelector('#xTable2'))
      let wbout = XLSX.write(wb, {
        bookType: 'xlsx',
        bookSST: true,
        type: 'array'
      })
      downloadjs(wbout, `${this.$t('_kanban._53')}.xlsx`)
    }
  }
}
</script>
<style lang='scss' scoped>
.WorkOrderInput-center {
  height: calc(100vh - 200px);
}
</style>
